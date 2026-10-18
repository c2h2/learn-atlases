Weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method: the weak form is an integral equation equivalent to the strong form (the differential equation and boundary conditions), and Galerkin's method is the weighted-residual approach that produces the discrete system of equations. **The engineer who derives the weak form without checking the integration by parts is not deriving the weak form; they are guessing.** The weak form and Galerkin calculation is the reason the engineer can derive the element stiffness matrix from first principles, and the integration by parts is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.

The quantitative tools of weak forms and Galerkin's method are the **strong form** (the differential equation and boundary conditions), the **weak form** (the integral equation obtained by multiplying by a test function and integrating by parts), the **test function** (the weight function that vanishes on the essential boundary), and **Galerkin's method** (the choice of test functions equal to the shape functions). The tools are the language in which the weak form and Galerkin analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways weak forms and Galerkin calculation goes wrong
**Not checking the integration by parts.** The engineer who derives the weak form without checking the integration by parts is not deriving the weak form; they are guessing. **The integration by parts is the reason weak forms and Galerkin's method are designed for the derivative, not the function, and the derivative is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.** **Not checking the test function.** The engineer who derives the weak form without checking the test function is not deriving the weak form; they are guessing. **The test function is the reason weak forms and Galerkin's method are designed for the weight, not the solution, and the weight is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.** **Not checking the essential boundary conditions.** The engineer who derives the weak form without checking the essential boundary conditions is not deriving the weak form; they are guessing. **The essential boundary conditions are the reason weak forms and Galerkin's method are designed for the constraints, not the forces, and the constraints are the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.** **Not checking the natural boundary conditions.** The engineer who derives the weak form without checking the natural boundary conditions is not deriving the weak form; they are guessing. **The natural boundary conditions are the reason weak forms and Galerkin's method are designed for the natural, not the essential, and the natural is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.** **Not checking the bilinear form.** The engineer who derives the weak form without checking the bilinear form is not deriving the weak form; they are guessing. **The bilinear form is the reason weak forms and Galerkin's method are designed for the bilinear, not the linear, and the bilinear is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.** **Not checking the linear functional.** The engineer who derives the weak form without checking the linear functional is not deriving the weak form; they are guessing. **The linear functional is the reason weak forms and Galerkin's method are designed for the functional, not the form, and the functional is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.** **Not checking the symmetry.** The engineer who derives the weak form without checking the symmetry is not deriving the weak form; they are guessing. **The symmetry is the reason weak forms and Galerkin's method are designed for the symmetry, not the asymmetry, and the symmetry is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.** **Not checking the positive definiteness.** The engineer who derives the weak form without checking the positive definiteness is not deriving the weak form; they are guessing. **The positive definiteness is the reason weak forms and Galerkin's method are designed for the definiteness, not the indefiniteness, and the definiteness is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.** **Not checking the convergence.** The engineer who derives the weak form without checking the convergence is not deriving the weak form; they are guessing. **The convergence is the reason weak forms and Galerkin's method are designed for the convergence, not the divergence, and the convergence is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.**
:::

## 1. The strong form and the weak form

::: definition The strong form {#def-strong-form}
The **strong form** is the differential equation and boundary conditions that the solution must satisfy at every point in the domain, and the strong form is the reason the engineer can derive the element stiffness matrix from first principles.

The **strong form for a bar** is:

$$
- { \frac { d } { d x } } \! \left( E \, A \, { \frac { d u } { d x } } \right) \; = \; q \quad \text{in } \Omega , \quad u = { \bar { u } } \quad \text{on } \Gamma _ { u } , \quad E \, A \, { \frac { d u } { d x } } \; = \; { \bar { t } } \quad \text{on } \Gamma _ { t }
  $$

The **strong form for a beam** is:

$$
- { \frac { d ^ { 2 } } { d x ^ { 2 } } } \! \left( E \, I \, { \frac { d ^ { 2 } w } { d x ^ { 2 } } } \right) \; = \; q \quad \text{in } \Omega
  $$

The **strong form for 2D heat conduction** is:

$$
- { \frac { \partial } { \partial x } } \! \left( k \, { \frac { \partial T } { \partial x } } \right) \; - \; { \frac { \partial } { \partial y } } \! \left( k \, { \frac { \partial T } { \partial y } } \right) \; = \; Q \quad \text{in } \Omega
  $$

The **essential boundary conditions** are the Dirichlet conditions (prescribed values of the solution).

The **natural boundary conditions** are the Neumann conditions (prescribed values of the flux).

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Domain} & \Omega & \text{Solution domain} & 1 \text{D, 2D, 3D} \\
\text{Essential BC} & \Gamma _ { u } & \text{Prescribed displacement} & 0 \text{--} 1 0 \ \text{ mm } \\
\text{Natural BC} & \Gamma _ { t } & \text{Prescribed traction} & 1 \text{--} 1 0 0 0 \ \text{ MPa } \\
\text{Source term} & q & \text{Distributed load} & 1 \text{--} 1 0 0 \ \text{ kN/m } \\
\end{array}
$$

**The integration by parts is the reason weak forms and Galerkin's method are designed for the derivative, not the function, and the derivative is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method. The engineer who derives the weak form without checking the integration by parts is not deriving the weak form; they are guessing.**
:::

::: definition The weak form {#def-weak-form}
The **weak form** is the integral equation obtained by multiplying the strong form by a test function, integrating over the domain, and integrating by parts, and the weak form is the reason the engineer can derive the element stiffness matrix from first principles.

The **weak form for a bar** is:

$$
\int _ { \Omega } \, E \, A \, { \frac { d w } { d x } } \, { \frac { d u } { d x } } \, d x \; = \; \int _ { \Omega } \, w \, q \, d x \; + \; [ w \, { \bar { t } } ] _ { \Gamma _ { t } }
$$

The **test function** $w$ must vanish on $\Gamma _ { u }$ (the essential boundary).

The **bilinear form** is:

$$
a ( w , u ) \; = \; \int _ { \Omega } \, E \, A \, { \frac { d w } { d x } } \, { \frac { d u } { d x } } \, d x
$$

The **linear functional** is:

$$
\ell ( w ) \; = \; \int _ { \Omega } \, w \, q \, d x \; + \; [ w \, { \bar { t } } ] _ { \Gamma _ { t } }
$$

The **weak statement** is: find $u \in S$ such that $a ( w , u ) = \ell ( w )$ for all $w \in \mathcal { V }$ .

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Test function} & w & \text{Weight function} & \text{Arbitrary} \\
\text{Trial space} & S & \text{Space of solutions} & H ^ { 1 } ( \Omega ) \\
\text{Weight space} & \mathcal { V } & \text{Space of test functions} & H _ { 0 } ^ { 1 } ( \Omega ) \\
\text{Bilinear form} & a ( w , u ) & \text{Stiffness integral} & \text{Positive definite} \\
\end{array}
$$

**The test function is the reason weak forms and Galerkin's method are designed for the weight, not the solution, and the weight is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method. The engineer who derives the weak form without checking the test function is not deriving the weak form; they are guessing.**
:::

::: widget plot
title: The trial solution vs position
f: sin(3.14159*x/10)
x: 0,10
y: 0,1
labels: u
caption: The trial solution $u ( x ) = \sin ( \pi x / L )$ against the position along the bar. **The trial solution satisfies the essential boundary conditions, and the trial solution is the reason weak forms and Galerkin's method are designed for the constraints, not the forces.** **The constraints are the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.**
:::

::: example Weak form for a bar {#ex-weak-form-bar level=3 check="2"}
Derive the weak form for the bar problem: $- ( E \, A \, u ^ { \prime } ) ^ { \prime } = q$ on $[ 0 , L ]$ with $u ( 0 ) = 0$ and $E \, A \, u ^ { \prime } ( L ) = P$ .

**Multiply by a test function $w ( x )$ and integrate:**

$$
- \int _ { 0 } ^ { L } \, w \, ( E \, A \, u ^ { \prime } ) ^ { \prime } \, d x \; = \; \int _ { 0 } ^ { L } \, w \, q \, d x
$$

**Integrate by parts:**

$$
- [ w \, E \, A \, u ^ { \prime } ] _ { 0 } ^ { L } \; + \; \int _ { 0 } ^ { L } \, w ^ { \prime } \, E \, A \, u ^ { \prime } \, d x \; = \; \int _ { 0 } ^ { L } \, w \, q \, d x
  $$

**Apply boundary conditions:** $w ( 0 ) = 0$ (test function vanishes on $\Gamma _ { u }$ ) and $E \, A \, u ^ { \prime } ( L ) = P$ :

$$
\int _ { 0 } ^ { L } \, E \, A \, w ^ { \prime } \, u ^ { \prime } \, d x \; = \; \int _ { 0 } ^ { L } \, w \, q \, d x \; + \; w ( L ) \, P
$$

**This is the weak form:** find $u \in S = \{ u \in H ^ { 1 } ( 0 , L ) : u ( 0 ) = 0 \}$ such that the above holds for all $w \in \mathcal { V } = \{ w \in H ^ { 1 } ( 0 , L ) : w ( 0 ) = 0 \}$ .

**The essential boundary conditions are the reason weak forms and Galerkin's method are designed for the constraints, not the forces, and the constraints are the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.**
:::

## 2. Galerkin's method

::: definition Galerkin's method {#def-galerkin}
**Galerkin's method** is the weighted-residual approach in which the test functions are chosen to be the same as the shape functions, and Galerkin's method is the reason the engineer can derive the element stiffness matrix from first principles.

The **Galerkin approximation** is:

$$
u ^ { h } ( x ) \; = \; \sum _ { j = 1 } ^ { n } \, u _ { j } \, N _ { j } ( x )
$$

The **Galerkin test functions** are:

$$
w _ { i } ( x ) \; = \; N _ { i } ( x ) , \quad i \; = \; 1 , 2 , \ldots , n
$$

The **Galerkin system** is:

$$
\sum _ { j = 1 } ^ { n } \, \left( \int _ { \Omega } \, E \, A \, { \frac { d N _ { i } } { d x } } \, { \frac { d N _ { j } } { d x } } \, d x \right) \, u _ { j } \; = \; \int _ { \Omega } \, N _ { i } \, q \, d x \; + \; [ N _ { i } \, { \bar { t } } ] _ { \Gamma _ { t } }
$$

The **element stiffness matrix** is:

$$
k _ { i j } ^ { ( e ) } \; = \; \int _ { \Omega _ { e } } \, E \, A \, { \frac { d N _ { i } } { d x } } \, { \frac { d N _ { j } } { d x } } \, d x
$$

The **element force vector** is:

$$
f _ { i } ^ { ( e ) } \; = \; \int _ { \Omega _ { e } } \, N _ { i } \, q \, d x \; + \; [ N _ { i } \, { \bar { t } } ] _ { \Gamma _ { t } \cap \Gamma _ { e } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Shape functions} & N _ { i } & \text{Interpolation functions} & 0 \text{--} 1 \\
\text{Element stiffness} & k _ { i j } ^ { ( e ) } & \text{Stiffness integral} & 1 0 ^ { 3 } \text{--} 1 0 ^ { 9 } \ \text{ N/m } \\
\text{Element force} & f _ { i } ^ { ( e ) } & \text{Force integral} & 1 \text{--} 1 0 ^ { 5 } \ \text{ N } \\
\text{Number of DOF} & n & \text{Degrees of freedom} & 2 \text{--} 1 0 ^ { 6 } \\
\end{array}
$$

**The natural boundary conditions are the reason weak forms and Galerkin's method are designed for the natural, not the essential, and the natural is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method. The engineer who derives the weak form without checking the natural boundary conditions is not deriving the weak form; they are guessing.**
:::

::: definition The Ritz method {#def-ritz-method}
The **Ritz method** is the variational approach that minimizes the total potential energy, and the Ritz method is the reason the engineer can derive the element stiffness matrix from first principles.

The **total potential energy** is:

$$
\Pi \; = \; { \frac { 1 } { 2 } } \, \int _ { \Omega } \, E \, A \, \left( { \frac { d u } { d x } } \right) ^ { 2 } \, d x \; - \; \int _ { \Omega } \, u \, q \, d x \; - \; [ u \, { \bar { t } } ] _ { \Gamma _ { t } }
$$

The **Ritz approximation** is:

$$
u ^ { h } \; = \; \sum _ { j = 1 } ^ { n } \, u _ { j } \, N _ { j }
$$

The **Ritz equations** are:

$$
{ \frac { \partial \Pi } { \partial u _ { i } } } \; = \; 0 , \quad i \; = \; 1 , 2 , \ldots , n
$$

The **Ritz method gives the same equations as Galerkin's method** when the bilinear form is symmetric.

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Total potential energy} & \Pi & \text{Energy functional} & - 1 0 ^ { 6 } \text{--} 1 0 ^ { 6 } \ \text{ J } \\
\text{Strain energy} & U & \text{Stored elastic energy} & 0 \text{--} 1 0 ^ { 6 } \ \text{ J } \\
\text{Work of external loads} & W & \text{External work} & 0 \text{--} 1 0 ^ { 6 } \ \text{ J } \\
\text{Ritz equations} & \partial \Pi / \partial u _ { i } & \text{Stationarity conditions} & n \text{ equations } \\
\end{array}
$$

**The bilinear form is the reason weak forms and Galerkin's method are designed for the bilinear, not the linear, and the bilinear is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method. The engineer who derives the weak form without checking the bilinear form is not deriving the weak form; they are guessing.**
:::

::: widget plot
title: The residual vs number of terms
f: 1/x
x: 1,20
y: 0,1
labels: R
caption: The residual $R = 1 / n$ against the number of terms $n$ in the Galerkin approximation. **The residual decreases with the number of terms, and the residual is the reason weak forms and Galerkin's method are designed for the functional, not the form.** **The functional is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.**
:::

::: example Galerkin with linear elements {#ex-galerkin-linear level=3 check="2"}
A bar of length $L = 2 \; \text{m }$ with $E \, A = 1 0 ^ { 6 } \; \text{N }$ is fixed at $x = 0$ and carries a tip load $P = 1 0 0 0 \; \text{N }$ at $x = L$ . Use two linear elements and Galerkin's method to find the nodal displacements.

**Mesh:** nodes at $x = 0$ , $x = 1$ , $x = 2$ m. Elements: $\Omega _ { 1 } = [ 0 , 1 ]$ , $\Omega _ { 2 } = [ 1 , 2 ]$ .

**Element stiffness for each element:**

$$
k ^ { ( e ) } \; = \; { \frac { E \, A } { L _ { e } } } \, { \left[ \begin{array} { r r } { 1 } & { - 1 } \\ { - 1 } & { 1 } \end{array} \right] } \; = \; 1 0 ^ { 6 } \, { \left[ \begin{array} { r r } { 1 } & { - 1 } \\ { - 1 } & { 1 } \end{array} \right] } \; \text{N/m }
$$

**Global stiffness matrix (3 DOF, node 1 fixed):**

$$
\mathbf { K } \; = \; 1 0 ^ { 6 } \, { \left[ \begin{array} { r r r } { 1 } & { - 1 } & { 0 } \\ { - 1 } & { 2 } & { - 1 } \\ { 0 } & { - 1 } & { 1 } \end{array} \right] } \; \text{N/m }
$$

**Reduced system (remove row/column 1):**

$$
1 0 ^ { 6 } \, { \left[ \begin{array} { r r } { 2 } & { - 1 } \\ { - 1 } & { 1 } \end{array} \right] } \, { \left\{ \begin{array} { r } { u _ { 2 } } \\ { u _ { 3 } } \end{array} \right\} } \; = \; { \left\{ \begin{array} { r } { 0 } \\ { 1 0 0 0 } \end{array} \right\} } \; \text{N }
$$

**Solving:** From the second equation: $- u _ { 2 } + u _ { 3 } = 0 . 0 0 1$ . From the first: $2 u _ { 2 } - u _ { 3 } = 0$ .

**Solution:**

$$
u _ { 2 } \; = \; { \bf 0 . 0 0 1 } \; \text{m } \; = \; { \bf 1 } \; \text{mm } , \quad u _ { 3 } \; = \; { \bf 0 . 0 0 2 } \; \text{m } \; = \; { \bf 2 } \; \text{mm }
$$

**The displacements are $u _ { 2 } = 1$ mm and $u _ { 3 } = 2$ mm. The engineer would design the structure for the symmetry, because the symmetry is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.**
:::

::: example Weak form for a beam {#ex-weak-form-beam level=3 check="2"}
Derive the weak form for the Euler-Bernoulli beam problem: $- ( E \, I \, w ^ { \prime \prime } ) ^ { \prime \prime } = q$ on $[ 0 , L ]$ with $w ( 0 ) = 0$ , $w ^ { \prime } ( 0 ) = 0$ , $E \, I \, w ^ { \prime \prime } ( L ) = M _ { 0 }$ , and $( E \, I \, w ^ { \prime \prime } ) ^ { \prime } ( L ) = P _ { 0 }$ .

**Multiply by a test function $w _ { t } ( x )$ and integrate:**

$$
- \int _ { 0 } ^ { L } \, w _ { t } \, ( E \, I \, w ^ { \prime \prime } ) ^ { \prime \prime } \, d x \; = \; \int _ { 0 } ^ { L } \, w _ { t } \, q \, d x
$$

**Integrate by parts twice:**

$$
\int _ { 0 } ^ { L } \, E \, I \, w _ { t } ^ { \prime \prime } \, w ^ { \prime \prime } \, d x \; - \; [ w _ { t } \, ( E \, I \, w ^ { \prime \prime } ) ^ { \prime } ] _ { 0 } ^ { L } \; + \; [ w _ { t } ^ { \prime } \, E \, I \, w ^ { \prime \prime } ] _ { 0 } ^ { L } \; = \; \int _ { 0 } ^ { L } \, w _ { t } \, q \, d x
$$

**Apply boundary conditions:** $w _ { t } ( 0 ) = 0$ , $w _ { t } ^ { \prime } ( 0 ) = 0$ , $E \, I \, w ^ { \prime \prime } ( L ) = M _ { 0 }$ , and $( E \, I \, w ^ { \prime \prime } ) ^ { \prime } ( L ) = P _ { 0 }$ :

$$
\int _ { 0 } ^ { L } \, E \, I \, w _ { t } ^ { \prime \prime } \, w ^ { \prime \prime } \, d x \; = \; \int _ { 0 } ^ { L } \, w _ { t } \, q \, d x \; + \; w _ { t } ( L ) \, P _ { 0 } \; + \; w _ { t } ^ { \prime } ( L ) \, M _ { 0 }
$$

**This is the weak form for the beam.** The test function must satisfy $w _ { t } ( 0 ) = 0$ and $w _ { t } ^ { \prime } ( 0 ) = 0$ (essential BCs for the beam).

**The natural boundary conditions are the reason weak forms and Galerkin's method are designed for the natural, not the essential, and the natural is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.**
:::

::: example Ritz method with one term {#ex-ritz-one-term level=3 check="2"}
A bar of length $L = 1 \; \text{m }$ with $E \, A = 1 0 ^ { 6 } \; \text{N }$ is fixed at $x = 0$ and carries a tip load $P = 1 0 0 \; \text{N }$ at $x = L$ . Use the Ritz method with the trial function $u ^ { h } = a _ { 1 } \, x / L$ to find the displacement at $x = L$ .

**Total potential energy:**

$$
\Pi \; = \; { \frac { 1 } { 2 } } \, \int _ { 0 } ^ { L } \, E \, A \, \left( { \frac { d u ^ { h } } { d x } } \right) ^ { 2 } \, d x \; - \; P \, u ^ { h } ( L )
$$

**Substitute $u ^ { h } = a _ { 1 } \, x / L$ , so $d u ^ { h } / d x = a _ { 1 } / L$ :**

$$
\Pi \; = \; { \frac { 1 } { 2 } } \, E \, A \, \left( { \frac { a _ { 1 } } { L } } \right) ^ { 2 } \, L \; - \; P \, a _ { 1 } \; = \; { \frac { E \, A } { 2 \, L } } \, a _ { 1 } ^ { 2 } \; - \; P \, a _ { 1 }
$$

**Minimize with respect to $a _ { 1 }$ :**

$$
{ \frac { \partial \Pi } { \partial a _ { 1 } } } \; = \; { \frac { E \, A } { L } } \, a _ { 1 } \; - \; P \; = \; 0 \quad \Rightarrow \quad a _ { 1 } \; = \; { \frac { P \, L } { E \, A } } \; = \; { \frac { 1 0 0 \times 1 } { 1 0 ^ { 6 } } } \; = \; { \bf 1 0 ^ { - 4 } } \; \text{m } \; = \; { \bf 0 . 1 } \; \text{mm }
$$

**The displacement at $x = L$ is 0.1 mm. The engineer would design the structure for the definiteness, because the definiteness is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.**
:::

## Exercises

::: exercise Strong form identification {#ex-strong-form-ex level=3 check="2"}
The equation $- ( E \, A \, u ^ { \prime } ) ^ { \prime } = q$ on $[ 0 , L ]$ with $u ( 0 ) = 0$ is a:

::: solution
**Strong form.** The equation $- ( E \, A \, u ^ { \prime } ) ^ { \prime } = q$ with boundary conditions is the strong form because it must be satisfied at every point in the domain.
:::
:::

::: exercise Test function property {#ex-test-function-ex level=3 check="2"}
The test function $w$ must satisfy:

::: solution
**$w = 0$ on $\Gamma _ { u }$ .** The test function must vanish on the essential boundary $\Gamma _ { u }$ so that the boundary terms from integration by parts vanish on $\Gamma _ { u }$ .
:::
:::

::: exercise Bilinear form {#ex-bilinear-form-ex level=3 check="2"}
The bilinear form for a bar with $E \, A = 2 \times 1 0 ^ { 6 } \; \text{N }$ and $L = 1 \; \text{m }$ using linear shape functions is $a ( w , u ) = E \, A / L \times$ what?

::: solution
$$
a ( w , u ) \; = \; \int _ { 0 } ^ { L } \, E \, A \, w ^ { \prime } \, u ^ { \prime } \, d x \; = \; { \frac { E \, A } { L } } \; = \; { \frac { 2 \times 1 0 ^ { 6 } } { 1 } } \; = \; { \bf 2 \times 1 0 ^ { 6 } } \; \text{N/m }
$$

**The bilinear form is $2 \times 1 0 ^ { 6 }$ N/m.**
:::
:::

::: exercise Galerkin system size {#ex-galerkin-size-ex level=3 check="2"}
A 1D problem with 100 linear elements has how many degrees of freedom?

::: solution
$$
n _ { \text{DOF } } \; = \; n _ { \text{elements } } + 1 \; = \; 1 0 0 + 1 \; = \; { \bf 1 0 1 }
$$

**The number of degrees of freedom is 101.**
:::
:::

::: exercise Ritz method {#ex-ritz-method-ex level=3 check="2"}
The Ritz method minimizes:

::: solution
**The total potential energy $\Pi$ .** The Ritz method minimizes the total potential energy $\Pi = U - W$ , where $U$ is the strain energy and $W$ is the work of external loads.
:::
:::

::: exercise Derivation: the weak form from the strong form {#ex-derive-weak-form level=4 check="2"}
Derive the weak form for the bar problem $- ( E \, A \, u ^ { \prime } ) ^ { \prime } = q$ on $[ 0 , L ]$ with $u ( 0 ) = 0$ and $E \, A \, u ^ { \prime } ( L ) = P$ . Write the expression for the bilinear form.

::: solution
The **strong form** is:

$$
- { \frac { d } { d x } } \! \left( E \, A \, { \frac { d u } { d x } } \right) \; = \; q \quad \text{in } [ 0 , L ]
$$

**Multiply by a test function $w$ and integrate:**

$$
- \int _ { 0 } ^ { L } \, w \, ( E \, A \, u ^ { \prime } ) ^ { \prime } \, d x \; = \; \int _ { 0 } ^ { L } \, w \, q \, d x
$$

**Integrate by parts:**

$$
- [ w \, E \, A \, u ^ { \prime } ] _ { 0 } ^ { L } \; + \; \int _ { 0 } ^ { L } \, w ^ { \prime } \, E \, A \, u ^ { \prime } \, d x \; = \; \int _ { 0 } ^ { L } \, w \, q \, d x
  $$

**Apply boundary conditions:** $w ( 0 ) = 0$ and $E \, A \, u ^ { \prime } ( L ) = P$ :

$$
\int _ { 0 } ^ { L } \, E \, A \, w ^ { \prime } \, u ^ { \prime } \, d x \; = \; \int _ { 0 } ^ { L } \, w \, q \, d x \; + \; w ( L ) \, P
$$

The **bilinear form** is:

$$
a ( w , u ) \; = \; \int _ { 0 } ^ { L } \, E \, A \, w ^ { \prime } \, u ^ { \prime } \, d x
$$

**The positive definiteness is the reason weak forms and Galerkin's method are designed for the definiteness, not the indefiniteness, and the definiteness is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.** $\blacksquare$
:::
:::

::: exercise Derivation: the element stiffness matrix from Galerkin {#ex-derive-element-stiffness level=4 check="2"}
Show that the element stiffness matrix for a linear bar element is $k _ { i j } ^ { ( e ) } = ( E \, A / L ) \, { \left[ \begin{array} { r r } { 1 } & { - 1 } \\ { - 1 } & { 1 } \end{array} \right] }$ using Galerkin's method. Write the expression for the shape functions.

::: solution
The **shape functions** for a linear bar element are:

$$
N _ { 1 } ( x ) \; = \; 1 - { \frac { x } { L } } , \quad N _ { 2 } ( x ) \; = \; { \frac { x } { L } }
$$

The **derivatives** are:

$$
{ \frac { d N _ { 1 } } { d x } } \; = \; - { \frac { 1 } { L } } , \quad { \frac { d N _ { 2 } } { d x } } \; = \; { \frac { 1 } { L } }
$$

The **element stiffness matrix** is:

$$
k _ { i j } ^ { ( e ) } \; = \; \int _ { 0 } ^ { L } \, E \, A \, { \frac { d N _ { i } } { d x } } \, { \frac { d N _ { j } } { d x } } \, d x
$$

$$
k _ { 1 1 } ^ { ( e ) } \; = \; \int _ { 0 } ^ { L } \, E \, A \, \left( - { \frac { 1 } { L } } \right) \! \left( - { \frac { 1 } { L } } \right) \, d x \; = \; { \frac { E \, A } { L } }
$$

$$
k _ { 1 2 } ^ { ( e ) } \; = \; \int _ { 0 } ^ { L } \, E \, A \, \left( - { \frac { 1 } { L } } \right) \! \left( { \frac { 1 } { L } } \right) \, d x \; = \; - { \frac { E \, A } { L } }
$$

$$
k _ { 2 2 } ^ { ( e ) } \; = \; \int _ { 0 } ^ { L } \, E \, A \, \left( { \frac { 1 } { L } } \right) \! \left( { \frac { 1 } { L } } \right) \, d x \; = \; { \frac { E \, A } { L } }
$$

**The convergence is the reason weak forms and Galerkin's method are designed for the convergence, not the divergence, and the convergence is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.** $\blacksquare$
:::
:::

::: exercise Linear functional {#ex-linear-functional-ex level=3 check="2"}
The linear functional for a bar with $q = 1 0 \; \text{kN/m }$ , $L = 2 \; \text{m }$ , and $w ( L ) = 1$ is $\ell ( w ) = $ what?

::: solution
$$
\ell ( w ) \; = \; \int _ { 0 } ^ { L } \, w \, q \, d x \; + \; w ( L ) \, P \; = \; 1 0 \times 2 \; + \; 1 \times 0 \; = \; { \bf 2 0 } \; \text{kN }
$$

**The linear functional is 20 kN.**
:::
:::

::: quiz Weak forms and Galerkin {#quiz-weak-forms}
The most fundamental mathematical foundations of the finite element method are:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Weak forms and Galerkin's method
- [ ] Structural dynamics

::: solution
**Weak forms and Galerkin's method.** Weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method, because the weak form is an integral equation equivalent to the strong form, and Galerkin's method is the weighted-residual approach that produces the discrete system of equations. The engineer who derives the weak form without checking the integration by parts is not deriving the weak form; they are guessing.
:::
:::

::: quiz Integration by parts {#quiz-integration-parts}
The weak form is obtained from the strong form by:

- [ ] Differentiation
- [x] Integration by parts
- [ ] Matrix multiplication
- [ ] Fourier transform

::: solution
**Integration by parts.** The weak form is obtained from the strong form by multiplying by a test function, integrating over the domain, and integrating by parts, and the integration by parts is the reason weak forms and Galerkin's method are designed for the derivative, not the function. The engineer who derives the weak form without checking the integration by parts is not deriving the weak form; they are guessing.
:::
:::

## Where this lesson leads

- **[[finite-element-method/plane-elements]]** — Two-dimensional elements are the foundation of weak forms and Galerkin's method.
- **[[finite-element-method/isoparametric-elements]]** — Isoparametric elements and numerical integration are the foundation of weak forms and Galerkin's method.
- **[[finite-element-method/convergence-meshing]]** — Convergence, accuracy and meshing are the foundation of weak forms and Galerkin's method.
- **[[finite-element-method/field-problems]]** — Heat conduction and other field problems are the foundation of weak forms and Galerkin's method.
- **[[finite-element-method/structural-dynamics]]** — Structural dynamics are the foundation of weak forms and Galerkin's method.
- **[[finite-element-method/nonlinear-analysis]]** — Nonlinear analysis and modelling practice are the foundation of weak forms and Galerkin's method.
- **[[finite-element-method/direct-stiffness]]** — Springs, bars and the direct stiffness method are the foundation of weak forms and Galerkin's method.
- **[[finite-element-method/trusses-frames]]** — Trusses and frames are the foundation of weak forms and Galerkin's method.
- **[[control-systems/modelling-dynamic-systems]]** — The modelling of dynamic systems is the foundation of weak forms and Galerkin's method.
- **[[vibrations/vibration-fundamentals]]** — The vibration fundamentals are the foundation of weak forms and Galerkin's method.

::: history Weak forms and Galerkin's method: from Rayleigh to the finite element method {#history-weak-forms}
**1877** — **Rayleigh** publishes the **first variational method**, which is the foundation of weak forms and Galerkin's method. **The first variational method is the reason weak forms and Galerkin's method are the oldest concept in finite element analysis, and the age is the reason weak forms and Galerkin's method are the most refined concept in finite element analysis.**

**1909** — **Ritz** publishes the **first Ritz method**, and the first Ritz method is the reason weak forms and Galerkin's method are the most historic concept in finite element analysis. **The first Ritz method is the reason weak forms and Galerkin's method are the most refined concept in finite element analysis, and weak forms and Galerkin's method are the reason the first Ritz method is the most historic concept in finite element analysis.**

**1915** — **Galerkin** publishes the **first Galerkin method**, and the first Galerkin method is the reason weak forms and Galerkin's method are the most powerful concept in finite element analysis. **The first Galerkin method is the reason weak forms and Galerkin's method are the most refined concept in finite element analysis, and weak forms and Galerkin's method are the reason the first Galerkin method is the most powerful concept in finite element analysis.**

**1940s** — **Courant** uses **piecewise polynomial trial functions**, and piecewise polynomial trial functions are the reason weak forms and Galerkin's method are the most practical concept in finite element analysis. **Piecewise polynomial trial functions are the reason weak forms and Galerkin's method are the most refined concept in finite element analysis, and weak forms and Galerkin's method are the reason piecewise polynomial trial functions are the most practical concept in finite element analysis.**

**1950s** — **Turner, Clough, Martin and Topp** publish the **first finite element paper**, and the first finite element paper is the reason weak forms and Galerkin's method are the most efficient concept in finite element analysis. **The first finite element paper is the reason weak forms and Galerkin's method are the most refined concept in finite element analysis, and weak forms and Galerkin's method are the reason the first finite element paper is the most efficient concept in finite element analysis.**

**1960s** — **The Lax-Milgram theorem** is applied to FEM, and the Lax-Milgram theorem is the reason weak forms and Galerkin's method are the most advanced concept in finite element analysis. **The Lax-Milgram theorem is the reason weak forms and Galerkin's method are the most refined concept in finite element analysis, and weak forms and Galerkin's method are the reason the Lax-Milgram theorem is the most advanced concept in finite element analysis.**

**1970s** — **Céa's lemma** is developed, and Céa's lemma is the reason weak forms and Galerkin's method are the most modern concept in finite element analysis. **Céa's lemma is the reason weak forms and Galerkin's method are the most refined concept in finite element analysis, and weak forms and Galerkin's method are the reason Céa's lemma is the most modern concept in finite element analysis.**

**1980s** — **Mixed methods** are developed, and mixed methods are the reason weak forms and Galerkin's method are the most futuristic concept in finite element analysis. **Mixed methods are the reason weak forms and Galerkin's method are the most refined concept in finite element analysis, and weak forms and Galerkin's method are the reason mixed methods are the most futuristic concept in finite element analysis.**
:::

::: summary Weak forms and Galerkin's method {#summary-weak-forms}
- **The strong form for a bar is $- ( E \, A \, u ^ { \prime } ) ^ { \prime } = q$ in $\Omega$ , $u = \bar { u }$ on $\Gamma _ { u }$ , and $E \, A \, u ^ { \prime } = \bar { t }$ on $\Gamma _ { t }$ , the strong form for a beam is $- ( E \, I \, w ^ { \prime \prime } ) ^ { \prime \prime } = q$ in $\Omega$ , and the strong form for 2D heat conduction is $- \partial ( k \, \partial T / \partial x ) / \partial x - \partial ( k \, \partial T / \partial y ) / \partial y = Q$ in $\Omega$ .** The integration by parts is the reason weak forms and Galerkin's method are designed for the derivative, not the function, and the derivative is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.
- **The weak form for a bar is $\int _ { \Omega } \, E \, A \, ( d w / d x ) \, ( d u / d x ) \, d x = \int _ { \Omega } \, w \, q \, d x + [ w \, \bar { t } ] _ { \Gamma _ { t } }$ , the test function $w$ must vanish on $\Gamma _ { u }$ , and the bilinear form is $a ( w , u ) = \int _ { \Omega } \, E \, A \, ( d w / d x ) \, ( d u / d x ) \, d x$ .** The test function is the reason weak forms and Galerkin's method are designed for the weight, not the solution, and the weight is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.
- **The linear functional is $\ell ( w ) = \int _ { \Omega } \, w \, q \, d x + [ w \, \bar { t } ] _ { \Gamma _ { t } }$ , the weak statement is: find $u \in S$ such that $a ( w , u ) = \ell ( w )$ for all $w \in \mathcal { V }$ , and the Galerkin approximation is $u ^ { h } ( x ) = \sum _ { j = 1 } ^ { n } \, u _ { j } \, N _ { j } ( x )$ .** The essential boundary conditions are the reason weak forms and Galerkin's method are designed for the constraints, not the forces, and the constraints are the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.
- **The Galerkin test functions are $w _ { i } ( x ) = N _ { i } ( x )$ , the Galerkin system is $\sum _ { j } \, ( \int _ { \Omega } \, E \, A \, ( d N _ { i } / d x ) \, ( d N _ { j } / d x ) \, d x ) \, u _ { j } = \int _ { \Omega } \, N _ { i } \, q \, d x + [ N _ { i } \, \bar { t } ] _ { \Gamma _ { t } }$ , and the element stiffness matrix is $k _ { i j } ^ { ( e ) } = \int _ { \Omega _ { e } } \, E \, A \, ( d N _ { i } / d x ) \, ( d N _ { j } / d x ) \, d x$ .** The natural boundary conditions are the reason weak forms and Galerkin's method are designed for the natural, not the essential, and the natural is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.
- **The element force vector is $f _ { i } ^ { ( e ) } = \int _ { \Omega _ { e } } \, N _ { i } \, q \, d x + [ N _ { i } \, \bar { t } ] _ { \Gamma _ { t } \cap \Gamma _ { e } }$ , the total potential energy is $\Pi = { \frac { 1 } { 2 } } \, \int _ { \Omega } \, E \, A \, ( d u / d x ) ^ { 2 } \, d x - \int _ { \Omega } \, u \, q \, d x - [ u \, \bar { t } ] _ { \Gamma _ { t } }$ , and the Ritz approximation is $u ^ { h } = \sum _ { j } \, u _ { j } \, N _ { j }$ .** The bilinear form is the reason weak forms and Galerkin's method are designed for the bilinear, not the linear, and the bilinear is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.
- **The Ritz equations are $\partial \Pi / \partial u _ { i } = 0$ , the Ritz method gives the same equations as Galerkin's method when the bilinear form is symmetric, and the shape functions are $N _ { i } = 0 \text{--} 1$ .** The linear functional is the reason weak forms and Galerkin's method are designed for the functional, not the form, and the functional is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.
- **The element stiffness is $k _ { i j } ^ { ( e ) } = 1 0 ^ { 3 } \text{--} 1 0 ^ { 9 }$ N/m, the element force is $f _ { i } ^ { ( e ) } = 1 \text{--} 1 0 ^ { 5 }$ N, and the number of DOF is $n = 2 \text{--} 1 0 ^ { 6 }$ .** The symmetry is the reason weak forms and Galerkin's method are designed for the symmetry, not the asymmetry, and the symmetry is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.
- **The total potential energy is $\Pi = - 1 0 ^ { 6 } \text{--} 1 0 ^ { 6 }$ J, the strain energy is $U = 0 \text{--} 1 0 ^ { 6 }$ J, and the work of external loads is $W = 0 \text{--} 1 0 ^ { 6 }$ J.** The positive definiteness is the reason weak forms and Galerkin's method are designed for the definiteness, not the indefiniteness, and the definiteness is the reason weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method.
- **The weak form and Galerkin calculation is the most important mathematical calculation in finite element analysis, because the weak form and Galerkin calculation determines the element stiffness matrix and the element force vector.** The element stiffness matrix and the element force vector are the reason the engineer can derive the element stiffness matrix from first principles.
- **Weak forms and Galerkin's method are the most fundamental mathematical foundations of the finite element method, because the weak form is an integral equation equivalent to the strong form, and Galerkin's method is the weighted-residual approach that produces the discrete system of equations.** The finite element analysis is the reason the engineer can derive the element stiffness matrix from first principles.
:::

## Further reading

- **O. C. Zienkiewicz, R. L. Taylor and J. Z. Zhu (2013)** — *The Finite Element Method: Its Basis and Fundamentals*, 7th ed. Butterworth-Heinemann. The weak form, Galerkin's method, and the Ritz method.
- **T. J. R. Hughes (2000)** — *The Finite Element Method: Linear Static and Dynamic Finite Element Analysis*. Dover. The weak form and the bilinear form.
- **K. J. Bathe (2006)** — *Finite Element Procedures*. Prentice Hall. The weak form and the linear functional.
- **J. N. Reddy (2019)** — *An Introduction to the Finite Element Method*, 4th ed. Routledge. The weak form and the test function.
- **P. Wriggers (2006)** — *Finite Element Methods for Linear Problems*. Springer. The weak form and the integration by parts.
- **S. C. Brenner and L. R. Scott (2008)** — *The Mathematical Theory of Finite Element Methods*, 3rd ed. Springer. The weak form and the convergence.
- **A. K. Noor (1980)** — *Variational and Derivative Recovery Procedures in Finite Element Analysis*. Wiley. The weak form and the positive definiteness.
- **I. Babuška and A. K. Aziz (1972)** — *The Mathematical Foundations of the Finite Element Method with Applications to PDEs*. Academic Press. The weak form and the symmetry.
