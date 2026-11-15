A garment factory in Dhaka can stitch more shirts by adding sewing-machine operators, or it can install machines that let each operator finish more shirts, or it can do both. Each extra operator costs a wage; each extra machine costs a rental. The number of people the factory wants to hire is not a technological constant. It is a choice, and it depends on the wage, the price of shirts, the price of machines, and the way shirts are made. That choice, added up over firms, is **labour demand**.

Labour demand is a *derived* demand: nobody wants hours of work for their own sake; firms want the output those hours produce. Alfred Marshall made the point in 1890, and it still organises the theory. In the short run the capital stock is fixed and the firm hires up to the point where the extra revenue from one more hour equals the wage. In the long run capital adjusts, and a wage rise sets off a substitution effect (use machines instead of people) and a scale effect (produce less, because costs have risen). The size of those effects is the elasticity of labour demand — the number that tells us how many jobs a wage-push, a payroll tax or a minimum wage would cost if the labour market were competitive. Estimates cluster, for the competitive case, in a range that is neither zero nor enormous, and they differ by skill, by industry and by horizon. Technology can shift the whole curve: a robot that replaces a routine task reduces demand for the workers who used to do that task and raises demand for the workers who build, maintain and complement the robot.

This chapter takes production and cost from [[microeconomics/production-and-cost]] as given and specialises them to the demand for labour. The next chapter puts that demand against labour supply and studies equilibrium, monopsony and the minimum wage.

## Short-run labour demand

A firm produces output $q = f(K, L)$ from capital $K$ and labour $L$, selling at a product price $p$. In this chapter $\pi$ denotes **profit** (not inflation). The wage is $w$ and the rental on capital is $r$. In the **short run** $K$ is fixed at $\bar K$, and the firm chooses $L$ to maximise $\pi = p f(\bar K, L) - w L - r\bar K$.

::: definition Value of the marginal product {#def-vmp}
The **marginal product of labour** is $\mathrm{MP}_L = \partial f/\partial L$. The **value of the marginal product** is $\mathrm{VMP}_L = p \cdot \mathrm{MP}_L$, the extra revenue a competitive firm obtains by employing one more unit of labour. If the firm has product-market power, extra output lowers $p$, and the relevant object is the **marginal revenue product** $\mathrm{MRP}_L = \mathrm{MR} \cdot \mathrm{MP}_L$. For a competitive seller, $\mathrm{MR} = p$ and the two coincide.
:::

::: proposition Short-run labour demand {#prop-short-run}
A competitive firm with $K$ fixed hires labour up to the point where $\mathrm{VMP}_L = w$, provided that value exceeds average variable cost enough for the firm to operate. Equivalently, short-run labour demand $L^d(w; \bar K, p)$ is the inverse of $\mathrm{VMP}_L$ as a function of $L$. Assumptions: the firm takes $w$ and $p$ as given, $f$ is strictly concave in $L$ at $\bar K$ (diminishing $\mathrm{MP}_L$), and there are no hiring or firing costs.
:::

::: proof
Differentiate profit with respect to $L$: $\partial\pi/\partial L = p f_L(\bar K, L) - w$. Concavity in $L$ makes this strictly decreasing in $L$, so there is at most one root of $p f_L = w$. That root is the unique maximiser when it is positive and profit covers quasi-fixed costs; otherwise the firm sets $L = 0$. Inverting $p f_L(\bar K, L) = w$ for $L$ as a function of $w$ gives labour demand. Diminishing $\mathrm{MP}_L$ makes the inverse downward-sloping: a higher $w$ requires a higher $\mathrm{MP}_L$ and therefore a lower $L$.
:::

A rise in $p$ shifts $\mathrm{VMP}_L$ up and raises labour demand at every wage. A rise in $\bar K$ raises or lowers $\mathrm{MP}_L$ according as labour and capital are complements or substitutes in production; for the usual Cobb–Douglas and CES technologies they are complements in the sense that $f_{LK} > 0$, so more capital raises labour demand.

::: example A square-root technology {#ex-sqrt}
Let $q = \sqrt{L}$, $p = 8$ and $w = 2$. Capital is absent (or already baked into the functional form). Find the profit-maximising $L$, output and profit. What happens if $w$ rises to $4$?
::: solution
$\mathrm{MP}_L = \tfrac12 L^{-1/2}$, so $\mathrm{VMP}_L = 8 \cdot \tfrac12 / \sqrt{L} = 4/\sqrt{L}$. Set this equal to $2$: $\sqrt{L} = 2$, $L = 4$. Output is $2$ and profit is $8\cdot 2 - 2\cdot 4 = 8$. If $w = 4$, then $4/\sqrt{L} = 4$, so $L = 1$, output is $1$ and profit is $8 - 4 = 4$. Doubling the wage has quartered employment, because $\mathrm{MP}_L$ falls as $1/\sqrt{L}$: the short-run demand elasticity here is $-2$.
:::
:::

The same arithmetic in reverse is the competitive firm’s inverse labour demand: $w = p f_L(\bar K, L)$. Plotting that schedule with $L$ on the horizontal axis and $w$ on the vertical axis is the labour-demand curve.

::: widget plot
f: p*0.5*(16**0.4)*(x**(-0.4)); 6
x: 1, 40
y: 0, 20
sliders: p=10:4:16:0.5
labels: \text{VMP}_L; \text{wage}
caption: Short-run inverse labour demand $w = p\cdot\mathrm{MP}_L$ for $f = K^{0.4}L^{0.6}$ at $K = 16$, together with a wage line at $w = 6$. Employment is where the two meet. Raise the product price $p$: the VMP curve shifts up and the firm hires more at the same wage. The default $p = 10$ reproduces [[#ex-cd-demand]].
:::

::: example Cobb–Douglas, capital fixed {#ex-cd-demand}
Let $f(K, L) = K^{0.4} L^{0.6}$, $K = 16$, $p = 10$ and $w = 6$. Find $L$. Verify that $\mathrm{VMP}_L = w$.
::: solution
$\mathrm{MP}_L = 0.6 K^{0.4} L^{-0.4}$, so $p \cdot \mathrm{MP}_L = 6 \cdot 16^{0.4} / L^{0.4} = 6$. Then $16^{0.4}/L^{0.4} = 1$, hence $L = 16$. Directly, $L = K \bigl(p \cdot 0.6 / w\bigr)^{1/0.4} = 16 \cdot (6/6)^{2.5} = 16$. And $\mathrm{VMP}_L = 10 \cdot 0.6 \cdot 16^{0.4} \cdot 16^{-0.4} = 6 = w$.
:::
:::

::: warning The wage does not shift labour demand
Labour demand is a function of the wage. A change in $w$ is a movement along the curve. What *shifts* the curve is $p$, $\bar K$, technology, or product-market power. Newspaper commentary that a wage rise “reduces labour demand” is harmless shorthand for a movement along the curve; it becomes a mistake when the same picture is then used to discuss a demand shock, a tariff or a new machine, all of which really do shift the curve.
:::

## Long-run labour demand: substitution and scale

In the long run the firm chooses $K$ and $L$ together, and it can also choose how much to produce. A wage rise now does two things. At a given output, the firm switches toward capital: the **substitution effect**. And because production has become more expensive, the firm produces less (and some firms exit): the **scale effect**. Both reduce the demand for labour when the wage rises, so long-run labour demand is more elastic than short-run labour demand.

Formally, the firm’s conditional (output-held-fixed) labour demand $L(w, r, q)$ comes from cost minimisation, and its unconditional demand comes from substituting the profit-maximising $q(w, r, p)$ into that function.

::: proposition Substitution and scale {#prop-scale}
Let $L(w, r, q)$ be conditional labour demand and $q(w, r, p)$ the firm’s output. Unconditional labour demand is $L(w, r, q(w, r, p))$. Differentiating with respect to $w$,

$$
\frac{\mathrm{d}L}{\mathrm{d}w} = \underbrace{\frac{\partial L}{\partial w}\Big|_q}_{\text{substitution} \le 0} + \underbrace{\frac{\partial L}{\partial q}\frac{\partial q}{\partial w}}_{\text{scale} \le 0}.
$$ {#eq-scale}

The substitution term is the movement along an isoquant; the scale term is the movement to a smaller isoquant. Both are non-positive for a competitive firm with a concave production function. Equality to zero in the substitution term holds only if $K$ and $L$ must be used in fixed proportions.
:::

::: proof
Cost minimisation at given $q$ yields the first-order condition $f_L / f_K = w/r$ (the isoquant is tangent to the isocost). A rise in $w$ steepens the isocost, so at given $q$ the firm uses less $L$ and more $K$ whenever substitution is possible — that is $\partial L/\partial w|_q \le 0$. Profit maximisation sets $p = \mathrm{MC}(q)$. A rise in $w$ raises marginal cost, so the firm cuts $q$, and $\partial q/\partial w \le 0$. Labour is a normal input in the standard two-factor concave case ($\partial L/\partial q > 0$), so the product is non-positive. Adding the two pieces gives [[#eq-scale]].
:::

For Cobb–Douglas $f = K^{\alpha} L^{1-\alpha}$ the substitution elasticity is one, labour’s cost share is $1-\alpha$, and unconditional labour demand can be written in closed form: $L \propto (p/w)^{1/\alpha} K$ is not available once $K$ is chosen, but after both factors adjust, $L \propto p^{1/\alpha} w^{-(1-\alpha+\alpha)/\alpha}$ times a constant in $r$ — the wage elasticity is larger, in absolute value, than the short-run elasticity.

::: example Substitution at given output {#ex-substitution}
A firm must produce $q = 12$ and has $f(K, L) = K^{1/2} L^{1/2}$. Factor prices are $w = 4$, $r = 1$. Find the cost-minimising $(K, L)$. If $w$ rises to $9$ and output is held at $12$, what happens to $L$?
::: solution
For Cobb–Douglas with equal exponents the firm spends equally on $K$ and $L$, and $q = \sqrt{KL} = 12$ implies $KL = 144$. Cost minimisation: $rK = wL$, so $K = 4L$ at the original prices, hence $4L^2 = 144$, $L = 6$, $K = 24$. After the wage rise, $K = 9L$ and $9L^2 = 144$, so $L = 4$, $K = 36$. Labour falls from $6$ to $4$ at unchanged output: a pure substitution effect. (The firm’s costs rise from $4\cdot 6 + 1\cdot 24 = 48$ to $9\cdot 4 + 1\cdot 36 = 72$, so if it can choose output it will also cut $q$, and labour will fall further.)
:::
:::

The **elasticity of substitution** $\sigma$ measures how easy that first step is. For a linear production function $\sigma = \infty$ (perfect substitutes); for Leontief, $\sigma = 0$ (no substitution); for Cobb–Douglas, $\sigma = 1$; for CES, $\sigma$ is a parameter. Hamermesh’s survey (*Labor Demand*, 1993) put typical estimates of $\sigma$ between capital and labour around $0.3$–$0.7$ at the industry level, with a wide range across studies. More recent work using firm-level data and broader capital measures often finds numbers closer to $0.4$–$1$. The point for labour demand is simple: the easier it is to replace people with machines at a given output, the more elastic is conditional labour demand.

## The Hicks–Marshall laws

Marshall stated four rules for the elasticity of derived demand; Hicks (1932) cleaned them up. They remain the right way to think about *whose* wages a shock will change, and *which* labour demand is elastic.

::: proposition Hicks–Marshall laws of derived demand {#prop-hicks-marshall}
The absolute elasticity of demand for labour is larger, other things equal,
1. the larger is the elasticity of substitution $\sigma$ between labour and the other inputs;
2. the larger is the elasticity of demand for the product;
3. the larger is labour’s share in total cost, if $\sigma$ is smaller than the product-demand elasticity (the “importance of being unimportant” runs the other way when substitution is easy);
4. the larger is the elasticity of supply of the other inputs.

Assumptions: a competitive industry, two inputs, constant returns. The third law is the delicate one: Hicks showed that a larger labour share raises the derived-demand elasticity if and only if $\sigma$ is less than the product-demand elasticity.
:::

::: proof Sketch of the two-input formula.
Hicks’s formula for the elasticity of labour demand in a competitive industry is

$$
\eta_L = -\frac{\sigma(\eta + e_K) + s_L \eta e_K}{\eta + e_K + s_L(\sigma - \eta)},
$$

where $\eta > 0$ is the absolute elasticity of product demand, $e_K$ is the elasticity of supply of capital, and $s_L$ is labour’s cost share. (A common special case is perfectly elastic capital supply, $e_K = \infty$, which reduces to $\lvert\eta_L\rvert = s_L \eta + (1 - s_L)\sigma$.) Each of the four laws is a derivative of this expression. The special case already shows (1), (2) and (4), and shows (3) when $\sigma < \eta$: $\partial\lvert\eta_L\rvert / \partial s_L = \eta - \sigma$.
:::

The formula $s_L \eta + (1-s_L)\sigma$ is worth keeping. A wage rise in a small occupation (janitors in an office building) has little effect on the price of the product, so $\eta$ is almost irrelevant and $\sigma$ does the work: can the building replace janitors with machines or with a contractor? A wage rise for a large share of costs (nurses in a hospital, sewing-machine operators in a garment factory) passes through into prices, and product demand then cuts output. That is why a union covering a whole industry faces a more elastic labour-demand curve than a union covering a specialised craft, other things equal — and why Marshall thought craft unions had more power than industrial unions.

::: example Putting numbers on Hicks–Marshall {#ex-hm}
Suppose capital is elastically supplied, $\sigma = 1$, $s_L = 0.6$ and $\eta = 2$. Compute $\lvert\eta_L\rvert$. If instead labour’s share is only $0.1$, what is $\lvert\eta_L\rvert$? Which law is at work?
::: solution
With elastic capital, $\lvert\eta_L\rvert = s_L \eta + (1-s_L)\sigma = 0.6\cdot 2 + 0.4\cdot 1 = 1.6$. At $s_L = 0.1$, $\lvert\eta_L\rvert = 0.1\cdot 2 + 0.9\cdot 1 = 1.1$. Demand is less elastic when labour is a small share, because $\sigma = 1 < \eta = 2$: the third law in Marshall’s “importance of being unimportant” form. (Had $\sigma$ been $3$, say, the small-share occupation would have faced *more* elastic demand, because substitution would have been the dominant margin.)
:::
:::

::: quiz
A union of specialised technicians, who are a tiny share of each firm’s costs and who cannot easily be replaced by machines, is considering a wage push. The Hicks–Marshall laws suggest that labour demand for these technicians is
- [ ] highly elastic, because product demand is always elastic
- [x] relatively inelastic, because both $s_L$ and $\sigma$ are small
- [ ] infinitely elastic, because the firm can always substitute capital
- [ ] independent of product demand, because the technicians are a small share
::: solution
Small $s_L$ and small $\sigma$ both reduce $\lvert\eta_L\rvert$ in the usual case $\sigma < \eta$. Product demand still enters, but with a small weight $s_L$. The technicians are Marshall’s “unimportant” input, and the demand for them is inelastic if they are also hard to replace.
:::
:::

## Technology, automation and the demand for tasks

A production function $f(K, L)$ treats labour as a single homogeneous input. That is already too coarse once the question is *which* jobs a new technology destroys or creates. The modern approach, following Autor, Levy and Murnane (2003, *Quarterly Journal of Economics*) and Acemoglu and Autor (2011, *Handbook of Labor Economics*), is to think of production as a bundle of **tasks**, some of which are more easily done by machines (or by foreign labour) than others.

Routine, codifiable tasks — assembling a part, processing a form, driving a forklift along a fixed path — have been the ones falling in relative demand in the US, Britain and several other rich countries since the 1980s, as computers and later industrial robots became cheaper. Non-routine cognitive tasks (managing, designing, diagnosing) and some non-routine manual tasks (cleaning, caring, some kinds of driving) have been complementary to the same technologies. The labour-demand curve for “routine middle-skill” work has shifted in; the curves for high-skill cognitive work and for some low-skill service work have shifted out. That pattern is the demand-side engine of **job polarisation**, taken up in [[labour-economics/wage-inequality]].

Acemoglu and Restrepo (2020, *Journal of Political Economy*) estimate that one additional robot per thousand workers in a US commuting zone reduced the employment-to-population ratio by about $0.2$ percentage points and reduced wages, with the effects concentrated on routine manufacturing jobs. Graetz and Michaels (2018, *Review of Economics and Statistics*) find, in a cross-country industry panel, that robots raised labour productivity and average wages while reducing the low-skill employment share. The two papers are not in contradiction: a technology can raise average productivity and still reduce employment and wages in the tasks it replaces. Whether *aggregate* employment falls is a different question, and so far in the aggregate data of rich countries it has not: the employment-to-population ratio of people aged 15–64 in the OECD was 69.0 per cent in 2023, above the 66.1 per cent of 2010 (OECD Employment Outlook database, accessed 2026). What has changed is the *composition* of employment.

In middle-income manufacturing economies the same logic bites differently. Rodrik (2016, *Journal of Economic Growth*) documented **premature deindustrialisation**: the peak manufacturing employment share arrives at a lower income level than it did in the historical experience of Europe and East Asia, in part because the technologies now available are more labour-saving. Bangladesh’s garment sector still absorbs large numbers of (mostly female) workers because sewing has proved relatively hard to automate; that is a statement about $\sigma$ for a particular task, and it can change.

::: intuition A robot is a fall in $r$ for some tasks and a fall in the demand for others
In the two-factor model a cheaper machine is a fall in $r$, which raises labour demand if $K$ and $L$ are complements. In the task model a cheaper machine is also the conversion of some labour tasks into capital tasks. The first channel is complementary; the second is substitution. Which wins for any occupation is an empirical property of the task, not a theorem.
:::

## Evidence on the elasticity of labour demand

Hamermesh (1993) summarised a large literature as putting the constant-output (substitution) elasticity of labour demand around $-0.3$ and the total (including scale) elasticity around $-0.5$ to $-0.75$, at the industry level, for a horizon of a few years. Lichter, Peichl and Siegloch (2015, *Journal of Economic Surveys*) update the meta-analysis: their preferred average own-wage elasticity is about $-0.25$ in the short run and $-0.45$ in the long run, with more elastic demand for low-skill labour, in manufacturing, and in countries with more flexible labour law. Firm-level estimates using payroll-tax changes as variation — for example, a 2007 Swedish payroll-tax cut for young workers studied by Egebark and Kaunitz (2018, *Labour Economics*), or French and German reforms — typically find own-wage elasticities in the same broad range, sometimes smaller.

Three caveats belong next to every such number. First, the elasticity is larger at longer horizons, as [[#prop-scale]] requires. Second, it is larger for a single firm than for an industry, and larger for an industry than for the whole economy, because the scale effect is larger when customers can switch to other firms or other products. A payroll tax levied on one small firm is almost an experiment in moving along a very elastic demand curve; a payroll tax levied on all firms in a country is not. Third, when the labour market is not competitive — when the firm faces an upward-sloping labour supply curve, the subject of the next chapter — the mapping from a wage-push to employment is different, and a small mandated wage rise can raise employment.

::: history
The idea that the demand for labour is derived from the demand for the product is Marshall’s (*Principles of Economics*, 1890, Book V, Chapter 6). John Hicks, *The Theory of Wages* (1932), gave the substitution and scale effects a precise form and wrote down the four laws. Paul Douglas, in the 1920s and 1930s, estimated Cobb–Douglas production functions on industry data and read labour’s exponent as labour’s share — an early, and much criticised, attempt to measure $\mathrm{MP}_L$ from the data. Daniel Hamermesh’s *Labor Demand* (1993) is still the reference for the empirical elasticities. The shift from a single labour input to tasks is due to Autor, Levy and Murnane (2003) and to a sequence of papers by Acemoglu and Autor; the robot estimates of Acemoglu and Restrepo (2020) are the most cited recent attempt to put a number on automation’s employment effect in local labour markets.
:::

## Where this leads

Short-run and long-run labour demand, together with labour supply from [[labour-economics/labour-supply]], determine competitive employment and the wage in [[labour-economics/labour-market-equilibrium]]. That chapter also treats the case the present one has set aside: the firm that does not take $w$ as given. Technology’s effect on the *relative* demand for skill is the main demand-side story in [[labour-economics/wage-inequality]]. Immigration, in [[labour-economics/unions-and-migration]], is a shift of labour supply, and its wage effect depends on the elasticity we have just discussed — and on how substitutable immigrants are for natives, which is a $\sigma$ between two kinds of labour rather than between labour and capital.

::: summary
- A competitive firm hires labour up to $\mathrm{VMP}_L = w$ in the short run ([[#def-vmp]], [[#prop-short-run]]). The labour-demand curve slopes down because of diminishing $\mathrm{MP}_L$.
- In the long run a wage rise reduces labour by a substitution effect (along an isoquant) and a scale effect (a smaller isoquant) ([[#prop-scale]]). Long-run demand is more elastic.
- The Hicks–Marshall laws ([[#prop-hicks-marshall]]) say that labour demand is more elastic when substitution is easy, product demand is elastic, the other factor is elastically supplied, and — when substitution is not too easy — when labour is a large cost share.
- A useful special case is $\lvert\eta_L\rvert = s_L \eta + (1-s_L)\sigma$.
- Technology shifts labour demand by task, not uniformly. Routine tasks have seen inward shifts in rich countries; aggregate employment has not collapsed.
- Empirical own-wage elasticities of labour demand typically lie between about $-0.2$ and $-0.8$ depending on horizon, skill and market definition. Quote the horizon and the level of aggregation.
:::

## Exercises

::: exercise A square-root firm {level=1 check="9"}
Let $q = \sqrt{L}$, $p = 12$ and $w = 2$. Find the profit-maximising $L$. (Enter $L$.)
::: solution
$\mathrm{VMP}_L = 12 \cdot \tfrac12 / \sqrt{L} = 6/\sqrt{L} = 2$, so $\sqrt{L} = 3$ and $L = 9$.
:::
:::

::: exercise A price shift {level=1}
In [[#ex-sqrt]], $p$ rises from $8$ to $12$ with $w = 2$. What happens to $L$? Is this a movement along labour demand or a shift of it?
::: solution
The condition becomes $6/\sqrt{L} = 2$, so $L = 9$ (it was $4$). The product price has changed, so the VMP schedule has shifted up: a shift of labour demand, not a movement along it.
:::
:::

::: exercise Cost shares {level=1 check="1.4"}
Capital is elastically supplied, $\sigma = 1$, $s_L = 0.2$ and $\eta = 3$. Compute $\lvert\eta_L\rvert$ using $\lvert\eta_L\rvert = s_L\eta + (1-s_L)\sigma$. (Enter the elasticity in absolute value.)
::: solution
$0.2\times 3 + 0.8\times 1 = 0.6 + 0.8 = 1.4$.
:::
:::

::: exercise Conditional demand {level=2 check="4"}
A firm has $f(K, L) = K^{1/2}L^{1/2}$ and must produce $q = 12$. At $w = 9$, $r = 1$, find the cost-minimising $L$. (Enter $L$.)
::: solution
Equal cost shares and $KL = 144$ with $K = wL/r = 9L$ give $9L^2 = 144$, so $L = 4$, as in [[#ex-substitution]].
:::
:::

::: exercise Short run versus long run {level=2}
Explain, using [[#prop-scale]], why a firm’s labour demand is more elastic in the long run than in the short run. What would have to be true of technology for the two elasticities to be equal?
::: solution
In the short run $K$ is fixed, so only the movement along a given isoquant *slice* (diminishing $\mathrm{MP}_L$ at $\bar K$) is available; there is no substitution toward $K$ and no scale effect through a later adjustment of $K$. In the long run both the substitution term $\partial L/\partial w|_q$ and the scale term in [[#eq-scale]] come into play, and both are non-positive. The elasticities are equal only if both extra terms vanish: Leontief technology ($\sigma = 0$) *and* a scale of output that does not respond to $w$ (for example a firm that must fill a fixed order). Even with $\sigma = 0$ the scale effect remains if output can adjust.
:::
:::

::: exercise A payroll tax on the firm {level=2}
A competitive firm’s short-run condition is $p\,\mathrm{MP}_L = w$. A payroll tax $t$ is levied on the employer, so the firm pays $w + t$ per unit of labour. How does the labour-demand curve in $(L, w)$-space shift, and by how much vertically? Does the incidence on workers depend on this shift alone?
::: solution
The firm now sets $p\,\mathrm{MP}_L = w + t$, so the inverse demand $w = p\,\mathrm{MP}_L - t$ lies $t$ below the old inverse demand at every $L$: a parallel vertical shift down by $t$. How much of $t$ ends up as a lower $w$, rather than as lower $L$, depends on the elasticity of *supply* as well, and is an equilibrium question for [[labour-economics/labour-market-equilibrium]]. The demand shift alone does not determine incidence.
:::
:::

::: exercise Deriving the special-case formula {level=3}
Assume constant returns, two inputs, perfectly elastic capital supply and a competitive industry. Argue that a $1$ per cent rise in $w$ raises marginal cost by $s_L$ per cent, reduces industry output by $s_L \eta$ per cent, and (via substitution at given output) reduces labour by $(1-s_L)\sigma$ per cent. Combine the pieces to obtain $\lvert\eta_L\rvert = s_L\eta + (1-s_L)\sigma$.
::: hint
Shephard’s lemma says that labour’s cost share is the elasticity of cost with respect to $w$. Under constant returns, marginal cost equals average cost.
:::
::: solution
Under constant returns, $\mathrm{MC}$ equals average cost, and Shephard’s lemma gives $\partial \ln C / \partial \ln w = s_L$, so $\mathrm{MC}$ rises by $s_L$ per cent. Product demand then cuts industry output by $s_L \eta$ per cent; with constant returns, labour at given factor proportions falls by the same $s_L \eta$ per cent (the scale effect). At given output, the elasticity of substitution implies that labour’s input ratio $L/K$ falls by $\sigma$ per cent for a $1$ per cent rise in $w/r$, and with $K$ freely adjustable this is a $(1-s_L)\sigma$ per cent fall in $L$ (the substitution effect). Adding scale and substitution gives $\lvert\eta_L\rvert = s_L\eta + (1-s_L)\sigma$.
:::
:::

::: exercise A robot as a new factor {level=3}
A task that used to require one unit of labour can now be done by one unit of labour *or* by $m$ robots at rental $r_m$ each. Write down the condition under which the firm automates the task, and explain why a fall in $r_m$ can reduce employment in this task while raising employment in complementary tasks.
::: solution
The firm automates if $m r_m < w$ (strictly, if the cost of the robot bundle is less than the wage, adjusting for any productivity difference). A fall in $r_m$ that crosses this threshold converts the task from a labour task to a capital task: employment in *this* task falls, possibly to zero. Complementary tasks — building, installing, maintaining the robots, or performing the non-routine work that the extra output requires — have higher derived demand, so employment there can rise. Aggregate employment in the firm or the industry can go either way; that is the content of [[#prop-scale]] once “capital” is allowed to swallow a task.
:::
:::

::: exercise From VMP to an elasticity {level=2 check="-2"}
For $q = \sqrt{L}$ and given $p$, short-run labour demand is $L = (p/(2w))^2$. Compute the wage elasticity of labour demand. (Enter the elasticity, including the sign.)
::: solution
$\ln L = 2\ln(p/2) - 2\ln w$, so $\partial \ln L / \partial \ln w = -2$. The elasticity is constant at $-2$, as [[#ex-sqrt]] already illustrated by a doubling of $w$ that quartered $L$.
:::
:::
