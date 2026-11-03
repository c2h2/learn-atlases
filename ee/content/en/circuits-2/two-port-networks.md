An amplifier, a filter, a transformer, a length of transmission line, a transistor: each is something with a pair of terminals where a signal goes in and another pair where it comes out. When we connect such a block into a system, we rarely care about the nodes and branches inside it. We want to know how it relates the voltage and current at its input to those at its output, so that we can predict what it does when driven by a particular source and loaded by a particular load, and what happens when several such blocks are joined.

A **two-port network** is the abstraction that answers that question. Its external behaviour is captured by four numbers (four functions of frequency, in general) arranged as a $2\times2$ matrix. There are several such matrices, each convenient for a different purpose: the **impedance** ($z$) and **admittance** ($y$) parameters for networks connected in series or in parallel, the **hybrid** ($h$) parameters used to describe transistors, and the **transmission** ($ABCD$) parameters for networks connected in cascade. This lesson defines them, computes them for standard networks, converts between them, derives the input impedance and gain of a terminated two-port, and shows how interconnected two-ports combine. The calculations use the phasor methods of [[circuits-2/ac-analysis]] and the Thévenin theorem of [[circuits-1/network-theorems]].

## Ports and two-port networks

A **port** is a pair of terminals at which the current entering one terminal equals the current leaving the other. A one-port is described by one number, its impedance (or its Thévenin equivalent, if it contains sources).

::: definition Two-port network {#def-two-port}
A **two-port network** is a network with two ports, port 1 (input) and port 2 (output), such that at each port the current entering one terminal leaves by the other. We use the standard reference directions: voltages $\mathbf V_1$, $\mathbf V_2$ positive at the upper terminals, and currents $\mathbf I_1$, $\mathbf I_2$ **entering** the upper terminals. We assume that the network is linear and contains no independent sources (dependent sources are allowed), and work with phasors at a single frequency, or with Laplace transforms and zero initial conditions.
:::

Under these assumptions two of the four port variables can be chosen freely, as if set by external sources, and the other two follow linearly. Which pair we choose as the independent variables defines the parameter set.

::: warning Both currents enter the network
In every standard parameter set $\mathbf I_2$ is defined as the current **entering** port 2. When the output drives a load $Z_L$, the load current flows out of the network, so $\mathbf V_2 = -Z_L\mathbf I_2$, not $+Z_L\mathbf I_2$. Forgetting this minus sign is the most frequent error in two-port calculations; it flips the sign of the gain and gives the wrong input impedance. The $ABCD$ parameters are written with $-\mathbf I_2$ precisely to make the output current point outwards.
:::

## Impedance and admittance parameters

::: definition Impedance (z) parameters {#def-z}
The **impedance parameters** express the port voltages in terms of the port currents:

$$
\begin{bmatrix}\mathbf V_1\\ \mathbf V_2\end{bmatrix} = \begin{bmatrix} z_{11} & z_{12}\\ z_{21} & z_{22}\end{bmatrix}\begin{bmatrix}\mathbf I_1\\ \mathbf I_2\end{bmatrix}.
$$ {#eq-z}

Each parameter is measured with one port **open-circuited**: $z_{11} = \mathbf V_1/\mathbf I_1$ and $z_{21} = \mathbf V_2/\mathbf I_1$ with $\mathbf I_2 = 0$; $z_{12} = \mathbf V_1/\mathbf I_2$ and $z_{22} = \mathbf V_2/\mathbf I_2$ with $\mathbf I_1 = 0$. They are therefore also called **open-circuit impedance parameters**, measured in ohms.
:::

::: definition Admittance (y) parameters {#def-y}
The **admittance parameters** express the currents in terms of the voltages:

$$
\begin{bmatrix}\mathbf I_1\\ \mathbf I_2\end{bmatrix} = \begin{bmatrix} y_{11} & y_{12}\\ y_{21} & y_{22}\end{bmatrix}\begin{bmatrix}\mathbf V_1\\ \mathbf V_2\end{bmatrix},
$$ {#eq-y}

each measured with one port **short-circuited**: $y_{11} = \mathbf I_1/\mathbf V_1$ and $y_{21} = \mathbf I_2/\mathbf V_1$ with $\mathbf V_2 = 0$, and so on. When both exist, the $y$ matrix is the inverse of the $z$ matrix.
:::

Not every two-port has every parameter set. A single series impedance $Z$ between the two upper terminals (with the lower terminals joined) has no $z$ parameters: its port currents always satisfy $\mathbf I_1 = -\mathbf I_2$, so they cannot be chosen independently (with port 2 open, $\mathbf I_1$ must be zero whatever $\mathbf V_1$ is, and $z_{11}$ would be infinite). Its $y$ parameters exist: $y_{11} = y_{22} = 1/Z$ and $y_{12} = y_{21} = -1/Z$. Dually, a single shunt impedance has $z$ parameters (all four equal to $Z$) but no $y$ parameters.

::: example z parameters of a T network {#ex-t}
A T network has a series arm $Z_a = 4\,\Omega$ from the upper terminal of port 1 to a central node, a series arm $Z_b = 6\,\Omega$ from the central node to the upper terminal of port 2, and a shunt arm $Z_c = 10\,\Omega$ from the central node to the common lower terminal. Find its $z$ parameters.
::: solution
With port 2 open, $\mathbf I_1$ flows through $Z_a$ and $Z_c$, and no current flows in $Z_b$, so $\mathbf V_2$ equals the voltage across $Z_c$:

$$
z_{11} = Z_a + Z_c = 14\,\Omega, \qquad z_{21} = Z_c = 10\,\Omega.
$$

With port 1 open, by the same reasoning, $z_{22} = Z_b + Z_c = 16\,\Omega$ and $z_{12} = Z_c = 10\,\Omega$. Conversely, any two-port with $z_{12} = z_{21}$ can be represented by a T with $Z_c = z_{12}$, $Z_a = z_{11} - z_{12}$ and $Z_b = z_{22} - z_{12}$: the **T-equivalent**, which for coupled coils gives the circuit of [[circuits-2/magnetically-coupled-circuits]].
:::
:::

::: example y parameters of a Π network {#ex-pi}
A Π network has a shunt admittance $Y_a = 0.1\,\mathrm S$ across port 1, a shunt admittance $Y_b = 0.2\,\mathrm S$ across port 2, and a capacitor of admittance $Y_c = j0.05\,\mathrm S$ connecting the two upper terminals. Find its $y$ parameters.
::: solution
Short port 2 ($\mathbf V_2 = 0$). Then $Y_b$ carries no current, and the current into port 1 divides between $Y_a$ and $Y_c$, both with voltage $\mathbf V_1$: $y_{11} = Y_a + Y_c = 0.1 + j0.05\,\mathrm S$. The current in $Y_c$, $Y_c\mathbf V_1$, flows into the shorted port 2 from inside, that is, **out of** its upper terminal, so $\mathbf I_2 = -Y_c\mathbf V_1$ and $y_{21} = -Y_c = -j0.05\,\mathrm S$. By symmetry of the argument, $y_{22} = Y_b + Y_c = 0.2 + j0.05\,\mathrm S$ and $y_{12} = -j0.05\,\mathrm S$. Conversely a reciprocal two-port has the **Π-equivalent** $Y_c = -y_{12}$, $Y_a = y_{11} + y_{12}$, $Y_b = y_{22} + y_{12}$.
:::
:::

### Reciprocity

In both examples the off-diagonal parameters were equal. This is not a coincidence.

::: theorem Reciprocity {#thm-reciprocity}
A two-port made only of resistors, capacitors, inductors, coupled inductors and ideal transformers is **reciprocal**: $z_{12} = z_{21}$ and $y_{12} = y_{21}$ (whenever these parameters exist). Physically, a current source at port 1 produces the same open-circuit voltage at port 2 as the same source at port 2 produces at port 1. Networks containing dependent sources (and hence transistor and op-amp circuits) are in general **not** reciprocal.
:::

::: proof
Write nodal equations for the network with the two upper port terminals as nodes $1$ and $2$ and the common terminal as reference (the general case, with separate lower terminals, is similar). Each two-terminal element of admittance $Y$ between nodes $j$ and $k$ adds $Y$ to the diagonal entries $(j,j)$ and $(k,k)$ and $-Y$ to the off-diagonal entries $(j,k)$ and $(k,j)$, so the nodal admittance matrix $\mathbf Y_n$ is symmetric. Coupled inductors keep it symmetric because $M_{12} = M_{21}$ ([[circuits-2/magnetically-coupled-circuits#thm-energy]]); an ideal transformer is the limit of coupled inductors. Eliminate all internal nodes, at which the injected current is zero: the reduced $2\times2$ matrix (the Schur complement of the internal block) is again symmetric, and it is the $y$ matrix of the two-port. The inverse of a symmetric matrix is symmetric, so $z_{12} = z_{21}$ too. A dependent source, for example a current $g_m\mathbf V_j$ injected at node $k$, adds an entry at $(k,j)$ with no matching entry at $(j,k)$, breaking the symmetry.
:::

A reciprocal two-port is described by three independent parameters. If it is also **symmetric**, meaning its ports can be interchanged without changing anything ($z_{11} = z_{22}$), two parameters suffice.

## Hybrid and transmission parameters

::: definition Hybrid (h) parameters {#def-h}
The **hybrid parameters** take $\mathbf I_1$ and $\mathbf V_2$ as independent variables:

$$
\begin{bmatrix}\mathbf V_1\\ \mathbf I_2\end{bmatrix} = \begin{bmatrix} h_{11} & h_{12}\\ h_{21} & h_{22}\end{bmatrix}\begin{bmatrix}\mathbf I_1\\ \mathbf V_2\end{bmatrix}.
$$ {#eq-h}

$h_{11} = \mathbf V_1/\mathbf I_1$ (with $\mathbf V_2 = 0$) is the short-circuit **input impedance**, $h_{21} = \mathbf I_2/\mathbf I_1$ (with $\mathbf V_2 = 0$) the short-circuit **current gain**, $h_{12} = \mathbf V_1/\mathbf V_2$ (with $\mathbf I_1 = 0$) the open-circuit **reverse voltage gain**, and $h_{22} = \mathbf I_2/\mathbf V_2$ (with $\mathbf I_1 = 0$) the open-circuit **output admittance**. For a reciprocal network $h_{12} = -h_{21}$.
:::

The $h$ parameters are "hybrid" because they have mixed units: ohms, dimensionless, dimensionless, siemens. They suit the bipolar transistor, whose input behaves nearly like a series impedance (easy to measure with the output shorted for AC) and whose output behaves nearly like a current source with a large parallel resistance (easy to measure with the input open for AC). Transistor data sheets used to quote $h_{ie}$, $h_{re}$, $h_{fe}$ and $h_{oe}$ for the common-emitter connection; the symbol $h_{FE}$ for the DC current gain $\beta$ survives to this day.

::: definition Transmission (ABCD) parameters {#def-abcd}
The **transmission parameters** express the input variables in terms of the output variables, with the output current taken as flowing **out**:

$$
\begin{bmatrix}\mathbf V_1\\ \mathbf I_1\end{bmatrix} = \begin{bmatrix} A & B\\ C & D\end{bmatrix}\begin{bmatrix}\mathbf V_2\\ -\mathbf I_2\end{bmatrix}.
$$ {#eq-abcd}

$A = \mathbf V_1/\mathbf V_2$ and $C = \mathbf I_1/\mathbf V_2$ are measured with the output open; $B = -\mathbf V_1/\mathbf I_2$ and $D = -\mathbf I_1/\mathbf I_2$ with the output shorted. For a reciprocal network $AD - BC = 1$; for a symmetric one, in addition, $A = D$.
:::

Two simple building blocks are worth memorising. A series impedance $Z$ has $\begin{bmatrix}1 & Z\\ 0 & 1\end{bmatrix}$; a shunt admittance $Y$ has $\begin{bmatrix}1 & 0\\ Y & 1\end{bmatrix}$. An ideal transformer with turns ratio $n = N_2/N_1$ has $\begin{bmatrix}1/n & 0\\ 0 & n\end{bmatrix}$; it has no $z$ or $y$ parameters at all.

### Conversions

All the parameter sets describe the same linear relation among four variables, so each can be computed from any other by rearranging the two equations. With $\Delta_z = z_{11}z_{22} - z_{12}z_{21}$:

| from $z$ to | parameters |
|---|---|
| $y$ | $y_{11} = z_{22}/\Delta_z$, $y_{12} = -z_{12}/\Delta_z$, $y_{21} = -z_{21}/\Delta_z$, $y_{22} = z_{11}/\Delta_z$ |
| $h$ | $h_{11} = \Delta_z/z_{22}$, $h_{12} = z_{12}/z_{22}$, $h_{21} = -z_{21}/z_{22}$, $h_{22} = 1/z_{22}$ |
| $ABCD$ | $A = z_{11}/z_{21}$, $B = \Delta_z/z_{21}$, $C = 1/z_{21}$, $D = z_{22}/z_{21}$ |

You do not need to memorise the table; derive whichever row you need. For example, the $ABCD$ row comes from setting $\mathbf I_2 = 0$ in [[#eq-z]] ($\mathbf V_1 = z_{11}\mathbf I_1$, $\mathbf V_2 = z_{21}\mathbf I_1$, hence $A = z_{11}/z_{21}$ and $C = 1/z_{21}$) and then $\mathbf V_2 = 0$ ($\mathbf I_1 = -z_{22}\mathbf I_2/z_{21}$, hence $D = z_{22}/z_{21}$ and $B = -\mathbf V_1/\mathbf I_2 = \Delta_z/z_{21}$). The $ABCD$ row also shows that $AD - BC = (z_{11}z_{22} - \Delta_z)/z_{21}^2 = z_{12}/z_{21}$, which equals $1$ exactly when the network is reciprocal.

::: example Converting the T network {#ex-convert}
Find the $y$, $h$ and $ABCD$ parameters of the T network of [[#ex-t]], and check reciprocity in each.
::: solution
$\Delta_z = 14\times16 - 10\times10 = 124\,\Omega^2$. Then

$$
y = \frac{1}{124}\begin{bmatrix}16 & -10\\ -10 & 14\end{bmatrix} = \begin{bmatrix}0.1290 & -0.0806\\ -0.0806 & 0.1129\end{bmatrix}\mathrm S, \qquad
h = \begin{bmatrix}7.75\,\Omega & 0.625\\ -0.625 & 0.0625\,\mathrm S\end{bmatrix},
$$

$$
\begin{bmatrix}A & B\\ C & D\end{bmatrix} = \begin{bmatrix}1.4 & 12.4\,\Omega\\ 0.1\,\mathrm S & 1.6\end{bmatrix}.
$$

Reciprocity appears as $y_{12} = y_{21}$, $h_{12} = -h_{21}$ and $AD - BC = 2.24 - 1.24 = 1$. A direct check of $h_{11}$: with port 2 shorted, port 1 sees $4 + (6\parallel10) = 4 + 3.75 = 7.75\,\Omega$.
:::
:::

::: quiz
Which parameter set is undefined for an ideal transformer?
- [ ] $ABCD$
- [ ] $h$
- [x] $z$
- [ ] All of them are defined
::: solution
With port 2 open, an ideal transformer forces $\mathbf I_1 = 0$ (by ampere-turn balance) for any $\mathbf V_1$, so $z_{11} = \mathbf V_1/\mathbf I_1$ is infinite: an ideal transformer has infinite magnetising inductance. Its $ABCD$ matrix is $\mathrm{diag}(1/n, n)$ and its $h$ parameters are $h_{11} = 0$, $h_{12} = 1/n$, $h_{21} = -1/n$, $h_{22} = 0$; its $y$ parameters do not exist either.
:::
:::

## The terminated two-port

In use, a two-port is driven at port 1 by a source with Thévenin voltage $\mathbf V_s$ and impedance $Z_s$, and loaded at port 2 by $Z_L$. Four quantities describe its behaviour: the input impedance $Z_{\text{in}} = \mathbf V_1/\mathbf I_1$, the voltage gain $\mathbf V_2/\mathbf V_1$, the current gain $-\mathbf I_2/\mathbf I_1$ and the Thévenin equivalent seen by the load.

::: theorem Terminated two-port {#thm-terminated}
For a two-port with $z$ parameters loaded by $Z_L$ (so $\mathbf V_2 = -Z_L\mathbf I_2$):

$$
Z_{\text{in}} = z_{11} - \frac{z_{12}z_{21}}{z_{22} + Z_L}, \qquad \frac{\mathbf V_2}{\mathbf V_1} = \frac{z_{21}Z_L}{z_{11}(z_{22} + Z_L) - z_{12}z_{21}}.
$$ {#eq-terminated}

Driven from a source $\mathbf V_s$, $Z_s$, the output port has the Thévenin equivalent

$$
\mathbf V_{\text{th}} = \frac{z_{21}}{z_{11} + Z_s}\,\mathbf V_s, \qquad Z_{\text{out}} = z_{22} - \frac{z_{12}z_{21}}{z_{11} + Z_s}.
$$

In $ABCD$ form, $Z_{\text{in}} = (AZ_L + B)/(CZ_L + D)$ and $\mathbf V_2/\mathbf V_1 = Z_L/(AZ_L + B)$.
:::

::: proof
Substituting $\mathbf V_2 = -Z_L\mathbf I_2$ in the second line of [[#eq-z]]: $-Z_L\mathbf I_2 = z_{21}\mathbf I_1 + z_{22}\mathbf I_2$, so $\mathbf I_2 = -z_{21}\mathbf I_1/(z_{22} + Z_L)$. The first line then gives $\mathbf V_1 = [z_{11} - z_{12}z_{21}/(z_{22} + Z_L)]\mathbf I_1$, which is $Z_{\text{in}}$. The voltage gain is $\mathbf V_2/\mathbf V_1 = -Z_L\mathbf I_2/(Z_{\text{in}}\mathbf I_1)$, which simplifies to the stated form. For the output Thévenin equivalent, the input side now obeys $\mathbf V_1 = \mathbf V_s - Z_s\mathbf I_1$; with port 2 open ($\mathbf I_2 = 0$), $\mathbf I_1 = \mathbf V_s/(z_{11} + Z_s)$ and $\mathbf V_{\text{th}} = z_{21}\mathbf I_1$. With $\mathbf V_s = 0$, $\mathbf I_1 = -z_{12}\mathbf I_2/(z_{11} + Z_s)$ and $\mathbf V_2/\mathbf I_2 = z_{22} - z_{12}z_{21}/(z_{11} + Z_s)$. The $ABCD$ forms follow from [[#eq-abcd]] with $-\mathbf I_2 = \mathbf V_2/Z_L$.
:::

For coupled coils, $z_{11} = j\omega L_1$, $z_{22} = j\omega L_2$ and $z_{12} = z_{21} = j\omega M$, and $Z_{\text{in}}$ is exactly the reflected-impedance formula of [[circuits-2/magnetically-coupled-circuits#thm-reflected]]. The input impedance of a two-port depends on its load, and its output impedance on its source, unless $z_{12}z_{21} = 0$: a **unilateral** two-port, with no transmission from output back to input, isolates its two sides completely.

::: example A transistor amplifier with h parameters {#ex-h-amp}
A bipolar transistor in the common-emitter connection has $h_{ie} = 1\,\mathrm{k\Omega}$, $h_{re} = 2.5\times10^{-4}$, $h_{fe} = 50$ and $h_{oe} = 25\,\mathrm{\mu S}$ at the operating point. It drives a load $R_L = 2\,\mathrm{k\Omega}$ and is driven by a source of internal resistance $R_s = 600\,\Omega$. Find the voltage gain $\mathbf V_2/\mathbf V_1$, the input impedance, and the overall gain $\mathbf V_2/\mathbf V_s$.
::: solution
From [[#eq-h]] with $\mathbf V_2 = -R_L\mathbf I_2$: $\mathbf I_2 = h_{21}\mathbf I_1 + h_{22}\mathbf V_2$ gives $\mathbf I_2 = h_{21}\mathbf I_1/(1 + h_{22}R_L)$; substituting into $\mathbf V_1 = h_{11}\mathbf I_1 + h_{12}\mathbf V_2$:

$$
Z_{\text{in}} = h_{11} - \frac{h_{12}h_{21}R_L}{1 + h_{22}R_L} = 1000 - \frac{2.5\times10^{-4}\times50\times2000}{1.05} = 1000 - 23.8 = 976\,\Omega.
$$

The voltage gain, with $\Delta_h = h_{11}h_{22} - h_{12}h_{21} = 0.025 - 0.0125 = 0.0125$, is

$$
\frac{\mathbf V_2}{\mathbf V_1} = \frac{-h_{21}R_L}{h_{11} + \Delta_hR_L} = \frac{-50\times2000}{1000 + 25} = -97.6.
$$

The input divider then gives $\mathbf V_2/\mathbf V_s = -97.6\times976/(976 + 600) = -60.4$. Neglecting $h_{re}$ and $h_{oe}$ (the usual first approximation) would give $-h_{fe}R_L/h_{ie} = -100$ and $Z_{\text{in}} = 1\,\mathrm{k\Omega}$, within a few percent here; the small parameters matter more for large loads, as the figure shows.
:::
:::

::: widget plot
f: 50*x/(1 + (0.001*g - 0.0125)*x); 50*x
x: 0, 100
y: 0, 3000
sliders: g=25:0:100:0.5
labels: \lvert \mathbf V_2/\mathbf V_1\rvert; -h_{fe}R_L/h_{ie}
caption: Magnitude of the voltage gain of the transistor of the example against the load resistance $R_L$ in kilohms, for an output admittance $h_{oe}$ of $g$ microsiemens (slider), with $h_{ie} = 1\,\mathrm{k\Omega}$, $h_{fe} = 50$, $h_{re} = 2.5\times10^{-4}$. For small loads the gain follows the simple estimate $h_{fe}R_L/h_{ie}$; for large loads it saturates at $h_{fe}/\Delta_h$. Set $g$ to $12.5$ and the two terms of $\Delta_h$ cancel: the gain grows without limit in this model, a sign that internal feedback through $h_{re}$ can matter.
:::

## Interconnected two-ports

Complex networks are often built from simpler two-ports, and the parameters of the combination follow from those of the parts.

::: theorem Interconnection of two-ports {#thm-interconnection}
Let two-ports $N_a$ and $N_b$ be connected so that each still satisfies the port condition.

1. **Series** (input ports in series, output ports in series): $\mathbf z = \mathbf z_a + \mathbf z_b$.
2. **Parallel** (input ports in parallel, output ports in parallel): $\mathbf y = \mathbf y_a + \mathbf y_b$.
3. **Cascade** (output of $N_a$ connected to input of $N_b$): $\mathbf T = \mathbf T_a\mathbf T_b$, where $\mathbf T$ is the $ABCD$ matrix.
:::

::: proof
In the series connection both networks carry the same port currents $\mathbf I_1$, $\mathbf I_2$, and the port voltages add: $\mathbf V = \mathbf z_a\mathbf I + \mathbf z_b\mathbf I = (\mathbf z_a + \mathbf z_b)\mathbf I$. In the parallel connection both have the same port voltages and the currents add: $\mathbf I = (\mathbf y_a + \mathbf y_b)\mathbf V$. In the cascade, the output voltage of $N_a$ is the input voltage of $N_b$, and the current leaving $N_a$'s output, $-\mathbf I_2^{(a)}$, is the current entering $N_b$'s input, $\mathbf I_1^{(b)}$. Hence $[\mathbf V_2^{(a)}; -\mathbf I_2^{(a)}] = [\mathbf V_1^{(b)}; \mathbf I_1^{(b)}] = \mathbf T_b[\mathbf V_2^{(b)}; -\mathbf I_2^{(b)}]$, and substituting into $[\mathbf V_1^{(a)}; \mathbf I_1^{(a)}] = \mathbf T_a[\mathbf V_2^{(a)}; -\mathbf I_2^{(a)}]$ gives the product. This is the reason for the minus sign in the definition [[#eq-abcd]].
:::

The cascade rule always holds. The series and parallel rules hold only if the connection does not upset the port condition of either network, for instance by creating a path that lets current enter one terminal of a port and leave by a terminal of the other port. Two networks that both have a common lower terminal can always be paralleled safely; in doubtful cases an ideal $1{:}1$ transformer at one port restores the port condition. Checking this is called the **Brune test**.

::: remark Feedback amplifiers as interconnected two-ports
The four feedback configurations of amplifier design (series–shunt, shunt–shunt, series–series, shunt–series) are interconnections of an amplifier two-port and a feedback two-port, analysed by adding $h$, $y$, $z$ or $g$ (inverse hybrid) parameters respectively. This is the standard method of [[electronics-2]].
:::

::: example Cascaded RC sections with ABCD matrices {#ex-cascade}
Use $ABCD$ matrices to find the open-circuit voltage gain of two identical $RC$ low-pass sections (series $R$, shunt $C$) connected in cascade.
::: solution
One section is a series impedance $R$ followed by a shunt admittance $sC$:

$$
\mathbf T_1 = \begin{bmatrix}1 & R\\ 0 & 1\end{bmatrix}\begin{bmatrix}1 & 0\\ sC & 1\end{bmatrix} = \begin{bmatrix}1 + sRC & R\\ sC & 1\end{bmatrix}.
$$

Two in cascade:

$$
\mathbf T = \mathbf T_1^2 = \begin{bmatrix}(1 + sRC)^2 + sRC & R(1 + sRC) + R\\ sC(1 + sRC) + sC & sRC + 1\end{bmatrix}.
$$

With the output open, $\mathbf V_1 = A\mathbf V_2$, so the gain is $1/A = 1/(s^2R^2C^2 + 3sRC + 1)$, the loaded-cascade result of [[circuits-2/filters#exr-cascade]], obtained by multiplying two matrices instead of writing node equations. Check: $AD - BC = (1 + 3sRC + s^2R^2C^2)(1 + sRC) - R\,sC(2 + sRC)(2 + sRC)$; expanding, the terms in $s$, $s^2$ and $s^3$ all cancel, leaving $1$, as reciprocity requires.
:::
:::

::: example Designing a matched attenuator {#ex-pad}
Design a symmetric resistive T attenuator ("pad") for a $50\,\Omega$ system with an attenuation of $6\,\mathrm{dB}$: when terminated in $50\,\Omega$ it must present $50\,\Omega$ at its input, and $\mathbf V_2/\mathbf V_1$ must be $-6\,\mathrm{dB}$.
::: solution
Let the series arms be $R_1$ and the shunt arm $R_2$, so $z_{11} = z_{22} = R_1 + R_2$ and $z_{12} = z_{21} = R_2$ by [[#ex-t]]. Write $K = 10^{6/20} = 1.995$ for the voltage ratio $\mathbf V_1/\mathbf V_2$ and $Z_0 = 50\,\Omega$. The matching condition $Z_{\text{in}} = Z_0$ with $Z_L = Z_0$ is, by [[#eq-terminated]], $(R_1 + R_2) - R_2^2/(R_1 + R_2 + Z_0) = Z_0$. The gain condition, by the same theorem, is $\mathbf V_2/\mathbf V_1 = 1/K$. Solving the two equations (exercise [[#exr-pad]]) gives

$$
R_1 = Z_0\frac{K - 1}{K + 1} = 50\times\frac{0.995}{2.995} = 16.6\,\Omega, \qquad R_2 = Z_0\frac{2K}{K^2 - 1} = 50\times\frac{3.990}{2.981} = 66.9\,\Omega.
$$

Check: $z_{11} = 83.5\,\Omega$, and $Z_{\text{in}} = 83.5 - 66.9^2/(83.5 + 50) = 83.5 - 33.5 = 50.0\,\Omega$. The output voltage ratio is $0.501$, which is $-6.0\,\mathrm{dB}$. Standard values $16.5\,\Omega$ and $66.5\,\Omega$ (E96) give $Z_{\text{in}} = 49.8\,\Omega$ and $6.0\,\mathrm{dB}$. Pads like this are placed in front of signal generators and mixers to make the impedance they see insensitive to the load, as the figure below shows.
:::
:::

::: widget plot
f: 50*(10^(a/20) - 1)/(10^(a/20) + 1) + 100*10^(a/20)/(10^(a/10) - 1) - (100*10^(a/20)/(10^(a/10) - 1))^2/(50*(10^(a/20) - 1)/(10^(a/20) + 1) + 100*10^(a/20)/(10^(a/10) - 1) + x)
x: 0, 300
y: 0, 120
sliders: a=6:1:30:0.5
hlines: 50
caption: Input resistance (in ohms) of a matched $50\,\Omega$ T pad of attenuation $a$ dB (slider), against the load resistance $R_L$ in ohms. At $R_L = 50\,\Omega$ the input is always $50\,\Omega$. With a $6\,\mathrm{dB}$ pad, a short ($R_L = 0$) or a large mismatch moves the input only to between about $30$ and $83\,\Omega$; raise the attenuation to $20\,\mathrm{dB}$ and the input stays within a few ohms of $50$ whatever the load. That isolation is what an attenuator is bought for.
:::

::: quiz
Two two-ports are connected in cascade. Which parameter matrices multiply?
- [ ] The $z$ matrices
- [ ] The $y$ matrices
- [x] The $ABCD$ matrices, in the order in which the signal passes through them
- [ ] The $h$ matrices, in either order
::: solution
For a cascade, $\mathbf T = \mathbf T_a\mathbf T_b$ by [[#thm-interconnection]]. Matrix multiplication does not commute, so the order matters: the first network the signal enters comes first. The $z$ matrices add for a series connection and the $y$ matrices for a parallel one.
:::
:::

::: application S-parameters at high frequencies
At microwave frequencies the open and short circuits needed to measure $z$, $y$ or $h$ parameters are impossible to realise (a short a few millimetres long is already an inductor, and an active device may oscillate when its port is opened). Instead, ports are terminated in a reference impedance, usually $50\,\Omega$, and the network is described by **scattering parameters**, $S_{11}$, $S_{21}$, $S_{12}$, $S_{22}$, which relate incident and reflected waves. A vector network analyser measures them directly, and they convert to and from the parameters of this lesson by formulas of the same kind as the table above. They are developed in [[rf-microwave]].
:::

::: history
The idea of describing a network by its terminal behaviour alone grew out of telephone engineering, where long lines, loading coils and repeaters had to be combined. The German engineer Franz Breisig introduced the term *Vierpol* (four-pole, that is, four-terminal network) around 1921, and Felix Strecker and Richard Feldtkeller formulated the theory in matrix form in 1929. Otto Brune's 1931 thesis at MIT on the synthesis of passive networks included the conditions under which two-ports may validly be interconnected. Reciprocity itself goes back to Hermann von Helmholtz and Lord Rayleigh, who stated reciprocal theorems for acoustics and mechanics in the nineteenth century. Hybrid parameters became the standard small-signal description of the junction transistor in the 1950s.
:::

## Where this leads

Two-port parameters are the language of amplifier and device modelling. The small-signal models of the BJT and MOSFET in [[electronics-1]] are two-ports, and feedback amplifiers are analysed as interconnected two-ports in [[electronics-2]]. A uniform transmission line is a two-port whose $ABCD$ matrix contains $\cosh$ and $\sinh$ of its propagation constant ([[electromagnetics]]), and power-system engineers model long lines in the same way ([[power-systems]]). At radio frequencies the scattering parameters of [[rf-microwave]] take over. In [[circuits-2/laplace-circuit-analysis]] terms, each parameter is itself a transfer function of $s$, with poles and zeros of its own.

::: summary
- A two-port is described by a $2\times2$ matrix relating its port voltages and currents, with both currents entering the network; a load therefore imposes $\mathbf V_2 = -Z_L\mathbf I_2$.
- $z$ parameters (open-circuit, ohms) and $y$ parameters (short-circuit, siemens) are inverses; $h$ parameters mix them and describe transistors; $ABCD$ parameters relate input to output and multiply in cascade.
- Networks of $R$, $L$, $C$, coupled coils and ideal transformers are reciprocal: $z_{12} = z_{21}$, $y_{12} = y_{21}$, $h_{12} = -h_{21}$, $AD - BC = 1$. Dependent sources break reciprocity.
- A reciprocal two-port has a T-equivalent (from $z$) and a Π-equivalent (from $y$).
- Terminated: $Z_{\text{in}} = z_{11} - z_{12}z_{21}/(z_{22} + Z_L) = (AZ_L + B)/(CZ_L + D)$; the input depends on the load unless the network is unilateral.
- Series connections add $z$ matrices, parallel connections add $y$ matrices (if the port condition survives), and cascades multiply $ABCD$ matrices in signal order.
:::

## Exercises

::: exercise A T network {level=1 check="7"}
A T network has series arms of $2\,\Omega$ and $3\,\Omega$ and a shunt arm of $5\,\Omega$. Find $z_{11}$, in ohms (port 1 on the $2\,\Omega$ side), and the other $z$ parameters.
::: solution
$z_{11} = 2 + 5 = 7\,\Omega$, $z_{22} = 3 + 5 = 8\,\Omega$, $z_{12} = z_{21} = 5\,\Omega$.
:::
:::

::: exercise A series resistor {level=1 check="-0.05"}
A two-port consists of a single $20\,\Omega$ resistor connecting the upper terminals of its ports, with the lower terminals joined. Find $y_{12}$ in siemens.
::: solution
With port 2 shorted, the current entering port 2 is $-\mathbf V_1/20$, so $y_{21} = -0.05\,\mathrm S$, and by symmetry $y_{12} = -0.05\,\mathrm S$; $y_{11} = y_{22} = 0.05\,\mathrm S$. This two-port has no $z$ parameters.
:::
:::

::: exercise Cascaded series resistors {level=1 check="25"}
Two series resistors, $10\,\Omega$ and $15\,\Omega$, are treated as two-ports and cascaded. Multiply their $ABCD$ matrices and give $B$ in ohms.
::: solution
$\begin{bmatrix}1 & 10\\ 0 & 1\end{bmatrix}\begin{bmatrix}1 & 15\\ 0 & 1\end{bmatrix} = \begin{bmatrix}1 & 25\\ 0 & 1\end{bmatrix}$, so $B = 25\,\Omega$: a single $25\,\Omega$ series resistor, as expected.
:::
:::

::: exercise From z to y {level=2 check="16/124"}
For the T network of [[#ex-t]] ($z_{11} = 14$, $z_{12} = z_{21} = 10$, $z_{22} = 16\,\Omega$), verify $y_{11}$ (in siemens) directly by shorting port 2.
::: solution
With port 2 shorted, port 1 sees $4 + (6\parallel10) = 7.75\,\Omega$, so $y_{11} = 1/7.75 = 0.1290\,\mathrm S$, which agrees with $z_{22}/\Delta_z = 16/124$.
:::
:::

::: exercise Input impedance with a load {level=2 check="14-100/26"}
The T network of [[#ex-t]] is loaded by $10\,\Omega$. Find its input impedance in ohms, by [[#thm-terminated]] and directly.
::: solution
$Z_{\text{in}} = 14 - 100/(16 + 10) = 14 - 3.846 = 10.15\,\Omega$. Directly: $4 + 10\parallel(6 + 10) = 4 + 160/26 = 4 + 6.154 = 10.15\,\Omega$.
:::
:::

::: exercise Current gain from h parameters {level=2 check="-10/16"}
Find $h_{21}$ of the T network of [[#ex-t]] and interpret it.
::: solution
$h_{21} = -z_{21}/z_{22} = -10/16 = -0.625$. With port 2 shorted, the current $\mathbf I_1$ divides between the $10\,\Omega$ shunt arm and the $6\,\Omega$ arm leading to the short: $10/(10 + 6) = 0.625$ of it flows out through the short, that is, $\mathbf I_2 = -0.625\,\mathbf I_1$ with $\mathbf I_2$ defined as entering.
:::
:::

::: exercise A transconductance amplifier {level=2}
A two-port model of an amplifier has an input resistance $R_i$ across port 1, and at port 2 a dependent current source $g_m\mathbf V_1$ directed **out of** the upper terminal of port 2 in parallel with an output resistance $R_o$. (a) Find its $y$ parameters and its $z$ parameters. (b) Is it reciprocal? (c) Find the voltage gain with a load $R_L$, for $R_i = 10\,\mathrm{k\Omega}$, $g_m = 40\,\mathrm{mS}$, $R_o = 50\,\mathrm{k\Omega}$, $R_L = 5\,\mathrm{k\Omega}$.
::: solution
(a) $\mathbf I_1 = \mathbf V_1/R_i$. At port 2 the current entering the upper terminal is the current into $R_o$, $\mathbf V_2/R_o$, minus the source current $g_m\mathbf V_1$, which is directed outwards. So $\mathbf I_2 = -g_m\mathbf V_1 + \mathbf V_2/R_o$, giving $y_{11} = 1/R_i$, $y_{12} = 0$, $y_{21} = -g_m$, $y_{22} = 1/R_o$. Inverting, $\Delta_y = 1/(R_iR_o)$, and $z_{11} = R_i$, $z_{12} = 0$, $z_{21} = g_mR_iR_o$, $z_{22} = R_o$.

(b) No: $y_{12} = 0 \ne y_{21}$. It is unilateral, so its input impedance is $R_i$ for every load.

(c) With $\mathbf V_2 = -R_L\mathbf I_2$: $-\mathbf V_2/R_L = -g_m\mathbf V_1 + \mathbf V_2/R_o$, so $\mathbf V_2/\mathbf V_1 = g_m(R_o\parallel R_L) = 0.04\times4545 = 182$. (The sign is positive because the source was defined as pushing current out into the load.)
:::
:::

::: exercise The matched T pad {#exr-pad level=3}
Derive the design formulas of [[#ex-pad]]: show that a symmetric T pad with series arms $R_1$ and shunt arm $R_2$, terminated in $Z_0$, presents $Z_0$ at its input and has $\mathbf V_1/\mathbf V_2 = K$ when $R_1 = Z_0(K - 1)/(K + 1)$ and $R_2 = 2KZ_0/(K^2 - 1)$.
::: hint
With the load $Z_0$ and input $Z_0$, the current into the pad is $\mathbf V_1/Z_0$ and the current out is $\mathbf V_2/Z_0$. Write KVL around each half.
:::
::: solution
Let the central node voltage be $\mathbf V_m$. The input current is $\mathbf I_1 = \mathbf V_1/Z_0$ (matched input) and the output current is $\mathbf V_2/Z_0$. The output arm gives $\mathbf V_m = \mathbf V_2 + R_1\mathbf V_2/Z_0 = \mathbf V_2(1 + R_1/Z_0)$; the input arm gives $\mathbf V_m = \mathbf V_1 - R_1\mathbf V_1/Z_0 = \mathbf V_1(1 - R_1/Z_0)$. Dividing, $K = \mathbf V_1/\mathbf V_2 = (Z_0 + R_1)/(Z_0 - R_1)$, which solves to $R_1 = Z_0(K - 1)/(K + 1)$. KCL at the middle node: $\mathbf V_1/Z_0 = \mathbf V_m/R_2 + \mathbf V_2/Z_0$, so $R_2 = \mathbf V_mZ_0/(\mathbf V_1 - \mathbf V_2)$. With $\mathbf V_m = \mathbf V_2(1 + R_1/Z_0) = \mathbf V_2\cdot2K/(K + 1)$ and $\mathbf V_1 - \mathbf V_2 = \mathbf V_2(K - 1)$: $R_2 = Z_0\cdot2K/((K + 1)(K - 1)) = 2KZ_0/(K^2 - 1)$. For $K = 10$ ($20\,\mathrm{dB}$) and $Z_0 = 50\,\Omega$: $R_1 = 40.9\,\Omega$ and $R_2 = 10.1\,\Omega$.
:::
:::

::: exercise Reciprocity and the transmission matrix {level=3}
(a) Show that for any two-port with $z$ parameters, $AD - BC = z_{12}/z_{21}$. (b) Show that the cascade of two reciprocal two-ports is reciprocal. (c) Use the result to check that the transconductance amplifier of the previous exercise has no $ABCD$ matrix with $AD - BC = 1$, and say why its $ABCD$ matrix does not even exist when $g_m = 0$.
::: solution
(a) From the conversion table, $AD - BC = \dfrac{z_{11}}{z_{21}}\cdot\dfrac{z_{22}}{z_{21}} - \dfrac{\Delta_z}{z_{21}}\cdot\dfrac{1}{z_{21}} = \dfrac{z_{11}z_{22} - (z_{11}z_{22} - z_{12}z_{21})}{z_{21}^2} = \dfrac{z_{12}}{z_{21}}$.

(b) $AD - BC$ is the determinant of the $ABCD$ matrix, and the determinant of a product is the product of the determinants: $1\times1 = 1$.

(c) With $z_{12} = 0$ and $z_{21} = g_mR_iR_o$, $AD - BC = 0 \ne 1$: not reciprocal, as expected. When $g_m = 0$, $z_{21} = 0$ and the formulas $A = z_{11}/z_{21}$ and so on are infinite: with no forward transmission, the output carries no information about the input, so the input cannot be written as a function of the output variables.
:::
:::
