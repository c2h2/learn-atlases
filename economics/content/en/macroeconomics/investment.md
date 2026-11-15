Investment is the smallest of the major GDP components in most high-income countries and the most volatile. U.S. gross private domestic investment was about 18 per cent of GDP in 2023; it fell by several percentage points of GDP in 2009 and again, briefly, in 2020 (BEA NIPA, accessed 2026). China’s gross capital formation, by contrast, has run near 40 per cent of GDP (World Bank WDI, accessed 2026). Those two facts — a high cyclical amplitude, and a level that differs enormously across countries — are what a theory of investment has to speak to.

This chapter derives **business fixed investment** from the demand for capital, with the **user cost** as the relevant price; states **Tobin’s $q$** as the same theory in asset-price clothing; and treats **residential investment** and **inventories** as close cousins with their own timing. The reduced form $I=I(r)$ used in [[macroeconomics/national-income]] and in [[macroeconomics/is-lm]] is what remains after the derivation. The chapter is for education only. It is not a recommendation to buy or sell capital goods, houses or inventories, and it is not a forecast of any of those series.

Notation: $K$ is the real capital stock, $I$ gross investment, $\delta$ the depreciation rate, $R$ the real rental rate, $r$ the real interest rate, $p_K$ the real price of capital goods in units of output, and $q$ Tobin’s $q$. Inflation $\pi$ appears only as the expected change in $p_K$. Profit is $\Pi$.

## From the production function to the desired capital stock

A firm that produces with $Y=F(K,L)$ and sells at a relative price of one will rent capital up to the point where the marginal product equals the real rental, $F_K(K,L)=R$, as in [[macroeconomics/national-income]]. If the firm *owns* the capital instead of renting it, the same condition describes the **desired capital stock** $K^*$, once $R$ is replaced by the cost of using an owned machine for a period — the user cost.

::: definition User cost of capital {#def-uc}
The **user cost** (or rental equivalent) of a unit of capital is the real cost of holding it for one period,

$$
uc = (r + \delta - \pi_K^e)\, p_K,
$$ {#eq-uc}

where $p_K$ is the real price of capital goods, $\delta$ is physical depreciation, $r$ is the real interest rate, and $\pi_K^e$ is the expected real capital gain on the machine. Taxes on corporate income, depreciation allowances and investment credits modify [[#eq-uc]] by a multiplicative factor; they are omitted until the remark below.
:::

The formula is Jorgenson’s (1963, *American Economic Review*). Intuition: buying a machine that costs $p_K$ ties up funds that could have earned $r$, the machine loses $\delta p_K$ to wear, and if machines are expected to become cheaper ($\pi_K^e < 0$) that is a further cost of buying today. In a one-good model, $p_K=1$ and $\pi_K^e=0$, so $uc = r+\delta$, and the desired-capital condition is $F_K = r+\delta$. That is the link between the rental $R$ of the classical chapter and the interest rate $r$ of the loanable-funds market.

::: proposition Desired capital stock {#prop-kstar}
A competitive firm with production function $F$, taking $(r, p_K, \delta, \pi_K^e)$ as given and facing no adjustment costs, chooses $K^*$ to satisfy $F_K(K^*, L) = uc$. If $F(K,L)=A K^\alpha L^{1-\alpha}$, then

$$
K^* = \left(\frac{\alpha A}{uc}\right)^{1/(1-\alpha)} L = \frac{\alpha Y}{uc}.
$$ {#eq-kstar}

Gross investment needed to reach $K^*$ from current $K$ in one period is $I = K^* - (1-\delta)K$. With convex **adjustment costs**, the firm spreads that gap over time and $I$ becomes a smooth increasing function of $K^*-K$.
:::

::: proof
Profit in a period is $F(K,L)-wL-uc\, K$ when capital is costed at $uc$. The first-order condition in $K$ is $F_K=uc$. For Cobb–Douglas, $F_K=\alpha Y/K$, so $K^*=\alpha Y/uc$. The identity $K_{t+1}=(1-\delta)K_t + I_t$ then gives the one-period $I$ that delivers $K^*$. With a convex cost $C(I,K)$ of installing capital, the Euler equation of the firm’s problem trades off $uc$ against the marginal adjustment cost, and $I$ is increasing in the gap $K^*-K$ (or, equivalently, in $q-1$ below).
:::

Three comparative statics follow at once. A rise in $r$ raises $uc$ and lowers $K^*$ and $I$ — the source of $I'(r)<0$. A rise in $A$ or in $L$ (or in the demand for the firm’s output, in a Keynesian reading where $Y$ is demand-determined) raises $K^*$ and $I$. A fall in $p_K$ — cheaper machines — lowers $uc$ and raises $K^*$. The last channel is one reading of the investment boom that accompanied the fall in the relative price of equipment after 1980 (Greenwood, Hercowitz and Krusell 1997, *American Economic Review*).

::: example User cost and $K^*$ {#ex-uc}
A firm has $Y = 20 K^{1/2}$ (labour is already substituted out), $\delta = 0.10$, $p_K=1$, $\pi_K^e=0$. The real interest rate is $r=0.04$. Compute $uc$ and $K^*$. If $r$ rises to $0.10$, what happens to $K^*$ and to the investment needed to move from the old $K^*$ to the new one in a single period, ignoring depreciation in that step?
::: solution
$uc = 0.04+0.10 = 0.14$. The marginal product is $F_K = 10 K^{-1/2}$. Setting $10/\sqrt{K} = 0.14$ gives $\sqrt{K} = 10/0.14 = 500/7 \approx 71.43$ and $K^* \approx 5102$. (The large number is an artefact of the $20$ in the production function; the comparative static is what matters.) At $r=0.10$, $uc=0.20$, $\sqrt{K}=10/0.20=50$, $K^*=2500$. Desired capital has fallen by about $2600$; one-period gross investment, ignoring $\delta$, is $2500-(1-\delta)5102$, a large negative number: the firm would like to *disinvest*. With irreversible investment, it would set $I=0$ and let depreciation do the work. That asymmetry — fast up, slow down — is a well-documented feature of plant and equipment data (Caballero, Engel and Haltiwanger 1995, *Brookings Papers*).
:::
:::

The numbers in [[#ex-uc]] are clumsy. A cleaner Cobb–Douglas illustration: $Y=K^{1/3}L^{2/3}$ with $L=8$, $uc=1/3$, then $K^*=\alpha Y/uc$ and at the [[macroeconomics/national-income]] example’s $K=27$, $Y=12$, $\alpha Y = 4$, so $K^*=4/(1/3)=12$ if $uc=1/3$. The firm in that example, with $K=27$, would be above $K^*$ if $uc$ were as high as $1/3$. We use a rounder figure in the widget.

::: widget plot
f: 10/sqrt(x); u
x: 1, 80
y: 0, 12
sliders: u=2:0.5:5:0.1
labels: \text{marginal product }10/\sqrt{K}; \text{user cost}
caption: Capital $K$ on the horizontal axis, real return on the vertical. The curve is $F_K=10/\sqrt{K}$; the horizontal line is the user cost $u$. Desired capital is their intersection. Raise $u$ from $2$ to $4$: $K^*$ falls from $25$ to $6.25$. Investment is the flow that takes $K$ toward that intersection, not the intersection itself.
:::

::: remark Taxes and the user cost
With a corporate tax rate $\tau$, a depreciation allowance in present value $z$, and an investment tax credit $s$, the Hall–Jorgenson formula becomes $uc = p_K (r+\delta-\pi_K^e)(1-\tau z - s)/(1-\tau)$. A temporary investment tax credit lowers $uc$ now relative to later and can shift $I$ sharply in time — a warning against reading a spike in $I$ after a credit as a rise in $K^*$ of the same size. Auerbach and Hassett (1992, *Journal of Public Economics*) found U.S. equipment investment responsive to this tax-adjusted $uc$; Chirinko, Fazzari and Meyer (1999, *Review of Economics and Statistics*) found a smaller elasticity. The disagreement is about the size of $\partial \ln I / \partial \ln uc$, not about the sign.
:::

## Adjustment costs and Tobin’s $q$

Firms do not jump to $K^*$. Installing capital takes time, disrupts production, and is partly irreversible. The standard model adds a convex adjustment-cost function, so that the firm’s shadow value of an installed machine — **marginal $q$** — equals $1$ plus the marginal adjustment cost. Investment is then increasing in $q-1$.

::: definition Tobin’s $q$ {#def-q}
**Tobin’s $q$** is the ratio of the market value of the firm’s capital to its replacement cost. **Hayashi’s theorem** (Hayashi 1982, *Econometrica*): if $F$ and the adjustment-cost function are linear homogeneous and markets are competitive, average $q$ (the observable ratio) equals marginal $q$ (the shadow value that governs $I$). Then

$$
\frac{I}{K} = \Phi(q-1), \qquad \Phi(0)=0, \quad \Phi'>0.
$$ {#eq-q}
:::

When $q>1$, the market values an extra unit of installed capital at more than it costs to buy and install, so the firm invests. When $q<1$, it disinvests or waits. In an efficient market for claims on the firm, $q$ is the present value of expected future marginal products, discounted at $r$ and allowing for $\delta$. A fall in $r$, a rise in expected $A$, or a fall in $p_K$ all raise $q$ and raise $I$. That is the same comparative static as [[#prop-kstar]], rewritten so that an asset price carries the information.

Empirically, average $q$ is a noisy predictor of $I$. Blanchard, Rhee and Summers (1993, *Quarterly Journal of Economics*) found that U.S. investment tracked fundamentals (profits, sales) more closely than it tracked $q$, which they read as a sign that stock-market $q$ contains a bubble or a mismeasurement relative to the managers’ $q$. Hayashi and Inoue (1991) had better luck with Japanese firm data. The theory is still the right organising idea; the measurement of $q$ is the problem. Intangibles, which are poorly captured in replacement-cost $K$, have made the problem worse (Hall 2001, *American Economic Review*).

::: example A $q$ calculation {#ex-q}
A firm has $100$ units of capital whose replacement cost is $1$ each. The stock market values the firm at $130$. There is no debt and no unmeasured intangible. What is average $q$? If $\Phi(q-1)=0.15(q-1)$, what is $I/K$? If $\delta=0.10$, is the capital stock rising?
::: solution
$q=130/100=1.3$. Then $I/K=0.15\times 0.3=0.045$, so gross investment is 4.5 per cent of $K$. Net investment is $I/K-\delta=0.045-0.10=-0.055$: the capital stock is still falling, because depreciation exceeds gross investment. $q>1$ is not sufficient for $K$ to rise; $q$ must be far enough above $1$ that $\Phi(q-1)>\delta$.
:::
:::

::: intuition $q$ as a sufficient statistic
If Hayashi’s conditions hold, the manager does not need a separate forecast of $A$, of $r$, or of demand. The asset price has already combined those forecasts. That is the attraction of [[#eq-q]] for empirical work, and its vulnerability: if the asset price is wrong, or if average $q$ is not marginal $q$, the sufficient statistic is sufficient for the wrong object. A plant manager who ignores a soaring stock price and looks at orders for the firm’s product is not necessarily making a mistake.
:::

::: quiz
A rise in the real interest rate $r$, with $p_K$, $\delta$ and expected output held fixed, will
- [ ] raise the user cost and raise $K^*$
- [x] raise the user cost and lower $K^*$
- [ ] lower Tobin’s $q$ only if the stock market is inefficient
- [ ] have no effect on $I$, because investment is determined by saving
::: solution
[[#eq-uc]] has $r$ in it: $uc$ rises, $F_K=uc$ requires a lower $K^*$, and $I$ falls as the firm adjusts. In $q$-theory the same rise in $r$ discounts future profits more heavily, so $q$ falls even in an efficient market. Saving determines $I$ in the classical *general* equilibrium of [[macroeconomics/national-income]], where $r$ is endogenous; the firm’s demand schedule $I(r)$ still slopes down.
:::
:::

## Residential investment and inventories

**Residential investment** is the construction of new dwellings (and improvements). It is a large fraction of total investment in some years and the most cyclical component in many. The user-cost logic is the same, applied to housing: the cost of occupying a house for a year is $(r + \delta_h + t_p - \pi_h^e)p_h$, where $t_p$ is the property-tax rate and $\pi_h^e$ is expected real house-price inflation. Housing demand slopes down in that user cost; the supply of *new* houses is an increasing function of $p_h$ relative to construction costs (Tobin’s $q$ for builders). A fall in $r$ — a monetary easing, in the short-run model — raises $p_h$, raises $q$ in construction, and raises residential $I$. The U.S. housing cycle of 2000–12 is the textbook illustration: low real rates and relaxed lending standards raised $p_h$ and housing starts; the subsequent fall in $p_h$ drove $q$ below $1$ and starts to a fraction of their peak (Census Bureau housing starts; Case–Shiller / FHFA price indices, accessed 2026). Whether the price path was a bubble, a fundamentals path, or a mix is a live dispute; the $q$ mechanism that translated $p_h$ into starts is not.

**Inventories** are goods in process and finished goods on shelves. They are a tiny share of $K$ and a large share of the *change* in GDP in a downturn, because $I_{\text{inv}}$ can be negative. Three motives coexist. Production smoothing: with convex production costs, a firm facing fluctuating demand holds inventories so as to produce steadily (Blinder and Maccini 1991, *Journal of Economic Perspectives*, noted that the data often go the other way: production is more volatile than sales). Stockout avoidance: lost sales are costly, so firms hold a buffer that rises with expected demand. The **accelerator**: $I_{\text{inv}} = \nu \Delta Y$, inventories proportional to the *change* in sales. The accelerator is a reduced form, not a deep theory, and it is why inventory investment is so cyclical: $\Delta Y$ changes sign, and $\nu \Delta Y$ changes by more.

::: example An inventory accelerator {#ex-acc}
Firms wish to hold inventories equal to $0.2$ of annual sales. Sales are $100$, $100$, $110$, $110$ in four years. Assuming they start at the desired stock and catch up within the year, compute inventory investment in each year.
::: solution
Desired stocks: $20$, $20$, $22$, $22$. Inventory investment is the change: $0$, $0$, $2$, $0$. A one-year rise in sales of $10$ produces a one-year spike of $2$ in $I_{\text{inv}}$, which then vanishes even though sales stay high. That is the accelerator: investment depends on $\Delta Y$, not on $Y$. In a recession, $\Delta Y<0$ and $I_{\text{inv}}$ is negative, subtracting from GDP over and above the fall in sales.
:::
:::

::: example Housing user cost {#ex-house}
A house costs $p_h=20$ (in units of annual output). The real interest rate is $r=0.03$, depreciation and maintenance are $\delta_h=0.02$, the property tax is $t_p=0.01$, and expected real house-price inflation is $\pi_h^e=0.01$. Compute the user cost of occupying the house for a year. If $\pi_h^e$ rises to $0.04$, what happens to the user cost, and in which direction does housing demand shift?
::: solution
$uc=(0.03+0.02+0.01-0.01)\times 20=0.05\times 20=1$ unit of output a year. If $\pi_h^e=0.04$, $uc=(0.03+0.02+0.01-0.04)\times 20=0.02\times 20=0.4$. Expected capital gains have cut the cost of occupying by 60 per cent; housing demand shifts right, $p_h$ rises in a market with inelastic short-run supply of *existing* houses, builders’ $q$ rises, and residential $I$ rises. The arithmetic is why a fall in $r$ or a rise in expected $\pi_h$ can produce a construction boom. It is not a claim that any particular boom was “only” user cost.
:::
:::

## What the reduced form $I(r)$ leaves out

The schedule $I=I(r)$ of the classical and IS–LM chapters is a slice of this theory, holding expected $Y$, $A$, $p_K$ and $q$’s other determinants fixed. Three things it leaves out matter in the data.

First, **accelerator and cash-flow** terms: $I$ depends on $Y$ and on $\Delta Y$, and, under imperfect capital markets, on current profits (Fazzari, Hubbard and Petersen 1988, *Brookings Papers*). A recession then lowers $I$ both because $r$ may rise and because $Y$ and cash flow fall. Second, **irreversibility and uncertainty**: a higher variance of future $A$, with the option to wait, raises the threshold $q$ at which the firm invests (Dixit and Pindyck, *Investment under Uncertainty*, 1994; Bloom 2009, *Econometrica*). A shock to uncertainty can look like a fall in $I$ at a given $r$. Third, **credit supply**: if banks are impaired, the $r$ that the firm faces is not the policy rate or the government-bond rate (the financial accelerator of [[business-cycles/financial-frictions]]).

None of these is a reason to drop $I'(r)<0$. They are reasons to treat that slope as a partial derivative, and to expect $I$ to move in recessions by more than a movement along a stable $I(r)$ would predict.

::: warning Investment is a flow; capital is a stock
A common slip is to treat a high $I$ as a high $K$, or a high $q$ as a growing $K$. $K$ grows only when $I>\delta K$. Japan in the 1990s had a high $K/Y$ and a low $I/Y$: the country was living off a capital stock built earlier, with $q$ below the replacement threshold. Another slip is to read $I$ in the national accounts as the $I$ of this chapter: NIPA investment includes residential structures and inventory changes, and it is gross of depreciation. Comparisons of “investment rates” across countries should say whether they are gross or net, and whether they include housing.
:::

## Competing views

**Neoclassical (Jorgenson, Hall–Jorgenson).** $K^*$ is set by $uc$, $I$ is the flow that closes the gap, taxes enter through $uc$. This is the supply-side, long-run theory, and it is the one this chapter has derived.

**Keynesian.** Investment is driven by expected demand (the accelerator, or Keynes’s marginal efficiency of capital) and by animal spirits, with $r$ in the background. A fall in expected $Y$ can dominate a fall in $r$. The IS curve of the next chapter is Keynesian in that sense: $I=I(r,Y)$.

**q-theory (Tobin, Hayashi).** The same neoclassical firm, with adjustment costs; the stock market as the sufficient statistic. New classical and RBC models use this block with flexible prices. New Keynesian models use it too, often in a linearised form around a steady state, with $r$ a policy rate in the short run.

**Financial-frictions views** (Bernanke, Gertler, Gilchrist; Kiyotaki and Moore) add a wedge between the $r$ in [[#eq-uc]] and the risk-free rate, a wedge that widens when net worth falls. They are a complement, not a substitute: $uc$ still governs $K^*$, but $uc$ is no longer just $r+\delta$.

## Evidence

**Volatility.** In U.S. quarterly data, the standard deviation of investment growth is several times that of consumption growth (BEA NIPA; the business-cycle facts of [[business-cycles/business-cycle-facts]]). Residential investment and inventories are more volatile still. That ranking is what adjustment costs, the accelerator and the housing-$q$ channel jointly predict.

**Interest-rate elasticities.** Estimated elasticities of $I$ with respect to $r$ are modest at a one-year horizon and larger at longer horizons, and they are larger for residential investment than for business fixed investment (Chirinko 1993, *Journal of Economic Literature*; Cummins, Hassett and Hubbard 1994). Monetary-policy VARs find a delayed, hump-shaped response of $I$ to a rise in the policy rate (Christiano, Eichenbaum and Evans 1999, *Handbook of Macroeconomics*). The sign matches $I'(r)<0$; the delay matches adjustment costs.

**Cross-country levels.** Gross capital formation as a share of GDP in 2023 was about 42 per cent in China, 31 per cent in India, 22 per cent in the United States, 21 per cent in Germany and 15 per cent in Brazil (World Bank WDI, accessed 2026). User-cost differences (real rates, $p_K$, tax systems) explain some of this; a high saving rate, as in China, is the loanable-funds counterpart from [[macroeconomics/national-income]]; catching-up in $K/L$ is the rest, and belongs to [[economic-growth/solow-model]].

## Where this leads

[[macroeconomics/is-lm]] takes $I=I(r)$ as a schedule and lets $r$ and $Y$ be jointly determined. [[economic-growth/solow-model]] takes $I=sY$ as a saving-driven flow and studies $K$ over decades. [[business-cycles/real-business-cycles]] and [[business-cycles/new-keynesian-model]] put adjustment costs and $q$ into a dynamic general-equilibrium model. Open-economy investment, financed by foreign saving, is [[international-finance/current-account]].

::: history
**1936, John Maynard Keynes.** Chapter 11 of the *General Theory* defined the **marginal efficiency of capital** as the internal rate of return that equates the present value of a project’s expected yields to its supply price, and treated investment as the projects whose marginal efficiency exceeds $r$. **1963, Dale Jorgenson.** “Capital Theory and Investment Behavior” derived $K^*$ from a neoclassical firm and the user-cost formula still in use. **1969, James Tobin.** “A General Equilibrium Approach to Monetary Theory” (*Journal of Money, Credit and Banking*) introduced $q$ as the link between asset markets and the demand for investment goods. **1982, Fumio Hayashi.** “Tobin’s Marginal $q$ and Average $q$” gave the conditions under which the two coincide.
:::

::: summary
- The user cost $uc=(r+\delta-\pi_K^e)p_K$ is the real price of using capital for a period. Desired $K^*$ satisfies $F_K=uc$; under Cobb–Douglas, $K^*=\alpha Y/uc$.
- Gross investment is the flow that moves $K$ toward $K^*$, slowed by adjustment costs and possibly by irreversibility.
- Tobin’s $q$ restates the same theory: $I/K=\Phi(q-1)$. Hayashi’s theorem equates average $q$ to marginal $q$ under homogeneity and competition.
- Residential investment is $q$-theory applied to housing. Inventories follow an accelerator, $I_{\text{inv}}\approx\nu\Delta Y$, which is why they are so cyclical.
- The schedule $I=I(r)$ holds other determinants fixed. Cash flow, uncertainty and credit supply shift it, especially in recessions.
:::

## Exercises

::: exercise User cost {level=1 check="0.12"}
$r=0.05$, $\delta=0.07$, $p_K=1$, $\pi_K^e=0$. Compute $uc$. (Enter $uc$ as a decimal.)
::: solution
$uc=0.05+0.07=0.12$.
:::
:::

::: exercise Desired capital, Cobb–Douglas {level=1 check="400"}
$Y=K^{1/2}L^{1/2}$, $L=100$, $uc=0.25$, $\alpha=1/2$. Using $K^*=\alpha Y/uc$ is circular in $Y$. Use $F_K=uc$ to find $K^*$. (Enter $K^*$.)
::: solution
$F_K=\tfrac12 K^{-1/2} L^{1/2}=\tfrac12 \sqrt{L/K}$. Set $\tfrac12 \sqrt{100/K}=0.25$, so $\sqrt{100/K}=0.5$ and $100/K=0.25$, hence $K^*=400$. Check: $Y=\sqrt{400\times 100}=200$ and $\alpha Y/uc = 0.5\times 200/0.25=400$.
:::
:::

::: exercise Replacement investment {level=1}
A firm is at $K^*$ already, $K^*=500$, $\delta=0.08$. What gross investment maintains $K^*$?
::: solution
$I=\delta K^*=40$. Net investment is zero; gross investment equals depreciation.
:::
:::

::: exercise A rise in $r$ {level=2}
In the production function $Y=20\sqrt{K}$ of the widget, $uc=r+0.10$. Compare $K^*$ at $r=0.06$ and at $r=0.15$. What is the elasticity of $K^*$ with respect to $uc$ along this production function?
::: solution
$F_K=10/\sqrt{K}=uc$, so $K^*=100/uc^2$. At $r=0.06$, $uc=0.16$, $K^*=100/0.0256=3906.25$. At $r=0.15$, $uc=0.25$, $K^*=100/0.0625=1600$. The elasticity $\mathrm{d}\ln K^*/\mathrm{d}\ln uc = -2$: this is a Cobb–Douglas with $\alpha=1/2$ after labour has been maximised out, and the formula $K^*\propto uc^{-1/(1-\alpha)}$ with $\alpha=1/2$ gives the same $-2$.
:::
:::

::: exercise Tobin’s $q$ {level=2 check="1.25"}
Replacement cost of capital is $80$, market value of the firm is $100$, no debt, no intangibles. Compute $q$. (Enter $q$ as a decimal.)
::: solution
$q=100/80=1.25$.
:::
:::

::: exercise Net investment from $q$ {level=2}
In [[#ex-q]], $\Phi(q-1)=0.15(q-1)$, $\delta=0.10$, $q=1.3$. We found $K$ falling. What $q$ would keep $K$ constant?
::: solution
$K$ constant requires $I/K=\delta$, so $0.15(q-1)=0.10$, $q-1=2/3$, $q=5/3\approx 1.667$. Average $q$ has to be well above one to cover depreciation, not merely above one.
:::
:::

::: exercise An investment tax credit {level=3}
Modify [[#eq-uc]] to $uc = (r+\delta)(1-s)$ with $p_K=1$, $\pi_K^e=0$, where $s$ is an investment tax credit. Let $r=0.05$, $\delta=0.10$, $F_K=1/\sqrt{K}$. Compute $K^*$ at $s=0$ and at $s=0.20$. If the credit is known to last only one period, does the one-period $I$ exceed, equal, or fall short of the difference in the two $K^*$?
::: hint
A temporary credit lowers $uc$ now relative to next period’s $uc$. Intertemporal substitution in $I$ is then larger than the long-run $K^*$ comparison.
:::
::: solution
Without the credit, $uc=0.15$, $1/\sqrt{K}=0.15$, $K^*=1/0.0225 \approx 44.44$. With $s=0.20$, $uc=0.15\times 0.80=0.12$, $K^*=1/0.0144 \approx 69.44$. The long-run gap is about $25$. A one-period credit makes this period’s machines cheaper *relative to next period’s*, so firms bunch purchases into the credit window: one-period $I$ exceeds the $25$ needed for the new $K^*$. When the credit expires, $I$ falls below replacement as firms live off the bunching. Temporary credits are therefore a sharper (and noisier) tool than the steady-state comparison suggests. The calculation is illustrative, not a scoring of any actual credit.
:::
:::

::: exercise Inventories in a recession {level=3}
Desired inventories are $0.25$ of annual sales. Sales fall from $200$ to $180$ and are expected to stay at $180$. Starting from the old desired stock, compute inventory investment in the year of the fall. How much extra GDP movement, beyond the $20$ fall in sales, does this create if all sales are of domestic output?
::: hint
$I_{\text{inv}}=\Delta$ desired stock if adjustment is complete within the year.
:::
::: solution
Desired stocks fall from $50$ to $45$, so $I_{\text{inv}}=-5$. GDP, which includes inventory investment, falls by the $20$ of sales plus the $5$ of destocking, a total of $25$. The accelerator amplifies the recession. If firms adjust slowly, destocking is spread over more years and the first-year amplification is smaller. If they destock more than the desired adjustment (a panic, or a credit squeeze), amplification is larger still.
:::
:::
