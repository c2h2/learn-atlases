After semantic analysis the compiler holds a decorated abstract syntax tree: every name resolved, every expression typed. It could generate machine code from this tree directly, as the tiny compiler of [[compilers/compiler-structure]] did. But a tree is a poor form for most of what comes next. An optimiser wants to ask questions like "which assignments to `x` can reach this use?", "is this computation repeated on every path?", "can this value live in a register for the whole loop?" — questions about *control flow*, which in a tree is implicit in the nesting of `while` and `if` nodes and becomes awkward as soon as `break`, `continue`, `return`, short-circuit `&&` or `goto` are involved. And the back end wants operations that are close to machine instructions, one operation at a time, with every intermediate value named.

So compilers translate the tree into an **intermediate representation** (IR): a list of simple instructions, grouped into **basic blocks** connected by explicit edges in a **control-flow graph**. This chapter defines three-address code, lowers Mini's ASTs into it, and builds control-flow graphs. It then develops the most important IR of modern compilers, **static single assignment form** (SSA), in which every variable is assigned exactly once. SSA rests on the theory of **dominators**, which we compute by iterating to a fixed point, and on **dominance frontiers**, which tell us exactly where two definitions of a variable meet. We write a complete SSA construction in Python, test it with an IR interpreter, and compare it with what LLVM does to the same function.

## Three-address code

::: definition Three-address code {#def-tac}
**Three-address code** is a sequence of instructions, each performing at most one operation, of the forms
- $x = y$ (copy), $x = y \mathbin{\mathit{op}} z$ (binary operation), $x = \mathrm{call}\ f(y_1, \dots, y_k)$;
- $\mathbf{goto}\ L$, and $\mathbf{if}\ y \mathbin{\mathit{relop}} z\ \mathbf{goto}\ L_1\ \mathbf{else}\ L_2$;
- $\mathbf{return}\ y$; and labels $L{:}$,

where $x$ is a variable, $y$ and $z$ are variables or constants, and $\mathit{relop}$ is a comparison. Variables are the program's own variables and compiler-generated **temporaries** $t_1, t_2, \dots$, of which there is an unlimited supply.
:::

The name refers to the at most three operands ("addresses") per instruction. Every intermediate value of an expression now has a name: `a * b + c` becomes $t_1 = a * b$; $t_2 = t_1 + c$. Control is explicit: there are no nested statements, only jumps. Our branch instruction has two targets, which makes the control-flow graph easy to read off; many IRs instead have a conditional jump that falls through to the next instruction.

### Lowering Mini

Lowering is a recursive walk over the AST. Each statement emits instructions; each expression emits instructions and returns the **operand** (a variable name, a temporary or a constant) that holds its value. Conditions are translated into **jumping code**: instead of computing a Boolean value and then testing it, `cond(c, lt, lf)` emits instructions that jump to $L_t$ if $c$ is true and to $L_f$ otherwise. This makes the short-circuit semantics of `&&` and `||` automatic — the second operand is evaluated only if control reaches it — and avoids materialising Booleans that are only tested.

```python
    def stmt(self, s):
        k = s.kind
        if k == "block":
            for t in s.kids[0]: self.stmt(t)
        elif k in ("let", "assign"):
            self.emit("=", self.var_name(s.sym.name, s.sym.index), self.expr(s.kids[-1]))
        elif k == "exprstmt": self.expr(s.kids[0])
        elif k == "return": self.emit("ret", self.expr(s.kids[0]))
        elif k == "if":
            c, then, els = s.kids
            lt, lf, lend = self.label(), self.label(), self.label()
            self.cond(c, lt, lf if els else lend)
            self.emit("label", lt); self.stmt(then); self.emit("jmp", lend)
            if els: self.emit("label", lf); self.stmt(els); self.emit("jmp", lend)
            self.emit("label", lend)
        elif k == "while":
            ltest, lbody, lend = self.label(), self.label(), self.label()
            self.emit("jmp", ltest); self.emit("label", ltest)
            self.cond(s.kids[0], lbody, lend)
            self.emit("label", lbody); self.stmt(s.kids[1]); self.emit("jmp", ltest)
            self.emit("label", lend)

    def cond(self, c, lt, lf):               # jumping code for a Boolean expression
        if c.kind == "bin" and c.kids[0] in ("<", "<=", ">", ">=", "==", "!="):
            op, a, b = c.kids
            self.emit("br", op, self.expr(a), self.expr(b), lt, lf)
        elif c.kind == "bin" and c.kids[0] in ("&&", "||"):
            op, a, b = c.kids; mid = self.label()
            if op == "&&": self.cond(a, mid, lf)          # a false: whole thing false
            else: self.cond(a, lt, mid)                    # a true: whole thing true
            self.emit("label", mid); self.cond(b, lt, lf)
        elif c.kind == "un":                               # !e: swap the targets
            self.cond(c.kids[1], lf, lt)
        else:
            self.emit("br", "!=", self.expr(c), 0, lt, lf)
```

Variables are named by their source names, except that a name declared more than once in a function (shadowing) gets its symbol's unique number as a suffix, `x.3`, so that different variables never share an IR name. Expressions:

```python
    def expr(self, e):                       # returns an operand: a name or a constant
        k = e.kind
        if k == "num": return e.kids[0]
        if k == "bool": return int(e.kids[0])
        if k == "var": return self.var_name(e.sym.name, e.sym.index)
        if k == "call":
            args = [self.expr(a) for a in e.kids[1]]
            t = self.temp(); self.emit("call", t, e.kids[0], args); return t
        if k == "un":
            a = self.expr(e.kids[1]); t = self.temp()
            self.emit("op", t, "-", 0, a) if e.kids[0] == "-" else self.emit("op", t, "^", a, 1)
            return t
        if e.kids[0] in ("&&", "||") or e.type == "bool":   # Boolean value: via jumps
            t, lt, lf, lend = self.temp(), self.label(), self.label(), self.label()
            self.cond(e, lt, lf)
            self.emit("label", lt); self.emit("=", t, 1); self.emit("jmp", lend)
            self.emit("label", lf); self.emit("=", t, 0); self.emit("jmp", lend)
            self.emit("label", lend); return t
        op, a, b = e.kids
        x, y = self.expr(a), self.expr(b); t = self.temp()
        self.emit("op", t, op, x, y); return t
```

Booleans are represented as the integers $0$ and $1$ (so `!a` is $a \oplus 1$); a Boolean expression whose *value* is needed, as in `let b = x < y;`, is compiled by jumping code into assignments of $1$ and $0$. Here the type computed by the checker matters for the first time: it tells the lowering whether `==` compares Booleans or integers (both are the same machine comparison here, but in a language with floating point it would choose the instruction).

## Basic blocks and control-flow graphs

::: definition Basic block and control-flow graph {#def-cfg}
A **basic block** is a maximal sequence of instructions that is entered only at its first instruction and left only after its last: it contains no labels except possibly at the start and no jumps except possibly at the end. The **control-flow graph** (CFG) of a function is the directed graph whose vertices are its basic blocks, with an edge $B \to C$ if control can pass from the end of $B$ to the start of $C$ — because $B$ ends with a jump to $C$, or a branch one of whose targets is $C$. The block containing the first instruction is the **entry**.
:::

Within a block, instructions execute one after another, every time; all the interesting decisions are on the edges. To find the blocks, mark as a **leader** the first instruction, every labelled instruction, and every instruction following a jump, branch or return; each block runs from a leader up to the next one. Our implementation also makes fall-through explicit, adding `goto L` at the end of a block that runs into a label, so that every block ends with `goto`, `if … goto … else …` or `return`, and removes blocks that cannot be reached from the entry (code after a `return`, for instance).

```python
def basic_blocks(code):
    """Split linear code into blocks: a dict label -> list of instructions, in order."""
    blocks, order, cur = {}, [], None
    for ins in code:
        if ins[0] == "label":
            if cur is not None and (not blocks[cur] or blocks[cur][-1][0] not in ("jmp", "br", "ret")):
                blocks[cur].append(("jmp", ins[1]))     # make fall-through explicit
            cur = ins[1]; blocks[cur] = []; order.append(cur)
        else:
            if cur is None or blocks[cur] and blocks[cur][-1][0] in ("jmp", "br", "ret"):
                cur = f"B{len(order)}"; blocks[cur] = []; order.append(cur)
            blocks[cur].append(ins)
    reach, work = {order[0]}, [order[0]]               # drop unreachable blocks
    while work:
        for s in successors(blocks[work.pop()]):
            if s not in reach: reach.add(s); work.append(s)
    return {b: blocks[b] for b in order if b in reach}

def successors(block):
    last = block[-1] if block else ("ret", 0)
    return {"jmp": [last[-1]], "br": list(last[4:6])}.get(last[0], [])

def predecessors(blocks):
    preds = {b: [] for b in blocks}
    for b, ins in blocks.items():
        for s in successors(ins): preds[s].append(b)
    return preds
```

::: example Euclid's algorithm as a control-flow graph {#ex-gcd-cfg}
Lower `gcd` and `main` from [[compilers/semantic-analysis#ex-gcd-ast]] and draw the CFG of `gcd`.
::: solution
```text
gcd ['a', 'b']
B0:
    goto L1
L1:
    if b != 0 goto L2 else L3
L2:
    t1 = a % b
    t = t1
    a = b
    b = t
    goto L1
L3:
    return a
main []
B0:
    t1 = call gcd(1071, 462)
    t2 = call print(t1)
    return 0
```

The CFG of `gcd` has four blocks and the edges $B_0 \to L_1$, $L_1 \to L_2$, $L_1 \to L_3$ and $L_2 \to L_1$; the last is the loop's **back edge**. The `while` loop has become a test block $L_1$ and a body $L_2$; the `let t` has become an ordinary assignment, its scope having done its job. The copy `t = t1` is the price of a naive lowering (the `%` result goes into a temporary first); [[compilers/dataflow-optimisation]] removes such copies.
:::
:::

To test every transformation from here on, we use an **interpreter** for the IR. It runs a function block by block, keeping variables in a dictionary; `print` appends to an output list. (The handling of φ-instructions is explained below.)

```python
def tdiv(a, b):                             # division truncating towards zero, as in C
    q = abs(a) // abs(b); return q if (a < 0) == (b < 0) else -q
OPS = {"+": lambda a, b: a + b, "-": lambda a, b: a - b, "*": lambda a, b: a * b,
       "/": tdiv, "%": lambda a, b: a - tdiv(a, b) * b, "^": lambda a, b: a ^ b,
       "<": lambda a, b: a < b, "<=": lambda a, b: a <= b, ">": lambda a, b: a > b,
       ">=": lambda a, b: a >= b, "==": lambda a, b: a == b, "!=": lambda a, b: a != b}

def run(ir, fname, args, out):
    params, blocks = ir[fname]
    env = dict(zip(params, args))
    val = lambda x: env[x] if isinstance(x, str) else x
    label, prev = next(iter(blocks)), None
    while True:
        ins_list = blocks[label]
        phis = {i[1]: val(i[2][prev]) for i in ins_list if i[0] == "phi"}
        env.update(phis)                    # all φs of a block read their inputs together
        for ins in ins_list:
            k = ins[0]
            if k != "phi": run.count += 1         # instructions executed (φs are free)
            if k == "=": env[ins[1]] = val(ins[2])
            elif k == "op": env[ins[1]] = int(OPS[ins[2]](val(ins[3]), val(ins[4])))
            elif k == "call":
                a = [val(x) for x in ins[3]]
                if ins[2] == "print": out.append(a[0]); env[ins[1]] = a[0]
                else: env[ins[1]] = run(ir, ins[2], a, out)
            elif k == "ret": return val(ins[1])
            elif k == "jmp": prev, label = label, ins[1]
            elif k == "br":
                prev, label = label, ins[4] if OPS[ins[1]](val(ins[2]), val(ins[3])) else ins[5]
run.count = 0
```

Running `main` of the `gcd` program prints `[21]`. (The interpreter uses Python's unbounded integers; the 64-bit wrap-around of [[compilers/compiler-structure]] matters only for overflowing programs, which our tests avoid.) A set of seven test programs — Euclid, factorial, short-circuit logic, Collatz, nested loops with mutual recursion, a swap loop and an eight-argument function — runs with the same output after every transformation in this chapter and the next.

::: widget graph
nodes: B0@0,2; L1@2,2; L2@4,2; L4@6,1; L5@6,3; L6@8,2; L3@2,4
edges: B0>L1; L1>L2; L1>L3; L2>L4; L2>L5; L4>L6; L5>L6; L6>L1
algorithm: dfs
start: B0
caption: The control-flow graph of the Collatz function of [[#ex-collatz]]: the loop test $L_1$, the body's `if` in $L_2$ with its two branches $L_4$ and $L_5$, the join $L_6$ that increments `steps`, and the exit $L_3$. Step through the depth-first search from the entry. The edge $L_6 \to L_1$ reaches a vertex still on the DFS stack — a back edge, the loop. $L_6$ and $L_1$ are the **join points** (two predecessors each); they are where SSA form will need φ-functions.
:::

## Dominators

Many questions about a CFG reduce to one relation.

::: definition Dominance {#def-dom}
In a CFG with entry $r$, block $d$ **dominates** block $n$, written $d \mathrel{\mathrm{dom}} n$, if every path from $r$ to $n$ passes through $d$. Every block dominates itself; $d$ **strictly dominates** $n$ if $d \mathrel{\mathrm{dom}} n$ and $d \ne n$. The **immediate dominator** $\mathrm{idom}(n)$ of $n \ne r$ is the strict dominator of $n$ that is dominated by every other strict dominator of $n$. The **dominator tree** has an edge $\mathrm{idom}(n) \to n$ for every $n \ne r$.
:::

In the Collatz CFG, $L_1$ (the loop test) dominates every block of the loop and the exit: you cannot get anywhere without testing the condition first. $L_2$ dominates $L_4$, $L_5$ and $L_6$, but $L_4$ does not dominate $L_6$, because the path through $L_5$ avoids it. Dominance captures "must have executed before", which is what an optimiser needs: a computation in $d$ is available in every block $d$ dominates, and a loop is a set of blocks dominated by its header.

::: lemma The dominators of a block form a chain {#lem-dom-chain}
If $d_1$ and $d_2$ both dominate $n$, then $d_1$ dominates $d_2$ or $d_2$ dominates $d_1$. Consequently every block $n \ne r$ has exactly one immediate dominator, and the dominator tree is a tree rooted at $r$.
:::

::: proof
Take any path from $r$ to $n$ that is **simple** (no repeated block); it contains both $d_1$ and $d_2$; say $d_1$ occurs first. Suppose $d_1$ does not dominate $d_2$: then there is a path $P$ from $r$ to $d_2$ avoiding $d_1$. Follow $P$ to $d_2$, then the part of our simple path from $d_2$ to $n$, which comes after $d_1$ and so does not contain $d_1$. The result is a path from $r$ to $n$ that avoids $d_1$, contradicting $d_1 \mathrel{\mathrm{dom}} n$. So $d_1$ dominates $d_2$.

Hence the strict dominators of $n$ are totally ordered by dominance (dominance is reflexive, transitive, and antisymmetric: if $d_1 \mathrel{\mathrm{dom}} d_2$ and $d_2 \mathrel{\mathrm{dom}} d_1$ with $d_1 \ne d_2$, a simple path to $d_2$ would contain $d_1$ before it and vice versa). They form a finite chain $r = d_0, d_1, \dots, d_k$, each dominating the next, and its last element is the unique immediate dominator. Every non-root block has one parent in the tree, and following parents leads to $r$, so the dominator tree is a tree.
:::

Dominance can be computed from a set equation in the style of [[compilers/top-down-parsing#thm-ff-fixpoint]]: a block's dominators are itself plus those blocks that dominate *all* its predecessors.

$$
\mathrm{Dom}(r) = \set{r}, \qquad \mathrm{Dom}(n) = \set{n} \cup \bigcap_{p \in \mathrm{pred}(n)} \mathrm{Dom}(p) \quad (n \ne r).
$$ {#eq-dom}

The equations have several solutions — on a loop, a block can "assume" anything about itself — and the dominator sets are the *largest*. So we iterate from the top: start with every set full and shrink until nothing changes.

```python
def dominators(blocks):
    preds, nodes = predecessors(blocks), list(blocks)
    entry = nodes[0]
    dom = {b: set(nodes) for b in nodes}; dom[entry] = {entry}
    changed = True
    while changed:
        changed = False
        for b in nodes[1:]:
            new = {b} | set.intersection(*(dom[p] for p in preds[b]))
            if new != dom[b]: dom[b] = new; changed = True
    return dom

def idoms(dom):
    """The immediate dominator: the strict dominator dominated by all the others."""
    return {b: next(d for d in ds - {b} if dom[d] == ds - {b})
            for b, ds in dom.items() if len(ds) > 1}
```

The immediate dominator of $n$ is the strict dominator $d$ whose own dominator set is $\mathrm{Dom}(n) \setminus \set{n}$: by [[#lem-dom-chain]] the strict dominators form a chain, and only its last element is dominated by all the others.

::: theorem The iteration computes the dominators {#thm-dom-iter}
Assume every block is reachable from $r$. The iteration above terminates, and on termination $\mathrm{dom}[n]$ is exactly the set of dominators of $n$ for every block $n$.
:::

::: proof
*Termination.* Each update replaces a set by a new value, and the new value is never larger than the old one: by induction, all sets only shrink, since they start full and the right-hand side of [[#eq-dom]] is monotone (smaller sets on the right give smaller results). A set of $N$ blocks can shrink at most $N$ times, so there are at most $N^2$ changes and $N^2 + 1$ rounds.

*Every dominator stays in the set.* Let $D(n)$ be the true dominator set. We show $D(n) \subseteq \mathrm{dom}[n]$ at all times, by induction on the updates. Initially the sets are full (and $\mathrm{dom}[r] = \set{r} = D(r)$). At an update of $n$: if $d \in D(n)$ and $d \ne n$, then $d$ dominates every predecessor $p$ of $n$ (a path from $r$ to $p$ avoiding $d$, followed by the edge $p \to n$, would avoid $d$), so by the induction hypothesis $d \in \mathrm{dom}[p]$ for every $p$, and $d$ is in the intersection.

*Every element of the final sets is a dominator.* At termination the sets satisfy [[#eq-dom]]. Suppose $d \in \mathrm{dom}[n]$ but some path $r = v_0, v_1, \dots, v_k = n$ avoids $d$. Walking backwards along the path from $n$: $d \in \mathrm{dom}[v_k]$ and $d \ne v_k$, so by the equation $d \in \mathrm{dom}[v_{k-1}]$ (as $v_{k-1}$ is a predecessor), and so on, until $d \in \mathrm{dom}[v_0] = \set{r}$, so $d = r$ — but every path from $r$ contains $r$. Contradiction.
:::

::: example Dominators of the Collatz loop {#ex-collatz-dom}
Compute dominators, immediate dominators and the dominator tree for the Collatz CFG (predecessors: $L_1 \leftarrow B_0, L_6$; $L_2 \leftarrow L_1$; $L_4, L_5 \leftarrow L_2$; $L_6 \leftarrow L_4, L_5$; $L_3 \leftarrow L_1$).
::: solution
Processing the blocks in the order $L_1, L_2, L_4, L_5, L_6, L_3$, the first round gives $\mathrm{Dom}(L_1) = \set{L_1} \cup (\set{B_0} \cap \text{all}) = \set{B_0, L_1}$, then $\set{B_0, L_1, L_2}$ for $L_2$; $\set{B_0, L_1, L_2, L_4}$ and $\set{B_0, L_1, L_2, L_5}$; for $L_6$, $\set{L_6} \cup (\mathrm{Dom}(L_4) \cap \mathrm{Dom}(L_5)) = \set{B_0, L_1, L_2, L_6}$; and $\set{B_0, L_1, L_3}$. The second round changes nothing (the program reports set sizes $1, 2, 3, 4, 4, 4, 3$ after both rounds). Immediate dominators: $\mathrm{idom}(L_1) = B_0$, $\mathrm{idom}(L_2) = \mathrm{idom}(L_3) = L_1$, and $\mathrm{idom}(L_4) = \mathrm{idom}(L_5) = \mathrm{idom}(L_6) = L_2$. Note that $L_6$'s immediate dominator is $L_2$, not either of its predecessors. One round sufficed because the blocks were processed in an order in which predecessors come first, except along the back edge, whose source $L_6$ already had its final set when $L_1$ was revisited.
:::
:::

::: widget graph
nodes: B0@0,0; L1@2,0; L2@4,0; L3@2,2; L4@6,-1; L5@6,0; L6@6,1
edges: B0>L1; L1>L2; L1>L3; L2>L4; L2>L5; L2>L6
algorithm: bfs
start: B0
caption: The dominator tree of the Collatz CFG from [[#ex-collatz-dom]]: each block's parent is its immediate dominator. Breadth-first search from $B_0$ visits the blocks level by level; the dominators of a block are exactly the blocks on its tree path from the root. Compare with the CFG figure: the CFG edges $L_4 \to L_6$ and $L_5 \to L_6$ are not tree edges, because neither branch dominates the join. The renaming phase of SSA construction walks this tree.
:::

The simple iteration costs $O(N^2)$ set operations in the worst case, which is fine for most functions. Cooper, Harvey and Kennedy (2001) showed that the same iteration, with the sets represented implicitly by the dominator tree and the blocks visited in reverse postorder, is fast in practice; the Lengauer–Tarjan algorithm (1979) computes dominators in almost linear time and is used by LLVM and GCC for large functions.

::: quiz
In a CFG with blocks $A$ (entry), $B$, $C$, $D$ and edges $A \to B$, $A \to C$, $B \to D$, $C \to D$, $D \to B$, what is $\mathrm{idom}(D)$, and what is $\mathrm{idom}(B)$?
- [ ] $\mathrm{idom}(D) = B$ and $\mathrm{idom}(B) = A$
- [x] $\mathrm{idom}(D) = A$ and $\mathrm{idom}(B) = A$
- [ ] $\mathrm{idom}(D) = C$ and $\mathrm{idom}(B) = D$
- [ ] $D$ has two immediate dominators, $B$ and $C$
::: solution
$D$ can be reached by $A \to B \to D$ and by $A \to C \to D$, so neither $B$ nor $C$ dominates it; only $A$ does (and $D$ itself). $B$ can be reached directly from $A$ or by $A \to C \to D \to B$, so $D$ does not dominate $B$; again only $A$. Immediate dominators are unique ([[#lem-dom-chain]]). This CFG is a loop $B \to D \to B$ with two entries ($B$ from $A$, $D$ from $C$): an **irreducible** loop, with no single header that dominates it.
:::
:::

## Static single assignment form

In three-address code a variable such as `n` in the Collatz loop is assigned in three places, and a use of `n` may receive its value from any of them, depending on the path taken. Every optimisation that reasons about values must work out *which* assignment reaches *which* use — the reaching-definitions problem of [[compilers/dataflow-optimisation]]. Static single assignment form builds the answer into the program.

::: definition Static single assignment form {#def-ssa}
A program is in **static single assignment** (SSA) form if every variable is assigned in exactly one place in the program text. Where control-flow paths carrying different versions of a variable meet, a **φ-function** $v = \varphi(B_1{:}\ v_1, \dots, B_k{:}\ v_k)$ at the start of a block with predecessors $B_1, \dots, B_k$ assigns to $v$ the value $v_i$ if control arrived from $B_i$. All φ-functions at the start of a block are evaluated **simultaneously**, on entry to the block, before any other instruction of the block.
:::

With only one definition per variable, the definition of every use is obvious, a variable's value never changes after it has been computed, and many optimisations become simple: constant propagation is "if $x = 5$ then every use of $x$ is 5", dead-code elimination is "delete a definition with no uses", and copy propagation is "after $x = y$ replace $x$ by $y$ everywhere". Converting to SSA requires deciding *where* to put φ-functions and then **renaming** each definition and use to a numbered version.

### Where to put φ-functions

A φ-function for $v$ is needed at a block $Y$ if two different definitions of $v$ can reach $Y$ along paths that meet for the first time at $Y$. The key concept is where a block's dominance "ends".

::: definition Dominance frontier {#def-df}
The **dominance frontier** $\mathrm{DF}(X)$ of a block $X$ is the set of blocks $Y$ such that $X$ dominates a predecessor of $Y$ but does not strictly dominate $Y$. For a set of blocks $S$, $\mathrm{DF}(S) = \bigcup_{X \in S} \mathrm{DF}(X)$, and the **iterated dominance frontier** $\mathrm{DF}^+(S)$ is the limit of $S_1 = \mathrm{DF}(S)$, $S_{i+1} = \mathrm{DF}(S \cup S_i)$.
:::

Informally, $\mathrm{DF}(X)$ is the set of the first blocks reached from $X$ where $X$'s influence is shared with other paths. In the Collatz CFG, $\mathrm{DF}(L_4) = \mathrm{DF}(L_5) = \set{L_6}$ — after either branch, the join; $\mathrm{DF}(L_6) = \set{L_1}$ — the loop header, which is also reached from $B_0$; and $\mathrm{DF}(L_1) = \mathrm{DF}(L_2) = \set{L_1}$: a loop header is in its own frontier, since it dominates the source of its back edge but does not *strictly* dominate itself.

::: lemma Paths leave a dominated region through its frontier {#lem-df-path}
If there is a path from $X$ to $Y$ and $X$ does not strictly dominate $Y$, then the path contains a block of $\mathrm{DF}(X)$ (possibly $Y$ itself).
:::

::: proof
Let the path be $X = p_0, p_1, \dots, p_k = Y$ with $k \ge 1$ (if $k = 0$, then $Y = X$; a path of length zero is excluded by "path", and if the path returns to $X$ the argument below applies to that occurrence). Let $i \ge 1$ be the first index such that $X$ does not strictly dominate $p_i$; it exists because $X$ does not strictly dominate $p_k$. Then $X$ dominates $p_{i-1}$: either $i = 1$ and $p_0 = X$, or $X$ strictly dominates $p_{i-1}$ by the choice of $i$. So $X$ dominates the predecessor $p_{i-1}$ of $p_i$ but does not strictly dominate $p_i$: by definition $p_i \in \mathrm{DF}(X)$.
:::

To compute frontiers, Cooper, Harvey and Kennedy observed that only a join point $Y$ (two or more predecessors) can be in a frontier, and that it is in $\mathrm{DF}(X)$ exactly for the blocks $X$ on the dominator-tree paths from each predecessor of $Y$ up to, but not including, $\mathrm{idom}(Y)$:

```python
def frontiers(blocks, idom):
    """Dominance frontiers (Cooper, Harvey and Kennedy's algorithm)."""
    preds, df = predecessors(blocks), {b: set() for b in blocks}
    for b in blocks:
        if len(preds[b]) >= 2:              # only join points can be in a frontier
            for p in preds[b]:
                runner = p
                while runner != idom.get(b):
                    df[runner].add(b); runner = idom.get(runner)
                    if runner is None: break
    return df
```

For the Collatz CFG the program prints `DF: {'B0': [], 'L1': ['L1'], 'L2': ['L1'], 'L4': ['L6'], 'L5': ['L6'], 'L6': ['L1'], 'L3': []}`, as computed by hand above.

::: algorithm Construction of SSA form (Cytron et al.) {#alg-ssa}
1. Compute the dominator tree and the dominance frontiers.
2. **φ-placement.** For each variable $v$, let $\mathrm{Defs}(v)$ be the set of blocks that assign $v$ (with the entry counted as defining every parameter). Place a φ-function for $v$ at the start of every block in $\mathrm{DF}^+(\mathrm{Defs}(v))$, computed with a worklist: a block that receives a φ for $v$ is itself a definition of $v$ and is added to the worklist.
3. **Renaming.** Walk the dominator tree depth first from the entry, keeping for each variable a stack of its current versions. In each block: give each φ-function and each assignment to $v$ a fresh version $v_i$ and push it; replace each use of $v$ by the version on top of $v$'s stack; then, for each CFG successor $S$, fill in this block's operand of each φ in $S$ with the current version. Recurse into the dominator-tree children, and on returning pop the versions pushed in this block.
:::

Step 2 is often refined. **Minimal** SSA places φs at the whole iterated frontier, even for variables that are dead there; **pruned** SSA places a φ for $v$ only where $v$ is live (using the liveness analysis of [[compilers/dataflow-optimisation]]); **semi-pruned** SSA (Briggs, Cooper, Harvey and Simpson, 1998) is a cheap compromise that ignores variables which are never used outside the block that defines them — in our IR, almost all temporaries. Our implementation does semi-pruning by default:

```python
def to_ssa(params, blocks, semi_pruned=True):
    dom = dominators(blocks); idom = idoms(dom); df = frontiers(blocks, idom)
    preds = predecessors(blocks)
    defs, glob = {}, set()                  # variable -> blocks that assign it
    for b, ins in blocks.items():
        killed = set()
        for i in ins:
            glob |= {x for x in uses(i) if isinstance(x, str) and x not in killed}
            if i[0] in ("=", "op", "call"): defs.setdefault(i[1], set()).add(b); killed.add(i[1])
    entry = next(iter(blocks))
    for p in params: defs.setdefault(p, set()).add(entry)
    phis = {b: {} for b in blocks}          # block -> {variable: φ instruction}
    for v, ds in defs.items():              # iterated dominance frontier of the defs
        if semi_pruned and v not in glob: continue   # used only in its own block
        work = list(ds)
        while work:
            for y in df[work.pop()]:
                if v not in phis[y]:
                    phis[y][v] = ["phi", v, {p: v for p in preds[y]}]
                    if y not in ds: work.append(y)
```

(`uses(i)` returns the operands that instruction `i` reads; `glob` collects the variables that are read in some block before being assigned there.) The renaming half of the function follows [[#alg-ssa]] step 3 directly:

```python
    children = {b: [c for c, d in idom.items() if d == b] for b in blocks}
    count, stack, new = {}, {v: [] for v in defs}, {}
    def fresh(v):
        count[v] = count.get(v, -1) + 1; name = f"{v}_{count[v]}"; stack[v].append(name); return name
    def use(x):                             # current version; None if no definition reaches
        if not (isinstance(x, str) and x in stack): return x
        return stack[x][-1] if stack[x] else None
    def rename(b):
        pushed = []
        out = [["phi", fresh(v), phi[2]] for v, phi in phis[b].items()]; pushed += list(phis[b])
        for i in blocks[b]:
            i = list(i)
            if i[0] == "op": i[3], i[4] = use(i[3]), use(i[4])
            elif i[0] in ("=", "ret"): i[-1] = use(i[-1])
            elif i[0] == "call": i[3] = [use(x) for x in i[3]]
            elif i[0] == "br": i[2], i[3] = use(i[2]), use(i[3])
            if i[0] in ("=", "op", "call"): pushed.append(i[1]); i[1] = fresh(i[1])
            out.append(i)
        new[b] = out
        for s in successors(blocks[b]):     # fill in this block's operand of each φ in s
            for v, phi in phis[s].items(): phi[2][b] = use(v)
        for c in children[b]: rename(c)
        for v in pushed: stack[v].pop()
    for p in params: fresh(p)               # parameters: version 0, defined on entry
    new_params = [stack[p][-1] for p in params]
    rename(entry)
    return new_params, {b: [tuple(i) for i in new[b]] for b in blocks}
```

A use with no reaching definition (possible only for a variable that is undefined on some path into a φ) gets the operand `None`, printed `undef`.

::: example SSA form of the Collatz function {#ex-collatz}
Convert this function to SSA form, count the φ-functions in minimal and semi-pruned SSA, and run both versions.

```text
fn collatz(n: int) -> int {
    let steps = 0;
    while n != 1 {
        if n % 2 == 0 { n = n / 2; } else { n = 3 * n + 1; }
        steps = steps + 1;
    }
    return steps;
}
```
::: solution
The three-address code (blocks in order) and the semi-pruned SSA form side by side:

```text
B0:                              B0:
    steps = 0                        steps_0 = 0
    goto L1                          goto L1
L1:                              L1:
                                     steps_1 = φ(B0: steps_0, L6: steps_2)
                                     n_1 = φ(B0: n_0, L6: n_4)
    if n != 1 goto L2 else L3        if n_1 != 1 goto L2 else L3
L2:                              L2:
    t1 = n % 2                       t1_0 = n_1 % 2
    if t1 == 0 goto L4 else L5       if t1_0 == 0 goto L4 else L5
L4:                              L4:
    t2 = n / 2                       t2_0 = n_1 / 2
    n = t2                           n_2 = t2_0
    goto L6                          goto L6
L5:                              L5:
    t3 = 3 * n                       t3_0 = 3 * n_1
    t4 = t3 + 1                      t4_0 = t3_0 + 1
    n = t4                           n_3 = t4_0
    goto L6                          goto L6
L6:                              L6:
                                     n_4 = φ(L4: n_2, L5: n_3)
    t5 = steps + 1                   t5_0 = steps_1 + 1
    steps = t5                       steps_2 = t5_0
    goto L1                          goto L1
L3:                              L3:
    return steps                     return steps_1
```

φ-placement for `n`: $\mathrm{Defs}(n) = \set{B_0, L_4, L_5}$ (the entry defines the parameter). $\mathrm{DF}(L_4) \cup \mathrm{DF}(L_5) = \set{L_6}$, so $L_6$ gets a φ and joins the worklist; $\mathrm{DF}(L_6) = \set{L_1}$, so $L_1$ gets one; $\mathrm{DF}(L_1) = \set{L_1}$ adds nothing new. For `steps`: $\mathrm{Defs} = \set{B_0, L_6}$, giving $L_1$. Three φs. Minimal SSA also places φs for the five temporaries $t_1, \dots, t_5$, at $L_1$ and (for $t_2$, $t_3$, $t_4$) also at $L_6$ — 11 φs in all, eight of them with dead results and `undef` operands from $B_0$. Renaming walks the dominator tree $B_0, L_1, L_2, \{L_4, L_5, L_6\}, L_3$: when $L_4$ is renamed, the top of `n`'s stack is $n_2$, and it becomes $L_6$'s φ operand for $L_4$; then $n_2$ is popped before $L_5$ is visited. The IR interpreter prints `[111]` for `collatz(27)` before conversion, in minimal SSA and in semi-pruned SSA.
:::
:::

### Why this is correct

The renaming phase gives each use the version defined by the *nearest dominating* definition — on top of the stack, because the walk follows the dominator tree. That this is the right value on *every* path is the content of the next theorem. It is here that the dominance frontier earns its place: without a φ at the frontier, a definition could "leak" out of its dominated region and reach uses that do not see it on top of their stacks.

::: theorem Single reaching definition {#thm-ssa}
After φ-placement at $\mathrm{DF}^+(\mathrm{Defs}(v))$ (with the entry treated as defining $v$), let $u$ be a use of $v$ and let $d$ be the definition of $v$ (an assignment or a φ) that dominates $u$ most closely. Then on every path from the entry to $u$, the last definition of $v$ before $u$ is $d$. Consequently the renamed program computes the same values as the original.
:::

::: proof
The closest dominating definition exists, since the entry defines $v$ and dominates everything, and it is unique: definitions dominating $u$ lie in blocks dominating $u$, which form a chain ([[#lem-dom-chain]]); within a block, the instruction order decides. Take any path from the entry to $u$, and let $X$ be the last definition of $v$ on it before $u$. Suppose $X \ne d$.

*Case 1: $X$ does not dominate $u$.* Then the block of $X$ does not strictly dominate the block of $u$ (if it dominated it strictly, $X$ would dominate $u$). The part of the path after $X$ goes from $X$'s block to $u$'s block, so by [[#lem-df-path]] it passes through a block $Z \in \mathrm{DF}(\mathrm{block}(X)) \subseteq \mathrm{DF}^+(\mathrm{Defs}(v))$ — note that the blocks of φs are themselves added to the defining set, so the frontier of a φ's block is included too. $Z$ has a φ for $v$ at its start, which is a definition of $v$ on the path after $X$ (if $Z$ is $u$'s own block, the φ still precedes $u$). This contradicts the choice of $X$.

*Case 2: $X$ dominates $u$.* Both $X$ and $d$ dominate $u$, and $d$ is the closest, so $X$ strictly dominates $d$. Since $d$ dominates $u$, the path must contain $d$; since no definition follows $X$, $d$ occurs only before the last occurrence of $X$. So the path from that occurrence of $X$ to $u$ avoids $d$. And since $X$ strictly dominates $d$, $d$ does not dominate $X$, so some path from the entry to $X$ avoids $d$. Joining the two gives a path from the entry to $u$ avoiding $d$, contradicting $d \mathrel{\mathrm{dom}} u$.

So $X = d$ on every path. The original program, at $u$, reads the value assigned by the last definition on the path taken; the renamed program reads $d$'s version, assigned by the same definition. φ-functions forward the version of the predecessor actually taken, which is again the last definition on the path to the end of that predecessor. By induction along the execution, every variable read has the same value in both programs.
:::

Cytron, Ferrante, Rosen, Wegman and Zadeck (1991) also proved that $\mathrm{DF}^+$ is exactly the set of blocks where two distinct definitions of $v$ first meet, so minimal SSA has no superfluous φs in that sense (they may still be dead); they also observed that in practice the number of φs grows linearly with the size of the program, although $\Theta(N^2)$ φs are possible in contrived cases.

## Using and leaving SSA

Production compilers are built around SSA. LLVM IR is in SSA form throughout (for registers; memory is not), GCC's GIMPLE is converted to SSA early in its pipeline (the pass `tree-ssa` of [[compilers/compiler-structure]]), and so are the IRs of the HotSpot, V8 and Go compilers. Clang does not build SSA itself: it emits every local variable as a stack slot (`alloca`) with loads and stores, and LLVM's `mem2reg` pass promotes the slots to SSA registers using exactly the dominance-frontier construction above.

::: example What LLVM makes of Euclid {#ex-llvm-gcd}
Compile `long gcd(long a, long b)` with the loop of [[#ex-gcd-cfg]] (in C) with Clang 21.1 at `-O0` and then run LLVM's `mem2reg` pass alone:

```console
$ clang -O0 -Xclang -disable-O0-optnone -S -emit-llvm -fno-discard-value-names gcd.c -o gcd.ll
$ opt -S -passes=mem2reg gcd.ll
```
::: solution
```text
define dso_local i64 @gcd(i64 noundef %a, i64 noundef %b) #0 {
entry:
  br label %while.cond

while.cond:                                       ; preds = %while.body, %entry
  %b.addr.0 = phi i64 [ %b, %entry ], [ %rem, %while.body ]
  %a.addr.0 = phi i64 [ %a, %entry ], [ %b.addr.0, %while.body ]
  %cmp = icmp ne i64 %b.addr.0, 0
  br i1 %cmp, label %while.body, label %while.end

while.body:                                       ; preds = %while.cond
  %rem = srem i64 %a.addr.0, %b.addr.0
  br label %while.cond, !llvm.loop !6

while.end:                                        ; preds = %while.cond
  ret i64 %a.addr.0
}
```

The structure is ours: an entry that jumps to the loop test, φ-functions for `a` and `b` at the loop header (the only join point), the body and the exit. `mem2reg` has also folded the copies away during renaming — `a = b` became the φ operand `%b.addr.0`, and the variable `t` disappeared entirely, its value `%rem` flowing straight into `b`'s φ. Before the pass (without `-disable-O0-optnone`, as a normal `-O0` build), the same function has three `alloca`s, six loads and five stores. The flag stops Clang from marking the function `optnone`, which would make `opt` skip it.
:::
:::

Our own SSA, after the copy-propagation pass of [[#ex-copyprop]], looks exactly like LLVM's: `a_1 = φ(B0: a_0, L2: b_1)`, `b_1 = φ(B0: b_0, L2: t1_0)`. Note that $a_1$'s φ reads $b_1$ — the value of `b` *from the previous iteration* — while $b_1$ is being redefined by the φ next to it. This is only correct because φs at the start of a block are evaluated simultaneously, and it has a consequence when SSA must be turned back into ordinary code, as it must before register allocation or emission.

::: warning φ-functions are parallel copies
The obvious way to leave SSA — replace $v = \varphi(B_1{:}\,v_1, \dots)$ by a copy $v = v_i$ at the end of each predecessor $B_i$ — is wrong when the copies are done one after another. Take a loop that swaps two variables, `let t = a; a = b; b = t;`. After copy propagation its SSA has `a_1 = φ(B0: 1, L2: b_1)` and `b_1 = φ(B0: 2, L2: a_1)`: on each iteration, `a` gets the old `b` and `b` the old `a`. The naive translation puts `a_1 = b_1; b_1 = a_1` at the end of the loop body, and the second copy reads the *new* `a_1`. Our interpreter shows the difference: the swap function returns $12, 21, 12, 21$ for $n = 0, 1, 2, 3$ before conversion and in SSA, but $12, 22, 22, 22$ after naive conversion — the original value of `a` is lost. Correct translations sequentialise each block's set of parallel copies with care, using a temporary to break cycles such as $a \leftrightarrow b$ (the **swap problem**), and split **critical edges** (from a block with several successors to a block with several predecessors) so that there is a place to put copies that belong to one edge only (the **lost-copy problem**). Briggs, Cooper, Harvey and Simpson described both problems in 1998.
:::

::: history
Three-address code and quadruples go back to the earliest optimising compilers; Frances Allen's "Control flow analysis" (1970) and her work with John Cocke at IBM put the control-flow graph and its analysis at the centre of optimisation, and Reese Prosser introduced dominators for flow diagrams in 1959. Edward Lowry and C. W. Medlock used dominators in the FORTRAN H compiler (1969). Thomas Lengauer and Robert Tarjan published their fast dominator algorithm in 1979. Static single assignment form was developed at IBM by Barry Rosen, Mark Wegman and Kenneth Zadeck (with Bowen Alpern on value numbering) in 1988, and Ron Cytron, Jeanne Ferrante, Rosen, Wegman and Zadeck's "Efficiently computing static single assignment form and the control dependence graph" (*ACM TOPLAS*, 1991) gave the dominance-frontier construction used here. Keith Cooper, Timothy Harvey and Ken Kennedy's "A simple, fast dominance algorithm" (2001) gave the frontier computation we used. Chris Lattner and Vikram Adve built LLVM (2004) around an SSA IR; GCC adopted SSA (Tree SSA, by Diego Novillo and others) in version 4.0 in 2005.
:::

## Where this leads

[[compilers/dataflow-optimisation]] analyses these control-flow graphs — liveness, reaching definitions and available expressions as fixed points over lattices — and uses the results, together with SSA, to propagate constants and copies, eliminate dead and redundant code and move code out of loops. [[compilers/code-generation]] translates the optimised IR into x86-64 instructions and assigns its unlimited variables to the sixteen registers, using liveness to build an interference graph.

::: summary
- **Three-address code** ([[#def-tac]]) has one operation per instruction, named temporaries for intermediate values, and explicit jumps; conditions are lowered as **jumping code**, which implements short-circuit `&&` and `||`.
- A **basic block** is straight-line code entered at the top and left at the bottom; the **control-flow graph** ([[#def-cfg]]) connects blocks by possible transfers of control.
- $d$ **dominates** $n$ if every path from the entry to $n$ passes through $d$ ([[#def-dom]]); dominators form a chain, giving the **dominator tree** ([[#lem-dom-chain]]), and are the greatest fixed point of $\mathrm{Dom}(n) = \set{n} \cup \bigcap_p \mathrm{Dom}(p)$ ([[#thm-dom-iter]]).
- In **SSA form** ([[#def-ssa]]) every variable has one definition; **φ-functions** at join points choose a version according to the incoming edge, all at once.
- φ-functions go at the **iterated dominance frontier** of each variable's definitions ([[#def-df]], [[#alg-ssa]]); renaming along the dominator tree then gives every use its unique reaching definition ([[#thm-ssa]]). Semi-pruned SSA cut the Collatz example from 11 φs to 3.
- Leaving SSA must treat each block's φs as **parallel copies**; naive sequential copies break swaps.
:::

## Exercises

::: exercise Leaders and blocks {level=1 check="4"}
How many basic blocks does the following three-address code have? (Enter the number.)

```text
    i = 0
L1: if i >= n goto L3 else L2
L2: s = s + i
    i = i + 1
    goto L1
L3: return s
```
::: solution
Leaders: the first instruction (`i = 0`), the labelled instructions `L1`, `L2` and `L3`. Blocks: $\set{i = 0}$ (which falls through into $L_1$), $L_1$, $L_2$ (three instructions), $L_3$: four blocks, with edges $B_0 \to L_1$, $L_1 \to L_2$, $L_1 \to L_3$ and $L_2 \to L_1$.
:::
:::

::: exercise Jumping code {level=1}
Write the three-address code that `cond` produces for `if a < b || c == 0 && !d { x = 1; }` (with `d` a Boolean variable), labelling the then-part $L_t$ and the code after the `if` $L_e$. How many branch instructions are executed when $a < b$?
::: solution
`&&` binds tighter than `||`, so the condition is `a < b || (c == 0 && !d)`. With $M_1$ the label for the right operand of `||` and $M_2$ that for the right operand of `&&`:

```text
    if a < b goto Lt else M1
M1: if c == 0 goto M2 else Le
M2: if d != 0 goto Le else Lt      # !d: the targets are swapped
Lt: x = 1
    goto Le
Le: ...
```

When $a < b$, the first branch goes straight to $L_t$: one branch is executed, and `c == 0` and `!d` are never evaluated — short-circuit evaluation, for free.
:::
:::

::: exercise Dominance frontiers {level=1}
For the CFG with blocks $A$ (entry), $B$, $C$, $D$, $E$, $F$ and edges $A \to B$, $B \to C$, $B \to D$, $C \to E$, $D \to E$, $E \to B$, $E \to F$ (a loop $B \ldots E$ containing an `if`), Compute the immediate dominators and the dominance frontier of every block. If a variable $x$ is assigned only in $C$ (and is a parameter defined in $A$), where does minimal SSA place φ-functions for $x$?
::: solution
Immediate dominators: $B$: $A$; $C$, $D$, $E$: $B$ ($E$ is reached through $C$ or $D$, so only $B$ dominates it); $F$: $E$. Frontiers: $\mathrm{DF}(C) = \mathrm{DF}(D) = \set{E}$ ($C$ dominates itself, a predecessor of $E$, but not $E$); $\mathrm{DF}(E) = \set{B}$ ($E$ is a predecessor of $B$ and does not dominate $B$); $\mathrm{DF}(B) = \set{B}$ (via the back edge $E \to B$); $\mathrm{DF}(A) = \mathrm{DF}(F) = \emptyset$. For $x$ with $\mathrm{Defs} = \set{A, C}$: $\mathrm{DF}(C) = \set{E}$, then $\mathrm{DF}(E) = \set{B}$, then $\mathrm{DF}(B) = \set{B}$: φs at $E$ and $B$. Running `to_ssa` on this CFG (with $x$ as the parameter, minimal SSA) gives `x_1 = φ(A: x_0, E: x_3)` in $B$ and `x_3 = φ(C: x_2, D: x_1)` in $E$.
:::
:::

::: exercise Counting φ-functions {level=2 check="2"}
Lower `gcd` (as in [[#ex-gcd-cfg]]) and convert it to semi-pruned SSA. How many φ-functions are placed? (Enter the number.) How many does minimal SSA place, and why the difference?
::: solution
Semi-pruned SSA places $2$: `a_1` and `b_1` at the loop header $L_1$. Minimal SSA places $4$: also φs for `t` and `t1`, which are assigned in $L_2$ (whose frontier is $\set{L_1}$) but used only inside $L_2$ after their assignment, so the extra φs are dead and their operands from $B_0$ are `undef`. The program reports both counts.
:::
:::

::: exercise Dominators by iteration {level=2}
Show that the equations [[#eq-dom]] can have more than one solution, using the CFG $r \to a$, $a \to b$, $b \to a$, $a \to c$, and that the iteration from full sets finds the largest. What happens if you iterate from the sets $\mathrm{Dom}(n) = \set{n}$ instead?
::: solution
True dominators: $\mathrm{Dom}(a) = \set{r, a}$, $\mathrm{Dom}(b) = \set{r, a, b}$, $\mathrm{Dom}(c) = \set{r, a, c}$. Another solution: $\mathrm{Dom}(a) = \set{a}$? It would need $\set{a} = \set{a} \cup (\mathrm{Dom}(r) \cap \mathrm{Dom}(b)) = \set{a} \cup (\set{r} \cap \mathrm{Dom}(b))$, forcing $r \notin \mathrm{Dom}(b)$; then $\mathrm{Dom}(b) = \set{b} \cup \mathrm{Dom}(a) = \set{a, b}$, consistent. And $\mathrm{Dom}(c) = \set{a, c}$. So $\set{a}, \set{a, b}, \set{a, c}$ is a second solution (wrong: it claims $r$ does not dominate $a$). The iteration from full sets keeps every true dominator ([[#thm-dom-iter]]) and ends with the largest solution, the true one. Starting from singletons, the update of $a$ gives $\set{a} \cup (\set{r} \cap \set{b}) = \set{a}$, then $b$ and $c$ grow to $\set{a, b}$ and $\set{a, c}$, and the iteration stops at the second, wrong solution — because the true answer is the *greatest* fixed point, and iterating upwards from below finds the least one.
:::
:::

::: exercise Parallel copies {level=2}
At the end of a loop body, SSA destruction must perform the parallel copies $(a, b, c) \gets (b, c, a)$. Give a sequence of ordinary copies, using at most one extra temporary, that implements them, and describe a general algorithm for any set of parallel copies $(x_1, \dots, x_k) \gets (y_1, \dots, y_k)$ with distinct $x_i$.
::: solution
$t = a$; $a = b$; $b = c$; $c = t$. General method: build the graph with an edge $y_i \to x_i$ for each copy (each $x_i$ has one incoming edge). Repeatedly emit a copy $x_i = y_i$ whose destination $x_i$ is not the source of any remaining copy (it is safe to overwrite: nobody still needs its old value), and remove it. When no such copy exists, the remaining copies form disjoint cycles; break one by saving one variable of the cycle in a temporary ($t = x_j$), replacing $x_j$ by $t$ as a source, and continue. Each cycle costs one extra copy; acyclic chains cost none. (A copy $x = x$ is simply dropped.)
:::
:::

::: exercise Copy propagation in SSA {level=3 #ex-copyprop}
(a) Write a function `copy_propagate(params, blocks)` that removes every copy `x = y` from an SSA program and replaces every use of `x` (including φ operands) by `y`, following chains `x = y`, `y = z`. (b) Prove that it preserves the program's behaviour, using [[#thm-ssa]]. (c) Why would the same transformation be wrong on non-SSA code?
::: solution
(a)

```python
def copy_propagate(params, blocks):
    """In SSA, x = y (y a name or constant) lets every use of x become y."""
    sub = {i[1]: i[2] for ins in blocks.values() for i in ins if i[0] == "="}
    def r(x):
        while isinstance(x, str) and x in sub: x = sub[x]
        return x
    new = {}
    for b, ins in blocks.items():
        out = []
        for i in ins:
            if i[0] == "=": continue                          # the copy disappears
            if i[0] == "phi": out.append(("phi", i[1], {p: r(v) for p, v in i[2].items()}))
            elif i[0] == "op": out.append(i[:3] + (r(i[3]), r(i[4])))
            elif i[0] == "br": out.append(i[:2] + (r(i[2]), r(i[3])) + i[4:])
            elif i[0] == "ret": out.append(("ret", r(i[1])))
            elif i[0] == "call": out.append(i[:3] + ([r(x) for x in i[3]],))
            else: out.append(i)
        new[b] = out
    return params, new
```

On `gcd` it produces exactly LLVM's form; all seven test programs give the same output afterwards.

(b) In SSA, `x = y` is the only definition of `x`, so wherever `x` is used, the value read is the value assigned by this copy (by [[#thm-ssa]], on every path the last definition of `x` is this one), which is the value of `y` at the time of the copy. And `y`, also having a single definition that dominates the copy, never changes after that definition; so at any later use of `x`, `y` still holds the same value — provided the use is dominated by `y`'s definition, which holds since it is dominated by the copy, which is dominated by `y`'s definition. (For a φ operand, the "use" happens at the end of the predecessor, which the same argument covers.) Chains follow by induction.

(c) Without single assignment, `y` may be reassigned between the copy and a use of `x` (`x = y; y = 5; print(x)`), or `x` may have another definition on some path, so replacing `x` by `y` changes the value read. Non-SSA copy propagation needs a data-flow analysis to prove that neither happens ([[compilers/dataflow-optimisation]]).
:::
:::

::: exercise Loops from dominators {level=3}
A **back edge** is an edge $n \to h$ such that $h$ dominates $n$; the **natural loop** of the back edge is $h$ together with all blocks that can reach $n$ without passing through $h$. (a) Give an algorithm that computes the natural loop of a back edge, and apply it to the Collatz CFG. (b) Prove that the header $h$ dominates every block of its natural loop. (c) Explain why the CFG of the quiz has a cycle but no back edge, and why Mini programs can never produce such a CFG.
::: solution
(a) Start with $\mathit{loop} = \set{h, n}$ and a worklist $[n]$ (if $n \ne h$). Pop a block $m$; for each predecessor $p$ of $m$ not in $\mathit{loop}$, add it and push it. Since $h$ is in the set from the start, the search never goes past $h$. For Collatz, the back edge is $L_6 \to L_1$ ($L_1$ dominates $L_6$). From $L_6$: predecessors $L_4$, $L_5$; from them $L_2$; from $L_2$, $L_1$ — already in the set. Loop: $\set{L_1, L_2, L_4, L_5, L_6}$; the exit $L_3$ and the entry $B_0$ are outside.

(b) Let $m$ be in the loop, $m \ne h$: there is a path from $m$ to $n$ avoiding $h$. Suppose some path $P$ from the entry to $m$ avoided $h$. Then $P$ followed by the path from $m$ to $n$ is a path from the entry to $n$ avoiding $h$, contradicting $h \mathrel{\mathrm{dom}} n$. So $h$ dominates $m$.

(c) The cycle $B \to D \to B$ has two entries, from $A$ into $B$ and from $C$ into $D$, so neither $B$ nor $D$ dominates the other (the quiz after [[#ex-collatz-dom]]): neither edge of the cycle is a back edge. Such **irreducible** CFGs arise from `goto` into the middle of a loop. Mini has only structured control flow: every cycle comes from a `while`, whose test block is entered from outside only through the jump before it, and every path into the body passes through the test, so the test dominates the loop and the edge back to it is a back edge. Structured programs always have **reducible** CFGs.
:::
:::
