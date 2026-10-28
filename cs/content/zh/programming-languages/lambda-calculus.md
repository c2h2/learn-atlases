剥掉一门程序设计语言中一切非本质的东西。数可以去掉：它们可以由别的东西表示。布尔值与条件可以去掉。循环可以去掉，因为递归可以取而代之；连带名字的定义也可以去掉。阿隆佐·丘奇（Alonzo Church）认为，剩下的只有一个思想——通过抽象变量，从一个表达式造出一个函数，再把函数应用于一个实参。由此得到的语言——**λ-演算**（lambda calculus）——只有三种项和一条计算规则，然而它能表达每个可计算函数。

λ-演算之于程序员，重要性有三。它是函数式语言的核心：Lisp、ML、Haskell、Scheme 以及 Python 的 `lambda` 都是它的后代，它们的语义靠翻译成它来解释。它是语言思想的标准实验室：类型系统（[[programming-languages/type-systems]]）、类型推断（[[programming-languages/type-inference]]）、多态与续延都是先在一个 λ-演算上定义的。它还把程序员非正式使用的各个概念——自由变量与约束变量、代入、求值顺序——变得精确，而 [[programming-languages/interpreters]] 中的解释器必须把这些概念处理正确。本章定义这个演算、证明其关键性质、演示如何在其中编码数据与递归，并用 Python 实现一个规约器。

## 项、约束与代入

::: definition λ-项 {#def-lambda-terms}
给定一个无穷**变量**集 $x, y, z, \ldots$，**λ-项** 由

$$
t \;::=\; x \;\mid\; \lambda x.\,t \;\mid\; t\ t
$$

——一个变量；一个**抽象** $\lambda x.\,t$，即以 $x$ 为**形参**、$t$ 为**体**的函数；以及一个**应用** $t_1\ t_2$，即函数 $t_1$ 作用于实参 $t_2$。
:::

这套记法极为精简，因此阅读它需要一些约定。应用左结合：$f\ x\ y$ 意为 $(f\ x)\ y$。抽象的体尽量向右延伸：$\lambda x.\,x\ y$ 意为 $\lambda x.\,(x\ y)$ 而非 $(\lambda x.\,x)\ y$。多个抽象可以缩写：$\lambda x\,y.\,t$ 意为 $\lambda x.\,\lambda y.\,t$。函数只接受一个实参；二元函数是一个返回函数的函数（**柯里化**（currying），见 [[program-design/higher-order-functions]]）。Python 的项 `lambda x: lambda y: x` 就是 $\lambda x\,y.\,x$。

这里没有数，也没有内建运算。最简单的项是恒等式 $I = \lambda x.\,x$、常函数生成器 $K = \lambda x\,y.\,x$、自应用 $\omega = \lambda x.\,x\ x$ 以及 $\Omega = \omega\ \omega$。

::: definition 自由变量与约束变量 {#def-free}
$\lambda x.\,t$ 中 $x$ 的一次出现被该抽象**约束**，$\lambda x$ 称为它的**约束词**（binder）。**自由变量**的集合是

$$
\mathrm{FV}(x) = \set{x}, \qquad \mathrm{FV}(\lambda x.\,t) = \mathrm{FV}(t) \setminus \set{x}, \qquad \mathrm{FV}(t_1\ t_2) = \mathrm{FV}(t_1) \cup \mathrm{FV}(t_2).
$$

不含自由变量的项是**封闭**的，也称**组合子**（combinator）。$x$ 的一次出现指的是包围它的最近的 $\lambda x$；内层约束词会**屏蔽**外层约束词，所以在 $\lambda x.\,\lambda x.\,x$ 中，体里的 $x$ 指的是内层的 $\lambda x$。
:::

例如 $\mathrm{FV}(\lambda x.\,x\ (\lambda y.\,y\ z)\ y) = \set{y, z}$：第一个 $y$ 被 $\lambda y$ 约束，最后一个 $y$ 是自由的。同一个项里，一个变量既可以自由出现也可以约束出现。

约束变量的名字无关紧要：$\lambda x.\,x$ 与 $\lambda y.\,y$ 是同一个函数，恰如 $\int_0^1 x^2\,dx = \int_0^1 y^2\,dy$，也如 `def f(x): return x` 与 `def f(y): return y` 含义相同。

::: definition α-等价 {#def-alpha}
**α-转换**给约束变量改名：当 $y$ 不在 $t$ 中时，$\lambda x.\,t$ 变为 $\lambda y.\,t[x := y]$。两个项若能由子项的若干次 α-转换互相转化，则称它们 **α-等价**，记 $t \equiv_\alpha u$。此后我们把 α-等价的项视作同一个。
:::

于是 $\lambda x\,y.\,x \equiv_\alpha \lambda y\,x.\,y$（两者都返回第一个实参），但 $\lambda x\,y.\,x \not\equiv_\alpha \lambda x\,y.\,y$；并且 $\lambda x.\,x\ z \not\equiv_\alpha \lambda z.\,z\ z$：把 $x$ 改名为 $z$ 会*捕获*自由的 $z$。捕获是这门学问的核心技术隐患。

::: definition 避免捕获的代入 {#def-subst}
把 $s$ **代入** $t$ 中 $x$ 的自由出现所得的结果 $t[x := s]$ 定义为

$$
\begin{aligned}
x[x := s] &= s, \qquad y[x := s] = y \quad (y \ne x), \qquad (t_1\ t_2)[x := s] = t_1[x := s]\ t_2[x := s],\\
(\lambda x.\,t)[x := s] &= \lambda x.\,t,\\
(\lambda y.\,t)[x := s] &= \lambda y.\,t[x := s] \quad \text{当 } y \ne x \text{ 且 } y \notin \mathrm{FV}(s),\\
(\lambda y.\,t)[x := s] &= \lambda z.\,t[y := z][x := s] \quad \text{当 } y \ne x,\ y \in \mathrm{FV}(s)\text{，且 } z \text{ 为新变元。}
\end{aligned}
$$

一个**新变元**（fresh）是指不在 $s$、$t$ 或 $x$ 中出现的变量。
:::

第二行在 $x$ 的约束词处停下，因为其中 $x$ 的出现不是自由的。最后一行在代入之前先给约束词改名，以保证 $s$ 的自由变量保持自由。没有这一行，$(\lambda y.\,x)[x := y]$ 会给出 $\lambda y.\,y$，把一个常函数变成了恒等函数。这条规则陈述容易、写进代码却容易出错——Lisp 最初的实现就出过错——而代入中的错误至今仍是手写解释器和宏展开器里的常见缺陷。Python 实现：

```python
from dataclasses import dataclass
import itertools

@dataclass(frozen=True)
class Var: name: str
@dataclass(frozen=True)
class Lam: param: str; body: object
@dataclass(frozen=True)
class App: fun: object; arg: object

def free_vars(t):
    match t:
        case Var(x):    return {x}
        case Lam(x, b): return free_vars(b) - {x}
        case App(f, a): return free_vars(f) | free_vars(a)

def fresh(x, avoid):
    for i in itertools.count(1):
        if f"{x}{i}" not in avoid:
            return f"{x}{i}"

def subst(t, x, s):
    """Capture-avoiding substitution t[x := s]."""
    match t:
        case Var(y):                   return s if y == x else t
        case App(f, a):                return App(subst(f, x, s), subst(a, x, s))
        case Lam(y, b) if y == x:      return t           # x 被屏蔽
        case Lam(y, b) if y not in free_vars(s):
                                       return Lam(y, subst(b, x, s))
        case Lam(y, b):                                   # 先给 y 改名
            z = fresh(y, free_vars(s) | free_vars(b) | {x})
            return Lam(z, subst(subst(b, y, Var(z)), x, s))
```

```console
>>> show(subst(parse("λy. x y"), "x", parse("y")))
'λy1. y y1'
```

被代入的那个自由的 `y` 保持自由；约束的 `y` 被改名为 `y1`。（`parse` 与 `show` 在上述 λ-记号与这些数据类之间转换。）

## β-规约

::: definition β-规约 {#def-beta}
形如 $(\lambda x.\,t)\ s$ 的项称为一个 **β-红子**（redex）；它的**收缩项**（contractum）是 $t[x := s]$。**单步 β-规约**关系 $t \to_\beta t'$ 成立，当 $t'$ 由 $t$ 把其中*任意一个*红子替换为它的收缩项得到：

$$
\frac{}{(\lambda x.\,t)\ s \to_\beta t[x := s]}
\qquad
\frac{t \to_\beta t'}{\lambda x.\,t \to_\beta \lambda x.\,t'}
\qquad
\frac{t_1 \to_\beta t_1'}{t_1\ t_2 \to_\beta t_1'\ t_2}
\qquad
\frac{t_2 \to_\beta t_2'}{t_1\ t_2 \to_\beta t_1\ t_2'}
$$

$\to_\beta^*$ 是其自反-传递闭包，**β-等价** $=_\beta$ 是包含 $\to_\beta$ 的最小等价关系。不含红子的项处于 **β-范式**。
:::

β-规约是"调用一个函数"的 λ-演算版本：在体中把形参换成实参。与 [[programming-languages/syntax-semantics]] 的语义不同，这里的规则允许*任何地方*的规约，包括抽象内部和尚未用到的实参内部；该关系不是确定的。还有一条辅助规则 **η-规约**：当 $x \notin \mathrm{FV}(t)$ 时 $\lambda x.\,t\ x \to_\eta t$，它表达一个函数由其结果决定（在 Python 中，`lambda x: f(x)` 的行为就是 `f`）；除非另有说明，我们只用 β。

::: example 规约各项 {#ex-reduce}
尽可能把下列各项规约到范式：(a) $(\lambda x\,y.\,x)\ a\ b$；(b) $(\lambda x\,y.\,x)\ y$；(c) $\Omega = (\lambda x.\,x\ x)\,(\lambda x.\,x\ x)$；(d) $(\lambda x.\,z)\ \Omega$。
::: solution
(a) $(\lambda x\,y.\,x)\ a\ b = ((\lambda x.\,\lambda y.\,x)\ a)\ b \to_\beta (\lambda y.\,a)\ b \to_\beta a$。函数 $K$ 返回它的第一个实参。

(b) $(\lambda x.\,\lambda y.\,x)\ y \to_\beta (\lambda y.\,x)[x := y]$。约束词 $y$ 在实参中自由，所以要改名：结果是 $\lambda y_1.\,y$，一个返回自由 $y$ 的常函数。朴素答案 $\lambda y.\,y$ 是错的。

(c) $\Omega \to_\beta (x\ x)[x := \lambda x.\,x\ x] = \Omega$。唯一的红子再现该项自身，于是 $\Omega \to_\beta \Omega \to_\beta \cdots$ 永无止境：$\Omega$ 没有范式。一个 λ-项即使没有任何循环构造也可能永远运行。

(d) 有两个红子：外层那个，以及 $\Omega$ 内部那个。收缩外层那个会丢弃实参：$(\lambda x.\,z)\ \Omega \to_\beta z$，是范式。收缩内层那个又得到 $(\lambda x.\,z)\ \Omega$。所以红子的*选择*决定了我们能否到达范式。
:::
:::

### 合流性

第 (d) 部分引出一个担忧。既然选择不同的红子会通向不同的地方，一个项会不会有两个不同的范式——两个不同的"答案"？λ-演算的基本定理说不。

::: theorem 丘奇-罗瑟定理 {#thm-church-rosser}
若 $t \to_\beta^* u_1$ 且 $t \to_\beta^* u_2$，则存在项 $w$ 使 $u_1 \to_\beta^* w$ 且 $u_2 \to_\beta^* w$。（关系 $\to_\beta$ 是**合流的**。）
:::

显然的证明尝试会失败：单步规约不具有"菱形性质"——两个单步不能再用两个单步汇合到一个公共项。在 $(\lambda x.\,x\ x)\,(I\ I)$ 中，收缩外层红子会把内层红子 $I\ I$ 复制两份，而两份都还需要规约。下面这个证明归功于威廉·泰特（Tait）与佩尔·马丁-勒夫（Martin-Löf），并采用高桥雅子（Takahashi，1995）的简化形式：用一个一次收缩许多红子的关系代替单步规约。

::: definition 并行规约 {#def-parallel}
**并行规约**关系 $t \Rightarrow t'$ 定义为

$$
\frac{}{x \Rightarrow x}
\qquad
\frac{t \Rightarrow t'}{\lambda x.\,t \Rightarrow \lambda x.\,t'}
\qquad
\frac{t_1 \Rightarrow t_1' \quad t_2 \Rightarrow t_2'}{t_1\ t_2 \Rightarrow t_1'\ t_2'}
\qquad
\frac{t \Rightarrow t' \quad s \Rightarrow s'}{(\lambda x.\,t)\ s \Rightarrow t'[x := s']}
$$

**完全发展** $t^*$ 收缩 $t$ 中存在的每个红子：$x^* = x$，$(\lambda x.\,t)^* = \lambda x.\,t^*$，$((\lambda x.\,t)\ s)^* = t^*[x := s^*]$，而当 $t_1$ 不是抽象时 $(t_1\ t_2)^* = t_1^*\ t_2^*$。
:::

::: proof 证明 [[#thm-church-rosser]]
*第 1 步：$\to_\beta \subseteq {\Rightarrow} \subseteq \to_\beta^*$，从而 $\Rightarrow^* = \to_\beta^*$。* 对项归纳可知每个 $t$ 都有 $t \Rightarrow t$。单个 β-步只收缩一个红子、其余部分原封不动，这正是一个在其他各处都用 $t \Rightarrow t$ 的并行步。反过来，一个并行步收缩有穷多个红子，这些红子可以一个一个地收缩（对 $t \Rightarrow t'$ 的推导归纳）。

*第 2 步：代入。* 若 $t \Rightarrow t'$ 且 $s \Rightarrow s'$，则 $t[x := s] \Rightarrow t'[x := s']$。对 $t \Rightarrow t'$ 的推导归纳。变量情形是显然的（$x$ 给出 $s \Rightarrow s'$；另一个变量保持不变）；抽象与应用情形由归纳假设推出（先把约束变量改名为互不相同者）。对最后一条规则，$t = (\lambda y.\,u)\ v \Rightarrow u'[y := v'] = t'$，归纳假设给出 $u[x := s] \Rightarrow u'[x := s']$ 与 $v[x := s] \Rightarrow v'[x := s']$；对 $\Rightarrow$ 应用 β-规则，

$$
t[x := s] = (\lambda y.\,u[x := s])\ v[x := s] \Rightarrow u'[x := s'][y := v'[x := s']] = u'[y := v'][x := s'] = t'[x := s'],
$$

其中中间的等式是标准的代入引理 $u[x := a][y := b[x := a]] = u[y := b][x := a]$（当 $y \ne x$、$y \notin \mathrm{FV}(a)$ 时成立），它对 $u$ 作机械归纳即可证明。

*第 3 步：三角形。* 若 $t \Rightarrow t'$，则 $t' \Rightarrow t^*$。对 $t \Rightarrow t'$ 的推导归纳。变量：$x \Rightarrow x = x^*$。抽象：由归纳假设。β-规则：$t = (\lambda x.\,u)\ s$ 且 $t' = u'[x := s']$，其中 $u \Rightarrow u'$、$s \Rightarrow s'$；由归纳假设 $u' \Rightarrow u^*$ 且 $s' \Rightarrow s^*$，于是第 2 步给出 $t' \Rightarrow u^*[x := s^*] = t^*$。应用 $t_1\ t_2 \Rightarrow t_1'\ t_2'$：若 $t_1$ 不是抽象，则 $t^* = t_1^*\ t_2^*$，归纳假设配上应用规则即够。若 $t_1 = \lambda x.\,u$，则 $t_1' = \lambda x.\,u'$ 且 $u \Rightarrow u'$（抽象只有抽象规则可用），且由归纳假设 $u' \Rightarrow u^*$、$t_2' \Rightarrow t_2^*$；$\Rightarrow$ 的 β-规则给出 $(\lambda x.\,u')\ t_2' \Rightarrow u^*[x := t_2^*] = t^*$。

*第 4 步：菱形与铺贴。* 由第 3 步，若 $t \Rightarrow u_1$ 且 $t \Rightarrow u_2$，则 $u_1 \Rightarrow t^*$ 且 $u_2 \Rightarrow t^*$：关系 $\Rightarrow$ 有菱形性质。具有菱形性质的关系，其自反-传递闭包合流——给定 $t \Rightarrow^m u_1$ 与 $t \Rightarrow^n u_2$，对 $m + n$ 归纳，逐格拼出一个 $m \times n$ 的菱形网格。由第 1 步 $\Rightarrow^* = \to_\beta^*$，故 $\to_\beta$ 合流。
:::

::: corollary 范式的唯一性 {#cor-unique-nf}
一个项至多有一个 β-范式（在 α-等价意义下）。此外，若 $t =_\beta u$ 且 $u$ 已处于范式，则 $t \to_\beta^* u$。
:::

::: proof
先证 $t =_\beta u$ 蕴含 $t$ 与 $u$ 有公共规约项。关系 $=_\beta$ 由形如 $t = t_0, t_1, \ldots, t_n = u$ 的链生成，链中每对相邻项由 $\to_\beta$ 沿某一方向相关联；对 $n$ 归纳。$n = 0$ 时取 $w = t$。否则，由归纳假设存在 $w'$ 使 $t \to_\beta^* w'$ 且 $t_{n-1} \to_\beta^* w'$。若 $t_n \to_\beta t_{n-1}$，则 $t_n \to_\beta^* w'$，$w'$ 就是 $t$ 与 $u$ 的公共规约项。若 $t_{n-1} \to_\beta t_n$，则把 [[#thm-church-rosser]] 用于 $t_{n-1} \to^* w'$ 与 $t_{n-1} \to^* t_n$，得 $w$ 使 $w' \to^* w$ 且 $t_n \to^* w$，于是 $t \to^* w' \to^* w$。若 $u$ 是范式，$u$ 唯一的规约项是它自身，故 $w = u$ 且 $t \to_\beta^* u$。若 $t$ 有两个范式 $u_1, u_2$，则 $u_1 =_\beta u_2$，故二者有公共规约项，而它必须同时等于两者：$u_1 = u_2$。
:::

于是 λ-演算是一个相容的计算理论：一个项的"答案"（范式），若存在，不依赖于我们如何计算。它同时也是非平凡的：$\lambda x\,y.\,x \ne_\beta \lambda x\,y.\,y$，因为它们是彼此不同的范式。合流性并*不*说每种规约顺序都能找到范式；[[#ex-reduce]](d) 就给出了一种永远找不到的。

::: widget graph
nodes: A@0,2; B@1,3; C@1,1; D@2,3.5; E@2,2.5; F@3,2; G@4,2
edges: A>B; A>C; B>D; B>E; C>F; D>F; E>F; F>G
algorithm: bfs
start: A
caption: $A = (\lambda x.\,x\ x)\,(I\ I)$（$I = \lambda z.\,z$）的完整 β-规约图（在 α-等价意义下，由 Python 枚举所有红子算出）。$B = (I\ I)\,(I\ I)$，$C = (\lambda x.\,x\ x)\ I$，$D = I\,(I\ I)$，$E = (I\ I)\ I$，$F = I\ I$，$G = I$。每条路径都终结于 $G$，正如合流性所要求的；但单步的菱形不成立：从 $B$ 与 $C$ 出发，最近的公共规约项是 $F$，它距 $C$ 一步、距 $B$ 两步。运行广度优先搜索看看最短的规约（三步，经过 $C$）——先收缩实参省下了复制的工作。
:::

## 求值策略

**规约策略**决定收缩哪个红子。程序设计语言会固定一种策略；这是其语义的一部分。

::: definition 规约策略 {#def-strategies}
- **正规序**（normal order）：总是收缩最左、最外层的红子（文本中 $\lambda$ 位于最左的那个红子），包括抽象之下的红子。
- **应用序**（applicative order）：收缩最左、最内层的红子——实参先被规约到范式，然后才应用函数。
- **按名调用**（call-by-name）：正规序，但绝不在抽象内部规约；抽象就是最终的值。
- **按值调用**（call-by-value）：只当实参 $v$ 是一个**值**（此处：一个抽象）时才收缩 $(\lambda x.\,t)\ v$；先求值函数，再求值实参，从左到右，且绝不在抽象内部。
:::

按值调用是 Python、OCaml、Scheme、Java 与多数语言的策略；按名调用经共享细化为**按需求调用**（call-by-need，即"惰性求值"），是 Haskell 的策略。后两种是*弱*策略——它们遇到抽象就停下，即使抽象体中还有红子，恰如 Python 在被调用之前不会执行 `lambda: 1/0` 的体。

::: theorem 标准化定理（库里（Curry）与费斯（Feys），1958） {#thm-standardisation}
若一个项有 β-范式，则正规序规约会到达它。
:::

证明从略；它需要对红子如何被创建与复制作精细的分析（见巴伦德雷格特（Barendregt）*The Lambda Calculus*，§11.4）。正规序之所以安全，是因为它从不规约函数将会丢弃的实参。应用序与按值调用则不然：在 $(\lambda x.\,z)\ \Omega$ 上，它们永远规约 $\Omega$。正规序的代价是重复劳动：在 $(\lambda x.\,x\ x)\,(I\ I)$ 中，它先收缩外层红子、复制了 $I\ I$，然后对两份分别规约（四步而不是三步）。按需求调用共享实参并至多求值它一次，既保住了安全性，又免去了复制。

正规序规约器是定义的直接转录。它先试最外层的红子，再试函数部分，再试实参，再试体：

```python
def step_normal(t):
    """One normal-order step, or None if t is in normal form."""
    match t:
        case App(Lam(x, b), a):
            return subst(b, x, a)
        case App(f, a):
            f2 = step_normal(f)
            if f2 is not None: return App(f2, a)
            a2 = step_normal(a)
            return None if a2 is None else App(f, a2)
        case Lam(x, b):
            b2 = step_normal(b)
            return None if b2 is None else Lam(x, b2)
        case Var(_):
            return None

def normalise(t, limit=100000):
    n = 0
    while (t2 := step_normal(t)) is not None:
        t, n = t2, n + 1
        if n >= limit: raise RuntimeError("no normal form found")
    return t, n
```

`limit` 是必要的：由 [[theory-of-computation/decidability]] 中的不可判定性结果，没有程序能判定一个 λ-项是否有范式——事实上这正是第一个被证明的不可判定问题，由丘奇（Church）于 1936 年证明。

::: quiz
哪些策略能把 $(\lambda x.\,y)\,((\lambda z.\,z\ z)\,(\lambda z.\,z\ z))$ 规约到范式 $y$？
- [x] 正规序
- [x] 按名调用
- [ ] 应用序
- [ ] 按值调用
::: solution
正规序与按名调用先收缩外层红子，这就丢弃实参 $\Omega$，一步得到 $y$。应用序与按值调用坚持先规约实参，而 $\Omega$ 只能规约到它自身，所以它们永无休止。由 [[#thm-standardisation]]，只要有任何策略能成功，正规序就能成功。
:::
:::

## 在 λ-演算中编程

程序设计语言的其余一切都可以*只用函数*来**编码**。思想是用一段数据能*做什么*来表示这段数据：一个布尔值在两个候选之间做选择，一个序对把它的分量交给一个函数，一个数 $n$ 把一个函数应用 $n$ 次。

### 布尔值与序对

$$
\mathsf{true} = \lambda t\,f.\,t, \qquad \mathsf{false} = \lambda t\,f.\,f, \qquad \mathsf{if} = \lambda b\,x\,y.\,b\ x\ y,
$$

$$
\mathsf{pair} = \lambda a\,b\,s.\,s\ a\ b, \qquad \mathsf{fst} = \lambda p.\,p\ \mathsf{true}, \qquad \mathsf{snd} = \lambda p.\,p\ \mathsf{false}.
$$

于是 $\mathsf{if}\ \mathsf{true}\ M\ N \to_\beta^* \mathsf{true}\ M\ N \to_\beta^* M$，且 $\mathsf{fst}\,(\mathsf{pair}\ M\ N) \to_\beta^* \mathsf{pair}\ M\ N\ \mathsf{true} \to_\beta^* \mathsf{true}\ M\ N \to_\beta^* M$。在正规序下，$\mathsf{if}\ \mathsf{true}\ M\ N$ 从不求值 $N$——条件表达式免费获得惰性。

### 丘奇数

::: definition 丘奇数 {#def-church-numerals}
$n \in \N$ 的**丘奇数**（Church numeral）是 $c_n = \lambda f\,x.\,f^n\,x$，其中 $f^0\,x = x$，$f^{n+1}\,x = f\,(f^n\,x)$。于是 $c_0 = \lambda f\,x.\,x$，$c_1 = \lambda f\,x.\,f\ x$，$c_2 = \lambda f\,x.\,f\,(f\ x)$。算术运算定义为

$$
\begin{aligned}
\mathsf{succ} &= \lambda n\,f\,x.\,f\,(n\ f\ x), &
\mathsf{plus} &= \lambda m\,n\,f\,x.\,m\ f\,(n\ f\ x), &
\mathsf{times} &= \lambda m\,n\,f.\,m\,(n\ f),\\
\mathsf{iszero} &= \lambda n.\,n\,(\lambda z.\,\mathsf{false})\ \mathsf{true}, &
\mathsf{pred} &= \lambda n.\,\mathsf{fst}\,(n\ \Phi\ (\mathsf{pair}\ c_0\ c_0)), &
\Phi &= \lambda p.\,\mathsf{pair}\,(\mathsf{snd}\ p)\,(\mathsf{succ}\,(\mathsf{snd}\ p)).
\end{aligned}
$$
:::

数的函数 $F$ 是 **λ-可定义**的，若存在项 $\overline{F}$ 使 $\overline{F}\ c_{n_1} \cdots c_{n_k} =_\beta c_{F(n_1, \ldots, n_k)}$。我们证明其中两个情形；其余按同样的模式进行。

::: lemma 迭代 {#lem-iterate}
对所有项 $F, X$ 与所有 $n$：$c_n\ F\ X \to_\beta^* F^n\,X$。
:::

::: proof
$c_n\ F\ X = (\lambda f.\,\lambda x.\,f^n\,x)\ F\ X \to_\beta (\lambda x.\,F^n\,x)\ X \to_\beta F^n\,X$，其中约束变量事先取为对 $F$ 与 $X$ 新鲜（α-转换），因而不会触发任何改名。
:::

::: theorem 加法与乘法是 λ-可定义的 {#thm-arith}
对所有 $m, n \in \N$：$\mathsf{plus}\ c_m\ c_n \to_\beta^* c_{m+n}$ 且 $\mathsf{times}\ c_m\ c_n \to_\beta^* c_{mn}$。
:::

::: proof
*加法。* 两个 β-步给出 $\mathsf{plus}\ c_m\ c_n \to_\beta^* \lambda f\,x.\,c_m\ f\,(c_n\ f\ x)$。体中，[[#lem-iterate]] 把 $c_n\ f\ x$ 规约为 $f^n\,x$，进而把 $c_m\ f\,(f^n\,x)$ 规约为 $f^m\,(f^n\,x) = f^{m+n}\,x$。于是该项规约为 $\lambda f\,x.\,f^{m+n}\,x = c_{m+n}$。

*乘法。* 两个 β-步给出 $\lambda f.\,c_m\,(c_n\ f)$，再在内部一步，$c_m\,(c_n\ f) \to_\beta \lambda x.\,(c_n\ f)^m\,x$。对 $k$ 归纳证明 $(c_n\ f)^k\,x \to_\beta^* f^{nk}\,x$。$k = 0$ 时两边都是 $x$。$k + 1$ 时：$(c_n\ f)^{k+1}\,x = c_n\ f\,((c_n\ f)^k\,x) \to_\beta^* c_n\ f\,(f^{nk}\,x)$，这里用到归纳假设（在实参内部规约），再由 [[#lem-iterate]] 得 $f^n\,(f^{nk}\,x) = f^{n(k+1)}\,x$。取 $k = m$，该项就规约为 $\lambda f\,x.\,f^{mn}\,x = c_{mn}$。
:::

前驱函数更难，因为一个数只能把某个函数多应用若干次，不能少应用。克林（Kleene）的技巧（据他本人说，是 1932 年在牙医诊所里想到的）是数序对：$\Phi$ 把 $(a, b)$ 映为 $(b, b + 1)$，于是对 $(0, 0)$ 应用 $n$ 次，当 $n \ge 1$ 时得到 $(n - 1, n)$（$n = 0$ 时得 $(0, 0)$），再由 $\mathsf{fst}$ 取出 $n - 1$。

::: example 手算 2 的前驱 {#ex-pred-hand}
证明 $\mathsf{pred}\ c_2 =_\beta c_1$，在序对的层面推理，而不把每一项写出来。
::: solution
先是关于 $\Phi$ 的一个事实：对任意项 $a, b$，

$$
\Phi\,(\mathsf{pair}\ a\ b) \to_\beta \mathsf{pair}\,(\mathsf{snd}\,(\mathsf{pair}\ a\ b))\,(\mathsf{succ}\,(\mathsf{snd}\,(\mathsf{pair}\ a\ b))) \to_\beta^* \mathsf{pair}\ b\ (\mathsf{succ}\ b),
$$

其中两次用到 $\mathsf{snd}\,(\mathsf{pair}\ a\ b) \to_\beta^* b$。于是

$$
\begin{aligned}
\mathsf{pred}\ c_2 &\to_\beta \mathsf{fst}\,(c_2\ \Phi\ (\mathsf{pair}\ c_0\ c_0)) \to_\beta^* \mathsf{fst}\,(\Phi\,(\Phi\,(\mathsf{pair}\ c_0\ c_0)))\\
&\to_\beta^* \mathsf{fst}\,(\Phi\,(\mathsf{pair}\ c_0\ (\mathsf{succ}\ c_0))) \to_\beta^* \mathsf{fst}\,(\mathsf{pair}\,(\mathsf{succ}\ c_0)\,(\mathsf{succ}\,(\mathsf{succ}\ c_0)))\\
&\to_\beta^* \mathsf{succ}\ c_0 \to_\beta^* c_1.
\end{aligned}
$$

第二步用了 [[#lem-iterate]]。最后一步是 $\mathsf{succ}\ c_0 = (\lambda n\,f\,x.\,f\,(n\ f\ x))\,(\lambda f\,x.\,x) \to \lambda f\,x.\,f\,((\lambda f\,x.\,x)\ f\ x) \to^* \lambda f\,x.\,f\ x$。我们是按自己挑选的次序对子项作推理的；[[#thm-church-rosser]] 保证任何其它次序——比如规约器的正规序——都终结于同一个范式 $c_1$。规约器对这个项需要 $26$ 步。
:::
:::

::: example 运行丘奇算术 {#ex-church-run}
把定义载入正规序规约器，计算 $2 + 3$、$2 \times 3$ 与 $3$ 的前驱，并统计步数。
::: solution
每个定义都被解析，并把早先的定义代入其名字之下，于是 $\mathsf{pred}$ 成为一个大的封闭项。`num(k)` 构造 $c_k$，`unnum` 把一个数读回来。

```python
define("zero",  r"λf x. x")
define("succ",  r"λn f x. f (n f x)")
define("plus",  r"λm n f x. m f (n f x)")
define("times", r"λm n f. m (n f)")
define("true",  r"λt f. t");  define("false", r"λt f. f")
define("pair",  r"λa b s. s a b")
define("fst",   r"λp. p true");  define("snd", r"λp. p false")
define("pred",  r"λn. fst (n (λp. pair (snd p) (succ (snd p))) (pair zero zero))")
for name, args in [("plus", (2, 3)), ("times", (2, 3)), ("pred", (3,))]:
    t = defs[name]
    for a in args: t = App(t, num(a))
    nf, n = normalise(t)
    print(f"{name}{args}: {unnum(nf)} in {n} steps")
```

```console
plus(2, 3): 5 in 6 steps
times(2, 3): 6 in 7 steps
pred(3,): 2 in 36 steps
```

由 [[#cor-unique-nf]]，答案不依赖于策略；依赖策略的只有步数。对 $\mathsf{plus}$，六步之中：两步是代入 $c_2$ 与 $c_3$，接着 $c_2\ f\ (\ldots)$ 用两步、$c_3\ f\ x$ 用两步——正是 [[#thm-arith]] 的证明按部就班。
:::
:::

::: widget plot
f: 10*x + 6
x: 0, 8
y: 0, 90
labels: 10n + 6
points: 0,9; 1,16; 2,26; 3,36; 4,46; 5,56; 6,66; 7,76; 8,86
caption: 用 Kleene 的定义计算 $\mathsf{pred}\ c_n$ 所需的正规序 β-步数，用上面的规约器实测得到（圆点），$n = 0, \ldots, 8$。从 $n = 1$ 起，步数恰为 $10n + 6$：$n$ 次 $\Phi$ 应用中每次花费固定数目的步。丘奇数的前驱耗时与 $n$ 成线性——这提醒我们：编码证明的是*表达能力*而非效率，这正是真实的语言要内置数的原因。
:::

### 递归与不动点

要写阶乘，我们希望 $\mathsf{fact} = \lambda n.\,\mathsf{if}\,(\mathsf{iszero}\ n)\ c_1\ (\mathsf{times}\ n\ (\mathsf{fact}\,(\mathsf{pred}\ n)))$，但 λ-项不能以名字自指。取而代之，对递归调用作抽象：$G = \lambda r\,n.\,\mathsf{if}\,(\mathsf{iszero}\ n)\ c_1\ (\mathsf{times}\ n\ (r\,(\mathsf{pred}\ n)))$。我们要的是一个满足 $\mathsf{fact} =_\beta G\ \mathsf{fact}$ 的项 $\mathsf{fact}$——$G$ 的一个**不动点**（fixed point）。

::: theorem 不动点定理 {#thm-fixed-point}
令 $Y = \lambda f.\,(\lambda x.\,f\,(x\ x))\,(\lambda x.\,f\,(x\ x))$。对每个项 $F$，$Y\ F =_\beta F\,(Y\ F)$。从而每个 λ-项都有不动点。
:::

::: proof
令 $W = \lambda x.\,F\,(x\ x)$，其中 $x \notin \mathrm{FV}(F)$。则 $Y\ F \to_\beta W\ W \to_\beta F\,(W\ W)$。又有 $F\,(Y\ F) \to_\beta F\,(W\ W)$，这是在实参内部规约。两个项有公共规约项 $F\,(W\ W)$，故 $Y\ F =_\beta F\,(Y\ F)$。
:::

注意 $Y\ F$ 并不*规约到* $F\,(Y\ F)$；两者只是汇合。（图灵（Turing）的组合子 $\Theta$——见习题——则确实规约到它。）取 $\mathsf{fact} = Y\ G$，就有 $\mathsf{fact}\ c_n =_\beta G\ \mathsf{fact}\ c_n$，它每被需要一次就展开递归的一层。在正规序下，$\mathsf{fact}\ c_3$ 在 $1495$ 步之内到达 $c_6$。

在按值调用下，$Y$ 毫无用处：$Y\ G \to W\ W \to G\,(W\ W)$，而实参 $W\ W$ 不是值，于是按值调用要规约它，得到 $G\,(G\,(W\ W))$，如此永无休止。补救办法是对自应用作 η-展开，使它成为一个值、只在被调用时才展开：

$$
Z = \lambda f.\,(\lambda x.\,f\,(\lambda v.\,x\ x\ v))\,(\lambda x.\,f\,(\lambda v.\,x\ x\ v)).
$$

::: example Python 中的不动点 {#ex-z-python}
Python 是按值调用的，而它的 `lambda` 就是 λ-演算的抽象。用 $Z$ 在没有任何具名递归的情况下计算 $10!$，并看看用 $Y$ 会发生什么。再检验一下丘奇数。
::: solution
```python
zero  = lambda f: lambda x: x
succ  = lambda n: lambda f: lambda x: f(n(f)(x))
plus  = lambda m: lambda n: lambda f: lambda x: m(f)(n(f)(x))
times = lambda m: lambda n: lambda f: m(n(f))
to_int = lambda n: n(lambda k: k + 1)(0)      # 把 "+1" 对 0 应用 n 次
two, three = succ(succ(zero)), succ(succ(succ(zero)))
print(to_int(plus(two)(three)), to_int(times(two)(three)), to_int(three(times(two))(succ(zero))))

Z = lambda f: (lambda x: f(lambda v: x(x)(v)))(lambda x: f(lambda v: x(x)(v)))
fact = Z(lambda r: lambda n: 1 if n == 0 else n * r(n - 1))
print(fact(10))
Y = lambda f: (lambda x: f(x(x)))(lambda x: f(x(x)))
try:
    Y(lambda r: lambda n: 1 if n == 0 else n * r(n - 1))
except RecursionError as e:
    print("RecursionError:", e)
```

```console
5 6 8
3628800
RecursionError: maximum recursion depth exceeded
```

`three(times(two))(succ(zero))` 把"乘 $2$"对 $1$ 应用三次，得到 $2^3 = 8$。`fact` 的定义中不含任何对 `fact` 的引用：`r` 就是递归调用，由 `Z` 提供。至于 `Y`，Python 一应用 `Y` 就求值 `x(x)`——那时 `f` 还从未被调用——于是递归直到栈溢出为止。在我们的按值调用规约器里同样会发生符号意义上的爆炸：$30$ 步之后，项 $Y\ G'\ c_3$（其中 $G'$ 是阶乘之体）已增长到 $3677$ 个结点且还在增长；而用 $Z$（并把条件表达式的两个分支裹进 $\lambda d.\,\ldots$，以免按值调用把两者都求值）$\mathsf{fact}\ c_3$ 在 $164$ 步之内到达一个值。
:::
:::

::: warning λ-演算不是"不过是 Python 的 lambda"
Python 的 `lambda` 是按值调用的，从不在约束词下规约，并且生活在一个含有可修改变量的语言里，所以它的闭包捕获的是*变量*而非值（[[program-design/higher-order-functions]] 中后期绑定带来的意外）。纯粹的 λ-演算根本没有赋值，允许在任何地方规约，并把 α-等价的项视作同一个。演算中成立的等式——例如对每个 $M$ 都有 $(\lambda x.\,z)\ M =_\beta z$——在 $M$ 循环或抛出异常的 Python 中就不成立。当你用演算去推理一门真实的语言时，请使用带有该语言策略的变体（对 Python 或 ML，用 Plotkin 的按值调用 λ-演算，1975）。
:::

### 表达能力

把数、序对、条件与 $Y$ 组合起来，每个部分递归函数都是 λ-可定义的（克林（Kleene），1936），而图灵（Turing）（1937）证明了 λ-可定义的函数恰是图灵可计算的。λ-演算与 [[theory-of-computation/turing-machines]] 中的图灵机定义同一个函数类：这一一致正是丘奇-图灵论题背后的证据。

::: history
阿隆佐·丘奇（Church）于 1928–1932 年前后引入 λ-记号，作为逻辑的一个基础；他的学生斯蒂芬·克莱尼（Kleene）与 J. 巴克利·罗瑟（Rosser）在 1935 年证明该基础不相容，纯粹的 λ-演算则存活下来。丘奇与罗瑟在 "Some properties of conversion"（1936）中证明了合流性；丘奇的 "An unsolvable problem of elementary number theory"（1936）用这个演算给出了第一个不可判定问题。丘奇的专著 *The Calculi of Lambda-Conversion*（1941）以及他的简单类型演算——"A formulation of the simple theory of types"（1940）——相继问世。哈斯克尔·库里（Curry）发展了密切相关的组合子逻辑；库里与费斯（Feys）的 *Combinatory Logic*（1958）证明了标准化定理。约翰·麦卡锡（McCarthy）的 LISP（1960）借用了 λ-记号；彼得·兰丁（Landin）（"The mechanical evaluation of expressions"，1964，以及 "A correspondence between ALGOL 60 and Church's lambda-notation"，1965）展示了如何靠翻译成它来解释真实的程序设计语言；达纳·斯科特（Scott）在 1969 年为它建立了数学模型。亨克·巴伦德雷格特（Barendregt）的 *The Lambda Calculus: Its Syntax and Semantics*（1981，1984 年修订）是标准参考书。
:::

## 后续内容

[[programming-languages/interpreters]] 高效地实现按值调用的 λ-演算，用环境与闭包取代代入。[[programming-languages/scope-binding]] 回到真实语言中的约束变量、屏蔽与捕获，并引入 de Bruijn 下标——一种无名字的表示，使 α-等价成为纯粹的句法相等。[[programming-languages/type-systems]] 加上类型；在简单类型演算中 $\Omega$ 与 $Y$ 无法被类型化，而每个项都有范式。[[programming-languages/control]] 的续延传递风格是 λ-演算上的一个变换。

::: summary
- λ-项是变量、抽象 $\lambda x.\,t$ 与应用 $t\ t$（[[#def-lambda-terms]]）；约束的名字无关紧要（**α-等价**，[[#def-alpha]]）。
- **代入**必须避免捕获自由变量，必要时给约束词改名（[[#def-subst]]）；**β-规约**在项中任何地方把 $(\lambda x.\,t)\ s$ 收缩为 $t[x := s]$（[[#def-beta]]）。
- **丘奇-罗瑟定理**：β-规约是合流的（[[#thm-church-rosser]]），故范式唯一（[[#cor-unique-nf]]）；并非每个项都有范式（$\Omega$）。
- 策略：**正规序**在有范式时总能找到它（[[#thm-standardisation]]）；**按值调用**（多数语言）与**按名/按需求调用**（Haskell）是遇到抽象即停的弱策略。
- 数据可以编码为函数：布尔值做选择，序对交出分量，**丘奇数**负责迭代（[[#def-church-numerals]]、[[#thm-arith]]）。
- 递归来自不动点组合子：$Y\ F =_\beta F\,(Y\ F)$（[[#thm-fixed-point]]）；按值调用的语言需要 η-展开的 $Z$。
- λ-演算是图灵完备的，所以"一个项是否有范式"不可判定。
:::

## 习题

::: exercise 自由变量 {level=1 check="3"}
求 $t = (\lambda x.\,x\ y)\,(\lambda y.\,y\ x)\ (\lambda z.\,w)$ 的 $\mathrm{FV}(t)$。（输入自由变量的个数。）
::: solution
$\mathrm{FV}(\lambda x.\,x\ y) = \set{y}$，$\mathrm{FV}(\lambda y.\,y\ x) = \set{x}$，$\mathrm{FV}(\lambda z.\,w) = \set{w}$。应用的自由变量是并集：$\set{x, y, w}$，三个变量。注意 $x$ 与 $y$ 都既（在一个子项中）约束出现，又（在另一个子项中）自由出现。
:::
:::

::: exercise 手算代入 {level=1}
计算 (a) $(\lambda y.\,x\ y)[x := z]$；(b) $(\lambda y.\,x\ y)[x := y]$；(c) $(\lambda x.\,x\ y)[x := z]$；(d) $(\lambda z.\,\lambda y.\,z\ x)[x := y\ z]$。
::: solution
(a) $\lambda y.\,z\ y$ —— 没有冲突。(b) 约束词 $y$ 在实参 $y$ 中自由，所以要改名：$\lambda y_1.\,y\ y_1$（即上面程序的答案）。(c) $x$ 被该抽象约束，故什么都不变：$\lambda x.\,x\ y$。(d) 约束词 $z$ 与 $y$ 都在 $y\ z$ 中自由，所以两个都要改名：$\lambda z_1.\,\lambda y_1.\,z_1\,(y\ z)$。
:::
:::

::: exercise 数 β-步 {level=1 check="6"}
用正规序规约把 $\mathsf{plus}\ c_2\ c_3$ 规约到范式，写出每一项。（输入步数。）
::: solution
1. $(\lambda m\,n\,f\,x.\,m\ f\,(n\ f\ x))\ c_2\ c_3 \to (\lambda n\,f\,x.\,c_2\ f\,(n\ f\ x))\ c_3$
2. $\to \lambda f\,x.\,c_2\ f\,(c_3\ f\ x)$
3. 此时最左最外的红子是体中的 $c_2\ f$：$\to \lambda f\,x.\,(\lambda x'.\,f\,(f\ x'))\,(c_3\ f\ x)$
4. $\to \lambda f\,x.\,f\,(f\,(c_3\ f\ x))$
5. $\to \lambda f\,x.\,f\,(f\,((\lambda x'.\,f\,(f\,(f\ x')))\ x))$
6. $\to \lambda f\,x.\,f\,(f\,(f\,(f\,(f\ x)))) = c_5$

六步，与程序报告的相符。
:::
:::

::: exercise 布尔运算符 {level=2}
在丘奇布尔值上定义 $\mathsf{not}$、$\mathsf{and}$ 与 $\mathsf{or}$，并验证 $\mathsf{and}\ \mathsf{true}\ \mathsf{false} \to_\beta^* \mathsf{false}$ 与 $\mathsf{not}\ \mathsf{false} \to_\beta^* \mathsf{true}$。
::: solution
$\mathsf{not} = \lambda b.\,b\ \mathsf{false}\ \mathsf{true}$，$\mathsf{and} = \lambda a\,b.\,a\ b\ \mathsf{false}$，$\mathsf{or} = \lambda a\,b.\,a\ \mathsf{true}\ b$（每一个都是"若 $a$ 则……否则……"）。于是 $\mathsf{and}\ \mathsf{true}\ \mathsf{false} \to^* \mathsf{true}\ \mathsf{false}\ \mathsf{false} = (\lambda t\,f.\,t)\ \mathsf{false}\ \mathsf{false} \to^* \mathsf{false}$，且 $\mathsf{not}\ \mathsf{false} \to \mathsf{false}\ \mathsf{false}\ \mathsf{true} \to^* \mathsf{true}$。与 Python 的 `and` 一样，这个 $\mathsf{and}$ 在正规序下当 $a$ 为 $\mathsf{false}$ 时不求值 $b$。
:::
:::

::: exercise 乘方 {level=2}
证明对所有 $m \ge 0$ 与 $n \ge 1$ 有 $c_n\ c_m \to_\beta^* c_{m^n}$——把一个数应用于另一个数就是在算乘方。（$n = 0$ 时结果是 $\lambda x.\,x$；证明它与 $c_1$ η-等价。）
::: solution
把 $c_m\,(c_m\,(\cdots(c_m\,g)))$（$c_m$ 共 $k$ 份）记作 $c_m^k\,g$。对 $k \ge 1$ 归纳证明：对每个项 $g$ 有 $c_m^k\,g \to_\beta^* \lambda y.\,g^{m^k}\,y$。

$k = 1$ 时，$c_m\ g \to_\beta \lambda y.\,g^m\,y$ 直接成立。$k + 1$ 时：$c_m^{k+1}\,g = c_m\,(c_m^k\,g) \to_\beta^* c_m\ h$，其中 $h = \lambda y.\,g^{m^k}\,y$，这里把归纳假设用在实参内部。于是 $c_m\ h \to_\beta \lambda x.\,h^m\,x$，再对内层 $j$ 归纳得 $h^j\,x \to_\beta^* g^{m^k j}\,x$：$j = 0$ 时两边都是 $x$，而 $h^{j+1}\,x = h\,(h^j\,x) \to^* h\,(g^{m^k j}\,x) \to_\beta g^{m^k}\,(g^{m^k j}\,x)$。取 $j = m$ 即得 $c_m^{k+1}\,g \to^* \lambda x.\,g^{m^{k+1}}\,x$。

现在 $c_n\ c_m = (\lambda f.\,\lambda x.\,f^n\,x)\ c_m \to_\beta \lambda x.\,c_m^n\,x$，而取 $g = x$、$k = n$ 的断言把体规约为 $\lambda y.\,x^{m^n}\,y$，故 $c_n\ c_m \to_\beta^* \lambda x\,y.\,x^{m^n}\,y = c_{m^n}$。$n = 0$ 时：$c_0\ c_m \to_\beta \lambda x.\,x$，而 $c_1 = \lambda f.\,\lambda x.\,f\ x \to_\eta \lambda f.\,f$，在 α-等价意义下就是 $\lambda x.\,x$。在 Python 中，`to_int(three(two))` 打印 `8` $= 2^3$，`to_int(two(three))` 打印 `9` $= 3^2$：被应用的那个数就是指数。
:::
:::

::: exercise 策略与 Ω {level=2}
(a) 证明 $\Omega$ 没有范式。(b) 找一个既有范式又有无穷规约序列的项，并说出哪些策略能找到范式。(c) 找一个项，它的正规序规约到达同一范式所花的步数比按值调用规约更多。
::: solution
(a) $\Omega$ 恰有一个红子（它自身；两个 $\omega$ 都不含红子，因为 $x\ x$ 不是红子），收缩它又得到 $\Omega$。所以每条规约序列都是 $\Omega \to \Omega \to \cdots$，其中没有一项是范式。(b) $(\lambda x.\,y)\ \Omega$：收缩外层红子得到范式 $y$，而总是收缩内层红子则死循环。正规序与按名调用找到 $y$；应用序与按值调用死循环。(c) $(\lambda x.\,x\ x)\,(I\ I)$：正规序要四步（$\to (I\ I)\,(I\ I) \to I\,(I\ I) \to I\ I \to I$），按值调用只要三步（$\to (\lambda x.\,x\ x)\ I \to I\ I \to I$），因为正规序复制了未求值的实参——见前面的规约图。
:::
:::

::: exercise 图灵的不动点组合子 {level=2}
令 $A = \lambda x\,y.\,y\,(x\ x\ y)$，$\Theta = A\ A$。证明对每个 $F$ 有 $\Theta\ F \to_\beta^* F\,(\Theta\ F)$——这是一次规约，而不像 $Y$ 那样只是 β-等价。
::: solution
$\Theta\ F = (\lambda x.\,\lambda y.\,y\,(x\ x\ y))\ A\ F \to_\beta (\lambda y.\,y\,(A\ A\ y))\ F \to_\beta F\,(A\ A\ F) = F\,(\Theta\ F)$。两步，而且结果字面上含有 $\Theta\ F$。相形之下，$Y\ F \to^* F\,(W\ W)$，而 $W\ W$ 不是 $Y\ F$（它是 $Y\ F$ 的一个规约项）。图灵于 1937 年发表了 $\Theta$。这一性质对惰性展开递归的实现很重要：$\Theta\ F$ 可以按需一次次地靠规约展开。
:::
:::

::: exercise α-等价的实现 {level=3}
写一个 Python 函数 `alpha_eq(t, u)`，在**不**改名任何东西的前提下判定两个 λ-项（用 `Var`、`Lam`、`App` 类）是否 α-等价，并用下列各对测试：$\lambda x.\,x$ 与 $\lambda y.\,y$；$\lambda x\,y.\,x$ 与 $\lambda y\,x.\,y$；$\lambda x\,y.\,x$ 与 $\lambda x\,y.\,y$；$\lambda x.\,x\ z$ 与 $\lambda z.\,z\ z$；$\lambda x.\,\lambda x.\,x$ 与 $\lambda y.\,\lambda z.\,z$ 以及 $\lambda y.\,\lambda z.\,y$。
::: solution
同步地走完两个项，维护一个由"在*同一位置*成对引入的约束词"组成的表，最内层在前。两个变量匹配，当且仅当它们最内层的约束词恰好两两成对，或者两者都自由且同名。

```python
def alpha_eq(t, u, env=()):
    """env: pairs (x, y) of variables bound together, innermost first."""
    match t, u:
        case Var(x), Var(y):
            for a, b in env:
                if a == x or b == y:          # x 或 y 的最内层约束词
                    return a == x and b == y  # ……必须是同一对
            return x == y                     # 两者都自由：同名
        case Lam(x, b1), Lam(y, b2):
            return alpha_eq(b1, b2, ((x, y),) + env)
        case App(f1, a1), App(f2, a2):
            return alpha_eq(f1, f2, env) and alpha_eq(a1, a2, env)
    return False
```

```console
λx. x        λy. y        True
λx y. x      λy x. y      True
λx y. x      λx y. y      False
λx. x z      λy. y z      True
λx. x z      λz. z z      False
λx. λx. x    λy. λz. z    True
λx. λx. x    λy. λz. y    False
```

测试 `a == x or b == y` 正是处理屏蔽与捕获的关键：在 $\lambda x.\,x\ z$ 与 $\lambda z.\,z\ z$ 的对比中，右边第二个 $z$ 被对 $(x, z)$ 约束，而左边的 $z$ 是自由的，所以两者不同。正确性对 $t$ 归纳，其不变式为：`env` 记录了从根到当前位置路径上的约束词。对 `env` 的扫描使该函数最坏情形代价为平方级；[[programming-languages/scope-binding]] 介绍 de Bruijn 下标，有了它，α-等价就是普通的相等。
:::
:::

::: exercise 相等的项到达范式 {level=3}
证明合流性的两个推论。(a) 若 $t =_\beta u$，则 $t$ 有范式当且仅当 $u$ 有范式。(b) 项 $\mathsf{true}$ 与 $\mathsf{false}$ 不 β-等价；由此推出，若在演算中加入等式 $\mathsf{true} = \mathsf{false}$，一切项都将相等。
::: solution
(a) 设 $u$ 的范式为 $n$，即 $u =_\beta n$。则 $t =_\beta u =_\beta n$，由 [[#cor-unique-nf]] 得 $t \to_\beta^* n$；故 $t$ 有范式。反之由对称性。

(b) $\mathsf{true} = \lambda t\,f.\,t$ 与 $\mathsf{false} = \lambda t\,f.\,f$ 是不同的范式（不 α-等价：一个返回第一个形参，另一个返回第二个）。若它们 β-等价，由 [[#cor-unique-nf]]（取 $u$ 为范式 $\mathsf{false}$）将有 $\mathsf{true} \to_\beta^* \mathsf{false}$；但范式只能规约到自身。若把 $\mathsf{true} = \mathsf{false}$ 作为公理加入（并对等式推理的通常规则封闭），则对任意项 $M, N$：$M =_\beta \mathsf{true}\ M\ N = \mathsf{false}\ M\ N =_\beta N$，于是任意两项都相等。正是合流性表明 λ-演算在这一意义下是相容的。
:::
:::
