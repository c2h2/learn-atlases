At the end of [[compilers/dataflow-optimisation]] our compiler had turned Euclid's algorithm into four lines of optimised SSA:

```text
L1:
    a_1 = φ(B0: a_0, L2: b_1)
    b_1 = φ(B0: b_0, L2: t1_0)
    if b_1 != 0 goto L2 else L3
L2:
    t1_0 = a_1 % b_1
    goto L1
L3:
    return a_1
```

A processor cannot run this. It has no φ-functions, no unlimited supply of variables and no instruction `t1_0 = a_1 % b_1`; it has sixteen 64-bit registers, a stack, instructions with fixed operand forms such as `idivq`, which divides the 128-bit value in `%rdx:%rax` and leaves the quotient in `%rax` and the remainder in `%rdx`, and a **calling convention** that says where arguments and results must be. The **back end** bridges the gap in three tasks:

1. **Instruction selection**: choose target instructions that implement each IR operation, ideally exploiting complex instructions and addressing modes.
2. **Register allocation**: map the unlimited IR variables to the finite registers, storing ("spilling") some in memory when there are not enough.
3. **Emission**: lay out the stack frame, follow the calling convention, order the blocks and write assembly.

In this chapter we build all three for x86-64, translating every test program of [[compilers/intermediate-representations]] into assembly that GCC assembles and runs, and compare the result with GCC's own code. The central idea is a beautiful reduction: register allocation is **graph colouring** of an **interference graph** built from liveness.

## The target

We generate AT&T-syntax x86-64 assembly for Linux, following the **System V AMD64 ABI** described in [[computer-systems/machine-code#def-abi]]. What the back end must respect:

- The first six integer arguments are passed in `%rdi`, `%rsi`, `%rdx`, `%rcx`, `%r8`, `%r9`; further arguments are pushed on the stack, the seventh at the lowest address. The result is returned in `%rax`.
- `%rbx`, `%rbp` and `%r12`–`%r15` are **callee-saved**: a function that uses them must restore them before returning. All other registers are **caller-saved**: a call may destroy them.
- `%rsp` must be a multiple of 16 at every `call` instruction (so the callee sees $\mathit{rsp} \equiv 8 \pmod{16}$ on entry, after the return address is pushed).
- Instructions have two operands, the second being both a source and the destination (`subq %rbx, %rax` computes $\mathit{rax} \gets \mathit{rax} - \mathit{rbx}$), and at most one of them may be in memory.

Our back end makes one simplifying decision: it allocates variables only to the five callee-saved registers `%rbx`, `%r12`–`%r15`, and uses `%rax`, `%rcx` and `%rdx` as scratch registers inside the expansion of single instructions. Because callee-saved registers survive calls, a variable that is live across a call needs no special treatment. Production allocators use all registers and handle calls by making every variable live across a call interfere with the caller-saved registers ([[#ex-caller-saved]]).

## Instruction selection

The front end and optimiser use one IR instruction per operation; real machines often do several operations in one instruction. x86-64 has addressing modes of the form $\mathit{disp}(\mathit{base}, \mathit{index}, \mathit{scale})$, meaning the address $\mathit{base} + \mathit{index} \cdot \mathit{scale} + \mathit{disp}$ with scale 1, 2, 4 or 8, and an instruction `leaq` that computes such an address without accessing memory — a three-operand add-and-scale. A load of `a[i]` from an array of 8-byte integers, three IR operations (multiply, add, load), is one instruction `movq (%rdi,%rsi,8), %rax`.

To exploit this, view the IR of a basic block as a forest of expression **trees** and each machine instruction as a **tile**: a tree pattern it can compute, with leaves that must already be in registers.

::: definition Tiling {#def-tiling}
A **tile** is a tree pattern with a cost; its leaves are either constants it matches or holes, which are values computed by other tiles. A **tiling** of an expression tree $T$ is a set of tile instances that cover every node of $T$ exactly once, such that the holes of each tile are the roots of other tiles in the set (or leaves of $T$ held in registers). Its cost is the sum of the tile costs. Each tile becomes one instruction, emitted after the instructions for its holes.
:::

Two classic algorithms find tilings. **Maximal munch** works top-down: at the root, choose the tile that covers the most nodes, then tile the subtrees in its holes recursively. **Dynamic programming** works bottom-up: for each node, compute the cheapest tiling of the subtree rooted there, trying every tile that matches at the node and adding the cheapest tilings of the holes.

::: theorem Dynamic programming finds a cheapest tiling {#thm-dp-tiling}
If every node of $T$ is matched by at least one tile, the dynamic-programming algorithm returns a tiling of minimum cost, in time $O(\lvert T\rvert \cdot m)$, where $m$ bounds the number of tiles tried at each node (each tile having bounded size).
:::

::: proof
Let $c(v)$ be the cost the algorithm assigns to the subtree $T_v$ rooted at $v$. By induction on the height of $v$, $c(v)$ is the minimum cost of a tiling of $T_v$. Any tiling of $T_v$ has exactly one tile $t$ covering $v$; the rest of the tiling consists of tilings of the subtrees $T_{h_1}, \dots, T_{h_r}$ rooted at the holes of $t$, which are disjoint and smaller. So the minimum over tilings is $\min_t \bigl(\mathrm{cost}(t) + \sum_j \mathrm{opt}(h_j)\bigr)$, and by the induction hypothesis $\mathrm{opt}(h_j) = c(h_j)$; this is exactly the minimum the algorithm takes. Each node tries at most $m$ tiles, each checked in constant time, and memoisation computes each $c(v)$ once.
:::

Maximal munch is not always optimal when tile costs differ ([[#ex-munch]]), but with costs that reflect instruction counts it usually is, and it is simpler. Both are implemented in a few lines for a small tile set: register-register and immediate forms of `addq` and `imulq`, `leaq` with an address mode, and loads and stores with address modes:

```python
def munch(t):
    """Maximal munch: at each node take the tile that covers the most nodes."""
    best = max(tiles(t), key=lambda x: size(t) - sum(size(s) for s in x[2]))
    return [i for s in best[2] for i in munch(s)] + ([best[0]] if best[0] else [])

@lru_cache(maxsize=None)
def optimal(t):
    """Dynamic programming: the cheapest tiling of every subtree, bottom up."""
    return min((cost + sum(optimal(s)[0] for s in subs),
                [i for s in subs for i in optimal(s)[1]] + ([tmpl] if tmpl else []))
               for tmpl, cost, subs in tiles(t))
```

Here `tiles(t)` returns each tile matching at the root of `t` as an instruction template, a cost and the list of subtrees left in its holes.

::: example Tiling an array update {#ex-tile}
Tile the statement `a[i + 1] = a[i] + x * 4` for an array of 8-byte integers, with `a`, `i` and `x` in registers.
::: solution
As a tree, with addresses made explicit:

```text
store( a + (i + 1) * 8,
       load(a + i * 8) + x * 4 )
```

It has 18 nodes. A one-instruction-per-node translation needs one instruction for each of its 7 operators and 4 constants. Both algorithms find the same 4-instruction tiling:

```text
munch:   ['addq $1, R1', 'movq (B, I, 8), R', 'leaq (B, I, 4), R', 'movq V, (B, I, 8)']
optimal: (4, ['addq $1, R1', 'movq (B, I, 8), R', 'leaq (B, I, 4), R', 'movq V, (B, I, 8)'])
```

That is: compute $i + 1$; load `a[i]` with one addressing-mode load; compute $\mathit{load} + 4x$ with a single `leaq` (base = the loaded value, index = $x$, scale 4); and store with the address mode $(a, i{+}1, 8)$. The multiplications by 8 vanish into addressing modes and the one by 4 into `leaq`.
:::
:::

### Algebraic selection: division by a power of two

Some of the most valuable selection rules replace an expensive instruction by a sequence of cheap ones. `idivq` takes tens of cycles on current processors; a shift takes one. Dividing by $2^n$ is not simply an arithmetic right shift, though, because a shift rounds towards $-\infty$ and C (and Mini) round towards zero: $-7 \gg 1 = -4$ but $-7 / 2 = -3$.

::: theorem Signed division by a power of two {#thm-pow2}
Let $x$ be a 64-bit two's-complement integer, $1 \le n \le 62$, and $b = 2^n - 1$ if $x < 0$ and $b = 0$ otherwise. Then the quotient rounded towards zero is $q = (x + b) \gg n$ (arithmetic shift), the remainder is $x - 2^n q = \bigl((x + b) \mathbin{\&} (2^n - 1)\bigr) - b$, and $b$ itself is computed without a branch as $(x \gg 63) \ggg (64 - n)$, where $\ggg$ is the logical (unsigned) right shift.
:::

::: proof
An arithmetic shift right by $n$ computes $\lfloor y / 2^n \rfloor$. If $x \ge 0$, $b = 0$ and $\lfloor x / 2^n \rfloor$ is the quotient rounded towards zero. If $x < 0$, rounding towards zero is rounding up, and for integers $\lceil x / m \rceil = \lfloor (x + m - 1) / m \rfloor$ for $m \ge 1$ (write $x = km - r$ with $0 \le r < m$: both sides equal $k$ when $r = 0$ and when $r > 0$). With $m = 2^n$ this is $(x + b) \gg n$. The addition cannot overflow, because $x < 0$ and $b < 2^{63}$.

For the remainder, write $x + b = 2^n q + s$ with $0 \le s < 2^n$; then $s$ is the low $n$ bits of $x + b$, that is $(x + b) \mathbin{\&} (2^n - 1)$, and $x - 2^n q = s - b$.

Finally, $x \gg 63$ is $0$ if $x \ge 0$ and $-1$ (all 64 bits set) if $x < 0$; shifting it right logically by $64 - n$ leaves $0$ or $n$ one-bits, that is $2^n - 1$.
:::

```python
def select_op(i, op, dst, move, emit):
    """Return True if a special pattern handled the instruction."""
    _, d, o, a, b = i
    if o in ("/", "%") and isinstance(b, int) and b > 1 and b & (b - 1) == 0:
        n = b.bit_length() - 1                 # signed division by 2**n, rounding to zero
        move(op(a), "%rax"); emit("movq", "%rax", "%rdx")
        emit("sarq", "$63", "%rdx"); emit("shrq", f"${64 - n}", "%rdx")   # bias: 2**n-1 if a<0
        emit("addq", "%rdx", "%rax")
        if o == "/": emit("sarq", f"${n}", "%rax")
        else: emit("andq", f"${b - 1}", "%rax"); emit("subq", "%rdx", "%rax")
        move("%rax", dst); return True
    if o in ARITH and "(" not in dst and op(b) != dst:     # two-address form, no %rax detour
        move(op(a), dst); emit(ARITH[o], op(b), dst); return True
    if o in ("+", "*", "^") and "(" not in dst and op(a) != dst:   # commutative: swap
        move(op(b), dst); emit(ARITH[o], op(a), dst); return True
    return False
```

The other two patterns choose the **two-address form**: `d = a - b` becomes `movq a, d; subq b, d` when $d$ is a register different from $b$, instead of going through `%rax`.

::: example GCC uses the same sequence {#ex-gcc-div}
Compile `long m8(long x) { return x % 8; }` and `long d3(long x) { return x / 3; }` with GCC 15.2 at `-O2`.
::: solution
```text
m8:                                     d3:
    movq    %rdi, %rdx                      movabsq $6148914691236517206, %rax
    sarq    $63, %rdx                       imulq   %rdi
    shrq    $61, %rdx                       sarq    $63, %rdi
    leaq    (%rdi,%rdx), %rax               movq    %rdx, %rax
    andl    $7, %eax                        subq    %rdi, %rax
    subq    %rdx, %rax                      ret
    ret
```

`m8` is exactly [[#thm-pow2]] with $n = 3$ (`shrq $61` is $64 - n$), with the addition done by a `leaq` and the mask by a 32-bit `andl` (whose result is zero-extended). For division by 3, GCC multiplies by the "magic number" $6148914691236517206 = \lceil 2^{64}/3 \rceil$, takes the high 64 bits of the 128-bit product (left in `%rdx` by the one-operand `imulq`), and adds 1 if $x$ is negative (subtracting $x \gg 63 = -1$). The method, which works for every constant divisor, is due to Granlund and Montgomery (1994). Even at `-O0` GCC replaces `n / 2` by a shift sequence; only our compiler, before `select_op`, uses `idivq`.
:::
:::

## Leaving SSA

Before allocation, the φ-functions must become copies. [[compilers/intermediate-representations]] showed that this is subtle: the φs at the start of a block are executed *simultaneously*, so the copies on each incoming edge form a **parallel copy** $(x_1, \dots, x_k) \gets (y_1, \dots, y_k)$, and copies can be placed at the end of a predecessor only if that predecessor has a single successor. So we first split each **critical edge** — from a block with several successors to a block with φs and several predecessors — by inserting an empty block on it; then we turn each parallel copy into a sequence.

::: lemma Sequentialising a parallel copy {#lem-parallel}
Let $(x_1, \dots, x_k) \gets (y_1, \dots, y_k)$ be a parallel copy with distinct destinations, none equal to the spare variable $t$. Repeat: if some copy $x_i \gets y_i$ has a destination that is not the source of any remaining copy, emit it and remove it; otherwise emit $t \gets y_i$ for some remaining copy, and replace $y_i$ by $t$ as a source in all remaining copies. This produces a sequence of ordinary copies with the same effect, of length $k' + c$, where $k'$ is the number of copies with $x_i \ne y_i$ and $c$ is the number of cycles among them.
:::

::: proof
Invariant: executing the emitted sequence and then the remaining copies *in parallel* has the same effect on the $x_i$ as the original parallel copy. Emitting a copy $x_i \gets y_i$ whose destination is no remaining source preserves it: the remaining copies do not read $x_i$, so overwriting it first changes nothing they compute. Emitting $t \gets y_i$ and redirecting the readers of $y_i$ to $t$ preserves it too, since $t$ now holds the value they need. The process terminates: each step removes a copy or, in the second case, makes some copy ready on the next step — after the redirection, $y_i$ is no longer a source, and since destinations are distinct, the unique copy whose destination is $y_i$ (which exists, as every destination is a source when nothing is ready) is now ready. When no copy is ready, every remaining destination is also a source, so the remaining copies form disjoint cycles (each variable is the destination of at most one copy and the source of at least one); each cycle costs one extra copy through $t$, and every other copy is emitted once.
:::

```python
def sequentialise(copies, tmp):
    """Parallel copies [(dst, src)] -> equivalent sequential list, using tmp for cycles."""
    copies = [(d, s) for d, s in copies if d != s]
    seq = []
    while copies:
        srcs = {s for _, s in copies}
        ready = [(d, s) for d, s in copies if d not in srcs]   # no pending copy reads d
        if ready:
            seq.append(ready[0]); copies.remove(ready[0])
        else:                                                   # only cycles left
            d, s = copies[0]
            seq.append((tmp, s))
            copies = [(d2, tmp if s2 == s else s2) for d2, s2 in copies]
    return seq

def out_of_ssa(params, blocks):
    blocks = {b: list(ins) for b, ins in blocks.items()}
    preds = predecessors(blocks)
    for b in list(blocks):                  # split edges p -> b with p branching and b joining
        if len(preds[b]) < 2 or not any(i[0] == "phi" for i in blocks[b]): continue
        for p in preds[b]:
            if len(successors(blocks[p])) > 1:
                mid = f"{p}_{b}"
                blocks[mid] = [("jmp", b)]
                last = blocks[p][-1]
                blocks[p][-1] = last[:4] + tuple(mid if t == b else t for t in last[4:6])
                for i in blocks[b]:
                    if i[0] == "phi": i[2][mid] = i[2].pop(p)
    preds = predecessors(blocks)
    for b in list(blocks):
        phis = [i for i in blocks[b] if i[0] == "phi"]
        for p in preds[b]:
            seq = sequentialise([(i[1], i[2][p]) for i in phis], "swap_tmp")
            blocks[p][-1:-1] = [("=", d, 0 if s is None else s) for d, s in seq]
        blocks[b] = [i for i in blocks[b] if i[0] != "phi"]
    return params, blocks
```

For the swap loop that defeated the naive translation, the copies at the end of the body are the parallel copy $(a_1, b_1) \gets (b_1, a_1)$, a single cycle, and `sequentialise` returns `swap_tmp = b_1; b_1 = a_1; a_1 = swap_tmp` — three copies, as the lemma predicts. All seven test programs now produce the right output.

## Register allocation

After leaving SSA, `gcd` reads:

```text
B0:
    a_1 = a_0
    b_1 = b_0
    goto L1
L1:
    if b_1 != 0 goto L2 else L3
L2:
    t1_0 = a_1 % b_1
    a_1 = b_1
    b_1 = t1_0
    goto L1
L3:
    return a_1
```

It has five variables. How many registers does it need? Two variables can share a register if they are never needed at the same time — that is, if they are never simultaneously **live** ([[compilers/dataflow-optimisation#def-live]]).

::: definition Interference graph {#def-interference}
The **interference graph** of a function has a vertex for each variable and an edge $u - v$ when $u$ and $v$ **interfere**: some instruction defines $u$ at a point where $v$ is live afterwards ($v \ne u$), except that a copy $u = v$ does not make $u$ interfere with $v$. The variables that are **move-related** — the source and destination of a copy — are recorded separately.
:::

::: theorem Colourings are register assignments {#thm-colouring}
If $c$ assigns to every variable one of $K$ registers such that adjacent vertices of the interference graph get different registers (a **proper $K$-colouring**), then executing the function with each variable $v$ stored in register $c(v)$ gives the same results as executing it with unlimited variables.
:::

::: proof
It suffices to show that whenever a variable $v$ is used, register $c(v)$ holds $v$'s current value. Consider a use of $v$ and the most recent definition $d$ of $v$ before it on the execution path; $v$ is live at every point between them. Suppose register $c(v)$ is overwritten in between, by a definition of some $u \ne v$ with $c(u) = c(v)$. At that point $v$ is live afterwards, so $u - v$ is an edge — unless the definition is a copy $u = v$. Edges force $c(u) \ne c(v)$, so it must be a copy $u = v$, which writes the value of $v$ into $c(v)$ and leaves it unchanged. (If $u$ is then redefined while $v$ is still live, that definition is again covered by the same argument.) Hence every use of $v$ reads $v$'s value.
:::

The exception for copies is important: it lets the source and destination of a copy share a register, and then the copy is a no-op that the emitter deletes. Building the graph is one backward walk over each block, starting from the live-out sets computed in [[compilers/dataflow-optimisation]]:

```python
def interference(blocks, params):
    live_in, live_out = liveness(blocks)
    nodes = set(params) | {d for ins in blocks.values() for i in ins for d in defs(i)}
    graph, moves = {v: set() for v in nodes}, []
    for b, ins in blocks.items():
        live = set(live_out[b])
        for i in reversed(ins):             # walk backwards, as the liveness equations do
            for d in defs(i):
                others = live - {d}
                if i[0] == "=" and isinstance(i[2], str):
                    others.discard(i[2]); moves.append((d, i[2]))   # Chaitin's move rule
                for v in others: graph[d].add(v); graph[v].add(d)
                live.discard(d)
            live |= {x for x in uses(i) if isinstance(x, str)}
    entry = next(iter(blocks))              # parameters are all defined together on entry
    for p in params:
        for q in (live_in[entry] | set(params)) - {p}: graph[p].add(q); graph[q].add(p)
    return graph, moves
```

For `gcd` the program reports the edges $a_1 - t_{1,0}$, $a_1 - b_1$, $a_1 - b_0$, $b_1 - t_{1,0}$ and $a_0 - b_0$, and the copies $(b_1, b_0)$, $(a_1, a_0)$, $(b_1, t_{1,0})$, $(a_1, b_1)$. The triangle $a_1, b_1, t_{1,0}$ shows that three registers are needed: at `t1_0 = a_1 % b_1`, the remainder is computed while both operands are still live, because `a_1 = b_1` and `b_1 = t1_0` follow.

### Colouring by simplification

Deciding whether a graph can be coloured with $K$ colours is NP-complete for every $K \ge 3$, and we shall see that interference graphs are no easier in general. But a simple observation, going back to Kempe's 1879 attempt to prove the four-colour theorem, gives an effective heuristic.

::: lemma Low-degree vertices can be removed {#lem-kempe}
If a vertex $v$ of a graph $G$ has fewer than $K$ neighbours, then $G$ is $K$-colourable if and only if $G - v$ is.
:::

::: proof
A $K$-colouring of $G$ restricts to one of $G - v$. Conversely, given a $K$-colouring of $G - v$, the neighbours of $v$ use at most $\deg(v) < K$ colours, so some colour is free for $v$.
:::

**Chaitin's algorithm** (1981) applies the lemma repeatedly. *Simplify*: while some vertex has degree $< K$, remove it and push it on a stack. If every remaining vertex has degree $\ge K$, choose one to **spill** — store in memory rather than a register — preferring vertices with low **spill cost** (the number of uses and definitions, weighted by $10^d$ for loop depth $d$) relative to their degree, remove it, and continue. *Select*: pop vertices and give each a colour not used by its already-coloured neighbours; by [[#lem-kempe]], every vertex removed because of low degree finds one. **Briggs, Cooper and Torczon** (1989; journal version 1994) observed that a spill candidate may still find a free colour when it is popped — its neighbours may share colours — so they push it optimistically and spill it only if select actually fails ([[#quiz-optimistic]]). Our version also prefers, among the free colours, one already given to a move partner, so that the copy between them disappears (**biased colouring**):

```python
def colour(graph, k, moves=(), cost=None):
    cost = cost or {v: 1 for v in graph}
    g = {v: set(n) for v, n in graph.items()}
    stack = []
    while g:
        low = [v for v in g if len(g[v]) < k]
        v = low[0] if low else min(g, key=lambda v: cost[v] / len(g[v]))   # spill candidate
        stack.append(v)
        for n in g.pop(v): g[n].discard(v)
    partner = {}
    for a, b in moves: partner.setdefault(a, []).append(b); partner.setdefault(b, []).append(a)
    col, spilled = {}, []
    while stack:
        v = stack.pop()
        taken = {col[n] for n in graph[v] if n in col}
        free = [c for c in range(k) if c not in taken]
        if not free: spilled.append(v); continue          # an actual spill
        biased = [col[p] for p in partner.get(v, []) if col.get(p) in free]
        col[v] = biased[0] if biased else free[0]         # prefer a move partner's colour
    return col, spilled
```

A spilled variable lives in a stack slot. In a real allocator this means inserting a load before each use and a store after each definition, into new short-lived temporaries, and then running the allocator again, since the temporaries need registers too. Our back end avoids the iteration: x86-64 instructions can take one memory operand, and the scratch registers `%rax`, `%rcx` and `%rdx` handle the rest.

::: quiz {#quiz-optimistic}
The interference graph is a 4-cycle $a - b - c - d - a$ and $K = 2$. What does Chaitin's original algorithm do, and what does Briggs's optimistic version do?
- [ ] both colour it without spilling, because the graph has no triangle
- [x] Chaitin's spills a vertex; Briggs's colours all four vertices
- [ ] both must spill a vertex, because every vertex has degree 2
- [ ] Chaitin's colours it; Briggs's spills a vertex
::: solution
Every vertex has degree $2 = K$, so simplify is stuck immediately and must pick a spill candidate. Chaitin's algorithm spills it at once. After it is removed, the remaining path $b - c - d$ simplifies completely. Briggs's version pushes the candidate $a$ too, and in select it is popped last: its neighbours $b$ and $d$ are not adjacent and both got the same colour (the path is coloured alternately $b = 0$, $c = 1$, $d = 0$), so colour 1 is free for $a$. Our `colour` on this graph returns `{'d': 0, 'c': 1, 'b': 0, 'a': 1}` with no spills. The 4-cycle is 2-colourable, as every even cycle is.
:::
:::

### Coalescing

Every copy whose source and destination receive the same register is free. **Coalescing** merges move-related, non-interfering vertices before colouring, so they are guaranteed the same colour. But merging can make the graph harder to colour — the merged vertex has the neighbours of both — and so cause spills. **Conservative coalescing** merges only when this cannot happen.

::: theorem Briggs's coalescing test {#thm-briggs}
Let $x$ and $y$ be non-adjacent vertices of $G$, and let $xy$ be the vertex obtained by merging them. If $xy$ has fewer than $K$ neighbours of degree $\ge K$ (in the merged graph), then if simplification removes every vertex of $G$ without spilling, it also does so for the merged graph.
:::

::: proof
Two facts about simplify. (i) It succeeds on a graph exactly when every subgraph has a vertex of degree $< K$; in particular, if it succeeds on $G$, it succeeds on every subgraph of $G$. (ii) The order of removals does not matter, since removing a vertex never raises another's degree. Call the merged graph $H$. In $H$, first remove every neighbour of $xy$ of degree $< K$; each still has degree $< K$ when its turn comes. Then $xy$ has only its high-degree neighbours left — fewer than $K$ — and can be removed. What remains is $H$ minus $xy$ and some other vertices, which is a subgraph of $G - x - y$ (deleting $xy$ deletes the only edges that are not edges of $G$), and hence a subgraph of $G$. By (i), simplify succeeds on it.
:::

```python
def coalesce(graph, moves, k):
    """Merge move-related, non-interfering nodes when that cannot hurt colourability."""
    g = {v: set(n) for v, n in graph.items()}
    alias = {}
    find = lambda v: find(alias[v]) if v in alias else v
    for x, y in moves:
        x, y = find(x), find(y)
        if x == y or y in g[x]: continue                  # same node, or they interfere
        merged = g[x] | g[y]
        if sum(len(g[n] - {x, y}) + 1 >= k for n in merged) >= k: continue   # Briggs
        for n in g.pop(y): g[n].discard(y); g[n].add(x)   # y becomes part of x
        g[x] = merged - {x, y}
        alias[y] = x
    return g, {v: find(v) for v in graph}
```

For `gcd`, coalescing merges $a_0$ with $a_1$ and $b_0$ with $b_1$; the copies $(b_1, t_{1,0})$ and $(a_1, b_1)$ connect interfering vertices and must remain.

::: example Interference in a nested loop {#ex-interf-sum}
Allocate registers for the function `sum` of the test program `nested`:

```text
fn sum(n: int) -> int {
    let s = 0; let i = 0;
    while i < n {
        let j = 0;
        while j < i {
            if (i + j) % 3 == 0 { s = s + i * j; } else if j > 5 { s = s - 1; }
            j = j + 1;
        }
        i = i + 1;
    }
    return s;
}
```
::: solution
After optimisation and leaving SSA, `sum` has 14 variables; the interference graph has 14 vertices. Coalescing merges the copies of `s` ($s_1, s_2, s_5, s_6$ and the temporaries $t_4$, $t_5$ that compute new values of `s`), $t_6$ into $j_2$, and $t_7$ into $i_1$, leaving 7 vertices: $s$, $i$, $n$, $j$ and the short-lived temporaries $t_1 = i + j$, $t_2 = t_1 \bmod 3$ and $t_3 = i \cdot j$. Inside the inner loop, $s$, $i$, $n$ and $j$ are all live everywhere, so they form a 4-clique; each temporary is live while all four are live, but no two temporaries are live at the same time.

::: widget graph
nodes: s@0,1; i@1,0; n@1,2; j@2,1; t1@4,0; t2@4,1; t3@4,2
edges: s-i; s-n; s-j; i-n; i-j; n-j; t1-s; t1-i; t1-n; t1-j; t2-s; t2-i; t2-n; t2-j; t3-s; t3-i; t3-n; t3-j
algorithm: colour
caption: The interference graph of `sum` after coalescing. Run the greedy colouring (it colours in the order the nodes are listed): the clique $s, i, n, j$ takes four colours and the three temporaries share a fifth, since they do not interfere with each other. With $K = 5$ registers nothing is spilled; with fewer, something must be.
:::

The program agrees: with $K = 5$, `colour` returns `{'s_2': 0, 't1_0': 1, 'i_1': 2, 'n_0': 3, 'j_2': 4, 't3_0': 1, 't2_0': 1}` with no spills. (Select happened to colour the temporaries when only $s$ had a colour, so they took colour 1 rather than 4: any free colour will do.) With smaller $K$ the generated program still runs correctly, with more variables in memory:

| $K$ | 5 | 4 | 3 | 2 |
|---|---|---|---|---|
| merged vertices spilled in `sum` | 0 | 1 | 2 | 3 |

With $K = 2$, Briggs's test refuses more merges, and the spilled vertices are $s_2$, $i_1$ and $n_0$; $j_2$, with the highest spill cost (610: its occurrences inside the inner loop weigh 100 each), keeps a register.
:::
:::

### How hard is register allocation?

::: theorem Register allocation is NP-complete {#thm-np}
For every graph $G$ there is a program whose interference graph is $G$. Consequently, deciding whether a program's variables can be assigned to $K$ registers without spilling, with no copies inserted, is NP-complete for every $K \ge 3$.
:::

::: proof
Given $G$ with vertices $v_1, \dots, v_n$ and edges $e_1, \dots, e_m$, build a function with a parameter $p$ whose entry is a chain of tests ($p = 1$, $p = 2$, …) branching to one of $m$ blocks $E_1, \dots, E_m$. If $e_j = v_a - v_b$, block $E_j$ executes `v_a = 1; v_b = 2; r = v_a + v_b` and jumps to an exit block that returns `r`. Liveness: $p$ is live only in the chain of tests; each $v_i$ is live only inside the blocks $E_j$ that define it, between its definition and the instruction `r = v_a + v_b`; $r$ is live only from its definition to the return. In $E_j$, $v_a$ is live when $v_b$ is defined, so $v_a - v_b$ is an edge; two variables $v_i$ that are not joined by an edge of $G$ never appear in a common block and are never simultaneously live. At `r = v_a + v_b` both operands die, so $r$ interferes with nothing, and neither does $p$. So the interference graph is $G$ plus two isolated vertices, and the program can be allocated to $K \ge 1$ registers without spilling exactly when $G$ is $K$-colourable. Deciding $K$-colourability is NP-complete for every fixed $K \ge 3$ (for graph colouring in general, Karp, 1972; for $K = 3$, already for planar graphs, Garey, Johnson and Stockmeyer, 1976), and a proposed allocation is checked in polynomial time.
:::

The construction is Chaitin's, from the 1981 paper that introduced colouring allocators. There is a twist: the interference graph of a program *in SSA form* (before leaving it) is **chordal** — every cycle of length at least 4 has a chord — because each variable's live range is a subtree of the dominator tree, and intersection graphs of subtrees of a tree are chordal (Gavril, 1974). Chordal graphs can be optimally coloured in linear time, using as many colours as the largest clique, which equals the maximum number of simultaneously live variables. This was observed independently by Hack, Grund and Goos and by Bouchez, Darte and Rastello and by Brisk and colleagues around 2005–2006. It does not contradict [[#thm-np]]: the difficulty moves to the copies that leaving SSA introduces, and minimising those (optimal coalescing) is NP-hard.

## Emission

The last stage walks the blocks in order and writes assembly. The frame of each function holds the saved `%rbp`, a slot for each spilled variable, and the callee-saved registers the function uses:

```text
        higher addresses
  16(%rbp)   7th argument, 24(%rbp) 8th, ...   (pushed by the caller)
   8(%rbp)   return address
   0(%rbp)   caller's %rbp
  -8(%rbp)   spill slot 1, -16(%rbp) slot 2, ...
             (padding to keep %rsp 16-byte aligned)
             saved %rbx, %r12, ... (those this function uses)
             <- %rsp
```

The core of the emitter, with `loc` mapping each variable to its register or stack slot:

```python
ALLOC = ["%rbx", "%r12", "%r13", "%r14", "%r15"]   # callee-saved: survive calls
ARGS = ["%rdi", "%rsi", "%rdx", "%rcx", "%r8", "%r9"]

    out = [f"mini_{name}:", "\tpushq\t%rbp", "\tmovq\t%rsp, %rbp"]
    frame = 8 * len(spilled)
    if (frame + 8 * len(used)) % 16: frame += 8   # keep %rsp 16-byte aligned at calls
    if frame: out.append(f"\tsubq\t${frame}, %rsp")
    for r in used: out.append(f"\tpushq\t{r}")
    ...
    for n, p in enumerate(params):             # parameters into their allocated homes
        if p in loc: move(ARGS[n] if n < 6 else f"{16 + 8 * (n - 6)}(%rbp)", loc[p])
    for bi, (b, ins) in enumerate(blocks.items()):
        out.append(f".{name}_{b}:")
        nxt = order[bi + 1] if bi + 1 < len(order) else None
        for i in ins:
            k_ = i[0]
            if k_ == "=":
                if i[1] in loc: move(op(i[2]), loc[i[1]])
            elif k_ == "op":
                if i[1] not in loc: continue
                if smart and select_op(i, op, loc[i[1]], move, emit): continue
                if i[2] in ARITH:
                    move(op(i[3]), "%rax"); emit(ARITH[i[2]], op(i[4]), "%rax")
                    move("%rax", loc[i[1]])
                else:                              # / and %: idiv divides %rdx:%rax
                    move(op(i[3]), "%rax"); emit("cqto")
                    move(op(i[4]), "%rcx"); emit("idivq", "%rcx")
                    move("%rax" if i[2] == "/" else "%rdx", loc[i[1]])
            elif k_ == "call":
                args = i[3]; extra = args[6:]
                pad = 8 if len(extra) % 2 else 0
                if pad: emit("subq", "$8", "%rsp")
                for a in reversed(extra): emit("pushq", op(a))
                for n, a in enumerate(args[:6]): move(op(a), ARGS[n])
                emit("call", "mini_" + i[2])
                if extra or pad: emit("addq", f"${8 * len(extra) + pad}", "%rsp")
                if i[1] in loc: move("%rax", loc[i[1]])
            elif k_ == "br":
                ...                                # cmpq, then a conditional jump; the
            elif k_ == "jmp":                      # jump to the next block is omitted
                if i[1] != nxt: emit("jmp", f".{name}_{i[1]}")
            elif k_ == "ret":
                move(op(i[1]), "%rax")
                if nxt is not None: emit("jmp", f".{name}_ret")
    out.append(f".{name}_ret:")
    for r in reversed(used): out.append(f"\tpopq\t{r}")
    out += ["\tleave", "\tret"]
```

`move` deletes copies between equal locations, and routes memory-to-memory copies and 64-bit immediates through `%rax`. A conditional branch whose true target is the next block is inverted (`if b != 0 goto L2 else L3` with `L2` next becomes `je .L3`). Functions are prefixed `mini_` so they cannot clash with the C library, and a three-line C runtime provides `main` and `print`:

```c
#include <stdio.h>
long mini_main(void);
long mini_print(long x) { printf("%ld\n", x); return x; }
int main(void) { return (int)mini_main(); }
```

Every one of the seven test programs, assembled and linked with `gcc -o prog prog.s rt.c`, prints exactly its expected output — with $K = 5$, and also with $K = 3$, $2$ and $1$, where up to 9 (coalesced) variables per program live in memory instead of registers.

::: example Euclid's algorithm, from source to machine code {#ex-gcd-asm}
Show the final code for `gcd` and compare it with GCC's for the same function in C.
::: solution
Ours (with `select_op`), and GCC 15.2 at `-O2` for `long gcd(long a, long b) { while (b != 0) { long t = a % b; a = b; b = t; } return a; }`:

```text
mini_gcd:                           gcd:
    pushq   %rbp                        movq    %rdi, %rax
    movq    %rsp, %rbp                  movq    %rsi, %rdx
    subq    $8, %rsp                    testq   %rsi, %rsi
    pushq   %rbx                        je      .L4
    pushq   %r12                    .L3:
    pushq   %r13                        movq    %rdx, %rcx
    movq    %rdi, %r12                  cqto
    movq    %rsi, %r13                  idivq   %rcx
.gcd_B0:                                movq    %rcx, %rax
.gcd_L1:                                testq   %rdx, %rdx
    testq   %r13, %r13                  jne     .L3
    je      .gcd_L3                     movq    %rcx, %rax
.gcd_L2:                                ret
    movq    %r12, %rax              .L4:
    cqto                                movq    %rdi, %rcx
    movq    %r13, %rcx                  movq    %rcx, %rax
    idivq   %rcx                        ret
    movq    %rdx, %rbx
    movq    %r13, %r12
    movq    %rbx, %r13
    jmp     .gcd_L1
.gcd_L3:
    movq    %r12, %rax
.gcd_ret:
    popq    %r13
    popq    %r12
    popq    %rbx
    leave
    ret
```

Coalescing put $a_0, a_1$ in `%r12` and $b_0, b_1$ in `%r13`, so the entry copies vanished; the loop has the three moves that a rotation $(a, b, t) \gets (b, t, a \bmod b)$ requires around `idivq`. GCC's loop is six instructions against our ten, because it allocates into the registers `idivq` itself uses: $a$ is kept in `%rax` and the remainder used directly from `%rdx`. That is **register targeting** — precolouring IR variables that are operands of instructions with fixed registers. GCC also **rotated the loop**, testing $b \ne 0$ once before the loop and at the bottom of each iteration, saving the unconditional jump. And it needs no frame: it uses only caller-saved registers, which a leaf function never has to save.
:::
:::

::: example Calls with stack arguments {#ex-calls}
The test program `manyargs` calls `h(1, 2, 3, 4, 5, 6, 7, 8)`. Show how the call and the callee's prologue are compiled.
::: solution
The caller (`mini_main`) and the start of the callee:

```text
mini_main:                          mini_h:
    pushq   %rbp                        pushq   %rbp
    movq    %rsp, %rbp                  movq    %rsp, %rbp
    subq    $8, %rsp                    subq    $24, %rsp
    pushq   %rbx                        pushq   %rbx
.main_B0:                               pushq   %r12
    pushq   $8                          pushq   %r13
    pushq   $7                          pushq   %r14
    movq    $1, %rdi                    pushq   %r15
    movq    $2, %rsi                    movq    %rdi, %r12
    movq    $3, %rdx                    movq    %rsi, -24(%rbp)
    movq    $4, %rcx                    movq    %rdx, %r14
    movq    $5, %r8                     movq    %rcx, %r15
    movq    $6, %r9                     movq    %r8, -8(%rbp)
    call    mini_h                      movq    %r9, -16(%rbp)
    addq    $16, %rsp                   movq    16(%rbp), %r13
    movq    %rax, %rbx                  movq    24(%rbp), %rbx
    ...                                 ...
```

The 7th and 8th arguments are pushed in reverse order, so the 7th ends up at the lower address, `16(%rbp)` in the callee, above the return address and saved `%rbp`. Two pushes keep `%rsp` aligned, so no padding is needed; the caller pops them with `addq $16, %rsp`. In the caller, the frame is 8 bytes of padding plus one saved register: together with the pushed `%rbp` and return address, `%rsp` is a multiple of 16 at the call. In `h`, all eight parameters are live on entry, so they form an 8-clique in the interference graph: with $K = 5$, three are spilled (to `-8`, `-16` and `-24(%rbp)`), the 24-byte spill area plus five saved registers is 64 bytes, a multiple of 16, and the program prints $40$.
:::
:::

::: warning The ABI is part of correctness
Code that violates the calling convention can pass every test and still be wrong. Our emitter keeps `%rsp` 16-byte aligned at calls. If we remove that padding, the seven tests still print the right answers — but change the runtime's `print` to `printf("%ld %.1f\n", x, (double)x)` and every program dies with a segmentation fault (signal 11). With a floating-point argument, glibc's `printf` saves vector registers with `movaps`, an instruction that requires a 16-byte-aligned address. The original runtime never reached such an instruction, so the bug was invisible. The same applies to callee-saved registers (a function that clobbers `%rbx` corrupts a caller that relied on it, possibly far from the bug) and to the red zone, signal handling and unwinding information (`.cfi` directives) that debuggers and C++ exceptions need. Test a back end against code compiled by another compiler, in both directions.
:::

## How good is it?

::: example Benchmarking the back end {#ex-bench}
Compute $\sum_{i=1}^{2\,999\,999} \mathrm{collatz}(i)$ — the total number of Collatz steps — in Mini and in C, and time the programs.
::: solution
All five programs print 428343355. Best of five runs on an Intel Xeon E5-2696 v3 (2.3 GHz, shared machine, so timings vary by about 10%):

| program | time (s) |
|---|---|
| Mini, SSA without optimisation, plain selection | 8.36 |
| Mini, optimised, plain selection | 8.63 |
| Mini, optimised, with `select_op` | 1.45 |
| C, `gcc -O0` | 2.03 |
| C, `gcc -O1` | 0.89 |
| C, `gcc -O2` | 0.74 |

The optimisations of [[compilers/dataflow-optimisation]] removed copies, but the plain back end spends almost all its time in two `idivq` instructions per iteration (for `n % 2` and `n / 2`), so they made no measurable difference. Replacing them by the shift sequences of [[#thm-pow2]] made our code almost six times faster — faster than GCC without optimisation, which keeps every variable in memory, but still about twice as slow as `gcc -O2`, which tests `n % 2 == 0` with a single `testb $1, %dil`, computes `3 * n + 1` with one `leaq 1(%rdi,%rdi,2), %rdi`, halves an even `n` with a bare `sarq` (no bias is needed when the division is exact), and even merges each odd step with the halving that must follow it, since $3n + 1$ is even when $n$ is odd (the counter goes up by 2). Instruction selection mattered more than every IR optimisation together — on this program. On others the IR optimisations dominate; the lesson is to measure.
:::
:::

::: history
The first FORTRAN compiler (Backus and colleagues, IBM, 1957) already allocated the 704's three index registers with a frequency-based method that anticipated spill costs. Ershov (1958) and Sethi and Ullman (1970) showed how to evaluate expression trees with the fewest registers. Aho and Johnson's "Optimal code generation for expression trees" (1976) introduced dynamic programming over trees; Glanville and Graham (1978) generated code with an LR parser of tree patterns, and tree-grammar generators such as BURG and iburg (Fraser, Hanson and Proebsting, 1992) made tiling selectors standard. Davidson and Fraser (1980) introduced retargetable peephole optimisation, the ancestor of GCC's RTL. Gregory Chaitin and colleagues at IBM built the first graph-colouring allocator for the PL.8 compiler ("Register allocation via coloring", 1981; "Register allocation and spilling via graph coloring", 1982). Preston Briggs, Keith Cooper and Linda Torczon added optimistic colouring and conservative coalescing ("Improvements to graph coloring register allocation", *TOPLAS* 1994); Lal George and Andrew Appel combined coalescing with simplification in "Iterated register coalescing" (1996). Massimiliano Poletto and Vivek Sarkar's linear-scan allocation (1999) traded quality for speed in JIT compilers, and around 2005–2006 several groups found that SSA interference graphs are chordal. Torbjörn Granlund and Peter Montgomery's "Division by invariant integers using multiplication" (PLDI 1994) gave the magic-number method GCC uses.
:::

## Where this leads

Our back end handles only 64-bit integers. Real ones also select floating-point and vector instructions, **schedule** instructions to keep pipelines busy (list scheduling, software pipelining), lay out blocks to make the frequent path fall through, and produce debugging and unwinding tables. The compiled program also relies on services that are not visible in its code at all: memory allocation, garbage collection, dynamic dispatch, exception handling. Those are the subject of [[compilers/runtime-systems]].

::: summary
- The back end performs **instruction selection**, **register allocation** and **emission**, following the platform's **ABI** (System V on x86-64 Linux: arguments in `%rdi`…`%r9`, then the stack; callee-saved `%rbx`, `%rbp`, `%r12`–`%r15`; 16-byte alignment at calls).
- Instruction selection is **tree tiling**; maximal munch is simple and fast, dynamic programming is optimal ([[#thm-dp-tiling]]). Algebraic rules such as replacing division by $2^n$ with shifts ([[#thm-pow2]]) can matter more than any IR optimisation — almost a factor of 6 in [[#ex-bench]].
- Leaving SSA requires splitting critical edges and **sequentialising parallel copies**, with one temporary per cycle ([[#lem-parallel]]).
- A proper colouring of the **interference graph** built from liveness is a correct register assignment ([[#thm-colouring]]). Chaitin's simplify/select, based on the low-degree lemma ([[#lem-kempe]]), with Briggs's optimistic spilling and conservative coalescing ([[#thm-briggs]]), allocates real programs well, although the general problem is NP-complete ([[#thm-np]]).
- Our compiler now translates Mini to x86-64 code that runs correctly with any number of registers; GCC's code is shorter mainly through register targeting, loop rotation and richer instruction selection.
:::

## Exercises

::: exercise Counting interference {level=1 check="3"}
For the straight-line code `a = p + 1; b = p * 2; c = a + b; d = a * c; return d + b`, where `p` is a parameter, draw the interference graph and give the smallest number of registers that holds all five variables without spilling. (Enter the number.)
::: solution
Live sets after each instruction, working backwards from the `return`: after `d = a * c`: $\set{b, d}$; after `c = a + b`: $\set{a, b, c}$; after `b = p * 2`: $\set{a, b}$; after `a = p + 1`: $\set{a, p}$. Edges, from each definition and what is live after it: $a - p$; $b - a$ ($p$ is dead after its last use in `b = p * 2`); $c - a$, $c - b$; $d - b$. The triangle $a, b, c$ needs three colours, and three suffice: $a = 0$, $b = 1$, $c = 2$, $p = 1$, $d = 0$. So **3** registers — the maximum number of simultaneously live variables, $\lvert\set{a, b, c}\rvert$, as must happen for straight-line code, whose interference graph is an interval graph.
:::
:::

::: exercise A three-way rotation {level=1 check="4"}
A loop's φ-functions require the parallel copy $(a, b, c) \gets (b, c, a)$. Use [[#lem-parallel]] to sequentialise it with one temporary $t$. How many copies result? (Enter the number.)
::: solution
No copy is ready: every destination is also a source. Break the cycle at the first copy: $t \gets b$, and the copies become $(a \gets t), (b \gets c), (c \gets a)$. Now $b$ is not a source: emit $b \gets c$. Then $c \gets a$ ($c$ is no longer a source), then $a \gets t$. The sequence is $t = b;\ b = c;\ c = a;\ a = t$ — **4** copies, $k' + c = 3 + 1$. `sequentialise` returns `[('t', 'b'), ('b', 'c'), ('c', 'a'), ('a', 't')]`. Check: $a$ gets the old $b$ (via $t$), $b$ the old $c$, $c$ the old $a$.
:::
:::

::: exercise Remainder by shifting {level=1 check="-3"}
Using [[#thm-pow2]] with $n = 2$, compute $-7 \bmod 4$ (C semantics, sign of the dividend) step by step. Enter the remainder.
::: solution
$x = -7 < 0$, so $b = 2^2 - 1 = 3$; in the code, $x \gg 63 = -1$ (all ones) and its logical shift right by $62$ is $3$. $x + b = -4$. Quotient: $-4 \gg 2 = -1$, which is $-7/4 = -1.75$ rounded towards zero. Remainder: $(-4) \mathbin{\&} 3 = 0$, minus $b$: $0 - 3 = -3$. Check: $4 \cdot (-1) + (-3) = -7$. Our compiler's output for `x % 8` and `x / 8` was tested against Python's truncating division for $x \in \set{-7, 7, -16, -1, 2^{63} - 1}$ and agrees.
:::
:::

::: exercise When maximal munch is not optimal {level=2 #ex-munch}
Suppose the target has `add` and `mul` instructions of cost 1 each, and a fused multiply-add `madd r1, r2, r3` computing $r_1 \cdot r_2 + r_3$ that covers the pattern `+(*(x, y), z)` and costs 4 (it is slow on this hypothetical machine). Give a tree for which maximal munch produces a worse tiling than dynamic programming, and the costs of both.
::: solution
Take `+(*(a, b), c)` with $a$, $b$, $c$ in registers. At the root, maximal munch compares the tiles that match: `add` covers 1 node, `madd` covers 2 (the `+` and the `*`). It chooses `madd`, at cost 4. Dynamic programming compares $\mathrm{cost}(\mathtt{madd}) + 0 = 4$ with $\mathrm{cost}(\mathtt{add}) + \mathrm{opt}(\ast(a, b)) = 1 + 1 = 2$ and chooses `mul` then `add`, at cost 2. Munch's criterion — cover as much as possible — is a proxy for cost that is right only when bigger tiles are never more expensive than the smaller tiles they replace.
:::
:::

::: exercise Stuck simplification {level=2}
The triangular prism has vertices $a, b, c, d, e, f$ and edges $a - b$, $b - c$, $a - c$, $d - e$, $e - f$, $d - f$, $a - d$, $b - e$, $c - f$. (a) Show that it is 3-colourable. (b) Show that simplification with $K = 3$ cannot remove any vertex. (c) Run `colour` with $K = 3$ and explain the result.
::: solution
(a) $a = 0, b = 1, c = 2, d = 1, e = 2, f = 0$: each triangle uses three colours and each rung $a - d$, $b - e$, $c - f$ joins different colours.

(b) Every vertex has degree 3 (two in its triangle and one rung), so none has degree $< K$.

(c) `colour` picks a spill candidate (with equal costs and degrees, the first vertex, $a$), after which the rest simplify. In select, $a$ is popped last; its neighbours got `{'f': 0, 'e': 1, 'd': 2, 'c': 1, 'b': 0}`, so $b = 0$, $c = 1$, $d = 2$ use all three colours and $a$ is spilled: the result is `({…}, ['a'])`. The optimistic heuristic succeeds only when the neighbours happen to share colours; here select's greedy choices ($c$ took 1 instead of 2) prevented it. Simplify/select is a heuristic, as it must be for an NP-complete problem; the iterative "spill, rewrite, rebuild" loop of production allocators would then allocate $a$'s short new temporaries, usually without further spills.
:::
:::

::: exercise Precise stack offsets {level=2 check="24"}
In `mini_h` from [[#ex-calls]], at which offset from `%rbp` does the callee find its eighth argument `k`? Explain from the push order. (Enter the number.)
::: solution
The caller executes `pushq $8` (the 8th argument) and then `pushq $7` (the 7th), so the 7th is at the lower address. `call` pushes the return address below them, and the callee's `pushq %rbp; movq %rsp, %rbp` puts the saved `%rbp` at `0(%rbp)`. So the return address is at `8(%rbp)`, the 7th argument at `16(%rbp)` and the 8th at **24**`(%rbp)` — the listing shows `movq 24(%rbp), %rbx`. In general, argument $n > 6$ is at $16 + 8(n - 7)$ bytes above `%rbp`, the expression in the emitter (with zero-based `n`).
:::
:::

::: exercise Caller-saved registers {level=3 #ex-caller-saved}
Extend the allocator to use the nine caller-saved registers `%rax`, `%rcx`, `%rdx`, `%rsi`, `%rdi`, `%r8`–`%r11` as well. (a) How should calls be represented in the interference graph? (b) How should the fixed registers of `idivq` and of argument passing be represented? (c) Why does this let GCC's `gcd` avoid saving any register?
::: solution
(a) Add a **precoloured** vertex for each physical register, already assigned its own colour and never simplified or spilled. A call defines (clobbers) all caller-saved registers, so every variable live across the call — live after it, other than the call's result — gets an edge to each caller-saved register's vertex, and can therefore only receive a callee-saved colour (or be spilled, with a store before and a load after the call, or be saved by the caller around the call — the allocator's choice through spill costs).

(b) Express fixed-register operands as copies to and from precoloured vertices: `t = a % b` becomes `rax = a; rdx:rax = cqto; idiv b; t = rdx`, where `idiv` defines `%rax` and `%rdx` and so interferes with everything live across it; arguments become copies `rdi = x` before the call, and parameters copies `a_0 = rdi` at the entry. Coalescing then removes those copies whenever the variable can live in the fixed register — this is exactly how register targeting arises from the general mechanism, without special cases.

(c) A leaf function contains no calls, so no variable interferes with the caller-saved registers on account of calls, and all its variables can be coloured with caller-saved registers, which the function need not preserve. Coalescing `a_0` with `%rdi`, the dividend with `%rax` and the remainder with `%rdx` yields almost exactly GCC's loop. Iterated register coalescing (George and Appel, 1996) is the standard algorithm that interleaves this coalescing with simplification.
:::
:::

::: exercise Linear scan {level=3}
JIT compilers often use **linear-scan allocation** (Poletto and Sarkar, 1999) instead of graph colouring. Number the instructions in block order, approximate each variable's lifetime by one interval from its first to its last live point, sort the intervals by start, and sweep: keep the active intervals in a list sorted by end; at each new interval, expire those that ended, and if all $K$ registers are taken, spill whichever of the active intervals and the new one ends last. (a) Implement it for our IR, using `liveness` to compute the intervals. (b) Explain why the result is correct but can be worse than colouring. (c) What is its running time?
::: solution
(a)

```python
def intervals(blocks):
    live_in, live_out = liveness(blocks)
    start, end, n = {}, {}, 0
    def touch(v, n):
        start.setdefault(v, n); end[v] = n
    for b, ins in blocks.items():
        for v in live_in[b]: touch(v, n)    # live on entry to the block
        live, after = set(live_out[b]), []
        for i in reversed(ins):             # live sets after each instruction
            after.append(set(live))
            live = (live - set(defs(i))) | {x for x in uses(i) if isinstance(x, str)}
        for i, live_after in zip(ins, reversed(after)):
            for v in set(defs(i)) | {x for x in uses(i) if isinstance(x, str)} | live_after:
                touch(v, n)
            n += 1
    return sorted((start[v], end[v], v) for v in start)

def linear_scan(blocks, k):
    active, free, reg, spilled = [], list(range(k)), {}, []
    for s, e, v in intervals(blocks):
        for a in [a for a in active if a[0] < s]:          # expire finished intervals
            active.remove(a); free.append(reg[a[1]])
        if free:
            reg[v] = free.pop(); active.append((e, v)); active.sort()
        else:
            last_end, last = active[-1]
            if last_end > e:                                 # spill the one ending last
                reg[v] = reg.pop(last); spilled.append(last)
                active[-1] = (e, v); active.sort()
            else:
                spilled.append(v)
    return reg, spilled
```

Checked on every function of the seven test programs: no two variables that interfere ever get the same register. Without coalescing on either side, `sum` from [[#ex-interf-sum]] needs 3, 5 and 6 spills with linear scan for $K = 5, 3, 2$, against 0, 2 and 3 with `colour`; `collatz` needs 2 against 0 at $K = 3$; on the small functions the two agree.

(b) Two variables get the same register only if their intervals do not overlap, and an interval contains every point at which its variable is live, so non-overlapping intervals imply non-interference; by [[#thm-colouring]] the assignment is correct. But an interval also covers points where the variable is *not* live — holes in its lifetime, for instance a variable live in two separate branches laid out one after another — so intervals overlap more often than live ranges interfere, and more spills can result. Production linear-scan allocators (as in the HotSpot client compiler and LLVM's former allocator) handle lifetime holes and split intervals to narrow the gap.

(c) Sorting the intervals takes $O(V \log V)$ for $V$ variables, and the sweep $O(V \log K)$ with a balanced structure for the active list (here a sorted Python list, $O(VK)$). Computing liveness is the usual iterative analysis. Compared with building an interference graph, which can have $\Theta(V^2)$ edges, this is why JITs favour it.
:::
:::
