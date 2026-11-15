Two jobs, the same skill, the same city, and yet one pays more. Often the extra pay is compensation for something the worker does not like: a risk of injury, a night shift, a remote site, a contract with no security. Adam Smith put the idea in 1776: wages adjust so that the *net* advantages of occupations tend to equality, once one has allowed for the cost of acquiring the skill. Sherwin Rosen (1974) turned that sentence into a model of **hedonic prices**, in which the observed wage–amenity gradient is the envelope of firms’ offer curves and workers’ indifference curves. The same gradient, applied to fatal risk, is the labour-market **value of a statistical life** (VSL), the number that cost–benefit analysis of safety regulation uses.

The theory is clean. The evidence is harder, because jobs that differ in risk also differ in skill, in union status, in industry rents, and in the information workers have about the risk. This chapter sets out the Rosen model, the VSL arithmetic, and the main estimates, with the identification problems stated rather than waved away.

## Equalising differences

Consider a worker with utility $u(c, z)$, where $c$ is consumption (equal to the wage, in a one-period model with no non-labour income) and $z$ is a job attribute. Take $z$ to be a **disamenity**: injury risk, noise, an antisocial schedule. Then $u_c > 0$ and $u_z < 0$. At a given utility $\bar u$, the wage the worker must be paid to accept $z$ is her **indifference wage** $w^w(z; \bar u)$, defined by $u\bigl(w^w(z), z\bigr) = \bar u$. Differentiating,

$$
\frac{\mathrm{d}w^w}{\mathrm{d}z} = -\frac{u_z}{u_c} > 0.
$$ {#eq-mrs-z}

The worker must be paid more to accept more of the disamenity. The slope is her marginal willingness to accept $z$.

A firm that offers $z$ has a profit function that depends on $z$: safer workplaces cost more to run, or dirtier processes are cheaper. The firm’s **offer wage** $w^f(z; \bar\pi)$ is the wage it can pay at $z$ and still make profit $\bar\pi$. Competition among firms and among workers sorts people into jobs.

::: definition Hedonic wage function {#def-hedonic}
The **hedonic wage function** $w(z)$ is the wage–amenity schedule observed in a competitive market with heterogeneous workers and heterogeneous firms. At each $z$ that is offered, $w(z)$ is tangent to some worker’s indifference curve and to some firm’s offer curve. The observed slope $w'(z)$ therefore equals both the marginal worker’s willingness to accept $z$ and the marginal firm’s cost of reducing $z$.
:::

::: proposition Sorting along the hedonic locus {#prop-sorting}
Workers with a stronger distaste for $z$ (a steeper indifference curve) sort into jobs with lower $z$ and, typically, lower wages. Firms that can reduce $z$ cheaply sort into the low-$z$ segment. The market does not produce a single compensating differential; it produces a *schedule* $w(z)$. Assumptions: perfect information about $z$, costless mobility, and enough heterogeneity that the schedule is filled in.
:::

::: proof Sketch.
A worker maximises $u(w(z), z)$ over $z$. The first-order condition is $u_c w'(z) + u_z = 0$, which is $w'(z) = -u_z/u_c$: she chooses the $z$ at which the market slope equals her MRS. A firm maximises profit given $w(z)$; its first-order condition sets the marginal cost of $z$ equal to $w'(z)$. Heterogeneous MRS and heterogeneous costs therefore spread workers and firms along $w(z)$.
:::

::: example A linear compensating differential {#ex-linear-cd}
Utility is $u = c - \tfrac12 \theta z^2$ and the market wage is $w(z) = 10 + 2z$. Find the $z$ a worker of type $\theta$ chooses, and her wage. Which workers take the riskiest jobs?
::: solution
Maximise $10 + 2z - \tfrac12 \theta z^2$. The first-order condition is $2 - \theta z = 0$, so $z^* = 2/\theta$ and $w = 10 + 4/\theta$. Low-$\theta$ workers (those who mind $z$ less) choose higher $z$ and earn more. High-$\theta$ workers pay, in forgone wages, for a safer or pleasanter job. The market slope $w'(z) = 2$ equals $\theta z^*$ at the choice, which is the MRS $-u_z/u_c = \theta z$.
:::
:::

The figure draws $w(z) = a + b z$ and a family of indifference curves. A change in $b$ is a change in the price of the disamenity.

::: widget plot
f: a+b*x; 8+0.5*th*x*x; 8+0.25*th*x*x
x: 0, 6
y: 0, 30
sliders: a=10:4:16:0.5; b=2:0.5:5:0.1; th=1:0.4:3:0.1
labels: w(z); \bar u; \text{higher }u
caption: Hedonic wage $w = a + b z$ and two indifference curves $c = \bar u + \tfrac12 \theta z^2$ for the preferences in [[#ex-linear-cd]]. Raise $b$: risk is paid more, and the tangency moves. Raise $\theta$: the worker is less willing to take $z$, and the tangency moves left.
:::

::: warning The wage gap is not the preference of the average worker
$w'(z)$ is the preference of the *marginal* worker at that $z$, not the average worker in the economy, and not the preference of the workers who have already sorted into very different $z$. Using a single wage–risk coefficient as everyone’s VSL is an approximation. It is a bad approximation if people with very different risk tolerances hold the jobs in the sample.
:::

## The value of a statistical life

Let $z$ now be the probability of a fatal injury at work, per year, and let $w(z)$ be the annual wage. A small rise $\mathrm{d}z$ is compensated by $w'(z)\,\mathrm{d}z$. The **value of a statistical life** is that compensation scaled up to one expected death.

::: definition Value of a statistical life {#def-vsl}
If a job with extra fatality risk $\Delta z$ (a probability) pays an extra $\Delta w$ per year, the **value of a statistical life** implied by that gradient is

$$
\mathrm{VSL} = \frac{\Delta w}{\Delta z}.
$$ {#eq-vsl}

A VSL of \$7 million means that a group of $7{,}000$ workers would together require about \$7 million a year to accept an extra $1/7{,}000$ chance of death each, which is one expected death in the group. It is not the value of an identified person’s life, and it is not a price at which anyone is sold.
:::

::: example From a wage premium to a VSL {#ex-vsl}
Two otherwise similar jobs differ by $1$ death per $10{,}000$ worker-years ($\Delta z = 0.0001$) and by \$700 a year in pay. Compute the VSL. If a safety regulation would prevent $4$ statistical deaths a year in a covered population and cost \$20 million a year to run, what is the cost–benefit comparison using this VSL? (The comparison is an illustration of the arithmetic, not a recommendation of any regulation.)
::: solution
$\mathrm{VSL} = 700 / 0.0001 = \$7$ million. Four statistical deaths are valued at \$28 million, above the \$20 million cost, so the regulation passes this particular cost–benefit test with this particular VSL. Change the VSL, the number of deaths prevented, or the cost, and the comparison changes. Real assessments also count injuries, property, and distributional weights; they are not a single multiplication.
:::
:::

Viscusi and Aldy (2003, *Journal of Risk and Uncertainty*) surveyed labour-market VSL estimates and found a US median of roughly \$7 million in year-2000 dollars, with a wide range. The US Department of Transportation’s guidance for 2021 used about \$11.8 million in 2021 dollars; the US EPA’s central estimates in the same period were of the same order. Estimates for lower-income countries are typically smaller in dollar terms (Viscusi and Masterman 2017, *Journal of Benefit-Cost Analysis*), roughly in proportion to income raised to a power a little above one — a finding that is ethically contested when it is used to value lives differently by country, and that is mechanically expected if safety is a normal good. This atlas reports the estimates; it does not settle the ethical dispute.

Non-fatal risk, shift work, and job security have their own gradients. Night and weekend work pay a premium in most rich-country data; temporary contracts sometimes pay more and sometimes less, because they also differ in who holds them. Remote work, after 2020, is an amenity for some workers and a disamenity for others; the wage adjustment is still being measured and should be treated as provisional.

::: example Night work as a $z$ {#ex-night}
Suppose the hedonic schedule for the share of hours at night, $z \in [0,1]$, is $w(z) = 18 + 6z$ (pounds per hour). A worker with $u = c - 4z$ (linear distaste) would like which $z$? Why is the answer a corner, and which workers take the night shift?
::: solution
The market slope is $w'(z) = 6$ and the worker’s MRS is $4$. Because $6 > 4$, the extra pay more than compensates this worker at every $z$: she takes $z = 1$ (all-night) and earns 24. Workers with MRS $> 6$ take $z = 0$. Linear preferences plus a linear schedule produce corners — the interior sorting of [[#ex-linear-cd]] needed a convex cost of $z$ in utility. Night-shift premia in the data are consistent with a mix of corners and interiors, depending on how $z$ is measured (a 0–1 shift versus a continuous share).
:::
:::

## Identification

A regression of wages on injury rates, with a handful of controls, is not $w'(z)$. Ability, union status, industry, and occupation are correlated with both wages and risk. Measurement of $z$ is noisy (industry-average fatality rates assigned to individuals). Workers may not know the risk. And the people in high-risk jobs are those who mind risk less, so the estimated gradient is a selected one.

::: proposition What a hedonic regression identifies {#prop-hedonic-id}
In the Rosen model, a regression of $w$ on $z$ that correctly controls for skill and for other amenities identifies the slope of $w(z)$ at the observed $z$, which equals the marginal worker’s MRS. It does not identify the indifference curve of any other worker, and it does not identify how $w(z)$ would shift if the distribution of $z$ changed (for example after a safety regulation). Assumptions: $z$ is accurately measured and observed by workers; omitted amenities are not correlated with $z$ after controls; and the market is on the hedonic locus.
:::

The last clause is the **endogeneity of the offer curve**. A safety regulation that truncates high $z$ changes the set of jobs, and the new $w(z)$ is a new envelope, not a movement along the old one. Using the old VSL to value the regulation is then an approximation, valid for a small change and not for a ban on a whole class of jobs. Hwang, Reed and Hubbard (1992, *Journal of Political Economy*) showed how unobserved productivity can bias the wage–risk gradient *down*, even to a wrong sign: abler workers take safer jobs *and* earn more, so raw data can show higher pay in safer jobs.

The more credible estimates use better measures of $z$ (job-level rather than industry-level fatality rates), richer skill controls, and in some cases panel data that follow the same worker across jobs. Even then, the range across studies is wide, which is why agencies that use a VSL tend to use a central estimate and a sensitivity band, not a single labour-economics paper.

::: quiz
In the Rosen model, a worker who minds risk very little will, relative to a risk-averse co-worker of the same skill,
- [ ] take a safer job and earn more
- [x] take a riskier job and earn more
- [ ] take a riskier job and earn less
- [ ] take the same job, because $w(z)$ is the same for everyone
::: solution
[[#prop-sorting]]: a flatter indifference curve is tangent to $w(z)$ further to the right. The worker accepts more $z$ and is paid $w(z)$ for it, which is higher. Both workers face the same *schedule*; they choose different points on it.
:::
:::

::: example Unobserved ability can flip the sign {#ex-bias}
Suppose the true compensating differential is $w = 20 + 5{,}000\, z + 2 a$, where $a$ is ability, and high-ability workers choose $z = 0.0001 - 0.00002 a$ (they take safer jobs). In a sample, $a$ is omitted. Explain the direction of the bias on the coefficient of $z$, without estimating it.
::: solution
$a$ enters the wage positively and is negatively correlated with $z$. Omitting $a$ loads a negative term onto $\hat\beta_z$: risky jobs are disproportionately held by low-$a$ workers, who earn less for that reason. The estimated compensating differential is too small, and can be negative even though the true $5{,}000$ is positive. This is the Hwang–Reed–Hubbard problem. Controlling for education and occupation is an attempt to hold $a$ fixed; it is only as good as those proxies.
:::
:::

## Evidence

Thaler and Rosen (1976, in *Household Production and Consumption*) is the first modern labour-market VSL paper; their estimates, in today’s dollars, are on the low side of the later range. Viscusi’s subsequent work, using the Census of Fatal Occupational Injuries, typically finds a positive wage–risk gradient once occupation and industry are handled carefully. Kniesner, Viscusi, Woock and Ziliak (2012, *Review of Economics and Statistics*) use panel data and put the US VSL around \$4–\$10 million (2001 dollars) in their preferred specifications.

Non-fatal workplace injuries also carry a premium, smaller per case and large when scaled by the injury rate. Unionised jobs in the US have historically been both safer (after the 1970 Occupational Safety and Health Act, in part) and higher-paid; whether the union wage gap is in part a compensating differential for remaining risk, or a rent, is not settled by the hedonic model alone.

Amenities other than safety are priced too, when they can be measured. Mas and Pallais (2017, *American Economic Review*) estimate, in an experiment on a US call-centre application process, that the average applicant would take an 8 per cent pay cut for the option to work from home, and a 20 per cent cut to avoid a job with an employer-set schedule — with wide dispersion, which is exactly what [[#prop-sorting]] predicts. Those numbers are for a particular occupation and a particular applicant pool; they illustrate the method more than they provide a universal price of flexibility.

In low-income countries, compensating differentials for risk are often harder to find in the data, for a combination of reasons: injury rates are badly measured, informal jobs do not report them, and credit constraints and limited mobility can prevent the sorting the Rosen model assumes. That does not mean workers in those jobs do not mind risk. It means the *market* may not be pricing it, which is a reason safety regulation and enforcement have a different role when mobility is limited.

::: history
Smith’s discussion of equalising differences is in *The Wealth of Nations*, Book I, Chapter 10 (1776): wages vary with “the ease or hardship, the cleanliness or dirtiness, the honourableness or dishonourableness of the employment.” Sherwin Rosen, “Hedonic Prices and Implicit Markets” (*Journal of Political Economy*, 1974), is the modern theory; Thaler and Rosen (1976) is the first empirical VSL from labour data. The US regulatory use of a VSL developed at EPA and at the Department of Transportation in the 1980s and 1990s. Hwang, Reed and Hubbard (1992) is the standard warning about ability bias in the wage–risk gradient.
:::

## Where this leads

Hedonic wages are one reason the law of one wage fails. Discrimination ([[labour-economics/discrimination]]) is another, and the two can be confused: a wage gap that looks like prejudice may be compensation for hours, safety or flexibility, which is why decompositions in the next chapter try to control for job attributes. Job polarisation in [[labour-economics/wage-inequality]] is in part a change in the set of $z$’s the economy offers. Search frictions in [[labour-economics/search-and-unemployment]] mean that workers do not instantly sort onto the hedonic locus; the observed gradient is then a mixture of compensating differentials and rents.

::: summary
- Jobs are bundles. The wage compensates for disamenities: $w'(z)$ equals the marginal worker’s MRS ([[#def-hedonic]], [[#prop-sorting]]).
- Workers who mind $z$ less sort into high-$z$, high-wage jobs; firms that can reduce $z$ cheaply offer low $z$.
- The VSL is $\Delta w / \Delta z$ for fatal risk ([[#def-vsl]]). US labour-market estimates are typically several million dollars per statistical life (date and dollar year matter). It is not the value of an identified person.
- A hedonic regression identifies the slope of $w(z)$ only under strong assumptions ([[#prop-hedonic-id]]). Unobserved ability can bias the wage–risk gradient down.
- The same apparatus prices hours, schedules and remote work, with large heterogeneity in willingness to pay.
:::

## Exercises

::: exercise MRS along the locus {level=1 check="2"}
Utility is $u = c - \tfrac12 \theta z^2$ and $w(z) = 10 + 2z$, as in [[#ex-linear-cd]]. For $\theta = 1$, what $z$ does the worker choose? (Enter $z^*$.)
::: solution
$z^* = 2/\theta = 2$.
:::
:::

::: exercise The wage at that job {level=1 check="14"}
In the previous exercise, what wage does the worker earn? (Enter $w$.)
::: solution
$w = 10 + 2\times 2 = 14$.
:::
:::

::: exercise A VSL {level=1 check="5000000"}
A job with extra fatality risk $1/10{,}000$ pays an extra \$500 a year. Compute the VSL. (Enter the VSL in dollars, without commas.)
::: solution
$500 / 0.0001 = 5{,}000{,}000$.
:::
:::

::: exercise Who takes the risky job {level=2}
Two workers have the same skill. Worker A has a steeper indifference curve in $(z, w)$-space than worker B. Who holds the riskier job, and who earns more? What quantity is the same for both?
::: solution
B has the flatter MRS and sorts to higher $z$ and a higher wage. Both face the same hedonic schedule $w(z)$; they choose different points.
:::
:::

::: exercise Cost–benefit arithmetic {level=2 check="4"}
Using a VSL of \$8 million, a regulation costs \$24 million a year and is expected to prevent $n$ statistical deaths a year. For which integer $n$ does the value of deaths prevented first exceed the cost? (Enter that $n$.)
::: solution
$8n > 24$ when $n \ge 4$. At $n = 3$ the value is \$24 million, equal to cost only if one counts equality as passing; “first exceed” is $n = 4$ (\$32 million). The exercise is arithmetic, not a policy recommendation.
:::
:::

::: exercise Ability bias {level=2}
Explain, in the language of omitted-variable bias, why adding a test-score control to a wage–risk regression often *raises* the estimated compensating differential for fatal risk.
::: solution
Ability (proxied by the test score) raises wages and is negatively correlated with risk if abler workers sort into safer jobs. Omitting it biases $\hat\beta_z$ down. Including it removes that downward bias, so the estimated premium on risk rises — the pattern Hwang, Reed and Hubbard (1992) warned about.
:::
:::

::: exercise A regulation and the envelope {level=3}
A regulation bans all jobs with $z > z_0$. Why is it incorrect, in general, to value the ban by taking $w'(z)$ from the old hedonic schedule and multiplying by the reduction in $z$? What would you need to know to do the welfare analysis properly?
::: hint
The observed $w(z)$ is an envelope. Removing part of the support of $z$ changes which firms and workers are matched.
:::
::: solution
$w'(z)$ is a *local* price, valid for a small movement along the existing locus ([[#prop-hedonic-id]]). A ban is a discrete change in the set of offers: some firms exit or convert, some workers re-sort, and the new envelope $w_{\text{new}}(z)$ is a different function. The right welfare calculation uses workers’ underlying indifference curves and firms’ cost curves, not only the old slope. For a small tightening of $z_0$ the local VSL is a reasonable approximation; for a ban on a whole occupation it is not.
:::
:::

::: exercise Mas and Pallais {level=3}
Mas and Pallais (2017) find that the *average* applicant will take an 8 per cent pay cut to work from home, but that many applicants will pay nothing and some will pay much more. Connect this dispersion to [[#prop-sorting]]. What would you expect to happen to the wage gap between remote and on-site jobs as remote work becomes easier for firms to offer?
::: solution
Dispersion in willingness to pay is heterogeneous $\theta$ in [[#ex-linear-cd]]. As remote work becomes cheaper for firms to offer, the offer curves shift and more of the locus is at the remote $z$. Workers who value remote work most sort into it and accept a larger wage cut; workers who do not, stay on site. The observed wage gap is the slope of the new envelope, not the average willingness to pay, and it can shrink as remote work ceases to be scarce — just as a compensating differential for an amenity that becomes universal must go to zero.
:::
:::

::: exercise Night-shift premium {level=2}
A researcher finds that night-shift nurses earn 12 per cent more than day-shift nurses in the same hospital grade. Give two interpretations other than a compensating differential for night work, and one test that would help distinguish them.
::: solution
The night staff may be a different mix of experience, specialty or (in some systems) seniority; or the 12 per cent may include an overtime or unsocial-hours *rule* that is not a market price. A test: look at the same nurse moving between shifts (a worker fixed-effect), or at hospitals that differ in how binding the night-staffing constraint is. If the premium survives within-worker and tracks the disamenity rather than the rule, the compensating-differential reading is stronger.
:::
:::
