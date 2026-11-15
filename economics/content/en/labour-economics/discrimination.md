In almost every labour market that has been measured, average wages differ by sex, by race or ethnicity, and often by caste, religion or migrant status. Some of the gap is explained by differences in schooling, experience, occupation and hours — the human capital of [[labour-economics/human-capital]] and the job attributes of [[labour-economics/compensating-differentials]]. Some of it is not. **Discrimination** is the part of a wage or hiring gap that remains when two people who are equally productive in the relevant sense are treated differently because of a group characteristic.

The word is used in two theoretical ways, and they are easy to conflate. **Taste-based** discrimination (Becker 1957) is prejudice: an employer, co-worker or customer is willing to pay a cost not to deal with a group. **Statistical** discrimination (Phelps 1972; Arrow 1973) is the use of a group average as a signal of an individual’s productivity when the individual’s productivity is not observed. The first is a preference; the second is a response to incomplete information, and it can arise among profit-maximising employers with no prejudice. Both can be illegal; both can be persistent; they have different implications for what a policy will do.

This chapter sets out the two models, the Oaxaca–Blinder decomposition of a wage gap, and the audit and correspondence studies that try to catch discrimination in the act. The empirical literature is large, the remaining gaps are not zero, and the share of any given gap that is “discrimination” depends on what the researcher can control for. That last sentence is a limitation of the evidence, not a claim that the unexplained part is therefore fair.

## Taste-based discrimination

Gary Becker’s employer, in *The Economics of Discrimination* (1957), has a utility function that depends on profit and on the composition of the workforce. Hiring a worker from the disliked group costs the employer $w(1 + d)$ in utility, where $d \ge 0$ is a **discrimination coefficient** and $w$ is the wage. The employer hires from that group only if their wage is low enough to compensate for $d$.

::: definition Becker discrimination coefficient {#def-becker}
An employer with **discrimination coefficient** $d$ treats the wage of a worker from group $B$ as $w_B(1 + d)$ when deciding whom to hire. Customer discrimination and co-worker discrimination are defined analogously: customers act as if the price of a $B$ good were higher, co-workers as if their own wage were lower when they work with $B$. A competitive employer with $d = 0$ is unprejudiced.
:::

::: proposition Prejudice and the wage gap under competition {#prop-becker}
If there are enough unprejudiced employers, and groups $A$ and $B$ are perfect substitutes in production, competition drives $w_A = w_B$: prejudiced employers are undercut, make lower profits, and in the long run with free entry are competed out. A wage gap $w_A > w_B$ persists in this model only if prejudiced employers are inframarginal — they are a large enough share of demand that the marginal employer of $B$ still has $d > 0$ — or if entry is blocked. Assumptions: perfect substitutes, no search frictions, employers differ only in $d$.
:::

::: proof
Unprejudiced employers see $A$ and $B$ as the same input and hire whichever is cheaper. If $w_B < w_A$, they hire only $B$, which bids $w_B$ up and $w_A$ down until the gap closes or the supply of $B$ is exhausted. A remaining gap therefore requires that the demand of unprejudiced employers be insufficient to absorb $B$’s supply, so the marginal employer of $B$ has $d > 0$ and $w_B(1+d) = w_A$.
:::

The prediction that competition erodes taste-based employer discrimination is Becker’s most famous result, and it is only as strong as its assumptions. Search frictions (the next chapter but one) give prejudiced employers room to survive. Customer discrimination is not competed away: if customers will not buy from $B$ workers, the firm’s revenue product differs by group even under competition, and a wage gap can persist. Co-worker discrimination can segregate workplaces rather than equalise wages.

::: example A discriminating employer {#ex-becker}
Group $A$ and group $B$ workers are perfect substitutes, $\mathrm{VMP} = 20$ for either. An employer has $d = 0.25$ against $B$. If $w_A = 20$, at what $w_B$ is the employer willing to hire $B$? If unprejudiced employers can hire as many $B$ workers as they wish at that wage, what happens in the long run with free entry?
::: solution
The prejudiced employer hires $B$ only if $w_B(1.25) \le 20$, i.e. $w_B \le 16$. Unprejudiced employers hire $B$ at any $w_B \le 20$ and make a profit of $20 - w_B$ per worker if $w_B < 20$. With free entry they bid $w_B$ up to $20$, and the prejudiced employer either stops hiring $B$ or (if the owner still wants a workforce) operates at a utility loss relative to unprejudiced rivals and is driven out of a competitive market. The wage gap survives only if there are not enough unprejudiced employers to absorb $B$.
:::
:::

## Statistical discrimination

Suppose productivity $q$ is not observed at hiring, but the group mean $\bar q_g$ is, and a noisy signal $s = q + e$ is observed. A profit-maximising employer without prejudice forms $\E(q \mid s, g)$ and pays that (or hires if it exceeds the wage). If $\bar q_B < \bar q_A$, or if $s$ is noisier for $B$, then two people with the same $s$ are treated differently.

::: definition Statistical discrimination {#def-statistical}
**Statistical discrimination** is the use of a group-level moment (a mean, a variance, a reliability of a test) as information about an individual’s productivity, in the absence of a taste for discrimination. It is a consequence of incomplete information, and it can be individually rational for the employer.
:::

::: proposition Same signal, different wages {#prop-statistical}
If $q \mid g \sim \text{distribution with mean }\mu_g$ and the employer observes $s = q + e$ with $e$ independent of $g$, then $\E(q \mid s, g)$ depends on $g$. In the normal-normal case the employer’s posterior mean is a weighted average of $s$ and $\mu_g$, with more weight on $\mu_g$ when $s$ is noisier. Two workers with the same $s$ then receive different expected-productivity assessments if $\mu_A \ne \mu_B$ or if the noise variances differ.
:::

::: proof
Bayes’ rule for normal $q$ and normal $e$ gives $\E(q \mid s, g) = \lambda_g s + (1-\lambda_g)\mu_g$, where $\lambda_g = \tau_q / (\tau_q + \tau_{e,g})$ and $\tau$ denotes precision. The claim follows.
:::

Statistical discrimination can be self-confirming. If employers expect lower $q$ from $B$ and offer lower wages or worse jobs, $B$ workers have less incentive to invest in human capital, which makes the expectation correct (Arrow 1973; Lundberg and Startz 1983). A ban on using group identity in hiring then has two effects: it stops the use of a statistically valid signal, which can lower matching efficiency, and it can break a bad equilibrium in which underinvestment was an equilibrium. Which effect is larger is not a theorem.

::: warning Statistical is not a synonym for fair
Calling discrimination “statistical” describes the employer’s information problem. It does not make the outcome just, and it does not make it legal. A group mean can itself be the product of past taste-based discrimination, of unequal schooling, or of the self-confirming mechanism above. The positive/normative distinction of the content guide applies with particular force here: the model explains a gap; it does not declare the gap acceptable.
:::

::: example A posterior mean {#ex-posterior}
Group $A$ has $\mu_A = 10$, group $B$ has $\mu_B = 8$, and both have the same precision so $\lambda = 0.5$. Two applicants each present $s = 9$. Compute the employer’s posterior mean for each. What wage gap remains at this $s$? What would $\lambda = 1$ (a perfect signal) do?
::: solution
$\E(q \mid s=9, A) = 0.5\cdot 9 + 0.5\cdot 10 = 9.5$ and $\E(q \mid s=9, B) = 0.5\cdot 9 + 0.5\cdot 8 = 8.5$. A gap of $1$ remains at the same signal. If $\lambda = 1$, both posteriors equal $9$ and the gap at given $s$ vanishes (the groups still differ in their distribution of $s$). Better individual information crowds out the group mean. That is the efficiency case for testing, probation and credentials — and it is why a noisy hiring process is a setting in which statistical discrimination has more room.
:::
:::

## Decomposing wage gaps

Let $\bar w_m$ and $\bar w_f$ be mean log wages of two groups (the labels are conventional; the algebra is the same for any pair). Fit $\ln w = X\hat\beta + \hat u$ separately, or in a pooled regression. The **Oaxaca–Blinder decomposition** splits the gap into a part “explained” by differences in $X$ (schooling, experience, occupation, …) and a part “unexplained” by those differences.

::: definition Oaxaca–Blinder decomposition {#def-oaxaca}
Using group $m$ as the reference,

$$
\bar w_m - \bar w_f = \underbrace{\hat\beta_m'(\bar X_m - \bar X_f)}_{\text{explained (endowments)}} + \underbrace{\bar X_f'(\hat\beta_m - \hat\beta_f)}_{\text{unexplained (coefficients)}}.
$$ {#eq-oaxaca}

The unexplained part is the difference in returns to $X$, plus the difference in intercepts. It is *not* a consistent estimator of discrimination: any omitted productivity difference lands in the unexplained part, and any discriminatory exclusion from occupations lands in the explained part if occupation is in $X$.
:::

The second caveat is the **index-number problem** of including occupation and industry. If discrimination operates by crowding a group into worse-paid jobs, controlling for occupation attributes the crowding to “choice” or “skill” and shrinks the unexplained gap. If occupation is a pure skill proxy, not controlling for it inflates the unexplained gap. Honest papers report both.

::: example A numerical decomposition {#ex-oaxaca}
Men’s wages follow $w = 10 + 2s$, women’s $w = 7 + 1.5 s$ (here $w$ is in levels for simplicity). Mean schooling is $\bar s_m = 16$ and $\bar s_f = 14$. Compute the gap, the explained part using male coefficients, and the unexplained part.
::: solution
$\bar w_m = 10 + 32 = 42$, $\bar w_f = 7 + 21 = 28$, gap $= 14$. Explained: $2\times(16-14) = 4$. Unexplained: $(10-7) + 14\times(2-1.5) = 3 + 7 = 10$. Check: $4 + 10 = 14$. Of the \$14 gap, \$4 is the male return applied to the schooling difference, and \$10 is the difference in intercepts and in the return to schooling. Whether that \$10 is discrimination, unobserved skill, or hours is not identified by the arithmetic.
:::
:::

OECD data put the median gender wage gap (the gap in median full-time earnings of men and women) at about 12 per cent in 2022, with a range from under 5 per cent in some Nordic countries to over 20 per cent in Japan and Korea (OECD, *Gender wage gap* indicator, accessed 2026). The US Black–White gap in mean hourly wages among men has been of the order of 20–25 per cent in recent CPS years, smaller after controlling for education and larger if one looks at annual earnings (Blau and Kahn 2017, *Journal of Economic Literature*, on the gender gap; Bayer and Charles 2018, *Quarterly Journal of Economics*, on the Black–White gap). In India, caste and gender gaps in earnings remain large in both urban and rural surveys (NSS and IHDS-based studies); in Brazil, racial gaps persist after schooling controls (PNAD). The unexplained share is typically smaller than the raw gap and typically not zero.

::: widget plot
f: 10+2*x; 7+1.5*x
x: 8, 20
y: 15, 55
labels: \text{men}; \text{women}
caption: The two wage–schooling schedules of [[#ex-oaxaca]]. At $s = 14$ the vertical gap is $7$; at $s = 16$ it is $8$. The Oaxaca split using male coefficients attributes $2\times 2 = 4$ of the mean gap to the difference in mean schooling and the rest to the different intercepts and slopes.
:::

::: example Crowding and the explained share {#ex-crowding}
Group $B$ is paid the same as group $A$ *inside* each occupation, but is crowded into the low-pay occupation. Occupation 1 pays 30, occupation 2 pays 20. Group $A$ is 80 per cent in occupation 1; group $B$ is 20 per cent in occupation 1. Compute the raw gap and the Oaxaca unexplained share if occupation is in $X$, and if it is not (the only $X$ being a constant).
::: solution
$\bar w_A = 0.8\times 30 + 0.2\times 20 = 28$, $\bar w_B = 0.2\times 30 + 0.8\times 20 = 22$, raw gap $= 6$. If occupation is in $X$ and coefficients are the same, the unexplained share is zero: the entire gap is “explained” by occupation. If $X$ is only a constant, the whole gap of 6 is unexplained. Discriminatory crowding is labelled explained or unexplained according to that choice, which is the index-number problem after [[#def-oaxaca]].
:::
:::

::: quiz
Including occupation in an Oaxaca–Blinder decomposition of the gender wage gap will typically
- [ ] raise the unexplained share, because occupation is a channel of discrimination
- [x] lower the unexplained share, because men and women work in different occupations
- [ ] leave both shares unchanged, because occupation is uncorrelated with wages
- [ ] make the explained share negative
::: solution
Occupation is strongly correlated with both sex and pay. Putting it in $X$ moves the occupational part of the gap from unexplained to explained. That is descriptively true and interpretatively ambiguous, which is why both specifications are reported.
:::
:::

## Audit and correspondence studies

Decompositions are silent on *hiring*. Audit studies send matched applicants, differing in a group characteristic, to real jobs. Correspondence studies do the same with CVs.

Bertrand and Mullainathan (2004, *American Economic Review*) sent CVs with White-sounding and African-American-sounding names to employers in Boston and Chicago. White-sounding names received about 50 per cent more callbacks. The gap was not explained by the quality of the CV in an interaction that would have suggested statistical discrimination of a simple kind: better CVs helped White-sounding names more. Neumark, Bank and Van Nort (1996) audited restaurant hiring by sex; Goldin and Rouse (2000, *American Economic Review*) found that blind auditions raised the chance that women were hired by orchestras — a rare, convincing demonstration that hiding the group characteristic changes outcomes.

Correspondence studies have since been run in many countries. A recent meta-analysis by Quillian, Pager, Hexel and Midtbøen (2017, *Proceedings of the National Academy of Sciences*) finds persistent racial callback gaps in the US, with little decline over decades. In France, Germany, Sweden and the UK, studies using names associated with immigrant origin find callback penalties of a similar order. In India, Thorat and Attewell (2007) and subsequent papers find caste and religious penalties in urban hiring. The method has limits: callbacks are not jobs, fictitious applicants cannot be followed to wages, and the names may signal social class as well as race or religion. Combined with the wage decompositions, they make a strong case that unequal treatment at hiring is part of the story, without quantifying how much of the *wage* gap it accounts for.

A different design randomises the information employers have. Autor and Scarborough (2008, *Quarterly Journal of Economics*) studied a retailer that introduced job-testing: the test reduced the racial gap in hiring without reducing the quality of hires, consistent with statistical discrimination that a better individual signal can undo. That is [[#prop-statistical]] in the field.

::: intuition Taste, statistics and what a callback gap means
A callback gap is evidence of unequal treatment. It does not, by itself, say whether the treatment is a taste or a statistic. If the gap is larger when the CV is sparse (little individual information) and smaller when the CV is rich, statistical discrimination is more plausible. If the gap is larger when the job involves customer contact, customer taste is more plausible. Bertrand and Mullainathan’s finding that a better CV did *not* close the racial gap is harder to tell as simple statistical discrimination, and easier to tell as a taste or as a statistic that does not respond to the information on a CV.
:::

## Evidence on gaps, and what has closed

Blau and Kahn (2017) document that the US gender gap in hourly wages narrowed substantially from the 1970s to about 2000, as women’s schooling overtook men’s and experience gaps shrank, and that convergence then slowed. Occupation and industry remain large explained components; the unexplained component has also fallen but not to zero. Goldin (2014, *American Economic Review*) emphasises hours flexibility: in some high-pay occupations the wage–hours gradient is convex, so that a parent who needs a shorter or more predictable week pays a disproportionate penalty. That is a compensating-differential story and a discrimination story at once, depending on whether the convexity is technological or organisational.

Racial gaps in the US have a different history: a narrowing in the 1960s and 1970s, coinciding with the Civil Rights Act and with a rise in Black educational attainment, then a much slower change, with cohort and regional variation (Bayer and Charles 2018). Residual gaps after education and experience are larger for men than the corresponding gender residual, and they interact with incarceration and with labour-force withdrawal, which a wage regression on employed people does not capture.

Policy instruments include equal-pay and anti-discrimination law, anonymised screening, quotas (as in some European boards and in Indian public-sector reservations), and family policy that changes the hours constraint. The labour-economics question is always the same: which gap, which margin (hiring, pay, promotion, occupation), and which alternative explanation has been ruled out. This chapter does not rank those instruments.

::: history
Becker’s *The Economics of Discrimination* (1957) is the taste-based theory. Phelps, “The Statistical Theory of Racism and Sexism” (*American Economic Review*, 1972), and Arrow’s essay in *Discrimination in Labor Markets* (1973) are the statistical theory. Oaxaca (1973) and Blinder (1973) introduced the decomposition; it is now standard in every statistical package. The field experiment literature on hiring is often dated from the 1970s audit studies, with Bertrand and Mullainathan (2004) as the canonical correspondence study. Goldin and Rouse (2000) on orchestras remains the cleanest demonstration that hiding a group characteristic can change hiring.
:::

## Where this leads

Wage gaps that remain after human capital and compensating differentials are an input to [[labour-economics/wage-inequality]]: the inequality between groups is part of the inequality of the distribution. Search models ([[labour-economics/search-and-unemployment]]) give taste-based discrimination a place to survive, because a prejudiced employer is not instantly undercut. Personnel policies that change the signal employers see — tests, probation, anonymised CVs — are a practical counterpart of [[#prop-statistical]] and of [[information-economics/screening]].

::: summary
- Taste-based discrimination is a prejudice $d$; competition erodes it among employers only if unprejudiced firms can absorb the discriminated group ([[#def-becker]], [[#prop-becker]]).
- Statistical discrimination uses a group moment as a signal; it can be self-confirming, and better individual information crowds it out ([[#def-statistical]], [[#prop-statistical]]).
- The Oaxaca–Blinder split ([[#def-oaxaca]]) is a description of a gap, not a consistent estimate of discrimination. Occupation in $X$ is the main interpretative choice.
- Correspondence studies find persistent callback gaps by race and immigrant origin in many countries. They measure hiring, not wages.
- Gender and racial gaps have narrowed in some countries and periods and not in others; residual gaps are not zero. Quote the outcome (hourly wage, annual earnings, callbacks) and the controls.
:::

## Exercises

::: exercise A discrimination coefficient {level=1 check="16"}
An employer with $d = 0.25$ and $\mathrm{VMP} = 20$ for either group will hire $B$ only at a wage no higher than what? (Enter that wage.)
::: solution
$w_B(1.25) \le 20$ gives $w_B \le 16$, as in [[#ex-becker]].
:::
:::

::: exercise A posterior {level=1 check="8.5"}
As in [[#ex-posterior]], $\mu_B = 8$, $\lambda = 0.5$, $s = 9$. Compute $\E(q \mid s, B)$. (Enter the posterior mean.)
::: solution
$0.5\times 9 + 0.5\times 8 = 8.5$.
:::
:::

::: exercise Oaxaca arithmetic {level=1 check="4"}
In [[#ex-oaxaca]], the explained part of the gap (male coefficients) is what? (Enter the explained part.)
::: solution
$2\times(16-14) = 4$.
:::
:::

::: exercise Competition and prejudice {level=2}
State Becker’s long-run prediction for a competitive industry with free entry and some prejudiced employers, when $A$ and $B$ are perfect substitutes. Give one reason the prediction can fail.
::: solution
Unprejudiced employers hire the cheaper group and, with free entry, bid wages to equality; prejudiced employers earn less and exit. The prediction fails if unprejudiced capital cannot absorb $B$, if customers are prejudiced, if search frictions protect prejudiced employers, or if the groups are not perfect substitutes.
:::
:::

::: exercise Occupation in the decomposition {level=2}
Why might a researcher report an Oaxaca–Blinder decomposition both with and without occupation dummies? What happens to the unexplained gap when occupation is added, typically, and what is the interpretative cost?
::: solution
Occupation is a control and a channel. Adding it typically shrinks the unexplained gap (men and women, or Black and White workers, are in different occupations). The cost is that discriminatory crowding into occupations is then labelled “explained”. Reporting both lets the reader see the occupational channel.
:::
:::

::: exercise Correspondence versus wages {level=2}
Bertrand and Mullainathan (2004) find a callback gap of about 50 per cent. Why does that number not tell you the share of the Black–White *wage* gap that is discrimination at hiring?
::: solution
A callback is not a job, a job is not a wage, and the fictitious applicants are not the same as the employed samples in wage regressions. The study identifies unequal treatment at one stage for one kind of CV. The wage gap also reflects schooling, occupation, hours, promotion, and labour-force participation. The 50 per cent is evidence of discrimination in callbacks; it is not a share of $\bar w_A - \bar w_B$.
:::
:::

::: exercise Self-confirming expectations {level=3}
Sketch Arrow’s self-confirming mechanism: employers believe $B$ workers invest less in skill, offer them lower wages or worse jobs, and $B$ workers then invest less. What is the role of a hiring test that measures individual skill more accurately?
::: hint
Connect the investment decision to [[labour-economics/human-capital]] and the test to [[#prop-statistical]].
:::
::: solution
If the return to human capital is lower for $B$ because employers discount $B$ credentials, the NPV of schooling and training is lower, so $s_B$ falls, and the employers’ belief is confirmed. A more accurate test raises $\lambda$ in [[#prop-statistical]], so individual $s$ crowds out $\mu_g$. That raises the return to investment for high-$q$ $B$ workers, which can break the bad equilibrium. Autor and Scarborough (2008) is the empirical counterpart: a test reduced a racial hiring gap without reducing hire quality.
:::
:::

::: exercise Blind auditions {level=3}
Goldin and Rouse (2000) find that screens that hid the identity of orchestra applicants raised women’s chance of being hired. Is this evidence of taste-based or of statistical discrimination, or can one not tell? What assumption about the screen is needed?
::: solution
The screen removes the group characteristic and nothing else (if it works). A change in hiring then shows that the characteristic was being used. Whether it was used as a taste or as a statistic is not identified: juries might have disliked women, or they might have used sex as a signal of (for example) strength or of past representation. The assumption needed is that the screen does not change the quality of the information *other than* identity (it should not muffle the music, and it should not change who applies in a way that is the only source of the effect). Goldin and Rouse discuss these issues; the result is still among the cleanest in the literature.
:::
:::

::: exercise Customer discrimination {level=2}
A shop’s customers prefer to be served by group $A$. In Becker’s framework, is this competed away by unprejudiced shop owners? What happens to the wages of $A$ and $B$ in sales jobs, and in back-office jobs at the same shop?
::: solution
Customer taste is a difference in $\mathrm{MRP}$, not only in the employer’s utility. Unprejudiced owners still earn more from assigning $A$ to customer contact. $A$ wages in sales are bid up; $B$ workers are assigned to the back office or are hired only at a discount in sales. In jobs with no customer contact the customer-taste gap need not appear. The prediction is segregation by task more than a uniform wage gap, and it is not competed away.
:::
:::
