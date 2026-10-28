下面是一个 C 函数以及 GCC 为它生成的代码：

```c
long scale(long x, long y, long z) {
    return x + 4 * y + 12 * z;
}
```

```text
scale:
    leaq    (%rdi,%rsi,4), %rax     # rax = x + 4*y
    leaq    (%rdx,%rdx,2), %rdx     # rdx = z + 2*z = 3*z
    leaq    (%rax,%rdx,4), %rax     # rax = (x + 4*y) + 4*(3*z)
    ret                             # 返回 rax
```

这里看不到任何乘法指令，没有变量名，还有一条名为 "load effective address"（取有效地址）却什么都不加载的指令。然而真正运行的就是它。处理器并不懂 C：它只是取指并执行一串**机器指令**，每条指令不过几个字节，告诉它在寄存器与内存之间传送数据、计算、比较或跳转。能够读懂这串指令，你就能明白编译器对你的代码做了什么、为什么一个循环版本比另一个快、崩溃报告意味着什么，以及缓冲区溢出这类安全缺陷是如何发生、又是如何被防住的。

本章教你读懂 x86-64 汇编代码。我们覆盖机器的程序员可见状态（寄存器、内存与条件码）、主要指令与操作数形式、条件语句、循环与 `switch` 如何被编译成跳转、过程调用如何使用栈，以及数组与结构体如何被访问。目标是读，而不是写：编译器写汇编比绝大多数人都好。处理器如何在硬件上实现这些指令——流水线、运算器、控制单元——属于计算机体系结构，在[电气电子工程图谱](/learn/ee/)中讲授。

**约定。** 体系结构为 x86-64，采用 Linux、macOS 与 BSD 使用的 System V ABI（Windows 使用另一种调用约定）。汇编代码以 **AT&T 语法**给出，这是 GNU 工具的默认语法，其中**目的操作数写在最后**（`movq %rsi, %rax` 把 `%rsi` 复制到 `%rax`）；Intel 的手册使用 Intel 语法，目的在前且不带 `%` 号。清单由 GCC 15.2 以 `gcc -std=c17 -Og -S -fno-asynchronous-unwind-tables -fcf-protection=none` 生成（最后两个选项抑制调试指示以及 Ubuntu 的 GCC 为控制流保护加入的 `endbr64` 指令），并删去了汇编器指示、由人工加上注释。`-Og` 会进行优化，但不会把代码改得面目全非。

## 机器的视角 {#sec-state}

**指令集体系结构**（instruction set architecture，ISA）是软件与硬件之间的契约：程序能看见的状态，以及改变这些状态的指令。x86-64 是 Intel x86 系列（始于 1978 年的 8086）的 64 位扩展，由 AMD 设计（1999–2000 年发布，2003 年出现首批处理器）。程序员可见的状态有：

- **程序计数器**，名为 `%rip`（instruction pointer，指令指针）：下一条指令的地址；
- 十六个 64 位**通用寄存器**：处理器内部速度极快的存储；
- **条件码**：描述最近一次算术或比较结果的单比特标志；
- 十六个（支持 AVX-512 时更多）**向量寄存器** `%xmm0`–`%xmm15`（更宽时为 `%ymm`、`%zmm`），它们也存放浮点值；
- **内存**：按字节编址的数组，即 [[computer-systems/c-programming#sec-regions]] 中的虚拟地址空间。

每个通用寄存器都可以按四种宽度使用。这些名字是历史遗留的：16 位的 8086 有 `ax`、`bx`、…，32 位的 80386 把它们扩展为 `eax`、…，x86-64 又加入了 `r` 形式并新增八个寄存器 `%r8`–`%r15`。

| 64 位 | 32 位 | 16 位 | 8 位 | 约定用途（System V ABI） |
|---|---|---|---|---|
| `%rax` | `%eax` | `%ax` | `%al` | 返回值 |
| `%rbx` | `%ebx` | `%bx` | `%bl` | 被调用者保存 |
| `%rcx` | `%ecx` | `%cx` | `%cl` | 第 4 个参数 |
| `%rdx` | `%edx` | `%dx` | `%dl` | 第 3 个参数 |
| `%rsi` | `%esi` | `%si` | `%sil` | 第 2 个参数 |
| `%rdi` | `%edi` | `%di` | `%dil` | 第 1 个参数 |
| `%rbp` | `%ebp` | `%bp` | `%bpl` | 被调用者保存（可选作帧指针） |
| `%rsp` | `%esp` | `%sp` | `%spl` | 栈指针 |
| `%r8` | `%r8d` | `%r8w` | `%r8b` | 第 5 个参数 |
| `%r9` | `%r9d` | `%r9w` | `%r9b` | 第 6 个参数 |
| `%r10`, `%r11` | `%r10d`, … | | | 调用者保存的临时寄存器 |
| `%r12`–`%r15` | `%r12d`, … | | | 被调用者保存 |

一条重要规则：写 32 位寄存器的指令**会把高 32 位置零**，而写 8 位或 16 位寄存器不改变其余各位。这就是编译器用 `movl $0, %eax`（5 字节）而不是 `movq $0, %rax`（7 字节）来清零整个 `%rax` 的原因。

指令被编码为 1 到 15 个字节。`objdump -d` 可以反汇编一个目标文件，把两者都显示出来：

```console
$ gcc -std=c17 -Og -fno-asynchronous-unwind-tables -fcf-protection=none -c mc.c
$ objdump -d mc.o
...
0000000000000072 <swapl>:
  72:	48 8b 07             	mov    (%rdi),%rax
  75:	48 8b 16             	mov    (%rsi),%rdx
  78:	48 89 17             	mov    %rdx,(%rdi)
  7b:	48 89 06             	mov    %rax,(%rsi)
  7e:	c3                   	ret
```

左边一列是文件中的偏移，中间是字节，右边是指令。（当寄存器已足以确定操作数大小时，`objdump` 会省略尺寸后缀 `q`。）

## 操作数与数据传送

多数指令带一个或两个操作数。操作数可以是**立即数**（一个常量，写作 `$-12` 或 `$0x1f`）、**寄存器**（`%rax`）或**内存引用**。

::: definition 内存操作数 {#def-operand}
一般的内存操作数 $D(R_b, R_i, s)$ 指的是从**有效地址**
$$
D + R[R_b] + R[R_i] \cdot s ,
$$
开始的若干字节，其中 $D$ 是一个常量**位移**（最多 32 位，带符号），$R_b$ 是**基址**寄存器，$R_i$ 是**变址**寄存器（除 `%rsp` 外的任何寄存器），**比例因子** $s \in \set{1, 2, 4, 8}$。各部分都可以省略：`(%rax)` 是 `%rax` 中的地址，`8(%rax)` 再加 8，`(%rax,%rcx,4)` 再加上 `%rcx` 的四倍，而光写 `0x601040` 是一个绝对地址。形式 `D(%rip)` 按相对当前指令的方式寻址内存，位置无关代码正是以此访问它的全局变量的（[[computer-systems/linking-loading]]）。
:::

比例因子 $1, 2, 4, 8$ 恰好是 C 基本类型的大小，所以当 `%rdi` 存放 `long *a`、`%rsi` 存放 `i` 时，`(%rdi,%rsi,8)` 就是 `a[i]` 的地址。

::: example 操作数的值 {#ex-operands}
设 `%rax` 中是 `0x100`，`%rcx` 中是 `0x1`，`%rdx` 中是 `0x3`，内存中存放的 8 字节值为：`0x100` 处 `0xff`，`0x108` 处 `0xab`，`0x110` 处 `0x13`，`0x118` 处 `0x11`。每个操作数各表示什么值：`%rax`、`0x108`、`$0x108`、`(%rax)`、`8(%rax)`、`13(%rax,%rdx)`、`0xfc(,%rcx,4)`、`(%rax,%rdx,8)`？
::: solution
| 操作数 | 类别 | 地址计算 | 值 |
|---|---|---|---|
| `%rax` | 寄存器 | — | `0x100` |
| `0x108` | 绝对内存 | `0x108` | `0xab` |
| `$0x108` | 立即数 | — | `0x108` |
| `(%rax)` | 内存 | `0x100` | `0xff` |
| `8(%rax)` | 内存 | `0x100 + 8 = 0x108` | `0xab` |
| `13(%rax,%rdx)` | 内存 | `13 + 0x100 + 3 = 0x110` | `0x13` |
| `0xfc(,%rcx,4)` | 内存 | `0xfc + 1 * 4 = 0x100` | `0xff` |
| `(%rax,%rdx,8)` | 内存 | `0x100 + 3 * 8 = 0x118` | `0x11` |

注意 `0x108`（该地址处内存的内容）与 `$0x108`（数本身）的区别，并注意 `13` 是十进制（$=$ `0xd`）。
:::
:::

### 数据传送

`mov` 家族把源操作数复制到目的操作数。后缀给出大小：`b`（字节，byte）、`w`（字，2 字节）、`l`（长字，4 字节）、`q`（四字，8 字节）——这套"字"的术语源自 16 位的 8086。至多允许一个操作数在内存中：要在内存与内存之间复制，得经过寄存器中转，上面的 `swapl` 正是这样做的。把较小的值送入较大的寄存器要用 `movz`（零扩展：`movzbl` 字节到长字）或 `movs`（符号扩展：`movslq` 长字到四字），即 [[computer-systems/bits-integers]] 的两条加宽规则；`cltq` 把 `%eax` 符号扩展进 `%rax`。

函数 `swapl` 就是 [[computer-systems/c-programming]] 中的指针交换：

```c
void swapl(long *xp, long *yp) {
    long t = *xp;
    *xp = *yp;
    *yp = t;
}
```

```text
swapl:                      # xp 在 %rdi，yp 在 %rsi
    movq    (%rdi), %rax    # t = *xp
    movq    (%rsi), %rdx    # tmp = *yp
    movq    %rdx, (%rdi)    # *xp = tmp
    movq    %rax, (%rsi)    # *yp = t
    ret
```

指针就是放在寄存器里的地址，解引用就是一个内存操作数，而局部变量 `t` 生活在寄存器中——大多数局部变量根本不会接触内存。

### 算术运算与 `lea`

| 指令 | 效果 | | 指令 | 效果 |
|---|---|---|---|---|
| `leaq S, D` | $D \gets \&S$ | | `incq D` / `decq D` | $D \gets D \pm 1$ |
| `addq S, D` | $D \gets D + S$ | | `negq D` | $D \gets -D$ |
| `subq S, D` | $D \gets D - S$ | | `notq D` | $D \gets \lnot D$ |
| `imulq S, D` | $D \gets D \times S$ | | `salq k, D` | $D \gets D \ll k$ |
| `xorq S, D` | $D \gets D \oplus S$ | | `sarq k, D` | $D \gets D \gg_A k$（算术） |
| `andq S, D` | $D \gets D \mathbin{\&} S$ | | `shrq k, D` | $D \gets D \gg_L k$（逻辑） |
| `orq S, D` | $D \gets D \mid S$ | | | |

注意 AT&T 语法中操作数的次序：`subq %rsi, %rax` 计算的是 `%rax - %rsi`。移位次数可以是立即数或寄存器 `%cl`。

**`lea`**（"取有效地址"）计算其内存操作数的地址并把*地址本身*存入目的操作数——不访问任何内存。由于地址具有 $D + b + i \cdot s$ 的形式，`lea` 是计算这类表达式的廉价手段，`scale` 计算 $x + 4y + 12z$ 用的正是这一招：`leaq (%rdi,%rsi,4)` 是 $x + 4y$，`leaq (%rdx,%rdx,2)` 是 $3z$，`leaq (%rax,%rdx,4)` 再加上 $4 \cdot 3z$。对 $12$ 的乘法变成了并入地址运算的两次加法。

完整的 128 位乘法与除法使用特殊形式：`imulq S` 与 `mulq S` 把 `%rax` 乘以 $S$，把 128 位乘积放入 `%rdx:%rax`；`idivq S` 把 128 位的 `%rdx:%rax` 除以 $S$，商留在 `%rax`、余数留在 `%rdx`（须先执行 `cqto`，把 `%rax` 符号扩展进 `%rdx`）。除法很慢（几十个时钟周期），这就是编译器把除以常数的除法替换成乘法与移位的原因。

## 控制

机器码里没有 `if`、`while` 或 `for`。它有算术运算附带设置的**条件码**，以及改变 `%rip` 的**跳转**。

::: definition 条件码 {#def-flags}
当一条算术或逻辑指令算出宽度为 $w$ 的结果 $t$ 后，处理器会设置四个单比特标志（除其他标志之外）：

- **CF**（进位标志）：运算在最高位产生了进位（减法时则是产生了借位）——无符号溢出；
- **ZF**（零标志）：$t = 0$；
- **SF**（符号标志）：$t$ 的最高位为 $1$——按补码看 $t$ 为负；
- **OF**（溢出标志）：发生了补码溢出。

`cmpq S, D` 像 `subq S, D` 那样设置标志，但不保存结果；`testq S, D` 像 `andq S, D` 那样设置标志（并把 CF 和 OF 清零）。`lea` 不改变标志。
:::

指令随后读取这些标志。**跳转** `jX label` 在条件 `X` 成立时转到 `label`，否则继续执行下一条指令；`jmp label` 总是跳转。`setX D` 把 $1$ 或 $0$ 写入一个 8 位寄存器，`cmovX S, D` 只在条件成立时才执行传送。`cmpq S, D`（它计算 $D - S$）之后可用的条件为：

| 后缀 | 在 `cmp S, D` 之后的含义 | 标志 |
|---|---|---|
| `e` / `z` | $D = S$ | ZF |
| `ne` / `nz` | $D \ne S$ | ¬ZF |
| `s` / `ns` | 结果为负 / 非负 | SF / ¬SF |
| `l` | $D < S$，有符号 | SF ⊕ OF |
| `le` | $D \le S$，有符号 | (SF ⊕ OF) ∨ ZF |
| `g` | $D > S$，有符号 | ¬(SF ⊕ OF) ∧ ¬ZF |
| `ge` | $D \ge S$，有符号 | ¬(SF ⊕ OF) |
| `b` | $D < S$，无符号（below，低于） | CF |
| `be` | $D \le S$，无符号 | CF ∨ ZF |
| `a` | $D > S$，无符号（above，高于） | ¬CF ∧ ¬ZF |
| `ae` | $D \ge S$，无符号 | ¬CF |

有符号与无符号比较是不同的——编译器按 C 类型挑选 `jl` 还是 `jb`，[[computer-systems/bits-integers]] 中 `-1 < 0u` 的意外就是这样传到机器上的。为什么"有符号小于"是 SF ⊕ OF 而不是只看 SF？

::: theorem 由标志位得到有符号比较 {#thm-sf-of}
设 $a$ 与 $b$ 是 $w$ 位补码整数，`cmp` 计算 $t = a -^t_w b$，把 SF 置为 $t$ 的符号位，并且仅当真实差 $a - b$ 落在 $[-2^{w-1}, 2^{w-1})$ 之外时把 OF 置为 $1$。则 $a < b$ 当且仅当 SF ⊕ OF $= 1$。
:::

::: proof
真实差满足 $-2^w < a - b < 2^w$，并且如同 [[computer-systems/bits-integers#thm-tadd]]，计算出的 $t$ 是模 $2^w$ 与 $a - b$ 同余、且落在 $[-2^{w-1}, 2^{w-1})$ 内的唯一值。若 OF $= 0$，则 $t = a - b$ 恰好成立，于是 $a < b \iff t < 0 \iff$ SF $= 1$，即 SF ⊕ OF $= 1$。若 OF $= 1$ 且 $a - b \ge 2^{w-1}$（此时 $a > b$），则 $t = a - b - 2^w \in [-2^{w-1}, 0)$ 为负，SF $= 1$，故 SF ⊕ OF $= 0$，正确地表示"不小于"。若 OF $= 1$ 且 $a - b < -2^{w-1}$（此时 $a < b$），则 $t = a - b + 2^w \in (0, 2^{w-1})$ 为正，SF $= 0$，故 SF ⊕ OF $= 1$，正确地表示"小于"。
:::

::: widget truthtable
formula: ~(s xor o)
compare: s <-> o
caption: 取 $s$ = SF、$o$ = OF，`jge`（有符号"大于等于"）的条件是 ¬(SF ⊕ OF)，即 [[#thm-sf-of]] 中 `jl` 条件的否定。真值表表明它与 SF = OF 相同：当符号标志说了实话（无溢出且非负）或撒了谎（溢出且为负）时跳转。不妨把 `(s xor o) | z` 与 `jle` 的条件对照试试。
:::

### 条件语句

对 `if (test) then-part else else-part` 最直接的翻译是：求值 test，不成立时跳过 then-part，并在 then-part 末尾跳过 else-part：

```c
long absdiff(long x, long y) {
    if (x < y)
        return y - x;
    else
        return x - y;
}
```

```text
absdiff:                    # x 在 %rdi，y 在 %rsi
    cmpq    %rsi, %rdi      # 比较 x 与 y（计算 x - y）
    jge     .L3             # 若 x >= y 转到 else 分支
    movq    %rsi, %rax      # then 分支：rax = y
    subq    %rdi, %rax      #            rax = y - x
    ret
.L3:
    movq    %rdi, %rax      # else 分支：rax = x
    subq    %rsi, %rax      #            rax = x - y
    ret
```

编译器把测试条件取反（`<` 变成 `jge`），让 then-part 紧跟在比较之后。在 `-O1` 下，GCC 改为把*两个*差都算出来，再用**条件传送**选出其一：

```text
absdiff:                    # gcc -O1
    movq    %rsi, %rdx
    subq    %rdi, %rdx      # rdx = y - x
    movq    %rdi, %rax
    subq    %rsi, %rax      # rax = x - y
    cmpq    %rsi, %rdi
    cmovl   %rdx, %rax      # 若 x < y 则 rax = rdx
    ret
```

为什么要做额外的工作？现代处理器是**流水线**的：它们在前面的指令远未完成时就开始执行后面的指令，因此遇到条件跳转时必须*猜*一个方向（**分支预测**），猜错了就把已做的工作作废。在近年的处理器上，一次预测错误的分支大约要损失 15–20 个周期（这是对当前硬件的观察，不是定律），而 `cmov` 永不预测错误。对短小、不可预测的条件语句，条件传送更快；对长分支、可预测的分支，或者有一支根本不能求值的情形（`p != NULL ? *p : 0`——即使结果会被丢弃，也不允许解引用空指针），则使用跳转。

::: quiz
对 `long x, y`，某编译器生成了 `cmpq %rsi, %rdi`（`x` 在 `%rdi`，`y` 在 `%rsi`）后跟 `ja .L5`。要使这是 `if (x > y) goto L5;` 的正确翻译，`x` 与 `y` 实际的 C 类型必须是什么？
- [ ] `long`
- [x] `unsigned long`
- [ ] 两者皆可；`ja` 与 `jg` 可以互换
- [ ] `double`
::: solution
`ja`（above，高于）检查的是 ¬CF ∧ ¬ZF，是一次*无符号*比较。对有符号的 `long`，编译器必须用 `jg`。二者在两操作数符号不同时结果不同：$x = -1$、$y = 0$ 时 `jg` 不跳转而 `ja` 跳转，因为 $-1$ 按无符号看是 $2^{64}-1$。双精度数用 `%xmm` 寄存器上的 `ucomisd` 比较，而不是 `cmpq`。
:::
:::

### 循环

循环变成一条条件向后跳转。GCC 在 `-Og` 下用**跳至中部**（jump-to-middle）方案编译 `for` 和 `while` 循环：

::: algorithm while 循环的跳至中部翻译 {#alg-jtm}
翻译 `while (test) body`：

```text
        jmp test
loop:
        body
test:
        t ← test
        if t goto loop
done:
```

`for (init; test; update) body` 循环先被改写成 `init; while (test) { body; update; }`。
:::

下面是 [[computer-systems/c-programming]] 中的数组求和：

```c
long sum(const long *a, long n) {
    long s = 0;
    for (long i = 0; i < n; i++)
        s += a[i];
    return s;
}
```

```text
sum:                        # a 在 %rdi，n 在 %rsi
    movl    $0, %eax        # i = 0（写 %eax 会清零整个 %rax）
    movl    $0, %edx        # s = 0
    jmp     .L6             # 跳转到条件测试
.L7:
    addq    (%rdi,%rax,8), %rdx   # s += a[i]：地址 a + 8*i
    addq    $1, %rax              # i++
.L6:
    cmpq    %rsi, %rax      # 比较 i 与 n
    jl      .L7             # 若 i < n 转到循环体
    movq    %rdx, %rax      # 返回 s
    ret
```

每次迭代执行一次条件跳转，就在循环底部。在 `-O1` 下 GCC 改用另一种**带守卫的 do**（guarded-do）形式——循环前先测试一次，然后是一个 `do`–`while`——并且把下标换成一个指针，每次迭代前进 8 字节，与 `a + n` 比较；这就是把下标计算自动做**强度削弱**（strength reduction）变成指针运算。**控制流图**把 `-Og` 代码的每一段顺序执行的指令变成一个基本块，每种可能的控制转移是一条边：

::: widget graph
nodes: entry@0,2; test@2,2; body@2,0; exit@4,2
edges: entry>test; test>body; body>test; test>exit
algorithm: dfs
start: entry
caption: `-Og` 下 `sum` 的控制流图：入口块跳到测试，测试要么进入循环体，要么落到出口，循环体又落到测试。从入口开始一步步看深度优先搜索。从 `body` 回到 `test` 的边到达了一个仍在 DFS 栈上的顶点——一条**后向边**——而在控制流图中，后向边正是编译器眼中循环的样子。优化器就是这样先找出循环，再把不变计算移出循环的。
:::

::: example 逆推一段循环 {#ex-reverse}
GCC 为函数 `long mystery(long x, long y)` 生成了这段代码。写出等价的 C。

```text
mystery:
    movl    $0, %eax
    jmp     .L2
.L3:
    movq    %rdi, %rdx
    andl    $1, %edx
    addq    %rdx, %rax
    sarq    %rdi
.L2:
    cmpq    %rsi, %rdi
    jg      .L3
    ret
```
::: solution
`x` 在 `%rdi`，`y` 在 `%rsi`，结果在 `%rax`，其初值为 $0$；记作 `r`。`jmp .L2` 跳到底部的测试，是 [[#alg-jtm]] 的跳至中部模式，所以这是一个 `while` 循环。测试 `cmpq %rsi, %rdi; jg .L3` 表示当 `x > y`（有符号）时继续。循环体把 `x` 复制到 `%rdx`，用掩码留下最低位（`andl $1, %edx`，因为是 32 位运算，同时也清零了 `%rdx` 的高半部分），加到 `r` 上，再把 `x` 算术右移一位（不带计数值的 `sarq` 移 $1$ 位）。于是：

```c
long mystery(long x, long y) {
    long r = 0;
    while (x > y) {
        r += x & 1;
        x >>= 1;
    }
    return r;
}
```

用相同的选项编译这段 C 能精确重现上面的清单。当 $y = 0$ 且 $x > 0$ 时，它统计 $x$ 的二进制表示中 $1$ 的个数。
:::
:::

分支稠密的 **`switch`** 语句被编译成**跳转表**：一个按 case 值索引的代码地址数组，由间接跳转 `jmp *.L4(,%rdi,8)` 使用，因此无论有多少个 case，选择 case 都只需常数时间。

## 过程

一次过程调用必须把控制权转移给被调用者再交还回来，传递参数和结果，并为被调用者的局部变量留出空间，且全程不能打搅调用者。x86-64 用**运行时栈**做到这一点：它是通过 `%rsp` 寻址的一块内存区域，向*更低*的地址增长。

- `pushq S` 把 `%rsp` 减 8，并把 $S$ 存到 `(%rsp)`；`popq D` 把 `(%rsp)` 载入 $D$，再把 `%rsp` 加 8。
- `call f` 压入下一条指令的地址（**返回地址**）并跳转到 `f`；`ret` 弹出一个地址并跳转到它。

::: definition System V 调用约定（x86-64） {#def-abi}
前六个整型或指针参数依次放在 `%rdi`、`%rsi`、`%rdx`、`%rcx`、`%r8` 和 `%r9` 中传递；更多的参数压入栈中。浮点参数放在 `%xmm0`–`%xmm7` 中。结果在 `%rax`（或 `%xmm0`）中返回。寄存器 `%rbx`、`%rbp` 和 `%r12`–`%r15` 是**被调用者保存**的：用到它们就必须恢复后再返回。其余寄存器都是**调用者保存**的：被调用者可以随意覆盖它们，调用后仍需要其值的调用者必须自己保存。执行 `call` 的时刻，`%rsp` 必须是 16 的倍数。
:::

每个进行中的调用有一个**栈帧**：栈上位于调用者栈帧与 `%rsp` 之间的区域，存放返回地址、保存的寄存器、无法留在寄存器中的局部变量（数组、被取地址的变量、被挤出的变量），以及第六个之后的栈上参数。许多简单函数——上面所有的那些——除了返回地址之外根本不需要栈帧。

递归不需要任何特殊机制。每次调用得到自己的栈帧：

```c
long rfact(long n) {
    if (n <= 1)
        return 1;
    return n * rfact(n - 1);
}
```

```text
rfact:                      # n 在 %rdi
    cmpq    $1, %rdi
    jle     .L10            # 若 n <= 1 转到基本情形
    pushq   %rbx            # 保存调用者的 %rbx（被调用者保存）
    movq    %rdi, %rbx      # 在调用期间把 n 保存在 %rbx 中
    leaq    -1(%rdi), %rdi  # 参数 n - 1
    call    rfact           # rax = rfact(n - 1)
    imulq   %rbx, %rax      # rax = n * rfact(n - 1)
    popq    %rbx            # 恢复调用者的 %rbx
    ret
.L10:
    movl    $1, %eax        # 基本情形：返回 1
    ret
```

递归调用返回后还要用 `n` 的值，但 `%rdi` 是调用者保存的，会被覆盖。于是这个函数把 `n` 放在被调用者保存的 `%rbx` 里——而 `%rbx` 属于*它自己的*调用者，所以它先压入旧值，返回前再弹出。调用约定让每个函数都能单独编译，却仍然能够协作。

::: example 跟踪栈的变化 {#ex-stack}
跟踪 `main` 对 `rfact(3)` 的调用，列出每次 `call` 与 `push` 之后的栈。假设 `main` 中执行 `call` 时 `%rsp` 为 `0x7fffffffe000`，`%rbx` 中是某个值 $B$。
::: solution
地址向下递减；每个栈槽 8 字节。

| 步骤 | 指令 | 之后的 `%rsp` | 新栈槽 | 寄存器 |
|---|---|---|---|---|
| 1 | `main` 中的 `call rfact` | `…dff8` | 返回到 `main` 的返回地址 | `%rdi` = 3 |
| 2 | `pushq %rbx` | `…dff0` | $B$ | `%rbx` = 3，`%rdi` = 2 |
| 3 | `call rfact` | `…dfe8` | 返回到 `rfact` 的返回地址（`imulq` 处） | |
| 4 | `pushq %rbx` | `…dfe0` | $3$ | `%rbx` = 2，`%rdi` = 1 |
| 5 | `call rfact` | `…dfd8` | 返回到 `rfact` 的返回地址 | |
| 6 | 基本情形，`ret` | `…dfe0` | 弹出栈槽 5 | `%rax` = 1 |
| 7 | `imulq`、`popq %rbx`、`ret` | `…dff0` | 弹出栈槽 4 和 3 | `%rax` = 2，`%rbx` = 3 |
| 8 | `imulq`、`popq %rbx`、`ret` | `…e000` | 弹出栈槽 2 和 1 | `%rax` = 6，`%rbx` = $B$ |

在最深处，栈上占了五个栈槽（40 字节）：每个非基本情形的调用花 16 字节，即返回地址加保存的 `%rbx`。返回 `main` 时，`%rsp` 与 `%rbx` 都恢复原值，正如调用约定所要求的那样，结果 $6$ 在 `%rax` 中。在 Linux 默认的 8 MiB 栈限制下，无界递归（缺少基本情形）大约五十万个这样的栈帧之后栈就耗尽，进程因段错误被杀死（[[computer-systems/exceptions-processes]]）。
:::
:::

## 内存中的数组、结构与栈

[[computer-systems/c-programming]] 的地址算术直接翻译成了操作数。对 `T a[n]`，元素 `a[i]` 位于地址 $x_a + i \cdot \text{sizeof}(T)$。二维数组 `T m[R][C]` 按**行优先顺序**存放——先第 $0$ 行全部，再第 $1$ 行全部——于是

$$
\&m[i][j] = x_m + \text{sizeof}(T)\,(C \cdot i + j) .
$$ {#eq-rowmajor}

```c
long get(long m[][3], long i, long j) {
    return m[i][j];
}
```

```text
get:                              # m 在 %rdi，i 在 %rsi，j 在 %rdx
    leaq    (%rsi,%rsi,2), %rax   # rax = 3i
    leaq    (%rdi,%rax,8), %rax   # rax = m + 8*(3i)：第 i 行的起点
    movq    (%rax,%rdx,8), %rax   # 从行起点 + 8j 处加载
    ret
```

列数 $3$ 必须在编译期已知（它就体现为乘 3 的那条 `leaq`），这就是 C 要求数组参数除第一维外各维都已知的缘故。结构体成员按相对结构体地址的固定偏移访问：对 `struct pt { int tag; long x; long y; }`，`p->y` 编译成 `movq 16(%rdi), %rax`，其中偏移由 [[computer-systems/c-programming#def-alignment]] 的对齐规则算出。

::: example 机器码中的结构体 {#ex-struct}
对 `struct item { char code; int qty; long price; short vals[3]; };`，GCC 生成了下面的代码。按 C 的规则推出结构体的布局，并把每个操作数与之对应起来。

```c
long total(const struct item *it) { return it->qty * it->price; }
short val(const struct item *it, long i) { return it->vals[i]; }
long nth_price(const struct item *items, long k) { return items[k].price; }
```

```text
total:
    movslq  4(%rdi), %rax         # 把 it->qty 符号扩展到 64 位
    imulq   8(%rdi), %rax         # 乘以 it->price
    ret
val:
    movzwl  16(%rdi,%rsi,2), %eax # 加载 it->vals[i]（2 字节）
    ret
nth_price:
    leaq    (%rsi,%rsi,2), %rax   # rax = 3k
    movq    8(%rdi,%rax,8), %rax  # 从 items + 24k + 8 处加载
    ret
```
::: solution
由 [[computer-systems/c-programming#def-alignment]]：`code` 在偏移 $0$；`qty`（对齐 4）在 $4$，前面有 3 字节填充；`price`（对齐 8）在 $8$；`vals`（对齐 2，三个元素）在 $16$–$21$。成员到 $22$ 结束，而结构体的对齐是 $8$，所以它的大小是 $24$。（`offsetof` 与 `sizeof` 打印 `4 8 16 24`。）

`total` 从 `4(%rdi)` 读 `qty`，并且由于 C 表达式是 `int` 乘 `long`，先用符号扩展（`movslq`）把它化成 `long`，再乘以 `8(%rdi)` 处的 `long`。`val` 把 `vals[i]` 寻址为 $16 + it + 2i$：位移是成员的偏移，比例因子是 `sizeof(short)`。它用零扩展加载（`movzwl`）；ABI 不保证 `short` 返回值的高位比特，所以需要一个 `int` 的调用者自己做符号扩展。`nth_price` 把 `items[k].price` 的地址算成 $items + 24k + 8$：元素大小 $24$ 拆成 `leaq` 乘 $3$ 加比例因子 $8$，成员偏移 $8$ 就是位移。每一次结构体与数组访问都归结为一个常量偏移加一个比例变址。
:::
:::

### 局部数组与栈保护

含有局部数组的函数必须在自己的栈帧里为它安排内存。下面这个函数安全地把名字格式化进一个 16 字节的缓冲区，用 `-fstack-protector-strong`（Ubuntu 默认）编译：

```c
#include <stdio.h>
#include <string.h>

/* 安全地把名字复制进一个局部缓冲区。 */
void greet(const char *name) {
    char buf[16];
    snprintf(buf, sizeof buf, "%s", name);
    puts(buf);
}
```

```text
greet:
    pushq   %rbx                  #（使 %rsp 在调用处保持 16 字节对齐）
    subq    $32, %rsp             # 分配 32 字节的栈帧
    movq    %rdi, %rcx            # snprintf 的第 4 个参数：name
    movq    %fs:40, %rax          # 载入保密的金丝雀值
    movq    %rax, 24(%rsp)        # 存到 buf 紧邻的上方
    xorl    %eax, %eax            # 从 %rax 中抹去金丝雀值（同时：可变参数调用要求 %al = 0）
    leaq    .LC0(%rip), %rdx      # 第 3 个参数：格式串 "%s"
    movl    $16, %esi             # 第 2 个参数：sizeof buf
    movq    %rsp, %rdi            # 第 1 个参数：buf，位于栈帧底部
    call    snprintf@PLT
    movq    %rsp, %rdi
    call    puts@PLT
    movq    24(%rsp), %rax        # 从栈帧重新载入金丝雀值
    subq    %fs:40, %rax          # 它变了吗？
    jne     .L4                   # 变了：栈帧被覆写
    addq    $32, %rsp             # 释放栈帧
    popq    %rbx
    ret
.L4:
    call    __stack_chk_fail@PLT  # 中止程序
```

缓冲区占据 `(%rsp)` 到 `15(%rsp)`。在它上方 `24(%rsp)` 处，编译器放了一个**金丝雀值**（canary）：程序启动时选定的随机值，保存在线程局部存储里（`%fs:40`）。再往上是保存的 `%rbx` 和返回地址。越过 `buf` 的末尾向高地址写出的写操作，必须先穿过金丝雀值才能碰到返回地址，而 `ret` 之前的检查会发现它被改动，于是中止程序而不会返回到一个被破坏的地址。这里 `snprintf` 本来就使溢出成为不可能；若是 `strcpy(buf, name)` 且 `name` 很长，站在一个缺陷与被劫持的返回之间的就是金丝雀值了。这就是 [[computer-systems/c-programming#sec-ub]] 中缓冲区溢出防线的机制：金丝雀值检测覆写，不可执行栈与地址空间布局随机化（ASLR）让被破坏的返回地址难以利用，影子栈则保存返回地址的受保护副本。

::: warning 金丝雀值不是边界检查
栈金丝雀值只能检测*连续的*、够得着返回地址的覆写，而且只在函数返回的那一刻检测。它检测不到跳过金丝雀值的写（例如 `buf[40] = x` 这样的越界下标）、对其他局部变量或对堆的覆写、泄露数据的越界*读*，以及在函数返回之前就被利用的破坏。缓解措施只是让利用变得更难；只有正确的代码——检查过的长度与下标，或一门内存安全的语言——才能根除缺陷。
:::

::: history
莫里斯·威尔克斯（Maurice Wilkes）的 EDSAC（1949）提出了用"带返回的跳转"来调用子程序库的思想；大卫·惠勒（David Wheeler）1952 年描述的子程序链接——"惠勒跳转"——是 `call` 与 `ret` 的祖先。把栈作为过程活动记录的安放处，随 Algol-60 的实现以及 Burroughs B5000（1961）这类机器而来。Intel 的 8086（1978）开启了 x86 血统；80386（1985）把它扩展到 32 位（IA-32）。1999–2000 年 AMD 发布了 x86-64 扩展，把寄存器加倍到十六个、加宽到 64 位，并于 2003 年随 Opteron 出货；Intel 于 2004 年跟进。固定这一调用约定的 x86-64 System V ABI 由 Jan Hubička、Andreas Jaeger、Michael Matz 与 Mark Mitchell 在 2000–2001 年起草，当时还根本没有 x86-64 硬件。
:::

## 后续内容

本章的机器码就是 [[compilers]] 课程生成的东西；寄存器分配、指令选择以及强度削弱这类优化都在那里研究。[[computer-systems/memory-hierarchy]] 解释为什么本章的内存操作数有时只需一个周期、有时要几百个周期；[[computer-systems/linking-loading]] 解释 `snprintf@PLT` 与 `.LC0(%rip)` 这样的标号后来怎么样了。`%fs` 段寄存器会在 [[parallel-computing]] 中重新登场，作为线程局部存储的锚点。处理器如何执行指令——流水线、分支预测、乱序执行——是计算机体系结构的内容，见[电气电子工程图谱](/learn/ee/)。

::: summary
- x86-64 的状态：`%rip`、十六个 64 位寄存器（各有 32、16、8 位的名字；写 32 位寄存器会清零高半部分）、条件码、向量寄存器与按字节编址的内存。AT&T 语法把目的操作数放在最后。
- 内存操作数 $D(R_b, R_i, s)$ 计算 $D + R_b + s \cdot R_i$，其中 $s \in \set{1,2,4,8}$（[[#def-operand]]）；`lea` 计算地址而不访问内存，兼职充当廉价算术。
- 算术运算设置 CF、ZF、SF 和 OF；`cmp`/`test` 设置它们但不保存结果；跳转、`set` 与 `cmov` 读取它们。有符号小于是 SF ⊕ OF（[[#thm-sf-of]]），无符号低于是 CF。
- `if` 编译成条件跳转或条件传送；循环编译成向后跳转（跳至中部或带守卫的 do，[[#alg-jtm]]）；稠密的 `switch` 编译成跳转表。
- 调用使用栈：`call` 压入返回地址，`ret` 弹出它。参数在 `%rdi, %rsi, %rdx, %rcx, %r8, %r9`，结果在 `%rax`；`%rbx, %rbp, %r12–%r15` 由被调用者保存（[[#def-abi]]）。
- 数组按行优先存放，用地址算术索引；结构体成员位于固定偏移。
- 局部缓冲区紧挨着保存的寄存器与返回地址；栈金丝雀值、W⊕X、ASLR 与影子栈能缓解溢出，但只有边界正确的代码才能根除它们。
:::

## 习题

::: exercise 操作数算术 {level=1 check="284"}
设 `%rdi` = `0x100`、`%rsi` = `0x3`，`0x10(%rdi,%rsi,4)` 算出的有效地址是多少？`leaq 0x10(%rdi,%rsi,4), %rax` 又在 `%rax` 中留下什么？（以十进制数输入该地址。）
::: solution
由 [[#def-operand]]，地址为 $0x10 + 0x100 + 3 \cdot 4 = 16 + 256 + 12 = 284$，即 `0x11c`。带这个操作数的 `movq` 会加载地址 `0x11c` 处的 8 个字节；`leaq` 存的是地址本身，所以 `%rax` 变成 `0x11c`，内存未被触动。
:::
:::

::: exercise lea 算的是什么？ {level=1 check="22"}
若 `%rdx` 中是 $x$，`leaq 7(%rdx,%rdx,4), %rax` 在 `%rax` 中放入什么？对 $x = 3$ 求值。（输入该值。）
::: solution
有效地址为 $7 + x + 4x = 5x + 7$，而 `lea` 不访问内存、直接把地址存入。$x = 3$ 时：$22$。编译器把它用于 `5 * x + 7` 这样的 C 代码。
:::
:::

::: exercise 哪些跳转会发生？ {level=1}
以 64 位值看 `%rdi` = $-1$、`%rsi` = $1$，在 `cmpq %rsi, %rdi` 之后，`je`、`jne`、`jl`、`jg`、`jb`、`ja` 中哪些会跳转？给出各标志的值。
::: solution
`cmp` 计算 $-1 - 1 = -2$。ZF $= 0$；SF $= 1$；没有有符号溢出，故 OF $= 0$。按无符号数看，减法为 $(2^{64} - 1) - 1$，不需要借位，故 CF $= 0$。于是 `jne` 跳转而 `je` 不跳；`jl`（SF ⊕ OF $= 1$）跳转而 `jg` 不跳，因为 $-1 < 1$；`jb`（CF）不跳转而 `ja`（¬CF ∧ ¬ZF）跳转，因为按无符号看 $2^{64} - 1 > 1$。
:::
:::

::: exercise 数组元素的地址 {level=2 check="1040"}
设 `int m[5][7]` 起始于地址 $1000$，`m[1][3]` 在什么地址？GCC 把 `int el(int m[5][7], long i, long j) { return m[i][j]; }` 编译成 `imulq $28, %rsi, %rsi; addq %rsi, %rdi; movl (%rdi,%rdx,4), %eax`。解释常数 $28$。（以十进制数输入 `m[1][3]` 的地址。）
::: solution
由 [[#eq-rowmajor]]，$\text{sizeof(int)} = 4$、$C = 7$：$1000 + 4(7 \cdot 1 + 3) = 1000 + 40 = 1040$。常数 $28 = 4 \cdot 7$ 是一行所占的字节数：代码先加上 $28i$ 到达第 $i$ 行，再以比例因子 $4$ 对行内元素寻址。
:::
:::

::: exercise 从汇编回到 C {level=2}
GCC 把函数 `long pick(long a, long b)` 编译成 `cmpq %rdi, %rsi; movq %rdi, %rax; cmovge %rsi, %rax; ret`。它计算什么？用 C 写出来。
::: solution
`cmpq %rdi, %rsi` 把 `b` 与 `a` 比较（计算 $b - a$）。`%rax` 先置为 `a`，若 $b \ge a$（有符号）则被 `b` 替换。所以它返回两者中较大的一个，相等时取 `b`：`long pick(long a, long b) { return a > b ? a : b; }`，这正是生成它的 C 代码。
:::
:::

::: exercise 栈的深度 {level=2 check="16"}
在上面编译好的 `rfact` 中，每个非基本情形的活动记录占用多少字节栈空间（它的 `call` 指令压入的与函数自己压入的都要算）？（输入字节数。）
::: solution
进入该活动记录的 `call` 压入 8 字节的返回地址，函数自己又压入 `%rbx`：共 $16$ 字节。基本情形只用它的 8 字节返回地址。所以 $n \ge 1$ 时 `rfact(n)` 在最深处用去 $16(n - 1) + 8$ 字节（$n = 3$ 时为 $40$ 字节，见 [[#ex-stack]]）。
:::
:::

::: exercise 跳至中部是正确的 {level=3}
证明 [[#alg-jtm]] 的代码执行 `body` 的次数与 `while (test) body` 完全相同，且经历相同的状态，这里假设 `test` 除了每次检查时求值一次之外没有别的作用。再证明带守卫的 do 翻译 `if (!test) goto done; loop: body; if (test) goto loop; done:` 也是等价的。
::: solution
用展开式定义 `while (test) body` 的语义：求值 `test`；若为假则停止；否则执行 `body` 并重复。跳至中部代码以 `jmp test` 开头，所以它先求值 `test`。若为假，落到 `done`；若为真，跳到 `loop`，执行 `body`，再落到 `test`。因此两个程序执行同一个交错的序列 test、body、test、body、…、test（假）——对迭代次数 $k$ 归纳：若 while 循环执行 $k$ 次迭代，则第 $(k+1)$ 次对 `test` 的求值是第一次为假的求值，而跳至中部代码恰好按相同次序执行同样的求值，并在同一处停止。对带守卫的 do：开头的 `if (!test) goto done` 完成第一次求值；此后每次 `body` 之后都有一次求值决定是否重复——还是同一个序列。带守卫的 do 在两个地方重复了测试代码，这花代码空间，但让编译器知道循环体至少执行一次，从而能够优化循环。
:::
:::

::: exercise 金丝雀值为何有效 {level=3}
在上面 `greet` 的栈帧中，从 `(%rsp)` 向上到返回地址，依次列出栈帧的内容。假设有一个带缺陷的版本用了 `strcpy(buf, name)`。说明金丝雀值检查能检测 `name` 的哪些长度、检测不了哪些，以及金丝雀值为什么必须保密且随机。
::: solution
从低到高：`buf` 在 `0(%rsp)`–`15(%rsp)`，`16`–`23` 是 8 个未用字节，金丝雀值在 `24`–`31`，保存的 `%rbx` 在 `32`–`39`，返回地址在 `40`–`47`（再往上是调用者的栈帧）。`strcpy` 从 `buf` 起向上写 `strlen(name) + 1` 个字节。至多 $16$ 字节（长度 $\le 15$ 的字符串）没有问题。长度 $16$ 到 $23$ 只覆写未用的填充：是个缺陷，但既没有碰到金丝雀值也没有碰到活跃数据，所以什么都检测不出来。glibc 特意让金丝雀值最低地址的字节为零，正是为了让字符串复制无法重建整个金丝雀值；长度为 $24$ 的字符串把它的终止符零字节写到那个零字节上，金丝雀值原封不动，同样检测不出。从长度 $25$ 起，一个非零字符落在金丝雀值的首字节上（更长的字符串会覆写更多），`ret` 之前的检查会中止程序。连续的覆写不可能在不经过金丝雀值的情况下到达偏移 40 处的返回地址。这个值必须随机且保密：攻击者若知道它，就能在覆写返回地址的同时把相同的值写回去。金丝雀值检测不到跳过它的写，也检测不到在函数返回之前就完成破坏的写，所以它只是几层防线中的一层。
:::
:::
