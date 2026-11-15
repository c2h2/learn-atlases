Firm A is worth, in a planning spreadsheet, $1{,}000$ units as an all-equity enterprise. The treasurer asks whether replacing $400$ units of equity with debt would raise the value of the firm. In a frictionless market the answer is no: the firm’s cash flows do not change, and slicing them into debt and equity cannot change their present value. That is the **Modigliani–Miller** (MM) irrelevance result. Corporate taxes, costs of financial distress, and information and agency frictions change the answer, and they are why capital structure is a subject rather than a tautology.

The argument is easy to misuse. MM does not say that leverage “does not matter” in the world we live in. It says that if leverage matters, it matters *because of a friction* — a tax, a bankruptcy cost, a conflict of interest, a signalling constraint — and the way to reason is to name the friction and value it. A calculated levered value in an example is not a recommendation to issue debt, to issue equity, or to target a leverage ratio. Every firm and every tax rate below is illustrative. The atlas is for education only — not investment or financial advice.

Franco Modigliani and Merton Miller’s 1958 paper shifted the question from “what is the optimal debt–equity mix?” to “which assumption of the irrelevance theorem is being dropped?”. The rest of this chapter drops assumptions one at a time.

## Modigliani–Miller without taxes

::: definition Capital structure {#def-structure}
A firm’s **capital structure** is the mix of claims on its cash flows, here reduced to two: **debt** with market value $D$ and **equity** with market value $E$. **Enterprise value** is $V = E + D$ (the value of the firm’s assets, or of the claims on them). **Leverage** is $D/V$ or $D/E$ according to context. A **levered** firm has $D > 0$; an **unlevered** firm has $D = 0$ and value $V_U$. The levered firm’s value is $V_L$.
:::

::: theorem Modigliani–Miller Proposition I (no taxes) {#thm-mm1}
Assume: capital markets are frictionless (no transaction costs, no taxes, no bankruptcy costs); investors and firms borrow and lend at the same rate; investment policy is fixed (the firm’s asset cash flows do not depend on financing); and there is no information asymmetry. Then $V_L = V_U$. Capital structure does not change the value of the firm.
:::

::: proof
Suppose, for a contradiction, that $V_L > V_U$. An investor who holds a fraction $\lambda$ of the levered firm’s equity and debt has a claim on $\lambda$ of the firm’s asset cash flows and has paid $\lambda V_L$. Buying the same fraction of the unlevered firm costs $\lambda V_U$ and delivers the same cash flows. The cheaper package is the unlevered one, and buying it while shorting the levered package is an arbitrage. If instead $V_L < V_U$, homemade leverage replicates the levered equity: buy a fraction of the unlevered firm, borrow the matching fraction of $D$ on personal account, and obtain the levered-equity payoff at a lower price. In either case the inequality cannot survive. Hence $V_L = V_U$.
:::

The proof is an application of the law of one price. Two packages that deliver the same cash flows in every state must trade at the same price, once investors can costlessly rearrange the packages. Homemade leverage is the rearrangement.

::: theorem Modigliani–Miller Proposition II (no taxes) {#thm-mm2}
Under the assumptions of [[#thm-mm1]], the required return on equity satisfies

$$
r_E = r_A + \frac{D}{E}(r_A - r_D),
$$ {#eq-mm2}

where $r_A$ is the required return on assets (the unlevered cost of capital) and $r_D$ is the required return on debt. As $D/E$ rises, $r_E$ rises linearly, offsetting the substitution of “cheap” debt for equity. The WACC equals $r_A$ at every leverage.
:::

::: proof
The no-tax WACC identity is $r_A = (E/V) r_E + (D/V) r_D$. Substitute $V = E + D$ and rearrange for $r_E$. Because [[#thm-mm1]] makes $V$ and therefore $r_A$ independent of $D/E$, the whole of the adjustment to leverage sits in $r_E$.
:::

::: example Homemade leverage {#ex-homemade}
An unlevered fictional firm has $V_U = 1{,}200$ units and expected earnings (all paid out) of $120$ a year, so $r_A = 10$ percent. A levered recapitalisation would issue $D = 400$ of debt at $r_D = 6$ percent and retire equity. Under [[#thm-mm1]], what is $V_L$? What is $r_E$? Show that an owner of $10$ percent of the levered equity can replicate that payoff by buying $10$ percent of the unlevered firm and borrowing.
::: solution
$V_L = V_U = 1{,}200$. Then $E = 1{,}200 - 400 = 800$, and [[#eq-mm2]] gives $r_E = 0.10 + (400/800)(0.10-0.06) = 0.12$. Expected earnings to levered equity are $120 - 0.06 \times 400 = 96$, and $96/800 = 0.12$, matching.

A $10$ percent owner of levered equity has a claim that cost $80$ and expects $9.6$ a year. Buying $10$ percent of the unlevered firm costs $120$ and expects $12$; borrowing $40$ at $6$ percent costs $2.4$ a year and brings the net outlay to $80$ and the net expected cash to $9.6$. The homemade package matches the levered-equity package in cost and in expected cash (and, in the full MM argument, in every state). There is no surplus to be had by asking the *firm* to borrow the $40$ instead.
:::
:::

::: widget plot
f: 0.10+x*(0.10-0.06); 0.10+0*x; 0.06+0*x
x: 0, 3
y: 0, 0.25
labels: \text{r_E}; \text{r_A}; \text{r_D}
caption: MM Proposition II without tax: r_E rises with D/E so that r_A (the flat middle line) is independent of leverage. r_D is drawn as a constant 6 percent, the MM textbook simplification. Illustrative rates, not a firm’s cost of capital.
:::

::: warning Cheap debt
Debt has a lower required return than equity, in this example $6$ percent against $12$, because it is a senior claim. That does not make a levered firm cheaper to finance. The missing piece is the rise in $r_E$. Averaging $6$ percent and $12$ percent at the MM weights $400/1200$ and $800/1200$ returns $10$ percent, the unlevered cost. A treasurer who computes WACC with a rising $D/V$ but a *fixed* $r_E$ will report a falling cost of capital and a rising $V$, in contradiction of [[#thm-mm1]]. The contradiction is in the fixed $r_E$, not in the world.
:::

::: quiz
In the no-tax MM world, a recapitalisation that issues debt and retires equity
- [ ] raises $V$ because debt is cheaper than equity
- [x] leaves $V$ unchanged; $r_E$ rises by enough to keep $r_{\mathrm{WACC}} = r_A$
- [ ] lowers $V$ because leverage is risky
- [ ] raises $r_A$, because the assets have become riskier
::: solution
[[#thm-mm1]] holds $V$ fixed; [[#thm-mm2]] puts the extra risk on $r_E$. Asset risk is an assumption of the theorem (investment policy is fixed), so $r_A$ does not move. “Debt is cheaper” is the warning above.
:::
:::

## Corporate taxes and the interest tax shield

Interest is deductible in the corporate tax systems this section models; dividends are not. A levered firm pays less corporate tax, on the same operating earnings, than an unlevered firm, and the difference is a cash flow to investors as a group — the **interest tax shield**.

::: theorem Modigliani–Miller with corporate tax {#thm-mm-tax}
Keep the assumptions of [[#thm-mm1]] except that a corporate tax at a constant rate $t_c$ is levied on earnings after interest. If debt is perpetual and risk-free, with a constant *level* $D$, then

$$
V_L = V_U + t_c D.
$$ {#eq-vl}

The present value of the tax shield is $t_c D$. The after-tax WACC is $r_A(1 - t_c D/V_L)$, which declines in leverage, and

$$
r_E = r_A + \frac{D}{E}(r_A - r_D)(1-t_c).
$$ {#eq-mm2-tax}
:::

::: proof
Unlevered after-tax earnings are $\mathrm{EBIT}(1-t_c)$, with present value $V_U = \mathrm{EBIT}(1-t_c)/r_A$ if EBIT is a perpetuity. Levered, the government takes $t_c(\mathrm{EBIT} - r_D D)$, so investors as a group receive $\mathrm{EBIT}(1-t_c) + t_c r_D D$. The extra $t_c r_D D$ is a perpetuity; if it is as safe as the debt, its present value at $r_D$ is $t_c D$. Adding that present value to $V_U$ is [[#eq-vl]]. The return identities follow by splitting $V_L$ into $E$ and $D$ and rearranging, as in [[#thm-mm2]], with the extra factor $(1-t_c)$ on the debt-cost gap.
:::

::: example A tax shield {#ex-tax-shield}
Take the firm of [[#ex-homemade]] but now let EBIT be $120$ perpetually, $t_c = 25$ percent, $r_A = 10$ percent, $D = 400$, $r_D = 6$ percent. Compute $V_U$, $V_L$, $E$, $r_E$ and $r_{\mathrm{WACC}}$.
::: solution
$V_U = 120 \times (1-0.25) / 0.10 = 900$. Then $V_L = 900 + 0.25 \times 400 = 1{,}000$, so $E = 600$. [[#eq-mm2-tax]] gives

$$
r_E = 0.10 + \frac{400}{600}(0.10-0.06)(0.75) = 0.10 + 0.02 = 0.12.
$$

Expected earnings to equity are $(120 - 24)(1-0.25) = 72$, and $72/600 = 0.12$. The WACC is $0.60 \times 0.12 + 0.40 \times 0.06 \times 0.75 = 0.072 + 0.018 = 0.090$, which is also $r_A(1 - t_c D/V_L) = 0.10 \times (1-0.10) = 0.09$. Discounting after-tax unlevered earnings at this WACC, $90 / 0.09 = 1{,}000$, recovers $V_L$. The $100$ of extra value is the present value of a $6$-unit perpetual tax shield ($0.25 \times 24$) at $6$ percent. The numbers illustrate [[#eq-vl]]. They are not a reason to choose $D = 400$.
:::
:::

**Adjusted present value** (APV) writes the same object as $V_L = V_U + \mathrm{PV}(\text{tax shield})$. For perpetual safe debt the second term is $t_c D$. For a finite, known debt schedule the shield in each year is $t_c r_D D_t$ and is discounted at $r_D$ if the schedule is fixed in money terms. For a constant $D/V$ *ratio*, the shield has the risk of $V$ and the Miles–Ezzell formula of the previous chapter applies. APV is the right tool when the debt *level* is the thing being chosen; WACC is the right tool when the debt *ratio* is.

Personal taxes, in Miller’s 1977 extension, offset the corporate shield. If equity distributions are taxed more lightly than interest in the holders’ hands, the total-tax advantage of debt is smaller than $t_c$, and can in the limit be zero. The formula $V_L = V_U + t_c D$ is then an upper bound, not a target.

## Distress, trade-off and pecking order

[[#eq-vl]] taken literally says that $V_L$ is maximised by $D = V_L$, a 100 percent debt firm. Firms are not 100 percent debt. The standard reason in the **trade-off theory** is that leverage raises the expected costs of **financial distress**: legal costs of bankruptcy, fire sales of assets, lost customers and employees, and the debt-overhang distortion Myers (1977) identified — equity holders, and managers acting for them, reject positive-NPV projects whose payoff would accrue to creditors.

::: proposition Trade-off value {#prop-tradeoff}
A reduced-form trade-off writing is

$$
V_L = V_U + \mathrm{PV}(\text{tax shield}) - \mathrm{PV}(\text{distress costs}).
$$ {#eq-tradeoff}

The first extra term rises with $D$; the second rises with $D$, typically more steeply at high leverage. A value-maximising $D$, if it exists, equates the marginal shield to the marginal distress cost. Assumptions: the two present values are well-defined; investment policy is otherwise fixed; agency and information costs are either in the distress term or are being ignored.
:::

::: proof
Additivity of present value applied to the extra cash flows (tax savings) and the missing cash flows (distress losses) relative to the unlevered firm. Existence of an interior maximum is not guaranteed by additivity; it requires the usual concavity, which the reduced form assumes rather than derives.
:::

::: widget plot
f: 900+0.25*x; 900+0.25*x-0.0004*x^2
x: 0, 1500
y: 800, 1300
labels: \text{MM with tax}; \text{trade-off}
caption: Illustrative V_L against the debt level D. The upper line is V_U + t_c D with V_U = 900 and t_c = 0.25. The lower curve subtracts a quadratic distress cost 0.0004 D^2, producing an interior peak. Both curves are invented functional forms, not estimated, and not a recommended D.
:::

Debt overhang is worth seeing in a number. A fictional firm owes $120$ next year and has a project that costs $10$ today and pays $15$ next year, a positive-NPV project at a zero discount rate. If the firm’s existing assets will be worth either $80$ or $140$ next year with equal probability, the $15$ in the low state goes to creditors ($80+15 = 95 < 120$), and equity holders pay the $10$ for a payoff only in the high state. They may refuse a project whose social NPV is positive. Risky debt, in this illustration, distorts investment. The numbers are a sketch of Myers (1977), not a firm’s capital budget.

The **pecking-order** theory, from Myers (1984) and Myers and Majluf (1984), drops a different MM assumption: information. Managers know more about the firm than outside investors. If they issue equity when they know the shares are overvalued, rational outsiders infer overvaluation from the issue and the price falls. Managers who maximise the wealth of existing owners therefore prefer internal cash to debt, and debt to equity, when they finance a project. Observed leverage is then the residue of a financing deficit, not a target from [[#eq-tradeoff]]. The two theories are not nested. Trade-off predicts a target; pecking order predicts a hierarchy. A firm can look as if it has a target because it is mean-reverting around a hierarchy, or the reverse.

::: example Information and the issue decision {#ex-majluf}
A fictional firm has assets worth, in the managers’ information, either $100$ or $200$ with equal probability, and a project that costs $100$ and is worth $150$ (NPV $= 50$). The firm has no cash. If it issues equity to new holders who believe the two types are equally likely, the new holders demand a $50$ percent stake in the pooled firm (they put in $100$ and the pooled value with the project is $100 + 150 + 50 = 300$ on average? Careful).

Simpler arithmetic, following Myers–Majluf’s logic rather than their full parameterisation: in the low-value state the project is a good deal for new holders and a bad deal for old holders, who dilute a $100$ firm by more than the NPV they gain; in the high-value state the reverse. If the price impact of issuing is large enough, high-value firms refuse to issue and the project is passed over. The cost of information is a foregone positive-NPV project, not a fee. The illustration is qualitative; the original paper’s numbers are a different parameterisation. The point for capital structure is that equity is not a frictionless residual claim once issuance reveals information.
:::

::: example APV of a finite shield {#ex-apv}
Unlevered Firm C is worth $V_U = 500$. It will carry debt of $200$ for five years, paying interest of $12$ a year, then retire the debt. The corporate tax rate is $25$ percent and the shield is discounted at $r_D = 6$ percent. What is $V_L$ by APV?
::: solution
Annual shield $0.25 \times 12 = 3$. Present value $3 \times \bigl(1-1.06^{-5}\bigr)/0.06 = 3 \times 4.212364 \approx 12.64$. Then $V_L = 500 + 12.64 = 512.64$. The perpetual formula $V_U + t_c D = 500 + 50 = 550$ would overstate the shield, because the debt is not perpetual. APV takes the shield that is actually there.
:::
:::

::: remark Agency costs of equity and of debt
Jensen and Meckling (1976) treat the firm as a nexus of contracts. Outside equity dilutes the manager-owner’s claim on residual cash, which can encourage perquisites and reduced effort — the agency cost of outside equity. Debt concentrates the residual on the manager but creates an incentive to take risks that transfer value from creditors (asset substitution) and the overhang already noted. An “optimal” mix, in that framework, minimises the sum of the two agency costs, at the margin. The argument is taken up as a governance problem in [[corporate-finance/governance]]. It is a friction that restores a role for structure, not a formula for a firm’s debt ratio.
:::

## Evidence

Rajan and Zingales (1995, *Journal of Finance*) documented capital structures of large firms in the G7: median book leverage (debt over debt plus book equity) in the early 1990s ranged from the low $20$s of percent in the United Kingdom to the mid-$50$s in some continental European samples, with the United States in between, and with leverage rising in tangibility of assets and in size, and falling in profitability and in market-to-book. The cross-country levels are sensitive to what counts as debt and to pension and leasing adjustments; the *correlations* with tangibility, size, profitability and growth have been found in many later samples, including in middle-income countries, and are among the more stable stylised facts of the field (see, for example, the review in Graham and Leary, 2011, *Annual Review of Financial Economics*).

Profitability’s negative correlation with leverage is a problem for a static trade-off story (more profit should mean more tax shield and less distress risk, hence more debt) and is a prediction of the pecking order (more profit means more internal cash, hence less debt issued). Dynamic trade-off models with issuance costs can produce the same correlation, so the sign does not, by itself, decide. Fama and French (2002, *Review of Financial Studies*) and Welch (2004, *Journal of Political Economy*) document slow adjustment to estimated targets and a large role for stock-return shocks in moving market leverage — facts that both theories have been stretched to accommodate.

Graham and Harvey (2001) asked CFOs directly: the most-cited debt factors were financial flexibility and credit ratings, then the tax shield, then earnings volatility; few cited personal taxes or signalling. The answers are self-reports, from a particular population, in a particular year. They are evidence about *what finance officers say they think about*, not about which theory is true.

::: history
Modigliani and Miller’s “The Cost of Capital, Corporation Finance and the Theory of Investment” appeared in the *American Economic Review* in 1958; the tax correction in 1963; Miller’s personal-tax paper in the *Journal of Finance* in 1977. Jensen and Meckling (1976, *Journal of Financial Economics*) and Myers (1977, same journal) put agency and overhang into the structure problem. Myers (1984, *Journal of Finance*, presidential address) and Myers and Majluf (1984, *Journal of Financial Economics*) stated the pecking order. The empirical mapping of leverage onto firm characteristics begins in its modern form with Bradley, Jarrell and Kim (1984) and with Rajan and Zingales (1995).
:::

## Where this leads

Payout policy in [[corporate-finance/payout-policy]] is the MM argument applied to dividends rather than to leverage: homemade dividends in a frictionless market, and then the frictions. Governance in [[corporate-finance/governance]] takes the agency costs of equity and of debt as the object of study rather than as a term in $V_L$. The cost of capital of the previous chapter is, under MM, a rewriting of $r_A$; away from MM it moves with $D$ for a reason that can be named. Credit risk, when debt is not the risk-free claim of the textbook MM proof, is a subject of [[money-banking]] and [[derivatives]].

::: summary
- In frictionless markets with fixed investment policy, $V_L = V_U$ (MM I) and $r_E = r_A + (D/E)(r_A - r_D)$ (MM II). Homemade leverage is the arbitrage.
- Corporate tax on its own gives $V_L = V_U + t_c D$ for perpetual safe debt. WACC declines in leverage by the tax factor; $r_E$ still rises, but not by enough to offset the shield.
- Distress costs, agency costs and information costs subtract from $V_L$ and can produce an interior trade-off, or a pecking-order hierarchy, depending on which friction is central.
- APV ($V_U$ plus the shield) matches a chosen *level* of debt; WACC matches a chosen *ratio*. Mixing the two is a policy mismatch.
- Empirical leverage covaries with tangibility, size, profitability and growth; the signs do not pick a unique theory.
- No number in this chapter is a recommended capital structure. A tax-shield calculation is an illustration of [[#eq-vl]], not advice to issue debt.
:::

## Exercises

::: exercise MM I {level=1 check="1200"}
An unlevered firm has $V_U = 1{,}200$. Under the assumptions of [[#thm-mm1]], a recapitalisation issues $400$ of debt. What is $V_L$?
::: solution
[[#thm-mm1]] gives $V_L = V_U = 1{,}200$.
:::
:::

::: exercise MM II {level=1 check="0.12"}
In the same no-tax illustration, $r_A = 10$ percent, $r_D = 6$ percent, $D = 400$, $E = 800$. What is $r_E$ as a decimal?
::: solution
$0.10 + (400/800)(0.10-0.06) = 0.12$.
:::
:::

::: exercise A tax-shield value {level=1 check="1000"}
With $V_U = 900$, $t_c = 25$ percent and perpetual safe $D = 400$, what is $V_L$ from [[#eq-vl]]?
::: solution
$900 + 0.25 \times 400 = 1{,}000$.
:::
:::

::: exercise After-tax MM II {level=2 check="0.12"}
Using [[#ex-tax-shield]]’s numbers — $r_A = 0.10$, $r_D = 0.06$, $D = 400$, $E = 600$, $t_c = 0.25$ — what is $r_E$ from [[#eq-mm2-tax]]?
::: solution
$0.10 + (400/600)(0.04)(0.75) = 0.10 + 0.02 = 0.12$.
:::
:::

::: exercise WACC with tax {level=2 check="0.09"}
For the same numbers, what is $r_{\mathrm{WACC}}$ as a decimal?
::: solution
$0.6 \times 0.12 + 0.4 \times 0.06 \times 0.75 = 0.072 + 0.018 = 0.09$. Equivalently $0.10 \times (1 - 0.25 \times 400/1000) = 0.09$.
:::
:::

::: exercise Homemade leverage arithmetic {level=2}
In [[#ex-homemade]], an investor wants the payoff of $10$ percent of the levered equity. What unlevered stake and what personal borrowing replicate it? Confirm that the net cost equals $10$ percent of levered equity.
::: solution
Buy $10$ percent of the unlevered firm, costing $120$, and borrow $40$ (which is $10$ percent of the firm’s $D = 400$). Net cost $80$, which is $10$ percent of $E = 800$. Expected cash $12 - 0.06 \times 40 = 9.6$, matching $10$ percent of the levered equity’s $96$.
:::
:::

::: exercise A finite tax shield {level=3 check="25.27"}
A firm will have interest of $24$ units a year for five years, then no debt. The corporate tax rate is $25$ percent and the shield is as safe as the debt, discounted at $r_D = 6$ percent. What is the present value of the tax shield, rounded to two decimal places?
::: hint
The annual shield is $t_c \times 24$; five-year ordinary annuity at $6$ percent.
:::
::: solution
Annual shield $6$. Present value $6 \times \bigl(1-1.06^{-5}\bigr)/0.06 = 6 \times 4.212364 = 25.274$, which rounds to $25.27$. This is well below $t_c D$ for a perpetual $D = 400$ (which was $100$), because the shield is temporary. Applying $V_L = V_U + t_c D$ to a firm that will retire the debt in five years would overstate the shield.
:::
:::

::: exercise Debt overhang in a two-state tree {level=3}
A fictional firm owes $120$ next year. Existing assets will be worth $80$ or $140$ with equal probability. A project costs $10$ today and pays $15$ next year in *both* states. The discount rate is zero for this illustration. Compute the NPV of the project to the *firm*, and the NPV of the project to *equity holders* if the $10$ must come from equity. Who would reject the project, and why?
::: hint
In the low state, creditors have a $120$ claim on $80+15 = 95$ of assets.
:::
::: solution
The firm’s NPV is $-10 + 15 = 5 > 0$. Without the project, equity is worth $\tfrac12 \max(80-120,0) + \tfrac12 \max(140-120,0) = 10$. With the project, next year’s equity is $\tfrac12 \max(95-120,0) + \tfrac12 \max(155-120,0) = 17.5$. Equity holders put in $10$ today to raise their claim from $10$ to $17.5$, a gain of $7.5$ against a cost of $10$, so the NPV *to equity* is $-2.5$. They reject a project whose NPV *to the firm* is $+5$. Creditors capture the rest: debt is worth $100$ without the project and $107.5$ with it, a gain of $7.5$. The identity is $5 = -2.5 + 7.5$. That is debt overhang: a positive-NPV project is rejected because too much of its payoff is captured by existing debt.
:::
:::
