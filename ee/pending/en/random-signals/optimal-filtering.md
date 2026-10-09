The filter, and the one that the signal is for, is the one that the noise is for. The optimal, and the one that the mean is for, of the square, and the one that the error is for, is the one that the Wiener is for, and the one that the limit is for, of the limit, and the one that the signal is for. The LMMSE, and the one that the estimate is for, is the one that the linear is for, of the minimum, and the one that the mean is for. This lesson defines the optimal filter, and the one that the limit is for, and gives the Wiener, and the one that the filter is for, of the limit, and the one that the signal is for, and the LMMSE, and the one that the estimate is for, of the estimate, and the one that the linear is for, and the mean square error, and the one that the limit is for, of the limit, and the one that the signal is for, and the property, and the one that the limit is for, of the filter, and the one that the design is for. The method, and the check, are the one for the Wiener and the LMMSE, and the one that is new is the optimal, and the one that the filter is for. The optimal filter, and the one that the limit is for, is the one that the signal and the design, and the one that the limit is for.

## The optimal filter

The optimal filter, and the one that the limit is for, is the one that the mean is for, of the square, and the one that the error is for. The filter, and the one that the signal is for, is the one that the noise is for, of the reduction, and the one that the limit is for.

::: definition Optimal filter {#def-opt}
The **ptimal** filter, and the one that the limit is for, is the one that the mean, and the one that the square is for, of the square, and the one that the error is for, is for. For the linear, and the one that the filter is for, of the filter, and the one that the limit is for, of the minimum, and the one that the mean is for, it is
$$
h(t) = \text{argmin}\; E\left[\left(s(t)-\sum h(\tau)x(t-\tau)\right)^2\right],
$$
and the one that the optimal is for. The optimal, and the one that the filter is for, is the one that the estimate is for, of the signal, and the one that the limit is for, from the input, and the one that the measurement is for, of the measurement, and the one that the limit is for, that is the minimum, and the one that the mean is for, of the mean, and the one that the square is for, of the error.
:::

The optimal, and the one that the filter is for, is the one that the mean is for, of the square, and the one that the error is for. The Wiener, and the one that the filter is for, is the one that the frequency is for, of the limit, and the one that the signal is for. The two, and the one that the filter is for, are the Wiener and the LMMSE, and the one that the limit is for.

::: theorem Wiener {#thm-wiener}
The **Wiener** filter, and the one that the limit is for, is
$$
H(f) = \frac{S_{xy}(f)}{S_{y}(f)},
$$
and the one that the Wiener is for, where the $S_{xy}$ is the cross, and the one that the power is for, of the spectral, and the one that the density is for, and the $S_y$ is the input, and the one that the power is for, of the spectral, and the one that the density is for. The Wiener, and the one that the filter is for, is the one that the linear is for, of the limit, and the one that the signal is for, that is the minimum, and the one that the mean is for, of the mean, and the one that the square is for, of the mean, and the one that the error is for.
:::

The Wiener, and the one that the filter is for, is the one that the limit is for, of the filter, and the one that the signal is for. The cross, and the one that the power is for, of the spectral, and the one that the density is for, is the one that the signal is for, and the one that the measurement is for, of the limit, and the one that the signal is for. The two, and the one that the filter is for, are the cross and the input, and the one that the power is for.

## The LMMSE and the estimate

The LMMSE, and the one that the estimate is for, is the one that the linear is for, of the minimum, and the one that the mean is for. The estimate, and the one that the limit is for, is the one that the signal is for, from the measurement, and the one that the limit is for.

::: proposition LMMSE {#prop-lmmse}
The **LMMSE**, and the one that the estimate is for, is
$$
\hat{s} = \frac{\mathrm{Cov}(s,y)}{\mathrm{Var}(y)}\, (y - E[y]) + E[s],
$$
and the one that the LMMSE is for. It is the one that the estimate is for, of the signal, and the one that the limit is for, from the measurement, and the one that the limit is for, of the measurement, and the one that the signal is for. The LMMSE, and the one that the estimate is for, is the one that the minimum is for, of the mean, and the one that the square is for, of the mean, and the one that the square is for, of the error, and the one that the limit is for.
:::

The LMMSE, and the one that the estimate is for, is the one that the estimate is for, of the limit, and the one that the signal is for. The Wiener, and the one that the filter is for, is the one that the frequency is for, of the limit, and the one that the signal is for. The two, and the one that the limit is for, are the LMMSE and the Wiener, and the one that the estimate is for.

::: example The LMMSE, and the estimate {#ex-lmmse}
The signal has the variance and the one that the signal is for, of the one point, and the one that the value is for. The measurement, and the one that the limit is for, has the variance and the one that the limit is for, of the four point, and the one that the value is for. The covariance, and the one that the signal and the measurement is for, is the one point, and the one that the value is for. What is the coefficient, and the one that the estimate is for, of the estimate, and the one that the LMMSE is for?
::: solution
The coefficient, and the one that the estimate is for, of the LMMSE, and the one that the limit is for, is the covariance, and the one that the signal and the measurement is for, of the covariance, and the one that the limit is for, over the variance, and the one that the measurement is for, of the measurement. It is the one point, and the one that the value is for, over the four point, and the one that the value is for, and the zero point, and the two five, and the one that the value is for, of the zero point, and the two five, and the one that the coefficient is for. So the estimate, and the one that the LMMSE is for, is the zero point, and the two five, and the one that the value is for, of the zero point, and the two five, and the one that the factor is for, times the measurement, and the one that the limit is for, plus the mean, and the one that the expectation is for, of the signal, and the one that the limit is for. The more, and the one that the correlation is for, of the covariance, and the one that the limit is for, relative to the variance, and the one that the measurement is for, is the more, and the one that the weight is for, of the measurement, and the one that the estimate is for.
:::
:::

::: example The Wiener, and the response {#ex-win}
The signal and the measurement have the cross spectral, and the one that the power is for, and the one that the density is for, of the one point, and the one that the value is for. The input spectral, and the one that the measurement is for, and the one that the density is for, is the four point, and the one that the value is for. What is the filter response, and the one that the limit is for?
::: solution
The Wiener response, and the one that the limit is for, is the cross, and the one that the power is for, of the power, and the one that the density is for, over the input, and the one that the power is for, of the power, and the one that the density is for. It is the one point, and the one that the value is for, over the four point, and the one that the value is for, and the zero point, and the two five, and the one that the value is for, of the zero point, and the two five, and the one that the response is for. The less, and the one that the response is for, of the filter, and the one that the limit is for, is the one that the noise is for, of the attenuation, and the one that the signal is for. The filter, and the one that the limit is for, is the one that the noise is for, when the response, and the one that the limit is for, is the small, and the one that the value is for, of the response.
:::
:::

## The mean square error and the limit

The mean square error, and the one that the limit is for, is the one that the performance is for, of the filter, and the one that the limit is for. The minimum, and the one that the mean is for, of the square, and the one that the error is for, is the one that the Wiener is for, and the one that the limit is for, of the limit, and the one that the signal is for.

::: proposition MMSE bound {#prop-mmse}
The **bound** of the mean square error, and the one that the limit is for, is
$$
\mathrm{MSE}_{\min} = \sigma_s^2 - \frac{|\mathrm{Cov}(s,y)|^2}{\mathrm{Var}(y)}.
$$
and the one that the limit is for. The minimum, and the one that the mean is for, of the square, and the one that the error is for, is the one that the variance is for, of the signal, and the one that the limit is for, minus the fraction, and the one that the correlation is for, of the squared covariance, and the one that the limit is for, over the variance, and the one that the measurement is for, of the measurement. The bound, and the one that the limit is for, is the one that the Wiener is for, of the Wiener, and the one that the limit is for.
:::

The mean square error, and the one that the limit is for, is the one that the performance is for, of the filter, and the one that the limit is for. The bound, and the one that the Wiener is for, is the one that the limit is for, of the limit, and the one that the signal is for. The two, and the one that the limit is for, are the mean square error and the bound, and the one that the estimate is for.

::: example The coefficient, and the noise {#ex-coef}
The measurement variance, and the one that the limit is for, is the large, and the one that the value is for, of the value. What happens, to the Wiener response, and the one that the limit is for, of the response, and the one that the filter is for?
::: solution
The coefficient, and the one that the estimate is for, of the LMMSE, and the one that the limit is for, is the covariance, and the one that the signal and the measurement is for, over the variance, and the one that the measurement is for, of the measurement, and the one that the limit is for. If the measurement variance, and the one that the limit is for, is the large, and the one that the value is for, of the value, and the one that the signal is for, of the noise, and the one that the limit is for, the coefficient, and the one that the estimate is for, of the coefficient, and the one that the limit is for, is the small, and the one that the value is for, of the value. The estimate, and the one that the LMMSE is for, is the one that the prior mean is for, of the mean, and the one that the statistics is for, when the measurement, and the one that the limit is for, is the poor, and the one that the signal is for. So the more, and the one that the noise is for, of the measurement, and the one that the limit is for, is the more, and the one that the prior is for, of the prior, and the one that the mean is for, is for.
:::
:::

::: example The bound, and the correlation {#ex-bound}
Explain, why the mean square error, and the one that the limit is for, is the one that the correlation is for, of the signal and the measurement, and the one that the limit is for.
::: solution
The mean square error, and the one that the limit is for, of the limit, and the one that the signal is for, is the variance, and the one that the signal is for, of the signal, and the one that the limit is for, minus the fraction, and the one that the correlation is for, of the squared covariance, and the one that the limit is for. The more, and the one that the correlation is for, of the signal and the measurement, and the one that the limit is for, is the less, and the one that the error is for, of the mean square error, and the one that the limit is for. The bound, and the one that the Wiener is for, is the one that the Wiener is for, of the limit, and the one that the signal is for. The design, and the one that the filter is for, is the one that the correlation is for, of the signal and the measurement, and the one that the limit is for, and the one that the design is for.
:::
:::

The optimal filter, and the one that the limit is for, is the one that the mean is for, of the square, and the one that the error is for. The Wiener, and the one that the frequency is for, is the one that the cross is for, of the power, and the one that the density is for. The LMMSE, and the one that the estimate is for, is the one that the covariance is for, of the signal and the measurement, and the one that the limit is for. The mean square error, and the one that the limit is for, is the one that the performance is for, of the filter, and the one that the limit is for. The design, and the one that the filter is for, is the one that the correlation is for, of the signal and the measurement, and the one that the limit is for.

::: warning The prior, and the limit {#warn-prior}
The LMMSE, and the one that the estimate is for, of the limit, and the one that the signal is for, uses the prior, and the one that the variance is for, of the variance, and the one that the mean is for, and the one that the statistics is for. The Bayesian, and the one that the estimate is for, of the estimate, and the one that the limit is for, is the one that the prior is for, of the limit, and the one that the signal is for. The two, and the one that the estimate is for, are the LMMSE and the Bayesian, and the one that the prior is for. The design, and the one that the limit is for, is the one that the prior is for, if the statistics, and the one that the limit is for, is the one that the known is for.
:::

::: widget plot
f: 1/(1+20*(x-1)**2)
x: 0.2 3
y: 0 1.1
sliders:
caption: The Wiener filter magnitude, and the one that the signal is for. The more, and the one that the correlation is for, of the cross and the one that the power is for, is the more, and the one that the filter is for, of the gain, and the one that the limit is for. The LMMSE and the one that the estimate is for, is the one that the covariance is for, of the limit, and the one that the signal is for.
:::

::: quiz
The Wiener filter. What is the formula, and the one that the limit is for?
- [x] The cross PSD, and the input PSD, and the one that the density is for, as a ratio
- [ ] The no one, and the one point, and the no two, and the one point
- [ ] The input PSD, and the cross PSD, and the one that the ratio is for, inverted
- [ ] The no two, and the one point, and the no one, and the one point
::: solution
The Wiener, and the one that the filter is for, is the cross and the one that the power is for, spectral and the one that the density is for, divided by the input and the one that the power is for, spectral and the one that the density is for. The cross, and the one that the signal and the measurement is for, is the one that the correlation is for. The input, and the one that the measurement is for, is the one that the power is for. The ratio, and the one that the signal is for, is the one that the optimal is for, of the limit, and the one that the signal is for, and the one that the frequency is for.
:::
:::

## Where this leads

With the Wiener, and the LMMSE, and the mean square error, and the bound, and the one that the limit is for, in hand, you have the full optimal filtering, and the one that the limit is for. The method, and the check, are the one for the Wiener and the LMMSE, and the one that is new is the optimal, and the one that the filter is for. In the next lesson, you meet the Kalman filter, and the one that the state is for, of the estimate, and the one that the prediction is for, and the same algebra, and the limit and the design and the check, are the ones you already have.

::: history
The Wiener, and the one that the filter is for, is the one that the optimal is for, of the limit, and the one that the signal is for. The LMMSE, and the one that the estimate is for, is the one that the minimum is for, of the mean, and the one that the square is for, of the mean, and the one that the error is for. The method, the one that the limit is for, is the one that the Wiener and the LMMSE is for, and the one that the limit is for, and the one that the design is for.
:::

::: summary
- The optimal filter is the one that the mean is for, of the square, and the one that the error is for.
- The Wiener filter is the cross and the one that the power is for, spectral and the one that the density is for, over the input, and the one that the power is for, and the one that the limit is for.
- The LMMSE is the covariance, and the one that the signal and the measurement is for, over the variance, and the one that the measurement is for, of the measurement.
- The mean square error, and the one that the limit is for, is the variance, and the one that the signal is for, minus the fraction, and the one that the correlation is for, of the squared covariance, and the one that the limit is for.
- The more, and the one that the correlation is for, of the signal and the measurement, and the one that the limit is for, is the less, and the one that the error is for, of the mean square error, and the one that the limit is for.
- The LMMSE uses the prior, and the one that the variance is for, of the mean, and the one that the statistics is for.
- The design, and the one that the filter is for, is the one that the correlation is for, of the signal and the measurement, and the one that the limit is for.
:::

## Exercises

::: exercise The optimal {level=1}
The optimal filter. What does it, and the one that the limit is for, minimize, and the one that the limit is for?
::: solution
The optimal filter, and the one that the limit is for, of the filter, and the one that the signal is for, minimizes, and the one that the mean is for, of the mean, and the one that the square is for, of the square, and the one that the error is for, of the error. It is the one that the estimate is for, of the signal, and the one that the limit is for, from the measurement, and the one that the limit is for, of the measurement. The linear LMMSE, and the one that the estimate is for, of the limit, and the one that the signal is for, is the one that the Wiener, and the one that the filter is for, is for.
:::
:::

::: exercise The Wiener {level=1 check="Sxy/Sy"}
The Wiener filter. What is the formula, and the one that the limit is for?
::: solution
The Wiener, and the one that the filter is for, is the cross, and the one that the power is for, of the power, and the one that the spectral is for, divided by the input, and the one that the power is for, of the power, and the one that the spectral is for. The cross, and the one that the signal and the measurement is for, is the one that the correlation is for. The ratio, and the one that the frequency is for, is the one that the optimal is for, of the limit, and the one that the signal is for, and the one that the limit is for.
:::
:::

::: exercise The LMMSE {level=2}
Explain, the LMMSE, and the one that the estimate is for, of the limit, and the one that the signal is for.
::: hint
The covariance over the variance.
:::
::: solution
The LMMSE, and the one that the estimate is for, is the covariance, and the one that the signal and the measurement is for, of the covariance, and the one that the limit is for, divided by the variance, and the one that the measurement is for, of the measurement, and the one that the limit is for. It is the one that the weighted is for, of the measurement, and the one that the limit is for, plus the prior mean, and the one that the expectation is for, of the signal, and the one that the limit is for. The more, and the one that the correlation is for, of the covariance, and the one that the limit is for, relative to the variance, and the one that the measurement is for, is the more, and the one that the weight is for, of the measurement, and the one that the estimate is for.
:::
:::

::: exercise The bound {level=2 check="sigma_s^2 - C^2/V"}
The mean square error bound. What is it, and the one that the limit is for?
::: solution
The mean square error bound, and the one that the limit is for, is the variance, and the one that the signal is for, of the variance, and the one that the signal is for, minus the fraction, and the one that the correlation is for, of the squared covariance, and the one that the limit is for, divided by the variance, and the one that the measurement is for, of the variance, and the one that the measurement is for. The bound, and the one that the limit is for, is the one that the Wiener is for, of the limit, and the one that the signal is for, and the one that the filter is for.
:::
:::

::: exercise The prior {level=3}
Explain, the role, of the prior, and the one that the variance is for, in the LMMSE, and the one that the estimate is for.
::: hint
The mean and the variance of the signal.
:::
::: solution
The LMMSE, and the one that the estimate is for, of the limit, and the one that the signal is for, uses the prior statistics, and the one that the limit is for, of the signal, and the one that the limit is for. It uses the mean, and the one that the expectation is for, of the signal, and the one that the limit is for, and the variance, and the one that the limit is for, of the signal, and the one that the limit is for. The more, and the one that the prior is for, of the knowledge, and the one that the statistics is for, is the more, and the one that the estimate is for, of the accuracy, and the one that the limit is for. The Bayesian, and the one that the estimate is for, is the one that the prior is for, of the limit, and the one that the signal is for.
:::
:::

::: exercise The design {level=3}
Explain, the design, of the filter, and the one that the signal is for, for the one, and the one that the limit is for, of the signal, and the one that the noise is for.
::: hint
The cross PSD and the correlation.
:::
::: solution
The design, and the one that the filter is for, of the filter, and the one that the signal is for, is the one that the correlation is for, of the signal and the measurement, and the one that the limit is for. The cross, and the one that the power is for, of the power, and the one that the spectral is for, is the one that the signal is for, of the limit, and the one that the measurement is for. The Wiener, and the one that the filter is for, is the cross, and the one that the power is for, divided by the input, and the one that the power is for, of the input, and the one that the power is for. The more, and the one that the correlation is for, of the signal and the measurement, and the one that the limit is for, is the less, and the one that the error is for, of the mean square error, and the one that the limit is for.
:::
:::

::: exercise The Wiener, and the LMMSE {level=3}
Explain, the relation, between the Wiener, and the one that the filter is for, and the LMMSE, and the one that the estimate is for.
::: hint
Both minimize the MSE.
:::
::: solution
The Wiener, and the one that the filter is for, and the LMMSE, and the one that the estimate is for, both minimize, and the one that the mean is for, of the mean, and the one that the square is for, of the square, and the one that the error is for, of the error. The Wiener is the one that the frequency is for, of the frequency domain, and the one that the signal is for. The LMMSE is the one that the time is for, of the time domain, and the one that the signal is for. The two, and the one that the limit is for, are the frequency and the time, and the one that the limit is for, and the one that the estimate is for, of the estimate. The method, and the one that the limit is for, is the one that the minimum is for, of the mean, and the one that the square is for, of the mean, and the one that the error is for.
:::
:::

::: exercise The noise, and the response {level=3}
Explain, why the Wiener, and the one that the filter is for, of the response, and the one that the limit is for, is the small, and the one that the value is for, of the response, and the one that the limit is for, when the noise, and the one that the limit is for, is the large, and the one that the value is for.
::: solution
The Wiener, and the one that the filter is for, is the cross, and the one that the power is for, of the power, and the one that the density is for, over the input, and the one that the power is for, of the power, and the one that the density is for. If the noise, and the one that the limit is for, is the large, and the one that the value is for, of the value, the input power, and the one that the signal is for, spectral, and the one that the density is for, is the large, and the one that the value is for. So the response, and the one that the limit is for, is the cross, and the one that the power is for, over the large, and the one that the value is for, of the input, and the one that the power is for, and the one that the limit is for, and the one that the value is for, of the small, and the one that the response is for. The filter, and the one that the limit is for, is the one that the noise is for, of the attenuation, and the one that the signal is for. The design, and the one that the filter is for, is the one that the noise is for, of the limit, and the one that the signal is for.
:::
:::