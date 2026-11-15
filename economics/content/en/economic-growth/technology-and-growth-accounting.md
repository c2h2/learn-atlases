The Solow model of the last chapter produces a rich steady state and then stops. Frontier GDP per person has not stopped: it has grown at about two per cent a year for a century and a half ([[economic-growth/growth-facts]]). Something that is not capital per worker must be shifting the production function. This chapter names that something **labour-augmenting technical change**, puts it into the Solow model, and then asks a measurement question: of the growth we observe, how much is extra capital, how much is extra labour, and how much is a residual?

The residual is **total factor productivity** (TFP). It is an accounting object, not a photograph of laboratories. Solow (1957, *Review of Economics and Statistics*) found that it accounted for most of the rise in US output per hour between 1909 and 1949. Development accounting, applied to the cross-section, finds a similarly large residual in the gaps between rich and poor countries (Hall and Jones 1999; Caselli 2005). Both findings are why technology — and whatever else hides in the residual — sits at the centre of the course from here on.

## Labour-augmenting technology

Let $A(t)$ be a productivity index attached to labour, often called **effectiveness of labour**. Output is

$$
Y = F\bigl(K, A L\bigr),
$$ {#eq-yn}
with $F$ still constant-returns, strictly concave, Inada. The product $AL$ is **effective labour**. Technical change is **labour-augmenting** (or Harrod-neutral) when it enters this way.

::: definition Labour-augmenting technical change {#def-labour-aug}
**Labour-augmenting** (Harrod-neutral) technical change is a path $A(t)$ such that $Y = F(K, AL)$. It is **Hicks-neutral** if $Y = A F(K,L)$ and **capital-augmenting** (Solow-neutral) if $Y = F(AK, L)$. Under Cobb–Douglas the three are indistinguishable up to a relabelling of $A$, because $K^\alpha (AL)^{1-\alpha} = A^{1-\alpha} K^\alpha L^{1-\alpha}$. Under a different elasticity of substitution they are not, and only labour-augmenting change is in general compatible with balanced growth (Uzawa 1961).
:::

Uzawa’s theorem is the reason textbooks put $A$ next to $L$. If factor shares are to be constant while $K/Y$ is constant and both factors are growing, technical change must look labour-augmenting. That is a restriction on the *representation* of technical change, not a claim about how innovation actually happens. The microeconomics of ideas is [[economic-growth/endogenous-growth]].

Assume $\dot A / A = g \ge 0$ is a constant, so $A(t) = A_0 e^{gt}$. Population still grows at $n$. Define capital per **effective** worker

$$
\tilde k \equiv \frac{K}{AL}, \qquad \tilde y \equiv \frac{Y}{AL} = f(\tilde k).
$$

::: proposition Solow with labour-augmenting technology {#prop-solow-g}
Under $Y=F(K,AL)$ with $\dot A/A = g$ and $\dot L/L = n$,

$$
\dot{\tilde k} = s f(\tilde k) - (n+g+\delta)\tilde k.
$$ {#eq-ktilde}

There is a unique positive steady state $\tilde k^*$ with $s f(\tilde k^*) = (n+g+\delta)\tilde k^*$. Along the path with $\tilde k$ constant, output per worker $y = Y/L = A f(\tilde k)$ grows at rate $g$, and $K$, $Y$ and $C$ grow at rate $n+g$.
:::

::: proof
$\tilde k = K/(AL)$ gives $\dot{\tilde k}/\tilde k = \dot K/K - g - n$. Substitute $\dot K = sY - \delta K = s F(K,AL) - \delta K$ and $Y/(AL)=f(\tilde k)$ to obtain [[#eq-ktilde]]. The rest is [[economic-growth/solow-model]]: replace $n$ by $n+g$ and $k$ by $\tilde k$. At $\tilde k^*$, $Y = AL\, f(\tilde k^*)$ grows at $n+g$, so $Y/L$ grows at $g$. $K = \tilde k^* AL$ grows at $n+g$, hence $K/Y$ is constant.
:::

This is **balanced growth**: $K$, $Y$, $C$ grow at the same rate, $K/Y$ is constant, and — with Cobb–Douglas — factor shares are constant. Kaldor’s facts (1)–(5) hold on the balanced path, with labour productivity growing at $g$ rather than at zero.

The Solow diagram is unchanged in $(\tilde k, s f(\tilde k))$ space. The break-even ray is now $(n+g+\delta)\tilde k$: investment must also equip effective labour that is growing because $A$ is growing. A rise in $g$ *lowers* $\tilde k^*$, just as a rise in $n$ does, while *raising* the growth rate of $y$. Levels and growth rates again part company.

::: widget plot
f: s*x^(1/3); (n+g+d)*x
sliders: s=0.2:0.05:0.5:0.01; g=0.02:0:0.05:0.005; n=0.01:0:0.03:0.005; d=0.05:0.02:0.08:0.01
x: 0, 12
y: 0, 2
labels: \text{sf}(\tilde k); \text{(n+g+δ)}\tilde k
caption: Solow diagram in effective-labour units, $f(\tilde k)=\tilde k^{1/3}$. Raise $g$: the ray steepens, $\tilde k^*$ falls, but output per *worker* $y=A f(\tilde k)$ starts growing faster. The long-run growth rate of $y$ is $g$, independent of $s$. That is the chapter's main comparative-static result.
:::

::: example Balanced-growth numbers {#ex-balanced}
Keep $\alpha=1/3$, $s=0.2$, $n=0.01$, $\delta=0.05$, and add $g=0.02$. Compute $\tilde k^*$, $\tilde y^*$, the growth rates of $Y$, $K$, $y$ and $k$, and the capital–output ratio $K/Y$.
::: solution
$n+g+\delta=0.08$, so

$$
\tilde k^* = \bigl(0.2/0.08\bigr)^{3/2} = 2.5^{1.5} = 3.953, \qquad \tilde y^* = (3.953)^{1/3} = 1.581.
$$

On the balanced path $Y$ and $K$ grow at $n+g=0.03$; $y=Y/L$ and $k=K/L$ grow at $g=0.02$. The capital–output ratio is $K/Y = \tilde k^*/\tilde y^* = 3.953/1.581 = 2.50$, constant, and equal to $s/(n+g+\delta)=0.2/0.08=2.5$. Consumption per worker grows at $g$ as well. Compare $\tilde k^*=3.95$ with $k^*=6.09$ in the no-tech example of the last chapter: the extra break-even term $g\tilde k$ leaves the economy less capital-rich *per effective worker*, even as workers themselves become steadily more productive.
:::
:::

::: warning Growth of $A$ is not growth of $Y/L$ during a transition
On a balanced path, $g_y = g$. Off it, $y = A f(\tilde k)$ has two sources of growth: $g$ itself, and whatever is happening to $\tilde k$. A country that is accumulating $\tilde k$ toward $\tilde k^*$ grows *faster* than $g$; one that is running $\tilde k$ down grows slower. Observing a decade of 6 per cent growth of GDP per person is not observing $g=0.06$. China after 1978 is the usual illustration: part of that 5.7 per cent a year (Maddison 2023, 1978–2019) is a transition, part is $g$, and growth accounting is how one takes a view.
:::

## Growth accounting

Take $Y = F(K, AL)$ or, more commonly for measurement, $Y = A F(K,L)$ with Hicks-neutral $A$ standing in for TFP. With Cobb–Douglas $Y = K^\alpha (AL)^{1-\alpha}$ the two $A$'s differ by a power. Logarithmic differentiation — the continuous-time version of "take logs and differentiate" from [[mathematical-economics/derivatives-and-elasticities]] — yields the **growth-accounting identity**.

::: proposition The growth-accounting identity {#prop-accounting}
If $Y = F(K,L,t)$ is differentiable and factors are paid their marginal products, with capital share $\alpha_t \equiv F_K K/Y$, then

$$
\frac{\dot Y}{Y} = \alpha_t \frac{\dot K}{K} + (1-\alpha_t)\frac{\dot L}{L} + \frac{\dot Z}{Z},
$$ {#eq-account}

where $\dot Z/Z$ is the **Solow residual** (TFP growth), defined as the leftover. For Cobb–Douglas with constant $\alpha$ this is $g_Y = \alpha g_K + (1-\alpha)g_L + g_A$ in the Hicks-neutral labelling, or $g_Y = \alpha g_K + (1-\alpha)(g_A+g_L)$ in the labour-augmenting labelling. Output per worker obeys

$$
g_y = \alpha g_k + \text{TFP contribution}.
$$
:::

::: proof
$Y=F(K,L,t)$ gives $\dot Y = F_K \dot K + F_L \dot L + F_t$. Divide by $Y$: $\dot Y/Y = (F_K K/Y)(\dot K/K) + (F_L L/Y)(\dot L/L) + F_t/Y$. Competitive payment of factors and Euler’s theorem (constant returns in $K,L$) make the first two coefficients $\alpha_t$ and $1-\alpha_t$. The last term is the residual. Cobb–Douglas is the special case $F_t/Y = \dot A/A$ (Hicks) or $(1-\alpha)\dot A/A$ (Harrod). Divide $Y$ by $L$ and repeat to obtain the per-worker form, using $g_y = g_Y - g_L$ and $g_k = g_K - g_L$.
:::

The identity is not a theory of TFP. It is a partition of $g_Y$ into terms we have measured ($K$, $L$, shares) and a term we have not. Anything that raises $Y$ without raising $K$ or $L$ — better recipes, better allocation of the same $K$ and $L$ across firms, unmeasured quality of labour, utilisation — lands in the residual.

::: example A ten-year decomposition {#ex-ten-year}
An illustrative economy has $Y_0 = 100$, $Y_{10} = 134.39$ (3 per cent a year), $K_0 = 300$, $K_{10} = 444.07$ (4 per cent a year), $L_0 = 50$, $L_{10} = 55.23$ (1 per cent a year), and a constant capital share $\alpha = 1/3$. Compute TFP growth in the Hicks-neutral Cobb–Douglas sense, and the share of output growth accounted for by TFP, capital and labour.
::: solution
Annual rates: $g_Y = 0.03$, $g_K = 0.04$, $g_L = 0.01$. Then

$$
g_A = g_Y - \alpha g_K - (1-\alpha)g_L = 0.03 - \tfrac13(0.04) - \tfrac23(0.01) = 0.03 - 0.01333 - 0.00667 = 0.01.
$$

Of the 3.0 percentage points of output growth, capital contributes $1.33$, labour $0.67$, and TFP $1.00$. TFP is one-third of $g_Y$ and one-half of $g_y = 0.02$ (the per-worker calculation is $g_y = \alpha g_k + g_A = (1/3)(0.03)+0.01 = 0.02$). The levels check: $A_t = Y_t / (K_t^\alpha L_t^{1-\alpha})$ gives $A_0 = 100/(300^{1/3}50^{2/3}) = 100/76.37 = 1.309$ and $A_{10} = 134.39/(444.07^{1/3}55.23^{2/3}) = 134.39/92.89 = 1.447$, and $(1.447/1.309)^{1/10}-1 = 0.010$, matching.
:::
:::

Solow (1957) applied a discrete version of [[#eq-account]] to US private non-farm GDP, 1909–1949, and attributed about $87.5$ per cent of the growth of output per hour to the residual. Later work with better capital-services data (Jorgenson and Griliches 1967, and the subsequent BLS and EU KLEMS programmes) shrank the residual by measuring composition change in labour and capital — education, experience, a shift from structures to equipment. It did not eliminate it. Fernald and others at the San Francisco Fed, and the Conference Board's Total Economy Database, still find TFP to be the dominant term in long US and frontier growth, with a well-documented slowdown after 2004–2005.

PWT 10.01 reports TFP levels (`ctfp`, relative to the US) and TFP at constant national prices (`rtfpna`). For 2019, China’s `rtfpna` (2017=1) is 0.96 and the US series is on a different national-price index; *level* comparisons use `ctfp`. Level comparisons are the next section.

::: example Harrod versus Hicks on Cobb–Douglas {#ex-harrod-hicks}
Suppose $Y = K^{1/3}(AL)^{2/3}$ grows along a balanced path at $g_Y=0.03$, $g_K=0.03$, $g_L=0.01$. What is $g_A$ in the labour-augmenting labelling? What Hicks-neutral TFP growth $g_Z$ in $Y=Z K^{1/3}L^{2/3}$ matches the same path?
::: solution
Labour-augmenting: $g_Y = (1/3)g_K + (2/3)(g_A+g_L)$, so $0.03 = (1/3)(0.03) + (2/3)g_A + (2/3)(0.01)$, hence $0.03 = 0.01 + (2/3)g_A + 0.00667$, so $(2/3)g_A = 0.01333$ and $g_A=0.02$. That is the $g$ of the Solow balanced path: $Y/L$ grows at $g_A=0.02$. Hicks-neutral: $g_Y = g_Z + (1/3)g_K + (2/3)g_L$ gives $g_Z = 0.03 - 0.01 - 0.00667 = 0.0133$. The two residuals are linked by $g_Z = (1-\alpha)g_A = (2/3)\times 0.02$. Reporting "TFP growth of 1.3 per cent" or "technology growth of 2 per cent" can describe the same path; the labelling must be named.
:::
:::

::: quiz
In the growth-accounting identity with Cobb–Douglas and $\alpha=0.4$, output grows at 4 per cent, capital at 5 per cent, labour at 1 per cent. TFP growth is
- [ ] 4 per cent
- [x] 1.4 per cent
- [ ] 0 per cent, because factors explain everything
- [ ] 5 per cent
::: solution
$g_A = 0.04 - 0.4\times 0.05 - 0.6\times 0.01 = 0.04 - 0.02 - 0.006 = 0.014$, or 1.4 per cent. Factors do not exhaust observed growth unless the residual happens to be zero; here it is more than a third of $g_Y$.
:::
:::

## Levels accounting

Growth accounting decomposes a *change*. **Development accounting** (levels accounting) decomposes a *ratio*. Write

$$
\frac{y_i}{y_{\mathrm{US}}} = \Bigl(\frac{k_i}{k_{\mathrm{US}}}\Bigr)^\alpha \Bigl(\frac{h_i}{h_{\mathrm{US}}}\Bigr)^{1-\alpha} \frac{A_i}{A_{\mathrm{US}}}
$$ {#eq-levels}

in the Cobb–Douglas case, where $h$ is human capital per worker. Taking logs, the gap in $\ln y$ is a weighted gap in $\ln k$, a weighted gap in $\ln h$, and a residual gap in $\ln A$.

Hall and Jones (1999, *QJE*) found that $A$ accounted for most of the gap between, for example, the United States and Niger; capital–output ratios did not differ enough, once $A$ itself is allowed to affect $k$. Caselli (2005, *Handbook of Economic Growth*) is the standard survey: with $\alpha=1/3$ and observed $K$ and years of schooling, a large majority of the 90-fold Maddison gap between the richest and poorest is in the residual. Raising $\alpha$ to 2/3 ("broad capital") shrinks the residual but does not remove it, and it sits uncomfortably with measured capital shares.

Two interpretations of a large $A$-gap compete, and this course does not pick a winner.

- **Technology.** Poor countries do not use the frontier recipes. Parente and Prescott (*Barriers to Riches*, 2000) emphasise barriers to adopting existing techniques; Comin and Hobijn document long lags in the diffusion of particular technologies.
- **Misallocation.** The same recipes, applied to a distorted allocation of $K$ and $L$ across firms, look like a low $A$. Hsieh and Klenow (2009, *QJE*) estimated large TFP gains in China and India from equalising marginal products across manufacturing plants; the exercise is a measurement of *potential*, not a policy forecast.

A third interpretation is measurement: GDP in poor countries is harder to value, informal activity is missed, and PPP baskets are imperfect. That is a real issue (Deaton and Heston 2010). It is not large enough, on any published sensitivity check, to turn a 90-fold gap into a 3-fold gap.

::: example A miniature development account {#ex-levels}
Two illustrative countries have $y_R = 16$, $y_P = 2$, $k_R = 64$, $k_P = 8$, and $\alpha = 1/3$; human capital is the same. What fraction of the log gap in $y$ is accounted for by capital, and what fraction by $A$?
::: solution
$y_R/y_P = 8$ and $k_R/k_P = 8$, so

$$
\frac{A_R}{A_P} = \frac{y_R/y_P}{(k_R/k_P)^\alpha} = \frac{8}{8^{1/3}} = \frac{8}{2} = 4.
$$

$\ln(y_R/y_P) = \ln 8 = 2.079$; capital’s contribution is $\alpha \ln(k_R/k_P) = (1/3)\ln 8 = 0.693$ (one-third of the log gap); $A$ contributes $\ln 4 = 1.386$ (two-thirds). Even a factor-of-eight gap in $k$, matching the gap in $y$, leaves most of the log gap in the residual, because $k$ is raised to $\alpha=1/3$. This is the arithmetic behind Hall and Jones: capital differences would have to be *enormous* to explain income differences without $A$.
:::
:::

## The residual in the time series

Three empirical regularities constrain how one talks about TFP.

**Procyclicality.** Measured TFP falls in recessions. That can be true technology (destroyed vintages, postponed R&D) or unmeasured utilisation and labour hoarding. Basu, Fernald and Kimball (2006, *AER*) purify TFP of utilisation and find a less procyclical, sometimes countercyclical, object — a warning that the Solow residual is not a quarterly technology shock. The business-cycle use of TFP belongs to [[business-cycles/real-business-cycles]].

**The mid-2000s slowdown.** US TFP growth stepped down around 2004–2005, before the 2008 crisis (Fernald 2014, *SF Fed Working Paper*). Similar slowdowns appear in other frontier economies. Candidate explanations — fading of the 1990s IT wave, mismeasurement of digital goods, slowing research productivity (Bloom, Jones, Van Reenen and Webb 2020, *AER*) — are not settled. A growth course records the slowdown and does not pretend to date its end.

**Factor-share drift.** If the labour share falls, as Karabarbounis and Neiman (2014) document for many countries since the 1980s, Cobb–Douglas is misspecified. Growth accounting with time-varying shares (a Törnqvist index) is the robust response: [[#eq-account]] never needed a constant $\alpha$. What the fall *means* — cheaper investment goods, globalisation, market power, housing — is a live dispute, not a solved input to this chapter.

::: intuition TFP is a measure of our ignorance, with magnitudes
Abramovitz (1956) called the residual "a measure of our ignorance". That is the right attitude and the wrong dismissal. Ignorance that accounts for half of growth, or two-thirds of a log income gap, is the *main* object, not a rounding error. The next chapters give the ignorance names: ideas, institutions, misallocation, human capital we failed to count. They do not make the residual small by wishing it so.
:::

## Where this leads

[[economic-growth/convergence]] asks whether poor countries grow faster than rich ones, as a Solow transition with a common $A$ would imply, or whether $A$ itself differs enough to undo that force. [[economic-growth/endogenous-growth]] replaces the exogenous $g$ with a theory of ideas. [[economic-growth/institutions-and-growth]] asks why $A$ and $s$ and $n$ differ in the first place.

The Ramsey and Diamond chapters keep $A$ exogenous and endogenise $s$. That is a different cut through the same accounting: they are theories of the saving that growth accounting treats as an input.

For education only — not investment or financial advice. A TFP residual is not a forecast of productivity, and a development-accounting gap is not a ranking of investment destinations.

::: history
**1957, Solow.** “Technical Change and the Aggregate Production Function” (*REStat*) applied the residual to 1909–1949 US data and found that most of the growth of output per hour was not capital deepening. John Kendrick and Moses Abramovitz were running parallel measurement programmes; Abramovitz’s 1956 *NBER* paper already called the residual a measure of ignorance. Dale Jorgenson and Zvi Griliches (1967) showed how much of it could be pushed back into measured inputs. The modern implementation is the KLEMS tradition (Jorgenson, Timmer, van Ark) and the TFP series in PWT 10.01.
:::

::: summary
- Labour-augmenting $A(t)$ growing at $g$ converts the Solow model into a theory of balanced growth: $y$ grows at $g$ in the long run, $K/Y$ is constant, and $s$ remains a levels parameter.
- Uzawa’s theorem: only labour-augmenting change is generally compatible with constant factor shares and a constant $K/Y$.
- Growth accounting: $g_Y = \alpha g_K + (1-\alpha)g_L + g_{\mathrm{TFP}}$. The last term is a residual, large in Solow (1957) and still large after Jorgenson-style corrections.
- Development accounting puts most of the rich–poor *level* gap in $A$ as well, unless capital’s share is far above national-accounts values.
- TFP is procyclical as measured, slowed at the frontier after the mid-2000s, and sits inside a falling-labour-share debate. It is not a synonym for "technology".
:::

## Exercises

::: exercise Balanced-growth rates {level=1}
In the Solow model with labour-augmenting technology, $n=0.01$, $g=0.02$, $\delta=0.05$. What are the long-run growth rates of $Y$, $Y/L$, $K/L$ and $K/Y$?
::: solution
$Y$ grows at $n+g=0.03$; $Y/L$ and $K/L$ grow at $g=0.02$; $K/Y$ is constant, so its growth rate is 0.
:::
:::

::: exercise Steady-state $\tilde k$ {level=1 check="64"}
$f(\tilde k)=\sqrt{\tilde k}$, $s=0.4$, $n=0.01$, $g=0.02$, $\delta=0.02$. What is $\tilde k^*$? (Enter the integer.)
::: solution
$s\sqrt{\tilde k^*}=(n+g+\delta)\tilde k^* = 0.05\tilde k^*$, so $\sqrt{\tilde k^*}=0.4/0.05=8$ and $\tilde k^*=64$.
:::
:::

::: exercise A residual {level=1 check="0.01"}
Output grows at 3 per cent, capital at 3 per cent, labour at 1.5 per cent, $\alpha=1/3$. What is Hicks-neutral TFP growth? (Enter a decimal, for example 0.02.)
::: solution
$g_A = 0.03 - (1/3)(0.03) - (2/3)(0.015) = 0.03 - 0.01 - 0.01 = 0.01$.
:::
:::

::: exercise Per-worker accounting {level=2}
Using the numbers of [[#ex-ten-year]], decompose the 2 per cent growth of output per worker into capital deepening and TFP.
::: solution
$g_y = 0.02$, $g_k = 0.04-0.01=0.03$, $\alpha=1/3$, so $\alpha g_k = 0.01$ and $g_A=0.01$. Half of per-worker growth is capital deepening, half is TFP. This 50/50 split is an artefact of the illustrative rates; Solow’s 1909–1949 split was far more residual-heavy.
:::
:::

::: exercise Capital–output ratio {level=2}
On a balanced path with Cobb–Douglas, show that $K/Y = s/(n+g+\delta)$. Evaluate it at $s=0.2$, $n=0.01$, $g=0.02$, $\delta=0.05$. If $s$ rises to $0.3$, what happens to $K/Y$ in the long run, and what happens to the *growth rate* of $Y$?
::: solution
$K/Y = \tilde k / f(\tilde k)$. At the steady state $s f(\tilde k^*)=(n+g+\delta)\tilde k^*$, so $\tilde k^*/f(\tilde k^*)=s/(n+g+\delta)$. The value is $0.2/0.08=2.5$. If $s$ rises to $0.3$, $K/Y$ rises to $0.3/0.08=3.75$. The growth rate of $Y$ remains $n+g=0.03$. A levels parameter has been changed; $g$ has not.
:::
:::

::: exercise Development accounting with human capital {level=2}
Extend [[#ex-levels]] by giving the rich country twice the human capital of the poor one, $h_R/h_P=2$, still $\alpha=1/3$, $y_R/y_P=8$, $k_R/k_P=8$. Recompute $A_R/A_P$ from [[#eq-levels]]. What fraction of the log gap in $y$ now sits in $A$?
::: solution
$$
\frac{A_R}{A_P} = \frac{8}{8^{1/3}\, 2^{2/3}} = \frac{8}{2 \times 1.587} = \frac{8}{3.175} = 2.52.
$$

$\ln 8 = 2.079$; $A$ contributes $\ln 2.52 = 0.924$ (44 per cent of the log gap); capital still 0.693 (33 per cent); human capital $(2/3)\ln 2 = 0.462$ (22 per cent). Adding a factor-of-two human-capital gap, which is already large relative to Barro–Lee years of schooling, still leaves a substantial residual.
:::
:::

::: exercise Why Uzawa’s theorem matters {level=3}
Suppose $Y = K^\alpha (AL)^{1-\alpha}$ (labour-augmenting) versus $Y = (BK)^\alpha L^{1-\alpha}$ (capital-augmenting), with $\dot A/A = g_A$ and $\dot B/B = g_B$ constant. (a) In the labour-augmenting case, what grows at a constant rate on a balanced path, and is $K/Y$ constant? (b) In the capital-augmenting case, can $K/Y$ and the capital share both be constant if $g_B \neq 0$? (c) Why does Cobb–Douglas hide the distinction?
::: hint
On a balanced path $K$ and $Y$ grow at the same rate. The capital share is $\alpha$ in both Cobb–Douglas forms, always.
:::
::: solution
(a) $Y$ and $K$ grow at $n+g_A$, $K/Y$ is constant, the capital share is $\alpha$. (b) If $B$ grows at $g_B\neq 0$ and $L$ at $n$, constant $K/Y$ requires $K$ to grow at the same rate as $Y$. But $Y = B^\alpha K^\alpha L^{1-\alpha}$ then grows at $\alpha g_B + \alpha g_K + (1-\alpha)n$. Setting $g_Y=g_K$ gives $g_K = \alpha g_B + \alpha g_K + (1-\alpha)n$, so $(1-\alpha)g_K = \alpha g_B + (1-\alpha)n$, or $g_K = n + \frac{\alpha}{1-\alpha}g_B$. Then $g_Y=g_K$ is consistent, and $K/Y$ *is* constant — *because* Cobb–Douglas makes capital-augmenting change a relabelling of $A$ (set $A^{1-\alpha}=B^\alpha$). For a CES elasticity not equal to one, capital-augmenting change drives the capital share to 0 or 1 (Uzawa; see Acemoglu 2009, ch. 2). (c) Cobb–Douglas has elasticity of substitution one, so the three classifications of technical change are observationally equivalent. That is a convenience, and it is why this course can put $A$ next to $L$ without taking a stand on the elasticity — a stand that the falling-labour-share literature is no longer willing to postpone.
:::
:::

::: exercise Solow (1957) in miniature {level=3}
Over 40 years, output per hour in an illustrative economy doubles, and capital per hour rises by 50 per cent. Take $\alpha=1/3$. (a) What is the implied factor by which TFP (Hicks-neutral, on a per-hour basis) rose? (b) What share of the log growth of output per hour is the residual? (c) Solow’s 87.5 per cent was for 1909–1949 US output per hour. What would the capital deepening have had to be, over a doubling of $y$, to cut the residual’s share to one-half, still at $\alpha=1/3$?
::: solution
(a) $y_1/y_0 = 2$, $k_1/k_0 = 1.5$, so $A_1/A_0 = 2 / 1.5^{1/3} = 2/1.145 = 1.747$. (b) $\ln 2 = 0.693$; capital deepening contributes $(1/3)\ln 1.5 = 0.135$; residual $\ln 1.747 = 0.558$, which is 80 per cent of the log growth — in the region of Solow’s number. (c) Half of $\ln 2$ is $0.347 = \alpha \ln(k_1/k_0)$, so $\ln(k_1/k_0)=1.040$ and $k_1/k_0 = 2.83$. Capital per hour would have had to rise almost three-fold, not 50 per cent, to split the credit evenly. The 1909–1949 capital deepening was not of that size, which is why the residual dominated.
:::
:::
