The competitive labour market of [[labour-economics/labour-market-equilibrium]] has no unemployment worth the name: anyone who wants to work at the going wage does. That cannot be the model of the 5.1 per cent of the world’s labour force who were unemployed in 2023 (ILO, *WESO Trends 2024*), nor of the 3.6 per cent of the US labour force unemployed in 2023 (BLS, annual average), nor of the much higher rates in Spain or South Africa in the same year (OECD and ILO). Some unemployment is people between jobs; some is people whose skills do not match the vacancies that exist; some is people waiting, because the next offer might be better than the one in hand. **Search theory** takes that waiting seriously. A job is not a spot purchase of hours. It is a match, found at a cost, that produces a surplus to be bargained over.

This chapter does three things. It solves the worker’s problem of which offers to accept — the McCall reservation-wage rule. It puts many workers and firms into a market where meetings are governed by a **matching function**, the Diamond–Mortensen–Pissarides (DMP) model. And it asks what unemployment insurance does to search, to reservation wages and to the duration of unemployment, with the evidence presented as a liquidity effect as well as a moral-hazard effect. Flows, not stocks, are the right language: a Markov chain of employment, unemployment and inactivity is the accounting, and it is the last widget of the course.

## The worker’s search problem

A worker is unemployed, receives a benefit $b$ per period, and draws a wage offer $w$ each period from a known distribution $F$, independently, with probability $\lambda$ (the offer-arrival rate). Offers are take-it-or-leave-it and last forever if accepted. The discount rate is $r$. There is no on-the-job search in this first model (McCall 1970, *Quarterly Journal of Economics*).

::: definition Reservation wage {#def-reservation-search}
The **reservation wage** $w^*$ is the lowest wage the unemployed worker is willing to accept. It is defined by indifference between accepting $w^*$ and continuing to search. Offers $w \ge w^*$ are accepted; offers $w < w^*$ are declined.
:::

::: proposition McCall reservation rule {#prop-mccall}
The reservation wage satisfies

$$
w^* = b + \frac{\lambda}{r}\int_{w^*}^{\infty} (w - w^*)\,\mathrm{d}F(w),
$$ {#eq-mccall}

when accepted jobs last forever and there is no firing. Equivalently, $w^*$ equals $b$ plus the option value of waiting for a better draw. Assumptions: infinite horizon, stationary $F$ and $\lambda$, risk neutrality (or linear utility of the wage), no recall of past offers, and no saving problem (or complete markets).
:::

::: proof
Let $V_u$ be the value of being unemployed and $V_e(w)$ the value of a job at $w$. Then $V_e(w) = w/r$ (the job lasts forever) and

$$
r V_u = b + \lambda \int \max\bigl(V_e(w) - V_u,\, 0\bigr)\,\mathrm{d}F(w).
$$

The reservation wage is defined by $V_e(w^*) = V_u$, i.e. $w^*/r = V_u$. Substituting $V_u = w^*/r$ into the Bellman equation and rearranging yields [[#eq-mccall]].
:::

Comparative statics are the content of the model. A higher $b$ raises $w^*$: the unemployed can afford to be choosier. A higher $\lambda$ also raises $w^*$: offers are plentiful, so waiting is cheap in terms of forgone draws. A riskier $F$, in the sense of a mean-preserving spread, raises $w^*$ because the option value of waiting is convex. The duration of an unemployment spell is $1/\bigl(\lambda(1-F(w^*))\bigr)$: anything that raises $w^*$ lengthens duration, other things equal.

::: example Two wages {#ex-two-wages}
Each period an offer arrives with probability $\lambda = 0.5$. The wage is $10$ or $20$ with equal probability. The benefit is $b = 5$ and $r = 0.1$. Find $w^*$. Which offers are accepted?
::: solution
Guess that $10 < w^* < 20$, so only $20$ is accepted. Then [[#eq-mccall]] becomes

$$
w^* = 5 + \frac{0.5}{0.1}\cdot \tfrac12 (20 - w^*) = 5 + 2.5(20 - w^*).
$$

So $w^* = 5 + 50 - 2.5 w^*$, or $3.5 w^* = 55$, hence $w^* = 11/0.7 = 110/7 \approx 15.71$. The guess is consistent: $10$ is declined, $20$ is accepted. If $b$ were $0$, the same arithmetic gives $w^* = 50/3.5 \approx 14.29$, still between $10$ and $20$. A more generous benefit lengthens unemployment because the $10$-wage jobs stay rejected.
:::
:::

::: warning The reservation wage is not the reservation wage of labour supply
In [[labour-economics/labour-supply]] the reservation wage $w_R$ is the wage that makes a person indifferent between working and *not participating*. Here $w^*$ is the wage that makes an *unemployed* person, who is already in the labour force, indifferent between this job and waiting. The two objects share a name and a first-order condition of indifference. They answer different questions, and they move differently with $b$: unemployment insurance raises $w^*$ in the search model; it raises $w_R$ in the labour-supply model only if it is paid to non-participants, which typically it is not.
:::

## Matching and the DMP model

The McCall worker takes $\lambda$ as given. In the market, $\lambda$ is the rate at which unemployed workers meet vacancies, and that rate depends on how many vacancies firms post. Diamond (1982), Mortensen (1982) and Pissarides (1985, and *Equilibrium Unemployment Theory*, 2000) closed the model with a **matching function**.

::: definition Matching function and tightness {#def-matching}
A **matching function** $m(u, v)$ gives the flow of new hires from unemployment $u$ and vacancies $v$. It is increasing, concave, and usually assumed homogeneous of degree one. **Labour-market tightness** is $\theta = v/u$. The job-finding rate is $f(\theta) = m(u,v)/u = m(1,\theta)$, and the job-filling rate is $q(\theta) = m(u,v)/v = m(1/\theta, 1)$. Firms pay a posting cost $c$ per vacancy; jobs are destroyed at an exogenous rate $s$.
:::

A Cobb–Douglas matching function $m = \mu u^{\eta} v^{1-\eta}$ is the empirical workhorse, with $\eta$ around $0.5$ in many estimates (Petrongolo and Pissarides 2001, *Journal of Economic Literature*). Homogeneity implies that a larger market, with $u$ and $v$ scaled together, has the same finding rates — constant returns to matching.

::: proposition Steady-state unemployment {#prop-beveridge}
In a steady state, the flow into unemployment equals the flow out: $s(1-u) = f(\theta) u$, so

$$
u = \frac{s}{s + f(\theta)}.
$$ {#eq-beveridge}

This **Beveridge relation** is a downward-sloping curve in $(u, v)$-space once $f(\theta) = f(v/u)$ is substituted. Unemployment is high when tightness is low (few vacancies per job-seeker) or when separation $s$ is high.
:::

::: proof
A fraction $s$ of the employed $1-u$ lose their jobs; a fraction $f(\theta)$ of the unemployed $u$ find jobs. Equality of the two flows is the displayed formula. Because $f$ is increasing in $\theta = v/u$, a rise in $v$ at given $u$ raises $f$ and lowers steady-state $u$: the Beveridge curve slopes down in $(u,v)$.
:::

Wages in DMP are typically set by Nash bargaining over the surplus of a match. The bargained wage rises with $\theta$ (workers have a better outside option when vacancies are plentiful) and with $b$. Firms post vacancies until the expected profit of a vacancy, $q(\theta)$ times the firm’s share of surplus, equals $c$. That **job-creation condition** is an upward-sloping relation between $w$ and $\theta$, or equivalently a second curve in $(u,v)$-space. Equilibrium is the intersection: a $\theta^*$ and a $u^*$ that satisfy job creation and the Beveridge relation.

::: example A numerical Beveridge stock {#ex-beveridge}
Let $s = 0.02$ per period and $f = 0.48$. Find steady-state unemployment. If a recession halves vacancies and, with $\eta = 0.5$, halves $f$, what is the new $u$?
::: solution
$u = 0.02/(0.02+0.48) = 0.02/0.50 = 0.04$, or $4$ per cent. After the shock, $f = 0.24$ and $u = 0.02/(0.02+0.24) \approx 0.077$, about $7.7$ per cent. A halving of the finding rate does not double unemployment, because the stock has to feed a smaller outflow and a larger pool; the formula is nonlinear. Shimer (2005, *American Economic Review*) showed that, with standard Nash bargaining, DMP has trouble generating *enough* movement in $u$ and $v$ from observed productivity shocks — the **Shimer puzzle** — which has produced a large subsequent literature on wage rigidity in the match.
:::
:::

::: widget plot
f: s/(s+sqrt(x)); 0.05
x: 0.01, 4
y: 0, 0.4
sliders: s=0.02:0.005:0.08:0.005
labels: u(\theta); \text{5 per cent}
caption: Steady-state unemployment [[#eq-beveridge]] against tightness $\theta$, with $f(\theta)=\sqrt{\theta}$ (Cobb–Douglas with $\eta=0.5$ and $\mu=1$). Raise the separation rate $s$: the curve shifts up. Tight markets (large $\theta$) drive $u$ toward zero; slack markets raise it toward $1$.
:::

The Beveridge curve in the data — a scatter of unemployment and vacancy rates — shifts out in some recessions, notably the US in 2009 and again in 2020, which in the model is a fall in matching efficiency $\mu$ or a rise in mismatch. Elsby, Michaels and Ratner (2015, *Journal of Economic Literature*) survey the facts. South Africa’s unemployment rate above 30 per cent in recent years (Stats SA; ILO) is not a DMP calibration with US $s$ and $f$; it is a different labour market, with a large informal sector, spatial mismatch, and a reservation wage held up by household sharing and by a limited formal-sector job-finding rate. The model still organises the accounting; the parameters are not portable.

## Unemployment insurance

Unemployment insurance (UI) pays $b$ for a limited duration to people who have lost a job and are looking. In the McCall model it raises $w^*$ and lengthens spells. That is the **moral-hazard** (or reservation-wage) channel. Chetty (2008, *Journal of Political Economy*) emphasised a second channel: **liquidity**. If the unemployed cannot borrow against future earnings, a benefit that relaxes the cash constraint lets them wait for a better match *without* a rise in $w^*$ in the complete-markets sense; the extra duration can then be efficient.

::: proposition UI, duration and welfare {#prop-ui}
In the McCall model with complete markets, a rise in $b$ raises $w^*$, raises expected duration, and has a moral-hazard cost that must be weighed against the insurance benefit (Baily 1978; Chetty 2006). If markets are incomplete and the unemployed are liquidity-constrained, part of the duration response is an efficient liquidity effect, and the optimal replacement ratio is higher than the complete-markets formula suggests. Assumptions: the complete-markets statement is McCall plus a utilitarian planner; the liquidity statement requires a borrowing constraint.
:::

The evidence is that UI does lengthen unemployment spells, with elasticities of duration with respect to the benefit level typically in the range $0.3$–$1$ (Krueger and Meyer 2002, *Handbook of Public Economics*; Schmieder and von Wachter 2016, *Journal of Economic Perspectives*). Meyer (1990, *Econometrica*) found a spike in the US exit rate at benefit exhaustion. Card, Chetty and Weber (2007, *Quarterly Journal of Economics*), using Austrian administrative data, found a much smaller spike and argued that the US spike is in part a reporting effect. Chetty (2008) found that a substantial share of the US duration response is among households with low liquid assets — the liquidity channel. Schmieder, von Wachter and Bender (2012, *Quarterly Journal of Economics*) used German extended-benefit rules and found duration effects with little fall in re-employment wages, which sits uncomfortably with a pure reservation-wage story and more comfortably with a search-effort story.

None of this is a ranking of UI systems. A replacement ratio, a potential duration, a work test and a funding rule are different instruments; they have been combined very differently in Denmark, the US and middle-income countries with informal sectors large enough that UI barely reaches. The labour-economics contribution is the decomposition of the duration response, not a recommended rate.

::: example A replacement ratio and $w^*$ {#ex-ui-b}
Continue [[#ex-two-wages]] with $b$ raised from $5$ to $8$. Recompute $w^*$ under the same guess $10 < w^* < 20$. What happens to expected duration, given $\lambda = 0.5$ and a $50$ per cent chance of drawing $20$?
::: solution
$w^* = 8 + 2.5(20 - w^*)$ gives $w^* = 8 + 50 - 2.5 w^*$, so $3.5 w^* = 58$ and $w^* \approx 16.57$. The guess still holds. Duration was $1/(\lambda \cdot 0.5) = 1/0.25 = 4$ periods and is unchanged *in this two-point example*, because the set of accepted wages did not change: $10$ was already rejected. A small rise in $b$ lengthens duration only when it pushes $w^*$ across a mass of offers. With a continuous $F$, duration rises smoothly. The two-point case is a warning not to read a duration elasticity off a change in $w^*$ that does not cross an offer.
:::
:::

::: quiz
In the DMP steady state $u = s/(s+f)$, a rise in the job-finding rate $f$
- [ ] raises unemployment, because more people cycle through
- [x] lowers unemployment, with a larger effect when $f$ is small
- [ ] has no effect on $u$, which is determined only by $s$
- [ ] raises $u$ if $s$ is also endogenous
::: solution
$\partial u/\partial f = -s/(s+f)^2 < 0$. The derivative is larger in magnitude when $s+f$ is small, i.e. when unemployment is already high. Endogenous $s$ (firms fire more in a slump) would add a further rise in $u$, but that is an extra mechanism, not the accounting identity.
:::
:::

## Employment flows as a Markov chain

The stocks $E$, $U$ and $N$ (employed, unemployed, not in the labour force) are the persistent states of a monthly transition matrix. In US CPS data, typical monthly rates in a non-recession year are of the order of: $E\to U$ about $1$–$1.5$ per cent, $U\to E$ about $25$ per cent, $E\to N$ about $2$–$3$ per cent, $N\to E$ a few per cent (see Elsby, Hobijn and Şahin 2015, *Journal of Monetary Economics*, and BLS flow statistics). A recession is mostly a fall in $U\to E$ and a rise in $E\to U$, not a mysterious rise in a stock with no flows.

::: example A two-state chain {#ex-markov}
Suppose there are only two states, employment and unemployment, with monthly transitions $P_{EE} = 0.98$, $P_{EU} = 0.02$, $P_{UE} = 0.25$, $P_{UU} = 0.75$. Find the stationary unemployment rate. What is the mean duration of an unemployment spell?
::: solution
The stationary distribution $\pi$ satisfies $\pi P = \pi$ and $\pi_E + \pi_U = 1$. From $\pi_U = \pi_E \cdot 0.02 + \pi_U \cdot 0.75$, we have $0.25\pi_U = 0.02\pi_E = 0.02(1-\pi_U)$, so $0.25\pi_U + 0.02\pi_U = 0.02$, $\pi_U = 0.02/0.27 \approx 0.074$. Stationary unemployment is about $7.4$ per cent. Mean duration in unemployment is $1/P_{UE} = 4$ months. The stock is the product of the inflow and the duration, which is [[#eq-beveridge]] in discrete time: $u = s/(s+f)$ with $s = 0.02$, $f = 0.25$.
:::
:::

The figure simulates this chain. Watch a worker bounce between jobs and unemployment, and compare the time-average with the stationary distribution.

::: widget markov
matrix: 0.98,0.02; 0.25,0.75
states: Employed; Unemployed
start: 0
steps: 36
caption: A two-state labour-market chain as in [[#ex-markov]]: each month an employed worker loses the job with probability $0.02$, and an unemployed worker finds a job with probability $0.25$. Run the simulation. The occupancy of Unemployed should wander around $7$ per cent, the stationary rate. Raise the number of steps in your head: the law of large numbers is the Beveridge stock.
:::

Three-state chains add inactivity, which is first-order for women, for older workers, and for the US prime-age male participation decline discussed in [[labour-economics/labour-supply]]. A fall in participation can lower the unemployment *rate* while the employment-to-population ratio falls: the unemployment rate is $U/(E+U)$, not $U/(E+U+N)$. That is why labour economists look at employment-to-population as well as at unemployment.

::: application Why the unemployment rate is not enough
In 2020 the US unemployment rate spiked to 14.8 per cent in April and then fell rapidly, while the employment-to-population ratio recovered more slowly (BLS). Part of the fall in unemployment was a move from $U$ to $N$: people who stopped looking. South Africa’s official unemployment rate above 30 per cent coexists with a broad rate, including discouraged workers, that is higher still (Stats SA). ILO “jobs gap” measures, which include people who want work but are not counted as unemployed, were 8.2 per cent in high-income countries and 20.5 per cent in low-income countries in 2023 (ILO, *WESO Trends 2024*). The search model is about $U$; welfare is about $E$, $U$ and $N$ together.
:::

::: history
Stigler (1961, *Journal of Political Economy*) and McCall (1970) are the sequential-search origins. Peter Diamond (1982, *Review of Economic Studies*), Dale Mortensen (1982) and Christopher Pissarides (1985, *American Economic Review*) built the matching equilibrium; Pissarides’s book (1990, 2nd ed. 2000) is the standard treatment. The three shared the 2010 Nobel prize. Shimer (2005) documented the volatility puzzle. The UI-duration literature is older (Ehrenberg and Oaxaca 1976; Meyer 1990) and was re-interpreted as liquidity versus moral hazard by Chetty (2008).
:::

## Where this leads

Search is the microfoundation of monopsony in Manning (2003): labour supply to the firm is not infinitely elastic because workers take time to find a better job. It is also a microfoundation of residual wage inequality ([[labour-economics/wage-inequality]]): similar people are paid differently because they drew different matches. Macroeconomics uses the same matching function in [[macroeconomics/unemployment]] and in New Keynesian models with labour-market frictions ([[business-cycles]]). Public economics treats UI as social insurance ([[public-economics/social-insurance]]). The flows in the Markov widget are the same flows a statistical office publishes every month; reading those releases with $s$ and $f$ in mind is the practical skill this chapter is for.

::: summary
- An unemployed worker accepts offers above a reservation wage $w^*$ that rises with $b$ and with $\lambda$ ([[#def-reservation-search]], [[#prop-mccall]]).
- The DMP matching function $m(u,v)$ determines job-finding $f(\theta)$ and job-filling $q(\theta)$. Steady-state unemployment is $u = s/(s+f(\theta))$ ([[#def-matching]], [[#prop-beveridge]]).
- UI lengthens spells through a reservation-wage (moral-hazard) channel and a liquidity channel. Duration elasticities are typically $0.3$–$1$; the welfare implication depends on which channel dominates ([[#prop-ui]]).
- Stocks are the stationary distribution of a flow matrix. The unemployment rate can fall because people leave the labour force.
- The Shimer puzzle: standard DMP under-predicts the cyclical volatility of $u$ and $v$. Wage rigidity in the match is the leading response.
:::

## Exercises

::: exercise A two-point reservation wage {level=1 check="15.71"}
In [[#ex-two-wages]], $w^* = 110/7$. Enter $w^*$ rounded to two decimals.
::: solution
$110/7 \approx 15.71$, as in the example. Offers of $10$ are declined; offers of $20$ are accepted.
:::
:::

::: exercise Steady-state $u$ {level=1 check="0.04"}
$s = 0.02$ and $f = 0.48$. Compute steady-state unemployment. (Enter $u$ as a decimal, e.g. $0.04$.)
::: solution
$u = 0.02/(0.02+0.48) = 0.04$.
:::
:::

::: exercise Mean duration {level=1 check="4"}
In [[#ex-markov]], the monthly job-finding probability is $0.25$. What is the mean unemployment duration in months? (Enter the number of months.)
::: solution
$1/0.25 = 4$.
:::
:::

::: exercise Comparative statics of $w^*$ {level=2}
Using [[#eq-mccall]], what happens to $w^*$ if $b$ rises, if $\lambda$ rises, and if $r$ rises? Give the intuition for each, in a sentence.
::: solution
Higher $b$ raises $w^*$: waiting is more comfortable. Higher $\lambda$ raises $w^*$: a declined offer is quickly replaced, so the option value of waiting is larger. Higher $r$ lowers $w^*$: the future is discounted more, so the option to wait is worth less and the worker accepts more readily.
:::
:::

::: exercise A Beveridge shift {level=2}
The economy is on [[#eq-beveridge]]. Matching efficiency $\mu$ falls (the matching function is $m = \mu u^{\eta}v^{1-\eta}$). What happens to the Beveridge curve in $(u,v)$-space? How would you distinguish this from a movement *along* the curve caused by a fall in tightness?
::: solution
$f(\theta) = \mu \theta^{1-\eta}$ falls at given $\theta$, so $u = s/(s+f)$ rises at given $v/u$: the curve shifts out. A movement along the curve is a change in $\theta$ with $\mu$ and $s$ fixed, which traces the existing downward-sloping locus. In the data, a recession that raises $u$ and *lowers* $v$ is a movement along; a recession that raises $u$ at given $v$ (or raises both) is a shift, i.e. a matching-efficiency or mismatch shock.
:::
:::

::: exercise UI and two channels {level=2}
A study finds that a rise in the UI replacement ratio lengthens unemployment more for households with little liquid savings than for households with ample savings. Which of Chetty’s channels does this support, and what would a pure McCall (complete-markets) model have predicted?
::: solution
It supports the liquidity channel: the constraint, not only the substitution toward leisure or toward a higher $w^*$, is doing work. Complete-markets McCall has no role for savings; the duration response would not differ by liquid assets. The finding is the empirical content of [[#prop-ui]]’s second sentence.
:::
:::

::: exercise Three-state accounting {level=3}
Employment $E$, unemployment $U$ and inactivity $N$ sum to the working-age population. The unemployment rate is $U/(E+U)$; the employment-to-population ratio is $E/(E+U+N)$. Construct a numerical example in which the unemployment rate falls while the employment-to-population ratio also falls. Interpret the flows.
::: hint
Move people from $U$ to $N$.
:::
::: solution
Start with $(E, U, N) = (70, 10, 20)$. The unemployment rate is $10/80 = 12.5$ per cent; employment-to-population is $70$ per cent. Move $4$ people from $U$ to $N$: $(70, 6, 24)$. Unemployment is $6/76 \approx 7.9$ per cent; employment-to-population is still $70$ per cent. Now also move $3$ from $E$ to $N$: $(67, 6, 27)$. Unemployment is $6/73 \approx 8.2$ per cent (still below $12.5$ per cent) and employment-to-population is $67$ per cent. The unemployment rate can improve while employment deteriorates, if the labour force shrinks. That is a discouraged-worker flow, not a job-finding boom.
:::
:::

::: exercise Nash bargaining and tightness {level=3}
In DMP, the bargained wage rises with $\theta$. Explain why, and why that feedback *dampens* the response of tightness to a productivity shock (the mechanism behind the Shimer puzzle).
::: hint
When $\theta$ is high, the worker’s outside option is good.
:::
::: solution
High $\theta$ means vacancies are plentiful, so a worker who rejects this match finds another quickly: the outside option $V_u$ is high, and Nash bargaining therefore awards a higher $w$. A productivity boom that would otherwise induce a large rise in vacancy posting then leaks into wages, which cuts the firm’s surplus and chokes off the extra posting. Tightness, and therefore $f$ and $u$, move less than they would if $w$ were rigid. Shimer (2005) showed that, with standard parameters, this leak is so large that DMP under-predicts the cyclical volatility of $v$ and $u$. Wage rigidity — a wage that does not absorb the whole productivity change — is the leading repair.
:::
:::

::: exercise From flows to stocks {level=2 check="0.074"}
Using the two-state matrix of [[#ex-markov]], compute the stationary unemployment rate to three decimals. (Enter $\pi_U$.)
::: solution
$\pi_U = 0.02 / (0.02+0.25) = 0.02/0.27 \approx 0.074$.
:::
:::
