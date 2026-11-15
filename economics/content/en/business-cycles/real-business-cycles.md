In 1982 Finn Kydland and Edward Prescott published "Time to Build and Aggregate Fluctuations" in *Econometrica*. They took a competitive growth model of the kind already used for the long run, added a random technology shock and a lag in turning investment into capital, calibrated a handful of parameters to long-run averages, and asked whether the resulting equilibrium fluctuations looked like the U.S. business cycle of [[business-cycles/business-cycle-facts]]. The paper's claim, later put sharply by Prescott (*Minneapolis Fed Quarterly Review*, 1986), was that once technology shocks and intertemporal substitution are taken seriously, a large share of postwar output volatility is what a well-functioning economy *should* display. That claim is still disputed. This chapter develops the real business cycle (RBC) model on its own terms — the environment, the equilibrium, the impulse responses, the calibration — and then reports what it matches and what it does not.

Prices are flexible, markets clear, and money is absent (or neutral). Fluctuations are **real**: they come from technology, preferences, government purchases or other shocks to the feasible set and to tastes, not from monetary non-neutrality. Inflation $\pi$ will barely appear. The output gap of the next chapters is not an object here; $\hat y_t$ is the log deviation of output from its *stochastic* trend or from the deterministic steady state, depending on the shock. Notation: $\beta$ is the household's discount factor, $\alpha$ the capital share, $\varphi$ the inverse Frisch elasticity of labour supply, $\delta$ depreciation, and $Z_t$ total factor productivity.

## The environment

Time is discrete, $t=0,1,2,\dots$. A representative household values consumption $C_t$ and dislikes hours $N_t$. A representative firm produces a single good with capital $K_t$ and labour, subject to a technology shock. There is no government in the baseline; adding $G_t$ is a one-line change to the resource constraint and is a useful alternative shock.

::: definition Baseline RBC economy {#def-rbc}
Preferences, technology and resource constraints are

$$
\E_0\sum_{t=0}^{\infty}\beta^t\Bigl(\ln C_t - \chi\frac{N_t^{1+\varphi}}{1+\varphi}\Bigr),
\qquad
Y_t = Z_t K_t^\alpha N_t^{1-\alpha},
\qquad
K_{t+1} = (1-\delta)K_t + I_t,
\qquad
C_t + I_t = Y_t,
$$ {#eq-rbc}

with $0<\beta<1$, $\chi>0$, $\varphi\ge 0$, $0<\alpha<1$, $0<\delta<1$. Productivity follows

$$
\ln Z_t = (1-\rho_z)\ln\bar Z + \rho_z\ln Z_{t-1} + \varepsilon_{z,t},
\qquad 0\le\rho_z<1,\quad \varepsilon_{z,t}\ \text{iid},\ \E\varepsilon=0.
$$ {#eq-z}

The household owns the capital, rents it at real rental $r^k_t$, and sells labour at real wage $w_t$. The firm hires period by period. All prices are in units of the consumption good.
:::

The period utility is additively separable. Log consumption is the balanced-growth choice: hours will have a steady state that does not trend when $Z_t$ and $K_t$ grow together (King, Plosser and Rebelo, *Journal of Monetary Economics*, 1988). The Frisch elasticity of hours with respect to the wage, holding the marginal utility of wealth fixed, is $1/\varphi$. Hansen (*Journal of Monetary Economics*, 1985) replaced the convex disutility of hours with a lottery over working a full week or not working, which makes *aggregate* hours move with an infinite Frisch elasticity even if each person is off a corner; that one change raises the volatility of hours toward the data.

Technology is Cobb–Douglas, so factor shares are constant, matching the long-run Kaldor fact. The capital law is one-period time-to-build; Kydland and Prescott's original paper had a multi-quarter gestation lag, which adds persistence. The resource constraint says the same good is consumed or invested — there are no relative-price movements between $C$ and $I$ in the baseline, a limitation Greenwood, Hercowitz and Huffman (*American Economic Review*, 1988) relaxed with investment-specific technology.

::: intuition Why a technology shock can be a cycle
A high $Z_t$ raises the marginal products of labour and capital today. Households want to work more while the wage is high (substitution) but also to consume more over their lifetime (wealth). They want to invest, because installed capital will inherit some of the extra productivity if the shock is persistent. Output, hours and investment therefore rise together. Whether hours *do* rise, and by how much, is the quantitative heart of the model: it is a race between substitution and wealth effects, refereed by $\varphi$ and by how persistent $Z_t$ is.
:::

## Competitive equilibrium and the planner

Because there are no externalities, no distorting taxes and no heterogeneous agents, the first welfare theorem applies: the competitive equilibrium solves a planner's problem. That is a computational convenience and an ideological lightning rod. It means that, *inside the model*, the cycle is efficient. It does not mean that the actual economy's cycle is efficient; it means the baseline has no wedge, by construction, for policy to close.

::: definition RBC competitive equilibrium {#def-eq}
A competitive equilibrium is a sequence of quantities $(C_t,N_t,I_t,K_{t+1},Y_t)$ and prices $(w_t,r^k_t)$ such that: the household maximises [[#eq-rbc]] subject to the period budget $C_t + I_t = w_t N_t + r^k_t K_t$ and the capital law, taking prices as given; the firm maximises $\Pi_t = Y_t - w_t N_t - r^k_t K_t$ each period; and markets clear, $C_t+I_t=Y_t$.
:::

Firm first-order conditions are static:

$$
w_t = (1-\alpha)Z_t K_t^\alpha N_t^{-\alpha} = (1-\alpha)\frac{Y_t}{N_t},
\qquad
r^k_t = \alpha Z_t K_t^{\alpha-1}N_t^{1-\alpha} = \alpha\frac{Y_t}{K_t}.
$$ {#eq-firm}

Household first-order conditions are the labour–leisure trade-off and the Euler equation for capital. With the utility in [[#eq-rbc]],

$$
\chi N_t^{\varphi} C_t = w_t,
\qquad
\frac{1}{C_t} = \beta\,\E_t\Bigl[\frac{1}{C_{t+1}}\bigl(1 + r^k_{t+1} - \delta\bigr)\Bigr].
$$ {#eq-hh}

The left-hand equation is the Frisch labour supply: hours rise with the wage and fall with consumption. The right-hand equation is the same consumption Euler equation that [[macroeconomics/consumption-and-saving]] derived for a real interest rate $r_t = r^k_{t+1}-\delta$. In a deterministic steady state with constant $Z=\bar Z$,

$$
1 = \beta(1+r^k-\delta) \implies r^k - \delta = \frac{1}{\beta}-1,
\qquad
\frac{K}{Y} = \frac{\alpha}{1/\beta-1+\delta},\qquad \frac{I}{Y}=\delta\frac{K}{Y}.
$$ {#eq-ss}

::: proposition Planner equivalence {#prop-planner}
The competitive quantities of [[#def-eq]] solve

$$
\max \E_0\sum_{t=0}^{\infty}\beta^t\Bigl(\ln C_t - \chi\frac{N_t^{1+\varphi}}{1+\varphi}\Bigr)
\quad\text{subject to}\quad
C_t + K_{t+1}-(1-\delta)K_t = Z_t K_t^\alpha N_t^{1-\alpha}.
$$

The associated co-state for capital is the household's marginal utility $1/C_t$.
:::
::: proof
Substitute the firm conditions [[#eq-firm]] into the household conditions [[#eq-hh]] and the resource constraint. The resulting three equations in $(C_t,N_t,K_{t+1})$ are exactly the planner's first-order conditions: the labour condition $\chi N_t^{\varphi} C_t = (1-\alpha)Y_t/N_t$ and the Euler equation with $r^k_{t+1}=\alpha Y_{t+1}/K_{t+1}$. Conversely, any planner allocation can be supported by the prices [[#eq-firm]]. Strict concavity of the planner's objective gives uniqueness of the interior path.
:::

::: example Steady-state ratios {#ex-ss}
Set $\beta=0.99$ at quarterly frequency, $\alpha=0.33$, $\delta=0.025$. Compute the steady-state real interest rate (quarterly and compounded annual), the capital–output ratio, and the investment share of output.
::: solution
The quarterly net real rate is $1/\beta-1 = 0.010101$, about $1.01$ percent a quarter. Compounding, $(1.010101)^4-1 = 4.10$ percent a year. Then

$$
\frac{K}{Y} = \frac{0.33}{0.010101+0.025} = 9.40
$$

quarters of output, or $9.40/4=2.35$ years of output — a little below the U.S. private capital–output ratio, which is why some calibrations lower $\delta$ or raise $\alpha$. The investment share is $\delta K/Y = 0.025\times 9.40 = 0.235$, close to the postwar U.S. investment share of GDP including durables. These are *long-run averages*, not cyclical moments; they pin $\beta,\alpha,\delta$ before one looks at a single recession.
:::
:::

::: warning $r$ is the real rate, not the rental
In this chapter $r^k$ is the rental on capital and $r = r^k-\delta$ is the net real interest rate. In microeconomics $r$ is often the rental itself. Mixing the two makes the Euler equation look off by $\delta$. The wage $w$ is real. There is no inflation, so there is no Fisher equation yet.
:::

## Log-linearisation and propagation

The model is not linear. The standard attack, used throughout this course, is to log-linearise around the deterministic steady state. Let $\hat x_t = \ln X_t - \ln\bar X$. The production function becomes

$$
\hat y_t = \hat z_t + \alpha\hat k_t + (1-\alpha)\hat n_t.
$$ {#eq-prod-hat}

The labour-market equilibrium, combining supply and demand and using $\hat c_t$ from the resource constraint, gives hours as a function of the state $(k_t,z_t)$. Capital accumulates as

$$
\bar K\,\hat k_{t+1} = (1-\delta)\bar K\,\hat k_t + \bar I\,\hat i_t.
$$

The Euler equation linearises to a consumption-smoothing condition involving $\E_t\hat c_{t+1}$ and the expected rental. The result is a linear rational-expectations system in the state $(\hat k_t,\hat z_t)$ and the jump variables $(\hat c_t,\hat n_t)$. Methods for solving such systems are in [[mathematical-economics]]; the economics is in the impulse responses.

::: proposition Technology, hours and the Solow residual {#prop-solow}
The **Solow residual** $\hat z_t^{\text{SR}} = \hat y_t - \alpha\hat k_t - (1-\alpha)\hat n_t$ equals the true technology shock $\hat z_t$ in this model. If measured hours omit utilisation or effort, or if there is unmeasured capital utilisation, the residual is contaminated: it becomes procyclical even if true $Z_t$ is not.
:::
::: proof
The first sentence is [[#eq-prod-hat]] rearranged. For the second, write true output $Y=Z\,(U_K K)^\alpha (U_N N)^{1-\alpha}$ with utilisation $U_K,U_N$. An econometrician who measures $K$ and $N$ but not $U$ attributes $U$ to $Z$. Any demand-driven increase in utilisation then looks like a technology shock.
:::

This is the leading empirical objection to reading the Solow residual as $Z_t$, put forcefully by Summers (*Minneapolis Fed Quarterly Review*, 1986) and later by Basu, Fernald and Kimball (*American Economic Review*, 2006), who clean the residual for utilisation and find that "purified" technology is less volatile and less correlated with hours. RBC proponents reply that a model with utilisation (Campbell, *NBER Macroeconomics Annual* 1994; Burnside and Eichenbaum, *American Economic Review* 1996) is still an RBC model: it is still real, still competitive, still driven by a shock to the feasible set. The disagreement is about *which* real shock and how to measure it, not about flexible prices versus sticky prices.

::: example A one-percent technology impulse, capital predetermined {#ex-tfp}
Suppose $\alpha=1/3$, capital cannot jump, and for one quarter hours are also unchanged. Output is $2$ percent above steady state, capital $0.5$ percent above, hours $1.5$ percent above. What Solow residual does [[#prop-solow]] report? What would hours have to be, given $\hat z=1$ percent and $\hat k=0$, to produce $\hat y=2$ percent?
::: solution
$\hat z^{\text{SR}} = 0.02 - (1/3)(0.005) - (2/3)(0.015) = 0.02 - 0.00167 - 0.010 = 0.00833$, so $0.83$ percent. If instead $\hat z=0.01$ and $\hat k=0$, then $0.02 = 0.01 + (2/3)\hat n$ implies $\hat n = 0.015$, a $1.5$ percent hours increase. The production function alone never identifies hours; it identifies the residual given hours, or hours given the residual.
:::
:::

Persistence of $\hat z_t$ is doing a lot of work. With $\rho_z=0.95$ quarterly, the half-life of a technology shock is $\ln 0.5/\ln 0.95\approx 13.5$ quarters, more than three years. Capital, which is a stock, adds more persistence: a high $Z$ that dies still leaves a high $K$. That is the **propagation** mechanism. Most of the persistence in calibrated RBC output, however, is inherited from $\rho_z$ rather than manufactured by capital: Cogley and Nason (*American Economic Review*, 1995) showed that measured U.S. GDP has a hump-shaped impulse response to various identified shocks, whereas a standard RBC model with AR(1) technology has a monotone decay. Subsequent RBC and New Keynesian models added habit formation, investment adjustment costs and labour-market search to build an internal hump.

::: widget odesolver
f: -0.05*(y-1)
y0: 1.08
t: 0, 80
exact: 1 + 0.08*exp(-0.05*t)
h: 2
caption: A continuous-time stand-in for capital after a one-off productivity windfall: $\dot k = -0.05(k-\bar k)$ with $\bar k=1$ and $k(0)=1.08$. Step through Euler and RK4. Capital (and therefore output, once $Z$ is back) returns to the steady state slowly; that slow return is RBC propagation. It is not a cycle in the Burns–Mitchell sense — there is no overshoot — unless something else, such as time-to-build, adds a second-order lag.
:::

::: widget plot
f: exp(-0.05*x)* (1+0.6*s); 0.4*exp(-0.05*x)* (1+0.6*s); 1.2*exp(-0.08*x)* (1+0.6*s)
sliders: s=0:0:1
x: 0, 40
y: 0, 1.6
labels: \text{output}; \text{hours}; \text{investment}
caption: Stylised impulse responses after a technology shock, scaled by the slider $s$ (zero is off, one is a large shock). Investment moves more than output, hours less — the calibration target of the next section. The decay rates are illustrative, not estimated.
:::

## Calibration and the moments

**Calibration**, as Kydland and Prescott practised it, is not estimation. One sets $(\beta,\alpha,\delta)$ to steady-state averages as in [[#ex-ss]], sets $\varphi$ (or Hansen's lottery) to a labour-supply elasticity taken from micro evidence or from the need to match hours volatility, sets $\chi$ so that steady-state $N$ is about $1/3$ of available time, and sets $(\rho_z,\sigma_\varepsilon)$ so that the Solow residual's AR(1) matches the residual in the data. One then *compares* the model's HP-filtered moments to the data's, without having used those moments to fit the parameters. Later work (Smets and Wouters, *American Economic Review* 2007, in a New Keynesian DSGE; and Bayesian RBC variants) estimates more freely. The original discipline — parameters from long-run or micro evidence, moments as a test — is still the right way to read a calibration table.

A well-known calibration, in the ballpark of Cooley and Prescott (in Cooley, ed., *Frontiers of Business Cycle Research*, 1995), looks like this at quarterly frequency: $\beta=0.99$, $\alpha=0.36$, $\delta=0.025$, $\varphi=1$ (Frisch elasticity $1$), $\rho_z=0.95$, and $\sigma_\varepsilon$ chosen to match $\sigma_y$. Approximate model outcomes, HP-filtered, versus U.S. postwar quarterly facts (the facts from [[business-cycles/business-cycle-facts]]; model numbers are the standard published range, not a new simulation):

| moment | U.S. data (order of magnitude) | baseline RBC |
|---|---|---|
| $\sigma_y$ (percent) | $1.5$–$2$ | matched by $\sigma_\varepsilon$ |
| $\sigma_c/\sigma_y$ | $\approx 0.8$ | $\approx 0.4$–$0.6$ (too smooth) |
| $\sigma_i/\sigma_y$ | $\approx 2.5$–$3.5$ | $\approx 3$ (a success) |
| $\sigma_n/\sigma_y$ | $\approx 0.8$–$1$ | too small unless Frisch is large or Hansen lotteries |
| $\operatorname{corr}(y,n)$ | high, $\approx 0.8$ | high |
| $\operatorname{corr}(y,z^{\text{SR}})$ | high | 1 by construction if $z^{\text{SR}}=z$ |
| $\operatorname{corr}(y,w)$ | mildly positive | mildly positive |

The successes are not trivial. A one-shock competitive model *can* produce investment that is several times more volatile than output, procyclical hours, and persistence, without a monetary non-neutrality. That was the 1982 surprise. The failures are equally part of the record. Consumption in the model is too smooth, because households with complete markets and time-separable utility smooth hard; matching $\sigma_c$ usually needs habit formation or incomplete markets. Hours are too smooth unless labour supply is far more elastic than most micro estimates (Pencavel's survey in the *Handbook of Labor Economics*, 1986, put the intensive-margin elasticity well below $1$; later micro work on the extensive margin is more permissive). And the Solow residual is both the shock and the measurement, which [[#prop-solow]] flags.

::: example Pinning $\chi$ {#ex-chi}
In steady state $N=0.33$, $C=0.7Y$, $\alpha=0.33$, $\varphi=1$. From $\chi N^{\varphi} C = (1-\alpha)Y/N$, compute $\chi$.
::: solution
With $\varphi=1$, $\chi N\, C = (1-\alpha)Y/N$, so $\chi N^2 (C/Y) = 1-\alpha$. Thus $\chi = 0.67/(0.33^2\times 0.7) = 8.79$. Changing the target $N$ changes $\chi$ one-for-one in the inverse square. This parameter never appears in a log-linear coefficient except as a shifter of the steady state; it is not a cyclical elasticity.
:::
:::

::: example Hansen hours {#ex-hansen}
In the baseline, hours satisfy $\chi N^{\varphi} C = w$. Hansen (1985) makes the *aggregate* Frisch elasticity infinite by a lottery: each household works a fixed week or not at all, and the fraction who work is $\bar N$. Why does that raise $\sigma_n/\sigma_y$ toward one, and what micro fact does it still miss?
::: solution
If the disutility of hours is linear in the *probability* of working, the aggregate labour-supply schedule is infinitely elastic at the wage that makes a household indifferent between working the week and not. A technology-driven rise in labour demand is then met almost entirely by hours (employment, in the lottery), not by wages. Relative volatility of hours therefore rises toward that of output. What it misses is the intensive margin: most of the cyclical variation in U.S. hours is in employment, which is the lottery's friend, but some is in hours per worker, which the lottery shuts off. It also says nothing about *who* is on the extensive margin — a later search-and-matching literature's job.
:::
:::

::: quiz
In the baseline RBC model, a persistent rise in $Z_t$ causes investment to rise by more than consumption because
- [ ] the household is myopic and spends extra income on goods
- [x] the return on capital is temporarily high, so it is a good time to accumulate $K$
- [ ] the real interest rate is fixed by a Taylor rule
- [ ] prices are sticky, so demand determines output
::: solution
The rental $r^k=\alpha Y/K$ jumps with $Y$ while $K$ is predetermined, so the Euler equation wants more investment (less consumption today relative to tomorrow, at the margin). There is no Taylor rule and no sticky prices in the baseline. Households are rational and forward-looking, not myopic.
:::
:::

## What the model cannot do — and what it can

Presenting RBC only as a failed theory of money, or only as a triumph of calibration, both miss the research programme.

**On its own terms, the programme succeeded in changing the language.** Business-cycle models are now dynamic, stochastic and general-equilibrium; they are disciplined by long-run averages and by impulse responses; they are computed. New Keynesian models of [[business-cycles/new-keynesian-model]] *are* RBC models plus sticky prices and a policy rule. Anyone who writes a three-equation NK model is using King–Plosser–Rebelo preferences, an Euler equation and a resource constraint that were standardised in this literature.

**On the facts, several genuine failures remain.** (i) Gali (*American Economic Review*, 1999), using a structural VAR with long-run identification, found that hours *fall* after an identified technology shock — the opposite of the RBC impulse response. Christiano, Eichenbaum and Vigfusson (NBER 2003) showed that the sign depends on whether hours enter the VAR in levels or differences. The dispute is unresolved in the sense that reasonable identification assumptions disagree; it is not unresolved in the sense that one may ignore it. (ii) The 2008–09 recession and 2020 have no plausible interpretation as a $4$–$10$ percent drop in the feasible production set of the U.S. economy. A purely technological reading of 2008 requires a collapse of $Z$ that utilisation-adjusted series do not show (Fernald, *FRBSF*, 2014). RBC models with financial frictions (see [[business-cycles/financial-frictions]]) can address 2008 without abandoning flexible prices, but they are no longer "technology shocks only". (iii) Monetary non-neutrality is a fact at business-cycle frequencies on a large body of evidence — Romer and Romer (*American Economic Review*, 2004) narrative shocks, Christiano, Eichenbaum and Evans (*Journal of Political Economy*, 2005) VARs, the disinflations of the early 1980s — which a flexible-price model can match only by making money a veil over a real shock that happens to coincide with policy. That coincidence is not a theorem; it is a restriction.

**Extensions that stay within the real, competitive frame** include: government-spending shocks (Barro and King, *Quarterly Journal of Economics* 1984; Baxter and King, *American Economic Review* 1993 — hours rise, consumption typically falls, the opposite of Keynesian co-movement); investment-specific technology (Greenwood, Hercowitz, Krusell, *American Economic Review* 1997); home production (Benhabib, Rogerson, Wright, *Journal of Political Economy* 1991); and news shocks (Beaudry and Portier, *American Economic Review* 2006) in which a future $Z$ is revealed early and investment booms before TFP does. Each matches some additional moment; none restores monetary non-neutrality.

::: application Why 1982 still matters for 2008
When Lehman failed in September 2008, the first-pass RBC question was still the right one: was this a shock to the feasible set, to intertemporal prices, or to the tightness of a constraint that the baseline assumes is slack? Chari, Kehoe and McGrattan (*Econometrica*, 2007) showed how to summarise models by **wedges** in the labour, investment and resource constraints. A 2008-sized labour wedge is the reduced-form fact; RBC with sticky wages, New Keynesian pricing, and financial accelerators are competing structural stories for that wedge. Starting from [[#def-rbc]] is how one keeps those stories comparable.
:::

## Where this leads

The next chapter puts a cost on changing a nominal price and asks what that does to the labour-market and Euler equations we have just derived. If the cost is zero, we are back here. If it is not, money and the interest-rate rule of [[business-cycles/monetary-policy-rules]] start to matter for $\tilde y$ and $\pi$, and the efficient-cycle theorem of [[#prop-planner]] fails. Financial frictions in [[business-cycles/financial-frictions]] can be added to either frame. The measurement chapter's warning still applies: every moment in a calibration table is a filtered moment, and the Solow residual is only technology under the assumptions of [[#prop-solow]].

::: history
**1982, Finn E. Kydland and Edward C. Prescott.** "Time to Build and Aggregate Fluctuations" (*Econometrica*) calibrated a competitive equilibrium with technology shocks to U.S. quarterly moments. **1985, Gary D. Hansen.** Indivisible labour made aggregate hours volatile without a large micro Frisch elasticity. **1986, Edward C. Prescott and Lawrence H. Summers.** Prescott's "Theory Ahead of Business Cycle Measurement" and Summers's comment in the same Minneapolis Fed *Quarterly Review* set out, respectively, the claim that technology shocks account for most of the cycle and the leading objections (measurement of $Z$, labour-supply elasticity, money).
:::

::: summary
- The RBC model is a competitive growth model with a persistent technology shock. Equilibrium quantities solve a planner's problem; the cycle is efficient inside the model.
- Steady-state averages pin $\beta$, $\alpha$ and $\delta$. Cyclical elasticities, especially the Frisch $1/\varphi$, pin hours volatility. The Solow residual pins the shock only if utilisation and effort are measured.
- The model matches investment volatility and procyclical hours at a stretch; it underpredicts consumption volatility and needs a large labour-supply elasticity. Identification of technology shocks from VARs does not uniformly support the RBC hours response.
- New Keynesian and financial-friction models reuse this backbone. Disagreeing with "RBC" is usually disagreeing with flexible prices or with a one-shock interpretation of $Z_t$, not with dynamic general equilibrium.
:::

## Exercises

::: exercise Quarterly discounting {level=1 check="0.99"}
If the annual real interest rate in steady state is about $4.1$ percent and $\delta$ is not in the Euler equation's net rate, what quarterly $\beta$ satisfies $1/\beta^4-1=0.04102$ to two decimals? (Enter $\beta$, e.g. 0.99.)
::: solution
$\beta^4 = 1/1.04102$, so $\beta = (1/1.04102)^{1/4} \approx 0.99$. This is the $\beta$ of [[#ex-ss]].
:::
:::

::: exercise Labour share {level=1}
In [[#eq-firm]] with Cobb–Douglas, what is labour's share of output, and why does it not cycle with $Z_t$?
::: solution
$wN/Y = 1-\alpha$, a constant. The shock $Z_t$ scales $Y$, $w$ and (in equilibrium) $N$ so as to keep the share fixed. A cyclical labour share in the data is then a reason to move away from Cobb–Douglas or from frictionless factor markets, not a reason to drop technology shocks.
:::
:::

::: exercise Resource constraint in logs {level=1}
In steady state $C/Y=0.7$ and $I/Y=0.3$. Log-linearise $C+I=Y$ around that steady state and write $\hat y$ in terms of $\hat c$ and $\hat i$.
::: solution
$C\hat c + I\hat i = Y\hat y$, so $0.7\hat c + 0.3\hat i = \hat y$. Output is a share-weighted average of the two expenditure components.
:::
:::

::: exercise Frisch and hours {level=2}
Explain why raising $1/\varphi$ raises the volatility of hours after a technology shock, holding the wealth effect fixed in words.
::: solution
The labour-supply schedule $\chi N^{\varphi} C = w$ is flatter in $(N,w)$ space when $\varphi$ is smaller. A given shift of labour demand (from higher $Z$) then produces a larger movement in $N$ and a smaller movement in $w$. The wealth effect, which shifts labour supply left as $C$ rises, is still there; a flatter supply simply lets the demand shift dominate more of the hours outcome.
:::
:::

::: exercise Solow residual arithmetic {level=2 check="1.4"}
If $\alpha=0.4$, $\hat y=3$ percent, $\hat k=1$ percent, $\hat n=2$ percent, what is $\hat z^{\text{SR}}$ in percent? (Enter the number without a percent sign.)
::: solution
$\hat z^{\text{SR}} = \hat y - \alpha\hat k - (1-\alpha)\hat n = 3 - 0.4\times 1 - 0.6\times 2 = 3 - 0.4 - 1.2 = 1.4$.
:::
:::

::: exercise Capital–output ratio {level=2 check="8.25"}
Using [[#eq-ss]] with the approximation $1/\beta-1=0.01$, $\alpha=0.33$ and $\delta=0.030$ (quarterly), compute $K/Y$ to two decimals. (Enter the ratio.)
::: solution
$K/Y = \alpha/(1/\beta-1+\delta) = 0.33/(0.01+0.030) = 0.33/0.04 = 8.25$.
:::
:::

::: exercise Gali versus RBC hours {level=3}
Gali (1999) found that hours fall after an identified technology shock. Explain, in the language of [[#def-rbc]] and [[#prop-solow]], one identification assumption that could produce that finding even if the RBC model were true, and one modification of the model that could produce it even if the VAR were correctly identified.
::: hint
Think about hours in levels versus differences, utilisation in the residual, and sticky prices that make a technology improvement contractionary for labour in the short run.
:::
::: solution
If the VAR uses *differenced* hours, a trend in hours (demographics, tax rates) can be mistaken for a unit root; long-run identification then dumps low-frequency labour-supply changes into the "technology" shock, and hours can appear to fall. Christiano, Eichenbaum and Vigfusson (2003) showed that levels versus differences flips the sign. If instead the VAR is right, the RBC labour-demand shift can still fail: with sticky prices, a rise in $Z$ that is not matched by a rise in demand leads firms to produce more with *fewer* hours (the New Keynesian technology-hours co-movement of [[business-cycles/new-keynesian-model]]). Utilisation cleaning (Basu, Fernald, Kimball 2006) also weakens the residual–hours correlation. Either the identification or the flexible-price labour-demand story can be the piece that fails; the moment by itself does not say which.
:::
:::

::: exercise A government-spending shock {level=3}
Add $G_t$ to the resource constraint of [[#def-rbc]], with $C_t+I_t+G_t=Y_t$, and suppose $G$ rises permanently, financed by lump-sum taxes, with $Z$ unchanged. Using only the wealth effect in [[#eq-hh]] and the production function, argue why hours and output rise while consumption typically falls. Contrast that co-movement with a Keynesian consumption multiplier.
::: hint
A lump-sum tax that finances $G$ makes households poorer. Labour supply shifts right. There is no sticky-price demand channel in this model.
:::
::: solution
Households are poorer by the present value of extra $G$. With leisure a normal good, labour supply shifts right: $N$ rises at a given wage. Capital is predetermined, $Z$ is unchanged, so $Y=ZK^\alpha N^{1-\alpha}$ rises. On the resource constraint the extra $G$ and extra $I$ (if any) crowd out $C$; Baxter and King (1993) show consumption falling unless the extra output is large enough, which it is not at standard Frisch elasticities. A Keynesian multiplier, by contrast, has $C$ *rising* with $G$ through current income. The RBC government-spending shock therefore matches the rise in hours and fails the Keynesian consumption co-movement — a fact used both as a criticism of RBC and as a test of New Keynesian models with rule-of-thumb consumers.
:::
:::
