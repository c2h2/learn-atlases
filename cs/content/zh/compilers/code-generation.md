[[compilers/dataflow-optimisation]] 末尾，我们的编译器已把 Euclid 算法变成了四行优化后的 SSA：

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

处理器没法运行这个。它没有 φ 函数，没有取之不尽的变量，也没有 `t1_0 = a_1 % b_1` 这条指令；它只有十六个 64 位寄存器、一个栈、运算数形式固定的指令——比如 `idivq`，它除的是 `%rdx:%rax` 里那个 128 位的值，把商留在 `%rax`、余数留在 `%rdx`——还有一套规定实参与结果必须放在哪里的**调用约定**。**后端**通过三项任务弥合这道鸿沟：

1. **指令选择**：为每个 IR 操作挑选能实现它的目标指令，最好能利用复杂指令和寻址模式。
2. **寄存器分配**：把取之不尽的 IR 变量映射到有限的寄存器上，寄存器不够时把一部分存入内存（"**溢出**"，spilling）。
3. **代码生成**：布置栈帧，遵循调用约定，排列各块的次序，写出汇编。

本章为 x86-64 把三项任务全部做出来：把 [[compilers/intermediate-representations]] 的每个测试程序翻译成由 GCC 汇编并运行的汇编代码，再与 GCC 自己的代码比较。其中的核心思想是一个漂亮的归约：寄存器分配就是对一个由活跃性构造的**干扰图**作**图着色**。

## 目标机器

我们生成 Linux 的 AT&T 语法 x86-64 汇编，遵循 [[computer-systems/machine-code#def-abi]] 所述的 **System V AMD64 ABI**。后端必须遵守的规则：

- 前六个整数实参经 `%rdi`、`%rsi`、`%rdx`、`%rcx`、`%r8`、`%r9` 传递；其余实参压栈传递，第七个在最低地址。返回值放在 `%rax`。
- `%rbx`、`%rbp` 和 `%r12`–`%r15` 是**被调用者保存**（callee-saved）的：用了它们的函数必须在返回前恢复。其余寄存器都是**调用者保存**（caller-saved）的：一次调用可能把它们破坏掉。
- 每条 `call` 指令处 `%rsp` 都必须是 16 的倍数（于是被调用方在返回地址压入之后，进入时在 $\mathit{rsp} \equiv 8 \pmod{16}$ 处看到栈指针）。
- 指令有两个运算数，第二个既是源又是目的（`subq %rbx, %rax` 计算 $\mathit{rax} \gets \mathit{rax} - \mathit{rbx}$），且至多一个能在内存里。

我们后端作了一个简化的决定：变量只分配到五个被调用者保存的寄存器 `%rbx`、`%r12`–`%r15`，把 `%rax`、`%rcx` 和 `%rdx` 用作单条指令展开过程中的工作寄存器。因为被调用者保存的寄存器能跨调用存活，跨越调用活跃的变量不需要特殊处理。工业界的分配器使用全部寄存器，处理调用的办法是让每个跨越调用活跃的变量与所有调用者保存寄存器互相干扰（[[#ex-caller-saved]]）。

## 指令选择

前端和优化器一个操作用一条 IR 指令；真实机器常常一条指令做几个操作。x86-64 有形如 $\mathit{disp}(\mathit{base}, \mathit{index}, \mathit{scale})$ 的寻址模式，意义是地址 $\mathit{base} + \mathit{index} \cdot \mathit{scale} + \mathit{disp}$，比例取 1、2、4 或 8；还有一条 `leaq` 指令，能不访问内存就算出这样的地址——一次三运算数的"乘比例再相加"。对 8 字节整数数组取 `a[i]` 的一次装载是 IR 里的三个操作（乘、加、装载），却是一条指令 `movq (%rdi,%rsi,8), %rax`。

要利用这一点，把基本块的 IR 看成若干表达式**树**组成的森林，把每条机器指令看成一片**瓦片**（tile）：它能计算的一种树模式，其叶子必须已经在寄存器里。

::: definition 覆盖 {#def-tiling}
一片**瓦片**是带代价的一种树模式；它的叶子要么是它能匹配的常量，要么是"洞"——由其他瓦片计算的值。表达式树 $T$ 的一个**覆盖**是这样的瓦片实例集合：$T$ 的每个结点恰被覆盖一次，且每片瓦片的洞都是集合中其他瓦片的根（或是 $T$ 中已放在寄存器里的叶子）。其代价是各瓦片代价之和。每片瓦片成为一条指令，在它的洞对应的指令之后发出。
:::

两种经典算法寻找覆盖。**极大匹配**（maximal munch）自顶向下：在根处选覆盖结点数最多的瓦片，再递归地覆盖它的洞对应的子树。**动态规划**自底向上：对每个结点，算出以它为根的子树的最便宜覆盖——尝试在该结点匹配的每片瓦片，加上各个洞的最便宜覆盖。

::: theorem 动态规划给出最便宜的覆盖 {#thm-dp-tiling}
若 $T$ 的每个结点至少被一片瓦片匹配，动态规划算法返回代价最小的覆盖，时间为 $O(\lvert T\rvert \cdot m)$，其中 $m$ 限制每个结点尝试的瓦片数（每片瓦片大小有界）。
:::

::: proof
设 $c(v)$ 是算法赋给以 $v$ 为根的子树 $T_v$ 的代价。对 $v$ 的高度归纳：$c(v)$ 是 $T_v$ 的覆盖的最小代价。$T_v$ 的任一覆盖恰有一片覆盖 $v$ 的瓦片 $t$；覆盖的其余部分由以 $t$ 的各洞为根的子树 $T_{h_1}, \dots, T_{h_r}$ 的覆盖构成，这些子树两两不交且更小。于是对一切覆盖取最小就是 $\min_t \bigl(\mathrm{cost}(t) + \sum_j \mathrm{opt}(h_j)\bigr)$，而由归纳假设 $\mathrm{opt}(h_j) = c(h_j)$；这正是算法所取的最小值。每个结点至多试 $m$ 片瓦片，每片常数时间检验，而备忘录法使每个 $c(v)$ 只算一次。
:::

各片瓦片代价不同时，极大匹配并不总是最优（[[#ex-munch]]），但当代价反映指令数目时它通常是最优的，而且更简单。对一小套瓦片——`addq` 与 `imulq` 的寄存器-寄存器形式和立即数形式、带一种寻址模式的 `leaq`、带寻址模式的装载与存储——两者都只需几行：

```python
def munch(t):
    """极大匹配：在每个结点取覆盖结点数最多的那片瓦片。"""
    best = max(tiles(t), key=lambda x: size(t) - sum(size(s) for s in x[2]))
    return [i for s in best[2] for i in munch(s)] + ([best[0]] if best[0] else [])

@lru_cache(maxsize=None)
def optimal(t):
    """动态规划：自底向上算出每棵子树的最便宜覆盖。"""
    return min((cost + sum(optimal(s)[0] for s in subs),
                [i for s in subs for i in optimal(s)[1]] + ([tmpl] if tmpl else []))
               for tmpl, cost, subs in tiles(t))
```

这里 `tiles(t)` 把在 `t` 的根处匹配的每片瓦片返回成一条指令模板、一个代价、以及留在它的洞里的子树列表。

::: example 覆盖一条数组更新语句 {#ex-tile}
对 8 字节整数数组覆盖语句 `a[i + 1] = a[i] + x * 4`，其中 `a`、`i` 和 `x` 在寄存器里。
::: solution
写成树，并把地址挑明：

```text
store( a + (i + 1) * 8,
       load(a + i * 8) + x * 4 )
```

它有 18 个结点。一条指令一个结点的翻译要为它的 7 个运算符和 4 个常量各花一条指令。两种算法找出同一个 4 条指令的覆盖：

```text
munch:   ['addq $1, R1', 'movq (B, I, 8), R', 'leaq (B, I, 4), R', 'movq V, (B, I, 8)']
optimal: (4, ['addq $1, R1', 'movq (B, I, 8), R', 'leaq (B, I, 4), R', 'movq V, (B, I, 8)'])
```

也就是说：算 $i + 1$；用一次带寻址模式的装载取 `a[i]`；用一条 `leaq` 算出 $\mathit{load} + 4x$（基址 = 装来的值，变址 = $x$，比例 4）；再用寻址模式 $(a, i{+}1, 8)$ 存储。乘 8 全消进了寻址模式，乘 4 消进了 `leaq`。
:::
:::

### 代数选择：除以 2 的幂

最有价值的选择规则中，有一些是用一串便宜指令替换一条昂贵指令。`idivq` 在当今处理器上要几十拍；一次移位只要一拍。不过除以 $2^n$ 并不就是一条算术右移，因为移位向 $-\infty$ 舍入，而 C（和 Mini）向零舍入：$-7 \gg 1 = -4$ 而 $-7 / 2 = -3$。

::: theorem 除以 2 的幂的带符号除法 {#thm-pow2}
设 $x$ 是 64 位补码整数，$1 \le n \le 62$，并设 $x < 0$ 时 $b = 2^n - 1$，否则 $b = 0$。则向零舍入的商是 $q = (x + b) \gg n$（算术移位），余数是 $x - 2^n q = \bigl((x + b) \mathbin{\&} (2^n - 1)\bigr) - b$；而 $b$ 本身可以无分支地算作 $(x \gg 63) \ggg (64 - n)$，其中 $\ggg$ 是逻辑（无符号）右移。
:::

::: proof
算术右移 $n$ 位计算 $\lfloor y / 2^n \rfloor$。若 $x \ge 0$，$b = 0$，$\lfloor x / 2^n \rfloor$ 就是向零舍入的商。若 $x < 0$，向零舍入就是向上取整，而对整数有 $\lceil x / m \rceil = \lfloor (x + m - 1) / m \rfloor$ 对 $m \ge 1$ 成立（写 $x = km - r$，$0 \le r < m$：$r = 0$ 与 $r > 0$ 时两边都等于 $k$）。取 $m = 2^n$ 便是 $(x + b) \gg n$。加法不会溢出，因为 $x < 0$ 且 $b < 2^{63}$。

余数方面，写 $x + b = 2^n q + s$，$0 \le s < 2^n$；那么 $s$ 就是 $x + b$ 的低 $n$ 位，即 $(x + b) \mathbin{\&} (2^n - 1)$，而 $x - 2^n q = s - b$。

最后，$x \gg 63$ 在 $x \ge 0$ 时是 $0$，在 $x < 0$ 时是 $-1$（64 位全置 1）；把它逻辑右移 $64 - n$ 位留下 $0$ 个或 $n$ 个 1，即 $2^n - 1$。
:::

```python
def select_op(i, op, dst, move, emit):
    """若有特殊模式处理了这条指令则返回 True。"""
    _, d, o, a, b = i
    if o in ("/", "%") and isinstance(b, int) and b > 1 and b & (b - 1) == 0:
        n = b.bit_length() - 1                 # 对 2**n 的带符号除法，向零舍入
        move(op(a), "%rax"); emit("movq", "%rax", "%rdx")
        emit("sarq", "$63", "%rdx"); emit("shrq", f"${64 - n}", "%rdx")   # 偏置：a<0 时为 2**n-1
        emit("addq", "%rdx", "%rax")
        if o == "/": emit("sarq", f"${n}", "%rax")
        else: emit("andq", f"${b - 1}", "%rax"); emit("subq", "%rdx", "%rax")
        move("%rax", dst); return True
    if o in ARITH and "(" not in dst and op(b) != dst:     # 两地址形式，不经 %rax 绕路
        move(op(a), dst); emit(ARITH[o], op(b), dst); return True
    if o in ("+", "*", "^") and "(" not in dst and op(a) != dst:   # 可交换：交换
        move(op(b), dst); emit(ARITH[o], op(a), dst); return True
    return False
```

另外两个模式选的是**两地址形式**：当 $d$ 是与 $b$ 不同的寄存器时，`d = a - b` 变成 `movq a, d; subq b, d`，而不用绕道 `%rax`。

::: example GCC 用的是同一串指令 {#ex-gcc-div}
用 GCC 15.2 在 `-O2` 下编译 `long m8(long x) { return x % 8; }` 和 `long d3(long x) { return x / 3; }`。
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

`m8` 正是 $n = 3$ 时的 [[#thm-pow2]]（`shrq $61` 就是 $64 - n$），只是加法由一条 `leaq` 完成、掩码由 32 位的 `andl` 完成（其结果零扩展到 64 位）。除以 3 时，GCC 乘上"魔数" $6148914691236517206 = \lceil 2^{64}/3 \rceil$，取 128 位乘积的高 64 位（单运算数 `imulq` 把它留在 `%rdx`），并且若 $x$ 为负则加 1（减去 $x \gg 63 = -1$）。这个方法对每个常量除数都有效，归功于 Granlund 与 Montgomery（1994 年）。连 `-O0` 下 GCC 都会把 `n / 2` 换成移位序列；在我们的编译器里，`select_op` 之前才会用 `idivq`。
:::
:::

## 离开 SSA

分配之前，φ 函数必须变成复制。[[compilers/intermediate-representations]] 表明这里颇有讲究：块开头的 φ 是*同时*执行的，所以每条进入边上的复制构成一个**并行复制** $(x_1, \dots, x_k) \gets (y_1, \dots, y_k)$；而复制只有在前驱只有一个后继时才能放到该前驱的末尾。所以我们先拆开每条**临界边**——从有多个后继的块通往含 φ 且有多个前驱的块的边——办法是在边上插一个空块；然后把每个并行复制变成一串顺序执行的复制。

::: lemma 并行复制的顺序化 {#lem-parallel}
设 $(x_1, \dots, x_k) \gets (y_1, \dots, y_k)$ 是一个各目标互不相同的并行复制，且没有目标等于备用变量 $t$。反复执行：若某条复制 $x_i \gets y_i$ 的目标不是任何剩余复制的源，就发射它并删去它；否则对某条剩余复制发射 $t \gets y_i$，并在所有剩余复制中把源 $y_i$ 换成 $t$。这产生一串效果相同的普通复制，长度为 $k' + c$，其中 $k'$ 是满足 $x_i \ne y_i$ 的复制条数，$c$ 是其中的环的个数。
:::

::: proof
不变式：先执行已发射的序列、再*并行地*执行剩余各复制，对诸 $x_i$ 的效果与原并行复制相同。发射一条目标不再是剩余任何复制之源的复制 $x_i \gets y_i$ 保持之：剩余复制不读 $x_i$，所以先把它覆盖掉，不改变剩余复制算出的任何东西。发射 $t \gets y_i$ 并把读 $y_i$ 的复制改读 $t$ 也保持之，因为 $t$ 此刻装着它们要的数。过程终止：每步要么删去一条复制，要么（第二种情形）使某条复制下一步就绪——改写之后 $y_i$ 不再是源，而由于目标互不相同，目标为 $y_i$ 的那条唯一复制（它存在，因为没有任何复制就绪时每个目标都是源）此刻就绪。没有复制就绪时，每个剩余目标同时也是源，于是剩余复制构成一些互不相交的环（每个变量至多是一条复制的目标、至少是一条复制的源）；每个环要经 $t$ 多花一条复制，其余复制各发射一次。
:::

```python
def sequentialise(copies, tmp):
    """并行复制 [(dst, src)] -> 等价的顺序列表，用 tmp 处理环。"""
    copies = [(d, s) for d, s in copies if d != s]
    seq = []
    while copies:
        srcs = {s for _, s in copies}
        ready = [(d, s) for d, s in copies if d not in srcs]   # 没有待执行的复制读 d
        if ready:
            seq.append(ready[0]); copies.remove(ready[0])
        else:                                                   # 只剩环
            d, s = copies[0]
            seq.append((tmp, s))
            copies = [(d2, tmp if s2 == s else s2) for d2, s2 in copies]
    return seq

def out_of_ssa(params, blocks):
    blocks = {b: list(ins) for b, ins in blocks.items()}
    preds = predecessors(blocks)
    for b in list(blocks):                  # 拆开 p 处分支、b 处汇合的边 p -> b
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

对那个曾难住朴素翻译的交换循环，体末尾的复制构成并行复制 $(a_1, b_1) \gets (b_1, a_1)$，恰是一个环，而 `sequentialise` 返回 `swap_tmp = b_1; b_1 = a_1; a_1 = swap_tmp`——三条复制，正如引理所料。七个测试程序如今全都输出正确结果。

## 寄存器分配

离开 SSA 之后，`gcd` 读起来是：

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

它有五个变量。需要多少个寄存器？两个变量从不同时被需要，就能共用一个寄存器——也就是说，从不同时**活跃**（[[compilers/dataflow-optimisation#def-live]]）。

::: definition 干扰图 {#def-interference}
一个函数的**干扰图**（interference graph）为每个变量设一个顶点，并且当 $u$ 与 $v$ **互相干扰**时连一条边 $u - v$：某条指令在 $v$ 此后仍活跃（$v \ne u$）的点定义 $u$；唯一的例外是复制 $u = v$ 不使 $u$ 与 $v$ 互相干扰。**移动相关**的变量——一条复制的源与目标——另外记录。
:::

::: theorem 着色即寄存器分配 {#thm-colouring}
若 $c$ 把每个变量赋给 $K$ 个寄存器之一，且干扰图相邻的顶点得到不同寄存器（一个**真 $K$-着色**），那么把每个变量 $v$ 存放在寄存器 $c(v)$ 中执行该函数，与用无限多变量执行的结果相同。
:::

::: proof
只要证明：每当变量 $v$ 被使用，寄存器 $c(v)$ 里装的就是 $v$ 的当前值。考察 $v$ 的一次使用和执行路径上它之前最近的一次 $v$ 的定义 $d$；$v$ 在二者之间每一点都活跃。假设 $c(v)$ 在中间被某个 $u \ne v$ 的定义改写，且 $c(u) = c(v)$。在那个点 $v$ 此后仍活跃，所以 $u - v$ 是一条边——除非那条定义是复制 $u = v$。边迫使 $c(u) \ne c(v)$，所以它必是复制 $u = v$，而复制把 $v$ 的值写进 $c(v)$，值保持不变。（若其后 $u$ 在 $v$ 仍活跃期间又被重新定义，那次定义同样被上述论证覆盖。）于是 $v$ 的每次使用读到的都是 $v$ 的值。
:::

对复制的例外至关重要：它让一条复制的源和目标能共用寄存器，此时那条复制成为空操作，由发射器删掉。构造干扰图就是每个块往回走一遍，从 [[compilers/dataflow-optimisation]] 算出的 live-out 集合出发：

```python
def interference(blocks, params):
    live_in, live_out = liveness(blocks)
    nodes = set(params) | {d for ins in blocks.values() for i in ins for d in defs(i)}
    graph, moves = {v: set() for v in nodes}, []
    for b, ins in blocks.items():
        live = set(live_out[b])
        for i in reversed(ins):             # 往回走，与活跃性方程一致
            for d in defs(i):
                others = live - {d}
                if i[0] == "=" and isinstance(i[2], str):
                    others.discard(i[2]); moves.append((d, i[2]))   # Chaitin 的移动规则
                for v in others: graph[d].add(v); graph[v].add(d)
                live.discard(d)
            live |= {x for x in uses(i) if isinstance(x, str)}
    entry = next(iter(blocks))              # 入口处各形参同时被定义
    for p in params:
        for q in (live_in[entry] | set(params)) - {p}: graph[p].add(q); graph[q].add(p)
    return graph, moves
```

对 `gcd` 程序报告边 $a_1 - t_{1,0}$、$a_1 - b_1$、$a_1 - b_0$、$b_1 - t_{1,0}$ 和 $a_0 - b_0$，以及复制 $(b_1, b_0)$、$(a_1, a_0)$、$(b_1, t_{1,0})$、$(a_1, b_1)$。三角形 $a_1, b_1, t_{1,0}$ 说明需要三个寄存器：在 `t1_0 = a_1 % b_1` 处，两个运算对象都还活跃时就得算出余数，因为后面跟着 `a_1 = b_1` 和 `b_1 = t1_0`。

### 通过化简着色

判定一个图能否用 $K$ 种颜色着色，对一切 $K \ge 3$ 都是 NP 完全的，我们还将看到干扰图一般并不更容易。但一个简单的观察——可以追溯到 Kempe 1879 年那次证明四色定理的尝试——给出了有效的启发法。

::: lemma 低次顶点可以删去 {#lem-kempe}
若图 $G$ 的一个顶点 $v$ 的邻结点数少于 $K$，则 $G$ 是 $K$-可着色的当且仅当 $G - v$ 是。
:::

::: proof
$G$ 的一个 $K$-着色限制到 $G - v$ 上即得 $G - v$ 的一个 $K$-着色。反过来，给定 $G - v$ 的一个 $K$-着色，$v$ 的邻顶点至多用掉 $\deg(v) < K$ 种颜色，所以总有颜色可以留给 $v$。
:::

**Chaitin 算法**（1981 年）反复应用这条引理。**简化**：只要还有顶点度数 $< K$，就把它删去并压进栈。若剩下的每个顶点度数都 $\ge K$，就选一个**溢出**（spill）——存内存而不是寄存器——在与度数相比时偏爱**溢出代价**低（使用与定义的次数，按循环深度 $d$ 加权 $10^d$）的顶点，把它删去，继续。**选择**：依次弹出顶点，给每个顶点一种它的已着色邻顶点没用过的颜色；由 [[#lem-kempe]]，每个因低次而被删的顶点都能找到一种。**Briggs、Cooper 与 Torczon**（1989 年；期刊版 1994 年）观察到：溢出候选者出栈时仍可能找到空闲颜色——它的邻顶点可能共用颜色——于是他们乐观地把候选者也压栈，只在选择阶段真的着色失败时才溢出它（[[#quiz-optimistic]]）。我们的版本还在空闲颜色中优先选已分给某个移动伙伴的那种，好让它们之间的复制消失（**带偏置着色**）：

```python
def colour(graph, k, moves=(), cost=None):
    cost = cost or {v: 1 for v in graph}
    g = {v: set(n) for v, n in graph.items()}
    stack = []
    while g:
        low = [v for v in g if len(g[v]) < k]
        v = low[0] if low else min(g, key=lambda v: cost[v] / len(g[v]))   # 溢出候选者
        stack.append(v)
        for n in g.pop(v): g[n].discard(v)
    partner = {}
    for a, b in moves: partner.setdefault(a, []).append(b); partner.setdefault(b, []).append(a)
    col, spilled = {}, []
    while stack:
        v = stack.pop()
        taken = {col[n] for n in graph[v] if n in col}
        free = [c for c in range(k) if c not in taken]
        if not free: spilled.append(v); continue          # 真正的溢出
        biased = [col[p] for p in partner.get(v, []) if col.get(p) in free]
        col[v] = biased[0] if biased else free[0]         # 优先选移动伙伴已用过的颜色
    return col, spilled
```

被溢出的变量住在栈槽里。在真正的分配器里，这意味着在每个使用之前、每个定义之后，把装载与存储插进一些新造的短命临时变量，然后重新运行分配器，因为临时变量也需要寄存器。我们的后端避免这轮迭代：x86-64 指令可以带一个内存运算数，剩下的交给工作寄存器 `%rax`、`%rcx` 和 `%rdx` 处理。

::: quiz {#quiz-optimistic}
干扰图是一个 4-圈 $a - b - c - d - a$，$K = 2$。Chaitin 的原始算法怎么做？Briggs 的乐观版本怎么做？
- [ ] 两者都不溢出就完成着色，因为图里没有三角形
- [x] Chaitin 的溢出一个顶点；Briggs 的给全部四个顶点着色
- [ ] 两者都必须溢出一个顶点，因为每个顶点度数都是 2
- [ ] Chaitin 的完成着色；Briggs 的溢出一个顶点
::: solution
每个顶点度数都是 $2 = K$，所以简化一开始就卡住，必须选一个溢出候选者。Chaitin 算法立刻把它溢出。它被删去后，剩下的路 $b - c - d$ 能完全化简。Briggs 的版本把候选者 $a$ 也压栈，到选择阶段它最后出栈：它的邻顶点 $b$ 和 $d$ 不相邻且都拿到了同一种颜色（路被交替着色 $b = 0$、$c = 1$、$d = 0$），所以颜色 1 空着留给 $a$。我们的 `colour` 作用在这个图上返回 `{'d': 0, 'c': 1, 'b': 0, 'a': 1}`，没有溢出。4-圈是 2-可着色的——每个偶圈都是。
:::
:::

### 合并

每条源和目标拿到同一寄存器的复制都是免费的。**合并**（coalescing）在着色之前把移动相关、互不干扰的顶点合并成一个，从而保证它们拿到同一种颜色。但合并可能使图更难着色——合并后的顶点兼有两个顶点的邻结点——从而引发溢出。**保守合并**只在这种事不可能发生时才合并。

::: theorem Briggs 合并检验 {#thm-briggs}
设 $x$ 与 $y$ 是 $G$ 的一对不相邻顶点，$xy$ 表示把它们合并所得的顶点。若 $xy$ 中度数 $\ge K$ 的邻结点（在合并后的图中）少于 $K$ 个，那么只要简化能把 $G$ 的每个顶点都删去而不溢出，它对合并后的图也能做到。
:::

::: proof
关于简化的两个事实。(i) 一个图能化简成功，恰好当它的每个子图都有度数 $< K$ 的顶点；特别地，若它在 $G$ 上成功，就在 $G$ 的每个子图上成功。(ii) 删除的次序无关紧要，因为删去一个顶点绝不会抬高别的顶点的度数。称合并后的图为 $H$。在 $H$ 中，先删去 $xy$ 的所有度数 $< K$ 的邻顶点；轮到它们时它们每个度数仍 $< K$。这时 $xy$ 只剩下高度数邻结点——少于 $K$ 个——可以删去。剩下的部分是 $H$ 去掉 $xy$ 及某些其他顶点，它是 $G - x - y$ 的子图（删去 $xy$ 恰好删掉了那些不属于 $G$ 的仅有边），从而也是 $G$ 的子图。由 (i)，简化在它上面成功。
:::

```python
def coalesce(graph, moves, k):
    """在不会损害可着色性时，合并移动相关、互不干扰的结点。"""
    g = {v: set(n) for v, n in graph.items()}
    alias = {}
    find = lambda v: find(alias[v]) if v in alias else v
    for x, y in moves:
        x, y = find(x), find(y)
        if x == y or y in g[x]: continue                  # 同一个结点，或它们互相干扰
        merged = g[x] | g[y]
        if sum(len(g[n] - {x, y}) + 1 >= k for n in merged) >= k: continue   # Briggs
        for n in g.pop(y): g[n].discard(y); g[n].add(x)   # y 并入 x
        g[x] = merged - {x, y}
        alias[y] = x
    return g, {v: find(v) for v in graph}
```

对 `gcd`，合并把 $a_0$ 并入 $a_1$、$b_0$ 并入 $b_1$；复制 $(b_1, t_{1,0})$ 和 $(a_1, b_1)$ 连着互相干扰的顶点，必须保留。

::: example 嵌套循环中的干扰 {#ex-interf-sum}
为测试程序 `nested` 里的函数 `sum` 分配寄存器：

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
优化并离开 SSA 之后，`sum` 有 14 个变量；干扰图有 14 个顶点。合并吸收了 `s` 的各份复制（$s_1, s_2, s_5, s_6$ 以及计算 `s` 新值的临时量 $t_4$、$t_5$）、$t_6$ 并入 $j_2$、$t_7$ 并入 $i_1$，剩下 7 个顶点：$s$、$i$、$n$、$j$ 以及短命临时量 $t_1 = i + j$、$t_2 = t_1 \bmod 3$、$t_3 = i \cdot j$。在内层循环里，$s$、$i$、$n$ 和 $j$ 处处活跃，构成一个 4-clique；每个临时量活跃时这四个都活跃，但任意两个临时量从不同时活跃。

::: widget graph
nodes: s@0,1; i@1,0; n@1,2; j@2,1; t1@4,0; t2@4,1; t3@4,2
edges: s-i; s-n; s-j; i-n; i-j; n-j; t1-s; t1-i; t1-n; t1-j; t2-s; t2-i; t2-n; t2-j; t3-s; t3-i; t3-n; t3-j
algorithm: colour
caption: 合并后 `sum` 的干扰图。运行贪心着色（按结点列出的次序着色）：clique $s, i, n, j$ 用去四种颜色，三个临时量共用第五种，因为它们彼此不干扰。有 $K = 5$ 个寄存器时什么都不用溢出；再少，就必须溢出点什么。
:::

程序的结果与此相符：$K = 5$ 时，`colour` 返回 `{'s_2': 0, 't1_0': 1, 'i_1': 2, 'n_0': 3, 'j_2': 4, 't3_0': 1, 't2_0': 1}`，没有溢出。（选择阶段恰好在只有 $s$ 分了颜色时给临时量着色，于是它们拿走了颜色 1 而不是 4：任何空闲颜色都行。）$K$ 更小时生成的程序仍然运行正确，只是有更多变量住在内存里：

| $K$ | 5 | 4 | 3 | 2 |
|---|---|---|---|---|
| `sum` 中溢出的合并顶点数 | 0 | 1 | 2 | 3 |

$K = 2$ 时，Briggs 检验拒绝了更多合并，被溢出的顶点是 $s_2$、$i_1$ 与 $n_0$；$j_2$ 因为溢出代价最高（610：它出现在内层循环里的各处各计 100），保住了一个寄存器。
:::
:::

### 寄存器分配有多难？

::: theorem 寄存器分配是 NP 完全的 {#thm-np}
对每个图 $G$，都存在一个程序，其干扰图就是 $G$。于是，判定一个程序的变量能否在不插入复制的前提下分配进 $K$ 个寄存器而不溢出，对一切 $K \ge 3$ 都是 NP 完全的。
:::

::: proof
给定顶点为 $v_1, \dots, v_n$、边为 $e_1, \dots, e_m$ 的 $G$，构造一个带形参 $p$ 的函数，其入口是一串测试（$p = 1$、$p = 2$、……）作分支，通向 $m$ 个块 $E_1, \dots, E_m$ 之一。若 $e_j = v_a - v_b$，块 $E_j$ 执行 `v_a = 1; v_b = 2; r = v_a + v_b` 并跳转到一个返回 `r` 的出口块。活跃性：$p$ 只在测试串里活跃；每个 $v_i$ 只在定义它的那些块 $E_j$ 内、从它的定义到指令 `r = v_a + v_b` 之间活跃；$r$ 只从它的定义到返回活跃。在 $E_j$ 里，$v_b$ 被定义时 $v_a$ 还活跃，所以 $v_a - v_b$ 是一条边；$G$ 中没有边相连的两个 $v_i$ 从不出现在同一个块里，也从不同时活跃。在 `r = v_a + v_b` 处两个运算对象同时死去，所以 $r$ 不与任何东西干扰，$p$ 也不。于是干扰图是 $G$ 加上两个孤立顶点，该程序能分配到 $K \ge 1$ 个寄存器而不溢出，恰好当 $G$ 是 $K$-可着色的。判定 $K$-可着色对每个固定的 $K \ge 3$ 都是 NP 完全的（一般图着色：Karp，1972 年；$K = 3$ 时甚至对平面图已成立：Garey、Johnson 与 Stockmeyer，1976 年），而一个候选分配可在多项式时间内检验。
:::

这个构造是 Chaitin 的，出自 1981 年那篇引入着色分配器的论文。有一点曲折：*SSA 形式下*（还没离开 SSA 时）程序的干扰图是**弦图**——长度至少为 4 的每个圈都有弦——因为每个变量的活跃区间是必经结点树上的一棵子树，而一棵树的诸子树的相交图是弦图（Gavril，1974 年）。弦图可以在常数时间内最优着色，用的颜色数等于最大 clique 的大小，它恰等于同时活跃变量的最大个数。这一事实于 2005–2006 年前后由 Hack、Grund 与 Goos，以及 Bouchez、Darte 与 Rastello，以及 Brisk 和合作者们分别独立发现。它与 [[#thm-np]] 并不矛盾：困难转移到了离开 SSA 时引入的复制上，而把这些复制最小化（最优合并）是 NP 难的。

## 代码生成

最后阶段按次序走各个块，写出汇编。每个函数的栈帧装着保存的 `%rbp`、每个溢出变量一个槽，以及该函数用到的被调用者保存寄存器：

```text
        高地址
  16(%rbp)   第 7 个实参，24(%rbp) 第 8 个，……   （由调用方压栈）
   8(%rbp)   返回地址
   0(%rbp)   调用方的 %rbp
  -8(%rbp)   溢出槽 1，-16(%rbp) 槽 2，……
             （填充使 %rsp 保持 16 字节对齐）
             保存的 %rbx、%r12，……（该函数用到的那些）
             <- %rsp
```

发射器的核心，其中 `loc` 把每个变量映到它的寄存器或栈槽：

```python
ALLOC = ["%rbx", "%r12", "%r13", "%r14", "%r15"]   # 被调用者保存：跨调用存活
ARGS = ["%rdi", "%rsi", "%rdx", "%rcx", "%r8", "%r9"]

    out = [f"mini_{name}:", "\tpushq\t%rbp", "\tmovq\t%rsp, %rbp"]
    frame = 8 * len(spilled)
    if (frame + 8 * len(used)) % 16: frame += 8   # 调用处 %rsp 保持 16 字节对齐
    if frame: out.append(f"\tsubq\t${frame}, %rsp")
    for r in used: out.append(f"\tpushq\t{r}")
    ...
    for n, p in enumerate(params):             # 把实参移进各自分配好的家
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
                else:                              # / 与 %：idiv 除的是 %rdx:%rax
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
                ...                                # cmpq，然后一条条件跳转；跳到
            elif k_ == "jmp":                      # 下一个块的跳转被省略
                if i[1] != nxt: emit("jmp", f".{name}_{i[1]}")
            elif k_ == "ret":
                move(op(i[1]), "%rax")
                if nxt is not None: emit("jmp", f".{name}_ret")
    out.append(f".{name}_ret:")
    for r in reversed(used): out.append(f"\tpopq\t{r}")
    out += ["\tleave", "\tret"]
```

`move` 删去相同位置之间的复制，并把内存到内存的复制和 64 位立即数经 `%rax` 中转。真目标恰是下一个块的条件分支要反过来发射（`if b != 0 goto L2 else L3`，若下一个块是 `L2`，就发成 `je .L3`）。函数统一冠以 `mini_` 前缀，以免与 C 库冲突；三行 C 运行时提供 `main` 和 `print`：

```c
#include <stdio.h>
long mini_main(void);
long mini_print(long x) { printf("%ld\n", x); return x; }
int main(void) { return (int)mini_main(); }
```

七个测试程序中的每一个，用 `gcc -o prog prog.s rt.c` 汇编链接后，都打印出与期望分毫不差的输出——$K = 5$ 时如此，$K = 3$、$2$ 和 $1$ 时也如此，尽管这时每个程序最多有 9 个（合并后的）变量住在内存而不是寄存器里。

::: example Euclid 算法：从源代码到机器码 {#ex-gcd-asm}
展示 `gcd` 的最终代码，并与 GCC 对 C 语言同名函数的代码比较。
::: solution
我们的（带 `select_op`），以及 GCC 15.2 在 `-O2` 下对 `long gcd(long a, long b) { while (b != 0) { long t = a % b; a = b; b = t; } return a; }` 的输出：

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

合并把 $a_0, a_1$ 放进 `%r12`、$b_0, b_1$ 放进 `%r13`，于是入口复制消失了；循环里有轮换 $(a, b, t) \gets (b, t, a \bmod b)$ 在 `idivq` 周围所需要的三条传送。GCC 的循环是六条指令，我们的是十条，因为它把变量分配进 `idivq` 自身使用的寄存器里：$a$ 留在 `%rax`，余数直接从 `%rdx` 取用。这就是**寄存器定向**（register targeting）——对运算数是固定寄存器指令的 IR 变量预先着色。GCC 还把**循环旋转**了：在循环之前和每圈底部各测一次 $b \ne 0$，省掉那条无条件跳转。而且它不需要栈帧：它只用调用者保存寄存器，而叶函数从不用保存它们。
:::
:::

::: example 带栈上实参的调用 {#ex-calls}
测试程序 `manyargs` 调用 `h(1, 2, 3, 4, 5, 6, 7, 8)`。展示这次调用和被调函数开头的序言如何编译。
::: solution
调用方（`mini_main`）和被调函数的开头：

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

第 7 个与第 8 个实参按逆序压栈，所以第 7 个落在低地址处，在被调函数里是 `16(%rbp)`，位于返回地址与保存的 `%rbp` 之上。两次压栈保持 `%rsp` 对齐，所以不需要额外填充；调用方用 `addq $16, %rsp` 把它们弹掉。在调用方这边，栈帧是 8 字节填充加一个保存的寄存器：连同压入的 `%rbp` 与返回地址，`call` 处 `%rsp` 恰为 16 的倍数。在 `h` 里，八个形参在入口处全都活跃，在干扰图中构成一个 8-clique：$K = 5$ 时其中三个被溢出（到 `-8`、`-16` 和 `-24(%rbp)`），24 字节的溢出区加五个保存的寄存器共 64 字节，是 16 的倍数，程序打印 $40$。
:::
:::

::: warning ABI 是正确性的一部分
违反调用约定的代码可能通过所有测试却仍是错的。我们的发射器在调用处保持 `%rsp` 16 字节对齐。若把那个填充去掉，七个测试仍然打印正确答案——但只要把运行时的 `print` 改成 `printf("%ld %.1f\n", x, (double)x)`，每个程序都会死于段错误（信号 11）。一旦有浮点参数，glibc 的 `printf` 会用 `movaps` 保存向量寄存器，而这条指令要求地址 16 字节对齐。原来的运行时根本到不了那样的指令，所以这个缺陷一直隐形。同样的道理也适用于被调用者保存寄存器（一个破坏 `%rbx` 的函数会坑害指望它的调用方，而且出问题的地方可能离缺陷很远），以及红区、信号处理、还有调试器和 C++ 异常需要的展开信息（`.cfi` 指示）。要用别的编译器编译出的代码，从两个方向测试你的后端。
:::

## 有多好？

::: example 给后端做基准测试 {#ex-bench}
分别用 Mini 和 C 计算 $\sum_{i=1}^{2\,999\,999} \mathrm{collatz}(i)$——Collatz 步数总和——并对程序计时。
::: solution
五个程序都打印 428343355。在一台 Intel Xeon E5-2696 v3（2.3 GHz，共享机器，所以计时有约 10% 的波动）上取五次运行的最好成绩：

| program | time (s) |
|---|---|
| Mini, SSA without optimisation, plain selection | 8.36 |
| Mini, optimised, plain selection | 8.63 |
| Mini, optimised, with `select_op` | 1.45 |
| C, `gcc -O0` | 2.03 |
| C, `gcc -O1` | 0.89 |
| C, `gcc -O2` | 0.74 |

[[compilers/dataflow-optimisation]] 的那些优化删掉了复制，但朴素的后端把几乎全部时间都花在每个迭代里的两条 `idivq` 上（算 `n % 2` 和 `n / 2`），所以它们没有带来可测的差别。把它们换成 [[#thm-pow2]] 的移位序列后，我们的代码快了几乎六倍——比不做优化的 GCC 还快（后者把每个变量都放在内存里），但仍比 `gcc -O2` 慢大约两倍；`gcc -O2` 用一条 `testb $1, %dil` 测试 `n % 2 == 0`，用一条 `leaq 1(%rdi,%rdi,2), %rdi` 计算 `3 * n + 1`，用一条光秃秃的 `sarq` 对偶数 `n` 折半（除法恰尽时不需要偏置），甚至把每个奇数步与紧随其后必然发生的折半合并在一起，因为 $n$ 为奇数时 $3n + 1$ 必为偶数（计数值往上跳 2）。在这个程序上，指令选择比所有 IR 优化加起来还重要。在别的程序上 IR 优化占大头；教训就是要测量。
:::
:::

::: history
第一个 FORTRAN 编译器（Backus 等人，IBM，1957 年）已经用基于使用频率的方法为 IBM 704 的三个变址寄存器作分配，预示了溢出代价的思想。Ershov（1958 年）以及 Sethi 与 Ullman（1970 年）展示了怎样用最少的寄存器求值表达式树。Aho 与 Johnson 的 "Optimal code generation for expression trees"（1976 年）引入了树上的动态规划；Glanville 与 Graham（1978 年）用树模式的 LR 分析器生成代码，而 BURG、iburg（Fraser、Hanson 与 Proebsting，1992 年）这样的树文法生成器使覆盖式选择器成为标准。Davidson 与 Fraser（1980 年）引入了可重构的窥孔优化，是 GCC RTL 的祖先。Gregory Chaitin 与 IBM 的同事们为 PL.8 编译器造出了第一个图着色分配器（"Register allocation via coloring"，1981 年；"Register allocation and spilling via graph coloring"，1982 年）。Preston Briggs、Keith Cooper 与 Linda Torczon 加入了乐观着色与保守合并（"Improvements to graph coloring register allocation"，*TOPLAS* 1994 年）；Lal George 与 Andrew Appel 在 "Iterated register coalescing"（1996 年）中把合并与简化交织在一起。Massimiliano Poletto 与 Vivek Sarkar 的线性扫描分配（1999 年）在 JIT 编译器里用质量换速度，而 2005–2006 年前后若干研究小组发现 SSA 的干扰图是弦图。Torbjörn Granlund 与 Peter Montgomery 的 "Division by invariant integers using multiplication"（PLDI 1994）给出了 GCC 使用的魔数方法。
:::

## 后续内容

我们的后端只处理 64 位整数。真正的后端还要选择浮点与向量指令，对指令作**调度**让流水线保持忙碌（列表调度、软件流水线），安排块的布局让常走的路径顺序落下，并生成调试与展开表。编译出的程序还依赖那些在其代码里完全看不见的服务：内存分配、垃圾回收、动态分派、异常处理。那些是 [[compilers/runtime-systems]] 的主题。

::: summary
- 后端执行**指令选择**、**寄存器分配**与**代码生成**，遵循平台的 **ABI**（x86-64 Linux 的 System V：实参先经 `%rdi`…`%r9`，之后走栈；`%rbx`、`%rbp`、`%r12`–`%r15` 由被调用者保存；调用处 16 字节对齐）。
- 指令选择是**树覆盖**；极大匹配简单快捷，动态规划则最优（[[#thm-dp-tiling]]）。像把除以 $2^n$ 换成移位（[[#thm-pow2]]）这样的代数规则，有时比任何 IR 优化都重要——[[#ex-bench]] 中接近 6 倍。
- 离开 SSA 需要拆开临界边并把**并行复制顺序化**，每个环一个临时量（[[#lem-parallel]]）。
- 由活跃性构造的**干扰图**的一个真着色就是一个正确的寄存器分配（[[#thm-colouring]]）。基于低次引理（[[#lem-kempe]]）的 Chaitin 简化/选择，配合 Briggs 的乐观溢出与保守合并（[[#thm-briggs]]），在真实程序上分配得很好，尽管一般问题是 NP 完全的（[[#thm-np]]）。
- 我们的编译器如今能把 Mini 翻译成在任何寄存器数目下都正确运行的 x86-64 代码；GCC 的代码更短，主要胜在寄存器定向、循环旋转与更丰富的指令选择。
:::

## 习题

::: exercise 数一数干扰 {level=1 check="3"}
对直线代码 `a = p + 1; b = p * 2; c = a + b; d = a * c; return d + b`，其中 `p` 是形参，画出干扰图，并给出不溢出地装下全部五个变量所需的最少寄存器数。（填入数字。）
::: solution
每条指令之后的活跃集，从 `return` 往前推演：`d = a * c` 之后：$\set{b, d}$；`c = a + b` 之后：$\set{a, b, c}$；`b = p * 2` 之后：$\set{a, b}$；`a = p + 1` 之后：$\set{a, p}$。边由每条定义与它之后仍活跃的变量连出：$a - p$；$b - a$（`b = p * 2` 用过之后 $p$ 就死了）；$c - a$，$c - b$；$d - b$。三角形 $a, b, c$ 需要三种颜色，三种也够：$a = 0$，$b = 1$，$c = 2$，$p = 1$，$d = 0$。所以是 **3** 个寄存器——同时活跃变量的最大个数 $\lvert\set{a, b, c}\rvert$；对直线代码这必然如此，因为它的干扰图是区间图。
:::
:::

::: exercise 三元素轮换 {level=1 check="4"}
一个循环的 φ 函数需要并行复制 $(a, b, c) \gets (b, c, a)$。用 [[#lem-parallel]] 以一个临时量 $t$ 把它顺序化。一共得到几条复制？（填入数字。）
::: solution
没有一条复制就绪：每个目标同时也都是源。在第一条复制处破环：$t \gets b$，剩下的复制变成 $(a \gets t), (b \gets c), (c \gets a)$。这时 $b$ 不是源了：发射 $b \gets c$。接着 $c \gets a$（$c$ 不再是源），再 $a \gets t$。序列是 $t = b;\ b = c;\ c = a;\ a = t$——**4** 条复制，$k' + c = 3 + 1$。`sequentialise` 返回 `[('t', 'b'), ('b', 'c'), ('c', 'a'), ('a', 't')]`。检验：$a$ 拿到旧的 $b$（经由 $t$），$b$ 拿到旧的 $c$，$c$ 拿到旧的 $a$。
:::
:::

::: exercise 用移位求余数 {level=1 check="-3"}
用 $n = 2$ 的 [[#thm-pow2]]，逐步算出 $-7 \bmod 4$（C 的语义，余数随被除数符号）。填入余数。
::: solution
$x = -7 < 0$，所以 $b = 2^2 - 1 = 3$；在代码里，$x \gg 63 = -1$（全 1），把它逻辑右移 $62$ 位得 $3$。$x + b = -4$。商：$-4 \gg 2 = -1$，正是 $-7/4 = -1.75$ 向零舍入。余数：$(-4) \mathbin{\&} 3 = 0$，再减 $b$：$0 - 3 = -3$。检验：$4 \cdot (-1) + (-3) = -7$。我们的编译器对 `x % 8` 和 `x / 8` 的输出，与 Python 的截断除法在 $x \in \set{-7, 7, -16, -1, 2^{63} - 1}$ 上一同测试过，结果全部吻合。
:::
:::

::: exercise 极大匹配何时不最优 {level=2 #ex-munch}
假设目标机有 `add` 和 `mul` 两条指令，代价各为 1，还有一条融合乘加 `madd r1, r2, r3` 计算 $r_1 \cdot r_2 + r_3$，覆盖模式 `+(*(x, y), z)`，代价为 4（在这台假想的机器上它很慢）。给出一棵树，使极大匹配给出的覆盖比动态规划的差，并给出两者的代价。
::: solution
取 `+(*(a, b), c)`，$a$、$b$、$c$ 在寄存器里。在根处，极大匹配比较匹配的瓦片：`add` 覆盖 1 个结点，`madd` 覆盖 2 个（`+` 和 `*`）。它选 `madd`，代价 4。动态规划比较 $\mathrm{cost}(\mathtt{madd}) + 0 = 4$ 与 $\mathrm{cost}(\mathtt{add}) + \mathrm{opt}(\ast(a, b)) = 1 + 1 = 2$，选 `mul` 再 `add`，代价 2。极大匹配的标准——尽量多覆盖——只是代价的一个代理，只在大瓦片从不比被它顶替的小瓦片们更贵时才靠得住。
:::
:::

::: exercise 卡住的简化 {level=2}
三棱柱图有顶点 $a, b, c, d, e, f$ 和边 $a - b$、$b - c$、$a - c$、$d - e$、$e - f$、$d - f$、$a - d$、$b - e$、$c - f$。（a）证明它是 3-可着色的。（b）证明 $K = 3$ 的简化删不去任何顶点。（c）用 $K = 3$ 运行 `colour`，解释结果。
::: solution
（a）$a = 0, b = 1, c = 2, d = 1, e = 2, f = 0$：每个三角形用足三种颜色，每条侧棱 $a - d$、$b - e$、$c - f$ 两端颜色不同。

（b）每个顶点度数都是 3（本三角形内两条加侧棱一条），所以没有顶点度数 $< K$。

（c）`colour` 先选一个溢出候选者（代价与度数都相等时取第一个顶点 $a$），其余顶点之后全部顺利化简。到选择阶段，$a$ 最后出栈；它的邻顶点拿到了 `{'f': 0, 'e': 1, 'd': 2, 'c': 1, 'b': 0}`，于是 $b = 0$、$c = 1$、$d = 2$ 用光三种颜色，$a$ 被溢出：结果是 `({…}, ['a'])`。乐观启发法只在邻顶点恰好共用颜色时才得手；这里选择阶段的贪心选择（$c$ 拿走了 1 而不是 2）堵死了这条路。简化/选择是启发法——面对 NP 完全问题它不得不如此；工业界分配器"溢出、改写、重建"的迭代循环接下来会给 $a$ 的新临时量分配寄存器——它们很短命——通常不再需要新的溢出。
:::
:::

::: exercise 精确的栈偏移 {level=2 check="24"}
在 [[#ex-calls]] 的 `mini_h` 中，被调函数在 `%rbp` 多远的偏移处找到自己的第 8 个实参 `k`？从压栈次序解释。（填入数字。）
::: solution
调用方先执行 `pushq $8`（第 8 个实参）再执行 `pushq $7`（第 7 个），所以第 7 个在低地址。`call` 在它们下面压入返回地址，被调函数的 `pushq %rbp; movq %rsp, %rbp` 把保存的 `%rbp` 放在 `0(%rbp)`。于是返回地址在 `8(%rbp)`，第 7 个实参在 `16(%rbp)`，第 8 个在 **24**`(%rbp)`——清单里正是 `movq 24(%rbp), %rbx`。一般地，第 $n > 6$ 个实参在 `%rbp` 之上 $16 + 8(n - 7)$ 字节处，就是发射器里的那个表达式（`n` 从零起算）。
:::
:::

::: exercise 调用者保存寄存器 {level=3 #ex-caller-saved}
扩展分配器，让它也使用九个调用者保存寄存器 `%rax`、`%rcx`、`%rdx`、`%rsi`、`%rdi`、`%r8`–`%r11`。（a）调用应如何在干扰图中表示？（b）`idivq` 和实参传递的固定寄存器应如何表示？（c）为什么这能让 GCC 的 `gcd` 一个寄存器都不用保存？
::: solution
（a）为每个物理寄存器加一个**预着色**顶点，它已分有自己的颜色，永不简化也永不溢出。一次调用定义（破坏）所有调用者保存寄存器，所以每个跨越调用的变量——调用之后仍活跃的、除调用结果以外的变量——都与每个调用者保存寄存器的顶点之间连一条边，于是它只能拿到被调用者保存的颜色（或者被溢出：调用前存、调用后取；或者由调用方在调用前后保存——由分配器通过溢出代价来权衡）。

（b）把固定寄存器运算数表示成与预着色顶点之间的复制：`t = a % b` 变成 `rax = a; rdx:rax = cqto; idiv b; t = rdx`，其中 `idiv` 定义 `%rax` 与 `%rdx`，从而与跨越它的一切变量干扰；实参变成调用前的复制 `rdi = x`，形参变成入口处的复制 `a_0 = rdi`。此后只要变量能住在固定寄存器里，合并就会把这些复制删掉——寄存器定向正是这样从通用机制中长出来的，不需要任何特例。

（c）叶函数不含调用，所以没有变量因调用而干扰调用者保存寄存器，它的所有变量都能用调用者保存寄存器着色，而函数不必保全它们。合并把 `a_0` 并进 `%rdi`、被除数并进 `%rax`、余数并进 `%rdx`，就几乎正好得到 GCC 的那个循环。迭代寄存器合并（George 与 Appel，1996 年）正是把这种合并与简化交织在一起的标准算法。
:::
:::

::: exercise 线性扫描 {level=3}
JIT 编译器常常用**线性扫描分配**（Poletto 与 Sarkar，1999 年）代替图着色。按块的次序给指令编号，把每个变量的活跃性近似为从第一个到最后一个活跃点的一条区间，按起点对区间排序，然后作扫描：把活跃区间保持在一个按终点排序的表里；对每条新区间，让已结束的区间出局，若 $K$ 个寄存器全被占用，就在活跃区间与新区间之中溢出结束最晚的那一个。（a）用 `liveness` 计算区间，为我们的 IR 实现它。（b）解释为什么结果是正确的，却可能比着色更差。（c）它的运行时间是多少？
::: solution
（a）

```python
def intervals(blocks):
    live_in, live_out = liveness(blocks)
    start, end, n = {}, {}, 0
    def touch(v, n):
        start.setdefault(v, n); end[v] = n
    for b, ins in blocks.items():
        for v in live_in[b]: touch(v, n)    # 在块入口处活跃
        live, after = set(live_out[b]), []
        for i in reversed(ins):             # 每条指令之后的活跃集
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
        for a in [a for a in active if a[0] < s]:          # 让已结束的区间出局
            active.remove(a); free.append(reg[a[1]])
        if free:
            reg[v] = free.pop(); active.append((e, v)); active.sort()
        else:
            last_end, last = active[-1]
            if last_end > e:                                 # 溢出结束最晚的那个
                reg[v] = reg.pop(last); spilled.append(last)
                active[-1] = (e, v); active.sort()
            else:
                spilled.append(v)
    return reg, spilled
```

在七个测试程序的每个函数上校验过：任意两个互相干扰的变量从不分到同一寄存器。在两边都不作合并时，[[#ex-interf-sum]] 的 `sum` 在 $K = 5, 3, 2$ 下线性扫描分别需要 3、5、6 次溢出，`colour` 是 0、2、3 次；`collatz` 在 $K = 3$ 下需要 2 对 0 次；在小函数上两者一致。

（b）两个变量分到同一寄存器，只有当它们的区间不重叠时才会发生；而区间包含其变量活跃的每一点，所以区间不重叠意味着不干扰；由 [[#thm-colouring]] 分配是正确的。但区间也覆盖了变量*不*活跃的那些点——活跃性里的空洞，比如一个变量活跃在前后相邻排布的两条分支里——所以区间重叠比活跃区间发生干扰更频繁，溢出就可能更多。工业界的线性扫描分配器（如 HotSpot 客户端编译器和 LLVM 从前的分配器）处理活跃性空洞并拆分区间，以缩小这一差距。

（c）对 $V$ 个变量，排序区间花 $O(V \log V)$；活跃表用平衡结构时扫描花 $O(V \log K)$（这里是排好序的 Python 列表，$O(VK)$）。计算活跃性要跑通常的迭代分析。与构造可能有 $\Theta(V^2)$ 条边的干扰图相比，这正是 JIT 偏爱它的原因。
:::
:::
