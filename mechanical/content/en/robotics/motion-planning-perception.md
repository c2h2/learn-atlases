The previous chapters assumed that someone else had decided where the robot should go and that the robot knew where it was. This chapter closes the loop with two final questions. **Motion planning** asks: given a model of the robot and of the obstacles, find a collision-free motion from a start to a goal. **Perception** asks: from cameras, range sensors and odometry, what is the geometry of the world and where is the robot in it? The unifying idea of planning is the **configuration space**: a robot of any shape becomes a point, and obstacles become forbidden regions in the space of joint values or poses, so that planning is the search for a path of a point. We develop the construction of configuration-space obstacles, the graph search algorithms (Dijkstra, A*) used on discretised spaces with a proof of A*'s optimality, artificial potential fields and their local minima, and the sampling-based planners (PRM, RRT) that handle the high-dimensional spaces of arms. For perception we derive the pinhole camera model, depth from stereo and its quadratic error growth, and the Kalman filter, which fuses a prediction with a noisy measurement in the statistically optimal way and underlies most robot state estimation. Kinematics comes from [[robotics/forward-kinematics]], vehicle models and the Bayes filter from [[robotics/mobile-robots]].

## Configuration space {#sec-cspace}

::: definition Configuration space and C-obstacles {#def-cspace}
The **configuration space** $\mathcal C$ of a robot is the set of all its configurations — joint vectors $\mathbf q$ for an arm, poses $(x, y, \phi)$ for a planar vehicle; its dimension is the number of degrees of freedom. Let $\mathcal A(\mathbf q)\subset\mathbb R^2$ or $\mathbb R^3$ be the set of points occupied by the robot at configuration $\mathbf q$ and $\mathcal O$ the set occupied by obstacles. The **configuration-space obstacle** is
$$
\mathcal C_{\text{obs}} = \{\mathbf q\in\mathcal C : \mathcal A(\mathbf q)\cap\mathcal O\ne\varnothing\},
$$
and the **free space** is $\mathcal C_{\text{free}} = \mathcal C\setminus\mathcal C_{\text{obs}}$. A **collision-free path** is a continuous map $\boldsymbol\sigma:[0,1]\to\mathcal C_{\text{free}}$ with $\boldsymbol\sigma(0) = \mathbf q_{\text{start}}$ and $\boldsymbol\sigma(1) = \mathbf q_{\text{goal}}$.
:::

For a robot that only translates, C-obstacles have a clean geometric description.

::: proposition C-obstacles of a translating robot {#prop-minkowski}
Let the robot be a rigid body $\mathcal A_0$ (described with its reference point at the origin) that translates without rotating, so $\mathcal A(\mathbf q) = \mathcal A_0 + \mathbf q = \{\mathbf a + \mathbf q : \mathbf a\in\mathcal A_0\}$. Then
$$
\mathcal C_{\text{obs}} = \mathcal O\oplus(-\mathcal A_0) = \{\mathbf o - \mathbf a : \mathbf o\in\mathcal O,\ \mathbf a\in\mathcal A_0\},
$$
the **Minkowski sum** of the obstacle with the reflected robot. For a disc robot of radius $\rho$, $\mathcal C_{\text{obs}}$ is the obstacle **grown** by $\rho$: all points within distance $\rho$ of $\mathcal O$.
:::

::: proof
$\mathbf q\in\mathcal C_{\text{obs}}$ iff there is a point common to the robot and the obstacle, i.e. $\mathbf a + \mathbf q = \mathbf o$ for some $\mathbf a\in\mathcal A_0$, $\mathbf o\in\mathcal O$, i.e. $\mathbf q = \mathbf o - \mathbf a$ for some such pair — exactly the stated set. For a disc centred at the reference point, $-\mathcal A_0 = \mathcal A_0$ is the disc of radius $\rho$ about the origin, and $\mathbf q = \mathbf o - \mathbf a$ with $\lVert\mathbf a\rVert\le\rho$ means $\lVert\mathbf q - \mathbf o\rVert\le\rho$ for some $\mathbf o\in\mathcal O$.
:::

Growing obstacles by the robot's radius is how most mobile-robot planners work: inflate the occupancy grid of [[robotics/mobile-robots]] by the robot's radius plus a safety margin and plan for a point. For convex polygons the Minkowski sum is again a convex polygon whose edges are the edges of both polygons sorted by direction, computable in linear time. When the robot also rotates, each orientation $\phi$ gives a different grown obstacle, and $\mathcal C_{\text{obs}}$ is a three-dimensional "twisted" solid.

For arms, $\mathcal C_{\text{obs}}$ has no simple formula: even a point obstacle near a 2R arm produces a curved region in the $(\theta_1,\theta_2)$ torus, because each link sweeps the obstacle for a whole family of joint values. Planners for arms therefore never construct $\mathcal C_{\text{obs}}$ explicitly; they only ask a **collision checker** whether a given $\mathbf q$ is free, by computing the link geometry with forward kinematics and testing it against the obstacle geometry.

::: example A C-obstacle for a 2R arm {#ex-cspace-arm}
A planar 2R arm with $L_1 = L_2 = 1\,\mathrm m$ (links as line segments) shares its plane with a point obstacle at $(1.2, 0.6)\,\mathrm m$. Which configurations with $\theta_1 = 0$ collide, and which values of $\theta_1$ can collide at all?
::: solution
With $\theta_1 = 0$ link 1 lies along $[0, 1]$ on the $x$-axis and misses the obstacle. Link 2 starts at $(1, 0)$; the obstacle is at relative position $(0.2, 0.6)$, distance $\sqrt{0.04 + 0.36} = 0.632\,\mathrm m < L_2$, at angle $\operatorname{atan2}(0.6, 0.2) = 71.6^\circ$. So link 2 hits it exactly when $\theta_1 + \theta_2 = 71.6^\circ$, i.e. $\theta_2 = 71.6^\circ$: on the line $\theta_1 = 0$ of the C-space the obstacle is a single point. The obstacle is at distance $\sqrt{1.44 + 0.36} = 1.342\,\mathrm m$ from the base, more than $L_1$, so link 1 never touches it; link 2 can touch it only if the elbow is within $1\,\mathrm m$ of the obstacle, i.e. if the elbow $(\cos\theta_1, \sin\theta_1)$ lies within the circle of radius $1$ about $(1.2, 0.6)$. Distance from the obstacle to the elbow: $\sqrt{(1.2 - \cos\theta_1)^2 + (0.6 - \sin\theta_1)^2}\le1$ gives $2.8 - 2.4\cos\theta_1 - 1.2\sin\theta_1\le1$, i.e. $\cos(\theta_1 - 26.6^\circ)\ge0.6708$, so $\theta_1\in[-21.3^\circ, 74.4^\circ]$. For each such $\theta_1$ exactly one $\theta_2$ collides: a point obstacle becomes a **curve** in C-space. A real obstacle of positive size becomes a band around this curve, and its shape is unrelated to the obstacle's shape in the workspace.
:::
:::

## Graph search {#sec-graph-search}

Discretise $\mathcal C_{\text{free}}$ — a grid of cells, or a graph of sampled configurations — and planning becomes a shortest-path problem on a graph with non-negative edge costs. **Dijkstra's algorithm** expands nodes in order of their cost-to-come $g(n)$ from the start. **A\*** expands them in order of $f(n) = g(n) + h(n)$, where the **heuristic** $h(n)$ estimates the cost-to-go to the goal, so that the search is drawn towards the goal.

::: algorithm A* search {#alg-astar}
Input: graph with edge costs $c(n, n')\ge0$, start $s$, goal $t$, heuristic $h$.
1. Set $g(s) = 0$, $g(n) = \infty$ otherwise; put $s$ in the priority queue OPEN with key $f(s) = h(s)$; CLOSED is empty.
2. Remove from OPEN the node $n$ with the smallest $f(n)$. If $n = t$, stop and return the path by following parent pointers back from $t$.
3. Move $n$ to CLOSED. For each neighbour $n'$ not in CLOSED: if $g(n) + c(n, n') < g(n')$, set $g(n') = g(n) + c(n, n')$, parent$(n') = n$, and insert or update $n'$ in OPEN with key $f(n') = g(n') + h(n')$.
4. If OPEN is empty, report that no path exists; otherwise go to 2.
With $h\equiv0$ this is Dijkstra's algorithm.
:::

::: definition Admissible and consistent heuristics {#def-heuristic}
A heuristic is **admissible** if it never overestimates: $h(n)\le h^*(n)$, the true cost of the cheapest path from $n$ to the goal. It is **consistent** if $h(t) = 0$ and $h(n)\le c(n, n') + h(n')$ for every edge — a triangle inequality. Consistency implies admissibility (sum the inequality along an optimal path from $n$ to $t$). Straight-line (Euclidean) distance is consistent on any graph whose edge costs are at least the Euclidean lengths of the edges; on a 4-connected grid with unit steps, the Manhattan distance is consistent.
:::

::: theorem A* returns an optimal path {#thm-astar}
If $h$ is consistent, then whenever A* moves a node $n$ to CLOSED, $g(n)$ equals the optimal cost-to-come $g^*(n)$. In particular, the path returned when the goal is removed from OPEN is a shortest path, and no node is expanded twice.
:::

::: proof
*Step 1: $f$ is non-decreasing along any path.* For an edge $n\to n'$ on a path with $g(n') = g(n) + c(n, n')$, consistency gives $f(n') = g(n) + c(n, n') + h(n')\ge g(n) + h(n) = f(n)$.
*Step 2: closed nodes are optimal.* Suppose, for a contradiction, that a node $n$ is removed from OPEN with $g(n) > g^*(n)$. Take an optimal path $s = n_0, n_1, \dots, n_k = n$. Not all of it is closed — otherwise its last edge would have been relaxed from the closed $n_{k-1}$ with optimal $g$, giving $g(n) = g^*(n)$. Let $n_j$ be the first node on it that is not closed; its predecessor is closed (or $n_j = s$), and assuming inductively that closed nodes have optimal $g$, the edge into $n_j$ was relaxed, so $n_j$ is in OPEN with $g(n_j) = g^*(n_j)$. Then, by Step 1 applied along the optimal path,
$$
f(n_j) = g^*(n_j) + h(n_j)\le g^*(n) + h(n) < g(n) + h(n) = f(n),
$$
so A* would have removed $n_j$ before $n$ — a contradiction. Hence $g(n) = g^*(n)$ when $n$ is closed. Applied to the goal, the returned cost is optimal. Since a closed node's $g$ can never decrease further, it is never reopened.
:::

The theorem says nothing about speed; the heuristic's quality decides how many nodes A* expands. The better $h$ approximates $h^*$, the fewer nodes; with $h = h^*$ only the nodes on an optimal path are expanded. Multiplying an admissible heuristic by a factor $w > 1$ (**weighted A\***) expands fewer nodes still, at the cost of returning paths up to $w$ times longer than optimal.

::: example Dijkstra against A* on a grid {#ex-astar}
A $12\times16$ grid (4-connected, unit step cost) has a wall occupying column 8 in rows 2–9; the start is at row 6, column 2 and the goal at row 6, column 13 (184 free cells). Compare Dijkstra, A* with the Manhattan heuristic, and weighted A* with $w = 2$.
::: solution
The straight route is blocked; the shortest path goes round the nearer end of the wall: down from row 6 to row 10 (4 steps), across 11 columns, and back up 4: cost $4 + 11 + 4 = 19$. All three searches return cost 19 (weighted A* is not guaranteed to, but does here). They differ in work: Dijkstra expands 173 of the 184 free cells — it grows a "circle" of equal cost-to-come in all directions; A* with Manhattan distance expands 62, because cells behind the start have $f$ values larger than 19 and are never reached; weighted A* expands 52. (Counts from an implementation that breaks ties in $f$ in favour of the larger $g$.) The Manhattan heuristic is consistent here: a unit step changes Manhattan distance by exactly 1.
:::
:::

::: warning Discretisation resolution decides what can be found
A grid planner is only **resolution complete**: it finds a path if one exists at the grid's resolution. A doorway narrower than two cells of the inflated grid may disappear entirely, and a path found on a coarse grid may graze obstacles between grid points. Grid size grows exponentially with dimension — a 6-DOF arm with 100 values per joint has $10^{12}$ cells — which is why grids are used for 2-D and 3-D mobile-robot planning and sampling methods for arms. Grid paths are also jagged (moves restricted to 4 or 8 directions) and must be smoothed before they are given to a trajectory generator ([[robotics/trajectory-planning]]).
:::

## Artificial potential fields {#sec-potential}

A potential-field planner treats the robot as a particle in a field that attracts it to the goal and repels it from obstacles, and follows the negative gradient. With the goal at $\mathbf q_g$ and $\rho(\mathbf q)$ the distance to the nearest obstacle,
$$
U(\mathbf q) = \tfrac12k\lVert\mathbf q - \mathbf q_g\rVert^2 + \begin{cases}\tfrac12\eta\Big(\dfrac1{\rho(\mathbf q)} - \dfrac1{\rho_0}\Big)^2, & \rho(\mathbf q)\le\rho_0,\\ 0, & \rho(\mathbf q) > \rho_0,\end{cases}
\qquad \dot{\mathbf q} = -\nabla U(\mathbf q),
$$ {#eq-potential}
where $\rho_0$ is the obstacle's range of influence. The repulsive term grows without bound as $\rho\to0$, so the robot never touches an obstacle. The method is fast and reactive — the gradient is cheap to evaluate as the sensors update — but it is not complete: gradient descent stops at any point where $\nabla U = \mathbf 0$, and such **local minima** other than the goal are common.

::: example A local minimum in front of an obstacle {#ex-local-minimum}
A point robot on the $x$-axis is attracted to the goal at $x = 4$ with $k = 1$; a point obstacle at $x = 2$ repels it with $\eta = 1$, $\rho_0 = 1$. Starting at $x = 0$, where does gradient descent stop?
::: solution
For $1\le x < 2$ the distance is $\rho = 2 - x$, and the force (negative gradient) along $+x$ is
$$
F(x) = k(4 - x) - \eta\Big(\frac1\rho - \frac1{\rho_0}\Big)\frac1{\rho^2}.
$$
(The repulsive potential's derivative with respect to $\rho$ is $-\eta(1/\rho - 1/\rho_0)/\rho^2$ and $d\rho/dx = -1$.) For $x < 1$ only the attraction acts and the robot advances. At $x = 1$, $F = 3 > 0$; as $x\to2$ the repulsion diverges. Solving $F(x) = 0$ numerically gives $x = 1.443$, i.e. the robot stops $0.557\,\mathrm m$ in front of the obstacle, which lies directly between it and the goal — a local minimum of $U$ (in one dimension there is no way round; in the plane it is a saddle point that a perturbation escapes, but a U-shaped obstacle produces a true minimum). Escaping needs random walks, navigation functions designed to have a single minimum, or a global planner.
:::
:::

::: widget contour
f: 0.5*((x - 4)^2 + y^2) + eta*(1/sqrt((x - 2)^2 + y^2 + 0.01))
x: -1, 5
y: -2.5, 2.5
levels: 18
gradient: true
point: 0, 0.3
sliders: eta=1:0:3:0.1
caption: A smoothed potential field: a quadratic bowl centred on the goal $(4, 0)$ plus a repulsive peak $\eta/\rho$ at the obstacle $(2, 0)$ (a simplified, everywhere-acting repulsion). Drag the point and follow the arrows of $-\nabla U$: starting slightly off the axis, the descent slides round the obstacle to the goal; starting exactly on the axis it stops in front of it, at a saddle. Raise $\eta$ to see the stagnation point move back from the obstacle.
:::

## Sampling-based planning {#sec-sampling}

For arms with six or more joints, neither grids nor explicit C-obstacles are practical, but a collision checker can test a single configuration in microseconds. Sampling-based planners build a graph of free configurations by random sampling and connect them with simple local paths (usually straight lines in C-space, checked at a fine resolution).

::: algorithm Probabilistic roadmap (PRM) {#alg-prm}
*Construction* (once per environment):
1. Sample $N$ configurations uniformly in $\mathcal C$; keep those that are collision-free as roadmap nodes.
2. For each node, try to connect it to its $k$ nearest neighbours (or all nodes within radius $r$) with a straight segment; add an edge for each segment that is collision-free.
*Query*: connect $\mathbf q_{\text{start}}$ and $\mathbf q_{\text{goal}}$ to nearby nodes in the same way, then search the roadmap with A*.
:::

::: algorithm Rapidly-exploring random tree (RRT) {#alg-rrt}
1. Initialise a tree with the root $\mathbf q_{\text{start}}$.
2. Repeat: sample $\mathbf q_{\text{rand}}$ (with a small probability, take $\mathbf q_{\text{goal}}$ instead — "goal bias"); find the nearest tree node $\mathbf q_{\text{near}}$; step from it a distance $\varepsilon$ towards $\mathbf q_{\text{rand}}$ to get $\mathbf q_{\text{new}}$; if the segment from $\mathbf q_{\text{near}}$ to $\mathbf q_{\text{new}}$ is collision-free, add $\mathbf q_{\text{new}}$ with parent $\mathbf q_{\text{near}}$.
3. Stop when a node lies within $\varepsilon$ of the goal and the final segment is free; return the tree path.
:::

The RRT is single-query and grows preferentially into unexplored regions: the nearest node to a uniform random sample is most likely one on the frontier of the tree, with a large Voronoi region. Both methods are **probabilistically complete**: if a path with some clearance exists, the probability of failing to find it decays to zero as the number of samples grows (for PRM, exponentially in $N$). Neither is optimal; RRT paths in particular are jagged and are shortened afterwards, and the asymptotically optimal variants PRM\* and RRT\* (Karaman and Frazzoli, 2011) rewire the graph to converge to shortest paths. Narrow passages remain hard: the probability of sampling inside a passage is proportional to its volume, which can be tiny in high dimensions.

::: remark Kinodynamic planning
The straight local paths above assume the robot can follow any path in C-space, which is true for arms (any joint path can be timed as in [[robotics/trajectory-planning]]) but false for nonholonomic vehicles. For car-like robots the local planner connects poses with feasible curves (Dubins or Reeds–Shepp paths, [[robotics/mobile-robots]]) or RRT extends nodes by simulating the vehicle with sampled controls for a short time.
:::

## Cameras and stereo depth {#sec-camera}

::: definition Pinhole camera {#def-pinhole}
A point with coordinates $(X, Y, Z)$ in the camera frame ($Z$ along the optical axis, $Z > 0$ in front of the camera) projects to pixel coordinates
$$
u = f_x\frac XZ + c_x,\qquad v = f_y\frac YZ + c_y ,
$$ {#eq-pinhole}
where $f_x$, $f_y$ are the focal length in pixels (focal length divided by pixel size) and $(c_x, c_y)$ is the principal point. In homogeneous coordinates $\lambda(u, v, 1)^{\mathsf T} = K(X, Y, Z)^{\mathsf T}$ with the **intrinsic matrix** $K = \begin{bmatrix} f_x & 0 & c_x\\ 0 & f_y & c_y\\ 0 & 0 & 1\end{bmatrix}$ and $\lambda = Z$. A point given in the world frame is first transformed by the camera's pose, $\mathbf p_c = T_{cw}\mathbf p_w$ ([[robotics/rigid-motions]]).
:::

A single image loses depth: every point on the ray through a pixel projects to the same pixel. Two cameras recover it.

::: proposition Depth from a rectified stereo pair {#prop-stereo}
Two identical pinhole cameras with focal length $f$ (pixels) have parallel optical axes and are displaced by the **baseline** $B$ along their common $x$-axis. A point at depth $Z$ appears in the two images with **disparity** $d = u_L - u_R$, and
$$
Z = \frac{fB}{d},\qquad \delta Z \approx \frac{Z^2}{fB}\,\delta d ,
$$
so a fixed disparity error $\delta d$ (typically a fraction of a pixel) gives a depth error that grows with the square of the depth.
:::

::: proof
In the left camera the point has coordinates $(X, Y, Z)$; in the right camera, displaced by $B$ along $x$, it has $(X - B, Y, Z)$. By [[#eq-pinhole]], $u_L = fX/Z + c_x$ and $u_R = f(X - B)/Z + c_x$, so $d = u_L - u_R = fB/Z$ and $Z = fB/d$. Differentiating, $dZ/dd = -fB/d^2 = -Z^2/(fB)$, so to first order $\lvert\delta Z\rvert = Z^2\lvert\delta d\rvert/(fB)$.
:::

::: example A stereo camera on a mobile robot {#ex-stereo}
A stereo camera has $f = 700$ pixels and baseline $B = 0.12\,\mathrm m$. A feature appears at $u_L = 361$ and $u_R = 340$. Find its depth and the depth uncertainty for a disparity error of $\pm0.5$ pixel; repeat for a feature at $12\,\mathrm m$.
::: solution
$d = 21$ pixels, $Z = 700\times0.12/21 = 4.0\,\mathrm m$, $\delta Z = 4.0^2\times0.5/84 = 0.095\,\mathrm m$ (2.4%). At $12\,\mathrm m$: $d = 84/12 = 7$ pixels and $\delta Z = 144\times0.5/84 = 0.86\,\mathrm m$ (7%). Nine times the error at three times the distance. Longer baselines and focal lengths help in proportion, which is why stereo heads for outdoor vehicles are wide, while compact indoor sensors are accurate only to a few metres.
:::
:::

::: widget plot
f: x^2*dd/(fp*B); x*0.01
x: 0, 20
y: 0, 2
sliders: dd=0.5:0.1:2:0.1; fp=700:300:2000:10; B=0.12:0.05:0.6:0.01
labels: \delta Z\ \text{(m)}; 1\%\ \text{of } Z
caption: Stereo depth error $\delta Z = Z^2\delta d/(fB)$ against depth $Z$ in metres, for disparity error $\delta d$ (pixels), focal length $f$ (pixels) and baseline $B$ (m); the straight line marks an error of 1% of the depth. The parabola crosses the line at $Z = 0.01fB/\delta d$: beyond that distance the stereo error exceeds 1%. Doubling the baseline doubles that distance; halving the matching error does the same.
:::

## The Kalman filter {#sec-kalman}

A robot estimates its state by combining a **prediction** from a motion model with **measurements**, both uncertain. When the models are linear and the noise Gaussian, the Bayes filter of [[robotics/mobile-robots]] keeps the belief Gaussian, and its recursion reduces to updating a mean and a variance (or covariance matrix): the **Kalman filter**. The core is the fusion of two independent estimates.

::: proposition Optimal fusion of two estimates {#prop-fusion}
Let $\hat x^-$ be an unbiased estimate of a scalar $x$ with variance $P^-$, and $z = x + w$ a measurement with independent zero-mean noise of variance $R$. Among all estimates of the form $\hat x = \hat x^- + K(z - \hat x^-)$, the variance is minimised by the **Kalman gain**
$$
K = \frac{P^-}{P^- + R},\qquad\text{giving}\qquad P = (1 - K)P^- = \frac{P^-R}{P^- + R},\quad \frac1P = \frac1{P^-} + \frac1R .
$$
If both errors are Gaussian, $\hat x$ and $P$ are the mean and variance of the posterior $p(x\mid z)$.
:::

::: proof
The error of the combined estimate is $\hat x - x = (1 - K)(\hat x^- - x) + Kw$, a combination of two independent zero-mean errors, so it is unbiased with variance $P(K) = (1 - K)^2P^- + K^2R$. This is a convex quadratic in $K$; setting $dP/dK = -2(1 - K)P^- + 2KR = 0$ gives $K = P^-/(P^- + R)$. Substituting, $1 - K = R/(P^- + R)$ and $P = \frac{R^2P^- + (P^-)^2R}{(P^- + R)^2} = \frac{P^-R}{P^- + R}$, equivalently $1/P = 1/P^- + 1/R$. For the Gaussian statement: by Bayes' rule $p(x\mid z)\propto\exp\!\big(-\frac{(x - \hat x^-)^2}{2P^-} - \frac{(z - x)^2}{2R}\big)$; the exponent is quadratic in $x$ with coefficient of $-x^2/2$ equal to $1/P^- + 1/R = 1/P$, and completing the square gives the mean $P(\hat x^-/P^- + z/R) = \hat x^- + K(z - \hat x^-)$.
:::

The combined variance is smaller than either: information (inverse variance) adds. The gain weights the measurement by how much it is trusted relative to the prediction — $K\to1$ for a perfect sensor, $K\to0$ for a useless one. The full filter alternates this **update** with a **prediction**: for a state model $x_k = x_{k-1} + u_k + n_k$ (motion $u_k$ with process noise of variance $Q$), the prediction is $\hat x_k^- = \hat x_{k-1} + u_k$, $P_k^- = P_{k-1} + Q$. In the vector case the same steps read $\hat{\mathbf x}^- = F\hat{\mathbf x} + G\mathbf u$, $P^- = FPF^{\mathsf T} + Q$, $K = P^-H^{\mathsf T}(HP^-H^{\mathsf T} + R)^{-1}$, $\hat{\mathbf x} = \hat{\mathbf x}^- + K(\mathbf z - H\hat{\mathbf x}^-)$, $P = (I - KH)P^-$. For the nonlinear models of robots (a unicycle moving, a range–bearing sensor seeing a landmark), the **extended Kalman filter** linearises the models at the current estimate, using their Jacobians in place of $F$ and $H$.

::: example Fusing odometry with a range measurement {#ex-kalman}
A robot in a corridor believes from odometry that it is at $\hat x^- = 2.00\,\mathrm m$ from the end wall, with standard deviation $0.20\,\mathrm m$. An ultrasonic sensor measures $z = 2.30\,\mathrm m$ with standard deviation $0.10\,\mathrm m$. Fuse them. Then the robot drives $1.0\,\mathrm m$ further with odometry noise of standard deviation $0.10\,\mathrm m$: what is the predicted belief?
::: solution
$P^- = 0.04\,\mathrm{m^2}$, $R = 0.01\,\mathrm{m^2}$, $K = 0.04/0.05 = 0.8$. $\hat x = 2.00 + 0.8\times0.30 = 2.24\,\mathrm m$, $P = 0.2\times0.04 = 0.008\,\mathrm{m^2}$, standard deviation $0.089\,\mathrm m$ — better than the sensor alone ($0.10$). The estimate sits four-fifths of the way towards the more precise measurement.
Prediction: $\hat x^- = 3.24\,\mathrm m$, $P^- = 0.008 + 0.010 = 0.018\,\mathrm{m^2}$, standard deviation $0.134\,\mathrm m$. Uncertainty grows during motion and shrinks at each measurement; with no measurements it would grow without bound, as odometry does.
:::
:::

::: widget plot
f: exp(-(x - 2)^2/(2*sp^2))/(sp*sqrt(2*pi)); exp(-(x - z)^2/(2*sr^2))/(sr*sqrt(2*pi)); exp(-(x - (2 + sp^2/(sp^2 + sr^2)*(z - 2)))^2/(2*sp^2*sr^2/(sp^2 + sr^2)))/(sqrt(2*pi*sp^2*sr^2/(sp^2 + sr^2)))
x: 1, 3.5
y: 0, 6
sliders: sp=0.2:0.05:0.5:0.01; z=2.3:1.5:3:0.01; sr=0.1:0.05:0.5:0.01
labels: \text{prediction}; \text{measurement}; \text{fused}
caption: Kalman fusion of a prediction ($N(2, \sigma_p^2)$) with a measurement $z$ of standard deviation $\sigma_r$; the start values are those of [[#ex-kalman]]. The fused density is always narrower than both inputs and lies between them, closer to the more precise one. Make $\sigma_r$ large and the fused curve collapses onto the prediction ($K\to0$); make it small and the measurement dominates ($K\to1$).
:::

::: quiz
A robot's position estimate has variance $0.09\,\mathrm{m^2}$, and an independent measurement has variance $0.09\,\mathrm{m^2}$. What is the variance after fusion?
- [ ] $0.09\,\mathrm{m^2}$: equal information cannot improve the estimate
- [x] $0.045\,\mathrm{m^2}$
- [ ] $0.18\,\mathrm{m^2}$
- [ ] $0.03\,\mathrm{m^2}$
::: solution
$1/P = 1/0.09 + 1/0.09$, so $P = 0.045\,\mathrm{m^2}$ and $K = 0.5$: the fused estimate is the average, with half the variance (standard deviation reduced by $\sqrt2$).
:::
:::

::: history
Peter Hart, Nils Nilsson and Bertram Raphael published A* in 1968 for the Shakey robot project at SRI, extending Edsger Dijkstra's 1959 shortest-path algorithm with a heuristic. Tomás Lozano-Pérez's 1983 paper "Spatial planning: a configuration space approach" (IEEE Transactions on Computers) made configuration space the standard framework of motion planning. Oussama Khatib's 1986 paper in the *International Journal of Robotics Research* introduced artificial potential fields for real-time obstacle avoidance. Lydia Kavraki, Petr Švestka, Jean-Claude Latombe and Mark Overmars published probabilistic roadmaps in 1996, and Steven LaValle introduced rapidly-exploring random trees in a 1998 technical report. Rudolf Kálmán's 1960 paper "A new approach to linear filtering and prediction problems" gave the recursive filter that bears his name; it was soon used for navigation in the Apollo programme and remains central to robot state estimation.
:::

::: summary
- Planning happens in configuration space; C-obstacles of a translating robot are Minkowski sums $\mathcal O\oplus(-\mathcal A_0)$ (obstacles grown by a disc robot's radius); for arms, collisions are checked point-wise with forward kinematics.
- A* expands nodes by $f = g + h$; with a consistent (hence admissible) heuristic it returns an optimal path and closes each node once; better heuristics expand fewer nodes. Grids are resolution complete and scale exponentially with dimension.
- Potential fields $U = \frac12k\lVert\mathbf q - \mathbf q_g\rVert^2 + U_{\text{rep}}$ are fast and reactive but get stuck in local minima.
- PRM (multi-query roadmap) and RRT (single-query tree) are probabilistically complete and handle high-dimensional C-spaces; RRT\*/PRM\* are asymptotically optimal; narrow passages are hard.
- Pinhole camera $u = f_xX/Z + c_x$; stereo depth $Z = fB/d$ with error $\delta Z = Z^2\delta d/(fB)$, growing with the square of depth.
- Kalman filter: predict ($P^- = P + Q$), then update with gain $K = P^-/(P^- + R)$; information adds, $1/P = 1/P^- + 1/R$. The EKF linearises nonlinear robot and sensor models.
:::

## Exercises

::: exercise Grown obstacle {#exr-grown level=1 check="2.4827"}
A disc robot of radius $0.3\,\mathrm m$ moves among obstacles; one obstacle is a $1\,\mathrm m\times1\,\mathrm m$ square. What is the area of the corresponding C-obstacle? (Enter it in $\mathrm{m^2}$, rounded to four decimal places.)
::: solution
The grown square consists of the square ($1$), four rectangles $1\times0.3$ along the sides ($1.2$) and four quarter-discs at the corners forming a full disc of radius $0.3$ ($0.09\pi = 0.2827$): total $2.4827\,\mathrm{m^2}$, two and a half times the obstacle's area. In general the grown area is $A + P\rho + \pi\rho^2$ for a convex obstacle of area $A$ and perimeter $P$.
:::
:::

::: exercise Projecting a point {#exr-project level=1 check="420"}
A camera has $f_x = f_y = 800$ pixels and principal point $(320, 240)$. Where does the point $(0.5, -0.2, 4.0)\,\mathrm m$ (camera frame) appear? (Enter $u$ in pixels.)
::: solution
$u = 800\times0.5/4 + 320 = 420$, $v = 800\times(-0.2)/4 + 240 = 200$.
:::
:::

::: exercise Depth from disparity {#exr-depth level=1 check="4"}
A stereo rig has $f = 700$ pixels and $B = 0.12\,\mathrm m$; a feature has disparity 21 pixels. What is its depth? (Enter $Z$ in m.)
::: solution
$Z = fB/d = 84/21 = 4.0\,\mathrm m$.
:::
:::

::: exercise Stereo depth error {#exr-stereo-error level=2 check="0.0952"}
For the rig of the previous exercise, what depth error does a disparity error of $0.5$ pixel cause at $Z = 4\,\mathrm m$? (Enter $\delta Z$ in m, rounded to four decimal places.)
::: solution
$\delta Z = Z^2\delta d/(fB) = 16\times0.5/84 = 0.0952\,\mathrm m$. Exactly, the disparity range $21\pm0.5$ gives depths $84/21.5 = 3.907$ and $84/20.5 = 4.098\,\mathrm m$, i.e. errors of $-0.093$ and $+0.098\,\mathrm m$ — the linearised value is their average to good accuracy, and the true error is slightly asymmetric.
:::
:::

::: exercise Diagonal grid paths {#exr-octile level=2 check="3*sqrt(2) + 2"}
On an empty 8-connected grid where straight steps cost 1 and diagonal steps cost $\sqrt2$, what is the cost of the shortest path from cell $(0, 0)$ to cell $(5, 3)$? Show that the "octile" distance $\max(\lvert\Delta x\rvert, \lvert\Delta y\rvert) + (\sqrt2 - 1)\min(\lvert\Delta x\rvert, \lvert\Delta y\rvert)$ is this cost. (Enter the cost exactly — an expression such as 3*sqrt(2) + 2 is accepted.)
::: solution
Use 3 diagonal steps (covering 3 in each direction) and 2 straight steps: $3\sqrt2 + 2 = 6.243$. Any path needs at least $\max = 5$ steps and moves at least $\min = 3$ units in the minor direction; each unit of minor-direction movement needs a diagonal step (cost $\sqrt2$) or a separate straight step (cost 1 plus the straight step still needed in the major direction), so diagonals are cheapest, giving $3\sqrt2 + (5 - 3) = 5 + (\sqrt2 - 1)\times3$ ✓. Because it is the exact obstacle-free cost, the octile distance is a consistent heuristic for A* on such grids, tighter than Euclidean distance.
:::
:::

::: exercise Kalman fusion {#exr-fusion level=2 check="0.008"}
In [[#ex-kalman]], verify the fused variance using $1/P = 1/P^- + 1/R$. (Enter $P$ in $\mathrm{m^2}$.)
::: solution
$1/P = 1/0.04 + 1/0.01 = 25 + 100 = 125\,\mathrm{m^{-2}}$, $P = 0.008\,\mathrm{m^2}$ ✓. The sensor contributes four times as much information as the prior, so it receives the weight $100/125 = 0.8 = K$.
:::
:::

::: exercise Steady-state Kalman gain {#exr-steady level=3 check="0.3904"}
A robot's position follows $x_k = x_{k-1} + u_k + n_k$ with process noise variance $Q = 0.01\,\mathrm{m^2}$ per step, and it measures its position each step with noise variance $R = 0.04\,\mathrm{m^2}$. Show that the predicted variance converges to the positive root of $(P^-)^2 - QP^- - QR = 0$ and find the steady-state gain. (Enter $K$ rounded to four decimal places.)
::: solution
One cycle maps $P^-_k$ to $P_k = P^-_kR/(P^-_k + R)$ and then $P^-_{k+1} = P_k + Q$. A fixed point satisfies $P^- = \frac{P^-R}{P^- + R} + Q$; multiplying by $P^- + R$: $(P^-)^2 + P^-R = P^-R + QP^- + QR$, i.e. $(P^-)^2 - QP^- - QR = 0$, whose positive root is $P^- = \frac{Q + \sqrt{Q^2 + 4QR}}{2} = \frac{0.01 + \sqrt{0.0001 + 0.0016}}{2} = 0.025616\,\mathrm{m^2}$. (The map is increasing and concave in $P^-$, so iterates converge to this fixed point from any positive start.) Then $K = P^-/(P^- + R) = 0.025616/0.065616 = 0.3904$ and the steady posterior variance is $(1 - K)P^- = 0.01562\,\mathrm{m^2}$ (standard deviation $0.125\,\mathrm m$, better than the sensor's $0.2\,\mathrm m$).
:::
:::

::: exercise Consistency implies admissibility {#exr-consistent level=3}
Prove that a consistent heuristic is admissible, and show by a small example that an admissible heuristic need not be consistent.
::: solution
Let $n = n_0, n_1, \dots, n_k = t$ be an optimal path from $n$ to the goal. Consistency gives $h(n_i)\le c(n_i, n_{i+1}) + h(n_{i+1})$; summing for $i = 0, \dots, k-1$ and telescoping, $h(n)\le\sum c(n_i, n_{i+1}) + h(t) = h^*(n) + 0$. Counterexample: a path $s\to a\to t$ with unit edge costs and $h(s) = 2$, $h(a) = 0$, $h(t) = 0$. It is admissible ($h^*(s) = 2$, $h^*(a) = 1$), but $h(s) = 2 > c(s, a) + h(a) = 1$, so it is not consistent: $f$ drops from $f(s) = 2$ to $f(a) = 1$ along the path. With inconsistent but admissible heuristics A* still returns optimal paths if closed nodes are allowed to be reopened, but it may expand nodes more than once.
:::
:::

::: exercise Choosing a planner {#exr-design level=3}
For each scenario, choose a planning approach and justify it: (a) a warehouse robot (differential drive, radius $0.4\,\mathrm m$) navigating aisles mapped as a $5\,\mathrm{cm}$ occupancy grid; (b) a 7-DOF arm reaching into a cluttered shelf, a new scene every time; (c) a fixed assembly cell where a 6-DOF arm repeats moves between many known stations for months; (d) a drone avoiding pedestrians that appear suddenly.
::: solution
(a) Inflate the grid by the robot's radius plus a margin ([[#prop-minkowski]]) and run A* (or D\*-Lite for replanning) on the 2-D grid with a Euclidean or octile heuristic; smooth the path and follow it with pure pursuit; a differential drive can turn on the spot, so the 2-D point path is executable. (b) Single-query, high-dimensional, unknown scene: an RRT variant (bidirectional RRT-Connect) with a collision checker on a point cloud or mesh of the shelf, followed by shortcutting and time scaling. (c) Multi-query in a fixed environment: build a PRM once (or precompute and verify specific paths), then answer each query by graph search in milliseconds. (d) Fast reaction to moving obstacles: a reactive local method (potential field or velocity-obstacle avoidance) running at sensor rate, combined with a global planner that supplies waypoints — the local method's local minima are then escaped by the global plan. In every case the planner's output must be checked against the robot's dynamics and timed before execution.
:::
:::

## Further reading

Lynch and Park and LaValle's *Planning Algorithms* (freely available online) treat configuration space, graph search, potential fields and sampling-based planning in depth; Thrun, Burgard and Fox develop Kalman and particle filters for localisation and mapping; Siegwart, Nourbakhsh and Scaramuzza cover cameras, stereo and range sensors for mobile robots.
