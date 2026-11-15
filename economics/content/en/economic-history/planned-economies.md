From the 1920s to the 1980s, a large fraction of the world’s population lived in economies that tried to replace markets with a plan: the Soviet Union after 1928, Eastern Europe after 1945, China from the 1950s, and a longer list of countries that borrowed the instruments (five-year plans, state trading, industrial licences) without copying the whole Soviet kit. This chapter is about what planning did — the industrialisation it delivered, the shortages and famines it produced, the information problem that Hayek and Lange argued over, and the two great transitions out of planning, China’s from 1978 and the Soviet bloc’s from 1989. The tone is the course’s: measured, sourced, and unwilling to treat “planning failed” or “planning industrialised” as the whole story.

Allen (2003), *Farm to Factory*, is a useful, contested assessment of Soviet growth: a rapid rise in GDP per capita from a poor 1928 base, at a high cost in consumption, coercion and lives, and a later slowdown as the extensive model ran out. China’s path is not a copy: the famine of 1959–61 is among the worst in recorded history; the post-1978 reforms produced the largest catch-up in this course. The two transitions — gradual dual-track in China, rapid liberalisation in much of Eastern Europe and the former Soviet Union — are the natural experiment of the 1990s, and they do not yield a single ranking.

## What a plan is

A **planned economy**, in the textbook sense, is one in which a central authority sets quantities of outputs and inputs, allocates investment, and sets prices that are often accounting devices rather than market-clearing signals. The Soviet Five-Year Plans from 1928, Gosplan, and the material-balance method are the canonical machinery. Lange (1936–37) argued that a socialist planner could mimic Walrasian equilibrium by trial-and-error price adjustment. Hayek (1945) replied that the knowledge that markets use is dispersed, tacit and changing, and that prices communicate it in a way a bureau cannot.

::: definition Material balance {#def-balance}
A **material balance** is an accounting identity for a good: planned output plus imports plus rundown of stocks equals planned uses (intermediate, investment, consumption, exports, stockbuild). Soviet planning iterated these balances across thousands of goods. The identity can hold on paper while the goods fail to appear, or appear at the wrong quality, because the plan does not have to clear a market.
:::

::: definition Soft budget constraint {#def-soft}
Kornai (1980, 1992) called a **soft budget constraint** the expectation of a state-owned firm that losses will be covered by subsidies, cheap credit or tax relief. The firm then does not respond to prices as a textbook profit-maximiser would: it hoards inputs, bargains for a slack plan, and invests with too little fear of bankruptcy. Shortage, in Kornai’s economics, is not only a price that is set too low; it is a chronic demand for inputs by firms that cannot fail.
:::

The information and incentive problems are distinct. Even a well-meaning planner who wanted the Walrasian allocation would need information that firms have no reason to reveal (Hayek). Even a planner who had the information would face firms that, under a soft budget, do not minimise cost (Kornai). A third problem is political: the planner’s objective is not a representative household’s welfare. Soviet investment was skewed toward heavy industry and the military; Chinese campaigns (the Great Leap, the Cultural Revolution) overrode even the plan.

::: proposition Shortage with a soft budget {#prop-shortage}
If a firm’s demand for an input is $x(p, B)$ with $\partial x/\partial B > 0$, and the effective budget $B$ is expected to expand whenever $px > R$ (revenue), then there need be no $p$ that clears the input market. Rationing and queues are then equilibrium phenomena, not only transitional.
:::
::: proof
A hard budget sets $B = R$ and yields an ordinary demand curve, which can meet supply at some $p$. A soft budget makes $B$ endogenous: the firm’s demand does not fall when $p$ rises, or falls too little, because extra outlays will be covered. The demand curve does not intersect supply, or intersects only at a price the planner will not set. Quantity rationing must then allocate the input. Kornai’s shortage economy is this configuration, not a one-time mis-set price.
:::

::: example A steel balance {#ex-steel}
A planner sets steel output at 100, intermediate use at 60, investment at 25, consumption (households, repairs) at 10, and exports at 5. (a) Does the balance close? (b) If firms, expecting a soft budget, demand 80 as intermediate use, what must give? (c) Why might measured GDP still rise?
::: solution
(a) Uses sum to 100, so the paper balance closes. (b) Intermediate use of 80, with output 100, leaves 20 for investment, consumption and exports combined, against a planned 40. Investment projects stall, consumption is rationed, or stocks are run down. (c) Because GDP, in a planned economy, is often measured from the output side at plan prices. Steel that is produced and then wasted in an unfinished project still counts. Rising GDP and chronic shortage can coexist; they did.
:::
:::

## Soviet growth, famine and slowdown

The Soviet Union in 1928 was a poor, largely agrarian economy that had not yet recovered all of its 1913 output (Allen 2003; Maddison). The First Five-Year Plan (1928–32) and collectivisation forced a rise in the investment share, a transfer of grain from the countryside, and a collapse of livestock. The famine of 1932–33, including the Holodomor in Ukraine, killed millions; Davies and Wheatcroft (2004) put excess deaths in the USSR in a range of about 5–7 million for 1930–33, with scholarly debate around the regional totals. That is not a growth-accounting residual. It is a fact about the industrialisation.

From the mid-1930s to the 1960s, Soviet GDP grew fast by the standards of a poor country, with a large rise in industrial output, urbanisation, and, after 1945, reconstruction and a military-industrial complex. Maddison Project Database 2023 and the earlier CIA and Bergson estimates disagree on *levels* — Soviet statistics over-reported, and Western reconstructions try to correct — but they agree on a **slowdown** from the 1970s: the investment rate stayed high, TFP growth fell, and consumer shortages remained. Allen’s assessment is that the extensive model (more capital, more labour out of agriculture) worked until it did not, and that a market reform in the 1970s might have done better than the system that continued until 1991. The counterfactual is not identified; the slowdown is in the data.

Eastern Europe after 1945 copied the model with local variation: more trade with the Soviet Union (CMEA), less of a 1930s famine, and, in East Germany and Czechoslovakia, an already industrial base. Yugoslavia’s worker-managed variant and Hungary’s 1968 New Economic Mechanism are reminders that “the bloc” was not one price vector. Growth was rapid in the 1950s and slower from the 1970s, in parallel with the Soviet path (Crafts and Toniolo; Maddison).

::: warning Do not read a five-year-plan percentage as TFP
Soviet reported “gross output” growth is not GDP, not value added, and not quality-adjusted. Steel tonnes can rise while the steel is the wrong grade. Bergson, the CIA, and later researchers spent careers converting those percentages into something like Western national accounts. When a sentence says “the USSR grew at 6 per cent in the 1950s”, ask whose series, which years, and whether it is GDP or industrial gross output.
:::

::: example Extensive growth that stalls {#ex-extensive}
A planned economy raises $K$ at 8 per cent a year, $L$ at 1.5 per cent, with $\alpha = 0.4$. TFP growth is 2 per cent in the 1950s and 0 in the 1970s. (a) What is $g_Y$ in each decade? (b) What is $g_Y - g_L$? (c) Why might TFP fall toward zero as the economy industrialises under this model?
::: solution
(a) 1950s: $g_Y = 0.4\times 8 + 0.6\times 1.5 + 2 = 3.2 + 0.9 + 2 = 6.1$ per cent. 1970s: $3.2 + 0.9 + 0 = 4.1$ per cent. (b) 4.6 per cent then 2.6 per cent. (c) Because the easy transfers of labour from farms are exhausted, because copied techniques have been copied, because the incentive and information problems bind more as the product mix becomes more complex, and because military and heavy-industry bias wastes resources that a market would not allocate that way. The arithmetic of (a) does not name the cause; it names the slowdown.
:::
:::

## China: leap, famine, reform

China’s planned industrialisation, after 1949, produced a heavy-industry base, a rural commune system, and, in 1958–62, the Great Leap Forward. Excess deaths in the famine of 1959–61 are estimated in a range of about 15–30 million (Ashton, Hill, Piazza and Zeitz 1984; Peng 1987; Dikötter 2010 is toward the upper end; Chinese demographic reconstructions sit in the range). Grain output collapsed; the communes and procurement, together with weather and a collapse of incentives, are the mechanisms. Sen’s entitlements approach, developed for other famines, has a Chinese counterpart: food was exported and procured while people starved.

From 1962 to 1976 the economy recovered, was disrupted by the Cultural Revolution, and remained poor. The Maddison Project Database 2023 puts Chinese GDP per capita around 1,060 international dollars (2011 prices) in 1960 and 1,510 in 1973 — not a golden age, and a level still comparable to a poor developing country.

December 1978, the Third Plenum, is the conventional start of reform: the household responsibility system in agriculture, dual-track prices, township and village enterprises (TVEs), special economic zones, and a gradual opening to trade and foreign investment. Growth of GDP in the 1980s and 1990s was of the order of 8–10 per cent a year (official figures are higher than some Western reconstructions such as Wu 2014; the order of magnitude of a miracle is not in doubt). Poverty, on the World Bank’s lines, fell by hundreds of millions of people (World Bank WDI; Ravallion and Chen). This is catch-up, not a planned-economy success: the plan was what was being exited.

::: definition Dual-track reform {#def-dual}
**Dual-track reform** (Lau, Qian and Roland 2000) keeps a plan quota at the old plan price and allows firms and households to sell the *above-quota* output at a market price. At the margin, decisions are market decisions, while the infra-marginal quota protects existing rents and avoids a big-bang redistribution. China’s 1980s industrial reform is the leading case.
:::

::: example A dual-track grain quota {#ex-dual}
A household must deliver 10 units of grain at a plan price of 1, and can sell extra grain at a market price of 3. Marginal cost is $MC = 0.2 q$. (a) How much grain does the household produce? (b) What would it produce if the whole crop had to be sold at the plan price? (c) Why does (a) not require privatising the land on day one?
::: solution
(a) At the margin the household faces price 3, so $0.2 q = 3$, $q = 15$. It delivers 10 at price 1 and sells 5 at price 3. (b) $0.2 q = 1$ gives $q = 5$, below the quota; meeting the quota at the plan price would require producing at $MC > 1$, a loss. In practice procurement was coercive. (c) Because the household already controls the residual, at the margin, of output above the quota. Land *use* rights under the household responsibility system were enough to raise output; full alienable private property came later, incompletely. The example is the logic of Lau, Qian and Roland: get the marginal price right first.
:::
:::

## Two transitions, 1978 and 1989

China’s transition was sequential, experimental, and politically tightly controlled: agriculture first, then TVEs, then urban industry, then WTO accession in 2001. Output did not collapse. Eastern Europe and the former Soviet Union, after 1989, mostly liberalised prices, privatised, and opened trade quickly (“shock therapy” associated with Lipton and Sachs, and with Balcerowicz in Poland). Output collapsed, in some countries by 20–40 per cent in the early 1990s, then recovered unevenly (Poland and the Baltics earlier; Russia later, after 1998; Ukraine still more slowly). Mortality in Russia rose sharply in the 1990s (a large demographic literature: Notzon et al.; later work by Brainerd and Cutler, and by Stuckler and others, with causal claims that remain disputed).

Why the difference? Several candidates, not exclusive. China was still largely agrarian in 1978, so the first reform (household farming) raised food output and released labour; the USSR was already industrial and urban, so there was no such easy win. China kept the Communist Party and a capacity to tax and to invest; several post-Soviet states had a collapse of fiscal capacity and of law. China used the dual track; Russia liberalised prices before a hard budget constraint was in place, producing a burst of inflation (1992) and asset-stripping. World prices: China opened onto a booming East Asian market; Russia opened onto a 1990s commodity slump, then an oil boom. A student who writes “gradualism always dominates shock therapy” has to explain Poland; a student who writes the reverse has to explain China. The honest summary is that initial conditions, state capacity and the *sequence* of reforms matter, and that GDP in 1995 is not the welfare of 2010.

::: quiz
Lau, Qian and Roland’s dual-track argument is that
- [ ] all prices should be liberalised on a single day
- [x] if the plan quota is kept but extra output can be sold at market prices, marginal decisions are efficient without an immediate big-bang redistribution
- [ ] soft budget constraints are desirable in the transition
- [ ] China grew because it remained a pure planned economy after 1978
::: solution
The dual track liberalises *at the margin* while protecting infra-marginal rents. China did not remain a pure planned economy; the plan’s share of output shrank through the 1980s and 1990s.
:::
:::

::: example A 1990s output collapse {#ex-collapse}
A stylised post-Soviet economy produces 100 in 1990. In 1992, 20 per cent of measured 1990 output is negative-value-added at world prices (the firm’s inputs cost more in dollars than its output fetches), and a further 15 per cent is lost to disrupted supply chains and unpaid wages. (a) What is 1992 output if those two pieces disappear? (b) Why might welfare fall by less than GDP? (c) Why might welfare fall by more?
::: solution
(a) $100 - 20 - 15 = 65$, a 35 per cent fall. (b) If the 20 per cent was genuinely negative-value-added, scrapping it *raises* true net output even as measured GDP at old plan prices falls; queues shrink. (c) Because unemployment, unpaid pensions, a collapse of health spending and a rise in mortality (Russia) are not in GDP, and because the 15 per cent supply-chain loss includes goods people still needed. GDP at world prices, GDP at plan prices, and welfare need not move together in a transition year.
:::
:::

::: application Russia’s 1990s mortality {#app-mortality}
Russian male life expectancy fell from about 64.5 years in 1989 to about 57–58 in the mid-1990s (Human Mortality Database; official Goskomstat figures in that neighbourhood). Alcohol, the collapse of health systems, unemployment and a sense of dislocation are the leading correlates. Attributing the entire rise to “shock therapy” or to “communism’s hangover” is more politics than identification. The demographic fact belongs in the economic history; the exclusive causal slogan does not.
:::

::: widget plot
f: 3; 1; 0.2*x
x: 0, 20
y: 0, 8
labels: \text{market price}; \text{plan price}; \text{MC}=0.2q
caption: Illustrative dual track for [[#ex-dual]]. Marginal cost is $0.2q$ (the $x$-axis is $q$). The plan price is the horizontal at 1; the market price is the horizontal at 3. Production goes to where MC meets the market price ($q=15$), not to where it meets the plan price ($q=5$). The quota of 10 is infra-marginal. Parameters are illustrative.
:::

## Where this leads

Planning is the twentieth century’s large experiment in replacing markets. The post-1978 Chinese path is the bridge to late industrialisation ([[economic-history/late-industrialisation]]). The Soviet collapse is a shock to the 1990s world economy and to the energy market. Development economics inherits the debate over industrial policy, state-owned enterprises and dual tracks ([[development-economics/structural-change]]). Growth theory inherits the extensive-versus-intensive distinction ([[economic-growth/technology-and-growth-accounting]]).

::: history
**1928, First Soviet Five-Year Plan.** Stalin’s industrialisation and collectivisation begin. **1936–45, Oskar Lange and Friedrich Hayek.** Lange’s market-socialism articles and Hayek’s “Use of Knowledge in Society” (1945) state the calculation debate in its modern form. **1959–61, Great Leap famine.** Tens of millions of excess deaths in China. **1978, Third Plenum.** Deng Xiaoping’s reforms begin. **1989–91, end of Communist rule in Eastern Europe and of the USSR.** The 1990s transition follows. **1992, János Kornai.** *The Socialist System* synthesises the shortage economy and the soft budget constraint.
:::

::: summary
- Planning replaces market-clearing prices with material balances. Hayek’s information problem and Kornai’s soft budget constraint are distinct reasons the balances do not deliver a Walrasian allocation.
- Soviet GDP rose fast from a poor 1928 base, at a high cost in consumption and in the 1932–33 famine, and slowed from the 1970s as extensive growth and TFP faded (Allen 2003; Maddison Project).
- China’s Great Leap famine (1959–61) is among the worst on record. Post-1978 dual-track reform produced catch-up growth of the order of 8–10 per cent a year and a historic fall in poverty (World Bank).
- The 1990s output collapse in much of the former Soviet bloc, and China’s lack of collapse, are not a simple score for gradualism: Poland versus Russia versus China differ in initial conditions and state capacity.
- Reported plan percentages are not TFP. Use reconstructed GDP (Bergson, CIA, Maddison Project, Wu) and say so.
- Shortage and rising measured output can coexist when GDP is counted at plan prices and firms cannot fail.
:::

## Exercises

::: exercise A material balance {level=1 check="5"}
Output of a good is 80, intermediate use 50, investment 20, consumption 10, exports 5, imports 10. What is the implied stockbuild (can be negative)? (Enter the integer.)
::: solution
Sources: $80+10=90$. Uses excluding stockbuild: $50+20+10+5=85$. Stockbuild $= 90-85 = 5$.
:::
:::

::: exercise Extensive arithmetic {level=1 check="4.1"}
$g_K = 8$, $g_L = 1.5$, $\alpha = 0.4$, $g_A = 0$. What is $g_Y$ in per cent? (Enter one decimal place.)
::: solution
$0.4\times 8 + 0.6\times 1.5 = 3.2 + 0.9 = 4.1$.
:::
:::

::: exercise Dual-track output {level=1 check="15"}
$MC = 0.2q$, market price $3$, plan quota $10$ at price $1$. If the household is free at the margin, what is $q$? (Enter the output.)
::: solution
$0.2q = 3$, $q = 15$. The quota is infra-marginal.
:::
:::

::: exercise Hayek versus Lange {level=2}
In a paragraph, state Lange’s claim and Hayek’s reply, and say which of Kornai’s soft budgets is a *third* problem rather than a restatement of Hayek.
::: solution
Lange claimed that a planner could announce prices, observe excess demands, and adjust, mimicking Walras. Hayek replied that the knowledge of particular circumstances is not a set of excess-demand numbers a firm would truthfully report, and that the market’s communication is the price system itself. Kornai’s soft budget is a third problem: even if the planner had Hayek’s knowledge, a firm that expects to be bailed out does not treat prices as hard constraints, so the trial-and-error process does not map onto a profit-maximising excess-demand function. Information and incentives both fail; fixing one does not fix the other.
:::
:::

::: exercise Why China did not collapse in 1979 {level=2}
Give two reasons, rooted in economic structure rather than in slogans about gradualism, why Chinese GDP did not fall in the early reform years the way Soviet GDP fell in 1991–95.
::: solution
(a) China in 1978 was still heavily agrarian; the household responsibility system raised grain output quickly (a level effect in the largest sector). The USSR was already urban and industrial; there was no such sectoral win, and price liberalisation hit an industrial structure full of negative-value-added firms. (b) China kept a functioning fiscal and party hierarchy able to invest and to enforce contracts at the local level (TVEs); several post-Soviet states had a collapse of tax collection and of law, so that liberalisation occurred in a vacuum of enforcement. Sequence (agriculture first, dual track) and state capacity, not the word “gradual”, are the mechanisms.
:::
:::

::: exercise Famine and GDP {level=2}
Why is a year of famine a problem for a GDP-per-capita *growth rate* between 1952 and 1978 as a measure of planning’s success in China?
::: solution
A growth rate from 1952 to 1978 *averages through* 1959–61. Survivors’ output in 1978 divided by 1952, annualised, treats millions of deaths as a change in the denominator and ignores the welfare of the dead. Even as a survivors’ consumption measure, the path is not smooth: a collapse and rebound can produce a moderate average rate that no household lived. Report the famine, then report growth in 1962–78 or 1978–2000 as separate episodes.
:::
:::

::: exercise Soft budgets and investment {level=3}
A firm has profit $\Pi = p f(x) - r x + S$, where $S$ is an expected subsidy that covers any loss: $S = \max\{0, r x - p f(x)\}$. (a) Show that the firm is willing to expand $x$ without regard to $r$ whenever $\Pi$ would otherwise be negative. (b) Why does this produce shortage of $x$ in Kornai’s sense? (c) What reform hardens the budget?
::: hint
If losses are fully covered, the firm’s payoff cannot go below zero, and extra $x$ is free on the downside.
:::
::: solution
(a) If $p f(x) < r x$, then $S$ makes $\Pi = 0$ regardless of $x$. Extra input does not lower the firm’s payoff, so demand for $x$ is unbounded (or bounded only by rationing). If $p f(x) > r x$, $S=0$ and the firm behaves ordinarily. (b) Input demand does not fall with $r$ in the loss-making region, so the input market does not clear by price; inputs are rationed and hoarded. (c) A hard budget: no $S$, or a credible bankruptcy, or a banking system that will not automatically roll over losses. China’s TVEs faced harder budgets than state-owned enterprises in the 1980s, which is one reason they were the dynamic sector; SOE reform in the 1990s was, in part, an attempt to harden the rest.
:::
:::

::: exercise Compare two transitions {level=3}
In 400–600 words, compare Poland (rapid liberalisation, early recovery) with Russia (rapid liberalisation, deep collapse) and China (gradual dual track, no collapse). What does the comparison do to a one-dimensional “shock versus gradualism” debate? Use initial conditions and state capacity.
::: solution
A fair essay looks like this. Poland in 1990 combined a Balcerowicz price liberalisation with a still-intact state, a prospective EU anchor, and a smaller military-industrial overhang than Russia’s. Output fell, then recovered in the early 1990s; inflation was high and then came down. Russia in 1992 liberalised prices in an economy whose tax system, legal system and ruble zone were breaking up; privatisation (loans-for-shares later in the decade) occurred before a hard budget or a securities regulator existed; GDP contracted sharply and mortality rose. China liberalised at the margin from 1978, from an agrarian base, under an intact party-state, and did not privatise the commanding heights first. A one-dimensional ranking — shock is better, or gradualism is better — cannot fit all three. Poland is an existence proof that rapid liberalisation *can* be followed by recovery when the state remains capable and the industrial structure is not Russia’s. Russia is an existence proof that rapid liberalisation *can* be a collapse when those conditions fail. China is an existence proof that a dual track *can* raise output without a 1990s-style contraction, from a different starting point. The comparison points to state capacity, the agrarian share, and sequence, not to a slogan. GDP in 1995 is also not the end: Russia’s 2000s oil boom and China’s 2001 WTO accession change the 2010 picture again.
:::
:::
