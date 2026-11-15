A government that cannot levy lump-sum taxes still needs revenue, and it may still want to redistribute. **Optimal taxation** is the theory of the second-best tax system: the schedule of commodity taxes, or of income taxes, that maximises a social welfare function subject to a revenue requirement and to incentive constraints. Frank Ramsey (1927) asked the commodity-tax question when households are identical. James Mirrlees (1971) asked the income-tax question when households differ in unobserved ability. Both answers are theorems in models, and both are sensitive to the assumptions — identical households or not, linear or nonlinear schedules, whether leisure is separable from goods, whether capital can be taxed period by period. This chapter states the theorems with those assumptions attached, and it does not treat a formula as a recommended tax code. Illustrative rates are not advice.

The chapter uses the deadweight-loss apparatus of [[public-economics/efficiency-costs-of-taxation]] and the redistributive $W$ of [[public-economics/redistribution]]. The jump from "the Ramsey tax on this good is high" to "the legislature should raise this tax" is a jump from a model to a world with many other taxes, with administration, and with politics ([[public-economics/public-choice]]).

## Ramsey commodity taxation

Households are identical, or the government does not (here) care about distribution. Lump-sum taxes are unavailable — perhaps because they would have to be conditioned on an unobserved endowment, perhaps by assumption. The government must raise revenue $R$ by ad valorem or specific taxes on commodities, taking the producer prices as given (a competitive constant-returns supply side, Diamond–Mirrlees 1971).

::: definition Ramsey problem {#def-ramsey}
The **Ramsey problem** is to choose commodity taxes $\{t_i\}$ to maximise household utility $v(p+t, m)$ subject to $\sum_i t_i x_i(p+t,m) \ge R$, with producer prices $p$ fixed and $m$ exogenous. Assumptions: identical households (or a representative household), no lump-sum tax, competitive production at constant producer prices, no externalities, and taxes on all goods except possibly leisure (which cannot be taxed directly).
:::

::: theorem Inverse-elasticity rule {#thm-inverse-elasticity}
If cross-price elasticities are zero (independent demands) and there is no untaxed numeraire complication, the Ramsey taxes satisfy

$$
\frac{t_i}{p_i+t_i} \propto \frac{1}{|\varepsilon_i|},
$$

where $\varepsilon_i$ is the own-price elasticity of demand for good $i$. Goods with more inelastic demand are taxed more heavily. Assumptions: those of [[#def-ramsey]], plus vanishing cross elasticities, and a local interior optimum.
:::
::: proof
The Lagrangian of the household's indirect utility plus $\mu$ times the revenue constraint has first-order condition, for each $i$,

$$
\frac{\partial v}{\partial q_i} + \mu\Bigl(x_i + \sum_j t_j \frac{\partial x_j}{\partial q_i}\Bigr)=0,
$$

with $q_i=p_i+t_i$. Roy's identity, $\partial v/\partial q_i = -\lambda x_i$, and zero cross elasticities ($\partial x_j/\partial q_i=0$ for $j\neq i$) give $-\lambda x_i + \mu\bigl(x_i + t_i \partial x_i/\partial q_i\bigr)=0$. Dividing by $x_i$ and writing $\varepsilon_i = (\partial x_i/\partial q_i)(q_i/x_i)$ yields $t_i/q_i = (1-\lambda/\mu)/|\varepsilon_i|$ when $\varepsilon_i<0$. The factor $(1-\lambda/\mu)$ is common across goods (the Ramsey $\theta$).
:::

The rule is a DWL-minimising rule: [[public-economics/efficiency-costs-of-taxation#prop-harberger-approx]] said DWL $\propto t^2 |\varepsilon|$, so to raise a given $R$ one wants high $t$ where $|\varepsilon|$ is small. It is also, on its face, a regressive rule: necessities are inelastic and luxuries elastic. That is not a contradiction once the assumption of identical households is remembered. When households differ, the many-person Ramsey rule (Diamond 1975; Atkinson and Stiglitz 1976) adds a covariance between a good's budget share and the social marginal weight of the people who buy it. A good consumed disproportionately by the poor then gets a *lower* tax, other elasticities equal.

::: example Two independent goods {#ex-two-goods}
Two goods with $|\varepsilon_1|=2$, $|\varepsilon_2|=0.5$, producer prices $1$, and small taxes so that $t_i/q_i \approx t_i$. The government needs a weighted-average tax of $0.10$. Find the Ramsey $(t_1,t_2)$ under the inverse-elasticity rule.
::: solution
$t_1 \propto 1/2$, $t_2 \propto 1/0.5=2$, so $t_2=4 t_1$. If the two goods have equal expenditure at producer prices, revenue $\approx t_1 + t_2 = 5t_1$, and $5t_1=0.20$ if the average *rate* on two equal bases is $0.10$. Then $t_1=0.04$, $t_2=0.16$. The inelastic good carries four times the rate. (Equal expenditure is an extra assumption to close the arithmetic; the proportionality $t_2/t_1=4$ is the theorem.)
:::
:::

A more careful statement, due to Ramsey himself and to Baumol and Bradford (1970), is in terms of *quantity reductions*: Ramsey taxes reduce the (compensated) demand for each good in the same proportion. Inverse elasticities are the special case of independent demands. Corlett and Hague (1953) added leisure: if leisure cannot be taxed, goods that are complements to leisure should be taxed more heavily, to get at leisure indirectly. The Atkinson–Stiglitz (1976) theorem goes the other way.

::: theorem Atkinson–Stiglitz {#thm-as}
If all households have preferences weakly separable between leisure and a sub-utility of goods, and if a nonlinear income tax is available, then optimal commodity taxes are zero (uniform, and hence equivalent to a change in the income-tax schedule). Assumptions: the Mirrlees environment of the next section, weak separability of leisure, no externalities, no other restrictions on commodity taxes, and an optimum nonlinear labour-income tax.
:::

The theorem is the modern case against differentiated VAT rates *for redistributive reasons*. If the government already has a nonlinear income tax, and if the rich and the poor do not differ in how they mix goods *given* income (separability), then taxing yachts more than food is a roundabout and dominated way to redistribute. The theorem fails if separability fails (the rich have different tastes, not just more income), if some goods are tagged to ability (a professional licence fee), or if commodity taxes are needed for Pigouvian reasons ([[public-economics/externalities]]). It is a theorem about instruments, not a finding that every VAT should be uniform.

::: example Many-person intuition {#ex-many-person}
Good $F$ (food) is inelastic and consumed more by the poor; good $L$ (luxuries) is elastic and consumed more by the rich. Identical-household Ramsey wants a high tax on $F$. What extra term in the many-person Ramsey rule pushes the other way?
::: solution
The many-person rule adds a covariance between the good's budget share and the social marginal weights of its buyers. Food has a high budget share among people with high social weights (the poor), so the covariance term *lowers* $t_F$. Luxuries have the opposite covariance, which raises $t_L$. The net tax on food can be below the inverse-elasticity benchmark, and can even be negative (a subsidy) if redistribution dominates efficiency. Atkinson–Stiglitz then asks whether the income tax is a better instrument still.
:::
:::

::: warning Inverse elasticity is not a licence to tax the poor
Applying [[#thm-inverse-elasticity]] to a world of unequal households, without the many-person correction and without [[#thm-as]], is the most common misuse of Ramsey. Inelastic demand is often the demand of people with few substitutes, who may be poor. The representative-household Ramsey problem has, by construction, nothing to say about that. Either introduce distributional weights, or use the income tax, or both.
:::

## The Mirrlees income-tax problem

Households differ in ability $n$, which turns hours $h$ into pre-tax income $z=nh$. The government observes $z$ but not $n$ or $h$. A tax schedule $T(z)$ leaves consumption $c=z-T(z)$. Household $n$ chooses $h$ (or $z$) to maximise $u(c,h)$. The government maximises $\int W(u(n)) f(n)\,dn$ subject to raising $R$ and subject to each $n$ choosing optimally — the incentive constraints.

::: definition Mirrlees problem {#def-mirrlees}
The **Mirrlees problem** is to choose a nonlinear tax $T(\cdot)$ to maximise a social welfare function of heterogeneous abilities, subject to a resource constraint and to incentive compatibility of labour supply when ability is private information. Assumptions: a single-dimensional ability type, a consumption–leisure utility function, no other income, a closed static economy, and no restrictions on $T$ other than incentive compatibility (so kinks and flats are allowed).
:::

The first-best, if $n$ were observable, would be a lump-sum tax conditioned on $n$ (the second welfare theorem), typically with a high tax on high $n$ and a transfer to low $n$, and with no distortion of labour supply at the margin ($T'=0$). The information constraint makes $T'$ nonzero: a high marginal rate on a type $n$ makes it less attractive to mimic $n$ from below, which is how the government redistributes without observing $n$.

::: proposition Qualitative properties of the Mirrlees optimum {#prop-mirrlees-qual}
Under standard assumptions (including $u$ with $c$ and $h$ and a bounded ability distribution): (i) $T'(z)\ge 0$ (no negative marginal rates, in the basic model without an EITC motive at the bottom); (ii) $0 \le T'(z) < 1$; (iii) $T'=0$ at the top if the ability distribution has a finite upper bound (Sadka 1976; Seade 1977); (iv) $T'=0$ at the bottom if everyone works. Assumptions: those of [[#def-mirrlees]], plus an interior first-order approach (the second-order incentive constraints do not bind), and a finite support for (iii).
:::

The zero-at-the-top result is famous and fragile. It is a statement about the *very last* dollar of the *very highest* person: there is no one above them to deter from mimicking, so a positive $T'$ at the top destroys their surplus with no incentive gain. It is not the claim that "top tax rates should be zero" in any empirical distribution. If ability has a Pareto tail (no top), the optimal asymptotic marginal rate is positive and is given by a simple formula in terms of the tail parameter, the elasticity, and the social weight on top earners (Saez 2001).

::: theorem Saez elasticity formula {#thm-saez}
At an interior optimum of a Mirrlees problem, the marginal tax rate at income $z$ satisfies

$$
\frac{T'(z)}{1-T'(z)} = \frac{1}{e(z)}\cdot\frac{1-H(z)}{z h(z)}\cdot\bigl(1-G(z)\bigr),
$$ {#eq-saez}

where $e(z)$ is the elasticity of taxable income at $z$, $H$ is the cdf of income with density $h$, and $1-G(z)$ is a weighted average of the social marginal weights on people with income above $z$ (equal to $1$ for a Rawlsian, smaller for a utilitarian with concave $u$, zero if the planner does not value redistribution at the margin). Assumptions: a quasilinear-in-consumption simplification is the cleanest derivation (Saez 2001); income effects modify the formula; $e(z)$ is a local elasticity; the formula is first-order and ignores bunching complications.
:::
::: proof Sketch.
A small increase in $T'$ in a band around $z$ collects extra revenue from everyone above $z$ (the mechanical effect, proportional to $1-H(z)$), loses revenue from the behavioural response in the band (proportional to $e(z)\, z h(z)\, T'/(1-T')$), and has a social-welfare cost of taking from people above $z$ (the $G(z)$ term). Setting the sum to zero and rearranging gives [[#eq-saez]]. The argument treats the elasticity as a sufficient statistic, which it is under the quasilinear, no-income-effect assumptions.
:::

::: example A Pareto tail at the top {#ex-pareto-top}
Suppose the top of the income distribution is Pareto with parameter $a=2$ (so $(1-H(z))/(z h(z))=1/a=1/2$), $e=0.25$, and $G=0.25$ (the planner values a dollar at the top at a quarter of a public dollar). Compute $T'$.
::: solution
$T'/(1-T') = (1/0.25)\times(1/2)\times(1-0.25) = 4 \times 0.5 \times 0.75 = 1.5$. Hence $T'=1.5/2.5=0.60$. If $G=0$ (Rawlsian, or a planner who puts no weight on top earners), $T'/(1-T')=2$ and $T'=2/3$. If $e=0.5$ and $G=0.25$, $T'/(1-T')=0.75$ and $T'=0.43$. The formula is an accounting identity plus an elasticity: change $e$, $a$ or $G$ and the rate moves. None of these numbers is a recommended statutory top rate; statutory top marginal rates in OECD countries in the mid-2020s are typically in the 40–55 per cent range including typical social-security contributions at the top (OECD Tax Database, dated by year), which is a positive fact, not a test of [[#eq-saez]].
:::
:::

::: widget plot
f: 100*x*(1-x)^e
sliders: e=0.25:0.1:1
x: 0, 1
y: 0, 30
labels: \text{illustrative revenue (not a recommended schedule)}
caption: The same illustrative $R(t)=100 t(1-t)^{e}$ as in the efficiency-cost chapter. The welfare-maximising $t$ in a Mirrlees–Saez top-rate problem is *below* the Laffer peak $1/(1+e)$, by an amount that grows with the social weight $G$ on top earners. Move $e$: the peak moves, and any welfare-maximising point moves with it. Not a fitted curve for any country.
:::

::: example Linear NIT {#ex-nit}
A negative-income-tax formula $\tau=(1-\bar g)/(1-\bar g+e)$ with $\bar g=0.4$ and $e=0.2$. Compute $\tau$ and interpret $\bar g$.
::: solution
$\tau=0.6/(0.6+0.2)=0.6/0.8=0.75$. Here $\bar g=0.4$ means that a dollar to the average person who pays the tax is worth $0.4$ of a public dollar, so the planner is quite willing to tax. Raising $\bar g$ to $0.7$ would drop $\tau$ to $0.3/0.5=0.6$. The formula is a back-of-envelope for a linear schedule, not a recommended rate.
:::
:::

::: quiz
The Sadka–Seade zero-top-rate result says that if the highest ability is finite,
- [ ] the average tax rate on the highest person should be zero
- [x] the *marginal* rate at the very top of a finite distribution should be zero, which is compatible with a high average rate
- [ ] top statutory rates in OECD countries are too high
- [ ] capital income should not be taxed
::: solution
The result is about $T'$ at a finite upper bound, a marginal rate on the last dollar. The highest person can still pay a large *average* tax, collected on inframarginal dollars. The result does not rank OECD statutes, and it is not a theorem about capital income.
:::
:::

## Capital income, linear taxes and second-best caveats

**Capital income.** In an infinite-horizon model with additively separable utility and a closed economy, Chamley (1986) and Judd (1985) showed that the optimal *asymptotic* tax on capital income is zero: in the long run, a capital tax is a tax on future consumption that grows without bound in DWL, and a labour tax (or an initial levy on existing capital, if that is available) dominates. The result is sensitive to its assumptions. With finite lives and overlapping generations, with bequest constraints, with uninsured idiosyncratic risk (Aiyagari 1995; a precautionary capital tax can be positive), with rents and with monopoly profits, or when a nonlinear labour tax cannot be freely used, the zero-capital-tax conclusion need not hold. Recent work (Straub and Werning 2020) has also questioned the Chamley–Judd limiting argument even inside the original class of models. The honest textbook statement is: a first-best tax on the initial capital stock is attractive if it can be levied without being anticipated; a recurring tax on the return to new saving has a large DWL in the benchmark infinitely-lived model; whether that benchmark is the right one is a live dispute. This course does not settle it and does not recommend a savings tax.

**Linear income tax.** A negative-income-tax schedule $T(z)=-\,B+\tau z$ has two parameters. The optimal $\tau$ trades redistribution (a higher $\tau$ funds a higher $B$) against DWL. With a utilitarian $W$ and a given $e$, a back-of-envelope (Dixit–Sandmo, Piketty–Saez) formula looks like $\tau = (1-\bar g)/(1-\bar g + e)$, where $\bar g$ is the average social weight on taxpayers. If $\bar g=0.5$ and $e=0.25$, $\tau=0.5/0.75=2/3$. If $\bar g=0.7$ and $e=0.25$, $\tau=0.3/0.55\approx 0.55$. Again, illustrative.

**Production efficiency.** Diamond and Mirrlees (1971) showed that, if all pure profits can be taxed and if a full set of commodity taxes is available, the optimum has productive efficiency: the public sector should use the same factor prices as private producers, and intermediate goods should not be taxed. Taxing an intermediate good is a roundabout and dominated way to tax final goods. The theorem fails if profits cannot be fully taxed, or if some final goods cannot be taxed (the typical informal-economy constraint in a low-income country).

::: application VAT in a low-income country
A uniform VAT, with a rebate through the income tax, is close to the Atkinson–Stiglitz recommendation — in an economy that has an income tax and a formal sector. In an economy where much of consumption is informal and the income tax covers a thin slice of workers (many low-income countries; see IMF and World Bank tax-capacity reviews), a VAT that can be collected at the border and at large firms is one of the *feasible* instruments, and Ramsey-style reasoning about what can actually be taxed is more relevant than a theorem that assumes a complete tax-instrument set. Emran and Stiglitz (2005) and later work discuss VAT versus tariffs in informal economies. The point is the constraint set, not a ranking of countries.
:::

## Evidence

Optimal-tax *formulae* are not estimated; their *inputs* are.

- **Elasticities.** Saez, Slemrod and Giertz (2012): US ETI around $0.2$ overall, higher at the top. Kleven and Schultz (2014): smaller in Denmark. Migration elasticities of top earners are a separate, and sometimes large, margin (Kleven, Landais, Muñoz and Stantcheva 2020, *Journal of Economic Literature*).
- **Pareto tails.** Atkinson, Piketty and Saez and the WID: top income distributions in several countries are approximately Pareto with $a$ often in the $1.5$–$3$ range, varying by country and year. Plug $a$ into [[#eq-saez]] and the top rate moves.
- **Commodity-tax patterns.** Real VATs have reduced rates on food in many countries (OECD Consumption Tax Trends, various years). Atkinson–Stiglitz says that is not the redistributive first-best if an income tax is working; political economy and tagging (food as a tag for the poor, when the income tax is incomplete) are the usual explanations.
- **Capital-income tax rates.** OECD statutory rates on dividends and capital gains vary widely and have changed often (OECD Tax Database). That variation is a positive fact. It is not a test of Chamley–Judd.

::: history
Frank Ramsey, "A Contribution to the Theory of Taxation" (*Economic Journal*, 1927), answered Pigou's question on the least-distortive commodity taxes. Corlett and Hague (1953) brought in leisure. Peter Diamond and James Mirrlees (1971, *American Economic Review*) proved production efficiency and restated Ramsey in modern language. Mirrlees, "An Exploration in the Theory of Optimum Income Taxation" (*Review of Economic Studies*, 1971), introduced the ability-as-private-information model. Atkinson and Stiglitz (1976) linked commodity and income taxes. Emmanuel Saez (2001, *Review of Economic Studies*) rewrote the Mirrlees first-order condition in terms of elasticities and the income density, which is how the formula is used empirically.
:::

## Where this leads

Public choice ([[public-economics/public-choice]]) asks why observed tax systems look only roughly like Ramsey–Mirrlees — and why they have the loopholes, the reduced VAT rates and the tax expenditures that the theorems would cash out. Environmental taxes combine Ramsey and Pigou (Sandmo 1975). Dynamic public finance (not this course) takes Mirrlees to several periods. Labour economics ([[labour-economics/labour-supply]]) supplies the elasticities.

::: summary
- Ramsey taxes, with identical households and no lump-sum tax, follow inverse elasticities when demands are independent ([[#thm-inverse-elasticity]]). Quantity reductions are equiproportional in the general case.
- Atkinson–Stiglitz ([[#thm-as]]): with weak separability and a nonlinear income tax, differentiated commodity taxes are not used for redistribution.
- The Mirrlees problem ([[#def-mirrlees]]) is optimal nonlinear income taxation under hidden ability. Zero $T'$ at a finite top is a local result ([[#prop-mirrlees-qual]]); a Pareto tail gives a positive asymptotic rate.
- The Saez formula ([[#thm-saez]]) makes the top rate a function of $e$, the tail, and social weights. It is not a recommended statute.
- Capital-income taxation is zero asymptotically in the Chamley–Judd benchmark and not necessarily in neighbouring models. Production efficiency (Diamond–Mirrlees) says not to tax intermediate goods when instruments are complete.
:::

## Exercises

::: exercise Inverse elasticity {level=1 check="0.25"}
$|\varepsilon_1|=4$, $|\varepsilon_2|=1$. Under the inverse-elasticity rule, what is $t_1/t_2$ for small taxes? (Enter the ratio.)
::: solution
$t_1/t_2 = |\varepsilon_2|/|\varepsilon_1| = 1/4 = 0.25$.
:::
:::

::: exercise Why not tax the elastic good more {level=1}
A commentator argues that luxury goods should be taxed more because the rich buy them, and cites Ramsey. What has gone wrong, and which theorem in this chapter is the relevant one?
::: solution
Ramsey with identical households has no "rich". The redistributive case for taxing luxuries is a many-person Ramsey covariance, or a failure of Atkinson–Stiglitz (non-separability). If a nonlinear income tax is available and separability holds, [[#thm-as]] says to use the income tax instead.
:::
:::

::: exercise Pareto top rate {level=1 check="0.6"}
$a=2$, $e=0.25$, $G=0.25$. What is $T'$ from [[#ex-pareto-top]]? (Enter the marginal rate as a decimal.)
::: solution
$0.60$.
:::
:::

::: exercise Zero at the top {level=2}
In two sentences, why is $T'=0$ at a finite top, and why does a Pareto tail overturn the result?
::: solution
At a finite top there is no higher type to deter, so a positive marginal rate inflicts DWL with no incentive benefit; better to collect on inframarginal dollars. A Pareto tail has no top: there is always someone above $z$, so the mechanical-revenue term $1-H(z)$ remains comparable to the density $z h(z)$ (their ratio tends to $1/a$), and the optimal $T'$ stays positive.
:::
:::

::: exercise Linear tax arithmetic {level=2 check="0.5"}
Using $\tau=(1-\bar g)/(1-\bar g+e)$ with $\bar g=0.5$ and $e=0.5$, compute $\tau$. (Enter the rate as a decimal.)
::: solution
$(0.5)/(0.5+0.5)=0.5$.
:::
:::

::: exercise Corlett–Hague {level=2}
Leisure cannot be taxed. Good 1 is a complement to leisure (a tennis court), good 2 a substitute (a commuter rail ticket). In which direction does Corlett–Hague move $t_1$ relative to $t_2$, and why?
::: solution
Taxing complements to leisure is an indirect tax on leisure, which is the untaxed margin that Ramsey would have liked to tax. So $t_1$ is higher, $t_2$ lower, than inverse-elasticity alone would prescribe. (Whether tennis is in fact more complementary to leisure than rail is an empirical claim, not a theorem.)
:::
:::

::: exercise Diamond–Mirrlees {level=3}
A country taxes steel, an intermediate good, and also taxes cars, a final good that uses steel. Under the Diamond–Mirrlees assumptions, what reform raises welfare, and which assumption is most likely to fail in a low-income country with a large informal sector?
::: hint
Production efficiency: do not tax intermediate goods if final goods can be taxed.
:::
::: solution
Remove the steel tax and, if revenue must be kept, raise the car tax (or other final-goods taxes). The allocation of steel between uses then satisfies productive efficiency, and the government still hits final consumption. In a low-income country, many final goods are sold informally and cannot be taxed, while imported steel can be taxed at the border. The complete-instrument assumption fails, and an intermediate tax can be a second-best way to reach informal final output (Emran–Stiglitz and related arguments).
:::
:::

::: exercise Saez weights {level=3}
Two planners share $e$ and $a$ but differ in $G$: planner R has $G=0$, planner U has $G=0.5$. Who sets the higher top $T'$, and interpret $G$ in one sentence.
::: solution
Planner R (Rawlsian, or zero weight on top earners) has $1-G=1$, planner U has $1-G=0.5$, so R's right-hand side in [[#eq-saez]] is twice U's and R sets the higher $T'$. $G(z)$ is the average social-marginal value of a dollar to people above $z$, relative to a public dollar: a smaller $G$ means the planner is more willing to take from those people.
:::
:::

::: exercise Chamley–Judd caveat {level=3}
State the Chamley–Judd zero-capital-tax result in one sentence, then give two modelling changes that can make a positive capital-income tax optimal.
::: solution
In the standard infinitely-lived, complete-markets, closed-economy model, the optimal capital-income tax tends to zero in the long run. Positive taxes can appear with uninsured idiosyncratic risk (precautionary capital overaccumulation), with finite lives and imperfect bequest motives, with rents that cannot be taxed directly, or when the nonlinear labour tax is restricted. Straub and Werning (2020) also question the limiting argument inside the original setting. The result is not robust enough to be a policy recommendation.
:::
:::

::: exercise Inverse elasticity with numbers {level=2 check="2/21"}
Goods $A$ and $B$ have independent demands with $|\varepsilon_A|=2$, $|\varepsilon_B|=0.5$, producer prices $1$, and quantities $x_A=10$, $x_B=8$ at those prices. Using the small-tax rule $t_i=\theta/|\varepsilon_i|$ and a revenue target $10 t_A+8 t_B=4$, find $t_A$. (Enter $t_A$ as a fraction in lowest terms.)
::: solution
$t_A=\theta/2$, $t_B=2\theta$, so revenue $10(\theta/2)+8(2\theta)=5\theta+16\theta=21\theta=4$, hence $\theta=4/21$ and $t_A=2/21$.
:::
:::
