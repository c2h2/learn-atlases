A system with two degrees of freedom has two natural frequencies and two mode shapes, and the mode shapes are the whole subject. A single-degree-of-freedom model answers "what is the resonance?"; a multi-degree-of-freedom model answers "what moves when the resonance is excited, and what does the exciter see?" — which is the question that decides whether a mount, a shaker setting or a sensor location is any good at all.

Three results carry the subject. Mode shapes of an undamped conservative system are **orthogonal** with respect to both the mass and stiffness matrices, which means the equations can be rotated into **modal coordinates** that do not talk to each other, so a general forced problem becomes a set of independent single-degree-of-freedom problems. Each mode contributes a term to the frequency response, so the response is a **sum of resonances**. And between any two resonances the response passes through a **zero**, an antiresonance, at which the driven point does not move at all however hard it is pushed.

::: warning A mode shape is not a deflection you can observe directly
A measured operating deflection shape at one frequency is a **mixture** of modes, and reading it as a mode shape is the commonest error in experimental modal work. Only at a resonance, and only when the modes are well separated, does the operating shape approach the mode shape. Conversely a mode shape is defined only to within a multiplying constant — its **normalisation** is a convention, not a physical fact — so comparing a computed mode with a measured one means comparing **shapes**, usually by a correlation number, and never comparing amplitudes.
:::

::: quiz
The driving-point receptance of a three-degree-of-freedom proportionally damped system has resonances at 40, 90 and 150 Hz. Between 40 and 90 Hz there is:
- [ ] Another resonance, because modes come in pairs
- [x] Exactly one antiresonance, at which the driven point does not move
- [ ] A frequency band over which the response is in phase with the static deflection and nothing else changes
- [ ] Nothing special, because only the resonances matter
::: solution
There are $n - 1 = 2$ antiresonances in a three-degree-of-freedom driving-point receptance, one between each pair of resonances. At an antiresonance the driven coordinate is **stationary** while the rest of the structure moves, because the reaction forces from the other masses exactly balance the applied force there. This is why a modal survey driven from a single point can miss a mode entirely — drive at that mode's antiresonance and its residue is zero — and why the standard practice is to drive from at least two widely separated points, or to use a shaker with a stinger into a point chosen by a preliminary global positioning of the accelerometers.
:::
:::

::: quiz
The driving-point receptance of a three-degree-of-freedom proportionally damped system has resonances at 40, 90 and 150 Hz. Between 40 and 90 Hz there is:
- [ ] Another resonance, because modes come in pairs
- [x] Exactly one antiresonance, at which the driven point does not move
- [ ] A frequency band over which the response is in phase with the static deflection and nothing else changes
- [ ] Nothing special, because only the resonances matter
::: solution
There are $n - 1 = 2$ antiresonances in a three-degree-of-freedom driving-point receptance, one between each pair of resonances. At an antiresonance the driven coordinate is **stationary** while the rest of the structure moves, because the reaction forces from the other masses exactly balance the applied force there. This is why a modal survey driven from a single point can miss a mode entirely — drive at that mode's antiresonance and its residue is zero — and why the standard practice is to drive from at least two widely separated points, or to use a shaker with a stinger into a point chosen by a preliminary global positioning of the accelerometers.
:::
:::

## Two degrees of freedom

::: definition Equations of motion and the eigenproblem {#def-eigenproblem}
For masses $\mathbf{x}$, mass matrix $\mathbf{M}$ and stiffness matrix $\mathbf{K}$,
$$
\mathbf{M} \ddot{\mathbf{x}} + \mathbf{K} \mathbf{x} = \mathbf{F} (t) .
$$
Free harmonic motion $\mathbf{x} = \boldsymbol{\phi} \cos \omega t$ gives the generalised eigenproblem
$$
\left( \mathbf{K} - \omega^{2} \mathbf{M} \right) \boldsymbol{\phi} = \mathbf{0},
$$
solvable only for the $n$ values of $\omega^{2}$ that make $\det \left( \mathbf{K} - \omega^{2} \mathbf{M} \right)$ vanish. For $n = 2$ the characteristic equation is a quadratic in $\omega^{2}$, and its two roots are the natural frequencies; each gives a one-dimensional null space, the **mode shape** $\boldsymbol{\phi}_r$, defined only up to a constant.
:::

::: definition Modal parameters {#def-modal-parameters}
Rotating into modal coordinates gives each mode $r$ three numbers that summarise it for the engineer:
$$
m_r = \boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi}_r, \qquad
k_r = \omega_r^{2} m_r, \qquad
Q_r (t ) = \boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{F} (t ) ,
$$
the **modal mass**, **modal stiffness** and **modal force**, together with two derived quantities that are independent of how the mode shape was scaled:
$$
\Gamma_r = \frac{\boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{M} \boldsymbol{\iota}}{m_r}
\qquad \text{and} \qquad
M_r^{*} = \frac{\left( \boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{M} \boldsymbol{\iota} \right)^{2}}{m_r} .
$$
Here $\boldsymbol{\iota}$ is the unit vector and $\Gamma_r$, $M_r^{*}$ are the **participation factor** and the **effective modal mass** for base excitation. The effective modal masses sum to the total mass, so they say directly what fraction of the structure each mode moves; a mode whose effective mass is one per cent of the total can usually be discarded for displacements but not for accelerations, which weight it by $\omega_r^{2}$.
:::

::: proof Orthogonality of mode shapes {#proof-orthogonality}
Let $\left( \omega_r, \boldsymbol{\phi}_r \right)$ and $\left( \omega_s, \boldsymbol{\phi}_s \right)$ be two distinct solutions of $\mathbf{K} \boldsymbol{\phi} = \omega^{2} \mathbf{M} \boldsymbol{\phi}$. Then
$$
\boldsymbol{\phi}_s^{\mathrm{T}} \mathbf{K} \boldsymbol{\phi}_r = \omega_r^{2} \, \boldsymbol{\phi}_s^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi}_r,
\qquad
\boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{K} \boldsymbol{\phi}_s = \omega_s^{2} \, \boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi}_s .
$$
Both $\mathbf{K}$ and $\mathbf{M}$ are symmetric, so the left-hand sides are equal and the second right-hand side equals $\omega_s^{2} \boldsymbol{\phi}_s^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi}_r$. Subtracting,
$$
\left( \omega_r^{2} - \omega_s^{2} \right) \boldsymbol{\phi}_s^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi}_r = 0
\quad\Longrightarrow\quad
\boldsymbol{\phi}_s^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi}_r = 0 \quad \text{for } r \ne s .
$$
Substituting back gives $\boldsymbol{\phi}_s^{\mathrm{T}} \mathbf{K} \boldsymbol{\phi}_r = \omega_r^{2} \boldsymbol{\phi}_s^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi}_r = 0$, so the modes are orthogonal with respect to **both** matrices, and
$$
\boldsymbol{\Phi}^{\mathrm{T}} \mathbf{M} \boldsymbol{\Phi} = \operatorname{diag} \left( m_r \right),
\qquad
\boldsymbol{\Phi}^{\mathrm{T}} \mathbf{K} \boldsymbol{\Phi} = \operatorname{diag} \left( \omega_r^{2} m_r \right) = \operatorname{diag} \left( k_r \right) ,
$$
defining the **modal mass** $m_r$ and **modal stiffness** $k_r$ of each mode. $\checkmark$

*Note.* The modal masses are not equal and their sum is the total mass only when the mode shapes are normalised to the **mass** convention; the more useful normalisation for dynamics is to set $m_r = 1$, and the more useful for interpreting a model is to set the largest component of each mode to unity. Which convention a package uses is worth knowing before comparing two models.
:::

::: theorem Modal expansion and the receptance {#thm-modal-expansion}
Writing $\mathbf{x} = \boldsymbol{\Phi} \mathbf{q}$ and using orthogonality, the equations of motion separate into $n$ independent scalar equations
$$
m_r \ddot{q}_r + c_r \dot{q}_r + k_r q_r = Q_r (t) = \boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{F} (t) ,
$$
provided the damping is also diagonalised, which **proportional damping** $\mathbf{C} = \alpha \mathbf{M} + \beta \mathbf{K}$ guarantees. The frequency response between coordinates $i$ and $j$ — the **receptance** — is then a sum over the modes,
$$
\alpha_{ij} (\omega) = \frac{X_i}{F_j} = \sum_r \frac{\phi_r (i ) \phi_r (j )}{k_r - \omega^{2} m_r} .
$$
:::

::: proof The sum of modes and the existence of antiresonances {#proof-receptance}
With $\mathbf{x} = \boldsymbol{\Phi} \mathbf{q}$, premultiplying $\mathbf{M} \ddot{\mathbf{x}} + \mathbf{K} \mathbf{x} = \mathbf{F}$ by $\boldsymbol{\Phi}^{\mathrm{T}}$ and using orthogonality gives $m_r \ddot{q}_r + k_r q_r = \boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{F}$, whose harmonic solution is $q_r = \boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{F} / \left( k_r - \omega^{2} m_r \right)$. Recovering $\mathbf{x} = \sum_r \boldsymbol{\phi}_r q_r$ and reading off the $i$-th component for a unit force at $j$,
$$
\alpha_{ij} (\omega ) = \sum_r \frac{\phi_r (i ) \phi_r (j )}{k_r - \omega^{2} m_r} .
$$
This is a sum of $n$ terms each with a pole at a natural frequency, so the response has $n$ resonances. Between consecutive poles each term changes sign once, and since the sum tends to $\sum_r \phi_r (i ) \phi_r (j ) / k_r = \alpha_{ij} (0 )$ at zero frequency and to zero as $\omega$ tends to infinity, the numerator — a polynomial of degree $n - 1$ in $\omega^{2}$ — has $n - 1$ real roots. **There is therefore an antiresonance between every pair of resonances** in a proportionally damped system. $\checkmark$

*Note.* The antiresonance is the reason a vibration absorber works, the reason a shaker sometimes cannot excite a structure at a frequency where the structure is plainly moving, and the reason a modal survey must be driven from several points: drive at an antiresonance and the mode is invisible, no matter how sensitive the instrument.
:::

::: example Two masses and three springs {#ex-two-mass}
Two masses of $2\ \mathrm{kg}$ each are joined by a spring of $800\ \mathrm{N / m}$, and each is joined to a wall by an identical spring. Find the natural frequencies and mode shapes.
::: solution
$$
\mathbf{M} = 2 \mathbf{I}, \qquad
\mathbf{K} = 800 \begin{pmatrix} 2 & - 1 \\ - 1 & 2 \end{pmatrix} ,
\qquad
\det \left( \mathbf{K} - \omega^{2} \mathbf{M} \right) = 0 .
$$
Expanding, $\left( 1600 - 2 \omega^{2} \right)^{2} - \left( 800 \right)^{2} \times 1 = 0$ reduces to
$$
\omega^{4} - 1600 \omega^{2} + 480\,000 = 0
\quad\Longrightarrow\quad
\omega^{2} = 400 , 1200 ,
$$
$$
\omega_1 = 20\ \mathrm{rad / s} \left( 3.18\ \mathrm{Hz} \right), \quad
\omega_2 = 34.64\ \mathrm{rad / s} \left( 5.51\ \mathrm{Hz} \right),
\qquad
\boldsymbol{\phi}_1 = \begin{pmatrix} 1 \ 1 \end{pmatrix}, \quad
\boldsymbol{\phi}_2 = \begin{pmatrix} 1 \ - 1 \end{pmatrix} .
$$
*Check.* $\omega_1^{2} = k / m$ and $\omega_2^{2} = 3 k / m$ for this symmetric system, and $3 \times 800 / 2 = 1200$ $\checkmark$

*Sanity.* The two modes are the **in-phase** and **out-of-phase** motions, and the out-of-phase one is $\sqrt{3}$ times as stiff because the middle spring is stretched as well as the two outer ones. This is the whole of the "two identical systems coupled" story: coupling splits a single frequency into a **doublet** whose separation measures the coupling strength, and a measured doublet is how a modal engineer finds a loose bolt, a cracked flange or an unintended contact — the two halves of a structure that were designed to move together are found to move at slightly different frequencies, and the split tells you how weak the connection has become.
:::
:::

::: example Beats and energy transfer {#ex-beats}
For the system of Example 1, mass 1 is displaced $10\ \mathrm{mm}$, mass 2 is left at rest, and both are released. Find the time at which mass 1 first comes to rest and describe what happens to the energy.
::: solution
Superposing the modes with $x_1 (0 ) = d$, $x_2 (0 ) = 0$,
$$
x_1 = \frac{d}{2} \left( \cos \omega_1 t + \cos \omega_2 t \right)
     = d \cos \bar{\omega} t \cos \frac{\Delta \omega}{2} t,
\qquad
x_2 = \frac{d}{2} \left( \cos \omega_1 t - \cos \omega_2 t \right)
     = d \sin \bar{\omega} t \sin \frac{\Delta \omega}{2} t,
$$
with $\bar{\omega} = 27.32$ and $\Delta \omega = 14.64\ \mathrm{rad / s}$. The envelope of mass 1 vanishes when $\left( \Delta \omega / 2 \right) t = \pi / 2$,
$$
t = \frac{\pi}{\Delta \omega} = \frac{\pi}{14.64} = 0.215\ \mathrm{s}.
$$
At that instant mass 2 carries the whole motion and mass 1 is exactly still.

*Check.* At $t = 0.215\ \mathrm{s}$, $\cos \left( 7.32 t \right) = 0$ and $\sin \left( 7.32 t \right) = 1$, so $\left| x_2 \right| = d$ and $x_1 = 0$ exactly. $\checkmark$

*Sanity.* Energy migrates from one mass to the other and back with a period of $0.43\ \mathrm{s}$, and this is the mechanism behind every **beating** signature in a vibration spectrum: two closely spaced peaks that a technician reports as "the bearing is failing" are often two modes of a lightly coupled structure exchanging energy. It is also the operating principle of the **vibrational energy sink** — a light attachment tuned near the host's frequency, which does not isolate the host but **drains** energy out of it over a fraction of a second, and which works whether or not the host is being forced at that frequency, unlike a classical absorber.
:::
:::

::: example Antiresonance {#ex-antiresonance}
A $100\ \mathrm{kg}$ machine on a $10\ \mathrm{MN / m}$ support carries a $10\ \mathrm{kg}$ bracket attached by a $1\ \mathrm{MN / m}$ bolted joint. Find the frequencies at which the machine resonates and the frequency at which it does not move at all when a force is applied to it.
::: solution
$$
\mathbf{K} = \begin{pmatrix} 11 \times 10^{6} & - 10^{6} \\ - 10^{6} & 10^{6} \end{pmatrix},
\qquad
\mathbf{M} = \begin{pmatrix} 100 & 0 \\ 0 & 10 \end{pmatrix} .
$$
**Resonances.** Solving gives $43.0\ \mathrm{Hz}$ and $58.9\ \mathrm{Hz}$.
**Antiresonance.** The machine alone has $\sqrt{k_1 / m_1} / 2 \pi = 50.3\ \mathrm{Hz}$, and the bracket alone $\sqrt{k_2 / m_2} / 2 \pi = 50.3\ \mathrm{Hz}$; the antiresonance of the driven point is at exactly that frequency.
**Response to $1\ \mathrm{kN}$:**

- at $43.0\ \mathrm{Hz}$: $0.376\ \mathrm{mm}$ on the machine, $1.02\ \mathrm{mm}$ on the bracket
- at $50.3\ \mathrm{Hz}$: $0.000\ \mathrm{mm}$ on the machine, $1.00\ \mathrm{mm}$ on the bracket
- at $58.9\ \mathrm{Hz}$: $0.376\ \mathrm{mm}$ on the machine, $- 1.02\ \mathrm{mm}$ on the bracket
- static: $0.100\ \mathrm{mm}$

*Sanity.* The machine is held still at $50.3\ \mathrm{Hz}$ by the bracket, which is at that frequency oscillating with an amplitude that makes the force it delivers through the joint exactly cancel the applied force. This is a **tuned vibration absorber**, arrived at by accident: any light appendage whose natural frequency coincides with a machine's running speed will protect it, and the same fact is a trap for the test engineer, because a structure driven at one of its own antiresonances appears to be rigidly stiff and the mode that is plainly there in the accelerometer record never appears in the hammer input.
:::
:::

::: example Three-storey frame {#ex-shear-frame}
A three-storey building model has identical floor masses $m$ and identical storey stiffnesses $k$. Find the three natural frequencies, the mode shapes, and how much of the total mass each mode carries.
::: solution
$$
\frac{\omega_p}{\omega_0} = 2 \sin \frac{\left( 2 p - 1 \right) \pi}{14}, \qquad
\phi_p (j ) = \sin \frac{p j \pi}{7}, \qquad \omega_0 = \sqrt{k / m},
$$
giving, normalised to a unit top-floor displacement,

- mode 1: $0.445 \omega_0$, shape $\left( 0.445 , 0.802 , 1.000 \right)$
- mode 2: $1.247 \omega_0$, shape $\left( - 1.247 , - 0.555 , 1.000 \right)$
- mode 3: $1.802 \omega_0$, shape $\left( 1.802 , - 2.247 , 1.000 \right)$

**Effective modal mass** $\left( \boldsymbol{\phi}^{\mathrm{T}} \mathbf{M} \boldsymbol{\iota} \right)^{2} / \left( \boldsymbol{\phi}^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi} \right)$, which is independent of the normalisation: $2.742\ m$, $0.225\ m$ and $0.033\ m$, that is $91.4$, $7.5$ and $1.1$ per cent of the total mass.

*Check.* The modal masses sum to $3.0\ m$, the total mass of the system, as they must. $\checkmark$

*Sanity.* The first mode carries ninety-one per cent of the mass and the other two together carry less than nine, which is the quantitative statement of the engineer's habit of treating a building as a single-degree-of-freedom oscillator. It is also the reason a **base-shear** calculation works, and the reason it fails for a slender chimney, a long bridge or a tall flexible tower, where the second mode's seven and a half per cent can dominate the response because the ground motion contains far more energy at the second mode's frequency than at the first.
:::
:::

::: example Modal damping {#ex-modal-damping}
A shaker test on a bracket gives damping ratios of $1.2$ per cent at the first mode and $3.8$ per cent at the third. A service excitation at $200\ \mathrm{Hz}$ falls between the modes. Estimate the response and say what the modal-damping assumption is doing.
::: solution
The damping matrix is not proportional, so the modes are not exactly orthogonal to it and the equations do not decouple. Writing $\mathbf{C} = \alpha \mathbf{M} + \beta \mathbf{K}$ and fitting the two measured values,
$$
\zeta_r = \frac{\alpha}{2 \omega_r} + \frac{\beta \omega_r}{2}, \qquad
\begin{cases} 0.012 = \alpha / \left( 2 \omega_1 \right) + \beta \omega_1 / 2 \ 0.038 = \alpha / \left( 2 \omega_3 \right) + \beta \omega_3 / 2 \end{cases}
$$
with $\omega_1 = 2 \pi \times 60$ and $\omega_3 = 2 \pi \times 240$ gives
$$
\alpha = 2.01\ \mathrm{s^{- 1}}, \qquad \beta = 4.95 \times 10^{- 5}\ \mathrm{s},
\qquad
\zeta (200\ \mathrm{Hz} ) = 0.032 .
$$
*Sanity.* Between the two fitted modes the parabola in $\omega$ interpolates harmlessly, and its minimum sits at $\sqrt{\alpha / \beta} / 2 \pi = 32\ \mathrm{Hz}$, below the range of interest. **Outside** the range it is a different matter: the same fit predicts $\zeta = 0.094$ at $600\ \mathrm{Hz}$, nearly three times the highest measured value, and $\zeta = 0.011$ at $20\ \mathrm{Hz}$. A Rayleigh fit is therefore an interpolation formula and not a material property, and an analyst who needs a conservative answer at a frequency outside the tested range must extend the test rather than trust the curve — a rule that has voided more than one set of flight-test vibration analysis. The deeper point is that measured damping is a property of the **mode**, not of the material, and a structure whose damping varies by a factor of three between its first and third modes is not badly behaved — it is behaving exactly as any real built-up structure does, because the damping is in the joints.
:::
:::

::: example Design {#ex-design-panel}
An instrument panel of mass $6\ \mathrm{kg}$ is bolted to an aircraft skin. The skin has a resonance at $180\ \mathrm{Hz}$ with an effective modal mass of $40\ \mathrm{kg}$ and the panel must not amplify anything below $300\ \mathrm{Hz}$. Find the required panel-mounting stiffness, and check whether the panel spoils the skin's resonance.
::: solution
**Panel frequency.** Treating the skin as grounded for the panel's own mode,
$$
f_{\text{panel}} = \frac{1}{2 \pi} \sqrt{\frac{k}{6}} > 300
\quad\Longrightarrow\quad
k > 6 \times \left( 2 \pi \times 300 \right)^{2} = 2.13 \times 10^{7}\ \mathrm{N / m}.
$$
**Coupling to the skin.** With $\mu = m_p / m_s = 0.15$ and $\rho = f_p / f_s = 1.667$, the two coupled frequencies satisfy
$$
x^{2} - \left[ 1 + \rho^{2} \left( 1 + \mu \right) \right] x + \rho^{2} = 0,
\qquad x = \left( f / f_s \right)^{2},
$$
giving $x = 3.370$ and $0.824$, so
$$
f = 1.836 f_s \text{ and } 0.908 f_s = 330\ \mathrm{Hz} \text{ and } 163\ \mathrm{Hz} .
$$
The skin's resonance falls from $180$ to $163\ \mathrm{Hz}$ and a second peak appears at $330\ \mathrm{Hz}$.

*Design comment.* A stiff, light, well-supported panel is nearly transparent to the skin's dynamics, and the shift of seven per cent is within the scatter of a built-up structure. What is **not** acceptable is the usual shortcut of bolting a heavy panel to a light skin and analysing them separately: if the panel were $40\ \mathrm{kg}$ rather than $6\ \mathrm{kg}$ the mass ratio would be unity and the two coupled frequencies would be $0.675$ and $2.47$ times the original, so the skin's resonance would fall from $180$ to $122\ \mathrm{Hz}$ and land squarely on an excitation that had been avoided. The rule of thumb is that a secondary structure may not exceed about a tenth of the **modal** mass of the primary structure at the point of attachment, and this is why avionics boxes are mounted to frames rather than to panels.
:::
:::

::: widget plot
f: 1/(1+abs((0.1 - x*x)/((1.1 - x*x)*(0.1 - x*x) - 0.01)))
x: 0.05, 2.5
y: 0, 1
labels: 1/(1+|X1|/static)
caption: "Driving-point response of a two-degree-of-freedom system: a primary oscillator with a light attachment of mass ratio 0.10 tuned to it. The plot shows 1/(1+|X1|) so that the two resonances appear as minima and the antiresonance as the maximum of unity. The single resonance of the primary splits into a doublet, and between the two peaks the primary mass is held exactly still at its own natural frequency by the reaction of the attachment."
:::

::: history
The **normal modes** of a coupled system were found by Daniel Bernoulli in 1753 for strings, put on a general algebraic footing by **Lagrange** in the *Mécanique analytique* of 1788, and stated in the form used here — the eigenproblem of two symmetric matrices — by **Euler**, **Cauchy** and, for continuous systems, **Rayleigh**, whose *Theory of Sound* of 1877 contains the energy methods, the orthogonality argument and the perturbation formulae that every vibration course still reproduces. **Courant and Hilbert** made the spectral theorem rigorous in 1924. The **dynamical vibration absorber** was patented by **Frahm** in 1909 and analysed by **Ormsby**, **Rittenhouse** and **Den Hartog**, whose 1931 paper with Hudson gave the optimum absorber design still used unchanged. **Orthogonality** was exploited for structures by **Baker** and by **Glauert** in the 1930s flutter work; the systematic **modal analysis** of large structures begins with the matrix-iteration and relaxation methods of **Southwell**, **Runge** and **Ritz**, and the experimental discipline dates from the transfer-impedance measuring sets of the 1950s and **Kennedy and Panofsky**'s beam instrumentation. The word **antiresonance** entered the literature with the electrical filter literature of the 1920s and passed into mechanical engineering with the absorber literature of the same decade.
:::

## Where this leads

The single-degree-of-freedom system whose modes these generalise is in [[vibrations/free-vibration]] and [[vibrations/harmonic-excitation]], the absorber that the antiresonance of Example 3 explains is developed in [[vibrations/vibration-absorbers]], the numerical extraction of modes from a finite-element model is in [[vibrations/continuous-systems]], and the experimental extraction is the subject of [[vibrations/modal-analysis]]. Continuous systems are the limit of $n$ tending to infinity, treated in [[vibrations/continuous-systems]].

::: summary
- An $n$ degree-of-freedom system has $n$ natural frequencies and $n$ mode shapes, found from a generalised eigenproblem.
- Mode shapes are orthogonal with respect to both $\mathbf{M}$ and $\mathbf{K}$, so the equations decouple into $n$ independent modal oscillators when the damping is proportional.
- The frequency response is a sum over the modes, each contributing a pole; between every pair of poles lies a **zero**, the antiresonance.
- Coupling splits a frequency into a doublet whose separation measures the coupling, and produces beats as energy migrates between the parts.
- Modal masses tell you how much of the total mass each mode moves; when the first carries ninety per cent, a single-degree-of-freedom model is justified.
- A secondary structure attached to a primary one changes both frequencies, and the safe limit is a mass small against the primary structure's **modal** mass at the attachment point.
:::

## Exercises

::: exercise Degrees of freedom {level=1 check="2"}
How many natural frequencies has a system with two degrees of freedom?
::: solution
Two.
:::
:::

::: exercise Orthogonality {level=1 check="0"}
For the system of Example 1, evaluate $\boldsymbol{\phi}_1^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi}_2$ with $\boldsymbol{\phi}_1 = \left( 1 , 1 \right)$ and $\boldsymbol{\phi}_2 = \left( 1 , - 1 \right)$.
::: solution
$2 \times 1 \times 1 + 2 \times 1 \times \left( - 1 \right) = 0$, as orthogonality requires.
:::
:::

::: exercise Modal mass {level=1 check="1"}
For the same normalisation of Example 1, what is the ratio $m_1 / m_2$ of the two modal masses?
::: solution
Both are $4\ \mathrm{kg}$, so the ratio is $1$.
:::
:::

::: exercise Antiresonance {level=1 check="1"}
How many antiresonances does the driving-point receptance of a two-degree-of-freedom system contain?
::: solution
One — $n - 1$ for an $n$ degree-of-freedom system.
:::
:::

::: exercise Frequencies {level=2}
Two $5\ \mathrm{kg}$ masses are connected in series between rigid walls by three springs of $2\ \mathrm{kN / m}$ each. Find the natural frequencies and mode shapes.
::: solution
$$
\mathbf{K} = 2000 \begin{pmatrix} 2 & - 1 \\ - 1 & 2 \end{pmatrix}, \quad
\mathbf{M} = 5 \mathbf{I}, \qquad
\omega^{2} = \frac{2000}{5} \times \left\{ 1 , 3 \right\},
$$
$$
\omega_1 = 20\ \mathrm{rad / s} \left( 3.18\ \mathrm{Hz} \right), \quad
\omega_2 = 34.6\ \mathrm{rad / s} \left( 5.51\ \mathrm{Hz} \right),
\qquad
\boldsymbol{\phi}_1 = \left( 1 , 1 \right), \ \boldsymbol{\phi}_2 = \left( 1 , - 1 \right) .
$$
*Sanity.* The answer is identical to Example 1 because only the ratio $k / m$ matters; the system is the same system scaled. This scale invariance is the reason a one-tenth-scale model of a machine reproduces the prototype's frequencies only if the model material is $\sqrt{10}$ times stiffer per unit density, which is why scale models of large structures are made of special polymers or are tested in a different fluid rather than built to scale in steel.
:::
:::

::: exercise Modal expansion {level=2}
For the system of Example 1, express the initial condition $x_1 (0 ) = d$, $x_2 (0 ) = 0$, $\dot{\mathbf{x}} = 0$ as a sum of modes and find the modal amplitudes.
::: solution
Expanding $\mathbf{x}_0 = c_1 \boldsymbol{\phi}_1 + c_2 \boldsymbol{\phi}_2$ and using orthogonality,
$$
c_r = \frac{\boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{M} \mathbf{x}_0}{\boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi}_r} ,
\qquad
c_1 = \frac{2 d}{2 \times 2} = \frac{d}{2},
\qquad
c_2 = \frac{2 \times 1 \times d + 2 \times \left( - 1 \right) \times 0}{4} = \frac{d}{2} ,
$$
so
$$
\mathbf{x} (t ) = \frac{d}{2} \left( 1 , 1 \right) \cos \omega_1 t + \frac{d}{2} \left( 1 , - 1 \right) \cos \omega_2 t ,
$$
which at $t = 0$ gives $\left( d , 0 \right)$ as required.
*Sanity.* Both modes are excited equally, which is why releasing **one** mass produces full beats; releasing the masses **together** in the ratio of a mode shape excites that mode alone and produces a pure single-frequency motion. That second case is the definition of a **pure mode**, and the practical difficulty of producing it — the exciter must apply the right force distribution, not merely the right frequency — is the reason modal testing identifies modes by sweeping and comparing phase rather than by trying to ring one cleanly.
:::
:::

::: exercise Coupled frequencies {level=2}
Two identical machines each have an isolated natural frequency of $25\ \mathrm{Hz}$. A test finds resonances at $24$ and $26\ \mathrm{Hz}$. Estimate the coupling stiffness expressed as a fraction of each machine's own stiffness.
::: solution
For two identical oscillators coupled by $k_c$,
$$
\omega_{1,2}^{2} = \omega_0^{2}, \ \omega_0^{2} + 2 k_c / m
\quad\Longrightarrow\quad
\frac{k_c}{k} = \frac{\omega_2^{2} - \omega_1^{2}}{2 \omega_0^{2}}
= \frac{26^{2} - 24^{2}}{2 \times 25^{2}} = \frac{100}{1250} = 0.08 .
$$
*Sanity.* A four per cent frequency split corresponds to an eight per cent coupling stiffness, so the two machines are weakly coupled — through a shared pipe rack or a common foundation pad rather than a bolted frame. The square-law relation is what makes the measurement so sensitive: a split of one per cent, easily resolvable on a modern analyser, corresponds to a coupling stiffness of only two per cent, which is invisible to a static inspection and quite enough to transmit vibration from one machine to the other.
:::
:::

::: exercise Shear frame {level=2}
For the frame of Example 5, find the storey shears in each mode if the frame is subjected to a base acceleration $a$, and hence the modal participation factors.
::: solution
The load vector for a base acceleration $a$ is $\mathbf{F} = a m \left( 1 , 1 , 1 \right)$, so the modal force is $Q_r = \boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{F}$ and with the normalisation of Example 5,
$$
Q_1 = 2.247 \, a m, \qquad Q_2 = - 0.802 \, a m, \qquad Q_3 = 0.555 \, a m,
$$
with generalised masses $m_r = \boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi}_r$ of $1.841\ m$, $2.863\ m$ and $9.296\ m$. The participation factors $\Gamma_r = Q_r / m_r$ are therefore
$$
\Gamma_1 = 1.221\, a, \qquad \Gamma_2 = - 0.280\, a, \qquad \Gamma_3 = 0.060\, a,
$$
and the effective modal masses $Q_r^{2} / \left( a m_r \right)$ recover $2.742\ m$, $0.225\ m$ and $0.033\ m$, summing to the total mass of $3\ m$.
*Sanity.* For **displacement** the modes contribute in the ratio of their effective masses, $91 : 7.5 : 1.1$, and a one-mode answer is excellent. For **acceleration** they contribute in the ratio $M_r^{*} \omega_r^{2}$, which is $0.543 : 0.350 : 0.107$, so the third mode — which carries one per cent of the mass — supplies eleven per cent of the floor acceleration. This is the arithmetic behind the code requirement to combine modal contributions by the square root of the sum of squares rather than by keeping the first, and it is why a response-spectrum analysis for **acceleration-sensitive** contents needs many more modes than one for base shear.
:::
:::

::: exercise Absorber {level=3}
For the system of Example 3, halve the bracket stiffness and recompute the two resonances and the antiresonance. What does the change do to the machine's response at $50.3\ \mathrm{Hz}$?
::: solution
With $k_2 = 0.5\ \mathrm{MN / m}$ the bracket's own frequency falls to $35.6\ \mathrm{Hz}$, the resonances move to $34.1$ and $52.6\ \mathrm{Hz}$, and the antiresonance moves with the bracket to $35.6\ \mathrm{Hz}$. At $50.3\ \mathrm{Hz}$ the machine's response is no longer zero but $0.99\ \mathrm{mm}$ — ten times the static deflection and nearly three times the unshielded resonance.
*Sanity.* The antiresonance is **not** a property of the combined system but of the attachment, and it sits exactly at the attachment's own natural frequency. Halving the bracket stiffness therefore destroys the protection at the running speed while creating a new, unasked-for cancellation at $35.6\ \mathrm{Hz}$. This is the whole of absorber **detuning** — a bolted joint that loosens, a bracket that cracks, or a rubber mount that softens with age moves the antiresonance away from the speed it was protecting, and the machine's vibration returns in full. It is also why an absorber must be inspected for its frequency, not its appearance, and why a rubber-mounted absorber is a poor design where the rubber ages.
:::
:::

::: exercise Derivation {level=3}
Show that proportional damping $\mathbf{C} = \alpha \mathbf{M} + \beta \mathbf{K}$ is diagonalised by the mode shapes, and that the modal damping ratio is $\zeta_r = \alpha / \left( 2 \omega_r \right) + \beta \omega_r / 2$.
::: solution
Premultiplying by $\boldsymbol{\Phi}^{\mathrm{T}}$ and substituting $\mathbf{x} = \boldsymbol{\Phi} \mathbf{q}$,
$$
\boldsymbol{\Phi}^{\mathrm{T}} \mathbf{M} \boldsymbol{\Phi} \ddot{\mathbf{q}}
+ \boldsymbol{\Phi}^{\mathrm{T}} \mathbf{C} \boldsymbol{\Phi} \dot{\mathbf{q}}
+ \boldsymbol{\Phi}^{\mathrm{T}} \mathbf{K} \boldsymbol{\Phi} \mathbf{q}
= \boldsymbol{\Phi}^{\mathrm{T}} \mathbf{F} ,
$$
and the damping block becomes
$$
\boldsymbol{\Phi}^{\mathrm{T}} \mathbf{C} \boldsymbol{\Phi}
= \alpha \, \boldsymbol{\Phi}^{\mathrm{T}} \mathbf{M} \boldsymbol{\Phi}
+ \beta \, \boldsymbol{\Phi}^{\mathrm{T}} \mathbf{K} \boldsymbol{\Phi}
= \operatorname{diag} \left( \alpha m_r + \beta \omega_r^{2} m_r \right),
$$
which is diagonal because $\mathbf{M}$ and $\mathbf{K}$ both are in modal coordinates. The $r$-th modal equation is therefore
$$
m_r \ddot{q}_r + m_r \left( \alpha + \beta \omega_r^{2} \right) \dot{q}_r + \omega_r^{2} m_r q_r = Q_r ,
$$
and dividing by $m_r$ and comparing with $\ddot{q}_r + 2 \zeta_r \omega_r \dot{q}_r + \omega_r^{2} q_r = Q_r / m_r$ gives
$$
2 \zeta_r \omega_r = \alpha + \beta \omega_r^{2}
\quad\Longrightarrow\quad
\zeta_r = \frac{\alpha}{2 \omega_r} + \frac{\beta \omega_r}{2} . \quad \checkmark
$$
*Note.* The two-parameter form is called **Rayleigh damping** and its parabola in $\omega$ has a minimum at $\omega = \sqrt{\alpha / \beta}$, which is why fitting two modes over-predicts the damping between them and under-predicts it outside. The construction generalises to more parameters, but a damping matrix fitted to more than two modes is usually not physically realisable — it cannot be assembled from any distribution of real dampers — and a model that needs it is telling you that the damping is **not** proportional and that the modes are not the right coordinates.
:::
:::
