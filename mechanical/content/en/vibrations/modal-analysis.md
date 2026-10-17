A finite-element model is a hypothesis and a vibration test is the evidence. Modal analysis is the discipline that compares them honestly: it extracts from measurements a set of frequencies, damping ratios and mode shapes with stated uncertainties, and it says whether a computed mode and a measured one are the same physical thing. Done well it is the only reason an engineer can trust a dynamics model of a built-up structure, because joints, bolts, sealants, cabling and the stiffness of a grout pad are not in the drawings and are not in the model, and they can change the answer by a factor of two.

Two ideas make the whole subject work. The first is the **frequency response function**, which is the receptance of the previous lesson measured rather than computed, and which contains the modes as its poles. The second is that a measured mode shape is a **vector**, and comparing two vectors requires a number that is invariant to scaling, to the units of the components and to the order in which the points were measured — the **modal assurance criterion**.

::: warning A mode is what the estimator says it is
Different extraction algorithms applied to the same data return different frequencies, and the differences are not errors but **assumptions**. Peak picking assumes the modes are well separated and lightly damped and that the frequency spacing exceeds the analysis resolution; a circle fit assumes a single mode dominates each frequency; a polyreference least-squares fit assumes a fixed number of modes in the band; a stochastic subspace fit assumes the excitation is white and that the structure is linear and stationary. A frequency reported to four significant figures from an algorithm whose assumptions are wrong to ten per cent is not a measurement, and the honest report gives a **scatter band** from several fits, not a single number.
:::

## Measuring a frequency response function

::: definition Input–output estimators {#def-estimators}
With force $f$ and response $x$, the true receptance is $\\alpha = X / F$. Measuring $N$ averages of the auto- and cross-spectra,
$$
H_1 = \\frac{G_{xf}}{G_{ff}}, \\qquad
H_2 = \\frac{G_{xx}}{G_{fx}}, \\qquad
H_3 = \\frac{G_{xf} - G_{nn}^{x} / c}{G_{ff} - G_{nn}^{f} / c} ,
$$
where $G$ denotes an averaged spectral density and $G_{nn}$ the noise floor. If the **force** measurement is contaminated by noise, $H_1$ is biased low and $H_2$ is unbiased; if the **response** is contaminated, the reverse. Comparing $H_1$ and $H_2$ over the frequency range is therefore not a formality but the standard diagnostic: agreement means the measurement is consistent, and disagreement localises the noise.
:::

::: proof Bias of the H1 estimator {#proof-h1bias}
Let the measured force be $f_m = f + n_f$ with the noise $n_f$ uncorrelated with both $f$ and the response $x = \\alpha f$, and let the response be noise-free. Then
$$
G_{x f_m} = \\alpha G_{ff}, \\qquad
G_{f_m f_m} = G_{ff} + G_{n_f n_f},
\\qquad
H_1 = \\frac{\\alpha G_{ff}}{G_{ff} + G_{n_f n_f}}
= \\frac{\\alpha}{1 + G_{n_f n_f} / G_{ff}} .
$$
The estimator is therefore biased **low** by the reciprocal of the force signal-to-noise ratio, and the error is worst where the force spectrum is smallest — which for an impact test means at the ends of the band, and for a shaker means at the anti-resonances. Meanwhile
$$
H_2 = \\frac{G_{xx}}{G_{x f_m}} = \\frac{\\alpha^{2} G_{ff}}{\\alpha G_{ff}} = \\alpha ,
$$
which is unbiased. $\\checkmark$

*Note.* The same algebra with a noisy accelerometer gives $H_2$ biased low and $H_1$ unbiased, so the pair $\\left( H_1 , H_2 \\right)$ brackets the truth and the **coherence** $\\gamma^{2} = G_{xf}^{2} / \\left( G_{xx} G_{ff} \\right)$ reports how far apart they should be: $1 - \\gamma^{2}$ is, to first order, the fractional noise power. A coherence of $0.9$ sounds excellent and corresponds to a $30$ per cent amplitude error at that frequency, which is why a modal report must show coherence against frequency and not merely assert that it was above a threshold.
:::

::: definition Modal assurance criterion {#def-mac}
For two mode-shape vectors $\\left\\{ A \\right\\}$ and $\\left\\{ B \\right\\}$,
$$
\\operatorname{MAC} = \\frac{\\left| \\left\\{ A \\right\\}^{\\mathrm{H}} \\left\\{ B \\right\\} \\right|^{2}}{\\left( \\left\\{ A \\right\\}^{\\mathrm{H}} \\left\\{ A \\right\\} \\right) \\left( \\left\\{ B \\right\\}^{\\mathrm{H}} \\left\\{ B \\right\\} \\right)}
= \\cos^{2} \\theta ,
$$
the squared cosine of the angle between them in the complex vector space. $\\operatorname{MAC} = 1$ for proportional vectors and $0$ for orthogonal ones. The **off-diagonal** form uses the mass matrix, $\\left\\{ A \\right\\}^{\\mathrm{H}} \\mathbf{M} \\left\\{ B \\right\\}$, and measures the contamination of one mode by another rather than their similarity.
:::

::: definition Modal models and component synthesis {#def-cms}
A **modal model** replaces the physical matrices by the modal ones,
$$
\mathbf{M} \approx \boldsymbol{\Phi}_n \boldsymbol{\Phi}_n^{\mathrm{T}} \mathbf{M} \boldsymbol{\Phi}_n \boldsymbol{\Phi}_n^{\mathrm{T}},
\qquad
\mathbf{K} \approx \boldsymbol{\Phi}_n \operatorname{diag} \left( \omega_r^{2} m_r \right) \boldsymbol{\Phi}_n^{\mathrm{T}} ,
$$
truncated to the $n$ modes that matter, which is legitimate only above the frequency range of interest because a truncated modal model is **stiff** at low frequency: it contains no static flexibility in the discarded modes. The cure is to add **residual flexibility** terms, and the same argument underlies **component mode synthesis**, in which a substructure is represented by its low modes plus a set of static constraint modes — **Guyan** reduction using the interface degrees of freedom alone, or **Craig–Bampton** using the fixed-interface normal modes together with the static constraint modes. A test gives the same object from the other direction: a measured modal model reproduces the frequency response function inside the measured band and nothing at all outside it.
:::

::: proof The MAC is a squared cosine and nothing more {#proof-mac}
Insert an orthonormal basis $\\left\\{ u_i \\right\\}$ and write $\\left\\{ A \\right\\} = \\sum_i a_i \\left\\{ u_i \\right\\}$, $\\left\\{ B \\right\\} = \\sum_i b_i \\left\\{ u_i \\right\\}$. Then
$$
\\operatorname{MAC} = \\frac{\\left| \\sum_i a_i^{*} b_i \\right|^{2}}{\\left( \\sum_i \\left| a_i \\right|^{2} \\right) \\left( \\sum_i \\left| b_i \\right|^{2} \\right)} .
$$
By the Cauchy–Schwarz inequality this lies between $0$ and $1$, with the upper bound attained if and only if $b_i = c a_i$ for some constant $c$, that is, if and only if the vectors are **proportional**. Both numerator and denominator are homogeneous of degree two in each vector, so scaling either vector by any constant leaves the MAC unchanged, and both are invariant to a unitary change of basis, which includes reordering the measurement points and rotating between translational and rotational components at a point. $\\checkmark$

*Note.* The invariances are the point. A test gives mode shapes in microvolts per g scaled by an arbitrary reference, a model gives them in unit maximum displacement, and the two are measured at different points in different orders — the MAC is the only comparison that survives all three. Its one dangerous property is that it is **insensitive to scale errors**: a mode shape that is right in shape and wrong in amplitude scores a perfect one. For that reason a modal report quotes the MAC **and** the generalised phase inversion (a phase-only comparison) **and** the frequency difference, and a mode is accepted only when all three agree.
:::

::: widget plot
f: r => 1/Math.sqrt((1-r*r)*(1-r*r)+0.0016*r*r) + 0.4/Math.sqrt((4-r*r)*(4-r*r)+0.0036*r*r)
x: 0.05, 2.4
y: 0, 26
n: 600
labels: |X/F| (arbitrary)
caption: A synthesized driving-point frequency response function built from two modes with residues of 1 and 0.4 and damping of one and three per cent. The second peak is at twice the first mode's frequency and is much smaller because the second mode has a node close to the drive point — reducing its residue without changing its frequency. A modal survey driven at the wrong point finds a mode that is plainly there in the roving-accelerometer record and entirely absent from the input.
:::

::: example A calibration specimen {#ex-cantilever}
A steel cantilever is $150\ \\mathrm{mm}$ long, $20\ \\mathrm{mm}$ wide and $3\ \\mathrm{mm}$ thick, with $E = 200\ \\mathrm{GPa}$ and $\\rho = 7850\ \\mathrm{kg / m^{3}}$. Predict the first three natural frequencies before the impact test.
::: solution
$$
I = \\frac{b h^{3}}{12} = 4.50 \\times 10^{- 11}\ \\mathrm{m^{4}}, \\quad
EI = 9.00\ \\mathrm{N\, m^{2}}, \\quad
\\mu = \\rho b h = 0.471\ \\mathrm{kg / m},
$$
$$
f_n = \\frac{\\left( \\beta_n L \\right)^{2}}{2 \\pi} \\sqrt{\\frac{EI}{\\mu L^{4}}}, \\qquad
\\beta_n L = 1.875 , 4.694 , 7.855 ,
\\qquad \\sqrt{\\frac{EI}{\\mu L^{4}}} = 194.3\ \\mathrm{s^{- 1}} ,
$$
$$
f_1 = 108.7\ \\mathrm{Hz}, \\qquad f_2 = 681\ \\mathrm{Hz}, \\qquad f_3 = 1908\ \\mathrm{Hz}.
$$
*Check.* Rayleigh's method with the static deflection curve $\\varphi = 1.5 u^{2} - 0.5 u^{3}$ gives
$$
k_{\\text{eq}} = EI \\int_0^L \\left( \\varphi'' \\right)^{2} \\mathrm{d}x = \\frac{3 EI}{L^{3}} = 8000\ \\mathrm{N / m},
\\qquad
m_{\\text{eq}} = 0.2357 \\mu L = 0.01665\ \\mathrm{kg},
$$
$$
f = \\frac{1}{2 \\pi} \\sqrt{\\frac{8000}{0.01665}} = 110.3\ \\mathrm{Hz},
$$
one and a half per cent above the exact value, as Rayleigh's upper-bound theorem requires. $\\checkmark$

*Sanity.* A machined, homogeneous, well-clamped specimen of this size is the closest thing a modal laboratory has to a ruler, and a good test reproduces $f_1$ to within a couple of per cent — provided the clamp is genuinely rigid. A $150\ \\mathrm{mm}$ cantilever in a vice is in truth a cantilever on a rotational spring, and if the vice rotates one microradian per newton-metre the first frequency falls by about ten per cent. This is the reason calibration specimens are tested **free-free** on soft supports, and the reason "the model and the test disagree by eight per cent" is more often a statement about a bolted joint than about a finite-element mesh.
:::
:::

::: example Mass loading to find a node {#ex-mass-loading}
A $20\ \\mathrm{g}$ lump is stuck to the tip of the specimen of Example 1 and the first frequency drops to $74.4\ \\mathrm{Hz}$. Explain, and predict the drop if the same mass is placed at the point of **first zero slope** instead.
::: solution
**Tip.** With the Rayleigh model,
$$
f = \\frac{1}{2 \\pi} \\sqrt{\\frac{8000}{0.01665 + 0.020}} = 74.4\ \\mathrm{Hz},
$$
a drop of thirty-two per cent, in agreement with the measurement.
**At a point of zero slope** the added mass does not move, so it contributes nothing and the frequency is unchanged. The first mode's slope vanishes only at the root, so the practical version of the test is to walk the mass along the specimen and plot the frequency: the curve is a scaled picture of $\\varphi^{2}$, and its minima locate the nodes of the mode.

*Check.* The measured ratio $74.4 / 108.7 = 0.684$ against the predicted $\\sqrt{0.01665 / 0.03665} = 0.674$ — a one and a half per cent difference, attributable to the mass's own rotational inertia and to the Rayleigh shape being approximate. $\\checkmark$

*Sanity.* This crude "chunk of Blu-Tack" survey is the oldest modal technique and still the most robust, because it needs no phase, no reference and no second sensor. It is also the reason **mass loading must be accounted for in every test**: an accelerometer of eight grams on a $3\ \\mathrm{mm}$ steel beam is a $1.7$ per cent mass addition at a point where the mode is largest, and it lowers the measured frequency by about one per cent — more than the uncertainty the analyst is trying to resolve. The correction is $f_{\\text{true}} = f_{\\text{meas}} \\sqrt{1 + m_a \\varphi^2 / m_{\\text{eq}}}$, and applying it is the difference between a modal survey and a frequency survey.
:::
:::

::: example Comparing a model with a test {#ex-mac}
A finite-element model and an impact test give the following three-component mode shapes at three points of a beam:
$$
\\{ A \\} = \\left( 1.00 , 0.62 , - 0.31 \\right), \\qquad
\\{ B \\} = \\left( 0.95 , 0.75 , - 0.20 \\right) .
$$
Compute the MAC and judge the pairing.
::: solution
$$
\\{ A \\}^{\\mathrm{T}} \\{ B \\} = 0.950 + 0.465 + 0.062 = 1.477 ,
$$
$$
\\{ A \\}^{\\mathrm{T}} \\{ A \\} = 1.000 + 0.384 + 0.096 = 1.480 , \\quad
\\{ B \\}^{\\mathrm{T}} \\{ B \\} = 0.903 + 0.563 + 0.040 = 1.505 ,
$$
$$
\\operatorname{MAC} = \\frac{1.477^{2}}{1.480 \\times 1.505} = 0.979 .
$$
*Sanity.* A MAC of $0.98$ is a good pairing and the two are certainly the same mode, but the shape difference is not trivial: the second component differs by twenty-one per cent and the third by a third, which in a correlation plot is a visible twist. A MAC computed from **three** points is also close to meaningless as a quality statement — with three components and three unknowns, almost any pair of vectors scores high. The rule of thumb that a MAC above $0.9$ means "the same mode" and below $0.7$ means "different modes" was established on twenty-point surveys of aerospace panels, and applying it to a three-point survey of a bracket is how a bad model gets signed off.
:::
:::

::: example Diagnosing H1 and H2 {#ex-h1h2}
A shaker test through an isolator gives $H_1$ and $H_2$ that agree to two per cent below $200\ \\mathrm{Hz}$, diverge progressively up to $600\ \\mathrm{Hz}$, and at $600\ \\mathrm{Hz}$ differ by a factor of three with $H_1$ the smaller. What is happening?
::: solution
$H_1$ biased low and $H_2$ unbiased means **force-measurement noise**, and a divergence that grows with frequency means the noise is not white but of a form whose spectrum rises with frequency. The classic cause is a **stinger or a soft stinger rod** whose own resonance is nearby, or, more commonly, an inertial error: the force transducer's own mass accelerates, so the measured force is $F - m_t a$ and the error grows as $\\omega^{2}$.
**Diagnosis.** Compare $1 - \\gamma^{2}$ with the divergence. If the coherence is high and the divergence is large, the two errors are **correlated** — a genuine structural non-linearity or a slipping fixture, not noise. If the coherence falls with the divergence, it is noise, and the culprit is the transducer system.

*Sanity.* The inertial-error mechanism is the reason modal force transducers are made as light as possible and are mounted on the **driven** side, and the reason a test above a few hundred hertz through a soft stinger is treated as qualitative. The reported "resonance" at $600\ \\mathrm{Hz}$ in such a record may be the stinger's own bending mode, and the way to prove it is to change the stinger and see which peak moves: a structural mode stays and a fixture mode follows the fixture.
:::
:::

::: example Operational modal analysis {#ex-oma}
A bridge is instrumented with sixteen accelerometers and no force measurement; only traffic and wind excite it. Explain how the modes are extracted and what the answer does and does not include.
::: solution
The output-only **power spectral density matrix** is
$$
\\left[ G_{xx} (\\omega ) \\right] = \\left[ \\Phi \\right] \\left[ G_{ff} (\\omega ) \\right] \\left[ \\Phi \\right]^{\\mathrm{T}*} ,
$$
and for white, band-limited, uncorrelated excitation $\\left[ G_{ff} \\right]$ is diagonal and constant, so at each frequency a **singular value decomposition** of $\\left[ G_{xx} \\right]$ gives one dominant singular value near each resonance and its singular vector is the mode shape. This is the **frequency-domain decomposition**. Alternatively the correlation functions of the output satisfy the same homogeneous equations as free vibration — the **natural excitation technique** — and a stochastic subspace fit then returns frequencies, damping and modes from a single long record.

**What is missing.** The modes come out **mass-normalised by nothing at all**: an operational mode shape has no scale, because there is no force to divide by. Frequencies and damping are absolute and directly comparable to a model; shapes are comparable only up to a constant, which is exactly what the MAC tolerates and what a **stiffness** update does not.

*Sanity.* Output-only methods were developed for civil structures where no one can weigh a bridge or instrument it with a shaker, and they are now standard for wind turbines, where the excitation is the wind and the structure is inaccessible two hundred metres up. Their one systematic weakness is **environmental variability**: the frequencies of a bridge move by several per cent with temperature, and a damage-detection algorithm that looks for frequency drops is therefore looking for a signal that the weather produces more reliably than a crack does. Serious structural health monitoring tracks **mode shapes** or temperature-compensated frequencies, and reports a probability rather than an alarm.
:::
:::

::: example Design {#ex-design-test}
Plan the modal survey of a $12\ \\mathrm{kg}$ instrument bracket bolted to a shaker head, whose first five computed modes lie between $180$ and $900\ \\mathrm{Hz}$.
::: solution
**Band.** Measure to at least $1.2$ times the highest mode of interest, so $1.1\ \\mathrm{kHz}$, and use a frequency resolution of at most half the half-power bandwidth: with $\\zeta = 0.01$ at $900\ \\mathrm{Hz}$ the half-power bandwidth is $18\ \\mathrm{Hz}$, so $\\Delta f \\le 9\ \\mathrm{Hz}$, and $1.6\ \\mathrm{Hz}$ is comfortable.
**Excitation.** A modal hammer for a $12\ \\mathrm{kg}$ bracket gives too little input at $180\ \\mathrm{Hz}$; use a small exciter through a **soft** stinger, with the bracket on its own isolators so the shaker's grounded armature does not become part of the structure.
**Points.** Twenty-four points in three orthogonal directions on the faces where the modes have strain, avoiding the nodal lines of the computed modes — a point on a node measures the mode's **negative** and can invert a shape.
**Reference.** A triaxial accelerometer left on the bracket throughout, moved to a second location for a repeat run to check the MAC.
**Mass loading.** A $2\ \\mathrm{g}$ accelerometer on a $12\ \\mathrm{kg}$ bracket is negligible; a $20\ \\mathrm{g}$ cable clamp on a thin face is not.

*Design comment.* The single decision that decides the quality of the result is the **reference sensor location**, and the standard error is putting it at the point of maximum response, where the fixture's own local mode dominates the reference channel and every measured shape inherits its phase. The correct choice is a point that is well away from local modes and has good coupling in all three directions, chosen from the computed mode shapes rather than from convenience. The second decision is whether the bracket is tested **as assembled** — with its cabling, its cover and its torque — and if the answer is no, the test measures a structure that will never be seen in service, which is the commonest way a modal survey fails to be useful.
:::
:::

::: history
Quantitative modal testing begins with the **transfer-impedance** measuring sets of the 1950s, in which an electrodynamic shaker, a phase meter and a chart recorder produced one point of one curve per afternoon; **Kennedy and Panofsky**'s 1956 text and the Sandia and NACA reports of the same decade set the method. The **impact** or **hit** test was invented around 1968 at General Dynamics by **Cunningham** and independently reported by **Williams, Newton and Kaiser** and by **Newland and Wallace**, and it made modal testing a field technique instead of a laboratory one. The **Oregon Co-ordinated Experimental Program** of 1969–1974, in which twenty-four laboratories measured the same ten-bay welded spaceframe and compared results, remains the most instructive experiment ever run in the discipline: the scatter in the reported frequencies was larger than most analysis-to-test differences reported elsewhere, and it is the reason a serious modal report quotes uncertainties. The **fast Fourier analyser** arrived commercially at the end of the 1960s and made the $H_1$, $H_2$ estimator pair practical; **Heywood**, **Soize** and above all **Ewins**, whose *Modal Testing* of 1984 educated two generations, put the estimators on their modern footing. The **modal assurance criterion** appeared in the late 1970s in work of **Sturm** and of **Abernethy and Brennan**. **Guyan**'s static reduction of 1965 and **Craig and Chang-Bampton**'s of 1968 made component mode synthesis possible, model updating followed the sensitivity work of the 1980s, and output-only identification — the **natural excitation technique** of the 1990s and **Brincker's** frequency-domain decomposition of 2000 — turned the whole method inside out by dispensing with the force measurement altogether.
:::

::: quiz
A measured mode and the corresponding computed mode have a modal assurance criterion of $0.62$. The most likely explanation is:
- [ ] A scaling error, because the two mode shapes are in different units
- [x] A genuinely different shape, since the MAC is scale-invariant and $0.62$ corresponds to an angle of about $51^{\\circ}$
- [ ] A frequency error, because the MAC depends on the frequency
- [ ] A damping error, because the MAC is measured at resonance
::: solution
The MAC is invariant to scaling, to units and to the order of the measurement points, so a value of $0.62$ cannot be a scaling artefact; it is $\cos^2\theta$, so the vectors differ by $\theta = \arccos\sqrt{0.62} = 51^{\circ}$ in shape space. Either the pairing is wrong — the mode has been matched to the wrong computed mode, which is common when two computed modes are close together — or the model is missing something structural. The first thing to check is the **pairing** by looking at the full MAC matrix rather than the diagonal, because a mode-pair swap gives exactly this number and is far more common than a fifty-degree shape error.
:::
:::

## Where this leads

The receptances that a modal test measures are those of [[vibrations/two-degrees-of-freedom]] and [[vibrations/harmonic-excitation]], the random spectra that the estimators average are those of [[vibrations/general-excitation]], the continuous modes that the discrete survey approximates are in [[vibrations/continuous-systems]], and the absorbers and mounts whose antiresonances confuse a survey are in [[vibrations/vibration-absorbers]] and [[vibrations/isolation-transmissibility]].

::: summary
- A frequency response function is measured, not computed, and the estimator pair $H_1$, $H_2$ brackets the truth: their divergence locates the noise and the coherence quantifies it.
- Modes are the poles of the frequency response function; extraction algorithms differ in which assumptions they make about the modes between the measured points.
- Mode shapes are compared with the modal assurance criterion, a squared cosine invariant to scaling and basis, which must be paired with a phase criterion and a frequency difference.
- Every measurement loads the structure: an accelerometer is an added mass and a fixture is an added stiffness, and both must be accounted for before a model is updated.
- Output-only methods recover frequencies, damping and unscaled shapes from ambient response alone, at the price of losing the force reference that gives a mode its size.
- A modal survey is planned from the computed mode shapes: reference location, measurement points and excitation point are chosen to avoid nodes and local fixture modes, not for convenience.
:::

## Exercises

::: exercise Coherence {level=1 check="0.9"}
A frequency response function is measured with a coherence of $0.90$. What is $1 - \\gamma^{2}$?
::: solution
$0.10$.
:::
:::

::: exercise MAC {level=1 check="1"}
What is the modal assurance criterion between a mode shape and itself multiplied by $3.7$?
::: solution
$1$, because the MAC is invariant to scaling.
:::
:::

::: exercise Estimators {level=1 check="0.9"}
The force channel of a test has a signal-to-noise power ratio of $9$. By what factor is $H_1$ biased low?
::: solution
$1 / \left( 1 + 1 / 9 \right) = 0.90$.
:::
:::

::: exercise Nodes {level=1 check="0"}
What is the residue of a mode at a point lying exactly on one of its nodal lines?
::: solution
Zero — the mode is not excited and not observed there.
:::
:::

::: exercise Beam frequencies {level=2}
For the specimen of Example 1, find the first frequency of the same beam used as a **simply supported** span.
::: solution
$$
\\beta_1 L = \\pi, \\qquad
f_1 = \\frac{\\pi^{2}}{2 \\pi} \\times 194.3 = \\frac{\\pi}{2} \\times 194.3 = 305\ \\mathrm{Hz}.
$$
*Sanity.* The simply supported frequency is $2.8$ times the cantilever frequency, because the cantilever's mode reaches full amplitude at a free end while the supported mode is held at zero slope and displacement at both ends. The ratio $\\left( \\pi / 1.875 \\right)^{2} = 2.80$ is a useful check on a free-free or simply supported test, and the large difference is why a structure's **boundary conditions** — not its mesh density — are the dominant source of model-to-test disagreement.
:::
:::

::: exercise Mass loading {level=2}
A $5\ \\mathrm{g}$ accelerometer is placed at the tip of the specimen of Example 1. Estimate the measured first frequency.
::: solution
$$
f = \\frac{1}{2 \\pi} \\sqrt{\\frac{8000}{0.01665 + 0.005}} = 96.7\ \\mathrm{Hz},
$$
against a true $108.7\ \\mathrm{Hz}$, an eleven per cent error.
*Sanity.* Eleven per cent is far more than the uncertainty of a good finite-element model, which means that on a light structure the **measurement defines the structure** and the analyst must either correct for the sensor, distribute the sensors along a nodal line, or use a scanning laser vibrometer that adds nothing at all. This is why the modal survey of a small flexible structure is now usually done optically, and why the correction $f_{\\text{true}} = f_{\\text{meas}} \\sqrt{1 + m_a \\varphi^{2} / m_{\\text{eq}}}$ belongs on the front page of every test procedure for light structures.
:::
:::

::: exercise Off-diagonal MAC {level=2}
Two measured modes give $\\{ A \\}^{\\mathrm{T}} \\mathbf{M} \\{ B \\} = 0.12\ \\mathrm{kg}$ with $\\{ A \\}^{\\mathrm{T}} \\mathbf{M} \\{ A \\} = 2.0\ \\mathrm{kg}$ and $\\{ B \\}^{\\mathrm{T}} \\mathbf{M} \\{ B \\} = 2.4\ \\mathrm{kg}$. Find the off-diagonal MAC and comment.
::: solution
$$
\\operatorname{MAC}_{\\text{off}} = \\frac{0.12^{2}}{2.0 \\times 2.4} = 0.003 = 0.3\ \\% .
$$
*Sanity.* Under one per cent of mutual contamination means the two measured modes are as close to mass-orthogonal as the measurement can show, which is the strongest available evidence that the extraction has separated them properly. A large off-diagonal value is the signature of a **mixed** pair, which happens when two modes are close together and the algorithm has split a single physical pair into two arbitrary linear combinations of themselves. In that case the individual shapes are not physical at all, only the **subspace** they span is, and the correct report says so rather than quoting two mode shapes and two MACs.
:::
:::

::: exercise Frequency resolution {level=2}
A mode at $500\ \\mathrm{Hz}$ has three per cent damping. What frequency resolution and what record length does a Fourier analysis need, and what goes wrong if the resolution is too coarse?
::: solution
$$
\\Delta f_{1 / 2} = \\zeta f_n = 15\ \\mathrm{Hz}, \\qquad
\\Delta f \\le \\frac{1}{2} \\Delta f_{1 / 2} = 7.5\ \\mathrm{Hz},
\\qquad
T = \\frac{1}{\\Delta f} \\ge 0.13\ \\mathrm{s}.
$$
*Sanity.* The requirement is not merely that a peak be visible but that **several** spectral lines sit on each side of it, because a peak-picking algorithm fits a curve to the points around the maximum and a mode sampled with two points across its peak gives a frequency uncertain by a whole line spacing. For lightly damped structures the record length becomes the limiting factor — one per cent damping at $100\ \\mathrm{Hz}$ needs a record of half a second and a **rectangular** window that does not smear the peak — and this is the reason a hammer test on a lightly damped structure must use an exponential window and a long record, and why the reported damping from a hammer test is nearly always too high.
:::
:::

::: exercise Model updating {level=3}
A model predicts $f_1 = 118\ \\mathrm{Hz}$ and the test gives $108.7\ \\mathrm{Hz}$; the mode shape is dominated by **root rotation** rather than by beam bending. Estimate the rotational stiffness of the clamp that explains the difference.
::: solution
Treat the beam as a single degree of freedom with a rotational spring $K_\\theta$ at the root. The frequency ratio gives
$$
\\left( \\frac{108.7}{118} \\right)^{2} = 0.848
$$
as the ratio of the effective stiffnesses. Writing the cantilever's own tip rotational compliance as $\\theta / M = L / EI$ and adding the clamp's $1 / K_\\theta$,
$$
\\frac{k_{\\text{clamped}}}{k_{\\text{rigid}}} = \\frac{1}{1 + EI / \\left( K_\\theta L \\right)} = 0.848
\\quad\\Longrightarrow\\quad
K_\\theta = \\frac{EI}{L} \\times \\frac{0.848}{1 - 0.848} = 60 \\times 5.6 = 340\ \\mathrm{N\, m / rad} .
$$
*Sanity.* A clamp rotational stiffness of $340\ \\mathrm{N\, m / rad}$ is a moderately tight bolted joint, not a rigid built-in condition, and it is entirely typical of a specimen in a vice. The lesson generalises into the standard advice on **model updating**: update the parameters you can point at. A single frequency tells you nothing about which stiffness is wrong; a frequency **and** a shape tell you which deformation the error is in, and updating the joint that resists that deformation is a defensible model change, whereas scaling every element's modulus by a single factor to match the frequencies is curve-fitting that will not survive a change of design.
:::
:::

::: exercise Derivation {level=3}
Show that for a proportionally damped system the frequency response function measured between coordinates $i$ and $j$ can be written as a sum of single-degree-of-freedom terms, and identify what a modal test measures and what it cannot measure.
::: solution
From the modal expansion,
$$
\\alpha_{ij} (\\omega ) = \\sum_{r = 1}^{n} \\frac{\\phi_r (i ) \\phi_r (j )}{k_r - \\omega^{2} m_r + \\mathrm{i} \\omega c_r}
= \\sum_r \\frac{\\phi_r (i ) \\phi_r (j ) / m_r}{\\omega_r^{2} - \\omega^{2} + 2 \\mathrm{i} \\zeta_r \\omega_r \\omega} .
$$
A test measures the **residues** $\\phi_r (i ) \\phi_r (j ) / m_r$, the **poles** $\\omega_r$, $\\zeta_r$, and nothing else. The mode scale $\\phi_r$ is therefore recoverable only as a **product** of two points' components, and the absolute scale requires one known quantity — a known mass, a known static stiffness, or a measured **effective modal mass**.
*Sanity.* This is exactly why an operational modal analysis, which has no force measurement and hence no residue at all, returns shapes of arbitrary scale, and why a modal test that must feed a **load** analysis needs at least one absolute measurement: a shaker with a force gauge, a known eccentric mass, or a static pushover. It is also why the phrase "the mode shape was normalised to unit maximum" appears in every modal report — the normalisation is a convention imposed on data that contains no scale, and a model updated against such a shape must be re-normalised the same way before the comparison means anything.
:::
:::
