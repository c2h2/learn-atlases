Why does an extra machine appear to earn a different real return in a capital-scarce economy than in a capital-rich one, and why, despite that, does labour’s share of national income look similar in countries whose capital–labour ratios could hardly be more different? The **classical model of national income** — the long-run, flexible-price theory of output, factor prices and the real interest rate — gives a precise answer to both questions. Output is determined by technology and by the supplies of capital and labour; competitive factor markets then distribute that output as real wages and real rental payments; and the real interest rate adjusts until the amount households and the government wish to save equals the amount firms wish to invest.

The model is classical in the sense of the quantity-theory tradition running from Hume through Fisher: prices and wages are treated as fully flexible, so that markets clear and money is a veil over real quantities (the next chapter, [[macroeconomics/money-and-inflation]], puts the veil back on). It is a model of the **long run**, meaning a horizon long enough for those prices to have adjusted, not a claim that every recession is a supply-side event. Keynesians, New Keynesians and real-business-cycle theorists disagree about how long that horizon is and about what happens before it arrives; they largely agree on the accounting and on the factor-market algebra developed here. The chapter is for education only: it describes a benchmark, not a recommendation of any wage, tax or public-investment policy.

Throughout, $Y$ is real output (real GDP), $K$ is the capital stock, $L$ is labour input, $w$ is the real wage, $R$ is the **real rental rate of capital**, and $r$ is the **real interest rate**. In a one-good closed economy with depreciation $\delta$, competitive firms and free conversion of output into capital, equilibrium equates $R$ with $r+\delta$. Inflation $\pi$ does not appear: this is a real model. Profit, if it is needed as a residual, is written $\Pi$.

## The supply of goods

National income is produced. The simplest useful description of that fact is a production function that takes the two primary inputs, capital and labour, and a productivity term.

::: definition Production function {#def-production}
A **production function** $Y = F(K, L)$ gives the maximum output obtainable from capital $K$ and labour $L$. It is **neoclassical** if it is twice continuously differentiable, strictly increasing in each argument ($F_K > 0$, $F_L > 0$), strictly concave ($F_{KK} < 0$, $F_{LL} < 0$, $F_{KK}F_{LL} - (F_{KL})^2 > 0$), and satisfies the Inada conditions $\lim_{K\to 0} F_K = \lim_{L\to 0} F_L = \infty$ and $\lim_{K\to\infty} F_K = \lim_{L\to\infty} F_L = 0$. It has **constant returns to scale** if $F(\lambda K, \lambda L) = \lambda F(K, L)$ for every $\lambda > 0$.
:::

Constant returns is the mathematical form of the idea that replicating a factory replicates its output: there are no unpriced scarce factors (land of a unique quality, a non-rival idea) hiding in the background. Diminishing $F_K$ and $F_L$ say that, holding the other input fixed, extra machines or extra hours add less and less. The Inada conditions, named for Ken-Ichi Inada’s 1963 restatement, keep interior equilibria from disappearing to $0$ or $\infty$.

The workhorse example is Cobb–Douglas,

$$
Y = A K^\alpha L^{1-\alpha}, \qquad 0 < \alpha < 1, \quad A > 0,
$$ {#eq-cd}

where $A$ is total factor productivity. Cobb and Douglas fitted a version of [[#eq-cd]] to U.S. manufacturing in 1928; the functional form is used here because it delivers constant factor shares, which is a useful (if imperfect) stylised fact, not because it is a law of nature. The parameter $\alpha$ will turn out to be capital’s share of income.

In the long-run classical model the supplies of $K$ and $L$ are taken as given — $K$ because it is the inheritance of past investment, $L$ because it is determined by demography, labour-force participation and, at this horizon, a labour market that has cleared at the natural rate ([[macroeconomics/unemployment]]). Growth of $K$, $L$ and $A$ over decades is the subject of [[economic-growth/solow-model]]. Here they are parameters, and so is $Y$.

::: proposition Constant returns and Euler’s theorem {#prop-euler}
If $F$ is continuously differentiable and homogeneous of degree one, then

$$
F(K, L) = F_K(K, L)\, K + F_L(K, L)\, L.
$$ {#eq-euler}

In a competitive equilibrium, $F_K = R$ and $F_L = w$, so $Y = R K + w L$: output is exactly exhausted by capital and labour payments, and pure economic profit $\Pi$ is zero.
:::

::: proof
Euler’s theorem on homogeneous functions ([[mathematical-economics/functions-of-several-variables]]) applied to degree one gives [[#eq-euler]] at once. A competitive firm maximises $\Pi = F(K,L) - R K - w L$, taking $(R, w)$ as given. The first-order conditions are $F_K = R$ and $F_L = w$, and the second-order conditions hold by concavity. Substituting the first-order conditions into [[#eq-euler]] yields $\Pi = 0$.
:::

The exhaustion result is an accounting identity only under constant returns and competition. With decreasing returns a residual profit remains; with increasing returns the residual is negative and a competitive equilibrium typically fails to exist. The classical model assumes the constant-returns, competitive case, and therefore has nothing left over for “capitalists as such” beyond the rental on the machines they own.

::: example A Cobb–Douglas economy {#ex-cd}
Suppose $Y = K^{1/3} L^{2/3}$, $K = 27$ and $L = 8$. Compute output, the competitive real wage and real rental rate, and the two factor shares.
::: solution
Output is $Y = 27^{1/3}\, 8^{2/3} = 3 \times 4 = 12$. The marginal products are

$$
F_L = \frac{2}{3}\,\frac{Y}{L} = \frac{2}{3}\cdot\frac{12}{8} = 1, \qquad F_K = \frac{1}{3}\,\frac{Y}{K} = \frac{1}{3}\cdot\frac{12}{27} = \frac{4}{27}.
$$

Competition sets $w = 1$ and $R = 4/27$. Labour income is $w L = 8$ and capital income is $R K = 4$, which sum to $Y = 12$. Labour’s share is $wL/Y = 2/3$ and capital’s share is $RK/Y = 1/3$ — exactly $1-\alpha$ and $\alpha$, independent of $K$ and $L$.
:::
:::

That independence is special to Cobb–Douglas. For a general neoclassical $F$, the labour share $wL/Y = F_L L / F$ varies with the capital–labour ratio. What is not special is the qualitative comparative static: extra $K$, with $L$ fixed, raises $Y$ and $w$ and lowers $R$. Extra $L$ raises $Y$ and $R$ and lowers $w$. Extra $A$ raises $Y$, $w$ and $R$ together.

::: widget plot
f: a*(k^(1/3))*(x^(2/3)); (2/3)*a*(k^(1/3))*(x^(-1/3))
x: 1, 24
y: 0, 8
sliders: a=1:0.5:2:0.1; k=27:8:64:1
labels: \text{output }Y; \text{marginal product of labour}
caption: Labour input $L$ is on the horizontal axis. The orange curve is $Y=A K^{1/3} L^{2/3}$; the blue curve is the competitive real wage $w=F_L$. Raise $k$ (the capital stock): both curves shift up, and at a given $L$ the real wage is higher. Raise $a$ (productivity): the same. The classical model treats $K$ and $A$ as given at a moment in time; the figure is the supply side of the goods market.
:::

::: intuition Why the real wage tracks the marginal product
A firm that can hire one more hour at a real wage below the extra output that hour produces will hire it; a firm paying more than that extra output will cut hours. With many firms and a single wage, the only configuration that is consistent with both profit maximisation and labour-market clearing is $w = F_L$ at the given $L$. The same logic applied to machines gives $R = F_K$. The argument is silent about whether $L$ is hours, bodies or efficiency units, and silent about bargaining power: it is the competitive benchmark, against which [[labour-economics/labour-market-equilibrium]] measures monopsony, unions and minimum wages.
:::

## Factor prices and the distribution of income

The labour-demand schedule in $(L, w)$ space is the marginal-product curve $w = F_L(K, L)$, drawn for a given $K$. Labour supply, at the classical horizon, is vertical at the full-employment (or natural-rate) level $\bar L$. Their intersection is the equilibrium real wage. An analogous picture in $(K, R)$ space, with capital supply vertical at the inherited $\bar K$, determines $R$.

::: definition Competitive factor markets {#def-factor-markets}
In **competitive factor markets** firms take $(w, R)$ as given, hire labour until $F_L(K,L) = w$, and rent capital until $F_K(K,L) = R$. Households supply $\bar L$ of labour and $\bar K$ of capital inelastically. Equilibrium factor prices are therefore

$$
w = F_L(\bar K, \bar L), \qquad R = F_K(\bar K, \bar L).
$$
:::

Two immediate consequences are worth naming. First, the real wage is determined in the labour market, not by a central bank and not by “demand for goods”. A boom in goods demand, with $\bar K$ and $\bar L$ fixed and prices flexible, raises the price level (next chapter) but not $w$ or $Y$. Second, anything that shifts $F_L$ — a larger capital stock, a productivity improvement, a labour-augmenting technical change — shifts the labour-demand curve and changes $w$. That is the classical account of why real wages have risen over the past two centuries: not because of demand stimulus, but because $K$ and $A$ have grown.

::: example A productivity jump and a labour-supply increase {#ex-shifts}
In the economy of [[#ex-cd]], $A$ rises from $1$ to $8/5$ so that $Y = (8/5) K^{1/3} L^{2/3}$, with $K=27$ and $L=8$ unchanged. Separately, return to $A=1$ and let $L$ rise from $8$ to $27$. Compute $(Y, w, R)$ in each case, and comment on the two factor shares.
::: solution
With $A = 8/5$, output is $Y = (8/5)\times 12 = 96/5 = 19.2$. Then $w = (2/3)Y/L = (2/3)\times 19.2/8 = 1.6$ and $R = (1/3)Y/K = (1/3)\times 19.2/27 = 32/135 \approx 0.237$. Both factor prices rise in the same proportion as $A$; both shares are unchanged, because Cobb–Douglas shares do not depend on $A$.

With $A=1$ and $L=27$, $Y = 27^{1/3}\, 27^{2/3} = 27$. Now $w = (2/3)\times 27/27 = 2/3$ and $R = (1/3)\times 27/27 = 1/3$. The real wage has fallen from $1$ to $2/3$; the real rental has risen from $4/27$ to $1/3$. Labour’s share is still $2/3$. More workers, with the same capital, make labour cheaper and machines more valuable — the classical prediction for a migration wave or a baby boom, once the new labour has been absorbed.
:::
:::

::: warning The real wage is not the take-home pay packet
The model’s $w$ is output per unit of labour, a real product wage. A worker’s living standard also depends on the relative price of the things she buys, on taxes and transfers, and on hours. A rise in $w$ computed from national accounts can coexist with stagnant median take-home pay if the labour share is being received by a thin upper tail, if hours have fallen, or if the consumption deflator has outpaced the GDP deflator. The classical diagram does not speak to those distributional facts; it only says what average labour productivity and the average product wage must do when $K$, $L$ and $A$ change.
:::

::: quiz
In a competitive Cobb–Douglas economy, a rise in the capital stock with labour and productivity held fixed will
- [ ] raise the real rental $R$ and raise capital’s share of income
- [x] lower the real rental $R$ and leave capital’s share unchanged
- [ ] lower the real wage $w$
- [ ] raise output less than proportionally with $K$, because of decreasing returns to scale
::: solution
$R = \alpha Y/K = \alpha A (K/L)^{\alpha-1}$ falls when $K$ rises. Capital’s share $\alpha$ is a parameter. The real wage $w = (1-\alpha)Y/L$ rises, because extra capital raises the marginal product of labour. Returns to scale are constant: doubling $K$ and $L$ together would double $Y$, but here only $K$ has risen, so $Y$ rises less than proportionally with $K$ because of diminishing $F_K$, not because of decreasing returns to scale.
:::
:::

## Demand for goods: consumption, investment and government

Supply determines $Y$. Demand must add up to the same $Y$, because in a closed economy produced output is either consumed, invested, or purchased by the government. (Net exports wait for [[international-finance/balance-of-payments]].) The national-income identity of [[principles/measuring-the-macroeconomy]] is

$$
Y = C + I + G.
$$ {#eq-identity}

The classical model turns [[#eq-identity]] into a theory of the real interest rate by giving $C$ and $I$ behavioural equations and treating $G$ (and taxes $T$) as exogenous fiscal variables.

**Consumption.** Households consume out of disposable income $Y - T$. At this stage we use a Keynesian consumption function, leaving the intertemporal derivation to [[macroeconomics/consumption-and-saving]]:

$$
C = C(Y - T), \qquad 0 < C' < 1.
$$

$C'$ is the **marginal propensity to consume**. Because $Y$ is already determined on the supply side, $C$ is determined once $T$ is given. Households may also respond to the real interest rate — a higher $r$ makes future consumption cheaper relative to present consumption, which tends to raise saving — but the qualitative results below survive if that channel is shut off.

**Investment.** Firms invest when the marginal product of extra capital covers its user cost, a calculation postponed to [[macroeconomics/investment]]. The reduced form is a decreasing function of the real interest rate,

$$
I = I(r), \qquad I' < 0.
$$

A higher $r$ raises the opportunity cost of tying up resources in a machine rather than in a loan, so fewer projects pass the hurdle. Residential investment and inventories obey the same qualitative comparative static, with different speeds.

**Government.** $G$ is real government purchases of goods and services, not transfers. Transfers are a negative tax: they appear in $T$ as a net figure, **taxes minus transfers**. A balanced-budget increase in $G$ financed by lump-sum taxes raises $G$ and $T$ together. The classical model takes both as exogenous. It has nothing to say, yet, about whether a given path of $G$ and $T$ is sustainable; that is [[macroeconomics/fiscal-policy-and-debt]].

Private saving, public saving and national saving are then identities:

$$
S_{\text{private}} = Y - T - C, \qquad S_{\text{public}} = T - G, \qquad S = S_{\text{private}} + S_{\text{public}} = Y - C - G.
$$ {#eq-saving}

Combining [[#eq-identity]] with [[#eq-saving]] gives $S = I$. National saving equals investment: that is the closed-economy capital-market identity, and in the classical model it is also an equilibrium condition that determines $r$.

## The market for loanable funds

Treat saving as the supply of loanable funds and investment as the demand. With $Y$ and fiscal policy given, $S$ is a number, or at most a weakly increasing function of $r$ if consumption falls when $r$ rises. Investment slopes down. Their intersection is the equilibrium real interest rate.

::: proposition Equilibrium real interest rate {#prop-r}
Assume $Y = F(\bar K, \bar L)$ is given, $C = C(Y-T)$ with $0 < C' < 1$, $I = I(r)$ with $I'<0$ and $I(r) \to \infty$ as $r \to - \delta$ (or as $r \to -\infty$ if $\delta=0$), and $I(r) \to 0$ as $r \to \infty$. Then there is a unique $r$ such that

$$
I(r) = Y - C(Y-T) - G.
$$ {#eq-loanable}

An increase in $G$, holding $T$ and $Y$ fixed, reduces $S$ and raises $r$, which reduces $I$ one-for-one with the fall in $S$ (**complete crowding-out**). An increase in $T$, holding $G$ and $Y$ fixed, raises $S$ (because $C$ falls by less than $T$), lowers $r$ and raises $I$. A parallel upward shift of $I(r)$ (an investment boom) raises $r$ and raises $I$, with $S$ unchanged if $C$ does not depend on $r$.
:::

::: proof
The right-hand side of [[#eq-loanable]] is a number, say $\bar S$, once $(Y,T,G)$ are given. Strict monotonicity of $I$ and the two limits give a unique $r$ with $I(r)=\bar S$. Differentiating the identity $I(r) = Y - C(Y-T) - G$ with $Y$ held fixed, $\mathrm{d}I = I'\,\mathrm{d}r = - C' (-\mathrm{d}T) - \mathrm{d}G = C'\,\mathrm{d}T - \mathrm{d}G$. For $\mathrm{d}G>0=\mathrm{d}T$, $I'\mathrm{d}r = -\mathrm{d}G < 0$, so $\mathrm{d}r > 0$ and $\mathrm{d}I = -\mathrm{d}G$. For $\mathrm{d}T>0=\mathrm{d}G$, $I'\mathrm{d}r = C'\,\mathrm{d}T > 0$, so $\mathrm{d}r < 0$ and $\mathrm{d}I = C'\,\mathrm{d}T$, equal to the rise in public saving plus the fall in private saving, which is $(1-C')\mathrm{d}T$. A shift of $I(\,\cdot\,)$ that raises investment demand at a given $r$ requires a higher $r$ to keep $I=\bar S$ if $\bar S$ is inelastic.
:::

Complete crowding-out is the signature classical result, and it is worth stating what it is not. It is not a claim that government purchases are useless: $G$ is itself output, and a road or a vaccine can raise $A$ or $K$ in a richer model. It is not a claim about a recession, in which $Y$ is not glued to $F(\bar K,\bar L)$. It is the statement that, *when output is supply-determined*, an extra unit of $G$ must come from somewhere, and with $C$ pinned down by $Y-T$ that somewhere is $I$, with $r$ doing the rationing.

::: example Crowding-out in numbers {#ex-crowding}
Let $Y = 1000$, $C = 100 + 0.6(Y-T)$, $I = 250 - 10 r$, $T = 200$ and $G = 250$, with $r$ in per cent. Find $C$, private and public saving, national saving, $r$ and $I$. Then raise $G$ to $300$ with $T$ unchanged, and recompute.
::: solution
Disposable income is $Y-T = 800$, so $C = 100 + 0.6\times 800 = 580$. Private saving is $Y-T-C = 220$. Public saving is $T-G = -50$ (a budget deficit). National saving is $170$. Setting $I=S$ gives $250 - 10r = 170$, so $r = 8$ and $I = 170$.

With $G=300$, public saving falls to $-100$ and national saving to $120$. Then $250 - 10r = 120$, so $r = 13$ and $I = 120$. Government purchases have risen by $50$; investment has fallen by $50$; consumption is unchanged, because $Y$ and $T$ are unchanged. That is complete crowding-out. The real interest rate is the price that enforces it.
:::
:::

::: widget plot
f: (b - x)/s
x: 0, 250
y: 0, 25
sliders: b=250:150:300:5; s=10:5:20:1
vlines: 170
labels: \text{investment }I=b-s r
caption: Loanable funds $I$ (and $S$) on the horizontal axis, the real interest rate $r$ on the vertical. The downward-sloping line is inverse investment demand, $r = (b - I)/s$. The vertical line is national saving, fixed at $170$ in the numbers of [[#ex-crowding]]. Raise $b$ to mimic an investment boom: $r$ rises and equilibrium $I$ is unchanged, because $S$ has not moved. In the $G$-increase of that example, the vertical line would shift left to $120$ and $r$ would rise along the investment curve. (To see crowding-out, imagine the vertical line moving; the slider on $b$ is the other experiment.)
:::

A tax cut, in the same arithmetic, does the opposite of a spending increase only up to the marginal propensity to consume. If $T$ falls by $50$ with $G$ fixed, $C$ rises by $0.6\times 50 = 30$, private saving rises by $20$, public saving falls by $50$, and national saving falls by $30$. Then $r$ rises and $I$ falls by $30$. The tax cut crowds out investment, but less than one-for-one, because households save part of the windfall. Whether they save *all* of a tax cut that will have to be repaid later is the Ricardian question of [[macroeconomics/consumption-and-saving]] — and if they do, crowding-out of this kind disappears, because $S_{\text{private}}$ rises one-for-one with the fall in $S_{\text{public}}$.

::: remark Who is on which side of the market
“Loanable funds” is a parable. In a modern economy the matching of saving to investment runs through banks, bond markets and the rest of the financial system ([[money-banking/financial-intermediation]]). The classical diagram is what remains after those institutions have been netted out. It can be read equally as a goods-market statement — desired $C+I+G$ equals supply-determined $Y$, with $r$ adjusting — which is how Keynes’s *General Theory* and Hicks’s IS curve would later recast it, *without* taking $Y$ as given. The same two curves, a different causal story: that is the hinge between this chapter and [[macroeconomics/is-lm]].
:::

::: example A balanced-budget rise in $G$ {#ex-bb}
In the economy of [[#ex-crowding]], raise $G$ and $T$ together by $50$, to $G=300$ and $T=250$. Compute the new $r$ and $I$. Compare with the tax-financed and deficit-financed cases.
::: solution
Disposable income falls to $750$, so $C=100+0.6\times 750=550$. National saving is $1000-550-300=150$. Then $250-10r=150$, so $r=10$ and $I=150$. Relative to the original $(r,I)=(8,170)$, investment is crowded out by $20$, not by the full $50$ of extra $G$: households cut consumption by $30$ because taxes rose, and that $30$ plus the $20$ of lost $I$ funds the extra $G$. A deficit-financed rise in $G$ crowded out $I$ one-for-one; a balanced-budget rise crowds out a mix of $C$ and $I$. Output $Y$ is unchanged in both experiments, because it is supply-determined.
:::
:::

## Competing views of the long run

The classical model is a shared benchmark, not a shared conclusion about policy.

A **monetarist** reading, in the spirit of Friedman’s 1968 address, takes the long-run vertical supply of output as the central fact for monetary policy: the central bank can choose the path of the price level (next chapter) but not, beyond a transition, the path of $Y$ or $u$. Fiscal crowding-out is then a long-run regularity, and the short-run debate is about how long the transition lasts.

A **new classical** reading, associated with Lucas, Sargent and, on the cycle, Kydland and Prescott, goes further: if prices are flexible and expectations are rational, the “transition” may be so short that the classical diagrams are the right ones even at business-cycle frequencies. Observed fluctuations in $Y$ are then mostly fluctuations in $A$ or in labour supply, not in demand. Whether that is true of 2008–09 or of 2020 is an empirical question, taken up in [[business-cycles/real-business-cycles]]; it is not settled by the algebra of this chapter.

A **Keynesian** reading accepts the classical long run and denies that it is a good description of the next few years. If $w$ or $P$ is sticky, $L$ can sit to the left of $\bar L$, $Y$ can sit below $F(\bar K,\bar L)$, and $S=I$ can be restored by a fall in $Y$ rather than by a rise in $r$ — the paradox of thrift, which the next demand-side chapters will make precise. **New Keynesians** (Mankiw, Blanchard, Gali) keep the classical long run, add microfounded sticky prices, and treat the classical diagrams as the steady state of a dynamic model rather than as a description of every quarter.

None of these views is a recommendation. They are different claims about the speed of price adjustment and about the formation of expectations, and they have different implications for whether a deficit-financed road, or an open-market purchase of bonds, changes $Y$ at a given horizon. The honest use of this chapter is to know what the long-run benchmark says, so that a short-run claim can be stated as a deviation from it.

## Evidence

Three families of facts discipline the model.

**Factor shares.** In U.S. national accounts, the labour share of gross value added in the non-farm business sector has fluctuated around 60–65 per cent for decades, with a decline of several percentage points since the 1980s (U.S. Bureau of Labor Statistics, labour share series, accessed 2026). Karabarbounis and Neiman (2014, *Quarterly Journal of Economics*) documented a decline in the global corporate labour share from about 64 per cent to about 59 per cent between 1975 and 2012. Cobb–Douglas, with a fixed $\alpha$, is a first approximation that misses the decline; explanations — cheaper investment goods, superstar firms, measurement of intangible capital — belong to [[economic-growth/technology-and-growth-accounting]] and to labour economics. What the data do *not* show is a labour share that swings wildly with the capital–labour ratio from year to year, which is why [[#eq-cd]] remains the teaching workhorse.

**The composition of demand.** Household consumption is the largest component of GDP in most high-income countries and a smaller share in fast-investing middle-income ones. In 2023, household and NPISH final consumption was about 68 per cent of GDP in the United States, about 54 per cent in Germany, about 61 per cent in Brazil, about 39 per cent in China and about 60 per cent in India (World Bank WDI, household and NPISH final consumption expenditure, per cent of GDP, accessed 2026). Gross capital formation in the same year was about 22 per cent of GDP in the United States, about 42 per cent in China and about 31 per cent in India (World Bank WDI, gross capital formation, accessed 2026). The classical model treats those shares as the outcome of $C(\,\cdot\,)$, $I(r)$ and $G$, given $Y$; it does not itself explain why China’s investment share is so high, which is a growth-and-development question.

**Real interest rates and crowding-out.** Identifying a fiscal shift in $S$ with the subsequent movement of $r$ is notoriously hard, because $I(r)$ shifts too — with animal spirits, with tax rules, with the world rate in an open economy. Barro and Redlick (2011, *Quarterly Journal of Economics*) estimate a defence-spending multiplier well below one for the United States in a sample that includes large wars, which is consistent with substantial crowding-out at a horizon of a few years; Ramey (2011, *Journal of Economic Literature*) surveys a range of estimates, some near zero and some above one, depending on the identification and on whether the economy is at the zero lower bound. The classical prediction is a multiplier of zero *on total output* and a multiplier of $-1$ on investment, at a horizon at which $Y=F(\bar K,\bar L)$. The data do not speak with one voice about how quickly that horizon arrives. In a small open economy with a world real rate, crowding-out can fall on net exports rather than on $I$; that is the Mundell–Fleming variant in [[international-finance/mundell-fleming]].

South Africa’s unemployment rate was about 32 per cent in 2024 (World Bank WDI, national estimate, accessed 2026). The classical model of this chapter, which puts $L$ at $\bar L$ by assumption, is not an explanation of that fact; [[macroeconomics/unemployment]] is. The right inference is not that the production function is useless in Johannesburg, but that the labour-market clearing assumed here is a bad description of some labour markets, and a better description of others (Japan’s unemployment rate was about 2.5 per cent in 2025, on the same World Bank series).

## Where this leads

The next chapter, [[macroeconomics/money-and-inflation]], adds a quantity of money and a price level, and shows that in the same classical setting money is neutral: it sets $P$ and $i$, not $Y$ or $r$. [[macroeconomics/unemployment]] relaxes the assumption that $L=\bar L$ always, and asks why $\bar L$ itself leaves some people without jobs. Consumption and investment, treated here as schedules, are derived from intertemporal choice in [[macroeconomics/consumption-and-saving]] and [[macroeconomics/investment]]. When prices are sticky, the same $S$ and $I$ schedules become the IS curve of [[macroeconomics/is-lm]], and $Y$ becomes an endogenous demand-side variable. Over decades, $\bar K$ is not given: it is the integral of $I-\delta K$, which is the Solow model of [[economic-growth/solow-model]].

::: history
**1928, Charles Cobb and Paul Douglas.** In “A Theory of Production” (*American Economic Review*), Cobb and Douglas fitted $Y = A K^\alpha L^{1-\alpha}$ to U.S. manufacturing data for 1899–1922 and found $\alpha$ close to $1/4$, matching capital’s share in those accounts. The paper did not invent constant-returns exhaustion — Wicksteed had applied Euler’s theorem to distribution in 1894 — but it gave the profession the functional form still used in this chapter. **1936, John Maynard Keynes.** *The General Theory of Employment, Interest and Money* accepted a production function and a labour-demand curve much like those above, and denied that labour supply and the real interest rate would always restore $Y=F(\bar K,\bar L)$. The later chapters of this course are, in large part, the working-out of that disagreement.
:::

::: summary
- In the classical long-run model, output is determined by a neoclassical production function at given $K$, $L$ and $A$; competitive factor markets set $w=F_L$ and $R=F_K$.
- With constant returns to scale, Euler’s theorem implies that output is exhausted by factor payments and pure profit is zero. Under Cobb–Douglas, factor shares are the exponents $\alpha$ and $1-\alpha$.
- Closed-economy demand must satisfy $Y=C+I+G$. National saving $S=Y-C-G$ equals investment; the real interest rate $r$ is the price that enforces the equality.
- With $Y$ supply-determined, an increase in $G$ (or a tax cut that reduces $S$) raises $r$ and crowds out $I$. That is a long-run accounting result, not a claim about a recession.
- Keynesian, monetarist, new classical and New Keynesian views share this long-run benchmark and disagree about how fast the economy gets there and about whether demand can move $Y$ in the meantime.
- Factor shares, GDP composition and estimated fiscal multipliers are the relevant evidence; they constrain the model without turning it into a policy prescription.
:::

## Exercises

::: exercise A numerical production function {level=1 check="48"}
Output is $Y = 2 K^{1/2} L^{1/2}$ with $K = 36$ and $L = 16$. Compute equilibrium output. (Enter $Y$.)
::: solution
$Y = 2 \times 6 \times 4 = 48$.
:::
:::

::: exercise Factor prices in the same economy {level=1 check="1.5"}
In the economy of the previous exercise, compute the competitive real wage $w$. (Enter $w$.)
::: solution
$F_L = 2 \times \tfrac12 K^{1/2} L^{-1/2} = \sqrt{K/L} = 6/4 = 1.5$. Alternatively, $w = \tfrac12 Y/L = 24/16 = 1.5$.
:::
:::

::: exercise Shares {level=1}
Show that labour’s share and capital’s share in $Y = 2 K^{1/2} L^{1/2}$ are each $1/2$, for any $K$ and $L$. What feature of the production function is doing the work?
::: solution
$w L = F_L L = \tfrac12 Y$ and $R K = F_K K = \tfrac12 Y$. The shares are the exponents in a Cobb–Douglas (here $\alpha = 1/2$), which is the feature that makes them constant. Constant returns is what makes them add to one; the specific exponents are what makes each equal to $1/2$.
:::
:::

::: exercise Saving and the real rate {level=2 check="6"}
Let $Y=800$, $C=50+0.75(Y-T)$, $I=150-15r$, $T=80$ and $G=150$, with $r$ in per cent. Find the equilibrium real interest rate. (Enter $r$.)
::: solution
Disposable income is $Y-T=720$, so $C=50+0.75\times 720=590$. National saving is $Y-C-G=800-590-150=60$. Setting $I=S$ gives $150-15r=60$, so $15r=90$ and $r=6$. Private saving is $720-590=130$ and public saving is $80-150=-70$, which sum to the same $60$.
:::
:::

::: exercise A tax increase {level=2}
Using $Y=800$, $C=50+0.75(Y-T)$, $I=150-15r$, $T=80$ and $G=150$, raise $T$ to $120$. Compute the new $r$ and the change in $I$. Who pays for the smaller deficit?
::: solution
Originally $C=50+0.75\times720=590$, $S=800-590-150=60$, $r=6$, $I=60$. After the tax increase, $Y-T=680$, $C=50+0.75\times680=50+510=560$. $S=800-560-150=90$. Then $150-15r=90$, $15r=60$, $r=4$, $I=90$. Investment rises by $30$. Private consumption falls by $30$; private saving falls by $10$ (disposable income down $40$, consumption down $30$); public saving rises by $40$. National saving, and therefore investment, rises by $30$. The smaller deficit is “paid for” by households consuming less, and it shows up as extra $I$, not as extra $Y$.
:::
:::

::: exercise An investment boom {level=2}
In the original economy of the previous exercise ($T=80$, $I=150-15r$), investment demand becomes $I=180-15r$. Compute the new equilibrium $(r, I)$ and explain why $I$ does not rise by $30$.
::: solution
Saving is still $60$. Then $180-15r=60$, $15r=120$, $r=8$, $I=60$. The boom raises $r$ until it has choked off exactly as much investment as the shift added. With a vertical saving schedule, the quantity of investment is pinned down by $S$; only the interest rate changes. If consumption depended negatively on $r$, $S$ would slope up, $I$ would rise somewhat, and $C$ would fall.
:::
:::

::: exercise Crowding-out with interest-sensitive consumption {level=3}
Suppose $C = 100 + 0.6(Y-T) - 5r$ and $I = 250 - 10r$, with $Y=1000$, $T=200$, $G=250$ as in [[#ex-crowding]], $r$ in per cent. Find equilibrium $r$ and $I$. Then raise $G$ to $300$ and recompute. Is crowding-out complete?
::: hint
National saving now depends on $r$: $S = Y - C - G = Y - 100 - 0.6(Y-T) + 5r - G$. Set $S=I$ and solve the linear equation in $r$.
:::
::: solution
$S = 1000 - 100 - 0.6\times 800 + 5r - 250 = 1000-100-480+5r-250 = 170 + 5r$. Set $170+5r = 250-10r$, so $15r = 80$ and $r = 16/3 \approx 5.333$. Then $I = 250 - 10\times 16/3 = 250 - 160/3 = 590/3 \approx 196.67$. (Check: $S=170+5\times 16/3=170+80/3=590/3$.)

With $G=300$, $S = 120 + 5r$. Then $120+5r = 250-10r$, $15r=130$, $r=26/3 \approx 8.667$. $I = 250 - 260/3 = 490/3 \approx 163.33$. Investment has fallen by $100/3 \approx 33.3$, not by the full $50$ of extra $G$. The rest is a fall in consumption: extra $r$ reduces $C$ by $5\times 10/3 = 50/3 \approx 16.7$. Crowding-out is shared between $I$ and $C$; it is still complete in the sense that $Y$ is unchanged and $C+I$ falls one-for-one with $G$.
:::
:::

::: exercise Open-economy accounting {level=3}
In an open economy the identity is $Y = C + I + G + NX$ and national saving satisfies $S = I + NX$. Suppose a closed economy with $S=I=170$ opens, the world real interest rate is below the autarky $r$, and $I$ therefore rises to $200$ while $S$ stays at $170$. What is $NX$? Interpret the capital flow. How would a small-open-economy version of crowding-out appear?
::: hint
Use $NX = S - I$. Crowding-out of a rise in $G$ now falls on $NX$ if $r$ is pinned by the world market.
:::
::: solution
$NX = S-I = 170-200 = -30$. The country runs a trade deficit of $30$ and is a net borrower: foreign savers supply the $30$ of extra investment. In a small open economy, $r$ equals the world rate and does not rise when $G$ rises. Then $S$ falls with $G$ (and with any induced change in $C$), $I$ is unchanged, and $NX$ falls one-for-one with $S$. Crowding-out appears as a larger trade deficit rather than as higher domestic $r$ and lower domestic $I$. The classical closed-economy diagram is the special case of capital immobility; the open-economy case is developed in [[international-finance/current-account]].
:::
:::
