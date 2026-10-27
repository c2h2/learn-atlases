A laboratory buys a certified reference material of river sediment whose lead content is certified as $25.0\ \mu\mathrm{g\,g^{-1}}$. Five test portions, digested and measured by its routine method, give $24.1$, $24.6$, $23.8$, $24.4$ and $24.9\ \mu\mathrm{g\,g^{-1}}$. Every result is low, but every result is also close. Is the method biased, or is a mean of $24.36$ just what five honest measurements of $25.0$ can look like? Next week the same laboratory will report lead in a stranger's garden soil from a calibration line, and the owner will want to know whether $5.25\ \mathrm{mg\,dm^{-3}}$ in the digest could really be $5.0$. And when the instrument reads a blank that is "nearly zero", someone must decide below what signal the honest report is "not detected".

These are the questions of this chapter. They are answered with a small set of statistical tools: confidence intervals and significance tests for comparing results, the uncertainty of a concentration read from a calibration line, the methods of standard addition and internal standards that cope with matrix effects and losses, limits of detection, and the validation and control charts that show a method keeps working. The underlying ideas — the mean, the standard deviation, the standard uncertainty of a mean and the propagation of uncertainty — are those of [[laboratory-methods/measurement-uncertainty]], and the least-squares line with its standard errors is derived in [[laboratory-methods/data-graphs]]. Here we use them to make decisions.

## Confidence intervals and Student's *t*

Suppose $n$ replicate results $x_1,\dots,x_n$ come from a normal distribution with true mean $\mu$ and standard deviation $\sigma$. The mean $\bar{x}$ is itself normally distributed with standard deviation $\sigma/\sqrt{n}$. If we knew $\sigma$, an interval $\bar{x} \pm 1.96\,\sigma/\sqrt{n}$ would contain $\mu$ in $95\ \%$ of repetitions of the experiment. But we never know $\sigma$; we only have the sample standard deviation $s$, which from a handful of results may be badly off. William Gosset worked out in 1908 how much wider the interval must be to allow for this.

::: definition Confidence interval for a mean {#def-confidence-interval}
For $n$ independent results from a normal distribution with sample mean $\bar{x}$ and sample standard deviation $s$, the **confidence interval** for the true mean $\mu$ at confidence level $1-\alpha$ is
$$
\mu = \bar{x} \pm \frac{t\,s}{\sqrt{n}}, \qquad t = t_{1-\alpha/2,\ n-1},
$$ {#eq-ci}
where $t_{1-\alpha/2,\,\nu}$ is the two-sided critical value of **Student's $t$ distribution** with $\nu = n-1$ **degrees of freedom**. The interval is a statement about the procedure: intervals constructed this way contain $\mu$ in a fraction $1-\alpha$ of repetitions.
:::

The quantity $t = (\bar{x}-\mu)/(s/\sqrt{n})$ follows Student's distribution, which looks like the normal curve but with heavier tails, because $s$ itself fluctuates. With few results the tails are very heavy: the $95\ \%$ value of $t$ is $12.71$ for $\nu = 1$, $4.30$ for $\nu = 2$, $2.78$ for $\nu = 4$, $2.26$ for $\nu = 9$, and it approaches the normal value $1.96$ only for large $\nu$. This is the quantitative reason why duplicate measurements say very little about precision, and why analysts aim for at least five or six replicates when the precision matters.

The interval in [[#eq-ci]] covers random error only. A biased method gives a perfectly valid-looking interval around the wrong value — which is exactly what reference materials are for.

## Significance tests

A **significance test** asks whether an observed difference is larger than random error would plausibly produce. We set up a **null hypothesis** $H_0$ — "the method has no bias", "the two methods agree", "the two precisions are equal" — compute a test statistic from the data, and ask how probable a value at least that extreme would be if $H_0$ were true. That probability is the **$p$-value**. If it is below a chosen **significance level** $\alpha$ (usually $0.05$), we reject $H_0$; otherwise we retain it, which is not the same as proving it.

Two kinds of mistake are possible. A **type I error** rejects a true null hypothesis (we "find" a bias that is not there); its probability is $\alpha$. A **type II error** retains a false null hypothesis (we miss a real bias); its probability $\beta$ depends on how large the real effect is and how many results we have. The **power** $1-\beta$ of a test grows with $n$: a small but real bias is invisible with three replicates and obvious with thirty.

::: proposition The *t* tests {#prop-t-tests}
Assume normally distributed, independent results.

1. **Comparing a mean with a reference value** $\mu_0$:
$$
t = \frac{\bar{x}-\mu_0}{s/\sqrt{n}}, \qquad \nu = n-1 .
$$ {#eq-t-one}
2. **Comparing two means** $\bar{x}_1$, $\bar{x}_2$ from $n_1$ and $n_2$ results with similar standard deviations:
$$
t = \frac{\bar{x}_1-\bar{x}_2}{s_\mathrm{p}\sqrt{1/n_1 + 1/n_2}}, \qquad s_\mathrm{p}^2 = \frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1+n_2-2}, \qquad \nu = n_1+n_2-2 .
$$ {#eq-t-two}
3. **Paired comparison**: if two methods are applied to the same $n$ samples, form the differences $d_i$ and test their mean against zero with [[#eq-t-one]]: $t = \bar{d}/(s_d/\sqrt{n})$, $\nu = n-1$.

In each case $H_0$ is rejected at level $\alpha$ when $\lvert t\rvert > t_{1-\alpha/2,\,\nu}$.
:::

::: proof
For (1): under $H_0$ the mean $\bar{x}$ is normal with mean $\mu_0$ and standard deviation $\sigma/\sqrt{n}$, so $z = (\bar{x}-\mu_0)/(\sigma/\sqrt{n})$ is standard normal. The quantity $(n-1)s^2/\sigma^2$ follows a $\chi^2$ distribution with $n-1$ degrees of freedom and is independent of $\bar{x}$ (a property of normal samples). The ratio of a standard normal variable to $\sqrt{\chi^2_\nu/\nu}$ is, by definition, Student's $t$ with $\nu$ degrees of freedom, and
$$
\frac{z}{\sqrt{s^2/\sigma^2}} = \frac{\bar{x}-\mu_0}{\sigma/\sqrt{n}}\cdot\frac{\sigma}{s} = \frac{\bar{x}-\mu_0}{s/\sqrt{n}},
$$
in which $\sigma$ has cancelled. For (2): under $H_0$ (equal means) $\bar{x}_1-\bar{x}_2$ is normal with mean zero and variance $\sigma^2(1/n_1+1/n_2)$ if both sets share $\sigma$. The best estimate of that common $\sigma^2$ weights each variance by its degrees of freedom, which is $s_\mathrm{p}^2$; $(n_1+n_2-2)s_\mathrm{p}^2/\sigma^2$ is $\chi^2$ with $n_1+n_2-2$ degrees of freedom, and the same cancellation gives [[#eq-t-two]]. For (3), the differences remove the sample-to-sample variation in the analyte content, which is common to both methods, and the $d_i$ are a single set of $n$ results whose mean is tested against zero as in (1).
:::

::: example Is the method biased? {#ex-crm-bias}
Test, at the $95\ \%$ level, whether the five lead results of the introduction ($24.1$, $24.6$, $23.8$, $24.4$, $24.9\ \mu\mathrm{g\,g^{-1}}$) differ significantly from the certified value $25.0\ \mu\mathrm{g\,g^{-1}}$. Ignore the uncertainty of the certified value.
::: solution
The mean is $\bar{x} = 121.8/5 = 24.36\ \mu\mathrm{g\,g^{-1}}$. The deviations from it are $-0.26, 0.24, -0.56, 0.04, 0.54$, whose squares sum to $0.732$, so
$$
s = \sqrt{\frac{0.732}{4}} = 0.428\ \mu\mathrm{g\,g^{-1}} .
$$
From [[#eq-t-one]],
$$
t = \frac{24.36 - 25.0}{0.428/\sqrt{5}} = \frac{-0.64}{0.191} = -3.35 .
$$
With $\nu = 4$, $t_\mathrm{crit} = 2.78$. Since $\lvert t\rvert = 3.35 > 2.78$, the difference is significant at the $95\ \%$ level ($p = 0.029$): the method reads about $2.6\ \%$ low. The same conclusion follows from the $95\ \%$ confidence interval, $24.36 \pm 2.78\times0.191 = 24.36 \pm 0.53$, i.e. $23.83$ to $24.89\ \mu\mathrm{g\,g^{-1}}$, which does not contain $25.0$. Whether a $2.6\ \%$ bias *matters* is a separate question of fitness for purpose; statistics only tells us it is real. In practice the certified value carries its own uncertainty, which must be combined with $s/\sqrt{n}$ before the comparison — a CRM certified as $25.0 \pm 0.8$ could not reveal this bias at all.
:::
:::

Before the two-sample test of [[#eq-t-two]] can pool the standard deviations, we should check that they are compatible. The tool is the ratio of variances.

::: definition The *F* test for two variances {#def-f-test}
To test whether two sets of results have the same precision, compute
$$
F = \frac{s_1^2}{s_2^2}, \qquad s_1 \ge s_2,
$$
with $\nu_1 = n_1-1$ (numerator) and $\nu_2 = n_2-1$ (denominator) degrees of freedom. For a two-sided test at level $\alpha$, the precisions differ significantly if $F$ exceeds the tabulated $F_{1-\alpha/2;\,\nu_1,\nu_2}$. If they do differ, the means are compared with Welch's form of the $t$ test, which does not pool.
:::

::: example Two methods for iron in an ore {#ex-two-means}
Iron (as mass per cent $\mathrm{Fe}$) in one homogenised ore is determined by a dichromate titration (six results: $10.42, 10.37, 10.51, 10.45, 10.40, 10.47$) and by inductively coupled plasma emission (five results: $10.31, 10.38, 10.25, 10.35, 10.29$). Do the methods agree at the $95\ \%$ level?
::: solution
Titration: $\bar{x}_1 = 10.437$, $s_1 = 0.0505$. ICP: $\bar{x}_2 = 10.316$, $s_2 = 0.0508$.

*Precisions.* $F = (0.0508/0.0505)^2 = 1.01$, far below $F_{0.975;\,4,5} = 7.39$: the precisions are compatible and may be pooled.

*Pooled standard deviation.*
$$
s_\mathrm{p} = \sqrt{\frac{5\times0.0505^2 + 4\times0.0508^2}{9}} = 0.0506 .
$$
*Means.*
$$
t = \frac{10.437 - 10.316}{0.0506\sqrt{1/6 + 1/5}} = \frac{0.121}{0.0306} = 3.94 .
$$
With $\nu = 9$, $t_\mathrm{crit} = 2.26$. The difference ($0.12$ percentage points) is significant ($p = 0.003$): at least one method has a bias. The test cannot say which; a certified reference ore analysed by both methods would.
:::
:::

::: widget hypothesis
test: t
tail: two
alpha: 0.05
n: 5
effect: 1.5
observed: -3.35
caption: The sampling distribution of Student's $t$ under the null hypothesis "no bias" for $n = 5$ results ($\nu = 4$), with the two-sided rejection regions at $\alpha = 0.05$ beyond $\pm 2.78$. The observed $t = -3.35$ of [[#ex-crm-bias]] lies in the left region. The alternative curve shows what $t$ would look like if the true bias were $1.5$ standard deviations; the unshaded part of it is $\beta$, the chance of missing such a bias. Increase $n$ and watch the power rise; lower $\alpha$ to $0.01$ and watch it fall — a stricter test against false alarms is a weaker test against real effects.
:::

### Outliers

One result in a set sometimes looks wrong. If a reason is known — a spilled drop, a bubble in the burette, a wrongly entered mass — the result is discarded and the reason recorded. If no reason is known, a test such as **Grubbs's test** compares the suspect value with the rest: $G = \lvert x_\mathrm{suspect} - \bar{x}\rvert/s$, with $\bar{x}$ and $s$ computed from *all* the results including the suspect, is compared with a tabulated critical value (for $n = 6$ at $95\ \%$, $G_\mathrm{crit} = 1.887$). The older Dixon $Q$ test, $Q = \text{gap}/\text{range}$, does the same job for small sets.

::: warning Rejecting results until the data look good {#warn-outliers}
Outlier tests are easy to misuse. Applied repeatedly to the same set, they will eventually strip away any inconvenient result; applied to small sets, they reject genuine values surprisingly often, and they reject them more readily the more the true distribution has heavy tails (as real analytical data often do). A value should be removed on statistical grounds alone only once, only by a test chosen in advance, and always reported ("one result, $10.9$, was rejected by Grubbs's test at $95\ \%$"). When a set contains suspect values, it is often better to report the median, which a single wild value cannot drag, or to use robust statistics, than to delete data. And an "outlier" that recurs is not an outlier: it is information about the method.
:::

## Calibration and the uncertainty of an unknown

Most instrumental methods are **relative**: the signal is related to concentration only through standards. We measure $n$ standards with concentrations $x_i$ and signals $y_i$, fit the least-squares line $y = a + bx$, then measure the unknown and convert its signal $y_0$ to a concentration
$$
x_0 = \frac{y_0 - a}{b} .
$$ {#eq-x0}
The slope $b$ is the **sensitivity** of the method; the scatter of the points about the line is measured by
$$
s_{y/x} = \sqrt{\frac{\sum_i \left(y_i - a - bx_i\right)^2}{n-2}},
$$
the **standard deviation of the residuals**, with $n-2$ degrees of freedom because two parameters were fitted. The least-squares formulas for $a$, $b$ and their standard errors are derived in [[laboratory-methods/data-graphs]]. What an analyst actually needs is the uncertainty of $x_0$.

::: proposition Uncertainty of a concentration from a calibration line {#prop-sx0}
For a straight-line calibration fitted by unweighted least squares to $n$ points, with constant scatter $s_{y/x}$ in the signal, the standard deviation of a concentration $x_0$ found from the mean $\bar{y}_0$ of $m$ replicate signals of the unknown is
$$
s_{x_0} = \frac{s_{y/x}}{b}\sqrt{\frac{1}{m} + \frac{1}{n} + \frac{(\bar{y}_0 - \bar{y})^2}{b^2 \sum_i (x_i - \bar{x})^2}},
$$ {#eq-sx0}
where $\bar{x}$ and $\bar{y}$ are the means of the calibration data. The confidence interval is $x_0 \pm t\,s_{x_0}$ with $t$ for $n-2$ degrees of freedom. The formula is an approximation valid when the line is well determined (roughly, when $t\,s_b/b < 0.1$).
:::

::: proof
Write the fitted line through its centroid, $y = \bar{y} + b(x - \bar{x})$, so that [[#eq-x0]] becomes $x_0 = \bar{x} + (\bar{y}_0 - \bar{y})/b$. Three independent random quantities enter: $\bar{y}_0$ (variance $\sigma^2/m$, from the $m$ replicates of the unknown), $\bar{y}$ (variance $\sigma^2/n$) and $b$ (variance $\sigma^2/S_{xx}$ with $S_{xx} = \sum (x_i-\bar{x})^2$). That $\bar{y}$ and $b$ are uncorrelated is the reason for writing the line through the centroid: $b = \sum (x_i-\bar{x})y_i/S_{xx}$, and the covariance of $\bar{y} = \frac{1}{n}\sum y_i$ with it is proportional to $\sum (x_i-\bar{x}) = 0$. Propagation of uncertainty to first order gives
$$
\begin{aligned}
\sigma^2_{x_0} &= \left(\frac{\partial x_0}{\partial \bar{y}_0}\right)^2\frac{\sigma^2}{m} + \left(\frac{\partial x_0}{\partial \bar{y}}\right)^2\frac{\sigma^2}{n} + \left(\frac{\partial x_0}{\partial b}\right)^2\frac{\sigma^2}{S_{xx}} \\
&= \frac{1}{b^2}\frac{\sigma^2}{m} + \frac{1}{b^2}\frac{\sigma^2}{n} + \frac{(\bar{y}_0-\bar{y})^2}{b^4}\frac{\sigma^2}{S_{xx}},
\end{aligned}
$$
since $\partial x_0/\partial b = -(\bar{y}_0-\bar{y})/b^2$. Taking $\sigma^2/b^2$ outside and replacing $\sigma$ by its estimate $s_{y/x}$ gives [[#eq-sx0]]. The first-order expansion in $b$ is what requires the slope to be well determined.
:::

Each of the three terms has a meaning you can act on. The $1/m$ term is the scatter of the unknown's own signal: measure it more often. The $1/n$ term is the uncertainty in the height of the line: use more standards. The last term is the uncertainty of the slope, magnified by the distance of the unknown from the centroid: place the standards so that the unknown falls near the middle of the range, and spread them widely so that $S_{xx}$ is large.

::: example Lead in a soil digest {#ex-calibration}
Lead standards give the following atomic absorbance readings:

| $x$ / $\mathrm{mg\,dm^{-3}}$ | $0$ | $2.00$ | $4.00$ | $6.00$ | $8.00$ | $10.00$ |
|---|---|---|---|---|---|---|
| $y$ (absorbance) | $0.009$ | $0.158$ | $0.301$ | $0.472$ | $0.609$ | $0.766$ |

A soil digest, measured three times, gives $0.405$, $0.412$ and $0.398$. Find the lead concentration in the digest with its $95\ \%$ confidence interval.
::: solution
*The line.* $\bar{x} = 5.00$, $\bar{y} = 0.38583$, $S_{xx} = \sum(x_i-\bar{x})^2 = 70.0$. The least-squares slope and intercept are
$$
b = \frac{\sum(x_i-\bar{x})(y_i-\bar{y})}{S_{xx}} = 0.075843\ \mathrm{dm^3\,mg^{-1}}, \qquad a = \bar{y} - b\bar{x} = 0.00662 .
$$
The residuals give $s_{y/x} = 0.00730$ ($\nu = 4$).

*The unknown.* $\bar{y}_0 = 0.4050$, so
$$
x_0 = \frac{0.4050 - 0.00662}{0.075843} = 5.253\ \mathrm{mg\,dm^{-3}} .
$$
*Its uncertainty.* From [[#eq-sx0]] with $m = 3$, $n = 6$:
$$
s_{x_0} = \frac{0.00730}{0.07584}\sqrt{\frac{1}{3} + \frac{1}{6} + \frac{(0.4050-0.3858)^2}{0.07584^2\times70.0}} = 0.0962\times\sqrt{0.5000 + 0.0009} = 0.0681\ \mathrm{mg\,dm^{-3}} .
$$
With $t_{0.975,4} = 2.78$, the result is $x_0 = 5.25 \pm 0.19\ \mathrm{mg\,dm^{-3}}$ ($95\ \%$). Notice that the slope term contributes almost nothing, because the unknown lies close to the centroid; nearly all the uncertainty comes from the $1/m$ and $1/n$ terms. So could the digest "really" be $5.0$? It lies just outside the interval ($5.06$ to $5.44$), so a value of $5.0$ is unlikely but not wildly so.
:::
:::

::: widget plot
f: 2.776*0.09624*sqrt(1/m + 1/6 + (x-5)^2/70)
x: 0, 10
y: 0, 0.4
sliders: m=3:1:10:1
labels: \text{95\% half-width of } x_0 \ (\mathrm{mg\,dm^{-3}})
caption: The $95\ \%$ confidence half-width $t\,s_{x_0}$ for a concentration read from the calibration line of [[#ex-calibration]], as a function of where the unknown falls ($x$, in $\mathrm{mg\,dm^{-3}}$), from [[#eq-sx0]]. The slider sets the number $m$ of replicate readings of the unknown. The curve is lowest at the centroid $\bar{x} = 5$ and rises towards the ends of the range; outside the range (extrapolation) it keeps rising and the linear model itself is no longer tested. Raising $m$ lowers the whole curve, but only down to the floor set by the $1/n$ term — beyond about $m = 6$ further replicates of the unknown buy little.
:::

Two more points about calibration lines. First, the **correlation coefficient** $r$ (or $R^2$) is a poor test of linearity: the six points above give $r = 0.99974$, and a set with clear curvature can give $r = 0.995$. Inspect the residuals instead — a curved or funnel-shaped residual plot is the evidence that the straight unweighted line is wrong. Second, if the scatter grows with concentration (as it often does over wide ranges), the points deserve unequal weights, $w_i \propto 1/s_i^2$, and a **weighted** least-squares fit; unweighted fitting then gives intervals that are too wide at low concentration and too narrow at high concentration.

## Standard addition

A calibration line made in pure water assumes that the analyte gives the same signal per unit concentration in the sample. Often it does not. In flame atomic absorption, a viscous digest is aspirated more slowly than water; in electrospray mass spectrometry, co-eluting compounds suppress ionisation; in polarography, surfactants change the electrode response. Such **matrix effects** change the slope. When the matrix cannot be matched by the standards, we calibrate in the sample itself.

::: proposition Standard addition {#prop-standard-addition}
Equal volumes $V_x$ of sample are placed in volumetric flasks of volume $V_\mathrm{t}$; increasing volumes $V_{\mathrm{s},i}$ of a standard of concentration $c_\mathrm{s}$ are added, and all are diluted to the mark. If the signal is proportional to the analyte concentration in the flask, with the same proportionality constant in every flask, then the signal is linear in the added concentration $x_i = c_\mathrm{s}V_{\mathrm{s},i}/V_\mathrm{t}$:
$$
y_i = k\left(\frac{c_xV_x}{V_\mathrm{t}} + x_i\right),
$$
and the least-squares line $y = a + bx$ meets the $x$ axis at $x = -a/b$, so that
$$
\frac{c_xV_x}{V_\mathrm{t}} = \frac{a}{b}, \qquad c_x = \frac{a}{b}\cdot\frac{V_\mathrm{t}}{V_x} .
$$ {#eq-standard-addition}
The standard deviation of the extrapolated value $x_\mathrm{E} = a/b$ is
$$
s_{x_\mathrm{E}} = \frac{s_{y/x}}{b}\sqrt{\frac{1}{n} + \frac{\bar{y}^2}{b^2\sum_i(x_i-\bar{x})^2}} .
$$ {#eq-sxe}
The method requires a linear response through the origin (no signal from a blank, or a blank subtracted first) and corrects only for *proportional* matrix effects.
:::

::: proof
In flask $i$ the analyte concentration is the sample's contribution $c_xV_x/V_\mathrm{t}$ (the same in every flask, because $V_x$ and $V_\mathrm{t}$ are the same) plus the added $x_i$. Multiplying by $k$ gives the linear form, with intercept $a = kc_xV_x/V_\mathrm{t}$ and slope $b = k$; their ratio removes the unknown $k$, which is why matrix effects that change $k$ cancel. For the uncertainty, the extrapolated point is the concentration read from the line at signal $y_0 = 0$, with no replicate measurement of an unknown signal (there is no $1/m$ term — the "unknown signal" zero is exact). Substituting $\bar{y}_0 = 0$ and dropping the $1/m$ term in [[#eq-sx0]] gives [[#eq-sxe]]. If the response contained an additive blank signal, it would add to $a$ and be counted as analyte: standard addition cannot correct an additive interference.
:::

::: example Copper by standard addition {#ex-standard-addition}
Five $25.00\ \mathrm{cm^3}$ portions of a wine are pipetted into $50.00\ \mathrm{cm^3}$ flasks; $0$, $1.00$, $2.00$, $3.00$ and $4.00\ \mathrm{cm^3}$ of a $50.0\ \mathrm{mg\,dm^{-3}}$ copper standard are added and the flasks made up to the mark. Absorbances: $0.214$, $0.318$, $0.427$, $0.530$, $0.638$. Find the copper concentration in the wine with its $95\ \%$ confidence interval.
::: solution
The added concentrations are $x_i = 50.0 \times V_{\mathrm{s},i}/50.00 = 0, 1.00, 2.00, 3.00, 4.00\ \mathrm{mg\,dm^{-3}}$. The least-squares line is $y = 0.2134 + 0.1060\,x$ with $s_{y/x} = 0.00155$ ($\nu = 3$), $\bar{y} = 0.4254$ and $S_{xx} = 10.0$. Then
$$
x_\mathrm{E} = \frac{0.2134}{0.1060} = 2.013\ \mathrm{mg\,dm^{-3}}, \qquad s_{x_\mathrm{E}} = \frac{0.00155}{0.1060}\sqrt{\frac{1}{5} + \frac{0.4254^2}{0.1060^2\times10.0}} = 0.0197\ \mathrm{mg\,dm^{-3}} .
$$
That is the concentration in the flask; the wine was diluted by $V_\mathrm{t}/V_x = 2$, so $c_x = 4.03\ \mathrm{mg\,dm^{-3}}$. With $t_{0.975,3} = 3.18$ the interval is $\pm 2\times3.18\times0.0197 = \pm 0.13$: $c_x = 4.03 \pm 0.13\ \mathrm{mg\,dm^{-3}}$. The relative uncertainty ($3\ \%$) is larger than the $0.4\ \%$ scatter of the readings would suggest, because the result is an extrapolation beyond the measured points; the additions should be large enough to roughly double or triple the original signal.
:::
:::

::: widget regression
points: 0,0.214; 1,0.318; 2,0.427; 3,0.530; 4,0.638
degree: 1
x: -3, 4.5
y: 0, 0.7
caption: The standard-addition data of [[#ex-standard-addition]]: absorbance against added copper concentration in the flask ($\mathrm{mg\,dm^{-3}}$). The line, extended to the left, crosses zero absorbance at $x = -2.01\ \mathrm{mg\,dm^{-3}}$, the (negative of the) copper concentration already in the flask. Drag the first point up or down by $0.01$ and watch the intercept move by about a tenth of a unit: the extrapolation amplifies any error in the points, which is why [[#eq-sxe]] has the factor $\bar{y}^2/b^2$.
:::

## Internal standards

Some errors are not proportional matrix effects but fluctuations from injection to injection: a gas chromatograph's autosampler delivers $1.0\ \mu\mathrm{l}$ one time and $0.96\ \mu\mathrm{l}$ the next; a plasma's efficiency drifts as the nebuliser clogs; part of the analyte is lost in an extraction. If a known amount of a different, similar substance is added to every sample and standard, it suffers the same fluctuations, and the *ratio* of signals is immune to them.

::: definition Internal standard and response factor {#def-internal-standard}
An **internal standard** S is a substance, absent from the sample, added in known concentration to every standard and sample, whose signal responds to the experimental variables in the same way as the analyte X. The **response factor** $F$ is defined by
$$
\frac{A_\mathrm{X}}{[\mathrm{X}]} = F\,\frac{A_\mathrm{S}}{[\mathrm{S}]},
$$
where $A$ is the signal (peak area, emission intensity). $F$ is measured with a mixture of known composition and then used to find $[\mathrm{X}]$ in a sample spiked with known $[\mathrm{S}]$: $[\mathrm{X}] = (A_\mathrm{X}/A_\mathrm{S})\,[\mathrm{S}]/F$.
:::

::: example An internal standard in gas chromatography {#ex-internal-standard}
A mixture containing $10.0\ \mathrm{mg\,dm^{-3}}$ of an analyte and $8.0\ \mathrm{mg\,dm^{-3}}$ of an internal standard gives a peak-area ratio $A_\mathrm{X}/A_\mathrm{S} = 1.32$. A sample, spiked with the internal standard to $8.0\ \mathrm{mg\,dm^{-3}}$, gives $A_\mathrm{X}/A_\mathrm{S} = 0.875$. Find $[\mathrm{X}]$ in the spiked sample.
::: solution
From the standard mixture,
$$
F = \frac{A_\mathrm{X}/[\mathrm{X}]}{A_\mathrm{S}/[\mathrm{S}]} = \frac{A_\mathrm{X}}{A_\mathrm{S}}\cdot\frac{[\mathrm{S}]}{[\mathrm{X}]} = 1.32\times\frac{8.0}{10.0} = 1.056 .
$$
In the sample,
$$
[\mathrm{X}] = \frac{A_\mathrm{X}}{A_\mathrm{S}}\cdot\frac{[\mathrm{S}]}{F} = 0.875\times\frac{8.0}{1.056} = 6.63\ \mathrm{mg\,dm^{-3}} .
$$
If the injected volume had been $4\ \%$ smaller, both peak areas would have shrunk by $4\ \%$ and the ratio — and hence the result — would not change. In practice $F$ is determined from a calibration line of $A_\mathrm{X}/A_\mathrm{S}$ against $[\mathrm{X}]/[\mathrm{S}]$ over the working range rather than from one mixture.
:::
:::

The best internal standard is chemically almost identical to the analyte but distinguishable by the detector. The ultimate case is an isotopically labelled version of the analyte itself, measured by mass spectrometry, which behaves identically in extraction, chromatography and ionisation; this is isotope dilution, developed in [[analytical-chemistry/hyphenated-methods]].

::: quiz
A laboratory determines sodium in blood serum by flame emission. Serum is more viscous than aqueous standards, so it reaches the flame more slowly, and its sodium signal per unit concentration is lower. Which approach corrects for this?
- [ ] Use more aqueous standards so that $S_{xx}$ is larger.
- [x] Standard addition, or matrix-matched standards, because the error is a change in slope caused by the matrix.
- [ ] Subtract a blank measured on deionised water.
- [ ] Report the result with a wider confidence interval.
::: solution
The viscosity changes the sensitivity $b$ in the sample relative to the standards — a proportional matrix effect. More standards make the *wrong* slope more precise; blank subtraction corrects additive errors, not proportional ones; and a wider interval does not remove a bias. Calibrating in the matrix (standard addition, or standards prepared in a serum-like matrix) gives the correct slope. A lithium internal standard is also used for exactly this purpose in flame photometry, because the viscosity affects lithium and sodium equally.
:::
:::

## Limits of detection and quantification

Every blank gives a signal that fluctuates. If the analyte signal is small enough, it cannot be told apart from those fluctuations, and there are two different questions to ask: given a measured signal, should we *decide* that the analyte is present? And how much analyte must be present for us to *reliably* detect it? Lloyd Currie's 1968 analysis showed that these need two different limits.

::: proposition Critical level and detection limit {#prop-detection}
Let the net signal (signal minus mean blank) be normally distributed with a standard deviation $\sigma_0$ that does not depend on concentration near zero. With a false-positive probability $\alpha$ and a false-negative probability $\beta$:

1. the **critical level**, above which a net signal is declared "detected", is $L_\mathrm{C} = z_{1-\alpha}\,\sigma_0$;
2. the **detection limit**, the smallest true net signal that exceeds $L_\mathrm{C}$ with probability $1-\beta$, is
$$
L_\mathrm{D} = L_\mathrm{C} + z_{1-\beta}\,\sigma_0 = (z_{1-\alpha} + z_{1-\beta})\,\sigma_0 .
$$ {#eq-ld}

For $\alpha = \beta = 0.05$, $z = 1.645$ and $L_\mathrm{D} = 3.29\,\sigma_0$. Divided by the sensitivity $b$, these become concentrations. The widely used convention **limit of detection** $\mathrm{LOD} = 3s_0/b$ and **limit of quantification** $\mathrm{LOQ} = 10s_0/b$ (where the relative standard deviation is about $10\ \%$) are rounded versions of the same idea.
:::

::: proof
With no analyte present, the net signal is $\mathcal{N}(0, \sigma_0^2)$. A threshold $L_\mathrm{C}$ is exceeded by chance with probability $\alpha$ when $L_\mathrm{C}/\sigma_0 = z_{1-\alpha}$, the one-sided normal quantile; this is the decision limit. Now suppose the true net signal is $L$. The measured value is $\mathcal{N}(L, \sigma_0^2)$ and it falls *below* $L_\mathrm{C}$ — a false negative — with probability $\Phi\big((L_\mathrm{C}-L)/\sigma_0\big)$. Requiring this to equal $\beta$ gives $(L - L_\mathrm{C})/\sigma_0 = z_{1-\beta}$, i.e. $L_\mathrm{D} = L_\mathrm{C} + z_{1-\beta}\sigma_0$. With $\alpha = \beta = 0.05$, $L_\mathrm{D} = 2\times1.645\,\sigma_0 = 3.29\,\sigma_0$. (If $\sigma_0$ is estimated from a few blanks, $t$ replaces $z$ and the limits are larger.)
:::

The figure makes the asymmetry plain. A sample whose true content is exactly the critical level gives a "detected" verdict only half the time; the detection limit is set higher so that a sample at that level is detected $95\ \%$ of the time.

::: widget distribution
dist: normal
params: mu=0, sigma=1
a: 1.645
b: 6
caption: The distribution of the net blank signal, in units of its standard deviation $\sigma_0$. The shaded tail beyond $L_\mathrm{C} = 1.645\,\sigma_0$ holds $5\ \%$ of the area: the false-positive rate $\alpha$. Now move $\mu$ to $3.29$ — a sample at the detection limit $L_\mathrm{D}$ — and keep the shading from $1.645$: the shaded area is now $95\ \%$, so only $5\ \%$ of such samples are missed ($\beta$). Set $\mu = 1.645$ and the sample is detected only half the time.
:::

::: example Detection limit for lead {#ex-lod}
Ten replicate blanks for the lead method of [[#ex-calibration]] give a standard deviation of $0.0021$ absorbance units. Find the LOD and LOQ in $\mathrm{mg\,dm^{-3}}$.
::: solution
With $b = 0.07584\ \mathrm{dm^3\,mg^{-1}}$,
$$
\mathrm{LOD} = \frac{3\times0.0021}{0.07584} = 0.083\ \mathrm{mg\,dm^{-3}}, \qquad \mathrm{LOQ} = \frac{10\times0.0021}{0.07584} = 0.28\ \mathrm{mg\,dm^{-3}} .
$$
A digest reading $0.15\ \mathrm{mg\,dm^{-3}}$ is therefore detected but not quantified: it would be reported as "detected, below the limit of quantification ($0.28\ \mathrm{mg\,dm^{-3}}$)". Two cautions: the LOD refers to the solution measured, and must be scaled by the dilution and sample mass to give a method detection limit in the original soil; and it should come from blanks taken through the *whole* procedure (digestion included), because contamination during preparation usually dominates $s_0$.
:::
:::

## Validation and quality control

Before a method is used for real samples, it is **validated**: shown by experiment to be fit for its intended purpose. The performance characteristics, as set out for example in the Eurachem guide and in ICH Q2 for pharmaceuticals, are:

- **Selectivity**: the response is due to the analyte and not to likely interferences (tested by spiking interferents, or by comparing with an independent method).
- **Trueness**: closeness of the mean to the true value, assessed with certified reference materials ([[#ex-crm-bias]]) or spike recoveries.
- **Precision**: **repeatability** (same analyst, instrument and day) and **intermediate precision** or **reproducibility** (different days, analysts or laboratories). Reproducibility standard deviations are typically one and a half to two times repeatability.
- **Linearity and working range**: residual plots over the intended range.
- **Limits of detection and quantification** ([[#prop-detection]]).
- **Robustness**: insensitivity to small deliberate changes in conditions (pH $\pm 0.2$, temperature $\pm 2\ \mathrm{K}$, a different column batch).
- **Measurement uncertainty**: an uncertainty budget combining all of the above.

Validation shows that a method *can* work. **Quality control** shows that it *did* work today. The standard tool is the **Shewhart control chart**: a stable control material is analysed with each batch and its result plotted against time, with a central line at the long-term mean $\mu$, **warning limits** at $\mu \pm 2\sigma$ and **action limits** at $\mu \pm 3\sigma$. For a process in control, about one point in twenty lies outside the warning limits and about three in a thousand outside the action limits. A point outside the action limits, two successive points outside the same warning limit, or a long run on one side of the centre line (commonly seven to nine points, depending on the rule set used) signals that something has changed and that the batch's results should not be released until the cause is found.

::: algorithm Running an analytical batch {#alg-batch}
1. Check the instrument (wavelength, sensitivity, baseline) against its acceptance criteria.
2. Measure a calibration blank and the standards; check the residuals and that the sensitivity is within its usual range.
3. Measure a reagent blank taken through the whole procedure, a control material, and a spiked sample or CRM.
4. Measure the samples, bracketed every ten to twenty by a check standard to detect drift.
5. Plot the control result on its control chart; release the batch only if the control, blank, recovery and check standards are all within their limits.
6. Report each result with its uncertainty, and values below the LOQ as such.
:::

## Where this leads

These tools are used in every later chapter. Calibration lines and detection limits return with spectrometric methods in [[analytical-chemistry/molecular-spectrometry]] and [[analytical-chemistry/atomic-spectrometry]], where matrix effects make standard addition and internal standards routine. Internal standards are essential in [[analytical-chemistry/chromatography]] and reach their best form in isotope dilution ([[analytical-chemistry/hyphenated-methods]]). Comparing a method with a reference value is how the classical absolute methods of [[analytical-chemistry/classical-analysis]] serve to certify reference materials. The deeper statistics — analysis of variance, regression diagnostics, Bayesian approaches — are in Maths Atlas ([/learn/maths/](/learn/maths/)).

::: history
William Sealy Gosset, a chemist at the Guinness brewery in Dublin, published the distribution now named after his pseudonym in "The probable error of a mean" (*Biometrika*, 1908). R. A. Fisher put significance testing, the analysis of variance and the $F$ distribution (named in his honour by Snedecor) at the centre of experimental science in *Statistical Methods for Research Workers* (1925). Walter Shewhart introduced the control chart at Bell Telephone Laboratories in 1924 and described it in *Economic Control of Quality of Manufactured Product* (1931). For analytical chemistry specifically, R. B. Dean and W. J. Dixon published the $Q$ test for small samples in *Analytical Chemistry* (1951), Frank Grubbs his outlier criterion in the *Annals of Mathematical Statistics* (1950), and Lloyd Currie defined the critical level, detection limit and determination limit in "Limits for qualitative detection and quantitative determination" (*Analytical Chemistry*, 1968).
:::

::: summary
- A $1-\alpha$ confidence interval for a mean is $\bar{x} \pm ts/\sqrt{n}$ with $\nu = n-1$; Student's $t$ widens the interval to allow for the uncertainty in $s$.
- Significance tests compare a statistic with its distribution under a null hypothesis: $t$ tests for a mean against a reference value, two means (pooled), or paired results; the $F$ test for two variances.
- Outliers are rejected only for a known cause, or once by a test chosen in advance — and the rejection is always reported.
- A concentration from a calibration line has $s_{x_0} = (s_{y/x}/b)\sqrt{1/m + 1/n + (\bar{y}_0-\bar{y})^2/(b^2S_{xx})}$; it is smallest at the centroid; $r$ is no test of linearity.
- Standard addition calibrates in the sample and corrects proportional matrix effects; the result is an extrapolation, so its uncertainty is larger.
- An internal standard corrects for fluctuations that affect analyte and standard alike, through the ratio of their signals.
- The critical level $1.645\sigma_0$ and detection limit $3.29\sigma_0$ (for $\alpha = \beta = 0.05$) answer different questions; LOD $= 3s_0/b$ and LOQ $= 10s_0/b$ are the working conventions.
- Validation establishes trueness, precision, range, limits and robustness; control charts with $\pm2\sigma$ warning and $\pm3\sigma$ action limits show the method stays in control.
:::

## Exercises

::: exercise Confidence interval for a standardisation {level=1 check="0.00054"}
Four standardisations of a sodium hydroxide solution give $0.1023$, $0.1019$, $0.1027$ and $0.1021\ \mathrm{mol\,dm^{-3}}$. Find the mean and the $95\ \%$ confidence half-width. (Enter the half-width in $\mathrm{mol\,dm^{-3}}$.)
::: solution
$\bar{x} = 0.10225\ \mathrm{mol\,dm^{-3}}$ and $s = 3.42\times10^{-4}\ \mathrm{mol\,dm^{-3}}$. With $\nu = 3$, $t = 3.18$, so the half-width is $3.18\times3.42\times10^{-4}/\sqrt{4} = 5.4\times10^{-4}\ \mathrm{mol\,dm^{-3}}$. Result: $0.1022 \pm 0.0005\ \mathrm{mol\,dm^{-3}}$ ($95\ \%$, four results). With $t = 3.18$ for three degrees of freedom the interval is $60\ \%$ wider than the normal-distribution value $1.96$ would give.
:::
:::

::: exercise Detection limit from blanks {level=1 check="0.042"}
A fluorescence method has a sensitivity of $250$ counts per $\mathrm{nmol\,dm^{-3}}$, and the standard deviation of seven blank readings is $3.5$ counts. What is the limit of detection, using the $3s_0/b$ convention? (Enter the LOD in $\mathrm{nmol\,dm^{-3}}$.)
::: solution
$\mathrm{LOD} = 3\times3.5/250 = 0.042\ \mathrm{nmol\,dm^{-3}}$. The LOQ is $10\times3.5/250 = 0.14\ \mathrm{nmol\,dm^{-3}}$. With only seven blanks, $s_0$ itself is uncertain by roughly $30\ \%$, which is one reason detection limits are quoted to one or two significant figures.
:::
:::

::: exercise Using a response factor {level=1 check="3.1"}
In a chromatographic method, $5.00\ \mathrm{mg\,dm^{-3}}$ of analyte and $4.00\ \mathrm{mg\,dm^{-3}}$ of internal standard give an area ratio $A_\mathrm{X}/A_\mathrm{S} = 0.940$. A sample spiked to $4.00\ \mathrm{mg\,dm^{-3}}$ of internal standard gives $A_\mathrm{X}/A_\mathrm{S} = 0.583$. Find $[\mathrm{X}]$ in the spiked sample. (Enter $[\mathrm{X}]$ in $\mathrm{mg\,dm^{-3}}$.)
::: solution
$F = 0.940\times4.00/5.00 = 0.752$. Then $[\mathrm{X}] = 0.583\times4.00/0.752 = 3.10\ \mathrm{mg\,dm^{-3}}$. A quicker route: the ratio fell by the factor $0.583/0.940 = 0.620$ at the same $[\mathrm{S}]$, so $[\mathrm{X}] = 0.620\times5.00 = 3.10\ \mathrm{mg\,dm^{-3}}$.
:::
:::

::: exercise A paired comparison {level=2 check="4"}
Six water samples were analysed for nitrate (in $\mathrm{mg\,dm^{-3}}$) by ion chromatography and by a spectrophotometric method:

| sample | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| IC | $12.4$ | $8.6$ | $15.1$ | $10.2$ | $6.9$ | $13.5$ |
| spectrophotometry | $12.1$ | $8.5$ | $14.6$ | $10.1$ | $6.5$ | $13.3$ |

Use a paired $t$ test to decide whether the methods differ at the $95\ \%$ level. Why would an unpaired two-sample test be wrong here? (Enter the value of $t$.)
::: solution
The differences are $0.3, 0.1, 0.5, 0.1, 0.4, 0.2$, with $\bar{d} = 0.267$ and $s_d = 0.163$. Then $t = 0.267/(0.163/\sqrt{6}) = 4.00$. With $\nu = 5$, $t_\mathrm{crit} = 2.57$: the methods differ significantly, the IC results being about $0.27\ \mathrm{mg\,dm^{-3}}$ higher. An unpaired test would put the large sample-to-sample variation in nitrate content (from $7$ to $15\ \mathrm{mg\,dm^{-3}}$) into the standard deviations, swamping the small systematic difference; pairing removes it because each sample is its own control.
:::
:::

::: exercise A suspect result {level=2 check="1.90"}
Six determinations of a sample give $10.2$, $10.4$, $10.3$, $10.1$, $10.9$ and $10.3$. Calculate Grubbs's statistic $G$ for the value $10.9$ and decide at the $95\ \%$ level ($G_\mathrm{crit} = 1.887$ for $n = 6$). Comment on the result. (Enter $G$.)
::: solution
With all six values, $\bar{x} = 10.367$ and $s = 0.2805$, so $G = (10.9 - 10.367)/0.2805 = 1.90$. This just exceeds $1.887$, so the value is rejected at the $95\ \%$ level — but only just, and at the $99\ \%$ level ($G_\mathrm{crit} = 1.973$) it would be retained. A decision this marginal deserves a look at the record (was anything unusual about that determination?) and, if possible, another measurement; the report should state that the value was rejected and by what test. The median, $10.3$, is barely affected by the decision.
:::
:::

::: exercise Single-point standard addition {level=2 check="1.38"}
A $10.00\ \mathrm{cm^3}$ sample gives a signal of $0.240$. After $0.100\ \mathrm{cm^3}$ of a $100.0\ \mathrm{mg\,dm^{-3}}$ standard is added to the same solution, the signal is $0.410$. Allowing for the change in volume, find the analyte concentration in the sample. (Enter it in $\mathrm{mg\,dm^{-3}}$.)
::: hint
Write $S_1 = kc_x$ and $S_2 = k\,(c_xV_x + c_\mathrm{s}V_\mathrm{s})/(V_x + V_\mathrm{s})$ and eliminate $k$.
:::
::: solution
Dividing the two equations,
$$
\frac{S_2}{S_1} = \frac{c_xV_x + c_\mathrm{s}V_\mathrm{s}}{c_x(V_x+V_\mathrm{s})} \quad\Rightarrow\quad c_x = \frac{S_1c_\mathrm{s}V_\mathrm{s}}{S_2(V_x+V_\mathrm{s}) - S_1V_x} = \frac{0.240\times100.0\times0.100}{0.410\times10.10 - 0.240\times10.00} = \frac{2.40}{1.741} = 1.38\ \mathrm{mg\,dm^{-3}} .
$$
Ignoring the $1\ \%$ dilution would give $1.41$. A single addition is quick but gives no check of linearity and no estimate of uncertainty from the fit; multiple additions are preferred.
:::
:::

::: exercise How many replicates of the unknown? {level=3 check="6"}
For the calibration of [[#ex-calibration]], what is the smallest number $m$ of replicate readings of an unknown with mean signal $0.405$ that brings the $95\ \%$ confidence half-width below $0.16\ \mathrm{mg\,dm^{-3}}$? What is the smallest half-width achievable with this calibration however large $m$ is? (Enter $m$.)
::: hint
Evaluate $t\,s_{x_0}$ from [[#eq-sx0]] with $t = 2.78$ (the degrees of freedom belong to the calibration line) for $m = 4, 5, 6, \dots$
:::
::: solution
With $s_{y/x}/b = 0.09624$, the bracket is $1/m + 1/6 + 0.0009$. For $m = 5$: $2.776\times0.09624\times\sqrt{0.2000 + 0.1676} = 0.162$; for $m = 6$: $2.776\times0.09624\times\sqrt{0.1667+0.1676} = 0.154$. So $m = 6$. As $m\to\infty$ the half-width tends to $2.776\times0.09624\times\sqrt{0.1676} = 0.109\ \mathrm{mg\,dm^{-3}}$, set by the calibration itself; to go lower one needs more standards (larger $n$) or a less noisy measurement (smaller $s_{y/x}$).
:::
:::

::: exercise Uncertainty of a standard-addition result {level=3 check="0.64"}
Show that [[#eq-sxe]] follows from [[#eq-sx0]]. Then apply it to these data: additions of $0$, $5.0$, $10.0$, $15.0\ \mu\mathrm{g\,dm^{-3}}$ of analyte (concentration in the measured solution) give signals $0.112$, $0.205$, $0.301$, $0.390$. Find $x_\mathrm{E}$ and its $95\ \%$ confidence half-width. (Enter the half-width in $\mu\mathrm{g\,dm^{-3}}$.)
::: hint
Set $\bar{y}_0 = 0$ and remove the $1/m$ term. The fit has $n - 2 = 2$ degrees of freedom; $t_{0.975,2} = 4.30$.
:::
::: solution
The extrapolated point corresponds to reading the line at the signal $y = 0$, which is not a measurement and has no variance, so the $1/m$ term vanishes; the distance from the centroid becomes $(0 - \bar{y})^2 = \bar{y}^2$; this is [[#eq-sxe]]. For the data: $b = 0.01860$, $a = 0.1125$, $s_{y/x} = 0.00212$, $\bar{y} = 0.252$, $S_{xx} = 125$. Then $x_\mathrm{E} = 0.1125/0.01860 = 6.05\ \mu\mathrm{g\,dm^{-3}}$ and
$$
s_{x_\mathrm{E}} = \frac{0.00212}{0.01860}\sqrt{\frac{1}{4} + \frac{0.252^2}{0.01860^2\times125}} = 0.1140\times\sqrt{0.250 + 1.468} = 0.150\ \mu\mathrm{g\,dm^{-3}} .
$$
The half-width is $4.30\times0.150 = 0.64\ \mu\mathrm{g\,dm^{-3}}$, so $x_\mathrm{E} = 6.0 \pm 0.6\ \mu\mathrm{g\,dm^{-3}}$ — a $10\ \%$ uncertainty from readings that scatter by under $1\ \%$, because of the extrapolation and the few degrees of freedom.
:::
:::

::: exercise A stricter detection limit {level=3 check="3.97"}
A regulator wants false positives to be rarer than false negatives: $\alpha = 0.01$ and $\beta = 0.05$. Using [[#prop-detection]], find the critical level and the detection limit in units of $\sigma_0$. Explain in words why reducing $\alpha$ raises $L_\mathrm{D}$ even though $\beta$ is unchanged. (Enter $L_\mathrm{D}/\sigma_0$.)
::: solution
$z_{0.99} = 2.326$ and $z_{0.95} = 1.645$, so $L_\mathrm{C} = 2.33\,\sigma_0$ and $L_\mathrm{D} = (2.326 + 1.645)\sigma_0 = 3.97\,\sigma_0$. Lowering $\alpha$ moves the decision threshold $L_\mathrm{C}$ up, further into the blank's tail. A true signal must then be larger for $95\ \%$ of its distribution to lie above the new threshold, so the detection limit rises by the same amount as the critical level. The two error rates trade against each other at fixed $\sigma_0$; only a smaller $\sigma_0$ (more blanks, a quieter instrument, cleaner reagents) lowers both limits.
:::
:::
