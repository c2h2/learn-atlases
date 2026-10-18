The stress tensor is the most fundamental object in solid mechanics: the stress tensor is the mathematical object that contains the complete state of stress at a point, and the complete state of stress is the reason the engineer can predict the failure of any component, in any orientation, under any load. **The engineer who thinks in terms of uniaxial stress is not thinking in three dimensions; they are thinking in one dimension, and the one-dimensional thinking is the reason the component fails in the direction the engineer did not consider.** The stress tensor is the reason the engineer can predict the failure in three dimensions, and the prediction is the reason the component is safe.

The quantitative tools of three-dimensional stress and strain are the **Cauchy stress tensor** (the nine components of stress at a point), the **equilibrium equations** (the three partial differential equations that the stress components must satisfy), the **small-strain tensor** (the six components of strain at a point), the **compatibility equations** (the six partial differential equations that the strain components must satisfy), the **principal stresses** (the eigenvalues of the stress tensor), and the **strain-gauge rosette** (the experimental technique for measuring the strain tensor). The tools are the language in which the three-dimensional stress and strain analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways three-dimensional stress and strain analysis goes wrong
**Not using the stress tensor.** The engineer who thinks in terms of uniaxial stress is not thinking in three dimensions; they are thinking in one dimension. **The stress tensor is the reason the engineer can predict the failure in three dimensions, and the prediction is the reason the component is safe.** **Not checking the equilibrium.** The engineer who calculates the stress components without checking the equilibrium equations is not calculating the stress; they are guessing. **The equilibrium equations are the reason the stress components are physically meaningful, and the physical meaning is the reason the stress analysis is correct.** **Not checking the compatibility.** The engineer who calculates the strain components without checking the compatibility equations is not calculating the strain; they are guessing. **The compatibility equations are the reason the strain components are physically meaningful, and the physical meaning is the reason the strain analysis is correct.** **Not finding the principal stresses.** The engineer who uses the stress components without finding the principal stresses is not analysing the stress; they are looking at the stress in the wrong coordinate system. **The principal stresses are the reason the engineer can apply the failure theories (Tresca, von Mises), and the failure theories are the reason the component is safe.** **Not using the strain-gauge rosette.** The engineer who measures the strain with a single gauge is not measuring the strain tensor; they are measuring one component of the strain tensor. **The strain-gauge rosette is the reason the engineer can measure the complete strain tensor, and the complete strain tensor is the reason the engineer can calculate the complete stress tensor.** **Not accounting for the plane stress.** The engineer who uses the three-dimensional stress tensor for a thin plate is not analysing the plate; they are analysing a three-dimensional solid. **The plane stress assumption is the reason the thin plate analysis is simple, and the simplicity is the reason the thin plate analysis is the most widely used analysis in structural engineering.** **Not accounting for the plane strain.** The engineer who uses the three-dimensional strain tensor for a long dam is not analysing the dam; they are analysing a three-dimensional solid. **The plane strain assumption is the reason the long structure analysis is simple, and the simplicity is the reason the long structure analysis is the most widely used analysis in geotechnical engineering.** **Not accounting for the stress concentration.** The engineer who calculates the nominal stress without the stress concentration factor is not calculating the stress; they are calculating the average stress. **The stress concentration factor is the reason the peak stress is 2–5 times the nominal stress, and the peak stress is the reason the component fails at the notch, not at the nominal section.** **Not accounting for the tensor transformation.** The engineer who uses the stress components in the wrong coordinate system is not analysing the stress; they are analysing the stress in the wrong orientation. **The tensor transformation is the reason the engineer can calculate the stress in any orientation, and the orientation is the reason the engineer can find the maximum shear stress and the principal stresses.**
:::

## 1. The Cauchy stress tensor

::: definition The Cauchy stress tensor {#def-cauchy-stress}
The **Cauchy stress tensor** is the second-order tensor that contains the complete state of stress at a point:

$$
{ \boldsymbol { \sigma } } \; = \; { \left[ \begin{array} { l l l } { \sigma _ { x x } } & { \tau _ { x y } } & { \tau _ { x z } } \\ { \tau _ { y x } } & { \sigma _ { y y } } & { \tau _ { y z } } \\ { \tau _ { z x } } & { \tau _ { z y } } & { \sigma _ { z z } } \end{array} \right] }
$$

where $\sigma _ { i i }$ are the normal stresses and $\tau _ { i j }$ are the shear stresses. The stress tensor is symmetric: $\tau _ { i j } = \tau _ { j i }$ , which means the stress tensor has **six independent components**.

The **traction vector** (the stress on a plane with normal $\mathbf { n }$ ) is:

$$
T _ { i } \; = \; \sigma _ { i j } \, n _ { j }
$$

The **equilibrium equations** (in the absence of body forces) are:

$$
{ \frac { \partial \sigma _ { x x } } { \partial x } } + { \frac { \partial \tau _ { x y } } { \partial y } } + { \frac { \partial \tau _ { x z } } { \partial z } } \; = \; 0
$$

$$
{ \frac { \partial \tau _ { y x } } { \partial x } } + { \frac { \partial \sigma _ { y y } } { \partial y } } + { \frac { \partial \tau _ { y z } } { \partial z } } \; = \; 0
$$

$$
{ \frac { \partial \tau _ { z x } } { \partial x } } + { \frac { \partial \tau _ { z y } } { \partial y } } + { \frac { \partial \sigma _ { z z } } { \partial z } } \; = \; 0
$$

**The Cauchy stress tensor is the reason the engineer can predict the failure in three dimensions, and the prediction is the reason the component is safe. The engineer who thinks in terms of uniaxial stress is not thinking in three dimensions; they are thinking in one dimension, and the one-dimensional thinking is the reason the component fails in the direction the engineer did not consider.**
:::

::: definition The principal stresses and the stress invariants {#def-principal-stresses}
The **principal stresses** are the eigenvalues of the stress tensor, and the principal stresses are the normal stresses on the planes where the shear stress is zero.

$$
\det ( { \boldsymbol { \sigma } } - \sigma \, \mathbf { I } ) \; = \; 0
$$

$$
\sigma ^ { 3 } - I _ { 1 } \, \sigma ^ { 2 } + I _ { 2 } \, \sigma - I _ { 3 } \; = \; 0
$$

where the **stress invariants** are:

$$
I _ { 1 } \; = \; \sigma _ { x x } + \sigma _ { y y } + \sigma _ { z z } \; = \; \text{tr} ( { \boldsymbol { \sigma } } )
$$

$$
I _ { 2 } \; = \; \sigma _ { x x } \, \sigma _ { y y } + \sigma _ { y y } \, \sigma _ { z z } + \sigma _ { z z } \, \sigma _ { x x } - \tau _ { x y } ^ { 2 } - \tau _ { y z } ^ { 2 } - \tau _ { z x } ^ { 2 }
$$

$$
I _ { 3 } \; = \; \det ( { \boldsymbol { \sigma } } )
$$

The **maximum shear stress** is:

$$
\tau _ { \max } \; = \; { \frac { \sigma _ { 1 } - \sigma _ { 3 } } { 2 } }
$$

**The principal stresses are the reason the engineer can apply the failure theories (Tresca, von Mises), and the failure theories are the reason the component is safe. The engineer who uses the stress components without finding the principal stresses is not analysing the stress; they are looking at the stress in the wrong coordinate system.**
:::

::: widget plot
title: The principal stress directions vs the applied stress ratio
f: 0.5*atan(2*x/(1-x)); 0.5*atan(2*x/(1-x))+90
x: 0,5
y: -5,95
labels: theta_p1; theta_p2
caption: The principal stress directions against the applied stress ratio $\sigma _ { y } / \sigma _ { x }$ . **The principal stress directions are the reason the engineer can find the maximum shear stress, and the maximum shear stress is the reason the engineer can apply the Tresca failure criterion.** **The principal stress directions are 90° apart, and the 90° is the reason the principal stresses are orthogonal.**
:::

::: example Principal stresses {#ex-principal-stresses level=3 check="2"}
A stress tensor is given by $\sigma _ { x x } = 1 0 0$ MPa, $\sigma _ { y y } = 4 0$ MPa, $\tau _ { x y } = 3 0$ MPa, and all other components are zero. Calculate the principal stresses and the maximum shear stress.

**Stress invariants:**

$$
I _ { 1 } \; = \; 1 0 0 + 4 0 + 0 \; = \; 1 4 0 \ \text{MPa}
$$

$$
I _ { 2 } \; = \; 1 0 0 \times 4 0 + 0 + 0 - 3 0 ^ { 2 } - 0 - 0 \; = \; 4 \ 0 0 0 - 9 0 0 \; = \; 3 \ 1 0 0 \ \text{MPa} ^ { 2 }
$$

$$
I _ { 3 } \; = \; 1 0 0 \times 4 0 \times 0 + 2 \times 3 0 \times 0 \times 0 - 1 0 0 \times 0 - 4 0 \times 0 - 0 \; = \; 0
$$

**Characteristic equation:**

$$
\sigma ^ { 3 } - 1 4 0 \, \sigma ^ { 2 } + 3 \ 1 0 0 \, \sigma \; = \; 0
$$

$$
\sigma \, ( \sigma ^ { 2 } - 1 4 0 \, \sigma + 3 \ 1 0 0 ) \; = \; 0
$$

**Solving the quadratic:**

$$
\sigma \; = \; { \frac { 1 4 0 \pm { \sqrt { 1 4 0 ^ { 2 } - 4 \times 3 \ 1 0 0 } } } { 2 } } \; = \; { \frac { 1 4 0 \pm { \sqrt { 1 9 \ 6 0 0 - 1 2 \ 4 0 0 } } } { 2 } } \; = \; { \frac { 1 4 0 \pm { \sqrt { 7 \ 2 0 0 } } } { 2 } }
$$

$$
\sigma \; = \; { \frac { 1 4 0 \pm 8 4 . 8 5 } { 2 } }
$$

$$
\sigma _ { 1 } \; = \; { \frac { 1 4 0 + 8 4 . 8 5 } { 2 } } \; = \; { \bf 1 1 2 . 4 } \ \text{MPa}
$$

$$
\sigma _ { 2 } \; = \; { \frac { 1 4 0 - 8 4 . 8 5 } { 2 } } \; = \; { \bf 2 7 . 6 } \ \text{MPa}
$$

$$
\sigma _ { 3 } \; = \; { \bf 0 } \ \text{MPa}
$$

**Maximum shear stress:**

$$
\tau _ { \max } \; = \; { \frac { 1 1 2 . 4 - 0 } { 2 } } \; = \; { \bf 5 6 . 2 } \ \text{MPa}
$$

**The principal stresses are 112.4 MPa, 27.6 MPa, and 0 MPa. The maximum shear stress is 56.2 MPa. The engineer would use the Tresca criterion to check the failure: $\tau _ { \max } = 5 6 . 2$ MPa vs $S _ { y } / 2$ .**
:::

## 2. The strain tensor and compatibility

::: definition The small-strain tensor {#def-strain-tensor}
The **small-strain tensor** is the second-order tensor that contains the complete state of strain at a point:

$$
{ \boldsymbol { \varepsilon } } \; = \; { \left[ \begin{array} { l l l } { \varepsilon _ { x x } } & { \varepsilon _ { x y } } & { \varepsilon _ { x z } } \\ { \varepsilon _ { y x } } & { \varepsilon _ { y y } } & { \varepsilon _ { y z } } \\ { \varepsilon _ { z x } } & { \varepsilon _ { z y } } & { \varepsilon _ { z z } } \end{array} \right] }
$$

where the strain components are defined in terms of the displacement gradients:

$$
\varepsilon _ { i j } \; = \; { \frac { 1 } { 2 } } \, { \frac { \partial u _ { i } } { \partial x _ { j } } } + { \frac { 1 } { 2 } } \, { \frac { \partial u _ { j } } { \partial x _ { i } } }
$$

The **volumetric strain** (the dilatation) is:

$$
e \; = \; \varepsilon _ { x x } + \varepsilon _ { y y } + \varepsilon _ { z z } \; = \; \text{tr} ( { \boldsymbol { \varepsilon } } )
$$

The **deviatoric strain** (the shape change) is:

$$
e _ { i j } \; = \; \varepsilon _ { i j } - { \frac { 1 } { 3 } } \, e \, \delta _ { i j }
$$

**The strain tensor is the reason the engineer can calculate the deformation of the component, and the deformation is the reason the component fits together. The engineer who calculates the stress without calculating the strain is not analysing the component; they are analysing the force.**
:::

::: definition The compatibility equations {#def-compatibility}
The **compatibility equations** are the six partial differential equations that the strain components must satisfy for the displacement field to be single-valued and continuous:

$$
{ \frac { \partial ^ { 2 } \varepsilon _ { x x } } { \partial y ^ { 2 } } } + { \frac { \partial ^ { 2 } \varepsilon _ { y y } } { \partial x ^ { 2 } } } \; = \; 2 \, { \frac { \partial ^ { 2 } \varepsilon _ { x y } } { \partial x \, \partial y } }
$$

$$
{ \frac { \partial ^ { 2 } \varepsilon _ { y y } } { \partial z ^ { 2 } } } + { \frac { \partial ^ { 2 } \varepsilon _ { z z } } { \partial y ^ { 2 } } } \; = \; 2 \, { \frac { \partial ^ { 2 } \varepsilon _ { y z } } { \partial y \, \partial z } }
$$

$$
{ \frac { \partial ^ { 2 } \varepsilon _ { z z } } { \partial x ^ { 2 } } } + { \frac { \partial ^ { 2 } \varepsilon _ { x x } } { \partial z ^ { 2 } } } \; = \; 2 \, { \frac { \partial ^ { 2 } \varepsilon _ { z x } } { \partial z \, \partial x } }
$$

$$
{ \frac { \partial ^ { 2 } } { \partial y \, \partial z } } \, ( - \varepsilon _ { x x } + \varepsilon _ { y y } + \varepsilon _ { z z } ) \; = \; { \frac { \partial ^ { 2 } \varepsilon _ { y z } } { \partial x ^ { 2 } } } + { \frac { \partial } { \partial x } } \, ( - { \frac { \partial \varepsilon _ { z x } } { \partial y } } + { \frac { \partial \varepsilon _ { x y } } { \partial z } } )
$$

(and two more similar equations)

**The compatibility equations are the reason the strain components are physically meaningful, and the physical meaning is the reason the strain analysis is correct. The engineer who calculates the strain components without checking the compatibility equations is not calculating the strain; they are guessing.**
:::

::: definition The strain-gauge rosette {#def-strain-rosette}
The **strain-gauge rosette** is the experimental technique for measuring the complete strain tensor at a point. The rosette consists of three strain gauges oriented at 0°, 45°, and 90° (or 0°, 60°, and 120°).

For the 0°/45°/90° rosette:

$$
\varepsilon _ { x x } \; = \; \varepsilon _ { 0 ^ { \circ } } \qquad \varepsilon _ { y y } \; = \; \varepsilon _ { 9 0 ^ { \circ } }
$$

$$
\varepsilon _ { x y } \; = \; 2 \, \varepsilon _ { 4 5 ^ { \circ } } - \varepsilon _ { 0 ^ { \circ } } - \varepsilon _ { 9 0 ^ { \circ } }
$$

For the 0°/60°/120° rosette:

$$
\varepsilon _ { x x } \; = \; { \frac { 1 } { 3 } } \, ( 2 \, \varepsilon _ { 0 ^ { \circ } } - \varepsilon _ { 6 0 ^ { \circ } } - \varepsilon _ { 1 2 0 ^ { \circ } } )
$$

$$
\varepsilon _ { y y } \; = \; { \frac { 1 } { { \sqrt { 3 } } } } \, ( \varepsilon _ { 6 0 ^ { \circ } } - \varepsilon _ { 1 2 0 ^ { \circ } } )
$$

$$
\varepsilon _ { x y } \; = \; { \frac { 2 } { { \sqrt { 3 } } } } \, ( \varepsilon _ { 6 0 ^ { \circ } } + \varepsilon _ { 1 2 0 ^ { \circ } } - 2 \, \varepsilon _ { 0 ^ { \circ } } ) \times { \frac { 1 } { 2 } }
$$

**The strain-gauge rosette is the reason the engineer can measure the complete strain tensor, and the complete strain tensor is the reason the engineer can calculate the complete stress tensor. The engineer who measures the strain with a single gauge is not measuring the strain tensor; they are measuring one component of the strain tensor.**
:::

::: widget plot
title: The strain-gauge rosette: measured strain vs gauge orientation
f: 500+300*cos(2*x*3.14159/180)+200*sin(2*x*3.14159/180)
x: 0,180
y: 0,1200
labels: epsilon_theta
caption: The measured strain against the gauge orientation for a two-dimensional strain state. **The strain varies sinusoidally with the gauge orientation, and the sinusoidal variation is the reason the engineer can determine the complete strain tensor from three measurements. The strain-gauge rosette is the reason the engineer can measure the complete strain tensor, and the complete strain tensor is the reason the engineer can calculate the complete stress tensor.**
:::

::: example Strain-gauge rosette {#ex-strain-rosette level=3 check="2"}
A 0°/45°/90° strain-gauge rosette measures $\varepsilon _ { 0 ^ { \circ } } = 5 0 0 ~ \mu \varepsilon$ , $\varepsilon _ { 4 5 ^ { \circ } } = 7 0 0 ~ \mu \varepsilon$ , and $\varepsilon _ { 9 0 ^ { \circ } } = 3 0 0 ~ \mu \varepsilon$ . Calculate the strain tensor components and the principal strains.

**Strain tensor components:**

$$
\varepsilon _ { x x } \; = \; 5 0 0 \ \mu \varepsilon
$$

$$
\varepsilon _ { y y } \; = \; 3 0 0 \ \mu \varepsilon
$$

$$
\varepsilon _ { x y } \; = \; 2 \times 7 0 0 - 5 0 0 - 3 0 0 \; = \; 1 \ 4 0 0 - 8 0 0 \; = \; 6 0 0 \ \mu \varepsilon
$$

**Principal strains:**

$$
\varepsilon _ { 1 , 2 } \; = \; { \frac { \varepsilon _ { x x } + \varepsilon _ { y y } } { 2 } } \pm { \sqrt { ( { \frac { \varepsilon _ { x x } - \varepsilon _ { y y } } { 2 } } ) ^ { 2 } + \varepsilon _ { x y } ^ { 2 } } }
$$

$$
\varepsilon _ { 1 , 2 } \; = \; { \frac { 5 0 0 + 3 0 0 } { 2 } } \pm { \sqrt { ( { \frac { 5 0 0 - 3 0 0 } { 2 } } ) ^ { 2 } + 6 0 0 ^ { 2 } } } \; = \; 4 0 0 \pm { \sqrt { 1 0 \ 0 0 0 + 3 6 0 \ 0 0 0 } }
$$

$$
\varepsilon _ { 1 , 2 } \; = \; 4 0 0 \pm { \sqrt { 3 7 0 \ 0 0 0 } } \; = \; 4 0 0 \pm 6 0 8 . 3
$$

$$
\varepsilon _ { 1 } \; = \; 4 0 0 + 6 0 8 . 3 \; = \; { \bf 1 \ 0 0 8 } \ \mu \varepsilon
$$

$$
\varepsilon _ { 2 } \; = \; 4 0 0 - 6 0 8 . 3 \; = \; { \bf - 2 0 8 } \ \mu \varepsilon
$$

**The principal strains are 1 008 με and -208 με. The engineer would use Hooke's law to calculate the principal stresses from the principal strains.**
:::

## 3. Plane stress and plane strain

::: definition Plane stress and plane strain {#def-plane-stress-strain}
The **plane stress** state is the stress state in which one of the normal stresses and two of the shear stresses are zero:

$$
\sigma _ { z z } \; = \; \tau _ { x z } \; = \; \tau _ { y z } \; = \; 0
$$

The **plane strain** state is the strain state in which one of the normal strains and two of the shear strains are zero:

$$
\varepsilon _ { z z } \; = \; \varepsilon _ { x z } \; = \; \varepsilon _ { y z } \; = \; 0
$$

$$
\begin{array} { l c c }
\textbf{Condition} & \textbf{Stress state} & \textbf{Use case} \\ \hline
\text{Plane stress} & \sigma _ { z z } = 0 & \text{Thin plate, membrane} \\
\text{Plane strain} & \varepsilon _ { z z } = 0 & \text{Long dam, long cylinder} \\
\text{Axisymmetric} & \tau _ { r \theta } = 0 & \text{Pressure vessel, rotating disc} \\
\end{array}
$$

**The plane stress assumption is the reason the thin plate analysis is simple, and the simplicity is the reason the thin plate analysis is the most widely used analysis in structural engineering. The plane strain assumption is the reason the long structure analysis is simple, and the simplicity is the reason the long structure analysis is the most widely used analysis in geotechnical engineering.**
:::

::: example Plane stress vs plane strain {#ex-plane-stress-strain level=3 check="2"}
A steel plate ($E = 2 0 0$ GPa, $\nu = 0 . 3$ ) is subjected to $\sigma _ { x x } = 2 0 0$ MPa and $\sigma _ { y y } = 1 0 0$ MPa. Calculate $\varepsilon _ { x x }$ , $\varepsilon _ { y y }$ , and $\varepsilon _ { z z }$ for (a) plane stress and (b) plane strain.

**(a) Plane stress ($\sigma _ { z z } = 0$ ):**

$$
\varepsilon _ { x x } \; = \; { \frac { 1 } { E } } \, ( \sigma _ { x x } - \nu \, \sigma _ { y y } ) \; = \; { \frac { 1 } { 2 0 0 \ 0 0 0 } } \, ( 2 0 0 - 0 . 3 \times 1 0 0 ) \; = \; { \frac { 1 7 0 } { 2 0 0 \ 0 0 0 } } \; = \; { \bf 8 5 0 } \ \mu \varepsilon
$$

$$
\varepsilon _ { y y } \; = \; { \frac { 1 } { E } } \, ( \sigma _ { y y } - \nu \, \sigma _ { x x } ) \; = \; { \frac { 1 } { 2 0 0 \ 0 0 0 } } \, ( 1 0 0 - 0 . 3 \times 2 0 0 ) \; = \; { \frac { 4 0 } { 2 0 0 \ 0 0 0 } } \; = \; { \bf 2 0 0 } \ \mu \varepsilon
$$

$$
\varepsilon _ { z z } \; = \; - { \frac { \nu } { E } } \, ( \sigma _ { x x } + \sigma _ { y y } ) \; = \; - { \frac { 0 . 3 } { 2 0 0 \ 0 0 0 } } \, ( 2 0 0 + 1 0 0 ) \; = \; { \bf - 4 5 0 } \ \mu \varepsilon
$$

**(b) Plane strain ($\varepsilon _ { z z } = 0$ ):**

$$
\sigma _ { z z } \; = \; \nu \, ( \sigma _ { x x } + \sigma _ { y y } ) \; = \; 0 . 3 \times ( 2 0 0 + 1 0 0 ) \; = \; 9 0 \ \text{MPa}
$$

$$
\varepsilon _ { x x } \; = \; { \frac { 1 } { E } } \, [ \sigma _ { x x } - \nu \, ( \sigma _ { y y } + \sigma _ { z z } ) ] \; = \; { \frac { 1 } { 2 0 0 \ 0 0 0 } } \, [ 2 0 0 - 0 . 3 \times ( 1 0 0 + 9 0 ) ] \; = \; { \frac { 1 4 3 } { 2 0 0 \ 0 0 0 } } \; = \; { \bf 7 1 5 } \ \mu \varepsilon
$$

$$
\varepsilon _ { y y } \; = \; { \frac { 1 } { E } } \, [ \sigma _ { y y } - \nu \, ( \sigma _ { x x } + \sigma _ { z z } ) ] \; = \; { \frac { 1 } { 2 0 0 \ 0 0 0 } } \, [ 1 0 0 - 0 . 3 \times ( 2 0 0 + 9 0 ) ] \; = \; { \frac { 1 3 } { 2 0 0 \ 0 0 0 } } \; = \; { \bf 6 5 } \ \mu \varepsilon
$$

**The plane strain condition produces smaller in-plane strains than the plane stress condition, because the constraint in the z-direction increases the stiffness. The engineer who uses the plane stress assumption for a long dam is not analysing the dam; they are analysing a thin plate.**
:::

::: example Tensor transformation {#ex-tensor-transformation level=3 check="2"}
A stress tensor is given by $\\sigma _ { x x } = 1 0 0$ MPa, $\\sigma _ { y y } = 4 0$ MPa, $\\tau _ { x y } = 3 0$ MPa. Calculate the stress components on a plane oriented at $\\theta = 3 0 ^ { \\circ }$ from the x-axis.

**Transformation equations:**

$$
\\sigma _ { x ^ { \\prime } x ^ { \\prime } } \\; = \\; \\sigma _ { x x } \\cos ^ { 2 } \\theta + \\sigma _ { y y } \\sin ^ { 2 } \\theta + 2 \\, \\tau _ { x y } \\sin \\theta \\cos \\theta
$$

$$
\\sigma _ { x ^ { \\prime } x ^ { \\prime } } \\; = \\; 1 0 0 \\times ( 0 . 8 6 6 ) ^ { 2 } + 4 0 \\times ( 0 . 5 ) ^ { 2 } + 2 \\times 3 0 \\times 0 . 5 \\times 0 . 8 6 6
$$

$$
\\sigma _ { x ^ { \\prime } x ^ { \\prime } } \\; = \\; 1 0 0 \\times 0 . 7 5 + 4 0 \\times 0 . 2 5 + 3 0 \\times 0 . 8 6 6 \\; = \\; 7 5 + 1 0 + 2 5 . 9 8 \\; = \\; { \\bf 1 1 1 } \\ \\text{MPa}
$$

**Shear stress on the rotated plane:**

$$
\\tau _ { x ^ { \\prime } y ^ { \\prime } } \\; = \\; - ( \\sigma _ { x x } - \\sigma _ { y y } ) \\sin \\theta \\cos \\theta + \\tau _ { x y } \\cos 2 \\theta
$$

$$
\\tau _ { x ^ { \\prime } y ^ { \\prime } } \\; = \\; - ( 1 0 0 - 4 0 ) \\times 0 . 5 \\times 0 . 8 6 6 + 3 0 \\times ( 0 . 7 5 - 0 . 2 5 )
$$

$$
\\tau _ { x ^ { \\prime } y ^ { \\prime } } \\; = \\; - 6 0 \\times 0 . 4 3 3 + 3 0 \\times 0 . 5 \\; = \\; - 2 5 . 9 8 + 1 5 \\; = \\; { \\bf - 1 1 } \\ \\text{MPa}
$$

**The normal stress on the rotated plane is 111 MPa, and the shear stress is -11 MPa. The engineer would use the tensor transformation to find the stress in any orientation, and the orientation is the reason the engineer can find the maximum shear stress and the principal stresses.**
:::

## Exercises

::: exercise Stress tensor equilibrium {#ex-equilibrium level=3 check="2"}
A stress field is given by $\sigma _ { x x } = 2 \, x ^ { 2 }$ , $\sigma _ { y y } = 3 \, y ^ { 2 }$ , $\tau _ { x y } = - 4 \, x \, y$ , and all other components are zero. Check whether the stress field satisfies the equilibrium equations (in the absence of body forces).

::: solution
**Equilibrium in the x-direction:**

$$
{ \frac { \partial \sigma _ { x x } } { \partial x } } + { \frac { \partial \tau _ { x y } } { \partial y } } \; = \; 4 \, x + ( - 4 \, x ) \; = \; { \bf 0 } \quad \checkmark
$$

**Equilibrium in the y-direction:**

$$
{ \frac { \partial \tau _ { x y } } { \partial x } } + { \frac { \partial \sigma _ { y y } } { \partial y } } \; = \; - 4 \, y + 6 \, y \; = \; { \bf 2 } \, y \; \ne \; { \bf 0 } \quad \times
$$

**The stress field does not satisfy the equilibrium equations in the y-direction (unless $y = 0$ ). The engineer who uses this stress field is not calculating the stress; they are guessing.**
:::
:::

::: exercise Principal stresses {#ex-principal-ex level=3 check="2"}
A stress tensor is given by $\sigma _ { x x } = 8 0$ MPa, $\sigma _ { y y } = 2 0$ MPa, $\tau _ { x y } = 4 0$ MPa. Calculate the principal stresses and the maximum shear stress.

::: solution
$$
\sigma _ { 1 , 2 } \; = \; { \frac { 8 0 + 2 0 } { 2 } } \pm { \sqrt { ( { \frac { 8 0 - 2 0 } { 2 } } ) ^ { 2 } + 4 0 ^ { 2 } } } \; = \; 5 0 \pm { \sqrt { 9 0 0 + 1 \ 6 0 0 } } \; = \; 5 0 \pm { \sqrt { 2 \ 5 0 0 } }
$$

$$
\sigma _ { 1 } \; = \; 5 0 + 5 0 \; = \; { \bf 1 0 0 } \ \text{MPa}
$$

$$
\sigma _ { 2 } \; = \; 5 0 - 5 0 \; = \; { \bf 0 } \ \text{MPa}
$$

$$
\tau _ { \max } \; = \; { \frac { 1 0 0 - 0 } { 2 } } \; = \; { \bf 5 0 } \ \text{MPa}
$$

**The principal stresses are 100 MPa and 0 MPa. The maximum shear stress is 50 MPa.**
:::
:::

::: exercise Strain-gauge rosette {#ex-rosette-ex level=3 check="2"}
A 0°/45°/90° strain-gauge rosette measures $\varepsilon _ { 0 ^ { \circ } } = 2 0 0 ~ \mu \varepsilon$ , $\varepsilon _ { 4 5 ^ { \circ } } = 4 0 0 ~ \mu \varepsilon$ , and $\varepsilon _ { 9 0 ^ { \circ } } = 1 0 0 ~ \mu \varepsilon$ . Calculate the strain tensor components.

::: solution
$$
\varepsilon _ { x x } \; = \; 2 0 0 \ \mu \varepsilon
$$

$$
\varepsilon _ { y y } \; = \; 1 0 0 \ \mu \varepsilon
$$

$$
\varepsilon _ { x y } \; = \; 2 \times 4 0 0 - 2 0 0 - 1 0 0 \; = \; 8 0 0 - 3 0 0 \; = \; { \bf 5 0 0 } \ \mu \varepsilon
$$

**The strain tensor components are $\varepsilon _ { x x } = 2 0 0 ~ \mu \varepsilon$ , $\varepsilon _ { y y } = 1 0 0 ~ \mu \varepsilon$ , and $\varepsilon _ { x y } = 5 0 0 ~ \mu \varepsilon$ .**
:::
:::

::: exercise Plane stress vs plane strain {#ex-plane-ex level=3 check="2"}
An aluminium plate ($E = 7 0$ GPa, $\nu = 0 . 3 3$ ) is subjected to $\sigma _ { x x } = 1 5 0$ MPa and $\sigma _ { y y } = 5 0$ MPa. Calculate $\varepsilon _ { x x }$ for plane stress and plane strain.

::: solution
**Plane stress:**

$$
\varepsilon _ { x x } \; = \; { \frac { 1 } { 7 0 \ 0 0 0 } } \, ( 1 5 0 - 0 . 3 3 \times 5 0 ) \; = \; { \frac { 1 3 3 . 5 } { 7 0 \ 0 0 0 } } \; = \; { \bf 1 \ 9 0 7 } \ \mu \varepsilon
$$

**Plane strain:**

$$
\sigma _ { z z } \; = \; 0 . 3 3 \times ( 1 5 0 + 5 0 ) \; = \; 6 6 \ \text{MPa}
$$

$$
\varepsilon _ { x x } \; = \; { \frac { 1 } { 7 0 \ 0 0 0 } } \, [ 1 5 0 - 0 . 3 3 \times ( 5 0 + 6 6 ) ] \; = \; { \frac { 1 1 1 . 7 8 } { 7 0 \ 0 0 0 } } \; = \; { \bf 1 \ 5 9 7 } \ \mu \varepsilon
$$

**The plane strain condition produces a smaller strain (1 597 με) than the plane stress condition (1 907 με), because the constraint in the z-direction increases the stiffness.**
:::
:::

::: exercise Stress invariants {#ex-invariants level=3 check="2"}
A stress tensor is given by $\sigma _ { x x } = 5 0$ MPa, $\sigma _ { y y } = 3 0$ MPa, $\sigma _ { z z } = 1 0$ MPa, $\tau _ { x y } = 2 0$ MPa, $\tau _ { y z } = 1 0$ MPa, $\tau _ { z x } = 1 5$ MPa. Calculate the stress invariants $I _ { 1 }$ , $I _ { 2 }$ , and $I _ { 3 }$ .

::: solution
$$
I _ { 1 } \; = \; 5 0 + 3 0 + 1 0 \; = \; { \bf 9 0 } \ \text{MPa}
$$

$$
I _ { 2 } \; = \; 5 0 \times 3 0 + 3 0 \times 1 0 + 1 0 \times 5 0 - 2 0 ^ { 2 } - 1 0 ^ { 2 } - 1 5 ^ { 2 }
$$

$$
I _ { 2 } \; = \; 1 \ 5 0 0 + 3 0 0 + 5 0 0 - 4 0 0 - 1 0 0 - 2 2 5 \; = \; { \bf 1 \ 5 7 5 } \ \text{MPa} ^ { 2 }
$$

$$
I _ { 3 } \; = \; 5 0 \times 3 0 \times 1 0 + 2 \times 2 0 \times 1 0 \times 1 5 - 5 0 \times 1 0 ^ { 2 } - 3 0 \times 1 5 ^ { 2 } - 1 0 \times 2 0 ^ { 2 }
$$

$$
I _ { 3 } \; = \; 1 5 \ 0 0 0 + 6 \ 0 0 0 - 5 \ 0 0 0 - 6 \ 7 5 0 - 4 \ 0 0 0 \; = \; { \bf 5 \ 2 5 0 } \ \text{MPa} ^ { 3 }
$$

**The stress invariants are $I _ { 1 } = 9 0$ MPa, $I _ { 2 } = 1 5 7 5$ MPa², and $I _ { 3 } = 5 2 5 0$ MPa³.**
:::
:::

::: exercise Volumetric and deviatoric strain {#ex-volumetric level=3 check="2"}
A strain tensor is given by $\varepsilon _ { x x } = 3 0 0 ~ \mu \varepsilon$ , $\varepsilon _ { y y } = 2 0 0 ~ \mu \varepsilon$ , $\varepsilon _ { z z } = 1 0 0 ~ \mu \varepsilon$ , and all shear strains are zero. Calculate the volumetric strain and the deviatoric strain components.

::: solution
**Volumetric strain:**

$$
e \; = \; 3 0 0 + 2 0 0 + 1 0 0 \; = \; { \bf 6 0 0 } \ \mu \varepsilon
$$

**Deviatoric strain components:**

$$
e _ { x x } \; = \; 3 0 0 - { \frac { 6 0 0 } { 3 } } \; = \; 3 0 0 - 2 0 0 \; = \; { \bf 1 0 0 } \ \mu \varepsilon
$$

$$
e _ { y y } \; = \; 2 0 0 - { \frac { 6 0 0 } { 3 } } \; = \; 2 0 0 - 2 0 0 \; = \; { \bf 0 } \ \mu \varepsilon
$$

$$
e _ { z z } \; = \; 1 0 0 - { \frac { 6 0 0 } { 3 } } \; = \; 1 0 0 - 2 0 0 \; = \; { \bf - 1 0 0 } \ \mu \varepsilon
$$

**The volumetric strain is 600 με, and the deviatoric strain components are 100, 0, and -100 με. The deviatoric strain is the reason the shape changes, and the volumetric strain is the reason the volume changes.**
:::
:::

::: exercise Derivation: the equilibrium equations {#ex-derive-equilibrium level=4 check="2"}
Show that the equilibrium equations $\partial \sigma _ { i j } / \partial x _ { j } = 0$ are derived from the force balance on a differential cube. Write the equilibrium equation for the x-direction for a two-dimensional stress field with body force $X$ per unit volume.

::: solution
Consider a differential cube with sides $d x$ , $d y$ , and $d z$ . The forces in the x-direction are:

$$
[ \sigma _ { x x } + { \frac { \partial \sigma _ { x x } } { \partial x } } \, d x ] \, d y \, d z - \sigma _ { x x } \, d y \, d z + [ \tau _ { y x } + { \frac { \partial \tau _ { y x } } { \partial y } } \, d y ] \, d x \, d z - \tau _ { y x } \, d x \, d z
$$

$$
+ [ \tau _ { z x } + { \frac { \partial \tau _ { z x } } { \partial z } } \, d z ] \, d x \, d y - \tau _ { z x } \, d x \, d y + X \, d x \, d y \, d z \; = \; 0
$$

Simplifying:

$$
{ \frac { \partial \sigma _ { x x } } { \partial x } } + { \frac { \partial \tau _ { y x } } { \partial y } } + { \frac { \partial \tau _ { z x } } { \partial z } } + X \; = \; 0
$$

For a two-dimensional stress field ($\partial / \partial z = 0$ , $\tau _ { z x } = 0$ ):

$$
{ \frac { \partial \sigma _ { x x } } { \partial x } } + { \frac { \partial \tau _ { y x } } { \partial y } } + X \; = \; 0
$$

**The equilibrium equation is the reason the stress components are physically meaningful, and the physical meaning is the reason the stress analysis is correct.** $\blacksquare$
:::
:::

::: exercise Derivation: the compatibility equation {#ex-derive-compatibility level=4 check="2"}
Show that the compatibility equation $\partial ^ { 2 } \varepsilon _ { x x } / \partial y ^ { 2 } + \partial ^ {2 } \varepsilon _ { y y } / \partial x ^ { 2 } = 2 \, \partial ^ { 2 } \varepsilon _ { x y } / \partial x \, \partial y$ is derived from the strain-displacement relations $\varepsilon _ { x x } = \partial u / \partial x$ , $\varepsilon _ { y y } = \partial v / \partial y$ , and $\varepsilon _ { x y } = ( 1 / 2 ) ( \partial u / \partial y + \partial v / \partial x )$ .

::: solution
From the strain-displacement relations:

$$
\varepsilon _ { x x } \; = \; { \frac { \partial u } { \partial x } } \quad \Longrightarrow \quad { \frac { \partial ^ { 2 } \varepsilon _ { x x } } { \partial y ^ { 2 } } } \; = \; { \frac { \partial ^ { 3 } u } { \partial x \, \partial y ^ { 2 } } }
$$

$$
\varepsilon _ { y y } \; = \; { \frac { \partial v } { \partial y } } \quad \Longrightarrow \quad { \frac { \partial ^ { 2 } \varepsilon _ { y y } } { \partial x ^ { 2 } } } \; = \; { \frac { \partial ^ { 3 } v } { \partial y \, \partial x ^ { 2 } } }
$$

$$
2 \, \varepsilon _ { x y } \; = \; { \frac { \partial u } { \partial y } } + { \frac { \partial v } { \partial x } } \quad \Longrightarrow \quad { \frac { \partial ^ { 2 } ( 2 \, \varepsilon _ { x y } ) } { \partial x \, \partial y } } \; = \; { \frac { \partial ^ { 3 } u } { \partial x \, \partial y ^ { 2 } } } + { \frac { \partial ^ { 3 } v } { \partial y \, \partial x ^ { 2 } } }
$$

Adding the first two equations:

$$
{ \frac { \partial ^ { 2 } \varepsilon _ { x x } } { \partial y ^ { 2 } } } + { \frac { \partial ^ { 2 } \varepsilon _ { y y } } { \partial x ^ { 2 } } } \; = \; { \frac { \partial ^ { 3 } u } { \partial x \, \partial y ^ { 2 } } } + { \frac { \partial ^ { 3 } v } { \partial y \, \partial x ^ { 2 } } } \; = \; 2 \, { \frac { \partial ^ { 2 } \varepsilon _ { x y } } { \partial x \, \partial y } }
$$

**The compatibility equation is the reason the strain components are physically meaningful, and the physical meaning is the reason the strain analysis is correct.** $\blacksquare$
:::
:::

::: quiz Stress tensor {#quiz-stress-tensor}
The Cauchy stress tensor has how many independent components?

- [ ] 3
- [x] 6
- [ ] 9
- [ ] 12

::: solution
**6.** The Cauchy stress tensor is symmetric ($\tau _ { i j } = \tau _ { j i }$ ), which means the stress tensor has six independent components: three normal stresses and three shear stresses. The symmetry is the reason the stress tensor has six independent components, not nine.
:::
:::

::: quiz Strain-gauge rosette {#quiz-rosette}
The strain-gauge rosette measures:

- [ ] The stress tensor directly
- [x] The strain tensor
- [ ] The displacement field
- [ ] The principal stresses directly

::: solution
**The strain tensor.** The strain-gauge rosette measures the strain tensor at a point, and the strain tensor is the reason the engineer can calculate the stress tensor using Hooke's law. The engineer who measures the strain with a single gauge is not measuring the strain tensor; they are measuring one component of the strain tensor.
:::
:::

## Where this lesson leads

- **[[solid-mechanics/linear-elasticity]]** — The stress and strain tensors are the foundation of the linear elasticity theory.
- **[[solid-mechanics/energy-methods]]** — The strain energy is calculated from the stress and strain tensors.
- **[[solid-mechanics/thick-cylinders-discs]]** — The Lamé solution is a special case of the three-dimensional elasticity solution.
- **[[solid-mechanics/thin-walled-structures]]** — The thin-walled structure analysis uses the plane stress assumption.
- **[[solid-mechanics/plates]]** — The plate theory uses the plane stress assumption.
- **[[solid-mechanics/plasticity]]** — The yield criteria (Tresca, von Mises) are functions of the stress tensor invariants.
- **[[solid-mechanics/fracture-mechanics]]** — The stress intensity factor is calculated from the stress tensor near the crack tip.
- **[[solid-mechanics/composites]]** — The composite laminate analysis uses the plane stress assumption.
- **[[mechanics-of-materials/stress-transformation]]** — The stress transformation is a special case of the tensor transformation.
- **[[finite-element-method/plane-elements]]** — The finite element method uses the stress and strain tensors.

::: history Three-dimensional stress and strain: from Cauchy to the strain gauge {#history-stress-strain}
**1822** — **Augustin-Louis Cauchy** publishes the **stress tensor**, the mathematical object that contains the complete state of stress at a point. **Cauchy's stress tensor is the reason the engineer can predict the failure in three dimensions, and the prediction is the reason the component is safe.**

**1826** — **Cauchy** publishes the **equilibrium equations**, the three partial differential equations that the stress components must satisfy. **The equilibrium equations are the reason the stress components are physically meaningful, and the physical meaning is the reason the stress analysis is correct.**

**1838** — **Gabriel Lamé** publishes the **strain tensor** and the **compatibility equations**, the six partial differential equations that the strain components must satisfy. **The compatibility equations are the reason the strain components are physically meaningful, and the physical meaning is the reason the strain analysis is correct.**

**1845** — **George Gabriel Stokes** publishes the **constitutive equation** for the linear elastic solid, which relates the stress tensor to the strain tensor. **The constitutive equation is the reason the engineer can calculate the stress from the strain, and the calculation is the reason the engineer can design the component.**

**1859** — **W. Thomson (Lord Kelvin)** and **Peter Guthrie Tait** publish the **Treatise on Natural Philosophy**, which presents the tensor analysis in a form accessible to engineers. **The Treatise is the reason the tensor analysis is the standard language of continuum mechanics, and the language is the reason the engineer can communicate the stress analysis.**

**1938** — **A. Rumsen** and **E. Simmons** independently invent the **electrical resistance strain gauge**, which makes the experimental stress analysis practical. **The strain gauge is the reason the engineer can measure the strain tensor, and the measurement is the reason the engineer can verify the stress analysis.**

**1946** — **The strain-gauge rosette** is developed, which makes the measurement of the complete strain tensor possible. **The strain-gauge rosette is the reason the engineer can measure the complete strain tensor, and the complete strain tensor is the reason the engineer can calculate the complete stress tensor.**

**1960s** — **The finite element method** is developed, which makes the three-dimensional stress analysis practical for complex geometries. **The finite element method is the reason the engineer can analyse the three-dimensional stress in a complex component, and the analysis is the reason the component is safe.**
:::

::: summary Stress and strain in three dimensions {#summary-stress-strain}
- **The Cauchy stress tensor is the second-order tensor that contains the complete state of stress at a point.** The stress tensor has six independent components (three normal stresses and three shear stresses), and the six components are the reason the engineer can predict the failure in three dimensions.
- **The equilibrium equations are the three partial differential equations that the stress components must satisfy.** The equilibrium equations are the reason the stress components are physically meaningful, and the physical meaning is the reason the stress analysis is correct.
- **The small-strain tensor is the second-order tensor that contains the complete state of strain at a point.** The strain tensor is defined in terms of the displacement gradients, and the displacement gradients are the reason the strain tensor is physically meaningful.
- **The compatibility equations are the six partial differential equations that the strain components must satisfy for the displacement field to be single-valued and continuous.** The compatibility equations are the reason the strain components are physically meaningful, and the physical meaning is the reason the strain analysis is correct.
- **The principal stresses are the eigenvalues of the stress tensor, and the principal stresses are the normal stresses on the planes where the shear stress is zero.** The principal stresses are the reason the engineer can apply the failure theories (Tresca, von Mises), and the failure theories are the reason the component is safe.
- **The strain-gauge rosette is the experimental technique for measuring the complete strain tensor at a point.** The strain-gauge rosette is the reason the engineer can measure the complete strain tensor, and the complete strain tensor is the reason the engineer can calculate the complete stress tensor.
- **The plane stress assumption is the reason the thin plate analysis is simple, and the simplicity is the reason the thin plate analysis is the most widely used analysis in structural engineering.** The plane strain assumption is the reason the long structure analysis is simple, and the simplicity is the reason the long structure analysis is the most widely used analysis in geotechnical engineering.
- **The stress invariants ($I _ { 1 }$ , $I _ { 2 }$ , $I _ { 3 }$ ) are the reason the engineer can apply the failure theories without finding the principal stresses.** The invariants are the reason the failure theories are coordinate-independent, and the coordinate independence is the reason the failure theories are universal.
- **The volumetric strain is the reason the volume changes, and the deviatoric strain is the reason the shape changes.** The decomposition into volumetric and deviatoric parts is the reason the engineer can separate the volume change from the shape change.
- **The tensor transformation is the reason the engineer can calculate the stress in any orientation, and the orientation is the reason the engineer can find the maximum shear stress and the principal stresses.** The engineer who uses the stress components in the wrong coordinate system is not analysing the stress; they are analysing the stress in the wrong orientation.
:::

## Further reading

- **Stephen P. Timoshenko and James N. Goodier (1970)** — *Theory of Elasticity*, 3rd ed. McGraw-Hill. The stress tensor, the equilibrium equations, and the compatibility equations.
- **Y. Fung (1965)** — *A First Course in Continuum Mechanics*. Prentice-Hall. The Cauchy stress tensor, the strain tensor, and the constitutive equations.
- **A.E.H. Love (1944)** — *A Treatise on the Mathematical Theory of Elasticity*, 4th ed. Cambridge University Press. The classical treatment of three-dimensional elasticity.
- **Morris Dolph (1977)** — *Mechanics of Materials*. Wiley. The stress tensor, the strain tensor, and the strain-gauge rosette.
- **Thomas J.R. Hughes (2012)** — *The Finite Element Method: Linear Static and Dynamic Finite Element Analysis*. Dover. The stress and strain tensors in the finite element context.
- **W.N. Findley, J.S. Lai and K. Seeman (1989)** — *Creep and Relaxation of Nonlinear Viscoelastic Materials*. Dover. The stress and strain tensors in the viscoelastic context.
- **SC Mal and G. Singh (1991)** — *Continuum Mechanics of Composite Materials*. Kluwer. The stress and strain tensors in the composite context.
- **L.E. Malvern (1969)** — *Introduction to the Mechanics of a Continuous Medium*. Prentice-Hall. The stress tensor, the strain tensor, and the compatibility equations.
