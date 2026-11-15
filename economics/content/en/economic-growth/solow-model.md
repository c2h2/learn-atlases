Can a country get rich by saving more? In a closed economy, saving is investment, investment builds the capital stock, and more capital produces more output. That chain is correct as far as it goes. It does not go forever. If the extra output from an extra machine shrinks as machines pile up, then a higher saving rate raises the *level* of output per person and not, in the long run, its growth rate. That is the content of the Solow–Swan model, and it is the reason the next chapter has to put technology in by hand.

The model is due to Robert Solow (1956, *Quarterly Journal of Economics*) and Trevor Swan (1956, *Economic Record*). It is still the default framework in which to discuss capital accumulation, the golden rule, and transitional growth. The mathematics is a single first-order differential equation, of the kind treated in [[mathematical-economics/difference-and-differential-equations]] and, in more depth, in the [Maths Atlas chapter on first-order ODEs](/a/maths/lesson.php?c=ode&l=first-order).

## The environment

Time is continuous. A single good is produced, consumed and invested. There is no government and no foreign trade: $Y = C + I$. Capital depreciates at a constant rate $\delta > 0$. Population (and, for now, the labour force) grows at a constant rate $n \ge 0$,

$$
\dot L(t) = n L(t), \qquad L(t) = L_0 e^{nt}.
$$

A constant fraction $s \in (0,1)$ of output is saved and invested, so $I = sY$ and $C = (1-s)Y$. The saving rate is exogenous. That is the model's defining shortcut, relaxed in [[economic-growth/ramsey-model]] and [[economic-growth/overlapping-generations]].

::: definition The Solow–Swan model {#def-solow}
The **Solow–Swan model** without technical change is the environment above together with a production function $Y = F(K,L)$ that is twice continuously differentiable, strictly increasing and strictly concave in each argument, homogeneous of degree one (constant returns to scale), and satisfies the Inada conditions $F_K \to \infty$ as $K \to 0$, $F_K \to 0$ as $K \to \infty$, and the analogues for $L$. Capital accumulates as

$$
\dot K = s F(K,L) - \delta K.
$$ {#eq-Kdot}
:::

Constant returns let us work in **intensive form**. Define $k \equiv K/L$ (capital per worker) and $y \equiv Y/L = F(k,1) \equiv f(k)$ (output per worker). The intensive production function $f$ inherits $f(0)=0$, $f'>0$, $f''<0$, and the Inada conditions $f'(0)=\infty$, $f'(\infty)=0$. Cobb–Douglas $F(K,L) = K^\alpha L^{1-\alpha}$, $\alpha \in (0,1)$, gives $f(k) = k^\alpha$ and is the leading example.

::: proposition The intensive-form law of motion {#prop-intensive}
In the Solow–Swan model of [[#def-solow]], capital per worker obeys

$$
\dot k = s f(k) - (n+\delta) k.
$$ {#eq-kdot}
:::

::: proof
Differentiate $k = K/L$: $\dot k = \dot K/L - n k$. Substitute [[#eq-Kdot]] and $F(K,L) = L f(k)$:

$$
\dot k = \frac{s F(K,L) - \delta K}{L} - n k = s f(k) - \delta k - n k.
$$
:::

The term $s f(k)$ is gross investment per worker. The term $(n+\delta)k$ is **break-even investment**: the investment per worker required to keep $k$ constant, covering depreciation and equipping new workers with the same capital as existing ones.

::: widget plot
f: s*x^(1/3); (n+d)*x
sliders: s=0.2:0.05:0.5:0.01; n=0.01:0:0.04:0.005; d=0.05:0.02:0.1:0.01
x: 0, 20
y: 0, 2.5
labels: \text{sf(k)}; \text{(n+δ)k}
caption: The Solow diagram for $f(k)=k^{1/3}$. The curve is investment per worker $sf(k)$; the ray is break-even investment $(n+\delta)k$. Their intersection is the steady state. Raise $s$ with the slider: the curve lifts and $k^*$ rises. Raise $n$ or $\delta$: the ray steepens and $k^*$ falls. The Inada conditions make the curve start vertical and flatten, so exactly one interior intersection exists for any $s,n,\delta>0$.
:::

## The steady state

A **steady state** is a $k^*$ at which $\dot k = 0$. From [[#eq-kdot]],

$$
s f(k^*) = (n+\delta) k^*.
$$ {#eq-ss}

Under the Inada conditions there is a unique $k^* > 0$, and it is globally stable: $\dot k > 0$ for $k < k^*$ and $\dot k < 0$ for $k > k^*$. Output, consumption and capital per worker converge to constants $y^* = f(k^*)$, $c^* = (1-s)f(k^*)$. Aggregate variables $Y$, $K$ and $C$ then grow at rate $n$: the economy grows, but only because population grows. Output *per worker* does not grow in the long run.

::: definition Steady-state capital in the Solow model {#def-kstar}
The **steady-state capital stock per worker** $k^*$ is the unique positive root of $s f(k) = (n+\delta)k$. For Cobb–Douglas $f(k)=k^\alpha$,

$$
k^* = \Bigl(\frac{s}{n+\delta}\Bigr)^{1/(1-\alpha)}, \qquad y^* = \Bigl(\frac{s}{n+\delta}\Bigr)^{\alpha/(1-\alpha)}.
$$ {#eq-cd-ss}
:::

The elasticity of $y^*$ with respect to $s$ is $\alpha/(1-\alpha)$. With $\alpha = 1/3$, that elasticity is $1/2$: a 10 per cent increase in the saving rate (say from 0.20 to 0.22) raises steady-state output per worker by about 5 per cent. That is a levels effect, and it is modest. It is the quantitative reason Solow (1956) concluded that capital accumulation could not be the engine of long-run growth in living standards.

::: example A Cobb–Douglas steady state {#ex-ss-numbers}
Let $f(k) = k^{1/3}$, $s = 0.2$, $n = 0.01$, $\delta = 0.05$. Compute $k^*$, $y^*$, $c^*$, the marginal product of capital, and the net real rental $f'(k^*)-\delta$.
::: solution
$n+\delta = 0.06$, so

$$
k^* = \bigl(0.2/0.06\bigr)^{3/2} = (10/3)^{3/2} = 6.086, \qquad y^* = (k^*)^{1/3} = 1.826, \qquad c^* = 0.8\times 1.826 = 1.461.
$$

$f'(k) = (1/3) k^{-2/3}$, so $f'(k^*) = (1/3)(6.086)^{-2/3} = 0.100$ and $f'(k^*)-\delta = 0.05$. In the Cobb–Douglas case the net rental at the steady state is $(n+\delta)\alpha/(1-\alpha) - \delta$; here $\alpha=1/3$ gives $0.06\times\tfrac12 - 0.05 = 0.05$, which matches. These numbers are illustrative; they are not a calibration of any particular country.
:::
:::

::: warning The saving rate does not set long-run growth of $y$
A common slide in the Solow diagram is to raise $s$, watch $k^*$ jump, and say "the economy grows faster". During the *transition*, $\dot k > 0$ and $y$ does grow faster than before. In the new steady state, $\dot k = 0$ again and $y$ is constant. The growth *rate* of output per worker returns to zero (or, with technical change in the next chapter, to the exogenous rate $g$). Cross-country differences in $s$ explain differences in *levels* of $y$, not differences in long-run growth rates. That is a prediction, and [[economic-growth/convergence]] takes it to the data.
:::

## Comparative statics

Differentiate [[#eq-ss]] implicitly. For Cobb–Douglas the elasticities are immediate from [[#eq-cd-ss]]:

| Parameter | Effect on $k^*$ | Effect on $y^*$ |
|---|---|---|
| $s$ up | up | up |
| $n$ up | down | down |
| $\delta$ up | down | down |
| $\alpha$ up (given $s>n+\delta$) | up | up |

A baby boom (higher $n$) dilutes the capital stock: more investment is needed just to equip new workers, so $k^*$ falls. Faster depreciation does the same. Neither change alters the long-run growth rate of $y$, which remains zero.

Consumption per worker $c^* = (1-s)f(k^*(s))$ is not monotone in $s$. Too little saving leaves the economy starved of capital; too much saving leaves no room for consumption. That is the golden-rule problem below.

::: example Two islands, Solow version {#ex-two-islands-solow}
Two closed islands share $f(k)=k^{1/3}$, $n=0.01$, $\delta=0.05$. Island A saves $s=0.1$; island B saves $s=0.3$. Compute steady-state output and consumption per worker on each island. By what factor is B richer in output? In consumption?
::: solution
From [[#eq-cd-ss]],

$$
\begin{aligned}
k_A^* &= (0.1/0.06)^{3/2} = 2.152, & y_A^* &= 1.291, & c_A^* &= 1.162,\\
k_B^* &= (0.3/0.06)^{3/2} = 11.180, & y_B^* &= 2.236, & c_B^* &= 1.565.
\end{aligned}
$$

Island B produces $2.236/1.291 = 1.73$ times as much per worker — a factor of three in the saving rate buys a factor of $3^{\alpha/(1-\alpha)} = 3^{1/2} \approx 1.73$ in output, as the elasticity $\alpha/(1-\alpha)=1/2$ promised. The consumption ratio is only $1.565/1.162 = 1.35$, because B also consumes a smaller *share* of a larger pie. Saving more makes an island richer. It does not make it richer in proportion to $s$, and it does not make it grow forever.
:::
:::

## Transitional dynamics

The differential equation [[#eq-kdot]] is separable. For Cobb–Douglas it has a closed form. Let $z \equiv k^{1-\alpha}$. Then

$$
\dot z = (1-\alpha)\bigl(s - (n+\delta) z\bigr),
$$

a linear equation, with solution

$$
k(t)^{1-\alpha} = (k^*)^{1-\alpha} + \bigl(k(0)^{1-\alpha} - (k^*)^{1-\alpha}\bigr) e^{-(1-\alpha)(n+\delta)t}.
$$ {#eq-closed}

The gap in the transformed variable $z$ closes at rate $(1-\alpha)(n+\delta)$. Near $k^*$, the same rate governs $k$ itself: linearising [[#eq-kdot]] gives

$$
\dot{\hat k} \approx -(1-\alpha)(n+\delta)\, \hat k, \qquad \hat k \equiv \frac{k-k^*}{k^*}.
$$

The **half-life** of a gap is $\ln 2 / \bigl((1-\alpha)(n+\delta)\bigr)$. With $\alpha=1/3$, $n+\delta=0.06$, that is $0.693/0.04 = 17.3$ years: about half the distance to the steady state is closed in 17 years, three-quarters in 35 years. That is fast relative to the centuries of the last chapter, and it is a problem for the model as a theory of persistent growth-rate differences — a problem that human capital (Mankiw, Romer and Weil 1992) and a broader notion of capital partly relieve, as [[economic-growth/convergence]] discusses.

::: widget odesolver
f: 0.2*y^(1/3) - 0.06*y
y0: 1
t: 0, 80
exact: (10/3 - (7/3)*exp(-0.04*t))^(3/2)
h: 2
methods: rk4
caption: Capital per worker in the example of [[#ex-ss-numbers]], starting from $k(0)=1$ against $k^*=6.086$. The exact solution is [[#eq-closed]]. RK4 with step $2$ already hugs the curve; the half-life of $17$ years is visible as the steep early rise flattening toward $6$. Click through Euler if you want to see a coarser method undershoot on a concave $f$.
:::

::: example A transition in numbers {#ex-transition}
In the economy of [[#ex-ss-numbers]], $k(0)=1$. Using [[#eq-closed]], compute $k(10)$, $k(20)$ and $k(40)$, and the fraction of the gap $k^*-k(0)$ that remains at $t=40$.
::: solution
$(k^*)^{2/3} = 0.2/0.06 = 10/3$, and $k(0)^{2/3}=1$, so

$$
k(t) = \Bigl(\tfrac{10}{3} - \tfrac{7}{3}\, e^{-0.04 t}\Bigr)^{3/2}.
$$

Thus $k(10)=2.35$, $k(20)=3.45$, $k(40)=4.84$. The remaining gap at $t=40$ is $(6.086-4.84)/(6.086-1) = 0.245$, or 24.5 per cent; equivalently, the linear approximation gives $e^{-0.04\times 40} = 0.202$ of the *proportional* gap remaining. Starting at one-sixth of steady-state capital, the economy is four-fifths of the way there in forty years. Transitional growth is front-loaded.
:::
:::

::: quiz
An economy is below its Solow steady state. Which statement is correct?
- [ ] The growth rate of $k$ is constant until $k^*$ is reached.
- [x] $k$ grows, but at a declining rate, and $\dot k \to 0$ as $k \to k^*$.
- [ ] $k$ jumps immediately to $k^*$, because that is the equilibrium.
- [ ] $k$ falls, because diminishing returns make extra capital worthless.
::: solution
[[#eq-kdot]] is positive below $k^*$ and falls to zero as $k$ approaches $k^*$ (the vertical gap between $sf(k)$ and $(n+\delta)k$ shrinks). There is no jump: $k$ is a state variable. Diminishing returns make extra capital *less* productive, not worthless; they are why the growth of $k$ slows rather than exploding.
:::
:::

## The golden rule

Steady-state consumption $c^*(s) = (1-s)f(k^*(s))$ has an interior maximum. The saving rate that attains it is the **golden-rule** saving rate: the $s$ that maximises consumption per worker among steady states. It is a comparison across steady states, not a statement about the transition, and it is a planner's criterion, not a description of what households choose.

::: proposition The golden rule {#prop-golden}
Among Solow steady states, consumption per worker is maximised at the $k_{\mathrm{gold}}$ satisfying

$$
f'(k_{\mathrm{gold}}) = n + \delta.
$$ {#eq-golden}

For Cobb–Douglas, $s_{\mathrm{gold}} = \alpha$. If $s > s_{\mathrm{gold}}$ the economy is **dynamically inefficient**: a permanently lower saving rate would raise consumption at every date along the new path, relative to staying at $k^*$.
:::

::: proof
At a steady state, $c = f(k) - (n+\delta)k$, because $sf(k)=(n+\delta)k$ and $c=(1-s)f(k)$. Differentiate: $dc/dk = f'(k) - (n+\delta)$. The unique critical point is [[#eq-golden]], and $f''<0$ makes it a maximum. For Cobb–Douglas, $f'(k)=\alpha f(k)/k$, so $\alpha y_{\mathrm{gold}}/k_{\mathrm{gold}} = n+\delta$. But $s_{\mathrm{gold}} y_{\mathrm{gold}} = (n+\delta)k_{\mathrm{gold}}$, hence $s_{\mathrm{gold}}=\alpha$.

If $s>s_{\mathrm{gold}}$, then $k^*>k_{\mathrm{gold}}$ and $f'(k^*)<n+\delta$. A small, permanent cut in $s$ lowers $k^*$ toward $k_{\mathrm{gold}}$ and raises $c^*$. During the transition $k$ is falling, so $c = f(k)-\dot k-(n+\delta)k$ receives the extra gift of running down capital. Consumption is higher at every date. That is Phelps's (1961, *American Economic Review*) golden-rule argument, and it is the seed of dynamic inefficiency in [[economic-growth/overlapping-generations]].
:::

The golden rule equates the marginal product of capital to the cost of maintaining it. If $f'(k)>n+\delta$, an extra unit of capital produces more extra output, forever, than it costs to maintain; the economy should save more. If $f'(k)<n+\delta$, extra capital is a net drain.

::: example Golden rule in the running example {#ex-golden}
For $f(k)=k^{1/3}$, $n=0.01$, $\delta=0.05$, compute $s_{\mathrm{gold}}$, $k_{\mathrm{gold}}$, $c_{\mathrm{gold}}$. Compare $c^*$ at $s=0.2$ and at $s=0.5$ with $c_{\mathrm{gold}}$.
::: solution
$s_{\mathrm{gold}}=\alpha=1/3$. Then $k_{\mathrm{gold}}=( (1/3)/0.06 )^{3/2} = 13.095$, $y_{\mathrm{gold}}=2.357$, $c_{\mathrm{gold}}=(2/3)\times 2.357 = 1.571$. At $s=0.2< s_{\mathrm{gold}}$, $c^*=1.461$ as in [[#ex-ss-numbers]]. At $s=0.5>s_{\mathrm{gold}}$, $k^*=(0.5/0.06)^{3/2}=19.09$, $y^*=2.674$, $c^*=1.337$, *below* both $c_{\mathrm{gold}}$ and the $s=0.2$ value. Oversaving is possible. Whether any real economy is above the golden rule is a different, empirical question; Abel, Mankiw, Summers and Zeckhauser (1989, *Review of Economic Studies*) proposed a test using the sign of net returns minus growth, and did not find oversaving in the G7 of their sample.
:::
:::

## Discrete time

The discrete-time cousin is

$$
K_{t+1} = s F(K_t, L_t) + (1-\delta)K_t, \qquad L_{t+1}=(1+n)L_t,
$$

or, in intensive form,

$$
k_{t+1} = \frac{s f(k_t) + (1-\delta)k_t}{1+n}.
$$ {#eq-discrete}

The steady state is the same $s f(k^*)=(n+\delta)k^*$ as in continuous time (up to a $n\delta k$ term that vanishes at annual frequencies). The map $k \mapsto k_{t+1}$ is increasing and concave for Cobb–Douglas, with a unique positive fixed point that attracts every $k_0>0$.

A sequence widget evaluates a formula in the index $n$, not a recurrence, so the path is the closed form [[#eq-closed]] sampled at integers. Direct iteration of [[#eq-discrete]] from $k_0=1$ with $s=0.2$, $n=0.01$, $\delta=0.05$, $\alpha=1/3$ gives $k_{10}=2.35$, $k_{20}=3.45$, $k_{50}=5.25$, approaching $k^*=6.09$ — the same transition as the ODE, sampled once a year.

::: widget sequence
a: ( 10/3 + (1 - 10/3)*exp(-0.04*(n-1)) )^(3/2)
N: 80
mode: terms
limit: 6.086
start: 1
y: 0, 8
caption: The closed-form path of $k_t$ in the running example, plotted as a sequence. The dashed line is the continuous-time $k^*=6.086$. Early terms rise fast; later terms crawl. That declining growth rate of $k$ is diminishing returns, not a change in $s$.
:::

## What the model explains, and what it does not

The Solow model with a fixed $s$ and no technical change explains:

- why capital accumulation alone cannot generate perpetual growth of $y$ under diminishing returns;
- why countries with higher $s$ and lower $n$ should be *richer* in the long run, with an elasticity $\alpha/(1-\alpha)$ that is small if capital's share is one-third;
- why a country that starts below $k^*$ grows faster than one that starts at $k^*$, a first version of **convergence**;
- Kaldor facts (3)–(5) in the Cobb–Douglas case: a constant $K/Y = k^*/y^*$, a constant capital share $\alpha$, and a constant net return $f'(k^*)-\delta$ once the steady state is reached.

It does not explain:

- perpetual growth of $y$ at the frontier (the next chapter's $g$);
- the *size* of observed income gaps, if $\alpha=1/3$ and observed differences in $s$ and $n$ are the only differences (Mankiw, Romer and Weil 1992 made this precise);
- why $s$ itself differs (Ramsey, Diamond);
- why technology differs (endogenous growth, institutions).

Those are not failures of a model that never claimed to be a theory of $s$ or of $A$. They are the list of chapters that follow.

## Where this leads

[[economic-growth/technology-and-growth-accounting]] adds labour-augmenting technology $A(t)$ growing at rate $g$. The intensive-form state variable becomes capital per *effective* worker, $\tilde k = K/(AL)$, and the algebra of this chapter survives with $n$ replaced by $n+g$. Balanced growth of $Y/L$ at rate $g$ appears, and growth accounting follows.

[[economic-growth/convergence]] takes the transitional dynamics to the cross-section. [[economic-growth/ramsey-model]] replaces the constant $s$ with a household Euler equation; the golden rule becomes a modified golden rule, and dynamic inefficiency of the Solow kind is ruled out by construction. [[economic-growth/overlapping-generations]] brings it back.

For education only — not investment or financial advice. A higher $s$ in this model is a thought experiment about a closed economy's accounting identity, not a recommendation about any person's saving.

::: history
**1956, Solow and Swan.** Solow's *QJE* paper and Swan's *Economic Record* paper of the same year are independent. Solow's exposition, organised around the intensive-form diagram that this chapter uses, became the textbook path; Swan already emphasised the knife-edge character of Harrod–Domar and the way diminishing returns remove it. Edmund Phelps (1961, *AER*) named the golden rule; I. F. Pearce and others had circled the same first-order condition. The Inada conditions, named for Ken-Ichi Inada (1963), are the convenient way to guarantee a unique interior steady state; they are stronger than needed.
:::

::: summary
- The Solow law of motion is $\dot k = sf(k)-(n+\delta)k$. Gross investment per worker funds depreciation and capital widening; the rest is capital deepening.
- A unique positive steady state $k^*$ exists under Inada conditions and is globally stable. Long-run growth of output per worker is zero without technical change.
- The saving rate, population growth and depreciation are **levels** parameters. For Cobb–Douglas, $y^* \propto s^{\alpha/(1-\alpha)}(n+\delta)^{-\alpha/(1-\alpha)}$, with elasticity $\alpha/(1-\alpha)=1/2$ at $\alpha=1/3$.
- Transitions are front-loaded. The half-life is $\ln 2/((1-\alpha)(n+\delta))$, about 17 years at standard parameters — fast, and a challenge for the model as a theory of decades-long growth gaps.
- The golden rule is $f'(k)=n+\delta$, or $s=\alpha$ under Cobb–Douglas. Saving more than that is dynamically inefficient.
:::

## Exercises

::: exercise Steady state by hand {level=1 check="64"}
Let $f(k)=\sqrt{k}$, $s=0.4$, $n=0.02$, $\delta=0.03$. What is $k^*$? (Enter the integer value of $k^*$.)
::: solution
$s f(k^*)=(n+\delta)k^*$ gives $0.4\sqrt{k^*}=0.05 k^*$, so $0.4 = 0.05 \sqrt{k^*}$, hence $\sqrt{k^*}=8$ and $k^*=64$.
:::
:::

::: exercise Output and consumption {level=1}
In the economy of the previous exercise, compute $y^*$ and $c^*$.
::: solution
$y^*=\sqrt{64}=8$, $c^*=(1-0.4)\times 8=4.8$.
:::
:::

::: exercise Elasticity {level=1}
In a Cobb–Douglas Solow model with $\alpha=1/3$, by what per cent does $y^*$ rise if $s$ rises from 0.20 to 0.22, holding $n$ and $\delta$ fixed? Use the elasticity, not a recalculation of $k^*$.
::: solution
The elasticity of $y^*$ with respect to $s$ is $\alpha/(1-\alpha)=1/2$. A 10 per cent rise in $s$ (0.20 to 0.22) raises $y^*$ by about 5 per cent. (The exact factor is $(0.22/0.20)^{1/2}=1.049$, so 4.9 per cent.)
:::
:::

::: exercise Half-life {level=2 check="17.3"}
Take $\alpha=1/3$, $n+\delta=0.06$. What is the half-life of a small gap from $k^*$, in years, to one decimal place? (Enter 17.3 if that is your answer.)
::: solution
$\ln 2 / ((1-\alpha)(n+\delta)) = 0.693147/( (2/3)\times 0.06 ) = 0.693147/0.04 = 17.3$ years.
:::
:::

::: exercise Golden rule identification {level=2}
An economy has $f(k)=k^{0.5}$, $n=0$, $\delta=0.05$. (a) Find $k_{\mathrm{gold}}$ and $c_{\mathrm{gold}}$. (b) If $s=0.4$, is the steady state above or below the golden rule? (c) Compute $c^*$ at $s=0.4$ and compare it with $c_{\mathrm{gold}}$.
::: solution
(a) $f'(k)=0.5 k^{-0.5}=0.05$, so $k_{\mathrm{gold}}^{-0.5}=0.1$, $k_{\mathrm{gold}}=100$, $y_{\mathrm{gold}}=10$, $c_{\mathrm{gold}}=10-0.05\times 100=5$. (b) $s_{\mathrm{gold}}=\alpha=0.5$ for Cobb–Douglas, so $s=0.4$ is *below* the golden rule. Directly: $k^*=(0.4/0.05)^2=64<100$. (c) $y^*=8$, $c^*=0.6\times 8=4.8<5$. Raising $s$ toward $0.5$ would raise steady-state consumption.
:::
:::

::: exercise A discrete step {level=2}
Using [[#eq-discrete]] with $f(k)=k^{1/3}$, $s=0.2$, $n=0.01$, $\delta=0.05$ and $k_0=1$, compute $k_1$. Compare it with $k(1)$ from the continuous-time closed form of [[#ex-transition]].
::: solution
$k_1 = \bigl(0.2\times 1^{1/3} + 0.95\times 1\bigr)/1.01 = 1.15/1.01 = 1.139$. Continuous time: $k(1)=\bigl(10/3 - (7/3)e^{-0.04}\bigr)^{3/2} = (3.333-2.241)^{3/2} = 1.092^{1.5}=1.141$. The one-year discrete and continuous steps agree to two decimals. The $n\delta k$ discrepancy is second order.
:::
:::

::: exercise Dynamic inefficiency {level=3}
In the running Cobb–Douglas example ($n=0.01$, $\delta=0.05$, $\alpha=1/3$), consider $s=0.5$. (a) Compute $k^*$ and $f'(k^*)$. (b) Verify $f'(k^*)<n+\delta$. (c) In two or three sentences, explain why a *permanent* cut in $s$ to $1/3$ raises consumption at every subsequent date, not only in the new steady state.
::: hint
Write $c = f(k)-\dot k-(n+\delta)k$ along a path with $\dot k \le 0$.
:::
::: solution
(a) $k^*=(0.5/0.06)^{3/2}=19.09$, $f'(k^*)=(1/3)(19.09)^{-2/3}=0.0464$. (b) $n+\delta=0.06>0.0464$. (c) Cutting $s$ to $1/3$ makes the new $k^*$ equal to $k_{\mathrm{gold}}=13.10$. During the transition $k$ *falls*, so $\dot k<0$ and $c=f(k)-\dot k-(n+\delta)k$ is higher than $f(k)-(n+\delta)k$ for that same $k$. At every $k$ between $19.09$ and $13.10$, moreover, $f(k)-(n+\delta)k$ itself exceeds the old $c^*$, because $f(k)-(n+\delta)k$ is maximised at $k_{\mathrm{gold}}$ and is decreasing for $k>k_{\mathrm{gold}}$. Both the running-down of capital and the movement toward $k_{\mathrm{gold}}$ raise $c$. No generation pays for the move.
:::
:::

::: exercise Why $\alpha=1/3$ makes gaps hard {level=3}
Country A has $s=0.3$, country B has $s=0.1$; they share $\alpha=1/3$, $n$ and $\delta$. (a) What is the predicted ratio $y_A^*/y_B^*$? (b) Maddison 2023 gives a US/Ethiopia ratio of about 28 in 2019. If the only difference were a factor-of-three gap in $s$, would the Solow model with $\alpha=1/3$ come close? (c) What $\alpha$ would be needed for a factor-of-three gap in $s$ to produce a factor-of-28 gap in $y^*$? Comment in one sentence on whether that $\alpha$ is consistent with national-accounts capital shares.
::: solution
(a) $y_A^*/y_B^* = (s_A/s_B)^{\alpha/(1-\alpha)} = 3^{1/2} \approx 1.73$. (b) No: 1.73 versus 28. Observed saving-rate differences of this size cannot generate observed income differences if capital's share is one-third. (c) Need $3^{\alpha/(1-\alpha)}=28$, so $\alpha/(1-\alpha)=\ln 28/\ln 3=3.03$, hence $\alpha=3.03/4.03=0.75$. A capital share of three-quarters is far above the one-third of national accounts (or even the one-half sometimes used for "broad capital"). This is Mankiw, Romer and Weil's (1992) motivation for adding human capital, and Caselli's (2005) starting point for development accounting. The next two chapters take both routes.
:::
:::
