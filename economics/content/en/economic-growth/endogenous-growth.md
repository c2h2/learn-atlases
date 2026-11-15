In the Solow and Ramsey models, long-run growth of output per person is $g$, and $g$ is a parameter. That is a confession, not a theory. If $g$ is the reason living standards are twenty times what they were in 1820, a growth course that treats it as weather has stopped one chapter too soon.

This chapter takes **ideas** as the missing input. An idea — a recipe, a design, a theorem — is **non-rival**: one person's use does not preclude another's. Non-rivalry plus partial excludability (patents, secrecy, first-mover advantage) produces increasing returns at the aggregate level, a role for profit-seeking research, and a growth rate that is *chosen*. The AK model is the stripped-down version. Romer (1990, *JPE*) is the version with an explicit research sector. Jones (1995, *JPE*) is the critique: the Romer model has **scale effects** that sit badly with the time series, and removing them brings $g$ back toward a parameter, now a parameter of the research technology rather than of $A$ itself.

Competing views are on the table. Accumulation of ordinary capital, with a broad enough $\alpha$, can look like endogenous growth (MRW; the $AK$ limit). Schumpeterian models (Aghion and Howitt 1992, *Econometrica*) emphasise quality-improving creative destruction rather than expanding variety. Semi-endogenous models make long-run $g$ proportional to *population* growth, not to the *level* of population. The facts of [[economic-growth/growth-facts]] — a stable frontier $g$ near 2 per cent, a twentieth-century explosion of research effort, and no matching explosion of $g$ — are the tribunal.

## Non-rivalry

::: definition Rival and non-rival inputs {#def-nonrival}
A good is **rival** if one person's use precludes another's: a machine, an hour of labour, a tonne of steel. It is **non-rival** if use by one person does not reduce the amount available to others: a theorem, a chemical formula, a piece of software once written. **Excludability** is a separate property, a function of law and technology: a patented molecule is non-rival but (for a time) excludable; a pure public good is neither rival nor excludable.
:::

Romer's (1990) point is that a production function using only rival inputs, with constant returns in those inputs, cannot generate *per-person* growth from accumulation of those inputs: that is Solow. If a non-rival input $A$ also enters, $Y = F(A, K, L)$ can be constant returns in $(K,L)$ for given $A$ — so firms can make zero profits on rival factors — and *increasing* returns in $(A,K,L)$ jointly. Duplication of $A$ is free. That is the source of scale effects, of gains from trade in ideas, and of a growth rate that depends on how many people are assigned to producing $A$.

::: intuition Ideas are expensive to produce and cheap to replicate
The first copy of a vaccine design, a compiler, or a theorem costs a career. The second copy costs a download. Competitive markets, which set price equal to marginal cost, cannot pay the career if the download is priced at zero. Some departure from perfect competition — a patent, a copyright, a trade secret, a lead time — is required if profit-seeking agents are to produce ideas. That departure is a cost (static monopoly distortion) incurred to obtain a gain (the idea existing at all). Whether the patent is too long, too short, or the wrong instrument is a live policy dispute; the *logical* need for some excludability is not.
:::

::: warning Non-rivalry is not a metaphor for "knowledge is important"
Human capital is largely *rival*: the skill in a worker's head is not simultaneously in another's, and training one worker does not train the rest. Lucas (1988, *Journal of Monetary Economics*) treated human-capital externalities as a spillover, which is a different mechanism. Confusing $H$ with $A$ is the most common way to smuggle increasing returns into a model that does not have them. Years of schooling belong in [[economic-growth/convergence]] as an accumulated rival factor. Ideas belong here.
:::

## The AK model

The shortest endogenous-growth model drops diminishing returns. Let $Y = AK$ with $A$ now a *constant* (not a state), $I = sY$, $\dot K = sAK - \delta K$. Then

$$
g_Y = g_K = sA - \delta.
$$ {#eq-ak}

Output per person, if $n=0$, grows at $sA-\delta$. The saving rate *is* a growth-rate parameter. Rebelo (1991, *JPE*) is the clean statement; a Cobb–Douglas $Y=K^\alpha (AL)^{1-\alpha}$ with $\dot A \propto K$ or with $A$ proportional to $K$ (a linear externality, Romer 1986) reduces to the same reduced form.

::: proposition AK growth {#prop-ak}
In $Y=AK$ with a constant saving rate $s$, the growth rate of output is $sA-\delta$ (or $sA-\delta-n$ per person). There is no transitional dynamics if $k=K/L$ is the only state and $n=0$: the economy is always on its balanced path. The social return on capital is $A$; the private return is $A$ if there is no externality, and less than $A$ if $A$ stands in for a spillover that households do not internalise.
:::

::: proof
$\dot K/K = sY/K - \delta = sA-\delta$. Then $\dot Y/Y=\dot K/K$. If a spillover $Y=\bar A K$ with $\bar A$ taken as given by households, the private Euler equation uses the private return, which is smaller, and competitive $s$ is too low.
:::

::: example An AK arithmetic {#ex-ak}
Take $A=0.4$, $s=0.2$, $\delta=0.05$, $n=0.01$. What is growth of output per person? What happens to $g$ if $s$ rises to $0.25$?
::: solution
$g_y = sA - \delta - n = 0.08 - 0.05 - 0.01 = 0.02$. If $s=0.25$, $g_y=0.10-0.05-0.01=0.04$. Four extra points of saving buy two extra points of growth, forever. That is the AK promise, and it is why the model is so different from Solow, where the same experiment raises $y^*$ by a few per cent and leaves $g$ at $0$.
:::
:::

The empirical trouble is Kaldor's facts plus the time series of $s$. If $s$ is a growth-rate parameter, countries with persistently higher investment rates should grow persistently faster, not merely be richer. The conditional-convergence evidence of [[economic-growth/convergence]] — a negative coefficient on initial $y$ after conditioning on $s$ — is a Solow signature, not an AK signature. AK remains useful as a reduced form for "broad capital with little diminishing return over the relevant range", and as the skeleton of what follows.

::: widget plot
f: exp((s*A-d-n)*x)
sliders: s=0.2:0.1:0.3:0.01; A=0.4:0.25:0.5:0.01
x: 0, 80
y: 0, 40
labels: y(t)\ \text{in AK}
caption: AK paths $y(t)=\exp\bigl((sA-\delta-n)t\bigr)$ with $\delta=0.05$, $n=0.01$. At $s=0.2$, $A=0.4$ the growth rate is 2 per cent. Raise $s$ or $A$: the path tilts up *permanently*. In the Solow diagram of [[economic-growth/solow-model]] the same slider lifts a ceiling and the slope of $\ln y$ returns to $g$. That is the difference between a growth effect and a levels effect.
:::

::: widget sequence
a: 1.0*(1+(s*0.4-0.05-0.01))^n
N: 80
mode: terms
sliders: s=0.2:0.1:0.3:0.01
start: 0
y: 0, 30
caption: Illustrative $y_t=(1+sA-\delta-n)^t$ with $A=0.4$, $\delta=0.05$, $n=0.01$. At $s=0.2$, $g=2$ per cent and the path is the modest exponential of the facts chapter. Raise $s$ to $0.3$: $g=6$ per cent, and the same starting point is a "miracle" path. In Solow, that slider would lift a ceiling; here it tilts a ray.
:::

## Romer's expanding-variety model

Romer (1990) gives $A$ a microfoundation. A research sector produces new **varieties** of intermediate goods. Final output is

$$
Y = L_Y^{1-\alpha} \int_0^{A} x(i)^\alpha\, di,
$$ {#eq-romer-y}

with $A$ now the measure of varieties. A new variety is produced with a research technology $\dot A = \eta A L_A$ (knowledge spillovers: researchers are more productive when $A$ is already large), and $L_Y + L_A = L$. Intermediate-good $i$ is produced by a monopolist who owns the design, facing isoelastic demand, and who charges a mark-up $1/\alpha$ over marginal cost. The present value of monopoly profit is the incentive to research.

::: proposition The Romer growth rate {#prop-romer}
In the Romer (1990) model with a research technology $\dot A = \eta A L_A$ and a constant labour force $L$ allocated so that $L_A = s_R L$, the growth rate of $A$ and of $Y$ is

$$
g = \eta L_A = \eta s_R L.
$$ {#eq-romer-g}

Along the balanced path $g$ is increasing in the **scale** $L$ of the economy and in the research share $s_R$. The competitive allocation of $s_R$ is typically not optimal: knowledge spillovers and monopoly mark-ups distort research in opposite directions, and the sign of the net bias is a calibration, not a theorem.
:::

::: proof
$\dot A/A = \eta L_A$ by the research technology. With $L$ and $s_R$ constant, this $g$ is constant. Final output at a symmetric equilibrium $x(i)=\bar x$ is $Y = A^{1-\alpha} (A \bar x)^\alpha L_Y^{1-\alpha}$ up to constants — $Y$ linear in $A$ given $\bar x$ and $L_Y$ — so $g_Y=g_A$. The market $s_R$ equates the wage in research (the value of a new design times $\eta A$) to the wage in production; that calculation determines $s_R$ but is not needed for the scale-effect statement [[#eq-romer-g]].
:::

::: example Scale in a toy Romer economy {#ex-romer-scale}
Suppose $\eta=0.0002$ (a 0.02 per cent increment to $A$ per researcher per year, illustrative) and $s_R=0.05$. What is $g$ in an economy with $L=1$ million research-equivalent workers versus $L=5$ million? What does Jones's critique, below, make of this comparison?
::: solution
$g=\eta s_R L$. For $L=10^6$, $g=0.0002\times 0.05\times 10^6=10$, i.e. 1,000 per cent a year — an absurdity that already flags the units. Recalibrate: $\eta=2\times 10^{-8}$ gives $g=0.001$ (0.1 per cent) at $L=10^6$ and $g=0.005$ at $L=5\times 10^6$. Five times the researchers, five times the growth rate. Jones (1995) observed that the number of researchers in the US, Japan, France and Germany rose by a factor of several after 1950, while $g$ at the frontier did not. The linear $\dot A =\eta A L_A$ technology over-predicts the response of $g$ to scale.
:::
:::

## Scale effects and Jones's critique

::: definition Scale effects {#def-scale}
A growth model has a **strong scale effect** if the long-run growth rate of $y$ is increasing in the *level* of population (or of the number of researchers). It has a **weak scale effect** if the *level* of $y$ (or of $A$) is increasing in population, but $g$ is not. Solow has a weak scale effect in aggregates ($Y$ is larger when $L$ is larger) and none in $y$. Romer (1990) has a strong scale effect in $g$.
:::

Jones (1995, "R&D-Based Models of Economic Growth", *JPE*) replaced $\dot A = \eta A L_A$ with

$$
\dot A = \eta L_A A^\phi, \qquad \phi < 1,
$$ {#eq-jones}

**diminishing returns to knowledge** in research (the "fishing out" of easy ideas, or duplication). Then, with $L_A$ growing at rate $n$,

$$
g_A = \frac{\dot A}{A} = \eta L_A A^{\phi-1} \implies g_A^* = \frac{n}{1-\phi}
$$ {#eq-semi}

on a balanced path where $g_A$ is constant (which requires $L_A$ to grow in proportion to $A^{1-\phi}$). Long-run growth is proportional to *population growth*, not to the level of $L$. This is **semi-endogenous** growth: policy that shifts $s_R$ raises the *path* of $A$ but not the long-run $g_A$. The saving-rate logic of Solow reappears, with $s_R$ in the role of $s$ and $n$ in the role of the engine.

Bloom, Jones, Van Reenen and Webb (2020, *AER*, "Are Ideas Getting Harder to Find?") document that research effort in several fields has risen steeply while research productivity $\dot A/(A L_A)$ has fallen, consistent with $\phi<1$. That is evidence for fishing-out, and it is not a verdict against idea-based models; it is a verdict against the linear $\phi=1$ version.

Schumpeterian models (Aghion and Howitt 1992; Grossman and Helpman 1991) generate growth from **quality ladders**: a new idea *replaces* an old one, and the incumbent is destroyed. Scale effects appear there too, and the subsequent literature (Young 1998; Howitt 1999; Aghion, Akcigit, Howitt) has produced quality-ladder models with and without strong scale effects, and with a richer role for competition. The competition-and-growth relationship is non-monotone in that literature: too little competition means too little incentive to escape the leader; too much means too little rent to recoup the research cost.

::: example Variety and the mark-up {#ex-markup}
In the Romer final-good technology [[#eq-romer-y]], a symmetric equilibrium with $x(i)=\bar x$ for all $i\in[0,A]$ gives $Y = A^{1-\alpha} (A\bar x)^\alpha L_Y^{1-\alpha} = A \bar x^\alpha L_Y^{1-\alpha}$. A monopolist facing isoelastic demand with elasticity $1/(1-\alpha)$ sets price $1/\alpha$ times marginal cost. If the marginal cost of an intermediate is 1, what is the profit per variety, and why is it proportional to $Y/A$?
::: solution
Price $=1/\alpha$, quantity $\bar x$, so profit per variety is $(1/\alpha - 1)\bar x = ((1-\alpha)/\alpha)\bar x$. From the final-good first-order condition, spending on intermediates is $\alpha Y$, and there are $A$ varieties, so $\bar x \times (1/\alpha) \times A = \alpha Y$, hence $\bar x = \alpha^2 Y/A$. Profit per variety is then $((1-\alpha)/\alpha)\alpha^2 Y/A = \alpha(1-\alpha)Y/A$. The value of a new design is the present value of this stream. Anything that raises $Y/A$ (a larger market, a smaller $A$ relative to $Y$) raises the incentive to research. That is the scale effect from the demand side, complementing the $\eta A L_A$ spillover on the supply side.
:::
:::

::: quiz
In Jones's semi-endogenous model with $\phi<1$, a permanent rise in the share of labour in research $s_R$
- [ ] raises long-run $g_A$ in proportion to $s_R$
- [x] raises the path of $A$ but leaves long-run $g_A = n/(1-\phi)$ unchanged
- [ ] has no effect, even on the transition
- [ ] lowers $g_A$, because of fishing-out
::: solution
[[#eq-semi]] does not contain $s_R$. A higher $s_R$ raises $L_A$ at a given $L$, which raises $\dot A$ immediately, so $A$ is higher at every future date; $g_A$ is higher during a transition and returns to $n/(1-\phi)$. Fishing-out ($\phi<1$) is why the long-run rate is pinned by $n$, not why a rise in $s_R$ would *lower* $g_A$.
:::
:::

::: example Semi-endogenous arithmetic {#ex-semi}
Take $\phi=0.5$ and $n=0.01$. What is long-run $g_A$? If research productivity is falling as in Bloom et al. (2020), in which direction would a calibrator move $\phi$?
::: solution
$g_A = n/(1-\phi)=0.01/0.5=0.02$, a 2 per cent balanced path — the frontier rate of the facts chapter, here coming from population growth and a research elasticity, not from an exogenous $g$. Stronger fishing-out is a *smaller* $\phi$, which makes $1-\phi$ larger and $g_A$ *smaller* for given $n$. If ideas are getting harder to find, holding $n$ fixed, the model predicts slower long-run $g_A$ — unless the research-relevant population is itself rising, as it did in the twentieth century through the rise of the research share and of human capital. That last clause is how the model avoids predicting a collapse of $g$ the moment $\phi$ falls.
:::
:::

## What the models say about policy, and what they do not

Idea-based models have a research share $s_R$ that a subsidy can move. In Romer (1990), that subsidy changes long-run $g$; in Jones (1995), it changes the level path. Neither result is a recommendation. The models omit: international leakage of ideas (so a national subsidy need not capture the surplus); the empirical elasticity of $L_A$ to a tax credit (Hall and Van Reenen 2000 is the survey); military and university research, which are not profit-seeking Romer firms; and the possibility that measured R&D is not the $L_A$ of the model.

The **gains from openness** in an idea model are not the same as Ricardo's. A larger market raises the return to a non-rival design (Romer; Rivera-Batiz and Romer 1991). That is a scale effect again, and it is one of the channels through which trade can affect growth — alongside specialisation, factor-price changes, and institutional change. International trade is [[international-trade]]; the point here is that non-rivalry makes market size first-order for *innovation*, not only for static efficiency.

## Where this leads

[[economic-growth/institutions-and-growth]] asks why $s_R$, $\eta$, $\phi$ and the excludability regime differ across countries, and whether "institutions" is a name for those differences or a separate object. Development accounting treated $A$ as a residual; this chapter treated it as a stock of ideas. The residual is larger than patents. Misallocation, as in Hsieh and Klenow (2009), can look like low $A$ without any missing recipe.

For education only — not investment or financial advice. A research-driven growth rate in a model is not a forecast of any firm's return, and a patent is not a recommended portfolio holding.

::: history
**1986–1995, Romer to Jones.** Paul Romer’s 1986 *JPE* paper put knowledge spillovers into an AK-style model; his 1990 paper added monopolistic competition in designs. Robert Lucas (1988) ran a parallel human-capital programme. Philippe Aghion and Peter Howitt (1992) and Gene Grossman and Elhanan Helpman (1991) wrote the quality-ladder counterpart. Charles Jones (1995) showed that strong scale effects are hard to square with the post-war rise in research input, and the subsequent "semi-endogenous versus fully endogenous" literature is still live (Ha, Howitt 2007; Bloom et al. 2020).
:::

::: summary
- Ideas are non-rival. A production function that is constant returns in rival inputs is increasing returns in rival-plus-non-rival inputs. That is why $g$ can be endogenous.
- AK: $g_y=sA-\delta-n$. Saving is a growth-rate parameter. Conditional convergence evidence sits uncomfortably with this.
- Romer (1990): $g=\eta s_R L$. Strong scale effect. Monopoly plus spillovers make the market $s_R$ inefficient, with ambiguous sign.
- Jones (1995): $\dot A=\eta L_A A^\phi$, $\phi<1$, gives $g_A=n/(1-\phi)$. Semi-endogenous growth; $s_R$ is a levels parameter again.
- Bloom et al. (2020): ideas appear to be getting harder to find. That is evidence for $\phi<1$, not against idea-based growth.
:::

## Exercises

::: exercise AK growth {level=1 check="0.03"}
$Y=AK$ with $A=0.3$, $s=0.3$, $\delta=0.05$, $n=0.01$. What is $g_y$? (Enter a decimal, for example 0.02.)
::: solution
$g_y=sA-\delta-n=0.09-0.05-0.01=0.03$.
:::
:::

::: exercise AK versus Solow {level=1}
In one sentence each: what happens to long-run $g_y$ when $s$ rises, in Solow with exogenous $g$, and in AK?
::: solution
Solow: nothing; $g_y$ remains the exogenous $g$. AK: $g_y$ rises one-for-one with $sA$.
:::
:::

::: exercise Romer scale {level=1}
In Romer (1990), $g=\eta s_R L$. If two identical closed economies merge, doubling $L$ and keeping $s_R$ the same, what happens to $g$?
::: solution
$g$ doubles. That is the strong scale effect, and it is the prediction Jones (1995) argued against on time-series grounds. (In the model, $s_R$ itself may change with $L$; the headline experiment holds it fixed.)
:::
:::

::: exercise Jones's long-run rate {level=2 check="0.02"}
In Jones's model, $\phi=0.5$, $n=0.01$. What is long-run $g_A$? (Enter a decimal.)
::: solution
$g_A=n/(1-\phi)=0.01/0.5=0.02$.
:::
:::

::: exercise A subsidy in two models {level=2}
A subsidy permanently raises $s_R$ by 10 per cent of its former value. Compare the long-run effect on $g$ in Romer (1990) and in Jones (1995).
::: solution
Romer: $g=\eta s_R L$ rises by 10 per cent (of $g$). Jones: long-run $g_A=n/(1-\phi)$ is unchanged; the *level* of $A$ (and of $y$) is permanently higher, with a transitional period of faster growth. The two models agree that the subsidy is not neutral. They disagree about whether it is a growth-rate policy or a levels policy, which is the same disagreement Solow and AK have about $s$.
:::
:::

::: exercise Non-rivalry and the firm {level=2}
A software firm spends 10 million units to write a program and then reproduces it at a marginal cost of 1. Competitive price equals marginal cost. Why can this firm not recoup the 10 million in a perfectly competitive market for copies, and which of Romer's ingredients is designed to solve the problem?
::: solution
Once the program exists, competition among copies drives price to 1, and the 10 million is a sunk cost not recovered. Romer's monopolistic competition in designs gives the inventor a mark-up over marginal cost, converting the non-rival idea into a stream of profit that can (in present value) pay for the research. Patents, copyrights and trade secrets are the legal counterparts of that mark-up. Whether the mark-up is the right size is a different question; without some mark-up the competitive market produces zero ideas.
:::
:::

::: exercise Fishing-out arithmetic {level=3}
Suppose $\dot A = \eta L_A A^\phi$ with $\phi=0$, $\eta=1$, and $L_A=100$ constantly (no population growth). (a) What is $A(t)$ if $A(0)=1$? (b) What happens to $g_A=\dot A/A$ as $t\to\infty$? (c) How does this $\phi=0$ case (the "lab equipment" extreme) differ from $\phi=1$ in the long run when $L_A$ is constant?
::: hint
$\phi=0$ makes $\dot A$ independent of $A$: $A(t)=A(0)+\eta L_A t$.
:::
::: solution
(a) $\dot A = 100$, so $A(t)=1+100t$. (b) $g_A=100/(1+100t)\to 0$. (c) At $\phi=1$, $\dot A=\eta A L_A$ with constant $L_A$ produces constant $g_A=\eta L_A>0$ forever. At $\phi=0$, constant research produces *linear* $A$ and vanishing proportional growth. The Jones balanced path $g_A=n/(1-\phi)$ requires growing $L_A$ to offset fishing-out; with $n=0$ and $\phi<1$, long-run $g_A=0$. A constant research workforce is not enough to sustain proportional growth unless $\phi=1$.
:::
:::

::: exercise Ideas versus institutions, in one page {level=3}
A country has low TFP in the Hall–Jones sense. Sketch, in a short paragraph each, (i) an ideas-story (Romer/Jones) for that fact, (ii) a misallocation-story (Hsieh–Klenow), and (iii) a test that could in principle tell them apart. Do not conclude which is true.
::: solution
(i) The country has a small $A$ stock: few designs, a small $s_R$, weak spillovers $\eta$, or a research technology with severe fishing-out. Growth of $y$ will remain low until $L_A$ or $\eta$ rises; levels accounting and R&D/GDP would both look low. (ii) The country has access to a similar $A$ but uses it badly: plants with very different marginal products coexist, because of subsidies, credit frictions, or firing costs. Measured TFP is low even if patents per capita are not. (iii) A test: does within-industry dispersion of marginal products (Hsieh–Klenow's $\tau$) account for most of the TFP gap, or does a gap remain after reallocation to the efficient plants? A remaining gap is the part that looks like missing ideas (or missing quality of $A$). Neither diagnostic is clean — measured $\tau$ includes misspecification, and patents are a thin slice of $A$ — but they push in opposite directions. The next chapter's institutions can underlie *both* stories: a weak property-rights regime deters research *and* misallocates capital.
:::
:::
