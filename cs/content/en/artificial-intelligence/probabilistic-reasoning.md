Your car will not start. The battery might be flat, or the tank might be empty — or both, or neither, if the starter motor has failed. The fuel gauge reads empty, which suggests the tank, but a flat battery can also make the gauge read empty. The headlights are bright, which tells against the battery. A logical agent ([[artificial-intelligence/logical-agents]]) can only say which explanations are *possible*; a mechanic weighs them, and the weights shift with every observation. This chapter is about agents that reason with **degrees of belief**: probabilities.

Probability theory gives the rules — the product rule, Bayes' rule, marginalisation — and these are taught in [Maths Atlas: conditional probability](/learn/maths/lesson.php?c=probability&l=conditional-probability). The AI problem is one of scale. A full joint distribution over $n$ Boolean variables needs $2^n - 1$ numbers, which is impossible to specify, store or sum for more than a few dozen variables. **Bayesian networks** solve this by exploiting **conditional independence**: each variable depends directly on only a few others, and the joint distribution factorises into small tables. We define Bayesian networks, read independences off their graphs with **d-separation**, compute posterior probabilities exactly by **variable elimination** (and prove that no method can do so efficiently in general), approximate them by **sampling**, and finally add time: **hidden Markov models** and the **forward algorithm**, which maintains an agent's belief about a changing world from a stream of noisy observations.

## Bayesian networks

We work with discrete **random variables** $X_1, \dots, X_n$, written in capitals, with values in lower case; $\Prob(X)$ denotes the distribution of $X$ (a table), $\Prob(x)$ the probability of a value. Recall the two facts that everything below rests on:
$$
\Prob(x_1, \dots, x_n) = \prod_{i=1}^n \Prob(x_i \mid x_1, \dots, x_{i-1}) \quad\text{(chain rule)}, \qquad \Prob(x \mid e) = \frac{\Prob(x, e)}{\Prob(e)} = \alpha\, \Prob(x, e),
$$ {#eq-chain-rule}
where $\alpha = 1/\Prob(e)$ is a **normalising constant**: we compute $\Prob(x, e)$ for every $x$ and rescale to sum to $1$. Variables $X$ and $Y$ are **conditionally independent** given $Z$, written $X \perp Y \mid Z$, if $\Prob(x \mid y, z) = \Prob(x \mid z)$ whenever $\Prob(y, z) > 0$; equivalently $\Prob(x, y \mid z) = \Prob(x \mid z)\Prob(y \mid z)$.

::: definition Bayesian network {#def-bayes-net}
A **Bayesian network** consists of a directed acyclic graph whose vertices are random variables $X_1, \dots, X_n$, and for each $X_i$ a **conditional probability table** (CPT) $\theta(x_i \mid \mathrm{pa}_i)$ giving a distribution over $X_i$ for each combination of values $\mathrm{pa}_i$ of its parents $\mathrm{Pa}(X_i)$. It defines the joint distribution
$$
\Prob(x_1, \dots, x_n) = \prod_{i=1}^n \theta(x_i \mid \mathrm{pa}_i).
$$ {#eq-bn-factorisation}
:::

::: theorem The network defines a distribution with the given conditionals {#thm-bn-semantics}
The product [[#eq-bn-factorisation]] is a probability distribution, and in it $\Prob(x_i \mid \mathrm{pa}_i) = \theta(x_i \mid \mathrm{pa}_i)$ for every $i$ (whenever $\Prob(\mathrm{pa}_i) > 0$). Moreover, each variable is conditionally independent of its non-descendants given its parents (the **local Markov property**).
:::

::: proof
Number the variables in a topological order, so that parents come before children. *Sums to one.* Summing the product over $x_n$ first: $X_n$ appears in only one factor, $\theta(x_n \mid \mathrm{pa}_n)$, since it is nobody's parent, and $\sum_{x_n} \theta(x_n \mid \mathrm{pa}_n) = 1$. What remains is the product for $X_1, \dots, X_{n-1}$; repeating, the total is $1$. The same argument shows that for each $k$ the marginal of $X_1, \dots, X_k$ is $\Prob(x_1, \dots, x_k) = \prod_{i \le k} \theta(x_i \mid \mathrm{pa}_i)$. *Conditionals.* Then $\Prob(x_k \mid x_1, \dots, x_{k-1}) = \Prob(x_1, \dots, x_k)/\Prob(x_1, \dots, x_{k-1}) = \theta(x_k \mid \mathrm{pa}_k)$, which depends on the earlier variables only through the parents. So $X_k$ is independent of its predecessors given its parents, and summing over the non-parent predecessors gives $\Prob(x_k \mid \mathrm{pa}_k) = \theta(x_k \mid \mathrm{pa}_k)$. *Local Markov property.* For a given $X_k$, choose the topological order so that all non-descendants of $X_k$ come before it (possible: the non-descendants together with $X_k$'s ancestors form a set closed under taking parents). The previous step then shows that $X_k$ is independent of all its predecessors — which include all its non-descendants — given its parents.
:::

The economy is large. If every variable has at most $k$ parents, the network needs at most $n \cdot 2^k$ numbers for Boolean variables, against $2^n - 1$ for the full joint distribution. The modelling is also easier: a CPT is a local, often causal, statement — how likely the gauge is to read empty given the state of the battery and the tank — which an expert can estimate or which can be learned from data.

::: example A diagnostic network {#ex-car-network}
Model the car with Boolean variables $B$ (battery flat), $F$ (tank empty), $L$ (lights dim), $G$ (gauge reads empty) and $S$ (car starts), with arcs $B \to L$, $B \to G$, $F \to G$, $B \to S$, $F \to S$. Choose CPTs and compute, by summing the joint distribution, the probability that the battery is flat given that the car does not start, and how that changes with further evidence.
::: solution
The CPTs give the probability that each variable is true: $\Prob(B) = 0.05$, $\Prob(F) = 0.10$, $\Prob(L \mid B) = 0.90$, $\Prob(L \mid \lnot B) = 0.05$, and

| $B$ | $F$ | $\Prob(G \mid B, F)$ | $\Prob(S \mid B, F)$ |
|---|---|---|---|
| T | T | $0.95$ | $0.00$ |
| T | F | $0.80$ | $0.02$ |
| F | T | $0.95$ | $0.01$ |
| F | F | $0.02$ | $0.97$ |

That is $1 + 1 + 2 + 4 + 4 = 12$ numbers instead of $2^5 - 1 = 31$. Inference by enumeration sums the product [[#eq-bn-factorisation]] over all worlds consistent with the evidence:

```python
from itertools import product

parents = {"B": [], "F": [], "L": ["B"], "G": ["B", "F"], "S": ["B", "F"]}
cpt = {"B": {(): 0.05}, "F": {(): 0.10},
       "L": {(True,): 0.90, (False,): 0.05},
       "G": {(True, True): 0.95, (True, False): 0.80, (False, True): 0.95, (False, False): 0.02},
       "S": {(True, True): 0.00, (True, False): 0.02, (False, True): 0.01, (False, False): 0.97}}
order = ["B", "F", "L", "G", "S"]            # a topological order

def p(var, value, world):
    pt = cpt[var][tuple(world[u] for u in parents[var])]
    return pt if value else 1 - pt

def joint(world):                            # the chain rule for Bayesian networks
    prob = 1.0
    for v in order: prob *= p(v, world[v], world)
    return prob

def enumerate_ask(query, evidence):
    """P(query | evidence) by summing the joint over all worlds."""
    dist = {}
    for vals in product([True, False], repeat=len(order)):
        w = dict(zip(order, vals))
        if all(w[e] == x for e, x in evidence.items()):
            dist[w[query]] = dist.get(w[query], 0) + joint(w)
    z = sum(dist.values())
    return {k: round(v / z, 4) for k, v in dist.items()}
```

```console
$ python3 bn.py
P(B)                  {True: 0.05, False: 0.95}
P(B | S=F)            {True: 0.2909, False: 0.7091}
P(F | S=F)            {True: 0.5868, False: 0.4132}
P(B | S=F, F=T)       {True: 0.0505, False: 0.9495}
P(B | S=F, G=T)       {True: 0.3082, False: 0.6918}
P(F | S=F, G=T)       {True: 0.7244, False: 0.2756}
P(B | S=F, G=T, L=F)  {True: 0.0448, False: 0.9552}
```

A car that will not start raises the probability of a flat battery from $5\%$ to $29\%$ and of an empty tank from $10\%$ to $59\%$. If we then learn that the tank *is* empty, the battery falls back to $5\%$: the empty tank fully **explains away** the failure to start. The gauge reading empty raises both hypotheses, since both can cause it, and bright lights ($L$ false) all but rule out the battery ($4.5\%$). Each line is a different question answered from the same model — the point of a declarative representation.
:::
:::

::: widget bayes
mode: test
prevalence: 0.05
sensitivity: 0.9
specificity: 0.95
caption: Bayes' rule for a single cause and a single symptom, as natural frequencies. Read "prevalence" as $\Prob(B) = 0.05$ (battery flat), "sensitivity" as $\Prob(L \mid B) = 0.9$ (dim lights when flat) and "specificity" as $\Prob(\lnot L \mid \lnot B) = 0.95$. Of the cars with dim lights, what fraction have a flat battery? Move the prevalence down and watch the posterior collapse even though the "test" is good — the base-rate effect that every diagnostic agent must respect.
:::

## Independence from the graph: d-separation

The local Markov property says what the graph implies about each variable and its non-descendants. Which other independences hold? **d-separation** answers this from the graph alone, by examining the paths between variables. Every path is built of three kinds of connection at an intermediate vertex $M$:

- a **chain** $X \to M \to Y$ (or $X \leftarrow M \leftarrow Y$): information flows through $M$ unless $M$ is observed — learning the battery is flat makes the lights' state irrelevant to what the battery tells us about starting;
- a **fork** $X \leftarrow M \to Y$ (common cause): $X$ and $Y$ are correlated through $M$ unless $M$ is observed — dim lights and a non-starting car are correlated, but not once we know the battery's state;
- a **collider** $X \to M \leftarrow Y$ (common effect): $X$ and $Y$ are independent unless $M$ *or one of its descendants* is observed — the battery and the tank are independent, but once we know the car does not start, evidence against one is evidence for the other (explaining away).

::: definition d-separation {#def-dsep}
A path between $X$ and $Y$ (ignoring arc directions) is **blocked** by a set $Z$ of variables if it contains an intermediate vertex $M$ such that either $M$ is a chain or fork vertex on the path and $M \in Z$, or $M$ is a collider on the path and neither $M$ nor any descendant of $M$ is in $Z$. Sets $X$ and $Y$ are **d-separated** by $Z$ if every path between a vertex of $X$ and a vertex of $Y$ is blocked by $Z$.
:::

::: theorem d-separation is sound and (generically) complete {#thm-dsep}
*(Verma and Pearl, 1988; Geiger and Pearl, 1990; Meek, 1995.)* If $X$ and $Y$ are d-separated by $Z$ in a DAG, then $X \perp Y \mid Z$ in every distribution that factorises according to the DAG. Conversely, if they are not d-separated, then there is a distribution factorising according to the DAG in which $X \not\perp Y \mid Z$ — indeed, the dependence holds for all CPT values except a set of measure zero.
:::

We state this without proof. An equivalent and easily programmed test (Lauritzen and colleagues, 1990): $X$ and $Y$ are d-separated by $Z$ if and only if $Z$ separates $X$ from $Y$ in the **moralised ancestral graph** — take the subgraph induced by $X \cup Y \cup Z$ and their ancestors, join ("marry") every two parents of a common child, drop the directions, and ask whether every path from $X$ to $Y$ passes through $Z$.

::: example Reading independences {#ex-dsep}
In the car network, decide: (a) $B \perp F$; (b) $B \perp F \mid S$; (c) $L \perp F$; (d) $L \perp F \mid S$; (e) $L \perp G \mid B$; (f) $G \perp S \mid \{B, F\}$; (g) $G \perp S$.
::: solution
```python
def d_separated(parents, X, Y, Z):
    """True iff X and Y are d-separated by Z: test separation in the moralised ancestral graph."""
    relevant, stack = set(), list(X | Y | Z)
    while stack:                                  # 1. ancestors of X, Y and Z (inclusive)
        v = stack.pop()
        if v not in relevant:
            relevant.add(v); stack.extend(parents[v])
    nbrs = {v: set() for v in relevant}           # 2. moralise: link co-parents, drop directions
    for v in relevant:
        ps = parents[v]
        for u in ps:
            nbrs[u].add(v); nbrs[v].add(u)
        for i, u in enumerate(ps):
            for w in ps[i + 1:]:
                nbrs[u].add(w); nbrs[w].add(u)
    seen, stack = set(X), list(X)                 # 3. can X reach Y without passing through Z?
    while stack:
        v = stack.pop()
        for w in nbrs[v] - Z:
            if w in Y: return False
            if w not in seen: seen.add(w); stack.append(w)
    return True
```

```console
$ python3 dsep.py
B _|_ F | {}: True
B _|_ F | {S}: False
L _|_ F | {}: True
L _|_ F | {S}: False
L _|_ G | {B}: True
G _|_ S | {B,F}: True
G _|_ S | {}: False
```

By hand: (a) the paths $B \to G \leftarrow F$ and $B \to S \leftarrow F$ both have unobserved colliders: blocked, independent. (b) Observing the collider $S$ opens $B \to S \leftarrow F$: dependent — this is the explaining away of [[#ex-car-network]], where $\Prob(B \mid \lnot S) = 0.29$ but $\Prob(B \mid \lnot S, F) = 0.05$. (c) Every path from $L$ to $F$ goes through $B$ and then a collider ($G$ or $S$): blocked. (d) With $S$ observed, the path $L \leftarrow B \to S \leftarrow F$ is open: $B$ is an unobserved fork, which lets information pass, and the collider $S$ is observed, which opens it. Dependent. (e) All paths from $L$ start $L \leftarrow B$, and $B$ is an observed chain or fork vertex: blocked. (f) Paths from $G$ to $S$ pass through $B$ or $F$ as forks, both observed: blocked. (g) With nothing observed, the fork $G \leftarrow B \to S$ is open: dependent.
:::
:::

::: quiz
In the network $A \to C \leftarrow B$, $C \to D$, which statements are true in every distribution that factorises according to the graph?

- [x] $A \perp B$
- [ ] $A \perp B \mid D$
- [x] $A \perp D \mid C$
- [ ] $A \perp D$
::: solution
$A \perp B$: the only path has the unobserved collider $C$ (with unobserved descendant $D$), so it is blocked. Given $D$, a descendant of the collider is observed, which opens the path: not independent in general. $A \perp D \mid C$: the only path $A \to C \to D$ is a chain through the observed $C$: blocked. $A \perp D$ fails: the chain $A \to C \to D$ is open when $C$ is unobserved.
:::
:::

## Exact inference

The basic inference task is to compute the **posterior** $\Prob(X \mid e)$ of a query variable $X$ given **evidence** $e$ (observed values of some variables $E$), summing out the **hidden** variables $Y$:
$$
\Prob(X \mid e) = \alpha \sum_{y} \prod_{i=1}^n \theta(x_i \mid \mathrm{pa}_i), \qquad \text{with } X = x,\; E = e,\; Y = y \text{ in each term}.
$$ {#eq-inference}
Enumeration evaluates this sum term by term in $O(n \cdot 2^{\lvert Y\rvert})$ time for Boolean variables. But the sum has structure: each factor involves only a few variables, so we can push sums inwards past the factors that do not depend on them, as in $\sum_y \sum_z f(x, y) g(y, z) = \sum_y f(x, y) \sum_z g(y, z)$. Doing this systematically, and storing intermediate results, is **variable elimination**.

::: definition Factors {#def-factor}
A **factor** $f$ over a set of variables $\mathrm{vars}(f)$ is a table assigning a non-negative number to each combination of their values. The **product** $f \cdot g$ is the factor over $\mathrm{vars}(f) \cup \mathrm{vars}(g)$ with $(f \cdot g)(u) = f(u_f)\, g(u_g)$, where $u_f$, $u_g$ are the restrictions of $u$. **Summing out** $Y$ from $f$ gives the factor $\sum_y f$ over $\mathrm{vars}(f) \setminus \{Y\}$. Each CPT, with the evidence variables fixed at their observed values, is a factor.
:::

::: algorithm Variable elimination {#alg-ve}
Given the factors of the network (CPTs restricted to the evidence) and an **elimination order** of the hidden variables:
1. For each hidden variable $Y$ in order: remove from the list all factors that mention $Y$, multiply them together, sum out $Y$, and put the resulting factor back.
2. Multiply the remaining factors (they mention only the query variable) and normalise.
:::

Correctness is the distributive law: multiplication distributes over addition, so summing out $Y$ from the product of only those factors that mention it, and multiplying the result by the others, gives the same function as summing out $Y$ from the product of all factors. By induction over the order, the final factor is $\Prob(X, e)$ up to the order of operations, and normalising gives [[#eq-inference]].

::: example Variable elimination on the car network {#ex-ve}
Compute $\Prob(B \mid \lnot S, G)$ by variable elimination with the order $L, F$, and count the table operations.
::: solution
The factors after fixing $S = \text{false}$ and $G = \text{true}$ are $\theta(B)$, $\theta(F)$, $\theta(L \mid B)$, $f_G(B, F) = \theta(G \mid B, F)$ and $f_S(B, F) = \theta(\lnot S \mid B, F)$. Eliminate $L$: the only factor mentioning it is $\theta(L \mid B)$, and $\sum_\ell \theta(\ell \mid B) = 1$ — a factor that is identically $1$. (Every variable that is not an ancestor of the query or the evidence sums to $1$ like this and can be pruned before inference.) Eliminate $F$: multiply $\theta(F)$, $f_G(B, F)$, $f_S(B, F)$ into a factor over $\{B, F\}$ and sum out $F$, leaving a factor $h(B)$. Finally multiply by $\theta(B)$ and normalise:
$$
h(B) = \sum_f \theta(f)\, \theta(G \mid B, f)\, \theta(\lnot S \mid B, f).
$$
For $B$ true: $0.1 \cdot 0.95 \cdot 1 + 0.9 \cdot 0.8 \cdot 0.98 = 0.095 + 0.7056 = 0.8006$. For $B$ false: $0.1 \cdot 0.95 \cdot 0.99 + 0.9 \cdot 0.02 \cdot 0.03 = 0.09405 + 0.00054 = 0.09459$. Then $\Prob(B \mid \lnot S, G) = \alpha\,(0.05 \cdot 0.8006,\; 0.95 \cdot 0.09459) = \alpha\,(0.04003, 0.08986)$, so $\Prob(B \mid \lnot S, G) = 0.04003/0.12989 = 0.3082$, agreeing with enumeration. A factor-based implementation (multiply, sum out, normalise) prints

```console
$ python3 ve.py
({True: 0.3082, False: 0.6918}, 20)
({True: 0.7244, False: 0.2756}, 22)
```

with $20$ and $22$ table operations, against $8 \cdot 5 = 40$ CPT look-ups for enumerating the eight worlds consistent with the evidence. On five variables the saving is small; on large networks with good orders it is exponential.
:::
:::

The cost of variable elimination is dominated by the largest factor it creates. For an ordering $\sigma$, let the **induced width** $w_\sigma$ be the size of the largest factor's variable set minus one; then elimination takes $O(n\, d^{w_\sigma + 1})$ time for domains of size $d$. On a **polytree** (a network with at most one undirected path between any two vertices) a suitable order keeps factors no larger than the CPTs, giving time linear in the size of the network. The minimum induced width over all orders is the **treewidth** of the moralised graph — the same notion that made tree-structured CSPs easy ([[artificial-intelligence/constraint-satisfaction#thm-tree-csp]]). Finding the best order is itself $\mathsf{NP}$-hard, but greedy heuristics (eliminate the variable that creates the smallest factor) work well. And no clever order can save us in general:

::: theorem Exact inference is NP-hard {#thm-inference-hard}
Deciding whether $\Prob(X = \text{true}) > 0$ in a Bayesian network with Boolean variables is $\mathsf{NP}$-hard (Cooper, 1990). Hence computing posterior probabilities exactly is $\mathsf{NP}$-hard.
:::

::: proof
Reduce from 3SAT ([[complexity/np-completeness#thm-3sat]]). Given a formula with variables $u_1, \dots, u_m$ and clauses $C_1, \dots, C_k$, build a network with a root node $U_j$ for each variable, with $\Prob(U_j = \text{true}) = 1/2$; a node $K_i$ for each clause, whose parents are the (at most three) variables of $C_i$, with a deterministic CPT making $K_i$ true exactly when the clause is satisfied by its parents' values; and a chain of deterministic AND nodes $A_1, \dots, A_k$ with $A_1 = K_1$ and $A_i = A_{i-1} \land K_i$ (each with two parents, so every CPT has at most $8$ rows). Let $X = A_k$. Every assignment of the $U_j$ has probability $2^{-m}$, and $X$ is true exactly when the assignment satisfies all clauses, so $\Prob(X = \text{true}) = (\text{number of satisfying assignments})/2^m$, which is positive iff the formula is satisfiable. The network has size polynomial in the formula.
:::

The same construction shows that computing $\Prob(X = \text{true})$ exactly is as hard as *counting* satisfying assignments, a $\#\mathsf{P}$-hard problem. Exact inference is feasible when the treewidth is small; otherwise we approximate.

## Approximate inference by sampling

Sampling methods estimate probabilities by the frequencies of events in random samples drawn from the network. **Prior sampling** draws each variable, in topological order, from its CPT given the values already drawn for its parents; by [[#thm-bn-semantics]], this generates complete worlds with exactly the probabilities [[#eq-bn-factorisation]]. **Rejection sampling** estimates $\Prob(X \mid e)$ by discarding the samples inconsistent with $e$ and counting among the rest — correct in the limit, but wasteful: the fraction kept is $\Prob(e)$, which is tiny when there is much evidence.

**Likelihood weighting** avoids rejection: it fixes the evidence variables at their observed values, samples only the others, and weights each sample by the probability of the evidence given its parents in that sample, $w = \prod_{E_j \in E} \theta(e_j \mid \mathrm{pa}_j)$. The estimate of $\Prob(x \mid e)$ is the total weight of samples with $X = x$, divided by the total weight.

::: proposition Likelihood weighting is consistent {#prop-lw}
The weighted-sample estimate of likelihood weighting converges to $\Prob(x \mid e)$ with probability $1$ as the number of samples grows.
:::

::: proof
A sample is a complete world $u$ consistent with $e$, produced with probability $q(u) = \prod_{Y \notin E} \theta(y \mid \mathrm{pa}_Y)$ (the non-evidence variables are drawn from their CPTs; the evidence is fixed). Its weight is $w(u) = \prod_{E_j} \theta(e_j \mid \mathrm{pa}_j)$, so $q(u)\,w(u) = \Prob(u)$ by [[#eq-bn-factorisation]]. Hence the expected weight of a sample, counted only when $X = x$, is $\sum_{u : X = x} q(u) w(u) = \Prob(x, e)$, and the expected weight overall is $\Prob(e)$. By the strong law of large numbers the averages converge to these expectations with probability $1$, and their ratio to $\Prob(x, e)/\Prob(e) = \Prob(x \mid e)$.
:::

::: example Sampling the car network {#ex-sampling}
Estimate $\Prob(B \mid \lnot S, G)$, whose exact value is $0.3082$, by likelihood weighting and by rejection sampling, with $100$ to $100{,}000$ samples (seed $1988$).
::: solution
```python
def likelihood_weighting(query, evidence, n, rng):
    """Sample non-evidence variables from their CPTs; weight each sample by P(evidence | parents)."""
    totals = {True: 0.0, False: 0.0}
    for _ in range(n):
        world, weight = {}, 1.0
        for v in order:                                  # topological order
            if v in evidence:
                world[v] = evidence[v]; weight *= p(v, evidence[v], world)
            else:
                world[v] = rng.random() < p(v, True, world)
        totals[world[query]] += weight
    z = totals[True] + totals[False]
    return round(totals[True] / z, 4)
```

Rejection sampling (not shown) prints its estimate and the number of samples it kept:

```console
$ python3 lw.py
100 LW: 0.1422  rejection: (0.1538, 13)
1000 LW: 0.2658  rejection: (0.3276, 116)
10000 LW: 0.3084  rejection: (0.314, 1325)
100000 LW: 0.3144  rejection: (0.3104, 13044)
```

Rejection sampling keeps about $13\%$ of its samples — the probability $\Prob(\lnot S, G) \approx 0.13$ of the evidence. Both estimates approach $0.3082$, with errors of the order of $1/\sqrt{N_{\mathrm{eff}}}$ for the effective number of samples; the run with $100{,}000$ samples is within about $0.006$. Likelihood weighting uses every sample, but its weights vary: samples in which the battery is fine and the tank full get weight $0.02 \cdot 0.03 = 0.0006$ and contribute almost nothing. With evidence far downstream of the hidden causes, most weights become negligible, which is why **Markov chain Monte Carlo** methods such as Gibbs sampling — resample one variable at a time given its **Markov blanket** (parents, children and children's other parents) — are preferred for large networks.
:::
:::

::: warning Probabilities from a model are only as good as the model
A posterior computed exactly from a Bayesian network is exact *for that network*. Two errors are common. One is to read arcs as proven causal relations: a network encodes a factorisation, and many different DAGs encode the same independences (reversing $B \to L$ changes nothing observable about $B$ and $L$ alone); causal conclusions need causal assumptions or interventions. The other is to forget that small CPT entries matter enormously: setting $\Prob(S \mid B, F) = 0$ in the car network says that a flat battery and an empty tank together *never* allow a start, and no evidence can ever revise that. Zero probabilities should be reserved for genuine logical impossibility; elsewhere, use small positive numbers.
:::

## Reasoning over time: hidden Markov models

A world that changes needs one copy of each variable per time step. The simplest such model has a single discrete hidden **state** variable $X_t$ and a single **evidence** variable $E_t$ per step.

::: definition Hidden Markov model {#def-hmm}
A **hidden Markov model** (HMM) has hidden states $X_0, X_1, X_2, \dots$ with values in a finite set, observations $E_1, E_2, \dots$, a **prior** $\Prob(X_0)$, a **transition model** $\Prob(X_t \mid X_{t-1})$ and a **sensor model** $\Prob(E_t \mid X_t)$, the same for all $t$ (**stationarity**). It is the Bayesian network $X_0 \to X_1 \to X_2 \to \cdots$ with $X_t \to E_t$ for each $t \ge 1$; so (**Markov assumption**) $X_t \perp X_{0:t-2}, E_{1:t-1} \mid X_{t-1}$ and (**sensor Markov assumption**) $E_t \perp X_{0:t-1}, E_{1:t-1} \mid X_t$.
:::

The basic task is **filtering**: computing the **belief state** $\Prob(X_t \mid e_{1:t})$ — the model-based agent's internal state of [[artificial-intelligence/intelligent-agents]], made precise — as each observation arrives, without re-processing the whole history.

::: theorem The forward algorithm {#thm-forward}
Let $f_t(x) = \Prob(X_t = x \mid e_{1:t})$, with $f_0 = \Prob(X_0)$. Then
$$
f_t(x) = \alpha_t\, \Prob(e_t \mid x) \sum_{x'} \Prob(x \mid x')\, f_{t-1}(x'),
$$ {#eq-forward}
where $\alpha_t$ normalises $f_t$ to sum to $1$; and $1/\alpha_t = \Prob(e_t \mid e_{1:t-1})$. With $S$ states, each step takes $O(S^2)$ time and the whole sequence $O(TS^2)$ time and $O(S)$ space.
:::

::: proof
By Bayes' rule and the sensor Markov assumption,
$$
\Prob(x \mid e_{1:t}) = \frac{\Prob(e_t \mid x, e_{1:t-1})\, \Prob(x \mid e_{1:t-1})}{\Prob(e_t \mid e_{1:t-1})} = \frac{\Prob(e_t \mid x)\, \Prob(x \mid e_{1:t-1})}{\Prob(e_t \mid e_{1:t-1})}.
$$
The **prediction** $\Prob(x \mid e_{1:t-1})$ is obtained by conditioning on the previous state and using the Markov assumption:
$$
\Prob(x \mid e_{1:t-1}) = \sum_{x'} \Prob(x \mid x', e_{1:t-1})\, \Prob(x' \mid e_{1:t-1}) = \sum_{x'} \Prob(x \mid x')\, f_{t-1}(x').
$$
Substituting gives [[#eq-forward]] with $\alpha_t = 1/\Prob(e_t \mid e_{1:t-1})$, which is the reciprocal of the sum over $x$ of the unnormalised values. The sum over $x'$ costs $O(S)$ for each of the $S$ values of $x$.
:::

Multiplying the normalisers gives the **likelihood** of the observations, $\Prob(e_{1:T}) = \prod_t 1/\alpha_t$, used to compare models. Replacing the sum in [[#eq-forward]] by a maximum gives the **Viterbi algorithm**, which finds the most likely *sequence* of hidden states — a dynamic program ([[algorithms/dynamic-programming]]) on the trellis of states and times. **Smoothing**, $\Prob(X_k \mid e_{1:T})$ for $k < T$, combines the forward messages with a backward pass (the **forward–backward** algorithm).

::: example Is the machine wearing out? {#ex-hmm}
A machine is *Good* or *Worn*. Initially $\Prob(\mathit{Worn}) = 0.1$; each hour a good machine becomes worn with probability $0.05$, and wear is permanent. A vibration sensor reads *High* with probability $0.2$ for a good machine and $0.7$ for a worn one. The readings for six hours are Low, High, Low, High, High, High. Compute the belief $\Prob(\mathit{Worn} \mid e_{1:t})$ after each reading.
::: solution
```python
states = ["Good", "Worn"]
prior = {"Good": 0.9, "Worn": 0.1}
trans = {"Good": {"Good": 0.95, "Worn": 0.05}, "Worn": {"Good": 0.0, "Worn": 1.0}}   # wear is permanent
emit = {"Good": {"Low": 0.8, "High": 0.2}, "Worn": {"Low": 0.3, "High": 0.7}}

def forward(observations):
    """Filtering: P(X_t | e_1..e_t) for each t, by the forward algorithm (normalised)."""
    belief = dict(prior); out = []
    for e in observations:
        predicted = {x: sum(belief[y] * trans[y][x] for y in states) for x in states}   # predict
        unnorm = {x: emit[x][e] * predicted[x] for x in states}                         # update
        z = sum(unnorm.values())
        belief = {x: unnorm[x] / z for x in states}
        out.append((e, round(belief["Worn"], 4), round(z, 4)))
    return out
```

```console
$ python3 hmm.py
1 ('Low', 0.0598, 0.7275)
2 ('High', 0.295, 0.2534)
3 ('Low', 0.1561, 0.6349)
4 ('High', 0.464, 0.2991)
5 ('High', 0.7713, 0.4454)
6 ('High', 0.9265, 0.5914)
```

Step 1 by hand: the prediction is $\Prob(\mathit{Worn}) = 0.1 + 0.9 \cdot 0.05 = 0.145$; the update multiplies by $\Prob(\mathit{Low} \mid \cdot)$: $\mathit{Worn}$: $0.3 \cdot 0.145 = 0.0435$, $\mathit{Good}$: $0.8 \cdot 0.855 = 0.684$; the sum is $0.7275 = \Prob(e_1)$, and $\Prob(\mathit{Worn} \mid e_1) = 0.0435/0.7275 = 0.0598$. A single High reading is not conclusive (it raises the belief to $0.30$, and the next Low lowers it again), but three in a row push it above $0.9$. The third column is $\Prob(e_t \mid e_{1:t-1})$; their product, about $0.0092$, is the probability of the whole sequence under the model.
:::
:::

::: widget markov
matrix: 0.95,0.05; 0,1
states: Good; Worn
start: 0
steps: 40
caption: The hidden transition model of the machine on its own, without observations. Run the walk and look at the distribution after $n$ steps: $\Prob(\mathit{Good}$ at step $n) = 0.95^n$ decays geometrically, and the absorbing state $\mathit{Worn}$ is the stationary distribution. Filtering combines this drift with the evidence: the forward algorithm's prediction step is exactly one step of this chain applied to the current belief.
:::

::: quiz
In the machine HMM, a worn machine never becomes good again. After a long run of High readings the filtered belief in *Worn* is $0.999$. Then ten Low readings arrive in a row. What happens to the belief?

- [ ] It stays at $0.999$, because wear is permanent.
- [x] It decreases, because Low readings are more likely for a good machine, as the evidence accumulates.
- [ ] It drops to $0$ after the first Low reading.
- [ ] It is undefined, because the readings contradict the model.
::: solution
The transition model makes wear permanent, but the agent does not *know* that the machine is worn; it only believes it. Each Low reading multiplies the odds of *Good* against *Worn* by $0.8/0.3 \approx 2.7$ in the update step of [[#eq-forward]] (the prediction step moves only $5\%$ of the *Good* mass to *Worn*), so each Low reading multiplies the odds of *Good* by about $2.67 \cdot 0.95 \approx 2.5$. Ten of them multiply the odds by nearly $10^4$, from $1 : 999$ to about $8 : 1$ in favour of *Good*: running the filter from a belief of $0.999$ gives $\Prob(\mathit{Worn}) \approx 0.11$. Nothing is contradicted: every reading has positive probability in both states.
:::
:::

HMMs, and their continuous relative the **Kalman filter** (linear-Gaussian transition and sensor models, where the forward recursion propagates a mean and covariance), are the workhorses of tracking, speech recognition (until deep neural networks largely replaced them in the 2010s), gene finding and robot localisation. **Dynamic Bayesian networks** generalise them to factored states with many variables per time step, and **particle filters** approximate the forward recursion by a population of weighted samples — likelihood weighting through time, with resampling.

::: history
Thomas Bayes's essay on inverse probability was published posthumously in 1763, and Pierre-Simon Laplace developed Bayesian inference systematically from 1774. Early AI systems for diagnosis avoided probabilities because of the size of the joint distribution, using ad hoc certainty factors (MYCIN, 1970s). Judea Pearl's *Probabilistic Reasoning in Intelligent Systems* (1988) introduced Bayesian networks, d-separation and belief propagation on polytrees, and Steffen Lauritzen and David Spiegelhalter (1988) gave exact inference on general networks by junction trees. Gregory Cooper proved exact inference $\mathsf{NP}$-hard in 1990, and Paul Dagum and Michael Luby showed in 1993 that even approximating posteriors to within a fixed absolute error is $\mathsf{NP}$-hard. Variable elimination in its modern form is due to Nevin Zhang and David Poole (1994) and Rina Dechter (1996). Hidden Markov models were developed by Leonard Baum and colleagues in the late 1960s; Andrew Viterbi's algorithm dates from 1967 and Rudolf Kálmán's filter from 1960. Daphne Koller and Nir Friedman's *Probabilistic Graphical Models* (2009) is the standard comprehensive treatment.
:::

## Where this leads

Beliefs are for acting: [[artificial-intelligence/decision-making]] combines probabilities with utilities to choose actions, and over time with Markov decision processes — Markov chains whose transitions the agent controls. When the hidden state is not observed, the decision problem becomes a partially observable MDP whose state is the belief state computed here. Learning the parameters and structure of networks from data, and the neural models that have replaced HMMs in speech and language, are covered in the [LLM Atlas](/learn/llm/course.php?c=ml-fundamentals); the probability theory is in [Maths Atlas: probability](/learn/maths/course.php?c=probability).

::: summary
- A **Bayesian network** ([[#def-bayes-net]]) is a DAG with a CPT per variable; it defines the joint distribution as the product of the CPTs ([[#eq-bn-factorisation]]), with each variable independent of its non-descendants given its parents ([[#thm-bn-semantics]]). It needs $O(n2^k)$ numbers rather than $2^n$.
- **d-separation** ([[#def-dsep]]) reads conditional independences from the graph: chains and forks are blocked by observation, colliders are opened by it (explaining away); it is sound and generically complete ([[#thm-dsep]]).
- **Variable elimination** ([[#alg-ve]]) sums out hidden variables one at a time; its cost is exponential only in the induced width of the elimination order. In general exact inference is $\mathsf{NP}$-hard ([[#thm-inference-hard]]).
- **Sampling** estimates posteriors: rejection sampling wastes the samples that contradict the evidence; **likelihood weighting** weights them and is consistent ([[#prop-lw]]).
- An **HMM** ([[#def-hmm]]) models a hidden state observed through noisy sensors; the **forward algorithm** ([[#thm-forward]]) maintains the belief state in $O(S^2)$ per step; Viterbi and forward–backward compute most likely paths and smoothed estimates.
:::

## Exercises

::: exercise Counting parameters {level=1 check="42"}
A Bayesian network over $10$ Boolean variables has $2$ root nodes, $6$ nodes with $2$ parents each and $2$ nodes with $3$ parents each. How many independent numbers do its CPTs contain? (Enter the number.)
::: solution
A Boolean node with $k$ parents needs one number per parent configuration: $2^k$. Roots: $2 \cdot 1 = 2$; two-parent nodes: $6 \cdot 4 = 24$; three-parent nodes: $2 \cdot 8 = 16$. Total $2 + 24 + 16 = 42$, against $2^{10} - 1 = 1023$ for the full joint distribution.
:::
:::

::: exercise A joint probability {level=1 check="0.031752"}
In the car network of [[#ex-car-network]], compute $\Prob(B, \lnot F, L, G, \lnot S)$ — the battery is flat, the tank is not empty, the lights are dim, the gauge reads empty and the car does not start. (Enter the probability.)
::: solution
By [[#eq-bn-factorisation]] it is $\Prob(B)\,\Prob(\lnot F)\,\Prob(L \mid B)\,\Prob(G \mid B, \lnot F)\,\Prob(\lnot S \mid B, \lnot F) = 0.05 \cdot 0.9 \cdot 0.9 \cdot 0.8 \cdot 0.98$. Step by step: $0.05 \cdot 0.9 = 0.045$, $\cdot\, 0.9 = 0.0405$, $\cdot\, 0.8 = 0.0324$, $\cdot\, 0.98 = 0.031752$.
:::
:::

::: exercise d-separation by hand {level=1}
In the network $A \to B \to C$, $A \to D$, $D \to C$, $C \to E$, decide whether (a) $B \perp D \mid A$; (b) $B \perp D \mid \{A, C\}$; (c) $A \perp E \mid C$; (d) $A \perp E \mid \{B, D\}$.
::: solution
The paths between $B$ and $D$ are $B \leftarrow A \to D$ (fork at $A$) and $B \to C \leftarrow D$ (collider at $C$). (a) Given $A$, the fork is blocked and the collider $C$ is unobserved (and so is its descendant $E$): blocked; independent. (b) Observing $C$ opens the collider: dependent. (c) Every path from $A$ to $E$ ends $\to C \to E$, a chain through the observed $C$: independent. (d) The paths $A \to B \to C \to E$ and $A \to D \to C \to E$ are blocked at the observed chain vertices $B$ and $D$: independent.
:::
:::

::: exercise One step of filtering {level=2 check="0.5"}
An HMM has states $\{s_1, s_2\}$ with $\Prob(X_0 = s_1) = 0.5$, transitions $\Prob(s_1 \to s_1) = 0.7$, $\Prob(s_2 \to s_2) = 0.7$, and sensor model $\Prob(e \mid s_1) = 0.6$, $\Prob(e \mid s_2) = 0.6$ for the observed reading $e$. What is $\Prob(X_1 = s_1 \mid e_1 = e)$? Explain the result. (Enter the probability.)
::: solution
Prediction: $\Prob(X_1 = s_1) = 0.5 \cdot 0.7 + 0.5 \cdot 0.3 = 0.5$. Update: both states give the reading with probability $0.6$, so the unnormalised values are $0.3$ and $0.3$, and $\Prob(X_1 = s_1 \mid e) = 0.5$. An observation that is equally likely under every state carries no information — the likelihood ratio is $1$ — and the symmetric transition model keeps the uniform prior uniform.
:::
:::

::: exercise Explaining away, numerically {level=2}
Two independent causes $A$ and $B$, each with prior probability $0.1$, have a common effect $C$ with $\Prob(C \mid A, B) = 0.99$, $\Prob(C \mid A, \lnot B) = 0.9$, $\Prob(C \mid \lnot A, B) = 0.9$, $\Prob(C \mid \lnot A, \lnot B) = 0.01$. Compute $\Prob(A \mid C)$ and $\Prob(A \mid C, B)$.
::: solution
$\Prob(A, C) = 0.1\,(0.1 \cdot 0.99 + 0.9 \cdot 0.9) = 0.1 \cdot 0.909 = 0.0909$. $\Prob(\lnot A, C) = 0.9\,(0.1 \cdot 0.9 + 0.9 \cdot 0.01) = 0.9 \cdot 0.099 = 0.0891$. So $\Prob(A \mid C) = 0.0909/0.18 = 0.505$. Given also $B$: $\Prob(A \mid C, B) = \Prob(A)\Prob(C \mid A, B) / [\Prob(A)\Prob(C \mid A, B) + \Prob(\lnot A)\Prob(C \mid \lnot A, B)] = 0.099/(0.099 + 0.81) = 0.109$. Observing the effect raises $A$ from $0.1$ to about $0.5$; learning that the other cause $B$ is present brings it back to about $0.11$. $A$ and $B$ were independent a priori but are dependent given $C$, as d-separation predicts for a collider.
:::
:::

::: exercise Elimination order matters {level=2}
In a network, $Q$ is the parent of $H_1, \dots, H_n$, and each $H_i$ has a single child $O_i$; all variables are Boolean. The evidence is $O_2, \dots, O_n$ and the query is $O_1$. Compare the largest factor created by variable elimination with the order $H_2, \dots, H_n, Q, H_1$ and with an order that eliminates $Q$ first.
::: solution
With the order $H_2, \dots, H_n, Q, H_1$: eliminating $H_i$ ($i \ge 2$) multiplies $\theta(H_i \mid Q)$ and $\theta(o_i \mid H_i)$ and sums out $H_i$, giving a factor over $Q$ alone. Eliminating $Q$ multiplies $\theta(Q)$, these $n - 1$ one-variable factors and $\theta(H_1 \mid Q)$, giving a factor over $H_1$; eliminating $H_1$ with $\theta(O_1 \mid H_1)$ gives the answer over $O_1$. No factor has more than $2$ variables, and the cost is $O(n)$. If $Q$ is eliminated first, its factors $\theta(Q)$ and $\theta(H_i \mid Q)$ for all $i$ are multiplied into one factor over $Q, H_1, \dots, H_n$ with $2^{n+1}$ entries, and summing out $Q$ leaves a factor over all $n$ of the $H_i$ — exponential. The network is a tree (treewidth $1$), but only orders that eliminate from the leaves inwards achieve it; the greedy "smallest new factor first" heuristic finds such an order here.
:::
:::

::: exercise Inference by reduction {level=3}
(a) Using the construction of [[#thm-inference-hard]], what is $\Prob(X = \text{true})$ for the formula $(u_1 \lor u_2) \land (\lnot u_1 \lor u_2) \land (u_1 \lor \lnot u_2)$? (b) Explain why the construction shows that computing $\Prob(X = \text{true})$ exactly is $\#\mathsf{P}$-hard, and why it does not by itself show that approximating it to within a factor of $2$ is hard for satisfiable formulas.
::: solution
(a) The formula is satisfied only by $u_1 = u_2 = \text{true}$ (the first clause excludes both false, the second excludes $u_1$ true with $u_2$ false, the third excludes $u_1$ false with $u_2$ true). So $\Prob(X = \text{true}) = 1/2^2 = 0.25$. (b) $\Prob(X = \text{true}) \cdot 2^m$ is the number of satisfying assignments, so an exact inference algorithm would count them, which is $\#\mathsf{P}$-hard. For approximation: deciding whether the probability is zero or positive is $\mathsf{NP}$-hard, which rules out any multiplicative approximation (a factor-$2$ approximation of $0$ is $0$) unless $\mathsf{P} = \mathsf{NP}$. But for formulas known to be satisfiable the probability can be as small as $2^{-m}$, and the reduction says nothing about estimating it multiplicatively then; Dagum and Luby (1993) proved separately that approximating posteriors in Bayesian networks is $\mathsf{NP}$-hard as well.
:::
:::

::: exercise Viterbi {level=3}
Modify the forward algorithm of [[#ex-hmm]] into the Viterbi algorithm (replace the sum by a maximum and keep back-pointers) and find the most likely sequence of states for the six readings. When does the most likely sequence put the onset of wear, and how does this compare with the filtered beliefs?
::: solution
```python
def viterbi(observations):
    m = {x: prior[x] for x in states}; back = []          # m[x]: best probability of a path ending in x
    for e in observations:
        step, ptr = {}, {}
        for x in states:
            y = max(states, key=lambda y: m[y] * trans[y][x])
            step[x] = m[y] * trans[y][x] * emit[x][e]; ptr[x] = y
        m = step; back.append(ptr)
    x = max(states, key=m.get); path = [x]
    for ptr in reversed(back[1:]):                        # follow back-pointers (X_1 .. X_T)
        x = ptr[x]; path.append(x)
    return path[::-1], m

print(viterbi(["Low", "High", "Low", "High", "High", "High"]))
```

```console
$ python3 viterbi.py
(['Good', 'Worn', 'Worn', 'Worn', 'Worn', 'Worn'], {'Good': 0.0006774606864000002, 'Worn': 0.002463425999999999})
```

The most likely single history is that the machine was good at hour $1$ and worn from hour $2$ on: the High reading at hour $2$ is explained by wear, and the Low at hour $3$ as a worn machine's ordinary Low reading (probability $0.3$), which is cheaper than paying for a good machine's High ($0.2$) followed by wear later. The filtered beliefs tell a more hesitant story — they fall back to $0.16$ after the Low at hour $3$ and pass $0.5$ only at hour $5$ — because they answer a different question: the probability of the state *now* given the past, rather than the single most likely history given all six readings. The two need not agree, and neither is "the" answer; which to use depends on the decision to be made.
:::
:::
