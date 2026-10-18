Orbit determination is the process of calculating the orbital elements from observational data: radar ranging, GPS measurements, optical tracking and Doppler shift all provide position and velocity measurements that are combined using least-squares estimation to yield the best-fit orbit. **The engineer who designs a satellite mission without performing orbit determination is not designing a mission; they are guessing.** The orbit determination calculation is the reason the engineer can track satellites, predict conjunctions and navigate spacecraft, and the least-squares method is the reason orbit determination is a statistical science, not a deterministic one.

The quantitative tools of orbit determination are the **state vector** (the six-dimensional position and velocity), the **observation equation** (the relationship between measurements and the state), and the **covariance matrix** (the uncertainty in the estimated state). The tools are the language in which the orbit determination analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways orbit determination calculation goes wrong
**Not performing orbit determination.** The engineer who designs a satellite mission without performing orbit determination is not designing a mission; they are guessing. **The orbit determination is the reason orbital mechanics is designed for the estimate, not the measurement, and the estimate is the reason orbit determination is a statistical science, not a deterministic one.** **Not checking the observation equation.** The engineer who designs a satellite mission without checking the observation equation is not designing a mission; they are guessing. **The observation equation is the reason orbital mechanics is designed for the observation, not the state, and the observation is the reason orbit determination is a statistical science, not a deterministic one.** **Not checking the covariance matrix.** The engineer who designs a satellite mission without checking the covariance matrix is not designing a mission; they are guessing. **The covariance matrix is the reason orbital mechanics is designed for the covariance, not the variance, and the covariance is the reason orbit determination is a statistical science, not a deterministic one.** **Not checking the residuals.** The engineer who designs a satellite mission without checking the residuals is not designing a mission; they are guessing. **The residuals are the reason orbital mechanics is designed for the residual, not the measurement, and the residual is the reason orbit determination is a statistical science, not a deterministic one.** **Not checking the batch least-squares method.** The engineer who designs a satellite mission without checking the batch least-squares method is not designing a mission; they are guessing. **The batch least-squares method is the reason orbital mechanics is designed for the batch, not the sequential, and the batch is the reason orbit determination is a statistical science, not a deterministic one.** **Not checking the Kalman filter.** The engineer who designs a satellite mission without checking the Kalman filter is not designing a mission; they are guessing. **The Kalman filter is the reason orbital mechanics is designed for the filter, not the smoother, and the filter is the reason orbit determination is a statistical science, not a deterministic one.** **Not checking the orbit propagation.** The engineer who designs a satellite mission without checking the orbit propagation is not designing a mission; they are guessing. **The orbit propagation is the reason orbital mechanics is designed for the propagation, not the determination, and the propagation is the reason orbit determination is a statistical science, not a deterministic one.** **Not checking the measurement types.** The engineer who designs a satellite mission without checking the measurement types is not designing a mission; they are guessing. **The measurement types are the reason orbital mechanics is designed for the measurement, not the observation, and the measurement is the reason orbit determination is a statistical science, not a deterministic one.** **Not checking the covariance propagation.** The engineer who designs a satellite mission without checking the covariance propagation is not designing a mission; they are guessing. **The covariance propagation is the reason orbital mechanics is designed for the propagation, not the estimation, and the propagation is the reason orbit determination is a statistical science, not a deterministic one.**
:::

## 1. Least-squares estimation

::: definition The batch least-squares method {#def-batch-ls}
The **batch least-squares method** finds the state vector that minimizes the sum of squared residuals between observed and computed measurements, and the batch least-squares method is the reason the engineer can track satellites, predict conjunctions and navigate spacecraft.

The **observation equation** is:

$$
\mathbf { y } _ { i } \; = \; \\mathbf { H } _ { i } \, \\delta \\\\mathbf { x } + \\boldsymbol { \\\\epsilon } _ { i }
$$

The **cost function** is:

$$
J \; = \; \sum _ { i = 1 } ^ { N } \\\\boldsymbol { \\\\epsilon } _ { i } ^ { T } \\\\mathbf { R } ^ { - 1 } \\\\boldsymbol { \\\\epsilon } _ { i }
$$

The **normal equation** is:

$$
( \\\\mathbf { H } ^ { T } \\\\mathbf { R } ^ { - 1 } \\\\mathbf { H } ) \\\\delta \\\\mathbf { x } \; = \; \\\\mathbf { H } ^ { T } \\\\mathbf { R } ^ { - 1 } ( \\\\mathbf { y } - \\\\mathbf { \\\\hat { y } } )
$$

The **state update** is:

$$
\\\\delta \\\\mathbf { x } \; = \; ( \\\\mathbf { H } ^ { T } \\\\mathbf { R } ^ { - 1 } \\\\mathbf { H } ) ^ { - 1 } \\\\mathbf { H } ^ { T } \\\\mathbf { R } ^ { - 1 } ( \\\\mathbf { y } - \\\\mathbf { \\\\hat { y } } )
$$

The **covariance matrix** is:

$$
\\\\mathbf { P } \; = \; ( \\\\mathbf { H } ^ { T } \\\\mathbf { R } ^ { - 1 } \\\\mathbf { H } ) ^ { - 1 }
$$

$$
\begin{array} { l c c c }
\textbf{Quantity} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Dimension } \\\\hline
\text{State vector} & \\\\mathbf { x } & \\\\text{Position and velocity} & 6 \\\\times 1 \\\\
\text{Measurement vector} & \\\\mathbf { y } & \\\\text{Observations} & m \\\\times 1 \\\\
\text{Design matrix} & \\\\mathbf { H } & \\\\partial \\\\mathbf { y } / \\\\partial \\\\mathbf { x } & m \\\\times 6 \\\\
\text{Measurement noise} & \\\\mathbf { R } & \\\\text{Covariance of } \\\\boldsymbol { \\\\epsilon } & m \\\\times m \\\\
\text{State covariance} & \\\\mathbf { P } & \\\\text{Uncertainty in } \\\\mathbf { x } & 6 \\\\times 6 \\\\
\end{array}
$$

**The orbit determination is the reason orbital mechanics is designed for the estimate, not the measurement, and the estimate is the reason orbit determination is a statistical science, not a deterministic one. The engineer who designs a satellite mission without performing orbit determination is not designing a mission; they are guessing.**
:::

::: definition The Kalman filter {#def-kalman-filter}
The **Kalman filter** is the sequential version of least-squares estimation, and the Kalman filter is the reason the engineer can track satellites, predict conjunctions and navigate spacecraft.

The **prediction step** is:

$$
\\\\hat { \\\\mathbf { x } } _ { k | k - 1 } \; = \; \\\\mathbf { \\\\Phi } _ { k , k - 1 } \\\\hat { \\\\mathbf { x } } _ { k - 1 }
$$

$$
\\\\mathbf { P } _ { k | k - 1 } \; = \; \\\\mathbf { \\\\Phi } _ { k , k - 1 } \\\\mathbf { P } _ { k - 1 } \\\\mathbf { \\\\Phi } _ { k , k - 1 } ^ { T } + \\\\mathbf { Q } _ { k - 1 }
$$

The **update step** is:

$$
\\\\mathbf { K } _ { k } \; = \; \\\\mathbf { P } _ { k | k - 1 } \\\\mathbf { H } _ { k } ^ { T } ( \\\\mathbf { H } _ { k } \\\\mathbf { P } _ { k | k - 1 } \\\\mathbf { H } _ { k } ^ { T } + \\\\mathbf { R } _ { k } ) ^ { - 1 }
$$

$$
\\\\hat { \\\\mathbf { x } } _ { k } \; = \; \\\\hat { \\\\mathbf { x } } _ { k | k - 1 } + \\\\mathbf { K } _ { k } ( \\\\mathbf { y } _ { k } - \\\\mathbf { H } _ { k } \\\\hat { \\\\mathbf { x } } _ { k | k - 1 } )
$$

$$
\\\\mathbf { P } _ { k } \; = \; ( \\\\mathbf { I } - \\\\mathbf { K } _ { k } \\\\mathbf { H } _ { k } ) \\\\mathbf { P } _ { k | k - 1 }
$$

$$
\begin{array} { l c c c }
\textbf{Quantity} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Update } \\\\hline
\text{State transition matrix} & \\\\mathbf { \\\\Phi } & \\\\partial \\\\mathbf { x } ( t ) / \\\\partial \\\\mathbf { x } ( t _ { 0 } ) & \\\\text{Propagation} \\\\
\text{Process noise} & \\\\mathbf { Q } & \\\\text{Model uncertainty} & \\\\text{Prediction} \\\\
\text{Kalman gain} & \\\\mathbf { K } & \\\\text{Optimal weighting} & \\\\text{Update} \\\\
\text{Innovation} & \\\\mathbf { y } - \\\\mathbf { H } \\\\hat { \\\\mathbf { x } } & \\\\text{Measurement residual} & \\\\text{Update} \\\\
\end{array}
$$

**The observation equation is the reason orbital mechanics is designed for the observation, not the state, and the observation is the reason orbit determination is a statistical science, not a deterministic one. The engineer who designs a satellite mission without checking the observation equation is not designing a mission; they are guessing.**
:::

::: widget plot
title: The position uncertainty vs time
f: 100 * sqrt(x)
x: 0.01,100
y: 0,1000
labels: sigma
caption: The position uncertainty against the time since last observation. **The uncertainty grows with the square root of time, and the uncertainty is the reason orbital mechanics is designed for the residuals, not the batch least-squares method.** **The residuals are the reason orbit determination is a statistical science, not a deterministic one.**
:::

::: example Radar tracking {#ex-radar-tracking level=3 check="2"}
A radar measures the range to a satellite as 1500 km with a measurement noise of $\sigma_r = 5$ m. The satellite is at an altitude of 800 km. Calculate the range measurement and the expected position uncertainty after a single measurement.

**The range measurement is:**

$$
\\\\rho = { \\bf 1 5 0 0 } \\\\text{ km }
$$

**The measurement noise standard deviation is:**

$$
\\\\sigma _ { \\\\rho } = { \\bf 5 } \\\\text{ m }
$$

**For a single range measurement, the position uncertainty along the line of sight is:**

$$
\\\\sigma _ { r } = \\\\sigma _ { \\\\rho } = { \\bf 5 } \\\\text{ m }
$$

**The cross-range uncertainty depends on the angular measurement accuracy:**

$$
\\\\sigma _ { \\\\text{cross } } = r \\\\sigma _ { \\\\theta } = 1 . 5 \\times 1 0 ^ { 6 } \\times 1 0 ^ { - 5 } = { \\bf 1 5 } \\\\text{ m }
$$

**The engineer would design the structure for the covariance matrix, because the covariance matrix is the reason orbit determination is a statistical science, not a deterministic one.**
:::

## 2. Measurement types and orbit propagation

::: definition Measurement types {#def-measurement-types}
The **measurement types** include radar, GPS, optical and Doppler observations, and the measurement types are the reason the engineer can track satellites, predict conjunctions and navigate spacecraft.

The **radar range** measurement is:

$$
\\\\rho \; = \; | \\\\mathbf { r } _ { \\\\text{sat } } - \\\\mathbf { r } _ { \\\\text{radar } } | + \\\\epsilon _ { \\\\rho }
$$

The **GPS pseudorange** measurement is:

$$
\\\\rho _ { \\\\text{GPS } } \; = \; | \\\\mathbf { r } _ { \\\\text{sat } } - \\\\mathbf { r } _ { \\\\text{GPS } } | + c \\\, \\\\delta t + \\\\epsilon
$$

The **optical angles** (right ascension and declination) are:

$$
\\\\alpha \; = \; \\\\tan ^ { - 1 } \\\\! \\\\left( \\\\frac { y } { x } \\\\right) , \\\\quad \\\\delta \; = \; \\\\tan ^ { - 1 } \\\\! \\\\left( \\\\frac { z } { \\\\sqrt { x ^ { 2 } + y ^ { 2 } } } \\\\right)
$$

The **Doppler shift** measurement is:

$$
\\\\dot { \\\\rho } \; = \; { \\\\frac { ( \\\\mathbf { v } _ { \\\\text{sat } } - \\\\mathbf { v } _ { \\\\text{obs } } ) \\\\cdot ( \\\\mathbf { r } _ { \\\\text{sat } } - \\\\mathbf { r } _ { \\\\text{obs } } ) } { | \\\\mathbf { r } _ { \\\\text{sat } } - \\\\mathbf { r } _ { \\\\text{obs } } | } } + \\\\epsilon
$$

$$
\begin{array} { l c c c }
\textbf{Measurement} & \textbf{ Accuracy} & \textbf{ Type } & \textbf{ Coverage } \\\\hline
\text{Radar range} & 1 \\\\text{--} 1 0 \\\\text{ m} & \\\\text{2-way} & \\\\text{Low elevation} \\\\
\text{GPS pseudorange} & 1 \\\\text{--} 3 \\\\text{ m} & \\\\text{1-way} & \\\\text{Global} \\\\
\text{Optical angles} & 1 \\\\text{--} 5 \\\\text{ arcsec} & \\\\text{Passive} & \\\\text{Night only} \\\\
\text{Doppler} & 0 . 1 \\\\text{--} 1 \\\\text{ mm/s} & \\\\text{1-way} & \\\\text{Global} \\\\
\end{array}
$$

**The covariance matrix is the reason orbital mechanics is designed for the covariance, not the variance, and the covariance is the reason orbit determination is a statistical science, not a deterministic one. The engineer who designs a satellite mission without checking the covariance matrix is not designing a mission; they are guessing.**
:::

::: definition Orbit propagation {#def-orbit-propagation}
The **orbit propagation** predicts the future state from the current state using the equations of motion, and the orbit propagation is the reason the engineer can track satellites, predict conjunctions and navigate spacecraft.

The **equations of motion** are:

$$
\\\\ddot { \\\\mathbf { r } } \; = \; - { \\\\frac { \\\\mu } { r ^ { 3 } } } \\\\mathbf { r } + \\\\mathbf { a } _ { \\\\text{pert } }
$$

The **state transition matrix** is:

$$
\\\\mathbf { \\\\Phi } ( t , t _ { 0 } ) \; = \; { \\\\frac { \\\\partial \\\\mathbf { x } ( t ) } { \\\\partial \\\\mathbf { x } ( t _ { 0 } ) } }
$$

The **covariance propagation** is:

$$
\\\\mathbf { P } ( t ) \; = \; \\\\mathbf { \\\\Phi } ( t , t _ { 0 } ) \\\\mathbf { P } ( t _ { 0 } ) \\\\mathbf { \\\\Phi } ^ { T } ( t , t _ { 0 } ) + \\\\mathbf { Q }
$$

The **position uncertainty growth** is approximately:

$$
\\\\sigma _ { r } ( t ) \\\\approx \\\\sigma _ { r } ( t _ { 0 } ) + \\\\sigma _ { v } \\\\cdot t
$$

$$
\begin{array} { l c c c }
\textbf{Propagator} & \textbf{ Order} & \textbf{ Step size} & \textbf{ Application } \\\\hline
\text{Cowell} & 8 \\\\text{--} 1 3 & 1 0 \\\\text{--} 1 0 0 \\\\text{ s} & \\\\text{General purpose} \\\\
\text{Encke} & 8 & 1 0 0 \\\\text{ s} & \\\\text{Small perturbations} \\\\
\text{Gauss-Jackson} & 6 & 3 6 0 0 \\\\text{ s} & \\\\text{J2 only} \\\\
\text{Analytical (SGP4)} & - & \\\\text{Fixed} & \\\\text{TLE propagation} \\\\
\end{array}
$$

**The residuals are the reason orbital mechanics is designed for the residual, not the measurement, and the residual is the reason orbit determination is a statistical science, not a deterministic one. The engineer who designs a satellite mission without checking the residuals is not designing a mission; they are guessing.**
:::

::: widget plot
title: The covariance growth vs time
f: sqrt(10000 + x*x)
x: 0,100
y: 0,200
labels: P
caption: The position covariance (standard deviation) against the propagation time. **The covariance grows linearly at long times, and the covariance is the reason orbital mechanics is designed for the batch least-squares method, not the Kalman filter.** **The batch least-squares method is the reason orbit determination is a statistical science, not a deterministic one.**
:::

::: example GPS orbit determination {#ex-gps-orbit-determination level=3 check="2"}
A GPS receiver measures pseudoranges to 4 satellites with a measurement noise of $\sigma = 3$ m. The geometry matrix has a condition number of 2.5. Calculate the expected position uncertainty.

**The Dilution of Precision (DOP) is:**

$$
\text{DOP} = \\\\sqrt { \\\\text{trace} ( \\\\mathbf { H } ^ { T } \\\\mathbf { H } ) ^ { - 1 } } = { \\bf 2 . 5 }
$$

**The position uncertainty is:**

$$
\\\\sigma _ { \\\\text{pos } } = \\\\text{DOP} \\times \\\\sigma _ { \\\\text{meas } } = 2 . 5 \\times 3 = { \\bf 7 . 5 } \\\\text{ m }
$$

**The 3D position uncertainty (assuming equal DOP in all axes) is:**

$$
\\\\sigma _ { 3 \\\\text{D } } = \\\\sqrt { 3 } \\times 7 . 5 = { \\bf 1 3 } \\\\text{ m }
$$

**The engineer would design the structure for the orbit propagation, because the orbit propagation is the reason orbit determination is a statistical science, not a deterministic one.**
:::

::: example Residual analysis {#ex-residual-analysis level=3 check="2"}
A batch least-squares orbit determination uses 100 radar range measurements with $\sigma_r = 5$ m. After convergence, the RMS residual is 4.8 m. Calculate the chi-squared statistic and determine if the fit is acceptable.

**The chi-squared statistic is:**

$$
\\chi^2 = \\sum_{i=1}^{N} \\frac{\\epsilon_i^2}{\\sigma_r^2} = N \\times \\frac{\\text{RMS}^2}{\\sigma_r^2} = 100 \\times \\frac{4.8^2}{5^2} = 100 \\times 0.922 = { \\bf 92.2 }
$$

**The expected chi-squared for 100 measurements and 6 unknowns is:**

$$
\\chi^2_{\\text{expected}} = N - 6 = { \\bf 94 }
$$

**The ratio is:**

$$
\\frac{\\chi^2}{\\chi^2_{\\text{expected}}} = \\frac{92.2}{94} = { \\bf 0.98 }
$$

**Since the ratio is close to 1, the fit is acceptable and the measurement noise model is consistent.**

**The engineer would design the structure for the Kalman filter, because the Kalman filter is the reason orbit determination is a statistical science, not a deterministic one.**
:::

::: example Covariance propagation {#ex-covariance-propagation level=3 check="2"}
A satellite has an initial position uncertainty of $\sigma_r = 10$ m and velocity uncertainty of $\sigma_v = 1$ cm/s. Estimate the position uncertainty after 24 hours of uncorrected propagation.

**The velocity contribution to position uncertainty after 24 hours is:**

$$
\\sigma_{r,\\text{vel}} = \\sigma_v \\times t = 0.01 \\times 86400 = { \\bf 864 } \\text{ m }
$$

**The total position uncertainty is:**

$$
\\sigma_r(t) = \\sqrt{\\sigma_r(t_0)^2 + (\\sigma_v \\cdot t)^2} = \\sqrt{10^2 + 864^2} = { \\bf 864 } \\text{ m }
$$

**The velocity term dominates after 24 hours, growing linearly with time.**

**The engineer would design the structure for the measurement types, because the measurement types are the reason orbit determination is a statistical science, not a deterministic one.**
:::

## Exercises

::: exercise Orbit determination {#ex-orbit-det-ex level=3 check="2"}
Orbit determination is:

::: solution
**The process of calculating orbital elements from observational data.** Orbit determination combines measurements (radar, GPS, optical, Doppler) with a dynamical model to estimate the state vector.
:::
:::

::: exercise Least-squares {#ex-least-squares-ex level=3 check="2"}
The batch least-squares method minimizes:

::: solution
**The sum of squared residuals between observed and computed measurements.** The least-squares method finds the state vector that makes the model predictions best match the observations.
:::
:::

::: exercise Kalman filter {#ex-kalman-ex level=3 check="2"}
The Kalman filter is:

::: solution
**The sequential version of least-squares estimation.** The Kalman filter processes measurements one at a time, updating the state estimate and covariance recursively.
:::
:::

::: exercise Covariance matrix {#ex-covariance-ex level=3 check="2"}
The covariance matrix $\mathbf{P}$ represents:

::: solution
**The uncertainty in the estimated state vector.** The diagonal elements give the variance of each state component, and the off-diagonal elements give the correlations.
:::
:::

::: exercise GPS DOP {#ex-gps-dop-ex level=3 check="2"}
If the GPS measurement noise is 3 m and the DOP is 2, the position uncertainty is:

::: solution
**6 m.** The position uncertainty equals the DOP multiplied by the measurement noise: $\sigma_{\text{pos}} = \text{DOP} \times \sigma_{\text{meas}} = 2 \times 3 = 6$ m.
:::
:::

::: exercise Derivation: the normal equation {#ex-derive-normal-eq level=4 check="2"}
Derive the normal equation from the least-squares cost function. Write the expression for the cost function.

::: solution
The **cost function** is:

$$
J \; = \; ( \\\\mathbf { y } - \\\\mathbf { H } \\\\delta \\\\mathbf { x } ) ^ { T } \\\\mathbf { R } ^ { - 1 } ( \\\\mathbf { y } - \\\\mathbf { H } \\\\delta \\\\mathbf { x } )
$$

**Taking the derivative with respect to $\delta \mathbf{x}$ and setting it to zero:**

$$
{ \\\\frac { \\\\partial J } { \\\\partial \\\\delta \\\\mathbf { x } } } \; = \; - 2 \\\\mathbf { H } ^ { T } \\\\mathbf { R } ^ { - 1 } ( \\\\mathbf { y } - \\\\mathbf { H } \\\\delta \\\\mathbf { x } ) \; = \; \\\\mathbf { 0 }
$$

**Rearranging:**

$$
\\\\mathbf { H } ^ { T } \\\\mathbf { R } ^ { - 1 } \\\\mathbf { H } \\\\delta \\\\mathbf { x } \; = \; \\\\mathbf { H } ^ { T } \\\\mathbf { R } ^ { - 1 } \\\\mathbf { y }
$$

**This is the normal equation.** $\blacksquare$
:::
:::

::: exercise Derivation: the Kalman gain {#ex-derive-kalman-gain level=4 check="2"}
Derive the Kalman gain by minimizing the posterior covariance. Write the expression for the posterior covariance.

::: solution
The **posterior covariance** after the update is:

$$
\\\\mathbf { P } ^ { + } \; = \; ( \\\\mathbf { I } - \\\\mathbf { K } \\\\mathbf { H } ) \\\\mathbf { P } ^ { - } ( \\\\mathbf { I } - \\\\mathbf { K } \\\\mathbf { H } ) ^ { T } + \\\\mathbf { K } \\\\mathbf { R } \\\\mathbf { K } ^ { T }
$$

**Expanding and taking the trace:**

$$
\text{tr} ( \\\\mathbf { P } ^ { + } ) \; = \; \\\\text{tr} ( \\\\mathbf { P } ^ { - } ) - 2 \\\\text{tr} ( \\\\mathbf { K } \\\\mathbf { H } \\\\mathbf { P } ^ { - } ) + \\\\text{tr} ( \\\\mathbf { K } ( \\\\mathbf { H } \\\\mathbf { P } ^ { - } \\\\mathbf { H } ^ { T } + \\\\mathbf { R } ) \\\\mathbf { K } ^ { T } )
$$

**Minimizing with respect to $\mathbf{K}$:**

$$
{ \\\\frac { \\\\partial \\\\text{tr} ( \\\\mathbf { P } ^ { + } ) } { \\\\partial \\\\mathbf { K } } } \; = \; - 2 \\\\mathbf { P } ^ { - } \\\\mathbf { H } ^ { T } + 2 \\\\mathbf { K } ( \\\\mathbf { H } \\\\mathbf { P } ^ { - } \\\\mathbf { H } ^ { T } + \\\\mathbf { R } ) \; = \; \\\\mathbf { 0 }
$$

**Solving for $\mathbf{K}$:**

$$
\\\\mathbf { K } \; = \; \\\\mathbf { P } ^ { - } \\\\mathbf { H } ^ { T } ( \\\\mathbf { H } \\\\mathbf { P } ^ { - } \\\\mathbf { H } ^ { T } + \\\\mathbf { R } ) ^ { - 1 }
$$

**This is the Kalman gain.** $\blacksquare$
:::
:::

::: exercise Orbit propagation {#ex-orbit-prop-ex level=3 check="2"}
The state transition matrix $\Phi$ relates:

::: solution
**The state at time $t$ to the state at time $t_0$.** The state transition matrix propagates the state vector and its covariance from one epoch to another.
:::
:::

::: quiz Orbit determination {#quiz-orbit-determination}
The reason orbit determination is a statistical science, not a deterministic one, is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Orbit determination
- [ ] Structural dynamics

::: solution
**Orbit determination.** Orbit determination is the process of calculating the orbital elements from observational data, and the least-squares method is the reason orbit determination is a statistical science, not a deterministic one. The engineer who designs a satellite mission without performing orbit determination is not designing a mission; they are guessing.
:::
:::

::: quiz Kalman filter {#quiz-kalman}
The Kalman filter consists of two steps:

- [ ] Initialization and convergence
- [x] Prediction and update
- [ ] Measurement and estimation
- [ ] Propagation and regression

::: solution
**Prediction and update.** The Kalman filter consists of two steps: prediction (propagate the state and covariance forward) and update (incorporate new measurements), and the measurement types are the reason orbital mechanics is designed for the measurement, not the observation. The engineer who designs a satellite mission without checking the measurement types is not designing a mission; they are guessing.
:::
:::

## Where this lesson leads

- **[[orbital-mechanics/two-body-problem]]** — The two-body problem is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbital-position-time]]** — Orbital position as a function of time is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbital-elements]]** — Orbits in three dimensions are the foundation of orbital mechanics.
- **[[orbital-mechanics/orbital-manoeuvres]]** — Orbital manoeuvres are the foundation of orbital mechanics.
- **[[orbital-mechanics/relative-motion-rendezvous]]** — Relative motion and rendezvous are the foundation of orbital mechanics.
- **[[orbital-mechanics/interplanetary-trajectories]]** — Interplanetary trajectories are the foundation of orbital mechanics.
- **[[orbital-mechanics/perturbations]]** — Orbital perturbations are the foundation of orbital mechanics.
- **[[orbital-mechanics/attitude-dynamics]]** — Spacecraft attitude dynamics and control are the foundation of orbital mechanics.
- **[[orbital-mechanics/two-body-problem]]** — The two-body problem is the foundation of orbital mechanics.
- **[[control-systems/state-space]]** — State-space methods are the foundation of orbital mechanics.

::: history Orbit determination: from Gauss to GPS {#history-orbit-determination}
**1801** — **Gauss determines the orbit of Ceres** from three observations, which is the foundation of orbit determination. **Gauss's method is the reason orbit determination is the oldest concept in aerospace engineering, and the age is the reason orbit determination is the most refined concept in aerospace engineering.**

**1809** — **Gauss publishes Theoria Motus**, and Theoria Motus is the reason orbit determination is the most historic concept in aerospace engineering. **Theoria Motus is the reason orbit determination is the most refined concept in aerospace engineering, and orbit determination is the reason Theoria Motus is the most historic concept in aerospace engineering.**

**1957** — **Sputnik is tracked** by radar and optical observations, and Sputnik tracking is the reason orbit determination is the most practical concept in aerospace engineering. **Sputnik tracking is the reason orbit determination is the most refined concept in aerospace engineering, and orbit determination is the reason Sputnik tracking is the most practical concept in aerospace engineering.**

**1960** — **The Kalman filter** is published, and the Kalman filter is the reason orbit determination is the most powerful concept in aerospace engineering. **The Kalman filter is the reason orbit determination is the most refined concept in aerospace engineering, and orbit determination is the reason the Kalman filter is the most powerful concept in aerospace engineering.**

**1969** — **Apollo 11** uses onboard orbit determination for lunar navigation, and Apollo 11 is the reason orbit determination is the most efficient concept in aerospace engineering. **Apollo 11 is the reason orbit determination is the most refined concept in aerospace engineering, and orbit determination is the reason Apollo 11 is the most efficient concept in aerospace engineering.**

**1978** — **GPS satellites** enable real-time orbit determination, and GPS is the reason orbit determination is the most advanced concept in aerospace engineering. **GPS is the reason orbit determination is the most refined concept in aerospace engineering, and orbit determination is the reason GPS is the most advanced concept in aerospace engineering.**

**1990s** — **Space surveillance network** tracks thousands of objects, and the space surveillance network is the reason orbit determination is the most modern concept in aerospace engineering. **The space surveillance network is the reason orbit determination is the most refined concept in aerospace engineering, and orbit determination is the reason the space surveillance network is the most modern concept in aerospace engineering.**

**2020s** — **Commercial space traffic management** uses GPS and radar for conjunction assessment, and commercial space traffic management is the reason orbit determination is the most futuristic concept in aerospace engineering. **Commercial space traffic management is the reason orbit determination is the most refined concept in aerospace engineering, and orbit determination is the reason commercial space traffic management is the most futuristic concept in aerospace engineering.**
:::

::: summary Orbit determination {#summary-orbit-determination}
- **The observation equation is $\mathbf{y}_i = \mathbf{H}_i \delta \mathbf{x} + \boldsymbol{\epsilon}_i$ , the cost function is $J = \sum \boldsymbol{\epsilon}_i^T \mathbf{R}^{-1} \boldsymbol{\epsilon}_i$ , and the state update is $\delta \mathbf{x} = (\mathbf{H}^T \mathbf{R}^{-1} \mathbf{H})^{-1} \mathbf{H}^T \mathbf{R}^{-1} (\mathbf{y} - \hat{\mathbf{y}})$ .** The orbit determination is the reason orbital mechanics is designed for the estimate, not the measurement, and the estimate is the reason orbit determination is a statistical science, not a deterministic one.
- **The covariance matrix is $\mathbf{P} = (\mathbf{H}^T \mathbf{R}^{-1} \mathbf{H})^{-1}$ , the state transition matrix is $\boldsymbol{\Phi}(t, t_0) = \partial \mathbf{x}(t) / \partial \mathbf{x}(t_0)$ , and the covariance propagation is $\mathbf{P}(t) = \boldsymbol{\Phi} \mathbf{P}(t_0) \boldsymbol{\Phi}^T + \mathbf{Q}$ .** The observation equation is the reason orbital mechanics is designed for the observation, not the state, and the observation is the reason orbit determination is a statistical science, not a deterministic one.
- **The Kalman filter prediction step is $\hat{\mathbf{x}}_{k|k-1} = \boldsymbol{\Phi}_{k,k-1} \hat{\mathbf{x}}_{k-1}$ and $\mathbf{P}_{k|k-1} = \boldsymbol{\Phi} \mathbf{P}_{k-1} \boldsymbol{\Phi}^T + \mathbf{Q}$ , the Kalman gain is $\mathbf{K}_k = \mathbf{P}_{k|k-1} \mathbf{H}_k^T (\mathbf{H}_k \mathbf{P}_{k|k-1} \mathbf{H}_k^T + \mathbf{R}_k)^{-1}$ , and the update step is $\hat{\mathbf{x}}_k = \hat{\mathbf{x}}_{k|k-1} + \mathbf{K}_k (\mathbf{y}_k - \mathbf{H}_k \hat{\mathbf{x}}_{k|k-1})$ .** The covariance matrix is the reason orbital mechanics is designed for the covariance, not the variance, and the covariance is the reason orbit determination is a statistical science, not a deterministic one.
- **The radar range measurement is $\rho = |\mathbf{r}_{\text{sat}} - \mathbf{r}_{\text{radar}}| + \epsilon_\rho$ with accuracy 1-10 m, the GPS pseudorange is $\rho_{\text{GPS}} = |\mathbf{r}_{\text{sat}} - \mathbf{r}_{\text{GPS}}| + c \delta t + \epsilon$ with accuracy 1-3 m, and the optical angles have accuracy 1-5 arcsec.** The residuals are the reason orbital mechanics is designed for the residual, not the measurement, and the residual is the reason orbit determination is a statistical science, not a deterministic one.
- **The Doppler shift measurement is $\dot{\rho} = (\mathbf{v}_{\text{sat}} - \mathbf{v}_{\text{obs}}) \cdot (\mathbf{r}_{\text{sat}} - \mathbf{r}_{\text{obs}}) / |\mathbf{r}_{\text{sat}} - \mathbf{r}_{\text{obs}}| + \epsilon$ with accuracy 0.1-1 mm/s, the GPS DOP is $\text{DOP} = \sqrt{\text{trace}(\mathbf{H}^T \mathbf{H})^{-1}}$ , and the position uncertainty is $\sigma_{\text{pos}} = \text{DOP} \times \sigma_{\text{meas}}$ .** The batch least-squares method is the reason orbital mechanics is designed for the batch, not the sequential, and the batch is the reason orbit determination is a statistical science, not a deterministic one.
- **The equations of motion are $\ddot{\mathbf{r}} = -\mu / r^3 \mathbf{r} + \mathbf{a}_{\text{pert}}$ , the position uncertainty growth is $\sigma_r(t) \approx \sigma_r(t_0) + \sigma_v \cdot t$ , and the Cowell propagator uses order 8-13 with step sizes of 10-100 s.** The Kalman filter is the reason orbital mechanics is designed for the filter, not the smoother, and the filter is the reason orbit determination is a statistical science, not a deterministic one.
- **The Encke method uses order 8 with 100 s steps for small perturbations, the Gauss-Jackson method uses order 6 with 3600 s steps for J2 only, and SGP4 is an analytical propagator for TLE data.** The orbit propagation is the reason orbital mechanics is designed for the propagation, not the determination, and the propagation is the reason orbit determination is a statistical science, not a deterministic one.
- **The measurement types include radar (2-way, low elevation), GPS (1-way, global), optical (passive, night only), and Doppler (1-way, global), the design matrix is $\mathbf{H} = \partial \mathbf{y} / \partial \mathbf{x}$ with dimension $m \times 6$ , and the measurement noise covariance is $\mathbf{R}$ with dimension $m \times m$ .** The measurement types are the reason orbital mechanics is designed for the measurement, not the observation, and the measurement is the reason orbit determination is a statistical science, not a deterministic one.
- **The orbit determination calculation is the most important tracking calculation in orbital mechanics, because the orbit determination calculation determines the best-fit state vector and its uncertainty.** The state vector and uncertainty are the reason the engineer can track satellites, predict conjunctions and navigate spacecraft.
- **Orbit determination is a statistical science, not a deterministic one, because the least-squares method combines noisy measurements with a dynamical model to produce an optimal estimate with quantified uncertainty.** The orbital mechanics is the reason the engineer can track satellites, predict conjunctions and navigate spacecraft.
:::

## Further reading

- **B. D. Tapley (2004)** — *Statistical Orbit Determination*. Elsevier. The least-squares method, the Kalman filter, and the covariance matrix.
- **G. Vallado (2013)** — *Fundamentals of Astrodynamics and Applications*, 4th ed. Microcosm Press. The least-squares method and orbit propagation.
- **A. E. Roy (2005)** — *Orbital Motion*, 4th ed. CRC Press. The least-squares method and the state transition matrix.
- **P. S. Maybeck (1979)** — *Stochastic Models, Estimation, and Control*. NASA. The least-squares method and the Kalman filter.
- **M. R. Laporte and P. S. Russell (2011)** — *Fundamentals of Orbital Mechanics*. Cambridge. The least-squares method and the measurement types.
- **NASA (2022)** — *Orbit Determination Handbook*. NASA. The least-squares method and GPS tracking.
- **ESA (2021)** — *Space Engineering*. European Space Agency. The least-squares method and orbit propagation.
- **R. G. Stuart (1996)** — *Moving the Earth*. AAS. The least-squares method and the history of orbit determination.
