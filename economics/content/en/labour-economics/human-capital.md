A year of extra schooling is associated, in almost every country that has been studied, with higher earnings. Montenegro and Patrinos (2021, World Bank Policy Research Working Paper) put the average private return at about $9$–$10$ per cent per year of schooling in a large multi-country sample, with higher returns in low- and middle-income countries than in high-income ones, and higher returns to tertiary schooling than to primary in recent decades. That number is among the most cited in economics, and it is not a causal estimate. People who stay in school longer differ in ability, in family background, in patience and in the quality of the schools they attend. Separating the effect of schooling from the effect of those confounders is the empirical core of the human-capital literature, and it is still not settled.

Two theories compete to explain why schooling raises wages. In the **human-capital** model of Becker (1964) and Mincer (1958, 1974), school produces skills that raise productivity, and the wage pays for those skills. In the **signalling** model of Spence (1973), school need produce nothing: it is a costly signal of a productivity the person already had. Both models generate a wage–schooling gradient. They disagree about whether expanding education raises output or merely reshuffles who gets the good jobs, and the evidence that distinguishes them is thinner than the evidence that a gradient exists.

This chapter sets out the schooling decision, the Mincer earnings function, the signalling alternative, and the main identification strategies — ability controls, twins, compulsory-schooling instruments, and the rest — with the assumptions of each stated. Instrumental variables are used as in [[econometrics/instrumental-variables]]; the labour-market setting is [[labour-economics/labour-market-equilibrium]].

## The schooling decision

A person lives two periods. In period 1 she can work, earning $w_0$, or attend school at a direct cost $C$ (fees, books) and forgo $w_0$. In period 2 she earns $w_1(s)$ if she went to school and $w_1(0)$ if she did not. The real interest rate is $r$. There is no uncertainty in this first pass.

::: definition Net present value of schooling {#def-npv}
The **net present value** of attending school, relative to working in both periods, is

$$
\mathrm{NPV} = -C - w_0 + \frac{w_1(s) - w_1(0)}{1+r}.
$$ {#eq-npv}

The person attends if $\mathrm{NPV} \ge 0$. Equivalently, the internal rate of return $\rho$ defined by $C + w_0 = \bigl(w_1(s) - w_1(0)\bigr)/(1+\rho)$ is at least $r$.
:::

The same logic extends to a choice of *years* $s \in \{0, 1, \dots, S\}$. Each extra year has a marginal cost (another year of forgone earnings, plus fees) and a marginal benefit (a higher lifetime earnings path). The person chooses $s$ to maximise the present value of earnings net of costs. Ability, access to credit, and the quality of schools all shift that calculation. A credit constraint that prevents borrowing against future earnings can stop a high-$\rho$ investment from being made; whether such constraints bind in rich countries is disputed, and they are more plausible in low-income settings where fees are large relative to household income.

::: proposition Optimal years of schooling {#prop-optimal-s}
If earnings after $s$ years are $w(s)$ in every subsequent year, the working life is long, and the only cost of a year of school is forgone earnings $w(s)$, the interior optimum satisfies

$$
\frac{w'(s)}{w(s)} = r.
$$ {#eq-opt-s}

The left-hand side is the proportional return to an extra year. The person stays in school until that return equals the interest rate. Assumptions: no direct costs, no non-wage benefits of school, infinite horizon (or a long finite one), and a differentiable $w(s)$.
:::

::: proof
The present value of attending $s$ years and then earning $w(s)$ forever is $-$ (forgone $w$ during school, which itself depends on the path) $+$ $w(s)/r$ discounted. In the standard continuous-time simplification, $\max_s e^{-r s} w(s)/r$, whose first-order condition is $-r w(s) + w'(s) = 0$.
:::

::: example A two-period investment {#ex-npv}
School costs $C = 4$ in fees and $w_0 = 16$ in forgone earnings. With school, period-2 earnings are $28$; without school they are $16$. The interest rate is $r = 0.08$. Should the person attend? What is $\rho$?
::: solution
$\mathrm{NPV} = -4 - 16 + (28-16)/1.08 = -20 + 12/1.08 \approx -20 + 11.11 = -8.89 < 0$. She should not attend. The internal return solves $20 = 12/(1+\rho)$, so $1+\rho = 0.6$, which is impossible (the extra earnings never recoup the cost even at a zero discount rate in a *single* period-2 year). If instead period 2 stands for a whole working life of extra earnings, say a present-value gain of $40$ rather than $12$, then $\mathrm{NPV} = -20 + 40/1.08 \approx 17 > 0$ and $\rho = 40/20 - 1 = 1$, or $100$ per cent — a badly calibrated illustration, but the right comparison. The empirically relevant $\rho$ is of the order of $0.08$–$0.12$ per *year* of school, which compounds over a working life.
:::
:::

On-the-job training is the same investment after school. Becker distinguished **general** training, which raises productivity at many firms, from **specific** training, which raises it only here. A competitive firm will not pay for general training: the worker can leave and take the higher wage with her. The worker pays, by accepting a lower wage during training. Specific training is paid for jointly, because neither side captures the whole return if the match breaks. That prediction — that trainees receive lower wages, and that quits are costly when training is specific — organises a large empirical literature on apprenticeships and on firm-sponsored training.

## The Mincer earnings function

Jacob Mincer’s empirical equation is the workhorse.

::: definition Mincer equation {#def-mincer}
The **Mincer earnings function** is

$$
\ln w = \alpha + \rho s + \beta_1 x + \beta_2 x^2 + u,
$$ {#eq-mincer}

where $s$ is years of schooling, $x$ is years of potential experience (age minus $s$ minus the school-starting age), and $u$ is unobserved. Under the assumptions of [[#prop-optimal-s]] plus a log-linear $w(s)$, the coefficient $\rho$ is the return to a year of schooling. The quadratic in experience captures a concave profile of on-the-job investment.
:::

The equation is not a theorem about the world. It is a regression. If $u$ contains ability that is correlated with $s$, OLS $\hat\rho$ is a mixture of the return to school and the return to ability. That is the **ability bias** that every subsequent estimator tries to undo. If ability raises wages and also raises schooling, OLS is biased up. If the more able leave school earlier because their forgone earnings are high, the bias can go the other way. Card (1999, *Handbook of Labor Economics*) concluded that the net OLS bias is often small, and that IV estimates using compulsory-schooling laws and school-access instruments are typically *larger* than OLS, not smaller — the opposite of the simplest ability-bias story, and consistent with a return that is larger for the credit-constrained students those instruments move.

::: example Reading a Mincer regression {#ex-mincer}
Suppose the fitted equation is $\ln w = 2.00 + 0.09 s + 0.03 x - 0.0005 x^2$. For a person with $s = 16$ and $x = 10$, compute the predicted wage. What is the predicted proportional effect of one extra year of school, holding experience fixed? Why is “holding experience fixed” not the same as “being one year older”?
::: solution
$\ln w = 2.00 + 0.09\times 16 + 0.03\times 10 - 0.0005\times 100 = 2 + 1.44 + 0.30 - 0.05 = 3.69$, so $w = e^{3.69} \approx 40.04$. An extra year of school at fixed $x$ raises $\ln w$ by $0.09$, about $9.4$ per cent ($e^{0.09}-1$). But a person who stays in school one more year also has one less year of experience at a given age, so the total effect at a given age is $\rho - \beta_1 - 2\beta_2 x = 0.09 - 0.03 - 0.01 = 0.05$, about $5$ per cent, at $x = 10$. Which object one wants depends on the question: $\rho$ is the ceteris-paribus return to $s$; the age-held-fixed effect is what a cohort comparison at age $30$ would show.
:::
:::

::: widget plot
f: 2.00+0.09*s+0.03*x-0.0005*x*x
x: 0, 40
sliders: s=12:0:20:1
labels: \ln w
caption: Predicted $\ln w$ against experience $x$ from [[#eq-mincer]] with $\rho = 0.09$. Move years of schooling $s$. The profile is concave; the vertical shift is $\rho$ per extra year. The slider does not identify $\rho$ from data — it only draws the fitted surface.
:::

## Human capital versus signalling

Michael Spence’s 1973 model (*Quarterly Journal of Economics*) starts from a different premise: schooling does not raise productivity. Productivity is of two types, high and low, known to the worker and not to the firm. School is more costly for the low type (in effort, or in the extra years needed to finish). Firms pay wages equal to expected productivity given the observed $s$. A **separating equilibrium** exists in which the high type acquires a diploma and the low type does not, and wages reflect true productivity, even though the diploma taught nothing. A **pooling equilibrium** can also exist, in which nobody signals and the wage is the average.

::: proposition Signalling and the social return {#prop-signalling}
In the human-capital model, the private return $\rho$ equals the social return (the rise in output) if wages equal marginal products and there are no externalities. In a pure signalling model, the social return to a year of school that does not raise productivity is zero, while the private return is positive in a separating equilibrium. Assumptions: the statement about signalling is for the pure case; mixed models, in which school both raises productivity and signals, produce a social return between zero and $\rho$.
:::

The distinction matters for policy. Subsidising tuition is an investment in output if Becker is right, and a subsidy to a rat race if Spence is right. Reality is mixed: some of what is learned in engineering or nursing is clearly productive; some of what is learned in a degree that is used only as a filter may not be. Distinguishing the two is hard because they are observationally similar in a wage regression.

Several tests have been tried. Sheepskin effects — discrete wage jumps at diploma years (12, 16) on top of a linear years-of-schooling term — are consistent with signalling (the diploma is the signal) but also with human capital that is certified in lumps. Clark and Martorell (2014, *Journal of Political Economy*) compared students who barely passed and barely failed a high-school exit exam in Texas and found little wage difference, evidence against a pure sheepskin at that margin. The rise in the return to college in the US since 1980 is easier to tell as a rise in the demand for skill (Becker) than as a rise in the signalling value of a degree, though the two can be combined. Over-education — people holding jobs that do not use their formal training — is sometimes cited for signalling, but it is also what one expects if skill is heterogeneous and matching is imperfect.

::: example General training and the wage path {#ex-training}
A worker’s productivity is 20 today. A one-period general-training course raises it to 24 from next period on. The market wage equals productivity, and the firm cannot recoup a training outlay of 3 from a worker who can leave. Who pays the 3, and what wage is paid during training?
::: solution
The trained wage will be 24 at every firm, so this firm cannot pay less than 24 after training and still keep the worker. It will not pay the 3. The worker pays, by receiving 20 − 3 = 17 during the training period (or by paying the fee directly). After training the wage is 24. The present-value calculation is the same as [[#def-npv]], with the “school” being the course.
:::
:::

::: warning $\hat\rho$ is not a rate of return you can bank
The Mincer coefficient is a percentage wage gap associated with a year of school, not a guaranteed personal return and not investment advice. It ignores tuition, taxes, unemployment risk, non-wage benefits of school, and the option value of dropping out. It is an average (or a local average, under IV) over the people and the years in the sample. Using it to decide whether *you* should take a particular course of study would be a misuse of the number, and this atlas does not offer that advice.
:::

::: quiz
In a pure signalling model with a separating equilibrium, a subsidy that induces the low-productivity type to acquire the same diploma as the high type would
- [ ] raise output, because education is productive
- [x] destroy the signal, pooling the types, and would not raise productivity
- [ ] raise the private return $\rho$ for everyone
- [ ] have no effect, because firms already pay marginal products
::: solution
The diploma was informative because the low type did not acquire it. If both types acquire it, firms can no longer screen and pay the average product. Output is unchanged if school is unproductive. The private return to signalling falls because the signal no longer separates.
:::
:::

## Estimating the return to education

OLS on [[#eq-mincer]] is the starting point. The threats are ability bias, measurement error in $s$ (which biases $\hat\rho$ toward zero), and the fact that $s$ is a choice. The main responses are as follows.

**Controls and twins.** Adding test scores (AFQT in the NLSY) typically cuts $\hat\rho$ a little, not to zero. Ashenfelter and Krueger (1994, *American Economic Review*) used identical twins, differencing out the family and (they hoped) the genetic component of ability, and found returns *above* OLS once they instrumented one twin’s report of the other’s schooling to undo measurement error. Later twin studies have found a range, often $0.05$–$0.10$ per year.

**Instrumental variables.** Angrist and Krueger (1991, *Quarterly Journal of Economics*) used quarter of birth, interacting with compulsory-schooling laws that let people leave school on their birthday: those born early in the year could leave with less schooling. The IV estimates were close to OLS, around $0.07$–$0.10$. The instrument is weak and has been criticised (Bound, Jaeger and Baker 1995). Card’s (1995) use of college proximity, and Oreopoulos’s (2006, *American Economic Review*) use of a large raising of the school-leaving age in the UK, found IV estimates larger than OLS — $0.10$–$0.15$ in Oreopoulos’s case. Under the LATE interpretation of [[econometrics/instrumental-variables]], these estimates apply to the people whose schooling the instrument moved, often students who would otherwise have left at the legal minimum, for whom the return may exceed the average.

**Regression discontinuity.** Several papers use exam score cut-offs for admission to more selective schools. The estimates vary by country and by the quality gap at the cut-off; some find substantial returns to selectivity, others find little.

A working consensus, not a theorem, is that the causal private return to a year of schooling in rich countries is typically in the range $0.06$–$0.12$, with OLS not wildly wrong, IV often a bit higher, and substantial heterogeneity — larger returns for people constrained at low $s$, and larger returns to some fields of study than to others. In low- and middle-income countries the OLS numbers are often higher (Montenegro and Patrinos 2021), and the causal evidence is thinner but points in the same direction (Duflo 2001, *Econometrica*, on a large school-building programme in Indonesia, is the classic IV, with returns around $0.07$–$0.11$ for the affected cohorts).

::: example A simple IV in numbers {#ex-iv}
In a sample, the first-stage regression of $s$ on a binary instrument $z$ (for example, living near a college) gives $\hat s = 12.0 + 0.8 z$. The reduced form for log wages is $\widehat{\ln w} = 2.40 + 0.10 z$. Compute the Wald IV estimate of $\rho$. What assumption makes this a causal return for the compliers?
::: solution
The Wald estimator is $\hat\rho_{\mathrm{IV}} = 0.10 / 0.8 = 0.125$. Identification requires that $z$ affect wages only through $s$ (exclusion), that $z$ be as good as randomly assigned, that the first stage be real, and that there be no defiers (monotonicity) if one wants a LATE. If people who live near a college also enjoy a better local labour market, exclusion fails and $0.125$ is not a return to schooling.
:::
:::

::: intuition Why IV can exceed OLS
If the instrument moves people with *above-average* returns — credit-constrained students who would have left school despite a high $\rho$ — LATE exceeds the average treatment effect that OLS is trying, and failing, to estimate. That is Card’s (1999, 2001) reading of the pattern IV $>$ OLS. It is not a contradiction of ability bias; it is a statement that the two biases (ability, and discount-rate heterogeneity) need not have the same sign, and that IV does not estimate the same parameter as OLS.
:::

## Evidence beyond the Mincer coefficient

Schooling is not the only human capital. Early-childhood programmes (the Perry Preschool and Abecedarian experiments in the US; more recent work by Heckman and by Attanasio, Cattan and others in Latin America) find long-run earnings and crime effects that a year-of-schooling coefficient would miss, because the treatment is not a year of school. Health is human capital: Bleakley (2007, *Quarterly Journal of Economics*) on hookworm eradication in the American South, and Miguel and Kremer (2004, *Econometrica*) on deworming in Kenya, find schooling and later-life effects of health interventions. Experience and job tenure raise wages, as the $x$ terms in [[#eq-mincer]] record, but the causal effect of an extra year of experience is not $\beta_1 + 2\beta_2 x$ if experience is a choice and if high-wage people work more.

The **college wage premium** in the US — the gap in mean log wages between workers with a college degree and workers with a high-school degree — rose from about $0.3$ in 1980 to about $0.6$ in the early 2000s and has been roughly stable since (Autor 2014, *Science*; ACS and CPS tabulations). That rise is a central fact of [[labour-economics/wage-inequality]]. It can be told as a rise in $\rho$ caused by skill-biased technical change, or as a rise in the signalling value of a degree as more people hold one — but the second story has to explain why firms would pay more for a more common signal. The demand-for-skill account is the standard one.

Returns differ by field. In the US and the UK, engineering, computer science, economics and some health fields have higher average earnings than arts and some humanities, after controlling for selection as well as the data allow (Altonji, Blom and Meghir 2012, *Annual Review of Economics*). That is what a human-capital model predicts if fields produce different skills, and what a signalling model predicts if fields differ in difficulty. It is also not career advice.

::: history
The idea that education is an investment is in Smith (1776). The modern theory is Gary Becker’s *Human Capital* (1964) and Jacob Mincer’s “Investment in Human Capital and Personal Income Distribution” (*Journal of Political Economy*, 1958) and *Schooling, Experience, and Earnings* (1974). Spence’s “Job Market Signaling” (1973) is the alternative. The IV literature begins in earnest with Angrist and Krueger (1991) on quarter of birth and with Card (1995) on college proximity. Duflo (2001) took the same idea to a large developing-country school-construction programme. The LATE reading of these estimates is Imbens and Angrist (1994), applied to schooling by Card (1999).
:::

## Where this leads

Schooling is one reason wages differ. Jobs also differ in risk and amenities ([[labour-economics/compensating-differentials]]), and groups differ in how they are treated ([[labour-economics/discrimination]]). The rise in the return to skill is the main ingredient of [[labour-economics/wage-inequality]]. Signalling is treated more formally in [[information-economics/job-market-signalling]]. The same investment logic, applied to health and to children, is a large part of [[development-economics]] and of the education chapters of public economics.

::: summary
- Schooling is an investment: attend if the NPV is positive, or until $w'(s)/w(s) = r$ ([[#def-npv]], [[#prop-optimal-s]]).
- The Mincer equation $\ln w = \alpha + \rho s + \beta_1 x + \beta_2 x^2 + u$ is the empirical workhorse ([[#def-mincer]]). OLS $\hat\rho$ is not automatically causal.
- Pure signalling ([[#prop-signalling]]) can produce a private return with no social return. Mixed models are more plausible than either pure case.
- Causal estimates in rich countries typically put $\rho$ in the range $0.06$–$0.12$ per year, with IV often above OLS. Quote the population the instrument moves.
- The college premium has risen since 1980 in the US; returns vary by field and by country. None of these numbers is investment or career advice.
:::

## Exercises

::: exercise A two-period NPV {level=1 check="5"}
School costs $C = 10$ in fees and $w_0 = 20$ in forgone earnings. Period-2 extra earnings are $42$. At $r = 0.20$, compute the NPV of attending. (Enter the NPV.)
::: solution
$\mathrm{NPV} = -10 - 20 + 42/1.20 = -30 + 35 = 5$. The person attends.
:::
:::

::: exercise Mincer prediction {level=1 check="3.69"}
Using $\ln w = 2.00 + 0.09 s + 0.03 x - 0.0005 x^2$ as in [[#ex-mincer]], compute predicted $\ln w$ at $s = 16$, $x = 10$. (Enter $\ln w$ to two decimals.)
::: solution
$2.00 + 0.09\times 16 + 0.03\times 10 - 0.0005\times 100 = 2.00 + 1.44 + 0.30 - 0.05 = 3.69$. The implied wage is $e^{3.69} \approx 40$.
:::
:::

::: exercise Ability bias, sign {level=1}
If ability raises both schooling and wages, and the Mincer regression omits ability, is OLS $\hat\rho$ biased up or down? Name the econometric problem.
::: solution
Omitted-variable bias, upward: $\mathrm{Cov}(s, \text{ability}) > 0$ and the ability coefficient in the wage equation is positive, so $\hat\rho$ overstates the return to school. (Measurement error in $s$ pulls the other way.)
:::
:::

::: exercise A Wald estimator {level=2 check="0.1"}
The first stage is $\Delta s / \Delta z = 1.2$ and the reduced form is $\Delta \ln w / \Delta z = 0.12$. Compute $\hat\rho_{\mathrm{IV}}$. (Enter the estimate.)
::: solution
$0.12 / 1.2 = 0.10$.
:::
:::

::: exercise Holding experience fixed {level=2}
In [[#ex-mincer]], compute the effect of an extra year of school on $\ln w$ at a *given age* (so $x$ falls by one when $s$ rises by one), evaluated at $x = 10$. Compare it with $\rho = 0.09$.
::: solution
The total derivative at given age is $\rho - \beta_1 - 2\beta_2 x = 0.09 - 0.03 - 0.001\times 10 = 0.05$. (Here $2\beta_2 = -0.001$ because $\beta_2 = -0.0005$.) About $5$ per cent, against $9$ per cent at fixed experience. The difference is the forgone experience.
:::
:::

::: exercise General versus specific training {level=2}
A firm is considering paying for a course that raises a worker’s productivity by the same amount at every firm in the city. In Becker’s theory, who pays for the course, and how? What would differ if the course were useful only at this firm?
::: solution
The course is general training. The firm will not pay, because the worker can leave and collect the higher wage elsewhere. The worker pays by accepting a wage below current productivity during the course. If the training were specific, the firm and the worker would share the cost and the return, because neither can capture the whole surplus if the match ends.
:::
:::

::: exercise LATE versus ATE {level=3}
Oreopoulos (2006) uses a raising of the UK school-leaving age and finds IV estimates of $\rho$ above OLS. Interpret the IV estimate as a LATE. Who are the compliers, and why might their return exceed the average return in the population?
::: hint
Compliers are the students who stay the extra year because of the law and who would have left without it.
:::
::: solution
Compliers are students on the margin of leaving at the old legal age. They are not the students who would have stayed through university anyway. If those marginal students were credit-constrained, or had previously underestimated the return, their $\rho$ can exceed the population average. LATE $>$ OLS is then not a paradox: the two estimators apply to different people, and ability bias in OLS can coexist with a high return for compliers.
:::
:::

::: exercise Signalling and a subsidy {level=3}
In a pure Spence separating equilibrium, high types acquire $s = s_H$ and low types acquire $s = 0$. A government subsidy now makes $s_H$ cheap enough that low types also acquire it. What happens to output, to the wage of high types, and to the private return to $s_H$? Contrast this with the same subsidy in a pure human-capital model.
::: solution
Under pure signalling, output does not change (school is unproductive) but the signal is destroyed: firms pay the pooled wage, high types lose the premium they had, and the private return to $s_H$ falls. The subsidy is a social waste plus a redistribution. Under pure human capital, the subsidy induces extra productive schooling, raises output, and the social return is the extra product (net of the resource cost of school). The two models give opposite policy conclusions for the same instrument; mixed models give a social return between zero and the private $\rho$.
:::
:::

::: exercise A Mincer coefficient and tuition {level=3}
A researcher estimates $\hat\rho = 0.08$ and concludes that “college pays 8 per cent a year”. Give two reasons this need not equal the private internal rate of return to a particular degree, even if $\hat\rho$ is causal.
::: solution
The Mincer $\rho$ holds other regressors fixed and ignores tuition and fees (the $C$ in [[#eq-npv]]), taxes on the extra earnings, the risk of not finishing, and non-wage benefits or costs of school. It is also an average over fields, institutions and people, whereas a particular degree has its own path. Even a causal $\hat\rho$ of $0.08$ is a log-wage gap per year of $s$, not an IRR that subtracts the direct costs. This atlas does not treat that gap as a personal investment recommendation.
:::
:::
