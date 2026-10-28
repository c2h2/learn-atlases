[[programming-languages/type-systems]] 中的简单类型 λ-演算要求每个形参都带类型标注。对小型例子这只是小麻烦，但标注会成倍增多：函数复合 $\lambda f.\,\lambda g.\,\lambda x.\,f\,(g\ x)$ 必须为每一种类型组合各写一遍，每遍带三个标注。然而在 OCaml 或 Haskell 中，你只要写

```text
let compose f g x = f (g x)
```

完全不写类型（这是一行示意性的 OCaml 代码），编译器便报告 `val compose : ('a -> 'b) -> ('c -> 'a) -> 'c -> 'b`——一个覆盖该函数一切使用方式的类型，而且是自动求得的。本章解释其中的道理。**类型推断**（或**类型重构**）根据程序中变量的使用方式，算出程序可以具有的类型。该算法把类型化归结为用**合一**求解类型之间的方程，而结果堪称惊人：每个可类型化的程序都有一个**主类型**，它是程序最一般的类型，程序的其余类型都是它的实例。加上 **let 绑定的多态**就得到 ML 与 Haskell 的 Hindley–Milner 类型系统，其推断由米尔纳（Milner）的**算法 W** 完成，我们将用 Python 实现它。

## 类型变量与置换

要推断类型，我们让类型中含有未知量。

::: definition 类型变量、置换与实例 {#def-subst-types}
类型扩充**类型变量** $\alpha, \beta, \ldots$：$T ::= \alpha \mid \mathsf{Int} \mid \mathsf{Bool} \mid T \to T$。一个**类型置换** $\sigma$ 是从类型变量到类型的有穷映射，作用于类型时把它定义域内的每个变量同时替换：若 $\sigma = [\alpha \mapsto \mathsf{Int},\ \beta \mapsto \alpha \to \alpha]$，则 $\sigma(\alpha \to \beta) = \mathsf{Int} \to (\alpha \to \alpha)$。复合 $\sigma \circ \tau$ 先作用 $\tau$，再作用 $\sigma$。若对某个 $\sigma$ 有 $T' = \sigma T$，则称 $T'$ 是 $T$ 的**实例**；此时称 $T$ 比 $T'$ **更一般**。
:::

恒等函数 $\lambda x.\,x$ 可以被赋予类型 $\mathsf{Int} \to \mathsf{Int}$、$\mathsf{Bool} \to \mathsf{Bool}$ 与 $(\mathsf{Int} \to \mathsf{Bool}) \to (\mathsf{Int} \to \mathsf{Bool})$，而它们全都是 $\alpha \to \alpha$ 的实例。那个类型是「最好」的类型：它说出了对每种使用都成立的一切。

::: widget relation
set: a→a; Int→Int; Bool→Bool; (b→b)→(b→b); a→b
pairs: a→a,a→a; Int→Int,Int→Int; Bool→Bool,Bool→Bool; (b→b)→(b→b),(b→b)→(b→b); a→b,a→b; a→a,Int→Int; a→a,Bool→Bool; a→a,(b→b)→(b→b); a→b,a→a; a→b,Int→Int; a→b,Bool→Bool; a→b,(b→b)→(b→b)
view: properties
name: ≥
caption: 五个类型上的关系「$S \ge T$：$T$ 是 $S$ 的实例」（$a$、$b$ 是类型变量）。它自反、传递——是一个准序——并且在这些代表元上还是反对称的（两个类型互为实例，当且仅当它们只差变量的改名）。$a \to b$ 是函数的最一般类型；$a \to a$ 是恒等函数的主类型，位于它的一切单态类型之上。注意 $\mathsf{Int}\to\mathsf{Int}$ 与 $(b\to b)\to(b\to b)$ 不可比较：彼此都不是对方的实例。
:::

## 推断即求解约束

把简单类型 λ-演算的标注去掉，于是项为 $t ::= x \mid \lambda x.\,t \mid t\ t \mid \ldots$ 推断的思想是：给每个未知类型一个新鲜变量，把项走一遍，收集类型规则强加的方程，然后求解。

::: definition 约束生成 {#def-constraint-typing}
判断 $\Gamma \vdash t : T \mid C$（「在 $\Gamma$ 下，只要方程 $C$ 成立，$t$ 就有类型 $T$」）定义为

$$
\frac{x{:}T \in \Gamma}{\Gamma \vdash x : T \mid \varnothing}
\qquad
\frac{\Gamma, x{:}\alpha \vdash t : T \mid C \quad \alpha \text{ 是新的}}{\Gamma \vdash \lambda x.\,t : \alpha \to T \mid C}
\qquad
\frac{\Gamma \vdash t_1 : T_1 \mid C_1 \quad \Gamma \vdash t_2 : T_2 \mid C_2 \quad \beta \text{ 是新的}}{\Gamma \vdash t_1\ t_2 : \beta \mid C_1 \cup C_2 \cup \set{T_1 = T_2 \to \beta}}
$$

常量取其固有类型且不带约束（$\mathsf{0} : \mathsf{Int}$，$\mathsf{true} : \mathsf{Bool}$）。「新的」指它不在推导的其他任何地方出现。$(C, T)$ 的一个**解**是满足 $\sigma S = \sigma S'$（对 $C$ 中每个方程 $S = S'$）的置换 $\sigma$；此时 $\sigma T$ 就是 $t$ 的一个类型。
:::

抽象规则不知道形参的类型，于是就编一个；应用规则记下：函数的类型必须是一个从实参类型指向结果类型的箭头。

::: example 为 twice 生成约束 {#ex-constraints}
为 $\lambda f.\,\lambda x.\,f\,(f\ x)$ 生成约束并手工求解。
::: solution
给 $f$ 新鲜类型 $\alpha$，给 $x$ 新鲜类型 $\beta$。内层应用 $f\ x$ 取得新鲜结果类型 $\gamma$ 与方程 $\alpha = \beta \to \gamma$。外层应用 $f\,(f\ x)$ 取得结果类型 $\delta$ 与方程 $\alpha = \gamma \to \delta$。该项的类型是 $\alpha \to \beta \to \delta$，受约束于

$$
C = \set{\alpha = \beta \to \gamma,\ \ \alpha = \gamma \to \delta}.
$$

求解：第一个方程定出 $\alpha$；把它代入第二个得 $\beta \to \gamma = \gamma \to \delta$，这（箭头相等即分量相等）要求 $\beta = \gamma$ 且 $\gamma = \delta$。解为 $\sigma = [\alpha \mapsto \beta \to \beta,\ \gamma \mapsto \beta,\ \delta \mapsto \beta]$，类型是 $\sigma(\alpha \to \beta \to \delta) = (\beta \to \beta) \to \beta \to \beta$。每一个其他解，比如再额外加上 $\beta \mapsto \mathsf{Int}$，都给出这个类型的实例。两个方程，每个应用一个。
:::
:::

## 合一

求解类型表达式之间的方程，是一个一般性问题的特例：**一阶合一**。

::: definition 合一子 {#def-unifier}
若对每个 $(S = T) \in C$ 都有 $\sigma S = \sigma T$，则置换 $\sigma$ **合一**方程集 $C$。若 $C$ 的每个合一子 $\sigma'$ 都经由它分解：对某个 $\tau$ 有 $\sigma' = \tau \circ \sigma$，则合一子 $\sigma$ 是**最一般的**（**mgu**）。
:::

::: algorithm 合一（罗宾森（Robinson），1965）{#alg-unify}
$\mathrm{unify}(C)$，其中 $C$ 是有穷的方程集合或列表：

1. 若 $C = \varnothing$，返回空置换。
2. 否则从 $C$ 中取出一个方程 $S = T$，剩下 $C'$，然后：
   1. 若 $S$ 与 $T$ 相同，返回 $\mathrm{unify}(C')$；
   2. 若 $S$ 是不在 $T$ 中出现的变量 $\alpha$，返回 $\mathrm{unify}([\alpha \mapsto T]\,C') \circ [\alpha \mapsto T]$；
   3. 若 $T$ 是不在 $S$ 中出现的变量 $\alpha$，对 $S$ 作同样的处理；
   4. 若 $S = S_1 \to S_2$ 且 $T = T_1 \to T_2$，返回 $\mathrm{unify}(C' \cup \set{S_1 = T_1,\ S_2 = T_2})$（名字与元数相同的其他类型构造子类似）；
   5. 否则**失败**。
:::

检验「$\alpha$ 不在 $T$ 中出现」就是**出现检查**。没有它，$\alpha = \alpha \to \beta$ 会被 $[\alpha \mapsto \alpha \to \beta]$ 「解出」，可这根本不是一个解：替换后左边是 $(\alpha \to \beta) \to \beta$，而右边要再作一次替换才成为 $(\alpha \to \beta) \to \beta$，如此无穷无尽——唯一的解只能是一个无穷类型。

::: theorem 合一的正确性 {#thm-unify}
对每个有穷方程集 $C$，$\mathrm{unify}(C)$ 终止。若它返回 $\sigma$，则 $\sigma$ 是 $C$ 的最一般合一子；若它失败，则 $C$ 没有合一子。
:::

::: proof
*终止性。* 用二元组（$C$ 中不同类型变量的个数，$C$ 中符号的总数）为 $C$ 定度量，按字典序排列。情形 2.1 移去一个方程：第一分量不增，第二分量减小。情形 2.2 与 2.3 消去 $\alpha$：置换之后 $\alpha$ 不再出现在 $[\alpha \mapsto T]\,C'$ 中（它不在 $T$ 中出现），且不增添变量，故第一分量减小。情形 2.4 保持变量不变，去掉了两个箭头符号，第二分量减小。自然数对的字典序是良基的，所以递归必然停止。

*正确性*，对同一度量归纳。情形 1：空置换合一 $\varnothing$，且每个置换都经由它分解。情形 2.1：$C$ 与 $C'$ 的合一子相同，因为每个置换都合一 $S = S$。情形 2.4：一个箭头类型等于另一个恰当分量相等，所以 $C$ 与 $C' \cup \set{S_1 = T_1, S_2 = T_2}$ 有相同的合一子；归纳假设可用。

情形 2.2（$S = \alpha$，$\alpha \notin \mathrm{FV}(T)$）。记 $\theta = [\alpha \mapsto T]$。首先，若 $\rho$ 合一 $\theta C'$，则 $\rho \circ \theta$ 合一 $C$：它把 $\alpha$ 与 $T$ 都映为 $\rho T$（因为 $\theta T = T$），而 $\rho\theta$ 按假设合一 $C'$。反过来，设 $\sigma'$ 是 $C$ 的任合一子。则 $\sigma'\alpha = \sigma' T$，于是 $\sigma' = \sigma' \circ \theta$（它们在 $\alpha$ 上相同，因为 $\sigma'\theta\alpha = \sigma' T = \sigma'\alpha$，在其他每个变元上也相同）；于是 $\sigma'$ 合一 $\theta C'$，因为对每个 $(S' = T') \in C'$，$\sigma'(\theta S') = \sigma' S' = \sigma' T' = \sigma'(\theta T')$。由归纳假设，$\mathrm{unify}(\theta C')$ 返回 $\theta C'$ 的一个 mgu $\rho$（它不会失败，因为 $\sigma'$ 是一个合一子），于是对某个 $\tau$ 有 $\sigma' = \tau \circ \rho$，且 $\sigma' = \sigma' \circ \theta = \tau \circ (\rho \circ \theta)$。这样 $\rho \circ \theta$ 是一个每个合一子都经由它分解的合一子：一个 mgu。若 $\mathrm{unify}(\theta C')$ 失败，则由归纳假设 $\theta C'$ 没有合一子，而由刚才的论证，$C$ 也没有。情形 2.3 对称。

情形 2.5，失败。要么 $S$ 与 $T$ 的头构造子不同（比如 $\mathsf{Int}$ 与 $T_1 \to T_2$），任何置换都无法使它们相等，因为置换不改变非变量类型的头部；要么其中一个是出现在另一个之中的变量 $\alpha$，$T \ne \alpha$。于是对任意 $\sigma$，$\sigma\alpha$ 是 $\sigma T$ 的真子项，符号数更少，故 $\sigma\alpha \ne \sigma T$。两种情况下 $C$ 都没有合一子。
:::

一个 Python 实现把类型表示为数据类，把置换表示为字典：

```python
@dataclass(frozen=True)
class TVar: name: str
@dataclass(frozen=True)
class TCon: name: str; args: tuple = ()      # Int、Bool、带两个参数的 "->"、序对用 "*"
def fn(a, b): return TCon("->", (a, b))

def apply(s, t):
    match t:
        case TVar(a): return s.get(a, t)
        case TCon(c, args): return TCon(c, tuple(apply(s, x) for x in args))
def compose(s2, s1):                         # 先 s1，后 s2
    return {**{k: apply(s2, v) for k, v in s1.items()}, **s2}

def unify(t1, t2):
    match t1, t2:
        case TVar(a), TVar(b) if a == b: return {}
        case TVar(a), _: return bind(a, t2)
        case _, TVar(b): return bind(b, t1)
        case TCon(c1, args1), TCon(c2, args2) if c1 == c2 and len(args1) == len(args2):
            s = {}
            for x, y in zip(args1, args2):   # 从左到右逐分量合一
                s = compose(unify(apply(s, x), apply(s, y)), s)
            return s
    raise InferError(f"cannot unify {show(t1)} with {show(t2)}")

def bind(a, t):
    if a in ftv(t):                          # 出现检查
        raise InferError(f"occurs check: {a} occurs in {show(t)}")
    return {a: t}
```

处理一个约束列表于是就是一次折叠：从空置换出发，把当前置换作用到每个方程上，合一，复合。生成约束再求解，重现了 [[#ex-constraints]]，并且能处理自应用：

```console
\f x. f (f x)          2 equations  ('a -> 'a) -> 'a -> 'a
\x y z. x z (y z)      3 equations  ('a -> 'b -> 'c) -> ('a -> 'b) -> 'a -> 'c
\f g x. f (g x)        2 equations  ('a -> 'b) -> ('c -> 'a) -> 'c -> 'b
\x. x x                1 equations  error: occurs check: t15 occurs in t15 -> t16
```

（打印器会把剩下的类型变量按出现顺序改名为 `'a`、`'b`、……，与 OCaml 一样。）自应用恰好如 [[programming-languages/type-systems#thm-no-self-app]] 所预言的那样失败：单个方程 $\alpha = \alpha \to \beta$ 过不了出现检查。

::: theorem 主类型（辛德利（Hindley），1969）{#thm-principal}
若一个无标注的 λ-项 $t$（带常量）具有某个简单类型，则它有一个**主类型** $T_0$：$t$ 的一个类型，使得 $t$ 的每个类型都是它的实例。求法是生成 $\varnothing \vdash t : T \mid C$，并返回 $\sigma T$，其中 $\sigma = \mathrm{unify}(C)$。
:::

::: proof
关于约束生成的两个事实都对 $t$ 归纳证明（皮尔斯（Pierce），*TAPL*，§22.3）：（可靠性）若 $\sigma$ 求解 $C$，则 $\sigma T$ 是 $t$ 的一个类型——意思是把每个约束词标注为其新鲜变量在 $\sigma$ 下的像，就得到一个类型为 $\sigma T$ 的简单类型项；（完备性）若 $t$ 在某个标注下具有类型 $T'$，则 $C$ 的某个解 $\sigma'$ 满足 $\sigma' T = T'$——对每个新鲜变量，把 $\sigma'$ 定义为该处实际使用的类型。现在设 $t$ 有某个类型 $T'$。由完备性，$C$ 有解 $\sigma'$ 且 $\sigma' T = T'$，于是由 [[#thm-unify]]，$\mathrm{unify}(C)$ 成功并给出 mgu $\sigma$，且 $\sigma' = \tau \circ \sigma$。由可靠性，$\sigma T$ 是 $t$ 的类型，而 $T' = \sigma' T = \tau(\sigma T)$ 是它的实例。若合一失败，则 $C$ 无解，由完备性 $t$ 没有类型。
:::

## let-多态

主类型很一般，但变量的每次*使用*都必须与它单一的类型一致。考虑

$$
(\lambda \mathit{id}.\,(\mathit{id}\ 1,\ \mathit{id}\ \mathsf{true}))\ (\lambda x.\,x).
$$

约束说 $\mathit{id}$ 的类型 $\alpha$ 既等于 $\mathsf{Int} \to \beta$ 又等于 $\mathsf{Bool} \to \gamma$，于是合一时在 $\mathsf{Int} = \mathsf{Bool}$ 上失败。可这个程序完全安全。问题在于形参 $\mathit{id}$ 可以被绑定为*任何*类型正确的函数，包括只对整数起作用的那种；在体里我们不能假设得更多。换成 `let`，情况就不同了：在 $\mathsf{let}\ \mathit{id} = \lambda x.\,x\ \mathsf{in}\ (\mathit{id}\ 1,\ \mathit{id}\ \mathsf{true})$ 中我们*知道* $\mathit{id}$ 是什么，它的主类型 $\alpha \to \alpha$ 对每个 $\alpha$ 都成立。米尔纳（Milner）的主意是给 let 绑定的变量**类型模式**。

::: definition 类型模式；泛化与实例化 {#def-scheme}
**类型模式**是 $\sigma ::= \forall \alpha_1 \ldots \alpha_n.\,T$（$n \ge 0$），在 $T$ 中约束类型变量 $\alpha_i$。上下文现在把变元映射到模式。若对某些类型 $\vec S$ 有 $T' = [\vec\alpha \mapsto \vec S]\,T$，则 $T'$ 是 $\forall \vec\alpha.\,T$ 的一个**实例**。在 $\Gamma$ 中**泛化** $T$，就是对在 $T$ 中自由、但不在 $\Gamma$ 中自由的变量加量词：$\mathrm{gen}(\Gamma, T) = \forall \vec\alpha.\,T$，其中 $\vec\alpha = \mathrm{FV}(T) \setminus \mathrm{FV}(\Gamma)$。
:::

::: definition Hindley–Milner 类型系统 {#def-hm}
项为 $t ::= x \mid \lambda x.\,t \mid t\ t \mid \mathsf{let}\ x = t\ \mathsf{in}\ t$，加上常量。规则是

$$
\frac{x{:}\sigma \in \Gamma \quad T \text{ 是 } \sigma \text{ 的实例}}{\Gamma \vdash x : T}
\qquad
\frac{\Gamma, x{:}T_1 \vdash t : T_2}{\Gamma \vdash \lambda x.\,t : T_1 \to T_2}
\qquad
\frac{\Gamma \vdash t_1 : T_1 \to T_2 \quad \Gamma \vdash t_2 : T_1}{\Gamma \vdash t_1\ t_2 : T_2}
\qquad
\frac{\Gamma \vdash t_1 : T_1 \quad \Gamma, x{:}\mathrm{gen}(\Gamma, T_1) \vdash t_2 : T_2}{\Gamma \vdash \mathsf{let}\ x = t_1\ \mathsf{in}\ t_2 : T_2}
$$

抽象规则中形参取得的是一个普通类型（没有量词的模式）：只有 `let` 引入多态。
:::

为什么泛化必须排除在 $\Gamma$ 中自由的变量？在 $\lambda y.\,\mathsf{let}\ z = y\ \mathsf{in}\ z$ 中，$z$ 的类型就是 $y$ 的类型 $\beta$，而 $\beta$ 被上下文固定；给它加量词就等于声称 $z$ 具有每个类型，函数便会取得不相干的类型 $\beta \to \gamma$。出现在 $\Gamma$ 中的变量代表某一个、只是尚未知道的类型。

### 算法 W

米尔纳的算法 W 把约束生成与合一交织在一起，返回一个置换和一个类型。

::: algorithm 算法 W（米尔纳（Milner），1978）{#alg-w}
$W(\Gamma, t)$ 返回置换与类型组成的对 $(S, T)$，或者失败。

1. $t = x$ 且 $x{:}\forall \alpha_1 \ldots \alpha_n.\,T \in \Gamma$：返回 $(\mathrm{id}, [\alpha_i \mapsto \beta_i]\,T)$，其中各 $\beta_i$ 是新鲜的（实例化）。
2. $t = \lambda x.\,t_1$：取新鲜的 $\beta$，$(S_1, T_1) = W((\Gamma, x{:}\beta), t_1)$；返回 $(S_1, S_1\beta \to T_1)$。
3. $t = t_1\ t_2$：设 $(S_1, T_1) = W(\Gamma, t_1)$，$(S_2, T_2) = W(S_1\Gamma, t_2)$，$\beta$ 新鲜，$S_3 = \mathrm{unify}(S_2 T_1 = T_2 \to \beta)$；返回 $(S_3 S_2 S_1, S_3 \beta)$。
4. $t = \mathsf{let}\ x = t_1\ \mathsf{in}\ t_2$：设 $(S_1, T_1) = W(\Gamma, t_1)$，$(S_2, T_2) = W((S_1\Gamma, x{:}\mathrm{gen}(S_1\Gamma, T_1)), t_2)$；返回 $(S_2 S_1, T_2)$。
:::

```python
def instantiate(sc):
    s = {a: fresh() for a in sc.vars}
    return apply(s, sc.ty)

def generalise(env, t):
    return Scheme(tuple(sorted(ftv(t) - ftv_env(env))), t)

def W(env, e):
    match e:
        case Lit(v): return {}, BOOL if isinstance(v, bool) else INT
        case Var(x):
            if x not in env: raise InferError(f"unbound variable {x}")
            return {}, instantiate(env[x])
        case Lam(x, body):
            a = fresh()
            s1, t1 = W({**env, x: Scheme((), a)}, body)
            return s1, fn(apply(s1, a), t1)
        case App(f, arg):
            s1, t1 = W(env, f)
            s2, t2 = W({k: apply_scheme(s1, v) for k, v in env.items()}, arg)
            b = fresh()
            s3 = unify(apply(s2, t1), fn(t2, b))
            return compose(s3, compose(s2, s1)), apply(s3, b)
        case Let(x, rhs, body):
            s1, t1 = W(env, rhs)
            env1 = {k: apply_scheme(s1, v) for k, v in env.items()}
            s2, t2 = W({**env1, x: generalise(env1, t1)}, body)
            return compose(s2, s1), t2
```

初始环境给各原始运算各自的模式：`+ : Int -> Int -> Int`、`= : Int -> Int -> Bool`、`if : ∀a. Bool -> a -> a -> a`、`pair : ∀a b. a -> b -> a * b`、`fst : ∀a b. a * b -> a`，以及用于递归的 `fix : ∀a. (a -> a) -> a`（[[programming-languages/type-systems]]）。

::: example 用 W 推断类型 {#ex-w-run}
在一批带类型与不带类型的程序上运行推断器。
::: solution
```console
\x. x                                              : 'a -> 'a
\f g x. f (g x)                                    : ('a -> 'b) -> ('c -> 'a) -> 'c -> 'b
\x y. x                                            : 'a -> 'b -> 'a
\f. \x. + (f x) 1                                  : ('a -> Int) -> 'a -> Int
let id = \x. x in pair (id 1) (id true)            : (Int * Bool)
(\id. pair (id 1) (id true)) (\x. x)               : error: cannot unify Int with Bool
\x. x x                                            : error: occurs check: t32 occurs in t32 -> t33
+ 1 true                                           : error: cannot unify Int with Bool
fix (\fact n. if (= n 0) 1 (* n (fact (- n 1))))   : Int -> Int
let twice = \f x. f (f x) in twice twice           : ('a -> 'a) -> 'a -> 'a
\p. pair (fst p) (fst p)                           : ('a * 'b) -> ('a * 'a)
```

恒等之例的 `let` 版本之所以成功，是因为 `id` 被泛化为 $\forall a.\,a \to a$，并分别在 $\mathsf{Int}$ 和 $\mathsf{Bool}$ 处实例化；λ 版本则失败。在 `twice twice` 中，`twice` 的两个出现用不同的类型变量实例化：$(\alpha\to\alpha)\to\alpha\to\alpha$ 与 $(\beta\to\beta)\to\beta\to\beta$；把第一个的实参类型 $\alpha \to \alpha$ 与第二个的整个类型合一，迫使 $\alpha = \beta \to \beta$，结果就是 $\alpha \to \alpha$，即 $(\beta\to\beta)\to\beta\to\beta$：把一个函数应用四次。阶乘不需要任何标注：`= n 0` 迫使 `n : Int`，结果类型则来自 `1`。
:::
:::

::: example 跟踪 W {#ex-w-trace}
跟踪 $W(\varnothing, \lambda f.\,\lambda x.\,f\,(f\ x))$，把置换写出来。
::: solution
1. 对 $f$ 抽象：新鲜 $\alpha$；计算 $W(f{:}\alpha, \lambda x.\,f\,(f\ x))$。
2. 对 $x$ 抽象：新鲜 $\beta$；计算 $W(f{:}\alpha, x{:}\beta;\ f\,(f\ x))$。
3. 应用 $f\,(f\ x)$。先算 $W(\ldots, f) = (\mathrm{id}, \alpha)$。再看实参 $f\ x$：$W$ 对 $f$ 给出 $\alpha$，对 $x$ 给出 $\beta$；取新鲜 $\gamma$；合一 $\alpha = \beta \to \gamma$，得 $S = [\alpha \mapsto \beta \to \gamma]$，类型 $\gamma$。于是 $S_2 = [\alpha \mapsto \beta\to\gamma]$，$T_2 = \gamma$。
4. 回到外层应用：$S_2 T_1 = S_2\alpha = \beta \to \gamma$；取新鲜 $\delta$；合一 $\beta \to \gamma = \gamma \to \delta$，得 $S_3 = [\beta \mapsto \delta,\ \gamma \mapsto \delta]$（先合一 $\beta$ 与 $\gamma$，得 $[\beta \mapsto \gamma]$，再合一 $\gamma$ 与 $\delta$）。返回 $S_3 S_2 = [\alpha \mapsto \delta \to \delta,\ \beta \mapsto \delta,\ \gamma \mapsto \delta]$，类型 $S_3\delta = \delta$。
5. 对 $x$ 的抽象返回类型 $S\beta \to \delta = \delta \to \delta$；对 $f$ 的抽象返回 $S\alpha \to (\delta \to \delta) = (\delta \to \delta) \to \delta \to \delta$。

与 [[#ex-constraints]] 的约束法答案相同，只差变量的名字：W 一生成方程就立即求解。
:::
:::

::: theorem W 的可靠性与完备性（达马斯（Damas）与米尔纳（Milner），1982）{#thm-w}
（可靠性）若 $W(\Gamma, t) = (S, T)$，则在 Hindley–Milner 系统中 $S\Gamma \vdash t : T$。（完备性）若对某个置换 $S'$ 与类型 $T'$ 有 $S'\Gamma \vdash t : T'$，则 $W(\Gamma, t)$ 成功并给出某个 $(S, T)$，且存在 $R$ 使 $S'\Gamma = R S \Gamma$，并且在 $R$ 之下 $T'$ 是 $\mathrm{gen}(S\Gamma, T)$ 的实例。特别地，一个封闭项有一个主类型模式 $\mathrm{gen}(\varnothing, T)$。
:::

证明是沿 $t$ 的归纳，风格同 [[#thm-principal]]，在应用情形使用 [[#thm-unify]]，并用到一个「类型在置换下保持」的引理；证明发表于路易斯·达马斯（Damas）的博士论文（爱丁堡，1985）。我们不复述。

::: quiz
Hindley–Milner 推断接受哪些程序？
- [x] `let k = \x y. x in pair (k 1 true) (k true 1)`
- [ ] `\k. pair (k 1 true) (k true 1)`
- [x] `let f = \x. x in let g = f f in g 3`
- [ ] `\y. let z = y in pair (z 1) (z true)`
::: solution
第一个中，`k` 是 let 绑定的，被泛化为 $\forall a\,b.\,a \to b \to a$，于是两次使用可以分别实例化。第二个是 λ 绑定的，所以 `k` 只有一个单态类型，`k 1 true` 与 `k true 1` 相冲突。第三个中，`f` 被泛化，`f f` 把它实例化两次，得到 `g : ∀a. a -> a`，于是 `g 3 : Int`。第四个中，`z` 取得 `y` 的类型，而 `y` 是上下文中自由的变量，*不会*被泛化；所以 `z` 不能既用在 $\mathsf{Int} \to \ldots$ 处又用在 $\mathsf{Bool} \to \ldots$ 处。
:::
:::

## 推断的代价

合一很快——把类型变量用并查集表示、并共享子项，它几乎是线性时间运行的（马泰利（Martelli）与蒙塔纳里（Montanari），1982；给出线性算法的是帕特森（Paterson）与韦格曼（Wegman），1978）。对不含 `let` 的程序，推断因此接近线性。但有了 `let`，推断出的*类型*可能极其庞大。

::: example 双重指数级类型 {#ex-blowup}
对小的 $n$ 推断 $\mathsf{let}\ f_0 = \lambda x.\,(x, x)\ \mathsf{in}\ \mathsf{let}\ f_1 = \lambda y.\,f_0\,(f_0\ y)\ \mathsf{in}\ \cdots\ \mathsf{in}\ f_n$ 的类型，并度量类型的大小（其语法树的结点数）。
::: solution
```python
def blowup(n):
    src = r"let f0 = \x. pair x x in "
    for i in range(1, n + 1):
        src += f"let f{i} = \\y. f{i-1} (f{i-1} y) in "
    return src + f"f{n}"
for n in range(0, 4):
    s, t = W(PRIMS, parse(blowup(n)))
    print(n, len(blowup(n)), size(apply(s, t)))
print(infer(parse(blowup(1))))
```

```console
0 27 5
1 53 9
2 79 33
3 105 513
'a -> (('a * 'a) * ('a * 'a))
```

$f_0$ 把自己的实参翻成一对，而 $f_{i}$ 把 $f_{i-1}$ 应用两次，所以 $f_n$ 把实参裹进 $2^n$ 层序对：它的类型是 $\alpha \to P$，其中 $P$ 是一棵深度 $2^n$、有 $2^{2^n}$ 个叶子的完全二叉树。其大小为 $2 + (2 \cdot 2^{2^n} - 1) = 2^{2^n + 1} + 1$：$5, 9, 33, 513$，而程序每层只增加 $26$ 个字符。$n = 4$ 时类型有 $131\,073$ 个结点，$n = 5$ 时超过 $8.5 \times 10^9$。（若表示成共享子图的图，类型只有 $O(2^n)$ 个结点——仍是指数级的。）
:::
:::

::: widget plot
f: 2^x + 1
x: 0, 4
y: 0, 18
labels: \log_2(\text{大小} - 1) = 2^n + 1
points: 0,2; 1,3; 2,5; 3,9
caption: [[#ex-blowup]] 中 $f_n$ 主类型大小的以 $2$ 为底的对数（圆点），由 Python 推断器测得，并由公式 $\log_2(\text{大小} - 1) = 2^n + 1$ 给出。即使在对数尺度上，曲线也是指数的：类型大小对 $n$ 是*双重*指数的，而程序长度只是线性的。这就是下面那条定理背后的现象——也是它几乎从不成为问题的原因：真实程序不会这样嵌套多态 let。
:::

::: theorem ML 类型化的复杂性（梅尔森（Mairson）；库弗里（Kfoury）、图林（Tiuryn）与乌尔任钦（Urzyczyn），1990）{#thm-dexptime}
判定一个项在 Hindley–Milner 系统中是否可类型化，是确定性指数时间（$\mathsf{DEXPTIME}$）完全问题。
:::

我们只陈述，不证明。下界是把一台指数时间图灵机的运行编码进像例子里那样的嵌套 let 中；上界则来自用共享的类型表示分析算法 W。实践中，ML 与 Haskell 编译器用与程序规模大致成线性的时间完成类型推断，因为真实代码里多态 `let` 的嵌套深度很小。

::: warning 多态与可变状态：值限制
语言一旦有了可变引用，泛化每个 `let` 就不相容了。往推断器里加上 `ref : ∀a. a -> Ref a`、`get : ∀a. Ref a -> a` 与 `set : ∀a. Ref a -> a -> Unit` 之后，程序

```text
let r = ref (\x. x) in let u = set r (\n. + n 1) in get r true
```

被以类型 `Bool` 接受——单元 `r` 取得模式 $\forall a.\,\mathrm{Ref}\,(a \to a)$，一处使用存入整数函数，另一处又把它读成布尔函数，而运行这个程序就会计算 `true + 1`。我们那个泛化每个 `let` 的推断器就打印 `Bool`。ML 的补救办法是**值限制**（赖特（Wright），1995）：`let x = e` 只有在 `e` 是*语法上的值*（变量、常量或 λ-抽象）时才泛化其类型，因为它们的求值不可能分配引用。OCaml 于是给 `r` 一个「弱」类型 `('_weak1 -> '_weak1) ref`，它在第一次使用时被固定，程序被拒绝。这一限制偶尔也拒绝无害的代码，如 `let f = compose id id`，可把它 η-展开成 `let f x = compose id id x` 来补救。
:::

## 类型推断实践

Hindley–Milner 推断是 Standard ML、OCaml、F# 与 Haskell 的内核。Haskell 把它扩展出**类型类**（瓦德勒（Wadler）与布洛特（Blott），1989）：模式上附加 `Num a =>` 之类的约束，在推断期间以逻辑编程的一种形式求解。完全的推断走不了太远：对 [[programming-languages/polymorphism]] 的多态 λ-演算系统 F，可类型性是不可判定的（韦尔斯（Wells），1999），而子类型使主类型变得复杂。因此现代语言使用**局部**或**双向**类型推断（皮尔斯（Pierce）与特纳（Turner），2000）：类型从函数签名的标注传播进函数体，局部变量与 lambda 形参的类型则从上下文推断。Rust、Scala、Swift、C#、Kotlin、TypeScript 与 C++ 的 `auto` 关键字都按这种方式工作；mypy 这类 Python 检查器从局部变量的初始化式推断其类型（[[program-design/types-interfaces]]）。它们全部的内核引擎，都是带类型变量的类型表达式合一。

::: history
哈斯克尔·库里（Curry）与罗伯特·费斯（Feys）（1958）描述了一个组合子的主类型。J. 罗杰·辛德利（Hindley）的 "The principal type-scheme of an object in combinatory logic"（1969）证明了主类型的存在，并用 J. A. 罗宾森（Robinson）为自动定理证明设计的合一算法（"A machine-oriented logic based on the resolution principle"，1965）把它们算了出来。罗宾·米尔纳（Milner）独立地发明了 let-多态与算法 W，用于 LCF 定理证明器的元语言 ML："A theory of type polymorphism in programming"（1978）证明了良类型的 ML 程序不会出岔子。路易斯·达马斯（Damas）与米尔纳（Milner）的 "Principal type-schemes for functional programs"（POPL 1982）证明了 W 的完备性。哈里·梅尔森（Mairson）的 "Deciding ML typability is complete for deterministic exponential time"（POPL 1990）与 Kfoury、Tiuryn 和 Urzyczyn 在 CAAP 1990 的论文确定了复杂性；马兹·托夫特（Tofte）的博士论文（1988）与安德鲁·赖特（Wright）的 "Simple imperative polymorphism"（1995）处理了引用。
:::

## 后续内容

[[programming-languages/polymorphism]] 把类型模式中的量词变成一等公民：系统 F 允许 $\forall$ 出现在类型的任何位置，代价是推断失去可判定性，并且它加上子类型与模块。合一在逻辑编程中重新出现（Prolog 的执行就是合一加回溯），在自动定理证明中，也在编译器的模式匹配中（[[compilers]]）。基于约束的推断可推广到带子类型、效应与所有权的类型系统，只不过那里的约束不再只是方程。

::: summary
- **类型推断**给未知量指派新鲜的类型变量，从类型规则生成方程（[[#def-constraint-typing]]），然后求解。
- **合一**求解类型表达式之间的方程；带**出现检查**的罗宾森（Robinson）算法（[[#alg-unify]]）终止，并且只要有合一子就返回一个**最一般合一子**（[[#thm-unify]]）。
- 简单类型演算中每个可类型化的项都有一个**主类型**，它的所有类型都是主类型的实例（[[#thm-principal]]）。
- **let-多态**把 let 绑定变量的类型泛化为**类型模式** $\forall \vec\alpha.\,T$，只量词化不在上下文中自由的变量，并在每次使用处重新实例化（[[#def-scheme]]、[[#def-hm]]）；λ 绑定的变量保持单态。
- **算法 W**（[[#alg-w]]）对 Hindley–Milner 系统既可靠又完备，并算出主类型模式（[[#thm-w]]）。
- 可类型性判定是 $\mathsf{DEXPTIME}$ 完全的，因为类型可以是双重指数的（[[#ex-blowup]]、[[#thm-dexptime]]），但对真实程序推断很快。有可变引用时，泛化必须限制到值上。
:::

## 习题

::: exercise 手算主类型 {level=1}
求下列各项的主类型：(a) $\lambda x\,y\,z.\,x\ z\,(y\ z)$；(b) $\lambda f.\,\lambda x.\,f\ x\ x$；(c) $\lambda x.\,\lambda y.\,y\ (x\ y)$。并用推断器检验 (a)。
::: solution
(a) 设 $x : \alpha$、$y : \beta$、$z : \gamma$。则 $x\ z$ 迫使 $\alpha = \gamma \to \delta$；$y\ z$ 迫使 $\beta = \gamma \to \varepsilon$；$(x\ z)(y\ z)$ 迫使 $\delta = \varepsilon \to \zeta$。结果：$(\gamma \to \varepsilon \to \zeta) \to (\gamma \to \varepsilon) \to \gamma \to \zeta$，打印为 `('a -> 'b -> 'c) -> ('a -> 'b) -> 'a -> 'c`——$S$ 组合子，经柯里-霍华德对应即公理 $(A \to B \to C) \to (A \to B) \to A \to C$。(b) $(\alpha \to \alpha \to \beta) \to \alpha \to \beta$。(c) $y$ 被应用于 $x\ y$，而 $x$ 被应用于 $y$：$y : \beta$、$x : \beta \to \gamma$，且 $\beta = \gamma \to \delta$；于是 $((\gamma\to\delta)\to\gamma) \to (\gamma\to\delta) \to \delta$。
:::
:::

::: exercise 手算合一 {level=1}
求最一般合一子，或说明为何不存在：(a) $\alpha \to \mathsf{Int} = (\mathsf{Bool} \to \beta) \to \beta$；(b) $\alpha \to \alpha = \mathsf{Int} \to \mathsf{Bool}$；(c) $\alpha \to \beta = \beta \to (\alpha \to \mathsf{Int})$；(d) $(\alpha \to \beta) \to \gamma = \gamma \to (\beta \to \alpha)$。
::: solution
(a) 逐分量：$\alpha = \mathsf{Bool} \to \beta$ 且 $\mathsf{Int} = \beta$；mgu 为 $[\alpha \mapsto \mathsf{Bool} \to \mathsf{Int},\ \beta \mapsto \mathsf{Int}]$。(b) $\alpha = \mathsf{Int}$，接着 $\mathsf{Int} = \mathsf{Bool}$：失败（冲突）。(c) $\alpha = \beta$，接着 $\beta = \beta \to \mathsf{Int}$：过不了出现检查。(d) 由第一个分量得 $\gamma = \alpha \to \beta$；于是第二个分量化为 $\alpha \to \beta = \beta \to \alpha$，故 $\alpha = \beta$；mgu 为 $[\gamma \mapsto \beta \to \beta,\ \alpha \mapsto \beta]$（或对称的那个 $\beta \mapsto \alpha$，只差一个改名）。
:::
:::

::: exercise 数约束 {level=1 check="3"}
约束生成（[[#def-constraint-typing]]）为 $\lambda x\,y\,z.\,x\ z\,(y\ z)$ 产生多少个方程？（输入数目。）
::: solution
每个应用结点一个。体 $x\ z\,(y\ z)$ 的剖析是 $(x\ z)\,(y\ z)$，共有三个应用：$x\ z$、$y\ z$ 和最外层那个。所以三个方程，与程序打印的一致；抽象与变量不产生方程。
:::
:::

::: exercise 膨胀的大小 {level=2 check="33"}
归纳证明 [[#ex-blowup]] 中 $f_n$ 的主类型大小为 $2^{2^n + 1} + 1$，并计算 $n = 2$ 时的值。（输入 $n = 2$ 时的大小。）
::: solution
断言：$f_n : \forall\alpha.\,\alpha \to P_n(\alpha)$，其中 $P_n(\alpha)$ 是深度 $2^n$、每个叶子都是 $\alpha$ 的完全二叉序对类型树。$n = 0$ 时，$f_0 = \lambda x.\,(x, x) : \alpha \to \alpha \times \alpha$，深度 $1 = 2^0$。对 $n + 1$：$f_{n+1} = \lambda y.\,f_n\,(f_n\ y)$；把 $f_n$ 实例化两次；内层使用给出 $y : \alpha$ 与 $f_n\ y : P_n(\alpha)$；外层使用取 $\beta := P_n(\alpha)$，给出 $P_n(P_n(\alpha))$，一棵深度 $2^n + 2^n = 2^{n+1}$ 的完全树。深度 $d$ 的完全二叉树有 $2^d$ 个叶子与 $2^d - 1$ 个内部结点；箭头类型再加上箭头结点与左边的叶子 $\alpha$：当 $d = 2^n$ 时大小为 $1 + 1 + (2^{d+1} - 1) = 2^{d+1} + 1$。$n = 2$ 时：$2^5 + 1 = 33$，与测量一致。
:::
:::

::: exercise 何处需要多态 {level=2}
对每个程序说明 Hindley–Milner 是否接受，并给出类型或失败的方程：(a) `let f = \x. x in f f`；(b) `(\f. f f) (\x. x)`；(c) `let g = \x. pair x x in g (g 1)`；(d) `\x. let y = x 1 in x true`。
::: solution
(a) 接受：`f` 被泛化；两个出现分别实例化为 $\beta\to\beta$ 与 $(\beta\to\beta)\to(\beta\to\beta)$；结果 $\beta \to \beta$。(b) 拒绝：`f` 是 λ 绑定的，`f f` 给出方程 $\alpha = \alpha \to \gamma$，过不了出现检查——尽管程序跑起来毫无问题。(c) 接受：`g : ∀a. a -> a * a`，结果是 $(\mathsf{Int}\times\mathsf{Int})\times(\mathsf{Int}\times\mathsf{Int})$。(d) 拒绝：`x` 是 λ 绑定的，只有一个类型；`x 1` 迫使 $\alpha = \mathsf{Int} \to \beta$，而 `x true` 随后要求 $\mathsf{Int} = \mathsf{Bool}$。
:::
:::

::: exercise 值限制 {level=2}
在 ML 的值限制之下，下列哪些 `let` 会被泛化？(a) `let id = \x. x`；(b) `let id2 = (\x. x) (\y. y)`；(c) `let id3 = \z. (\x. x) (\y. y) z`；(d) `let r = ref []`。为什么泛化 (c) 安全而泛化 (d) 不安全？
::: solution
(a) 会，λ-抽象是值：$\forall a.\,a \to a$。(b) 不会：应用不是语法上的值，所以它的类型得到一个弱变量，在第一次使用时被固定（程序是安全的，但限制是句法的、保守的）。(c) 会：η-展开把它变成一个 λ，即一个值，带 $\forall a.\,a \to a$。(d) 不会，而这正是限制所针对的情形：求值 `ref []` 只分配*一个*单元，每次使用都会共享它；把它泛化成 $\forall a.\,\mathrm{Ref}\ (\mathrm{List}\ a)$，就会让一处使用存入整数、另一处读出字符串。在 (c) 中，`id3` 的每次*调用*都重新求值函数体，所以各实例化之间不共享任何状态。
:::
:::

::: exercise Python 中的基于约束推断 {level=3}
实现不含 `let` 的 λ-演算的推断：先生成 [[#def-constraint-typing]] 的方程列表，再用 `unify` 求解。检验它在 $\lambda f\,x.\,f\,(f\ x)$、$\lambda x\,y\,z.\,x\ z\,(y\ z)$ 与函数复合上与 W 一致，并在 $\lambda x.\,x\ x$ 上失败。
::: solution
```python
def constraints(env, e, out):
    """返回 e 的类型，并把方程（类型的有序对）追加到 out。"""
    match e:
        case Lit(v): return BOOL if isinstance(v, bool) else INT
        case Var(x): return instantiate(env[x])
        case Lam(x, body):
            a = fresh()
            return fn(a, constraints({**env, x: Scheme((), a)}, body, out))
        case App(f, arg):
            t1 = constraints(env, f, out); t2 = constraints(env, arg, out)
            b = fresh(); out.append((t1, fn(t2, b))); return b

def solve(eqs):
    s = {}
    for l, r in eqs:
        s = compose(unify(apply(s, l), apply(s, r)), s)
    return s
```

```console
\f x. f (f x)          2 equations  ('a -> 'a) -> 'a -> 'a
\x y z. x z (y z)      3 equations  ('a -> 'b -> 'c) -> ('a -> 'b) -> 'a -> 'c
\f g x. f (g x)        2 equations  ('a -> 'b) -> ('c -> 'a) -> 'c -> 'b
\x. x x                1 equations  error: occurs check: t15 occurs in t15 -> t16
```

结果与 W 一致。`solve` 一次处理一个方程，每次合一之前先应用已求得的置换；由 [[#thm-unify]]（用于把 $C$ 分成第一个方程与其余两半），复合的结果是整个列表的 mgu。把生成与求解分开，是现代推断引擎的基础：约束可以被重新排序、化简，或在错误信息中指出彼此冲突的*那一使用对*，而不是 W 恰好在何处碰到冲突。
:::
:::

::: exercise 去掉出现检查 {level=3}
设从 `bind` 中去掉出现检查。(a) 推断器此时为 $\lambda x.\,x\ x$ 给出什么「类型」？它为什么不是约束 $\alpha = \alpha \to \beta$ 的解？(b) 说明若允许无穷（正则）类型，该方程就有解，并用递归类型 $\mu \alpha.\,\alpha \to \beta$ 描述它。(c) 利用「$\lambda x.\,x\ x$ 此时有了类型」这一事实，解释为什么这类类型虽然相容，ML 却默认拒绝。
::: solution
(a) 返回置换 $[\alpha \mapsto \alpha \to \beta]$，类型打印为 $(\alpha \to \beta) \to \beta$。它不是一个合一子：把它作用于两端得到 $\alpha \to \beta$ 与 $(\alpha \to \beta) \to \beta$，两者不同；两边仍留着变量 $\alpha$。由于 [[#thm-unify]] 证明中的尺寸论证，每个有穷置换都会失败。(b) 无穷树 $T = ((\ldots \to \beta) \to \beta) \to \beta$ 满足 $T = T \to \beta$；它是正则的（不同的子树只有有穷多个），记作 $\mu \alpha.\,\alpha \to \beta$，即「满足 $\alpha = \alpha \to \beta$ 的类型 $\alpha$」。正则树上的合一是可判定的：去掉出现检查、把类型表示成图即可，于埃（Huet）在 1976 年就此作出证明。(c) 有了这样的**等价递归（equi-recursive）类型**，$\lambda x.\,x\ x$ 取得类型 $(\mu\alpha.\,\alpha\to\beta) \to \beta$，于是 $\Omega$ 与 $Y$ 组合子都可类型化，带类型的语言不要 `fix` 就容许通用递归。这是相容的（安全性仍成立），但它使许多*错误*变得可类型化——忘写一个实参往往产生一个递归类型而不是一个错误——所以 OCaml 只在 `-rectypes` 标志下提供它。语言通常只通过具名的数据类型声明引入递归类型，其构造子标记了递归在何处展开（*同构递归（iso-recursive）类型*）。
:::
:::
