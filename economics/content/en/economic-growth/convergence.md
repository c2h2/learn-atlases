If the Solow model is a good description of the world, and if countries share $s$, $n$, $\delta$, $g$ and a production function, then a poor country — one with low $k$ relative to $k^*$ — should grow faster than a rich one. Capital is scarce, its marginal product is high, and diminishing returns do the rest. That prediction is **absolute convergence**. It is not what a scatter of the whole world looks like. It is closer to what a scatter of OECD countries, or of US states, or of Japanese prefectures, looks like. The distinction is the subject of this chapter.

Two refinements save the mechanism without pretending that Chad and Switzerland are the same Solow economy. **Conditional convergence** allows $s$, $n$ and human capital to differ, and predicts that each country grows faster the further it is from *its own* steady state. The **augmented Solow model** of Mankiw, Romer and Weil (1992, *QJE*) adds human capital as an accumulated factor and fits the cross-section of income levels far better than the textbook model. Neither refinement makes $A$ the same everywhere. Development accounting in the last chapter already said it is not.

## Absolute and conditional convergence

::: definition Absolute and conditional convergence {#def-convergence}
**Absolute** (or unconditional) **convergence** is the hypothesis that $g_y$ is a decreasing function of $y$ across economies that share the same steady state. **Conditional convergence** is the hypothesis that $g_y$ is a decreasing function of $y$ once the determinants of the steady state — in the Solow model, $s$, $n+\delta+g$, and, once it is added, human capital — are held constant. **Club convergence** is the hypothesis that convergence holds within groups that share initial conditions or institutions, but not across groups.
:::

The Solow model predicts absolute convergence among economies that share parameters, and conditional convergence among those that do not. It does not predict that every poor country grows fast. A country with low $s$ and high $n$ has a low $y^*$ and may be *above* its own steady state even though it is poor in the world ranking.

Linearising the Solow model around $\tilde k^*$ gives a precise speed.

::: proposition The convergence speed in the Solow model {#prop-speed}
Let $\lambda \equiv (1-\alpha)(n+g+\delta)$. Near the steady state of the Solow model with labour-augmenting technology,

$$
\ln y(t) - \ln y^*(t) \approx e^{-\lambda t}\bigl(\ln y(0)-\ln y^*(0)\bigr),
$$ {#eq-speed}

where $y^*(t)$ is the balanced-growth path (growing at $g$). The half-life of a gap in $\ln y$ is $(\ln 2)/\lambda$. With $\alpha=1/3$, $n+g+\delta=0.08$, one has $\lambda=0.053$ and a half-life of 13 years. With $\alpha=2/3$ (broad capital) the half-life triples, to about 39 years.
:::

::: proof
From [[economic-growth/solow-model]], $\dot{\tilde k} \approx -(1-\alpha)(n+g+\delta)(\tilde k-\tilde k^*)$. For Cobb–Douglas, $\ln y = \ln A + \alpha \ln \tilde k + \text{const}$, so a proportional gap in $\tilde k$ is a proportional gap in $y$ (given $A$), scaled by $\alpha$; the *rate* $\lambda$ at which the log gap closes is still $(1-\alpha)(n+g+\delta)$. Integrating the linear ODE gives [[#eq-speed]]. The half-life follows by setting $e^{-\lambda T}=1/2$.
:::

A half-life of 13 years is short relative to the persistent cross-country gaps of [[economic-growth/growth-facts]]. Barro and Sala-i-Martin (*Economic Growth*, 2004, and a sequence of papers in the 1990s) estimated $\lambda \approx 0.02$ on US states, Japanese prefectures and European regions — a 2 per cent *conditional* convergence rate, half-life about 35 years — which matches the Solow model only if $\alpha$ is well above one-third, or if the model is augmented with slowly accumulating human capital. That is a genuine tension, not a rounding error.

::: widget plot
f: exp(-l*x)
sliders: l=0.02:0.01:0.08:0.005
x: 0, 80
y: 0, 1.1
labels: e^{-\lambda t}
caption: The linearised Solow gap $e^{-\lambda t}$ as a function of time in years. At the Barro–Sala-i-Martin estimate $\lambda=0.02$, half the gap remains at 35 years. Raise $\lambda$ toward the textbook-Solow 0.05 ($\alpha=1/3$) and the gap is mostly gone in a generation. Persistence of income differences is easier to match if capital is broad or if $A$ itself differs.
:::

::: example Half-lives {#ex-halflife}
Compute the half-life of a log-income gap at $\lambda=0.02$ and at $\lambda=0.053$. After 40 years, what fraction of the gap remains in each case?
::: solution
$T_{1/2}=\ln 2/\lambda$. At $\lambda=0.02$, $T_{1/2}=34.7$ years and $e^{-0.02\times 40}=0.449$ (45 per cent remains). At $\lambda=0.053$, $T_{1/2}=13.1$ years and $e^{-0.053\times 40}=0.120$ (12 per cent remains). Forty years of OECD-style conditional convergence still leaves almost half the gap; forty years of textbook-Solow convergence would have closed it. The data, among regions that share institutions, look more like $\lambda=0.02$ (Barro and Sala-i-Martin 1992, *JPE*, on US states).
:::
:::

## What the cross-section looks like

Baumol (1986, *AER*) plotted growth against initial income for 16 industrial countries in Maddison's data and found a tight negative slope — absolute convergence among the club that was already rich in 1870. DeLong (1988, *AER*) showed that the sample was selected on the dependent variable: countries that were rich in 1870 and *failed* to converge were less likely to be in the 16. Once the sample is the world, or even a broad cross-section of 1960, the negative slope disappears.

Pritchett (1997, "Divergence, Big Time") is the world-sample statement. From 1870 to the late twentieth century the ratio of richest to poorest *rose*, because the frontier grew at 1.5–2 per cent and many poor countries did not. Absolute convergence is not a fact about the world.

It is closer to a fact about some clubs.

- **US states**, 1880–2000: poor states grew faster (Barro and Sala-i-Martin 1992). The slope is about 2 per cent a year.
- **Japanese prefectures** and **European regions**: similar (Barro and Sala-i-Martin 1991, *Brookings Papers*).
- **OECD** countries after 1950: a downward-sloping scatter, contaminated by the fact that OECD membership is itself correlated with $y^*$.
- **World**, 1960–2019: no downward slope in an unconditional scatter of growth on initial $y$. China, South Korea, Taiwan and Botswana sit above the cloud; many sub-Saharan African countries sit below it. The Maddison 2023 numbers of [[economic-growth/growth-facts]] — South Korea 5.6 per cent from a 1960 level *below* the Philippines; Ghana 1.1 per cent from a 1960 level *above* Botswana — are the cloud.

::: example An unconditional scatter that fails {#ex-unconditional}
In 1960, Ghana's GDP per person was 2,197 and South Korea's was 1,548 (Maddison 2023). Average annual growth 1960–2019 was 1.08 per cent in Ghana and 5.62 per cent in Korea. Does this pair support absolute convergence? What about Botswana (564, then 5.81 per cent) versus Ghana?
::: solution
Absolute convergence says *poorer implies faster*. Korea was poorer than Ghana in 1960 and grew faster: that pair fits. Botswana was poorer still and grew faster than both: that pair also fits. The world scatter does not, because plenty of 1960-poor countries (see Pritchett 1997, and the sub-Saharan observations in Maddison 2023) grew slowly. Two or three well-chosen pairs can always be made to look like a law. The law is a slope on a *sample*, and the world sample's slope is roughly zero.
:::
:::

::: example A conditional-convergence calculation {#ex-cond-calc}
Two countries share $\alpha=1/3$, $n+g+\delta=0.08$, and currently $y=2$ in the same units. Country A's investment rate is $s=0.24$; B's is $s=0.12$. Using Cobb–Douglas, which country is further below its own $y^*$, and which should grow faster in the Solow model?
::: solution
$y^* \propto s^{\alpha/(1-\alpha)} = s^{1/2}$, so $y_A^*/y_B^* = \sqrt{2}\approx 1.41$. The *level* of $y^*$ is not pinned down without the constant, but the country with the higher $s$ has the higher target. If both sit at the same current $y$, A is further below its own target (unless both are already above B's $y^*$ and A is closer to its higher ceiling — the generic case of interest is both below). Near the steady states, growth of $y$ relative to trend is $\lambda$ times the log gap, so the country with the larger gap toward a higher $y^*$ grows faster. Conditioning on $s$ is the whole of conditional convergence: the same $y$ does not imply the same $g_y$.
:::
:::

::: warning A negative slope in a club is not a world law
Fitting $g_i = a + b \ln y_{i0} + u_i$ on the OECD and finding $\hat b < 0$ does not imply that Chad will catch up if it waits. The OECD share parameters; Chad does not. Reporting the OECD slope as "the" convergence rate is the most common way to over-read this literature.
:::

## Conditional convergence and the MRW regression

The natural empirical counterpart of the Solow model is a regression that *conditions* on the determinants of $y^*$.

::: definition The textbook Solow regression {#def-mrw}
The **textbook Solow regression**, in the form estimated by Mankiw, Romer and Weil (1992), is

$$
\ln y_i = c + \frac{\alpha}{1-\alpha}\ln s_i - \frac{\alpha}{1-\alpha}\ln(n_i+g+\delta) + \varepsilon_i,
$$ {#eq-mrw}

on a cross-section of countries, with $s_i$ measured as the investment share of GDP and $n_i$ as working-age population growth. Under the model, the two slope coefficients are equal in magnitude, opposite in sign, and equal to $\alpha/(1-\alpha)\approx 1/2$ if $\alpha=1/3$.
:::

MRW estimated [[#eq-mrw]] on the Summer–Heston (Penn World Table) sample excluding oil states. The coefficients on $\ln s$ and $\ln(n+g+\delta)$ had the right signs and were roughly equal in magnitude, but they were closer to $1.4$ than to $0.5$: the data behave as if $\alpha \approx 0.6$, not $1/3$. The $R^2$ was about 0.6 in their intermediate sample. The model was not a disaster. It was quantitatively off in the direction the last chapter already flagged: observed differences in $s$ and $n$ do not generate observed differences in $y$ if capital's share is one-third.

Their remedy was to add human capital.

::: proposition The augmented Solow model {#prop-augmented}
Let $Y = K^\alpha H^\beta (AL)^{1-\alpha-\beta}$ with $H$ human capital, accumulated by forgoing consumption in the same way as $K$, at rate $s_h$. Then along a balanced path

$$
\ln y = c + \frac{\alpha}{1-\alpha-\beta}\ln s_k + \frac{\beta}{1-\alpha-\beta}\ln s_h - \frac{\alpha+\beta}{1-\alpha-\beta}\ln(n+g+\delta),
$$ {#eq-aug}

and the speed of convergence is $\lambda = (1-\alpha-\beta)(n+g+\delta)$, slower than in the textbook model. With $\alpha=\beta=1/3$, the elasticity of $y$ with respect to $s_k$ is 1 (not $1/2$), and $\lambda \approx 0.027$ at $n+g+\delta=0.08$, a half-life of 26 years.
:::

::: proof
Intensive form $\tilde y = \tilde k^\alpha \tilde h^\beta$. Steady state: $s_k \tilde y = (n+g+\delta)\tilde k$ and $s_h \tilde y = (n+g+\delta)\tilde h$. Solve: $\tilde k/\tilde y = s_k/(n+g+\delta)$, $\tilde h/\tilde y = s_h/(n+g+\delta)$. Substitute into $\tilde y = \tilde k^\alpha \tilde h^\beta$ and take logs. The convergence speed follows by linearising the two-dimensional system; the eigenvalue governing the gap in $\ln y$ is $(1-\alpha-\beta)(n+g+\delta)$ (MRW 1992, appendix).
:::

MRW measured $s_h$ by a secondary-school enrolment rate. In the augmented regression the implied $\alpha$ and $\beta$ were both near one-third, the restriction on the three coefficients was not rejected, and the $R^2$ rose above 0.8 in the intermediate sample. Conditional on $s_k$, $s_h$ and $n$, poorer countries grew faster. That is the best-known empirical success of the Solow framework.

It is not the last word.

- **Identification.** $s_k$ and $s_h$ are endogenous. A country that is rich for some reason other than Solow accumulation (institutions, $A$) may save and send children to school *because* it is rich. MRW treated $s_k$ and $s_h$ as exogenous. Islam (1995, *QJE*) put the regression in a panel with country fixed effects, absorbing $A_i$, and still found conditional convergence, with a faster $\lambda$.
- **Human-capital measurement.** Years of schooling are not $H$. Returns to schooling differ, quality differs, and health is omitted. Cohen and Soto (2007) and subsequent Barro–Lee revisions change coefficients without overturning the qualitative result.
- **The residual remains.** Even in MRW, a country effect sits in $\varepsilon_i$. Hall and Jones (1999) and the development-accounting literature of the last chapter still find a large $A$-gap after $K$ and $H$ are included. Conditional convergence is compatible with large, persistent differences in productivity.

::: example Implied elasticities {#ex-elasticities}
Using [[#eq-aug]] with $\alpha=\beta=1/3$, by what factor does long-run $y$ rise if $s_k$ doubles, holding $s_h$ and $n+g+\delta$ fixed? Compare with the textbook Solow elasticity at $\alpha=1/3$.
::: solution
The elasticity of $y$ with respect to $s_k$ is $\alpha/(1-\alpha-\beta)=1$. Doubling $s_k$ doubles long-run $y$. In the textbook model the elasticity is $\alpha/(1-\alpha)=1/2$, so doubling $s_k$ raises $y$ by a factor of $\sqrt{2}\approx 1.41$. Human capital makes accumulation more powerful because $H$ and $K$ complement each other: more $K$ raises the return to $H$ and, in the model, $H$ is accumulated in response. Whether it is accumulated *that* elastically in the data is the MRW identification question.
:::
:::

::: quiz
Conditional convergence means that
- [ ] every poor country grows faster than every rich country
- [x] a country grows faster the further it is below its own steady state, given $s$, $n$ and human capital
- [ ] income gaps between countries disappear in a generation
- [ ] the Solow residual is zero
::: solution
The hypothesis is a statement about distance to *own* $y^*$, not about distance to the US. Gaps disappear only if steady states coincide. TFP can differ across countries in a world with conditional convergence; it is then one of the things the regression conditions on (or leaves in the residual).
:::
:::

## $\beta$-convergence, $\sigma$-convergence, and clubs

A negative slope of growth on initial income is **$\beta$-convergence**. It does not imply that the cross-sectional *dispersion* of $\ln y$ is falling. That second property is **$\sigma$-convergence**. A set of economies can $\beta$-converge toward different $y^*$ while the spread of $y^*$ itself widens — which is one reading of the world after 1870. Quah (1993, *Economics Letters*; 1996, *European Economic Review*) argued that the world distribution was polarising into twin peaks, a rich club and a poor club, rather than collapsing toward a mean. Later work with more recent data (the China-and-India decades) has filled in the middle of the world distribution of *people*, if not always of countries (Sala-i-Martin 2006, *QJE*).

Club convergence can be generated by models with poverty traps: a threshold in $k$ below which $s$ or $n$ or $A$ is different, so that two steady states are locally stable. Galor and Weil, Azariadis and Drazen (1990, *QJE*), and the unified-growth literature are the theory. The empirical identification of a threshold is fragile (Hansen 2000). This course records the possibility and does not treat a particular trap as established for any named country.

::: widget sequence
a: 0.4*exp(-0.02*(n-1)) + 0.6*exp(-0.053*(n-1))
N: 80
mode: terms
start: 1
y: 0, 1.1
caption: Two gaps of size 1, closing at $\lambda=0.02$ (slower term) and $\lambda=0.053$ (faster term). The plotted series is a weighted mix, as if half the gap were a slow human-capital object and half a fast physical-capital object. After 40 years the mix is still far from zero. Persistence of income gaps is not, by itself, a rejection of diminishing returns.
:::

## Evidence, dated

The facts a convergence chapter has to live with, as of the Maddison 2023 and PWT 10.01 vintages, are these.

1. **No world absolute convergence over 1870–1990.** Pritchett (1997); Maddison 2023: US/world $4{,}803/1{,}543 = 3.1$ in 1870, $56{,}469/16{,}091 = 3.5$ in 2019 — the ratio of the US to the *world average* did not explode, but the US to the poorest did (US/Ethiopia 2019: 28; US/CAR: 90).
2. **Conditional $\beta$-convergence in many samples**, at about 2 per cent a year, once $s$, $n$ and schooling are included (MRW 1992; Barro and Sala-i-Martin 1992, 2004; Islam 1995).
3. **Growth miracles are not a random sample of the poor.** They are concentrated in East Asia after 1960 and in China after 1978, plus a few resource-and-governance cases (Botswana). A 2 per cent conditional-convergence equation does not predict 5.6 per cent in South Korea.
4. **Some middle-income and once-rich countries did not converge to the frontier.** Argentina's 1.2 per cent a year over 1960–2019 (Maddison 2023) is the textbook warning against reading a 1960 income as a sufficient statistic.
5. **Since about 1990, between-country inequality of (population-weighted) GDP per person has fallen**, mainly because of China and India (Sala-i-Martin 2006 and updates). Within-country inequality often rose. Those two series answer different questions.

Competing readings of (3) and (4) — technology diffusion, institutions, export discipline, demography — are the material of [[economic-growth/endogenous-growth]] and [[economic-growth/institutions-and-growth]]. Convergence empirics alone will not decide among them.

## Where this leads

The Solow model, augmented or not, treats $s$, $n$ and $A$ as given. [[economic-growth/ramsey-model]] and [[economic-growth/overlapping-generations]] endogenise $s$. [[economic-growth/endogenous-growth]] endogenises $A$. [[economic-growth/institutions-and-growth]] asks why the parameters differ, which is the question on which absolute convergence foundered.

A 2 per cent conditional-convergence rate, if it applied to a country 8-fold below its own $y^*$, would close half the log gap in 35 years — a factor of $8^{1/2}\approx 2.8$ remaining. That is a lot of remaining gap, and it is the optimistic calculation in which $y^*$ is held fixed. If $A$ itself is growing at the frontier, catching *up* to a moving target is slower still.

For education only — not investment or financial advice. A convergence regression is not a forecast of any country's growth, and a club is not a recommended peer group for a portfolio.

::: history
**1986–1992, Baumol to MRW.** William Baumol’s 1986 *AER* scatter for 16 industrial countries made absolute convergence a headline; Bradford DeLong’s 1988 comment showed the selection problem. Robert Barro and Xavier Sala-i-Martin (1991, 1992) measured 2 per cent regional convergence. N. Gregory Mankiw, David Romer and David Weil (1992, *QJE*) wrote down the cross-section the Solow model actually predicts, added human capital, and set the empirical template the rest of the decade used. Danny Quah’s twin-peaks papers asked a distributional question the $\beta$-regression cannot answer.
:::

::: summary
- Absolute convergence is a Solow prediction for economies that share a steady state. It fails in the world sample and holds, approximately, inside some clubs (US states, Japanese prefectures, parts of the OECD).
- Conditional convergence is the relevant Solow prediction once $s$, $n$ and human capital differ. MRW (1992) is the classic estimate; implied $\alpha$ is too high unless human capital is included.
- The linearised speed is $\lambda=(1-\alpha)(n+g+\delta)$ in textbook Solow and $(1-\alpha-\beta)(n+g+\delta)$ once human capital is accumulated. Estimated $\lambda\approx 0.02$ is slower than textbook Solow with $\alpha=1/3$.
- $\beta$-convergence does not imply $\sigma$-convergence. The world distribution of *people* has become less unequal since 1990, largely because of China and India; the distribution of *countries* is a different object.
- Miracles and disasters are not draws from a common 2 per cent process. They are why the next chapters exist.
:::

## Exercises

::: exercise Half-life arithmetic {level=1 check="34.7"}
At $\lambda=0.02$, what is the half-life of a log-income gap, in years to one decimal place? (Enter 34.7 if that is your answer.)
::: solution
$\ln 2 / 0.02 = 0.6931/0.02 = 34.7$ years.
:::
:::

::: exercise Remaining gap {level=1}
A country is 8-fold below its balanced-growth path in 2020. Conditional convergence at $\lambda=0.02$ applies, and $y^*$ grows at $g=0.02$. By what factor is $y$ below the *then* path in 2055? (35 years is one half-life.)
::: solution
One half-life closes half the *log* gap, so the factor gap falls from 8 to $8^{1/2}\approx 2.83$. The country is still almost three times poorer than its own moving target. The target itself has grown by $(1.02)^{35}\approx 2.00$, so the country's $y$ has grown by a factor of $2 \times (8/2.83) = 5.65$ over the 35 years — fast, and not catch-up complete.
:::
:::

::: exercise Textbook Solow coefficients {level=1}
If $\alpha=1/3$, what does [[#eq-mrw]] predict for the coefficient on $\ln s$ and on $\ln(n+g+\delta)$?
::: solution
$\alpha/(1-\alpha)=1/2$. The coefficient on $\ln s$ is $0.5$; on $\ln(n+g+\delta)$ it is $-0.5$.
:::
:::

::: exercise Augmented elasticities {level=2}
Take $\alpha=\beta=1/3$ in [[#eq-aug]]. (a) Write the three coefficients on $\ln s_k$, $\ln s_h$ and $\ln(n+g+\delta)$. (b) If $s_h$ doubles, by what factor does long-run $y$ rise? (c) Why is the coefficient on $\ln(n+g+\delta)$ equal to minus the sum of the other two?
::: solution
(a) $\alpha/(1-\alpha-\beta)=1$ on $\ln s_k$; $\beta/(1-\alpha-\beta)=1$ on $\ln s_h$; $-(\alpha+\beta)/(1-\alpha-\beta)=-2$ on $\ln(n+g+\delta)$. (b) A factor of 2. (c) $s_k$, $s_h$ and $n+g+\delta$ enter as ratios $s_k/(n+g+\delta)$ and $s_h/(n+g+\delta)$. Homogeneity of degree zero in $(s_k, s_h, n+g+\delta)$ forces the three coefficients to sum to zero.
:::
:::

::: exercise Broad capital and the half-life {level=2}
Textbook Solow, $n+g+\delta=0.075$. Compute $\lambda$ and the half-life at $\alpha=1/3$ and at $\alpha=2/3$. Which $\alpha$ is closer to Barro and Sala-i-Martin's 2 per cent a year?
::: solution
$\lambda=(1-\alpha)(n+g+\delta)$. At $\alpha=1/3$, $\lambda=(2/3)\times 0.075=0.050$, half-life $13.9$ years. At $\alpha=2/3$, $\lambda=(1/3)\times 0.075=0.025$, half-life $27.7$ years. The 2 per cent estimate is closer to broad capital (or to the augmented model with $\alpha+\beta=2/3$). That is a reason to take "capital" as more than structures and equipment, and it is not a reason to ignore national-accounts factor shares when the question is the rental on those structures and equipment.
:::
:::

::: exercise Absolute versus conditional in a picture {level=2}
Country A has $s=0.3$, country B has $s=0.1$; they share $\alpha=1/3$, $n+g+\delta=0.08$, and currently $y_A=y_B$ at a level equal to B's steady state. (a) Which country is below its own $y^*$? (b) Who grows faster in the near term, according to the Solow model? (c) Does this scatter show absolute convergence?
::: solution
(a) $y_A^*/y_B^* = (0.3/0.1)^{1/2}\approx 1.73$, so A is below its own $y^*$ and B is *at* its own $y^*$. (b) A grows faster (transitional growth); B grows at $g$. (c) No: they have the same current $y$, so an absolute-convergence scatter of growth on current $y$ would put two different growth rates at the same $x$-value. The extra growth is conditional on $s$.
:::
:::

::: exercise DeLong's selection point {level=3}
Baumol's 16-country sample is, roughly, the countries that were rich in 1979. Explain, in a few sentences, why estimating $g_{1870\text{--}1979}$ on $\ln y_{1870}$ in that sample is biased toward finding absolute convergence, even if the world did not converge. What sample would you want instead?
::: hint
If a country was poor in 1870 and grew fast, it is more likely to be in a "rich in 1979" club; if it was poor and grew slowly, it is missing.
:::
::: solution
Membership in the 16 is correlated with $y_{1979}$. Among countries with low $y_{1870}$, only the fast growers make it into the sample; the slow growers remain poor and are excluded. Among countries with high $y_{1870}$, both fast and slow growers are still rich enough in 1979 to be included (or at least more likely to be). The estimated slope of growth on initial income is therefore too negative: the left tail of initial income has been stripped of its failures. The sample one wants is defined on *initial* conditions (all countries with data in 1870, or a 1960 cross-section defined in 1960), not on outcomes. DeLong (1988) added countries that were rich in 1870 but not in Baumol's 16 and watched the slope flatten.
:::
:::

::: exercise A miracle is too fast {level=3}
South Korea's GDP per person (Maddison 2023) rose from 1,548 in 1960 to 38,936 in 2019, a factor of 25.2 in 59 years. Suppose Korea had been converging at $\lambda=0.02$ to a US-like path that itself grew at 2 per cent from a 1960 US level of 18,057. (a) What would Korea's 2019 level have been, starting from 1,548, under that law of motion? (b) Compare with 38,936. (c) What must have been happening to Korea's $y^*$, $A$, or both, for the actual path to be possible in a Solow framework?
::: hint
The gap to a moving target $y^*(t)=y^*(0)e^{gt}$ obeys $\ln y(t)-\ln y^*(t) = e^{-\lambda t}(\ln y(0)-\ln y^*(0))$.
:::
::: solution
(a) $y^*(t) = 18057 \times e^{0.02 t}$, so $y^*(59)=18057\times e^{1.18}=18057\times 3.254=58{,}780$. The 1960 log gap is $\ln(1548/18057)=\ln 0.0857=-2.457$. After 59 years the gap is $e^{-0.02\times 59}\times(-2.457)=0.307\times(-2.457)=-0.755$, so $y(59)=y^*(59)\times e^{-0.755}=58780\times 0.470=27{,}630$. (b) Actual 38,936 is well above 27,630. (c) Korea's steady-state path must have *risen* toward the US path: $s$ and $s_h$ increased, $n$ fell, and/or $A$ caught up. A Solow transition toward a *fixed* OECD steady state, at 2 per cent a year, is not a miracle. The miracle is the movement of the steady state itself — which is an $A$ story, an $s$ story, or an institutions story, and not a $\beta$-convergence story.
:::
:::
