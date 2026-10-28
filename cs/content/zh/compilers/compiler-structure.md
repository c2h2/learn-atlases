在计算器里输入 `2 * (3 + 4) - 10 / 5`，它打印出 `12`。把同一个表达式写进一个 C 函数、编译它，再看机器码：里面没有乘 2，没有把 3 和 4 相加，也没有除法——处理器只是被直接告知要使用数 `12`。在你写下的文本与实际运行的指令之间，某个程序读入了你的字符、算出了它们的结构、检查了它们是否合理、提前把算术算完，并为一台既不知道括号也不知道运算符优先级的机器写出了一串指令。这个程序就是**编译器**，本课程讲的就是它如何工作。

编译器是计算机科学中最古老、也被理解得最透彻的大型程序之一，它的技术远不止把 C 变成机器码。同样的思想——把正文扫描成单词符号、把单词符号分析成树、按规则检查树、把树重写成更简单的形式、分析该形式以证明关于一切可能执行的事实、生成代码——被用于数据库查询引擎、正则表达式库、网页浏览器的 JavaScript 引擎、图形着色器编译器、lint 工具与重构工具、配置语言以及机器学习框架。本章先搭出整体骨架，课程的其余部分再逐章填充细节。我们将用大约六十行 Python 构造一个完整的（尽管很小的）从算术表达式到 x86-64 机器码的编译器，证明它的代码生成器是正确的，然后考察真实的编译器如何组织成阶段与遍、如何划分前端与后端，以及编译器如何用它所编译的语言写成。

**课程约定。**程序用 Python 3（清单均在 Python 3.14 下运行）和 C 编写；目标机器是运行 Linux 的 x86-64，采用 System V 调用约定、AT&T 汇编语法，与 [[computer-systems/machine-code]] 完全一致，你应当已读过该章。真实的编译器输出来自 Ubuntu 上的 GCC 15.2 与 Clang 21.1，每次都会注明所用编译选项。

## 什么是编译器

::: definition 编译器 {#def-compiler}
**编译器**是一个程序，它把**源语言**中的程序翻译成**目标语言**中等价的程序。*等价*的意思是：对每个输入，只要源程序在该输入上有定义的行为（产生某个输出，或以该语言规定的方式失败），目标程序就有相同的行为。编译器还必须**拒绝**不是该语言程序的源文本，并给出有用的信息。
:::

目标不必是机器码。从 TypeScript 到 JavaScript、从查询语言到查询计划、或从 C 到 WebAssembly 的编译器仍然是编译器；在两种高级语言之间翻译的程序常称为**源到源编译器**（transpiler）。把编译器与**解释器**区分开的是*何时*检查源程序：解释器每次运行时都直接逐语句执行源程序；编译器事先一次性检查整个程序，产出一个离开编译器也能运行的东西。许多系统两者混用。Python 把源代码编译成字节码，由虚拟机解释执行；Java 编译成字节码，JVM 先解释它，再在程序运行时把它编译成机器码（**即时编译**）。

定义中说“若源程序有定义的行为”。这个限定很重要。在 C 中，`i = i++ + 1;` 或有符号整数溢出是*未定义行为*，此时编译器可以产生任何代码。优化编译器那些看似古怪的表现，很大程度上来自它们“未定义行为绝不发生”的假设权利。

### 阶段

编译器太大，无法作为一个整体来写，于是被划分成若干**阶段**，每个阶段是程序两种表示之间的一次翻译。经典的列表是：

1. **词法分析**（扫描）：字符 → **单词符号**，即语言中的“词”——标识符、数、运算符、关键字——同时丢掉空格与注释（[[compilers/lexical-analysis]]）。
2. **语法分析**（解析）：单词符号 → **语法树**，展示单词符号如何按文法分组（[[compilers/top-down-parsing]]、[[compilers/bottom-up-parsing]]）。
3. **语义分析**：检查文法无法表达的规则——每个名字先声明后使用、类型一致——并把学到的信息标注到树上（[[compilers/semantic-analysis]]）。
4. **中间代码生成**：树 → **中间表示**（IR），一种简单、显式、与机器无关的形式，例如三地址代码（[[compilers/intermediate-representations]]）。
5. **优化**：IR → 更好的 IR，由那些在每次执行上都证明为真的分析来引导（[[compilers/dataflow-optimisation]]）。
6. **代码生成**：IR → 目标指令，包含**指令选取**与**寄存器分配**（[[compilers/code-generation]]）。

与诸阶段并行运行的是**符号表**——编译器关于名字及其已知信息的数据库——以及一个**错误处理器**，它带着问题在源程序中的位置报告它们。运行中的程序还需要一个**运行时系统**——负责分配内存、回收垃圾、处理异常等代码——编译器的输出会调用它（[[compilers/runtime-systems]]）。

::: definition 前端、中端、后端 {#def-ends}
编译器的**前端**包含依赖源语言的那些阶段（词法分析、语法分析、语义分析以及 IR 的生成）。**后端**包含依赖目标机器的那些阶段（指令选取、寄存器分配、指令调度、指令输出）。**中端**（或称**优化器**）在 IR 上工作，理想情况下两边都不依赖。
:::

### 遍

**遍**（pass）是对整个程序（或单个函数）的某一种表示的一次扫视。阶段与遍是两回事。一遍式编译器把所有阶段交错在一起：语法分析器需要下一个单词符号时才向词法分析器索取，一认出某种结构就立刻生成代码，于是程序从不同时完整地存放在内存里。早期编译器这样组织是因为内存稀缺，而 Pascal 和 C 被设计成一遍就够了（这就是 C 要求先声明后使用的原因）。现代优化编译器恰好相反：前端为整个函数或文件建立起 IR，随后几十遍甚至上百遍各自读取并改写它。在这台机器上，让 GCC 15.2 为一个小的 C 文件列出它在 `-O2` 下启用的遍（`gcc -O2 -c -fdump-passes f.c`），它报告 282 条启用的遍，从 `tree-cfg`（构造控制流图）和 `tree-ssa`（转换为静态单赋值形式），经过 `tree-ccp1`（条件常量传播）和 `tree-pre`（部分冗余消除），一直到 `rtl-expand`（降低到机器级 IR）、`rtl-ira`（寄存器分配）和 `rtl-final`（输出汇编）。

## 六十行的完整编译器

看清结构的最清楚的办法，是构造一个五脏俱全而最小的编译器。我们的源语言是整数算术：十进制数、`+ - * /` 和括号，采用通常的优先级（`*` 和 `/` 比 `+` 和 `-` 结合更紧）和左结合性（`8 - 3 - 2` 表示 `(8 - 3) - 2`）。它的含义是 64 位补码算术，如同 C 的 `long`，除法向零截断。目标是一个 x86-64 汇编程序，它的 `main` 打印该值。

前端由词法分析器和语法分析器组成。词法分析器用 Python 的正则表达式库把正文切成数与单字符运算符；语法分析器是一个**递归下降语法分析器**，文法的每条规则对应一个函数

$$
\begin{aligned}
\textit{expr} &\to \textit{term}\ \bigl((\texttt{+} \mid \texttt{-})\ \textit{term}\bigr)^* \\
\textit{term} &\to \textit{atom}\ \bigl((\texttt{*} \mid \texttt{/})\ \textit{atom}\bigr)^* \\
\textit{atom} &\to \texttt{NUM} \mid \texttt{(}\ \textit{expr}\ \texttt{)}
\end{aligned}
$$ {#eq-tiny-grammar}

我们将在 [[compilers/top-down-parsing]] 中给出它的充分理由。树用 Python 元组构造：一个数是 `int`，`('+', l, r)` 是运算符结点。

```python
import re, sys

def lex(src):                       # 阶段一：字符 -> 单词符号
    toks = re.findall(r"\s*(\d+|[-+*/()])", src)
    if "".join(toks) != re.sub(r"\s", "", src):
        raise SyntaxError("bad character")
    return toks + ["$"]             # "$" 标记输入结束

def parse(toks):                    # 阶段二：单词符号 -> 语法树
    pos = 0
    def peek(): return toks[pos]
    def advance():
        nonlocal pos; pos += 1; return toks[pos - 1]
    def expr():                     # expr := term (('+'|'-') term)*
        t = term()
        while peek() in "+-":
            t = (advance(), t, term())
        return t
    def term():                     # term := atom (('*'|'/') atom)*
        t = atom()
        while peek() in "*/":
            t = (advance(), t, atom())
        return t
    def atom():                     # atom := NUM | '(' expr ')'
        tok = advance()
        if tok.isdigit(): return int(tok)
        if tok == "(":
            e = expr()
            if advance() == ")": return e
        raise SyntaxError(f"unexpected {tok!r}")
    tree = expr()
    if peek() != "$": raise SyntaxError(f"unexpected {peek()!r}")
    return tree
```

`while` 循环构造出向左倾斜的树，如 `((8 - 3) - 2)`，这正是左结合性的含义；优先级来自分层，因为 `expr` 寻找 `+` 之前一个 `term` 已经完整。`lex` 中的检查会拒绝任何被模式跳过的字符，比如字母。

后端走一遍树并输出指令。它采用尽可能简单的策略，即**栈式机器**的纪律：每个子树的代码把该子树的值留在 `%rax` 里，等待中的操作数放在硬件栈上。

```python
OPS = {"+": ["addq %rcx, %rax"], "-": ["subq %rcx, %rax"],
       "*": ["imulq %rcx, %rax"], "/": ["cqto", "idivq %rcx"]}

def gen(t, out):                    # 阶段三：树 -> x86-64，结果在 %rax
    if isinstance(t, int):
        out.append(f"movq ${t}, %rax")
        return
    op, l, r = t
    gen(r, out); out.append("pushq %rax")   # 右操作数压入栈中保存
    gen(l, out); out.append("popq %rcx")    # 左在 %rax，右在 %rcx
    out += OPS[op]

def compile_expr(src):
    body = []
    gen(parse(lex(src)), body)
    return "\n".join([".globl main", "main:", "    subq $8, %rsp"]
        + ["    " + i for i in body]
        + ["    leaq fmt(%rip), %rdi", "    movq %rax, %rsi",
           "    movl $0, %eax", "    call printf", "    movl $0, %eax",
           "    addq $8, %rsp", "    ret",
           ".section .rodata", 'fmt: .string "%ld\\n"',
           '.section .note.GNU-stack,"",@progbits']) + "\n"

if __name__ == "__main__":
    sys.stdout.write(compile_expr(sys.argv[1]))
```

先求值右操作数，意味着左操作数完成时已经在 `%rax` 里，而 `subq` 和 `idivq` 正要求左操作数在那里。除法使用 [[computer-systems/machine-code]] 中的指令配对：`cqto` 把 `%rax` 符号扩展进 `%rdx:%rax`，`idivq %rcx` 执行除法，把商留在 `%rax`。序言 `subq $8, %rsp` 保证在调用 `printf` 处栈保持 16 字节对齐，这是 ABI 要求的；表达式代码的压栈与出栈数量相等，不会破坏它。最后一行告诉链接器该程序不需要可执行栈。

::: example 一个输入走完三个阶段 {#ex-phases}
对 `2 * (3 + 4) - 10 / 5` 运行前端，再把结果编译、汇编并运行。
::: solution
```console
$ python3 -c "import tiny; t = tiny.lex('2 * (3 + 4) - 10 / 5'); print(t); print(tiny.parse(t))"
['2', '*', '(', '3', '+', '4', ')', '-', '10', '/', '5', '$']
('-', ('*', 2, ('+', 3, 4)), ('/', 10, 5))
$ python3 tiny.py "2 * (3 + 4) - 10 / 5" > t.s
$ gcc t.s -o t && ./t
12
```

词法分析器产生了十一个单词符号加结束标记；空格已消失。树的根是 `-`，因为 `-` 的优先级最低，积与商是它的两个运算对象。下面是 `t.s` 中 `main` 的主体，加了注释：

```text
    movq $5, %rax           # / 的右操作数 ...
    pushq %rax
    movq $10, %rax          # ... / 的左操作数
    popq %rcx
    cqto
    idivq %rcx              # rax = 10 / 5 = 2
    pushq %rax              # 保存它：它是 - 的右操作数
    movq $4, %rax
    pushq %rax
    movq $3, %rax
    popq %rcx
    addq %rcx, %rax         # rax = 3 + 4 = 7
    pushq %rax
    movq $2, %rax
    popq %rcx
    imulq %rcx, %rax        # rax = 2 * 7 = 14
    popq %rcx               # rcx = 2，很久之前存下的
    subq %rcx, %rax         # rax = 14 - 2 = 12
```

每个运算符结点恰好产生一个 `pushq`（在其右操作数之后）和一个 `popq`（在其左操作数之后），结束时栈重新变空。GCC 的汇编器 `as` 把文本变成机器码，链接器接上了 C 库的 `printf`。
:::
:::

编译器虽小，要紧之处却样样具备：一个懂源语言（对 x86-64 一无所知）的前端，一棵作为两半之间接口的树，一个懂 x86-64（对源程序怎么写的一无所知）的后端。错误由理解它的阶段捕获：`2 + x` 被词法分析器拒绝，`2 + * 3` 被语法分析器拒绝（“unexpected `'*'`”）。它缺少的，正是让真实编译器变难的一切：名字与类型、控制流、真正的 IR、优化以及对寄存器的充分利用。课程的其余部分来补上它们。

### 代码生成器是正确的

因为后端是对树的递归定义的，所以可以用对树的归纳证明它的正确性。用 $\llbracket t \rrbracket$ 表示树 $t$ 在该语言语义下的值：$\llbracket n \rrbracket = n$，而 $\llbracket (\mathit{op}, l, r) \rrbracket = \llbracket l \rrbracket \mathbin{\mathit{op}} \llbracket r \rrbracket$ 按 64 位补码算术计算，其中除法向零截断。

::: theorem 栈式代码生成器的正确性 {#thm-gen-correct}
设 $t$ 是一棵树，其中所有的数都小于 $2^{63}$，且其求值不涉及除以零，也不涉及用 $-1$ 除 $-2^{63}$。若 `gen(t)` 发出的指令从某个栈上放着序列 $S$ 的机器状态开始执行，则执行终止于这样一个状态：`%rax` $= \llbracket t \rrbracket$，且栈上恰好又是 $S$（相同的地址上是相同的值）。只有 `%rax`、`%rcx`、`%rdx`、标志位以及初始栈指针之下的内存被改变。
:::

::: proof
对 $t$ 作结构归纳。

*基本情形*，$t = n$ 是一个数。代码是 `movq $n, %rax`，它把 `%rax` 置为 $n = \llbracket t \rrbracket$，其余什么都不动。（7 字节的 `movq` 立即数形式只能装下 32 位带符号常量；更大的常量，GNU 汇编器会悄然改用 10 字节的 `movabsq` 编码，对 `5000000000 * 3` 运行 `objdump` 即可看到。$2^{63}$ 及以上的数根本无法表示，故有此假设。）

*归纳步骤*，$t = (\mathit{op}, l, r)$；假设结论对 $l$ 和 $r$ 成立。初始栈为 $S$。
1. 由对 $r$ 的假设，`gen(r)` 之后栈为 $S$ 且 `%rax` $= \llbracket r \rrbracket$。
2. `pushq %rax` 使栈变为 $S \cdot \llbracket r \rrbracket$。
3. 把对 $l$ 的假设用于初始栈 $S \cdot \llbracket r \rrbracket$：`gen(l)` 之后栈仍是 $S \cdot \llbracket r \rrbracket$ 且 `%rax` $= \llbracket l \rrbracket$。假设还说明 `gen(l)` 只改变其初始栈指针之下的内存，所以保存的值 $\llbracket r \rrbracket$ 完好无损。
4. `popq %rcx` 把 `%rcx` 置为 $\llbracket r \rrbracket$，并把栈恢复成 $S$。
5. 对 $\mathit{op}$ 的指令计算 `%rax` $\gets$ `%rax` $\mathbin{\mathit{op}}$ `%rcx` $= \llbracket l \rrbracket \mathbin{\mathit{op}} \llbracket r \rrbracket$：`addq`、`subq` 和 `imulq` 算出 64 位回绕的结果，`cqto; idivq` 算出 128 位值 `%rdx:%rax`（符号扩展后等于 `%rax`）被 `%rcx` 除的截断商；假设排除了 `idivq` 产生陷入的那两种情形。它们只改变 `%rax`、`%rdx` 和标志位。

于是结论对 $t$ 成立。因为代码是直线式的，终止性显然。
:::

关于这个证明的两点评论适用于一切编译器。第一，归纳假设必须*强于*“结果最终在 `%rax` 里”：它还必须说栈被复原、栈指针之上的内存得以保全，因为第 3 步依赖内层代码不去碰保存的值。找到正确的不变式是每一个编译器正确性证明的核心。第二，定理是相对于一个精确语义而言的。Python 的 `//` 向负无穷舍入，所以 `0 - 7 // 2` 在 Python 中是 $-4$，而我们的语言（和 C、`idivq` 指令一样）给出 $-3$：

```console
$ python3 tiny.py "0 - 7 / 2" > d.s && gcc d.s -o d && ./d
-3
```

倘若我们规定的是 Python 的语义，这个代码生成器对负运算对象就是错的，而在正数上怎么测试都发现不了。

### 代码用多少栈？

::: proposition 栈深度 {#prop-depth}
设 $d(t)$ 为代码 `gen(t)` 在任一时刻压入栈中的值的数目的最大值。则对数有 $d(n) = 0$，且

$$
d\bigl((\mathit{op}, l, r)\bigr) = \max\bigl(d(r),\ 1 + d(l)\bigr).
$$ {#eq-depth}
:::

::: proof
$(\mathit{op}, l, r)$ 的代码先从初始深度处运行 `gen(r)`，至多到达其上方 $d(r)$ 的深度，然后回到初始深度（[[#thm-gen-correct]]）；接着压栈一次；然后 `gen(l)`，再多压 $d(l)$ 层；最后出栈和运算符指令，它们什么都不压。三段的最大值是 $\max(d(r), 1, 1 + d(l)) = \max(d(r), 1 + d(l))$。
:::

::: example 两棵树的栈深度 {#ex-depth}
计算 `2 * (3 + 4) - 10 / 5` 的树以及 `(12 + 3) * 45 - 6` 的树的 $d$。
::: solution
对第一棵树，`10 / 5` 和 `3 + 4` 各有 $d = \max(0, 1 + 0) = 1$。于是 `2 * (3 + 4)` 有 $d = \max(1, 1 + 0) = 1$（它的右运算对象是较深的那个，先求值，在任何东西压栈之前），而根有 $d = \max(d(\texttt{10/5}), 1 + d(\texttt{2*(3+4)})) = \max(1, 2) = 2$。[[#ex-phases]] 中的清单确实最多同时压着两个值（就在 `4` 的 `pushq` 之后，`2` 在它下面等着）。

对第二棵树，`12 + 3` 有 $d = 1$，`(12 + 3) * 45` 有 $d = \max(0, 1 + 1) = 2$，根有 $d = \max(0, 1 + 2) = 3$。这里较深的子树在左边，每一层多花一个槽位。更聪明的生成器会逐结点选择求值顺序，让较深的子树先行——这就是 **Sethi–Ullman 编号**的思想（[[#ex-sethi-ullman]]）——而真正的代码生成器把值放在寄存器里而不是栈上（[[compilers/code-generation]]）。
:::
:::

拿我们的输出与真正的编译器比较。把表达式放进一个 C 函数：

```c
long f(long x) {
    long y = 2 * (3 + 4) - 10 / 5;
    return x * y;
}
```

用 `gcc -O2 -S -fno-asynchronous-unwind-tables -fcf-protection=none`（GCC 15.2）编译，整个函数是

```text
f:
    leaq    (%rdi,%rdi,2), %rax     # rax = 3x
    salq    $2, %rax                # rax = 12x
    ret
```

算术已在编译时算完（**常量折叠**），乘以 12 被换成一条地址计算加一次移位，它们在大多数 x86-64 处理器上比 `imulq` 便宜。即便在 `-O0` 下，GCC 也发出 `movq $12, -8(%rbp)`：C 本来就在某些上下文中要求编译器求**常量表达式**的值，所以折叠在优化开始之前就在前端发生了。

::: warning `-O0` 不等于“逐字面翻译”
人们容易以为未优化的构建显示的是“源程序真正说的东西”，优化随后改变它。两半都不对。即便在 `-O0` 下，前端也会折叠常量、丢弃 `return` 之后不可达的代码，并且可以在语言允许的范围内任意选择求值顺序（C 不规定 `+` 的左运算对象还是右运算对象先求值——我们的编译器选了右）。而优化也不会改变正确程序的含义；当优化构建“表现不同”时，原因几乎总是源程序中的未定义行为（未初始化变量、越界访问、有符号溢出、数据竞争），而优化器认定了它不可能发生。请用 `-fsanitize=address,undefined` 去抓这类缺陷，而不是怪优化器——尽管编译器确实也有缺陷，下面的历史就有例子。
:::

::: quiz
C 编译器的哪个阶段报告下列每个问题？(a) `int 9lives = 1;` — (b) `x = (y + 1;` — (c) `int x; x();` — 选出正确的对应。
- [ ] (a) 语法分析器，(b) 词法分析器，(c) 语法分析器
- [x] (a) 词法分析器，(b) 语法分析器，(c) 语义分析
- [ ] (a) 语义分析，(b) 语法分析器，(c) 代码生成
- [ ] 三个都由语法分析器发现
::: solution
`9lives` 不是合法的单词符号：一个数之后不能直接跟字母，词法分析器会拒绝它（GCC 15.2：“invalid suffix 'lives' on integer constant”）。`(y + 1;` 是一串合法的单词符号，但不符合文法：语法错误。`x()` 在语法上没问题——调用某物是合法的表达式形状——但 `x` 的类型是 `int`，不是函数：只有知道各名字类型的语义分析才能看出这一点。
:::
:::

## 前端、后端与中间表示

我们的小编译器把一棵树从前端交到后端。真正的编译器有更丰富的接口——**中间表示**，其设计要使前端能把后端需要的关于程序的一切说清楚，且形式便于分析与变换。Clang 的 IR 是 LLVM IR。对上面的函数 `f`，`clang -O0 -S -emit-llvm`（Clang 21.1）产生

```text
define dso_local i64 @f(i64 noundef %0) #0 {
  %2 = alloca i64, align 8
  %3 = alloca i64, align 8
  store i64 %0, ptr %2, align 8
  store i64 12, ptr %3, align 8
  %4 = load i64, ptr %2, align 8
  %5 = load i64, ptr %3, align 8
  %6 = mul nsw i64 %4, %5
  ret i64 %6
}
```

在 `-O2` 下则是

```text
define dso_local i64 @f(i64 noundef %0) local_unnamed_addr #0 {
  %2 = mul nsw i64 %0, 12
  ret i64 %2
}
```

这副 IR 像一台假想机器的汇编语言：寄存器无限多（`%0`、`%2`、…），类型显式（`i64`），事实也显式（`nsw` 即“no signed wrap”，记录 C 的带符号乘法在有定义的程序中不会溢出）。在 `-O0` 下每个变量都住在栈槽里（`alloca`）；优化器把它们提升进寄存器、折叠了常量、删掉了加载与存储。把 `mul … 12` 变成 `lea` 和 `sal`，则留给了了解那台机器上什么便宜给什么的 x86-64 后端。**静态单赋值**形式的这类 IR 将在 [[compilers/intermediate-representations]] 中详细研究。

IR 正是使“支持许多语言、许多机器”变得经济的东西。

::: example 数一数翻译器 {#ex-mn}
某机构需要为 $n$ 台目标机器上的 $m$ 种源语言提供编译器。它必须编写多少部件：(a) 每对配一个独立编译器；(b) 采用公共 IR？
::: solution
(a) $m n$ 个编译器，每个都是完整的程序。(b) $m$ 个前端（每种语言一个，各自产生 IR）加 $n$ 个后端（每台机器一个，各自消费 IR）：$m + n$ 个部件，再加一个共享的优化器。$m = 5$ 种语言、$n = 4$ 台机器时是 $20$ 对 $9$。再增加第六种语言，只需一个前端，而不是四个编译器。GCC 正是这样设计的（C、C++、Objective-C、Fortran、Ada、Go、D 和 Modula-2 的前端，2025 年的 GCC 15 又加入了 COBOL，还有一个实验性的 Rust 前端，全部共享 GIMPLE 与 RTL 两种 IR），LLVM 也是如此（Clang、Swift、Rust、Julia、Zig 等都发出 LLVM IR），Java 与 .NET 虚拟机也一样：它们的字节码在多种语言与每台处理器的即时编译器之间充当公共 IR。这一思想 1958 年以 UNCOL（“面向通用计算机的语言”）之名提出，但直到几十年后才出现成功做到足够通用的 IR。
:::
:::

省是省了，但并非免费。公共 IR 必须低到足以喂饱每个后端，又必须丰富到足以承载每个前端；IR 表达不了的信息就会丢失：一个 Rust 或 Swift 程序一旦降低为 LLVM IR，优化器就再也看不到它的高级类型，于是语言特有的优化必须提前进行。这就是为什么许多现代编译器持有*多级*抽象程度递减的 IR——Rust 编译器把语法树降低为 HIR，再降低为带控制流图的 IR 即 MIR（借用检查器在其上运行），再降低为 LLVM IR，最后到 LLVM 的机器 IR；GCC 则从 GENERIC 到 GIMPLE 再到 RTL。

## 用编译器自己的语言写编译器

编译器是个程序，所以它本身也必须用某种语言写成并编译。为了记录牵涉到的三种语言，我们使用 **T 形图**。

::: definition T 形图记号 {#def-tdiagram}
用实现语言 $I$ 写成的、从源语言 $S$ 到目标语言 $T$ 的编译器记作 $S \xrightarrow{I} T$（传统上画成一个字母 T，$S$ 与 $T$ 在横臂两端，$I$ 在竖干下方）。用 $I$ 写的程序能直接运行，仅当 $I$ 是某台可用机器的机器语言 $M$，或者有 $I$ 的解释器可用。**组合规则**：在机器 $M$ 上运行编译器 $I \xrightarrow{M} J$，以编译器 $S \xrightarrow{I} T$ 的文本作为输入，就得到一个编译器 $S \xrightarrow{J} T$——源语言与目标语言不变，实现语言更新。
:::

组合规则不过是编译的定义（[[#def-compiler]])应用于一个恰好是编译器的程序：翻译改变程序所用的语言，保持程序所做的事。用自己源语言写成的编译器 $S \xrightarrow{S} T$ 称为**自源**（self-hosting）的。多数生产级编译器都是：GCC 和 Clang 用 C++ 写成，Rust 编译器用 Rust，Go 编译器用 Go，OCaml 编译器用 OCaml。用自己的语言写编译器是对该语言和该编译器的双重考验，而且它意味着编译器的开发者天天都在使用该语言。但这带来一个先有鸡还是先有蛋的问题：第一个这样的编译器是怎么编译出来的？

::: definition 自举 {#def-bootstrap}
对一个自源编译器 $S \xrightarrow{S} M$ 进行**自举**，是指先以别的手段得到某个能运行的 $S$ 的编译器或解释器——用别的语言写的，或只支持 $S$ 的一个小子集——再用它编译 $S \xrightarrow{S} M$，从而得到该编译器的一个运行版本（用 $M$ 写成的那个）。
:::

::: example 为一门新语言自举 {#ex-bootstrap}
你在创造一门语言 $L$，想为机器 $M$（x86-64）得到一个自源编译器，该机器上已有 C 编译器 $C \xrightarrow{M} M$。用 T 形图描述一次自举。
::: solution
1. 用 C 写一个 $L$ 的简单编译器：$L \xrightarrow{C} M$。用 C 编译器编译它（组合规则）：$C \xrightarrow{M} M$ 作用于 $L \xrightarrow{C} M$ 得到 $L \xrightarrow{M} M$，一个能运行的 $L$ 编译器。称之为*阶段 0*。它可以很慢、代码可以很差；它只需要正确。
2. 用 $L$ 本身写真正的编译器：$L \xrightarrow{L} M$。用阶段 0 编译它：结果是 $L \xrightarrow{M} M$，即*阶段 1* 编译器。它是新编译器，但由旧编译器造出，所以它自己的代码只有阶段 0 的水平。
3. 再编译一次 $L \xrightarrow{L} M$，这次用阶段 1。结果，*阶段 2*，是新编译器编译出的新编译器，因而具备好的代码质量。
4. 再用阶段 2 编译一次，得到*阶段 3*。若编译器是确定且正确的，阶段 2 与阶段 3 是由源代码相同的两个编译器（阶段 1 与阶段 2 只是自身编译得好坏不同，所做的事相同），从相同输入产生的，所以它们必须**逐位相同**。比较它们是威力强大的测试。

C 版本从此可以退役；此后编译器的每个新版本都由前一个版本编译。Rust 正是这样自举出来的（它的第一个编译器用 OCaml 写成），而第 4 步就是 GCC 的 `make bootstrap` 字面上所做的事：它用系统编译器构建阶段 1，用阶段 1 构建阶段 2，用阶段 2 构建阶段 3，然后比较阶段 2 与阶段 3 的目标文件。
:::
:::

::: example 移植到新机器 {#ex-port}
你在机器 $A$ 上有一个运行着的自源编译器 $L \xrightarrow{A} A$，并有其源程序 $L \xrightarrow{L} A$。你想把它搬到一个什么编译器都没有的新机器 $B$ 上。你该写什么，又该运行什么？
::: solution
写一个新后端，得到 $L \xrightarrow{L} B$（同样的前端与中端，不同的代码生成器）。在机器 $A$ 上用现有编译器编译它：结果是 $L \xrightarrow{A} B$，一个在 $A$ 上运行、为 $B$ 产生代码的**交叉编译器**。用交叉编译器再编译一次 $L \xrightarrow{L} B$：结果是 $L \xrightarrow{B} B$，$B$ 的原生编译器。把它拷到 $B$；从此 $B$ 自给自足。交叉编译也是日常实践：目标小到跑不动编译器时（如微控制器），以及在桌面上为手机构建应用时。
:::
:::

自举有一个令人不安的后果，肯·汤普森（Thompson）在他 1984 年的图灵奖演说《Reflections on Trusting Trust》中指出了这一点。自源编译器的二进制文件由它自己更早的二进制文件产生，而二进制文件可以包含源程序里没有的行为。汤普森描述了怎样改造一个编译器，让它识别自己何时正在编译 login 程序（于是插入一条后门），并识别自己何时正在编译*它自己*（于是把两个识别器都插进新的二进制文件）。一旦那样的二进制文件被安装，改造就可以从编译器的源程序中删去：此后用它构建的每个编译器都继承这些改造，而逐行阅读全部源代码什么也发现不了。此后人们研究的对策是**多样性双重编译**（David A. Wheeler，2005 年及其 2009 年博士论文）：用另一个独立的编译器编译该编译器的源程序，用所得结果再编译一次源程序，并与受怀疑的二进制文件比较；不一致就暴露出无法由源程序解释的差异。现代项目还追求**可复现构建**——同一源程序总是给出逐位相同的二进制文件——这样任何人都能拿分发出去的二进制文件与其源程序对账。

::: widget graph
nodes: sub@4,0; mul@2,1; div@6,1; two@1,2; add@3,2; ten@5,2; five@7,2; three@2,3; four@4,3
edges: sub>mul; sub>div; mul>two; mul>add; add>three; add>four; div>ten; div>five
algorithm: dfs
start: sub
caption: `2 * (3 + 4) - 10 / 5` 的语法树（`sub`、`mul`、`add`、`div` 是运算符结点）。逐步演示从根开始的深度优先搜索。代码生成器就是一种深度优先遍历，它在*完成*每个顶点访问时发出指令：后序，先操作数后运算符。这里的搜索先访问左孩子；我们的 `gen` 先访问右孩子，所以完成次序是 `five`、`ten`、`div`、`four`、`three`、`add`、`two`、`mul`、`sub`——与 [[#ex-phases]] 的指令序列对照。
:::

::: history
最早把一种记号翻译成机器码的程序出现在 1951–52 年：Corrado Böhm 的苏黎世联邦理工学院博士论文（1951 年完成，1954 年发表）描述了一个用自己语言写成的编译器；Alick Glennie 于 1952 年为 Manchester Mark 1 写出了 *Autocode*；Grace Hopper 为 UNIVAC I 做的 A-0 系统（1952 年）从子程序库拼装程序。起决定作用的示范是 **FORTRAN**。John Backus 在 IBM 的团队于 1957 年 2 月在西部联合计算机会议上报告了“The FORTRAN automatic coding system”，同年 4 月交付了 IBM 704 的编译器；它组织为六个节（阶段），耗费约 18 人年，生成的代码好到足以说服程序员放弃汇编语言——该团队把优化视为这门语言能否被接受的关键。1958 年 Strong 等人提出 UNCOL，一种通用中间语言。Timothy Hart 与 Michael Levin 1962 年的 LISP 编译器用 LISP 写成，靠在自己的 LISP 解释器里运行完成自举，是第一个现代意义上的自源编译器。Richard Stallman 于 1987 年发布 GCC；Chris Lattner 与 Vikram Adve 于 2004 年描述了 LLVM。肯·汤普森（Thompson）的《Reflections on Trusting Trust》发表于 1984 年的 *Communications of the ACM*。测试编译器本身就是一个研究领域：Csmith（Yang、Chen、Eide 与 Regehr，2011 年）生成不含未定义行为的随机 C 程序并比较各编译器的输出，在 GCC 和 LLVM 中发现了数百个缺陷；而 Xavier Leroy 的 CompCert（2006–2009 年）是一个 C 编译器，其后端在 Coq 证明助手中被证明正确，正与 [[#thm-gen-correct]] 一脉相承。
:::

## 后续内容

下一章 [[compilers/lexical-analysis]] 将用一个由正则表达式经有限自动机生成的词法分析器，替换我们那一行的 `re.findall`。[[compilers/top-down-parsing]] 和 [[compilers/bottom-up-parsing]] 解释我们的这种递归下降语法分析器何时可行、不可行时又当如何。[[compilers/semantic-analysis]] 补上名字与类型，[[compilers/intermediate-representations]] 给出带控制流的真正 IR，[[compilers/dataflow-optimisation]] 讲述常量折叠及其表亲背后的分析，[[compilers/code-generation]] 讲述寄存器分配与调用约定——从我们的栈式机器代码走到 GCC 那两条指令的一步——以及 [[compilers/runtime-systems]] 编译后的程序所依赖的运行时支持。

::: summary
- **编译器**（[[#def-compiler]]）把源程序翻译成目标程序，二者对一切源行为有定义的输入行为相同，并拒绝不是程序的文本。
- 它组织为**阶段**——词法分析、语法分析、语义分析、IR 生成、优化、代码生成——符号表在旁边贯穿始终；**遍**是对程序的一次扫视，现代编译器在 IR 上要跑上百遍。
- **前端**依赖源语言，**后端**依赖目标机器；公共 **IR** 把 $mn$ 个编译器降为 $m + n$ 个部件（[[#ex-mn]]）。
- 以对树递归定义的代码生成器，其正确性要用足够强不变式的**结构归纳**来证明（[[#thm-gen-correct]]）；正确性总是相对于一个精确语义而言（向零截断的除法与向下取整的除法）。
- 栈式机器代码简单，但每个中间值都要动用内存；其栈深度满足 $d = \max(d(r), 1 + d(l))$（[[#prop-depth]]）。
- **T 形图**记录源语言、目标语言与实现语言；**自举**分阶段造出编译器的自源编译器，比较阶段 2 与阶段 3 即是对它的检验（[[#ex-bootstrap]]）。交叉编译器把它移植到新机器。
- 编译器的二进制文件可以携带源程序里没有的行为（汤普森攻击）；多样性双重编译与可复现构建是防御手段。
:::

## 习题

::: exercise 数单词符号 {level=1 check="9"}
小编译器的词法分析器对 `(12+3)*45-6` 产生多少个单词符号（不计结束标记 `$`）？（填入数字。）
::: solution
`(`、`12`、`+`、`3`、`)`、`*`、`45`、`-`、`6`：九个单词符号。多位数之所以是单个单词符号，是因为模式 `\d+` 尽可能多地匹配数字。
:::
:::

::: exercise 哪个阶段？ {level=1}
对下列每个 C 片段，说出必须拒绝它的编译器的最早阶段：(a) `int x = 08;` (b) `if x > 0 { }` (c) `int a[3]; a = 0;` (d) `return 1 +;` (e) `char *s = "abc;` (f) `int f(void) { return y; }`，其中 `y` 没有声明。
::: solution
(a) 词法分析：`08` 不是合法的八进制常量（GCC 15.2：“invalid digit '8' in octal constant”）。(b) 语法分析：C 要求条件外有括号。(c) 语义分析：代码在语法上没问题，但数组不可赋值。(d) 语法分析。(e) 词法分析：字符串在行末之前没有终止符。(f) 语义分析：名字 `y` 未声明；这需要符号表。
:::
:::

::: exercise 左深树的栈深度 {level=1 check="4"}
用 [[#prop-depth]]，小编译器为 `((((1-2)-3)-4)-5)` 生成的代码最多同时压着几个值？（填入数字。）
::: solution
设 $t_1 = 1 - 2$，$t_{k} = t_{k-1} - (k+1)$。则 $d(t_1) = \max(0, 1 + 0) = 1$，且 $d(t_k) = \max(0, 1 + d(t_{k-1})) = d(t_{k-1}) + 1$，所以 $d(t_4) = 4$。相形之下 `1-(2-(3-(4-5)))` 的深度是 $1$：每个右运算对象都在任何东西压栈之前求值。两个程序都打印出正确结果，$-13$ 和 $3$。
:::
:::

::: exercise 公共 IR 的部件数 {level=2 check="11"}
某公司要为 4 种处理器上的 5 种语言支持编译器。采用公共 IR 的设计，比起每种“语言–处理器”组合配一个独立编译器的设计，少需要多少个独立部件（前端加后端，不计共享优化器）？（填入差值。）
::: solution
独立编译器：$5 \times 4 = 20$。公共 IR：$5 + 4 = 9$。差是 $20 - 9 = 11$，而且增长很快：10 种语言、10 种处理器时是 $100 - 20 = 80$。
:::
:::

::: exercise 一元负号 {level=2}
给小编译器加上一元负号，使 `-3 * -(2 - 5)` 和 `2 - -3` 能被接受。改文法、语法分析器和代码生成器，并把 [[#thm-gen-correct]] 的证明扩充到新情形。
::: solution
文法：$\textit{atom} \to \texttt{NUM} \mid \texttt{(}\,\textit{expr}\,\texttt{)} \mid \texttt{-}\ \textit{atom}$。因为一元负号属于 `atom`，它比任何双目运算符结合得都紧，所以 `-3 * 2` 表示 `(-3) * 2`。在 `atom` 中 `tok = advance()` 之后加上

```python
        if tok == "-": return ("neg", atom())
```

并在 `gen` 的非数分支开头加上

```python
    if t[0] == "neg":
        gen(t[1], out); out.append("negq %rax"); return
```

词法分析器无需改动：`-` 本来就是一个单词符号，是语法分析器根据上下文判断它是一元的（出现在期待 atom 的位置）还是二元的（出现在 term 之后）。结果：

```console
$ for e in "-3 * -(2 - 5)" "--4" "2 - -3"; do python3 tinyneg.py "$e" > n.s && gcc n.s -o n && ./n; done
-9
4
5
```

新情形 $t = (\texttt{neg}, u)$ 的证明：由对 $u$ 的假设，`gen(u)` 之后栈为 $S$ 且 `%rax` $= \llbracket u \rrbracket$；`negq %rax` 把 `%rax` 置为 64 位补码取负，即 $\llbracket -u \rrbracket$（其中 $-(-2^{63}) = -2^{63}$，即回绕结果，与我们的语义一致）。除标志位外什么都不变。
:::
:::

::: exercise 交叉编译器的自举 {level=2}
一个团队在机器 $A$ 上有 C 编译器 $C \xrightarrow{A} A$，并有一个自源 Go 编译器的源程序，其后端支持 $A$ 和 $B$（即他们有 $Go \xrightarrow{Go} A$ 和 $Go \xrightarrow{Go} B$）。他们还有一个用 C 写的旧 Go 编译器 $Go \xrightarrow{C} A$，它能处理新编译器所写成的那种语言。利用 [[#def-tdiagram]] 的组合规则，列出得到 Go 原生编译器 $Go \xrightarrow{B} B$ 所需的各次编译，逐一说明由哪个编译器运行、产出什么。
::: solution
1. 在 $Go \xrightarrow{C} A$ 上运行 $C \xrightarrow{A} A$：得到 $Go \xrightarrow{A} A$（旧编译器，如今在 $A$ 上运行）。
2. 在它之上运行 $Go \xrightarrow{Go} A$：得到 $Go \xrightarrow{A} A$，新编译器（阶段 1）。可再重复一次，得到由自己编译的阶段 2 编译器。
3. 在新的 $Go \xrightarrow{A} A$ 之上运行 $Go \xrightarrow{Go} B$：得到 $Go \xrightarrow{A} B$，一个交叉编译器。
4. 在交叉编译器之上运行 $Go \xrightarrow{Go} B$：得到 $Go \xrightarrow{B} B$。把它拷到 $B$。
（Go 真正的自举自 2015 年的 Go 1.5 起不再需要 C 编译器，而是需要更早的 Go 发布版；Go 的工具链只需设置 `GOOS` 和 `GOARCH` 就能交叉编译。）
:::
:::

::: exercise 阶段 2 与阶段 3 为何必须一致 {level=2}
在 [[#ex-bootstrap]] 中，精确说明为什么阶段 2 与阶段 3 应当完全相同，而阶段 1 与阶段 2 通常不同。说出两种即便编译器正确也可能使阶段 2 与阶段 3 不同的东西，并说明为什么出现差异仍值得追查。
::: solution
编译器*输出*只取决于它的*行为*（它计算哪个翻译）和它的输入。阶段 1 与阶段 2 源代码相同，所以——只要各自由以构建它们的编译器是正确的——它们计算同一个翻译；它们只在自己机器码的质量上有差别（阶段 1 由旧编译器构建）。阶段 2 与阶段 3 是阶段 1 和阶段 2 在同一输入上的输出，所以它们必须相同。阶段 1 与阶段 2 是不同编译器（阶段 0 与阶段 1）的输出，所以它们不同。

正确的编译器如果其输出依赖输入之外的东西，仍可能产生不同的字节：嵌入的时间戳或文件路径、遍历顺序依赖内存地址的哈希表（各次运行的地址空间随机化不同）、写进目标文件的未初始化填充字节。这些正是可复现构建要清除的障碍。差异之所以值得追查，是因为一旦排除了这类不确定性，它就意味着阶段 1 与阶段 2 行为不同——也就是说，构建它们的那个（些）编译器错编了这个编译器。
:::
:::

::: exercise 选择求值顺序 {level=3 #ex-sethi-ullman}
修改 `gen`，使每个运算符结点先求值深度较大的子树，并证明最大栈深度变为

$$
d'(t) = \begin{cases} 0 & t \text{ 是一个数},\\ \max\bigl(d'(l), d'(r)\bigr) & d'(l) \ne d'(r),\\ d'(l) + 1 & d'(l) = d'(r). \end{cases}
$$

证明 $d'$ 从不比 [[#prop-depth]] 的 $d$ 差，计算 `((((1-2)-3)-4)-5)` 的 $d'$，并证明 $d'(t) \le \lfloor \log_2 (\text{叶结点的个数}) \rfloor$。
::: solution
左先次序的代码：`gen(l); pushq %rax; gen(r); movq %rax, %rcx; popq %rax`，后接运算符指令（右操作数最终在 `%rcx`，左在 `%rax`，同前）。其深度为 $\max(d'(l), 1 + d'(r))$。原方案的右先次序深度为 $\max(d'(r), 1 + d'(l))$。先取较深的子树：若 $d'(l) > d'(r)$，左先次序给出 $\max(d'(l), 1 + d'(r)) = d'(l)$，因为 $1 + d'(r) \le d'(l)$；$d'(r) > d'(l)$ 时对称；两者相等时任一次序都给 $d'(l) + 1$。这就是该公式。正确性对每种次序都照 [[#thm-gen-correct]] 完全同样地证明。

从不更差：由归纳，$d'(t) \le d(t)$，因为 $d'(t) \le \max(d'(r), 1 + d'(l))$（两种次序的较小者不超过右先次序那个），且归纳假设适用于两棵子树。

对左深链，每个结点都有一棵子树是数（$d' = 0$），另一棵在最底部是 `1-2`，$d' = 1$；于是对所有 $k$ 有 $d'(t_k) = \max(d'(t_{k-1}), 0) = 1$。深度从 $4$ 降到 $1$。

对数上界：设 $N(t)$ 为叶结点数。对归纳证明 $N(t) \ge 2^{d'(t)}$。对叶结点，$1 \ge 2^0$。若 $d'(l) \ne d'(r)$，设 $d'(t) = d'(l)$，则 $N(t) > N(l) \ge 2^{d'(l)}$。若 $d'(l) = d'(r) = k$，则 $N(t) = N(l) + N(r) \ge 2^k + 2^k = 2^{k+1} = 2^{d'(t)}$。取对数得 $d'(t) \le \log_2 N(t)$，且 $d'$ 是整数。这就是 Sethi–Ullman 标号法（1970 年），用于以最少的寄存器求值表达式。
:::
:::

::: exercise 信任的信任 {level=3}
(a) 解释在汤普森攻击中，检查编译器和 login 程序的全部源代码为何发现不了后门。(b) 解释多样性双重编译的思想：给定编译器 $X$ 的源程序 $s$、据称由 $s$ 构建的二进制文件 $b$，以及一个独立可信的编译器 $T$，要计算和比较什么？相符说明了什么？(c) 关于 $T$ 必须成立的关键假设是什么？
::: solution
(a) 后门只存在于编译器的*二进制文件*中。被攻破的二进制文件能识别两种输入：login 程序——它往 login 的二进制文件里插后门；以及编译器自己的源程序——它往由此产生的二进制文件里插入两个识别器。编译器和 login 的源文件都是干净的，读它们什么也发现不了，而用被攻破的二进制文件重新编译干净的编译器源程序，会重新造出这个破口。

(b) 用 $T$ 编译 $s$，得到二进制文件 $X_1$；只要 $T$ 正确，它的行为就依 $s$ 而定，尽管它的代码与 $b$ 不同。再用 $X_1$ 编译 $s$，得到 $X_2$。由于 $X_1$ 计算 $s$ 规定的翻译，$X_2$ 就是由 $s$ 的一个忠实实现编译 $s$ 所得的结果——而如果 $b$ 是 $s$ 的忠实构建、且编译是确定的，它与 $b$ 编译 $s$ 所得相同。把 $X_2$ 与 $b$ 逐位比较。相符说明 $b$ 与 $s$ 相对应：$b$ 中任何隐藏的自我复制代码必定也在 $s$ 里，否则就在 $T$ 里。

(c) $T$ 不得以*同样的方式*被攻破——它必须独立于 $X$ 的可能攻击者（由他人编写，出自另一条构建谱系）。它不必完美，甚至不必快；只需不共享那个攻击。编译还必须像上一题那样是确定的。
:::
:::
