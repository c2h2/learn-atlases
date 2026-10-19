A machine tool is a device for making errors in a controlled way. It holds a part to within a few micrometres, moves a cutting edge along a programmed path to within a few micrometres, and removes material so that the finished dimension falls inside a tolerance band that is typically 25–100 μm wide. Every number on a drawing is a statement about a measurement that has not been made yet, and every measurement you do make carries an uncertainty that is typically 5–20 % of the tolerance you are trying to verify. **The entire edifice of modern manufacturing — interchangeable parts, assembly without fitting, quality control without 100 % inspection, certification without destructive testing — rests on the proposition that you can measure a dimension to better than you can make it, and that the measurement is traceable to a definition of the metre that is the same in Gothenburg as in Guangzhou.** When that proposition fails, the parts do not fit, the bearings run hot, the turbine blades rub, and the aircraft is grounded.

Metrology is the science of that proposition. Statistical process control is the science of keeping the machine inside the tolerance band without measuring every part. CNC and automation are the engineering of the machine that does the making. Quality systems are the paperwork that proves you did it on purpose. This lesson covers all four, because they are one subject: **the control of geometric error in a world where every process has a distribution, every measurement has an uncertainty, and every customer wants a number.**

::: warning Nine ways metrology and quality go wrong
**Confusing precision with accuracy.** A CMM that reads the same wrong number 50 times to 0.1 μm is precise and wrong. A caliper that reads ±0.05 mm but is calibrated to NIST is accurate and imprecise. **Accuracy is traceability; precision is repeatability; you need both, and you prove them differently — the first with a calibrated reference, the second with a gauge R&R study.** **Measuring without an uncertainty budget.** A measurement without an uncertainty is a number, not a result. If you report "25.003 mm" without saying "±0.004 mm at 95 % confidence," you have told the customer nothing about whether the part is in tolerance, because you have not told them whether *you* know whether the part is in tolerance. **The decision rule is: if the measurement uncertainty is more than 10 % of the tolerance, the measurement cannot make the accept/reject decision, and you need a better instrument, not a better operator.** **Ignoring the gauge R&R.** If the gauge consumes 30 % of the tolerance band, the process is being judged by a ruler that is itself out of tolerance 30 % of the time. A gauge R&R study (repeatability + reproducibility) must show $< 1 0 \ \%$ of the tolerance for a critical dimension and $< 2 0 \ \%$ for a minor one. **A process that looks capable ($C _ { p k } = 1 . 5$) measured with a bad gauge ($2 5 \ \%$ R&R) is actually marginal ($C _ { p k , \text{true } } \approx 1 . 3$), and the customers will find out before you do.** **Setting the tolerance from the drawing instead of the process.** A tolerance of $\pm 0 . 0 1 \ \mathrm { m m }$ on a turned diameter is a statement that the process is capable of $C _ { p k } \geq 1 . 3 3$ , which for a CNC lathe means a $6 \sigma$ spread of $< 0 . 0 1 5 \ \mathrm { m m }$ — achievable, but only with a rigid setup, a sharp tool, and a part that does not move when the cut pushes it. **Specify the tolerance the process can hold, or accept that 5 % of the parts will be scrap and 10 % will be "questionable."** **Using a go/no-go gauge as a measurement.** A go/no-go gauge is an attribute device: it tells you "in" or "out," not "how much." If the dimension is drifting toward the limit, the gauge does not know, and the first thing you learn is that 200 parts are scrap. **For any dimension that drifts (tool wear, thermal growth, fixture wear), use a variable gauge and a control chart.** **Not accounting for thermal expansion.** Steel expands at $1 1 . 7 \times 1 0 ^ { - 6 } \ \mathrm { K ^ { - 1 } }$ . A 100 mm steel part measured at $2 5 \ \mathrm { ^ \circ C }$ in a shop at $3 0 \ \mathrm { ^ \circ C }$ is 5.8 μm larger than the drawing calls for, and the CMM in the $2 0 \ \mathrm { ^ \circ C }$ metrology lab reads it 5.8 μm smaller than the machinist's micrometer in the $3 0 \ \mathrm { ^ \circ C }$ shop. **For tolerances tighter than 20 μm, the measurement temperature is a bigger error source than the instrument, and the part must be soaked at $2 0 . 0 { \pm } 0 . 5 \ \mathrm { ^ \circ C }$ for at least one hour per 25 mm of thickness before it is measured.** **Accepting on the supplier's data and rejecting on your own.** The supplier's CMM says 25.002, your CMM says 25.008, the drawing says $2 5 . 0 0 0 \pm 0 . 0 1 0$ , and both measurements are correct within their respective uncertainties. **The resolution is not to argue about who is right but to compare the two CMMs against a calibrated gauge block and find the 6 μm systematic offset — which is usually a probe calibration error, a thermal compensation error, or a difference in the fitting algorithm (least-squares vs minimum-zone).** **Skipping the measurement system analysis in the PPAP.** The customer's PPAP checklist asks for a gauge R&R on every dimension on the drawing. If you do not have one, the PPAP is rejected, the part is not approved, and the programme is late. **The MSA is not paperwork; it is the proof that your accept/reject decisions are based on data, not on hope.** **Automating a bad process.** A CNC machine with an in-process gauge and a tool-life compensation loop will produce 10 000 parts that are all consistently wrong if the setup is off by 0.02 mm. **Automation amplifies whatever you feed it. Fix the process first, then automate it.**
:::

## 1. Measurement, traceability, and uncertainty

::: definition Metrology, traceability, and the calibration hierarchy {#def-traceability}
**Metrology** is the science of measurement, and **traceability** is the property of a measurement result whereby the result can be related to a reference (usually the SI system) through an unbroken chain of documented calibrations, each contributing a stated uncertainty. The chain for a shop-floor micrometer looks like this:

$$
\begin{array} { r l }
\text{SI metre (defined by } c \text{ and } \Delta \nu _ { \mathrm { Cs } } \text{)} & \\
\quad \downarrow & \text{national metrology institute (NPL, PTB, NIST): laser interferometer, } { \pm } 0 . 5 \ \mathrm { n m / m } \\
\quad \downarrow & \\
\text{Grade } 0 \text{ gauge blocks (interferometrically calibrated)} & { \pm } 0 . 1 \ \mu \mathrm { m } \text{ at } 2 5 \ \mathrm { mm } \\
\quad \downarrow & \\
\text{Grade } \mathrm { K1 } \text{ gauge blocks (transfer standard)} & { \pm } 0 . 2 5 \ \mu \mathrm { m } \\
\quad \downarrow & \\
\text{Shop micrometer (calibrated against K1 blocks)} & { \pm } 1 { - } 2 \ \mu \mathrm { m } \\
\quad \downarrow & \\
\text{The part on the CMM} & { \pm } 2 { - } 5 \ \mu \mathrm { m } \\
\end{array}
$$

Each link in the chain is a calibration performed by an accredited laboratory (to ISO/IEC 17025), with a certificate that states the measured value, the expanded uncertainty, and the coverage factor. **A calibration certificate without an uncertainty statement is not a calibration; it is a pass/fail test.** The calibration interval is determined by the instrument's drift history, not by a calendar: a CMM that has drifted 0.5 μm per year can be calibrated every two years; a torque wrench that has drifted 2 % per month must be calibrated monthly or replaced.

The **reference conditions** for dimensional metrology are $2 0 . 0 0 0 \ \mathrm { ^ \circ C }$ (the ISO 1 reference temperature, chosen because it is close to the old "normal temperature" of European workshops and because the thermal expansion of steel is roughly linear around it), $50 \ \%$ relative humidity, and the standard atmospheric pressure. **Every dimension on every engineering drawing on Earth is defined at $2 0 \ \mathrm { ^ \circ C }$ , and every measurement that is not made at $2 0 \ \mathrm { ^ \circ C }$ must be corrected for thermal expansion — or the correction must be shown to be smaller than the measurement uncertainty.**
:::

::: definition Measurement uncertainty: the GUM framework {#def-uncertainty}
The *Guide to the Expression of Uncertainty in Measurement* (GUM, JCGM 100:2008) defines the procedure for quantifying the doubt associated with a measurement result. The **combined standard uncertainty** is the root-sum-square of the individual uncertainty components:

$$
u _ { c } \; = \; { \sqrt { \sum _ { i = 1 } ^ { N } c _ { i } ^ { 2 } \, u _ { i } ^ { 2 } } } \qquad c _ { i } \; = \; { \frac { \partial f } { \partial x _ { i } } }
$$

where $u _ { i }$ is the standard uncertainty of input $x _ { i }$ and $c _ { i }$ is the **sensitivity coefficient** (the partial derivative of the measurement function $f$ with respect to $x _ { i }$ ). For a direct length comparison, $c _ { i } = 1$ and the formula reduces to the simple RSS.

The components come in two types:

- **Type A** (statistical): evaluated from repeated observations. $u _ { A } = s / { \sqrt { n } }$ , where $s$ is the sample standard deviation and $n$ is the number of observations.
- **Type B** (everything else): evaluated from certificates, manufacturer specifications, experience, or assumed distributions. For a rectangular (uniform) distribution with half-width $a$ : $u _ { B } = a / { \sqrt { 3 } }$ . For a triangular distribution: $u _ { B } = a / { \sqrt { 6 } }$ . For a normal distribution with a stated $k = 2$ coverage: $u _ { B } = U / 2$ .

The **expanded uncertainty** is $U = k \, u _ { c }$ , where $k = 2$ gives approximately 95 % confidence (for a normal distribution with sufficient degrees of freedom). The measurement result is reported as:

$$
L \; = \; { \bar { L } } \, \pm \, U \quad [ \text{at } k = 2 , \ 9 5 \ \% \ \text{confidence} ]
$$

**The decision rule for conformity assessment (ISO 14253-1):** the part is **accepted** if ${ \bar { L } } + U \leq \mathrm { U S L }$ and ${ \bar { L } } - U \geq \mathrm { L S L }$ ; **rejected** if ${ \bar { L } } - U > \mathrm { U S L }$ or ${ \bar { L } } + U < \mathrm { L S L }$ ; and **indeterminate** otherwise. The indeterminate zone is the width of the measurement uncertainty, and it is the reason a part that "meets print" in one lab can "not meet print" in another. **The rule of thumb is that the measurement uncertainty should be no more than 10 % of the tolerance (the 10:1 rule), which means a $\pm 0 . 0 1 \ \mathrm { m m }$ tolerance requires a measurement uncertainty of $\leq 0 . 0 0 2 \ \mathrm { m m }$ — achievable with a calibrated micrometer but not with a vernier caliper.**
:::

::: definition Contact and non-contact measurement: CMMs, scanners, and interferometers {#def-instruments}
The choice of instrument is a trade-off between accuracy, speed, and geometry:

$$
\begin{array} { l l l l l }
\textbf{Instrument} & \textbf{Accuracy} & \textbf{Speed} & \textbf{What it measures} & \textbf{Limitation} \\ \hline
\text{Micrometer} & { \pm } 1 { - } 2 \ \mu\text{m} & \text{10 s/part} & \text{1D: diameters, thicknesses} & \text{Operator-dependent, 1 point} \\
\text{Vernier caliper} & { \pm } 2 0 \ \mu\text{m} & \text{5 s/part} & \text{1D: rough dimensions} & \text{Abbe error, cosine error} \\
\text{Bore gauge} & { \pm } 2 { - } 5 \ \mu\text{m} & \text{30 s/bore} & \text{1D: bore diameter, roundness} & \text{Alignment-dependent} \\
\text{Surface plate + indicators} & { \pm } 2 { - } 1 0 \ \mu\text{m} & \text{minutes/part} & \text{2D: flatness, parallelism} & \text{Manual, operator skill} \\
\text{CMM (tactile)} & { \pm } ( 1 . 5 { + } L / 3 0 0 ) \ \mu\text{m} & \text{5--60 min/part} & \text{3D: points, forms, GD\&T} & \text{Slow, probe-limited geometry} \\
\text{CMM (scanning)} & { \pm } ( 2 { + } L / 2 5 0 ) \ \mu\text{m} & \text{2--20 min/part} & \text{3D: continuous surfaces} & \text{Stylus deflection, speed-limited} \\
\text{laser/lidar scanner} & { \pm } 1 5 { - } 5 0 \ \mu\text{m} & \text{1--5 min/part} & \text{3D: point cloud, free-form} & \text{Surface-dependent, no bores} \\
\text{structured light} & { \pm } 5 { - } 2 0 \ \mu\text{m} & \text{1--5 min/part} & \text{3D: point cloud} & \text{Reflective surfaces, small parts} \\
\text{X-ray CT} & { \pm } 1 0 { - } 5 0 \ \mu\text{m} & \text{10--120 min/part} & \text{3D: internal + external} & \text{Cost, size limit, density contrast} \\
\text{laser interferometer} & { \pm } 0 . 5 \ \mathrm{nm} & \text{continuous} & \text{1D: displacement, straightness} & \text{Alignment, air refractive index} \\
\text{optical comparator} & { \pm } 5 \ \mu\text{m} & \text{1 min/part} & \text{2D: profile, small parts} & \text{2D only, manual} \\
\end{array}
$$

The **CMM** (coordinate measuring machine) is the workhorse of dimensional metrology. A bridge CMM with a touch-trigger probe measures a point by deflecting a stylus until a built-in switch trips; the machine reads the $( x , y , z )$ of the probe tip from three linear scales (typically Heidenhain or Renishaw, resolution $0 . 1 \ \mu \mathrm { m }$ ). The accuracy is specified as $E _ { 0 , M } = A + L / K$ (ISO 10360), where $A$ is the probing error (1–2 μm), $L$ is the measured length, and $K$ is a factor (300–500). For a 500 mm measurement on a $1 . 5 + L / 3 0 0$ machine: $E = 1 . 5 + 5 0 0 / 3 0 0 = 3 . 2 \ \mu \mathrm { m }$ . **The $L / K$ term is the straightness and squareness error of the machine's guideways, and it is why a CMM's accuracy degrades with the size of the part, not with the size of the machine.**

The **Abbe principle** states that the measurement axis should be collinear with the axis of the dimension being measured. If they are offset by a distance $e$ (the **Abbe offset**), an angular error $\theta$ of the guideway produces a displacement error:

$$
\varepsilon _ { \text{Abbe } } \; = \; e \, \sin \theta \; \approx \; e \, \theta
$$

For $e = 1 0 0 \ \mathrm { m m }$ and $\theta = 5$ arcsec $= 2 4 . 2 \ \mu \mathrm { r a d }$ : $\varepsilon = 2 . 4 \ \mu \mathrm { m }$ . **A caliper violates the Abbe principle by design (the scale is behind the jaws, offset by 10–20 mm), which is why a caliper cannot measure to better than 20 μm no matter how carefully you read it. A CMM obeys the Abbe principle in the Z-axis (the scale is on the ram, collinear with the probe) but violates it in X and Y (the scales are on the bridge, offset from the probe tip by the stylus length).**
:::

::: example Uncertainty budget for a bore diameter {#ex-uncertainty level=3 check="1.5"}
A 25 mm bore is measured on a CMM with a 2 mm stylus. The uncertainty components are:

| Component | Distribution | Value | $u _ { i }$ ($\mu \mathrm { m }$) |
|-----------|-------------|-------|-------------------------------|
| CMM volumetric error ($E _ { 0 , M }$) | Normal, $k = 2$ | $\pm 2 . 0 \ \mu \mathrm { m }$ | 1.0 |
| Probe calibration (ball diameter) | Rectangular | $\pm 0 . 5 \ \mu \mathrm { m }$ | 0.29 |
| Thermal expansion ($\Delta T = { \pm } 1 \ \mathrm { K }$) | Rectangular | $\pm 1 1 . 7 \times 10^ { - 6 } \times 2 5 \times 1 0 ^ { 3 } = { \pm } 0 . 2 9 \ \mu \mathrm { m }$ | 0.17 |
| Repeatability (5 measurements) | Normal | $s = 0 . 4 \ \mu \mathrm { m }$ , $n = 5$ | 0.18 |
| Stylus deflection (probe force) | Rectangular | $\pm 0 . 3 \ \mu \mathrm { m }$ | 0.17 |

$$
u _ { c } \; = \; { \sqrt { 1 . 0 ^ { 2 } + 0 . 2 9 ^ { 2 } + 0 . 1 7 ^ { 2 } + 0 . 1 8 ^ { 2 } + 0 . 1 7 ^ { 2 } } } \; = \; { \sqrt { 1 . 0 + 0 . 0 8 4 + 0 . 0 2 9 + 0 . 0 3 2 + 0 . 0 2 9 } } \; = \; { \sqrt { 1 . 1 7 4 } } \; = \; 1 . 0 8 \ \mu \mathrm { m }
$$

$$
U \; = \; 2 \, u _ { c } \; = \; { \bf 2 . 2 \ \mu m } \quad ( 9 5 \ \% \ \text{confidence} )
$$

**The CMM's own volumetric error dominates the budget (85 % of the variance). The thermal and stylus-deflection terms are small but not negligible; the repeatability term is the only one you can reduce by measuring more times. The total uncertainty of 2.2 μm is 4.4 % of a $\pm 0 . 0 2 5 \ \mathrm { m m }$ tolerance — well within the 10:1 rule. For a $\pm 0 . 0 0 5 \ \mathrm { m m }$ tolerance, this CMM is marginal (22 % of the tolerance), and you need a better machine or a comparison measurement against a calibrated ring gauge.**
:::

::: widget plot
title: The Abbe error: a caliper's worst enemy
f: 100000*x*pi/(180*3600); 50000*x*pi/(180*3600); 10000*x*pi/(180*3600)
x: 0,10
y: 0,10
labels: Abbe offset 100 mm; 50 mm; 10 mm
caption: Displacement error $\varepsilon = e \, \theta$ against guideway angular error $\theta$ (in arcseconds) for three Abbe offsets. **A caliper has an Abbe offset of about 15 mm (the distance from the scale to the jaw face), so a 1 arcsec pitch error of the slide produces a 0.7 μm error — small. But a depth micrometer with a 100 mm extension has an Abbe offset of 100 mm, and the same 1 arcsec error produces 4.8 μm — nearly 10 % of a typical $\pm 0 . 0 2 5 \ \mathrm { m m }$ tolerance.** **The design rule for any measuring instrument: put the scale as close to the measurement axis as possible. This is why CMMs have the scale on the ram (Abbe offset $\approx 0$ in Z) and why a surface plate's flatness is measured with an autocollimator (which measures angle, not displacement, and is therefore immune to the Abbe error).**
:::

## 2. Tolerances, fits, and geometric dimensioning

::: definition The ISO tolerance system: IT grades and fundamental deviations {#def-iso-tol}
The ISO 286 system defines a tolerance as the product of a **tolerance unit** $i$ (a function of the nominal size $D$ ) and a multiplier that defines the **IT grade**:

$$
i \; = \; 0 . 4 5 \, { \sqrt [ 3 ] { D } } \; + \; 0 . 0 0 1 \, D \quad [ \mu \mathrm { m } , \ D \text{ in mm} ]
$$

The IT grades run from IT01 (the finest, used in gauge blocks) to IT18 (the coarsest, used in castings and weldments). The standard grades and their multipliers are:

$$
\begin{array} { c c c c c c c c c }
\text{Grade} & \text{IT5} & \text{IT6} & \text{IT7} & \text{IT8} & \text{IT9} & \text{IT10} & \text{IT11} & \text{IT12} \\
\text{Multiplier} & 7 i & 10 i & 16 i & 25 i & 40 i & 64 i & 100 i & 160 i \\
\text{Typical use} & \text{bearing} & \text{precision} & \text{location} & \text{general} & \text{general} & \text{sheet} & \text{welded} & \text{cast} \\
& \text{seats} & \text{fits} & & \text{fits} & \text{work} & \text{metal} & \text{fab} & \\
\end{array}
$$

For $D = 5 0 \ \mathrm { m m }$ : $i = 0 . 4 5 \times 3 . 6 8 + 0 . 0 5 = 1 . 7 1 \ \mu \mathrm { m }$ . IT7 $= 1 6 \times 1 . 7 1 = 2 7 . 4 \ \mu \mathrm { m } \approx 2 5 \ \mu \mathrm { m }$ (the tabulated value). **The cube-root term dominates at small sizes (it represents the difficulty of holding a small feature), and the linear term dominates at large sizes (it represents the accumulated straightness and thermal errors).**

The **fundamental deviation** (the letter code: a–z for shafts, A–Z for holes) positions the tolerance zone relative to the nominal size. The most common fits are:

- **Clearance fits**: H7/g6 (running fit, $\sim 2 5 \ \mu \mathrm { m }$ clearance at 50 mm), H7/f7 (close running), H11/c11 (locational clearance).
- **Transition fits**: H7/k6 (location with light press, $\pm 1 0 \ \mu \mathrm { m }$), H7/n6 (medium press).
- **Interference fits**: H7/p6 (press fit, $\sim 3 0 \ \mu \mathrm { m }$ interference at 50 mm), H7/s6 (heavy press, requires heating or pressing).

**The hole-basis system (H) is the default: the hole tolerance is fixed and the shaft tolerance is varied to achieve the desired fit. This is because holes are harder to vary than shafts (a reamer makes one size; a turning tool makes any size).**
:::

::: definition Geometric dimensioning and tolerancing (GD&T): the datum reference frame {#def-gdt}
A $\pm 0 . 1 \ \mathrm { m m }$ dimensional tolerance on a hole location is a square tolerance zone (in XY) — the hole centre can be anywhere in a $0 . 2 \times 0 . 2 \ \mathrm { m m }$ square. A $\phi 0 . 1$ positional tolerance is a circular tolerance zone — the hole centre must be inside a 0.1 mm diameter circle. **The circle is 78.5 % of the area of the square, so a positional tolerance of $\phi 0 . 1$ is tighter than a $\pm 0 . 1$ dimensional tolerance, and the designer who specifies $\pm 0 . 1$ when they mean $\phi 0 . 1$ is giving away 21 % of the tolerance zone for free.**

GD&T (ASME Y14.5 or ISO 1101/2768) defines 14 geometric controls in five categories:

$$
\begin{array} { l l l }
\textbf{Category} & \textbf{Controls} & \textbf{Datum required?} \\ \hline
\text{Form} & \text{flatness, straightness, circularity, cylindricity} & \text{No (self-referencing)} \\
\text{Orientation} & \text{perpendicularity, angularity, parallelism} & \text{Yes (one datum)} \\
\text{Location} & \text{position, concentricity, symmetry} & \text{Yes (three datums)} \\
\text{Profile} & \text{profile of a line, profile of a surface} & \text{Yes (three datums)} \\
\text{Runout} & \text{circular runout, total runout} & \text{Yes (one datum axis)} \\
\end{array}
$$

The **datum reference frame** is three mutually perpendicular planes (A, B, C) established by the three-2-1 rule: three contact points define the primary datum (a plane), two define the secondary (a line), one defines the tertiary (a point). **The datum is not a feature of the part; it is a theoretical construct that the part's features are related to. The datum feature simulator (the CMM's chuck, vise, or fixture) must reproduce the datum constraint, or the measurement is meaningless.**

The **material condition modifiers** — Maximum Material Condition (MMC, $\boxed{M}$), Least Material Condition (LMC, $\boxed{L}$), and Regardless of Feature Size (RFS, no symbol) — allow the geometric tolerance to be relaxed when the feature is not at maximum material. A $\phi 0 . 1 \boxed{ M }$ positional tolerance on a $\phi 1 0 \pm 0 . 2$ hole gives a bonus tolerance of 0.2 mm when the hole is at $\phi 1 0 . 2$ , because the pin can still assemble. **MMC is the single most powerful tool in GD&T: it converts a tolerance stack-up problem into a worst-case assembly problem, and it can double the effective tolerance on a clearance-fit hole without affecting assemblability.**
:::

::: definition Gauging: attribute vs variable, and gauge R&R {#def-gauging}
A **gauge** is a device that makes a conformity decision (accept/reject) rather than reporting a measurement. The two types are:

- **Attribute gauges**: go/no-go plug gauges, thread gauges, snap gauges, functional gauges. They are fast (2–5 s per part), cheap, and operator-proof, but they provide no information about the process trend. **The go gauge is made at the maximum material limit of the feature (the smallest hole, the largest shaft) and the no-go gauge at the least material limit. The gauge itself has a wear allowance (typically 5–10 % of the tolerance) built into the go gauge, so that the gauge wears before it starts rejecting good parts.**
- **Variable gauges**: micrometers, bore gauges, CMMs, dial indicators. They report a number, which can be plotted on a control chart, trended, and used for process adjustment. **A variable gauge costs 10–100× more than an attribute gauge and takes 5–60× longer to use, but it gives you the information to prevent the defect instead of sorting it.**

**Gauge repeatability and reproducibility (GR&R)** quantifies the measurement system's contribution to the observed variation. The standard study (AIAG MSA Manual, 4th ed.) is: 2 operators × 10 parts × 3 trials = 60 measurements, analysed by ANOVA or the X-bar/R method. The results are:

$$
\sigma _ { \text{gauge } } ^ { 2 } \; = \; \sigma _ { \text{repeatability} } ^ { 2 } \; + \; \sigma _ { \text{reproducibility} } ^ { 2 } \; = \; \sigma _ { \text{EV} } ^ { 2 } \; + \; \sigma _ { \text{AV} } ^ { 2 }
$$

where EV (equipment variation) is the within-operator variation and AV (appraiser variation) is the between-operator variation. The acceptance criteria are:

- $\sigma _ { \text{gauge } } / \sigma _ { \text{total } } < 0 . 1 0$ (10 %): acceptable.
- $0 . 1 0 < \sigma _ { \text{gauge } } / \sigma _ { \text{total } } < 0 . 3 0$ : conditionally acceptable, improvement recommended.
- $\sigma _ { \text{gauge } } / \sigma _ { \text{total } } > 0 . 3 0$ : unacceptable, the gauge must be improved or replaced.

**A GR&R of 30 % means the gauge consumes 30 % of the observed variation, and the process capability you calculate is inflated: a true $C _ { p k }$ of 1.0 appears as 1.3, and the 2 700 ppm you are producing appears as 130 ppm. The customer's incoming inspection will find the discrepancy before your SPC does.**
:::

::: example Tolerance stack-up: a bearing housing {#ex-stackup level=3 check="0.18"}
A bearing (width 15.000 ± 0.010 mm) is pressed into a housing bore and retained by a circlip in a groove. The dimensions around the stack are:

| Feature | Nominal | Tolerance |
|---------|---------|-----------|
| Housing shoulder to bore face | 20.00 | ±0.05 |
| Bearing width | 15.00 | ±0.01 |
| Circlip thickness | 1.20 | ±0.05 |
| Groove width | 1.60 | ±0.05 |

What is the worst-case axial clearance of the bearing?

The worst-case clearance is the sum of the maximum dimensions minus the sum of the minimum dimensions:

$$
\delta _ { \max } \; = \; ( 2 0 . 0 5 + 1 . 6 5 ) - ( 1 4 . 9 9 + 1 . 1 5 ) \; = \; 2 1 . 7 0 - 1 6 . 1 4 \; = \; 5 . 5 6 \ \mathrm { m m }
$$

$$
\delta _ { \min } \; = \; ( 1 9 . 9 5 + 1 . 5 5 ) - ( 1 5 . 0 1 + 1 . 2 5 ) \; = \; 2 1 . 5 0 - 1 6 . 2 6 \; = \; 5 . 2 4 \ \mathrm { m m }
$$

The total stack-up tolerance is $5 . 5 6 - 5 . 2 4 = 0 . 3 2 \ \mathrm { m m }$ . The **root-sum-square** (statistical) stack-up is:

$$
\delta _ { \text{RSS } } \; = \; { \sqrt { 0 . 0 5 ^ { 2 } + 0 . 0 1 ^ { 2 } + 0 . 0 5 ^ { 2 } + 0 . 0 5 ^ { 2 } } } \; = \; { \sqrt { 0 . 0 0 7 6 } } \; = \; 0 . 0 8 7 \ \mathrm { m m } \quad ( 1 \sigma )
$$

At $3 \sigma$ : $\pm 0 . 2 6 \ \mathrm { m m }$ , so the RSS stack-up is $\pm 0 . 2 6 \ \mathrm { m m }$ compared to the worst-case $\pm 0 . 1 6 \ \mathrm { m m }$ . **The worst-case stack-up of 0.32 mm is too large for a bearing that needs 0.05–0.15 mm axial preload. The fix is to tighten the housing shoulder tolerance to ±0.02 mm (the dominant contributor) or to add a shim or a wave spring to absorb the stack-up.**
:::

## 3. Statistical process control

::: definition Process capability: Cp, Cpk, Pp, Ppk {#def-capability}
**Process capability** compares the spread of the process to the width of the specification. The two indices are:

$$
C _ { p } \; = \; { \frac { \mathrm { U S L } - \mathrm { L S L } } { 6 \, \sigma _ { \text{within } } } } \qquad C _ { p k } \; = \; \min \! \left( { \frac { \mathrm { U S L } - \mu } { 3 \, \sigma _ { \text{within } } } } , \; { \frac { \mu - \mathrm { L S L } } { 3 \, \sigma _ { \text{within } } } } \right)
$$

where $\sigma _ { \text{within } }$ is the **within-subgroup** standard deviation (estimated from the average range: $\hat { \sigma } _ { \text{within } } = { \bar { R } } / d _ { 2 }$ , where $d _ { 2 }$ depends on the subgroup size). $C _ { p }$ measures the **potential** capability (if the process were centred); $C _ { p k }$ measures the **actual** capability (accounting for the off-centre). $C _ { p } = C _ { p k }$ when the process is perfectly centred.

The **performance indices** $P _ { p }$ and $P _ { p k }$ use the **overall** standard deviation $s$ (the sample standard deviation of all measurements, including between-subgroup variation):

$$
P _ { p } \; = \; { \frac { \mathrm { U S L } - \mathrm { L S L } } { 6 \, s } } \qquad P _ { p k } \; = \; \min \! \left( { \frac { \mathrm { U S L } - { \bar { x } } } { 3 \, s } } , \; { \frac { { \bar { x } } - \mathrm { L S L } } { 3 \, s } } \right)
$$

**The difference between $C _ { p k }$ and $P _ { p k }$ is the between-subgroup variation: tool drift, batch-to-batch material variation, temperature cycles. If $C _ { p k } = 1 . 7$ but $P _ { p k } = 1 . 1$ , the process is capable within a subgroup but not over time — the problem is not the machine, it is the process management (tool changes, warm-up procedures, material control).**

The interpretation of $C _ { p k }$ values:

$$
\begin{array} { c c c }
C _ { p k } & \text{Defect rate (ppm)} & \text{Interpretation} \\ \hline
< 1 . 0 & > 6 2 1 0 & \text{Not capable; 100\% inspection required} \\
1 . 0 & 2 7 0 0 & \text{Marginally capable; SPC required} \\
1 . 3 3 & 6 3 & \text{Capable; the automotive minimum} \\
1 . 6 7 & 0 . 6 & \text{Highly capable; the aerospace minimum} \\
2 . 0 & 0 . 0 0 2 & \text{Six Sigma; the medical-implant target} \\
\end{array}
$$

**The defect rate is calculated from the normal distribution: $p = \Phi ( ( \mathrm { L S L } - \mu ) / \sigma ) + 1 - \Phi ( ( \mathrm { U S L } - \mu ) / \sigma )$ . For a centred process, $p = 2 \, \Phi ( - 3 \, C _ { p } )$ . The ppm values in the table assume a normal distribution, which is rarely true in practice — real processes have tails that are fatter than normal, and the actual defect rate at $C _ { p k } = 2$ is more like 10 ppm than 0.002 ppm.**
:::

::: definition Control charts: X-bar/R, p-charts, and CUSUM {#def-control-charts}
A **control chart** distinguishes common-cause variation (inherent to the process) from special-cause variation (assignable to a specific event). The X-bar/R chart is the workhorse for variable data:

$$
\text{X-bar chart:} \quad { \bar { \bar { x } } } \, \pm \, A _ { 2 } \, { \bar { R } } \qquad \text{R chart:} \quad D _ { 3 } \, { \bar { R } } \; \text{to} \; D _ { 4 } \, { \bar { R } }
$$

where ${ \bar { \bar { x } } }$ is the grand mean, ${ \bar { R } }$ is the average range, and $A _ { 2 }$ , $D _ { 3 }$ , $D _ { 4 }$ are constants that depend on the subgroup size $n$ :

$$
\begin{array} { c c c c c c c }
n & 2 & 3 & 4 & 5 & 10 \\ \hline
A _ { 2 } & 1 . 8 8 0 & 1 . 0 2 3 & 0 . 7 2 9 & 0 . 5 7 7 & 0 . 3 0 8 \\
D _ { 3 } & 0 & 0 & 0 & 0 & 0 . 2 2 2 \\
D _ { 4 } & 3 . 2 6 7 & 2 . 5 7 5 & 2 . 2 8 2 & 2 . 1 1 4 & 1 . 7 7 7 \\
d _ { 2 } & 1 . 1 2 8 & 1 . 6 9 3 & 2 . 0 5 9 & 2 . 3 2 6 & 3 . 0 7 8 \\
\end{array}
$$

**The control limits are $\pm 3 \sigma$ of the sample mean ($\sigma / { \sqrt { n } }$ ), which gives a false-alarm rate of 0.27 % (1 in 370 subgroups). The Western Electric run rules (2 of 3 beyond $2 \sigma$ , 7 in a row on one side, 7 trending) increase the sensitivity to small shifts at the cost of a higher false-alarm rate.**

For attribute data (pass/fail, defect counts):

- **p-chart**: fraction defective in a sample of size $n$ . Centre line $\bar { p }$ , limits $\bar { p } \pm 3 { \sqrt { \bar { p } ( 1 - \bar { p } ) / n } }$ .
- **c-chart**: count of defects in a constant-size unit. Centre line $\bar { c }$ , limits $\bar { c } \pm 3 { \sqrt { \bar { c } } }$ .
- **u-chart**: defects per unit for a variable-size unit.

The **CUSUM** (cumulative sum) chart is more sensitive to small shifts (0.5–1.5σ) than the Shewhart chart:

$$
C _ { i } ^ { + } \; = \; \max \! \left( 0 , \; C _ { i - 1 } ^ { + } + ( x _ { i } - \mu _ { 0 } ) - K \right) \qquad C _ { i } ^ { - } \; = \; \max \! \left( 0 , \; C _ { i - 1 } ^ { - } - ( x _ { i } - \mu _ { 0 } ) - K \right)
$$

where $K = 0 . 5 \sigma$ is the **reference value** (the shift you want to detect) and the signal is $C _ { i } ^ { \pm } > H = 4 { - } 5 \sigma$ . **A CUSUM detects a 1σ shift in 2–3 samples; a Shewhart chart detects it in 40–50. For a process where a 1σ shift costs £500 per hour, the CUSUM pays for itself in one shift.**
:::

::: definition Sampling inspection and OC curves {#def-sampling}
**Acceptance sampling** decides whether to accept or reject a lot based on a sample, rather than inspecting every unit. The operating characteristic (OC) curve gives the **probability of acceptance** $P _ { a }$ as a function of the lot fraction defective $p$ :

$$
P _ { a } ( p ) \; = \; \sum _ { d = 0 } ^ { c } { \binom { n } { d } } \, p ^ { d } \, ( 1 - p ) ^ { n - d } \quad \text{(binomial)} \qquad \approx \; \sum _ { d = 0 } ^ { c } { \frac { ( n p ) ^ { d } \, e ^ { - n p } } { d ! } } \quad \text{(Poisson, } n \text{ large, } p \text{ small)}
$$

where $n$ is the sample size and $c$ is the acceptance number (the maximum number of defectives allowed). Two key points on the OC curve:

- **AQL** (Acceptable Quality Level): the $p$ at which $P _ { a } = 0 . 9 5$ (the producer's risk $\alpha = 0 . 0 5$ — the chance of rejecting a good lot).
- **LTPD** (Lot Tolerance Percent Defective): the $p$ at which $P _ { a } = 0 . 1 0$ (the consumer's risk $\beta = 0 . 1 0$ — the chance of accepting a bad lot).

**The ratio $R = \mathrm { LTPD } / \mathrm { AQL }$ is the discriminating power of the sampling plan. For $R = 5$ (a typical requirement), the minimum sample size is $n \approx 2 5 / \mathrm { AQL }$ and $c \approx 0 . 0 5 \, n$ . For AQL = 1 %, that is $n = 2 5 0$ and $c = 1 2$ — a big sample. The only way to reduce $n$ is to accept a higher $\alpha$ or $\beta$ , or to improve the process so that the AQL is lower.**

**100 % inspection is not the alternative to sampling: it is worse.** At 100 % inspection with a 2 % error rate (the typical rate for visual inspection of small components), 2 % of good parts are scrapped and 2 % of bad parts are shipped. Sampling with $n = 5 0$ , $c = 0$ at a 1 % defect rate accepts 60.5 % of lots and rejects 39.5 % — and the rejected lots are 100 % screened, so the outgoing quality is better than 100 % inspection. **The average outgoing quality limit (AOQL) of a rectifying inspection plan is lower than the defect rate of 100 % visual inspection, because the screening is done by a dedicated inspector, not by a tired operator at the end of a 12-hour shift.**
:::

::: proof The defect rate as a function of Cpk {#proof-cpk-ppm}
For a normal distribution with mean $\mu$ and standard deviation $\sigma$ , the fraction of parts outside the specification limits is:

$$
p \; = \; P ( X < \mathrm { L S L } ) + P ( X > \mathrm { U S L } ) \; = \; \Phi \! \left( { \frac { \mathrm { L S L } - \mu } { \sigma } } \right) + 1 - \Phi \! \left( { \frac { \mathrm { USL } - \mu } { \sigma } } \right)
$$

Define the **capability indices to each limit**: $C _ { L } = ( \mu - \mathrm { L S L } ) / ( 3 \sigma )$ and $C _ { U } = ( \mathrm { U S L } - \mu ) / ( 3 \sigma )$ , so that $C _ { p k } = \min ( C _ { L } , C _ { U } )$ . Then:

$$
p \; = \; \Phi ( - 3 C _ { L } ) + 1 - \Phi ( 3 C _ { U } ) \; = \; \Phi ( - 3 C _ { L } ) + \Phi ( - 3 C _ { U } )
$$

For a **centred** process, $C _ { L } = C _ { U } = C _ { p } = C _ { p k }$ , and:

$$
\boxed { \; p \; = \; 2 \, \Phi ( - 3 \, C _ { p k } ) \; }
$$

For $C _ { p k } = 1$ : $p = 2 \, \Phi ( - 3 ) = 2 \times 0 . 0 0 1 3 5 = 0 . 0 0 2 7 = 2 7 0 0 \ \mathrm { ppm }$ . For $C _ { p k } = 1 . 3 3$ : $p = 2 \, \Phi ( - 4 ) = 2 \times 3 . 1 7 \times 1 0 ^ { - 5 } = 6 3 \ \mathrm { ppm }$ . For $C _ { p k } = 2$ : $p = 2 \, \Phi ( - 6 ) = 2 \times 9 . 9 \times 1 0 ^ { - 1 0 } = 0 . 0 0 2 \ \mathrm { ppm }$ .

**The exponential sensitivity of $p$ to $C _ { p k }$ is the reason a 0.3-unit improvement in $C _ { p k }$ (from 1.0 to 1.33) reduces the defect rate by a factor of 43, and the reason the automotive industry insists on $C _ { p k } \geq 1 . 3 3$ for critical dimensions: at $C _ { p k } = 1 . 0$ , a production line making 100 000 parts per day ships 270 defective parts per day, and at $C _ { p k } = 1 . 3 3$ it ships 6.** $\blacksquare$
:::

::: example Cpk of a turned diameter {#ex-cpk level=3 check="0.89"}
A CNC lathe produces a $\phi 2 5 . 0 0 0 \pm 0 . 0 5 0 \ \mathrm { m m }$ diameter. A sample of 125 parts (25 subgroups of 5) gives ${ \bar { \bar { x } } } = 2 5 . 0 1 5 \ \mathrm { m m }$ and ${ \bar { R } } = 0 . 0 2 0 \ \mathrm { m m }$ . Calculate $C _ { p }$ and $C _ { p k }$ .

$$
{ \hat { \sigma } } _ { \text{within } } \; = \; { \frac { { \bar { R } } } { d _ { 2 } } } \; = \; { \frac { 0 . 0 2 0 } { 2 . 3 2 6 } } \; = \; 0 . 0 0 8 6 \ \mathrm { m m }
$$

$$
C _ { p } \; = \; { \frac { 2 5 . 0 5 0 - 2 4 . 9 5 0 } { 6 \times 0 . 0 0 8 6 } } \; = \; { \frac { 0 . 1 0 0 } { 0 . 0 5 16 } } \; = \; 1 . 9 4
$$

$$
C _ { p k } \; = \; \min \! \left( { \frac { 2 5 . 0 5 0 - 2 5 . 0 1 5 } { 3 \times 0 . 0 0 8 6 } } , \; { \frac { 2 5 . 0 1 5 - 2 4 . 9 5 0 } { 3 \times 0 . 0 0 8 6 } } \right) \; = \; \min \! \left( { \frac { 0 . 0 3 5 } { 0 . 0 2 5 8 } } , \; { \frac { 0 . 0 6 5 } { 0 . 0 2 5 8 } } \right) \; = \; \min ( 1 . 3 6 , \; 2 . 5 2 )
$$

$$
C _ { p k } \; = \; { \bf 1 . 3 6 }
$$

**The process is capable ($C _ { p k } > 1 . 3 3$) but off-centre: the mean is 15 μm above the nominal, and the $C _ { p }$ of 1.94 shows the spread is fine. The fix is a 15 μm tool offset, which brings $C _ { p k }$ up to 1.94 and reduces the defect rate from 63 ppm to 0.002 ppm. The $C _ { p } - C _ { p k }$ gap of 0.58 is the cost of not centring the process — 63 ppm of scrap for a 15 μm offset that takes 30 seconds to correct.**
:::

::: widget plot
title: Cpk is an exponential function of scrap
f: 2000000*(0.5*(1+erf(-3*x/sqrt(2))))
x: 0.5,2.5
y: 0,100000
labels: centred process: ppm = 2000000 Φ(-3 Cpk)
caption: Defect rate (ppm) against $C _ { p k }$ for a centred normal process, from $p = 2 \, \Phi ( - 3 \, C _ { p k } )$ . **The curve is exponential: $C _ { p k } = 1$ gives 2 700 ppm, $C _ { p k } = 1 . 3 3$ gives 63 ppm (a 43× improvement), $C _ { p k } = 1 . 6 7$ gives 0.6 ppm (a 100× further improvement), and $C _ { p k } = 2$ gives 0.002 ppm (a 300× further improvement). Each 0.33-unit step in $C _ { p k }$ is a factor of 40–300 in defect rate.** **Read the chart the way a quality manager reads it: the difference between $C _ { p k } = 1 . 0$ and $C _ { p k } = 1 . 3 3$ is the difference between 270 defective parts per 100 000 and 6 — and the difference between a supplier who ships with a certificate of conformance and a supplier who ships with a containment action and a corrective action report.**
:::

## 4. CNC machines and CAM

::: definition Numerical control: axes, kinematics, and G-code {#def-cnc}
A **CNC machine** is a multi-axis positioning system that moves a cutting tool (or the workpiece) along a programmed path. The axes are:

$$
\begin{array} { l l l l }
\textbf{Machine} & \textbf{Axes} & \textbf{Typical travel} & \textbf{Positioning accuracy} \\ \hline
\text{2-axis lathe} & X, Z & 300 \times 600 \ \mathrm{mm} & { \pm } 5 \ \mu\text{m} \\
\text{3-axis mill} & X, Y, Z & 500 \times 400 \times 400 \ \mathrm{mm} & { \pm } 5 \ \mu\text{m} \\
\text{5-axis mill} & X, Y, Z, A, C & 630 \times 560 \times 500 \ \mathrm{mm} & { \pm } 5 \ \mu\text{m} \\
\text{5-axis simultaneous} & X, Y, Z, B, C & 800 \times 700 \times 600 \ \mathrm{mm} & { \pm } 3 \ \mu\text{m} \\
\text{Wire EDM} & X, Y, U, V & 500 \times 400 \times 300 \ \mathrm{mm} & { \pm } 2 \ \mu\text{m} \\
\text{CMM} & X, Y, Z & 1200 \times 1000 \times 800 \ \mathrm{mm} & { \pm } 1 . 5 \ \mu\text{m} \\
\end{array}
$$

The **21 rigid-body errors** per machine (7 per linear axis: 6 DOF positioning errors + 1 straightness; plus 2 squareness errors per axis pair) are the fundamental limit on volumetric accuracy. A typical 5-axis machining centre has a volumetric accuracy of 10–25 μm over its full travel, which is 3–5× worse than the single-axis positioning accuracy, because the squareness and angular errors accumulate. **Laser interferometer calibration (ISO 230-2) measures the 21 errors and feeds them back into the CNC controller as a compensation table. A well-compensated machine achieves 3–5 μm volumetric accuracy; an uncompensated one achieves 15–30 μm.**

**G-code** (ISO 6983) is the programming language of CNC machines. A typical turning program:

```
G97 S800 M03       (constant spindle speed, 800 RPM, CW)
G00 X52.0 Z2.0     (rapid to start position)
G01 Z-30.0 F0.15   (linear cut to Z-30, 0.15 mm/rev)
G01 X24.85 F0.10   (face to diameter 24.85, 0.10 mm/rev)
G00 X55.0 Z5.0     (rapid retract)
M30                 (end of program)
```

The **post-processor** translates the CAM system's tool-path data (CLSF: Cutter Location Source File) into machine-specific G-code, accounting for the machine's kinematics (trunnion vs swivel head), axis limits, tool-changer capacity, and controller dialect (Fanuc, Siemens, Heidenhain, Haas). **A post-processor bug that puts a G01 in rapid mode crashes the tool into the part at 30 m/min; a post-processor that does not account for the trunnion's singularity near A = 90° produces a gouge.**
:::

::: definition Machine accuracy, repeatability, and the Abbe principle {#def-machine-accuracy}
Three numbers characterise a machine's positioning performance (ISO 230-2):

- **Resolution**: the smallest increment the control system can command. For a modern CNC with a linear scale feedback, 0.1 μm. For a machine without scales (open-loop servo), the resolution is the encoder count divided by the gear ratio, typically 1–5 μm.
- **Repeatability**: the standard deviation of the position achieved when the same target is commanded repeatedly from the same direction. A good machine: $\pm 1 { - } 2 \ \mu \mathrm { m }$ ( $3 \sigma$ ). A worn machine: $\pm 5 { - } 1 0 \ \mu \mathrm { m }$ .
- **Positioning accuracy (bidirectional)**: the maximum deviation from the commanded position when approached from both directions. The difference between unidirectional and bidirectional accuracy is the **backlash** (the play in the ball screw and the bearing), typically 2–10 μm.

The **Abbe principle** applies to machine tools as well as to measuring instruments. In a machining centre, the linear scale is on the guideway, but the cutting edge is at the tip of the tool, which is 50–300 mm from the scale (the **Abbe offset**). A 1 arcsec pitch error of the X-slide produces a Z-direction error at the tool tip of:

$$
\varepsilon \; = \; L _ { \text{tool} } \times \theta \; = \; 2 0 0 \times 4 . 8 5 \times 1 0 ^ { - 6 } \; = \; 1 . 0 \ \mu \mathrm { m } \quad (\text{per arcsec, per 200 mm tool length})
$$

**A 5 arcsec pitch error with a 200 mm tool produces a 5 μm error — 10 % of a typical $\pm 0 . 0 2 5 \ \mathrm { m m }$ tolerance. This is why high-precision machining centres have the linear scale as close to the cutting zone as possible, why the guideways are scraped to 2–5 arcsec straightness, and why the thermal growth of the spindle (which changes the tool length by 10–30 μm over a 4-hour shift) is compensated by a tool-length probe.**
:::

::: definition CAM: tool paths, simulation, and adaptive machining {#def-cam}
**CAM** (computer-aided manufacturing) generates the tool-path coordinates from the CAD model. The key decisions are:

- **Cutting strategy**: climb vs conventional milling, zig-zag vs zig vs contour-parallel, trochoidal (adaptive clearing), helical interpolation. The strategy determines the tool load, the surface finish, and the cycle time. **Climb milling (the tool rotates into the cut) leaves a better surface and a longer tool life than conventional milling (the tool rotates out of the cut), because the chip thickness increases from zero instead of decreasing to zero.**
- **Step-over and step-down**: the scallop height $h _ { s } = { \delta ^ { 2 } } / ( 4 R )$ (for a ball-nose cutter of radius $R$ and step-over $\delta$ ) determines the surface finish. For $R = 6 \ \mathrm { m m }$ and $h _ { s } = 5 \ \mu \mathrm { m }$ : $\delta = { \sqrt { 4 \times 6 \times 0 . 0 0 5 } } = 0 . 3 5 \ \mathrm { m m }$ . **The step-over is the CAM parameter that controls the surface finish, and the cycle time is proportional to $1 / \delta ^ { 2 }$ — halving the scallop quadruples the time.**
- **Simulation**: the CAM system simulates the tool path against the stock model to detect gouges, collisions, and uncut material. **A simulation that catches one crash saves a £50 000 spindle, a £5 000 fixture, and a £2 000 part. The simulation takes 5 minutes; the crash takes 5 seconds.**
- **Adaptive machining**: an in-process probe measures the machined surface and adjusts the tool path to compensate for fixture deflection, thermal growth, and tool wear. **A 3-coordinate in-process probe on a machining centre reduces the setup time from 4 hours to 30 minutes and the scrap rate from 5 % to 0.5 %.**
:::

::: example Volumetric accuracy and the 21 errors {#ex-volumetric level=3 check="12"}
A 5-axis machining centre has the following errors (all in μm):

- Linear positioning: X: ±3, Y: ±3, Z: ±4
- Straightness: XY: ±2, XZ: ±2, YZ: ±3
- Squareness: XY: ±3, XZ: ±3, YZ: ±4
- Angular (pitch/yaw/roll): 3 arcsec per axis

Estimate the volumetric accuracy at the centre of the work envelope (X = Y = Z = 200 mm) with a 150 mm tool.

The volumetric error is the RSS of all contributions:

$$
\varepsilon _ { \text{vol } } \; = \; { \sqrt { \varepsilon _ { \text{pos} } ^ { 2 } + \varepsilon _ { \text{straight} } ^ { 2 } + \varepsilon _ { \text{sq} } ^ { 2 } + \varepsilon _ { \text{Abbe} } ^ { 2 } } }
$$

$$
\varepsilon _ { \text{pos} } \; = \; { \sqrt { 3 ^ { 2 } + 3 ^ { 2 } + 4 ^ { 2 } } } \; = \; { \sqrt { 3 4 } } \; = \; 5 . 8 \ \mu \mathrm { m }
$$

$$
\varepsilon _ { \text{sq} } \; = \; { \sqrt { 3 ^ { 2 } + 3 ^ { 2 } + 4 ^ { 2 } } } \; = \; 5 . 8 \ \mu \mathrm { m } \quad (\text{projected over 200 mm travel})
$$

$$
\varepsilon _ { \text{Abbe} } \; = \; 1 5 0 \times 3 \times 4 . 8 5 \times 1 0 ^ { - 6 } \; = \; 2 . 2 \ \mu \mathrm { m } \quad (\text{3 arcsec, 150 mm tool})
$$

$$
\varepsilon _ { \text{vol } } \; = \; { \sqrt { 5 . 8 ^ { 2 } + 3 . 7 ^ { 2 } + 5 . 8 ^ { 2 } + 2 . 2 ^ { 2 } } } \; = \; { \sqrt { 3 3 . 6 + 1 3 . 7 + 3 3 . 6 + 4 . 8 } } \; = \; { \sqrt { 8 5 . 7 } } \; = \; { \bf 9 . 3 \ \mu m}
$$

**The volumetric accuracy is 9.3 μm — about 3× the single-axis positioning accuracy. The squareness and Abbe errors contribute 40 % of the total, and they are the errors that laser interferometer calibration corrects. A well-compensated machine achieves 4–5 μm volumetric accuracy; an uncompensated one achieves 10–15 μm. The difference is the difference between a $\pm 0 . 0 1 \ \mathrm { m m }$ tolerance that is achievable and one that is not.**
:::

::: widget plot
title: Takt time: the heartbeat of the line
f: 28800/x
x: 50,500
y: 0,600
labels: 8-hour shift, 100 % availability
caption: Takt time (seconds per part) against demand (parts per 8-hour shift), for $T _ { \text{takt } } = 2 8 \ 8 0 0 / N$ . **At 100 parts per shift, the takt time is 288 seconds — nearly 5 minutes per station. At 500 parts per shift, the takt time is 58 seconds — less than a minute. The takt time is the maximum cycle time any station can have, and it is the constraint that drives every line-balancing decision.** **Read the chart the way a plant manager reads it: if your cycle time is 45 seconds and the takt time is 58 seconds, you have 13 seconds of slack per station and you can run the line at 78 % efficiency. If the takt time drops to 30 seconds (demand doubles), you need a second station, a second shift, or a faster process.**
:::

## 5. Automated production systems

::: definition Manufacturing cells, flexible systems, and production lines {#def-production-systems}
The three levels of production automation are:

$$
\begin{array} { l l l l }
\textbf{Level} & \textbf{Configuration} & \textbf{Changeover} & \textbf{Volume} \\ \hline
\text{Fixed (hard) automation} & \text{dedicated transfer line} & \text{days--weeks} & \text{> 100 000/yr} \\
\text{Flexible (soft) automation} & \text{CNC + pallet changer + FMS} & \text{minutes} & \text{100--50 000/yr} \\
\text{Cellular manufacturing} & \text{2--5 CNCs + robot + WIP} & \text{minutes--hours} & \text{100--10 000/yr} \\
\text{Job shop} & \text{general-purpose machines} & \text{hours--days} & \text{1--500/yr} \\
\end{array}
$$

A **flexible manufacturing system** (FMS) is a group of CNC machines linked by an automated material-handling system (conveyor, AGV, or rail-guided vehicle) and controlled by a central computer. The FMS can produce any part in its family without manual intervention. **The FMS was the dominant automation paradigm of the 1980s and failed commercially for most applications, because the capital cost ($5–20 million) could not be justified by the 20–30 % labour saving, and the software complexity made it unreliable. The modern equivalent is the "lights-out cell": 2–4 CNC machines with a pallet-pool robot, running unattended for 24–72 hours.**

**Group technology** (GT) classifies parts into families by geometric similarity (diameter, length, number of features, tolerance class) and routes each family through a dedicated **manufacturing cell** — a small group of dissimilar machines arranged in a U-shape, staffed by 1–3 operators. The GT coding system (Opitz, KK-3) assigns a 9–12 digit code to each part, and parts with the same code are produced in the same cell. **The benefit of GT is not the machines (they are the same CNCs as in the job shop) but the flow: the part goes through the cell in hours instead of through the shop in weeks, the WIP drops by 70 %, and the setup time drops by 50 % because the cell's machines are dedicated to one family.**
:::

::: definition Line balancing and takt time {#def-line-balance}
The **takt time** is the available production time divided by the customer demand:

$$
T _ { \text{takt } } \; = \; { \frac { T _ { \text{available } } } { N _ { \text{demand } } } } \quad [ \text{s/part} ]
$$

The **minimum number of stations** is:

$$
N _ { \min } \; = \; \left\lceil { \frac { \sum _ { i = 1 } ^ { M } t _ { i } } { T _ { \text{takt } } } } \right\rceil
$$

where $t _ { i }$ is the time of the $i$-th task and $M$ is the total number of tasks. The **line efficiency** is:

$$
\eta \; = \; { \frac { \sum t _ { i } } { N \times T _ { \text{takt } } } } \times 1 0 0 \ \%
$$

and the **idle time** (the time the operators spend waiting) is $I = N \times T _ { \text{takt } } - \sum t _ { i }$ . **The line-balancing problem is to assign the $M$ tasks to $N$ stations, respecting the precedence constraints (task B cannot start before task A is finished), so that the maximum station time is minimised. The problem is NP-hard, but for $M < 5 0$ tasks, a simple heuristic (assign the longest task first, subject to precedence) gets within 10 % of optimal.**
:::

::: definition Lean manufacturing, Six Sigma, and Industry 4.0 {#def-lean-sixsigma}
**Lean manufacturing** (Toyota Production System) is a philosophy of eliminating waste (muda): overproduction, waiting, transport, over-processing, inventory, motion, defects. The tools are:

- **5S**: sort, set in order, shine, standardise, sustain. A workplace where a missing tool is visible in 10 seconds.
- **Kanban**: a pull system where the downstream station signals the upstream station to produce more. The WIP is capped at the number of kanban cards.
- **SMED** (single-minute exchange of die): reduce setup time below 10 minutes by converting internal setup (done with the machine stopped) to external setup (done while the machine runs). **A 4-hour press setup reduced to 12 minutes by SMED increases the available capacity by 15 % without buying a second press.**
- **Poka-Yoke**: error-proofing. A fixture that can only hold the part one way, a sensor that detects a missing O-ring, a torque wrench that clicks at the right value. **A poka-yoke that prevents one defect per 10 000 parts saves more than the inspection it replaces.**

**Six Sigma** is a data-driven methodology for reducing process variation to 3.4 defects per million opportunities (DPMO), corresponding to a $C _ { p k }$ of 2.0 (with a 1.5σ long-term shift). The DMAIC cycle: Define, Measure, Analyze, Improve, Control. **Six Sigma is SPC with a budget: the "Improve" step is a design of experiments (DOE) that identifies the 2–3 process variables that account for 80 % of the variation, and the "Control" step is a control chart that detects when those variables drift.**

**Industry 4.0** is the integration of cyber-physical systems into manufacturing: IoT sensors on every machine, a digital twin that simulates the line in real time, predictive maintenance based on vibration and current signatures, and a manufacturing execution system (MES) that tracks every part through every operation. **The practical benefit of Industry 4.0 is not the technology (the sensors and the software have existed for 20 years) but the data: a machine that reports its own spindle vibration can predict a bearing failure 200 hours before it happens, and 200 hours is enough to schedule the replacement during a planned downtime instead of an unplanned one.**
:::

::: example Line balancing: a 6-station assembly {#ex-line-balance level=3 check="94"}
A subassembly has 8 tasks with the following times and precedences:

| Task | Time (s) | Predecessor |
|------|----------|-------------|
| A | 5 | — |
| B | 3 | A |
| C | 8 | A |
| D | 4 | B |
| E | 6 | B, C |
| F | 7 | D, E |
| G | 5 | E |
| H | 4 | F, G |

The demand is 240 parts per 8-hour shift (28 800 s). Balance the line.

$$
T _ { \text{takt } } \; = \; { \frac { 2 8 \ 8 0 0 } { 2 4 0 } } \; = \; 1 2 0 \ \mathrm { s}
$$

$$
N _ { \min } \; = \; \left\lceil { \frac { 5 + 3 + 8 + 4 + 6 + 7 + 5 + 4 } { 1 2 0 } } \right\rceil \; = \; \left\lceil { \frac { 4 2 } { 1 2 0 } } \right\rceil \; = \; 1
$$

With $N _ { \min } = 1$ , a single station can do all tasks in 42 s, well within the 120 s takt. But the precedence constraint requires a minimum of 4 stations (the longest path is A→C→E→F→H = 5+8+6+7+4 = 30 s, and the critical path through B is 5+3+6+7+4 = 25 s). With 4 stations:

- Station 1: A, B (8 s)
- Station 2: C, D (12 s)
- Station 3: E, G (11 s)
- Station 4: F, H (11 s)

$$
\eta \; = \; { \frac { 4 2 } { 4 \times 1 2 0 } } \; = \; { \frac { 4 2 } { 4 8 0 } } \; = \; 8 . 7 5 \ \%
$$

**The efficiency is terrible because the takt time (120 s) is 10× the total task time (42 s). The line is demand-limited, not capacity-limited. The correct answer is 1 operator who does all 8 tasks in 42 s, waits 78 s, and repeats. The efficiency is $4 2 / 1 2 0 = 3 5 \ \%$ , and the operator is idle 65 % of the time. The fix is to add a second product to the line (mixed-model assembly) or to reduce the takt time by increasing the demand.**
:::

## 6. Quality systems and inspection

::: definition Quality management systems: ISO 9001, AS9100, IATF 16949 {#def-qms}
A **quality management system** (QMS) is a documented set of processes, procedures, and responsibilities for achieving quality objectives. The three standards that dominate mechanical engineering are:

- **ISO 9001:2015**: the generic QMS. Process approach, risk-based thinking, leadership commitment, continual improvement. The certificate is the minimum requirement for any supplier to any OEM.
- **AS9100D**: the aerospace QMS. Adds configuration management, first article inspection (AS9102), counterfeit part prevention, human factors, and product safety. **An AS9100 audit is a 3–5 day event that examines every process on the shop floor, every calibration certificate, every non-conformance report, and every corrective action. The auditor's question is always the same: "Show me the evidence."**
- **IATF 16949:2016**: the automotive QMS. Adds APQP, PPAP, FMEA, MSA, SPC, and the 5 core tools. The automotive standard is more prescriptive than AS9100: it specifies the methods (control charts, capability indices, gauge R&R) rather than just the outcomes.

**The cost of quality** follows the 1-10-100 rule: £1 spent on prevention saves £10 on appraisal and £100 on failure. The categories are:

$$
\begin{array} { l l l }
\textbf{Category} & \textbf{Examples} & \textbf{Typical \% of revenue} \\ \hline
\text{Prevention} & \text{training, FMEA, SPC, poka-yoke} & 2 { - } 5 \ \% \\
\text{Appraisal} & \text{inspection, testing, audits, calibration} & 3 { - } 7 \ \% \\
\text{Internal failure} & \text{scrap, rework, re-inspection, downtime} & 3 { - } 1 0 \ \% \\
\text{External failure} & \text{warranty, recall, liability, lost customers} & 1 { - } 5 \ \% \\
\end{array}
$$

**The total cost of quality in a typical machine shop is 15–25 % of revenue. The 1-10-100 rule says that spending 1 % more on prevention (SPC, training, poka-yoke) saves 10 % on appraisal and 100 % on failure. The arithmetic is not exact, but the direction is: the cheapest defect is the one that never happens.**
:::

::: definition FMEA, PPAP, and APQP {#def-fmea}
**FMEA** (Failure Mode and Effects Analysis) is a structured method for identifying potential failures, their causes, and their effects, and for prioritising corrective actions. The **risk priority number** (RPN) is:

$$
\text{RPN } \; = \; S \times O \times D
$$

where $S$ (severity, 1–10) is the consequence of the failure, $O$ (occurrence, 1–10) is the frequency of the cause, and $D$ (detection, 1–10) is the difficulty of detecting the failure before it reaches the customer. **The detection rating is the one that changes with process controls: a $D$ of 8 means "the defect is detected by the customer," a $D$ of 3 means "the defect is detected by an automated poka-yoke," and a $D$ of 1 means "the defect is prevented by design." The FMEA's value is not the RPN number (which is arbitrary and gameable) but the conversation it forces: "What happens if this weld is cold? How would we know? What if we cannot know?"**

**APQP** (Advanced Product Quality Planning) is the automotive framework for bringing a new part from concept to production in five phases: (1) Plan and define, (2) Product design and development, (3) Process design and development, (4) Product and process validation, (5) Feedback and corrective action. **PPAP** (Production Part Approval Process) is the deliverable at the end of phase 4: a package of 18 documents (design records, FMEA, control plan, MSA, capability studies, PPAP sample parts, material certifications, appearance approval) that proves the supplier can make the part to print, consistently, at the quoted rate. **A PPAP Level 3 submission (the default) is 200–500 pages. The customer's SQE reviews it in 2–5 days and either approves it, approves it with deviations, or rejects it. A rejected PPAP means the part is not approved for production, and the programme is late.**
:::

::: example FMEA for a machined shaft {#ex-fmea level=3 check="160"}
A machined shaft has a $\phi 2 5 \pm 0 . 0 1 3$ bearing journal. The FMEA entry:

| Item | Failure mode | Effect | S | Cause | O | Current control | D | RPN |
|------|-------------|--------|---|-------|---|----------------|---|-----|
| Journal | Oversize | Bearing will not assemble | 8 | Tool wear | 4 | CMM at 50 pcs | 5 | 160 |

The RPN is $8 \times 4 \times 5 = 1 6 0$ . **The action is to reduce $D$ from 5 to 2 by adding an in-process gauge with automatic tool compensation (the gauge measures every part and offsets the tool when the trend approaches the limit). The new RPN is $8 \times 4 \times 2 = 6 4$ , below the typical action threshold of 100. The action does not change $S$ (the effect is still severe) or $O$ (the cause is still tool wear), but it changes $D$ from "we find it when we measure" to "we prevent it from happening."**
:::

## Exercises

::: exercise Measurement uncertainty: combined and expanded {#ex-unc-comb level=3 check="2.0"}
A 50 mm gauge block is measured on a CMM. The uncertainty components are: CMM error $u _ { 1 } = 1 . 2 \ \mu \mathrm { m }$, thermal $u _ { 2 } = 0 . 5 \ \mu \mathrm { m }$, calibration $u _ { 3 } = 0 . 3 \ \mu \mathrm { m }$, repeatability $u _ { 4 } = 0 . 4 \ \mu \mathrm { m }$. What is the expanded uncertainty $U$ at $k = 2$?

::: solution
$$
u _ { c } \; = \; { \sqrt { 1 . 2 ^ { 2 } + 0 . 5 ^ { 2 } + 0 . 3 ^ { 2 } + 0 . 4 ^ { 2 } } } \; = \; { \sqrt { 1 . 4 4 + 0 . 2 5 + 0 . 0 9 + 0 . 1 6 } } \; = \; { \sqrt { 1 . 9 4 } } \; = \; 1 . 3 9 \ \mu \mathrm { m }
$$

$$
U \; = \; 2 \times 1 . 3 9 \; = \; { \bf 2 . 8 \ \mu m}
$$

**The CMM error dominates (74 % of the variance). The expanded uncertainty of 2.8 μm is 5.6 % of a $\pm 0 . 0 2 5 \ \mathrm { m m }$ tolerance — within the 10:1 rule but not comfortable. For a $\pm 0 . 0 1 0 \ \mathrm { m m }$ tolerance, this CMM is not adequate (28 % of the tolerance).**
:::
:::

::: exercise Process capability: Cpk and defect rate {#ex-cpk2 level=3 check="1.0"}
A hole is specified at $\phi 1 2 . 0 0 0 \, _ { - 0 . 0 0 0 } ^ { + 0 . 0 2 5 } \ \mathrm { m m }$ . The process mean is $\mu = 1 2 . 0 1 0 \ \mathrm { m m }$ and $\sigma = 0 . 0 0 5 \ \mathrm { m m }$ . Calculate $C _ { p k }$ and the expected defect rate.

::: solution
$$
C _ { p k } \; = \; \min \! \left( { \frac { 1 2 . 0 2 5 - 1 2 . 0 1 0 } { 3 \times 0 . 0 0 5 } } , \; { \frac { 1 2 . 0 1 0 - 1 2 . 0 0 0 } { 3 \times 0 . 0 0 5 } } \right) \; = \; \min \! \left( { \frac { 0 . 0 1 5 } { 0 . 0 1 5 } } , \; { \frac { 0 . 0 1 0 } { 0 . 0 1 5 } } \right) \; = \; \min ( 1 . 0 , \; 0 . 6 6 7 )
$$

$$
C _ { p k } \; = \; { \bf 0 . 6 7 }
$$

The defect rate: $p = \Phi ( ( 1 2 . 0 0 0 - 1 2 . 0 1 0 ) / 0 . 0 0 5 ) + 1 - \Phi ( ( 1 2 . 0 2 5 - 1 2 . 0 1 0 ) / 0 . 0 0 5 ) = \Phi ( - 2 ) + 1 - \Phi ( 3 ) = 0 . 0 2 2 8 + 0 . 0 0 1 3 5 = 0 . 0 2 4 1 = 2 4 \ 1 0 0 \ \mathrm { ppm }$ .

**The process is not capable ($C _ { p k } < 1 . 0$) and the defect rate is 2.4 %. The problem is the off-centre: the mean is 10 μm above the nominal, and the lower limit is only 2σ away. Centring the process at 12.0125 (the midpoint) would give $C _ { p k } = 0 . 8 3$ — still not capable, but the defect rate drops to 1 350 ppm. The real fix is to reduce $\sigma$ to 0.003 mm (a better reamer, a more rigid setup) and centre the process.**
:::
:::

::: exercise Control chart limits {#ex-chart-limits level=3 check="10.03"}
An X-bar/R chart with $n = 5$ has ${ \bar { \bar { x } } } = 1 0 . 0 2 0 \ \mathrm { m m }$ and ${ \bar { R } } = 0 . 0 2 5 \ \mathrm { m m }$ . Calculate the X-bar chart control limits.

::: solution
For $n = 5$ : $A _ { 2 } = 0 . 5 7 7$ .

$$
\text{UCL } \; = \; 1 0 . 0 2 0 + 0 . 5 7 7 \times 0 . 0 2 5 \; = \; 1 0 . 0 2 0 + 0 . 0 1 4 4 \; = \; { \bf 1 0 . 0 3 4 \ \mathrm { m m } }
$$

$$
\text{LCL } \; = \; 1 0 . 0 2 0 - 0 . 0 1 4 4 \; = \; 1 0 . 0 0 6 \ \mathrm { m m }
$$

**The control limits are $\pm 1 4 . 4 \ \mu \mathrm { m }$ around the mean. If the specification is $1 0 . 0 0 0 \pm 5 0 \ \mu \mathrm { m }$ , the control limits are well inside the specification, and the process is in control and capable. If the specification is $1 0 . 0 0 0 \pm 1 5 \ \mu \mathrm { m }$ , the control limits are nearly as wide as the specification, and the process is in control but barely capable — any drift will produce out-of-spec parts before the control chart signals.**
:::
:::

::: exercise Sampling inspection: OC curve {#ex-oc-curve level=3 check="0.81"}
A lot is sampled with $n = 5 0$ , $c = 2$ . What is the probability of accepting a lot with 3 % defectives?

::: solution
Using the binomial distribution:

$$
P _ { a } \; = \; \sum _ { d = 0 } ^ { 2 } { \binom { 5 0 } { d } } \, 0 . 0 3 ^ { d } \, 0 . 9 7 ^ { 5 0 - d }
$$

$$
= \; 0 . 9 7 ^ { 5 0 } + 5 0 \times 0 . 0 3 \times 0 . 9 7 ^ { 4 9 } + 1 2 2 5 \times 0 . 0 0 0 9 \times 0 . 9 7 ^ { 4 8 }
$$

$$
= \; 0 . 2 1 8 + 0 . 3 3 7 + 0 . 2 5 6 \; = \; { \bf 0 . 8 1 }
$$

**There is an 81 % chance of accepting a lot that is 3 % defective. The AQL (at $P _ { a } = 0 . 9 5$) is about 1.2 %, and the LTPD (at $P _ { a } = 0 . 1 0$) is about 8 %. The sampling plan is loose: it accepts most lots with up to 3 % defectives and rejects most lots with more than 8 %. For a critical dimension, this plan is inadequate; for a cosmetic dimension, it is fine.**
:::
:::

::: exercise Abbe error in a depth micrometer {#ex-abbe-depth level=2 check="1.2"}
A depth micrometer with a 50 mm extension has an Abbe offset of 50 mm. The spindle has a pitch error of 5 arcsec. What is the displacement error?

::: solution
$$
\varepsilon \; = \; e \times \theta \; = \; 5 0 \times 5 \times { \frac { \pi } { 1 8 0 \times 3 6 0 0 } } \; = \; 5 0 \times 2 4 . 2 \times 1 0 ^ { - 6 } \; = \; { \bf 1 . 2 \ \mu m}
$$

**1.2 μm is small in absolute terms but 5 % of a $\pm 0 . 0 2 5 \ \mathrm { m m }$ tolerance and 24 % of a $\pm 0 . 0 0 5 \ \mathrm { m m }$ tolerance. The Abbe error is the reason depth micrometers are not used for tolerances tighter than $\pm 0 . 0 1 \ \mathrm { m m }$ , and the reason CMMs measure depth with the Z-axis (where the scale is on the ram and the Abbe offset is zero).**
:::
:::

::: exercise FMEA risk priority number {#ex-fmea-rpn level=2 check="160"}
A weld joint has severity 8 (structural failure), occurrence 4 (1 in 500 welds), and detection 5 (visual inspection catches 50 %). What is the RPN, and what action reduces it below 100?

::: solution
$$
\text{RPN } \; = \; 8 \times 4 \times 5 \; = \; { \bf 1 6 0 }
$$

**Above the typical action threshold of 100. The most effective action is to reduce $D$ from 5 to 2 by adding 100 % dye-penetrant inspection or automated ultrasonic inspection: RPN drops to $8 \times 4 \times 2 = 6 4$ . Reducing $O$ from 4 to 2 (by improving the weld procedure) gives $8 \times 2 \times 5 = 8 0$ . Reducing $S$ from 8 to 4 (by adding a redundant load path) gives $4 \times 4 \times 5 = 8 0$ . The best action is the one that reduces the product the most for the least cost, and in this case it is the detection improvement, because it costs £5 per part in inspection labour and does not require a design change.**
:::
:::

::: exercise Derivation: the OC curve from the binomial distribution {#ex-derive-oc level=4 check="0.37"}
Derive the OC curve for a single-sampling plan with $n = 1 0 0$ , $c = 0$ . Evaluate $P _ { a }$ at $p = 0 . 0 1$ .

::: solution
For $c = 0$ , the lot is accepted only if zero defectives are found in the sample. The probability of finding zero defectives in a sample of $n$ from a lot with fraction defective $p$ is:

$$
P _ { a } ( p ) \; = \; ( 1 - p ) ^ { n }
$$

This is the binomial with $d = 0$ : $P _ { a } = { \binom { n } { 0 } } p ^ { 0 } ( 1 - p ) ^ { n } = ( 1 - p ) ^ { n }$ .

For $n = 1 0 0$ , $p = 0 . 0 1$ :

$$
P _ { a } \; = \; 0 . 9 9 ^ { 1 0 0 } \; = \; e ^ { 1 0 0 \ln 0 . 9 9 } \; = \; e ^ { - 1 . 0 0 5 } \; = \; { \bf 0 . 3 6 6 }
$$

**A 1 % defective lot has a 37 % chance of being accepted and a 63 % chance of being rejected. The AQL (at $P _ { a } = 0 . 9 5$) is $p = 1 - 0 . 9 5 ^ { 1 / 1 0 0 } = 0 . 0 0 0 5 = 0 . 0 5 \ \%$ . The $c = 0$ plan is very tight: it rejects 95 % of lots with more than 0.05 % defectives. This is the plan used for safety-critical characteristics in the automotive industry, and it is the reason automotive suppliers run at $C _ { p k } > 2$ — because a $c = 0$ plan with $n = 1 0 0$ will reject their lot if the defect rate exceeds 500 ppm.** $\blacksquare$
:::
:::

::: exercise Derivation: Cpk for an off-centre process {#ex-derive-cpk level=4 check="2.7"}
A process has $C _ { p } = 1 . 5$ and the mean is shifted by $1 . 5 \sigma$ from the centre. Calculate $C _ { p k }$ and the defect rate.

::: solution
With $C _ { p } = 1 . 5$ : the tolerance width is $6 \sigma \times 1 . 5 = 9 \sigma$ . The distance from the mean to the nearest limit is:

$$
{ \frac { 9 \sigma } { 2 } } - 1 . 5 \sigma \; = \; 4 . 5 \sigma - 1 . 5 \sigma \; = \; 3 . 0 \sigma
$$

$$
C _ { p k } \; = \; { \frac { 3 . 0 \sigma } { 3 \sigma } } \; = \; { \bf 1 . 0}
$$

The defect rate: $p = \Phi ( - 3 . 0 ) + \Phi ( - 6 . 0 ) = 0 . 0 0 1 3 5 + 0 . 0 0 0 0 0 0 5 \approx 1 3 5 0 \ \mathrm { ppm }$ .

**The $C _ { p }$ of 1.5 (which would give 0.002 ppm if centred) is reduced to a $C _ { p k }$ of 1.0 (2 700 ppm) by a 1.5σ shift. The shift costs 1 350 ppm of scrap — and the shift is only 1.5σ, which is a 7.5 μm offset on a process with $\sigma = 5 \ \mu \mathrm { m }$ . This is why centring the process is the cheapest quality improvement available: it costs one tool offset and recovers a factor of 2 000 in defect rate.** $\blacksquare$
:::
:::

::: exercise Takt time and line efficiency {#ex-takt level=3 check="94"}
A line has 4 stations with cycle times of 55, 48, 62, and 50 seconds. The demand is 480 parts per 8-hour shift. Calculate the takt time, the bottleneck, and the line efficiency.

::: solution
$$
T _ { \text{takt } } \; = \; { \frac { 2 8 \ 8 0 0 } { 4 8 0 } } \; = \; 6 0 \ \mathrm { s}
$$

The bottleneck is Station 3 at 62 s, which exceeds the takt time of 60 s. **The line cannot meet demand.** The line efficiency (based on the bottleneck):

$$
\eta \; = \; { \frac { 5 5 + 48 + 62 + 50 } { 4 \times 6 2 } } \; = \; { \frac { 2 1 5 } { 2 4 8 } } \; = \; { \bf 8 7 \ \% }
$$

**The line is 87 % efficient but cannot meet demand because the bottleneck (62 s) exceeds the takt (60 s). The fix is to rebalance: move 2 s of work from Station 3 to Station 2 (which has 12 s of slack), bringing all stations to $\leq 6 0 \ \mathrm { s }$ . The efficiency drops to $2 1 5 / ( 4 \times 6 0 ) = 9 0 \ \%$ — wait, it goes up, because the denominator decreases. The efficiency is maximised when all stations have equal cycle time.**
:::
:::

::: quiz Measurement uncertainty {#quiz-unc}
A part has a tolerance of $\pm 0 . 0 2 0 \ \mathrm { m m }$ . The measurement uncertainty is $\pm 0 . 0 0 5 \ \mathrm { m m }$ at $k = 2$ . What is the ratio of measurement uncertainty to tolerance, and is it acceptable by the 10:1 rule?

- [ ] 5 % — acceptable
- [x] 25 % — not acceptable by the 10:1 rule
- [ ] 10 % — exactly at the limit
- [ ] 50 % — the measurement is useless

::: solution
The tolerance width is $2 \times 0 . 0 2 0 = 0 . 0 4 0 \ \mathrm { m m }$ . The expanded uncertainty is $0 . 0 0 5 \ \mathrm { m m }$ . The ratio is $0 . 0 0 5 / 0 . 0 4 0 = 1 2 . 5 \ \%$ — or, if you compare the uncertainty to the half-tolerance: $0 . 0 0 5 / 0 . 0 2 0 = 2 5 \ \%$ . By the 10:1 rule (uncertainty $\leq 1 0 \ \%$ of the tolerance width), the measurement is marginal. By the stricter interpretation (uncertainty $\leq 1 0 \ \%$ of the half-tolerance), it fails. **The practical answer: the measurement can make the accept/reject decision for most parts, but parts within 5 μm of the limit are in the "indeterminate zone" and should be re-measured with a better instrument or a comparison gauge.**
:::
:::

::: quiz Process capability {#quiz-cpk}
A process has $C _ { p } = 2 . 0$ and $C _ { p k } = 1 . 0$ . What does this tell you?

- [ ] The process is not capable and the spread is too wide
- [x] The spread is fine but the process is off-centre
- [ ] The process is centred but the spread is too wide
- [ ] The measurement system is bad

::: solution
**The spread is fine but the process is off-centre.** $C _ { p } = 2 . 0$ means the $6 \sigma$ spread fits within the tolerance with a factor of 2 to spare — the spread is excellent. $C _ { p k } = 1 . 0$ means the nearest specification limit is only $3 \sigma$ from the mean — the process is shifted by $C _ { p } - C _ { p k } = 1 . 0$ units of $3 \sigma$ , i.e., $3 \sigma$ off-centre. **The fix is a simple centring adjustment (a tool offset, a fixture shim), not a process improvement. The $C _ { p } - C _ { p k }$ gap is the cost of not centring, and it is always the cheapest quality improvement available.**
:::
:::

## Where this lesson leads

- **[[manufacturing/machining]]** — The tolerance the machine can hold is the input to the capability calculation. The surface finish, the tool wear, and the thermal growth of the spindle are the sources of the variation that SPC monitors.
- **[[manufacturing/process-selection]]** — The IT grade a process can achieve determines which processes are candidates. A $\pm 0 . 0 0 5 \ \mathrm { m m }$ tolerance eliminates casting, forging, and sheet metal; a $\pm 0 . 5 \ \mathrm { m m }$ tolerance eliminates grinding and EDM.
- **[[manufacturing/additive-manufacturing]]** — AM's as-built tolerance is $\pm 0 . 1 { - } 0 . 3 \ \mathrm { m m }$ , which is IT14–IT16. Every critical dimension on an AM part is machined, and the machining allowance is a tolerance stack-up problem.
- **[[manufacturing/joining]]** — Weld inspection (VT, PT, MT, RT, UT) is an attribute measurement with a detection probability that depends on the defect orientation, the surface condition, and the inspector's certification level. The probability of detection (POD) curve is the OC curve of NDT.
- **[[manufacturing/casting]]** — Casting tolerances are IT14–IT17 ($\pm 0 . 3 { - } 3 \ \mathrm { m m }$ on a 100 mm part), and the dimensional accuracy depends on the pattern wear, the mould temperature, and the shrinkage allowance. The pattern is calibrated, the mould is pyrometer-controlled, and the first article is scanned.
- **[[control-systems/pid-control]]** — A CNC axis is a PID-controlled servo. The positioning accuracy is limited by the servo bandwidth, the encoder resolution, and the friction. The Abbe error is a disturbance that the servo cannot reject because it is not measured.
- **[[control-systems/feedback-stability]]** — The in-process gauge with tool compensation is a feedback loop. The loop gain must be less than 1 to avoid over-correction (the tool oscillates around the target), and the sampling interval must be shorter than the tool-wear time constant.
- **[[design-process/reliability-risk]]** — The FMEA is the bridge between manufacturing and design: the severity rating comes from the design (what happens if the part fails), the occurrence rating comes from the process (how often does the cause occur), and the detection rating comes from the inspection plan (how likely are we to catch it).
- **[[design-process/design-for-manufacture]]** — The tolerance stack-up, the datum scheme, and the gauge access are DFM decisions. A drawing that specifies a $\pm 0 . 0 1 \ \mathrm { m m }$ tolerance on a feature that cannot be gauged is a drawing that will be wrong.

::: history Metrology, quality, and automation: from the gauge block to the digital twin {#history-metrology}
**1850s** — Joseph Whitworth standardises the British screw thread and establishes the principle of **interchangeability**: parts made in different factories, at different times, by different workers, fit together without filing. The prerequisite is a system of measurement that is the same in Manchester as in London. **Interchangeability is not a design concept; it is a metrology concept.**

**1899** — **Johannes Hertz** and **Karl Kellenberger** develop the first practical **gauge blocks** (Johansson blocks, 1896 in Sweden; Hertz's optical flats in 1899). The gauge block makes the micron accessible to the shop floor: a set of 81 blocks can be wrung together to make any dimension between 1 and 100 mm in 0.001 mm increments. **The gauge block is the link between the national standard and the machinist's micrometer, and it is the foundation of the traceability chain.**

**1924** — **Walter A. Shewhart** (Bell Telephone Laboratories) invents the **control chart**. His insight is that process variation has two causes — "assignable" (special) and "chance" (common) — and that the distinction can be made statistically, with a $\pm 3 \sigma$ limit. The control chart is the foundation of statistical quality control and, eventually, of Six Sigma.

**1931** — Shewhart publishes *Economic Control of Quality of Manufactured Product*. **The book establishes that quality is a statistical problem, not an inspection problem, and that the cost of prevention is less than the cost of appraisal, which is less than the cost of failure.**

**1942** — **W. Edwards Deming** introduces Shewhart's SPC methods to Japanese industry. Between 1950 and 1980, Japan transforms its manufacturing quality from "junk" to world-class, and the **Deming Prize** (established 1951) becomes the quality movement's highest honour. **The Japanese quality revolution is the proof that SPC works: Toyota's defect rate in the 1970s was 1/100th of the US automotive industry's, with fewer inspectors and less inspection.**

**1952** — **John T. Parsons** and **Frank Stulen** develop the first **numerically controlled (NC) milling machine** at MIT, funded by the US Air Force to machine complex aircraft wing skins. The machine has 3 axes, a punched-tape input, and a positioning accuracy of ±0.025 mm. **The CNC machine is the single most important manufacturing technology of the 20th century: it makes complex geometry cheap, it makes changeover a software update, and it makes the tolerance the designer specifies the tolerance the machine achieves.**

**1961** — **NASA** develops the **FMEA** (Failure Mode and Effects Analysis) for the Apollo programme. The FMEA is the first systematic method for identifying single-point failures in a complex system. **The FMEA's contribution to quality is the insight that the severity of a failure is a design property, the occurrence is a process property, and the detection is an inspection property — and that the product of the three is a better prioritisation tool than any one of them alone.**

**1986** — **Masafi Imaizumi** and **Takashi Osada** (Toyota) publish the **Toyota Production System**, codifying **lean manufacturing**: just-in-time, jidoka (autonomation with a human touch), heijunka (level loading), and kaizen (continuous improvement). **Lean is the recognition that the biggest source of defects is not the machine but the process: the long setup times, the large batch sizes, the high WIP, and the "inspect it out" mentality that hide the defects until they are expensive.**

**1987** — **Motorola** launches **Six Sigma**, a methodology for reducing process variation to 3.4 DPMO. **Six Sigma is SPC with a budget and a career path: the Black Belt is a full-time process improvement engineer, the DMAIC cycle is a structured problem-solving method, and the 3.4 DPMO target is a marketing number that drives the engineering.**

**1991** — The **ISO 9000** family of quality management standards is published. **ISO 9001 is the minimum requirement for any supplier to any OEM, and the certificate is the price of entry to the supply chain. The standard is not a quality system; it is a framework for a quality system. The quality is in the implementation, not in the manual.**

**2000s** — **CMMs** with scanning probes, **laser scanners**, and **X-ray CT** transform inspection from a point-measurement activity to a full-field measurement activity. A 5-minute CT scan produces 10 million points, compared to 50 points from a 30-minute CMM program. **The bottleneck moves from measurement to data analysis: the challenge is no longer "can we measure it?" but "what do we do with 10 million points?"**

**2011** — **Siemens** and **GE** begin deploying the **digital twin**: a real-time simulation of the manufacturing process that runs in parallel with the physical line, ingesting sensor data and predicting quality, throughput, and maintenance needs. **The digital twin is the Industry 4.0 promise: if you can simulate the process, you can optimise it without stopping it, and if you can predict the defect, you can prevent it.**

**2020s** — **In-process metrology** becomes standard: laser tool setters, touch probes, and non-contact gauges measure the part in the machine, between operations, and feed the data back to the CNC controller for automatic compensation. **The closed-loop machining cell — where the part is measured, the tool is offset, and the next cut is adjusted without human intervention — is the realisation of the 1952 vision: a machine that makes itself accurate.**
:::

::: summary Metrology, quality, and automation {#summary-metrology}
- **Measurement is traceable or it is meaningless.** The calibration chain from the SI metre to the shop-floor micrometer must be unbroken, documented, and current. A calibration certificate without an uncertainty statement is not a calibration.
- **Every measurement has an uncertainty, and the uncertainty must be less than 10 % of the tolerance.** The GUM framework (Type A + Type B, RSS, expanded with $k = 2$) quantifies the doubt. If the uncertainty is more than 10 % of the tolerance, the measurement cannot make the accept/reject decision.
- **The Abbe principle governs instrument design.** The measurement axis should be collinear with the dimension being measured. An Abbe offset of $e$ and an angular error of $\theta$ produce a displacement error of $e \times \theta$ . A caliper violates the Abbe principle; a CMM obeys it in Z.
- **GD&T replaces the square tolerance zone with a circular one.** A $\phi 0 . 1$ positional tolerance is tighter than a $\pm 0 . 1$ dimensional tolerance. MMC gives bonus tolerance when the feature is not at maximum material. The datum reference frame is three planes, established by the 3-2-1 rule.
- **Process capability compares the process spread to the tolerance width.** $C _ { p }$ is the potential; $C _ { p k }$ is the actual. $C _ { p k } \geq 1 . 3 3$ is the automotive minimum; $C _ { p k } \geq 1 . 6 7$ is the aerospace minimum. The defect rate is $p = 2 \Phi ( - 3 C _ { p k } )$ for a centred process.
- **Control charts distinguish common cause from special cause.** The X-bar/R chart with $\pm 3 \sigma$ limits has a 0.27 % false-alarm rate. The CUSUM chart detects a 1σ shift in 2–3 samples instead of 40–50. The Western Electric run rules add sensitivity at the cost of false alarms.
- **Acceptance sampling is a statistical gamble.** The OC curve gives the probability of acceptance as a function of the lot quality. A $c = 0$ plan with $n = 1 0 0$ rejects 95 % of lots with more than 500 ppm defectives. 100 % inspection is worse than sampling, because the inspector's error rate (2 %) is higher than the process defect rate.
- **CNC machines have 21 rigid-body errors per axis set.** The volumetric accuracy is 3–5× worse than the single-axis positioning accuracy. Laser interferometer calibration and compensation reduce the volumetric error to 3–5 μm. The Abbe error at the tool tip is the tool length times the angular error.
- **Line balancing sets the takt time and the number of stations.** $T _ { \text{takt } } = T _ { \text{available } } / N _ { \text{demand } }$. The minimum number of stations is $\lceil \sum t _ { i } / T _ { \text{takt } } \rceil$. The line efficiency is $\sum t _ { i } / ( N \times T _ { \text{takt } } )$. The bottleneck is the station with the longest cycle time.
- **The cost of quality follows the 1-10-100 rule.** Prevention costs £1, appraisal costs £10, internal failure costs £100, external failure costs £1 000. The cheapest defect is the one that never happens, and the cheapest quality improvement is centring the process.
:::

## Further reading

- **JCGM 100:2008 (GUM)** — *Joint Committee Guide in Metrology — Guide to the Expression of Uncertainty in Measurement*. The definitive reference for uncertainty budgets. Read Chapter 4 (evaluation of uncertainty) and Annex G (the 10:1 rule).
- **ISO 286-1:2010** — *Geometrical product specifications (GPS) — ISO code system for tolerances on linear sizes*. The IT grade system, the fundamental deviations, and the fit tables.
- **ASME Y14.5-2018** — *Dimensioning and Tolerancing*. The GD&T standard: the 14 geometric controls, the datum reference frame, the material condition modifiers, and the interpretation rules.
- **AIAG SPC Manual, 2nd ed. (2020)** — *Statistical Process Control*. The automotive SPC reference: control charts, capability studies, and the interpretation of $C _ { p k }$ and $P _ { p k }$.
- **AIAG MSA Manual, 4th ed. (2010)** — *Measurement Systems Analysis*. The gauge R&R study, the bias/linearity study, and the attribute agreement analysis.
- **Montgomery, D.C. (2019)** — *Introduction to Statistical Quality Control*, 8th ed. Wiley. The standard textbook: SPC, capability, sampling, DOE, and Six Sigma.
- **Schmitt, R.H. and Corney, J.R. (2010)** — *Geometric Quality Control*. Springer. The metrology of GD&T: how to measure a datum, how to evaluate a profile tolerance, and how to build a functional gauge.
- **Groover, M.P. (2020)** — *Automation, Production Systems, and Computer-Integrated Manufacturing*, 5th ed. Pearson. CNC, FMS, group technology, line balancing, and Industry 4.0.
- **Evans, R.L. and Lindsay, W.M. (2020)** — *The Deming-Shewhart Cycle: A Practical Guide to Continuous Improvement*. ASQ Quality Press. The history and practice of SPC, from Shewhart's control chart to Deming's Japanese lectures to Six Sigma.
