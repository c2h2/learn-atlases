语义分析结束后，编译器手里是一棵带标注的抽象语法树：每个名字都已解析，每个表达式都已配好类型。它完全可以直接从这棵树生成机器码，[[compilers/compiler-structure]] 里那个小巧的编译器就是这么做的。但对接下来的大多数工作来说，树是一种糟糕的形式。优化器想问的是这样的问题："`x` 的哪些赋值能到达这一处使用？""这条计算是否在每条路径上都被重复？""这个值能否在整个循环期间驻留寄存器？"——这些问题都是关于*控制流*的，而在树中控制流只隐含在 `while` 与 `if` 结点的嵌套里，一旦涉及 `break`、`continue`、`return`、短路 `&&` 或 `goto` 就变得别扭起来。而后端想要的是贴近机器指令的运算：一次一条运算，每个中间值都有名字。

于是编译器把这棵树翻译成一种**中间表示**（IR）：一份简单指令的列表，指令被划分为**基本块**，块之间由**控制流图**中的显式边相连。本章定义三地址代码，把 Mini 的抽象语法树下降为三地址代码，并构造控制流图。然后展开现代编译器中最重要的那种 IR——**静态单赋值形式**（SSA），其中每个变量恰好只被赋值一次。SSA 建立在**支配者**理论之上：支配者由迭代到不动点求出；也建立在**支配边界**之上，它确切地告诉我们一个变量的两个定值在哪里相遇。我们用 Python 写出完整的 SSA 构造，用一台 IR 解释器对它测试，并与 LLVM 对同一函数所做的事作比较。

## 三地址代码

::: definition 三地址代码 {#def-tac}
**三地址代码**是一串指令，每条至多执行一次运算，形如
- $x = y$（复制）、$x = y \mathbin{\mathit{op}} z$（二元运算）、$x = \mathrm{call}\ f(y_1, \dots, y_k)$；
- $\mathbf{goto}\ L$，以及 $\mathbf{if}\ y \mathbin{\mathit{relop}} z\ \mathbf{goto}\ L_1\ \mathbf{else}\ L_2$；
- $\mathbf{return}\ y$；以及标号 $L{:}$，

其中 $x$ 是变量，$y$ 与 $z$ 是变量或常量，$\mathit{relop}$ 是比较运算符。变量包括程序自己的变量和编译器生成的**临时变量** $t_1, t_2, \dots$，临时变量取之不竭。
:::

这个名字指的是每条指令至多三个运算对象（"地址"）。表达式的每个中间值如今都有了名字：`a * b + c` 变成 $t_1 = a * b$；$t_2 = t_1 + c$。控制流是显式的：没有嵌套语句，只有跳转。我们的分支指令有两个目标，这使得控制流图一眼就能读出来；许多 IR 则改用顺序"下落"到下一条指令的条件跳转。

### 把 Mini 下降为三地址代码

下降是对语法树的递归遍历。每条语句发出若干指令；每个表达式发出若干指令，并返回承载其值的那个**运算对象**（变量名、临时变量或常量）。条件被翻译成**跳出代码**：不是先算出布尔值再测试它，而是让 `cond(c, lt, lf)` 发出这样的指令——$c$ 为真就跳到 $L_t$，否则跳到 $L_f$。这使得 `&&` 与 `||` 的短路语义不证自明——只有控制流到达时第二个运算对象才被求值——并且避免了把只用来测试的布尔值真的物化出来。

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

    def cond(self, c, lt, lf):               # 布尔表达式的跳出代码
        if c.kind == "bin" and c.kids[0] in ("<", "<=", ">", ">=", "==", "!="):
            op, a, b = c.kids
            self.emit("br", op, self.expr(a), self.expr(b), lt, lf)
        elif c.kind == "bin" and c.kids[0] in ("&&", "||"):
            op, a, b = c.kids; mid = self.label()
            if op == "&&": self.cond(a, mid, lf)          # a 假：整体为假
            else: self.cond(a, lt, mid)                    # a 真：整体为真
            self.emit("label", mid); self.cond(b, lt, lf)
        elif c.kind == "un":                               # !e：对调两个目标
            self.cond(c.kids[1], lf, lt)
        else:
            self.emit("br", "!=", self.expr(c), 0, lt, lf)
```

变量以其源程序中的名字命名，只有一处例外：一个名字若在一个函数中被声明多次（遮蔽），就把它所属符号的唯一编号用作后缀，如 `x.3`，从而不同的变量绝不共用一个 IR 名字。表达式：

```python
    def expr(self, e):                       # 返回一个运算对象：名字或常量
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
        if e.kids[0] in ("&&", "||") or e.type == "bool":   # 布尔值：经由跳转
            t, lt, lf, lend = self.temp(), self.label(), self.label(), self.label()
            self.cond(e, lt, lf)
            self.emit("label", lt); self.emit("=", t, 1); self.emit("jmp", lend)
            self.emit("label", lf); self.emit("=", t, 0); self.emit("jmp", lend)
            self.emit("label", lend); return t
        op, a, b = e.kids
        x, y = self.expr(a), self.expr(b); t = self.temp()
        self.emit("op", t, op, x, y); return t
```

布尔值以整数 $0$ 与 $1$ 表示（于是 `!a` 就是 $a \oplus 1$）；当需要布尔表达式的*值*时，如 `let b = x < y;`，就用跳出代码把它编译成对 $1$ 和 $0$ 的赋值。检查器算出的类型在这里第一次派上用场：它告诉下降过程 `==` 比较的是布尔还是整数（这里两者都是同一条机器比较指令，但一门有浮点数的语言会由类型来选择指令）。

## 基本块与控制流图

::: definition 基本块与控制流图 {#def-cfg}
一个**基本块**是最大的指令序列：只能从它的第一条指令进入，只能在它的最后一条指令之后离开；除开头处可能有一个标号外不含标号，除结尾处可能有一条跳转外不含跳转。一个函数的**控制流图**（CFG）是以它的基本块为顶点的有向图，若控制能从 $B$ 的末尾流到 $C$ 的开头，就连一条边 $B \to C$——或者因为 $B$ 以一条指向 $C$ 的跳转结束，或者以一条分支结束而 $C$ 是它的目标之一。含第一条指令的那个块是**入口**。
:::

块内的指令每次都一条接一条地执行；所有要紧的抉择都在边上。要找出各块，把第一条指令、每条带标号的指令、以及每条跟在跳转、分支或返回之后的指令都标为**入口语句**；每个块从一个入口语句一直延伸到下一个入口语句之前。我们的实现还把"顺序下落"显式化：在一个恰好跑到某个标号上的块末尾补一条 `goto L`，于是每个块都以 `goto`、`if … goto … else …` 或 `return` 结束；并删除不能从入口到达的块（例如 `return` 之后的代码）。

```python
def basic_blocks(code):
    """把线性代码切分成块：一个字典，标号 -> 指令列表，按顺序。"""
    blocks, order, cur = {}, [], None
    for ins in code:
        if ins[0] == "label":
            if cur is not None and (not blocks[cur] or blocks[cur][-1][0] not in ("jmp", "br", "ret")):
                blocks[cur].append(("jmp", ins[1]))     # 让顺序执行显式化
            cur = ins[1]; blocks[cur] = []; order.append(cur)
        else:
            if cur is None or blocks[cur] and blocks[cur][-1][0] in ("jmp", "br", "ret"):
                cur = f"B{len(order)}"; blocks[cur] = []; order.append(cur)
            blocks[cur].append(ins)
    reach, work = {order[0]}, [order[0]]               # 删除不可达的块
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

::: example 欧几里得算法的控制流图 {#ex-gcd-cfg}
把 [[compilers/semantic-analysis#ex-gcd-ast]] 中的 `gcd` 和 `main` 下降，并画出 `gcd` 的控制流图。
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

`gcd` 的控制流图有四个块，边为 $B_0 \to L_1$、$L_1 \to L_2$、$L_1 \to L_3$ 和 $L_2 \to L_1$；最后一条是循环的**回边**。`while` 循环变成了一个测试块 $L_1$ 和一个循环体 $L_2$；`let t` 变成了一条普通赋值，它的作用域已经尽完了自己的职责。复制 `t = t1` 是朴素下降付出的代价（`%` 的结果先进一个临时变量）；[[compilers/dataflow-optimisation]] 会除掉这类复制。
:::
:::

为了测试此后每一种变换，我们使用一台 IR **解释器**。它逐块运行一个函数，把变量保存在一个字典里；`print` 往一个输出列表里追加。（φ 指令的处理办法下面解释。）

```python
def tdiv(a, b):                             # 向零截断的除法，与 C 一致
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
        env.update(phis)                    # 一个块的全部 φ 同时读取输入
        for ins in ins_list:
            k = ins[0]
            if k != "phi": run.count += 1         # 已执行指令计数（φ 不计）
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

运行 `gcd` 程序的 `main` 打印 `[21]`。（解释器使用 Python 的无界整数；[[compilers/compiler-structure]] 中的 64 位回绕只对溢出的程序有影响，而我们的测试都避开了溢出。）一组七个测试程序——欧几里得算法、阶乘、短路逻辑、Collatz、带相互递归的嵌套循环、一个交换循环和一个八参数函数——在本章与下一章的每种变换之后运行，输出都不变。

::: widget graph
nodes: B0@0,2; L1@2,2; L2@4,2; L4@6,1; L5@6,3; L6@8,2; L3@2,4
edges: B0>L1; L1>L2; L1>L3; L2>L4; L2>L5; L4>L6; L5>L6; L6>L1
algorithm: dfs
start: B0
caption: [[#ex-collatz]] 中 Collatz 函数的控制流图：循环测试 $L_1$，循环体里 $L_2$ 处的 `if` 及其两个分支 $L_4$ 与 $L_5$，使 `steps` 递增的汇合点 $L_6$，以及出口 $L_3$。单步跟踪从入口出发的深度优先搜索。边 $L_6 \to L_1$ 到达一个仍在 DFS 栈上的顶点——一条回边，即循环。$L_6$ 与 $L_1$ 是**汇合点**（各有两个前驱）；SSA 形式将在那里需要 φ 函数。
:::

## 支配

关于控制流图的许多问题都归结为一个关系。

::: definition 支配 {#def-dom}
在入口为 $r$ 的控制流图中，若从 $r$ 到 $n$ 的每条路径都经过 $d$，则称块 $d$ **支配**块 $n$，记作 $d \mathrel{\mathrm{dom}} n$。每个块支配自身；若 $d \mathrel{\mathrm{dom}} n$ 且 $d \ne n$，则称 $d$ **严格支配** $n$。$n \ne r$ 的**直接支配者** $\mathrm{idom}(n)$ 是 $n$ 的那个严格支配者——$n$ 的其余每个严格支配者都支配它。**支配树**对每个 $n \ne r$ 有一条边 $\mathrm{idom}(n) \to n$。
:::

在 Collatz 的控制流图中，$L_1$（循环测试）支配循环的每个块以及出口：不先测试条件，哪里也去不了。$L_2$ 支配 $L_4$、$L_5$ 和 $L_6$，但 $L_4$ 不支配 $L_6$，因为经由 $L_5$ 的路径绕开了它。支配刻画的是"必定在此之前执行过"，这正是优化器需要的：$d$ 中的一次计算，在 $d$ 支配的每个块里都可用；而一个循环就是由它的循环头支配的一堆块。

::: lemma 一个块的支配者构成一条链 {#lem-dom-chain}
若 $d_1$ 与 $d_2$ 都支配 $n$，则 $d_1$ 支配 $d_2$ 或 $d_2$ 支配 $d_1$。于是每个块 $n \ne r$ 恰有一个直接支配者，支配树是一棵以 $r$ 为根的树。
:::

::: proof
取一条从 $r$ 到 $n$ 的**简单**路径（没有重复的块）；它既含 $d_1$ 也含 $d_2$，设 $d_1$ 先出现。假设 $d_1$ 不支配 $d_2$：那就存在一条从 $r$ 到 $d_2$ 而绕开 $d_1$ 的路径 $P$。沿 $P$ 走到 $d_2$，再走我们那条简单路径中从 $d_2$ 到 $n$ 的部分——这部分在 $d_1$ 之后，因此不含 $d_1$。所得是一条从 $r$ 到 $n$ 绕开 $d_1$ 的路径，与 $d_1 \mathrel{\mathrm{dom}} n$ 矛盾。所以 $d_1$ 支配 $d_2$。

于是 $n$ 的严格支配者在支配关系下全序（支配是自反、传递且反对称的：若 $d_1 \mathrel{\mathrm{dom}} d_2$ 且 $d_2 \mathrel{\mathrm{dom}} d_1$ 而 $d_1 \ne d_2$，则到 $d_2$ 的一条简单路径会在 $d_2$ 之前包含 $d_1$，反之亦然）。它们构成一条有限链 $r = d_0, d_1, \dots, d_k$，前者支配后者，而链的最后一个元素就是唯一的直接支配者。每个非根块在树中恰有一个双亲，沿双亲一路向上必到 $r$，所以支配树确实是一棵树。
:::

支配可以按 [[compilers/top-down-parsing#thm-ff-fixpoint]] 那种风格的集合方程来算：一个块的支配者集等于它自己，再加上支配它*所有*前驱的那些块。

$$
\mathrm{Dom}(r) = \set{r}, \qquad \mathrm{Dom}(n) = \set{n} \cup \bigcap_{p \in \mathrm{pred}(n)} \mathrm{Dom}(p) \quad (n \ne r).
$$ {#eq-dom}

这些方程有多个解——在有循环的图上，一个块对自己的支配集可以"假设"任何事——而支配者集是其中*最大*的那个。所以我们自顶向下迭代：把所有集合都从满集出发，一路收缩直到再无变化。

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
    """直接支配者：被其余所有严格支配者都支配的那个严格支配者。"""
    return {b: next(d for d in ds - {b} if dom[d] == ds - {b})
            for b, ds in dom.items() if len(ds) > 1}
```

$n$ 的直接支配者就是那个自身支配集恰为 $\mathrm{Dom}(n) \setminus \set{n}$ 的严格支配者 $d$：由 [[#lem-dom-chain]]，严格支配者构成一条链，而只有链的最后一个元素被其余全部支配。

::: theorem 迭代算出支配者 {#thm-dom-iter}
设每个块都能从 $r$ 到达。上面的迭代终止，且终止时 $\mathrm{dom}[n]$ 对每个块 $n$ 恰是 $n$ 的支配者集。
:::

::: proof
*终止性。*每次更新把一个集合换成一个新值，而新值从不比旧值大：归纳可知所有集合只会收缩，因为它们从满集出发，而 [[#eq-dom]] 的右端是单调的（右端的集合越小，结果越小）。$N$ 个块的一个集合至多收缩 $N$ 次，所以改动至多 $N^2$ 次，轮数至多 $N^2 + 1$。

*每个支配者都留在集合里。*设 $D(n)$ 为真实的支配者集。对更新归纳证明：任何时刻都有 $D(n) \subseteq \mathrm{dom}[n]$。最初各集合是满的（且 $\mathrm{dom}[r] = \set{r} = D(r)$）。考虑对 $n$ 的一次更新：若 $d \in D(n)$ 且 $d \ne n$，则 $d$ 支配 $n$ 的每个前驱 $p$（一条从 $r$ 到 $p$ 而绕开 $d$ 的路径，再接上边 $p \to n$，就会绕开 $d$），于是由归纳假设对每个 $p$ 都有 $d \in \mathrm{dom}[p]$，从而 $d$ 属于那个交集。

*最终集合的每个元素都是支配者。*终止时各集合满足 [[#eq-dom]]。假设 $d \in \mathrm{dom}[n]$，却有一条路径 $r = v_0, v_1, \dots, v_k = n$ 绕开了 $d$。从 $n$ 沿路径往回走：$d \in \mathrm{dom}[v_k]$ 且 $d \ne v_k$，由方程得 $d \in \mathrm{dom}[v_{k-1}]$（因为 $v_{k-1}$ 是前驱），如此下去，直到 $d \in \mathrm{dom}[v_0] = \set{r}$，于是 $d = r$——但 $r$ 的每条路径都包含 $r$。矛盾。
:::

::: example Collatz 循环的支配者 {#ex-collatz-dom}
对 Collatz 的控制流图计算支配者、直接支配者与支配树（前驱：$L_1 \leftarrow B_0, L_6$；$L_2 \leftarrow L_1$；$L_4, L_5 \leftarrow L_2$；$L_6 \leftarrow L_4, L_5$；$L_3 \leftarrow L_1$）。
::: solution
按 $L_1, L_2, L_4, L_5, L_6, L_3$ 的顺序处理各块，第一轮得到 $\mathrm{Dom}(L_1) = \set{L_1} \cup (\set{B_0} \cap \text{全体}) = \set{B_0, L_1}$，接着 $L_2$ 得 $\set{B_0, L_1, L_2}$；$L_4$、$L_5$ 分别得 $\set{B_0, L_1, L_2, L_4}$ 和 $\set{B_0, L_1, L_2, L_5}$；对 $L_6$，$\set{L_6} \cup (\mathrm{Dom}(L_4) \cap \mathrm{Dom}(L_5)) = \set{B_0, L_1, L_2, L_6}$；以及 $\set{B_0, L_1, L_3}$。第二轮毫无变化（程序报告两轮之后各集合大小为 $1, 2, 3, 4, 4, 4, 3$）。直接支配者：$\mathrm{idom}(L_1) = B_0$，$\mathrm{idom}(L_2) = \mathrm{idom}(L_3) = L_1$，$\mathrm{idom}(L_4) = \mathrm{idom}(L_5) = \mathrm{idom}(L_6) = L_2$。注意 $L_6$ 的直接支配者是 $L_2$，而不是它的任何一个前驱。一轮就够了，因为块的次序恰好让前驱都排在前面，只有回边这条例外；而当 $L_1$ 被重新访问时，回边的源 $L_6$ 已经有了它的最终集合。
:::
:::

::: widget graph
nodes: B0@0,0; L1@2,0; L2@4,0; L3@2,2; L4@6,-1; L5@6,0; L6@6,1
edges: B0>L1; L1>L2; L1>L3; L2>L4; L2>L5; L2>L6
algorithm: bfs
start: B0
caption: [[#ex-collatz-dom]] 中 Collatz 控制流图的支配树：每个块的双亲就是它的直接支配者。从 $B_0$ 出发的广度优先搜索逐层访问各块；一个块的支配者恰是它在树中到根的路径上的那些块。与控制流图那张图对照：$L_4 \to L_6$ 和 $L_5 \to L_6$ 这两条图边不是树边，因为两个分支哪个也不支配汇合点。SSA 构造的重命名阶段走的就是这棵树。
:::

这个简单迭代最坏需要 $O(N^2)$ 次集合操作，对多数函数来说足够好。Cooper、Harvey 与 Kennedy（2001 年）证明：仍是这个迭代，只要把集合用支配树隐式表示、并按逆后序访问各块，实践中就很快；Lengauer–Tarjan 算法（1979 年）以近乎线性的时间算出支配者，LLVM 与 GCC 对大函数就用它。

::: quiz
在一个控制流图中，块为 $A$（入口）、$B$、$C$、$D$，边为 $A \to B$、$A \to C$、$B \to D$、$C \to D$、$D \to B$。$\mathrm{idom}(D)$ 和 $\mathrm{idom}(B)$ 各是什么？
- [ ] $\mathrm{idom}(D) = B$，$\mathrm{idom}(B) = A$
- [x] $\mathrm{idom}(D) = A$，$\mathrm{idom}(B) = A$
- [ ] $\mathrm{idom}(D) = C$，$\mathrm{idom}(B) = D$
- [ ] $D$ 有两个直接支配者：$B$ 和 $C$
::: solution
$D$ 既能由 $A \to B \to D$ 到达，也能由 $A \to C \to D$ 到达，所以 $B$ 与 $C$ 都不支配它；支配它的只有 $A$（以及 $D$ 自己）。$B$ 既能从 $A$ 直接到达，也能由 $A \to C \to D \to B$ 到达，所以 $D$ 不支配 $B$；同样只有 $A$。直接支配者是唯一的（[[#lem-dom-chain]]）。这个控制流图是一个有双入口的循环 $B \to D \to B$（$B$ 进自 $A$，$D$ 进自 $C$）：一个**不可归约**循环，没有任何单个循环头支配它。
:::
:::

## 静态单赋值形式

在三地址代码里，Collatz 循环中的变量 `n` 在三处被赋值，而 `n` 的一次使用可能从任何一处得到它的值，取决于所走的路径。凡是对值进行推理的优化，都必须算清*哪次*赋值到达*哪处*使用——这就是 [[compilers/dataflow-optimisation]] 的到达定值问题。静态单赋值形式把答案直接做进了程序里。

::: definition 静态单赋值形式 {#def-ssa}
若每个变量在程序正文中恰好只在一处被赋值，则程序处于**静态单赋值**（SSA）形式。在携带同一变量不同版本的控制流路径相遇之处，在一个前驱为 $B_1, \dots, B_k$ 的块开头放一个 **φ 函数** $v = \varphi(B_1{:}\ v_1, \dots, B_k{:}\ v_k)$：控制从 $B_i$ 到来时，$v$ 就取值 $v_i$。一个块开头的所有 φ 函数都是**同时**求值的——在进入该块时、该块任何其他指令之前。
:::

每个变量只有一个定值，每处使用的定值就一目了然，变量的值一经算出便永不改变，于是许多优化变得简单：常量传播就是"若 $x = 5$，则 $x$ 的每处使用都是 5"；无用代码消除就是"删掉没有使用的定值"；复制传播就是"$x = y$ 之后把 $x$ 处处换成 $y$"。转换成 SSA 需要决定 φ 函数*放在哪里*，然后把每个定值和使用**重命名**为一个带编号的版本。

### φ 函数放在哪里

若 $v$ 的两个不同定值可以沿两条路径到达块 $Y$，而这两条路径恰在 $Y$ 处第一次相遇，就需要在 $Y$ 放 $v$ 的一个 φ 函数。关键概念是一个块的支配在哪里"到头"。

::: definition 支配边界 {#def-df}
块 $X$ 的**支配边界** $\mathrm{DF}(X)$ 是满足如下条件的块 $Y$ 的集合：$X$ 支配 $Y$ 的某个前驱，但不严格支配 $Y$。对块集 $S$，$\mathrm{DF}(S) = \bigcup_{X \in S} \mathrm{DF}(X)$；**迭代支配边界** $\mathrm{DF}^+(S)$ 是 $S_1 = \mathrm{DF}(S)$、$S_{i+1} = \mathrm{DF}(S \cup S_i)$ 的极限。
:::

通俗地说，$\mathrm{DF}(X)$ 是从 $X$ 出发最先到达的那些块的集合，到了那里 $X$ 的影响就要同别的路径共享。在 Collatz 的控制流图中，$\mathrm{DF}(L_4) = \mathrm{DF}(L_5) = \set{L_6}$——不论走哪个分支，都是那个汇合点；$\mathrm{DF}(L_6) = \set{L_1}$——循环头，它也能从 $B_0$ 到达；还有 $\mathrm{DF}(L_1) = \mathrm{DF}(L_2) = \set{L_1}$：循环头在自己的边界里，因为它支配自己回边的源，却不*严格*支配自己。

::: lemma 路径经由被支配区域的边界离开该区域 {#lem-df-path}
若存在从 $X$ 到 $Y$ 的一条路径，且 $X$ 不严格支配 $Y$，则该路径包含 $\mathrm{DF}(X)$ 中的一个块（可能正是 $Y$ 自己）。
:::

::: proof
设该路径为 $X = p_0, p_1, \dots, p_k = Y$，其中 $k \ge 1$（若 $k = 0$，则 $Y = X$；长度为零的路径被"路径"一词排除在外；而若路径回到 $X$，下面的论证对那次出现同样适用）。取使 $X$ 不严格支配 $p_i$ 的最小指标 $i \ge 1$；它存在，因为 $X$ 不严格支配 $p_k$。于是 $X$ 支配 $p_{i-1}$：或者 $i = 1$ 且 $p_0 = X$，或者由 $i$ 的取法，$X$ 严格支配 $p_{i-1}$。所以 $X$ 支配 $p_i$ 的前驱 $p_{i-1}$，却不严格支配 $p_i$：按定义，$p_i \in \mathrm{DF}(X)$。
:::

要计算支配边界，Cooper、Harvey 与 Kennedy 注意到：只有汇合点 $Y$（有两个以上前驱）可能落在某个边界中；而 $Y \in \mathrm{DF}(X)$ 恰当 $X$ 位于支配树中从 $Y$ 的某个前驱向上走到 $\mathrm{idom}(Y)$（不含 $\mathrm{idom}(Y)$）的路径上：

```python
def frontiers(blocks, idom):
    """支配边界（Cooper、Harvey 与 Kennedy 的算法）。"""
    preds, df = predecessors(blocks), {b: set() for b in blocks}
    for b in blocks:
        if len(preds[b]) >= 2:              # 只有汇合点可能落在支配边界中
            for p in preds[b]:
                runner = p
                while runner != idom.get(b):
                    df[runner].add(b); runner = idom.get(runner)
                    if runner is None: break
    return df
```

对 Collatz 的控制流图，程序打印 `DF: {'B0': [], 'L1': ['L1'], 'L2': ['L1'], 'L4': ['L6'], 'L5': ['L6'], 'L6': ['L1'], 'L3': []}`，与上面手工算得的一致。

::: algorithm SSA 形式的构造（Cytron 等） {#alg-ssa}
1. 计算支配树与支配边界。
2. **放置 φ 函数。**对每个变量 $v$，令 $\mathrm{Defs}(v)$ 是为 $v$ 赋值的块的集合（入口视为定义了每个形参）。在 $\mathrm{DF}^+(\mathrm{Defs}(v))$ 的每个块开头放一个 $v$ 的 φ 函数；这个集合用一个工作表算出：收到了 $v$ 的 φ 的块自己也就成了 $v$ 的一个定值处，要加入工作表。
3. **重命名。**从入口出发对支配树做深度优先遍历，为每个变量维护一个其当前版本的栈。在每个块中：给每个 φ 函数以及每条对 $v$ 的赋值一个新的版本 $v_i$ 并压栈；把 $v$ 的每处使用换成 $v$ 栈顶的版本；然后对控制流图的每个后继 $S$，用当前版本填好本块在 $S$ 中每个 φ 处对应的运算对象。递归进入支配树的孩子，返回时弹出本块压入的版本。
:::

第 2 步常有变通做法。**最简** SSA 在整个迭代边界上都放 φ 函数，即使变量在那里是死的；**修剪** SSA 只在 $v$ 活跃的地方为 $v$ 放 φ 函数（借助 [[compilers/dataflow-optimisation]] 的活跃性分析）；**半修剪** SSA（Briggs、Cooper、Harvey 与 Simpson，1998 年）是一种廉价的折中：那些从未在定值块之外被使用的变量一概不理——在我们的 IR 里，就是几乎全部临时变量。我们的实现默认做半修剪：

```python
def to_ssa(params, blocks, semi_pruned=True):
    dom = dominators(blocks); idom = idoms(dom); df = frontiers(blocks, idom)
    preds = predecessors(blocks)
    defs, glob = {}, set()                  # 变量 -> 为它赋值的块
    for b, ins in blocks.items():
        killed = set()
        for i in ins:
            glob |= {x for x in uses(i) if isinstance(x, str) and x not in killed}
            if i[0] in ("=", "op", "call"): defs.setdefault(i[1], set()).add(b); killed.add(i[1])
    entry = next(iter(blocks))
    for p in params: defs.setdefault(p, set()).add(entry)
    phis = {b: {} for b in blocks}          # 块 -> {变量: φ 指令}
    for v, ds in defs.items():              # 定值集的迭代支配边界
        if semi_pruned and v not in glob: continue   # 只在自己所属的块内使用
        work = list(ds)
        while work:
            for y in df[work.pop()]:
                if v not in phis[y]:
                    phis[y][v] = ["phi", v, {p: v for p in preds[y]}]
                    if y not in ds: work.append(y)
```

（`uses(i)` 返回指令 `i` 所读取的运算对象；`glob` 收集那些在某个块中先被读取、后被赋值的变量。）这个函数的重命名那一半直接照着 [[#alg-ssa]] 的第 3 步写：

```python
    children = {b: [c for c, d in idom.items() if d == b] for b in blocks}
    count, stack, new = {}, {v: [] for v in defs}, {}
    def fresh(v):
        count[v] = count.get(v, -1) + 1; name = f"{v}_{count[v]}"; stack[v].append(name); return name
    def use(x):                             # 当前版本；若无定值可达则为 None
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
        for s in successors(blocks[b]):     # 填入本块在 s 中每个 φ 处对应的运算对象
            for v, phi in phis[s].items(): phi[2][b] = use(v)
        for c in children[b]: rename(c)
        for v in pushed: stack[v].pop()
    for p in params: fresh(p)               # 形参：版本 0，在入口处定义
    new_params = [stack[p][-1] for p in params]
    rename(entry)
    return new_params, {b: [tuple(i) for i in new[b]] for b in blocks}
```

一处使用若没有到达它的定值（这只有在一个变量沿某条进入 φ 的路径上未定义时才可能），其运算对象取 `None`，打印成 `undef`。

::: example Collatz 函数的 SSA 形式 {#ex-collatz}
把这个函数转换成 SSA 形式，数出最简 SSA 与半修剪 SSA 中 φ 函数的个数，并把两个版本都运行一遍。

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
三地址代码（块按序排列）与半修剪 SSA 形式并列如下：

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

`n` 的 φ 放置：$\mathrm{Defs}(n) = \set{B_0, L_4, L_5}$（入口定义了形参）。$\mathrm{DF}(L_4) \cup \mathrm{DF}(L_5) = \set{L_6}$，于是 $L_6$ 得到一个 φ 并加入工作表；$\mathrm{DF}(L_6) = \set{L_1}$，于是 $L_1$ 也得到一个；$\mathrm{DF}(L_1) = \set{L_1}$ 不再添新东西。对 `steps`：$\mathrm{Defs} = \set{B_0, L_6}$，得到 $L_1$。共三个 φ 函数。最简 SSA 还会为五个临时变量 $t_1, \dots, t_5$ 放 φ 函数——放在 $L_1$，（对 $t_2$、$t_3$、$t_4$）还放在 $L_6$——一共 11 个 φ 函数，其中八个的结果是死的，且带来自 $B_0$ 的 `undef` 运算对象。重命名沿支配树 $B_0, L_1, L_2, \{L_4, L_5, L_6\}, L_3$ 走：重命名 $L_4$ 时，`n` 的栈顶是 $n_2$，它就成为 $L_6$ 的 φ 中对应 $L_4$ 的运算对象；随后在访问 $L_5$ 之前把 $n_2$ 弹出。IR 解释器对 `collatz(27)` 打印 `[111]`——转换前、最简 SSA 和半修剪 SSA 中都是如此。
:::
:::

### 为什么这样是对的

重命名阶段把每处使用交给*最近的支配性*定值所定义的那个版本——它就处在栈顶，因为遍历走的是支配树。而它在*每条*路径上都是正确的值，这正是下一条定理的内容。支配边界正是在这里体现价值：若边界上不设 φ，一个定值就可能从它支配的区域中"泄漏"出去，到达那些栈顶并非它的使用处。

::: theorem 唯一的到达定值 {#thm-ssa}
在 $\mathrm{DF}^+(\mathrm{Defs}(v))$ 处放置了 φ 函数之后（入口视为定义 $v$），设 $u$ 是 $v$ 的一处使用，$d$ 是最靠近地支配 $u$ 的 $v$ 的定值（一条赋值或一个 φ）。那么从入口到 $u$ 的每条路径上，$u$ 之前 $v$ 的最后一个定值都是 $d$。于是重命名后的程序与原程序算出相同的值。
:::

::: proof
最近的支配性定值是存在的，因为入口定义了 $v$ 且支配一切；它也是唯一的：支配 $u$ 的各定值落在支配 $u$ 的那些块里，而那些块构成一条链（[[#lem-dom-chain]]）；块内则由指令次序决出先后。任取一条从入口到 $u$ 的路径，设 $X$ 是该路径上 $u$ 之前 $v$ 的最后一个定值。假设 $X \ne d$。

*情形 1：$X$ 不支配 $u$。*那么 $X$ 所在块不严格支配 $u$ 所在块（若严格支配，$X$ 就支配 $u$ 了）。$X$ 之后的那段路径从 $X$ 的块走到 $u$ 的块，故由 [[#lem-df-path]] 经过某个块 $Z \in \mathrm{DF}(\mathrm{block}(X)) \subseteq \mathrm{DF}^+(\mathrm{Defs}(v))$——注意 φ 所在的块本身也被加入定值集合，所以 φ 所在块的边界也在其中。$Z$ 的开头有一个 $v$ 的 φ，它是路径上 $X$ 之后的一个 $v$ 定值（即便 $Z$ 正是 $u$ 自己的块，φ 也仍排在 $u$ 之前）。这与 $X$ 的取法矛盾。

*情形 2：$X$ 支配 $u$。*$X$ 与 $d$ 都支配 $u$，而 $d$ 是最近的，故 $X$ 严格支配 $d$。既然 $d$ 支配 $u$，路径必含 $d$；又因 $X$ 之后没有定值，$d$ 只能出现在 $X$ 最后一次出现之前。于是从那次 $X$ 到 $u$ 的那段路径绕开了 $d$。而既然 $X$ 严格支配 $d$，$d$ 就不支配 $X$，所以存在一条从入口到 $X$ 而绕开 $d$ 的路径。把两段接起来，便得到一条从入口到 $u$ 绕开 $d$ 的路径，与 $d \mathrel{\mathrm{dom}} u$ 矛盾。

所以在每条路径上都有 $X = d$。原程序在 $u$ 处读到的，是所走路径上最后一个定值赋的值；重命名后的程序读的是 $d$ 的版本，出自同一个定值。φ 函数转发的是实际走过的那个前驱的版本，而那又是在走到该前驱末尾这条路径上的最后一个定值。沿执行归纳即得：两个程序中读出的每个变量都有相同的值。
:::

Cytron、Ferrante、Rosen、Wegman 与 Zadeck（1991 年）还证明：$\mathrm{DF}^+$ 恰是 $v$ 的两个不同定值首次相遇的那些块的集合，因此最简 SSA 在那个意义上没有多余的 φ（它们仍可能是死的）；他们还观察到，实践中 φ 的个数随程序规模线性增长，尽管刻意构造的例子里可能出现 $\Theta(N^2)$ 个 φ。

## 使用 SSA 与离开 SSA

生产级编译器都围绕 SSA 构建。LLVM IR 自始至终都是 SSA 形式（对寄存器而言；内存则不是）；GCC 的 GIMPLE 在流水线很早的阶段就转成 SSA（[[compilers/compiler-structure]] 提到的 `tree-ssa` 通道）；HotSpot、V8 与 Go 编译器的 IR 亦然。Clang 自己不构造 SSA：它把每个局部变量都发成一个带读写（load/store）的栈槽（`alloca`），再由 LLVM 的 `mem2reg` 通道恰用上面那套支配边界构造，把栈槽提升为 SSA 寄存器。

::: example LLVM 如何改造欧几里得算法 {#ex-llvm-gcd}
用 Clang 21.1 以 `-O0` 编译带 [[#ex-gcd-cfg]] 那个循环的 C 函数 `long gcd(long a, long b)`，然后只跑 LLVM 的 `mem2reg` 通道：

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

结构就是我们的那套：一个跳到循环测试的入口，循环头（唯一的汇合点）处 `a` 与 `b` 的 φ 函数，循环体和出口。`mem2reg` 在重命名时顺手把复制也折叠掉了——`a = b` 变成了 φ 的运算对象 `%b.addr.0`；变量 `t` 彻底消失，它的值 `%rem` 径直流入 `b` 的 φ。在这个通道之前（不带 `-disable-O0-optnone`、按正常 `-O0` 构建时），同一个函数有三个 `alloca`、六次 load 和五次 store。这个选项的作用是不让 Clang 把函数标成 `optnone`——否则 `opt` 会直接跳过它。
:::
:::

我们自己的 SSA，在过了 [[#ex-copyprop]] 的复制传播通道之后，与 LLVM 的一模一样：`a_1 = φ(B0: a_0, L2: b_1)`，`b_1 = φ(B0: b_0, L2: t1_0)`。注意 $a_1$ 的 φ 读的是 $b_1$——*上一次迭代*的 `b` 的值——而 $b_1$ 正在被旁边那个 φ 重新定义。这之所以正确，只因为一个块开头的 φ 是同时求值的；而当 SSA 必须变回普通代码时——寄存器分配或指令输出之前都必须如此——这一点就有后果了。

::: warning φ 函数是并行复制
离开 SSA 的显然做法——把 $v = \varphi(B_1{:}\,v_1, \dots)$ 换成在每个前驱 $B_i$ 的末尾放一条复制 $v = v_i$——一旦这些复制一条接一条地执行就错了。看一个交换两个变量的循环 `let t = a; a = b; b = t;`。复制传播之后，它的 SSA 中有 `a_1 = φ(B0: 1, L2: b_1)` 和 `b_1 = φ(B0: 2, L2: a_1)`：每轮迭代，`a` 得到旧的 `b`，`b` 得到旧的 `a`。朴素的翻译把 `a_1 = b_1; b_1 = a_1` 放在循环体末尾，第二条复制读到的却是*新的* `a_1`。我们的解释器显出了差别：交换函数在 $n = 0, 1, 2, 3$ 下，转换前和 SSA 中都返回 $12, 21, 12, 21$，朴素转换后却返回 $12, 22, 22, 22$——`a` 的初值丢了。正确的翻译会小心地把每个块的那组并行复制顺序化：用一个临时变量打破 $a \leftrightarrow b$ 这类环（**交换问题**），并劈开**关键边**（从一个有多个后继的块指向一个有多个前驱的块），好让只属于某一条边的复制有处安放（**复制丢失问题**）。Briggs、Cooper、Harvey 与 Simpson 在 1998 年描述了这两个问题。
:::

::: history
三地址代码与四元式可追溯到最早的优化编译器；Frances Allen 的 "Control flow analysis"（1970 年）以及她在 IBM 与 John Cocke 的合作，把控制流图及其分析放到了优化的正中央；Reese Prosser 在 1959 年为流程图引入了支配。Edward Lowry 与 C. W. Medlock 在 FORTRAN H 编译器（1969 年）中用上了支配者。Thomas Lengauer 与 Robert Tarjan 在 1979 年发表了他们的快速支配者算法。静态单赋值形式由 Barry Rosen、Mark Wegman 与 Kenneth Zadeck 于 1988 年在 IBM 提出（Bowen Alpern 参与了数值编号部分），而 Ron Cytron、Jeanne Ferrante、Rosen、Wegman 与 Zadeck 的 "Efficiently computing static single assignment form and the control dependence graph"（*ACM TOPLAS*，1991 年）给出了这里使用的支配边界构造。Keith Cooper、Timothy Harvey 与 Ken Kennedy 的 "A simple, fast dominance algorithm"（2001 年）给出了我们采用的边界计算。Chris Lattner 与 Vikram Adve 把 LLVM（2004 年）建在 SSA IR 之上；GCC 在 2005 年的 4.0 版中采纳了 SSA（Tree SSA，出自 Diego Novillo 等人）。
:::

## 后续内容

[[compilers/dataflow-optimisation]] 分析这些控制流图——在格上以不动点方式做活跃性、到达定值与可用表达式分析——并利用这些结果，连同 SSA，来传播常量与复制、消除无用与冗余代码、把代码移出循环。[[compilers/code-generation]] 把优化后的 IR 翻译成 x86-64 指令，并利用活跃性构造干涉图，把它那取之不竭的变量分配到 16 个寄存器。

::: summary
- **三地址代码**（[[#def-tac]]）每条指令一次运算，中间值用有名字的临时变量，跳转是显式的；条件按**跳出代码**下降，由此实现短路的 `&&` 与 `||`。
- **基本块**是从顶上进入、从底下离开的直线代码；**控制流图**（[[#def-cfg]]）按可能的控制转移把各块连起来。
- $d$ **支配** $n$，若从入口到 $n$ 的每条路径都经过 $d$（[[#def-dom]]）；支配者构成一条链，从而给出**支配树**（[[#lem-dom-chain]]），并是 $\mathrm{Dom}(n) = \set{n} \cup \bigcap_p \mathrm{Dom}(p)$ 的最大不动点（[[#thm-dom-iter]]）。
- **SSA 形式**（[[#def-ssa]]）下每个变量只有一个定值；汇合点处的 **φ 函数**按来路选择版本，且一齐完成。
- φ 函数放在每个变量各定值的**迭代支配边界**上（[[#def-df]]、[[#alg-ssa]]）；随后沿支配树重命名，就使每处使用得到它唯一的到达定值（[[#thm-ssa]]）。半修剪 SSA 把 Collatz 的例子从 11 个 φ 砍到 3 个。
- 离开 SSA 时必须把每个块的 φ 当作**并行复制**；朴素的顺序复制会破坏交换。
:::

## 习题

::: exercise 入口语句与块 {level=1 check="4"}
下面的三地址代码有几个基本块？（填入数字。）

```text
    i = 0
L1: if i >= n goto L3 else L2
L2: s = s + i
    i = i + 1
    goto L1
L3: return s
```
::: solution
入口语句：第一条指令（`i = 0`），带标号的指令 `L1`、`L2` 和 `L3`。块：$\set{i = 0}$（它顺序下落到 $L_1$）、$L_1$、$L_2$（三条指令）、$L_3$：共四个块，边为 $B_0 \to L_1$、$L_1 \to L_2$、$L_1 \to L_3$ 和 $L_2 \to L_1$。
:::
:::

::: exercise 跳出代码 {level=1}
写出 `cond` 对 `if a < b || c == 0 && !d { x = 1; }`（`d` 是布尔变量）产生的三地址代码，then 部分标为 $L_t$，`if` 之后的代码标为 $L_e$。当 $a < b$ 时执行了几条分支指令？
::: solution
`&&` 比 `||` 结合更紧，所以条件是 `a < b || (c == 0 && !d)`。以 $M_1$ 为 `||` 右运算对象的标号、$M_2$ 为 `&&` 右运算对象的标号：

```text
    if a < b goto Lt else M1
M1: if c == 0 goto M2 else Le
M2: if d != 0 goto Le else Lt      # !d：对调两个目标
Lt: x = 1
    goto Le
Le: ...
```

当 $a < b$ 时，第一条分支径直跳到 $L_t$：只执行一条分支，`c == 0` 与 `!d` 根本不被求值——短路求值，不花分毫。
:::
:::

::: exercise 支配边界 {level=1}
对这样一个控制流图：块为 $A$（入口）、$B$、$C$、$D$、$E$、$F$，边为 $A \to B$、$B \to C$、$B \to D$、$C \to E$、$D \to E$、$E \to B$、$E \to F$（一个含 `if` 的循环 $B \ldots E$）。计算每个块的直接支配者与支配边界。若变量 $x$ 只在 $C$ 中赋值（且它是在 $A$ 中定义的形参），最简 SSA 把 $x$ 的 φ 函数放在哪里？
::: solution
直接支配者：$B$ 的是 $A$；$C$、$D$、$E$ 的是 $B$（$E$ 经 $C$ 或 $D$ 到达，所以只有 $B$ 支配它）；$F$ 的是 $E$。边界：$\mathrm{DF}(C) = \mathrm{DF}(D) = \set{E}$（$C$ 支配自身——$E$ 的一个前驱，却不像 $E$ 那样支配 $E$）；$\mathrm{DF}(E) = \set{B}$（$E$ 是 $B$ 的前驱，且不支配 $B$）；$\mathrm{DF}(B) = \set{B}$（经由回边 $E \to B$）；$\mathrm{DF}(A) = \mathrm{DF}(F) = \emptyset$。对 $\mathrm{Defs} = \set{A, C}$ 的 $x$：$\mathrm{DF}(C) = \set{E}$，接着 $\mathrm{DF}(E) = \set{B}$，接着 $\mathrm{DF}(B) = \set{B}$：φ 放在 $E$ 和 $B$。在这个控制流图上运行 `to_ssa`（以 $x$ 为形参，最简 SSA）得到 $B$ 中的 `x_1 = φ(A: x_0, E: x_3)` 和 $E$ 中的 `x_3 = φ(C: x_2, D: x_1)`。
:::
:::

::: exercise 数 φ 函数 {level=2 check="2"}
把 `gcd`（如 [[#ex-gcd-cfg]] 那样）下降，并转换成半修剪 SSA。放置了多少个 φ 函数？（填入数字。）最简 SSA 放置多少个，差别是为什么？
::: solution
半修剪 SSA 放置 $2$ 个：循环头 $L_1$ 处的 `a_1` 和 `b_1`。最简 SSA 放置 $4$ 个：还为 `t` 和 `t1` 放 φ 函数，它们在 $L_2$ 中被赋值（$L_2$ 的边界是 $\set{L_1}$），却只在赋值之后于 $L_2$ 内部被使用，所以多出的 φ 是死的，其来自 $B_0$ 的运算对象是 `undef`。程序会报告这两个数目。
:::
:::

::: exercise 用迭代求支配者 {level=2}
用控制流图 $r \to a$、$a \to b$、$b \to a$、$a \to c$ 说明方程 [[#eq-dom]] 可以有多于一个解，并说明从满集出发的迭代找到的是最大的解。若改从 $\mathrm{Dom}(n) = \set{n}$ 出发迭代，会发生什么？
::: solution
真实的支配者集：$\mathrm{Dom}(a) = \set{r, a}$，$\mathrm{Dom}(b) = \set{r, a, b}$，$\mathrm{Dom}(c) = \set{r, a, c}$。另一个解：$\mathrm{Dom}(a) = \set{a}$？那将要求 $\set{a} = \set{a} \cup (\mathrm{Dom}(r) \cap \mathrm{Dom}(b)) = \set{a} \cup (\set{r} \cap \mathrm{Dom}(b))$，迫使 $r \notin \mathrm{Dom}(b)$；于是 $\mathrm{Dom}(b) = \set{b} \cup \mathrm{Dom}(a) = \set{a, b}$，自洽。还有 $\mathrm{Dom}(c) = \set{a, c}$。所以 $\set{a}, \set{a, b}, \set{a, c}$ 是第二个解（错的：它声称 $r$ 不支配 $a$）。从满集出发的迭代保住每个真实的支配者（[[#thm-dom-iter]]），最终停在最大的解，也就是真解上。若从单点集出发，对 $a$ 的更新给出 $\set{a} \cup (\set{r} \cap \set{b}) = \set{a}$，接着 $b$ 与 $c$ 增长到 $\set{a, b}$ 和 $\set{a, c}$，迭代便停在第二个、错误的解上——因为正确答案是*最大*不动点，而从下方往上迭代找到的是最小的那个。
:::
:::

::: exercise 并行复制 {level=2}
在循环体末尾，SSA 的解除必须执行并行复制 $(a, b, c) \gets (b, c, a)$。给出一个至多用一个额外临时变量的普通复制序列来实现它们，并描述对任意一组 $x_i$ 互不相同的并行复制 $(x_1, \dots, x_k) \gets (y_1, \dots, y_k)$ 的一般算法。
::: solution
$t = a$；$a = b$；$b = c$；$c = t$。一般方法：为每条复制在图中连一条边 $y_i \to x_i$（每个 $x_i$ 恰有一条入边）。反复输出一条这样的复制 $x_i = y_i$：它的目标 $x_i$ 不是任何剩余复制的源（此时覆盖它是安全的：没有人还需要它的旧值），并把它删去。当这样的复制不存在时，剩下的复制构成若干个互不相交的环；打破其中一个环：把环里的一个变量存入临时变量（$t = x_j$），把 $x_j$ 作为源的地方改用 $t$，然后继续。每个环花费一条额外复制；无环的链不花费。（$x = x$ 这样的复制直接丢掉。）
:::
:::

::: exercise SSA 中的复制传播 {level=3 #ex-copyprop}
(a) 写一个函数 `copy_propagate(params, blocks)`，从一个 SSA 程序中删除每条复制 `x = y`，并把 `x` 的每处使用（包括 φ 的运算对象）换成 `y`，沿 `x = y`、`y = z` 这样的链一路替换。(b) 利用 [[#thm-ssa]] 证明它保持程序的行为不变。(c) 为什么同样的变换用在非 SSA 代码上会是错的？
::: solution
(a)

```python
def copy_propagate(params, blocks):
    """在 SSA 中，x = y（y 是名字或常量）可把 x 的每次使用都变成 y。"""
    sub = {i[1]: i[2] for ins in blocks.values() for i in ins if i[0] == "="}
    def r(x):
        while isinstance(x, str) and x in sub: x = sub[x]
        return x
    new = {}
    for b, ins in blocks.items():
        out = []
        for i in ins:
            if i[0] == "=": continue                          # 复制消失
            if i[0] == "phi": out.append(("phi", i[1], {p: r(v) for p, v in i[2].items()}))
            elif i[0] == "op": out.append(i[:3] + (r(i[3]), r(i[4])))
            elif i[0] == "br": out.append(i[:2] + (r(i[2]), r(i[3])) + i[4:])
            elif i[0] == "ret": out.append(("ret", r(i[1])))
            elif i[0] == "call": out.append(i[:3] + ([r(x) for x in i[3]],))
            else: out.append(i)
        new[b] = out
    return params, new
```

对 `gcd` 它产出的正是 LLVM 的形式；七个测试程序之后都给出相同的输出。

(b) 在 SSA 中，`x = y` 是 `x` 的唯一一次定值，所以凡 `x` 被使用之处，读到的值就是这条复制赋给它的值（由 [[#thm-ssa]]，在每条路径上 `x` 的最后一个定值都是这一条），也就是复制发生时 `y` 的值。而 `y` 同样只有一个支配这条复制的定值，该定值之后 `y` 再不改变；于是在 `x` 的任何后续使用处，`y` 仍持有同一个值——前提是该使用被 `y` 的定值所支配，而这一点成立，因为它被这条复制支配，而这条复制被 `y` 的定值支配。（对 φ 的运算对象来说，"使用"发生在前驱的末尾，同一论证同样覆盖。）链的情形归纳即得。

(c) 没有单赋值性质时，`y` 可能在复制与 `x` 的某处使用之间被重新赋值（`x = y; y = 5; print(x)`），或者 `x` 在某条路径上还有另一个定值，于是把 `x` 换成 `y` 会改变读到的值。非 SSA 的复制传播需要数据流分析来证明这两种情形都不发生（[[compilers/dataflow-optimisation]]）。
:::
:::

::: exercise 由支配者求循环 {level=3}
**回边**是满足"$h$ 支配 $n$"的边 $n \to h$；该回边的**自然循环**由 $h$ 以及所有能不经过 $h$ 而到达 $n$ 的块组成。(a) 给出一个计算回边的自然循环的算法，并把它用在 Collatz 的控制流图上。(b) 证明循环头 $h$ 支配它的自然循环的每个块。(c) 说明为什么测验里那个控制流图有圈却没有回边，而 Mini 程序永远产生不出这样的控制流图。
::: solution
(a) 从 $\mathit{loop} = \set{h, n}$ 和工作表 $[n]$ 开始（若 $n \ne h$）。弹出一个块 $m$；对 $m$ 的每个不在 $\mathit{loop}$ 中的前驱 $p$，把它加入集合并压入工作表。由于 $h$ 从一开始就在集合里，搜索永远不会越过 $h$。对 Collatz，回边是 $L_6 \to L_1$（$L_1$ 支配 $L_6$）。从 $L_6$ 出发：前驱 $L_4$、$L_5$；从它们到 $L_2$；从 $L_2$ 到 $L_1$——已在集合中。循环：$\set{L_1, L_2, L_4, L_5, L_6}$；出口 $L_3$ 和入口 $B_0$ 在外面。

(b) 设 $m$ 在循环中，$m \ne h$：存在一条从 $m$ 到 $n$ 而避开 $h$ 的路径。假设有一条从入口到 $m$ 的路径 $P$ 避开了 $h$。那么 $P$ 接上从 $m$ 到 $n$ 的那条路径，就是一条从入口到 $n$ 避开 $h$ 的路径，与 $h \mathrel{\mathrm{dom}} n$ 矛盾。所以 $h$ 支配 $m$。

(c) 圈 $B \to D \to B$ 有两个入口：从 $A$ 进 $B$，从 $C$ 进 $D$，所以 $B$ 与 $D$ 互不支配（[[#ex-collatz-dom]] 之后的测验）：圈上没有一条边是回边。这样的**不可归约**控制流图出自跳进循环中段的 `goto`。Mini 只有结构化控制流：每个圈都来自一个 `while`，其测试块从外面只能经由它前面那条跳转进入，而通往循环体的每条路径都经过测试，所以测试支配整个循环，回到它的边就是回边。结构化程序的控制流图总是**可归约**的。
:::
:::
