The last eight chapters treated the firm as a present-value machine: cash flows in, claims out, managers as a pass-through. Firms are not pass-throughs. Managers, shareholders and creditors have different claims and different information, and they do not automatically maximise the same present value. **Corporate governance** is the set of rules, boards, contracts and markets that is supposed to align those interests, or at least to constrain the damage when they conflict. This chapter names the conflicts, the instruments that address them — incentive pay, boards, shareholder rights, the market for corporate control — and the evidence, which is mixed and institutional.

Nothing below is a recommendation of a pay package, a board structure, a takeover, or a jurisdiction. Fictional firms illustrate payoffs; dated studies illustrate average effects in a sample, not a rule for any firm. The atlas is for education only — not investment or financial advice.

Berle and Means (1932) documented the separation of ownership and control in large US corporations. Jensen and Meckling (1976) put a present-value number on the separation: the **agency cost** of outside equity, and of debt. La Porta, Lopez-de-Silanes, Shleifer and Vishny (1998, 2000) turned the problem into a cross-country comparison of legal protection for outside investors. The chapter draws on all three.

## Who is the principal?

::: definition Agency conflict in the firm {#def-agency}
An **agency conflict** arises when an agent takes an action that affects a principal and the two do not share an objective, typically because of hidden action (moral hazard) or hidden information (adverse selection). In the firm the leading conflicts are: (i) **managers versus outside shareholders** — perquisites, quiet life, empire building, resistance to replacement; (ii) **shareholders versus creditors** — asset substitution, dividend recapitalisations, debt overhang; (iii) **controlling versus minority shareholders** — tunnelling, related-party transactions, dual-class shares that separate cash-flow rights from voting rights. A **governance mechanism** is a rule or a market that changes the agent’s payoff or information in order to reduce the agency cost.
:::

The first conflict is the one Berle and Means described and Jensen and Meckling modelled. A manager-owner who sells a fraction $1-\alpha$ of the firm to outsiders still bears only $\alpha$ of the cost of a perk that costs the firm $1$, so perks are overused. The market anticipates this and pays less for the outside equity; the discount is the agency cost, borne by the owner who sells. Debt, in the same model, reduces the fraction sold as equity and so reduces that cost, but it adds the shareholder–creditor conflict of [[corporate-finance/capital-structure]]: a call-option-like residual that encourages risk-taking, and overhang that discourages new equity-financed investment.

::: proposition Agency cost of outside equity {#prop-outside-equity}
A manager-owner values a perk at $B$ and the perk costs the firm $C > B$. If the manager owns a fraction $\alpha$ of the equity and debt is zero, the manager takes the perk whenever $B > \alpha C$. The firm-value loss is $C - B$ whenever the perk is taken and would not have been taken at $\alpha = 1$. Assumptions: the perk is the only agency margin; outsiders price the equity after anticipating the perk; no monitoring, no incentive pay, no board.
:::

::: proof
The manager’s private net is $B - \alpha C$ (the perk’s benefit, minus the manager’s share of the firm’s cost). This is positive when $B > \alpha C$. At $\alpha = 1$ the condition is $B > C$, which is false by hypothesis, so the owner-manager does not take the perk. Outsiders, anticipating the perk whenever $\alpha < B/C$, pay $\alpha$ of the *reduced* firm value. The owner who sells $1-\alpha$ therefore receives less, by $(1-\alpha)$ times the loss $C-B$ (plus, at the margin, a further effect through the choice of $\alpha$). The loss $C-B$ is a social loss, not a transfer.
:::

::: example A perk and a sale of equity {#ex-perk}
A fictional founder owns a firm worth $100$ units without perks. A perk is worth $8$ to the founder and costs the firm $12$. The founder sells a fraction $1-\alpha$ of the equity, with no debt. For which $\alpha$ is the perk taken? If $\alpha = 0.4$, what do outsiders pay for their $60$ percent, and what does the founder’s wealth become?
::: solution
The perk is taken when $8 > 12\alpha$, i.e. $\alpha < 2/3$. At $\alpha = 0.4 < 2/3$ the perk is taken, the firm is worth $88$, and outsiders pay $0.6 \times 88 = 52.8$ for $60$ percent (not $0.6 \times 100 = 60$). The founder has $0.4 \times 88 = 35.2$ of remaining equity, plus $52.8$ of cash, plus the perk’s private value $8$, total $96$. Relative to not selling and not taking the perk (wealth $100$), the founder is $4$ worse off — the social loss $12-8$, which the founder bears in the sale price. The calculation is why a founder cannot dump the agency cost on outsiders: outsiders price it. Incentive pay, monitoring, and a smaller sale are ways of raising effective $\alpha$ or of raising $C$ as the founder perceives it.
:::
:::

The shareholder–creditor conflict has a similar geometry. Equity in a levered firm is a call option on the assets with strike equal to the debt’s face (Merton, 1974). Increasing asset risk raises the call’s value at creditors’ expense. A dividend recapitalisation — paying out cash that would have been a buffer for creditors — is another transfer. Debt covenants, seniority, and short maturity are contractual responses; they have costs of their own (they constrain good projects as well as transfers).

::: widget plot
f: max(x-400,0); min(x,400)
x: 0, 900
y: 0, 550
labels: \text{equity}; \text{debt}
caption: Payoffs at maturity of equity and debt on a fictional firm that owes 400. Equity is max(V − 400, 0), a call; debt is min(V, 400). Drag along V: below 400, extra asset value goes to creditors; above 400, to equity. Illustrative face value, not a recommended structure.
:::

::: warning “Shareholder value” as a slogan
Maximising the present value of *equity* is not the same as maximising $V = E + D$ once debt is in place. Overhang and asset substitution are cases in which equity-value maximisation *lowers* $V$. Maximising $V$ is itself a choice of objective: it is the MM objective, the size of the pie, and it ignores distribution among claimholders and among stakeholders who are not claimholders (employees, customers, the tax authority, neighbours). Governance rules in company law and in codes pick an objective, often with a duty to the company or to shareholders, sometimes with a stated stakeholder duty. The chapter can name the objective a rule is written for; it cannot settle which objective a society should write.
:::

::: quiz
A manager-owner sells $70$ percent of a previously all-owned firm to outsiders, with no incentive pay. Relative to full ownership, a perk that costs the firm $1$ now costs the manager
- [ ] $1$, because the perk still comes out of the firm
- [x] $0.30$, the remaining ownership share
- [ ] $0.70$, the share that was sold
- [ ] nothing, because outsiders bear all costs
::: solution
The manager’s remaining claim is $30$ percent, so $0.30$ of the firm’s cost is borne by the manager and $0.70$ by outsiders. Outsiders anticipate this and pay less; they do not “bear all costs” as a surprise. [[#prop-outside-equity]] is the comparison $B > \alpha C$ with $\alpha = 0.30$.
:::
:::

## Pay, boards and shareholder rights

::: definition Incentive pay and a board {#def-pay-board}
**Incentive pay** ties a manager’s wealth to a measure of performance — the share price, an accounting residual, a relative ranking. A **board of directors** hires, monitors and can replace the manager, and approves major transactions. **Independent** directors are directors without a current executive role (definitions of independence vary by code and by exchange). **Shareholder rights** include voting on directors, on mergers and on some pay packages, the right to sue, and, in some jurisdictions, the right to put items on the agenda. **Dual-class** shares give some holders more votes per unit of cash-flow rights.
:::

Incentive pay addresses hidden action by making the manager’s payoff covary with the principal’s. It has costs: it imposes risk on a risk-averse manager, which must be compensated; it rewards luck as well as effort if the measure is the share price; it can be gamed if the measure is an accounting number (a target that is hit by cutting maintenance, or by bringing sales forward). Holmström (1979) showed that a noisy signal of effort still has value in a contract; Holmström (1982) showed that relative performance evaluation can filter a common shock. Neither result is a formula for a CEO’s bonus.

Boards are a legal organ, not a theorem. Their average effect on firm value is hard to identify, because board structure is chosen, not assigned. The Sarbanes–Oxley Act of 2002 in the US, and later codes in the UK, the EU and elsewhere, raised independence requirements and the role of the audit committee. Event studies of those reforms, and of listing-rule changes, are the usual evidence; they are averages over the firms the reform affected, in a particular year, and they do not imply that adding an independent director to a particular board raises $V$.

::: example A linear pay package {#ex-pay}
A fictional manager can take a hidden action $a \in \{0, 1\}$ that raises expected firm value by $10$ if $a = 1$, at a private cost of $4$ to the manager. The share price will be $100$ or $80$ with equal probability if $a = 0$, and $110$ or $90$ with equal probability if $a = 1$. A contract pays a wage $w$ plus a share $\alpha$ of equity. For which $\alpha$ does the manager choose $a = 1$, ignoring risk aversion?
::: solution
The expected share of equity if $a = 0$ is $\alpha \times 90$; if $a = 1$, $\alpha \times 100$. The extra $\alpha \times 10$ must cover the private cost $4$, so $\alpha \ge 0.4$. A $40$ percent equity stake (or an option package with the same sensitivity) elicits the action in this risk-neutral illustration; a $10$ percent stake does not. Risk aversion would raise the required $\alpha$, or add a larger $w$, because the package $\alpha$ imposes the firm’s noise on the manager. The $10$ of expected value and the $4$ of cost are invented. The calculation is [[#prop-outside-equity]] in reverse: raise $\alpha$ until $B < \alpha C$ fails for the *bad* action and holds for the *good* one.
:::
:::

::: proposition Control rights and cash-flow rights {#prop-dual}
Let $v$ be a holder’s voting share and $\alpha$ the same holder’s cash-flow share. When $v > \alpha$, the holder can take a decision that yields a private benefit $B$ and a firm-value cost $C$ whenever $B > \alpha C$, even if $v$ is used to outvote the remaining cash-flow rights. Dual-class structures, pyramids and golden shares are ways of setting $v > \alpha$. The agency cost is of the same kind as [[#prop-outside-equity]], with $\alpha$ now the *controller’s* cash-flow share.
:::

::: proof
The controller’s private net is $B - \alpha C$; control ($v > 1/2$, or whatever the decision threshold is) makes the action feasible. The condition is identical to [[#prop-outside-equity]] with the manager’s $\alpha$ replaced by the controller’s.
:::

Minority protection — vetoes on related-party transactions, mandatory bids, appraisal rights — is a legal attempt to raise the $C$ the controller internalises, or to block the action. How well it works is a fact about a legal system, not about the inequality $B > \alpha C$.

::: remark Stakeholders and the objective
Company law in the UK (Companies Act 2006, s. 172) directs directors to promote the success of the company for the benefit of members, having regard to employees, suppliers, customers, the community and the environment. German co-determination puts employees on the supervisory board of large firms. US Delaware law is traditionally more shareholder-oriented, with room for other constituencies in a takeover defence. These are different written objectives. A present-value identity cannot rank them. It can say what happens to $V$, to $E$ and to $D$ under a named objective, which is a positive exercise.
:::

## Takeovers and the market for corporate control

::: definition A takeover {#def-takeover}
A **takeover** is the acquisition of a controlling block of voting rights, by merger or by tender offer, friendly or hostile. The **market for corporate control** (Manne, 1965) is the hypothesis that a team which can raise $V$ will bid for the votes, so that underperforming managers are replaced. A **premium** is the excess of the offer price over the pre-announcement market price of the target. **Synergy** is the rise in the combined $V$ of bidder and target, if any, relative to the two firms apart.
:::

A takeover can create value by replacing managers, by combining complementary assets, by reallocating a tax shield or a spare debt capacity, or by cutting agency costs of free cash flow (Jensen, 1986). It can also transfer value from target creditors (more leverage), from employees (a breach of implicit contracts, Shleifer and Summers, 1988), or from target shareholders to the bidder’s managers (an empire). The average announcement effect on the *target* is a premium; the average effect on the *bidder* is near zero or negative in many US samples of the 1980s–2000s (see, for example, the survey by Betton, Eckbo and Thorburn, 2008). An average is not a particular deal, and a premium is not a measure of synergy: it can be a transfer.

::: example A synergy identity {#ex-synergy}
Firm A is worth $100$, Firm B is worth $60$, as stand-alones. Combined they would be worth $180$. A bids $80$ in cash for B. What is the synergy, what do B’s owners receive as a premium, and what is the NPV of the deal to A’s owners?
::: solution
Synergy is $180 - 160 = 20$. B’s owners receive $80$ for a firm worth $60$, a premium of $20$. A’s owners pay $80$ for a firm that contributes $80$ to the combination ($180 - 100 = 80$, which is B’s $60$ plus the whole synergy of $20$), so the NPV to A is $80 - 80 = 0$. The whole of the synergy has been paid to B. If A had bid $70$, the premium would have been $10$ and A’s NPV $10$. If A had bid $90$, A’s NPV would have been $-10$: overpayment, a transfer to B of more than the synergy. The numbers illustrate an identity. They are not a recommended bid, and they are not a forecast of any combination’s $V$.
:::
:::

::: example Dual-class private benefits {#ex-dual}
A controller holds $15$ percent of the cash-flow rights and a majority of the votes. A related-party sale of an asset yields a private benefit of $6$ to the controller and reduces firm value by $10$. On the criterion of [[#prop-dual]], is the sale taken? What is the social loss?
::: solution
$\alpha C = 0.15 \times 10 = 1.5$, and $B = 6 > 1.5$, so the sale is taken. The social loss is $C - B = 4$. The controller’s private net is $6 - 1.5 = 4.5$; outside cash-flow holders lose $0.85 \times 10 = 8.5$; the two nets sum to $-4$. A cash-flow share of $6/10 = 0.60$ would just deter the sale. Votes in excess of cash-flow rights are the wedge that makes $v > \alpha$ costly in this illustration.
:::
:::

Takeover defences — poison pills, staggered boards, dual-class shares — raise the cost of a hostile bid. Whether they entrench managers (and destroy $V$) or protect a long-term project from a myopic bid (and raise $V$) is a live dispute. Evidence from the US of the 1980s–1990s often found that the adoption of a defence was associated with a fall in the share price, on average (Jarrell and Poulsen, 1987, among others); later work on staggered boards is mixed and identification is hard. The chapter can state the two hypotheses and the shape of the evidence. It does not pick a defence for a board.

::: application Creditors in a leveraged buyout
A leveraged buyout raises $D$ and concentrates $E$ on a small group, often including managers. In the Jensen (1986) story this cuts the agency cost of free cash flow: interest is a commitment to pay out. In the MM-with-distress story it raises expected distress costs. In the creditor-expropriation story it transfers from existing creditors whose covenants did not block the new debt. A given LBO can be some mix of the three. The mix is an empirical question about that deal, not a classification of the instrument. Existing creditors’ protection is a matter of covenants and of fraudulent-conveyance law, not of the NPV of the equity sponsors.
:::

::: quiz
In [[#ex-synergy]], A bids $80$ for B and synergy is $20$. The NPV of the deal to A’s owners is zero because
- [ ] takeovers never create value
- [x] the whole synergy was paid to B as a premium
- [ ] cash bids cannot capture synergy
- [ ] $V$ of the combination is $160$
::: solution
The combination is worth $180$. A pays $80$ for an increment of $80$ (B’s $60$ plus $20$ of synergy), NPV $0$. A cash bid *can* capture synergy; it did not, at this price, because of the split of the $20$. The combination’s $V$ is $180$, not $160$.
:::
:::

## Evidence

La Porta, Lopez-de-Silanes, Shleifer and Vishny (1998, *Journal of Political Economy*) coded legal protection of shareholders and creditors in 49 countries and documented that protection was stronger, on their indices, in common-law systems than in civil-law systems, and that deeper equity markets and more dispersed ownership were associated with stronger shareholder protection. The coding and the common-law ranking have been criticised (Spamann, 2010, *Review of Financial Studies*, among others); the broader claim that law and institutions covary with financial development is a central theme of the subsequent literature, including in middle-income countries. Djankov, La Porta, Lopez-de-Silanes and Shleifer (2008) constructed an anti-self-dealing index with a similar purpose.

Ownership is concentrated in most of the world. Claessens, Djankov and Lang (2000, *Journal of Financial Economics*) documented family control and pyramids in East Asian listed firms; similar patterns appear in continental Europe, Latin America and parts of Africa and the Middle East. The US and the UK, with more dispersed listed ownership, are the outliers, not the mean. Dual-class shares, common in some founder-led technology firms and in some media groups, are a contractual $v > \alpha$.

On pay, the long-run rise in US CEO pay from the 1970s to the early 2000s, and its partial flattening after, is documented by Frydman and Jenter (2010, *Annual Review of Financial Economics*) and by Gabaix and Landier (2008, *Quarterly Journal of Economics*), who tie the level of pay to firm size in a competitive assignment model. Whether the level is an agency rent or a market price of scarce talent is a live dispute; the two hypotheses are not settled by the fact that pay is high, nor by the fact that it covaries with size.

::: history
Berle and Means, *The Modern Corporation and Private Property* (1932), described the separation of ownership and control. Manne (1965, *Journal of Political Economy*) named the market for corporate control. Jensen and Meckling (1976) and Jensen (1986) put agency costs and free cash flow into present-value language. Holmström (1979, 1982) gave the contract-theory backbone of incentive pay. La Porta, Lopez-de-Silanes, Shleifer and Vishny (1997, 1998, 2000) opened the comparative-law empirical programme. The Cadbury Report (1992) in the UK is a landmark of the modern governance code; Sarbanes–Oxley (2002) and the EU’s later company-law directives are statutory cousins.
:::

## Where this leads

Information economics, in [[information-economics]], is the general theory of hidden action and hidden information of which this chapter is an application. Industrial organisation, in [[industrial-organisation]], treats mergers as a market-structure event as well as a governance event. Capital structure and payout are the financial claims on which the conflicts sit. Asset pricing, in [[asset-pricing/behavioural-finance]], asks how far mispricing, rather than agency, explains takeover waves and pay packages. None of those courses, and none of this one, recommends a board, a bid, or a pay plan.

::: summary
- Agency costs arise when managers, shareholders and creditors (and controlling versus minority holders) do not share an objective. Outsiders price the cost; it is borne, in the first instance, by the party who sells the claim.
- Equity of a levered firm is a call on the assets. That geometry is why shareholders may take risks or reject projects that creditors dislike.
- Incentive pay, boards, shareholder rights and takeovers are mechanisms that change the agent’s payoff or the identity of the agent. Each has a cost and a limit.
- A takeover premium is not synergy. Synergy is the rise in combined $V$; the premium is a split of that rise, or a transfer without a rise.
- Law and ownership patterns vary across countries; dispersed listed ownership is not the global mean.
- No mechanism in this chapter is a recommended structure. A calculated perk, bid or pay package is an illustration of a payoff, not advice.
:::

## Exercises

::: exercise A perk threshold {level=1 check="0.6667"}
A perk is worth $B = 8$ to the manager and costs the firm $C = 12$. The perk is taken when $\alpha < B/C$. What is the threshold $B/C$, rounded to four decimal places?
::: solution
$8/12 = 0.6666\ldots$, which rounds to $0.6667$. The perk is taken for $\alpha < 2/3$.
:::
:::

::: exercise Outsiders’ payment {level=1 check="52.8"}
In [[#ex-perk]], $\alpha = 0.4$ and the firm is worth $88$ with the perk. What do outsiders pay for $60$ percent of the equity?
::: solution
$0.6 \times 88 = 52.8$.
:::
:::

::: exercise A call-like residual {level=1 check="50"}
A firm owes $400$ and assets at maturity are $V = 450$. What is equity’s payoff?
::: solution
$\max(450-400, 0) = 50$. Debt receives $400$.
:::
:::

::: exercise A takeover premium {level=2 check="20"}
In [[#ex-synergy]], A bids $80$ for B, worth $60$ as a stand-alone. What is the premium paid to B’s owners?
::: solution
$80 - 60 = 20$.
:::
:::

::: exercise NPV to the bidder {level=2 check="0"}
In the same illustration, synergy is $20$ and the bid is $80$. What is the NPV of the deal to A’s owners?
::: solution
A pays $80$ for an increment of $80$ to the combination, NPV $0$.
:::
:::

::: exercise Required skin in the game {level=2 check="0.4"}
In [[#ex-pay]], the good action raises expected firm value by $10$ at a private cost of $4$. Ignoring risk aversion, what is the smallest $\alpha$ that elicits the action?
::: solution
$\alpha \times 10 \ge 4$, so $\alpha \ge 0.4$.
:::
:::

::: exercise Dual-class arithmetic {level=3}
A controller has $20$ percent of the cash-flow rights and $60$ percent of the votes. A related-party transaction yields a private benefit $B = 9$ to the controller and costs the firm $C = 20$. Does the controller take the transaction, on the criterion of [[#prop-dual]]? What firm-value loss results? What cash-flow share $\alpha$ would just deter the transaction?
::: hint
Compare $B$ with $\alpha C$. The social loss is $C - B$; check that the controller’s private net and the outsiders’ loss sum to that.
:::
::: solution
$\alpha C = 0.20 \times 20 = 4$, and $B = 9 > 4$, so the controller takes the transaction. The firm-value (social) loss is $C - B = 11$. The controller’s private net is $9 - 4 = 5$; outsiders lose $(1-\alpha)C = 16$; and $5 - 16 = -11$, matching. The deterrent cash-flow share solves $B = \alpha C$, so $\alpha = 9/20 = 0.45$. A $45$ percent cash-flow share would make the controller internalise enough of $C$ to stop, even with $60$ percent of the votes. Votes without cash-flow rights are the wedge.
:::
:::

::: exercise Overpayment {level=3 check="-10"}
Using the stand-alone values of [[#ex-synergy]] ($A = 100$, $B = 60$, combined $= 180$), A bids $90$ in cash for B. What is the NPV of the deal to A’s owners? (Enter the signed number.)
::: hint
Synergy is still $20$. A pays $90$ for an increment of $80$ to the combination.
:::
::: solution
The combination is worth $180$, so B’s assets plus synergy contribute $80$. A pays $90$, NPV $= 80 - 90 = -10$. The premium to B is $30$, which exceeds the synergy of $20$ by $10$. Overpayment is a transfer plus a loss to A’s owners, not a source of value.
:::
:::
