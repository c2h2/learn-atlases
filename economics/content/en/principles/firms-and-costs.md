A bakery can sell as many loaves as it likes at the going price of 4 units of money. How many should it bake today? The answer is not “as many as possible” and not “the number that minimises average cost”. It is the number at which the extra cost of one more loaf equals 4, provided that 4 covers the extra cost of the ingredients and the fuel. That rule — **price equals marginal cost** — is the behaviour of a **perfectly competitive** firm, and the extra cost is read off a cost curve that comes from a production function.

This chapter defines production in the short run and the long run, builds total, average and marginal cost, and derives the competitive firm’s supply curve. Monopoly, which faces a downward-sloping demand curve rather than a price, is the next chapter. The cost curves here are the supply side of [[principles/supply-and-demand]] made explicit.

## Production

::: definition Production function {#def-production}
A **production function** $q = f(K, L)$ gives the maximum output obtainable from capital $K$ and labour $L$. In the **short run** at least one input is fixed (usually $K$); in the **long run** all inputs can be varied. The **marginal product** of labour is $\mathrm{MP}_L = \partial f/\partial L$ (the extra output from one more unit of labour, $K$ held fixed). The **average product** is $\mathrm{AP}_L = f(K,L)/L$. **Diminishing marginal product** holds when $\mathrm{MP}_L$ falls as $L$ rises, for $K$ fixed.
:::

Diminishing $\mathrm{MP}_L$ is a short-run claim about crowding a fixed kitchen, not a claim that more labour always produces less. It is the usual source of an upward-sloping marginal cost curve.

::: example A short-run schedule {#ex-mp}
A workshop with a fixed machine has the following output as it adds workers: $L = 0,1,2,3,4,5$ produces $q = 0, 8, 18, 26, 32, 36$. Compute $\mathrm{MP}_L$ of each extra worker and $\mathrm{AP}_L$ at each $L \ge 1$. Where does diminishing MP set in?
::: solution
Marginal products: 8, 10, 8, 6, 4. Average products: 8, 9, $26/3 \approx 8.67$, 8, 7.2. MP rises from the first to the second worker (the two work better as a pair) and diminishes thereafter. AP is maximised at $L = 2$ and then pulled down by the falling MP, a general relationship: AP rises while MP $> $ AP and falls while MP $< $ AP.
:::
:::

**Returns to scale** are a long-run property: if both $K$ and $L$ are multiplied by $t > 1$, output scales by $t$ (constant), by more than $t$ (increasing), or by less (decreasing). A firm can have diminishing MP of labour in the short run and constant returns to scale in the long run; there is no contradiction.

The link from diminishing $\mathrm{MP}_L$ to rising MC is a piece of arithmetic worth seeing once. Suppose labour is the only variable input, hired at a wage $w$ that the firm takes as given. Then $\mathrm{VC} = wL(q)$, where $L(q)$ is the labour needed to produce $q$. Differentiating,

$$
\mathrm{MC}(q) = w\,\frac{\mathrm{d}L}{\mathrm{d}q} = \frac{w}{\mathrm{MP}_L}.
$$ {#eq-mc-mp}

When extra workers add less and less output, each extra unit of output needs more and more labour, and MC rises. A wage rise shifts MC up in proportion; that is the supply shifter “input prices” of [[principles/supply-and-demand]]. The formula also says that MC is measured in units of money per unit of output, as it must be if it is to be compared with a price.

A numerical illustration: $w = 12$ and $\mathrm{MP}_L = 6, 4, 3$ for three successive units of labour. The extra cost of the output those workers produce is $12/6 = 2$, then $12/4 = 3$, then $12/3 = 4$ per extra unit of output (if each worker’s MP is spread over that many units). The sequence 2, 3, 4 is an increasing MC schedule. Nothing in the argument requires that the firm be a competitor; the same cost curves will serve the monopolist in the next chapter. What changes there is the revenue side, not $C(q)$.

In the long run the firm can change $K$ as well. It chooses the mix of $K$ and $L$ that produces a target $q$ at least cost, given the wage and the rental rate of capital, and the resulting $C(q)$ is the long-run cost function. If that function has constant returns, long-run MC is constant and equal to long-run ATC. If there is an efficient scale — a $q$ at which long-run ATC is minimised — competitive firms in the long run are drawn to that scale, which is the $q = 4$ of [[#eq-cost]] in the example below. The algebra of cost minimisation is the subject of [[microeconomics]]; this chapter takes $C(q)$ as given and asks what a price-taking firm does with it.

## Costs

::: definition Cost curves {#def-costs}
**Fixed cost** (FC) does not vary with output in the short run; **variable cost** (VC) does. **Total cost** is $C(q) = \mathrm{FC} + \mathrm{VC}(q)$. **Marginal cost** is $\mathrm{MC}(q) = C'(q)$. **Average total cost** is $\mathrm{ATC}(q) = C(q)/q$, **average variable cost** $\mathrm{AVC}(q) = \mathrm{VC}(q)/q$, and **average fixed cost** $\mathrm{AFC}(q) = \mathrm{FC}/q$. In the long run there is no fixed cost: the **long-run average cost** curve is the lower envelope of short-run ATC curves, each corresponding to a different fixed $K$.
:::

A convenient family, used in the rest of the chapter, is

$$
C(q) = 16 + 4q + q^2.
$$ {#eq-cost}

Then $\mathrm{FC} = 16$, $\mathrm{VC} = 4q + q^2$, $\mathrm{MC} = 4 + 2q$, $\mathrm{AVC} = 4 + q$, $\mathrm{ATC} = 16/q + 4 + q$. AVC is increasing; ATC is U-shaped, with a minimum where $\mathrm{MC} = \mathrm{ATC}$. Setting $4 + 2q = 16/q + 4 + q$ gives $q = 16/q$, so $q^2 = 16$ and $q = 4$ (taking $q > 0$). At $q = 4$, $\mathrm{ATC} = 12 = \mathrm{MC}$.

::: widget plot
f: 4+2*x; 4+x; 16/x+4+x
x: 0.5, 10
y: 0, 30
labels: \text{MC}; \text{AVC}; \text{ATC}
caption: Cost curves from [[#eq-cost]]. MC crosses ATC at ATC’s minimum ($q = 4$, cost $= 12$) and lies above AVC throughout because AVC is rising. AFC is the vertical gap between ATC and AVC; it shrinks as $q$ rises. The competitive firm’s supply curve will be the MC curve above AVC.
:::

::: example Reading the curves {#ex-curves}
For [[#eq-cost]], compute FC, VC, MC, AVC and ATC at $q = 6$. If the firm produces 6, what is the extra cost of the 6th unit, and what is the cost per unit?
::: solution
$\mathrm{VC}(6) = 24 + 36 = 60$, $C(6) = 76$. $\mathrm{MC}(6) = 4 + 12 = 16$. $\mathrm{AVC}(6) = 10$, $\mathrm{ATC}(6) = 76/6 \approx 12.67$. The 6th unit adds 16; the six units together cost about 12.67 each. MC $> $ ATC, so ATC is rising at $q = 6$, which matches the U-shape: the minimum was at 4.
:::
:::

The **sunk** part of FC is not an opportunity cost of producing today, as [[principles/thinking-like-an-economist]] already insisted. If the 16 cannot be recovered by shutting down, it is sunk; if the firm can sell the machine, the sale value is an opportunity cost of staying open and belongs in the shutdown comparison.

## Perfect competition

::: definition Perfect competition {#def-competition}
A market is **perfectly competitive** when firms sell a homogeneous good, are many, have free entry and exit in the long run, and take the price $P$ as given. A competitive firm’s demand curve is horizontal at $P$. Profit is $\Pi(q) = Pq - C(q)$.
:::

::: proposition Price equals marginal cost {#prop-p-mc}
A profit-maximising competitive firm that produces a positive finite output chooses $q$ so that $P = \mathrm{MC}(q)$, with $\mathrm{MC}$ rising. It produces in the short run if $P \ge \min \mathrm{AVC}$, and otherwise shuts down (produces $q = 0$). In the long run it produces only if $P \ge \min \mathrm{ATC}$.
:::

::: proof
$\Pi'(q) = P - C'(q)$. An interior maximum requires $P = \mathrm{MC}(q)$ and $\Pi''(q) = -C''(q) \le 0$, so MC is non-decreasing. If $P < \mathrm{AVC}(q)$ at every $q > 0$, then $Pq < \mathrm{VC}(q)$ and operating adds a further loss to FC; $q = 0$ is better. If $P \ge \min\mathrm{AVC}$, there is a $q$ at which $P = \mathrm{MC}(q)$ and $P \ge \mathrm{AVC}(q)$, so variable cost is covered and the contribution to FC is non-negative. In the long run FC is avoidable, so the comparison is with ATC.
:::

For [[#eq-cost]], $P = 4 + 2q$ gives the candidate $q = (P-4)/2$, provided $P \ge \min\mathrm{AVC}$. Here $\mathrm{AVC} = 4+q$ is minimised, among $q \ge 0$, as $q \to 0$, with infimum 4; for any $P > 4$ the candidate has $\mathrm{AVC} = 4 + (P-4)/2 = (P+4)/2 < P$, so the firm operates. At $P = 4$, $q = 0$. The short-run supply curve is therefore

$$
q^s(P) = \begin{cases} 0 & P < 4, \\ (P-4)/2 & P \ge 4. \end{cases}
$$ {#eq-firm-supply}

::: example A day at $P = 16$ {#ex-p16}
The price is 16. Find output, revenue, cost, profit, and whether the firm should shut down in the short run.
::: solution
$q = (16-4)/2 = 6$. $\mathrm{TR} = 96$. $C(6) = 16 + 24 + 36 = 76$. $\Pi = 20$. AVC at 6 is 10, which is less than 16, so the firm operates. ATC is $76/6 \approx 12.67 < 16$, so profit is positive — the firm more than covers the fixed cost.
:::
:::

::: example A day at $P = 6$ {#ex-p6}
The price is 6. Find the candidate output, profit if it operates, and profit if it shuts down. What should it do in the short run? In the long run?
::: solution
Candidate: $q = (6-4)/2 = 1$. $\mathrm{TR} = 6$, $C(1) = 16 + 4 + 1 = 21$, $\Pi = -15$. AVC $= 5 < 6$, so variable cost is covered: operating loses 15, shutting down loses the whole FC of 16. Operate in the short run. In the long run the 16 is avoidable and $P = 6 < \min\mathrm{ATC} = 12$, so exit.
:::
:::

::: widget plot
f: 4+2*x; 4+x; 16/x+4+x
x: 0.5, 10
y: 0, 30
hlines: 16
labels: \text{MC}; \text{AVC}; \text{ATC}
caption: Cost curves and a market price of 16 (horizontal line). Output is where MC meets that line, at $q = 6$. Imagine lowering the line toward 4: the intersection slides down MC, profit shrinks then turns negative, but the firm keeps operating until the line reaches 4, the infimum of AVC.
:::

::: quiz
A competitive firm has $\min\mathrm{AVC} = 8$ and $\min\mathrm{ATC} = 12$. The market price is 10. In the short run the firm
- [ ] shuts down, because it is making a loss
- [x] operates, because $P$ covers AVC, even though $\Pi < 0$
- [ ] operates and makes a positive profit
- [ ] is indifferent between any output, because $P$ is below ATC
::: solution
$8 < 10 < 12$: price covers variable cost but not average total cost. The firm operates at $P = \mathrm{MC}$ and makes a loss smaller than FC. Positive profit would require $P \ge 12$. Shutting down would throw away the contribution to FC.
:::
:::

## The industry in the short run and the long run

If $n$ identical firms have the supply curve [[#eq-firm-supply]], short-run industry supply is $Q^s = n(P-4)/2$ for $P \ge 4$. Combined with a demand curve, this is the supply of [[principles/supply-and-demand]]. A rise in $n$ shifts industry supply to the right and lowers $P$. A rise in $w$, through [[#eq-mc-mp]], shifts every firm’s MC up and industry supply left; that is why a wage increase in a competitive industry raises the price and cuts the quantity, the fourth case of [[principles/supply-and-demand#prop-shifts]].

Heterogeneous costs change the picture only a little in the short run. Low-cost firms produce more, high-cost firms less or nothing, and industry MC is the horizontal sum of the individual MC curves above each firm’s min AVC. A price that covers the high-cost firm’s AVC but not the low-cost firm’s ATC is entirely possible: profit is a firm-level object. In the long run the high-cost firms are the first to exit, and the remaining firms’ costs determine the long-run price. That selection effect is one reason measured productivity rises in recessions as the least productive plants close, a pattern documented in several manufacturing censuses (see Syverson’s survey, cited below). The short-run supply curve of the industry is then the MC of the plants that are still open.

In the **long run**, free entry drives profit to zero for identical firms with U-shaped ATC: $P = \min\mathrm{ATC}$, here 12, and each firm produces $q = 4$. Industry output is then determined by demand at $P = 12$; $n$ adjusts to make up that output. If demand rises, price rises in the short run, profit appears, entry occurs, and price returns to 12 (in a constant-cost industry, where entry does not bid up input prices). If entry bids up input prices, long-run supply slopes up.

::: warning Minimising ATC is not the short-run objective
A firm that always produced at $\min\mathrm{ATC}$ would ignore the price. At $P = 16$ that rule would say $q = 4$, but $P > \mathrm{MC}(4) = 12$, so the fourth unit is not the last profitable one; units 5 and 6 still have $\mathrm{MC} < 16$. Profit at $q = 4$ is $64 - 48 = 16$, against 20 at $q = 6$. Average cost is a useful long-run benchmark, not a short-run supply rule.
:::

## Evidence

Estimating cost curves is hard because firms do not randomly vary output. Engineering studies of plants, and panel data with demand shifters as instruments, typically find rising MC in the short run and flatter long-run average cost, with economies of scale at low output and, in some industries, diseconomies at very high output. Syverson (2011, *Journal of Economic Literature*) reviews the large productivity differences across plants in the same industry: measured $\mathrm{MP}_L$ and costs are not the same for every firm, which is why the identical-firm model is a starting point, not a description of every market.

Agricultural markets and wholesale commodity markets are the usual illustrations of approximate price-taking. Retail markets with many similar shops are closer to monopolistic competition, the next chapter’s last section. Electricity in a given hour, with a steep short-run MC as capacity is approached, is a textbook short-run supply curve; the long-run curve includes building plants.

::: history
**1931, Jacob Viner.** Viner’s article “Cost Curves and Supply Curves” (*Zeitschrift für Nationalökonomie*) drew the family of short-run ATC curves and their long-run envelope, and popularised the mistake — which he made in an early draft, and which a draughtsman, Y. K. Wong, caught — of drawing the envelope through the bottoms of the short-run curves in a way that was geometrically inconsistent. Marshall had already distinguished the short run from the long run in 1890; Viner made the cost map that undergraduates still draw.
:::

## Where this leads

[[principles/market-power]] gives the firm a downward-sloping demand curve, replaces $P$ with marginal revenue, and keeps the same cost curves. [[microeconomics]] derives $C(q)$ from cost minimisation (Shephard’s lemma, the substitution between $K$ and $L$). [[industrial-organisation]] takes heterogeneous costs and entry seriously. The competitive supply curve is also the MSC curve of [[principles/market-failure]] when there is no externality; that is why $P = \mathrm{MC}$ was efficient in [[principles/markets-and-welfare]].

::: summary
- In the short run some input is fixed and marginal product of the variable input typically diminishes, which makes MC rise.
- FC, VC, MC, AVC and ATC are different views of the same $C(q)$. MC cuts ATC at ATC’s minimum.
- A competitive firm produces at $P = \mathrm{MC}$ if $P \ge \min\mathrm{AVC}$, and shuts down otherwise. Long-run production requires $P \ge \min\mathrm{ATC}$.
- Short-run industry supply is the horizontal sum of firms’ MC curves above AVC. Long-run entry drives $P$ to $\min\mathrm{ATC}$ in a constant-cost industry of identical firms.
- Minimising average cost is not the short-run profit rule; covering variable cost is not the same as making a positive profit.
:::

## Exercises

::: exercise From total cost {level=1}
$C(0) = 16$ and $C(5) = 16 + 20 + 25 = 61$ for [[#eq-cost]]. What is FC? What is VC at $q = 5$?
::: solution
FC $= C(0) = 16$. VC$(5) = 61 - 16 = 45$, which equals $4\times 5 + 25$.
:::
:::

::: exercise Marginal cost {level=1 check="16"}
Using $C(q) = 16 + 4q + q^2$, compute MC at $q = 6$. (Enter MC.)
::: solution
$\mathrm{MC} = 4 + 2q$, so $\mathrm{MC}(6) = 16$. Equivalently, $C(6) = 76$ and $C(5) = 16+20+25 = 61$, so the extra cost of the 6th unit is 15, the discrete analogue; the derivative at 6 is 16.
:::
:::

::: exercise Output at a price {level=1}
If $P = 12$, what output does [[#prop-p-mc]] prescribe for this firm? What is profit?
::: solution
$12 = 4 + 2q$ gives $q = 4$. $C(4) = 16 + 16 + 16 = 48$, $\mathrm{TR} = 48$, $\Pi = 0$. This is the zero-profit point, and $q = 4$ is $\arg\min\mathrm{ATC}$.
:::
:::

::: exercise A profitable price {level=2}
At $P = 18$, find $q$, $\Pi$, and ATC. Confirm $P > \mathrm{ATC}$.
::: solution
$q = (18-4)/2 = 7$. $C(7) = 16 + 28 + 49 = 93$, $\mathrm{TR} = 126$, $\Pi = 33$. $\mathrm{ATC} = 93/7 \approx 13.29 < 18$.
:::
:::

::: exercise Shutdown {level=2}
At $P = 5$, find the candidate $q$ from $P = \mathrm{MC}$, profit if the firm operates, and profit if it shuts down. What does it do in the short run?
::: solution
$q = (5-4)/2 = 0.5$. $C(0.5) = 16 + 2 + 0.25 = 18.25$, $\mathrm{TR} = 2.5$, $\Pi = -15.75$ if it operates. Shutting down: $\Pi = -16$. AVC at $0.5$ is $4.5 < 5$, so operating is slightly better. In the short run, operate (or, in a discrete-unit world, compare $q = 0$ and $q = 1$ directly: at $q = 1$, $C = 21$, $\mathrm{TR} = 5$, $\Pi = -16$, tied with shutting down).
:::
:::

::: exercise Industry supply {level=2}
Ten identical firms have the supply curve [[#eq-firm-supply]]. Write industry supply. If demand is $Q^d = 84 - 2P$, find the short-run equilibrium price and the output of each firm.
::: solution
$Q^s = 10\times(P-4)/2 = 5(P-4)$ for $P \ge 4$. Set $84 - 2P = 5P - 20$: $104 = 7P$, $P = 104/7 \approx 14.86$. Each firm produces $(P-4)/2 = (76/7)/2 = 38/7 \approx 5.43$. Industry output $Q = 10\times 38/7 = 380/7 \approx 54.29$, which matches $84 - 2\times 104/7 = (588 - 208)/7 = 380/7$.
:::
:::

::: exercise Envelope of averages {level=3}
Show that if $\mathrm{MC}(q) < \mathrm{ATC}(q)$, then ATC is decreasing at $q$, and if $\mathrm{MC}(q) > \mathrm{ATC}(q)$, then ATC is increasing. Use the derivative of $C(q)/q$.
::: hint
$\frac{\mathrm{d}}{\mathrm{d}q}(C/q) = (qC' - C)/q^2 = (\mathrm{MC}-\mathrm{ATC})/q$.
:::
::: solution
$\mathrm{ATC}'(q) = \bigl(q\,C'(q) - C(q)\bigr)/q^2 = \bigl(\mathrm{MC}(q) - \mathrm{ATC}(q)\bigr)/q$. For $q > 0$ the denominator is positive, so $\mathrm{ATC}'$ has the sign of $\mathrm{MC}-\mathrm{ATC}$. That is why MC cuts ATC at the bottom of the U, and why the same argument with VC in place of $C$ says that MC cuts AVC at the bottom of AVC.
:::
:::

::: exercise Long-run entry {level=3}
Demand is $Q^d = 84 - 2P$. Firms have the costs [[#eq-cost]], so long-run $P = 12$ and $q = 4$ per firm. (a) How many firms does the industry have in a long-run equilibrium with identical firms and free entry? (b) If demand becomes $Q^d = 108 - 2P$, what is the short-run price with the number of firms from (a) still fixed, using the supply of the previous exercise’s form $Q^s = n(P-4)/2$? (c) What is the new long-run $n$?
::: solution
(a) At $P = 12$, $Q^d = 84 - 24 = 60$. Each firm produces 4, so $n = 15$. (b) With $n = 15$, $Q^s = 15(P-4)/2$. Set $108 - 2P = 15(P-4)/2$. Multiply by 2: $216 - 4P = 15P - 60$, so $276 = 19P$, $P = 276/19 \approx 14.53$. (c) Long-run price returns to 12, $Q^d = 108 - 24 = 84$, $n = 84/4 = 21$. Six firms enter. Short-run $P$ is above 12; long-run $P$ is not, in this constant-cost story.
:::
:::
