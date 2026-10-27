Sampling many complete solutions and picking the best treats every attempt as independent: a solution that goes wrong at its first step is still written out to the end, and a solution that starts well is abandoned as soon as it is finished. A human solver does something more economical. They try an idea, judge whether it is promising, develop the promising ones, and back up when stuck. That is **search**: an explicit exploration of a tree of partial solutions, guided by an evaluation of how promising each one is.

This chapter treats reasoning as search over steps. It formulates the search problem, describes tree of thoughts (Yao et al., 2023), beam search over steps guided by a process reward model, and Monte Carlo tree search with the UCT rule, whose exploration term is derived from a concentration inequality. It places these methods in the context of the game-playing and theorem-proving systems that made search famous — AlphaGo, AlphaZero, AlphaProof — as they were published. A complete implementation on a toy arithmetic puzzle, the Game of 24, compares sampling, beam search and tree search at equal budgets with an imperfect verifier. The chapter closes with the question that the success of reinforcement-learned reasoning raised: when a model writes a long chain of thought with backtracking, is explicit search still needed, or has the search been learned?

## Reasoning as a search problem {#sec-problem}

::: definition Search over reasoning steps {#def-search}
A **reasoning search problem** for input $x$ consists of **states** $s = (x, s_1,\dots,s_t)$, the input followed by the steps so far; a **proposal distribution** $\pi(s_{t+1}\mid s)$, a language model that generates candidate next steps; a **terminal test** that recognises complete solutions; an **outcome check** $o(s)\in\{0,1\}$ for terminal states, when one exists; and a **value estimate** $\hat v(s)$ of non-terminal states — a process reward model, a learned value function, or the model's own judgement. A **search algorithm** decides which states to expand (ask $\pi$ for children) and when to stop; its cost is counted in model calls or generated tokens.
:::

The definition separates three roles that a single model may play. **Proposal** is generation. **Evaluation** is a judgement of promise; [[reasoning/process-outcome-rewards#prop-orm-value]] showed that an outcome model trained on prefixes learns exactly a value $\hat v(s)\approx\Prob_\pi(\text{success}\mid s)$, and a PRM is a related judgement of step correctness. **Checking** is exact and available only at the end, and only for verifiable tasks. Independent sampling with a final check uses proposal and checking but no evaluation; search adds evaluation, so that effort can be redirected *before* a solution is finished.

### What evaluation buys {#sec-why-eval}

Consider the extreme case of a perfect evaluator: $\hat v(s) = 1$ if $s$ can still be completed correctly and $0$ otherwise. Then a greedy search that proposes $k$ children of the current state and moves to any child with value $1$ never goes down a dead end — but it can still fail if none of the $k$ proposals is good.

::: proposition Greedy search with a perfect evaluator {#prop-greedy}
Suppose a solution has $D$ steps, and at depth $d$ a fraction $f_d$ of the proposals from any solvable state are themselves solvable, independently across proposals. Greedy search that proposes $k$ children per step and moves to a solvable one (as identified by a perfect evaluator) succeeds with probability

$$
\prod_{d=1}^{D}\big(1 - (1 - f_d)^k\big),
$$ {#eq-greedy}

using $kD$ proposals, while $n$ independent rollouts (one proposal per step) succeed with probability $1 - \big(1 - \prod_d f_d\big)^n$, using $nD$ proposals.
:::

::: proof
At each depth the search continues if at least one of $k$ independent proposals is solvable, probability $1 - (1-f_d)^k$; the depths are independent by assumption, and the perfect evaluator lets the search pick a solvable child whenever one exists, so the probabilities multiply. A single rollout succeeds if each of its $D$ proposals is solvable, probability $\prod_d f_d$, and $n$ independent rollouts succeed unless all fail.
:::

The contrast is between a product of numbers near $1$ and a product of small numbers. With $f_d = 0.2$, $D = 3$ and $k = 5$, greedy search succeeds with probability $(1 - 0.8^5)^3 = 0.304$ using $15$ proposals; one rollout succeeds with probability $0.2^3 = 0.008$, and five rollouts (also $15$ proposals) with $0.039$. Evaluation converts the exponential decay of long chains ([[reasoning/chain-of-thought#sec-compound]]) into a per-step test. The catch is that real evaluators are not perfect, and the rest of the chapter is about how algorithms cope with that.

::: widget plot
f: (1 - (1 - f)^x)^D; 1 - (1 - f^D)^(x)
x: 1, 30
y: 0, 1
sliders: f=0.2:0.05:0.6:0.01; D=3:1:10:1
labels: greedy search with a perfect evaluator, $k$ proposals per step; $k$ independent rollouts
caption: Success probability against the number of proposals per step $k$ ([[#prop-greedy]]), for solutions of $D$ steps in which a fraction $f$ of proposals keeps the problem solvable. For a fair budget comparison, the rollout curve uses $k$ rollouts of $D$ steps each, the same $kD$ proposals as the search. Increase $D$: the search degrades gracefully, while independent sampling collapses, because $f^D$ becomes tiny. Real evaluators make mistakes, so the search curve is an upper bound.
:::

## Tree of thoughts {#sec-tot}

Yao et al. (2023) proposed **tree of thoughts** (ToT), in which a language model plays both the proposer and the evaluator. A *thought* is a coherent intermediate step — an equation, a line of a plan, a word in a crossword. ToT has four components: a decomposition of the problem into thoughts; a **thought generator**, which samples candidate thoughts independently or asks the model to propose several in one prompt; a **state evaluator**, which prompts the model to rate a state (for example as *sure*, *likely* or *impossible* to reach the goal) or to vote among states; and a search algorithm, breadth-first (keep the best $b$ states at each depth) or depth-first with backtracking when the evaluator rejects a state.

Their best-known task is the **Game of 24**: given four numbers, combine them with $+$, $-$, $\times$, $\div$, using each exactly once, to make $24$. On $100$ hard puzzles, GPT-4 with standard input–output prompting solved $7.3\%$, with chain of thought $4.0\%$, and with self-consistency over $100$ chains $9.0\%$; tree of thoughts with breadth $b = 1$ solved $45\%$ and with $b = 5$, $74\%$. Each thought was one arithmetic step, the evaluator was the same model asked whether the remaining numbers could still reach $24$, sampled three times per state, and failing states were pruned. ToT also improved results on mini crosswords and a creative-writing task, at the cost of many more model calls than a single chain — the cost is the subject of [[reasoning/test-time-scaling]].

::: example A Game of 24 search by hand {#ex-24}
Solve $(4, 7, 8, 8)$ by breadth-first search with $b = 2$, using your own judgement as the evaluator.
::: solution
Depth $1$: some proposals are $8/8 = 1$ leaving $(1, 4, 7)$; $8 - 4 = 4$ leaving $(4, 7, 8)$; $7 + 8 = 15$ leaving $(4, 8, 15)$; $4\times8 = 32$ leaving $(7, 8, 32)$. Evaluate: $(1, 4, 7)$ — is $24$ reachable? $(7 - 1)\times4 = 24$: *sure*. $(4, 7, 8)$: $(7 - 4)\times8 = 24$: *sure*. Keep these two. Depth $2$ from $(1, 4, 7)$: $7 - 1 = 6$ leaving $(4, 6)$, *sure* since $4\times6 = 24$. Depth $3$: $4\times6 = 24$. The solution is $4\times(7 - 8/8) = 24$; the other kept state gives $(7 - (8 - 4))\times8 = 24$. The evaluator did most of the work: without it, the $36$ or so possible first steps would each need to be explored.
:::
:::

## Beam search over steps {#sec-beam}

Beam search over tokens keeps the $B$ most probable partial sequences ([[sequence-models/decoding-basics]]). Beam search over *steps* keeps the $B$ partial solutions with the highest **value estimate**, usually from a PRM, and generates $k$ candidate next steps for each.

::: algorithm Step-level beam search with a value model {#alg-beam}
**Input:** problem $x$, proposal model $\pi$, value model $\hat v$, beam width $B$, proposals per state $k$, maximum depth $D$.
1. Set the frontier $\mathcal F\leftarrow\{(x)\}$.
2. For $d = 1,\dots,D$:
3. For each state $s\in\mathcal F$, sample $k$ next steps from $\pi(\cdot\mid s)$, giving up to $B k$ children.
4. Move children that are complete solutions to a set of finished candidates.
5. Set $\mathcal F$ to the $B$ remaining children with the largest $\hat v$; stop if it is empty.
6. Return the finished candidate with the largest score (or a vote among them).
:::

::: proposition Cost of beam search {#prop-beam-cost}
If no state becomes terminal before depth $D$, step-level beam search generates $k + (D-1)Bk$ steps and evaluates as many states. Independent sampling with $n$ solutions of $D$ steps generates $nD$ steps; at equal cost, $n = \big(k + (D-1)Bk\big)/D$.
:::

::: proof
The first expansion has one state and generates $k$ children; each of the remaining $D - 1$ depths expands $B$ states with $k$ children each. Every generated child is evaluated once.
:::

::: example An equal-budget comparison {#ex-budget}
A mathematics solution has about $D = 10$ steps of $60$ tokens each. Beam search uses $B = 4$ and $k = 8$, and the PRM costs about as much per evaluated step as generating it. How many tokens does beam search generate, how many full samples does the same generation budget buy, and what does the PRM add?
::: solution
By [[#prop-beam-cost]], $8 + 9\cdot32 = 296$ steps, or $296\cdot60 = 17{,}760$ generated tokens. The same budget buys $296/10\approx30$ complete solutions for best-of-$N$ or voting. The PRM scores $296$ partial states during beam search, but best-of-$30$ with the same PRM would score only the $30$ finished ones (or all their $300$ prefixes, if aggregating step scores), so the evaluation costs are similar. The comparison is therefore between $30$ independent attempts and one search whose $296$ steps are concentrated on the $4$ most promising prefixes at each depth — which wins depends on the problem's difficulty and on how reliable the PRM is.
:::
:::

Snell et al. (2024) compared best-of-$N$ with step-level beam search and lookahead search, all guided by the same PRM, at equal generation budgets on the MATH benchmark. Beam search did better at small budgets and on harder problems; on easy problems and at large budgets, best-of-$N$ caught up or overtook it, which the authors attributed to beam search over-optimising the PRM — driving towards steps the PRM likes, which are not always correct. This is the search version of the over-optimisation in [[reasoning/process-outcome-rewards#sec-uses]]: the harder an algorithm optimises an imperfect evaluator, the more its errors matter.

## Monte Carlo tree search {#sec-mcts}

Beam search commits: once a state falls out of the beam it is never revisited. **Monte Carlo tree search** (MCTS) keeps statistics for every visited state and keeps revisiting the tree, balancing two goals: **exploit** states that have looked good, and **explore** states that have been tried too rarely to judge.

::: algorithm Monte Carlo tree search {#alg-mcts}
Each node $s$ stores a visit count $N(s)$ and a total value $W(s)$, with mean $Q(s) = W(s)/N(s)$. Repeat for a budget of iterations:
1. **Selection.** From the root, repeatedly move to a child chosen by a selection rule (UCT below) until reaching a node that has not been expanded.
2. **Expansion.** Ask the proposal model for $k$ children of that node.
3. **Evaluation.** Estimate the node's value: by a **rollout** (complete the solution with $\pi$ and check the outcome), by a value model $\hat v$, or by the exact check if the node is terminal.
4. **Backup.** Add $1$ to $N$ and the value to $W$ for every node on the path from the root.

Finally return the most visited child of the root (for acting step by step) or the best terminal state found.
:::

### The UCT rule {#sec-uct}

The selection rule comes from the theory of **multi-armed bandits**. At a node visited $N$ times, a child visited $n_j$ times with mean value $\bar X_j$ is chosen to maximise

$$
\bar X_j + c\sqrt{\frac{\ln N}{n_j}},
$$ {#eq-uct}

the **upper confidence bound applied to trees** (UCT; Kocsis and Szepesvári, 2006), based on the UCB1 rule of Auer, Cesa-Bianchi and Fischer (2002), which uses $c = \sqrt2$. The first term exploits; the second, the **exploration bonus**, is large for children visited rarely relative to their parent, and it grows — slowly — for every child that is not chosen, so no child is neglected forever.

::: proposition The exploration bonus is a confidence bound {#prop-ucb}
Let $X_1,\dots,X_n$ be independent values in $[0,1]$ with mean $\mu$, and $\bar X_n$ their average. For any $t\ge1$,

$$
\Prob\Big(\mu > \bar X_n + \sqrt{\tfrac{2\ln t}{n}}\Big)\le t^{-4}.
$$

So with $c = \sqrt2$ and $t = N$, the UCT index of a child is, with probability at least $1 - N^{-4}$, an *upper* bound on that child's true mean.
:::

::: proof
Hoeffding's inequality for independent variables in $[0,1]$ states $\Prob(\mu - \bar X_n\ge\varepsilon)\le\exp(-2n\varepsilon^2)$ for $\varepsilon > 0$. Take $\varepsilon = \sqrt{2\ln t/n}$: then $2n\varepsilon^2 = 4\ln t$ and the bound is $e^{-4\ln t} = t^{-4}$.
:::

Choosing the child with the largest upper bound is **optimism in the face of uncertainty**: a child is chosen either because its mean is high (exploitation) or because its bound is wide (exploration), and in both cases choosing it is either good or informative. For the bandit problem, Auer et al. proved that UCB1's expected number of plays of each suboptimal arm grows only logarithmically in the total number of plays; Kocsis and Szepesvári showed that UCT's estimate at the root converges to the optimal value. In a reasoning tree the values are not independent and identically distributed — the policy below a node changes as the tree grows — so these guarantees are motivation rather than proof, and the constant $c$ is tuned in practice.

::: example UCT by hand {#ex-uct}
A node has been visited $N = 10$ times. Its three children have (total value, visits) $(3, 4)$, $(1, 1)$ and $(4, 5)$. With $c = 1$, which child does UCT select?
::: solution
$\ln10 = 2.3026$. Child 1: $0.75 + \sqrt{2.3026/4} = 0.75 + 0.759 = 1.509$. Child 2: $1.0 + \sqrt{2.3026} = 1 + 1.517 = 2.517$. Child 3: $0.8 + \sqrt{2.3026/5} = 0.8 + 0.679 = 1.479$. UCT selects child 2: its single visit gave value $1$, and with only one observation its bound is wide. If that visit was lucky, the next few visits will lower its mean and shrink its bonus, and attention returns to the others.
:::
:::

### Priors: PUCT {#sec-puct}

When a policy network gives prior probabilities $P(s, a)$ for the children, AlphaGo and AlphaZero used a variant, often called **PUCT**, that scales the exploration term by the prior:

$$
a^* = \arg\max_a\ Q(s, a) + c_{\text{puct}}\,P(s, a)\,\frac{\sqrt{\sum_b N(s, b)}}{1 + N(s, a)}.
$$ {#eq-puct}

Unvisited children with a high prior are tried first, and the exploration bonus decays like $1/n$ rather than $1/\sqrt n$. For language models, $P(s,a)$ is naturally the model's probability of the proposed step (suitably normalised over the $k$ proposals), and $Q$ comes from a value model or PRM.

::: example PUCT by hand {#ex-puct}
At a node with $100$ visits in total, three children have $(Q, P, N) = (0.5, 0.6, 60)$, $(0.6, 0.3, 30)$ and $(0.2, 0.1, 10)$. With $c_{\text{puct}} = 1.5$, which is selected?
::: solution
$\sqrt{100} = 10$. Child 1: $0.5 + 1.5\cdot0.6\cdot10/61 = 0.5 + 0.148 = 0.648$. Child 2: $0.6 + 1.5\cdot0.3\cdot10/31 = 0.6 + 0.145 = 0.745$. Child 3: $0.2 + 1.5\cdot0.1\cdot10/11 = 0.2 + 0.136 = 0.336$. Child 2 is selected: it has the highest value, and its exploration bonus is nearly as large as child 1's because it has been visited half as often. The prior favoured child 1, which therefore received many visits early; as evidence accumulates, $Q$ dominates.
:::
:::

::: widget plot
f: c*sqrt(log(N)/x); c*0.3*sqrt(N)/(1 + x)
x: 1, 100
y: 0, 3
sliders: c=1.4:0.2:3:0.1; N=200:10:2000:10
labels: UCT bonus $c\sqrt{\ln N/n}$; PUCT bonus $cP\sqrt N/(1+n)$ with $P = 0.3$
caption: Exploration bonuses as a function of a child's visit count $n$, at a parent with $N$ visits. The UCT bonus decays like $1/\sqrt n$ and grows like $\sqrt{\ln N}$; the PUCT bonus of [[#eq-puct]] decays like $1/n$ but grows like $\sqrt N$, scaled by the child's prior probability $P$. Increase $N$: the UCT bonus barely changes, while PUCT forces rarely visited children to be revisited as the parent's count grows.
:::

## Search in games and theorem proving {#sec-alpha}

MCTS became famous in game playing. Coulom (2006) introduced the name and applied it to Go, and Kocsis and Szepesvári (2006) the UCT rule. **AlphaGo** (Silver et al., 2016) combined MCTS with a policy network trained on human games and by self-play, and a value network, and defeated Lee Sedol in March 2016. **AlphaGo Zero** (2017) and **AlphaZero** (Silver et al., 2018) learned from self-play alone, with PUCT selection and a single network outputting both policy and value, and reached superhuman play in Go, chess and shogi. Their training loop is a form of expert iteration ([[reasoning/verifiable-rewards#alg-star]]): the search is the expert, its visit counts become the policy's training targets, and game outcomes train the value.

The same pattern was carried into mathematics. **AlphaGeometry** (Trinh et al., 2024) paired a language model that proposes auxiliary constructions with a symbolic deduction engine and solved $25$ of $30$ olympiad geometry problems in a benchmark of past competitions. In July 2024 Google DeepMind announced that **AlphaProof**, which proves statements in the Lean proof assistant using reinforcement learning with AlphaZero-style search, together with AlphaGeometry 2, had solved four of the six problems of the 2024 International Mathematical Olympiad, a score of $28$ out of $42$ — silver-medal standard — after the problems were manually formalised, with some problems taking up to three days of computation; a detailed account appeared in *Nature* in 2025. At the 2025 Olympiad, Google DeepMind and OpenAI each announced that a general reasoning model writing natural-language proofs within the time limit had reached gold-medal standard ($35$ of $42$), the former graded by the competition's coordinators. These are announcements and reports about specific systems at specific dates; they show what search, formal verification and long reasoning could achieve on competition mathematics by 2025, not a general capability.

For language models outside formal mathematics, MCTS-style methods include RAP (Hao et al., 2023), which used the model both as a world model and to estimate rewards, and rStar-Math (Guan et al., 2025), which trained small models through rounds of MCTS with a process preference model. The DeepSeek-R1 report, by contrast, listed MCTS among its unsuccessful attempts at scale ([[reasoning/verifiable-rewards#sec-r1]]): token-level generation has a far larger branching factor than board games, and training a value model accurate enough to guide the search proved hard.

::: warning A search is only as good as its evaluator
Search spends effort where the evaluator points. A noisy value model sends beam search confidently down wrong branches, and a value model with a systematic blind spot is *exploited* by search exactly as a reward model is exploited by reinforcement learning ([[reasoning/process-outcome-rewards#def-hacking]]). With an exact final check, search can only fail to find a solution, not return a wrong one; without one, a search that "found" a high-value solution has only found something its evaluator likes. Always report the evaluator, and measure final accuracy with an independent check.
:::

## A numerical laboratory: the Game of 24 {#sec-code}

The listing implements the Game of 24 exactly, with fractions. A random "proposal model" picks any legal step uniformly. A stand-in for a learned PRM reports whether a state can still reach $24$ — computed exactly by brute force — but **flips its answer** with probability $\varepsilon$. All methods check final states exactly, as with a verifiable task. The comparison is at roughly equal numbers of proposed steps.

```python
import math, random
from fractions import Fraction as F
from functools import lru_cache
from itertools import combinations_with_replacement
rng = random.Random(6)

def children(state):
    """All states reachable in one step: combine two numbers with + - * /."""
    out = []
    for i in range(len(state)):
        for j in range(i + 1, len(state)):
            a, b = state[i], state[j]
            rest = state[:i] + state[i + 1:j] + state[j + 1:]
            vals = {a + b, a - b, b - a, a * b}
            if b: vals.add(a / b)
            if a: vals.add(b / a)
            out += [tuple(sorted(rest + (v,))) for v in vals]
    return out

@lru_cache(maxsize=None)
def solvable(state):                       # exact oracle (used only to build the noisy verifier)
    if len(state) == 1:
        return state[0] == 24
    return any(solvable(c) for c in children(state))

def verifier(state, eps):                  # stand-in for a learned PRM: oracle with flipped labels
    v = solvable(state)
    if rng.random() < eps:
        v = not v
    return v + 0.01 * rng.random()         # small random tie-break

puzzles = [tuple(F(x) for x in p) for p in combinations_with_replacement(range(1, 14), 4)]
puzzles = [p for p in puzzles if solvable(p)]
print(f"{len(puzzles)} of 1820 four-number puzzles from 1..13 are solvable")
test = rng.sample(puzzles, 200)

def sampling(p, n):                        # n independent random rollouts, exact final check
    calls = 0
    for _ in range(n):
        s = p
        while len(s) > 1:
            s = rng.choice(children(s)); calls += 1
        if s[0] == 24:
            return True, calls
    return False, calls

def beam(p, width, k, eps):                # keep the `width` best states by verifier score
    frontier, calls = [p], 0
    while len(frontier[0]) > 1:
        cand = []
        for s in frontier:
            cs = children(s)
            for c in rng.sample(cs, min(k, len(cs))):
                calls += 1
                cand.append((verifier(c, eps), c))
        if len(cand[0][1]) == 1:           # final step: check every proposal exactly
            return any(c[0] == 24 for _, c in cand), calls
        cand.sort(key=lambda t: -t[0])
        frontier = [c for _, c in cand[:width]]

def mcts(p, iters, eps, k=5, c_uct=1.0):  # UCT; leaves scored by the verifier, terminals exactly
    N, W, kids, calls = {}, {}, {}, 0
    for _ in range(iters):
        path, s = [p], p
        while s in kids:                   # selection: descend by the UCT rule
            parent = s
            fresh = [c for c in kids[parent] if c not in N]
            s = fresh[0] if fresh else max(kids[parent], key=lambda c:
                    W[c] / N[c] + c_uct * math.sqrt(math.log(N[parent]) / N[c]))
            path.append(s)
        if len(s) == 1:                    # terminal state: exact check
            if s[0] == 24:
                return True, calls
            value = 0.0
        else:                              # expansion: the model proposes k next steps
            cs = children(s)
            kids[s] = rng.sample(cs, min(k, len(cs))); calls += len(kids[s])
            if len(s) == 2 and any(c[0] == 24 for c in kids[s]):
                return True, calls         # a proposed final step is checked exactly
            value = min(1.0, verifier(s, eps))
        for node in path:                  # backup
            N[node] = N.get(node, 0) + 1
            W[node] = W.get(node, 0.0) + value
    return False, calls

def run(name, f):
    wins = calls = 0
    for p in test:
        ok, c = f(p); wins += ok; calls += c
    print(f"{name:34s} success {wins / len(test):.3f}   proposals per puzzle {calls / len(test):6.1f}")

run("sampling, n = 1", lambda p: sampling(p, 1))
run("sampling, n = 12", lambda p: sampling(p, 12))
run("sampling, n = 40", lambda p: sampling(p, 40))
for eps in [0.0, 0.1, 0.2, 0.3]:
    run(f"beam 3 x 5, verifier error {eps}", lambda p: beam(p, 3, 5, eps))
for eps in [0.0, 0.2, 0.3]:
    run(f"MCTS 20 iterations, error {eps}", lambda p: mcts(p, 20, eps))
```

```text
1362 of 1820 four-number puzzles from 1..13 are solvable
sampling, n = 1                    success 0.010   proposals per puzzle    3.0
sampling, n = 12                   success 0.095   proposals per puzzle   34.1
sampling, n = 40                   success 0.195   proposals per puzzle  107.6
beam 3 x 5, verifier error 0.0     success 0.380   proposals per puzzle   34.7
beam 3 x 5, verifier error 0.1     success 0.340   proposals per puzzle   34.8
beam 3 x 5, verifier error 0.2     success 0.265   proposals per puzzle   34.7
beam 3 x 5, verifier error 0.3     success 0.145   proposals per puzzle   34.7
MCTS 20 iterations, error 0.0      success 0.360   proposals per puzzle   81.8
MCTS 20 iterations, error 0.2      success 0.270   proposals per puzzle   85.1
MCTS 20 iterations, error 0.3      success 0.295   proposals per puzzle   84.5
```

A random step reaches $24$ only $1\%$ of the time, and independent sampling scales slowly: $12$ rollouts ($34$ proposals) solve $9.5\%$, $40$ rollouts $19.5\%$. Beam search with the same $35$ proposals solves $38\%$ with a perfect verifier — not $100\%$, because sampling $5$ of the roughly $36$ possible first steps often misses every good one, as [[#prop-greedy]] predicts — and degrades steadily as the verifier errs: at $30\%$ errors it is barely better than sampling. MCTS uses more proposals here but is markedly more robust to verifier errors, because it keeps revisiting states and averaging their values instead of discarding them; differences of a few points are within the sampling error of $200$ puzzles (about $0.03$). Real systems face the same trade-offs with a learned proposal model, which is far better than random, and a learned evaluator, which is far from an oracle.

::: quiz
A search uses a PRM to prune partial solutions and an exact checker on final answers. Which statements are correct? (Select all that apply.)
- [x] If the PRM wrongly prunes every solvable branch, the search fails to find a solution but does not return a wrong one.
- [ ] With a perfect PRM, beam search always finds a solution if one exists.
- [x] UCT's exploration term makes the search revisit states that the PRM scored low but that have been visited rarely.
- [ ] The exploration bonus of UCT grows linearly in the parent's visit count.
::: solution
With an exact final check, wrong answers are never returned. A perfect PRM still needs the proposal model to propose a good step among its $k$ proposals ([[#prop-greedy]]). UCT's bonus $c\sqrt{\ln N/n}$ grows only like $\sqrt{\ln N}$ in the parent's count, but enough to revisit rarely tried children.
:::
:::

## Has search been learned? {#sec-learned}

Reasoning models trained by reinforcement learning ([[reasoning/verifiable-rewards]]) write long chains that try an approach, check it, abandon it and try another — the visible trace of a search, written into a single sequence. Two lines of work suggest that search can indeed be learned this way. Gandhi et al. (2024), in *Stream of Search*, trained language models on serialised traces of search procedures for the Countdown arithmetic game, including mistakes and backtracking, and found that they solved more problems than models trained only on optimal solutions, and improved further with reinforcement learning. Lehnert et al. (2024) trained Transformers on the execution traces of A* search for mazes and Sokoban puzzles, and then fine-tuned them to find optimal plans with fewer search steps than A* itself used.

Explicit and learned search have complementary strengths. A learned search is cheap to run — one sequence, no orchestration — and adapts to the problem, but it is sequential, limited by the context length, and hard to parallelise. An explicit search can be spread across many parallel calls, can use exact checkers at every node, and gives guarantees such as never returning an unchecked answer; it needs a good evaluator and an engineered notion of "step". As of 2026 both are used: parallel sampling and voting on top of long sequential reasoning is common in published evaluations, and explicit tree search remains central where a formal checker exists, as in theorem proving.

::: history
Heuristic search is as old as artificial intelligence: Newell, Shaw and Simon's Logic Theorist (1956) searched for proofs, and Hart, Nilsson and Raphael (1968) introduced A*. Bandit algorithms with upper confidence bounds were analysed by Lai and Robbins (1985) and Auer, Cesa-Bianchi and Fischer (2002). Coulom (2006) named Monte Carlo tree search, and Kocsis and Szepesvári (2006) introduced UCT. AlphaGo (2016), AlphaGo Zero (2017) and AlphaZero (2018) combined MCTS with deep networks. For language models, Xie et al. (2023) guided beam search with self-evaluation, Yao et al. (2023) introduced tree of thoughts, and Hao et al. (2023) applied MCTS with the model as a world model. Trinh et al. (2024) published AlphaGeometry; AlphaProof was announced in July 2024. Gandhi et al. (2024) and Lehnert et al. (2024) trained models on search traces, and Snell et al. (2024) compared PRM-guided search with best-of-$N$ at equal compute.
:::

::: summary
- **Search** over reasoning separates proposal (a language model), evaluation (a PRM, value model or self-judgement) and checking (exact, at the end).
- With a perfect evaluator, greedy search succeeds with probability $\prod_d(1 - (1-f_d)^k)$, against $\prod_d f_d$ for one rollout: evaluation turns exponential decay over steps into a per-step test.
- **Tree of thoughts** uses the model as proposer and evaluator with breadth- or depth-first search; on the Game of 24 it raised GPT-4 from $4\%$ (chain of thought) to $74\%$.
- **Step-level beam search** costs $k + (D-1)Bk$ proposals; guided by a PRM it helps most at small budgets and on hard problems, and it can over-optimise the PRM.
- **MCTS** selects children by **UCT**, $\bar X_j + c\sqrt{\ln N/n_j}$, whose bonus is a Hoeffding confidence bound (exceeded with probability at most $N^{-4}$ for $c = \sqrt2$); **PUCT** adds a prior, $Q + cP\sqrt N/(1+n)$, as in AlphaZero.
- Search succeeded spectacularly in games and formal mathematics (AlphaGo, AlphaZero, AlphaProof, as published); for natural-language reasoning, long reinforcement-learned chains of thought partly internalise search, and explicit search remains valuable where exact checkers exist.
:::

## Exercises

::: exercise A UCT score {level=1 check="1.4846"}
A child has total value $6$ after $10$ visits; its parent has $50$ visits. Compute its UCT index with $c = \sqrt2$ to four decimal places.
::: solution
$0.6 + \sqrt2\sqrt{\ln50/10} = 0.6 + 1.41421\cdot\sqrt{0.39120} = 0.6 + 1.41421\cdot0.62546 = 0.6 + 0.8845 = 1.4846$ (to four decimal places; the unrounded value is $1.48454$).
:::
:::

::: exercise Beam budget {level=1 check="35"}
Step-level beam search with $B = 3$ and $k = 5$ runs for $D = 3$ steps. How many steps does it propose, by [[#prop-beam-cost]]?
::: solution
$k + (D-1)Bk = 5 + 2\cdot15 = 35$, matching the listing's $34.7$ (fewer when a state has fewer than $5$ legal steps).
:::
:::

::: exercise A confidence radius {level=1 check="0.6786"}
For $t = 100$ and $n = 20$, compute the radius $\sqrt{2\ln t/n}$ of [[#prop-ucb]] to four decimal places, and the bound on the probability that the true mean exceeds the upper confidence bound.
::: solution
$\sqrt{2\cdot4.60517/20} = \sqrt{0.46052} = 0.6786$. The probability is at most $100^{-4} = 10^{-8}$.
:::
:::

::: exercise Greedy search with a perfect evaluator {level=2 check="0.3039"}
With $f_d = 0.2$ at every depth, $D = 3$ and $k = 5$, compute the success probability [[#eq-greedy]] to four decimal places, and compare it with $15$ independent rollouts, each step of which keeps the problem solvable with probability $0.2$.
::: solution
$(1 - 0.8^5)^3 = (1 - 0.32768)^3 = 0.67232^3 = 0.3039$. Fifteen rollouts would use $45$ proposals and succeed with $1 - (1 - 0.008)^{15} = 0.113$; five rollouts, the same $15$ proposals as the search, give $0.039$. The search is about eight times as likely to succeed at the same cost.
:::
:::

::: exercise The size of the 24 tree {level=2 check="3888"}
Count the step sequences in the Game of 24 tree for four numbers, treating each unordered pair and each of six operations ($a+b$, $a-b$, $b-a$, $a\times b$, $a/b$, $b/a$) as a separate step and ignoring duplicates and division by zero.
::: solution
From four numbers there are $\binom42 = 6$ pairs and $6$ operations: $36$ first steps. From three numbers, $\binom32\cdot6 = 18$; from two, $6$. The number of complete sequences is $36\cdot18\cdot6 = 3888$. Exhaustive search is trivial for a computer here, which is why the Game of 24 is a good test of a *model's* search: the model must not need anything like $3888$ calls.
:::
:::

::: exercise PUCT versus UCT {level=2}
In [[#ex-puct]], recompute the selection with UCT ($c = 1$, ignoring priors), and explain the difference. Then explain why AlphaZero's bonus decays like $1/(1+n)$ rather than $1/\sqrt n$.
::: solution
UCT with $N = 100$: $\ln100 = 4.605$. Child 1: $0.5 + \sqrt{4.605/60} = 0.5 + 0.277 = 0.777$. Child 2: $0.6 + \sqrt{4.605/30} = 0.6 + 0.392 = 0.992$. Child 3: $0.2 + \sqrt{4.605/10} = 0.2 + 0.679 = 0.879$. UCT also selects child 2, but ranks child 3 second, because without priors its few visits earn a large bonus; PUCT ranks it last because the prior says it is unlikely to be good. With a strong prior, PUCT's faster-decaying bonus concentrates visits on the children the policy favours and stops exploring them once their values are known; the prior, not the $\sqrt{\ln N}$ growth, is what keeps the search broad where needed. The $1/(1+n)$ form is a design choice validated empirically in AlphaGo and AlphaZero, not the consequence of a bound like [[#prop-ucb]].
:::
:::

::: exercise When does search beat sampling? {level=2}
Using [[#prop-greedy]], take $D$ steps with $f_d = f$ for all $d$ and compare greedy search ($k$ proposals per step) with $k$ independent rollouts, which cost the same. Show that for small $f$ (with $kf$ small too) the ratio of their success probabilities is about $k^{D-1}$. What does this say about long problems?
::: solution
For small $f$, $1 - (1-f)^k\approx kf$, so greedy search succeeds with probability about $(kf)^D$; $k$ rollouts succeed with probability about $kf^D$. The ratio is $(kf)^D/(kf^D) = k^{D-1}$. (More carefully, when $kf$ is not small, search success is $(1-(1-f)^k)^D$, which approaches $1$ as $k$ grows, while sampling stays near $kf^D$.) So the advantage of evaluation grows exponentially in the number of steps $D$: for long problems, any evaluator that is better than chance at each step is worth a great deal — provided its errors are not systematic, as the listing shows.
:::
:::

::: exercise Depth-first search with backtracking {level=3}
Write a depth-first search for the Game of 24 that proposes $k = 6$ random children of each state, visits them in order of the noisy verifier's score, and backtracks when a state's children are exhausted, with a budget of $40$ proposals. Using the listing's functions, report the success rate on the same $200$ puzzles for $\varepsilon = 0$ and $\varepsilon = 0.2$.
::: solution
```python
def dfs(p, k, eps, budget):
    calls = 0
    def visit(s):
        nonlocal calls
        cs = children(s)
        props = rng.sample(cs, min(k, len(cs)))
        calls += len(props)
        if len(s) == 2:
            return any(c[0] == 24 for c in props)
        for c in sorted(props, key=lambda c: -verifier(c, eps)):
            if calls >= budget:
                return False
            if verifier(c, eps) >= 0.5 and visit(c):   # skip states judged hopeless
                return True
        return False
    return visit(p), calls

for eps in [0.0, 0.2]:
    run(f"DFS k = 6, error {eps}", lambda p: dfs(p, 6, eps, 40))
```

Appended to the listing, this prints:

```text
DFS k = 6, error 0.0               success 0.455   proposals per puzzle   14.0
DFS k = 6, error 0.2               success 0.450   proposals per puzzle   23.2
```

With a perfect verifier, DFS solves $45.5\%$ of puzzles with $14$ proposals on average — better than beam search with $35$ — because it stops as soon as it succeeds and spends nothing on branches judged hopeless. With $20\%$ verifier errors its success rate barely changes ($45\%$, within sampling error) but it spends $23$ proposals: backtracking recovers from false positives, at a price in budget. (The verifier is re-queried when deciding whether to descend, so its noise is sampled twice per state, as a learned model sampled at positive temperature would be.)
:::
:::

::: exercise Explicit or learned? {level=3}
A team must solve competition problems in a domain with an exact checker (Lean proofs) and in one without (natural-language physics derivations). For each, argue whether to invest in explicit tree search with a value model, in reinforcement learning of long chains of thought, or in both, using the results of this chapter and of [[reasoning/verifiable-rewards]].
::: solution
With an exact checker, explicit search is attractive: every terminal node can be verified, so search never returns a wrong proof; failed branches give training data; and the AlphaZero/expert-iteration loop applies directly (as in AlphaProof). Reinforcement learning of long chains is also possible, because the checker supplies the reward, and the two combine naturally — a learned policy proposes steps and the search verifies. Without a checker, explicit search is limited by its evaluator: a learned value model or PRM will be over-optimised by a strong search ([[#sec-beam]]), and nothing guarantees the returned derivation. The safer investment is a policy trained where rewards *are* verifiable (mathematics and code), transferred to the new domain, with modest sampling and voting or a generative verifier, and human evaluation of final quality. In both cases, report results at equal compute, since search and long chains spend inference compute differently ([[reasoning/test-time-scaling]]).
:::
:::
