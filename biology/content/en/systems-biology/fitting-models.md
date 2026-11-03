Every model in this course has parameters — rate constants, thresholds, Hill coefficients, diffusion coefficients — and most of them cannot be looked up. They must be inferred from experiments: a fluorescence time course after induction, the decay of a protein after synthesis is blocked, a dose–response curve, a distribution of mRNA counts across cells. And often two or more models compete to explain the same data: is a gene negatively autoregulated or simply regulated with a fast-degraded product? Is a response graded or bistable? The tools for answering such questions are statistical, and using them well is as much a part of systems biology as writing down the equations.

This chapter covers the essentials. We set up the problem of **parameter estimation** as the fitting of a model plus a description of measurement error, by **least squares** and **maximum likelihood**; show how to quantify the uncertainty of estimates; meet the problem of **identifiability**, which asks whether the data can determine the parameters at all; and compare models by **likelihood-ratio tests** and **information criteria**, with a glimpse of Bayesian methods and of the design of informative experiments. The statistical foundations — likelihood, estimation, regression and linear models — are developed in [[biostatistics/estimation]], [[biostatistics/regression]] and [[biostatistics/linear-models]], and more formally in [estimation](/learn/maths/lesson.php?c=statistics&l=estimation) and [Bayesian inference](/learn/maths/lesson.php?c=statistics&l=bayesian) in Maths Atlas. The stochastic models of [[systems-biology/noise]] supply the error distributions for single-cell data.

## From model to likelihood

A kinetic model predicts the noise-free value of a measured quantity as a function of time, input or condition: $f(t; \boldsymbol{\theta})$, with parameter vector $\boldsymbol{\theta}$. Real measurements scatter around the prediction because of instrument noise, sample-to-sample variation and, in single cells, molecular noise. To connect the two we need an **observation model**.

::: definition Observation model and likelihood {#def-likelihood}
An **observation model** specifies the probability distribution of each measurement $y_i$ given the parameters. The commonest is additive Gaussian error,

$$
y_i = f(t_i; \boldsymbol{\theta}) + \epsilon_i, \qquad \epsilon_i \sim \mathcal{N}(0, \sigma_i^2), \quad \text{independent}.
$$ {#eq-obs}

The **likelihood** is the probability (density) of the observed data as a function of the parameters, $L(\boldsymbol{\theta}) = \prod_i p(y_i \mid \boldsymbol{\theta})$, and the **maximum-likelihood estimate** (MLE) $\hat{\boldsymbol{\theta}}$ is the parameter value that maximises it.
:::

::: proposition Least squares as maximum likelihood {#prop-ls}
Under the Gaussian observation model [[#eq-obs]],

$$
-2\ln L(\boldsymbol{\theta}) = \sum_i \frac{\bigl(y_i - f(t_i; \boldsymbol{\theta})\bigr)^2}{\sigma_i^2} + \text{const} = \chi^2(\boldsymbol{\theta}) + \text{const},
$$ {#eq-chi2}

so the maximum-likelihood estimate minimises the **weighted sum of squared residuals** $\chi^2$. If all $\sigma_i = \sigma$, it minimises the ordinary sum of squared residuals $\mathrm{SSR}(\boldsymbol{\theta}) = \sum_i(y_i - f(t_i; \boldsymbol{\theta}))^2$, and at the optimum the MLE of the error variance is $\hat\sigma^2 = \mathrm{SSR}(\hat{\boldsymbol{\theta}})/n$ for $n$ data points.
:::

::: proof
For independent Gaussian errors, $p(y_i\mid\boldsymbol{\theta}) = (2\pi\sigma_i^2)^{-1/2}\exp\bigl[-(y_i - f_i)^2/(2\sigma_i^2)\bigr]$ with $f_i = f(t_i; \boldsymbol{\theta})$. Taking $-2\ln$ of the product gives $\sum_i(y_i - f_i)^2/\sigma_i^2 + \sum_i\ln(2\pi\sigma_i^2)$, and the second sum does not depend on $\boldsymbol{\theta}$. With equal $\sigma$ unknown, $-2\ln L = \mathrm{SSR}/\sigma^2 + n\ln(2\pi\sigma^2)$; minimising over $\sigma^2$ gives $\hat\sigma^2 = \mathrm{SSR}/n$ and $-2\ln L = n\ln(\mathrm{SSR}/n) + \text{const}$, a form used for model comparison below.
:::

Least squares is therefore not an arbitrary choice but the right one when errors are independent, Gaussian and of known relative size. When they are not, the observation model should change. Fluorescence measurements often have errors proportional to the signal (fit $\ln y$, or weight by $1/y^2$); counts of molecules or cells are Poisson or negative binomial ([[systems-biology/noise]]); and measurements from the same culture over time are correlated. Getting the observation model right matters as much as getting the kinetic model right.

### Linear and nonlinear fitting

If $f$ depends linearly on the parameters, minimising SSR is linear regression, with a closed-form solution ([[biostatistics/linear-models]]). Most kinetic models are nonlinear in their parameters — $e^{-kt}$, $V s/(K + s)$ — and must be fitted by iterative optimisation: Gauss–Newton and Levenberg–Marquardt methods for least squares, gradient-based or global methods for general likelihoods. Sometimes a transformation makes a model linear: $y = Ae^{-kt}$ becomes $\ln y = \ln A - kt$. This is legitimate *if* the errors are multiplicative (constant on the log scale); otherwise it distorts the error structure.

::: warning "Linearise the model and fit a straight line"
The Lineweaver–Burk plot of $1/v$ against $1/[S]$ turns Michaelis–Menten kinetics into a straight line, and generations of students fitted $K_\mathrm{m}$ and $V_\mathrm{max}$ by linear regression on it. But taking reciprocals hugely amplifies the errors of the smallest rates, at low substrate, and gives those least reliable points the greatest leverage on the line. The resulting estimates can be badly biased. With modern computers there is no reason to linearise for fitting: fit the nonlinear model directly with an error model appropriate to the raw measurements, and use linearised plots only to display data.
:::

::: example Estimating a degradation rate {#ex-decay}
After protein synthesis is blocked, a fluorescent protein's level (arbitrary units) is measured hourly: 100, 74, 52, 40, 28 and 21 at $t = 0, 1, \dots, 5$ h (illustrative data). Errors are thought to be roughly proportional to the signal. Estimate the decay rate constant and half-life, with a standard error.
::: solution
With proportional errors, the log-transformed data $\ln y = 4.605, 4.304, 3.951, 3.689, 3.332, 3.045$ have roughly constant error, and $\ln y = \ln A - kt$ is linear. Least-squares regression of $\ln y$ on $t$ gives slope $-0.314$ h⁻¹ (intercept $\ln A = 4.605$, so $A = 100.0$), so $\hat k = 0.314$ h⁻¹ and the half-life is $\ln2/0.314 = 2.21$ h. The residual standard error gives a standard error for the slope of $0.005$ h⁻¹, so $k = 0.314 \pm 0.005$ h⁻¹ (approximately a 95 % confidence interval of $0.314 \pm 2.78\times0.005 = 0.30$–$0.33$ h⁻¹, using the $t$ distribution with 4 degrees of freedom). A nonlinear least-squares fit on the original scale, appropriate for constant additive errors, gives almost the same answer here ($\hat k = 0.315$ h⁻¹, $\hat A = 100.2$) because the data are close to exponential.
:::
:::

::: widget regression
points: 0,4.605; 1,4.304; 2,3.951; 3,3.689; 4,3.332; 5,3.045
degree: 1
caption: The decay data of [[#ex-decay]] on a logarithmic scale: $\ln y$ against time $t$ in hours, with the least-squares line, whose slope is $-k$. Drag the last point down, as if a measurement at 5 h had been contaminated by background subtraction, and see how much the estimated decay rate changes: points at the ends of the time range have the greatest leverage on a slope.
:::

## Uncertainty of estimates

An estimate without an uncertainty is of little use. For nonlinear models, the standard approach approximates the likelihood near its maximum by a quadratic.

::: proposition Approximate covariance of least-squares estimates {#prop-cov}
For a model fitted by least squares with constant error variance $\sigma^2$, let $\mathbf{J}$ be the $n\times p$ **sensitivity matrix** with entries $J_{ij} = \partial f(t_i; \boldsymbol{\theta})/\partial\theta_j$ evaluated at $\hat{\boldsymbol{\theta}}$. For small errors, the estimates are approximately normally distributed with covariance matrix

$$
\operatorname{Cov}(\hat{\boldsymbol{\theta}}) \approx \sigma^2\left(\mathbf{J}^\mathsf{T}\mathbf{J}\right)^{-1},
$$ {#eq-cov}

with $\sigma^2$ estimated by $s^2 = \mathrm{SSR}(\hat{\boldsymbol{\theta}})/(n - p)$. The square roots of the diagonal entries are the **standard errors** of the parameters; the off-diagonal entries describe how the estimates are correlated. The matrix $\mathbf{J}^\mathsf{T}\mathbf{J}/\sigma^2$ is the **Fisher information** for this model.
:::

::: proof
Near $\hat{\boldsymbol{\theta}}$, linearise the model: $f(t_i; \boldsymbol{\theta}) \approx f(t_i; \hat{\boldsymbol{\theta}}) + \sum_jJ_{ij}(\theta_j - \hat\theta_j)$. Least squares in the linearised model is ordinary linear regression with design matrix $\mathbf{J}$, for which the covariance of the estimates is $\sigma^2(\mathbf{J}^\mathsf{T}\mathbf{J})^{-1}$ ([[biostatistics/linear-models]]). The approximation is good when the model is nearly linear over the region of plausible parameter values — that is, when errors are small and the parameters well determined.
:::

The following program fits the Michaelis–Menten equation to illustrative initial-rate data by the Gauss–Newton method, which repeatedly solves the linearised problem, and computes standard errors by [[#eq-cov]].

```python
import math

# Illustrative initial-rate data: substrate S (uM) and rate v (uM/min)
S = [0.5, 1.0, 2.0, 4.0, 8.0, 16.0]
v = [2.2, 3.1, 5.3, 6.4, 8.3, 8.7]

def model(s, V, K):
    return V * s / (K + s)

def fit(V, K, iters=20):
    """Gauss-Newton least squares for the Michaelis-Menten parameters."""
    for _ in range(iters):
        r = [vi - model(s, V, K) for s, vi in zip(S, v)]          # residuals
        J = [(s / (K + s), -V * s / (K + s)**2) for s in S]       # d model / d(V, K)
        a = sum(j[0]*j[0] for j in J); b = sum(j[0]*j[1] for j in J)
        c = sum(j[1]*j[1] for j in J)                             # J^T J = [[a, b], [b, c]]
        g0 = sum(j[0]*ri for j, ri in zip(J, r)); g1 = sum(j[1]*ri for j, ri in zip(J, r))
        det = a*c - b*b
        V += ( c*g0 - b*g1) / det                                 # solve (J^T J) d = J^T r
        K += (-b*g0 + a*g1) / det
    ssr = sum((vi - model(s, V, K))**2 for s, vi in zip(S, v))
    s2 = ssr / (len(S) - 2)                                       # residual variance
    se_V, se_K = math.sqrt(s2 * c / det), math.sqrt(s2 * a / det) # from s2 (J^T J)^-1
    corr = -b / math.sqrt(a * c)
    return V, K, ssr, se_V, se_K, corr

V, K, ssr, se_V, se_K, corr = fit(V=8.0, K=1.0)
print(f"Vmax = {V:.2f} +/- {se_V:.2f} uM/min, Km = {K:.2f} +/- {se_K:.2f} uM")
print(f"SSR = {ssr:.3f}, correlation of estimates = {corr:.2f}")
# Vmax = 9.91 +/- 0.36 uM/min, Km = 1.93 +/- 0.23 uM
# SSR = 0.373, correlation of estimates = 0.83
```

The estimates are close to the values used to construct the illustrative data ($V_\mathrm{max} = 10$, $K_\mathrm{m} = 2$). Note the strong positive correlation between them: a slightly larger $V_\mathrm{max}$ can be compensated by a slightly larger $K_\mathrm{m}$ with little change in fit, because the data constrain mainly the curve's initial slope $V_\mathrm{max}/K_\mathrm{m}$ and its plateau, and the highest substrate concentration (16 μM, eight times $K_\mathrm{m}$) still does not quite reach the plateau. More points at high substrate would decouple them.

::: widget plot
f: (100 - A)^2 + (74 - A*exp(-x))^2 + (52 - A*exp(-2x))^2 + (40 - A*exp(-3x))^2 + (28 - A*exp(-4x))^2 + (21 - A*exp(-5x))^2
x: 0.2, 0.45
y: 0, 300
sliders: A=100:90:110:0.5
labels: \mathrm{SSR}(k)
caption: The sum of squared residuals for the decay data of [[#ex-decay]] as a function of the rate constant $k$ (horizontal axis, h⁻¹), with the initial amount $A$ set by the slider. With $A = 100$ the curve has a sharp minimum near $k = 0.31$: the data determine $k$ well. Change $A$ and the minimum moves — a larger $A$ is best matched by a larger $k$ — showing the correlation between the two estimates. The width of the valley at a height $s^2$ above the minimum is a measure of the uncertainty in $k$.
:::

### Profile likelihood

The quadratic approximation can fail badly for nonlinear models, particularly when parameters are poorly determined. A more reliable approach, used routinely in systems biology since the work of Andreas Raue, Jens Timmer and colleagues (2009), is the **profile likelihood**: for each value of one parameter $\theta_j$, re-optimise all the others and record the best achievable $-2\ln L$. A confidence interval for $\theta_j$ at level $1 - \alpha$ consists of the values for which the profile lies within $\chi^2_{1, 1-\alpha}$ (3.84 for 95 %) of its minimum. Profiles also diagnose identifiability: a profile that stays flat in one or both directions reveals a parameter the data cannot pin down.

## Identifiability

::: definition Structural and practical identifiability {#def-identifiability}
A parameter is **structurally identifiable** if, with perfect, noise-free data of the type available, it could be determined uniquely (or up to a finite number of alternatives); it is **structurally non-identifiable** if different parameter values produce exactly the same predicted measurements, so that no amount of data of that type can distinguish them. A structurally identifiable parameter is **practically non-identifiable** when the available, noisy and finite data constrain it only weakly — its confidence interval is very wide or unbounded on one side.
:::

Structural non-identifiability usually arises because only combinations of parameters affect the measurements. We have already met examples. In the quasi-steady-state Michaelis–Menten model, steady-state rate data determine $V_\mathrm{max} = k_2E_T$ and $K_\mathrm{m} = (k_{-1} + k_2)/k_1$ but not the three rate constants separately ([[systems-biology/modelling-principles#prop-qssa]]). In the production–removal model, measurements in arbitrary fluorescence units determine the shape of the response — hence $\alpha$ — but not $\beta$ separately from the unknown scale factor between fluorescence and molecule numbers. A third example is more surprising.

::: example A symmetry in the two-stage model {#ex-symmetry}
In the two-stage model of gene expression ([[systems-biology/gene-expression-dynamics]]), after transcription is switched on at $t = 0$ the protein follows

$$
p(t) = p^*\left[1 - \frac{\gamma_me^{-\gamma_pt} - \gamma_pe^{-\gamma_mt}}{\gamma_m - \gamma_p}\right], \qquad p^* = \frac{k_mk_p}{\gamma_m\gamma_p}.
$$

Show that if only the protein is measured, the mRNA and protein removal rates are structurally non-identifiable. What extra measurement would resolve this?
::: solution
Swap $\gamma_m$ and $\gamma_p$. The fraction becomes $(\gamma_pe^{-\gamma_mt} - \gamma_me^{-\gamma_pt})/(\gamma_p - \gamma_m)$, which equals the original after multiplying numerator and denominator by $-1$; and $p^*$ is symmetric in the two rates. So the parameter sets $(\gamma_m, \gamma_p) = (0.2, 0.02)$ and $(0.02, 0.2)$ min⁻¹, with the same $k_mk_p$, predict identical protein time courses: one cannot tell from protein data alone whether the mRNA is the fast or the slow species. Measuring mRNA directly (by RT-qPCR or smFISH), or measuring the decay of protein after translation is blocked, breaks the symmetry. In practice prior knowledge — bacterial mRNAs are short-lived — resolves it, but the example shows how a model can fit data perfectly while being wrong about mechanism.
:::
:::

::: widget plot
f: 1 - (a*exp(-b*x) - b*exp(-a*x))/(a - b); 1 - (b*exp(-a*x) - a*exp(-b*x))/(b - a); 1 - exp(-b*x)
x: 0, 30
y: 0, 1.05
sliders: a=0.5:0.05:2:0.01; b=0.1:0.01:0.4:0.01
labels: p(t)/p^*,\ (\gamma_m, \gamma_p) = (a, b); p(t)/p^*,\ (\gamma_m, \gamma_p) = (b, a); \text{one-stage model, rate } b
caption: Protein accumulation after induction in the two-stage model (time in minutes, protein as a fraction of its steady state). The first two curves use the removal rates $(a, b)$ and $(b, a)$ for mRNA and protein: they lie exactly on top of each other for every choice of the sliders, so protein data alone cannot say which rate belongs to which species. The third curve is the one-stage model with rate $b$: it differs only by a short initial lag when $a \gg b$, which is why fitted mRNA rates are often practically non-identifiable too. (Keep $a \ne b$; the formula is undefined when they are equal.)
:::

### Sloppy models

Even when every parameter is structurally identifiable, models of biological networks are often **sloppy**: Ryan Gutenkunst, James Sethna and colleagues found in 2007, analysing 17 published systems-biology models, that the eigenvalues of the Fisher information matrix are spread roughly evenly over many orders of magnitude. A few combinations of parameters ("stiff" directions) are tightly constrained by the data, while many others ("sloppy" directions) can vary by orders of magnitude with little effect on the fit. The individual rate constants are then poorly determined, even though the model's *predictions* for similar experiments may be well determined. The practical message is to report uncertainty in predictions, not only in parameters, and to design experiments that probe the sloppy directions when individual parameters matter.

::: quiz
A model of a signalling pathway fits time-course data well, but the profile likelihood of one rate constant is flat from $10^{-2}$ to $10^{3}$ s⁻¹ and rises only below $10^{-2}$. What should you conclude?
- [ ] The parameter is about $10^{-2}$ s⁻¹, since that is where the profile starts to rise.
- [x] The data give only a lower bound for the parameter; it is practically (or structurally) non-identifiable from above, and the reaction may be fast enough to be treated as at equilibrium.
- [ ] The model is wrong and must be rejected.
- [ ] The fitting algorithm has failed and should be restarted.
::: solution
A one-sided flat profile means that any value above about $10^{-2}$ s⁻¹ fits equally well: the data show only that the step is not slower than that. This often signals a reaction that is fast compared with the time resolution of the experiment, which can then be replaced by a quasi-steady-state assumption, removing the parameter. The model is not thereby wrong, and the optimiser has not failed.
:::
:::

## Choosing between models

Suppose two models are proposed for the same data. A more complex model, with more parameters, will usually fit at least as well — a model with as many parameters as data points can fit them exactly. Fitting better is therefore not enough; the improvement must be weighed against the added complexity.

::: proposition Likelihood-ratio test for nested models {#prop-lrt}
If model 0 is a special case of model 1 (obtained by fixing $q$ of its parameters), and model 0 is true, then for large samples the statistic

$$
\Lambda = 2\bigl[\ln L_1(\hat{\boldsymbol{\theta}}_1) - \ln L_0(\hat{\boldsymbol{\theta}}_0)\bigr]
$$ {#eq-lrt}

is approximately $\chi^2$-distributed with $q$ degrees of freedom (Wilks's theorem). Model 0 is rejected at level $\alpha$ if $\Lambda$ exceeds the $1 - \alpha$ quantile of $\chi^2_q$. With Gaussian errors of unknown, common variance and $n$ data points, $\Lambda = n\ln(\mathrm{SSR}_0/\mathrm{SSR}_1)$. **Assumptions:** nested models, regularity conditions (the fixed parameters do not lie on the boundary of the parameter space), large $n$.
:::

For models that are not nested, or to rank several models at once, **information criteria** are used.

::: definition Information criteria {#def-aic}
For a model with $p$ fitted parameters and maximised likelihood $\hat L$, fitted to $n$ data points, the **Akaike information criterion** and the **Bayesian (Schwarz) information criterion** are

$$
\mathrm{AIC} = 2p - 2\ln\hat L, \qquad \mathrm{BIC} = p\ln n - 2\ln\hat L .
$$ {#eq-aic}

Lower values are preferred. With Gaussian errors, $-2\ln\hat L = n\ln(\mathrm{SSR}/n) + \text{const}$. AIC (Hirotugu Akaike, 1973–1974) estimates how well a model will predict new data; BIC (Gideon Schwarz, 1978) approximates the posterior probability of the model and penalises parameters more heavily when $n > 7$. Differences of less than about 2 are not usually considered meaningful.
:::

::: example One exponential or two? {#ex-model-choice}
A protein decay curve of $n = 20$ points is fitted by a single exponential (2 parameters: amplitude and rate) with $\mathrm{SSR} = 4.8$, and by the sum of two exponentials (4 parameters), as expected if the protein exists in a stable and an unstable pool, with $\mathrm{SSR} = 3.9$. Compare the models by a likelihood-ratio test, AIC and BIC.
::: solution
The models are nested (the two-exponential model reduces to one exponential if the second amplitude is zero, though that lies on a boundary, so Wilks's theorem is only approximate here). $\Lambda = 20\ln(4.8/3.9) = 20\times0.208 = 4.15$, with $q = 2$; the 95 % critical value of $\chi^2_2$ is 5.99, so the single exponential is not rejected ($p \approx 0.13$).

Information criteria, using $-2\ln\hat L = n\ln(\mathrm{SSR}/n)$: for one exponential, $20\ln(0.24) = -28.54$, so $\mathrm{AIC} = -28.54 + 4 = -24.54$ and $\mathrm{BIC} = -28.54 + 2\ln20 = -22.55$. For two exponentials, $20\ln(0.195) = -32.70$, so $\mathrm{AIC} = -32.70 + 8 = -24.70$ and $\mathrm{BIC} = -32.70 + 4\ln20 = -20.71$. AIC barely distinguishes them (difference 0.15), and BIC prefers the single exponential by 1.8. The data give no good reason to postulate two pools; an experiment designed to separate them — for instance, pulse labelling with sampling over a longer time — would be needed.
:::
:::

::: warning "The model that fits best is the right one"
Goodness of fit is necessary but far from sufficient. Different mechanisms can predict indistinguishable data (structural non-identifiability between *models*), a flexible model can fit noise, and a model can fit for the wrong reasons. The strongest evidence for a model is **successful prediction** of an experiment not used in fitting — a mutant, a new input, a perturbation of a specific interaction — ideally one for which the competing models make different predictions. Cross-validation, which fits on part of the data and tests on the rest, is a useful substitute when new experiments are not possible.
:::

### Bayesian inference

In the Bayesian approach, parameters have probability distributions expressing what is known about them. Prior knowledge (that a protein half-life lies between minutes and days, say) is encoded in a **prior** $p(\boldsymbol{\theta})$, and combined with the likelihood by Bayes' theorem to give the **posterior** $p(\boldsymbol{\theta}\mid\text{data}) \propto L(\boldsymbol{\theta})\,p(\boldsymbol{\theta})$. Posteriors of kinetic models are rarely available in closed form and are explored by **Markov chain Monte Carlo** sampling or, when even the likelihood cannot be computed (as for many stochastic models), by **approximate Bayesian computation**, which accepts parameter values whose simulated data resemble the real data. The Bayesian framework handles non-identifiability gracefully — flat directions simply remain broad in the posterior — and gives predictive distributions directly. Its results depend on the prior, which must be stated and justified.

## Designing informative experiments

The precision of an estimate depends on where and when measurements are taken. [[#eq-cov]] shows that what matters is the sensitivity $\partial f/\partial\theta$: measure where the prediction changes most with the parameter.

::: proposition Best time to measure a decay rate {#prop-design}
For $f(t) = Ae^{-kt}$ with known $A$ and constant measurement error $\sigma$, a single measurement at time $t$ carries Fisher information $I(t) = A^2t^2e^{-2kt}/\sigma^2$ about $k$, which is maximal at $t = 1/k$, the mean lifetime.
:::

::: proof
The sensitivity is $\partial f/\partial k = -Ate^{-kt}$, so the information is its square divided by $\sigma^2$. Differentiating $t^2e^{-2kt}$ gives $2te^{-2kt}(1 - kt)$, which is zero at $t = 1/k$, positive before and negative after.
:::

Measurements too early show almost no decay; measurements too late are dominated by noise relative to a vanishing signal. Since $k$ is unknown, one designs with a preliminary estimate and spreads measurements around $1/k$. The same logic — choose inputs, times and perturbations that make competing models disagree or that excite sloppy parameter directions — underlies **optimal experimental design**, which is increasingly used to plan time courses and perturbation experiments in systems biology.

::: example Planning a measurement {#ex-design}
A protein's half-life is believed, from a pilot experiment, to be about 3 h. At what time does a single measurement give the most information about the decay rate? If the half-life were really 6 h, how much information would a measurement at that time give, relative to the best possible single measurement?
::: solution
$k = \ln2/3 = 0.231$ h⁻¹, so the best time is $1/k = 4.3$ h. If in fact $k' = \ln2/6 = 0.116$ h⁻¹, the information at $t = 4.3$ h relative to its maximum at $t = 1/k' = 8.7$ h is

$$
\frac{t^2e^{-2k't}}{(1/k')^2e^{-2}} = \frac{(4.33)^2e^{-2(0.116)(4.33)}}{(8.66)^2e^{-2}} = \frac{18.8\times0.368}{75.0\times0.135} = 0.68.
$$

The measurement still gives about two-thirds of the maximal information: the optimum is broad, so a rough preliminary estimate suffices.
:::
:::

::: application Models in the clinic and the factory
Parameter estimation and model selection are routine in pharmacokinetics, where compartment models of drug absorption and elimination are fitted to concentration time courses from patients by nonlinear mixed-effects methods that share information across individuals; in bioprocess engineering, where fitted growth and production models guide the control of fermenters ([[biotechnology/bioprocessing]]); and in epidemiology, where transmission models are fitted to case data. In each, the same issues arise as in this chapter: the observation model, identifiability, sloppiness and the danger of over-fitting. The clinical uses belong to Medicine Atlas.
:::

::: history
Least squares was published by Adrien-Marie Legendre in 1805 and justified probabilistically by Carl Friedrich Gauss in 1809, who used it to recover the orbit of the asteroid Ceres. Ronald Fisher developed maximum likelihood and the information matrix between 1912 and 1925, and Samuel Wilks proved the asymptotic distribution of the likelihood ratio in 1938. Hirotugu Akaike introduced his information criterion in 1973–1974 and Gideon Schwarz the Bayesian criterion in 1978. In biochemistry, the dangers of linearised plots for enzyme kinetics were pointed out by many authors from the 1950s onwards, and Robert Eisenthal and Athel Cornish-Bowden's direct linear plot (1974) offered a robust alternative. The concerns specific to systems biology — identifiability of large ODE models, profile likelihoods, sloppiness and Bayesian computation for stochastic models — came to prominence after 2005 as quantitative single-cell and time-course data became abundant.
:::

::: summary
- Fitting needs a kinetic model and an observation model; the likelihood combines them, and with independent Gaussian errors maximum likelihood is (weighted) least squares.
- Transformations that linearise a model also transform its errors; fit nonlinear models directly, with an error model suited to the raw data (avoid fitting Lineweaver–Burk plots).
- Standard errors follow approximately from $\sigma^2(\mathbf{J}^\mathsf{T}\mathbf{J})^{-1}$; profile likelihoods are more reliable for nonlinear models and reveal non-identifiability as flat profiles.
- Structural non-identifiability means that different parameters give identical predictions (e.g. the $\gamma_m \leftrightarrow \gamma_p$ symmetry of protein-only data); practical non-identifiability means the data are too weak. Systems-biology models are typically sloppy.
- Compare nested models with likelihood-ratio tests ($\Lambda = n\ln(\mathrm{SSR}_0/\mathrm{SSR}_1)$ for Gaussian errors) and any models with AIC or BIC; the real test is prediction of new experiments.
- Bayesian inference combines priors with the likelihood; optimal design places measurements where predictions are most sensitive to parameters, e.g. at $t = 1/k$ for a decay rate.
:::

## Exercises

::: exercise Residual sum of squares {level=1 check="0.14"}
A model predicts 2.0, 3.0 and 4.0 where 2.1, 2.7 and 4.2 were measured. What is the SSR?
::: solution
$(0.1)^2 + (0.3)^2 + (0.2)^2 = 0.01 + 0.09 + 0.04 = 0.14$.
:::
:::

::: exercise AIC difference {level=1 check="-2"}
Model B has one more parameter than model A and increases $\ln\hat L$ by 2. What is $\mathrm{AIC}_B - \mathrm{AIC}_A$?
::: solution
$\Delta\mathrm{AIC} = 2\times1 - 2\times2 = -2$: model B is (modestly) preferred.
:::
:::

::: exercise Best measurement time {level=1 check="10"}
A species decays with rate constant $k = 0.1$ min⁻¹. At what time (in minutes) does a single measurement give the most information about $k$?
::: solution
$t = 1/k = 10$ min.
:::
:::

::: exercise A likelihood-ratio test {level=2}
A simple-regulation model (2 parameters) and a negative-autoregulation model (4 parameters, reducing to simple regulation when its repression strength is zero) are fitted to 30 points of a response time course, giving SSR = 2.4 and 1.5. Using a likelihood-ratio test at the 5 % level ($\chi^2_{2, 0.95} = 5.99$), which model is preferred?
::: solution
$\Lambda = 30\ln(2.4/1.5) = 30\times0.470 = 14.1 > 5.99$: simple regulation is rejected in favour of negative autoregulation ($p < 0.001$). AIC agrees: the improvement in $-2\ln\hat L$ (14.1) far exceeds the penalty of $2\times2 = 4$. Before accepting the conclusion, one would test a prediction — for example, that deleting the autoregulatory binding site slows the response.
:::
:::

::: exercise Identifiability by scaling {level=2}
A reporter's fluorescence $F = sX$ is measured, where $X$ obeys $dX/dt = \beta - \alpha X$ and $s$ is an unknown scale factor. Which parameters or combinations are identifiable from a time course of $F$ starting at $X = 0$?
::: solution
$F(t) = (s\beta/\alpha)(1 - e^{-\alpha t})$. The shape determines $\alpha$ and the plateau determines $s\beta/\alpha$, hence $s\beta$. So $\alpha$ and the product $s\beta$ are identifiable, but $s$ and $\beta$ separately are not: doubling $s$ and halving $\beta$ gives the same data. Calibrating fluorescence against molecule numbers (for example, by counting photobleaching steps or by partitioning statistics at division) fixes $s$ and makes $\beta$ identifiable.
:::
:::

::: exercise Interpreting a correlation {level=2}
In the Michaelis–Menten fit above, the estimates of $V_\mathrm{max}$ and $K_\mathrm{m}$ have correlation 0.83. Explain why, and propose a change in experimental design that would reduce it.
::: solution
At low substrate, $v \approx (V_\mathrm{max}/K_\mathrm{m})[S]$, so those points determine the ratio $V_\mathrm{max}/K_\mathrm{m}$; increasing both together leaves the initial slope unchanged, which is why errors in the two estimates are positively correlated. Only points near saturation determine $V_\mathrm{max}$ alone. Adding measurements at substrate concentrations well above $K_\mathrm{m}$ (say 20–50 μM, ten to twenty-five times $K_\mathrm{m}$) would pin down $V_\mathrm{max}$ directly and reduce the correlation.
:::
:::

::: exercise Information at the wrong time {level=2}
For [[#prop-design]], what fraction of the maximal information does a measurement at $t = 3/k$ give? And at $t = 0.3/k$?
::: solution
$I(t)/I(1/k) = (kt)^2e^{-2(kt - 1)}$. At $kt = 3$: $9e^{-4} = 0.165$. At $kt = 0.3$: $0.09e^{1.4} = 0.365$. Measuring late is worse than measuring early here, because the signal has decayed into the noise.
:::
:::

::: exercise Two models, one dataset {level=3}
A protein's induction curve rises with an initial lag and then saturates. Model A: two-stage expression (mRNA then protein, no feedback). Model B: one-stage expression with positive autoregulation. Both fit the data equally well. Describe two experiments whose predicted outcomes differ between the models.
::: solution
(1) **Single-cell distributions.** With strong positive feedback, model B can be bistable or show a broad, bimodal distribution during induction (cells switching at different times); model A predicts a unimodal distribution that shifts smoothly. Measuring the distribution by flow cytometry at intermediate times distinguishes them. (2) **Perturb the feedback or the intermediate.** In model B, adding the protein ectopically (or a constitutively expressed copy) should accelerate induction of a reporter of the native promoter; in model A it should have no effect. Alternatively, measuring mRNA directly: model A predicts mRNA rising quickly and without lag, while in model B mRNA itself shows the lag, because transcription accelerates as the protein accumulates. (3) **Dose dependence**: model B predicts a threshold and hysteresis in response to inducer; model A a graded response.
:::
:::

::: exercise Profile likelihood by hand {level=3}
For the decay data of [[#ex-decay]] with $A$ fixed at 100 and constant errors with $\sigma = 2$, the SSR is 14.96 at $k = 0.30$, 4.88 at $k = 0.31$, 6.07 at $k = 0.32$ and 67.3 at $k = 0.35$ h⁻¹. Using $\Delta\chi^2 = \Delta\mathrm{SSR}/\sigma^2 < 3.84$ as the 95 % criterion, estimate a confidence interval for $k$, and explain why fixing $A$ makes it narrower than an interval that profiles over $A$.
::: solution
The minimum of SSR lies between 0.31 and 0.32; a finer search puts it at $k = 0.314$, with SSR = 4.06. The 95 % threshold is $\mathrm{SSR} < 4.06 + 3.84\times2^2 = 19.4$. From the tabulated values the valley is close to a parabola, $\mathrm{SSR} \approx 4.06 + 55{,}000\,(k - 0.314)^2$ (check: at $k = 0.30$ this gives 14.8), so the limits are where $55{,}000\,(\Delta k)^2 = 15.4$, i.e. $\Delta k = 0.017$: approximately $0.297 < k < 0.331$ h⁻¹, which a numerical search confirms. Profiling over $A$ instead — re-optimising $A$ for each $k$ — gives the wider interval $0.293 < k < 0.336$ h⁻¹. Fixing $A$ ignores the correlation between $A$ and $k$ seen in the SSR widget: when $A$ is allowed to adjust, a change in $k$ is partly compensated, the valley in the profile is flatter, and the interval is wider. Fixing a parameter that is in fact uncertain makes the others look better determined than they are.
:::
:::
