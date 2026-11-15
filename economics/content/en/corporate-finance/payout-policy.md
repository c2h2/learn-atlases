A firm that has earned cash can do three things with it: put it back into projects, return it to owners, or sit on it. Returning it is **payout**. The two standard instruments are a **dividend** — a cash payment pro rata to the shares — and a **share repurchase**, in which the firm buys some of its own shares and the remaining shares are a claim on a smaller firm. In a frictionless market the choice among these instruments, and the choice of how much to return, does not change the owners’ wealth: homemade dividends, sold from a portfolio, replicate a cash dividend, and a repurchase is a dividend paid to those who choose to sell. That is Miller and Modigliani’s 1961 irrelevance result, the payout twin of the capital-structure theorem.

Frictions restore a role for payout: different tax rates on dividends and capital gains, issuance and repurchase costs, the information a dividend change conveys, and the agency cost of cash left under managers’ control. Naming the friction is again the method. A numerical dividend, a repurchase price, or a payout ratio in an example is not a recommendation that a firm pay, withhold, or switch instruments. Every firm below is fictional. The atlas is for education only — not investment or financial advice.

The chapter uses the present-value identity of [[corporate-finance/valuing-stocks]] and the MM logic of [[corporate-finance/capital-structure]]. It does not pick a payout for anyone.

## Homemade dividends and irrelevance

::: definition Dividend and repurchase {#def-payout}
A **cash dividend** of $d$ per share, on $n$ shares outstanding, pays $nd$ of the firm’s cash to owners and, in a frictionless market, reduces the ex-dividend share price by $d$ relative to the cum-dividend price. A **share repurchase** of $k$ shares at the current price $P$ spends $kP$ of cash; $n-k$ shares remain, each a claim on a firm whose cash is $kP$ lower. A **payout ratio** is dividends (or dividends plus repurchases) divided by earnings. **Retention** is $1$ minus that ratio, when the denominator is earnings and there is no other source or use.
:::

::: theorem Miller–Modigliani dividend irrelevance {#thm-mm-div}
Assume: frictionless capital markets; no taxes on dividends or on capital gains; no transaction costs of issuing or selling shares; fixed investment policy (the firm’s projects do not depend on the payout); and no information asymmetry. Then the owners’ wealth is independent of the split of a period’s residual cash between a dividend and retention (with residual cash after retention held as cash or paid out by selling new shares). A repurchase and a cash dividend of the same total amount leave the remaining owners’ wealth unchanged, and they leave a selling owner with the same cash as a dividend would have.
:::

::: proof
Investment policy being fixed, the firm’s *asset* cash flows are a given stream. Payout in a period is then a transfer of cash from the firm to owners, offset one-for-one by a fall in the firm’s cash (or by the issue of new shares, which transfers a slice of the remaining stream to new owners at a fair price). Owners who wanted more cash than the dividend can sell shares; owners who wanted less can buy shares with the dividend. The homemade dividend replicates any payout the firm might have chosen, at the same present value. A repurchase of $k$ shares at the fair price $P$ is a voluntary dividend: sellers receive $P$ in cash, stayers hold a claim worth the same $P$ on a smaller balance sheet. The pie is unchanged; only the slicing of a given pie into “cash now” and “cash later” has moved, and owners can reverse the slice in the market.
:::

::: example Homemade dividends {#ex-homemade-div}
Firm A has $1{,}000$ shares, cash of $5{,}000$ units, and other assets worth $45{,}000$. Shares trade, in this illustration, at $P = 50$. Contrast (i) a dividend of $5$ per share with (ii) a repurchase of $5{,}000$ units of shares, and (iii) no payout, with an owner who wants $5$ of cash per share manufacturing it.
::: solution
The firm is worth $50{,}000$, or $50$ a share.

(i) A $5$ dividend pays out $5{,}000$ of cash. Ex-dividend, the firm is worth $45{,}000$, or $45$ a share. An owner of $10$ shares has $50$ of cash and $450$ of shares, still $500$.

(ii) A repurchase of $5{,}000 / 50 = 100$ shares leaves $900$ shares and a firm worth $45{,}000$, or $50$ a share. An owner who sold $10$ percent of a $100$-share holding (that is, $10$ shares) has $500$ of cash and $90$ remaining shares worth $4{,}500$, total $5{,}000$ on a $100$-share starting position — the same $50$ a share of wealth. An owner who sold nothing has $100$ shares worth $50$ each, still $5{,}000$, now a larger fraction of a smaller firm.

(iii) No payout: the firm remains worth $50{,}000$, $50$ a share. An owner of $10$ shares who wants $50$ of cash sells one share, is left with $9$ shares worth $450$ and $50$ of cash, matching the dividend in (i).

In all three cases an owner who wanted $5$ a share of cash ends with the same wealth. The firm did not need to pay a dividend for that owner to have one. The prices are invented, and the example assumes the repurchase is at the fair $50$, with no tax and no information in the act of paying or repurchasing.
:::
:::

::: widget plot
f: 50-x; 50+0*x
x: 0, 10
y: 35, 55
labels: \text{ex-div price}; \text{cum-div plus cash}
caption: Homemade-dividend arithmetic for a share that trades at 50 before the dividend. The falling line is the ex-dividend price 50 − d; the flat line is that price plus the dividend cash d, equal to 50 for every d. Wealth is the flat line. Illustrative price, not a quoted share.
:::

The identity $P_{\mathrm{cum}} = P_{\mathrm{ex}} + d$ is the frictionless case of [[#thm-mm-div]]. With taxes it becomes $P_{\mathrm{cum}} = P_{\mathrm{ex}} + d(1 - t_d)/(1 - t_g)$ in a simple one-period model, where $t_d$ and $t_g$ are the marginal tax rates on dividends and on capital gains. If $t_d > t_g$, the price drop on the ex day is less than the dividend, and a taxable owner prefers, other things equal, a capital gain to a dividend. Other things are not equal: many holders are tax-exempt, many jurisdictions have imputation or exclusion, and $t_g$ is often optional (gains are taxed when realised). The inequality is a reason payout *can* matter, not a ranking of instruments for a particular owner.

::: warning Dividends as a rate of return
A dividend yield $d/P$ is a ratio, not a return the owner has earned in addition to the share’s price change. The owner who receives $d$ holds a share that, in the frictionless identity, is worth $d$ less. Counting the yield as a “plus” without counting the ex-day drop as a “minus” double-counts. Realised return over a period is $(P_{\mathrm{end}} + d)/P_{\mathrm{start}} - 1$, one number, not a yield plus a capital gain computed from the wrong $P_{\mathrm{end}}$.
:::

::: quiz
In a frictionless market a firm pays a $2$ dividend. Just before the dividend the share is worth $40$. Just after, other things equal, the share is worth
- [ ] $40$, because the dividend is income, not capital
- [x] $38$, because cash has left the firm
- [ ] $42$, because owners have received $2$
- [ ] unchanged if the dividend is financed by issuing new shares
::: solution
Cash of $2$ per share has left the firm, so the ex-dividend price is $38$ in the frictionless identity. Owners have $2$ of cash and a $38$ share, still $40$ of wealth. Financing the dividend by issuing new shares at a fair price transfers a slice of the remaining assets to new owners and still reduces the old share’s claim; it does not leave the old share at $40$.
:::
:::

## Why payout can matter

Drop the assumptions of [[#thm-mm-div]] one at a time, as with capital structure.

**Taxes.** If dividends are taxed more heavily than capital gains, a firm that pays dividends rather than repurchasing (or retaining) imposes a tax on owners that they could have deferred or avoided. Miller and Scholes (1978) argued that tax shelters could undo the disadvantage; the empirical literature has not treated the disadvantage as fully undone. The 2003 US dividend-tax cut, and analogous reforms elsewhere, produced a laboratory that several papers used; the estimated payout response is a matter of debate (see Chetty and Saez, 2005, *Quarterly Journal of Economics*, and the subsequent comments), and it is a response in a particular tax system, not a universal ranking of dividends against repurchases.

**Issuance costs and liquidity.** A firm that pays out cash it will soon need must reissue, paying underwriting and underpricing costs. A precautionary cash-balance motive, of the kind Keynes described for households, then argues for retention. Repurchases are more flexible than a “sticky” regular dividend: they can be scaled back without the dividend cut that, empirically, managers go to some length to avoid.

**Information.** Dividends are a costly signal if they are sticky and if imitating a high dividend is expensive for a low-quality firm (Bhattacharya, 1979; Miller and Rock, 1985). A dividend increase can then raise the share price by revealing information, even though the cash leaving the firm, on its own, would lower the price by the amount of the cash. The two effects compete; the information effect is an *announcement* effect, not a reason that paying cash creates value. A repurchase announced as a tender offer can have a similar reading (the firm believes the shares are cheap) and a similar confound (the firm is distributing free cash).

**Agency.** Jensen’s (1986) free-cash-flow hypothesis is that managers with cash in excess of positive-NPV projects will spend it on perquisites, pet projects and empire building. Payout takes the cash out of the firm and, when it is debt-financed, adds a commitment to pay interest. A dividend, in this story, is valuable because it *removes* cash, not because cash is returned at a premium. The story predicts that payout raises value most in firms with weak projects and weak governance, a prediction taken up in [[corporate-finance/governance]].

::: proposition A tax wedge on the ex day {#prop-exday}
In a one-period model with a certain dividend $d$, a capital-gains tax rate $t_g$ and a dividend tax rate $t_d$, and with risk-neutral taxable holders setting the price, the ex-dividend drop satisfies

$$
P_{\mathrm{cum}} - P_{\mathrm{ex}} = d\,\frac{1-t_d}{1-t_g},
$$ {#eq-exday}

provided those holders are the marginal price-setters and there are no discrete-transaction costs. If $t_d = t_g$, the drop equals $d$ and [[#thm-mm-div]] is recovered. If $t_d > t_g$, the drop is less than $d$.
:::

::: proof
A holder who sells cum-dividend receives $P_{\mathrm{cum}}$ and pays gains tax on $P_{\mathrm{cum}} - B$, where $B$ is basis. A holder who waits, collects $d(1-t_d)$, and sells ex receives $P_{\mathrm{ex}}$ and pays gains tax on $P_{\mathrm{ex}} - B$. Equating after-tax payoffs and cancelling $B$ produces [[#eq-exday]]. The argument assumes the holder was going to sell in any case, so the gains tax is not optional; if gains can be deferred forever, $t_g$ is replaced by a smaller effective rate and the wedge grows.
:::

::: example A tax wedge {#ex-tax-wedge}
A fictional share will pay a $4$ unit dividend. Taxable holders face $t_d = 25$ percent and $t_g = 15$ percent, and they are the marginal price-setters in this illustration. If $P_{\mathrm{ex}} = 36$, what is $P_{\mathrm{cum}}$ from [[#eq-exday]]? What after-tax cash does a seller-cum have, and what after-tax cash does a holder-through-ex have, ignoring basis (or treating basis as zero for the comparison of *differences*)?
::: solution
$(1-t_d)/(1-t_g) = 0.75/0.85 \approx 0.8824$, so the drop is $4 \times 0.8824 \approx 3.53$ and $P_{\mathrm{cum}} \approx 39.53$. The dividend is $4$ pre-tax and $3$ after dividend tax. The capital-gain difference between selling cum and selling ex is about $3.53$, taxed at $15$ percent, so the after-tax gain-difference is about $3.00$, matching the after-tax dividend. That is the content of [[#eq-exday]]: the two routes give the same after-tax cash at the margin. A tax-exempt holder, by contrast, would prefer the $4$ of cash plus a $36$ share ($40$) to selling cum at $39.53$, and would bid the drop toward $4$. Who is marginal is an empirical question, not a theorem.
:::
:::

::: example Free cash flow as an agency cost {#ex-jensen}
Cedar & Pine, fictional, has $30$ units of cash, no debt, and exactly one remaining project, with NPV $-8$ (a pet project). If managers maximise the size of the firm they will take the project, and equity will be worth $22$ less the value of any other assets. If the $30$ is instead paid out in full, the pet project cannot be funded and owners receive $30$. The difference, $8$, is the agency cost of the retained cash in this illustration. A dividend of $30$, or a repurchase of $30$, or a debt issue of $30$ paid out, all take the cash away. They are not three recommended transactions; they are three writings of the same removal of the $8$ waste, under the story’s assumptions.
:::

::: example A split changes units, not wealth {#ex-split}
Firm A has $1{,}000$ shares outstanding and is worth $50{,}000$ units, so $P = 50$. It splits two-for-one. In a frictionless market, what are the number of shares, the price, and an owner’s wealth if they held $10$ shares before the split?
::: solution
$2{,}000$ shares, price $25$, owner now holds $20$ shares worth $500$ — the same $500$ as before. Cash has not moved. A $10$ percent stock dividend would have been $1{,}100$ shares at $50{,}000/1{,}100 \approx 45.45$, and $11$ shares would still be worth $500$. The split is a change of units.
:::
:::

::: intuition Payout is a use of cash, not a source of value
In the MM world, paying a dividend does not *create* the cash the owner holds; it *moves* cash from an account labelled “firm” to an account labelled “owner”. Value is created by the projects of [[corporate-finance/capital-budgeting]], and destroyed by the pet projects of [[#ex-jensen]]. Payout policy is a decision about where the cash sits, and under frictions that decision has a present value. It is not a substitute for a positive-NPV project.
:::

## Dividends, repurchases and stickiness

Lintner (1956, *American Economic Review*) interviewed managers and wrote a partial-adjustment model: firms have a target payout ratio, but they smooth dividends, moving part-way toward the target each year and especially resisting cuts. The model still organises the data. Repurchases, which became quantitatively important in the US from the 1980s and later in other markets, absorb the residual of payout and are much more volatile than dividends (Floyd, Li and Skinner, 2015, *Journal of Financial Economics*). A firm can therefore keep a stable regular dividend and still vary total payout with cash and with investment.

A repurchase at a price *above* fair value transfers wealth from staying owners to selling owners; a repurchase at a price *below* fair value transfers the other way. In a symmetric-information frictionless market the price *is* fair and there is no transfer. With asymmetric information, managers who believe the shares are cheap have a motive to repurchase, and the announcement can raise the price — which then reduces the cheapness. The logic is the Myers–Majluf argument of the previous chapter, run in reverse.

::: remark Stock dividends and splits
A **stock dividend** or a **split** changes the number of shares and not the firm’s cash. In a frictionless market it is a change of units, like a currency redenomination, and does not change owners’ wealth. Observed price reactions to split announcements are then information effects, or microstructure effects (a preferred tick, a preferred price range), not a present-value identity. They are not a reason to split or not to split any particular share.
:::

::: application A residual-payout spreadsheet
Helios Ltd, fictional, forecasts earnings of $40$, a target book-investment of $25$, and a desire not to issue new equity (a pecking-order constraint). Residual cash is $15$. A Lintner smoother might pay a dividend of $8$ (last year’s dividend was $7$, the target ratio would have suggested more) and repurchase $7$, or retain $7$ as a cash buffer. The split among those three uses is a payout-policy choice. The $25$ of investment is a capital-budgeting choice and, under MM, is the one that determines value. Mixing the two lines of the spreadsheet — cutting a positive-NPV $25$ in order to hold a dividend of $8$ — is the investment-policy assumption of [[#thm-mm-div]] being violated, and it is a different, and usually more expensive, way to keep the dividend.
:::

::: quiz
Miller and Modigliani’s payout irrelevance assumes, among other things, that
- [ ] dividends are taxed more heavily than capital gains
- [x] investment policy is fixed, so payout is a residual transfer of cash
- [ ] managers know more than outside investors
- [ ] repurchase prices are below fair value
::: solution
Fixed investment policy is the clause that makes payout a slicing of a given pie. Taxes, information and mispricing are frictions the theorem shuts down, and they are the reasons payout can matter once the theorem’s assumptions are dropped.
:::
:::

## Evidence

Lintner’s smoothing is still in the data: firms are more likely to raise a dividend than to cut it, and cuts cluster in earnings declines (see, among many papers, Brav, Graham, Harvey and Michaely, 2005, *Journal of Financial Economics*, a survey of financial executives that found dividend conservatism still dominant, with repurchases used for flexibility). Floyd, Li and Skinner (2015) document that, among listed US industrial firms, aggregate dividends were relatively stable through 1980–2012 while repurchases grew and became more cyclical; by the 2000s repurchases in that sample were of the same order as dividends. Patterns differ by country: in some European and East Asian samples, regular dividends remained a larger share of payout for longer, and special dividends play a larger role in some markets than in the US (see the comparative tables in Denis and Osobov, 2008, *Journal of Financial Economics*).

The information content of dividend *changes* is a robust average announcement effect in US data of the 1960s–1990s (Aharony and Swary, 1980, and many following papers): increases associated with positive average abnormal returns, cuts with negative. The effect is an average, not a trading rule, and it has been smaller in some later samples as repurchases took over part of the signalling role. It is consistent with an information friction; it is also consistent with a free-cash-flow story in which a cut reveals that the cash is going to be spent inside the firm. Distinguishing the two is a governance question as much as a payout question.

::: history
Lintner’s 1956 field study is the empirical starting point. Miller and Modigliani’s “Dividend Policy, Growth, and the Valuation of Shares” (*Journal of Business*, 1961) is the irrelevance theorem. Brennan (1970) and Elton and Gruber (1970) put taxes into the ex-day drop. Jensen (1986, *American Economic Review*) stated the free-cash-flow hypothesis. Bhattacharya (1979) and Miller and Rock (1985) gave signalling models of dividends. The rise of the repurchase as a payout instrument in the US is a fact of the 1980s onwards, coinciding with SEC Rule 10b-18 (1982), which provided a safe harbour for open-market buybacks.
:::

## Where this leads

Governance in [[corporate-finance/governance]] takes the free-cash-flow problem as a conflict among managers, shareholders and, when payout is debt-financed, creditors. Capital structure and payout are joint: a debt-financed repurchase is both a leverage change and a payout, and MM I and MM dividend irrelevance are the two theorems that, together, say the joint decision does not change $V$ in a frictionless market. Valuation in [[corporate-finance/valuing-stocks]] already used a payout ratio as an input to Gordon’s formula; this chapter is why that ratio can be a choice rather than a primitive. Asset pricing in [[asset-pricing/market-efficiency]] treats announcement effects as tests of how information is absorbed.

::: summary
- In frictionless markets with fixed investment policy, payout policy does not change owners’ wealth. Homemade dividends replicate a cash dividend; a fair-price repurchase is a voluntary dividend.
- The frictionless ex-dividend identity is $P_{\mathrm{cum}} = P_{\mathrm{ex}} + d$. Taxes replace $d$ by $d(1-t_d)/(1-t_g)$.
- Taxes, issuance costs, information and agency each give payout a present-value role, and they do not all point at the same instrument or the same level.
- Dividends are sticky; repurchases are flexible. Total payout can vary even when the regular dividend does not.
- A dividend yield is not an extra return on top of the price change. Return is $(P_{\mathrm{end}}+d)/P_{\mathrm{start}} - 1$.
- No payout in this chapter is a recommended dividend, repurchase or retention. The calculations slice a given pie under named assumptions.
:::

## Exercises

::: exercise An ex-dividend price {level=1 check="38"}
In a frictionless market a share is worth $40$ cum-dividend and the firm pays a dividend of $2$. What is the ex-dividend price?
::: solution
$40 - 2 = 38$.
:::
:::

::: exercise Homemade cash {level=1 check="500"}
Firm A’s shares trade at $50$ with no payout, as in [[#ex-homemade-div]]. An owner of $10$ shares wants $50$ of cash. They sell one share. What is their remaining wealth, cash plus shares?
::: solution
Cash $50$, nine shares worth $450$, total wealth $500$ — the same as the $10 \times 50$ they started with.
:::
:::

::: exercise A repurchase count {level=1 check="100"}
Firm A has $1{,}000$ shares outstanding at $P = 50$ and spends $5{,}000$ on a fair-price repurchase. How many shares does it buy?
::: solution
$5{,}000 / 50 = 100$ shares. Then $900$ remain, and the firm is worth $5{,}000$ less, so $45{,}000 / 900 = 50$ a share.
:::
:::

::: exercise A tax-wedge drop {level=2 check="3.53"}
Using [[#eq-exday]] with $d = 4$, $t_d = 0.25$, $t_g = 0.15$, what is the ex-dividend price drop, rounded to two decimal places?
::: solution
$4 \times 0.75 / 0.85 = 3 / 0.85 \approx 3.5294$, which rounds to $3.53$.
:::
:::

::: exercise Wealth after a dividend {level=2 check="500"}
An owner holds $10$ shares of Firm A at $P_{\mathrm{cum}} = 50$. The firm pays a $5$ dividend, frictionlessly. What is the owner’s wealth just after the dividend, cash plus ex-dividend shares?
::: solution
Cash $50$, shares $10 \times 45 = 450$, total $500$.
:::
:::

::: exercise Residual payout {level=2 check="15"}
Helios forecasts earnings of $40$ and book investment of $25$, and will not issue new equity. What is residual cash available for payout in this illustration?
::: solution
$40 - 25 = 15$. Whether that $15$ is a dividend, a repurchase, a cash buffer, or a mix is the payout-policy choice; the $25$ is the investment-policy choice.
:::
:::

::: exercise Equal-tax recovery of MM {level=3}
Show that [[#eq-exday]] reduces to $P_{\mathrm{cum}} - P_{\mathrm{ex}} = d$ when $t_d = t_g$. Then argue, in one paragraph, why a tax-exempt holder would not set that same drop if $t_d > t_g$ and taxable holders were quoting [[#eq-exday]].
::: hint
Substitute $t_d = t_g$ first. Then compare the tax-exempt’s two routes, sell-cum versus hold-through-ex, at the taxable drop.
:::
::: solution
If $t_d = t_g$, the ratio $(1-t_d)/(1-t_g)$ is $1$, so the drop equals $d$. A tax-exempt holder who faces a drop of only $d(1-t_d)/(1-t_g) < d$ when $t_d > t_g$ gets, by holding through the ex day, a pre-tax $d$ of cash plus $P_{\mathrm{ex}}$, which sums to more than $P_{\mathrm{cum}}$. They would bid for the cum-dividend share (or sell the ex-dividend share) until the drop moved toward $d$. If they are not numerous enough to be marginal, the taxable drop can survive; who is marginal is not settled by the formula.
:::
:::

::: exercise Investment policy versus payout {level=3}
A firm has a positive-NPV project costing $25$ and a regular dividend of $8$ that, this year, would require cutting the project to $17$ if the dividend is to be paid without issuing shares. Under [[#thm-mm-div]], which policy preserves owners’ wealth, and which friction, if present, might justify keeping the $8$?
::: hint
The theorem’s maintained assumption is that investment policy is fixed at the value-maximising projects.
:::
::: solution
Under the theorem, the project of $25$ is taken and payout is whatever residual remains (possibly with a new issue, which is fair-priced by assumption). Cutting the project to keep the dividend *violates* fixed investment policy and destroys the project’s NPV. A friction that might justify the cut, if it is large enough to outweigh that NPV, is a costly-issue friction (the new issue is underpriced, Myers–Majluf) or an information friction (cutting the dividend is read as worse news than passing over the project). Whether any actual friction is that large is not a calculation this illustration makes. The illustration is a ranking of two named policies under named assumptions, not a recommended dividend.
:::
:::
