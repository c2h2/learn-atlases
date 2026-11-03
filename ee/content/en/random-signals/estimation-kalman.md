A phone's navigation chip receives a GPS fix once a second, each accurate to a few metres, and an accelerometer reading a hundred times a second, precise over a fraction of a second but drifting badly over a minute. Neither alone gives a smooth, accurate track. Combined in the right way, they give a position that is better than either: the accelerometer fills in between the fixes, and the fixes stop the drift. Spacecraft, aircraft autopilots, robot vacuum cleaners, battery-charge gauges and the phase-locked loops of every receiver do the same thing — fuse a model of how a quantity evolves with a stream of noisy measurements of it. The algorithm that does this optimally, for linear systems with Gaussian noise, is the **Kalman filter**.

This chapter builds up to it in three steps. We first ask what "best estimate" means and show that the conditional mean minimises the mean-square error, and that for Gaussian variables it is a linear function of the data — so the linear estimators of [[random-signals/optimal-filtering]] are then optimal among *all* estimators. We next treat **least squares**, the workhorse for estimating fixed parameters from overdetermined measurements, and its statistical justification. Finally we derive the **discrete Kalman filter**, a recursive estimator for a state that changes in time, and connect its steady state to the Wiener filter. The probability is that of [[random-signals/probability-for-engineers]], especially jointly Gaussian vectors; state-space models are introduced in [[control-systems/state-space-models]], and the matrix algebra is in the Maths Atlas [linear algebra](/learn/maths/lesson.php?c=linear-algebra&l=least-squares) course.

## Minimum mean-square-error estimation

We observe a random vector $\mathbf X$ and want to estimate a related random vector $\mathbf S$ (a voltage, a position, a transmitted symbol) by some function $\hat{\mathbf S} = g(\mathbf X)$. The usual criterion is the **mean-square error** $\E\bigl[\norm{\mathbf S - g(\mathbf X)}^2\bigr]$, which penalises large errors heavily and leads to tractable mathematics.

::: theorem The conditional mean is the MMSE estimator {#thm-conditional-mean}
Among all functions $g$, the mean-square error $\E\bigl[\norm{\mathbf S - g(\mathbf X)}^2\bigr]$ is minimised by the **conditional mean**

$$
\hat{\mathbf S}(\mathbf x) = \E[\mathbf S\mid\mathbf X = \mathbf x] = \int\mathbf s\,f_{\mathbf S\mid\mathbf X}(\mathbf s\mid\mathbf x)\,\dd\mathbf s .
$$ {#eq-cond-mean}

Its error $\mathbf S - \hat{\mathbf S}$ has zero mean and is uncorrelated with every function of $\mathbf X$.
:::

::: proof
Fix the observed value $\mathbf x$. Conditional on $\mathbf X = \mathbf x$, the estimate $g(\mathbf x)$ is a constant vector $\mathbf c$, and $\E[\norm{\mathbf S - \mathbf c}^2\mid\mathbf x] = \E[\norm{\mathbf S - \mathbf m}^2\mid\mathbf x] + \norm{\mathbf m - \mathbf c}^2$, where $\mathbf m = \E[\mathbf S\mid\mathbf x]$ (expand the square around $\mathbf m$; the cross term vanishes because $\E[\mathbf S - \mathbf m\mid\mathbf x] = \mathbf 0$). This is smallest for $\mathbf c = \mathbf m$. Since the choice is optimal for every $\mathbf x$, it is optimal on average over $\mathbf X$. For any function $\phi$, $\E[(\mathbf S - \hat{\mathbf S})\phi(\mathbf X)\T] = \E\bigl[\E[\mathbf S - \hat{\mathbf S}\mid\mathbf X]\phi(\mathbf X)\T\bigr] = \mathbf 0$.
:::

The conditional mean is in general a nonlinear function of the data, and computing it requires the full joint distribution. The **linear MMSE** (LMMSE) estimator of [[random-signals/optimal-filtering#thm-orthogonality]] needs only means and covariances, but it is optimal only among linear functions. For one family of distributions there is no difference.

::: theorem Gaussian conditioning {#thm-gauss-cond}
If $\mathbf S$ and $\mathbf X$ are jointly Gaussian with means $\boldsymbol\mu_S$, $\boldsymbol\mu_X$ and covariances $\mathbf C_{SS}$, $\mathbf C_{XX}$ (nonsingular), $\mathbf C_{SX} = \E[(\mathbf S - \boldsymbol\mu_S)(\mathbf X - \boldsymbol\mu_X)\T]$, then the conditional distribution of $\mathbf S$ given $\mathbf X = \mathbf x$ is Gaussian with

$$
\E[\mathbf S\mid\mathbf x] = \boldsymbol\mu_S + \mathbf C_{SX}\mathbf C_{XX}^{-1}(\mathbf x - \boldsymbol\mu_X), \qquad \operatorname{Cov}[\mathbf S\mid\mathbf x] = \mathbf C_{SS} - \mathbf C_{SX}\mathbf C_{XX}^{-1}\mathbf C_{XS}.
$$ {#eq-gauss-cond}

The MMSE estimator is therefore linear (affine) in $\mathbf x$ and coincides with the LMMSE estimator, and its error covariance does not depend on the observed value.
:::

::: proof
Let $\mathbf A = \mathbf C_{SX}\mathbf C_{XX}^{-1}$ and $\mathbf E = (\mathbf S - \boldsymbol\mu_S) - \mathbf A(\mathbf X - \boldsymbol\mu_X)$. Then $\E[\mathbf E(\mathbf X - \boldsymbol\mu_X)\T] = \mathbf C_{SX} - \mathbf A\mathbf C_{XX} = \mathbf 0$. The pair $(\mathbf E, \mathbf X)$ is a linear transformation of $(\mathbf S, \mathbf X)$, hence jointly Gaussian ([[random-signals/probability-for-engineers#thm-linear-gauss]]), and uncorrelated, hence independent. So, given $\mathbf X = \mathbf x$, $\mathbf S = \boldsymbol\mu_S + \mathbf A(\mathbf x - \boldsymbol\mu_X) + \mathbf E$ with $\mathbf E$ still $\Normal(\mathbf 0, \operatorname{Cov}\mathbf E)$, and $\operatorname{Cov}\mathbf E = \mathbf C_{SS} - \mathbf A\mathbf C_{XS} - \mathbf C_{SX}\mathbf A\T + \mathbf A\mathbf C_{XX}\mathbf A\T = \mathbf C_{SS} - \mathbf C_{SX}\mathbf C_{XX}^{-1}\mathbf C_{XS}$.
:::

Two features of [[#eq-gauss-cond]] are worth absorbing. The estimate starts from the prior mean $\boldsymbol\mu_S$ and corrects it in proportion to the **surprise** $\mathbf x - \boldsymbol\mu_X$, the difference between what was observed and what was expected. And the covariance always *decreases* — information never hurts — by an amount $\mathbf C_{SX}\mathbf C_{XX}^{-1}\mathbf C_{XS}$ that depends on how strongly the data are correlated with the unknown. The Kalman filter is nothing more than this formula applied once per time step.

::: example Estimating a temperature from a noisy sensor {#ex-temperature}
A room temperature $S$ is known from experience to be about $21\,^\circ\mathrm{C}$ with a standard deviation of $2\,^\circ\mathrm{C}$ (Gaussian prior). A thermistor reads $X = S + N$, with Gaussian error $N$ of standard deviation $1\,^\circ\mathrm{C}$, independent of $S$, and shows $23.5\,^\circ\mathrm{C}$. Find the MMSE estimate and its standard deviation.
::: solution
Here $\mu_S = \mu_X = 21$, $C_{SS} = 4$, $C_{SX} = \Cov(S, S + N) = 4$ and $C_{XX} = 4 + 1 = 5$. By [[#eq-gauss-cond]],

$$
\hat S = 21 + \frac45(23.5 - 21) = 23.0\,^\circ\mathrm{C}, \qquad \Var(S\mid x) = 4 - \frac{4\times4}{5} = 0.8\,(^\circ\mathrm{C})^2,
$$

a standard deviation of $0.89\,^\circ\mathrm{C}$. The estimate moves $80\,\%$ of the way from the prior to the reading, because the reading is four times more precise (in variance) than the prior, and the result is more precise than either. In inverse-variance form, $1/0.8 = 1/4 + 1/1$: the **information** (inverse variance) of independent sources adds.
:::
:::

::: quiz
In [[#ex-temperature]], a second, independent thermistor of the same quality also reads $23.5\,^\circ\mathrm{C}$. What is the variance of the new estimate?
- [ ] $0.8$, because the second reading says nothing new
- [ ] $0.5$, half the sensor variance
- [x] $0.444$, from $1/(1/4 + 1/1 + 1/1)$
- [ ] $0.4$, half of $0.8$
::: solution
Information adds: $1/4 + 1 + 1 = 2.25$, so the variance is $1/2.25 = 0.444\,(^\circ\mathrm{C})^2$. The second sensor helps nearly as much as the first, but the gain is not quite a halving because the prior's contribution is fixed. (The estimate becomes $21 + 2.5\times(2/2.25) = 23.22\,^\circ\mathrm{C}$.)
:::
:::

::: remark When the conditional mean is nonlinear
For non-Gaussian problems the conditional mean can be much better than the best linear estimate. If a bit $S = \pm1$ (equally likely) is received as $X = S + N$ with $N\sim\Normal(0, \sigma^2)$, the conditional mean is $\E[S\mid x] = \tanh(x/\sigma^2)$, a soft limiter, while the LMMSE estimate is $x/(1 + \sigma^2)$; [[#exr-tanh]] compares their errors. The soft-limiter form is exactly what "soft-decision" decoders of [[information-theory/modern-codes]] pass between their stages.
:::

## Least squares

Often the unknown is not random but a fixed, unknown parameter vector $\boldsymbol\theta$ — the gain and offset of a sensor, the coefficients of a channel — and we have more measurements than unknowns, related linearly:

$$
\mathbf z = \mathbf H\boldsymbol\theta + \mathbf v,
$$ {#eq-linear-model}

with $\mathbf z\in\R^m$, $\mathbf H$ a known $m\times n$ matrix of full column rank ($m > n$), and $\mathbf v$ a zero-mean noise vector with covariance $\mathbf R$. Without a prior on $\boldsymbol\theta$ we cannot form a conditional mean, but we can choose $\hat{\boldsymbol\theta}$ to make the predicted measurements $\mathbf H\hat{\boldsymbol\theta}$ as close as possible to the actual ones.

::: theorem Least squares and the Gauss–Markov theorem {#thm-ls}
The **weighted least-squares** estimate, minimising $(\mathbf z - \mathbf H\boldsymbol\theta)\T\mathbf R^{-1}(\mathbf z - \mathbf H\boldsymbol\theta)$, is

$$
\hat{\boldsymbol\theta} = \bigl(\mathbf H\T\mathbf R^{-1}\mathbf H\bigr)^{-1}\mathbf H\T\mathbf R^{-1}\mathbf z, \qquad \operatorname{Cov}\hat{\boldsymbol\theta} = \bigl(\mathbf H\T\mathbf R^{-1}\mathbf H\bigr)^{-1}.
$$ {#eq-wls}

It is unbiased, and among all linear unbiased estimators it has the smallest covariance (it is the **best linear unbiased estimator**, BLUE). For $\mathbf R = \sigma^2\mathbf I$ it reduces to ordinary least squares, $\hat{\boldsymbol\theta} = (\mathbf H\T\mathbf H)^{-1}\mathbf H\T\mathbf z$ with covariance $\sigma^2(\mathbf H\T\mathbf H)^{-1}$. If $\mathbf v$ is Gaussian, $\hat{\boldsymbol\theta}$ is also the maximum-likelihood estimate.
:::

::: proof
Setting the gradient of the weighted cost to zero gives the **normal equations** $\mathbf H\T\mathbf R^{-1}\mathbf H\boldsymbol\theta = \mathbf H\T\mathbf R^{-1}\mathbf z$, whose solution is [[#eq-wls]] ($\mathbf H\T\mathbf R^{-1}\mathbf H$ is positive definite because $\mathbf H$ has full column rank). Write $\hat{\boldsymbol\theta} = \mathbf L\mathbf z$ with $\mathbf L = (\mathbf H\T\mathbf R^{-1}\mathbf H)^{-1}\mathbf H\T\mathbf R^{-1}$; then $\mathbf L\mathbf H = \mathbf I$, so $\E\hat{\boldsymbol\theta} = \boldsymbol\theta$, and $\operatorname{Cov}\hat{\boldsymbol\theta} = \mathbf L\mathbf R\mathbf L\T = (\mathbf H\T\mathbf R^{-1}\mathbf H)^{-1}$. Any other linear unbiased estimator is $(\mathbf L + \mathbf D)\mathbf z$ with $\mathbf D\mathbf H = \mathbf 0$; its covariance is $(\mathbf L + \mathbf D)\mathbf R(\mathbf L + \mathbf D)\T = \mathbf L\mathbf R\mathbf L\T + \mathbf D\mathbf R\mathbf D\T$, because $\mathbf L\mathbf R\mathbf D\T = (\mathbf H\T\mathbf R^{-1}\mathbf H)^{-1}(\mathbf D\mathbf H)\T = \mathbf 0$. The extra term is positive semidefinite. For Gaussian $\mathbf v$ the log-likelihood is, up to constants, minus half the weighted cost.
:::

The simplest case is a constant measured $m$ times: $\mathbf H = [1, \ldots, 1]\T$, $\mathbf R = \sigma^2\mathbf I$, and [[#eq-wls]] gives the sample mean with variance $\sigma^2/m$. With different variances $\sigma_i^2$ it gives the inverse-variance-weighted mean $\hat\theta = \sum(z_i/\sigma_i^2)/\sum(1/\sigma_i^2)$ with variance $1/\sum(1/\sigma_i^2)$, the information-adding rule of [[#ex-temperature]] without the prior.

::: example Calibrating a sensor {#ex-calibration}
A pressure transducer is driven with five known pressures $p = 0, 1, 2, 3, 4$ (in $\mathrm{bar}$) and gives outputs $z = 0.12, 1.05, 1.98, 3.10, 3.95$ (in $\mathrm{V}$). Fit $z = \theta_0 + \theta_1p$ by least squares, and estimate the uncertainty of the gain if the readings have independent errors of standard deviation $0.05\,\mathrm{V}$.
::: solution
The rows of $\mathbf H$ are $[1, p_i]$. Solving the normal equations is the familiar regression formula: with $\bar p = 2$, $\bar z = 2.04$, $\sum(p_i - \bar p)^2 = 10$ and $\sum(p_i - \bar p)(z_i - \bar z) = 9.71$,

$$
\hat\theta_1 = \frac{9.71}{10} = 0.971\,\mathrm{V/bar}, \qquad \hat\theta_0 = \bar z - \hat\theta_1\bar p = 0.098\,\mathrm{V}.
$$

The residuals are $0.022, -0.019, -0.060, 0.089, -0.032\,\mathrm{V}$. From [[#eq-wls]] with $\mathbf R = \sigma^2\mathbf I$, the variance of the slope is $\sigma^2/\sum(p_i - \bar p)^2$, so its standard deviation is $0.05/\sqrt{10} = 0.016\,\mathrm{V/bar}$, and that of the offset is $0.05\sqrt{1/5 + \bar p^2/10} = 0.039\,\mathrm{V}$. (Estimating $\sigma$ from the residuals instead, $s = \sqrt{\sum e_i^2/(5 - 2)} = 0.067\,\mathrm{V}$, gives a slope uncertainty of $0.021\,\mathrm{V/bar}$.) Spreading the calibration points wider increases $\sum(p_i - \bar p)^2$ and improves the gain estimate.
:::
:::

::: widget regression
points: 0,0.12; 1,1.05; 2,1.98; 3,3.10; 4,3.95
degree: 1
residuals: true
caption: The calibration data of [[#ex-calibration]] with the least-squares line and its residuals. Drag a point to see how a single bad reading pulls the line — least squares weights large errors heavily and is sensitive to outliers. Raise the degree to $4$ and the polynomial passes through every point: a perfect fit to the noise, and a poor model of the sensor.
:::

::: warning Least squares is not robust
Least squares assumes that every measurement error comes from the same well-behaved (ideally Gaussian) distribution. A single gross error — a glitch, a wrong unit, a saturated reading — can move the estimate arbitrarily far, because its squared residual dominates the cost. Look at the residuals before trusting a fit; reject or down-weight outliers with an explicit, documented rule; and remember that the covariance formula $(\mathbf H\T\mathbf R^{-1}\mathbf H)^{-1}$ is only as good as the assumed $\mathbf R$.
:::

## The discrete Kalman filter

### State-space model

Now let the unknown change with time. A linear **state-space model** describes a state vector $\mathbf x_k$ (position and velocity, a battery's charge, an oscillator's phase and frequency) that evolves and is measured as

$$
\mathbf x_{k+1} = \mathbf F\mathbf x_k + \mathbf w_k, \qquad \mathbf z_k = \mathbf H\mathbf x_k + \mathbf v_k,
$$ {#eq-state-space}

where $\mathbf F$ is the state-transition matrix, $\mathbf H$ the measurement matrix, and the **process noise** $\mathbf w_k$ and **measurement noise** $\mathbf v_k$ are zero-mean, white (independent from step to step), mutually independent and Gaussian, with covariances $\mathbf Q$ and $\mathbf R$. The initial state is Gaussian with mean $\hat{\mathbf x}_0$ and covariance $\mathbf P_0$, independent of the noises. (Known inputs $\mathbf G\mathbf u_k$ can be added to the state equation; they shift the prediction and change nothing else.) The model is a vector version of the shaping filters of [[random-signals/random-signals-lti#thm-factorisation]]: white noise driving a linear system.

We want, at each step $k$, the MMSE estimate of $\mathbf x_k$ given all the measurements $\mathbf z_1, \ldots, \mathbf z_k$ so far. Because everything is jointly Gaussian, by [[#thm-gauss-cond]] this estimate is linear in the data and its error covariance is computable in advance. The Kalman filter computes both recursively, so that each new measurement costs a fixed amount of work, however long the record.

::: algorithm The Kalman filter {#alg-kalman}
Start from $\hat{\mathbf x}_{0\mid0} = \hat{\mathbf x}_0$ and $\mathbf P_{0\mid0} = \mathbf P_0$. For $k = 1, 2, \ldots$:

1. **Predict** the state and its error covariance:

$$
\hat{\mathbf x}_{k\mid k-1} = \mathbf F\hat{\mathbf x}_{k-1\mid k-1}, \qquad \mathbf P_{k\mid k-1} = \mathbf F\mathbf P_{k-1\mid k-1}\mathbf F\T + \mathbf Q .
$$ {#eq-kf-predict}

2. **Compute the gain** from the innovation covariance $\mathbf S_k$:

$$
\mathbf S_k = \mathbf H\mathbf P_{k\mid k-1}\mathbf H\T + \mathbf R, \qquad \mathbf K_k = \mathbf P_{k\mid k-1}\mathbf H\T\mathbf S_k^{-1}.
$$ {#eq-kf-gain}

3. **Update** with the measurement $\mathbf z_k$:

$$
\hat{\mathbf x}_{k\mid k} = \hat{\mathbf x}_{k\mid k-1} + \mathbf K_k\bigl(\mathbf z_k - \mathbf H\hat{\mathbf x}_{k\mid k-1}\bigr), \qquad \mathbf P_{k\mid k} = (\mathbf I - \mathbf K_k\mathbf H)\mathbf P_{k\mid k-1}.
$$ {#eq-kf-update}

The vector $\boldsymbol\nu_k = \mathbf z_k - \mathbf H\hat{\mathbf x}_{k\mid k-1}$ is the **innovation**: the part of the new measurement that could not be predicted.
:::

::: theorem Optimality of the Kalman filter {#thm-kalman}
For the Gaussian model [[#eq-state-space]], $\hat{\mathbf x}_{k\mid k}$ from [[#alg-kalman]] is the conditional mean $\E[\mathbf x_k\mid\mathbf z_1, \ldots, \mathbf z_k]$, hence the MMSE estimate, and $\mathbf P_{k\mid k}$ is its error covariance. The innovations $\boldsymbol\nu_k$ are white, with covariance $\mathbf S_k$. Without the Gaussian assumption the filter is still the best *linear* estimator.
:::

::: proof
By induction. Suppose that, given $\mathcal Z_{k-1} = \{\mathbf z_1, \ldots, \mathbf z_{k-1}\}$, $\mathbf x_{k-1}$ is Gaussian with mean $\hat{\mathbf x}_{k-1\mid k-1}$ and covariance $\mathbf P_{k-1\mid k-1}$ (true for $k = 1$ by assumption).

*Prediction.* $\mathbf x_k = \mathbf F\mathbf x_{k-1} + \mathbf w_{k-1}$, with $\mathbf w_{k-1}$ independent of $\mathbf x_{k-1}$ and of $\mathcal Z_{k-1}$. Given $\mathcal Z_{k-1}$, $\mathbf x_k$ is therefore Gaussian with mean $\mathbf F\hat{\mathbf x}_{k-1\mid k-1}$ and covariance $\mathbf F\mathbf P_{k-1\mid k-1}\mathbf F\T + \mathbf Q$ ([[random-signals/probability-for-engineers#thm-linear-gauss]]): this is [[#eq-kf-predict]].

*Update.* Still conditioning on $\mathcal Z_{k-1}$, the pair $(\mathbf x_k, \mathbf z_k)$ is jointly Gaussian, with $\mathbf z_k = \mathbf H\mathbf x_k + \mathbf v_k$ and $\mathbf v_k$ independent of everything else. Its moments are: mean of $\mathbf z_k$, $\mathbf H\hat{\mathbf x}_{k\mid k-1}$; covariance of $\mathbf z_k$, $\mathbf H\mathbf P_{k\mid k-1}\mathbf H\T + \mathbf R = \mathbf S_k$; cross-covariance, $\Cov(\mathbf x_k, \mathbf z_k) = \mathbf P_{k\mid k-1}\mathbf H\T$. Conditioning additionally on the value of $\mathbf z_k$, [[#thm-gauss-cond]] gives

$$
\hat{\mathbf x}_{k\mid k} = \hat{\mathbf x}_{k\mid k-1} + \mathbf P_{k\mid k-1}\mathbf H\T\mathbf S_k^{-1}(\mathbf z_k - \mathbf H\hat{\mathbf x}_{k\mid k-1}), \qquad \mathbf P_{k\mid k} = \mathbf P_{k\mid k-1} - \mathbf P_{k\mid k-1}\mathbf H\T\mathbf S_k^{-1}\mathbf H\mathbf P_{k\mid k-1},
$$

which is [[#eq-kf-gain]]–[[#eq-kf-update]], and the conditional distribution is again Gaussian, completing the induction. The innovation $\boldsymbol\nu_k$ is the error of the MMSE prediction of $\mathbf z_k$ from $\mathcal Z_{k-1}$, so by [[#thm-conditional-mean]] it is uncorrelated with all functions of $\mathcal Z_{k-1}$, including the earlier innovations: the innovations are white. The linear-optimality statement follows by repeating the argument with the orthogonality principle in place of Gaussian conditioning.
:::

The structure is the one already seen in [[#ex-temperature]]: predict, compare, correct. The gain $\mathbf K_k$ balances the two sources of information. If the prediction is uncertain ($\mathbf P_{k\mid k-1}$ large) or the sensor is precise ($\mathbf R$ small), $\mathbf K_k$ is large and the filter follows the measurements; if the model is trusted and the sensor is noisy, $\mathbf K_k$ is small and the filter coasts on its predictions. Note too that $\mathbf P$ and $\mathbf K$ do not depend on the measured values, only on the model: they can be computed off-line, and $\mathbf P$ tells the designer in advance how accurate the filter will be.

### The scalar filter

For a single state the equations are transparent. Take a quantity that drifts as a random walk, $x_{k+1} = x_k + w_k$, measured directly, $z_k = x_k + v_k$, with $\Var w = q$ and $\Var v = r$. Then $F = H = 1$ and

$$
P^-_k = P_{k-1} + q, \qquad K_k = \frac{P^-_k}{P^-_k + r}, \qquad \hat x_k = \hat x_{k-1} + K_k(z_k - \hat x_{k-1}), \qquad P_k = (1 - K_k)P^-_k .
$$

Two limits are instructive.

- **A constant** ($q = 0$) measured repeatedly. With $P_0\to\infty$ (no prior knowledge), $P_1 = r$ and then $P_k = r/k$ and $K_k = 1/k$: the update $\hat x_k = \hat x_{k-1} + \frac1k(z_k - \hat x_{k-1})$ is exactly the running average of the $k$ measurements. The gain tends to zero — the filter eventually stops listening — which is right for a true constant but disastrous if the "constant" actually drifts.
- **A drifting quantity** ($q > 0$). The covariance converges to a steady state in which the prediction's added uncertainty $q$ balances the information gained from each measurement.

::: theorem Steady-state scalar Kalman filter {#thm-steady}
For the random walk $x_{k+1} = x_k + w_k$, $z_k = x_k + v_k$ with $q > 0$, the predicted variance converges to the positive root of $P^2 - qP - qr = 0$,

$$
P^- = \frac{q + \sqrt{q^2 + 4qr}}{2}, \qquad K = \frac{P^-}{P^- + r}, \qquad P = (1 - K)P^- = Kr,
$$ {#eq-steady}

and the filter becomes the first-order recursion $\hat x_k = (1 - K)\hat x_{k-1} + Kz_k$, an exponential smoother.
:::

::: proof
In the steady state $P^- = P + q$ and $P = P^-r/(P^- + r)$. Eliminating $P$: $P^- - q = P^-r/(P^- + r)$, i.e. $(P^- - q)(P^- + r) = P^-r$, which simplifies to $(P^-)^2 - qP^- - qr = 0$. Its positive root is [[#eq-steady}]. Convergence from any $P_0 \ge 0$ follows because the map $P^-\mapsto\frac{P^-r}{P^- + r} + q$ is increasing and concave with a single positive fixed point, so the iteration approaches it monotonically. Finally $P = (1 - K)P^- = \frac{r}{P^- + r}P^- = Kr$.
:::

::: example Tracking a drifting offset {#ex-drift}
An amplifier's offset drifts as a random walk with increments of variance $q = 1\,\mathrm{\mu V^2}$ per sample, and it is measured each sample with noise of variance $r = 4\,\mathrm{\mu V^2}$. Find the steady-state gain and the RMS error of the Kalman estimate, and compare with the raw measurement.
::: solution
By [[#eq-steady]], $P^- = (1 + \sqrt{1 + 16})/2 = 2.562\,\mathrm{\mu V^2}$, $K = 2.562/6.562 = 0.390$ and $P = 0.390\times4 = 1.562\,\mathrm{\mu V^2}$. The RMS error of the estimate is $\sqrt{1.562} = 1.25\,\mu\mathrm{V}$, against $2\,\mu\mathrm{V}$ for a single raw measurement. The filter $\hat x_k = 0.610\hat x_{k-1} + 0.390z_k$ averages over roughly $1/K\approx2.6$ samples: enough to reduce the noise, not so many that it lags the drift. If the drift were slower ($q = 0.01$, say), the gain would fall to $0.048$ and the filter would average over about $20$ samples.
:::
:::

::: widget plot
f: (r*(q + sqrt(q^2 + 4*q*r))/2)/((q + sqrt(q^2 + 4*q*r))/2 + r)/r; ((q + sqrt(q^2 + 4*q*r))/2)/((q + sqrt(q^2 + 4*q*r))/2 + r)
x: 0, 1
y: 0, 1.05
sliders: q=1:0.01:10:0.01; r=4:0.1:20:0.1
labels: P/r\ \text{(error relative to raw measurement)}; K\ \text{(gain)}
caption: Steady-state Kalman gain $K$ and error variance $P/r$ for a random walk observed in noise, as functions of the process-noise variance $q$ and measurement-noise variance $r$ (the curves are constant in $x$; read their heights). Since $P = Kr$, the two lines coincide: the gain is also the fraction of the measurement noise that survives. Make $q$ small compared with $r$ and both fall — a slowly drifting quantity can be averaged heavily; make $q$ large and $K\to1$, so the filter simply passes the measurements through.
:::

### A tracking filter

::: example Tracking position and velocity {#ex-cv-tracker}
A vehicle moves along a line with nearly constant velocity: each second its velocity changes by a random acceleration of standard deviation $\sigma_a = 0.2\,\mathrm{m/s^2}$, held for the second. A radar measures its position once a second with error $\sigma_r = 5\,\mathrm{m}$. Set up the Kalman filter, and report its steady-state accuracy from a simulation.
::: solution
With state $\mathbf x = [\text{position}, \text{velocity}]\T$ and $\Delta t = 1\,\mathrm{s}$, a constant acceleration $a$ over one step adds $\frac12a\Delta t^2$ to the position and $a\Delta t$ to the velocity:

$$
\mathbf F = \begin{bmatrix}1 & \Delta t\\ 0 & 1\end{bmatrix}, \quad \mathbf Q = \sigma_a^2\begin{bmatrix}\Delta t^4/4 & \Delta t^3/2\\ \Delta t^3/2 & \Delta t^2\end{bmatrix} = \begin{bmatrix}0.01 & 0.02\\0.02 & 0.04\end{bmatrix}, \quad \mathbf H = \begin{bmatrix}1 & 0\end{bmatrix}, \quad R = 25\,\mathrm{m^2}.
$$

Running [[#alg-kalman]] from a vague initial covariance, $\mathbf P$ converges within a few dozen steps to

$$
\mathbf P_{k\mid k} \to \begin{bmatrix}6.15 & 0.868\\0.868 & 0.264\end{bmatrix}, \qquad \mathbf K \to \begin{bmatrix}0.246\\0.0347\end{bmatrix},
$$

so the predicted accuracy is $\sqrt{6.15} = 2.48\,\mathrm{m}$ in position and $\sqrt{0.264} = 0.51\,\mathrm{m/s}$ in velocity — a velocity the radar does not measure at all. A Python simulation (`random.seed(17)`, $500$ steps, initial velocity $10\,\mathrm{m/s}$, errors averaged after the first $50$ steps) printed an RMS raw measurement error of $4.97\,\mathrm{m}$, an RMS filtered position error of $2.32\,\mathrm{m}$ and an RMS velocity error of $0.46\,\mathrm{m/s}$, consistent with the covariance (the sample of $450$ steps of a correlated error is not large, so agreement to about $10\,\%$ is what we should expect).
:::
:::

### Steady state and the Wiener filter

For a time-invariant model whose state is observable and driven by the noise, $\mathbf P_{k\mid k-1}$ converges to the solution of the **discrete algebraic Riccati equation**

$$
\mathbf P = \mathbf F\mathbf P\mathbf F\T + \mathbf Q - \mathbf F\mathbf P\mathbf H\T(\mathbf H\mathbf P\mathbf H\T + \mathbf R)^{-1}\mathbf H\mathbf P\mathbf F\T,
$$ {#eq-dare}

and the gain to a constant $\mathbf K$. The filter is then a fixed LTI system from $\mathbf z$ to $\hat{\mathbf x}$, and since it minimises the mean-square error among all causal estimators, it *is* the causal Wiener filter of [[random-signals/optimal-filtering]]. The Kalman form has three advantages: it needs no spectral factorisation, it handles the start-up transient and time-varying models exactly, and it extends to many inputs and outputs with no change.

A direct check: the first-order process $S[n] = 0.9S[n - 1] + W[n]$ observed in unit white noise, the example of [[random-signals/optimal-filtering#ex-fir-wiener]], is a scalar state-space model with $F = 0.9$, $H = 1$, $q = 1$, $r = 1$. Iterating the Riccati recursion gives $P^- = 1.484$, $K = 0.5974$ and an error variance $P = 0.5974$ — exactly the limit $0.5974$ approached there by FIR Wiener filters of increasing length. Similarly, the continuous-time version of the Lorentzian example in that chapter has steady-state error $\frac{N_0}{2}(b - a)$ and filter $(b - a)/(s + b)$, the causal Wiener solution quoted there.

::: application Kalman filters in practice
The Kalman filter's first major application was the navigation system of the Apollo spacecraft in the 1960s, where it fused inertial measurements with star sightings and ground radar. Today it runs in every GPS receiver (estimating position, velocity and clock error from pseudoranges), in inertial navigation units that fuse gyroscopes and accelerometers with GPS or magnetometers, in battery-management systems that estimate the state of charge from current and voltage, and in the tracking loops of radar and communication receivers. Most real systems are nonlinear and use the **extended Kalman filter**, which linearises $\mathbf F$ and $\mathbf H$ about the current estimate, or the **unscented Kalman filter**, which propagates a small set of sample points through the nonlinearity. A standard sanity check in practice is to test the innovations for whiteness and for the predicted covariance $\mathbf S_k$: a filter whose innovations are correlated or too large has a wrong model.
:::

::: history
Carl Friedrich Gauss used least squares from 1795 to predict the orbit of the asteroid Ceres from a few weeks of observations, publishing the method in 1809; Adrien-Marie Legendre had published it independently in 1805. Andrey Markov's work, and later Alexander Aitken's in 1935, established the minimum-variance property of the generalised least-squares estimator now called the Gauss–Markov theorem. Rudolf E. Kálmán published the discrete-time recursive filter in 1960, and with Richard Bucy the continuous-time version in 1961; Peter Swerling and Ruslan Stratonovich had obtained closely related results. Stanley Schmidt at NASA Ames developed the extended Kalman filter for the Apollo navigation computer in the early 1960s.
:::

## Where this leads

Estimation and control meet in the state-space framework: the Kalman filter is the dual of the optimal state-feedback controller of [[control-systems/state-feedback]], and together they form the linear-quadratic-Gaussian (LQG) controller; the observers of [[control-systems/state-space-models]] are Kalman filters with hand-chosen gains. Adaptive filters and spectral estimation in [[dsp/spectral-analysis]] use recursive least squares, a Kalman filter for a constant parameter vector. In communications, channel estimation and carrier and timing recovery in [[communication-systems/digital-modulation]] and [[communication-systems/wireless-communication]] are estimation problems of exactly this kind, and the soft estimates of [[#exr-tanh]] feed the iterative decoders of [[information-theory/modern-codes]].

::: summary
- The MMSE estimator is the conditional mean $\E[\mathbf S\mid\mathbf X]$; its error is uncorrelated with every function of the data.
- For jointly Gaussian variables, $\E[\mathbf S\mid\mathbf x] = \boldsymbol\mu_S + \mathbf C_{SX}\mathbf C_{XX}^{-1}(\mathbf x - \boldsymbol\mu_X)$ with covariance $\mathbf C_{SS} - \mathbf C_{SX}\mathbf C_{XX}^{-1}\mathbf C_{XS}$: linear, and the same as the LMMSE estimate. Information (inverse variance) from independent sources adds.
- Least squares $\hat{\boldsymbol\theta} = (\mathbf H\T\mathbf R^{-1}\mathbf H)^{-1}\mathbf H\T\mathbf R^{-1}\mathbf z$ is the best linear unbiased estimator, with covariance $(\mathbf H\T\mathbf R^{-1}\mathbf H)^{-1}$; it is sensitive to outliers.
- The Kalman filter alternates prediction ($\mathbf F\hat{\mathbf x}$, $\mathbf F\mathbf P\mathbf F\T + \mathbf Q$) and update with gain $\mathbf K = \mathbf P\mathbf H\T(\mathbf H\mathbf P\mathbf H\T + \mathbf R)^{-1}$; it is the MMSE estimator for linear Gaussian models, and its innovations are white.
- For a constant the Kalman filter is the running average ($K_k = 1/k$); for a random walk it converges to an exponential smoother with $P^- = \frac12(q + \sqrt{q^2 + 4qr})$.
- In steady state the Kalman filter is the causal Wiener filter, obtained from the Riccati equation instead of spectral factorisation.
:::

## Exercises

::: exercise Averaging measurements {level=1 check="0.002"}
A voltage is measured $25$ times with independent errors of standard deviation $10\,\mathrm{mV}$. What is the standard deviation, in volts, of the mean of the readings?
::: solution
$\sigma/\sqrt m = 10\,\mathrm{mV}/5 = 2\,\mathrm{mV}$, by [[#thm-ls]] with $\mathbf H = [1, \ldots, 1]\T$.
:::
:::

::: exercise Gaussian conditional mean {level=1 check="2"}
$X$ and $Y$ are jointly Gaussian with zero means, $\sigma_X = 2$, $\sigma_Y = 3$ and correlation coefficient $\rho = 0.5$. Find $\E[X\mid Y = 6]$ and $\Var(X\mid Y = 6)$.
::: solution
$C_{XY} = \rho\sigma_X\sigma_Y = 3$ and $C_{YY} = 9$, so $\E[X\mid y] = \frac{3}{9}\times6 = 2$ and $\Var(X\mid y) = 4 - 3^2/9 = 3$, which is $\sigma_X^2(1 - \rho^2)$.
:::
:::

::: exercise A steady-state gain {level=1 check="0.0951249"}
A random walk with $q = 0.01$ is measured with noise variance $r = 1$. Find the steady-state Kalman gain.
::: solution
$P^- = (0.01 + \sqrt{0.0001 + 0.04})/2 = (0.01 + 0.20025)/2 = 0.10512$, so $K = 0.10512/1.10512 = 0.0951$.
:::
:::

::: exercise Fusing two sensors {level=2 check="0.8"}
Two independent sensors measure the same quantity with error standard deviations $1$ and $2$ (in the same units), and there is no prior information. Find the weights of the best linear unbiased combination and the variance of the result.
::: solution
Inverse-variance weights $1$ and $\tfrac14$, normalised: $\hat\theta = (z_1 + z_2/4)/(1.25) = 0.8z_1 + 0.2z_2$, with variance $1/(1 + 0.25) = 0.8$. The poorer sensor still helps, reducing the variance from $1$ to $0.8$.
:::
:::

::: exercise The running average as a Kalman filter {level=2}
For a constant $x$ ($q = 0$) measured with noise variance $r$, and a prior variance $P_0$, show that $P_k = \dfrac{P_0r}{r + kP_0}$ and $K_k = \dfrac{P_0}{r + kP_0}$. What happens as $P_0\to\infty$ and as $P_0\to0$?
::: solution
With $q = 0$, $P^-_k = P_{k-1}$ and $P_k = P_{k-1}r/(P_{k-1} + r)$, i.e. $1/P_k = 1/P_{k-1} + 1/r$. So $1/P_k = 1/P_0 + k/r$, giving $P_k = P_0r/(r + kP_0)$, and $K_k = P_{k-1}/(P_{k-1} + r) = P_k/r = P_0/(r + kP_0)$. As $P_0\to\infty$, $K_k\to1/k$ and $P_k\to r/k$: the running mean. As $P_0\to0$, $K_k\to0$: the prior is certain and the measurements are ignored.
:::
:::

::: exercise Least squares for a sinusoid {level=2}
A sinusoid of known frequency $f_0$ and unknown amplitude and phase is written $z(t) = a\cos2\pi f_0t + b\sin2\pi f_0t$ and sampled at $t_n = n/(4f_0)$, $n = 0, \ldots, 7$ (two cycles, four samples per cycle), with white measurement noise of variance $\sigma^2$. Set up $\mathbf H$ and show that $\hat a = \frac14(z_0 - z_2 + z_4 - z_6)$ and $\hat b = \frac14(z_1 - z_3 + z_5 - z_7)$, each with variance $\sigma^2/4$.
::: solution
The rows of $\mathbf H$ are $[\cos(\pi n/2), \sin(\pi n/2)]$: $[1, 0], [0, 1], [-1, 0], [0, -1]$, repeated twice. Then $\mathbf H\T\mathbf H = \diag(4, 4)$ (the columns are orthogonal), and $\mathbf H\T\mathbf z = [z_0 - z_2 + z_4 - z_6,\ z_1 - z_3 + z_5 - z_7]\T$. Hence $\hat{\boldsymbol\theta} = \frac14\mathbf H\T\mathbf z$, as stated, with covariance $\sigma^2(\mathbf H\T\mathbf H)^{-1} = \frac{\sigma^2}{4}\mathbf I$. This is a two-bin DFT: least squares onto orthogonal sinusoids is Fourier analysis, which is how lock-in amplifiers and digital power meters extract a component of known frequency.
:::
:::

::: exercise Soft estimates of a bit {#exr-tanh level=3}
A bit $S = \pm1$ (equally likely) is received as $X = S + N$ with $N\sim\Normal(0, \sigma^2)$. (a) Show that $\E[S\mid X = x] = \tanh(x/\sigma^2)$. (b) Find the LMMSE estimate and its MSE. (c) For $\sigma = 1$, numerical integration gives an MSE of $0.450$ for the conditional mean; compare.
::: solution
(a) By Bayes' rule, $\Prob(S = \pm1\mid x)\propto e^{-(x\mp1)^2/2\sigma^2}$, so

$$
\E[S\mid x] = \frac{e^{-(x-1)^2/2\sigma^2} - e^{-(x+1)^2/2\sigma^2}}{e^{-(x-1)^2/2\sigma^2} + e^{-(x+1)^2/2\sigma^2}} = \frac{e^{x/\sigma^2} - e^{-x/\sigma^2}}{e^{x/\sigma^2} + e^{-x/\sigma^2}} = \tanh\frac{x}{\sigma^2}.
$$

(b) With $\E[S^2] = 1$, $\E[SX] = 1$, $\E[X^2] = 1 + \sigma^2$: $\hat S = x/(1 + \sigma^2)$ and $\mathrm{MSE} = 1 - 1/(1 + \sigma^2) = \sigma^2/(1 + \sigma^2)$. (c) For $\sigma = 1$ the LMMSE error is $0.5$, the conditional mean's $0.450$: about $10\,\%$ lower, because the nonlinear estimate exploits the knowledge that $S$ can only be $\pm1$. The gap widens at high SNR, where $\tanh$ saturates to the correct value while the linear estimate keeps a residual scale error.
:::
:::

::: exercise Kalman filter as a Wiener filter {level=3}
For the scalar model $x_{k+1} = ax_k + w_k$, $z_k = x_k + v_k$ with $\Var w = q$, $\Var v = r$, show that the steady-state predicted variance satisfies $P^- = a^2\dfrac{P^-r}{P^- + r} + q$. Solve it for $a = 0.9$, $q = r = 1$ and confirm $P = 0.5974$. Write the steady-state filter as a transfer function from $z$ to $\hat x$.
::: solution
The steady state needs $P = P^-r/(P^- + r)$ and $P^- = a^2P + q$; substituting gives the stated equation, a quadratic $(P^-)^2 + (r - a^2r - q)P^- - qr = 0$. With $a = 0.9$, $q = r = 1$ the linear coefficient is $r - a^2r - q = 1 - 0.81 - 1 = -0.81$, so $P^- = (0.81 + \sqrt{0.6561 + 4})/2 = (0.81 + 2.1578)/2 = 1.4839$. Then $K = P^-/(P^- + r) = 0.5974$ and $P = Kr = 0.5974$. The filter is $\hat x_k = a\hat x_{k-1} + K(z_k - a\hat x_{k-1}) = a(1 - K)\hat x_{k-1} + Kz_k$, so

$$
\frac{\hat X(z)}{Z(z)} = \frac{K}{1 - a(1 - K)z^{-1}} = \frac{0.5974}{1 - 0.3623z^{-1}},
$$

a causal one-pole IIR filter whose impulse response $0.5974\times0.3623^n$ is the limit of the FIR Wiener coefficients $0.6013, 0.2250, 0.1013, \ldots$ of [[random-signals/optimal-filtering#ex-fir-wiener]] as the length grows ($0.5974$, $0.2164$, $0.0784$, …).
:::
:::

::: exercise Designing a measurement campaign {level=3}
A sensor's gain $\theta_1$ is to be calibrated by fitting $z = \theta_0 + \theta_1p$ to $m$ readings with independent errors of standard deviation $\sigma = 0.05\,\mathrm{V}$. The calibration pressures can be chosen anywhere in $[0, 4]\,\mathrm{bar}$. (a) Show that the variance of $\hat\theta_1$ is minimised by putting half the points at each end of the range, and find it for $m = 10$. (b) How many evenly spaced points $0, \frac{4}{m-1}, \ldots, 4$ would give the same precision? (c) What is the drawback of the end-point design?
::: solution
(a) $\Var\hat\theta_1 = \sigma^2/\sum(p_i - \bar p)^2$, and $\sum(p_i - \bar p)^2$ is maximised on $[0, 4]$ by placing the points at the ends, half at each: then every $\abs{p_i - \bar p} = 2$ and $\sum = 4m = 40$ for $m = 10$. So $\Var\hat\theta_1 = 0.0025/40$, a standard deviation of $7.9\,\mathrm{mV/bar}$. (b) For evenly spaced points, $\sum(p_i - \bar p)^2 = \frac{16}{(m-1)^2}\cdot\frac{(m-1)m(m+1)}{12} = \frac{4m(m+1)}{3(m-1)}$. Setting this equal to $40$: $4m(m + 1) = 120(m - 1)$, i.e. $m^2 - 29m + 30 = 0$, so $m = 27.9$: about $28$ evenly spaced points are needed. (c) Two pressures cannot reveal nonlinearity: if the sensor is not linear, the end-point design hides the curvature completely. Practical calibrations compromise, with most points at the ends and a few in the middle to check the model.
:::
:::
