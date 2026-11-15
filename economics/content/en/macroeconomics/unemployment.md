South Africa’s unemployment rate was about 32 per cent in 2024; Japan’s was about 2.5 per cent in 2025; the OECD average sat near 4.9 per cent in May 2025 (World Bank WDI, national estimates; OECD Employment Outlook 2025). Those are not three measurements of the same labour-market tightness. They are three different natural rates, three different mixes of job-finding, job-separation and wage-setting, and — in the South African case especially — a reminder that the classical model of [[macroeconomics/national-income]], which puts labour at a market-clearing $\bar L$, is a model of a labour market that has already done a great deal of work.

This chapter asks why unemployment is positive even when the economy is at “full employment”, and why that natural rate differs so much across countries and over decades. The accounting is a two-state flow model: people move between employment and unemployment at rates $f$ and $s$, and the unemployment rate converges to $s/(s+f)$. Frictional, structural and wage-rigidity stories are different accounts of those rates, not mutually exclusive lists. Keynesian demand-deficient unemployment, in which $Y$ sits below $F(\bar K,\bar L)$ because $P$ or $w$ has not adjusted, is postponed to [[macroeconomics/is-lm]] and [[macroeconomics/aggregate-supply]]; it is a deviation from the natural rate, not a theory of the natural rate itself.

The chapter is for education only. It is not a recommendation of a minimum wage, a replacement rate, an employment-protection rule or an active labour-market programme. Those policies have trade-offs that [[labour-economics]] treats at length; here they appear as shifters of $s$, $f$ and of the wage.

## Stocks, flows and the natural rate

The **labour force** $L$ is employment $E$ plus unemployment $U$. Out of the labour force — students, retirees, discouraged workers who have stopped searching — is a third state, important for participation and for the meaning of a “Great Resignation”, but set aside in the two-state model. The **unemployment rate** is $u = U/L = U/(E+U)$. A person is unemployed, on the ILO definition used by most statistical offices, if they are without work, available for work, and searching. Measured $u$ therefore depends on how search is counted, which is why South African and Japanese figures are comparable only after that definition is named.

::: definition Job finding, job separation and the natural rate {#def-natural}
Let $s$ be the **job-separation rate** (the fraction of the employed who lose or leave a job in the period) and $f$ the **job-finding rate** (the fraction of the unemployed who find a job). In a two-state labour market with a fixed labour force, the unemployment rate obeys

$$
u_{t+1} = s(1-u_t) + (1-f) u_t = s + (1-s-f) u_t.
$$ {#eq-u-dyn}

The unique steady state is the **natural rate of unemployment**

$$
u_n = \frac{s}{s+f}.
$$ {#eq-un}

It is “natural” in Friedman’s 1968 sense: the rate towards which $u$ tends once inflation is correctly anticipated and there is no demand gap. It is not a moral claim that this $u_n$ is optimal, and it is not a claim that $u_n$ is constant.
:::

::: proposition Convergence to the natural rate {#prop-un-conv}
If $0 < s+f < 2$, the unique steady state of [[#eq-u-dyn]] is $u_n = s/(s+f)$, and $u_t \to u_n$ from any $u_0 \in [0,1]$. The half-life of a deviation is $\ln 2 / \lvert \ln\lvert 1-s-f\rvert \rvert$ periods when $s+f \neq 1$.
:::

::: proof
Rewrite [[#eq-u-dyn]] as $u_{t+1} - u_n = (1-s-f)(u_t - u_n)$. This is a linear scalar iteration. The coefficient has absolute value less than one precisely when $0 < s+f < 2$, which holds for any pair of rates in $(0,1)$. Hence $u_t - u_n = (1-s-f)^t (u_0 - u_n) \to 0$. The half-life formula is the usual one for $\lvert \lambda \rvert^t = 1/2$.
:::

Two comments on magnitudes. First, $u_n$ is small when $f$ is large relative to $s$: a labour market that matches the unemployed quickly can tolerate a high separation rate and still post a low $u$. Second, the *average duration* of an unemployment spell is $1/f$ periods in the steady state of this model (a standard result for a constant hazard). European labour markets with low $f$ therefore show both higher $u$ and longer spells, which is a different social fact from a high-$s$, high-$f$ market with the same $u_n$.

::: example Finding, separation and duration {#ex-flows}
In a monthly model, $s = 0.02$ and $f = 0.38$. Compute $u_n$ and the average completed duration of unemployment. If a recession lowers $f$ to $0.18$ while $s$ is unchanged, what is the new steady-state unemployment rate, and how much of the rise is a longer duration?
::: solution
$u_n = 0.02/(0.02+0.38) = 0.05$, or 5 per cent. Average duration is $1/0.38 \approx 2.63$ months. With $f=0.18$, $u_n = 0.02/0.20 = 0.10$, or 10 per cent, and duration is $1/0.18 \approx 5.56$ months. Unemployment has doubled; duration has a little more than doubled. In this experiment the entire rise in $u_n$ is a finding-rate story: more people are unemployed because each spell lasts longer, not because jobs are being destroyed faster. (A rise in $s$ with $f$ fixed would raise $u_n$ and leave duration unchanged — a different recession.)
:::
:::

::: widget markov
matrix: 0.98, 0.02; 0.38, 0.62
states: Employed; Unemployed
start: 0
steps: 40
caption: A two-state labour market with monthly $s=0.02$ and $f=0.38$, as in [[#ex-flows]]. The chain’s stationary distribution is the natural rate: about 95 per cent employed, 5 per cent unemployed. Start from Employed and watch a simulated spell of unemployment; raise the number of steps to see the occupation time approach $u_n$. The same picture with $f=0.18$ (the recession experiment) has a stationary unemployment rate of 10 per cent and visibly longer stays in Unemployed.
:::

::: quiz
In the two-state model, a rise in the job-finding rate $f$ with $s$ fixed
- [ ] raises the natural rate and shortens unemployment duration
- [x] lowers the natural rate and shortens unemployment duration
- [ ] lowers the natural rate and lengthens duration
- [ ] has no effect on $u_n$, because $u_n$ is determined by labour demand
::: solution
$u_n = s/(s+f)$ falls when $f$ rises, and duration $1/f$ falls. Labour demand belongs in a different diagram: it can change $s$ and $f$ in a richer model, but in this accounting identity $u_n$ is a function of the two rates alone.
:::
:::

The widget and the algebra describe a **frictional** labour market: jobs exist, workers exist, and matching takes time. That is already enough to make $u_n > 0$. It is not enough to explain why $u_n$ is 5 per cent in one country and 15 per cent in another.

## Frictional unemployment

**Frictional unemployment** is the unemployment that exists because labour is not a homogeneous soup. Jobs differ, workers differ, and information about the match is acquired by search. A worker who quits to look for a better job, a graduate who takes a month to find a first post, a firm that posts a vacancy and waits: all of these are frictional.

Search theory (McCall 1970; Mortensen 1970; Pissarides, *Equilibrium Unemployment Theory*) makes the finding rate an outcome. A worker with unemployment insurance $b$ and a distribution of wage offers $H(w)$ chooses a **reservation wage** $w_R$ satisfying a Bellman equation: the value of taking $w_R$ equals the value of waiting one more period. A higher $b$, a thicker right tail of $H$, or a lower discount rate raises $w_R$ and lowers $f$. The model is not a claim that unemployment insurance is a bad idea — insurance has a consumption-smoothing benefit, derived in [[macroeconomics/consumption-and-saving]] — it is a claim that $f$, and therefore $u_n$, respond to $b$. Estimates of that response vary. Katz and Meyer (1990, *Quarterly Journal of Economics*) found that U.S. unemployment-insurance recipients’ job-finding hazard rose sharply as benefits were about to lapse; Card, Chetty and Weber (2007, *Quarterly Journal of Economics*) found a much smaller effect at an Austrian discontinuity. The elasticities are a live empirical dispute; the sign in the theory is not.

Sectoral reallocation is a close cousin. When oil prices fall, Aberdeen and Houston shed jobs that Lisbon and Barcelona in tourism do not absorb in a week. Lilien (1982) argued that the *variance* of sectoral employment growth could move aggregate $u$; Abraham and Katz (1986) showed that much of that variance is itself cyclical. The modern version is the mismatch literature after 2008 (Sahin, Song, Topa and Violante 2014, *American Economic Review*), which attributed a few percentage points of the U.S. rise in $u$ to mismatch and the rest to aggregate demand. Friction, on this reading, is real and limited.

::: example Two countries, same $u_n$, different flows {#ex-two-u}
Country A has monthly $s=0.03$, $f=0.57$. Country B has $s=0.01$, $f=0.19$. Compute $u_n$ and average duration in each. Which labour market is “the same”?
::: solution
Country A: $u_n=0.03/0.60=0.05$, duration $1/0.57\approx 1.75$ months. Country B: $u_n=0.01/0.20=0.05$, duration $1/0.19\approx 5.3$ months. Headline unemployment is the same 5 per cent. Country A is a high-churn market (many short spells); country B is a low-churn market (fewer, longer spells). Unemployment insurance, skills and employment protection that operate on $f$ will show up in B’s duration even when they do not show up in the headline $u$.
:::
:::

## Structural unemployment and wage rigidity

**Structural unemployment** is unemployment that would not be removed by a general increase in demand for goods, because the unemployed cannot be matched to the vacancies at the going wage — wrong region, wrong skill, or a wage that cannot fall. The line between frictional and structural is a matter of speed: a skill that takes a year of training to acquire is a structure; a skill that takes a week of search to locate is a friction. Three wage-rigidity mechanisms have a classical flavour, in that they raise $u_n$ without any failure of goods-market demand.

::: definition Wage rigidity and the structural surplus {#def-rigidity}
A real wage $w$ is **rigid** if it does not fall to the level that would equate labour demand $L^d(w)$ with labour supply $L^s(w)$. The resulting unemployment is $u = (L^s(w) - L^d(w))/L^s(w)$. Three standard sources of rigidity are a **binding minimum wage**, **union wage setting**, and **efficiency wages**.
:::

**Minimum wages.** A floor $\underline{w}$ above the competitive wage reduces $L^d$ and raises $L^s$ along ordinary schedules, creating a surplus of workers. How large the effect is depends on the elasticities and on the alternative of monopsony. Card and Krueger (1994, *American Economic Review*) found no negative employment effect of a New Jersey minimum-wage rise in fast food, which is consistent with a monopsonistic labour market or with a very inelastic demand; Neumark and Wascher’s subsequent work found negative effects in other designs. The dispute is about magnitudes and about identification, not about the competitive diagram, which is a limiting case. Cengiz, Dube, Lindner and Zipperer (2019, *Quarterly Journal of Economics*) estimate small employment effects of U.S. state minima in the lower tail of the wage distribution, with a clear bunching at the new floor. None of these papers is a recommendation of a particular statutory rate.

**Unions.** A union that maximises a mix of the wage and of members’ employment will typically set $w$ above the competitive level and ration jobs. The unemployed may be outsiders (Lindbeck and Snower 1988). Cross-country variation in union coverage — high in much of continental Europe, low in the United States — is one candidate explanation of the Europe–U.S. unemployment gap of the 1980s and 1990s (Blanchard and Wolfers 2000, *Economic Journal*), interacting with shocks rather than acting alone.

**Efficiency wages.** The firm may not *want* to cut the wage. In Shapiro and Stiglitz (1984, *American Economic Review*) workers shirk unless the expected cost of being caught, which is the wage loss times the probability of detection, is large enough. Unemployment is the discipline device: a higher $u$ makes losing the job more costly, so the no-shirking wage can be lower. In equilibrium $u$ is positive, because if it were zero the threat would be empty. Other efficiency-wage stories — gift exchange (Akerlof 1982), turnover costs (Salop 1979), adverse selection in the applicant pool (Weiss 1980) — share the implication that $w$ is a choice of the firm, not only a price it takes, and that $u_n$ is an instrument.

::: example A binding floor {#ex-minwage}
Labour demand is $L^d = 100 - 2w$ and labour supply is $L^s = 20 + 2w$, with $w$ in real units of output per period. Find the competitive $(w, L)$. Now impose a minimum wage of $24$. Compute employment, unemployment, and the unemployment rate among those who wish to work.
::: solution
Competition: $100-2w = 20+2w$ gives $80=4w$, so $w=20$ and $L=60$. At $\underline{w}=24$, $L^d = 100-48 = 52$ and $L^s = 20+48 = 68$. Employment is $52$, unemployment is $16$, and $u = 16/68 \approx 0.235$, or 23.5 per cent of the labour force as measured by those who wish to work at $24$. The 8 workers who would have been employed at $w=20$ and are not at $24$ are the employment effect; the extra 8 who enter the labour force at the higher wage are a participation effect. Both swell measured $u$.
:::
:::

::: warning The unemployment rate is not one minus a utilisation rate
$u = U/(E+U)$ does not count people out of the labour force, and it does not count the underemployed who work fewer hours than they want. A fall in $u$ that is produced by discouraged workers leaving $L$ is not a tightening of the labour market in the sense of [[#eq-un]]. U.S. U-6, which adds the marginally attached and those working part-time for economic reasons, ran several points above the headline U-3 rate throughout the 2010s (BLS, accessed 2026). In countries with large informal sectors — India, much of sub-Saharan Africa — the ILO unemployment rate can be low because people cannot afford to search without income, while time-related underemployment is high. The two-state model is a model of a labour force that has already been defined; it is not a model of that definition.
:::

::: example A union wage {#ex-union}
Labour demand is $L^d=90-w$. A union covering all workers maximises the wage bill $w L^d$ (a crude objective). Find the union wage and employment, and compare with the competitive outcome if labour supply is perfectly elastic at $w=20$.
::: solution
The wage bill is $w(90-w)=90w-w^2$, maximised at $w=45$, $L=45$. Competition with $L^s$ elastic at $20$ would have $w=20$, $L=70$. The union raises the wage, cuts employment by $25$, and creates a pool of would-be workers at $w=45$ who are not hired. Measured $u$ then depends on how many of those $25$ remain in the labour force. The objective $wL$ is only one possible union goal; a union that also weights the unemployed would set a lower $w$. The diagram’s point is the rationing, not a particular union charter.
:::
:::

## Why natural rates differ

The two-state formula $u_n = s/(s+f)$ pushes the question onto $s$ and $f$. A research programme since the 1980s has asked why $f$ is so much lower in some European labour markets than in the United States, and why $u_n$ fell in Germany after the Hartz reforms of 2003–05 while remaining high in Spain and South Africa.

**Unemployment insurance and employment protection.** More generous, longer-lived benefits lower $f$ in search models and, if they raise the reservation wage, can raise the bargained wage in matching models. Employment protection — firing costs — lowers $s$ and also lowers $f$, because firms are more reluctant to hire; the net effect on $u_n$ is theoretically ambiguous (Bertola 1990) and empirically mixed. Germany’s Hartz IV reform reduced the duration of earnings-related benefits; Fahr and Sunde (2009) and subsequent work attributed part of the post-2005 fall in German $u$ to faster matching. Spain’s $u$ exceeded 25 per cent in 2013 (INE / World Bank WDI) after a construction collapse interacting with dual employment protection; the same $s$–$f$ arithmetic describes the rise, but the impulse was a shock, not a law.

**Mismatch and geography.** South Africa’s unemployment is concentrated among young, less-educated black workers, at a spatial remove from where formal jobs are (Banerjee, Galiani, Levinsohn, McLaren and Woolard 2008, *Economics of Transition*). That is a structural account: $f$ is low for a large subgroup. A demand expansion would raise $f$ somewhat, as it does everywhere; it would not, on this view, make $u_n$ look like Japan’s.

**The Beveridge curve.** Plotting $u$ against the vacancy rate $v$ gives a downward-sloping locus in a matching model, $m(u,v) = s(1-u)$ in steady state. An outward shift — more $u$ at a given $v$ — is a decline in matching efficiency, which is a rise in $u_n$. The U.S. Beveridge curve shifted out after 2008 and again after 2020 (JOLTS and BLS, accessed 2026); how much of those shifts was mismatch, how much composition, and how much a residual is still being argued. The curve is the right picture for the question; it is not itself an answer.

::: intuition Unemployment as a stock, matching as a flow
A 5 per cent unemployment rate, with $f = 0.4$ a month, is a market in which one in twenty workers is looking and in which looking is expected to last two or three months. A 25 per cent rate with $f = 0.05$ a month is a market in which one in four is looking and in which looking is expected to last twenty months. Calling both “unemployment” hides the difference that the flow model was built to reveal. Policy that raises $f$ — information, training, mobility, a change in $b$ — and policy that lowers $s$ — a more stable mix of jobs — are not interchangeable, even when they move $u_n$ by the same amount.
:::

## Demand-deficient unemployment, in outline

If the real wage is sticky and labour demand is $F_L(K,L) = w$, a fall in $P$ that fails to occur when nominal aggregate demand falls will leave $w = W/P$ too high and $L$ below $\bar L$. That is the Keynesian unemployment of the *General Theory*, Ch. 2 and 19, and of the short-run aggregate-supply schedule in [[macroeconomics/aggregate-supply]]. It is a claim about $u - u_n$, not about $u_n$. Distinguishing the two in the data is the business of the Phillips curve and of cyclical decomposition: $u$ minus a slowly moving $u_n$ is the unemployment gap that Okun’s law will connect to the output gap.

Okun’s law, in a common U.S. calibration, is roughly

$$
\frac{Y - Y_n}{Y_n} \approx -2 (u - u_n),
$$ {#eq-okun}

so a two-point unemployment gap corresponds to a four-per-cent output gap (Okun 1962; Ball, Leigh and Loungani 2017, *Journal of Money, Credit and Banking*, estimate a coefficient nearer $2$ in the United States and nearer $1$ in several other OECD countries). The coefficient is an empirical regularity, not a theorem; it belongs here as a bridge to the demand-side chapters, not as a theory of $u_n$.

New classicals (Lucas, Sargent) treated observed $u$ as $u_n$ plus misperception, and treated $u_n$ itself as the flexible-price equilibrium of a labour-leisure choice plus search. Real-business-cycle models ([[business-cycles/real-business-cycles]]) generate employment fluctuations from shocks to $A$ without a separate unemployment state. New Keynesians keep $u_n$ as a search-and-matching or sticky-wage object and let demand move $u$ around it. The evidence on which of those is a better description of 2008–09 or of 2020 is taken up in the cycles course; this chapter’s contribution is to make $u_n$ a number one can compute from $s$ and $f$, rather than a residual.

## Evidence

**Levels.** In 2024–25, unemployment rates (World Bank WDI, national estimates, accessed 2026) included Japan 2.5 per cent, Germany 3.8 per cent, the United States about 4 per cent (BLS annual), Brazil 5.8 per cent, India 4.5 per cent, Italy 6.1 per cent, and South Africa 32 per cent. The OECD average was 4.9 per cent in May 2025 (OECD Employment Outlook 2025). These are not all $u_n$ — some countries were above or below their own natural rates — but the cross-country range is far larger than the cyclical range within a typical OECD country, which is the first reason to take $u_n$ as a structural object.

**Flows.** Shimer (2005, *American Economic Review*) documented that U.S. $f$ is strongly procyclical and that $s$ is less so, so that most of the cyclical rise in $u$ is a finding-rate story, as in [[#ex-flows]]. Elsby, Hobijn and Şahin (2013, *Review of Economics and Statistics*) extended the decomposition to a set of OECD countries and found more of a role for $s$ in Europe. Monthly $s \approx 0.02$ and $f \approx 0.4$ are representative U.S. orders of magnitude in expansions; European $f$ is typically lower.

**Duration.** Long-term unemployment (spells of a year or more) as a share of all unemployment is much higher in much of Europe than in the United States (OECD Employment Outlook, various years). That is a low-$f$ fact, and it is the fact that hysteresis stories (Blanchard and Summers 1986) take as their starting point: a demand shock that lasts long enough to turn the unemployed into outsiders can raise $u_n$ itself.

**Insider data, not a forecast.** None of the figures above is a prediction of next year’s $u$. Natural-rate estimates move — the U.S. Congressional Budget Office’s estimate of the long-run NAIRU has been revised down by more than a point since the 1990s (CBO, Budget and Economic Outlook, various issues) — and they move because $s$ and $f$ move.

## Where this leads

[[macroeconomics/aggregate-supply]] puts $u - u_n$ into a Phillips curve and asks how inflation and unemployment trade off once $\pi^e$ is named. [[macroeconomics/ad-as-and-stabilisation]] treats $u_n$ as the centre of gravity of stabilisation policy. [[labour-economics/labour-market-equilibrium]] and the job-search chapter of that course take the matching function, monopsony and minimum wages to the evidence in more depth. [[business-cycles/business-cycle-facts]] documents the cyclical behaviour of $u$, $v$ and hours.

::: history
**1968, Milton Friedman.** “The Role of Monetary Policy”, the American Economic Association presidential address, defined the natural rate as the unemployment rate “ground out by the Walrasian system of general equilibrium equations” once labour-market and commodity-market imperfections are included, and argued that monetary policy could not hold $u$ below it without accelerating inflation. **1968, Edmund Phelps.** Independently, Phelps’s papers of 1967–68 derived a natural rate from search and from expectations, and a vertical long-run Phillips curve. **1982, Peter Diamond; 1985, Dale Mortensen and Christopher Pissarides.** The search-and-matching equilibrium model, for which the three later shared a Nobel Prize, made $u_n$ the steady state of a vacancy-and-unemployment process rather than a residual.
:::

::: summary
- Unemployment is a stock; job finding and job separation are flows. In a two-state model, $u_n = s/(s+f)$ and $u_t$ converges to $u_n$. Average duration is $1/f$.
- Frictional unemployment is search. Structural unemployment is mismatch or a wage that does not fall to the competitive level: minima, unions, efficiency wages.
- Demand-deficient unemployment is $u - u_n$, a short-run object. Okun’s law connects it to the output gap. The natural rate is not a moral optimum and is not constant.
- Cross-country differences in $u$ are mostly differences in $u_n$, hence in $s$, $f$ and wage-setting institutions. Cyclical differences are mostly differences in $f$.
- Competing views (search, Keynesian, new classical, New Keynesian) disagree about how much of observed $u$ is $u_n$ and about how fast $u_n$ itself moves; they share the flow accounting.
:::

## Exercises

::: exercise A natural rate {level=1 check="4"}
Monthly $s = 0.01$ and $f = 0.24$. Compute $u_n$ in per cent. (Enter the percentage, without the per cent sign.)
::: solution
$u_n = 0.01/(0.01+0.24) = 0.04$, or 4 per cent.
:::
:::

::: exercise Duration {level=1 check="4"}
Suppose monthly $f = 0.25$. What is the average duration of an unemployment spell, in months? (Enter the number of months.)
::: solution
Average duration is $1/f = 1/0.25 = 4$ months.
:::
:::

::: exercise A rise in separations {level=1}
Starting from $s=0.01$, $f=0.24$, let $s$ rise to $0.02$. Compute the new $u_n$ and the new duration. Which moved?
::: solution
$u_n = 0.02/0.26 \approx 0.0769$, about 7.7 per cent. Duration is still $1/0.24 \approx 4.17$ months. The natural rate rises because more jobs end each month; spells are no longer. That is the opposite of a pure $f$-shock.
:::
:::

::: exercise Convergence {level=2}
With $s=0.02$ and $f=0.38$, unemployment is currently 9 per cent. Using [[#eq-u-dyn]], compute $u$ next month and the month after. Is the half-life of the gap closer to one month or to six?
::: solution
$u_{t+1} = 0.02 + (1-0.02-0.38)u_t = 0.02 + 0.60 u_t$. From $0.09$: next month $0.02+0.054=0.074$; the month after $0.02+0.0444=0.0644$. The gap to $u_n=0.05$ is $0.04$, then $0.024$, then $0.0144$, shrinking by a factor $0.6$ each month. The half-life satisfies $0.6^t = 1/2$, so $t = \ln 2 / \ln(1/0.6) \approx 0.693/0.511 \approx 1.36$ months — closer to one month than to six. U.S.-like flow rates close a cyclical unemployment gap quickly *if they remain at expansion values*; the recession is a fall in $f$, which both raises $u_n$ temporarily and slows convergence.
:::
:::

::: exercise A minimum wage {level=2}
Labour demand is $L^d = 80 - w$ and labour supply is $L^s = 20 + w$. Compute competitive $(w,L)$. A minimum wage of $40$ is imposed. Compute employment and the unemployment rate among those who wish to work.
::: solution
$80-w=20+w$ gives $w=30$, $L=50$. At $\underline{w}=40$, $L^d=40$, $L^s=60$, employment is $40$, unemployment is $20$, $u=20/60=1/3 \approx 33.3$ per cent.
:::
:::

::: exercise Efficiency wages, qualitative {level=2}
In the Shapiro–Stiglitz model, a rise in unemployment insurance $b$ raises the no-shirking wage at a given $u$. What happens to equilibrium $u_n$? Explain in words, without solving the model.
::: solution
The no-shirking condition is a curve in $(u,w)$ space that shifts up when $b$ rises: at a given $u$, the firm must pay more to keep the worker from shirking, because the consequence of being fired is now milder. Labour demand $w=F_L$ is downward-sloping in $L$, hence upward-sloping in $u$. The intersection moves to a higher $u$ and a higher $w$. Unemployment insurance, in this particular model, raises the natural rate because it weakens unemployment’s disciplinary role. That is a positive claim of the model, not a cost–benefit verdict on a replacement rate.
:::
:::

::: exercise Okun’s law {level=3}
An economy’s natural rate is 5 per cent and Okun’s coefficient is $2$ as in [[#eq-okun]]. If $u=8$ per cent, what is the output gap $(Y-Y_n)/Y_n$? If potential output $Y_n = 1000$, what is $Y$? How much of a rise in $Y$ would be needed to return $u$ to $u_n$, holding the coefficient fixed?
::: hint
$(Y-Y_n)/Y_n = -2(u-u_n)$.
:::
::: solution
$u-u_n=0.03$, so the output gap is $-2\times 0.03 = -0.06$, or $-6$ per cent. $Y = 0.94 \times 1000 = 940$. Returning $u$ to $u_n$ requires a 6 per cent rise relative to $Y_n$, i.e. $Y$ must rise from $940$ to $1000$, an increase of $60$. Cyclical recovery of that size, with $u_n$ fixed, is a demand-side object; if part of the 8 per cent is a higher $u_n$, the arithmetic overstates the demand gap.
:::
:::

::: exercise A three-state afterthought {level=3}
Add a third state, out of the labour force $N$, with a labour force $E+U$ of fixed size no longer assumed. Suppose each period a fraction $p$ of the unemployed leave the labour force and a fraction $q$ of those out of the labour force enter unemployment (nobody moves directly between $E$ and $N$). Does [[#eq-un]] still hold for $u = U/(E+U)$? What happens to measured $u$ if $p$ rises in a recession (discouraged workers)?
::: hint
Write the steady-state flow balances for $E$ and $U$. Measured $u$ conditions on being in the labour force.
:::
::: solution
In steady state, flows into $E$ equal flows out: $f U = s E$, so $U/E = s/f$ and $u = U/(E+U) = s/(s+f)$ still. The third state does not change the formula for $u$ *conditional on a two-way $E$–$U$ flow at rates $s,f$*. It does change the labour force. If $p$ rises, $U$ shrinks as people leave $L$; $E$ is initially unchanged, so measured $u$ *falls* even though the labour-market situation of those who left has not improved. That is the discouraged-worker bias. A rise in $q$ (people entering to search) raises $U$ and measured $u$. Participation is why headline $u$ can move in misleading ways at the start and end of recessions, and why the employment-to-population ratio is a useful companion statistic.
:::
:::
