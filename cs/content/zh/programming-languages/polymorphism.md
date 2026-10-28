排序函数应当既能作用于整数表，也能作用于字符串表与日期表；绘制图形的函数应当能接受圆、正方形以及一切有轮廓的东西；字典模块应当让客户在不了解它用的是哈希表还是平衡树的情况下存取键与值。每一种都是**多态**的一种情形——同一段代码用于多种类型——而每一种都需要自己的类型系统机制。[[programming-languages/type-systems]] 中的简单类型 λ-演算完全没有这种能力：那里的每个函数恰有一个类型。

克里斯托弗·斯特雷奇（Strachey，1967）区分了**参数多态**——代码对所有类型**一致地**工作——与**特设多态**（重载）——同一个名字在不同类型处代表不同的代码，例如整数上的 `+` 与字符串上的 `+`。卢卡·卡尔代利（Cardelli）与彼得·韦格纳（Wegner，1985）又加入了**子类型（包含）多态**：某一类型的值可以用在期望更一般类型之值的地方。本章给出这三者的精确类型理论。**System F** 使参数多态成为一等公民，并把 Hindley–Milner 的类型模式（[[programming-languages/type-inference]]）解释为一个更大系统的片段；**参数性**则说明一个多态类型对其程序能说出多少东西。**子类型**拥有推导规则，我们还将证明函数类型为何对其参数逆变、可变引用为何不变。最后，**存在类型**解释了抽象数据类型与模块系统。Python 中的实用机制——泛型、协议与变型性标注——已在 [[program-design/types-interfaces]] 中遇过；这里我们考察它们背后的理论。

## 参数多态：System F

在 Hindley–Milner 系统中，多态只能位于类型的最外层：`id : ∀a. a -> a`，函数不能接受多态实参——在 [[programming-languages/type-inference]] 中，$\lambda \mathit{id}.\,(\mathit{id}\ 1, \mathit{id}\ \mathsf{true})$ 就被拒绝了。**System F** 由逻辑学家让-伊夫·吉拉尔（Girard，1972）与计算机科学家约翰·雷诺兹（Reynolds，1974）各自独立发现，它允许 $\forall$ 出现在类型的任何位置，并把对类型的抽象与实例化在项中显式表现出来。

::: definition System F {#def-system-f}
类型与项为

$$
T ::= \alpha \mid T \to T \mid \forall \alpha.\,T
\qquad\qquad
t ::= x \mid \lambda x{:}T.\,t \mid t\ t \mid \Lambda \alpha.\,t \mid t\,[T]
$$

值为 $v ::= \lambda x{:}T.\,t \mid \Lambda \alpha.\,t$。**类型抽象** $\Lambda \alpha.\,t$ 是以类型为参数的项；**类型应用** $t\,[T]$ 将它实例化。上下文既含带类型的项变元，也含类型变元：$\Gamma ::= \varnothing \mid \Gamma, x{:}T \mid \Gamma, \alpha$。类型规则是简单类型 λ-演算的那些规则再加上

$$
\frac{\Gamma, \alpha \vdash t : T}{\Gamma \vdash \Lambda \alpha.\,t : \forall \alpha.\,T}\ \text{(T-TAbs)}
\qquad
\frac{\Gamma \vdash t : \forall \alpha.\,T_{12}}{\Gamma \vdash t\,[T_2] : T_{12}[\alpha := T_2]}\ \text{(T-TApp)}
$$

（$\alpha$ 不在 $\Gamma$ 中，必要时先改名），求值规则（按值调用）是 λ-演算的那些规则再加上

$$
\frac{t_1 \to t_1'}{t_1\,[T_2] \to t_1'\,[T_2]}\ \text{(E-TApp)}
\qquad
\frac{}{(\Lambda \alpha.\,t_{12})\,[T_2] \to t_{12}[\alpha := T_2]}\ \text{(E-TAppTAbs)}
$$
:::

类型置换 $T[\alpha := S]$ 必须像项代入一样避免捕获（[[programming-languages/lambda-calculus#def-subst]]）：$(\forall \beta.\,\alpha \to \beta)[\alpha := \beta]$ 是 $\forall \beta'.\,\beta \to \beta'$，而不是 $\forall \beta.\,\beta \to \beta$。

多态恒等函数是 $\mathit{id} = \Lambda \alpha.\,\lambda x{:}\alpha.\,x : \forall \alpha.\,\alpha \to \alpha$，并且 $\mathit{id}\,[\mathsf{Nat}]\ 3 \to (\lambda x{:}\mathsf{Nat}.\,x)\ 3 \to 3$。更有意思的是 Hindley–Milner 无法类型化的东西：一个**接受**恒等函数作参数、并在两种类型处使用它的函数 $\lambda f{:}(\forall \alpha.\,\alpha \to \alpha).\,(f\,[\mathsf{Nat}]\ 1,\ f\,[\mathsf{Bool}]\ \mathsf{true})$，以及多态自应用：

$$
\mathit{selfApp} = \lambda x{:}(\forall \alpha.\,\alpha \to \alpha).\,x\,[\forall \alpha.\,\alpha \to \alpha]\ x \;:\; (\forall \alpha.\,\alpha \to \alpha) \to (\forall \alpha.\,\alpha \to \alpha).
$$

这里一个类型变元被实例化为一个多态类型——甚至正是正在被定义的那个类型。这就是**非直谓性**（impredicativity），它既是 System F 威力之源，也是其困难之源。

System F 的检查器只是在简单类型的检查器上作少量扩充。新增的两种情形是类型抽象与类型应用；类型在约束类型变元改名的意义下比较：

```python
def typeof(t, ctx=None):
    ctx = ctx or {}
    match t:
        case Var(x): return ctx[x]
        case Lam(x, T, b): return Fn(T, typeof(b, {**ctx, x: T}))
        case App(f, a):
            F, A = typeof(f, ctx), typeof(a, ctx)
            if not isinstance(F, Fn): raise TypeError_("not a function")
            if not alpha_eq(F.dom, A): raise TypeError_(f"argument mismatch")
            return F.cod
        case TLam(a, b): return All(a, typeof(b, ctx))              # T-TAbs
        case TApp(f, T):                                            # T-TApp
            F = typeof(f, ctx)
            if not isinstance(F, All): raise TypeError_("not polymorphic")
            return tsubst(F.body, F.var, T)                         # 避免捕获
```

::: example System F 中的 Church 数 {#ex-church-f}
在 System F 中给出恒等函数、多态自应用、Church 数 $2$、后继与加法的类型，并用 Python 检查器检查它们。
::: solution
在无类型 λ-演算中，一个 Church 数就是在反复施加一个函数（[[programming-languages/lambda-calculus#def-church-numerals]]）。在 System F 中，反复施加的类型是「对每个类型 $X$，给定函数 $X \to X$ 与起点 $X$，返回一个 $X$」：

$$
\mathsf{CNat} = \forall X.\,(X \to X) \to X \to X,
\qquad
c_2 = \Lambda X.\,\lambda f{:}X\to X.\,\lambda x{:}X.\,f\,(f\ x).
$$

后继函数把实参实例化到同一个 $X$：$\mathsf{succ} = \lambda n{:}\mathsf{CNat}.\,\Lambda X.\,\lambda f{:}X\to X.\,\lambda x{:}X.\,f\,(n\,[X]\ f\ x)$。加法反复施加 $\mathsf{succ}$——这需要把 $m$ 实例化到类型 $\mathsf{CNat}$ 本身，一步非直谓的操作：$\mathsf{plus} = \lambda m{:}\mathsf{CNat}.\,\lambda n{:}\mathsf{CNat}.\,m\,[\mathsf{CNat}]\ \mathsf{succ}\ n$。

```console
id      : ∀a. a -> a
id [Nat]: Nat -> Nat
selfapp : (∀a. a -> a) -> ∀a. a -> a
selfapp id: ∀a. a -> a
two     : ∀X. (X -> X) -> X -> X
succ    : (∀X. (X -> X) -> X -> X) -> ∀X. (X -> X) -> X -> X
plus    : (∀X. (X -> X) -> X -> X) -> (∀X. (X -> X) -> X -> X) -> ∀X. (X -> X) -> X -> X
subst   : ∀b0. b -> b0
rejected: not a function
```

`subst` 一行检验的是避免捕获的类型置换：$(\forall b.\,a \to b)[a := b]$ 会把约束的 $b$ 改名。最后一行在不做实例化的情况下直接应用 $\mathit{id}$：多态值必须先被赋予一个类型才能被应用。具有 System F 风格类型的语言（带 `RankNTypes` 的 Haskell、Scala、OCaml 的多态记录字段）会在能推断出这些类型应用的地方自动插入它们。
:::
:::

### 安全性及其极限

::: lemma 类型置换 {#lem-type-subst}
若 $\Gamma, \alpha, \Delta \vdash t : T$ 且 $S$ 是一个自由变元都在 $\Gamma$ 中的类型，则 $\Gamma, \Delta[\alpha := S] \vdash t[\alpha := S] : T[\alpha := S]$。
:::

::: proof
对类型推导归纳。T-Var 情形中 $x$ 的类型从上下文中读出，置换后的上下文使它取得类型 $T[\alpha := S]$。T-Abs、T-App 与 T-TAbs 由归纳假设得出（把约束类型变元改名为不同于 $\alpha$ 且不属于 $\mathrm{FV}(S)$ 的变元）。对 T-TApp，$t = t_1\,[T_2]$，其中 $t_1 : \forall \beta.\,T_{12}$ 且 $T = T_{12}[\beta := T_2]$；归纳假设给出 $t_1[\alpha := S] : \forall \beta.\,T_{12}[\alpha := S]$，T-TApp 再给出类型 $T_{12}[\alpha := S][\beta := T_2[\alpha := S]]$，由类型的置换引理（$\beta \ne \alpha$，$\beta \notin \mathrm{FV}(S)$）它等于 $T_{12}[\beta := T_2][\alpha := S]$。
:::

::: theorem System F 的类型安全性 {#thm-safety-f}
若 $\varnothing \vdash t : T$，则 $t$ 是值，或对某个 $t'$ 有 $t \to t'$（进展性）；并且若 $t \to t'$，则 $\varnothing \vdash t' : T$（保持性）。
:::

::: proof
[[programming-languages/type-systems#thm-progress]] 与 [[programming-languages/type-systems#thm-preservation]] 的证明原样沿用，另加 T-TAbs 与 T-TApp 的新情形。**进展性**：$\Lambda \alpha.\,t$ 是值；对 $t_1\,[T_2]$，或者 $t_1$ 能走步（E-TApp），或者 $t_1$ 是具有类型 $\forall \alpha.\,T_{12}$ 的值，由标准形式的新情形它必是一个类型抽象 $\Lambda \alpha.\,t_{12}$（λ-抽象具有箭头类型），于是 E-TAppTAbs 可用。**保持性**：E-TApp 用归纳假设；E-TAppTAbs 由可逆性得 $\alpha \vdash t_{12} : T_{12}$，再由 [[#lem-type-subst]] 得 $\varnothing \vdash t_{12}[\alpha := T_2] : T_{12}[\alpha := T_2]$，这正是 $t$ 的类型。
:::

吉拉尔（Girard）证明了多得多的东西：每个良类型的 System F 项都是**强归一化**的（1972），其方法是把泰特（Tait）的方法推广——对类型变元而言，「可归约候选」（reducibility candidates）取遍**所有**适当的项集。所以 System F 尽管强大，却不是图灵完备的——其中可定义的一切函数都是全函数，而它恰好定义出二阶算术能够证明为全的那些函数。两个否定结果限制了它作为编程语言的使用。无标注项的可类型化性是**不可判定的**（J. B. 韦尔斯（Wells），1994，期刊版 1999），因此完全的推断不可能做到，多态实参处需要标注；这正是 Hindley–Milner 把 $\forall$ 限制在 let 绑定类型的最外层（**秩 1** 或**前束**多态）的原因——恰是推断能够奏效的那个片段。

### 参数性

参数多态的函数无法查看它的类型实参：$\Lambda \alpha.\,t$ 的体中没有任何运算能检验 $\alpha$ 是什么。这一约束强到足以仅由类型就决定某些函数的行为。

::: proposition 唯一的恒等项 {#prop-only-id}
System F 中每个具有类型 $\forall \alpha.\,\alpha \to \alpha$ 的闭范式项都是 $\Lambda \alpha.\,\lambda x{:}\alpha.\,x$（相差 α-等价）。于是该类型的每个闭项在每个类型处的行为都是恒等函数。
:::

::: proof
若一个项是某个变元施加零个或多个实参（项或类型）的结果：$x\ a_1 \cdots a_k$，就称它为**中立项**（neutral）。每个 β-范式要么是体为范式的抽象（$\lambda$ 或 $\Lambda$），要么是具有范式实参的中立项（否则它就含有可约式）。闭项没有自由变元，所以闭范式不是中立项。

设 $t$ 是具有类型 $\forall \alpha.\,\alpha \to \alpha$ 的闭范式。它是抽象；由可逆性它是类型抽象 $\Lambda \alpha.\,t_1$，且 $\alpha \vdash t_1 : \alpha \to \alpha$。上下文 $\alpha$ 不含项变元，所以 $t_1$ 不是中立项；它具有箭头类型，所以它是 $\lambda x{:}\alpha.\,t_2$，且 $\alpha, x{:}\alpha \vdash t_2 : \alpha$。现在 $t_2$ 是具有类型 $\alpha$——一个类型变元——的范式；它不是抽象（抽象具有箭头类型或 $\forall$ 类型），所以它是中立项，其头部是上下文中的一个变元——必为 $x$，即唯一的项变元。若 $x$ 被施加了实参，它的类型 $\alpha$ 就必须是箭头类型或 $\forall$ 类型，而它不是；所以 $t_2 = x$。于是 $t = \Lambda \alpha.\,\lambda x{:}\alpha.\,x$。最后，由强归一化与保持性，该类型的每个闭项都规约为一个同类型的范式，即恒等函数，所以把它应用于任何 $[T]$ 与 $v$ 都得 $v$。
:::

雷诺兹（Reynolds）的**抽象定理**（1983）把这一结论推广：每个多态项都保持它被实例化到的那些类型之间的任何关系。菲利普·拉德勒（Wadler）的 "Theorems for free!"（1989）把它变成了一种工具：仅从类型就能导出诸如「对每个 $f : \forall \alpha.\,\mathrm{List}\ \alpha \to \mathrm{List}\ \alpha$ 与每个函数 $g$，$\mathrm{map}\ g \circ f = f \circ \mathrm{map}\ g$」这样的定律——一个只做重排、丢弃或复制元素的函数与映射可交换。这类定律为融合（fusion）这样的编译器优化提供了依据（[[program-design/higher-order-functions#thm-map-fusion]]）。

::: warning 参数性很容易被破坏
自由定理只在多态代码确实无法查看类型的语言中成立。下面每一种情形都会破坏它：运行时的类型检验（Python 的 `isinstance(x, int)`、Java 的 `instanceof`），于是一个「泛型」`f[T](x: T) -> T` 可以在 `x` 是整数时返回 `x + 1`；异常与非终止，于是总抛出异常的函数也居留类型 $\forall \alpha.\,\alpha \to \alpha$；反射；以及 Haskell 的 `seq`，它能区分函数与未定义的值。有副作用或一般递归时，这些定理只以弱化的形式成立。在这类语言中，「类型说明一切」只能当作强烈的提示，而不是保证。
:::

### 实现：擦除或特化

编译参数多态有两条路。**擦除**只编译代码的一份副本，类型 $\alpha$ 的所有值都用统一的表示（一个指针或一个带标记的字）——OCaml、Haskell、Java 泛型与 Python 的类型标注泛型都这样做，这就是它们的运行时不知道类型实参的原因（[[program-design/types-interfaces]]）。**单态化**则为代码被使用的每种类型生成一份特化副本——C++ 模板与 Rust 泛型，以代码体积和编译时间为代价换取更快的代码。下面是一个带**有界**类型参数的 Rust 例子——`T` 必须支持比较与复制：

```rust
use std::fmt::Display;

fn largest<T: PartialOrd + Copy>(xs: &[T]) -> T {     // 有界参数多态
    let mut m = xs[0];
    for &x in xs { if x > m { m = x; } }
    m
}
fn describe(items: &[Box<dyn Display>]) -> String {   // trait 对象：动态派发
    items.iter().map(|d| d.to_string()).collect::<Vec<_>>().join(", ")
}
fn main() {
    println!("{} {} {}", largest(&[3, 7, 2]), largest(&[1.5, 0.5]), largest(&['q', 'z', 'a']));
    let items: Vec<Box<dyn Display>> = vec![Box::new(42), Box::new("text"), Box::new(2.5)];
    println!("{}", describe(&items));
}
```

```console
$ rustc -C opt-level=0 generic.rs && ./generic
7 1.5 z
42, text, 2.5
$ nm -C generic | grep largest
000000000001af10 t generic::largest
000000000001afb0 t generic::largest
000000000001b050 t generic::largest
```

未优化二进制文件的符号表（rustc 1.95，2026 年版本）中含有 `largest` 的三份副本，`i32`、`f64` 与 `char` 各一份。相比之下，`describe` 接受的是一列**不同**类型、但都实现了 `Display` 的值，并在运行时通过一张函数指针表调用它们的 `to_string`——即下一节的子类型多态风格。

## 子类型

参数多态让一个函数适用于所有类型；子类型让一个值可用于若干类型：一个带三个坐标的点可以用在期望两个坐标之点的地方。

::: definition 子类型与包含规则 {#def-subtyping}
**子类型关系** $S <: T$（「$S$ 是 $T$ 的子类型」）是类型上的一个预序，它通过**包含规则**（subsumption）与类型化相联系：

$$
\frac{\Gamma \vdash t : S \quad S <: T}{\Gamma \vdash t : T}\ \text{(T-Sub)}
$$

于是子类型的项可以用在任何期望父类型的地方——利斯科夫（Liskov）的**替换原则**变成了一条类型规则。对记录与函数，陈述式规则是

$$
\begin{gathered}
\frac{}{S <: S}\ \text{(S-Refl)}
\qquad
\frac{S <: U \quad U <: T}{S <: T}\ \text{(S-Trans)}
\qquad
\frac{}{S <: \mathsf{Top}}\ \text{(S-Top)}
\\[1.2em]
\frac{}{\{l_i{:}T_i\}_{i \le n+k} <: \{l_i{:}T_i\}_{i \le n}}\ \text{(S-RcdWidth)}
\qquad
\frac{S_i <: T_i \text{ for each } i}{\{l_i{:}S_i\}_i <: \{l_i{:}T_i\}_i}\ \text{(S-RcdDepth)}
\qquad
\frac{\{k_j{:}S_j\} \text{ a permutation of } \{l_i{:}T_i\}}{\{k_j{:}S_j\} <: \{l_i{:}T_i\}}\ \text{(S-RcdPerm)}
\\[1.2em]
\frac{T_1 <: S_1 \quad S_2 <: T_2}{S_1 \to S_2 <: T_1 \to T_2}\ \text{(S-Arrow)}
\end{gathered}
$$

基本类型可以有自己的子类型关系，例如 $\mathsf{Nat} <: \mathsf{Int}$。
:::

宽度子类型说字段**更多**的记录是子类型：它能做小记录能做的一切。深度子类型说字段可以被细化。这是**结构**子类型；命名式（nominal）系统（Java 类）则声明关系本身（[[program-design/types-interfaces#def-subtyping]]）。

::: example 用包含规则做类型检查 {#ex-subsumption}
设 $\mathit{norm} = \lambda p{:}\{x{:}\mathsf{Int}, y{:}\mathsf{Int}\}.\,p.x \cdot p.x + p.y \cdot p.y$。证明 $\mathit{norm}\ \{x = 3, y = 4, c = \mathsf{true}\}$ 良类型，并说明包含规则那一步在运行时意味着什么。
::: solution
由 T-Abs 得 $\mathit{norm} : \{x{:}\mathsf{Int}, y{:}\mathsf{Int}\} \to \mathsf{Int}$，其中字段访问由记录投影规则定出类型。实参的类型是 $\{x{:}\mathsf{Int}, y{:}\mathsf{Int}, c{:}\mathsf{Bool}\}$。由 S-RcdWidth，它是 $\{x{:}\mathsf{Int}, y{:}\mathsf{Int}\}$ 的子类型，于是 T-Sub 给实参以形参的类型，T-App 再把这次应用定类型为 $\mathsf{Int}$。求值把三字段记录代入，算得 $9 + 16 = 25$；多出的字段根本不会被读。包含规则那一步在运行时什么也不做——但实现必须让不同形状的记录都能做字段访问：或按名字查找字段，或用一次强制转换把记录复制成较小的布局，或把字段按固定顺序存放从而使前缀布局可行（C++ 与 Java 单继承对象布局背后的技巧）。
:::
:::

箭头规则是微妙的那一条。它对参数**逆变**（次序翻转：$T_1 <: S_1$），对结果**协变**。一个函数可以用来顶替一个接受**较窄**参数、返回**较宽**结果的函数：能接受任意图形的函数可以用在期望「圆的函数」的地方，反过来则永远不行。

::: proposition 函数子类型必须逆变 {#prop-contra}
若把 S-Arrow 换成协变规则「$S_1 <: T_1$ 且 $S_2 <: T_2$ 蕴含 $S_1 \to S_2 <: T_1 \to T_2$」，类型系统就不再安全。
:::

::: proof
令 $P_1 = \{x{:}\mathsf{Int}\}$，$P_2 = \{x{:}\mathsf{Int},\ y{:}\mathsf{Int}\}$，由宽度规则有 $P_2 <: P_1$。函数 $g = \lambda p{:}P_2.\,p.y$ 具有类型 $P_2 \to \mathsf{Int}$。在协变规则下 $P_2 \to \mathsf{Int} <: P_1 \to \mathsf{Int}$，于是由包含规则 $g : P_1 \to \mathsf{Int}$，而应用 $g\ \{x = 1\}$ 良类型且类型为 $\mathsf{Int}$。它求值为 $\{x = 1\}.y$，而这是卡住的：记录没有字段 $y$。进展性失效。在逆变规则下，$P_2 \to \mathsf{Int} <: P_1 \to \mathsf{Int}$ 需要 $P_1 <: P_2$，这是假的。
:::

### 变型性

每个类型构造子 $F$ 都会引出同样的问题：给定 $S <: T$，$F(S)$ 与 $F(T)$ 有何关系？若 $F(S) <: F(T)$ 则 $F$ **协变**；若 $F(T) <: F(S)$ 则 $F$ **逆变**；若两者一般都不成立则 $F$ **不变**。箭头类型对定义域逆变、对余域协变；不可变记录、序对与表是协变的。可变引用则不变：

::: proposition 引用必须不变 {#prop-ref-invariant}
若 $\mathrm{Ref}$ 是协变的（$S <: T$ 蕴含 $\mathrm{Ref}\ S <: \mathrm{Ref}\ T$），或是逆变的，则带赋值的类型系统不再安全。
:::

::: proof
**协变。** 取 $\mathsf{Nat} <: \mathsf{Int}$，设 $r : \mathrm{Ref}\ \mathsf{Nat}$。由协变规则与包含规则，$r : \mathrm{Ref}\ \mathsf{Int}$，于是 `r := -1` 能通过类型检查；此后 `!r` 具有类型 $\mathsf{Nat}$ 却返回 $-1$，任何依赖 $\mathsf{Nat}$ 的运算——比如检查 $!r < n$ 之后用它给大小为 $n$ 的数组取下标——都会出错。**逆变。** 设 $r : \mathrm{Ref}\ \mathsf{Int}$ 中放着 $-1$；由逆变有 $r : \mathrm{Ref}\ \mathsf{Nat}$，而 `!r` 具有类型 $\mathsf{Nat}$ 却得出 $-1$。引用既支持读（需要协变）又支持写（需要逆变），所以只有 $S = T$ 才安全。
:::

::: example Java 的协变数组 {#ex-java-arrays}
Java 把数组当作协变的：`String[]` 是 `Object[]` 的子类型。下面这段示意代码能通过编译：

```text
Object[] objs = new String[1];   // 允许：String[] <: Object[]
objs[0] = Integer.valueOf(3);    // 类型检查通过：Integer <: Object
```

运行时会发生什么？语言如何保持安全？
::: solution
第二行在运行时抛出 `java.lang.ArrayStoreException`。由 [[#prop-ref-invariant]]，协变的可变数组在静态上是不可靠的，于是 Java 用动态手段弥补：每个数组对象都记录自己的元素类型，每次向数组写入都会检查所存值的类是否匹配。安全性在 [[programming-languages/type-systems#cor-safety]] 的意义上得以保持——失败是一个已定义的异常，而不是卡住的状态——代价是每次数组写入都要检查、错误发现得很晚。Java 后来的泛型（2004）是不变的：`List<String>` 不是 `List<Object>` 的子类型，变型性在使用处用通配符声明：`List<? extends Object>`（只读，协变）与 `List<? super String>`（只写，逆变）。Scala、Kotlin、C# 与 Python 的 `TypeVar(covariant=True)` 则让定义处自己声明变型性。
:::
:::

### 算法化子类型

陈述式规则不是一个算法：要检查 $S <: T$，S-Trans 要我们猜一个中间类型 $U$，而 T-Sub 可以加在类型推导的任何地方。标准的解法是找一组等价的、**句法导向**的规则：每对类型形状恰有一条规则，没有传递性规则，宽度、深度与置换合并为一条记录规则。Python 实现如下：

```python
def subtype(S, T):
    """算法化子类型判定 S <: T（无需传递性规则）。"""
    match S, T:
        case _, Top(): return True                                  # S-Top
        case Base(a), Base(b): return a == b or (a, b) in BASE_SUB  # 例如 Nat <: Int
        case Rec(fs), Rec(gs):                                      # 宽度 + 深度 + 置换
            d = dict(fs)
            return all(l in d and subtype(d[l], U) for l, U in gs)
        case Fun(S1, S2), Fun(T1, T2):                              # 逆变与协变
            return subtype(T1, S1) and subtype(S2, T2)
        case Ref(S1), Ref(T1):                                      # 不变
            return subtype(S1, T1) and subtype(T1, S1)
    return False
```

```console
{x: Int, y: Int}                           <: {x: Int}                     True
{x: Int}                                   <: {x: Int, y: Int}             False
{x: Int, y: Int, colour: Bool}             <: {x: Int, y: Int}             True
{y: Int, x: Int}                           <: {x: Int, y: Int}             True
{x: Nat, y: Int}                           <: {x: Int, y: Int}             True
({x: Int} -> Int)                          <: ({x: Int, y: Int} -> Int)    True
({x: Int, y: Int} -> Int)                  <: ({x: Int} -> Int)            False
(Int -> Nat)                               <: (Nat -> Int)                 True
Ref Nat                                    <: Ref Int                      False
{x: Int, y: Int, colour: Bool}             <: Top                          True
```

::: theorem 算法化子类型关系可靠且完备 {#thm-algorithmic}
对类型 $\mathsf{Top}$、基本类型（基本关系自反且传递）、记录与箭头：$\mathrm{subtype}(S, T)$ 返回真当且仅当 $S <: T$ 可由 [[#def-subtyping]] 的陈述式规则推导。
:::

::: proof
**可靠性**（算法说「是」，则推导存在）：对算法的执行归纳。每个情形都对应若干陈述式规则：记录情形把 S-RcdPerm、S-RcdWidth 与 S-RcdDepth 组合起来（先置换使 $T$ 的字段排在前面，用宽度规则丢掉多余字段，再用深度规则逐字段细化，每个字段用归纳假设），最后用 S-Trans 串接；箭头情形就是 S-Arrow；S-Top 与基本类型情形是显然的。

**完备性**（推导存在，则算法说「是」）：先证明算法化关系自反（对类型归纳）且传递，再对陈述式推导归纳。自反性与其余各条规则都直接对应到算法的情形。对传递性，对 $U$ 的大小归纳证明 $\mathrm{subtype}(S, U)$ 与 $\mathrm{subtype}(U, T)$ 蕴含 $\mathrm{subtype}(S, T)$。若 $T = \mathsf{Top}$，结论成立。否则 $T$ 不是 $\mathsf{Top}$，于是 $U$ 也不是 $\mathsf{Top}$（除 $\mathsf{Top}$ 自身外没有类型位于 $\mathsf{Top}$ 之上），又因为算法只联系同形状的类型，$S$、$U$、$T$ 或者全是基本类型（用基本关系的传递性），或者全是记录，或者全是箭头。记录：$T$ 的每个字段 $l{:}T_l$ 都在 $U$ 中且 $U_l <: T_l$，而该字段又在 $S$ 中且 $S_l <: U_l$；对更小的类型 $U_l$ 用归纳假设得 $S_l <: T_l$。箭头：$T_1 <: U_1 <: S_1$ 且 $S_2 <: U_2 <: T_2$，对 $U_1$ 与 $U_2$ 用归纳假设得 $T_1 <: S_1$ 与 $S_2 <: T_2$。
:::

类似的论证表明，T-Sub 的使用可以被推到应用的实参处：算法化的类型系统检查 $t_1\ t_2$ 时，先算出类型 $T_{11} \to T_{12}$ 与 $T_2$，再测试 $T_2 <: T_{11}$，于是每个项都取得一个**极小类型**。

::: widget graph
nodes: Top@1.5,3; {x}@0.5,2; {y}@2.5,2; {x,y}@1.5,1; {x,y,z}@0.5,0; {x,y,c}@2.5,0
edges: {x}>Top; {y}>Top; {x,y}>{x}; {x,y}>{y}; {x,y,z}>{x,y}; {x,y,c}>{x,y}
algorithm: topo
caption: 以整数为字段类型的记录类型（$c$ 是颜色类型），按宽度子类型排序；箭头从子类型指向直接父类型，$\mathsf{Top}$ 位于一切之上。这是一个偏序的**哈斯图**——子类型关系自反且传递，S-Trans 补出了图中省略的箭头（例如从 $\{x,y,z\}$ 到 $\{x\}$）。运行拓扑排序：每个类型都排在它的所有父类型之前。$\{x,y,z\}$ 与 $\{x,y,c\}$ 的最小公共父类型（**并**，join）是 $\{x,y\}$：若条件语句的两个分支分别具有这两个类型，则整个条件就被赋予这个并作为类型，所以并在类型化中很重要。
:::

::: quiz
设 $\mathsf{Nat} <: \mathsf{Int}$，哪些判断成立？
- [x] $\mathsf{Int} \to \mathsf{Nat} <: \mathsf{Nat} \to \mathsf{Int}$
- [ ] $\mathsf{Nat} \to \mathsf{Nat} <: \mathsf{Int} \to \mathsf{Int}$
- [x] $(\mathsf{Nat} \to \mathsf{Int}) \to \mathsf{Nat} <: (\mathsf{Int} \to \mathsf{Nat}) \to \mathsf{Int}$
- [ ] $(\mathsf{Int} \to \mathsf{Nat}) \to \mathsf{Nat} <: (\mathsf{Nat} \to \mathsf{Int}) \to \mathsf{Int}$
- [ ] $\mathrm{Ref}\ \{x{:}\mathsf{Nat}\} <: \mathrm{Ref}\ \{x{:}\mathsf{Int}\}$
::: solution
第一项成立：定义域翻转（$\mathsf{Nat} <: \mathsf{Int}$），余域协变（$\mathsf{Nat} <: \mathsf{Int}$）。第二项需要定义域满足 $\mathsf{Int} <: \mathsf{Nat}$：假。第三、四项中，参数位置本身又是一个箭头：$A \to \mathsf{Nat} <: B \to \mathsf{Int}$ 需要 $B <: A$。第三项中 $B = \mathsf{Int}\to\mathsf{Nat}$、$A = \mathsf{Nat}\to\mathsf{Int}$，而 $B <: A$ 正是第一条判断，为真。第四项中两者角色互换，而 $\mathsf{Nat}\to\mathsf{Int} <: \mathsf{Int}\to\mathsf{Nat}$ 为假。每经过一层定义域次序就翻转一次，所以嵌套在偶数层定义域中的位置是协变的（上面那个检查器对两者都给出一致的结果）。第四项不成立，因为引用是不变的。
:::
:::

## 对象、有界量化与模块

**对象**可以用这些工具来理解。对象是一个共享隐藏状态的闭包记录——方法是函数类型的字段，状态被捕获在它们的环境里（[[programming-languages/interpreters]]）。有了宽度子类型，面向对象语言「方法更多的对象可以代替方法较少的对象」的原则就成立了；深度子类型配上 S-Arrow 则给出「重写的方法可以接受更一般的参数、返回更具体的结果」的规则。（Java 与 C++ 允许协变的返回类型，却不允许逆变的参数类型；Eiffel 的协变参数是不可靠的，不得不靠运行时修补。）剩下的困难是 **self**：一个返回「与接收者同类型的对象」的方法需要递归类型；就继承而言，还必须仔细区分子类化（subclassing）与子类型化（subtyping）（Cook、Hill 与 Canning，"Inheritance is not subtyping"，1990）。

把子类型与参数多态结合起来就得到**有界量化** $\forall \alpha <: T.\,U$（Cardelli 与 Wegner，1985；System $F_{<:}$）：函数对 $T$ 的所有子类型多态，既能使用 $T$ 的运算，又仍能返回调用方那个更具体的类型。Java 的 `<T extends Comparable<T>>` 与 Rust 的 `T: PartialOrd` 就是有界量词。完整的 $F_{<:}$ 子类型是不可判定的（皮尔斯（Pierce），1992），所以各语言都对它施加限制。

### 模块与存在类型

**抽象数据类型**把表示隐藏在接口之后（[[program-design/abstract-data-types]]）。在类型论中，接口就是一个**存在类型**：计数器模块的类型是

$$
\exists \rho.\,\{\mathit{new} : \rho,\ \mathit{inc} : \rho \to \rho,\ \mathit{get} : \rho \to \mathsf{Int}\}
$$

——「存在某个带有这些运算的表示类型 $\rho$」。米切尔（Mitchell）与普洛特金（Plotkin）的 "Abstract types have existential type"（1988）使这一说法精确化。

::: definition 存在类型 {#def-existential}
增加类型 $\exists \alpha.\,T$ 与项 $\mathsf{pack}\ \langle S, t\rangle\ \mathsf{as}\ \exists \alpha.\,T$、$\mathsf{unpack}\ \langle \alpha, x\rangle = t_1\ \mathsf{in}\ t_2$，规则为

$$
\frac{\Gamma \vdash t : T[\alpha := S]}{\Gamma \vdash \mathsf{pack}\ \langle S, t\rangle\ \mathsf{as}\ \exists\alpha.\,T : \exists \alpha.\,T}
\qquad
\frac{\Gamma \vdash t_1 : \exists \alpha.\,T \quad \Gamma, \alpha, x{:}T \vdash t_2 : U \quad \alpha \notin \mathrm{FV}(U)}{\Gamma \vdash \mathsf{unpack}\ \langle \alpha, x\rangle = t_1\ \mathsf{in}\ t_2 : U}
$$

以及求值规则 $\mathsf{unpack}\ \langle \alpha, x\rangle = (\mathsf{pack}\ \langle S, v\rangle\ \mathsf{as}\ T')\ \mathsf{in}\ t_2 \to t_2[\alpha := S][x := v]$。
:::

::: example 计数器：一个存在类型包 {#ex-counter-pack}
把用 $\mathsf{Int}$ 实现的计数器打包成类型 $\mathit{Counter} = \exists \rho.\,\{\mathit{new}{:}\rho,\ \mathit{inc}{:}\rho\to\rho,\ \mathit{get}{:}\rho\to\mathsf{Int}\}$ 的一个值，使用它，并给出一个被类型系统拒绝的客户程序。
::: solution
这个包是 $c = \mathsf{pack}\ \langle \mathsf{Int}, \{\mathit{new} = 0,\ \mathit{inc} = \lambda n{:}\mathsf{Int}.\,n + 1,\ \mathit{get} = \lambda n{:}\mathsf{Int}.\,n\}\rangle\ \mathsf{as}\ \mathit{Counter}$，它良类型，因为把 $\rho := \mathsf{Int}$ 代入后记录恰好具有体类型。一个客户程序：$\mathsf{unpack}\ \langle \rho, m\rangle = c\ \mathsf{in}\ m.\mathit{get}\,(m.\mathit{inc}\,(m.\mathit{inc}\ m.\mathit{new}))$ 具有类型 $\mathsf{Int}$（结果中不含 $\rho$），求值得 $2$。客户程序 $\mathsf{unpack}\ \langle \rho, m\rangle = c\ \mathsf{in}\ m.\mathit{inc}\ 5$ 被拒绝：在体内部 $5 : \mathsf{Int}$，而 $m.\mathit{inc}$ 期望 $\rho$，且 $\rho$ 是一个新鲜变元，不是 $\mathsf{Int}$。同样被拒绝的还有 $\mathsf{unpack}\ \langle \rho, m\rangle = c\ \mathsf{in}\ m.\mathit{new}$，它的类型 $\rho$ 会逃逸出自己的作用域。第二种实现用负数计数（$\mathit{new} = 0$，$\mathit{inc} = \lambda n.\,n - 1$，$\mathit{get} = \lambda n.\,-n$），对每个客户程序都与第一种不可区分。
:::
:::

`pack` 隐藏表示类型 $S$（某个实现：比如把计数器实现为整数，且 $\mathit{inc} = \lambda n.\,n + 1$）；`unpack` 让客户程序在隐藏类型的一个新名字 $\alpha$ 之下使用这些运算。侧条件 $\alpha \notin \mathrm{FV}(U)$ 防止抽象类型逃逸出自己的作用域；又由于客户程序是在 $\alpha$ 抽象的前提下通过类型检查的，它不可能依赖于表示：这就是**表示无关性**（representation independence），可用参数性证明——凡由某个适当关系联系起来的两个实现，对每个客户程序都不可区分。存在类型甚至可以在 System F 中编码：$\exists \alpha.\,T$ 就是 $\forall \beta.\,(\forall \alpha.\,T \to \beta) \to \beta$。

ML 的模块系统在这一思想之上建立起**签名**（接口，含抽象类型成分）、**结构**（实现）与**函子**（结构到结构的函数，例如以有序键类型参数化的平衡树字典）。一个示意的 OCaml 签名与结构：

```text
module type COUNTER = sig
  type t                        (* 抽象：客户看不到它就是 int *)
  val zero : t
  val inc : t -> t
  val get : t -> int
end
module Counter : COUNTER = struct
  type t = int
  let zero = 0
  let inc n = n + 1
  let get n = n
end
```

在模块之外，`Counter.inc 5` 是类型错误：`5 : int`，而不是 `Counter.t`。带有类型成分的模块超出了简单存在类型——类型 `Counter.t` 可以在整个程序中用名字引用，这就导致了**半透明和**（translucent sums）与**明晰类型**（manifest types）的理论（哈珀（Harper）与利利布里奇（Lillibridge），1994；勒鲁瓦（Leroy），1994）。Java 的包与访问修饰符、Rust 中字段私有的模块、以及 Python 的下划线前缀约定，都以较弱的甚至没有静态保证的方式实现信息隐藏。

::: history
斯特雷奇（Strachey）的讲义 *Fundamental Concepts in Programming Languages*（1967）给出了参数多态与特设多态这两个名称。吉拉尔（Girard）的博士论文（1972）为证明二阶算术的性质引入了 System F；雷诺兹（Reynolds）对此并不知情，在 "Towards a theory of type structure"（1974）中定义了多态 λ-演算，并在 "Types, abstraction and parametric polymorphism"（1983）中证明了抽象定理。CLU（利斯科夫（Liskov）等，1977）与 Ada（1983）把泛型模块带入实践。卡尔代利（Cardelli）的 "A semantics of multiple inheritance"（1984，期刊版 1988）连同逆变的箭头规则引入了记录子类型；卡尔代利与韦格纳（Wegner）的 "On understanding types, data abstraction, and polymorphism"（1985）引入了有界量化。芭芭拉·利斯科夫（Liskov）与珍妮特·温（Wing）把替换原则形式化（1994）。米切尔（Mitchell）与普洛特金（Plotkin）（1988）把抽象类型等同于存在类型；戴维·麦奎恩（MacQueen）设计了 Standard ML 的模块（1984）。拉德勒（Wadler）的 "Theorems for free!"（1989）与韦尔斯（Wells）的不可判定性证明（1994）完成了整幅图景。Java 于 2004 年加入泛型（J2SE 5.0），C# 于 2005 年，Go 于 2022 年（Go 1.18）。
:::

## 后续内容

这些思想在真实的类型检查器中汇合：Scala 与 OCaml 兼有参数多态、子类型与模块；Haskell 的类型类比把特设多态做得有原则（拉德勒与 Blott，1989）；Rust 的 trait 把有界多态与存在类型结合起来（`impl Trait`、`dyn Trait`）。依赖类型（Coq、Agda、Lean）把 $\forall$ 推广为既可量化类型也可量化值。[[programming-languages/control]] 为带类型的语言加上异常与续延，[[compilers]] 则展示方法字典、类型擦除与单态化是如何实现的。

::: summary
- 多态分为**参数多态**（对所有类型一致）、**特设多态**（重载）与**子类型多态**（包含）。
- **System F**（[[#def-system-f]]）允许 $\forall$ 出现在任意位置，类型抽象与应用显式可写；它是安全的（[[#thm-safety-f]]）且强归一化，但它的类型推断不可判定。Hindley–Milner 是它的秩 1 片段。
- **参数性**：多态代码无法查看类型，所以类型约束行为——类型 $\forall \alpha.\,\alpha \to \alpha$ 的唯一闭项是恒等函数（[[#prop-only-id]]）；运行时类型检验与效应会破坏这一点。
- **子类型**经**包含规则**与类型化相联系（[[#def-subtyping]]）；记录有宽度、深度与置换三种子类型。
- 函数类型对参数**逆变**、对结果协变（[[#prop-contra]]）；可变引用**不变**（[[#prop-ref-invariant]]），Java 的协变数组用运行时检查来修补。
- 不含传递性规则的句法导向**算法化**子类型关系与陈述式关系等价（[[#thm-algorithmic]]）。
- **存在类型**为抽象数据类型与模块建模（[[#def-existential]]）：客户程序针对抽象类型检查，不可能依赖表示。
:::

## 习题

::: exercise 类型应用 {level=1}
计算下列类型：(a) $\mathit{id}\,[\mathsf{Nat} \to \mathsf{Nat}]$；(b) $(\Lambda \alpha.\,\Lambda \beta.\,\lambda x{:}\alpha.\,\lambda y{:}\beta.\,x)\,[\mathsf{Nat}]$；(c) $c_2\,[\mathsf{Bool}]$；并规约 $\mathit{id}\,[\mathsf{Nat}]\ 3$。
::: solution
(a) $(\mathsf{Nat}\to\mathsf{Nat}) \to (\mathsf{Nat}\to\mathsf{Nat})$。(b) $\forall \beta.\,\mathsf{Nat} \to \beta \to \mathsf{Nat}$——只实例化了最外层的量词。(c) $(\mathsf{Bool}\to\mathsf{Bool})\to\mathsf{Bool}\to\mathsf{Bool}$。$\mathit{id}\,[\mathsf{Nat}]\ 3 \to (\lambda x{:}\mathsf{Nat}.\,x)\ 3 \to 3$，依次使用 E-TApp（连同 E-TAppTAbs）与 E-AppAbs。
:::
:::

::: exercise 手工子类型判定 {level=1 check="3"}
设 $\mathsf{Nat} <: \mathsf{Int}$，下列各式中有几个成立？(a) $\{a{:}\mathsf{Nat}, b{:}\mathsf{Bool}\} <: \{a{:}\mathsf{Int}\}$；(b) $\{a{:}\mathsf{Int}\} \to \mathsf{Nat} <: \{a{:}\mathsf{Int}, b{:}\mathsf{Bool}\} \to \mathsf{Int}$；(c) $\mathsf{Int} \to \mathsf{Int} <: \mathsf{Nat} \to \mathsf{Nat}$；(d) $\{f{:}\mathsf{Int}\to\mathsf{Nat}\} <: \{f{:}\mathsf{Nat}\to\mathsf{Int}\}$；(e) $\mathrm{Ref}\ \mathsf{Nat} <: \mathrm{Ref}\ \mathsf{Int}$。（输入成立的个数。）
::: solution
(a) 成立：宽度规则丢掉 $b$，深度给出 $\mathsf{Nat} <: \mathsf{Int}$。(b) 成立：定义域需要 $\{a, b\} <: \{a\}$（宽度），余域需要 $\mathsf{Nat} <: \mathsf{Int}$。(c) 不成立：余域将需要 $\mathsf{Int} <: \mathsf{Nat}$。(d) 成立：深度子类型，配合 $\mathsf{Int}\to\mathsf{Nat} <: \mathsf{Nat}\to\mathsf{Int}$。(e) 不成立：引用是不变的。共有三个成立。
:::
:::

::: exercise 多态布尔值 {level=1}
在 System F 中，设 $\mathsf{CBool} = \forall \alpha.\,\alpha \to \alpha \to \alpha$。写出 $\mathsf{tru}$、$\mathsf{fls}$ 与 $\mathsf{not} : \mathsf{CBool} \to \mathsf{CBool}$，并用非正式的参数性论证说明 $\mathsf{CBool}$ 恰有两个闭范式居留项。
::: solution
$\mathsf{tru} = \Lambda \alpha.\,\lambda t{:}\alpha.\,\lambda f{:}\alpha.\,t$，$\mathsf{fls} = \Lambda \alpha.\,\lambda t{:}\alpha.\,\lambda f{:}\alpha.\,f$，$\mathsf{not} = \lambda b{:}\mathsf{CBool}.\,\Lambda \alpha.\,\lambda t{:}\alpha.\,\lambda f{:}\alpha.\,b\,[\alpha]\ f\ t$。按 [[#prop-only-id]] 的论证，类型 $\mathsf{CBool}$ 的闭范式形如 $\Lambda \alpha.\,\lambda t{:}\alpha.\,\lambda f{:}\alpha.\,u$，其中 $u : \alpha$ 是变元 $t, f : \alpha$ 之上的中立项，而这两个变元都不能被施加实参；所以 $u$ 是 $t$ 或 $f$。恰有两个居留项：这个类型**就是**布尔值。
:::
:::

::: exercise 手工推出一个自由定理 {level=2}
设 $r : \forall \alpha.\,\mathrm{List}\ \alpha \to \mathrm{List}\ \alpha$ 的实现不使用运行时类型检验或效应（例子：reverse、tail、取前三个元素）。论证对一切 $g$ 与 $xs$ 都有 $\mathrm{map}\ g\,(r\ xs) = r\,(\mathrm{map}\ g\ xs)$，并给出一个带有此标注而该定律不成立的 Python 函数。
::: solution
由于 $r$ 无法查看未知类型 $\alpha$ 的元素，它的输出只能由输入中的元素组成，按输入的**形状**（即长度）来挑选和排列。$\mathrm{map}\ g$ 改变元素而不改变形状，所以先选位置再施加 $g$ 与先施加 $g$ 再选位置得到同一个表：两边都是 $[g(x_{i_1}), \ldots, g(x_{i_k})]$，其指标序列由长度确定。雷诺兹的抽象定理用关系「$g$ 的图」把这一点精确化。一个 Python 反例：`def r[T](xs: list[T]) -> list[T]: return [x for x in xs if not (isinstance(x, int) and x < 0)]`。取 `g = lambda x: -x`、`xs = [1]`：`map(g, r([1])) = [-1]`，而 `r(map(g, [1])) = r([-1]) = []`。运行时类型检验让这个「泛型」函数得以查看元素。
:::
:::

::: exercise 结果协变、参数逆变 {level=2}
类 `Animal` 有方法 `adopt(self, other: Animal) -> Animal`。子类 `Dog` 要重写它。下面哪些签名使 `Dog` 在 [[#def-subtyping]] 的意义下仍是 `Animal` 的行为子类型？(a) `adopt(self, other: Animal) -> Dog`；(b) `adopt(self, other: Dog) -> Animal`；(c) `adopt(self, other: object) -> Dog`；(d) `adopt(self, other: Dog) -> Dog`。
::: solution
方法的类型必须是 $\mathit{Animal} \to \mathit{Animal}$ 的子类型：参数可以更一般（逆变），结果可以更具体（协变）。(a) 可以——结果 $\mathit{Dog} <: \mathit{Animal}$。(b) 不行——参数变窄了：持有 `Animal` 引用的代码可能传入一个 `Cat`。(c) 可以——两处改动都在安全的方向上。(d) 不行，理由同 (b)。mypy 会把 (b) 与 (d) 报为不兼容的重写（"violates the Liskov substitution principle"）；Java 与 C++ 允许 (a)，但把 (b)、(c)、(d) 当作重载而不是重写。
:::
:::

::: exercise 传递性：具体一点 {level=2}
给出一个使用 S-Trans 的陈述式推导，证明 $\{x{:}\mathsf{Nat}, y{:}\mathsf{Int}, z{:}\mathsf{Bool}\} <: \{y{:}\mathsf{Int}, x{:}\mathsf{Int}\}$，并说明算法一步记录规则就能判定它。
::: solution
陈述式：S-RcdWidth 给出 $\{x{:}\mathsf{Nat}, y{:}\mathsf{Int}, z{:}\mathsf{Bool}\} <: \{x{:}\mathsf{Nat}, y{:}\mathsf{Int}\}$；S-RcdDepth 配合 $\mathsf{Nat} <: \mathsf{Int}$ 与 S-Refl 给出 $\{x{:}\mathsf{Nat}, y{:}\mathsf{Int}\} <: \{x{:}\mathsf{Int}, y{:}\mathsf{Int}\}$；S-RcdPerm 给出 $\{x{:}\mathsf{Int}, y{:}\mathsf{Int}\} <: \{y{:}\mathsf{Int}, x{:}\mathsf{Int}\}$；两次 S-Trans 把它们接起来。算法化：对目标类型的每个字段——$y$ 与 $x$——到源类型中查找（$\mathsf{Int}$ 与 $\mathsf{Nat}$），检查 $\mathsf{Int} <: \mathsf{Int}$ 与 $\mathsf{Nat} <: \mathsf{Int}$——算法的一个情形，无需猜中间类型。
:::
:::

::: exercise Python 中的函数与记录子类型 {level=3}
把子类型检查器扩充到**变体**（带标签的和，tagged union）类型 $\langle l_1{:}T_1, \ldots, l_n{:}T_n\rangle$，其值携带其中一个标签。由替换原则导出它的子类型规则，实现它，并验证 $\langle \mathit{circle}{:}\mathsf{Int}\rangle <: \langle \mathit{circle}{:}\mathsf{Int}, \mathit{square}{:}\mathsf{Int}\rangle$ 成立而反向不成立。
::: solution
变体类型的值是一个带标签的分支，而消费者必须能处理它所期望的类型的每个标签。分支**较少**的变体可以用在期望分支较多的变体的地方，因为消费者能处理的标签集合是可能出现的标签集合的超集：宽度子类型的方向与记录相反。深度是协变的（$\mathsf{Nat}$ 载荷可以当作 $\mathsf{Int}$ 来读）。规则：若每个 $k_j$ 都是某个 $l_i$ 且 $S_j <: T_i$，则 $\langle k_j{:}S_j\rangle_j <: \langle l_i{:}T_i\rangle_i$。

```python
@dataclass(frozen=True)
class Variant: alts: tuple                     # ((标签, 类型), ...)
# subtype 中新增的一个情形：
        case Variant(ss), Variant(ts):
            d = dict(ts)
            return all(l in d and subtype(S, d[l]) for l, S in ss)
```

取 `C = Variant((("circle", Int),))` 与 `CS = Variant((("circle", Int), ("square", Int)))`，`subtype(C, CS)` 为 `True` 而 `subtype(CS, C)` 为 `False`。记录与变体是对偶的：记录是乘积（消费者可以使用任何字段，所以生产者必须至少提供这些字段），变体是和（生产者选择一个标签，所以消费者必须至少能处理这些标签）。
:::
:::

::: exercise 存在类型的编码 {level=3}
证明 $\exists \alpha.\,T$ 可以在 System F 中编码为 $\forall \beta.\,(\forall \alpha.\,T \to \beta) \to \beta$：给出 $\mathsf{pack}$ 与 $\mathsf{unpack}$ 的编码，并验证编码后的 $\mathsf{unpack}$ 作用于编码后的 $\mathsf{pack}$ 时，其规约恰如 [[#def-existential]] 的求值规则所要求。
::: solution
把 $\mathsf{pack}\ \langle S, t\rangle\ \mathsf{as}\ \exists\alpha.\,T$ 编码为 $\Lambda \beta.\,\lambda k{:}(\forall \alpha.\,T \to \beta).\,k\,[S]\ t$。它具有类型 $\forall \beta.\,(\forall \alpha.\,T \to \beta) \to \beta$：$k\,[S] : T[\alpha := S] \to \beta$ 且 $t : T[\alpha := S]$。把 $\mathsf{unpack}\ \langle \alpha, x\rangle = t_1\ \mathsf{in}\ t_2$（类型 $U$）编码为 $t_1\,[U]\ (\Lambda \alpha.\,\lambda x{:}T.\,t_2)$；续延的类型是 $\forall \alpha.\,T \to U$，它之所以合式是因为 $\alpha \notin \mathrm{FV}(U)$——unpack 规则的侧条件自然出现。规约：$(\Lambda \beta.\,\lambda k.\,k\,[S]\ v)\,[U]\ (\Lambda \alpha.\,\lambda x{:}T.\,t_2) \to (\lambda k.\,k\,[S]\ v)\,(\Lambda\alpha.\,\lambda x.\,t_2) \to (\Lambda\alpha.\,\lambda x{:}T.\,t_2)\,[S]\ v \to (\lambda x{:}T[\alpha:=S].\,t_2[\alpha := S])\ v \to t_2[\alpha := S][x := v]$，恰如所要求。客户程序 $t_2$ 只在 $\alpha$ 抽象的前提下检查一次，然后带着隐藏的 $S$ 运行：抽象就是换一个角度看的参数多态。
:::
:::
