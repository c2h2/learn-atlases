A litre of bottled water and a litre of branded cola can cost very different amounts, even when the bottles sit on the same shelf and the water inside is chemically similar. The difference is not a puzzle about thirst. It is a puzzle about **market structure**: how many firms sell a product, how easily a new firm could start selling it, and how close the products are as substitutes. In a market that looks like [[microeconomics/competitive-markets]], price is pinned to marginal cost and no firm earns more than a normal return on capital. In a market with few sellers and a product that buyers treat as distinctive, a firm can hold price above marginal cost for years. That gap is **market power**. This chapter is about measuring both the structure and the power, and about the intellectual history that turned those measurements into a research programme.

Industrial organisation (IO) inherited from Marshall a picture of an “industry” as a collection of firms making a similar good. It inherited from Chamberlin and Robinson the observation that most firms face a downward-sloping demand curve of their own. It inherited from Bain a list of reasons why new firms might not rush in when incumbents are profitable. The structure–conduct–performance (SCP) tradition of the mid-twentieth century treated those ingredients as a causal chain: structure determines how firms behave, and behaviour determines profits, prices and welfare. The Chicago critique of the 1960s and 1970s reversed the arrows, arguing that high concentration often reflects efficiency rather than collusion. The game-theoretic reconstruction that followed — the subject of the rest of this course — kept the questions and replaced the reduced-form regressions with explicit models of pricing, entry and contracts. Before we build those models we need the vocabulary they share.

## Relevant markets

Any number we compute — a concentration ratio, a mark-up, a welfare loss — is a number *for a market*. Drawing the boundary is therefore not a preliminary detail; it is part of the analysis. A market that is drawn too narrowly makes every firm look large; a market drawn too widely makes a monopolist look like a speck.

::: definition Relevant market {#def-relevant-market}
A **relevant market** for a product (or group of products) and a geographic area is the smallest set of products and locations such that a hypothetical profit-maximising monopolist over that set would find it profitable to impose a small but significant and non-transitory increase in price (a **SSNIP**), typically taken to be 5 per cent lasting a year, holding constant the prices of goods outside the set. The test is applied starting from the candidate product and adding the next-best substitutes until the SSNIP becomes profitable.
:::

The SSNIP test, written into the US Department of Justice and Federal Trade Commission *Horizontal Merger Guidelines* of 1992 and carried, with variations, into the 2010 Guidelines, the 2023 Merger Guidelines, the European Commission’s 1997 *Notice on the definition of relevant market* (revised in 2024) and Chinese merger-review practice under the Anti-Monopoly Law, is a thought experiment, not a laboratory procedure. It asks: if all the goods in this candidate set were controlled by one firm, could that firm raise price by 5 per cent without losing so many buyers that the increase would not pay? If the answer is no, the market is too narrow — buyers would switch to something we have left out. If the answer is yes, we have a candidate relevant market.

Two caveats come with the definition. First, the starting price matters. If the candidate firms are already pricing as a monopoly, a further 5 per cent increase may be unprofitable even though the market is no broader than those firms: this is the **cellophane fallacy**, named after *United States v. E. I. du Pont de Nemours & Co.* (351 U.S. 377, 1956), in which the Supreme Court treated du Pont’s cellophane as competing with a wide range of wrapping materials at the high prices du Pont was already charging. Second, the test is about demand-side substitution in the first instance. Supply-side substitution — the ability of firms currently making something else to switch capacity quickly — enters some jurisdictions’ market definition and others’ analysis of entry, but it is a different question.

::: example A SSNIP on bottled water {#ex-ssnip}
A city has two bottled-water brands, Aqua and Brook, and a cola brand, Fizz. At current prices of 1 unit of money per bottle, weekly quantities are 40 (Aqua), 40 (Brook) and 80 (Fizz). A consulting study estimates that a 5 per cent increase in both water prices, with the cola price held fixed, would cut water sales by 8 per cent in total and would not change unit costs. Is {Aqua, Brook} a relevant market under a 5 per cent SSNIP?
::: solution
Current joint water revenue is $80 \times 1 = 80$. After the SSNIP the water price is $1.05$ and quantity is $0.92 \times 80 = 73.6$, so revenue is $1.05 \times 73.6 = 77.28$. Unit costs are unchanged, so the change in joint profit equals the change in joint revenue, $77.28 - 80 = -2.72$. The SSNIP *lowers* joint profit. {Aqua, Brook} is therefore too narrow: enough buyers switch (presumably to Fizz) that the two water firms, acting as a hypothetical monopolist, would not raise price by 5 per cent. The candidate market must be enlarged.
:::
:::

In applications the 5 per cent threshold, the one-year horizon and the treatment of supply-side substitution are institutional conventions, not theorems. What the definition contributes is a discipline: a market is a set of products for which market power is a coherent idea.

## Concentration

Once a market is named, the next question is how concentrated it is. Two families of index are in standard use.

::: definition Concentration ratio and HHI {#def-hhi}
Let $s_i$ be firm $i$’s share of market sales (or of capacity, or of a physical quantity — the unit must be stated), with $s_i \ge 0$ and $\sum_i s_i = 1$. The **$n$-firm concentration ratio** is
$$
\mathrm{CR}_n = \sum_{i=1}^{n} s_{(i)},
$$
where $s_{(1)} \ge s_{(2)} \ge \cdots$ are the shares in decreasing order. The **Herfindahl–Hirschman index** is
$$
\mathrm{HHI} = \sum_{i} s_i^2.
$$
In competition-policy documents the HHI is usually reported on a 0-to-10,000 scale, that is as $\sum_i (100 s_i)^2$. A market of $N$ equal firms has $\mathrm{HHI} = 1/N$ (or $10{,}000/N$ on the 0–10,000 scale).
:::

$\mathrm{CR}_4$ was the workhorse of the SCP literature because it could be read off published censuses. The HHI uses the whole distribution: a market with shares $(0.7, 0.1, 0.1, 0.1)$ and a market with shares $(0.25, 0.25, 0.25, 0.25)$ have the same $\mathrm{CR}_4 = 1$ but Herfindahl indices of $0.52$ and $0.25$ respectively. The HHI also has a direct link to Cournot competition, derived in [[#prop-cournot-hhi]] below and used again in [[industrial-organisation/cournot-bertrand]].

::: example Four-firm shares {#ex-hhi}
A relevant market has five firms with sales shares 30, 25, 20, 15 and 10 per cent. Compute $\mathrm{CR}_4$ and the HHI on the 0–10,000 scale. If the firms with 20 and 15 per cent merge, and shares of the others are unchanged, what are the post-merger HHI and the increment $\Delta\mathrm{HHI}$?
::: solution
$\mathrm{CR}_4 = 30 + 25 + 20 + 15 = 90$ per cent. The pre-merger HHI is
$$
30^2 + 25^2 + 20^2 + 15^2 + 10^2 = 900 + 625 + 400 + 225 + 100 = 2{,}250.
$$
After the merger the shares are 35, 30, 25 and 10 per cent, so
$$
\mathrm{HHI}' = 35^2 + 30^2 + 25^2 + 10^2 = 1{,}225 + 900 + 625 + 100 = 2{,}850.
$$
The increment is $600$. That is not an accident: when firms with shares $s$ and $t$ merge, $\Delta\mathrm{HHI} = 2st$ on the 0–1 scale and $2 \times (100s) \times (100t)$ on the 0–10,000 scale, here $2 \times 20 \times 15 = 600$. The formula is the only extra term in $\sum s_i^2$ when $s$ and $t$ are replaced by $s+t$.
:::
:::

::: widget plot
f: 10000/x
x: 1, 20
y: 0, 10000
labels: \mathrm{HHI}=10000/N
caption: The HHI of a market of $N$ equal firms, on the 0–10,000 scale used in merger guidelines. Drag along the curve: two equal firms give 5,000; five give 2,000; ten give 1,000. Real markets lie above the curve, because inequality among firms raises $\sum s_i^2$ relative to $1/N$.
:::

The US *Horizontal Merger Guidelines* of 2010 classified markets with HHI below 1,500 as unconcentrated, 1,500–2,500 as moderately concentrated, and above 2,500 as highly concentrated; a merger that raised the HHI by more than 200 points in a highly concentrated market was presumed likely to enhance market power. The 2023 Merger Guidelines lowered the highly-concentrated threshold to 1,800 and the corresponding increment to 100, and added a share-based presumption when the merged firm’s share exceeds 30 per cent and $\Delta\mathrm{HHI}$ exceeds 100. The European Commission’s 2004 *Guidelines on the assessment of horizontal mergers* treat a post-merger HHI below 1,000 as usually unproblematic, and also a post-merger HHI between 1,000 and 2,000 with $\Delta\mathrm{HHI}$ below 250, or above 2,000 with $\Delta\mathrm{HHI}$ below 150, subject to exceptions. These thresholds are screens, not legal conclusions; [[industrial-organisation/competition-policy]] returns to how they are used.

::: warning Concentration is not market power
A high HHI can coexist with a price equal to marginal cost — two firms producing a homogeneous good and competing in prices is the leading case, derived in [[industrial-organisation/cournot-bertrand]]. A low HHI can coexist with a large gap between price and marginal cost, if products are differentiated, if capacity is tight, or if a fringe of small firms does not constrain a price leader. Concentration is a property of the *distribution of shares*. Market power is a property of the *gap between price and marginal cost*. The two are linked in some models and not in others; treating a concentration number as a welfare conclusion is the characteristic error of a purely structural approach.
:::

## Market power and the Lerner index

::: definition Market power and the Lerner index {#def-lerner}
A firm has **market power** in a market if it can profitably set a price above the marginal cost of supplying the good. For a single-product firm charging a uniform price $p$ with marginal cost $c(q)$ at the chosen output $q$, the **Lerner index** is
$$
L = \frac{p - c(q)}{p}.
$$
$L = 0$ at a competitive (price-taking) optimum with $p = c(q)$; $L$ approaches 1 as the mark-up becomes arbitrarily large relative to price. The index is unit-free.
:::

Market power so defined is a positive concept: it describes a feasible, profitable action. It is not a finding that the firm has broken a statute, nor a finding that welfare would rise if the firm were forced to a different price. Those are separate questions, taken up in [[industrial-organisation/monopoly-pricing]] and [[industrial-organisation/competition-policy]].

The link between the Lerner index and demand is the first calculation of the course, and it will be used constantly.

::: proposition Inverse-elasticity (Lerner) rule {#prop-lerner}
A single-product firm that maximises profit $\pi(q) = p(q)\,q - C(q)$, where $p(q)$ is a differentiable inverse demand with $p'(q) < 0$ and $C$ is a differentiable cost function, and that chooses an interior quantity $q > 0$ at which $p(q) > 0$, satisfies
$$
\frac{p - C'(q)}{p} = \frac{1}{\lvert\varepsilon(q)\rvert}, \qquad \varepsilon(q) = \frac{p(q)}{q\, p'(q)}.
$$ {#eq-lerner}
Equivalently, $\varepsilon(q) = p/(q\, p'(q))$ is the price elasticity of demand along the inverse-demand curve (negative), and $L = -1/\varepsilon$. The firm never operates on the inelastic portion of demand: $\lvert\varepsilon\rvert \ge 1$ at an interior optimum.
:::

::: proof
Differentiate $\pi(q) = p(q)q - C(q)$:
$$
\pi'(q) = p(q) + q p'(q) - C'(q).
$$
An interior maximum requires $\pi'(q) = 0$, so $p + q p' = C'$. Divide by $p > 0$:
$$
1 + \frac{q p'}{p} = \frac{C'}{p} \implies \frac{p - C'}{p} = -\frac{q p'}{p} = -\frac{1}{\varepsilon} = \frac{1}{\lvert\varepsilon\rvert},
$$
since $\varepsilon < 0$. If $\lvert\varepsilon\rvert < 1$ then $-1/\varepsilon < -1$, so $p - C' < -p$, hence $C' > 2p > 0$ would still leave $\pi'(q) = p(1 + 1/\varepsilon) - C' < 0$ whenever $C' \ge 0$ and $\lvert\varepsilon\rvert < 1$, because $1 + 1/\varepsilon < 0$. More directly: on the inelastic portion a small price *increase* raises revenue and reduces cost, so profit cannot be maximal. Thus $\lvert\varepsilon\rvert \ge 1$ at any interior optimum with non-negative marginal cost.
:::

The left-hand side of [[#eq-lerner]] is the relative mark-up; the right-hand side says it is large when demand is inelastic and small when demand is elastic. A firm facing $\lvert\varepsilon\rvert = 2$ sets $p = 2\,C'$; a firm facing $\lvert\varepsilon\rvert = 5$ sets $p = \tfrac54 C'$. As $\lvert\varepsilon\rvert \to \infty$ the firm is a price taker and $L \to 0$, which is the competitive case of [[microeconomics/competitive-markets]].

::: widget plot
f: 1/x; 0*x
x: 1.05, 8
y: 0, 1
labels: L=1/\lvert\varepsilon\rvert; L=0
caption: The Lerner index of a profit-maximising single-product firm as a function of the absolute demand elasticity (horizontal axis). At $\lvert\varepsilon\rvert = 1$ the index is 1 (the firm would want a still higher price if $\lvert\varepsilon\rvert$ fell below 1). At $\lvert\varepsilon\rvert = 2$, $L = 1/2$; at $\lvert\varepsilon\rvert = 5$, $L = 0.2$. The competitive benchmark $L = 0$ is the horizontal axis. There is no slider: the curve is the first-order condition itself.
:::

::: example A linear inverse demand {#ex-linear-lerner}
Inverse demand is $p = 12 - q$ and marginal cost is constant at $c = 2$. Find the profit-maximising quantity and price, the elasticity at that point, and the Lerner index. Confirm [[#eq-lerner]].
::: solution
Revenue is $R = (12 - q)q = 12q - q^2$, so marginal revenue is $12 - 2q$. Setting $12 - 2q = 2$ gives $q = 5$, $p = 7$. Elasticity along $p = 12 - q$ is $\varepsilon = p/(q p') = 7/(5 \cdot (-1)) = -1.4$, so $\lvert\varepsilon\rvert = 1.4$ and $1/\lvert\varepsilon\rvert = 5/7$. The Lerner index is $(7-2)/7 = 5/7$. The two sides of [[#eq-lerner]] match. The same numbers reappear as the monopoly benchmark in [[industrial-organisation/monopoly-pricing]].
:::
:::

A multi-product firm, or a firm that also chooses quality, advertising or a two-part tariff, has a richer first-order condition; the single-product uniform-price formula is the reference point against which those extensions are judged.

::: quiz
A firm with constant marginal cost $c = 10$ faces a demand elasticity of $-4$ at its current price. If it is maximising profit, what is its price?
- [ ] $10$, because $L$ must be zero
- [ ] $12.5$
- [x] $13.\overline{3}$
- [ ] $40$
::: solution
[[#eq-lerner]] says $(p-10)/p = 1/4$, so $1 - 10/p = 1/4$, hence $10/p = 3/4$ and $p = 40/3 = 13.\overline{3}$. The price $12.5$ would be right for $\lvert\varepsilon\rvert = 5$; the price $40$ would be right for $\lvert\varepsilon\rvert = 4/3$. Price equal to cost would require infinite elasticity.
:::
:::

## From structure–conduct–performance to games

The SCP programme, associated with Edward S. Mason at Harvard in the 1930s and with Joe S. Bain’s *Barriers to New Competition* (1956) and *Industrial Organization* (1959), organised empirical work as a regression of performance (price–cost margins, accounting rates of return) on structure (CR$_4$, advertising intensity, capital requirements) across industries. The typical finding of the 1950s and 1960s was a positive partial correlation between concentration and profitability. Bain interpreted the correlation as evidence that concentration facilitated collusion and that entry barriers protected the resulting rents.

::: definition Entry barrier (Bain) {#def-bain-barrier}
On Bain’s definition, an **entry barrier** is an advantage of established sellers in an industry over potential entrants, which is reflected in the extent to which established sellers can persistently raise their prices above a competitive level without attracting new firms to enter the industry. Bain’s three classes were economies of scale, absolute cost advantages of incumbents, and product differentiation.
:::

George Stigler’s *The Organization of Industry* (1968) proposed a narrower definition: a barrier is a cost that must be borne by an entrant but is not borne by incumbents. On that definition, economies of scale are not a barrier unless the incumbent somehow avoids a cost the entrant must pay; they are a property of technology that affects incumbents and entrants alike. The definitional dispute is not semantic. It decides whether a concentrated industry that is concentrated *because* efficient scale is large relative to demand is a policy problem. SCP, using Bain’s definition, tended to say yes. The Chicago school, using Stigler’s, tended to say no unless a specific exclusionary practice could be shown.

Harold Demsetz (1973) added an efficiency interpretation of the concentration–profit correlation itself: if some firms are more efficient, they grow, the industry becomes more concentrated, and the efficient firms earn rents. A regression of industry-average profits on industry concentration then picks up the efficiency rents, not collusion. The implication, which Demsetz drew and which later work made operational, is that the correlation should be re-estimated with *firm-level* data, and that the profits of small firms in concentrated industries are the informative ones: if collusion is the story, the small firms benefit too; if efficiency is the story, they do not.

The game-theoretic turn of the 1970s and 1980s did not abolish these questions. It insisted that “conduct” be written as a strategy in a game whose rules (timing, information, strategy sets, payoff functions) are stated, so that the mapping from structure to performance is a theorem rather than a coefficient. Cournot and Bertrand cease to be rival intuitions and become Nash equilibria of two different games ([[industrial-organisation/cournot-bertrand]]). Entry deterrence becomes a commitment problem ([[industrial-organisation/entry-and-deterrence]]). Collusion becomes a repeated-game incentive constraint ([[industrial-organisation/collusion]]). The SCP regressions remain a source of stylised facts; they are no longer the theory.

One formal bridge between concentration and mark-ups is worth stating here, because it is the SCP correlation with an explicit game underneath.

::: proposition Cournot mark-up and the HHI {#prop-cournot-hhi}
Suppose $N$ firms produce a homogeneous good, inverse demand $p(Q)$ is differentiable and decreasing, firm $i$ has cost $C_i(q_i)$, and firms play a Cournot–Nash game in quantities. At an interior equilibrium,
$$
\sum_{i=1}^{N} s_i L_i = \frac{\mathrm{HHI}}{\lvert\varepsilon(Q)\rvert},
$$ {#eq-cournot-hhi}
where $s_i = q_i/Q$, $L_i = (p - C_i'(q_i))/p$, $\mathrm{HHI} = \sum_i s_i^2$, and $\varepsilon(Q)$ is the market demand elasticity. If all firms have the same constant marginal cost, this collapses to $L = \mathrm{HHI}/\lvert\varepsilon\rvert$.
:::

::: proof
Firm $i$ maximises $p(Q_{-i} + q_i)\, q_i - C_i(q_i)$. The first-order condition is $p + q_i p'(Q) - C_i' = 0$, or $L_i = - s_i (Q p'/p) = s_i/\lvert\varepsilon\rvert$. Multiply by $s_i$ and sum: $\sum_i s_i L_i = (\sum_i s_i^2)/\lvert\varepsilon\rvert$. If $C_i' = c$ for all $i$ then $L_i = L$ for all $i$ and $L = \mathrm{HHI}/\lvert\varepsilon\rvert$.
:::

[[#eq-cournot-hhi]] is the SCP idea made exact *inside the Cournot model*. It is not a free-standing empirical law. Under Bertrand competition with homogeneous products and equal constant costs, $L = 0$ however large the HHI is, provided $N \ge 2$. Under product differentiation the right-hand side involves a matrix of elasticities, not a single $\varepsilon$. The proposition is a reason to *care* about the HHI when quantity competition is a reasonable description; it is not a reason to treat the HHI as a sufficient statistic for welfare.

::: intuition Why shares are squared
A Cournot firm’s mark-up is proportional to its own share, because a larger firm internalises more of the price effect of its output. Weighting those mark-ups by shares to get an industry average therefore squares the shares. The HHI is not an arbitrary inequality index in this model; it is the share-weighted average of the own-share terms that appear in the first-order conditions.
:::

::: example Cournot HHI with equal firms {#ex-cournot-hhi}
Five identical Cournot firms face $p = 12 - Q$ and $c = 2$. Compute each firm’s quantity, the market elasticity at equilibrium, the HHI, and the Lerner index, and confirm $L = \mathrm{HHI}/\lvert\varepsilon\rvert$.
::: solution
The $N$-firm Cournot formula with linear demand, derived in [[industrial-organisation/cournot-bertrand]], gives $q_i = (a-c)/(N+1) = 10/6 = 5/3$, $Q = 25/3$, $p = 12 - 25/3 = 11/3$. Elasticity is $\varepsilon = p/(Q p') = (11/3)/((25/3)\cdot(-1)) = -11/25$, so $\lvert\varepsilon\rvert = 11/25$. The HHI on the 0–1 scale is $5 \times (1/5)^2 = 1/5$. Then $\mathrm{HHI}/\lvert\varepsilon\rvert = (1/5)/(11/25) = 5/11$. The Lerner index is $(11/3 - 2)/(11/3) = (5/3)/(11/3) = 5/11$. The identity holds. (On the 0–10,000 scale the HHI is 2,000, which is the equal-five-firm value $10{,}000/5$.)
:::
:::

## Evidence

The SCP correlation has been re-estimated with better data, and the last two decades have produced a separate literature on the *evolution* of mark-ups and concentration.

De Loecker, Eeckhout and Unger (2020, *Quarterly Journal of Economics*) estimate firm-level mark-ups for US publicly listed firms from production-function residuals and report a rise in the sales-weighted average mark-up from about 1.21 in 1980 to about 1.61 in 2016. The increase is concentrated in the upper tail: the typical firm’s mark-up moves much less than the sales-weighted average. Autor, Dorn, Katz, Patterson and Van Reenen (2020, *Quarterly Journal of Economics*) document a rise of “superstar” firms — those with high productivity and low labour shares — and a corresponding increase in concentration *within* industries, which they interpret as a reallocation toward more productive firms rather than as a uniform increase in collusion. Grullon, Larkin and Michaely (2019, *Review of Finance*) report that more than 75 per cent of US industries experienced an increase in concentration ratios over 1972–2014.

These papers are not theorems, and they do not all measure the same object. Mark-ups recovered from production functions depend on the assumed technology and on the treatment of overheads; concentration ratios depend on the industry classification (NAICS four-digit is not a relevant market); a rising HHI in a national industry can coexist with falling HHI in a local one, or the reverse. Syverson (2019, *Journal of Economic Perspectives*) surveys the measurement issues and the competing interpretations — falling competition, rising fixed costs and intangible capital, globalisation and the reallocation to superstars — without settling on one.

Outside the United States the picture is mixed and must be dated. The OECD’s *Product Market Regulation* indicators (latest vintage 2018, with a 2023 update in progress) show a long decline in regulatory barriers to entry in network sectors for the median OECD country from the late 1990s to the mid-2010s, with a levelling off thereafter. In China, the Anti-Monopoly Law of 2008 created a merger-review regime whose case load is now among the world’s largest; Brandt, Van Biesebroeck, Wang and Zhang (2017, *American Economic Review*) document substantial productivity dispersion and turnover in Chinese manufacturing over 1998–2007, a pattern closer to Demsetz’s efficiency story than to a static concentrated oligopoly, though that sample ends before the later tightening of competition and platform regulation. In South Africa, the Competition Commission’s published concentration tracker (2021 study of selected sectors) reported CR$_5$ above 70 per cent in several food-processing and communications markets; those are agency figures for named sectors, not estimates of Lerner indices.

Two empirical regularities are robust enough to count as stylised facts, with the sources just given.

- **Mark-ups are heterogeneous.** Within an industry, the distribution of estimated $p/c$ is wide; industry averages hide that spread (De Loecker, Eeckhout and Unger 2020; similar dispersion is a theme of the productivity literature since Syverson 2011, *Journal of Economic Literature*).
- **The mapping from HHI to $L$ is model-dependent.** Cournot gives [[#eq-cournot-hhi]]; Bertrand with homogeneous products does not. Empirical work that treats the HHI as a sufficient statistic for market power is answering a different question from empirical work that estimates mark-ups directly.

::: quiz
Which statement is a theorem of the Cournot model rather than an empirical regularity?
- [ ] US sales-weighted mark-ups rose between 1980 and 2016
- [x] The share-weighted Lerner index equals $\mathrm{HHI}/\lvert\varepsilon\rvert$ at a Cournot–Nash equilibrium
- [ ] High CR$_4$ causes high accounting profitability
- [ ] Economies of scale are an entry barrier
::: solution
[[#prop-cournot-hhi]] is a first-order-condition identity inside the Cournot game. The mark-up trend is an estimate from De Loecker, Eeckhout and Unger (2020). The CR$_4$–profit correlation is an SCP regression, not a theorem, and it has more than one interpretation. Whether scale economies are a barrier depends on the definition ([[#def-bain-barrier]] versus Stigler).
:::
:::

## Where this leads

The rest of the course takes the objects defined here and gives them a mechanism. [[industrial-organisation/monopoly-pricing]] derives the uniform-price monopoly optimum in full, including deadweight loss, and then asks how a firm with market power can do better than a uniform price: discrimination by group, by quantity and by bundling. [[industrial-organisation/cournot-bertrand]] puts $N \ge 2$ firms into a game and shows how the equilibrium mark-up depends on whether the strategy is a quantity or a price. [[industrial-organisation/product-differentiation]] relaxes homogeneity. Entry, collusion, vertical contracts and platforms occupy the middle of the course; [[industrial-organisation/competition-policy]] returns to the SSNIP test, the HHI screens and the Lerner-based tools (upward pricing pressure, merger simulation) as they are used by agencies.

A modelling choice runs through all of this. When we write “a market” we are using [[#def-relevant-market]]. When we write “more concentrated” we are using [[#def-hhi]]. When we write “more market power” we are using [[#def-lerner]]. Keeping the three distinct is the discipline this chapter is for.

::: history
**1838, Antoine Augustin Cournot.** *Recherches sur les principes mathématiques de la théorie des richesses* treats quantity as a continuous variable and solves the duopoly first-order conditions; the $N$-firm extension and the HHI identity of [[#prop-cournot-hhi]] are in the same line of descent.

**1934, Abba Lerner.** “The concept of monopoly and the measurement of monopoly power”, *Review of Economic Studies* 1(3), defines $L = (p-c)/p$ and identifies it with $1/\lvert\varepsilon\rvert$.

**1939–1959, Edward S. Mason and Joe S. Bain.** Mason’s Harvard seminar frames industrial organisation as the study of how market structure shapes performance; Bain’s *Barriers to New Competition* (Harvard University Press, 1956) and *Industrial Organization* (Wiley, 1959) supply the empirical SCP programme and the three-class taxonomy of entry barriers.

**1968–1973, George Stigler and Harold Demsetz.** Stigler’s *The Organization of Industry* (Irwin, 1968) narrows the definition of an entry barrier; Demsetz’s “Industry structure, market rivalry, and public policy” (*Journal of Law and Economics*, 1973) gives the efficiency interpretation of the concentration–profit correlation.
:::

::: summary
- A **relevant market** is a product-and-geography set on which a hypothetical monopolist would impose a small, significant, non-transitory price increase (SSNIP). Drawing it too narrowly inflates shares; drawing it at a monopoly price (the cellophane fallacy) inflates substitution.
- **Concentration** is summarised by $\mathrm{CR}_n$ and by the **HHI** $\sum s_i^2$. Merging firms with shares $s$ and $t$ raises the HHI by $2st$. Guidelines in the US (2010, 2023) and the EU (2004) use HHI screens; the screens are not welfare theorems.
- **Market power** is the ability to set $p > \mathrm{MC}$. The **Lerner index** $L = (p-\mathrm{MC})/p$ equals $1/\lvert\varepsilon\rvert$ at a single-product interior optimum. Firms do not operate on the inelastic portion of demand.
- Under **Cournot**, the share-weighted Lerner index equals $\mathrm{HHI}/\lvert\varepsilon\rvert$. Under homogeneous-product **Bertrand**, $L = 0$ for $N \ge 2$. Concentration and power are distinct.
- The **SCP** tradition read a concentration–profit correlation as collusion plus barriers (Bain). Chicago (Stigler, Demsetz) offered efficiency interpretations and a narrower barrier definition. Game-theoretic IO writes the mapping from structure to performance as the equilibrium of a specified game.
:::

## Exercises

::: exercise Four-firm HHI {level=1 check="3000"}
A relevant market has four firms with sales shares 40, 30, 20 and 10 per cent. Compute the HHI on the 0–10,000 scale. (Enter the integer HHI.)
::: solution
$$
\mathrm{HHI} = 40^2 + 30^2 + 20^2 + 10^2 = 1{,}600 + 900 + 400 + 100 = 3{,}000.
$$
$\mathrm{CR}_4 = 100$ per cent, so the concentration ratio does not distinguish this market from any other four-firm market; the HHI does, because it penalises the 40 per cent leader.
:::
:::

::: exercise Lerner from a price and a cost {level=1 check="0.25"}
A firm sells at $p = 8$ and has constant marginal cost $c = 6$. Compute its Lerner index. (Enter $L$ as a decimal.)
::: solution
$L = (8-6)/8 = 2/8 = 0.25$. If the firm is maximising profit, [[#eq-lerner]] implies $\lvert\varepsilon\rvert = 1/L = 4$ at this point.
:::
:::

::: exercise Price from an elasticity {level=1 check="15"}
A profit-maximising single-product firm has constant marginal cost $c = 9$ and faces demand elasticity $\varepsilon = -2.5$ at its optimum. What price does it charge? (Enter the price.)
::: solution
$(p-9)/p = 1/2.5 = 0.4$, so $1 - 9/p = 0.4$, hence $9/p = 0.6$ and $p = 9/0.6 = 15$. Equivalently $p = c/(1-1/\lvert\varepsilon\rvert) = 9/(1-0.4) = 9/0.6 = 15$.
:::
:::

::: exercise Merger increment {level=2 check="600"}
In the market of the first exercise, the firms with shares 20 per cent and 15 per cent do not exist; instead take shares 30, 25, 20, 15 and 10 per cent. The 20 per cent firm merges with the 15 per cent firm. Compute $\Delta\mathrm{HHI}$ on the 0–10,000 scale. (Enter the increment.)
::: solution
The formula in [[#ex-hhi]] gives $\Delta\mathrm{HHI} = 2 \times 20 \times 15 = 600$. Directly: pre-merger HHI $= 900+625+400+225+100 = 2{,}250$; post-merger shares 35, 30, 25, 10 give $1{,}225+900+625+100 = 2{,}850$; difference $600$. Under the 2010 US *Horizontal Merger Guidelines* a post-merger HHI of 2,850 with an increment of 600 in a highly concentrated market (HHI above 2,500) would have been presumed likely to enhance market power; the 2023 Guidelines use a lower highly-concentrated threshold of 1,800 and an increment of 100. Those are screens, not verdicts.
:::
:::

::: exercise Linear demand Lerner {level=2}
Inverse demand is $p = 20 - 2q$ and $c = 4$ is constant. Find the profit-maximising $q$ and $p$, the elasticity at that point, and $L$. Confirm [[#eq-lerner]].
::: solution
$R = (20-2q)q = 20q - 2q^2$, so $\mathrm{MR} = 20 - 4q$. Setting $20-4q = 4$ gives $q = 4$, $p = 20-8 = 12$. Then $\varepsilon = p/(q p') = 12/(4 \cdot (-2)) = 12/(-8) = -1.5$, so $1/\lvert\varepsilon\rvert = 2/3$. And $L = (12-4)/12 = 8/12 = 2/3$. The identity holds.
:::
:::

::: exercise Cournot identity with two firms {level=2}
Two Cournot firms produce a homogeneous good with $c_1 = 1$, $c_2 = 3$, inverse demand $p = 12 - Q$. (The asymmetric Cournot formula $q_i = (a - 2c_i + c_j)/3$ is derived in [[industrial-organisation/cournot-bertrand]]; you may use it here.) Compute $q_1$, $q_2$, $p$, $s_1$, $s_2$, $L_1$, $L_2$, the HHI on the 0–1 scale, $\lvert\varepsilon\rvert$, and both sides of [[#eq-cournot-hhi]].
::: solution
$q_1 = (12 - 2\cdot 1 + 3)/3 = 13/3$, $q_2 = (12 - 2\cdot 3 + 1)/3 = 7/3$, $Q = 20/3$, $p = 12 - 20/3 = 16/3$. Shares $s_1 = 13/20$, $s_2 = 7/20$. Lerner indices $L_1 = (16/3 - 1)/(16/3) = (13/3)/(16/3) = 13/16$ and $L_2 = (16/3 - 3)/(16/3) = (7/3)/(16/3) = 7/16$. Share-weighted index $\sum s_i L_i = (13/20)(13/16) + (7/20)(7/16) = (169 + 49)/(320) = 218/320 = 109/160$. HHI $= (13/20)^2 + (7/20)^2 = (169+49)/400 = 218/400 = 109/200$. Elasticity $\varepsilon = p/(Q p') = (16/3)/((20/3)\cdot(-1)) = -16/20 = -0.8$, so $\lvert\varepsilon\rvert = 4/5$. Then $\mathrm{HHI}/\lvert\varepsilon\rvert = (109/200)/(4/5) = (109/200)\cdot(5/4) = 109/160$. The two sides match. (Note that $\lvert\varepsilon\rvert = 0.8 < 1$ for *market* demand; each firm’s *residual* elasticity is $1/L_i > 1$. The market can be inelastic while each Cournot firm still faces an elastic residual demand.)
:::
:::

::: exercise A SSNIP that succeeds {level=3}
Two firms sell differentiated gadgets. At current prices of 10 each, quantities are 50 and 50. Unit cost is 6 and is constant. A 5 per cent increase in *both* prices, with everything outside the pair held fixed, cuts each firm’s quantity by 4 per cent. Is the pair a relevant market under a 5 per cent SSNIP? Compute the change in joint profit.
::: hint
Joint profit is $(p-c)(q_1+q_2)$. Compare that object before and after the SSNIP. Revenue is not enough, because cost falls when quantity falls.
:::
::: solution
Before: joint quantity $100$, joint profit $(10-6)\times 100 = 400$. After: price $10.5$, quantity $0.96 \times 100 = 96$, joint profit $(10.5-6)\times 96 = 4.5 \times 96 = 432$. Joint profit *rises* by 32, so the hypothetical monopolist of the pair would impose the SSNIP. The pair is a relevant market under the test of [[#def-relevant-market]]. (The contrast with [[#ex-ssnip]] is the smaller quantity loss and the presence of a cost saving on the lost units.)
:::
:::

::: exercise Bain versus Stigler {level=3}
A chemical plant has a U-shaped average-cost curve with minimum efficient scale equal to 40 per cent of market demand at $p = c_{\min}$. Two incumbents, each at minimum efficient scale, currently charge a price 20 per cent above $c_{\min}$ and earn positive economic profit. A third firm would have to build an identical plant. There is no cost that the incumbents have avoided. (a) Is there an entry barrier on Bain’s definition [[#def-bain-barrier]]? (b) On Stigler’s definition (a cost borne by the entrant but not by incumbents)? (c) What does the Cournot model, with $N$ determined by a sunk entry cost $F$, add to this discussion? Write a short reasoned answer, not a slogan.
::: hint
For (c), think about whether $F$ is a barrier on each definition, and about the distinction between a sunk cost already paid and a sunk cost still to be paid.
:::
::: solution
(a) Yes. The incumbents are persistently above a competitive price without attracting entry, and the reason is scale: a third plant of efficient size would add 40 per cent to capacity in a market that, at the competitive price, supports only two. That is Bain’s scale barrier.

(b) No, on a strict reading of Stigler. The plant cost is the same function for incumbents and the entrant. The incumbents paid it in the past; the entrant would pay it now. If “borne” is read as the cost function, there is no asymmetry. If “borne” is read as a cash outlay still to be made, the sunk cost *is* an asymmetry — which is why later IO (Dixit 1980, and [[industrial-organisation/entry-and-deterrence]]) treats *sunk* capacity, not scale as such, as the commitment that can deter.

(c) In a Cournot model with sunk entry cost $F$, the number of firms is the largest $N$ such that $(p_N - c)q_N \ge F$. Scale (the shape of $C$) and $F$ both affect $N$, and $N$ affects the mark-up by [[#prop-cournot-hhi]]. Whether one calls $F$ a barrier then depends on the definition, but the *equilibrium object* is unambiguous: a larger $F$ means a smaller $N$ and a larger $L$, and the welfare comparison between that equilibrium and a constrained-efficient allocation can be computed without settling the vocabulary. The game, not the label, carries the result.
:::
:::
