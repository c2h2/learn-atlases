A proposed merger would combine the two largest firms in a four-firm industry whose shares are 40, 30, 20 and 10 per cent. The **Herfindahl–Hirschman index** (HHI) would rise from $3{,}000$ to $5{,}400$. In the language of the US Horizontal Merger Guidelines of 2010, that is a merger in a highly concentrated market with a large $\Delta\mathrm{HHI}$. In the language of the 2023 Merger Guidelines it is a structural fact that, together with evidence on diversion, margins and entry, can support a presumption of harm. Neither number is a finding that prices will rise. Both numbers are a reason to look.

This chapter is the policy face of the models already built: monopoly pricing, Cournot and Bertrand, product differentiation, entry, collusion, vertical contracts and platforms. **Competition policy** (antitrust in US usage) is the set of legal rules that constrain mergers, agreements among rivals, and the conduct of firms with market power. The chapter treats merger analysis, cartels and abuse of dominance, and how the same economic objects are written differently in the United States, the European Union and China. The models are positive. The statutes are facts. Whether a particular merger should be blocked is a legal decision this lesson does not take.

Throughout, profit is $\pi$. Shares are of revenue or of unit sales, as the data dictate; the algebra treats them as numbers that sum to one.

## What the law is for

::: definition Competition policy {#def-antitrust}
**Competition policy** is the body of rules that prohibit (i) agreements that restrict competition (cartels, some vertical restraints), (ii) mergers that would substantially lessen competition or significantly impede effective competition, and (iii) exclusionary or exploitative conduct by firms with a dominant position or monopoly power. In the United States the core statutes are the Sherman Act (1890) §§1–2 and the Clayton Act (1914) §7. In the EU they are Articles 101 and 102 of the Treaty on the Functioning of the European Union (TFEU) and the EU Merger Regulation. In China they are the Anti-Monopoly Law (AML) of 2008, amended in 2022.
:::

Three economic goals appear in the case law and the guidelines, and they are not the same.

- **Consumer surplus.** A merger that raises the price to buyers by more than it lowers cost fails a consumer-welfare test even if total surplus rises.
- **Total surplus.** A merger that raises producer surplus by more than it cuts consumer surplus passes a total-welfare test.
- **Protecting the competitive process.** Some jurisdictions (and some US opinions) treat exclusion of rivals, or the mere creation of a dominant position, as a harm even when a short-run surplus calculation is ambiguous.

US merger guidelines since the 1980s have been written in consumer-welfare language. EU Article 102 and the AML mix consumer harm with a concern for the structure of competition. The models below can be read under any of the three; they do not choose.

::: warning Consumer welfare is a test, not a slogan
"Consumer welfare" in antitrust economics means a comparison of surplus, prices, quality and innovation in a specified model, before and after a practice. It is not a claim that every business practice that is good for a firm is bad for buyers, and it is not a claim that every practice that is good for buyers is lawful. Bork (1978, *The Antitrust Paradox*) used the phrase in a total-surplus sense that later US practice largely did not adopt. Quote the test you are applying.
:::

## Market definition and concentration

A **relevant market** is a set of products and a geographic area inside which a hypothetical monopolist could profitably impose a small but significant non-transitory increase in price (the **SSNIP** test, usually 5 per cent). The test is a thought experiment, not a regression. It fails when the products are a bundle that buyers would abandon together, or when the candidate market is already dominated so that the prevailing price is above the competitive level (the **cellophane fallacy**, after *United States v. E. I. du Pont*, 1956).

::: definition Herfindahl–Hirschman index {#def-hhi}
For firms $i=1,\dots,N$ with market shares $s_i$ (as fractions),
$$
\mathrm{HHI} = \sum_{i=1}^{N} (100 s_i)^2 = 10{,}000 \sum_i s_i^2.
$$ {#eq-hhi}
The index lies in $(0, 10{,}000]$. An equal $N$-firm industry has $\mathrm{HHI} = 10{,}000/N$. The **change** $\Delta\mathrm{HHI}$ in a merger of firms $j$ and $k$ is $2 \times 10{,}000\, s_j s_k$.
:::

::: example Four shares {#ex-hhi}
Shares $0.40$, $0.30$, $0.20$, $0.10$. Compute the HHI, the HHI after a merger of the two largest, and $\Delta\mathrm{HHI}$.
::: solution
$\mathrm{HHI} = 16{,}00 + 900 + 400 + 100 = 3{,}000$. After the merger, shares $0.70$, $0.20$, $0.10$: $\mathrm{HHI}' = 4{,}900 + 400 + 100 = 5{,}400$. $\Delta\mathrm{HHI} = 2 \times 10{,}000 \times 0.40 \times 0.30 = 2{,}400$, which matches $5{,}400-3{,}000$.
:::
:::

The 2010 US Horizontal Merger Guidelines treated markets with post-merger $\mathrm{HHI}$ above $2{,}500$ and $\Delta\mathrm{HHI}$ above $200$ as highly concentrated mergers that raised a presumption of harm, rebuttable by evidence. The 2023 Merger Guidelines (FTC and DOJ, 18 December 2023) restored a structural presumption closer to the 1968 Guidelines: a merger that creates a firm with share above $30\%$ and $\Delta\mathrm{HHI} > 100$, or that leads to a post-merger $\mathrm{HHI} > 1{,}800$ with $\Delta\mathrm{HHI} > 100$, is presumed to lessen competition. The EU Commission's 2004 Horizontal Merger Guidelines use a looser HHI screen (post-merger $\mathrm{HHI}$ below $1{,}000$, or between $1{,}000$ and $2{,}000$ with $\Delta\mathrm{HHI}$ below $250$, as a safe harbour of sorts) and then a "significant impediment to effective competition" (SIEC) test. China's AML uses a notification threshold in turnover, not an HHI screen, and a "eliminates or restricts competition" test.

HHI is a *screen*. It is neither necessary nor sufficient for a price rise. A merger of two small firms in a $3{,}000$-HHI market can be harmless; a merger of the only two close substitutes in a differentiated market can raise prices even if HHI barely moves.

## Unilateral effects

In a differentiated Bertrand market the merger of firms $1$ and $2$ internalises the diversion between them. Firm 1, raising its price, used to lose sales to firm 2; after the merger those sales are recaptured. The first-order incentive to raise $p_1$ is summarised by **upward pricing pressure**.

::: proposition Upward pricing pressure {#prop-upp}
Let $d_{12}$ be the diversion ratio from $1$ to $2$ (the share of unit sales lost by $1$ when $p_1$ rises that are captured by $2$), and let $m_2 = (p_2-c_2)/p_2$ be firm 2's relative margin. Farrell and Shapiro's (2010, *B.E. Journal of Theoretical Economics*) **gross upward pricing pressure index** on product 1 is
$$
\mathrm{GUPPI}_1 = d_{12}\, m_2\, \frac{p_2}{p_1}.
$$ {#eq-guppi}
If GUPPI is large and efficiencies (marginal-cost savings) are small, the merger has a unilateral incentive to raise $p_1$. Assumptions: one-shot differentiated Bertrand, no repositioning, no entry, diversion ratios and margins measured at the status quo.
:::

::: proof
A small increase $\mathrm{d}p_1$ loses $\mathrm{d}q_1$ unit sales and recaptures $d_{12}\,|\mathrm{d}q_1|$ of them on product 2, each worth $p_2-c_2$ in margin. The recapture value per lost unit of 1, expressed as a fraction of $p_1$, is $d_{12}(p_2-c_2)/p_1 = d_{12} m_2 (p_2/p_1)$. That is the first-order price pressure before pass-through and before any cost synergy. A compensating marginal-cost reduction of that amount would leave $p_1$ unchanged to first order.
:::

::: example A GUPPI {#ex-guppi}
Two brands, $p_1 = p_2 = 10$, $c_2 = 7$ so $m_2 = 0.30$, diversion $d_{12} = 0.20$. Compute $\mathrm{GUPPI}_1$. What marginal-cost saving on product 1 would offset it to first order?
::: solution
$\mathrm{GUPPI}_1 = 0.20 \times 0.30 \times 1 = 0.06$. A 6 per cent of price, i.e. $0.60$ per unit, reduction in $c_1$ offsets the pressure to first order. A claimed efficiency smaller than that, or an efficiency that is not marginal-cost, does not offset GUPPI.
:::
:::

::: widget plot
f: 12-x; 2+0*x; 12-0.5*x
x: 0, 12
y: 0, 14
labels: \text{inverse demand}; \text{MC}=2; \text{MR}
caption: The monopoly benchmark of [[industrial-organisation/monopoly-pricing]]: $p=12-q$, $c=2$, MR $=12-2q$. A merger that moved an industry from Cournot duopoly toward this monopoly would move quantity from $q=20/3$ toward $q=5$ and price from $16/3$ toward $7$. GUPPI and Cournot $\Delta\mathrm{HHI}$ are two ways of measuring how far along that path a particular merger sits. Neither is a forecast of the post-merger price.
:::

In Cournot with homogeneous goods the same logic is a change in the number of firms. With linear demand $p = a-bq$ and constant $c$, $N$-firm Cournot price is $(a + N c)/(N+1)$. A merger from $N=3$ to $N=2$ raises the price from $(a+3c)/4$ to $(a+2c)/3$. The formula is the model of [[industrial-organisation/cournot-bertrand]]; merger simulation is that formula, before and after, plus claimed $\Delta c$.

Efficiencies count only if they are merger-specific, verifiable, and (under a consumer-welfare test) passed through to buyers. Fixed-cost savings do not shift Cournot or Bertrand first-order conditions.

## Coordinated effects and cartels

A merger can also make **collusion** easier: fewer firms, more symmetry, a removed maverick. That is the coordinated-effects theory, and it uses [[industrial-organisation/collusion#eq-delta]]. $\Delta\mathrm{HHI}$ is a weak proxy; the more informative objects are the number of remaining firms, multi-market contact, and whether a maverick (a firm that was not pricing with the pack) is being bought.

Cartels themselves are typically *per se* (US Sherman §1) or "by object" (EU Article 101) unlawful: the agreement is the offence, not the price that followed. Leniency programmes (US 1993 corporate policy; EU 2002 notice, revised 2006) give the first firm to confess a fine reduction, and they change the incentive constraint of the repeated game. The detection and overcharge facts of the collusion chapter are the empirical background; they are facts about *detected* cartels.

::: example A three-to-two Cournot merger {#ex-cournot-merger}
Linear inverse demand $p = 12 - q$, $c = 0$. Three symmetric Cournot firms merge to two. Compute the pre- and post-merger price and industry profit. How large a marginal-cost saving, enjoyed by the merged firm only, would restore the pre-merger price?
::: solution
Pre: $q_i = 12/4 = 3$, $Q=9$, $p=3$, $\pi_i = 9$, industry $\pi = 27$. Post, two firms: $q_i = 12/3 = 4$, $Q=8$, $p=4$, $\pi_i = 16$, industry $\pi = 32$. The merged firm is one of the two remaining. To restore $p=3$ we need $Q=9$. With two firms, Cournot $Q = 2(12-c_m)/(3)$ if the merged firm has cost $c_m$ and the outsider still has $c=0$ — actually the firms are then asymmetric. Simpler compensating-efficiency thought experiment: if *both* remaining firms had cost $c$, $Q = 2(12-c)/3 = 9 \Rightarrow 12-c = 13.5$, which is impossible. A merger from three to two with this demand cannot restore $p=3$ by a common cost saving, because even $c=0$ already gives $p=4$. A large cost saving *at the merged firm only* can: let the outsider have $c=0$ and the merged firm have $c_m < 0$ (a cartoon of a large synergy). Asymmetric Cournot: $q_m = (12-2c_m)/3$, $q_o = (12+c_m)/3$, $Q = (24 - c_m)/3$, $p = 12-Q = (12+c_m)/3$. Set $p=3$: $12+c_m = 9$, $c_m = -3$. A synergy equivalent to a negative cost of $3$ — a 25 per cent of pre-merger price, enormous — would be needed. The example is a warning that "efficiencies" large enough to offset a three-to-two homogeneous Cournot merger are rare in the model.
:::
:::

## Abuse of dominance

**Monopolisation** (Sherman §2) and **abuse of a dominant position** (TFEU Article 102; AML Article 22) constrain what a firm with market power may do to exclude rivals or, in the EU and China, to exploit buyers. The economic questions are predatory pricing, tying and bundling, exclusive dealing, and refusal to deal — the vertical and platform instruments of the previous two chapters, used by a firm that already has power.

::: definition Predatory pricing {#def-predation}
**Predatory pricing** is a strategy of setting price below an appropriate cost measure in order to exclude a rival, then recouping the loss by raising price. The Areeda–Turner (1975, *Harvard Law Review*) screen is price below average variable cost. The US *Brooke Group* (1993) test requires both below-cost pricing and a dangerous probability of recoupment. EU case law (*AKZO*, 1991; *Post Danmark I*, 2012) treats price below average variable cost as presumptively abusive and price below average total cost as abusive if intent to exclude is shown; recoupment is not a separate requirement.
:::

A price below AVC is a first screen, not a finding. A two-sided platform can set a price of zero on one side and recoup on the other without any exclusionary purpose ([[industrial-organisation/platforms-and-networks]]). A learning curve, network effects, or promotional pricing can put price below contemporaneous AVC in a competitive industry. Recoupment requires a theory of why rivals stay out after the price goes back up — the entry models of [[industrial-organisation/entry-and-deterrence]].

Tying, exclusive dealing and most-favoured-nation clauses have an efficiency face (double-marginalisation, free-riding on retail service, relationship-specific investment) and a foreclosure face (raising rivals' costs, denying scale). Post-Chicago vertical models (Ordover–Saloner–Salop; Hart–Tirole) map the conditions under which foreclosure can pay. Chicago-school arguments (a firm cannot earn two monopoly profits from one chain; buyers will not sign contracts that harm them) map the conditions under which it cannot. The evidence is case-by-case. Microsoft (US 1998–2001; EU 2004, 2009) and Google Shopping (EU 2017) are the usual teaching cases for tying and self-preferencing on platforms; they are litigated records, not a general theorem.

## Three jurisdictions

A short factual comparison, not a ranking.

| | United States | European Union | China |
|---|---|---|---|
| Agreements | Sherman §1, rule of reason except cartels *per se* | TFEU 101, by-object vs by-effect | AML ch. 2, monopoly agreements |
| Dominance | Sherman §2, monopolisation; no "unfair price" offence | TFEU 102, including exploitative abuse | AML ch. 3, abuse of dominance |
| Mergers | Clayton §7, Hart–Scott–Rodino filing | EUMR, SIEC test | AML ch. 4, "concentrations" |
| Agencies | DOJ Antitrust Division, FTC | European Commission DG COMP, plus nationals | SAMR (State Administration for Market Regulation) |
| Fines, cartels | Criminal (individuals) and civil; corporate fines | Administrative fines up to 10% of worldwide turnover | Administrative fines; 2022 AML raised statutory maxima |

US merger control is litigation in federal court if the agencies sue. EU and Chinese merger control is an administrative authorisation: the deal cannot close without a clearance (or a failure of the clock). That institutional difference, not a difference in Cournot algebra, explains why EU and Chinese reviews often end in **remedies** (divestitures, behavioural commitments) rather than in a trial.

China's AML, as amended in 2022, added a "stop-the-clock" mechanism, higher fines, and an explicit public-interest / "development of the socialist market economy" clause in Article 1. The economic models still apply; the objective function of the statute is broader than consumer surplus. The same is true, in a different way, of EU industrial-policy language around important projects of common European interest. A model of unilateral effects does not settle those objectives.

::: example A SSNIP arithmetic {#ex-ssnip}
A hypothetical monopolist of brand $A$ faces residual elasticity $4$ at the current price $10$. A 5 per cent price rise would cut quantity by about 20 per cent if elasticity is constant. With a current margin $(p-c)/p = 0.25$, is the SSNIP profitable? (Critical-loss arithmetic: the break-even loss fraction is $t/(m+t)$ for a uniform SSNIP of size $t$ in relative terms.)
::: solution
$t = 0.05$, $m = 0.25$, critical loss $0.05/0.30 \approx 0.167$. Predicted loss $0.20 > 0.167$, so the SSNIP is not profitable. Brand $A$ alone is not a relevant market. The arithmetic is the 2010 Guidelines' critical-loss test in one line; diversion to a named brand $B$ is the next step, not this step.
:::
:::

::: quiz
GUPPI on product 1 is $0.08$. Which statement is right?
- [ ] The post-merger price of product 1 will rise by 8 per cent.
- [x] There is an 8-per-cent-of-price first-order incentive to raise $p_1$, before efficiencies, pass-through and entry.
- [ ] The HHI will rise by 800.
::: solution
GUPPI is a first-order incentive, in price units as a share of $p_1$. Pass-through, curvature, entry and repositioning stand between GUPPI and a predicted $\Delta p$. It is not $\Delta\mathrm{HHI}$.
:::
:::

::: history
**1890, Sherman Act.** The first modern competition statute; §1 agreements, §2 monopolisation. The rule of reason arrives in *Standard Oil* (1911).

**1957 / 2009, Rome to Lisbon.** Articles 85 and 86 of the Treaty of Rome become Articles 101 and 102 TFEU. The Merger Regulation dates from 1989 (recast 2004).

**2008 / 2022, Anti-Monopoly Law of the PRC.** The AML created a unified Chinese competition statute; the 2022 amendment raised penalties and clarified digital-platform and "hub-and-spoke" language. SAMR is the current agency.

**2010 and 2023, US Horizontal / Merger Guidelines.** Two generations of the agencies' merger screen. The 2023 document is a statement of current US agency practice; courts are not bound by it.
:::

::: summary
- Competition policy constrains cartels, mergers and dominant-firm conduct. The economic objects are the models of this course; the legal objects are statutes and guidelines in a jurisdiction.
- HHI and $\Delta\mathrm{HHI}$ are screens. Unilateral-effect analysis uses diversion and margins (GUPPI) or a specified oligopoly model (Cournot, Bertrand, auction). Coordinated-effect analysis uses the collusion incentive constraint.
- Efficiencies count when they are merger-specific, verifiable, and (under a consumer-welfare test) marginal-cost. Homogeneous three-to-two Cournot mergers are hard to salvage with plausible synergies in the linear model.
- Predation, tying and exclusive dealing have an efficiency face and a foreclosure face. Tests (Areeda–Turner, *Brooke Group*, EU AKZO) are screens plus a recoupment or intent requirement that differs by jurisdiction.
- US, EU and Chinese law share the economic models and differ in procedure, in the status of exploitative abuse, and in statutory objectives. This lesson does not rank them.
:::

## Exercises

::: exercise HHI of equals {level=1 check="2500"}
Five equal firms. Report the HHI.
::: solution
$10{,}000/5 = 2{,}500$.
:::
:::

::: exercise Delta HHI {level=1 check="800"}
Shares $0.20$ and $0.20$ merge. Report $\Delta\mathrm{HHI}$.
::: solution
$2 \times 10{,}000 \times 0.20 \times 0.20 = 800$.
:::
:::

::: exercise GUPPI arithmetic {level=1 check="0.1"}
$d_{12} = 0.25$, $m_2 = 0.40$, $p_1=p_2$. Report $\mathrm{GUPPI}_1$.
::: solution
$0.25 \times 0.40 \times 1 = 0.10$.
:::
:::

::: exercise Cournot N to N-1 {level=2}
Linear $p=a-bq$, constant $c$, symmetric Cournot. Write the price as a function of $N$. Show that a merger from $N$ to $N-1$ raises price, and that the price rise is larger when $N$ is small.
::: solution
$p_N = (a + N c)/(N+1)$. Then $p_{N-1}-p_N = \bigl((a+(N-1)c)/N\bigr) - \bigl((a+Nc)/(N+1)\bigr) = (a-c)/(N(N+1)) > 0$. The difference falls in $N$. A five-to-four merger moves price less than a three-to-two merger, in this model, holding $a,c$ fixed.
:::
:::

::: exercise A SSNIP that fails {level=2}
Two products, $A$ and $B$, with a third outside good. A hypothetical monopolist of $A$ alone would lose so many sales to $B$ that a 5 per cent price rise is unprofitable. A hypothetical monopolist of $A$ and $B$ together would find a 5 per cent rise profitable. What is the relevant market under the SSNIP test, and what is the cellophane risk if $A$ is already a monopoly?
::: solution
The relevant market is $\{A,B\}$ (plus geography). If $A$ is already priced at the monopoly level, a further 5 per cent rise may be unprofitable *because* the firm is already on the elastic part of residual demand — the cellophane fallacy. SSNIP is applied at a competitive benchmark price, not at a prevailing monopoly price, when market definition is being used to *test* monopoly power.
:::
:::

::: exercise Leniency and $\delta$ {level=2}
In a grim-trigger cartel, a leniency programme that pays the first confessor a prize $L$ (a fine reduction) and levies expected fine $F$ on the others is a change in $\pi^d$ and $\pi^n$. In one sentence each, how does $L$ affect the incentive to deviate, and how does $F$ affect the value of remaining in the cartel?
::: solution
$L$ raises the one-shot payoff to deviation (confessing is a form of deviation that also avoids $F$), which raises $\delta^*$. $F$ lowers on-path continuation value if detection can occur on path, which also raises $\delta^*$ — collusion is harder. The two channels are why leniency is designed to break cartels rather than to tax them after the fact. (A badly designed programme that pays every confessor, or that is never used, can go the other way; that is a mechanism-design caveat, not a finding that leniency is useless.)
:::
:::

::: exercise Predation recoupment {level=3}
A chain sets price below AVC in one city for a year, then raises it. Rivals exited. Entry costs are sunk but small, and a new rival can be in the market in three months. Does *Brooke Group* recoupment look likely? Contrast with a market in which a network effect and a two-year switching cost keep buyers with the incumbent.
::: hint
Recoupment needs a theory of why the price stays up.
:::
::: solution
In the first market, recoupment is unlikely: the year of losses is a sunk cost, and three-month entry with small sunk costs makes a post-predation monopoly price unsustainable. *Brooke Group* would typically fail. In the second market, network effects plus switching costs can make the post-exit monopoly durable, so recoupment is at least a coherent theory. Whether the below-AVC year was *necessary* to exclude, rather than ordinary competition on a platform, is a separate question the cost screen does not answer.
:::
:::

::: exercise A remedy {level=3}
A four-to-three merger of mobile operators is cleared in one jurisdiction subject to the divestiture of spectrum and of a customer list to a new entrant, and blocked in another jurisdiction as a homogeneous Cournot three-to-two in all but name. Using this course's models, write two paragraphs that make each decision internally consistent *without* concluding which is right.
::: solution
Clearance-with-divestiture is consistent with a coordinated-effects or capacity story in which the harm comes from going to three similar firms, and in which a buyer of spectrum and subscribers is a credible fourth (or a strengthened maverick). If the divestiture restores the pre-merger incentive constraint $\delta^*$ or the pre-merger Cournot $N$, the SIEC/SLC is remedied in the model. Block-as-three-to-two is consistent with a unilateral-effects story in which the merging firms are close substitutes (high $d_{12}$), remaining rivals are capacity-constrained, and no buyer of a divestiture package would recapture that closeness. Homogeneous Cournot three-to-two with small efficiencies is, as in [[#ex-cournot-merger]], a large price rise in the linear model. The two decisions disagree about closeness, about entry, and about the credibility of the buyer — empirical objects — not about the algebra of GUPPI or Cournot.
:::
:::
