**解释器**是运行其他程序的程序：它取一个程序的抽象语法树，直接算出结果，而不先把它翻译成机器码。Python 的参考实现（在编译成字节码这一步之后）就是解释器；浏览器里在即时编译器接管之前的 JavaScript 引擎、shell、电子表格的公式求值器、数据库的查询引擎也都是。写一个解释器也是理解一门语言的最好办法。关于某种构造含义的每个问题——实参何时求值、变量指称什么、函数值里装的是什么——都必须在代码中回答，并且回答得精确。

本章用 Python 为一门小型函数式语言 **Fun** 建造一个解释器：Fun 有数与布尔值、算术、条件、`let`、一等函数与递归。我们从 [[programming-languages/lambda-calculus]] 的代入语义的直接翻译出发，看清它的浪费，然后用**环境**取代代入。函数于是求值为**闭包**——代码与环境的配对——这是程序设计语言实现中最重要的数据结构。我们把环境语义陈述为推理规则，并证明它算出与代入相同的答案。解释器不过一百来行；后面几章改变它来研究作用域、参数传递、类型与控制。

## 语言 Fun

我们按 Lisp 与 Racket 的带括号前缀记法（**S-表达式**）书写 Fun 程序，因为这使语法分析不费吹灰之力，让我们能专注于含义。像

```text
(let ((make-adder (lambda (n) (lambda (x) (+ x n)))))
  (let ((add5 (make-adder 5)))
    (add5 10)))
```

这样的程序定义了一个返回函数的函数，把它应用上，求值得 $15$。抽象语法是

$$
\begin{aligned}
e \;::=\;& n \mid \mathsf{true} \mid \mathsf{false} \mid x \mid (\mathsf{lambda}\ (x)\ e) \mid (e_1\ e_2) \mid (\mathit{op}\ e_1\ e_2) \mid (\mathsf{if}\ e_1\ e_2\ e_3) \\
\mid\;& (\mathsf{let}\ ((x\ e_1))\ e_2) \mid (\mathsf{letrec}\ ((f\ (\mathsf{lambda}\ (x)\ e_1)))\ e_2)
\end{aligned}
$$

其中 $\mathit{op} \in \set{+, -, *, =, <}$。函数只接受一个实参，与 λ-演算中一样；语法分析器把 `(lambda (x y) e)` 变成 `(lambda (x) (lambda (y) e))`，把 `(f a b)` 变成 `((f a) b)`。这种把方便的外壳形式翻译成更小的核心语言的变换叫**去糖**（desugaring），那些方便的形式是**语法糖**（syntactic sugar）。去糖使解释器保持小巧；真实语言也照此规范（Python 的 `with` 与 `for` 的大部分内容就是靠翻译成更简单的语句来定义的）。

AST 是一组冻结的数据类，读入器与语法分析器总共不过三十行：

```python
@dataclass(frozen=True)
class Num: n: int
@dataclass(frozen=True)
class Bool: b: bool
@dataclass(frozen=True)
class Var: name: str
@dataclass(frozen=True)
class Lam: param: str; body: object
@dataclass(frozen=True)
class App: fun: object; arg: object
@dataclass(frozen=True)
class If: c: object; th: object; el: object
@dataclass(frozen=True)
class Prim: op: str; l: object; r: object
@dataclass(frozen=True)
class Let: name: str; rhs: object; body: object
@dataclass(frozen=True)
class LetRec: name: str; param: str; fbody: object; body: object
```

```python
def read(src):
    """Text -> nested Python lists of strings (an s-expression)."""
    toks = src.replace("(", " ( ").replace(")", " ) ").split()
    def sexp(i):
        if toks[i] == "(":
            items, i = [], i + 1
            while toks[i] != ")":
                x, i = sexp(i); items.append(x)
            return items, i + 1
        return toks[i], i + 1
    x, i = sexp(0)
    if i != len(toks): raise SyntaxError("extra input")
    return x

OPS = {"+", "-", "*", "=", "<"}
def parse(x):
    """s-expression -> AST, desugaring multi-argument lambdas and calls."""
    match x:
        case str() if x.lstrip("-").isdigit(): return Num(int(x))
        case "true" | "false": return Bool(x == "true")
        case str(): return Var(x)
        case ["lambda", params, body]:
            e = parse(body)
            for p in reversed(params): e = Lam(p, e)
            return e
        case ["if", c, a, b]: return If(parse(c), parse(a), parse(b))
        case ["let", [[name, rhs]], body]: return Let(name, parse(rhs), parse(body))
        case ["letrec", [[name, ["lambda", [p], fb]]], body]:
            return LetRec(name, p, parse(fb), parse(body))
        case [op, l, r] if op in OPS: return Prim(op, parse(l), parse(r))
        case [f, *args] if args:
            e = parse(f)
            for a in args: e = App(e, parse(a))
            return e
    raise SyntaxError(f"bad expression: {x}")
```

```console
>>> parse(read("(let ((add (lambda (x y) (+ x y)))) (add 3 4))"))
Let(name='add', rhs=Lam(param='x', body=Lam(param='y', body=Prim(op='+', l=Var(name='x'),
    r=Var(name='y')))), body=App(fun=App(fun=Var(name='add'), arg=Num(n=3)), arg=Num(n=4)))
```

## 用代入解释

[[programming-languages/lambda-calculus]] 的语义告诉我们对一个应用该做什么：把函数求值成一个抽象 $\lambda x.\,e$，把实参求值成一个值 $v$（Fun 按值调用，与 Python 相同），然后带着 $e[x := v]$ 继续。下面是大步规则，风格同 [[programming-languages/syntax-semantics#def-bigstep]]，其中值 $v ::= n \mid \mathsf{true} \mid \mathsf{false} \mid \lambda x.\,e$：

$$
\frac{}{v \Downarrow v}
\qquad
\frac{e_1 \Downarrow \lambda x.\,e \quad e_2 \Downarrow v_2 \quad e[x := v_2] \Downarrow v}{(e_1\ e_2) \Downarrow v}
\qquad
\frac{e_1 \Downarrow v_1 \quad e_2[x := v_1] \Downarrow v}{(\mathsf{let}\ ((x\ e_1))\ e_2) \Downarrow v}
\qquad
\frac{e_1 \Downarrow n_1 \quad e_2 \Downarrow n_2}{(+\ e_1\ e_2) \Downarrow n_1 + n_2}
$$

其余原始运算与 $\mathsf{if}$ 的规则类似。`letrec` 则被展开：$f$ 被替换为 $\lambda x.\,(\mathsf{letrec}\ ((f\ (\mathsf{lambda}\ (x)\ e_1)))\ e_1)$，一个每当其体运行就重新造出该递归定义的函数。

在按值调用的封闭程序中，代入比 [[programming-languages/lambda-calculus#def-subst]] 中的简单得多：

::: lemma 封闭的值不需要改名 {#lem-closed-subst}
若一个程序是封闭的（不含自由变量），则按上述规则求值它的过程中被代入的每个值都是封闭的。因此代入 $e[x := v]$ 绝不会捕获变量，避免捕获的代入中的改名子句永不会用到。
:::

::: proof
对 $e \Downarrow v$ 的推导作归纳，证明：若 $e$ 封闭则 $v$ 也封闭，并且推导中施行的每次代入都是把一个封闭的值代入一个自由变量至多为被代入变量的项中。对值，$v = e$ 是封闭的。对 $e$ 封闭的应用 $(e_1\ e_2)$，$e_1$ 与 $e_2$ 封闭，故由归纳假设 $\lambda x.\,e'$ 与 $v_2$ 封闭；于是 $\mathrm{FV}(e') \subseteq \set{x}$，代入 $e'[x := v_2]$ 塞入的是一个封闭项，结果封闭，故归纳假设可用于第三个前提。`let` 规则同理，而 `letrec` 的展开代入的是一个封闭的抽象。由于 $v$ 封闭，它没有可供 $e'$ 中的约束词捕获的自由变量。
:::

解释器就是规则的转录（`letrec` 与错误情形是同样的风格）：

```python
def evs(e):
    """Big-step call-by-value evaluation by substitution."""
    match e:
        case Num() | Bool() | Lam(): return e
        case Var(x): raise InterpError(f"unbound variable {x}")
        case Let(x, rhs, body): return evs(subst(body, x, evs(rhs)))
        case App(fn, arg):
            f, v = evs(fn), evs(arg)
            if not isinstance(f, Lam): raise InterpError("cannot apply a non-function")
            return evs(subst(f.body, f.param, v))
        # ... If、Prim 与 LetRec 如上所述
```

::: example 用代入求值 {#ex-subst}
用代入规则求值 `(let ((f (lambda (x) (lambda (y) (+ x y))))) ((f 1) 2))`，写出每次代入之后的项。
::: solution
1. `let` 的右部是一个 lambda，已是值。把它代入体中的 `f`：`(((lambda (x) (lambda (y) (+ x y))) 1) 2)`。
2. 应用 `((lambda (x) …) 1)`：函数与实参都是值，于是把 $1$ 代入体中的 `x`，得到值 `(lambda (y) (+ 1 y))`。整个项现在是 `((lambda (y) (+ 1 y)) 2)`。
3. 把 $2$ 代入 `y`：`(+ 1 2)`，求值得 $3$。

三次代入，每次都重建了它所作用的项。第 2 步正是闭包的精髓：`f` 返回的函数"记得" $x = 1$，因为 $1$ 已被复制进它的代码。下面的环境解释器不用复制就达到同样效果：把原封不动的代码 `(lambda (y) (+ x y))` 与一份"$x$ 是 $1$"的记录配成对。
:::
:::

注意这里的变量是一个*错误*：在封闭程序中，每个变量在被遇到之前都早已被它的值替换掉了。这个解释器是正确的，但它做了大量复制。每次调用都带着代入的实参重建函数的整个体，连永远不会被求值的部分也不例外（`if` 未选中的分支），而递归函数的每次调用都为展开再重建一次体。一次调用的代价正比于体的大小，而非实际做的工作量。

## 环境与闭包

补救之道是推迟代入：不在整个体中把 $x$ 换成 $v$，而是记下配对 $x \mapsto v$，等到——且只等到——$x$ 被求值时再去查表。

::: definition 环境 {#def-environment}
**环境** $\rho$ 是从变量到值的有限映射。用 $\rho(x)$ 记 $x$ 的值，用 $\rho[x \mapsto v]$ 记把 $x$ 映到 $v$、在其余地方与 $\rho$ 一致的环境，用 $\varnothing$ 记空环境。
:::

环境是一份*待执行的代入*。难处出在函数上。在环境 $\rho$ 中求值 $(\mathsf{lambda}\ (x)\ e)$ 不能只把代码 $\lambda x.\,e$ 返回了事，因为 $e$ 可能提到 $\rho$ 中另外一些代入已被推迟的变量。在 `make-adder` 中，内层函数 `(lambda (x) (+ x n))` 提到了 `n`；等到 `add5` 被调用时，把 `n` 绑定为 $5$ 的那次 `make-adder` 调用早已返回。所以内层 lambda 的值必须把自己的环境随身带上。

::: definition 闭包 {#def-closure}
**闭包** $\langle \lambda x.\,e, \rho \rangle$ 是函数的代码与函数被创建时所处环境的配对。环境语义的值是 $v ::= n \mid \mathsf{true} \mid \mathsf{false} \mid \langle \lambda x.\,e, \rho \rangle$。
:::

这与 [[program-design/higher-order-functions#def-closure]] 的 Python 闭包是同一个概念，只不过现在站在实现者的角度看：Python 的函数对象保存着它的代码和对外层作用域单元的引用（`f.__code__` 与 `f.__closure__`）。这个术语可追溯到彼得·兰丁（Landin）的 SECD 机（1964）。

::: definition 环境语义 {#def-env-semantics}
关系 $\rho \vdash e \Downarrow v$（"在环境 $\rho$ 中，$e$ 求值为 $v$"）定义为

$$
\begin{gathered}
\frac{}{\rho \vdash n \Downarrow n}
\qquad
\frac{\rho(x) = v}{\rho \vdash x \Downarrow v}
\qquad
\frac{}{\rho \vdash (\mathsf{lambda}\ (x)\ e) \Downarrow \langle \lambda x.\,e, \rho \rangle}
\\[1.2em]
\frac{\rho \vdash e_1 \Downarrow \langle \lambda x.\,e, \rho' \rangle \quad \rho \vdash e_2 \Downarrow v_2 \quad \rho'[x \mapsto v_2] \vdash e \Downarrow v}{\rho \vdash (e_1\ e_2) \Downarrow v}
\qquad
\frac{\rho \vdash e_1 \Downarrow v_1 \quad \rho[x \mapsto v_1] \vdash e_2 \Downarrow v}{\rho \vdash (\mathsf{let}\ ((x\ e_1))\ e_2) \Downarrow v}
\\[1.2em]
\frac{\rho \vdash e_1 \Downarrow \mathsf{true} \quad \rho \vdash e_2 \Downarrow v}{\rho \vdash (\mathsf{if}\ e_1\ e_2\ e_3) \Downarrow v}
\qquad
\frac{\rho \vdash e_1 \Downarrow \mathsf{false} \quad \rho \vdash e_3 \Downarrow v}{\rho \vdash (\mathsf{if}\ e_1\ e_2\ e_3) \Downarrow v}
\qquad
\frac{\rho \vdash e_1 \Downarrow n_1 \quad \rho \vdash e_2 \Downarrow n_2}{\rho \vdash (+\ e_1\ e_2) \Downarrow n_1 + n_2}
\end{gathered}
$$

再加上 $\mathsf{true}$、$\mathsf{false}$ 与其余原始运算的规则，以及下面的 `letrec` 规则。封闭程序 $e$ 求值为 $v$，若 $\varnothing \vdash e \Downarrow v$。
:::

关键规则是应用。函数的体在闭包的环境 $\rho'$——添上形参之后——中求值，而*不是*在调用者的环境 $\rho$ 中。这正是使变量指认函数**被书写**之处可见的那个绑定的机制，这就是**词法作用域**（lexical scope，又称静态作用域）。若改用 $\rho[x \mapsto v_2]$，得到的就是**动态作用域**，一门不同的语言，将在 [[programming-languages/scope-binding]] 中考察。

### 解释器

环境用**帧**（frame）的链来实现：每个帧是一个绑定的字典，外加一个指向外层帧的指针。扩充一个环境会创建新帧，绝不改动旧帧，所以闭包的环境在闭包创建之后保持不变。

```python
class InterpError(Exception): pass

@dataclass
class Env:
    vars: dict
    parent: "Env | None" = None
    def lookup(self, x):
        env = self
        while env is not None:
            if x in env.vars: return env.vars[x]
            env = env.parent
        raise InterpError(f"unbound variable {x}")

@dataclass
class Closure:
    param: str; body: object; env: Env

def prim(op, a, b):
    if type(a) is not int or type(b) is not int:
        raise InterpError(f"{op} expects numbers, got {a!r} and {b!r}")
    return {"+": a + b, "-": a - b, "*": a * b, "=": a == b, "<": a < b}[op]

def ev(e, env):
    match e:
        case Num(n): return n
        case Bool(b): return b
        case Var(x): return env.lookup(x)
        case Lam(x, body): return Closure(x, body, env)
        case Prim(op, l, r): return prim(op, ev(l, env), ev(r, env))
        case If(c, a, b):
            v = ev(c, env)
            if type(v) is not bool: raise InterpError(f"if expects a boolean, got {v!r}")
            return ev(a, env) if v else ev(b, env)
        case Let(x, rhs, body): return ev(body, Env({x: ev(rhs, env)}, env))
        case LetRec(f, x, fb, body):
            frame = Env({}, env)                      # 闭包将栖身于此
            frame.vars[f] = Closure(x, fb, frame)     # ……并回指该帧
            return ev(body, frame)
        case App(fn, arg):
            f = ev(fn, env); v = ev(arg, env)
            if not isinstance(f, Closure): raise InterpError(f"cannot apply {f!r}")
            return ev(f.body, Env({f.param: v}, f.env))

def run(src): return ev(parse(read(src)), Env({}))
```

Fun 的值由 Python 的值表示：整数、布尔值与 `Closure` 对象。`if` 分支检查守卫是布尔值，`prim` 检查操作数是整数（用 `type(...) is int`，因为在 Python 中 `True` 是一个 `int`）：解释器定义的是 *Fun 自己的*错误行为，而不是照搬 Python 的。

```python
print(run("(+ 1 (* 2 3))"))
print(run("(let ((add (lambda (x y) (+ x y)))) (add 3 4))"))
print(run("(letrec ((fact (lambda (n) (if (= n 0) 1 (* n (fact (- n 1))))))) (fact 20))"))
print(run("(lambda (x) x)"))
for bad in ["(+ 1 true)", "(5 3)", "(+ y 1)", "(if 1 2 3)"]:
    try: run(bad)
    except InterpError as e: print("error:", e)
```

```console
7
7
2432902008176640000
<closure λx>
error: + expects numbers, got 1 and True
error: cannot apply 5
error: unbound variable y
error: if expects a boolean, got 1
```

第四个程序的值是一个闭包，被不透明地打印（它的 `__repr__` 只显示形参）：在按值调用的语言里，函数值没有可打印的范式。大数运算之所以可行，是因为 Fun 的整数就是 Python 的整数——这是被定义语言从定义语言**继承**的一个特性的例子。

::: example 环境图 {#ex-env-diagram}
对本章开头 `make-adder` 程序追踪 `run` 的执行，列出所创建的每个帧与闭包以及所进行的每次查找。
::: solution
用 $G$ 表示最初的空帧。

1. 外层 `let` 在 $G$ 中求值右部 `(lambda (n) …)`：闭包 $C_1 = \langle \lambda n.\,(\mathsf{lambda}\ (x)\ (+\ x\ n)), G\rangle$。它创建帧 $F_1 = \set{\textit{make-adder} \mapsto C_1}$，父帧为 $G$。
2. 内层 `let` 在 $F_1$ 中求值 `(make-adder 5)`。查找 `make-adder` 在 $F_1$ 中找到 $C_1$；实参是 $5$。$C_1$ 的体在一个新帧 $F_3 = \set{n \mapsto 5}$ 中求值，其父帧是 **$G$**——闭包的环境——而不是 $F_1$。体是一个 lambda，所以结果是 $C_2 = \langle \lambda x.\,(+\ x\ n), F_3\rangle$。
3. 帧 $F_2 = \set{\textit{add5} \mapsto C_2}$，父帧 $F_1$，为内层 `let` 的体而创建。
4. 在 $F_2$ 中求值 `(add5 10)`：在 $F_2$ 中找到 `add5`；$C_2$ 的体在 $F_4 = \set{x \mapsto 10}$ 中求值，父帧为 $F_3$。
5. 在 $F_4$ 中求值 `(+ x n)`：在 $F_4$ 中找到 `x`（$10$）；`n` 不在 $F_4$ 中，于是查找沿父指针走到 $F_3$，找到 $5$。结果 $15$。

在最后一次查找发生之时，创建 $F_3$ 的那次 `make-adder` 调用早已结束很久，但 $F_3$ 依然活着，因为 $C_2$ 指着它。因此帧一般不能分配在返回时即弹出（pop）的栈上；它们活在堆上，等到没有任何闭包引用它们时由垃圾回收收回（[[programming-languages/scope-binding]]）。
:::
:::

::: widget graph
nodes: F4@0,0; F3@1,0.5; G@2,1; F1@1,2; F2@0,2; C1@2,2.5; C2@1,-0.5
edges: F4>F3; F3>G; F1>G; F2>F1; F1>C1; C1>G; F2>C2; C2>F3
algorithm: dfs
start: F4
caption: [[#ex-env-diagram]] 中的帧与闭包。帧到帧的箭头是父指针；帧到闭包的箭头是一个绑定（$F_1$ 把 `make-adder` 绑定到 $C_1$，$F_2$ 把 `add5` 绑定到 $C_2$）；闭包到帧的箭头是它的环境。从 $F_4$——求值 `(+ x n)` 时所在的帧——开始逐步执行深度优先搜索：可达的帧 $F_4, F_3, G$ 恰是变量查找能够搜索的帧，而 $F_1$ 与 $F_2$——*调用者*的帧——不在其列。这就是词法作用域。另注意 $C_2$ 使 $F_3$ 在 `make-adder` 返回之后仍保持可达。
:::

### 递归与带环的环境

递归函数的闭包必须包含一个环境，其中函数自己的名字绑定到该闭包本身。帧的任何有穷*树*都做不到：这个结构必然是带环的。`LetRec` 分支先创建帧，再创建指向该帧的闭包，最后把闭包装进帧——用一次赋值打了个结。

$$
\frac{\rho' = \rho[f \mapsto \langle \lambda x.\,e_1, \rho' \rangle] \qquad \rho' \vdash e_2 \Downarrow v}{\rho \vdash (\mathsf{letrec}\ ((f\ (\mathsf{lambda}\ (x)\ e_1)))\ e_2) \Downarrow v}
$$

::: example 经由带环帧的递归 {#ex-letrec}
在环境解释器中追踪 `(letrec ((fact (lambda (n) (if (= n 0) 1 (* n (fact (- n 1))))))) (fact 2))`，列出各个帧。
::: solution
1. `LetRec` 创建帧 $R$（父帧 $G$），然后创建闭包 $C = \langle \lambda n.\,\ldots, R\rangle$，再把 $\textit{fact} \mapsto C$ 装入 $R$。现在 $R$ 含有 $C$ 而 $C$ 指着 $R$：一个环。
2. `(fact 2)` 在 $R$ 中求值：`fact` 是 $C$；体在 $F_2 = \set{n \mapsto 2}$ 中运行，父帧为 $R$（闭包的环境）。守卫为假，于是在 $F_2$ 中求值 `(* n (fact (- n 1)))`；查找 `fact` 沿 $F_2 \to R$ 再次找到 $C$。
3. `(fact 1)` 在 $F_1 = \set{n \mapsto 1}$ 中运行，父帧 $R$；接着 `(fact 0)` 在 $F_0 = \set{n \mapsto 0}$ 中运行，父帧 $R$，它返回 $1$。
4. 返回：$F_1$ 算出 $1 \times 1 = 1$，$F_2$ 算出 $2 \times 1 = 2$。

三个调用帧的父帧都是 $R$，而不是彼此：`fact` 的体提到的是 `fact` 与 `n`，从不提到调用者的 `n`。记录"$F_1$ 必须返回到 $F_2$"的是*调用*栈（这里是 Python 的）；*环境*链只记录名字在何处定义。把这两者混为一谈，正是动态作用域的病根。
:::
:::

这条规则的第一个前提是一个递归方程；作为带环（或展开为无穷）的结构它有唯一解，而解释器构造的正是那个带环结构。另一种做法不需要赋值：用 [[programming-languages/lambda-calculus#thm-fixed-point]] 的 $Z$ 组合子对 `letrec` 去糖；有一道习题请你检验它确实可行。

::: quiz
在 `(let ((x 1)) (let ((f (lambda (y) (+ x y)))) (let ((x 100)) (f 10))))` 中，环境解释器返回什么？
- [ ] $110$
- [x] $11$
- [ ] 一个未绑定变量错误
- [ ] $101$
::: solution
`f` 的闭包创建在 $x = 1$ 的那个帧中。调用 `(f 10)` 时，`(+ x y)` 在闭包的帧添上 $y = 10$ 后求值，所以 `x` 是 $1$，结果为 $11$。后来的绑定 $x = 100$ 在调用者的环境里，其体永远看不见。若一个解释器在调用者的环境中求值函数体（动态作用域），就会给出 $110$。
:::
:::

## 环境解释器的正确性

我们现在有 Fun 的两种语义：代入（[[#lem-closed-subst]]）与环境（[[#def-env-semantics]]）。它们应当给出相同的答案。要比较两者，得说清一个闭包代表哪个代入值：闭包 $\langle \lambda x.\,e, \rho\rangle$ 的意思是"函数 $\lambda x.\,e$，连同待执行的代入 $\rho$ 已就地执行"。

::: definition 值的读回 {#def-readback}
对环境值 $v$ 定义封闭项 $v^\sharp$，对环境 $\rho$ 定义同时代入 $\rho^\sharp$：

$$
n^\sharp = n, \qquad b^\sharp = b, \qquad \langle \lambda x.\,e, \rho\rangle^\sharp = \lambda x.\,\big(e\,[\rho^\sharp \setminus x]\big), \qquad \rho^\sharp = [\,y := \rho(y)^\sharp \ \text{对一切 } y \in \mathrm{dom}\,\rho\,],
$$

其中 $\rho^\sharp \setminus x$ 省去 $x$ 的绑定（$x$ 被 λ 屏蔽）。我们只考虑**良构**的闭包，即满足 $\mathrm{FV}(\lambda x.\,e) \subseteq \mathrm{dom}\,\rho$ 的闭包；该定义按闭包嵌套的深度递归进行，而对非递归程序构造出的闭包，这个深度是有穷的。（对 `letrec`，带环的闭包读回为代入解释器那个展开的项；该情形此处略去。）
:::

由于被代入的项 $\rho(y)^\sharp$ 是封闭的，同时代入的表现良好：$e[\rho^\sharp \setminus x][x := v^\sharp] = e[(\rho[x \mapsto v])^\sharp]$，因为对互不相同的变量代入封闭项可以按任意次序进行。

::: theorem 环境语义与代入一致 {#thm-env-correct}
设 $e$ 是不含 `letrec` 的 Fun 项，$\rho$ 是满足 $\mathrm{FV}(e) \subseteq \mathrm{dom}\,\rho$ 且其值良构的环境。若 $\rho \vdash e \Downarrow v$，则在代入语义下 $e[\rho^\sharp] \Downarrow v^\sharp$。特别地，对封闭程序，$\varnothing \vdash e \Downarrow v$ 蕴含 $e \Downarrow v^\sharp$。
:::

::: proof
对 $\rho \vdash e \Downarrow v$ 的推导作归纳，按最后使用的规则分情形。

*常量。* $n[\rho^\sharp] = n = n^\sharp$，是值，且 $n \Downarrow n$。

*变量。* $\rho \vdash x \Downarrow \rho(x)$。于是 $x[\rho^\sharp] = \rho(x)^\sharp$，它是一个值（常量或抽象），所以它求值为自身。

*抽象。* $\rho \vdash (\mathsf{lambda}\ (x)\ e) \Downarrow \langle \lambda x.\,e, \rho\rangle$。代入在 $x$ 的约束词处停止，故 $(\lambda x.\,e)[\rho^\sharp] = \lambda x.\,(e[\rho^\sharp \setminus x]) = \langle \lambda x.\,e, \rho\rangle^\sharp$，是值。

*应用。* 前提为 $\rho \vdash e_1 \Downarrow \langle \lambda x.\,e, \rho'\rangle$、$\rho \vdash e_2 \Downarrow v_2$ 与 $\rho'[x \mapsto v_2] \vdash e \Downarrow v$。对前两个用归纳假设，得 $e_1[\rho^\sharp] \Downarrow \lambda x.\,(e[\rho'^\sharp \setminus x])$ 与 $e_2[\rho^\sharp] \Downarrow v_2^\sharp$。代入语义的应用规则接下来需要

$$
e[\rho'^\sharp \setminus x][x := v_2^\sharp] = e[(\rho'[x \mapsto v_2])^\sharp] \Downarrow v^\sharp,
$$

其中等式即定理前的注记，而求值是对第三个前提用归纳假设（其环境满足假设条件：因为闭包良构，$\mathrm{FV}(e) \subseteq \mathrm{dom}\,\rho' \cup \set{x}$）。由于 $(e_1\ e_2)[\rho^\sharp] = (e_1[\rho^\sharp]\ e_2[\rho^\sharp])$，代入规则便得出结论 $(e_1\ e_2)[\rho^\sharp] \Downarrow v^\sharp$。

*let。* $\rho \vdash e_1 \Downarrow v_1$ 且 $\rho[x \mapsto v_1] \vdash e_2 \Downarrow v$。由归纳假设 $e_1[\rho^\sharp] \Downarrow v_1^\sharp$ 且 $e_2[(\rho[x \mapsto v_1])^\sharp] \Downarrow v^\sharp$，而后者即 $e_2[\rho^\sharp \setminus x][x := v_1^\sharp]$；代入语义的 `let` 规则可用。

*if 与原始运算。* 各前提在同一 $\rho$ 中求值子项；归纳假设给出 $e_i[\rho^\sharp]$ 相应的求值，布尔值与数不变（它们的读回就是自身），并应用同名的代入规则即可。

由良构的值出发的任何推导中创建的每个闭包都是良构的（lambda 在一个覆盖了它的自由变量的环境中求值），所以假设条件得以保持。对封闭程序，$\varnothing^\sharp$ 是空代入，且 $e[\varnothing^\sharp] = e$。
:::

反过来也成立——若代入语义下 $e \Downarrow w$，则存在 $v$ 使 $\varnothing \vdash e \Downarrow v$ 且 $v^\sharp = w$——证明是类似的归纳，推广到环境即可。于是两个解释器对每个封闭程序算出的结果一致，对哪些程序不停机也一致。我们还可以实测这一论断：

```python
progs = ["(let ((x 1)) (let ((f (lambda (y) (+ x y)))) (let ((x 100)) (f 10))))",
         "(letrec ((fact (lambda (n) (if (= n 0) 1 (* n (fact (- n 1))))))) (fact 20))",
         "(letrec ((fib (lambda (n) (if (< n 2) n (+ (fib (- n 1)) (fib (- n 2))))))) (fib 15))",
         "((lambda (f) (f (f 3))) (lambda (x) (* x x)))"]
for p in progs:
    e = parse(read(p))
    print(ev(e, Env({})), evs(e))
```

```console
11 Num(n=11)
2432902008176640000 Num(n=2432902008176640000)
610 Num(n=610)
81 Num(n=81)
```

::: example 代入的代价有多大？ {#ex-cost}
对 `(fib 20)` 给两个解释器计时，并与 Python 自己的 `fib` 比较。
::: solution
```python
e = parse(read("(letrec ((fib (lambda (n) (if (< n 2) n (+ (fib (- n 1)) (fib (- n 2))))))) (fib 20))"))
for f, args in [(ev, (e, Env({}))), (evs, (e,))]:
    t = time.perf_counter(); r = f(*args)
    print(f.__name__, r, round(time.perf_counter() - t, 2))
```

```console
ev 6765 0.15
evs Num(n=6765) 0.72
python 0.0012
```

这些只是一台机器上的观测（2026 年的 Python 3.14），不是定理，但比值是典型的。两个解释器都调用 `fib` $21\,891$ 次。代入解释器大约慢五倍，因为每次调用都要复制函数体——`if` 的两个分支连同展开的 `letrec`——而环境解释器只分配一个小帧。两者都比 Python 直接运行同一函数慢大约一百倍，这是多一层解释的代价：每个 Fun 操作都要花一次 `match` 分派、几次方法调用和一次字典查找。编译器（[[compilers]]）去掉这一层解释，而词法地址映射（[[programming-languages/scope-binding]]）去掉那些字典查找。
:::
:::

::: warning 解释器悄悄借用宿主语言的语义
定义式解释器的精确程度只取决于它最弱的一行。在 `prim(op, ev(l, env), ev(r, env))` 中，Fun 的原始运算先求值左操作数，*是因为 Python 从左到右求值函数实参*——换掉宿主语言，被定义语言也跟着变。同样，Fun 按值调用是因为 `ev(arg, env)` 在体被求值之前就被调用；Fun 的整数无上界是因为 Python 的整数无上界；递归很深的 Fun 程序会带着 Python 的 `RecursionError` 失败，因为每个 Fun 调用要用掉好几个 Python 栈帧。约翰·雷诺兹（Reynolds）在 "Definitional interpreters for higher-order programming languages"（1972）中阐明了这一点：要想定义而不是继承求值顺序，就把解释器写成不依赖宿主顺序的样子，例如采用续延传递风格（[[programming-languages/control]]）。
:::

## 函数的表示

闭包的表示不止一种。数据结构 `Closure(param, body, env)` 是**一阶**表示：一个供解释器查看的记录。另一种办法是用一个*Python* 函数来表示 Fun 的函数，即**高阶**表示：

```python
def ev2(e, env):                       # env：一个 Python 字典
    match e:
        case Lam(x, body): return lambda v: ev2(body, {**env, x: v})
        case App(fn, arg): return ev2(fn, env)(ev2(arg, env))
        case Var(x): return env[x]
        # ……其余分支同前
```

现在 Python 的闭包替 Fun 干了活：Python 的 `lambda` 捕获了 `body` 与 `env`。两种表示由一个称为**去功能化**（defunctionalisation）的程序变换联系起来（同样归功于雷诺兹）：把程序中的每个 `lambda` 换成其自由变量的记录，把每次调用换成对记录的分派。对 `ev2` 去功能化便得到 `ev`。高阶版本更短；一阶版本可以被打印、检查、序列化，并翻译到没有一等函数的语言中——这就是编译器把闭包表示为记录的原因（[[compilers]]）。

::: application 解释器无处不在
许多程序里藏着一个解释器而不自知。电子表格求值其单元格的公式语言；正则表达式引擎解释一个编译后的模式；数据库在表上求值一个查询计划——一棵算子树（[[databases]]）；配置语言、模板引擎与构建系统各自解释着自家的小型语言。当这样的语言长出了函数与变量，它面对的就正是本章的这些个问题，而作用域或求值顺序上的差错是一类经典的缺陷来源（许多模板与宏语言的早期版本都曾意外地采用动态作用域）。像这里一样先把语义写成规则，是一笔廉价的保险。
:::

::: history
约翰·麦卡锡（McCarthy）的论文 "Recursive functions of symbolic expressions and their computation by machine, Part I"（1960）通过在 LISP 自身中给出 `eval` 与 `apply` 来定义 LISP——第一个**元循环**解释器，即用语言自身来定义该语言。最初的 LISP 使用动态作用域；把函数作为实参传递的"funarg 问题"催生了闭包，闭包则首先由彼得·兰丁（Landin）在 "The mechanical evaluation of expressions"（1964）中为 SECD 机描述。盖伊·斯蒂尔（Steele）与杰拉尔德·苏斯曼（Sussman）的 Scheme（1975）使词法作用域与闭包在 Lisp 家族中成为标准，而 *Structure and Interpretation of Computer Programs*（Abelson 与 Sussman，1985）教会了一代人写解释器。约翰·雷诺兹（Reynolds）的 "Definitional interpreters for higher-order programming languages"（1972）分析了解释器从宿主语言继承什么，并引入了去功能化以及用续延修正求值顺序的做法。弗里德曼（Friedman）、万德（Wand）与海因斯（Haynes）的 *Essentials of Programming Languages*（1992；第三版由 Friedman 与 Wand 完成，2008）以及克里希纳穆尔蒂（Krishnamurthi）的 *Programming Languages: Application and Interpretation*（2007）像本课程一样，通过解释器教授整个主题。
:::

## 后续内容

[[programming-languages/scope-binding]] 修改解释器以提供动态作用域、可修改变量及其他参数传递机制，并讨论帧安身何处。[[programming-languages/type-systems]] 在同一批 AST 上写下第二个结构递归——一个类型检查器——它无需运行程序就能预言 `InterpError` 不会发生。[[programming-languages/control]] 用续延传递风格重写解释器，以加入异常与一等续延。编译器（[[compilers]]）提前做好解释器每一步都在做的事：把名字解析成地址、把闭包布置成记录、生成代码而不是对语法做分派。

::: summary
- **解释器**直接求值 AST；动手写一个迫使每个语义问题都必须作答。**去糖**把丰富外壳语法归约为小巧核心。
- 基于代入的求值是正确的，但每次调用都复制函数体；对按值调用的封闭程序，不可能发生变量捕获（[[#lem-closed-subst]]）。
- **环境**把变量映射到值，充当延迟的代入（[[#def-environment]]）；函数值是**闭包**，即代码加上其创建时的环境（[[#def-closure]]）。
- 环境语义在*闭包的*环境添上形参之后求值函数体；这条规则就是**词法作用域**（[[#def-env-semantics]]）。
- 帧成链（对递归则成环）；由于闭包可能活得比创建其帧的调用更久，帧活在堆上。
- 环境解释器算出与代入相同的结果（[[#thm-env-correct]]），代价却低得多。
- **定义式解释器**除非刻意避免，否则会从宿主语言继承求值顺序、数的表示与栈上限。
:::

## 习题

::: exercise 手算求值 {level=1 check="20"}
`(let ((x 2)) (let ((f (lambda (y) (* x y)))) (let ((x 10)) (f x))))` 求值成什么？说明每处 `x` 指的是哪个绑定。（输入值。）
::: solution
`(f x)` 中的实参 `x` 在最内层帧中求值，所以是 $10$。在 `f` 内部，`x` 指认 lambda 被书写之处可见的绑定，即 $x = 2$。所以结果是 $2 \times 10 = 20$，`run` 证实了这一点。若按动态作用域，结果将是 $10 \times 10 = 100$。
:::
:::

::: exercise 数帧 {level=1 check="3"}
运行 `((lambda (f) (f (f 3))) (lambda (x) (* x x)))` 时，`ev` 创建了几个闭包、几个环境帧（不算最初的空帧）？（输入帧的个数。）
::: solution
两个闭包，各对应一个被求值的 `lambda`（`(lambda (f) …)` 与 `(lambda (x) …)`）。帧由应用创建（也由 `let`/`letrec` 创建，但这里没有）：外层调用绑定 `f`（一个帧），在其内部，`f`——平方的闭包——被调用两次，每次调用创建一个绑定 `x` 的帧，先绑 $3$，后绑 $9$。所以共 $3$ 个帧；结果是 $81$。
:::
:::

::: exercise let 是语法糖 {level=1}
用 [[#def-env-semantics]] 的规则证明：在任何环境下，`(let ((x e1)) e2)` 与 `((lambda (x) e2) e1)` 求值成同一个值。一门语言为什么仍可能把 `let` 留作独立构造？
::: solution
对应用：函数求值为 $\langle \lambda x.\,e_2, \rho\rangle$；实参给出 $\rho \vdash e_1 \Downarrow v_1$；体在 $\rho[x \mapsto v_1]$ 中求值。这恰是 `let` 规则的前提，故 $\rho \vdash (\mathsf{let}\ \ldots) \Downarrow v$ 当且仅当 $\rho \vdash ((\mathsf{lambda}\ (x)\ e_2)\ e_1) \Downarrow v$。语言保留 `let`，一是因为它更易读（名字紧挨着它的值），二是（更重要的）因为类型系统可以对它更宽容：在 ML 中，`let` 绑定的变量可以是多态的，而 λ 绑定的不行（[[programming-languages/type-inference]]）。解释器还省下一次闭包的创建。
:::
:::

::: exercise 短路运算符 {level=2}
给 Fun 加上 `and` 与 `or`。解释为什么它们不能是由 `prim` 求值的普通原始运算，并在 `parse` 中用去糖实现它们。
::: solution
与 Python 的一样，`(and a b)` 在 `a` 为假时不应求值 `b`——`(and (= n 0) (< (/ 1 n) 1))` 正依赖于这一点。原始运算会在 `prim` 被调用之前把两个操作数都求值，因为 Fun 按值调用。改用去糖：

```python
        case ["and", a, b]: return If(parse(a), parse(b), Bool(False))
        case ["or", a, b]:  return If(parse(a), Bool(True), parse(b))
```

（放在一般的 `[op, l, r]` 分支之前）。`if` 只求值被选中的分支，于是这两个运算符短路。这些版本要求操作数是布尔值；Python 的 `and` 与 `or` 则返回自己的某个操作数。
:::
:::

::: exercise 不用 letrec 的递归 {level=2}
用 $Z$ 组合子，在不用 `letrec` 的 Fun 中计算 $10!$。解释为什么 $Y$ 组合子在这个解释器里行不通。
::: solution
```python
Z = "(lambda (f) ((lambda (x) (f (lambda (v) ((x x) v)))) (lambda (x) (f (lambda (v) ((x x) v))))))"
print(run(f"(let ((Z {Z})) (let ((fact (Z (lambda (fact) (lambda (n) (if (= n 0) 1 (* n (fact (- n 1))))))))) (fact 10)))"))
```

```console
3628800
```

$Z\ F$ 把 $F$ 应用于 `(lambda (v) ((x x) v))` 的闭包来求值——那是一个值，所以自应用 `(x x)` 被推迟到递归调用真正发生之时。换成 $Y$，实参 `(x x)` 会被抢先求值，因为 Fun 按值调用（[[programming-languages/lambda-calculus#thm-fixed-point]]）：它在 $F$ 被应用之前就先调用自身，于是解释器一路递归直到 Python 抛出 `RecursionError`。
:::
:::

::: exercise 序对 {level=2}
给 Fun 加上序对：`(pair e1 e2)`、`(fst e)`、`(snd e)`。给出环境语义的规则与解释器分支，并决定 `(fst 3)` 应该发生什么。
::: solution
规则：若 $\rho \vdash e_1 \Downarrow v_1$ 且 $\rho \vdash e_2 \Downarrow v_2$，则 $\rho \vdash (\mathsf{pair}\ e_1\ e_2) \Downarrow (v_1, v_2)$；若 $\rho \vdash e \Downarrow (v_1, v_2)$，则 $\rho \vdash (\mathsf{fst}\ e) \Downarrow v_1$，$\mathsf{snd}$ 类似。序对成为一种新的值。代码：

```python
@dataclass(frozen=True)
class Pair: l: object; r: object
@dataclass(frozen=True)
class Proj: which: int; e: object
# parse：
        case ["pair", a, b]: return Pair(parse(a), parse(b))
        case ["fst", a]: return Proj(0, parse(a))
        case ["snd", a]: return Proj(1, parse(a))
# ev：
        case Pair(a, b): return (ev(a, env), ev(b, env))
        case Proj(i, a):
            v = ev(a, env)
            if type(v) is not tuple: raise InterpError(f"projection of a non-pair {v!r}")
            return v[i]
```

`(fst 3)` 没有规则可用，所以是运行时错误，报告为 `InterpError`。把 Fun 的序对表示成 Python 元组之所以安全，只是因为闭包是 `Closure` 对象而不是元组；倘若闭包也是元组，`(fst (lambda (x) x))` 就会不声不响地返回形参的名字——宿主语言的表示泄漏进了被定义语言。
:::
:::

::: exercise 用 Python 函数表示闭包 {level=3}
补全上面勾勒的高阶解释器 `ev2`（环境用 Python 的 `dict`，Fun 的函数用 Python 的函数），包括 `letrec`。用 `(fact 20)` 和小测验里的那个作用域程序测试它。为什么 `letrec` 必须修改字典而不是新建一个？
::: solution
```python
def ev2(e, env):
    match e:
        case Num(n): return n
        case Bool(b): return b
        case Var(x): return env[x]
        case Lam(x, body): return lambda v: ev2(body, {**env, x: v})
        case Prim(op, l, r): return prim(op, ev2(l, env), ev2(r, env))
        case If(c, a, b): return ev2(a, env) if ev2(c, env) else ev2(b, env)
        case Let(x, rhs, body): return ev2(body, {**env, x: ev2(rhs, env)})
        case LetRec(f, x, fb, body):
            env2 = dict(env)
            env2[f] = lambda v: ev2(fb, {**env2, x: v})
            return ev2(body, env2)
        case App(fn, arg): return ev2(fn, env)(ev2(arg, env))
```

```console
>>> ev2(parse(read("(letrec ((fact (lambda (n) (if (= n 0) 1 (* n (fact (- n 1))))))) (fact 20))")), {})
2432902008176640000
>>> ev2(parse(read("(let ((x 1)) (let ((f (lambda (y) (+ x y)))) (let ((x 100)) (f 10))))")), {})
11
```

`{**env, x: v}` 复制字典，所以扩充绝不会扰动更早捕获的环境——这与 `Env` 帧靠共享实现的持久性是同一件事。在 `letrec` 中，Python 的 lambda 必须看到一个其中 `f` 已经绑定到该 lambda 自身的字典；若在创建 lambda 之后再构造 `{**env2, f: …}`，交给 lambda 的环境里就没有 `f`。在 lambda 按引用捕获 `env2` 之后再执行赋值 `env2[f]`，正是打了结，与 `frame.vars[f] = …` 如出一辙。（这一草稿略去了对 `if` 守卫的类型检查，所以它继承了 Python 的真值判定：`(if 1 2 3)` 给出 $2$——上面那则警示的又一例。）
:::
:::

::: exercise 大步语义的确定性 {level=3}
证明环境语义是确定的：若 $\rho \vdash e \Downarrow v$ 且 $\rho \vdash e \Downarrow v'$，则 $v = v'$。你会给 Fun 添上什么特征来破坏这一性质？规则将如何改变？
::: solution
对 $\rho \vdash e \Downarrow v$ 的推导作归纳，同时检视另一个推导。对 $e$ 的每种句法形式恰有一条规则，唯独 `if` 有两条、以守卫的值相区分。常量、变量与 lambda：结果由 $e$ 与 $\rho$ 决定（$\rho(x)$ 是 $x$ 的函数；闭包是 $\langle \lambda x.\,e, \rho\rangle$）。应用：两个推导都在 $\rho$ 中求值 $e_1$ 与 $e_2$；由归纳假设它们得到同一个闭包 $\langle \lambda x.\,e, \rho'\rangle$ 与同一个 $v_2$，于是第三个前提是在同一环境 $\rho'[x \mapsto v_2]$ 中求值同一个 $e$，由归纳假设得 $v = v'$。`if`：由归纳假设守卫的值唯一，故两个推导用同一条规则，而被选中分支的值唯一。`let` 与原始运算类似，`letrec` 则构造同一个带环环境。非确定的选择运算符 `(amb e1 e2)`——配上有规则 $\rho \vdash e_1 \Downarrow v \Rightarrow \rho \vdash (\mathsf{amb}\ e_1\ e_2) \Downarrow v$ 以及对 $e_2$ 的同一条规则——就会破坏确定性。一个读入的原始运算或并发（[[programming-languages/concurrency-models]]）也会；那时规则需要额外的成分（输入流、调度器），或者必须把它们读作关系而非函数。
:::
:::
