Palaeomagnetism is the science of reading the fossil magnetic field out of rocks, and it is the discipline that turned plate tectonics from a hypothesis into a fact. Its logic is disarmingly simple: a rock that forms in a magnetic field acquires a permanent magnetisation aligned with that field, and if the rock has not since been heated, disturbed or chemically reset, its magnetisation tells you the **direction** and, with care, the **intensity** of the field at the moment of its formation. From the direction alone you get a **palaeolatitude**, a **palaeorotation** and a **palaeolongitude** — three of the four numbers needed to place a continent on a globe — and from a sequence of them you get the motion of a plate through time.

## Rock magnetism and remanence

::: definition Magnetic minerals and their blocking {#def-minerals}
Only a handful of minerals carry the palaeomagnetic record, and knowing which one is present is the first act of every study:
$$
\begin{array}{l|c|c|l}
\text{mineral} & \text{Curie point}\ (^\circ\mathrm{C}) & \text{coercivity}\ (\mathrm{mT}) & \text{where it dominates} \\ \hline
\text{magnetite, Fe}_3\mathrm{O}_4 & 580 & 10\text{–}40 & \text{basalts, most sediments} \\
\text{titanomagnetite, Fe}_{3-x}\mathrm{Ti}_x\mathrm{O}_4 & 150\text{--}580 & 5\text{–}60 & \text{basalts, seafloor} \\
\text{hematite, Fe}_2\mathrm{O}_3 & 675 & 100\text{–}300 & \text{red beds, ancient sediments} \\
\text{pyrrhotite, Fe}_{1-x}\mathrm{S} & 320 & 30\text{–}100 & \text{sulphide ores, some sediments} \\
\text{goethite, FeOOH} & 100\text{–}120 & 5\text{–}20 & \text{weathered soils} \\
\text{greigite, Fe}_3\mathrm{S}_4 & 160\text{–}300 & 10\text{–}40 & \text{lacustrine, sulphidic sediments}
\end{array}
$$
A grain is a permanent magnet only if it is **larger** than the **superparamagnetic** threshold — about 25–30 nm for magnetite — below which thermal energy randomises its moment in seconds, and its remanence is stable only if it is **smaller** than the **single-domain** threshold, about 80 nm for magnetite, above which it splits into domains whose walls move easily and whose remanence is soft. The window between the two, in which a grain is a **single-domain** particle with a stable, high-coercivity, high-stability remanence, is **less than a factor of four in grain size**, and it is this narrow window that makes palaeomagnetism possible and that makes the **grain-size distribution** the hidden control on every measurement.

The **blocking temperature** $T_{\mathrm{B}}$ is the temperature, on cooling, at which a grain's moment stops rotating; it lies between the superparamagnetic blocking temperature and the Curie point and is distributed over $100$–$200$ °C within any one sample because the grain sizes and anisotropies are distributed. The **thermal demagnetisation** curve is a direct picture of that distribution, and its **end-of-remanence** temperature identifies the carrier: a remanence that dies at 580 °C is **magnetite**, one that survives to 675 °C is **hematite**, and one that dies at 300 °C is **pyrrhotite** or **greigite** — a distinction that decides whether a 2-billion-year-old sediment carries a primary or an altered remanence.
:::

::: definition The five remanences and the isolation of the characteristic direction {#def-remanence}
A rock can acquire a remanent magnetisation by five mechanisms, and the whole of the method is the separation of the primary from the rest:
$$
\begin{array}{ll}
\textbf{TRM} & \text{thermoremanent, acquired on cooling through the blocking range — basalts, baked contacts} \\
\textbf{DRM} & \text{detrital, by the rotation of settling grains — sediments, with a \emph{depositional} or \emph{post-depositional} flag} \\
\textbf{CRM} & \text{chemical, acquired during the growth of the magnetic mineral — red beds, hematite} \\
\textbf{VRM} & \text{viscous, acquired by thermal creep in the present field over years to Myr — the great enemy} \\
\textbf{ARM} & \text{anhysteretic, acquired in a weak field during the decay of a strong one — a proxy for grain size}
\end{array}
$$
**Viscous** remanence is acquired by the same superparamagnetic mechanism that destroys the primary signal, and it grows roughly as the **logarithm of time** in the present field; a sediment that has stood for 10 Myr in the present field may have a VRM as large as its primary DRM. The remedy is **demagnetisation**: **alternating-field (AF)** treatment drives off the low-coercivity grains and **thermal** treatment the low-blocking-temperature grains, and the **characteristic remanent magnetisation (ChRM)** is the **direction to which the specimen's magnetisation vector converges** over the highest 30–60 per cent of its remanence — a direction that must be **stable**, must be reached by **at least four** demagnetisation steps, and must be **antiparallel** between normally and reversely magnetised specimens from the same horizon (the **reversal test**, which is the single most powerful validation in the subject).
:::

::: definition Fisher statistics and the geocentric axial dipole {#def-fisher}
A set of $N$ directions is described by the **Fisher distribution**, whose single parameter is the **precision** $K$ and whose **95 per cent confidence radius** about the mean is, for $N \geq 25$,
$$
\alpha_{95} \approx \frac{140^\circ}{\sqrt{K}} .
$$
A $K$ of 30 gives $\alpha_{95} = 26^\circ$, which is **useless** for palaeogeography; a $K$ of 100 gives $14^\circ$, which is a good result for a sediment and a poor one for a lava flow. The **within-flow** scatter of a single cooling unit is $5$–$10^\circ$ and reflects the **palaeosecular variation** of the field over the weeks to years of cooling, and the **between-flow** scatter over 10⁵ years is $12$–$18^\circ$ at low latitude, which is the **minimum** scatter any palaeomagnetic study can hope to beat.

The **geocentric axial dipole (GAD)** hypothesis — that the **time-averaged** field is a dipole centred on the Earth's axis — is the assumption on which every palaeolatitude rests, and it is validated by four independent observations: the time-averaged field from 0–5 Ma is axial to within **2–3°**; the global distribution of **palaeomagnetic poles** from the last 25 Myr passes the **classical reversal test**; the field models derived from **marine magnetic anomalies** and from **archaeological** intensities are axial; and the **numerical dynamos** produce axial time-averaged fields whenever their parameters are pushed toward the Earth's. Given the GAD, the **palaeocolatitude** $\theta$ and the observed **inclination** $I$ are related by
$$
\cot\theta = 2\cot\theta_{\mathrm{m}} \quad\Leftrightarrow\quad \tan\lambda = \tfrac{1}{2}\tan I ,
$$
and the **palaeomagnetic pole** implied by a site at latitude $\phi$, longitude $E$ with declination $D$ and inclination $I$ follows from the standard spherical-trigonometry relations, a computation now done by every reduction package and worth doing once by hand.
:::

::: widget plot
f: 140/sqrt(x)
x: 5, 100
y: 12, 65
labels: alpha_95
caption: The 95 per cent confidence radius $\alpha_{95} \approx 140^\circ/\sqrt{K}$ as a function of the Fisher precision parameter $K$. The curve is a **square-root** law, so a doubling of the precision improves the confidence only by 41 per cent, and the **number of specimens** enters $K$ only through the **within-sample** scatter — a study of 5 flows with $K = 200$ is **less** reliable than 25 flows with $K = 30$, because the former cannot average the palaeosecular variation. The practical thresholds are $\alpha_{95} < 10^\circ$ for a **palaeogeographic** reconstruction, $10$–$20^\circ$ for a **plate-motion** estimate, and $> 25^\circ$ for a study that should not be published. The relation also explains why **tilt correction** matters so much: a sedimentary section that has been tilted by 15° and not corrected has its directions spread by at least 15°, which caps $K$ and destroys the confidence radius.
:::

## Apparent polar wander, plates and the time scale

::: definition Apparent polar wander paths {#def-apwp}
If a continent were fixed and the dipole axis fixed, every palaeomagnetic pole computed from rocks of increasing age would fall at the **present** pole. They do not: they define a wandering **apparent polar wander path (APWP)**, and the wander is **apparent** — it is the **continent** that moved, not the pole. The method's power is that the APWP is a **unique fingerprint of a continent's motion**, so two continents with **different** APWPs were **separate** plates and two with the **same** APWP were **joined**. The history of the subject is the history of this test: **Runcorn, Cope and Blackett** (Runcorn) and **Irving** (Irving) built the first Palaeozoic and Mesozoic paths in 1951–1956, **Creer, Irving and Runcorn** (Creer) showed in 1954 that the **Gondwana** Devonian–Triassic path differed from the European and North American ones, and **Du Toit's** (Du Toit) **Gondwanaland** was vindicated within a decade. The **Carboniferous–Jurassic "flat"** part of the Gondwana path, over which the pole barely moved while Europe's moved 60°, is the classic demonstration.

The APWP also measures **crustal shortening and rotation**. If a site's palaeolatitude is **younger** than the plate's, the site has moved **relative** to its continent, and the difference between the **coeval** palaeolatitudes of two sites across a mountain belt is the **amount of shortening** absorbed between them — the method by which Tibet's convergence has been measured, and by which the **2000–3500 km** of India–Eurasia convergence has been established against the **6000 km** implied by the ocean-floor record.
:::

::: definition Magnetostratigraphy and the polarity time scale {#def-magnetostrat}
A vertical sequence of normal and reversed polarity zones, matched to the **geomagnetic polarity time scale (GPTS)**, gives a **age model** of unmatched precision for the Neogene and Quaternary, where the reversal rate of 3–5 per Myr provides a **time-marker every 200–300 kyr**. The method's requirements are a **continuous** sedimentary section, a **reliable** polarity determination (the **reversal test** and the **thick-thin** criterion, which rejects a polarity zone thinner than the **sampling interval**), and an **independent** age constraint — a fossil zone, an ash bed, or a magnetic anomaly tie — to pick the **correct** match among the many possible. Its achievements are the calibration of the **Neogene and Quaternary** stages, the ages of the **hominin** sites of East Africa, the **Siwalik** and **Potwar** sequence of the Himalayan foreland, the **Mediterranean** Messinian and Pliocene, and the **Chinese loess** sections, whose **magnetic susceptibility** record is itself a **palaeomonsoon** proxy at the 20-kyr precession band.

The **marine magnetic anomaly** record is the same method applied to the seafloor, and it is the **backbone** of the entire Cenozoic and Mesozoic time scale: the anomaly sequence is a **tape** of the reversal record laid down at the spreading rate, calibrated by **⁴⁰Ar/³⁹Ar** ages of reversely and normally magnetised lavas on land, and the **Cande and Kent** (Kent) tuning of 1995 and 1999 — the **GPTS** used by everyone since — is anchored on the **90° fracture zones** and on the **Maastrichtian** astronomically tuned sections.
:::

::: example Fisher statistics and the reliability of a direction {#ex-fisher}
A palaeomagnetic study of a Palaeogene limestone collects 8 cores from each of 6 outcrops. After thermal demagnetisation the 48 directions give a Fisher precision $K = 22$ and a mean inclination of $52^\circ$. Find $\alpha_{95}$, the palaeolatitude, and decide whether the study is fit for palaeogeography.
::: solution
$$
\alpha_{95} = \frac{140^\circ}{\sqrt{22}} = 30^\circ, \qquad
\lambda = \arctan\left(\tfrac{1}{2}\tan 52^\circ\right) = \arctan(0.640) = 32.6^\circ .
$$
The corresponding uncertainty in palaeolatitude follows from $\tan\lambda = \tfrac{1}{2}\tan I$, which differentiates to
$$
\delta\lambda = \delta I\,\frac{\sin 2\lambda}{\sin 2 I},
$$
and with $\delta I = \alpha_{95} = 30^\circ$, $\lambda = 32.6^\circ$ and $I = 52^\circ$ gives $\delta\lambda \approx 20^\circ$.

The study is **not** fit for palaeogeography, and the reasons are instructive. A confidence radius of $30^\circ$ cannot distinguish a 33° palaeolatitude from 5° or from 60°, so the result constrains nothing. The **precision** $K = 22$ is far below the **palaeosecular-variation** floor of $K \approx 30$–$60$ expected from 48 **independent** directions, which means the directions are **not** independent: the 8 cores from one outcrop share the same **cooling unit**, the same **joint set**, and the same **viscous overprint**, and the effective $N$ is 6, not 48. The standard remedy is the **outcrop** or **site** **mean** — one direction per cooling unit or per independently tilted bed — and the **bootstrapping** or **Monte-Carlo** reversal test of **McFadden and Lowes** (McFadden) and **McFadden and McElhinny** (McElhinny), which tests the **antiparallelism** of the normal and reversed means without assuming a Fisher distribution.

Three further checks separate a good study from a bad one. The **tilt test**: the directions must be **tighter** after correction for the **bedding** tilt than before, which proves the remanence is **pre-folding** and therefore primary; a **positive tilt test** is the strongest single piece of evidence available for a sediment. The **reversal test**: the normal and reversed means must be antiparallel to within the confidence limits, which proves that the magnetisation records the **field** and not a **chemical** or **tectonic** artefact. And the **palaeosecular-variation** test: the scatter must be **consistent** with the expected palaeosecular variation at that palaeolatitude, which proves that the study has averaged over enough time — and a study of **one** lava flow, whose scatter is only the cooling-time variation, can never pass it.
:::
:::

::: example India, Asia and the missing convergence {#ex-india}
Cretaceous limestones of the **Tethyan Himalaya** at a present latitude of 29° N give a palaeolatitude of 12° N at 70 Ma. Find the northward motion of India–Asia convergence since 70 Ma, compare it with the ocean-floor estimate, and explain the discrepancy.
::: solution
The palaeomagnetic estimate of the convergence is
$$
(29 - 12)\times111.2\ \mathrm{km} = 1890\ \mathrm{km}.
$$
The **ocean-floor** reconstruction, which restores the anomalies between Africa, India and Antarctica and accounts for the Réunion hotspot track, requires **5000–6000 km** of India–Eurasia convergence between 70 Ma and the present. The palaeomagnetic estimate is therefore **short by a factor of three**.

Three resolutions have been proposed and all three are partly right. **Greater India**: the Indian continental crust extended **2000–3000 km** farther north than the present Himalayan front, and the Tethyan Himalayan limestones were deposited on **Eurasian**, not Indian, crust — so the palaeomagnetic site never travelled with India, and the missing convergence was absorbed by the **subduction and eclogitisation** of Greater India beneath Tibet. This is the currently favoured resolution and it is supported by the **ultra-high-pressure** eclogites of the Tethyan Himalaya and by the **seismic** image of Indian crust beneath southern Tibet. **Crustal shortening**: 800–1200 km of the convergence was taken up by **crustal shortening and thickening** within Tibet and by the **extrusion** of Indochina along the Red River and Altyn Tagh faults, none of which moves the palaeomagnetic site. **And a shortening of the palaeomagnetic estimate itself**: the Tethyan Himalayan limestones carry a **chemical remanence** acquired during Eocene–Oligocene burial in a field whose direction had already been rotated by the folding, and the **tilt test** on them is **mixed** — so their palaeolatitude may be biased **high** (too far north) by 5–10°.

The general lesson is that a palaeomagnetic palaeolatitude is a measurement of **where the sampled rock was**, not of where the **continent** was, and that the two differ by every amount of **local** shorting, rotation, translation and remanence resetting that the rock has experienced. The strongest palaeogeographic reconstructions use **sites on the stable cratonic interior**, **many** coeval sites, and a **tilt test**, and they are checked against the **ocean-floor** and **palaeomagnetic** data of the **opposite** margin.
:::
:::

::: example A magnetostratigraphic age model {#ex-magnetostrat}
A 25-m continuous lacustrine section spans the Matuyama/Gauss reversal at its base and is of **present** age at its top. A normal-polarity zone 1.65 m thick is centred 17.4 m below the top. Find the mean sedimentation rate, the age of the zone's centre, and identify the zone.
::: solution
With a constant sedimentation rate,
$$
\dot{z} = \frac{25\ \mathrm{m}}{2.58\ \mathrm{Myr}} = 9.7\ \mathrm{m\,Myr^{-1}},
$$
and the age of a horizon $z$ below the top is $t = z/9.7$, so the zone's centre is
$$
t = \frac{17.4}{9.7} = 1.80\ \mathrm{Ma},
$$
and its **duration** is $1.65/9.7 = 0.17\ \mathrm{Myr}$. A **normal**-polarity zone of 170 kyr centred at 1.80 Ma within the reversed Matuyama is the **Olduvai** subchron, whose independently dated bounds are **1.95–1.78 Ma** — a match to 20 kyr, or 1 per cent.

The **validation** of such a correlation is the substance of magnetostratigraphy, and it rests on four tests. The **pattern** must match: a single zone is a coincidence, and a section must show **three or four** zones whose **relative thicknesses** match the GPTS's **relative durations**. The **reversal test** must be passed, and the polarity of the **same** bed must be determined from **several** specimens. The **thick-thin criterion** must be satisfied: a polarity zone thinner than the **sampling interval** is not resolvable and must be discarded, and a zone whose apparent thickness implies a duration **shorter** than the shortest known chron is a **sampling artefact**. And an **independent** age control — a fossil, an ash bed, or a **⁴⁰Ar/³⁹Ar** date — must fall where the correlation predicts, which is why the sections that anchor the Neogene time scale are those with **both** magnetostratigraphy and radioisotopic dates.

The **circularity** of the method is real and is managed rather than eliminated: the GPTS is calibrated on **marine** sections tied to **⁴⁰Ar/³⁹Ar** ages and to **astronomical** tuning, and a **continental** section is matched to it by pattern, so a correlation can be **wrong by one or two chronos** and still fit the pattern if the sedimentation rate is **variable**. The remedy is the **astrochronological** tuning of the **magnetic susceptibility** or **geochemical** cyclostratigraphy of the same section, which provides an **independent** rate, and the modern standard is a **joint** magnetostratigraphic and cyclostratigraphic age model with a **Monte-Carlo** uncertainty.
:::
:::

::: example Inclination flattening in a sediment {#ex-flatten}
A fine-grained marine mudstone gives a characteristic inclination of $22^\circ$. Independent **foraminiferal** and **biostratigraphic** evidence places the site at a palaeolatitude of $15^\circ$. Find the expected geocentric-axial-dipole inclination, the flattening factor, and the error in palaeolatitude that would result from ignoring it.
::: solution
The expected inclination follows from $\tan I = 2\tan\lambda$:
$$
\tan I = 2\tan 15^\circ = 0.536, \qquad I_{\mathrm{GAD}} = 28.2^\circ .
$$
The observed $22^\circ$ is **lower**, and the standard **King, Banerjee, Van der Voo and Xing** (Van der Voo) correction expresses the flattening as
$$
f = \frac{\tan I_{\mathrm{obs}}}{\tan I_{\mathrm{GAD}}} = \frac{0.404}{0.536} = 0.75 ,
$$
so the detrital remanence is **25 per cent flattened**. Ignoring it gives a palaeolatitude of $\arctan(\tfrac{1}{2}\tan 22^\circ) = 12.6^\circ$ instead of $15^\circ$ — an error of **2.4°**, or 270 km.

The physical cause is **sediment compaction**. A **depositional** detrital remanence is acquired by grains that settle through water and align with the field, but as the sediment **compacts** the grains rotate with the **dewatering** matrix, and their magnetic moments are carried toward the **bedding normal** — which flattens the inclination. A **post-depositional** detrital remanence, acquired by grains rotating **after** burial in a soft sediment, is flattened by the same mechanism, and the two are distinguished by the **elongation/inclination** diagram: a purely depositional fabric plots on the **King** curve and a post-depositional one on the **exponential** compaction curve.

The correction matters most where it is **least** expected. At **low** palaeolatitudes the flattening is a small absolute error, but the **polar** regions are where it is worst: a sediment at a true palaeolatitude of $70^\circ$ has an expected inclination of $83.7^\circ$ and a 25 per cent flattening brings it to $80.6^\circ$, an error of only $3^\circ$ — but the **polarity** determination and the **palaeolongitude** are unaffected. The serious consequence is for **orogenic** palaeolatitude: a 25 per cent flattening in a **Tibetan** or **Basin and Range** lake sediment biases the palaeolatitude **low** by 2–4°, which is exactly the direction and magnitude of the discrepancy between the **palaeomagnetic** and **ocean-floor** estimates of Greater India's motion, and is one of the reasons that discrepancy has never been fully resolved.
:::
:::

::: warning A palaeomagnetic direction is a hypothesis about a rock, not a measurement of a field
Six failure modes generate most published palaeomagnetic error. **A secondary remanence that passes every test**: a chemical remanence growing during burial can be **pre-folding**, can be **antiparallel** between the two polarities if the fluids were redox-layered, and can be **younger** than the deposition by 100 Myr — and the only defence is **petrography**, **reflection** and **transmission** microscopy in **reflected light**, plus the **anhydrous** sulphide check, which most studies omit. **A "positive" tilt test from a small number of beds**: with **two** or **three** structural orientations the test has almost no power, and a **positive** tilt test from three beds is worth less than a **negative** one from twelve; the **bootstrap** test of **McFadden and McElhinny** (McElhinny) gives the probability, and it should be quoted. **A palaeosecular-variation bias**: a **single** lava flow records the field over **weeks**, whose inclination differs from the **time-averaged** field by 10–15°, and a palaeolatitude from one flow is uncertain by that much however precise the measurement; the **Thellier** and **Coe** palaeointensity methods have the same problem worse, because the **field intensity** varies by 30 per cent over 10 kyr. **A detrital remanence that is not depositional**: **post-depositional** (sediment-compaction) DRM is **flattened** toward the bedding normal by up to 20°, and the **elongation/inclination** correction of **King, Banerjee, Van der Voo and Xing** (Van der Voo) is required, and its omission biases every palaeolatitude from a fine-grained sediment **low**. **A "reversal" that is a drilling artefact**: in a borehole core the **orientation** of the core barrel is uncertain by several degrees and the **drilling-induced** viscous overprint can be 50 per cent of the remanence, which is why borehole magnetostratigraphy is calibrated against a **cuttings** or **outcrop** section. **And a magnetostratigraphic correlation made without an independent age**: the polarity pattern is **non-unique** at the 10-Myr scale, and a correlation that fits the pattern but not a fossil or an isotope constraint is a **choice**, not a result.
:::

::: history
**Gilbert** (Gilbert) noted in 1600 that a heated lodestone loses its magnetism; **Folger** (Folger) reported in 1778 that a baked clay hearth was magnetised **opposite** to the present field, and **Brunhes and Mercier** (Brunhes) and **Matuyama** (Matuyama) established in 1902–1906 that **reversed** remanence in lavas was global and not a local rotation. **Thellier** (Thellier) invented the **Thellier–Thellier** palaeointensity method in 1938 with his father and published his thesis on it in 1951, **Néel** (Néel) developed the **single-domain** theory of thermoremanent magnetisation in 1949–1955, for which he shared the 1970 Nobel Prize, and **Nagata** (Nagata) wrote the standard *Rock Magnetism* in 1961. **Fisher** (Fisher) invented the statistics of directions in 1953; **Irving** (Irving), **Runcorn** (Runcorn), **Creer** (Creer), **Cope** (Cope) and **Blackett** (Blackett) founded **palaeomagnetism** and built the first **apparent polar wander paths** in 1947–1956, and **Creer, Irving and Runcorn** (Creer) showed in 1954 that the **Gondwana** path differed from the European and North American ones. **Thellier and Thellier** (Thellier) published *Le phénomène thermo-rémanent et ses applications à la paléomagnétisme et à la géologie* in 1959. **Vine and Matthews** (Vine) and independently **Morley** (Morley) interpreted the **seafloor magnetic anomalies** as a reversal tape in 1963, **Heirtzler, Drake and the Lamont group** (Heirtzler) built the first **geomagnetic polarity time scale** from them in 1968, **Cox and Dalrymple** (Dalrymple) and **McDougall** (McDougall) calibrated it on land in 1963–1967, and **Cande and Kent** (Kent) produced the **tuning** still in use in 1995 and 1999. **Kirschvink** (Kirschvink) introduced **principal-component analysis** of demagnetisation in 1980, **McFadden and McElhinny** (McElhinny) the **bootstrap** and **reversal** tests in 1981–1990, **King, Banerjee, Van der Voo and Xing** (Van der Voo) the **inclination-flattening** correction in 1983, and **Tarling** (Tarling) and **Hrouda** (Hrouda) wrote the standard **demagnetisation** and **anisotropy** texts. **Opdyke, Lindsay, Johnson and Naudé** (Opdyke) established **magnetostratigraphy** in the 1970s, **Sellwood** (Sellwood) the **Palaeogene** Tethyan record, **Tauxe** (Tauxe) the standard primer and practice, and **Torsvik and Van der Voo** (Torsvik) the **Palaeozoic** palaeogeographic syntheses.
:::
## Where this leads

The field whose fossil record is read here is described in [[geophysics/geomagnetism]], the plate tectonics it established in [[physical-geology/plate-tectonics]] and [[geophysics/seismic-structure]], the polarity time scale it shares with the seafloor in [[geophysics/geomagnetism]] and [[earth-history/geological-time]], the magnetostratigraphic practice in [[sedimentology/stratigraphy]] and [[palaeoclimate/dating]], the palaeomagnetic constraints on orogeny in [[structural-geology/orogens]] and [[structural-geology/rifts]], the susceptibility and remanence cycles used in cyclostratigraphy in [[palaeoclimate/orbital-cycles]] and [[palaeoclimate/ocean-sediments]], and the magnetic method in exploration in [[geophysics/exploration]].

::: quiz
A sedimentary section gives a well-determined characteristic remanent magnetisation with inclination 30° and declination 5° east of north, and the **tilt test is positive**. What does the positive tilt test prove?
- [ ] The rock formed at a palaeolatitude of 15°.
- [x] The remanence was acquired before the beds were tilted, so it is (very probably) primary.
- [ ] The field at the time was a geocentric axial dipole.
- [ ] The beds have not been rotated about a vertical axis.
::: solution
A positive tilt test means the directions are **tighter in the pre-tiling (bedding-corrected) frame** than in the present frame, which can only happen if the magnetisation was locked in **before** the tilting. It says nothing about the palaeolatitude, nothing about the GAD, and nothing about vertical-axis rotation — which is measured separately by comparing the declination with neighbouring sites.
:::
:::

::: summary
- Only a few minerals carry the record, and the carrier is identified by its blocking-temperature and coercivity spectrum.
- Viscous overprint is the great enemy; the characteristic direction is isolated by stepwise demagnetisation and validated by the reversal and tilt tests.
- Fisher statistics set the confidence: $\alpha_{95} \approx 140^\circ/\sqrt{K}$, and the number of **independent** cooling units or beds, not cores, controls it.
- The geocentric axial dipole hypothesis converts an inclination into a palaeolatitude, and is validated to 2–3° by the last 25 Myr of data.
- Different apparent polar wander paths mean different plates; the difference between coeval palaeolatitudes across an orogen measures its shortening.
- Magnetostratigraphy provides a 200–300-kyr time marker through the Neogene and Quaternary, and the marine anomaly tape is the backbone of the entire Cenozoic time scale.
:::

## Exercises

::: exercise Palaeolatitude {level=1 check="29"}
A lava flow gives an inclination of 48°. Find the palaeolatitude.
::: solution
$\tan 48^\circ = 1.1106$, so $\tan\lambda = 0.5553$ and $\lambda = 29.0^\circ$. The **factor of one-half** is the whole of the method's sensitivity: an inclination of 45° corresponds to a palaeolatitude of only 26.6°, so low and mid palaeolatitudes are **compressed** into the 0–45° inclination range and are the **least** precisely determined.
:::
:::

::: exercise Fisher precision {level=1 check="18"}
A study of 30 flows gives $K = 60$. Find $\alpha_{95}$.
::: solution
$\alpha_{95} = 140/\sqrt{60} = 18.1^\circ$. Adequate for a plate-motion estimate but not for a palaeogeographic reconstruction, which needs better than 10°.
:::
:::

::: exercise The Curie point {level=1 check="580"}
A thermal demagnetisation curve loses all its remanence by 580 °C. What is the carrier, and what does it exclude?
::: solution
**Magnetite** (Curie point 580 °C). It excludes **hematite**, whose remanence would survive to 675 °C, and it excludes **titanomagnetite** with more than a few per cent of titanium, whose Curie point is lower. A hematite component is what makes a **red bed** palaeomagnetically useful and a **basalt** unreliable, because hematite grows **late** by oxidation.
:::
:::

::: exercise A palaeorotation {level=2 check="17"}
A site at 40°N, 10°E gives a characteristic declination of 27° and the expected geocentric-axial-dipole declination for its palaeopole is 10°. Find the vertical-axis rotation, and state the assumption.
::: solution
The rotation is $27 - 10 = 17^\circ$ **clockwise**. The assumption is that the site's **palaeolongitude** relative to the palaeopole is what the GAD predicts, which requires that the **palaeopole position** be known independently — normally from a coeval **APWP** for the same craton. Without it, a declination anomaly can equally be a **non-axial field component**, which at a single site can contribute ±15° of declination.
:::
:::

::: exercise A reversal test {level=2 check="25"}
Normal and reversed groups of 12 and 14 specimens have means separated by 172° and 95 per cent confidence radii of 9° and 11°. Is the reversal test positive?
::: solution
The critical angle for a **classical** reversal test at these sample sizes and precisions is about **25°**, and the observed separation of 172° departs from 180° by only **8°**, which is well inside the limit — so the test is **positive**. The test is the strongest evidence available that the two groups carry the **same** magnetisation with opposite signs, and therefore that the remanence records the **field**; a **negative** reversal test means the two groups carry **different** components and the study has not isolated the primary remanence.
:::
:::

::: exercise A sedimentation rate {level=2 check="9.7"}
A 25-m section spans 2.58 Myr at a constant rate. Find the sedimentation rate and the thickness that 100 kyr of deposition represents.
::: solution
$\dot z = 25/2.58 = 9.7\ \mathrm{m\,Myr^{-1}}$, and 100 kyr deposits $0.97\ \mathrm{m}$. The **sampling interval** needed to resolve a 100-kyr chron is therefore about 0.2 m, and a magnetostratigraphic study sampled at 1-m intervals **cannot** resolve chronos shorter than about 100 kyr — which is why the Olduvai and Jaramillo subchrons are missed in many coarsely sampled sections and why the resulting correlation is displaced by one or two chronos.
:::
:::

::: exercise A palaeointensity {level=3 check="12.5"}
In a Thellier–Thellier experiment a specimen's natural remanence is $2.0\ \mathrm{mA\,m^{-1}}$ and the thermoremanence it acquires in a laboratory field of $50\ \mu\mathrm{T}$ is $8.0\ \mathrm{mA\,m^{-1}}$. Find the palaeofield, and give the three reasons the answer may be wrong.
::: solution
The palaeofield is $50\times(2.0/8.0) = 12.5\ \mu\mathrm{T}$.

The three failure modes are the reason fewer than 10 per cent of published Thellier data pass modern quality criteria. **Mineral alteration on heating**: titanomagnetite **inverts** to titanium-poor magnetite plus ilmenite above 300–400 °C, so the laboratory TRM is acquired by a **new, more magnetic** mineral and the palaeofield is **underestimated**; the diagnostic is a **concave-up** Arai plot, and the remedy is the **CO₂-iso-thermal** or **microwave** method, which does not heat the sample. **The multidomain effect**: grains above the pseudo-single-domain range acquire a TRM whose intensity is **nonlinear** in the field, so the method's fundamental assumption of **linearity and reciprocity** fails; the diagnostic is a **field-dependence** test at two laboratory field strengths. **Palaeosecular variation**: a single lava records the field for **weeks**, and the field intensity varies by 30 per cent over 10 kyr, so a palaeointensity from one flow is a **synoptic** measurement, not a mean, and 10–20 flows are required for a **site mean** good to 5 per cent.

The stakes are the **geomagnetic field's strength through time**, which is the only constraint on the **core's** thermal history and on the **age of the inner core**, and the **atmospheric** loss rate through the magnetosphere. The **Cretaceous Normal Superchron's** low intensity, the **Archaean** field's disputed weakness, and the **Palaeoproterozoic** "forced reversal" debate all turn on whether the palaeointensity database is sound, and the honest summary is that the **Quaternary** database is reliable, the **Cenozoic** is serviceable, and the **Mesozoic and older** is provisional.
:::
:::

::: exercise Apparent polar wander and true polar wander {level=3 check="5000"}
The palaeomagnetic poles of the Pacific plate for the last 130 Myr define a path that differs from the **global** mean path by up to 5000 km, while the Atlantic and African paths agree with the global mean to within 500 km. Give the two competing interpretations and the observation that distinguishes them.
::: solution
The two interpretations are **plate motion relative to the spin axis** and **true polar wander** — the whole solid Earth reorienting beneath the axis. If the Pacific path records **plate motion**, the other plates should agree with the global mean, which they do; if it records **true polar wander**, **all** plates should show the same path, which they do not. The **distinguishing observation** is therefore the **agreement of the other plates**, and on that basis the Pacific path is interpreted as **rapid plate motion** — the Pacific plate moved **5000–6000 km** northward and rotated substantially in the Cretaceous and Palaeogene, which is why the **Emperor** seamount chain bends 60° at 47 Ma.

The residual controversy is whether a **whole-Earth** true polar wander of 5–15° also occurred in the Late Cretaceous and early Tertiary. Its signature would be a **coherent** departure of **all** plates from the GAD prediction, and the reported signals are 2–5° — at the limit of what the palaeomagnetic database can resolve, and of the same size as the **non-axial** field correction. The independent constraint is **rotational stability**: true polar wander is driven by **inertia-tensor** anomalies from mantle convection and subduction and resisted by the **rigidity** of the lithosphere and the **viscosity** of the mantle, and the predicted rates are 0.5–2° per Myr — enough to produce a few degrees over 50 Myr but not the 20° originally claimed.

The general lesson is that palaeomagnetism measures **relative** motion with unrivalled precision and **absolute** motion only through the **assumption** that the time-averaged axis is the rotation axis, and that every claim of true polar wander is therefore a claim about the **coherence** of a global data set rather than about a single plate.
:::
:::
