Every few minutes, in the control centre of every transmission operator, a computer solves the **power-flow** (load-flow) problem for a network of thousands of buses: given the power produced by each generator and consumed by each load, what are the voltages at every bus and the flows on every line and transformer? The answer tells operators whether any line is overloaded or any voltage out of limits now, and, run for hundreds of hypothetical outages, whether the system would survive the loss of any single element. Planners solve the same problem for networks that do not yet exist, to decide where new lines, transformers and compensation are needed.

The power-flow problem is nonlinear. Loads and generators are specified by powers, not by impedances or currents, and power is the product of voltage and current, so the equations relating injections to voltages are quadratic in the unknowns. In this chapter we first assemble the network into the **bus admittance matrix** $Y_{\text{bus}}$, then write the power-flow equations and classify the buses by what is known at each. We solve them by two iterative methods, **Gauss–Seidel** and **Newton–Raphson** (see [Maths Atlas](/learn/maths/) for the underlying numerical analysis), develop the fast decoupled and DC approximations that exploit the physics, and finally look at how operators control power flow with generator voltages, transformer taps, phase shifters and reactive compensation. The line models of [[power-systems/line-models]] and the per-unit system of [[power-systems/power-system-structure]] are assumed throughout.

## The bus admittance matrix

Consider a network of $n$ buses, all quantities in per unit and per phase. Each line is represented by its equivalent π (series admittance $y_{ik} = 1/Z'_{ik}$ and shunt admittances $y_{ik}^{\text{sh}}/2$ at each end); each transformer by its series admittance (and, for off-nominal taps, the model below); shunt capacitors and reactors by admittances to the reference (neutral). Let $\mathbf I_i$ be the current **injected** into bus $i$ from outside the network (by a generator or, with a negative sign, a load) and $\mathbf V_i$ the bus voltage relative to neutral.

::: definition Bus admittance matrix {#def-ybus}
The **bus admittance matrix** $Y_{\text{bus}}$ of a network relates the vector of injected currents to the vector of bus voltages,
$$
\mathbf I = Y_{\text{bus}}\mathbf V,\qquad \mathbf I_i = \sum_{k=1}^n Y_{ik}\mathbf V_k.
$$ {#eq-ybus}
Its entries are written $Y_{ik} = G_{ik} + jB_{ik} = \abs{Y_{ik}}\angle\theta_{ik}$.
:::

::: theorem Building Y-bus by inspection {#thm-ybus-rules}
For a network of branches with no mutual coupling:
1. the diagonal element $Y_{ii}$ is the sum of the admittances of all branches connected to bus $i$, including shunt admittances to neutral;
2. the off-diagonal element $Y_{ik}$ ($i\ne k$) is the negative of the sum of the admittances of the branches directly connecting buses $i$ and $k$, and is zero if there is none.

$Y_{\text{bus}}$ is therefore symmetric and, in a real network where each bus connects to only a few others, **sparse**.
:::

::: proof
Apply Kirchhoff's current law at bus $i$. The injected current leaves the bus through the branches: through each series branch to bus $k$ it is $y_{ik}(\mathbf V_i - \mathbf V_k)$, and through each shunt branch it is $y_i^{\text{sh}}\mathbf V_i$. So
$$
\mathbf I_i = \Bigl(y_i^{\text{sh}} + \sum_{k\ne i}y_{ik}\Bigr)\mathbf V_i - \sum_{k\ne i}y_{ik}\mathbf V_k.
$$
Comparing with [[#eq-ybus]] gives both rules. Since $y_{ik} = y_{ki}$ for every reciprocal branch, $Y_{ik} = Y_{ki}$.
:::

A $10\,000$-bus network has $10^8$ entries in $Y_{\text{bus}}$ but only about $10^4$ diagonal and a few times $10^4$ non-zero off-diagonal elements; sparse storage and sparse factorisation are what make large power-flow studies possible.

::: example Y-bus of a three-bus network {#ex-ybus}
Three buses are connected by three lines with series impedances (per unit on $100\,\mathrm{MVA}$) $z_{12} = 0.02 + j0.06$, $z_{13} = 0.08 + j0.24$ and $z_{23} = 0.06 + j0.18$; line charging is neglected. Form $Y_{\text{bus}}$.
::: solution
The series admittances are $y_{12} = 1/(0.02 + j0.06) = 5 - j15$, $y_{13} = 1.25 - j3.75$ and $y_{23} = 1.6667 - j5$. By [[#thm-ybus-rules]]:
$$
Y_{\text{bus}} = \begin{bmatrix} 6.25 - j18.75 & -5 + j15 & -1.25 + j3.75\\ -5 + j15 & 6.6667 - j20 & -1.6667 + j5\\ -1.25 + j3.75 & -1.6667 + j5 & 2.9167 - j8.75\end{bmatrix}.
$$
Each row sums to zero, because there are no shunt branches: a uniform voltage on every bus would drive no current.
:::
:::

### Transformers with off-nominal taps

A transformer whose ratio differs from the ratio of the base voltages on its two sides (because it is on a tap other than nominal, or because it was designed for a slightly different voltage) leaves an ideal transformer of per-unit ratio $t:1$ in the per-unit circuit. Let the tap be on side $i$, with series admittance $y$ on side $k$. KCL on the two sides of the ideal transformer gives
$$
\mathbf I_i = \frac{y}{t^2}\mathbf V_i - \frac{y}{t}\mathbf V_k,\qquad \mathbf I_k = -\frac yt\mathbf V_i + y\mathbf V_k
$$ {#eq-tap}
(for real $t$). The contribution to $Y_{\text{bus}}$ is therefore $y/t^2$ on the diagonal at $i$, $y$ on the diagonal at $k$ and $-y/t$ off the diagonal. Equivalently it is a π circuit with series admittance $y/t$, shunt $y(1 - t)/t^2$ at $i$ and shunt $y(t - 1)/t$ at $k$. A **phase-shifting transformer** has a complex ratio $t = \abs t\angle\varphi$; then $Y_{ik} = -y/t^*$ and $Y_{ki} = -y/t$, and $Y_{\text{bus}}$ is no longer symmetric.

## The power-flow equations

At each bus four quantities are involved: the real and reactive power injected, $P_i$ and $Q_i$, and the voltage magnitude and angle, $\abs{\mathbf V_i} = V_i$ and $\delta_i$. The injected complex power is $P_i + jQ_i = \mathbf V_i\mathbf I_i^*$.

::: theorem Power-flow equations {#thm-pf-equations}
With $\mathbf V_i = V_i\angle\delta_i$ and $Y_{ik} = \abs{Y_{ik}}\angle\theta_{ik}$, the real and reactive powers injected at bus $i$ are
$$
\begin{aligned}
P_i &= \sum_{k=1}^n V_iV_k\abs{Y_{ik}}\cos(\theta_{ik} - \delta_i + \delta_k),\\
Q_i &= -\sum_{k=1}^n V_iV_k\abs{Y_{ik}}\sin(\theta_{ik} - \delta_i + \delta_k).
\end{aligned}
$$ {#eq-pf}
Equivalently, in rectangular admittance form, $P_i = \sum_k V_iV_k(G_{ik}\cos\delta_{ik} + B_{ik}\sin\delta_{ik})$ and $Q_i = \sum_k V_iV_k(G_{ik}\sin\delta_{ik} - B_{ik}\cos\delta_{ik})$ with $\delta_{ik} = \delta_i - \delta_k$.
:::

::: proof
From [[#eq-ybus]], $P_i - jQ_i = (\mathbf V_i\mathbf I_i^*)^* = \mathbf V_i^*\mathbf I_i = \mathbf V_i^*\sum_kY_{ik}\mathbf V_k = \sum_k V_iV_k\abs{Y_{ik}}\angle(\theta_{ik} - \delta_i + \delta_k)$. The real part gives $P_i$ and the negative of the imaginary part gives $Q_i$. Expanding $\abs{Y_{ik}}\angle\theta_{ik} = G_{ik} + jB_{ik}$ and $\angle(\delta_k - \delta_i) = \cos\delta_{ik} - j\sin\delta_{ik}$ gives the rectangular form.
:::

These are $2n$ real equations in $4n$ real quantities. To solve them we must specify two quantities at every bus, and the choice depends on what physically controls that bus.

::: definition Bus types {#def-bus-types}
- A **load bus** (**PQ bus**) has specified $P_i$ and $Q_i$ (negative for a load); $V_i$ and $\delta_i$ are unknown. Most buses are of this type.
- A **generator bus** (**PV bus**) has specified $P_i$ (set by the turbine governor) and $V_i$ (held by the excitation system); $Q_i$ and $\delta_i$ are unknown. If the required $Q_i$ violates the generator's reactive limits, $Q_i$ is fixed at the limit and the bus becomes PQ.
- The **slack bus** (swing or reference bus), usually one large generator, has specified $V_1$ and $\delta_1 = 0$; $P_1$ and $Q_1$ are unknown. It supplies whatever power balances the system, including the losses, which are not known until the solution is found, and its angle is the reference for all others.
:::

With $n_{PV}$ generator buses and $n_{PQ}$ load buses ($n = 1 + n_{PV} + n_{PQ}$), the unknowns are $n - 1$ angles and $n_{PQ}$ magnitudes, and there are as many equations: the $P$ equations at all buses but the slack and the $Q$ equations at the load buses. Once these are solved, the slack powers and the generators' $Q$ follow directly from [[#eq-pf]].

::: quiz
Why can't we specify $P$ at every bus, including the slack?
- [ ] Because the slack bus voltage would then be undefined
- [x] Because the losses are unknown until the voltages are known, so the injections cannot all be set independently
- [ ] Because $Y_{\text{bus}}$ is singular
- [ ] Because the slack bus has no generator
::: solution
The sum of all injected real powers equals the network's $I^2R$ losses, which depend on the solution. If every $P_i$ were fixed, their sum would generally disagree with the actual losses and the equations would have no solution. The slack bus absorbs the mismatch. (A singular $Y_{\text{bus}}$ arises only without shunt branches; it is not the reason.)
:::
:::

## Gauss–Seidel iteration

Solving the $i$th row of [[#eq-ybus]] for $\mathbf V_i$ and replacing $\mathbf I_i$ by $(P_i - jQ_i)/\mathbf V_i^*$ gives the fixed-point form
$$
\mathbf V_i = \frac1{Y_{ii}}\left(\frac{P_i - jQ_i}{\mathbf V_i^*} - \sum_{k\ne i}Y_{ik}\mathbf V_k\right).
$$ {#eq-gs}

::: algorithm Gauss–Seidel power flow {#alg-gs}
1. Start from a **flat start**: $\mathbf V_i = 1\angle0$ at load buses, $V_i^{\text{sp}}\angle0$ at generator buses, and the specified slack voltage.
2. For each non-slack bus $i$ in turn, using the most recent values of all voltages:
   - at a PV bus, compute $Q_i = -\operatorname{Im}\bigl(\mathbf V_i^*\sum_kY_{ik}\mathbf V_k\bigr)$, check it against its limits, apply [[#eq-gs]], and rescale the result to the specified magnitude, keeping its angle;
   - at a PQ bus, apply [[#eq-gs]] with the specified $P_i$, $Q_i$.
3. Repeat step 2 until the largest change in any voltage is below a tolerance (say $10^{-5}\,\mathrm{pu}$). An **acceleration factor** $\alpha\approx1.4$–$1.6$, $\mathbf V_i\leftarrow\mathbf V_i^{\text{old}} + \alpha(\mathbf V_i^{\text{new}} - \mathbf V_i^{\text{old}})$, usually speeds convergence.
4. Compute the slack power, the generator reactive powers and the line flows.
:::

Each Gauss–Seidel step is cheap, needing only one row of $Y_{\text{bus}}$, but convergence is linear and slows as networks grow: the number of iterations rises roughly in proportion to the number of buses, and convergence is poor with heavily loaded systems, series capacitors or long radial feeders.

::: example One Gauss–Seidel iteration {#ex-gs}
In the network of [[#ex-ybus]], bus 1 is the slack with $\mathbf V_1 = 1.06\angle0^\circ$; bus 2 is a generator bus with $P_2 = 0.4\,\mathrm{pu}$ and $V_2 = 1.04\,\mathrm{pu}$; bus 3 is a load of $1.2 + j0.5\,\mathrm{pu}$. Carry out the first Gauss–Seidel iteration from a flat start.
::: solution
*Bus 2 (PV).* With $\mathbf V = (1.06, 1.04, 1.0)$, $\mathbf V_2^*\sum_kY_{2k}\mathbf V_k = 1.04\bigl[(-5 + j15)1.06 + (6.6667 - j20)1.04 + (-1.6667 + j5)1.0\bigr] = 1.04(-0.0333 + j0.1) = -0.0347 + j0.104$, so $Q_2 = -0.104$. Then
$$
\mathbf V_2 = \frac1{6.6667 - j20}\left(\frac{0.4 + j0.104}{1.04} - (-5 + j15)1.06 - (-1.6667 + j5)1.0\right) = 1.0463 + j0.0188.
$$
Rescaled to $1.04$: $\mathbf V_2 = 1.0398 + j0.0187 = 1.04\angle1.03^\circ$.

*Bus 3 (PQ)*, with the new $\mathbf V_2$:
$$
\mathbf V_3 = \frac1{2.9167 - j8.75}\left(\frac{-1.2 + j0.5}{1.0} - (-1.25 + j3.75)1.06 - (-1.6667 + j5)\mathbf V_2\right) = 0.9559 - j0.0956 = 0.9607\angle-5.71^\circ.
$$
Continuing, the iteration converges (to $10^{-5}$) after eight sweeps, to $\mathbf V_2 = 1.04\angle-0.61^\circ$ and $\mathbf V_3 = 0.9445\angle-6.50^\circ$. The first estimate of $\delta_2$ even had the wrong sign; Gauss–Seidel feels its way to the answer.
:::
:::

## Newton–Raphson power flow

Newton's method linearises the equations about the current estimate and solves the linear system for a correction. Collect the unknowns in $\mathbf x = (\boldsymbol\delta, \mathbf V)$ (angles at all non-slack buses, magnitudes at PQ buses) and define the **mismatches** between specified and calculated injections,
$$
\Delta P_i = P_i^{\text{sp}} - P_i(\mathbf x),\qquad \Delta Q_i = Q_i^{\text{sp}} - Q_i(\mathbf x).
$$

::: theorem Newton–Raphson step for the power flow {#thm-nr}
The Newton–Raphson correction $(\Delta\boldsymbol\delta, \Delta\mathbf V)$ solves
$$
\begin{bmatrix}\Delta\mathbf P\\ \Delta\mathbf Q\end{bmatrix} = \begin{bmatrix} J_{P\delta} & J_{PV}\\ J_{Q\delta} & J_{QV}\end{bmatrix}\begin{bmatrix}\Delta\boldsymbol\delta\\ \Delta\mathbf V\end{bmatrix},
$$ {#eq-nr}
where the Jacobian blocks are the partial derivatives of [[#eq-pf]]. For $k\ne i$, with $\phi_{ik} = \theta_{ik} - \delta_i + \delta_k$,
$$
\frac{\partial P_i}{\partial\delta_k} = -V_iV_k\abs{Y_{ik}}\sin\phi_{ik},\quad \frac{\partial P_i}{\partial V_k} = V_i\abs{Y_{ik}}\cos\phi_{ik},\quad \frac{\partial Q_i}{\partial\delta_k} = -V_iV_k\abs{Y_{ik}}\cos\phi_{ik},\quad \frac{\partial Q_i}{\partial V_k} = -V_i\abs{Y_{ik}}\sin\phi_{ik},
$$
and on the diagonal
$$
\frac{\partial P_i}{\partial\delta_i} = -Q_i - V_i^2B_{ii},\quad \frac{\partial P_i}{\partial V_i} = \frac{P_i}{V_i} + V_iG_{ii},\quad \frac{\partial Q_i}{\partial\delta_i} = P_i - V_i^2G_{ii},\quad \frac{\partial Q_i}{\partial V_i} = \frac{Q_i}{V_i} - V_iB_{ii}.
$$ {#eq-jacobian}
Near the solution, the iteration converges **quadratically**: the number of correct digits roughly doubles at each step.
:::

::: proof
Newton's method for $\mathbf f(\mathbf x) = \mathbf s$ replaces $\mathbf f$ by its first-order Taylor expansion about $\mathbf x$: $\mathbf f(\mathbf x + \Delta\mathbf x)\approx\mathbf f(\mathbf x) + J\Delta\mathbf x$, and chooses $\Delta\mathbf x$ to make this equal $\mathbf s$, which is [[#eq-nr]]. Quadratic convergence for a non-singular Jacobian and twice-differentiable $\mathbf f$ is the standard result for Newton's method.

The off-diagonal derivatives follow by differentiating the single term $k$ of [[#eq-pf]]: for example $\partial/\partial\delta_k$ of $V_iV_k\abs{Y_{ik}}\cos\phi_{ik}$ is $-V_iV_k\abs{Y_{ik}}\sin\phi_{ik}$, since $\partial\phi_{ik}/\partial\delta_k = 1$. For the diagonal, $\delta_i$ appears in every term $k\ne i$ with $\partial\phi_{ik}/\partial\delta_i = -1$, and not in the term $k = i$ (where $\phi_{ii} = \theta_{ii}$). So $\partial P_i/\partial\delta_i = \sum_{k\ne i}V_iV_k\abs{Y_{ik}}\sin\phi_{ik}$. From [[#eq-pf]], $\sum_{k\ne i}V_iV_k\abs{Y_{ik}}\sin\phi_{ik} = -Q_i - V_i^2\abs{Y_{ii}}\sin\theta_{ii} = -Q_i - V_i^2B_{ii}$. Similarly $\partial P_i/\partial V_i = 2V_i\abs{Y_{ii}}\cos\theta_{ii} + \sum_{k\ne i}V_k\abs{Y_{ik}}\cos\phi_{ik} = V_iG_{ii} + P_i/V_i$, and the two $Q$ derivatives are obtained in the same way.
:::

::: algorithm Newton–Raphson power flow {#alg-nr}
1. Flat start, as for Gauss–Seidel.
2. Compute $P_i$, $Q_i$ from [[#eq-pf]] and the mismatches $\Delta P_i$ (non-slack buses) and $\Delta Q_i$ (PQ buses). Stop if the largest is below the tolerance (typically $10^{-4}$ to $10^{-8}\,\mathrm{pu}$).
3. Form the Jacobian from [[#eq-jacobian]] and solve [[#eq-nr]] by sparse LU factorisation.
4. Update $\delta_i\leftarrow\delta_i + \Delta\delta_i$, $V_i\leftarrow V_i + \Delta V_i$; check generator reactive limits and switch PV buses to PQ where needed; go to 2.
:::

Newton–Raphson typically converges in three to six iterations whatever the size of the network, and each iteration costs one sparse factorisation. That combination made it the industry standard from the late 1960s.

::: example Newton–Raphson on the three-bus network {#ex-nr}
Solve the power flow of [[#ex-gs]] by Newton–Raphson, and find the slack power, the generator's reactive power, the line flows and the losses.
::: solution
The unknowns are $\delta_2$, $\delta_3$ and $V_3$; the equations are $\Delta P_2$, $\Delta P_3$ and $\Delta Q_3$. At the flat start, from [[#eq-pf]], $P_2 = -0.0347$, $P_3 = -0.1417$, $Q_3 = -0.425$, so the mismatches are $\Delta P_2 = 0.4347$, $\Delta P_3 = -1.0583$, $\Delta Q_3 = -0.075$. The Jacobian from [[#eq-jacobian]] is
$$
J = \begin{bmatrix} 21.736 & -5.200 & -1.733\\ -5.200 & 9.175 & 2.775\\ 1.733 & -3.058 & 8.325\end{bmatrix},
$$
with rows $(P_2, P_3, Q_3)$ and columns $(\delta_2, \delta_3, V_3)$. Solving gives the first correction, and the iterations proceed:

| iteration | $\delta_2$ | $\delta_3$ | $V_3$ | largest mismatch |
|---|---|---|---|---|
| 0 | $0^\circ$ | $0^\circ$ | $1.0000$ | $1.06$ |
| 1 | $-0.526^\circ$ | $-6.106^\circ$ | $0.9538$ | $6.6\times10^{-2}$ |
| 2 | $-0.606^\circ$ | $-6.500^\circ$ | $0.9446$ | $8.1\times10^{-4}$ |
| 3 | $-0.607^\circ$ | $-6.505^\circ$ | $0.9445$ | $1.4\times10^{-7}$ |

The mismatch falls from $10^{-2}$ to $10^{-3}$ to $10^{-7}$: quadratic convergence. From [[#eq-pf]] at the solution, the slack supplies $\mathbf S_1 = 0.868 + j0.602\,\mathrm{pu}$ ($86.8\,\mathrm{MW}$, $60.2\,\mathrm{Mvar}$) and generator 2 supplies $Q_2 = 0.102\,\mathrm{pu}$. Line flows, $\mathbf S_{ik} = \mathbf V_i\bigl((\mathbf V_i - \mathbf V_k)/z_{ik}\bigr)^*$, are $\mathbf S_{12} = 0.282 + j0.261$, $\mathbf S_{13} = 0.586 + j0.342$ and $\mathbf S_{23} = 0.679 + j0.354\,\mathrm{pu}$. The total loss is $\sum P_i = 0.868 + 0.4 - 1.2 = 0.068\,\mathrm{pu} = 6.8\,\mathrm{MW}$, with $20.4\,\mathrm{Mvar}$ absorbed in the series reactances. Notice that bus 2 sends power on to bus 3 although it receives power from bus 1: the flow divides between the paths in inverse proportion to their impedances.
:::
:::

::: widget newton
f: 4*sin(x) - 3.8
method: newton
x0: 0
steps: 6
x: -0.5, 2.5
caption: The simplest power flow: a load bus fed through a lossless line of reactance $0.25\,\mathrm{pu}$ from a bus at $1\,\mathrm{pu}$, both voltages held at $1\,\mathrm{pu}$, so that $P = 4\sin\delta$, and the load takes $3.8\,\mathrm{pu}$. Newton's method on $f(\delta) = 4\sin\delta - 3.8$ from a flat start $\delta = 0$. Step through the iterations and watch the tangent lines: convergence is fast once close, but the root is near the top of the sine curve, where the slope (the Jacobian) is small, so the first steps overshoot. At $P = 4$ the Jacobian at the solution would be zero and Newton's method would lose its quadratic convergence; beyond it there is no solution at all.
:::

## Decoupled and DC power flow

On transmission networks $X\gg R$ and angle differences across lines are small. Then the off-diagonal Jacobian blocks are small: $\partial P/\partial V$ involves $G_{ik}\cos\delta_{ik} + B_{ik}\sin\delta_{ik}$, which is small when both $G$ and $\delta_{ik}$ are small, and similarly for $\partial Q/\partial\delta$. Real power depends mainly on angles and reactive power mainly on voltage magnitudes, the same physics as the feeder approximation of [[power-systems/power-system-structure]].

The **fast decoupled** power flow of Stott and Alsaç drops $J_{PV}$ and $J_{Q\delta}$ and further approximates the remaining blocks by constant matrices built from the susceptances alone:
$$
\frac{\Delta\mathbf P}{\mathbf V} = B'\,\Delta\boldsymbol\delta,\qquad \frac{\Delta\mathbf Q}{\mathbf V} = B''\,\Delta\mathbf V,
$$ {#eq-fdlf}
where $B'$ and $B''$ are derived from $-B_{ik}$ (with series resistances and shunts dropped from $B'$). The matrices are factorised once, so each iteration costs two triangular solves. The method needs a few more iterations than full Newton–Raphson but each is far cheaper, and the converged answer is exact because the mismatches are computed exactly. It is the workhorse for contingency analysis.

::: theorem DC power flow {#thm-dc-pf}
If all line resistances are neglected, all voltage magnitudes are taken as $1\,\mathrm{pu}$, and angle differences are small ($\sin\delta_{ik}\approx\delta_{ik}$), the real power flow on a line of reactance $x_{ik}$ is
$$
P_{ik} = \frac{\delta_i - \delta_k}{x_{ik}},
$$ {#eq-dc-flow}
and the injections and angles are related by the **linear** system $\mathbf P = B'\boldsymbol\delta$, where $B'$ is the matrix with $B'_{ii} = \sum_k 1/x_{ik}$, $B'_{ik} = -1/x_{ik}$, with the slack bus row and column removed.
:::

::: proof
For a lossless line between buses at voltages $V_i\angle\delta_i$ and $V_k\angle\delta_k$, the real power flow is $V_iV_k\sin(\delta_i - \delta_k)/x_{ik}$ (the transfer law of [[power-systems/line-models]]). With $V_i = V_k = 1$ and $\sin\delta_{ik}\approx\delta_{ik}$ this is [[#eq-dc-flow]]. Summing over the lines at bus $i$, $P_i = \sum_k(\delta_i - \delta_k)/x_{ik} = \bigl(\sum_k1/x_{ik}\bigr)\delta_i - \sum_k\delta_k/x_{ik}$, which is row $i$ of $B'\boldsymbol\delta$. The slack angle is zero, so its column drops out, and its row is not needed because its injection balances the others (the model is lossless).
:::

The DC power flow, linear and non-iterative, gives line flows to within a few percent on transmission networks. Electricity markets use it to price congestion, and planners use it to screen thousands of outages quickly.

::: example DC power flow of the three-bus network {#ex-dc}
Use the DC approximation for the network and injections of [[#ex-gs]] and compare the line flows with the exact solution.
::: solution
With $x_{12} = 0.06$, $x_{13} = 0.24$, $x_{23} = 0.18$, slack bus 1 removed:
$$
B' = \begin{bmatrix}1/0.06 + 1/0.18 & -1/0.18\\ -1/0.18 & 1/0.24 + 1/0.18\end{bmatrix} = \begin{bmatrix}22.222 & -5.556\\ -5.556 & 9.722\end{bmatrix},\qquad \begin{bmatrix}P_2\\P_3\end{bmatrix} = \begin{bmatrix}0.4\\-1.2\end{bmatrix}.
$$
Solving, $\delta_2 = -0.0150\,\mathrm{rad} = -0.86^\circ$ and $\delta_3 = -0.1320\,\mathrm{rad} = -7.56^\circ$. The flows are $P_{12} = 0.0150/0.06 = 0.250$, $P_{13} = 0.1320/0.24 = 0.550$, $P_{23} = (0.1320 - 0.0150)/0.18 = 0.650\,\mathrm{pu}$. The exact sending-end flows were $0.282$, $0.586$ and $0.679$. The DC model under-estimates them by $4$ to $11\,\%$ here, mainly because it ignores the $6.8\,\mathrm{MW}$ of losses (which the slack must also supply) and the depressed voltage at bus 3; the pattern of flows, however, is right.
:::
:::

::: widget iterative
matrix: 22.222, -5.556; -5.556, 9.722
b: 0.4, -1.2
method: gauss-seidel
start: 0, 0
caption: The DC power flow of [[#ex-dc]], $B'\boldsymbol\delta = \mathbf P$, solved by Gauss–Seidel: the two lines are the equations for buses 2 and 3 in the $(\delta_2, \delta_3)$ plane, and their intersection is the solution $(-0.015, -0.132)$. Each sweep moves first horizontally, then vertically. Switch to Jacobi and compare the residual histories; try SOR with $\omega$ around $1.2$. Because $B'$ is diagonally dominant, every method converges.
:::

## Controlling power flow

Power-flow studies are not just predictions; they are used to choose the settings of the controls that operators have.

- **Generator voltages.** Raising a generator's voltage set-point increases the reactive power it supplies and raises voltages nearby. The real power is set by the governor and dispatch ([[power-systems/economic-dispatch-control]]).
- **Tap-changing transformers.** Changing the ratio $t$ in [[#eq-tap]] by a few percent (on-load tap changers typically span $\pm10\,\%$ in steps of about $1.25\,\%$) shifts reactive power between the two sides and regulates the voltage on one of them.
- **Shunt capacitors, reactors and static compensators** inject or absorb reactive power at a bus, which mainly changes the voltage magnitude there.
- **Phase-shifting transformers** add an angle to $\delta_i - \delta_k$ across a line, which by [[#eq-dc-flow]] directly changes its real power flow; they are used to relieve overloaded parallel paths.
- **HVDC links and FACTS devices** (series compensation, unified power-flow controllers) set flows directly.

::: example Choosing a capacitor bank to support a load bus {#ex-capacitor}
In the system of [[#ex-nr]] the load bus voltage of $0.9445\,\mathrm{pu}$ is below the minimum of $0.98\,\mathrm{pu}$. Find the smallest shunt capacitor bank (rated at $1\,\mathrm{pu}$ voltage, $100\,\mathrm{MVA}$ base) at bus 3 that raises the voltage to at least $0.98\,\mathrm{pu}$. Then choose a bank from standard sizes in steps of $5\,\mathrm{Mvar}$ and find the resulting voltage and losses.
::: solution
A neat trick: make bus 3 temporarily a PV bus with $V_3 = 0.98$ and $P_3 = -1.2$, solve the power flow, and read off the net reactive injection required. Newton–Raphson gives $Q_3 = -0.1883\,\mathrm{pu}$: the bus must be a net consumer of only $18.8\,\mathrm{Mvar}$ instead of $50\,\mathrm{Mvar}$, so the capacitor must supply $0.5 - 0.1883 = 0.3117\,\mathrm{pu}$ at $0.98\,\mathrm{pu}$ voltage. A capacitor's output is proportional to $V^2$, so its rating at $1\,\mathrm{pu}$ is $0.3117/0.98^2 = 0.3246\,\mathrm{pu} = 32.5\,\mathrm{Mvar}$.

Choosing $35\,\mathrm{Mvar}$ (admittance $j0.35\,\mathrm{pu}$ added to $Y_{33}$) and solving again with bus 3 as a PQ bus: $V_3 = 0.983\angle-6.90^\circ\,\mathrm{pu}$, inside the limit. The losses fall from $6.79$ to $5.50\,\mathrm{MW}$, because less reactive current flows in the lines, and generator 2 now absorbs $11.5\,\mathrm{Mvar}$ to hold its own voltage at $1.04$. The angle at bus 3 changes only a little, from $-6.50^\circ$ to $-6.90^\circ$: reactive compensation acts mainly on voltage magnitudes, as the decoupling of the next section predicts. The interaction with the generator at bus 2, whose reactive output swung from $+10.2$ to $-11.5\,\mathrm{Mvar}$, is the kind of effect that makes engineers check every compensation scheme with a full power flow rather than with a sensitivity estimate.
:::
:::

::: warning Convergence is not correctness
A power flow that converges has found *a* solution of the equations for the data given. If the data are wrong (an impedance on the wrong base, a transformer tap entered on the wrong side, a load in MW entered as per unit) the solution is wrong, often with voltages that look only slightly odd. Conversely, failure to converge often signals a real problem: the specified loading exceeds the network's capability, beyond the nose of the $P$–$V$ curve. Always check the solution: voltages within a few percent of nominal, generator $Q$ within limits, losses of a few percent, and power balance at each bus.
:::

::: history
Before digital computers, power-flow problems were solved on **AC network analysers**, scaled-down laboratory models of the network built from resistors, inductors and capacitors at a few hundred hertz; the first commercial analyser was built at MIT in 1929, and many utilities had one by the 1940s. J. B. Ward and H. W. Hale published a digital solution based on a Gauss–Seidel-type iteration in 1956. Newton's method was applied to the power flow by Van Ness and others in the early 1960s, but it was the 1967 paper of William F. Tinney and Clifford E. Hart at the Bonneville Power Administration, combining Newton's method with sparsity-preserving ordered elimination, that made it practical for large systems. Brian Stott and Ongun Alsaç published the fast decoupled load flow in 1974.
:::

## Where this leads

The bus admittance matrix and its inverse, the bus impedance matrix, are the basis of fault calculation in [[power-systems/symmetrical-faults]]. The power-flow solution gives the pre-fault voltages that those calculations start from, and the initial operating point for the stability studies of [[power-systems/power-system-stability]]. Economic dispatch in [[power-systems/economic-dispatch-control]] decides the generator powers that the power flow takes as data, and optimal power flow combines the two. In modern operation the power-flow equations also underpin **state estimation**, which fits a power-flow solution to thousands of redundant, noisy measurements, the subject of [[power-systems/protection-smart-grid]].

::: summary
- $Y_{\text{bus}}$ relates injected currents to bus voltages; diagonal entries are the sum of admittances at a bus, off-diagonal entries the negative of the admittance between two buses. It is symmetric (without phase shifters) and sparse.
- The power-flow equations $P_i - jQ_i = \mathbf V_i^*\sum_kY_{ik}\mathbf V_k$ are nonlinear; buses are slack ($V$, $\delta$ given), PV (generators: $P$, $V$ given) or PQ (loads: $P$, $Q$ given).
- Gauss–Seidel updates one bus at a time with $\mathbf V_i = \bigl((P_i - jQ_i)/\mathbf V_i^* - \sum_{k\ne i}Y_{ik}\mathbf V_k\bigr)/Y_{ii}$: cheap steps, slow linear convergence.
- Newton–Raphson solves $J\,\Delta\mathbf x = \Delta\mathbf s$ with the Jacobian of [[#eq-jacobian]]: quadratic convergence in a few iterations, independent of network size.
- With $X\gg R$, $P$ couples to angles and $Q$ to magnitudes: the fast decoupled method uses constant $B'$, $B''$, and the DC power flow $\mathbf P = B'\boldsymbol\delta$ is linear.
- Voltages are controlled by generator excitation, taps and reactive compensation; real flows by dispatch, phase shifters and HVDC.
:::

## Exercises

::: exercise An off-diagonal element {level=1 check="1/hypot(0.01,0.1)"}
Two buses are joined by two identical parallel lines, each of series impedance $0.02 + j0.20\,\mathrm{pu}$. Find $Y_{12}$ and give its magnitude in per unit.
::: solution
The two lines in parallel have impedance $0.01 + j0.10$ and admittance $0.990 - j9.901$. By [[#thm-ybus-rules]], $Y_{12} = -0.990 + j9.901\,\mathrm{pu}$, of magnitude $9.950\,\mathrm{pu}$.
:::
:::

::: exercise Counting equations {level=1 check="2*(200-1)-30"}
A network has $200$ buses, of which one is the slack and $30$ are generator (PV) buses. How many real equations does the Newton–Raphson power flow solve?
::: solution
$P$ equations at $199$ non-slack buses and $Q$ equations at $169$ load buses: $199 + 169 = 368$, which is $2(n - 1) - n_{PV}$.
:::
:::

::: exercise DC line flow {level=1 check="100*(0.10-(-0.05))/0.15"}
In a DC power flow, buses 4 and 7 have angles $0.10$ and $-0.05\,\mathrm{rad}$ and are joined by a line of reactance $0.15\,\mathrm{pu}$ on $100\,\mathrm{MVA}$. Find the flow from 4 to 7 in MW.
::: solution
$P_{47} = (0.10 + 0.05)/0.15 = 1.0\,\mathrm{pu} = 100\,\mathrm{MW}$.
:::
:::

::: exercise A tap-changing transformer in Y-bus {level=2}
A transformer with series admittance $y = -j10\,\mathrm{pu}$ and off-nominal ratio $t = 1.05$ on the side of bus $i$ connects buses $i$ and $k$. Write its contributions to $Y_{ii}$, $Y_{kk}$ and $Y_{ik}$, and the equivalent π circuit.
::: solution
From [[#eq-tap]]: $Y_{ii}\mathrel{+}= y/t^2 = -j9.070$, $Y_{kk}\mathrel{+}= y = -j10$, $Y_{ik} = Y_{ki}\mathrel{+}= -y/t = j9.524$. The π circuit has series admittance $y/t = -j9.524$, a shunt at $i$ of $y(1 - t)/t^2 = j0.454$ (capacitive) and a shunt at $k$ of $y(t - 1)/t = -j0.476$ (inductive). Check: $Y_{ii} = -j9.524 + j0.454 = -j9.070$ and $Y_{kk} = -j9.524 - j0.476 = -j10$.
:::
:::

::: exercise A two-bus Newton step {level=2 check="0.5/(1/0.2)"}
A load bus 2 is fed from the slack bus 1 ($1\angle0$) by a lossless line with $x = 0.2\,\mathrm{pu}$, and its voltage magnitude is held at $1\,\mathrm{pu}$ by local compensation. The load is $P = 0.5\,\mathrm{pu}$. Take one Newton step for $\delta_2$ from $\delta_2 = 0$, and give $\Delta\delta_2$'s magnitude in radians.
::: solution
The power injected at bus 2 is $P_2 = V_2V_1\sin(\delta_2 - \delta_1)/x = 5\sin\delta_2$, and the specified injection is $-0.5$ (a load). At $\delta_2 = 0$, $\Delta P = -0.5$ and $\partial P_2/\partial\delta_2 = 5\cos0 = 5$, so $\Delta\delta_2 = -0.1\,\mathrm{rad}$, magnitude $0.1$. The exact answer is $\arcsin(-0.1) = -0.1002\,\mathrm{rad}$.
:::
:::

::: exercise Losses from the slack {level=2 check="0.868+0.4-1.2"}
In [[#ex-nr]], verify the total real loss in per unit by summing the injections, and check it against the sum of the line losses $\mathbf S_{ik} + \mathbf S_{ki}$, given $\mathbf S_{21} = -0.2789 - j0.2527$, $\mathbf S_{31} = -0.5536 - j0.2432$ and $\mathbf S_{32} = -0.6464 - j0.2568$.
::: solution
$\sum P = 0.868 + 0.4 - 1.2 = 0.068\,\mathrm{pu}$. Line losses: $0.2815 - 0.2789 = 0.0026$; $0.5864 - 0.5536 = 0.0328$; $0.6789 - 0.6464 = 0.0325$; total $0.0679\,\mathrm{pu}$, in agreement. Line 1–2, although it carries power, has small losses because its resistance is low; the two longer lines account for nearly all.
:::
:::

::: exercise Jacobian at a flat start {level=2 check="-(-0.104)-1.04^2*(-20)"}
Verify the entry $\partial P_2/\partial\delta_2 = 21.736$ in the Jacobian of [[#ex-nr]] from [[#eq-jacobian]].
::: solution
$\partial P_2/\partial\delta_2 = -Q_2 - V_2^2B_{22}$ with $Q_2 = -0.104$ (computed in [[#ex-gs]]), $V_2 = 1.04$ and $B_{22} = -20$: $0.104 + 1.0816\times20 = 21.736$.
:::
:::

::: exercise Phase shifter for a parallel path {level=3}
Two lines in parallel connect bus 1 to bus 2: line A with $x_A = 0.10\,\mathrm{pu}$ and line B with $x_B = 0.20\,\mathrm{pu}$. A total of $1.5\,\mathrm{pu}$ flows from 1 to 2. Line A is rated $0.8\,\mathrm{pu}$. Using the DC model, find the flows without control, and the phase shift $\varphi$ that a phase-shifting transformer in series with line A must introduce (reducing its effective angle difference to $\delta_{12} - \varphi$) to bring line A to its rating.
::: hint
With the shifter, $P_A = (\delta_{12} - \varphi)/x_A$ and $P_B = \delta_{12}/x_B$, with $P_A + P_B = 1.5$.
:::
::: solution
Without control, the flow divides inversely to reactance: $P_A = 1.5\times0.2/0.3 = 1.0$ (overloaded), $P_B = 0.5$, with $\delta_{12} = 0.10\,\mathrm{rad}$. With $P_A = 0.8$ we need $P_B = 0.7$, so $\delta_{12} = 0.7\times0.2 = 0.14\,\mathrm{rad}$, and $0.8 = (0.14 - \varphi)/0.10$ gives $\varphi = 0.06\,\mathrm{rad} = 3.4^\circ$. The cost is a larger angle across the corridor, $8.0^\circ$ instead of $5.7^\circ$, and slightly higher total losses, since power is forced onto the higher-impedance path.
:::
:::

::: exercise Gauss–Seidel for a radial feeder {level=3}
A load of $\mathbf S = 0.8 + j0.4\,\mathrm{pu}$ is fed from a slack bus at $1\angle0$ through $z = 0.05 + j0.15\,\mathrm{pu}$. Write the Gauss–Seidel update for the load voltage, perform three iterations from $\mathbf V_2 = 1$, and compare with the exact solution of the quadratic $V^4 + [2(PR + QX) - 1]V^2 + (P^2 + Q^2)(R^2 + X^2) = 0$ from [[power-systems/power-system-structure]].
::: hint
With one line, $Y_{22} = 1/z$ and $Y_{21} = -1/z$, so [[#eq-gs]] reduces to $\mathbf V_2 = 1 - z(P - jQ)/\mathbf V_2^*$ for a load $P + jQ$ consumed.
:::
::: solution
$\mathbf V_2\leftarrow 1 - (0.05 + j0.15)(0.8 - j0.4)/\mathbf V_2^* = 1 - (0.10 + j0.10)/\mathbf V_2^*$.
Iteration 1: $1 - (0.10 + j0.10) = 0.9 - j0.1$.
Iteration 2: $\mathbf V_2^* = 0.9 + j0.1$ and $(0.10 + j0.10)/(0.9 + j0.1) = (0.10 + j0.10)(0.9 - j0.1)/0.82 = (0.10 + j0.08)/0.82 = 0.1220 + j0.0976$, so $\mathbf V_2 = 0.8780 - j0.0976$.
Iteration 3: $(0.10 + j0.10)/(0.8780 + j0.0976) = 0.1250 + j0.1000$, so $\mathbf V_2 = 0.8750 - j0.1000$ and $V_2 = 0.8807$.
Exact: $PR + QX = 0.04 + 0.06 = 0.10$, $(P^2 + Q^2)(R^2 + X^2) = 0.8\times0.025 = 0.02$, so $V^4 - 0.8V^2 + 0.02 = 0$, $V^2 = (0.8 + \sqrt{0.64 - 0.08})/2 = 0.7742$, $V = 0.8799$. Three iterations are already within $0.1\,\%$; the convergence is fast here because the load is far from the nose of the $P$–$V$ curve.
:::
:::
