A share is a residual claim: whatever cash the firm does not pay to creditors, suppliers, employees and the tax authority can, in principle, be paid to owners. Unlike the promised coupons of [[corporate-finance/valuing-bonds]], that residual is not a contract. Valuation still uses the present-value algebra of [[corporate-finance/time-value-of-money]], but the cash-flow stream has to be *modelled* rather than read off a bond indenture. Two models dominate the textbooks: the **dividend-discount model**, which discounts expected dividends, and the **free-cash-flow model**, which discounts cash that could be paid to all investors and then subtracts net debt. Multiples of earnings or of book value — valuation by comparable firms — are a restricted form of the same idea, with the restriction often left implicit.

Every firm in this chapter is fictional and every cash-flow path is illustrative. A calculated share price is the present value of an assumed stream at an assumed rate. It is not a recommendation to buy, sell or hold any share, and it is not a forecast of a market price. The atlas is for education only — not investment or financial advice. Where a model needs a discount rate, the rate is taken as data; [[corporate-finance/risk-and-return]] is where that rate is built from risk.

John Burr Williams wrote in 1938 that a share is worth the discounted value of its expected dividends. The statement is a present-value identity once “expected dividends” and “the discount rate” are given. The work is in giving them, and in not confusing a model price with a quoted price.

## The dividend-discount model

::: definition Dividend-discount price {#def-ddm}
Let $D_t$ be the dividend per share at the end of year $t$, and let $r$ be a constant discount rate for the risk class of the share. The **dividend-discount** present value is

$$
P_0 = \sum_{t=1}^{\infty} \frac{D_t}{(1+r)^{t}},
$$ {#eq-ddm}

when the series converges. A finite-horizon version with a terminal price $P_T$ is $P_0 = \sum_{t=1}^{T} D_t (1+r)^{-t} + P_T (1+r)^{-T}$. The terminal price is itself a dividend-discount value from date $T$ onward, so the two writings are the same object cut at different dates.
:::

If dividends are expected to grow at a constant rate $g$ forever, with next year’s dividend $D_1$ already named, [[#eq-ddm]] becomes a growing perpetuity.

::: proposition Gordon growth formula {#prop-gordon}
Suppose $D_t = D_1 (1+g)^{t-1}$ for $t \ge 1$, with $r > g$. Then

$$
P_0 = \frac{D_1}{r - g}.
$$ {#eq-gordon}

Equivalently, $P_0 = D_0 (1+g)/(r-g)$ when $D_1 = D_0(1+g)$. The implied discount rate is $r = D_1/P_0 + g$, the expected dividend yield plus the growth rate.
:::

::: proof
This is the growing-perpetuity formula of [[corporate-finance/time-value-of-money]] with $C = D_1$. The series is $\sum_{t=1}^{\infty} D_1 (1+g)^{t-1} (1+r)^{-t} = D_1/(1+r) \sum_{k=0}^{\infty} \bigl((1+g)/(1+r)\bigr)^{k}$, which sums to $D_1/(r-g)$ when $r > g$.
:::

The formula is unforgiving about $r > g$. A firm cannot grow its dividend faster than the discount rate forever and still have a finite price; the hypothesis $r > g$ is the statement that the model is being applied inside its domain. Growth at rate $g$ of *dividends* is also not the same as growth of earnings or of the firm’s investment programme: if the firm retains a fraction $b$ of earnings and earns a constant return $R$ on book equity, the sustainable growth rate of dividends is $g = bR$ only under those constancy assumptions (the **clean-surplus** identity and a constant payout). Drop constancy and $g = bR$ is an approximation, not an identity.

::: example A Gordon price {#ex-gordon}
Firm A is expected to pay a dividend of $2$ units per share in one year. Dividends are then expected, in this illustration, to grow at $g = 4$ percent a year forever. The discount rate is $r = 10$ percent. What is $P_0$? What happens to $P_0$ if $g$ is revised to $5$ percent, holding $r$ and $D_1$ fixed?
::: solution
[[#eq-gordon]] gives $P_0 = 2 / (0.10 - 0.04) = 33.\overline{3}$ units. At $g = 5$ percent the same formula gives $2 / 0.05 = 40$ units. A one-percentage-point rise in assumed growth, inside the model and holding $r$ fixed, raises the model price by $6.67$ units, about $20$ percent. The sensitivity is the derivative $D_1/(r-g)^{2}$, which explodes as $g$ approaches $r$. That explosion is a warning about the model’s domain, not a reason to treat a small change in a growth forecast as a trading opportunity. Both prices are present values of invented dividend paths.
:::
:::

::: widget plot
f: 2/(r-x)
sliders: r=0.10:0.08:0.16:0.01
x: 0, 0.07
y: 0, 80
labels: \text{Gordon } P_0
caption: Gordon present value P_0 = 2/(r − g) as a function of the growth rate g, with r on the slider. Raise g toward r and the model price rises without bound — the formula leaving its domain, not a market event. The dividend of 2 is invented.
:::

A constant-growth path is a strong assumption. A common relaxation is **two-stage** growth: a finite period of growth at rate $g_s$, then a perpetual rate $g_l$ with $r > g_l$. Next year’s dividend still starts the clock.

::: example Two-stage dividends {#ex-two-stage}
Firm B paid $D_0 = 1.50$ units this year. Dividends are assumed to grow at $12$ percent for three years and at $4$ percent a year thereafter. The discount rate is $10$ percent. Compute $D_1, D_2, D_3$, the terminal price $P_3$, and $P_0$.
::: solution
$D_1 = 1.50 \times 1.12 = 1.68$, $D_2 = 1.68 \times 1.12 = 1.8816$, $D_3 = 1.8816 \times 1.12 = 2.107392$. From date $3$ the Gordon formula applies to $D_4 = 2.107392 \times 1.04 = 2.19168768$:

$$
P_3 = \frac{2.19168768}{0.10 - 0.04} = 36.528128.
$$

Discounting back,

$$
P_0 = \frac{1.68}{1.10} + \frac{1.8816}{1.10^{2}} + \frac{2.107392 + 36.528128}{1.10^{3}} \approx 32.11.
$$

The terminal price is most of the present value: without it, the three dividends alone are worth about $4.67$. Two-stage models always hide a Gordon model at the horizon, so they inherit $r > g_l$ and they inherit the sensitivity of [[#eq-gordon]] to the long-run pair $(r, g_l)$. Changing the length of the high-growth stage, or the long-run payout that sits inside $g_l$, typically moves $P_0$ by more than a refinement of $D_1$.
:::
:::

::: warning Growth above the discount rate
Applying $P_0 = D_1/(r-g)$ with $g \ge r$ is not a “very high price”; it is an undefined expression or a divergent series. A firm may grow faster than $r$ for a *finite* number of years — that is the first stage of [[#ex-two-stage]] — but a perpetual $g \ge r$ is outside the model. Spreadsheet error, and rhetoric that treats a supernormal growth rate as permanent, are the usual sources. A related error is to mix a nominal $r$ with a real $g$, or the reverse; dating inflation twice, or not at all, is the same unit mistake as in the time-value chapter.
:::

## Free cash flow and the enterprise

Dividends are a *payout* choice. A firm that currently pays no dividend, or that pays an erratic dividend while retaining cash, is an awkward input to [[#eq-ddm]] even if the firm is expected to pay later. **Free cash flow to the firm** (FCFF) is the cash generated by operations after tax and after reinvestment in working capital and in long-term capital, but *before* interest. Discounting FCFF at the weighted average cost of capital, developed in [[corporate-finance/risk-and-return]], gives an **enterprise value**. Equity value is enterprise value minus net debt (interest-bearing debt minus surplus cash).

::: definition Free cash flow to the firm {#def-fcff}
**Free cash flow to the firm** in a period is

$$
\mathrm{FCFF} = \mathrm{EBIT}(1 - t_c) + \text{depreciation} - \text{capital expenditure} - \Delta NWC,
$$

where $t_c$ is the corporate tax rate used in the illustration and $\Delta NWC$ is the increase in non-cash net working capital. Interest is not deducted: tax shields on interest are taken up in the discount rate (WACC) or as a separate present value (adjusted present value in [[corporate-finance/capital-structure]]), not as a reduction of the cash-flow forecast. **Free cash flow to equity** (FCFE) deducts after-tax interest and net debt repayments, and is discounted at the cost of equity.
:::

The three writings — discounted dividends, discounted FCFE, discounted FCFF minus net debt — agree when the forecasts are internally consistent (clean surplus, a named payout, a named debt policy) and when the discount rates match the claims being discounted. They disagree when a dividend forecast silently contradicts a reinvestment forecast, or when a WACC computed at one leverage is applied to a cash-flow path that changes leverage. Consistency is the content of the identity; the identity does not pick a favourite writing.

::: proposition Growing free-cash-flow value {#prop-fcf}
If FCFF is expected to grow at a constant rate $g$ from a next-year value $\mathrm{FCFF}_1$, and if the (constant) weighted average cost of capital is $r_{\mathrm{WACC}} > g$, enterprise value is

$$
V_0 = \frac{\mathrm{FCFF}_1}{r_{\mathrm{WACC}} - g}.
$$ {#eq-fcf}

Equity value is $E_0 = V_0 - D_0^{\mathrm{net}}$, where $D_0^{\mathrm{net}}$ is current net debt. The formula is [[#eq-gordon]] applied to a different residual.
:::

::: proof
Replace $D_1$ by $\mathrm{FCFF}_1$ and $r$ by $r_{\mathrm{WACC}}$ in the proof of [[#prop-gordon]]. Subtracting net debt assigns the enterprise to equity holders after the debt claim.
:::

::: example An enterprise-value illustration {#ex-fcf}
Northbridge Ltd, a fictional firm, is forecast to produce free cash flow to the firm of $40$ units next year, growing at $3$ percent a year thereafter. The WACC used in the illustration is $9$ percent. Net debt is $120$ units. Compute enterprise value and equity value.
::: solution
$r_{\mathrm{WACC}} > g$, so $V_0 = 40 / (0.09 - 0.03) = 666.67$ units. Equity value is $666.67 - 120 = 546.67$ units. If the firm has $100$ shares, the model value per share is $5.47$ units. A two-stage version would discount a finite explicit forecast and then apply [[#eq-fcf]] to the last year’s cash flow growing at the long-run $g$. As in [[#ex-two-stage]], the terminal piece is typically most of $V_0$, so the long-run pair $(r_{\mathrm{WACC}}, g)$ carries most of the model’s sensitivity.

The $9$ percent is an input, not an estimate from data, and the $40$ is a forecast in a numerical example, not a reported cash flow. Changing either input changes $V_0$ one-for-one with [[#eq-fcf]]. That is the algebra of a growing perpetuity. It is not a finding about Northbridge as a listed company, because Northbridge is not a listed company.
:::
:::

::: example A two-year explicit forecast {#ex-two-year-fcf}
Cedar & Pine, fictional, has $\mathrm{FCFF}_1 = 25$ and $\mathrm{FCFF}_2 = 28$. From year two, cash flow is assumed to grow at $3$ percent. The WACC is $9$ percent. What is enterprise value today?
::: solution
The terminal value at date $2$ is $28 \times 1.03 / (0.09 - 0.03) = 480.67$. Enterprise value is

$$
V_0 = \frac{25}{1.09} + \frac{28 + 480.67}{1.09^{2}} \approx 451.07.
$$

The terminal value, discounted, is $480.67 / 1.09^{2} \approx 404.6$, about $90$ percent of $V_0$. Shortening or lengthening the explicit forecast, without changing the long-run growth that starts the day the forecast ends, mostly *re-labels* value between “explicit” and “terminal”. It does not, by itself, add information.
:::
:::

## Comparables and what they assume

Valuing a share at a multiple of this year’s earnings, or of book equity, or of EBITDA, is common in applications. A multiple is not an alternative to present value. It is present value with a restriction on the inputs.

::: proposition A price–earnings ratio in the Gordon model {#prop-pe}
In the Gordon model, if earnings next year are $E_1$ and the payout ratio $D_1 / E_1 = \pi$ is constant, then

$$
\frac{P_0}{E_1} = \frac{\pi}{r - g}.
$$ {#eq-pe}

A trailing multiple $P_0 / E_0$ equals $\pi(1+g)/(r-g)$. Two firms with the same $r$, $g$ and $\pi$ have the same forward P/E. A difference in observed P/E is, inside the model, a difference in at least one of those three.
:::

::: proof
$P_0 = D_1/(r-g) = \pi E_1 /(r-g)$. Divide by $E_1$.
:::

[[#eq-pe]] is the reason a “peer” multiple is informative only when the peer is a peer in discount rate, growth and payout. Applying the median P/E of a sector to a firm with a different expected growth rate, or a different leverage (which feeds $r$), is using [[#eq-pe]] with the equality of $(r,g,\pi)$ unexamined. That may be a deliberate approximation. It is not a theorem that sector membership equalises those three.

::: example A multiple as a restricted DDM {#ex-multiple}
A fictional peer trades, in this illustration, at a forward P/E of $12$. Firm C is expected to earn $2.40$ units per share next year. What share value does the peer multiple assign to Firm C? Under [[#eq-pe]], with $\pi = 0.5$ and $r = 10$ percent, what growth rate is the multiple $12$ implying?
::: solution
The assigned value is $12 \times 2.40 = 28.80$ units per share. Inside [[#eq-pe]], $12 = 0.5 / (0.10 - g)$ implies $0.10 - g = 0.5/12 \approx 0.04167$, so $g \approx 5.83$ percent. If Firm C’s expected growth is not $5.83$ percent, or its payout is not $50$ percent, or its discount rate is not $10$ percent, the peer multiple is the right answer to a different firm’s problem. The arithmetic does not decide whether Firm C is that different firm. It makes the restriction visible.
:::
:::

::: intuition Replacement, not alchemy
A comparable-firm multiple is a way of importing a present-value ratio from one modelled stream to another. It saves writing down $D_t$ only by assuming that the ratio $P/E$ is shared. When the assumption is named, the method is a shortcut to [[#eq-gordon]]. When it is not named, the method is an unexplained number.
:::

::: quiz
In the Gordon model, $D_1 = 3$, $r = 12$ percent, $g = 4$ percent. The model price is
- [ ] $3 / 0.12 = 25$
- [x] $3 / (0.12 - 0.04) = 37.5$
- [ ] $3 / 0.04 = 75$
- [ ] undefined, because dividends grow forever
::: solution
[[#eq-gordon]] requires $r - g$ in the denominator: $3 / 0.08 = 37.5$. Discounting as a level perpetuity ignores growth. Dividing by $g$ is not a present-value operation. Infinite growth of undiscounted dividends is compatible with a finite price whenever $r > g$.
:::
:::

## Payout, retention and what growth is made of

A higher payout raises $D_1$ and, in isolation, raises $P_0$ in [[#eq-gordon]]. It also reduces retention, and under $g = bR$ it reduces $g$. The two effects compete. In the Modigliani–Miller world of [[corporate-finance/payout-policy]], they cancel and payout is irrelevant. Inside the Gordon formula with a *fixed* $g$, they do not cancel, because $g$ has been taken as exogenous. The right comparative static depends on whether $g$ is being held fixed (a change in payout with offsetting changes elsewhere) or is being moved by retention.

::: remark Earnings, dividends and cash
Dividends in [[#eq-ddm]] are cash. Earnings are an accounting residual. Using a P/E multiple, or discounting a path of earnings without subtracting reinvestment, double-counts growth: the earnings path already assumes that capital was added, and that capital had to be paid for. Free cash flow makes the subtraction explicit. A model that discounts earnings at $r$ as if they were cash is a different model, and it overstates value when growth is positive and investment is required to produce that growth.
:::

::: application A no-dividend firm
Helios Ltd currently pays no dividend. A dividend-discount modeller still writes [[#eq-ddm]], with $D_t = 0$ for $t \le T$ and a positive path thereafter, or equivalently uses a terminal price at $T$ equal to the then-prevailing Gordon value. A free-cash-flow modeller discounts FCFF from the start and never needs a dividend. The two agree if the cash that is not paid as dividends is either reinvested at the discount rate or held as surplus cash that appears in net debt. They disagree if the cash is assumed, silently, to vanish. The no-dividend feature is a timing of payout, not a hole in present-value logic — provided the cash is kept on the books of the model.
:::

## Evidence

Share prices are observable; expected dividends and discount rates are not. Empirical work therefore tests implications, not the identity $P = \mathrm{PV}(D)$. Campbell and Shiller (1988, *Journal of Finance*) write a log-linear present-value identity and find that variation in the dividend–price ratio has historically been associated more with variation in expected returns than with variation in expected dividend growth, in US data over the twentieth century. That is a statement about which *input* moved, not a rejection of discounting. Fama and French (1992, *Journal of Finance*; 1993, *Journal of Financial Economics*) document that average returns covary with book-to-market and size as well as with CAPM beta; one reading is that $r$ in [[#eq-gordon]] is not a single-beta number. Those readings belong to [[asset-pricing]]; this chapter only needs the reminder that a constant $r$ and a constant $g$ are modelling choices.

As of 2023, the dividend yield on broad US equity indices was in the neighbourhood of $1.5$ percent, well below the $4$ percent range of the 1970s (see, for example, the Shiller long-run series and the OECD’s dividend-yield tables). In a Gordon arithmetic, $r = D_1/P_0 + g$, a lower yield is a lower $r$, a higher $g$, or both. Which of those it is cannot be read off the yield alone. The numbers are history, not a forecast of $r$ or of $g$, and they are not a reason to prefer shares to bonds.

::: history
John Burr Williams’s *The Theory of Investment Value* (1938) stated the dividend-discount identity and worked numerical examples of discounted dividends. Myron Gordon and Eli Shapiro (1956) and Gordon (1959, 1962) specialised it to constant growth, producing [[#eq-gordon]]. Merton Miller and Franco Modigliani (1961, *Journal of Business*) showed that, under their assumptions, the split of earnings between dividends and retention does not change $P_0$ once investment policy is held fixed — the payout-irrelevance result of [[corporate-finance/payout-policy]], which is why a free-cash-flow writing and a dividend writing can be made to agree.
:::

## Where this leads

The discount rate $r$ was an input. [[corporate-finance/risk-and-return]] constructs it from a risk-free rate, a risk premium and a beta, and then builds a WACC for [[#eq-fcf]]. Capital structure in [[corporate-finance/capital-structure]] asks whether $V_0$ itself depends on how $E_0$ and $D_0$ are mixed. Payout policy in [[corporate-finance/payout-policy]] returns to the split between $D_t$ and retention. Comparables reappear as multiples in merger analysis in [[corporate-finance/governance]]. The equilibrium theory of why $r$ differs across shares is [[asset-pricing/capm]] and [[asset-pricing/factor-models]].

::: summary
- A share’s model price is the present value of expected dividends, or of free cash flow to the firm minus net debt, at a discount rate matched to the claim.
- The Gordon formula $P_0 = D_1/(r-g)$ is a growing perpetuity; it requires $r > g$ and a constant growth rate of dividends.
- Two-stage models hide a Gordon formula at the horizon. Terminal value is typically most of the present value, so the long-run pair $(r, g)$ dominates the result.
- Free cash flow to the firm is a pre-interest residual; discounting it at WACC gives enterprise value. Equity value subtracts net debt.
- A P/E multiple is the Gordon formula with a named payout. Using a peer multiple assumes equal discount rates, growth and payout unless those differences are adjusted for.
- All cash-flow paths and firms in this chapter are fictional. A model price is not a recommendation and not a forecast of a quoted price.
:::

## Exercises

::: exercise A Gordon price {level=1 check="37.5"}
A share is expected to pay a dividend of $3$ units in one year. Dividends then grow at $4$ percent a year forever. The discount rate is $12$ percent. What is the Gordon present value?
::: solution
$3 / (0.12 - 0.04) = 37.5$.
:::
:::

::: exercise From this year’s dividend {level=1 check="31.2"}
Firm A just paid $D_0 = 1.80$. Dividends are expected to grow at $4$ percent a year forever. The discount rate is $10$ percent. What is $P_0$?
::: solution
$D_1 = 1.80 \times 1.04 = 1.872$, so $P_0 = 1.872 / (0.10 - 0.04) = 31.2$.
:::
:::

::: exercise Implied discount rate {level=1 check="0.1"}
A Gordon share has $D_1 = 2$, $g = 4$ percent and $P_0 = 33.\overline{3}$. What is $r$? (Enter the decimal.)
::: solution
$r = D_1/P_0 + g = 2 / (100/3) + 0.04 = 0.06 + 0.04 = 0.10$.
:::
:::

::: exercise A two-stage price {level=2 check="41.82"}
Dividends of $D_1 = 2$ and $D_2 = 2.20$ are expected. From year two, growth is $5$ percent a year forever. The discount rate is $10$ percent. What is $P_0$, rounded to two decimal places?
::: solution
$P_2 = 2.20 \times 1.05 / (0.10 - 0.05) = 46.20$. Then $P_0 = 2/1.10 + (2.20 + 46.20)/1.10^{2} = 1.81818 + 40.00000 = 41.818$, which rounds to $41.82$.
:::
:::

::: exercise Enterprise and equity {level=2 check="546.67"}
Using the Northbridge numbers of [[#ex-fcf]] — $\mathrm{FCFF}_1 = 40$, $g = 3$ percent, $r_{\mathrm{WACC}} = 9$ percent, net debt $120$ — what is equity value, rounded to two decimal places?
::: solution
$V_0 = 40 / 0.06 = 666.\overline{6}$, so $E_0 = 666.\overline{6} - 120 = 546.\overline{6}$, which rounds to $546.67$.
:::
:::

::: exercise A forward P/E {level=2 check="12.5"}
In the Gordon model, payout $\pi = 0.5$, $r = 10$ percent, $g = 6$ percent. What is the forward P/E ratio $P_0/E_1$?
::: solution
[[#eq-pe]] gives $0.5 / (0.10 - 0.06) = 12.5$.
:::
:::

::: exercise Terminal-value share {level=3}
In [[#ex-two-year-fcf]], enterprise value was about $451$. What fraction of that value is the discounted terminal value? Recompute $V_0$ if long-run growth is $2$ percent rather than $3$ percent, holding $\mathrm{FCFF}_1$, $\mathrm{FCFF}_2$ and $r_{\mathrm{WACC}}$ fixed. Comment on the sensitivity.
::: hint
Terminal value at date $2$ is $\mathrm{FCFF}_2(1+g)/(r_{\mathrm{WACC}}-g)$.
:::
::: solution
Discounted terminal value is $480.67 / 1.09^{2} \approx 404.6$, which is $404.6/451.07 \approx 90$ percent of $V_0$. At $g = 2$ percent, terminal value is $28 \times 1.02 / (0.09-0.02) = 408$, and $V_0 = 25/1.09 + (28+408)/1.09^{2} \approx 389.9$. A one-percentage-point fall in long-run $g$ cuts enterprise value by about $61$ units, more than $13$ percent. The explicit two-year cash flows barely moved; the terminal piece did. That is the usual geometry of a two-stage model, not a finding about any particular firm.
:::
:::

::: exercise Retention and growth {level=3 check="37.5"}
A firm earns a constant return on book equity of $R = 12$ percent and retains a fraction $b = 1/3$ of earnings, so the sustainable growth rate is $g = bR = 4$ percent. Next year’s earnings are $E_1 = 4.5$ and the payout ratio is $\pi = 1 - b = 2/3$. The discount rate is $r = 12$ percent. What is $P_0$ from [[#eq-gordon]]?
::: hint
The dividend is $D_1 = \pi E_1$. In this illustration $r = R$.
:::
::: solution
$D_1 = (2/3) \times 4.5 = 3$. Then $P_0 = 3 / (0.12 - 0.04) = 37.5$. Because $r = R$, the present value is also $E_1 / r = 4.5 / 0.12 = 37.5$: when the firm earns on retained capital exactly the discount rate, retention neither creates nor destroys value, and $P_0$ equals capitalised earnings. That is a special case, not a general identity.
:::
:::

::: exercise Clean-surplus consistency {level=3}
A Gordon modeller writes $P_0 = D_1/(r-g)$ with $D_1 = 2$, $r = 10$ percent and $g = 4$ percent, so $P_0 = 33.\overline{3}$. A free-cash-flow modeller wants to match this price with a growing FCFF and zero net debt (so enterprise value equals equity value) and the same $r$ and $g$. What $\mathrm{FCFF}_1$ must they use? What goes wrong if they instead discount next year’s *earnings* of $4$ units as if earnings were free cash flow?
::: hint
With zero net debt and internally consistent forecasts, FCFF to a 100 percent equity firm equals FCFE, and FCFE equals dividends once surplus cash is not being piled up.
:::
::: solution
Zero net debt and no surplus-cash accumulation make $\mathrm{FCFF}_1 = D_1 = 2$, so $V_0 = 2/(0.10-0.04) = 33.\overline{3}$, matching the dividend-discount price. Discounting earnings of $4$ as if they were cash would give $4 / 0.06 \approx 66.67$, double-counting: the extra $2$ of earnings above dividends is being reinvested to produce the $4$ percent growth, and that $2$ is not cash available to owners today. Present value of cash is present value of cash; substituting an accounting residual for cash overstates value when investment is required for growth.
:::
:::
