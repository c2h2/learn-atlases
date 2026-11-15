Does a person participate in the labour force, take up a vaccine, repay a loan, or complete secondary school? The outcome $y$ is **binary**: $y \in \{0,1\}$. A linear model $y = \beta_0 + \beta_1 x + u$ is then a **linear probability model** (LPM): $\E(y \mid x) = \Prob(y = 1 \mid x) = \beta_0 + \beta_1 x$. The LPM is easy to estimate by OLS and easy to interpret, and it is often a good approximation. It cannot be the whole story: a probability must lie in $[0,1]$, and $\Var(y \mid x) = p(x)\bigl(1-p(x)\bigr)$ is heteroskedastic by construction. **Probit** and **logit** models replace the linear index with a cumulative distribution function, estimate by **maximum likelihood**, and report **marginal effects** that play the role of the LPM slope. This chapter develops all three, with the likelihood theory pointing to [estimation](/a/maths/lesson.php?c=statistics&l=estimation) in the Maths Atlas.

## The linear probability model

::: definition Linear probability model {#def-lpm}
If $y \in \{0,1\}$, the **linear probability model** is $y = \beta_0 + \mathbf{x}\T\boldsymbol\beta + u$ with $\E(u \mid \mathbf{x}) = 0$, so

$$
\Prob(y = 1 \mid \mathbf{x}) = \beta_0 + \mathbf{x}\T\boldsymbol\beta.
$$

OLS estimates the parameters. The coefficient $\beta_j$ is the change in the probability that $y = 1$ associated with a one-unit change in $x_j$, holding the other regressors fixed.
:::

Three features follow at once.

A binary outcome looks like a limited dependent variable, and it is, but the LPM is still a linear projection of $y$ on $\mathbf{x}$. That projection always exists, as long as $X$ has full rank, and its slopes are average differences in $y$. What the LPM does *not* deliver is a guarantee that fitted values are probabilities, or that $\Var(u \mid \mathbf{x})$ is constant. Those are extra wishes, and they fail. The practical question is whether the approximation is useful in the interior of the data. For a dummy treatment with random assignment, it is not an approximation at all: it is the difference in means.

Fitted values can fall outside $[0,1]$. That is ugly as a predicted probability, but it need not wreck the average partial effect of a regressor that is not pushing $p$ against the boundary.

The error is heteroskedastic: $\Var(y \mid \mathbf{x}) = p(\mathbf{x})\bigl(1-p(\mathbf{x})\bigr)$, which is largest at $p = 1/2$ and zero at $p \in \{0,1\}$. Usual OLS standard errors are therefore wrong; White (or clustered) standard errors are the default ([[econometrics/heteroskedasticity]]).

If the true $p(\mathbf{x})$ is a smooth curve between $0$ and $1$, the LPM is a linear approximation to that curve over the range of $\mathbf{x}$ in the sample. For a dummy regressor, the LPM coefficient is exactly the difference in mean $y$ (adjusted for other regressors, in the FWL sense), which is often the number of interest.

::: example A difference in means is an LPM {#ex-lpm-dummy}
One hundred people are offered a course and one hundred are not. Completion of a later exam ($y = 1$) occurs for $58$ of the treated and $40$ of the untreated. The LPM of $y$ on a treatment dummy is $\hat y = 0.40 + 0.18 d$. The slope $0.18$ is exactly the difference in completion rates. A logit on the same dummy produces a coefficient in log-odds units; its average marginal effect is again $0.18$, because with a single dummy the AME of any $F$ that is a cdf is the difference in means.
::: solution
Treated mean $0.58$, untreated mean $0.40$, difference $0.18$. The LPM intercept is the untreated mean. For a binary $x$ with no other regressors, LPM, logit AME and probit AME all equal $\bar y_1 - \bar y_0$. That is why experimental papers so often report the LPM: it *is* the difference the experiment was designed to estimate.
:::
:::

::: example LPM on simulated data, seed 3 {#ex-lpm}
Draw $n = 80$ from a true logit, $\Prob(y=1 \mid x) = \Lambda(-0.5 + 1.2 x)$ with $x \sim \Normal(0,1)$, using `numpy.random.default_rng(3)`. Fit the LPM of $y$ on $x$.
::: solution
The sample has $\bar y = 0.40$ (32 ones) and $\bar x = -0.095$. OLS gives $\hat y = 0.422 + 0.231 x$. A one-unit rise in $x$ is associated with a $0.231$ rise in the probability that $y = 1$. Fitted values range from $-0.23$ to $1.19$; seven of the eighty fall outside $[0,1]$. The LPM is picking up the slope of the true logit around the centre of $x$, where $\Lambda'(z) = \Lambda(z)\bigl(1-\Lambda(z)\bigr)$ is not small, and it is a poor description of the tails. Robust standard errors should be used for inference; we skip them here to keep the arithmetic on the point estimates.
:::
:::

::: widget plot
f: 1/(1+exp(0.5-1.2*x)); 0.422+0.231*x
x: -3, 3
y: -0.3, 1.3
labels: \text{true logit }p(x); \text{LPM fit}
hlines: 0; 1
caption: The true logit probability of [[#ex-lpm]] and the LPM fit. The LPM is a tangent-like approximation in the middle and strays outside $[0,1]$ in the tails. Drag the idea, not the points: for a regressor with limited range the two curves can be almost indistinguishable over the data, which is why the LPM is widely used.
:::

::: warning Predicted probabilities outside $[0,1]$
An LPM fitted value of $1.19$ is not a probability. If the aim is to *predict* $p$ for a unit with extreme $\mathbf{x}$, use probit or logit. If the aim is to estimate an average effect of $x$ in a population whose $\mathbf{x}$ is not extreme, the LPM coefficient remains a well-defined average derivative of a linear projection, and is often close to the average marginal effect of a logit. Do not throw the LPM away because a few fitted values misbehave; do not treat those fitted values as probabilities either.
:::

## Logit and probit

A latent-index construction repairs the range problem. Let $y^* = \beta_0 + \mathbf{x}\T\boldsymbol\beta + e$ be unobserved, and set $y = 1\{y^* \ge 0\}$. Then

$$
\Prob(y = 1 \mid \mathbf{x}) = \Prob(e \ge -(\beta_0 + \mathbf{x}\T\boldsymbol\beta)) = F(\beta_0 + \mathbf{x}\T\boldsymbol\beta),
$$

where $F$ is the cdf of $-e$ (or of $e$, if $e$ is symmetric). Two standard choices of $F$ give the two workhorse models.

::: definition Logit and probit {#def-logit-probit}
The **logit** model takes $F(z) = \Lambda(z) = e^{z}/(1+e^{z})$, the logistic cdf, equivalent to $e$ having a logistic distribution. The **probit** model takes $F(z) = \Phi(z)$, the standard normal cdf, equivalent to $e \sim \Normal(0,1)$. In both, the **index** $z = \beta_0 + \mathbf{x}\T\boldsymbol\beta$ is linear in parameters; the probability is a strictly increasing $S$-shaped transformation of the index, lying in $(0,1)$.
:::

The scale of $e$ is normalised (logistic variance $\pi^2/3$, or normal variance $1$) because $y^*$ is unobserved: multiplying $\beta$ and the scale of $e$ by the same constant leaves $y$ unchanged. Coefficients are therefore **not** in probability units, and they are not comparable across logit and probit without rescaling. What is comparable, and what applied papers report, is the **marginal effect**.

::: proposition Marginal effects {#prop-me}
In a binary model $p(\mathbf{x}) = F(\beta_0 + \mathbf{x}\T\boldsymbol\beta)$,

$$
\frac{\partial p}{\partial x_j} = f(\beta_0 + \mathbf{x}\T\boldsymbol\beta)\,\beta_j,
$$

where $f = F'$ is the density. The **average marginal effect** (AME) is the sample mean of that derivative. The **partial effect at the mean** (PEM) evaluates it at $\bar{\mathbf{x}}$. For a dummy regressor the analogous quantity is the difference $F(\beta_0 + \mathbf{x}_{-j}\T\boldsymbol\beta_{-j} + \beta_j) - F(\beta_0 + \mathbf{x}_{-j}\T\boldsymbol\beta_{-j})$, averaged or evaluated at a point.
:::

::: proof
The chain rule: $dF(z)/dx_j = f(z) \cdot \beta_j$. For logit, $f(z) = \Lambda(z)\bigl(1-\Lambda(z)\bigr)$; for probit, $f(z) = \phi(z)$, the standard normal density. Because $f > 0$, the sign of the marginal effect is the sign of $\beta_j$, and the ranking of effects across $j$ is the ranking of the $\beta_j$. Magnitudes require $f$.
:::

At the centre of the data, $f$ is about $0.25$ for a balanced logit and about $0.40$ for a balanced probit, so logit coefficients are typically about $1.6$ times probit coefficients for the same data, and LPM coefficients sit near the AME of either. That is a rule of thumb, not an identity.

## Maximum likelihood

OLS is not the natural estimator of a logit or probit: the model is a statement about $\Prob(y_i = 1 \mid \mathbf{x}_i)$, and the **likelihood** of an independent sample is the product of those probabilities.

::: theorem Bernoulli log-likelihood {#thm-mle}
If the observations are independent and $\Prob(y_i = 1 \mid \mathbf{x}_i) = F(\mathbf{x}_i\T\boldsymbol\beta)$ (absorbing the intercept into $\mathbf{x}_i$), the log-likelihood is

$$
\ell(\boldsymbol\beta) = \sum_{i=1}^n \Bigl\{ y_i \log F(\mathbf{x}_i\T\boldsymbol\beta) + (1-y_i)\log\bigl(1 - F(\mathbf{x}_i\T\boldsymbol\beta)\bigr) \Bigr\}.
$$ {#eq-ll}

The **maximum-likelihood estimator** (MLE) maximises $\ell$. Under standard regularity (the true $\boldsymbol\beta$ interior, $F$ correctly specified, $\mathbf{x}$ with enough variation), the MLE is consistent, asymptotically normal, and asymptotically efficient among regular estimators. Its asymptotic variance is the inverse information matrix, estimated by the inverse Hessian or by the outer product of the scores.
:::

::: proof
The Bernoulli pmf is $p^y (1-p)^{1-y}$. Taking logs and summing independent observations is [[#eq-ll]]. Consistency and asymptotic normality of MLE are the general theorems of [point estimation](/a/maths/lesson.php?c=statistics&l=estimation); the information matrix for this model is $\E\bigl(f(\mathbf{x}\T\boldsymbol\beta)^2 / \bigl(F(1-F)\bigr) \,\mathbf{x}\mathbf{x}\T\bigr)$. For logit, the Hessian is $-\sum_i \Lambda_i(1-\Lambda_i)\mathbf{x}_i\mathbf{x}_i\T$, negative definite whenever the $\mathbf{x}_i$ span, so the log-likelihood is globally concave and Newton–Raphson from $\mathbf{0}$ is well behaved.
:::

Newton–Raphson for the logit, in `numpy`, is a short loop: at each step $p_i = \Lambda(\mathbf{x}_i\T\boldsymbol\beta)$, $W = \operatorname{diag}\bigl(p_i(1-p_i)\bigr)$, the score is $X\T(\mathbf{y}-\mathbf{p})$ and the Hessian is $-X\T W X$. For the simulated sample of [[#ex-lpm]]:

::: example A probability that leaves $[0,1]$ {#ex-lpm-outside}
In [[#ex-lpm]] the LPM is $\hat y = 0.422 + 0.231 x$. At $x = -3$, $\hat y = -0.271$; at $x = 3$, $\hat y = 1.115$. Both are impossible as probabilities. The logit fitted probabilities $\Lambda(-0.457 + 1.492 x)$ at the same points are $\Lambda(-4.933) \approx 0.007$ and $\Lambda(4.019) \approx 0.982$, inside $(0,1)$ by construction. If the sample's $x$ never reaches $\pm 3$, the LPM may still be a good approximation *inside the data*; the failure is in the extrapolation.
::: solution
$0.422 + 0.231\times(-3) = 0.422 - 0.693 = -0.271$ and $0.422 + 0.693 = 1.115$. For the logit, $-0.457 + 1.492\times(-3) = -4.933$ and $-0.457 + 1.492\times 3 = 4.019$. Then $\Lambda(z) = e^{z}/(1+e^{z})$ gives about $0.007$ and $0.982$. Use logit or probit when predicted probabilities at extreme $\mathbf{x}$ are the object; use the LPM when the object is an average slope over the observed range of $\mathbf{x}$.
:::
:::

::: example Logit and probit MLEs, seed 3 {#ex-logit}
On the same $80$ observations as [[#ex-lpm]], compute the logit and probit MLEs, the logit standard errors from the inverse information, and the logit AME and PEM of $x$.
::: solution
Newton–Raphson from $\boldsymbol\beta = \mathbf{0}$ converges in six steps to $\hat\beta_0 = -0.457$, $\hat\beta_1 = 1.492$ (logit), with information standard errors $0.274$ and $0.382$. The true logit parameters were $(-0.5, 1.2)$; with $n = 80$ the slope is a bit high, as sampling allows. The average of $\Lambda_i(1-\Lambda_i)\hat\beta_1$ is $\mathrm{AME} = 0.255$; the partial effect at $\bar x$ is $0.341$. The LPM slope was $0.231$, close to the AME — the usual empirical pattern. Probit MLE is $(-0.281, 0.886)$. The ratio of logit to probit slopes is $1.492/0.886 \approx 1.68$, near the $1.6$ rule of thumb. Signs agree throughout: $x$ raises the probability that $y = 1$.
:::
:::

```python
from scipy.special import expit
b = np.zeros(2)
for _ in range(20):
    p = np.clip(expit(X @ b), 1e-12, 1-1e-12)
    grad = X.T @ (y - p)
    H = -(X.T * (p*(1-p))) @ X
    step = np.linalg.inv(-H) @ grad
    b = b + step
    if np.linalg.norm(step) < 1e-10:
        break
se = np.sqrt(np.diag(np.linalg.inv(-H)))
ame = np.mean(p*(1-p)) * b[1]
```

::: quiz
A logit coefficient on schooling is $0.20$. Which statement is correct?
- [ ] An extra year of school raises the probability of the outcome by $0.20$.
- [x] An extra year of school raises the log-odds of the outcome by $0.20$; the change in probability equals $0.20$ times $\Lambda(z)\bigl(1-\Lambda(z)\bigr)$, which depends on $z$.
- [ ] The LPM coefficient must be $0.20$.
- [ ] The probit coefficient must be $0.20$.
::: solution
Logit coefficients are log-odds slopes, not probability slopes. The probability effect is the marginal effect, which varies with the index. LPM and probit coefficients are in different units again. Report the AME (or a PEM at a stated point) alongside the coefficient.
:::
:::

## Odds, fit and specification

For logit, $\Lambda(z)/(1-\Lambda(z)) = e^{z}$, so $\beta_j$ is the derivative of the **log-odds**. A one-unit rise in $x_j$ multiplies the odds $\Prob(y=1)/\Prob(y=0)$ by $e^{\beta_j}$. That reading is exact and does not depend on $\mathbf{x}$; it is the reason some fields report odds ratios. A probability change of "about $\beta_j/4$" at the centre of a balanced logit is a rough translation back to the LPM scale.

Goodness of fit is not $R^2$. Two common substitutes: **percent correctly predicted** (predict $y = 1$ if $\hat p > 0.5$, and count matches — weak when $\bar y$ is far from $1/2$, because always predicting the majority class already does well), and a **pseudo-$R^2$** such as McFadden's $1 - \ell(\hat{\boldsymbol\beta})/\ell(\hat\beta_0)$, which is $0$ for a constant-only model and $1$ for a perfect fit. Neither is comparable to an OLS $R^2$.

Misspecification of $F$ (logit when the world is probit, or either when the index is not linear) generally costs the interpretation of $\boldsymbol\beta$, but average marginal effects of a correctly included $x_j$ are often robust. Heteroskedasticity in the latent $e$ is more damaging: it is not separable from the index in a binary model, and it can bias even the sign of $\beta_j$. That is a reason to treat latent-index claims with more caution than LPM average effects, and a reason the sequel [[causal-inference/potential-outcomes]] often prefers the LPM for average treatment effects.

::: application Who takes up a programme?
Development-economics field experiments often randomise an offer and record a binary take-up. The LPM of take-up on the offer, with village clustered standard errors, estimates the take-up rate difference — which is the first stage of an instrumental-variables analysis of the programme's effect on later outcomes ([[econometrics/instrumental-variables]]). Logit and probit of the same regression produce S-shaped take-up curves and similar AMEs when the offer is a dummy. The LPM is then not a competitor to logit; it *is* the difference in means.
:::

::: history
**1944, Joseph Berkson; 1973, Daniel McFadden.** Berkson promoted the logit for bioassay, as a computationally friendly alternative to probit (which Gaddum and Bliss had used in the 1930s). McFadden's conditional logit (*Frontiers in Econometrics*, 1973; Nobel prize 2000) gave the model a random-utility foundation and launched discrete-choice econometrics. The LPM is much older: it is OLS on a dummy dependent variable, used long before its heteroskedasticity was routinely corrected.
:::

## Where this leads

Binary $y$ is the simplest limited dependent variable. Ordered outcomes, counts, and corner solutions (Tobit, selection) use the same likelihood idea with a different $F$ or an extra equation; they belong to a later course. For causal questions with a binary *treatment*, the LPM of the outcome on the treatment is the difference in means, and the LPM of the treatment on an instrument is the first stage of IV. [[econometrics/panel-data]] discusses binary $y$ with a unit effect (conditional logit, correlated random effects). [[econometrics/instrumental-variables]] returns to dummy endogenous regressors.

::: summary
- The LPM is OLS with binary $y$: $\beta_j$ is a change in probability. Use robust standard errors; fitted values may leave $[0,1]$.
- Logit and probit set $p = F(\beta_0 + \mathbf{x}\T\boldsymbol\beta)$ with $F = \Lambda$ or $\Phi$, and estimate by maximum likelihood.
- Coefficients are not probability effects. Report average marginal effects (or a partial effect at a stated point). Signs of $\beta_j$ and of the marginal effect agree.
- Logit $\beta_j$ is a log-odds slope; $e^{\beta_j}$ multiplies the odds. A rough LPM-scale translation at the centre of a balanced logit is $\beta_j/4$.
- Percent correctly predicted and McFadden's pseudo-$R^2$ are the usual fit numbers; they are not OLS $R^2$.
:::

## Exercises

::: exercise An LPM dummy {level=1 check="0.15"}
In a sample of $200$ people, $40$ of $100$ treated have $y = 1$ and $25$ of $100$ untreated have $y = 1$. The LPM of $y$ on a treatment dummy (and an intercept) is the difference in means. Compute $\hat\beta_1$. (Enter the difference.)
::: solution
$0.40 - 0.25 = 0.15$. The intercept is $0.25$, the untreated mean.
:::
:::

::: exercise A fitted LPM probability {level=1 check="0.884"}
Using [[#ex-lpm]], $\hat y = 0.422 + 0.231 x$. Compute the fitted probability at $x = 2$, to three decimal places. (Enter $\hat y$.)
::: solution
$0.422 + 0.231\times 2 = 0.884$. This one happens to lie in $(0,1)$. At $x = 3$ it would be $1.115$, which does not.
:::
:::

::: exercise An odds ratio {level=1 check="1.221"}
A logit coefficient is $\hat\beta_j = 0.20$. By what factor does the fitted odds of $y = 1$ change when $x_j$ rises by one? Enter $e^{0.20}$ rounded to three decimal places.
::: solution
$e^{0.20} \approx 1.221$. The odds are $22\%$ higher; the probability change is smaller and depends on the starting $p$.
:::
:::

::: exercise A logit marginal effect {level=2 check="0.25"}
At a point where $\Lambda(z) = 0.5$, the logit density is $\Lambda(1-\Lambda) = 0.25$. If $\hat\beta_1 = 1$, what is the marginal effect of $x_1$ at that point? (Enter the marginal effect.)
::: solution
$0.25 \times 1 = 0.25$. This is the "$\beta/4$" rule of thumb for a balanced logit at the centre.
:::
:::

::: exercise Compare AME and LPM {level=2}
In [[#ex-logit]] the LPM slope is $0.231$ and the logit AME is $0.255$. Give two reasons why they need not be identical even in large samples.
::: solution
The LPM estimates a linear projection of $y$ on $x$; the logit AME is the mean of $f(z_i)\beta_1$ under a nonlinear $F$. If the true $p(x)$ is logit, the LPM slope is a weighted average of the logit marginal effects, with more weight where $x$ is more variable, not necessarily the unweighted AME. If the true $p(x)$ is not logit, both are approximations, and they approximate different objects. In practice they are often close, which is useful, not a theorem.
:::
:::

::: exercise Heteroskedasticity in the LPM {level=2}
Show that $\Var(y \mid \mathbf{x}) = p(\mathbf{x})\bigl(1-p(\mathbf{x})\bigr)$ when $y \in \{0,1\}$ and $p(\mathbf{x}) = \E(y \mid \mathbf{x})$. At which $p$ is the variance largest?
::: solution
$y^2 = y$ for binary $y$, so $\E(y^2 \mid \mathbf{x}) = p$ and $\Var(y \mid \mathbf{x}) = p - p^2 = p(1-p)$. The quadratic $p-p^2$ is maximised at $p = 1/2$, where the variance is $1/4$, and is zero at $p \in \{0,1\}$. That is why LPM residuals are typically largest in the middle of the fitted-probability range, and why robust standard errors are required.
:::
:::

::: exercise Score and Hessian of the logit {level=3}
For the logit log-likelihood [[#eq-ll]] with $F = \Lambda$, show that the score contribution of observation $i$ is $(y_i - \Lambda_i)\mathbf{x}_i$ and that the Hessian contribution is $-\Lambda_i(1-\Lambda_i)\mathbf{x}_i\mathbf{x}_i\T$. Deduce that $\ell$ is concave.
::: hint
$\Lambda'(z) = \Lambda(z)\bigl(1-\Lambda(z)\bigr)$. Differentiate $\ell_i = y_i \log\Lambda + (1-y_i)\log(1-\Lambda)$ with respect to $z$ first.
:::
::: solution
$\frac{d\ell_i}{dz} = y_i (1-\Lambda) - (1-y_i)\Lambda = y_i - \Lambda$, using $\Lambda' = \Lambda(1-\Lambda)$. The chain rule gives score $(y_i - \Lambda_i)\mathbf{x}_i$. Differentiating again, $\frac{d^2\ell_i}{dz^2} = -\Lambda(1-\Lambda)$, so the Hessian contribution is $-\Lambda_i(1-\Lambda_i)\mathbf{x}_i\mathbf{x}_i\T$. Summing, $H = -X\T W X$ with $W = \operatorname{diag}(\Lambda_i(1-\Lambda_i))$. For $W$ positive on the interior, $H$ is negative semi-definite, and negative definite if the columns of $X$ are linearly independent. Hence $\ell$ is concave and a critical point, if it exists, is the unique maximiser.
:::
:::

::: exercise Latent scale {level=3}
Explain why one cannot estimate $\sigma = \sqrt{\Var(e)}$ in the latent model $y^* = \beta_0 + \beta_1 x + e$, $y = 1\{y^* \ge 0\}$, and why that forces a normalisation in probit. What would a reported probit coefficient of $0.5$ become if someone had normalised $\Var(e) = 4$ instead of $1$?
::: solution
Only the sign of $y^*$ is observed, so $(\beta, \sigma)$ and $(c\beta, c\sigma)$ for $c > 0$ produce the same $y$. Probit sets $\sigma = 1$. If instead $\sigma = 2$ (variance $4$), all coefficients are multiplied by $2$: the reported $0.5$ would become $1.0$. The implied probabilities $\Phi((\beta_0 + \beta_1 x)/\sigma)$ are invariant, and so are the marginal effects. Never compare raw probit (or logit) coefficients across specifications that might have different implicit scales — compare AMEs.
:::
:::
