在 [[programming-languages/syntax-semantics]] 中，我们生成了小语言 NB 深度不超过 $3$ 的全部 $59\,439$ 个项，并发现其中 $45\,369$ 个——四分之三——会**卡住**：求值到达某个如 $\mathsf{succ}\ \mathsf{true}$ 这样没有任何规则可适用的项，这正是运行时类型错误的形式模型。真实实现要么崩溃、要么抛出异常，要么在一门不安全的语言里算出垃圾。我们希望在运行程序*之前*就知道这不可能发生。

**类型系统**是一种句法方法，它按短语所计算的值的种类给短语分类，以此证明某些行为不会发生（这个定义出自皮尔斯（Pierce））。它用只观察程序文本、从不运行程序的规则给项指派类型，并且其设计恰好使一条定理成立：*良类型程序不会卡住*。本章两次建立这条定理：先对带有类型 $\mathsf{Bool}$ 与 $\mathsf{Nat}$ 的 NB，再对**简单类型 λ-演算**——每种带类型函数式语言的核心。证明的方法——**进展性**加上**保持性**——对每种安全性被证明过的语言都是标准方法，从 Standard ML 到 WebAssembly，再到 Rust 的安全子集。沿途我们还会用 Python 实现两个类型检查器，考察类型系统做不到什么，并认识类型与逻辑命题之间那惊人的对应关系。

## 给语言 NB 类型化

类型给值分类：NB 有布尔值和数，所以它有两个类型。

::: definition NB 的类型关系 {#def-typing-nb}
NB 的**类型**是 $T ::= \mathsf{Bool} \mid \mathsf{Nat}$。**类型关系** $t : T$（「$t$ 具有类型 $T$」）是对下列规则封闭的最小关系：

$$
\begin{gathered}
\frac{}{\mathsf{true} : \mathsf{Bool}}\ \text{(T-True)}
\qquad
\frac{}{\mathsf{false} : \mathsf{Bool}}\ \text{(T-False)}
\qquad
\frac{t_1 : \mathsf{Bool} \quad t_2 : T \quad t_3 : T}{\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 : T}\ \text{(T-If)}
\\[1.2em]
\frac{}{\mathsf{0} : \mathsf{Nat}}\ \text{(T-Zero)}
\qquad
\frac{t_1 : \mathsf{Nat}}{\mathsf{succ}\ t_1 : \mathsf{Nat}}\ \text{(T-Succ)}
\qquad
\frac{t_1 : \mathsf{Nat}}{\mathsf{pred}\ t_1 : \mathsf{Nat}}\ \text{(T-Pred)}
\qquad
\frac{t_1 : \mathsf{Nat}}{\mathsf{iszero}\ t_1 : \mathsf{Bool}}\ \text{(T-IsZero)}
\end{gathered}
$$

若对某个 $T$ 有 $t : T$，则称项 $t$ **良类型**（或**可类型化**）。
:::

规则 T-If 是类型系统表明立场的地方：两个分支必须有*相同*的类型，因为检查器无法知道将运行哪个分支。于是 $\mathsf{if}\ \mathsf{true}\ \mathsf{then}\ \mathsf{0}\ \mathsf{else}\ \mathsf{false}$ 被拒绝，尽管它求值为 $\mathsf{0}$ 而毫无麻烦。每种静态类型系统都会拒绝某些无害的程序；莱斯（Rice）定理告诉我们，只要它是可判定的并且排除所有卡住的程序，就必须如此（[[program-design/types-interfaces#prop-no-perfect-checker]]）。

类型检查器把规则反过来读。对项的每种形式，最后一步恰有一条规则可能用到，所以检查是一次计算类型的结构递归：

```python
class TypeError_(Exception): pass
BOOL, NAT = "Bool", "Nat"

def typeof(t):
    match t:
        case Tru() | Fls(): return BOOL
        case Zero(): return NAT
        case Succ(u) | Pred(u):
            if typeof(u) != NAT: raise TypeError_(f"argument of {type(t).__name__} is not Nat")
            return NAT
        case IsZero(u):
            if typeof(u) != NAT: raise TypeError_("argument of iszero is not Nat")
            return BOOL
        case If(c, a, b):
            if typeof(c) != BOOL: raise TypeError_("guard of if is not Bool")
            ta, tb = typeof(a), typeof(b)
            if ta != tb: raise TypeError_(f"branches have types {ta} and {tb}")
            return ta
```

这种反读由一条引理保证，下面的每个证明都会用到它。

::: lemma 类型关系的可逆性 {#lem-inversion-nb}
1. 若 $\mathsf{true} : R$ 或 $\mathsf{false} : R$，则 $R = \mathsf{Bool}$。
2. 若 $\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 : R$，则 $t_1 : \mathsf{Bool}$、$t_2 : R$ 且 $t_3 : R$。
3. 若 $\mathsf{0} : R$，则 $R = \mathsf{Nat}$。
4. 若 $\mathsf{succ}\ t_1 : R$ 或 $\mathsf{pred}\ t_1 : R$，则 $R = \mathsf{Nat}$ 且 $t_1 : \mathsf{Nat}$。
5. 若 $\mathsf{iszero}\ t_1 : R$，则 $R = \mathsf{Bool}$ 且 $t_1 : \mathsf{Nat}$。
:::

::: proof
每条类型规则的结论都对应项的一种不同的句法形式，所以 $t : R$ 的推导必然以 $t$ 的形式所对应的那条唯一规则结尾，其前提正如所说。（例如，结论是 $\mathsf{if}$ 的规则只有 T-If。）
:::

::: theorem 类型的唯一性 {#thm-unique-nb}
每个 NB 项至多有一个类型；若它有类型，则其推导也唯一。
:::

::: proof
对 $t$ 作结构归纳，使用 [[#lem-inversion-nb]]：最后一条规则由 $t$ 的形式决定，前提中的项也随之确定；由归纳假设，前提的类型与推导唯一，于是该规则又决定了 $t$ 的类型（对 T-If，即分支的公共类型）。
:::

::: example 一个类型推导 {#ex-derivation-nb}
推导 $\mathsf{if}\ \mathsf{iszero}\,(\mathsf{pred}\ \mathsf{0})\ \mathsf{then}\ \mathsf{succ}\ \mathsf{0}\ \mathsf{else}\ \mathsf{0}$ 的类型，并说明 $\mathsf{iszero}\,(\mathsf{if}\ \mathsf{false}\ \mathsf{then}\ \mathsf{true}\ \mathsf{else}\ \mathsf{0})$ 没有类型。
::: solution
$$
\cfrac{\cfrac{\cfrac{\cfrac{}{\mathsf{0} : \mathsf{Nat}}}{\mathsf{pred}\ \mathsf{0} : \mathsf{Nat}}}{\mathsf{iszero}\,(\mathsf{pred}\ \mathsf{0}) : \mathsf{Bool}} \qquad \cfrac{\cfrac{}{\mathsf{0} : \mathsf{Nat}}}{\mathsf{succ}\ \mathsf{0} : \mathsf{Nat}} \qquad \cfrac{}{\mathsf{0} : \mathsf{Nat}}}{\mathsf{if}\ \mathsf{iszero}\,(\mathsf{pred}\ \mathsf{0})\ \mathsf{then}\ \mathsf{succ}\ \mathsf{0}\ \mathsf{else}\ \mathsf{0} : \mathsf{Nat}}
$$

所用规则从叶到根：T-Zero、T-Pred、T-IsZero；T-Zero、T-Succ；T-Zero；根处是 T-If。对第二个项，设它有类型。由可逆性（第 5 条），$\mathsf{iszero}$ 的实参应有类型 $\mathsf{Nat}$；由第 2 条，那个 $\mathsf{if}$ 的两个分支都应有类型 $\mathsf{Nat}$；但由第 1 条，$\mathsf{true}$ 只有类型 $\mathsf{Bool}$。矛盾。该项是非良类型的，尽管它求值为 $\mathsf{false}$：类型检查器不知道条件是 $\mathsf{false}$。
:::
:::

### 安全性：进展性与保持性

安全性定理由两半组成。**进展性**（Progress）：良类型项不会卡住——它要么是值，要么能走一步。**保持性**（Preservation）：良类型项走一步，结果仍良类型（且类型相同）。合起来它们说：良类型项无论走多少步都绝不可能到达卡住的状态，因为每一步都落在另一个良类型项上，而由进展性它不卡住。首先要知道每种类型的值长什么样。

::: lemma NB 的标准形式 {#lem-canonical-nb}
若 $v$ 是值且 $v : \mathsf{Bool}$，则 $v$ 是 $\mathsf{true}$ 或 $\mathsf{false}$。若 $v$ 是值且 $v : \mathsf{Nat}$，则 $v$ 是数值 $nv$。
:::

::: proof
值是 $\mathsf{true}$、$\mathsf{false}$ 与数值 $\mathsf{0}$、$\mathsf{succ}\ nv$（[[programming-languages/syntax-semantics#def-values]]）。由可逆性，$\mathsf{0}$ 与 $\mathsf{succ}\ nv$ 只有类型 $\mathsf{Nat}$，$\mathsf{true}$ 与 $\mathsf{false}$ 只有类型 $\mathsf{Bool}$。
:::

::: theorem NB 的进展性 {#thm-progress-nb}
若 $t : T$，则 $t$ 是值，或存在 $t'$ 使 $t \to t'$。
:::

::: proof
对 $t : T$ 的推导归纳。T-True、T-False 与 T-Zero 情形立即可得：$t$ 是值。

*T-If：* $t = \mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$，且 $t_1 : \mathsf{Bool}$。由归纳假设，$t_1$ 是值或能走一步。若它是值，由 [[#lem-canonical-nb]] 它是 $\mathsf{true}$ 或 $\mathsf{false}$，于是 E-IfTrue 或 E-IfFalse 可用于 $t$。若 $t_1 \to t_1'$，则 E-If 给出 $t \to \mathsf{if}\ t_1'\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$。

*T-Succ：* $t = \mathsf{succ}\ t_1$，且 $t_1 : \mathsf{Nat}$。若 $t_1$ 是值，由标准形式它是数值 $nv$，于是 $t = \mathsf{succ}\ nv$ 本身就是值。否则 $t_1 \to t_1'$，E-Succ 可用。

*T-Pred：* $t = \mathsf{pred}\ t_1$，且 $t_1 : \mathsf{Nat}$。若 $t_1$ 是值，由标准形式它是 $\mathsf{0}$ 或 $\mathsf{succ}\ nv$，于是 E-PredZero 或 E-PredSucc 可用。否则 E-Pred 可用。

*T-IsZero：* 与 T-Pred 相同，改用 E-IsZeroZero、E-IsZeroSucc 与 E-IsZero。
:::

::: theorem NB 的保持性 {#thm-preservation-nb}
若 $t : T$ 且 $t \to t'$，则 $t' : T$。
:::

::: proof
对 $t : T$ 的推导归纳，每一情形都检查求值所采用的那条规则。

*T-True、T-False、T-Zero：* $t$ 是值，不能走步（[[programming-languages/syntax-semantics#lem-values-normal]]），故此情形空真。

*T-If：* $t = \mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$，且 $t_1 : \mathsf{Bool}$、$t_2 : T$、$t_3 : T$。三条求值规则的左端是 $\mathsf{if}$。E-IfTrue：$t' = t_2$，由假设它有类型 $T$；E-IfFalse 对称。E-If：$t_1 \to t_1'$，把归纳假设用于 $t_1 : \mathsf{Bool}$ 的子推导得 $t_1' : \mathsf{Bool}$；于是 T-If 给出 $\mathsf{if}\ t_1'\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 : T$。

*T-Succ：* $t = \mathsf{succ}\ t_1$，$T = \mathsf{Nat}$，$t_1 : \mathsf{Nat}$。唯一的步是 E-Succ，$t_1 \to t_1'$；由归纳假设 $t_1' : \mathsf{Nat}$，T-Succ 给出 $t' : \mathsf{Nat}$。

*T-Pred：* $t = \mathsf{pred}\ t_1$，$T = \mathsf{Nat}$。E-PredZero：$t' = \mathsf{0} : \mathsf{Nat}$。E-PredSucc：$t_1 = \mathsf{succ}\ nv_1$ 且 $t' = nv_1$；由 $\mathsf{succ}\ nv_1 : \mathsf{Nat}$ 的可逆性，$nv_1 : \mathsf{Nat}$。E-Pred：由归纳假设与 T-Pred。

*T-IsZero：* $T = \mathsf{Bool}$。E-IsZeroZero 与 E-IsZeroSucc 给出 $\mathsf{true}$ 或 $\mathsf{false}$，类型为 $\mathsf{Bool}$；E-IsZero 由归纳假设与 T-IsZero 处理。
:::

::: corollary NB 的安全性 {#cor-safety-nb}
若 $t : T$ 且 $t \to^* t'$，其中 $t'$ 处于范式，则 $t'$ 是具有类型 $T$ 的值。特别地，良类型的 NB 项从不卡住，而类型 $\mathsf{Bool}$ 的项求值为 $\mathsf{true}$ 或 $\mathsf{false}$。
:::

::: proof
对步数归纳，保持性给出 $t' : T$。由进展性，$t'$ 是值或能走步；它是范式，所以是值。标准形式给出最后一句。
:::

::: example 用穷举检验定理 {#ex-brute-typed}
对每个深度不超过 $3$ 的 NB 项检验进展性与保持性，并统计良类型项的个数，以及虽非良类型却仍求值为值的项的个数。
::: solution
```python
ts = terms(2)                                   # the 59439 terms of depth <= 3
typed = [t for t in ts if well_typed(t)]
steps = 0
for t in typed:
    T = typeof(t)
    for u in trace(t):
        assert typeof(u) == T                   # 保持性
        if not is_value(u):
            step(u)                             # 进展性：若卡住则抛 NoRule
            steps += 1
print(len(ts), "terms,", len(typed), "well typed; checked", steps, "steps")
ok = [t for t in ts if not well_typed(t) and is_value(list(trace(t))[-1])]
print(len(ok), "ill-typed terms evaluate to a value anyway")
```

```console
59439 terms, 1624 well typed; checked 4193 steps
12446 ill-typed terms evaluate to a value anyway
```

没有一个断言失败，`step` 也从不抛出异常。只有 $1624$ 个项（不到 $3\%$）是良类型的，而它们的求值总共走了 $4193$ 步，每一步都被检查过。在求值为值的 $14\,070$ 个项中，有 $12\,446$ 个被拒绝——例如 $\mathsf{if}\ \mathsf{true}\ \mathsf{then}\ \mathsf{true}\ \mathsf{else}\ \mathsf{0}$。这就是可判定的保守检查器付出的代价。（手工数一遍良类型项是一道习题。）
:::
:::

## 简单类型 λ-演算

现在加上函数。无类型 λ-演算里有 $\lambda x.\,x\ x$ 这样不存在合理类型的项，也有 $\mathsf{succ}\,(\lambda x.\,x)$ 这样会卡住的项。**简单类型 λ-演算**（STLC）给每个约束词加上类型标注，并加上一个函数类型构造子。

::: definition 简单类型 λ-演算 {#def-stlc}
类型与项为

$$
T ::= \mathsf{Bool} \mid \mathsf{Nat} \mid T \to T
\qquad\qquad
t ::= x \mid \lambda x{:}T.\,t \mid t\ t \mid \mathsf{true} \mid \mathsf{false} \mid \mathsf{if}\ t\ \mathsf{then}\ t\ \mathsf{else}\ t \mid \mathsf{0} \mid \mathsf{succ}\ t \mid \mathsf{pred}\ t \mid \mathsf{iszero}\ t.
$$

箭头右结合：$\mathsf{Nat} \to \mathsf{Nat} \to \mathsf{Nat}$ 就是 $\mathsf{Nat} \to (\mathsf{Nat} \to \mathsf{Nat})$，即柯里化二元函数的类型。值为 $v ::= \lambda x{:}T.\,t \mid \mathsf{true} \mid \mathsf{false} \mid nv$。求值采用按值调用：

$$
\frac{t_1 \to t_1'}{t_1\ t_2 \to t_1'\ t_2}\ \text{(E-App1)}
\qquad
\frac{t_2 \to t_2'}{v_1\ t_2 \to v_1\ t_2'}\ \text{(E-App2)}
\qquad
\frac{}{(\lambda x{:}T.\,t)\ v \to t[x := v]}\ \text{(E-AppAbs)}
$$

再加上 NB 的那些规则。**类型上下文** $\Gamma$ 是由互不相同的变元及其类型组成的有穷序列 $x_1{:}T_1, \ldots, x_n{:}T_n$；用 $\Gamma, x{:}T$ 表示它的扩张（必要时先把 $x$ 改名），用 $x{:}T \in \Gamma$ 表示属于。**类型判断** $\Gamma \vdash t : T$ 由 NB 的规则（每个判断前都加上 $\Gamma \vdash$）以及

$$
\frac{x{:}T \in \Gamma}{\Gamma \vdash x : T}\ \text{(T-Var)}
\qquad
\frac{\Gamma, x{:}T_1 \vdash t : T_2}{\Gamma \vdash \lambda x{:}T_1.\,t : T_1 \to T_2}\ \text{(T-Abs)}
\qquad
\frac{\Gamma \vdash t_1 : T_{11} \to T_{12} \quad \Gamma \vdash t_2 : T_{11}}{\Gamma \vdash t_1\ t_2 : T_{12}}\ \text{(T-App)}
$$
:::

上下文记录着关于自由变元的假设。T-Abs 说：要证明一个函数具有类型 $T_1 \to T_2$，就假设它的形参具有类型 $T_1$，再证明体具有类型 $T_2$。T-App 说：类型为 $T_{11} \to T_{12}$ 的函数只能应用于类型 $T_{11}$ 的实参。约束词上的标注使检查成为简单的递归——检查器从不需要猜测形参的类型。（[[programming-languages/type-inference]] 去掉标注并把它们推断出来。）

```python
@dataclass(frozen=True)
class TBool: pass
@dataclass(frozen=True)
class TNat: pass
@dataclass(frozen=True)
class Arrow: dom: object; cod: object

def typeof(t, ctx):
    """t 在上下文 ctx（从名字到类型的字典）中的类型。"""
    match t:
        case Var(x):                                            # T-Var
            if x not in ctx: raise TypeError_(f"unbound variable {x}")
            return ctx[x]
        case Lam(x, T1, body):                                  # T-Abs
            return Arrow(T1, typeof(body, {**ctx, x: T1}))
        case App(f, a):                                         # T-App
            Tf, Ta = typeof(f, ctx), typeof(a, ctx)
            if not isinstance(Tf, Arrow):
                raise TypeError_(f"applying a non-function of type {show_ty(Tf)}")
            if Tf.dom != Ta:
                raise TypeError_(f"argument has type {show_ty(Ta)}, expected {show_ty(Tf.dom)}")
            return Tf.cod
        # ... Const、Op 与 If 的写法与 NB 相同
```

类型用 `!=` 比较，即冻结数据类的结构相等，所以两个箭头类型相等恰当它们的定义域与余域分别相等。

::: example 检查并运行一个带类型的程序 {#ex-twice}
检查 $\mathit{twice} = \lambda f{:}\mathsf{Nat} \to \mathsf{Nat}.\,\lambda x{:}\mathsf{Nat}.\,f\,(f\ x)$ 以及程序 $\mathit{twice}\ (\lambda n{:}\mathsf{Nat}.\,\mathsf{succ}\ n)\ \mathsf{0}$；求值该程序，每步之后都检查类型；再试四个非良类型的项。
::: solution
手工检查：在上下文 $\Gamma = f{:}\mathsf{Nat}\to\mathsf{Nat},\ x{:}\mathsf{Nat}$ 中，T-Var 与 T-App 给出 $f\ x : \mathsf{Nat}$，于是 $f\,(f\ x) : \mathsf{Nat}$；两次使用 T-Abs 得 $\mathit{twice} : (\mathsf{Nat}\to\mathsf{Nat}) \to \mathsf{Nat} \to \mathsf{Nat}$。该程序把它应用于一个 $\mathsf{Nat}\to\mathsf{Nat}$ 和一个 $\mathsf{Nat}$，所以它有类型 $\mathsf{Nat}$。

```python
N = TNat()
twice = Lam("f", Arrow(N, N), Lam("x", N, App(Var("f"), App(Var("f"), Var("x")))))
succ_f = Lam("n", N, Op("succ", Var("n")))
prog = App(App(twice, succ_f), Const(0))
print(show_ty(typeof(twice, {})), "|", show_ty(typeof(prog, {})))
t, T, n = prog, typeof(prog, {}), 0
while not is_value(t):
    t = step(t); n += 1
    assert typeof(t, {}) == T                 # 保持性，每一步
for bad in [App(Const(0), Const(True)), App(succ_f, Const(True)),
            Lam("x", N, App(Var("x"), Var("x"))), If(Const(True), Const(0), Const(False))]:
    try: typeof(bad, {})
    except TypeError_ as e: print("rejected:", e)
```

```console
(Nat -> Nat) -> Nat -> Nat | Nat
Op(op='succ', arg=Op(op='succ', arg=Const(value=0))) after 4 steps
rejected: applying a non-function of type Nat
rejected: argument has type Bool, expected Nat
rejected: applying a non-function of type Nat
rejected: branches: Nat vs Bool
```

四步依次是：把 $\mathit{succ\_f}$ 代入 $f$；把 $\mathsf{0}$ 代入 $x$，得 $\mathit{succ\_f}\,(\mathit{succ\_f}\ \mathsf{0})$；把内层调用求值为 $\mathsf{succ}\ \mathsf{0}$（E-App2 配 E-AppAbs）；再求外层调用，得到值 $\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})$。第三个被拒绝的项是自应用 $\lambda x{:}\mathsf{Nat}.\,x\ x$：当 $x : \mathsf{Nat}$ 时它不是函数。任何标注都救不了它，下面就来证明。
:::
:::

::: widget graph
nodes: root@2,3; app1@1,2; zero@3,2; tw@0.5,1; sf@1.5,1; absx@0.5,0; succn@1.5,0; ffx@0.5,-1
edges: root>app1; root>zero; app1>tw; app1>sf; tw>absx; absx>ffx; sf>succn
algorithm: dfs
start: root
caption: $\mathit{twice}\ \mathit{succ\_f}\ \mathsf{0} : \mathsf{Nat}$ 的类型推导的形状——每个顶点对应一次规则实例（$f\,(f\ x)$ 与 $\mathsf{succ}\ n$ 的叶被折叠进了 `ffx` 与 `succn`）。`root` 与 `app1` 是 T-App，`zero` 是 T-Zero，`tw`、`absx` 与 `sf` 是 T-Abs。这棵树与项的语法树同形，因为每种项的形式恰有一条类型规则——这正是检查器能写成一次结构递归的原因。运行深度优先搜索，看看 `typeof` 访问各子项的顺序。
:::

### 简单类型 λ-演算的安全性

证明的结构与 NB 的完全相同。可逆性与标准形式按显然的方式扩充：若 $\Gamma \vdash \lambda x{:}T_1.\,t : R$，则 $R = T_1 \to R_2$ 且 $\Gamma, x{:}T_1 \vdash t : R_2$；若 $\Gamma \vdash t_1\ t_2 : R$，则对某个 $T_{11}$ 有 $\Gamma \vdash t_1 : T_{11} \to R$ 且 $\Gamma \vdash t_2 : T_{11}$；若 $\Gamma \vdash x : R$，则 $x{:}R \in \Gamma$。还有**标准形式**：类型 $T_1 \to T_2$ 的值是一个抽象 $\lambda x{:}T_1.\,t$（因为 $\mathsf{true}$、$\mathsf{false}$ 与数值都是基类型）。类型的唯一性也照样扩充（习题）。

::: theorem STLC 的进展性 {#thm-progress}
若 $\varnothing \vdash t : T$（故 $t$ 是封闭的），则 $t$ 是值，或对某个 $t'$ 有 $t \to t'$。
:::

::: proof
对 $\varnothing \vdash t : T$ 的推导归纳。T-Var 不可能出现：上下文为空。T-Abs：$t$ 是值。NB 的规则完全按 [[#thm-progress-nb]] 处理。T-App：$t = t_1\ t_2$，且 $\varnothing \vdash t_1 : T_{11} \to T_{12}$、$\varnothing \vdash t_2 : T_{11}$。由归纳假设，$t_1$ 是值或能走步，$t_2$ 亦然。若 $t_1 \to t_1'$，E-App1 可用。若 $t_1$ 是值且 $t_2 \to t_2'$，E-App2 可用。若两者都是值，标准形式说 $t_1 = \lambda x{:}T_{11}.\,t_{12}$，于是 E-AppAbs 可用。
:::

进展性只对*封闭*项陈述：像 $x\ \mathsf{0}$ 这样的开放项是范式却不是值，这没有妨碍，因为运行中的程序是封闭的。保持性需要关于上下文的两个结构性引理和一个关于代入的引理——后者是证明的核心。

::: lemma 重排与弱化 {#lem-weakening}
若 $\Gamma \vdash t : T$ 且 $\Delta$ 是 $\Gamma$ 的一个重排，则 $\Delta \vdash t : T$。若 $\Gamma \vdash t : T$ 且 $x \notin \mathrm{dom}\,\Gamma$，则 $\Gamma, x{:}S \vdash t : T$，且推导的深度不变。
:::

::: proof
两者都对类型推导归纳。T-Var 只用到属于关系 $x{:}T \in \Gamma$，重排序列或添加一个不同的变元都不影响它。T-Abs 把约束变元添进上下文，我们可以把它（靠 α-等价）改名成与 $x$ 不同者；归纳假设用于前提。其余规则把上下文原封不动地传给各自的前提。
:::

::: lemma 代入保持类型 {#lem-substitution}
若 $\Gamma, x{:}S \vdash t : T$ 且 $\Gamma \vdash s : S$，则 $\Gamma \vdash t[x := s] : T$。
:::

::: proof
对 $\Gamma, x{:}S \vdash t : T$ 的推导归纳，并对最后一条规则分情形。

*T-Var，$t = z$。* 若 $z = x$，则 $T = S$ 且 $t[x := s] = s$，由假设它有类型 $S$。若 $z \ne x$，则 $t[x := s] = z$，而 $z{:}T \in \Gamma$，故 T-Var 给出 $\Gamma \vdash z : T$。

*T-Abs，$t = \lambda y{:}T_2.\,t_1$，$T = T_2 \to T_1$，且 $\Gamma, x{:}S, y{:}T_2 \vdash t_1 : T_1$。* 靠 α-转换可设 $y \ne x$ 且 $y \notin \mathrm{FV}(s)$，于是 $t[x := s] = \lambda y{:}T_2.\,t_1[x := s]$。由重排，$\Gamma, y{:}T_2, x{:}S \vdash t_1 : T_1$；由弱化，$\Gamma, y{:}T_2 \vdash s : S$。归纳假设（在上下文 $\Gamma, y{:}T_2$ 下使用）给出 $\Gamma, y{:}T_2 \vdash t_1[x := s] : T_1$，T-Abs 再给出 $\Gamma \vdash \lambda y{:}T_2.\,t_1[x := s] : T_2 \to T_1$。

*T-App，$t = t_1\ t_2$。* 前提是 $\Gamma, x{:}S \vdash t_1 : T_{11} \to T$ 与 $\Gamma, x{:}S \vdash t_2 : T_{11}$。由归纳假设，$\Gamma \vdash t_1[x := s] : T_{11} \to T$ 且 $\Gamma \vdash t_2[x := s] : T_{11}$，T-App 给出 $\Gamma \vdash (t_1\ t_2)[x := s] : T$。

*NB 的规则。* 常量在代入下不变并保持类型；其余规则对每个前提用归纳假设后重新套用该规则。
:::

::: theorem STLC 的保持性 {#thm-preservation}
若 $\Gamma \vdash t : T$ 且 $t \to t'$，则 $\Gamma \vdash t' : T$。
:::

::: proof
对 $\Gamma \vdash t : T$ 的推导归纳。T-Var 与 T-Abs：$t$ 是变元或值，不走步。NB 的规则：与 [[#thm-preservation-nb]] 相同，上下文一路带上。T-App：$t = t_1\ t_2$，$\Gamma \vdash t_1 : T_{11} \to T$，$\Gamma \vdash t_2 : T_{11}$。能走出这一步的规则有三条。

- E-App1，$t_1 \to t_1'$：由归纳假设 $\Gamma \vdash t_1' : T_{11} \to T$，T-App 给出 $\Gamma \vdash t_1'\ t_2 : T$。
- E-App2，$t_1$ 是值且 $t_2 \to t_2'$：对称。
- E-AppAbs：$t_1 = \lambda x{:}T_{11}.\,t_{12}$，$t_2 = v_2$ 且 $t' = t_{12}[x := v_2]$。由 T-Abs 的可逆性，$\Gamma, x{:}T_{11} \vdash t_{12} : T$。又 $\Gamma \vdash v_2 : T_{11}$，故 [[#lem-substitution]] 给出 $\Gamma \vdash t_{12}[x := v_2] : T$。
:::

::: corollary 类型安全性 {#cor-safety}
若 $\varnothing \vdash t : T$ 且 $t \to^* t'$，则 $t'$ 不卡住：它要么是类型 $T$ 的值，要么还能再走一步。
:::

::: proof
由保持性与对规约长度的归纳，$\varnothing \vdash t' : T$；由进展性，$t'$ 是值或能走步；标准形式指出值的形状。
:::

这就是米尔纳（Milner）的口号「良类型的程序不会出岔子」（well-typed programs cannot go wrong）的精确化。措辞的精确很重要：「出岔子」指的是*到达一个卡住的项*，即语义没有任何规则适用的状态。什么算卡住取决于语义，所以它是语言定义的一部分。

::: warning 「类型安全」不承诺什么
类型安全性恰恰只排除语义中的那些卡住状态，此外什么都不管。良类型的 Python、Java 或 OCaml 程序仍可能除以零、取空表的表头、数组下标越界、内存耗尽或永远循环。语言把这些定义为*已定义*的行为——语义里有一条规则抛出异常——于是它们不算卡住，安全性定理便说：异常是良类型程序仅有的失败方式。不安全的语言把这类状态留作未定义：在 C 中，读出数组末尾之外不是语义能处理的错误，而是语义根本未定义的行为，这就是 C 不可能有这种意义下的安全性定理的原因。还应注意，安全性是类型系统与语义这个*组合*的性质：改动其中任何一个，定理就得重新证明。
:::

::: quiz
设向 STLC 添加常量 $\mathsf{head} : \mathsf{List} \to \mathsf{Nat}$，求值规则为 $\mathsf{head}\,(\mathsf{cons}\ v\ l) \to v$，而 $\mathsf{head}\ \mathsf{nil}$ 没有任何规则。哪些说法是对的？
- [x] 进展性失效：$\mathsf{head}\ \mathsf{nil}$ 良类型且卡住。
- [ ] 保持性失效。
- [x] 添加规则 $\mathsf{head}\ \mathsf{nil} \to \mathsf{error}$，并把 $\mathsf{error}$ 视为最终结果，就恢复了 [[#cor-safety]] 意义下的安全性，读作「值、一步或 $\mathsf{error}$」。
- [ ] 唯一的补救是把 $\mathsf{head}$ 从语言中删掉。
::: solution
$\mathsf{head}\ \mathsf{nil}$ 有类型 $\mathsf{Nat}$ 却没有任何规则可用，而且不是值：进展性失效。仅有的那条规则把良类型的 $\mathsf{head}\,(\mathsf{cons}\ v\ l)$ 映到 $v : \mathsf{Nat}$，所以保持性成立。标准补救有两种：让失败成为一种已定义的结果（异常，如 OCaml 与 Haskell 的 `head`），这就削弱了保证；或者改进类型，使 $\mathsf{head}$ 只接受非空表（依赖类型，或如 Rust 的 `first()` 那样返回 `Option`）。
:::
:::

## 简单类型不能表达什么

### 没有自应用，以及终止性

::: theorem 自应用不可类型化 {#thm-no-self-app}
不存在上下文 $\Gamma$ 与类型 $T$ 使 $\Gamma \vdash x\ x : T$。因此，对任何标注 $S$，$\omega = \lambda x{:}S.\,x\ x$ 都不可类型化，[[programming-languages/lambda-calculus]] 中的 $\Omega$ 与不动点组合子 $Y$、$Z$ 亦然。
:::

::: proof
设 $\Gamma \vdash x\ x : T$。由 T-App 的可逆性，对某个 $T_{11}$ 有 $\Gamma \vdash x : T_{11} \to T$ 且 $\Gamma \vdash x : T_{11}$。由 T-Var 的可逆性，两者都是 $\Gamma$ 指派给 $x$ 的类型，故 $T_{11} = T_{11} \to T$。但类型是一棵有穷树，而 $T_{11} \to T$ 的结点数严格多于 $T_{11}$；没有有穷类型会等于把自身作为真部分包含进去的类型。任何以 $x\ x$（$x$ 为变元）为子项的项都同样不可类型化，因为良类型项的每个子项都是良类型的（由可逆性）。
:::

于是带类型的演算失去了通用递归。实际上它把非终止也整个失去了。

::: theorem 强归一化（泰特（Tait），1967）{#thm-sn}
若在简单类型 λ-演算中 $\Gamma \vdash t : T$，则从 $t$ 出发的每条 β-规约序列都有穷。
:::

证明不能直接对推导归纳——归纳假设太弱，因为代入可能使项变大。泰特（Tait）的方法沿类型归纳地定义一个更强的性质（「可满足性」：类型 $T_1 \to T_2$ 的项可满足，若把它应用于任何可满足的实参都得到可满足的结果），再证明每个良类型项都有该性质；见皮尔斯（Pierce）的 *TAPL* 第 12 章。一个推论是简单类型 λ-演算*不*是图灵完备的：一个全部的、总能终止的语言不能表达它自己的解释器（用 [[theory-of-computation/decidability]] 的对角线论证）。

真实语言用一个带类型的不动点构造子 $\mathsf{fix}$（ML 的 `let rec`）把递归加回来，其规则 $\Gamma \vdash t : T \to T \Rightarrow \Gamma \vdash \mathsf{fix}\ t : T$ 是手工添加的。安全性得以保住（新增情形是一道习题）；终止性则不然，因为 $\mathsf{fix}\,(\lambda x{:}\mathsf{Nat}.\,x)$ 有类型 $\mathsf{Nat}$ 而永不停止。Agda、Coq 这类全部语言只允许检查器能证明终止的递归，从而保住终止性。

### 类型即命题

把类型 $A \to B$ 读作逻辑蕴含「$A$ 蕴涵 $B$」。T-App 就成了*肯定前件*规则（modus ponens）：从 $A \to B$ 与 $A$ 推出 $B$。T-Abs 是演绎规则：若假设 $A$ 能让你证明 $B$，则 $A \to B$ 成立。类型 $T$ 的一个封闭项就是命题 $T$ 的一个*证明*。这就是**柯里-霍华德（Curry–Howard）对应**：命题是类型，证明是程序，化简证明（消除迂回）就是 β-规约。

例如，把类型变元 $A, B, C$ 读作任意命题，则 $\lambda f{:}A\to B.\,\lambda g{:}B\to C.\,\lambda x{:}A.\,g\,(f\ x)$——函数复合——具有类型 $(A \to B) \to (B \to C) \to (A \to C)$：它是蕴含具有传递性的一个证明。$\lambda x{:}A.\,\lambda y{:}B.\,x$ 证明 $A \to B \to A$。

::: example 证明即程序 {#ex-curry-howard}
求出证明下列命题的封闭项：(a) $(A \to B \to C) \to (B \to A \to C)$；(b) $(A \to A \to B) \to A \to B$。并解释为什么没有封闭项具有类型 $A \to B$。
::: solution
(a) 必须把一个双参数函数变成以相反次序接受参数的函数：$\lambda f{:}A\to B\to C.\,\lambda y{:}B.\,\lambda x{:}A.\,f\ x\ y$。检查：在上下文 $f{:}A\to B\to C,\ y{:}B,\ x{:}A$ 中，两次 T-App 给出 $f\ x : B \to C$ 与 $f\ x\ y : C$，三次 T-Abs 给出所述类型。逻辑上：从「$A$ 再连同 $B$ 蕴涵 $C$」推出「$B$ 再连同 $A$ 蕴涵 $C$」。

(b) $\lambda f{:}A\to A\to B.\,\lambda x{:}A.\,f\ x\ x$——这个证明两次使用假设 $A$，这在该逻辑里是允许的（它是*收缩*（contraction）规则；线性类型系统禁止一个变量使用两次，对应于一个没有该规则的逻辑）。

(c) 设 $\varnothing \vdash t : A \to B$，其中 $A, B$ 是不同的原子类型。既然类型对经典真值表是可靠的，$A \to B$ 就该是一条重言式；但赋值「$A$ 真、$B$ 假」使它为假。所以不存在证明——事实上，不耍花招（循环或抛异常，而纯 STLC 都做不到）就写不出把任意 $A$ 变成任意 $B$ 的程序。
:::
:::

这样得到的逻辑是**直觉主义的**（构造主义的），不是经典逻辑：每个可证公式都是经典重言式（对推导归纳，因为肯定前件与演绎规则在每个赋值下保持真值），但有些重言式没有证明。

::: widget truthtable
formula: ((p -> q) -> p) -> p
compare: p | ~p
caption: 皮尔斯定律 $((p \to q) \to p) \to p$ 在真值表的每一行都为真，所以它是经典重言式——排中律 $p \lor \neg p$ 同样如此，图中也显示了它在这里与之等价（两列全都为真）。然而对类型变元 $A, B$，不存在类型 $((A \to B) \to A) \to A$ 的封闭简单类型 λ-项：这样的程序得从一个「需要一个 $A \to B$ 才能给出 $A \to B$」的函数造出未知类型 $A$ 的值。直觉主义逻辑——从而纯粹的类型化程序设计——缺少这条定律；[[programming-languages/control]] 表明，添加控制算子 `call/cc` 恰好补上它。试一下 $(p -> q) -> ((q -> r) -> (p -> r))$：一条*确有*证明的重言式，即复合函数。
:::

柯里-霍华德对应是 Coq（现名 Rocq）、Agda、Lean 等证明助手的基础：在这些系统里，数学定理靠编写以定理为类型的程序来证明，而类型检查器负责验证证明。

## 再谈静态类型与动态类型

本章的类型检查器在 [[#cor-safety]] 的意义上是**可靠的**，并且是**保守的**：它们拒绝某些永不卡住的程序。动态类型语言作了相反的交易：每个程序都能运行，[[programming-languages/interpreters]] 的那些检查（`prim` 检测其操作数是否为整数）在类型错误发生时抓住它们。两种立场可以被精确地联系起来：动态类型语言是这样一个静态类型语言——它只有一个带标记值的类型 `Dyn`，其中每个运算都检查标记。静态类型除安全性外还有三方面的回报——记录接口信息、让编译器得以去掉标记检查并选择高效表示、指导重构——代价是拒绝某些程序和标注的心力，后者可由类型推断（[[programming-languages/type-inference]]）减轻。**渐进类型**（gradual typing，西克（Siek）与塔哈（Taha），2006）——Python 的标注、TypeScript 与 Typed Racket 都取材于此——把两者混进同一个程序，在带类型与不带类型代码的边界处插入运行时检查。

最后注意，STLC 的求值规则从不查看类型：E-AppAbs 忽略 $\lambda x{:}T.\,t$ 中的标注。因此类型可以在运行之前被**擦除**：若 $\mathrm{erase}(t)$ 去掉所有标注，则 $t \to t'$ 蕴含在无类型演算中有 $\mathrm{erase}(t) \to \mathrm{erase}(t')$，反向亦然（对步归纳，因为每条规则都与擦除交换）。这就是 ML、Haskell 与 Java 泛型的实现方式（[[program-design/types-interfaces]]）：类型在运行时不花分文。

::: history
罗素（Russell）于 1908 年为避开朴素集合论的悖论引入了类型；丘奇（Church）的 "A formulation of the simple theory of types"（1940）给出了简单类型 λ-演算。库里（Curry）在 1934 年注意到组合子的类型与蕴含逻辑公理之间的对应（库里与费斯（Feys），1958）；威廉·霍华德（Howard）的手稿 "The formulae-as-types notion of construction"（1969，1980 年发表）把它扩展到自然演绎。威廉·泰特（Tait）在 "Intensional interpretations of functionals of finite type I"（1967）中证明了强归一化。米尔纳（Milner）的 "A theory of type polymorphism in programming"（1978）用指称语义证明了 ML 的「良类型表达式不会出岔子」。赖特（Wright）与费莱森（Felleisen）的 "A syntactic approach to type soundness"（1994）开创了本章的方法——小步语义上的主体化简（保持性）加进展性——使安全性证明变成例行公事；哈珀（Harper）的 *Practical Foundations for Programming Languages*（2012，第 2 版 2016）与皮尔斯（Pierce）的 *Types and Programming Languages*（2002）都按这一方式呈现整个领域。
:::

## 后续内容

简单类型强迫每个约束词都带标注，且每个函数只有一个类型；[[programming-languages/type-inference]] 自动重建这些标注，[[programming-languages/polymorphism]] 则让一个函数拥有多个类型（系统 F、子类型、模块）。异常、引用与续延各需要新的类型规则和安全性证明中的新情形（[[programming-languages/control]]）。带类型的中间语言把这些保证穿过编译一路携带（[[compilers]]）；面向安全的类型系统——信息流、线性类型与所有权类型——用同样的进展-保持方法防住泄漏与内存错误（[[security]]）。

::: summary
- **类型系统**用语法导向的规则给项指派类型（[[#def-typing-nb]]、[[#def-stlc]]）；类型检查器是一次由**可逆性**（[[#lem-inversion-nb]]）保证的结构递归。
- **标准形式**说出每种类型的值长什么样（[[#lem-canonical-nb]]）；**进展性**：封闭的良类型项是值或能走步（[[#thm-progress]]）；**保持性**：走步保持类型（[[#thm-preservation]]），其基础是**代入引理**（[[#lem-substitution]]）。
- 两者合起来给出**类型安全性**：良类型程序从不卡住（[[#cor-safety]]）——但语义已定义的运行时错误，如异常与非终止，仍然可能。
- 类型系统是**保守的**：它们拒绝某些本可正确运行的程序。
- 简单类型排除了自应用（[[#thm-no-self-app]]），且每个带类型的项都终止（[[#thm-sn]]）；递归用带类型的 $\mathsf{fix}$ 加回来。
- **柯里-霍华德对应**：类型是命题，封闭项是证明，逻辑是直觉主义的（没有皮尔斯定律）。
- 类型可以在执行前被**擦除**：在 STLC 中它们从不影响求值。
:::

## 习题

::: exercise 手工类型化 {level=1}
给出每个项的类型，或说明它为何没有类型：(a) $\lambda x{:}\mathsf{Bool}.\,\lambda y{:}\mathsf{Nat}.\,\mathsf{if}\ x\ \mathsf{then}\ y\ \mathsf{else}\ \mathsf{succ}\ y$；(b) $\lambda f{:}\mathsf{Nat}\to\mathsf{Bool}.\,f\,(f\ \mathsf{0})$；(c) $\lambda f{:}\mathsf{Bool}\to\mathsf{Bool}.\,\lambda x{:}\mathsf{Bool}.\,f\,(f\ x)$；(d) $(\lambda x{:}\mathsf{Nat}.\,x)\ \mathsf{true}$。
::: solution
(a) $\mathsf{Bool} \to \mathsf{Nat} \to \mathsf{Nat}$：条件是 $\mathsf{Bool}$，两个分支都是 $\mathsf{Nat}$。(b) 不可类型化：$f\ \mathsf{0} : \mathsf{Bool}$，而 $f$ 需要一个 $\mathsf{Nat}$。(c) $(\mathsf{Bool}\to\mathsf{Bool}) \to \mathsf{Bool} \to \mathsf{Bool}$，即 $\mathit{twice}$ 的布尔版本。(d) 不可类型化：实参是 $\mathsf{Bool}$，形参是 $\mathsf{Nat}$。
:::
:::

::: exercise 数步子 {level=1 check="2"}
用按值调用求值 $(\lambda x{:}\mathsf{Nat}.\,\mathsf{succ}\,(\mathsf{succ}\ x))\,(\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0}))$，并给出每个中间项的类型。（输入步数。）
::: solution
实参不是值，故 E-App2 配 E-PredSucc：$(\lambda x{:}\mathsf{Nat}.\,\mathsf{succ}\,(\mathsf{succ}\ x))\ \mathsf{0}$。然后 E-AppAbs：$\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})$，是值。共两步；每个项都有类型 $\mathsf{Nat}$，正如保持性所保证的。
:::
:::

::: exercise 一个安全却出人意料的程序 {level=1}
给出一个求值为值、却被类型检查器拒绝的 NB 项，再给出一个良类型、求值为 $\mathsf{false}$，但含有「看起来像错误」的子项 $\mathsf{pred}\ \mathsf{0}$ 的项。
::: solution
$\mathsf{if}\ \mathsf{true}\ \mathsf{then}\ \mathsf{0}\ \mathsf{else}\ \mathsf{false}$ 求值为 $\mathsf{0}$，但 T-If 要求两个分支类型相同。$\mathsf{iszero}\,(\mathsf{succ}\,(\mathsf{pred}\ \mathsf{0}))$ 良类型（$\mathsf{Bool}$）且求值为 $\mathsf{false}$；$\mathsf{pred}\ \mathsf{0} \to \mathsf{0}$ 在 NB 中是已定义的行为，不是类型错误，所以类型系统对它无话可说。
:::
:::

::: exercise 数良类型项 {level=2 check="1624"}
设 $b_k$ 与 $n_k$ 分别是深度不超过 $k$、类型为 $\mathsf{Bool}$ 与 $\mathsf{Nat}$ 的 NB 项的个数。建立递推并计算 $b_3 + n_3$，即 [[#ex-brute-typed]] 中良类型项的个数。（输入 $b_3 + n_3$。）
::: solution
深度不超过 $k + 1$ 的 $\mathsf{Bool}$ 项是 $\mathsf{true}$、$\mathsf{false}$、深度不超过 $k$ 的 $\mathsf{Nat}$ 项的 $\mathsf{iszero}$，或以 $\mathsf{Bool}$ 为条件、两个 $\mathsf{Bool}$ 分支的 $\mathsf{if}$：$b_{k+1} = 2 + n_k + b_k^3$。$\mathsf{Nat}$ 项是 $\mathsf{0}$、$\mathsf{Nat}$ 项的 $\mathsf{succ}$ 或 $\mathsf{pred}$，或以 $\mathsf{Bool}$ 为条件、两个 $\mathsf{Nat}$ 分支的 $\mathsf{if}$：$n_{k+1} = 1 + 2n_k + b_k n_k^2$。由类型唯一性，两个集合不相交，计数可加。由 $b_1 = 2$、$n_1 = 1$：$b_2 = 2 + 1 + 8 = 11$，$n_2 = 1 + 2 + 2 = 5$；$b_3 = 2 + 5 + 1331 = 1338$，$n_3 = 1 + 10 + 11 \cdot 25 = 286$。合计 $1624$，与程序一致。
:::
:::

::: exercise 打破安全性证明 {level=2}
对 NB 的每个修改，说明进展性与保持性是否仍成立，并在失效处给出反例。(a) 添加类型规则 $\dfrac{t_1 : \mathsf{Bool} \quad t_2 : T}{\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 : T}$（对 $t_3$ 不设条件）。(b) 添加公理 $\mathsf{pred}\ \mathsf{true} : \mathsf{Nat}$。(c) 添加求值规则 $\mathsf{if}\ \mathsf{true}\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 \to t_3$。
::: solution
(a) 进展性仍成立——证明从没用过关于 $t_3$ 的前提。保持性失效：按新规则 $\mathsf{if}\ \mathsf{false}\ \mathsf{then}\ \mathsf{0}\ \mathsf{else}\ \mathsf{true} : \mathsf{Nat}$，但它走到 $\mathsf{true}$，而 $\mathsf{true}$ 没有类型 $\mathsf{Nat}$。(b) 对新项而言保持性空真地成立（$\mathsf{pred}\ \mathsf{true}$ 不能走步）。进展性失效：它良类型且卡住。(c) 保持性仍成立（两个分支都有类型 $T$），但求值不再是确定的，语言会算出不同的答案（$\mathsf{if}\ \mathsf{true}\ \mathsf{then}\ \mathsf{0}\ \mathsf{else}\ \mathsf{succ}\ \mathsf{0}$ 可以给出 $\mathsf{0}$，也可以给出 $\mathsf{succ}\ \mathsf{0}$）。安全性只承诺不卡住，不承诺算出预期的结果。
:::
:::

::: exercise STLC 类型的唯一性 {level=2}
证明：若 $\Gamma \vdash t : T$ 且 $\Gamma \vdash t : T'$，则 $T = T'$。若约束词不带标注（若 $\lambda x.\,t$ 只要体能通过检查，就可以赋予任何类型 $T_1 \to T_2$），这一结论还成立吗？
::: solution
对 $t$ 归纳。T-Var：两个类型都是 $\Gamma$ 指派给 $x$ 的那一个（$\Gamma$ 中的变元互不相同）。T-Abs：$t = \lambda x{:}T_1.\,t_2$；由可逆性 $T = T_1 \to T_2$ 且 $T' = T_1 \to T_2'$，其中 $\Gamma, x{:}T_1 \vdash t_2 : T_2$ 且 $: T_2'$；由归纳假设 $T_2 = T_2'$。标注 $T_1$ 固定了定义域。T-App：$t = t_1\ t_2$，且 $t_1 : T_{11} \to T$、$t_1 : T_{11}' \to T'$；由归纳假设这两个箭头类型相等，故 $T = T'$。NB 的规则：与 [[#thm-unique-nb]] 相同。没有标注，唯一性失效：$\lambda x.\,x$ 将既有类型 $\mathsf{Nat} \to \mathsf{Nat}$，又有类型 $\mathsf{Bool} \to \mathsf{Bool}$。那正是 [[programming-languages/type-inference]] 的出发点，它找一个单一的*最一般*类型 $\alpha \to \alpha$。
:::
:::

::: exercise 乘积类型 {level=3}
用序对扩充 STLC：类型 $T_1 \times T_2$，项 $(t_1, t_2)$、$t.1$、$t.2$，值 $(v_1, v_2)$。给出类型规则与求值规则，陈述标准形式的新情形，并给出进展性与保持性证明的新情形。
::: solution
类型：$\dfrac{\Gamma \vdash t_1 : T_1 \quad \Gamma \vdash t_2 : T_2}{\Gamma \vdash (t_1, t_2) : T_1 \times T_2}$，以及 $\dfrac{\Gamma \vdash t : T_1 \times T_2}{\Gamma \vdash t.i : T_i}$（$i = 1, 2$）。求值：$(v_1, v_2).i \to v_i$；同余 $t \to t' \Rightarrow t.i \to t'.i$；$t_1 \to t_1' \Rightarrow (t_1, t_2) \to (t_1', t_2)$；$t_2 \to t_2' \Rightarrow (v_1, t_2) \to (v_1, t_2')$（从左到右）。标准形式：类型 $T_1 \times T_2$ 的值是一个序对 $(v_1, v_2)$。

进展性。序对：对 $t_1$ 与 $t_2$ 用归纳假设，要么 $t_1$ 能走步（第一条同余），要么 $t_1$ 是值而 $t_2$ 能走步（第二条），要么两者都是值而序对是值。投影 $t.i$：要么 $t$ 能走步（同余），要么 $t$ 是类型 $T_1 \times T_2$ 的值，由标准形式它是 $(v_1, v_2)$，而 $(v_1, v_2).i \to v_i$。

保持性。同余步：归纳假设加同一条类型规则。投影步 $(v_1, v_2).i \to v_i$：由序对规则的可逆性，$v_i : T_i$，而这正是 $t.i$ 的类型。代入引理只需要新增那些例行公事般的情形（代入各分量）。
:::
:::

::: exercise 添加 fix {level=3}
向 STLC 添加 $\mathsf{fix}\ t$，类型规则 $\dfrac{\Gamma \vdash t : T \to T}{\Gamma \vdash \mathsf{fix}\ t : T}$，求值规则 $\mathsf{fix}\,(\lambda x{:}T.\,t) \to t[x := \mathsf{fix}\,(\lambda x{:}T.\,t)]$ 与 $t \to t' \Rightarrow \mathsf{fix}\ t \to \mathsf{fix}\ t'$。证明进展性与保持性的新情形。然后在 Python 检查器与求值器中实现它，并用 $\mathit{plus} = \mathsf{fix}\,(\lambda p{:}\mathsf{Nat}\to\mathsf{Nat}\to\mathsf{Nat}.\,\lambda m{:}\mathsf{Nat}.\,\lambda n{:}\mathsf{Nat}.\,\mathsf{if}\ \mathsf{iszero}\ m\ \mathsf{then}\ n\ \mathsf{else}\ \mathsf{succ}\,(p\,(\mathsf{pred}\ m)\ n))$ 计算 $2 + 3$。
::: solution
*进展性：* 若 $\varnothing \vdash \mathsf{fix}\ t : T$，则 $\varnothing \vdash t : T \to T$；由归纳假设 $t$ 能走步（同余规则可用），或是箭头类型的值，于是由标准形式它是抽象，展开规则可用。*保持性：* 同余情形就是归纳假设。展开情形：可逆性给出 $\Gamma, x{:}T \vdash t : T$，而 $\Gamma \vdash \mathsf{fix}\,(\lambda x{:}T.\,t) : T$（原项本身），所以代入引理给出 $\Gamma \vdash t[x := \mathsf{fix}\,(\lambda x{:}T.\,t)] : T$。

```python
@dataclass(frozen=True)
class Fix: fun: object
# 在 typeof 中：
        case Fix(g):
            T = typeof(g, ctx)
            if not (isinstance(T, Arrow) and T.dom == T.cod):
                raise TypeError_("fix expects a function of type T -> T")
            return T.dom
# 在 step 中：
        case Fix(Lam(f, _, b) as lam): return subst(b, f, Fix(lam))
        case Fix(g):
            g2 = step(g); return None if g2 is None else Fix(g2)
# （以及在 subst 中加一个 Fix 情形）
```

```console
Nat -> Nat -> Nat | Nat
Op(op='succ', arg=Op(op='succ', arg=Op(op='succ', arg=Op(op='succ', arg=Op(op='succ', arg=Const(value=0)))))) 17
```

$\mathit{plus}$ 有类型 $\mathsf{Nat}\to\mathsf{Nat}\to\mathsf{Nat}$，而 $\mathit{plus}\ 2\ 3$ 在 $17$ 步内求值为 $5$，每步之后都检查了类型。强归一化不复存在：$\mathsf{fix}\,(\lambda x{:}\mathsf{Nat}.\,x) \to \mathsf{fix}\,(\lambda x{:}\mathsf{Nat}.\,x)$ 无穷无尽——良类型，不卡住，也永远不是值。安全性允许这样。
:::
:::
