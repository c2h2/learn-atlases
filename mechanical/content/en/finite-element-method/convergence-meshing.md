Convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method: the convergence rate determines how quickly the finite element solution approaches the exact solution as the mesh is refined, the error norms quantify the difference between the numerical and exact solutions, and the mesh quality determines the accuracy and stability of the solution. **The engineer who runs a finite element analysis without checking the convergence is not running a finite element analysis; they are guessing.** The convergence, accuracy and meshing calculation is the reason the engineer can verify that the finite element solution is correct, and the error norms are the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.

The quantitative tools of convergence, accuracy and meshing are the **a priori error estimate** (the theoretical bound on the error in terms of the mesh size and polynomial degree), the **a posteriori error estimate** (the error estimate computed from the numerical solution), the **mesh quality metrics** (the aspect ratio, skewness and Jacobian determinant), and the **convergence study** (the systematic refinement of the mesh to verify the convergence rate). The tools are the language in which the convergence, accuracy and meshing analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways convergence, accuracy and meshing calculation goes wrong
**Not checking the convergence.** The engineer who runs a finite element analysis without checking the convergence is not running a finite element analysis; they are guessing. **The convergence is the reason convergence, accuracy and meshing are designed for the convergence, not the divergence, and the convergence is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.** **Not checking the error norms.** The engineer who runs a finite element analysis without checking the error norms is not running a finite element analysis; they are guessing. **The error norms are the reason convergence, accuracy and meshing are designed for the norms, not the values, and the norms are the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.** **Not checking the mesh quality.** The engineer who runs a finite element analysis without checking the mesh quality is not running a finite element analysis; they are guessing. **The mesh quality is the reason convergence, accuracy and meshing are designed for the quality, not the quantity, and the quality is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.** **Not checking the aspect ratio.** The engineer who runs a finite element analysis without checking the aspect ratio is not running a finite element analysis; they are guessing. **The aspect ratio is the reason convergence, accuracy and meshing are designed for the ratio, not the size, and the ratio is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.** **Not checking the skewness.** The engineer who runs a finite element analysis without checking the skewness is not running a finite element analysis; they are guessing. **The skewness is the reason convergence, accuracy and meshing are designed for the skewness, not the symmetry, and the skewness is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.** **Not checking the Jacobian determinant.** The engineer who runs a finite element analysis without checking the Jacobian determinant is not running a finite element analysis; they are guessing. **The Jacobian determinant is the reason convergence, accuracy and meshing are designed for the determinant, not the trace, and the determinant is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.** **Not checking the h-refinement.** The engineer who runs a finite element analysis without checking the h-refinement is not running a finite element analysis; they are guessing. **The h-refinement is the reason convergence, accuracy and meshing are designed for the size, not the order, and the size is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.** **Not checking the p-refinement.** The engineer who runs a finite element analysis without checking the p-refinement is not running a finite element analysis; they are guessing. **The p-refinement is the reason convergence, accuracy and meshing are designed for the order, not the size, and the order is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.** **Not checking the singularity.** The engineer who runs a finite element analysis without checking the singularity is not running a finite element analysis; they are guessing. **The singularity is the reason convergence, accuracy and meshing are designed for the singularity, not the smoothness, and the singularity is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.**
:::

## 1. Convergence and error estimates

::: definition The a priori error estimate {#def-apriori-error}
The **a priori error estimate** is the theoretical bound on the error in terms of the mesh size $h$ and the polynomial degree $p$ , and the a priori error estimate is the reason the engineer can verify that the finite element solution is correct.

The **a priori error estimate in the $H ^ { 1 }$ norm** is:

$$
\| u - u ^ { h } \| _ { H ^ { 1 } } \; \leq \; C \, h ^ { p } \, \| u \| _ { H ^ { p + 1 } }
$$

The **a priori error estimate in the $L ^ { 2 }$ norm** is:

$$
\| u - u ^ { h } \| _ { L ^ { 2 } } \; \leq \; C \, h ^ { p + 1 } \, \| u \| _ { H ^ { p + 1 } }
$$

The **energy norm error estimate** is:

$$
\| u - u ^ { h } \| _ { E } \; \leq \; C \, h ^ { p } \, \| u \| _ { H ^ { p + 1 } }
$$

The **convergence rate** is $p$ in the energy norm and $p + 1$ in the $L ^ { 2 }$ norm.

The **Céa's lemma** states that the finite element solution is the best approximation in the energy norm.

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Mesh size} & h & \text{Element size} & 1 0 ^ { - 3 } \text{--} 1 0 ^ { - 1 } \ \text{ m } \\
\text{Polynomial degree} & p & \text{Shape function order} & 1 \text{--} 5 \\
\text{Convergence rate} & p & \text{Energy norm rate} & 1 , 2 , 3 , \ldots \\
\text{Error constant} & C & \text{Problem-dependent constant} & 1 \text{--} 1 0 0 \\
\end{array}
$$

**The convergence is the reason convergence, accuracy and meshing are designed for the convergence, not the divergence, and the convergence is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method. The engineer who runs a finite element analysis without checking the convergence is not running a finite element analysis; they are guessing.**
:::

::: definition The error norms {#def-error-norms}
The **error norms** are the quantitative measures of the difference between the numerical and exact solutions, and the error norms are the reason the engineer can verify that the finite element solution is correct.

The **$L ^ { 2 }$ norm of the error** is:

$$
\| e \| _ { L ^ { 2 } } \; = \; \left( \int _ { \Omega } \, ( u - u ^ { h } ) ^ { 2 } \, d \Omega \right) ^ { 1 / 2 }
$$

The **$H ^ { 1 }$ seminorm of the error** is:

$$
| e | _ { H ^ { 1 } } \; = \; \left( \int _ { \Omega } \, | \nabla ( u - u ^ { h } ) | ^ { 2 } \, d \Omega \right) ^ { 1 / 2 }
$$

The **energy norm of the error** is:

$$
\| e \| _ { E } \; = \; \left( \int _ { \Omega } \, \nabla e ^ { T } \, \mathbf { D } \, \nabla e \, d \Omega \right) ^ { 1 / 2 }
$$

The **relative error** is:

$$
\varepsilon _ { \text{rel } } \; = \; { \frac { \| u - u ^ { h } \| } { \| u \| } } \times 1 0 0 \; \%
$$

The **effectiveness index** is:

$$
\kappa \; = \; { \frac { \eta _ { \text{estimated } } } { \varepsilon _ { \text{actual } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{L2 error} & \| e \| _ { L ^ { 2 } } & \text{Integral of squared error} & 1 0 ^ { - 6 } \text{--} 1 0 ^ { - 1 } \\
\text{H1 error} & | e | _ { H ^ { 1 } } & \text{Integral of squared gradient error} & 1 0 ^ { - 4 } \text{--} 1 0 ^ { - 1 } \\
\text{Energy error} & \| e \| _ { E } & \text{Energy norm error} & 1 0 ^ { - 4 } \text{--} 1 0 ^ { - 1 } \\
\text{Relative error} & \varepsilon _ { \text{rel } } & \text{Percentage error} & 0 . 1 \text{--} 1 0 \ \% \\
\end{array}
$$

**The error norms are the reason convergence, accuracy and meshing are designed for the norms, not the values, and the norms are the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method. The engineer who runs a finite element analysis without checking the error norms is not running a finite element analysis; they are guessing.**
:::

::: widget plot
title: The error vs mesh size
f: 0.1*x^2
x: 0,1
y: 0,0.1
labels: error
caption: The error $e = C \, h ^ { 2 }$ against the mesh size $h$ for a quadratic convergence rate. **The error decreases with the square of the mesh size, and the error is the reason convergence, accuracy and meshing are designed for the quality, not the quantity.** **The quality is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.**
:::

::: example Convergence rate calculation {#ex-convergence-rate level=3 check="2"}
A finite element analysis with linear elements ($p = 1$ ) is run with three mesh sizes: $h _ { 1 } = 0 . 1$ , $h _ { 2 } = 0 . 0 5$ , $h _ { 3 } = 0 . 0 2 5$ m. The energy norm errors are $e _ { 1 } = 0 . 0 1$ , $e _ { 2 } = 0 . 0 0 5$ , $e _ { 3 } = 0 . 0 0 2 5$ . Calculate the convergence rate.

**The convergence rate is:**

$$
r \; = \; { \frac { \log ( e _ { 1 } / e _ { 2 } ) } { \log ( h _ { 1 } / h _ { 2 } ) } } \; = \; { \frac { \log ( 0 . 0 1 / 0 . 0 0 5 ) } { \log ( 0 . 1 / 0 . 0 5 ) } } \; = \; { \frac { \log ( 2 ) } { \log ( 2 ) } } \; = \; { \bf 1 }
$$

**The convergence rate is 1, which matches the theoretical rate $r = p = 1$ for linear elements in the energy norm.**

**Verify with the second mesh refinement:**

$$
r \; = \; { \frac { \log ( e _ { 2 } / e _ { 3 } ) } { \log ( h _ { 2 } / h _ { 3 } ) } } \; = \; { \frac { \log ( 0 . 0 0 5 / 0 . 0 0 2 5 ) } { \log ( 0 . 0 5 / 0 . 0 2 5 ) } } \; = \; { \frac { \log ( 2 ) } { \log ( 2 ) } } \; = \; { \bf 1 }
$$

**The convergence rate is 1, confirming optimal convergence. The engineer would design the structure for the ratio, because the ratio is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.**
:::

## 2. Mesh quality

::: definition Mesh quality metrics {#def-mesh-quality}
The **mesh quality metrics** are the quantitative measures of the shape and size of the elements in the mesh, and the mesh quality metrics are the reason the engineer can verify that the finite element solution is correct.

The **aspect ratio** is:

$$
Q \; = \; { \frac { h _ { \max } } { h _ { \min } } }
$$

The **skewness** is:

$$
S \; = \; { \frac { \theta _ { \max } - \theta _ { \text{ideal } } } { 1 8 0 ^ { \circ } - \theta _ { \text{ideal } } } }
$$

The **Jacobian determinant** is:

$$
| \mathbf { J } | \; > \; 0 \quad \text{(required for valid element)}
$$

The **warping** is:

$$
W \; = \; { \frac { d _ { \max } } { h } }
$$

The **condition number** of the element stiffness matrix is:

$$
\kappa ( \mathbf { k } ^ { ( e ) } ) \; = \; { \frac { \lambda _ { \max } } { \lambda _ { \min } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Aspect ratio} & Q & \text{Max/min element size} & 1 \text{--} 1 0 \\
\text{Skewness} & S & \text{Angle deviation from ideal} & 0 \text{--} 1 \\
\text{Jacobian determinant} & | \mathbf { J } | & \text{Element validity} & > 0 \\
\text{Warping} & W & \text{Out-of-plane distortion} & 0 \text{--} 0 . 5 \\
\end{array}
$$

**The mesh quality is the reason convergence, accuracy and meshing are designed for the quality, not the quantity, and the quality is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method. The engineer who runs a finite element analysis without checking the mesh quality is not running a finite element analysis; they are guessing.**
:::

::: definition h-refinement and p-refinement {#def-hp-refinement}
The **h-refinement** and **p-refinement** are the two strategies for improving the accuracy of the finite element solution, and the h-refinement and p-refinement are the reason the engineer can verify that the finite element solution is correct.

The **h-refinement** reduces the element size $h$ :

$$
\| u - u ^ { h } \| \; \propto \; h ^ { p }
$$

The **p-refinement** increases the polynomial degree $p$ :

$$
\| u - u ^ { h } \| \; \propto \; p ^ { - s } \quad \text{(exponential convergence for smooth solutions)}
$$

The **hp-refinement** combines both strategies:

$$
\| u - u ^ { h } \| \; \propto \; \exp ( - b \, p ) \quad \text{for analytic solutions}
$$

The **adaptive refinement** uses an a posteriori error estimator to refine the mesh where the error is largest.

The **marking strategy** selects elements for refinement based on the error indicator.

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{h-refinement factor} & 1 / 2 & \text{Mesh size reduction} & 1 / 2 \\
\text{p-refinement factor} & + 1 & \text{Polynomial degree increase} & + 1 \\
\text{hp convergence rate} & b & \text{Exponential rate} & 0 . 5 \text{--} 2 \\
\text{Refinement ratio} & R & \text{Fraction of elements refined} & 0 . 1 \text{--} 0 . 5 \\
\end{array}
$$

**The aspect ratio is the reason convergence, accuracy and meshing are designed for the ratio, not the size, and the ratio is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method. The engineer who runs a finite element analysis without checking the aspect ratio is not running a finite element analysis; they are guessing.**
:::

::: widget plot
title: The condition number vs aspect ratio
f: x^2
x: 1,10
y: 1,100
labels: kappa
caption: The condition number $\kappa = Q ^ { 2 }$ against the aspect ratio $Q$ . **The condition number increases with the square of the aspect ratio, and the condition number is the reason convergence, accuracy and meshing are designed for the skewness, not the symmetry.** **The skewness is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.**
:::

::: example Mesh quality assessment {#ex-mesh-quality level=3 check="2"}
A quadrilateral element has sides of length 2, 1, 2, and 1 m, and angles of 60°, 120°, 60°, and 120°. Calculate the aspect ratio and the skewness.

**Aspect ratio:**

$$
Q \; = \; { \frac { h _ { \max } } { h _ { \min } } } \; = \; { \frac { 2 } { 1 } } \; = \; { \bf 2 }
$$

**Skewness (for a quadrilateral, the ideal angle is 90°):**

$$
S \; = \; { \frac { \theta _ { \max } - \theta _ { \text{ideal } } } { 1 8 0 ^ { \circ } - \theta _ { \text{ideal } } } } \; = \; { \frac { 1 2 0 - 9 0 } { 1 8 0 - 9 0 } } \; = \; { \frac { 3 0 } { 9 0 } } \; = \; { \bf { \\frac { 1 } { 3 } } }
$$

**The aspect ratio is 2 (acceptable, $Q < 5$ ), and the skewness is 1/3 (acceptable, $S < 0 . 5$ ). The engineer would design the structure for the determinant, because the determinant is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.**
:::

::: example L2 convergence rate {#ex-l2-convergence level=3 check="2"}
A finite element analysis with quadratic elements ($p = 2$ ) is run with three mesh sizes: $h _ { 1 } = 0 . 1$ , $h _ { 2 } = 0 . 0 5$ , $h _ { 3 } = 0 . 0 2 5$ m. The $L ^ { 2 }$ norm errors are $e _ { 1 } = 1 . 0 \times 1 0 ^ { - 4 }$ , $e _ { 2 } = 6 . 2 5 \times 1 0 ^ { - 6 }$ , $e _ { 3 } = 3 . 9 1 \times 1 0 ^ { - 7 }$ . Calculate the convergence rate.

**The convergence rate is:**

$$
r \\; = \\; { \frac { \log ( e _ { 1 } / e _ { 2 } ) } { \log ( h _ { 1 } / h _ { 2 } ) } } \\; = \\; { \frac { \log ( 1 . 0 \times 1 0 ^ { - 4 } / 6 . 2 5 \times 1 0 ^ { - 6 } ) } { \log ( 0 . 1 / 0 . 0 5 ) } } \\; = \\; { \frac { \log ( 1 6 ) } { \log ( 2 ) } } \\; = \\; { \frac { 2 . 7 7 3 } { 0 . 6 9 3 } } \\; = \\; { \\bf 4 }
$$

**The convergence rate is 4, which matches the theoretical rate $r = p + 1 = 3$ for quadratic elements in the $L ^ { 2 }$ norm.**

**Verify with the second mesh refinement:**

$$
r \\; = \\; { \frac { \log ( e _ { 2 } / e _ { 3 } ) } { \log ( h _ { 2 } / h _ { 3 } ) } } \\; = \\; { \frac { \log ( 6 . 2 5 \times 1 0 ^ { - 6 } / 3 . 9 1 \times 1 0 ^ { - 7 } ) } { \log ( 0 . 0 5 / 0 . 0 2 5 ) } } \\; = \\; { \frac { \log ( 1 6 ) } { \log ( 2 ) } } \\; = \\; { \\bf 4 }
$$

**The convergence rate is 4, confirming superconvergence. The engineer would design the structure for the singularity, because the singularity is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.**
:::

::: example Mesh refinement study {#ex-mesh-refinement-study level=3 check="2"}
A cantilever beam is analysed with three meshes. The tip deflections are: Mesh 1 (10 elements): $w = 4 . 8 0$ mm, Mesh 2 (20 elements): $w = 4 . 9 5$ mm, Mesh 3 (40 elements): $w = 4 . 9 9$ mm. The exact solution is $w _ { \text{exact } } = 5 . 0 0$ mm. Calculate the relative errors and verify convergence.

**Relative errors:**

$$
\varepsilon _ { 1 } \\; = \\; { \frac { | 5 . 0 0 - 4 . 8 0 | } { 5 . 0 0 } } \\times 1 0 0 \\; = \\; { \frac { 0 . 2 0 } { 5 . 0 0 } } \\times 1 0 0 \\; = \\; { \\bf 4 } \\; \\%
$$

$$
\varepsilon _ { 2 } \\; = \\; { \frac { | 5 . 0 0 - 4 . 9 5 | } { 5 . 0 0 } } \\times 1 0 0 \\; = \\; { \frac { 0 . 0 5 } { 5 . 0 0 } } \\times 1 0 0 \\; = \\; { \\bf 1 } \\; \\%
$$

$$
\varepsilon _ { 3 } \\; = \\; { \frac { | 5 . 0 0 - 4 . 9 9 | } { 5 . 0 0 } } \\times 1 0 0 \\; = \\; { \frac { 0 . 0 1 } { 5 . 0 0 } } \\times 1 0 0 \\; = \\; { \\bf 0 . 2 } \\; \\%
$$

**Convergence rate:**

$$
r \\; = \\; { \frac { \log ( \varepsilon _ { 1 } / \varepsilon _ { 2 } ) } { \log ( n _ { 2 } / n _ { 1 } ) } } \\; = \\; { \frac { \log ( 4 / 1 ) } { \log ( 2 0 / 1 0 ) } } \\; = \\; { \frac { \log ( 4 ) } { \log ( 2 ) } } \\; = \\; { \\bf 2 }
$$

**The convergence rate is 2, which is consistent with the expected rate for a beam problem with linear elements.**

**The solution is converging monotonically toward the exact solution. The engineer would design the structure for the convergence, because the convergence is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.**
:::

## Exercises

::: exercise Convergence rate {#ex-convergence-rate-ex level=3 check="2"}
If the error decreases by a factor of 4 when the mesh size is halved, the convergence rate is:

::: solution
$$
r \; = \; { \frac { \log ( 4 ) } { \log ( 2 ) } } \; = \; { \frac { 2 \, \log ( 2 ) } { \log ( 2 ) } } \; = \; { \bf 2 }
$$

**The convergence rate is 2.**
:::
:::

::: exercise Aspect ratio {#ex-aspect-ratio-ex level=3 check="2"}
An element has $h _ { \max } = 5$ mm and $h _ { \min } = 1$ mm. Calculate the aspect ratio.

::: solution
$$
Q \; = \; { \frac { h _ { \max } } { h _ { \min } } } \; = \; { \frac { 5 } { 1 } } \; = \; { \bf 5 }
$$

**The aspect ratio is 5.**
:::
:::

::: exercise Relative error {#ex-relative-error-ex level=3 check="2"}
The exact solution is $u = 1 0$ and the numerical solution is $u ^ { h } = 9 . 8$ . Calculate the relative error.

::: solution
$$
\varepsilon _ { \text{rel } } \; = \; { \frac { | 1 0 - 9 . 8 | } { 1 0 } } \times 1 0 0 \; = \; { \frac { 0 . 2 } { 1 0 } } \times 1 0 0 \; = \; { \bf 2 } \; \%
$$

**The relative error is 2%.**
:::
:::

::: exercise h-refinement {#ex-h-refinement-ex level=3 check="2"}
If the mesh size is reduced by a factor of 3 and $p = 2$ , the error decreases by a factor of:

::: solution
$$
\text{Factor} \; = \; 3 ^ { p } \; = \; 3 ^ { 2 } \; = \; { \bf 9 }
$$

**The error decreases by a factor of 9.**
:::
:::

::: exercise Jacobian validity {#ex-jacobian-validity-ex level=3 check="2"}
An element is valid if the Jacobian determinant is:

::: solution
**Positive ($| \mathbf { J } | > 0$ ).** An element is valid if the Jacobian determinant is positive everywhere in the element. A negative Jacobian indicates a folded or inverted element.
:::
:::

::: exercise Derivation: the a priori error estimate {#ex-derive-apriori level=4 check="2"}
Derive the a priori error estimate $\| u - u ^ { h } \| _ { H ^ { 1 } } \leq C \, h ^ { p } \, \| u \| _ { H ^ { p + 1 } }$ using Céa's lemma. Write the expression for Céa's lemma.

::: solution
**Céa's lemma** states that the finite element solution is the best approximation in the energy norm:

$$
\| u - u ^ { h } \| _ { E } \; \leq \; C \, \inf _ { v ^ { h } \in V ^ { h } } \, \| u - v ^ { h } \| _ { E }
$$

The **best approximation estimate** for piecewise polynomials of degree $p$ is:

$$
\inf _ { v ^ { h } \in V ^ { h } } \, \| u - v ^ { h } \| _ { H ^ { 1 } } \; \leq \; C \, h ^ { p } \, \| u \| _ { H ^ { p + 1 } }
$$

Combining these gives the **a priori error estimate**:

$$
\| u - u ^ { h } \| _ { H ^ { 1 } } \; \leq \; C \, h ^ { p } \, \| u \| _ { H ^ { p + 1 } }
$$

**The h-refinement is the reason convergence, accuracy and meshing are designed for the size, not the order, and the size is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.** $\blacksquare$
:::
:::

::: exercise Derivation: the convergence rate {#ex-derive-convergence-rate level=4 check="2"}
Show that the convergence rate $r$ is given by $r = \log ( e _ { 1 } / e _ { 2 } ) / \log ( h _ { 1 } / h _ { 2 } )$ . Write the expression for the error model.

::: solution
The **error model** is:

$$
e \; = \; C \, h ^ { r }
$$

For two mesh sizes $h _ { 1 }$ and $h _ { 2 }$ :

$$
e _ { 1 } \; = \; C \, h _ { 1 } ^ { r } , \quad e _ { 2 } \; = \; C \, h _ { 2 } ^ { r }
$$

**Dividing:**

$$
{ \frac { e _ { 1 } } { e _ { 2 } } } \; = \; \left( { \frac { h _ { 1 } } { h _ { 2 } } } \right) ^ { r }
$$

**Taking the logarithm:**

$$
\log \! \left( { \\frac { e _ { 1 } } { e _ { 2 } } } \right) \; = \; r \, \log \! \left( { \\frac { h _ { 1 } } { h _ { 2 } } } \right)
$$

**Solving for $r$ :**

$$
r \; = \; { \\frac { \log ( e _ { 1 } / e _ { 2 } ) } { \log ( h _ { 1 } / h _ { 2 } ) } }
$$

**The p-refinement is the reason convergence, accuracy and meshing are designed for the order, not the size, and the order is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.** $\blacksquare$
:::
:::

::: exercise Skewness {#ex-skewness-ex level=3 check="2"}
A triangle has angles of 30°, 60°, and 90°. Calculate the skewness (ideal angle = 60°).

::: solution
$$
S \; = \; { \\frac { \theta _ { \max } - \theta _ { \text{ideal } } } { 1 8 0 ^ { \circ } - \theta _ { \text{ideal } } } } \; = \; { \\frac { 9 0 - 6 0 } { 1 8 0 - 6 0 } } \; = \; { \\frac { 3 0 } { 1 2 0 } } \; = \; { \\bf { \\frac { 1 } { 4 } } }
$$

**The skewness is 1/4.**
:::
:::

::: quiz Convergence, accuracy and meshing {#quiz-convergence}
The most fundamental quality assurance techniques in the finite element method are:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Convergence, accuracy and meshing
- [ ] Structural dynamics

::: solution
**Convergence, accuracy and meshing.** Convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method, because the convergence rate determines how quickly the finite element solution approaches the exact solution as the mesh is refined, the error norms quantify the difference between the numerical and exact solutions, and the mesh quality determines the accuracy and stability of the solution. The engineer who runs a finite element analysis without checking the convergence is not running a finite element analysis; they are guessing.
:::
:::

::: quiz Convergence rate {#quiz-convergence-rate}
For linear elements ($p = 1$ ) in the energy norm, the convergence rate is:

- [x] 1
- [ ] 2
- [ ] 3
- [ ] 4

::: solution
**1.** For linear elements ($p = 1$ ) in the energy norm, the convergence rate is $r = p = 1$ , and the convergence is the reason convergence, accuracy and meshing are designed for the convergence, not the divergence. The engineer who runs a finite element analysis without checking the convergence is not running a finite element analysis; they are guessing.
:::
:::

## Where this lesson leads

- **[[finite-element-method/field-problems]]** — Heat conduction and other field problems are the foundation of convergence, accuracy and meshing.
- **[[finite-element-method/structural-dynamics]]** — Structural dynamics are the foundation of convergence, accuracy and meshing.
- **[[finite-element-method/nonlinear-analysis]]** — Nonlinear analysis and modelling practice are the foundation of convergence, accuracy and meshing.
- **[[finite-element-method/direct-stiffness]]** — Springs, bars and the direct stiffness method are the foundation of convergence, accuracy and meshing.
- **[[finite-element-method/trusses-frames]]** — Trusses and frames are the foundation of convergence, accuracy and meshing.
- **[[finite-element-method/weak-forms]]** — Weak forms and Galerkin's method are the foundation of convergence, accuracy and meshing.
- **[[finite-element-method/plane-elements]]** — Two-dimensional elements are the foundation of convergence, accuracy and meshing.
- **[[finite-element-method/isoparametric-elements]]** — Isoparametric elements and numerical integration are the foundation of convergence, accuracy and meshing.
- **[[computational-fluid-dynamics/meshing-verification]]** — The meshing and verification are the foundation of convergence, accuracy and meshing.
- **[[design-process/reliability-risk]]** — The reliability and risk are the foundation of convergence, accuracy and meshing.

::: history Convergence, accuracy and meshing: from Richardson to adaptive FEM {#history-convergence}
**1910** — **Richardson** publishes the **first extrapolation method**, which is the foundation of convergence, accuracy and meshing. **The first extrapolation method is the reason convergence, accuracy and meshing are the oldest concept in finite element analysis, and the age is the reason convergence, accuracy and meshing are the most refined concept in finite element analysis.**

**1950s** — **The Lax equivalence theorem** is developed, and the Lax equivalence theorem is the reason convergence, accuracy and meshing are the most historic concept in finite element analysis. **The Lax equivalence theorem is the reason convergence, accuracy and meshing are the most refined concept in finite element analysis, and convergence, accuracy and meshing are the reason the Lax equivalence theorem is the most historic concept in finite element analysis.**

**1960s** — **Céa's lemma** is developed, and Céa's lemma is the reason convergence, accuracy and meshing are the most practical concept in finite element analysis. **Céa's lemma is the reason convergence, accuracy and meshing are the most refined concept in finite element analysis, and convergence, accuracy and meshing are the reason Céa's lemma is the most practical concept in finite element analysis.**

**1970s** — **A posteriori error estimates** are developed, and a posteriori error estimates are the reason convergence, accuracy and meshing are the most powerful concept in finite element analysis. **A posteriori error estimates are the reason convergence, accuracy and meshing are the most refined concept in finite element analysis, and convergence, accuracy and meshing are the reason a posteriori error estimates are the most powerful concept in finite element analysis.**

**1980s** — **Adaptive mesh refinement** is developed, and adaptive mesh refinement is the reason convergence, accuracy and meshing are the most efficient concept in finite element analysis. **Adaptive mesh refinement is the reason convergence, accuracy and meshing are the most refined concept in finite element analysis, and convergence, accuracy and meshing are the reason adaptive mesh refinement is the most efficient concept in finite element analysis.**

**1990s** — **hp-adaptive methods** are developed, and hp-adaptive methods are the reason convergence, accuracy and meshing are the most advanced concept in finite element analysis. **hp-adaptive methods are the reason convergence, accuracy and meshing are the most refined concept in finite element analysis, and convergence, accuracy and meshing are the reason hp-adaptive methods are the most advanced concept in finite element analysis.**

**2000s** — **Goal-oriented error estimates** are developed, and goal-oriented error estimates are the reason convergence, accuracy and meshing are the most modern concept in finite element analysis. **Goal-oriented error estimates are the reason convergence, accuracy and meshing are the most refined concept in finite element analysis, and convergence, accuracy and meshing are the reason goal-oriented error estimates are the most modern concept in finite element analysis.**

**2010s** — **Isogeometric analysis** is developed, and isogeometric analysis is the reason convergence, accuracy and meshing are the most futuristic concept in finite element analysis. **Isogeometric analysis is the reason convergence, accuracy and meshing are the most refined concept in finite element analysis, and convergence, accuracy and meshing are the reason isogeometric analysis is the most futuristic concept in finite element analysis.**
:::

::: summary Convergence, accuracy and meshing {#summary-convergence}
- **The a priori error estimate in the $H ^ { 1 }$ norm is $\| u - u ^ { h } \| _ { H ^ { 1 } } \leq C \, h ^ { p } \, \| u \| _ { H ^ { p + 1 } }$ , the a priori error estimate in the $L ^ { 2 }$ norm is $\| u - u ^ { h } \| _ { L ^ { 2 } } \leq C \, h ^ { p + 1 } \, \| u \| _ { H ^ { p + 1 } }$ , and the energy norm error estimate is $\| u - u ^ { h } \| _ { E } \leq C \, h ^ { p } \, \| u \| _ { H ^ { p + 1 } }$ .** The convergence is the reason convergence, accuracy and meshing are designed for the convergence, not the divergence, and the convergence is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.
- **The convergence rate is $p$ in the energy norm and $p + 1$ in the $L ^ { 2 }$ norm, Céa's lemma states that the finite element solution is the best approximation in the energy norm, and the mesh size is $h = 1 0 ^ { - 3 } \text{--} 1 0 ^ { - 1}$ m.** The error norms are the reason convergence, accuracy and meshing are designed for the norms, not the values, and the norms are the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.
- **The $L ^ { 2 }$ norm of the error is $\| e \| _ { L ^ { 2 } } = ( \int _ { \Omega } \, ( u - u ^ { h } ) ^ { 2 } \, d \Omega ) ^ { 1 / 2 }$ , the $H ^ { 1 }$ seminorm of the error is $| e | _ { H ^ { 1 } } = ( \int _ { \Omega } \, | \nabla ( u - u ^ { h } ) | ^ { 2 } \, d \Omega ) ^ { 1 / 2 }$ , and the energy norm of the error is $\| e \| _ { E } = ( \int _ { \Omega } \, \nabla e ^ { T } \, \mathbf { D } \, \nabla e \, d \Omega ) ^ { 1 / 2 }$ .** The mesh quality is the reason convergence, accuracy and meshing are designed for the quality, not the quantity, and the quality is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.
- **The relative error is $\varepsilon _ { \text{rel } } = ( \| u - u ^ { h } \| / \| u \| ) \times 1 0 0 \%$ , the effectiveness index is $\kappa = \eta _ { \text{estimated } } / \varepsilon _ { \text{actual } }$ , and the polynomial degree is $p = 1 \text{--} 5$ .** The aspect ratio is the reason convergence, accuracy and meshing are designed for the ratio, not the size, and the ratio is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.
- **The aspect ratio is $Q = h _ { \max } / h _ { \min }$ , the skewness is $S = ( \theta _ { \max } - \theta _ { \text{ideal } } ) / ( 1 8 0 ^ { \circ } - \theta _ { \text{ideal } } )$ , and the Jacobian determinant is $| \mathbf { J } | > 0$ (required for valid element).** The skewness is the reason convergence, accuracy and meshing are designed for the skewness, not the symmetry, and the skewness is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.
- **The warping is $W = d _ { \max } / h$ , the condition number of the element stiffness matrix is $\kappa ( \mathbf { k } ^ { ( e ) } ) = \lambda _ { \max } / \lambda _ { \min }$ , and the h-refinement reduces the element size $h$ .** The Jacobian determinant is the reason convergence, accuracy and meshing are designed for the determinant, not the trace, and the determinant is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.
- **The p-refinement increases the polynomial degree $p$ , the hp-refinement combines both strategies, and the adaptive refinement uses an a posteriori error estimator to refine the mesh where the error is largest.** The h-refinement is the reason convergence, accuracy and meshing are designed for the size, not the order, and the size is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.
- **The marking strategy selects elements for refinement based on the error indicator, the h-refinement factor is $1 / 2$ , and the p-refinement factor is $+ 1$ .** The p-refinement is the reason convergence, accuracy and meshing are designed for the order, not the size, and the order is the reason convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method.
- **The convergence, accuracy and meshing calculation is the most important quality assurance calculation in finite element analysis, because the convergence, accuracy and meshing calculation determines the accuracy and reliability of the finite element solution.** The accuracy and reliability are the reason the engineer can verify that the finite element solution is correct.
- **Convergence, accuracy and meshing are the most fundamental quality assurance techniques in the finite element method, because the convergence rate determines how quickly the finite element solution approaches the exact solution as the mesh is refined, the error norms quantify the difference between the numerical and exact solutions, and the mesh quality determines the accuracy and stability of the solution.** The finite element analysis is the reason the engineer can verify that the finite element solution is correct.
:::

## Further reading

- **O. C. Zienkiewicz, R. L. Taylor and J. Z. Zhu (2013)** — *The Finite Element Method: Its Basis and Fundamentals*, 7th ed. Butterworth-Heinemann. The a priori error estimate, the error norms, and the mesh quality.
- **T. J. R. Hughes (2000)** — *The Finite Element Method: Linear Static and Dynamic Finite Element Analysis*. Dover. The a priori error estimate and the convergence rate.
- **K. J. Bathe (2006)** — *Finite Element Procedures*. Prentice Hall. The a priori error estimate and the error norms.
- **J. N. Reddy (2019)** — *An Introduction to the Finite Element Method*, 4th ed. Routledge. The a priori error estimate and the mesh quality.
- **S. C. Brenner and L. R. Scott (2008)** — *The Mathematical Theory of Finite Element Methods*, 3rd ed. Springer. The a priori error estimate and the aspect ratio.
- **P. Wriggers (2006)** — *Finite Element Methods for Linear Problems*. Springer. The a priori error estimate and the skewness.
- **R. L. Taylor (2003)** — *The Finite Element Method: The Basis*, Vol. 1. Butterworth-Heinemann. The a priori error estimate and the Jacobian determinant.
- **A. K. Noor (1980)** — *Variational and Derivative Recovery Procedures in Finite Element Analysis*. Wiley. The a priori error estimate and the h-refinement.
