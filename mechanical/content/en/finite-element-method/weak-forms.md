The first two chapters built element matrices from physical reasoning: a bar is a spring, a beam obeys the slope-deflection equations. That reasoning runs out as soon as an element is not a piece of a classical structural member — a triangle cut out of a plate, a brick of soil, a cell of a heat-conducting fin. What is needed is a recipe that starts from the governing differential equation of *any* problem and produces element matrices automatically. This chapter supplies it. We rewrite the differential equation in an integral **weak form**, show that for elastic bodies it is the principle of virtual work and the stationarity of potential energy (see [[solid-mechanics/energy-methods]]), and then approximate the unknown function by a combination of simple shape functions — **Galerkin's method**. Applied with piecewise-linear shape functions, the recipe reproduces the bar element of [[finite-element-method/direct-stiffness]] and, more importantly, tells us how to treat distributed loads, springs and variable properties, and why the answers converge. Everything is done for the one-dimensional bar so that every integral can be evaluated by hand; the two-dimensional version in [[finite-element-method/plane-elements]] is the same argument with more indices.

## The strong form

Cut a slice $dx$ out of a bar with axial stiffness $EA(x)$, carrying an axial body force $b(x)$ per unit length (self-weight of a vertical bar, friction from soil on a pile, centrifugal load on a rotating blade). The axial force is $N = EA\,du/dx$, and equilibrium of the slice, $N(x + dx) - N(x) + b\,dx = 0$, gives the differential equation below.

::: definition Strong form of the axially loaded bar {#def-strong}
Find the displacement $u(x)$ on $0 \le x \le L$ such that
$$
-\frac{d}{dx}\left(EA\,\frac{du}{dx}\right) = b(x) \quad\text{for } 0 < x < L,
$$ {#eq-strong}
with an **essential** (displacement, Dirichlet) boundary condition $u(0) = \bar u$ at the support and a **natural** (force, Neumann) boundary condition $EA\,u'(L) = \bar P$ at the loaded end. A spring of stiffness $k_s$ connecting the end to the ground gives the mixed (Robin) condition $EA\,u'(L) = -k_s\,u(L)$. The **strong form** asks for $u$ twice differentiable satisfying [[#eq-strong]] at every point.
:::

The strong form is a demanding requirement. If $EA$ jumps — a stepped bar — then $u'$ jumps too and $u''$ does not exist at the step; if a point load acts in the middle, $N$ jumps and the equation must be supplemented by interface conditions. Piecewise-linear finite element functions are worse still: their second derivative is zero inside each element and undefined at the nodes. A formulation that asks for less smoothness is needed.

## The weak form

Multiply [[#eq-strong]] by an arbitrary function $w(x)$ — a **weight** or **test function** — and integrate over the bar:
$$
-\int_0^L w\,(EAu')'\,dx = \int_0^L w\,b\,dx.
$$
Integrate the left side by parts: $-\int_0^L w(EAu')'\,dx = \int_0^L w'EAu'\,dx - \left[w\,EAu'\right]_0^L$. At $x = L$ the natural condition replaces $EAu'(L)$ by $\bar P$; at $x = 0$ we do not know $EAu'(0)$ (it is the reaction) and so we require $w(0) = 0$, i.e. test functions vanish where the displacement is prescribed. The result is the weak form.

::: proposition Weak form of the bar problem {#prop-weak}
Let $\mathcal{S} = \{u : u(0) = \bar u,\ \int_0^L (u')^2dx < \infty\}$ be the **trial functions** and $\mathcal{V} = \{w : w(0) = 0,\ \int_0^L (w')^2dx < \infty\}$ the **test functions**. The weak form is: find $u \in \mathcal{S}$ such that
$$
\int_0^L \frac{dw}{dx}\,EA\,\frac{du}{dx}\,dx = \int_0^L w\,b\,dx + w(L)\,\bar P \qquad \text{for every } w \in \mathcal{V}.
$$ {#eq-weak}
If $u$ is smooth enough (twice differentiable), it solves the weak form if and only if it solves the strong form.
:::

::: proof
*Strong ⇒ weak:* the integration by parts above, with $w(0) = 0$ and $EAu'(L) = \bar P$. *Weak ⇒ strong:* if $u$ is twice differentiable, integrate the left side of [[#eq-weak]] by parts back again:
$$
\int_0^L w\left[-(EAu')' - b\right]dx + w(L)\left[EAu'(L) - \bar P\right] = 0 \quad\text{for all } w \in \mathcal{V}.
$$
First choose test functions that also vanish at $x = L$; then the integral alone is zero for all such $w$. If the bracket $r(x) = -(EAu')' - b$ were non-zero at some point, it would keep one sign on a small interval by continuity, and a test function positive on that interval and zero elsewhere would make the integral non-zero — a contradiction. So $r \equiv 0$: the differential equation holds. The integral now vanishes for every $w$, leaving $w(L)[EAu'(L) - \bar P] = 0$; choose $w$ with $w(L) = 1$ to obtain the natural boundary condition. The essential condition holds because $u \in \mathcal{S}$.
:::

Three features of the weak form drive everything that follows.

1. **Lower smoothness.** Only first derivatives appear, and only inside an integral. A continuous, piecewise-linear $u$ — kinked at the nodes — is an admissible trial function.
2. **Symmetry between $u$ and $w$.** The left side $a(w, u) = \int_0^L w'EAu'\,dx$ is symmetric. This is what makes stiffness matrices symmetric.
3. **Two kinds of boundary condition.** Essential conditions are built into the function spaces and must be imposed explicitly. Natural conditions appear in the equation itself — we never impose $EAu'(L) = \bar P$ on the trial functions; it emerges, approximately, from the solution. A free end with no load is a natural condition with $\bar P = 0$ and needs no action at all.

::: intuition The weak form is virtual work
Read $w$ as a **virtual displacement** $\delta u$: an arbitrary small displacement field compatible with the supports ($\delta u = 0$ where $u$ is prescribed). Then $\int_0^L \delta u'\,EAu'\,dx = \int_0^L \delta\varepsilon\,\sigma A\,dx$ is the **internal virtual work** done by the actual stresses on the virtual strains, and the right side is the **external virtual work** of the body forces and the end load. The weak form says: a deformed body is in equilibrium if and only if internal and external virtual work are equal for every admissible virtual displacement. The integration by parts was the mathematical proof of the principle of virtual work.
:::

::: proposition Minimum total potential energy {#prop-mpe}
Define the total potential energy of the bar
$$
\Pi(u) = \frac12\int_0^L EA\,(u')^2\,dx - \int_0^L b\,u\,dx - \bar P\,u(L).
$$
If $EA > 0$, the solution of the weak form is the unique function in $\mathcal{S}$ that minimises $\Pi$.
:::

::: proof
Let $u$ solve [[#eq-weak]] and let $v = u + w$ be any other trial function, so $w = v - u \in \mathcal{V}$. Expanding the quadratic,
$$
\Pi(u + w) = \Pi(u) + \left[\int_0^L w'EAu'\,dx - \int_0^L bw\,dx - \bar Pw(L)\right] + \frac12\int_0^L EA\,(w')^2\,dx.
$$
The bracket vanishes by the weak form, and the last term is positive unless $w' \equiv 0$, which with $w(0) = 0$ means $w \equiv 0$. So $\Pi(v) > \Pi(u)$ for every $v \neq u$. Conversely, a minimiser makes $\frac{d}{d\epsilon}\Pi(u + \epsilon w)\big|_{\epsilon = 0} = 0$ for all $w$, which is [[#eq-weak]]. Assumptions: linear elasticity ($N = EAu'$), dead loads, $EA > 0$.
:::

## Approximate solutions: Rayleigh–Ritz and Galerkin

The weak form has infinitely many test functions and an unknown that is a whole function. To compute, we replace $\mathcal{S}$ and $\mathcal{V}$ by finite-dimensional subsets. Let $u_h(x) = \sum_{j=1}^n N_j(x)\,d_j + (\text{a function satisfying the essential BC})$, where the $N_j$ are chosen **basis** or **shape functions** vanishing where $u$ is prescribed, and let the test functions range over the same functions $N_i$:

::: definition Galerkin's method {#def-galerkin}
**Galerkin's method** seeks $u_h = \sum_j N_jd_j$ (plus the essential-BC part) such that the weak form holds for every test function in the span of the same basis, $w = N_i$, $i = 1, \dots, n$. This gives $n$ linear equations
$$
\sum_{j=1}^n K_{ij}\,d_j = F_i, \qquad K_{ij} = \int_0^L N_i'\,EA\,N_j'\,dx, \qquad F_i = \int_0^L N_i\,b\,dx + N_i(L)\,\bar P.
$$ {#eq-galerkin}
When the weak form comes from an energy functional, Galerkin's method coincides with the **Rayleigh–Ritz method**, which minimises $\Pi(u_h)$ over the coefficients $d_j$: $\partial\Pi/\partial d_i = 0$ is exactly row $i$ of [[#eq-galerkin]].
:::

The matrix $\mathbf{K}$ is symmetric because $a(\cdot,\cdot)$ is, and positive definite because $\Pi$ is strictly convex. The quality of the answer depends entirely on the choice of the $N_j$. Ritz used polynomials defined over the whole body; the finite element method uses functions that are non-zero only over a few elements.

::: example One- and two-term Ritz solutions {#ex-ritz}
A bar of length $L = 2\,\mathrm{m}$ and $EA = 1.0\times10^{8}\,\mathrm{N}$ (steel, $A = 500\,\mathrm{mm^2}$) is fixed at $x = 0$ and free at $x = L$. It carries a body force that increases linearly from zero, $b(x) = b_0\,x/L$ with $b_0 = 30\,\mathrm{kN/m}$. Find the Ritz approximations with $u_h = a_1x$ and with $u_h = a_1x + a_2x^2$, and compare tip displacement and root stress with the exact solution.
::: solution
*Exact.* Integrating $EAu'' = -b_0x/L$ with $u(0) = 0$ and $EAu'(L) = 0$:
$$
u(x) = \frac{b_0}{2EA\,L}\left(L^2x - \frac{x^3}{3}\right), \qquad u(L) = \frac{b_0L^2}{3EA}, \qquad N(0) = EAu'(0) = \frac{b_0L}{2}.
$$
With numbers: $u(L) = 30\,000 \times 4/(3\times10^{8}) = 4.00\times10^{-4}\,\mathrm{m} = 0.400\,\mathrm{mm}$, and $N(0) = 30\,\mathrm{kN}$, i.e. $\sigma(0) = 60\,\mathrm{MPa}$.

*One term.* $u_h = a_1x$ satisfies $u(0) = 0$. $\Pi = \tfrac12 EAa_1^2L - a_1\int_0^L (b_0x/L)\,x\,dx = \tfrac12EAa_1^2L - a_1b_0L^2/3$. Setting $d\Pi/da_1 = 0$: $a_1 = b_0L/(3EA)$. Tip: $a_1L = b_0L^2/(3EA) = 0.400\,\mathrm{mm}$ — exact. Root force: $EAa_1 = b_0L/3 = 20\,\mathrm{kN}$ ($40\,\mathrm{MPa}$), a third too low.

*Two terms.* With $u_h = a_1x + a_2x^2$ the two equations $\partial\Pi/\partial a_1 = \partial\Pi/\partial a_2 = 0$ are
$$
EA\begin{bmatrix} L & L^2 \\ L^2 & \tfrac43L^3 \end{bmatrix}\begin{bmatrix} a_1 \\ a_2 \end{bmatrix} = b_0\begin{bmatrix} L^2/3 \\ L^3/4 \end{bmatrix},
$$
whose solution is $a_1 = 7b_0L/(12EA)$, $a_2 = -b_0/(4EA)$. Tip: $(7/12 - 1/4)\,b_0L^2/EA = b_0L^2/(3EA) = 0.400\,\mathrm{mm}$ — exact again. Root force $EAa_1 = 7b_0L/12 = 35\,\mathrm{kN}$ ($70\,\mathrm{MPa}$), now 17 % too high.

*Check and interpretation.* The strain energies are in the ratio $5/6$ (one term) and $95/96$ (two terms) to the exact value: the energy converges fast and from below, as [[#prop-mpe]] requires (minimising over a smaller set can only give a higher $\Pi$, and for this problem $\Pi = -U$ at the solution). Displacements converge faster than stresses, and the stress error is largest at the boundary — a pattern that persists in every finite element model.
:::
:::

## Finite element shape functions

Divide $[0, L]$ into elements with nodes $x_1 < x_2 < \dots < x_{n+1}$. The **hat function** $N_i$ equals 1 at node $i$, 0 at every other node, and is linear on each element. It is non-zero only on the two elements adjacent to node $i$, so $K_{ij} = 0$ unless nodes $i$ and $j$ share an element — the sparsity of the direct stiffness method, now derived. Any continuous piecewise-linear function is $u_h = \sum_i N_i\,u_i$ with $u_i = u_h(x_i)$: the coefficients are the **nodal displacements**.

On one element of length $L_e$ from $x_i$ to $x_j$, only $N_i = (x_j - x)/L_e$ and $N_j = (x - x_i)/L_e$ are non-zero. Because the integrals of [[#eq-galerkin]] split into sums over elements, the global matrices are assembled from element matrices:

::: proposition Linear bar element from Galerkin's method {#prop-element}
For a two-node element with constant $EA$ and the linear shape functions above,
$$
\mathbf{k}^{(e)} = \int_{x_i}^{x_j}\begin{bmatrix} N_i' \\ N_j' \end{bmatrix}EA\begin{bmatrix} N_i' & N_j' \end{bmatrix}dx = \frac{EA}{L_e}\begin{bmatrix} 1 & -1 \\ -1 & 1 \end{bmatrix}, \qquad \mathbf{f}^{(e)} = \int_{x_i}^{x_j}\begin{bmatrix} N_i \\ N_j \end{bmatrix}b\,dx.
$$ {#eq-element}
For a uniform body force $b$, $\mathbf{f}^{(e)} = \tfrac12 bL_e\,[1, 1]^{\mathsf T}$; for $b$ varying linearly from $b_i$ to $b_j$, $\mathbf{f}^{(e)} = \tfrac{L_e}{6}\,[2b_i + b_j,\ b_i + 2b_j]^{\mathsf T}$.
:::

::: proof
$N_i' = -1/L_e$ and $N_j' = 1/L_e$ are constant, so $\int N_a'EAN_b'\,dx = EA\,L_e\,(\pm 1/L_e^2)$, giving the bar matrix. For the load, $\int N_i\,dx = \int N_j\,dx = L_e/2$. For a linear load write $b = b_iN_i + b_jN_j$; then $\int N_i^2\,dx = L_e/3$ and $\int N_iN_j\,dx = L_e/6$, so $f_i = b_iL_e/3 + b_jL_e/6$ and similarly for $f_j$. The total $f_i + f_j = (b_i + b_j)L_e/2$ is the resultant of the load, and its split puts more on the more heavily loaded node.
:::

The direct stiffness method of the first chapter is thus Galerkin's method with hat functions. What is new is the load vector: a distributed load is not "lumped" by judgement but distributed by the shape functions, $\int\mathbf{N}^{\mathsf T}b\,dx$, which is the virtual work of the real load on the nodal virtual displacements. These are the **consistent** nodal loads; the beam loads $qL/2$ and $qL^2/12$ of [[finite-element-method/trusses-frames]] came from the same formula with Hermite functions.

::: example Two linear elements under a uniform load {#ex-two-elements}
The bar of [[#ex-ritz]] carries instead a uniform body force $b = 20\,\mathrm{kN/m}$. Solve with two equal linear elements and compare displacements and axial forces with the exact solution.
::: solution
$L_e = 1\,\mathrm{m}$, $EA/L_e = 1.0\times10^{8}\,\mathrm{N/m}$, consistent loads $bL_e/2 = 10\,\mathrm{kN}$ per element end. Assembled loads: node 1 (support) 10 kN, node 2 20 kN, node 3 10 kN. With $u_1 = 0$:
$$
10^{8}\begin{bmatrix} 2 & -1 \\ -1 & 1 \end{bmatrix}\begin{bmatrix} u_2 \\ u_3 \end{bmatrix} = \begin{bmatrix} 20\,000 \\ 10\,000 \end{bmatrix}\ \mathrm{N} \quad\Rightarrow\quad u_2 = 3.0\times10^{-4}\,\mathrm{m}, \quad u_3 = 4.0\times10^{-4}\,\mathrm{m}.
$$
Exact: $u = \frac{b}{EA}\left(Lx - \frac{x^2}{2}\right)$ gives $u(1) = 2\times10^{-4}(2 - 0.5) = 3.0\times10^{-4}\,\mathrm{m}$ and $u(2) = 4.0\times10^{-4}\,\mathrm{m}$: the nodal values are exact.

Axial forces: element 1, $N = EA(u_2 - u_1)/L_e = 30\,\mathrm{kN}$; element 2, $N = 10\,\mathrm{kN}$. The exact force $N(x) = b(L - x)$ is linear, from 40 kN at the root to 0 at the tip; the elements give constants equal to the exact force **at their midpoints** ($x = 0.5$: 30 kN; $x = 1.5$: 10 kN) but are 10 kN wrong at their ends. The reaction from row 1, $R_1 = -10^8 u_2 - 10\,000 = -40\,\mathrm{kN}$, is exact, because it comes from global equilibrium with the consistent loads.

*Check.* Total load $bL = 40\,\mathrm{kN}$ balances the reaction. Reading stresses at element midpoints, not at nodes, is the simplest form of stress recovery, discussed in [[finite-element-method/convergence-meshing]].
:::
:::

That the nodal values were exact is no accident.

::: theorem Galerkin orthogonality and best approximation {#thm-best}
Let $u$ solve the weak form and $u_h$ be the Galerkin solution in a finite-dimensional space $\mathcal{V}_h \subset \mathcal{V}$ (with the same essential-BC part). Write $a(v, w) = \int_0^L v'EAw'\,dx$ and the energy norm $\|v\|_E = \sqrt{a(v, v)}$. Then
1. (**orthogonality**) $a(w_h, u - u_h) = 0$ for every $w_h \in \mathcal{V}_h$;
2. (**best approximation**) $\|u - u_h\|_E \le \|u - v_h\|_E$ for every admissible $v_h$ in the trial space: the Galerkin solution is the closest function of the space to the exact solution, measured in strain energy.
:::

::: proof
(1) The exact solution satisfies [[#eq-weak]] for all $w \in \mathcal{V}$, in particular for $w_h \in \mathcal{V}_h$; the Galerkin solution satisfies the same equation for those $w_h$ by construction. Subtracting, $a(w_h, u - u_h) = 0$. (2) Let $v_h$ be another trial function; then $w_h = u_h - v_h \in \mathcal{V}_h$. Using symmetry and orthogonality,
$$
\|u - v_h\|_E^2 = \|(u - u_h) + w_h\|_E^2 = \|u - u_h\|_E^2 + 2a(w_h, u - u_h) + \|w_h\|_E^2 = \|u - u_h\|_E^2 + \|w_h\|_E^2 \ge \|u - u_h\|_E^2.
$$
Assumptions: $a$ symmetric and positive definite ($EA > 0$, enough supports), and the integrals evaluated exactly.
:::

The theorem turns the question "how accurate is the finite element solution?" into the much easier question "how well can functions of this space approximate the exact solution?" — an interpolation question that [[finite-element-method/convergence-meshing]] answers with powers of the element size. It also explains the stiffening seen in [[finite-element-method/direct-stiffness]]: from (1) with $w_h = u_h$, $a(u_h, u_h) = a(u, u_h)$, which leads to $U(u_h) = U(u) - \tfrac12\|u - u_h\|_E^2 \le U(u)$ when only forces are applied — a displacement-based model stores too little strain energy, i.e. it is too stiff.

::: proposition Nodal exactness in one dimension {#prop-nodal}
For the bar problem with $EA$ constant on each element, the Galerkin solution with linear elements and exactly integrated consistent loads equals the exact solution at every node, whatever the load $b(x)$.
:::

::: proof
Fix a node $x_k$ (not the support). Consider the function $g_k(x)$ that solves the bar problem with no body force, fixed at $x = 0$, free at $x = L$, and a unit point load at $x_k$: it is the displacement due to a unit load, $g_k(x) = \int_0^{\min(x, x_k)}dx'/EA$. Where $EA$ is constant on each element, $g_k$ is linear on each element and continuous: it belongs to the finite element space. Its weak form reads $a(w, g_k) = w(x_k)$ for every test function $w$ (the work of the unit load). Take $w = u - u_h$, which vanishes at $x = 0$: $(u - u_h)(x_k) = a(u - u_h, g_k) = a(g_k, u - u_h) = 0$ by Galerkin orthogonality, since $g_k \in \mathcal{V}_h$. Hence $u_h(x_k) = u(x_k)$.
:::

Nodal exactness is special: it fails as soon as the equation contains another term (a bar on an elastic foundation, below), in two dimensions, or when integrals are approximated. What survives in general is the best-approximation property of [[#thm-best]].

::: widget plot
f: (x - x^3/3)/2; (((min(floor(n*x),n-1)/n)) - ((min(floor(n*x),n-1)/n))^3/3)/2 + n*(x - (min(floor(n*x),n-1)/n))*((((min(floor(n*x),n-1)/n)+1/n) - ((min(floor(n*x),n-1)/n)+1/n)^3/3)/2 - (((min(floor(n*x),n-1)/n)) - ((min(floor(n*x),n-1)/n))^3/3)/2)
x: 0, 1
y: 0, 0.36
sliders: n=2:1:8:1
labels: \text{exact } u; \text{FE } u_h
caption: Displacement of the bar of [[#ex-ritz]] (linearly increasing load), in units of $b_0L^2/EA$, against $x/L$, with $n$ linear elements. By [[#prop-nodal]] the finite element solution is the piecewise-linear interpolant of the exact curve: it passes through the exact value at every node. Move the slider: the gap between the curves shrinks roughly fourfold each time $n$ doubles.
:::

::: widget plot
f: (1-x^2)/2; n*(((((min(floor(n*x),n-1)/n)+1/n)) - (((min(floor(n*x),n-1)/n)+1/n))^3/3)/2 - (((min(floor(n*x),n-1)/n)) - ((min(floor(n*x),n-1)/n))^3/3)/2)
x: 0, 1
y: 0, 0.55
sliders: n=2:1:8:1
labels: \text{exact strain}; \text{FE strain}
caption: The strain (in units of $b_0L/EA$) for the same model. The finite element strain is constant on each element and equals the average of the exact strain over the element, so it is exact somewhere near each element's middle but in error by about half the jump at the nodes. The error falls only in proportion to $1/n$ — stresses converge one order more slowly than displacements, and are worst at the root, where the designer most needs them.
:::

## Natural boundary conditions in practice

::: example An end spring {#ex-spring-end}
The bar of [[#ex-two-elements]] (uniform $b = 20\,\mathrm{kN/m}$, two elements) is now connected at $x = L$ to the ground by a spring $k_s = 5.0\times10^{7}\,\mathrm{N/m}$. Derive how the spring enters the equations and solve.
::: solution
The end condition is now $EAu'(L) = -k_su(L)$ (the spring pushes back). In the weak form the boundary term $w(L)\,EAu'(L)$ becomes $-k_s\,w(L)\,u(L)$; moving it to the left,
$$
\int_0^L w'EAu'\,dx + k_s\,w(L)\,u(L) = \int_0^L w\,b\,dx.
$$
With $w = N_i$ and $u_h = \sum N_ju_j$, the new term adds $k_s$ to the diagonal entry of the end node only — the spring is assembled like a spring element to a fixed node. The system becomes
$$
\begin{bmatrix} 2\times10^{8} & -1\times10^{8} \\ -1\times10^{8} & 1\times10^{8} + 5\times10^{7} \end{bmatrix}\begin{bmatrix} u_2 \\ u_3 \end{bmatrix} = \begin{bmatrix} 20\,000 \\ 10\,000 \end{bmatrix},
$$
whose solution is $u_2 = u_3 = 2.0\times10^{-4}\,\mathrm{m}$. Spring force $k_su_3 = 10\,\mathrm{kN}$, wall reaction 30 kN. 

*Check.* Exact solution: $u = -\frac{b}{2EA}x^2 + Cx$ with $C$ from $EAu'(L) = -k_su(L)$, which gives $C = 3.0\times10^{-4}$ and $u(1) = u(2) = 2.0\times10^{-4}\,\mathrm{m}$: nodal exactness again. Loads balance: $30 + 10 = 40\,\mathrm{kN}$. Note that the natural condition $EAu'(L) = -k_su(L)$ is *not* satisfied by the element strain at the tip (element 2 has $u' = 0$); it is satisfied only in the weak, integrated sense.
:::
:::

::: example A bar on an elastic foundation {#ex-foundation}
A pile embedded in soil can be modelled as a bar with a distributed spring support: $-(EAu')' + k_fu = b$. In dimensionless form take $-u'' + u = 1$ on $0 < x < 1$, $u(0) = 0$, $u'(1) = 0$. Find the Galerkin equations for linear elements and the tip displacement with one element; compare with the exact $u(1) = 1 - 1/\cosh 1$.
::: solution
The weak form gains a term $\int_0^1 w\,u\,dx$, so each element gets, besides the stiffness $\frac{1}{L_e}[1, -1; -1, 1]$, a **foundation matrix** $\int\mathbf{N}^{\mathsf T}\mathbf{N}\,dx = \frac{L_e}{6}[2, 1; 1, 2]$ (the same integrals as the linear load in [[#prop-element]]). With one element ($L_e = 1$) and $u_1 = 0$, only the $(2,2)$ entries matter: $(1 + \tfrac13)u_2 = \tfrac12$, so $u_2 = 0.375$. Exact: $u = 1 - \cosh(1 - x)/\cosh 1$, $u(1) = 1 - 1/1.5431 = 0.3519$. Error $6.6\,\%$. With four elements the computed tip value is $0.3532$ (error $0.37\,\%$).

*Check.* The answer is no longer nodally exact, because the unit-load response of a bar on a foundation is made of exponentials, not linear pieces, so the argument of [[#prop-nodal]] fails. It still converges, and from the expected side: the error shrinks by a factor of about 4 per halving of $L_e$.
:::
:::

::: warning Essential conditions are not optional
Galerkin's method imposes natural conditions automatically and essential ones never. Forgetting to impose $u(0) = 0$ leaves a singular matrix (a rigid-body mode); imposing a *natural* condition as if it were essential — for example setting the strain at a free end to zero by constraint, or fixing a symmetry plane in the wrong direction — over-constrains the model and gives an answer that converges to the solution of a different problem. Decide for every boundary which quantity is known: if it is a displacement, constrain it; if it is a force (including zero force), leave it to the weak form and put any non-zero value into $\mathbf{F}$.
:::

::: quiz
For the beam equation $EI\,v'''' = q$, the weak form is obtained by integrating by parts twice. Which boundary quantities are essential?
- [x] The deflection $v$ and the slope $v'$.
- [ ] The bending moment $EIv''$ and the shear force $EIv'''$.
- [ ] Only the deflection.
- [ ] All four, since the equation is fourth order.
::: solution
After two integrations by parts the weak form $\int w''EIv''\,dx = \int wq\,dx + [\dots]$ contains $w$ and $w'$ in the boundary terms multiplied by shear force and moment. Quantities paired with the test function and its first derivative — $v$ and $v'$ — are essential and must be built into the trial space; the moment and shear are natural. This is why beam elements carry deflection and rotation as DOFs, and why their shape functions must be continuous with continuous slopes (the Hermite cubics).
:::
:::

## Other weighted-residual methods

Galerkin's choice $w = N_i$ is one of a family. Substituting an approximation $u_h$ into the strong form leaves a **residual** $r = -(EAu_h')' - b$, and every **weighted-residual method** requires $\int_0^L w_ir\,dx = 0$ for $n$ chosen weights. **Collocation** takes $w_i$ to be Dirac deltas, forcing $r = 0$ at $n$ points; it needs twice-differentiable trial functions and gives unsymmetric matrices. The **least-squares** method takes $w_i = \partial r/\partial d_i$, minimising $\int r^2\,dx$; it is symmetric but again needs second derivatives and badly conditioned matrices. **Subdomain** methods force the integral of $r$ to vanish over each cell, which is the essence of the finite volume method used in computational fluid dynamics. Galerkin's method is the one that, for symmetric problems, reproduces the energy principle, gives symmetric positive definite matrices, lowers the required smoothness and enjoys the best-approximation property; that is why it is the standard for solid mechanics and heat conduction. For strongly convective flows, where the operator is not symmetric, modified (Petrov–Galerkin) weights with $w \neq N$ are used instead.

::: history
The ingredients are older than computers. Lord Rayleigh estimated natural frequencies by inserting assumed deflected shapes into energy expressions in *The Theory of Sound* (1877); Walther Ritz turned this into a systematic method with several trial functions and convergence in 1908–09, and Boris Galerkin published in 1915 the method of weighting the equation by the trial functions themselves, which does not need an energy functional. Their trial functions extended over the whole body, which made them impractical for complicated shapes. Richard Courant's 1943 paper on torsion used Ritz's method with functions that are linear on each triangle of a mesh — hat functions in two dimensions — and is therefore often cited as the mathematical birth of the finite element method; engineers arrived at the same matrices independently in the 1950s through the direct stiffness method, and the identification of the two, around 1960–65, gave the method its theoretical foundation and its generality.
:::

::: summary
- The strong form requires the differential equation at every point; the weak form, obtained by multiplying by a test function $w$ and integrating by parts, needs only first derivatives and is equivalent for smooth solutions.
- Essential boundary conditions (displacements) are imposed on the trial functions, and test functions vanish there; natural conditions (forces, springs) appear in the weak form itself.
- For elasticity the weak form is the principle of virtual work, and its solution minimises the total potential energy.
- Galerkin's method uses the same functions for trial and test, giving symmetric $K_{ij} = \int N_i'EAN_j'\,dx$ and consistent loads $F_i = \int N_ib\,dx$; with hat functions it reproduces the bar element.
- Galerkin orthogonality makes the FE solution the best approximation in the energy norm; displacement models are therefore too stiff and underestimate strain energy.
- In 1-D with piecewise-constant $EA$, linear elements are exact at the nodes; stresses are exact only near element midpoints and converge one order slower than displacements.
:::

## Exercises

::: exercise Consistent loads for a uniform body force {level=1 check="0.5"}
A linear bar element of length $0.5\,\mathrm{m}$ carries a uniform axial body force $b = 2\,\mathrm{kN/m}$. What is the consistent nodal load at each node? (Enter it in kN.)
::: solution
$bL_e/2 = 2 \times 0.5/2 = 0.5\,\mathrm{kN}$ at each node.
:::
:::

::: exercise A hanging rod with one element {level=1 check="0.4813"}
A steel rod ($E = 200\,\mathrm{GPa}$, $\rho = 7850\,\mathrm{kg/m^3}$, $A = 400\,\mathrm{mm^2}$, $g = 9.81\,\mathrm{m/s^2}$) $50\,\mathrm{m}$ long hangs from its top. Model it with a single linear element with consistent self-weight loads and find the extension at the bottom. (Enter it in mm.)
::: solution
$b = \rho gA = 7850 \times 9.81 \times 4\times10^{-4} = 30.80\,\mathrm{N/m}$. The consistent load at the free node is $bL/2 = 770.0\,\mathrm{N}$, and $k = EA/L = 200\times10^9 \times 4\times10^{-4}/50 = 1.6\times10^{6}\,\mathrm{N/m}$, so $u = 770.0/1.6\times10^{6} = 4.813\times10^{-4}\,\mathrm{m} = 0.4813\,\mathrm{mm}$. This equals the exact $\rho gL^2/(2E)$, as [[#prop-nodal]] predicts; the element stress, $3.85/2 = 1.93\,\mathrm{MPa}$, is the true value at midlength, while the true maximum at the top is $\rho gL = 3.85\,\mathrm{MPa}$.
:::
:::

::: exercise A triangular load {level=1 check="3"}
A linear element of length $1.5\,\mathrm{m}$ carries an axial body force varying linearly from 0 at node $i$ to $6\,\mathrm{kN/m}$ at node $j$. Find the consistent loads. (Enter $f_j$ in kN.)
::: solution
From [[#prop-element]] with $b_i = 0$, $b_j = 6$: $f_i = L_e(b_j)/6 = 1.5\,\mathrm{kN}$ and $f_j = L_e(2b_j)/6 = 3.0\,\mathrm{kN}$. The total is $4.5\,\mathrm{kN}$, the resultant of the triangle, split in the ratio 1 : 2 because the resultant acts at two-thirds of the length.
:::
:::

::: exercise Root stress of the two-term Ritz solution {level=2 check="70"}
Verify the two-term Ritz equations of [[#ex-ritz]] by evaluating the integrals, solve them, and compute the root stress $EAu_h'(0)/A$ with $A = 500\,\mathrm{mm^2}$. (Enter it in MPa.)
::: solution
$\int_0^L (u_h')^2dx$ with $u_h' = a_1 + 2a_2x$ gives the matrix entries $L$, $L^2$ and $\tfrac43L^3$; the load terms are $\int b\,x\,dx = b_0L^2/3$ and $\int b\,x^2\,dx = b_0L^3/4$. Solving: $a_1 = 7b_0L/(12EA)$. Root force $EAa_1 = 7 \times 30 \times 2/12 = 35\,\mathrm{kN}$; stress $35\,000/500 = 70\,\mathrm{MPa}$ (exact 60 MPa).
:::
:::

::: exercise Energy of the one-term solution {level=2 check="5/6"}
For [[#ex-ritz]], compute the ratio of the strain energy of the one-term Ritz solution to the exact strain energy. (Enter the ratio as a number.)
::: solution
$U_h = \tfrac12EA\,a_1^2L = \tfrac12EA(b_0L/3EA)^2L = b_0^2L^3/(18EA)$. Exact: $u' = \frac{b_0}{2EAL}(L^2 - x^2)$, $U = \frac{EA}{2}\int_0^L(u')^2dx = \frac{b_0^2}{8EAL^2}\int_0^L(L^2 - x^2)^2dx = \frac{b_0^2}{8EAL^2}\cdot\frac{8L^5}{15} = \frac{b_0^2L^3}{15EA}$. Ratio $= 15/18 = 5/6$. It is below one, as the best-approximation theorem requires for a force-loaded displacement model.
:::
:::

::: exercise A stiffer end spring {level=2 check="13.333"}
Repeat [[#ex-spring-end]] with $k_s = 1.0\times10^{8}\,\mathrm{N/m}$. Find the spring force. (Enter it in kN.)
::: solution
$10^{8}[2, -1; -1, 2][u_2, u_3]^{\mathsf T} = [20\,000, 10\,000]^{\mathsf T}$; determinant $3\times10^{16}$, so $u_3 = 10^{8}(20\,000 + 2 \times 10\,000)/(3\times10^{16}) = 1.333\times10^{-4}\,\mathrm{m}$ and $u_2 = 1.667\times10^{-4}\,\mathrm{m}$. Spring force $= 10^{8} \times 1.333\times10^{-4} = 13.33\,\mathrm{kN}$; wall reaction $26.67\,\mathrm{kN}$. A stiffer spring attracts more load, approaching 20 kN (half the load, by symmetry) as $k_s \to \infty$.
:::
:::

::: exercise The foundation problem with two elements {level=3 check="0.35723"}
Solve the problem of [[#ex-foundation]] with two equal linear elements by hand and give the tip value $u(1)$. (Enter it to at least four significant figures.)
::: solution
$L_e = \tfrac12$: each element contributes $2[1, -1; -1, 1] + \tfrac{1}{12}[2, 1; 1, 2]$ and loads $\tfrac14[1, 1]$. With $u_1 = 0$:
$$
\begin{bmatrix} 4 + \tfrac13 & -2 + \tfrac1{12} \\ -2 + \tfrac1{12} & 2 + \tfrac16 \end{bmatrix}\begin{bmatrix} u_2 \\ u_3 \end{bmatrix} = \begin{bmatrix} \tfrac12 \\ \tfrac14 \end{bmatrix}.
$$
Determinant $= \tfrac{13}{3}\cdot\tfrac{13}{6} - \left(\tfrac{23}{12}\right)^2 = 9.3889 - 3.6736 = 5.7153$. $u_3 = \left(\tfrac{13}{3}\cdot\tfrac14 + \tfrac{23}{12}\cdot\tfrac12\right)/5.7153 = (1.08333 + 0.95833)/5.7153 = 0.35723$. Exact 0.35194: error 1.5 %, against 6.6 % for one element — a factor of 4.4 for halving the element size.
:::
:::

::: exercise Weak form of the beam equation {level=3}
Starting from $(EIv'')'' = q$ on $0 < x < L$, multiply by a test function $w$ and integrate by parts twice. Write the weak form for a cantilever clamped at $x = 0$ with a tip force $\bar F$ and tip moment $\bar M$ at $x = L$, state the test and trial spaces, and show that Galerkin's method with the Hermite functions gives the beam element stiffness $\int\mathbf{B}^{\mathsf T}EI\mathbf{B}\,dx$, $\mathbf{B} = \mathbf{N}''$, and the consistent load $\int\mathbf{N}^{\mathsf T}q\,dx$.
::: solution
$\int_0^Lw(EIv'')''dx = [w(EIv'')']_0^L - [w'EIv'']_0^L + \int_0^Lw''EIv''dx$. With shear $V = -(EIv'')'$ and moment $M = EIv''$ (sign conventions as in [[finite-element-method/trusses-frames]]), the tip conditions are $(EIv'')'(L) = -\bar F$ and $EIv''(L) = \bar M$ for an upward force and anticlockwise moment. Requiring $w(0) = w'(0) = 0$ removes the unknown reactions at the clamp. The weak form: find $v$ with $v(0) = v'(0) = 0$ and square-integrable $v''$ such that
$$
\int_0^L w''EIv''\,dx = \int_0^L wq\,dx + w(L)\bar F + w'(L)\bar M \quad\text{for all such } w.
$$
Trial and test functions need continuous $v$ and $v'$ ($C^1$). Substituting $v = \mathbf{N}\mathbf{d}$, $w = N_i$ gives $\sum_j\left(\int N_i''EIN_j''dx\right)d_j = \int N_iq\,dx + N_i(L)\bar F + N_i'(L)\bar M$: the stiffness $\int\mathbf{B}^{\mathsf T}EI\mathbf{B}\,dx$, the consistent load, and the tip force and moment entering the $v$ and $\theta$ rows of the tip node.
:::
:::

::: exercise When is the finite element solution exact? {level=3}
Explain, using [[#prop-nodal]] and [[#thm-best]], why (a) linear bar elements give exact nodal displacements for a stepped bar under any axial load, (b) they do not for a continuously tapered bar modelled with constant-area elements, and (c) the beam elements of [[finite-element-method/trusses-frames]] give exact nodal displacements and rotations under uniform load. What property of the "unit-load response" is common to the exact cases?
::: solution
(a) With $EA$ constant on each element, the unit-load response $g_k(x) = \int_0^{\min(x, x_k)}dx/EA$ is piecewise linear with kinks only at nodes (place the steps at nodes), so it lies in the FE space and the orthogonality argument gives nodal exactness. (b) If the model replaces a tapered $EA(x)$ by element constants, it solves a *different* problem (a stepped bar); its nodal values are exact for the stepped bar but not for the tapered one. Even if the exact $EA(x)$ were integrated in the element matrices, $g_k$ for a tapered bar is not piecewise linear, so the argument fails. (c) For a uniform beam, the deflection due to a unit point load or unit moment at a node is a piecewise cubic, cubic between nodes, with continuous slope: it lies in the span of the Hermite functions. The common property is that the Green's function (influence function) for a nodal value belongs to the finite element space; then Galerkin orthogonality forces the nodal error to vanish, whatever the load.
:::
:::
