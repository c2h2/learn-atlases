考察下面这个 Mini 函数，程序员在调试时很可能写出这样的代码：

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

每绕循环一圈，我们在 [[compilers/intermediate-representations]] 中让编译器生成的代码都要测试 `debug` 并计算 `k * 2`。人一眼就能看出 `debug` 永远为假，所以 `print` 绝不可能执行，而 `k * 2` 永远是 20。优化编译器必须先为一切可能的执行*证明*这类事实，然后才能利用它们——而且它必须自动完成这件事：面对带任意循环与分支的程序，用大致与程序规模成线性的时间。这件工具就是**数据流分析**：一组把每个基本块的开头与末尾的事实联系起来的方程，用迭代到不动点的方法求解。

本章从第一原理出发建立数据流分析。我们把几个经典分析——**活跃性**、**到达定义**、**常量传播**——定义为控制流图上的方程，用一个通用的**工作表算法**求解它们，并证明它终止且算出方程所允许的最好解。把这一切讲精确的理论是**格**与**单调函数**的理论，归功于 Gary Kildall（1973 年）。随后我们把所得结果连同 SSA 形式一起用来实现**常量传播与折叠**、**分支折叠**、**复制传播**和**死代码消除**，度量它们的效果，并与 GCC 的做法比较。

## 活跃性

每个后端要问的第一个问题：在某个点上，哪些变量还持有将来可能要用到的值？

::: definition 活跃变量 {#def-live}
若 CFG 中存在一条从 $p$ 到 $v$ 的某处使用、且沿路 $v$ 未被赋值的路径，则称变量 $v$ 在程序点 $p$ 是**活跃的**（live）。否则称 $v$ 在 $p$ 是**不活跃的**（dead）。对块 $B$，$\mathrm{in}(B)$ 是在 $B$ 开头活跃的变量集合，$\mathrm{out}(B)$ 是在 $B$ 末尾活跃的变量集合。
:::

不活跃变量的值绝不会再被读，所以它的寄存器可以被复用（[[compilers/code-generation]]），对它的赋值也可以删掉。活跃性取决于将来，所以信息沿 CFG *向后*流动。对单个块，两个集合概括了它的作用：$\mathrm{use}(B)$ 是在 $B$ 中先于其中对它的任何赋值被读的变量，$\mathrm{def}(B)$ 是在 $B$ 中被赋值的变量。一个变量在 $B$ 开头活跃，当且仅当 $B$ 先读它，或者它在末尾活跃且 $B$ 不给它赋值；它在末尾活跃，当且仅当它在某个后继的开头活跃：

$$
\mathrm{in}(B) = \mathrm{use}(B) \cup \bigl(\mathrm{out}(B) \setminus \mathrm{def}(B)\bigr), \qquad
\mathrm{out}(B) = \bigcup_{S \in \mathrm{succ}(B)} \mathrm{in}(S),
$$ {#eq-liveness}

对返回的块取 $\mathrm{out}(B) = \emptyset$。与 FIRST 集（[[compilers/top-down-parsing#thm-ff-fixpoint]]）和必经结点（[[compilers/intermediate-representations#thm-dom-iter]]）一样，这些方程绕着循环互相递归，我们用迭代来解它们——这里从空集出发往上求，因为只有确有某条真实路径需要时，一个变量才应当是活跃的。

许多分析都有这样的形状：每个块边界上一个值，一个把块一端的值映到另一端的**传递函数**，以及一个把若干邻块送来的值合并起来的**会合**算子。于是我们只写一个求解器，再逐一代入实例。它维护一个**工作表**，装着输入值可能变了的块；某个块的输出一变，它只把依赖这个块的块放进去。

```python
def solve(blocks, forward, transfer, meet, boundary, init):
    """CFG 上 IN/OUT 方程组的不动点。
    transfer(block, value) -> value；meet(list of values) -> value。"""
    preds, succs = predecessors(blocks), {b: successors(ins) for b, ins in blocks.items()}
    before, after = (preds, succs) if forward else (succs, preds)
    entry = next(iter(blocks))
    edge_in = {b: init for b in blocks}     # 块开头（前向）/末尾（后向）的值
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
            work += [s for s in after[b] if s not in work]   # 只有依赖者才被重新访问
    solve.rounds = rounds
    return edge_in, out
```

对后向问题，"in" 与 "out" 的角色互换：求解器返回的 `edge_in` 是块*末尾*的值，`out` 是块开头的值。于是活跃性和下一个分析各只需几行（`uses(i)` 与 `defs(i)` 返回一条指令读和写的变量）：

```python
def liveness(blocks):
    gen, kill = {}, {}                      # gen：先于定义被用；kill：被定义
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
    """一个定义是 (块, 位置)；若某条路径把它带到某点，它就到达该点。"""
    alldefs = {(b, n): i[1] for b, ins in blocks.items() for n, i in enumerate(ins) if defs(i)}
    def transfer(b, s):
        for n, i in enumerate(blocks[b]):
            if defs(i):
                s = {d for d in s if alldefs[d] != i[1]} | {(b, n)}   # 先杀，再生
        return s
    return solve(blocks, True, transfer, lambda vs: set().union(*vs), set(), set())
```

::: example Euclid 算法中的活跃性 {#ex-live-gcd}
对 `gcd` 的三地址码（[[compilers/intermediate-representations#ex-gcd-cfg]]）计算活跃性。
::: solution
$\mathrm{use}$ 与 $\mathrm{def}$：$B_0$（`goto L1`）：两者皆空。$L_1$（`if b != 0`）：$\mathrm{use} = \set{b}$。$L_2$（`t1 = a % b; t = t1; a = b; b = t`）：$\mathrm{use} = \set{a, b}$——二者都在被赋值之前被读——而 $\mathrm{def} = \set{t_1, t, a, b}$。$L_3$（`return a`）：$\mathrm{use} = \set{a}$。

后向求解：$\mathrm{in}(L_3) = \set{a}$。$\mathrm{in}(L_2) = \set{a, b} \cup (\mathrm{out}(L_2) \setminus \mathrm{def}(L_2)) = \set{a, b}$，与 $\mathrm{out}(L_2)$ 是什么无关。$\mathrm{out}(L_1) = \mathrm{in}(L_2) \cup \mathrm{in}(L_3) = \set{a, b}$，且 $\mathrm{in}(L_1) = \set{b} \cup \set{a, b} = \set{a, b}$；$\mathrm{out}(L_2) = \mathrm{in}(L_1) = \set{a, b}$；$\mathrm{in}(B_0) = \set{a, b}$。程序的结果与此相符，共访问块 5 次：

```text
B0 in: ['a', 'b'] out: ['a', 'b']
L1 in: ['a', 'b'] out: ['a', 'b']
L2 in: ['a', 'b'] out: ['a', 'b']
L3 in: ['a'] out: []
```

临时变量 $t_1$ 与 $t$ 从不跨块边界活跃：每个都在 $L_2$ 内部被赋值并被读。循环末尾只有 `a` 和 `b` 要紧；循环内部，余数必须在二者都还活跃期间持有，这就是 [[compilers/code-generation]] 里该循环需要三个寄存器的原因。而 `b` 在 $L_3$ 中不活跃：循环一退出，它的寄存器就空了出来。
:::
:::

## 到达定义

::: definition 到达定义 {#def-reaching}
**定义**是一条给变量赋值的指令。$v$ 的一个定义 $d$ **到达**点 $p$，若从 $d$ 之后到 $p$ 存在一条沿路 $v$ 不再被赋值的路径。
:::

到达定义回答"这个值可能是从哪里来的？"。若到达某处使用的 `x` 的唯一定义是 `x = 5`，该使用就可以替换成 `5`；若没有定义到达某处使用，则该变量可能在未初始化时就被使用（GCC 会发出警告）。这个分析是前向的：一个块**生成**它所赋值的每个变量的最后一个定义，**杀掉**这些变量的所有其他定义；到达一个块开头的定义，是其各前驱离开时携带的定义的并：

$$
\mathrm{in}(B) = \bigcup_{P \in \mathrm{pred}(B)} \mathrm{out}(P), \qquad \mathrm{out}(B) = \mathrm{gen}(B) \cup \bigl(\mathrm{in}(B) \setminus \mathrm{kill}(B)\bigr).
$$ {#eq-reaching}

::: example 带 kill 的到达定义 {#ex-reaching}
对函数

```text
fn f(c: bool) -> int {
    let x = 0; let y = 0;
    if c { x = 2; y = 3; } else { x = 3; y = 2; }
    let z = x + y;
    let w = 4 * 5;
    return z + w;
}
```

计算到达定义，它的三地址码有块 $B_0$（`x = 0; y = 0; if c != 0 goto L1 else L2`）、$L_1$（`x = 2; y = 3`）、$L_2$（`x = 3; y = 2`）和 $L_3$（`t1 = x + y; z = t1; t2 = 4 * 5; w = t2; t3 = z + w; return t3`）。用块号和位置给每个定义命名。
::: solution
```text
B0 in: [] out: [('B0', 0), ('B0', 1)]
L1 in: [('B0', 0), ('B0', 1)] out: [('L1', 0), ('L1', 1)]
L2 in: [('B0', 0), ('B0', 1)] out: [('L2', 0), ('L2', 1)]
L3 in: [('L1', 0), ('L1', 1), ('L2', 0), ('L2', 1)] out: [('L1', 0), ('L1', 1), ('L2', 0), ('L2', 1), ('L3', 0), …, ('L3', 4)]
```

$B_0$ 中的定义 `x = 0` 与 `y = 0` 到达 $L_1$ 和 $L_2$，却在两者中都被杀掉，所以它们到不了 $L_3$：无论控制往哪边走，`x` 和 `y` 都被重新赋值了。`x` 有两个定义到达 `t1 = x + y` 中的使用，这就是那里不能用单一常量替换 `x` 的原因。求解器访问块 4 次——每块一次，因为 CFG 无圈，且块的访问次序使每个块都排在它所有前驱之后。活跃性从另一面讲出同一个故事：`x` 和 `y` 在 $B_0$ 末尾不活跃，所以赋值 `x = 0` 与 `y = 0` 是**无用赋值**（dead store）。
:::
:::

::: widget graph
nodes: B0@0,1; L1@2,0; L2@2,2; L3@4,1
edges: B0>L1; B0>L2; L1>L3; L2>L3
algorithm: topo
caption: [[#ex-reaching]] 中 `f` 的 CFG。运行拓扑排序：它把 $B_0$ 排在最前、$L_3$ 排在最后。按这个次序访问块的前向分析（更一般地，按深度优先搜索的**逆后序**——它是 CFG 去掉回边后的一个拓扑序），在每个块被访问之前都已看到其每个前驱的最终值，因此在无圈 CFG 上一遍即告完成——[[#ex-reaching]] 中的 4 次访问正是如此。活跃性这类的后向分析则应使用相反次序。有循环时，每多绕一条回边一圈，信息就再多传播一次。
:::

## 格与不动点

迭代为什么会停下来，它的答案对不对？一旦认清各类分析共同拥有什么，答案对每个分析都是一样的。

::: definition 半格、高度与单调函数 {#def-lattice}
一个**会合半格**是带有二元运算 $\sqcap$（会合）的集合 $L$，该运算满足幂等、交换与结合律。它定义一个偏序 $x \sqsubseteq y \iff x \sqcap y = x$，其中 $x \sqcap y$ 是 $x$ 与 $y$ 的最大下界。**顶**元素 $\top$ 满足对一切 $x$ 有 $x \sqsubseteq \top$。$L$ 的**高度**是其最长严格下降链 $x_0 \sqsupset x_1 \sqsupset \cdots \sqsupset x_h$ 的长度。若 $x \sqsubseteq y$ 蕴含 $f(x) \sqsubseteq f(y)$，则称函数 $f\colon L \to L$ 是**单调的**。
:::

约定：$\top$ 是乐观的"尚无信息"起点，往下走意味着保证的事实变少。对活跃性，$L$ 是变量子集的集合，会合是 $\cup$（任何后继送来的信息都算数），$\top = \emptyset$ 而 $\sqsubseteq$ 是 $\supseteq$；高度是变量的个数。对到达定义，则是定义子集的集合配 $\cup$。而对"必然"（must）类分析，例如**可用表达式**（一个表达式可用，当且仅当它在*每条*路径上都已被计算过且之后未被改坏）：会合是 $\cap$，$\top$ 是全体表达式的集合。Gen/kill 传递函数 $f(x) = g \cup (x \setminus k)$ 在这些次序下都是单调的。

::: definition 数据流框架 {#def-framework}
一个**单调数据流框架**由以下内容构成：一个带顶 $\top$ 的有限高度半格 $L$，一个方向（前向或后向），每个块的一个单调传递函数 $f_B\colon L \to L$，以及入口（前向）或各出口（后向）的边界值。对前向问题，它的方程组是 $\mathrm{in}(r) = \mathit{boundary}$、$\mathrm{in}(B) = \mathop{\Large\sqcap}_{P \in \mathrm{pred}(B)} \mathrm{out}(P)$ 以及 $\mathrm{out}(B) = f_B(\mathrm{in}(B))$。
:::

::: theorem 工作表算法在最大不动点处终止 {#thm-mfp}
对格高度为 $h$、CFG 有 $N$ 个块和 $E$ 条边的单调框架，从所有 $B$ 的 $\mathrm{out}(B) = \top$ 出发的工作表算法至多在 $N + h \cdot E$ 次块访问后终止。其结果是方程组的一个解，且是**最大不动点**（MFP）：任何别的解 $S$ 都满足对所有 $B$ 有 $S(B) \sqsubseteq \mathrm{MFP}(B)$。
:::

::: proof
*值只往下走。*设 $\mathrm{out}_t$ 是 $t$ 次访问之后的值。对 $t$ 归纳：对所有 $B$ 有 $\mathrm{out}_{t+1}(B) \sqsubseteq \mathrm{out}_t(B)$。最初一切值都是 $\top$，所以任何块的第一次更新只能往下。若迄今一切值都构成下降序列，那么在访问 $B$ 时，其各前驱当前值的会合 $\sqsubseteq$ 上次访问时的会合（会合对每个变元都单调），又因 $f_B$ 单调，新的 $\mathrm{out}(B)$ 就 $\sqsubseteq$ 前一个。

*终止性。*每个值至多严格下降 $h$ 次。$\mathrm{out}(B)$ 的每次严格下降至多把 $\lvert\mathrm{succ}(B)\rvert$ 个块放入工作表，所以整个运行中，在最初的 $N$ 个之后至多加入 $h \sum_B \lvert \mathrm{succ}(B)\rvert = hE$ 个块，而每次访问取出一个。

*它是一个解。*工作表清空时，每个块都已在它的任何前驱最后一次变化之后被访问过（一次变化会把依赖者放回表中），所以它的值等于 $f_B$ 作用在其各前驱最终值的会合上：方程组成立。

*它是最大解。*设 $S$ 是任一解。我们归纳证明对所有 $t$ 有 $S(B) \sqsubseteq \mathrm{out}_t(B)$。$t = 0$ 时 $\mathrm{out}_0(B) = \top$。访问 $B$ 时，新值是 $f_B(\mathop{\Large\sqcap}_P \mathrm{out}_t(P))$；由归纳假设与单调性，它 $\sqsupseteq f_B(\mathop{\Large\sqcap}_P S(P)) = S(B)$。于是最终值位于每个解的上方。
:::

"最大"听上去像错误的目标，但记住方向：在格中越高意味着*更多*乐观的事实（更少的活跃变量、更多的可用表达式、更多的常量），所以 MFP 是方程组最精确的解。对通常子集次序下的活跃性而言，它是*最小*解——最小的活跃集合。

然而方程组只是对我们真正想要的东西的一个近似。对块 $B$ 的理想答案应逐条考察从入口到 $B$ 的每条路径，沿路施加传递函数，再把结果合并。

::: definition 所有路径上的会合 {#def-mop}
对前向框架，$\mathrm{MOP}(B) = \mathop{\Large\sqcap}_{\pi} f_\pi(\mathit{boundary})$，其中 $\pi$ 取遍从入口到 $B$ 开头的全体路径，$f_\pi$ 是沿 $\pi$ 各块传递函数的复合（不含 $B$）。
:::

::: theorem MFP 是安全的，对分配性框架是精确的 {#thm-mop}
对每个块 $B$，$\mathrm{MFP}(B) \sqsubseteq \mathrm{MOP}(B)$。若每个传递函数都是**分配的**，$f(x \sqcap y) = f(x) \sqcap f(y)$，则 $\mathrm{MFP}(B) = \mathrm{MOP}(B)$。
:::

::: proof
*安全性。*我们对 $\pi$ 的长度归纳证明：对每条从入口到 $B$ 的路径 $\pi$，$\mathrm{MFP}(\mathrm{in}(B)) \sqsubseteq f_\pi(\mathit{boundary})$；于是 $\mathrm{MFP}(\mathrm{in}(B))$ 是所有路径值的下界，从而 $\sqsubseteq$ 它们的会合。空路径（$B$ 为入口）时，$\mathrm{in}(r) = \mathit{boundary} \sqcap \dots \sqsubseteq \mathit{boundary}$。对以边 $P \to B$ 结尾的路径 $\pi = \pi' \cdot P$：由归纳假设 $\mathrm{in}(P) \sqsubseteq f_{\pi'}(\mathit{boundary})$，故由单调性 $\mathrm{out}(P) = f_P(\mathrm{in}(P)) \sqsubseteq f_P(f_{\pi'}(\mathit{boundary})) = f_\pi(\mathit{boundary})$，而 $\mathrm{in}(B)$ 是包含 $\mathrm{out}(P)$ 在内的一个会合，故 $\sqsubseteq \mathrm{out}(P)$。

*精确性。*设一切 $f_B$ 都是分配的。因为 $L$ 高度有限，无穷多个路径值的会合等于其中有限多个的会合，所以分配性可扩充到 MOP 定义中的那些会合上。于是 $\mathrm{MOP}$ 是方程组的一个解：对 $B \ne r$，到达 $B$ 的路径就是到达各前驱 $P$ 的路径再经过 $P$，所以
$$
\mathrm{MOP}(B) = \mathop{\Large\sqcap}_P \mathop{\Large\sqcap}_{\pi' \text{ 到 } P} f_P(f_{\pi'}(\mathit{boundary})) = \mathop{\Large\sqcap}_P f_P\Bigl(\mathop{\Large\sqcap}_{\pi'} f_{\pi'}(\mathit{boundary})\Bigr) = \mathop{\Large\sqcap}_P f_P(\mathrm{MOP}(P)).
$$
由 [[#thm-mfp]]，MFP 位于每个解的上方，故 $\mathrm{MOP}(B) \sqsubseteq \mathrm{MFP}(B)$；结合安全性，它们相等。
:::

Gen/kill 函数是分配的：$g \cup ((x \cup y) \setminus k) = (g \cup (x \setminus k)) \cup (g \cup (y \setminus k))$，把 $\cup$ 换成 $\cap$ 同样成立。所以对活跃性、到达定义和可用表达式，迭代恰好算出基于路径的答案——在不知道哪些路径真会被执行的前提下所能做到的最好答案。（即便 MOP 也是保守的：它考虑了可能不可行的路径，比如 `debug` 恒为假时那条穿过 `if debug` 的路径。精确判定可行性是不可判定的——程序的一切非平凡语义性质都是，由 Rice 定理。）

::: widget relation
set: top; m1; z0; p1; bot
pairs: top,top; m1,m1; z0,z0; p1,p1; bot,bot; bot,m1; bot,z0; bot,p1; bot,top; m1,top; z0,top; p1,top
view: properties
caption: 单个变量的常量传播格，写成满足 $x \mathrel{R} y$ 即 $x \sqsubseteq y$ 的关系 $R$：$\top$（`top`，"尚未见到值"），常数（这里只有 $-1$、$0$、$1$，记作 `m1`、`z0`、`p1`；真正的格对每个整数有一个元素）并排摆放，以及 $\bot$（`bot`，"不是常量"）。检验那些性质：关系自反、反对称、传递——是一个偏序。两个不同常数的会合是 $\bot$；$\top$ 与任何东西的会合就是那个东西。这个格虽然无限宽，高度却是 2，所以一个变量的值至多下降两次，这正是分析终止的原因。点击矩阵删去 `bot,top` 这一对：关系就不再传递，因为 $\bot \sqsubseteq -1$ 和 $-1 \sqsubseteq \top$ 迫使 $\bot \sqsubseteq \top$。
:::

## 常量传播

常量传播正是 `debug` 例子背后的分析。对单个变量，它的格就是上图那个：$\top$（迄今未定义）、一个常量 $c$，或者 $\bot$（"不是常量"，NAC）；块边界的格把每个变量映成这样一个值，会合按变量逐个进行。传递函数对块中的指令作抽象求值：$x = y + z$ 在两个运算对象都是常量时给 $x$ 常量 $c_y + c_z$，只要有一个是 $\bot$ 就给 $\bot$，其余情形给 $\top$。

```python
UNDEF, NAC = "undef", "nac"                 # 常量格的顶与底
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
                elif i[2] in ("/", "%") and y == 0: env[i[1]] = NAC   # 不折叠会陷入的运算
                else: env[i[1]] = int(OPS[i[2]](x, y))
            elif i[0] == "call": env[i[1]] = NAC
        return env
    return solve(blocks, True, transfer, meet, {p: NAC for p in params}, {})
```

形式参数在入口处是 $\bot$，因为调用方可能传入任何东西；调用的结果是 $\bot$。除以常量零不作折叠：那样会把运行期错误搬到编译期，或者把它掩盖掉。

::: example 常量传播不是分配的 {#ex-nondistributive}
对 [[#ex-reaching]] 中的函数 `f` 运行 `constprop`，把 `z` 的结果与所有路径上的会合比较。
::: solution
在 $L_3$ 开头程序报告 `{'c': 'nac', 'x': 'nac', 'y': 'nac'}`，在其末尾 `t2` 和 `w` 是 $20$，但 `t1`、`z` 和 `t3` 是 NAC。MFP：两个前驱分别给出 $x = 2, y = 3$ 和 $x = 3, y = 2$；会合是 $x = \bot$，$y = \bot$，于是 $x + y = \bot$。MOP：沿经过 $L_1$ 的路径 $z = 5$；经过 $L_2$ 也是 $z = 5$；会合是 $5$。所以严格有 $\mathrm{MFP} \sqsubset \mathrm{MOP}$。$L_3$ 的传递函数不分配：在 $\set{x \mapsto 2, y \mapsto 3}$ 与 $\set{x \mapsto 3, y \mapsto 2}$ 的会合上施加它给出 $z = \bot$，而它对二者各自的结果的会合是 $z = 5$。在汇合点丢失 $x$ 与 $y$ 之间的*相关性*，正是每个变量只保留一个值的代价。
:::
:::

### SSA 上的常量传播

在 SSA 形式下每个变量恰有一个定义，所以它的值是全程序单一的格元素而不是每块一个——分析成为**稀疏的**。φ 函数的值是它的运算对象的会合；其他指令照旧求值。对所有定义反复迭代，直到什么都不再变化：

```python
def ssa_constants(blocks, params):
    """在 SSA 中每个变量只有一个值：对所有定义迭代到不动点。"""
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

同样的终止性论证仍然适用：每个变量的值至多下降两次。利用这个结果的做法叫**常量折叠**：把值已知为常量的定义删掉，把它的用处替换成常量，并把两个运算对象都是常量的条件分支变成无条件跳转（**分支折叠**）。变得不可达的块会被删掉，φ 函数也失去来自这些块的运算对象：

```python
def fold(params, blocks):
    consts = ssa_constants(blocks, params)
    c = lambda x: consts.get(x, x) if isinstance(x, str) else x
    new = {}
    for b, ins in blocks.items():
        out = []
        for i in ins:
            if defs(i) and i[1] in consts and i[0] != "call": continue   # 值已知
            if i[0] == "op": i = i[:3] + (c(i[3]), c(i[4]))
            elif i[0] in ("=", "ret"): i = i[:-1] + (c(i[-1]),)
            elif i[0] == "call": i = i[:3] + ([c(x) for x in i[3]],)
            elif i[0] == "phi": i = ("phi", i[1], {p: c(v) for p, v in i[2].items()})
            elif i[0] == "br":
                i = i[:2] + (c(i[2]), c(i[3])) + i[4:]
                if not isinstance(i[2], str) and not isinstance(i[3], str):
                    i = ("jmp", i[4] if OPS[i[1]](i[2], i[3]) else i[5])   # 分支已折叠
            out.append(i)
        new[b] = out
    return params, prune_unreachable(new)
```

## 死代码、复制与一个小优化器

结果从未被使用的定义是**死代码**，只向死代码提供数据的计算同样是死代码。在 SSA 中，找出它很简单：一个变量只要在任意地方作为运算对象出现过，它就被使用了；删掉未被使用的变量的定义并重复这一过程，因为删去一处使用可能使另一条定义变死。调用保留，因为它们可能有副作用（在这里是打印）。

```python
def dce(params, blocks):
    """删掉值从未被使用的定义（调用保留：它们有副作用）。"""
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

`copy_propagate` 就是 [[compilers/intermediate-representations#ex-copyprop]] 中的 SSA 复制传播：每条复制 `x = y` 都消失，它的用处变成 `y`。在非 SSA 代码中，要用活跃性来找死代码：若 $v$ 在赋值语句之后紧接处不活跃，则该赋值是死的。

::: example 优化调试循环 {#ex-optimise-g}
把 `optimise` 应用于本章开头的 `g`，并度量优化器对 [[compilers/intermediate-representations]] 那七个测试程序的影响。
::: solution
优化前后：

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

常量传播发现了 $k_0 = 10$、$\mathit{debug}_0 = 0$ 与 $t_2 = 20$；分支折叠把 `if debug != 0` 变成 `goto L6`，于是 $L_4$ 不可达，`print` 调用随之被删；随后死代码消除再没有删掉什么，因为复制传播早已把复制消掉了。（空块 $L_2$ 留了下来；一次 CFG 化简遍会把它合并掉。）统计 IR 解释器执行的指令数（不统计 φ——它们会变成通常会被消去的寄存器传送）以及静态指令数（包括 φ）：

| program | executed before | after | static before | after |
|---|---|---|---|---|
| gcd | 48 | 29 | 14 | 12 |
| fact | 149 | 149 | 11 | 11 |
| logic | 66 | 49 | 40 | 31 |
| collatz | 2158 | 1698 | 21 | 20 |
| nested | 2257 | 1901 | 45 | 44 |
| swap | 107 | 59 | 22 | 19 |
| manyargs | 11 | 11 | 11 | 11 |

七个程序优化后打印的输出完全相同。大部分收益来自循环中的复制传播；`fact` 和 `manyargs` 没有可删的东西。
:::
:::

::: quiz
经过 `optimise` 之后，[[#ex-reaching]] 中的函数 `f` 仍计算 `t1_0 = x_3 + y_3`，其中 `x_3 = φ(L1: 2, L2: 3)`，`y_3 = φ(L1: 3, L2: 2)`。为什么 SSA 常量传播没有发现 `t1_0` 是 5？
- [ ] 因为分析没有迭代到它的不动点
- [x] 因为每个 φ 都各自独立求值，而 2 与 3 的会合是 NAC
- [ ] 因为 SSA 形式禁止用常量替换 φ
- [ ] 因为 `x_3 + y_3` 可能溢出
::: solution
分析对每个变量只保留一个格值。$x_3 = 2 \sqcap 3 = \bot$ 且 $y_3 = 3 \sqcap 2 = \bot$，所以 $x_3 + y_3 = \bot$，与 [[#ex-nondistributive]] 完全一样："当 $x$ 是 2 时 $y$ 是 3"这一相关性在 φ 处丢失。GCC 15.2 做得更好：它在部分冗余消除遍之前为这个函数生成的 GIMPLE 和我们的 SSA *一字不差*（`x_1 = PHI <2(2), 3(3)>`、`y_2 = PHI <3(2), 2(3)>`、`z_4 = x_1 + y_2`），而经过那一遍之后（`-fdump-tree-pre`）读出来是 `return 25;`——PRE 在每个前驱里分别对 `x + y` 求值（"φ 平移"），在两条路上都找到常量 5，再把结果合并。`gcc -O2` 把 `f` 编译成 `movl $25, %eax; ret`；而在不跑 PRE 的 `-O1` 下，它计算 `leaq 20(%rdx,%rax), %rax`。
:::
:::

::: warning 删除代码可能删掉错误
死代码消除删掉了每个未被使用的计算，除法也在其中。若除数可能为零，原程序会在优化后的程序继续运行的地方陷入。这是否被允许，是语言语义的问题，不是分析的问题。在 C 中除以零是未定义行为，所以编译器可以假设它不发生并把除法删掉；在 Java 中它必须抛出 `ArithmeticException`，所以 JIT 只有在能证明除数非零时才可以删掉一个未被使用的除法。对 Mini 我们采取 C 的立场——我们的 `dce` 只在这一立场下才是正确的。同样的问题出现在可能出错的装载、可能不返回的调用、以及可能不停机的循环上（C++ 允许删除无副作用的无穷循环；C11 只允许删除控制表达式不是常量的那种循环）。每个优化都是相对于某个语义被证明正确的；要知道你的编译器假设的是哪一个。
:::

## 经典优化

数据流分析为一大串变换提供了依据。以下是最要紧的几个，以及各自需要什么。

- **公共子表达式消除**：若 `a + b` 已被算进 $t$，且此后 `a` 与 `b` 都未改变——在*每条*路径上都是，即该表达式是*可用*的——就复用 $t$。在块内，**局部值编号**给每个值编一个号，并把每个新表达式 `(op, number(x), number(y))` 拿去哈希表里查；跨块时，可用表达式或基于 SSA 的**全局值编号**做同样的事。
- **部分冗余消除**（PRE；Morel 与 Renvoise，1979 年）：某个表达式已在到达某点的*部分*路径上被计算过、在该点又要再算一次，那就把它插入其余路径，使之成为完全冗余。它把公共子表达式消除和循环不变代码外提都包括在内。
- **循环不变代码外提**：循环内一个运算数只在循环外定义的计算，每次迭代结果相同；把它移到循环之前的**前导块**（preheader）里，条件是它不会陷入（或者已知循环一定会运行）。
- **强度削弱**与**归纳变量删除**：在循环里，`i` 每圈增加 1 时形如 `8 * i` 的表达式可以换成一个每次增加 8 的新变量；只用来算地址的循环计数器可以用地址本身替换。
- **内联**：用被调用者的体替换一个调用，这既省掉调用开销，更重要的是让函数体暴露在调用方语境下的一切其他优化面前。

::: example GCC 中的循环不变代码外提 {#ex-licm}
用 GCC 15.2 编译（`gcc -O1 -fno-tree-vectorize -S`，像之前一样略去展开与 CET 指示）：

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

乘法已被提升到循环之外（并且受 $n > 0$ 的测试保护，所以循环体本不该执行时它不会被执行）。更好的是，编译器注意到被存储的值 $v = xy + i$ 和地址 $a + 8i$ 都是归纳变量，于是围绕 $v$ 本身重写了循环：它把 $v$ 存到地址 $(a - 8xy) + 8v$，这样循环只有四条指令，再没有单独的计数器 `i`。在 `-O2` 下 GCC 还把循环展开了两倍。
:::
:::

### 条件常量传播

把常量传播和分支折叠先后运行，会错过一些本该彼此推出的事实。在

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

里，`x` 永远是 1，因为赋 2 的那个分支从不被执行——而该分支从不被执行，恰恰只是因为 `x` 是 1。`ssa_constants` 求值 $x_3 = \varphi(L_2{:}\ x_1, L_4{:}\ x_2)$ 时 $x_2 = 2$，于是断定 $x_1$ 与 $x_3$ 不是常量；分支折叠便无法折叠 `if x_1 != 1`。**稀疏条件常量传播**（SCCP；Wegman 与 Zadeck，1991 年）把两者同时运行，同样乐观：它还跟踪哪些 CFG 边是可执行的（起初除入口外没有），让 φ 只在可执行边上的运算对象之间取会合，并且只按条件当前的格值把分支的目标标为可执行。它找到 $x_1 = x_3 = 1$，并证明 $L_4$ 不可达（见 [[#ex-sccp]]）。GCC 和 LLVM 都跑 SCCP。

::: history
数据流分析生长于 FORTRAN 编译器。Bell 实验室的 Vyssotsky 与 Wegner 在 1960 年代初描述了用于活跃变量的位向量流分析；Frances Allen 的 "Control flow analysis"（1970 年）与 "A basis for program optimization"（1971 年），以及 Allen 与 John Cocke 的 "A catalogue of optimizing transformations"（1972 年），给出了沿用至今的各项分析与变换。Gary Kildall 的 "A unified approach to global program optimization"（POPL 1973）引入了格的框架与 [[#thm-mfp]] 的迭代算法，并证明对分配性问题它算出所有路径上的会合解；John Kam 与 Jeffrey Ullman（1976–77 年）分析了单调框架，指出没有分配性时 MFP 可能严格差于 MOP。Étienne Morel 与 Claude Renvoise 于 1979 年引入了部分冗余消除。Patrick 与 Radhia Cousot 的抽象解释（POPL 1977）把数据流分析推广为程序语义之可靠近似的理论，是现代静态分析工具的基础。Mark Wegman 与 Kenneth Zadeck 的 "Constant propagation with conditional branches"（*ACM TOPLAS*，1991 年）给出了 SCCP。
:::

## 后续内容

活跃性是 [[compilers/code-generation]] 中寄存器分配的输入：同一时刻活跃的两个变量不能共用一个寄存器，而从活跃性构造的干扰图正是分配器要着色的对象。本章的各项分析都在单个函数内进行；**过程间**分析（调用图、摘要、内联决策）与**别名分析**（两个指针可能指向哪块存储）把它们推广开来，抽象解释则把它们变成能证明整个程序不含运行期错误的工具。

::: summary
- 一个**数据流分析**通过把每个块的输入与输出相联系、把邻块送来的值用**会合**合并的方程，给块边界指派格值；活跃性是后向的、用并集，到达定义是前向的、用并集，可用表达式是前向的、用交集。
- 一个**工作表求解器**就能应付它们全体；它只重新访问输入变了的块，按逆后序访问块时，在无圈 CFG 上一遍完成。
- 对有限高度 $h$ 的格上的单调函数，迭代在 $N + hE$ 次访问内终止并给出**最大不动点**（[[#thm-mfp]]）；MFP 总是**所有路径上的会合**的一个安全近似，对 gen/kill 这类分配性框架与之相等（[[#thm-mop]]）。
- **常量传播**使用高度为 2 的格 $\top$ / 常量 / $\bot$；它不是分配的，所以相关值会在汇合点丢失（[[#ex-nondistributive]]）。
- 在 **SSA** 形式上，常量传播、复制传播与死代码消除变得稀疏而简单；配合分支折叠，它们删掉了开头示例里的调试代码与循环不变算术，在我们的测试上把执行指令数最多削减 45%。
- 优化只有相对于某个语义才正确：删掉一个死的除法就假定了除以零是未定义行为。GCC 的 PRE 与 SCCP 走得比我们的简单遍历更远。
:::

## 习题

::: exercise 手工求活跃变量 {level=1 check="3"}
在块 `a = b + c; d = a * 2; b = d - e; return b` 中，有多少个变量在块开头是活跃的？（填入数字。）
::: solution
从末尾往回推演，末尾什么都不活跃（块要返回）。`return b`：$\set{b}$。`b = d - e`：去掉 $b$，加上 $d, e$：$\set{d, e}$。`d = a * 2`：去掉 $d$，加上 $a$：$\set{a, e}$。`a = b + c`：去掉 $a$，加上 $b, c$：$\set{b, c, e}$。三个变量：$b$、$c$ 和 $e$。等价地说，$\mathrm{use}(B) = \set{b, c, e}$（先被读后才被赋值）且 $\mathrm{out}(B) = \emptyset$。
:::
:::

::: exercise 格的高度 {level=1 check="10"}
对一个有 5 个变量的函数作常量传播，块边界的格是 5 份单变量格 $\top$ / 常量 / $\bot$ 的乘积。它的高度是多少？（填入数字。）
::: solution
乘积中的严格下降链每一步至少压低一个分量，而每个分量至多被压低两次（$\top \to c \to \bot$）。所以最长链有 $5 \times 2 = 10$ 步，且这样的链存在（一次压低一个变量）。由 [[#thm-mfp]]，每个块的值至多变化 10 次。
:::
:::

::: exercise gen 与 kill {level=1}
对程序中形如 $d_1\colon x = 1$、$d_2\colon y = x$、$d_3\colon x = y + 1$、$d_4\colon z = x$、$d_5\colon y = 0$ 的五个定义 $d_1, \dots, d_5$，分别给出各语句在到达定义下的 gen 集与 kill 集。再算出块 $d_1; d_2; d_3$ 的 gen 与 kill。
::: solution
$d_1$：gen $\set{d_1}$，kill $\set{d_3}$（$x$ 的另一个定义）。$d_2$：gen $\set{d_2}$，kill $\set{d_5}$。$d_3$：gen $\set{d_3}$，kill $\set{d_1}$。$d_4$：gen $\set{d_4}$，kill $\emptyset$。$d_5$：gen $\set{d_5}$，kill $\set{d_2}$。对块 $d_1; d_2; d_3$，把三个函数按次序复合。$\mathrm{gen} = \set{d_2, d_3}$：$d_1$ 生成了，却在块内被 $d_3$ 杀掉。$\mathrm{kill}$ 是 $x$ 或 $y$ 的一切定义，即 $\set{d_1, d_2, d_3, d_5}$；由于传递函数是 $f(S) = \mathrm{gen} \cup (S \setminus \mathrm{kill})$，把它写成 $f(S) = \set{d_2, d_3} \cup (S \setminus \set{d_1, d_5})$ 也一样：进来的 $d_1$ 或 $d_5$ 活不出这个块，进来的 $d_4$ 则能。
:::
:::

::: exercise 可用表达式 {level=2}
形如 `a + b` 的表达式 $e$ 在某点**可用**，若对每条到达该点的路径，$e$ 已被计算过且它的任何运算对象此后都未被赋值。（a）写出数据流方程组（方向、会合、gen、kill、边界、初值）。（b）解释为什么初值必须是全体表达式的集合而不是 $\emptyset$。（c）用 `solve` 实现它，并在你选的一个循环上运行。
::: solution
（a）前向。$\mathrm{in}(r) = \emptyset$；$\mathrm{in}(B) = \bigcap_{P} \mathrm{out}(P)$；$\mathrm{out}(B) = \mathrm{gen}(B) \cup (\mathrm{in}(B) \setminus \mathrm{kill}(B))$，其中 $\mathrm{gen}(B)$ 是在 $B$ 中计算过、且其后在 $B$ 内没有运算对象被赋值的表达式，$\mathrm{kill}(B)$ 是有运算对象在 $B$ 中被赋值的表达式。非入口块的初值：$U$，函数内全体表达式的集合。

（b）会合是 $\cap$，所以 $\top = U$。从 $\emptyset$ 起步，在一个循环处会永远得到 $\mathrm{in}(\text{header}) = \mathrm{out}(\text{preheader}) \cap \mathrm{out}(\text{latch}) = \dots \cap \emptyset = \emptyset$：是一个不动点，但不是最大的那个，它丢掉了绕回边可用的一切表达式。[[#thm-mfp]] 要求从 $\top$ 出发。

（c）

```python
def available(blocks):
    exprs = lambda i: {(i[2], i[3], i[4])} if i[0] == "op" else set()
    U = set().union(*(exprs(i) for ins in blocks.values() for i in ins))
    def transfer(b, s):
        s = set(s)
        for i in blocks[b]:
            s |= exprs(i)
            if defs(i): s = {e for e in s if i[1] not in e[1:]}   # 运算对象已改变
        return s
    return solve(blocks, True, transfer,
                 lambda vs: set.intersection(*vs) if vs else set(), set(), U)
```

入口的会合里包含了边界值（它作为参与会合的值之一传入），所以入口得到 $\emptyset$。注意 `transfer` 中的次序：指令 `a = a + 1` 先生成 `a + 1` 再杀掉它。对循环 `while i < 10 { s = s + a * b; i = i + 1; }`（前面有 `a = 3; b = 4`），结果在每个块开头都是空集：`a * b` 只在循环内部计算，所以在进入循环头的进入路径上不可用。这正是一处*部分*冗余——绕回边可用、入口处不可用——PRE 或循环不变代码外提会在循环之前把 `a * b` 算一次，从而把它消掉。
:::
:::

::: exercise 局部值编号 {level=2}
写一个函数，用值编号在一个基本块内作公共子表达式消除：给每个运算对象一个值号，把每条 `op` 指令的键 `(op, vn(x), vn(y))`（对可交换运算符先把运算对象排序）拿去查表，并把重复的计算替换成从持有该值的变量作复制。手工把它应用于 `t1 = a + b; t2 = b + a; a = 7; t3 = a + b; t4 = t1 * t2`。
::: solution
```python
def lvn(block):
    vn, table, holder, out = {}, {}, {}, []      # 变量 -> 值号；键 -> 值号；值号 -> 变量
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

测试 `vn.get(holder[…]) == …` 检查持有该值的变量此后没有被重新赋值。手工演算：$a \mapsto 0$，$b \mapsto 1$；`t1 = a + b` 的键是 $(+, 0, 1)$，新值 2 由 $t_1$ 持有。`t2 = b + a`：键又是 $(+, 0, 1)$（已排序），于是它变成 `t2 = t1`。`a = 7`：$a$ 得到新值号（常量 7 的那个）。`t3 = a + b`：键 $(+, 3, 1)$——新的，计算。`t4 = t1 * t2`：二者值号都是 2，键 $(*, 2, 2)$，新的。结果：`t1 = a + b; t2 = t1; a = 7; t3 = a + b; t4 = t1 * t2`，随后复制传播把最后一条变成 `t4 = t1 * t1`。
:::
:::

::: exercise 分配性 {level=2}
（a）证明每个 gen/kill 传递函数 $f(x) = g \cup (x \setminus k)$ 对 $\cup$ 和 $\cap$ 都分配。（b）证明分配函数的复合仍分配，从而由指令搭建的块传递函数是分配的。（c）给出一个含两条指令的块，使常量传播的传递函数在它之上不分配，且不是 [[#ex-nondistributive]] 里那个。
::: solution
（a）$f(x \cup y) = g \cup ((x \cup y) \setminus k) = g \cup (x \setminus k) \cup (y \setminus k) = f(x) \cup f(y)$，因为集合差对并分配。对交：$f(x) \cap f(y) = (g \cup (x \setminus k)) \cap (g \cup (y \setminus k)) = g \cup ((x \setminus k) \cap (y \setminus k)) = g \cup ((x \cap y) \setminus k) = f(x \cap y)$，用到分配律 $(g \cup A) \cap (g \cup B) = g \cup (A \cap B)$。

（b）$(f \circ g)(x \sqcap y) = f(g(x) \sqcap g(y)) = f(g(x)) \sqcap f(g(y))$。

（c）取块 `z = x - y; w = z * 3`，输入为 $\set{x \mapsto 1, y \mapsto 1}$ 和 $\set{x \mapsto 2, y \mapsto 2}$：分别求值，二者上都有 $z = 0, w = 0$，其会合是 $z = 0, w = 0$；在二者的会合 $\set{x \mapsto \bot, y \mapsto \bot}$ 上，块给出 $z = \bot, w = \bot$。任何对相关而不相同的输入给出相同结果的运算，都会暴露这种丢失。
:::
:::

::: exercise 条件常量传播 {level=3 #ex-sccp}
为我们的 SSA IR 实现 SCCP：维护可执行 CFG 边的集合（起初为空）与可达块的集合（起初为入口）；只求值可达块中的指令；对 φ，只在进入边可执行的运算对象之间取会合；对分支，把与其运算对象当前格值相容的边标为可执行（有运算对象是 $\top$ 时一条都不标，有运算对象是 $\bot$ 时两条都标）。在正文的 `h` 上运行，展示它发现 `x` 是常量。解释为什么结果仍是可靠的近似。
::: solution
```python
def sccp(blocks, params):
    """条件常量传播：只有可执行边才喂给 φ 和分支。"""
    val = {p: NAC for p in params}
    get = lambda x: val.get(x, UNDEF) if isinstance(x, str) else (UNDEF if x is None else x)
    entry = next(iter(blocks)); live = {entry}; edges = set()
    changed = True
    while changed:
        changed = False
        for b in list(live):
            for i in blocks[b]:
                if i[0] == "phi":                    # 只取可执行边上的运算对象
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

对 SSA 形式的 `h`，`ssa_constants` 返回 `{'x_0': 1, 'x_2': 2}`，而 `sccp` 返回 `({'x_0': 1, 'x_1': 1, 'x_3': 1}, {'B0', 'L1', 'L2', 'L6', 'L3'})`：$L_4$ 永远不可达，所以 $x_2$ 从不喂给 $x_3$，而 $x_1 = 1 \sqcap x_3 = 1$。可靠性：值仍然只往下走（块或边一旦可执行就保持可执行；φ 的运算对象集合只增不减），所以迭代在联立方程组的不动点处终止。若一条边在某次真实运行中可执行，则分析必把它标出——对运行长度归纳：运行中分支运算对象的值低于其格值，所以实际走的那条边必在被标记的边之中。因此真实运行中的每个值都被分析刻画，折叠它找到的事实是安全的。
:::
:::

::: exercise 工作表算法的界 {level=3}
（a）对 $N$ 个块、$E$ 条边、$V$ 个变量的 CFG 上的活跃性，用 [[#thm-mfp]] 给出块访问次数的界，并给出用位向量集合时每次访问的代价。（b）证明对一个由 $N$ 个块首尾相接成单个循环的 CFG，即便用最好的次序，活跃性也可能需要约 $2N$ 次访问；并解释**循环连通度** $d$（任一无环路径上回边数的最大值）的作用——Kam 与 Ullman 证明了对 gen/kill 问题，按逆后序走 $d + 2$ 趟就够。
::: solution
（a）$V$ 个变量的子集格的高度是 $V$，所以至多 $N + VE$ 次访问。每次访问要算一个对后继的并和传递函数；用 $w$ 位字存放 $V$ 位的位向量，那是 $O((1 + \lvert\mathrm{succ}\rvert) V / w)$ 次字操作。实际上这个界远不紧：每个变量的活跃性沿 CFG 只走几趟，而不是 $E$ 趟。

（b）在圈 $B_1 \to B_2 \to \dots \to B_N \to B_1$ 中，$v$ 在 $B_1$ 中被使用而无处定义，则 $v$ 必须在处处活跃，从 $B_1$ 往回流向 $B_N, B_{N-1}, \dots, B_2$。对后向问题取逆后序（从 $B_N$ 往下到 $B_1$），第一趟在 $B_1$ 的 live-in 已知之前访问 $B_N, \dots, B_2$，它们什么也学不到；然后访问 $B_1$；第二趟把 $v$ 传遍整个圈。第三趟（或者说使用工作表时它所触发的重新访问）确认到达不动点：大约 $2N$ 到 $3N$ 次访问。一般地，信息沿每段回边之间的无环段流动需要一趟，所以趟数由无环路径可穿过的回边数 $d$ 决定；对结构程序，$d$ 就是循环嵌套深度，通常不超过 3，这就是迭代数据流分析实际运行很快的原因。
:::
:::
