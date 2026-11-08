Try to measure the $z$ parameters of a microwave transistor the way [[circuits-2/two-port-networks]] defines them, and you run into trouble at once. $z_{11}$ requires the output port to be open-circuited, but at $5\,\mathrm{GHz}$ there is no such thing as an open circuit: the end of a connector radiates and has fringing capacitance, and a millimetre of line in front of it turns it into some other impedance. Worse, a transistor with a reactive termination at its output often oscillates, and then nothing can be measured. Voltages and currents themselves are ill-defined in a waveguide. What *can* be measured, cleanly and with any termination, are the amplitudes and phases of waves travelling towards and away from a device on matched lines. The **scattering parameters** describe a network by exactly those quantities.

This chapter builds the language of microwave networks. We generalise the impedance and admittance matrices to $N$ ports, define the scattering matrix in terms of normalised wave amplitudes, and derive its two great structural properties: symmetry for reciprocal networks and unitarity for lossless ones. We then shift reference planes, relate $S$ to $Z$, $Y$ and $ABCD$ parameters, and compute the reflection seen at the input of a terminated two-port. Finally, **signal-flow graphs** and Mason's rule turn any interconnection of networks, sources and loads into a calculation that can be done by inspection. These tools carry the rest of the course: couplers, filters, amplifiers and antennas are all specified by their S-parameters.

## Ports and network matrices {#sec-ports}

A **port** of a microwave network is a reference plane on a transmission line or waveguide, together with a choice of mode. On each port $n$ we define a voltage and a current as the amplitudes of the incident and reflected waves of that mode:

$$
V_n = V_n^+ + V_n^-, \qquad I_n = \frac{V_n^+ - V_n^-}{Z_{0n}} ,
$$ {#eq-port-vi}

where $Z_{0n}$ is the characteristic impedance of the line at port $n$ (for a waveguide, a convention chosen so that the power is $\tfrac12\mathrm{Re}(V_nI_n^*)$). The reference plane fixes the phase of $V_n^\pm$; moving it changes the description, not the network.

::: definition Impedance and admittance matrices {#def-zy}
The **impedance matrix** $\mathbf Z$ and **admittance matrix** $\mathbf Y = \mathbf Z^{-1}$ of an $N$-port relate the port voltages and currents,

$$
\mathbf V = \mathbf Z\mathbf I, \qquad \mathbf I = \mathbf Y\mathbf V, \qquad Z_{ij} = \left.\frac{V_i}{I_j}\right|_{I_k = 0,\ k\ne j} .
$$

$Z_{ij}$ is measured by driving port $j$ with current $I_j$ and open-circuiting all other ports.
:::

These are the $z$ and $y$ parameters of [[circuits-2/two-port-networks]] extended to $N$ ports. Two properties follow from the field equations. If the network contains only reciprocal media (no ferrites, plasmas or active devices), then $Z_{ij} = Z_{ji}$ and $Y_{ij} = Y_{ji}$ — the reciprocity theorem. If it is also lossless, the power $\tfrac12\mathrm{Re}(\mathbf I^H\mathbf Z\mathbf I)$ absorbed must vanish for every $\mathbf I$, which forces every $Z_{ij}$ to be purely imaginary. These properties have exact counterparts for the scattering matrix.

## The scattering matrix {#sec-s}

The waves on port $n$ carry power $\abs{V_n^+}^2/(2Z_{0n})$ and $\abs{V_n^-}^2/(2Z_{0n})$. Normalising so that the squared magnitude *is* the power, independent of the port impedance, makes the algebra uniform.

::: definition Wave amplitudes and scattering parameters {#def-s}
The **incident** and **reflected wave amplitudes** at port $n$ are

$$
a_n = \frac{V_n^+}{\sqrt{Z_{0n}}}, \qquad b_n = \frac{V_n^-}{\sqrt{Z_{0n}}} ,
$$ {#eq-ab}

so that the power incident on port $n$ is $\tfrac12\abs{a_n}^2$ and the power leaving it is $\tfrac12\abs{b_n}^2$. The **scattering matrix** $\mathbf S$ relates them:

$$
\mathbf b = \mathbf S\mathbf a, \qquad S_{ij} = \left.\frac{b_i}{a_j}\right|_{a_k = 0,\ k\ne j} .
$$ {#eq-s-def}

$S_{ij}$ is measured by driving port $j$ and terminating every other port in its own reference impedance $Z_{0k}$, so that nothing is reflected back into the network.
:::

$S_{ii}$ is the **reflection coefficient** at port $i$ when all other ports are matched; $S_{ij}$ ($i\ne j$) is the **transmission coefficient** from port $j$ to port $i$. For a two-port amplifier or filter, $\abs{S_{21}}^2$ is the power gain (or loss) into a matched load, $-20\log_{10}\abs{S_{21}}$ the **insertion loss** and $-20\log_{10}\abs{S_{11}}$ the **input return loss**. Termination in the reference impedance is the condition that makes S-parameters measurable at any frequency: a $50\,\Omega$ load can be built to be accurate up to tens of gigahertz, and it keeps an active device stable in most cases.

::: warning S-parameters belong to a reference impedance and reference planes
$S_{11}$ is the input reflection coefficient of a two-port *only when port 2 is terminated in its reference impedance*. With any other load the input reflection is different (see [[#thm-gamma-in]]). And every S-parameter changes if the reference impedance is changed (from $50$ to $75\,\Omega$, say) or if the reference planes are moved. A datasheet of S-parameters is meaningless without both, which is why manufacturers state them ("$Z_0 = 50\,\Omega$, reference planes at the package leads").
:::

### Converting between Z and S

::: theorem S from Z {#thm-s-from-z}
For an $N$-port with the same real reference impedance $Z_0$ at every port,

$$
\mathbf S = (\mathbf Z - Z_0\mathbf U)(\mathbf Z + Z_0\mathbf U)^{-1}, \qquad \mathbf Z = Z_0(\mathbf U + \mathbf S)(\mathbf U - \mathbf S)^{-1} ,
$$ {#eq-s-z}

where $\mathbf U$ is the identity matrix. For a one-port this is $\Gamma = (Z - Z_0)/(Z + Z_0)$.
:::

::: proof
From [[#eq-port-vi]] and [[#eq-ab]], $\mathbf V = \sqrt{Z_0}(\mathbf a + \mathbf b)$ and $\mathbf I = (\mathbf a - \mathbf b)/\sqrt{Z_0}$. Substituting into $\mathbf V = \mathbf Z\mathbf I$:

$$
Z_0(\mathbf a + \mathbf b) = \mathbf Z(\mathbf a - \mathbf b)\quad\Longrightarrow\quad(\mathbf Z + Z_0\mathbf U)\mathbf b = (\mathbf Z - Z_0\mathbf U)\mathbf a .
$$

Hence $\mathbf b = (\mathbf Z + Z_0\mathbf U)^{-1}(\mathbf Z - Z_0\mathbf U)\mathbf a$. The two factors commute (both are polynomials in $\mathbf Z$), which gives [[#eq-s-z]]; solving for $\mathbf Z$ gives the inverse relation.
:::

For two-ports, explicit conversion formulas between $S$ and $Z$, $Y$, $h$ and $ABCD$ follow from [[#eq-s-z]] and are tabulated in the references; the most used are

$$
S_{11} = \frac{A + B/Z_0 - CZ_0 - D}{\Delta}, \quad S_{12} = \frac{2(AD - BC)}{\Delta}, \quad S_{21} = \frac{2}{\Delta}, \quad S_{22} = \frac{-A + B/Z_0 - CZ_0 + D}{\Delta},
$$ {#eq-s-abcd}

with $\Delta = A + B/Z_0 + CZ_0 + D$. A series impedance $Z$ ($A = D = 1$, $B = Z$, $C = 0$) gives $S_{11} = S_{22} = Z/(Z + 2Z_0)$ and $S_{21} = S_{12} = 2Z_0/(Z + 2Z_0)$; a shunt admittance $Y$ gives $S_{11} = S_{22} = -YZ_0/(2 + YZ_0)$ and $S_{21} = 2/(2 + YZ_0)$.

::: example S-parameters of a T attenuator {#ex-t-pad}
The $3\,\mathrm{dB}$, $50\,\Omega$ T attenuator has series arms $R_1 = 8.55\,\Omega$ and a shunt arm $R_2 = 141.9\,\Omega$ (the design of [[circuits-2/two-port-networks]]). Find its S-matrix.
::: solution
The Z-matrix of a T network is $Z_{11} = Z_{22} = R_1 + R_2 = 150.45\,\Omega$, $Z_{12} = Z_{21} = R_2 = 141.9\,\Omega$. With $Z_0 = 50\,\Omega$,

$$
\mathbf Z - Z_0\mathbf U = \begin{pmatrix}100.45 & 141.9\\ 141.9 & 100.45\end{pmatrix}, \qquad \mathbf Z + Z_0\mathbf U = \begin{pmatrix}200.45 & 141.9\\ 141.9 & 200.45\end{pmatrix} .
$$

The second has determinant $200.45^2 - 141.9^2 = 20\,044$ and inverse $\frac{1}{20\,044}\begin{pmatrix}200.45 & -141.9\\ -141.9 & 200.45\end{pmatrix}$. Multiplying,

$$
S_{11} = \frac{100.45\times200.45 - 141.9^2}{20\,044} = \frac{20\,135 - 20\,136}{20\,044}\approx0, \qquad S_{21} = \frac{141.9\times200.45 - 100.45\times141.9}{20\,044} = \frac{14\,190}{20\,044} = 0.708 .
$$

So $\mathbf S = \begin{pmatrix}0 & 0.708\\ 0.708 & 0\end{pmatrix}$: matched at both ports, with $20\log_{10}0.708 = -3.0\,\mathrm{dB}$ transmission. The matrix is symmetric (reciprocal) but $\abs{S_{11}}^2 + \abs{S_{21}}^2 = 0.5\ne1$: half the incident power is dissipated in the resistors.
:::
:::

### Reciprocity and losslessness

::: theorem Reciprocal and lossless networks {#thm-unitary}
1. A network is **reciprocal** if and only if its scattering matrix (with equal real reference impedances) is symmetric: $\mathbf S = \mathbf S^{\mathsf T}$.
2. A network is **lossless** if and only if its scattering matrix is **unitary**: $\mathbf S^H\mathbf S = \mathbf U$. Equivalently, for every column $j$, $\sum_i\abs{S_{ij}}^2 = 1$, and for every pair of different columns $j\ne k$, $\sum_iS_{ij}S_{ik}^* = 0$.
:::

::: proof
1. From [[#eq-s-z]], $\mathbf S^{\mathsf T} = [(\mathbf Z + Z_0\mathbf U)^{-1}]^{\mathsf T}(\mathbf Z - Z_0\mathbf U)^{\mathsf T}$. If $\mathbf Z$ is symmetric, this is $(\mathbf Z + Z_0\mathbf U)^{-1}(\mathbf Z - Z_0\mathbf U)$, which equals $\mathbf S$ because the factors commute. The converse follows from the inverse relation.

2. The net power delivered to the network is
$$
P = \tfrac12\sum_n\bigl(\abs{a_n}^2 - \abs{b_n}^2\bigr) = \tfrac12\bigl(\mathbf a^H\mathbf a - \mathbf a^H\mathbf S^H\mathbf S\mathbf a\bigr) = \tfrac12\,\mathbf a^H(\mathbf U - \mathbf S^H\mathbf S)\mathbf a .
$$
A lossless network absorbs no power for any excitation $\mathbf a$, so the Hermitian matrix $\mathbf U - \mathbf S^H\mathbf S$ has $\mathbf a^H(\cdot)\mathbf a = 0$ for all $\mathbf a$, which forces it to be zero. Writing $\mathbf S^H\mathbf S = \mathbf U$ entry by entry gives the column conditions. For a passive lossy network the same argument gives $\mathbf U - \mathbf S^H\mathbf S$ positive semi-definite.
:::

The column conditions have plain meanings. The first says that power fed into port $j$ (with all others matched) is either reflected or transmitted to the other ports, none lost. The second says that the columns are orthogonal, a phase constraint that is less obvious and very powerful.

::: corollary A lossless reciprocal three-port cannot be matched at all ports {#cor-three-port}
No three-port network can be simultaneously lossless, reciprocal and matched at all three ports.
:::

::: proof
Suppose it were. Matched means $S_{11} = S_{22} = S_{33} = 0$ and reciprocal means $S_{ij} = S_{ji}$, so

$$
\mathbf S = \begin{pmatrix}0 & S_{12} & S_{13}\\ S_{12} & 0 & S_{23}\\ S_{13} & S_{23} & 0\end{pmatrix} .
$$

Unitarity requires $\abs{S_{12}}^2 + \abs{S_{13}}^2 = 1$, $\abs{S_{12}}^2 + \abs{S_{23}}^2 = 1$, $\abs{S_{13}}^2 + \abs{S_{23}}^2 = 1$ (the columns have unit length) and $S_{13}^*S_{23} = 0$, $S_{23}^*S_{12} = 0$, $S_{12}^*S_{13} = 0$ (orthogonality). The last three say that at least two of $S_{12}, S_{13}, S_{23}$ are zero, but then one of the first three equations fails.
:::

Each assumption can be dropped, and each gives a useful component. Drop "matched at all ports" and get the lossless **T-junction** power divider, matched only at its input. Drop "lossless" and get the **resistive divider** or the **Wilkinson divider** ([[rf-microwave/passive-microwave-components]]). Drop "reciprocal" and get the **circulator**, $S_{21} = S_{32} = S_{13} = 1$ and all other entries zero: power entering port 1 leaves at port 2, from port 2 goes to 3, from 3 to 1. Made with magnetised ferrite, circulators separate the transmitted and received signals sharing one radar antenna.

::: quiz
A two-port has $\mathbf S = \begin{pmatrix}0.6 & j0.8\\ j0.8 & 0.6\end{pmatrix}$. Which is true?
- [ ] It is reciprocal and lossy
- [x] It is reciprocal and lossless
- [ ] It is lossless but not reciprocal
- [ ] It cannot be passive, since $\abs{S_{11}} + \abs{S_{21}} > 1$
::: solution
$S_{12} = S_{21}$, so it is reciprocal. Column 1 has $0.36 + 0.64 = 1$, and so does column 2; the orthogonality sum is $S_{11}S_{12}^* + S_{21}S_{22}^* = 0.6(-j0.8) + (j0.8)(0.6) = 0$. So $\mathbf S$ is unitary: lossless. The *magnitudes* do not add, the *powers* do: $\abs{S_{11}}^2 + \abs{S_{21}}^2 = 1$.
:::
:::

### Shifting the reference planes

If the reference plane of port $n$ is moved outward by an electrical length $\theta_n = \beta_n\ell_n$ along its line, the incident wave at the new plane arrives $\theta_n$ earlier and the reflected wave leaves $\theta_n$ later.

::: proposition Reference-plane shift {#prop-plane-shift}
Moving the reference plane of each port $n$ outward (away from the network) by $\theta_n$ gives

$$
S'_{ij} = S_{ij}\,e^{-j(\theta_i + \theta_j)}, \qquad \mathbf S' = \mathbf P\mathbf S\mathbf P, \quad \mathbf P = \mathrm{diag}\bigl(e^{-j\theta_1}, \dots, e^{-j\theta_N}\bigr).
$$ {#eq-plane-shift}
:::

::: proof
At the new plane $a'_n = a_ne^{j\theta_n}$ (the incident wave reaches the old plane $\theta_n$ after passing the new one, so at the old plane it is $a_n = a'_ne^{-j\theta_n}$) and $b'_n = b_ne^{-j\theta_n}$. Then $\mathbf b' = \mathbf P\mathbf b = \mathbf P\mathbf S\mathbf a = \mathbf P\mathbf S\mathbf P\mathbf a'$.
:::

A reflection coefficient rotates by twice the line's electrical length, as on the Smith chart; a transmission coefficient by the sum of the two lengths. Network analysers use this to "de-embed" fixtures and connectors: the measured matrix is corrected by the inverse of the known line sections on either side.

## The terminated two-port {#sec-terminated}

Most RF circuits are two-ports driven by a source and loaded by something other than $Z_0$. The input reflection coefficient then depends on the load.

::: theorem Input and output reflection coefficients {#thm-gamma-in}
A two-port with scattering matrix $\mathbf S$, terminated at port 2 by a load with reflection coefficient $\Gamma_L$ (so $a_2 = \Gamma_Lb_2$), has input reflection coefficient

$$
\Gamma_{\text{in}} = \frac{b_1}{a_1} = S_{11} + \frac{S_{12}S_{21}\Gamma_L}{1 - S_{22}\Gamma_L} .
$$ {#eq-gamma-in}

Similarly, with a source of reflection coefficient $\Gamma_S$ at port 1, the output reflection coefficient is $\Gamma_{\text{out}} = S_{22} + S_{12}S_{21}\Gamma_S/(1 - S_{11}\Gamma_S)$.
:::

::: proof
The second equation of $\mathbf b = \mathbf S\mathbf a$ is $b_2 = S_{21}a_1 + S_{22}a_2 = S_{21}a_1 + S_{22}\Gamma_Lb_2$, so $b_2 = S_{21}a_1/(1 - S_{22}\Gamma_L)$. The first is $b_1 = S_{11}a_1 + S_{12}a_2 = S_{11}a_1 + S_{12}\Gamma_Lb_2$; substituting $b_2$ and dividing by $a_1$ gives [[#eq-gamma-in]]. The output expression follows by symmetry.
:::

The second term is the contribution of the wave that passes through the network, reflects from the load and comes back. It vanishes if the load is matched ($\Gamma_L = 0$, so $\Gamma_{\text{in}} = S_{11}$) or if the device is **unilateral** ($S_{12} = 0$). A transistor amplifier usually has small $S_{12}$, but its large $S_{21}$ can make the product significant. The map $\Gamma_L\mapsto\Gamma_{\text{in}}$ is a Möbius transformation, so circles of $\Gamma_L$ map to circles of $\Gamma_{\text{in}}$ — the basis of the stability circles of [[rf-microwave/rf-amplifiers]].

::: widget parametric
fx: p*g*(cos(t) - s*g)/(1 - 2*s*g*cos(t) + s^2*g^2)
fy: p*g*sin(t)/(1 - 2*s*g*cos(t) + s^2*g^2)
t: 0, 2*pi
x: -2, 2
y: -2, 2
sliders: g=1:0:1:0.01; p=0.6:0:2:0.01; s=0.5:-0.95:0.95:0.01
caption: The input reflection coefficient $\Gamma_{\text{in}}$ of a two-port with $S_{11} = 0$, real $S_{22} = s$ and real $S_{12}S_{21} = p$, as the load runs round the circle $\Gamma_L = g\,e^{jt}$. The image of a circle is a circle, but not centred where you might expect. With $g = 1$ (all lossless loads) and $p = 0.6$, $s = 0.5$, $\Gamma_{\text{in}}$ already reaches $1.2$: some passive loads make the input reflect more power than it receives, i.e. the input presents a negative resistance. Raise $p$ (more feedback through the device) or $s$ towards $1$ and the circle grows; lower $g$ and it shrinks towards $S_{11} = 0$.
:::

::: example How unilateral is a transistor? {#ex-transistor}
A GaAs FET at $2\,\mathrm{GHz}$ has $S_{11} = 0.65\angle{-140^\circ}$, $S_{21} = 4.0\angle80^\circ$, $S_{12} = 0.06\angle35^\circ$, $S_{22} = 0.50\angle{-60^\circ}$ ($Z_0 = 50\,\Omega$). Its output is conjugately matched, $\Gamma_L = S_{22}^* = 0.5\angle60^\circ$. Find $\Gamma_{\text{in}}$ and compare it with $S_{11}$.
::: solution
$S_{22}\Gamma_L = 0.25$, so $1 - S_{22}\Gamma_L = 0.75$. The feedback term is

$$
\frac{S_{12}S_{21}\Gamma_L}{1 - S_{22}\Gamma_L} = \frac{0.06\times4.0\times0.5\,\angle(35^\circ + 80^\circ + 60^\circ)}{0.75} = 0.160\angle175^\circ = -0.159 + j0.014 .
$$

With $S_{11} = -0.498 - j0.418$, $\Gamma_{\text{in}} = -0.657 - j0.404 = 0.772\angle{-148.4^\circ}$. Ignoring $S_{12}$ would put the input reflection at $0.65$ instead of $0.77$ and $8^\circ$ off in phase, a large error for an input matching network, though the device's $\abs{S_{12}}$ is only $-24\,\mathrm{dB}$. The power gain into a matched load, $\abs{S_{21}}^2$, is $12.0\,\mathrm{dB}$.
:::
:::

::: example Designing a DC block {#ex-dc-block}
A series capacitor is to block DC on a $50\,\Omega$ line while adding less than $0.1\,\mathrm{dB}$ of insertion loss at all frequencies above $1\,\mathrm{GHz}$. Find the smallest capacitance, ignoring its parasitics, and its return loss at $1\,\mathrm{GHz}$.
::: solution
For a series reactance $X$, $S_{21} = 2Z_0/(2Z_0 + jX)$ and $\abs{S_{21}}^2 = 1/[1 + (X/2Z_0)^2]$. The loss decreases as $\abs X = 1/(\omega C)$ falls, so the worst case is $1\,\mathrm{GHz}$. Requiring $-10\log_{10}\abs{S_{21}}^2\le0.1$:

$$
\Bigl(\frac{X}{2Z_0}\Bigr)^2\le10^{0.01} - 1 = 0.0233, \qquad \abs X\le2(50)(0.1526) = 15.3\,\Omega ,
$$

so $C\ge1/(2\pi\times10^9\times15.3) = 10.4\,\mathrm{pF}$; a standard $12\,\mathrm{pF}$ part would be chosen. At $1\,\mathrm{GHz}$ with the minimum value, $\abs{S_{11}} = \abs X/\abs{2Z_0 + jX} = 15.3/101.2 = 0.151$, a return loss of $16.4\,\mathrm{dB}$. In reality a $12\,\mathrm{pF}$ $0402$ capacitor self-resonates near $2$–$3\,\mathrm{GHz}$ and is inductive above, so a "broadband" DC block needs either a smaller-package part or a specially designed capacitor with low series inductance.
:::
:::

::: widget plot
f: -10*log10(1 + (1/(2*pi*x*1e9*C*1e-12*100))^2); 10*log10((1/(2*pi*x*1e9*C*1e-12*100))^2/(1 + (1/(2*pi*x*1e9*C*1e-12*100))^2))
x: 0.1, 5
y: -30, 0
sliders: C=10.4:1:50:0.1
hlines: -0.1
labels: \lvert S_{21}\rvert^2\ (\mathrm{dB}); \lvert S_{11}\rvert^2\ (\mathrm{dB})
caption: Transmission and reflection of an ideal series capacitor $C$ (in picofarads) on a $50\,\Omega$ line against frequency in gigahertz. The two curves always satisfy $\lvert S_{11}\rvert^2 + \lvert S_{21}\rvert^2 = 1$ (a lossless element), so a return loss of $16\,\mathrm{dB}$ goes with an insertion loss of only $0.1\,\mathrm{dB}$. With $C = 10.4\,\mathrm{pF}$ the insertion loss crosses the $-0.1\,\mathrm{dB}$ line at $1\,\mathrm{GHz}$, as designed in [[#ex-dc-block]]. Reduce $C$ and the corner moves up in frequency.
:::

### Cascading two-ports

S-matrices do not multiply when networks are cascaded, because $\mathbf b = \mathbf S\mathbf a$ mixes inputs and outputs at both ports. For cascades one uses the **transfer** or **T-matrix**, which relates the waves at port 1 to those at port 2,

$$
\begin{pmatrix}b_1\\ a_1\end{pmatrix} = \mathbf T\begin{pmatrix}a_2\\ b_2\end{pmatrix}, \qquad \mathbf T = \frac{1}{S_{21}}\begin{pmatrix}-\det\mathbf S & S_{11}\\ -S_{22} & 1\end{pmatrix},
$$ {#eq-t-matrix}

so that the T-matrix of a cascade is the product of the individual T-matrices, in order, exactly as for $ABCD$ matrices. (Conventions for the T-matrix differ between books; check the definition before using a formula.) Alternatively one converts each stage to $ABCD$ with [[#eq-s-abcd]], multiplies, and converts back. Simulators do this internally.

## Signal-flow graphs {#sec-sfg}

Equations like [[#eq-gamma-in]] become tedious when several networks, sources and loads interact. A **signal-flow graph** displays the wave equations so that the answer can be read off by a rule.

::: definition Signal-flow graph {#def-sfg}
A **signal-flow graph** of a microwave network has a node for each wave amplitude $a_n$ and $b_n$, and a directed branch from node $x$ to node $y$ with gain $g$ whenever the equations contain the term $y = \dots + gx$. A two-port contributes branches $a_1\to b_1$ ($S_{11}$), $a_1\to b_2$ ($S_{21}$), $a_2\to b_2$ ($S_{22}$), $a_2\to b_1$ ($S_{12}$); a load contributes $b_2\to a_2$ ($\Gamma_L$); a source of reflection coefficient $\Gamma_S$ and wave amplitude $b_s$ contributes $a_1 = b_s + \Gamma_Sb_1$.
:::

A **path** is a chain of branches in the direction of the arrows that visits no node twice; a **loop** is a closed path; two loops **touch** if they share a node. The gain of a path or loop is the product of its branch gains.

::: theorem Mason's gain rule {#thm-mason}
The ratio of a dependent node $y$ to an independent (source) node $x$ is

$$
T = \frac{y}{x} = \frac{\sum_kP_k\Delta_k}{\Delta}, \qquad \Delta = 1 - \sum L^{(1)} + \sum L^{(2)} - \sum L^{(3)} + \cdots ,
$$ {#eq-mason}

where $P_k$ are the gains of the paths from $x$ to $y$, $\sum L^{(1)}$ is the sum of all loop gains, $\sum L^{(2)}$ the sum of products of pairs of non-touching loops, $\sum L^{(3)}$ of triples, and so on; $\Delta_k$ is $\Delta$ computed with the loops that touch path $k$ removed.
:::

::: proof
A sketch; the rule is Cramer's rule for the linear equations the graph represents, organised by the graph's topology. Each node equation is $y_i = \sum_jg_{ji}y_j + (\text{source})$, i.e. $(\mathbf U - \mathbf G)\mathbf y = \mathbf x$. The determinant of $\mathbf U - \mathbf G$ expands, by the permutation definition of a determinant, into terms each corresponding to a set of disjoint cycles of the graph (a permutation is a product of disjoint cycles), with sign $(-1)^{\text{number of cycles}}$: this is $\Delta$. The cofactor that Cramer's rule needs for $y/x$ expands similarly into paths from $x$ to $y$ times sets of cycles disjoint from the path: this is $\sum P_k\Delta_k$. Mason introduced signal-flow graphs in 1953 and published the general gain rule in 1956; the same rule reduces block diagrams in [[control-systems]].
:::

Applied to the two-port with a load, the graph has one path from $a_1$ to $b_1$ of gain $S_{11}$ (touching the loop) and one of gain $S_{21}\Gamma_LS_{12}$, and one loop $S_{22}\Gamma_L$. The direct path $S_{11}$ does not touch the loop (it uses only $a_1$ and $b_1$), so $\Delta_1 = 1 - S_{22}\Gamma_L$; the second path touches it, $\Delta_2 = 1$. Then $\Gamma_{\text{in}} = [S_{11}(1 - S_{22}\Gamma_L) + S_{21}S_{12}\Gamma_L]/(1 - S_{22}\Gamma_L)$, which is [[#eq-gamma-in]].

::: example Padding a mismatched source {#ex-pad-source}
A signal generator has source reflection coefficient $\Gamma_S = 0.3$ (VSWR $1.86$). A matched $6\,\mathrm{dB}$ attenuator ($S_{11} = S_{22} = 0$, $S_{21} = S_{12} = 0.501$) is connected to its output. Find the effective source reflection coefficient seen by a device connected after the pad, and the uncertainty in delivered power caused by a device with $\abs{\Gamma_L} = 0.2$, with and without the pad.
::: solution
The output reflection coefficient of the pad with $\Gamma_S$ at its input is, by [[#thm-gamma-in]] (or by Mason's rule: one path from $a_2$ to $b_2$ through the source, $S_{12}\Gamma_SS_{21}$, and no loop since $S_{11} = 0$),

$$
\Gamma_S' = S_{22} + \frac{S_{12}S_{21}\Gamma_S}{1 - S_{11}\Gamma_S} = (0.501)^2(0.3) = 0.075 .
$$

The pad divides the reflection by the round-trip loss of $12\,\mathrm{dB}$ — the same effect as the lossy cable of [[rf-microwave/lines-smith-chart#thm-lossy]]. The power delivered to the device depends on the phase of $\Gamma_S\Gamma_L$ through the factor $1/\abs{1 - \Gamma_S\Gamma_L}^2$ of [[rf-microwave/lines-smith-chart#eq-mismatch]]. Without the pad, $\abs{\Gamma_S\Gamma_L} = 0.06$ and the factor ranges over $20\log_{10}(1\pm0.06)$, i.e. $+0.51$ to $-0.54\,\mathrm{dB}$; with it, $\abs{\Gamma_S'\Gamma_L} = 0.015$ and the range is $\pm0.13\,\mathrm{dB}$. Padding costs $6\,\mathrm{dB}$ of signal but makes a measurement four times more repeatable, a standard trick in RF test.
:::
:::

::: quiz
In a signal-flow graph of a source, a two-port and a load, how many first-order loops are there in general, and which pair does not touch?
- [ ] Two loops; they always touch
- [x] Three loops ($\Gamma_SS_{11}$, $S_{22}\Gamma_L$, $\Gamma_SS_{21}\Gamma_LS_{12}$); the first two do not touch
- [ ] One loop, $S_{21}S_{12}$
- [ ] Three loops; none of them touch
::: solution
At the input, $a_1\to b_1\to a_1$ via $S_{11}$ and $\Gamma_S$; at the output, $a_2\to b_2\to a_2$ via $S_{22}$ and $\Gamma_L$; and the outer loop $a_1\to b_2\to a_2\to b_1\to a_1$ via $S_{21}\Gamma_LS_{12}\Gamma_S$. The input and output loops share no node, so $\Delta = 1 - \Gamma_SS_{11} - S_{22}\Gamma_L - \Gamma_SS_{21}\Gamma_LS_{12} + \Gamma_SS_{11}S_{22}\Gamma_L$, the denominator of every gain formula in the next chapters.
:::
:::

::: application Measuring S-parameters
A two-port vector network analyser has, at each port, a source switch and a pair of directional couplers that sample the incident and reflected waves. With the source on port 1 it measures $b_1/a_1$ and $b_2/a_1$; switching to port 2 it measures the other two parameters. Because the couplers, cables and switches are imperfect, a calibration with known standards solves for an **error model** — in the common twelve-term model, a two-port error network on each side of the device under test — and the measured raw data are corrected by inverting it, using exactly the signal-flow-graph algebra of this section. The **thru–reflect–line** (TRL) calibration uses a direct connection, an unknown but symmetric reflection and a line of unknown length; it needs no precisely known standard and is the reference method for on-wafer and fixture measurements.
:::

::: history
The scattering matrix came into network theory from physics, where it describes how particles or waves are scattered by a target. Vitold Belevitch used it for electrical networks in the 1940s, and the MIT Radiation Laboratory's *Principles of Microwave Circuits* by Montgomery, Dicke and Purcell (1948) made it the standard description of waveguide junctions. Samuel Mason introduced the signal-flow graph in 1953 and its general gain rule in 1956. Kaneyuki Kurokawa's 1965 paper "Power waves and the scattering matrix" extended the definitions to complex port impedances. Hewlett-Packard's network analysers of the late 1960s made routine S-parameter measurement possible, transistor datasheets began to list S-parameters, and in 1979 Glenn Engen and Cletus Hoer of the US National Bureau of Standards published the thru–reflect–line calibration.
:::

## Where this leads {#sec-next}

The S-matrix is the specification of every component in [[rf-microwave/passive-microwave-components]]: the Wilkinson divider, couplers and hybrids are designed directly from the properties of [[#thm-unitary]]. [[rf-microwave/rf-amplifiers]] uses [[#eq-gamma-in]] and the signal-flow-graph determinant to define power gains and stability. Waveguide junctions of [[rf-microwave/waveguides]] and antenna feeds of [[rf-microwave/antennas]] are characterised the same way.

::: summary
- Wave amplitudes $a_n = V_n^+/\sqrt{Z_0}$, $b_n = V_n^-/\sqrt{Z_0}$ carry power $\tfrac12\abs{a_n}^2$, $\tfrac12\abs{b_n}^2$; $\mathbf b = \mathbf S\mathbf a$ with all other ports matched defines $S_{ij}$.
- $\mathbf S = (\mathbf Z - Z_0\mathbf U)(\mathbf Z + Z_0\mathbf U)^{-1}$; S-parameters depend on the reference impedance and the reference planes. Moving plane $n$ outward by $\theta_n$ multiplies $S_{ij}$ by $e^{-j(\theta_i + \theta_j)}$.
- Reciprocal $\Leftrightarrow\mathbf S = \mathbf S^{\mathsf T}$; lossless $\Leftrightarrow\mathbf S^H\mathbf S = \mathbf U$ (unit-length, mutually orthogonal columns). No three-port is matched, lossless and reciprocal at once.
- A terminated two-port has $\Gamma_{\text{in}} = S_{11} + S_{12}S_{21}\Gamma_L/(1 - S_{22}\Gamma_L)$; the device is unilateral if $S_{12} = 0$.
- Cascades multiply T-matrices (or ABCD matrices), not S-matrices.
- Signal-flow graphs with Mason's rule give any wave ratio as $\sum P_k\Delta_k/\Delta$.
:::

## Exercises

::: exercise Insertion loss {level=1 check="-20*log10(0.5)"}
A filter has $\abs{S_{21}} = 0.5$ at some frequency. What is its insertion loss in decibels, and what fraction of the incident power reaches a matched load?
::: solution
$-20\log_{10}0.5 = 6.02\,\mathrm{dB}$; $\abs{S_{21}}^2 = 0.25$ of the incident power is delivered.
:::
:::

::: exercise A shunt resistor {level=1 check="0.5"}
A $25\,\Omega$ resistor is connected in shunt across a $50\,\Omega$ line. Find $S_{11}$ and $S_{21}$; give $S_{21}$.
::: solution
$YZ_0 = 50/25 = 2$, so $S_{11} = -2/(2 + 2) = -0.5$ and $S_{21} = 2/4 = 0.5$. Check: $\abs{S_{11}}^2 + \abs{S_{21}}^2 = 0.5 < 1$, the rest is dissipated in the resistor.
:::
:::

::: exercise Return loss and |S11| {level=1 check="0.1"}
An amplifier's input return loss is specified as $20\,\mathrm{dB}$. What is $\abs{S_{11}}$, and what VSWR does it correspond to?
::: solution
$\abs{S_{11}} = 10^{-20/20} = 0.1$; VSWR $= 1.1/0.9 = 1.22$.
:::
:::

::: exercise Input reflection with a mismatched load {level=2 check="0.2 + 0.1*2*0.5/(1 - 0.3*0.5)"}
A two-port has real S-parameters $S_{11} = 0.2$, $S_{21} = 2$, $S_{12} = 0.1$, $S_{22} = 0.3$. Find $\Gamma_{\text{in}}$ when port 2 is terminated with $\Gamma_L = 0.5$.
::: solution
$\Gamma_{\text{in}} = 0.2 + (0.1)(2)(0.5)/(1 - 0.15) = 0.2 + 0.1/0.85 = 0.318$.
:::
:::

::: exercise Moving a reference plane {level=2 check="-6"}
$S_{11} = 0.5\angle30^\circ$ is measured at a plane that is then moved $0.05\lambda$ outward along a lossless line. What is the new phase of $S_{11}$, in degrees?
::: solution
$\theta = 360^\circ\times0.05 = 18^\circ$, and by [[#eq-plane-shift]] $S'_{11} = S_{11}e^{-2j\theta}$, so $S'_{11} = 0.5\angle(30^\circ - 36^\circ) = 0.5\angle{-6^\circ}$. On the Smith chart, the point has rotated $36^\circ$ clockwise (towards the generator).
:::
:::

::: exercise Is it lossless? {level=2}
Test the following for reciprocity and losslessness: (a) $\begin{pmatrix}0 & 1\\ 1 & 0\end{pmatrix}$; (b) $\frac{1}{\sqrt2}\begin{pmatrix}0 & 1 & 1\\ 1 & 0 & 0\\ 1 & 0 & 0\end{pmatrix}$; (c) $\begin{pmatrix}0 & 0 & 1\\ 1 & 0 & 0\\ 0 & 1 & 0\end{pmatrix}$.
::: solution
(a) A matched lossless line of zero length: symmetric and unitary. (b) Symmetric, so reciprocal. Column 1 has $\tfrac12 + \tfrac12 = 1$, but column 2 has only $\tfrac12$; not unitary, so lossy. It is matched at all three ports, so by [[#cor-three-port]] it had to be lossy: this is (apart from a common phase) the Wilkinson divider of [[rf-microwave/passive-microwave-components]]. Power entering port 1 splits equally to ports 2 and 3; of power entering port 2, half reaches port 1 and half is dissipated in the divider's isolation resistor. (c) Not symmetric, so non-reciprocal; every column has unit length and the columns are orthogonal, so it is lossless: an ideal circulator ($1\to2\to3\to1$).
:::
:::

::: exercise Designing a bias inductor {level=3 check="50/(2*0.152620419)/(2*pi*1e9)"}
A shunt inductor feeds DC bias onto a $50\,\Omega$ RF line. Find the smallest inductance, in henries, for which its insertion loss is below $0.1\,\mathrm{dB}$ at all frequencies above $1\,\mathrm{GHz}$ (ignore parasitics). Then derive $S_{21}$ of a shunt admittance from [[#eq-s-abcd]].
::: solution
A shunt admittance $Y$ has $A = D = 1$, $B = 0$, $C = Y$, so $\Delta = 2 + YZ_0$ and $S_{21} = 2/(2 + YZ_0)$, $S_{11} = -YZ_0/(2 + YZ_0)$. For $Y = 1/(j\omega L)$, $\abs{S_{21}}^2 = 1/[1 + (Z_0/2\omega L)^2]$. The requirement $(Z_0/2\omega L)^2\le10^{0.01} - 1$ gives $Z_0/(2\omega L)\le0.1526$, $\omega L\ge163.8\,\Omega$ and $L\ge163.8/(2\pi\times10^9) = 26.1\,\mathrm{nH}$. The loss falls as frequency rises (until the inductor's self-resonance, above which it is capacitive and the design fails).
:::
:::

::: exercise A lossless reciprocal four-port {level=3}
Show that a matched, lossless, reciprocal four-port can exist by verifying that
$$
\mathbf S = \frac{1}{\sqrt2}\begin{pmatrix}0 & j & 1 & 0\\ j & 0 & 0 & 1\\ 1 & 0 & 0 & j\\ 0 & 1 & j & 0\end{pmatrix}
$$
is symmetric and unitary. Interpret each entry: what happens to power entering port 1?
::: solution
The matrix equals its transpose by inspection. Each column contains two entries of magnitude $1/\sqrt2$, so $\sum\abs{S_{ij}}^2 = 1$. For orthogonality, columns 1 and 2 have non-zero entries in different rows, so $\sum_iS_{i1}S_{i2}^* = 0$; the same holds for columns 1 and 3, 2 and 4, and 3 and 4. Columns 1 and 4 overlap in rows 2 and 3: $\sum_iS_{i1}S_{i4}^* = \tfrac12[j\cdot1 + 1\cdot(-j)] = 0$; columns 2 and 3 overlap in rows 1 and 4: $\tfrac12[j\cdot1 + 1\cdot(-j)] = 0$. Power entering port 1 divides equally between ports 2 (phase $90^\circ$) and 3 (phase $0^\circ$), and none reaches port 4, which is **isolated**. This is the quadrature hybrid (branch-line coupler) of [[rf-microwave/passive-microwave-components]]: four ports escape the three-port impossibility.
:::
:::

::: exercise Gain of a cascade with reflections {level=3}
A source with $\Gamma_S$ drives a two-port $\mathbf S$ terminated in $\Gamma_L$. Using Mason's rule, show that the ratio of the wave delivered to the load to the source wave is
$$
\frac{b_2}{b_s} = \frac{S_{21}}{(1 - \Gamma_SS_{11})(1 - S_{22}\Gamma_L) - \Gamma_S\Gamma_LS_{12}S_{21}} ,
$$
and that it reduces to $S_{21}$ when source and load are matched.
::: solution
The only path from $b_s$ to $b_2$ is $b_s\to a_1\to b_2$, gain $S_{21}$; it touches every loop (it contains $a_1$, in the input and outer loops, and $b_2$, in the output loop), so $\Delta_1 = 1$. The loops are $L_1 = \Gamma_SS_{11}$, $L_2 = S_{22}\Gamma_L$ and $L_3 = \Gamma_SS_{21}\Gamma_LS_{12}$, of which only $L_1$ and $L_2$ do not touch. So $\Delta = 1 - L_1 - L_2 - L_3 + L_1L_2 = (1 - \Gamma_SS_{11})(1 - S_{22}\Gamma_L) - \Gamma_S\Gamma_LS_{12}S_{21}$, and $b_2/b_s = S_{21}/\Delta$. With $\Gamma_S = \Gamma_L = 0$, $\Delta = 1$ and the ratio is $S_{21}$. This expression is the core of the transducer power gain in [[rf-microwave/rf-amplifiers]].
:::
:::
