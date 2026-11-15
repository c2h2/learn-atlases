The CAPM prices one covariance, with the market. The cross-section of average returns, in the samples that have been most closely studied, does not line up with that one covariance. Size, book-to-market, momentum, profitability and investment all forecast average returns after market beta is controlled. A **factor model** keeps linear pricing and adds extra factors until the intercepts in a time-series regression are small enough to live with. Whether those factors are risk, or mispricing, or a bit of both, is a live dispute. This chapter states the **arbitrage pricing theory** (APT), constructs the Fama–French and momentum factors, and shows how the models are estimated. The factors are research objects. Their average returns in a past sample are not a reason to hold them.

The CAPM is [[asset-pricing/capm]]. Multiple regression is [[econometrics/multiple-regression]]. The efficiency debate that uses these models as expected-return benchmarks is [[asset-pricing/market-efficiency]].

## The single-index model and its leftovers

The index-model regression of the previous chapter,

$$
R_{it}^e = \alpha_i + \beta_i R_{mt}^e + \varepsilon_{it},
$$

decomposes excess return into a market piece and a residual. If the residuals $\varepsilon_{it}$ are uncorrelated across $i$, diversification drives residual variance to zero in a well-spread portfolio, and the CAPM's claim that only $\beta_i$ is priced is statistically natural. In the data the residuals are *not* uncorrelated: shares in the same industry, shares of small firms, shares with high book-to-market, shares that went up last year, all co-move after the market is taken out. Those co-movements are extra common factors. A pricing model that ignores them will tend to produce intercepts that line up with the omitted factors.

::: definition K-factor model {#def-kfactor}
A **K-factor model** for excess returns is

$$
R_{it}^e = \alpha_i + \boldsymbol\beta_i\T \mathbf{f}_t + \varepsilon_{it}, \qquad \E[\varepsilon_{it}\mid \mathbf{f}_t] = 0,
$$

where $\mathbf{f}_t$ is a $K$-vector of factor realisations (excess returns, or mean-zero surprises) and $\boldsymbol\beta_i$ is a $K$-vector of **factor loadings**. The model is a **return-generating process**. It becomes a **pricing model** when it is paired with a restriction on the intercepts, typically $\alpha_i = 0$ for all $i$, or with a restriction on expected returns of the form $\E[R_i^e] = \boldsymbol\beta_i\T\boldsymbol\lambda$ for a $K$-vector of **factor risk premia** $\boldsymbol\lambda$.
:::

If the factors are themselves excess returns, $\boldsymbol\lambda = \E[\mathbf{f}]$ and the intercept restriction $\alpha_i = 0$ *is* the pricing model: each asset's expected excess return equals the sum of its loadings times the factors' expected excess returns. That is the form in which Fama and French (1993) is almost always estimated. If the factors are macroeconomic surprises with mean zero, $\boldsymbol\lambda$ has to be estimated in the cross-section, as in Chen, Roll and Ross (1986).

## The arbitrage pricing theory

Ross (1976, *Journal of Economic Theory*) asked how far one can get without mean–variance preferences and without a market portfolio. The answer is an approximate linear pricing relation, in a large market, if residuals are well diversified and there is no **asymptotic arbitrage**.

::: definition Asymptotic arbitrage {#def-asarb}
In a sequence of markets with $n$ assets, $n\to\infty$, an **asymptotic arbitrage** is a sequence of portfolios $\mathbf{w}^n$ with $\mathbf{w}^n\T\mathbf{1} = 0$ (zero net investment), $\E[R(\mathbf{w}^n)] \ge \delta > 0$ for all large $n$, and $\Var(R(\mathbf{w}^n)) \to 0$. Intuitively: a free lunch that becomes riskless as the market grows.
:::

::: proposition Ross APT {#prop-apt}
Suppose returns obey a $K$-factor generating process as in [[#def-kfactor]], with $\E[\varepsilon_i] = 0$, $\Var(\varepsilon_i) \le \bar\sigma^2 < \infty$, and $\Cov(\varepsilon_i, \varepsilon_j) = 0$ for $i \neq j$. If there is no asymptotic arbitrage, then there exist factor premia $\lambda_0, \boldsymbol\lambda$ such that

$$
\sum_{i=1}^{n} \bigl(\E[R_i] - \lambda_0 - \boldsymbol\beta_i\T\boldsymbol\lambda\bigr)^2
$$

remains bounded as $n\to\infty$. In particular, the pricing errors $\E[R_i] - \lambda_0 - \boldsymbol\beta_i\T\boldsymbol\lambda$ are negligible for *most* assets, and are negligible for any well-diversified portfolio. Assumptions: the factor structure, bounded residual variances, uncorrelated residuals, and no asymptotic arbitrage. The result is approximate, and it is silent about any finite collection of assets.
:::

::: proof
Sketch. Let $e_i = \E[R_i] - \lambda_0 - \boldsymbol\beta_i\T\boldsymbol\lambda$ be the pricing error, with $(\lambda_0, \boldsymbol\lambda)$ chosen to minimise $\sum_i e_i^2$ (so the errors are orthogonal to a constant and to the betas). A well-diversified zero-net-investment portfolio that puts weight proportional to $e_i$ on each asset has expected return proportional to $\sum_i e_i^2 / n$ and variance that vanishes like $1/n$ if residuals are uncorrelated and bounded. If $\sum_i e_i^2$ grew with $n$, this construction would be an asymptotic arbitrage. Ruling that out bounds $\sum_i e_i^2$. Details are in Ross (1976) and in Chamberlain and Rothschild (1983, *Econometrica*), who allow an approximate factor structure.
:::

Three comments, because the APT is often asked to do more than it says.

First, it is an *approximate* statement about a *large* cross-section. An intercept of two per cent a year on a single named share is compatible with the APT. An intercept of two per cent a year on a well-diversified portfolio of a hundred such shares is not, unless the residuals were never diversified.

Second, the factors are not identified by the theory. Any rotation of $\mathbf{f}$ with a matching rotation of $\boldsymbol\beta$ and $\boldsymbol\lambda$ produces the same pricing. Naming the factors is extra economics: a market index, a size spread, an inflation surprise.

Third, “no asymptotic arbitrage” is not “no mispricing”. It is the claim that mispricing cannot be scaled up, at vanishing risk, as $n$ grows. [[asset-pricing/behavioural-finance]] is about why even a finite, risky mispricing might not be removed. The APT assumes that kind of mispricing away, for well-diversified claims, and it does not assume it away for individual shares.

::: example A two-factor APT number {#ex-apt}
A well-diversified portfolio has loadings $(1.2,\; -0.5)$ on two factors with premia $\boldsymbol\lambda = (0.04,\; 0.03)$, and $\lambda_0 = 0.03$. Compute the APT expected return. What would a pricing error of $0.02$ on this portfolio mean for [[#prop-apt]]?
::: solution
$\E[R] = 0.03 + 1.2\times 0.04 + (-0.5)\times 0.03 = 0.03 + 0.048 - 0.015 = 0.063$. A $0.02$ error on a *well-diversified* portfolio is a serious challenge to the APT in a large market, because that error can be held at low residual variance. The same $0.02$ on a single share is compatible with the bound on $\sum_i e_i^2$. The distinction is the whole of Ross's approximation.
:::
:::

## Size, value and momentum

The empirical factors that dominate classroom and research practice are portfolios, not macro surprises. Fama and French (1993, *Journal of Financial Economics*) sort US shares by market capitalisation and by book-to-market equity, form six value-weighted portfolios at the intersections (small/big $\times$ low/middle/high book-to-market), and define

$$
\begin{align*}
\mathrm{SMB}_t &= \tfrac13(\mathrm{SV}+\mathrm{SN}+\mathrm{SG})_t - \tfrac13(\mathrm{BV}+\mathrm{BN}+\mathrm{BG})_t,\\
\mathrm{HML}_t &= \tfrac12(\mathrm{SV}+\mathrm{BV})_t - \tfrac12(\mathrm{SG}+\mathrm{BG})_t.
\end{align*}
$$

SMB is **small minus big**; HML is **high minus low** book-to-market (value minus growth). The third factor is the market excess return $R_m^e$. The **three-factor model** is

$$
R_{it}^e = \alpha_i + \beta_{i,m} R_{mt}^e + \beta_{i,s}\mathrm{SMB}_t + \beta_{i,h}\mathrm{HML}_t + \varepsilon_{it}.
$$

Pricing, in the return-factor sense, is $\alpha_i = 0$. Fama and French (1993) report that the three factors absorb most of the common variation in a set of size-and-value sorted portfolios, and that the intercepts on those portfolios are close to zero — as they would almost have to be, because SMB and HML were built from the same sorts. The harder test is whether the intercepts vanish on *other* sorts: industry portfolios, momentum portfolios, profitability sorts.

Jegadeesh and Titman (1993, *Journal of Finance*) document **momentum**: US shares that have done well over the past $3$ to $12$ months continue, on average, to do well over the next $3$ to $12$ months, and shares that have done badly continue to do badly. A typical reported spread, on their $1965$–$1989$ sample, is about one per cent per month for a $6$-month formation and $6$-month holding strategy, before costs. Carhart (1997, *Journal of Finance*) adds a momentum factor UMD (up minus down) to the three-factor model in order to describe mutual-fund returns. Momentum is an awkward factor: it is not a sort on a characteristic measured from the balance sheet, it reverses over long horizons (De Bondt and Thaler 1985), and it has suffered sharp crashes, notably in 2009. It is also, in many samples, the factor that the three-factor model fails most visibly.

Fama and French (2015, *Journal of Financial Economics*) add **RMW** (robust minus weak operating profitability) and **CMA** (conservative minus aggressive investment), producing a five-factor model. Hou, Xue and Zhang (2015) build a related $q$-factor model from investment and profitability. The extra factors help on profitability and investment sorts; they do not absorb momentum. There is no theorem that five is the right number. There is a research programme of adding factors until the intercepts of interest vanish, and a matching programme of asking whether the new factors are robust out of sample, internationally, and after costs.

::: example A three-factor expected excess return {#ex-ff}
An invented asset has loadings $\beta_m = 0.8$, $\beta_s = 0.5$, $\beta_h = 0.3$ on factors whose expected excess returns are $\E[R_m^e] = 0.06$, $\E[\mathrm{SMB}] = 0.02$, $\E[\mathrm{HML}] = 0.04$. Under the three-factor pricing restriction $\alpha = 0$, compute $\E[R^e]$.
::: solution
$\E[R^e] = 0.8\times 0.06 + 0.5\times 0.02 + 0.3\times 0.04 = 0.048 + 0.010 + 0.012 = 0.070$. If the same asset has CAPM beta $0.8$ and one applies the CAPM with the same market premium, the CAPM expected excess return is $0.048$. The extra $0.022$ is the model's compensation for size and value loadings. Whether $0.02$ and $0.04$ are the right premia is an empirical question about a sample, not a number this example can settle. The calculation is the arithmetic of $\alpha = 0$, not a forecast.
:::
:::

::: widget plot
f: 0.06*x
f: 0.06*x + 0.02*0.5 + 0.04*0.3
x: 0, 2
y: 0, 0.16
labels: \text{CAPM SML}; \text{FF with } \beta_s{=}0.5,\;\beta_h{=}0.3
caption: Two pricing lines in $(\beta_m, \E[R^e])$ space, using the invented premia of [[#ex-ff]]. The upper line is shifted by the size and value contributions, which do not depend on $\beta_m$. An asset with $\beta_m = 0.8$ sits at $0.048$ on the CAPM line and at $0.070$ on the three-factor line. Change the story, not the slopes: extra factors move the intercept of a plot against market beta. The premia are invented.
:::

## How factor models are estimated

Two regressions, often combined, are the workhorses. Both are ordinary least squares; the inference is not.

**Time-series regression.** For each asset (or portfolio) $i$, regress $R_{it}^e$ on a constant and on the factor excess returns. The slopes are $\hat{\boldsymbol\beta}_i$; the intercept is $\hat\alpha_i$. Under the pricing restriction, $\hat\alpha_i$ should be zero. Gibbons, Ross and Shanken (1989) give an $F$-test of the joint hypothesis $\boldsymbol\alpha = \mathbf{0}$ across a set of assets, valid when residuals are i.i.d. normal. With non-normal, heteroskedastic, or cross-correlated residuals the test is typically replaced by a $\chi^2$ test with a robust covariance, or by GMM. The GRS test is still the number most papers report, with a caveat.

**Cross-sectional regression.** First-pass betas are estimated in the time series. Second-pass, average (or period-by-period) returns are regressed on those betas. The slopes are estimates of $\boldsymbol\lambda$. Fama and MacBeth (1973) run the second pass every period and use the time-series standard deviation of the $\hat{\boldsymbol\lambda}_t$ as a standard error, which is robust to cross-sectional correlation. Shanken (1992) corrects those standard errors for the fact that the betas were estimated. Errors-in-variables in $\hat{\boldsymbol\beta}$ biases $\hat{\boldsymbol\lambda}$ toward zero if it is ignored; grouping stocks into portfolios is the classical, imperfect, response.

A factor that is itself a return can be tested in the time series alone: $\alpha_i = 0$ is the claim, and $\boldsymbol\lambda$ does not need a second pass. A macro factor cannot. That is why SMB and HML, whatever one thinks of them as risks, are convenient.

::: example Macro factors versus return factors {#ex-macro}
A two-factor model uses unexpected inflation $UI$ and the industrial-production surprise $IP$, both scaled to have mean zero. Cross-sectional estimates are $\lambda_{UI} = -0.01$ and $\lambda_{IP} = 0.02$. An asset has $\beta_{UI} = 0.5$ and $\beta_{IP} = 1.0$. Compute $\E[R^e]$ if $\lambda_0 = 0.03$, and say why this $\boldsymbol\lambda$ cannot be read off a time-series intercept.
::: solution
$\E[R^e] = 0.03 + 0.5\times(-0.01) + 1.0\times 0.02 = 0.045$. Unexpected inflation and $IP$ are not excess returns, so their means are zero by construction and a time-series regression of $R_i^e$ on $UI$ and $IP$ has intercept $\E[R_i^e]$, not a pricing error. The premia $\boldsymbol\lambda$ have to come from a second-pass cross-section. That is the difference between Chen, Roll and Ross (1986) and Fama and French (1993). The numbers are invented; $-0.01$ is not a forecast of inflation's price of risk.
:::
:::

::: example Reading an intercept {#ex-alpha-ff}
A portfolio of small growth shares is regressed on $R_m^e$, SMB and HML. The estimated intercept is $-0.004$ per month, with a Fama–MacBeth $t$-statistic of $-3.1$. The estimated loadings are $\hat\beta_m = 1.1$, $\hat\beta_s = 0.8$, $\hat\beta_h = -0.6$. Interpret, without converting the intercept into a trading recommendation.
::: solution
The three-factor model prices this portfolio at $\hat\beta\T \E[\mathbf{f}]$; the portfolio has earned $0.4$ per cent a month *less* than that, on average, in the sample, a gap that is large relative to the Fama–MacBeth standard error. Small growth is a known problem child of the three-factor model (Fama and French 1993, 2015). The negative HML loading says the portfolio behaves like growth; the positive SMB loading says it behaves like small. A four-factor model with momentum often reduces this intercept, because small growth includes recent losers. None of that implies that the intercept will continue, that it survives costs, or that a reader should short the portfolio. It is a description of a sample relative to a model.
:::
:::

## Risk, mispricing, or fishing?

Three readings of the same tables coexist, and this course does not pick a winner.

**Risk.** SMB, HML, RMW, CMA are long–short portfolios that lose money in states of the world that a representative agent cares about: recessions, distress, low investment opportunities. Average returns are then compensation, and $\alpha_i = 0$ is an equilibrium restriction in a multi-factor ICAPM or APT. The difficulty is to name the state variable. Book-to-market predicts distress, but a distress factor does not, in most implementations, absorb HML (Daniel and Titman 1997 argue that characteristics, not covariance, line up with average returns).

**Mispricing.** High book-to-market shares are neglected, or over-sold, and their subsequent returns are a correction. Momentum is delayed reaction, or underreaction, to news. On this reading the factors are not risks to be held for a premium; they are the footprints of the errors. [[asset-pricing/behavioural-finance]] develops the argument, and the limits-to-arbitrage reasons why the footprints are not immediately arbitraged away. The difficulty is identification: a risk that the econometrician has not measured looks like mispricing.

**Fishing.** Harvey, Liu and Zhu (2016, *Review of Financial Studies*) count hundreds of published factors and argue that conventional $t$-statistic cut-offs do not control the multiple-testing problem. A factor that was found by sorting on many characteristics, on one sample, has an inflated $t$. Replication on later samples, on international data, and after a pre-specified cost, is the check. Some factors (value, in many countries; momentum, in many countries and asset classes) have survived that check more often than others. Survival is not proof of a premium going forward.

The honest summary is that the CAPM's one-factor description of the cross-section is inadequate in the standard US samples; that a small number of additional return factors describe a large share of the leftover; and that the interpretation of those factors is not settled. Using a three- or five-factor regression as a *benchmark* for an intercept — “does this portfolio earn more than size, value and the market would suggest?” — is a well-defined statistical operation. Treating the historical average of HML as $\E[\mathrm{HML}]$ next year is a modelling step, and a large one.

::: warning Treating a published factor premium as a required return
The average of HML over $1963$–$1991$ is a sample mean. Fama and French (1993) used it to describe that sample. Substituting it into $\boldsymbol\beta\T\boldsymbol\lambda$ and calling the result “the” expected return on a named share from 2026 onwards ignores sampling variation, structural change, costs, and the selection that chose HML among many sorts. This course uses factor models to *organise* average returns. It does not use them to recommend a position in SMB, HML, or anything else.
:::

::: quiz
In the APT of [[#prop-apt]], a pricing error of two per cent a year is most damaging to the theory when it is found on:
- [ ] a single share with high residual variance
- [x] a well-diversified portfolio, whose residual variance is small
- [ ] the risk-free asset
- [ ] any asset, because the APT is an exact finite-$n$ model
::: solution
The APT bounds the *sum of squared* pricing errors and therefore allows large errors on a few assets. A well-diversified portfolio averages those errors; a remaining error on that portfolio is a candidate for asymptotic arbitrage. The APT is approximate and asymptotic, not exact at finite $n$.
:::
:::

## Where this leads

[[asset-pricing/market-efficiency]] takes these models as the expected-return benchmarks against which predictability and event-study residuals are measured. [[asset-pricing/stochastic-discount-factor]] will show that a $K$-factor pricing model is equivalent to a stochastic discount factor that is linear in the $K$ factors. [[asset-pricing/behavioural-finance]] returns to the mispricing reading and asks why it can persist. The next time a table reports that “alpha is zero in a five-factor model”, the right questions are: which factors, which sample, which assets, and what would change the intercept.

::: history
Stephen Ross's 'The Arbitrage Theory of Capital Asset Pricing' appeared in the *Journal of Economic Theory* in December 1976. Chen, Roll and Ross (1986, *Journal of Business*) estimated a macro-factor version. Fama and French (1992, *Journal of Finance*) documented the failure of beta, in US 1963–1990 data, to describe the cross-section once size is controlled, and the success of size and book-to-market. Fama and French (1993, *Journal of Financial Economics*) built SMB and HML. Jegadeesh and Titman (1993, *Journal of Finance*) documented momentum on US shares over $1965$–$1989$. Carhart (1997) added UMD. Fama and French (2015) added RMW and CMA. Harvey, Liu and Zhu (2016) set out the multiple-testing problem that any new factor now has to face.
:::

::: summary
- A $K$-factor model is $R_i^e = \alpha_i + \boldsymbol\beta_i\T\mathbf{f} + \varepsilon_i$. It is a pricing model when $\alpha_i = 0$ (factors that are excess returns) or when $\E[R_i^e] = \boldsymbol\beta_i\T\boldsymbol\lambda$.
- The APT (Ross 1976) gives *approximate* linear pricing in a large market with a factor structure and no asymptotic arbitrage. It does not identify the factors and it does not price every single share exactly.
- Fama and French (1993) construct SMB and HML from sorts on size and book-to-market. The three-factor model is the market excess return plus those two. Carhart adds momentum (UMD); Fama and French (2015) add profitability and investment.
- Jegadeesh and Titman (1993) report a momentum spread of about one per cent per month, before costs, on a 6–6 strategy in US 1965–1989 data.
- Time-series intercepts test $\alpha = 0$ when factors are returns. Cross-sectional slopes estimate $\boldsymbol\lambda$ when they are not. GRS and Fama–MacBeth are the standard, imperfect, inference tools.
- Risk, mispricing and fishing are three readings of the same intercepts. A factor regression is a benchmark. A historical factor average is not a recommended holding.
:::

## Exercises

::: exercise Two-factor APT expected return {level=1 check="0.063"}
Using the inputs of [[#ex-apt]], enter the APT expected return as a decimal.
::: solution
$0.03 + 1.2\times 0.04 - 0.5\times 0.03 = 0.063$. A pricing error on top of this number is a different object, and is more or less damaging according to how diversified the claim is.
:::
:::

::: exercise Three-factor arithmetic {level=1 check="0.07"}
Using the loadings and premia of [[#ex-ff]], enter $\E[R^e]$ under $\alpha = 0$.
::: solution
$0.8\times 0.06 + 0.5\times 0.02 + 0.3\times 0.04 = 0.07$. The CAPM piece alone is $0.048$.
:::
:::

::: exercise CAPM leftover {level=1 check="0.022"}
In [[#ex-ff]], enter the part of $\E[R^e]$ that comes from SMB and HML together, as a decimal.
::: solution
$0.5\times 0.02 + 0.3\times 0.04 = 0.01 + 0.012 = 0.022$. This is the shift between the two lines in the widget.
:::
:::

::: exercise SMB construction {level=2}
Write SMB in terms of the six Fama–French intersection portfolios, and explain in one sentence why SMB is not the same object as “the small-share premium relative to the market”.
::: solution
$\mathrm{SMB} = \tfrac13(\mathrm{SV}+\mathrm{SN}+\mathrm{SG}) - \tfrac13(\mathrm{BV}+\mathrm{BN}+\mathrm{BG})$. It is an equal-weighted average of three small-minus-big spreads, one in each book-to-market bucket, so it is *orthogonal, by construction, to the book-to-market sort*. A raw small-minus-market spread would mix size with whatever value tilt small shares happen to have. The Fama–French construction is designed to let SMB and HML be used together without that contamination. It is still a sort on two characteristics, not a theorem about risk.
:::
:::

::: exercise Interpreting a GRS rejection {level=2}
The GRS test of $\boldsymbol\alpha = \mathbf{0}$ on a set of 25 size-and-value portfolios, in a three-factor model, fails to reject. The same test on 10 momentum portfolios rejects at one per cent. What can you conclude about the three-factor model, and what can you not?
::: solution
The three-factor model is not rejected as a description of the 25 portfolios it was designed around (or that are close to its construction). It *is* rejected as a description of momentum portfolios in this sample: some momentum $\alpha_i$ are jointly far from zero. You cannot conclude that the model is “true”, because the 25-portfolio test has limited power against alternatives the portfolios were not built to reveal, and because a non-rejection is not an acceptance. You cannot conclude that momentum is an arbitrage, because the test says nothing about costs, risk that is not in the three factors, or out-of-sample behaviour. You *can* conclude that, in this sample, adding a momentum factor will move those intercepts, which is why Carhart (1997) did so.
:::
:::

::: exercise APT versus CAPM {level=2}
Name two assumptions of the CAPM that the APT does not make, and one thing the CAPM gives you that the APT does not.
::: solution
The APT does not assume mean–variance preferences (or normality, or quadratic utility), and it does not assume the existence of a mean–variance-efficient market portfolio that agents can hold. It assumes a factor structure and no asymptotic arbitrage instead. What the CAPM gives and the APT does not: an *exact* pricing relation for every asset, including assets in small number, in terms of a named portfolio (the market). The APT's relation is approximate, applies to well-diversified claims, and does not name the factors. Exactness and identification are the CAPM's advantages; weaker preference assumptions and no need for the true market are the APT's.
:::
:::

::: exercise Characteristic versus covariance {level=3}
Daniel and Titman (1997) sort shares on book-to-market *and* on estimated HML loading, and ask whether average returns follow the characteristic or the covariance. Sketch how such a sort can distinguish a risk reading of HML from a characteristic reading, and name one reason the distinction is statistically fragile.
::: hint
If covariance is what is priced, two shares with the same $\beta_h$ should have the same expected return even if their book-to-market ratios differ.
:::
::: solution
A risk reading of the three-factor model says $\E[R^e] = \beta_m \lambda_m + \beta_s\lambda_s + \beta_h\lambda_h$. Holding $\hat\beta_h$ fixed, book-to-market should not help. A characteristic reading says book-to-market itself lines up with average returns, even among shares that have the same estimated loading on HML. A double sort that produces a book-to-market spread *inside* an HML-beta bucket, and little HML-beta spread *inside* a book-to-market bucket, favours the characteristic reading; the reverse favours risk. Fragility: $\hat\beta_h$ is estimated with noise, so a sort on $\hat\beta_h$ is a sort on a noisy proxy for the true loading. Noise attenuates the covariance story (errors-in-variables) and can make characteristics look stronger than they are. The debate did not end in 1997; later samples and international evidence have been used on both sides.
:::
:::

::: exercise Multiple testing {level=3}
A researcher tries $200$ economically motivated sorts, reports the one with a $t$-statistic of $2.4$ on the long–short average return, and does not mention the other $199$. Why is $2.4$ not comparable to the $t$ on HML in Fama and French (1993)? What would you want to see before treating the new sort as a factor on the same footing?
::: hint
The null distribution of the *maximum* of $200$ $t$-statistics is not $N(0,1)$.
:::
::: solution
Under a global null that no sort has a premium, the largest of $200$ roughly independent $t$-statistics has a far fatter right tail than a single $t$. A threshold of $2.0$, or even $2.4$, then over-rejects; Harvey, Liu and Zhu (2016) argue for cut-offs well above $3$ once the literature's search is taken into account. HML was one of a small number of characteristics with a prior literature (Stattman 1980; Rosenberg, Reid and Lanstein 1985; Chan, Hamao and Lakonishok 1991 on Japan), and it has been re-estimated on later US samples and in other countries. Before treating the new sort as a peer, one would want: a pre-specified definition, a $t$ that survives a multiple-testing adjustment (or an out-of-sample split that was not used to find the sort), an international check, a statement of costs, and a demonstration that the sort is not a relabelling of SMB, HML, UMD, RMW or CMA. None of that converts a surviving factor into a recommended position.
:::
:::
