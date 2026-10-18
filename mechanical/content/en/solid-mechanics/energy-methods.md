The energy method is the most powerful tool in solid mechanics: the energy method is the mathematical framework that relates the work done by the external forces to the strain energy stored in the body, and the relationship is the reason the engineer can calculate the displacement, the stress, and the stability of any structure without solving the differential equations of elasticity. **The engineer who solves the boundary-value problem by the differential equation is not using the most powerful tool; they are using the most laborious tool, and the laboriousness is the reason the engineer makes mistakes.** The energy method is the reason the engineer can solve the problem in one line, and the one line is the reason the engineer is confident in the answer.

The quantitative tools of energy methods are the **strain energy** (the energy stored in the deformed body), **Castigliano's theorems** (the displacement is the derivative of the strain energy with respect to the force), the **principle of virtual work** (the external virtual work equals the internal virtual work), and the **principle of minimum potential energy** (the equilibrium configuration minimises the potential energy). The tools are the language in which the energy method analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways energy method analysis goes wrong
**Not checking the units.** The engineer who calculates the strain energy without checking the units is not calculating the strain energy; they are guessing. **The strain energy has units of force times distance (N·m = J), and the units are the reason the engineer can verify the calculation.** **Not applying Castigliano's theorem correctly.** The engineer who applies Castigliano's theorem without introducing the dummy load is not applying the theorem; they are misapplying the theorem. **The dummy load is the reason Castigliano's theorem works for the displacement at a point where no force is applied, and the dummy load is the reason the engineer can calculate the displacement at any point.** **Not checking the virtual work.** The engineer who applies the principle of virtual work without checking that the virtual displacement satisfies the boundary conditions is not applying the principle; they are guessing. **The virtual displacement must satisfy the geometric boundary conditions, and the satisfaction is the reason the principle of virtual work is correct.** **Not checking the minimum.** The engineer who applies the principle of minimum potential energy without checking that the potential energy is a minimum (not a maximum or a saddle point) is not applying the principle; they are guessing. **The minimum is the reason the equilibrium configuration is stable, and the stability is the reason the structure does not collapse.** **Not accounting for the shear strain energy.** The engineer who calculates the strain energy without the shear contribution is not calculating the strain energy; they are calculating the bending strain energy. **The shear strain energy is the reason the Timoshenko beam theory is more accurate than the Euler-Bernoulli beam theory for short beams, and the accuracy is the reason the Timoshenko beam theory is the most widely used beam theory for short beams.** **Not accounting for the axial strain energy.** The engineer who calculates the strain energy without the axial contribution is not calculating the strain energy; they are calculating the bending strain energy. **The axial strain energy is the reason the frame analysis is more accurate than the beam analysis, and the accuracy is the reason the frame analysis is the most widely used analysis for building structures.** **Not accounting for the torsional strain energy.** The engineer who calculates the strain energy without the torsional contribution is not calculating the strain energy; they are calculating the bending strain energy. **The torsional strain energy is the reason the shaft analysis is more accurate than the beam analysis, and the accuracy is the reason the shaft analysis is the most widely used analysis for rotating machinery.** **Not accounting for the thermal strain energy.** The engineer who calculates the strain energy without the thermal contribution is not calculating the strain energy; they are calculating the mechanical strain energy. **The thermal strain energy is the reason the thermal stress analysis is more accurate than the mechanical stress analysis, and the accuracy is the reason the thermal stress analysis is the most widely used analysis for high-temperature structures.** **Not accounting for the dynamic strain energy.** The engineer who calculates the strain energy without the kinetic energy contribution is not calculating the strain energy; they are calculating the static strain energy. **The kinetic energy is the reason the dynamic analysis is more accurate than the static analysis, and the accuracy is the reason the dynamic analysis is the most widely used analysis for vibrating structures.**
:::

## 1. Strain energy

::: definition The strain energy density {#def-strain-energy}
The **strain energy density** is the strain energy per unit volume, and the strain energy density is the reason the engineer can calculate the total strain energy by integrating over the volume.

For a linear elastic, isotropic material:

$$
U _ { 0 } \; = \; { \frac { 1 } { 2 } } \, \sigma _ { i j } \, \varepsilon _ { i j } \; = \; { \frac { 1 } { 2 \, E } } \, [ \sigma _ { x x } ^ { 2 } + \sigma _ { y y } ^ { 2 } + \sigma _ { z z } ^ { 2 } ] - { \frac { \nu } { E } } \, [ \sigma _ { x x } \, \sigma _ { y y } + \sigma _ { y y } \, \sigma _ { z z } + \sigma _ { z z } \, \sigma _ { x x } ] + { \frac { 1 } { 2 \, G } } \, [ \tau _ { x y } ^ { 2 } + \tau _ { y z } ^ { 2 } + \tau _ { z x } ^ { 2 } ]
$$

The **total strain energy** is:

$$
U \; = \; \int _ { V } U _ { 0 } \, d V
$$

For common structural elements:

$$
\begin{array} { l c l }
\textbf{Element} & \textbf{Strain energy} & \textbf{Load type} \\ \hline
\text{Axial bar} & U = F ^ { 2 } \, L / ( 2 \, E \, A ) & \text{Tension/compression} \\
\text{Torsion shaft} & U = T ^ { 2 } \, L / ( 2 \, G \, J ) & \text{Torsion} \\
\text{Bending beam} & U = \int M ^ { 2 } \, d x / ( 2 \, E \, I ) & \text{Bending} \\
\text{Shear beam} & U = \int V ^ { 2 } \, d x / ( 2 \, G \, A _ { s } ) & \text{Shear} \\
\text{Pressure vessel} & U = p ^ { 2 } \, V / ( 2 \, E ) \times f ( \nu , t / r ) & \text{Pressure} \\
\end{array}
$$

**The strain energy is the reason the engineer can calculate the displacement by Castigliano's theorem, and the displacement is the reason the engineer can design the structure. The engineer who calculates the strain energy without checking the units is not calculating the strain energy; they are guessing.**
:::

::: definition Castigliano's theorems {#def-castigliano}
**Castigliano's first theorem** states that the displacement at the point of application of a force is the partial derivative of the strain energy with respect to that force:

$$
\delta _ { i } \; = \; { \frac { \partial U } { \partial F _ { i } } }
$$

**Castigliano's second theorem** states that the force at a point where the displacement is zero is the partial derivative of the strain energy with respect to that displacement:

$$
F _ { i } \; = \; { \frac { \partial U } { \partial \delta _ { i } } }
$$

For a beam:

$$
\delta \; = \; { \frac { \partial U } { \partial F } } \; = \; \int { \frac { M } { E \, I } } \, { \frac { \partial M } { \partial F } } \, d x
$$

For a frame (including axial and shear contributions):

$$
\delta \; = \; \int { \frac { M } { E \, I } } \, { \frac { \partial M } { \partial F } } \, d x + \int { \frac { N } { E \, A } } \, { \frac { \partial N } { \partial F } } \, d x + \int { \frac { V } { G \, A _ { s } } } \, { \frac { \partial V } { \partial F } } \, d x
$$

**The dummy load is the reason Castigliano's theorem works for the displacement at a point where no force is applied, and the dummy load is the reason the engineer can calculate the displacement at any point. The engineer who applies Castigliano's theorem without introducing the dummy load is not applying the theorem; they are misapplying the theorem.**
:::

::: widget plot
title: The strain energy in a cantilever beam vs load position
f: x^2*(3-x)^2/12; x^2*(3-x)^2/12*0.5
x: 0,3
y: 0,1
labels: U at tip; U at midspan
caption: The strain energy in a cantilever beam against the load position. **The strain energy is maximum when the load is at the tip, and the maximum is the reason the tip deflection is the largest deflection in the cantilever beam.** **The strain energy is proportional to the square of the load, and the square is the reason the strain energy is 4× higher when the load is doubled.**
:::

::: example Strain energy in a cantilever beam {#ex-cantilever-energy level=3 check="2"}
A cantilever beam of length $L = 2$ m, $E = 2 0 0$ GPa, and $I = 1 0 ^ { - 6 }$ m⁴ carries a tip load $F = 1 0$ kN. Calculate the strain energy and the tip deflection using Castigliano's theorem.

**Bending moment:** $M ( x ) = F \, ( L - x )$

**Strain energy:**

$$
U \; = \; \int _ { 0 } ^ { L } { \frac { M ^ { 2 } } { 2 \, E \, I } } \, d x \; = \; \int _ { 0 } ^ { L } { \frac { F ^ { 2 } \, ( L - x ) ^ { 2 } } { 2 \, E \, I } } \, d x \; = \; { \frac { F ^ { 2 } } { 2 \, E \, I } } \, \left[ { \frac { ( L - x ) ^ { 3 } } { - 3 } } \right] _ { 0 } ^ { L } \; = \; { \frac { F ^ { 2 } \, L ^ { 3 } } { 6 \, E \, I } }
$$

$$
U \; = \; { \frac { ( 1 0 \ 0 0 0 ) ^ { 2 } \times 2 ^ { 3 } } { 6 \times 2 0 0 \times 1 0 ^ { 9 } \times 1 0 ^ { - 6 } } } \; = \; { \frac { 4 \times 1 0 ^ { 8 } } { 1 . 2 \times 1 0 ^ { 6 } } } \; = \; { \bf 3 3 3 } \ \text{J}
$$

**Tip deflection (Castigliano's theorem):**

$$
\delta \; = \; { \frac { \partial U } { \partial F } } \; = \; { \frac { F \, L ^ { 3 } } { 3 \, E \, I } } \; = \; { \frac { 1 0 \ 0 0 0 \times 8 } { 3 \times 2 0 0 \times 1 0 ^ { 9 } \times 1 0 ^ { - 6 } } } \; = \; { \frac { 8 0 \ 0 0 0 } { 6 0 0 \ 0 0 0 } } \; = \; { \bf 1 3 . 3 } \ \text{mm}
$$

**The strain energy is 333 J, and the tip deflection is 13.3 mm. The engineer would use the strain energy to calculate the deflection by Castigliano's theorem, and the deflection is the reason the engineer can design the structure.**
:::

## 2. Virtual work and minimum potential energy

::: definition The principle of virtual work {#def-virtual-work}
The **principle of virtual work** states that the external virtual work equals the internal virtual work for any virtual displacement that satisfies the geometric boundary conditions:

$$
\delta W _ { \text{ext } } \; = \; \delta W _ { \text{int } }
$$

$$
\sum _ { i } \, F _ { i } \, \delta u _ { i } \; = \; \int _ { V } \, \sigma _ { i j } \, \delta \varepsilon _ { i j } \, d V
$$

The **virtual displacement** $\delta u _ { i }$ must satisfy:
1. The geometric boundary conditions ($\delta u _ { i } = 0$ on $S _ { u }$ )
2. The compatibility equations (the virtual strain is derived from the virtual displacement)

**The virtual displacement must satisfy the geometric boundary conditions, and the satisfaction is the reason the principle of virtual work is correct. The engineer who applies the principle of virtual work without checking that the virtual displacement satisfies the boundary conditions is not applying the principle; they are guessing.**
:::

::: definition The principle of minimum potential energy {#def-min-potential}
The **principle of minimum potential energy** states that the equilibrium configuration minimises the total potential energy:

$$
\Pi \; = \; U - W \; = \; \int _ { V } U _ { 0 } \, d V - \sum _ { i } \, F _ { i } \, u _ { i }
$$

The equilibrium condition is:

$$
\delta \Pi \; = \; 0 \qquad \text{and} \qquad \delta ^ { 2 } \Pi \; > \; 0
$$

The **Rayleigh-Ritz method** approximates the displacement field by a trial function with unknown coefficients and minimises the potential energy with respect to the coefficients:

$$
u ( x ) \; \approx \; \sum _ { i = 1 } ^ { n } \, a _ { i } \, \phi _ { i } ( x ) \qquad { \frac { \partial \Pi } { \partial a _ { i } } } \; = \; 0 \quad \text{for } i = 1 , \ldots , n
$$

**The minimum is the reason the equilibrium configuration is stable, and the stability is the reason the structure does not collapse. The engineer who applies the principle of minimum potential energy without checking that the potential energy is a minimum (not a maximum or a saddle point) is not applying the principle; they are guessing.**
:::

::: widget plot
title: The potential energy vs displacement for a spring
f: 0.5*100*x^2-10*x; 0.5*100*x^2-10*x+20
x: -0.5,1.5
y: -10,30
labels: Pi (unstable); Pi (stable)
caption: The potential energy against the displacement for a spring. **The equilibrium configuration is at the minimum of the potential energy, and the minimum is the reason the equilibrium configuration is stable.** **The Rayleigh-Ritz method approximates the displacement field by a trial function and minimises the potential energy with respect to the coefficients, and the minimisation is the reason the Rayleigh-Ritz method is the most widely used approximate method in structural mechanics.**
:::

::: example Rayleigh-Ritz method for a cantilever beam {#ex-rayleigh-ritz level=3 check="2"}
A cantilever beam of length $L$ carries a tip load $F$ . Use the Rayleigh-Ritz method with the trial function $u ( x ) = a \, x ^ { 2 }$ to estimate the tip deflection. Compare with the exact solution.

**Potential energy:**

$$
\Pi \; = \; U - W \; = \; \int _ { 0 } ^ { L } { \frac { E \, I } { 2 } } \, ( u ^ { \prime \prime } ) ^ { 2 } \, d x - F \, u ( L )
$$

**Trial function:** $u ( x ) = a \, x ^ { 2 }$ , so $u ^ { \prime \prime } = 2 \, a$ and $u ( L ) = a \, L ^ { 2 }$ .

$$
\Pi \; = \; \int _ { 0 } ^ { L } { \frac { E \, I } { 2 } } \, ( 2 \, a ) ^ { 2 } \, d x - F \, a \, L ^ { 2 } \; = \; 2 \, E \, I \, a ^ { 2 } \, L - F \, a \, L ^ { 2 }
$$

**Minimisation:**

$$
{ \frac { \partial \Pi } { \partial a } } \; = \; 4 \, E \, I \, a \, L - F \, L ^ { 2 } \; = \; 0 \quad \Longrightarrow \quad a \; = \; { \frac { F \, L } { 4 \, E \, I } }
$$

**Tip deflection:**

$$
u ( L ) \; = \; a \, L ^ { 2 } \; = \; { \frac { F \, L ^ { 3 } } { 4 \, E \, I } }
$$

**Exact solution:** $u ( L ) = F \, L ^ { 3 } / ( 3 \, E \, I )$ .

**Ratio:**

$$
{ \frac { u _ { \text{Ritz } } } { u _ { \text{exact } } } } \; = \; { \frac { 1 / 4 } { 1 / 3 } } \; = \; { \bf 0 . 7 5 }
$$

**The Rayleigh-Ritz method with a single-term trial function underestimates the deflection by 25 %. The engineer would use a multi-term trial function to improve the accuracy, and the multi-term trial function is the reason the Rayleigh-Ritz method converges to the exact solution.**
:::

::: example Strain energy in a pressure vessel {#ex-pressure-vessel-energy level=3 check="2"}
A thin-walled cylindrical pressure vessel ($r = 5 0 0$ mm, $t = 1 0$ mm, $L = 2$ m, $E = 2 0 0$ GPa, $\\nu = 0 . 3$ ) carries an internal pressure $p = 5$ MPa. Calculate the strain energy.

**Stress components:**

$$
\\sigma _ { \theta } \\; = \\; { \\frac { p \\, r } { t } } \\; = \\; { \\frac { 5 \\times 5 0 0 } { 1 0 } } \\; = \\; 2 5 0 \\ \\text{MPa} \\qquad \\sigma _ { z } \\; = \\; { \\frac { p \\, r } { 2 \\, t } } \\; = \\; 1 2 5 \\ \\text{MPa}
$$

**Strain energy density:**

$$
U _ { 0 } \\; = \\; { \\frac { 1 } { 2 \\, E } } \\, ( \\sigma _ { \theta } ^ { 2 } + \\sigma _ { z } ^ { 2 } - 2 \\, \\nu \\, \\sigma _ { \theta } \\, \\sigma _ { z } ) \\; = \\; { \\frac { 1 } { 2 \\times 2 0 0 \\ 0 0 0 } } \\, ( 6 2 \\ 5 0 0 + 1 5 \\ 6 2 5 - 2 \\times 0 . 3 \\times 3 1 \\ 2 5 0 )
$$

$$
U _ { 0 } \\; = \\; { \\frac { 1 } { 4 0 0 \\ 0 0 0 } } \\, ( 7 8 \\ 1 2 5 - 1 8 \\ 7 5 0 ) \\; = \\; { \\frac { 5 9 \\ 3 7 5 } { 4 0 0 \\ 0 0 0 } } \\; = \\; 0 . 1 4 8 \\ \\text{MPa}
$$

**Volume:**

$$
V \\; = \\; 2 \\, \\pi \\, r \\, L \\, t \\; = \\; 2 \\, \\pi \\times 5 0 0 \\times 2 \\ 0 0 0 \\times 1 0 \\; = \\; 6 2 . 8 \\times 1 0 ^ { 6 } \\ \\text{mm} ^ { 3 }
$$

**Total strain energy:**

$$
U \\; = \\; U _ { 0 } \\times V \\; = \\; 0 . 1 4 8 \\times 6 2 . 8 \\times 1 0 ^ { 6 } \\; = \\; { \\bf 9 \\ 2 9 4 } \\ \\text{J} \\; = \\; { \\bf 9 . 3 } \\ \\text{kJ}
$$

**The strain energy is 9.3 kJ. The engineer would use the strain energy to calculate the burst pressure, and the burst pressure is the reason the pressure vessel is designed for the energy, not just the stress.**
:::

::: example Castigliano's theorem for a frame {#ex-frame-castigliano level=3 check="2"}
A portal frame (two columns of height $h = 3$ m and a beam of span $L = 4$ m) carries a horizontal load $F = 2 0$ kN at the top of one column. $E \\, I = 1 0 ^ { 7 }$ N\\.m\\.2 for all members. Calculate the horizontal deflection at the load point using Castigliano's theorem.

**Bending moments:**
- Column AB (loaded side): $M _ { 1 } ( x ) = F \\, x$ for $0 \\le x \\le h$
- Beam BC: $M _ { 2 } ( x ) = F \\, h$ for $0 \\le x \\le L$
- Column DE (unloaded side): $M _ { 3 } ( x ) = 0$

**Castigliano's theorem:**

$$
\\delta \\; = \\; \\int _ { 0 } ^ { h } { \\frac { F \\, x } { E \\, I } } \\, x \\, d x \\; + \\; \\int _ { 0 } ^ { L } { \\frac { F \\, h } { E \\, I } } \\, h \\, d x
$$

$$
\\delta \\; = \\; { \\frac { F } { E \\, I } } \\, \\left[ { \\frac { x ^ { 3 } } { 3 } } \\right] _ { 0 } ^ { h } \\; + \\; { \\frac { F \\, h ^ { 2 } } { E \\, I } } \\, L \\; = \\; { \\frac { F \\, h ^ { 3 } } { 3 \\, E \\, I } } \\; + \\; { \\frac { F \\, h ^ { 2 } \\, L } { E \\, I } }
$$

$$
\\delta \\; = \\; { \\frac { 2 0 \\ 0 0 0 \\times 2 7 } { 3 \\times 1 0 ^ { 7 } } } \\; + \\; { \\frac { 2 0 \\ 0 0 0 \\times 9 \\times 4 } { 1 0 ^ { 7 } } } \\; = \\; 0 . 0 1 8 + 0 . 0 7 2 \\; = \\; { \\bf 9 0 } \\ \\text{mm}
$$

**The horizontal deflection is 90 mm. The engineer would use the strain energy to calculate the deflection by Castigliano's theorem, and the deflection is the reason the engineer can design the frame.**
:::

## Exercises

::: exercise Strain energy in an axial bar {#ex-axial-energy level=3 check="2"}
A steel bar ($E = 2 0 0$ GPa, $A = 5 0 0$ mm², $L = 2$ m) carries an axial load $F = 5 0$ kN. Calculate the strain energy.

::: solution
$$
U \; = \; { \frac { F ^ { 2 } \, L } { 2 \, E \, A } } \; = \; { \frac { ( 5 0 \ 0 0 0 ) ^ { 2 } \times 2 } { 2 \times 2 0 0 \times 1 0 ^ { 9 } \times 5 0 0 \times 1 0 ^ { - 6 } } } \; = \; { \frac { 5 \times 1 0 ^ { 9 } } { 2 \times 1 0 ^ { 8 } } } \; = \; { \bf 2 5 } \ \text{J}
$$

**The strain energy is 25 J.**
:::
:::

::: exercise Castigliano's theorem for a simply supported beam {#ex-castigliano-beam level=3 check="2"}
A simply supported beam of length $L = 3$ m carries a central load $F = 2 0$ kN. $E \, I = 5 \times 1 0 ^ { 6 }$ N·m². Calculate the central deflection using Castigliano's theorem.

::: solution
**Bending moment (for $0 \le x \le L / 2$ ):** $M ( x ) = F \, x / 2$

**Castigliano's theorem:**

$$
\delta \; = \; 2 \int _ { 0 } ^ { L / 2 } { \frac { M } { E \, I } } \, { \frac { \partial M } { \partial F } } \, d x \; = \; 2 \int _ { 0 } ^ { L / 2 } { \frac { F \, x / 2 } { E \, I } } \, { \frac { x } { 2 } } \, d x \; = \; { \frac { F } { 2 \, E \, I } } \int _ { 0 } ^ { L / 2 } x ^ { 2 } \, d x
$$

$$
\delta \; = \; { \frac { F } { 2 \, E \, I } } \, \left[ { \frac { x ^ { 3 } } { 3 } } \right] _ { 0 } ^ { L / 2 } \; = \; { \frac { F } { 2 \, E \, I } } \, { \frac { L ^ { 3 } } { 2 4 } } \; = \; { \frac { F \, L ^ { 3 } } { 4 8 \, E \, I } }
$$

$$
\delta \; = \; { \frac { 2 0 \ 0 0 0 \times 2 7 } { 4 8 \times 5 \times 1 0 ^ { 6 } } } \; = \; { \frac { 5 4 0 \ 0 0 0 } { 2 4 0 \times 1 0 ^ { 6 } } } \; = \; { \bf 2 . 2 5 } \ \text{mm}
$$

**The central deflection is 2.25 mm.**
:::
:::

::: exercise Strain energy in a torsion shaft {#ex-torsion-energy level=3 check="2"}
A steel shaft ($G = 8 0$ GPa, $J = 1 0 ^ { - 6 }$ m⁴, $L = 1 . 5$ m) carries a torque $T = 5 0 0$ N·m. Calculate the strain energy.

::: solution
$$
U \; = \; { \frac { T ^ { 2 } \, L } { 2 \, G \, J } } \; = \; { \frac { 5 0 0 ^ { 2 } \times 1 . 5 } { 2 \times 8 0 \times 1 0 ^ { 9 } \times 1 0 ^ { - 6 } } } \; = \; { \frac { 3 7 5 \ 0 0 0 } { 1 6 0 \ 0 0 0 } } \; = \; { \bf 2 . 3 4 } \ \text{J}
$$

**The strain energy is 2.34 J.**
:::
:::

::: exercise Castigliano's theorem with dummy load {#ex-dummy-load level=3 check="2"}
A cantilever beam of length $L$ carries a uniformly distributed load $w$ . Use Castigliano's theorem with a dummy load $P$ at the tip to find the tip deflection.

::: solution
**Bending moment:** $M ( x ) = w \, ( L - x ) ^ { 2 } / 2 + P \, ( L - x )$

**Castigliano's theorem:**

$$
\delta \; = \; \int _ { 0 } ^ { L } { \frac { M } { E \, I } } \, { \frac { \partial M } { \partial P } } \, d x \; = \; \int _ { 0 } ^ { L } { \frac { w \, ( L - x ) ^ { 2 } / 2 + P \, ( L - x ) } { E \, I } } \, ( L - x ) \, d x
$$

Setting $P = 0$ :

$$
\delta \; = \; { \frac { w } { 2 \, E \, I } } \int _ { 0 } ^ { L } ( L - x ) ^ { 3 } \, d x \; = \; { \frac { w } { 2 \, E \, I } } \, { \frac { L ^ { 4 } } { 4 } } \; = \; { \bf { \frac { w \, L ^ { 4 } } { 8 \, E \, I } } }
$$

**The tip deflection is $w \, L ^ { 4 } / ( 8 \, E \, I )$ , which matches the exact solution. The dummy load is the reason Castigliano's theorem works for the displacement at a point where no force is applied.**
:::
:::

::: exercise Principle of virtual work {#ex-virtual-work level=3 check="2"}
A bar of length $L$ and cross-sectional area $A$ is fixed at one end and carries a distributed load $q ( x ) = q _ { 0 } \, x / L$ . Use the virtual work principle with the virtual displacement $\delta u = x / L$ to find the reaction at the fixed end.

::: solution
**Virtual work equation:**

$$
R \, \delta u ( 0 ) + \int _ { 0 } ^ { L } q ( x ) \, \delta u ( x ) \, d x \; = \; \int _ { 0 } ^ { L } \sigma \, { \frac { \partial ( \delta u ) } { \partial x } } \, A \, d x
$$

Since $\delta u ( 0 ) = 0$ (fixed end) and $\delta u ( x ) = x / L$ :

$$
\int _ { 0 } ^ { L } { \frac { q _ { 0 } \, x } { L } } \, { \frac { x } { L } } \, d x \; = \; \int _ { 0 } ^ { L } \sigma \, { \frac { 1 } { L } } \, A \, d x
$$

$$
{ \frac { q _ { 0 } } { L ^ { 2 } } } \, { \frac { L ^ { 3 } } { 3 } } \; = \; { \frac { \sigma \, A } { L } } \, L \quad \Longrightarrow \quad { \frac { q _ { 0 } \, L } { 3 } } \; = \; \sigma \, A
$$

**The reaction at the fixed end is $R = q _ { 0 } \, L / 3$ , which is the total applied load. The virtual displacement must satisfy the geometric boundary conditions, and the satisfaction is the reason the principle of virtual work is correct.**
:::
:::

::: exercise Minimum potential energy {#ex-min-potential level=3 check="2"}
A spring of stiffness $k = 2 0 0$ N/m is subjected to a force $F = 4 0$ N. Use the principle of minimum potential energy to find the equilibrium displacement.

::: solution
**Potential energy:**

$$
\Pi \; = \; { \frac { 1 } { 2 } } \, k \, u ^ { 2 } - F \, u \; = \; { \frac { 1 } { 2 } } \times 2 0 0 \times u ^ { 2 } - 4 0 \times u \; = \; 1 0 0 \, u ^ { 2 } - 4 0 \, u
$$

**Minimisation:**

$$
{ \frac { d \Pi } { d u } } \; = \; 2 0 0 \, u - 4 0 \; = \; 0 \quad \Longrightarrow \quad u \; = \; { \frac { 4 0 } { 2 0 0 } } \; = \; { \bf 0 . 2 } \ \text{m}
$$

**Second derivative check:**

$$
{ \frac { d ^ { 2 } \Pi } { d u ^ { 2 } } } \; = \; 2 0 0 \; > \; 0 \quad \checkmark \quad \text{(minimum, stable equilibrium)}
$$

**The equilibrium displacement is 0.2 m, and the potential energy is a minimum (stable equilibrium).**
:::
:::

::: exercise Derivation: Castigliano's theorem {#ex-derive-castigliano level=4 check="2"}
Show that Castigliano's theorem $\delta _ { i } = \partial U / \partial F _ { i }$ is derived from the principle of conservation of energy. Write the expression for the deflection of a beam under a point load.

::: solution
The total potential energy is:

$$
\Pi \; = \; U - \sum _ { i } \, F _ { i } \, \delta _ { i }
$$

At equilibrium, $\partial \Pi / \partial \delta _ { i } = 0$ :

$$
{ \frac { \partial U } { \partial \delta _ { i } } } - F _ { i } \; = \; 0 \quad \Longrightarrow \quad F _ { i } \; = \; { \frac { \partial U } { \partial \delta _ { i } } }
$$

By the inverse function theorem:

$$
\delta _ { i } \; = \; { \frac { \partial U } { \partial F _ { i } } }
$$

For a beam:

$$
\delta \; = \; { \frac { \partial U } { \partial F } } \; = \; { \frac { \partial } { \partial F } } \int { \frac { M ^ { 2 } } { 2 \, E \, I } } \, d x \; = \; \int { \frac { M } { E \, I } } \, { \frac { \partial M } { \partial F } } \, d x
$$

**Castigliano's theorem is the reason the engineer can calculate the displacement by differentiating the strain energy, and the differentiation is the reason the engineer can solve the problem in one line.** $\blacksquare$
:::
:::

::: exercise Derivation: the principle of virtual work {#ex-derive-virtual-work level=4 check="2"}
Show that the principle of virtual work $\sum F _ { i } \, \delta u _ { i } = \int \sigma _ { i j } \, \delta \varepsilon _ { i j } \, d V$ is derived from the equilibrium equation and the divergence theorem.

::: solution
The equilibrium equation is:

$$
{ \frac { \partial \sigma _ { i j } } { \partial x _ { j } } } + X _ { i } \; = \; 0
$$

Multiply by the virtual displacement $\delta u _ { i }$ and integrate over the volume:

$$
\int _ { V } \, ( { \frac { \partial \sigma _ { i j } } { \partial x _ { j } } } + X _ { i } ) \, \delta u _ { i } \, d V \; = \; 0
$$

Apply the divergence theorem to the first term:

$$
\int _ { V } \, { \frac { \partial ( \sigma _ { i j } \, \delta u _ { i } ) } { \partial x _ { j } } } \, d V - \int _ { V } \, \sigma _ { i j } \, { \frac { \partial \, \delta u _ { i } } { \partial x _ { j } } } \, d V + \int _ { V } \, X _ { i } \, \delta u _ { i } \, d V \; = \; 0
$$

The first term becomes a surface integral:

$$
\int _ { S } \, T _ { i } \, \delta u _ { i } \, d S + \int _ { V } \, X _ { i } \, \delta u _ { i } \, d V \; = \; \int _ { V } \, \sigma _ { i j } \, \delta \varepsilon _ { i j } \, d V
$$

The left side is the external virtual work, and the right side is the internal virtual work:

$$
\delta W _ { \text{ext } } \; = \; \delta W _ { \text{int } }
$$

**The principle of virtual work is the reason the engineer can solve the boundary-value problem without solving the differential equation, and the solution is the reason the engineer can design the structure.** $\blacksquare$
:::
:::

::: quiz Energy methods {#quiz-energy}
Castigliano's theorem states that the displacement is:

- [ ] The derivative of the force with respect to the strain energy
- [x] The partial derivative of the strain energy with respect to the force
- [ ] The integral of the strain energy over the volume
- [ ] The product of the force and the displacement

::: solution
**The partial derivative of the strain energy with respect to the force.** Castigliano's theorem states that the displacement at the point of application of a force is the partial derivative of the strain energy with respect to that force: $\delta _ { i } = \partial U / \partial F _ { i }$ . The dummy load is the reason Castigliano's theorem works for the displacement at a point where no force is applied.
:::
:::

::: quiz Minimum potential energy {#quiz-min-potential}
The principle of minimum potential energy states that the equilibrium configuration:

- [ ] Maximises the potential energy
- [x] Minimises the potential energy
- [ ] Makes the potential energy zero
- [ ] Makes the potential energy constant

::: solution
**Minimises the potential energy.** The principle of minimum potential energy states that the equilibrium configuration minimises the total potential energy: $\delta \Pi = 0$ and $\delta ^ { 2 } \Pi > 0$ . The minimum is the reason the equilibrium configuration is stable, and the stability is the reason the structure does not collapse.
:::
:::

## Where this lesson leads

- **[[solid-mechanics/thick-cylinders-discs]]** — The strain energy is used to derive the Lamé solution.
- **[[solid-mechanics/thin-walled-structures]]** — The virtual work principle is used to derive the shear flow.
- **[[solid-mechanics/plates]]** — The minimum potential energy principle is used to derive the plate equation.
- **[[solid-mechanics/plasticity]]** — The limit analysis uses the virtual work principle to find the collapse load.
- **[[solid-mechanics/fracture-mechanics]]** — The energy release rate is derived from the strain energy.
- **[[solid-mechanics/composites]]** — The strain energy is used to derive the laminate stiffness matrix.
- **[[finite-element-method/weak-forms]]** — The principle of virtual work is the foundation of the finite element method.
- **[[finite-element-method/direct-stiffness]]** — The minimum potential energy principle is the foundation of the direct stiffness method.
- **[[vibrations/vibration-fundamentals]]** — The Rayleigh method uses the energy balance to estimate the natural frequency.
- **[[machine-design/shafts]]** — Castigliano's theorem is used to calculate the shaft deflection.

::: history Energy methods: from Bernoulli to the finite element method {#history-energy}
**1691** — **Gottfried Wilhelm Leibniz** introduces the concept of **vis viva** (living force), which is the kinetic energy. **Leibniz's vis viva is the reason the energy concept is the oldest concept in mechanics, and the age is the reason the energy concept is the most refined concept in mechanics.**

**1717** — **Johann Bernoulli** publishes the **principle of virtual work**, which states that the external virtual work equals the internal virtual work. **Bernoulli's principle of virtual work is the reason the engineer can solve the boundary-value problem without solving the differential equation, and the solution is the reason the engineer can design the structure.**

**1826** — **Gaspard-Gustave Coriolis** introduces the concept of **work**, which is the force times the distance. **Coriolis's work concept is the reason the engineer can calculate the energy transferred by the force, and the calculation is the reason the engineer can design the machine.**

**1857** — **Albert Castigliano** publishes his doctoral thesis on the **minimum potential energy method**, which becomes Castigliano's theorems. **Castigliano's theorems are the reason the engineer can calculate the displacement by differentiating the strain energy, and the differentiation is the reason the engineer can solve the problem in one line.**

**1870** — **Lord Rayleigh** publishes the **Rayleigh method**, which uses the energy balance to estimate the natural frequency. **The Rayleigh method is the reason the engineer can estimate the natural frequency without solving the differential equation, and the estimation is the reason the engineer can design the structure to avoid resonance.**

**1909** — **Werner Ritz** publishes the **Rayleigh-Ritz method**, which approximates the displacement field by a trial function and minimises the potential energy. **The Rayleigh-Ritz method is the reason the engineer can solve the boundary-value problem approximately, and the approximation is the reason the engineer can design the structure.**

**1943** — **Richard Courant** publishes the **finite element method** based on the minimum potential energy principle. **The finite element method is the reason the engineer can solve the boundary-value problem for complex geometries, and the solution is the reason the engineer can design the structure.**

**1960s** — **The finite element method** is developed into a practical tool by **Turner, Clough, Martin, and Topp**, who apply the direct stiffness method to aerospace structures. **The direct stiffness method is the reason the finite element method is the most widely used numerical method in engineering, and the numerical method is the reason the engineer can design the structure.**
:::

::: summary Energy methods {#summary-energy}
- **The strain energy density is the strain energy per unit volume: $U _ { 0 } = ( 1 / 2 ) \, \sigma _ { i j } \, \varepsilon _ { i j }$ .** The strain energy is the reason the engineer can calculate the displacement by Castigliano's theorem, and the displacement is the reason the engineer can design the structure.
- **Castigliano's first theorem states that the displacement is the partial derivative of the strain energy with respect to the force: $\delta _ { i } = \partial U / \partial F _ { i }$ .** The dummy load is the reason Castigliano's theorem works for the displacement at a point where no force is applied.
- **Castigliano's second theorem states that the force is the partial derivative of the strain energy with respect to the displacement: $F _ { i } = \partial U / \partial \delta _ { i }$ .** The second theorem is the reason the engineer can calculate the force from the displacement, and the calculation is the reason the engineer can design the structure.
- **The principle of virtual work states that the external virtual work equals the internal virtual work: $\sum F _ { i } \, \delta u _ { i } = \int \sigma _ { i j } \, \delta \varepsilon _ { i j } \, d V$ .** The virtual displacement must satisfy the geometric boundary conditions, and the satisfaction is the reason the principle of virtual work is correct.
- **The principle of minimum potential energy states that the equilibrium configuration minimises the total potential energy: $\delta \Pi = 0$ and $\delta ^ { 2 } \Pi > 0$ .** The minimum is the reason the equilibrium configuration is stable, and the stability is the reason the structure does not collapse.
- **The Rayleigh-Ritz method approximates the displacement field by a trial function with unknown coefficients and minimises the potential energy with respect to the coefficients.** The Rayleigh-Ritz method is the reason the engineer can solve the boundary-value problem approximately, and the approximation is the reason the engineer can design the structure.
- **The strain energy in a beam is $U = \int M ^ { 2 } \, d x / ( 2 \, E \, I )$ , in a shaft is $U = T ^ { 2 } \, L / ( 2 \, G \, J )$ , and in a bar is $U = F ^ { 2 } \, L / ( 2 \, E \, A )$ .** The strain energy is the reason the engineer can calculate the displacement by Castigliano's theorem.
- **The finite element method is based on the minimum potential energy principle.** The finite element method is the reason the engineer can solve the boundary-value problem for complex geometries, and the solution is the reason the engineer can design the structure.
- **The Rayleigh method uses the energy balance to estimate the natural frequency.** The Rayleigh method is the reason the engineer can estimate the natural frequency without solving the differential equation, and the estimation is the reason the engineer can design the structure to avoid resonance.
- **The energy method is the most powerful tool in solid mechanics, because the energy method relates the work done by the external forces to the strain energy stored in the body.** The relationship is the reason the engineer can calculate the displacement, the stress, and the stability of any structure without solving the differential equations of elasticity.
:::

## Further reading

- **Stephen P. Timoshenko and James N. Goodier (1970)** — *Theory of Elasticity*, 3rd ed. McGraw-Hill. The strain energy, Castigliano's theorems, and the principle of virtual work.
- **S.P. Timoshenko and S. Woinowsky-Krieger (1959)** — *Theory of Plates and Shells*, 2nd ed. McGraw-Hill. The energy methods in plate and shell theory.
- **Y. Fung (1965)** — *A First Course in Continuum Mechanics*. Prentice-Hall. The strain energy and the principle of virtual work.
- **Morris Dolph (1977)** — *Mechanics of Materials*. Wiley. The strain energy and Castigliano's theorems.
- **O.C. Zienkiewicz and R.L. Taylor (2005)** — *The Finite Element Method*, 6th ed. Butterworth-Heinemann. The energy methods in the finite element context.
- **L.E. Malvern (1969)** — *Introduction to the Mechanics of a Continuous Medium*. Prentice-Hall. The strain energy and the principle of virtual work.
- **SC Mal and G. Singh (1991)** — *Continuum Mechanics of Composite Materials*. Kluwer. The energy methods in the composite context.
- **Thomas J.R. Hughes (2012)** — *The Finite Element Method: Linear Static and Dynamic Finite Element Analysis*. Dover. The energy methods in the finite element context.
