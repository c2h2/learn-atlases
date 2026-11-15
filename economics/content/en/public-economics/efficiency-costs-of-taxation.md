A tax that does not change anyone's behaviour is a transfer: what the government gains, the taxpayer loses, and the sum is zero. A tax that *does* change behaviour — fewer units sold, fewer hours worked, a different mix of goods — destroys some of the surplus that the first welfare theorem had located. That destroyed surplus is **deadweight loss** (DWL), the **excess burden** of the tax. Measuring it, saying when the Harberger triangle is a good approximation, and converting it into a **marginal cost of public funds** are the jobs of this chapter. The Laffer curve is a related, and widely misused, picture of *revenue* as a function of a rate; we will draw one, label it illustrative, and refuse to treat it as a forecast.

Incidence ([[public-economics/tax-incidence]]) asked who pays the part of the tax that remains a transfer. This chapter asks how large the part that is not a transfer is. Optimal taxation ([[public-economics/optimal-taxation]]) will choose rates to trade that cost against the value of revenue and of redistribution. Examples use illustrative rates; dated statutory rates, when they appear, are not advice.

A useful discipline is to draw, for every tax, three objects: the rectangle of revenue, the triangle of deadweight loss, and the split of the remaining surplus between buyers and sellers. Confusing the rectangle with a social cost is the error of treating all tax payments as "a burden" in the efficiency sense; confusing the triangle with incidence is the error of thinking that a tax borne by "the other side" is free. Both errors are common in public debate. The formulae below keep them apart.

## Deadweight loss as a triangle

::: definition Deadweight loss of a tax {#def-dwl}
The **deadweight loss** (excess burden) of a tax in a single competitive market is the loss of consumer and producer surplus that is not recouped as government revenue. With inverse demand $D(q)$ and inverse supply $S(q)$, a tax that moves quantity from $q_0$ to $q_1$ has

$$
\mathrm{DWL} = \int_{q_1}^{q_0}\bigl(D(q)-S(q)\bigr)\,dq.
$$ {#eq-dwl}

Assumptions: quasi-linear surplus (no income effects, so Marshallian and Hicksian curves coincide), a single tax in an otherwise undistorted market, and price-taking.
:::

Geometrically, $D(q)-S(q)$ is the vertical wedge at $q$, equal to $t$ at $q_1$ and equal to $0$ at $q_0$. For linear curves the integral is the triangle $\tfrac12 t\,(q_0-q_1)$. Arnold Harberger (1964) taught a generation to draw that triangle and to add triangles across markets.

::: widget riemann
f: 10-1.2*x
a: 7.333
b: 8.333
n: 8
method: mid
x: 6, 10
y: 0, 3
caption: The integrand $D(q)-S(q)=10-1.2q$ of [[public-economics/tax-incidence#ex-linear-tax]], between the taxed quantity $22/3\approx 7.33$ and the untaxed $25/3\approx 8.33$. The integral is the DWL, equal to $0.6$ for $t=1.2$. Raise $n$ to see the rectangles fill the triangle. The figure is the Harberger triangle drawn as an area under the wedge, not under demand.
:::

::: proposition Harberger's approximation {#prop-harberger-approx}
For a small specific tax $t$ in a competitive market with no other distortions,

$$
\mathrm{DWL} \approx \tfrac12 t^2 \frac{q}{p}\frac{\varepsilon_s|\varepsilon_d|}{\varepsilon_s+|\varepsilon_d|} = \tfrac12 \eta\, t^2 \frac{q}{p},
$$

where $\eta$ is the elasticity of the *quantity difference* $q^d-q^s$ with respect to the wedge, equivalently $\bigl(1/|\varepsilon_d|+1/\varepsilon_s\bigr)^{-1}$ in elasticity units. DWL rises with the *square* of the tax. Assumptions: differentiable curves, evaluation at the no-tax point, Marshallian surplus.
:::
::: proof
$D(q)-S(q)$ is zero at $q_0$ and has derivative $D'-S'$ there. For small $t$, $q_0-q_1 \approx t/|D'-S'|$, and the triangle is $\tfrac12 t(q_0-q_1)\approx \tfrac12 t^2/|D'-S'|$. Translating slopes into elasticities at $(p,q)$ gives the formula. The quadratic is why a 10 per cent tax is not twice as costly as a 5 per cent tax on the same base: it is about four times as costly, for small rates.
:::

::: example The linear triangle {#ex-triangle}
Continue the market $D(q)=12-0.8q$, $S(q)=2+0.4q$, $t=1.2$. Compute DWL exactly and by $\tfrac12 t\Delta q$.
::: solution
From the incidence chapter, $q_0=25/3$, $q_1=22/3$, $\Delta q=1$. Exact: $\tfrac12 t\Delta q=0.6$ because the wedge is linear. Check the integral: $D-S=10-1.2q$, $\int_{22/3}^{25/3}(10-1.2q)\,dq=\bigl[10q-0.6q^2\bigr]_{22/3}^{25/3}=0.6$. Revenue $= t q_1=1.2\times 22/3=8.8$. Lost consumer-plus-producer surplus is revenue plus DWL $=9.4$.
:::
:::

::: example Doubling a small tax {#ex-double}
In a linear market, a tax of $2$ creates DWL of $1$. Using the small-tax approximation, what DWL does a tax of $6$ on the same curves create? Why is the approximation worse at $6$?
::: solution
DWL $\propto t^2$, and $6=3\times 2$, so the approximation says $9$ times $1$, hence $9$. At large $t$ the curves' slopes may change (or quantity may hit zero), so the local quadratic fitted at $t=0$ over- or under-states the true integral. Compute the true triangle from the actual $\Delta q$ when you have the curves; do not scale a small-tax triangle blindly.
:::
:::

::: warning Marshallian triangles miss income effects
When income effects matter, the correct welfare measures are **compensating variation** and **equivalent variation**, areas to the left of *Hicksian* (compensated) demand ([[microeconomics/slutsky-and-welfare]]). Harberger triangles using Marshallian demand are first-order approximations, exact in quasi-linear models, and can mis-rank taxes when the good is a large budget share. For labour taxes, the relevant elasticity in the DWL formula is the *Hicksian* (compensated) labour-supply elasticity, not the Marshallian one; the income effect of a tax that is rebated lump-sum cancels, and only substitution remains. Using an uncompensated elasticity that is near zero (because income and substitution cancel) to conclude that a labour tax is "efficient" is a standard error.
:::

::: example CV of a commodity tax {#ex-cv}
$u=\ln x_1+\ln x_2$, $p=(1,1)$, $m=100$. A tax of $0.25$ on good 1 raises $p_1$ to $1.25$. Compute tax revenue, compensating variation, and the DWL as $\mathrm{CV}$ minus revenue.
::: solution
Cobb–Douglas spends half on each good. After tax, $x_1=100/(2\times 1.25)=40$, $x_2=50$, revenue $=0.25\times 40=10$. The expenditure function for this utility is $e(p,u)=2\sqrt{p_1 p_2}\,e^{u/2}$. Original utility has $e^{u_0/2}=50$, so $e(p',u_0)=2\sqrt{1.25}\times 50 \approx 111.80$. Then $\mathrm{CV}=e(p',u_0)-m\approx 11.80$, and excess burden $=\mathrm{CV}-\text{revenue}\approx 1.80$. A Marshallian triangle $\tfrac12 \times 0.25 \times (50-40)=1.25$ understates the exact excess burden.
:::
:::

## Labour taxes, the triangle and the rectangle

A proportional tax $\tau$ on labour earnings, with the revenue rebated lump-sum (so that we isolate substitution), produces DWL that depends on the compensated elasticity $e^c$ of labour supply. A standard approximation is

$$
\mathrm{DWL} \approx \tfrac12 e^c \frac{\tau^2}{1-\tau} wL,
$$

up to a convention on whether $\tau$ is the tax-inclusive or exclusive rate. The formula is the Harberger triangle in $(w, L)$ space. Gruber and Saez (2002) and the subsequent **elasticity of taxable income** (ETI) literature replace $L$ with taxable income $z$ and $e^c$ with an elasticity that includes hours, intensity, deduction-taking and shifting. Saez, Slemrod and Giertz (2012, *Journal of Economic Literature*) survey ETI estimates for the United States clustered around $0.12$–$0.40$ for the mid-run, with larger estimates at the top of the income distribution and a long debate about identification.

Those estimates are positive numbers. They are not "the" cost of taxation: they feed a formula. A small ETI makes a given $\tau$ cheap in DWL and makes a given amount of redistribution cheap; a large ETI does the opposite. Reporting an ETI without a $W$ is not a ranking of tax systems.

::: quiz
A tax of $t$ in a market with perfectly inelastic demand has
- [ ] zero DWL, because quantity does not change, and buyers bear the tax
- [x] zero DWL, because quantity does not change; incidence on buyers is a separate statement
- [ ] large DWL, because buyers cannot escape
- [ ] DWL equal to revenue
::: solution
DWL is about *quantity*. If $q$ does not change, [[#eq-dwl]] is zero. Incidence is on buyers ([[public-economics/tax-incidence#thm-pe-incidence]]), which is a transfer. Inelastic demand makes a tax a good *revenue* instrument and a concentrated *distributional* instrument; those are different evaluations.
:::
:::

## The marginal cost of public funds

Average DWL per unit of revenue is not what a government needs at the margin. The **marginal cost of public funds** (MCPF) is the welfare cost of raising an extra unit of revenue.

::: definition Marginal cost of public funds {#def-mcpf}
In a quasi-linear economy, if a small increase in a tax raises revenue by $\mathrm{d}R$ and raises deadweight loss by $\mathrm{d}(\mathrm{DWL})$, the **marginal cost of public funds** is

$$
\mathrm{MCPF} = 1 + \frac{\mathrm{d}(\mathrm{DWL})}{\mathrm{d}R}.
$$

A public project with marginal benefit $b$ per dollar of outlay is then an improvement, on a Kaldor–Hicks test with this financing, if $b \ge \mathrm{MCPF}$. Assumptions: the project itself has no further distortionary interaction; quasi-linearity (so a dollar is a dollar); the tax being raised is specified.
:::

Because DWL is quadratic, MCPF exceeds $1$ as soon as $t>0$, and it rises with $t$. Financing a project with a lump-sum tax has $\mathrm{MCPF}=1$. Financing it with a distorting tax has $\mathrm{MCPF}>1$, which is why the second-best public-good rule (Pigou, Atkinson and Stern 1974, and later) is not the first-best Samuelson condition: the left-hand side of [[public-economics/public-goods#thm-samuelson]] must cover $c'(G)$ *times* a factor involving MCPF, or, in the full Ramsey–Samuelson apparatus, the whole tax system is jointly chosen.

::: example MCPF in the linear market {#ex-mcpf}
In [[#ex-triangle]], raise $t$ from $1.2$ to $1.2+\mathrm{d}t$. Compute $\mathrm{MCPF}$ at $t=1.2$.
::: solution
From $12-0.8q=2+0.4q+t$ we have $q=(10-t)/1.2$. Revenue $R=t(10-t)/1.2$ and $\mathrm{DWL}=t^2/2.4$. At $t=1.2$, $q=22/3$, $R=8.8$, $\mathrm{DWL}=0.6$. Then $\mathrm{d}R/\mathrm{d}t=(10-2t)/1.2=19/3$ and $\mathrm{d}(\mathrm{DWL})/\mathrm{d}t=t/1.2=1$, so $\mathrm{d}(\mathrm{DWL})/\mathrm{d}R=3/19$ and $\mathrm{MCPF}=22/19\approx 1.16$. An extra unit of revenue costs $1.16$ units of surplus. The *average* cost $1+\mathrm{DWL}/R=1+0.6/8.8\approx 1.07$ understates the marginal.
:::
:::

There is a second, distinct, concept: the MCPF when the revenue is *not* rebated but is spent on a public good that does not interact with demand for the taxed good. Dahlby, Ballard and Fullerton, and others, debate the exact formula when there are income effects. The definition above is the clean quasi-linear one.

## Behavioural responses and the Laffer curve

Revenue $R(t)=t\cdot z(t)$, where $z(t)$ is the tax base. Differentiating,

$$
\frac{\mathrm{d}R}{\mathrm{d}t} = z + t z'(t) = z\bigl(1 - \tfrac{t}{1-t}e\bigr)
$$

in a typical income-tax parameterisation, with $e$ the elasticity of the base to the net-of-tax rate. Revenue is increasing at $t=0$ and, if $e>0$, eventually falls. The rate at which $\mathrm{d}R/\mathrm{d}t=0$ is a **Laffer peak**. For the illustrative isoelastic form $z(t)=z_0(1-t)^e$, the peak is at $t^*=1/(1+e)$. If $e=0.25$, $t^*=0.80$; if $e=0.5$, $t^*=2/3$; if $e=1$, $t^*=1/2$.

::: widget plot
f: 100*x*(1-x)^e
sliders: e=0.5:0.1:1.5
x: 0, 1
y: 0, 40
labels: \text{illustrative revenue}
caption: An *illustrative* Laffer curve: $R(t)=100\, t(1-t)^{e}$ with the elasticity $e$ on a slider. Peak at $t=1/(1+e)$. This is a sketch of a one-rate model, not an estimate for any country, not a forecast, and not a recommendation of a rate. Move $e$ and watch the peak travel; real tax systems have many rates, a changing $e$ along the distribution, and bases that shift across borders.
:::

::: proposition Laffer peak in the isoelastic illustration {#prop-laffer}
If $z(t)=z_0(1-t)^{e}$ with $e>0$ constant, tax revenue $R=t z(t)$ is maximised at $t^*=1/(1+e)$. Assumptions: a single rate, a closed base (no shifting to other jurisdictions or other tax bases), constant $e$, no administrative cost, and a static model. The formula is illustrative.
:::
::: proof
$\ln R = \ln t + \ln z_0 + e\ln(1-t)$. Derivative: $1/t - e/(1-t)=0$, so $1-t=e t$, $t=1/(1+e)$. The second derivative is negative on $(0,1)$.
:::

Three comments, all cautionary. First, being on the wrong side of a Laffer peak is a *positive* claim that cutting the rate would raise revenue. For broad labour-income taxes in OECD countries, surveys (Trabandt and Uhlig 2011; Saez, Slemrod and Giertz 2012) typically place current average rates on the rising part of the curve; some estimates of *top* marginal rates are closer to a peak, with wide uncertainty. Second, even on the rising part, MCPF $>1$: maximising revenue is not maximising welfare. A utilitarian planner almost never wants the Laffer peak, because the last unit of revenue there costs infinite surplus per dollar (the denominator $\mathrm{d}R$ vanishes). Third, $e$ is not a deep parameter: it includes evasion, avoidance, migration and real labour supply, and it depends on enforcement and on the definition of the base (Slemrod and Kopczuk 2002).

::: application Corporate-tax bases and reported elasticities
Statutory corporation-tax rates in OECD countries have fallen since the 1980s (OECD Tax Database, various years) while revenue as a share of GDP has not collapsed — a fact sometimes advertised as a Laffer effect. The composition is more prosaic: the *base* was broadened (fewer allowances), profits' share of GDP changed, and multinational shifting (transfer pricing, debt shifting) responded to *relative* rates. Devereux, Griffith and Klemm (2002) and later work document the statutory-rate decline. An elasticity of *reported* corporate profits to a single country's rate is not $e$ in [[#prop-laffer]]; it is in large part a shifting elasticity, which a coordinated base would shrink. This paragraph is a description of a literature, not a recommendation of a corporate rate.
:::

## Evidence

- **Triangles are small at small rates, large at large rates.** Harberger's original estimates of the DWL of the US corporation tax and of some commodity taxes were a few tenths of a per cent of GDP (Harberger 1964, 1966). Feldstein (1999) argued that using the ETI rather than hours elasticities raised the DWL of the US income tax into several per cent of GDP; Saez, Slemrod and Giertz (2012) judged that some of Feldstein's ETIs were too high for long-run *real* responses. The range is the state of the evidence.
- **Taxable-income elasticities.** US mid-run ETI around $0.2$ is a commonly cited central number (Saez, Slemrod and Giertz 2012), larger at the top. Kleven and Schultz (2014) find smaller ETIs in Denmark, where the base is broader. A broader base, other things equal, lowers $e$ and lowers DWL.
- **Commodity-tax DWL.** Taxes on goods with inelastic demand (tobacco, petrol in the short run) have small triangles and large incidence on buyers. Taxes on elastic bases (a single brand, a single jurisdiction's shopping) have large triangles. This is the Ramsey intuition, quantified.
- **MCPF estimates.** Dahlby and Ferede and various finance ministries publish MCPF numbers by tax instrument, typically $1.2$–$1.5$ for labour taxes in high-income countries, with a wide range. Treat them as model-dependent.

::: history
Jules Dupuit (1844) drew a demand curve and identified the lost surplus of a toll. Harold Hotelling (1938) and, later, Arnold Harberger (1964, "The Measurement of Waste") made the triangle operational. Peter Diamond and James Mirrlees (1971) showed that, under their assumptions, public-sector production should still use undistorted factor prices even when commodity taxes are distorting — a theorem about *how* to spend, not about MCPF being one. Arthur Laffer's 1974 napkin (popularised in the US tax-cut debate) was a picture of $R(t)$; the peak itself is a nineteenth-century idea (Dupuit; also Jules Dupuit and, in public discussion, Andrew Mellon). The modern ETI programme is Feldstein (1995, 1999) and the survey of Saez, Slemrod and Giertz (2012).
:::

## Where this leads

Ramsey and Mirrlees ([[public-economics/optimal-taxation]]) *choose* $t$ to balance DWL against the social value of revenue and of redistribution: they are this chapter plus a $W$. Incidence ([[public-economics/tax-incidence]]) distributes the rectangle of revenue. Public goods ([[public-economics/public-goods]]) should be costed at MCPF in a second-best world, or, better, chosen jointly with the tax system. Environmental taxes ([[public-economics/externalities]]) have a triangle that can change sign: a Pigouvian tax *reduces* a pre-existing DWL of pollution.

::: summary
- Deadweight loss is lost surplus not recouped as revenue ([[#def-dwl]]). For small taxes it is a triangle that grows with $t^2$ ([[#prop-harberger-approx]]).
- Use compensated elasticities when the revenue is rebated or when income effects are first-order. Marshallian triangles can mislead.
- The marginal cost of public funds is $1+\mathrm{d}(\mathrm{DWL})/\mathrm{d}R$ ([[#def-mcpf]]), larger than the average cost, and is the right hurdle for a project financed by a specified distorting tax.
- The Laffer curve $R(t)$ is a positive object ([[#prop-laffer]]). A welfare-maximising rate lies below the peak. Illustrative isoelastic peaks are not country estimates.
- Evidence: ETIs around $0.2$ in several US studies, smaller in some broader-base economies; Harberger-sized triangles at moderate rates; MCPF estimates that are model-dependent.
:::

## Exercises

::: exercise Triangle arithmetic {level=1 check="4"}
Linear demand and supply, $t=4$, $\Delta q=2$. What is DWL? (Enter the triangle.)
::: solution
$\tfrac12 \times 4 \times 2 = 4$.
:::
:::

::: exercise Quadratic in $t$ {level=1}
If a tax of $5$ has DWL $10$ in the small-tax approximation, what DWL does the approximation assign to a tax of $10$ on the same base?
::: solution
DWL $\propto t^2$, so four times: $40$. (The approximation is worse at $10$ than at $5$.)
:::
:::

::: exercise Inelastic supply {level=1}
Supply is perfectly inelastic. A tax $t$ is levied. What is DWL, and who bears the tax?
::: solution
Quantity cannot change, so DWL $=0$. Sellers bear the tax ([[public-economics/tax-incidence]]). Revenue is a transfer from sellers to the government.
:::
:::

::: exercise Linear MCPF {level=2 check="22/19"}
In [[#ex-mcpf]], confirm that $\mathrm{d}R/\mathrm{d}t=(10-2t)/1.2$ and report $\mathrm{MCPF}$ at $t=1.2$. (Enter the MCPF as a fraction in lowest terms.)
::: solution
At $t=0$, $\mathrm{d}(\mathrm{DWL})/\mathrm{d}t=0$ and $\mathrm{d}R/\mathrm{d}t=q_0>0$, so $\mathrm{MCPF}=1$. At $t=1.2$, as computed in [[#ex-mcpf]], $\mathrm{MCPF}=22/19$.
:::
:::

::: exercise Compensated versus uncompensated {level=2}
Uncompensated labour-supply elasticity is $0$; compensated is $0.3$. A proportional labour tax is fully rebated lump-sum. Which elasticity enters the DWL formula, and why is the uncompensated elasticity zero in this story?
::: solution
The compensated elasticity $0.3$: rebate cancels the income effect, leaving substitution. Uncompensated zero means income and substitution effects on hours cancel when the tax is *not* rebated (the household is poorer). Using $0$ as "labour does not respond" for a rebated tax (or for a tax that finances a public good the household values comparably) understates DWL.
:::
:::

::: exercise Laffer peak {level=2 check="0.8"}
In the isoelastic illustration with $e=0.25$, what is $t^*$? (Enter the peak rate as a decimal.)
::: solution
$1/(1+0.25)=0.8$.
:::
:::

::: exercise Below the peak {level=3}
A utilitarian planner with $W=\sum u(c_i)$ and a concave $u$, raising a labour tax from a point where $\mathrm{d}R/\mathrm{d}t>0$, never wants to go all the way to the Laffer peak. Why, in terms of MCPF?
::: hint
What happens to $\mathrm{MCPF}$ as $\mathrm{d}R/\mathrm{d}t\to 0$?
:::
::: solution
$\mathrm{MCPF}=1+\mathrm{d}(\mathrm{DWL})/\mathrm{d}R \to\infty$ as $\mathrm{d}R\to 0^+$, because extra DWL is still positive while extra revenue vanishes. The social value of a unit of revenue is finite (the marginal social value of public spending, or of redistribution). The planner stops where that finite value equals MCPF, which is at $\mathrm{d}R/\mathrm{d}t>0$. Revenue maximisation is not welfare maximisation. (A Rawlsian planner who only values the worst-off, and who cannot reach them except through revenue, still stops short of the peak if the worst-off also bear some of the tax.)
:::
:::

::: exercise Many small taxes {level=3}
Harberger argued for adding triangles across markets. Give two reasons the sum of partial-equilibrium triangles can mis-measure the DWL of a *system* of taxes, one about general equilibrium and one about pre-existing distortions.
::: solution
General equilibrium: a tax in market A shifts demand or factors into market B, so the surplus in B changes; partial triangles miss the cross terms (the Harberger–Goulder point that one needs a general-equilibrium model, or at least compensated cross-elasticities). Pre-existing distortions: if market B is already taxed, or is an externality, the cross effect has a first-order welfare consequence (the theorem of the second best, Lipsey and Lancaster 1956). A new tax that reduces an already-too-large externality has a *negative* contribution to DWL. Adding naive triangles can get the sign wrong.
:::
:::

::: exercise ETI and avoidance {level=2}
Explain why a high elasticity of *taxable* income is not the same as a high elasticity of *labour supply*, and why broadening the base (fewer deductions) can lower DWL even if hours elasticities do not change.
::: solution
ETI includes hours, effort, deduction-taking, shifting across time and across bases, and evasion. Only the real-effort part is a social cost of the same kind as a Harberger triangle in the labour market; shifting into a taxed-at-a-lower-rate base has a smaller social cost if the other base is taxed, and a larger one if it is not. Broadening the base shuts down some shifting margins, lowering $e$ in [[#prop-laffer]] and the DWL formula, which is Slemrod and Kopczuk's point: $e$ is a policy choice, not a constant of nature.
:::
:::

::: exercise Exact DWL {level=3 check="0.6"}
For $D(q)=12-0.8q$, $S(q)=2+0.4q$, $t=1.2$, enter the exact DWL.
::: solution
[[#ex-triangle]]: $0.6$.
:::
:::
