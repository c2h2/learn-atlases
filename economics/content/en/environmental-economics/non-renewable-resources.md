A barrel of oil in the ground is an asset. The owner who extracts it today can put the proceeds in the bank and earn interest; the owner who leaves it in the ground earns a capital gain if the net price is rising. In a competitive equilibrium those two returns are equal. That sentence is **Hotelling's rule** (Hotelling 1931), and it is the organising result of non-renewable-resource economics.

The rule does not say that prices must rise, that we are "running out", or that scarcity is a reason to stop using the resource. It says that *rent* — price minus marginal extraction cost — rises at the rate of interest along an efficient path, and that the stock is exhausted when the price hits a choke or a backstop. Whether observed oil and metal prices have behaved that way is an empirical question, and the evidence is mixed. This chapter derives the rule, characterises extraction with constant costs and with a backstop, and reads the price evidence without treating a model as a forecast. Illustrative numbers are not a recommendation to buy, sell or hold any commodity.

The mathematics is the simplest dynamic optimisation in [[mathematical-economics/dynamic-optimisation]]: a current-value Hamiltonian, a costate for the stock, and a transversality condition. Profit is $\Pi$.

## Hotelling's rule

Let $S(t)$ be the remaining stock, $q(t) \ge 0$ extraction, $\dot S = -q$, $S(0) = S_0$, $S(t) \ge 0$. Inverse demand is $p(q)$, decreasing, with a finite **choke price** $\bar p = p(0)$ (demand is zero at $\bar p$). Extraction cost is $C(q)$ with $C' \ge 0$, $C'' \ge 0$. The social planner (or a competitive industry of resource owners) maximises $\int_0^\infty e^{-r t} \bigl[ u(q) - C(q) \bigr]\,\dd t$, where $u'(q) = p(q)$ is the area under demand.

::: definition Hotelling rent {#def-rent}
The **rent** (royalty, in-situ value) on a non-renewable resource is the difference between price and marginal extraction cost, $\lambda = p - C'(q)$. It is the shadow price of the stock: the present-value social surplus from having one more unit in the ground.
:::

::: proposition Hotelling's rule {#prop-hotelling}
Along an interior competitive (or socially optimal) path with a constant interest rate $r$ and extraction cost independent of the stock,

$$
\frac{\dot\lambda}{\lambda} = r \qquad\text{i.e.}\qquad \lambda(t) = \lambda_0 e^{r t},\qquad \lambda = p - C'(q).
$$ {#eq-hotelling}

If $C \equiv 0$, the *price* itself rises at rate $r$. The stock is exhausted at a finite $T$ where $p(T) = \bar p$ (or the backstop price), and $\int_0^T q(t)\,\dd t = S_0$. Assumptions: perfect competition in the flow market, perfect property rights in the stock, perfect foresight, constant $r$, no stock-dependent costs, no uncertainty.
:::

::: proof
The current-value Hamiltonian is $H = u(q) - C(q) - \lambda q$. Maximising in $q$ gives $p(q) - C'(q) = \lambda$ when $q > 0$. The costate equation is $\dot\lambda = r\lambda - \partial H/\partial S = r\lambda$, because $S$ does not enter $H$ when costs are stock-independent. Hence $\lambda(t) = \lambda_0 e^{rt}$. Transversality and $S \ge 0$ force exhaustion at the date when $\lambda$ has grown enough that $q = 0$. Integrating $\dot S = -q$ pins down $\lambda_0$ from $S_0$.
:::

::: intuition The two assets
The owner is indifferent between extracting a unit, selling it, and earning $r\lambda$ in the bank, and leaving it to appreciate at $\dot\lambda$. If $\dot\lambda > r\lambda$, everyone holds the resource and $q$ collapses until price jumps; if $\dot\lambda < r\lambda$, everyone extracts at once. Competition equalises the two returns. Open access, by contrast, puts $\lambda = 0$: nobody owns the capital gain, so the resource is mined as if it were inexhaustible, until it is gone.
:::

::: example Zero-cost extraction with linear demand {#ex-zero-cost}
Demand is $q = 80 - p$, $r = 0.05$, $C \equiv 0$, $S_0 = 400$. The choke price is $80$. Find the initial price $p_0$, the exhaustion date $T$, and initial extraction $q_0$.
::: solution
$p(t) = p_0 e^{rt}$ and $p(T) = 80$ so $T = \ln(80/p_0)/r$. Extraction is $q(t) = 80 - p_0 e^{rt}$, and $\int_0^T q = 80 T - (80 - p_0)/r = 400$. Numerically, $p_0 \approx 35.90$, $T \approx 16.02$ years, $q_0 \approx 44.10$. Check: $35.90\, e^{0.05\cdot 16.02} \approx 80$, and the integral of $q$ is $400$. A higher $r$ raises $p_0$ and brings $T$ forward: impatience mines the stock sooner. A larger $S_0$ lowers $p_0$ and stretches $T$.
:::
:::

::: widget plot
f: p0*exp(r*x); 80+0*x
sliders: p0=36:20:60:1; r=0.05:0.01:0.12:0.01
x: 0, 30
y: 0, 100
labels: \text{Hotelling price}; \text{choke}
caption: The Hotelling path $p(t) = p_0 e^{rt}$ and the choke price $80$. Raise $r$ and the path steepens; it hits the choke sooner, so exhaustion is earlier. The $p_0$ that exhausts a *given* stock is not free: it must be solved from the integral constraint, as in [[#ex-zero-cost]]. Drag $p_0$ to see how the wrong initial price either never chokes or chokes with stock left (both cannot be equilibria).
:::

## Extraction costs and a backstop

::: proposition Constant unit cost {#prop-constant-cost}
If $C(q) = c q$ with $c$ constant, Hotelling's rule is $\dot p = r(p - c)$: the *net* price rises at rate $r$, so

$$
p(t) = c + (p_0 - c) e^{r t}.
$$ {#eq-net-price}

Gross price $p$ then rises more slowly than $r$ (the $c$ is a growing *share* of $p$ as one goes backwards in time). Stock-dependent costs, $C(q,S)$ with $C_S < 0$ (the cheap deposits go first), put a negative term in the costate equation and can make $p$ *fall* for a while even though rent is positive.
:::

::: proof
$\lambda = p - c$ and $\dot\lambda = r\lambda$ give $\dot p = r(p-c)$. Solving the ODE with $p(0) = p_0$ is [[#eq-net-price]]. If $C$ depends on $S$, $\dot\lambda = r\lambda - \partial H/\partial S = r\lambda + C_S$, and $C_S < 0$ drags $\dot\lambda$ down.
:::

::: example Net-price growth {#ex-net-price}
Keep demand $q = 80 - p$ and $r = 0.05$, $S_0 = 400$, but now $c = 10$. At exhaustion, $p(T) = 80$ so $\lambda(T) = 70$. Find $T$ and $p_0$.
::: solution
$q(t) = 70\bigl(1 - e^{r(t-T)}\bigr)$ because $p(t) = 10 + 70 e^{r(t-T)}$. Then $\int_0^T q = 70 T - (70/r)\bigl(1 - e^{-rT}\bigr) = 400$. Numerically $T \approx 17.29$ years, $\lambda_0 = 70 e^{-rT} \approx 29.49$, $p_0 \approx 39.49$, $q_0 \approx 40.51$. Compared with [[#ex-zero-cost]], the cost delays exhaustion slightly and raises the initial *gross* price, but the initial *rent* is lower than the zero-cost $p_0$, because part of the choke is now the $c$ that does not have to grow at $r$.
:::
:::

A **backstop** is a substitute available in unlimited quantity at price $p_B < \bar p$ (solar for oil, in the cartoon). The Hotelling path hits $p_B$ rather than $\bar p$, at a $T$ with $p(T) = p_B$ and remaining stock zero. A cheaper backstop lowers the whole price path and *speeds* exhaustion of the fossil stock — the **green paradox** of Sinn (2008): an announced future backstop or future carbon tax can induce owners to extract *sooner*. The paradox is a Hotelling comparative static, not a forecast of any particular oil market; it assumes property rights, foresight and no stock-dependent costs.

::: example A backstop {#ex-backstop}
In the zero-cost economy of [[#ex-zero-cost]], a backstop at $p_B = 50$ becomes available. Qualitatively, what happens to $p_0$ and $T$? (You need not re-solve the integral.)
::: solution
The terminal condition is now $p(T) = 50$ rather than $80$. The path $p_0 e^{rt}$ must end lower, so for a given $S_0$ the initial price $p_0$ falls and $T$ shortens: more is extracted early, while the resource is still cheaper than the backstop. Demand $q = 80 - p$ is higher along the lower path, which is why $T$ must shrink in order to exhaust $S_0$. This is the green-paradox direction: a *future* cheap substitute makes the fossil stock less valuable to hold, so it is dumped sooner.
:::
:::

::: widget odesolver
f: -(80 - 35.9*exp(0.05*t))
y0: 400
t: 0, 16
h: 0.5
methods: euler; rk4
caption: The stock under the zero-cost path of [[#ex-zero-cost]]: $\dot S = -(80 - 35.9 e^{0.05 t})$, $S(0) = 400$. Compare Euler with RK4 as the step $h$ shrinks. The stock should hit roughly zero near $t = 16$, which is the $T$ of that example.
:::

## Monopoly, open access and the resource curse

A monopolist owner equalises *marginal revenue* minus marginal cost to $\lambda$, and $\lambda$ still grows at $r$. Because MR $< p$, the monopolist extracts more slowly than the competitive industry — Hotelling's "conservationist's friend". Open access is the opposite: $\lambda = 0$, extraction follows static $p = C'(q)$ until the stock is gone, with no conservation motive.

The **resource curse** is a different literature: countries rich in oil and minerals have, on average, grown more slowly and been more autocratic than their endowments would suggest (Sachs and Warner 1995; subsequent work by Mehlum, Moene and Torvik, and by Ross). The channels are Dutch disease, volatility, and rent-seeking, not Hotelling's rule. Norway's petroleum fund is the textbook counter-example, and Botswana's diamonds another; Nigeria and Venezuela are often cited on the other side. The curse is a political-economy regularity with exceptions, not a theorem about $S_0$.

Exploration is a search technology that converts expenditure into a stochastic increment of $S_0$. In a competitive equilibrium the expected rent on a newly found deposit equals the marginal cost of finding it (Pindyck 1978; Devarajan and Fisher 1982). That equality is why observed *reserves* can grow for decades while extraction continues: firms drill until the last barrel's expected rent covers the drill. A falling finding cost, or a jump in $p$, raises the economic reserve even if the crust is unchanged. The USGS and Energy Institute (formerly BP *Statistical Review*) series of "proved reserves" are therefore not a physical $S_0$; they are a Hotelling-consistent economic stock. Treating them as a physical exhaustion clock is the same mistake as treating a high price as proof of high $\lambda$.

Uncertainty about $S_0$ or about future demand makes the owner value optionality. A unit left in the ground is a call option on later prices; with irreversible extraction, a mean-preserving spread in future $p$ raises the value of waiting (the Dixit–Pindyck logic of [[mathematical-economics/dynamic-optimisation]]). The Hotelling path of [[#eq-hotelling]] is the certainty benchmark. Real-option premia flatten early extraction relative to that path. They are a reason, alongside falling $c$ and expanding reserves, that a naive $\dot p/p = r$ test fails even when owners are Hotelling-rational. OPEC and other cartels add a further wedge: the observed price is then a mix of Hotelling rent, marginal cost, and a market-power markup, and the conservationist's-friend comparative static of monopoly is the relevant benchmark rather than the competitive rule.

## Evidence

Hotelling (1931) was a theory paper. Barnett and Morse (*Scarcity and Growth*, 1963) looked at US resource prices over 1870–1957 and found *declining* real prices for most minerals, not rising ones. The Simon–Ehrlich wager (1980, settled 1990) had Ehrlich picking a basket of metals whose real prices then *fell*. World Bank "pink sheet" real commodity prices remain trendless or falling over long stretches, with super-cycles around the trend (World Bank, *Commodity Markets Outlook*, various issues; Jacks 2013 on cycles).

That evidence does not refute [[#prop-hotelling]]. The rule is about *rent*, not about gross price; $c$ can fall with technology faster than $\lambda$ rises; new discoveries raise $S_0$ and drop $p_0$; backstops and substitutes (fibre optic for copper) shift demand; and most mineral markets are not the textbook competitive owner. Slade (1982) fitted U-shaped prices; Hartwick, Krautkraemer and others have emphasised that a falling $p$ is consistent with Hotelling once $C(q,S)$ and exploration are included. Livernois (*Review of Environmental Economics and Policy*, 2009) surveys tests and concludes that the pure $C=0$ implication "$p$ rises at $r$" is regularly rejected, while more flexible versions are hard to reject and hard to confirm.

The right use of the model is as a benchmark: if rents are not rising at something like $r$, look for the assumption that failed (open access, falling costs, expanding reserves, market power), rather than as a price forecast. This course does not forecast oil, copper or lithium prices.

::: warning Scarcity is not the price, and the price is not a forecast
A high price can mean a high $c$ (deep mines, costly oil sands) rather than a high $\lambda$. A falling price can mean technical progress rather than abundance. Using a Hotelling path as a forecast of next decade's oil price ignores exploration, OPEC, and demand shocks. Using GDP-energy ratios as a demonstration that "we will run out in $N$ years" ignores both the rule and the backstop: along [[#eq-hotelling]] we never "run out" by surprise, because $p$ chokes demand first.
:::

::: quiz
If Hotelling's rule holds with zero extraction cost, which statement is true?
- [ ] Real resource prices must rise at the rate of GDP growth
- [x] Rent (here, the price) rises at the rate of interest, and the stock is exhausted as the price reaches choke
- [ ] The resource will be exhausted in finite time at a constant price
- [ ] Observed falling metal prices prove the rule is false and the stock is infinite
::: solution
[[#eq-hotelling]] with $C=0$ is $\dot p/p = r$, with exhaustion at choke. GDP growth is not in the formula. A constant price would require $r=0$ or a cost path that offsets $r$. Falling observed prices reject the *zero-cost, closed, competitive* special case, not the existence of the planet's crust.
:::
:::

## Where this leads

Renewable resources ([[environmental-economics/renewable-resources]]) add biological growth to $\dot S = -q$; Faustmann and Gordon–Schaefer are Hotelling with a recruitment function. Climate change treats the *atmosphere* as a sink with a Hotelling-like carbon budget ([[environmental-economics/climate-economics]]): the efficient carbon price rises at a rate related to $r$ minus the decay of atmospheric stock (the Hotelling rule for a pollutant). Green technical change ([[environmental-economics/green-growth]]) is a falling backstop price.

A monopolist facing the same demand extracts more slowly than a competitive industry: Hotelling called the monopolist the conservationist's friend. With zero extraction cost and isoelastic demand of elasticity $\varepsilon > 1$, the monopolist's rent still grows at $r$, but the *price* path is higher and flatter, so the resource lasts longer. With linear demand the monopolist may even leave some of the resource in the ground if the choke price is reached with stock remaining. Those are comparative statics of market structure, not a finding that monopoly is a climate policy.

Resource nationalism, export taxes and sovereign wealth funds are ways a resource-owning country captures Hotelling rent. The algebra of [[#eq-hotelling]] still holds inside the country if the owner is patient at rate $r$; the *division* of the rent between the state and the extracting firm is a bargaining or tax problem (royalties, production-sharing, auctions of licences). Norway's Government Pension Fund Global and Chile's copper stabilisation funds are examples of saving a depleting rent rather than consuming it (Hartwick's rule in [[environmental-economics/environment-and-economy]]). They are institutions, not a theorem that every exporter should copy them.

::: example A two-period Hotelling path {#ex-two-period-hotelling}
Zero extraction cost, $r = 100\%$ for a two-period cartoon, inverse demand $p = 12 - q$ in each period, stock $S_0 = 10$. Competitive equilibrium equates $p_1 = p_2 / (1+r)$ and $q_1+q_2=10$. Find $q_1, q_2, p_1, p_2$.
::: solution
$p_2 = 2 p_1$ because $1+r=2$. Then $12-q_2 = 2(12-q_1)$ and $q_1+q_2=10$. So $12-q_2 = 24 - 2q_1$, $2q_1 - q_2 = 12$. Substitute $q_2=10-q_1$: $2q_1 - (10-q_1) = 12$, $3q_1 = 22$, $q_1 = 22/3 \approx 7.33$, $q_2 = 8/3 \approx 2.67$. Then $p_1 = 12-22/3 = 14/3 \approx 4.67$, $p_2 = 28/3 \approx 9.33 = 2 p_1$. Most of the stock is used in period 1 because demand is the same and the owner is impatient. A lower $r$ would shift extraction toward period 2. The $100\%$ rate is a cartoon for two-period algebra, not a market interest rate.
:::
:::

::: history
**1931, Harold Hotelling.** "The Economics of Exhaustible Resources" (*Journal of Political Economy*) derived [[#eq-hotelling]] and noted that a monopolist is the "conservationist's friend".

**1963, Harold Barnett and Chandler Morse.** *Scarcity and Growth* documented declining real US resource prices and shifted the empirical debate from "running out" to substitution and technical change.

**1974, Robert Solow.** "The Economics of Resources or the Resources of Economics" (*American Economic Review*) restated Hotelling for a profession that had rediscovered it in the 1973 oil shock, and connected it to Hartwick's investment rule.
:::

::: summary
- Rent $\lambda = p - C'(q)$ is the in-situ shadow price. Hotelling's rule is $\dot\lambda/\lambda = r$ under competition, foresight and stock-independent costs ([[#prop-hotelling]]).
- With zero cost, price rises at $r$ and hits choke at exhaustion. With constant $c$, net price $p-c$ rises at $r$ ([[#prop-constant-cost]]).
- A cheaper backstop lowers the whole path and can bring exhaustion *forward* (green paradox). Open access sets $\lambda = 0$ and mines too fast; monopoly mines too slow.
- Long-run real commodity prices have not risen at $r$. That rejects the simplest special case, not the logic of rent. The model is a benchmark, not a price forecast.
:::

## Exercises

::: exercise Zero-cost Hotelling {level=1 check="0.05"}
$C = 0$ and $p(t) = 20 e^{0.05 t}$. At what rate does the price rise? (Enter the rate as a decimal.)
::: solution
$\dot p / p = 0.05$, which is $r$ by [[#eq-hotelling]].
:::
:::

::: exercise Rent with a cost {level=1 check="10"}
Price is $40$ and marginal extraction cost is $30$. What is the Hotelling rent? (Enter the rent.)
::: solution
$\lambda = 40 - 30 = 10$.
:::
:::

::: exercise Next year's price {level=1 check="42"}
In the previous exercise $r = 0.20$ and $c$ is constant at $30$. If this year's price is $40$, what is next year's price along a Hotelling path? (Enter next year's price.)
::: solution
$p' = c + (p-c)(1+r) = 30 + 10\cdot 1.2 = 42$. Equivalently $\lambda' = 10 \times 1.2 = 12$ and $p' = 30+12 = 42$.
:::
:::

::: exercise Exhaustion date {level=2 check="20"}
Zero extraction cost, $p_0 = 50$, choke $\bar p = 50e$, $r = 0.05$ (continuous compounding). When is the resource exhausted? (Enter $T$ in years.)
::: solution
$50 e^{0.05 T} = 50 e$ so $0.05 T = 1$ and $T = 20$.
:::
:::

::: exercise Initial rent {level=2 check="35"}
Constant unit cost, $\lambda(T) = 70$, $r = 0.05$ continuous, $T = \ln 2 / 0.05$. Compute $\lambda_0$. (Enter $\lambda_0$.)
::: solution
$T = \ln 2 / 0.05$ means $e^{rT} = 2$, so $\lambda_0 = \lambda(T) e^{-rT} = 70/2 = 35$.
:::
:::

::: exercise Open access versus Hotelling {level=2}
A resource has $C(q) = q^2/2$ and inverse demand $p = 30 - q$. Contrast the open-access extraction rate with the Hotelling first-order condition at a date when $\lambda = 10$. Which is larger, and why?
::: solution
Open access sets $\lambda = 0$, so $p = C'(q)$: $30 - q = q$, $q^{OA} = 15$. Hotelling sets $p - C'(q) = 10$: $30 - q - q = 10$, $20 = 2q$, $q^H = 10$. Open access extracts more, because it treats the stock as free. The $5$ units of extra extraction are the static picture of the tragedy of the commons for a mine.
:::
:::

::: exercise A green-paradox comparative static {level=3}
In the zero-cost linear-demand model, a backstop price $p_B$ replaces the choke $\bar p$. Using the integral constraint $\int_0^T \bigl(\bar p - p_0 e^{rt}\bigr)\,\dd t = S_0$ and $p_0 e^{rT} = p_B$, argue that a fall in $p_B$ reduces $T$. Do not treat the argument as a forecast of oil output.
::: hint
A lower terminal price, with $p(t)$ still exponential at rate $r$, requires a lower $p_0$ or a shorter $T$; the integral of demand then forces $T$ down.
:::
::: solution
$p_0 = p_B e^{-rT}$. Extraction $q(t) = \bar p - p_B e^{r(t-T)}$. The integral is $\bar p T - (p_B/r)\bigl(1 - e^{-rT}\bigr) = S_0$. The left-hand side is strictly increasing in $T$ and in $p_B$. A lower $p_B$ at a given $T$ raises the integral (more is demanded along a cheaper path), so $T$ must fall to keep the integral equal to $S_0$. Owners dump the stock sooner. The result assumes Hotelling's hypotheses; it is not a prediction of any particular oil field.
:::
:::

::: exercise Stock-dependent cost {level=3}
Suppose $C = c(S) q$ with $c'(S) < 0$ (cheap deposits first). Write the costate equation and explain how $p$ can fall for a stretch even though $\lambda > 0$.
::: solution
$H = u(q) - c(S)q - \lambda q$, so $\dot\lambda = r\lambda - \partial H/\partial S = r\lambda + c'(S) q$. Since $c'<0$, $\dot\lambda = r\lambda - \lvert c'\rvert q$, which can be negative if the cost-saving from holding stock is large. Then $\lambda = p - c(S)$ can fall, and $p = \lambda + c(S)$ can fall even faster as $c(S)$ rises when $S$ shrinks. Falling observed prices are consistent with Hotelling once depletion raises $c$. The pure $\dot p/p = r$ test is the wrong test in this world.
:::
:::

