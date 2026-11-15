In 1980 a US man at the 90th percentile of the wage distribution earned about 3.5 times as much as a man at the 10th percentile; by the early 2000s that ratio was about 5, and it has stayed high (Autor, Katz and Kearney 2008, *Review of Economics and Statistics*; subsequent CPS updates). The college wage premium doubled over a similar period (Autor 2014, *Science*). The same broad pattern — a rise in the upper half of the wage distribution, a fall or stagnation in the lower half for a time, and a polarisation of *jobs* — appears in the UK, Canada and several (not all) continental European countries, with different timing and different roles for institutions. Wage inequality is not a US curiosity, and it is not a single fact: the 90/50 ratio, the 50/10 ratio, the college premium and the residual (within-group) inequality can move differently.

Three families of explanation have been taken seriously. **Skill-biased technical change** (SBTC) says that new technology raises the relative demand for educated labour. The **task-based** refinement says that computers and robots replace *routine* tasks, which happen to sit in the middle of the wage distribution, and complement non-routine cognitive work at the top and some non-routine service work at the bottom. **Trade**, especially the rise of China as a manufacturing exporter, is a demand shock to the same routine jobs in import-competing cities. **Institutions** — the fall in union density, the erosion of the real minimum wage in the US in the 1980s, and the different wage-setting systems of Europe — change how those demand shocks pass into the wage distribution. The live question is weights, not whether any one of these channels exists.

This chapter takes human capital ([[labour-economics/human-capital]]) as given and asks why the *price* of skill, and the shape of the wage distribution, changed.

## Measuring wage inequality

::: definition Percentile ratios, the college premium and residual inequality {#def-measures}
The **$p90/p10$ ratio** is the wage at the 90th percentile divided by the wage at the 10th; $p90/p50$ and $p50/p10$ split the upper and lower halves. The **college premium** is the coefficient on a college dummy (or the gap in mean log wages between college and high-school workers), usually after a Mincer control for experience. **Residual inequality** is the dispersion of the residuals from a wage regression on schooling, experience and demographic controls — inequality *within* education–experience cells.
:::

Each measure answers a different question. The college premium is the relative price of a measured skill. Residual inequality is the relative price of unmeasured skill, or of luck, or of firm rents, depending on the interpretation. Percentile ratios do not require a skill measure at all. In the US, residual inequality rose sharply in the 1980s; the college premium rose most in the 1980s and 1990s; $p90/p50$ has continued to rise in some series after $p50/p10$ flattened. A theory that explains only the college premium is incomplete.

Composition matters. If the share of college workers rises, the college premium can fall even as technology becomes more skill-biased — the Goldin–Katz **race between education and technology**. Goldin and Katz (*The Race between Education and Technology*, 2008) argued that the US 20th century was a long period in which the supply of educated labour ran ahead of demand, compressing the skill premium, followed by a period in which demand ran ahead. The same accounting identity organises the discussion.

::: proposition Relative supply and the skill premium {#prop-sbtc}
Suppose output is a CES aggregate of skilled and unskilled labour, $Y = \bigl(A_s L_s^{\rho} + A_u L_u^{\rho}\bigr)^{1/\rho}$, with $\sigma = 1/(1-\rho)$ the elasticity of substitution. Competitive wages satisfy

$$
\ln\frac{w_s}{w_u} = \frac{\sigma-1}{\sigma}\ln\frac{A_s}{A_u} - \frac{1}{\sigma}\ln\frac{L_s}{L_u}.
$$ {#eq-sbtc}

A rise in relative skill supply $L_s/L_u$ lowers the skill premium; a rise in relative efficiency $A_s/A_u$ (skill-biased technical change) raises it. The first term is demand; the second is supply.
:::

::: proof
The marginal products are $w_s = A_s L_s^{\rho-1} Y^{1-\rho}$ and $w_u = A_u L_u^{\rho-1} Y^{1-\rho}$. Dividing, $w_s/w_u = (A_s/A_u) (L_s/L_u)^{\rho-1}$. Taking logs and using $\rho - 1 = -1/\sigma$ and $(\sigma-1)/\sigma = \rho$ (because $\rho = (\sigma-1)/\sigma$) gives [[#eq-sbtc]]. (The algebra of the CES is standard; see [[microeconomics/production-and-cost]].)
:::

Katz and Murphy (1992, *Quarterly Journal of Economics*) estimated $\sigma \approx 1.4$ between college and high-school labour in the US and showed that a trend in $A_s/A_u$ of about 3 per cent a year, together with the observed path of relative supply, could account for the path of the college premium from 1963 to 1987. The framework is still used; the number for $\sigma$ is typically put between $1.4$ and $2$ in later work.

::: example A Katz–Murphy calculation {#ex-km}
Take $\sigma = 1.5$. Relative skill supply $L_s/L_u$ rises 20 per cent. How much does the skill premium fall if technology is unchanged? How large a rise in $A_s/A_u$ is needed to keep the premium constant?
::: solution
The supply term is $-(1/\sigma)\ln(1.20) \approx -0.667 \times 0.1823 \approx -0.122$, a 12 per cent fall in the wage ratio. To offset it, $(\sigma-1)/\sigma \cdot \Delta\ln(A_s/A_u) = 0.122$. Here $(\sigma-1)/\sigma = 1/3$, so $\Delta\ln(A_s/A_u) = 0.366$, about a 44 per cent rise in relative skilled efficiency. A supply boom without a demand boom compresses the premium; that is the Goldin–Katz account of the early 20th century, and of the 1970s in the US when the baby-boom college cohorts entered.
:::
:::

::: widget plot
f: ((s-1)/s)*a - (1/s)*x
x: -1, 1
y: -1.5, 1.5
sliders: s=1.5:1.1:3:0.1; a=0.3:-0.5:1:0.05
labels: \ln(w_s/w_u)
caption: The skill premium [[#eq-sbtc]] against relative log supply $x = \ln(L_s/L_u)$. The slider $s$ is $\sigma$; $a$ is $\ln(A_s/A_u)$. Raise relative supply (move right on the horizontal axis): the premium falls. Raise $a$: the line shifts up. Steeper $\sigma$ (larger $s$) flattens the supply effect.
:::

## Tasks, polarisation and the vanishing middle

SBTC in the CES form predicts a rise in the relative wage of the skilled, and a rise in their relative employment. It does not, by itself, predict **job polarisation**: the simultaneous growth of high-wage cognitive jobs and low-wage service jobs, at the expense of middle-wage routine jobs. That pattern is documented for the US by Autor, Katz and Kearney (2006, 2008) and for several European countries by Goos, Manning and Salomons (2014, *American Economic Review*).

::: definition Routine-biased technical change {#def-rbtc}
**Routine-biased technical change** is a fall in the cost of using capital to perform routine, codifiable tasks. It reduces labour demand for occupations intensive in those tasks (many production and clerical jobs in the middle of the wage distribution) and raises demand for occupations intensive in non-routine cognitive tasks (professional, managerial) and, through general-equilibrium income effects, for some non-routine manual services (caring, cleaning, food service).
:::

The task framework of Autor, Levy and Murnane (2003) and Acemoglu and Autor (2011) is the demand side already met in [[labour-economics/labour-demand]]. Polarisation is its implication for the *shape* of employment and, if wages are set competitively by task, for the shape of the wage distribution. The lower tail of wages in the US did not rise with the lower tail of employment in the 1980s — it fell — which is one reason institutions (the next section) are needed alongside tasks for a complete account of $p50/p10$.

::: example A three-task sketch {#ex-tasks}
An economy has three tasks: abstract ($A$), routine ($R$) and manual ($M$), with wages $w_A > w_R > w_M$ initially. Computers substitute for $R$ and complement $A$. What happens to employment shares and to $w_R / w_A$? What extra ingredient is needed for $w_M$ to rise relative to $w_R$?
::: solution
Employment in $R$ falls, employment in $A$ rises. The relative wage $w_R/w_A$ falls. Employment in $M$ can rise if consumers, richer because of the productivity gain in $A$ and $R$, demand more in-person services (a scale effect in the product market for $M$). Then $w_M / w_R$ can rise even if $M$ is not complementary to computers in production. Polarisation of *employment* is easier to get from the task model than polarisation of *wages* in the lower half; the latter often needs a supply shift into $M$ or an institutional floor.
:::
:::

## Trade and the China shock

The Heckscher–Ohlin prediction is that trade with a country abundant in less-skilled labour should lower the relative wage of the less skilled in the skill-abundant country. For a long time the labour-economics consensus (surveyed by Freeman 1995) was that trade was a smaller contributor than technology to US inequality, because import volumes were modest and because inequality also rose in industries that did not compete with imports. That consensus was revised, not abandoned, after Autor, Dorn and Hanson (2013, *American Economic Review*).

They treat the rise of Chinese import penetration after 1990, and especially after China’s WTO accession in 2001, as a shock that varies across US commuting zones according to the zones’ initial industry mix. More exposed zones saw larger falls in manufacturing employment, in labour-force participation, and in wages, with effects that were concentrated on low- and middle-skill workers and that lasted at least a decade. The **China shock** is a demand shift against a particular set of tasks and places. It is complementary to the task story, not a rival: Chinese factories, like robots, are a way of performing routine manufacturing tasks with less US labour.

The magnitude is debated. Autor, Dorn and Hanson put the China shock at about one-quarter of the US manufacturing employment decline between 1990 and 2007 in their preferred quantification. Feenstra, Ma and Xu (2019, *Journal of International Economics*) and others have argued for a smaller wage effect once export growth and input linkages are counted. Bloom, Draca and Van Reenen (2016, *Review of Economic Studies*) find that import competition from China also *accelerated* technical change in European firms — trade and technology as complements. The honest summary is that trade, for the communities specialised in the exposed industries, was first-order, and that for the national skill premium it is probably smaller than SBTC but not negligible.

::: example A college-premium accounting {#ex-premium-path}
In 1980 the US college premium (log wage gap, men) was about $0.30$; in 2005 it was about $0.60$ (Autor 2014). Relative college supply also rose. Using [[#eq-sbtc]] with $\sigma = 1.6$, if relative supply $\ln(L_s/L_u)$ rose by $0.40$ over those 25 years, how much must $\ln(A_s/A_u)$ have risen?
::: solution
$0.60 - 0.30 = 0.30 = \tfrac{0.6}{1.6}\Delta\ln(A_s/A_u) - \tfrac{1}{1.6}\times 0.40$. So $0.30 = 0.375\,\Delta\ln(A_s/A_u) - 0.25$, hence $0.55 = 0.375\,\Delta\ln(A_s/A_u)$, so $\Delta\ln(A_s/A_u) \approx 1.47$. Relative skilled efficiency has to more than quadruple in levels ($e^{1.47} \approx 4.3$) over 25 years to outrun that supply growth — the Goldin–Katz race with demand lapping supply. The number is sensitive to $\sigma$; it is an accounting identity given $\sigma$, not a measurement of $A_s$ from laboratories.
:::
:::

::: warning A local employment loss is not a national employment loss
Commuting-zone estimates identify the *relative* effect of exposure. People and capital can move; consumers gain from cheaper goods; exporting industries gain. National employment in the US did not collapse in the 2000s. The China-shock papers are evidence about the *distribution* of gains and losses across places and skills, which is what wage inequality is about. They are not a finding that trade lowers aggregate employment, and they are not a ranking of trade policies.
:::

## Institutions

Demand and supply set a competitive wage. Unions, minimum wages and pay-setting norms change the mapping from those curves to the observed distribution.

DiNardo, Fortin and Lemieux (1996, *Econometrica*) used a reweighting (kernel) decomposition and attributed a substantial share of the 1980s rise in US male wage inequality — especially in the lower half — to the fall in union density and the fall in the real value of the federal minimum wage. Lee (1999, *Quarterly Journal of Economics*) used state variation in the bite of the federal minimum and found a large effect of the falling real minimum on $p50/p10$. Fortin, Lemieux and Lloyd (2021, *Journal of Labor Economics*) update the institutional account: the minimum wage still matters for the lower tail; unions matter less than they did, because density is lower.

Cross-country, the same demand shocks hit economies with different wage-setting. Germany, France and the Nordic countries had, for a time, less rise in lower-tail inequality than the US and the UK, consistent with more binding floors and more coordinated bargaining (see [[labour-economics/unions-and-migration]]). They also had, in some cases, more unemployment among the less skilled — a reminder that an institution that compresses wages can move the adjustment onto quantities. The US 1980s combined a falling real minimum, falling union density, and SBTC; Europe combined SBTC with more rigid relative wages. Both combinations are in the data.

::: proposition A binding floor compresses the lower tail {#prop-floor-ineq}
If a minimum wage $\underline{w}$ binds for a positive mass of workers who would have been paid below $\underline{w}$, and if employment losses among those workers are not too large, the observed $p50/p10$ of *employed* wages falls. The effect on inequality of *earnings* (including zeros for the non-employed) is smaller, and can go the other way if the employment loss is large. Assumptions: the floor is enforced; hours and coverage are held in view.
:::

This is the distributional counterpart of [[labour-economics/labour-market-equilibrium]]: a modest floor can compress wage inequality with a small employment cost; a large floor can create a mass of zeros that undoes the compression in an earnings distribution. Card and DiNardo (2002, *Journal of Labor Economics*) argued that the timing of US inequality in the 1980s fitted the minimum wage better than a smooth SBTC trend; Autor, Katz and Kearney (2008) replied that the upper half, and residual inequality, need a demand story as well. Both can be right about different parts of the distribution.

::: example A falling real minimum and $p50/p10$ {#ex-min-tail}
In 1981 the US federal minimum was about 45 per cent of the median wage; by 1989 it was about 33 per cent (authors’ calculations from BLS and the federal statute). Suppose the 10th percentile of employed wages tracks the minimum when the minimum binds, and the 50th percentile is unaffected. What happens to $p50/p10$? Why is this not a complete account of 1980s inequality?
::: solution
$p10$ falls relative to $p50$, so $p50/p10$ rises. That is [[#prop-floor-ineq]] in reverse: a falling floor *un-compresses* the lower tail. It does not explain the rise in $p90/p50$ or in the college premium, which is why Autor, Katz and Kearney (2008) insisted on a demand story for the upper half even if they granted Lee (1999) the lower tail.
:::
:::

::: quiz
The Katz–Murphy CES formula says that a rise in the share of college workers, with technology held fixed,
- [ ] raises the college premium, because college workers are more productive
- [x] lowers the college premium, by a factor $1/\sigma$ in logs
- [ ] has no effect on the premium, which is set by technology alone
- [ ] lowers residual inequality but not the college premium
::: solution
[[#eq-sbtc]]: $\partial \ln(w_s/w_u) / \partial \ln(L_s/L_u) = -1/\sigma < 0$. That is the supply side of the Goldin–Katz race. Technology ($A_s/A_u$) has to run *faster* than supply if the premium is to rise while college shares are also rising, which is what happened in the US after 1980.
:::
:::

## Evidence, in one place

A usable summary, with the disagreements visible, is this.

The rise in the US college premium since 1980 is primarily a relative-demand story, with SBTC (in the CES or the task form) as the leading candidate, and with relative supply slowing after the 1970s cohorts as a contributing cause (Goldin and Katz 2008; Autor 2014). Job polarisation is better explained by routine-biased change than by a simple skilled/unskilled CES (Autor, Katz and Kearney 2008; Goos, Manning and Salomons 2014). The China shock redistributed employment and wages against manufacturing-intensive places and the less skilled, with a national contribution to the skill premium that is positive but smaller than technology’s in most calibrations (Autor, Dorn and Hanson 2013, and the subsequent debate). Institutions — the minimum wage and unions — are first-order for the US lower tail in the 1980s and for cross-country differences in $p50/p10$ (DiNardo, Fortin and Lemieux 1996; Lee 1999). Residual inequality remains the least settled: it may be the price of unmeasured skill, the rise of firm-level wage premia (Card, Heining and Kline 2013, *Quarterly Journal of Economics*, on West Germany; Song, Price, Guvenen, Bloom and von Wachter 2019, *Quarterly Journal of Economics*, on the US), or both.

Outside the high-income North Atlantic the facts differ. Latin America saw a *fall* in wage inequality in the 2000s, associated with education expansions, commodity booms and, in some countries, a rising real minimum wage (López-Calva and Lustig, *Declining Inequality in Latin America*, 2010). China’s wage inequality rose with the market reforms and then partially reversed as the migrant labour surplus shrank (Ge and Yang 2014, *Journal of Labor Economics*). South Africa’s wage distribution remains among the most unequal, with a large residual after schooling, in which the legacy of apartheid and the current structure of bargaining both figure (Leibbrandt, Finn and Woolard 2012, *Journal of African Economies*). The US literature is the most developed; it is not a template that can be copied, numbers and all, to every country.

::: history
Kuznets (1955) asked whether inequality first rises and then falls with development. The modern labour literature on the US wage structure begins with Bound and Johnson (1992) and Katz and Murphy (1992). Goldin and Katz (2008) gave the 20th-century supply-and-demand account. Autor, Levy and Murnane (2003) introduced tasks; Autor, Dorn and Hanson (2013) the China shock. DiNardo, Fortin and Lemieux (1996) is the canonical institutional decomposition. The “firm wage premium” revival of the 2010s, using linked employer–employee data, is a fourth strand, still being weighed against SBTC.
:::

## Where this leads

Unions and migration ([[labour-economics/unions-and-migration]]) are two further shifters of relative supply and of the mapping from demand to wages. Discrimination ([[labour-economics/discrimination]]) is a between-group slice of the same distribution. Search and matching ([[labour-economics/search-and-unemployment]]) generate wage dispersion among similar workers as a matter of course, through rents in a match — a microfoundation for residual inequality. Macroeconomic counterparts of the skill premium appear in [[economic-growth]] and in the labour-market chapters of [[macroeconomics/unemployment]].

::: summary
- Measure inequality with percentile ratios, the college premium and residual dispersion; they need not move together ([[#def-measures]]).
- In the CES skill model, the premium is demand minus supply: $\ln(w_s/w_u) = \tfrac{\sigma-1}{\sigma}\ln(A_s/A_u) - \tfrac1\sigma \ln(L_s/L_u)$ ([[#prop-sbtc]]).
- Routine-biased technical change polarises employment by replacing middle tasks ([[#def-rbtc]]). Wage polarisation in the lower tail often needs institutions as well.
- The China shock is a geographically concentrated demand shift against routine manufacturing. Local losses coexist with national consumer gains.
- Unions and the minimum wage are first-order for the US lower tail in the 1980s and for cross-country differences. A floor compresses employed-wage inequality if employment losses are not too large ([[#prop-floor-ineq]]).
:::

## Exercises

::: exercise A supply shift {level=1 check="-0.1"}
In [[#eq-sbtc]] with $\sigma = 2$, relative skill supply rises by 20 per cent and technology is unchanged. Compute the change in $\ln(w_s/w_u)$. (Enter the change, including the sign, to one decimal if needed: for a 10 per cent fall enter $-0.1$.)
::: solution
$-(1/2)\ln(1.20) \approx -0.5 \times 0.1823 \approx -0.091$, about $-0.1$ to one decimal. A 20 per cent supply rise lowers the log premium by about $0.09$–$0.10$ when $\sigma = 2$.
:::
:::

::: exercise Offsetting demand {level=1}
If $\sigma = 2$, how much must $\ln(A_s/A_u)$ rise to offset a 20 per cent rise in $L_s/L_u$?
::: solution
$(\sigma-1)/\sigma = 1/2$. We need $(1/2)\Delta\ln(A_s/A_u) = (1/2)\ln(1.20)$, so $\Delta\ln(A_s/A_u) = \ln(1.20) \approx 0.182$, about an 20 per cent rise in relative skilled efficiency. When $\sigma = 2$ the two elasticities match.
:::
:::

::: exercise Which ratio {level=1}
A country raises its minimum wage and $p50/p10$ falls while $p90/p50$ is unchanged. Which explanation of inequality does this pattern fit better, SBTC or institutions, and why?
::: solution
A minimum wage bites in the lower tail. SBTC, especially in the CES form, raises the upper half and the college premium. The pattern is the institutional signature of [[#prop-floor-ineq]], not a rise in $A_s/A_u$.
:::
:::

::: exercise Polarisation versus SBTC {level=2}
Why is the growth of both high-wage professional jobs *and* low-wage service jobs a problem for a two-factor CES model of SBTC, and how does the task model address it?
::: solution
Two-factor SBTC predicts a shift toward skilled labour, not a hollowing out of the middle with growth at both ends. The task model distinguishes routine work (replaceable, middle) from abstract work (complemented, top) and manual services (not replaced, and demanded more as incomes rise). That produces polarisation of employment.
:::
:::

::: exercise China shock identification {level=2}
Autor, Dorn and Hanson (2013) use initial industry mix times the national rise in Chinese imports as a commuting-zone shock. What is the identifying assumption, and why do they also use other countries’ imports from China as an instrument?
::: solution
The assumption is that zones with more employment in exposed industries would not have had different wage and employment paths, absent the China shock, than less exposed zones. Using other high-income countries’ imports from China as an instrument isolates the part of US import growth that is a Chinese supply shock rather than a US demand shock (which would be correlated with local outcomes for other reasons).
:::
:::

::: exercise Earnings versus wages {level=2}
A minimum wage raises the 10th percentile of the *wage* distribution of the employed and reduces employment of the least skilled by a small amount. What happens to inequality of *earnings* in the whole working-age population? Why might a researcher report both?
::: solution
Employed-wage inequality falls ([[#prop-floor-ineq]]). Earnings inequality, counting zeros or lost hours, falls by less and can rise if the employment loss is large enough. Reporting both distinguishes a compression among job-holders from a change in the income distribution including those without jobs.
:::
:::

::: exercise Residual inequality {level=3}
Song et al. (2019) find that a large share of the rise in US earnings inequality is between firms: the same type of worker is paid more at some firms than at others, and high-wage workers have become more concentrated at high-wage firms. How does this sit with SBTC, and what extra mechanism is needed?
::: hint
SBTC is a market price of skill. A firm premium is a departure from that single price.
:::
::: solution
A pure market-price SBTC story says that skill is paid the same everywhere and that the premium rose. Between-firm inequality says that *where* one works matters more, either because high-skill workers sort more strongly into high-productivity firms (a complementary story: SBTC plus sorting) or because firm rents have become more dispersed (monopsony, matching, or product-market power). The extra mechanism is a labour market that does not pay a single $w_s$ — the territory of [[labour-economics/labour-market-equilibrium]] on monopsony and of [[labour-economics/search-and-unemployment]] on match rents.
:::
:::

::: exercise A Goldin–Katz race {level=3}
Using [[#eq-sbtc]] with $\sigma = 1.4$, relative supply $\ln(L_s/L_u)$ rises by $0.30$ over a decade and the observed skill premium $\ln(w_s/w_u)$ *rises* by $0.10$. Back out the implied change in $\ln(A_s/A_u)$. Interpret the result as a race.
::: solution
$0.10 = \tfrac{0.4}{1.4}\Delta\ln(A_s/A_u) - \tfrac{1}{1.4}\times 0.30$. So $0.10 = 0.286 \Delta\ln(A_s/A_u) - 0.214$. Then $0.314 = 0.286 \Delta\ln(A_s/A_u)$, so $\Delta\ln(A_s/A_u) \approx 1.10$. Relative skilled efficiency must have more than doubled in log points of $1.10$ (about a 200 per cent rise — large, because $\sigma$ is not far from 1 and a decade of supply growth is substantial). Demand outran supply: the Goldin–Katz race, with technology lapping education in this decade.
:::
:::

::: exercise Latin America in the 2000s {level=3}
Wage inequality *fell* in several Latin American countries in the 2000s as education expanded and some real minimum wages rose. In the language of this chapter, which terms in [[#eq-sbtc]] and which institutional channel are the natural candidates, and what extra ingredient (commodities, politics) would you want to check before treating the episode as a Goldin–Katz rerun?
::: solution
Education expansion is a rise in $L_s/L_u$, which compresses the premium. A rising real minimum wage compresses $p50/p10$ ([[#prop-floor-ineq]]). Before calling it a Goldin–Katz episode one would check whether $A_s/A_u$ was stable (or even falling, if commodity sectors raised demand for less-skilled labour) and whether the political decision to raise floors and expand school was itself an outcome of the commodity boom. López-Calva and Lustig emphasise all three: supply, institutions, and the terms of trade.
:::
:::
