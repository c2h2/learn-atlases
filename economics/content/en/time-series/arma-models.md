A weakly stationary series has a mean and an autocovariance function, but $\gamma_k$ is an infinite list of numbers. For forecasting, and for saying anything out of sample, we need a **parametric** model with a short memory: a handful of coefficients that generate the whole ACF. Autoregressive (AR), moving-average (MA) and mixed ARMA processes are that family. They are the linear difference equations of [[mathematical-economics/difference-and-differential-equations]] driven by white noise, and they are the parametric form of Wold's representation from [[time-series/stationarity]].

This chapter derives the stationarity and invertibility conditions, matches the theoretical ACF and PACF to the sample pictures used for identification, and estimates the parameters by OLS, Yule–Walker and (Gaussian) maximum likelihood. Box and Jenkins organised the same steps into a cycle — identify, estimate, check — that remains the practical default for a single stationary series. Simulated paths below are drawn from known ARMA processes with fixed NumPy seeds, so the numbers in the text can be reproduced. They are not data on any market, and nothing in the chapter is a forecast of a real series or investment advice.

## Autoregressions

The AR(1) of [[time-series/stationarity#prop-ar1-acf]] extends immediately.

::: definition AR($p$) {#def-ar}
The process $\{Y_t\}$ is **autoregressive of order $p$**, written AR($p$), if

$$
Y_t = c + \phi_1 Y_{t-1} + \cdots + \phi_p Y_{t-p} + \varepsilon_t, \qquad \varepsilon_t \sim \mathrm{WN}(0,\sigma^2).
$$ {#eq-ar}

In lag-operator form, $\phi(L)(Y_t - \mu) = \varepsilon_t$ where $\phi(z) = 1 - \phi_1 z - \cdots - \phi_p z^p$ and $\mu = c/\phi(1)$ when $\phi(1) \neq 0$. The process is **causal** (a function of current and past $\varepsilon$ only) if every root of $\phi(z) = 0$ satisfies $|z| > 1$.
:::

Causality is the natural condition for a series that is generated forwards in time. For $p = 1$ it is exactly $|\phi_1| < 1$. For $p = 2$ it is equivalent to the triangle of inequalities

$$
|\phi_2| < 1, \qquad \phi_1 + \phi_2 < 1, \qquad \phi_2 - \phi_1 < 1.
$$ {#eq-ar2-tri}

A root on the unit circle is a unit root, treated in [[time-series/unit-roots]]; a root inside the unit circle makes the process explosive as $t$ increases.

::: proposition Stationary AR($p$): moments {#prop-ar-moments}
If $\phi(z) \neq 0$ for all $|z| \le 1$, then [[#eq-ar]] has a unique weakly stationary solution $Y_t - \mu = \sum_{j=0}^{\infty}\psi_j \varepsilon_{t-j}$ with $\psi(z) = 1/\phi(z)$ for $|z|\le 1$, $\mu = c/\phi(1)$, and autocovariances obeying the **Yule–Walker equations**

$$
\gamma_k = \phi_1 \gamma_{k-1} + \cdots + \phi_p \gamma_{k-p}, \qquad k \ge 1,
$$ {#eq-yw}

with a different (inhomogeneous) equation at $k = 0$ that involves $\sigma^2$. In particular the ACF of a causal AR($p$) is a mixture of geometric terms $\phi^k$ (and damped sinusoids, if some roots are complex), so $\rho_k$ decays exponentially and the PACF cuts off after lag $p$: $\phi_{kk} = 0$ for $k > p$.
:::

::: proof
The Laurent expansion $1/\phi(z) = \sum_{j=0}^{\infty}\psi_j z^j$ converges on a disc containing the unit circle because the zeros of $\phi$ lie outside it. Substituting $Y_t - \mu = \psi(L)\varepsilon_t$ into [[#eq-ar]] confirms it is a solution; uniqueness in the class of finite-variance stationary processes follows from Wold's theorem. For $k \ge 1$, multiply [[#eq-ar]] (demeaned) by $Y_{t-k}$ and take expectations: $\E[\varepsilon_t Y_{t-k}] = 0$ by causality, which is [[#eq-yw]]. The PACF claim is the Yule–Walker system at lag $k > p$: the unique solution for the last coefficient is zero because the previous $p$ coefficients already satisfy the recurrence.
:::

::: example An AR(2) triangle {#ex-ar2}
Is $Y_t = 0.6 Y_{t-1} + 0.2 Y_{t-2} + \varepsilon_t$ causal? What about $Y_t = 1.1 Y_{t-1} - 0.3 Y_{t-2} + \varepsilon_t$? Compute the roots of $\phi(z)$ in the second case.
::: solution
For $(\phi_1,\phi_2) = (0.6, 0.2)$: $|\phi_2| = 0.2 < 1$, $\phi_1+\phi_2 = 0.8 < 1$, $\phi_2-\phi_1 = -0.4 < 1$. All three inequalities in [[#eq-ar2-tri]] hold, so the process is causal (and weakly stationary). For $(1.1, -0.3)$: $|-0.3|<1$, $1.1-0.3 = 0.8 < 1$, $-0.3-1.1 = -1.4 < 1$. The triangle is satisfied. The polynomial is $\phi(z) = 1 - 1.1z + 0.3z^2$. The roots of $0.3z^2 - 1.1z + 1 = 0$ are $z = 2$ and $z = 5/3 \approx 1.667$, both outside the unit circle, confirming causality. (The product of the roots is $1/0.3$ wait — actually $\phi(z) = 0.3(z-2)(z-5/3)$ would have constant term $0.3\cdot 2\cdot 5/3 = 1$, matching the constant term of $\phi$ written as $0.3z^2 - 1.1z + 1$.)
:::
:::

The Yule–Walker equations give a practical identification clue: if the sample PACF is large at lags $1,\ldots,p$ and small thereafter, an AR($p$) is a candidate. For the simulated AR(1) of [[time-series/stationarity#ex-ar1-sim]] (seed $7$, $T = 200$), Durbin–Levinson on the sample ACF produces

$$
\hat\phi_{11} = 0.675,\qquad \hat\phi_{22} = 0.030,\qquad \hat\phi_{33} = 0.054,
$$

which is the textbook AR(1) signature — a single large partial autocorrelation, then noise around zero. The same series' sample ACF decays geometrically, which is the AR(1) ACF signature.

## Moving averages

An MA process is a finite Wold representation: $Y_t$ is a short linear combination of current and past shocks.

::: definition MA($q$) {#def-ma}
The process $\{Y_t\}$ is **moving-average of order $q$** if

$$
Y_t = \mu + \varepsilon_t + \theta_1 \varepsilon_{t-1} + \cdots + \theta_q \varepsilon_{t-q}, \qquad \varepsilon_t \sim \mathrm{WN}(0,\sigma^2).
$$ {#eq-ma}

In operator form, $Y_t - \mu = \theta(L)\varepsilon_t$ with $\theta(z) = 1 + \theta_1 z + \cdots + \theta_q z^q$. The process is **invertible** if every root of $\theta(z) = 0$ satisfies $|z| > 1$, in which case $\varepsilon_t$ can be recovered as an infinite AR in the $Y$'s.
:::

Every MA($q$) is weakly stationary, with no restriction on the $\theta_j$: it is a finite sum of white noise. Invertibility is a different requirement, imposed so that two MA processes with the same ACF can be distinguished and so that the one-step shock $\varepsilon_t$ is a function of current and past $Y$.

::: proposition ACF of an MA($q$) {#prop-ma-acf}
For [[#eq-ma]], $\gamma_0 = \sigma^2\sum_{j=0}^{q}\theta_j^2$ (with $\theta_0 = 1$), $\gamma_k = \sigma^2\sum_{j=0}^{q-k}\theta_j\theta_{j+k}$ for $1 \le k \le q$, and $\gamma_k = 0$ for $k > q$. Thus the ACF **cuts off** after lag $q$: $\rho_k = 0$ for $|k| > q$. For the MA(1) $Y_t = \mu + \varepsilon_t + \theta\varepsilon_{t-1}$,

$$
\rho_1 = \frac{\theta}{1+\theta^2}, \qquad \rho_k = 0 \ (k > 1),
$$

and $|\rho_1| \le 1/2$, with equality at $|\theta| = 1$.
:::

::: proof
Expand $\E[(Y_t-\mu)(Y_{t-k}-\mu)]$ using orthogonality of the $\varepsilon$'s at different dates. Only products $\varepsilon_{t-j}\varepsilon_{t-k-\ell}$ with $j = k+\ell$ survive, and $j$ runs from $0$ to $q$ with $k+\ell \le q$. For $k > q$ there is no overlap. For MA(1), $\gamma_0 = \sigma^2(1+\theta^2)$, $\gamma_1 = \sigma^2\theta$, and $|\theta|/(1+\theta^2)$ is maximised at $|\theta|=1$ with value $1/2$.
:::

The cutoff of the ACF at lag $q$ is the identification signature of an MA($q$), dual to the PACF cutoff of an AR($p$).

::: example MA(1), seed 13 {#ex-ma1}
An MA(1) of length $300$ was drawn from $Y_t = \varepsilon_t + 0.5\varepsilon_{t-1}$, $\varepsilon_t \iid \Normal(0,1)$, NumPy seed $13$. The sample mean is $-0.070$ and the sample variance is $1.062$ (theoretical $\gamma_0 = 1.25$). The sample ACF at lags $1$ through $5$ is

$$
0.304,\ -0.125,\ 0.025,\ 0.015,\ -0.042.
$$

Compare these with [[#prop-ma-acf]]. Why can $\theta = 2$ not be distinguished from $\theta = 0.5$ by the ACF alone, and which value is invertible?
::: solution
Theoretical $\rho_1 = 0.5/(1+0.25) = 0.4$ and $\rho_k = 0$ for $k > 1$. The sample $\hat\rho_1 = 0.304$ is below $0.4$ (sampling variation at $T = 299$ effective observations) but is the only lag of comparable size; lags $2$–$5$ are consistent with the Bartlett band $\pm 1.96/\sqrt{299} \approx \pm 0.113$, except that $\hat\rho_2 = -0.125$ is a borderline miss. The map $\theta \mapsto \theta/(1+\theta^2)$ takes the same value at $\theta$ and at $1/\theta$: $\rho_1(\theta=2) = 2/(1+4) = 0.4$ as well. The invertible root is $|\theta|<1$, so $\theta = 0.5$ is the invertible choice and $\theta = 2$ is not. Estimation that maximises a Gaussian likelihood over invertible MA processes will pick a value near $0.5$, not near $2$.
:::
:::

::: warning Invertibility is not stationarity
An MA process is always stationary. Invertibility is about recovering $\varepsilon_t$ from present and past $Y$, not about whether second moments exist. Conversely, an AR process with a unit root is not stationary, even though it can be written as an MA($\infty$) with coefficients that do not decay. Mixing the two words is a common slip in applied write-ups.
:::

::: widget plot
f: theta/(1+theta^2)
x: -3, 3
y: -0.6, 0.6
hlines: 0.5; -0.5
vlines: -1; 1
labels: \rho_1(\theta)
caption: The MA(1) lag-1 autocorrelation $\rho_1 = \theta/(1+\theta^2)$ as a function of $\theta$. It never exceeds $1/2$ in absolute value, and each interior value (other than $0$) is attained twice, at $\theta$ and $1/\theta$. Invertibility keeps $|\theta|<1$, the region between the vertical lines, which selects one of the two twins.
:::

## ARMA processes

Mixing a finite AR with a finite MA gives a model that can match a slowly decaying ACF (the AR part) and a short extra wiggle at the first few lags (the MA part) without a large $p$ or $q$.

::: definition ARMA($p,q$) {#def-arma}
The process $\{Y_t\}$ is **ARMA($p,q$)** if

$$
Y_t - \mu = \phi_1 (Y_{t-1}-\mu) + \cdots + \phi_p (Y_{t-p}-\mu) + \varepsilon_t + \theta_1 \varepsilon_{t-1} + \cdots + \theta_q \varepsilon_{t-q},
$$ {#eq-arma}

with $\varepsilon_t \sim \mathrm{WN}(0,\sigma^2)$. Equivalently $\phi(L)(Y_t-\mu) = \theta(L)\varepsilon_t$. The process is causal if the roots of $\phi$ lie outside the unit circle, and invertible if the roots of $\theta$ do. We always assume $\phi$ and $\theta$ have no common roots (no **redundancy**): otherwise a factor can be cancelled and the orders overstated.
:::

::: proposition ACF of a causal ARMA($p,q$) {#prop-arma-acf}
For a causal ARMA($p,q$), the autocovariances satisfy the AR recurrence $\gamma_k = \phi_1\gamma_{k-1}+\cdots+\phi_p\gamma_{k-p}$ for all $k > q$, while the first $q$ lags also involve the MA coefficients. Consequently the ACF decays geometrically after lag $q$, and neither the ACF nor the PACF cuts off (except in the pure AR and pure MA special cases). For the ARMA(1,1)

$$
Y_t - \mu = \phi (Y_{t-1}-\mu) + \varepsilon_t + \theta \varepsilon_{t-1}, \qquad |\phi|<1,
$$

one has

$$
\gamma_0 = \sigma^2\frac{1+2\phi\theta+\theta^2}{1-\phi^2}, \qquad \rho_1 = \frac{(1+\phi\theta)(\phi+\theta)}{1+2\phi\theta+\theta^2}, \qquad \rho_k = \phi\,\rho_{k-1}\ (k\ge 2).
$$
:::

::: proof
Write $Y_t - \mu = \psi(L)\varepsilon_t$ with $\psi(z) = \theta(z)/\phi(z) = \sum_{j=0}^{\infty}\psi_j z^j$. Then [[time-series/stationarity#eq-wold-gamma]] gives every $\gamma_k$. For $k > q$, multiply the demeaned [[#eq-arma]] by $Y_{t-k}$ and take expectations: $\E[\varepsilon_{t-j} Y_{t-k}] = 0$ for $j = 0,\ldots,q$ because $k > q$ and causality. That is the AR recurrence. The ARMA(1,1) formulae are the $k = 0,1$ cases of the same expansion, followed by $\rho_k = \phi\rho_{k-1}$ for $k\ge 2$.
:::

::: example ARMA(1,1), seed 17 {#ex-arma11}
A series of length $400$ was drawn from $Y_t = 0.6 Y_{t-1} + \varepsilon_t + 0.4\varepsilon_{t-1}$, $\varepsilon_t \iid \Normal(0,1)$, seed $17$, and the first $50$ observations were dropped, leaving $T = 350$. Theoretical values are $\gamma_0 = 2.5625$ and

$$
\rho_k = 0.756 \times 0.6^{k-1} \quad (k \ge 1),
$$

so $\rho_1 = 0.756$, $\rho_2 = 0.454$, $\rho_3 = 0.272$, $\rho_4 = 0.163$. The sample mean is $-0.027$, the sample variance is $2.252$, and the sample ACF is

$$
0.734,\ 0.451,\ 0.335,\ 0.274,\ 0.178,\ 0.080,\ 0.057,\ 0.061.
$$

Is this closer to an AR(1) or to an MA(1)?
::: solution
An MA(1) is ruled out immediately: $\hat\rho_k$ is still $0.33$ at lag $3$, far outside a white-noise band of width $1.96/\sqrt{350} \approx 0.105$, whereas an MA(1) has $\rho_k = 0$ for $k>1$. An AR(1) with $\phi \approx 0.73$ would have $\rho_2 \approx 0.73^2 = 0.53$, but the sample $\hat\rho_2 = 0.451$ is closer to the ARMA(1,1) value $0.454$ than to $0.53$. The whole path of $\hat\rho_k$ tracks $0.756 \times 0.6^{k-1}$ reasonably at the first four lags. Identification from the ACF/PACF pair is always noisy at this sample size; information criteria in the next section give a complementary vote.
:::
:::

::: widget plot
f: ((1+phi*theta)*(phi+theta))/(1+2*phi*theta+theta*theta) * phi^(x-1)
sliders: phi=0.6:0.05:0.9:0.05; theta=0.4:-0.8:0.8:0.05
x: 1, 12
y: -0.4, 1
labels: \rho_x
caption: Theoretical ACF of a causal ARMA(1,1) for $x \ge 1$. The decay rate is $\phi$; $\theta$ mainly tilts $\rho_1$. Set $\theta = 0$ to recover the AR(1) geometric $\phi^{x}$. Set $\phi$ near $0$ and $\theta$ near $0.8$ to see a large $\rho_1$ and a near-cutoff thereafter, the MA(1) picture.
:::

::: quiz
An unidentified applied worker reports “I fitted ARMA(2,2); the AR polynomial and the MA polynomial share a root at $z = 1.4$”. What has gone wrong?
- [ ] The process is not stationary, because $1.4 > 1$
- [x] The common root can be cancelled: the same ACF is generated by an ARMA(1,1). The model is not identified
- [ ] The process is not invertible
- [ ] Maximum likelihood cannot be computed when a root exceeds $1$
::: solution
A common root of $\phi$ and $\theta$ cancels in $\psi(z) = \theta(z)/\phi(z)$, so the Wold coefficients — and therefore every second-moment property — match a lower-order ARMA. The extra parameters are not identified from the ACF. Roots *outside* the unit circle are exactly what causality and invertibility *want*; the number $1.4$ is not itself a problem. Likelihoods can be computed; they will be flat along the redundant direction.
:::
:::

## Identification, estimation, checking

Box and Jenkins (1970) organised the practical work into three steps. The cycle is not a theorem; it is a disciplined way of matching [[#def-arma]] to a sample.

**Identify.** Look at the sample ACF and PACF, after any transformation that has made stationarity plausible (a logarithm, a difference, a seasonal difference). An AR($p$) candidate has a PACF that cuts off after $p$ and an ACF that decays; an MA($q$) candidate has the reverse; an ARMA($p,q$) has neither cutoff. Seasonal spikes at lag $s$ (12 for monthly data) suggest seasonal AR or MA terms. Overfitting a high-order AR is always possible; parsimony is part of identification because redundant ARMA factors are not identified.

**Estimate.** For a pure AR, OLS (or the Yule–Walker estimator that replaces $\gamma_k$ by $\hat\gamma_k$ in [[#eq-yw]]) is consistent, asymptotically normal, and differs from Gaussian MLE by $O_p(T^{-1})$. For models with an MA part, the likelihood is a nonlinear function of $\theta$; it is maximised numerically, usually after writing the Gaussian likelihood via the Kalman filter or via conditional least squares. Under causality, invertibility, no common roots, and i.i.d. innovations with finite fourth moments, the MLE is consistent and $\sqrt{T}$-asymptotically normal at the usual information-matrix variance, even if the innovations are not Gaussian (quasi-maximum likelihood).

**Check.** Residuals $\hat\varepsilon_t$ should look like white noise: sample ACF inside the Bartlett band, Ljung–Box $Q(h)$ not rejecting with $h-p-q$ degrees of freedom, no remaining seasonal spike. A leftover spike at lag 1 in the residual ACF is a sign that $q$ is too small; a leftover PACF spike is a sign that $p$ is too small. Overfitting shows up as a coefficient whose confidence interval covers zero and as a likelihood that barely moves.

::: definition AIC and BIC {#def-aic}
For a model with $k$ estimated parameters (including the variance) and Gaussian log-likelihood $\ell$, or equivalently with residual variance $\hat\sigma^2$ computed from $n$ effective observations,

$$
\mathrm{AIC} = n\log\hat\sigma^2 + 2k, \qquad \mathrm{BIC} = n\log\hat\sigma^2 + k\log n.
$$

(An additive constant $n\log(2\pi)+n$ that does not change rankings is omitted.) Smaller is better. BIC penalises $k$ more heavily once $n > e^2 \approx 7.4$, and is consistent for the true order if the true process is a finite ARMA; AIC is not consistent, but it is asymptotically efficient for one-step forecast MSE when the truth is not finite-order.
:::

The distinction — consistent order selection versus efficient forecasting — is due to Shibata (1980) and to Schwarz (1978) for BIC. In samples of a few hundred observations the two criteria often agree on low-order models and disagree once extra lags buy only a small drop in $\hat\sigma^2$.

::: example OLS, AIC and BIC on an AR(1), seed 7 {#ex-select}
On the simulated AR(1) of [[time-series/stationarity#ex-ar1-sim]] ($T = 200$ after burn-in), OLS regressions of $y_t$ on a constant and $p$ lags, $p = 1,2,3,4$, produce

| $p$ | $\hat\phi_1$ | extra lags | $\hat\sigma^2$ | AIC | BIC |
|---|---|---|---|---|---|
| $1$ | $0.679$ | — | $0.8485$ | $-30.70$ | $-24.11$ |
| $2$ | $0.658$ | $\hat\phi_2 = 0.028$ | $0.8561$ | $-27.80$ | $-17.93$ |
| $3$ | $0.656$ | $\hat\phi_3 = 0.056$ | $0.8621$ | $-25.27$ | $-12.13$ |
| $4$ | $0.656$ | $\hat\phi_4 = -0.007$ | $0.8708$ | $-22.18$ | $-5.79$ |

(The effective sample shrinks by one observation per extra lag, so $\hat\sigma^2$ can rise even as the in-sample fit looks similar.) Which order do AIC and BIC pick, and is the OLS $\hat\phi_1$ from the AR(1) compatible with the true $0.7$?
::: solution
Both AIC and BIC are smallest at $p = 1$. Extra lags have $t$-statistics well below $2$ ($\hat\phi_2 = 0.028$ with standard error $0.072$). The AR(1) intercept is $-0.026$ (se $0.065$) and $\hat\phi = 0.679$ (se $0.052$), so a 95% interval for $\phi$ is $0.679 \pm 1.96\times 0.052 = (0.577, 0.781)$, which contains $0.7$. Residual Ljung–Box $Q(10) = 5.53$ does not reject ($p = 0.79$ on $\chi^2_9$). The cycle — identify AR(1) from the PACF, estimate by OLS, check residuals and information criteria — recovers the DGP in this sample.
:::
:::

For an MA or ARMA, OLS on lagged $Y$ is not consistent for $\theta$ (the lagged $\varepsilon$ are not regressors we observe). Conditional least squares starts from $\hat\varepsilon_t = 0$ for $t \le 0$ and recursively builds $\hat\varepsilon_t = y_t - \hat\mu - \sum_i\hat\phi_i y_{t-i} - \sum_j\hat\theta_j \hat\varepsilon_{t-j}$, then minimises $\sum \hat\varepsilon_t^2$. Gaussian MLE does the same thing with a correct treatment of the first $p$ observations (the Kalman filter). In large samples the two agree; in small samples with $|\theta|$ near $1$, the exact likelihood is worth the extra work.

::: intuition Why Gaussian MLE works without Gaussian data
The Gaussian log-likelihood of an ARMA is a function of the data only through the implied one-step forecast errors and their variances. Maximising it is quasi-maximum likelihood: the score is a martingale under correct mean and ACF specification, so the [central limit theorem](/a/maths/lesson.php?c=probability&l=limit-theorems) still delivers $\sqrt{T}$-normality. What is lost, if the innovations have heavy tails, is efficiency — and the usual information-matrix standard errors can be too small, which is why sandwich (HAC) standard errors appear in careful applied work. Quasi-MLE is not a licence to ignore outliers; it is a reason not to panic when a Jarque–Bera test on residuals rejects.
:::

::: remark Seasonal ARMA
Monthly series often need a seasonal factor. The multiplicative model $\phi(L)\Phi(L^{12})(Y_t-\mu) = \theta(L)\Theta(L^{12})\varepsilon_t$, written ARMA$(p,q)\times(P,Q)_{12}$, puts AR and MA polynomials at lag $12$ on top of the short-run polynomials. Identification looks at lags $1,2,\ldots$ *and* at lags $12,24,36$. Airline passengers, retail sales and electricity load are the textbook applications; the same pattern appears in seasonally unadjusted industrial production (India's IIP, MOSPI; several Latin American manufacturing indices). If the statistical office has already seasonally adjusted the series, fitting a seasonal ARMA on top is usually a mistake.
:::

## A worked OLS AR(1), in full

The algebra of estimating an AR(1) by OLS is the simple-regression algebra of [[econometrics/simple-regression]], with a lagged dependent variable as the regressor. The twist is dependence: Gauss–Markov does not apply, but large-sample inference still does under $|\phi|<1$.

::: example Hand OLS on six observations {#ex-ols-hand}
Take the first six post-burn-in observations of the seed-$7$ AR(1):

$$
2.035,\ 1.662,\ 1.265,\ 1.138,\ 0.664,\ 0.156.
$$

Using the last five as $y_t$ and the first five as $y_{t-1}$, compute the OLS intercept and slope. (This is a teaching calculation: five observations are not an estimate to report.)
::: solution
Let $x_t$ be the lag. Then

$$
\begin{align*}
x &= (2.035, 1.662, 1.265, 1.138, 0.664),\\
y &= (1.662, 1.265, 1.138, 0.664, 0.156).
\end{align*}
$$

Sums: $\sum x = 6.764$, $\sum y = 4.885$, $\sum x^2 = 10.355$, $\sum xy = 7.698$, $n = 5$. The slope is

$$
\hat\phi = \frac{n\sum xy - (\sum x)(\sum y)}{n\sum x^2 - (\sum x)^2} = \frac{5\cdot 7.698 - 6.764\cdot 4.885}{5\cdot 10.355 - 6.764^2} = \frac{38.490 - 33.042}{51.775 - 45.752} = \frac{5.448}{6.023} = 0.905.
$$

The intercept is $\bar y - \hat\phi \bar x = 0.977 - 0.905\cdot 1.353 = -0.247$. With five observations the slope is noisily above the $T = 199$ estimate $0.679$ and the true $0.7$; the calculation exists to show that “OLS on an AR(1)” is ordinary OLS, not a new estimator.
:::
:::

::: widget regression
points: 2.04,1.66; 1.66,1.27; 1.27,1.14; 1.14,0.66; 0.66,0.16; 0.16,-0.40
degree: 1
residuals: true
x: -0.5, 2.5
y: -0.8, 2.2
caption: Lag scatter of the six-point teaching sample in [[#ex-ols-hand]], plus one extra invented point to the lower left. The OLS line is the AR(1) fit. Drag a point vertically and watch $\hat\phi$ move: with so few observations the slope is at the mercy of a single residual. The $T = 199$ estimate $\hat\phi = 0.679$ is the same picture with 194 more points.
:::

Under $|\phi|<1$, $\sqrt{T}(\hat\phi_{\mathrm{OLS}} - \phi) \to_d \Normal\bigl(0, 1-\phi^2\bigr)$ when $c$ is known (and a similar, sandwich-style, variance when $c$ is estimated). The variance $1-\phi^2$ shrinks as $\phi \to 1$: a near-unit-root AR is *easier* to distinguish from a distant $\phi$, but *harder* to distinguish from $1$, which is why the Dickey–Fuller distribution of [[time-series/unit-roots]] is a different limiting experiment.

::: quiz
You estimate $y_t = c + \phi y_{t-1} + \varepsilon_t$ by OLS on a stationary monthly series and obtain $\hat\phi = 0.97$ with HAC standard error $0.02$. Which interpretation is most careful?
- [ ] The series is stationary because $|\hat\phi| < 1$
- [ ] The series has a unit root because $0.97$ is close to $1$
- [x] The point estimate is consistent with a very persistent stationary AR(1) *and* with a unit root; a unit-root test, not a $t$ test against $0.97$, is the right tool to separate them
- [ ] HAC standard errors are invalid in autoregressions
::: solution
A 95% interval $(0.93, 1.01)$ covers values on both sides of $1$. Stationarity is a property of the process, not of a point estimate being less than $1$ in a sample. Ordinary $t$ critical values are also the wrong ones for a test of $\phi = 1$. HAC standard errors remain valid for $\phi$ well inside the unit interval; they do not solve the unit-root problem. The careful statement is the third.
:::
:::

## Where this leads

A fitted ARMA model is a machine for **forecasts**: the linear predictor of $Y_{t+h}$ given the past, and the MSE of that predictor, are functions of $(\hat\phi,\hat\theta,\hat\sigma^2)$ and are the subject of [[time-series/forecasting]]. If the identification step cannot find a stationary ARMA — because $\hat\phi_1$ sits near $1$, or because the sample ACF of the *level* decays too slowly — the series may be integrated, and [[time-series/unit-roots]] applies. Several series modelled jointly as a vector of AR models are the VARs of [[time-series/var-models]]. Replacing the constant $\sigma^2$ by a recursive variance $\sigma_t^2$ is GARCH ([[time-series/volatility]]).

The Box–Jenkins cycle is not the only way to estimate a linear process. A high-order AR (a sieve) estimated by OLS, with lag length chosen by BIC, is a standard nonparametric alternative; it is often the first step of a Granger-causality test. Bayesian ARMA, state-space models and unobserved-component decompositions all start from the same Wold representation and the same causality condition.

::: history
**1927, Udny Yule.** Yule fitted an AR(2) to sunspot numbers, introducing the autoregressive idea into statistics.

**1931, Eugen Slutsky and 1938, Herman Wold.** The MA representation of a stationary process, and Wold's uniqueness theorem, made precise what a linear model of a time series *is*.

**1954, Herman Wold and 1949, Maurice Walker.** The Yule–Walker equations, connecting AR coefficients to autocovariances, became the first systematic estimator of an AR.

**1970, George Box and Gwilym Jenkins.** *Time Series Analysis: Forecasting and Control* turned ARMA modelling into a repeatable cycle of identification, estimation and residual checking, with seasonal ARMA as a worked case.

**1982, Wayne Fuller and 1991, James Hamilton's lecture notes (book 1994).** The large-sample theory of quasi-MLE for causal invertible ARMA, including the information matrix and the Kalman-filter likelihood, became textbook material.
:::

::: summary
- A causal AR($p$) has geometrically decaying ACF and a PACF that cuts off after lag $p$. Causality is “all roots of $\phi(z)$ outside the unit circle” ([[#def-ar]], [[#prop-ar-moments]]).
- An MA($q$) is always stationary; its ACF cuts off after lag $q$. Invertibility (roots of $\theta$ outside the unit circle) selects one of the observationally equivalent MA representations ([[#def-ma]], [[#prop-ma-acf]]).
- A causal invertible ARMA($p,q$) with no common roots is identified from second moments. Its ACF follows the AR recurrence after lag $q$ ([[#def-arma]], [[#prop-arma-acf]]).
- Identification uses the sample ACF/PACF; estimation is OLS or Yule–Walker for pure AR and Gaussian (quasi-)MLE for MA and ARMA; checking uses residual ACF and Ljung–Box. AIC and BIC trade residual variance against $k$ ([[#def-aic]]).
- $|\hat\phi|<1$ in a sample does not prove stationarity. Near-unit roots need the tools of the unit-root chapter, not a $t$ test against $0.97$.
:::

## Exercises

::: exercise AR(1) mean {level=1 check="5"}
For $Y_t = 1 + 0.8 Y_{t-1} + \varepsilon_t$, compute the unconditional mean. (Enter the mean.)
::: solution
$\mu = 1/(1-0.8) = 5$.
:::
:::

::: exercise MA(1) autocorrelation {level=1 check="0.4"}
For $Y_t = \varepsilon_t + 0.5\varepsilon_{t-1}$, compute $\rho_1$. (Enter $\rho_1$ as a decimal.)
::: solution
$\rho_1 = 0.5/(1+0.25) = 0.4$.
:::
:::

::: exercise MA(1) bound {level=1 check="0.5"}
What is the largest possible $|\rho_1|$ for *any* MA(1)? (Enter the bound.)
::: solution
$|\theta|/(1+\theta^2) \le 1/2$, attained at $|\theta|=1$.
:::
:::

::: exercise AR(2) triangle {level=2}
Does $\phi_1 = 0.4$, $\phi_2 = 0.7$ satisfy the causal AR(2) conditions [[#eq-ar2-tri]]? If not, which inequality fails?
::: solution
$|\phi_2| = 0.7 < 1$ holds; $\phi_2 - \phi_1 = 0.3 < 1$ holds; $\phi_1 + \phi_2 = 1.1 \not< 1$ fails. The polynomial $\phi(z) = 1 - 0.4z - 0.7z^2$ has a root inside or on the unit circle (in fact $\phi(1) = -0.1 < 0$ while $\phi(0) = 1$, so a real root in $(0,1)$). The process is not causal.
:::
:::

::: exercise Yule–Walker for AR(1) {level=2 check="0.6"}
A sample has $\hat\rho_1 = 0.6$ and $\hat\gamma_0 = 4$. What is the Yule–Walker estimate of $\phi$ in an AR(1)? (Enter $\hat\phi$.)
::: solution
The lag-1 Yule–Walker equation is $\gamma_1 = \phi\gamma_0$, so $\hat\phi = \hat\rho_1 = 0.6$.
:::
:::

::: exercise ARMA(1,1) $\rho_1$ {level=2 check="0.756"}
For $\phi = 0.6$, $\theta = 0.4$, compute $\rho_1$ of the causal ARMA(1,1) to three decimals. (Enter $\rho_1$.)
::: solution
$\rho_1 = \dfrac{(1+0.6\cdot 0.4)(0.6+0.4)}{1+2\cdot 0.6\cdot 0.4 + 0.16} = \dfrac{(1.24)(1.0)}{1+0.48+0.16} = 1.24/1.64 = 0.756$.
:::
:::

::: exercise Common-root redundancy {level=3}
Suppose $\phi(z) = (1-0.5z)(1-0.3z)$ and $\theta(z) = (1-0.5z)(1+0.4z)$. Write an ARMA model with the same Wold coefficients and lower orders.
::: hint
Cancel the common factor $1-0.5z$.
:::
::: solution
$\psi(z) = \theta(z)/\phi(z) = (1+0.4z)/(1-0.3z)$, which is ARMA(1,1) with $\phi_1 = 0.3$ and $\theta_1 = 0.4$. The original ARMA(2,2) is not identified: a one-dimensional family of redundant parameterisations shares the same second moments.
:::
:::

::: exercise Invertible twin {level=2}
An MA(1) has $\rho_1 = 0.4$. Find both values of $\theta$ that produce this $\rho_1$, and state which is invertible.
::: hint
Solve $\theta/(1+\theta^2) = 0.4$.
:::
::: solution
$\theta = 0.4(1+\theta^2)$ gives $0.4\theta^2 - \theta + 0.4 = 0$. Multiply by $5/2$: $\theta^2 - 2.5\theta + 1 = 0$, or more cleanly $2\theta^2 - 5\theta + 2 = 0$, $(2\theta-1)(\theta-2) = 0$. The roots are $\theta = 1/2$ and $\theta = 2$. Only $|\theta| < 1$ is invertible, so $\theta = 1/2$.
:::
:::

::: exercise Residual degrees of freedom {level=2}
You fit an ARMA(1,1) by MLE and compute Ljung–Box $Q(12)$ on the residuals. Under the null of i.i.d. innovations, what is the asymptotic $\chi^2$ degrees of freedom? If $Q(12) = 22.0$, do you reject at 5%? (The 5% critical value of $\chi^2_{10}$ is $18.31$; of $\chi^2_{12}$ is $21.03$.)
::: solution
Two ARMA parameters have been estimated (plus perhaps a mean; the usual residual $Q$ subtracts $p+q = 2$), so the reference distribution is $\chi^2_{10}$. Then $22.0 > 18.31$, and the test rejects at 5%. Using $\chi^2_{12}$ (not subtracting $p+q$) would be anti-conservative in finite samples but here would also reject, just. The honest report is a rejection against $\chi^2_{10}$.
:::
:::

::: exercise OLS variance near a unit root {level=3}
For a zero-mean causal AR(1), $\sqrt{T}(\hat\phi-\phi)\to_d\Normal(0,1-\phi^2)$ when $|\phi|<1$. Evaluate the asymptotic variance at $\phi = 0$, $\phi = 0.9$ and $\phi = 0.99$. Why is a $t$ test of $H_0{:}\ \phi = 1$ *not* obtained by plugging $\phi = 1$ into this formula?
::: solution
The asymptotic variances are $1$, $0.19$ and $0.0199$. Estimation of $\phi$ looks more precise as $\phi$ approaches $1$ — but the *experiment* “$\phi$ is exactly $1$” is a different probability model (a random walk), in which $\hat\phi$ converges faster than $T^{-1/2}$ and the limiting distribution is the Dickey–Fuller distribution, not $\Normal(0,0)$. You cannot obtain the unit-root test by continuity from the stationary CLT. That discontinuity is the reason [[time-series/unit-roots]] exists.
:::
:::
