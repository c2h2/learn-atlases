Consider this Mini function, which a programmer might write while debugging:

```text
fn g(n: int) -> int {
    let k = 10;
    let debug = false;
    let s = 0;
    while n > 0 {
        if debug { print(n); }
        s = s + k * 2;
        n = n - 1;
    }
    return s;
}
```

Every time round the loop, the code that our compiler produced in [[compilers/intermediate-representations]] tests `debug` and computes `k * 2`. A human sees at once that `debug` is always false, so the `print` can never run, and that `k * 2` is always 20. An optimising compiler must *prove* such facts, for every possible execution, before it may use them — and it must do so automatically, for programs with arbitrary loops and branches, in time roughly linear in the size of the program. The tool is **data-flow analysis**: a set of equations that relate facts at the beginning and end of each basic block, solved by iterating to a fixed point.

This chapter develops data-flow analysis from first principles. We define the classic analyses — **liveness**, **reaching definitions**, **constant propagation** — as equations over a control-flow graph, solve them with one generic **worklist algorithm**, and prove that it terminates and computes the best solution the equations allow. The theory that makes this precise is that of **lattices** and **monotone functions**, due to Gary Kildall (1973). We then use the results, together with SSA form, to implement **constant propagation and folding**, **branch folding**, **copy propagation** and **dead-code elimination**, measure their effect, and compare with what GCC does.

## Liveness

The first question every back end asks: at a given point, which variables hold values that may still be needed?

::: definition Live variable {#def-live}
A variable $v$ is **live** at a program point $p$ if there is a path in the CFG from $p$ to a use of $v$ along which $v$ is not assigned. Otherwise $v$ is **dead** at $p$. For a block $B$, $\mathrm{in}(B)$ is the set of variables live at the start of $B$ and $\mathrm{out}(B)$ the set live at its end.
:::

A dead variable's value will never be read, so its register can be reused ([[compilers/code-generation]]) and an assignment to it can be deleted. Liveness depends on the future, so information flows *backwards* through the CFG. For a single block, two sets summarise its effect: $\mathrm{use}(B)$, the variables read in $B$ before any assignment to them in $B$, and $\mathrm{def}(B)$, the variables assigned in $B$. A variable is live at the start of $B$ if $B$ reads it first, or if it is live at the end and $B$ does not assign it; it is live at the end if it is live at the start of some successor:

$$
\mathrm{in}(B) = \mathrm{use}(B) \cup \bigl(\mathrm{out}(B) \setminus \mathrm{def}(B)\bigr), \qquad
\mathrm{out}(B) = \bigcup_{S \in \mathrm{succ}(B)} \mathrm{in}(S),
$$ {#eq-liveness}

with $\mathrm{out}(B) = \emptyset$ for a block that returns. As with FIRST sets ([[compilers/top-down-parsing#thm-ff-fixpoint]]) and dominators ([[compilers/intermediate-representations#thm-dom-iter]]), the equations are recursive around loops, and we solve them by iteration — here from empty sets upwards, since a variable should be live only if some actual path demands it.

Many analyses have this shape: a value at each block boundary, a **transfer function** that maps the value at one end of a block to the value at the other, and a **meet** operator that combines the values coming from several neighbours. So we write one solver and instantiate it. It keeps a **worklist** of blocks whose input may have changed, and when a block's output changes it adds only the blocks that depend on it.

```python
def solve(blocks, forward, transfer, meet, boundary, init):
    """Fixed point of IN/OUT equations over the CFG.
    transfer(block, value) -> value; meet(list of values) -> value."""
    preds, succs = predecessors(blocks), {b: successors(ins) for b, ins in blocks.items()}
    before, after = (preds, succs) if forward else (succs, preds)
    entry = next(iter(blocks))
    edge_in = {b: init for b in blocks}     # value at the start (forward) / end (backward)
    out = {b: init for b in blocks}
    work, rounds = list(blocks) if forward else list(reversed(blocks)), 0
    while work:
        b = work.pop(0); rounds += 1
        srcs = before[b]
        is_boundary = (b == entry) if forward else not srcs
        edge_in[b] = meet([out[p] for p in srcs] + ([boundary] if is_boundary else []))
        new = transfer(b, edge_in[b])
        if new != out[b]:
            out[b] = new
            work += [s for s in after[b] if s not in work]   # only dependants are revisited
    solve.rounds = rounds
    return edge_in, out
```

For a backward problem, "in" and "out" swap roles: the solver's `edge_in` is the value at the *end* of the block and `out` the value at its start. Liveness and the next analysis are then a few lines each (`uses(i)` and `defs(i)` return the variables an instruction reads and writes):

```python
def liveness(blocks):
    gen, kill = {}, {}                      # gen: used before defined; kill: defined
    for b, ins in blocks.items():
        g, k = set(), set()
        for i in ins:
            g |= {x for x in uses(i) if isinstance(x, str) and x not in k}
            k |= set(defs(i))
        gen[b], kill[b] = g, k
    live_out, live_in = solve(blocks, False, lambda b, out: gen[b] | (out - kill[b]),
                              lambda vs: set().union(*vs), set(), set())
    return live_in, live_out

def reaching(blocks):
    """A definition is (block, index); it reaches a point if some path carries it there."""
    alldefs = {(b, n): i[1] for b, ins in blocks.items() for n, i in enumerate(ins) if defs(i)}
    def transfer(b, s):
        for n, i in enumerate(blocks[b]):
            if defs(i):
                s = {d for d in s if alldefs[d] != i[1]} | {(b, n)}   # kill, then gen
        return s
    return solve(blocks, True, transfer, lambda vs: set().union(*vs), set(), set())
```

::: example Liveness in Euclid's algorithm {#ex-live-gcd}
Compute liveness for the three-address code of `gcd` ([[compilers/intermediate-representations#ex-gcd-cfg]]).
::: solution
$\mathrm{use}$ and $\mathrm{def}$: $B_0$ (`goto L1`): both empty. $L_1$ (`if b != 0`): $\mathrm{use} = \set{b}$. $L_2$ (`t1 = a % b; t = t1; a = b; b = t`): $\mathrm{use} = \set{a, b}$ — both are read before being assigned — and $\mathrm{def} = \set{t_1, t, a, b}$. $L_3$ (`return a`): $\mathrm{use} = \set{a}$.

Backwards: $\mathrm{in}(L_3) = \set{a}$. $\mathrm{in}(L_2) = \set{a, b} \cup (\mathrm{out}(L_2) \setminus \mathrm{def}(L_2)) = \set{a, b}$ whatever $\mathrm{out}(L_2)$ is. $\mathrm{out}(L_1) = \mathrm{in}(L_2) \cup \mathrm{in}(L_3) = \set{a, b}$ and $\mathrm{in}(L_1) = \set{b} \cup \set{a, b} = \set{a, b}$; $\mathrm{out}(L_2) = \mathrm{in}(L_1) = \set{a, b}$; $\mathrm{in}(B_0) = \set{a, b}$. The program agrees, after 5 block visits:

```text
B0 in: ['a', 'b'] out: ['a', 'b']
L1 in: ['a', 'b'] out: ['a', 'b']
L2 in: ['a', 'b'] out: ['a', 'b']
L3 in: ['a'] out: []
```

The temporaries $t_1$ and $t$ are never live across a block boundary: each is assigned and read inside $L_2$. At the end of the loop only `a` and `b` matter; inside it, the remainder must be held while both are still live, which is why the loop needs three registers in [[compilers/code-generation]]. And `b` is dead in $L_3$: its register is free as soon as the loop exits.
:::
:::

## Reaching definitions

::: definition Reaching definition {#def-reaching}
A **definition** is an instruction that assigns a variable. A definition $d$ of $v$ **reaches** a point $p$ if there is a path from just after $d$ to $p$ along which $v$ is not assigned again.
:::

Reaching definitions answer "where might this value have come from?". If the only definition of `x` that reaches a use is `x = 5`, the use can be replaced by `5`; if no definition reaches a use, the variable may be used uninitialised (a warning in GCC). The analysis is forward: a block **generates** the last definition of each variable it assigns and **kills** all other definitions of those variables, and the definitions reaching the start of a block are the union of those leaving its predecessors:

$$
\mathrm{in}(B) = \bigcup_{P \in \mathrm{pred}(B)} \mathrm{out}(P), \qquad \mathrm{out}(B) = \mathrm{gen}(B) \cup \bigl(\mathrm{in}(B) \setminus \mathrm{kill}(B)\bigr).
$$ {#eq-reaching}

::: example Reaching definitions with kills {#ex-reaching}
Compute reaching definitions for the function

```text
fn f(c: bool) -> int {
    let x = 0; let y = 0;
    if c { x = 2; y = 3; } else { x = 3; y = 2; }
    let z = x + y;
    let w = 4 * 5;
    return z + w;
}
```

whose three-address code has blocks $B_0$ (`x = 0; y = 0; if c != 0 goto L1 else L2`), $L_1$ (`x = 2; y = 3`), $L_2$ (`x = 3; y = 2`) and $L_3$ (`t1 = x + y; z = t1; t2 = 4 * 5; w = t2; t3 = z + w; return t3`). Name each definition by its block and position.
::: solution
```text
B0 in: [] out: [('B0', 0), ('B0', 1)]
L1 in: [('B0', 0), ('B0', 1)] out: [('L1', 0), ('L1', 1)]
L2 in: [('B0', 0), ('B0', 1)] out: [('L2', 0), ('L2', 1)]
L3 in: [('L1', 0), ('L1', 1), ('L2', 0), ('L2', 1)] out: [('L1', 0), ('L1', 1), ('L2', 0), ('L2', 1), ('L3', 0), …, ('L3', 4)]
```

The definitions `x = 0` and `y = 0` in $B_0$ reach $L_1$ and $L_2$ but are killed in both, so they do not reach $L_3$: whichever way control goes, `x` and `y` are reassigned. Two definitions of `x` reach the use in `t1 = x + y`, which is why no single constant can be substituted for `x` there. The solver needed 4 block visits — one per block, because the CFG is acyclic and the blocks were visited in an order in which every block comes after its predecessors. Liveness tells the same story from the other side: `x` and `y` are not live at the end of $B_0$, so the assignments `x = 0` and `y = 0` are **dead stores**.
:::
:::

::: widget graph
nodes: B0@0,1; L1@2,0; L2@2,2; L3@4,1
edges: B0>L1; B0>L2; L1>L3; L2>L3
algorithm: topo
caption: The CFG of `f` from [[#ex-reaching]]. Run the topological sort: it lists $B_0$ first and $L_3$ last. A forward analysis that visits blocks in this order (more generally, in **reverse postorder** of a depth-first search, which is a topological order of the CFG without its back edges) sees every predecessor's final value before it visits a block, so on an acyclic CFG it finishes in a single pass — the 4 visits of [[#ex-reaching]]. A backward analysis such as liveness should use the reverse order. With loops, each extra pass around a back edge propagates information one more iteration.
:::

## Lattices and fixed points

Why does the iteration stop, and is its answer right? The answer is the same for every analysis, once we identify what they have in common.

::: definition Semilattice, height, monotone function {#def-lattice}
A **meet semilattice** is a set $L$ with a binary operation $\sqcap$ (meet) that is idempotent, commutative and associative. It defines a partial order $x \sqsubseteq y \iff x \sqcap y = x$, in which $x \sqcap y$ is the greatest lower bound of $x$ and $y$. A **top** element $\top$ satisfies $x \sqsubseteq \top$ for all $x$. The **height** of $L$ is the length of its longest strictly descending chain $x_0 \sqsupset x_1 \sqsupset \cdots \sqsupset x_h$. A function $f\colon L \to L$ is **monotone** if $x \sqsubseteq y$ implies $f(x) \sqsubseteq f(y)$.
:::

The convention: $\top$ is the optimistic "no information yet" start, and going down means learning that fewer facts are guaranteed. For liveness, $L$ is the set of subsets of the variables, the meet is $\cup$ (information from any successor counts), $\top = \emptyset$ and $\sqsubseteq$ is $\supseteq$; the height is the number of variables. For reaching definitions it is subsets of definitions with $\cup$. For a "must" analysis such as **available expressions** (an expression is available if it has been computed on *every* path and not invalidated since) the meet is $\cap$ and $\top$ is the set of all expressions. Gen/kill transfer functions $f(x) = g \cup (x \setminus k)$ are monotone in all these orders.

::: definition Data-flow framework {#def-framework}
A **monotone data-flow framework** consists of a semilattice $L$ of finite height with top $\top$, a direction (forward or backward), a monotone transfer function $f_B\colon L \to L$ for each block, and a boundary value for the entry (forward) or the exits (backward). Its equations, for a forward problem, are $\mathrm{in}(r) = \mathit{boundary}$, $\mathrm{in}(B) = \mathop{\Large\sqcap}_{P \in \mathrm{pred}(B)} \mathrm{out}(P)$ and $\mathrm{out}(B) = f_B(\mathrm{in}(B))$.
:::

::: theorem The worklist algorithm terminates at the maximal fixed point {#thm-mfp}
For a monotone framework with lattice height $h$ and a CFG with $N$ blocks and $E$ edges, the worklist algorithm started from $\mathrm{out}(B) = \top$ for all $B$ terminates after at most $N + h \cdot E$ block visits. Its result is a solution of the equations, and it is the **maximal fixed point** (MFP): every other solution $S$ satisfies $S(B) \sqsubseteq \mathrm{MFP}(B)$ for all $B$.
:::

::: proof
*The values only go down.* Let $\mathrm{out}_t$ be the values after $t$ visits. By induction on $t$, $\mathrm{out}_{t+1}(B) \sqsubseteq \mathrm{out}_t(B)$ for all $B$. Initially every value is $\top$, so the first update of any block can only go down. If all values so far form descending sequences, then at a visit to $B$ the meet of its predecessors' current values is $\sqsubseteq$ the meet at its previous visit (meet is monotone in each argument), and since $f_B$ is monotone the new $\mathrm{out}(B)$ is $\sqsubseteq$ the previous one.

*Termination.* Each value can strictly decrease at most $h$ times. Each strict decrease of $\mathrm{out}(B)$ puts at most $\lvert\mathrm{succ}(B)\rvert$ blocks on the worklist, so over the whole run at most $h \sum_B \lvert \mathrm{succ}(B)\rvert = hE$ blocks are added after the initial $N$, and each visit removes one.

*It is a solution.* When the worklist is empty, every block was visited after the last change of any of its predecessors (a change puts the dependants back on the list), so its value equals $f_B$ applied to the meet of its predecessors' final values: the equations hold.

*It is the maximal solution.* Let $S$ be any solution. We show $S(B) \sqsubseteq \mathrm{out}_t(B)$ for all $t$, by induction. At $t = 0$, $\mathrm{out}_0(B) = \top$. At a visit to $B$, the new value is $f_B(\mathop{\Large\sqcap}_P \mathrm{out}_t(P))$; by the induction hypothesis and monotonicity, it is $\sqsupseteq f_B(\mathop{\Large\sqcap}_P S(P)) = S(B)$. So the final values lie above every solution.
:::

"Maximal" may sound like the wrong goal, but remember the orientation: higher in the lattice means *more* optimistic facts (fewer live variables, more available expressions, more constants), so the MFP is the most precise solution of the equations. For liveness in the usual subset order it is the *least* solution — the smallest live sets.

The equations, however, are only an approximation of what we want. The ideal answer for a block $B$ considers each path from the entry to $B$ separately, applies the transfer functions along it, and combines the results.

::: definition Meet over all paths {#def-mop}
For a forward framework, $\mathrm{MOP}(B) = \mathop{\Large\sqcap}_{\pi} f_\pi(\mathit{boundary})$, where $\pi$ ranges over all paths from the entry to the start of $B$, and $f_\pi$ is the composition of the transfer functions of the blocks along $\pi$ (excluding $B$).
:::

::: theorem MFP is safe, and exact for distributive frameworks {#thm-mop}
For every block $B$, $\mathrm{MFP}(B) \sqsubseteq \mathrm{MOP}(B)$. If every transfer function is **distributive**, $f(x \sqcap y) = f(x) \sqcap f(y)$, then $\mathrm{MFP}(B) = \mathrm{MOP}(B)$.
:::

::: proof
*Safety.* We show that $\mathrm{MFP}(\mathrm{in}(B)) \sqsubseteq f_\pi(\mathit{boundary})$ for every path $\pi$ from the entry to $B$, by induction on the length of $\pi$; then $\mathrm{MFP}(\mathrm{in}(B))$ is a lower bound of all path values and hence $\sqsubseteq$ their meet. For the empty path ($B$ the entry), $\mathrm{in}(r) = \mathit{boundary} \sqcap \dots \sqsubseteq \mathit{boundary}$. For a path $\pi = \pi' \cdot P$ ending with the edge $P \to B$: by induction $\mathrm{in}(P) \sqsubseteq f_{\pi'}(\mathit{boundary})$, so by monotonicity $\mathrm{out}(P) = f_P(\mathrm{in}(P)) \sqsubseteq f_P(f_{\pi'}(\mathit{boundary})) = f_\pi(\mathit{boundary})$, and $\mathrm{in}(B)$, a meet that includes $\mathrm{out}(P)$, is $\sqsubseteq \mathrm{out}(P)$.

*Exactness.* Suppose all $f_B$ are distributive. Because $L$ has finite height, every meet over an infinite set of path values equals the meet of finitely many of them, so distributivity extends to the meets in the definition of MOP. Then $\mathrm{MOP}$ is a solution of the equations: for $B \ne r$, the paths to $B$ are the paths to the predecessors $P$ extended through $P$, so
$$
\mathrm{MOP}(B) = \mathop{\Large\sqcap}_P \mathop{\Large\sqcap}_{\pi' \text{ to } P} f_P(f_{\pi'}(\mathit{boundary})) = \mathop{\Large\sqcap}_P f_P\Bigl(\mathop{\Large\sqcap}_{\pi'} f_{\pi'}(\mathit{boundary})\Bigr) = \mathop{\Large\sqcap}_P f_P(\mathrm{MOP}(P)).
$$
By [[#thm-mfp]] the MFP lies above every solution, so $\mathrm{MOP}(B) \sqsubseteq \mathrm{MFP}(B)$; with safety, they are equal.
:::

Gen/kill functions are distributive: $g \cup ((x \cup y) \setminus k) = (g \cup (x \setminus k)) \cup (g \cup (y \setminus k))$, and the same with $\cap$. So for liveness, reaching definitions and available expressions, the iteration computes exactly the path-based answer — the best answer possible without knowing which paths are actually executed. (Even MOP is conservative: it considers paths that may be infeasible, such as a path through `if debug` when `debug` is always false. Deciding feasibility exactly is undecidable, as is every non-trivial semantic property of programs, by Rice's theorem.)

::: widget relation
set: top; m1; z0; p1; bot
pairs: top,top; m1,m1; z0,z0; p1,p1; bot,bot; bot,m1; bot,z0; bot,p1; bot,top; m1,top; z0,top; p1,top
view: properties
caption: The lattice of constant propagation for one variable, as a relation $x \mathrel{R} y$ meaning $x \sqsubseteq y$: $\top$ (`top`, "no value seen yet"), the constants (here only $-1$, $0$, $1$, as `m1`, `z0`, `p1`; the real lattice has one element per integer) side by side, and $\bot$ (`bot`, "not a constant"). Check the properties: the relation is reflexive, antisymmetric and transitive — a partial order. The meet of two different constants is $\bot$, the meet of $\top$ and anything is that thing. Although the lattice is infinitely wide, its height is 2, so a variable's value can drop at most twice, which is what makes the analysis terminate. Click the matrix to remove the pair `bot,top`: the relation stops being transitive, because $\bot \sqsubseteq -1$ and $-1 \sqsubseteq \top$ force $\bot \sqsubseteq \top$.
:::

## Constant propagation

Constant propagation is the analysis behind the `debug` example. Its lattice for a single variable is the one in the figure: $\top$ (undefined so far), a constant $c$, or $\bot$ ("not a constant", NAC); the lattice for a block boundary maps each variable to such a value, with the meet taken variable by variable. The transfer function evaluates the block's instructions abstractly: $x = y + z$ gives $x$ the constant $c_y + c_z$ if both operands are constants, $\bot$ if either is $\bot$, and $\top$ otherwise.

```python
UNDEF, NAC = "undef", "nac"                 # top and bottom of the constant lattice
def meet_val(a, b):
    if a == UNDEF: return b
    if b == UNDEF: return a
    return a if a == b else NAC

def constprop(blocks, params):
    def meet(maps):
        out = {}
        for m in maps:
            for v, c in m.items(): out[v] = meet_val(out.get(v, UNDEF), c)
        return out
    def transfer(b, env):
        env = dict(env)
        val = lambda x: env.get(x, UNDEF) if isinstance(x, str) else x
        for i in blocks[b]:
            if i[0] == "=": env[i[1]] = val(i[2])
            elif i[0] == "op":
                x, y = val(i[3]), val(i[4])
                if NAC in (x, y): env[i[1]] = NAC
                elif UNDEF in (x, y): env[i[1]] = UNDEF
                elif i[2] in ("/", "%") and y == 0: env[i[1]] = NAC   # do not fold a trap
                else: env[i[1]] = int(OPS[i[2]](x, y))
            elif i[0] == "call": env[i[1]] = NAC
        return env
    return solve(blocks, True, transfer, meet, {p: NAC for p in params}, {})
```

Parameters are $\bot$ at the entry, since the caller may pass anything; a call's result is $\bot$. A division by the constant zero is not folded: doing so would move the run-time error to compile time, or hide it.

::: example Constant propagation is not distributive {#ex-nondistributive}
Run `constprop` on the function `f` of [[#ex-reaching]] and compare the result for `z` with the meet over all paths.
::: solution
At the start of $L_3$ the program reports `{'c': 'nac', 'x': 'nac', 'y': 'nac'}`, and at its end `t2` and `w` are $20$, but `t1`, `z` and `t3` are NAC. MFP: the two predecessors give $x = 2, y = 3$ and $x = 3, y = 2$; the meet is $x = \bot$, $y = \bot$, and then $x + y = \bot$. MOP: along the path through $L_1$, $z = 5$; through $L_2$, $z = 5$; the meet is $5$. So $\mathrm{MFP} \sqsubset \mathrm{MOP}$ strictly. The transfer function of $L_3$ is not distributive: applied to the meet of $\set{x \mapsto 2, y \mapsto 3}$ and $\set{x \mapsto 3, y \mapsto 2}$ it gives $z = \bot$, but the meet of its results on each is $z = 5$. Losing the *correlation* between $x$ and $y$ at the join is the price of keeping one value per variable.
:::
:::

### Constant propagation on SSA

In SSA form each variable has exactly one definition, so its value is a single lattice element for the whole program rather than one per block — the analysis becomes **sparse**. A φ-function's value is the meet of its operands; any other instruction is evaluated as before. Iterate over all definitions until nothing changes:

```python
def ssa_constants(blocks, params):
    """In SSA each variable has one value: iterate over all definitions to a fixed point."""
    val = {p: NAC for p in params}
    get = lambda x: val.get(x, UNDEF) if isinstance(x, str) else (UNDEF if x is None else x)
    changed = True
    while changed:
        changed = False
        for ins in blocks.values():
            for i in ins:
                if i[0] == "phi":
                    new = UNDEF
                    for v in i[2].values(): new = meet_val(new, get(v))
                elif i[0] == "=": new = get(i[2])
                elif i[0] == "op":
                    x, y = get(i[3]), get(i[4])
                    new = (NAC if NAC in (x, y) else UNDEF if UNDEF in (x, y) else
                           NAC if i[2] in ("/", "%") and y == 0 else int(OPS[i[2]](x, y)))
                elif i[0] == "call": new = NAC
                else: continue
                if new != get(i[1]): val[i[1]] = new; changed = True
    return {v: c for v, c in val.items() if c not in (UNDEF, NAC)}
```

The same termination argument applies: each variable's value descends at most twice. Using the result is **constant folding**: delete each definition whose value is a known constant, replace its uses by the constant, and turn a conditional branch whose operands are both constants into an unconditional jump (**branch folding**). Blocks that become unreachable are deleted, and φ-functions lose the operands that came from them:

```python
def fold(params, blocks):
    consts = ssa_constants(blocks, params)
    c = lambda x: consts.get(x, x) if isinstance(x, str) else x
    new = {}
    for b, ins in blocks.items():
        out = []
        for i in ins:
            if defs(i) and i[1] in consts and i[0] != "call": continue   # value known
            if i[0] == "op": i = i[:3] + (c(i[3]), c(i[4]))
            elif i[0] in ("=", "ret"): i = i[:-1] + (c(i[-1]),)
            elif i[0] == "call": i = i[:3] + ([c(x) for x in i[3]],)
            elif i[0] == "phi": i = ("phi", i[1], {p: c(v) for p, v in i[2].items()})
            elif i[0] == "br":
                i = i[:2] + (c(i[2]), c(i[3])) + i[4:]
                if not isinstance(i[2], str) and not isinstance(i[3], str):
                    i = ("jmp", i[4] if OPS[i[1]](i[2], i[3]) else i[5])   # branch folded
            out.append(i)
        new[b] = out
    return params, prune_unreachable(new)
```

## Dead code, copies and a small optimiser

A definition whose result is never used is **dead code**, and so is any computation that only feeds dead code. In SSA, finding it is simple: a variable is used if it appears as an operand anywhere; delete the definitions of unused variables and repeat, because deleting one use may make another definition dead. Calls stay, because they may have effects (here, printing).

```python
def dce(params, blocks):
    """Delete definitions whose value is never used (calls stay: they have effects)."""
    while True:
        used = {x for ins in blocks.values() for i in ins
                for x in (i[2].values() if i[0] == "phi" else uses(i)) if isinstance(x, str)}
        new = {b: [i for i in ins if i[0] == "call" or not defs(i) or i[1] in used]
               for b, ins in blocks.items()}
        if new == blocks: return params, blocks
        blocks = new

def optimise(params, blocks):
    f = to_ssa(params, blocks)
    for p in (copy_propagate, fold, dce): f = p(*f)
    return f
```

`copy_propagate` is the SSA copy propagation of [[compilers/intermediate-representations#ex-copyprop]]: every copy `x = y` disappears and its uses become `y`. In non-SSA code, dead code is found with liveness instead: an assignment to $v$ is dead if $v$ is not live just after it.

::: example Optimising the debugging loop {#ex-optimise-g}
Apply `optimise` to `g` from the start of the chapter, and measure the effect of the optimiser on the seven test programs of [[compilers/intermediate-representations]].
::: solution
Before and after:

```text
B0:                                 B0:
    k = 10                              goto L1
    debug = 0                       L1:
    s = 0                               s_1 = φ(B0: 0, L6: t3_0)
    goto L1                             n_1 = φ(B0: n_0, L6: t4_0)
L1:                                     if n_1 > 0 goto L2 else L3
    if n > 0 goto L2 else L3        L2:
L2:                                     goto L6
    if debug != 0 goto L4 else L6   L6:
L4:                                     t3_0 = s_1 + 20
    t1 = call print(n)                  t4_0 = n_1 - 1
    goto L6                             goto L1
L6:                                 L3:
    t2 = k * 2                          return s_1
    t3 = s + t2
    s = t3
    t4 = n - 1
    n = t4
    goto L1
L3:
    return s
```

Constant propagation found $k_0 = 10$, $\mathit{debug}_0 = 0$ and $t_2 = 20$; branch folding turned `if debug != 0` into `goto L6`, which made $L_4$ unreachable and removed the `print` call with it; dead-code elimination then removed nothing more, because copy propagation had already eliminated the copies. (The empty block $L_2$ remains; a CFG simplification pass would merge it away.) Counting instructions executed by the IR interpreter (not counting φs, which become register moves that are usually eliminated) and static instructions (including φs):

| program | executed before | after | static before | after |
|---|---|---|---|---|
| gcd | 48 | 29 | 14 | 12 |
| fact | 149 | 149 | 11 | 11 |
| logic | 66 | 49 | 40 | 31 |
| collatz | 2158 | 1698 | 21 | 20 |
| nested | 2257 | 1901 | 45 | 44 |
| swap | 107 | 59 | 22 | 19 |
| manyargs | 11 | 11 | 11 | 11 |

All seven programs print the same output after optimisation. Most of the gain comes from copy propagation in loops; `fact` and `manyargs` have nothing to remove.
:::
:::

::: quiz
After `optimise`, the function `f` of [[#ex-reaching]] still computes `t1_0 = x_3 + y_3` with `x_3 = φ(L1: 2, L2: 3)` and `y_3 = φ(L1: 3, L2: 2)`. Why does the SSA constant propagation not find that `t1_0` is 5?
- [ ] because the analysis did not run to its fixed point
- [x] because each φ is evaluated on its own, and the meet of 2 and 3 is NAC
- [ ] because SSA form forbids replacing a φ by a constant
- [ ] because `x_3 + y_3` might overflow
::: solution
The analysis keeps one lattice value per variable. $x_3 = 2 \sqcap 3 = \bot$ and $y_3 = 3 \sqcap 2 = \bot$, so $x_3 + y_3 = \bot$, exactly as in [[#ex-nondistributive]]: the correlation "when $x$ is 2, $y$ is 3" is lost at the φs. GCC 15.2 does better: its GIMPLE for this function just before the partial-redundancy-elimination pass is *exactly* our SSA (`x_1 = PHI <2(2), 3(3)>`, `y_2 = PHI <3(2), 2(3)>`, `z_4 = x_1 + y_2`), and after that pass (`-fdump-tree-pre`) it reads `return 25;` — PRE evaluates `x + y` separately in each predecessor ("φ-translation"), finds the constant 5 on both, and merges the results. `gcc -O2` compiles `f` to `movl $25, %eax; ret`, while at `-O1`, which does not run PRE, it computes `leaq 20(%rdx,%rax), %rax`.
:::
:::

::: warning Deleting code can delete errors
Dead-code elimination removed every unused computation, including divisions. If the divisor could be zero, the original program would have trapped where the optimised one carries on. Whether that is allowed is a question about the language's semantics, not about the analysis. In C, division by zero is undefined behaviour, so the compiler may assume it does not happen and delete the division; in Java it must throw `ArithmeticException`, so the JIT may delete an unused division only if it can prove the divisor non-zero. For Mini we take C's view — our `dce` is correct only under it. The same issue arises with loads that might fault, calls that might not return, and loops that might not terminate (C++ permits removing side-effect-free infinite loops; C11 permits it only for loops whose controlling expression is not a constant). Every optimisation is proved correct relative to a semantics; know which one your compiler assumes.
:::

## Classic optimisations

Data-flow analysis justifies a long catalogue of transformations. Here are the most important, with what each needs.

- **Common-subexpression elimination**: if `a + b` has already been computed into $t$ and neither `a` nor `b` has changed since — on *every* path, so the expression is *available* — reuse $t$. Within a block, **local value numbering** assigns a number to each value and looks up each new expression `(op, number(x), number(y))` in a hash table; across blocks, available expressions or SSA-based **global value numbering** do the same.
- **Partial redundancy elimination** (PRE; Morel and Renvoise, 1979): an expression computed on *some* paths into a point, and again at the point, is made fully redundant by inserting it on the other paths. It subsumes common-subexpression elimination and loop-invariant code motion.
- **Loop-invariant code motion**: a computation inside a loop whose operands are defined only outside the loop gives the same result every iteration; move it to a **preheader** block before the loop, provided it cannot trap (or the loop is known to run).
- **Strength reduction** and **induction-variable elimination**: in a loop, an expression like `8 * i` where `i` increases by 1 each iteration can be replaced by a new variable increased by 8, and a loop counter used only to compute addresses can be replaced by the address itself.
- **Inlining**: replace a call by the body of the callee, which removes the call overhead and, more importantly, exposes the body to all the other optimisations in the caller's context.

::: example Loop-invariant code motion in GCC {#ex-licm}
Compile with GCC 15.2 (`gcc -O1 -fno-tree-vectorize -S`, unwind and CET directives suppressed as before):

```c
void g(long *a, long n, long x, long y) {
    for (long i = 0; i < n; i++)
        a[i] = x * y + i;
}
```
::: solution
```text
g:                              # a in %rdi, n in %rsi, x in %rdx, y in %rcx
    testq   %rsi, %rsi
    jle     .L4                 # n <= 0: nothing to do
    imulq   %rcx, %rdx          # v = x * y, computed once, before the loop
    addq    %rdx, %rsi          # end = x*y + n
    movq    %rdx, %rax
    negq    %rax
    leaq    (%rdi,%rax,8), %rax # base = a - x*y (as a long pointer)
.L6:
    movq    %rdx, (%rax,%rdx,8) # base[v] = v, that is, a[i] = x*y + i
    addq    $1, %rdx            # v++
    cmpq    %rsi, %rdx
    jne     .L6
.L4:
    ret
```

The multiplication has been hoisted out of the loop (and guarded by the test $n > 0$, so it is not executed when the loop body would not be). Better still, the compiler noticed that the stored value $v = xy + i$ and the address $a + 8i$ are both induction variables, and rewrote the loop around $v$ alone: it stores $v$ at address $(a - 8xy) + 8v$, so the loop has four instructions and no separate counter `i`. At `-O2` GCC also unrolls the loop by two.
:::
:::

### Conditional constant propagation

Running constant propagation and branch folding one after the other misses facts that each would let the other prove. In

```text
fn h(n: int) -> int {
    let x = 1;
    while n > 0 {
        if x != 1 { x = 2; }
        n = n - 1;
    }
    return x;
}
```

`x` is always 1, because the branch that assigns 2 is never taken — but the branch is never taken only because `x` is 1. `ssa_constants` evaluates $x_3 = \varphi(L_2{:}\ x_1, L_4{:}\ x_2)$ with $x_2 = 2$ and concludes that $x_1$ and $x_3$ are not constants; branch folding then cannot fold `if x_1 != 1`. **Sparse conditional constant propagation** (SCCP; Wegman and Zadeck, 1991) runs both at once, optimistically: it also tracks which CFG edges are executable (starting with none but the entry), lets a φ take the meet only over operands whose edges are executable, and marks a branch's targets executable only according to the current lattice value of its condition. It finds $x_1 = x_3 = 1$ and proves $L_4$ unreachable (see [[#ex-sccp]]). GCC and LLVM both run SCCP.

::: history
Data-flow analysis grew out of the FORTRAN compilers. Vyssotsky and Wegner described a bit-vector flow analysis for live variables at Bell Labs in the early 1960s; Frances Allen's "Control flow analysis" (1970) and "A basis for program optimization" (1971), and Allen and John Cocke's "A catalogue of optimizing transformations" (1972), set out the analyses and transformations used ever since. Gary Kildall's "A unified approach to global program optimization" (POPL 1973) introduced the lattice framework and the iterative algorithm of [[#thm-mfp]], with the proof that it computes the meet-over-paths solution for distributive problems; John Kam and Jeffrey Ullman (1976–77) analysed monotone frameworks and showed that MFP may be strictly worse than MOP without distributivity. Étienne Morel and Claude Renvoise introduced partial redundancy elimination in 1979. Patrick and Radhia Cousot's abstract interpretation (POPL 1977) generalised data-flow analysis into a theory of sound approximation of program semantics, the basis of modern static analysers. Mark Wegman and Kenneth Zadeck's "Constant propagation with conditional branches" (*ACM TOPLAS*, 1991) gave SCCP.
:::

## Where this leads

Liveness is the input to register allocation in [[compilers/code-generation]]: two variables that are live at the same time cannot share a register, and the interference graph built from liveness is what the allocator colours. The analyses of this chapter work within one function; **interprocedural** analysis (call graphs, summaries, inlining decisions) and **alias analysis** (which memory locations may two pointers refer to) extend them, and abstract interpretation turns them into tools that prove the absence of run-time errors in whole programs.

::: summary
- A **data-flow analysis** assigns lattice values to block boundaries by equations relating each block's input and output through a **transfer function** and combining neighbours by a **meet**; liveness is backward with union, reaching definitions forward with union, available expressions forward with intersection.
- One **worklist solver** handles them all; it revisits only blocks whose inputs changed and, visiting blocks in reverse postorder, finishes acyclic CFGs in one pass.
- For monotone functions on a lattice of finite height $h$, the iteration terminates within $N + hE$ visits and yields the **maximal fixed point** ([[#thm-mfp]]); MFP is always a safe approximation of the **meet over all paths**, and equal to it for distributive frameworks such as gen/kill problems ([[#thm-mop]]).
- **Constant propagation** uses the lattice $\top$ / constants / $\bot$ of height 2; it is not distributive, so correlated values are lost at joins ([[#ex-nondistributive]]).
- On **SSA** form, constant propagation, copy propagation and dead-code elimination become sparse and simple; with branch folding they removed the debugging code and loop-invariant arithmetic of the opening example, and cut executed instructions by up to 45% on our tests.
- Optimisations are correct only relative to a semantics: deleting a dead division assumes division by zero is undefined. GCC's PRE and SCCP go further than our simple passes.
:::

## Exercises

::: exercise Live variables by hand {level=1 check="3"}
In the block `a = b + c; d = a * 2; b = d - e; return b`, how many variables are live at the start of the block? (Enter the number.)
::: solution
Work backwards from the end, where nothing is live (the block returns). `return b`: $\set{b}$. `b = d - e`: remove $b$, add $d, e$: $\set{d, e}$. `d = a * 2`: remove $d$, add $a$: $\set{a, e}$. `a = b + c`: remove $a$, add $b, c$: $\set{b, c, e}$. Three variables: $b$, $c$ and $e$. Equivalently, $\mathrm{use}(B) = \set{b, c, e}$ (read before being assigned) and $\mathrm{out}(B) = \emptyset$.
:::
:::

::: exercise Lattice heights {level=1 check="10"}
For constant propagation over a function with 5 variables, the lattice of a block boundary is the product of 5 copies of the one-variable lattice $\top$ / constants / $\bot$. What is its height? (Enter the number.)
::: solution
A strictly descending chain in a product lowers at least one component at each step, and each component can be lowered at most twice ($\top \to c \to \bot$). So the longest chain has $5 \times 2 = 10$ steps, and such a chain exists (lower one variable at a time). By [[#thm-mfp]], each block's value changes at most 10 times.
:::
:::

::: exercise Gen and kill {level=1}
For each statement, give its gen and kill sets for reaching definitions, where $d_1, \dots, d_5$ are the definitions in the program: $d_1\colon x = 1$, $d_2\colon y = x$, $d_3\colon x = y + 1$, $d_4\colon z = x$, $d_5\colon y = 0$. Then compute gen and kill for the block $d_1; d_2; d_3$.
::: solution
$d_1$: gen $\set{d_1}$, kill $\set{d_3}$ (the other definition of $x$). $d_2$: gen $\set{d_2}$, kill $\set{d_5}$. $d_3$: gen $\set{d_3}$, kill $\set{d_1}$. $d_4$: gen $\set{d_4}$, kill $\emptyset$. $d_5$: gen $\set{d_5}$, kill $\set{d_2}$. For the block $d_1; d_2; d_3$, compose the three functions in order. $\mathrm{gen} = \set{d_2, d_3}$: $d_1$ is generated but then killed by $d_3$ within the block. $\mathrm{kill}$ is every definition of $x$ or $y$, that is $\set{d_1, d_2, d_3, d_5}$; since the transfer function is $f(S) = \mathrm{gen} \cup (S \setminus \mathrm{kill})$, it is the same to write $f(S) = \set{d_2, d_3} \cup (S \setminus \set{d_1, d_5})$: an incoming $d_1$ or $d_5$ does not survive the block, an incoming $d_4$ does.
:::
:::

::: exercise Available expressions {level=2}
An expression $e$ such as `a + b` is **available** at a point if on every path to it $e$ has been computed and none of its operands has been assigned since. (a) Write the data-flow equations (direction, meet, gen, kill, boundary, initial value). (b) Explain why the initial value must be the set of all expressions rather than $\emptyset$. (c) Implement it with `solve` and run it on a loop of your choice.
::: solution
(a) Forward. $\mathrm{in}(r) = \emptyset$; $\mathrm{in}(B) = \bigcap_{P} \mathrm{out}(P)$; $\mathrm{out}(B) = \mathrm{gen}(B) \cup (\mathrm{in}(B) \setminus \mathrm{kill}(B))$, where $\mathrm{gen}(B)$ is the expressions computed in $B$ and not followed by an assignment to an operand within $B$, and $\mathrm{kill}(B)$ the expressions with an operand assigned in $B$. Initial value of non-entry blocks: $U$, the set of all expressions in the function.

(b) The meet is $\cap$, so $\top = U$. Starting from $\emptyset$ would give, on a loop, $\mathrm{in}(\text{header}) = \mathrm{out}(\text{preheader}) \cap \mathrm{out}(\text{latch}) = \dots \cap \emptyset = \emptyset$ forever: a fixed point, but not the maximal one, which loses every expression available around the loop. [[#thm-mfp]] requires starting from $\top$.

(c)

```python
def available(blocks):
    exprs = lambda i: {(i[2], i[3], i[4])} if i[0] == "op" else set()
    U = set().union(*(exprs(i) for ins in blocks.values() for i in ins))
    def transfer(b, s):
        s = set(s)
        for i in blocks[b]:
            s |= exprs(i)
            if defs(i): s = {e for e in s if i[1] not in e[1:]}   # operand changed
        return s
    return solve(blocks, True, transfer,
                 lambda vs: set.intersection(*vs) if vs else set(), set(), U)
```

The boundary is included in the meet for the entry (it is passed as one of the values), so the entry gets $\emptyset$. Note the order in `transfer`: an instruction `a = a + 1` first generates `a + 1` and then kills it. On the loop `while i < 10 { s = s + a * b; i = i + 1; }` (with `a = 3; b = 4` before it) the result is empty at the start of every block: `a * b` is computed only inside the loop, so it is not available on the entry path into the header. That is exactly a *partial* redundancy — available around the back edge but not on entry — which PRE or loop-invariant code motion removes by computing `a * b` once before the loop.
:::
:::

::: exercise Local value numbering {level=2}
Write a function that performs common-subexpression elimination within one basic block by value numbering: assign each operand a value number, look up each `op` instruction's key `(op, vn(x), vn(y))` (with the operands sorted for commutative operators), and replace a repeated computation by a copy from the variable that holds the value. Apply it by hand to `t1 = a + b; t2 = b + a; a = 7; t3 = a + b; t4 = t1 * t2`.
::: solution
```python
def lvn(block):
    vn, table, holder, out = {}, {}, {}, []      # var -> number; key -> number; number -> var
    def num(x):
        if x not in vn: vn[x] = len(vn) + len(table); holder.setdefault(vn[x], x)
        return vn[x]
    for i in block:
        if i[0] == "op":
            a, b = num(i[3]), num(i[4])
            key = (i[2],) + (tuple(sorted((a, b))) if i[2] in "+*" else (a, b))
            if key in table and holder.get(table[key]) is not None and vn.get(holder[table[key]]) == table[key]:
                out.append(("=", i[1], holder[table[key]])); vn[i[1]] = table[key]; continue
            table[key] = vn[i[1]] = len(vn) + len(table); holder[vn[i[1]]] = i[1]
        elif i[0] == "=":
            vn[i[1]] = num(i[2])
        out.append(i)
    return out
```

The test `vn.get(holder[…]) == …` checks that the variable holding the value has not been reassigned since. By hand: $a \mapsto 0$, $b \mapsto 1$; `t1 = a + b` has key $(+, 0, 1)$, new value 2 held by $t_1$. `t2 = b + a`: key $(+, 0, 1)$ again (sorted), so it becomes `t2 = t1`. `a = 7`: $a$ gets a new number (that of the constant 7). `t3 = a + b`: key $(+, 3, 1)$ — new, computed. `t4 = t1 * t2`: both have value 2, key $(*, 2, 2)$, new. Result: `t1 = a + b; t2 = t1; a = 7; t3 = a + b; t4 = t1 * t2`, and copy propagation then turns the last into `t4 = t1 * t1`.
:::
:::

::: exercise Distributivity {level=2}
(a) Prove that every gen/kill transfer function $f(x) = g \cup (x \setminus k)$ distributes over both $\cup$ and $\cap$. (b) Prove that the composition of distributive functions is distributive, so that block transfer functions built from instructions are distributive. (c) Give a two-instruction block for which the constant-propagation transfer function is not distributive, other than the one in [[#ex-nondistributive]].
::: solution
(a) $f(x \cup y) = g \cup ((x \cup y) \setminus k) = g \cup (x \setminus k) \cup (y \setminus k) = f(x) \cup f(y)$, since set difference distributes over union. For intersection: $f(x) \cap f(y) = (g \cup (x \setminus k)) \cap (g \cup (y \setminus k)) = g \cup ((x \setminus k) \cap (y \setminus k)) = g \cup ((x \cap y) \setminus k) = f(x \cap y)$, using the distributive law $(g \cup A) \cap (g \cup B) = g \cup (A \cap B)$.

(b) $(f \circ g)(x \sqcap y) = f(g(x) \sqcap g(y)) = f(g(x)) \sqcap f(g(y))$.

(c) Take the block `z = x - y; w = z * 3` with inputs $\set{x \mapsto 1, y \mapsto 1}$ and $\set{x \mapsto 2, y \mapsto 2}$: separately $z = 0, w = 0$ on both, whose meet is $z = 0, w = 0$; on the meet $\set{x \mapsto \bot, y \mapsto \bot}$ the block gives $z = \bot, w = \bot$. Any operation whose result is the same for correlated but different inputs shows the loss.
:::
:::

::: exercise Conditional constant propagation {level=3 #ex-sccp}
Implement SCCP for our SSA IR: keep a set of executable CFG edges (initially none) and of reachable blocks (initially the entry); evaluate only instructions in reachable blocks; for a φ, take the meet only over operands whose incoming edges are executable; for a branch, mark the edge(s) consistent with the current lattice values of its operands as executable (none if an operand is $\top$, both if one is $\bot$). Run it on `h` from the text and show that it finds `x` constant. Explain why the result is still a sound approximation.
::: solution
```python
def sccp(blocks, params):
    """Conditional constant propagation: only executable edges feed φs and branches."""
    val = {p: NAC for p in params}
    get = lambda x: val.get(x, UNDEF) if isinstance(x, str) else (UNDEF if x is None else x)
    entry = next(iter(blocks)); live = {entry}; edges = set()
    changed = True
    while changed:
        changed = False
        for b in list(live):
            for i in blocks[b]:
                if i[0] == "phi":                    # only operands on executable edges
                    new = UNDEF
                    for p, v in i[2].items():
                        if (p, b) in edges: new = meet_val(new, get(v))
                elif i[0] == "=": new = get(i[2])
                elif i[0] == "op":
                    x, y = get(i[3]), get(i[4])
                    new = (NAC if NAC in (x, y) else UNDEF if UNDEF in (x, y) else
                           NAC if i[2] in ("/", "%") and y == 0 else int(OPS[i[2]](x, y)))
                elif i[0] == "call": new = NAC
                else:
                    if i[0] == "jmp": targets = [i[1]]
                    elif i[0] == "br":
                        x, y = get(i[2]), get(i[3])
                        targets = ([] if UNDEF in (x, y) else list(i[4:6]) if NAC in (x, y)
                                   else [i[4] if OPS[i[1]](x, y) else i[5]])
                    else: targets = []
                    for t in targets:
                        if (b, t) not in edges: edges.add((b, t)); live.add(t); changed = True
                    continue
                if new != get(i[1]): val[i[1]] = new; changed = True
    return {v: c for v, c in val.items() if c not in (UNDEF, NAC)}, live
```

On `h` in SSA form, `ssa_constants` returns `{'x_0': 1, 'x_2': 2}`, while `sccp` returns `({'x_0': 1, 'x_1': 1, 'x_3': 1}, {'B0', 'L1', 'L2', 'L6', 'L3'})`: $L_4$ is never reachable, so $x_2$ never feeds $x_3$, and $x_1 = 1 \sqcap x_3 = 1$. Soundness: values still only descend (a block or edge, once executable, stays so; a φ's operand set only grows), so the iteration terminates at a fixed point of the combined equations. An edge is executable in *some* real run only if the analysis marks it, by induction on the length of the run: the branch's operands in the run have values below their lattice values, so the edge taken is among those marked. Hence every value in a real run is described by the analysis, and folding the facts it finds is safe.
:::
:::

::: exercise A bound for the worklist algorithm {level=3}
(a) For liveness on a CFG with $N$ blocks, $E$ edges and $V$ variables, use [[#thm-mfp]] to bound the number of block visits, and the cost of each visit with bit-vector sets. (b) Show that for a CFG that is a single loop with $N$ blocks in a cycle, liveness can need about $2N$ visits even in the best order, and explain the role of the **loop-connectedness** $d$ (the maximum number of back edges on any acyclic path), for which Kam and Ullman showed that $d + 2$ passes in reverse postorder suffice for gen/kill problems.
::: solution
(a) The height of the lattice of subsets of $V$ variables is $V$, so at most $N + VE$ visits. Each visit computes a union over successors and the transfer function; with bit vectors of $V$ bits in words of $w$ bits, that is $O((1 + \lvert\mathrm{succ}\rvert) V / w)$ word operations. In practice the bound is far from tight: each variable's liveness travels along the CFG a few times, not $E$ times.

(b) In a cycle $B_1 \to B_2 \to \dots \to B_N \to B_1$ with a use of $v$ in $B_1$ and no definition, $v$ must become live everywhere, flowing backwards from $B_1$ to $B_N, B_{N-1}, \dots, B_2$. In reverse postorder for a backward problem (from $B_N$ down to $B_1$), the first pass visits $B_N, \dots, B_2$ before $B_1$'s live-in is known, so they learn nothing; then $B_1$ is visited; the second pass propagates $v$ around the whole cycle. A third pass (or, with the worklist, the revisits it triggers) confirms the fixed point: about $2N$ to $3N$ visits. In general, information needs one pass to flow along each acyclic segment between back edges, so the number of passes is governed by the number $d$ of back edges an acyclic path can cross; for structured programs $d$ is the loop-nesting depth, typically at most 3, which is why iterative data-flow analysis is fast in practice.
:::
:::
