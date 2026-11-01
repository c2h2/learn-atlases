Every map in this course lands in a set of allowed weights. Long-only weights live in a simplex: nothing is short, and the holdings either add to one or add to at most one if cash is allowed. A dollar-neutral book adds to zero and spends a gross budget on the longs and the shorts together. A beta-neutral book drives a weighted sum of betas to zero, which is a different line. With two assets and two different betas, the only vector that is both dollar-neutral and beta-neutral is the zero vector. Gross one then has to choose.

A neutral budget is a feasible set. It is not a market to put on, and raising the gross budget above one magnifies both sides. This chapter does not suggest that.

## The simplex

:::definition Long-only weights {#def-long}
A weight vector $w$ on risky names is **long-only, fully invested** when

$$
w_i \ge 0 \quad\text{for every } i, \qquad \sum_i w_i = 1.
$$

It is **long-only with cash allowed** when $w_i \ge 0$ and $\sum_i w_i \le 1$, the residual $1 - \sum_i w_i$ being cash. The two sets are different. Fully invested refuses a residual. Cash-allowed permits one. This chapter always says which set is in use. Cash in the toys earns simple return $0$, which is a modelling choice, not a cash instrument.
:::

The fully invested set is a simplex. Its extreme points are the single-name books, one weight equal to $1$ and the others $0$. Equal weight is the centre, not an extreme point. A signal map that outputs a vector outside the set has not finished. Something still has to project, clip or reject.

The convention used here is deliberate and elementary. It is not claimed to be the Euclidean projection onto the simplex, which solves a different quadratic problem.

:::definition Clip-and-scale {#def-clip}
Let $z$ be a desired vector. Replace each negative coordinate by $0$ and call the result $z^+$. Let $s = \sum_i z^+_i$. If $s = 0$, the convention returns the zero risky vector.

- Fully invested, and $s > 0$: set $w = z^+/s$. Then $w_i \ge 0$ and $\sum_i w_i = 1$.
- Cash allowed: if $s > 1$, set $w = z^+/s$; if $0 \le s \le 1$, set $w = z^+$. Then $w_i \ge 0$ and $\sum_i w_i \le 1$.

When $s > 1$ the two conventions agree. When $0 < s < 1$ they disagree: full investment scales up, cash-allowed does not.
:::

:::example Full investment against a cash residual {#ex-cash}
The desired risky weights are $(0.2,\ 0.3)$. Form the fully invested long-only vector and the cash-allowed vector under [[#def-clip]]. Both desired coordinates are already non-negative, and they sum to $0.5$.
:::solution
Here $z^+ = z$ and $s = 0.5$, which is strictly between $0$ and $1$.

Fully invested divides by $s$:

$$
w^{\mathrm{full}} = \bigl(0.4,\ 0.6\bigr).
$$

Cash weight $0$. The next-return contribution of these weights is $0.4\,R_1 + 0.6\,R_2$.

Cash-allowed keeps the desired vector, because $s \le 1$:

$$
w^{\mathrm{cash}} = \bigl(0.2,\ 0.3\bigr),
$$

with cash weight $0.5$ earning $0$. The next-return contribution is $0.2\,R_1 + 0.3\,R_2$, which is exactly half of the fully invested contribution whenever cash earns $0$. Scaling up was the entire difference. It is not a view on the two names. A specification that says "long-only" and does not say whether the sum is $1$ or at most $1$ has left this factor free.
:::
:::

:::example A negative coordinate {#ex-clip}
The desired vector is $(-0.2,\ 0.5,\ 0.7)$. Apply [[#def-clip]] for the fully invested set.
:::solution
The negative coordinate becomes $0$. The positive part $(0,\ 0.5,\ 0.7)$ sums to $1.2$. Because $s > 1$, full investment and cash-allowed agree:

$$
w = \bigl(0,\ \tfrac{0.5}{1.2},\ \tfrac{0.7}{1.2}\bigr) = \bigl(0,\ \tfrac{5}{12},\ \tfrac{7}{12}\bigr).
$$

The short that was in the desired vector is not in the book. Gross of the desired vector was $0.2+0.5+0.7 = 1.4$; gross of $w$ is $1$. Those are different exposures. Keeping the $-0.2$ would be dollar-neutral territory, or a long-short map, not this feasible set.
:::
:::

## Net zero is not beta zero

**Dollar-neutral** here means the weights sum to zero. The word "dollar" is conventional. It means one unit of net asset value, not a currency, and it is not a suggestion to hold cash in any particular currency.

:::definition Dollar neutrality and gross {#def-dollar}
A vector $w$ is **dollar-neutral** when $\sum_i w_i = 0$. A **gross budget** $g > 0$ adds $\sum_i \abs{w_i} = g$. For two names and $g = 1$, the solutions are

$$
\bigl(\tfrac12,-\tfrac12\bigr) \qquad\text{and}\qquad \bigl(-\tfrac12,\tfrac12\bigr).
$$

Net is $0$. Gross is $1$. The two vectors are opposite orientations. A budget $g > 1$ multiplies either vector by $g$ and magnifies both the long and the short payoff by $g$, in the zero-rate accounting. That is leverage. This atlas is not suggesting a gross above $1$. The worked numbers use $g = 1$.
:::

Beta neutrality needs a list of betas, one per name, fixed before the weights. A beta may be a regression coefficient of the name's simple return on a stated factor, estimated on a stated window. [[statistics/regression-on-a-signal]] is the regression. This chapter treats the numbers as inputs.

:::definition Beta neutrality {#def-beta}
Given betas $\beta_i$, a vector $w$ is **beta-neutral** when

$$
\sum_i w_i\beta_i = 0.
$$

Dollar neutrality does not imply this, and this does not imply dollar neutrality, unless the betas are all equal.
:::

:::proposition Two constraints, only the zero book {#prop-only-zero}
Let two names have betas $\beta_1 \ne \beta_2$. The only solution of

$$
w_1 + w_2 = 0, \qquad \beta_1 w_1 + \beta_2 w_2 = 0
$$

is $(w_1,w_2) = (0,0)$. In particular there is no dollar-neutral and beta-neutral pair with gross $1$.
:::

:::proof
The coefficient matrix is

$$
\begin{pmatrix} 1 & 1 \\ \beta_1 & \beta_2 \end{pmatrix},
$$

with determinant $\beta_2 - \beta_1 \ne 0$. A square system with non-zero determinant and a zero right-hand side has only the zero solution. Gross of the zero vector is $0$, not $1$. Adding a gross constraint cannot create a new solution of the two linear equations; it only rules the zero vector out. Hence the three requirements together are empty for two names with different betas.

If the betas were equal, the second equation would be $\beta$ times the first, and every dollar-neutral vector would be beta-neutral. Different betas are what make the lines cross only at the origin.
:::

So a two-name book can be dollar-neutral at gross $1$, or beta-neutral at gross $1$, and it cannot be both. The next proposition picks the beta-neutral line and the gross.

:::proposition Beta-neutral at gross one {#prop-beta-gross}
Let $\beta_1 > 0$, $\beta_2 > 0$. The unique solution of

$$
w_1 - w_2 = 1, \qquad \beta_1 w_1 + \beta_2 w_2 = 0
$$

is

$$
w_1 = \frac{\beta_2}{\beta_1+\beta_2}, \qquad w_2 = -\frac{\beta_1}{\beta_1+\beta_2}.
$$

Then $w_1 > 0 > w_2$, the gross is $w_1 - w_2 = 1$, the net is $(\beta_2-\beta_1)/(\beta_1+\beta_2)$, and the beta is $0$. The opposite orientation, $-w$, is the unique solution of $w_2 - w_1 = 1$ together with the same beta equation. It also has gross $1$ and beta $0$, and its net is the negative of the net above.
:::

:::proof
The determinant of $\begin{pmatrix} 1 & -1 \\ \beta_1 & \beta_2 \end{pmatrix}$ is $\beta_1 + \beta_2 > 0$, so there is a unique solution. Substitution of $w_1 = 1 + w_2$ into the beta equation gives

$$
\beta_1(1+w_2) + \beta_2 w_2 = 0, \qquad \beta_1 + (\beta_1+\beta_2)w_2 = 0,
$$

hence $w_2 = -\beta_1/(\beta_1+\beta_2)$ and $w_1 = 1 + w_2 = \beta_2/(\beta_1+\beta_2)$. Gross is $w_1 + \abs{w_2} = w_1 - w_2 = 1$ because $w_2 < 0$. Beta is zero by the second equation. Negating both weights preserves the beta equation, flips the sign of $w_1 - w_2$, and preserves the gross. The same determinant argument gives uniqueness for that flipped orientation.
:::

The equation $w_1 - w_2 = 1$ is the gross budget written as a linear equation, and it is linear only because we have already chosen the signs. The absolute-value constraint $\abs{w_1}+\abs{w_2} = 1$ is two linear pieces, not one. [[#prop-beta-gross]] solves one piece. The dollar-neutral pair in [[#def-dollar]] is the other familiar piece, $w_1 + w_2 = 0$ together with $w_1 - w_2 = 1$.

:::example Dollar-neutral, betas $1.2$ and $0.8$ {#ex-dollar}
Betas are $1.2$ and $0.8$. Take both dollar-neutral orientations at gross $1$. Compute the beta of each book, $\sum_i w_i\beta_i$.
:::solution
The orientations are $(1/2,-1/2)$ and $(-1/2,1/2)$.

$$
\tfrac12\cdot 1.2 + \bigl(-\tfrac12\bigr)\cdot 0.8 = 0.6 - 0.4 = 0.2,
$$

$$
\bigl(-\tfrac12\bigr)\cdot 1.2 + \tfrac12\cdot 0.8 = -0.6 + 0.4 = -0.2.
$$

Net is $0$ and gross is $1$ in both cases, and neither beta is $0$. Dollar neutrality did not hedge the factor. The absolute beta $0.2$ is half the gap between $1.2$ and $0.8$, which is the general two-name pattern $(\beta_1-\beta_2)/2$ for the orientation that is long the first name. The system was checked by solving $w_1+w_2 = 0$, $w_1-w_2 = 1$ in Python: the solution is $(1/2,-1/2)$.
:::
:::

:::example Beta-neutral at gross one {#ex-beta}
The same betas, $1.2$ and $0.8$. Solve $w_1 - w_2 = 1$ and $1.2\,w_1 + 0.8\,w_2 = 0$. Then write the opposite orientation. For each, record net, gross and beta.
:::solution
[[#prop-beta-gross]] with $\beta_1 = 6/5$ and $\beta_2 = 4/5$ gives

$$
w_1 = \frac{4/5}{2} = \frac{2}{5}, \qquad w_2 = -\frac{6/5}{2} = -\frac{3}{5}.
$$

Elimination reaches the same point. Start from the augmented matrix of $w_1 - w_2 = 1$ and $(6/5)w_1 + (4/5)w_2 = 0$:

$$
\begin{pmatrix} 1 & -1 & 1 \\ 6/5 & 4/5 & 0 \end{pmatrix}.
$$

Subtract $(6/5)$ times the first row from the second. The second row becomes $(0,\ 2,\ -6/5)$, because $4/5 - (6/5)(-1) = 2$ and $0 - 6/5 = -6/5$. Hence $w_2 = (-6/5)/2 = -3/5$, and $w_1 = 1 + w_2 = 2/5$. Python's solution of the same $2\times 2$ system agrees.

Net is $2/5 - 3/5 = -1/5 = -0.2$. Gross is $2/5+3/5 = 1$. Beta is

$$
\tfrac25\cdot 1.2 + \bigl(-\tfrac35\bigr)\cdot 0.8 = 0.48 - 0.48 = 0.
$$

The opposite orientation is $(-2/5,\ 3/5)$. Net is $+0.2$, gross is $1$, beta is $0$.

Compare [[#ex-dollar]]. Dollar neutrality at gross $1$ left a beta of $\pm 0.2$ and a net of $0$. Beta neutrality at gross $1$ leaves a beta of $0$ and a net of $\pm 0.2$. The four vectors are four different books. [[#prop-only-zero]] says there is no fifth vector that collects net $0$, beta $0$ and gross $1$ from this pair of betas.
:::
:::

The four books are easy to confuse because several of the summary numbers are $0$, $1$ or $0.2$. One period of returns separates them. Let the next simple returns be $0.05$ on the first name and $0.01$ on the second. Cash, where a long-only residual uses it, earns $0$. Nothing here is a preferred book.

- Dollar-neutral, long the first name, $(1/2,-1/2)$: portfolio return $\tfrac12\cdot 0.05 + (-\tfrac12)\cdot 0.01 = 0.025 - 0.005 = 0.020$. Beta of the book is $0.2$, net is $0$.
- Dollar-neutral, the other way, $(-1/2,1/2)$: the same arithmetic with the signs flipped, so the portfolio return is $-0.020$.
- Beta-neutral, $(2/5,-3/5)$: $\tfrac25\cdot 0.05 + (-\tfrac35)\cdot 0.01 = 0.020 - 0.006 = 0.014$. Beta of the book is $0$, net is $-0.2$.
- The opposite beta-neutral book returns $-0.014$.
- A fully invested long-only book that simply holds $(1/2,1/2)$, which is legal for [[#def-long]] and is not one of the neutral solutions, returns $\tfrac12\cdot 0.05 + \tfrac12\cdot 0.01 = 0.030$. Its beta is $\tfrac12\cdot 1.2 + \tfrac12\cdot 0.8 = 1.0$, and its net is $1$.

Five legal vectors, five portfolio returns: $0.020$, $-0.020$, $0.014$, $-0.014$ and $0.030$. The signals were not even in this list. The feasible set and the orientation were enough to change the sign and the size. That is the sense in which a constraint can dominate a signal: the signal may have chosen a direction, and the feasible set may have thrown the direction out, as [[#ex-clip]] did with the coordinate $-0.2$.

Gross above $1$ is the same mechanism as a volatility-target scale above $1$. Doubling $(1/2,-1/2)$ to $(1,-1)$ doubles the portfolio return in the zero-rate accounting, from $0.020$ to $0.040$ on these next returns, and it doubles a loss of the same pattern from $-0.020$ to $-0.040$. Both sides move. The gross budget is doing the magnifying, not a new opinion about the names. The examples in this chapter keep gross equal to $1$ and do not suggest the doubled book. A financing cost on the short, or on borrowed cash, would change the doubled number again; the specification would have to say so, and this paragraph does not supply that cost.

A beta used as an input is only as stable as the regression that produced it. A different window, or a different factor, produces a different $\beta$ and therefore a different solution of [[#prop-beta-gross]]. Two researchers who both write "beta-neutral, gross one" and bring different betas are not running the same constraint. The $1.2$ and $0.8$ in [[#ex-beta]] are chosen so the arithmetic closes. They are not estimated betas of any named security, and they are not a suggestion to hedge one name with the other.

The widget row-reduces the beta-neutral system. The bar splits the right-hand side. Stepping through it ends at $2/5$ and $-3/5$.

:::widget rowreduce
matrix: 1,-1,1; 6/5,4/5,0
caption: The system $w_1 - w_2 = 1$, $(6/5)w_1 + (4/5)w_2 = 0$, for betas $1.2$ and $0.8$ with the orientation that is long the higher beta. Reduction ends at $w_1 = 2/5$, $w_2 = -3/5$. This is the linear algebra of a constraint, not a hedge to put on.
:::

:::warning Dollar-neutral is not beta-neutral
The slip is to hear "market neutral", check that the weights sum to zero, and stop. In [[#ex-dollar]] the weights $(1/2,-1/2)$ sum to zero and still have beta $0.2$ when the betas are $1.2$ and $0.8$. The book's beta is $0.2$, long the factor, not zero. A reader who wanted $\sum w_i\beta_i = 0$ has not got it. The converse slip is to call $(-0.2)$ of net "flat" because the beta is zero. Net and beta are different linear functionals. [[#prop-only-zero]] is the reason one number cannot do both jobs for two names.
:::

:::intuition Gross is the size, net is the tilt
On $(2/5,-3/5)$ the gross is $1$ and the net is $-1/5$. Gross is the absolute exposure the budget spent. Net says the short is larger than the long, by one fifth of net asset value. That imbalance is what unequal betas require if the weighted beta is to vanish: the higher beta, $1.2$, is held at absolute weight $2/5$, and the lower beta, $0.8$, is held at absolute weight $3/5$. The ratio of those absolute weights is $(3/5)/(2/5) = 3/2$, which is $\beta_1/\beta_2$. It is a hedge ratio inside a constraint. It is not a forecast that the second name will fall.
:::

:::application Where a pairs book sits
A pairs rule in [[reversion/pairs-and-spreads]] is one way a gross budget and a net near zero appear together: long one name, short another, often with a hedge ratio estimated from prices. This chapter does not estimate that ratio and does not quote a pairs backtest. It only names the feasible set the weights have to land in. Dollar neutrality is the net constraint. Beta neutrality is available when the two betas are inputs instead of, or as well as, a regression hedge. [[#prop-only-zero]] says that if the betas differ, imposing both constraints at once on two names leaves only the zero book. A pairs specification that claims both should be read carefully: either one constraint is soft, or there are more than two names, or the betas are equal.
:::

:::history
Sharpe's 1964 capital-asset-pricing model supplied a single-factor beta: the slope of an asset's excess return on the market's excess return, under the assumptions of that paper. A beta-neutral constraint sets the weighted sum of such betas to zero. The model is a constraint one may impose on a weight vector. It is not a description one has to believe in full, and it is not a recommendation of the market portfolio. Qian, Hua and Sorensen, in their 2007 book on quantitative equity portfolio management, develop the same constraint language — long-only sets, risk models, budgets — at the level a specification needs. Naming that book is not an endorsement of a portfolio in it.
:::

:::quiz
Betas are $1.2$ and $0.8$, weights are $(1/2,-1/2)$. Which statement is true?
- [ ] The book is beta-neutral, because the weights sum to $0$.
- [x] The book is dollar-neutral with gross $1$, and its beta is $0.2$, not $0$.
- [ ] The book is long-only, because the first weight is positive.
- [ ] The gross is $0$, because the weights cancel.
:::solution
Net is $1/2-1/2 = 0$, so the book is dollar-neutral. Gross is $1/2+1/2 = 1$. Beta is $0.5\times 1.2 - 0.5\times 0.8 = 0.2$. The second weight is negative, so the book is not long-only. Cancellation affects the net, not the gross.
:::
:::

:::quiz
Why is there no two-name book with these betas that is dollar-neutral, beta-neutral and gross $1$ at the same time?
- [ ] Because gross $1$ is larger than both betas.
- [ ] Because $1.2$ and $0.8$ are both positive, and beta neutrality needs a negative beta somewhere in the input list.
- [x] Because the two linear constraints have only the zero solution when the betas differ, and the zero solution has gross $0$.
- [ ] Because the simplex does not contain shorts.
:::solution
[[#prop-only-zero]]: the determinant $\beta_2-\beta_1 = -0.4$ is not zero, so the kernel is trivial. Gross $1$ then excludes the only linear solution. Beta neutrality alone is possible, at weights $(2/5,-3/5)$ and the opposite. Dollar neutrality alone is possible, at $(1/2,-1/2)$ and the opposite. The inputs do not need to contain a negative beta; the weights carry the minus signs.
:::
:::

## Where this leads

[[asset-classes/market-neutral-books]] takes these feasible sets into particular instruments, where a gross budget meets contract sizes and borrow constraints this chapter has ignored. The weights that enter the simplex or the neutral line still have to come from a map: [[portfolio/from-signal-to-weight]] for the signal, [[portfolio/risk-parity]] if the map equalises variance contributions before the constraints bind. A cap, a band or a breaker can then cut the vector again; those cuts are [[portfolio/drift-turnover-and-breakers]], and they do not care whether the pre-trade vector was neutral.

:::summary
- Long-only, fully invested: weights non-negative and summing to $1$. Long-only with cash allowed: non-negative and summing to at most $1$. The residual earns $0$ only because the toy says so.
- Desired $(0.2,0.3)$ becomes $(0.4,0.6)$ if the sum must be $1$, and stays $(0.2,0.3)$ with cash $0.5$ if a residual is allowed.
- Clip-and-scale sends $(-0.2,0.5,0.7)$ to $(0,5/12,7/12)$. The desired short is not in the long-only book.
- Dollar-neutral means the weights sum to $0$. At gross $1$ the two-name solutions are $(\pm 1/2,\mp 1/2)$. With betas $1.2$ and $0.8$ those books have beta $\pm 0.2$.
- Beta-neutral means $\sum w_i\beta_i = 0$. At gross $1$, long the higher beta, the solution is $(2/5,-3/5)$. Net is $-1/5$, beta is $0$. The opposite orientation is $(-2/5,3/5)$.
- If the two betas differ, dollar-neutral and beta-neutral together force the zero vector. Gross $1$ is then impossible.
- A gross budget above $1$ multiplies both sides. The examples keep gross $1$ and do not suggest leverage.
:::

## Exercises

:::exercise Net of a dollar-neutral pair {level=1 check="0"}
Weights are $(1/2,-1/2)$. What is the net exposure? (Enter a number.)
:::solution
$1/2 + (-1/2) = 0$. The book is dollar-neutral. The gross is not $0$.
:::
:::

:::exercise Gross of the same pair {level=1 check="1"}
Weights are $(1/2,-1/2)$. What is the gross exposure? (Enter a number.)
:::solution
$\abs{1/2}+\abs{-1/2} = 1$. Net is $0$ and gross is $1$. The two summaries do not contradict.
:::
:::

:::exercise Beta of the dollar-neutral book {level=1 check="0.2"}
Weights $(1/2,-1/2)$, betas $1.2$ and $0.8$. What is $\sum_i w_i\beta_i$? (Enter a decimal.)
:::solution
$0.5\times 1.2 + (-0.5)\times 0.8 = 0.6 - 0.4 = 0.2$. Dollar-neutral does not mean beta-neutral for these betas.
:::
:::

:::exercise The short in the beta-neutral solution {level=2 check="-3/5"}
Betas $1.2$ and $0.8$. Solve $w_1 - w_2 = 1$ and $1.2 w_1 + 0.8 w_2 = 0$. What is $w_2$? (Enter a fraction.)
:::solution
[[#prop-beta-gross]] gives $w_2 = -\beta_1/(\beta_1+\beta_2) = -1.2/2 = -3/5$. Then $w_1 = 2/5$. Gross is $1$, net is $-1/5$, beta is $0$.
:::
:::

:::exercise Cash left on the table {level=2 check="0.5"}
Desired risky weights are $(0.2,0.3)$, both positive. The feasible set is long-only with cash allowed, using [[#def-clip]], and the desired sum is already below $1$. What is the cash weight? (Enter a decimal.)
:::solution
The positive sum is $0.5 \le 1$, so the risky weights stay $(0.2,0.3)$ and the cash weight is $1-0.5 = 0.5$. The fully invested convention would have scaled to $(0.4,0.6)$ instead. Cash earns $0$ in this toy, so the portfolio simple return is half of the fully invested one.
:::
:::

:::exercise After clipping {level=2 check="7/12"}
Desired weights are $(-0.2,0.5,0.7)$. Clip negatives to $0$ and rescale the rest to sum to $1$. What is the weight on the third name? (Enter a fraction.)
:::solution
The positive part sums to $1.2$. The third weight is $0.7/1.2 = 7/12$. The second is $5/12$, and the first is $0$.
:::
:::

:::exercise A different pair of betas {level=3 check="1/4"}
Betas are $1.5$ and $0.5$. Solve $w_1 - w_2 = 1$ and $1.5 w_1 + 0.5 w_2 = 0$. What is $w_1$? (Enter a fraction.)
:::hint
Either use $w_1 = \beta_2/(\beta_1+\beta_2)$ from [[#prop-beta-gross]], or substitute $w_2 = w_1 - 1$ into the beta equation. Both betas are positive, so the gross of the solution is $1$ automatically.
:::
:::solution
$w_1 = 0.5/(1.5+0.5) = 0.5/2 = 1/4$. Then $w_2 = -1.5/2 = -3/4$. Check the orientation: $1/4 - (-3/4) = 1$. Check the beta: $1.5\times(1/4) + 0.5\times(-3/4) = 0.375 - 0.375 = 0$. Gross is $1$ and net is $1/4-3/4 = -1/2$. The same warning as in the chapter applies: this is a feasible point of a linear system, not a hedge to put on.
:::
:::

:::exercise Only the origin {level=3 check="-0.4"}
Betas $1.2$ and $0.8$. What is the determinant of the dollar-neutral and beta-neutral system, $\det\begin{pmatrix} 1 & 1 \\ 1.2 & 0.8 \end{pmatrix}$? (Enter a decimal.)
:::hint
The determinant of $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$ is $ad-bc$. Here that is $1\times 0.8 - 1\times 1.2$. A non-zero determinant means only the zero vector satisfies both equations.
:::
:::solution
$1\times 0.8 - 1\times 1.2 = 0.8 - 1.2 = -0.4$. The determinant is not zero, so [[#prop-only-zero]] applies: the only common solution is $(0,0)$, whose gross is $0$. There is no gross-$1$ book that is both dollar-neutral and beta-neutral for these two betas. The sign of the determinant depends on row order; the absolute value $0.4$ is $\abs{\beta_1-\beta_2}$.
:::
:::
