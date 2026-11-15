A peg that will not last is not always a peg that has already run out of reserves. Sometimes the arithmetic of domestic credit growth makes collapse a matter of time, and the attack merely brings the date forward. Sometimes the peg could have lasted if it had been expected to last, and collapses because it is expected to collapse. Sometimes the currency is the surface of a banking problem, or of a sovereign that cannot roll its debt. This chapter is those three layers — **first-, second- and third-generation** crisis models — plus sudden stops and sovereign default. The even-handed rule is the same as in the euro-area chapter: fundamentals and panic are both mechanisms, and a given episode usually has both. Illustrative numbers are invented. Historical dates and magnitudes are sourced. None of this is a forecast of a crisis or advice to take a position.

## First generation: inconsistent policies

Krugman (1979), following Salant and Henderson on gold, modelled a peg that is inconsistent with the growth of domestic credit. Reserves drain, and at a perfectly foreseeable date they would hit zero. Speculators do not wait: they attack when the **shadow floating rate** — the $E$ that would prevail if the peg were abandoned today — crosses the peg. The attack is run on remaining reserves, and it is *rational*, not a mood.

::: definition Shadow floating rate {#def-shadow}
In a first-generation setting the central bank pegs $E=\bar E$ while domestic credit $D$ grows at a constant rate. Money-market equilibrium is $M/P = L(Y,i)$, $M = R + D$, and under a subsequent float PPP and UIP pin $E$ to $M$. The **shadow rate** $E^{\text{sh}}$ is the floating $E$ that would prevail, given today's $D$, if $R$ were already zero (so $M=D$). While $E^{\text{sh}} < \bar E$ the peg is cheap relative to the shadow; while $E^{\text{sh}} > \bar E$ the peg is expensive and is attacked.
:::

::: proposition Timing of the attack {#prop-attack}
Assume PPP $P = E P^*$ with $P^*=1$, money demand $M = \theta E$ (so $L$ is proportional to $P$, with $Y$ and $i$ fixed), $M=R+D$, and $D_t = D_0 + \mu t$ with $\mu>0$. The peg is $\bar E$. Then $E^{\text{sh}}_t = D_t/\theta$, and the attack occurs at $t^*$ defined by $D_{t^*}/\theta = \bar E$, i.e. $t^* = (\theta\bar E - D_0)/\mu$, provided $R$ is still positive at that date under the no-attack path. At $t^*$ remaining reserves jump to zero; $E$ does not jump, because the shadow equals the peg. After $t^*$, $E$ depreciates at rate $\mu/\theta$.
:::

::: proof
Under a float with $R=0$, $M=D$ and $M=\theta E$, so $E=D/\theta = E^{\text{sh}}$. If agents waited until $R=0$ along the no-attack path, $R_t = \theta\bar E - D_t$ would hit zero at the same $t^*$ (because $M=\theta\bar E$ while the peg holds). An attack *after* $t^*$ would mean $E^{\text{sh}} > \bar E$: a capital gain for anyone who had already sold domestic money. An attack *before* $t^*$ would mean $E^{\text{sh}} < \bar E$: a capital *loss* for anyone who sold. Only at $t^*$ is the attack a wash on $E$ and a grab of the remaining $R$. That is the unique perfect-foresight date.
:::

The attack is not a panic. It is the date at which defending the peg has become inconsistent with the money market. The fundamental is $\mu>0$: domestic credit growing faster than money demand at the peg.

::: example Palmia's first-generation clock {#ex-first}
$\theta = 1/2$, $\bar E = 240$, $D_0 = 80$, $\mu = 8$ per period, $R_0 = 40$. While the peg holds, $M = \theta\bar E = 120$, so $R_t = 120 - D_t = 40 - 8t$. (a) When does $R$ hit zero if nobody attacks early? (b) When is $E^{\text{sh}}=\bar E$? (c) What is $R$ at $t^*$?
::: solution
(a) $40-8t=0$ at $t=5$. (b) $E^{\text{sh}}=D/\theta=2D$, set equal to $240$: $D=120$, $80+8t=120$, $t=5$. The two dates coincide in this specification, as the proof said. (c) $R_{t^*}=0$ along the no-attack path; the attack at $t^*$ is the last conversion, which *is* the exhaustion of $R$. If money demand depended on $i$, and $i$ jumped at the collapse because expected depreciation became $\mu/\theta$, the attack would come *earlier*, while $R$ was still positive: speculators would grab the remaining $R$ at the moment $E^{\text{sh}}$ crossed $\bar E$, and $R$ would jump from a positive number to zero. That is the Salant–Henderson–Krugman timing in the version with a jump in $L$. The example keeps $L$ constant to make the clock visible: five periods, $R$ falling $8$ per period.
:::
:::

::: widget plot
f: 240; 2*(80+8*x)
sliders: m=8:4:12
x: 0, 8
y: 0, 400
labels: \text{peg } \bar E; \text{shadow } E^{\mathrm{sh}}
caption: The peg is $240$. The shadow is $E^{\mathrm{sh}}=2(80+m x)$. Drag credit growth $m$. The crossing is $t^*$. A faster $\mu$ brings the attack forward. Invented units, first-generation algebra.
:::

## Second generation: multiple equilibria

Obstfeld (1994, 1996) modelled a government that *can* defend a peg but may *choose* not to, because defence is costly (high $i$, unemployment) when the peg is under pressure. If markets expect defence, $i$ stays at $i^*$, the cost is low, and the peg is kept. If markets expect abandonment, $i$ must rise to defend, the cost is high, and the government abandons. Both are equilibria. The attack is self-fulfilling. Fundamentals still matter: they determine the *range* in which multiple equilibria exist. Outside that range the peg is either impregnable or doomed, as in the first generation.

::: definition Escape-clause peg {#def-second}
A **second-generation** (escape-clause) crisis is a peg defended by a government with a loss function that trades off the cost of abandoning (inflation, lost reputation) against the cost of defending (high $i$, low $Y$). There is a range of fundamentals — for example of unemployment, or of debt — in which the peg survives if it is expected to survive and falls if it is expected to fall. An attack in that range is a **self-fulfilling** switch of equilibrium, not a first-generation exhaustion of $R$.
:::

The ERM crisis of 1992 is the episode the model was built to fit. The United Kingdom left the ERM on 16 September 1992 (Black Wednesday) with reserves still available and with a government that had a choice. Unemployment was high, the ERM parity was a constraint on $i$, and once selling started, defence became more expensive. Sweden, Italy and Spain were in the same storm. First-generation arithmetic (a $\mu>0$ that had already spent $R$) is a poor description of the UK in 1992; an escape clause under stress is a better one. That is not a finding that fundamentals were fine: UK membership at $2.95$ DM per pound was a tight real constraint after German unification had raised German $i^*$. The multiple-equilibrium range is *about* fundamentals.

::: example A two-equilibrium loss {#ex-second}
The government loses $L_{\text{keep}} = u + \alpha(i-i^*)$ if it keeps the peg and $L_{\text{float}} = C$ (a fixed exit cost) if it floats. Under no attack, $i=i^*$ and $L_{\text{keep}}=u$. Under attack, defence requires $i=i^*+\delta$. The government keeps the peg if $L_{\text{keep}} \le C$. Let $u=3$, $\alpha=1$, $\delta=4$, $C=5$. (a) Is the peg kept if there is no attack? (b) If there is an attack? (c) What if $C=8$?
::: solution
(a) No attack: $L_{\text{keep}}=3 < 5=C$, so the peg is kept. (b) Attack: $L_{\text{keep}}=3+4=7 > 5$, so the government floats. Both (a) and (b) are equilibria: the peg is kept if it is expected to be kept, and abandoned if it is expected to be abandoned. (c) If $C=8$, even the attack gives $L_{\text{keep}}=7<8$, so the peg is kept in both cases — impregnable. If $u$ were $6$, even no-attack would give $L_{\text{keep}}=6>5$, so the peg is doomed without any panic. The multiple-equilibrium *window* is the middle of fundamentals. Panic is not an alternative to fundamentals; it is a mechanism that operates in a band of them.
:::
:::

::: warning "Self-fulfilling" is not "uncaused"
A second-generation attack still needs a reason to coordinate on the bad equilibrium: a bump in $u$, a neighbouring country's exit, a political event. The model says that *once* coordination has happened, the attack validates itself. It does not say that attacks arrive as sunspots in an empty landscape. Journalistic use of "pure panic" as the opposite of "fundamentals" erases the band in which both words apply.
:::

## Third generation: balance sheets and twin crises

The 1997–98 Asian crises — Thailand, Indonesia, Korea, Malaysia — did not look like Krugman's 1979 $\mu>0$, and they only partly looked like Obstfeld's escape clause. Corporate and bank balance sheets had large *foreign-currency* liabilities against *local-currency* assets. A depreciation, or even the prospect of one, made those balance sheets insolvent, which made banks stop lending, which made $Y$ fall, which made the peg harder to keep. McKinnon and Pill, Krugman (1999), Chang and Velasco, and Corsetti, Pesenti and Roubini are the papers; Kaminsky and Reinhart (1999, *American Economic Review*) named **twin crises**: banking and currency together, each feeding the other.

::: definition Balance-sheet crisis {#def-third}
A **third-generation** crisis is one in which a depreciation (or a rise in $i$) destroys net worth because of a currency or maturity mismatch, and the destruction of net worth feeds back onto $Y$ and onto the financial account. **Original sin** (Eichengreen, Hausmann and Panizza) is the inability of a country to borrow abroad in its own currency, which *creates* the currency mismatch. A **twin crisis** is the joint occurrence of a banking crisis and a currency crisis.
:::

Sudden stops (Calvo 1998) are the capital-account version: $FA^{\mathrm{in}}$ reverses, $CA$ must jump toward surplus, and at a given $E$ that jump is a collapse of absorption. If $E$ moves, the balance-sheet channel of [[#def-third]] can make the depreciation contractionary, the opposite of Mundell–Fleming's $NX$ channel. Which channel wins is empirical. For Mexico 1994, Thailand 1997, Korea 1997, Argentina 2001 and the 2008 emerging-market stop, both channels are in the narrative (IMF *World Economic Outlook* crisis chapters; Reinhart and Rogoff, *This Time Is Different*, 2009).

::: example A mismatch {#ex-mismatch}
A Palmia firm has local-currency assets of $100$ and dollar liabilities of $\$40$. $E=2$ palms per dollar, so the liability is $80$ palms and net worth is $20$. A sudden stop forces $E$ to $3$. (a) New net worth? (b) If the firm is a bank and a capital rule requires net worth of at least $10$ per cent of assets, is the bank still above the rule? (c) Why might this depreciation cut $Y$ even though $NX$ wants to rise?
::: solution
(a) Liabilities become $3\times 40=120$ palms; net worth is $100-120=-20$. The firm is insolvent. (b) Net worth is negative, so no. (c) Insolvent firms do not invest; banks with negative capital do not lend. $I$ and $C$ fall. The $NX$ channel still wants a rise in net exports, but if the contraction of absorption and of credit is larger, $Y$ falls. That is a contractionary depreciation, and it is why "let $E$ go" is not a costless first-generation prescription when the private sector is short dollars.
:::
:::

::: quiz
A first-generation attack occurs when
- [ ] unemployment is high enough that the government chooses to float
- [x] the shadow floating rate crosses the peg, given inconsistent domestic credit growth
- [ ] banks' foreign-currency liabilities exceed their local assets
- [ ] the current account is in deficit
::: solution
[[#prop-attack]]. High unemployment is second generation; currency mismatch is third; a current-account deficit is a typical backdrop, not the first-generation trigger.
:::
:::

## Sovereign default

A government that cannot (or will not) meet its debt service **defaults**. Eaton and Gersovitz (1981) modelled default as a strategic choice under incomplete markets, with exclusion from borrowing as the punishment. Arellano (2008) and the quantitative sovereign-debt literature added output costs and a market-access price that already contains the default probability. Reinhart and Rogoff (2009) documented eight centuries of defaults, restructurings and "this time is different" claims.

Default is not the same as a currency crisis, but they travel together when the debt is in foreign currency or when the banks hold the debt (the doom loop of [[international-finance/monetary-unions]]). Greece 2012 was a restructuring inside a monetary union; Argentina 2001 was a default plus the end of convertibility; Russia 1998 was both. The even-handed split is again fundamentals versus panic: a debt/GDP path that violates the intertemporal budget of [[international-finance/current-account]] at any plausible primary surplus is a solvency event; a jump in spreads that makes a previously rollable debt un-rollable is a liquidity event, a second-generation cousin. Distinguishing them *ex ante* is the whole difficulty of official lending (IMF programmes, ESM). *Ex post*, Greece's 2012 haircut is hard to tell as pure liquidity, and Ireland's 2010 programme is hard to tell as a Greece-like solvency event at the sovereign level — it was a bank-solvency event socialised.

::: example A sudden stop's arithmetic {#ex-stop}
Palmia has $CA = -20$, financed by $FA^{\mathrm{in}} = +20$, at $Y=1000$. A stop sets $FA^{\mathrm{in}}=0$ and, in the very short run, $E$ is still pegged. (a) What must $CA$ become? (b) If the marginal propensity to import is $0.2$ and $NX = \overline{NX} - 0.2 Y$ with no other adjustment, what $Y$ makes $CA=0$ (treat $CA=NX$)? (c) Why might a float *or* a contractionary depreciation both be possible next?
::: solution
(a) $CA=0$, immediately, if $R$ cannot take the hit. (b) $NX=0=\overline{NX}-0.2Y$. Originally $NX=-20=\overline{NX}-0.2\times 1000$, so $\overline{NX}=180$ and $0=180-0.2Y$, $Y=900$. Output falls $100$ to close a $20$ deficit at an MPI of $0.2$. (c) If $E$ is freed, Mundell–Fleming says depreciation raises $\overline{NX}$ and *saves* some $Y$. If firms are short dollars, [[#ex-mismatch]] says the same depreciation cuts $I$ and can *add* to the fall in $Y$. Which way $Y$ moves is then empirical, not a theorem of either generation alone.
:::
:::

::: application IMF programmes
The IMF lends to members with balance-of-payments needs, with conditionality, from quota resources and, in large crises, from borrowed resources. Whether a programme is a solvency fix (primary surplus, structural reform) or a liquidity backstop (a bigger number, less conditionality, to kill a bad equilibrium) is the same dispute as Account A versus Account B. The 2010 Greek programme was criticised from one side for being too soft on solvency and from the other for being too hard on a liquidity event (IMF *Ex Post Evaluation of Exceptional Access*, 2013, is unusually frank). This course records the dispute. It does not settle it.
:::

## Evidence

**Reinhart and Rogoff.** *This Time Is Different* (2009) tabulates currency crashes, banking crises, sovereign defaults and inflation crises as recurrent events, often in waves. The book is a catalogue, not a forecasting model, and its 90-per-cent-debt threshold (in a later paper) was criticised for spreadsheet and sample issues (Herndon, Ash and Pollin, *Cambridge Journal of Economics*, 2014). The catalogue of *crises* stands; the threshold as a policy number does not, for this course.

**Kaminsky–Reinhart twins.** Banking crises lead currency crises more often than the reverse in their 1970–1995 sample. Third-generation logic predicts that lead: a weak bank is a reason to expect devaluation, which then realises the mismatch.

**Sudden stops.** Calvo, Izquierdo and Mejía (2004, NBER) and later papers document stops concentrated in emerging markets with large current-account deficits and large $FA^{\mathrm{in}}$ of a short-term, dollar-denominated kind. Advanced-economy stops are rarer but not impossible (the euro-area periphery 2010–2012 is a stop inside a union).

**1994, 1997, 2001, 2008.** Mexico's tequila crisis had a devalued peg, a weak bank system and a stop. Asia 1997 had mismatches, short-term dollar debt, and (in Korea and Thailand) a peg or a tight crawl. Argentina 2001 had a currency board that had produced a real appreciation and a sovereign that could not grow out of dollar debt. 2008 was a global run on wholesale funding, with emerging-market $E$ moves as a sideshow of a core-banking event. Each episode has a fundamentals paragraph and a panic paragraph. Writing only one of them is incomplete.

**Low- and middle-income cases.** Kenya 1993, Nigeria's repeated naira crashes, Ghana's 2014–16 and 2022 debt distress, Sri Lanka 2022, and Zambia 2020 are in the IMF's programme history and in Reinhart–Rogoff's tables. The models of this chapter were not written only for middle-income East Asia. Commodity-price falls play, for some of these, the role that $\mu>0$ or a stop plays in the textbook: a fundamental that can push the country into the multiple-equilibrium band, or through it.

::: intuition Three clocks
First generation: a slow clock, $D_t$, that makes the date calculable. Second generation: a fast clock, coordination, that can skip to the end of the first clock's path. Third generation: a balance-sheet clock, $E$ times dollar debt, that can make even a *successful* float costly. A crisis narrative that uses only one clock will mis-time the event and mis-assign the blame.
:::

::: widget cobweb
g: 0.3+1.4*x*(1-x)
x0: 0.2
steps: 25
x: 0, 1
y: 0, 1
caption: A logistic map as a toy of two regimes. At this $r=1.4$ in $x\mapsto 0.3+1.4 x(1-x)$ the iteration settles; raise the idea (in your head) of a higher slope and the same map can cycle. It is not a calibrated crisis model. It is a picture of how a map can have a quiet path and a jumpy path. First-generation clocks are the quiet path until $t^*$; second-generation switches are the jump.
:::

The cobweb is a metaphor, labelled as such. The logistic is not Krugman's $D_t$.

## Where this leads

Crisis models assume a regime; the menu of regimes was [[international-finance/exchange-rate-regimes]]. Sovereign default is an intertemporal-budget event: [[international-finance/current-account]]. The euro-area case is [[international-finance/monetary-unions]]. The IMF as an institution, and the system's capacity to supply a lender of last resort in the reserve currency, is [[international-finance/international-monetary-system]].

::: history
Krugman's 'A Model of Balance-of-Payments Crises' (*JMCB*, 1979) is the first-generation paper; Flood and Garber (1984) is the linear version used in classrooms. Obstfeld's 'The Logic of Currency Crises' (1994) and 'Models of Currency Crises with Self-Fulfilling Features' (1996, *European Economic Review*) are the second generation. The 1992 ERM crisis is their empirical prompt. The 1997–98 Asian crises prompted the third generation: Kaminsky and Reinhart (1999) on twins; Krugman (1999); Chang and Velasco; Corsetti, Pesenti and Roubini. Calvo named sudden stops in 1998. Eaton and Gersovitz (1981) is the modern strategic-default starting point; Reinhart and Rogoff (2009) is the long-run catalogue.
:::

::: summary
- First generation: inconsistent $D$ growth, a shadow rate, an attack at $t^*$ that exhausts $R$. The attack is rational timing, not a mood.
- Second generation: an escape clause, a band of fundamentals, two equilibria. Panic is the switch, not the absence of fundamentals.
- Third generation: currency or maturity mismatch, contractionary depreciation, twin crises, original sin. Sudden stops force $CA$ to reverse at whatever $Y$ and $E$ will bear.
- Sovereign default can be solvency (intertemporal budget) or liquidity (rollover, self-fulfilling spreads), and often both. Official lending sits in that dispute.
- Episodes (1992, 1994, 1997, 2001, 2008, 2010, 2022) typically need more than one generation of model. Using only one is a narrative choice, not a finding.
:::

## Exercises

::: exercise Shadow equals peg {level=1 check="5"}
In [[#ex-first]], enter $t^*$.
::: solution
$D_{t^*}=120$, $80+8t=120$, $t^*=5$.
:::
:::

::: exercise Reserve path {level=1 check="0"}
Along the no-attack path of that example, enter $R$ at $t=5$.
::: solution
$R=40-8\times 5=0$.
:::
:::

::: exercise Mismatch net worth {level=1 check="-20"}
In [[#ex-mismatch]], after $E$ goes to $3$, enter net worth.
::: solution
$100-120=-20$.
:::
:::

::: exercise Second-generation keep or float {level=2 check="7"}
In [[#ex-second]], under attack, enter $L_{\text{keep}}$.
::: solution
$u+\alpha\delta=3+4=7$, which exceeds $C=5$, so the government floats.
:::
:::

::: exercise First-generation $\mu$ {level=2 check="4"}
Keep $\theta=1/2$, $\bar E=240$, $D_0=80$, but now $t^*=10$. Enter the $\mu$ that makes $D_{t^*}=\theta\bar E$.
::: solution
$\theta\bar E=120=80+10\mu$, so $10\mu=40$, $\mu=4$. Slower credit growth delays the attack.
:::
:::

::: exercise Which generation? {level=2}
For each, name the generation that is the *best first model*, and one fact that would make you add a second model. (a) A peg with domestic credit growing 15 per cent a year, money demand stable, $R$ falling for three years. (b) A peg with ample $R$, high unemployment, and a collapse the week after a neighbour floats. (c) A crawl, dollar corporate debt equal to 40 per cent of GDP, and a 30 per cent depreciation that bankrupts the corporate sector.
::: solution
(a) First generation; add second if the collapse date jumps on a political announcement while $R$ is still large relative to $D$ growth. (b) Second generation; add first if you then find that $D$ had been growing inconsistently for years and $R$ was already near the shadow-rate crossing. (c) Third generation; add first or second for *why* $E$ moved that 30 per cent (inconsistent policy, or a self-fulfilling attack that then hits the mismatch).
:::
:::

::: exercise Attack with a jump in $L$ {level=3}
Suppose money demand is $M = \theta E(1-\gamma i)$ and, under the peg, $i=i^*$. After collapse, expected depreciation is $\mu/\theta$ and $i = i^*+\mu/\theta$. Show that the attack occurs while $R>0$, i.e. earlier than the date at which $R$ would have hit zero with $i$ still at $i^*$. (Verbal plus the inequality on $M$ is enough.)
::: hint
At collapse $i$ rises, so $L$ falls, so the $M$ that can be supported at $\bar E$ falls, so the $R=M-D$ still needed is smaller — speculators grab the gap.
:::
::: solution
While the peg holds, $M_{\text{peg}} = \theta\bar E(1-\gamma i^*)$. After collapse, at the same $E=\bar E$ (no jump in $E$ at $t^*$), $M_{\text{float}} = \theta\bar E\bigl(1-\gamma(i^*+\mu/\theta)\bigr) < M_{\text{peg}}$. The money market at $t^*$ therefore wants a *smaller* $M$ the instant $i$ jumps. The difference $M_{\text{peg}}-M_{\text{float}}$ is dumped on the central bank as a reserve loss *in addition* to the trend drain. Hence $R$ jumps from a positive level to zero at $t^*$, and $t^*$ is defined by $E^{\text{sh}}=\bar E$ using post-collapse $L$, which is an earlier date than $R=0$ along the no-attack path. That is why textbooks say the attack occurs while reserves are still strictly positive, once $L$ depends on $i$.
:::
:::

::: exercise Solvency versus liquidity {level=3}
A sovereign has debt of $100$, all due next year, and a present value of primary surpluses of $90$ at the risk-free rate, or $70$ at the rate that includes a default premium of the size currently in the market. (a) Is the sovereign solvent at the risk-free rate? (b) At the default-inclusive rate? (c) Why is this a second-generation cousin, and what would a lender of last resort have to do to pick an equilibrium?
::: hint
Compare $100$ with each present value. Then ask which rate is used if markets expect default.
:::
::: solution
(a) No: $90<100$. Even at the risk-free rate the intertemporal budget fails. This is a solvency event (Account A). (b) Also no, more so: $70<100$. (c) Change the numbers: suppose the present value is $110$ at the risk-free rate and $80$ at the default-inclusive rate. Then the sovereign is solvent if it is expected to be solvent (can roll at the risk-free rate) and insolvent if it is not (must pay the penalty rate, which makes $80<100$). That is a multiple-equilibrium debt crisis, the second-generation cousin. A lender of last resort that lends at the risk-free rate, in size, can make the good equilibrium incentive-compatible — *if* the risk-free present value is above $100$. If it is below, the LOLR is paying a transfer, not picking an equilibrium. Greece 2012 and Ireland 2010 sit at different points on that line; the arithmetic of this exercise is the line, not a verdict on either country.
:::
:::
