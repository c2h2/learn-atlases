A machine tool is a device for making errors in a controlled way. It holds a part to within a few micrometres, moves a cutting edge along a programmed path to within a few micrometres, and removes material so that the finished dimension falls inside a tolerance band that is typically 25–100 μm wide. Every number on a drawing is a statement about a measurement that has not been made yet, and every measurement you do make carries an uncertainty that is typically 5–20 % of the tolerance you are trying to verify. **The entire edifice of modern manufacturing — interchangeable parts, assembly without fitting, quality control without 100 % inspection, certification without destructive testing — rests on the proposition that you can measure a dimension to better than you can make it, and that the measurement is traceable to a definition of the metre that is the same in Gothenburg as in Guangzhou.** When that proposition fails, the parts do not fit, the bearings run hot, the turbine blades rub, and the aircraft is grounded.

Metrology is the science of that proposition. Statistical process control is the science of keeping the machine inside the tolerance band without measuring every part. CNC and automation are the engineering of the machine that does the making. Quality systems are the paperwork that proves you did it on purpose. This lesson covers all four, because they are one subject: **the control of geometric error in a world where every process has a distribution, every measurement has an uncertainty, and every customer wants a number.**

::: warning Nine ways metrology and quality go wrong
**Confusing precision with accuracy.** A CMM that reads the same wrong number 50 times to 0.1 μm is precise and wrong. A caliper with a calibration traceable to a national standard but a scatter of ±0.05 mm is accurate on average and imprecise. **Accuracy is traceability; precision is repeatability; you need both, and you prove them differently — the first with a calibrated reference, the second with a gauge R&R study.** **Measuring without an uncertainty budget.** A measurement without an uncertainty is a number, not a result. If you report "25.003 mm" without saying "±0.004 mm at 95 % confidence," you have told the customer nothing about whether the part is in tolerance, because you have not told them whether *you* know whether the part is in tolerance. **The rule of thumb is that the measurement uncertainty should be no more than about 10 % of the tolerance; when it is much larger, every part near a limit falls in a zone where the measurement cannot decide, and you need a better instrument, not a better operator.** **Ignoring the gauge R&R.** If the measurement system's own scatter uses up 30 % of the tolerance band, parts near either limit are misclassified routinely: good parts are rejected and bad ones accepted. A gauge R&R study (repeatability + reproducibility) under the AIAG guidelines should show under 10 % (acceptable); 10–30 % may be acceptable depending on the application; above 30 % is unacceptable. **Gauge variation adds to the observed spread, so a poor gauge makes a capable process look *worse* than it is — and, more dangerously, it makes individual accept/reject decisions near the limits unreliable.** **Setting the tolerance from the drawing instead of the process.** A tolerance of $\pm 0 . 0 1 \ \mathrm { m m }$ on a turned diameter is a statement that the process is capable of $C _ { p k } \geq 1 . 3 3$ , which for a CNC lathe means a $6 \sigma$ spread of $< 0 . 0 1 5 \ \mathrm { m m }$ — achievable, but only with a rigid setup, a sharp tool, and a part that does not move when the cut pushes it. **Specify the tolerance the process can hold, or accept scrap, rework and arguments about parts on the limit.** **Using a go/no-go gauge as a measurement.** A go/no-go gauge is an attribute device: it tells you "in" or "out," not "how much." If the dimension is drifting toward the limit, the gauge does not know, and the first thing you learn is that 200 parts are scrap. **For any dimension that drifts (tool wear, thermal growth, fixture wear), use a variable gauge and a control chart.** **Not accounting for thermal expansion.** Steel expands at $1 1 . 7 \times 1 0 ^ { - 6 } \ \mathrm { K ^ { - 1 } }$ . A 100 mm steel part at $2 5 \ \mathrm { ^ \circ C }$ is 5.8 μm longer than it is at the $2 0 \ \mathrm { ^ \circ C }$ reference temperature, and if it is measured warm against an instrument at a different temperature (or one made of a different material), that difference goes straight into the result. **For tolerances of a few tens of micrometres or less, temperature can be a bigger error source than the instrument, so the part must be soaked in the measuring room until it has reached the room temperature — which for a heavy part straight off the machine can take hours — or the measurement must be corrected for expansion.** **Accepting on the supplier's data and rejecting on your own.** The supplier's CMM says 25.002, your CMM says 25.008, the drawing says $2 5 . 0 0 0 \pm 0 . 0 1 0$ , and both measurements are correct within their respective uncertainties. **The resolution is not to argue about who is right but to compare the two CMMs against a calibrated gauge block and find the 6 μm systematic offset — which is usually a probe calibration error, a thermal compensation error, or a difference in the fitting algorithm (least-squares vs minimum-zone).** **Skipping the measurement system analysis in the PPAP.** The customer's PPAP requirements include measurement system analysis for the gauges named in the control plan. If you do not have one, the PPAP is rejected, the part is not approved, and the programme is late. **The MSA is not paperwork; it is the proof that your accept/reject decisions are based on data, not on hope.** **Automating a bad process.** A CNC machine with an in-process gauge and a tool-life compensation loop will produce 10 000 parts that are all consistently wrong if the setup is off by 0.02 mm. **Automation amplifies whatever you feed it. Fix the process first, then automate it.**
:::

## 1. Measurement, traceability, and uncertainty

::: definition Metrology, traceability, and the calibration hierarchy {#def-traceability}
**Metrology** is the science of measurement, and **traceability** is the property of a measurement result whereby the result can be related to a reference (usually the SI system) through an unbroken chain of documented calibrations, each contributing a stated uncertainty. The chain for a shop-floor micrometer looks like this:

$$
\begin{array} { r l }
\text{SI metre (defined by } c \text{ and } \Delta \nu _ { \mathrm { Cs } } \text{)} & \\
\quad \downarrow & \text{national metrology institute (NPL, PTB, NIST): stabilised lasers, } \sim 1 0 ^ { - 1 1 } \text{ relative} \\
\quad \downarrow & \\
\text{Grade K gauge blocks (interferometrically calibrated)} & \sim { \pm } 0 . 0 3 \ \mu \mathrm { m } \text{ at } 2 5 \ \mathrm { mm } \\
\quad \downarrow & \\
\text{Grade 0 or 1 working gauge blocks (calibrated by comparison)} & \sim { \pm } 0 . 1 \ \mu \mathrm { m } \\
\quad \downarrow & \\
\text{Shop micrometer (calibrated against the working blocks)} & { \pm } 1 { - } 2 \ \mu \mathrm { m } \\
\quad \downarrow & \\
\text{The part, measured with the micrometer} & { \pm } 2 { - } 5 \ \mu \mathrm { m } \\
\end{array}
$$

Each link in the chain is a calibration performed by an accredited laboratory (to ISO/IEC 17025), with a certificate that states the measured value, the expanded uncertainty, and the coverage factor. **A calibration certificate without an uncertainty statement is not a calibration; it is a pass/fail test.** The calibration interval is determined by the instrument's drift history, not by a calendar: a CMM that has drifted 0.5 μm per year can be calibrated every two years; a torque wrench that has drifted 2 % per month must be calibrated monthly or replaced.

The **reference conditions** for dimensional metrology are $2 0 . 0 0 0 \ \mathrm { ^ \circ C }$ (the ISO 1 standard reference temperature, adopted internationally in 1931 as a round number close to normal workshop conditions). **Every dimension on every engineering drawing on Earth is defined at $2 0 \ \mathrm { ^ \circ C }$ , and every measurement that is not made at $2 0 \ \mathrm { ^ \circ C }$ must be corrected for thermal expansion — or the correction must be shown to be smaller than the measurement uncertainty.**
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

**The decision rule for conformity assessment (ISO 14253-1):** the part is **accepted** if ${ \bar { L } } + U \leq \mathrm { U S L }$ and ${ \bar { L } } - U \geq \mathrm { L S L }$ ; **rejected** if ${ \bar { L } } - U > \mathrm { U S L }$ or ${ \bar { L } } + U < \mathrm { L S L }$ ; and **indeterminate** otherwise. The indeterminate zone is the width of the measurement uncertainty, and it is the reason a part that "meets print" in one lab can "not meet print" in another. **The rule of thumb is that the expanded uncertainty should be no more than 10 % of the tolerance width (the 10:1 rule), which means a $\pm 0 . 0 1 \ \mathrm { m m }$ tolerance requires a measurement uncertainty of $\leq 0 . 0 0 2 \ \mathrm { m m }$ — achievable with a calibrated micrometer but not with a vernier caliper.**
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
\text{laser interferometer} & { \pm } 0 . 5 \ \mu\text{m/m (in air)} & \text{continuous} & \text{1D: displacement, straightness} & \text{Alignment, air refractive index} \\
\text{optical comparator} & { \pm } 5 \ \mu\text{m} & \text{1 min/part} & \text{2D: profile, small parts} & \text{2D only, manual} \\
\end{array}
$$

The **CMM** (coordinate measuring machine) is the workhorse of dimensional metrology. A bridge CMM with a touch-trigger probe measures a point by deflecting a stylus until a built-in switch trips; the machine reads the $( x , y , z )$ of the probe tip from three linear scales (resolution typically $0 . 1 \ \mu \mathrm { m }$ or finer). The accuracy is specified as $E _ { 0 , M } = A + L / K$ (ISO 10360), where $A$ is the probing error (1–2 μm), $L$ is the measured length, and $K$ is a factor (300–500). For a 500 mm measurement on a $1 . 5 + L / 3 0 0$ machine: $E = 1 . 5 + 5 0 0 / 3 0 0 = 3 . 2 \ \mu \mathrm { m }$ . **The $L / K$ term collects the scale, straightness and squareness errors of the machine's axes, and it is why the permissible error grows with the length being measured.**

The **Abbe principle** states that the measurement axis should be collinear with the axis of the dimension being measured. If they are offset by a distance $e$ (the **Abbe offset**), an angular error $\theta$ of the guideway produces a displacement error:

$$
\varepsilon _ { \text{Abbe } } \; = \; e \, \sin \theta \; \approx \; e \, \theta
$$

For $e = 1 0 0 \ \mathrm { m m }$ and $\theta = 5$ arcsec $= 2 4 . 2 \ \mu \mathrm { r a d }$ : $\varepsilon = 2 . 4 \ \mu \mathrm { m }$ . **A caliper violates the Abbe principle by design (the scale is behind the jaws, offset by 10–20 mm), which is one reason a caliper is not trusted to better than a few hundredths of a millimetre however carefully you read it. A three-axis CMM cannot satisfy the Abbe principle on all three axes at once, which is why its guideway angular errors are mapped and compensated in software.**
:::

::: example Uncertainty budget for a bore diameter {#ex-uncertainty level=3 check="2.2"}
A 25 mm bore is measured on a CMM with a 2 mm stylus. The uncertainty components are listed below. What is the expanded uncertainty $U$ at $k = 2$ , in μm?

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

**The CMM's own volumetric error dominates the budget (85 % of the variance). The thermal and stylus-deflection terms are small but not negligible; the repeatability term is the only one you can reduce by measuring more times. The total uncertainty of 2.2 μm is 4.3 % of a $\pm 0 . 0 2 5 \ \mathrm { m m }$ tolerance (0.050 mm wide) — well within the 10:1 rule. For a $\pm 0 . 0 0 5 \ \mathrm { m m }$ tolerance, this CMM is marginal (22 % of the tolerance), and you need a better machine or a comparison measurement against a calibrated ring gauge.**
:::

::: widget plot
title: The Abbe error: a caliper's worst enemy
f: 100000*x*pi/(180*3600); 50000*x*pi/(180*3600); 10000*x*pi/(180*3600)
x: 0,10
y: 0,10
labels: Abbe offset 100 mm; 50 mm; 10 mm
caption: Displacement error $\varepsilon = e \, \theta$ against guideway angular error $\theta$ (in arcseconds) for three Abbe offsets. **A caliper has an Abbe offset of about 15 mm (the distance from the scale to the measuring point on the jaws), so a 10 arcsec tilt of the slide produces a 0.7 μm error. An instrument with a 100 mm Abbe offset turns the same 10 arcsec into 4.8 μm — nearly 10 % of a typical $\pm 0 . 0 2 5 \ \mathrm { m m }$ tolerance. (In a real caliper the slide's play allows tilts far larger than 10 arcsec when the jaws are squeezed, which is where most of its error comes from.)** **The design rule for any measuring instrument: put the scale as close to the measurement axis as possible. Where that is impossible, the angular errors must be kept small or measured and compensated.**
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

The tables evaluate $D$ as the geometric mean of each size range. For a 50 mm feature (range over 30 up to 50 mm): $D = { \sqrt { 3 0 \times 5 0 } } = 3 8 . 7 \ \mathrm { m m }$ , $i = 0 . 4 5 \times 3 . 3 8 + 0 . 0 3 9 = 1 . 5 6 \ \mu \mathrm { m }$ , and IT7 $= 1 6 \times 1 . 5 6 = 2 5 . 0 \ \mu \mathrm { m }$ — the tabulated value of 25 μm. **The cube-root term dominates at small sizes (it represents the difficulty of holding a small feature), and the linear term dominates at large sizes (it represents the accumulated straightness and thermal errors).**

The **fundamental deviation** (the letter code: a–z for shafts, A–Z for holes) positions the tolerance zone relative to the nominal size. The most common fits are:

- **Clearance fits**: H11/c11 (loose running), H8/f7 (close running), H7/g6 (sliding: 9–50 μm clearance at 50 mm), H7/h6 (locational clearance).
- **Transition fits**: H7/k6 (locational transition: from 23 μm clearance to 18 μm interference at 50 mm), H7/n6 (tighter locational transition).
- **Interference fits**: H7/p6 (locational interference: 1–42 μm interference at 50 mm), H7/s6 (medium drive, assembled by pressing or heating the hub).

**The hole-basis system (H) is the default: the hole tolerance is fixed and the shaft tolerance is varied to achieve the desired fit. This is because holes are harder to vary than shafts (a reamer makes one size; a turning tool makes any size).**
:::

::: definition Geometric dimensioning and tolerancing (GD&T): the datum reference frame {#def-gdt}
A $\pm 0 . 1 \ \mathrm { m m }$ dimensional tolerance on a hole location is a square tolerance zone (in XY) — the hole centre can be anywhere in a $0 . 2 \times 0 . 2 \ \mathrm { m m }$ square. A positional tolerance is a circular tolerance zone — the hole centre must lie inside a circle of the stated diameter. **The square's corners are $0 . 1 { \sqrt { 2 } } = 0 . 1 4 1 \ \mathrm { m m }$ from true position, so a $\phi 0 . 2 8 3$ positional zone contains the whole square and has 57 % more area. A hole 0.14 mm off in a diagonal direction is accepted by the square, while a hole 0.11 mm off along an axis is rejected — even though, for a pin to assemble, only the distance from true position matters. The circular zone matches the function; the square zone does not.**

GD&T (ASME Y14.5 or ISO 1101) defines the geometric controls in five categories (14 in ASME Y14.5-2009; the 2018 edition dropped concentricity and symmetry, leaving 12):

$$
\begin{array} { l l l }
\textbf{Category} & \textbf{Controls} & \textbf{Datum required?} \\ \hline
\text{Form} & \text{flatness, straightness, circularity, cylindricity} & \text{No (self-referencing)} \\
\text{Orientation} & \text{perpendicularity, angularity, parallelism} & \text{Yes (one datum)} \\
\text{Location} & \text{position, concentricity, symmetry} & \text{Usually (one to three datums)} \\
\text{Profile} & \text{profile of a line, profile of a surface} & \text{Optional} \\
\text{Runout} & \text{circular runout, total runout} & \text{Yes (one datum axis)} \\
\end{array}
$$

The **datum reference frame** is three mutually perpendicular planes (A, B, C) established by the three-2-1 rule: three contact points define the primary datum (a plane), two define the secondary (a line), one defines the tertiary (a point). **The datum is not a feature of the part; it is a theoretical construct that the part's features are related to. The datum feature simulator (the CMM's chuck, vise, or fixture) must reproduce the datum constraint, or the measurement is meaningless.**

The **material condition modifiers** — Maximum Material Condition (MMC, $\boxed{M}$), Least Material Condition (LMC, $\boxed{L}$), and Regardless of Feature Size (RFS, no symbol) — allow the geometric tolerance to be relaxed when the feature is not at maximum material. A $\phi 0 . 1 \boxed{ M }$ positional tolerance on a $\phi 1 0 \pm 0 . 2$ hole applies at the MMC size, $\phi 9 . 8$ ; when the hole is made at $\phi 1 0 . 2$ it has departed 0.4 mm from MMC, so it gains a bonus tolerance of 0.4 mm and may be out of position by up to $\phi 0 . 5$ , because a pin that fits the MMC hole still assembles. **MMC is one of the most useful tools in GD&T: it ties the tolerance to the assembly function, and it can multiply the usable positional tolerance on a clearance hole without affecting assemblability.**
:::

::: definition Gauging: attribute vs variable, and gauge R&R {#def-gauging}
A **gauge** is a device that makes a conformity decision (accept/reject) rather than reporting a measurement. The two types are:

- **Attribute gauges**: go/no-go plug gauges, thread gauges, snap gauges, functional gauges. They are fast (2–5 s per part), cheap, and operator-proof, but they provide no information about the process trend. **The go gauge is made at the maximum material limit of the feature (the smallest hole, the largest shaft) and the no-go gauge at the least material limit. The go gauge also carries a small wear allowance, a few per cent of the part tolerance, inside the part tolerance, so that the gauge can wear for a while before it starts accepting parts outside the limit.**
- **Variable gauges**: micrometers, bore gauges, CMMs, dial indicators. They report a number, which can be plotted on a control chart, trended, and used for process adjustment. **A variable gauge costs more and takes longer to use than an attribute gauge, but it gives you the information to prevent the defect instead of sorting it.**

**Gauge repeatability and reproducibility (GR&R)** quantifies the measurement system's contribution to the observed variation. The typical study (AIAG MSA Manual, 4th ed.) is 3 appraisers × 10 parts × 2–3 trials (60–90 measurements), analysed by ANOVA or the average-and-range method. The results are:

$$
\sigma _ { \text{gauge } } ^ { 2 } \; = \; \sigma _ { \text{repeatability} } ^ { 2 } \; + \; \sigma _ { \text{reproducibility} } ^ { 2 } \; = \; \sigma _ { \text{EV} } ^ { 2 } \; + \; \sigma _ { \text{AV} } ^ { 2 }
$$

where EV (equipment variation) is the within-operator variation and AV (appraiser variation) is the between-operator variation. The acceptance criteria are:

- $\sigma _ { \text{gauge } } / \sigma _ { \text{total } } < 0 . 1 0$ (10 %): acceptable.
- $0 . 1 0 < \sigma _ { \text{gauge } } / \sigma _ { \text{total } } < 0 . 3 0$ : conditionally acceptable, improvement recommended.
- $\sigma _ { \text{gauge } } / \sigma _ { \text{total } } > 0 . 3 0$ : unacceptable, the gauge must be improved or replaced.

**Because variances add, $\sigma _ { \text{obs} } ^ { 2 } = \sigma _ { \text{process} } ^ { 2 } + \sigma _ { \text{gauge} } ^ { 2 }$ : with a GR&R of 30 % of the observed variation, the process standard deviation is $\sqrt { 1 - 0 . 3 ^ { 2 } } = 0 . 9 5$ of what you observe, so the capability you calculate is about 5 % pessimistic — a true $C _ { p k }$ of 1.40 appears as 1.33. The bigger cost is at the limits: individual parts within a gauge-spread of a limit are classified almost at random.**
:::

::: example Tolerance stack-up: a bearing housing {#ex-stackup level=3 check="0.56"}
A bearing (width 15.000 ± 0.010 mm) sits against a shoulder in a housing bore and is retained by a circlip in a groove; the bearing pushes the circlip against the far face of the groove. The axial play is (shoulder to near groove face) + (groove width) − (bearing width) − (circlip thickness). The dimensions around the stack are:

| Feature | Nominal | Tolerance |
|---------|---------|-----------|
| Housing shoulder to near groove face | 15.00 | ±0.05 |
| Bearing width | 15.00 | ±0.01 |
| Circlip thickness | 1.20 | ±0.05 |
| Groove width | 1.60 | ±0.05 |

What is the worst-case maximum axial play, in mm?

The nominal play is $1 5 . 0 0 + 1 . 6 0 - 1 5 . 0 0 - 1 . 2 0 = 0 . 4 0 \ \mathrm { m m }$ . The worst-case maximum takes the positive terms at their largest and the negative terms at their smallest:

$$
\delta _ { \max } \; = \; ( 1 5 . 0 5 + 1 . 6 5 ) - ( 1 4 . 9 9 + 1 . 1 5 ) \; = \; 1 6 . 7 0 - 1 6 . 1 4 \; = \; { \bf 0 . 5 6 \ \mathrm { m m } }
$$

$$
\delta _ { \min } \; = \; ( 1 4 . 9 5 + 1 . 5 5 ) - ( 1 5 . 0 1 + 1 . 2 5 ) \; = \; 1 6 . 5 0 - 1 6 . 2 6 \; = \; 0 . 2 4 \ \mathrm { m m }
$$

The worst-case stack is $0 . 4 0 \pm 0 . 1 6 \ \mathrm { m m }$ . If each tolerance is a $\pm 3 \sigma$ band of an independent, centred process, the **root-sum-square** (statistical) stack-up is:

$$
\delta _ { \text{RSS } } \; = \; { \sqrt { 0 . 0 5 ^ { 2 } + 0 . 0 1 ^ { 2 } + 0 . 0 5 ^ { 2 } + 0 . 0 5 ^ { 2 } } } \; = \; { \sqrt { 0 . 0 0 7 6 } } \; = \; \pm 0 . 0 8 7 \ \mathrm { m m } \quad ( 3 \sigma )
$$

so almost all assemblies fall within $0 . 3 1 { - } 0 . 4 9 \ \mathrm { m m}$ , against $0 . 2 4 { - } 0 . 5 6 \ \mathrm { m m}$ worst case. **If the design needs less end play than this, the fix is to tighten the three ±0.05 mm contributors, to select circlip thickness at assembly, or to add a wave spring that takes up the play.**
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
< 1 . 0 & > 2 7 0 0 & \text{Not capable; sorting or 100\% inspection needed} \\
1 . 0 & 2 7 0 0 & \text{Marginally capable} \\
1 . 3 3 & 6 3 & \text{Capable; a common minimum for ongoing production} \\
1 . 6 7 & 0 . 6 & \text{Highly capable; a common requirement for new processes} \\
2 . 0 & 0 . 0 0 2 & \text{The short-term ``six sigma'' spread} \\
\end{array}
$$

**The defect rate is calculated from the normal distribution: $p = \Phi ( ( \mathrm { L S L } - \mu ) / \sigma ) + 1 - \Phi ( ( \mathrm { U S L } - \mu ) / \sigma )$ . For a centred process, $p = 2 \, \Phi ( - 3 \, C _ { p } )$ . The ppm values in the table (for a centred process) assume a normal distribution far out into the tails, which real processes rarely follow: below about 1 ppm the figures are extrapolations of the model, not predictions.**
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
D _ { 3 } & 0 & 0 & 0 & 0 & 0 . 2 2 3 \\
D _ { 4 } & 3 . 2 6 7 & 2 . 5 7 5 & 2 . 2 8 2 & 2 . 1 1 4 & 1 . 7 7 7 \\
d _ { 2 } & 1 . 1 2 8 & 1 . 6 9 3 & 2 . 0 5 9 & 2 . 3 2 6 & 3 . 0 7 8 \\
\end{array}
$$

**The control limits are $\pm 3 \sigma$ of the sample mean ($\sigma / { \sqrt { n } }$ ), which gives a false-alarm rate of 0.27 % (1 in 370 subgroups). The Western Electric run rules (2 of 3 successive points beyond $2 \sigma$ on the same side, 4 of 5 beyond $1 \sigma$ , 8 in a row on one side of the centre line) increase the sensitivity to small shifts at the cost of a higher false-alarm rate.**

For attribute data (pass/fail, defect counts):

- **p-chart**: fraction defective in a sample of size $n$ . Centre line $\bar { p }$ , limits $\bar { p } \pm 3 { \sqrt { \bar { p } ( 1 - \bar { p } ) / n } }$ .
- **c-chart**: count of defects in a constant-size unit. Centre line $\bar { c }$ , limits $\bar { c } \pm 3 { \sqrt { \bar { c } } }$ .
- **u-chart**: defects per unit for a variable-size unit.

The **CUSUM** (cumulative sum) chart is more sensitive to small shifts (0.5–1.5σ) than the Shewhart chart:

$$
C _ { i } ^ { + } \; = \; \max \! \left( 0 , \; C _ { i - 1 } ^ { + } + ( x _ { i } - \mu _ { 0 } ) - K \right) \qquad C _ { i } ^ { - } \; = \; \max \! \left( 0 , \; C _ { i - 1 } ^ { - } - ( x _ { i } - \mu _ { 0 } ) - K \right)
$$

where $K = 0 . 5 \sigma$ is the **reference value** (half the shift you want to detect, here $1 \sigma$ ) and the signal is $C _ { i } ^ { \pm } > H = 4 { - } 5 \sigma$ . **For a $1 \sigma$ shift in the mean of individual readings, a CUSUM with $K = 0 . 5 \sigma$ and $H = 5 \sigma$ signals after about 10 samples on average, while a Shewhart chart with $3 \sigma$ limits takes about 44.**
:::

::: definition Sampling inspection and OC curves {#def-sampling}
**Acceptance sampling** decides whether to accept or reject a lot based on a sample, rather than inspecting every unit. The operating characteristic (OC) curve gives the **probability of acceptance** $P _ { a }$ as a function of the lot fraction defective $p$ :

$$
P _ { a } ( p ) \; = \; \sum _ { d = 0 } ^ { c } { \binom { n } { d } } \, p ^ { d } \, ( 1 - p ) ^ { n - d } \quad \text{(binomial)} \qquad \approx \; \sum _ { d = 0 } ^ { c } { \frac { ( n p ) ^ { d } \, e ^ { - n p } } { d ! } } \quad \text{(Poisson, } n \text{ large, } p \text{ small)}
$$

where $n$ is the sample size and $c$ is the acceptance number (the maximum number of defectives allowed). Two key points on the OC curve:

- **AQL** (Acceptable Quality Level): the $p$ at which $P _ { a } = 0 . 9 5$ (the producer's risk $\alpha = 0 . 0 5$ — the chance of rejecting a good lot).
- **LTPD** (Lot Tolerance Percent Defective): the $p$ at which $P _ { a } = 0 . 1 0$ (the consumer's risk $\beta = 0 . 1 0$ — the chance of accepting a bad lot).

**The ratio $R = \mathrm { LTPD } / \mathrm { AQL }$ measures how sharply the plan discriminates. For AQL = 1 % and LTPD = 5 % ($R = 5$), the Poisson OC curve requires $c = 3$ and $n \approx 1 3 5$ — a big sample for a modest discrimination. The only ways to reduce $n$ are to accept a higher $\alpha$ or $\beta$ , to accept a wider gap between AQL and LTPD, or to rely on a capable, controlled process instead of on inspection.**

**Sampling does not sort good parts from bad; it decides about lots.** Sampling with $n = 5 0$ , $c = 0$ at a 1 % defect rate accepts $0 . 9 9 ^ { 5 0 } = 6 0 . 5 \ \%$ of lots. If the rejected lots are 100 % screened (rectifying inspection), the average outgoing quality is about $p \, P _ { a } = 0 . 6 \ \%$ defective. 100 % inspection is not perfect either — manual visual inspection misses a significant fraction of defects — **which is why the real alternative to both is a capable process watched by a control chart.**
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

**The steep (faster than exponential) sensitivity of $p$ to $C _ { p k }$ is the reason a 0.3-unit improvement in $C _ { p k }$ (from 1.0 to 1.33) reduces the defect rate by a factor of 43, and the reason the automotive industry insists on $C _ { p k } \geq 1 . 3 3$ for critical dimensions: at $C _ { p k } = 1 . 0$ , a production line making 100 000 parts per day ships 270 defective parts per day, and at $C _ { p k } = 1 . 3 3$ it ships 6.** $\blacksquare$
:::

::: example Cpk of a turned diameter {#ex-cpk level=3 check="1.36"}
A CNC lathe produces a $\phi 2 5 . 0 0 0 \pm 0 . 0 5 0 \ \mathrm { m m }$ diameter. A sample of 125 parts (25 subgroups of 5) gives ${ \bar { \bar { x } } } = 2 5 . 0 1 5 \ \mathrm { m m }$ and ${ \bar { R } } = 0 . 0 2 0 \ \mathrm { m m }$ . Calculate $C _ { p }$ and $C _ { p k }$ . (Give $C _ { p k }$ .)

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

**The process is capable ($C _ { p k } > 1 . 3 3$) but off-centre: the mean is 15 μm above the nominal, and the $C _ { p }$ of 1.94 shows the spread is fine. The fix is a 15 μm tool offset, which brings $C _ { p k }$ up to 1.94 and reduces the expected defect rate from about 24 ppm (almost all above the upper limit) to about 0.006 ppm. The $C _ { p } - C _ { p k }$ gap of 0.58 is the cost of not centring the process.**
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

The **21 geometric errors** of a three-axis machine (6 per linear axis — positioning, two straightnesses, pitch, yaw and roll — plus 3 squareness errors between the axis pairs) are the fundamental limit on volumetric accuracy. A typical 5-axis machining centre has a volumetric accuracy of 10–25 μm over its full travel, which is 3–5× worse than the single-axis positioning accuracy, because the squareness and angular errors accumulate. **Laser-interferometer and laser-tracker measurements (the ISO 230 series) map these errors, and the CNC controller applies them as a compensation table. A well-compensated machine achieves 3–5 μm volumetric accuracy; an uncompensated one achieves 15–30 μm.**

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

- **Resolution**: the smallest increment the control system can command and measure. For a modern CNC with linear-scale feedback, 0.1 μm or finer. For a machine without linear scales (a rotary encoder on the motor or ball screw), the resolution is set by the encoder counts per revolution and the screw lead.
- **Repeatability**: the scatter of the position achieved when the same target is commanded repeatedly from the same direction. A good machine: about $\pm 1 { - } 2 \ \mu \mathrm { m }$ . A worn machine: $\pm 5 { - } 1 0 \ \mu \mathrm { m }$ .
- **Positioning accuracy (bidirectional)**: the maximum deviation from the commanded position when approached from both directions. The difference between unidirectional and bidirectional accuracy is the **backlash** (the play in the ball screw and the bearing), typically 2–10 μm.

The **Abbe principle** applies to machine tools as well as to measuring instruments. In a machining centre, the linear scale is on the guideway, but the cutting edge is at the tip of the tool, which is 50–300 mm from the scale (the **Abbe offset**). A 1 arcsec pitch error of the X-slide produces a Z-direction error at the tool tip of:

$$
\varepsilon \; = \; L _ { \text{tool} } \times \theta \; = \; 2 0 0 \times 4 . 8 5 \times 1 0 ^ { - 6 } \; = \; 1 . 0 \ \mu \mathrm { m } \quad (\text{per arcsec, per 200 mm tool length})
$$

**A 5 arcsec pitch error with a 200 mm tool produces a 5 μm error — 10 % of a typical $\pm 0 . 0 2 5 \ \mathrm { m m }$ tolerance. This is why high-precision machining centres have the linear scale as close to the cutting zone as possible, why the guideways are built and adjusted for angular errors of a few arcseconds, and why the thermal growth of the spindle (which changes the tool length by 10–30 μm over a 4-hour shift) is compensated by a tool-length probe.**
:::

::: definition CAM: tool paths, simulation, and adaptive machining {#def-cam}
**CAM** (computer-aided manufacturing) generates the tool-path coordinates from the CAD model. The key decisions are:

- **Cutting strategy**: climb vs conventional milling, zig-zag vs zig vs contour-parallel, trochoidal (adaptive clearing), helical interpolation. The strategy determines the tool load, the surface finish, and the cycle time. **Climb (down) milling usually leaves a better surface and gives a longer tool life than conventional (up) milling on a rigid machine without backlash, because each tooth enters at the maximum chip thickness and exits at zero, instead of starting at zero thickness and rubbing before it cuts.**
- **Step-over and step-down**: the scallop height $h _ { s } \approx { \delta ^ { 2 } } / ( 8 R )$ (for a ball-nose cutter of radius $R$ and step-over $\delta$ on a flat surface) determines the surface finish. For $R = 6 \ \mathrm { m m }$ and $h _ { s } = 5 \ \mu \mathrm { m }$ : $\delta = { \sqrt { 8 \times 6 \times 0 . 0 0 5 } } = 0 . 4 9 \ \mathrm { m m }$ . **The step-over is the CAM parameter that controls the surface finish. The finishing time is proportional to the number of passes, $1 / \delta$ , and $\delta \propto \sqrt { h _ { s } }$ , so halving the scallop height multiplies the finishing time by $\sqrt { 2 } \approx 1 . 4$ .**
- **Simulation**: the CAM system simulates the tool path against the stock model to detect gouges, collisions, and uncut material. **A simulation that catches one crash saves a spindle repair, a fixture and a part, at the cost of minutes of computer time.**
- **Adaptive machining**: an in-process probe measures the machined surface and adjusts the tool path to compensate for fixture deflection, thermal growth, and tool wear. **A touch probe in the spindle also replaces manual setting-up: it finds the part and the datums in seconds instead of by indicating them by hand.**
:::

::: example Volumetric accuracy and the 21 errors {#ex-volumetric level=3 check="9.5"}
A 5-axis machining centre has the following errors (all in μm):

- Linear positioning: X: ±3, Y: ±3, Z: ±4
- Straightness: XY: ±2, XZ: ±2, YZ: ±3
- Squareness: XY: ±3, XZ: ±3, YZ: ±4
- Angular (pitch/yaw/roll): 3 arcsec per axis

Estimate the volumetric accuracy at the centre of the work envelope (X = Y = Z = 200 mm) with a 150 mm tool, in μm.

The volumetric error is the RSS of all contributions:

$$
\varepsilon _ { \text{vol } } \; = \; { \sqrt { \varepsilon _ { \text{pos} } ^ { 2 } + \varepsilon _ { \text{straight} } ^ { 2 } + \varepsilon _ { \text{sq} } ^ { 2 } + \varepsilon _ { \text{Abbe} } ^ { 2 } } }
$$

$$
\varepsilon _ { \text{pos} } \; = \; { \sqrt { 3 ^ { 2 } + 3 ^ { 2 } + 4 ^ { 2 } } } \; = \; { \sqrt { 3 4 } } \; = \; 5 . 8 \ \mu \mathrm { m }
$$

$$
\varepsilon _ { \text{straight} } \; = \; { \sqrt { 2 ^ { 2 } + 2 ^ { 2 } + 3 ^ { 2 } } } \; = \; { \sqrt { 1 7 } } \; = \; 4 . 1 \ \mu \mathrm { m }
$$

$$
\varepsilon _ { \text{sq} } \; = \; { \sqrt { 3 ^ { 2 } + 3 ^ { 2 } + 4 ^ { 2 } } } \; = \; 5 . 8 \ \mu \mathrm { m } \quad (\text{at 200 mm travel})
$$

$$
\varepsilon _ { \text{Abbe} } \; = \; 1 5 0 \times 3 \times 4 . 8 5 \times 1 0 ^ { - 6 } \; = \; 2 . 2 \ \mu \mathrm { m } \quad (\text{3 arcsec, 150 mm tool})
$$

$$
\varepsilon _ { \text{vol } } \; = \; { \sqrt { 3 4 + 1 7 + 3 4 + 4 . 8 } } \; = \; { \sqrt { 8 9 . 8 } } \; = \; { \bf 9 . 5 \ \mu m}
$$

**The volumetric accuracy is about 9.5 μm — two to three times the single-axis positioning accuracy. The squareness and Abbe terms contribute 43 % of the variance; squareness, like the other systematic errors, can be measured and compensated. That is the difference between a $\pm 0 . 0 1 \ \mathrm { m m }$ tolerance that is achievable and one that is not.**
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

A **flexible manufacturing system** (FMS) is a group of CNC machines linked by an automated material-handling system (conveyor, AGV, or rail-guided vehicle) and controlled by a central computer. The FMS can produce any part in its family without manual intervention. **The FMS was the flagship automation concept of the 1980s, and many installations disappointed: the capital cost was hard to justify, and the scheduling and software proved more complex than expected. The modern equivalent is the smaller "lights-out cell": a few CNC machines with a pallet pool or robot, running unattended through nights and weekends.**

**Group technology** (GT) classifies parts into families by geometric similarity (diameter, length, number of features, tolerance class) and routes each family through a dedicated **manufacturing cell** — a small group of dissimilar machines arranged in a U-shape, staffed by 1–3 operators. A classification code such as Opitz's (a five-digit form code plus four supplementary digits) describes each part, and parts with similar codes are produced in the same cell. **The benefit of GT is not the machines (they are the same CNCs as in the job shop) but the flow: the part goes through the cell in hours or days instead of through the shop in weeks, work in progress falls, and setups shrink because the cell's machines are dedicated to one family.**
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

and the **idle time** (the time the operators spend waiting) is $I = N \times T _ { \text{takt } } - \sum t _ { i }$ . **The line-balancing problem is to assign the $M$ tasks to $N$ stations, respecting the precedence constraints (task B cannot start before task A is finished), so that the maximum station time is minimised. The problem is NP-hard, but simple heuristics (such as assigning the longest available task first, subject to precedence) usually come close to the optimum for practical line sizes.**
:::

::: definition Lean manufacturing, Six Sigma, and Industry 4.0 {#def-lean-sixsigma}
**Lean manufacturing** (Toyota Production System) is a philosophy of eliminating waste (muda): overproduction, waiting, transport, over-processing, inventory, motion, defects. The tools are:

- **5S**: sort, set in order, shine, standardise, sustain. A workplace where a missing tool is visible in 10 seconds.
- **Kanban**: a pull system where the downstream station signals the upstream station to produce more. The WIP is capped at the number of kanban cards.
- **SMED** (single-minute exchange of die): reduce setup time below 10 minutes by converting internal setup (done with the machine stopped) to external setup (done while the machine runs). **Cutting a 4-hour press changeover to 12 minutes frees almost four hours of press time per changeover — time that can be spent making parts, or spent on more frequent changeovers so that batches, and inventory, shrink.**
- **Poka-Yoke**: error-proofing. A fixture that can only hold the part one way, a sensor that detects a missing O-ring, a torque wrench that clicks at the right value. **A poka-yoke prevents the defect instead of detecting it.**

**Six Sigma** is a data-driven methodology for reducing process variation to 3.4 defects per million opportunities (DPMO): a short-term spread of $\pm 6 \sigma$ inside the tolerance ($C _ { p } = 2$ ), with a conventional allowance for the mean to drift by $1 . 5 \sigma$ in the long term, which leaves $4 . 5 \sigma$ to the nearer limit (3.4 ppm on one side). The DMAIC cycle: Define, Measure, Analyze, Improve, Control. **Six Sigma is SPC with a budget: the "Improve" step is a design of experiments (DOE) that identifies the few process variables that account for most of the variation, and the "Control" step is a control chart that detects when those variables drift.**

**Industry 4.0** is the integration of cyber-physical systems into manufacturing: IoT sensors on every machine, a digital twin that simulates the line in real time, predictive maintenance based on vibration and current signatures, and a manufacturing execution system (MES) that tracks every part through every operation. **The practical benefit of Industry 4.0 is not the technology (most of the sensors and software are not new) but the data: a machine that reports its own spindle vibration can show a bearing deteriorating early enough to schedule the replacement during planned downtime instead of suffering an unplanned stop.**
:::

::: example Line balancing: an 8-task assembly {#ex-line-balance level=3 check="93.3"}
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

The demand is 1 920 parts per 8-hour shift (28 800 s). Balance the line and find its efficiency, in %.

$$
T _ { \text{takt } } \; = \; { \frac { 2 8 \ 8 0 0 } { 1 \ 9 2 0 } } \; = \; 1 5 \ \mathrm { s}
$$

$$
N _ { \min } \; = \; \left\lceil { \frac { 5 + 3 + 8 + 4 + 6 + 7 + 5 + 4 } { 1 5 } } \right\rceil \; = \; \left\lceil { \frac { 4 2 } { 1 5 } } \right\rceil \; = \; 3
$$

Three stations of at most 15 s each leave only 3 s of slack in total, so the precedence constraints must be checked carefully. F + G + H = 16 s will not fit in the last station, so G (which needs only E) moves forward. A feasible assignment is:

- Station 1: A, C (13 s)
- Station 2: B, E, G (14 s) — E needs B and C, G needs E
- Station 3: D, F, H (15 s) — D needs B, F needs D and E, H needs F and G

$$
\eta \; = \; { \frac { 4 2 } { 3 \times 1 5 } } \; = \; { \frac { 4 2 } { 4 5 } } \; = \; { \bf 9 3 . 3 \ \% }
$$

**The line meets the takt with the theoretical minimum of three stations, and the idle time is $4 5 - 4 2 = 3 \ \mathrm { s}$ per cycle. Station 3 runs exactly at takt, so any disturbance there stops the line; in practice a line this tightly balanced needs a small buffer before station 3 or a little more capacity.**
:::

## 6. Quality systems and inspection

::: definition Quality management systems: ISO 9001, AS9100, IATF 16949 {#def-qms}
A **quality management system** (QMS) is a documented set of processes, procedures, and responsibilities for achieving quality objectives. The three standards that dominate mechanical engineering are:

- **ISO 9001:2015**: the generic QMS. Process approach, risk-based thinking, leadership commitment, continual improvement. Certification is a common entry requirement for suppliers to large manufacturers.
- **AS9100D**: the aerospace QMS. Adds configuration management, first article inspection (AS9102), counterfeit part prevention, human factors, and product safety. **An AS9100 audit samples processes on the shop floor, calibration records, non-conformance reports and corrective actions. The auditor's question is always the same: "Show me the evidence."**
- **IATF 16949:2016**: the automotive QMS. Requires the AIAG "core tools": APQP, PPAP, FMEA, MSA and SPC. The automotive standard is more prescriptive than AS9100: it specifies the methods (control charts, capability indices, gauge R&R) rather than just the outcomes.

**The cost of quality** is usually explained with the "1-10-100" rule of thumb: a defect that costs 1 unit to prevent costs about 10 to find and fix inside the factory and about 100 once it reaches the customer. The categories are:

$$
\begin{array} { l l }
\textbf{Category} & \textbf{Examples} \\ \hline
\text{Prevention} & \text{training, FMEA, SPC, poka-yoke} \\
\text{Appraisal} & \text{inspection, testing, audits, calibration} \\
\text{Internal failure} & \text{scrap, rework, re-inspection, downtime} \\
\text{External failure} & \text{warranty, recall, liability, lost customers} \\
\end{array}
$$

**The numbers are illustrative, not measured constants, but the direction is reliable: money moved from failure and appraisal into prevention usually comes back several times over, because the cheapest defect is the one that never happens.**
:::

::: definition FMEA, PPAP, and APQP {#def-fmea}
**FMEA** (Failure Mode and Effects Analysis) is a structured method for identifying potential failures, their causes, and their effects, and for prioritising corrective actions. The **risk priority number** (RPN) is:

$$
\text{RPN } \; = \; S \times O \times D
$$

where $S$ (severity, 1–10) is the consequence of the failure, $O$ (occurrence, 1–10) is the frequency of the cause, and $D$ (detection, 1–10) is the difficulty of detecting the failure before it reaches the customer. **The detection rating is the one that changes most readily with process controls: a $D$ of 9–10 means the current controls will almost certainly not catch the failure before it leaves, and a $D$ of 1–2 means it is caught or prevented automatically (error-proofing). The FMEA's value is not the RPN number (which is ordinal, arbitrary and gameable — the 2019 AIAG–VDA FMEA handbook replaced it with an "action priority" table) but the conversation it forces: "What happens if this weld is cold? How would we know? What if we cannot know?"**

**APQP** (Advanced Product Quality Planning) is the automotive framework for bringing a new part from concept to production in five phases: (1) Plan and define, (2) Product design and development, (3) Process design and development, (4) Product and process validation, (5) Feedback and corrective action. **PPAP** (Production Part Approval Process) is the deliverable at the end of phase 4: a package of 18 elements (design records, FMEA, control plan, MSA, capability studies, PPAP sample parts, material certifications, appearance approval) that proves the supplier can make the part to print, consistently, at the quoted rate. **Level 3 (the default submission level) sends the customer the warrant, samples and complete supporting data. The customer either approves it, grants interim approval, or rejects it; a rejected PPAP means the part is not approved for production, and the programme is late.**
:::

::: example FMEA for a machined shaft {#ex-fmea level=3 check="160"}
A machined shaft has a $\phi 2 5 \pm 0 . 0 1 3$ bearing journal. Calculate the RPN for the FMEA entry below.

| Item | Failure mode | Effect | S | Cause | O | Current control | D | RPN |
|------|-------------|--------|---|-------|---|----------------|---|-----|
| Journal | Oversize | Bearing will not assemble | 8 | Tool wear | 4 | CMM at 50 pcs | 5 | 160 |

The RPN is $8 \times 4 \times 5 = 1 6 0$ . **The action is to reduce $D$ from 5 to 2 by adding an in-process gauge with automatic tool compensation (the gauge measures every part and offsets the tool when the trend approaches the limit). The new RPN is $8 \times 4 \times 2 = 6 4$ . The action does not change $S$ (the effect is still severe) or $O$ (the cause is still tool wear), but it changes $D$ from "we find it when we measure" to "we prevent it from happening."**
:::

## Exercises

::: exercise Measurement uncertainty: combined and expanded {#ex-unc-comb level=3 check="2.8"}
A 50 mm gauge block is measured on a CMM. The uncertainty components are: CMM error $u _ { 1 } = 1 . 2 \ \mu \mathrm { m }$, thermal $u _ { 2 } = 0 . 5 \ \mu \mathrm { m }$, calibration $u _ { 3 } = 0 . 3 \ \mu \mathrm { m }$, repeatability $u _ { 4 } = 0 . 4 \ \mu \mathrm { m }$. What is the expanded uncertainty $U$ at $k = 2$ , in μm?

::: solution
$$
u _ { c } \; = \; { \sqrt { 1 . 2 ^ { 2 } + 0 . 5 ^ { 2 } + 0 . 3 ^ { 2 } + 0 . 4 ^ { 2 } } } \; = \; { \sqrt { 1 . 4 4 + 0 . 2 5 + 0 . 0 9 + 0 . 1 6 } } \; = \; { \sqrt { 1 . 9 4 } } \; = \; 1 . 3 9 \ \mu \mathrm { m }
$$

$$
U \; = \; 2 \times 1 . 3 9 \; = \; { \bf 2 . 8 \ \mu m}
$$

**The CMM error dominates (74 % of the variance). The expanded uncertainty of 2.8 μm is 5.6 % of a $\pm 0 . 0 2 5 \ \mathrm { m m }$ tolerance — within the 10:1 rule but not comfortable. For a $\pm 0 . 0 1 0 \ \mathrm { m m }$ tolerance, this CMM is not adequate (14 % of the 0.020 mm tolerance width).**
:::
:::

::: exercise Process capability: Cpk and defect rate {#ex-cpk2 level=3 check="0.67"}
A hole is specified at $\phi 1 2 . 0 0 0 \, _ { - 0 . 0 0 0 } ^ { + 0 . 0 2 5 } \ \mathrm { m m }$ . The process mean is $\mu = 1 2 . 0 1 0 \ \mathrm { m m }$ and $\sigma = 0 . 0 0 5 \ \mathrm { m m }$ . Calculate $C _ { p k }$ and the expected defect rate. (Give $C _ { p k }$ .)

::: solution
$$
C _ { p k } \; = \; \min \! \left( { \frac { 1 2 . 0 2 5 - 1 2 . 0 1 0 } { 3 \times 0 . 0 0 5 } } , \; { \frac { 1 2 . 0 1 0 - 1 2 . 0 0 0 } { 3 \times 0 . 0 0 5 } } \right) \; = \; \min \! \left( { \frac { 0 . 0 1 5 } { 0 . 0 1 5 } } , \; { \frac { 0 . 0 1 0 } { 0 . 0 1 5 } } \right) \; = \; \min ( 1 . 0 , \; 0 . 6 6 7 )
$$

$$
C _ { p k } \; = \; { \bf 0 . 6 7 }
$$

The defect rate: $p = \Phi ( ( 1 2 . 0 0 0 - 1 2 . 0 1 0 ) / 0 . 0 0 5 ) + 1 - \Phi ( ( 1 2 . 0 2 5 - 1 2 . 0 1 0 ) / 0 . 0 0 5 ) = \Phi ( - 2 ) + 1 - \Phi ( 3 ) = 0 . 0 2 2 8 + 0 . 0 0 1 3 5 = 0 . 0 2 4 1 = 2 4 \ 1 0 0 \ \mathrm { ppm }$ .

**The process is not capable ($C _ { p k } < 1 . 0$) and the defect rate is 2.4 %. The problem is the off-centre: the mean is 10 μm above the nominal, and the lower limit is only 2σ away. Centring the process at 12.0125 (the midpoint) would give $C _ { p k } = 0 . 8 3$ — still not capable, but the defect rate halves to about 12 400 ppm. The real fix is to reduce $\sigma$ to 0.003 mm (a better reamer, a more rigid setup) and centre the process, giving $C _ { p } = C _ { p k } = 1 . 3 9$ .**
:::
:::

::: exercise Control chart limits {#ex-chart-limits level=3 check="10.034"}
An X-bar/R chart with $n = 5$ has ${ \bar { \bar { x } } } = 1 0 . 0 2 0 \ \mathrm { m m }$ and ${ \bar { R } } = 0 . 0 2 5 \ \mathrm { m m }$ . Calculate the X-bar chart control limits. (Give the UCL in mm to three decimal places.)

::: solution
For $n = 5$ : $A _ { 2 } = 0 . 5 7 7$ .

$$
\text{UCL } \; = \; 1 0 . 0 2 0 + 0 . 5 7 7 \times 0 . 0 2 5 \; = \; 1 0 . 0 2 0 + 0 . 0 1 4 4 \; = \; { \bf 1 0 . 0 3 4 \ \mathrm { m m } }
$$

$$
\text{LCL } \; = \; 1 0 . 0 2 0 - 0 . 0 1 4 4 \; = \; 1 0 . 0 0 6 \ \mathrm { m m }
$$

The R chart limits are $D _ { 3 } { \bar { R } } = 0$ and $D _ { 4 } { \bar { R } } = 2 . 1 1 4 \times 0 . 0 2 5 = 0 . 0 5 3 \ \mathrm { m m }$ .

**Never compare these limits with the specification: the X-bar limits ($\pm 1 4 . 4 \ \mu \mathrm { m }$ ) describe subgroup *means*, which scatter $\sqrt { 5 }$ times less than individual parts. The individual parts have $\hat { \sigma } = { \bar { R } } / d _ { 2 } = 0 . 0 2 5 / 2 . 3 2 6 = 0 . 0 1 0 7 \ \mathrm { m m }$ , a spread of $\pm 3 2 \ \mu \mathrm { m }$ . Against a specification of $1 0 . 0 0 0 \pm 0 . 0 5 0 \ \mathrm { m m }$ that gives $C _ { p } = 1 . 5 5$ but $C _ { p k } = 0 . 0 3 0 / 0 . 0 3 2 = 0 . 9 3$ , because the mean sits 20 μm high: a process can be perfectly in control and still not capable.**
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

**There is an 81 % chance of accepting a lot that is 3 % defective. The AQL (at $P _ { a } = 0 . 9 5$) is about 1.7 %, and the LTPD (at $P _ { a } = 0 . 1 0$) is about 10 %. The sampling plan is loose: it accepts most lots with up to 3 % defectives and rejects most lots only above about 10 %. For a critical dimension, this plan is inadequate; for a cosmetic dimension, it is fine.**
:::
:::

::: exercise Abbe error in a depth micrometer {#ex-abbe-depth level=2 check="1.2"}
A depth micrometer with a 50 mm extension has an Abbe offset of 50 mm. The spindle has a pitch error of 5 arcsec. What is the displacement error, in μm?

::: solution
$$
\varepsilon \; = \; e \times \theta \; = \; 5 0 \times 5 \times { \frac { \pi } { 1 8 0 \times 3 6 0 0 } } \; = \; 5 0 \times 2 4 . 2 \times 1 0 ^ { - 6 } \; = \; { \bf 1 . 2 \ \mu m}
$$

**1.2 μm is small in absolute terms but 2.4 % of a $\pm 0 . 0 2 5 \ \mathrm { m m }$ tolerance width and 12 % of a $\pm 0 . 0 0 5 \ \mathrm { m m }$ one — already outside the 10:1 rule from this one source. The Abbe error is one reason hand instruments are not used for the tightest tolerances.**
:::
:::

::: exercise FMEA risk priority number {#ex-fmea-rpn level=2 check="160"}
A weld joint is rated severity 8 (structural failure), occurrence 4 and detection 5 (visual inspection only). What is the RPN, and which actions would reduce it?

::: solution
$$
\text{RPN } \; = \; 8 \times 4 \times 5 \; = \; { \bf 1 6 0 }
$$

**The most effective single action here is to reduce $D$ from 5 to 2 by adding 100 % dye-penetrant inspection or automated ultrasonic inspection: RPN drops to $8 \times 4 \times 2 = 6 4$ . Reducing $O$ from 4 to 2 (by improving the weld procedure) gives $8 \times 2 \times 5 = 8 0$ . Reducing $S$ from 8 to 4 (by adding a redundant load path) gives $4 \times 4 \times 5 = 8 0$ . Note, though, that the RPN treats the three ratings as interchangeable, which they are not: for a severity-8 failure, reducing the occurrence (prevention) is generally preferred to adding inspection, and the AIAG–VDA action-priority method weights severity first for exactly this reason.**
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

**A 1 % defective lot has a 37 % chance of being accepted and a 63 % chance of being rejected. The AQL (at $P _ { a } = 0 . 9 5$) is $p = 1 - 0 . 9 5 ^ { 1 / 1 0 0 } = 0 . 0 0 0 5 = 0 . 0 5 \ \%$ (500 ppm), and the LTPD (at $P _ { a } = 0 . 1 0$) is $1 - 0 . 1 0 ^ { 1 / 1 0 0 } = 2 . 3 \ \%$ . So the plan passes 95 % of lots at 500 ppm, but still passes one lot in ten that is 2.3 % defective: a zero-acceptance plan is strict with the producer at low defect rates without giving the consumer much protection.** $\blacksquare$
:::
:::

::: exercise Derivation: Cpk for an off-centre process {#ex-derive-cpk level=4 check="1.0"}
A process has $C _ { p } = 1 . 5$ and the mean is shifted by $1 . 5 \sigma$ from the centre. Calculate $C _ { p k }$ and the defect rate. (Give $C _ { p k }$ .)

::: solution
With $C _ { p } = 1 . 5$ : the tolerance width is $6 \sigma \times 1 . 5 = 9 \sigma$ . The distance from the mean to the nearest limit is:

$$
{ \frac { 9 \sigma } { 2 } } - 1 . 5 \sigma \; = \; 4 . 5 \sigma - 1 . 5 \sigma \; = \; 3 . 0 \sigma
$$

$$
C _ { p k } \; = \; { \frac { 3 . 0 \sigma } { 3 \sigma } } \; = \; { \bf 1 . 0}
$$

The defect rate: $p = \Phi ( - 3 . 0 ) + \Phi ( - 6 . 0 ) = 0 . 0 0 1 3 5 + 0 . 0 0 0 0 0 0 5 \approx 1 3 5 0 \ \mathrm { ppm }$ .

**Centred, the same process ($\pm 4 . 5 \sigma$ ) would give $2 \Phi ( - 4 . 5 ) = 6 . 8 \ \mathrm { ppm}$ . The 1.5σ shift — a 7.5 μm offset on a process with $\sigma = 5 \ \mu \mathrm { m }$ — raises that to 1 350 ppm, almost all on one side. (The 2 700 ppm in the table is for a *centred* process with $C _ { p k } = 1$ , which has two tails.) Centring is the cheapest quality improvement available: one tool offset recovers a factor of about 200 in defect rate.** $\blacksquare$
:::
:::

::: exercise Takt time and line efficiency {#ex-takt level=3 check="89.6"}
A line has 4 stations with cycle times of 55, 48, 62, and 50 seconds. The demand is 480 parts per 8-hour shift. Calculate the takt time and the bottleneck, and find the balance efficiency $\sum t _ { i } / ( N \, t _ { \max } )$ before and after moving 2 s of work from station 3 to station 2. (Give the efficiency after rebalancing, in %.)

::: solution
$$
T _ { \text{takt } } \; = \; { \frac { 2 8 \ 8 0 0 } { 4 8 0 } } \; = \; 6 0 \ \mathrm { s}
$$

The bottleneck is Station 3 at 62 s, which exceeds the takt time of 60 s. **The line cannot meet demand.** The balance efficiency (based on the bottleneck):

$$
\eta \; = \; { \frac { 5 5 + 48 + 62 + 50 } { 4 \times 6 2 } } \; = \; { \frac { 2 1 5 } { 2 4 8 } } \; = \; { \bf 8 7 \ \% }
$$

Moving 2 s of work from Station 3 to Station 2 (which has 12 s of slack) gives 55, 50, 60 and 50 s, so every station is within the takt:

$$
\eta \; = \; { \frac { 2 1 5 } { 4 \times 6 0 } } \; = \; { \bf 8 9 . 6 \ \% }
$$

**Rebalancing raises the efficiency (from 87 % to 89.6 %) because the same work is divided over a shorter cycle, and the line now meets demand. The efficiency is maximised when all stations have equal cycle time.**
:::
:::

::: quiz Measurement uncertainty {#quiz-unc}
A part has a tolerance of $\pm 0 . 0 2 0 \ \mathrm { m m }$ . The measurement uncertainty is $\pm 0 . 0 0 5 \ \mathrm { m m }$ at $k = 2$ . What is the ratio of measurement uncertainty to tolerance, and is it acceptable by the 10:1 rule?

- [ ] 5 % — acceptable
- [x] 12.5 % — slightly worse than the 10:1 rule
- [ ] 10 % — exactly at the limit
- [ ] 50 % — the measurement is useless

::: solution
The tolerance width is $2 \times 0 . 0 2 0 = 0 . 0 4 0 \ \mathrm { m m }$ . The expanded uncertainty is $0 . 0 0 5 \ \mathrm { m m }$ . The ratio is $0 . 0 0 5 / 0 . 0 4 0 = 1 2 . 5 \ \%$ . By the 10:1 rule (uncertainty $\leq 1 0 \ \%$ of the tolerance width), the measurement is marginal — slightly worse than the rule. **The practical answer: the measurement can make the accept/reject decision for most parts, but parts within 5 μm of the limit are in the "indeterminate zone" and should be re-measured with a better instrument or a comparison gauge.**
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
- **[[manufacturing/additive-manufacturing]]** — AM's as-built tolerance is typically $\pm 0 . 1 { - } 0 . 3 \ \mathrm { m m }$ , roughly IT12–IT14 for a 50 mm feature. Every critical dimension on an AM part is machined, and the machining allowance is a tolerance stack-up problem.
- **[[manufacturing/joining]]** — Weld inspection (VT, PT, MT, RT, UT) is an attribute measurement with a detection probability that depends on the defect orientation, the surface condition, and the inspector's certification level. The probability of detection (POD) curve is the OC curve of NDT.
- **[[manufacturing/casting]]** — Casting tolerances are typically IT14–IT17 (about $\pm 0 . 4 { - } 1 . 8 \ \mathrm { m m }$ on a 100 mm dimension), and the dimensional accuracy depends on the pattern wear, the mould temperature, and the shrinkage allowance. The pattern is calibrated, the mould is pyrometer-controlled, and the first article is scanned.
- **[[control-systems/pid-control]]** — A CNC axis is a PID-controlled servo. The positioning accuracy is limited by the servo bandwidth, the encoder resolution, and the friction. The Abbe error is a disturbance that the servo cannot reject because it is not measured.
- **[[control-systems/feedback-stability]]** — The in-process gauge with tool compensation is a feedback loop. If each measured error is corrected by a fraction $g$ of itself, the loop over-corrects and oscillates for $g > 1$ and diverges for $g > 2$ ; a gain well below 1 also stops measurement noise being fed back into the tool. The sampling interval must be shorter than the tool-wear time constant.
- **[[design-process/reliability-risk]]** — The FMEA is the bridge between manufacturing and design: the severity rating comes from the design (what happens if the part fails), the occurrence rating comes from the process (how often does the cause occur), and the detection rating comes from the inspection plan (how likely are we to catch it).
- **[[design-process/design-for-manufacture]]** — The tolerance stack-up, the datum scheme, and the gauge access are DFM decisions. A drawing that specifies a $\pm 0 . 0 1 \ \mathrm { m m }$ tolerance on a feature that cannot be gauged is a drawing that will be wrong.

::: history Metrology, quality, and automation: from the screw thread to the closed loop {#history-metrology}
**1841** — Joseph Whitworth reads "On an Uniform System of Screw Threads" to the Institution of Civil Engineers, proposing a single standard thread form and pitch for each diameter. His precision measuring machines of the following decade, capable of resolving a millionth of an inch, and his standard gauges made it practical for parts made in different workshops to fit together. **Interchangeability is not only a design concept; it is a metrology concept.**

**1896–1901** — Carl Edvard Johansson, an inspector at the state rifle factory in Eskilstuna, Sweden, develops sets of precision **gauge blocks** that can be wrung together to build up thousands of lengths from a few dozen blocks; he receives Swedish patent 17017 in 1901. Gauge blocks become the link between the national length standard and the workshop.

**1924** — **Walter A. Shewhart**, at Western Electric's engineering department (soon to become Bell Telephone Laboratories), sketches the first **control chart** in a memorandum of 16 May 1924, separating "assignable" causes of variation from "chance" causes with statistically set limits. **1931** — he publishes *Economic Control of Quality of Manufactured Product*.

**1949** — The US military publishes MIL-P-1629, the procedure for **failure mode, effects and criticality analysis**. NASA contractors use variants during the 1960s, including on Apollo, and Ford adopts FMEA in the 1970s; it becomes standard practice in the automotive industry in the 1980s.

**1950** — At the invitation of the Union of Japanese Scientists and Engineers (JUSE), **W. Edwards Deming** lectures on statistical quality control to Japanese engineers and senior managers. JUSE establishes the **Deming Prize** in his name in 1951.

**1952** — The MIT Servomechanisms Laboratory, working from John T. Parsons's idea and with US Air Force funding, demonstrates the first **numerically controlled milling machine**: a modified three-axis Cincinnati Hydro-Tel mill driven by punched tape. **NC, and later CNC, made complex geometry repeatable and changeover a matter of software.**

**1978–1990** — Taiichi Ohno's *Toyota Production System* is published in Japan (1978; English 1988). John Krafcik coins the term "lean production" in "Triumph of the Lean Production System" (*Sloan Management Review*, 1988), and Womack, Jones and Roos's *The Machine That Changed the World* (1990) spreads the ideas.

**1986–1987** — **Motorola** develops **Six Sigma** (engineer Bill Smith is usually credited) and launches it company-wide in 1987, with the target of 3.4 defects per million opportunities.

**1987** — ISO publishes the **ISO 9000** series of quality management standards, based largely on the British BS 5750. It is revised in 1994, 2000, 2008 and 2015.

**2000s–present** — Scanning CMMs, optical scanners and X-ray CT turn inspection from measuring a few points into measuring whole surfaces and internal features, and in-process probing feeds measurements back to the CNC control. **The closed-loop machining cell — measure, offset the tool, cut again — is the old idea of the control chart built into the machine.**
:::

::: summary Metrology, quality, and automation {#summary-metrology}
- **Measurement is traceable or it is meaningless.** The calibration chain from the SI metre to the shop-floor micrometer must be unbroken, documented, and current. A calibration certificate without an uncertainty statement is not a calibration.
- **Every measurement has an uncertainty, and it should be no more than about 10 % of the tolerance.** The GUM framework (Type A + Type B, RSS, expanded with $k = 2$) quantifies the doubt. The larger the uncertainty, the wider the band near each limit in which the measurement cannot make the accept/reject decision.
- **The Abbe principle governs instrument design.** The measurement axis should be collinear with the dimension being measured. An Abbe offset of $e$ and an angular error of $\theta$ produce a displacement error of $e \times \theta$ . A caliper violates the Abbe principle by design.
- **GD&T replaces the square tolerance zone with a circular one.** The circle that just contains a $\pm 0 . 1$ square zone is $\phi 0 . 2 8 3$ , with 57 % more area, and it matches how a pin actually assembles. MMC gives bonus tolerance when the feature is not at maximum material. The datum reference frame is three planes, established by the 3-2-1 rule.
- **Process capability compares the process spread to the tolerance width.** $C _ { p }$ is the potential; $C _ { p k }$ is the actual. $C _ { p k } \geq 1 . 3 3$ is a common minimum for production, and 1.67 a common requirement for new processes. The defect rate is $p = 2 \Phi ( - 3 C _ { p k } )$ for a centred process.
- **Control charts distinguish common cause from special cause.** The X-bar/R chart with $\pm 3 \sigma$ limits has a 0.27 % false-alarm rate. The CUSUM chart detects a 1σ shift in about 10 samples instead of about 44. The Western Electric run rules add sensitivity at the cost of false alarms.
- **Acceptance sampling is a statistical gamble.** The OC curve gives the probability of acceptance as a function of the lot quality. A $c = 0$ plan with $n = 1 0 0$ accepts 95 % of lots at 500 ppm defective but still accepts 10 % of lots at 2.3 %. Sampling judges lots; it does not sort parts, and neither it nor manual 100 % inspection replaces a capable process.
- **A three-axis machine has 21 geometric errors.** The volumetric accuracy is several times worse than the single-axis positioning accuracy. Measuring the errors and compensating them in the controller reduces the volumetric error. The Abbe error at the tool tip is the tool length times the angular error.
- **Line balancing sets the takt time and the number of stations.** $T _ { \text{takt } } = T _ { \text{available } } / N _ { \text{demand } }$. The minimum number of stations is $\lceil \sum t _ { i } / T _ { \text{takt } } \rceil$. The line efficiency is $\sum t _ { i } / ( N \times T _ { \text{takt } } )$. The bottleneck is the station with the longest cycle time.
- **The cost of quality follows the 1-10-100 rule of thumb.** A defect that costs 1 to prevent costs about 10 to catch in the factory and about 100 once it reaches the customer. The cheapest defect is the one that never happens, and the cheapest quality improvement is centring the process.
:::

## Further reading

- **JCGM 100:2008 (GUM)** — *Evaluation of measurement data — Guide to the expression of uncertainty in measurement*. The definitive reference for uncertainty budgets: Type A and Type B evaluation, combination, and coverage factors.
- **ISO 14253-1:2017** — *Geometrical product specifications (GPS) — Inspection by measurement of workpieces and measuring equipment — Part 1: Decision rules for verifying conformity or nonconformity with specifications*. The accept/reject/indeterminate rule of §1.
- **ISO 286-1:2010** — *Geometrical product specifications (GPS) — ISO code system for tolerances on linear sizes*. The IT grade system, the fundamental deviations, and the fits.
- **ASME Y14.5-2018** — *Dimensioning and Tolerancing*, with **ISO 1101** as the ISO counterpart. The geometric controls, the datum reference frame, and the material condition modifiers.
- **AIAG, *Statistical Process Control (SPC)*, 2nd ed. (2005)** and **AIAG, *Measurement Systems Analysis (MSA)*, 4th ed. (2010)** — the automotive references for control charts, capability and gauge R&R; with the **AIAG–VDA *FMEA Handbook* (2019)** and the AIAG *PPAP* manual.
- **Montgomery, D.C.** — *Introduction to Statistical Quality Control*, 8th ed. Wiley, 2019. The standard textbook: control charts, CUSUM, capability, acceptance sampling and designed experiments.
- **Shewhart, W.A. (1931)** — *Economic Control of Quality of Manufactured Product*. Van Nostrand. The origin of the control chart; and **Deming, W.E. (1986)** — *Out of the Crisis*. MIT Press.
- **Groover, M.P.** — *Automation, Production Systems, and Computer-Integrated Manufacturing*, 5th ed. Pearson. CNC, FMS, group technology and line balancing.
