Linear regression is the oldest learning algorithm still in daily use, and it is the best place to see every idea of [[ml-fundamentals/learning-problem]] at work with nothing hidden. The hypothesis class is the set of linear functions, the loss is the squared error, and empirical risk minimisation has an exact solution given by a system of linear equations, the **normal equations**. Three readings of that solution — geometric (an orthogonal projection), probabilistic (maximum likelihood under Gaussian noise) and Bayesian (with a Gaussian prior, which gives **ridge regression**) — recur all through machine learning. And because the same objective can be minimised by gradient descent, linear regression is also the cleanest example of how step size and the shape of the data govern optimisation.

Nearly every layer of a neural network, including the projections inside a Transformer, is a linear map followed by something else; the last layer of a regression network *is* linear regression on learned features ([[ml-fundamentals/representations]]). The linear algebra used here — matrix products, rank, orthogonal projection, eigenvalues of symmetric matrices — is in [[math-for-ml/vectors-matrices]] and [[math-for-ml/matrix-decompositions]], and the Maths Atlas lesson on [least squares](/learn/maths/lesson.php?c=linear-algebra&l=least-squares) treats the geometry at more length; its [regression](/learn/maths/lesson.php?c=statistics&l=regression) lesson covers the classical statistics.

## The model {#sec-model}

Each example has $d$ real **features** $x_1, \dots, x_d$ — floor area, number of rooms, distance to the station — collected in a vector $\mathbf{x}\in\R^d$, and a real label $y$.

::: definition Linear regression model {#def-linear-model}
A **linear predictor** with **weights** $\mathbf{w}\in\R^d$ and **intercept** (or bias) $b\in\R$ is

$$
h(\mathbf{x}) = \mathbf{w}^\top\mathbf{x} + b = w_1x_1 + \dots + w_dx_d + b.
$$

For $n$ examples, the **design matrix** $X\in\R^{n\times p}$ has the feature vectors as rows, and the labels form $\mathbf{y}\in\R^n$. The intercept is absorbed by giving every row a first entry $1$, so that $p = d + 1$, $\boldsymbol\beta = (b, w_1, \dots, w_d)^\top\in\R^p$ and the vector of predictions is $X\boldsymbol\beta$.
:::

The model is "linear" in a precise sense: the predictions are linear in the **parameters** $\boldsymbol\beta$. The features themselves can be any fixed functions of the raw input — $x$, $x^2$ and $\sin x$, or the logarithm of a price, or indicator variables for categories — and the model is still linear regression. We return to this freedom in [[#sec-basis]].

::: definition Least squares {#def-least-squares}
The **least-squares** estimate minimises the empirical risk under the squared loss,

$$
\mathcal{L}(\boldsymbol\beta) = \frac1n\sum_{i=1}^n\big(y_i - \mathbf{x}_i^\top\boldsymbol\beta\big)^2 = \frac1n\lVert\mathbf{y} - X\boldsymbol\beta\rVert^2,
$$ {#eq-mse}

the **mean squared error** (MSE). The vector $\mathbf{r} = \mathbf{y} - X\boldsymbol\beta$ is the vector of **residuals**, and $\operatorname{RSS} = \lVert\mathbf{r}\rVert^2$ is the **residual sum of squares**.
:::

Why squares? Three answers will appear: squaring makes the problem a quadratic with a closed-form minimiser; it is the right loss when the noise is Gaussian ([[#sec-probabilistic]]); and the risk-minimising predictor under squared loss is the conditional mean $\E[y\mid\mathbf{x}]$ ([[ml-fundamentals/learning-problem#prop-bayes]]), so least squares estimates the best linear approximation to the conditional mean. The price is sensitivity to outliers: one wild point with residual $10$ contributes as much as a hundred points with residual $1$.

## The normal equations {#sec-normal}

::: theorem The normal equations {#thm-normal}
$\mathcal{L}$ is a convex quadratic function of $\boldsymbol\beta$, with gradient

$$
\nabla\mathcal{L}(\boldsymbol\beta) = \frac2nX^\top(X\boldsymbol\beta - \mathbf{y}).
$$ {#eq-grad}

A vector $\hat{\boldsymbol\beta}$ minimises $\mathcal{L}$ if and only if it solves the **normal equations**

$$
X^\top X\,\hat{\boldsymbol\beta} = X^\top\mathbf{y}.
$$ {#eq-normal}

Solutions always exist. If $X$ has full column rank $p$ (which requires $n\ge p$), then $X^\top X$ is invertible and the minimiser is unique: $\hat{\boldsymbol\beta} = (X^\top X)^{-1}X^\top\mathbf{y}$.
:::

::: proof
Expand $n\mathcal{L}(\boldsymbol\beta) = \mathbf{y}^\top\mathbf{y} - 2\boldsymbol\beta^\top X^\top\mathbf{y} + \boldsymbol\beta^\top X^\top X\boldsymbol\beta$. By the rules for gradients of linear and quadratic forms ([[math-for-ml/gradients]]), the gradient is $\frac1n(-2X^\top\mathbf{y} + 2X^\top X\boldsymbol\beta)$, which is [[#eq-grad]]. The Hessian is $\frac2nX^\top X$, and $\mathbf{v}^\top X^\top X\mathbf{v} = \lVert X\mathbf{v}\rVert^2\ge0$, so it is positive semi-definite and $\mathcal{L}$ is convex; for a differentiable convex function the minimisers are exactly the points where the gradient vanishes ([[math-for-ml/optimisation#prop-convex]]), which is [[#eq-normal]].

For existence, a direct argument shows more. The column space $\operatorname{col}(X)$ is a subspace of $\R^n$, so $\mathbf{y}$ has an orthogonal projection $\hat{\mathbf{y}} = X\hat{\boldsymbol\beta}$ onto it for some $\hat{\boldsymbol\beta}$, with $\mathbf{y} - \hat{\mathbf{y}}$ orthogonal to every column: $X^\top(\mathbf{y} - X\hat{\boldsymbol\beta}) = \mathbf{0}$, which is [[#eq-normal]]. For any $\boldsymbol\beta$, the vector $X(\hat{\boldsymbol\beta} - \boldsymbol\beta)$ lies in $\operatorname{col}(X)$, so by Pythagoras

$$
\lVert\mathbf{y} - X\boldsymbol\beta\rVert^2 = \lVert\mathbf{y} - X\hat{\boldsymbol\beta}\rVert^2 + \lVert X(\hat{\boldsymbol\beta} - \boldsymbol\beta)\rVert^2\ \ge\ \lVert\mathbf{y} - X\hat{\boldsymbol\beta}\rVert^2.
$$

Finally, if $X$ has full column rank then $X\mathbf{v} = \mathbf{0}$ only for $\mathbf{v} = \mathbf{0}$, so $\mathbf{v}^\top X^\top X\mathbf{v} = \lVert X\mathbf{v}\rVert^2 > 0$ for $\mathbf{v}\ne\mathbf{0}$: $X^\top X$ is positive definite, hence invertible, and [[#eq-normal]] has exactly one solution.
:::

The proof contains the geometric picture worth keeping. The fitted values $\hat{\mathbf{y}} = X\hat{\boldsymbol\beta}$ are the point of the column space closest to $\mathbf{y}$, and the residual vector is perpendicular to that space.

::: proposition Projection and residuals {#prop-projection}
If $X$ has full column rank, then $\hat{\mathbf{y}} = P\mathbf{y}$ with the **hat matrix** $P = X(X^\top X)^{-1}X^\top$, which is symmetric and satisfies $P^2 = P$: it is the orthogonal projection onto $\operatorname{col}(X)$. The residuals are orthogonal to every column of $X$. In particular, if the model has an intercept, the residuals sum to zero, and the fitted hyperplane passes through the point of means $(\bar{\mathbf{x}}, \bar y)$.
:::

::: proof
$P^\top = X(X^\top X)^{-1}X^\top = P$ because $X^\top X$ is symmetric, and $P^2 = X(X^\top X)^{-1}X^\top X(X^\top X)^{-1}X^\top = P$. Orthogonality of the residuals is [[#eq-normal]] rewritten as $X^\top\mathbf{r} = \mathbf{0}$. With an intercept, one column of $X$ is all ones, and its inner product with $\mathbf{r}$ is $\sum_ir_i = 0$. Dividing $\sum_i(y_i - \hat b - \hat{\mathbf{w}}^\top\mathbf{x}_i) = 0$ by $n$ gives $\bar y = \hat b + \hat{\mathbf{w}}^\top\bar{\mathbf{x}}$.
:::

With a single feature the normal equations can be solved by hand. Writing $S_{xx} = \sum_i(x_i - \bar x)^2$ and $S_{xy} = \sum_i(x_i - \bar x)(y_i - \bar y)$, the solution is

$$
\hat w = \frac{S_{xy}}{S_{xx}},\qquad\hat b = \bar y - \hat w\bar x,
$$ {#eq-simple}

the sample covariance of $x$ and $y$ divided by the sample variance of $x$ (exercise 7 derives it).

::: example Three points by hand {#ex-three-points}
Fit $y = b + wx$ to the points $(1, 2)$, $(2, 3)$, $(3, 5)$ by solving the normal equations, and check [[#prop-projection]].
::: solution
With rows $(1, x_i)$,

$$
X^\top X = \begin{pmatrix}3 & 6\\ 6 & 14\end{pmatrix},\qquad X^\top\mathbf{y} = \begin{pmatrix}2 + 3 + 5\\ 2 + 6 + 15\end{pmatrix} = \begin{pmatrix}10\\ 23\end{pmatrix}.
$$

The determinant is $42 - 36 = 6$, so $\hat b = (14\cdot10 - 6\cdot23)/6 = 2/6 = 1/3$ and $\hat w = (3\cdot23 - 6\cdot10)/6 = 9/6 = 3/2$. Formula [[#eq-simple]] agrees: $\bar x = 2$, $\bar y = 10/3$, $S_{xy} = (-1)(-4/3) + 0 + (1)(5/3) = 3$, $S_{xx} = 2$, so $\hat w = 3/2$ and $\hat b = 10/3 - 3 = 1/3$.

The fitted values are $1.833, 3.333, 4.833$, and the residuals $1/6, -1/3, 1/6$ sum to zero and are orthogonal to $(1, 2, 3)$: $1/6 - 2/3 + 1/2 = 0$. The residual sum of squares is $1/36 + 1/9 + 1/36 = 1/6$.
:::
:::

::: widget regression
points: 1,2; 2,3; 3,5
degree: 1
residuals: true
x: 0, 4
y: 0, 7
caption: The three points of [[#ex-three-points]] and their least-squares line $y = \tfrac13 + \tfrac32x$, with residuals drawn. Drag a point: the line moves to keep the residuals orthogonal to the columns $(1, 1, 1)$ and $(x_1, x_2, x_3)$ — so they always sum to zero — and the line always passes through the point of means. Drag one point far away to see how strongly a single outlier pulls a squared-error fit.
:::

How good is a fit? The residual sum of squares depends on the units of $y$; a scale-free summary compares it with the variation of $y$ around its mean.

::: definition Coefficient of determination {#def-r2}
For a least-squares fit with an intercept, the **total sum of squares** is $\operatorname{TSS} = \sum_i(y_i - \bar y)^2$ and the **coefficient of determination** is

$$
R^2 = 1 - \frac{\operatorname{RSS}}{\operatorname{TSS}},
$$

the fraction of the variance of $y$ in the sample that the model explains. It lies in $[0, 1]$ on the training data, since predicting the constant $\bar y$ is one of the models available.
:::

In [[#ex-three-points]], $\operatorname{TSS} = 16/9 + 1/9 + 25/9 = 14/3$, so $R^2 = 1 - (1/6)/(14/3) = 27/28\approx0.964$. Two cautions. Adding a feature can never lower $R^2$ on the training data — the old model is still available — so a high training $R^2$ is not evidence of a good model ([[ml-fundamentals/generalisation]]). And on new data $R^2$ can be negative, when the model predicts worse than the mean would.

## The probabilistic view {#sec-probabilistic}

Least squares was chosen above because it is convenient. A probabilistic model of the data explains when it is also *right*, and lets us say how uncertain the estimates are.

::: proposition Least squares is maximum likelihood {#prop-mle}
Suppose $y_i = \mathbf{x}_i^\top\boldsymbol\beta + \varepsilon_i$ with i.i.d. noise $\varepsilon_i\sim\Normal(0, \sigma^2)$. Then the maximum-likelihood estimate of $\boldsymbol\beta$ is the least-squares estimate, whatever $\sigma$ is, and the maximum-likelihood estimate of the noise variance is the mean squared residual, $\hat\sigma^2 = \operatorname{RSS}/n$.
:::

::: proof
The log-likelihood is $-\frac n2\log(2\pi\sigma^2) - \frac1{2\sigma^2}\lVert\mathbf{y} - X\boldsymbol\beta\rVert^2$. For each fixed $\sigma^2$ it is maximised over $\boldsymbol\beta$ by minimising the sum of squares, and the minimiser does not depend on $\sigma^2$. Maximising the result over $\sigma^2$ gives $\hat\sigma^2 = \operatorname{RSS}/n$; this is [[math-for-ml/estimation#prop-gaussian-mle]] and its exercise on unknown noise.
:::

The model also tells us how much the estimate would change on a different sample. Hold the design $X$ fixed and let only the noise be random.

::: proposition Mean and covariance of the least-squares estimate {#prop-unbiased}
If $\mathbf{y} = X\boldsymbol\beta + \boldsymbol\varepsilon$ with $X$ fixed and of full column rank, $\E\boldsymbol\varepsilon = \mathbf{0}$ and $\Cov(\boldsymbol\varepsilon) = \sigma^2I$, then

$$
\E\hat{\boldsymbol\beta} = \boldsymbol\beta,\qquad\Cov(\hat{\boldsymbol\beta}) = \sigma^2(X^\top X)^{-1}.
$$ {#eq-cov}
:::

::: proof
$\hat{\boldsymbol\beta} = (X^\top X)^{-1}X^\top(X\boldsymbol\beta + \boldsymbol\varepsilon) = \boldsymbol\beta + A\boldsymbol\varepsilon$ with $A = (X^\top X)^{-1}X^\top$. Hence $\E\hat{\boldsymbol\beta} = \boldsymbol\beta + A\,\E\boldsymbol\varepsilon = \boldsymbol\beta$, and $\Cov(\hat{\boldsymbol\beta}) = A\Cov(\boldsymbol\varepsilon)A^\top = \sigma^2(X^\top X)^{-1}X^\top X(X^\top X)^{-1} = \sigma^2(X^\top X)^{-1}$.
:::

No normality is needed here, only uncorrelated noise of constant variance. Under the same assumptions the **Gauss–Markov theorem** (stated here without proof; see Hastie, Tibshirani and Friedman, 2009, §3.2.2) says that least squares has the smallest variance among all *unbiased* estimators that are linear in $\mathbf{y}$. The word "unbiased" matters: [[#sec-ridge]] gives up unbiasedness to reduce variance, and often wins.

Formula [[#eq-cov]] shows what makes estimates precise. With one feature and an intercept, the variance of the slope is $\sigma^2/S_{xx}$: inputs spread widely pin the slope down, inputs bunched together leave it uncertain. With several features, near-collinear columns make $X^\top X$ nearly singular, some eigenvalues of $(X^\top X)^{-1}$ huge, and the corresponding combinations of coefficients almost undetermined.

::: example A standard error {#ex-se}
The noise standard deviation is $\sigma = 2$, and the inputs are $x = 0, 1, \dots, 9$, one observation each. What is the standard deviation of the fitted slope? How many observations at each of the two inputs $x = 0$ and $x = 9$ would give the same precision?
::: solution
$\bar x = 4.5$ and $S_{xx} = \sum_{k=0}^9(k - 4.5)^2 = 82.5$, so $\operatorname{sd}(\hat w) = \sigma/\sqrt{S_{xx}} = 2/\sqrt{82.5} = 0.220$. With $m$ observations at each end, $S_{xx} = 2m\cdot4.5^2 = 40.5m$, which equals $82.5$ for $m\approx2$: four observations at the extremes give the precision of ten spread evenly. Placing the inputs far apart is the best design for estimating a slope — *if* the relation really is linear, which two clusters of points cannot check.
:::
:::

## Basis functions {#sec-basis}

Because the model is linear in the parameters, nothing stops the features from being non-linear functions of the raw input. Choose **basis functions** $\phi_1, \dots, \phi_p$ and regress on $\boldsymbol\phi(x) = (\phi_1(x), \dots, \phi_p(x))$: the design matrix has entries $\Phi_{ij} = \phi_j(x_i)$ and everything above applies unchanged. With $\phi_j(x) = x^{j-1}$ this is **polynomial regression** of degree $p - 1$.

::: example Polynomial features {#ex-polynomial}
Fit a quadratic $y = \beta_0 + \beta_1x + \beta_2x^2$ to the points $(-1, 2)$, $(0, 1)$, $(1, 2)$, $(2, 6)$.
::: solution
The rows of $\Phi$ are $(1, x, x^2)$: $(1, -1, 1)$, $(1, 0, 0)$, $(1, 1, 1)$, $(1, 2, 4)$. Then

$$
\Phi^\top\Phi = \begin{pmatrix}4 & 2 & 6\\ 2 & 6 & 8\\ 6 & 8 & 18\end{pmatrix},\qquad\Phi^\top\mathbf{y} = \begin{pmatrix}11\\ 12\\ 28\end{pmatrix},
$$

and solving gives $\hat{\boldsymbol\beta} = (17/20, 1/20, 5/4) = (0.85, 0.05, 1.25)$. The residuals are $-0.05, 0.15, -0.15, 0.05$, with sum of squares $0.05$. A cubic, with four parameters for four points, would fit them exactly — and [[ml-fundamentals/generalisation]] explains why that is not an improvement.
:::
:::

Basis functions are the first instance of an idea that runs through the course: a linear method on well-chosen features can represent very non-linear functions. Choosing features by hand is **feature engineering**; replacing explicit features by inner products gives **kernels**; and learning the features from data is what neural networks do ([[ml-fundamentals/representations]]).

## Ridge regression {#sec-ridge}

When features are many or nearly collinear, $X^\top X$ is singular or badly conditioned, the least-squares solution is not unique or wildly variable, and the coefficients can be enormous — large positive and negative weights on two near-identical features that cancel on the training data. The remedy proposed by Hoerl and Kennard (1970) is to penalise large weights.

::: definition Ridge regression {#def-ridge}
For $\lambda > 0$, the **ridge** estimate minimises

$$
\lVert\mathbf{y} - X\boldsymbol\beta\rVert^2 + \lambda\lVert\boldsymbol\beta\rVert^2,
$$

and is given by

$$
\hat{\boldsymbol\beta}_\lambda = (X^\top X + \lambda I)^{-1}X^\top\mathbf{y}.
$$ {#eq-ridge}
:::

The formula follows by setting the gradient $2X^\top(X\boldsymbol\beta - \mathbf{y}) + 2\lambda\boldsymbol\beta$ to zero. The matrix $X^\top X + \lambda I$ is always invertible, because $\mathbf{v}^\top(X^\top X + \lambda I)\mathbf{v} = \lVert X\mathbf{v}\rVert^2 + \lambda\lVert\mathbf{v}\rVert^2 > 0$ for $\mathbf{v}\ne\mathbf{0}$, so ridge has a unique solution even when $p > n$. As $\lambda\to0$ it approaches least squares (the minimum-norm solution, when that is not unique); as $\lambda\to\infty$ the weights shrink to zero. In practice the intercept is not penalised — shifting all labels by a constant should shift the prediction, not change the slopes — which is done by centring the features and labels first, or by leaving the intercept's diagonal entry out of $\lambda I$.

The penalty looks like an engineering fix, but it has a principled reading: it is a prior belief that weights are small.

::: proposition Ridge regression is a MAP estimate {#prop-ridge-map}
Suppose $\mathbf{y}\mid\boldsymbol\beta\sim\Normal(X\boldsymbol\beta, \sigma^2I)$ and the prior is $\boldsymbol\beta\sim\Normal(\mathbf{0}, \tau^2I)$. Then the posterior is Gaussian, and its mode (and mean) is the ridge estimate with $\lambda = \sigma^2/\tau^2$.
:::

::: proof
By Bayes' rule, the log-posterior is the log-likelihood plus the log-prior, up to a constant:

$$
\log p(\boldsymbol\beta\mid\mathbf{y}) = -\frac1{2\sigma^2}\lVert\mathbf{y} - X\boldsymbol\beta\rVert^2 - \frac1{2\tau^2}\lVert\boldsymbol\beta\rVert^2 + \text{const} = -\frac1{2\sigma^2}\Big(\lVert\mathbf{y} - X\boldsymbol\beta\rVert^2 + \frac{\sigma^2}{\tau^2}\lVert\boldsymbol\beta\rVert^2\Big) + \text{const}.
$$

Maximising it is minimising the ridge objective with $\lambda = \sigma^2/\tau^2$. The exponent is a quadratic in $\boldsymbol\beta$ with negative definite second-order part, so the posterior is Gaussian; a Gaussian's mode equals its mean.
:::

This is [[math-for-ml/estimation#prop-weight-decay]] in the setting of regression. It explains how to think about $\lambda$: noisy data (large $\sigma$) or a confident prior (small $\tau$) call for strong shrinkage. In practice neither $\sigma$ nor $\tau$ is known, and $\lambda$ is chosen by validation ([[ml-fundamentals/generalisation#sec-cv]]); [[ml-fundamentals/regularisation]] studies what the penalty does to each direction in feature space and how it relates to early stopping and weight decay in neural networks.

::: example Ridge on centred data {#ex-ridge}
Centre the data of [[#ex-three-points]] and fit the slope by ridge regression with $\lambda = 1$ (intercept unpenalised).
::: solution
Centred, $x = -1, 0, 1$ and $y = -4/3, -1/3, 5/3$. With a single centred feature, [[#eq-ridge]] reads $\hat w_\lambda = \sum_ix_iy_i/(\sum_ix_i^2 + \lambda) = 3/(2 + 1) = 1$, against the least-squares slope $3/2$. The intercept is $\bar y - \hat w_\lambda\bar x = 10/3 - 2 = 4/3$ in the original coordinates. The slope has shrunk by the factor $S_{xx}/(S_{xx} + \lambda) = 2/3$: with only three points the penalty is strong, and it would matter little with three hundred.
:::
:::

## Fitting by gradient descent {#sec-gd}

The normal equations cost $O(np^2)$ operations to form and $O(p^3)$ to solve, which is fine for thousands of features but not for millions, and they do not extend to other losses. **Gradient descent** ([[math-for-ml/optimisation]]) needs only the gradient [[#eq-grad]]:

$$
\boldsymbol\beta_{t+1} = \boldsymbol\beta_t - \eta\,\frac2nX^\top(X\boldsymbol\beta_t - \mathbf{y}).
$$

Each step costs $O(np)$: one pass to compute the predictions, one to multiply the residuals back. **Stochastic** gradient descent replaces the full average by a random mini-batch, which is how all large models are trained; for linear regression with a single example per step it is the least-mean-squares rule of Widrow and Hoff (1960).

::: proposition Gradient descent on least squares {#prop-gd}
Let $H = \frac2nX^\top X$ be the Hessian of $\mathcal{L}$, with eigenvalues $0\le\mu_{\min}\le\dots\le\mu_{\max}$, and let $\hat{\boldsymbol\beta}$ be a minimiser. Then

$$
\boldsymbol\beta_{t+1} - \hat{\boldsymbol\beta} = (I - \eta H)(\boldsymbol\beta_t - \hat{\boldsymbol\beta}).
$$

If $\mu_{\min} > 0$ and $0 < \eta < 2/\mu_{\max}$, the iterates converge to $\hat{\boldsymbol\beta}$, and the component of the error along an eigenvector with eigenvalue $\mu$ is multiplied by $1 - \eta\mu$ at every step. If $\eta > 2/\mu_{\max}$, the iteration diverges from almost every starting point.
:::

::: proof
Since $X^\top X\hat{\boldsymbol\beta} = X^\top\mathbf{y}$, the gradient is $\frac2nX^\top X(\boldsymbol\beta_t - \hat{\boldsymbol\beta}) = H(\boldsymbol\beta_t - \hat{\boldsymbol\beta})$, which gives the recursion. $H$ is symmetric, so in an orthonormal basis of its eigenvectors ([[math-for-ml/matrix-decompositions#thm-spectral]]) the recursion decouples: each coordinate of the error is multiplied by $1 - \eta\mu$. All these factors have absolute value below $1$ exactly when $0 < \eta\mu < 2$ for every eigenvalue, that is $\eta < 2/\mu_{\max}$ (given $\mu_{\min} > 0$). If $\eta\mu_{\max} > 2$, the factor for the top eigenvector exceeds $1$ in absolute value and that component grows, unless it starts at exactly zero. This is [[math-for-ml/optimisation#prop-quadratic]] for the least-squares quadratic.
:::

The slowest component shrinks by $1 - \eta\mu_{\min}$ per step, and with the largest stable step $\eta\approx1/\mu_{\max}$ that is about $1 - 1/\kappa$, where $\kappa = \mu_{\max}/\mu_{\min}$ is the **condition number** of $X^\top X$. Features on very different scales, or strongly correlated, make $\kappa$ large and gradient descent slow. **Standardising** each feature — subtracting its mean and dividing by its standard deviation — is the cheapest cure, and exercise 9 shows that centring alone can reduce $\kappa$ dramatically.

::: example Step sizes for the three points {#ex-gd}
For the data of [[#ex-three-points]], find the largest stable learning rate and the convergence factor of the slowest direction at $\eta = 0.15$.
::: solution
$H = \frac23X^\top X = \begin{pmatrix}2 & 4\\ 4 & 28/3\end{pmatrix}$, with trace $34/3$ and determinant $56/3 - 16 = 8/3$. Its eigenvalues solve $\mu^2 - \frac{34}3\mu + \frac83 = 0$: $\mu_{\max}\approx11.09$ and $\mu_{\min}\approx0.240$, so $\kappa\approx46$. The largest stable rate is $2/11.09\approx0.180$. At $\eta = 0.15$ the slowest direction shrinks by $1 - 0.15\cdot0.240 = 0.964$ per step: after $30$ steps $0.964^{30}\approx0.33$ of the initial error in that direction remains, while the fast direction (factor $1 - 0.15\cdot11.09 = -0.66$) has long since died out, oscillating in sign as it went.
:::
:::

::: widget gradientdescent
f: (38 + 3x^2 + 14y^2 - 20x - 46y + 12x*y)/3
start: 2.5, 0
rate: 0.15
steps: 30
x: -1, 3
y: -1, 3
caption: The mean squared error of [[#ex-three-points]] as a function of the intercept ($x$ axis) and slope ($y$ axis), with minimum at $(1/3, 3/2)$. The long, thin valley is the condition number $\kappa\approx46$ of [[#ex-gd]]: gradient descent quickly reaches the valley floor, then crawls along it. Raise the rate beyond about $0.18$ and the iterates zig-zag across the valley and diverge; try the Newton method, which uses the Hessian and lands on the minimum in one step.
:::

::: quiz
Gradient descent on a least-squares problem converges, but very slowly. Which change is most likely to help without changing the solution?
- [ ] Doubling the learning rate until the loss explodes, then halving it
- [x] Standardising the features to zero mean and unit variance before fitting
- [ ] Adding a column of ones to the design matrix
- [ ] Replacing the squared loss by the absolute loss
::: solution
Slow convergence comes from a large condition number of $X^\top X$ ([[#prop-gd]]). Standardising the features usually reduces it a lot, and the fitted predictions are unchanged: rescaling a feature rescales its weight, and with an intercept, shifting a feature changes only the intercept. A larger learning rate cannot help beyond $2/\mu_{\max}$; adding a constant column is needed for an intercept but makes conditioning worse if the features are not centred; changing the loss changes the problem.
:::
:::

## A complete implementation {#sec-code}

The listing below fits a model with two features and an intercept to $100$ synthetic points, with true coefficients $(1, 2, -3)$ and noise standard deviation $0.5$, in three ways: by solving the normal equations with Gaussian elimination, by gradient descent, and by ridge regression with three values of $\lambda$. It uses only the Python standard library; with NumPy, `np.linalg.lstsq(X, y)` does the first part in one line and more stably.

```python
import random, math

rng = random.Random(1)
n, sigma = 100, 0.5
w_true = [1.0, 2.0, -3.0]                       # intercept, two slopes

X = [[1.0, rng.random(), rng.random()] for _ in range(n)]          # (n, 3), first column = 1
y = [sum(a * b for a, b in zip(row, w_true)) + rng.gauss(0, sigma) for row in X]

def solve(A, b):
    """Solve A x = b by Gaussian elimination with partial pivoting."""
    m = len(A)
    M = [row[:] + [bi] for row, bi in zip(A, b)]
    for k in range(m):
        p = max(range(k, m), key=lambda i: abs(M[i][k]))
        M[k], M[p] = M[p], M[k]
        for i in range(k + 1, m):
            f = M[i][k] / M[k][k]
            for j in range(k, m + 1):
                M[i][j] -= f * M[k][j]
    x = [0.0] * m
    for k in reversed(range(m)):
        x[k] = (M[k][m] - sum(M[k][j] * x[j] for j in range(k + 1, m))) / M[k][k]
    return x

def gram(X):                                    # X^T X, shape (3, 3)
    d = len(X[0])
    return [[sum(r[i] * r[j] for r in X) for j in range(d)] for i in range(d)]

def xty(X, y):                                  # X^T y, shape (3,)
    return [sum(r[i] * yi for r, yi in zip(X, y)) for i in range(len(X[0]))]

def predict(X, w):
    return [sum(a * b for a, b in zip(r, w)) for r in X]

# 1. Normal equations
w_ols = solve(gram(X), xty(X, y))
res = [yi - fi for yi, fi in zip(y, predict(X, w_ols))]
rss = sum(r * r for r in res)
ybar = sum(y) / n
r2 = 1 - rss / sum((yi - ybar) ** 2 for yi in y)
print("OLS  w =", [round(v, 3) for v in w_ols], " R^2 =", round(r2, 3),
      " sigma_hat =", round(math.sqrt(rss / n), 3))

# 2. Gradient descent on the mean squared error, from w = 0
w, eta = [0.0, 0.0, 0.0], 0.5
for t in range(1, 5001):
    r = [fi - yi for fi, yi in zip(predict(X, w), y)]            # residuals (n,)
    g = [2 / n * sum(ri * row[j] for ri, row in zip(r, X)) for j in range(3)]
    w = [wj - eta * gj for wj, gj in zip(w, g)]
    if t in (10, 100, 1000, 5000):
        print(f"GD step {t:4d}  w =", [round(v, 3) for v in w])

# 3. Ridge (intercept not penalised): (X^T X + lam * D) w = X^T y, D = diag(0, 1, 1)
for lam in (1.0, 10.0, 100.0):
    G = gram(X)
    for j in (1, 2):
        G[j][j] += lam
    print(f"ridge lam={lam:5.1f}  w =", [round(v, 3) for v in solve(G, xty(X, y))])
```

```text
OLS  w = [1.134, 2.128, -3.157]  R^2 = 0.827  sigma_hat = 0.477
GD step   10  w = [0.663, 1.345, -1.504]
GD step  100  w = [1.131, 2.129, -3.152]
GD step 1000  w = [1.134, 2.128, -3.157]
GD step 5000  w = [1.134, 2.128, -3.157]
ridge lam=  1.0  w = [1.062, 1.885, -2.779]
ridge lam= 10.0  w = [0.801, 0.932, -1.337]
ridge lam=100.0  w = [0.615, 0.154, -0.216]
```

The least-squares estimate is within about $0.16$ of the truth, consistent with [[#eq-cov]] for this design, and $\hat\sigma = 0.477$ is close to $0.5$ (slightly low, as the maximum-likelihood variance estimate is: it divides by $n$ rather than $n - p$). For this design the Hessian $H$ has eigenvalues from about $0.11$ to $3.0$, so $\eta = 0.5$ is stable ($< 2/3.0$) and the slowest error component shrinks by about $1 - 0.5\cdot0.11 = 0.94$ per step: after $100$ steps gradient descent agrees with the exact solution to two decimals, after $1000$ to all printed digits. Ridge shrinks the slopes towards zero as $\lambda$ grows, and the unpenalised intercept moves towards $\bar y$ to compensate.

::: warning A coefficient is not an importance, and not a cause
It is tempting to read $\hat w_j$ as "how much $x_j$ matters". But a coefficient depends on the units of its feature (measure area in square centimetres and its weight drops by a factor of $10^4$), on which other features are in the model (with two near-duplicate features the weight can be split between them in any proportion), and on the sampling of the data. Above all, it describes association in the data, not the effect of *intervening* on $x_j$: house prices regress positively on the number of bathrooms partly because large houses have more of both. Causal conclusions need experimental design or explicit causal assumptions, not a regression table.
:::

::: history
Adrien-Marie Legendre published the method of least squares in 1805, as an appendix on the orbits of comets; Carl Friedrich Gauss, who claimed to have used it since 1795, gave it a probabilistic justification in 1809 by assuming normal errors — the argument of [[#prop-mle]] — and in 1821–23 proved the optimality result now named after him and Andrey Markov. The word *regression* comes from Francis Galton's studies of heredity (1886), in which the children of unusually tall parents were on average less tall: their heights "regressed" towards the mean. Andrey Tikhonov's regularisation of ill-posed problems (1943, 1963) and Arthur Hoerl and Robert Kennard's ridge regression (1970) added the quadratic penalty. Bernard Widrow and Marcian Hoff's least-mean-squares rule (1960) fitted linear models one example at a time — stochastic gradient descent on the squared loss — for adaptive filters and the ADALINE neuron.
:::

::: summary
- Linear regression predicts $\mathbf{x}^\top\boldsymbol\beta$, linear in the parameters; the features may be any fixed functions of the input (basis functions).
- Least squares minimises $\frac1n\lVert\mathbf{y} - X\boldsymbol\beta\rVert^2$, a convex quadratic. Its minimisers solve the **normal equations** $X^\top X\boldsymbol\beta = X^\top\mathbf{y}$, uniquely when $X$ has full column rank.
- Geometrically the fitted values are the orthogonal projection of $\mathbf{y}$ onto the column space; residuals are orthogonal to every feature and, with an intercept, sum to zero.
- Under Gaussian noise least squares is maximum likelihood; the estimate is unbiased with covariance $\sigma^2(X^\top X)^{-1}$, so spread-out, uncorrelated features give precise estimates.
- **Ridge regression** $(X^\top X + \lambda I)^{-1}X^\top\mathbf{y}$ always has a unique solution and is the MAP estimate under a Gaussian prior, with $\lambda = \sigma^2/\tau^2$.
- Gradient descent converges for $\eta < 2/\mu_{\max}$ at a rate set by the condition number of $X^\top X$; standardise features to make it fast.
:::

## Exercises

::: exercise A slope by formula {level=1 check="5/2"}
Fit $y = b + wx$ to the points $(0, 1)$, $(1, 2)$, $(2, 6)$ using [[#eq-simple]]. What is $\hat w$?
::: solution
$\bar x = 1$, $\bar y = 3$, $S_{xy} = (-1)(-2) + 0\cdot(-1) + (1)(3) = 5$ and $S_{xx} = 2$, so $\hat w = 5/2$ and $\hat b = 3 - 5/2 = 1/2$.
:::
:::

::: exercise Its coefficient of determination {level=1 check="25/28"}
For the fit of the previous exercise, compute the residuals, RSS, TSS and $R^2$.
::: solution
The fitted values are $0.5, 3, 5.5$, the residuals $0.5, -1, 0.5$ (summing to zero, as they must), and $\operatorname{RSS} = 0.25 + 1 + 0.25 = 1.5$. $\operatorname{TSS} = 4 + 1 + 9 = 14$. So $R^2 = 1 - 1.5/14 = 25/28\approx0.893$.
:::
:::

::: exercise One-dimensional ridge {level=1 check="11/6"}
Without an intercept, fit $y = wx$ to the points $(1, 2)$ and $(2, 4.5)$ by ridge regression with $\lambda = 1$. What is $\hat w_\lambda$, and what is the least-squares slope?
::: solution
With one feature and no intercept, [[#eq-ridge]] gives $\hat w_\lambda = \sum x_iy_i/(\sum x_i^2 + \lambda) = (2 + 9)/(5 + 1) = 11/6\approx1.833$. The least-squares slope is $11/5 = 2.2$.
:::
:::

::: exercise The largest stable learning rate {level=2 check="3/14"}
Gradient descent minimises $\frac1n\sum_i(y_i - wx_i)^2$ (one weight, no intercept) on the inputs $x = 1, 2, 3$. Above which learning rate does it diverge?
::: solution
The Hessian is the second derivative $\frac2n\sum_ix_i^2 = \frac23\cdot14 = 28/3$. By [[#prop-gd]] the iteration converges for $\eta < 2/(28/3) = 3/14\approx0.214$ and diverges above it. At $\eta = 3/28$ (half the limit) it converges in one step, since then $1 - \eta\mu = 0$.
:::
:::

::: exercise A prior strength {level=2 check="1/16"}
Measurements have Gaussian noise with standard deviation $\sigma = 0.5$, and prior experience suggests the coefficients are roughly $\Normal(0, 2^2)$. Which ridge penalty $\lambda$ (for the objective $\lVert\mathbf{y} - X\boldsymbol\beta\rVert^2 + \lambda\lVert\boldsymbol\beta\rVert^2$) gives the MAP estimate?
::: solution
By [[#prop-ridge-map]], $\lambda = \sigma^2/\tau^2 = 0.25/4 = 1/16$. If the objective were the *mean* squared error plus $\lambda'\lVert\boldsymbol\beta\rVert^2$, the matching value would be $\lambda' = \lambda/n$, which shrinks as data accumulate.
:::
:::

::: exercise The precision of a slope {level=2 check="1/sqrt(10)"}
Five observations are taken at $x = -2, -1, 0, 1, 2$ with independent noise of standard deviation $\sigma = 1$. What is the standard deviation of the least-squares slope?
::: solution
With an intercept, [[#eq-cov]] gives $\Var(\hat w) = \sigma^2/S_{xx}$, where $S_{xx} = 4 + 1 + 0 + 1 + 4 = 10$. So $\operatorname{sd}(\hat w) = 1/\sqrt{10}\approx0.316$. (Here $\bar x = 0$, so $X^\top X = \operatorname{diag}(5, 10)$ and the intercept and slope estimates are uncorrelated.)
:::
:::

::: exercise Simple regression {level=2}
Solve the normal equations for $y = b + wx$ in general and derive [[#eq-simple]].
::: solution
With rows $(1, x_i)$, the normal equations are $nb + w\sum x_i = \sum y_i$ and $b\sum x_i + w\sum x_i^2 = \sum x_iy_i$. The first gives $b = \bar y - w\bar x$. Substituting in the second, $w(\sum x_i^2 - n\bar x^2) = \sum x_iy_i - n\bar x\bar y$. Now $\sum x_i^2 - n\bar x^2 = \sum(x_i - \bar x)^2 = S_{xx}$ and $\sum x_iy_i - n\bar x\bar y = \sum(x_i - \bar x)(y_i - \bar y) = S_{xy}$, so $w = S_{xy}/S_{xx}$, provided $S_{xx} > 0$ — that is, provided not all $x_i$ are equal, which is the full-rank condition.
:::
:::

::: exercise Ridge as least squares on augmented data {level=2}
Show that the ridge estimate equals the ordinary least-squares estimate for the augmented data $\tilde X = \begin{pmatrix}X\\ \sqrt\lambda I_p\end{pmatrix}$ and $\tilde{\mathbf{y}} = \begin{pmatrix}\mathbf{y}\\ \mathbf{0}\end{pmatrix}$. Interpret the extra rows.
::: solution
$\lVert\tilde{\mathbf{y}} - \tilde X\boldsymbol\beta\rVert^2 = \lVert\mathbf{y} - X\boldsymbol\beta\rVert^2 + \lVert\mathbf{0} - \sqrt\lambda\boldsymbol\beta\rVert^2$, which is the ridge objective. Equivalently $\tilde X^\top\tilde X = X^\top X + \lambda I$ and $\tilde X^\top\tilde{\mathbf{y}} = X^\top\mathbf{y}$, so the normal equations of the augmented problem are [[#eq-ridge]]. The $p$ extra rows are imaginary observations, one per coefficient, saying "the response is $0$ when only feature $j$ is present, with strength $\sqrt\lambda$". They pull every coefficient towards zero, and $\tilde X$ has full column rank for any $X$, which is another proof that ridge always has a unique solution.
:::
:::

::: exercise Centring improves conditioning {level=3}
For the inputs $x = 1, 2, 3$ with an intercept, compute the condition number of $X^\top X$ before and after centring the input ($x\mapsto x - 2$). Then explain in general why centring a feature changes only the intercept of the fit.
::: solution
Before centring, $X^\top X = \begin{pmatrix}3 & 6\\ 6 & 14\end{pmatrix}$, with eigenvalues $(17\pm\sqrt{265})/2$, about $16.64$ and $0.360$: $\kappa\approx46$, as in [[#ex-gd]]. After centring the inputs are $-1, 0, 1$ and $X^\top X = \operatorname{diag}(3, 2)$, so $\kappa = 1.5$ and gradient descent with $\eta = 1/\mu_{\max}$ removes most of the error within a few steps. In general, the column $\mathbf{x} - \bar x\mathbf{1}$ is a combination of the old columns $\mathbf{x}$ and $\mathbf{1}$, so the column space — and hence the projection $\hat{\mathbf{y}}$ — is unchanged; writing $b + w(x - \bar x) = (b - w\bar x) + wx$ shows that the slope is the same and only the intercept is re-expressed. Centring removes the correlation between the intercept column and the feature, which is what made $X^\top X$ ill-conditioned.
:::
:::

::: exercise The hat matrix and an unbiased noise estimate {level=3}
Let $X\in\R^{n\times p}$ have full column rank and $\mathbf{y} = X\boldsymbol\beta + \boldsymbol\varepsilon$ with $\E\boldsymbol\varepsilon = \mathbf{0}$, $\Cov(\boldsymbol\varepsilon) = \sigma^2I$. Show that $\operatorname{tr}P = p$ for the hat matrix of [[#prop-projection]], that the residuals are $(I - P)\boldsymbol\varepsilon$, and that $\E[\operatorname{RSS}] = (n - p)\sigma^2$. Which estimate of $\sigma^2$ is unbiased?
::: solution
$\operatorname{tr}P = \operatorname{tr}\big(X(X^\top X)^{-1}X^\top\big) = \operatorname{tr}\big((X^\top X)^{-1}X^\top X\big) = \operatorname{tr}I_p = p$, by the cyclic property of the trace. The residuals are $\mathbf{y} - P\mathbf{y} = (I - P)(X\boldsymbol\beta + \boldsymbol\varepsilon) = (I - P)\boldsymbol\varepsilon$, because $PX = X$. Since $I - P$ is symmetric and idempotent, $\operatorname{RSS} = \boldsymbol\varepsilon^\top(I - P)\boldsymbol\varepsilon$, and $\E[\boldsymbol\varepsilon^\top A\boldsymbol\varepsilon] = \operatorname{tr}(A\Cov(\boldsymbol\varepsilon)) = \sigma^2\operatorname{tr}A$ for any fixed matrix $A$. Hence $\E[\operatorname{RSS}] = \sigma^2(n - p)$, and $\operatorname{RSS}/(n - p)$ is unbiased, while the maximum-likelihood estimate $\operatorname{RSS}/n$ is biased low — each fitted parameter "uses up" one dimension of the noise. This generalises [[math-for-ml/estimation]]'s $N - 1$ correction, which is the case $p = 1$ (a constant model).
:::
:::

::: exercise Polynomial least squares by hand {level=3 check="5/4"}
Verify [[#ex-polynomial]]: form $\Phi^\top\Phi$ and $\Phi^\top\mathbf{y}$ for the points $(-1, 2)$, $(0, 1)$, $(1, 2)$, $(2, 6)$ and solve the normal equations exactly. What is the coefficient of $x^2$?
::: solution
The sums are $\sum1 = 4$, $\sum x = 2$, $\sum x^2 = 6$, $\sum x^3 = 8$, $\sum x^4 = 18$, $\sum y = 11$, $\sum xy = -2 + 0 + 2 + 12 = 12$, $\sum x^2y = 2 + 0 + 2 + 24 = 28$, giving the matrices of the example. Subtract $\frac12$ of the first equation from the second and $\frac32$ of the first from the third: $5\beta_1 + 5\beta_2 = 6.5$ and $5\beta_1 + 9\beta_2 = 11.5$. Subtracting, $4\beta_2 = 5$, so $\beta_2 = 5/4$; then $\beta_1 = 1.3 - 1.25 = 0.05$, and from $4\beta_0 + 2\beta_1 + 6\beta_2 = 11$, $\beta_0 = (11 - 0.1 - 7.5)/4 = 0.85$. Running the listing's `solve` on these matrices returns the same values.
:::
:::
