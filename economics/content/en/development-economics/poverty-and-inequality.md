A poverty line is a judgement dressed as a number. Once the judgement is made, a great deal of arithmetic follows: how many people sit below the line, how far below, whether a transfer to the poorest reduces the measure by more than the same transfer to someone just below the line, and how the whole distribution — not just the lower tail — has changed. This chapter develops the standard toolkit: poverty lines; the Foster–Greer–Thorbecke family; the Lorenz curve and the Gini coefficient; the Kuznets hypothesis; and the facts of global poverty and inequality as they stood in the mid-2020s. The measuring rods of [[development-economics/measuring-development]] are taken as given. What is new is the *distribution*.

## Poverty lines

A **poverty line** $z$ is a threshold for a welfare aggregate $y$ (consumption or income per person, at PPP or in local prices). A person is poor if $y < z$. The line can be **absolute**, tied to a bundle of goods (calories, a modest non-food allowance), or **relative**, tied to the median or the mean of the distribution (60 percent of median income is the usual rich-country relative line).

The World Bank's **international poverty line** is an absolute line in international dollars. As of the June 2025 update it is \$3.00 a day at 2021 purchasing-power parity, replacing \$2.15 at 2017 PPP. Two higher lines, \$4.20 and \$8.30, are anchored to the typical national lines of lower-middle-income and upper-middle-income countries. National lines remain the ones ministries use: India's erstwhile Tendulkar and Rangarajan lines, Mexico's CONEVAL lines, and South Africa's three-tiered food, lower-bound and upper-bound lines are different objects, in different units, answering different questions.

::: definition Poverty line and poor set {#def-poverty-line}
Given a welfare aggregate $y_i > 0$ for persons $i = 1, \dots, n$ and a line $z > 0$, the **poor set** is $Q = \{i : y_i < z\}$ and $q = \#Q$. An **absolute** line does not change when the rest of the distribution changes; a **relative** line does.
:::

An absolute line is the right tool for asking whether people can buy a stated bundle. A relative line is the right tool for asking whether people are falling behind their society. Confusing the two produces nonsense: a boom that lifts everyone in proportion leaves relative poverty unchanged and cuts absolute poverty; a recession that scales everyone down does the reverse.

::: warning The line is not a biological constant
The original "dollar-a-day" line was the median of the national lines of the poorest countries then in the World Bank's sample, not the cost of 2,100 calories. Ravallion, Datt and van de Walle (1991) were explicit about this. Subsequent rebasing tracks national lines and PPP rounds. A person at \$2.99 and a person at \$3.01 on the 2021 line are not on opposite sides of survival. Headcounts near a mass of people stacked close to $z$ are fragile: a 10 percent error in $z$ or in the mean of $y$ can move the count by tens of millions in India or Nigeria.
:::

## The Foster–Greer–Thorbecke family

Let $g_i = \max\{z - y_i, 0\}$ be the **poverty gap** of person $i$, in units of the welfare aggregate, and let $g_i/z$ be the gap as a share of the line.

::: definition FGT poverty measures {#def-fgt}
For $\alpha \ge 0$, the **Foster–Greer–Thorbecke** measure is

$$
P_\alpha = \frac{1}{n} \sum_{i=1}^n \left(\frac{g_i}{z}\right)^\alpha = \frac{1}{n} \sum_{i \in Q} \left(\frac{z - y_i}{z}\right)^\alpha.
$$ {#eq-fgt}

$P_0$ is the **headcount ratio** $q/n$. $P_1$ is the **poverty-gap index**, the mean relative gap (poor and non-poor). $P_2$ is the **squared-gap** (or "severity") index. The representation is due to Foster, Greer and Thorbecke (*Econometrica*, 1984).
:::

$P_0$ treats everyone below $z$ as equal. A rupee to the poorest person and a rupee to someone just below $z$ both reduce $q$ by at most one person, and only if they cross the line; a rupee that does not produce a crossing does nothing. $P_1$ counts depth: a rupee to anyone below $z$ reduces $n z P_1$ by one rupee. $P_2$ puts extra weight on the poorest, because $(g_i/z)^2$ is convex in the gap.

::: proposition Axioms of $P_\alpha$ {#prop-fgt-axioms}
Assume a fixed population $n$ and a fixed line $z$. Then for every $\alpha \ge 0$:

1. **Focus.** $P_\alpha$ does not change if a non-poor person's income changes but stays at or above $z$.
2. **Monotonicity.** If a poor person's income rises (and $n$, $z$ are unchanged), $P_\alpha$ does not rise; for $\alpha > 0$ it falls.
3. **Decomposability.** If the population is partitioned into groups $j$ with population shares $s_j$, then $P_\alpha = \sum_j s_j P_\alpha^{(j)}$.

For $\alpha > 1$, $P_\alpha$ also satisfies the **transfer axiom** (Pigou–Dalton among the poor): a regressive transfer from a poorer to a less-poor person, both remaining poor, raises $P_\alpha$. $P_0$ fails monotonicity in the strong sense (a gain that does not cross $z$ leaves $P_0$ unchanged) and fails the transfer axiom. $P_1$ satisfies monotonicity but is invariant to transfers among the poor that do not cross $z$.
:::
::: proof
Focus is immediate from $g_i = 0$ for $y_i \ge z$. For monotonicity, $g_i/z$ is decreasing in $y_i$ on $(0, z)$, and $x \mapsto x^\alpha$ is increasing on $[0, 1]$ for $\alpha > 0$, so each poor person's contribution falls when $y_i$ rises; at $\alpha = 0$ the contribution is $1$ until $y_i$ hits $z$. Decomposability is just grouping terms in [[#eq-fgt]]. For the transfer axiom, let $y_j < y_k < z$ and transfer $\delta > 0$ from $j$ to $k$ with both remaining poor. The change in the two terms of $P_\alpha$ has the sign of $(g_j + \delta)^\alpha + (g_k - \delta)^\alpha - g_j^\alpha - g_k^\alpha$, which is positive for $\alpha > 1$ by strict convexity of $x \mapsto x^\alpha$ on $[0, \infty)$.
:::

Decomposability is why $P_\alpha$ is the workhorse of official poverty accounting: the contribution of rural Bihar, or of female-headed households, is $s_j P_\alpha^{(j)}$, and these contributions add up to the national number.

::: example Five people, one line {#ex-fgt-five}
Incomes $(1, 2, 3, 4, 10)$, line $z = 4$. Compute $P_0$, $P_1$ and $P_2$.
::: solution
Three of five people are poor (the person at 4 is not, because the definition uses $y < z$), so $P_0 = 3/5 = 0.6$. Relative gaps: $(4-1)/4 = 0.75$, $(4-2)/4 = 0.5$, $(4-3)/4 = 0.25$, and two zeros. So $P_1 = (0.75+0.50+0.25)/5 = 1.5/5 = 0.3$ and $P_2 = (0.75^2 + 0.5^2 + 0.25^2)/5 = (0.5625 + 0.25 + 0.0625)/5 = 0.875/5 = 0.175$. A transfer of 0.5 from the person at 1 to the person at 3, both remaining poor, leaves $P_0$ and $P_1$ unchanged and raises $P_2$, because the gaps become $0.875$ and $0.125$ in place of $0.75$ and $0.25$, and $0.875^2 + 0.125^2 = 0.78125 > 0.625$.
:::
:::

A useful rewriting of the gap index is $P_1 = P_0 \cdot (1 - \mu_Q/z)$, where $\mu_Q$ is mean income among the poor. The product $n z P_1$ is the total rupee shortfall, the smallest budget that would, with perfect targeting and no incentive effects, lift everyone to $z$. That budget is a lower bound on the fiscal cost of eliminating poverty, not an estimate of it.

::: example The fiscal lower bound {#ex-fiscal}
A country of 100 million people has $P_0 = 0.40$ and mean income among the poor of 1.80 international dollars a day, with $z = 3.00$. What is $P_1$, and what is the daily fiscal lower bound for eliminating poverty?
::: solution
$P_1 = 0.40 \times (1 - 1.80/3.00) = 0.40 \times 0.40 = 0.16$. The daily shortfall is $n z P_1 = 100 \times 10^6 \times 3 \times 0.16 = 48$ million international dollars a day, or about \$17.5 billion a year. Perfect targeting, no leakage, no labour-supply response and no missing poor people are all false, so the actual cost of a programme that tried to do this would be larger — and the comparison is still useful as a scale.
:::
:::

## The Lorenz curve and the Gini coefficient

Poverty looks at the lower tail. Inequality looks at the whole distribution.

Order the population so that $y_1 \le y_2 \le \dots \le y_n$, and write $\mu = n^{-1}\sum_i y_i$ for the mean. Let $p \in [0, 1]$ be a population share.

::: definition Lorenz curve and Gini coefficient {#def-lorenz}
The **Lorenz curve** $L(p)$ is the share of total welfare held by the poorest fraction $p$ of the population. For a continuous distribution with cdf $F$ and quantile function $F^{-1}$,

$$
L(p) = \frac{1}{\mu} \int_0^p F^{-1}(u)\, du, \qquad p \in [0, 1],
$$

with $L(0) = 0$ and $L(1) = 1$. $L$ is increasing and convex, and $L(p) \le p$, with equality at all $p$ if and only if $y$ is degenerate (perfect equality). The **Gini coefficient** is twice the area between the diagonal and the Lorenz curve:

$$
G = 1 - 2 \int_0^1 L(p)\, dp \in [0, 1].
$$ {#eq-gini}
:::

$G = 0$ is perfect equality; $G \to 1$ as one person holds everything in a large population. Sample Ginis are often reported on a 0–100 scale (the "Gini index"); South Africa's 63.0 in 2014 is $G = 0.630$.

::: proposition A parametric Lorenz family {#prop-power-lorenz}
For $a \ge 1$, $L(p) = p^a$ is a Lorenz curve, and its Gini coefficient is $G = (a-1)/(a+1)$. In particular $a = 1$ is the diagonal ($G = 0$), and as $a \to \infty$ the curve collapses toward the axes ($G \to 1$).
:::
::: proof
$L(0) = 0$, $L(1) = 1$, $L'(p) = a p^{a-1} \ge 0$, and $L''(p) = a(a-1)p^{a-2} \ge 0$ for $a \ge 1$, $p \in (0, 1]$, so $L$ is increasing and convex. Then $\int_0^1 p^a\, dp = 1/(a+1)$, hence $G = 1 - 2/(a+1) = (a-1)/(a+1)$.
:::

The family is a toy, but it is a well-behaved toy: one parameter, a closed-form Gini, and a curve you can plot. Empirically, Lorenz curves are estimated from grouped survey data or from microdata; they are not $p^a$. A Pareto tail with shape $\alpha > 1$ has $L(p) = 1 - (1-p)^{(\alpha-1)/\alpha}$ and $G = 1/(2\alpha - 1)$.

::: widget plot
f: x; x^a; 1 - (1-x)^((b-1)/b)
sliders: a=2:1:6:0.1; b=2:1.2:5:0.1
x: 0, 1
y: 0, 1
equal: true
labels: p; p^{a}; 1-(1-p)^{(b-1)/b}
caption: The diagonal is perfect equality. Raise $a$ and the power Lorenz $p^a$ bows toward the bottom-right; its Gini is $(a-1)/(a+1)$. The third curve is a Pareto Lorenz with shape $b$. Notice that two curves can cross: then neither Lorenz-dominates the other, and the Gini ranking can disagree with a ranking that puts more weight on the tail.
:::

::: example A five-person Gini {#ex-gini-five}
Incomes $(1, 2, 3, 4, 10)$, total 20. Compute the Lorenz points at $p = 0.2, 0.4, 0.6, 0.8, 1$ and the Gini by trapezoids, including $(0, 0)$.
::: solution
Cumulative income shares: $1/20 = 0.05$, $3/20 = 0.15$, $6/20 = 0.30$, $10/20 = 0.50$, $20/20 = 1$. Lorenz points: $(0.2, 0.05)$, $(0.4, 0.15)$, $(0.6, 0.30)$, $(0.8, 0.50)$, $(1, 1)$. Trapezoidal area under $L$:

$$
\frac{0.2}{2}\bigl[(0+0.05) + (0.05+0.15) + (0.15+0.30) + (0.30+0.50) + (0.50+1)\bigr] = 0.1 \times 3.0 = 0.30.
$$

Then $G = 1 - 2 \times 0.30 = 0.40$. (The discrete formula $G = \frac{2}{n^2\mu}\sum_{i=1}^n i\, y_i - (n+1)/n$ gives the same value here.)
:::
:::

::: example A Pareto tail {#ex-pareto-gini}
Incomes in the upper tail follow a Pareto distribution with survival function $\Prob(Y > y) = (y_m/y)^\alpha$ for $y \ge y_m$ and $\alpha > 1$. The associated Lorenz curve on the whole distribution, if the whole distribution is Pareto, is $L(p) = 1 - (1-p)^{(\alpha-1)/\alpha}$, and $G = 1/(2\alpha-1)$. Compute $G$ for $\alpha = 1.5$ and for $\alpha = 3$. Which tail is more unequal?
::: solution
For $\alpha = 1.5$, $G = 1/(3-1) = 1/2$. For $\alpha = 3$, $G = 1/(6-1) = 1/5$. The smaller $\alpha$, the heavier the tail and the larger the Gini. Empirically, estimates of $\alpha$ for top incomes often lie between about 1.5 and 3, which is why a Gini computed from a household survey that under-samples the top can miss a lot of inequality.
:::
:::

**Lorenz dominance** is the natural ranking: distribution $F$ Lorenz-dominates $H$ if $L_F(p) \ge L_H(p)$ for all $p$, with a strict inequality somewhere. Then $F$ has a lower Gini, and — a deeper fact, Atkinson (1970) — every symmetric, inequality-averse social-welfare function ranks $F$ above $H$ when means are equal. When Lorenz curves cross, the Gini is one vote among many: it implicitly weights the middle of the distribution more than some tail-sensitive indices (the Theil index, the Atkinson index with high $\varepsilon$, the share of the top 1 percent).

::: intuition The Gini as an average of gaps
An equivalent formula is $G = \frac{1}{2n^2\mu} \sum_i \sum_j \lvert y_i - y_j \rvert$: the Gini is the mean absolute gap between all pairs, scaled by twice the mean. That is why a rich-country Gini and a poor-country Gini of the same number are not the same social object — the scale $\mu$ has been divided out. Inequality is not poverty.
:::

## The Kuznets hypothesis

Simon Kuznets (1955) asked how inequality would move as a dual economy developed. If people leave a poor, relatively equal farm sector for a richer, more unequal urban sector, the population-weighted mix can produce an inverted-U: inequality first rises, then falls as the urban sector absorbs most of the labour force and as the demand for unskilled labour, education and redistribution catch up. The **Kuznets curve** is that inverted-U, with Gini (or the income share of the top quintile) on the vertical axis and income per head on the horizontal.

It is a hypothesis, not a theorem. The original evidence was a handful of country time series and some cross-sections. Later cross-country plots of Gini against log GDP per capita are confounded by country effects, by the consumption/income mix, and by politics. Within-country time series tell a mixed story:

- The United States, the United Kingdom and several other rich countries saw inequality fall from the 1930s to the 1970s and rise afterwards (Piketty and Saez, and the World Inequality Database) — a U, not an inverted-U, over the twentieth century.
- East Asia's high-growth decades (South Korea, Taiwan, later Vietnam) combined rapid growth with modest inequality by developing-country standards; China is the large exception, with a survey Gini rising from the low 30s in the early 1980s to around 36 in 2022 (World Bank PIP), and a much higher inequality of *income* and *wealth* in WID series.
- Latin America entered the 1990s with the world's highest income Ginis and compressed them in the 2000s (Brazil 2023: 51.6; Colombia 2023: 53.9, still very high). The compression is attributed to education, to labour-market tightening, and to transfers such as Bolsa Família, not to a mechanical Kuznets turning point.
- Southern Africa remains extreme: South Africa 63.0 (2014), Botswana 54.9 (2015).

::: widget plot
f: g*x*(1-x/m); 0.3 + 0.02*x
sliders: g=0.8:0.2:1.4:0.05; m=12:6:20:0.5
x: 0, 20
y: 0, 0.8
labels: \text{Kuznets inverted-U}; \text{linear alternative}
caption: A schematic Kuznets curve $G = g\, y (1 - y/m)$ against a linear alternative. Slide $g$ and the turning point $m$. The figure is a sketch of a hypothesis, not a fitted relationship: real country series need not follow either curve, and a cross-section of countries in a single year is not a development path.
:::

The modern reading, due among others to Anand and Kanbur (1993) and to later panel work, is that there is no iron Kuznets law. Sectoral dualism *can* produce an inverted-U; so can the spread of education and the politics of the welfare state, in the opposite direction. What a country gets depends on land, on schools, on unions, on trade and on tax, which is to say it depends on the rest of this course.

## Global poverty and inequality

At the \$3.00 line (2021 PPP), the World Bank's June 2025 vintage put global extreme poverty in 2022 at 10.5 percent, or 838 million people. The September 2026 vintage put 2024 at 10.1 percent, or 824 million, and nowcasted 2026 at about 811 million — roughly one person in ten, and essentially unchanged as a *rate* since 2019 (World Bank, *Poverty, Prosperity and Planet Report 2026*). Regionally, in 2022 (June 2025 vintage, \$3.00 line): East Asia and the Pacific 2.5 percent; South Asia 7.3 percent; Latin America and the Caribbean 5.2 percent; the Middle East and North Africa 8.5 percent; sub-Saharan Africa 45.5 percent, or 559 million people, two-thirds of the global poor.

The geography of poverty has shifted. In 1990 the majority of the world's extremely poor lived in East Asia. By the 2020s the majority lived in sub-Saharan Africa, with a substantial remainder in South Asia. That is the joint product of East Asian growth, slower African growth of consumption per person, and Africa's still-high fertility.

**Within-country** inequality, as measured by household-survey Ginis, is highest in Latin America and southern Africa, lower in South Asia and in the rich countries of northern Europe, and intermediate in China. India's 2022 consumption Gini of 25.5 (World Bank PIP) is not comparable to Brazil's income Gini of 51.6: consumption is smoother than income, and India's welfare aggregate has been the subject of a long dispute between survey and national-accounts means. WID series, which combine surveys with tax data, show much more concentration at the top in India, China and the United States than household surveys alone.

**Between-country** inequality in PPP incomes has fallen since 1990, because China and India have grown faster than the OECD. **Global interpersonal** inequality — lining up every person in the world — is the sum of the two, plus a covariance. Lakner and Milanovic's "elephant curve" (2016), updated by later WID work, found real-income gains between 1988 and 2008 concentrated among the global middle (the new East Asian middle class) and the global top 1 percent, with stagnation around the 80th global percentile (the lower middle class of rich countries). Subsequent updates have qualified the picture but not erased the two-humped shape.

::: quiz
Two distributions have the same mean and crossing Lorenz curves. Which statement is correct?
- [ ] They have the same Gini, because the mean is the same.
- [ ] The one with the higher headcount is more unequal.
- [x] The Gini ranking is well-defined but need not agree with a ranking that puts more weight on the poorest (or on the top 1 percent).
- [ ] Lorenz dominance still holds; crossings are a plotting artefact.
::: solution
Crossing Lorenz curves mean neither distribution Lorenz-dominates the other. The Gini, being one particular weighting of the gaps, will pick a winner; an Atkinson index with high inequality aversion, or the income share of the bottom quintile, may pick the other. Headcounts are poverty measures, not inequality measures, and they require a line.
:::
:::

::: application Growth, inequality and poverty
A useful accounting identity, in logs, is that the change in a poverty measure depends on the growth of the mean and on the change in the Lorenz curve. Ravallion and Chen, and later Datt–Ravallion decompositions, split an observed change in $P_\alpha$ into a **growth component** (the Lorenz curve held fixed, the mean shifted) and a **redistribution component** (the mean held fixed, the Lorenz curve moved). In China from the 1980s to the 2000s the growth component was large and negative (poverty-reducing) and the redistribution component was positive (poverty-increasing), with growth winning overall. In Brazil in the 2000s both components cut poverty. The identity does not say which policies caused which component; it says how to describe what happened.
:::

::: history
Pigou (1912) and Dalton (1920) stated the transfer principle that still sits inside $P_\alpha$ for $\alpha > 1$ and inside the Gini. Max Otto Lorenz, an American statistician, introduced the Lorenz curve in 1905; Corrado Gini defined his coefficient in 1912. Hugh Dalton's 1920 paper already treated inequality as a welfare comparison. The modern axiomatic treatment of poverty measures begins with Sen's 1976 *Econometrica* paper, which criticised the headcount and the gap and proposed a rank-weighted index; Foster, Greer and Thorbecke (1984) offered the decomposable family that statistical offices actually use. Kuznets's 1955 Presidential Address to the American Economic Association set the inverted-U as a research programme. Atkinson (1970) linked Lorenz dominance to social-welfare rankings. The World Bank's dollar-a-day line (1990–91) and its later rebasing, and the WID project of Piketty, Saez, Zucman and co-authors, are the two contemporary data infrastructures against which these old ideas are now tested.
:::

## Where this leads

Poverty traps that run through nutrition, and the returns to health and schooling, are [[development-economics/human-capital]]. Credit-market failure that keeps a household poor despite a profitable project is [[development-economics/credit-and-microfinance]]. How the *sectoral* mix of an economy changes as it grows — a cousin of Kuznets's original mechanism — is [[development-economics/structural-change]]. The welfare economics of redistribution, as opposed to the measurement of poverty, is taken up in [[public-economics/role-of-government]].

::: summary
- A poverty line $z$ is a judgement. Absolute lines track a bundle; relative lines track the median. The World Bank's extreme line is \$3.00 a day at 2021 PPP (as of 2025).
- The FGT family $P_\alpha$ nested the headcount ($\alpha = 0$), the gap ($\alpha = 1$) and a severity index ($\alpha = 2$). For $\alpha > 1$ it satisfies focus, monotonicity, decomposability and the transfer axiom ([[#def-fgt]], [[#prop-fgt-axioms]]).
- The Lorenz curve $L(p)$ is the income share of the poorest $p$; the Gini is $1 - 2\int L$ ([[#def-lorenz]]). Lorenz dominance is the robust ranking; crossing curves make the Gini one vote among many.
- The Kuznets inverted-U is a hypothesis about dualism, not a law. Country experience since 1980 has gone both ways.
- Extreme poverty is about one person in ten worldwide, concentrated in sub-Saharan Africa, with the global rate roughly stalled since 2019 (World Bank PIP, 2026). Survey Ginis remain highest in southern Africa and Latin America.
:::

## Exercises

::: exercise A headcount {level=1 check="0.5"}
Incomes $(1, 2, 3, 5, 8, 12)$, line $z = 5$. What is $P_0$? (Enter the headcount ratio.)
::: solution
Three of six people have $y < 5$, so $P_0 = 3/6 = 0.5$. The person at 5 is not poor.
:::
:::

::: exercise A poverty gap {level=1 check="0.3"}
Incomes $(1, 2, 3, 4, 10)$, line $z = 4$. What is $P_1$? (Enter the poverty-gap index.)
::: solution
Relative gaps $0.75$, $0.5$, $0.25$, $0$, $0$. Mean: $1.5/5 = 0.3$.
:::
:::

::: exercise A power Lorenz {level=1 check="0.5"}
If $L(p) = p^3$, what is the Gini coefficient? (Enter $G$.)
::: solution
By [[#prop-power-lorenz]], $G = (3-1)/(3+1) = 1/2$.
:::
:::

::: exercise Squared gaps {level=2 check="0.175"}
For the distribution in [[#ex-fgt-five]], compute $P_2$. (Enter the severity index.)
::: solution
$(0.75^2 + 0.5^2 + 0.25^2)/5 = 0.875/5 = 0.175$.
:::
:::

::: exercise Fiscal lower bound {level=2 check="48"}
A country of 100 million people has $P_0 = 0.40$, mean income among the poor of 1.80 dollars a day, and $z = 3$. What is the daily fiscal lower bound $n z P_1$, in millions of dollars? (Enter that number of millions.)
::: solution
$P_1 = 0.4 \times (1-1.8/3) = 0.16$, and $n z P_1 = 100 \times 10^6 \times 3 \times 0.16 = 48 \times 10^6$, so 48 million dollars a day.
:::
:::

::: exercise Lorenz points {level=2}
For incomes $(1, 2, 3, 4, 10)$, report $L(0.4)$ and $L(0.8)$. Does this Lorenz curve lie everywhere below the curve $L(p) = p^2$?
::: solution
Total income 20: $L(0.4) = (1+2)/20 = 0.15$ and $L(0.8) = (1+2+3+4)/20 = 0.5$. The power curve $p^2$ has $0.4^2 = 0.16$ and $0.8^2 = 0.64$. At both points the empirical $L$ is below $p^2$ (more inequality), but a complete check needs the whole curve, including $p = 0.2$ ($0.05$ against $0.04$) — already $L(0.2) = 0.05 > 0.04 = 0.2^2$, so the curves cross and neither Lorenz-dominates the other.
:::
:::

::: exercise A transfer and $P_\alpha$ {level=3}
Incomes $(1, 3, 6)$ and $z = 5$. Compute $P_0$, $P_1$, $P_2$. Now transfer 1 unit from the first person to the second. Which measures change, in which direction, and which axiom in [[#prop-fgt-axioms]] is being illustrated?
::: hint
Both people remain poor after the transfer. Look at $\alpha > 1$.
:::
::: solution
Initially the poor are the first two people. Gaps relative to 5: $4/5 = 0.8$ and $2/5 = 0.4$. So $P_0 = 2/3$, $P_1 = (0.8+0.4)/3 = 0.4$, $P_2 = (0.64+0.16)/3 = 0.8/3 \approx 0.267$. After the transfer, incomes $(0, 4, 6)$, relative gaps $1$ and $0.2$. $P_0$ is still $2/3$; $P_1$ is still $1.2/3 = 0.4$; $P_2 = (1 + 0.04)/3 = 1.04/3 \approx 0.347$, which has risen. This is the transfer axiom for $\alpha > 1$: a regressive transfer among the poor raises $P_2$ and leaves $P_0$ and $P_1$ unchanged.
:::
:::

::: exercise Kuznets arithmetic {level=3}
A two-sector economy has a farm sector with mean income 1 and Gini 0.20, and a city sector with mean income 4 and Gini 0.40. The two sectors have equal size, and every farm income is below every city income (so the national Lorenz curve stacks the two blocks). Explain why national inequality can exceed both sectoral Ginis, and why moving labour from farm to city can raise then lower the national Gini even if each sector's Gini is fixed. (A fully computed national Gini is welcome but not required.)
::: hint
Between-sector inequality is a third term, on top of the two within-sector Ginis.
:::
::: solution
The national Gini decomposes, schematically, into a weighted average of within-sector Ginis plus a between-sector term that reflects the gap in means. With means 1 and 4 the between term is large, so the national Gini exceeds 0.40. Starting from a fully rural economy, the between term is zero; as the urban share grows from 0, the between term rises (the population is split between two different means) and then falls (almost everyone is urban). That is Kuznets's dualism mechanism, holding within-sector inequality fixed. In the data, within-sector inequality is not fixed, and the between-sector gap itself depends on migration, trade and policy, so the inverted-U is possible rather than necessary.
:::
:::

::: exercise Relative versus absolute {level=2}
A distribution is scaled by 1.2 (every income rises 20 percent). What happens to $P_0$ at a fixed absolute line $z$, and what happens to a relative headcount at $z = 0.6 \times$ median? What happens to the Gini?
::: solution
The whole distribution shifts up: $P_0$ at a fixed $z$ falls (or stays zero). The median also scales by 1.2, so the relative line scales by 1.2, the relative headcount is unchanged, and the Lorenz curve — which is invariant to scale — is unchanged, so the Gini is unchanged. Absolute poverty, relative poverty and inequality are three different objects, and a balanced growth path moves only the first.
:::
:::

