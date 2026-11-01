A price can wander off without ever settling around a mean. The return over a single step is a different series, and it is often modelled as if its mean and variance stood still. That model may be wrong in a precise way: large moves arrive in bunches, and a correlation estimated in a calm stretch need not describe the next stretch. A two-state chain is the smallest picture of the bunching. A filter that decides, from the whole sample, which days were the stressful ones is another searched parameter, not a second independent experiment.

The probability underneath a stationary distribution is proved in the Maths Atlas, in [Markov chains](/learn/maths/lesson.php?c=probability&l=markov-chains). This chapter solves one $2 \times 2$ system and says what the solution is not allowed to decide. No result here is a recommendation to move capital when a state label flips.

## A level is not a return

Weak stationarity is a hypothesis about a series, not a compliment paid to a model that fitted well.

:::definition Weak stationarity {#def-stationary}
A return series $(R_t)$ is **weakly stationary** if three things hold. The mean $\E[R_t]$ is finite and does not depend on $t$. The variance $\Var(R_t)$ is finite and does not depend on $t$. The covariance $\Cov(R_t, R_{t-k})$ is finite and depends on the pair of dates only through the lag $k$. Independent draws from one distribution with a finite variance are weakly stationary. A series can be weakly stationary and still be dependent: the covariance at lag $k$ is allowed to be nonzero, provided it does not change when the whole pair is shifted along the calendar.
:::

The lag-1 correlation in [[statistics/moments-and-dependence]] has a single population value only under a hypothesis of this kind. Without it, $\Cov(R_t, R_{t-1}) / \Var(R_t)$ can drift with $t$, and one sample number is an average over a moving target.

Prices are the wrong place to look for that hypothesis.

:::definition Random-walk price {#def-rw}
Let $\varepsilon_1, \varepsilon_2, \ldots$ be independent, with $\E[\varepsilon_t] = 0$ and $\Var(\varepsilon_t) = \sigma^2$ for a finite $\sigma^2 > 0$, and let $P_0$ be a constant. The **random-walk price**

$$
P_t = P_0 + \varepsilon_1 + \cdots + \varepsilon_t
$$

is a unit-root model of the level. The increment $\Delta P_t = P_t - P_{t-1} = \varepsilon_t$ is then independent of the past and weakly stationary. The simple return $P_t/P_{t-1} - 1 = \varepsilon_t / P_{t-1}$ is not an independent copy of $\varepsilon_t$, because the denominator remembers the path.
:::

Calling a price a random walk and calling a return a random walk are different sentences. The first says the level is built by adding shocks. The second says the shocks themselves have no memory. A simple return divides by a price, so even a pure random walk in the level does not hand you independent simple returns for free.

:::proposition Variance of a random-walk price {#prop-var-rw}
Under [[#def-rw]], $\E[P_t] = P_0$ and $\Var(P_t) = t\,\sigma^2$ for each $t \ge 1$. The family of random variables $(P_t)_{t \ge 0}$ is not weakly stationary, because the variance depends on $t$.
:::

:::proof
The expectation of a sum is the sum of the expectations, so $\E[P_t] = P_0 + \sum_{i=1}^t \E[\varepsilon_i] = P_0$. For the variance, independence of the increments is the assumption that lets variances add: there are no covariance terms between $\varepsilon_i$ and $\varepsilon_j$ for $i \neq j$. Each increment contributes $\sigma^2$, and there are $t$ of them, so $\Var(P_t) = t\,\sigma^2$. Weak stationarity of the level would require $\Var(P_t)$ to be the same number for every $t$. A strictly increasing function of $t$ is not a constant. The first difference $\varepsilon_t$ does satisfy the definition: its mean and variance do not depend on $t$, and its covariance at every nonzero lag is zero by independence.

The same addition works if the increments are uncorrelated rather than independent. Independence is the stronger hypothesis stated in [[#def-rw]], and it is more than the variance formula needs. It is not a hypothesis one may smuggle back onto simple returns.
:::

Nothing in the proposition is a test. A unit-root statistic has a non-standard null distribution, and this chapter does not invent a p-value for Path A or for any library series. Path A's price runs from $100$ to $110$ in seven steps. That path is short, it rises, and a failure to reject a unit root on seven points would be as uninformative as a rejection. The proposition is the population fact a test would be aimed at: if the level is a random walk of this form, its variance grows in proportion to the number of steps, so a sample variance computed from a price chart is a variance of unlike objects.

:::example Fair steps, enumerated {#ex-enum}
Let each increment be $+1$ or $-1$ with equal probability $1/2$, independently, and let $P_0 = 100$. This is [[#def-rw]] with $\sigma^2 = 1$. Enumerate $\Var(P_2 - P_0)$ and $\Var(P_3 - P_0)$ from the definition, as the mean of the squared sum over the equally likely outcomes.
:::solution
At $t = 1$ the two outcomes are $+1$ and $-1$, each with probability $1/2$. The mean is $0$ and the mean square is $1 = 1 \cdot \sigma^2$.

At $t = 2$ there are four outcomes, $(+1,+1)$, $(+1,-1)$, $(-1,+1)$, $(-1,-1)$, with sums $2, 0, 0, -2$. The mean sum is $0$. The mean square is $(4 + 0 + 0 + 4)/4 = 2$, which is $t\sigma^2$.

At $t = 3$ there are eight outcomes. The sums and their multiplicities are $+3$ (one way), $+1$ (three ways), $-1$ (three ways) and $-3$ (one way). The mean is $0$. The mean square is

$$
\frac{1}{8}\bigl(9 + 3 \times 1 + 3 \times 1 + 9\bigr) = \frac{24}{8} = 3,
$$

again $t\sigma^2$. One realised path, say $101, 100, 101$, does not display the number $3$ by itself. The variance in [[#prop-var-rw]] is an average over paths. A single price chart is one path. Its sample variance is not $t\sigma^2$, and watching it wander is not a measurement of $\sigma^2$ unless a model turns the chart back into an average.
:::
:::

:::quiz
Under [[#prop-var-rw]] with $\sigma^2 = 1$, which series can be weakly stationary?
- [ ] The price $P_t$, because its mean $P_0$ does not depend on $t$.
- [ ] The price $P_t$, because independent increments were assumed.
- [x] The increment $\varepsilon_t$, but not the price.
- [ ] The simple return $\varepsilon_t / P_{t-1}$, automatically, because the increment is stationary.
:::solution
The mean of $P_t$ is constant and the variance $t\sigma^2$ is not, so the price fails [[#def-stationary]]. The increment meets the definition. Dividing by $P_{t-1}$ produces a new series whose variance still depends on how far the level has moved, and the proposition does not call that series stationary.
:::
:::

## Clustering

Stationary increments can still be the wrong model of a return. The usual failure in a return series is not a variance that grows like $t$. It is a variance that is itself persistent: a large move is followed by a large move, with the signs free to cancel.

:::definition Volatility clustering {#def-cluster}
A return series shows **volatility clustering** when large values of $\abs{R_t}$ tend to be followed by large values of $\abs{R_{t+1}}$, in the sense that the lag-1 correlation of $(\abs{R_t})$, or of $(R_t^2)$, is positive, even if the lag-1 correlation of $(R_t)$ itself is near zero or negative. The absolute value and the square discard the sign and keep the magnitude. Clustering is a dependence hypothesis about magnitudes. It is not a second mean.
:::

The sample correlations in the next example are the pair-correlations of [[statistics/moments-and-dependence]]. They are in-sample descriptions of a constructed series. A positive correlation of absolute returns is compatible with weak stationarity: the definition allows a nonzero covariance at a fixed lag. What clustering breaks is the stronger habit of treating the variance as a constant one may estimate once and then trust. A constant unconditional variance can coexist with a conditional variance that moves. The unconditional variance averages over the calm days and the stressful days. A rule that experiences only one of those regimes does not live in the average.

:::example Signs cancel, magnitudes persist {#ex-cluster}
Let the constructed series, in return units, be

$$
0.01,\ -0.01,\ 0.01,\ -0.01,\ 0.05,\ -0.05,\ 0.05,\ -0.05.
$$

It is not Path A and not a market. Compute the sample lag-1 correlation of the series and of its absolute values.
:::solution
The signed series alternates at every step, and it also changes scale: four small returns, then four large ones. The sample lag-1 correlation of the signed series is $-0.934199$. The products of neighbouring signed returns are negative, and the correlation records that.

The absolute values are $0.01, 0.01, 0.01, 0.01, 0.05, 0.05, 0.05, 0.05$. Their sample lag-1 correlation is exactly $3/4 = 0.75$. Neighbouring magnitudes agree: small follows small inside the first half, and large follows large inside the second half. The single pair that crosses the break, $(0.01, 0.05)$, is not enough to pull the correlation down to zero.

So the signed series looks like strong one-step reversal, and the magnitude series looks like persistence. A variance computed from all eight points mixes the two scales. A one-day rule that uses only the sign, and a position-size rule that uses a trailing variance, are reading different correlations of the same eight numbers. Neither correlation is a parameter to export. Both are large because the series was built to make them large, on seven pairs.
:::
:::

## Two regimes

A Markov chain is a model in which the next state depends on the past only through the current state. The chain used here has two states, calm and stress, and the transition matrix from the course's figure,

$$
P = \begin{pmatrix} 0.85 & 0.15 \\ 0.30 & 0.70 \end{pmatrix}.
$$

The first row is the conditional distribution of the next state given that the chain is calm. The chain stays calm with probability $0.85$ and moves to stress with probability $0.15$. The second row leaves stress with probability $0.30$ and stays with probability $0.70$. Each row sums to $1$. The matrix is a sketch of volatility regimes. It is not estimated from Path A, and it is not a forecast of any traded series.

A probability row vector $\pi = (\pi_{\mathrm{c}}, \pi_{\mathrm{s}})$ is **stationary** if $\pi P = \pi$ and $\pi_{\mathrm{c}} + \pi_{\mathrm{s}} = 1$, with both coordinates nonnegative. If the chain starts from $\pi$, it has distribution $\pi$ at every later date. The Maths Atlas proves that a finite chain in which every state can reach every other state has exactly one such distribution. Every entry of this $P$ is positive, so calm reaches stress in one step and stress reaches calm in one step. Uniqueness applies. The algebra below finds the distribution. It does not re-prove uniqueness.

:::proposition Stationary distribution of the two-state sketch {#prop-pi}
For the matrix $P$ above, the unique stationary distribution is

$$
\pi_{\mathrm{c}} = \frac{2}{3}, \qquad \pi_{\mathrm{s}} = \frac{1}{3}.
$$
:::

:::proof
Uniqueness is the finite irreducible case in the Maths Atlas, which applies because every transition probability is positive. It remains only to solve $\pi P = \pi$ together with $\pi_{\mathrm{c}} + \pi_{\mathrm{s}} = 1$. The first coordinate of $\pi P = \pi$ reads

$$
\pi_{\mathrm{c}} = 0.85\,\pi_{\mathrm{c}} + 0.30\,\pi_{\mathrm{s}}.
$$

Rearrange: $0.15\,\pi_{\mathrm{c}} = 0.30\,\pi_{\mathrm{s}}$. This is the flow balance between the two states. Substitute $\pi_{\mathrm{s}} = 1 - \pi_{\mathrm{c}}$:

$$
0.15\,\pi_{\mathrm{c}} = 0.30\,(1 - \pi_{\mathrm{c}}) = 0.30 - 0.30\,\pi_{\mathrm{c}}.
$$

Add $0.30\,\pi_{\mathrm{c}}$ to both sides: $0.45\,\pi_{\mathrm{c}} = 0.30$, so $\pi_{\mathrm{c}} = 0.30/0.45 = 2/3$ and $\pi_{\mathrm{s}} = 1/3$.

Check the second coordinate rather than assuming the row-sum constraint has made it redundant in the arithmetic. The second equation says $\pi_{\mathrm{s}} = 0.15\,\pi_{\mathrm{c}} + 0.70\,\pi_{\mathrm{s}}$. The right-hand side is

$$
0.15 \times \frac{2}{3} + 0.70 \times \frac{1}{3} = \frac{0.30}{3} + \frac{0.70}{3} = \frac{1}{3},
$$

which equals $\pi_{\mathrm{s}}$. Both stationary equations hold, and the coordinates sum to $1$.

The same algebra is detailed balance. The flow from calm to stress is $\pi_{\mathrm{c}} \times 0.15 = (2/3) \times 0.15 = 0.10$. The flow from stress to calm is $\pi_{\mathrm{s}} \times 0.30 = (1/3) \times 0.30 = 0.10$. The two flows match. Detailed balance is a sufficient condition for stationarity in the Maths Atlas; here it is a check on the fractions, not a second derivation.
:::

The stationary mass is not the length of a visit. Starting in calm, the chain leaves at each step with probability $0.15$, independently of how long it has already stayed, because the transition probability depends only on the current state. The length $L$ of a calm visit therefore satisfies $\Prob(L = k) = 0.85^{k-1} \times 0.15$ for $k = 1, 2, \ldots$, and

$$
\E[L] = \frac{1}{0.15} = \frac{20}{3} \approx 6.667
$$

steps. A stress visit has mean $1/0.30 = 10/3 \approx 3.333$ steps. The long-run fraction of steps that are calm is the share of a typical cycle spent in calm,

$$
\frac{20/3}{20/3 + 10/3} = \frac{20}{30} = \frac{2}{3},
$$

which agrees with $\pi_{\mathrm{c}}$. The agreement is a useful check. It is not a reason to treat $2/3$ as the probability that "the market is calm" on a date one has not modelled.

:::example Two steps out of stress {#ex-two-step}
The chain starts in stress, so the distribution at step $0$ is $(0, 1)$. Find the distribution after two steps, and the probability of being calm at that horizon.
:::solution
One step from stress is the second row of $P$, namely $(0.30, 0.70)$. Two steps require the second row of $P^2$. Compute

$$
P^2 = \begin{pmatrix} 0.85 & 0.15 \\ 0.30 & 0.70 \end{pmatrix}
\begin{pmatrix} 0.85 & 0.15 \\ 0.30 & 0.70 \end{pmatrix}
= \begin{pmatrix} 0.7675 & 0.2325 \\ 0.4650 & 0.5350 \end{pmatrix}.
$$

The second row is the distribution after two steps starting from stress: probability $0.465$ of calm and $0.535$ of stress. The same row is $(0, 1)\, P^2$. The stationary distribution is $(2/3,\ 1/3) \approx (0.667,\ 0.333)$. After two steps the chain has moved from $(0, 1)$ towards that row and has not arrived. Starting from calm, the first row of $P$ is $(0.85, 0.15)$, and the first row of $P^5$ is about $(0.683, 0.317)$, closer again. The figure below draws this approach. One simulated path in the figure is not the distribution, and the distribution is not a forecast for a price series that was never claimed to follow $P$.
:::
:::

:::example A long-run count {#ex-count}
Assume the chain has been running from its stationary distribution. In $300$ steps, how many steps fall in calm, in expectation? How many fall in stress?
:::solution
The indicator that step $t$ is calm has expectation $\pi_{\mathrm{c}} = 2/3$, at every $t$, by stationarity. Linearity of expectation gives

$$
\E[\text{number of calm steps}] = 300 \times \frac{2}{3} = 200,
$$

and the expected number of stress steps is $300 \times 1/3 = 100$. The two counts sum to $300$. This is an expectation under the model, not a promise that a given $300$-step window contains $200$ calm steps. The variance of the count is positive because visits last several steps: calm spells average $20/3$ steps, so the $200$ calm steps arrive in fewer, longer runs than they would under independent daily coin flips with the same probability $2/3$. Clustering of the state is exactly that extra clumpiness. The expectation does not see it. A sample variance that assumes independent days will not see it either.
:::
:::

:::example A median computed from the whole sample {#ex-median}
The invented returns $0.01, 0.01, 0.05, -0.04$ are labelled "stress" when their absolute value exceeds the sample median of the four absolute values, and "calm" otherwise. Use the convention that the sample median of four numbers is the average of the second and third in order. Which dates are labelled stress, and why is the label of the first date not available at the first date?
:::solution
The absolute values are $0.01, 0.01, 0.05, 0.04$. Ordered, they are $0.01, 0.01, 0.04, 0.05$. The median is $(0.01 + 0.04)/2 = 0.025$. The days strictly above $0.025$ are the third, with absolute return $0.05$, and the fourth, with absolute return $0.04$. Those two dates are labelled stress. The first two are labelled calm.

The median $0.025$ uses the third and fourth absolute returns. The label of the first date therefore depends on prices that have not yet occurred at the first date. A rule that conditions on this label is using the future. Replacing the full-sample median by the median of absolute returns strictly before the decision date removes that particular leak. It does not remove the search, if the threshold, the window, or the decision to use a median at all was chosen because the labelled backtest looked good. That search is the warning below.
:::
:::

:::widget markov
matrix: 0.85,0.15; 0.30,0.70
states: Calm; Stress
steps: 24
caption: The two-state sketch. Stationary mass on calm is 2/3 and on stress is 1/3, from either start. One simulated path is a single draw, not that distribution, and the matrix is illustrative rather than estimated.
:::

:::warning A regime filter fitted in sample is another searched parameter
Choosing a threshold, a probability, or a window so that the calm subsample and the stress subsample tell a clean story is a search over rules. [[statistics/testing-and-snooping]] already counts that search. Estimating $P$ on the same sample that is then used to praise the filter spends the sample twice. A label that uses the full-sample median, as in [[#ex-median]], spends it twice inside a single date: once to form the label and once to score the return. Out of sample, the chain can move to a transition probability that was never seen. The stationary distribution computed above cannot describe a third state that the two-state sketch left out.
:::

:::intuition The level wanders, the increment need not, the variance still might
Three nested mistakes are easy to make in order. The first is to treat a price chart as a stationary series and to quote a variance for "the price", when [[#prop-var-rw]] says a random-walk variance grows with $t$. The second is to difference the price, or to pass to returns, and then to treat the result as independent noise. The third is to notice clustering and to respond by fitting a regime rule on the same history, with a hurdle that was never charged for the fit. The first mistake inflates the role of the level. The second understates dependence of magnitudes. The third turns a description of clustering into an over-fit state machine. Stopping after a description is allowed.
:::

:::application What a state is allowed to change
Inside the sketch, a state may change the conditional distribution of the next return. A calm state with a tight conditional variance and a stress state with a wide one is the usual story, and [[#ex-cluster]] is a toy in which the absolute returns do exactly that, without any estimated matrix. The stationary weights $2/3$ and $1/3$ are the model's long-run mixture. They are the wrong weights for a conditional question. A decision taken when the chain is known to be in stress should use the stress row, whose mean visit is $10/3$ steps and whose one-step probability of still being in stress is $0.70$. Using $\pi$ instead of the current row throws away the state the model was built to carry. Using a state that was labelled with future data, as in [[#ex-median]], answers neither the conditional question nor the long-run one.
:::

:::remark Holding time and stationary mass answer different questions
The mean calm visit is $20/3$ steps. The stationary probability of calm is $2/3$. Neither number is the probability of being calm after a finite number of steps from a known start: [[#ex-two-step]] gives $0.465$ two steps after stress, not $2/3$. The mean return time in the Maths Atlas, the reciprocal $1/\pi_{\mathrm{c}} = 3/2$, counts every step that remains in calm as a return to calm. It is not the length of a visit. Quoting $1.5$ as "how long calm lasts" confuses those definitions. The visit length is $1/(1 - 0.85) = 20/3$.
:::

:::history
In 1900 Louis Bachelier modelled the price of a French government bond as a random walk, in a dissertation that is the start of the mathematical theory of speculative prices. The object that has independent increments in that model is the change in the price, not a variance that is constant inside every decade, and not a two-state filter fitted after the fact. [[#prop-var-rw]] is the elementary variance calculation that sits under a random walk of the level. Clustering, and the matrix $P$, are later descriptions of the ways a return series refuses to be those independent increments. Bachelier's dissertation is not a regime rule, and the stationary distribution $2/3,\ 1/3$ is not a result from 1900.
:::

## Where this leads

Resampling a series that clusters, without tearing the clusters apart, is [[statistics/resampling]]. The lag-1 correlation that clustering deliberately ignores, the signed one, is [[statistics/moments-and-dependence]]. A walk-forward fold that sits inside one regime, and agrees with the next fold only because the regime did not change, is the limitation recorded in [[validation/what-a-fold-does-not-prove]]. The existence and uniqueness of $\pi$, and the convergence of the distribution to $\pi$ when the chain is aperiodic, stay in the Maths Atlas.

:::summary
- Weak stationarity asks for a constant mean, a finite constant variance, and covariances that depend on time only through the lag.
- A random-walk price $P_t = P_0 + \sum_{i=1}^t \varepsilon_i$ has variance $t\sigma^2$. The level is not weakly stationary. The increment can be. A simple return is a further, different series.
- Volatility clustering is positive lag-1 dependence of $\abs{R_t}$ or of $R_t^2$. On the constructed eight-point series the signed correlation is $-0.934199$ and the absolute correlation is $0.75$.
- For $P = \begin{pmatrix} 0.85 & 0.15 \\ 0.30 & 0.70 \end{pmatrix}$ the unique stationary distribution is $(2/3,\ 1/3)$. The mean calm visit lasts $20/3$ steps, and the mean stress visit lasts $10/3$ steps.
- Two steps after stress, the probability of calm is $0.465$, not $2/3$. Stationary mass is a long-run mixture, not a finite-horizon forecast.
- A state label that uses a full-sample median depends on future returns. A regime filter whose threshold was chosen in sample is another searched parameter.
:::

## Exercises

:::exercise Variance at a horizon {#exr-var level=1 check="4"}
Under [[#prop-var-rw]] with $\sigma^2 = 1$, compute $\Var(P_4)$. (Enter the variance.)
:::solution
The proposition gives $\Var(P_t) = t\sigma^2$. At $t = 4$ the variance is $4$. The mean remains $P_0$. The variance is $4$.
:::
:::

:::exercise Stationary mass {#exr-pi level=1 check="2/3"}
For the transition matrix in [[#prop-pi]], what is the stationary probability of calm? (Enter the probability as a fraction.)
:::solution
The balance $0.15\,\pi_{\mathrm{c}} = 0.30\,(1 - \pi_{\mathrm{c}})$ gives $0.45\,\pi_{\mathrm{c}} = 0.30$, so $\pi_{\mathrm{c}} = 2/3$. The stationary probability of calm is $2/3$.
:::
:::

:::exercise Length of a stress visit {#exr-sojourn level=1 check="10/3"}
Starting in stress, the chain stays in stress with probability $0.70$ at each step and leaves with probability $0.30$. What is the expected length of the visit? (Enter the expectation as a fraction.)
:::solution
The visit length is geometric with leaving probability $0.30$, so its expectation is $1/0.30 = 10/3$. The expected length is $10/3$. This is not the stationary probability, and it is not $1/\pi_{\mathrm{s}} = 3$.
:::
:::

:::exercise Two steps from stress {#exr-twostep level=2 check="0.465"}
The chain starts in stress. What is the probability of being calm after two steps? (Enter the probability.)
:::solution
From [[#ex-two-step]], the second row of $P^2$ is $(0.465, 0.535)$. The probability of calm is $0.465$. It is below the stationary mass $2/3$, because two steps are not the long run.
:::
:::

:::exercise Another matrix {#exr-other level=2 check="4/5"}
Let $Q = \begin{pmatrix} 0.9 & 0.1 \\ 0.4 & 0.6 \end{pmatrix}$, with the first state called calm. Find the stationary probability of calm. (Enter it as a fraction.)
:::solution
Flow balance gives $0.1\,\pi_{\mathrm{c}} = 0.4\,(1 - \pi_{\mathrm{c}})$, so $0.1\,\pi_{\mathrm{c}} = 0.4 - 0.4\,\pi_{\mathrm{c}}$ and $0.5\,\pi_{\mathrm{c}} = 0.4$. Hence $\pi_{\mathrm{c}} = 0.8 = 4/5$. The same uniqueness reason as in [[#prop-pi]] applies: every entry is positive. The stationary probability is $4/5$.
:::
:::

:::exercise Absolute correlation {#exr-abs level=2 check="3/4"}
For the absolute values $0.01, 0.01, 0.01, 0.01, 0.05, 0.05, 0.05, 0.05$, the sample lag-1 correlation was computed in [[#ex-cluster]]. Report it as a fraction. (Enter the fraction.)
:::solution
The correlation of these absolute values is $0.75 = 3/4$. Scaling every entry by $100$ would leave the correlation unchanged and would recover the integer series $1, 1, 1, 1, 5, 5, 5, 5$. The correlation is $3/4$.
:::
:::

:::exercise Induction for the random-walk variance {#exr-induct level=3}
Prove $\Var(P_t) = t\sigma^2$ by induction on $t$, under the hypotheses of [[#def-rw]]. You may use $\Var(U + V) = \Var(U) + \Var(V)$ when $U$ and $V$ are uncorrelated, with $U = P_{t-1}$ and $V = \varepsilon_t$.
:::hint
The base case $t = 1$ is the variance of a single increment. The inductive step adds one uncorrelated increment and therefore adds $\sigma^2$, not a covariance.
:::
:::solution
For $t = 1$, $P_1 - P_0 = \varepsilon_1$ and $\Var(P_1) = \sigma^2 = 1 \cdot \sigma^2$. Suppose $\Var(P_{t-1}) = (t-1)\sigma^2$ for some $t \ge 2$. The increment $\varepsilon_t$ is independent of $\varepsilon_1,\ldots,\varepsilon_{t-1}$ and hence uncorrelated with $P_{t-1} = P_0 + \varepsilon_1 + \cdots + \varepsilon_{t-1}$. Therefore

$$
\Var(P_t) = \Var(P_{t-1} + \varepsilon_t) = \Var(P_{t-1}) + \Var(\varepsilon_t) = (t-1)\sigma^2 + \sigma^2 = t\sigma^2.
$$

By induction the formula holds for every $t \ge 1$. The same argument gives $\E[P_t] = P_0$, because each new increment has mean zero. This is [[#prop-var-rw]] written as an induction. It still says nothing about simple returns, which divide by $P_{t-1}$.
:::
:::

:::exercise A median that looks ahead {#exr-med level=3 check="0.025"}
For the absolute returns $0.01, 0.01, 0.04, 0.05$, compute the sample median by averaging the second and third ordered values. Then name one absolute return that the median depends on and that is not available at the first date. (Enter the median.)
:::hint
Order the four numbers before averaging. The later dates are what make the label of the first date a function of the future, as in [[#ex-median]].
:::
:::solution
The ordered values are already $0.01, 0.01, 0.04, 0.05$. The second and third are $0.01$ and $0.04$, and their average is $0.025$. The median depends on $0.04$, which is not among the information available when the first return, $0.01$, is the only observation so far. It also depends on $0.05$. Either later value is enough to make the point. A calm-versus-stress label that thresholds on $0.025$ is not a function of the past at the first date. The median is $0.025$.
:::
:::
