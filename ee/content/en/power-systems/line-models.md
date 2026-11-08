A transmission line is a distributed circuit: every metre has a little series resistance and inductance and a little shunt capacitance. For a $40\,\mathrm{km}$ subtransmission line the capacitance hardly matters and the line is a simple series impedance. For a $150\,\mathrm{km}$ line the charging current is no longer negligible and a lumped π circuit is needed. For a $400\,\mathrm{km}$ extra-high-voltage line even the π circuit with total impedance and admittance is noticeably wrong, because at $50\,\mathrm{Hz}$ such a line is already a fifteenth of a wavelength long, and wave effects appear: the voltage at the open end of an unloaded line *rises* above the sending-end voltage, and the line's capacity depends on a characteristic power called the surge impedance loading.

In this chapter we take the per-length parameters of [[power-systems/line-parameters]] and build models of increasing accuracy, all expressed as two-port **ABCD** (transmission) parameters, as in [[circuits-2/two-port-networks]]. We derive the exact solution of the distributed line from the telegrapher's equations of [[electromagnetics/transmission-lines]], find the equivalent π circuit that reproduces it exactly at the terminals, and use the lossless approximation to understand surge impedance loading, the Ferranti effect, the power-transfer limit and the purpose of series and shunt compensation.

## Lines as two-ports

We work per phase, with phase-to-neutral voltages, in a balanced system. Let $\mathbf V_S$, $\mathbf I_S$ be the sending-end voltage and current (current entering the line) and $\mathbf V_R$, $\mathbf I_R$ the receiving-end quantities (current leaving the line towards the load).

::: definition ABCD parameters of a line {#def-abcd}
The **ABCD parameters** of a line relate its sending-end quantities to its receiving-end quantities:
$$
\begin{bmatrix}\mathbf V_S\\ \mathbf I_S\end{bmatrix} = \begin{bmatrix}A & B\\ C & D\end{bmatrix}\begin{bmatrix}\mathbf V_R\\ \mathbf I_R\end{bmatrix}.
$$ {#eq-abcd}
$A$ and $D$ are dimensionless, $B$ is an impedance and $C$ an admittance. For any line (a reciprocal network) $AD - BC = 1$, and for a line that is the same seen from either end (symmetrical) $A = D$.
:::

Two figures of merit describe a line's performance at a given load.

::: definition Voltage regulation and efficiency {#def-regulation}
With the sending-end voltage held fixed, the **voltage regulation** of a line at a given load is
$$
\mathrm{VR} = \frac{V_{R,\text{nl}} - V_{R,\text{fl}}}{V_{R,\text{fl}}},\qquad V_{R,\text{nl}} = \frac{V_S}{\abs{A}},
$$ {#eq-vr}
where $V_{R,\text{nl}}$ is the receiving-end voltage at no load ($\mathbf I_R = 0$ in [[#eq-abcd]]). The **transmission efficiency** is $\eta = P_R/P_S$, the ratio of real power received to real power sent.
:::

Two-ports in cascade multiply: if a transformer with ABCD matrix $T_1$ feeds a line $T_2$, the combination has matrix $T_1T_2$. A series impedance $Z$ has $\begin{bmatrix}1 & Z\\0 & 1\end{bmatrix}$ and a shunt admittance $Y$ has $\begin{bmatrix}1 & 0\\ Y & 1\end{bmatrix}$; every lumped model below is a product of these.

## The short line

For overhead lines up to about $80\,\mathrm{km}$ at $50$ or $60\,\mathrm{Hz}$ the shunt capacitance can be neglected, and the line is a series impedance $Z = z\ell = (r + j\omega l)\ell$:
$$
A = D = 1,\qquad B = Z,\qquad C = 0.
$$ {#eq-short}
The phasor diagram is the familiar one: $\mathbf V_S = \mathbf V_R + Z\mathbf I_R$, and the drop $Z\mathbf I_R$ is mostly perpendicular to the current because $X\gg R$. A lagging load makes $V_S$ noticeably larger than $V_R$; a leading load can make $V_R$ exceed $V_S$.

::: example A 132 kV short line {#ex-short}
A $40\,\mathrm{km}$, $132\,\mathrm{kV}$, $50\,\mathrm{Hz}$ line has $z = 0.090 + j0.383\,\Omega/\mathrm{km}$ per phase. It delivers $50\,\mathrm{MW}$ at power factor $0.85$ lagging at $132\,\mathrm{kV}$. Find the sending-end line voltage, the regulation and the efficiency.
::: solution
$Z = 40z = 3.60 + j15.32\,\Omega$. Per phase $\mathbf V_R = 132\,000/\sqrt3 = 76\,210\angle0^\circ\,\mathrm V$ and
$$
\mathbf I_R = \frac{50\times10^6}{3\times76\,210\times0.85}\angle -31.79^\circ = 257.3\angle -31.79^\circ\,\mathrm A.
$$
Then $\mathbf V_S = \mathbf V_R + Z\mathbf I_R = 79\,126\angle 2.07^\circ\,\mathrm V$ per phase, so $V_{S,LL} = \sqrt3\times79\,126 = 137.0\,\mathrm{kV}$. With $A = 1$ the no-load receiving voltage equals $V_S$, so $\mathrm{VR} = (79\,126 - 76\,210)/76\,210 = 3.8\,\%$. The loss is $3\times257.3^2\times3.60 = 0.715\,\mathrm{MW}$, so $\eta = 50/50.715 = 98.6\,\%$. The approximation $\Delta V\approx(PR + QX)/V^2$ in per unit from [[power-systems/power-system-structure]] gives $3.76\,\%$, very close.
:::
:::

## The medium line: nominal π

For lines of roughly $80$ to $250\,\mathrm{km}$ the total shunt admittance $Y = y\ell = j\omega c\ell$ must be included. Lumping half of it at each end gives the **nominal π** circuit: a shunt $Y/2$, a series $Z$, and another shunt $Y/2$.

::: theorem ABCD parameters of the nominal π {#thm-nominal-pi}
The nominal π circuit with series impedance $Z$ and shunt admittances $Y/2$ at each end has
$$
A = D = 1 + \frac{YZ}2,\qquad B = Z,\qquad C = Y\left(1 + \frac{YZ}4\right).
$$ {#eq-nominal-pi}
:::

::: proof
The current in the series branch is the load current plus the current in the receiving-end shunt: $\mathbf I_R + \tfrac Y2\mathbf V_R$. Then
$$
\mathbf V_S = \mathbf V_R + Z\Bigl(\mathbf I_R + \frac Y2\mathbf V_R\Bigr) = \Bigl(1 + \frac{YZ}2\Bigr)\mathbf V_R + Z\mathbf I_R.
$$
The sending current adds the current in the sending-end shunt:
$$
\mathbf I_S = \mathbf I_R + \frac Y2\mathbf V_R + \frac Y2\mathbf V_S = \mathbf I_R + \frac Y2\mathbf V_R + \frac Y2\Bigl(1 + \frac{YZ}2\Bigr)\mathbf V_R + \frac{YZ}2\mathbf I_R,
$$
so $C = Y + \frac{Y^2Z}4 = Y\bigl(1 + \frac{YZ}4\bigr)$ and $D = 1 + \frac{YZ}2$. One checks $AD - BC = \bigl(1 + \tfrac{YZ}2\bigr)^2 - YZ\bigl(1 + \tfrac{YZ}4\bigr) = 1$.
:::

Since $YZ\approx-\omega^2lc\,\ell^2$ is negative and real for a low-loss line, $\abs A < 1$: the no-load receiving voltage $V_S/\abs A$ is *higher* than the sending voltage. The line's own charging current, flowing through its series inductance, raises the voltage along it.

::: example A 220 kV line by the nominal π {#ex-medium}
A $150\,\mathrm{km}$, $220\,\mathrm{kV}$, $50\,\mathrm{Hz}$ line has $z = 0.050 + j0.313\,\Omega/\mathrm{km}$ and $y = j3.60\,\mu\mathrm S/\mathrm{km}$ per phase. It supplies $150\,\mathrm{MW}$ at $0.9$ power factor lagging at $215\,\mathrm{kV}$. Find the sending-end voltage and current, the regulation and the efficiency.
::: solution
$Z = 7.50 + j46.95\,\Omega$, $Y = j5.40\times10^{-4}\,\mathrm S$. From [[#eq-nominal-pi]], $A = 1 + YZ/2 = 0.98732 + j0.00203$ and $C = Y(1 + YZ/4) = -5.5\times10^{-7} + j5.366\times10^{-4}\,\mathrm S$.

$\mathbf V_R = 215\,000/\sqrt3 = 124\,130\angle0^\circ\,\mathrm V$; $\mathbf I_R = 150\times10^6/(3\times124\,130\times0.9)\angle-25.84^\circ = 447.6\angle -25.84^\circ\,\mathrm A$.

$\mathbf V_S = A\mathbf V_R + B\mathbf I_R = 135\,890\angle7.48^\circ\,\mathrm V$, i.e. $235.4\,\mathrm{kV}$ line to line.

$\mathbf I_S = C\mathbf V_R + D\mathbf I_R = 417.3\angle-17.46^\circ\,\mathrm A$: smaller than $\mathbf I_R$ and closer to the voltage, because the line's capacitance supplies part of the load's reactive power.

Sending power $\mathbf S_S = 3\mathbf V_S\mathbf I_S^* = 154.2 + j71.7\,\mathrm{MVA}$, so $\eta = 150/154.2 = 97.3\,\%$.

At no load $V_R = 235.4/0.9873 = 238.4\,\mathrm{kV}$, and $\mathrm{VR} = (238.4 - 215)/215 = 10.9\,\%$.
:::
:::

::: warning Phase and line voltages in ABCD calculations
[[#eq-abcd]] is a per-phase relation between **phase** voltages and line currents. Substituting a line-to-line voltage for $\mathbf V_R$ while computing $\mathbf I_R$ from $P/(3V_{\text{ph}}\cos\theta)$ mixes two scales and gives a sending voltage that is wrong by a factor of up to $\sqrt3$ in the $B\mathbf I_R$ term. Either work in per unit, where the distinction vanishes, or in phase quantities throughout, multiplying by $\sqrt3$ only at the end.
:::

## The long line: exact solution

For long lines, and whenever accuracy matters, the line must be treated as distributed. Let $x$ be the distance measured **from the receiving end** towards the sender, and $\mathbf V(x)$, $\mathbf I(x)$ the phasor voltage and current at $x$, with $\mathbf I$ flowing towards the receiving end.

::: theorem Voltage and current on a long line {#thm-long-line}
A uniform line with series impedance $z$ and shunt admittance $y$ per unit length has, at distance $x$ from the receiving end,
$$
\mathbf V(x) = \cosh(\gamma x)\,\mathbf V_R + Z_c\sinh(\gamma x)\,\mathbf I_R,\qquad \mathbf I(x) = \frac{\sinh(\gamma x)}{Z_c}\,\mathbf V_R + \cosh(\gamma x)\,\mathbf I_R,
$$ {#eq-long-line}
where the **propagation constant** $\gamma$ and the **characteristic (surge) impedance** $Z_c$ are
$$
\gamma = \alpha + j\beta = \sqrt{zy},\qquad Z_c = \sqrt{\frac zy}.
$$ {#eq-gamma-zc}
For a line of length $\ell$: $A = D = \cosh\gamma\ell$, $B = Z_c\sinh\gamma\ell$, $C = \sinh(\gamma\ell)/Z_c$.
:::

::: proof
Consider a section of length $\Delta x$ at position $x$. The series impedance $z\Delta x$ carries the current $\mathbf I(x)$, so the voltage rises by $z\Delta x\,\mathbf I$ as we move towards the sender, and the shunt admittance $y\Delta x$ draws a current $y\Delta x\,\mathbf V$ that must be supplied from the sending side. In the limit,
$$
\frac{\mathrm d\mathbf V}{\mathrm dx} = z\mathbf I,\qquad \frac{\mathrm d\mathbf I}{\mathrm dx} = y\mathbf V.
$$
Differentiating the first and substituting the second: $\mathrm d^2\mathbf V/\mathrm dx^2 = zy\,\mathbf V = \gamma^2\mathbf V$, whose general solution is $\mathbf V = A_1\cosh\gamma x + A_2\sinh\gamma x$. Then $\mathbf I = \frac1z\frac{\mathrm d\mathbf V}{\mathrm dx} = \frac\gamma z(A_1\sinh\gamma x + A_2\cosh\gamma x) = \frac1{Z_c}(A_1\sinh\gamma x + A_2\cosh\gamma x)$, since $\gamma/z = \sqrt{y/z} = 1/Z_c$. At $x = 0$, $\mathbf V = \mathbf V_R$ and $\mathbf I = \mathbf I_R$, which give $A_1 = \mathbf V_R$ and $A_2 = Z_c\mathbf I_R$. This is [[#eq-long-line]]; putting $x = \ell$ gives the ABCD parameters.
:::

The hyperbolic functions encode travelling waves: $\cosh\gamma x = (e^{\gamma x} + e^{-\gamma x})/2$, a wave travelling towards the receiving end and one travelling back. Their power-series expansions,
$$
\cosh\gamma\ell = 1 + \frac{(\gamma\ell)^2}{2} + \frac{(\gamma\ell)^4}{24} + \cdots,\qquad Z_c\sinh\gamma\ell = Z\Bigl(1 + \frac{(\gamma\ell)^2}6 + \cdots\Bigr),
$$
with $(\gamma\ell)^2 = YZ$, show that the nominal π ([[#eq-nominal-pi]]) is the first-order truncation: it is accurate when $\abs{\gamma\ell}\ll1$, that is when the line is short compared with a wavelength.

### The equivalent π

::: theorem Equivalent π circuit of a long line {#thm-equivalent-pi}
A long line is represented exactly at its terminals by a π circuit with series impedance $Z'$ and shunt admittances $Y'/2$, where
$$
Z' = Z_c\sinh\gamma\ell = Z\,\frac{\sinh\gamma\ell}{\gamma\ell},\qquad \frac{Y'}2 = \frac1{Z_c}\tanh\frac{\gamma\ell}2 = \frac Y2\,\frac{\tanh(\gamma\ell/2)}{\gamma\ell/2}.
$$ {#eq-equivalent-pi}
:::

::: proof
The π circuit has $B = Z'$ and $A = 1 + Y'Z'/2$ by [[#thm-nominal-pi]]. Matching $B = Z_c\sinh\gamma\ell$ gives $Z'$. Matching $A = \cosh\gamma\ell$ gives $Y'/2 = (\cosh\gamma\ell - 1)/(Z_c\sinh\gamma\ell)$. With $\cosh u - 1 = 2\sinh^2(u/2)$ and $\sinh u = 2\sinh(u/2)\cosh(u/2)$, this is $\tanh(\gamma\ell/2)/Z_c$. Since both networks are reciprocal and symmetrical, matching $A$ and $B$ forces $C$ and $D$ to agree too. Writing $Z_c = Z/(\gamma\ell)$ and $1/Z_c = Y/(\gamma\ell)$ gives the second forms.
:::

The correction factors $\sinh(\gamma\ell)/(\gamma\ell)$ and $\tanh(\gamma\ell/2)/(\gamma\ell/2)$ tend to $1$ for short lines. For a long line, the equivalent series impedance is smaller and the equivalent shunt admittance larger than the nominal values.

::: example A 300 km, 400 kV line {#ex-long}
A $300\,\mathrm{km}$, $400\,\mathrm{kV}$, $50\,\mathrm{Hz}$ line with quad bundles has $z = 0.028 + j0.272\,\Omega/\mathrm{km}$ and $y = j4.10\,\mu\mathrm S/\mathrm{km}$ (the line of [[power-systems/line-parameters]]). (a) Find $Z_c$, $\gamma$ and the ABCD parameters. (b) Compare the equivalent π with the nominal π. (c) The line delivers $600\,\mathrm{MW}$ at $0.95$ lagging at $400\,\mathrm{kV}$; find the sending-end voltage and the efficiency, and the error made by the nominal π.
::: solution
(a) $Z_c = \sqrt{z/y} = 258.3\angle-2.94^\circ\,\Omega$; $\gamma = \sqrt{zy} = 5.43\times10^{-5} + j1.0574\times10^{-3}\,\mathrm{km^{-1}}$, so $\gamma\ell = 0.0163 + j0.3172$. Then
$$
A = \cosh\gamma\ell = 0.9502\angle0.31^\circ,\quad B = Z_c\sinh\gamma\ell = 80.67\angle84.22^\circ\,\Omega,\quad C = \frac{\sinh\gamma\ell}{Z_c} = 1.2095\times10^{-3}\angle90.1^\circ\,\mathrm S.
$$
(b) Equivalent π: $Z' = 8.12 + j80.26\,\Omega$, $Y'/2 = j6.202\times10^{-4}\,\mathrm S$. Nominal π: $Z = 8.40 + j81.60\,\Omega$, $Y/2 = j6.150\times10^{-4}\,\mathrm S$. The nominal series impedance is $1.7\,\%$ too large and the shunt admittance $0.8\,\%$ too small.

(c) $\mathbf V_R = 230\,940\angle0^\circ\,\mathrm V$, $\mathbf I_R = 600\times10^6/(3\times230\,940\times0.95)\angle-18.19^\circ = 911.6\angle-18.19^\circ\,\mathrm A$. Then $\mathbf V_S = A\mathbf V_R + B\mathbf I_R = 258\,530\angle15.33^\circ\,\mathrm V$, i.e. $447.8\,\mathrm{kV}$; $\mathbf I_S = C\mathbf V_R + A\mathbf I_R = 824.0\angle0.92^\circ\,\mathrm A$, and $\mathbf S_S = 619.0 + j159.1\,\mathrm{MVA}$, so $\eta = 600/619.0 = 96.9\,\%$. The nominal π gives $449.2\,\mathrm{kV}$, an error of $0.3\,\%$ in voltage magnitude; small here, but growing roughly as the square of the length.

The required $448\,\mathrm{kV}$ is above the usual $420\,\mathrm{kV}$ maximum for $400\,\mathrm{kV}$ equipment: delivering this load at $0.95$ lagging needs reactive support at the receiving end (a static compensator or capacitor bank) so that the line itself carries less reactive power.
:::
:::

## The lossless line

On EHV lines $r\ll\omega l$, and setting $r = g = 0$ gives a model that is simple enough to reason with and accurate to a few percent.

::: definition Lossless line, surge impedance and surge impedance loading {#def-sil}
For a lossless line, $\gamma = j\beta$ with $\beta = \omega\sqrt{lc}$ (rad/m), and $Z_c = \sqrt{l/c}$ is a real resistance, the **surge impedance**. The **wavelength** is $\lambda = 2\pi/\beta$, about $6000\,\mathrm{km}$ at $50\,\mathrm{Hz}$ and $5000\,\mathrm{km}$ at $60\,\mathrm{Hz}$. The **surge impedance loading** (SIL) is the power delivered to a resistive load equal to $Z_c$ at rated voltage:
$$
\mathrm{SIL} = \frac{V_{\text{rated},LL}^2}{Z_c}.
$$ {#eq-sil}
:::

For the lossless line [[#eq-long-line]] becomes
$$
\mathbf V(x) = \cos(\beta x)\,\mathbf V_R + jZ_c\sin(\beta x)\,\mathbf I_R,\qquad \mathbf I(x) = j\frac{\sin(\beta x)}{Z_c}\mathbf V_R + \cos(\beta x)\,\mathbf I_R.
$$ {#eq-lossless}

::: theorem Voltage profile and the Ferranti effect {#thm-profile}
On a lossless line terminated in a resistive load drawing power $P$ at voltage $V_R$, the voltage magnitude at distance $x$ from the receiving end is
$$
\frac{V(x)}{V_R} = \sqrt{\cos^2\beta x + \Bigl(\frac{P}{P_{\text{SIL}}}\Bigr)^2\sin^2\beta x},
$$ {#eq-profile}
where $P_{\text{SIL}} = V_R^2/Z_c$ (three-phase, with $V_R$ line to line). At the surge impedance loading the voltage is the same everywhere along the line; below it the voltage rises towards the receiving end, above it the voltage sags. At no load ($P = 0$) the receiving voltage exceeds the sending voltage: $V_R = V_S/\cos\beta\ell$ (the **Ferranti effect**).
:::

::: proof
With a resistive load, $\mathbf I_R = \mathbf V_R/R_L$ is in phase with $\mathbf V_R$. Taking $\mathbf V_R$ real, [[#eq-lossless]] gives $\mathbf V(x) = V_R\bigl(\cos\beta x + j\frac{Z_c}{R_L}\sin\beta x\bigr)$, whose magnitude is $V_R\sqrt{\cos^2\beta x + (Z_c/R_L)^2\sin^2\beta x}$. The load power is $P = V_R^2/R_L$, so $Z_c/R_L = P/(V_R^2/Z_c) = P/P_{\text{SIL}}$. If $P = P_{\text{SIL}}$, $V(x) = V_R$ for all $x$. If $P < P_{\text{SIL}}$ the profile is below $V_R$ everywhere towards the sender, i.e. the voltage rises towards the load; if $P > P_{\text{SIL}}$, it is above. At $P = 0$, $V(\ell) = V_S = V_R\cos\beta\ell$.
:::

At the SIL the reactive power generated by the line capacitance, $\omega cV^2$ per unit length, exactly balances the reactive power absorbed by its inductance, $\omega lI^2$ per unit length, since $V/I = Z_c = \sqrt{l/c}$. The line is then "flat" and neither needs nor supplies reactive power. Typical SILs are about $50\,\mathrm{MW}$ at $132\,\mathrm{kV}$, $150$ to $190\,\mathrm{MW}$ at $230\,\mathrm{kV}$, $600\,\mathrm{MW}$ at $400\,\mathrm{kV}$ with quad bundles, and over $2000\,\mathrm{MW}$ at $765\,\mathrm{kV}$; long lines are usually loaded at around their SIL.

::: widget plot
f: sqrt(cos(b*x)^2 + p^2*sin(b*x)^2); 1
x: 0, 800
y: 0.6, 1.4
sliders: p=0.5:0:2:0.05; b=0.00106:0.0009:0.00131:0.00001
labels: V(x)/V_R; \text{flat profile}
caption: Voltage profile of a lossless line, relative to the receiving-end voltage, against the distance $x$ in km measured back from the load, for a resistive load of $p$ times the surge impedance loading; $b = \beta$ in rad/km ($0.00106$ for a $50\,\mathrm{Hz}$ overhead line, about $0.00126$ at $60\,\mathrm{Hz}$). At $p = 1$ the profile is flat. At $p = 0$, read off the sending-end voltage needed at the length of your line: the receiving end of an unloaded $600\,\mathrm{km}$ line is $25\,\%$ above its sending end. Above $p = 1$ the sending voltage must rise steeply with length.
:::

### Power transfer and its limit

::: theorem Power transfer over a lossless line {#thm-power-transfer}
For a lossless line of length $\ell$ with terminal voltages $V_S\angle\delta$ and $V_R\angle0$ (line to line), the real power transferred is
$$
P = \frac{V_SV_R}{Z_c\sin\beta\ell}\sin\delta = \frac{V_SV_R}{X'}\sin\delta,
$$ {#eq-power-transfer}
with $X' = Z_c\sin\beta\ell$, the reactance of the equivalent π. The **steady-state stability limit** is $P_{\max} = V_SV_R/X'$ at $\delta = 90^\circ$; at rated voltages it equals $\mathrm{SIL}/\sin\beta\ell$.
:::

::: proof
From [[#eq-lossless]] at $x = \ell$, $\mathbf V_S = \cos\beta\ell\,\mathbf V_R + jZ_c\sin\beta\ell\,\mathbf I_R$, so $\mathbf I_R = (\mathbf V_S - \cos\beta\ell\,\mathbf V_R)/(jX')$. Per phase, the received complex power is $\mathbf V_R\mathbf I_R^*$; with $\mathbf V_R$ real and $\mathbf V_S = V_S\angle\delta$, $\mathbf I_R^* = (V_S\angle-\delta - V_R\cos\beta\ell)/(-jX')$, and
$$
\mathbf V_R\mathbf I_R^* = \frac{jV_R}{X'}\bigl(V_S\cos\delta - jV_S\sin\delta - V_R\cos\beta\ell\bigr),
$$
whose real part is $V_RV_S\sin\delta/X'$. In three-phase terms with line voltages the factor $3$ and the two factors $1/\sqrt3$ cancel. The line is lossless, so this is also the sending power. At $V_S = V_R = V_{\text{rated}}$, $P_{\max} = V^2/(Z_c\sin\beta\ell) = \mathrm{SIL}/\sin\beta\ell$.
:::

This is the same $\sin\delta$ law as for a synchronous machine in [[electric-machines/synchronous-machines]], and it will reappear as the core of stability analysis in [[power-systems/power-system-stability]]. For a $300\,\mathrm{km}$, $50\,\mathrm{Hz}$ line, $\beta\ell = 18.2^\circ$ and $P_{\max}$ is $3.2$ times the SIL; in practice one keeps $\delta$ well below $90^\circ$ (often $30$ to $45^\circ$ across a long line) to leave a margin for disturbances, and the sending- and receiving-end systems add their own reactances. Short lines are limited by conductor heating, medium lines by voltage drop, long lines by stability, roughly with the boundaries at $80$ and $300\,\mathrm{km}$.

::: widget plot
f: 1/sin(b*x); 1/(b*x)
x: 50, 1200
y: 0, 8
sliders: b=0.00106:0.0009:0.00131:0.00001
hlines: 1
labels: P_{\max}/\mathrm{SIL}\ \text{(distributed line)}; P_{\max}/\mathrm{SIL}\ \text{(series reactance only)}
caption: Steady-state transfer limit of a lossless line at rated voltage, as a multiple of its surge impedance loading, against length in km. The first curve is the exact $1/\sin\beta\ell$, the second the short-line estimate $1/(\beta\ell)$ obtained by ignoring the capacitance. For lines below about $300\,\mathrm{km}$ the two agree within a few percent and the limit is several times the SIL; near $1500\,\mathrm{km}$ (a quarter wavelength at $50\,\mathrm{Hz}$) the exact limit falls to the SIL itself, one reason why very long AC lines need compensation or are replaced by HVDC.
:::

### Power at the receiving end of a lossy line

The lossless formula is an approximation. For a general line the ABCD parameters give the exact received power, and the result has a geometric interpretation that operators and planners use.

::: theorem Receiving-end power of a line {#thm-receiving-power}
Let $A = \abs A\angle\alpha$ and $B = \abs B\angle\beta_B$, and let the terminal voltages be $V_S\angle\delta$ and $V_R\angle0$ (line to line). The three-phase complex power received is
$$
\mathbf S_R = P_R + jQ_R = \frac{V_SV_R}{\abs B}\angle(\beta_B - \delta) - \frac{\abs AV_R^2}{\abs B}\angle(\beta_B - \alpha).
$$ {#eq-receiving-power}
For fixed $V_S$ and $V_R$, as $\delta$ varies, $\mathbf S_R$ traces a circle in the $PQ$ plane (the **receiving-end power circle**) centred at $-(\abs AV_R^2/\abs B)\angle(\beta_B - \alpha)$ with radius $V_SV_R/\abs B$. The real power is greatest when $\delta = \beta_B$.
:::

::: proof
From [[#eq-abcd]], $\mathbf I_R = (\mathbf V_S - A\mathbf V_R)/B$. Per phase, $\mathbf S_R/3 = \mathbf V_R\mathbf I_R^*$, and with $\mathbf V_R$ real,
$$
\mathbf V_R\mathbf I_R^* = V_R\,\frac{V_S\angle-\delta - \abs AV_R\angle-\alpha}{\abs B\angle-\beta_B} = \frac{V_SV_R}{\abs B}\angle(\beta_B - \delta) - \frac{\abs AV_R^2}{\abs B}\angle(\beta_B - \alpha),
$$
using phase voltages. Multiplying by $3$ and writing line voltages ($3V_{\text{ph}}^2 = V_{LL}^2$) gives [[#eq-receiving-power]]. The first term has fixed magnitude and an angle that varies with $\delta$, the second is fixed: a circle. Its real part, $\frac{V_SV_R}{\abs B}\cos(\beta_B - \delta) - \frac{\abs AV_R^2}{\abs B}\cos(\beta_B - \alpha)$, is largest when $\delta = \beta_B$. For a lossless line $\alpha = 0$, $\beta_B = 90^\circ$ and $\abs B = X'$, recovering [[#eq-power-transfer]].
:::

For the $300\,\mathrm{km}$ line of [[#ex-long]], $\beta_B = 84.2^\circ$, so resistance lowers the angle of maximum power a little below $90^\circ$ and reduces the maximum received power below the lossless value, by the term $\abs AV_R^2\cos(\beta_B - \alpha)/\abs B$, which is about $0.95\times400^2\times0.106/80.7 = 200\,\mathrm{MW}$ out of $2000\,\mathrm{MW}$. The circle diagram also shows directly how much reactive power must be supplied at the receiving end to hold $V_R$ at a given value for a given load: the intersection of the circle for the desired $V_R$ with the load's line $Q_R = P_R\tan\theta$ gives the operating point, and the vertical distance to the circle gives the compensation required.

::: quiz
Why does the angle $\delta$ at which a real line delivers its maximum power differ from $90^\circ$?
- [ ] Because of the shunt capacitance alone
- [x] Because series resistance makes the angle of $B$ less than $90^\circ$
- [ ] Because $A$ is always exactly $1$
- [ ] It does not; it is always $90^\circ$
::: solution
By [[#thm-receiving-power]] the maximum occurs at $\delta = \beta_B$, the angle of $B = Z_c\sinh\gamma\ell$. For a lossless line $B$ is purely reactive, $\beta_B = 90^\circ$; resistance tilts it to, for example, $84^\circ$ for the $300\,\mathrm{km}$ line. Capacitance by itself, without losses, leaves $B$ imaginary.
:::
:::

::: quiz
An unloaded $50\,\mathrm{Hz}$ overhead line is energised from a $400\,\mathrm{kV}$ bus. For which length does its open-end voltage first exceed $420\,\mathrm{kV}$ (taking $\beta = 1.06\times10^{-3}\,\mathrm{rad/km}$)?
- [ ] About $50\,\mathrm{km}$
- [x] About $290\,\mathrm{km}$
- [ ] About $1500\,\mathrm{km}$
- [ ] Never: an unloaded line draws no current and has no voltage drop
::: solution
By [[#thm-profile]], $V_R = V_S/\cos\beta\ell$, so we need $\cos\beta\ell = 400/420 = 0.952$, $\beta\ell = 0.3098\,\mathrm{rad}$ and $\ell = 292\,\mathrm{km}$. An unloaded line does draw current, its own charging current, and that current flowing through the line inductance raises the voltage towards the open end.
:::
:::

## Reactive compensation

Lines are rarely operated exactly at SIL. Below it they generate surplus reactive power and overvoltage; above it they absorb reactive power and need voltage support; and long lines are limited by $X'$. Three kinds of compensation address these problems.

- **Shunt reactors** at the ends (or along) a line absorb the surplus charging power at light load and limit the Ferranti rise. They are essential on EHV lines longer than about $200\,\mathrm{km}$ and on cables.
- **Shunt capacitors** and static var compensators (SVC, STATCOM) supply reactive power at heavy load, holding the voltage up.
- **Series capacitors** cancel part of the series reactance, raising $P_{\max} = V_SV_R/X'$ and reducing the angle needed for a given power. A degree of series compensation $k$ replaces $X'$ by $(1 - k)X'$; values of $25$ to $70\,\%$ are used. (Series compensation can excite subsynchronous resonance with turbine-generator shafts, which must be checked.)

::: example Sizing shunt reactors for a 300 km line {#ex-reactor}
For the $300\,\mathrm{km}$, $400\,\mathrm{kV}$ line of [[#ex-long]], treated as lossless, find (a) the open-end voltage when the line is energised at $400\,\mathrm{kV}$, (b) the reactance and rating of a shunt reactor at the receiving end that makes the no-load receiving voltage equal to the sending voltage, and (c) the gain in power-transfer limit if $40\,\%$ series compensation is added.
::: solution
Lossless: $Z_c = \sqrt{0.272/4.10\times10^{-6}} = 257.6\,\Omega$, $\beta = \sqrt{0.272\times4.10\times10^{-6}} = 1.0560\times10^{-3}\,\mathrm{rad/km}$, $\beta\ell = 0.3168\,\mathrm{rad} = 18.15^\circ$.

(a) $V_R = 400/\cos18.15^\circ = 420.9\,\mathrm{kV}$ ($+5.2\,\%$).

(b) With a reactor of reactance $X_L$ per phase at the receiving end, the receiving current is $\mathbf I_R = \mathbf V_R/(jX_L)$, and [[#eq-lossless]] gives
$$
\mathbf V_S = \cos\beta\ell\,\mathbf V_R + jZ_c\sin\beta\ell\,\frac{\mathbf V_R}{jX_L} = \Bigl(\cos\beta\ell + \frac{Z_c\sin\beta\ell}{X_L}\Bigr)\mathbf V_R.
$$
For $V_R = V_S$ we need $X_L = Z_c\sin\beta\ell/(1 - \cos\beta\ell) = 257.6\times0.3115/0.0498 = 1612\,\Omega$. At $400\,\mathrm{kV}$ its rating is $Q = V^2/X_L = (400\times10^3)^2/1612 = 99\,\mathrm{Mvar}$, about $40\,\%$ of the line's total charging power of $V^2\omega c\ell = 197\,\mathrm{Mvar}$ (in practice reactors are split between both ends, and switched out at heavy load).

(c) Uncompensated, $X' = Z_c\sin\beta\ell = 80.2\,\Omega$ and $P_{\max} = 400^2/80.2 = 1994\,\mathrm{MW}$. With $40\,\%$ compensation, $X = 48.1\,\Omega$ and $P_{\max} = 3323\,\mathrm{MW}$, an increase of $1/(1 - 0.4) = 1.67$ times; equivalently, a given power is carried at a much smaller angle.
:::
:::

::: application HVDC as an alternative
Beyond a break-even distance of roughly $600$ to $800\,\mathrm{km}$ for overhead lines (and $50$ to $100\,\mathrm{km}$ for cables, where charging current is crippling) high-voltage DC transmission becomes cheaper than AC. A DC line has no reactance, no charging current, no stability limit of the $\sin\delta$ kind and needs two conductors instead of three, but it needs converter stations at both ends ([[power-electronics]]). Undersea links, connections between asynchronous grids, and bulk transfers over thousands of kilometres from remote hydro or wind are now commonly HVDC.
:::

::: history
Oliver Heaviside cast the telegrapher's equations into their modern form in the 1880s, and the hyperbolic-function solution of the long line was developed for power lines in the early twentieth century; Arthur E. Kennelly's books on hyperbolic functions in electrical engineering (1912 onwards) made the exact long-line calculation routine, with charts of the correction factors. The voltage rise on lightly loaded lines was observed by Sebastian Ziani de Ferranti around 1890 on the $10\,\mathrm{kV}$ cable mains from his Deptford power station to London, and still bears his name. Series capacitor compensation on a transmission line was first applied in 1928 on a $33\,\mathrm{kV}$ network in New York State, and large EHV series capacitor installations followed, notably in Sweden in the 1950s on the long lines from the northern hydro plants.
:::

## Where this leads

The equivalent π circuit is the line model used in [[power-systems/power-flow]], where each line contributes its series admittance $1/Z'$ and shunt admittances $Y'/2$ to the bus admittance matrix. The $\sin\delta$ transfer law limits how far power can be sent and is the starting point of [[power-systems/power-system-stability]]. Reactive compensation, tap changers and generator excitation together form the voltage-control system discussed in [[power-systems/power-flow]] and [[power-systems/protection-smart-grid]].

::: summary
- A line is a reciprocal two-port, $\mathbf V_S = A\mathbf V_R + B\mathbf I_R$, $\mathbf I_S = C\mathbf V_R + D\mathbf I_R$, with $AD - BC = 1$; regulation uses $V_{R,\text{nl}} = V_S/\abs A$.
- Short line ($\lesssim80\,\mathrm{km}$): $A = 1$, $B = Z$, $C = 0$. Medium line: nominal π, $A = 1 + YZ/2$, $C = Y(1 + YZ/4)$.
- Long line: $A = \cosh\gamma\ell$, $B = Z_c\sinh\gamma\ell$, $C = \sinh(\gamma\ell)/Z_c$, with $\gamma = \sqrt{zy}$, $Z_c = \sqrt{z/y}$; the equivalent π has $Z' = Z\sinh(\gamma\ell)/\gamma\ell$ and $Y'/2 = (Y/2)\tanh(\gamma\ell/2)/(\gamma\ell/2)$.
- Lossless line: $\beta = \omega\sqrt{lc}$, $Z_c = \sqrt{l/c}$ real, SIL $= V^2/Z_c$; at SIL the profile is flat, below it the voltage rises towards the load (Ferranti: $V_R = V_S/\cos\beta\ell$ at no load).
- Power transfer $P = V_SV_R\sin\delta/(Z_c\sin\beta\ell)$, limited by $\delta = 90^\circ$; long lines are stability-limited.
- Shunt reactors limit light-load overvoltage, shunt capacitors and SVCs support heavy-load voltage, series capacitors raise the transfer limit.
:::

## Exercises

::: exercise Surge impedance loading {level=1 check="230e3^2/380"}
A $230\,\mathrm{kV}$ line has a surge impedance of $380\,\Omega$. Find its SIL in watts.
::: solution
$\mathrm{SIL} = 230\,000^2/380 = 139.2\,\mathrm{MW}$.
:::
:::

::: exercise Wavelength {level=1 check="1/(60*sqrt(1.0e-3*11.2e-9))"}
A $60\,\mathrm{Hz}$ line has $l = 1.0\,\mathrm{mH/km}$ and $c = 11.2\,\mathrm{nF/km}$. Find its wavelength in km.
::: solution
The phase velocity is $1/\sqrt{lc} = 1/\sqrt{1.0\times10^{-3}\times11.2\times10^{-9}} = 2.988\times10^5\,\mathrm{km/s}$, so $\lambda = v/f = 4980\,\mathrm{km}$.
:::
:::

::: exercise Short-line sending voltage {level=1 check="sqrt((1+0.8*0.02+0.6*0.1)^2+(0.8*0.1-0.6*0.02)^2)"}
A short line has $Z = 0.02 + j0.10\,\mathrm{pu}$ and delivers $1\,\mathrm{pu}$ current at power factor $0.8$ lagging at $V_R = 1\,\mathrm{pu}$. Find $V_S$ in per unit.
::: solution
$\mathbf I = 0.8 - j0.6$; $Z\mathbf I = (0.02 + j0.10)(0.8 - j0.6) = 0.076 + j0.068$; $\mathbf V_S = 1.076 + j0.068$, $V_S = 1.078\,\mathrm{pu}$.
:::
:::

::: exercise ABCD of nominal π {level=2 check="sqrt((1 - 2*pi*50*11e-9*200*80/2)^2 + (2*pi*50*11e-9*200*16/2)^2)"}
For a $200\,\mathrm{km}$, $50\,\mathrm{Hz}$ line with $z = 0.08 + j0.40\,\Omega/\mathrm{km}$ and $c = 11\,\mathrm{nF/km}$, find $\abs A$ of the nominal π, and the no-load receiving voltage when $V_S = 1\,\mathrm{pu}$.
::: solution
$Y = j2\pi50\times11\times10^{-9}\times200 = j6.912\times10^{-4}\,\mathrm S$, $Z = 16 + j80\,\Omega$. $YZ/2 = j3.456\times10^{-4}(16 + j80) = -0.02765 + j0.00553$, so $A = 0.97235 + j0.00553$, $\abs A = 0.9724$. No load: $V_R = 1/0.9724 = 1.028\,\mathrm{pu}$.
:::
:::

::: exercise Ferranti rise on a 60 Hz line {level=2 check="1/cos(2*pi*60/(2.98e5)*400)"}
An unloaded $400\,\mathrm{km}$, $60\,\mathrm{Hz}$ lossless line has a propagation speed of $2.98\times10^5\,\mathrm{km/s}$. By what factor does its receiving-end voltage exceed the sending-end voltage?
::: solution
$\beta = \omega/v = 2\pi\times60/2.98\times10^5 = 1.265\times10^{-3}\,\mathrm{rad/km}$, $\beta\ell = 0.506\,\mathrm{rad} = 29.0^\circ$, so $V_R/V_S = 1/\cos29.0^\circ = 1.143$.
:::
:::

::: exercise Maximum power and angle {level=2 check="asin(800*sin(0.3168)*257.6/400^2)*180/pi"}
The line of [[#ex-reactor]] transfers $800\,\mathrm{MW}$ with both terminals at $400\,\mathrm{kV}$. Find the angle $\delta$ between the terminal voltages, in degrees.
::: solution
$\sin\delta = PX'/V^2 = 800\times10^6\times80.22/(400\times10^3)^2 = 0.401$, so $\delta = 23.6^\circ$.
:::
:::

::: exercise Correction factors {level=2}
Show that for a lossless line $Z' = jX\,\frac{\sin\beta\ell}{\beta\ell}$ and $Y'/2 = j\frac{B}{2}\,\frac{\tan(\beta\ell/2)}{\beta\ell/2}$, where $X = \omega l\ell$ and $B = \omega c\ell$. Evaluate both factors for $\beta\ell = 18.15^\circ$.
::: solution
With $\gamma = j\beta$, $\sinh(j\beta\ell) = j\sin\beta\ell$ and $\tanh(j\beta\ell/2) = j\tan(\beta\ell/2)$, so from [[#eq-equivalent-pi]], $Z' = Z\,j\sin\beta\ell/(j\beta\ell) = jX\sin(\beta\ell)/\beta\ell$ and $Y'/2 = (Y/2)\tan(\beta\ell/2)/(\beta\ell/2)$ with $Y = jB$. At $\beta\ell = 0.3168$: $\sin(0.3168)/0.3168 = 0.9834$ and $\tan(0.1584)/0.1584 = 1.0084$, consistent with the comparison in [[#ex-long]].
:::
:::

::: exercise Reactive power absorbed and generated {level=3}
Show that the reactive power absorbed by the series inductance of a lossless line per unit length, $\omega lI^2$, equals the reactive power generated by its capacitance, $\omega cV^2$, at every point when the line is terminated in $Z_c$, and deduce that the sending-end power factor is then unity.
::: hint
Show that $\mathbf V(x)/\mathbf I(x) = Z_c$ for every $x$ when $\mathbf V_R = Z_c\mathbf I_R$.
:::
::: solution
With $\mathbf V_R = Z_c\mathbf I_R$, [[#eq-lossless]] gives $\mathbf V(x) = (\cos\beta x + j\sin\beta x)\mathbf V_R = e^{j\beta x}\mathbf V_R$ and $\mathbf I(x) = (j\sin\beta x + \cos\beta x)\mathbf I_R = e^{j\beta x}\mathbf I_R$, so $\mathbf V(x)/\mathbf I(x) = Z_c$ everywhere: only a forward wave exists. Hence $V^2 = Z_c^2I^2 = (l/c)I^2$, i.e. $\omega cV^2 = \omega lI^2$ at each point: the net reactive power per unit length is zero. Integrating, the line as a whole consumes no reactive power, and since the load is resistive, $\mathbf V_S$ and $\mathbf I_S$ are in phase (both multiplied by $e^{j\beta\ell}$): unity power factor at the sending end, with a phase shift of $\beta\ell$ along the line.
:::
:::

::: exercise Designing series compensation {level=3 check="1 - 400e3^2*sin(30*pi/180)/(1500e6*80.2)"}
The $400\,\mathrm{kV}$ line of [[#ex-reactor]] (with $X' = 80.2\,\Omega$) must transfer $1500\,\mathrm{MW}$ with an angle between its terminal voltages of no more than $30^\circ$, both terminals at $400\,\mathrm{kV}$. Find the minimum degree of series compensation $k$ (as a fraction), and comment on the effect on the Ferranti rise.
::: hint
The required reactance is $X = V^2\sin\delta/P$.
:::
::: solution
$X_{\text{req}} = (400\times10^3)^2\sin30^\circ/(1500\times10^6) = 53.3\,\Omega$, so $1 - k\ge53.3/80.2$, $k\ge0.335$: at least $34\,\%$ series compensation (one would choose perhaps $40\,\%$ for margin). Series capacitors carry the line current, so they have little effect at no load: the light-load overvoltage is still governed by the shunt charging and must be handled by the shunt reactors of [[#ex-reactor]]. (A series capacitor in the middle of the line does slightly change the voltage profile, but it does not remove the need for shunt compensation.)
:::
:::
