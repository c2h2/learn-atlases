A new arm returns to a taught point with astonishing consistency — two or three hundredths of a millimetre is normal for a mid-size industrial arm — yet asked to move to a point given in coordinates it may miss by a millimetre or more. The first number is **repeatability**, the second **accuracy**, and the gap between them is the subject of this chapter. Repeatability is set by the hardware: encoder resolution, backlash, friction, thermal drift during a cycle. Accuracy is set by how well the *model* in the controller — the link lengths, joint zeros and axis directions of [[robotics/forward-kinematics]] — matches the arm that was actually built. Arms that are taught by leading them to each point by hand need only repeatability. Arms that are programmed offline from CAD, that receive targets from a camera, or that must be swapped for a spare without reteaching need accuracy, and accuracy comes from **calibration**: measuring the real arm and correcting its model. We treat three calibrations that every integrator meets: **kinematic calibration** of the arm itself, **tool-centre-point calibration** of the end effector, and **hand–eye calibration** of a camera relative to the arm, with a brief account of camera intrinsics. The software that stores and applies the results was described in [[robot-arm-design/software-stack]].

## Accuracy, repeatability and where errors come from {#sec-errors}

::: definition Pose accuracy and repeatability {#def-accuracy}
Command the arm $n$ times to the same pose from the same direction and measure the attained positions $\mathbf x_1, \dots, \mathbf x_n$ with an external instrument. Let $\bar{\mathbf x}$ be their mean and $\mathbf x_c$ the commanded position. The **(position) accuracy** is the distance $\lVert\bar{\mathbf x} - \mathbf x_c\rVert$ between the mean attained and the commanded position. The **(position) repeatability** is the radius of the sphere that contains the attained positions about their mean, defined in ISO 9283 as $\bar l + 3s_l$, where $l_j = \lVert\mathbf x_j - \bar{\mathbf x}\rVert$ and $\bar l$, $s_l$ are the mean and standard deviation of the $l_j$. Orientation accuracy and repeatability are defined in the same way with angles.
:::

Data sheets quote repeatability because it is small and stable; accuracy depends on the pose, the payload, the temperature and the calibration, and is often not quoted at all. As rough orders of magnitude (public specifications as of 2026): repeatability of $\pm0.02$–$0.1\,\mathrm{mm}$ for industrial arms of 5–50 kg payload, and $\pm0.03$–$0.1\,\mathrm{mm}$ for collaborative arms; absolute accuracy of an uncalibrated arm of the order of 1–5 mm, improved by calibration to a few tenths of a millimetre, and to about 0.1 mm with the best "high-accuracy" options that add secondary encoders or compliance models.

The errors that calibration addresses are divided into two groups.

- **Geometric errors** are errors in the parameters of the kinematic model: link lengths and offsets that differ from the drawing because of machining and assembly tolerances, joint axes that are not exactly parallel or perpendicular, and — the largest single item in most arms — **joint zero offsets**, the difference between the encoder reading the controller calls zero and the zero of the model. They are constant and are corrected by identifying better parameters.
- **Non-geometric errors** depend on the state of the arm: **joint and link compliance** (the reducer twists and the links bend under gravity and payload, [[robot-arm-design/gear-reducers]] and [[robot-arm-design/links-and-structure]]), **thermal expansion** of the links and drift of the drives as the arm warms up, **gear transmission errors** and backlash, and encoder eccentricity. Some can be modelled and identified (compliance, to good effect); others are only reduced by design or by warming the arm up before precise work.

::: example An error budget for an uncalibrated arm {#ex-budget}
A six-axis arm has a reach of $0.9\,\mathrm m$ from the shoulder (joint 2) to the tool point, with aluminium links totalling $1.0\,\mathrm m$. Estimate the tool-point error from (a) a joint-2 zero offset of $0.02^\circ$, (b) a link-length error of $0.3\,\mathrm{mm}$, (c) the twist of the joint-2 reducer, of torsional stiffness $8.0\times10^{4}\,\mathrm{N\,m/rad}$, under a gravity torque of $120\,\mathrm{N\,m}$ with the arm stretched horizontally, and (d) a temperature rise of $12\,\mathrm K$ of the links during the first hour of work. Which terms does kinematic calibration remove?
::: solution
(a) A small rotation $\delta$ of the shoulder moves the tool point by $r\delta$: $\delta = 0.02^\circ = 3.49\times10^{-4}\,\mathrm{rad}$, so $0.9\times3.49\times10^{-4} = 3.1\times10^{-4}\,\mathrm m = 0.31\,\mathrm{mm}$.

(b) A length error moves the tool by its own size along the link: $0.30\,\mathrm{mm}$.

(c) The reducer twists by $\tau/k = 120/(8.0\times10^4) = 1.5\times10^{-3}\,\mathrm{rad}$, which at $0.9\,\mathrm m$ is $1.35\,\mathrm{mm}$ — downwards, and varying with the pose and the payload.

(d) Aluminium expands by $\alpha = 23\times10^{-6}\,\mathrm K^{-1}$: $\Delta L = \alpha L\Delta T = 23\times10^{-6}\times1.0\times12 = 2.8\times10^{-4}\,\mathrm m = 0.28\,\mathrm{mm}$.

Kinematic (geometric) calibration removes (a) and (b), which are constant. The compliance term (c), the largest, is configuration-dependent; it is removed only if the model includes joint stiffnesses and the controller computes the gravity torques ([[#sec-nongeometric]]). The thermal term (d) changes with time and is managed by warm-up, temperature compensation or periodic re-referencing. Sanity check: the terms are comparable with the 1–5 mm accuracy of uncalibrated arms quoted above, and each is ten or more times the arm's repeatability — so the arm can repeat an error far more precisely than it can avoid it.
:::
:::

::: widget plot
f: x*d*pi/180*1000; 0*x + a*L*T/1000; x*t/k
x: 0, 1.5
y: 0, 3
sliders: d=0.02:0:0.1:0.005; a=23:10:25:0.5; L=1:0.3:2:0.1; T=12:0:30:1; t=120:0:400:10; k=80:20:300:5
labels: \text{zero offset } d\ (^\circ); \text{thermal } \alpha L\Delta T; \text{reducer twist } \tau/k
caption: Tool-point error in mm against reach $r$ in m for three error sources: a joint zero offset $d$ in degrees, thermal growth of links of total length $L$ (m) with expansion coefficient $a$ in $10^{-6}\,\mathrm K^{-1}$ and temperature rise $T$ (K), and reducer twist under a gravity torque $t$ (N m) with torsional stiffness $k$ in $10^3\,\mathrm{N\,m/rad}$. The offset and twist errors grow linearly with reach; the thermal error does not depend on it. Notice how quickly reducer compliance dominates for long, heavily loaded arms.
:::

## The kinematic error model {#sec-model}

Write the forward kinematics as a function of the joint variables $\boldsymbol\theta$ and a vector $\mathbf p\in\R^{N}$ of kinematic parameters (link lengths, offsets, twist angles, joint zero offsets, and the poses of the base and tool frames): $\mathbf x = \mathbf f(\boldsymbol\theta, \mathbf p)$, where $\mathbf x$ is the measured quantity — the tool position (3 numbers) or the full tool pose (6). The controller uses nominal parameters $\mathbf p_0$; the real arm has $\mathbf p_0 + \Delta\mathbf p$.

::: proposition Linearised error model {#prop-linear}
For small parameter errors, the pose error at configuration $\boldsymbol\theta$ is
$$
\Delta\mathbf x = \mathbf f(\boldsymbol\theta, \mathbf p_0 + \Delta\mathbf p) - \mathbf f(\boldsymbol\theta, \mathbf p_0) \approx J_p(\boldsymbol\theta)\,\Delta\mathbf p,\qquad J_p = \frac{\partial\mathbf f}{\partial\mathbf p}\bigg|_{\boldsymbol\theta, \mathbf p_0},
$$ {#eq-error-model}
with an error that is quadratic in $\lVert\Delta\mathbf p\rVert$. $J_p$ is the **identification Jacobian**; for joint zero offsets its columns are the corresponding columns of the ordinary manipulator Jacobian of [[robotics/jacobians]].
:::

::: proof
If $\mathbf f$ is twice continuously differentiable in $\mathbf p$ — it is, being built from products of rotations and translations whose entries are sines, cosines and linear terms in the parameters — Taylor's theorem gives $\mathbf f(\boldsymbol\theta, \mathbf p_0 + \Delta\mathbf p) = \mathbf f(\boldsymbol\theta, \mathbf p_0) + J_p\Delta\mathbf p + \mathbf R$ with $\lVert\mathbf R\rVert \le \tfrac12 M\lVert\Delta\mathbf p\rVert^2$, $M$ a bound on the second derivatives over the segment. A zero offset $\delta_i$ of joint $i$ enters only through $\theta_i + \delta_i$, so $\partial\mathbf f/\partial\delta_i = \partial\mathbf f/\partial\theta_i$, which is column $i$ of the manipulator Jacobian (in the analytic form appropriate to the measured quantity).
:::

Measure the arm at $m$ configurations $\boldsymbol\theta_1, \dots, \boldsymbol\theta_m$ and stack the equations: $\Delta\mathbf X = J\,\Delta\mathbf p$ with $\Delta\mathbf X = (\Delta\mathbf x_1, \dots, \Delta\mathbf x_m)$ and $J = (J_p(\boldsymbol\theta_1); \dots; J_p(\boldsymbol\theta_m))$, of size $3m\times N$ (or $6m\times N$). With more equations than unknowns and noisy measurements, the parameters are estimated by least squares.

::: proposition Least-squares identification and identifiability {#prop-ls}
The estimate minimising $\lVert\Delta\mathbf X - J\Delta\mathbf p\rVert^2$ is unique if and only if $J$ has full column rank $N$, and then
$$
\Delta\hat{\mathbf p} = (J^{\mathsf T}J)^{-1}J^{\mathsf T}\Delta\mathbf X .
$$ {#eq-ls}
If the measurement errors are independent with standard deviation $\sigma$, the estimate is unbiased (to first order) with covariance $\sigma^2(J^{\mathsf T}J)^{-1}$; its least well-determined direction is the right singular vector of $J$ with the smallest singular value $\sigma_{\min}$, along which the standard deviation is $\sigma/\sigma_{\min}$. If $J$ is rank-deficient, some combination of parameters has no effect on any measurement and cannot be identified.
:::

::: proof
The objective is $\phi(\Delta\mathbf p) = \lVert\Delta\mathbf X - J\Delta\mathbf p\rVert^2$, a convex quadratic with gradient $-2J^{\mathsf T}(\Delta\mathbf X - J\Delta\mathbf p)$ and Hessian $2J^{\mathsf T}J$. Its minimisers solve the normal equations $J^{\mathsf T}J\,\Delta\mathbf p = J^{\mathsf T}\Delta\mathbf X$. $J^{\mathsf T}J$ is invertible exactly when $J\mathbf v = \mathbf 0$ implies $\mathbf v = \mathbf 0$ (since $\mathbf v^{\mathsf T}J^{\mathsf T}J\mathbf v = \lVert J\mathbf v\rVert^2$), i.e. when $J$ has full column rank; then the minimiser is unique and given by [[#eq-ls]]. If $J\mathbf v = \mathbf 0$ for some $\mathbf v \ne \mathbf 0$, adding any multiple of $\mathbf v$ to a minimiser gives another — the parameter combination $\mathbf v$ changes no measurement. With $\Delta\mathbf X = J\Delta\mathbf p + \mathbf e$, $\mathbb E\,\mathbf e = \mathbf 0$, $\operatorname{Cov}\mathbf e = \sigma^2\mathbf 1$, the estimate is $\Delta\mathbf p + (J^{\mathsf T}J)^{-1}J^{\mathsf T}\mathbf e$, unbiased with covariance $(J^{\mathsf T}J)^{-1}J^{\mathsf T}\sigma^2 J(J^{\mathsf T}J)^{-1} = \sigma^2(J^{\mathsf T}J)^{-1}$. Writing $J = U\Sigma V^{\mathsf T}$, $(J^{\mathsf T}J)^{-1} = V\Sigma^{-2}V^{\mathsf T}$, so the variance along the singular vector $\mathbf v_k$ is $\sigma^2/\sigma_k^2$.
:::

Two consequences shape every calibration. First, **the model must be minimal**: if two parameters have the same effect — a joint zero offset and a rotation of the base frame about the same axis, or in DH terms a $d_i$ along an axis that is shared with the next joint — $J$ is singular and the solver returns nonsense or refuses. The number of independent kinematic parameters of a serial arm with $R$ revolute and $P$ prismatic joints, including the base and tool frames, is usually quoted as
$$
N = 4R + 2P + 6
$$ {#eq-count}
when the full tool pose is measured (Everett, Driels and Mooring, 1987), and three fewer when only the tool position is measured, because the tool frame's orientation is then invisible. A six-axis arm thus has 30 (or 27) parameters. Second, **the poses must excite every parameter**: measurements at poses where a parameter has little effect make $\sigma_{\min}$ small and the estimate noisy. Pose sets are therefore chosen to spread over the workspace and the joint ranges, and their quality is judged by the condition number $\sigma_{\max}/\sigma_{\min}$ of the column-scaled $J$ or by **observability indices** such as the product of the singular values (Borm and Menq, 1991). Columns are scaled before comparison, because a length in metres and an angle in radians are not commensurable — a common choice is to express angles multiplied by a characteristic length of the arm.

### DH, modified DH and product of exponentials

Which parameters to identify depends on the kinematic description.

- **Denavit–Hartenberg** parameters ([[robotics/forward-kinematics]]) are minimal (four per joint) but **singular for nearly parallel consecutive axes**: when joints 2 and 3 of an elbow arm are nominally parallel, the common normal is ill-defined, and a misalignment of a hundredth of a degree moves the DH origin by metres along the axis — the parameters jump discontinuously, and $J$ is ill-conditioned. Hayati (1983) proposed the standard fix: for nearly parallel axes, replace the offset $d_i$ by a small rotation $\beta_i$ about the $y$ axis.
- **Modified DH** (Craig's convention, with frames on the proximal end of each link) is a different bookkeeping of the same four parameters and has the same singularity; it is not a cure. Many controllers use it internally, so identified corrections must be expressed in the controller's convention.
- **Product of exponentials** ([[robotics/forward-kinematics]]) describes each joint by its screw axis in the base frame at the home configuration. Its parameters vary smoothly with the geometry — a slightly tilted axis is just a slightly different vector — so there is no singularity (Okamura and Park, 1996). The price is redundancy: a screw axis has six numbers but only four independent degrees of freedom for a revolute joint, so the identification must constrain or project out the redundant directions.

In practice calibration software chooses whatever parameterisation is well conditioned and then converts the result to the controller's own model.

::: example Identifying a planar arm from two poses {#ex-planar}
A planar 2R arm has nominal link lengths $L_1 = 0.500\,\mathrm m$, $L_2 = 0.400\,\mathrm m$ and zero joint offsets. Its true parameters are $L_1 + \Delta L_1$, $L_2 + \Delta L_2$ and joint offsets $\delta_1$, $\delta_2$ (the real joint angles are $\theta_i + \delta_i$). The base frame has been measured, so positions are known in the arm's own base frame. A laser tracker measures the tool position at two configurations, giving deviations from the nominal positions (in mm):

| pose | $\theta_1$ | $\theta_2$ | $\Delta x$ | $\Delta y$ |
|---|---|---|---|---|
| 1 | $0^\circ$ | $0^\circ$ | $-0.30$ | $+0.10$ |
| 2 | $0^\circ$ | $90^\circ$ | $+1.60$ | $-1.00$ |

Identify the four parameter errors, and check the result at a third pose, $(\theta_1, \theta_2) = (45^\circ, -60^\circ)$, where the measured position is $(738.87, 251.23)\,\mathrm{mm}$.
::: solution
*Model.* $x = L_1\cos(\theta_1 + \delta_1) + L_2\cos(\theta_1 + \theta_2 + \delta_1 + \delta_2)$, $y = L_1\sin(\theta_1 + \delta_1) + L_2\sin(\theta_1 + \theta_2 + \delta_1 + \delta_2)$. Linearising ([[#prop-linear]]) at each pose:

Pose 1 (arm stretched along $x$): $\Delta x = \Delta L_1 + \Delta L_2$ and $\Delta y = (L_1 + L_2)\delta_1 + L_2\delta_2$.

Pose 2 (forearm along $y$): $x \approx L_1 - L_2(\delta_1 + \delta_2)$, $y \approx L_1\delta_1 + L_2 + \Delta L_2$, so $\Delta x = \Delta L_1 - L_2(\delta_1 + \delta_2)$ and $\Delta y = L_1\delta_1 + \Delta L_2$.

Four equations in four unknowns; $J$ is $4\times4$ and invertible, so the parameters are identifiable from these poses. Adding the second equations of both poses and the first of pose 2, and subtracting the first of pose 1, eliminates $\Delta L_1$, $\Delta L_2$ and $\delta_2$:
$$
\Delta x_2 + \Delta y_1 - \Delta x_1 + \Delta y_2 = 2L_1\delta_1\ \Rightarrow\ \delta_1 = \frac{1.60 + 0.10 + 0.30 - 1.00}{2\times500} = 1.00\times10^{-3}\,\mathrm{rad}.
$$
Then $\delta_2 = (\Delta y_1 - (L_1 + L_2)\delta_1)/L_2 = (0.10 - 0.90)/400 = -2.00\times10^{-3}\,\mathrm{rad}$; $\Delta L_2 = \Delta y_2 - L_1\delta_1 = -1.00 - 0.50 = -1.50\,\mathrm{mm}$; $\Delta L_1 = \Delta x_1 - \Delta L_2 = -0.30 + 1.50 = +1.20\,\mathrm{mm}$.

*Check.* At the third pose the nominal model predicts $(739.92, 250.03)\,\mathrm{mm}$, an error of $\sqrt{1.05^2 + 1.20^2} = 1.60\,\mathrm{mm}$ against the measurement. The calibrated model, with $L_1 = 501.20\,\mathrm{mm}$, $L_2 = 398.50\,\mathrm{mm}$, $\delta_1 = 0.057^\circ$, $\delta_2 = -0.115^\circ$, predicts $(738.87, 251.23)\,\mathrm{mm}$: agreement to the $0.01\,\mathrm{mm}$ resolution of the data.

Sanity check: the offsets are of the size expected from encoder mounting (a tenth of a degree), the length errors of the size of assembly tolerances. A real calibration uses many more poses than unknowns, so that the residuals reveal measurement noise and unmodelled errors, and it iterates — relinearising about the updated parameters — until the correction stops changing (Gauss–Newton or Levenberg–Marquardt).
:::
:::

### Measuring the arm

Calibration needs an instrument several times more accurate than the target accuracy. The common choices are:

- **Laser trackers** follow a retro-reflector on the tool and measure its position by interferometry or absolute distance and two angle encoders. Specifications of current instruments are of the order of 10–20 µm plus about 5 µm per metre of range (manufacturers' data, as of 2026); some add a probe or camera to measure orientation (6-DOF). They are the reference instrument for arm calibration and for ISO 9283 performance tests.
- **Touch probes and artefacts**: the arm touches calibrated spheres, a plane or a precision fixture with a probe or a sphere on the tool. Each touch gives one constraint (distance to a plane) or a centre position. Cheap and usable on the production floor, but each measurement constrains fewer components of the pose.
- **Cameras and photogrammetry**: one or more calibrated cameras observe targets on the tool, or a camera on the arm observes a calibrated target board. Accuracy ranges from tens of micrometres to a few tenths of a millimetre depending on the working volume and the camera; this route is attractive because the cameras used for the task can also calibrate the arm.
- **Self-calibration by constraints**: the tool is locked to a fixed point or a plane, or a ball-bar of known length links the tool to a fixed pivot, and the joint readings at many poses are used without any external position measurement — the constraint replaces the instrument, at the cost of fewer identifiable parameters.

::: algorithm Kinematic calibration of an arm {#alg-calib}
1. **Prepare**: warm the arm up by running a representative motion for 30–60 minutes, at the payload used in production; fix the measuring instrument rigidly and let it stabilise thermally.
2. **Model**: choose a minimal, well-conditioned parameterisation (Hayati or PoE where axes are nearly parallel), including base and tool frames and, if the reducers are compliant, joint stiffnesses.
3. **Pose set**: choose 50–200 configurations spread over the workspace and joint ranges, approached from consistent directions to reduce backlash scatter; check the rank and condition number of the stacked identification Jacobian before measuring.
4. **Measure**: record the commanded joint angles (from the encoders) and the measured tool position or pose at each configuration.
5. **Identify**: iterate least squares ([[#eq-ls]]), relinearising each time, until the parameter correction is small; check the residuals for structure (residuals that depend on a joint angle indicate an unmodelled effect).
6. **Validate**: measure a *different* set of poses and report accuracy on those. A model that fits its own data much better than fresh data is over-fitted.
7. **Deploy**: load the corrected parameters into the controller (which then applies them in its forward and inverse kinematics), and record them with the arm's serial number.
:::

::: warning Validating on the identification data
Residuals on the poses used for identification always look good — with enough parameters, least squares will fit noise and unmodelled errors into the parameters. An arm "calibrated to 0.05 mm" on its own data may be at 0.3 mm elsewhere. Always quote accuracy on an independent validation set measured in the same campaign, and repeat the validation after the arm has been moved, re-cabled or had a motor or reducer replaced: a joint swap changes the zero offset of that joint, and the old calibration is then wrong by exactly the error the calibration removed.
:::

### Non-geometric errors {#sec-nongeometric}

The largest remaining error in most calibrated arms is compliance: [[#ex-budget]] found 1.35 mm from one reducer. A **joint-compliance model** replaces each joint angle by $\theta_i + c_i\tau_i$, where $c_i = 1/k_i$ is the joint's compliance and $\tau_i$ its gravity (and payload) torque computed from the dynamic model. The $c_i$ enter the error model linearly and are identified with the geometric parameters, provided the pose set varies the gravity torques enough — with different payloads, or at poses where each joint carries large and small loads. Link bending can be absorbed the same way into effective joint compliances. Thermal errors are reduced by warm-up, by temperature sensors in the links with a linear expansion model, or by periodic measurement of a reference artefact during production.

## Tool-centre-point calibration {#sec-tcp}

The tool centre point (TCP) is the point on the end effector the program moves — a welding wire tip, a dispensing nozzle, a probe ball — expressed as a vector $\mathbf t$ in the flange frame (often with an orientation as well). It is rarely known from drawings to better than a millimetre, because the tool, its mounting and any tool changer each add tolerances. The **four-point method**, built into almost every robot controller, finds $\mathbf t$ from the arm itself: the operator brings the TCP to the same fixed point — a sharp pin — from several different orientations of the flange.

At the $i$-th touch the controller knows the flange pose $(R_i, \mathbf p_i)$ in the base frame, and the TCP is at the fixed but unknown point $\mathbf c$:
$$
R_i\mathbf t + \mathbf p_i = \mathbf c ,\qquad i = 1, \dots, n .
$$ {#eq-tcp}
These are $3n$ linear equations in the six unknowns $\mathbf t$ and $\mathbf c$. Subtracting pairs eliminates $\mathbf c$:
$$
(R_i - R_j)\,\mathbf t = \mathbf p_j - \mathbf p_i .
$$ {#eq-tcp-diff}

::: proposition Solvability of the TCP equations {#prop-tcp}
The TCP $\mathbf t$ is uniquely determined by [[#eq-tcp]] if and only if the flange orientations $R_1, \dots, R_n$ are not all related by rotations about a single axis — that is, at least two of the relative rotations $R_1^{\mathsf T}R_i$ have different axes. For a single relative rotation by angle $\varphi$ the matrix $R_j - R_i$ annihilates the rotation axis and has its other two singular values equal to $2\sin(\varphi/2)$.
:::

::: proof
Write $R_j = R_iQ$ with $Q = R_i^{\mathsf T}R_j$ a rotation by $\varphi$ about a unit axis $\mathbf u$. Then $R_j - R_i = R_i(Q - \mathbf 1)$, and since $R_i$ is orthogonal the singular values of $R_j - R_i$ are those of $Q - \mathbf 1$. $Q$ fixes $\mathbf u$, so $(Q - \mathbf 1)\mathbf u = \mathbf 0$: the component of $\mathbf t$ along the axis is invisible to this pair. In the plane perpendicular to $\mathbf u$, $Q$ acts as rotation by $\varphi$, i.e. as multiplication by $e^{j\varphi}$ on complex numbers, and $Q - \mathbf 1$ as multiplication by $e^{j\varphi} - 1$, of modulus $\lvert e^{j\varphi} - 1\rvert = 2\sin(\varphi/2)$; so both remaining singular values equal $2\sin(\varphi/2)$. Stacking several pairs, $\mathbf t$ is determined iff the null spaces (the axes) have trivial intersection, i.e. iff at least two relative rotations have non-parallel axes. Once $\mathbf t$ is known, $\mathbf c$ follows from any equation [[#eq-tcp]].
:::

The proposition explains the operator's instructions: tilt the tool *a lot* (30–60° from the first orientation), about *different* axes. An error $\sigma$ in each touch position is amplified into the TCP by about $\sqrt2\,\sigma/(2\sin(\varphi/2))$: about $2.7\sigma$ at $\varphi = 30^\circ$ but $8\sigma$ at $10^\circ$.

::: widget plot
f: s*sqrt(2)/(2*sin(x*pi/360))
x: 5, 90
y: 0, 1
sliders: s=0.05:0.01:0.2:0.01
hlines: 0.1
labels: \sigma_t\ (\mathrm{mm})
caption: Standard error of the TCP components perpendicular to the rotation axis, in mm, against the reorientation angle $\varphi$ in degrees between two touches, for a touch error $s$ (mm) at each point. With $s = 0.05\,\mathrm{mm}$ the TCP is found to $0.1\,\mathrm{mm}$ only for reorientations above about 40°; small tilts make the method useless. Raise $s$ to model a blunt pin or a careless operator.
:::

::: example Four-point TCP calibration {#ex-tcp}
A dispensing nozzle is calibrated by touching a fixed pin with four flange orientations. In pose 1 the flange points straight down, $R_1 = \mathrm{Rot}_x(180^\circ) = \operatorname{diag}(1, -1, -1)$; poses 2 and 3 tilt it by $30^\circ$ about the flange's own $x$ and $y$ axes, $R_2 = R_1\mathrm{Rot}_x(30^\circ)$, $R_3 = R_1\mathrm{Rot}_y(30^\circ)$; pose 4 is a compound tilt used for checking. The flange positions recorded by the controller (mm, base frame) are
$$
\mathbf p_1 = (590.00, 95.00, 350.00),\quad \mathbf p_2 = (590.00, 20.67, 327.40),\quad \mathbf p_3 = (516.34, 95.00, 324.90).
$$
Find the TCP $\mathbf t$ in the flange frame and the pin position $\mathbf c$.
::: solution
From [[#eq-tcp-diff]] with $R_2 - R_1 = R_1(\mathrm{Rot}_x(30^\circ) - \mathbf 1)$, and $R_1^{\mathsf T} = R_1$:
$$
(\mathrm{Rot}_x(30^\circ) - \mathbf 1)\,\mathbf t = R_1^{\mathsf T}(\mathbf p_1 - \mathbf p_2) = \operatorname{diag}(1,-1,-1)(0, 74.33, 22.60) = (0, -74.33, -22.60)\ \mathrm{mm}.
$$
With $c = \cos30^\circ = 0.8660$, $s = 0.5$, the left side is $\bigl(0,\ (c - 1)t_y - st_z,\ st_y + (c - 1)t_z\bigr)$. The $2\times2$ system has determinant $(c-1)^2 + s^2 = 2(1 - c) = 0.2679$, and
$$
t_y = \frac{(c-1)(-74.33) + s(-22.60)}{0.2679} = \frac{9.958 - 11.300}{0.2679} = -5.01\,\mathrm{mm},\qquad
t_z = \frac{-s(-74.33) + (c-1)(-22.60)}{0.2679} = \frac{37.17 + 3.03}{0.2679} = 150.0\,\mathrm{mm}.
$$
The $x$ component is invisible to this pair (the rotation was about $x$), as [[#prop-tcp]] predicts. Pose 3 supplies it: $(\mathrm{Rot}_y(30^\circ) - \mathbf 1)\mathbf t = R_1^{\mathsf T}(\mathbf p_1 - \mathbf p_3) = (73.66, 0, -25.10)\,\mathrm{mm}$, whose components are $\bigl((c - 1)t_x + st_z,\ 0,\ -st_x + (c-1)t_z\bigr)$. The third gives $-0.5t_x = -25.10 + 0.1340\times150.0 = -5.00$, so $t_x = 10.0\,\mathrm{mm}$. Hence $\mathbf t = (10.0, -5.0, 150.0)\,\mathrm{mm}$, and from pose 1, $\mathbf c = R_1\mathbf t + \mathbf p_1 = (10.0, 5.0, -150.0) + (590.00, 95.00, 350.00) = (600.0, 100.0, 200.0)\,\mathrm{mm}$.

*Check with pose 4.* The fourth recorded pose, $R_4 = R_1\mathrm{Rot}_x(-20^\circ)\mathrm{Rot}_y(-20^\circ)$ with $\mathbf p_4 = (641.91, 144.68, 337.38)\,\mathrm{mm}$, gives $R_4\mathbf t + \mathbf p_4 = (600.01, 100.01, 200.00)\,\mathrm{mm}$: it lands on the pin to within $0.01\,\mathrm{mm}$. In a real calibration the four estimates of $\mathbf c$ scatter by the arm's positioning error and the operator's touch error; controllers report this spread, and a spread of more than a few tenths of a millimetre means a touch was poor and should be repeated. Sanity check: $t_z = 150\,\mathrm{mm}$ is the nozzle length from the flange, as on the drawing; the 10 mm and 5 mm lateral offsets are what the calibration was for.
:::
:::

The TCP orientation (needed for a gripper or a welding torch, whose approach direction matters) is taught by additional moves: jogging the tool along its own axis or touching two further points along it, or measured with a camera. In ROS 2 the result is simply the fixed joint from `tool0` to the TCP frame in the tool's description ([[robot-arm-design/software-stack#sec-urdf]]).

## Hand–eye calibration {#sec-handeye}

A camera that guides an arm is useful only if the transform between the camera frame and the arm is known — and it can rarely be measured directly, because the optical centre of a camera is inside the lens. **Hand–eye calibration** finds it from motions. There are two set-ups:

- **Eye-in-hand**: the camera is mounted on the arm (the "hand"). The unknown is $X = {}^{g}T_{c}$, the camera pose in the flange (gripper) frame. A calibration target — a checkerboard or a board of coded markers — is fixed in the cell.
- **Eye-to-hand**: the camera is fixed in the cell, and the target is held by the arm. The unknown is the camera pose in the base frame (and, as a by-product, the target pose in the flange).

In both cases the arm moves to several poses; at each, the controller reports the flange pose $G_i = {}^{b}T_{g,i}$ and the camera, from an image of the target with known intrinsics, computes the target pose $C_i = {}^{c}T_{t,i}$ (a "perspective-n-point" problem).

::: proposition The hand–eye equation AX = XB {#prop-axxb}
For eye-in-hand calibration with a target fixed in the base frame, the unknown $X = {}^{g}T_{c}$ satisfies, for every pair of stations $i, j$,
$$
A X = X B,\qquad A = G_j^{-1}G_i ,\quad B = C_jC_i^{-1}.
$$ {#eq-axxb}
Writing each transform as a rotation and translation, $A = (R_A, \mathbf t_A)$ and so on, this splits into
$$
R_AR_X = R_XR_B ,\qquad (R_A - \mathbf 1)\,\mathbf t_X = R_X\mathbf t_B - \mathbf t_A ,
$$ {#eq-axxb-split}
so $R_A$ and $R_B$ rotate through the same angle, and their unit axes $\boldsymbol\alpha$, $\boldsymbol\beta$ satisfy $\boldsymbol\alpha = R_X\boldsymbol\beta$. A unique solution requires at least two motions whose rotation axes are not parallel.
:::

::: proof
The target pose in the base frame is the same at every station: ${}^{b}T_{t} = G_iXC_i = G_jXC_j$. Multiply on the left by $G_j^{-1}$ and on the right by $C_i^{-1}$: $G_j^{-1}G_iX = XC_jC_i^{-1}$, which is [[#eq-axxb]]. Multiplying out homogeneous transforms, $AX = (R_AR_X,\ R_A\mathbf t_X + \mathbf t_A)$ and $XB = (R_XR_B,\ R_X\mathbf t_B + \mathbf t_X)$; equating the parts gives [[#eq-axxb-split]]. From $R_A = R_XR_BR_X^{\mathsf T}$, $R_A$ is a conjugate of $R_B$, so it has the same trace and hence the same rotation angle ($\operatorname{tr}R = 1 + 2\cos\varphi$), and if $R_B\boldsymbol\beta = \boldsymbol\beta$ then $R_A(R_X\boldsymbol\beta) = R_XR_B\boldsymbol\beta = R_X\boldsymbol\beta$, so $R_X\boldsymbol\beta$ is the axis of $R_A$. One pair of axes fixes $R_X$ only up to a rotation about $\boldsymbol\alpha$; a second pair with a non-parallel axis fixes it completely. For the translation, $R_A - \mathbf 1$ is singular (its null space is $\boldsymbol\alpha$, [[#prop-tcp]]), so one motion leaves $\mathbf t_X$ undetermined along $\boldsymbol\alpha$, and a second motion with a different axis is needed again.
:::

The equations are solved in two stages, rotation first. **Tsai and Lenz** (1989) solved for the rotation using a parameterisation of the rotation axis and angle, then for the translation by linear least squares. **Park and Martin** (1994) gave a closed-form least-squares solution on the rotation group: with $\boldsymbol\alpha_i = \log R_{A_i}$ and $\boldsymbol\beta_i = \log R_{B_i}$ (axis times angle),
$$
M = \sum_i \boldsymbol\beta_i\boldsymbol\alpha_i^{\mathsf T},\qquad R_X = (M^{\mathsf T}M)^{-1/2}M^{\mathsf T},
$$ {#eq-park-martin}
which is the rotation that best aligns the camera axes onto the gripper axes, followed by linear least squares for $\mathbf t_X$ from the stacked translation equations of [[#eq-axxb-split]]. Later methods solve rotation and translation together (Daniilidis's dual quaternions, 1999; nonlinear refinement of the reprojection error). Libraries such as OpenCV provide several of these (`calibrateHandEye` with Tsai, Park, Horaud, Andreff and Daniilidis variants), and the ROS ecosystem has calibration packages that collect the poses automatically.

::: example Hand–eye calibration from two motions {#ex-handeye}
An eye-in-hand camera is calibrated with two motions. Motion 1 rotates the flange by $30^\circ$ about its $x$ axis and translates it by $\mathbf t_{A_1} = (100, 0, 0)\,\mathrm{mm}$; the camera observes the corresponding relative motion $R_{B_1} = \mathrm{Rot}_{-y}(30^\circ)$ (rotation of $30^\circ$ about the axis $\boldsymbol\beta_1 = (0, -1, 0)$), $\mathbf t_{B_1} = (-46.70, -100.00, 14.28)\,\mathrm{mm}$. Motion 2 rotates the flange by $45^\circ$ about its $y$ axis with $\mathbf t_{A_2} = (0, 50, 20)\,\mathrm{mm}$; the camera sees a $45^\circ$ rotation about $\boldsymbol\beta_2 = (1, 0, 0)$ with $\mathbf t_{B_2} = (50.00, -56.57, -3.43)\,\mathrm{mm}$. Find $X$.
::: solution
*Consistency.* Each pair has equal rotation angles ($30^\circ$ and $45^\circ$), as [[#prop-axxb]] requires — a useful first check on real data, where a mismatch reveals poorly synchronised pose and image capture.

*Rotation.* We need $R_X\boldsymbol\beta_i = \boldsymbol\alpha_i$ with $\boldsymbol\alpha_1 = (1,0,0)$, $\boldsymbol\alpha_2 = (0,1,0)$. Rotations preserve cross products, so also $R_X(\boldsymbol\beta_1\times\boldsymbol\beta_2) = \boldsymbol\alpha_1\times\boldsymbol\alpha_2$: $\boldsymbol\beta_1\times\boldsymbol\beta_2 = (0,-1,0)\times(1,0,0) = (0, 0, 1)$ and $\boldsymbol\alpha_1\times\boldsymbol\alpha_2 = (0,0,1)$. Since the $\boldsymbol\beta$ triad is orthonormal,
$$
R_X = [\boldsymbol\alpha_1\ \boldsymbol\alpha_2\ \boldsymbol\alpha_3][\boldsymbol\beta_1\ \boldsymbol\beta_2\ \boldsymbol\beta_3]^{\mathsf T} = \begin{bmatrix}1&0&0\\0&1&0\\0&0&1\end{bmatrix}\begin{bmatrix}0&-1&0\\1&0&0\\0&0&1\end{bmatrix} = \begin{bmatrix}0&-1&0\\1&0&0\\0&0&1\end{bmatrix} = \mathrm{Rot}_z(90^\circ).
$$
(With noisy data the axes would not be exactly orthogonal, and [[#eq-park-martin]] would give the best-fitting rotation.)

*Translation, motion 1.* $R_X\mathbf t_{B_1} = (100.00, -46.70, 14.28)$, so the right side of [[#eq-axxb-split]] is $(0, -46.70, 14.28)\,\mathrm{mm}$. The left side is $(\mathrm{Rot}_x(30^\circ) - \mathbf 1)\mathbf t_X = \bigl(0,\ (c-1)t_y - st_z,\ st_y + (c-1)t_z\bigr)$ with $c - 1 = -0.1340$, $s = 0.5$. Solving the $2\times2$ system as in [[#ex-tcp]] (determinant $0.2679$):
$$
t_y = \frac{(-0.1340)(-46.70) + 0.5(14.28)}{0.2679} = 50.0\,\mathrm{mm},\qquad t_z = \frac{-0.5(-46.70) + (-0.1340)(14.28)}{0.2679} = 80.0\,\mathrm{mm}.
$$
*Translation, motion 2.* $R_X\mathbf t_{B_2} - \mathbf t_{A_2} = (56.57, 50.00, -3.43) - (0, 50, 20) = (56.57, 0, -23.43)$, and $(\mathrm{Rot}_y(45^\circ) - \mathbf 1)\mathbf t_X = \bigl((c' - 1)t_x + s't_z,\ 0,\ -s't_x + (c'-1)t_z\bigr)$ with $c' - 1 = -0.2929$, $s' = 0.7071$. The first component: $-0.2929t_x + 0.7071\times80.0 = 56.57$ gives $t_x = 0.0\,\mathrm{mm}$; the third, $-0.7071t_x - 0.2929\times80.0 = -23.43$, agrees.

So the camera frame is rotated $90^\circ$ about the flange $z$ axis and its optical centre sits at $(0, 50, 80)\,\mathrm{mm}$ in the flange frame. Sanity check: motion 1 alone left $t_x$ free (rotation about $x$) and motion 2 alone would leave $t_y$ free; together they fix all three — the content of the last sentence of [[#prop-axxb]].
:::
:::

In practice 10–20 stations are used, with rotations of 20–40° about varied axes and the target filling a good part of the image at each. The errors that dominate are not numerical: the arm and camera poses must be captured at the same instant (or with the arm stopped), the arm must itself be calibrated (hand–eye calibration absorbs the arm's errors into $X$), and the camera intrinsics must be right.

### Camera intrinsics, briefly

The camera model of [[robotics/motion-planning-perception]] maps a point $(X, Y, Z)$ in the camera frame to pixels through the intrinsic matrix $K$ (focal lengths $f_x$, $f_y$ in pixels and principal point $c_x$, $c_y$). Real lenses add **distortion**, usually modelled by the Brown–Conrady polynomials in the normalised image radius: radial terms $k_1, k_2, k_3$ and tangential terms $p_1, p_2$. **Zhang's method** (2000) estimates $K$ and the distortion from 10–30 images of a planar target in varied orientations: each image gives a homography between the target plane and the image, the homographies give closed-form constraints on $K$, and a nonlinear refinement minimises the **reprojection error** — the pixel distance between the detected target corners and those predicted by the model. A well-calibrated industrial camera typically reaches a root-mean-square reprojection error of a few tenths of a pixel. To translate pixels into millimetres: a lateral error of $\Delta u$ pixels at depth $Z$ is $Z\Delta u/f_x$; with $f_x = 1400\,\mathrm{px}$ at $Z = 0.6\,\mathrm m$, 0.3 px is $0.13\,\mathrm{mm}$ — comparable with the arm's calibrated accuracy, so the camera calibration matters as much as the arm's.

::: quiz
After a hand–eye calibration, an eye-in-hand system grasps parts accurately when the camera looks straight down, but misses by 2–3 mm when the camera views the bin from a tilted pose. Which is the most likely cause?
- [ ] The intrinsic matrix has the wrong principal point, which only matters for tilted views.
- [x] The calibration stations used rotations about nearly the same axis, leaving part of the camera offset poorly determined.
- [ ] Hand–eye calibration cannot be valid for more than one camera orientation.
- [ ] The target was too large in the image.
::: solution
By [[#prop-axxb]], rotations about one axis leave the component of $\mathbf t_X$ along that axis undetermined (and noise makes it badly determined if the axes are merely similar). That error is invisible when the camera's viewing direction repeats the calibration poses but appears as a lateral miss when the camera is tilted, because the unknown offset then projects onto the working plane. The remedy is to recalibrate with larger rotations about varied axes. A wrong principal point causes errors in every view, and a target that fills the image is desirable, not harmful.
:::
:::

::: history
Early industrial robots were programmed by teaching, and their accuracy was hardly measured. Offline programming in the 1980s exposed the gap between repeatability and accuracy, and calibration became a research field: Samad Hayati proposed his modified parameters for parallel axes in 1983; Daniel Whitney, Lozinski and Rourke published an influential calibration of a PUMA arm in 1986; and Mooring, Roth and Driels summarised the field in *Fundamentals of Manipulator Calibration* (1991). Okamura and Park showed in 1996 how the product-of-exponentials model avoids the singularities of DH-based calibration. The hand–eye problem was formulated as $AX = XB$ independently by Shiu and Ahmad and by Tsai and Lenz in 1989, and Park and Martin gave the closed-form solution on the rotation group in 1994. Zhengyou Zhang's flexible camera calibration from a plane, published in 2000, made camera calibration a routine task with a printed checkerboard. ISO 9283, the standard for measuring industrial robot performance, was first published in 1990, with the current edition from 1998.
:::

::: summary
- Repeatability (scatter about the mean, ISO 9283 $\bar l + 3s_l$) is set by hardware; accuracy (mean versus command) by the model. Uncalibrated arms are typically 1–5 mm accurate, calibrated a few tenths of a millimetre (as of 2026).
- Geometric errors (joint zeros, lengths, axis misalignment) are constant and identifiable; non-geometric ones (compliance, thermal growth, gear errors) depend on state — compliance can be modelled with joint stiffnesses, thermal drift managed by warm-up and compensation.
- Linearised model $\Delta\mathbf x = J_p\Delta\mathbf p$; least squares $\Delta\hat{\mathbf p} = (J^{\mathsf T}J)^{-1}J^{\mathsf T}\Delta\mathbf X$, unique only for full column rank; noise along the weakest direction is amplified by $1/\sigma_{\min}$. Use a minimal model, $N = 4R + 2P + 6$ parameters for full pose (three fewer for position only), and well-spread poses; validate on independent data.
- DH is singular for nearly parallel axes (use Hayati's parameters); modified DH is not a cure; PoE is singularity-free but redundant.
- TCP: $(R_i - R_j)\mathbf t = \mathbf p_j - \mathbf p_i$; reorient by large angles about different axes — sensitivity scales as $1/(2\sin(\varphi/2))$.
- Hand–eye: $AX = XB$ with equal rotation angles and $\boldsymbol\alpha = R_X\boldsymbol\beta$; solve rotation (Tsai–Lenz, Park–Martin) then translation; need at least two motions with non-parallel axes, in practice 10–20.
- Camera intrinsics by Zhang's method; reprojection error of a few tenths of a pixel; $\Delta x = Z\Delta u/f_x$ converts pixels to millimetres.
:::

## Exercises

::: exercise A joint zero offset {level=1 check="0.419"}
The base joint of an arm has a zero offset of $0.02^\circ$. What tool-point error does this cause at a horizontal distance of $1.2\,\mathrm m$ from the base axis? (Enter the error in mm, to three significant figures.)
::: solution
$r\delta = 1.2\times0.02\times\pi/180 = 4.19\times10^{-4}\,\mathrm m = 0.419\,\mathrm{mm}$, tangential to the circle about the base axis.
:::
:::

::: exercise Thermal growth {level=1 check="0.276"}
The links of an arm contain $0.8\,\mathrm m$ of aluminium ($\alpha = 23\times10^{-6}\,\mathrm K^{-1}$) along the reach direction. By how much does the reach grow when the links warm by $15\,\mathrm K$? (Enter the growth in mm, to three significant figures.)
::: solution
$\Delta L = \alpha L\Delta T = 23\times10^{-6}\times0.8\times15 = 2.76\times10^{-4}\,\mathrm m = 0.276\,\mathrm{mm}$. A carbon-fibre tube (axial $\alpha$ near zero) would almost remove this term — one reason precise arms use it.
:::
:::

::: exercise Counting parameters {level=1 check="27"}
How many independent kinematic parameters can be identified for a six-axis arm with only revolute joints when a laser tracker measures the tool *position* only? (Enter the number.)
::: solution
By [[#eq-count]], full-pose measurement gives $4\times6 + 2\times0 + 6 = 30$; with position only, the three orientation parameters of the tool frame are unobservable, leaving $27$.
:::
:::

::: exercise Compliance error {level=2 check="1.12"}
A shoulder reducer has torsional stiffness $5.0\times10^{4}\,\mathrm{N\,m/rad}$. In a given pose it carries a gravity torque of $80\,\mathrm{N\,m}$, and the tool is $0.70\,\mathrm m$ from the shoulder axis. Find the tool-point error caused by the twist, and explain why a payload change spoils a calibration that ignored compliance. (Enter the error in mm, to three significant figures.)
::: solution
Twist $80/(5.0\times10^4) = 1.6\times10^{-3}\,\mathrm{rad}$; error $0.70\times1.6\times10^{-3} = 1.12\times10^{-3}\,\mathrm m = 1.12\,\mathrm{mm}$. A purely geometric calibration at one payload absorbs the average twist into the zero offsets and lengths; with a different payload the gravity torques change, so the twist changes and the absorbed correction is wrong. A joint-compliance model ($\theta_i + c_i\tau_i$) with torques from the dynamic model, identified with several payloads, removes the effect at all payloads.
:::
:::

::: exercise Reorientation for TCP calibration {level=2 check="0.204"}
Each touch of a TCP calibration has a position error with standard deviation $0.05\,\mathrm{mm}$. Using the sensitivity $\sqrt2\,\sigma/(2\sin(\varphi/2))$ for the TCP components perpendicular to the rotation axis, what is the standard error if the operator reorients by only $20^\circ$? (Enter the standard error in mm, to three significant figures.)
::: solution
$\sqrt2\times0.05/(2\sin10^\circ) = 0.0707/0.3473 = 0.204\,\mathrm{mm}$ — four times the touch error. At $60^\circ$ it would be $0.0707/1.0 = 0.071\,\mathrm{mm}$. The $\sqrt2$ comes from the difference of two independent touch errors.
:::
:::

::: exercise Pixels to millimetres {level=2 check="0.1286"}
A camera with $f_x = 1400\,\mathrm{px}$ views a part at a depth of $0.60\,\mathrm m$, and its calibration has an RMS reprojection error of $0.30\,\mathrm{px}$. What lateral position uncertainty does this correspond to at the part? (Enter it in mm, to four significant figures.)
::: solution
$\Delta x = Z\Delta u/f_x = 600\times0.30/1400 = 0.1286\,\mathrm{mm}$. The depth uncertainty of a single camera (from the apparent size of a known target) is larger, by roughly the ratio of distance to target size.
:::
:::

::: exercise An unidentifiable parameter {level=2}
In [[#ex-planar]] the base frame was assumed known. Suppose instead that the tracker's frame is related to the arm's base by an unknown rotation $\gamma$ about the base axis (and a known translation). Show that $\delta_1$ and $\gamma$ cannot be identified separately, and say what is identified instead.
::: solution
In the tracker frame the tool position is $\mathrm{Rot}(\gamma)\mathbf f$, and with the planar model $\mathrm{Rot}(\gamma)$ simply adds $\gamma$ to every absolute angle: $x = L_1\cos(\theta_1 + \delta_1 + \gamma) + L_2\cos(\theta_1 + \theta_2 + \delta_1 + \delta_2 + \gamma)$, and similarly for $y$. The two parameters appear only as the sum $\delta_1 + \gamma$, so their columns of $J$ are identical and $J$ is rank-deficient ([[#prop-ls]]). Only the sum is identifiable; the model must be reduced, for example by setting $\gamma = 0$ (defining the base frame's orientation through the first joint's zero) and identifying $\delta_1' = \delta_1 + \gamma$. This is one of the six base-frame parameters absorbed in the count [[#eq-count]].
:::
:::

::: exercise Mismatched rotation angles {level=2}
In a hand–eye data set, one station pair gives a flange rotation of $25.0^\circ$ but a camera rotation of $23.6^\circ$; all other pairs agree to $0.1^\circ$. What does this indicate, and what should be done?
::: solution
By [[#prop-axxb]], $R_A$ and $R_B$ must have equal angles for any $X$. A $1.4^\circ$ mismatch in one pair indicates an outlier: the image and the arm pose were not captured at the same moment (the arm was still moving or vibrating), the target detection failed partly (a corner misdetected, motion blur), or the arm pose reported was not the attained pose. Remove that station (or recapture it with the arm settled) before solving; robust solvers reject such pairs automatically by checking the angle consistency first.
:::
:::

::: exercise Singular values of I − R {level=3}
Prove that for a rotation $Q$ by angle $\varphi$ about unit axis $\mathbf u$, $\lVert(Q - \mathbf 1)\mathbf v\rVert = 2\sin(\varphi/2)\lVert\mathbf v_\perp\rVert$, where $\mathbf v_\perp$ is the component of $\mathbf v$ perpendicular to $\mathbf u$. Use it to derive the TCP sensitivity $\sqrt2\,\sigma/(2\sin(\varphi/2))$ quoted in [[#sec-tcp]].
::: solution
Decompose $\mathbf v = (\mathbf u\cdot\mathbf v)\mathbf u + \mathbf v_\perp$. $Q$ fixes the first part, so $(Q - \mathbf 1)\mathbf v = (Q - \mathbf 1)\mathbf v_\perp$. $Q\mathbf v_\perp$ is $\mathbf v_\perp$ rotated by $\varphi$ in the perpendicular plane, so $Q\mathbf v_\perp - \mathbf v_\perp$ is the chord of a circle of radius $\lVert\mathbf v_\perp\rVert$ subtending angle $\varphi$, of length $2\lVert\mathbf v_\perp\rVert\sin(\varphi/2)$. For TCP calibration with one pair, $(R_j - R_i)\mathbf t = \mathbf p_i - \mathbf p_j + \mathbf e$, where $\mathbf e$ is the difference of two independent touch errors, each with standard deviation $\sigma$ per component, so $\mathbf e$ has standard deviation $\sqrt2\sigma$ per component. Inverting on the perpendicular plane divides by $2\sin(\varphi/2)$, giving the standard error $\sqrt2\sigma/(2\sin(\varphi/2))$ for each perpendicular component of $\mathbf t$. With $n$ touches and least squares the error falls roughly as $1/\sqrt{n-1}$.
:::
:::

::: exercise A calibration plan for a production line {level=3}
Your company ships 400 six-axis arms a year that customers program offline from CAD. Marketing wants to quote an absolute accuracy of $0.5\,\mathrm{mm}$ at rated payload over the whole workspace. Propose a calibration process: what model, what instrument, how many poses, how long per arm, how you would validate it, and what must be repeated in the field after a motor or reducer is replaced.
::: solution
One reasonable plan. *Model*: 27 position-identifiable kinematic parameters in a Hayati or PoE parameterisation (joints 2 and 3 are parallel), plus a compliance for each of joints 2–5, identified with two payloads (none and rated); thermal behaviour characterised once per model type, with a required warm-up. *Instrument*: a laser tracker (uncertainty about 0.03 mm over the 2 m volume, well under a tenth of the target) with an automated sequence; a 3-point fixture to locate the arm base. *Poses*: about 100 per payload, chosen offline to minimise the condition number of the scaled identification Jacobian and to span the joint ranges, approached from a consistent direction. *Time*: about 1 minute per pose including settling, so roughly 3–4 hours per arm with warm-up, which at 400 arms a year needs one or two cells running one shift. *Validation*: 30 further poses per arm not used in identification, reporting mean and maximum error; a sample of arms re-measured after shipping-simulation vibration; the 0.5 mm claim is quoted only if the maximum validation error meets it for, say, 99 % of arms. *Field service*: replacing a motor or encoder changes that joint's zero offset — re-reference it with a fixture or a short field procedure (touching artefacts, or a portable camera system) and verify; replacing a reducer also changes its compliance and transmission error, so a fuller recalibration of that joint is required. Store each arm's parameters with its serial number and in the controller, never only in the controller.
:::
:::

## Further reading

Mooring, Roth and Driels, *Fundamentals of Manipulator Calibration* (1991), remains the systematic treatment; the calibration chapter of the *Springer Handbook of Robotics* surveys models, identifiability and measurement. Lynch and Park develop the product-of-exponentials kinematics on which singularity-free calibration rests. For hand–eye calibration, read Tsai and Lenz (1989) and Park and Martin (1994) in the *IEEE Transactions on Robotics and Automation*, and Zhang (2000) in the *IEEE Transactions on Pattern Analysis and Machine Intelligence* for cameras. ISO 9283 defines the performance tests used to quote accuracy and repeatability.
