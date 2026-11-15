People do not live forever, and they do not fully internalise the welfare of the unborn. The Ramsey model of the last chapter used a dynasty that did both. Replace the dynasty with a sequence of finite-lived generations that overlap, and two things change. First, saving is done by the young, out of wages, to fund old-age consumption; the interest rate must then clear a market in which the old sell capital to the young. Second, the resulting $k$ can exceed the golden-rule stock. Extra capital can be a burden rather than a gift, and a well-designed transfer from young to old — a pay-as-you-go pension, or a stock of public debt — can raise every generation's welfare.

That is the **Diamond** (1965, *American Economic Review*) overlapping-generations (OLG) model. It is the workhorse for thinking about pensions, the burden of the public debt, and the possibility that a competitive economy accumulates too much capital. Samuelson's 1958 consumption-loan economy is the pure-exchange ancestor; Diamond added production and capital.

## The Diamond model

Time is discrete. Each generation lives two periods, **young** and **old**. At $t$, $L_t$ young people work; $L_{t-1}$ old people are retired. Population grows at rate $n$, so $L_t = (1+n)L_{t-1}$. One good is produced with Cobb–Douglas (or, more generally, neoclassical) $Y_t = F(K_t, L_t)$, constant returns, Inada. Capital fully depreciates in a period, or depreciates at rate $\delta$; the algebra below keeps a general $\delta \in [0,1]$. Factors are paid their marginal products:

$$
r_t = f'(k_t) - \delta, \qquad w_t = f(k_t) - k_t f'(k_t),
$$

with $k_t = K_t/L_t$ and $f(k)=F(k,1)$.

The young supply one unit of labour, consume $c_t^y$, and save $s_t = w_t - c_t^y$. The old consume their saving plus interest: $c_t^o = (1+r_t)s_{t-1}$. There is no bequest motive. Preferences of a generation born at $t$ are $u(c_t^y) + \beta u(c_{t+1}^o)$, with $\beta \in (0,1)$.

::: definition The Diamond OLG economy {#def-diamond}
A **Diamond competitive equilibrium** is a sequence $(k_t, c_t^y, c_t^o, r_t, w_t)$ such that: (i) each generation maximises $u(c^y)+\beta u(c^o)$ subject to $c^y + s = w$ and $c^o = (1+r')s$, taking $(w,r')$ as given; (ii) firms pay [[#eq-factors]] below; (iii) capital market clearing: $K_{t+1} = L_t s_t$, or

$$
(1+n)k_{t+1} = s(w_t, r_{t+1}),
$$ {#eq-clearing}

where $s(\cdot)$ is the young's saving function. The resource constraint $c_t^y + c_t^o/(1+n) + (1+n)k_{t+1} = f(k_t) + (1-\delta)k_t$ then holds by Walras.
:::

The factor prices above are

$$
r_t = f'(k_t)-\delta, \qquad w_t = f(k_t)-k_t f'(k_t).
$$ {#eq-factors}

Under log utility $u(c)=\ln c$, saving is a constant fraction of wages, independent of $r$:

$$
s = \frac{\beta}{1+\beta}\, w.
$$ {#eq-log-s}

The future interest rate drops out because income and substitution effects cancel. That is a convenience, not a general property; with $\theta \neq 1$ the saving function depends on $r_{t+1}$ and [[#eq-clearing]] is an implicit equation in $k_{t+1}$.

::: proposition Log-utility dynamics {#prop-log}
With $u=\ln$, Cobb–Douglas $f(k)=k^\alpha$ and full depreciation $\delta=1$,

$$
k_{t+1} = \frac{1}{1+n}\cdot\frac{\beta}{1+\beta}\cdot(1-\alpha)\, k_t^\alpha.
$$ {#eq-log-law}

There is a unique positive steady state

$$
k^* = \Bigl(\frac{\beta(1-\alpha)}{(1+\beta)(1+n)}\Bigr)^{1/(1-\alpha)},
$$ {#eq-kstar-olg}

and it is globally stable for any $k_0>0$.
:::

::: proof
Cobb–Douglas plus $\delta=1$ gives $w=(1-\alpha)k^\alpha$. Substitute [[#eq-log-s]] into [[#eq-clearing]] to obtain [[#eq-log-law]]. A steady state satisfies $k = C k^\alpha$ with $C=\beta(1-\alpha)/((1+\beta)(1+n))$, hence [[#eq-kstar-olg]]. The map $k \mapsto k_{t+1}$ is increasing and concave, starts above the 45-degree line near 0 (Inada) and below it for large $k$, so the unique fixed point attracts every positive $k_0$.
:::

::: example A two-period calibration {#ex-olg-ss}
Take $\alpha=1/3$, $\beta=0.6$, $n=1$ (the working-age population doubles each generation — a generation is 25–30 years, so this $n$ is a bit high but keeps numbers round), $\delta=1$. Compute $s/w$, $k^*$, $f'(k^*)$, and $1+r^*$. Is $1+r^*$ larger or smaller than $1+n$?
::: solution
$s/w = \beta/(1+\beta)=0.6/1.6=0.375$. Then

$$
k^* = \Bigl(\frac{0.6\times(2/3)}{1.6\times 2}\Bigr)^{3/2} = \bigl(0.4/3.2\bigr)^{3/2} = 0.125^{1.5} = 0.0442.
$$

$f'(k)=\alpha k^{\alpha-1}=(1/3)(0.0442)^{-2/3}=2.667$, so $1+r^*=f'(k^*)$ (because $\delta=1$) equals $2.667$, and $1+n=2$. Here $1+r^* > 1+n$: the economy is *below* the golden rule. A different $\beta$, closer to 1, or a smaller $n$, can reverse the inequality — that is the next section.
:::
:::

::: widget sequence
a: 0.0442*(0.01/0.0442)^((1/3)^(n-1))
N: 8
mode: terms
limit: 0.0442
start: 1
y: 0, 0.06
caption: Exact path of $k_t$ in the log Diamond example, $k_{t+1}=0.125\,k_t^{1/3}$, from $k_1=0.01$ toward $k^*=0.0442$. The closed form is $\ln k_t - \ln k^* = \alpha^{t-1}(\ln k_1-\ln k^*)$. Two or three generations (not years) close most of the gap.
:::

The widget is a sketch of a gap closing, not the exact recurrence; the exact map is [[#eq-log-law]]. Iterate from $k_0=0.01$: $k_1=0.125\times(0.01)^{1/3}=0.0269$, $k_2=0.125\times(0.0269)^{1/3}=0.0375$, $k_3=0.0417$, $k_4=0.0433$, already at $k^*$. Two or three generations suffice.

## Dynamic inefficiency

The golden rule in discrete time maximises steady-state consumption per person. With $\delta=1$, the whole capital stock is replaced each period, so consumption per young person (including the old, of whom there are $1/(1+n)$ per young) is $f(k)-(1+n)k$. That expression is maximised at $f'(k_{\mathrm{gold}})=1+n$. With general $\delta$, the condition is $f'(k_{\mathrm{gold}})=n+\delta$, the same as in Solow.

::: definition Dynamic inefficiency {#def-dyn-ineff}
A steady state $k^*$ is **dynamically inefficient** if $k^* > k_{\mathrm{gold}}$, equivalently $f'(k^*) < n+\delta$ (or $1+r^* < 1+n$ when $\delta=1$). Then a reduction in capital, financed by a transfer from young to old, raises consumption of every generation, including those already alive and all future ones.
:::

::: proposition Possibility of overaccumulation {#prop-overacc}
In the Diamond model, $k^*$ may lie above or below $k_{\mathrm{gold}}$. With log utility, Cobb–Douglas and $\delta=1$, $k^*>k_{\mathrm{gold}}$ if and only if

$$
\frac{\alpha}{1-\alpha} < \frac{\beta}{(1+\beta)(1+n)}\cdot(1+n) = \frac{\beta}{1+\beta},
$$

i.e. if $\alpha$ is small relative to the saving propensity of the young. Impatient generations (small $\beta$) and fast population growth (large $n$) push *toward* efficiency (less accumulation); a small capital share pushes toward inefficiency (wages, the source of saving, are large).
:::

::: proof
From [[#eq-kstar-olg]], $f'(k^*)=\alpha (k^*)^{\alpha-1} = \alpha(1+n)(1+\beta)/(\beta(1-\alpha))$. Compare with $1+n$: $f'(k^*) < 1+n$ iff $\alpha(1+\beta)/(\beta(1-\alpha))<1$ iff $\alpha/(1-\alpha) < \beta/(1+\beta)$.
:::

The mechanism is missing markets for trade with the unborn. A Ramsey household that found $r < n$ would eat capital until $r=\rho>n$. An old Diamond agent cannot sell capital to the unborn; the young are the only buyers, and they save out of wages, not out of a dynastic Euler equation. If wages are high (low $\alpha$) and the young save a lot, they bid $k$ up and $r$ down past $n$.

::: example Crossing the golden rule {#ex-cross}
Take $\delta=1$ and log utility. (a) Show that $\alpha=1/3$ *never* produces dynamic inefficiency, for any $\beta\in(0,1)$ and $n\ge 0$. (b) Now set $\alpha=0.2$, $\beta=0.9$, $n=1$. Compute $k^*$, $1+r^*$ and $1+n$, and classify the steady state.
::: solution
(a) [[#prop-overacc]] requires $\alpha/(1-\alpha) < \beta/(1+\beta)$. The right-hand side is strictly less than $1/2$ for $\beta<1$, and $\alpha=1/3$ makes the left-hand side equal to $1/2$. The inequality never holds. (b) $\alpha/(1-\alpha)=0.25 < 0.9/1.9=0.474$, so the criterion says inefficient. Directly: $k^*=\bigl(0.9\times 0.8/(1.9\times 2)\bigr)^{1/0.8}=(0.72/3.8)^{1.25}=0.1895^{1.25}=0.125$, $f'(k^*)=0.2\times 0.125^{-0.8}=0.919$, and $1+n=2$. Since $1+r^*=0.919<2$, the steady state is dynamically inefficient.
:::
:::

Abel, Mankiw, Summers and Zeckhauser (1989, *Review of Economic Studies*) proposed a test: an economy is dynamically efficient if the return on capital exceeds the growth rate of the economy, in a cash-flow sense (profits exceed investment). They did not find overaccumulation in the G7 of their sample. Subsequent work (Geerolf; Blanchard 2019 on $r<g$ and public debt) has reopened the question for the post-1980 era of low safe rates. The *safe* rate $r_f$ can be below $g$ while the *marginal product of capital* is above $g$, if a risk or liquidity premium sits in between. Dynamic inefficiency is a statement about the marginal product, not about T-bill rates. This course records the distinction and does not treat the empirical question as closed.

::: example A generation's budget {#ex-budget}
A young worker earns $w=6$, faces $r'=1$ (so $1+r'=2$), and has $\beta=1$ with log utility. Compute $c^y$, $s$ and $c^o$. Verify that the Euler equation $1/c^y = \beta(1+r')/c^o$ holds.
::: solution
Log utility with $\beta=1$ saves half the wage: $s=3$, $c^y=3$, $c^o=(1+r')s=6$. Euler: $1/3 = 1\cdot 2 / 6 = 1/3$. Lifetime consumption, in present value, is $c^y + c^o/(1+r') = 3+6/2=6=w$. The generation is neither a net borrower nor a net lender vis-à-vis *its own* wage; the capital it holds is a claim on the next generation's labour, which is the overlapping-generations substitute for a Ramsey dynasty's claim on itself.
:::
:::

::: warning $r<g$ on public debt is not the Diamond test
A government that rolls over debt at a safe rate below the growth rate of GDP can run a positive primary deficit without an exploding debt-to-GDP ratio. That arithmetic is real (see [[macroeconomics/fiscal-policy-and-debt]]). It is not, by itself, evidence that $k>k_{\mathrm{gold}}$. The relevant $r$ for [[#def-dyn-ineff]] is the marginal product of capital, which includes the return on equity, housing and private capital, and which has remained well above $g$ in most post-war samples even as $r_f$ has not (see Jordà, Knoll, Kuvshinov, Schularick and Taylor 2019, *QJE*, on the rate of return on everything).
:::

## Pensions and public debt

A **pay-as-you-go** (PAYG) pension taxes the young by $\tau$ per worker and pays the old $(1+n)\tau$ per old person (a balanced PAYG scheme). The young's lifetime budget becomes $c^y + c^o/(1+r) = w-\tau + (1+n)\tau/(1+r)$. The implicit return on the "contributions" is $n$, not $r$.

::: proposition PAYG in the Diamond model {#prop-payg}
A small balanced PAYG pension: (i) reduces $k^*$ (the young have smaller lifetime resources in present value if $r>n$, and in any case save less from a smaller disposable wage); (ii) raises welfare at a dynamically inefficient steady state, because it is a move toward $k_{\mathrm{gold}}$ plus a transfer with return $n>r$; (iii) lowers welfare of future generations at a dynamically efficient steady state, while the first old generation gains.
:::

The first old generation is the standard political-economy flywheel: they receive $(1+n)\tau$ without having paid. Introducing PAYG is a Pareto improvement only in the inefficient region. In the efficient region it is a transfer from the future to the present, and whether it is desirable is a distributional judgement, not an efficiency one.

Public debt, in Diamond's original exercise, is a substitute. A stock of debt $B_t$ must be held by the young along with claims on physical capital, so $(1+n)k_{t+1} + b_{t+1} = s(\cdot)$: debt *crowds out* capital. In a dynamically inefficient economy that crowding-out is a feature. In an efficient economy it is a cost, to be weighed against whatever public goods the debt financed. Ricardian equivalence fails because the current young will not be alive when later taxes are levied, and they do not have operative bequests.

::: example Crowding out, in numbers {#ex-debt}
In the log, Cobb–Douglas, $\delta=1$ model, saving is $s=\frac{\beta}{1+\beta}(1-\alpha)k^\alpha$. With a constant debt per young person $b$, the law of motion is $(1+n)k' + b = s$. Using $\alpha=1/3$, $\beta=0.6$, $n=1$ as in [[#ex-olg-ss]], compare $k^*$ at $b=0$ with $k^*$ at $b=0.02$.
::: solution
Without debt, $k^*=0.0442$ as before. With debt,

$$
2k^* + 0.02 = 0.375\times(2/3)\, (k^*)^{1/3} = 0.25\, (k^*)^{1/3}.
$$

Let $z=(k^*)^{1/3}$. Then $2z^3 - 0.25 z + 0.02=0$. Trying $z=0.30$: $2(0.027)-0.075+0.02=0.054-0.075+0.02=-0.001$. Close to zero; $z\approx 0.301$, $k^*\approx 0.0273$. Debt of 0.02, less than half of the original $k^*$, cuts the capital stock by about 38 per cent. Crowding-out is one-for-one in the *saving* identity, and more than one-for-one in $k$ because lower $k$ lowers wages and saving further.
:::
:::

::: quiz
In a dynamically *efficient* Diamond steady state, introducing a small PAYG pension
- [ ] raises the welfare of every generation
- [x] raises the welfare of the first old generation and lowers the welfare of future generations
- [ ] has no welfare effect, by Ricardian equivalence
- [ ] raises $k^*$
::: solution
The first old receive a transfer they did not pay for. Future generations face $r>n$, so the implicit PAYG return $n$ is worse than the market, and $k^*$ falls, which is a move *away* from $k_{\mathrm{gold}}$. Ricardian equivalence would require the young to undo the scheme by private bequests; they do not, in Diamond, because bequests are not in the model (and would have to be operative even if they were).
:::
:::

## Bequests, altruism and the link to Ramsey

If each generation values the utility of its descendants at discount $\beta_{\mathrm{beq}}$, and the bequest motive is *operative* (interior bequests), Barro (1974, *JPE*) showed that the OLG economy collapses to a Ramsey dynasty. Debt is then neutral, PAYG is undone by extra bequests, and dynamic inefficiency cannot occur. Whether bequests are operative is empirical: a mix of accidental bequests (incomplete annuities), warm-glow giving, and genuine altruism, with the last not clearly dominant (see the survey in Weil, *Economic Growth*, ch. 3 of the overlapping-generations material, and the empirical work of Altonji, Hayashi and Kotlikoff 1997, *JPE*).

This course treats Ramsey and Diamond as complementary polar cases. Ramsey is the right polar case for questions about a representative consumer at high frequency (business cycles, the Euler equation at annual data). Diamond is the right polar case for questions about pensions, the intergenerational incidence of debt, and the logical possibility of overaccumulation.

## Where this leads

The next chapter, [[economic-growth/endogenous-growth]], returns to infinite (or dynastic) lives and asks where $g$ comes from. Institutions, in the last chapter, are one reason $n$, $\beta$, $\alpha$ and the presence or absence of a bequest motive differ across countries. Development economics, [[development-economics]], takes the pension and micro-insurance questions to poor countries, where informal old-age support is the PAYG scheme.

For education only — not investment or financial advice. Nothing here is a recommendation about any person's pension, any government's debt, or any asset.

::: history
**1958–1965, Samuelson and Diamond.** Paul Samuelson's "An Exact Consumption-Loan Model of Interest" (1958, *JPE*) showed that a pure-exchange OLG economy can be inefficient and that money can be a Pareto-improving social contrivance. Peter Diamond (1965, *AER*) added neoclassical production and public debt, and gave the overaccumulation condition in terms of $r$ and $n$. David Gale, Olivier Blanchard, and Philippe Weil developed the subsequent fiscal and demographic theory; the Abel–Mankiw–Summers–Zeckhauser (1989) test is how the inefficiency question was taken to G7 data.
:::

::: summary
- Diamond OLG: two-period lives, the young save out of wages, $K_{t+1}=L_t s_t$. With log utility, $s=\frac{\beta}{1+\beta}w$ and a closed-form $k^*$.
- The competitive $k^*$ may exceed $k_{\mathrm{gold}}$. Dynamic inefficiency is $1+r < 1+n$ (when $\delta=1$), and it is a missing-market phenomenon, not a household mistake.
- PAYG pensions and public debt crowd out capital. That is welfare-improving if and only if the economy is dynamically inefficient; otherwise it is a transfer to the current old.
- $r_f < g$ on government paper is not the Diamond test. The test uses the marginal product of capital.
- Operative altruistic bequests restore Ramsey and cancel these results. Whether bequests are operative is not a theorem.
:::

## Exercises

::: exercise Log saving {level=1 check="0.5"}
With $u=\ln$ and $\beta=1$, what fraction of the wage does the young save? (Enter a decimal.)
::: solution
$s/w = \beta/(1+\beta)=1/2=0.5$.
:::
:::

::: exercise Steady-state $k$ {level=1}
Using [[#eq-kstar-olg]] with $\alpha=1/2$, $\beta=1$, $n=1$, $\delta=1$, compute $k^*$ and $1+r^*$.
::: solution
$k^* = \bigl(1\cdot(1/2)/((2)\cdot(2))\bigr)^{1/(1/2)} = (0.5/4)^2 = 0.125^2 = 0.015625$. Then $f'(k)=\tfrac12 k^{-1/2}=\tfrac12 / 0.125 = 4$, so $1+r^*=4$. And $1+n=2$, so $r^*>n$: efficient.
:::
:::

::: exercise Golden-rule comparison {level=1}
In the previous exercise, what is $k_{\mathrm{gold}}$ under $\delta=1$? Is $k^*$ above or below it?
::: solution
$f'(k_{\mathrm{gold}})=1+n=2$, so $\tfrac12 k^{-1/2}=2$, $k^{-1/2}=4$, $k_{\mathrm{gold}}=1/16=0.0625$. And $k^*=0.0156<0.0625$: below the golden rule, consistent with $1+r^*>1+n$.
:::
:::

::: exercise When is log Cobb–Douglas inefficient? {level=2}
Using [[#prop-overacc]], find the largest $\alpha$ at which a log-utility Diamond economy with $\delta=1$ can be dynamically inefficient, and say whether it is attained for any $\beta<1$.
::: solution
Need $\alpha/(1-\alpha) < \beta/(1+\beta) < 1/2$, so $\alpha/(1-\alpha)<1/2$, so $\alpha<1/3$. The bound $\alpha=1/3$ is approached as $\beta\to 1$ but never reached for $\beta<1$. Capital shares of one-third or more rule out log-Cobb–Douglas overaccumulation. That is why textbook "inefficient" calibrations use a smaller $\alpha$ or a utility with a weaker income effect on saving.
:::
:::

::: exercise A PAYG tax {level=2}
In the log model, a wage tax $\tau$ with PAYG return $n$ reduces disposable resources of the young by $\tau - (1+n)\tau/(1+r')$ in present value. If the economy is at a steady state with $r>n$, does this present-value term have a positive or negative sign, and does it raise or lower saving?
::: solution
$\tau - (1+n)\tau/(1+r) = \tau\bigl(1 - (1+n)/(1+r)\bigr)$, which is **positive** when $r>n$: the young lose on a present-value basis. Lifetime wealth falls, so saving falls (log utility: saving is a fraction of lifetime wealth, equivalently of the wage net of the present-value tax). On top of that, the tax reduces the current wage one-for-one, which is the cash-flow channel. Both channels lower $k^*$.
:::
:::

::: exercise Crowding-out identity {level=2}
Suppose the young's saving $s$ is, to a first approximation, fixed. A rise in debt per young person of $\Delta b$ changes $k$ by how much in the next period, in a small open economy versus a closed Diamond economy? (One sentence each.)
::: solution
Small open economy: $k$ is pinned by $f'(k)=r^*$ world, so $\Delta k=0$; extra debt is held by foreigners (or the young hold less foreign capital). Closed Diamond: $(1+n)\Delta k' = -\Delta b$ if $s$ is fixed, so $\Delta k' = -\Delta b/(1+n)$: one-for-one crowding out of the capital *stock to be used next period*, per young person, scaled by population growth. Once $s$ depends on $w(k)$, the closed-economy multiplier is larger, as in [[#ex-debt]].
:::
:::

::: exercise Design a Pareto move {level=3}
A log, Cobb–Douglas, $\delta=1$ economy has $\alpha=0.2$, $\beta=0.9$, $n=0.5$. (a) Compute $k^*$, $1+r^*$, $1+n$ and determine efficiency. (b) Describe a one-time transfer that, together with a permanent reduction in $k$, makes every generation better off. (c) Why can a Ramsey planner not need this instrument?
::: hint
Part (a): $k^*=\bigl(\beta(1-\alpha)/((1+\beta)(1+n))\bigr)^{1/(1-\alpha)}$.
:::
::: solution
(a) $k^*=\bigl(0.9\times 0.8/(1.9\times 1.5)\bigr)^{1/0.8}=\bigl(0.72/2.85\bigr)^{1.25}=0.2526^{1.25}=0.178$. $f'(k^*)=0.2\times 0.178^{-0.8}=0.2\times 3.46=0.692$, so $1+r^*=0.692 < 1.5=1+n$: inefficient. (b) Tax the young a small $\tau$, give the proceeds to the current old, and keep the scheme in place (or, equivalently, issue a small stock of perpetual debt and consume the proceeds). The current old gain the transfer. Every subsequent generation gains because $k$ falls toward $k_{\mathrm{gold}}$ (where $f'(k)=1+n$) *and* because the PAYG return $n$ exceeds $r$. (c) A Ramsey household with $\rho>n$ would never have overaccumulated; the Euler equation already keeps $k<k_{\mathrm{gold}}$. The missing market for trade with the unborn is the whole of the Diamond inefficiency, and the dynasty internalises those trades.
:::
:::

::: exercise $r<g$ and housing {level=3}
Suppose the net marginal product of business capital is 6 per cent, GDP grows at 2 per cent, and the safe rate is 0 per cent, all illustrative. (a) Is the Diamond test for dynamic inefficiency passed or failed? (b) In two or three sentences, how can $r_f < g < \mathrm{MPK}-\delta$ coexist, and what does that combination imply for the welfare effects of extra public debt *held as a substitute for capital* versus extra public debt *absorbed by a demand for safe stores of value*?
::: solution
(a) Failed (i.e. the economy is *not* dynamically inefficient on the Diamond criterion): $\mathrm{MPK}-\delta = 0.06 > 0.02 = g \approx n+g_{\mathrm{tech}}$ in the relevant comparison. (b) A demand for safe, liquid claims (money, Treasuries, convenience yield) can drive $r_f$ below $g$ even while productive capital earns above $g$. Extra public debt that merely satiates that demand need not crowd out $K$ one-for-one and can be cheap to roll. Extra public debt that *is* a substitute for claims on $K$ still crowds $K$ out, and because $\mathrm{MPK}-\delta>g$ that crowding-out has a first-order cost. Blanchard (2019) emphasises the first channel; Diamond (1965) is the second. They are not the same experiment.
:::
:::
