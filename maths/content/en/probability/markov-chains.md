In a simple model of the weather, each day is either sunny or rainy. A sunny day is followed by another sunny day with probability $0.9$, and a rainy day is followed by another rainy day with probability $0.5$. Today it is raining. What is the chance of sun in three days' time? And over a long period, what fraction of days are sunny? The answers are $0.78$ and $\tfrac56$, and the second does not depend on today's weather at all: the influence of the starting state fades away geometrically fast.

This is a **Markov chain**: a random process in which the future depends on the past only through the present. Markov chains are the simplest models of random evolution in time, and they are everywhere: queues, genetics, card shuffling, board games, the ranking of web pages, speech recognition, and the Markov chain Monte Carlo algorithms that power modern Bayesian statistics. This chapter develops the basic theory for chains with finitely or countably many states: transition matrices and their powers, absorption probabilities by first-step analysis, the classification of states, stationary distributions, and the convergence theorem, which explains why the long-run behaviour forgets the starting point. Linear algebra, especially eigenvalues ([[linear-algebra/eigenvalues]]), is a constant companion.

## The Markov property {#markov-property}

::: definition Markov chain {#def-markov-chain}
Let $S$ be a finite or countable set, the **state space**. A sequence of random variables $X_0, X_1, X_2,\ldots$ with values in $S$ is a (time-homogeneous) **Markov chain** with **transition matrix** $P = (p_{ij})_{i,j\in S}$ if

$$
\Prob(X_{n+1} = j\mid X_n = i,\ X_{n-1} = i_{n-1},\ \ldots,\ X_0 = i_0) = p_{ij}
$$ {#eq-markov-property}

for all $n\ge0$ and all states $i_0,\ldots,i_{n-1},i,j$ for which the conditioning event has positive probability. The distribution of $X_0$ is the **initial distribution**.
:::

The defining equation says two things. First, the **Markov property**: given the present state $X_n = i$, the past states $X_0,\ldots,X_{n-1}$ carry no further information about the next state. Second, **time-homogeneity**: the transition probabilities $p_{ij}$ do not depend on $n$. Each row of $P$ is a probability distribution (the distribution of the next state from $i$), so

$$
p_{ij}\ge0,\qquad\sum_{j\in S}p_{ij} = 1\quad\text{for every } i .
$$

A matrix with these properties is called **stochastic**. A chain is conveniently drawn as a **transition diagram**: a directed graph with an arrow $i\to j$ labelled $p_{ij}$ whenever $p_{ij}>0$.

Some standard examples:

- **Weather.** $S = \{\text{sunny},\text{rainy}\}$ and $P = \begin{pmatrix}0.9 & 0.1\\ 0.5 & 0.5\end{pmatrix}$.
- **Gambler's ruin.** A gambler with $\pounds i$ bets $\pounds1$ at a time, winning with probability $p$ and losing with probability $q = 1-p$, until reaching $\pounds0$ or a target $\pounds N$. Then $S = \{0,1,\ldots,N\}$, $p_{i,i+1} = p$ and $p_{i,i-1} = q$ for $0<i<N$, and $p_{00} = p_{NN} = 1$: the states $0$ and $N$ are **absorbing**.
- **Random walk on a graph.** From a vertex of a connected graph, move to a neighbour chosen uniformly at random: $p_{vw} = 1/\deg(v)$ if $vw$ is an edge ([[discrete/graphs]]).
- **Simple random walk on $\Z$.** $p_{i,i+1} = p$ and $p_{i,i-1} = q$ for every integer $i$: an infinite state space.

The transition matrix and the initial distribution determine everything about the chain.

::: proposition Path probabilities {#prop-paths}
If $(X_n)$ is a Markov chain with initial distribution $\lambda$ and transition matrix $P$, then for all states $i_0,\ldots,i_n$

$$
\Prob(X_0 = i_0, X_1 = i_1, \ldots, X_n = i_n) = \lambda_{i_0}\,p_{i_0i_1}\,p_{i_1i_2}\cdots p_{i_{n-1}i_n}.
$$
:::

::: proof
By the multiplication rule ([[probability/conditional-probability#thm-chain-rule]]) the left-hand side is

$$
\Prob(X_0 = i_0)\,\Prob(X_1 = i_1\mid X_0 = i_0)\cdots\Prob(X_n = i_n\mid X_{n-1} = i_{n-1},\ldots,X_0 = i_0),
$$

and by the Markov property each factor after the first is a transition probability $p_{i_{k-1}i_k}$. (If some conditioning event has probability zero, both sides are zero.)
:::

::: quiz
Which of these matrices is the transition matrix of a Markov chain on two states?
- [ ] $\begin{pmatrix}0.5 & 0.5\\ 0.5 & 0.6\end{pmatrix}$
- [x] $\begin{pmatrix}0 & 1\\ 1 & 0\end{pmatrix}$
- [ ] $\begin{pmatrix}0.3 & 0.7\\ 0.7 & 0.4\end{pmatrix}$
- [ ] $\begin{pmatrix}0.2 & 0.8\\ -0.1 & 1.1\end{pmatrix}$
::: solution
A transition matrix needs non-negative entries and rows summing to $1$. Only the second qualifies: it describes a chain that alternates deterministically between the two states. The first and third have a row summing to $1.1$, and the fourth has a negative entry (columns need not sum to $1$).
:::
:::

::: warning The Markov property is not independence
Successive states of a Markov chain are usually strongly dependent: tomorrow's weather depends on today's. The Markov property says something weaker and more useful — that the future is *conditionally* independent of the past *given the present*. Knowing that it rained two days ago does change the probability of rain tomorrow if you do not know today's weather; it is only once today's weather is known that the older information becomes irrelevant. Whether a real process has this property depends on what is included in the state: a model of weather in which the state is just "sunny" or "rainy" may fail it, while a richer state (the last two days' weather, say) may restore it.
:::

## Multi-step transitions {#n-step}

Write $p_{ij}^{(n)} = \Prob(X_{m+n} = j\mid X_m = i)$ for the probability of going from $i$ to $j$ in $n$ steps. (By time-homogeneity it does not depend on $m$, as the next theorem shows.)

::: theorem Chapman–Kolmogorov equations {#thm-chapman-kolmogorov}
The $n$-step transition probabilities are the entries of the matrix power $P^n$:

$$
p_{ij}^{(n)} = (P^n)_{ij},\qquad\text{and hence}\qquad p_{ij}^{(m+n)} = \sum_{k\in S}p_{ik}^{(m)}p_{kj}^{(n)}.
$$

Consequently, if $\mu^{(n)}$ denotes the distribution of $X_n$, written as a row vector, then $\mu^{(n)} = \mu^{(0)}P^n$.
:::

::: proof
Induction on $n$; the case $n = 1$ is the definition. Suppose $\Prob(X_{m+n} = k\mid X_m = i) = (P^n)_{ik}$ for all $m$, $i$, $k$. Partition according to the state at time $m+n$ and use the law of total probability for the conditional probability measure $\Prob(\,\cdot\mid X_m = i)$:

$$
\Prob(X_{m+n+1} = j\mid X_m = i) = \sum_k\Prob(X_{m+n} = k\mid X_m = i)\,\Prob(X_{m+n+1} = j\mid X_{m+n} = k, X_m = i).
$$

By the Markov property the last factor is $p_{kj}$, so the sum is $\sum_k(P^n)_{ik}p_{kj} = (P^{n+1})_{ij}$. The identity $P^{m+n} = P^mP^n$ gives the second formula, and $\mu^{(n)}_j = \sum_i\Prob(X_0 = i)p_{ij}^{(n)}$ by the law of total probability.
:::

So computing with a Markov chain is matrix multiplication, and the long-run behaviour is governed by the powers $P^n$ — which brings in eigenvalues.

::: example The two-state chain {#ex-two-state}
For $P = \begin{pmatrix}1-a & a\\ b & 1-b\end{pmatrix}$ with $0<a+b<2$, find $P^n$ and its limit. Apply the result to the weather chain.
::: solution
The rows sum to $1$, so $P\mathbf{1} = \mathbf{1}$ and $1$ is an eigenvalue. The trace is $2-a-b$, so the other eigenvalue is $\lambda = 1-a-b$, and $\lvert\lambda\rvert<1$. Diagonalising $P$ ([[linear-algebra/eigenvalues]]), or checking the formula by induction, gives

$$
P^n = \frac{1}{a+b}\begin{pmatrix}b & a\\ b & a\end{pmatrix} + \frac{\lambda^n}{a+b}\begin{pmatrix}a & -a\\ -b & b\end{pmatrix}.
$$

As $n\to\infty$, $\lambda^n\to0$, so both rows of $P^n$ converge to $\bigl(\frac{b}{a+b},\frac{a}{a+b}\bigr)$: whatever the starting state, the chain is eventually in state $1$ with probability $\frac{b}{a+b}$, and the convergence is geometric at rate $\lvert\lambda\rvert^n$. For the weather chain, $a = 0.1$, $b = 0.5$ and $\lambda = 0.4$, so the limit is $\bigl(\tfrac56,\tfrac16\bigr)$, and starting from rain,

$$
\Prob(\text{sunny in 3 days}\mid\text{rainy today}) = p_{21}^{(3)} = \frac56 - 0.4^3\cdot\frac{5}{6} = \frac56(1 - 0.064) = 0.78 .
$$
:::
:::

::: widget markov
matrix: 0.9,0.1; 0.5,0.5
states: Sunny; Rainy
start: 1
steps: 20
caption: The weather chain, started on a rainy day. The bars show the distribution of $X_n$, which approaches the stationary distribution $(\tfrac56,\tfrac16)$ within a few steps — the gap shrinks by the factor $0.4$ each day. The simulated walk below shows a single realisation: long sunny spells broken by short rainy ones. Change the start and see that the limit is the same.
:::

## Absorption probabilities: the gambler's ruin {#gamblers-ruin}

For chains with absorbing states the natural questions are: where is the chain absorbed, and how long does it take? The key technique is **first-step analysis**, already used in [[probability/expectation]]: condition on the first step and use the Markov property to restart.

::: theorem Gambler's ruin {#thm-gamblers-ruin}
In the gambler's ruin chain with $0<p<1$, let $h_i$ be the probability, starting from $i$, of reaching $N$ before $0$, and let $r = q/p$. Then

$$
h_i = \begin{cases}\dfrac{1 - r^i}{1-r^N}, & p\ne\tfrac12,\\[2ex] \dfrac iN, & p = \tfrac12.\end{cases}
$$ {#eq-ruin}
:::

::: proof
Clearly $h_0 = 0$ and $h_N = 1$. For $0<i<N$, condition on the first bet: with probability $p$ the chain moves to $i+1$ and, by the Markov property, then reaches $N$ before $0$ with probability $h_{i+1}$; similarly for a loss. By the law of total probability,

$$
h_i = p\,h_{i+1} + q\,h_{i-1},\qquad 0<i<N .
$$

Since $p + q = 1$ this can be rewritten as $p(h_{i+1} - h_i) = q(h_i - h_{i-1})$, so the differences $d_i = h_i - h_{i-1}$ satisfy $d_{i+1} = r\,d_i$, whence $d_i = r^{i-1}d_1$ and

$$
h_i = d_1 + d_2 + \dots + d_i = d_1(1 + r + \dots + r^{i-1}).
$$

The condition $h_N = 1$ determines $d_1 = 1/(1 + r + \dots + r^{N-1})$. Summing the geometric series gives $h_i = (1 - r^i)/(1 - r^N)$ when $r\ne1$, and $h_i = i/N$ when $r = 1$, that is $p = \tfrac12$. (The equations determine $h$ uniquely, since $h_0$ and $d_1$ fix every $h_i$.)
:::

The same argument with the roles of $0$ and $N$ exchanged shows that the probability of ruin is $1 - h_i$ — so the game ends with probability $1$; the gambler cannot play for ever.

::: example Playing roulette {#ex-roulette}
A gambler with £10 bets £1 at a time on red at European roulette (win probability $\tfrac{18}{37}$) until doubling the money or losing it all. Find the probability of reaching £20, and compare with a fair game.
::: solution
Here $p = \tfrac{18}{37}$, $r = q/p = \tfrac{19}{18}$, $i = 10$, $N = 20$:

$$
h_{10} = \frac{1 - (19/18)^{10}}{1 - (19/18)^{20}} = \frac{1}{1 + (19/18)^{10}}\approx0.368 .
$$

(The simplification uses $1 - x^2 = (1-x)(1+x)$ with $x = (19/18)^{10}$.) In a fair game the answer would be $\tfrac12$. The house edge per bet is under $3\%$, but over the long sequence of bets needed — about $98$ on average — it accumulates into a substantial disadvantage. Bold play, staking everything on a single spin, would succeed with probability $\tfrac{18}{37}\approx0.486$: against an unfavourable game, the fewer bets the better.
:::
:::

## Classification of states {#classification}

To describe long-run behaviour we first need to know which states can reach which.

::: definition Communication and irreducibility {#def-communicate}
State $j$ is **accessible** from $i$, written $i\to j$, if $p_{ij}^{(n)}>0$ for some $n\ge0$. States $i$ and $j$ **communicate**, $i\leftrightarrow j$, if $i\to j$ and $j\to i$. Communication is an equivalence relation ([[proofs/relations]]), and its equivalence classes are the **communicating classes**. A class $C$ is **closed** if the chain cannot leave it ($i\in C$ and $i\to j$ imply $j\in C$). The chain is **irreducible** if there is only one class, that is, every state can reach every other.
:::

In the gambler's ruin chain, $\{0\}$ and $\{N\}$ are closed classes and $\{1,\ldots,N-1\}$ is a class that is not closed. The weather chain and random walks on connected graphs are irreducible.

The next distinction is between states the chain keeps returning to and states it eventually abandons. Let $T_i = \min\{n\ge1 : X_n = i\}$ be the first return time to $i$ (with $T_i = \infty$ if there is no return).

::: definition Recurrence and transience {#def-recurrent}
State $i$ is **recurrent** if $f_i = \Prob(T_i<\infty\mid X_0 = i) = 1$, and **transient** if $f_i<1$.
:::

::: theorem Recurrence criterion {#thm-recurrence}
State $i$ is recurrent if and only if $\displaystyle\sum_{n=1}^\infty p_{ii}^{(n)} = \infty$.
:::

::: proof
Start the chain at $i$ and let $V$ be the number of visits to $i$ at times $n\ge1$. Writing $V$ as a sum of indicators, $V = \sum_{n\ge1}\mathbf{1}_{\{X_n = i\}}$, linearity of expectation (for non-negative terms, also for infinite sums) gives

$$
\E V = \sum_{n=1}^\infty p_{ii}^{(n)}.
$$

On the other hand, each time the chain returns to $i$ it starts afresh, by the Markov property applied at the (random) return time — the **strong Markov property**, which we use without proof (see Norris, *Markov Chains*, Section 1.4). So each return is followed by another with probability $f_i$, independently of the past, and $\Prob(V\ge k) = f_i^k$. If $f_i<1$, then $\E V = \sum_{k\ge1}\Prob(V\ge k) = \frac{f_i}{1-f_i}<\infty$. If $f_i = 1$, then $\Prob(V\ge k) = 1$ for every $k$, so $V = \infty$ with probability $1$ and $\E V = \infty$.
:::

Recurrence is a **class property**: if $i$ is recurrent and $i\leftrightarrow j$ then $j$ is recurrent (choose $a$, $b$ with $p_{ji}^{(a)}>0$ and $p_{ij}^{(b)}>0$; then $p_{jj}^{(a+n+b)}\ge p_{ji}^{(a)}p_{ii}^{(n)}p_{ij}^{(b)}$, so $\sum_np_{jj}^{(n)} = \infty$ too). In a *finite* chain not all states can be transient — the chain spends infinitely much time somewhere, and a transient state is visited only finitely often — so **every state of a finite irreducible chain is recurrent**.

::: example Simple random walk on the integers {#ex-random-walk}
For the simple random walk on $\Z$, show that state $0$ is recurrent if $p = \tfrac12$ and transient otherwise.
::: solution
A return to $0$ is possible only after an even number of steps, with as many steps up as down: $p_{00}^{(2n)} = \binom{2n}{n}p^nq^n$. Stirling's formula gives $\binom{2n}{n}\sim\frac{4^n}{\sqrt{\pi n}}$, so

$$
p_{00}^{(2n)}\sim\frac{(4pq)^n}{\sqrt{\pi n}}.
$$

If $p = \tfrac12$ then $4pq = 1$ and the terms behave like $1/\sqrt{\pi n}$, whose sum diverges ([[calculus-2/convergence-tests]]): the walk is recurrent. If $p\ne\tfrac12$ then $4pq<1$, the terms decay geometrically, the sum converges and the walk is transient — it drifts off to $\pm\infty$. George Pólya proved in 1921 that the symmetric random walk on the lattice $\Z^d$ is recurrent for $d = 1, 2$ and transient for $d\ge3$: a random walker on a plane grid is certain to return home, but one moving in three-dimensional space may wander off for ever.
:::
:::

Finally, some chains move in cycles. The **period** of a state $i$ is $d(i) = \gcd\{n\ge1 : p_{ii}^{(n)}>0\}$, and $i$ is **aperiodic** if $d(i) = 1$. Period is also a class property (see the exercises). The chain with $P = \begin{pmatrix}0&1\\1&0\end{pmatrix}$ has period $2$, as does any random walk on a bipartite graph; a single state with $p_{ii}>0$ makes an irreducible chain aperiodic.

## Stationary distributions {#stationary}

If the distribution of $X_n$ settles down, the limit $\pi$ must be unchanged by one more step: $\pi = \pi P$.

::: definition Stationary distribution {#def-stationary}
A probability distribution $\pi = (\pi_j)_{j\in S}$ is **stationary** (or **invariant**, or an **equilibrium**) for $P$ if

$$
\pi P = \pi,\qquad\text{that is}\qquad\sum_{i\in S}\pi_ip_{ij} = \pi_j\ \text{ for every } j .
$$ {#eq-stationary}
:::

If $X_0$ has distribution $\pi$, then so does every $X_n$, since $\pi P^n = \pi$. In linear-algebra terms, $\pi$ is a left eigenvector of $P$ with eigenvalue $1$, normalised to be a probability vector. Equation [[#eq-stationary]] is a **balance equation**: in equilibrium, the probability flowing into $j$ in one step equals the probability of being at $j$.

::: warning Left eigenvectors, not right ones
Because distributions are written as *row* vectors, the stationary condition $\pi P = \pi$ says that $\pi$ is a **left** eigenvector of $P$, equivalently an ordinary eigenvector of the transpose $P\T$. A common slip is to solve $P\mathbf v = \mathbf v$ instead: for every stochastic matrix this has the useless solution $\mathbf v = (1,\ldots,1)\T$, since each row sums to $1$. Remember too that $\pi$ must be normalised so that its entries add up to $1$, and that software which uses the column convention will ask for the transpose of the matrix written here.
:::

::: theorem Existence and uniqueness {#thm-stationary-unique}
A finite irreducible Markov chain has a unique stationary distribution $\pi$. Moreover $\pi_j>0$ for every $j$, and $\pi_j = 1/m_j$, where $m_j = \E(T_j\mid X_0 = j)$ is the mean return time to $j$.
:::

::: proof
*Sketch.* Existence: start from any distribution $\mu$ and form the averages $a_n = \frac1n\sum_{k=0}^{n-1}\mu P^k$. Then $a_nP - a_n = \frac1n(\mu P^n - \mu)$, whose entries are at most $\frac2n$ in absolute value. The $a_n$ lie in the set of probability vectors, which is closed and bounded in $\R^{\lvert S\rvert}$, so a subsequence converges to some probability vector $\pi$ ([[real-analysis/metric-spaces]]), and passing to the limit gives $\pi P = \pi$. Positivity: some $\pi_i>0$; given $j$, irreducibility gives $n$ with $p_{ij}^{(n)}>0$, and then $\pi_j = \sum_k\pi_kp_{kj}^{(n)}\ge\pi_ip_{ij}^{(n)}>0$. Uniqueness and the formula $\pi_j = 1/m_j$ follow from the ergodic theorem below (the long-run fraction of time spent at $j$ equals both $\pi_j$ and $1/m_j$); a complete proof is in Norris, *Markov Chains*, Theorem 1.7.7. Alternatively, uniqueness is part of the Perron–Frobenius theorem for non-negative matrices.
:::

Solving [[#eq-stationary]] is a linear-algebra problem: $\lvert S\rvert$ equations, one of which is redundant, together with $\sum_j\pi_j = 1$.

::: example Switching networks {#ex-networks}
Each month a mobile phone customer stays with or switches between networks A, B, C according to

$$
P = \begin{pmatrix}0.8 & 0.1 & 0.1\\ 0.2 & 0.7 & 0.1\\ 0.1 & 0.2 & 0.7\end{pmatrix}.
$$

Find the long-run market shares.
::: solution
The equations $\pi P = \pi$ read

$$
\begin{aligned}
0.8\pi_A + 0.2\pi_B + 0.1\pi_C &= \pi_A,\\
0.1\pi_A + 0.7\pi_B + 0.2\pi_C &= \pi_B,\\
0.1\pi_A + 0.1\pi_B + 0.7\pi_C &= \pi_C .
\end{aligned}
$$

The third gives $0.3\pi_C = 0.1(\pi_A + \pi_B)$, so $\pi_A + \pi_B = 3\pi_C$; with $\pi_A + \pi_B + \pi_C = 1$ this gives $\pi_C = \tfrac14$. The first gives $0.2\pi_A = 0.2\pi_B + 0.1\pi_C$, so $\pi_A - \pi_B = \tfrac18$, and with $\pi_A + \pi_B = \tfrac34$ we get $\pi_A = \tfrac{7}{16}$, $\pi_B = \tfrac{5}{16}$. So in the long run the shares are $43.75\%$, $31.25\%$ and $25\%$, and the mean return time to C is $1/\pi_C = 4$ months: starting from C, the expected number of months until the chain is next in C is $4$ (a customer who stays with C counts as returning after one month).
:::
:::

::: widget markov
matrix: 0.8,0.1,0.1; 0.2,0.7,0.1; 0.1,0.2,0.7
states: A; B; C
start: 2
steps: 30
caption: The network-switching chain started with a customer on C. The distribution of $X_n$ converges to $(\tfrac{7}{16},\tfrac{5}{16},\tfrac14)$, more slowly than the weather chain because customers are "sticky" (large diagonal entries mean eigenvalues closer to $1$). In the simulated path, count how often each state is visited: the proportions approach the same numbers.
:::

Often a stationary distribution can be found without solving the full system, thanks to a stronger, local form of balance.

::: theorem Detailed balance {#thm-detailed-balance}
If a probability distribution $\pi$ satisfies $\pi_ip_{ij} = \pi_jp_{ji}$ for all states $i$, $j$, then $\pi$ is stationary. (The chain is then called **reversible**.)
:::

::: proof
For each $j$, $\sum_i\pi_ip_{ij} = \sum_i\pi_jp_{ji} = \pi_j\sum_ip_{ji} = \pi_j$, since the row $j$ of $P$ sums to $1$.
:::

Detailed balance says that in equilibrium the flow from $i$ to $j$ equals the flow from $j$ to $i$ for every pair, which is stronger than [[#eq-stationary]], where only the total flow into each state must balance.

::: example Random walk on a graph {#ex-graph-walk}
For the random walk on a connected graph with $m$ edges, show that $\pi_v = \deg(v)/(2m)$ is stationary.
::: solution
The $\pi_v$ are positive and sum to $1$, because the degrees sum to $2m$ (each edge has two ends). If $vw$ is an edge,

$$
\pi_vp_{vw} = \frac{\deg(v)}{2m}\cdot\frac{1}{\deg(v)} = \frac{1}{2m} = \pi_wp_{wv},
$$

and if $vw$ is not an edge both sides are $0$. So detailed balance holds, and $\pi$ is stationary by [[#thm-detailed-balance]]. A walker spends time at each vertex in proportion to its degree; the mean return time to $v$ is $2m/\deg(v)$. For a knight moving at random on a chessboard, this gives the expected return time to a corner as $336/2 = 168$ moves (the board has $168$ knight-move edges, and a corner has degree $2$).
:::
:::

::: quiz
For the chain $P = \begin{pmatrix}0&1\\1&0\end{pmatrix}$ started in state $1$, which statement is true?
- [ ] There is no stationary distribution.
- [ ] $\Prob(X_n = 1)\to\tfrac12$.
- [x] $(\tfrac12,\tfrac12)$ is stationary, but $\Prob(X_n = 1)$ alternates between $1$ and $0$.
- [ ] The stationary distribution is $(1, 0)$, because the chain starts in state $1$.
::: solution
$(\tfrac12,\tfrac12)P = (\tfrac12,\tfrac12)$, so it is stationary (and unique, since the chain is irreducible). But the chain has period $2$: it is in state $1$ at even times and state $2$ at odd times, so the distribution of $X_n$ does not converge. The stationary distribution still gives the long-run *fraction of time* spent in each state. Convergence of the distribution needs aperiodicity, as the next theorem shows.
:::
:::

## Convergence to equilibrium {#convergence}

::: theorem Convergence theorem {#thm-convergence}
Let $P$ be the transition matrix of a finite, irreducible and aperiodic Markov chain, with stationary distribution $\pi$. Then for all states $i$, $j$,

$$
p_{ij}^{(n)}\to\pi_j\qquad(n\to\infty).
$$

Hence for every initial distribution, $\Prob(X_n = j)\to\pi_j$.
:::

::: proof
*Sketch, by coupling.* We use two facts. (a) Because the chain is finite, irreducible and aperiodic, there is $n_0$ such that $p_{ij}^{(n)}>0$ for *all* $i$, $j$ and all $n\ge n_0$. (This is a number-theoretic lemma: the set of $n$ with $p_{ii}^{(n)}>0$ is closed under addition and has greatest common divisor $1$, so it contains all large integers; irreducibility then connects any $i$ to any $j$.) (b) A finite irreducible chain reaches any given state in finite time with probability $1$ (by recurrence).

Run two independent copies of the chain: $(X_n)$ started at $i$ and $(Y_n)$ started from $\pi$, so that $\Prob(Y_n = j) = \pi_j$ for all $n$. The pair $(X_n, Y_n)$ is a Markov chain on $S\times S$ with transition probabilities $p_{ik}p_{jl}$, and by (a) its $n$-step transition probabilities $p_{ik}^{(n)}p_{jl}^{(n)}$ are all positive for $n\ge n_0$, so it is irreducible. By (b), the pair reaches the diagonal $\{(k,k)\}$ at some finite random time $T$. Now let $Z_n = X_n$ for $n<T$ and $Z_n = Y_n$ for $n\ge T$: after the two copies meet, follow $Y$. By the strong Markov property, $(Z_n)$ is again a Markov chain with transition matrix $P$ started at $i$, so $\Prob(Z_n = j) = p_{ij}^{(n)}$. But $Z_n = Y_n$ whenever $T\le n$, so

$$
\bigl\lvert p_{ij}^{(n)} - \pi_j\bigr\rvert = \bigl\lvert\Prob(Z_n = j) - \Prob(Y_n = j)\bigr\rvert\le\Prob(Z_n\ne Y_n)\le\Prob(T>n)\to0.
$$
:::

All three hypotheses matter: the flip chain shows that aperiodicity is needed, and a reducible chain such as the gambler's ruin has limits that depend on the starting state. For finite chains the convergence is geometric, at a rate governed by the second-largest eigenvalue modulus of $P$, as in [[#ex-two-state]].

Even without aperiodicity, stationary probabilities describe long-run *averages*. This is the Markov-chain version of the law of large numbers ([[probability/limit-theorems]]).

::: theorem Ergodic theorem {#thm-ergodic}
For a finite irreducible Markov chain with stationary distribution $\pi$, and any initial distribution, the fraction of the times $0,1,\ldots,n-1$ spent in state $j$ converges to $\pi_j = 1/m_j$ with probability $1$.
:::

::: proof
*Sketch.* By the strong Markov property, the lengths of successive excursions away from $j$ (the times between consecutive visits) are iid with mean $m_j$. By the strong law of large numbers, the time of the $k$-th visit is about $km_j$ for large $k$, so in time $n$ there are about $n/m_j$ visits. The full proof (Norris, Theorem 1.10.2) makes this precise; combined with the convergence theorem or a direct argument, it identifies the limit $1/m_j$ with $\pi_j$.
:::

::: application PageRank
Google's original ranking of web pages modelled a "random surfer" who, at each step, follows a random link from the current page with probability $d = 0.85$ and otherwise jumps to a page chosen uniformly at random. The jumps make the chain irreducible and aperiodic, so the convergence theorem applies, and a page's **PageRank** is its stationary probability: the long-run fraction of time the surfer spends there. For four pages with links $A\to B$, $A\to C$, $B\to C$, $C\to A$ and $D\to C$, the stationary distribution is approximately $(0.373, 0.196, 0.394, 0.0375)$: page C, linked to by three pages, ranks highest, and page D, which no page links to, gets only the minimum $(1-d)/4 = 0.0375$. In practice $\pi$ is computed for billions of pages by repeated multiplication $\mu\mapsto\mu P$, the **power method** of [[numerical-analysis/iterative-methods]], whose convergence is exactly the convergence theorem.
:::

::: widget markov
matrix: 0.0375,0.4625,0.4625,0.0375; 0.0375,0.0375,0.8875,0.0375; 0.8875,0.0375,0.0375,0.0375; 0.0375,0.0375,0.8875,0.0375
states: A; B; C; D
start: 3
steps: 30
caption: The random-surfer chain for the four-page web described above, with damping $0.85$. Starting from page D, the distribution converges to the PageRank vector $(0.373, 0.196, 0.394, 0.0375)$ in a handful of steps. Try other starting pages: the limit is always the same, as the convergence theorem promises.
:::

::: application Markov chain Monte Carlo
The convergence theorem can be run in reverse. To sample from a complicated distribution $\pi$ — for instance a posterior distribution in [[statistics/bayesian#thm-bayes-density]] — construct a chain whose stationary distribution is $\pi$, run it for a long time, and record its states. The **Metropolis algorithm** does this using detailed balance: from state $i$, propose a move to $j$ (by a symmetric rule) and accept it with probability $\min(1,\pi_j/\pi_i)$. Only *ratios* of the $\pi_j$ are needed, so the normalising constant of $\pi$, often impossible to compute, never appears.
:::

::: history
Andrey Markov introduced the chains that bear his name in 1906, in a paper extending the law of large numbers to dependent random variables. Part of his motivation was to refute a claim of Pavel Nekrasov that independence is necessary for the law of large numbers to hold. In 1913 Markov applied his theory to language, classifying the first $20\,000$ letters of Pushkin's verse novel *Eugene Onegin* as vowels and consonants and estimating the transition probabilities between them. Paul and Tatiana Ehrenfest proposed their urn model of diffusion in 1907, George Pólya proved his recurrence theorem for random walks in 1921, and Andrey Kolmogorov developed the theory of chains with countably many states in the 1930s. Wolfgang Doeblin introduced the coupling argument for the convergence theorem in 1938. The Metropolis algorithm was published by Nicholas Metropolis and his colleagues in 1953 and generalised by W. K. Hastings in 1970, and Sergey Brin and Lawrence Page described PageRank in 1998.
:::

## Where this leads {#where-next}

Markov chains in continuous time, with exponential holding times, model queues, chemical reactions and epidemics, and lead to the Poisson process and birth–death processes (Grimmett and Stirzaker, Chapter 6). Markov chain Monte Carlo is the computational backbone of [[statistics/bayesian]]. Random walks connect with harmonic functions and the discrete version of [[pde/laplace-equation]], and the gambler's ruin is the simplest example of a martingale, the subject of a more advanced course. The spectral theory of stochastic matrices ([[linear-algebra/eigenvalues]], [[linear-algebra/spectral-theorem]] for reversible chains) determines how quickly a chain mixes, which matters for card shuffling and for the efficiency of MCMC.

::: summary
- A Markov chain forgets its past given its present: transitions are governed by a stochastic matrix $P$, and path probabilities are products of transition probabilities.
- $n$-step transition probabilities are the entries of $P^n$, and the distribution evolves as $\mu^{(n)} = \mu^{(0)}P^n$.
- First-step analysis turns absorption probabilities and expected hitting times into linear equations; for the gambler's ruin, $h_i = (1-r^i)/(1-r^N)$ with $r = q/p$.
- States split into communicating classes; a state is recurrent if the chain returns with probability $1$, equivalently $\sum_np_{ii}^{(n)} = \infty$; all states of a finite irreducible chain are recurrent.
- A stationary distribution solves $\pi P = \pi$; a finite irreducible chain has exactly one, with $\pi_j = 1/m_j$. Detailed balance $\pi_ip_{ij} = \pi_jp_{ji}$ is a quick sufficient condition.
- If the chain is also aperiodic, $P^n$ converges to the matrix with every row $\pi$: the chain forgets where it started. Without aperiodicity, $\pi$ still gives long-run time fractions.
- Applications include PageRank (stationary distribution of a random surfer) and MCMC (designing a chain with a prescribed stationary distribution).
:::

## Exercises

::: exercise Two days ahead {level=1 check="0.86"}
For the weather chain, find the probability that it is sunny two days after a sunny day.
::: solution
$p_{11}^{(2)} = p_{11}p_{11} + p_{12}p_{21} = 0.9\times0.9 + 0.1\times0.5 = 0.86$.
:::
:::

::: exercise A stationary distribution {level=1 check="2/5"}
Find the stationary distribution of $P = \begin{pmatrix}0.7 & 0.3\\ 0.2 & 0.8\end{pmatrix}$; enter $\pi_1$.
::: solution
By [[#ex-two-state]] with $a = 0.3$, $b = 0.2$: $\pi = \bigl(\frac{0.2}{0.5},\frac{0.3}{0.5}\bigr) = (0.4, 0.6)$. Check: $0.4\times0.7 + 0.6\times0.2 = 0.4$.
:::
:::

::: exercise Classifying states {level=1}
A chain on $\{1,2,3,4\}$ has transition matrix with rows $(\tfrac12,\tfrac12,0,0)$, $(\tfrac12,\tfrac12,0,0)$, $(\tfrac14,\tfrac14,\tfrac14,\tfrac14)$ and $(0,0,0,1)$. Find the communicating classes and say which are closed and which states are recurrent.
::: solution
States $1$ and $2$ communicate and cannot reach $3$ or $4$: $\{1,2\}$ is a closed class. State $4$ is absorbing: $\{4\}$ is closed. State $3$ can reach every state, but no other state can reach it, so $\{3\}$ is a class that is not closed. From $3$ the chain leaves with probability $\tfrac34$ at each step and never returns, so $3$ is transient ($f_3 = \tfrac14$). The states $1$, $2$, $4$ lie in finite closed classes and are recurrent.
:::
:::

::: exercise A fair game's duration {level=2 check="21"}
In a fair gambler's ruin ($p = \tfrac12$) starting with £3 and target £10, find the probability of reaching £10 and the expected number of bets.
::: hint
For the duration $D_i$, first-step analysis gives $D_i = 1 + \tfrac12D_{i+1} + \tfrac12D_{i-1}$ with $D_0 = D_N = 0$; try $D_i = i(N-i)$.
:::
::: solution
By [[#thm-gamblers-ruin]], $h_3 = 3/10$. For the duration, $D_i = i(N-i)$ satisfies the boundary conditions and

$$
1 + \tfrac12(i+1)(N-i-1) + \tfrac12(i-1)(N-i+1) = 1 + i(N-i) - 1 = i(N-i),
$$

and (as for $h$) the equations have only one solution. So the expected number of bets is $3\times7 = 21$.
:::
:::

::: exercise Mean return time on a graph {level=2 check="8"}
A random walk moves on the graph with vertices $A, B, C, D$ and edges $AB$, $AC$, $AD$, $BC$. Find the stationary distribution and the mean return time to $D$.
::: solution
The degrees are $3, 2, 2, 1$ and there are $m = 4$ edges, so by [[#ex-graph-walk]] $\pi = (\tfrac38,\tfrac28,\tfrac28,\tfrac18)$. By [[#thm-stationary-unique]], the mean return time to $D$ is $1/\pi_D = 8$ steps. (Directly: from $D$ the walk must go to $A$, and from $A$ it returns to $D$ with probability $\tfrac13$ at each visit; the excursions through $B$ and $C$ take time.)
:::
:::

::: exercise The Land of Oz {level=2 check="1/5"}
In the Land of Oz (an example of Kemeny, Snell and Thompson) the weather is rain, nice or snow, with transition matrix rows $(\tfrac12,\tfrac14,\tfrac14)$, $(\tfrac12,0,\tfrac12)$, $(\tfrac14,\tfrac14,\tfrac12)$. Find the long-run proportion of nice days.
::: solution
Solve $\pi P = \pi$ with $\pi = (\pi_R,\pi_N,\pi_S)$. The middle column gives $\pi_N = \tfrac14\pi_R + \tfrac14\pi_S = \tfrac14(1-\pi_N)$, so $\pi_N = \tfrac15$. The first column gives $\pi_R = \tfrac12\pi_R + \tfrac12\pi_N + \tfrac14\pi_S$; with $\pi_S = \tfrac45 - \pi_R$ this yields $\pi_R = \tfrac25$ and then $\pi_S = \tfrac25$. So $\pi = (\tfrac25,\tfrac15,\tfrac25)$: one day in five is nice. The chain is aperiodic ($p_{RR}>0$), so this is also the limiting probability of a nice day.
:::
:::

::: exercise Doubly stochastic matrices {level=3}
A stochastic matrix is **doubly stochastic** if its columns also sum to $1$. Prove that for a doubly stochastic matrix on $n$ states the uniform distribution $(\tfrac1n,\ldots,\tfrac1n)$ is stationary. Deduce that a random shuffling method that is a finite irreducible aperiodic chain on the $52!$ orderings, with each step's transition matrix doubly stochastic, makes all orderings equally likely in the limit.
::: solution
With $\pi_i = \tfrac1n$, $(\pi P)_j = \sum_i\tfrac1np_{ij} = \tfrac1n\sum_ip_{ij} = \tfrac1n$, since column $j$ sums to $1$. So the uniform distribution is stationary. For the shuffling chain, by [[#thm-stationary-unique]] the stationary distribution is unique, so it is the uniform distribution on the $52!$ orderings, and by [[#thm-convergence]] the distribution of the deck converges to it. (Shuffles of the form "apply a random permutation chosen from a fixed distribution" are always doubly stochastic, because each ordering is reached from exactly one ordering by each permutation.)
:::
:::

::: exercise Period is a class property {level=3}
Prove that if $i\leftrightarrow j$ then $d(i) = d(j)$.
::: solution
Choose $a$, $b$ with $p_{ij}^{(a)}>0$ and $p_{ji}^{(b)}>0$. Then $p_{ii}^{(a+b)}\ge p_{ij}^{(a)}p_{ji}^{(b)}>0$, so $d(i)$ divides $a+b$. If $p_{jj}^{(n)}>0$, then $p_{ii}^{(a+n+b)}\ge p_{ij}^{(a)}p_{jj}^{(n)}p_{ji}^{(b)}>0$, so $d(i)$ divides $a+n+b$, hence divides $n$. Thus $d(i)$ is a common divisor of all $n$ with $p_{jj}^{(n)}>0$, so $d(i)\le d(j)$ (indeed $d(i)\mid d(j)$). By symmetry $d(j)\le d(i)$, so they are equal.
:::
:::

::: exercise An unfavourable game {level=3 check="(1-(11/9)^10)/(1-(11/9)^20)"}
A gambler wins each £1 bet with probability $0.45$. Starting with £10, find the probability of reaching £20 before going broke.
::: solution
Here $r = 0.55/0.45 = \tfrac{11}{9}$, so by [[#eq-ruin]]

$$
h_{10} = \frac{1 - (11/9)^{10}}{1 - (11/9)^{20}} = \frac{1}{1 + (11/9)^{10}}\approx0.118 .
$$

A modest disadvantage per bet ($45\%$ against $50\%$) reduces the chance of doubling the stake from $\tfrac12$ to under $12\%$.
:::
:::

::: exercise Absorption in a finite chain {level=3}
Consider a chain with states $0, 1, 2, 3$, where $0$ and $3$ are absorbing and, from $1$ and $2$, the chain moves one step up with probability $\tfrac23$ and one step down with probability $\tfrac13$. Set up and solve the first-step equations for the expected time $k_i$ until absorption, starting from $i = 1, 2$.
::: solution
First-step analysis gives $k_0 = k_3 = 0$ and

$$
k_1 = 1 + \tfrac23k_2 + \tfrac13k_0 = 1 + \tfrac23k_2,\qquad k_2 = 1 + \tfrac23k_3 + \tfrac13k_1 = 1 + \tfrac13k_1 .
$$

Substituting the second into the first: $k_1 = 1 + \tfrac23 + \tfrac29k_1$, so $\tfrac79k_1 = \tfrac53$ and $k_1 = \tfrac{15}{7}$; then $k_2 = 1 + \tfrac57 = \tfrac{12}{7}$. Starting from $1$, absorption takes on average $\tfrac{15}{7}\approx2.14$ steps.
:::
:::
