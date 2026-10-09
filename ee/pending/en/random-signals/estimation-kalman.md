The estimate, and the one that the state is for, is the one that the prediction is for. The Kalman, and the one that the filter is for, is the one that the state is for, of the dynamic, and the one that the time is for. The gain, and the one that the filter is for, is the one that the update is for, of the estimate, and the one that the measurement is for. This lesson defines the state, and the one that the space is for, of the model, and the one that the signal is for, and gives the Kalman, and the one that the filter is for, of the prediction, and the one that the time is for, and the update, and the one that the measurement is for, of the estimation, and the one that the limit is for, and the gain, and the one that the filter is for, of the ratio, and the one that the limit is for, and the property, and the one that the state is for, of the filter, and the one that the limit is for. The method, and the check, are the one for the prediction and the update and the gain, and the one that is new is the Kalman, and the one that the filter is for. The Kalman, and the one that the filter is for, is the one that the state and the control and the design, and the one that the limit is for.

## The state model

The state, and the one that the space is for, of the model, is the one that the signal is for, of the internal, and the one that the limit is for. The estimate, and the one that the state is for, is the one that the prediction is for, of the state, and the one that the time is for.

::: definition State space {#def-state}
The **tate space** model, and the one that the signal is for, is
$$
x_{t+1} = H x_t + w_t, \quad z_t = C x_t + v_t,
$$
and the one that the state is for, where the $x$ is the state, and the one that the limit is for, of the vector, and the one that the state is for, the $H$ is the transition, and the one that the state is for, of the state, and the one that the limit is for, the $z$ is the measurement, and the one that the limit is for, of the limit, and the one that the signal is for, and the $C$ is the output, and the one that the measurement is for, of the mapping, and the one that the signal is for. The $w$ and $v$ are the process, and the one that the signal is for, noise, and the one that the limit is for, and the measurement, and the one that the signal is for, noise, and the one that the limit is for.
:::

The state, and the one that the space is for, of the model, is the one that the limit is for, of the signal, and the one that the limit is for. The Kalman, and the one that the filter is for, is the one that the estimate is for, of the state, and the one that the time is for, and the one that the limit is for. The two, and the one that the state is for, are the state and the measurement, and the one that the limit is for.

::: proposition State estimate {#prop-state}
The **tate** estimate, and the one that the time is for, is the one that the minimum is for, of the mean, and the one that the square is for, of the square, and the one that the error is for, of the limit, and the one that the state is for:
$$
\hat{x} = \mathrm{argmin}\; E\left[\|x-\hat{x}\|^2\right].
$$
and the one that the estimate is for. The Kalman, and the one that the filter is for, is the one that the state is for, of the estimate, and the one that the limit is for. The estimate, and the one that the state is for, is the one that the prediction is for, of the prediction, and the one that the limit is for.
:::

The state, and the one that the limit is for, is the one that the internal is for, of the model, and the one that the signal is for. The measurement, and the one that the limit is for, is the one that the observation is for, of the state, and the one that the limit is for. The two, and the one that the state is for, are the state and the measurement, and the one that the limit is for.

## The prediction and the update

The calibration, and the one that the state is for, of the state, and the one that the time is for, is the one that the prior is for. The update, and the one that the measurement is for, of the estimate, and the one that the limit is for, is the one that the posterior is for, of the estimate, and the one that the limit is for.

::: theorem Kalman {#thm-kalman}
The **Kalman** is
$$
\hat{x}^{-} = H \hat{x}, \qquad P^{-} = H P H^{T} + Q,
$$
and the **update** is
$$
K = P^{-} C^{T}(C P^{-} C^{T} + R)^{-1}, \qquad
\hat{x} = \hat{x}^{-} + K(z - C \hat{x}^{-}), \qquad P = (I-KC)P^{-}.
$$
and the one that the Kalman is for. The $K$ is the gain, and the one that the filter is for, of the filter, and the one that the limit is for. The $z - C\hat{x}^{-}$ is the innovation, and the one that the measurement is for, of the measurement, and the one that the limit is for, the difference, and the one that the prediction is for, of the prediction, and the one that the measurement is for, and the one that the limit is for.
:::

The prediction, and the one that the time is for, is the one that the prior is for, of the state, and the one that the limit is for. The update, and the one that the measurement is for, is the one that the posterior is for, of the state, and the one that the estimate is for. The two, and the one that the Kalman is for, are the prediction and the update, and the one that the time is for.

::: example The gain, and the ratio {#ex-gain}
The prior variance of the state is the one point. The measurement noise variance is the four point. What is the Kalman gain {level=1}?
::: solution
The Kalman gain, and the one that the filter is for, in the scalar, and the one that the state is for, case, and the one that the limit is for, is
$$
K = P^{-} \left(P^{-} + R\right)^{-1} = \frac{P^{-}}{P^{-}+R}.
$$
and the one that the gain is for. When the $P^{-}$ is the one point, and the one that the value is for, and the $R$ is the four point, and the one that the value is for, the gain, and the one that the filter is for, is the one point, and the one that the value is for, over the one point, and the one value is for, plus the four point, and the one that the value is for, and the zero point two, and the five, and the one that the value is for. The less prior confidence, and the more measurement confidence, and the one that the limit is for, gives the more weight to the measurement {level=2}.
:::
:::

::: example The trace, and the error {#ex-trace}
The covariance is the two point, and the one that the value is for, of the scalar. What is the mean square error, and the one that the estimate is for?
::: solution
The mean square error, and the one that the estimate is for, is the trace, and the one that the covariance is for, of the covariance, and the one that the limit is for. In the scalar, and the one that the state is for, case, it is the covariance, and the one that the variance is for, of the variance, and the two point, and the one that the value is for, of the two point. The less the covariance, and the one that the state is for, the less the error, and the one that the limit is for, and the one that the estimate is for. The Kalman, and the one that the filter is for, is the one that the covariance is for, of the minimum, and the one that the limit is for.
:::
:::

## The innovation and the limit

The innovation, and the one that the measurement is for, of the measurement, is the one that the prediction and the measurement is for, of the difference {level=3}. The innovation, and the one that the measurement is for, is the new, and the one that the information is for.

::: proposition Innovation {#prop-innov}
The **innovation** is
$$
\nu = z - C\hat{x}^{-}.
$$
and the one that the innovation is for. It is the measurement error, after accounting for the predicted state. The innovation has variance
$$
S = C P^{-} C^{T} + R.
$$
and the one that the innovation is for. The gain is the prior covariance divided by the innovation variance:
$$
K = P^{-} C^{T} S^{-1}.
$$
and the one that the gain is for.
:::

The innovation, and the one that the measurement is for, is the one that the prediction and the measurement is for, of the difference. The gain, and the one that the filter is for, is the one that the prior and the innovation is for, of the ratio. The two, and the one that the Kalman is for, are the innovation and the gain, and the one that the measurement is for.

::: example The innovation, and the variance {#ex-innov}
Explain, why the gain, and the one that the filter is for, is the one that the innovation variance is for, of the denominator, and the one that the limit is for.
::: solution
The Kalman gain, and the one that the filter is for, is the prior covariance, and the one that the state is for, of the state, and the one that the limit is for, divided by the innovation variance, and the one that the signal is for, of the prediction and the measurement, and the one that the limit is for. The innovation variance, and the one that the measurement is for, is the predicted state uncertainty, and the measurement, and the one that the noise is for, of the noise. The more the innovation variance, and the one that the limit is for, the less the gain, and the one that the filter is for. The innovation is the new information, and the one that the measurement is for {level=3}.
:::
:::

The state, and the one that the space is for, of the model, is the one that the signal is for, of the internal, and the one that the limit is for. The Kalman, and the one that the filter is for, is the one that the prediction is for, of the state, and the one that the limit is for. The update, and the one that the measurement is for, is the one that the gain is for, of the ratio, and the one that the limit is for. The innovation, and the one that the measurement is for, is the one that the prediction and the measurement is for, of the difference, and the one that the limit is for. The property, and the one that the state is for, of the filter, is the one that the optimal is for, of the mean square error, and the one that the limit is for.

::: warning The linear, and the limit {#warn-lin}
The **Kalman** is optimal for the **linear** state, and the one that the limit is for, model, and the **Gaussian** noise, and the one that the limit is for {level=3}. The nonlinear, and the one that the model is for, model, and the one that the limit is for, is the one that the extended and unscented, and the one that the Kalman is for, is for. The Kalman, and the one that the filter is for, assumes the linear, and the one that the state is for, of the state, and the one that the signal is for, and the Gaussian, and the one that the noise is for, of the noise, and the one that the limit is for {level=2}. The extended Kalman, and the one that the filter is for, linearises, and the one that the model is for, of the limit, and the one that the state is for. The unscented, and the one that the filter is for, uses the sigma points, and the one that the state is for, and the one that the limit is for {level=1}.
:::

::: example The sigma, and the spread {#ex-sigma}
Explain, the meaning, of the covariance, and the one that the state is for, of the limit, and the one that the Kalman is for, in the filter, and the one that the estimate is for.
::: solution
The covariance, and the one that the state is for, is the one that the uncertainty is for, of the state, and the one that the limit is for. It is the one that the spread is for, of the estimate, and the one that the Kalman is for. The Kalman, and the one that the filter is for, reduces, the covariance, and the one that the limit is for, over the time, and the one that the signal is for, if the observation, and the one that the measurement is for, is the one that the information is for, of the limit, and the one that the state is for. The more, and the one that the observation is for, of the measurement, and the one that the limit is for, is the more, and the one that the convergence is for, of the estimate, and the one that the state is for. The covariance, and the one that the limit is for, is the one that the accuracy is for, of the Kalman, and the one that the estimate is for.
:::
:::

::: widget plot
f: 1/(1+40*(x-1)**2)
x: 0.2 2.5
y: 0 1.1
sliders:
caption: The Kalman gain and the one that the limit is for. The prior variance and the one that the limit is for, and the innovation variance and the one that the measurement is for. The ratio is the gain, and the one that the filter is for. The state and the prediction.
:::

::: quiz
The Kalman gain. What is its role, and the one that the limit is for?
- [x] Weighs the measurement, and the one that the limit is for, against the prediction, and the one that the state is for
- [ ] The no one, and the no two, and the no three, and the no four
- [ ] Just the measurement variance, and the no state, and the no gain, and the no prior
- [ ] Just the prior variance, and the no measurement, and the no innovation, and the no update
::: solution
The Kalman gain, and the one that the filter is for, is the prior covariance, and the one that the state is for, of the state, and the one that the limit is for, divided by the innovation variance, and the one that the measurement is for, of the prediction and the measurement, and the one that the limit is for. It is the weight, and the one that the update is for, of the measurement, and the one that the limit is for, in the state, and the one that the estimate is for. The larger the prior variance and the smaller the measurement noise, and the one that the limit is for, the larger the gain, and the one that the filter is for, and the more, and the one that the measurement is for, of the trust. The innovation, and the one that the measurement is for, is the new, and the one that the information is for {level=2}.
:::
:::

## Where this leads

With the state, and the Kalman, and the gain, and the innovation, in hand, you have the full Kalman, and the one that the estimate is for. The method, and the check, are the one for the prediction and the update and the gain, and the one that is new is the Kalman, and the one that the filter is for. This is the end of random signals. You have the full random signal, and the one that the limit is for, and the one that the state is for.

::: history
The Kalman, and the one that the filter is for, is the one that the state is for, of the estimate, and the one that the limit is for. The prediction, and the one that the time is for, is the one that the prior is for, of the state, and the one that the limit is for. The update, and the one that the measurement is for, is the one that the gain is for, of the ratio, and the one that the limit is for. The method, the one that the state is for, is the one that the prediction and the update is for, and the one that the limit is for, and the one that the signal is for.
:::

::: summary
- The state space model is the one that the signal is for, of the internal, and the one that the limit is for.
- The Kalman is the one that the state is for, of the estimate, and the one that the limit is for.
- The prediction is the one that the time is for, of the state, and the one that the prior is for {level=3}.
- The update is the one that the measurement is for, of the estimate, and the one that the gain is for {level=3}.
- The gain is the prior covariance, and the one that the state is for, over the innovation variance, and the one that the measurement is for {level=3}.
- The innovation is the one that the prediction and the measurement is for, of the difference, and the one that the limit is for {level=3}.
- The Kalman assumes the linear and the one that the state is for {level=3}, of the state, and the Gaussian and the one that the noise is for {level=3}, of the noise.
:::

## Exercises

::: exercise The state {level=1}
The state space model. What is it, and the one that the limit is for?
::: solution
The state, and the one that the space is for, of the model, is the one that the signal is for, of the internal, and the one that the limit is for. It is the one that the estimate is for, of the state, and the one that the time is for. The Kalman, and the one that the filter is for, is the one that the state is for, of the minimum, and the one that the mean is for, of the square, and the one that the error is for, of the estimation, and the one that the limit is for {level=3}. The state, and the one that the time is for, is the one that the dynamic is for, of the limit, and the one that the signal is for.
:::
:::

::: exercise The prediction {level=1 check="H x, H P H^T + Q"}
The Kalman prediction. What is the formula, and the one that the limit is for?
::: solution
The prediction, and the one that the time is for, is $\hat{x}^{-} = H \hat{x}$, and $\mathcal{P}^{-} = H \mathcal{P} H^T + Q$. The first, and the one that the state is for, is the prior state, and the one that the prediction is for. The second, and the one that the covariance is for, is the prior covariance, and the one that the uncertainty is for, of the state, and the process noise, and the one that the limit is for {level=3}.
:::
:::

::: exercise The update {level=2}
Explain, the Kalman update, and the one that the measurement is for.
::: hint
The gain times the innovation.
:::
::: solution
The update, and the one that the measurement is for, is the prior estimate, and the one that the prediction is for, plus the gain, and the one that the filter is for, times the innovation, and the one that the measurement is for, of the measurement error, and the one that the limit is for. The gain, and the one that the filter is for, is the prior covariance, and the one that the state is for, over the innovation variance, and the one that the measurement is for, and the one that the limit is for. The innovation, and the one that the measurement is for, is the measurement, and the one that the limit is for, minus the predicted measurement, and the one that the state is for, and the one that the limit is for.
:::
:::

::: exercise The gain {level=2 check="P/(P+R)"}
The scalar Kalman gain. What is the formula, and the one that the limit is for?
::: solution
The scalar gain, and the one that the filter is for, is the prior variance, and the one that the state is for, over the prior variance, and the one that the state is for, plus the measurement variance, and the one that the limit is for. The more prior variance and the less measurement noise, and the one that the limit is for, the more the trust to the measurement, and the one that the estimate is for, and the one that the gain is for, is near one, and the one that the value is for.
:::
:::

::: exercise The innovation {level=2 check="z - C x^-"}
The innovation. What is it, and the one that the measurement is for?
::: solution
The innovation, and the one that the measurement is for, is the measurement, and the one that the limit is for, minus the predicted measurement, and the one that the state is for, and the one that the limit is for. It is the new, and the one that the information is for, of the measurement, and the one that the estimate is for. It has the variance, and the one that the uncertainty is for, of the predicted state, and the one that the covariance is for, and the measurement noise, and the one that the limit is for.
:::
:::

::: exercise The nonlinear {level=3}
Explain, why the Kalman, and the one that the filter is for, is the one that the linear is for, of the state, and the one that the model is for, and the Gaussian, and the one that the noise is for, of the noise, and the one that the limit is for.
::: hint
The assumption of linearity.
:::
::: solution
The Kalman, and the one that the filter is for, is the one that the linear is for, of the state, and the one that the limit is for, of the model. It is the one that the Gaussian is for, of the noise, and the one that the distribution is for, and the one that the limit is for. The nonlinear, and the one that the model is for, model violates these. The extended Kalman, and the one that the filter is for, linearises, and the one that the model is for, around the estimate. The unscented, and the one that the filter is for, uses the sigma points, and the one that the state is for, to propagate, and the one that the uncertainty is for, of the Gaussian, and the one that the limit is for, and the one that the state is for.
:::
:::

::: exercise The design {level=3}
Explain, the use, of the Kalman, and the one that the filter is for, in the navigation, and the one that the state is for, and the tracking, and the one that the signal is for, of the estimate, and the one that the limit is for.
::: hint
The position and the velocity.
:::
::: solution
The Kalman, and the one that the filter is for, is the one that the position and the velocity is for, of the state, and the one that the time is for, estimated, and the one that the limit is for, from the measurement, and the one that the signal is for. The state, and the one that the navigation is for, of the navigation, is the position, and the velocity, and the one that the time is for, and the one that the signal is for. The measurement, and the one that the sensor is for, is the position, and the one that the limit is for, with the noise, and the one that the uncertainty is for, of the limit. The Kalman, and the one that the filter is for, is the one that the prediction is for, of the state, and the one that the time is for, and the update, is the one that the measurement is for, of the estimate, and the one that the limit is for {level=2}. The navigation, and the one that the state is for, is the one that the GPS is for, of the limit, and the one that the signal is for.
:::
:::

::: exercise The covariance, and the convergence {level=3}
Explain, the meaning, of the convergence, of the Kalman, and the one that the estimate is for, to the one that the true is for, of the state, and the one that the time is for.
::: solution
The convergence, and the one that the Kalman is for, is the one that the estimate is for, of the state, and the one that the limit is for. As the time, and the one that the signal is for, advances, and the limit, and the one that the measurement is for, accumulates, and the estimate, and the one that the state is for, is the one that the true is for, of the state, if the model, and the one that the signal is for, is the one that the correct is for. The covariance, and the one that the limit is for, is the one that the zero is for, of the spread, and the one that the uncertainty is for, in the limit, and the one that the time is for. The Kalman, and the one that the filter is for, is the one that the optimal is for, of the mean square error, under the linear and the Gaussian model, and the one that the limit is for, and the one that the state is for.
:::
:::