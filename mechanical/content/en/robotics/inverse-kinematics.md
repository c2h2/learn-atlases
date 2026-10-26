Forward kinematics answers "where is the tool, given the joints?"; the question a robot is actually asked is the reverse: "here is where the tool must be — what should the joints do?" A welding program specifies a seam in space, a vision system reports a part's pose, a teleoperator moves a hand controller; in each case the controller must find joint values $\boldsymbol\theta$ with $T(\boldsymbol\theta) = T_d$ for a desired pose $T_d$. This is the **inverse kinematics** (IK) problem, and it is genuinely harder than the forward one: it is a system of nonlinear trigonometric equations that may have no solution (the target is out of reach), several (the elbow can be up or down), or infinitely many (a redundant arm). This chapter solves it in two ways. **Analytically**, for the planar arm and — through Pieper's wrist-centre decoupling — for the six-axis arms with spherical wrists that dominate industry, giving every solution in closed form so the controller can choose among them. **Numerically**, by Newton–Raphson iteration and its damped-least-squares variant, which work for any arm but return one solution near the initial guess and need care near singularities. The forward kinematics and frame conventions are those of [[robotics/forward-kinematics]]; the Jacobian used by the numerical methods is developed fully in [[robotics/jacobians]].

## The inverse problem {#sec-problem}

::: definition Inverse kinematics {#def-ik}
Given a forward kinematics map $\boldsymbol\theta\mapsto T(\boldsymbol\theta)$ and a desired end-effector pose $T_d\in SE(3)$ (or a desired position only, or a planar position and angle), the **inverse kinematics problem** is to find all $\boldsymbol\theta$ in the allowed joint ranges with $T(\boldsymbol\theta) = T_d$. Each such $\boldsymbol\theta$ is an **IK solution**; the set of all solutions may be empty, finite, or a continuum.
:::

Counting equations and unknowns explains the three cases. A pose has six independent components; an arm with $n$ joints has $n$ unknowns. If $n < 6$ a general pose cannot be reached at all, and one asks for less (position only, or position and one direction). If $n = 6$, six equations in six unknowns generically have a finite number of solutions: for a general 6R arm the solutions are the roots of a polynomial of degree 16 (Primrose showed in 1986 that there are at most 16, and examples reaching 16 exist), while arms with a spherical wrist have at most 8. If $n > 6$ the arm is redundant and the solutions form a family of dimension $n - 6$, from which a secondary criterion selects one ([[robotics/jacobians]]).

Analytical (closed-form) solutions are preferred in industry: they are fast and deterministic, they list every solution, and they make it possible to keep a robot in one "configuration" (elbow up, wrist not flipped) throughout a motion. Numerical solutions are preferred in research and for arms without special geometry.

## The planar two-link arm {#sec-2r}

Every closed-form method rests on two tools: the law of cosines, which turns a distance into a joint angle, and the two-argument arctangent $\operatorname{atan2}(y, x)$, which returns the angle of the point $(x, y)$ in $(-\pi, \pi]$ with the correct quadrant. The planar 2R arm uses both.

::: proposition Inverse kinematics of the planar 2R arm {#prop-2r-ik}
Let a planar 2R arm with link lengths $L_1, L_2 > 0$ have tip position $(x, y)$, and let
$$
D = \frac{x^2 + y^2 - L_1^2 - L_2^2}{2L_1L_2}.
$$
If $\lvert D\rvert > 1$ there is no solution. If $\lvert D\rvert \le 1$ the solutions are
$$
\theta_2 = \operatorname{atan2}\!\big(\pm\sqrt{1 - D^2},\ D\big),\qquad
\theta_1 = \operatorname{atan2}(y, x) - \operatorname{atan2}\!\big(L_2\sin\theta_2,\ L_1 + L_2\cos\theta_2\big),
$$ {#eq-2r-ik}
two distinct solutions ("elbow up" and "elbow down") when $\lvert D\rvert < 1$, and one when $\lvert D\rvert = 1$ (arm stretched or folded). If $(x, y) = (0, 0)$ and $L_1 = L_2$, $\theta_2 = \pi$ and $\theta_1$ is arbitrary.
:::

::: proof
From the forward kinematics $x = L_1c_1 + L_2c_{12}$, $y = L_1s_1 + L_2s_{12}$, the tip distance satisfies $x^2 + y^2 = L_1^2 + L_2^2 + 2L_1L_2\cos\theta_2$ (as in [[robotics/forward-kinematics]]), so $\cos\theta_2 = D$; a real $\theta_2$ exists if and only if $\lvert D\rvert \le 1$, and then $\sin\theta_2 = \pm\sqrt{1 - D^2}$. Using `atan2` of the pair $(\sin\theta_2, \cos\theta_2)$ rather than $\arccos D$ keeps both signs and avoids the poor conditioning of $\arccos$ near $\pm1$. For $\theta_1$, expand $c_{12}$ and $s_{12}$:
$$
\begin{bmatrix} x\\ y\end{bmatrix} = \begin{bmatrix} k_1 & -k_2\\ k_2 & k_1\end{bmatrix}\begin{bmatrix} c_1\\ s_1\end{bmatrix},
\qquad k_1 = L_1 + L_2\cos\theta_2,\quad k_2 = L_2\sin\theta_2 .
$$
Write $(k_1, k_2) = \rho(\cos\gamma, \sin\gamma)$ with $\gamma = \operatorname{atan2}(k_2, k_1)$, $\rho = \sqrt{k_1^2 + k_2^2}$. Then $x = \rho\cos(\theta_1 + \gamma)$, $y = \rho\sin(\theta_1 + \gamma)$, so $\theta_1 + \gamma = \operatorname{atan2}(y, x)$, which is [[#eq-2r-ik]]. This needs $\rho > 0$; $\rho = 0$ happens only when $L_1 = L_2$ and $\theta_2 = \pi$, i.e. the tip is at the base, where $x = y = 0$ for every $\theta_1$. Geometrically, $\operatorname{atan2}(y, x)$ is the direction of the target and $\gamma$ the angle between the first link and the line from base to tip.
:::

::: example Elbow-up and elbow-down {#ex-2r-ik}
A 2R arm has $L_1 = 0.6\,\mathrm m$, $L_2 = 0.5\,\mathrm m$. Find all joint angles that put the tip at $(0.7, 0.6)\,\mathrm m$.
::: solution
$x^2 + y^2 = 0.49 + 0.36 = 0.85\,\mathrm{m^2}$, so
$$
D = \frac{0.85 - 0.36 - 0.25}{2(0.6)(0.5)} = \frac{0.24}{0.60} = 0.4, \qquad \sqrt{1 - D^2} = 0.9165 .
$$
$\lvert D\rvert < 1$: two solutions, $\theta_2 = \operatorname{atan2}(\pm0.9165, 0.4) = \pm66.42^\circ$. The target direction is $\operatorname{atan2}(0.6, 0.7) = 40.60^\circ$.
For $\theta_2 = +66.42^\circ$: $\gamma = \operatorname{atan2}(0.5\times0.9165,\ 0.6 + 0.5\times0.4) = \operatorname{atan2}(0.4583, 0.8) = 29.81^\circ$, so $\theta_1 = 40.60^\circ - 29.81^\circ = 10.80^\circ$.
For $\theta_2 = -66.42^\circ$: $\gamma = -29.81^\circ$ and $\theta_1 = 70.41^\circ$.
Check the first: $x = 0.6\cos10.80^\circ + 0.5\cos77.22^\circ = 0.5894 + 0.1106 = 0.700\,\mathrm m$, $y = 0.6\sin10.80^\circ + 0.5\sin77.22^\circ = 0.1124 + 0.4876 = 0.600\,\mathrm m$ ✓. The two solutions are mirror images in the line from the base to the target: $\theta_1$ values are symmetric about $40.60^\circ$ ($40.60 \mp 29.81$).
:::
:::

The picture behind the two solutions is visible in the error landscape. Plot the squared distance between the tip and the target as a function of $(\theta_1, \theta_2)$: it has two zeros, one per solution, separated by a ridge.

::: widget contour
f: (0.6*cos(x) + 0.5*cos(x + y) - px)^2 + (0.6*sin(x) + 0.5*sin(x + y) - py)^2
x: -3.1416, 3.1416
y: -3.1416, 3.1416
levels: 18
sliders: px=0.7:-1.2:1.2:0.05; py=0.6:-1.2:1.2:0.05
point: 0, 1.57
caption: Squared position error $\lVert\mathbf f(\boldsymbol\theta) - \mathbf p_d\rVert^2$ of the 2R arm ($L_1 = 0.6$, $L_2 = 0.5\,\mathrm m$) over joint space, $x = \theta_1$, $y = \theta_2$ in radians, for the target $(p_x, p_y)$. With the default target there are two minima with error zero, at $(0.188, 1.159)$ and $(1.229, -1.159)$ rad — elbow up and elbow down. Drag the point: the gradient arrow is the direction a gradient-based IK step would take, and which minimum you slide into depends on where you start. Move the target outside the reach ($p_x = 1.2$, $p_y = 0$): the zeros disappear and a single minimum remains, the stretched arm pointing at the target. Move it close to the base: the minima merge as the arm folds.
:::

### Adding orientation: the planar 3R arm

A planar 3R arm can place its tool at $(x, y)$ with orientation $\phi$. The trick that generalises to six-axis arms is to work backwards from the tool to the **wrist point** — the position of joint 3 — which does not depend on $\theta_3$:
$$
x_w = x - L_3\cos\phi, \qquad y_w = y - L_3\sin\phi .
$$
Solve the 2R problem for $(x_w, y_w)$, then $\theta_3 = \phi - \theta_1 - \theta_2$.

::: example Planar 3R with orientation {#ex-3r-ik}
For the 3R arm of [[robotics/forward-kinematics]] ($L_1 = 0.4$, $L_2 = 0.3$, $L_3 = 0.1\,\mathrm m$), find all solutions for the tool pose $(x, y, \phi) = (0.4948\,\mathrm m, 0.5605\,\mathrm m, 45^\circ)$.
::: solution
Wrist point: $x_w = 0.4948 - 0.1\cos45^\circ = 0.4241\,\mathrm m$, $y_w = 0.5605 - 0.0707 = 0.4898\,\mathrm m$. Then $D = (0.4241^2 + 0.4898^2 - 0.16 - 0.09)/(2\times0.4\times0.3) = (0.4197 - 0.25)/0.24 = 0.7073$, so $\theta_2 = \pm45.0^\circ$. Target direction $\operatorname{atan2}(0.4898, 0.4241) = 49.1^\circ$; for $\theta_2 = 45^\circ$, $\gamma = \operatorname{atan2}(0.3\sin45^\circ, 0.4 + 0.3\cos45^\circ) = \operatorname{atan2}(0.2121, 0.6121) = 19.1^\circ$, giving $\theta_1 = 30.0^\circ$ and $\theta_3 = 45^\circ - 30.0^\circ - 45.0^\circ = -30.0^\circ$. The other solution is $\theta_1 = 68.2^\circ$, $\theta_2 = -45.0^\circ$, $\theta_3 = 45^\circ - 68.2^\circ + 45.0^\circ = 21.8^\circ$. The first solution recovers the configuration $(30^\circ, 45^\circ, -30^\circ)$ from which the target was computed in [[robotics/forward-kinematics]] ✓.
:::
:::

## Six-axis arms: kinematic decoupling {#sec-pieper}

Six nonlinear equations in six angles have no general closed-form solution, but most industrial arms are built so that they do: their last three joint axes intersect at one point, the **wrist centre**, forming a spherical wrist. Then the problem splits into a position problem for the first three joints and an orientation problem for the last three.

::: proposition Kinematic decoupling at the wrist centre {#prop-decoupling}
Suppose the axes of joints 4, 5, 6 intersect at a point $\mathbf o_c$, and the tool frame's origin lies a distance $d_6$ from $\mathbf o_c$ along the tool's $z$-axis. For a desired pose $T_d = (R_d, \mathbf p_d)$:
1. The wrist centre must be at $\mathbf p_c = \mathbf p_d - d_6R_d\hat{\mathbf z}$; this depends only on $\theta_1, \theta_2, \theta_3$, which are found by solving $\mathbf o_c(\theta_1,\theta_2,\theta_3) = \mathbf p_c$.
2. With $\theta_1, \theta_2, \theta_3$ known, the wrist must supply the rotation $R_{36} = R_{03}(\theta_1,\theta_2,\theta_3)^{\mathsf T}R_d$, which for a spherical wrist is a set of Euler angles in $(\theta_4, \theta_5, \theta_6)$.
:::

::: proof
Joints 4, 5 and 6 rotate the outboard links about axes through $\mathbf o_c$, so they cannot move $\mathbf o_c$: its position is a function of the first three joints only. The tool origin is $\mathbf o_6 = \mathbf o_c + d_6R_{06}\hat{\mathbf z}$ (the offset is $d_6$ along the tool's own $z$-axis, whose space direction is the third column of $R_{06}$). Setting $\mathbf o_6 = \mathbf p_d$ and $R_{06} = R_d$ gives $\mathbf o_c = \mathbf p_d - d_6R_d\hat{\mathbf z}$, which is part 1. For part 2, $R_{06} = R_{03}R_{36}$ with $R_{36}$ depending only on $\theta_4, \theta_5, \theta_6$; multiplying $R_{03}R_{36} = R_d$ on the left by $R_{03}^{\mathsf T}$ gives the stated $R_{36}$. For the standard spherical wrist (DH rows $(0, -90^\circ, 0, \theta_4)$, $(0, 90^\circ, 0, \theta_5)$, $(0, 0, d_6, \theta_6)$), the product of the three rotation blocks is $\mathrm{Rot}_z(\theta_4)\mathrm{Rot}_y(\theta_5)\mathrm{Rot}_z(\theta_6)$, so $(\theta_4,\theta_5,\theta_6)$ are the ZYZ Euler angles of $R_{36}$, extracted as in [[robotics/rigid-motions]].
:::

The position problem for the elbow arm of [[robotics/forward-kinematics]] (waist $\theta_1$, shoulder $\theta_2$ and elbow $\theta_3$, with $\mathbf o_c = \mathbf o_3$) is solved by geometry: the waist angle points the arm's vertical plane at the target,
$$
\theta_1 = \operatorname{atan2}(y_c, x_c)\quad\text{or}\quad \theta_1 = \operatorname{atan2}(y_c, x_c) + \pi ,
$$
and in that plane shoulder and elbow form a 2R arm with links $a_2, a_3$ that must reach the point at horizontal distance $r = \pm\sqrt{x_c^2 + y_c^2}$ (the sign negative for the "reaching backwards" choice of $\theta_1$) and height $s = z_c - d_1$ above the shoulder. [[#prop-2r-ik]] gives two solutions for each $\theta_1$: four arm solutions in all, each combined with two wrist solutions, for **eight** IK solutions.

::: example The four arm solutions of an elbow manipulator {#ex-elbow-ik}
The elbow arm with $d_1 = 0.50$, $a_2 = 0.60$, $a_3 = 0.50\,\mathrm m$ must place its wrist centre at $\mathbf p_c = (0.7857, 0.4536, 0.7949)\,\mathrm m$. Find all $(\theta_1, \theta_2, \theta_3)$.
::: solution
$\theta_1 = \operatorname{atan2}(0.4536, 0.7857) = 30.0^\circ$ (front) or $210.0^\circ$ (back). Horizontal distance $\sqrt{0.7857^2 + 0.4536^2} = 0.9073\,\mathrm m$; height above the shoulder $s = 0.7949 - 0.50 = 0.2949\,\mathrm m$. Elbow: $D = (0.9073^2 + 0.2949^2 - 0.36 - 0.25)/(2\times0.6\times0.5) = (0.9100 - 0.61)/0.60 = 0.500$, so $\theta_3 = \pm60.0^\circ$.
*Front* ($r = +0.9073$): direction to target in the arm plane $\operatorname{atan2}(0.2949, 0.9073) = 18.0^\circ$; for $\theta_3 = -60^\circ$, $\gamma = \operatorname{atan2}(0.5\sin(-60^\circ), 0.6 + 0.5\cos60^\circ) = \operatorname{atan2}(-0.4330, 0.85) = -27.0^\circ$, so $\theta_2 = 45.0^\circ$; for $\theta_3 = +60^\circ$, $\theta_2 = 18.0^\circ - 27.0^\circ = -9.0^\circ$.
*Back* ($\theta_1 = 210^\circ$, $r = -0.9073$): direction $\operatorname{atan2}(0.2949, -0.9073) = 162.0^\circ$, giving $\theta_2 = 135.0^\circ$ with $\theta_3 = +60^\circ$ and $\theta_2 = 189.0^\circ$ ($= -171.0^\circ$) with $\theta_3 = -60^\circ$.
The solution $(30^\circ, 45^\circ, -60^\circ)$ is the configuration from which $\mathbf p_c$ was computed in [[robotics/forward-kinematics]] ✓. The others are "elbow down" ($(30^\circ, -9^\circ, 60^\circ)$) and two "reaching over the top" solutions, which on a real arm would usually violate the shoulder's joint limits. Check one by forward kinematics: for $(30^\circ, -9^\circ, 60^\circ)$, $r = 0.6\cos(-9^\circ) + 0.5\cos51^\circ = 0.5926 + 0.3147 = 0.9073$ ✓ and $s = 0.6\sin(-9^\circ) + 0.5\sin51^\circ = -0.0939 + 0.3886 = 0.2947 \approx 0.2949$ ✓ (rounding).
:::
:::

::: example Wrist angles {#ex-wrist}
After the arm angles are found, the required wrist rotation is computed as
$$
R_{36} = R_{03}^{\mathsf T}R_d = \begin{bmatrix} 0.5798 & -0.4730 & 0.6634\\ 0.0400 & 0.8298 & 0.5567\\ -0.8138 & -0.2962 & 0.5000\end{bmatrix}.
$$
Find both sets of wrist angles $(\theta_4, \theta_5, \theta_6)$ for a ZYZ spherical wrist.
::: solution
With the ZYZ extraction formulas of [[robotics/rigid-motions]]: $\theta_5 = \operatorname{atan2}(\pm\sqrt{r_{13}^2 + r_{23}^2},\ r_{33}) = \operatorname{atan2}(\pm\sqrt{0.4401 + 0.3099},\ 0.5) = \operatorname{atan2}(\pm0.8660, 0.5) = \pm60.0^\circ$.
For $\theta_5 = +60^\circ$ ($\sin\theta_5 > 0$): $\theta_4 = \operatorname{atan2}(r_{23}, r_{13}) = \operatorname{atan2}(0.5567, 0.6634) = 40.0^\circ$, $\theta_6 = \operatorname{atan2}(r_{32}, -r_{31}) = \operatorname{atan2}(-0.2962, 0.8138) = -20.0^\circ$.
For $\theta_5 = -60^\circ$, all signs of $\sin\theta_5$ flip: $\theta_4 = \operatorname{atan2}(-r_{23}, -r_{13}) = -140.0^\circ$, $\theta_6 = \operatorname{atan2}(-r_{32}, r_{31}) = 160.0^\circ$.
The two solutions differ by $180^\circ$ in $\theta_4$ and $\theta_6$ and in the sign of $\theta_5$ — the "wrist flip". Check: $r_{33} = \cos\theta_5 = 0.5$ for both ✓; $r_{13} = \cos\theta_4\sin\theta_5 = \cos40^\circ\sin60^\circ = 0.6634$ ✓. At $\theta_5 = 0$ the wrist is singular: axes 4 and 6 align and only $\theta_4 + \theta_6$ is determined.
:::
:::

::: warning Use atan2, and choose the solution deliberately
Writing $\theta = \arctan(y/x)$ loses the quadrant (it cannot tell $(1,1)$ from $(-1,-1)$) and fails at $x = 0$; writing $\theta = \arccos(D)$ loses the sign. Every closed-form IK in this chapter uses $\operatorname{atan2}$ of a sine–cosine pair. Second, an IK routine that returns "a" solution is not enough on a real robot: consecutive targets along a path must be solved with the *same* branch (elbow up, wrist not flipped), or the arm will swing through a large motion between two nearby poses. Choose the branch once, check joint limits, and between path points prefer the solution nearest the current joint vector, taking angle wrap-around into account ($179^\circ$ and $-179^\circ$ are $2^\circ$ apart).
:::

## Numerical inverse kinematics {#sec-numerical}

For arms without a spherical wrist, for redundant arms, and for tasks that specify only part of the pose, the IK equations are solved iteratively. Write the task as finding a root of $\mathbf e(\boldsymbol\theta) = \mathbf x_d - \mathbf f(\boldsymbol\theta)$, where $\mathbf f$ is the forward kinematics expressed as a vector of task coordinates (position, or position and a suitable orientation error). Near a guess $\boldsymbol\theta_k$, Taylor's theorem gives $\mathbf f(\boldsymbol\theta_k + \Delta\boldsymbol\theta) \approx \mathbf f(\boldsymbol\theta_k) + J(\boldsymbol\theta_k)\Delta\boldsymbol\theta$, with $J = \partial\mathbf f/\partial\boldsymbol\theta$ the Jacobian; setting the linearised error to zero gives Newton's method ([numerical analysis in Maths Atlas](/learn/maths/lesson.php?c=numerical-analysis)).

::: algorithm Newton–Raphson inverse kinematics {#alg-newton-ik}
Input: target $\mathbf x_d$, initial guess $\boldsymbol\theta_0$ (usually the current joint vector), tolerance $\varepsilon$, iteration limit $k_{\max}$.
1. Compute $\mathbf e_k = \mathbf x_d - \mathbf f(\boldsymbol\theta_k)$. If $\lVert\mathbf e_k\rVert < \varepsilon$, stop and return $\boldsymbol\theta_k$.
2. Compute $J_k = J(\boldsymbol\theta_k)$ and solve $J_k\Delta\boldsymbol\theta = \mathbf e_k$ (square $J$), or take $\Delta\boldsymbol\theta = J_k^{+}\mathbf e_k$ with the pseudoinverse (non-square $J$).
3. Set $\boldsymbol\theta_{k+1} = \boldsymbol\theta_k + \Delta\boldsymbol\theta$, wrap revolute angles into $(-\pi, \pi]$, and repeat. If $k > k_{\max}$, report failure.
:::

Near a solution at which $J$ is invertible, Newton's method converges **quadratically**: the number of correct digits roughly doubles each step. Far from a solution, or near a singular configuration, it can take huge steps and wander.

::: example Newton iteration for the 2R arm {#ex-newton}
Solve [[#ex-2r-ik]] numerically from the guess $\boldsymbol\theta_0 = (0, \pi/2)$.
::: solution
The 2R Jacobian (derived in [[robotics/jacobians]]) is
$$
J = \begin{bmatrix} -L_1s_1 - L_2s_{12} & -L_2s_{12}\\ L_1c_1 + L_2c_{12} & L_2c_{12}\end{bmatrix}.
$$
*Step 0.* $\mathbf f(\boldsymbol\theta_0) = (0.6 + 0.5\cos90^\circ,\ 0 + 0.5\sin90^\circ) = (0.6, 0.5)$, so $\mathbf e_0 = (0.1, 0.1)\,\mathrm m$, $\lVert\mathbf e_0\rVert = 0.141\,\mathrm m$, and $J_0 = \begin{bmatrix} -0.5 & -0.5\\ 0.6 & 0\end{bmatrix}$. The second row gives $0.6\,\Delta\theta_1 = 0.1$, so $\Delta\theta_1 = 0.1667$; the first, $-0.5(0.1667) - 0.5\,\Delta\theta_2 = 0.1$, gives $\Delta\theta_2 = -0.3667$. New guess $\boldsymbol\theta_1 = (0.1667, 1.2041)\,\mathrm{rad}$.
*Subsequent steps* (computed the same way):

| $k$ | $\theta_1$ (rad) | $\theta_2$ (rad) | $\lVert\mathbf e_k\rVert$ (m) |
|---|---|---|---|
| 0 | 0 | 1.5708 | $1.4\times10^{-1}$ |
| 1 | 0.1667 | 1.2041 | $1.4\times10^{-2}$ |
| 2 | 0.1881 | 1.1600 | $2.2\times10^{-4}$ |
| 3 | 0.1884 | 1.1593 | $6.3\times10^{-8}$ |
| 4 | 0.1884 | 1.1593 | $4.9\times10^{-15}$ |

The limit $(0.1884, 1.1593)\,\mathrm{rad} = (10.80^\circ, 66.42^\circ)$ is the elbow-up solution of [[#ex-2r-ik]]. The error exponent roughly doubles each step ($10^{-2}, 10^{-4}, 10^{-8}, 10^{-15}$) — quadratic convergence. Starting from $(\pi/2, -\pi/2)$ instead, the iteration converges just as fast to the elbow-down solution $(70.41^\circ, -66.42^\circ)$; starting from $(0, -\pi/2)$, where the guess sits on the far side of the ridge in the error landscape below, the first steps are large, the iterates wander for about ten steps, and they finally converge to the elbow-*up* solution. Newton returns the solution in whose basin of attraction the guess lies, which is why the current joint vector is the natural initial guess.
:::
:::

When the target is unreachable, or the arm passes near a singularity, $J$ is nearly singular and $J^{-1}\mathbf e$ is huge. The remedy is to ask for a step that reduces the error *and* stays small.

::: proposition Damped least-squares step {#prop-dls}
For $\lambda > 0$, the step that minimises
$$
\lVert J\Delta\boldsymbol\theta - \mathbf e\rVert^2 + \lambda^2\lVert\Delta\boldsymbol\theta\rVert^2
$$
is unique and equals
$$
\Delta\boldsymbol\theta = (J^{\mathsf T}J + \lambda^2I)^{-1}J^{\mathsf T}\mathbf e = J^{\mathsf T}(JJ^{\mathsf T} + \lambda^2I)^{-1}\mathbf e .
$$ {#eq-dls}
Along a singular direction of $J$ with singular value $\sigma$, the gain is $\sigma/(\sigma^2 + \lambda^2) \le 1/(2\lambda)$, instead of $1/\sigma$ for the exact inverse.
:::

::: proof
The objective is a convex quadratic in $\Delta\boldsymbol\theta$: $\Delta\boldsymbol\theta^{\mathsf T}(J^{\mathsf T}J + \lambda^2I)\Delta\boldsymbol\theta - 2\mathbf e^{\mathsf T}J\Delta\boldsymbol\theta + \mathbf e^{\mathsf T}\mathbf e$. Its Hessian $2(J^{\mathsf T}J + \lambda^2I)$ is positive definite for $\lambda > 0$ (since $\mathbf u^{\mathsf T}J^{\mathsf T}J\mathbf u = \lVert J\mathbf u\rVert^2 \ge 0$), so the unique minimiser is where the gradient vanishes: $(J^{\mathsf T}J + \lambda^2I)\Delta\boldsymbol\theta = J^{\mathsf T}\mathbf e$. The second form follows from the identity $J^{\mathsf T}(JJ^{\mathsf T} + \lambda^2I) = (J^{\mathsf T}J + \lambda^2I)J^{\mathsf T}$, multiplied on the left by $(J^{\mathsf T}J + \lambda^2I)^{-1}$ and on the right by $(JJ^{\mathsf T} + \lambda^2I)^{-1}$; it requires inverting only an $m\times m$ matrix ($m$ = task dimension), which is cheaper for redundant arms. For the gain, write the singular value decomposition $J = U\Sigma V^{\mathsf T}$ ([SVD](/learn/maths/lesson.php?c=linear-algebra&l=svd)); then [[#eq-dls]] becomes $\Delta\boldsymbol\theta = \sum_i \frac{\sigma_i}{\sigma_i^2 + \lambda^2}\mathbf v_i\mathbf u_i^{\mathsf T}\mathbf e$. The function $\sigma/(\sigma^2 + \lambda^2)$ has maximum $1/(2\lambda)$ at $\sigma = \lambda$ and tends to zero as $\sigma\to0$, while $1/\sigma \to \infty$.
:::

The **damping** $\lambda$ (units of the task coordinates, here metres) trades accuracy for robustness: far from singularities ($\sigma_i \gg \lambda$) the step is nearly the Newton step; near them it is limited. As $\lambda\to\infty$, $\Delta\boldsymbol\theta \approx J^{\mathsf T}\mathbf e/\lambda^2$, which is a small step along the negative gradient of $\frac12\lVert\mathbf e\rVert^2$ — the **Jacobian-transpose** method, robust but slow (linear convergence).

::: example Damped least squares for an unreachable target {#ex-dls}
The 2R arm ($L_1 = 0.6$, $L_2 = 0.5\,\mathrm m$, maximum reach $1.1\,\mathrm m$) is asked to put its tip at $(1.3, 0)\,\mathrm m$, starting from $\boldsymbol\theta_0 = (0.3, 0.6)\,\mathrm{rad}$. Compare Newton with damped least squares, $\lambda = 0.3\,\mathrm m$.
::: solution
The target is $0.2\,\mathrm m$ beyond reach, so no exact solution exists; the best possible is the stretched arm pointing along $+x$, $\boldsymbol\theta = (0, 0)$, with error $0.2\,\mathrm m$. Iterating (numbers from a short script):

| $k$ | Newton $\lVert\mathbf e_k\rVert$ (m) | Newton $\lVert\Delta\boldsymbol\theta\rVert$ (rad) | DLS $\lVert\mathbf e_k\rVert$ (m) | DLS $\boldsymbol\theta_k$ (rad) |
|---|---|---|---|---|
| 0 | 0.705 | 0.61 | 0.705 | $(0.300, 0.600)$ |
| 1 | 0.245 | 2.54 | 0.227 | $(-0.219, 0.360)$ |
| 2 | 0.670 | 1.64 | 0.206 | $(-0.090, 0.201)$ |
| 3 | 0.229 | 2.13 | 0.201 | $(-0.048, 0.099)$ |
| 4 | 0.490 | 1.45 | 0.200 | $(-0.024, 0.050)$ |
| 5 | 0.206 | 4.95 | 0.200 | $(-0.012, 0.025)$ |

Newton keeps trying to stretch the arm beyond its length: as $\theta_2\to0$ the Jacobian becomes singular, the steps grow to several radians and the iterates jump between configurations. Damped least squares settles smoothly on the stretched configuration, with the error at its minimum $0.200\,\mathrm m$ and steps halving each iteration. In an online controller the Newton behaviour would mean violent joint motion; this is why commercial IK solvers damp (often with $\lambda$ increased only near singularities). With $\lambda = 0.1\,\mathrm m$ the same DLS iteration still oscillates (the damping is too weak for this geometry), while $\lambda = 0.2$–$0.5\,\mathrm m$ all converge.
:::
:::

::: widget gradientdescent
f: (0.6*cos(x) + 0.5*cos(x + y) - 0.7)^2 + (0.6*sin(x) + 0.5*sin(x + y) - 0.6)^2
start: -1, -2.5
rate: 0.5
steps: 60
x: -3.1416, 3.1416
y: -3.1416, 3.1416
caption: The Jacobian-transpose method is gradient descent on half the squared error, here for the 2R arm and the target $(0.7, 0.6)\,\mathrm m$ ($x = \theta_1$, $y = \theta_2$ in radians). Drag the start point and change the rate. From most starts the iterates slide into one of the two zero-error minima (elbow up or elbow down), but slowly and along a curved valley — compare the four Newton steps of the worked example. Too large a rate makes the iterates overshoot and zig-zag; too small a rate makes progress glacial.
:::

::: quiz
A six-axis arm with a spherical wrist is asked to reach a pose well inside its workspace and away from singularities. Ignoring joint limits, how many IK solutions should a complete closed-form solver return?
- [ ] 1
- [ ] 2
- [ ] 4
- [x] 8
::: solution
Two choices of waist angle (front or back), two elbow configurations for each, and two wrist configurations (wrist flip) for each arm solution: $2\times2\times2 = 8$. Joint limits usually remove several of them; at singular poses some coincide.
:::
:::

::: history
Donald Pieper's 1968 Stanford PhD thesis, *The Kinematics of Manipulators under Computer Control*, showed that a six-axis arm whose last three axes intersect can be solved in closed form by separating position and orientation — the design rule followed by almost every industrial arm since, beginning with Victor Scheinman's Stanford Arm of 1969. Daniel Whitney's 1969 paper on resolved-motion rate control introduced the iterative use of the inverse Jacobian to drive an arm towards a target. The general six-revolute problem resisted closed-form solution for two decades: Primrose proved in 1986 that it has at most 16 solutions, and in the late 1980s Lee and Liang, and Raghavan and Roth, reduced it to a polynomial of degree 16 in one joint variable.
:::

::: summary
- Inverse kinematics finds $\boldsymbol\theta$ with $T(\boldsymbol\theta) = T_d$; there may be none, finitely many (up to 16 for general 6R arms, up to 8 with a spherical wrist) or a continuum (redundant arms).
- Planar 2R: $D = (x^2 + y^2 - L_1^2 - L_2^2)/(2L_1L_2)$; reachable iff $\lvert D\rvert\le1$; $\theta_2 = \operatorname{atan2}(\pm\sqrt{1 - D^2}, D)$, $\theta_1 = \operatorname{atan2}(y, x) - \operatorname{atan2}(L_2s_2, L_1 + L_2c_2)$.
- With orientation, subtract the last link to get the wrist point, solve for the arm, and recover the last angle.
- Pieper decoupling: wrist centre $\mathbf p_c = \mathbf p_d - d_6R_d\hat{\mathbf z}$ fixes $\theta_1,\theta_2,\theta_3$; then $R_{36} = R_{03}^{\mathsf T}R_d$ gives the wrist's Euler angles (two solutions, the wrist flip).
- Newton–Raphson converges quadratically from a good guess and returns the nearby solution; damped least squares $\Delta\boldsymbol\theta = J^{\mathsf T}(JJ^{\mathsf T} + \lambda^2I)^{-1}\mathbf e$ limits steps near singularities and for unreachable targets.
- Always use atan2, choose and keep a solution branch, and respect joint limits and angle wrap-around.
:::

## Exercises

::: exercise The elbow angle {#exr-elbow level=1 check="87.71"}
A 2R arm with $L_1 = L_2 = 0.5\,\mathrm m$ must reach $(0.6, 0.4)\,\mathrm m$. Find the positive solution for $\theta_2$. (Enter $\theta_2$ in degrees, rounded to two decimal places.)
::: solution
$D = (0.36 + 0.16 - 0.25 - 0.25)/(2\times0.25) = 0.02/0.5 = 0.04$, so $\theta_2 = \operatorname{atan2}(\sqrt{1 - 0.0016}, 0.04) = 87.71^\circ$. The target is at $0.721\,\mathrm m$ from the base, a little over $\sqrt2\times0.5 = 0.707\,\mathrm m$ (the reach at a right-angled elbow), so $\theta_2$ slightly under $90^\circ$ is consistent.
:::
:::

::: exercise Reachable or not? {#exr-reach level=1 check="0.88/0.56"}
A 2R arm has $L_1 = 0.7\,\mathrm m$, $L_2 = 0.4\,\mathrm m$. Compute $D$ for the target $(1.2, 0.3)\,\mathrm m$ and decide whether it is reachable. (Enter $D$ exactly, for example as a fraction.)
::: solution
$D = (1.44 + 0.09 - 0.49 - 0.16)/(2\times0.7\times0.4) = 0.88/0.56 = 1.571 > 1$: unreachable. Indeed the target is $\sqrt{1.53} = 1.237\,\mathrm m$ away and the reach is $1.1\,\mathrm m$. A numerical solver should report failure or return the nearest reachable configuration (stretched arm pointing at the target), not a fabricated angle.
:::
:::

::: exercise Waist angle {#exr-waist level=1 check="126.87"}
The wrist centre of an elbow arm must be at $(-0.3, 0.4, 0.8)\,\mathrm m$. Find the "front" waist angle $\theta_1$. (Enter it in degrees, in $(-180, 180]$, rounded to two decimal places.)
::: solution
$\theta_1 = \operatorname{atan2}(0.4, -0.3) = 126.87^\circ$; the "back" solution is $126.87^\circ - 180^\circ = -53.13^\circ$ with the arm reaching over. Note that $\arctan(0.4/(-0.3)) = -53.13^\circ$ — the plain arctangent returns the back solution, a classic quadrant error.
:::
:::

::: exercise Planar 3R target {#exr-3r level=2 check="21.11"}
For the 3R arm with $L_1 = 0.4$, $L_2 = 0.3$, $L_3 = 0.1\,\mathrm m$, find both solutions for $(x, y, \phi) = (0.5\,\mathrm m, 0.3\,\mathrm m, 90^\circ)$. (Enter $\theta_3$, in degrees, for the solution with $\theta_2 > 0$, rounded to two decimal places.)
::: solution
Wrist point $(0.5 - 0.1\cos90^\circ,\ 0.3 - 0.1\sin90^\circ) = (0.5, 0.2)\,\mathrm m$. $D = (0.25 + 0.04 - 0.16 - 0.09)/0.24 = 0.1667$, $\theta_2 = \pm80.41^\circ$. Direction $\operatorname{atan2}(0.2, 0.5) = 21.80^\circ$. For $\theta_2 = +80.41^\circ$: $\gamma = \operatorname{atan2}(0.3\sin80.41^\circ, 0.4 + 0.3\cos80.41^\circ) = \operatorname{atan2}(0.2958, 0.4500) = 33.32^\circ$, $\theta_1 = -11.52^\circ$, $\theta_3 = 90^\circ + 11.52^\circ - 80.41^\circ = 21.11^\circ$. For $\theta_2 = -80.41^\circ$: $\theta_1 = 55.12^\circ$, $\theta_3 = 90^\circ - 55.12^\circ + 80.41^\circ = 115.29^\circ$. Check the first by forward kinematics: $x = 0.4\cos(-11.52^\circ) + 0.3\cos68.89^\circ + 0.1\cos90^\circ = 0.3919 + 0.1081 + 0 = 0.500$ ✓.
:::
:::

::: exercise One Newton step by hand {#exr-newton level=2 check="1/6"}
Carry out the first Newton–Raphson step of [[#ex-newton]] yourself: from $\boldsymbol\theta_0 = (0, \pi/2)$, target $(0.7, 0.6)\,\mathrm m$, $L_1 = 0.6$, $L_2 = 0.5\,\mathrm m$. (Enter $\theta_1$ after the step, in rad, exactly — a fraction is accepted.)
::: solution
$\mathbf f(\boldsymbol\theta_0) = (0.6, 0.5)$, $\mathbf e_0 = (0.1, 0.1)$; at $\boldsymbol\theta_0$, $s_1 = 0$, $c_1 = 1$, $s_{12} = 1$, $c_{12} = 0$, so $J_0 = \begin{bmatrix} -0.5 & -0.5\\ 0.6 & 0\end{bmatrix}$. Solving $J_0\Delta\boldsymbol\theta = \mathbf e_0$: $\Delta\theta_1 = 0.1/0.6 = 1/6$, $\Delta\theta_2 = -(0.1 + 0.5/6)/0.5 = -0.3667$. Hence $\theta_1 = 0.1667\,\mathrm{rad}$, $\theta_2 = 1.2041\,\mathrm{rad}$, and the error drops from $0.141$ to $0.0138\,\mathrm m$.
:::
:::

::: exercise Wrist angles from a rotation matrix {#exr-wrist level=2 check="100"}
A spherical ZYZ wrist must produce
$$
R_{36} = \begin{bmatrix} 0.3861 & -0.6899 & 0.6124\\ 0.9143 & 0.1978 & -0.3536\\ 0.1228 & 0.6964 & 0.7071\end{bmatrix}.
$$
Find both solutions. (Enter $\theta_6$ in degrees for the solution with $\theta_5 > 0$.)
::: solution
$\theta_5 = \operatorname{atan2}(\pm\sqrt{0.6124^2 + 0.3536^2}, 0.7071) = \operatorname{atan2}(\pm0.7071, 0.7071) = \pm45^\circ$. With $\theta_5 = 45^\circ$: $\theta_4 = \operatorname{atan2}(-0.3536, 0.6124) = -30^\circ$, $\theta_6 = \operatorname{atan2}(0.6964, -0.1228) = 100^\circ$. With $\theta_5 = -45^\circ$: $\theta_4 = 150^\circ$, $\theta_6 = -80^\circ$. Check: $r_{31} = -\sin\theta_5\cos\theta_6 = -0.7071\cos100^\circ = 0.1228$ ✓.
:::
:::

::: exercise The Jacobian-transpose step is a descent direction {#exr-jt level=3}
Let $E(\boldsymbol\theta) = \frac12\lVert\mathbf x_d - \mathbf f(\boldsymbol\theta)\rVert^2$. Show that $\nabla E = -J^{\mathsf T}\mathbf e$, and hence that the step $\Delta\boldsymbol\theta = \alpha J^{\mathsf T}\mathbf e$ decreases $E$ for small enough $\alpha > 0$ unless $J^{\mathsf T}\mathbf e = \mathbf 0$. Interpret the condition $J^{\mathsf T}\mathbf e = \mathbf 0$ for the unreachable target of [[#ex-dls]], and show that the damped least-squares step is also a descent direction.
::: solution
$E = \frac12\mathbf e^{\mathsf T}\mathbf e$ with $\partial\mathbf e/\partial\boldsymbol\theta = -J$, so $\nabla E = -J^{\mathsf T}\mathbf e$ by the chain rule. For $\Delta\boldsymbol\theta = \alpha J^{\mathsf T}\mathbf e$, $E(\boldsymbol\theta + \Delta\boldsymbol\theta) = E(\boldsymbol\theta) + \nabla E^{\mathsf T}\Delta\boldsymbol\theta + O(\alpha^2) = E - \alpha\lVert J^{\mathsf T}\mathbf e\rVert^2 + O(\alpha^2)$, which is smaller than $E$ for small $\alpha$ when $J^{\mathsf T}\mathbf e \ne \mathbf 0$. The condition $J^{\mathsf T}\mathbf e = \mathbf 0$ means the error is orthogonal to every achievable tip velocity: a stationary point of $E$. For the unreachable target, at $\boldsymbol\theta = (0,0)$ the arm is stretched along $x$, every tip velocity is along $y$ (both columns of $J$ are $(0, \cdot)$), and the error $(0.2, 0)$ is along $x$, so $J^{\mathsf T}\mathbf e = \mathbf 0$: the best the arm can do. For DLS, $\nabla E^{\mathsf T}\Delta\boldsymbol\theta = -\mathbf e^{\mathsf T}J(J^{\mathsf T}J + \lambda^2I)^{-1}J^{\mathsf T}\mathbf e = -\mathbf w^{\mathsf T}(J^{\mathsf T}J + \lambda^2I)^{-1}\mathbf w < 0$ for $\mathbf w = J^{\mathsf T}\mathbf e \ne \mathbf 0$, because $(J^{\mathsf T}J + \lambda^2I)^{-1}$ is positive definite. (A descent direction guarantees progress only for a short enough step; the oscillation found with $\lambda = 0.1\,\mathrm m$ shows that the full DLS step can still be too long.)
:::
:::

::: exercise Choosing among IK solutions {#exr-choose level=3}
An elbow arm with a spherical wrist must follow a straight welding seam. At the start of the seam your closed-form solver returns eight solutions. (a) List criteria for picking one. (b) Halfway along the seam, the wrist passes close to $\theta_5 = 0$. Explain what happens to $\theta_4$ and $\theta_6$ if the solver always picks the solution nearest the previous joint vector, and propose a remedy. (c) Why do most industrial arms use a spherical wrist even though it creates this singularity inside the workspace?
::: solution
(a) Joint limits (discard solutions outside them); collision with the base, fixtures and the robot itself; distance from singularities over the whole seam (prefer solutions whose $\theta_5$ and elbow angle stay away from $0$); continuity (the same branch for the whole seam); cable and hose wrap on the wrist; and secondary preferences such as minimum joint motion from the current pose or best manipulability.
(b) Near $\theta_5 = 0$ only $\theta_4 + \theta_6$ is well determined ([[#ex-wrist]]). A small change in the tool orientation around the singular direction requires a large, fast, opposite rotation of $\theta_4$ and $\theta_6$ (up to $180^\circ$ in a short time) — "wrist flip". Nearest-solution tracking follows it and demands joint rates beyond the motors' limits. Remedies: re-plan the path to keep $\lvert\theta_5\rvert$ above a few degrees (tilt the torch slightly — the weld usually tolerates a few degrees of work angle), slow down near the singularity, use damped least squares so that a small orientation error is accepted instead of an unbounded rate, or, on a redundant arm, use the extra joint to avoid the singularity.
(c) Decoupling makes IK closed-form, fast and complete (all eight solutions, which matters for choosing branches and checking limits); the wrist is compact and the three wrist motors can be mounted on the forearm, reducing moving mass; and the wrist singularity is easy to describe ($\theta_5 = 0$) and therefore easy to avoid in planning. Arms without a spherical wrist (some collaborative arms with offset wrists) trade these benefits for other advantages such as fewer singularities inside the workspace, and need numerical or more elaborate analytical IK.
:::
:::

## Further reading

Spong, Hutchinson and Vidyasagar solve the inverse kinematics of the elbow and Stanford arms with spherical wrists in the DH convention used here; Siciliano et al. treat numerical inverse kinematics, damped least squares and redundancy in depth; Lynch and Park give the Newton–Raphson method in the exponential-coordinates setting.
