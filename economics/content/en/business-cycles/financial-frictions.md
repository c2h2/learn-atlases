The real business cycle model of [[business-cycles/real-business-cycles]] and the three-equation New Keynesian model of [[business-cycles/new-keynesian-model]] share a quiet assumption: households and firms borrow and lend at the same real rate, and that rate is the policy rate minus expected inflation. In September 2008, when Lehman Brothers failed, that assumption failed in public. Credit spreads blew out, new issuance stopped in several markets, and the NBER recession already under way (peak December 2007, trough June 2009) deepened into the largest postwar drop in U.S. real GDP, $4.3$ percent peak-to-trough (BEA). A model without a spread cannot speak to that month.

This chapter puts **financial frictions** into the cycle: costly state verification and the **financial accelerator** of Bernanke, Gertler and Gilchrist (1999), collateral constraints and **credit cycles** of Kiyotaki and Moore (*Journal of Political Economy*, 1997), and a sketch of banks as in Gertler and Kiyotaki (in the *Handbook of Monetary Economics*, 2010) and the bank-run apparatus of [[money-banking/bank-runs-and-crises]]. The 2008 crisis is the leading application; it is not the only one. Emerging-market sudden stops, the euro-area sovereign-bank loop of 2011–12, and the 1997–98 Asian crisis are the same mechanism with different labels. The chapter presents the models on their own terms and reports evidence on spreads, leverage and amplification. It does not adjudicate "what caused 2008" beyond what the evidence will bear, and it does not recommend a security or a regulatory trade.

Notation: $i_t$ remains the policy rate; $i_t^b$ is the rate at which a borrower finances; the **spread** is $s_t = i_t^b - i_t$. Net worth is $N_t$, assets $A_t$, leverage $\ell_t = A_t/N_t$. Inflation $\pi$ and the gap $\tilde y$ keep their NK meanings when we embed the friction in that model.

## Why a friction bites

Modigliani and Miller (1958) taught that, in a complete-markets world with no taxes and no bankruptcy costs, the mix of debt and equity is irrelevant. A financial friction is anything that makes that theorem fail for the *borrower* who produces or consumes: asymmetric information, collateral that must be posted because promises are limited, or a bank that is itself constrained. The macroeconomic consequence is that **net worth** and **asset prices** become state variables. A shock that destroys net worth, or that lowers the price of collateral, tightens the constraint, cuts spending, and can lower asset prices further.

::: definition External finance premium {#def-efp}
The **external finance premium** is the extra cost of raising funds from outsiders rather than from internal cash, $s_t = i_t^b - i_t \ge 0$. Under costly state verification (Townsend, *Journal of Economic Theory* 1979; Gale and Hellwig, *Review of Economic Studies* 1985) the premium is decreasing in the borrower's net worth $N_t$ relative to the scale of the project, and increasing in the idiosyncratic risk the lender must monitor.
:::

::: definition Financial accelerator {#def-accelerator}
The **financial accelerator** (Bernanke and Gertler, *American Economic Review* 1989; Bernanke, Gertler and Gilchrist in Taylor and Woodford, eds., *Handbook of Macroeconomics*, 1999) is the loop

$$
\text{net worth}\downarrow \ \Rightarrow\ s_t\uparrow \ \Rightarrow\ \text{investment and }Y\downarrow \ \Rightarrow\ \text{profits and asset prices}\downarrow \ \Rightarrow\ \text{net worth}\downarrow.
$$ {#eq-loop}

A shock that would be modest in a Modigliani–Miller economy is amplified, and it persists because net worth is a stock that rebuilds out of retained earnings.
:::

The accelerator can be attached to an RBC backbone (the original BGG calibration) or to an NK backbone (the DSGE models used at central banks after 2008). In the NK attachment, $s_t$ enters the IS curve as an extra real rate: $\tilde y_t = \E_t\tilde y_{t+1} - \frac1\sigma\bigl(i_t + s_t - \E_t\pi_{t+1} - r_t^n\bigr)$. A spread shock is then a demand shock, and a policy-rate cut that does not pass into $i^b$ is a cut that IS does not see.

::: intuition Fire sales are a price, not a mood
When many constrained borrowers sell the same asset, the buyer is another constrained borrower, or a specialist with limited capital (Shleifer and Vishny, *Journal of Finance* 1992; Kiyotaki and Moore 1997). The price that clears that market is below the price an unconstrained valuator would pay. Marking remaining collateral to that price tightens every other constraint. That is a pecuniary externality: each seller takes the price as given, and the set of them moves the price. Macroprudential policy, in [[money-banking]], is in part an attempt to internalise that externality. Whether it succeeds is empirical; the externality is in the model.
:::

## Collateral and credit cycles

Kiyotaki and Moore (1997) dropped costly state verification and used a hard collateral constraint: a borrower can pledge at most a fraction $m$ of the next-period value of an asset (land, capital, housing). In a stripped-down form,

$$
(1+i_t) B_t \le m\,\E_t(q_{t+1} K_t),
$$ {#eq-collateral}

where $B_t$ is debt, $q_t$ is the asset price and $K_t$ the quantity of collateral. Net worth is $N_t = q_t K_{t-1} - (1+i_{t-1})B_{t-1}$. A fall in $q_t$ destroys $N_t$ one-for-one with leverage: if $\ell = A/N = 5$, a $10$ percent fall in asset value wipes out half of net worth unless debt is marked too.

::: proposition Amplification by leverage {#prop-leverage}
Mark assets to market, hold debt $B$ fixed in the period, and write leverage $\ell=A/N$ with $N=A-B$. A percentage decline $\delta$ in asset prices, with $\delta\ell<1$, reduces net worth by the percentage $\delta\ell$. If the borrower must then restore leverage $\ell$, assets are scaled to $A'=A(1-\delta\ell)$.
:::
::: proof
$N=A/\ell$ and $B=A-A/\ell$. After the price shock, $N'=A(1-\delta)-B = A/\ell - \delta A = N(1-\delta\ell)$. The percentage change is $N'/N-1=-\delta\ell$. Restoring leverage $\ell$ requires $A'=\ell N'=A(1-\delta\ell)$. The quantity sale is the gap between $A(1-\delta)$ and $A(1-\delta\ell)$; if that sale moves $q$ further, $\delta$ itself grows and the loop continues.
:::

::: example Leverage arithmetic {#ex-lev}
A firm has assets $100$, debt $80$, net worth $20$ (leverage $5$). Asset prices fall $10$ percent, debt unchanged. What is the new net worth and the new leverage? If the firm must return to leverage $5$, how much of the remaining assets must it sell, at the new price, assuming sales do not move the price further?
::: solution
Assets become $90$, net worth $90-80=10$, leverage $90/10=9$. To restore leverage $5$ it needs $A'=5\times 10=50$, so it sells $40$ of assets (at the already-fallen price). The original $10$ percent price decline, plus a leverage constraint, produces a $50$ percent contraction of the balance sheet. If sales *do* move the price, the contraction is larger — that is the fire-sale loop, which this calculation shuts off by assumption.
:::
:::

::: example A spread in IS {#ex-spread-is}
In the NK IS curve with $\sigma=1$, $\E\tilde y_{t+1}=\E\pi_{t+1}=0$, $r^n=0$ and $i=0.02$, compare $\tilde y$ when $s=0$ and when $s=0.02$ (a two-point credit spread, as in several 2008 peak readings of Baa–Treasury, Federal Reserve).
::: solution
$\tilde y = -(i+s-r^n)$. With $s=0$, $\tilde y=-0.02$. With $s=0.02$, $\tilde y=-0.04$. A spread that the policy rate does not offset doubles the demand slump in this one-period arithmetic. Passing a cut in $i$ one-for-one into $i^b$ would have been equivalent to preventing the spread; in 2008 the spread rose as $i$ fell (Gilchrist and Zakrajšek, *American Economic Review* 2012, excess bond premium).
:::
:::

## Banks and crises

BGG and Kiyotaki–Moore are models of *borrowers*. Gertler and Kiyotaki (2010) and Gertler and Karadi (*Journal of Monetary Economics*, 2011) put the constraint on *banks*: bankers have a limited pledgeable income, so their ability to take deposits (or issue short paper) is a multiple of their own net worth. A hit to bank capital — default losses, a mark-to-market on securities — cuts the supply of credit even if household and firm net worth is intact. QE that buys the securities the bank is marking, or a recapitalisation, then has a direct IS effect at the ZLB, which is the financial-friction reading of [[business-cycles/zero-lower-bound#def-qe]].

Runs, as in Diamond and Dybvig (1983) and the chapter [[money-banking/bank-runs-and-crises]], are a complementary discontinuity: a solvent but illiquid intermediary can fail if short claims are not rolled over. 2008 mixed both: an accelerator in household housing net worth (Mian and Sufi, *Quarterly Journal of Economics* 2009, on U.S. household leverage) and a run in wholesale funding (Gorton and Metrick, *Journal of Financial Economics* 2012, on repo). Shadow-banking entities that had no deposit insurance were the run's location. The European 2011–12 episode mixed sovereign spreads into bank balance sheets (Acharya, Drechsler and Schnabl, *Journal of Finance* 2014).

::: warning A spread is not a technology shock
The Solow residual falls in a financial crisis because utilisation, investment and hours fall (Hall 2010; Fernald 2014). Reading that residual as $Z_t$ in [[business-cycles/real-business-cycles#prop-solow]] attributes to technology what the accelerator attributes to a wedge in the investment Euler equation. Chari, Kehoe and McGrattan (2007) called that wedge the **investment wedge**. BGG is a theory of the wedge; a residual is not.
:::

::: quiz
In the financial accelerator, a fall in net worth raises the external finance premium because
- [ ] the central bank is following a Taylor rule with $\phi_\pi<1$
- [x] outside lenders must be compensated for a higher probability of monitoring or default when skin in the game is smaller
- [ ] inflation targeting has failed
- [ ] leverage is defined as $N/A$ rather than $A/N$
::: solution
Costly state verification and related agency problems make uninformed finance more expensive when the informed party's equity is thin. That is [[#def-efp]]. It does not require a Taylor-principle failure or an inflation-targeting failure, and leverage is $A/N$.
:::
:::

## Evidence

Gilchrist and Zakrajšek (2012) constructed an **excess bond premium** — the component of U.S. corporate credit spreads not explained by default risk as priced in a standard model — and found that it forecasts GDP, unemployment and investment. A rise in the premium is a demand shock in NK language: $\tilde y$ falls, $\pi$ tends to fall. That is the opposite of a cost-push, and it is the signature of $s_t$ in IS.

Leverage is procyclical in the broker-dealer and shadow-banking sector (Adrian and Shin, *Journal of Financial Economics* 2010): balance sheets expand when asset prices rise, which is [[#prop-leverage]] with the sign flipped. Household leverage before 2007, in U.S. zip codes that had a larger house-price boom, predicts a larger 2007–09 consumption drop (Mian, Rao and Sufi, *Quarterly Journal of Economics* 2013). Jordà, Schularick and Taylor (*Journal of Monetary Economics* 2013; *American Economic Review* 2016) show, on a long cross-country sample, that recessions preceded by credit booms are deeper and slower. None of these papers identifies a unique shock; they identify amplification.

Counter-evidence and limits. Not every recession is a financial recession: 2001 in the United States had an investment bust and a mild NBER recession without a banking crisis. RBC mechanisms and NK demand shocks still have work to do. Some of the 2008 drop in measured TFP is utilisation, some may be a genuine misallocation as credit was rationed (a real effect of a financial shock, not a contradiction). Macroprudential tools — countercyclical capital buffers under Basel III, loan-to-value caps in Korea, Hong Kong and several others — are too young a sample for a settled multiplier (BIS *Annual Economic Report*; IMF *Global Financial Stability Report*, various issues). This course records the tools; it does not grade them.

Emerging markets. Sudden stops (Calvo, *Journal of Applied Economics* 1998) are an external version of [[#eq-collateral]]: foreign lenders cut $m$, or raise $s$, and the current account must swing toward surplus as in the Aguiar–Gopinath moments of [[business-cycles/business-cycle-facts]]. Korea 1997, Argentina 2001, and several 2008–09 emerging-market episodes (IMF WEO, April 2009) fit the pattern. Domestic financial development changes $m$; it does not eliminate the constraint.

::: example Pass-through of a policy cut {#ex-pass}
The policy rate is cut by $100$ basis points. In case A the spread $s$ is constant. In case B the spread rises by $80$ basis points as the cut occurs (a 2008-like pass-through failure). With $\sigma=1$ and other IS terms unchanged, compare the IS impulse to $\tilde y$.
::: solution
IS cares about $i+s$. Case A: $i+s$ falls $100$ bp, $\tilde y$ rises $1$ percent. Case B: $i+s$ falls only $20$ bp, $\tilde y$ rises $0.2$ percent. The same Taylor-rule shock has one-fifth the demand effect when the accelerator is raising $s$. That is why a funds-rate path is not a sufficient statistic for financial conditions in a crisis.
:::
:::

::: example Haircut and $m$ {#ex-haircut}
A repo lender sets $m=0.8$ in [[#eq-collateral]] (a $20$ percent haircut). Collateral worth $100$ tomorrow in expectation will support how much debt today at $i=0$? If a crisis haircut takes $m$ to $0.6$, how much debt must be repaid at once if the collateral value is unchanged?
::: solution
At $m=0.8$ and $i=0$, $B\le 80$. At $m=0.6$, $B\le 60$, so $20$ of debt must be repaid or rolled at a worse term. The required repayment is a forced sale if the borrower has no cash — the quantity side of a run on wholesale funding (Gorton–Metrick). Haircuts and $q$ are substitutes in [[#eq-collateral]]: either can tighten the constraint.
:::
:::

::: application 2008 in the language of this chapter
U.S. house prices, which had peaked in 2006 (S&P/Case–Shiller; FHFA), destroyed household and mortgage-intermediary net worth. The external finance premium on corporates and the GZ excess bond premium rose sharply in 2007–08 and spiked after Lehman. The funds rate was cut toward the ZLB, but $i^b$ did not fall one-for-one. Investment and durables consumption collapsed by more than the RBC one-shock model can produce from a Solow residual of the observed size. An NK model with a spread shock, or a BGG model with a net-worth shock, produces that pattern. An NK model with only a Taylor-rule shock does not, unless the shock is enormous. Competing narratives — a run, a house-price fundamentals shock, a credit-supply shock from bank capital — are not mutually exclusive; they are different entry points into [[#eq-loop]].
:::

::: widget plot
f: 0.02 + 0.04*(1/n); 0.02+0*n
sliders: n=1:0.4:3
x: 0.4, 3
y: 0, 0.14
labels: \text{borrowing rate}; \text{policy rate}
caption: A schematic external finance premium $s=0.04/n$ where $n$ is net worth (normalised). The policy rate is the horizontal line at $0.02$. Lower net worth with the slider and watch the borrowing rate rise away from the policy rate. That vertical gap is what IS sees, and what a cut in the policy rate may or may not compress.
:::

The plot's $x$ is a dummy domain; read $n$ from the slider. A cleaner picture is $s$ against $N$.

::: widget plot
f: r + d/(x+0.2)
sliders: r=0.02:0:0.05; d=0.03:0.005:0.08
x: 0, 4
y: 0, 0.25
labels: \text{borrowing rate } i^b
caption: Borrowing rate $i^b = i + d/(N+0.2)$ against net worth $N$ on the horizontal axis. Raise $d$ (the scale of the agency cost) to steepen the premium; raise $i$ (the policy rate, slider $r$) to shift the whole curve up. A net-worth collapse is a move *along* the curve to the left; a policy cut is a shift down. 2008 was both, and the leftward move dominated.
:::

## Where this leads

Fiscal policy in a financial crisis is not the same object as fiscal policy in a 2001 demand slump: recapitalisations, guarantees and asset purchases are aimed at $N$ and $s$, while $G$ is aimed at IS directly. [[business-cycles/fiscal-stabilisation]] separates those. At the ZLB, a spread that will not compress is a reason the multiplier on $G$ is large in NK models (no crowding-out through $i$) and a reason QE that targets the distressed asset can be a complement. Macroprudential policy, which this course does not design, is an attempt to cap $\ell$ in the boom so that [[#prop-leverage]] has less to work with in the bust. The trade-off is a slower boom versus a shallower bust; the evidence is not yet a number that this chapter will invent.

::: history
**1989, Ben S. Bernanke and Mark Gertler.** "Agency Costs, Net Worth, and Business Fluctuations" (*American Economic Review*) put Townsend's costly state verification into a cycle. **1997, Nobuhiro Kiyotaki and John Moore.** "Credit Cycles" (*Journal of Political Economy*) showed that a collateral constraint plus a durable asset produces amplified, persistent swings in output and in $q$. **1999, Bernanke, Gertler and Simon Gilchrist.** The *Handbook* chapter calibrated the accelerator inside a quantitative NK/RBC hybrid and gave the mechanism its name. **2012, Simon Gilchrist and Egon Zakrajšek.** The excess bond premium gave the spread a forecasting record that reduced-form VARs now treat as a standard shock.
:::

::: summary
- Financial frictions break Modigliani–Miller for borrowers or banks. The extra cost of external funds — the spread $s_t$ — falls with net worth and rises with leverage and risk.
- The financial accelerator is a loop from net worth to the spread to investment to asset prices and back to net worth. Collateral constraints produce the same loop through $q$.
- Leverage $\ell$ maps a $\delta$ percent asset-price fall into a $\delta\ell$ percent net-worth fall, and a destocking sale if a leverage cap binds.
- Spreads, the GZ premium, and credit-boom recessions in the Jordà–Schularick–Taylor sample are the leading evidence. Not every recession is financial; 2001 is a reminder.
- In an NK IS curve, $s_t$ is a demand shock. Policy-rate cuts that do not pass through, and QE that does, are then different instruments.
:::

## Exercises

::: exercise Leverage {level=1 check="4"}
Assets $80$, debt $60$. What is leverage $A/N$? (Enter the number.)
::: solution
$N=20$, $\ell=80/20=4$.
:::
:::

::: exercise Net-worth hit {level=1 check="12"}
On the same balance sheet a $10$ percent fall in asset prices, debt fixed, produces what new net worth? (Enter the new net worth.)
::: solution
Assets become $72$, net worth $72-60=12$. The percentage decline in net worth is $8/20=40$ percent, which equals $\delta\ell=0.10\times 4$.
:::
:::

::: exercise Spread in IS {level=1 check="-3"}
With $\sigma=1$, $\E\tilde y=\E\pi=0$, $r^n=0$, $i=0.01$ and $s=0.02$, what is $\tilde y$ in percent? (Enter the signed percent, e.g. -3.)
::: solution
$\tilde y=-(0.01+0.02)=-0.03$, which is $-3$ percent.
:::
:::

::: exercise Percentage net-worth rule {level=2}
Using [[#prop-leverage]], a $5$ percent asset-price fall at leverage $6$ does what to net worth, in percent? If a leverage cap then binds, by what percent must assets fall in total (price plus sale), ignoring a further price impact of the sale?
::: solution
Net worth falls $\delta\ell=0.05\times 6=30$ percent. Restoring leverage scales assets by $1-\delta\ell=0.70$, a $30$ percent fall in $A$ from the original *pre-price-shock* level. The price shock already reduced $A$ by $5$ percent, so the additional sale is the gap from $0.95A$ down to $0.70A$, i.e. a sale of $0.25A$.
:::
:::

::: exercise GZ premium {level=2}
Gilchrist and Zakrajšek (2012) split corporate spreads into a default-risk piece and an excess premium. Why is the *excess* piece the one that belongs in an NK IS curve as $s_t$, rather than the whole spread?
::: solution
Default risk that is already priced as a compensation for expected losses is not, by itself, an agency or credit-supply friction; it is a payoff. The excess premium is the residual: cheaper or dearer credit than default risk accounts for, which is the BGG external finance premium and the quantity that shifts IS at a given $i_t$ and $\pi^e$. Using the whole spread would double-count expected default as if it were a wedge.
:::
:::

::: exercise Investment wedge {level=2}
A financial crisis lowers measured TFP. Using [[business-cycles/real-business-cycles#prop-solow]] and this chapter, give two reasons the residual can fall even if the feasible production set is unchanged.
::: solution
Utilisation of capital and labour falls, and the Solow residual attributes utilisation to $Z$. Separately, credit rationing can misallocate inputs across firms (a lower *measured* aggregate $Z$ from composition) without a change in any firm's production function. Both are consistent with an investment or labour wedge; neither is a Kydland–Prescott technology shock.
:::
:::

::: exercise Sudden stop {level=3}
A small open economy has a collateral constraint on *foreign* borrowing. Foreign lenders cut $m$ in [[#eq-collateral]]. Using the resource constraint $C+I+NX=Y$, explain why the trade balance must move toward surplus and why consumption can be *more* volatile than output, connecting to the emerging-market facts of [[business-cycles/business-cycle-facts]].
::: hint
The constraint is on $B$, not on $Y$. Current spending must fall until the current account finances the required deleveraging.
:::
::: solution
A tighter $m$ forces $B$ down (or prevents rollover). The financial account inflow shrinks, so $NX$ must rise (the current account moves toward surplus) at given official reserves. $Y$ may fall because of the accelerator, but $C+I$ must fall *more* than $Y$ in order to generate the $NX$ swing. Consumption, if it cannot be smoothed internationally — the constraint is exactly the failure of that smoothing — then moves at least as much as output, and often more. That is the Aguiar–Gopinath / García-Cicco pattern, produced here by a financial friction rather than by a trend-growth shock.
:::
:::

::: exercise QE versus a rate cut {level=3}
In Gertler and Karadi (2011), the constraint is on banks. Explain why a purchase of the distressed asset (QE) can ease IS even at $i=\underline{i}$, while a cut in $i$ that has already reached the bound cannot, and why a purchase of an *undistressed* short bill cannot either.
::: hint
Which price enters bank net worth, and which rate is already against the bound?
:::
::: solution
Bank net worth includes the mark-to-market on the long or private asset. Buying that asset raises $q$, raises $N$, relaxes the leverage constraint, and expands credit supply — $s$ falls even though $i$ is stuck. A further cut in $i$ is infeasible at the bound, and would in any case not recapitalise the bank if the constraint is on $N$ rather than on the policy rate. A short bill already trades at the bound and is a near-substitute for reserves, so buying it does not raise a distressed $q$ and does not relax $N$. That is the financial-friction case for *targeted* QE, and it is a different channel from the signalling channel of [[business-cycles/zero-lower-bound#def-qe]].
:::
:::
