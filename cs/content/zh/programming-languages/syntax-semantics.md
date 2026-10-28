程序 `x = x + 1` 是什么意思？Python 程序员会把它读作"把 `x` 里的数加一"。在 C 中，若 `x` 是一个保存着最大可表示值的 `int`，同样的字符会引发未定义行为；在 JavaScript 中，若 `x` 保存着字符串 `"1"`，结果是字符串 `"11"`；而在数学中，这个方程根本无解。字符完全相同，*含义*却不同。每位程序员都依赖"知道程序的含义"这件事，然而大多数语言手册用英语散文来描述语义——这种描述既有歧义、又不完整，还无法检验。按同一份手册写出的两个编译器可能产生分歧；而对一个含义只用文字描述的程序，程序员什么也证明不了。

本课程把程序设计语言当作精确定义的数学对象来研究。这第一章介绍语言定义的两个组成部分。**语法**说哪些程序存在：哪些字符串是程序，它们的结构是什么。**语义**说这些程序是什么意思：运行时发生什么，或者它们指称哪个数学值。我们定义一个由布尔值和自然数组成的微小语言，给它三种语义——小步操作语义、大步操作语义与指称语义——每种都用 Python 实现，并*证明*三者一致。这些技术正是在更大规模上规范 Standard ML、WebAssembly 与 Rust 核心时所用的技术，也是其后每一章的基础。

## 具体语法与抽象语法

程序以文本的形式呈现在我们面前，即一个字符串。语言的**具体语法**是作为程序的串的集合，连同阅读它们的规则：哪些字符构成关键字和数，运算符如何结合，括号可以出现在哪里。具体语法由上下文无关文法（[[theory-of-computation/context-free-grammars]]）描述，并由语法分析器（[[compilers]]）识别。

就程序的含义而言，那些细节大多无关紧要。串 `1+2*3`、`1 + (2*3)` 与 `(1+(2*3))` 彼此不同，却是同一个程序：一个加法，其左操作数是 $1$，右操作数是 $2$ 与 $3$ 的积。这一结构是一棵树。

::: definition 抽象语法树 {#def-ast}
语言的**抽象语法**把程序描述为树。每个结点由一个*构造子*（如 `if`、`succ` 或 `+`）标记，并有固定数目个子女，即它的子项；叶结点是常量或名字。**抽象语法树**（AST）就是这样一棵树。语法分析把具体语法转换成 AST；括号、空白与运算符优先级被语法分析器用过后便遭遗忘。
:::

具体语法的文法可能是**二义的**：文法 $E \to E - E \mid n$ 允许串 `1-2-3` 被分析成 $(1-2)-3 = -4$ 或 $1-(2-3) = 2$。具体文法会被改写（添上优先级与结合性规则），使得每个串恰有一棵语法分析树。抽象语法绝不二义，因为它*就是*那棵树。当我们把抽象语法写成文本时，会自由地使用括号来显示树的结构；从今以后我们只对树进行推理。

### 语言 NB

我们贯穿全章的例子是皮尔斯（Pierce）的 *Types and Programming Languages* 中的布尔与自然数语言。我们称它为 **NB**。它的抽象语法由巴科斯-诺尔范式的一条文法给出，这里的文法应当读作树的定义而非串的定义：

$$
\begin{aligned}
t \;::=\;& \mathsf{true} \mid \mathsf{false} \mid \mathsf{if}\ t\ \mathsf{then}\ t\ \mathsf{else}\ t \\
\mid\;& \mathsf{0} \mid \mathsf{succ}\ t \mid \mathsf{pred}\ t \mid \mathsf{iszero}\ t
\end{aligned}
$$ {#eq-nb-syntax}

符号 $t$ 是一个**元变量**：它表示任一项，下面的规则中用 $t_1, t_2, t'$ 表示其他项。数采用一进制书写，因此 $\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})$ 就是数 $2$。构造子 $\mathsf{pred}$ 是前驱，约定 $\mathsf{pred}\ \mathsf{0} = \mathsf{0}$，$\mathsf{iszero}$ 测试是否为零。NB 没有变量、函数或循环，然而它已经展示出本章的一切现象，包括"出错"的程序，例如 $\mathsf{succ}\ \mathsf{true}$。

::: definition 项的归纳定义 {#def-terms}
**项**的集合 $\mathcal{T}$ 是满足下述条件的最小集合：

1. $\mathsf{true}, \mathsf{false}, \mathsf{0} \in \mathcal{T}$；
2. 若 $t_1 \in \mathcal{T}$，则 $\mathsf{succ}\ t_1$、$\mathsf{pred}\ t_1$ 与 $\mathsf{iszero}\ t_1$ 属于 $\mathcal{T}$；
3. 若 $t_1, t_2, t_3 \in \mathcal{T}$，则 $\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 \in \mathcal{T}$。
:::

"最小"正是定义有用的原因：除非规则迫使一个对象成为项，否则它就不是项，因此每个项都由常量经过有穷多次规则 2 与 3 的施用构造而成。这就得到贯穿本课程的证明原则。

::: theorem 项上的结构归纳 {#thm-structural-induction}
设 $P$ 是项的一个性质。若 $P(\mathsf{true})$、$P(\mathsf{false})$ 与 $P(\mathsf{0})$ 成立；若由 $P(t_1)$ 可推出 $P(\mathsf{succ}\ t_1)$、$P(\mathsf{pred}\ t_1)$ 与 $P(\mathsf{iszero}\ t_1)$；并且由 $P(t_1)$、$P(t_2)$ 与 $P(t_3)$ 可推出 $P(\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3)$，则对每个项 $t$，$P(t)$ 成立。
:::

::: proof
令 $S = \set{t \in \mathcal{T} : P(t)}$。假设恰好是说：$S$ 包含三个常量，并且对 [[#def-terms]] 中的三类构造封闭。由于 $\mathcal{T}$ 是具有这些封闭性质的*最小*集合，而 $S$ 是这样一个集合，故 $\mathcal{T} \subseteq S$，即对每个项 $t$，$P(t)$ 成立。
:::

这与 [[program-design/functional-style]] 中对 Python 数据定义所作的结构归纳是同一条原则；这里它是对一个语言而非一个数据类型陈述的。项上的函数用**结构递归**定义，每个构造子一个子句。我们将用到的是大小与深度两个函数：

$$
\begin{aligned}
\operatorname{size}(c) &= 1 \quad (c \in \set{\mathsf{true}, \mathsf{false}, \mathsf{0}}), &
\operatorname{size}(\mathsf{succ}\ t_1) &= \operatorname{size}(t_1) + 1 \ \ (\text{同理 } \mathsf{pred}, \mathsf{iszero}),\\
\operatorname{size}(\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3) &= \operatorname{size}(t_1) + \operatorname{size}(t_2) + \operatorname{size}(t_3) + 1, &
\operatorname{depth}(c) &= 1, \ \ \operatorname{depth}(\mathsf{if}\ \ldots) = \max_i \operatorname{depth}(t_i) + 1.
\end{aligned}
$$

大小就是树中结点的个数。用结构归纳证明 $\operatorname{depth}(t) \le \operatorname{size}(t)$ 对每个 $t$ 成立：它对常量成立；而对 $\mathsf{if}$，最深子女的深度不超过该子女自身的大小，而后者不超过三个子项大小之和。

在 Python 中，AST 自然地表示为一族冻结的数据类，每个构造子一个；而语法分析器是一个递归函数，每个关键字一个分支。下面的清单是求值器的数据定义连同后文要用的部分；语法分析器（`parse`）与打印器（`show`）是常规的递归下降与结构递归，从略。

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Tru: pass
@dataclass(frozen=True)
class Fls: pass
@dataclass(frozen=True)
class Zero: pass
@dataclass(frozen=True)
class Succ: t: object
@dataclass(frozen=True)
class Pred: t: object
@dataclass(frozen=True)
class IsZero: t: object
@dataclass(frozen=True)
class If: c: object; th: object; el: object
```

```console
>>> parse("if iszero (pred (succ 0)) then succ (pred 0) else 0")
If(c=IsZero(t=Pred(t=Succ(t=Zero()))), th=Succ(t=Pred(t=Zero())), el=Zero())
```

::: widget graph
nodes: if@2,3; iszero@0.5,2; pred@0.5,1; succ@0.5,0; 0a@0.5,-1; succ2@2,2; pred2@2,1; 0b@2,0; 0c@3.5,2
edges: if>iszero; if>succ2; if>0c; iszero>pred; pred>succ; succ>0a; succ2>pred2; pred2>0b
algorithm: dfs
start: if
caption: `if iszero (pred (succ 0)) then succ (pred 0) else 0` 的抽象语法树（三个 `0` 叶结点命名为 `0a`、`0b`、`0c`，第二个 `succ` 与 `pred` 带上后缀 2，只因为顶点名必须互不相同）。从根开始逐步执行深度优先搜索：它会先完整访问守卫的子树，再访问分支，这正是下面的求值规则寻找可做的工作时所考察的顺序。数一数顶点：该项的大小为 $9$，深度为 $5$。
:::

## 小步操作语义

**操作语义**通过描述程序如何运行——作为一台抽象机器的状态序列——来描述程序的含义。对表达式语言而言，最简单的机器以项本身作为状态：运行程序就是逐步重写它，直到它成为最终答案。这正是你手工计算 $(1 + 2) \times 4$ 的方式——先 $3 \times 4$，再 $12$。

::: definition 值 {#def-values}
NB 的**值**是作为最终结果的项：

$$
v \;::=\; \mathsf{true} \mid \mathsf{false} \mid nv, \qquad nv \;::=\; \mathsf{0} \mid \mathsf{succ}\ nv.
$$

**数值** $nv$ 是 $\mathsf{0}$、$\mathsf{succ}\ \mathsf{0}$、$\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})$，…，它们是 $0, 1, 2, \ldots$ 的表示。
:::

规则写成**推理规则**：横线之上的前提成立时，横线之下的结论也成立；没有前提的规则是公理。

::: definition 单步求值 {#def-step}
**单步求值**关系 $t \to t'$ 是对下列规则封闭的最小项上关系。

$$
\begin{gathered}
\frac{}{\mathsf{if}\ \mathsf{true}\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 \to t_2}\ \text{(E-IfTrue)}
\qquad
\frac{}{\mathsf{if}\ \mathsf{false}\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 \to t_3}\ \text{(E-IfFalse)}
\\[1.2em]
\frac{t_1 \to t_1'}{\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 \to \mathsf{if}\ t_1'\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3}\ \text{(E-If)}
\qquad
\frac{t_1 \to t_1'}{\mathsf{succ}\ t_1 \to \mathsf{succ}\ t_1'}\ \text{(E-Succ)}
\\[1.2em]
\frac{}{\mathsf{pred}\ \mathsf{0} \to \mathsf{0}}\ \text{(E-PredZero)}
\qquad
\frac{}{\mathsf{pred}\,(\mathsf{succ}\ nv) \to nv}\ \text{(E-PredSucc)}
\qquad
\frac{t_1 \to t_1'}{\mathsf{pred}\ t_1 \to \mathsf{pred}\ t_1'}\ \text{(E-Pred)}
\\[1.2em]
\frac{}{\mathsf{iszero}\ \mathsf{0} \to \mathsf{true}}\ \text{(E-IsZeroZero)}
\qquad
\frac{}{\mathsf{iszero}\,(\mathsf{succ}\ nv) \to \mathsf{false}}\ \text{(E-IsZeroSucc)}
\qquad
\frac{t_1 \to t_1'}{\mathsf{iszero}\ t_1 \to \mathsf{iszero}\ t_1'}\ \text{(E-IsZero)}
\end{gathered}
$$

**多步**关系 $\to^*$ 是 $\to$ 的自反-传递闭包：若对某个 $n \ge 0$ 有 $t = t_0 \to t_1 \to \cdots \to t_n = t'$，则 $t \to^* t'$。
:::

规则有两类。**计算规则**（E-IfTrue、E-PredSucc，…）在相关子项已经是值时做实际的工作。**同余规则**（E-If、E-Succ、E-Pred、E-IsZero）说的是求值*在哪里*可以接着发生：在 $\mathsf{if}$ 的守卫内部，但不在其分支内部；在 $\mathsf{succ}$ 的参数内部。不给分支设同余规则是一个设计决策——它使 $\mathsf{if}$ 对分支是惰性的，一如所有程序设计语言——而 E-PredSucc 中的边条件 $nv$ 强迫参数先被完全求值。

$t \to t'$ 的一个**推导**是以 $t \to t'$ 为根的规则实例树。例如，$\mathsf{if}\ (\mathsf{iszero}\,(\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0})))\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$ 用 E-If 走一步，其前提用 E-IsZero 走一步，而再下面的前提是以 $nv = \mathsf{0}$ 代入的 E-PredSucc 实例：

$$
\cfrac{\cfrac{\cfrac{}{\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0}) \to \mathsf{0}}\ \text{E-PredSucc}}{\mathsf{iszero}\,(\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0})) \to \mathsf{iszero}\ \mathsf{0}}\ \text{E-IsZero}}{\mathsf{if}\ \mathsf{iszero}\,(\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0}))\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 \to \mathsf{if}\ \mathsf{iszero}\ \mathsf{0}\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3}\ \text{E-If}
$$

这些规则逐行翻译成 Python 的函数。每个 `case` 是一条规则；同余规则递归调用 `step`，恰如其前提要求一个更小步的推导那样。Python 的 `match` 按顺序尝试各分支，所以只有当守卫既不是 `true` 也不是 `false` 时才会到达 E-If。

```python
def is_nv(t):
    return isinstance(t, Zero) or (isinstance(t, Succ) and is_nv(t.t))
def is_value(t):
    return isinstance(t, (Tru, Fls)) or is_nv(t)

class NoRule(Exception): pass

def step(t):
    """One step t -> t'; raises NoRule when t is a normal form."""
    match t:
        case If(Tru(), th, _):              return th                   # E-IfTrue
        case If(Fls(), _, el):              return el                   # E-IfFalse
        case If(c, th, el):                 return If(step(c), th, el)  # E-If
        case Succ(t1):                      return Succ(step(t1))       # E-Succ
        case Pred(Zero()):                  return Zero()               # E-PredZero
        case Pred(Succ(nv)) if is_nv(nv):   return nv                   # E-PredSucc
        case Pred(t1):                      return Pred(step(t1))       # E-Pred
        case IsZero(Zero()):                return Tru()                # E-IsZeroZero
        case IsZero(Succ(nv)) if is_nv(nv): return Fls()                # E-IsZeroSucc
        case IsZero(t1):                    return IsZero(step(t1))     # E-IsZero
    raise NoRule(t)

def trace(t):
    while True:
        yield t
        try:
            t = step(t)
        except NoRule:
            return
```

::: example 逐步求值 {#ex-trace}
求值 $\mathsf{if}\ \mathsf{iszero}\,(\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0}))\ \mathsf{then}\ \mathsf{succ}\,(\mathsf{pred}\ \mathsf{0})\ \mathsf{else}\ \mathsf{0}$，标明每一步所用的规则，并运行 `trace` 验证求值轨迹。
::: solution
1. 该项是一个 $\mathsf{if}$，其守卫不是布尔值，故只有 E-If 可用。守卫内部，$\mathsf{iszero}\,(\ldots)$ 的参数不是数值，故 E-IsZero 可用；再往里，$\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0})$ 是 E-PredSucc 的实例。结果：$\mathsf{if}\ \mathsf{iszero}\ \mathsf{0}\ \mathsf{then}\ \ldots$（推导即上面展示的推导）。
2. 守卫中用 E-IsZeroZero 的 E-If：$\mathsf{if}\ \mathsf{true}\ \mathsf{then}\ \mathsf{succ}\,(\mathsf{pred}\ \mathsf{0})\ \mathsf{else}\ \mathsf{0}$。
3. E-IfTrue：$\mathsf{succ}\,(\mathsf{pred}\ \mathsf{0})$。else 分支未经求值即被丢弃。
4. 内部用 E-PredZero 的 E-Succ：$\mathsf{succ}\ \mathsf{0}$，是值。没有规则适用于值，求值停止。

```python
src = "if iszero (pred (succ 0)) then succ (pred 0) else 0"
for i, u in enumerate(trace(parse(src))):
    print(i, show(u))
```

```console
0 if iszero (pred (succ 0)) then succ (pred 0) else 0
1 if iszero 0 then succ (pred 0) else 0
2 if true then succ (pred 0) else 0
3 succ (pred 0)
4 succ 0
```

四步，以 $1$ 的数值收尾。
:::
:::

### 确定性、范式与卡住的项

示例中每一步恰有一条规则可用。这不是巧合，而且是对一个新语义首先要证明的定理。

::: lemma 值是范式 {#lem-values-normal}
若不存在 $t'$ 使 $t \to t'$，则称项 $t$ 处于**范式**。每个值都处于范式。
:::

::: proof
对数值作结构归纳，再加上布尔的两种情形。没有任何一条规则以 $\mathsf{true}$、$\mathsf{false}$ 或 $\mathsf{0}$ 作为其结论的左部。结论形如 $\mathsf{succ}\ t_1 \to \ldots$ 的规则只有 E-Succ，其前提需要其中的数值 $nv$ 满足 $nv \to t_1'$；由归纳假设，这样的步不存在。
:::

::: theorem 单步求值的确定性 {#thm-determinacy}
若 $t \to t'$ 且 $t \to t''$，则 $t' = t''$。
:::

::: proof
对 $t \to t'$ 的推导作归纳，考察最后使用的规则。

*E-IfTrue。* 此时 $t = \mathsf{if}\ \mathsf{true}\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$ 且 $t' = t_2$。哪条规则能推导 $t \to t''$？不是 E-IfFalse，它的守卫是 $\mathsf{false}$；不是 E-If，它的前提需要 $\mathsf{true} \to t_1'$，由 [[#lem-values-normal]] 这是不可能的。故推导必以 E-IfTrue 结尾，且 $t'' = t_2 = t'$。E-IfFalse 的情形对称。

*E-If。* 此时 $t = \mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$ 且 $t_1 \to t_1'$，$t' = \mathsf{if}\ t_1'\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$。由于 $t_1$ 能走一步，由 [[#lem-values-normal]] 它不是值，故 E-IfTrue 与 E-IfFalse 都不能推导 $t \to t''$；推导必以 E-If 结尾，来自某个 $t_1 \to t_1''$，且 $t'' = \mathsf{if}\ t_1''\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$。对子推导 $t_1 \to t_1'$ 用归纳假设得 $t_1' = t_1''$，故 $t' = t''$。

*E-PredSucc。* 此时 $t = \mathsf{pred}\,(\mathsf{succ}\ nv)$ 且 $t' = nv$。E-PredZero 要求参数是 $\mathsf{0}$；E-Pred 需要 $\mathsf{succ}\ nv \to \ldots$，而 $\mathsf{succ}\ nv$ 是值，这是不可能的。故 $t'' = nv$。

*E-Pred。* 此时 $t = \mathsf{pred}\ t_1$ 且 $t_1 \to t_1'$。于是 $t_1$ 不是值，这就排除了 E-PredZero（参数为 $\mathsf{0}$）与 E-PredSucc（参数为 $\mathsf{succ}\ nv$）；另一个推导同样以 E-Pred 结尾，由归纳假设即得结论。

E-PredZero、E-Succ、E-IsZeroZero、E-IsZeroSucc 与 E-IsZero 的情形同上面的形式完全一样：计算规则只在相关子项是值时触发，同余规则只在它不是值时触发，而两个同余步骤由归纳假设即相一致。
:::

于是 $\to$ 是一个偏函数，项的求值是一条单一的通路——像 `step` 这样的实现并没有任意地做选择。确定性是这个特定规则集的性质：习题表明，从 E-PredSucc 去掉边条件 $nv$ 就会破坏它。

值是范式，但反之不然。项 $\mathsf{succ}\ \mathsf{true}$ 处于范式——E-Succ 需要 $\mathsf{true}$ 能走一步——但它不是值。这样的项称为**卡住的**。

::: definition 卡住的项 {#def-stuck}
若一个项处于范式但不是值，则称它是**卡住的**。项的求值**出错**，若它到达一个卡住的项。
:::

卡住的项刻画运行时类型错误：$\mathsf{succ}\ \mathsf{true}$、$\mathsf{if}\ \mathsf{0}\ \mathsf{then}\ \mathsf{true}\ \mathsf{else}\ \mathsf{false}$、$\mathsf{iszero}\ \mathsf{false}$。真实的实现会抛出异常，或者在不安全的语言中对这些比特位做出任意行为。**类型系统**（[[programming-languages/type-systems]]）的核心目标，就是在程序运行之前拒斥一切可能到达卡住项的程序。

::: theorem 终止性 {#thm-termination}
若 $t \to t'$，则 $\operatorname{size}(t') < \operatorname{size}(t)$。从而从 $t$ 出发的每个求值序列都在至多 $\operatorname{size}(t) - 1$ 步之后到达范式。
:::

::: proof
对 $t \to t'$ 的推导作归纳。对计算规则：E-IfTrue 给出 $\operatorname{size}(t_2) < 1 + 1 + \operatorname{size}(t_2) + \operatorname{size}(t_3)$，E-IfFalse 同理；E-PredZero 与 E-IsZeroZero 从大小 $2$ 变到大小 $1$；E-PredSucc 从 $\operatorname{size}(nv) + 2$ 变到 $\operatorname{size}(nv)$；E-IsZeroSucc 从 $\operatorname{size}(nv) + 2 \ge 3$ 变到 $1$。对同余规则，比如 E-If，归纳假设给出 $\operatorname{size}(t_1') < \operatorname{size}(t_1)$，其余子女不变，故整个项的大小减少同样的量；E-Succ、E-Pred 与 E-IsZero 同理。由于大小是正整数且每步至少减少 $1$，从 $t$ 出发的序列至多有 $\operatorname{size}(t) - 1$ 步。
:::

综合两个定理：每个 NB 项 $t$ 恰有一条求值序列，它是有穷的，并且终结于一个值或一个卡住的项。前一种结果记作 $t \to^* v$。终止性是 NB 特有的；一旦语言有了递归——如后面几章那样——有些程序就永远运行下去，任何语义都无法避免这一点（[[theory-of-computation/decidability]]）。

::: widget relation
set: t0; t1; t2; t3; t4
pairs: t0,t1; t1,t2; t2,t3; t3,t4
view: properties
name: →
caption: 单步关系限制在 [[#ex-trace]] 的五个项上（$t_0$ 是原始项，$t_4 = \mathsf{succ}\ \mathsf{0}$）。矩阵的每行至多有一个 $1$——这就是确定性——而 $t_4$ 的那一行是空的，因为值处于范式。看看图中算出的传递闭包：它是 $\to^+$，加上对角线就得到 $\to^*$。在 $t_0$ 那一行再打开第二对，即可看到非确定的语义是什么样子。
:::

::: quiz
下列哪些 NB 项是卡住的？
- [x] $\mathsf{pred}\ \mathsf{false}$
- [ ] $\mathsf{pred}\ \mathsf{0}$
- [x] $\mathsf{if}\ \mathsf{succ}\ \mathsf{0}\ \mathsf{then}\ \mathsf{0}\ \mathsf{else}\ \mathsf{0}$
- [ ] $\mathsf{if}\ \mathsf{true}\ \mathsf{then}\ \mathsf{0}\ \mathsf{else}\ \mathsf{succ}\ \mathsf{true}$
- [ ] $\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})$
::: solution
$\mathsf{pred}\ \mathsf{false}$ 不匹配任何规则（E-Pred 要求参数走一步，而 $\mathsf{false}$ 是值），所以它是卡住的；守卫为数值的 $\mathsf{if}$ 同样如此。$\mathsf{pred}\ \mathsf{0}$ 走到 $\mathsf{0}$。$\mathsf{if}\ \mathsf{true}$ 那个项用 E-IfTrue 走到 $\mathsf{0}$：糟糕的 else 分支从不被求值，所以该项不出错（但类型检查器仍会拒绝它）。$\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})$ 是值。
:::
:::

## 大步操作语义

小步语义展示每一个中间状态，而这正是讨论非终止、线程交错或错误发生时刻所需要的。往往我们只关心最终结果。**大步语义**（也称**自然语义**）把项直接与它的值联系起来。

::: definition 大步求值 {#def-bigstep}
关系 $t \Downarrow v$（"$t$ 求值为 $v$"）是对下列规则封闭的最小关系：

$$
\begin{gathered}
\frac{}{v \Downarrow v}\ \text{(B-Value)}
\qquad
\frac{t_1 \Downarrow \mathsf{true} \quad t_2 \Downarrow v}{\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 \Downarrow v}\ \text{(B-IfTrue)}
\qquad
\frac{t_1 \Downarrow \mathsf{false} \quad t_3 \Downarrow v}{\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 \Downarrow v}\ \text{(B-IfFalse)}
\\[1.2em]
\frac{t_1 \Downarrow nv}{\mathsf{succ}\ t_1 \Downarrow \mathsf{succ}\ nv}\ \text{(B-Succ)}
\qquad
\frac{t_1 \Downarrow \mathsf{0}}{\mathsf{pred}\ t_1 \Downarrow \mathsf{0}}\ \text{(B-PredZero)}
\qquad
\frac{t_1 \Downarrow \mathsf{succ}\ nv}{\mathsf{pred}\ t_1 \Downarrow nv}\ \text{(B-PredSucc)}
\\[1.2em]
\frac{t_1 \Downarrow \mathsf{0}}{\mathsf{iszero}\ t_1 \Downarrow \mathsf{true}}\ \text{(B-IsZeroZero)}
\qquad
\frac{t_1 \Downarrow \mathsf{succ}\ nv}{\mathsf{iszero}\ t_1 \Downarrow \mathsf{false}}\ \text{(B-IsZeroSucc)}
\end{gathered}
$$
:::

每条规则都可读作一个递归过程：要求值一个 $\mathsf{if}$，先求值守卫；若得 $\mathsf{true}$，就求值 then 分支并返回它的值。这正是一台解释器，也就是 [[programming-languages/interpreters]] 中解释器采用的风格：

```python
class Stuck(Exception): pass

def evaluate(t):
    """Big-step evaluation t ⇓ v; raises Stuck if no derivation exists."""
    match t:
        case _ if is_value(t): return t                     # B-Value
        case If(c, th, el):
            match evaluate(c):
                case Tru(): return evaluate(th)              # B-IfTrue
                case Fls(): return evaluate(el)              # B-IfFalse
        case Succ(t1):
            v = evaluate(t1)
            if is_nv(v): return Succ(v)                      # B-Succ
        case Pred(t1):
            match evaluate(t1):
                case Zero(): return Zero()                   # B-PredZero
                case Succ(nv): return nv                     # B-PredSucc
        case IsZero(t1):
            match evaluate(t1):
                case Zero(): return Tru()                    # B-IsZeroZero
                case Succ(_): return Fls()                   # B-IsZeroSucc
    raise Stuck(t)
```

若没有规则可用——比如守卫求值成了一个数——函数落出所有分支并抛出 `Stuck`：不存在推导。大步语义无法区分一个卡住的程序和一个永远运行的程序；两种情形都只是不存在满足 $t \Downarrow v$ 的 $v$。这是类型安全性证明（[[programming-languages/type-systems]]）通常用小步来做的原因之一。

::: example 一个大步推导 {#ex-bigstep}
给出 $\mathsf{pred}\,(\mathsf{if}\ \mathsf{iszero}\ \mathsf{0}\ \mathsf{then}\ \mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})\ \mathsf{else}\ \mathsf{0}) \Downarrow \mathsf{succ}\ \mathsf{0}$ 的推导。
::: solution
从根出发，依项的形状与所需的值选取规则。

- 该项是 $\mathsf{pred}\ t_1$ 而结果应为 $\mathsf{succ}\ \mathsf{0} = nv$，所以最后一条规则是 B-PredSucc，且需要 $t_1 \Downarrow \mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})$。
- $t_1$ 是一个 $\mathsf{if}$；用 B-IfTrue，它需要 $\mathsf{iszero}\ \mathsf{0} \Downarrow \mathsf{true}$ 与 $\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0}) \Downarrow \mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})$。
- 前者由 $\mathsf{0} \Downarrow \mathsf{0}$（B-Value）经 B-IsZeroZero 得到；后者是 B-Value。

$$
\cfrac{\cfrac{\cfrac{\cfrac{}{\mathsf{0} \Downarrow \mathsf{0}}}{\mathsf{iszero}\ \mathsf{0} \Downarrow \mathsf{true}} \qquad \cfrac{}{\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0}) \Downarrow \mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})}}{\mathsf{if}\ \mathsf{iszero}\ \mathsf{0}\ \mathsf{then}\ \mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})\ \mathsf{else}\ \mathsf{0} \Downarrow \mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})}}{\mathsf{pred}\,(\mathsf{if}\ \ldots) \Downarrow \mathsf{succ}\ \mathsf{0}}
$$

推导的形状与 `evaluate` 的递归树一模一样；else 分支 $\mathsf{0}$ 在其中无处出现。同一项的小步轨迹需要三步：E-Pred(E-If(E-IsZeroZero))、E-Pred(E-IfTrue)、E-PredSucc。
:::
:::

两个操作语义是各自独立定义的。它们最好能够一致。

::: lemma 多步求值的同余性 {#lem-congruence}
若 $t_1 \to^* t_1'$，则 $\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 \to^* \mathsf{if}\ t_1'\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$，$\mathsf{succ}\ t_1 \to^* \mathsf{succ}\ t_1'$，$\mathsf{pred}\ t_1 \to^* \mathsf{pred}\ t_1'$ 且 $\mathsf{iszero}\ t_1 \to^* \mathsf{iszero}\ t_1'$。
:::

::: proof
对 $t_1 \to^* t_1'$ 的长度 $n$ 作归纳。$n = 0$ 时两边相等。否则 $t_1 \to s \to^* t_1'$，首步之后还有 $n - 1$ 步；同余规则（E-If、E-Succ、E-Pred 或 E-IsZero）把 $t_1 \to s$ 变成更大项的一步，其余各步由归纳假设补齐。
:::

::: lemma 扩张 {#lem-expansion}
若 $t \to t'$ 且 $t' \Downarrow v$，则 $t \Downarrow v$。此外，若 $u$ 是值且 $u \Downarrow w$，则 $w = u$。
:::

::: proof
先证第二个断言，对值 $u$ 作归纳：对 $\mathsf{true}$、$\mathsf{false}$ 与 $\mathsf{0}$，只有 B-Value 可用；对 $\mathsf{succ}\ nv$，要么 B-Value 给出 $w = u$，要么 B-Succ 给出 $w = \mathsf{succ}\ nv'$ 且 $nv \Downarrow nv'$，而归纳假设指出 $nv' = nv$。

第一个断言对 $t \to t'$ 的推导作归纳。

*E-IfTrue：* $t = \mathsf{if}\ \mathsf{true}\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$，$t' = t_2 \Downarrow v$；配上 $\mathsf{true} \Downarrow \mathsf{true}$（B-Value），B-IfTrue 给出 $t \Downarrow v$。E-IfFalse 同理。

*E-If：* $t = \mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$，$t_1 \to t_1'$。项 $t'$ 是一个 $\mathsf{if}$，不是值，所以它的推导以 B-IfTrue 或 B-IfFalse 结尾；设为 B-IfTrue，有 $t_1' \Downarrow \mathsf{true}$ 且 $t_2 \Downarrow v$。归纳假设把 $t_1' \Downarrow \mathsf{true}$ 变成 $t_1 \Downarrow \mathsf{true}$，B-IfTrue 便给出 $t \Downarrow v$。

*E-Succ：* $t = \mathsf{succ}\ t_1$，$t' = \mathsf{succ}\ t_1'$。若 $t' \Downarrow v$ 的推导是由 $t_1' \Downarrow nv$ 用 B-Succ 得到的，则归纳假设给出 $t_1 \Downarrow nv$，B-Succ 给出 $t \Downarrow \mathsf{succ}\ nv = v$。若推导是 B-Value，则 $t'$ 是值，于是 $t_1' = nv$ 是数值且 $v = t'$；由 $t_1 \to nv$ 与 $nv \Downarrow nv$，归纳假设给出 $t_1 \Downarrow nv$，B-Succ 给出 $t \Downarrow \mathsf{succ}\ nv = v$。

*E-PredSucc：* $t = \mathsf{pred}\,(\mathsf{succ}\ nv)$ 且 $t' = nv \Downarrow v$；由第二个断言 $v = nv$。B-Value 给出 $\mathsf{succ}\ nv \Downarrow \mathsf{succ}\ nv$，B-PredSucc 给出 $t \Downarrow nv$。

E-PredZero、E-IsZeroZero 与 E-IsZeroSucc 的情形与 E-PredSucc 相仿，E-Pred 与 E-IsZero 的情形与 E-If 相仿（项 $t'$ 不是值，所以它的推导以同一构造子的大步规则结尾，并把归纳假设用于其前提）。
:::

::: theorem 大步语义与小步语义一致 {#thm-big-small}
对每个项 $t$ 与每个值 $v$：$t \Downarrow v$ 当且仅当 $t \to^* v$。
:::

::: proof
($\Rightarrow$) 对 $t \Downarrow v$ 的推导作归纳。B-Value：$t = v$ 且 $v \to^* v$ 用零步。B-IfTrue：由归纳假设 $t_1 \to^* \mathsf{true}$ 与 $t_2 \to^* v$；再由 [[#lem-congruence]] 与 E-IfTrue 得 $\mathsf{if}\ t_1\ \ldots \to^* \mathsf{if}\ \mathsf{true}\ \ldots \to t_2 \to^* v$。B-IfFalse 对称。B-Succ：$t_1 \to^* nv$，故由同余 $\mathsf{succ}\ t_1 \to^* \mathsf{succ}\ nv$。B-PredSucc：$t_1 \to^* \mathsf{succ}\ nv$，故由同余与 E-PredSucc 得 $\mathsf{pred}\ t_1 \to^* \mathsf{pred}\,(\mathsf{succ}\ nv) \to nv$。规则 B-PredZero、B-IsZeroZero 与 B-IsZeroSucc 类似，配上相应的计算规则。

($\Leftarrow$) 对 $t \to^* v$ 的步数 $n$ 作归纳。$n = 0$ 时 $t = v$，B-Value 可用。$n > 0$ 时 $t \to t' \to^* v$，从 $t'$ 起还有 $n - 1$ 步；由归纳假设 $t' \Downarrow v$，再由 [[#lem-expansion]] 得 $t \Downarrow v$。
:::

## 指称语义

操作语义通过*运行*来解释含义。**指称语义**通过*翻译成数学*来解释含义：每个项都被映到一个数学对象——它的**指称**——所用的函数是语法上的结构递归。其定义性质是**组合性**：复合项的含义只取决于其各部分的含义，而不取决于它们的语法。

::: definition NB 的指称语义 {#def-denotation}
令 $D = \set{\mathrm{tt}, \mathrm{ff}} \cup \N \cup \set{\mathrm{wrong}}$。**语义函数** $[\![\cdot]\!] \colon \mathcal{T} \to D$ 定义为

$$
\begin{aligned}
[\![\mathsf{true}]\!] &= \mathrm{tt}, \qquad [\![\mathsf{false}]\!] = \mathrm{ff}, \qquad [\![\mathsf{0}]\!] = 0,\\
[\![\mathsf{succ}\ t]\!] &= \begin{cases} n + 1 & \text{当 } [\![t]\!] = n \in \N \\ \mathrm{wrong} & \text{否则} \end{cases}
\qquad
[\![\mathsf{pred}\ t]\!] = \begin{cases} \max(n - 1, 0) & \text{当 } [\![t]\!] = n \in \N \\ \mathrm{wrong} & \text{否则} \end{cases}\\
[\![\mathsf{iszero}\ t]\!] &= \begin{cases} \mathrm{tt} & \text{当 } [\![t]\!] = 0 \\ \mathrm{ff} & \text{当 } [\![t]\!] \in \N,\ [\![t]\!] > 0 \\ \mathrm{wrong} & \text{否则} \end{cases}
\qquad
[\![\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3]\!] = \begin{cases} [\![t_2]\!] & \text{当 } [\![t_1]\!] = \mathrm{tt} \\ [\![t_3]\!] & \text{当 } [\![t_1]\!] = \mathrm{ff} \\ \mathrm{wrong} & \text{否则。} \end{cases}
\end{aligned}
$$
:::

双方括号（"斯特雷奇括号"）把内部的语法与外部的数学隔开：$\mathsf{succ}$ 是一个符号，而 $n + 1$ 是自然数的加法。注意 $\mathsf{if}$ 被映为一个*分情形讨论*，而不是三部分都求值再挑选——$[\![\mathsf{if}\ \mathsf{true}\ \mathsf{then}\ \mathsf{0}\ \mathsf{else}\ \mathsf{succ}\ \mathsf{true}]\!] = 0$，而不是 $\mathrm{wrong}$。在 Python 中，语义函数是又一段结构递归，返回 Python 的布尔值与整数：

```python
WRONG = "wrong"
def denote(t):
    match t:
        case Tru(): return True
        case Fls(): return False
        case Zero(): return 0
        case Succ(u):
            n = denote(u)
            return n + 1 if type(n) is int else WRONG
        case Pred(u):
            n = denote(u)
            return max(n - 1, 0) if type(n) is int else WRONG
        case IsZero(u):
            n = denote(u)
            return n == 0 if type(n) is int else WRONG
        case If(c, a, b):
            v = denote(c)
            return denote(a) if v is True else denote(b) if v is False else WRONG
```

测试写作 `type(n) is int` 而非 `isinstance(n, int)`，因为在 Python 中 `bool` 是 `int` 的子类而 `isinstance(True, int)` 为真——这正是定义语言与被定义语言之间的混淆，而严谨的语义学正须避免这类混淆。

::: example 组合地计算指称 {#ex-denote}
计算 $t = \mathsf{if}\ \mathsf{iszero}\,(\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0}))\ \mathsf{then}\ \mathsf{succ}\,(\mathsf{pred}\ \mathsf{0})\ \mathsf{else}\ \mathsf{0}$ 的指称 $[\![t]\!]$，以及 $u = \mathsf{iszero}\,(\mathsf{if}\ \mathsf{0}\ \mathsf{then}\ \mathsf{0}\ \mathsf{else}\ \mathsf{0})$ 的指称，并与求值作比较。
::: solution
从叶结点自下而上进行；每一行只用到子项已经算出的含义。

- $[\![\mathsf{0}]\!] = 0$，故 $[\![\mathsf{succ}\ \mathsf{0}]\!] = 1$、$[\![\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0})]\!] = \max(0, 0) = 0$，且 $[\![\mathsf{iszero}\,(\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0}))]\!] = \mathrm{tt}$。
- $[\![\mathsf{pred}\ \mathsf{0}]\!] = \max(-1, 0) = 0$，且 $[\![\mathsf{succ}\,(\mathsf{pred}\ \mathsf{0})]\!] = 1$。
- 守卫的含义是 $\mathrm{tt}$，故 $[\![t]\!] = [\![\mathsf{succ}\,(\mathsf{pred}\ \mathsf{0})]\!] = 1$。

这与 [[#ex-trace]] 一致：那里 $t \to^* \mathsf{succ}\ \mathsf{0}$，而它的读法是 $1$。注意指称从不提及*步*：计算 $[\![t]\!]$ 时，守卫与 then 分支可以按我们喜欢的任何顺序处理，两个子计算彼此独立。

对 $u$：$[\![\mathsf{0}]\!] = 0$ 既不是 $\mathrm{tt}$ 也不是 $\mathrm{ff}$，故 $[\![\mathsf{if}\ \mathsf{0}\ \mathsf{then}\ \mathsf{0}\ \mathsf{else}\ \mathsf{0}]\!] = \mathrm{wrong}$，进而 $[\![u]\!] = \mathrm{wrong}$，因为 $\mathrm{wrong} \notin \N$。从操作语义看，$u$ 立刻卡住：E-IsZero 需要那个 $\mathsf{if}$ 走一步，而没有规则适用于守卫为 $\mathsf{0}$ 的 $\mathsf{if}$。组合性还告诉我们一些无需计算便知道的事：指称相同的任意两个项，可以在任何更大的项中互相替换而不改变其指称——$\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0})$ 可以在任何地方替换 $\mathsf{0}$。
:::
:::

为了把指称与求值作比较，把每个值读作 $D$ 中的一个元素：$\overline{\mathsf{true}} = \mathrm{tt}$、$\overline{\mathsf{false}} = \mathrm{ff}$，而对含 $n$ 次 $\mathsf{succ}$ 的数值有 $\overline{nv} = n$。不同的值有不同的读法。

::: theorem 充分性 {#thm-adequacy}
对每个项 $t$ 与每个值 $v$：$t \Downarrow v$ 当且仅当 $[\![t]\!] = \overline{v}$。特别地，$[\![t]\!] = \mathrm{wrong}$ 当且仅当 $t$ 求值到一个卡住的项。
:::

::: proof
($\Rightarrow$) 对 $t \Downarrow v$ 的推导作归纳。B-Value：对 $v$ 归纳，$[\![v]\!] = \overline{v}$（对 $\mathsf{succ}\ nv$：$[\![\mathsf{succ}\ nv]\!] = \overline{nv} + 1$）。B-IfTrue：由归纳假设 $[\![t_1]\!] = \mathrm{tt}$ 与 $[\![t_2]\!] = \overline{v}$，故 $[\![t]\!] = [\![t_2]\!] = \overline{v}$。B-Succ：$[\![t_1]\!] = \overline{nv} = n$ 且 $[\![\mathsf{succ}\ t_1]\!] = n + 1 = \overline{\mathsf{succ}\ nv}$。B-PredSucc：$[\![t_1]\!] = \overline{\mathsf{succ}\ nv} = n + 1$，故 $[\![\mathsf{pred}\ t_1]\!] = n = \overline{nv}$。其余规则是同样的计算。

($\Leftarrow$) 对 $t$ 作结构归纳，证明如下命题：若 $[\![t]\!] \ne \mathrm{wrong}$，则存在值 $v$ 使 $t \Downarrow v$ 且 $\overline{v} = [\![t]\!]$。由于值的读法互不相同，这个 $v$ 就是定理中的那个。常量：B-Value。$t = \mathsf{succ}\ t_1$：$[\![t]\!] \ne \mathrm{wrong}$ 意味着 $[\![t_1]\!] = n \in \N$；由归纳假设 $t_1 \Downarrow v_1$ 且 $\overline{v_1} = n$，于是 $v_1$ 是数值，B-Succ 给出 $t \Downarrow \mathsf{succ}\ v_1$，其读法为 $n + 1$。$t = \mathsf{pred}\ t_1$：$[\![t_1]\!] = n$；若 $n = 0$ 则 $t_1 \Downarrow \mathsf{0}$，B-PredZero 给出 $t \Downarrow \mathsf{0}$；若 $n > 0$ 则 $t_1 \Downarrow \mathsf{succ}\ nv$ 且 $\overline{nv} = n - 1$，B-PredSucc 给出 $t \Downarrow nv$。$\mathsf{iszero}$ 类似。$t = \mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$：$[\![t]\!] \ne \mathrm{wrong}$ 迫使 $[\![t_1]\!] \in \set{\mathrm{tt}, \mathrm{ff}}$；若为 $\mathrm{tt}$，归纳假设给出 $t_1 \Downarrow \mathsf{true}$ 以及满足 $\overline{v} = [\![t_2]\!] = [\![t]\!]$ 的 $t_2 \Downarrow v$，B-IfTrue 可用；$\mathrm{ff}$ 的情形对称。

至于最后一句：由 [[#thm-termination]] 与 [[#thm-determinacy]]，$t$ 的求值终结于唯一的范式；由 [[#thm-big-small]] 与刚证明的等价关系，该范式是值当且仅当 $[\![t]\!] \ne \mathrm{wrong}$。
:::

::: example 用穷举检验定理 {#ex-brute}
证明才是真正的论证，但机器检验能抓住规则与代码中的错误。生成一切深度不超过 $3$ 的 NB 项，比较三种语义。
::: solution
```python
from itertools import product
def terms(d):                       # 一切深度 <= d+1 的项
    if d == 0: return [Tru(), Fls(), Zero()]
    smaller = terms(d - 1)
    out = list(smaller)
    for u in smaller: out += [Succ(u), Pred(u), IsZero(u)]
    for c, a, b in product(smaller, repeat=3): out.append(If(c, a, b))
    return list(dict.fromkeys(out))  # 去重，保持顺序

ts = terms(2)
stuck = agree = 0
for t in ts:
    nf = list(trace(t))[-1]                       # 小步语义的范式
    try: big = evaluate(t)
    except Stuck: big = None
    d = denote(t)
    if is_value(nf):
        assert big == nf and as_py(nf) == d and type(as_py(nf)) is type(d)
        agree += 1
    else:
        assert big is None and d == WRONG
        stuck += 1
print(len(ts), "terms;", agree, "evaluate to values,", stuck, "get stuck")
```

```console
59439 terms; 14070 evaluate to values, 45369 get stuck
```

（`as_py` 把一个值读作 Python 的布尔值或整数，即定理中的 $\overline{v}$。）没有断言失败。项的个数是 $59439$，因为深度不超过 $2$ 的项有 $3 + 3 \cdot 3 + 3^3 = 39$ 个，再在外面套一层构造子后得到 $3 + 3 \cdot 39 + 39^3 = 59439$ 个。四分之三的项都会出错——这提示了我们为什么想要一个类型系统。
:::
:::

::: warning "实现怎么做，语义就是什么"
把语言的参考实现当作它的定义是很诱人的。但实现会固定一些偶然的细节——C 对函数实参的求值顺序、整数溢出时发生什么、某个编译器如何处理一次竞争——而定义对这些有意留而未决；实现也不能告诉你哪些行为是有保证的。形式语义说的是*每个*正确实现必须做什么，以及实现之间可以有何分歧（C 的"未指明"与"未定义"行为就是其语义中写明留出的缺口）。反过来，语义只有与现实相符才有用：Standard ML（1990 年，1997 年修订）从诞生起就是形式化定义的，而对 C、JavaScript 与 Python，形式语义（CompCert 的 C、KJS、λπ）是几十年后才写出的，并在实现和散文标准中发现了不一致。
:::

## 给出含义的其他途径

三种风格回答不同的问题。

| 风格 | 程序的含义 | 擅长 |
|---|---|---|
| 小步操作语义 | 机器状态的一个序列 | 类型安全、并发、非终止、抽象机 |
| 大步操作语义 | 程序与结果之间的关系 | 解释器、终止代码的编译器正确性 |
| 指称语义 | 一个数学对象，组合地 | 等式推理、证明两个程序相等、程序分析 |
| 公理语义 | 程序使其为真的断言 | 程序验证 |

**公理语义**通过关于语句执行前后何为真的证明规则来定义语言——即 [[program-design/abstraction-specifications]] 中的霍尔三元组（Hoare triple）$\set{P}\,S\,\set{Q}$。它对程序如何运行一言不发，只谈关于程序能证明什么。对含有循环与递归的语言，指称语义需要一套关于部分计算与无穷计算的理论：递归定义的含义是**域**（带最小元 $\bot$——"尚无信息"——的偏序集）上某个连续函数的最小不动点，这一理论由达纳·斯科特（Dana Scott）创立。我们将在 [[programming-languages/lambda-calculus]] 中具体遇到不动点。

风格的选择没有人们想象的那么重要，因为像 [[#thm-big-small]] 与 [[#thm-adequacy]] 这样的结果把它们彼此连通。成熟的语言定义往往采用两种：一个操作语义作为正式定义，再有一个指称语义或公理语义用于推理。

::: history
约翰·巴科斯（Backus）为 IAL 语法引入的记法（1959），经彼得·诺尔（Naur）在 *Report on the Algorithmic Language ALGOL 60*（1960，1963 年修订）中精炼，使上下文无关文法成为定义具体语法的标准方式——该记法被称为巴克斯-诺尔范式。语义的历程更慢。约翰·麦卡锡（McCarthy）的 "Towards a mathematical science of computation"（1962）提出抽象语法，并提出用一台解释器来定义语言；彼得·兰丁（Landin）的 SECD 机（1964）给出一台求值表达式的抽象机；罗伯特·弗洛伊德（Floyd，1967）与东尼·霍尔（Hoare，1969）创建了公理语义。克里斯托弗·斯特雷奇（Strachey）与达纳·斯科特（Scott）于 1969–1971 年间在牛津发展了指称语义（Scott 与 Strachey，"Toward a mathematical semantics for computer languages"，1971），其中斯科特的域论提供了数学基础。戈登·普洛特金（Plotkin）的奥胡斯讲义 *A Structural Approach to Operational Semantics*（1981）引入了本章所用的基于规则的小步风格，吉尔·卡恩（Kahn）的 "Natural semantics"（1987）则提出大步风格。*The Definition of Standard ML*（Milner、Tofte 与 Harper，1990）表明一个完整的、实用的语言可以用这种方式定义。
:::

## 后续内容

语言 NB 没有名字也没有函数。[[programming-languages/lambda-calculus]] 引入一个*只有*函数的语言并研究它的规约语义；[[programming-languages/interpreters]] 把大步规则变成带环境的求值器；[[programming-languages/type-systems]] 给 NB 与 λ-演算加上类型系统，并运用本章的小步语义以及反演与归纳论证，证明良类型项绝不会卡住。把具体语法分析成 AST 是编译器的第一个阶段（[[compilers]]）。

::: summary
- **具体语法**是文本，由文法描述；**抽象语法**是树，语义在树上定义（[[#def-ast]]）。项用归纳定义给出，由此得到**结构归纳**与**结构递归**（[[#thm-structural-induction]]）。
- **小步操作语义**是一组定义 $t \to t'$ 的推理规则：计算规则做实际的工作，同余规则规定求值发生在哪里（[[#def-step]]）。
- 对 NB，求值是**确定的**（[[#thm-determinacy]]）且**终止的**（[[#thm-termination]]）；每个项终结于一个值或一个**卡住的**项——运行时类型错误的形式模型（[[#def-stuck]]）。
- **大步语义**把项直接与它的值相联，读起来就是一台递归解释器；它与小步语义一致：$t \Downarrow v \iff t \to^* v$（[[#thm-big-small]]）。
- **指称语义**组合地把项映为数学对象；**充分性**把它与求值联系起来（[[#thm-adequacy]]）。
- 关于语义的证明按项或按推导作归纳，并对最后使用的规则逐情形进行——这就是其后每一章的方法。
:::

## 习题

::: exercise 数步数 {level=1 check="3"}
用小步规则求值 $\mathsf{pred}\,(\mathsf{if}\ \mathsf{iszero}\ \mathsf{0}\ \mathsf{then}\ \mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})\ \mathsf{else}\ \mathsf{0})$，标明每一步使用的规则。（输入步数。）
::: solution
1. E-Pred(E-If(E-IsZeroZero))：$\mathsf{pred}\,(\mathsf{if}\ \mathsf{true}\ \mathsf{then}\ \mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})\ \mathsf{else}\ \mathsf{0})$。
2. E-Pred(E-IfTrue)：$\mathsf{pred}\,(\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0}))$。
3. E-PredSucc，其中 $nv = \mathsf{succ}\ \mathsf{0}$：$\mathsf{succ}\ \mathsf{0}$，是值。

共三步，与 [[#ex-bigstep]] 的大步推导以及 [[#thm-termination]] 都吻合（该项的大小为 $8$，故至多可能走 $7$ 步）。
:::
:::

::: exercise 分析树 {level=1 check="5"}
在二义文法 $E \to E - E \mid n$ 之下，串 `1 - 2 - 3 - 4` 有多少棵不同的抽象语法树？它们给出多少种不同的值？（输入树的棵数。）
::: solution
四个操作数的树就是带三个内部结点的二叉树；这种树的棵数是卡特兰数 $C_3 = 5$。它们是 $((1-2)-3)-4 = -8$、$(1-(2-3))-4 = -2$、$(1-2)-(3-4) = 0$、$1-((2-3)-4) = 6$ 与 $1-(2-(3-4)) = -2$，给出四个不同的值。真正的文法会让 `-` 左结合，从而只生成第一棵树。
:::
:::

::: exercise 值、范式与卡住的项 {level=1}
把每个项归类为值、能走一步的非值（给出该步）或卡住的：(a) $\mathsf{succ}\,(\mathsf{pred}\ \mathsf{0})$；(b) $\mathsf{iszero}\,(\mathsf{succ}\ \mathsf{true})$；(c) $\mathsf{if}\ \mathsf{false}\ \mathsf{then}\ \mathsf{true}\ \mathsf{else}\ \mathsf{succ}\ \mathsf{0}$；(d) $\mathsf{pred}\,(\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0}))$；(e) $\mathsf{succ}\,(\mathsf{succ}\ \mathsf{false})$。
::: solution
(a) 用 E-Succ(E-PredZero) 走到 $\mathsf{succ}\ \mathsf{0}$。(b) 卡住的：E-IsZeroSucc 需要形如 $\mathsf{succ}\ nv$ 且 $nv$ 为数值的项，而 E-IsZero 需要 $\mathsf{succ}\ \mathsf{true}$ 走一步，这又需要 $\mathsf{true}$ 走一步。(c) 用 E-IfFalse 走到 $\mathsf{succ}\ \mathsf{0}$。(d) 用 E-PredSucc 走到 $\mathsf{succ}\ \mathsf{0}$。(e) 卡住的，原因与 (b) 相同；它不是值，因为 $\mathsf{false}$ 不是数值。
:::
:::

::: exercise 有多少个项？ {level=2 check="59439"}
设 $s_k$ 为深度不超过 $k$ 的项的个数（常量的深度为 $1$）。求 $s_k$ 的递推式，并计算 $s_3$，即 [[#ex-brute]] 中检验的项数。（输入 $s_3$。）
::: solution
深度不超过 $k + 1$ 的项是一个常量（$3$ 种选择），或 $\mathsf{succ}$、$\mathsf{pred}$、$\mathsf{iszero}$ 作用于深度不超过 $k$ 的项（$3 s_k$ 种选择），或一个带三个这样子项的 $\mathsf{if}$（$s_k^3$ 种选择）。这些全是互不相同的树，故 $s_{k+1} = 3 + 3 s_k + s_k^3$，$s_1 = 3$。于是 $s_2 = 3 + 9 + 27 = 39$，$s_3 = 3 + 117 + 59319 = 59439$，与程序的输出一致。
:::
:::

::: exercise 缺失的边条件 {level=2}
假设把 E-PredSucc 换成对*任意*项 $t_1$ 的规则 $\mathsf{pred}\,(\mathsf{succ}\ t_1) \to t_1$。证明 [[#thm-determinacy]] 不成立。对这个项，求值的最终结果会变吗？
::: solution
取 $t = \mathsf{pred}\,(\mathsf{succ}\,(\mathsf{pred}\ \mathsf{0}))$。新规则给出 $t \to \mathsf{pred}\ \mathsf{0}$。而 E-Pred 的前提 $\mathsf{succ}\,(\mathsf{pred}\ \mathsf{0}) \to \mathsf{succ}\ \mathsf{0}$ 由 E-Succ(E-PredZero) 成立，故给出 $t \to \mathsf{pred}\,(\mathsf{succ}\ \mathsf{0})$。两者不同，于是单步求值不再确定。两条路都继续走到 $\mathsf{0}$——此处结果恰好相同——但修改后的规则使 $\mathsf{pred}\,(\mathsf{succ}\ \mathsf{true}) \to \mathsf{true}$，于是一个原本卡住的项现在求值成一个布尔值：语言已经改变。边条件正是用来强制执行实参的按值求值的。
:::
:::

::: exercise 两个推导 {level=2}
证明 $\mathsf{succ}\ \mathsf{0} \Downarrow \mathsf{succ}\ \mathsf{0}$ 有两个不同的推导。这是否与"大步求值是确定的"——即 $t \Downarrow v$ 且 $t \Downarrow w$ 蕴含 $v = w$——这一断言矛盾？证明该断言。
::: solution
一个推导直接用 B-Value；另一个是把 B-Succ 作用于 $\mathsf{0} \Downarrow \mathsf{0}$（B-Value）。规则在形如 $\mathsf{succ}\ nv$ 的值上重叠，所以推导不唯一——但确定性说的是*结果*，不是推导。证明：若 $t \Downarrow v$ 且 $t \Downarrow w$，则由 [[#thm-big-small]] 有 $t \to^* v$ 与 $t \to^* w$。由 [[#thm-determinacy]]，从 $t$ 出发的求值序列只有一条，而值是范式（[[#lem-values-normal]]），故 $v$ 与 $w$ 都是它的末项：$v = w$。（对 $t \Downarrow v$ 的推导直接作归纳的证明也行，在重叠情形使用 [[#lem-expansion]] 的第二部分。）
:::
:::

::: exercise 添加加法 {level=2}
给 NB 加上项 $t_1 + t_2$。给出 (a) 先求值左操作数、再求值右操作数、最后相加的小步规则；(b) 一条大步规则；(c) 指称语义的子句。然后用 Python 扩展 `step`，求值 $(\mathsf{succ}\ \mathsf{0}) + (\mathsf{pred}\,(\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})))$。
::: solution
(a) 两条同余规则与两条计算规则（通过搬移 `succ` 在一进制下相加）：

$$
\frac{t_1 \to t_1'}{t_1 + t_2 \to t_1' + t_2}
\qquad
\frac{t_2 \to t_2'}{nv_1 + t_2 \to nv_1 + t_2'}
\qquad
\frac{}{\mathsf{0} + nv_2 \to nv_2}
\qquad
\frac{}{\mathsf{succ}\ nv_1 + nv_2 \to \mathsf{succ}\,(nv_1 + nv_2)}
$$

第二条规则只在左操作数是数值时触发，这就固定了从左到右的顺序并使求值保持确定。(b) $\dfrac{t_1 \Downarrow nv_1 \quad t_2 \Downarrow nv_2}{t_1 + t_2 \Downarrow nv}$，其中 $nv$ 是满足 $\overline{nv} = \overline{nv_1} + \overline{nv_2}$ 的数值。(c) 若 $[\![t_1]\!] = m \in \N$ 且 $[\![t_2]\!] = n \in \N$，则 $[\![t_1 + t_2]\!] = m + n$；否则为 $\mathrm{wrong}$。

```python
@dataclass(frozen=True)
class Add: l: object; r: object
# step 中新增的分支，放在最后的 raise 之前：
        case Add(Zero(), r) if is_nv(r):          return r
        case Add(Succ(l), r) if is_nv(l) and is_nv(r): return Succ(Add(l, r))
        case Add(l, r) if is_nv(l):               return Add(l, step(r))
        case Add(l, r):                           return Add(step(l), r)
```

示例：$\mathsf{succ}\ \mathsf{0} + \mathsf{pred}\,(\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})) \to \mathsf{succ}\ \mathsf{0} + \mathsf{succ}\ \mathsf{0} \to \mathsf{succ}\,(\mathsf{0} + \mathsf{succ}\ \mathsf{0}) \to \mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})$，即值 $2$。注意第三个计算步骤是在 $\mathsf{0} + nv_2$ 规则外面套了 E-Succ。用原来的大小函数，[[#thm-termination]] 不再成立（$\mathsf{succ}$ 规则没有使项变小）；改用给每个 $+$ 结点计以 $1$ 加上其左操作数的大小的度量，即可修复。
:::
:::

::: exercise 终止界是紧的 {level=3}
证明对每个 $n \ge 1$，存在大小为 $n$ 的项，其求值恰需 $n - 1$ 步，从而 [[#thm-termination]] 无法改进。再证明对每个 $n \ge 3$，还存在大小为 $n$、立刻卡住（走 $0$ 步）且不是值的项。
::: solution
令 $p_n = \mathsf{pred}^{\,n-1}\,\mathsf{0}$，即对 $\mathsf{0}$ 施加 $n - 1$ 次 $\mathsf{pred}$；它的大小是 $n$。对 $n$ 归纳可知它恰用 $n - 1$ 步到达 $\mathsf{0}$：$p_1 = \mathsf{0}$ 用 $0$ 步；$n \ge 2$ 时 $p_n = \mathsf{pred}\ p_{n-1}$，只要 $p_{n-1}$ 还不是 $\mathsf{0}$，$p_n$ 的每一步都是套在 $p_{n-1}$ 某一步外面的 E-Pred（由确定性，只有这些步），需 $n - 2$ 步得到 $\mathsf{pred}\ \mathsf{0}$；再一步（E-PredZero）得到 $\mathsf{0}$。总共 $n - 1$ 步。

至于卡住的项：$\mathsf{succ}^{\,n-2}\,(\mathsf{succ}\ \mathsf{true})$ 的大小为 $n$，不是值（它在 $\mathsf{succ}$ 之下含有 $\mathsf{true}$），且处于范式：归纳可知，每个 $\mathsf{succ}$ 只有当它的参数能走一步时才能走一步，而最内层的 $\mathsf{succ}\ \mathsf{true}$ 不能走。
:::
:::

::: exercise 求值上下文 {level=3}
小步语义的另一种表述使用**求值上下文**——带一个洞 $[\,]$ 的项：

$$
E \;::=\; [\,] \mid \mathsf{if}\ E\ \mathsf{then}\ t\ \mathsf{else}\ t \mid \mathsf{succ}\ E \mid \mathsf{pred}\ E \mid \mathsf{iszero}\ E,
$$

把 $t$ 放入洞中所得的项记为 $E[t]$，并只保留一条同余规则：若 $r \to_c r'$ 由六条计算规则之一得到，则 $E[r] \to E[r']$。证明这样定义的 $\to$ 与 [[#def-step]] 相同。
::: solution
($\subseteq$) 设有 $E[r] \to E[r']$ 且 $r \to_c r'$。对 $E$ 归纳：若 $E = [\,]$，该步就是计算规则本身。若 $E = \mathsf{if}\ E_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$，归纳假设给出原系统中的 $E_1[r] \to E_1[r']$，再用 E-If 提升到 $E[r] \to E[r']$；其余上下文形状分别用 E-Succ、E-Pred 与 E-IsZero。

($\supseteq$) 对原系统中 $t \to t'$ 的推导作归纳。计算规则即 $E = [\,]$ 的情形。若最后一条规则是 E-If，则 $t = \mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$ 且 $t_1 \to t_1'$；由归纳假设，对某个上下文 $E_1$ 与计算步 $r \to_c r'$ 有 $t_1 = E_1[r]$、$t_1' = E_1[r']$，于是对 $E = \mathsf{if}\ E_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$ 有 $t = E[r]$、$t' = E[r']$。其余同余规则同理。

上下文的文法是对求值顺序的紧凑陈述：洞可以出现在守卫与参数中，绝不出现在分支中。费莱森（Felleisen）与希布（Hieb）（1992）用这一表述为控制算子给出了简单的语义——[[programming-languages/control]] 的主题——因为求值上下文恰是"计算的其余部分"。
:::
:::
