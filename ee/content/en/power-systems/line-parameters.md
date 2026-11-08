Look at a high-voltage tower and you will see three phases, each made of two, three or four conductors held apart by spacers, strung from insulator strings metres long, with one or two thinner earth wires at the top. Every one of these choices, the conductor material, its diameter, the number of conductors in a bundle, the distances between phases, fixes the four quantities that describe the line electrically: its **series resistance** and **inductance**, and its **shunt capacitance** and **conductance**, all per unit length. These parameters decide how much power the line can carry, how much its voltage drops, how much reactive power it generates, and how fault currents flow through it.

In this chapter we derive the parameters from first principles. Resistance comes from the material and the cross-section, corrected for temperature and frequency. Inductance comes from Ampère's law ([[electromagnetics/magnetostatics]]): we compute the flux linking a conductor, first inside it and then outside, and assemble the results into formulas for single-phase and three-phase lines that depend only on two geometric means, the **geometric mean distance** between phases and the **geometric mean radius** of each phase. Capacitance comes from Gauss's law ([[electromagnetics/electrostatics]]) by exactly parallel reasoning. Along the way we see why lines are transposed and why extra-high-voltage lines use bundled conductors. The results feed straight into the line models of [[power-systems/line-models]].

## Conductors and resistance

Overhead conductors are stranded: many round wires twisted in concentric layers, which makes a cable flexible enough to string. The standard type is **ACSR** (aluminium conductor, steel reinforced): a core of steel strands for strength surrounded by layers of aluminium strands that carry nearly all of the current. All-aluminium alloy conductors (AAAC) and high-temperature low-sag conductors with composite cores are also used. Aluminium has about $61\,\%$ of the conductivity of copper but less than a third of its density, so for the same resistance an aluminium conductor weighs about half as much; for overhead lines that decides the matter. Underground cables use copper or aluminium with solid insulation (XLPE).

::: definition Line parameters per unit length {#def-line-parameters}
A transmission line is described per phase and per unit length by four **distributed parameters**: series resistance $r$ ($\Omega/\mathrm{m}$), series inductance $l$ ($\mathrm{H/m}$), shunt capacitance $c$ ($\mathrm{F/m}$) to neutral, and shunt conductance $g$ ($\mathrm S/\mathrm m$) to neutral. At angular frequency $\omega$ the series impedance and shunt admittance per unit length are
$$
z = r + j\omega l,\qquad y = g + j\omega c.
$$ {#eq-zy}
For overhead lines $g$, which represents leakage over insulators and corona loss, is very small and normally neglected.
:::

The DC resistance of a conductor of length $\ell$ and cross-section $A$ is $R_{\text{dc}} = \rho\ell/A$, with $\rho$ the resistivity. Three corrections bring it to the value used in line calculations.

- **Stranding.** The outer strands spiral around the core, so each is $1$ to $2\,\%$ longer than the conductor.
- **Temperature.** Over the normal range resistance is linear in temperature: $R_2/R_1 = (T + T_2)/(T + T_1)$, where $T$ is the temperature at which the extrapolated resistance vanishes, about $228\,^\circ\mathrm C$ for hard-drawn aluminium and $234.5\,^\circ\mathrm C$ for annealed copper. Lines run at $50$ to $100\,^\circ\mathrm C$, so this is a correction of $20$ to $30\,\%$.
- **Skin effect.** Alternating current crowds towards the surface of a conductor, reducing the effective cross-section. At $50$ or $60\,\mathrm{Hz}$ the skin depth in aluminium is about $12\,\mathrm{mm}$, so for conductors of $25$ to $40\,\mathrm{mm}$ diameter the AC resistance is a few percent higher than the DC value. (Steel cores carry so little current that their magnetic losses are small, except in single-layer ACSR.)

Manufacturers tabulate AC resistance at standard temperatures, and in practice we read it from a table.

::: example Resistance of an aluminium conductor {#ex-resistance}
An aluminium conductor has an effective aluminium cross-section of $400\,\mathrm{mm^2}$. With $\rho = 2.83\times10^{-8}\,\Omega\,\mathrm m$ at $20\,^\circ\mathrm C$, a stranding allowance of $2\,\%$ and $T = 228\,^\circ\mathrm C$, find its DC resistance per kilometre at $20\,^\circ\mathrm C$ and at $75\,^\circ\mathrm C$. What is the resistance per phase of a $150\,\mathrm{km}$ line using one such conductor per phase at $75\,^\circ\mathrm C$, allowing $2\,\%$ more for skin effect?
::: solution
At $20\,^\circ\mathrm C$: $R = 1.02\times2.83\times10^{-8}\times1000/(400\times10^{-6}) = 0.0722\,\Omega/\mathrm{km}$. At $75\,^\circ\mathrm C$: $R = 0.0722\times(228 + 75)/(228 + 20) = 0.0722\times1.222 = 0.0882\,\Omega/\mathrm{km}$. With skin effect, $0.0899\,\Omega/\mathrm{km}$, so a $150\,\mathrm{km}$ line has $13.5\,\Omega$ per phase. The temperature correction is ten times as large as the skin-effect correction; line ratings and losses are always calculated at a specified conductor temperature.
:::
:::

## Inductance from flux linkage

The inductance of a circuit is its flux linkage per ampere, $L = \lambda/I$. For a long straight conductor the field is two-dimensional, and we compute flux linkages per unit length. The current is assumed uniformly distributed (skin effect neglected) and the conductor non-magnetic.

::: theorem Flux linkage of a single round conductor {#thm-flux-single}
A long straight round conductor of radius $r$ carries current $I$ uniformly distributed over its cross-section. Per unit length, (a) the flux linkage due to the field inside the conductor is
$$
\lambda_{\text{int}} = \frac{\mu_0 I}{8\pi},
$$ {#eq-lambda-int}
and (b) the flux linkage due to the field between radii $D_1$ and $D_2$ outside the conductor ($r\le D_1 < D_2$) is
$$
\lambda_{12} = \frac{\mu_0 I}{2\pi}\ln\frac{D_2}{D_1}.
$$ {#eq-lambda-ext}
:::

::: proof
*Inside.* By Ampère's law on a circle of radius $x < r$, the enclosed current is $I x^2/r^2$, so $H_x = Ix/(2\pi r^2)$ and $B_x = \mu_0Ix/(2\pi r^2)$. The flux in a tube of thickness $\mathrm dx$ and unit length is $\mathrm d\Phi = B_x\,\mathrm dx$, but it links only the fraction $x^2/r^2$ of the current. Counting flux linkage as flux times the fraction of current linked,
$$
\lambda_{\text{int}} = \int_0^r \frac{x^2}{r^2}\,\frac{\mu_0Ix}{2\pi r^2}\,\mathrm dx = \frac{\mu_0I}{2\pi r^4}\cdot\frac{r^4}{4} = \frac{\mu_0I}{8\pi}.
$$
It is independent of the radius.

*Outside.* For $x\ge r$ the whole current is enclosed, $B_x = \mu_0I/(2\pi x)$, and each tube links all of it:
$$
\lambda_{12} = \int_{D_1}^{D_2}\frac{\mu_0I}{2\pi x}\,\mathrm dx = \frac{\mu_0I}{2\pi}\ln\frac{D_2}{D_1}.
$$
:::

The flux linkage from the centre out to a distance $D$ is the sum, $\frac{\mu_0I}{2\pi}\bigl(\tfrac14 + \ln\frac Dr\bigr)$. The two terms combine neatly if we write $\tfrac14 = \ln e^{1/4}$:
$$
\lambda = \frac{\mu_0I}{2\pi}\ln\frac{D}{r e^{-1/4}} = \frac{\mu_0I}{2\pi}\ln\frac{D}{r'}.
$$

::: definition Geometric mean radius {#def-gmr}
The **geometric mean radius** (GMR) $D_s$ of a conductor is the radius of a fictitious thin-walled tube, carrying the same current, that has the same total flux linkage as the conductor. For a solid round conductor of radius $r$, $D_s = r' = re^{-1/4} = 0.7788\,r$. For stranded and composite conductors $D_s$ is computed from the strand geometry (see [[#thm-composite]]) and tabulated by manufacturers; for typical ACSR it is about $0.75$ to $0.82$ times the outside radius.
:::

### Single-phase line

::: theorem Inductance of a single-phase two-wire line {#thm-l-single-phase}
Two parallel round conductors of GMR $D_s$, a distance $D$ apart (centre to centre, $D\gg r$), carry currents $I$ and $-I$. The inductance of the loop per unit length is
$$
L = \frac{\mu_0}{\pi}\ln\frac{D}{D_s},
$$ {#eq-l-loop}
and each conductor contributes half, $\frac{\mu_0}{2\pi}\ln(D/D_s)$.
:::

::: proof
Consider the flux linking conductor 1 out to a distant point $P$ at distance $D_{1P}$ from conductor 1 and $D_{2P}$ from conductor 2. By [[#thm-flux-single]] and the definition of $D_s$, conductor 1's own current contributes $\frac{\mu_0I}{2\pi}\ln(D_{1P}/D_s)$. The field of conductor 2 consists of circles about conductor 2; those of radius less than $D$ do not encircle conductor 1, while those between radii $D$ and $D_{2P}$ do (treating conductor 1 as thin compared with $D$). So conductor 2 contributes $\frac{\mu_0(-I)}{2\pi}\ln(D_{2P}/D)$. Adding,
$$
\lambda_1 = \frac{\mu_0I}{2\pi}\left(\ln\frac{D_{1P}}{D_s} - \ln\frac{D_{2P}}{D}\right) = \frac{\mu_0I}{2\pi}\left(\ln\frac{D}{D_s} + \ln\frac{D_{1P}}{D_{2P}}\right).
$$
Letting $P$ recede to infinity, $D_{1P}/D_{2P}\to1$, so $\lambda_1 = \frac{\mu_0I}{2\pi}\ln(D/D_s)$. By symmetry $\lambda_2 = -\lambda_1$ for current $-I$, and the loop flux linkage per ampere is $L = (\lambda_1 - \lambda_2)/I = \frac{\mu_0}{\pi}\ln(D/D_s)$.
:::

With $\mu_0 = 4\pi\times10^{-7}\,\mathrm{H/m}$, $\mu_0/(2\pi) = 2\times10^{-7}\,\mathrm{H/m} = 0.2\,\mathrm{mH/km}$. The logarithm varies slowly, so inductances of overhead lines are remarkably similar: about $1$ to $1.3\,\mathrm{mH/km}$ per conductor for single conductors, giving reactances of $0.3$ to $0.5\,\Omega/\mathrm{km}$ at $50$ or $60\,\mathrm{Hz}$.

::: widget contour
f: ln(((x + 1)^2 + y^2)/((x - 1)^2 + y^2))
x: -3, 3
y: -2, 2
levels: 20
point: 0, 1
caption: Two conductors at $x = \pm1$ carrying opposite currents (or opposite line charges). The level curves of this function are the equipotentials of the line charges, the circles of Apollonius, and the gradient at the movable point gives the direction of the electric field. The same function, read as a magnetic vector potential $A_z$, has level curves that are the magnetic field lines of the two currents. Drag the point between the conductors and outside them: the field is strongest between the wires, and the flux between the two conductors is what makes up the loop inductance.
:::

## Three-phase lines

### Composite conductors and the geometric means

Stranded conductors and bundles are **composite conductors**: groups of parallel filaments that share a current. The single-phase argument extends by superposition.

::: theorem Inductance of composite conductors {#thm-composite}
Let conductor X consist of $n$ identical parallel filaments, each carrying $I/n$, and the return conductor Y of $m$ identical filaments, each carrying $-I/m$. The inductance of conductor X per unit length is
$$
L_X = \frac{\mu_0}{2\pi}\ln\frac{D_m}{D_s},\qquad D_m = \Bigl(\prod_{i\in X}\prod_{k\in Y} D_{ik}\Bigr)^{1/(nm)},\quad D_s = \Bigl(\prod_{i\in X}\prod_{j\in X} D_{ij}\Bigr)^{1/n^2},
$$ {#eq-composite}
where $D_{ii} = r_i'$ is the GMR of filament $i$ itself. $D_m$ is the **geometric mean distance** (GMD) between the conductors and $D_s$ the GMR of conductor X.
:::

::: proof
Applying the single-filament results to filament $a$ of X, as in [[#thm-l-single-phase]] with a distant point at infinity, every filament $j$ of X contributes $\frac{\mu_0}{2\pi}\frac In\ln\frac1{D_{aj}}$ and every filament $k$ of Y contributes $-\frac{\mu_0}{2\pi}\frac Im\ln\frac1{D_{ak}}$ (the terms in $\ln D_{\cdot P}$ cancel as $P\to\infty$ because the total current is zero). So
$$
\lambda_a = \frac{\mu_0I}{2\pi}\ln\frac{\bigl(\prod_k D_{ak}\bigr)^{1/m}}{\bigl(\prod_j D_{aj}\bigr)^{1/n}}.
$$
Filament $a$ carries $I/n$, so its inductance is $L_a = \lambda_a/(I/n)$. The $n$ filaments are in parallel; if they have nearly equal inductances, the inductance of the parallel group is their average divided by $n$: $L_X = \frac1{n^2}\sum_a L_a = \frac1n\sum_a\lambda_a/I$. Averaging the logarithms over $a$ turns the products into the geometric means of [[#eq-composite]].
:::

The assumption that the current divides equally is accurate when the filaments are close together compared with $D_m$, which is the situation for strands and bundles.

### Transposition and the GMD

In a three-phase line the phases are generally not equidistant: on a horizontal tower the middle phase is closer to both outer phases than they are to each other. The flux linkages then differ between phases, and so do their inductances, which would unbalance the line. The remedy is **transposition**: each phase occupies each of the three positions for one third of the length, the conductors being exchanged at transposition towers.

::: theorem Inductance of a transposed three-phase line {#thm-l-three-phase}
A three-phase line with phase conductors of GMR $D_s$ at mutual distances $D_{12}$, $D_{23}$, $D_{31}$, completely transposed and carrying balanced currents, has the same inductance per phase in each phase,
$$
L = \frac{\mu_0}{2\pi}\ln\frac{D_{\text{eq}}}{D_s},\qquad D_{\text{eq}} = \sqrt[3]{D_{12}D_{23}D_{31}}.
$$ {#eq-l-3ph}
For an equilateral spacing $D$, $D_{\text{eq}} = D$ and no transposition is needed.
:::

::: proof
Use [[#thm-flux-single]] with a far point, as in [[#thm-l-single-phase]]; since $I_a + I_b + I_c = 0$, the far-point terms cancel and the flux linkage of phase $a$ in position 1 (with $b$ in 2, $c$ in 3) is
$$
\lambda_{a1} = \frac{\mu_0}{2\pi}\left(I_a\ln\frac1{D_s} + I_b\ln\frac1{D_{12}} + I_c\ln\frac1{D_{13}}\right).
$$
In the second and third sections phase $a$ occupies positions 2 and 3, with the other phases rotated accordingly, giving the same expression with the distances permuted. The average over the three sections is
$$
\lambda_a = \frac{\mu_0}{2\pi}\cdot\frac13\left(3I_a\ln\frac1{D_s} + (I_b + I_c)\ln\frac1{D_{12}D_{23}D_{31}}\right).
$$
Putting $I_b + I_c = -I_a$ gives $\lambda_a = \frac{\mu_0I_a}{2\pi}\ln\bigl(\sqrt[3]{D_{12}D_{23}D_{31}}/D_s\bigr)$, so $L = \lambda_a/I_a$ is [[#eq-l-3ph]]. The same holds for $b$ and $c$.
:::

### Bundled conductors

Above about $220\,\mathrm{kV}$ each phase is usually a **bundle** of two, three or four subconductors held $30$ to $50\,\mathrm{cm}$ apart. Treating the bundle as a composite conductor with [[#eq-composite]], and with $d \ll D_{\text{eq}}$, its GMR is
$$
D_s^b = \sqrt{D_s d}\ \ (\text{2 subconductors}),\qquad D_s^b = \sqrt[3]{D_s d^2}\ \ (\text{3, triangle}),\qquad D_s^b = 1.09\sqrt[4]{D_s d^3}\ \ (\text{4, square}),
$$ {#eq-bundle-gmr}
with $d$ the spacing between adjacent subconductors. (For the square, the diagonal is $\sqrt2 d$, and $(\sqrt2)^{1/4} = 2^{1/8} = 1.09$.) Bundling increases the effective radius from about a centimetre to $10$ to $25\,\mathrm{cm}$, which lowers the inductance by roughly a third. More importantly, it lowers the electric field at the conductor surface for a given voltage, which suppresses **corona**, the partial breakdown of air that causes power loss, audible noise and radio interference.

::: example Reactance of a 132 kV line {#ex-132kv}
A $132\,\mathrm{kV}$, $50\,\mathrm{Hz}$, completely transposed three-phase line has its conductors in a horizontal row with $4\,\mathrm m$ between adjacent phases. Each phase is one ACSR conductor of outside radius $14.07\,\mathrm{mm}$ and tabulated GMR $11.4\,\mathrm{mm}$. Find the inductance and reactance per kilometre.
::: solution
The distances are $4$, $4$ and $8\,\mathrm m$, so $D_{\text{eq}} = \sqrt[3]{4\times4\times8} = 5.040\,\mathrm m$. By [[#eq-l-3ph]],
$$
L = 2\times10^{-7}\ln\frac{5.040}{0.0114} = 2\times10^{-7}\times6.091 = 1.218\times10^{-6}\,\mathrm{H/m} = 1.218\,\mathrm{mH/km},
$$
and $X = 2\pi\times50\times1.218\times10^{-3} = 0.383\,\Omega/\mathrm{km}$. Note that the tabulated GMR is $0.81r$, not the $0.7788r$ of a solid conductor, because the current in a stranded conductor is concentrated in the outer aluminium layers.
:::
:::

::: warning GMR for inductance, outside radius for capacitance
The GMR $D_s$ accounts for the magnetic flux *inside* the conductor. The electric field inside a conductor is zero, so capacitance calculations use the **actual outside radius** $r$ (or, for bundles, [[#eq-bundle-gmr]] with $r$ in place of $D_s$). Using $D_s$ in the capacitance formula, or $r$ in the inductance formula, gives errors of a few percent that are easy to overlook because the results still look plausible.
:::

## Capacitance from Gauss's law

The charges on the conductors of a line, alternating at the supply frequency, give a shunt capacitance between conductors and to earth. The derivation mirrors that for inductance.

::: theorem Potential difference due to a line charge {#thm-line-charge}
A long straight conductor with charge $q$ per unit length, in air, produces between two points at distances $D_1$ and $D_2$ from its axis the potential difference
$$
V_{12} = V_1 - V_2 = \frac{q}{2\pi\varepsilon_0}\ln\frac{D_2}{D_1}.
$$ {#eq-v-line-charge}
:::

::: proof
By Gauss's law on a coaxial cylinder of radius $x$ and unit length, $E_x\cdot2\pi x = q/\varepsilon_0$, so $E_x = q/(2\pi\varepsilon_0x)$, directed radially. The potential difference is the line integral of $\mathbf E$ from point 1 to point 2 along a radial path (the field is conservative, so any path gives the same result): $V_{12} = \int_{D_1}^{D_2}E_x\,\mathrm dx = \frac q{2\pi\varepsilon_0}\ln(D_2/D_1)$.
:::

::: theorem Capacitance of single-phase and three-phase lines {#thm-capacitance}
For a two-wire line of conductor radius $r$ and spacing $D\gg r$, the capacitance between the conductors per unit length is $C_{ab} = \pi\varepsilon_0/\ln(D/r)$, and the capacitance of each conductor to the neutral plane midway between them is twice that. For a completely transposed three-phase line with balanced charges,
$$
C_n = \frac{2\pi\varepsilon_0}{\ln(D_{\text{eq}}/r)}
$$ {#eq-c-3ph}
per phase to neutral, with $D_{\text{eq}} = \sqrt[3]{D_{12}D_{23}D_{31}}$; for bundles, $r$ is replaced by the bundle's equivalent radius from [[#eq-bundle-gmr]] with $r$ in place of $D_s$.
:::

::: proof
*Two wires.* With charges $q$ and $-q$, superposing [[#eq-v-line-charge]] for both charges between the surfaces of the two conductors gives $V_{ab} = \frac q{2\pi\varepsilon_0}\ln\frac Dr - \frac{q}{2\pi\varepsilon_0}\ln\frac rD = \frac q{\pi\varepsilon_0}\ln\frac Dr$, so $C_{ab} = q/V_{ab} = \pi\varepsilon_0/\ln(D/r)$. By symmetry the midplane is at half the voltage, so to neutral $C_n = 2C_{ab}$.

*Three phases.* With $q_a + q_b + q_c = 0$, the voltage between phases $a$ and $b$ in the first transposition section is
$$
V_{ab} = \frac1{2\pi\varepsilon_0}\left(q_a\ln\frac{D_{12}}{r} + q_b\ln\frac r{D_{12}} + q_c\ln\frac{D_{23}}{D_{13}}\right).
$$
Averaging over the three sections (assuming, as for inductance, the same charge in each section, which is very nearly true) gives $V_{ab} = \frac1{2\pi\varepsilon_0}\bigl(q_a\ln\frac{D_{\text{eq}}}{r} + q_b\ln\frac r{D_{\text{eq}}}\bigr)$, and similarly $V_{ac}$. Adding, $V_{ab} + V_{ac} = 3V_{an}$ for balanced voltages, while the right-hand side becomes $\frac1{2\pi\varepsilon_0}\bigl(2q_a\ln\frac{D_{\text{eq}}}r - (q_b + q_c)\ln\frac{D_{\text{eq}}}r\bigr) = \frac{3q_a}{2\pi\varepsilon_0}\ln\frac{D_{\text{eq}}}r$. Hence $C_n = q_a/V_{an}$ is [[#eq-c-3ph]].
:::

With $2\pi\varepsilon_0 = 55.6\,\mathrm{pF/m}$, overhead lines have $8$ to $14\,\mathrm{nF/km}$ per phase, a susceptance of roughly $3$ to $4.5\,\mu\mathrm S/\mathrm{km}$. Note the pleasing duality: for a lossless line in air, if we ignore the small difference between $D_s$ and $r$,
$$
LC_n \approx \frac{\mu_0}{2\pi}\ln\frac{D_{\text{eq}}}r\cdot\frac{2\pi\varepsilon_0}{\ln(D_{\text{eq}}/r)} = \mu_0\varepsilon_0 = \frac1{c^2},
$$
so waves travel along an overhead line at nearly the speed of light, as in [[electromagnetics/transmission-lines]].

::: remark The effect of the earth
The earth is a conductor, and its presence can be represented by **image charges** at the same depth below the surface as the conductors are above it. Including them raises the capacitance slightly, usually by a few percent for transmission lines, because the conductors' charges are then closer to an opposite charge. The earth also affects the inductance seen by currents that return through the ground, which matters for unbalanced faults: it gives the large **zero-sequence** impedance of lines studied in [[power-systems/unsymmetrical-faults]] (Carson's equations, 1926).
:::

::: quiz
The phase spacing of a transposed line is doubled, with the same conductors. What happens to its series reactance and its shunt capacitance?
- [ ] Both double
- [ ] Reactance doubles, capacitance halves
- [x] Reactance increases by a modest amount, capacitance decreases by a modest amount
- [ ] Neither changes, because the conductors are the same
::: solution
Both depend on $\ln(D_{\text{eq}}/\text{radius})$. For the $132\,\mathrm{kV}$ line of [[#ex-132kv]], doubling $D_{\text{eq}}$ adds $\ln2 = 0.69$ to a logarithm of about $6$, raising $L$ by about $11\,\%$ and reducing $C$ by about $12\,\%$. Line parameters are insensitive to geometry, which is why they lie in such narrow ranges.
:::
:::

::: widget plot
f: 2*pi*50*0.2e-3*ln(x/(Ds/1000)); 2*pi*50*55.63e-12*1e9/ln(x/(r/1000))/10
x: 1, 20
y: 0, 0.6
sliders: Ds=11:3:30:0.5; r=14:4:40:0.5
labels: X\ (\Omega/\mathrm{km}); B\ (10\,\mu\mathrm{S}/\mathrm{km})
caption: Series reactance $X$ in $\Omega/\mathrm{km}$ (first curve) and shunt susceptance in units of $10\,\mu\mathrm S/\mathrm{km}$ (second curve) of a transposed $50\,\mathrm{Hz}$ line against the equivalent spacing $D_{\text{eq}}$ in metres, for GMR $D_s$ and radius $r$ in millimetres. Over a twenty-fold change of spacing the reactance changes by less than a factor of two. Increase $D_s$ and $r$ together, as bundling does, and both curves move in the direction that raises the line's capacity: lower $X$, higher $B$.
:::

::: example A 400 kV line with quad bundles {#ex-400kv}
A $400\,\mathrm{kV}$, $50\,\mathrm{Hz}$ transposed line has a horizontal configuration with $12\,\mathrm m$ between adjacent phases. Each phase is a square bundle of four ACSR subconductors with radius $15.9\,\mathrm{mm}$ and GMR $12.4\,\mathrm{mm}$, spaced $0.45\,\mathrm m$. Find the inductance, reactance, capacitance and susceptance per kilometre, and compare the reactance with a single subconductor per phase.
::: solution
$D_{\text{eq}} = \sqrt[3]{12\times12\times24} = 15.12\,\mathrm m$. By [[#eq-bundle-gmr]]:
$$
D_s^b = 1.09\sqrt[4]{0.0124\times0.45^3} = 0.1998\,\mathrm m,\qquad r^b = 1.09\sqrt[4]{0.0159\times0.45^3} = 0.2127\,\mathrm m.
$$
Inductance: $L = 2\times10^{-7}\ln(15.12/0.1998) = 0.865\,\mathrm{mH/km}$, $X = 0.272\,\Omega/\mathrm{km}$. Capacitance: $C_n = 55.63\times10^{-12}/\ln(15.12/0.2127) = 13.05\,\mathrm{nF/km}$, $B = \omega C_n = 4.10\,\mu\mathrm S/\mathrm{km}$. With a single subconductor, $X = 2\pi50\times2\times10^{-7}\ln(15.12/0.0124)\times10^3 = 0.446\,\Omega/\mathrm{km}$ and $C_n = 8.11\,\mathrm{nF/km}$. The bundle cuts the reactance by $39\,\%$ and raises the capacitance by $61\,\%$; the quantity $\sqrt{L/C}$, the surge impedance of [[power-systems/line-models]], falls from $419\,\Omega$ to $258\,\Omega$, which raises the natural power-carrying capacity of the line by the same factor.
:::
:::

::: example Line charging {#ex-charging}
Find the charging current and the reactive power generated by $100\,\mathrm{km}$ of the line of [[#ex-400kv]] at rated voltage.
::: solution
Per phase, $B = 4.10\times10^{-6}\times100 = 4.10\times10^{-4}\,\mathrm S$. The charging current is $I_c = (400\,000/\sqrt3)\times4.10\times10^{-4} = 94.7\,\mathrm A$ and the three-phase charging reactive power is $Q_c = V_{LL}^2B = (400\times10^3)^2\times4.10\times10^{-4} = 65.6\,\mathrm{Mvar}$. A $400\,\mathrm{km}$ line generates over $260\,\mathrm{Mvar}$ at no load, which is why long EHV lines need shunt reactors. Underground cables, whose conductors are millimetres from earthed sheaths, have capacitances twenty to fifty times larger, which limits AC cables to a few tens of kilometres.
:::
:::

::: example Designing a twin bundle {#ex-design-bundle}
A $220\,\mathrm{kV}$, $50\,\mathrm{Hz}$ line will have $D_{\text{eq}} = 8\,\mathrm m$. Its subconductor has GMR $10\,\mathrm{mm}$. The series reactance must not exceed $0.32\,\Omega/\mathrm{km}$. Is a single conductor per phase sufficient? If not, find the minimum spacing of a twin bundle, and choose a practical value.
::: solution
Single conductor: $X = 2\pi50\times2\times10^{-7}\ln(8/0.010)\times10^3 = 0.420\,\Omega/\mathrm{km}$, too high. For the twin bundle we need
$$
\ln\frac{8}{\sqrt{D_sd}}\le\frac{0.32\times10^{-3}}{2\pi\times50\times2\times10^{-7}} = 5.093,
$$
so $\sqrt{D_sd}\ge8e^{-5.093} = 0.0491\,\mathrm m$ and $d\ge0.0491^2/0.010 = 0.241\,\mathrm m$. Choose a standard spacer of $0.30\,\mathrm m$, which gives $X = 0.313\,\Omega/\mathrm{km}$ with a small margin. Larger spacings reduce $X$ further, but only logarithmically, while they increase the forces on spacers under short-circuit currents and the cost of hardware, so $0.3$ to $0.45\,\mathrm m$ is usual.
:::
:::

## Design and practice

**What sets the geometry.** Phase spacing is fixed by insulation: the clearance needed for switching and lightning overvoltages, plus allowance for conductor swing in wind. Typical spacings are $3$ to $5\,\mathrm m$ at $132\,\mathrm{kV}$, $6$ to $8\,\mathrm m$ at $220\,\mathrm{kV}$ and $10$ to $14\,\mathrm m$ at $400\,\mathrm{kV}$. Since the parameters depend on the logarithm of the spacing, the electrical engineer has little freedom here; the main design levers are the conductor size (resistance and thermal rating) and the bundle (reactance, capacitance and corona).

**Corona.** The surface field of a conductor of radius $r$ at voltage $V_{\text{an}}$ is roughly $V_{\text{an}}/(r\ln(D_{\text{eq}}/r))$. Air breaks down at about $3\,\mathrm{MV/m}$ peak at sea level for smooth large conductors (less for rough, wet or small ones, and less at altitude), and lines are designed to keep the surface gradient comfortably below the corona onset in fair weather, typically $1.6$ to $1.8\,\mathrm{MV/m}$ RMS. For a $400\,\mathrm{kV}$ line this requires an effective radius far larger than any practical single conductor, hence bundles.

**Double circuits and earth wires.** Two circuits on one tower are mutually coupled; the formulas extend with GMDs between circuits, and the phase arrangement of the two circuits is chosen to minimise the inductance. Earth wires at the top of towers shield the phases from lightning and provide a return path for fault currents.

**Thermal rating.** The current a line may carry continuously is set by the maximum conductor temperature (typically $75$ to $100\,^\circ\mathrm C$ for ACSR), which limits sag and loss of strength; it depends on ambient temperature, wind and solar heating, and is the basis of **dynamic line rating** in modern systems.

::: history
James Clerk Maxwell introduced the geometric mean distance in his *Treatise on Electricity and Magnetism* (1873) as a way of computing the mutual and self inductance of parallel conductors of finite cross-section, the idea that underlies every line-inductance formula. ACSR conductors were introduced in the United States around 1908 and became the standard for overhead lines. Frank W. Peek Jr. of General Electric studied corona systematically in the 1910s; his empirical law for the corona onset gradient of smooth conductors was published in 1911 and his book *Dielectric Phenomena in High Voltage Engineering* in 1915. John R. Carson of AT&T derived the impedance of overhead conductors with earth return in 1926. The world's first $380\,\mathrm{kV}$ line, from Harsprånget to Hallsberg in Sweden, entered service in 1952 with bundled conductors, which became standard for extra-high-voltage transmission.
:::

## Where this leads

The parameters $r$, $l$ and $c$ per kilometre are the raw material of [[power-systems/line-models]], which assembles them into equivalent circuits for short, medium and long lines and introduces the surge impedance $\sqrt{l/c}$ and the surge impedance loading. The zero-sequence parameters, with earth return, are needed for the unbalanced faults of [[power-systems/unsymmetrical-faults]].

::: summary
- A line has series $r$ and $l$ and shunt $c$ (and negligible $g$) per unit length; $z = r + j\omega l$, $y = j\omega c$.
- Resistance follows $\rho\ell/A$, corrected for stranding, temperature (by $20$–$30\,\%$ at operating temperature) and skin effect (a few percent).
- Inductance per phase of a transposed line: $L = (\mu_0/2\pi)\ln(D_{\text{eq}}/D_s)$ with $D_{\text{eq}} = \sqrt[3]{D_{12}D_{23}D_{31}}$ and GMR $D_s$ ($0.7788r$ for a solid conductor).
- Capacitance to neutral: $C_n = 2\pi\varepsilon_0/\ln(D_{\text{eq}}/r)$ with the actual radius $r$.
- Composite conductors and bundles are handled by geometric means; bundles raise the effective radius, lowering $L$, raising $C$ and suppressing corona.
- Because parameters depend logarithmically on geometry, overhead lines have $X\approx0.25$–$0.5\,\Omega/\mathrm{km}$ and $C\approx8$–$14\,\mathrm{nF/km}$, and $LC\approx1/c^2$.
:::

## Exercises

::: exercise Temperature correction {level=1 check="0.075*(228+90)/(228+20)"}
A conductor has $0.075\,\Omega/\mathrm{km}$ at $20\,^\circ\mathrm C$. Find its resistance in $\Omega/\mathrm{km}$ at $90\,^\circ\mathrm C$, taking $T = 228\,^\circ\mathrm C$.
::: solution
$R_{90} = 0.075\times(228 + 90)/(228 + 20) = 0.075\times1.282 = 0.0962\,\Omega/\mathrm{km}$.
:::
:::

::: exercise Inductance of a single-phase line {level=1 check="4e-7*log(1.5/(0.005*exp(-0.25)))"}
A single-phase line has two solid round copper conductors of radius $5\,\mathrm{mm}$ spaced $1.5\,\mathrm m$. Find the loop inductance in $\mathrm{H/m}$.
::: solution
$D_s = 0.7788\times0.005 = 3.894\,\mathrm{mm}$; $L = (\mu_0/\pi)\ln(1.5/0.003894) = 4\times10^{-7}\times5.954 = 2.38\,\mu\mathrm H/\mathrm m$, i.e. $2.38\,\mathrm{mH/km}$ for the loop.
:::
:::

::: exercise Equivalent spacing {level=1 check="(5*5*10)^(1/3)"}
Find $D_{\text{eq}}$ in metres for a horizontal three-phase line with $5\,\mathrm m$ between adjacent phases.
::: solution
$D_{\text{eq}} = \sqrt[3]{5\times5\times10} = 6.30\,\mathrm m$, that is $1.26$ times the adjacent spacing ($2^{1/3}$).
:::
:::

::: exercise Capacitance and charging {level=2 check="(132e3)^2*2*pi*50*2*pi*8.854e-12/log(5.04/0.01407)*80e3"}
For the $132\,\mathrm{kV}$ line of [[#ex-132kv]], find the capacitance per phase per kilometre and the three-phase charging reactive power, in var, of an $80\,\mathrm{km}$ length at rated voltage.
::: solution
$C_n = 2\pi\varepsilon_0/\ln(5.040/0.01407) = 55.63\times10^{-12}/5.881 = 9.46\,\mathrm{nF/km}$. $B = 2\pi50\times9.46\times10^{-9}\times80 = 2.378\times10^{-4}\,\mathrm S$, and $Q_c = 132\,000^2\times2.378\times10^{-4} = 4.14\,\mathrm{Mvar}$.
:::
:::

::: exercise Triple bundle {level=2 check="2*pi*50*2e-7*log(10/(0.011*0.4^2)^(1/3))*1000"}
A $50\,\mathrm{Hz}$ line has $D_{\text{eq}} = 10\,\mathrm m$ and phases made of three subconductors at the corners of an equilateral triangle of side $0.4\,\mathrm m$, each with GMR $11\,\mathrm{mm}$. Find the reactance per phase in $\Omega/\mathrm{km}$.
::: solution
$D_s^b = \sqrt[3]{0.011\times0.4^2} = 0.1208\,\mathrm m$; $X = 2\pi50\times2\times10^{-7}\ln(10/0.1208)\times10^3 = 0.0628\times4.416 = 0.277\,\Omega/\mathrm{km}$.
:::
:::

::: exercise GMR of a twin bundle from first principles {level=2}
Use [[#eq-composite]] to show that a bundle of two subconductors of GMR $D_s$ at spacing $d$ has GMR $\sqrt{D_sd}$, and that the GMD between two such bundles a distance $D\gg d$ apart is approximately $D$.
::: solution
The bundle has $n = 2$ filaments; the $n^2 = 4$ distances are $D_{11} = D_{22} = D_s$ and $D_{12} = D_{21} = d$, so $D_s^b = (D_s^2d^2)^{1/4} = \sqrt{D_sd}$. Between two bundles the four distances are all $D + O(d)$; their geometric mean differs from $D$ only to second order in $d/D$ (for two parallel horizontal bundles side by side, the distances are $D$, $D$, $D - d$ and $D + d$, with geometric mean $D(1 - d^2/D^2)^{1/4}\approx D$).
:::
:::

::: exercise Speed of propagation {level=2 check="1/sqrt(0.865e-6*13.05e-12)"}
Using $L$ and $C_n$ of [[#ex-400kv]], find the propagation speed $1/\sqrt{LC}$ in m/s and compare it with the speed of light.
::: solution
$1/\sqrt{0.865\times10^{-6}\times13.05\times10^{-12}} = 2.973\times10^8\,\mathrm{m/s}$, about $99\,\%$ of $c$. The small difference comes from using $D_s^b$ for $L$ and $r^b$ for $C$: the internal flux of the conductors adds a little inductance.
:::
:::

::: exercise Unequal phases without transposition {level=3}
An untransposed horizontal line has phases $a$, $b$, $c$ in positions 1, 2, 3 with $D_{12} = D_{23} = D$ and $D_{13} = 2D$, and conductors of GMR $D_s$. Write the flux linkage of each phase with balanced currents $I_b = a^2I_a$, $I_c = aI_a$, $a = 1\angle120^\circ$, and show that the phase "inductances" $\lambda/I$ are complex for the outer phases. What does this mean physically?
::: hint
Use $\lambda_a = \frac{\mu_0}{2\pi}\bigl(I_a\ln\frac1{D_s} + I_b\ln\frac1{D_{12}} + I_c\ln\frac1{D_{13}}\bigr)$ and $1 + a + a^2 = 0$.
:::
::: solution
For phase $a$: $\lambda_a/I_a = \frac{\mu_0}{2\pi}\bigl(\ln\frac1{D_s} + a^2\ln\frac1D + a\ln\frac1{2D}\bigr)$. Substituting $a^2 = -1 - a$: $= \frac{\mu_0}{2\pi}\bigl(\ln\frac D{D_s} - a\ln2\bigr) = \frac{\mu_0}{2\pi}\bigl(\ln\frac D{D_s} + \tfrac12\ln2 - j\tfrac{\sqrt3}2\ln2\bigr)$. For $b$ (middle), $\lambda_b/I_b = \frac{\mu_0}{2\pi}\bigl(\ln\frac1{D_s} + (a + a^2)\ln\frac 1D\bigr) = \frac{\mu_0}{2\pi}\ln\frac D{D_s}$, real. For $c$, by symmetry, $\frac{\mu_0}{2\pi}\bigl(\ln\frac D{D_s} + \tfrac12\ln2 + j\tfrac{\sqrt3}2\ln2\bigr)$. The imaginary parts mean that $j\omega L$ for the outer phases has a real part: power is transferred between phases by mutual inductance, one outer phase appearing to have negative resistance and the other extra resistance. The voltage drops are unbalanced, which transposition removes; their average, $\frac{\mu_0}{2\pi}\bigl(\ln\frac D{D_s} + \tfrac13\ln2\bigr) = \frac{\mu_0}{2\pi}\ln\frac{2^{1/3}D}{D_s}$, is exactly [[#eq-l-3ph]].
:::
:::

::: exercise Designing for corona {level=3}
A $400\,\mathrm{kV}$ line has $D_{\text{eq}} = 15\,\mathrm m$. Using the estimate $E\approx V_{\text{an}}/(r_e\ln(D_{\text{eq}}/r_e))$ for the surface gradient of a single conductor of radius $r_e$, find the radius needed to keep $E$ below $1.7\,\mathrm{MV/m}$ RMS. Explain why a quad bundle of $16\,\mathrm{mm}$ subconductors is used instead, given that the gradient on a subconductor of radius $r$ in a bundle of $n$ is roughly $V_{\text{an}}/(n\,r\ln(D_{\text{eq}}/r^b))$.
::: hint
Solve $r_e\ln(15/r_e) = V_{\text{an}}/E$ numerically.
:::
::: solution
$V_{\text{an}} = 400/\sqrt3 = 230.9\,\mathrm{kV}$, so $r_e\ln(15/r_e)\ge0.1358\,\mathrm m$. Trying values: $r_e = 0.03$ gives $0.186$; $r_e = 0.02$ gives $0.132$; $r_e = 0.021$ gives $0.138$. A single conductor needs a radius of about $21\,\mathrm{mm}$, $42\,\mathrm{mm}$ in diameter, and with margin for rough surfaces and rain (which reduce the onset gradient considerably) well over $50\,\mathrm{mm}$: heavy, expensive and hard to string. A quad bundle of $16\,\mathrm{mm}$ subconductors at $0.45\,\mathrm m$ has $r^b = 0.213\,\mathrm m$ ([[#ex-400kv]]), so the subconductor gradient is about $230.9/(4\times0.016\times\ln(15/0.213)) = 230.9/(0.064\times4.25) = 0.85\,\mathrm{MV/m}$, half the limit, and the bundle also brings the lower reactance and higher surge-impedance loading found in that example.
:::
:::
