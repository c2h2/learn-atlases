Vibration isolation is the cheapest control strategy in engineering: put the machine on something soft, and the force it delivers to its foundation falls by the ratio you choose, with no sensors, no power and no maintenance. The whole of it rests on one inequality — that the disturbing frequency must exceed $\sqrt{2}$ times the natural frequency of the isolated system — and on the practical consequence that this inequality is a demand for **static deflection**, since $\delta_{\text{st}} = g / \omega_n^{2}$.

That is the trap. Isolation is easy to specify and hard to build, because the deflection needed grows as the square of the frequency ratio, and because the same soft support that stops the vertical force transmits the horizontal one far worse. Every real isolation design is a negotiation between the vertical performance you asked for, the lateral and rocking modes you did not, and the transient you must survive on the way through resonance.

::: definition Transmissibility {#def-transmissibility}
For a system excited either by a harmonic force $F_0$ or by a harmonic **support** motion $Y$, the ratio of transmitted to applied quantity is the same function,
$$
T (r, \zeta) = \frac{F_T}{F_0} = \frac{X}{Y}
= \sqrt{\frac{1 + \left( 2 \zeta r \right)^{2}}{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}} .
$$
$T < 1$ requires $r > \sqrt{2}$ **whatever the damping**; in the isolation region $T \approx 1 / \left( r^{2} - 1 \right)$ when damping is light, and $T \to 2 \zeta / r$ when it is heavy. The **isolation efficiency** is $\left( 1 - T \right) \times 100$ per cent.
:::

::: theorem Isolation is a demand for static deflection {#thm-isolation-deflection}
Because $\omega_n^{2} = k / m = g / \delta_{\text{st}}$, the frequency ratio and hence the transmissibility are fixed by the static deflection alone:
$$
\delta_{\text{st}} = \frac{g}{\omega_n^{2}} = \frac{g r^{2}}{\omega^{2}},
\qquad
f_n = \frac{1}{2 \pi} \sqrt{\frac{g}{\delta_{\text{st}}}} .
$$
For light damping and $T = 1 / \left( r^{2} - 1 \right)$ this inverts to the designer's working formula
$$
\delta_{\text{st}} = \frac{g}{\omega^{2}} \left( 1 + \frac{1}{T} \right) .
$$
Neither the mass nor the stiffness appears: **doubling the mass of an isolated machine does not improve its isolation at all**, it only reduces the deflection at which the isolation is achieved.
:::

::: proof Support motion gives the same transmissibility {#proof-support-motion}
For a support moving as $y = Y \sin \omega t$ the spring and damper act on the relative displacement $z = x - y$:
$$
m \ddot{x} + c \left( \dot{x} - \dot{y} \right) + k \left( x - y \right) = 0
\quad\Longrightarrow\quad
m \ddot{z} + c \dot{z} + k z = - m \ddot{y} = m \omega Y \cos \omega t .
$$
The relative amplitude is therefore
$$
\frac{Z}{Y} = \frac{r^{2}}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}} ,
$$
and the transmitted force is $F_T = Z \sqrt{k^{2} + \left( c \omega \right)^{2}}$, so with $c \omega / k = 2 \zeta r$,
$$
\frac{F_T}{k Y}
= \frac{r^{2} \sqrt{1 + \left( 2 \zeta r \right)^{2}}}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}} .
$$
Dividing numerator and denominator by $r^{2}$ converts $\left( 1 - r^{2} \right)^{2} / r^{4}$ into $\left( 1 / r^{2} - 1 \right)^{2}$ and $4 \zeta^{2} r^{2} / r^{4}$ into $4 \zeta^{2} / r^{2}$, so
$$
\frac{F_T}{k Y}
= \frac{\sqrt{1 + \left( 2 \zeta r \right)^{2}}}{\sqrt{\left( 1 - 1 / r^{2} \right)^{2} + \left( 2 \zeta / r \right)^{2}}} ,
$$
which is the transmissibility evaluated at the frequency ratio $1 / r$ in the denominator's first term — and since $\left( 1 - 1 / r^{2} \right)^{2} r^{4} = \left( r^{2} - 1 \right)^{2}$, multiplying top and bottom by $r^{2}$ recovers
$$
\frac{F_T}{k Y} = \frac{X}{Y}
= \sqrt{\frac{1 + \left( 2 \zeta r \right)^{2}}{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}} = T .
$$
The absolute displacement ratio $X / Y = \left( 1 + 2 \zeta r \, i \right) / \left[ \left( 1 - r^{2} \right) + 2 \zeta r \, i \right]$ has the same modulus, so force transmissibility and motion transmissibility are one and the same function. $\checkmark$

*Note.* The equality of force transmissibility and motion transmissibility is not a coincidence: both are the same transfer function read at the same port of a two-port mechanical network. It fails as soon as the source and the receiver are not the simple single-degree-of-freedom pair — for example when the machine has a flexible mode inside its own mass, or when the foundation is not rigid.
:::

::: example Motor on resilient mounts {#ex-motor-mounts}
A $200\ \mathrm{kg}$ motor running at $1450\ \mathrm{rpm}$ is to be mounted so that eighty per cent of the disturbing force is isolated. The mount damping ratio is $0.05$. Find the required static deflection, the stiffness per mount and the natural frequencies of the four-degree-of-freedom mount system.
::: solution
**Frequency ratio and deflection.** $\omega = 151.8\ \mathrm{rad / s}$, $T = 0.20$, and with $\zeta = 0.05$
$$
r = 2.48, \qquad
\delta_{\text{st}} = \frac{9.81 \times 2.48^{2}}{151.8^{2}} = 2.6\ \mathrm{mm},
\qquad f_n = 9.75\ \mathrm{Hz}.
$$
**Stiffness.**
$$
k_{\text{total}} = m \omega_n^{2} = 200 \times 61.3^{2} = 750\,000\ \mathrm{N / m},
\qquad k_{\text{per mount}} = 188\,000\ \mathrm{N / m},
\qquad W_{\text{per mount}} = 490\ \mathrm{N}.
$$
**Rocking mode.** With the mounts at the corners of a $0.8 \times 0.4\ \mathrm{m}$ pattern,
$$
I_G = \frac{m \left( L^{2} + w^{2} \right)}{12} = \frac{200 \times 0.80}{12} = 13.3\ \mathrm{kg\,m^{2}},
\qquad
k_\theta = 4 k_v \left( \frac{L}{2} \right)^{2} = 4 \times 188\,000 \times 0.16 = 120\,300\ \mathrm{N\,m / rad},
$$
$$
f_\theta = \frac{1}{2 \pi} \sqrt{\frac{120\,300}{13.3}} = 15.1\ \mathrm{Hz}.
$$
**Lateral mode.** Taking the horizontal mount rate as $0.6$ of the vertical,
$$
f_{\text{lat}} = 9.75 \sqrt{0.6} = 7.55\ \mathrm{Hz}.
$$

*Check.* $f_n = \left( 2 \pi \right)^{- 1} \sqrt{9.81 / 0.0026} = 9.77\ \mathrm{Hz}$ $\checkmark$

*Sanity.* Two millimetres six of deflection is well within a moulded rubber-metal mount, so the vertical isolation is easy — and the numbers that matter are the ones nobody asks for. The **lateral** mode at $7.55\ \mathrm{Hz}$ is the softest, and the horizontal component of a rotating unbalance sees it at $r = 24.2 / 7.55 = 3.2$, giving $T = 0.11$: acceptable, but only because the running speed happens to be high. The **start-up** is the problem, because the motor runs through $7.55\ \mathrm{Hz}$ at $453\ \mathrm{rpm}$ and through $9.75\ \mathrm{Hz}$ at $585\ \mathrm{rpm}$, and at each crossing the amplification is $1 / \left( 2 \zeta \right) = 10$. A machine that starts and stops daily spends its life in these crossings.
The rule that follows is the one every mount catalogue states in a footnote: check **all six** rigid-body modes, and check them against the **lowest** disturbing frequency the machine will ever see, not the highest. For a tall machine the warning is sharper still — a vertical pump $1.8\ \mathrm{m}$ high on the same mounts has a rocking mode near $2\ \mathrm{Hz}$, whose antinode at the top moves ten times the floor motion at $2\ \mathrm{Hz}$ and which is destabilised by the $m g h$ term of the raised centre of mass.
:::
:::

::: widget plot
f: sqrt(1+(2*0.05*x)^2)/sqrt((1-x^2)^2+(2*0.05*x)^2)
x: 0, 6
y: 0, 6
labels: \text{transmissibility } T
caption: Transmissibility against frequency ratio for a damping ratio of $0.05$, crossing unity at $r = \sqrt{2}$ and falling as $1 / \left( r^{2} - 1 \right)$ beyond. The crossing at $\sqrt{2}$ is independent of damping, and so is the general shape of the curve to its right — which is why an isolation specification is written as a frequency ratio, or equivalently as a static deflection, and never as a stiffness. Read the curve the other way: at $r = 2$ the transmissibility is $0.33$, at $r = 3$ it is $0.125$ and at $r = 5$ it is $0.04$, so the gain from $r = 2$ to $r = 3$ is a factor of $2.7$ while the gain from $r = 3$ to $r = 5$ is only $3.1$ for a $1.7$-fold increase in deflection. Beyond $r$ of about five, further softening buys little and the practical gains lie in reducing the force at source.
:::

::: example Isolation onto a flexible foundation {#ex-flexible-foundation}
A $100\ \mathrm{kg}$ machine is mounted on isolators giving $5\ \mathrm{Hz}$ vertical, and these are bolted to a $200\ \mathrm{kg}$ inertia block whose own mountings give $4\ \mathrm{Hz}$. Find the coupled natural frequencies and the force transmitted to the ground per newton of force applied to the machine.
::: solution
$$
k_1 = 100 \times \left( 2 \pi \times 5 \right)^{2} = 98\,700\ \mathrm{N / m},
\qquad
k_2 = 200 \times \left( 2 \pi \times 4 \right)^{2} = 126\,300\ \mathrm{N / m},
$$
and the two natural frequencies from
$$
\det \begin{pmatrix} k_1 - m_1 \omega^{2} & - k_1 \ - k_1 & k_1 + k_2 - m_2 \omega^{2} \end{pmatrix} = 0
$$
are $3.00\ \mathrm{Hz}$ and $6.67\ \mathrm{Hz}$. The transmitted force per newton of applied force is:

- at $1\ \mathrm{Hz}$: $1.15$ — worse than rigid
- at $3\ \mathrm{Hz}$: $800$ — the lower coupled mode, limited only by damping
- at $5\ \mathrm{Hz}$: $1.28$, with the **machine** amplitude reduced to almost nothing
- at $6.67\ \mathrm{Hz}$: the upper coupled mode, again a peak
- at $10\ \mathrm{Hz}$: $0.079$
- at $20\ \mathrm{Hz}$: $0.003$

*Check.* At $5\ \mathrm{Hz}$ the machine's own amplitude is $0.0028\ \mathrm{mm}$ against a static $0.010\ \mathrm{mm}$, the **antiresonance** at which the mount acts as a tuned absorber — the machine is still, and the foundation is moving. $\checkmark$

*Sanity.* Three things follow, and all three are seen in practice. First, the isolation does not begin at $\sqrt{2} \times 5 = 7.1\ \mathrm{Hz}$ but at the **upper coupled** frequency, and below it there is a region where the mount transmits **more** than a rigid fixing. Second, the lower coupled mode at $3\ \mathrm{Hz}$ is a monster: an eight-hundred-fold amplification of the transmitted force, which in a real system with five per cent damping is nearer forty but is still a design disaster waiting for a machine to idle through it. Third, at $5\ \mathrm{Hz}$ the machine is perfectly still and the foundation is nevertheless moving — the classic condition of a machine that "does not vibrate" and whose building does, and the reason vibration surveys are done at the **foundation** as well as at the machine.
:::
:::

## Mounts and their limitations

::: proposition Mount types {#prop-mount-types}
- **Solid rubber or rubber-to-metal:** cheap, no maintenance, loss factor $0.1$ to $0.2$, useful down to about $8\ \mathrm{mm}$ static deflection ($5\ \mathrm{Hz}$); creeps under sustained load and stiffens with age and cold.
- **Bonded shear mounts:** the rubber works in shear, giving a lower vertical rate for the same footprint and deflections to $20\ \mathrm{mm}$; the horizontal rate falls to a third of the vertical, which is often the weak direction.
- **Wire rope:** loss factor $0.02$ to $0.05$, deflections to $50\ \mathrm{mm}$, tolerant of oil, temperature and weather, and non-linear enough that the "rated" deflection must be checked on the actual load.
- **Steel spring:** deflections to $200\ \mathrm{mm}$ and beyond, loss factor under $0.01$, essentially no damping, and **no** horizontal stiffness to speak of — a spring-mounted machine must be restrained laterally or it walks.
- **Air spring:** deflection set by the air pressure rather than by the geometry, so a $50\,\mathrm{kPa}$ bag gives $100\ \mathrm{mm}$ and a $700\ \mathrm{kPa}$ one gives $7\ \mathrm{mm}$; the damping is nil and must be added externally through orifice dampers, and the whole system needs a compressor, a height valve and a leak rate.
- **Negative-stability and pendulum isolators:** mechanical arrangements that subtract stiffness, reaching $1\ \mathrm{Hz}$ and below for optical tables and metrology laboratories, at the cost of a lateral stiffness that goes **negative** with the vertical and must be restored by flexures.
:::

::: example Choosing a mount from a catalogue {#ex-mount-catalogue}
A catalogue offers a wire-rope mount rated at $50\ \mathrm{kg}$ with $12\ \mathrm{mm}$ deflection at that load. A $180\ \mathrm{kg}$ machine is to be carried on four of them. Find the natural frequency, the transmissibility at $1800\ \mathrm{rpm}$, and what goes wrong.
::: solution
$$
f_n = \frac{1}{2 \pi} \sqrt{\frac{9.81}{0.012}} = 4.55\ \mathrm{Hz},
\qquad
\omega = \frac{1800 \times 2 \pi}{60} = 188.5\ \mathrm{rad / s},
\qquad r = \frac{188.5}{28.6} = 6.59,
$$
$$
T \approx \frac{1}{r^{2} - 1} = \frac{1}{42.4} = 0.024,
\qquad \text{isolation} = 97.6\ \%.
$$
**What goes wrong.** Three things. The mount is rated at $50\ \mathrm{kg}$ and is being used at $45\ \mathrm{kg}$, which is fine; but wire-rope mounts are strongly non-linear, and the $12\ \mathrm{mm}$ figure is the **rated-load** deflection, not the $45\ \mathrm{kg}$ one, so the true frequency is higher than $4.55\ \mathrm{Hz}$. Second, four mounts must be loaded **equally**, and a machine whose centre of mass is not at the centre of the mount pattern puts two of them at twice the average — the deflections differ, the system couples, and the isolation degrades badly. Third, the horizontal rate of a wire-rope mount at this load is roughly a fifth of the vertical, so the lateral natural frequency is near $2\ \mathrm{Hz}$ and any horizontal disturbance at $4$ to $6\ \mathrm{Hz}$ — a nearby fan, a footstep, a door — is transmitted **amplified**.

*Sanity.* Ninety-eight per cent isolation on paper and a machine that still shakes its floor is the standard experience, and the reason is nearly always one of the three above rather than a fault in the arithmetic. The professional practice is to specify the mount by **load per mount** and by **deflection at that load**, to require the pattern to be centred on the centre of mass within a few per cent, and to state the lateral restraint. A machine on isolators with no restraint is a machine that will migrate: the walking of a spring-mounted compressor across a plant-room floor is one of the most common and most avoidable commissioning failures.
:::
:::

::: example The stinger {#ex-stinger}
A shaker is coupled to a structure whose dynamic stiffness at $100\ \mathrm{Hz}$ is $50\ \mathrm{kN / m}$, through an aluminium rod of $2\ \mathrm{mm}$ diameter. Find the rod length that introduces one per cent error, and the axial load at which it buckles.
::: solution
**Length.** The coupling rod must be much softer than the structure, so
$$
k_{\text{rod}} = 0.01 \times 50\,000 = 500\ \mathrm{N / m},
\qquad
L = \frac{E A}{k} = \frac{70 \times 10^{9} \times \pi \times 0.001^{2}}{500} = 440\ \mathrm{mm}.
$$
**Buckling.** With $I = \pi d^{4} / 64 = 7.85 \times 10^{- 13}\ \mathrm{m^{4}}$,
$$
P_{\text{cr}} = \frac{\pi^{2} E I}{L^{2}}
= \frac{\pi^{2} \times 70 \times 10^{9} \times 7.85 \times 10^{- 13}}{0.44^{2}}
= 2.8\ \mathrm{mN}.
$$
*Sanity.* Two millinewtons — the weight of a grain of rice. A stinger can therefore transmit essentially **no compression**, which is why every modal test uses a preloaded stinger with a soft spring pushing the rod into contact, or a "buckle strap" that takes the compression, and why the measured force is always a fraction of what the shaker's own force transducer reports. The whole art of force measurement on a structure is that the measuring element must be **infinitely soft** in the direction it measures, and any real element that is soft enough to measure the force is soft enough to buckle under it. This is why impedance heads, which measure the **acceleration** of a known seismic mass rather than the force directly, have largely replaced the stinger for field work, and why a hammer impact — where the contact force is measured by a load cell in the tip and the structure is never touched at all — is the most robust of the three.
:::
:::

::: proof The six rigid-body modes of a mount system {#proof-six-dof}
Let $n$ mounts at positions $\mathbf{r}_i$ relative to the centre of mass have diagonal stiffnesses $\mathbf{K}_i = \operatorname{diag} \left( k_{xi}, k_{yi}, k_{zi} \right)$. For a small displacement $\mathbf{u}$ and rotation $\boldsymbol{\theta}$ the displacement of mount $i$ is $\mathbf{u} + \boldsymbol{\theta} \times \mathbf{r}_i$, so the strain energy is
$$
V = \tfrac{1}{2} \sum_i \left( \mathbf{u} + \boldsymbol{\theta} \times \mathbf{r}_i \right)^{\mathrm{T}}
\mathbf{K}_i
\left( \mathbf{u} + \boldsymbol{\theta} \times \mathbf{r}_i \right) .
$$
Writing $\boldsymbol{\theta} \times \mathbf{r}_i = - \left[ \mathbf{r}_i \right]_{\times} \boldsymbol{\theta}$ and collecting terms in the generalised coordinates $\left( \mathbf{u}, \boldsymbol{\theta} \right)$,
$$
\begin{pmatrix} \mathbf{K}_{uu} & \mathbf{K}_{u\theta} \ \mathbf{K}_{\theta u} & \mathbf{K}_{\theta\theta} \end{pmatrix}
= \sum_i \begin{pmatrix} \mathbf{K}_i & - \mathbf{K}_i \left[ \mathbf{r}_i \right]_{\times} \ - \left[ \mathbf{r}_i \right]_{\times}^{\mathrm{T}} \mathbf{K}_i & \left[ \mathbf{r}_i \right]_{\times}^{\mathrm{T}} \mathbf{K}_i \left[ \mathbf{r}_i \right]_{\times} \end{pmatrix} .
$$
**Decoupling.** If the mounts are identical and arranged symmetrically about the centre of mass, then $\sum_i \left[ \mathbf{r}_i \right]_{\times} = 0$ because the $\mathbf{r}_i$ occur in equal and opposite pairs, and the off-diagonal block $\mathbf{K}_{u\theta} = - \mathbf{K} \sum_i \left[ \mathbf{r}_i \right]_{\times}$ vanishes. Translation and rotation then separate, and
$$
\omega_{\text{vert}} = \sqrt{\frac{n k_z}{m}}, \qquad
\omega_{\text{rock}} = \sqrt{\frac{\sum_i k_{zi} \, y_i^{2} + k_{yi} z_i^{2}}{I_{Gx}}},
$$
with the analogous expressions for the other axes. If the centre of mass is **not** at the centre of the pattern, the off-diagonal terms survive and the "vertical" mode is a mixture of bounce and pitch — which is why a machine whose centre of mass is unknown cannot be analysed by the arithmetic of Example 1 and must be measured. $\checkmark$

*Note.* The same algebra gives the **load sharing** of Example 5 as the static solution, and it is the reason a six-point mount system on a rigid baseframe is statically indeterminate: the mount loads depend on the relative stiffness of the frame and the mounts, and a frame that is not rigid will distribute the load quite differently from the rigid-body arithmetic.
:::

## Vibration measurement

::: example Seismic instruments {#ex-instruments}
A vibrometer with $f_n = 2\ \mathrm{Hz}$ and $\zeta = 0.6$ and an accelerometer with $f_n = 10\ \mathrm{kHz}$ and $\zeta = 0.7$ are used on a machine at $30\ \mathrm{Hz}$. Find the usable band of each and the error of the vibrometer at $30\ \mathrm{Hz}$.
::: solution
**Vibrometer.** Reads displacement for $r \gg 1$; at $30\ \mathrm{Hz}$, $r = 15$ and
$$
\frac{Z}{Y} = \frac{225}{\sqrt{224^{2} + 18^{2}}} = 1.0012 ,
$$
a $0.1$ per cent error. The lower limit, at one per cent error, is about $7\ \mathrm{Hz}$.
**Accelerometer.** Reads acceleration for $r \ll 1$; at $30\ \mathrm{Hz}$, $r = 0.003$ and the error is $\mathcal{O} \left( r^{2} \right)$, negligible. Its upper limit, at five per cent error with $\zeta = 0.7$, is about $0.4 f_n = 4\ \mathrm{kHz}$.
**Cross-over.** The vibrometer is useless below $6\ \mathrm{Hz}$ and the accelerometer useless below a few hertz if the signal is small; a $30\ \mathrm{Hz}$ machine is comfortably in both bands, which is why plant vibration is quoted in **velocity** — the quantity that both instruments can be made to measure well in the middle of their ranges.

*Sanity.* The choice of velocity as the plant-vibration currency is not a convention but a consequence: displacement is proportional to $1 / \omega$ and acceleration to $\omega$, so a spectrum containing equal **forces** over a band of frequencies shows a rising line in one and a falling line in the other, and only velocity is roughly flat. It is also why ISO 10816 quotes velocity: for a given force, the velocity — and hence the power carried — is what stays comparable across the speed range.
:::
:::

::: example Design {#ex-design-genset}
A $4500\ \mathrm{kg}$ diesel generator set running at $1500\ \mathrm{rpm}$ is to be mounted so that no more than ten per cent of the disturbing force reaches the building floor. Specify the mounts, check the rocking and lateral modes, and state what else must be flexible.
::: solution
**Frequency ratio and deflection.** $\omega = 157.1\ \mathrm{rad / s}$, $T = 0.10$, $\zeta = 0.1$:
$$
r = 3.66, \qquad
\delta_{\text{st}} = \frac{9.81 \times 3.66^{2}}{157.1^{2}} = 5.3\ \mathrm{mm},
\qquad f_n = 6.84\ \mathrm{Hz}.
$$
**Stiffness.**
$$
k_{\text{total}} = 4500 \times 42.9^{2} = 8.29 \times 10^{6}\ \mathrm{N / m},
\qquad k_{\text{per mount}} = 2.07 \times 10^{6}\ \mathrm{N / m},
\qquad W_{\text{per mount}} = 11\,040\ \mathrm{N}.
$$
**Rocking.** With a $3.6 \times 1.2\ \mathrm{m}$ mount pattern,
$$
I_G = \frac{4500 \times \left( 3.6^{2} + 1.2^{2} \right)}{12} = 5400\ \mathrm{kg\,m^{2}},
\qquad
k_\theta = 4 \times 2.07 \times 10^{6} \times 1.8^{2} = 2.68 \times 10^{7}\ \mathrm{N\,m / rad},
$$
$$
f_\theta = \frac{1}{2 \pi} \sqrt{\frac{2.68 \times 10^{7}}{5400}} = 11.2\ \mathrm{Hz}.
$$
**Lateral.** With $k_h = 0.5 k_v$,
$$
f_{\text{lat}} = 6.84 \sqrt{0.5} = 4.84\ \mathrm{Hz}.
$$
**Comment.** The rocking and lateral frequencies, $11.2$ and $4.8\ \mathrm{Hz}$, are both below the vertical $6.8\ \mathrm{Hz}$ in the sense that the lateral is, and both give good isolation at the running speed — the lateral at $r = 5.2$ transmits $3.9$ per cent. They **are** a problem for the engine's firing frequency at low speed during starting, for the building's own seismic motion, and for the $50\ \mathrm{Hz}$ and $100\ \mathrm{Hz}$ electrical components of the alternator's magnetic pull, which see $r$ of $10$ and $21$ and are transmitted at $1.3$ and $0.3$ per cent but which the building floor is often itself resonant in. The design therefore needs: lateral restraint or snubbers; a **flexible** exhaust with an expansion bellow and a flexible connection to the fuel and coolant circuits, since a rigid steel exhaust pipe is a spring of several hundred kilonewtons per metre and will short-circuit the mount completely; a flexible disc coupling between engine and alternator, rated for the $5\ \mathrm{mm}$ of angular and axial movement the mounts allow; and a baseframe stiff enough that its own bending mode is above $60\ \mathrm{Hz}$.

*Sanity.* The exhaust pipe is the item that defeats most real generator installations, and it is the general lesson: an isolation system is only as soft as its **softest** connection, and a generator set has fuel, coolant, air, exhaust, oil and electrical connections, every one of which leaves the baseframe and is bolted, clamped or bonded to the building somewhere. A single rigid conduit can carry more vibration than the mounts stop, and commissioning an isolated machine without measuring the connections is measuring the wrong thing.
:::
:::

::: history
The theory of isolation is simply the forced-oscillator transmissibility and appears in the same late-nineteenth-century literature; its **engineering** use begins with the resilient mounting of ship machinery in the First World War, where the motive was not comfort but the detection of submarines, and where the discovery that a resiliently mounted turbine still transmitted its vibration through the **raft** and the foundations led directly to the raft-mounting and floating-raft practice of the inter-war navy. The **air spring** was developed for rail vehicles in the 1930s and for precision applications after 1945; the **negative-stability** isolator, which uses a beam under end load to subtract stiffness, is due to the beam-column effect known since Euler and was applied to vibration isolation by Rossing and others in the 1960s, and the pendulum-and-negative-stability tables now used under electron microscopes and gravitational-wave instruments reach sub-hertz performance that would have seemed absurd to the wartime generation. The **loss factor** language of mount data sheets is borrowed from electrical engineering in the 1940s, and the **ISO 10816** severity zones that specify when a mounted machine is doing its job date from the 1970s.
:::

## Where this leads

The transmissibility derivation and the $\sqrt{2}$ boundary are in [[vibrations/harmonic-excitation]], the response to shocks and starts, where the transient through resonance is designed, is in [[vibrations/general-excitation]], and the absorber alternative to isolation, where the force is cancelled rather than deflected, is in [[vibrations/vibration-absorbers]]. The shaft and bearing side of rotating-machinery vibration is in [[machine-design/shafts]].

::: summary
- Transmissibility $T = \sqrt{\left[ 1 + \left( 2 \zeta r \right)^{2} \right] / \left[ \left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2} \right]}$ applies to force transmission and to motion transmission alike, and falls below unity only above $r = \sqrt{2}$.
- Isolation is specified as a **static deflection**, $\delta_{\text{st}} = g r^{2} / \omega^{2}$; adding mass does not improve it.
- Damping is essential through resonance and harmful in the isolation region, where $T \to 2 \zeta / r$ at high damping.
- The vertical mode is the easy one; the **rocking** and **lateral** modes are softer and must be checked against every disturbing frequency including the low ones.
- Mount types span $5\ \mathrm{mm}$ of deflection for solid rubber to $200\ \mathrm{mm}$ for a steel spring, with air springs set by pressure rather than geometry.
- An isolation system is only as soft as its stiffest connection — exhaust, piping, conduit, coupling and electrical containment all count.
:::

::: quiz
A machine is isolated with a mount that gives a frequency ratio of exactly $1.3$. Compared with mounting it rigidly, the vibration transmitted to the floor is:
- [ ] Reduced, because any resilient mount reduces transmission
- [x] Increased, because the frequency ratio is below $\sqrt{2}$
- [ ] Unchanged, because transmissibility is unity below resonance
- [ ] Reduced only if the damping is high enough
::: solution
The transmissibility crosses unity at $r = \sqrt{2} = 1.414$ **whatever the damping**, so at $r = 1.3$ the mount transmits **more** force than a rigid connection would. At $r = 1.3$ with $\zeta = 0.05$ the transmissibility is $1.74$ — the isolation has made the problem $74$ per cent worse. This is the single most common error in the field, because a mount that is "soft" always feels like an improvement and is measured to be one only above $\sqrt{2}$ times its own natural frequency. The corollary is that a machine started and stopped often, or one run at variable speed, spends part of every cycle in the amplification region, and that the correct remedy there is not a softer mount but a **switched** one: an air spring that is inflated to full stiffness during the run-up and then lowered onto the soft part of its curve, or a resilient mount with a deliberate mechanical stop that bypasses it at low speed.
:::
:::

## Exercises

::: exercise Transmissibility {level=1 check="0.2"}
Find the transmissibility at $r = 2.45$ with negligible damping.
::: solution
$T \approx 1 / \left( r^{2} - 1 \right) = 1 / 5 = 0.20$.
:::
:::

::: exercise Deflection {level=1 check="0.00248"}
What static deflection gives a natural frequency of $10\ \mathrm{Hz}$?
::: solution
$\delta_{\text{st}} = g / \omega_n^{2} = 9.81 / 3948 = 2.48\ \mathrm{mm}$.
*Note.* The answer to enter is $2.48\ \mathrm{mm}$, that is $0.00248\ \mathrm{m}$.
:::
:::

::: exercise Isolation {level=1 check="66.7"}
A mount gives a frequency ratio of $2$ at negligible damping. What is the isolation efficiency in per cent?
::: solution
$T = 1 / 3$, so the isolation is $1 - 1 / 3 = 66.7\ \%$.
*Note.* The answer to enter is $66.7$.
:::
:::

::: exercise Damping {level=2}
For the motor of Example 1, the mount damping is increased from $0.05$ to $0.2$ by using a constrained-layer mount. Find the new required deflection for the same eighty per cent isolation, and the transmissibility at twice the operating speed.
::: solution
$$
\zeta = 0.2, \ T = 0.2 : \quad r = 2.94, \qquad
\delta_{\text{st}} = \frac{9.81 \times 2.94^{2}}{151.8^{2}} = 3.7\ \mathrm{mm}.
$$
At twice the speed, $r = 5.87$:
$$
T = \frac{\sqrt{1 + 5.51}}{\sqrt{28.86^{2} + 5.51}} = \frac{2.552}{28.96} = 0.088 ,
$$
against $0.042$ for the lightly damped mount at the same frequency ratio.
*Sanity.* The extra damping costs forty per cent more deflection to achieve the same isolation and more than doubles the transmitted force at twice the speed. It buys one thing: the resonance peak falls from $1 / \left( 2 \times 0.05 \right) = 10$ to $1 / \left( 2 \times 0.2 \right) = 2.5$, so the machine's travel through the resonance on starting falls from ten static deflections to two and a half. That is usually the deciding consideration, and it is why mount damping is chosen for the **start-up** and the isolation is then accepted at whatever deflection results.
:::
:::

::: exercise Rocking {level=2}
For the machine of Example 1, the centre of mass lies $60\ \mathrm{mm}$ off the centre of the $800\ \mathrm{mm}$ mount pattern along the long axis. Find the load and the static deflection of each of the front and rear mounts.
::: solution
Taking moments about the transverse centreline, the front pair carries the fraction $\left( 0.4 + 0.06 \right) / 0.8 = 0.575$ of the weight and the rear pair $0.425$. With $W = 200 \times 9.81 = 1962\ \mathrm{N}$,
$$
W_{\text{front, per mount}} = \frac{0.575 \times 1962}{2} = 564\ \mathrm{N},
\qquad
W_{\text{rear, per mount}} = \frac{0.425 \times 1962}{2} = 417\ \mathrm{N},
$$
$$
\delta_{\text{front}} = \frac{564}{188\,000} = 3.0\ \mathrm{mm}, \qquad
\delta_{\text{rear}} = \frac{417}{188\,000} = 2.2\ \mathrm{mm}.
$$
*Sanity.* A $60\ \mathrm{mm}$ eccentricity — three per cent of the pattern length — tilts the machine by $0.8\ \mathrm{mm}$ across $800\ \mathrm{mm}$, or one milliradian, and puts the front mounts at $35$ per cent more deflection than the rear. The machine then stands out of level, the rocking natural frequency is shifted, and if the eccentricity is **rotating** — an unbalanced rotor mounted off-centre — the four mounts work at different points on their non-linear load-deflection curves and generate harmonics that were never in the rotor. This is why mount patterns are centred on the centre of mass, and why a machine whose centre of mass moves with load, such as a press with a travelling ram or a crane hoist, is a harder isolation problem than the arithmetic suggests.
:::
:::

::: exercise Measurement {level=2}
A vibrometer with $f_n = 1\ \mathrm{Hz}$ and $\zeta = 0.7$ records a relative amplitude of $0.8\ \mathrm{mm}$ at $10\ \mathrm{Hz}$. Find the true amplitude, and the error if the same instrument is used at $1.5\ \mathrm{Hz}$.
::: solution
At $10\ \mathrm{Hz}$, $r = 10$:
$$
\frac{Z}{Y} = \frac{100}{\sqrt{99^{2} + 14^{2}}} = \frac{100}{100.0} = 1.0002 ,
$$
so the reading is correct to two hundredths of one per cent and $Y = 0.80\ \mathrm{mm}$.
At $1.5\ \mathrm{Hz}$, $r = 1.5$:
$$
\frac{Z}{Y} = \frac{2.25}{\sqrt{1.5625 + 4.41}} = \frac{2.25}{2.444} = 0.921 ,
$$
a $- 7.9$ per cent error.
*Sanity.* A heavily damped vibrometer is remarkably accurate even at $r = 1.5$, which surprises everyone who has been taught the "three times natural frequency" rule — that rule is written for **lightly** damped instruments, whose $Z / Y$ curve has a resonance peak near $r = 1$ and only settles to unity well above it. A damped instrument trades a flat response for a **low** one: at $r = 1.5$ it reads $92$ per cent instead of $112$ per cent, and the calibration factor must be taken from the curve rather than assumed. This is why a displacement pickup's data sheet gives a tabulated correction against frequency, and why using one outside its specified band is not a matter of reduced accuracy but of an unknown one.
:::
:::

::: exercise Design {level=3}
An optical table of mass $300\ \mathrm{kg}$, including its payload, must have a vertical natural frequency of $1\ \mathrm{Hz}$ and must attenuate a $50\ \mathrm{Hz}$ floor vibration of $0.5\ \mu \mathrm{m}$ amplitude to below $0.01\ \mu \mathrm{m}$. Propose a system and check it.
::: solution
**Deflection.**
$$
\delta_{\text{st}} = \frac{9.81}{\left( 2 \pi \right)^{2}} = 0.248\ \mathrm{m} = 248\ \mathrm{mm},
\qquad
k_{\text{total}} = 300 \times 39.5 = 11\,850\ \mathrm{N / m},
$$
**Attenuation check.** At $50\ \mathrm{Hz}$, $r = 50$ and
$$
T \approx \frac{1}{r^{2} - 1} = 4.0 \times 10^{- 4},
\qquad X = 0.5 \times 4.0 \times 10^{- 4} = 0.0002\ \mu \mathrm{m},
$$
comfortably below the $0.01\ \mu \mathrm{m}$ requirement.
**Mount type.** A plain air bellows has a vertical stiffness $k = \gamma P A^{2} / V$, so six isolators of $1970\ \mathrm{N / m}$ each at a supply pressure of $400\ \mathrm{kPa}$ need
$$
V = \frac{\gamma P A^{2}}{k}
= \frac{1.33 \times 400\,000 \times 0.025^{2}}{1970} = 0.17\ \mathrm{m^{3}}
$$
per isolator — a gas reservoir the size of a domestic hot-water cylinder under each corner of the table. That is why commercial optical-table isolators do not use a plain bellows but a **rolling-lobe** or **negative-stability** air spring, in which the bellows acts on a pivoted lever whose geometry subtracts stiffness, reaching $1\ \mathrm{Hz}$ from a compact package. The lateral direction is separately stiffened by flexural guides, because a pure $1\ \mathrm{Hz}$ vertical isolator has a lateral frequency of the same order and would be hopelessly soft.
**Lateral check.** A pure pendulum at $1\ \mathrm{Hz}$ vertical has a lateral frequency of the same order and would be hopelessly soft; the real table adds flexural guides that stiffen the lateral direction to $5$ to $10\ \mathrm{Hz}$ while leaving the vertical near $1\ \mathrm{Hz}$.

*Design comment.* The attenuation requirement is trivially met — $50\ \mathrm{Hz}$ against a $1\ \mathrm{Hz}$ isolator is $r = 50$ and $T = 4 \times 10^{- 4}$ — and the whole difficulty is elsewhere: the **resonance** at $1\ \mathrm{Hz}$, where an unattenuated floor motion of $0.5\ \mu \mathrm{m}$ becomes $0.5 / \left( 2 \zeta \right)$, which at $\zeta = 0.05$ is $5\ \mu \mathrm{m}$, five hundred times the specification. Optical tables therefore carry **active** damping at the resonance, or use a loss factor near $0.3$ at the resonant frequency only. The second real difficulty is the horizontal, and the third is that a person walking on the table applies a force of several hundred newtons at $2\ \mathrm{Hz}$, which is at the resonance: hence the rule that you do not lean on an optical table, and hence the floating floor and the separate pier that a serious metrology laboratory builds.
:::
:::

::: exercise Derivation {level=3}
Show that the **stroke** of an isolator under support motion tends to the support amplitude at high frequency, and use this to find the required isolator travel for the generator set of Example 6 if the building floor moves $2\ \mathrm{mm}$ at $25\ \mathrm{Hz}$ and $8\ \mathrm{mm}$ at $1\ \mathrm{Hz}$.
::: solution
**Stroke.** The relative displacement is
$$
\frac{Z}{Y} = \frac{r^{2}}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}} \longrightarrow 1
\quad \text{as } r \to \infty,
$$
so at high frequency the mass stays still and the **whole** support motion appears across the isolator.
**At $25\ \mathrm{Hz}$.** $r = 25 / 6.84 = 3.66$,
$$
\frac{Z}{Y} = \frac{13.4}{\sqrt{153.8 + 0.535}} = 1.08,
\qquad Z = 2 \times 1.08 = 2.2\ \mathrm{mm}.
$$
**At $1\ \mathrm{Hz}$.** $r = 0.146$,
$$
\frac{Z}{Y} = \frac{0.0213}{\sqrt{0.9577 + 0.00085}} = 0.0218,
\qquad Z = 8 \times 0.0218 = 0.17\ \mathrm{mm}.
$$
**Near resonance.** At $r = 1$ with $\zeta = 0.1$, $Z / Y = 1 / \left( 2 \zeta \right) = 5$, so a floor motion of $8\ \mathrm{mm}$ near $6.8\ \mathrm{Hz}$ would produce a stroke of $40\ \mathrm{mm}$.

*Comment.* The design conclusion is the counter-intuitive one: the isolator's travel is **not** set by the motion it is isolating, but by the motion at its own natural frequency, where the stroke is $1 / \left( 2 \zeta \right)$ times the support amplitude. A generator set on $5\ \mathrm{mm}$ mounts standing on a floor that moves $8\ \mathrm{mm}$ at $7\ \mathrm{Hz}$ will hit its bump stops, and the bump stop then transmits the force directly, defeating the isolation completely. Hence the standard specification: isolators are chosen with a **static deflection plus a travel allowance** of at least the expected resonance-amplified motion, and snubbers or travel limiters are fitted that restrain the machine without touching it in normal operation. The same argument sets the size of the seismic restraints on an isolated pipe run, and it is why base-isolated buildings have a visible gap at their perimeter — the isolation is designed for the earthquake, and the earthquake moves the building by more than the isolator's elastic range.
:::
:::
