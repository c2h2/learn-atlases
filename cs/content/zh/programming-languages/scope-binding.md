运行下面这个小 shell 脚本：

```console
$ cat dyn.sh
x=global
show() { echo "show sees x=$x"; }
caller() { local x=caller; show; }
show
caller
$ bash dyn.sh
show sees x=global
show sees x=caller
```

函数 `show` 引用了一个变量 `x`。从顶层调用它时，它看到的是全局的 `x`；从 `caller` 调用它时，它看到的是 `caller` 的局部 `x`——尽管 `show` 写在 `caller` 外面，对它一无所知。在 Python、Scheme、C 或 Java 中，等价的程序会打印两次 `global`。shell 靠观察*谁调用了谁*来解析名字；多数语言则靠观察*代码写在哪里*来解析。两者都是把名字的一次使用与它的一个声明联系起来的规则，而在两者之间作选择，是语言设计的基本决策之一。

本章讨论名字：一个名字能被绑定到什么、在何时绑定；决定名字的一次使用指哪个绑定的作用域规则；作用域与一等函数如何交互（「函元（funarg）问题」）；赋值如何迫使我们把名字与存储分开；向过程传递实参的机制；以及存储能活多久。我们将改动 [[programming-languages/interpreters]] 中的解释器，逐一试用每个备选方案。

## 绑定与绑定时刻

::: definition 绑定、作用域与生存期 {#def-binding}
一个**绑定**是名字与某个实体之间的关联——实体可以是值、存储位置、函数、类型或模块。一条**声明**创建一个绑定。一个绑定的**作用域**是程序文本中使该名字的使用指向它的那一片区域。一个实体的**生存期**（**extent**）是它存在的那段执行时期。
:::

作用域是程序文本的属性；生存期是执行过程的属性。对局部变量两者常常重合，但并非总是：被闭包捕获的变量在其作用域早已离开之后仍然活着，而 C 中的 `static` 局部变量具有块作用域却存活整个运行期间。

一个属性的**绑定时刻**是它被确定的时刻：在*语言设计*时（Python 中整数 `+` 的含义）、*实现*时（某个 C 编译器中 `int` 的宽度）、*编译*时（Java 局部变量的类型、结构体字段的偏移量）、*链接*时（库函数的地址，[[computer-systems/linking-loading]]）、*加载*时（地址空间随机化下全局变量的地址）或*运行*时（变量的值；在 Python 中，还有 `x.area()` 调用哪个方法）。早绑定带来检查与高效代码；晚绑定带来灵活性。「静态」语言与「动态」语言之间的许多差别，正是绑定时刻的差别。

## 静态作用域与动态作用域

作用域是嵌套的：函数体、`let` 体或块会引入在其中可见的绑定，而名字的内层声明会**屏蔽**外层声明。问题是当函数从别处被调用时，「内部」意味着什么。

::: definition 词法作用域与动态作用域 {#def-scope-rules}
在**词法**（**静态**）**作用域**下，名字的一次使用指的是在*文本上*包含它的最内层构造中声明它的那个绑定。在**动态作用域**下，名字的一次使用指的是*执行中仍然活动的*最近一次绑定——即最近一次调用、尚未返回的函数所创建的那个绑定。
:::

在 [[programming-languages/interpreters#def-env-semantics]] 的环境语义中，两条规则只在一处不同，即函数体所用的环境：

$$
\text{词法： } \frac{\rho \vdash e_1 \Downarrow \langle \lambda x.\,e, \rho'\rangle \quad \rho \vdash e_2 \Downarrow v_2 \quad \rho'[x \mapsto v_2] \vdash e \Downarrow v}{\rho \vdash (e_1\ e_2) \Downarrow v}
\qquad
\text{动态： } \frac{\rho \vdash e_1 \Downarrow \lambda x.\,e \quad \rho \vdash e_2 \Downarrow v_2 \quad \rho[x \mapsto v_2] \vdash e \Downarrow v}{\rho \vdash (e_1\ e_2) \Downarrow v}
$$

在动态作用域下，函数值根本不需要环境，只需要它的代码；体在*调用者*的环境中求值。解释器的改动只有两行：

```python
def ev_dyn(e, env):
    match e:
        case Lam(x, body): return Closure(x, body, None)      # 不捕获环境
        case App(fn, arg):
            f = ev_dyn(fn, env); v = ev_dyn(arg, env)
            return ev_dyn(f.body, Env({f.param: v}, env))     # 调用者的环境
        # ... 其余各情形与 ev 相同，只是改为调用 ev_dyn
```

::: example 同样的程序，两种作用域规则 {#ex-two-scopes}
在词法作用域与动态作用域下分别运行下面两个程序：

```text
p1 = (let ((x 1)) (let ((f (lambda (y) (+ x y)))) (let ((x 100)) (f 10))))
p2 = (let ((make-adder (lambda (n) (lambda (x) (+ x n)))))
       (let ((add5 (make-adder 5))) (add5 10)))
```
::: solution
```console
lexical  p1: 11     dynamic  p1: 110
lexical  p2: 15     dynamic  p2: error: unbound variable n
```

在 `p1` 中，`f` 的体 `(+ x y)` 求值时，最近的绑定是 $x = 100$，所以动态作用域给出 $110$；词法作用域使用 `f` 写处可见的 $x = 1$。在 `p2` 中，差别不只是答案不同，而是更糟。`make-adder` 返回 `(lambda (x) (+ x n))`，而在动态作用域下，`make-adder` 一返回，`n` 的绑定就消失了。之后调用 `add5` 时没有任何活动的 `n`，程序失败。动态作用域下，函数无法有效地返回引用其形参的函数——即**上向函元问题**（upward funarg problem）。
:::
:::

::: widget graph
nodes: G@3,2; Fx1@2,2; Ff@1,2; Fx100@0,2; Fy@1,0.8
edges: Fx1>G; Ff>Fx1; Fx100>Ff; Fy>Fx1; Fy>Fx100
algorithm: bfs
start: Fy
caption: `p1` 在求值 `(+ x y)` 那一刻的各个帧。上排中每个 `let` 帧指向其父帧：$F_{x1} = \set{x \mapsto 1}$，$F_f = \set{f \mapsto \ldots}$，$F_{x100} = \set{x \mapsto 100}$。调用帧 $F_y = \set{y \mapsto 10}$ 有两个候选父帧：**静态链**指向 $F_{x1}$，即函数定义之处；**动态链**指向 $F_{x100}$，即调用者的帧。词法作用域沿静态链走，一步之外找到 $x = 1$；动态作用域沿动态链走，先找到 $x = 100$。从 $F_y$ 出发逐步搜索，注意每条路径先到达哪个 $x$。
:::

除了函元问题，动态作用域还有一个严重缺陷：它把局部变量的名字暴露给被调用的每一个函数。给一个局部变量改名——一个本不该有任何影响的改动——可能改变无关代码的行为。

::: proposition 动态作用域不保持 α-等价 {#prop-dyn-alpha}
在词法作用域下，给约束变元改名（一致地、不发生捕获）从不改变程序的结果。在动态作用域下则可能改变。
:::

::: proof
对词法作用域：由 [[programming-languages/interpreters#thm-env-correct]] 及其逆命题，一个封闭程序在环境语义下与在代入语义下结果相同，而代入语义定义在 α-等价类上（[[programming-languages/lambda-calculus#def-alpha]]）：β-规则与代入对 α-等价的项的处理完全相同。所以 α-等价的程序结果相同。

对动态作用域，一个反例就够。在 `p1` 中，把最内层 `let` 约束的变元从 `x` 改名为 `z`，得到 `(let ((x 1)) (let ((f (lambda (y) (+ x y)))) (let ((z 100)) (f 10))))`。改名是一致的（`z` 在其他地方不出现），两个程序 α-等价。动态作用域下原程序给出 $110$，改名后的给出 $11$。
:::

这就是为什么 1970 年代末以来设计的几乎每种语言都采用词法作用域。动态作用域在少数地方存活下来，有时还正是刻意为之：Unix shell、Emacs Lisp（其文件默认动态作用域，除非启用 `lexical-binding`；自 2020 年的 Emacs 27 起，新代码以词法作用域为默认）、Perl 的 `local`、TeX 宏，以及 Racket、Common Lisp（「特殊变量」）和 Scala 的隐含参数中的*动态作用域参数*，用于当前输出端口这类许多函数都要读取、却不必显式传递的设置。进程的环境变量也是动态作用域的：子进程从父进程继承它们，无论父进程程序是谁写的。

### Python 的作用域规则

Python 是词法作用域的，但有两点特殊。其一，作用域的单位是函数（以及类和模块），而不是块：在 `for` 循环里赋值的变量在循环之后仍然可见。其二，一个名字是否为函数的局部变量是*静态*判定的，对函数整个体生效：只要名字在函数中任何地方被赋值（除非声明为 `global` 或 `nonlocal`），它就是局部的。之后按 **LEGB** 顺序查找名字——局部（local）、外层函数（enclosing function）、全局（模块，global）、内建（built-in）。

```python
x = 10
def f():
    print(x)        # x 是 f 的局部变量（下面有赋值），所以这次读取失败
    x = 20
try:
    f()
except UnboundLocalError as e:
    print("UnboundLocalError:", e)

def counter():
    n = 0
    def inc():
        nonlocal n      # n 指 counter 的变量，inc 可对它赋值
        n += 1
        return n
    return inc
c = counter(); c(); c()
print(c(), c.__code__.co_freevars, c.__closure__[0].cell_contents)
```

```console
UnboundLocalError: cannot access local variable 'x' where it is not associated with a value
3 ('n',) 3
```

尽管存在全局 `x`，第一个函数仍然失败，因为编译器在编译时就已判定 `f` 中的 `x` 是局部的——绑定是静态的，尽管错误要到运行时才报告。在 `counter` 中，闭包 `inc` 引用的是外层调用的*变量* `n`，而不是创建时它的值；Python 把这类变量存在**单元**（cell，即 `__closure__`）中，由外层函数与每个捕获它的闭包共享。这就是为什么在循环中创建的 lambda 全都看到循环变量的最终值（[[program-design/higher-order-functions]]）。

::: quiz
哪些程序打印 `1`？
- [x] Python: `x = 1` / `def f(): return x` / `def g(): x = 2; return f()` / `print(g())`
- [ ] bash: `x=1; f() { echo $x; }; g() { local x=2; f; }; g`
- [x] Python: `def h(): x = 1; return lambda: x` / `x = 2` / `print(h()())`
- [x] Python: `fs = [lambda: i for i in range(2)]` / `print(fs[0]())`
::: solution
第一个程序中，`f` 的 `x` 是全局变量，无论 `g` 在局部绑定什么（词法作用域）。bash 版本打印 `2`：shell 的 `local` 是动态作用域的。第三个返回对 `h` 的局部 `x` 的闭包，其值为 $1$；全局的 `x = 2` 无关。第四个打印 `1`，而不是 `0`：两个 lambda 共享推导式的变量 `i`，其最终值是 $1$——是词法作用域，不过作用于*变量*而非值。
:::
:::

## 词法定址与 de Bruijn 下标

除了可预测性，词法作用域还有一个实际优点：名字所指的绑定在程序运行之前就已确定，因此编译器可以把每个变量替换为它的*位置*。数一数一次使用与它的约束词之间隔着多少个约束词：

::: definition de Bruijn 下标 {#def-debruijn}
在 λ-项的 **de Bruijn 表示**中，约束词不带名字，变元的每次约束出现被替换为它的**下标**：该出现与它的约束词之间 λ 的个数。（自由变量保留名字。）项 $\lambda f.\,\lambda x.\,f\,(f\ x)$ 变成 $\lambda.\,\lambda.\,1\,(1\ 0)$；$\lambda x.\,\lambda y.\,x$ 变成 $\lambda.\,\lambda.\,1$。
:::

这一变换是一次结构递归，携带包含它的约束词列表（最内层在前）；$x$ 的下标就是它在该列表中的位置。

::: algorithm 转换为 de Bruijn 形式 {#alg-debruijn}
$\mathrm{db}(t, \Gamma)$，其中 $\Gamma$ 是变元名字的列表（最内层在前）：

1. $\mathrm{db}(x, \Gamma) = k$，若 $x$ 在 $\Gamma$ 中的第一次出现位于位置 $k$（从 $0$ 开始计数）；若 $x$ 不在 $\Gamma$ 中出现，则 $= x$。
2. $\mathrm{db}(\lambda x.\,t, \Gamma) = \lambda.\,\mathrm{db}(t, x :: \Gamma)$。
3. $\mathrm{db}(t_1\ t_2, \Gamma) = \mathrm{db}(t_1, \Gamma)\ \mathrm{db}(t_2, \Gamma)$。

项 $t$ 的变换为 $\mathrm{db}(t, [\,])$。
:::

取 $\Gamma$ 中 $x$ 的*第一次*出现实现了屏蔽：在 $\lambda x.\,\lambda x.\,x$ 中，体处的上下文是 $[x, x]$，下标是 $0$，即内层约束词。

```python
@dataclass(frozen=True)
class Idx: k: int
@dataclass(frozen=True)
class DLam: body: object
@dataclass(frozen=True)
class DApp: fun: object; arg: object

def to_db(t, ctx=()):
    """ctx 按最内层在前列出包含它的约束词；自由变量保留名字。"""
    match t:
        case Var(x): return Idx(ctx.index(x)) if x in ctx else t
        case Lam(x, b): return DLam(to_db(b, (x,) + ctx))
        case App(f, a): return DApp(to_db(f, ctx), to_db(a, ctx))
```

```console
λx. x                          λ. 0
λx y. x                        λ. λ. 1
λy x. y                        λ. λ. 1
λf x. f (f x)                  λ. λ. 1 (1 0)
λx. λx. x                      λ. λ. 0
λx. x z                        λ. 0 z
λz. (λy. y (λx. x)) (λx. z x)  λ. (λ. 0 (λ. 0)) (λ. 1 0)
```

最后一行表明，同一个变元在不同地方会得到不同的下标（$z$ 在 $\lambda x$ 内部是 $1$），而同一个下标也可以表示不同的变元。名字已被地址取代。

::: theorem α-等价即 de Bruijn 形式下的相等 {#thm-debruijn}
对 λ-项 $t$ 与 $u$：$t \equiv_\alpha u$ 当且仅当 $\mathrm{db}(t, [\,]) = \mathrm{db}(u, [\,])$。
:::

::: proof
我们证明更一般的命题：对长度相同的列表 $\Gamma, \Delta$，$\mathrm{db}(t, \Gamma) = \mathrm{db}(u, \Delta)$ 当且仅当 $t$ 与 $u$ 「相对于 $\Gamma$ 与 $\Delta$ 的配对」α-等价——意思是它们形状相同，并且在每个变元位置上，要么两个变元都在同一位置 $k$ 被约束（$t$ 的该变元在 $\Gamma$ 中的第一次出现与 $u$ 的该变元在 $\Delta$ 中的第一次出现都在 $k$），要么两者在各自的上下文中自由且同名。当 $\Gamma = \Delta = [\,]$ 时，这个关系就是 α-等价，因为 α-等价的项恰在约束变元的名字上有差别，且与各自的约束词保持一致。

对 $t$ 作结构归纳。若 $t = x$：$\mathrm{db}(t, \Gamma)$ 是下标 $k$ 或名字 $x$，$u$ 同理；输出相等恰当 $u$ 是也在位置 $k$ 被约束的变元，或同样自由且同名——这就是该关系的定义。若 $t = \lambda x.\,t'$：$\mathrm{db}(t, \Gamma) = \lambda.\,\mathrm{db}(t', x :: \Gamma)$，它等于 $\mathrm{db}(u, \Delta)$ 仅当 $u = \lambda y.\,u'$ 且 $\mathrm{db}(t', x :: \Gamma) = \mathrm{db}(u', y :: \Delta)$，而由归纳假设，这恰在 $t'$ 与 $u'$ 在添上 $(x, y)$ 后的配对下相关时成立——这正是两个抽象相关的条件。应用情形由两侧的归纳假设直接得出。
:::

于是在 de Bruijn 表示下，α-等价就是句法相等，而代入再也不需要改名（改为对下标做平移）。证明助手与许多编译器在内部都以这种方式表示约束变元。对解释器而言，好处是速度：环境变成一个数组，一次变元查找从字典搜索变成数组下标访问。在有嵌套函数时，一个变量通过**词法地址** $(d, i)$ 定位：沿静态链上溯 $d$ 层，然后取该帧的第 $i$ 个槽位。CPython 做的正是这件事：局部变量被编译成槽位号（`LOAD_FAST 0`），被捕获的变量编译成单元槽位（`LOAD_DEREF`）。

## 帧住在何处：栈、堆与函元问题

在 C 中，函数的局部变量住在**栈帧**里，调用时压入、返回时弹出（[[computer-systems/machine-code]]）。这样做行得通，是因为 C 局部变量的生存期在函数返回时结束。有了一等函数，这就可能不成立。

**函元（funarg）问题**有两半。**下向函元**（downward funarg）是作为实参传给某个调用的函数，而该调用会在其定义帧结束之前结束——`sorted(xs, key=lambda x: x - offset)`。它的自由变量住在它运行时仍位于栈上的帧中，所以栈分配没有问题；闭包只需要一个指向其定义帧的指针（**静态链**）。Pascal 与 Algol 恰好只允许这样：过程可以向下传递，但不能被返回。**上向函元**（upward funarg）是活得比创建它的帧更久的函数——被返回（如 `make-adder` 那样），或被存入数据结构。它的环境必须比调用活得更久，所以那个帧不能被弹出。

::: proposition 帧何时能住在栈上 {#prop-stack}
在环境语义中，假设没有任何闭包逃出创建它的那次调用——没有闭包从函数被返回、被存入数据结构，或被绑定到创建调用之外的名字上。那么任何调用所创建的帧在它返回后都不可达，于是帧可以按后进先出的顺序分配与释放。
:::

::: proof
考虑一个创建帧 $F$ 的调用。在调用期间，对 $F$ 的引用只由两种方式产生：在 $F$ 中、或在静态链能到达 $F$ 的帧中求值一个 `lambda`（闭包指向它的创建帧），以及为这样的闭包创建子帧。由假设，这些闭包都不属于调用的结果、也不被存放在外部，所以调用返回之后，对 $F$ 及其后代帧的引用只可能来自其他这样的帧和闭包——不会来自调用者的帧、结果、或从它们可达的任何东西。因此在返回时刻，$F$ 与调用期间创建的每个帧都不可达；又因为调用是嵌套的，内层调用的帧比外层调用的帧更早变得不可达：按创建的逆序释放它们是安全的。
:::

当假设不成立时有两个经典解法。**堆**解法把帧（或至少被捕获的变量）分配到堆上，让垃圾回收器在没有任何闭包引用它们时回收——Scheme、ML、Haskell、JavaScript 和 Python 都这么做。编译器中的**闭包转换**是其改进：它把闭包实际用到的自由变量复制进一个堆分配的纪录，于是只有这些变量在调用之后继续存活（[[compilers]]）。第二个解法是*禁止*外逸的引用，或让程序员把它们显式声明出来；这就是 Rust 的做法。

::: example Rust 对上向函元问题的回答 {#ex-rust-funarg}
用 Rust 写出 `make_adder`，分别在带与不带 `move` 关键字下编译它。
::: solution
```rust
fn make_adder(n: i32) -> impl Fn(i32) -> i32 {
    move |x| x + n          // `move`：闭包取走 n 的一份自己的拷贝
}
fn main() {
    let add5 = make_adder(5);
    println!("{}", add5(10));
}
```

```console
$ rustc adder.rs && ./adder
15
```

若没有 `move`，闭包*借用* `n`，而 `n` 住在 `make_adder` 的栈帧中，编译器（2026 年的 rustc 1.95）将拒绝：

```console
error[E0373]: closure may outlive the current function, but it borrows `n`, which is owned by the current function
 --> adder2.rs:2:5
  |
2 |     |x| x + n
  |     ^^^     - `n` is borrowed here
  |     |
  |     may outlive borrowed value `n`
```

Rust 保留栈分配，并在编译时检出上向函元。有了 `move`，`n` 的值被复制进闭包对象，闭包对象再按值返回：闭包拥有它自己的环境，所以既不需要堆上的帧，也不需要垃圾回收器。
:::
:::

## 赋值：名字、位置与值

到目前为止，环境把名字直接映射到值。语言一旦有了赋值，一个名字的两次使用就必须共享一个可变的*盒子*，而不是共享一个值。在上面的 `counter` 中，`inc` 与 `counter` 都引用同一个 `n`，其中一个里的 `n += 1` 必须在另一个里可见。标准模型把两个映射分开。

::: definition 环境与存储 {#def-store}
一个**位置** $\ell$ 是一个可易变单元的地址。一个**环境** $\rho$ 把名字映射到位置；一个**存储** $\sigma$ 把位置映射到值。变元 $x$ 的含义是 $\sigma(\rho(x))$。求值让存储贯穿整个计算：$\rho, \sigma \vdash e \Downarrow v, \sigma'$。赋值改变存储，不改变环境：

$$
\frac{\rho, \sigma \vdash e \Downarrow v, \sigma'}{\rho, \sigma \vdash (\mathsf{set!}\ x\ e) \Downarrow 0, \sigma'[\rho(x) \mapsto v]}
\qquad
\frac{\ell \notin \mathrm{dom}\,\sigma_2 \quad \rho, \sigma \vdash e_1 \Downarrow \langle \lambda x.\,e, \rho'\rangle, \sigma_1 \quad \rho, \sigma_1 \vdash e_2 \Downarrow v_2, \sigma_2 \quad \rho'[x \mapsto \ell], \sigma_2[\ell \mapsto v_2] \vdash e \Downarrow v, \sigma_3}{\rho, \sigma \vdash (e_1\ e_2) \Downarrow v, \sigma_3}
$$
:::

应用规则为形参分配一个新位置。注意求值 $e_1$ 产生的存储正是求值 $e_2$ 的输入：这条规则如今*固定*了从左到右的求值顺序，而表达式一旦有副作用，这就不再无关紧要。名字的位置与其值之间的区别，就是**左值**与**右值**的老区别（Strachey，1967）：在 `x = x + 1` 中，左边的 `x` 表示一个位置，右边的表示一个值。

绑定到同一位置的两个名字互为**别名**。别名正是命令式程序难以推理的原因：通过一个名字的赋值会改变另一个名字读到的内容。

## 参数传递机制

有了存储，我们就能精确地说出一个实参会经历什么。

::: definition 参数传递机制 {#def-passing}
对形参为 $x$ 的调用 $f(a)$：

- **按值调用**：把 $a$ 求值为 $v$，为 $x$ 分配一个存放 $v$ 的新位置。对 $x$ 的赋值对调用者不可见。
- **按引用调用**：$a$ 必须是一个左值（变量、数组元素、字段）；把 $x$ 绑定到*它的位置*。$x$ 是 $a$ 的别名。
- **按值结果调用**（复制进入/复制出去）：与按值调用相同，只是在返回时把 $x$ 的最终值复制回 $a$ 的位置。
- **按名调用**：把 $x$ 绑定到一个 **thunk**，即未求值的表达式 $a$ 与调用者环境配成的对；$x$ 的每次使用都重新求值这个 thunk，而对 $x$ 的赋值则赋给 $a$ 的左值。
- **按需求调用**：与按名调用相同，但 thunk 的值在第一次求值时被保存下来，供以后复用（**惰性求值**）。
:::

C、Python、Java、OCaml 与 Scheme 是按值调用的。C++（`&` 参数）、Pascal（`var`）、Fortran（传统上）与 C#（`ref`）提供按引用调用；Ada 的 `in out` 参数可以用引用或值结果实现。Algol 60 的默认是按名调用，Haskell 是按需求调用的。Python、Java 与 JavaScript 按值传递*对象引用*——有时称为**按共享调用**（call-by-sharing）：被调用者可以改动调用者传入的对象，但对形参的赋值只重新绑定被调用者的名字。

我们给解释器加一个由 `Cell` 对象构成的存储、并选择把形参绑定到什么，从而把以上机制全部实现出来：

```python
class Cell:                                  # 存储中的一个位置
    def __init__(self, v): self.v = v
class Thunk:                                 # 一个未求值的实参
    def __init__(self, e, env, memo): self.e, self.env, self.memo, self.done = e, env, memo, False

def force(cell):                             # 单元中存放的值
    v = cell.v
    if isinstance(v, Thunk):
        if v.done: return v.val
        val = ev(v.e, v.env)
        if v.memo: v.done, v.val = True, val
        return val
    return v

        case App(fn, arg):                   # 在 ev 中：env 把名字映射到 Cell
            f = ev(fn, env)
            match MODE:
                case "value": cell = Cell(ev(arg, env))
                case "reference":
                    cell = env[arg.name] if isinstance(arg, Var) else Cell(ev(arg, env))
                case "name": cell = Cell(Thunk(arg, env, memo=False))
                case "need": cell = Cell(Thunk(arg, env, memo=True))
            return ev(f.body, {**f.env, f.param: cell})
```

变元用 `force(env[x])` 求值，`(set! x e)` 给 `x` 的单元赋值（对一个实参是变量的按名参数，则赋给那个变量的单元）。

::: example 交换 {#ex-swap}
在按值调用与按引用调用下运行这个程序：

```text
(let ((a 1)) (let ((b 2))
  (let ((swap (lambda (x y) (let ((t x)) (begin (set! x y) (set! y t))))))
    (begin (swap a b) (+ (* 10 a) b)))))
```
::: solution
```console
value 12
reference 21
```

按值调用下，`swap` 交换的是它的私有拷贝，调用者的 `a` 与 `b` 不变：$10 \cdot 1 + 2 = 12$。按引用调用下，`x` 与 `y` 是 `a` 与 `b` 的别名，赋值直达调用者：$10 \cdot 2 + 1 = 21$。这就是为什么 `swap` 函数在 C++ 中写得出（`void swap(int& x, int& y)`），在 Python 或 Java 中却写不出——后者只能由调用者自己写 `a, b = b, a`。别名也有代价：以 `(swap a a)` 调用时，两个参数是同一个位置，这对这个 `swap` 无害，却会破坏经典的「不用临时变量交换」（`x = x + y; y = x - y; x = x - y` 会把 `a` 置成 $0$）。
:::
:::

::: widget mapping
domain: a; b; x; y
codomain: ℓ1; ℓ2; ℓ3; ℓ4
map: a>ℓ1; b>ℓ2; x>ℓ1; y>ℓ2
caption: 按引用调用下，调用 `(swap a b)` 期间环境作为名字到位置的映射：`x` 与 `y` 与 `a`、`b` 共享位置，所以这个映射不是单射——这就是别名。按值调用时把映射改成 `x>ℓ3; y>ℓ4`：每个形参得到一个存放拷贝的新位置，映射变成单射，对 `x` 与 `y` 的赋值再也触及不到 `a` 与 `b`。
:::

按名调用看起来人畜无害——「把实参表达式代入形参」，就像 β-规则——可一旦有了赋值，一个参数就可能在每次使用时表示不同的值。

::: example 延森装置 {#ex-jensen}
Algol 60 程序员用按名调用写出过一个通用求和过程。在带赋值的 Fun 中：

```text
(sum i 1 10 (* i i))       其中 sum 令 k := lo、total := 0，并且只要 k <= hi：
                           就执行 total := total + term; k := k + 1;，最后返回 total
```

`sum` 收到变量 `i` 作为 `k`、表达式 `(* i i)` 作为 `term`。分别在按值调用与按名调用下求值它。
::: solution
```console
jensen value 0
jensen name 385
```

按名调用下，`(set! k lo)` 就是对 `i` 本身赋值，而 `term` 的每次求值都用当前的 `i` 重新求值 `(* i i)`，所以循环加上 $1^2 + 2^2 + \cdots + 10^2 = 385$。按值调用下，`term` 是数值 $0$（调用时 `i` 为 $0$），而 `k` 是私有拷贝，于是和是十个零。这个装置以丹麦 Regnecentralen 的约恩·延森（Jørn Jensen）命名，它既展示了按名调用的表达能力，也说明了它为什么被抛弃：一个过程的含义取决于调用者的表达式，而它的作者看不见这些表达式。现代语言通过传函数显式地达到同样效果：`sum(1, 10, lambda i: i * i)`。
:::
:::

::: example 名字与需求 {#ex-need}
在 `(let ((sq (lambda (x) (+ x (+ x x))))) (sq (* 6 7)))` 中，分别在按值、按名与按需求调用下统计实参被求值的次数。再求值 `(const (f 1))`，其中 `const` 忽略它的实参而 `f` 永远循环。
::: solution
```console
lazy value 126 0
lazy name 126 3
lazy need 126 1
loop name 5
loop need 5
```

最后一个数统计 thunk 被求值的次数（按值调用抢先把实参求值一次，不使用 thunk）。三者的值同为 $126$。按名调用在 `x` 的三次使用处各求值一次 `(* 6 7)`；按需求调用只求值一次并缓存下来，Haskell 就是这么运行的。对第二个程序，按值调用会在求值 `(f 1)` 时永远循环下去，而按名调用与按需求调用永不求值它，因为 `const` 不使用它的实参——这就是 [[programming-languages/lambda-calculus#thm-standardisation]] 的正规序行为。
:::
:::

::: theorem 纯程序上按需求调用与按名调用一致 {#thm-need}
对不含赋值的程序，按名调用与按需求调用给出相同的结果（且一方终止当且仅当另一方终止）。
:::

::: proof
两个解释器只在 `force` 上不同：当 thunk $\langle e, \rho\rangle$ 第二次或以后被强制时，按需求调用返回保存的值 $v$，而按名调用在 $\rho$ 中重新求值 $e$。在不含赋值的程序中，单元从不被更新，所以 $\rho$ 中每个变元的含义在每一时刻都相同：每个单元要么含一个固定的值，要么含一个固定的 thunk，而它（对已实施的强制次数归纳）每次被强制都给出一个固定的值。无赋值的求值是表达式与环境的函数（[[programming-languages/interpreters]] 的确定性论证，习题 *Big-step determinism*，推广到 thunk 即可），所以在 $\rho$ 中重新求值 $e$ 仍会得到 $v$——或者再次发散，而这是不可能的，因为它的第一次求值已经终止。于是把每次重新求值替换为保存的值，既不改变计算出的值，也不改变终止性；两次运行步调一致，只是按需求调用跳过了那些重复的求值。
:::

有了赋值，定理就不成立了：如果实参表达式读取一个在参数两次使用之间被赋值的变量，按名调用会看到新值，按需求调用则看到旧值。因此惰性求值只在纯语言中切实可用，这也是 Haskell 保持纯的原因之一。

::: warning 「Python 对对象是按引用调用的」
常听说 Python 按引用传递可变对象，因为函数可以向传给它的列表追加元素。然而它不能重新绑定调用者的变量：在 `def f(xs): xs = [0]` 之后，调用 `f(a)` 时 `a` 保持不变，而按引用调用不会如此。Python 永远传递实参的值——而那个值是一个对象引用。被调用者可以改动对象（`xs.append(0)` 对调用者可见），但对形参的赋值只改变被调用者的绑定。Java（对对象而言）、JavaScript 与 Ruby 同理。按共享调用在*对象内容*上有按引用调用的别名，在*变量*上又有按值调用的隔离；对它进行推理必须两头都记在心上。
:::

## 存储的生存期

程序创建的每个实体都有生存期，语言必须为它安排存储。

- **静态**存储延续整个执行：全局变量、C 的 `static` 局部变量、字符串字面量、代码。它的地址可以在链接时或加载时固定。
- **栈**存储延续函数的一次激活：局部变量与形参，在没有闭包或引用活得比调用更久的时候（[[#prop-stack]]）。分配与释放各花费一次指针调整。
- **堆**存储的生存期不与程序的块结构挂钩：`malloc`、`new`、构造器调用、`cons` 或一个外逸闭包创建的对象。

对堆存储，必须有人决定一个对象何时已死。在 C 与 C++ 中这是程序员的事，用 `free` 与 `delete`——而错误（释放后使用、重复释放、泄漏）是安全漏洞最常见的来源之一（[[computer-systems/dynamic-memory]]）。多数高级语言采用**垃圾回收**：当对象不再从根（变量、栈、寄存器）*可达*时即可回收。Python 把引用计数与环路检测器结合使用；Java、JavaScript、OCaml 与 Go 使用追踪式回收器。

**所有权**是第三种办法，由 Rust 带入主流。每个堆上的值恰有一个**所有者**变量；所有者离开作用域时值被释放（确定性地，无需回收器）。所有权可以**移动**给另一个变量，此后旧名字不可再用；也可以**借用**：引用 `&v` 授予临时访问，而编译器的借用检查器确保没有引用活得比它指向的值更久，并且一个值在有指向它的共享引用存在时绝不被改动。

```rust
fn total(v: &Vec<i32>) -> i32 { v.iter().sum() }   // 借用 v
fn consume(v: Vec<i32>) -> usize { v.len() }        // 取得所有权；v 在返回时释放
fn main() {
    let a = vec![1, 2, 3];
    let s = total(&a);               // 共享借用，调用结束即终止
    let b = a;                       // 所有权从 a 移动到 b
    println!("sum {} len {}", s, consume(b));
}
```

```console
sum 6 len 3
```

在移动之后再使用 `a`，或在变量的块结束之后仍持有指向它的引用，都会在编译时被拒绝：

```console
error[E0382]: borrow of moved value: `a`
3 |     let b = a;                       // ownership moves to b
  |             - value moved here
4 |     println!("{}", a.len());         // a is no longer valid
  |                    ^ value borrowed here after move
error[E0597]: `x` does not live long enough
8 |         r = &x;                      // borrow of x ...
  |             ^^ borrowed value does not live long enough
9 |     }                                // ... but x dies here
  |     - `x` dropped here while still borrowed
```

这些正是本章的生存期与别名问题化成的静态检查：所有权使每个堆对象的生存期跟随其所有者的作用域，借用规则则防止可变数据上的别名。代价是某些正确的程序——双向链表、带环的图——必须改用显式引用计数（`Rc`）或 `unsafe` 代码来写。

::: history
Algol 60（Naur 等人，1960）引入了块结构与词法作用域，其按名调用参数既启发了延森装置，也在很久之后启发了惰性求值理论。麦卡锡（McCarthy）的 LISP 1.5（1962）是动态作用域的，更多是实现使然而非有意设计；乔尔·莫西（Moses）的 MIT 备忘录 "The function of FUNCTION in LISP"（1970）解释了函元问题。克里斯托弗·斯特拉基（Strachey）的讲义 *Fundamental Concepts in Programming Languages*（1967，2000 年发表）引入了左值与右值、环境与存储的区分，以及「特型多态」（*ad hoc* polymorphism）与「参数多态」（parametric polymorphism）这两个术语。斯蒂尔（Steele）与萨斯曼（Sussman）的 Scheme（1975）把词法作用域带进 Lisp，Common Lisp（1984）随后跟进。尼古拉斯·德布鲁因（de Bruijn）为他的 Automath 证明检查器引入了无名字下标（"Lambda calculus notation with nameless dummies"，1972）。克里斯托弗·沃兹沃斯（Wadsworth）的 1971 年博士论文把按需求调用描述为图的规约；亨德森（Henderson）与莫里斯（Morris）（1976）以及弗里德曼（Friedman）与怀斯（Wise）（1976）使惰性求值变得实用。所有权类型由克拉克（Clarke）、波特（Potter）与诺布尔（Noble）（1998）研究；Rust（2015 年发布 1.0 版）把所有权与基于区域的生存期结合进一门主流语言。
:::

## 后续内容

存储传递规则是引用类型系统（[[programming-languages/type-systems]]，其中 `ref` 类型必须是不变的——[[programming-languages/polymorphism]]）的出发点。按名调用与按需求调用是 λ-演算的求值策略（[[programming-languages/lambda-calculus]]），thunk 则作为生成器与 futures 的挂起计算重新出现（[[programming-languages/control]]、[[programming-languages/concurrency-models]]）。词法定址、闭包转换与帧布局是编译器后端的头几项工作（[[compilers]]）；垃圾回收算法见 [[computer-systems/dynamic-memory]]。

::: summary
- 一个**绑定**把名字与一个实体联系起来；**作用域**指它在文本的哪些地方可见，**生存期**指实体何时存在（[[#def-binding]]）。绑定时刻从语言设计一直排到运行时。
- **词法作用域**按程序文本解析名字，**动态作用域**按活动调用的链解析名字（[[#def-scope-rules]]）；解释器上的差别就是函数体在哪个环境里运行。
- 动态作用域破坏 α-改名（[[#prop-dyn-alpha]]），且不能返回使用其形参的函数（上向函元问题）；词法作用域配上闭包解决了这一问题。
- 词法作用域允许把名字编译成位置：**de Bruijn 下标**使 α-等价成为句法相等（[[#thm-debruijn]]），词法地址使查找变成数组访问。
- 只有当没有闭包外逸时帧才能栈分配（[[#prop-stack]]）；否则它们被放到堆上（垃圾回收），或者外逸被静态检查（Rust）。
- 赋值把**环境**（名字到位置）与**存储**（位置到值）分开（[[#def-store]]）；别名就是一个位置的两个名字。
- 参数可按**值**、**引用**、**值结果**、**名**或**需求**传递（[[#def-passing]]）；按名与按需求在纯程序上一致（[[#thm-need]]）。Python 按值传递对象引用。
:::

## 习题

::: exercise 词法还是动态？{level=1 check="110"}
在词法作用域与动态作用域下分别求值 `(let ((x 10)) (let ((f (lambda (y) (* x y)))) (let ((x 11)) (f x))))`。（输入词法作用域下的值。）
::: solution
两种情形下，`(f x)` 的实参都在最内层帧中求值，所以 `y` 是 $11$。词法作用域下，`f` 体中的 `x` 是 `f` 写处可见的那个，即 $10$：结果是 $10 \times 11 = 110$。动态作用域下，调用帧只绑定 `y`，而 `x` 的最近活动绑定是调用者的 $11$：结果是 $11 \times 11 = 121$。
:::
:::

::: exercise 手算 de Bruijn 下标 {level=1}
转换为 de Bruijn 形式：(a) $\lambda x\,y\,z.\,x\ z\,(y\ z)$；(b) $\lambda x.\,(\lambda y.\,y\ x)\,(\lambda z.\,x\ z)$；(c) $\lambda x.\,\lambda y.\,\lambda x.\,y\ x\ w$。再把 $\lambda.\,\lambda.\,0\ 1$ 化回有名字的项。
::: solution
(a) 体处的上下文是 $[z, y, x]$：$\lambda.\,\lambda.\,\lambda.\,2\ 0\,(1\ 0)$。(b) $\lambda.\,(\lambda.\,0\ 1)\,(\lambda.\,1\ 0)$：在 $\lambda y$ 内部，变元 $x$ 在外一层的约束词处，下标 $1$；在 $\lambda z$ 内部同理。(c) 上下文是 $[x, y, x]$；$y$ 位于位置 $1$，$x$ 位于 $0$（内层的 $x$），而 $w$ 是自由的：$\lambda.\,\lambda.\,\lambda.\,1\ 0\ w$。最后，$\lambda.\,\lambda.\,0\ 1$ 是 $\lambda a.\,\lambda b.\,b\ a$（任取两个不同的名字）。
:::
:::

::: exercise 手算参数传递 {level=1 check="3"}
考虑（用类 C 记法）`int g = 1; void p(int x) { x = x + 1; g = g + 10; x = x + 1; }` 与调用 `p(g)`。在按值调用、按引用调用与按值结果调用之下，`g` 之后各是什么？（输入按值结果调用下的值。）
::: solution
*按值：* `x` 是一份拷贝（$1$，然后 $2$，然后 $3$）；`g` 变成 $11$。*按引用：* `x` 就是 `g`：$1 \to 2 \to 12 \to 13$；`g` 是 $13$。*按值结果：* `x` 开始时是拷贝 $1$，变成 $2$；与此同时 `g` 变成 $11$；`x` 变成 $3$；返回时 $3$ 被复制回 `g`，覆盖了 $11$。所以 `g` 是 $3$。三种机制分别给出 $11$、$13$ 和 $3$——它们恰好只在参数与该过程还直接访问的某个变量互为别名时才有分别。
:::
:::

::: exercise 按名调用的一次意外 {level=2}
按名调用下，`(let ((n 0)) (let ((twice (lambda (x) (+ x x)))) (twice (begin (set! n (+ n 1)) n))))` 返回什么？按值调用与按需求调用各返回什么？[[#thm-need]] 的哪个条件在这里不成立？
::: solution
按名调用在 `x` 的每次使用处求值实参表达式：第一次使用令 $n = 1$ 并给出 $1$，第二次令 $n = 2$ 并给出 $2$；结果是 $3$。按值调用在调用之前求值一次（$n = 1$，值为 $1$）并返回 $2$；按需求调用在第一次使用时求值一次并复用 $1$，同样返回 $2$。定理假定程序不含赋值；这里实参自身执行了赋值，所以重新求值它不会重现同一个值。
:::
:::

::: exercise 静态链 {level=2}
在一门有嵌套过程、帧栈分配的语言（比如 Pascal）中，过程 `A` 声明局部 `x` 与嵌套过程 `B`；`B` 声明嵌套过程 `C`，`C` 读取 `x`。`A` 调用 `B`，`B` 调用 `C`，`C` 自己递归调用自己两次（`C` 共有三次激活）。从最深的那次 `C` 激活读取 `x` 要跟随多少条静态链？那次激活与 `A` 的帧之间隔着多少条动态链？
::: solution
每个 `C` 帧的静态链都指向 `B` 的帧（`C` 声明于其中），无论哪次激活；`B` 的静态链指向 `A`。所以 `x` 在 `C` 中的词法地址是 $(2, i)$：总是两条静态链，与递归深度无关——编译器知道这个数目。从最深的 `C` 出发的动态链要经过另外两个 `C` 帧、然后是 `B`，才到达 `A`：四条动态链。词法定址把沿动态链的运行时查找换成了一个编译期常量。
:::
:::

::: exercise 实现值结果调用 {level=2}
给解释器加上 `"value-result"` 模式：把实参复制进一个新单元，并在体返回之后，当实参是变量时把单元的最终值复制回实参的单元。分别在按值、按引用与按值结果之下运行交换程序与程序 `(let ((a 1)) (let ((f (lambda (x) (begin (set! x 5) a)))) (+ (* 10 (f a)) a)))`。
::: solution
```python
                case "value-result":
                    cell = Cell(ev(arg, env))
                    result = ev(f.body, {**f.env, f.param: cell})
                    if isinstance(arg, Var): env[arg.name].v = cell.v   # 复制出去
                    return result
```

值结果调用下 swap 得到 `11`，而不是 `21`——原因很有启发。Fun 的函数是柯里化的，所以 `(swap a b)` 是 `((swap a) b)`：第一次调用把 `a` 复制进来，立刻返回内层闭包，并*在那一刻*把 `x` 复制出去，当时还没有发生任何赋值。之后的赋值 `(set! x y)` 更新的是一个没人再复制出去的单元，而 `y` 的复制出去确实把 `b` 置为 $1$；于是 $10 \cdot 1 + 1 = 11$。在有真正双参数过程的语言（Ada、Fortran）中，两次复制出去都发生在过程返回时，swap 给出 $21$。复制进入/复制出去是就过程的一次激活定义的，而柯里化把一次激活拆成了两次。第二个程序在赋值给 `x` 之后、调用*之内*读取 `a`。按值调用：`(f a)` 返回 $1$，`a` 保持 $1$：$10 + 1 = 11$。按引用调用：`x` 就是 `a`，所以 `(f a)` 返回 $5$，`a` 是 $5$：$55$。按值结果调用：调用之内 `a` 仍是 $1$（变的只是拷贝），于是 `(f a)` 返回 $1$，随后 $5$ 被复制回去，所以最终的 `a` 是 $5$：$10 + 5 = 15$。除非过程自己观察到别名，各机制的结果一致。
:::
:::

::: exercise 外逸闭包与栈 {level=3}
给出一个只用*下向*函元的 Fun 程序，和一个需要上向函元的程序，并各自用 [[#prop-stack]] 判断其帧能否栈分配。然后解释为什么 Python 必须把 `counter` 中 `n` 的单元堆分配，而 CPython 仍能把 `counter` 的普通局部变量留在它的栈帧里。
::: solution
一个纯下向的例子：`(let ((apply-to-3 (lambda (g) (g 3)))) (let ((k 10)) (apply-to-3 (lambda (y) (+ y k)))))`。(lambda (y) …) 的闭包被传入 `apply-to-3` 并在 `let` 绑定 `k` 结束之前被使用；没有闭包被返回或被存储，所以由命题，所有帧都可以在返回时弹出。上向的例子：`make-adder`，它返回一个引用其帧 $\set{n \mapsto 5}$ 的闭包；调用返回之后该帧仍然可达，所以它不能住在栈上。

在 `counter` 中，闭包 `inc` 外逸了（它被返回）并引用 `n`，所以 `n` 的存储必须比 `counter` 的激活活得更久：CPython 把它放进一个堆分配的单元对象，`inc.__closure__` 引用着它。`counter` 中没有被任何内层函数捕获的变量，对任何外逸闭包都是不可达的；编译器静态地知道这一点（词法作用域！），所以把它们保存在帧的快局部变量数组中。编译器的闭包转换应用同样的思想：只有被捕获的变量才被移到堆上。
:::
:::

::: exercise 下标平移 {level=3}
在 de Bruijn 表示下，β-规约 $(\lambda.\,t)\ s \to t[0 := s]$ 必须调整下标。定义 $\uparrow^d_c(t)$，它对 $t$ 中每个 $\ge c$ 的下标加上 $d$（即相对 $c$ 层包含它的约束词而言自由的那些下标），并定义代入 $t[j := s]$。用它们规约 $(\lambda.\,\lambda.\,1\ 0)\,(\lambda.\,0)$ 与 $\lambda.\,(\lambda.\,\lambda.\,1)\ 0$。
::: solution
平移：当 $k \ge c$ 时 $\uparrow^d_c(k) = k + d$，否则 $\uparrow^d_c(k) = k$；$\uparrow^d_c(\lambda.\,t) = \lambda.\,\uparrow^d_{c+1}(t)$；$\uparrow^d_c(t_1\ t_2) = \uparrow^d_c(t_1)\ \uparrow^d_c(t_2)$。代入：当 $k = j$ 时 $k[j := s] = s$，否则 $k[j := s] = k$；$(\lambda.\,t)[j := s] = \lambda.\,t[j+1 := \uparrow^1_0(s)]$；应用情形逐分量进行。β-规约：$(\lambda.\,t)\ s \to \uparrow^{-1}_0\big(t[0 := \uparrow^1_0(s)]\big)$。实参 $s$ 向上平移一，是为了当它被放进 $t$ 的约束词之下时，其中自由的下标仍然正确；代入之后约束词被去掉了，所以结果中自由的下标要向下平移一。

第一项：$t = \lambda.\,1\ 0$，$s = \lambda.\,0$（封闭，平移不改变它）。$t[0 := s] = \lambda.\,(1\ 0)[1 := s] = \lambda.\,s\ 0 = \lambda.\,(\lambda.\,0)\ 0$；向下平移不改变任何东西（没有自由下标）。结果 $\lambda.\,(\lambda.\,0)\ 0$，即 $\lambda x.\,(\lambda y.\,y)\ x$——正确。

第二项：在外层 $\lambda$ 内部，规约 $(\lambda.\,\lambda.\,1)\ 0$，其中 $0$ 指外层约束词。$\uparrow^1_0(0) = 1$；$(\lambda.\,1)[0 := 1] = \lambda.\,1[1 := \uparrow^1_0(1)] = \lambda.\,2$；向下平移：$\lambda.\,1$。整个项为 $\lambda.\,\lambda.\,1$，即 $\lambda x.\,\lambda y.\,x$——自由变元没有被内层约束词捕获，这在有名字的写法下本来需要改名。这正是皮尔斯（Pierce）的 *TAPL* 第 6 章用来实现无名字求值的东西。
:::
:::
