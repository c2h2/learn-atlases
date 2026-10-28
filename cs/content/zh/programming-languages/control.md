程序的绝大部分控制流是看不见的：一个表达式被求值，它的值被交给正在等待它的那部分计算，程序便继续向前。有些构造会打断这个流程。循环中途的 `return` 抛弃了循环的剩余部分；`raise` 抛弃每一层外层计算，直到最近的一个处理器；生成器的 `yield` 把函数挂起在执行到一半之处，之后再让它恢复；`await` 在等待输入时做的也是同样的事。它们摆弄的都是同一个东西——**剩余计算**，即程序本来打算拿当前表达式的值去做什么——而把这一想法精确化的概念就是**续延**（continuation）。

本章通过 [[programming-languages/syntax-semantics]] 的求值上下文来定义续延，为异常给出形式语义，把 [[programming-languages/interpreters]] 的解释器改写为**续延传递风格**（CPS），使它不再依赖 Python 的调用栈，并用这一成果以寥寥数行加上异常与一等续延（`call/cc`）。随后我们考察 λ-演算的 CPS 变换、作为受限续延的生成器与协程，以及控制的类型化——在那里 `call/cc` 恰好对应经典逻辑的一条定律。

## 续延即求值上下文

在 NB 的小步语义中，一步发生在项内部的某一个位置，由同余规则决定。项的其余部分是一个**求值上下文**，即一个带洞的项，步就发生在洞处（[[programming-languages/syntax-semantics]]，习题「求值上下文」）。对带数的按值调用 λ-演算：

$$
E \;::=\; [\,] \mid E\ t \mid v\ E \mid E + t \mid v + E \mid \mathsf{if}\ E\ \mathsf{then}\ t\ \mathsf{else}\ t
$$

每个不是值的项都唯一地分解为 $E[r]$：一个**可约式**（redex，指有计算规则可适用的项）$r$ 放在某个上下文 $E$ 之中，一步就是 $E[r] \to E[r']$。在 $1 + ((\lambda x.\,x \cdot 2)\ 5)$ 中，可约式是那个应用，上下文是 $E = 1 + [\,]$。

::: definition 续延 {#def-continuation}
一个子表达式的**续延**是包围它的那个求值上下文，把它看成一个从子表达式的值到程序最终结果的函数：对 $E[r]$，$r$ 的续延就是 $\lambda v.\,E[v]$（运行到底）。
:::

在 $1 + ((\lambda x.\,x \cdot 2)\ 5)$ 中，那个应用的续延是「给它加一，然后结束」。每个表达式都有一个续延，无论语言让不让你看到它；在实现中，它由**控制栈**（返回地址与被保存的中间值）表示——函数调用的续延就是它的栈帧之上的一切。**尾调用**是这样一个调用：它的续延与发起调用的函数的续延相同：在 `def f(n): return g(n - 1)` 中，`g` 直接返回到 `f` 的调用者，所以 `g` 运行期间不需要 `f` 的栈帧。

## 异常

异常抛弃续延的一部分：`raise` 跳到最近的外层处理器，两者之间的一切都被抛弃。

::: definition 异常的语义 {#def-exceptions}
增加项 $\mathsf{raise}\ t$ 与 $\mathsf{try}\ t_1\ \mathsf{with}\ x \Rightarrow t_2$，增加一种新的上下文形式 $\mathsf{raise}\ E$，并增加规则

$$
\begin{gathered}
\frac{E \ne [\,] \text{ contains no } \mathsf{try}}{E[\mathsf{raise}\ v] \to \mathsf{raise}\ v}\ \text{(E-Raise)}
\qquad
\frac{}{\mathsf{try}\ v\ \mathsf{with}\ x \Rightarrow t_2 \to v}\ \text{(E-TryV)}
\\[1.2em]
\frac{}{\mathsf{try}\ (\mathsf{raise}\ v)\ \mathsf{with}\ x \Rightarrow t_2 \to t_2[x := v]}\ \text{(E-TryRaise)}
\qquad
\frac{t_1 \to t_1'}{\mathsf{try}\ t_1\ \mathsf{with}\ x \Rightarrow t_2 \to \mathsf{try}\ t_1'\ \mathsf{with}\ x \Rightarrow t_2}\ \text{(E-Try)}
\end{gathered}
$$

求值上下文 $E$ 不伸入 $\mathsf{try}$ 的体内部（那是 E-Try 的职责），所以 E-Raise 抛弃的恰好是到最近的外层 $\mathsf{try}$ 为止的上下文。若一个程序的最终结果是 $\mathsf{raise}\ v$，则它以**未捕获异常**终止。
:::

::: example 追踪异常 {#ex-exn-trace}
求值 $1 + (10 + \mathsf{raise}\ 5)$ 与 $1 + \mathsf{try}\ (10 + \mathsf{raise}\ 5)\ \mathsf{with}\ e \Rightarrow e \cdot 100$，并指明所用的规则。
::: solution
在第一个项中，可约式 $\mathsf{raise}\ 5$（它的实参已经是值）位于上下文 $E = 1 + (10 + [\,])$ 之中，该上下文不含 $\mathsf{try}$。E-Raise 一步把它抛弃：$1 + (10 + \mathsf{raise}\ 5) \to \mathsf{raise}\ 5$，一个未捕获异常。悬挂着的两次加法永远不会被执行。

在第二个项中，$\mathsf{try}$ **内部**那个 raise 的上下文是 $10 + [\,]$，于是 E-Try 配上内部的 E-Raise 给出 $1 + \mathsf{try}\ (\mathsf{raise}\ 5)\ \mathsf{with}\ e \Rightarrow e \cdot 100$。现在 E-TryRaise 把 $5$ 代入 $e$：$1 + 5 \cdot 100 \to 1 + 500 \to 501$。处理器的结果交给整个 $\mathsf{try}$ 的续延「加 $1$」；被抛弃的部分只是「加 $10$」。下面的 CPS 解释器给出同样的答案 $501$。
:::
:::

类型方面，$\mathsf{raise}\ t$ 具有**每个**类型，因为它从不返回：$\Gamma \vdash t : T_{\mathrm{exn}}$ 蕴含对任何 $T$ 都有 $\Gamma \vdash \mathsf{raise}\ t : T$，其中 $T_{\mathrm{exn}}$ 是异常值的类型（ML 的可扩展类型 `exn`，Python 与 Java 中的某个类层次）。处理器必须与它所保护的体具有相同类型。于是安全性定理要重新陈述：

::: theorem 带异常的安全性 {#thm-safety-exn}
在带异常的简单类型 λ-演算中，若 $\varnothing \vdash t : T$，则 $t$ 是值，或对某个值 $v$ 有 $t = \mathsf{raise}\ v$，或 $t \to t'$ 且 $\varnothing \vdash t' : T$。
:::

::: proof
保持性的证明与 [[programming-languages/type-systems#thm-preservation]] 相同，只是增加新情形：E-Raise 情形，$\mathsf{raise}\ v$ 可以赋予任何类型，特别地可赋类型 $T$；E-TryV 情形，体 $v$ 由可逆性具有类型 $T$；E-TryRaise 情形，处理器在 $x{:}T_{\mathrm{exn}}$ 之下具有类型 $T$，且由可逆性 $v : T_{\mathrm{exn}}$，所以代入引理可用。进展性则扩充 [[programming-languages/type-systems#thm-progress]] 的归纳：在每个求值位置上的子项是 $\mathsf{raise}\ v$ 的情形——比如 $t = t_1\ t_2$ 且 $t_1 = \mathsf{raise}\ v$——整个项是 $E[\mathsf{raise}\ v]$，其上下文非空且不含 $\mathsf{try}$，E-Raise 可用；对 $t = \mathsf{try}\ t_1\ \mathsf{with}\ \ldots$，由归纳假设 $t_1$ 或是值（E-TryV），或是 raise（E-TryRaise），或能走步（E-Try）。
:::

这一定理说出的正是「良类型程序不会出岔子」在有异常的语言中的含义：程序可能以未捕获异常终止，但这是一个**已定义**的结果，绝不是卡住的状态。有些语言还在类型中跟踪异常——Java 的受检异常（`throws IOException`），以及 Koka 与 OCaml 5 的效果系统——让类型说出**哪些**异常可能逃逸出去。

::: warning 异常不是廉价的 goto——也不免费
用异常来做普通的控制流（「从搜索深处 raise 一个 `Found`」）很诱人。在 Python 中这是惯用做法且相当快（`StopIteration` 结束每一个 `for` 循环），但在 C++ 与 Java 中，一个真正被抛出的异常要花掉微秒级时间——它必须查表解开 `throw` 与 `catch` 之间的每个栈帧，一路上还运行析构函数或 `finally` 块——尽管**不抛出**的那条路径几乎免费（「零成本」异常）。异常与持有资源的代码配合得也很糟：它们跳过的每个栈帧都必须释放自己获取的资源，`try`/`finally`、`with` 与析构函数正是为此而存在。异常留给例外的结果；当「没找到」是一个平常的答案时，请用返回值（`None`、`Option`、`Result`）。
:::

## 续延传递风格

[[programming-languages/interpreters]] 的那些解释器借用 Python 的控制栈：`ev(App(f, a))` 调用 `ev(f)`，等它的结果，然后调用 `ev(a)`。每个子求值的续延都隐式地住在 Python 的栈帧里。这有两笔代价。我们无法表达捕获或抛弃续延的控制算子，除非借用 Python 的异常；而一个递归 $100\,000$ 层的 Fun 程序需要大约 $300\,000$ 个 Python 栈帧，远超 Python 默认 $1000$ 层的限制。

补救的办法是把续延变成一个显式的参数。

::: definition 续延传递风格 {#def-cps}
若一个函数多收一个参数 $k$——它的续延——并且不是返回值 $v$，而是调用 $k(v)$，则称它处于**续延传递风格**（CPS）。在一个完全用 CPS 写成的程序里，每次调用都是尾调用：没有函数在某个调用返回之后还做任何事。
:::

比较阶乘的直接风格与 CPS：

```python
def fact(n):                       # 直接风格：乘法在栈上等待
    return 1 if n == 0 else n * fact(n - 1)

def fact_k(n, k):                  # CPS：悬挂的乘法存在闭包 k 里
    if n == 0: return k(1)
    return fact_k(n - 1, lambda v: k(n * v))

print(fact(10), fact_k(10, lambda v: v))      # 3628800 3628800
```

在 `fact` 中，「乘以 $n$」这项未完成的工作存在栈帧里；在 `fact_k` 中它存在一个闭包里，$n = 3$ 时的续延是 `lambda v: k3(3 * v)`，其中 `k3` 是 $n = 4$ 时的续延，依此类推。控制栈变成了一条闭包链表——一个我们可以随意复制、保存、抛弃或调用的数据结构。

### CPS 解释器

下面是用 CPS 重写的 Fun 解释器。每个 case 都收到续延 `k` 和第二个用于异常的续延 `h`（**处理器**）；`raise` 把它的值交给 `h` 而不是 `k`，`try` 则为它的体安装一个新的 `h`。两个新构造用来捕获续延：`(callcc f)` 用当前续延调用 `f`，续延被打包成一等值 `Cont(k)`；而把一个 `Cont` 应用于一个值会**抛弃**当前续延，把值交给被捕获的那个。

```python
def ev(e, env, k, h):
    """在 env 中求值 e；把它的值交给 k，或把抛出的值交给 h。返回一个 thunk。"""
    match e:
        case Num(n): return lambda: k(n)
        case Var(x): return lambda: k(env.lookup(x))
        case Lam(x, body): return lambda: k(Closure(x, body, env))
        case Prim(op, l, r):
            return lambda: ev(l, env, lambda a: ev(r, env, lambda b: lambda: k(prim(op, a, b)), h), h)
        case If(c, a, b):
            return lambda: ev(c, env, lambda v: ev(a if v else b, env, k, h), h)
        case App(fn, arg):
            return lambda: ev(fn, env, lambda f: ev(arg, env, lambda v: apply(f, v, k, h), h), h)
        case CallCC(fe):
            return lambda: ev(fe, env, lambda f: apply(f, Cont(k), k, h), h)
        case Raise(re):
            return lambda: ev(re, env, h, h)                 # 值交给处理器
        case Try(body, x, handler):
            return lambda: ev(body, env, k, lambda v: ev(handler, Env({x: v}, env), k, h))
        # ... Bool、Let 与 LetRec 同前，风格相同

def apply(f, v, k, h):
    match f:
        case Closure(x, body, cenv): return lambda: ev(body, Env({x: v}, cenv), k, h)
        case Cont(k2): return lambda: k2(v)                  # 抛弃 k：跳到 k2

def run(src):
    result = {}
    def final(v): result["v"] = v; raise Done
    def uncaught(v): result["v"] = f"uncaught exception: {v}"; raise Done
    step = ev(parse3(read(src)), Env({}), final, uncaught)
    try:
        while True: step = step()                            # 蹦床
    except Done:
        return result["v"]
```

另一处改动是**蹦床**（trampoline）。即便用了 CPS，Python 的栈仍会增长，因为它不做尾调用消除（[[program-design/functional-style]]）。于是每个函数都返回一个 **thunk**——一个描述下次调用的零参 `lambda`——而不是直接进行那次调用，`run` 在循环里逐个调用这些 thunk。无论 Fun 的递归有多深，栈深度都保持不变；未完成的工作住在堆上的续延闭包链里。

::: example CPS 解释器中的控制算子 {#ex-cps-run}
在 CPS 解释器中运行深度递归、`call/cc`、异常与提前退出。
::: solution
```python
print(run("(letrec ((fact (lambda (n) (if (= n 0) 1 (* n (fact (- n 1))))))) (fact 20))"))
print(run("(letrec ((count (lambda (n) (if (= n 0) 0 (+ 1 (count (- n 1))))))) (count 100000))"))
print(run("(+ 1 (callcc (lambda (k) (+ 10 (k 2)))))"))
print(run("(+ 1 (try (+ 10 (raise 5)) (catch e (* e 100))))"))
print(run("(+ 1 (raise 7))"))
print(run("""(callcc (lambda (exit)
  (letrec ((p (lambda (n) (if (= n 0) 1 (if (= n 3) (exit 0) (* n (p (- n 1))))))))
    (p 10))))"""))
```

```console
2432902008176640000
100000
3
501
uncaught exception: 7
0
```

直接风格的解释器在第二个程序上失败，报 `RecursionError: maximum recursion depth exceeded`；蹦床版则顺利跑完。第三个程序中，`k` 是「加 $1$ 并结束」这个续延；在 `(+ 10 …)` 内部调用 `(k 2)` 抛弃了悬挂的加 $10$，把 $2$ 直接交给 `k`，得 $3$。第四个程序中，`raise` 把 $5$ 交给 `try` 安装的处理器，处理器的结果 $500$ 交给 `try` 自己的续延「加 $1$」：$501$。第五个程序没有安装任何处理器，于是初始处理器 `uncaught` 收到该值。最后一个程序计算 $10 \cdot 9 \cdots$，却碰到因子 $3$——它代替零——并用 `(exit 0)` 逃脱，不做那些悬挂的乘法：从深度递归中提前退出，`call/cc` 的经典用法。
:::
:::

::: widget plot
f: 3*x + 8; 5
x: 0, 800
y: 0, 2500
labels: \text{直接风格解释器}; \text{带蹦床的 CPS 解释器}
points: 0,8; 100,308; 200,608; 400,1208; 800,2408; 0,5; 100,5; 200,5; 400,5; 800,5
caption: 求值 `(count n)` 期间 Python 调用栈的最大深度（点：通过在算术原语内部遍历帧链测得）。直接风格解释器恰好用 $3n + 8$ 个帧——Fun 递归每层三个 Python 调用——按 Python 默认的 $1000$ 帧限制，它在 $n$ 超过约 $330$ 时失败。带蹦床的 CPS 解释器对每个 $n$ 都只用 $5$ 个帧；悬挂的加法改存在堆上的续延闭包里。总工作量相同；改变的只是把它记在什么地方。
:::

### 一等续延

`call/cc`（call-with-current-continuation，来自 Scheme）是最一般的控制算子：它把续延具体化为一个值，可以被任意次地、从任何地方调用，甚至在 `call/cc` 表达式返回之后。

::: definition call/cc {#def-callcc}
用求值上下文表述，规则是

$$
E[\mathsf{callcc}\ v] \to E[v\ (\mathsf{cont}\ E)]
\qquad\qquad
E[(\mathsf{cont}\ E')\ v] \to E'[v]
$$

第一条把当前上下文打包成值 $\mathsf{cont}\ E$ 交给 $v$；第二条在续延被施加时，用被捕获的上下文**替换**整个当前上下文。
:::

有了 `call/cc`，就能在语言内部本身实现异常、提前退出、生成器、协程与回溯。它的通用性有代价。捕获整个续延需要复制或共享控制栈，所以实现要么把栈帧分配在堆上，要么使用分段栈。而一个能在自己的帧已经返回之后重新进入的续延，与资源以及与 `finally` 块的配合都很别扭（Scheme 为此提供了 `dynamic-wind`）。因此现代设计更偏爱**定界续延**——`shift` 与 `reset` 这类算子（当维（Danvy）与菲利斯基（Filinski），1990）只捕获到某个定界符为止的上下文，返回一个可组合的函数——以及它们的结构化形式**效果处理器**（Plotkin 与 Pretnar，2009），自 2022 年起在 OCaml 5 中可用。

::: quiz
这些程序在 CPS 解释器中求值成什么？
- [x] `(* 2 (callcc (lambda (k) 5)))` 求值为 $10$
- [ ] `(* 2 (callcc (lambda (k) (+ 100 (k 5)))))` 求值为 $210$
- [x] `(+ 1 (try (* 2 3) (catch e 0)))` 求值为 $7$
- [x] `(try (+ 1 (raise 2)) (catch e (+ e 40)))` 求值为 $42$
::: solution
第一个中 `k` 从未被调用，函数正常返回 $5$：$2 \times 5 = 10$。第二个中 `(k 5)` 抛弃 `(+ 100 …)`，把 $5$ 交给「乘以 $2$」：结果是 $10$，不是 $210$。第三个中体什么都没 raise，处理器被忽略：$1 + 6 = 7$。第四个中 raise 抛弃 `(+ 1 …)`，处理器返回 $2 + 40 = 42$。
:::
:::

## CPS 变换

上面的解释器是手工用 CPS 写成的。这一翻译也可以机械地施加到程序上。对按值调用的 λ-演算，普洛特金（Plotkin）的翻译 $[\![\cdot]\!]$ 把一个项映成一个期待其续延的函数：

$$
[\![x]\!] = \lambda k.\,k\ x,
\qquad
[\![\lambda x.\,M]\!] = \lambda k.\,k\ (\lambda x.\,[\![M]\!]),
\qquad
[\![M\ N]\!] = \lambda k.\,[\![M]\!]\ (\lambda m.\,[\![N]\!]\ (\lambda n.\,m\ n\ k)),
$$

其中 $k, m, n$ 是新鲜的。值被直接交给续延；应用先求值函数，再求实参，然后带着实参与续延调用函数。变换后的函数有两个参数：它的形参与它的续延。

```python
def cps(t):
    """λ-项的普洛特金按值调用 CPS 变换。"""
    k = fresh("k")
    match t:
        case Var(x):
            return Lam(k, App(Var(k), t))
        case Lam(x, body):
            return Lam(k, App(Var(k), Lam(x, cps(body))))
        case App(f, a):
            m, n = fresh("m"), fresh("n")
            return Lam(k, App(cps(f), Lam(m, App(cps(a), Lam(n, App(App(Var(m), Var(n)), Var(k)))))))
```

```console
>>> show(cps(parse("f x")))
'λk97. (λk100. k100 f) (λm98. (λk101. k101 x) (λn99. m98 n99 k97))'
```

::: theorem CPS 项处于尾形式 {#thm-tail-form}
对每个 λ-项 $M$，$[\![M]\!]$ 中的每个应用都以一个值——变元或抽象——作为其实参。因此，当 $[\![M]\!]$ 被施加到一个值的续延并按值调用求值时，任何求值步都不会发生在实参内部：每个可约式的求值上下文都只由对值的构成，求值不需要任何「等待实参求值」的控制栈。
:::

::: proof
对 $M$ 作结构归纳，检查三个子句。$[\![x]\!] = \lambda k.\,k\ x$ 中唯一的应用以变元 $x$ 为实参。$[\![\lambda x.\,M]\!] = \lambda k.\,k\ (\lambda x.\,[\![M]\!])$ 中，新应用以一个抽象为实参，而 $[\![M]\!]$ 内部的每个应用由归纳假设以值为实参。$[\![M\ N]\!]$ 中，新应用是 $[\![M]\!]\ (\lambda m.\ldots)$、$[\![N]\!]\ (\lambda n.\ldots)$、$m\ n$ 与 $(m\ n)\ k$，它们的实参是两个抽象与变元 $n$、$k$；$[\![M]\!]$ 与 $[\![N]\!]$ 内部的应用由归纳假设覆盖。

关于推论：把值代入变元保持该性质（代入变元位置的值仍是值，且代入不产生新的应用），所以从 $[\![M]\!]\ K$（$K$ 为值）经 β-规约到达的每个项仍具有该性质。按值调用只在实参不是值时才求值实参；既然所有实参都是值，唯一用到的同余就是求值函数的头部，而每个可约式都沿应用的左侧脊下行即可找到。
:::

因为实参永远是值，按值调用对 β 的限制就咬不着：$[\![M]\!]\ K$ 的按名调用与按值调用求值走出相同的步骤。普洛特金（Plotkin）的 "Call-by-name, call-by-value and the λ-calculus"（1975）证明了：$[\![M]\!]\ (\lambda v.\,v)$ 求值成 $M$ 在按值调用下求得的值 $V$ 的 CPS 像——CPS 程序是原程序的忠实且与求值次序无关的版本。

::: example 运行一个 CPS 变换后的程序 {#ex-cps-church}
变换 $\mathsf{plus}\ c_2\ c_3$ 与 $\mathsf{times}\ c_2\ c_3$（[[programming-languages/lambda-calculus]] 的 Church 编码），用恒等续延按值调用求值它们，并解读结果。
::: solution
变换后程序的结果是一个 CPS 化了的数，它接受一个 CPS 函数和一个续延。要读出它，把它传给 CPS 后继 $\lambda x\,k.\,k\,(s\ x)$（$s$ 是自由变元），再传一个「把结果应用到 $z$ 与恒等函数上」的续延，然后数范式里 $s$ 的个数。

```console
plus (2, 3) direct CBV: 2 steps; CPS CBV: 14 steps; value 5 ; tail form: True
times (2, 3) direct CBV: 2 steps; CPS CBV: 14 steps; value 6 ; tail form: True
```

两者都给出正确的数。按值调用归约在第一个抽象处停下，所以直接风格的程序只用两步（代入实参，不在 λ 下归约）；CPS 版用了 $14$ 步——CPS 让每个中间值都经过一个显式的续延，添进了管理性的可约式。编译器中实用的 CPS 变换（斯蒂尔（Steele）的 Scheme 编译器 Rabbit，1978；阿佩尔（Appel）的 *Compiling with Continuations*，1992）使用更聪明的「单遍」翻译，避免创建大多数管理性可约式。`tail form` 一列在这些项上证实了 [[#thm-tail-form]]。
:::
:::

CPS 是编译器的最佳伙伴：在 CPS 中每个中间值都有名字，求值次序是显式的，每次调用都是带着参数的跳转——恰是机器码的结构。它与 LLVM 和 GCC 使用的 SSA 形式密切相关（[[compilers]]）。

## 生成器与协程

Python 的生成器（[[program-design/iterators-generators#def-generator]]）是一个能在 `yield` 处挂起自己、之后由 `next` 恢复的函数。用本章的话说，`yield v` 捕获生成器的续延（其体的剩余部分），把它存进生成器对象，并把 $v$ 返回给消费者；`next` 调用存着的续延。这个续延是**一次性的**（只能恢复一次）且**定界的**（只延伸到生成器体的末尾，不伸入消费者），这就是生成器比 `call/cc` 便宜得多的原因：CPython 只保留一个挂起的栈帧。

::: example 用续延搭一个生成器 {#ex-cps-generator}
用一个以 CPS 写成的生产者实现一个生成器对象，用它按中序遍历二叉树；与 Python 的生成器比较。
::: solution
```python
class CPSGenerator:
    def __init__(self, producer):
        self.resume = lambda: producer(self._yield, self._done)
    def _yield(self, value, rest):        # 挂起：记住生产者的剩余部分
        self.resume = rest
        return value
    def _done(self):
        self.resume = None
        raise StopIteration
    def __iter__(self): return self
    def __next__(self):
        if self.resume is None: raise StopIteration
        return self.resume()

def walk(tree, yield_, k):
    """以 CPS 中序遍历 (left, value, right) 三元组。"""
    if tree is None: return k()
    left, v, right = tree
    return walk(left, yield_, lambda: yield_(v, lambda: walk(right, yield_, k)))

def walk_gen(tree):                       # 用 Python 的生成器实现同一件事
    if tree is not None:
        left, v, right = tree
        yield from walk_gen(left); yield v; yield from walk_gen(right)

t = (((None, 1, None), 2, None), 3, ((None, 4, None), 5, (None, 6, None)))
print(list(CPSGenerator(lambda y, d: walk(t, y, d))), list(walk_gen(t)))
```

```console
[1, 2, 3, 4, 5, 6] [1, 2, 3, 4, 5, 6]
```

`walk` 带着一个「产出根结点、然后遍历右子树」的续延去访问左子树。当它到达 `yield_(v, rest)` 时，生成器把 `rest`——遍历的剩余部分——存下来，并把 `v` 返回给 `next` 的调用者。下一个 `next` 调用 `rest()`，遍历恰好从上次中断处继续。这些续延闭包扮演的正是 `walk_gen` 那些挂起栈帧的角色。
:::
:::

生成器是**非对称协程**：控制从消费者流向生成器、再流回来，总是回到恢复者。**对称协程**则能把控制转交给任何其他协程。Ana Lúcia de Moura 与 Roberto Ierusalimschy（"Revisiting coroutines"，2009）证明：带完整栈的（「带栈的」，能从嵌套调用中 yield，如 Lua）非对称协程与一次性续延一样有表达力。Python 的生成器是**无栈的**——`yield` 只允许直接写在生成器的体里，嵌套的生成器必须用 `yield from` 串联——它的 `async` 函数也是如此，后者就是等待时向事件循环让出控制权的生成器（[[programming-languages/concurrency-models]]）。

::: widget graph
nodes: consumer@0,1; gen@2,1; walk_left@3,2; walk_right@3,0
edges: consumer>gen:1; gen>walk_left:2; walk_left>consumer:3; consumer>walk_right:4; walk_right>consumer:5
algorithm: none
caption: 消费者与一个遍历树的生成器之间的控制转移，按顺序编号：(1) `next` 启动生成器；(2) 生成器深入左子树；(3) `yield` 捕获遍历的剩余部分并把一个值直接交回消费者——遍历悬挂的栈帧不是被弹出，只是被挂起；(4) 下一个 `next` 恢复被捕获的续延，它继续进入右子树；(5) 再下一次 `yield` 又返回消费者。边上的标签给出顺序。用普通的函数调用，控制只能沿着进来的那条边返回；有了续延，它可以跳到被捕获的上下文指定的任何地方。
:::

## 控制算子的类型

`call/cc` 的类型是什么？它接受一个函数 $f$，$f$ 收到续延并返回一个 $A$；续延若被以 $A$ 调用，就永远不会回到它的调用者，所以它可以被赋予任何 $B$ 对应的类型 $A \to B$；而整个表达式的类型是 $A$：

$$
\mathsf{callcc} : ((A \to B) \to A) \to A.
$$

这就是**皮尔斯定律**，即 [[programming-languages/type-systems]] 中那条在直觉主义逻辑里没有证明、在纯简单类型 λ-演算里没有居留项的经典重言式。蒂莫西·格里芬（Griffin）的 "A formulae-as-types notion of control"（1990）点明了这一观察：向带类型的语言添加控制算子，会把柯里-霍华德对应从直觉主义逻辑扩张到**经典**逻辑，而 CPS 变换对应于经典逻辑到直觉主义逻辑的双重否定翻译，程序的答案类型扮演着「假」的角色。在 CPS 翻译下，类型 $A$ 的项变成类型 $(A \to R) \to R$ 的项（$R$ 为答案类型）——「如果你告诉我拿一个 $A$ 做什么，我就产出最终答案」——当 $R$ 读作「假」时这就是 $\neg\neg A$。

::: history
续延被发现过好几次。阿德里安·范·韦恩加登（van Wijngaarden）在 1964 年就描述了把程序变换成续延传递形式；彼得·兰金（Landin）的 J 算子（1965）在 ISWIM 中捕获了「程序位点」；克里斯托弗·斯特雷奇（Strachey）与克里斯托弗·沃兹沃思（Wadsworth）在指称语义中引入了**续延**一词（"Continuations: a mathematical semantics for handling full jumps"，1974），给出了为 `goto` 定义含义的方法。约翰·雷诺兹（Reynolds）的 "The discoveries of continuations"（1993）讲述了这段历史。戈登·普洛特金（Plotkin）1975 年关于按名调用与按值调用的论文以现当代形式引入了 CPS 变换；盖伊·斯蒂尔（Steele）与杰拉德·萨斯曼（Sussman）的 Scheme（1975）有 `catch`，它在 Revised Report（1986）中变成了 `call-with-current-continuation`。现代形式的异常源自 PL/I 的 ON 条件（1960 年代）、约翰·古德诺（Goodenough）的 "Exception handling: issues and a proposed notation"（1975）、CLU（1977）与 ML（1978–1990）。马蒂亚斯·费莱森（Felleisen）对控制求值上下文语义（1987–1992）、奥利维耶·当维（Danvy）与安杰伊·菲利斯基（Filinski）的 `shift`/`reset`（1990），以及戈登·普洛特金（Plotkin）与马蒂亚·普雷特纳尔（Pretnar）的效果处理器（2009）构成了现代理论；生成器则可追溯到 Alphard 与 CLU 的迭代器（1977）、Icon（1977）与 Python 的 PEP 255（2001）。
:::

## 后续内容

[[programming-languages/concurrency-models]] 用续延来解释线程（调度器就是一个续延队列）、`async`/`await`（一个向事件循环让出的协程）与未来值。编译器使用 CPS 或 SSA 中间语言，并用展开表实现异常（[[compilers]]）。操作系统在每次上下文切换时保存并恢复一个进程的「续延」——它的寄存器与栈（[[operating-systems]]）。

::: summary
- 一个表达式的**续延**是剩余的计算，形式上就是它的求值上下文（[[#def-continuation]]）；实现用控制栈表示它。
- **异常**抛弃到最近处理器为止的续延（[[#def-exceptions]]）；有了异常，类型安全把未捕获异常允许为已定义的结果（[[#thm-safety-exn]]）。
- **续延传递风格**把续延变成一个显式的函数参数（[[#def-cps]]）；每次调用都成为尾调用，再加上**蹦床**，解释器只需要常数栈深。
- CPS 解释器用第二个（处理器）续延实现 `raise`/`try`，用把 `k` 打包成值的方式实现 **call/cc**（[[#def-callcc]]）。
- 普洛特金的 **CPS 变换**产出处于尾形式的项（[[#thm-tail-form]]），其含义不依赖求值次序；编译器使用 CPS 及它的亲戚 SSA。
- **生成器**与**协程**是一次性的定界续延；**定界续延**与**效果处理器**则是结构化、现代化的控制形式。
- `call/cc` 具有**皮尔斯定律**的类型：控制算子对应经典逻辑。
:::

## 习题

::: exercise 上下文与续延 {level=1}
对每个项，找出可约式与求值上下文，并用语言描述可约式的续延：(a) $(\lambda x.\,x + 1)\,((\lambda y.\,y \cdot 2)\ 3)$；(b) $\mathsf{if}\ (1 < 2)\ \mathsf{then}\ 5\ \mathsf{else}\ 6$；(c) $(2 + 3) + (4 + 5)$。
::: solution
(a) 函数头部是值，所以可约式是实参 $(\lambda y.\,y \cdot 2)\ 3$，位于上下文 $(\lambda x.\,x + 1)\,[\,]$ 中：续延是「把值交给加一的函数」。(b) 可约式 $1 < 2$，上下文 $\mathsf{if}\ [\,]\ \mathsf{then}\ 5\ \mathsf{else}\ 6$：「根据值选一个分支」。(c) 从左到右：可约式 $2 + 3$，上下文 $[\,] + (4 + 5)$：「求值 $4 + 5$ 并把这个值加上去」。
:::
:::

::: exercise 手工处理异常 {level=1 check="31"}
用 [[#def-exceptions]] 的规则求值 $\mathsf{try}\ (1 + \mathsf{try}\ (10 + \mathsf{raise}\ 3)\ \mathsf{with}\ e \Rightarrow \mathsf{raise}\ (e \cdot 10))\ \mathsf{with}\ e \Rightarrow e + 1$。（输入最终值。）
::: solution
内层的 raise 抛弃 $10 + [\,]$（E-Raise），内层处理器收到 $3$（E-TryRaise），于是 $1 + \mathsf{try}\ \ldots$ 变成 $1 + \mathsf{raise}\ (3 \cdot 10) \to 1 + \mathsf{raise}\ 30$。这个 raise 抛弃 $1 + [\,]$；外层处理器收到 $30$ 并返回 $31$。
:::
:::

::: exercise 手工处理 call/cc {level=1 check="21"}
`(+ 1 (callcc (lambda (k) (* 10 (+ 2 (k 20))))))` 求值为多少？（输入该值。）
::: solution
`k` 是「加 $1$ 并结束」这个续延。求值体时，`(k 20)` 抛弃悬挂的 `(+ 2 …)` 与 `(* 10 …)`，把 $20$ 交给 `k`：结果是 $21$。
:::
:::

::: exercise 手工 CPS {level=2}
用 Python 手工转换为 CPS：(a) `def sum_list(xs): return 0 if not xs else xs[0] + sum_list(xs[1:])`；(b) 一个函数 `find(tree, p, k_found, k_missing)`，在先序次序下搜索二叉树中满足 `p` 的值，找到第一个就调用 `k_found(v)`，一个也没有就调用 `k_missing()`，不使用异常。
::: solution
```python
def sum_list_k(xs, k):
    if not xs: return k(0)
    return sum_list_k(xs[1:], lambda s: k(xs[0] + s))

def find(tree, p, k_found, k_missing):
    if tree is None: return k_missing()
    left, v, right = tree
    if p(v): return k_found(v)
    return find(left, p, k_found,
                lambda: find(right, p, k_found, k_missing))

t = (((None, 1, None), 2, None), 3, ((None, 4, None), 5, (None, 6, None)))
print(sum_list_k([1, 2, 3], lambda s: s))                       # 6
print(find(t, lambda v: v % 2 == 0, lambda v: v, lambda: None)) # 2（先序：3, 2, ...）
```

两个续延——成功与失败——就是带回溯的搜索的 CPS 形式：左子树的失败续延说的是「现在去试右子树」。找到答案就直接调用 `k_found`，抛弃悬挂的失败续延：一次不用异常的提前退出。（先序先访问 $3$，然后是 $2$，而 $2$ 是偶数。）
:::
:::

::: exercise 异常的类型化 {level=2}
在异常类型为 $\mathsf{Nat}$ 的简单类型 λ-演算中，给出下列各式的类型：(a) $\lambda x{:}\mathsf{Nat}.\,\mathsf{if}\ \mathsf{iszero}\ x\ \mathsf{then}\ \mathsf{raise}\ 0\ \mathsf{else}\ \mathsf{true}$；(b) $\mathsf{try}\ (\mathsf{raise}\ 3)\ \mathsf{with}\ e \Rightarrow \mathsf{iszero}\ e$；(c) 解释为什么「$\mathsf{raise}\ t$ 具有每个类型」不会破坏依赖类型唯一性的检查，检查器又该如何处理它。
::: solution
(a) $\mathsf{Nat} \to \mathsf{Bool}$：then 分支 $\mathsf{raise}\ 0$ 可以被赋予类型 $\mathsf{Bool}$，与 else 分支匹配。(b) $\mathsf{Bool}$：体可以被赋予处理器的类型，而在 $e : \mathsf{Nat}$ 之下处理器具有类型 $\mathsf{Bool}$。(c) 类型的唯一性失效——$\mathsf{raise}\ 0$ 具有每个类型——所以检查器不能简单地计算「那个」类型。算法化做法是给 $\mathsf{raise}$ 一个特殊的底部类型 $\bot$（在 ML 风格的推断器里是一个新鲜类型变元），它与一切相容：在 $\mathsf{if}$ 处取另一分支的类型；在顶层则留下一个不受约束的新变元。带子类型的语言把 $\bot$（Scala 的 `Nothing`、TypeScript 的 `never`、Rust 的 `!`）做成每个类型的子类型。
:::
:::

::: exercise 用 call/cc 造生成器 {level=2}
解释在带 `call/cc` 的语言（如 Scheme）中 `yield` 可以如何实现：必须捕获哪些续延？它们存在哪里？为什么 Python 的生成器不能在嵌套的普通函数调用内部 yield，而用 `call/cc` 实现的生成器却可以？
::: solution
生成器需要两个保存下来的续延：**消费者的**（`next` 被调用之处，yield 的值要返回到那里）与**生产者的**（生成器的剩余部分，下一个 `next` 从那里恢复）。`next` 用 `call/cc` 捕获自己的续延，存进生成器对象，然后调用存着的生产者续延（最初：启动函数体）。`yield v` 用 `call/cc` 捕获生产者的续延，存下来，再带着 $v$ 调用存着的消费者续延。因为 `call/cc` 捕获**整个**上下文，包括生成器体内嵌套的任何函数调用，`yield` 可以出现在任意深度。Python 的生成器靠挂起单个栈帧——生成器函数自己的帧——实现；嵌套调用的帧不是生成器对象的一部分，在那里 `yield` 将无可挂起——所以才需要 `yield from`，它让每一层都成为自己的生成器并把它们串起来。
:::
:::

::: exercise 给相互递归加蹦床 {level=3}
用相互递归定义的 `even(n)` 与 `odd(n)`（`even(0) = True`，`even(n) = odd(n-1)`，`odd(0) = False`，`odd(n) = even(n-1)`）在 `n = 100000` 时撑爆 Python 的栈。写出蹦床版本，并解释它为什么只需要常数栈空间。然后说明它与 CPS 解释器的 `run` 循环的关系。
::: solution
```python
def even(n): return True if n == 0 else (lambda: odd(n - 1))
def odd(n):  return False if n == 0 else (lambda: even(n - 1))

def trampoline(r):
    while callable(r):
        r = r()            # 执行悬挂的尾调用
    return r

print(trampoline(even(100000)), trampoline(odd(7)))   # True True
```

每个函数不再直接发起它的尾调用，而是返回一个描述该调用的 thunk，于是它立即返回、它的帧被弹出；循环在恒定为两帧的栈深上发起下一次调用。这之所以可行，是因为这里每次调用都是尾调用——返回之后无事可做。CPS 解释器先把**每个**调用变成尾调用（靠 CPS），再给它们统统加上蹦床；直接风格代码在返回之后要做的事，都住在续延闭包里。（布尔值不可调用，所以 `callable(r)` 能区分最终答案；一般化的蹦床会把答案包在一个标记类里。）
:::
:::

::: exercise 重新进入一个续延 {level=3}
在 CPS 解释器中，被 `call/cc` 捕获的续延可以在 `call/cc` 表达式返回之后被再次调用。考虑 `(let ((k0 (callcc (lambda (k) k)))) …)`：描述 `k0` 是什么，以及之后用一个值 $v$ 调用它会做什么。写一个 Fun 程序，用某种你自选的不依赖 `letrec` 的外层计数器风格，借它把一个循环跑三次；或者精确解释为什么我们的解释器的环境（没有赋值）使这个循环不用可变状态就不可能实现，以及 Scheme 程序改用什么办法。
::: solution
`(callcc (lambda (k) k))` 返回续延本身：`k0` 绑定的是「`callcc` 的续延」，即「把这个值绑定给 `k0`，然后求值 `let` 的体」。之后调用 `(k0 v)` 会从头重启 `let` 的体，此时 `k0` 绑定的是 $v$。于是体被再执行一遍——这就是一个循环。但每次重新进入都重新绑定 `k0`，并在同一个环境里重新计算其余的一切：Fun 没有赋值，所以第二次通过与第一次除了 `k0` 的新值之外没有任何区别。要数迭代次数，传进去的值必须携带状态：调用 `(k0 (pair k0 (+ n 1)))`，绑定这个序对，并在体的开头把它拆开；配上 [[programming-languages/interpreters]] 的 `pair` 扩充，这就得到一个能跑指定次数的循环。Scheme 程序通常把 `call/cc` 与 `set!` 结合，把续延存在可变变量里——Scheme 里的生成器、回溯（`amb`）与协程库正是这样写的。这个例子说明了为什么一等、可重入的续延如此强大，也说明了为什么它们让推理变得困难：一个 `let` 的体可能执行不止一次。
:::
:::
