The linear elasticity theory is the most elegant theory in solid mechanics: the linear elasticity theory is the mathematical framework that relates the stress tensor to the strain tensor through the constitutive equation, and the constitutive equation is the reason the engineer can calculate the stress from the displacement, or the displacement from the stress. **The engineer who thinks in terms of uniaxial stress and strain is not thinking in three dimensions; they are thinking in one dimension, and the one-dimensional thinking is the reason the component fails in the direction the engineer did not consider.** The linear elasticity theory is the reason the engineer can predict the stress and displacement in three dimensions, and the prediction is the reason the component is safe.

The quantitative tools of linear elasticity are the **generalised Hooke's law** (the constitutive equation for the linear elastic solid), the **boundary-value problem** (the governing equations, the boundary conditions, and the uniqueness theorem), the **plane stress and plane strain** formulations (the two-dimensional simplifications), and the **Airy stress function** (the biharmonic equation that automatically satisfies the equilibrium equations). The tools are the language in which the linear elasticity analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways linear elasticity analysis goes wrong
**Not using the generalised Hooke's law.** The engineer who uses the uniaxial Hooke's law for a three-dimensional stress state is not using the generalised Hooke's law; they are using the wrong constitutive equation. **The generalised Hooke's law is the reason the engineer can calculate the stress from the strain in three dimensions, and the calculation is the reason the component is safe.** **Not checking the boundary conditions.** The engineer who solves the boundary-value problem without checking the boundary conditions is not solving the problem; they are guessing. **The boundary conditions are the reason the solution is unique, and the uniqueness is the reason the engineer can trust the solution.** **Not checking the equilibrium.** The engineer who calculates the stress components without checking the equilibrium equations is not calculating the stress; they are guessing. **The equilibrium equations are the reason the stress components are physically meaningful, and the physical meaning is the reason the stress analysis is correct.** **Not checking the compatibility.** The engineer who calculates the strain components without checking the compatibility equations is not calculating the strain; they are guessing. **The compatibility equations are the reason the strain components are physically meaningful, and the physical meaning is the reason the strain analysis is correct.** **Not using the Airy stress function.** The engineer who solves the two-dimensional elasticity problem without the Airy stress function is not solving the problem efficiently; they are solving the problem the hard way. **The Airy stress function is the reason the equilibrium equations are automatically satisfied, and the automatic satisfaction is the reason the Airy stress function is the most elegant method in two-dimensional elasticity.** **Not accounting for the plane stress.** The engineer who uses the three-dimensional constitutive equation for a thin plate is not analysing the plate; they are analysing a three-dimensional solid. **The plane stress assumption is the reason the thin plate analysis is simple, and the simplicity is the reason the thin plate analysis is the most widely used analysis in structural engineering.** **Not accounting for the plane strain.** The engineer who uses the three-dimensional constitutive equation for a long dam is not analysing the dam; they are analysing a three-dimensional solid. **The plane strain assumption is the reason the long structure analysis is simple, and the simplicity is the reason the long structure analysis is the most widely used analysis in geotechnical engineering.** **Not accounting for the symmetry.** The engineer who solves the boundary-value problem without exploiting the symmetry is not solving the problem efficiently; they are solving the problem the hard way. **The symmetry is the reason the problem is simpler, and the simplicity is the reason the engineer can solve the problem by hand.** **Not accounting for the superposition.** The engineer who solves the boundary-value problem without exploiting the superposition is not solving the problem efficiently; they are solving the problem the hard way. **The superposition is the reason the problem is simpler, and the simplicity is the reason the engineer can solve the problem by hand.**
:::

## 1. The generalised Hooke's law

::: definition The generalised Hooke's law {#def-hookes-law}
The **generalised Hooke's law** is the constitutive equation for the linear elastic, isotropic solid:

$$
\varepsilon _ { i j } \; = \; { \frac { 1 + \nu } { E } } \, \sigma _ { i j } - { \frac { \nu } { E } } \, \sigma _ { k k } \, \delta _ { i j }
$$

or in expanded form:

$$
\varepsilon _ { x x } \; = \; { \frac { 1 } { E } } \, [ \sigma _ { x x } - \nu \, ( \sigma _ { y y } + \sigma _ { z z } ) ]
$$

$$
\varepsilon _ { y y } \; = \; { \frac { 1 } { E } } \, [ \sigma _ { y y } - \nu \, ( \sigma _ { x x } + \sigma _ { z z } ) ]
$$

$$
\varepsilon _ { z z } \; = \; { \frac { 1 } { E } } \, [ \sigma _ { z z } - \nu \, ( \sigma _ { x x } + \sigma _ { y y } ) ]
$$

$$
\gamma _ { x y } \; = \; { \frac { \tau _ { x y } } { G } } \qquad \gamma _ { y z } \; = \; { \frac { \tau _ { y z } } { G } } \qquad \gamma _ { z x } \; = \; { \frac { \tau _ { z x } } { G } }
$$

where $E$ is the Young's modulus, $\nu$ is the Poisson's ratio, and $G$ is the shear modulus.

The **inverse form** (stress in terms of strain) is:

$$
\sigma _ { i j } \; = \; 2 \, G \, \varepsilon _ { i j } + \lambda \, \varepsilon _ { k k } \, \delta _ { i j }
$$

where $\lambda = E \, \nu / [ ( 1 + \nu ) ( 1 - 2 \, \nu ) ]$ is the **Lamé constant**.

$$
\begin{array} { l c c c }
\textbf{Material} & \textbf{ } E \textbf{ (GPa)} & \textbf{ } \nu & \textbf{ } G \textbf{ (GPa)} \\ \hline
\text{Steel} & 2 0 0 & 0 . 3 0 & 7 7 \\
\text{Aluminium} & 7 0 & 0 . 3 3 & 2 6 \\
\text{Titanium} & 1 1 0 & 0 . 3 4 & 4 1 \\
\text{Concrete} & 3 0 & 0 . 2 0 & 1 2 . 5 \\
\text{Rubber} & 0 . 0 1 & 0 . 4 9 9 & 0 . 0 0 3 3 \\
\end{array}
$$

**The generalised Hooke's law is the reason the engineer can calculate the stress from the strain in three dimensions, and the calculation is the reason the component is safe. The engineer who uses the uniaxial Hooke's law for a three-dimensional stress state is not using the generalised Hooke's law; they are using the wrong constitutive equation.**
:::

::: definition The boundary-value problem of elasticity {#def-bvp}
The **boundary-value problem of elasticity** consists of:

1. **The equilibrium equations** (3 equations):

$$
{ \frac { \partial \sigma _ { i j } } { \partial x _ { j } } } + X _ { i } \; = \; 0
$$

2. **The strain-displacement relations** (6 equations):

$$
\varepsilon _ { i j } \; = \; { \frac { 1 } { 2 } } \, ( { \frac { \partial u _ { i } } { \partial x _ { j } } } + { \frac { \partial u _ { j } } { \partial x _ { i } } } )
$$

3. **The constitutive equations** (6 equations):

$$
\sigma _ { i j } \; = \; 2 \, G \, \varepsilon _ { i j } + \lambda \, \varepsilon _ { k k } \, \delta _ { i j }
$$

4. **The boundary conditions** (3 equations on the boundary $S _ { \sigma }$ and 3 equations on the boundary $S _ { u }$ ):

$$
T _ { i } \; = \; \sigma _ { i j } \, n _ { j } \; = \; { \bar { T } } _ { i } \quad \text{on } S _ { \sigma }
$$

$$
u _ { i } \; = \; { \bar { u } } _ { i } \quad \text{on } S _ { u }
$$

The **uniqueness theorem** states that the solution to the boundary-value problem is unique.

**The boundary conditions are the reason the solution is unique, and the uniqueness is the reason the engineer can trust the solution. The engineer who solves the boundary-value problem without checking the boundary conditions is not solving the problem; they are guessing.**
:::

::: widget plot
title: The Poisson effect: lateral strain vs axial strain
f: -0.3*x; -0.33*x; -0.2*x
x: -1000,1000
y: -400,400
labels: Steel (nu=0.3); Aluminium (nu=0.33); Concrete (nu=0.2)
caption: The lateral strain against the axial strain for three materials. **The Poisson ratio is the reason the lateral strain is proportional to the axial strain, and the proportionality is the reason the engineer can calculate the lateral strain from the axial strain.** **The Poisson ratio of rubber is 0.499, which means the volume is almost conserved under deformation, and the volume conservation is the reason rubber is incompressible.**
:::

::: example Generalised Hooke's law {#ex-hookes-ex level=3 check="2"}
A steel component ($E = 2 0 0$ GPa, $\nu = 0 . 3$ ) is subjected to $\sigma _ { x x } = 2 0 0$ MPa, $\sigma _ { y y } = 1 0 0$ MPa, and $\sigma _ { z z } = 5 0$ MPa. Calculate the strain components.

**Strain components:**

$$
\varepsilon _ { x x } \; = \; { \frac { 1 } { 2 0 0 \ 0 0 0 } } \, [ 2 0 0 - 0 . 3 \times ( 1 0 0 + 5 0 ) ] \; = \; { \frac { 2 0 0 - 4 5 } { 2 0 0 \ 0 0 0 } } \; = \; { \frac { 1 5 5 } { 2 0 0 \ 0 0 0 } } \; = \; { \bf 7 7 5 } \ \mu \varepsilon
$$

$$
\varepsilon _ { y y } \; = \; { \frac { 1 } { 2 0 0 \ 0 0 0 } } \, [ 1 0 0 - 0 . 3 \times ( 2 0 0 + 5 0 ) ] \; = \; { \frac { 1 0 0 - 7 5 } { 2 0 0 \ 0 0 0 } } \; = \; { \frac { 2 5 } { 2 0 0 \ 0 0 0 } } \; = \; { \bf 1 2 5 } \ \mu \varepsilon
$$

$$
\varepsilon _ { z z } \; = \; { \frac { 1 } { 2 0 0 \ 0 0 0 } } \, [ 5 0 - 0 . 3 \times ( 2 0 0 + 1 0 0 ) ] \; = \; { \frac { 5 0 - 9 0 } { 2 0 0 \ 0 0 0 } } \; = \; { \frac { - 4 0 } { 2 0 0 \ 0 0 0 } } \; = \; { \bf - 2 0 0 } \ \mu \varepsilon
$$

**The strain components are 775 με, 125 με, and -200 με. The engineer would use the strain components to calculate the deformation of the component, and the deformation is the reason the component fits together.**
:::

## 2. Plane stress and plane strain

::: definition Plane stress and plane strain formulations {#def-plane-formulations}
The **plane stress** formulation assumes $\sigma _ { z z } = \tau _ { x z } = \tau _ { y z } = 0$ :

$$
\varepsilon _ { x x } \; = \; { \frac { 1 } { E } } \, ( \sigma _ { x x } - \nu \, \sigma _ { y y } ) \qquad \varepsilon _ { y y } \; = \; { \frac { 1 } { E } } \, ( \sigma _ { y y } - \nu \, \sigma _ { x x } )
$$

$$
\varepsilon _ { z z } \; = \; - { \frac { \nu } { E } } \, ( \sigma _ { x x } + \sigma _ { y y } ) \qquad \gamma _ { x y } \; = \; { \frac { \tau _ { x y } } { G } }
$$

The **plane strain** formulation assumes $\varepsilon _ { z z } = \varepsilon _ { x z } = \varepsilon _ { y z } = 0$ :

$$
\sigma _ { z z } \; = \; \nu \, ( \sigma _ { x x } + \sigma _ { y y } )
$$

$$
\varepsilon _ { x x } \; = \; { \frac { 1 - \nu ^ { 2 } } { E } } \, ( \sigma _ { x x } - { \frac { \nu } { 1 - \nu } } \, \sigma _ { y y } )
$$

$$
\varepsilon _ { y y } \; = \; { \frac { 1 - \nu ^ { 2 } } { E } } \, ( \sigma _ { y y } - { \frac { \nu } { 1 - \nu } } \, \sigma _ { x x } )
$$

$$
\begin{array} { l c c }
\textbf{Condition} & \textbf{Use case} & \textbf{Effective modulus} \\ \hline
\text{Plane stress} & \text{Thin plate} & E \\
\text{Plane strain} & \text{Long dam, long cylinder} & E / ( 1 - \nu ^ { 2 } ) \\
\end{array}
$$

**The plane stress assumption is the reason the thin plate analysis is simple, and the simplicity is the reason the thin plate analysis is the most widely used analysis in structural engineering. The plane strain assumption is the reason the long structure analysis is simple, and the simplicity is the reason the long structure analysis is the most widely used analysis in geotechnical engineering.**
:::

::: definition The Airy stress function {#def-airy}
The **Airy stress function** $\Phi ( x , y )$ is the scalar function that automatically satisfies the equilibrium equations (in the absence of body forces):

$$
\sigma _ { x x } \; = \; { \frac { \partial ^ { 2 } \Phi } { \partial y ^ { 2 } } } \qquad \sigma _ { y y } \; = \; { \frac { \partial ^ { 2 } \Phi } { \partial x ^ { 2 } } } \qquad \tau _ { x y } \; = \; - { \frac { \partial ^ { 2 } \Phi } { \partial x \, \partial y } }
$$

The **compatibility equation** requires that $\Phi$ satisfies the **biharmonic equation**:

$$
\nabla ^ { 4 } \Phi \; = \; { \frac { \partial ^ { 4 } \Phi } { \partial x ^ { 4 } } } + 2 \, { \frac { \partial ^ { 4 } \Phi } { \partial x ^ { 2 } \, \partial y ^ { 2 } } } + { \frac { \partial ^ { 4 } \Phi } { \partial y ^ { 4 } } } \; = \; 0
$$

**The Airy stress function is the reason the equilibrium equations are automatically satisfied, and the automatic satisfaction is the reason the Airy stress function is the most elegant method in two-dimensional elasticity. The engineer who solves the two-dimensional elasticity problem without the Airy stress function is not solving the problem efficiently; they are solving the problem the hard way.**
:::

::: widget plot
title: The Airy stress function: biharmonic equation
f: sin(x)*cosh(x)-cos(x)*sinh(x); sin(x)*cosh(x)+cos(x)*sinh(x)
x: 0,6
y: -5,5
labels: Phi_1; Phi_2
caption: The biharmonic functions $\sin ( x ) \cosh ( x ) - \cos ( x ) \sinh ( x )$ and $\sin ( x ) \cosh ( x ) + \cos ( x ) \sinh ( x )$ . **The biharmonic functions are the reason the Airy stress function is the most elegant method in two-dimensional elasticity, and the elegance is the reason the Airy stress function is the most widely used method in two-dimensional elasticity.**
:::

::: example Airy stress function {#ex-airy-ex level=3 check="2"}
Show that the Airy stress function $\Phi = a \, x ^ { 2 } + b \, y ^ { 2 }$ (where $a$ and $b$ are constants) satisfies the biharmonic equation and calculate the corresponding stress components.

**Biharmonic check:**

$$
{ \frac { \partial ^ { 4 } \Phi } { \partial x ^ { 4 } } } \; = \; 0 \qquad { \frac { \partial ^ { 4 } \Phi } { \partial x ^ { 2 } \, \partial y ^ { 2 } } } \; = \; 0 \qquad { \frac { \partial ^ { 4 } \Phi } { \partial y ^ { 4 } } } \; = \; 0
$$

$$
\nabla ^ { 4 } \Phi \; = \; 0 + 0 + 0 \; = \; { \bf 0 } \quad \checkmark
$$

**Stress components:**

$$
\sigma _ { x x } \; = \; { \frac { \partial ^ { 2 } \Phi } { \partial y ^ { 2 } } } \; = \; { \bf 2 } \, b
$$

$$
\sigma _ { y y } \; = \; { \frac { \partial ^ { 2 } \Phi } { \partial x ^ { 2 } } } \; = \; { \bf 2 } \, a
$$

$$
\tau _ { x y } \; = \; - { \frac { \partial ^ { 2 } \Phi } { \partial x \, \partial y } } \; = \; { \bf 0 }
$$

**The Airy stress function $\Phi = a \, x ^ { 2 } + b \, y ^ { 2 }$ represents a uniform biaxial stress state: $\sigma _ { x x } = 2 \, b$ and $\sigma _ { y y } = 2 \, a$ . The Airy stress function is the reason the equilibrium equations are automatically satisfied, and the automatic satisfaction is the reason the Airy stress function is the most elegant method in two-dimensional elasticity.**
:::

::: example Plane stress constitutive matrix {#ex-plane-stress-matrix level=3 check="2"}
A steel plate ($E = 2 0 0$ GPa, $\\nu = 0 . 3$ ) is in plane stress with $\\sigma _ { x x } = 1 5 0$ MPa, $\\sigma _ { y y } = 8 0$ MPa, and $\\tau _ { x y } = 5 0$ MPa. Calculate the strain components using the constitutive matrix.

**Constitutive matrix for plane stress:**

$$
\\boldsymbol { \\varepsilon } \\; = \\; { \\frac { 1 } { E } } \\, \\mathbf { S } \\, \\boldsymbol { \\sigma }
$$

where the **compliance matrix** is:

$$
{ \mathbf { S } } \; = \; { \left[ \begin{array} { l l l } { 1 } & { - \nu } & { 0 } \\ { - \nu } & { 1 } & { 0 } \\ { 0 } & { 0 } & { 2 ( 1 + \nu ) } \end{array} \right] }
$$

**Strain components:**

$$
\\varepsilon _ { x x } \\; = \\; { \\frac { 1 } { 2 0 0 \\ 0 0 0 } } \\, ( 1 5 0 - 0 . 3 \\times 8 0 ) \\; = \\; { \\frac { 1 2 6 } { 2 0 0 \\ 0 0 0 } } \\; = \\; { \\bf 6 3 0 } \\ \\mu \\varepsilon
$$

$$
\\varepsilon _ { y y } \\; = \\; { \\frac { 1 } { 2 0 0 \\ 0 0 0 } } \\, ( 8 0 - 0 . 3 \\times 1 5 0 ) \\; = \\; { \\frac { 3 5 } { 2 0 0 \\ 0 0 0 } } \\; = \\; { \\bf 1 7 5 } \\ \\mu \\varepsilon
$$

$$
\\gamma _ { x y } \\; = \\; { \\frac { 2 \\times 1 . 3 } { 2 0 0 \\ 0 0 0 } } \\times 5 0 \\; = \\; { \\frac { 1 3 0 } { 2 0 0 \\ 0 0 0 } } \\; = \\; { \\bf 6 5 0 } \\ \\mu \\varepsilon
$$

**The strain components are 630 με, 175 με, and 650 με. The engineer would use the constitutive matrix to calculate the strain from the stress in the finite element method.**
:::

::: example Boundary-value problem: uniaxial bar {#ex-bvp-bar level=3 check="2"}
A steel bar ($E = 2 0 0$ GPa, $L = 1$ m, $A = 1 0 0$ mm²) is fixed at one end and subjected to a tensile force $F = 1 0$ kN at the other end. Solve the boundary-value problem: find the displacement field $u ( x )$ , the strain $\\varepsilon ( x )$ , and the stress $\\sigma ( x )$ .

**Governing equation (equilibrium):**

$$
{ \\frac { d \\sigma } { d x } } \\; = \\; 0 \\quad \\Longrightarrow \\quad \\sigma \\; = \\; \\text{constant}
$$

**Constitutive equation:**

$$
\\sigma \\; = \\; E \\, \\varepsilon \\; = \\; E \\, { \\frac { d u } { d x } }
$$

**Boundary conditions:**
- At $x = 0$ : $u = 0$ (fixed end)
- At $x = L$ : $\\sigma = F / A$ (applied force)

**Solution:**

$$
\\sigma ( x ) \\; = \\; { \\frac { F } { A } } \\; = \\; { \\frac { 1 0 \\ 0 0 0 } { 1 0 0 } } \\; = \\; { \\bf 1 0 0 } \\ \\text{MPa}
$$

$$
\\varepsilon ( x ) \\; = \\; { \\frac { \\sigma } { E } } \\; = \\; { \\frac { 1 0 0 } { 2 0 0 \\ 0 0 0 } } \\; = \\; { \\bf 5 0 0 } \\ \\mu \\varepsilon
$$

$$
u ( x ) \\; = \\; \\varepsilon \\, x \\; = \\; 5 0 0 \\times 1 0 ^ { - 6 } \\times x
$$

**Displacement at the free end:**

$$
u ( L ) \\; = \\; 5 0 0 \\times 1 0 ^ { - 6 } \\times 1 \\ 0 0 0 \\; = \\; { \\bf 0 . 5 } \\ \\text{mm}
$$

**The boundary-value problem is solved: the stress is 100 MPa, the strain is 500 με, and the displacement at the free end is 0.5 mm. The boundary conditions are the reason the solution is unique, and the uniqueness is the reason the engineer can trust the solution.**
:::

## Exercises

::: exercise Generalised Hooke's law {#ex-hookes-ex2 level=3 check="2"}
An aluminium component ($E = 7 0$ GPa, $\nu = 0 . 3 3$ ) is subjected to $\sigma _ { x x } = 1 5 0$ MPa, $\sigma _ { y y } = 8 0$ MPa, and $\sigma _ { z z } = 0$ MPa. Calculate the strain components.

::: solution
$$
\varepsilon _ { x x } \; = \; { \frac { 1 } { 7 0 \ 0 0 0 } } \, [ 1 5 0 - 0 . 3 3 \times ( 8 0 + 0 ) ] \; = \; { \frac { 1 5 0 - 2 6 . 4 } { 7 0 \ 0 0 0 } } \; = \; { \frac { 1 2 3 . 6 } { 7 0 \ 0 0 0 } } \; = \; { \bf 1 \ 7 6 6 } \ \mu \varepsilon
$$

$$
\varepsilon _ { y y } \; = \; { \frac { 1 } { 7 0 \ 0 0 0 } } \, [ 8 0 - 0 . 3 3 \times ( 1 5 0 + 0 ) ] \; = \; { \frac { 8 0 - 4 9 . 5 } { 7 0 \ 0 0 0 } } \; = \; { \frac { 3 0 . 5 } { 7 0 \ 0 0 0 } } \; = \; { \bf 4 3 6 } \ \mu \varepsilon
$$

$$
\varepsilon _ { z z } \; = \; { \frac { 1 } { 7 0 \ 0 0 0 } } \, [ 0 - 0 . 3 3 \times ( 1 5 0 + 8 0 ) ] \; = \; { \frac { - 7 5 . 9 } { 7 0 \ 0 0 0 } } \; = \; { \bf - 1 \ 0 8 4 } \ \mu \varepsilon
$$

**The strain components are 1 766 με, 436 με, and -1 084 με.**
:::
:::

::: exercise Plane stress vs plane strain {#ex-plane-ex2 level=3 check="2"}
A steel component ($E = 2 0 0$ GPa, $\nu = 0 . 3$ ) is subjected to $\sigma _ { x x } = 3 0 0$ MPa and $\sigma _ { y y } = 2 0 0$ MPa. Calculate $\varepsilon _ { x x }$ for plane stress and plane strain.

::: solution
**Plane stress:**

$$
\varepsilon _ { x x } \; = \; { \frac { 1 } { 2 0 0 \ 0 0 0 } } \, ( 3 0 0 - 0 . 3 \times 2 0 0 ) \; = \; { \frac { 2 4 0 } { 2 0 0 \ 0 0 0 } } \; = \; { \bf 1 \ 2 0 0 } \ \mu \varepsilon
$$

**Plane strain:**

$$
\sigma _ { z z } \; = \; 0 . 3 \times ( 3 0 0 + 2 0 0 ) \; = \; 1 5 0 \ \text{MPa}
$$

$$
\varepsilon _ { x x } \; = \; { \frac { 1 } { 2 0 0 \ 0 0 0 } } \, [ 3 0 0 - 0 . 3 \times ( 2 0 0 + 1 5 0 ) ] \; = \; { \frac { 3 0 0 - 1 0 5 } { 2 0 0 \ 0 0 0 } } \; = \; { \frac { 1 9 5 } { 2 0 0 \ 0 0 0 } } \; = \; { \bf 9 7 5 } \ \mu \varepsilon
$$

**The plane strain condition produces a smaller strain (975 με) than the plane stress condition (1 200 με), because the constraint in the z-direction increases the stiffness.**
:::
:::

::: exercise Airy stress function {#ex-airy-ex2 level=3 check="2"}
Show that the Airy stress function $\Phi = c \, x ^ { 2 } \, y ^ { 2 }$ (where $c$ is a constant) satisfies the biharmonic equation and calculate the corresponding stress components.

::: solution
**Biharmonic check:**

$$
{ \frac { \partial ^ { 4 } \Phi } { \partial x ^ { 4 } } } \; = \; 0 \qquad { \frac { \partial ^ { 4 } \Phi } { \partial x ^ { 2 } \, \partial y ^ { 2 } } } \; = \; 4 \, c \qquad { \frac { \partial ^ { 4 } \Phi } { \partial y ^ { 4 } } } \; = \; 0
$$

$$
\nabla ^ { 4 } \Phi \; = \; 0 + 2 \times 4 \, c + 0 \; = \; { \bf 8 } \, c \; \ne \; { \bf 0 } \quad \times
$$

**The Airy stress function $\Phi = c \, x ^ { 2 } \, y ^ { 2 }$ does not satisfy the biharmonic equation (unless $c = 0$ ). The engineer who uses this Airy stress function is not solving the problem; they are guessing.**

**Stress components (for reference):**

$$
\sigma _ { x x } \; = \; { \frac { \partial ^ { 2 } \Phi } { \partial y ^ { 2 } } } \; = \; 2 \, c \, x ^ { 2 }
$$

$$
\sigma _ { y y } \; = \; { \frac { \partial ^ { 2 } \Phi } { \partial x ^ { 2 } } } \; = \; 2 \, c \, y ^ { 2 }
$$

$$
\tau _ { x y } \; = \; - { \frac { \partial ^ { 2 } \Phi } { \partial x \, \partial y } } \; = \; - 4 \, c \, x \, y
$$
:::
:::

::: exercise Lamé constants {#ex-lame level=3 check="2"}
A steel component has $E = 2 0 0$ GPa and $\nu = 0 . 3$ . Calculate the Lamé constants $\lambda$ and $G$ .

::: solution
$$
G \; = \; { \frac { E } { 2 \, ( 1 + \nu ) } } \; = \; { \frac { 2 0 0 } { 2 \times 1 . 3 } } \; = \; { \bf 7 6 . 9 } \ \text{GPa}
$$

$$
\lambda \; = \; { \frac { E \, \nu } { ( 1 + \nu ) \, ( 1 - 2 \, \nu ) } } \; = \; { \frac { 2 0 0 \times 0 . 3 } { 1 . 3 \times 0 . 4 } } \; = \; { \frac { 6 0 } { 0 . 5 2 } } \; = \; { \bf 1 1 5 . 4 } \ \text{GPa}
$$

**The Lamé constants are $\lambda = 1 1 5 . 4$ GPa and $G = 7 6 . 9$ GPa.**
:::
:::

::: exercise Volumetric strain {#ex-volumetric-ex level=3 check="2"}
A steel component ($E = 2 0 0$ GPa, $\nu = 0 . 3$ ) is subjected to $\sigma _ { x x } = 2 0 0$ MPa, $\sigma _ { y y } = 1 50$ MPa, and $\sigma _ { z z } = 1 00$ MPa. Calculate the volumetric strain.

::: solution
$$
e \; = \; \varepsilon _ { x x } + \varepsilon _ { y y } + \varepsilon _ { z z } \; = \; { \frac { 1 - 2 \, \nu } { E } } \, ( \sigma _ { x x } + \sigma _ { y y } + \sigma _ { z z } )
$$

$$
e \; = \; { \frac { 1 - 0 . 6 } { 2 0 0 \ 0 0 0 } } \, ( 2 0 0 + 1 5 0 + 1 0 0 ) \; = \; { \frac { 0 . 4 } { 2 0 0 \ 0 0 0 } } \times 4 5 0 \; = \; { \bf 9 0 0 } \ \mu \varepsilon
$$

**The volumetric strain is 900 με. The volumetric strain is the reason the volume changes, and the volume change is the reason the engineer can calculate the density change.**
:::
:::

::: exercise Incompressible material {#ex-incompressible level=3 check="2"}
A rubber component ($E = 0 . 0 1$ GPa, $\nu = 0 . 4 9 9$ ) is subjected to $\sigma _ { x x } = 1$ MPa, $\sigma _ { y y } = 0$ MPa, and $\sigma _ { z z } = 0$ MPa. Calculate the volumetric strain and comment on the result.

::: solution
$$
e \; = \; { \frac { 1 - 2 \times 0 . 4 9 9 } { 0 . 0 1 \times 1 0 ^ { 6 } } } \times 1 \; = \; { \frac { 0 . 0 0 2 } { 1 0 \ 0 0 0 } } \; = \; { \bf 0 . 2 } \ \mu \varepsilon
$$

**The volumetric strain is 0.2 με, which is almost zero. The rubber is almost incompressible, and the incompressibility is the reason the rubber's volume is conserved under deformation. The engineer who uses the compressible constitutive equation for rubber is not analysing the rubber; they are analysing a compressible material.**
:::
:::

::: exercise Derivation: the generalised Hooke's law {#ex-derive-hookes level=4 check="2"}
Show that the generalised Hooke's law $\varepsilon _ { i j } = ( 1 + \nu ) \, \sigma _ { i j } / E - \nu \, \sigma _ { k k } \, \delta _ { i j } / E$ is derived from the superposition of the three uniaxial stress states. Write the strain $\varepsilon _ { x x }$ in terms of $\sigma _ { x x }$ , $\sigma _ { y y }$ , and $\sigma _ { z z }$ .

::: solution
The superposition of the three uniaxial stress states gives:

**Uniaxial $\sigma _ { x x }$ :**

$$
\varepsilon _ { x x } ^ { ( 1 ) } \; = \; { \frac { \sigma _ { x x } } { E } } \qquad \varepsilon _ { y y } ^ { ( 1 ) } \; = \; - { \frac { \nu \, \sigma _ { x x } } { E } } \qquad \varepsilon _ { z z } ^ { ( 1 ) } \; = \; - { \frac { \nu \, \sigma _ { x x } } { E } }
$$

**Uniaxial $\sigma _ { y y }$ :**

$$
\varepsilon _ { x x } ^ { ( 2 ) } \; = \; - { \frac { \nu \, \sigma _ { y y } } { E } } \qquad \varepsilon _ { y y } ^ { ( 2 ) } \; = \; { \frac { \sigma _ { y y } } { E } } \qquad \varepsilon _ { z z } ^ { ( 2 ) } \; = \; - { \frac { \nu \, \sigma _ { y y } } { E } }
$$

**Uniaxial $\sigma _ { z z }$ :**

$$
\varepsilon _ { x x } ^ { ( 3 ) } \; = \; - { \frac { \nu \, \sigma _ { z z } } { E } } \qquad \varepsilon _ { y y } ^ { ( 3 ) } \; = \; - { \frac { \nu \, \sigma _ { z z } } { E } } \qquad \varepsilon _ { z z } ^ { ( 3 ) } \; = \; { \frac { \sigma _ { z z } } { E } }
$$

**Superposition:**

$$
\varepsilon _ { x x } \; = \; { \frac { 1 } { E } } \, [ \sigma _ { x x } - \nu \, ( \sigma _ { y y } + \sigma _ { z z } ) ]
$$

**The generalised Hooke's law is the reason the engineer can calculate the strain from the stress in three dimensions, and the calculation is the reason the component is safe.** $\blacksquare$
:::
:::

::: exercise Derivation: the biharmonic equation {#ex-derive-biharmonic level=4 check="2"}
Show that the biharmonic equation $\nabla ^ { 4 } \Phi = 0$ is derived from the compatibility equation and the Airy stress function definition. Write the compatibility equation for plane stress.

::: solution
The compatibility equation for plane stress is:

$$
{ \frac { \partial ^ { 2 } \varepsilon _ { x x } } { \partial y ^ { 2 } } } + { \frac { \partial ^ { 2 } \varepsilon _ { y y } } { \partial x ^ { 2 } } } \; = \; { \frac { \partial ^ { 2 } \gamma _ { x y } } { \partial x \, \partial y } }
$$

Substituting the plane stress constitutive equations:

$$
\varepsilon _ { x x } \; = \; { \frac { 1 } { E } } \, ( \sigma _ { x x } - \nu \, \sigma _ { y y } ) \qquad \varepsilon _ { y y } \; = \; { \frac { 1 } { E } } \, ( \sigma _ { y y } - \nu \, \sigma _ { x x } ) \qquad \gamma _ { x y } \; = \; { \frac { \tau _ { x y } } { G } }
$$

Substituting the Airy stress function definitions:

$$
\sigma _ { x x } \; = \; { \frac { \partial ^ { 2 } \Phi } { \partial y ^ { 2 } } } \qquad \sigma _ { y y } \; = \; { \frac { \partial ^ { 2 } \Phi } { \partial x ^ { 2 } } } \qquad \tau _ { x y } \; = \; - { \frac { \partial ^ { 2 } \Phi } { \partial x \, \partial y } }
$$

After substitution and simplification (using $G = E / [ 2 ( 1 + \nu ) ]$ ):

$$
\nabla ^ { 4 } \Phi \; = \; { \frac { \partial ^ { 4 } \Phi } { \partial x ^ { 4 } } } + 2 \, { \frac { \partial ^ { 4 } \Phi } { \partial x ^ { 2 } \, \partial y ^ { 2 } } } + { \frac { \partial ^ { 4 } \Phi } { \partial y ^ { 4 } } } \; = \; 0
$$

**The biharmonic equation is the reason the Airy stress function is the most elegant method in two-dimensional elasticity, and the elegance is the reason the Airy stress function is the most widely used method in two-dimensional elasticity.** $\blacksquare$
:::
:::

::: quiz Linear elasticity {#quiz-elasticity}
The generalised Hooke's law relates:

- [ ] The stress tensor to the displacement vector
- [x] The stress tensor to the strain tensor
- [ ] The strain tensor to the displacement vector
- [ ] The traction vector to the displacement vector

::: solution
**The stress tensor to the strain tensor.** The generalised Hooke's law is the constitutive equation for the linear elastic, isotropic solid, and the constitutive equation relates the stress tensor to the strain tensor. The engineer who uses the uniaxial Hooke's law for a three-dimensional stress state is not using the generalised Hooke's law; they are using the wrong constitutive equation.
:::
:::

::: quiz Airy stress function {#quiz-airy}
The Airy stress function automatically satisfies:

- [ ] The compatibility equations
- [x] The equilibrium equations
- [ ] The boundary conditions
- [ ] The constitutive equations

::: solution
**The equilibrium equations.** The Airy stress function is defined such that the equilibrium equations are automatically satisfied, and the automatic satisfaction is the reason the Airy stress function is the most elegant method in two-dimensional elasticity. The compatibility equation requires that the Airy stress function satisfies the biharmonic equation.
:::
:::

## Where this lesson leads

- **[[solid-mechanics/energy-methods]]** — The strain energy is calculated from the stress and strain tensors.
- **[[solid-mechanics/thick-cylinders-discs]]** — The Lamé solution is a special case of the linear elasticity solution.
- **[[solid-mechanics/thin-walled-structures]]** — The thin-walled structure analysis uses the plane stress assumption.
- **[[solid-mechanics/plates]]** — The plate theory uses the plane stress assumption.
- **[[solid-mechanics/plasticity]]** — The plasticity theory extends the linear elasticity theory to the post-yield regime.
- **[[solid-mechanics/fracture-mechanics]]** — The stress intensity factor is calculated from the linear elasticity solution near the crack tip.
- **[[solid-mechanics/composites]]** — The composite laminate analysis uses the plane stress assumption.
- **[[finite-element-method/plane-elements]]** — The finite element method uses the linear elasticity constitutive equation.
- **[[mechanics-of-materials/stress-transformation]]** — The stress transformation is a special case of the tensor transformation.
- **[[machine-design/static-failure]]** — The failure theories (Tresca, von Mises) are functions of the stress tensor invariants.

::: history Linear elasticity: from Hooke to the Airy stress function {#history-elasticity}
**1678** — **Robert Hooke** publishes the **law of elasticity** ("ut tensio, sic vis"), which states that the force is proportional to the deflection. **Hooke's law is the reason the engineer can calculate the stress from the strain, and the calculation is the reason the component is safe.**

**1821** — **Claude-Louis Navier** publishes the **equations of elasticity**, the partial differential equations that the displacement field must satisfy. **Navier's equations are the reason the engineer can solve the boundary-value problem of elasticity, and the solution is the reason the component is safe.**

**1822** — **Augustin-Louis Cauchy** publishes the **stress tensor** and the **equilibrium equations**, the mathematical framework for the three-dimensional stress analysis. **Cauchy's stress tensor is the reason the engineer can predict the failure in three dimensions, and the prediction is the reason the component is safe.**

**1829** — **Siméon Denis Poisson** publishes the **Poisson ratio**, which relates the lateral strain to the axial strain. **The Poisson ratio is the reason the engineer can calculate the lateral strain from the axial strain, and the calculation is the reason the component is safe.**

**1850** — **George Gabriel Stokes** publishes the **constitutive equation** for the linear elastic solid, which relates the stress tensor to the strain tensor. **The constitutive equation is the reason the engineer can calculate the stress from the strain, and the calculation is the reason the component is safe.**

**1870** — **George Biddell Airy** publishes the **Airy stress function**, the scalar function that automatically satisfies the equilibrium equations. **The Airy stress function is the reason the equilibrium equations are automatically satisfied, and the automatic satisfaction is the reason the Airy stress function is the most elegant method in two-dimensional elasticity.**

**1907** — **The photoelasticity method** is developed, which makes the experimental stress analysis practical. **The photoelasticity method is the reason the engineer can visualise the stress field, and the visualisation is the reason the engineer can verify the stress analysis.**

**1941** — **The finite difference method** is applied to the elasticity problem, which makes the numerical solution of the boundary-value problem practical. **The finite difference method is the reason the engineer can solve the boundary-value problem for complex geometries, and the solution is the reason the component is safe.**
:::

::: summary Linear elasticity {#summary-elasticity}
- **The generalised Hooke's law is the constitutive equation for the linear elastic, isotropic solid: $\varepsilon _ { i j } = ( 1 + \nu ) \, \sigma _ { i j } / E - \nu \, \sigma _ { k k } \, \delta _ { i j } / E$ .** The generalised Hooke's law is the reason the engineer can calculate the stress from the strain in three dimensions, and the calculation is the reason the component is safe.
- **The boundary-value problem of elasticity consists of the equilibrium equations, the strain-displacement relations, the constitutive equations, and the boundary conditions.** The boundary conditions are the reason the solution is unique, and the uniqueness is the reason the engineer can trust the solution.
- **The plane stress formulation assumes $\sigma _ { z z } = 0$ , and the plane strain formulation assumes $\varepsilon _ { z z } = 0$ .** The plane stress assumption is the reason the thin plate analysis is simple, and the simplicity is the reason the thin plate analysis is the most widely used analysis in structural engineering.
- **The Airy stress function is the scalar function that automatically satisfies the equilibrium equations.** The Airy stress function is the reason the equilibrium equations are automatically satisfied, and the automatic satisfaction is the reason the Airy stress function is the most elegant method in two-dimensional elasticity.
- **The biharmonic equation $\nabla ^ { 4 } \Phi = 0$ is the compatibility equation expressed in terms of the Airy stress function.** The biharmonic equation is the reason the Airy stress function is the most elegant method in two-dimensional elasticity, and the elegance is the reason the Airy stress function is the most widely used method in two-dimensional elasticity.
- **The Lamé constants $\lambda$ and $G$ are the material parameters in the constitutive equation.** The Lamé constants are the reason the engineer can calculate the stress from the strain, and the calculation is the reason the component is safe.
- **The volumetric strain is the reason the volume changes, and the deviatoric strain is the reason the shape changes.** The decomposition into volumetric and deviatoric parts is the reason the engineer can separate the volume change from the shape change.
- **The incompressible material has $\nu = 0 . 5$ , which means the volumetric strain is zero.** The incompressibility is the reason the rubber's volume is conserved under deformation, and the conservation is the reason the rubber is modelled as incompressible.
- **The uniqueness theorem states that the solution to the boundary-value problem is unique.** The uniqueness theorem is the reason the engineer can trust the solution, and the trust is the reason the engineer can design the component.
- **The superposition principle is the reason the engineer can solve the boundary-value problem by adding the solutions to simpler problems.** The superposition is the reason the problem is simpler, and the simplicity is the reason the engineer can solve the problem by hand.
:::

## Further reading

- **Stephen P. Timoshenko and James N. Goodier (1970)** — *Theory of Elasticity*, 3rd ed. McGraw-Hill. The generalised Hooke's law, the boundary-value problem, and the Airy stress function.
- **Y. Fung (1965)** — *A First Course in Continuum Mechanics*. Prentice-Hall. The constitutive equation, the boundary-value problem, and the uniqueness theorem.
- **A.E.H. Love (1944)** — *A Treatise on the Mathematical Theory of Elasticity*, 4th ed. Cambridge University Press. The classical treatment of linear elasticity.
- **Morris Dolph (1977)** — *Mechanics of Materials*. Wiley. The generalised Hooke's law and the plane stress/plane strain formulations.
- **S.P. Timoshenko and J.N. Goodier (1987)** — *Theory of Elasticity*, 3rd ed. McGraw-Hill. The Airy stress function and the biharmonic equation.
- **L.E. Malvern (1969)** — *Introduction to the Mechanics of a Continuous Medium*. Prentice-Hall. The boundary-value problem and the uniqueness theorem.
- **SC Mal and G. Singh (1991)** — *Continuum Mechanics of Composite Materials*. Kluwer. The linear elasticity theory in the composite context.
- **Thomas J.R. Hughes (2012)** — *The Finite Element Method: Linear Static and Dynamic Finite Element Analysis*. Dover. The linear elasticity theory in the finite element context.
