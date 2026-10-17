A continuous system has infinitely many degrees of freedom and therefore infinitely many natural frequencies, and the whole apparatus of the previous lessons survives the limit intact: there are still modes, still orthogonality, still a modal expansion — but the spectrum is now **dense**, and the question changes from "what is the natural frequency?" to "how many natural frequencies are there in this band, and how do they couple to a point force?"

Three facts organise the subject. Waves travel: every continuous system has a wave speed, and the natural frequencies are what is left of the travelling waves once the boundaries have had their say. The **dispersion relation** between frequency and wavenumber differs by system — a string and a fluid duct are non-dispersive, a beam and a shell are strongly dispersive — and the difference shows up directly in the spacing of the spectrum. And the **modal density** grows with frequency, so that a low-frequency structure has modes and a high-frequency one has a reverberant field, with a transition that an engineer must respect because a finite-element mesh must resolve every mode it is to represent.

::: warning A mode count is a mesh requirement
A finite-element model of a continuous system is **stiff**, and its frequencies converge from above: the first mode of a beam needs about eight elements, the fifth needs about twenty each, and a rule of thumb used in most shops is **six to eight elements per half-wavelength** of the highest frequency of interest. Below that the model is not inaccurate but silently wrong, because the mode it reports is the mode of a stiffer structure and the error grows steeply with mode number. The corresponding trap in a **test** is spatial aliasing: an accelerometer survey with a point spacing greater than half a wavelength measures a mode of the wrong order and reports it as the right one, which is exactly how a modal survey comes to disagree with itself.
:::

## Strings, bars and shafts

::: definition The wave equation and its speeds {#def-wave-eq}
A taut string of tension $T$ and mass per unit length $\mu$, a uniform bar of modulus $E$, density $\rho$ and area $A$ in longitudinal motion, a shaft of shear modulus $G$ in torsion and a fluid in a rigid duct all obey the same equation
$$
\frac{\partial^{2} u}{\partial x^{2}} = \frac{1}{c^{2}} \frac{\partial^{2} u}{\partial t^{2}},
\qquad
c^{2} = \begin{cases} T / \mu & \text{string} \\ E / \rho & \text{longitudinal bar} \\ G / \rho & \text{shaft in torsion} \\ p / \rho & \text{sound in a fluid} \end{cases}
$$
with the same consequence: waves travel at $c$ in both directions without changing shape, and a finite system of length $L$ has natural frequencies at multiples of $c / 2 L$ for both ends fixed or both free, and at odd multiples of $c / 4 L$ for one of each. The spectrum is **harmonic**, which is why a string sounds a note and a beam does not.
:::

::: proof Separation of variables and orthogonality {#proof-separation}
Seek $u = \phi (x ) q (t )$ in $\mu u_{tt} = \left( T u_x \right)_x$. Substituting and dividing by $T \phi q$,
$$
\frac{\phi''}{\phi} = \frac{\mu}{T} \frac{\ddot{q}}{q} = - k^{2},
$$
a constant, because the left side depends only on $x$ and the right only on $t$. The two equations are
$$
\phi'' + k^{2} \phi = 0, \qquad \ddot{q} + \omega^{2} q = 0,
\qquad \omega = k c ,
$$
and the boundary conditions $\phi (0 ) = \phi (L ) = 0$ select $k_n = n \pi / L$, so
$$
\phi_n = \sin \frac{n \pi x}{L}, \qquad
f_n = \frac{n c}{2 L} .
$$
For orthogonality, take two modes and subtract:
$$
\int_0^L \left( \phi_m T \phi_n'' - \phi_n T \phi_m'' \right) \mathrm{d}x
= \left( k_n^{2} - k_m^{2} \right) \int_0^L T \phi_m \phi_n \, \mathrm{d}x .
$$
The left side integrates by parts to a boundary term that vanishes for any combination of $\phi = 0$ and $T \phi' = 0$ at each end, so the integral is zero whenever $k_m \ne k_n$. $\checkmark$

*Note.* The argument is the **Sturm–Liouville** argument and it generalises unchanged to bars, shafts, beams, membranes and plates, and to any boundary conditions that make the boundary term vanish — which is precisely the mathematical content of the phrase "self-adjoint", and precisely why a structure with a **non-conservative** boundary, a follower force or a travelling-speed boundary condition, has modes that are no longer orthogonal and can coalesce into the degenerate shapes called exceptional points. A guitar string's modes are orthogonal to one part in ten million; a rotating shaft's or a brake disc's may not be orthogonal at all, and the difference is the difference between a modal analysis and a numerical experiment.
:::

::: definition The Euler–Bernoulli beam {#def-beam}
Bending breaks the pattern. A beam of flexural rigidity $EI$, mass per unit length $\rho A$, obeys a fourth-order spatial equation,
$$
EI \frac{\partial^{4} u}{\partial x^{4}} + \rho A \frac{\partial^{2} u}{\partial t^{2}} = 0,
\qquad
\omega = \left( \frac{EI}{\rho A} \right)^{1 / 2} k^{2},
$$
so the phase speed $\omega / k$ is proportional to $k$ and the **group** speed is twice the phase speed: a bending pulse spreads as it travels. The natural frequencies go as $\left( \beta_n L \right)^{2}$, which for a string or a bar would be $n^{2}$ but for a beam is fixed by the transcendental frequency equation, and the result is a spectrum that opens out steeply — a cantilever's modes are at $1$, $6.27$, $17.5$ and $34.4$ times the first, not $1$, $4$, $9$ and $16$.
:::

::: proof The cantilever frequency equation {#proof-cantilever}
For $\phi'''' - \beta^{4} \phi = 0$ the general solution is
$$
\phi = A \cosh \beta x + B \sinh \beta x + C \cos \beta x + D \sin \beta x .
$$
At the built-in end $\phi = \phi' = 0$, and at the free end the bending moment and shear vanish, $\phi'' = \phi''' = 0$. The first two give $A = - C$ and $B = - D$, and the last two give
$$
\begin{pmatrix} \cosh \beta L + \cos \beta L & \sinh \beta L + \sin \beta L \\ \sinh \beta L - \sin \beta L & \cosh \beta L - \cos \beta L \end{pmatrix}
\begin{pmatrix} A \ B \end{pmatrix} = \mathbf{0} .
$$
Setting the determinant to zero and using $\cosh^{2} - \sinh^{2} = 1$ and $\cos^{2} + \sin^{2} = 1$ collapses everything to
$$
\cosh \beta L \cos \beta L = - 1,
\qquad
\beta_1 L = 1.8751, \quad \beta_2 L = 4.6941, \quad \beta_3 L = 7.8548 ,
$$
with frequencies $f_n = \left( \beta_n L \right)^{2} / 2 \pi \sqrt{EI / \rho A L^{4}}$. $\checkmark$

*Note.* For $n$ greater than two the roots are within $0.001$ of $\left( 2 n - 1 \right) \pi / 2$, so a beam's high spectrum goes as $\left( 2 n - 1 \right)^{2}$ and its modal density as $\mathrm{d}N / \mathrm{d}f \propto 1 / \sqrt{f}$ — bending modes become **rarer** per hertz as the frequency rises, the opposite of a membrane or a plate, whose two-dimensional spectra become denser. This single fact explains why a long slender beam is easy to model and a flat panel is not, and why the "beam-like" idealisation is abandoned at the point where the panel's own modes start arriving faster than the beam's.
:::

::: definition Two-dimensional systems and modal density {#def-2d}
A membrane of tension per unit length $T$ and surface density $\rho_s$ obeys the two-dimensional wave equation, so its frequencies are proportional to $\sqrt{\left( n_x / a \right)^{2} + \left( n_y / b \right)^{2}}$ and its spectrum is **not** harmonic except in a square, where different index pairs collide onto the same frequency. A plate adds bending stiffness and is dispersive at low frequency and membrane-like at high, crossing over at the **coincidence frequency** at which the trace speed of a bending wave equals the speed of sound in the adjoining fluid — the frequency at which a panel radiates efficiently, reflects little, and is hardest to insulate.
The counting is what makes the difference between a structure and a room. For a one-dimensional system the modal density $\mathrm{d}N / \mathrm{d}f$ is constant; for a two-dimensional non-dispersive one it grows as $f$; for a three-dimensional acoustic cavity it grows as $f^{2}$. The **modal overlap** $\varepsilon = \eta \omega\, \mathrm{d}N / \mathrm{d}f$ — the ratio of a mode's bandwidth to its spacing — passes unity at a few hundred hertz for a car body and at a few tens of hertz for a ship compartment, and above it the individual resonances are not resolvable and the correct description is a power balance rather than a frequency response.
:::

::: widget plot
f: (cosh(1.8751*x)-cos(1.8751*x)-1.3622*(sinh(1.8751*x)-sin(1.8751*x)))/0.5993
x: 0, 1
y: -0.1, 1.35
labels: phi(x/L) / phi(L)
caption: The first bending mode of a uniform cantilever, from the exact expression with beta L = 1.8751. The shape is not the static deflection curve — it rises more steeply near the root and its maximum lies at 0.78 of the span rather than at the tip — which is why Rayleigh's method with the static curve overestimates the first frequency by one and a half per cent and why the error grows for higher modes.
:::

::: example A piano string {#ex-string}
A steel piano wire of $0.6\ \mathrm{mm}$ diameter and $650\ \mathrm{mm}$ speaking length is to sound A at $440\ \mathrm{Hz}$. Find the tension, and the sharpness of the eighth partial.
::: solution
$$
\mu = \rho \frac{\pi d^{2}}{4} = 7850 \times 2.827 \times 10^{- 7} = 2.220 \times 10^{- 3}\ \mathrm{kg / m},
\qquad
c = 2 L f = 572\ \mathrm{m / s},
$$
$$
T = \mu c^{2} = 2.220 \times 10^{- 3} \times 572^{2} = 726\ \mathrm{N}.
$$
**Inharmonicity.** Bending stiffness makes $f_n = \frac{n c}{2 L} \sqrt{1 + \beta n^{2}}$ with
$$
\beta = \frac{\pi^{2} EI}{T L^{2}} = \frac{9.87 \times 200 \times 10^{9} \times 6.36 \times 10^{- 15}}{726 \times 0.4225} = 4.09 \times 10^{- 5},
$$
so the eighth partial is sharp by $\sqrt{1 + 64 \beta} = 1.0013$, that is $0.7$ cents.

*Check.* Piano strings run at $700$ to $1000\ \mathrm{N}$ and a grand piano's frame carries some $20\ \mathrm{kN}$ of total string tension, which is why the frame is cast iron. $\checkmark$

*Sanity.* Seven tenths of a cent is inaudible — the just-noticeable difference is about five cents — and this is why a piano's treble strings are plain steel. In the **bass** the same formula forces a design change: to sound $55\ \mathrm{Hz}$ on a $1.3\ \mathrm{m}$ string at a sensible tension would need a linear density four hundred times greater, and a steel wire that thick has a $\beta$ large enough to make its eighth partial a **semitone** sharp. The cure is an overwound string — a thin core wrapped in copper, which adds mass at the outside where the bending stiffness is barely increased — and the resulting $\beta$ of a few thousandths is why a piano is **stretched**: the octaves are tuned wide so that the inharmonic partials of the low strings coincide with those of the high ones. Piano tuning is applied acoustics of continuous systems, and no other engineering discipline admits it.
:::
:::

::: example A turbine blade {#ex-blade}
A turbine blade is $50\ \mathrm{mm}$ long, $20\ \mathrm{mm}$ wide and $3\ \mathrm{mm}$ thick in the bending direction, with $E = 200\ \mathrm{GPa}$ and $\rho = 7850\ \mathrm{kg / m^{3}}$. Find its first three flatwise bending frequencies.
::: solution
$$
I = \frac{b h^{3}}{12} = 4.50 \times 10^{- 11}\ \mathrm{m^{4}}, \qquad
\rho A = 0.471\ \mathrm{kg / m}, \qquad
\sqrt{\frac{EI}{\rho A L^{4}}} = 1748\ \mathrm{s^{- 1}},
$$
$$
f_n = \frac{\left( \beta_n L \right)^{2}}{2 \pi} \times 1748,
\qquad
f_1 = 978\ \mathrm{Hz}, \quad
f_2 = 6130\ \mathrm{Hz}, \quad
f_3 = 17\,160\ \mathrm{Hz}.
$$
*Check.* The ratios are $6.27$ and $17.55$, and $\left( 4.6941 / 1.8751 \right)^{2} = 6.267$ $\checkmark$

*Sanity.* The second mode is more than six times the first, which is the reason a blade's **second** bending mode is rarely the design case even though it is the second most compliant: the excitation spectrum of a turbomachine is a line spectrum at multiples of the rotation rate, and a spectrum that opens out so steeply means a blade can be tuned away from the first few engine orders and stay away. The same steepness is the reason a blade's **stress** at the second mode is so much worse than at the first — the second mode has a node inside the span and therefore a much higher strain energy for the same tip amplitude.
:::
:::

::: example A drill string {#ex-drillstring}
A drill string $100\ \mathrm{m}$ long hangs freely in a borehole. Find its first two **longitudinal** natural frequencies, and say how a change of mud density affects them.
::: solution
$$
c_L = \sqrt{\frac{E}{\rho}} = \sqrt{\frac{200 \times 10^{9}}{7850}} = 5048\ \mathrm{m / s},
\qquad
f_n = \frac{n c_L}{2 L} = 25.2 , 50.5\ \mathrm{Hz}.
$$
*Check.* The longitudinal speed in steel is a standard number worth remembering — $5048\ \mathrm{m / s}$ for steel, $5130$ for aluminium, $3178$ for shear in steel — because it converts a measured echo delay directly into a length, which is how a stuck drill pipe is located. $\checkmark$

*Sanity.* The frequency depends on $E$ and $\rho$ **only**, not on the cross-section, so a heavy-wall and a thin-wall string of the same length have the same longitudinal spectrum — and this is exactly what makes the measurement a material measurement rather than a geometry measurement. Mud changes nothing in the formula, but it adds **added mass**, which behaves as an increase in $\rho$ and lowers the frequencies; the shift is the standard way of measuring the added-mass coefficient, and the same effect is why a structure's wet natural frequency in a tank test can be ten per cent below its dry one and why a dry model of a hydraulic machine is a systematically optimistic model.
:::
:::

::: example A torsional shaft {#ex-torsion}
A motor drives a $20\ \mathrm{kg}$ coupling disc of $300\ \mathrm{mm}$ diameter through a $30\ \mathrm{mm}$ steel shaft $400\ \mathrm{mm}$ long. Find the first torsional natural frequency.
::: solution
$$
J = \frac{\pi d^{4}}{32} = 7.95 \times 10^{- 8}\ \mathrm{m^{4}}, \qquad
k_t = \frac{G J}{L} = \frac{79.3 \times 10^{9} \times 7.95 \times 10^{- 8}}{0.400} = 15\,760\ \mathrm{N\, m / rad},
$$
$$
I_p = \frac{m R^{2}}{2} = 0.225\ \mathrm{kg\, m^{2}}, \qquad
f_1 = \frac{1}{2 \pi} \sqrt{\frac{15\,760}{0.225}} = 42.1\ \mathrm{Hz}.
$$
*Check.* The distributed model gives $f_1 = c_s / 4 L = 3178 / 1.6 = 1986\ \mathrm{Hz}$ for the shaft's **own** first torsional mode, forty-seven times higher, so the lumped model is excellent. $\checkmark$

*Sanity.* Forty-two hertz is below the line frequency and dangerously close to the firing frequency of a four-cylinder engine, which is the reason torsional vibration is a crankshaft problem and not a shaft problem: the excitation is at a **multiple** of the speed, so a system tuned to stay above first-order excitation at idle can be driven exactly on resonance at running speed by the third or fourth order. The design response is either to make the shaft stiffer — and $k_t \propto d^{4}$, so twenty per cent more diameter is fifty per cent more stiffness — or to fit a **centrifugal pendulum absorber** on the pulley, whose tuning is speed-proportional and therefore exact at every speed.
:::
:::

::: example A drum and a pipe {#ex-fluids}
Find the fundamental of a circular drumhead $400\ \mathrm{mm}$ across with a tension of $2\ \mathrm{kN / m}$ and a surface density of $0.15\ \mathrm{kg / m^{2}}$, and of an open-ended organ pipe of the same length.
::: solution
**Membrane.** With $\nabla^{2} u = \left( \rho_s / T \right) u_{tt}$ and a fixed rim,
$$
f_{11} = \frac{1.2034}{2 \pi} \sqrt{\frac{T}{\rho_s}} \frac{\pi}{R}
= \frac{1.2034}{2 R} \sqrt{\frac{T}{\rho_s}}
= \frac{1.2034}{0.400} \times 115.5 = 347\ \mathrm{Hz}.
$$
**Pipe.** With $c = 343\ \mathrm{m / s}$ and an end correction of $0.6 R$ per open end,
$$
f_1 = \frac{c}{2 \left( L + 1.2 R \right)} = \frac{343}{2 \times 2.50} = 68.6\ \mathrm{Hz},
$$
against $70.3\ \mathrm{Hz}$ for the ideal $c / 2 L$.

*Sanity.* The membrane's spectrum is **not** harmonic: its next roots are $1.593$ and $2.136$ times the first, not $2$ and $3$, which is why a drum has a pitch but not a note, and why a timpani is made with a hemispherical bowl whose own resonances reinforce selected membrane modes at a near-harmonic set. The pipe's end correction is six per cent of the pitch — a whole semitone at a hundred hertz — and it is the reason organ pipes are **voiced** by ear at the bench rather than cut to length from a formula, and the reason a formula for a wind instrument is a starting point and never a finished design.
:::
:::

::: example Design {#ex-design-bracket}
A sensor bracket is a steel cantilever $200\ \mathrm{mm}$ long and $20\ \mathrm{mm}$ thick carrying a $2\ \mathrm{kg}$ head at its tip. Find the width needed to put the first bending mode above $400\ \mathrm{Hz}$.
::: solution
Rayleigh's method with the static deflection curve gives
$$
k_{\text{eq}} = \frac{3 EI}{L^{3}} = 5.00 \times 10^{7} b,
\qquad
m_{\text{eq}} = 0.2357 \rho A L^{3} + M = 0.0296 b + 2 ,
$$
so $f^{2} = k_{\text{eq}} / m_{\text{eq}}$ at $400\ \mathrm{Hz}$ requires
$$
5.00 \times 10^{7} b = \left( 2 \pi \times 400 \right)^{2} \left( 0.0296 b + 2 \right)
\quad\Longrightarrow\quad
b = 0.263\ \mathrm{m}.
$$
A $265\ \mathrm{mm}$ wide by $20\ \mathrm{mm}$ thick bracket, or equivalently a $20\ \mathrm{mm}$ wide one $20\ \mathrm{mm}$ thick turned through ninety degrees, or a $6\ \mathrm{mm}$ plate with a $40\ \mathrm{mm}$ edge stiffener.

*Design comment.* The answer is dominated by the **tip mass**: the bracket's own equivalent mass is $0.008\ \mathrm{kg}$ against the head's $2\ \mathrm{kg}$, so the frequency is set almost entirely by $\sqrt{3 EI / L^{3} M}$ and the plate's own weight is irrelevant. That has two consequences. The first is that the joint, not the plate, decides the answer — a $200\ \mathrm{mm}$ cantilever welded to a $10\ \mathrm{mm}$ plate on a frame is a cantilever on a rotational spring, and the same arithmetic as the calibration specimen of the previous lesson shows that a modestly compliant root can take twenty per cent off the frequency. The second is that the design lever is the **length**, which enters as $L^{-3}$: shortening the bracket to $150\ \mathrm{mm}$ raises the frequency by $65$ per cent and lets the width be halved, which is why every experienced designer's first move on a stiffening problem is to move the mounting point rather than to add material.
:::
:::

::: history
The vibrating string is the oldest problem in mathematical physics: **Pythagoras** and his school are said to have found the harmonic ratios empirically, **Marin Mersenne** published the tension and length laws in 1637, and the wave equation itself was written by **d'Alembert** in 1747 and solved by separation of variables in the same memoir. **Daniel Bernoulli**'s argument that the general motion is a superposition of sines — against **Euler** and **d'Alembert**, who doubted that a non-smooth initial shape could be so represented — is the origin of Fourier series, and **Fourier**'s 1807 memoir and 1822 *Théorie analytique* settled it. **Euler** found the beam equation in 1750 and the cantilever frequency equation in the form used here; **Chladni**'s *Die akustik* of 1802 mapped the plate patterns that bear his name, and **Kirchhoff**'s 1850 refinement supplied the rotary inertia and shear that matter for short beams. **Rayleigh**'s *Theory of Sound* of 1877 gathered the energy and quotient methods, and **Ritz**'s 1909 variational method made approximate frequencies respectable — the two together remain the working equipment of every vibration engineer. The **modal density** and the statistical counting of modes belong to **Morse**, whose *Vibration and Acoustics* of 1936 is still the reference, and to the room-acoustics counting of **Lord Rayleigh** and **Schroeder**. The **inharmonicity** of piano strings was measured by **Fletcher, Blackman and Hutchinson** at the National Research Council of Canada in the 1960s in the work that finally explained piano stretch tuning and the design of the overwound string.
:::

::: quiz
A uniform beam's modes lie at $1$, $6.27$, $17.5$ and $34.4$ times its first frequency. The reason the spacing **widens** rather than staying uniform is:
- [ ] Shear deformation, which stiffens the higher modes
- [x] The dispersion relation $\omega \propto k^{2}$, so doubling the wavenumber quadruples the frequency
- [ ] Rotary inertia, which raises the higher modes
- [ ] The boundary conditions, which are transcendental
::: solution
For a beam $\omega = \left( EI / \rho A \right)^{1 / 2} k^{2}$, and the mode number fixes $k$ roughly linearly, so $f_n \propto n^{2}$ and the spacing $f_{n+1} - f_n \propto 2 n + 1$ widens. Shear deformation and rotary inertia — the Timoshenko corrections — do raise the higher modes above the Euler values, but they are corrections and not the cause; and the transcendental frequency equation only perturbs the integers, since $\beta_n L$ is within $0.001$ of $\left( 2 n - 1 \right) \pi / 2$ for $n$ greater than two. The practical consequence is that a beam's modal density **falls** with frequency, so a slender structure stays resolvable to much higher frequencies than a flat panel of the same material, and the point at which a design stops being analysable mode by mode is usually the arrival of the panel modes rather than the failure of the beam model.
:::
:::

## Where this leads

The single-degree-of-freedom system is the first term of everything in this lesson and is in [[vibrations/free-vibration]] and [[vibrations/harmonic-excitation]]; the modal expansion of a finite system that becomes the expansion here is in [[vibrations/two-degrees-of-freedom]]; the extraction of continuous modes from discrete measurements is in [[vibrations/modal-analysis]]; the absorbers that hang off continuous structures are in [[vibrations/vibration-absorbers]]; and the numerical solution of all of it by finite elements is the subject of [[vibrations/modal-analysis]] and of any finite-element text.

::: summary
- Every continuous system has a wave speed and infinitely many modes; the natural frequencies are the travelling waves after the boundaries have spoken.
- Strings, bars, shafts in torsion and fluid ducts are non-dispersive and have **harmonic** spectra; beams, plates and shells are dispersive and their spectra open out.
- Mode shapes are orthogonal because the spatial problem is self-adjoint, which fails for non-conservative boundaries — rotating shafts, follower forces, moving media.
- A beam's frequencies go as $\left( \beta_n L \right)^{2}$ with $\beta_n L$ from a transcendental equation: a cantilever's modes are at $1$, $6.27$, $17.5$ and $34.4$ times the first.
- Bending stiffness makes real strings **inharmonic**, and the effect sets the design of piano bass strings and the tuning of every real instrument.
- Modal density rises with frequency in two and three dimensions, so the boundary between "a structure with modes" and "a reverberant box" is a design requirement on the mesh, the survey and the analysis alike.
:::

## Exercises

::: exercise Wave speed {level=1 check="1"}
A string of wave speed $c$ and length $L$ is fixed at both ends. What is its fundamental frequency in units of $c / 2L$?
::: solution
$1$ — the fundamental is $c / 2 L$.
:::
:::

::: exercise Boundary conditions {level=1 check="3"}
A bar fixed at one end and free at the other has its first longitudinal mode at $f$. At what frequency is its next longitudinal mode?
::: solution
$3 f$ — a fixed-free bar has only odd harmonics.
:::
:::

::: exercise Cantilever {level=1 check="6.27"}
What is the ratio of a cantilever beam's second to first bending frequency?
::: solution
$\left( 4.6941 / 1.8751 \right)^{2} = 6.27$.
:::
:::

::: exercise Dispersion {level=1 check="2"}
For a bending wave, by what factor does the group speed exceed the phase speed?
::: solution
Two, since $\omega \propto k^{2}$.
:::
:::

::: exercise String tension {level=2}
A guitar string of $0.9\ \mathrm{mm}$ diameter, $650\ \mathrm{mm}$ scale length and density $7850\ \mathrm{kg / m^{3}}$ is tuned to $E$ at $82.4\ \mathrm{Hz}$. Find the tension.
::: solution
$$
\mu = 7850 \times \frac{\pi \times 0.9^{2} \times 10^{- 6}}{4} = 4.995 \times 10^{- 3}\ \mathrm{kg / m},
\qquad
c = 2 \times 0.65 \times 82.4 = 107.1\ \mathrm{m / s},
$$
$$
T = \mu c^{2} = 4.995 \times 10^{- 3} \times 107.1^{2} = 57.3\ \mathrm{N}.
$$
*Sanity.* Guitar strings run at $50$ to $90\ \mathrm{N}$ and a twelve-string carries about $700\ \mathrm{N}$ in total, which is why a guitar's top is braced and a piano's frame is cast iron. The square-law in frequency is the reason a string is broken by raising the pitch by a whole tone — twenty per cent more frequency is forty-four per cent more tension — and why the standard advice about not tuning a guitar up is a statement about $T \propto f^{2}$ and not about the string's age.
:::
:::

::: exercise Longitudinal bar {level=2}
An aluminium bar $1\ \mathrm{m}$ long rings longitudinally at $2560\ \mathrm{Hz}$ in its first free-free mode. Find the ratio $E / \rho$ and compare with the tabulated $2.63 \times 10^{7}\ \mathrm{m^{2} / s^{2}}$.
::: solution
$$
c_L = 2 L f = 5120\ \mathrm{m / s}, \qquad
\frac{E}{\rho} = c_L^{2} = 2.62 \times 10^{7}\ \mathrm{m^{2} / s^{2}},
$$
within two per cent of the tabulated $2.63 \times 10^{7}\ \mathrm{m^{2} / s^{2}}$ for a heat-treatable aluminium alloy.
*Sanity.* The measurement is a **material** measurement, insensitive to the bar's cross-section and its mass, and it is a standard non-destructive technique: the resonant-ultrasound method reads $E$ and $G$ from the longitudinal and flexural resonances of a small rectangular bar and is used to characterise ceramics, concretes and additively manufactured coupons without breaking them. Its accuracy is limited by the fundamental assumption — that the bar is slender and free — and by the fact that a real bar's flexural resonance is a Rayleigh and not an Euler value.
:::
:::

::: exercise Organ pipe {level=2}
A closed organ pipe is to sound middle $C$ at $261.6\ \mathrm{Hz}$. Find its length if the bore is $40\ \mathrm{mm}$ across and the speed of sound is $343\ \mathrm{m / s}$.
::: solution
$$
L + 0.6 R = \frac{c}{4 f} = 0.3278\ \mathrm{m}
\quad\Longrightarrow\quad
L = 0.3278 - 0.012 = 0.316\ \mathrm{m}.
$$
*Sanity.* The end correction is four per cent of the length, and it is larger for a flared or lipped pipe than for a plain one, which is why organ builders voice and tune each pipe by hand. The same correction is the reason a Helmholtz resonator's formula carries an "effective length" and why a muffler's first attenuation dip never lands where the arithmetic on the drawing says it should.
:::
:::

::: exercise Modal density {level=2}
Find the modal density in modes per hertz of the drill string of Example 3, and of a steel plate $2\ \mathrm{m}$ square in its membrane range.
::: solution
**String.** $\mathrm{d}N / \mathrm{d}f = 2 L / c = 200 / 5048 = 0.0396$ modes per hertz, one mode every $25\ \mathrm{Hz}$.
**Plate.** For a two-dimensional non-dispersive system $\mathrm{d}N / \mathrm{d}f = 2 \pi A f / c_L^{2}$, so at $500\ \mathrm{Hz}$ with $c_L = 5048\ \mathrm{m / s}$,
$$
\frac{\mathrm{d}N}{\mathrm{d}f} = \frac{2 \pi \times 4 \times 500}{2.548 \times 10^{7}} = 4.9 \times 10^{- 4}\ \mathrm{Hz^{- 1}},
$$
one mode every $2000\ \mathrm{Hz}$ — the plate is below its own critical frequency and behaves as a beam-like structure.
*Sanity.* Modal density is what decides whether a harmonic analysis is a **discrete** problem or a **statistical** one. One mode every twenty-five hertz means a forcing bandwidth of ten hertz contains none, and the response is a handful of resonances; one mode every hundredth of a hertz means the same bandwidth contains thousands, and the response is a power flow problem in which the individual frequencies have stopped mattering. The transition is the operating range of statistical energy analysis, and the modal overlap factor — the ratio of the modal bandwidth to the modal spacing — is the number to compute before choosing a method.
:::
:::

::: exercise Beam and string {level=3}
A steel strip $300\ \mathrm{mm}$ long, $20\ \mathrm{mm}$ wide and $2\ \mathrm{mm}$ thick is stretched by an axial force $P$. Find the $P$ that doubles its first bending frequency, and the compressive load at which that frequency would fall to zero.
::: solution
Axial tension raises the frequency of a beam by
$$
f^{2} = f_{\text{beam}}^{2} + f_{\text{string}}^{2},
\qquad
f_{\text{string}} = \frac{1}{2 L} \sqrt{\frac{P}{\rho A}} .
$$
Here $I = 1.333 \times 10^{- 11}\ \mathrm{m^{4}}$ and $\rho A = 0.314\ \mathrm{kg / m}$, so
$$
\sqrt{\frac{EI}{\rho A L^{4}}} = 32.4\ \mathrm{s^{- 1}},
\qquad
f_{\text{beam}} = \frac{3.516 \times 32.4}{2 \pi} = 18.1\ \mathrm{Hz},
\qquad
f_{\text{string}} = 0.2974 \sqrt{P} ,
$$
and doubling requires $f_{\text{string}} = \sqrt{3} \times 18.1 = 31.4\ \mathrm{Hz}$, so
$$
P = \left( \frac{31.4}{0.2974} \right)^{2} = 111\ \mathrm{N}.
$$
The Euler buckling load is $\pi^{2} EI / L^{2} = 293\ \mathrm{N}$, so the strip at $111\ \mathrm{N}$ is carrying thirty-eight per cent of its own buckling load in tension.
*Sanity.* The zero-frequency case is the **buckling** load, and the formula shows why: $f$ tends to zero as the axial force becomes compressive and reaches $- P_{\text{cr}}$, at which the "frequency" becomes imaginary and the mode becomes a divergence. Measuring the frequency of a taut member against its tension and extrapolating to zero is a real and accurate method for finding a load that cannot be measured directly — it is used for stay cables, for pile tension and for the stress in embedded reinforcement — and the reason it works is that the frequency is a **tension meter** whose calibration involves nothing but the length and the mass per unit length. Its weakness is exactly the same square law: at low tension the frequency is dominated by bending and is nearly insensitive to the load, which is why cable-tension meters are unreliable on slack cables.
:::
:::

::: exercise Derivation {level=3}
Derive the frequency equation of a uniform beam that is **simply supported** at both ends, and show that its spectrum is $n^{2}$ times a single frequency. Why is it harmonic in $n^{2}$ and not in $n$?
::: solution
The boundary conditions are $\phi = 0$ and $\phi'' = 0$ at both ends. Substituting the general solution,
$$
\phi (0 ) = 0 \Rightarrow A + C = 0, \qquad
\phi'' (0 ) = 0 \Rightarrow \beta^{2} \left( A - C \right) = 0
\quad\Longrightarrow\quad A = C = 0 ,
$$
and the remaining $\phi = B \sinh \beta x + D \sin \beta x$ gives at $x = L$
$$
B \sinh \beta L + D \sin \beta L = 0, \qquad
B \sinh \beta L - D \sin \beta L = 0 ,
$$
so $B = 0$ and $\sin \beta L = 0$, hence $\beta_n L = n \pi$ and
$$
f_n = \frac{n^{2} \pi^{2}}{2 \pi L^{2}} \sqrt{\frac{EI}{\rho A}} . \quad \checkmark
$$
*Note.* The simply supported beam is the one case that separates cleanly, and the reason is that **both** boundary conditions are two-point and separable into symmetric and antisymmetric parts, so the hyperbolic terms drop out and no transcendental equation survives. The spectrum goes as $n^{2}$ rather than $n$ because the restoring force of bending is the **second** derivative of the slope — a mode of wavenumber $k$ has a curvature proportional to $k^{2}$ and therefore a strain energy proportional to $k^{4}$, while the kinetic energy goes as the mass, so $\omega^{2} \propto k^{4}$ and $\omega \propto k^{2}$. A string's restoring force is proportional to its curvature alone, $\omega \propto k$. That single difference in the order of the spatial operator is why a beam sounds like a bell and a string sounds like a string, and why the design of a musical instrument that must sound pitched is a design of its boundary conditions.
:::
:::
