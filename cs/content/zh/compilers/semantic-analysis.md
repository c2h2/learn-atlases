下面这个 Mini 函数，前面几章的语法分析器会毫无怨言地接受：

```text
fn f(n: int) -> bool {
    let x = n + true;
    let y = undefined * 2;
    if n { return 1; }
    g(n);
}
```

每一行都合语法，每一行也都错了：整数加了布尔量，使用了从未声明的变量，把整数用作条件，从声明返回 `bool` 的函数返回了整数，调用了一个并不存在的函数 `g`，而且函数可以不返回任何东西就走到结尾。上下文无关文法一个这样的错误也抓不住。"每个变量先声明后使用"不是上下文无关性质（它其实是 $\set{wcw}$ 的伪装，而 [[theory-of-computation/pushdown-automata#ex-ww]] 表明它不是上下文无关的），类型规则还依赖程序中距离任意远的信息。

**语义分析**就是执行这类规则的阶段。它在树上工作——在**抽象语法树**上——而不是在单词符号上。它把每个名字的使用解析到其声明，用的是按**作用域**组织的**符号表**；它为每个表达式计算一个**类型**，并检查每个运算是否施加于类型正确的运算对象；它还检查其他静态规则，比如"函数中的每条路径都返回一个值"。它学到的信息记录在树里，树被**装饰**上类型与声明，传给中间代码的生成。本章我们为 Mini 写出完整的前端——一个构造抽象语法树的语法分析器和一个报告上述全部六个错误的检查器——并研究检查器应当如何工作的理论：写成推断规则的类型系统、检查器确实实现了这些规则的证明，以及"良类型程序不会出错"这一定理。

## 抽象语法树

语法分析树记录了一个串被推导的每个细节：为编码优先级而引入的非终结符（$E$、$T$、$F$）、括号、分号、关键字。这些在语法分析之后都不重要。**抽象语法树**只保留有意义的结构。

::: definition 抽象语法树 {#def-ast}
一个程序的**抽象语法树**（AST）是这样一棵树：内部结点由语言构造命名（双目运算、调用、赋值、`while` 循环、函数定义……），结点的孩子是该构造有意义的组成部分。标点、关键字和成组括号不再表示，单孩子的非终结符链被压平，列表直接表示。每个结点通常带有源程序位置，供错误信息使用。
:::

一个语言的**抽象语法**是其 AST 的文法，它通常是二义的，也无需在意：它不用于语法分析。对 Mini：

$$
\begin{aligned}
e &::= n \mid \mathtt{true} \mid \mathtt{false} \mid x \mid \ominus e \mid e_1 \oplus e_2 \mid f(e_1, \dots, e_k) \\
s &::= \mathtt{let}\ x\ [{:}\,\tau] = e \mid x = e \mid \mathtt{if}\ e\ s_1\ [s_2] \mid \mathtt{while}\ e\ s \mid \mathtt{return}\ e \mid e \mid \set{s_1 \cdots s_k} \\
d &::= \mathtt{fn}\ f(x_1{:}\,\tau_1, \dots, x_k{:}\,\tau_k) \to \tau\ s \qquad \tau ::= \mathtt{int} \mid \mathtt{bool}
\end{aligned}
$$ {#eq-mini-abstract}

其中 $\ominus$ 取遍一元运算符 `-` 和 `!`，$\oplus$ 取遍十三个双目运算符。一个程序是函数定义的列表；内置函数 `print(int) -> int` 写出它的参数。用 Python，每个结点是一个带种类、行号和孩子列表的对象：

```python
class N:
    """AST 结点：种类、源程序行号、孩子结点；.type 由检查器填入。"""
    def __init__(self, kind, line, *kids):
        self.kind, self.line, self.kids, self.type = kind, line, list(kids), None
    def __repr__(self):
        return f"{self.kind}({', '.join(map(repr, self.kids))})"
```

语法分析器就是 [[compilers/top-down-parsing]] 的递归下降语法分析器，扩展到语句与函数，每个过程返回一个结点。（完整的文件 `mini_parse.py` 只有 120 行：声明、语句，以及 [[compilers/top-down-parsing#alg-precedence]] 的优先级爬升表达式分析器——它构造 `N("bin", line, op, left, right)` 而不是元组。）语句过程显示出几个主要的抉择：

```python
    def statement(self):
        line, k = self.line(), self.kind()
        if k == "LET":
            self.next(); name = self.ident(); ty = None
            if self.at(":"): self.next(); ty = self.type_()
            self.expect("="); e = self.expr(); self.expect(";")
            return N("let", line, name, ty, e)
        if k == "IF":
            self.next(); c = self.expr(); then = self.block(); els = None
            if self.kind() == "ELSE":
                self.next(); els = self.statement() if self.kind() == "IF" else self.block()
            return N("if", line, c, then, els)
        if k == "WHILE":
            self.next(); c = self.expr(); return N("while", line, c, self.block())
        if k == "RETURN":
            self.next(); e = self.expr(); self.expect(";"); return N("return", line, e)
        if self.at("{"): return self.block()
        if k == "ID" and self.toks[self.pos + 1][1] == "=":      # 两个单词符号的向前查看
            name = self.ident(); self.next(); e = self.expr(); self.expect(";")
            return N("assign", line, name, e)
        e = self.expr(); self.expect(";"); return N("exprstmt", line, e)
```

因为 `if` 和 `while` 之后强制使用块，Mini 没有悬挂 `else` 问题；`else if` 通过在 `else` 之后直接分析一条 `if` 语句得到允许。语句开头的标识符，若*下一个*单词符号是 `=` 就开始一条赋值，否则开始一条表达式语句（比如一次调用）——这是 Mini 唯一需要两个单词符号向前查看的地方。

::: example 欧几里得算法的 AST {#ex-gcd-ast}
分析下面这个程序，打印 `gcd` 的 AST。

```text
fn gcd(a: int, b: int) -> int {
    while b != 0 {
        let t = a % b;
        a = b;
        b = t;
    }
    return a;
}
fn main() -> int {
    print(gcd(1071, 462));
    return 0;
}
```
::: solution
```text
fn('gcd', [('a', 'int'), ('b', 'int')], 'int', block([while(bin('!=', var('b'), num(0)), block([let('t', None, bin('%', var('a'), var('b'))), assign('a', var('b')), assign('b', var('t'))])), return(var('a'))]))
```

`gcd` 的 39 个单词符号变成了 17 个结点。括号、花括号、冒号、分号和关键字都不见了；`let t = a % b;` 没有声明类型（`None`：它将由初始表达式推断）；条件 `b != 0` 是一个单独的 `bin` 结点，而在分层文法的语法分析树中，每个运算对象之上本会挂着一串十几个非终结符。这个程序没有语义错误，下面的检查器对它返回空列表。
:::
:::

## 名字与作用域

::: definition 声明、作用域、绑定 {#def-scope}
**声明**引入一个带某种意义的名字——一个变量、一个函数、一个类型。一个声明的**作用域**是程序正文中该名字的使用指向它的那一段区域。把一次使用解析到其声明称为把它**绑定**。**词汇**（或**静态**）**作用域**的语言中，作用域完全由程序正文决定：$x$ 的一次使用指向包含它的最内层块中对 $x$ 的声明，只要该声明先于使用。
:::

Mini 的规则就是多数 ALGOL 后裔语言的规则：一个块 `{ … }` 开启一个新作用域；`let` 从其下一条语句起声明一个变量直到所在块结束；内层块的声明可以**遮蔽**外层块中的同名声明，但同一块中两个同名声明是错误；函数参数处于一个包住函数体的作用域；函数都声明在顶层，在每个函数体中都可见，因而函数可以任意次序相互调用。

词汇作用域的符号表是一个**字典的栈**：进入一个块压入一个空字典，离开时弹出；声明放进栈顶字典；查找自顶向下进行。

```python
class Symbol:
    def __init__(self, name, kind, type, line, index=None):
        self.name, self.kind, self.type, self.line = name, kind, type, line
        self.index = index                # 变量：每个函数内唯一的编号

class Scopes:
    def __init__(self): self.stack = [{}]
    def enter(self): self.stack.append({})
    def leave(self): self.stack.pop()
    def declare(self, sym):
        if sym.name in self.stack[-1]:
            return self.stack[-1][sym.name]      # 冲突：返回先前的符号
        self.stack[-1][sym.name] = sym
    def lookup(self, name):
        for scope in reversed(self.stack):       # 最内层作用域优先
            if name in scope: return scope[name]
        return None
```

`declare` 与 `enter`/`leave` 耗时为常数，`lookup` 的耗时与嵌套深度成正比，而实际中深度很小。（为嵌套极深的语言写编译程序，可以改用一个哈希表把每个名字映到它当前声明的栈，外加每个打开的作用域中已声明名字的列表，离开时据此撤销：于是每个操作都是常数时间。）每个变量符号得到一个编号，在其函数内唯一，后面的阶段由此能区分两个恰好同名的不同变量。

::: example 解析名字 {#ex-scopes}
下面这个函数中，`x` 的每次使用指向哪个声明，在标着 `(*)` 的那一行作用域栈是什么样子？

```text
fn h(x: int) -> int {
    let y = x;            // (1)
    {
        let x = y + 1;    // (2)
        let z = x * 2;    // (3)  (*)
        y = z;
    }
    return x + y;         // (4)
}
```
::: solution
在 `(*)` 处的作用域栈，从底向上：全局作用域 $\set{\mathtt{print}, \mathtt{h}}$；参数作用域 $\set{x_0}$（参数，编号 0）；函数体 $\set{y_1}$；内层块 $\set{x_2}$，等第 (3) 行检查完毕又添入 $z_3$。使用 (1) 在函数体中，那里最内层的 `x` 是参数 $x_0$。第 (2) 行的初始表达式 `y + 1` 是在新 `x` 声明*之前*检查的，所以其中的 `y` 是 $y_1$；新的 $x_2$ 遮蔽了参数。使用 (3) 在栈顶作用域找到 $x_2$。到 (4)，内层块已经弹出，所以 `x` 又成了参数 $x_0$，`y` 是 $y_1$，它的值在块中被改过。倘若程序以实参 5 运行，它会返回 $5 + 12 = 17$。
:::
:::

先检查初始表达式、后把名字放入作用域，是有意为之：在块内的 `let x = x + 1;` 中，右边的 `x` 指外层的 `x`（Rust 也是这条规则）。C 作了相反的选择——声明符的作用域从声明符末尾开始，所以 `int x = x + 1;` 右边的 `x` 是新的、未初始化的变量，这是未定义行为；GCC 15.2 只在加了 `-Wall` 时才警告（"'x' is used uninitialized"）。

函数需要两趟检查。若检查器按顺序处理函数、边走边声明，那么 `even` 就无法调用定义在它后面的 `odd`。Mini 的检查器先把每个函数的签名登入全局作用域（第一趟），再检查函数体（第二趟）。为单遍编译而设计的 C 则相反，要求首次调用之前先有**原型**声明。

::: widget graph
nodes: main@0,1; gcd@2,0; print@2,2; even@4,0; odd@4,2
edges: main>gcd; main>print; main>even; even>odd; odd>even
algorithm: topo
caption: 一张**调用图**：边 $f \to g$ 表示 $f$ 的体调用 $g$。若图无圈，按逆拓扑序检查函数就能使每个被调用者都已声明——运行一下拓扑排序就能看到它在这里卡住，因为 `even` 与 `odd` 相互调用（互相递归）。像 Mini 的检查器那样第一趟先收集全部签名，就消除了一切对定义次序的依赖。这张图后面还会被内联函数或自底向上分析它们的优化器用到，那时圈靠强连通分量的分组来处理。
:::

## 类型

**类型系统**按 AST 的结构，用规则把类型赋予程序的各个片段。书写这类规则的标准方式是**推断规则**：线之上是前提，线之下是结论。

::: definition 类型判定与 Mini 表达式的类型规则 {#def-typing}
**类型环境** $\Gamma$ 是一个有限映射：从变量名到类型，从函数名到签名 $(\tau_1, \dots, \tau_k) \to \tau$。**判定** $\Gamma \vdash e : \tau$（"在环境 $\Gamma$ 中，表达式 $e$ 有类型 $\tau$"）在能由下列规则推出时成立，其中 $n$ 是任意整数常量，$\oplus_{\mathit{a}} \in \set{+, -, *, /, \%}$，$\oplus_{\mathit{o}} \in \set{<, \le, >, \ge}$，$\oplus_{\mathit{l}} \in \set{\&\&, \|\|}$，$\oplus_{\mathit{e}} \in \set{==, !=}$：

$$
\frac{}{\Gamma \vdash n : \mathtt{int}} \qquad
\frac{}{\Gamma \vdash \mathtt{true} : \mathtt{bool}} \qquad
\frac{}{\Gamma \vdash \mathtt{false} : \mathtt{bool}} \qquad
\frac{\Gamma(x) = \tau}{\Gamma \vdash x : \tau}
$$

$$
\frac{\Gamma \vdash e : \mathtt{int}}{\Gamma \vdash -e : \mathtt{int}} \qquad
\frac{\Gamma \vdash e : \mathtt{bool}}{\Gamma \vdash\ !e : \mathtt{bool}} \qquad
\frac{\Gamma \vdash e_1 : \mathtt{int} \quad \Gamma \vdash e_2 : \mathtt{int}}{\Gamma \vdash e_1 \oplus_{\mathit{a}} e_2 : \mathtt{int}} \qquad
\frac{\Gamma \vdash e_1 : \mathtt{int} \quad \Gamma \vdash e_2 : \mathtt{int}}{\Gamma \vdash e_1 \oplus_{\mathit{o}} e_2 : \mathtt{bool}}
$$

$$
\frac{\Gamma \vdash e_1 : \mathtt{bool} \quad \Gamma \vdash e_2 : \mathtt{bool}}{\Gamma \vdash e_1 \oplus_{\mathit{l}} e_2 : \mathtt{bool}} \qquad
\frac{\Gamma \vdash e_1 : \tau \quad \Gamma \vdash e_2 : \tau}{\Gamma \vdash e_1 \oplus_{\mathit{e}} e_2 : \mathtt{bool}} \qquad
\frac{\Gamma(f) = (\tau_1, \dots, \tau_k) \to \tau \quad \Gamma \vdash e_i : \tau_i \ (1 \le i \le k)}{\Gamma \vdash f(e_1, \dots, e_k) : \tau}
$$
:::

语句的规则使用判定 $\Gamma \vdash_{\rho} s \Rightarrow \Gamma'$："在环境 $\Gamma$ 中、在一个返回 $\rho$ 的函数内部，语句 $s$ 类型良构，并给其后的语句留下环境 $\Gamma'$。"其中有意思的几条是

$$
\frac{\Gamma \vdash e : \tau}{\Gamma \vdash_{\rho} \mathtt{let}\ x = e \Rightarrow \Gamma[x \mapsto \tau]} \qquad
\frac{\Gamma(x) = \tau \quad \Gamma \vdash e : \tau}{\Gamma \vdash_{\rho} x = e \Rightarrow \Gamma} \qquad
\frac{\Gamma \vdash e : \rho}{\Gamma \vdash_{\rho} \mathtt{return}\ e \Rightarrow \Gamma} \qquad
\frac{\Gamma \vdash e : \mathtt{bool} \quad \Gamma \vdash_{\rho} s \Rightarrow \Gamma'}{\Gamma \vdash_{\rho} \mathtt{while}\ e\ s \Rightarrow \Gamma}
$$

其中 $\Gamma[x \mapsto \tau]$ 是把类型 $\tau$ 的 $x$ 更新（或扩充）进 $\Gamma$，而一个块让环境逐条穿过它的语句、然后恢复外层的环境——这正是作用域栈所做的事。一个函数定义类型良构，是指它的体在"全部签名加上其参数"的环境中类型良构，其中 $\rho$ 取其声明的返回类型。

::: example 一次类型推导 {#ex-derivation}
在 $\Gamma = \set{x : \mathtt{int},\ y : \mathtt{int},\ \mathit{done} : \mathtt{bool}}$ 中推导 `x < y + 1 && !done` 的类型。
::: solution
从叶子向上搭出推导：

$$
\dfrac{
  \dfrac{\dfrac{\Gamma(x) = \mathtt{int}}{\Gamma \vdash x : \mathtt{int}} \quad
         \dfrac{\dfrac{\Gamma(y) = \mathtt{int}}{\Gamma \vdash y : \mathtt{int}} \quad \dfrac{}{\Gamma \vdash 1 : \mathtt{int}}}{\Gamma \vdash y + 1 : \mathtt{int}}}
        {\Gamma \vdash x < y + 1 : \mathtt{bool}}
  \qquad
  \dfrac{\dfrac{\Gamma(\mathit{done}) = \mathtt{bool}}{\Gamma \vdash \mathit{done} : \mathtt{bool}}}{\Gamma \vdash\ !\mathit{done} : \mathtt{bool}}
}{\Gamma \vdash x < y + 1\ \&\&\ !\mathit{done} : \mathtt{bool}}
$$

推导的形状与 AST 完全相同：每个结点一条规则，而每个结点上只有那一条规则的结论形状相符。检查器自底向上算的是同一个东西，它留下的装饰树把类型记录在每个结点上：

```text
bin ['&&'] bool
  bin ['<'] bool
    var ['x'] int
    bin ['+'] int
      var ['y'] int
      num [1] int
  un ['!'] bool
    var ['done'] bool
```
:::
:::

### 检查器

检查器是 AST 上的一个递归函数：对每个表达式，算出规则允许的那个唯一类型，或报告一个错误。为免一个失误引发雪崩似的信息，它给出错的表达式一个特殊类型 `error`，每条规则都对它默默放行：`n + true` 一旦报告过，用它初始化的 `x` 类型就是 `error`，`while x` 便不再产生第二条信息。

```python
    ARITH = {"+", "-", "*", "/", "%"}; ORDER = {"<", "<=", ">", ">="}; LOGIC = {"&&", "||"}

    def expr(self, e):
        e.type = self.infer(e); return e.type

    def infer(self, e):
        k = e.kind
        if k == "num": return "int"
        if k == "bool": return "bool"
        if k == "var":
            sym = self.scopes.lookup(e.kids[0]); e.sym = sym
            if sym is None: self.error(e.line, f"{e.kids[0]} is not declared"); return "error"
            if sym.kind != "var": self.error(e.line, f"{e.kids[0]} is a function"); return "error"
            return sym.type
        if k == "un":
            op, a = e.kids; t = self.expr(a); want = "int" if op == "-" else "bool"
            if t == "error": return "error"
            if t != want: self.error(e.line, f"operand of {op} is {t}, not {want}"); return "error"
            return want
        if k == "bin":
            op, a, b = e.kids; ta, tb = self.expr(a), self.expr(b)
            if "error" in (ta, tb): return "error"
            if op in self.ARITH or op in self.ORDER: want = "int"
            elif op in self.LOGIC: want = "bool"
            else: want = ta                       # == 和 !=：两侧类型须一致
            if ta != want or tb != want:
                self.error(e.line, f"operands of {op} are {ta} and {tb}"); return "error"
            return "int" if op in self.ARITH else "bool"
        if k == "call":
            name, args = e.kids; ts = [self.expr(a) for a in args]
            sym = self.scopes.lookup(name); e.sym = sym
            if sym is None or sym.kind != "fn":
                self.error(e.line, f"{name} is not a function"); return "error"
            ptypes, ret = sym.type
            if len(ts) != len(ptypes):
                self.error(e.line, f"{name} takes {len(ptypes)} arguments, not {len(ts)}")
            for i, (t, p) in enumerate(zip(ts, ptypes)):
                if t not in (p, "error"): self.error(e.line, f"argument {i + 1} of {name} is {t}, not {p}")
            return ret
```

每个 `var` 和 `call` 结点都装饰上它的符号（`e.sym`），每个表达式结点都装饰上它的类型；后面的阶段两者都用，且从不再去查找名字。

::: theorem 检查器判定类型判定式 {#thm-checker}
对每个表达式 $e$ 和每个环境 $\Gamma$（由作用域栈表示），`expr(e)` 返回一个不为 `error` 的类型 $\tau$ 且不报告错误，当且仅当 $\Gamma \vdash e : \tau$ 可推导。而且每个表达式至多有一个类型：若 $\Gamma \vdash e : \tau$ 且 $\Gamma \vdash e : \tau'$，则 $\tau = \tau'$。
:::

::: proof
对 $e$ 作结构归纳。每种情形下，[[#def-typing]] 中恰有一条规则的结论，其表达式形状与 $e$ 相同——这些规则是**语法指导**的——所以 $e$ 的推导若存在，必以该规则收尾，且它施加于各子表达式的推导之上。

*常量与变量。*常量的规则没有前提，检查器直接返回它们的类型。对变量，规则要求 $\Gamma(x) = \tau$；`lookup` 返回 $x$ 的最内层声明，按作用域规则这正是 $\Gamma(x)$ 的含义；检查器返回它的类型，并恰在 $x$ 未声明或是函数时报告错误，这时没有任何规则可用。

*运算符。*对 $e_1 \oplus_{\mathit a} e_2$，推导存在当且仅当 $\Gamma \vdash e_1 : \mathtt{int}$ 与 $\Gamma \vdash e_2 : \mathtt{int}$ 的推导都存在。由归纳假设，这等价于两次递归调用都返回 `int` 且无错误；检查器恰在这种情况下返回 `int`，其余情形报告错误（或传播 `error`）。其余运算符完全同理，只是所涉类型不同；对 `==`，检查器要求两个运算对象的类型相等，而由归纳法它们各自唯一，相等正是规则的条件。调用也一样，签名取自符号表。

*唯一性。*同样用归纳：最后一条规则由 $e$ 的形状决定，其结论的类型由前提的类型决定（例如 $\oplus_{\mathit o}$ 总给 `bool`），而前提的类型由归纳假设唯一。
:::

语句用同一种递归检查，作用域栈扮演被穿线的环境：

```python
    def stmt(self, s):
        """检查语句 s；若其中每条路径都会返回则返回 True。"""
        k = s.kind
        if k == "block":
            self.scopes.enter(); returns = False
            for t in s.kids[0]:
                if returns: self.error(t.line, "unreachable statement")
                returns = self.stmt(t) or returns
            self.scopes.leave(); return returns
        if k == "let":
            name, declared, e = s.kids
            t = self.expr(e)                     # 在名字进入作用域之前检查
            if declared and t != "error" and t != declared:
                self.error(s.line, f"{name} is declared {declared} but initialised with {t}")
            s.sym = self.declare_var(name, declared or t, s.line)
        elif k == "assign":
            name, e = s.kids; t = self.expr(e); sym = self.scopes.lookup(name)
            if sym is None or sym.kind != "var": self.error(s.line, f"{name} is not a variable")
            elif t != "error" and t != sym.type:
                self.error(s.line, f"cannot assign {t} to {name}, which is {sym.type}")
            s.sym = sym
        elif k == "if":
            c, then, els = s.kids; self.condition(c, "if")
            r1 = self.stmt(then); r2 = self.stmt(els) if els else False
            return r1 and r2
        elif k == "while":
            self.condition(s.kids[0], "while"); self.stmt(s.kids[1])
        elif k == "return":
            t = self.expr(s.kids[0])
            if t != "error" and t != self.ret:
                self.error(s.line, f"returning {t} from a function declared to return {self.ret}")
            return True
        elif k == "exprstmt":
            self.expr(s.kids[0])
        return False
```

这个方法返回第二份信息：一个布尔值，表明是否*每条*经过该语句的路径都以 `return` 结束：对 `return` 为真，对两个分支都返回的 `if` 为真，对包含这样一条语句的块为真；其余为假。这是一个小小的**静态分析**，我们用它报告可能走到结尾而不返回的函数，以及 `return` 之后永远不可能执行的语句。剩下的方法先把全部签名登入表，再让参数处于作用域中逐个检查函数体：

```python
    def program(self, prog):
        self.scopes.declare(Symbol("print", "fn", (["int"], "int"), 0))   # 内置函数
        for f in prog.kids[0]:                   # 第一趟：全部签名，供递归调用
            name, params, ret, _ = f.kids
            if self.scopes.declare(Symbol(name, "fn", ([t for _, t in params], ret), f.line)):
                self.error(f.line, f"function {name} is already defined")
        for f in prog.kids[0]: self.function(f)  # 第二趟：函数体
        return self.errors

    def function(self, f):
        name, params, ret, body = f.kids
        self.ret, self.nvars = ret, 0
        self.scopes.enter()
        for pname, ptype in params: self.declare_var(pname, ptype, f.line)
        if not self.stmt(body):
            self.error(f.line, f"function {name} may finish without returning a value")
        self.scopes.leave()

    def declare_var(self, name, type, line):
        sym = Symbol(name, "var", type, line, self.nvars); self.nvars += 1
        if (old := self.scopes.declare(sym)):
            self.error(line, f"{name} is already declared in this scope (line {old.line})")
        return sym
```

（`condition` 检查一个表达式有类型 `bool`，`error` 把带行号的消息追加进表。）

::: example 检查那个满是错误的函数 {#ex-errors}
对章首的那个函数运行检查器，并在结尾之前额外加一行 `while x { x = x - 1; }`。
::: solution
```text
line 2: operands of + are int and bool
line 3: undefined is not declared
line 4: if condition is int, not bool
line 4: returning int from a function declared to return bool
line 5: g is not a function
line 1: function f may finish without returning a value
```

六个错误，六条信息。`while x` 循环没有产生任何信息，尽管 `x` 不是布尔量：`x` 的类型是 `error`，因为它的初始表达式有错，而检查器不重复报告。缺少 return 的消息最后出现，因为它要等整个函数体检查完才能发现。`y` 用有错的表达式初始化，类型也是 `error`。
:::
:::

::: quiz
用上面的检查器，这个函数会产生几条错误信息？

```text
fn k(a: int) -> int {
    let b = a < 1;
    let c = b + 1;
    let d = c * 2;
    return d;
}
```
- [ ] 0 条
- [x] 1 条
- [ ] 2 条
- [ ] 3 条
::: solution
`b` 有类型 `bool`，所以 `b + 1` 被报告（"operands of + are bool and int"）并取类型 `error`。于是 `c` 以类型 `error` 声明，`c * 2` 安静地取类型 `error`，`d` 有类型 `error`，`return d` 不被报告，因为返回的类型是 `error`。一条信息——唯一真正的错误。若没有 `error` 类型，检查器就得为 `c` 选一个类型，多半会报出一串连锁的后续错误。
:::
:::

## 类型可靠性

类型检查器买到了什么？经典的答案出自 Robin Milner（1978）：**良类型程序不会出错**。"出错"指到达一个语言语义没有说该如何处理的状态——整数加布尔量、整数用作条件、以错误的实参个数调用函数。对 Mini 表达式我们可以直接证明它。定义两种类型的值 $\mathcal V(\mathtt{int}) = \Z_{2^{64}}$（64 位整数）和 $\mathcal V(\mathtt{bool}) = \set{\mathit{true}, \mathit{false}}$，并说运行时**存储** $\sigma$（从变量到值的映射）与 $\Gamma$ **匹配**，若对 $\Gamma$ 中的每个变量 $x$ 都有 $\sigma(x) \in \mathcal V(\Gamma(x))$。

::: theorem Mini 表达式的类型可靠性 {#thm-soundness}
假定每个满足 $\Gamma(f) = (\tau_1, \dots, \tau_k) \to \tau$ 的函数 $f$，以 $v_i \in \mathcal V(\tau_i)$ 为实参调用时，或者返回 $\mathcal V(\tau)$ 中的值，或者不返回。若 $\Gamma \vdash e : \tau$ 且 $\sigma$ 与 $\Gamma$ 匹配，则在 $\sigma$ 中求值 $e$ 绝不会把一个运算施加于其定义域之外的运算对象；它或者产生 $\mathcal V(\tau)$ 中的一个值，或者不停止（在某个调用内部），或者以除零终止。
:::

::: proof
对 $\Gamma \vdash e : \tau$ 的推导作归纳。
- *常量*：整数常量求值为整数，`true` 和 `false` 求值为布尔量。
- *变量*：因为 $\sigma$ 与 $\Gamma$ 匹配，$\sigma(x) \in \mathcal V(\Gamma(x)) = \mathcal V(\tau)$。
- *算术*：由归纳假设 $e_1$ 和 $e_2$ 产生整数（或者不停止，或者除零，这些都会向外传播）；模 $2^{64}$ 的整数加、减、乘法对一切整数有定义且给出整数；除法和求余除除数为零外有定义（而且在回绕语义下，$-2^{63} / -1$ 有定义，等于 $-2^{63}$）。
- *比较、逻辑、相等*：由归纳假设，运算对象带有运算符要求的类型——对 `==` 两侧有相同类型 $\tau$，而相等性在 $\mathcal V(\tau)$ 上有定义——结果是布尔量。
- *调用*：实参求值为参数类型的值（归纳），于是由对 $f$ 的假定，调用返回类型 $\tau$ 的值或者不返回。

没有任何情形把运算施加于类型不对的值上。
:::

对函数的假定，靠以声明类型检查每个函数体来兑现；对整个程序的证明是对执行长度的归纳、语句的同一个定理、加上 return 规则——它保证每个 `return` 都产生声明返回类型的值。确定性返回检查则保证根本存在 `return`。这就是每个类型可靠性证明的结构；对带递归、高阶函数和多态的语言，它通常表述为两条引理：**进展性**（未执行完的良类型程序能再走一步）与**保持性**（每一步保持类型），由 Andrew Wright 和 Matthias Felleisen 在 1994 年对 ML 的一个核心首次证明。

注意类型可靠性*没有*承诺什么。除零依然可能，数组下标越界、空指针、无限循环、答案错误也依然可能：类型系统只排除它为排除而设计的那些错误。更丰富的类型系统能排除更多——Rust 的所有权类型排除数据竞争和释放后使用；依赖类型能排除越界下标——代价是程序员和编译程序要多干活。

::: warning 隐式转换是类型系统的一部分
Mini 没有隐式转换：`1 + true` 是错误。C 却有很多，它们能把一次比较完全颠倒。在 C 中，`unsigned int` 与 `int` 比较会把 `int` 转换成 `unsigned`，于是 `-1` 变成 $2^{32} - 1$：

```c
unsigned int u = 1;
int i = -1;
printf("%d\n", u > i);           /* i is converted to unsigned */
printf("%d\n", (long)u > i);     /* both converted to long */
```

打印 `0` 然后是 `1`（GCC 15.2，x86-64）。类型检查器做的正是 C 标准的"通常算术转换"所要求的；程序类型良构、行为有定义，但几乎肯定不是本意。GCC 只在加了 `-Wextra` 时警告（"comparison of integer expressions of different signedness"）。读一个类型检查器时，总要问它默默插入了哪些转换——在 AST 里它们以显式的转换结点出现，C 编译程序就是这样表示它们的。
:::

## 属性与语法指导翻译

检查器在树的结点上计算值——类型、符号、"总返回"。高德纳（Knuth）的**属性文法**（1968 年）把这件事变成语言静态语义的定义：每个文法符号带有**属性**，每条产生式带有计算它们的**语义规则**。

::: definition 综合属性与继承属性 {#def-attributes}
在属性文法中，一个结点的属性称为**综合的**，若它的值由该结点处产生式的规则、从该结点孩子们的属性算出（信息沿树上行）；称为**继承的**，若它由该结点*父亲*处产生式的规则、从父亲的属性和该结点兄弟们的属性算出（信息沿树下传或横传）。若所有属性都是综合的，属性文法称为 **S-属性的**；若每个孩子继承属性只依赖父亲的继承属性和它*左边*兄弟们的属性，则称为 **L-属性的**。
:::

在我们的检查器里，表达式的类型是综合的；环境 $\Gamma$ 是继承的（它来自外层的声明，在左边）；"总返回"是综合的。L-属性文法可用一次从左到右的深度优先遍历求值，这就是递归下降语法分析器和我们的检查器都能一遍走完一切的原因；S-属性文法可以在 LR 分析期间求值——归约一条产生式时就算出它的属性——即 Yacc 与 Bison 的 `$$ = $1 + $3` 动作。

::: example 在分析期间求属性值 {#ex-attributes}
给出一个计算算术表达式值的 S-属性文法，并列出 `2 * 3 + 4` 的 SLR 分析期间算出的属性值（数字作为单词符号，其属性就是它的值）。
::: solution
规则，属性记为 $\mathit{val}$：

| 产生式 | 语义规则 |
|---|---|
| $E \to E_1 + T$ | $E.\mathit{val} = E_1.\mathit{val} + T.\mathit{val}$ |
| $E \to T$ | $E.\mathit{val} = T.\mathit{val}$ |
| $T \to T_1 * F$ | $T.\mathit{val} = T_1.\mathit{val} \times F.\mathit{val}$ |
| $T \to F$ | $T.\mathit{val} = F.\mathit{val}$ |
| $F \to (E)$ | $F.\mathit{val} = E.\mathit{val}$ |
| $F \to \mathrm{num}$ | $F.\mathit{val} = \mathrm{num}.\mathit{lexval}$ |

LR 语法分析器在栈上每个状态旁边存一个值。[[compilers/bottom-up-parsing#ex-slr-trace]] 的归约序列（用 `num` 代替 `id`）算出：$F \to \mathrm{num}$ 给 $F.\mathit{val} = 2$；$T \to F$ 给 $2$；移进 `*` 和 `3` 之后，$F \to \mathrm{num}$ 给 $3$，$T \to T * F$ 给 $2 \times 3 = 6$；$E \to T$ 给 $6$；再来 `+ 4`，$F$、$T$ 给 $4$，$E \to E + T$ 给 $6 + 4 = 10$。每个值都在其产生式被归约时、由栈上已有的值算出：一次归约弹出 $\lvert\beta\rvert$ 个值、压入一个。把算术换成构造结点（$E.\mathit{node} = N(\texttt{"bin"}, \texttt{"+"}, E_1.\mathit{node}, T.\mathit{node})$）便照同样的方式搭出 AST。
:::
:::

属性文法在 20 世纪 70 与 80 年代曾被发展为编译程序生成器系统，但生产级编译程序都手工实现语义分析，像我们这样一趟树走（或几趟：Clang 的语义分析与语法分析同时进行，GCC 的部分在其后进行）。这些概念对思考什么信息在哪里流动仍然有用，并且会在 [[compilers/dataflow-optimisation]] 的数据流分析中，从树推广到图后再度出现。

### Mini 之外

真实语言在这个核心上增添了许多特性，每一种都影响符号表和检查器：

- **重载**：一个名字，按参数类型区分的多个函数（C++、Java）。查找返回候选集合，**重载解析**按排序规则依据实参类型选出最佳匹配。
- **记录与类**：每个 `struct` 或类有自己由字段名和方法名构成的作用域；`p.x` 在 `p` 的类型的域内解析。继承把这些作用域串成链。
- **模块与导入**：名字带限定（`std::vector`、`os.path.join`），符号表变成命名空间的树。
- **类型推断**：Mini 从初始表达式推断 `let t = a % b` 的类型——局部推断，C++（`auto`）、Java（`var`）、Go（`:=`）、Rust 和 TypeScript 也会做。ML 和 Haskell 用 Hindley–Milner 算法推断整个函数（包括多态函数）的类型，该算法用合一求解类型方程。
- **泛型**与**子类型**：类型变量或子类型关系取代规则中的类型相等，于是检查器必须检验 $\tau \le \tau'$ 或实例化类型参数。

::: history
具体语法与抽象语法的区分可追溯到 John McCarthy 1962 年关于 LISP 与程序设计语言语义的工作。高德纳（Knuth）在 "Semantics of context-free languages"（*Mathematical Systems Theory*，1968 年）中引入属性文法，带继承属性、综合属性和一个圈检测试。ALGOL 60（1960 年）确立了块结构与词汇作用域，栈式符号表随它的编译程序一起出现。Robin Milner 的 "A theory of type polymorphism in programming"（*Journal of Computer and System Sciences*，1978 年）给出 ML 的类型推断算法，建立在 Roger Hindley 1969 年的工作之上，并提出"良类型程序不会出错"。Luca Cardelli 与 Peter Wegner 的综述 "On understanding types, data abstraction, and polymorphism"（1985 年）以及 Andrew Wright 与 Matthias Felleisen 的 "A syntactic approach to type soundness"（1994 年，提出进展-保持方法）塑造了今天类型系统的讲述方式；Benjamin Pierce 的《类型与程序设计语言》[Types and Programming Languages]（2002 年）是标准教材。
:::

## 后续内容

装饰过的 AST 是 [[compilers/intermediate-representations]] 的输入，该文把 Mini 函数翻译成三地址代码和控制流图，用符号的唯一编号命名变量、用类型选择运算。确定性返回检查是树上的一次初步数据流分析；[[compilers/dataflow-optimisation]] 在控制流图上作同类推理，那里的圈让方程成为递归的。

::: summary
- 语义分析在**抽象语法树**（[[#def-ast]]）上执行文法无法表达的规则——先声明后使用、类型正确、必定返回——AST 只保留有意义的结构。
- **词汇作用域**（[[#def-scope]]）用**符号表的栈**实现：进入块压栈，离开弹栈，查找先内后外。相互递归的函数需要先收集全部签名的一趟。
- **类型系统**是一组语法指导的推断规则，刻画判定 $\Gamma \vdash e : \tau$（[[#def-typing]]）；检查器是判定这些判定的递归函数，给每个表达式其唯一类型（[[#thm-checker]]）。
- `error` 类型阻止一个失误引发一串信息。
- **类型可靠性**（[[#thm-soundness]]）：良类型程序绝不把运算施加于定义域之外的值；但它们仍可能除零或死循环。隐式转换是类型系统的一部分，可能出人意料。
- **属性文法**（[[#def-attributes]]）描述信息流：综合属性沿树上行（类型），继承属性沿树下传（环境）；S-属性定义在 LR 分析期间求值。
:::

## 习题

::: exercise 数 AST 结点数 {level=1 check="8"}
表达式 `x < y + 1 && !done` 的 AST 有多少个结点，`bin`、`un`、`var`、`num` 结点每个都算？（填入数字。）
::: solution
按种类：`bin` 结点 `&&`、`<`、`+`（3 个）；`un` 结点 `!`（1 个）；`var` 结点 `x`、`y`、`done`（3 个）；`num` 结点 `1`（1 个）。共 $3 + 1 + 3 + 1 = 8$，与 [[#ex-derivation]] 打印的装饰树相合。若用 [[compilers/top-down-parsing]] 的分层文法搭语法分析树，结点数要多出若干倍。
:::
:::

::: exercise 作用域栈 {level=1}
对 [[#ex-scopes]] 的函数 `h`，列出 `return` 语句即将被检查时作用域栈的内容（全部作用域，从底到顶），并说明 `h(1)` 返回什么。
::: solution
全局 $\set{\mathtt{print}, \mathtt{h}}$；参数 $\set{x_0}$；函数体 $\set{y_1}$。内层块的作用域 $\set{x_2, z_3}$ 已经弹出。实参为 1：$y = 1$；块内 $x_2 = 2$，$z = 4$，$y = 4$；随后 `return x + y` 用的是参数：$1 + 4 = 5$。
:::
:::

::: exercise 条件语句的推断规则 {level=1}
仿照上面的语句规则，写出带 `else` 分支的 `if` 语句的推断规则，以及条件*表达式* `c ? e1 : e2`（如 C 中）的规则。两者哪个要求分支同类型，为什么？
::: solution
$$
\frac{\Gamma \vdash e : \mathtt{bool} \quad \Gamma \vdash_\rho s_1 \Rightarrow \Gamma_1 \quad \Gamma \vdash_\rho s_2 \Rightarrow \Gamma_2}{\Gamma \vdash_\rho \mathtt{if}\ e\ s_1\ s_2 \Rightarrow \Gamma}
\qquad
\frac{\Gamma \vdash c : \mathtt{bool} \quad \Gamma \vdash e_1 : \tau \quad \Gamma \vdash e_2 : \tau}{\Gamma \vdash c\ ?\ e_1 : e_2 : \tau}
$$
条件表达式要求两个分支有同一类型 $\tau$，因为它的值要被使用：无论走哪个分支，结果都必须有整个表达式所声称的那唯一类型 $\tau$。语句不产生值，它的分支各自独立检查（其中的声明也逃不出去：结果环境就是 $\Gamma$）。
:::
:::

::: exercise 数错误信息条数 {level=2 check="3"}
Mini 检查器对下面这个函数报告几条信息？（填入数字。）

```text
fn m(p: bool) -> int {
    let q = p + 1;
    let r: bool = 3;
    if q { return 1; }
    return r;
}
```
::: solution
第 2 行：`p + 1` 的运算对象是 `bool` 和 `int`：一条信息；`q` 取类型 `error`。第 3 行：`r` 声明为 `bool` 却用 `int` 初始化：第二条信息；`r` 取声明类型 `bool`。第 4 行：条件 `q` 的类型是 `error`：没有信息。第 5 行：从声明返回 `int` 的函数返回 `bool`：第三条信息。函数总会返回，所以没有缺少 return 的信息。共 $3$ 条。
:::
:::

::: exercise 一个保守的分析 {level=2}
(a) 检查器对 `fn f(n: int) -> int { while true { if n > 0 { return n; } n = n + 1; } }` 报告 "may finish without returning a value"，尽管这个函数离开循环的唯一方式是返回。解释原因，并修改 `stmt`，使得条件为字面量 `true` 的 `while`，在（Mini 没有 `break`）其体中不含 `break` 时也算"总返回"。(b) 修改后的分析仍然可靠吗——若它说"总返回"，每条执行到语句结尾的执行都会返回吗？(c) 为什么没有编译程序能确切判定一个函数能否走到结尾？
::: solution
(a) `while` 的规则返回 False：一般而言循环可能零次执行然后顺序走到循环之后。在 `while` 分支里加上：

```python
        elif k == "while":
            self.condition(s.kids[0], "while"); self.stmt(s.kids[1])
            c = s.kids[0]
            return c.kind == "bool" and c.kids[0] is True     # while true 永不顺序走到循环之外
```

(b) 可靠。不带 `break` 的 `while true` 只能靠其中的 `return` 离开（或者根本不离开），所以没有执行会顺序走到它后面的语句。对一条语句说"总返回"意思是"没有执行能正常完成它"，这一点成立。Java 用的正是这条规则（条件为常量 `true` 的 `while` "不能正常完成"），Rust 特意另设 `loop` 构造也是这个缘故：`rustc` 1.95 对 `while true` 的写法以 "mismatched types" 拒绝（并建议使用 `loop`），却接受 `loop` 的写法。

(c) 判定执行能否到达函数结尾，就等于判定停机问题：给定程序 $P$，函数 `{ P; }`（后面什么都没有）能走到结尾当且仅当 $P$ 停机。所以每个这样的检查都是一种保守近似：它可能拒绝正确的程序，但绝不可接受错误的程序。
:::
:::

::: exercise 遮蔽规则 {level=2}
修改 Mini 检查器，使得 (a) 函数最外层块中的 `let` 不得遮蔽参数（C 的规则），(b) `let x = x + 1;` 中右边指新的 `x`（如 C），并报告 "x is used in its own initialiser"。描述改动，并各给出一个测试。
::: solution
(a) 参数住在它们自己的作用域里，在函数体之下。在 `function` 中，不再让体内部的 `stmt` 调用去压新作用域，而把参数声明进体将要使用的作用域：例如直接在参数作用域中检查体的语句列表（`for t in body.kids[0]: …`），而不是调用 `stmt(body)`；于是 `declare` 在同一个字典里发现参数并报告 "already declared in this scope"。测试：`fn f(n: int) -> int { let n = 3; return n; }` 必须给出一个错误。

(b) 在 `let` 分支中，*先*声明符号再检查初始表达式，但把它标记为"正在初始化"；在 `var` 的 `infer` 里，若找到的符号带标记，就报告 "x is used in its own initialiser"；初始表达式检查完清除标记。测试：对 `fn g(x: int) -> int { { let x = x + 1; return x; } }` 原检查器接受（右边的 `x` 是参数），修改后的报告一个错误。注意含义的改变：新声明的作用域现在从名字处开始，而不是从初始表达式之后。
:::
:::

::: exercise return 规则的可靠性 {level=3}
证明：若语句 $s$ 在一个返回 $\rho$ 的函数中类型良构，`stmt` 方法对 $s$ 返回 True，且 $s$ 的某次执行（从与环境匹配的存储开始）终止，则该执行以执行 `return e` 并带走类型 $\rho$ 的值告终——它绝不正常完成 $s$。把你使用的归纳法说清楚。
::: solution
对 $s$ 的结构归纳，证明：若 `stmt(s)` 返回 True，则 $s$ 的任何终止执行都不会正常完成（而以 `return` 告终）；再结合 `return` 的类型规则（值的类型为 $\rho$，由 [[#thm-soundness]]），即得结论。
- `return e`：执行求值 $e$ 并返回；不会正常完成。
- `if e s1 s2`：True 要求 `stmt(s1)` 与 `stmt(s2)` 都为 True。执行求值 $e$（良类型，故给布尔量或者不停止），然后执行其中一个分支；由归纳假设该分支不会正常完成，`if` 也就不会。
- 块 $\set{t_1 \cdots t_k}$：True 意味着某个 $t_j$ 的 `stmt` 为 True。执行依次运行 $t_1, t_2, \dots$；若到达 $t_j$，由归纳假设 $t_j$ 不会正常完成，块也就不会；若到达不了 $t_j$，则某个更前的 $t_i$ 没有正常完成，块同样不会。
- `let`、赋值、表达式语句、`while`：`stmt` 返回 False，无需证明。
归纳在 AST（结构归纳）上进行；循环的执行一般是无穷的，但我们从不需要对它归纳，因为 `while` 是返回 False 的基本情形。
:::
:::

::: exercise 重载解析 {level=3}
假定 Mini 允许同名而参数类型不同的多个函数，例如 `fn show(x: int) -> int` 和 `fn show(b: bool) -> int`。(a) 修改符号表和检查器的 `call` 分支以支持这种情形，规则是：调用解析到实参类型与参数类型相等的那个唯一候选。(b) 实参类型为 `error` 时应发生什么？(c) 用一个带函数值的语言中的例子 `let f = show;`，解释为什么重载与 Mini 对 `let` 的类型推断相处糟糕。
::: solution
(a) 每个名字存一个函数符号列表：函数`declare` 把符号追加进列表（只有当存在参数类型相同的候选时才报告错误）。在 `call` 中先算实参类型，再过滤候选：`[s for s in cands if s.type[0] == ts]`。若恰剩一个，把它装饰到调用上（`e.sym = it`）并返回其返回类型；若一个不剩，报告 "no function show for (bool, int)"；若剩多个（只有在允许相同签名时才可能），报告歧义。

(b) 只要实参类型是 `error`，解析就不可信：不再报告任何东西并返回 `error`（或者，若所有候选返回类型相同，返回那个类型，进一步减少连锁信息）。这就是 `error` 类型纪律在解析上的应用。

(c) 解析需要实参类型，但 `let f = show;` 没有实参：名字单独表示函数的一个*集合*，`f` 的类型无法从初始表达式推断。语言们这样解决：要求类型标注（`let f: fn(int) -> int = show;`），由上下文提供期望类型——沿树*下传*的信息，一个继承属性——C++ 取重载函数地址时就这样做；或者干脆禁止重载，ML、Haskell（类型类之外）、Go 和 Rust 都如此，部分原因正是让类型推断保持简单。
:::
:::
