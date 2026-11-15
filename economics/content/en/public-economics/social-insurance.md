A worker who loses a job, a person who becomes disabled, a household that faces a hospital bill: each is a risk that a complete insurance market would pool. Complete markets are not what we observe. People who know they are likely to claim buy more cover (**adverse selection**); people who are covered take less care or search less hard (**moral hazard**); and some risks — a long career of low earnings, a macroeconomic slump — are not independently distributed, so private insurers cannot diversify them. Governments in every high-income country, and increasingly in middle-income countries, run unemployment, disability, health and old-age insurance anyway. This chapter asks why, using the expected-utility apparatus of [[microeconomics/uncertainty]], and what the trade-off with incentives looks like.

The analysis is positive when it describes how a market unravels or how a benefit lengthens unemployment spells. It becomes normative when it ranks a public mandate against no insurance, which requires a social welfare function and a view of which constraints (hidden types, hidden actions, fiscal cost) are real. We will not treat social insurance as a savings product or recommend a pension; the course is for education only, not financial advice.

## Demand for insurance, in one page

A risk-averse expected-utility maximiser with wealth $w$, facing a loss $L$ with probability $p$, can buy cover $b$ at a premium $qb$. Fair insurance has $q=p$.

::: proposition Full cover at a fair price {#prop-full-cover}
If $u$ is strictly concave (risk aversion), $0<p<1$, and insurance is actuarially fair ($q=p$) and unlimited, the unique optimum is $b^*=L$: full cover. The person equalises wealth in the two states.
:::
::: proof
Expected utility is $(1-p)u(w-qb)+p\,u(w-qb-L+b)$. With $q=p$ this is $(1-p)u(w-pb)+p\,u(w-pb-L+b)$. Differentiating in $b$ and setting to zero:

$$
-p(1-p)u'(c_n) + p(1-p)u'(c_L) = 0 \implies u'(c_n)=u'(c_L),
$$

where $c_n=w-pb$ and $c_L=w-pb-L+b$. Strict concavity makes $u'$ strictly decreasing, so $c_n=c_L$, hence $b=L$. The second-order condition holds by $u''<0$.
:::

If the premium is loaded ($q>p$), cover is partial: $c_n > c_L$. That is Mossin's (1968) theorem. Social insurance that is mandatory and roughly fair can therefore raise expected utility even when a loaded private policy would be refused. The rest of the chapter is about why the private policy *is* loaded, or is not offered, or is offered only to the wrong people.

::: example Logarithmic risk aversion {#ex-log-ins}
Wealth $w=100$, loss $L=40$ with $p=0.2$, $u=\ln c$. Compute expected utility with no insurance, with fair full cover, and the risk premium of the uninsured lottery.
::: solution
No insurance: $0.8\ln 100 + 0.2\ln 60 \approx 4.5030$. Fair full cover: premium $8$, certain $92$, $\ln 92 \approx 4.5218$. Certainty equivalent of the uninsured lottery: $\mathrm{CE}=\exp(4.5030)\approx 90.29$. Expected wealth is $92$, so the risk premium is $92-90.29\approx 1.71$. Fair insurance captures that $1.71$ of surplus (and the insurer breaks even). A load of, say, $2$ on the premium would wipe out most of the gain: certain wealth $90$, $\ln 90\approx 4.4998$, slightly *below* the uninsured EU — the person would refuse the loaded policy and still value a fair public mandate.
:::
:::

## Adverse selection: why the market may not exist

::: definition Adverse selection in insurance {#def-adverse-selection}
**Adverse selection** is the tendency of a pool to attract a worse-than-average risk mix when the insurer cannot observe risk type and must post a price based on the average of those who buy. In the limit the market can **unravel**: successive price increases drive out the better risks until no contract is traded.
:::

Akerlof's 1970 lemons model is the quality analogue (used in [[information-economics/asymmetric-information]]). Rothschild and Stiglitz (1976) is the insurance model.

::: proposition Rothschild–Stiglitz: no pooling equilibrium {#prop-rs}
Suppose two types, high and low risk, with $p_H > p_L$, identical strictly concave $u$, and competitive insurers who cannot observe type. A pooling contract (same $(q,b)$ for both types) is not a competitive equilibrium: a cream-skimming contract exists that attracts only the low-risk type and earns a profit, breaking the pool. If a separating equilibrium exists, the low-risk type obtains less than full cover. Assumptions: expected-utility maximisers, two types, exclusive contracts, no moral hazard, and free entry of insurers.
:::
::: proof Sketch.
A pooling contract that breaks even must charge $q=\bar p$, the average probability. The low-risk type's indifference curve through that point is steeper, in the usual Rothschild–Stiglitz diagram (indemnity versus premium), than the high-risk type's. A nearby contract with a little less cover and a lower price lies above the low-risk indifference curve and below the high-risk one, so only low risks take it; it can be priced at $p_L$ and profit. Hence no pooling equilibrium. In a separating candidate, high risks receive fair full cover (they would otherwise be cream-skimmed themselves), and low risks receive the fair contract on the $p_L$ line that just deters high risks from imitating — typically partial cover.
:::

Whether even a separating equilibrium exists depends on the share of high risks. If they are few, a pooling contract is so attractive to low risks that the separating low-risk contract is itself broken by a new pool. Rothschild–Stiglitz then predict *no* equilibrium. That is a modelling feature, not a theorem about the world; extensions with myopic firms (Wilson 1977), cross-subsidy regulation, or a public option restore existence.

The positive implication for public economics is blunt: a mandate that forces both types into a pool, or a public contract offered to everyone, can be Pareto-improving relative to a missing or separating market, because it restores cover to the low risks who were rationed. That is the efficiency case for compulsory health insurance and for community rating, *given* the information constraint. It is not a claim that any mandate at any price is an improvement: a mandate that charges more than the low risks' willingness to pay makes them worse off unless it is accompanied by a transfer (a subsidy, a tax credit). The US Affordable Care Act (2010) combined a mandate (later weakened), community rating and subsidies; Einav, Finkelstein and Cullen (2010, *Quarterly Journal of Economics*) and subsequent work estimate the welfare cost of selection in particular US health-insurance markets in the hundreds of dollars per person per year in some settings, with wide confidence intervals.

::: widget plot
f: 0.5*x; 0.2*x; 0.35*x
x: 0, 50
y: 0, 25
labels: \text{fair high-risk price}; \text{fair low-risk price}; \text{pooling price (equal shares)}
caption: Illustrative zero-profit lines: premium $= p \times$ cover. High-risk $p=0.5$, low-risk $p=0.2$, pooling $p=0.35$. A pooling contract sits on the middle line. Cream-skimming offers sit near the low-risk line, below the high-risk indifference curve through the pool (not drawn). Move along the horizontal axis to see how the wedge between $p_H$ and $p_L$ grows with cover.
:::

::: example A numerical pool {#ex-pool}
$w=100$, $L=50$, $u=\sqrt{c}$. Half the population has $p_H=0.3$, half $p_L=0.1$. A competitive pooling contract, if both types buy full cover, charges $q=0.2$. Compute the certain wealth and compare each type's EU under the pool with autarky (no insurance).
::: solution
Pool: premium $10$, certain $90$, $u=\sqrt{90}\approx 9.487$. Autarky high-risk: $0.7\sqrt{100}+0.3\sqrt{50}\approx 7+0.3\times 7.071\approx 9.121$. Autarky low-risk: $0.9\times 10 + 0.1\times 7.071\approx 9.707$. High risks gain from the pool ($9.487>9.121$); low risks *lose* relative to autarky ($9.487<9.707$) — they are subsidising high risks. Whether they still prefer the pool to a *separating* contract with partial cover is the Rothschild–Stiglitz calculation; they may prefer autarky to the pool, in which case the pool unravels unless mandated. A mandate plus a tax-financed subsidy to low risks can make both better off than autarky.
:::
:::

::: example Loaded insurance refused {#ex-loaded}
Continue [[#ex-log-ins]]: $w=100$, $L=40$, $p=0.2$, $u=\ln c$. A private contract charges a load that makes the premium $12$ for full cover. Does the person buy it?
::: solution
Certain wealth $88$, $\ln 88\approx 4.477$. Uninsured EU $\approx 4.503$. The loaded contract is worse than autarky, so it is refused. A fair public mandate (premium $8$) would still be accepted relative to autarky ($\ln 92\approx 4.522$). The load, not risk aversion, is why the private market fails here.
:::
:::

::: warning Average cost is not a fair price for each type
Calling a community-rated premium "fair" because the *insurer* breaks even confuses the pool with the individual. The price is fair for the average type and unfair for each type separately. That cross-subsidy is the point of the mandate, and it is a distributional choice as well as an efficiency choice. Positive analysis should name who is subsidising whom.
:::

## Moral hazard: the incentive cost of cover

::: definition Moral hazard in insurance {#def-moral-hazard}
**Moral hazard** is a hidden *action* taken after a contract is signed that raises the probability or size of a claim: less job search when unemployment benefits are generous, less care with insured health spending, less prevention when a loss is covered. It is distinct from adverse selection, which is a hidden *type* before the contract.
:::

The textbook trade-off, from Pauly (1968) and from Holmström's principal–agent model, is that full cover equalises wealth across states and therefore sets the private return to care to zero, while no cover gives efficient care and inefficient risk-bearing. Optimal cover is partial: a deductible, a copayment, a limited duration.

::: proposition Optimal cover with moral hazard {#prop-mh}
Suppose the insured chooses unobserved effort $e$ at convex cost $\psi(e)$, which lowers $p(e)$, and a risk-averse principal (or a competitive insurer) offers a contract $(c_n, c_L)$. Then the second-best contract does not fully insure: $c_n > c_L$ whenever $e$ is productive and $\psi$ is strictly convex. Assumptions: hidden action, observed outcome, no hidden type, limited liability not binding, and $u$ strictly concave.
:::
::: proof Sketch.
Full insurance, $c_n=c_L$, makes the agent's first-order condition for $e$ collapse to $-\psi'(e)=0$, so $e=0$ if $\psi'(0)=0$. A small reduction in $c_L$ (or a rise in $c_n$) has a second-order risk-bearing cost at the full-insurance point (by the envelope theorem, Mossin) and a first-order incentive benefit if $p'(e)<0$. Hence the optimum is interior in the incentive constraint.
:::

Unemployment insurance (UI) is the leading public application. Chetty (2008, *Journal of Political Economy*) estimates that a 10 per cent rise in US UI benefits raises unemployment durations by about 5.5 per cent, of which a substantial share is a liquidity effect (constrained households searching as if risk-averse and cash-strapped) rather than a substitution (moral-hazard) effect. The distinction matters: a liquidity effect is an argument *for* benefits, because it relaxes a missing-credit-market constraint; a substitution effect is the incentive cost. Katz and Meyer (1990) documented a spike in US job-finding at benefit exhaustion, a substitution-pattern fact. Card, Chetty and Weber (2007, *Quarterly Journal of Economics*) found a much smaller spike in Austria, where severance pay is lump-sum — a reminder that institutional detail changes the elasticity.

::: example A two-effort UI sketch {#ex-two-effort}
A worker has $u=\ln c$, $w=10$ per period if employed, $0$ if not. Search effort $e\in\{0,1\}$ costs $0$ or $\psi=0.2$ utils, and finds a job with probability $0.5$ or $0.8$. A benefit $b$ is paid if no job is found, financed by a tax on the employed so the budget balances in expectation for this worker. Compare $b=0$ with $b=4$ for the incentive to set $e=1$, treating the tax as a lump-sum $T$ on the employed state only, with $T$ equal to the expected benefit.
::: solution
For $b=0$, $T=0$. EU$(e=1)=\ 0.8\ln 10 + 0.2\ln 0^{+}$ is undefined at zero consumption — a reason real systems have a subsistence floor. Replace $\ln$ with $\ln(c+\varepsilon)$ or, more simply, give autarky consumption $1$ from home production. Redo with $c=1$ when unemployed and uninsured.

Let unemployed consumption be $1+b$ and employed $10-T$. Budget: $T\cdot \Pr(\text{employed})=b\cdot \Pr(\text{unemployed})$. At $e=1$, $0.8 T = 0.2 b$ so $T=b/4$. At $e=0$, $0.5 T=0.5 b$ so $T=b$.

The worker takes $T$ as given (a small person in a large pool) — that is the fiscal externality. Then $e=1$ is chosen if $0.8\ln(10-T)+0.2\ln(1+b)-0.2 \ge 0.5\ln(10-T)+0.5\ln(1+b)$.

If the pool sets $b=4$ and anticipates $e=1$, $T=1$. EU$(e=1)=0.8\ln 9 + 0.2\ln 5 - 0.2 \approx 0.8\times 2.197 + 0.2\times 1.609 - 0.2 \approx 1.758+0.322-0.2=1.880$. EU$(e=0)=0.5\ln 9 + 0.5\ln 5 \approx 0.5\times 2.197 + 0.5\times 1.609=1.903$. So $e=0$ is preferred: the benefit has killed search. A lower $b$, or a finite duration, is needed to keep $e=1$. The numbers are illustrative; they show the direction of the trade-off, not a recommended replacement rate.
:::
:::

Health insurance adds a second moral-hazard channel: the *price* of care at the point of use. The RAND Health Insurance Experiment (Manning, Newhouse and others, 1987, *American Economic Review*) estimated an elasticity of medical spending with respect to the copayment of about $-0.2$. The Oregon Health Insurance Experiment (Finkelstein et al., 2012, *Quarterly Journal of Economics*; 2013, *Science*) found that Medicaid expansion increased utilisation and reduced financial strain, with mixed physical-health results over a short horizon. Both are experimental estimates for particular populations; they are not a ranking of national health systems.

## Why governments, not just markets

The efficiency case for *public* social insurance, as opposed to a private market plus transfers, has several independent branches. Any one of them can be sufficient; none is automatic.

1. **Adverse selection**, as above: a mandate or a public pool can complete a missing market.
2. **Aggregate risk.** Unemployment and longevity are correlated across people. A private insurer cannot pool a recession or a jump in life expectancy; a government can spread those risks across cohorts and through the tax base (Bohn 1998; Shiller's macro markets are a theoretical alternative that have not been built at scale).
3. **Redistribution as insurance behind the veil.** Vickrey (1945) and later Mirrlees: an income tax *is* insurance against the risk of being born with low ability, which no private market can cover because the "loss" is observed before the contract (you cannot insure your type after you know it). This argument lives in [[public-economics/optimal-taxation]] as much as here.
4. **Administrative cost and monopoly.** Private health insurance in the United States has higher administrative loadings than Medicare (a comparison that depends on what is counted; see the National Health Expenditure Accounts). Loadings are a reason a public option can dominate a loaded private contract for risk-averse buyers, holding quality fixed — a ceteris paribus claim, not a description of every public system.
5. **Paternalism and myopia.** If people under-save for retirement or under-insure because of present bias ([[behavioural-economics/present-bias]]), a mandate can raise their own lifetime $W$ as they evaluate it later. That is a normative extra, and it should be labelled as such.

Disability insurance (DI) mixes selection, moral hazard and tagging (using a medical test as a noisy signal of type). Bound (1989) and subsequent work found that a minority of rejected US DI applicants return to work — evidence that some recipients are capable of work, and also that rejection is costly. Autor and Duggan (2003, 2006) documented the growth of US DI rolls and the role of screening stringency. The positive elasticity of DI receipt to benefits and to screening is not, by itself, a verdict on the programme: the first-best is to pay the truly disabled fully and the rest nothing, and the information to do that does not exist.

Old-age pensions mix insurance (longevity, disability at older ages), saving, and redistribution. A pay-as-you-go system is a tax-and-transfer scheme between cohorts; a funded system is a saving scheme with a mandate. Which is "better" depends on demographics, rates of return, and political risk — a comparison this course does not settle and that is not financial advice. Diamond (1977) and Feldstein (1974) staked out the efficiency questions (crowding-out of private saving, labour-supply distortions of payroll taxes). The incidence of the payroll tax is [[public-economics/tax-incidence]], not the statutory split between employer and employee.

::: quiz
A competitive health-insurance market offers two contracts and, in a Rothschild–Stiglitz separating equilibrium, high-risk people buy full cover while low-risk people buy partial cover. A public mandate of full cover at the pooled fair price would
- [ ] make both types worse off, because it distorts a functioning market
- [x] make high-risk types better off and have an ambiguous effect on low-risk types, who gain cover but lose the unpooling of their price
- [ ] be Pareto-improving for sure, because full cover is always first-best
- [ ] have no effect, because of Ricardian equivalence
::: solution
High risks were already fully covered at their own fair price $p_H$; the pooled price $\bar p < p_H$ is a subsidy to them, so they gain. Low risks gain from more cover (they were constrained by the incentive-compatibility of separation) and lose from a higher price $\bar p > p_L$. The net effect on low risks depends on numbers and on risk aversion. Full cover is first-best only without moral hazard and with fair pricing *for each type*. Ricardian equivalence is a different theorem about public debt.
:::
:::

::: application Unemployment insurance in a middle-income country
Chile's unemployment insurance (from 2002) combines individual saving accounts with a solidarity fund — a design that reduces moral hazard on the account margin while pooling tail risk. Cajner, Güell and others have studied related mixed systems. India's MGNREGA is not insurance in the actuarial sense; it is a self-targeted work guarantee that pays when household labour demand is slack, a substitute for UI where informal employment makes contribution histories hard to verify (a tagging and information point). Comparing replacement *rates* across Chile, India, France and the United States without comparing informality, household structure and the rest of the tax-transfer system is the same mistake as comparing tax-to-GDP ratios in [[public-economics/role-of-government]].
:::

## Evidence

- **Selection in health insurance.** Einav, Finkelstein and Cullen (2010) estimate a welfare cost of adverse selection in a large US firm's supplemental health insurance of about USD 140 per person per year in their sample (2004 data, 2010 paper), relative to the efficient uniform-price allocation — a modest number in that market, not a universal constant. Hackmann, Kolstad and Kowalski (2015, *American Economic Review*) find that Massachusetts' 2006 mandate reduced average costs, consistent with an influx of better risks.
- **UI duration elasticities.** Schmieder and von Wachter (2016, *Journal of Economic Literature*) survey estimates clustered around a 0.5 elasticity of duration to benefits in US data, smaller in some European studies. Chetty (2008) attributes a large share to liquidity. These are positive elasticities for a planner who already has a $W$; they feed the Baily–Chetty optimal-UI formula (Baily 1978; Chetty 2006): the gap between the income-smoothing gain and the fiscal externality of longer spells.
- **Health-care utilisation.** RAND HIE copayment elasticity about $-0.2$ (Manning et al. 1987). Oregon Medicaid lottery: more utilisation, less collection-agency contact, no precisely estimated mortality effect in the first two years (Finkelstein et al. 2012, 2013).
- **Disability.** Autor and Duggan (2003): the share of US adults on DI rose as screening and labour-market alternatives changed. Cross-country DI receipt varies with eligibility rules at least as much as with health (OECD *Sickness, Disability and Work* reports).

::: history
The German sickness insurance law of 1883 and invalidity-and-old-age law of 1889, under Bismarck, are the conventional starting point of the modern welfare state as compulsory social insurance. A. C. Pigou and later writers treated social insurance as an allocation-branch response to missing markets. Michael Rothschild and Joseph Stiglitz, "Equilibrium in Competitive Insurance Markets" (*Quarterly Journal of Economics*, 1976), gave the selection model. Mark Pauly (1968) stated the moral-hazard trade-off for health insurance. Martin Baily (1978) and Raj Chetty (2006) connected UI design to estimated elasticities. Kenneth Arrow's 1963 *American Economic Review* paper on uncertainty and medical care remains the diagnosis of why health is not a textbook commodity.
:::

## Where this leads

Redistribution ([[public-economics/redistribution]]) is insurance against the risk of being poor when types are already known, plus a pure equity motive. Optimal income taxation ([[public-economics/optimal-taxation]]) is the same problem with a continuous type and a labour-supply incentive constraint. Information economics ([[information-economics/asymmetric-information]], [[information-economics/moral-hazard]]) develops the contract theory this chapter has used. Macroeconomic stabilisation through UI as an automatic stabiliser belongs to [[macroeconomics/fiscal-policy-and-debt]] and [[business-cycles/fiscal-stabilisation]].

::: summary
- Risk-averse people fully insure at a fair price ([[#prop-full-cover]]); loads and missing markets leave them exposed.
- Adverse selection ([[#def-adverse-selection]]) can unravel a pooling market; Rothschild–Stiglitz ([[#prop-rs]]) has no pooling equilibrium and may have no equilibrium at all. A mandate can restore cover, with a cross-subsidy that should be named.
- Moral hazard ([[#def-moral-hazard]]) makes second-best cover partial ([[#prop-mh]]). UI duration elasticities mix liquidity (an argument for benefits) with substitution (a cost).
- Governments insure because of selection, aggregate risk, veil-of-ignorance redistribution, loadings, and sometimes paternalism. Each reason is a constraint, not a blank cheque.
- Evidence is market-specific: modest selection costs in some US health products, UI duration elasticities around one half in several US studies, RAND's $-0.2$ utilisation elasticity.
:::

## Exercises

::: exercise Fair full cover {level=1 check="20"}
$w=80$, $L=20$, $p=0.25$, fair insurance. What cover $b^*$ does a risk-averse person buy? (Enter $b^*$.)
::: solution
[[#prop-full-cover]]: $b^*=L=20$.
:::
:::

::: exercise Risk premium {level=1}
With $u=\ln c$, $w=100$, $L=50$, $p=0.2$, no insurance. Write the equation for the certainty equivalent and say whether the risk premium is larger or smaller than in [[#ex-log-ins]], where $L=40$.
::: solution
$0.8\ln 100 + 0.2\ln 50 = \ln(\mathrm{CE})$. The lottery is riskier (a larger loss), so with the same concave $u$ the risk premium $\E[c]-\mathrm{CE}$ is larger than the $1.71$ of [[#ex-log-ins]]. (Numerically $\E[c]=90$, $\mathrm{CE}=100^{0.8}50^{0.2}\approx 87.06$, premium $\approx 2.94$.)
:::
:::

::: exercise Who subsidises whom {level=1}
In [[#ex-pool]], which type is charged more than their actuarial cost in the pooling contract, and by how much per unit of full cover?
::: solution
Low-risk actuarial cost is $0.1\times 50=5$; the pool charges $10$. They overpay by $5$. High-risk actuarial cost is $15$; they underpay by $5$. Equal numbers make the cross-subsidy add up.
:::
:::

::: exercise Selection versus moral hazard {level=2}
A health plan sees that people who buy more cover have higher claims. Name two distinct explanations, and one empirical design that could separate them.
::: solution
Adverse selection: high-risk *types* buy more cover. Moral hazard: more cover *causes* more utilisation. A randomised copayment (RAND HIE) traces moral hazard, because type is balanced by randomisation. A study of people who are assigned to plans by their employer, without choice, also shuts down selection. Residual correlation between chosen cover and claims after rich controls is not a convincing separation.
:::
:::

::: exercise Rothschild–Stiglitz intuition {level=2}
Explain in two sentences why high-risk types receive full cover in a separating equilibrium while low-risk types do not.
::: solution
High-risk types have the stronger demand for cover, so any contract that fully insures them at their own fair price cannot be improved on for them without losing money. Low-risk types must be offered a contract that high-risk types do not prefer to their own; that incentive constraint is typically satisfied by reducing the low-risk type's cover below the full-insurance point, which hurts high-risk types more (single crossing).
:::
:::

::: exercise Baily–Chetty in words {level=2}
The Baily–Chetty condition for optimal UI roughly sets the gap $u'(c_u)-u'(c_e)$ (the value of smoothing) against the duration elasticity times a fiscal-cost factor. If the duration elasticity is zero, what is the optimal replacement rate for a utilitarian planner, and why?
::: solution
With a zero behavioural elasticity there is no fiscal externality of longer spells, so the planner fully insures: $c_u=c_e$ (a 100 per cent replacement of the after-tax wage gap, in the simple model). The only reason for partial replacement in Baily–Chetty is moral hazard (and, in extensions, other behavioural responses). Liquidity-constrained households raise $u'(c_u)$ and so raise the optimal benefit — that is Chetty's point.
:::
:::

::: exercise A mandate that is not Pareto {level=3}
Using the numbers in [[#ex-pool]], show that a mandate of full cover at the pooled price $q=0.2$ is *not* a Pareto improvement over autarky. What extra instrument would make both types better off than autarky?
::: hint
Compare $\sqrt{90}$ with each type's autarky EU, already computed in [[#ex-pool]].
:::
::: solution
High-risk autarky EU $\approx 9.121 < 9.487$; they gain. Low-risk autarky EU $\approx 9.707 > 9.487$; they lose. So the mandate is not Pareto. A transfer from high to low — or a tax-financed subsidy that lowers the low-risk premium — can spread the surplus of insurance (the risk premia of both types) so that both beat autarky. The surplus exists because both types are risk-averse and autarky is risky; the pooled mandate just does not *distribute* that surplus in a Pareto way.
:::
:::

::: exercise Two-effort UI, a lower benefit {level=3}
In [[#ex-two-effort]], keep $b=2$ and assume the pool prices at $e=1$, so $T=b/4=0.5$. Compute EU at $e=1$ and at $e=0$ (with $T=0.5$ taken as given) and say which effort the worker chooses.
::: hint
$\mathrm{EU}(e=1)=0.8\ln(10-0.5)+0.2\ln(1+2)-0.2$; $\mathrm{EU}(e=0)=0.5\ln(9.5)+0.5\ln 3$.
:::
::: solution
$\ln 9.5\approx 2.251$, $\ln 3\approx 1.099$. EU$(e=1)=0.8\times 2.251 + 0.2\times 1.099 - 0.2 = 1.801 + 0.220 - 0.2 = 1.821$. EU$(e=0)=0.5\times 2.251 + 0.5\times 1.099 = 1.675$. So $e=1$ is chosen. Combined with [[#ex-two-effort]], $b=4$ (priced at $e=1$) induced $e=0$ while $b=2$ preserves search. Optimal UI in this two-point set is at most the largest $b$ that still implements $e=1$, unless the planner prefers to give up on search.
:::
:::

::: exercise Aggregate risk {level=3}
Explain why a private unemployment insurer who can diversify across workers in *one* country still cannot offer actuarially fair UI against a national recession, and how a government with a tax base and a debt market can.
::: solution
In a recession the correlation of unemployment across workers approaches one: the law of large numbers fails. The insurer's claims spike just when asset prices and premium income are weak; private capital markets may not write the missing "GDP put" at a fair price (incomplete macro markets). A government can deficit-finance benefits, spreading the cohort's loss onto future taxpayers and onto other cohorts, which is possible because it can tax and issue debt. That spreading is real insurance only if future taxpayers are not the same people in disguise (Ricardian limits) and if the government can actually raise the future taxes — political and fiscal-capacity constraints. The argument is about risk-sharing technology, not about a recommended deficit path.
:::
:::

::: exercise Tagging {level=2}
Disability insurance pays only if a medical test is passed. Using the language of this chapter, what hidden-information problem is the test trying to relax, and what error-cost trade-off remains?
::: solution
The test is a tag for hidden *type* (ability to work), aimed at reducing adverse selection into the programme and the moral-hazard incentive to stop work in order to claim. Two errors remain: false negatives (truly disabled people rejected) and false positives (able people accepted). Tightening the test reduces moral hazard and fiscal cost and raises the suffering of false negatives. Optimal tagging (Akerlof 1978; Parsons) balances those, and is never perfect.
:::
:::
