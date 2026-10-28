任何有点规模的程序都被拆分在许多源文件里，分别编译，再与别人写的库组合起来。当 `main.c` 调用定义在 `sum.c` 里的函数 `sum` 时，翻译 `main.c` 的编译器从没见过 `sum`，也完全不知道它最终会落在内存的什么地方。而当任何一个文件调用 `printf` 时，甚至根本没人编译 `printf`：它现成地躺在 C 库里，在典型的 Linux 系统上压根不会被复制进程序，而是由每一个运行中的进程**共享**，早已在内存之中。总得有个东西把名字的使用与定义连起来、把地址修好。这个东西就是**链接器**，运行时再由**加载器**和**动态链接器**相助。

链接在不出事的时候很容易被忽视，一旦出事，它的报错——`undefined reference to 'sum'`、`multiple definition of 'counter'`、`cannot open shared object file`——若没有对它所做之事的模型就令人摸不着头脑。理解链接还能解释 C 的作用域规则（`static` 与 `extern`）、为什么命令行上库的次序有讲究、共享库如何节省内存并能在不重编程序的情况下更新，以及 [[computer-systems/machine-code]] 汇编里那个神秘的 `@PLT` 是什么意思。

本章跟着一个小程序从目标文件走到运行中的进程。我们查看目标文件内部（ELF 格式），定义符号及解析它们的规则，走查重定位，构建静态库和共享库，并看看程序是如何被加载的。工具是 2026 年 x86-64 Linux 上的 GNU 工具链：GCC 15.2、GNU `ld` 2.46、glibc 2.43，以及检查工具 `nm`、`readelf` 和 `objdump`。本章的程序都用 `gcc -std=c17 -Wall -Wextra` 编译且不作优化，以便机器码紧贴源代码；Ubuntu 的 GCC 会在每个函数开头为控制流保护加上一条 `endbr64` 指令，可以不理它。

## 一个分成两个文件的程序

下面是贯穿全章的例子。一个头文件声明 `sum.c` 提供什么；每个 `.c` 文件都包含它。

```c
/* vec.h */
#ifndef VEC_H
#define VEC_H
int sum(const int *a, int n);   /* 声明：定义在 sum.c 中 */
extern int sum_calls;           /* 对定义在其他地方的全局变量的声明 */
#endif
```

```c
/* sum.c */
#include "vec.h"

int sum_calls = 0;              /* 全局变量，其他文件可见 */
static int last = 0;            /* 本文件专用 */

int sum(const int *a, int n) {
    int s = 0;
    for (int i = 0; i < n; i++)
        s += a[i];
    sum_calls++;
    last = s;
    return s;
}
```

```c
/* main.c */
#include <stdio.h>
#include "vec.h"

int data[3] = {1, 2, 3};        /* 在此定义，在此使用 */

int main(void) {
    int s = sum(data, 3);
    printf("sum = %d, calls = %d\n", s, sum_calls);
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -c main.c sum.c
$ gcc -o prog main.o sum.o
$ ./prog
sum = 6, calls = 1
```

第一条命令（`-c`：只编译）产生两个**可重定位目标文件**，`main.o` 和 `sum.o`。第二条运行链接器，把它们与 C 启动代码、C 库一起组合成一个**可执行目标文件** `prog`。（对 `sum` 的调用放在 `printf` 之前、单独一条语句里完成，因为 C 不规定函数参数的求值次序：`printf("%d %d", sum(data, 3), sum_calls)` 可能在调用之前就读了 `sum_calls`。）

**声明**与**定义**的区分是 C 分离编译模型的钥匙。声明告诉编译器某个名字存在、类型是什么（`int sum(const int *a, int n);`、`extern int sum_calls;`）；定义则创建函数或对象（`int sum_calls = 0;`，或带函数体的函数）。每个用到的名字必须在每个使用它的文件里声明——这就是头文件的用途——而每个真正用到的函数或全局变量在整个程序中必须恰好定义一次。

## 目标文件

在 Linux 上，三类目标文件——可重定位的（`.o`）、可执行的、共享的（`.so`）——都使用**可执行与可链接格式**（ELF）。一个 ELF 可重定位文件是一个文件头后跟若干**节**，每节是同一性质的一段字节：

| 节 | 内容 |
|---|---|
| `.text` | 本文件各函数的机器码 |
| `.rodata` | 只读数据：字符串字面量、`const` 表、跳转表 |
| `.data` | 已初始化的全局变量与 `static` 变量（`int data[3] = {1, 2, 3};`） |
| `.bss` | 零初始化的全局与静态变量；在文件中不占空间，只记一个大小 |
| `.symtab` | **符号表**：本文件定义与引用的名字 |
| `.rela.text` | **重定位表项**：`.text` 中地址一旦确定就必须改写的地方 |
| `.debug_*` | 调试信息（仅带 `-g` 时） |
| `.strtab` | 符号表使用的字符串（名字） |

`readelf -S main.o` 会把它们列出来。（".bss" 这个名字来自 1950 年代的 IBM 汇编器，"block started by symbol"；一个好记的说法是 "better save space"，因为它在文件里分文不花。）

### 符号

::: definition 符号 {#def-symbol}
**符号**是目标文件符号表中的一个名字，带有值（节内偏移，后来是地址）、大小、类型（函数或数据对象）和一个**绑定**：

- **全局**符号在本文件中定义、可被其他文件引用：非 `static` 的函数与全局变量；
- **外部**（未定义）符号被本文件引用、定义在别的某个文件里；
- **局部**符号在本文件中定义、只在本文件内可见：声明为 `static` 的函数与全局变量。

函数的局部变量（住在栈或寄存器里）根本不算符号。
:::

`nm` 打印符号表，每个符号一行，用一个字母表示它所在的节：`T` 表示 text，`D` 表示 data，`B` 表示 bss，`R` 表示只读数据，`U` 表示未定义；小写字母表示局部符号。

::: example 读符号表 {#ex-nm}
解释对两个目标文件运行 `nm` 的输出。

```console
$ nm main.o
0000000000000000 D data
0000000000000000 T main
                 U printf
                 U sum
                 U sum_calls
$ nm sum.o
0000000000000004 b last
0000000000000000 T sum
0000000000000000 B sum_calls
```
::: solution
`main.o` 定义了两个全局符号：`data`，`.data`（`D`）中偏移 $0$ 处一个已初始化的数组；`main`，`.text`（`T`）中的一个函数。它引用三个自己未定义的符号（`U`）：`printf`（来自 C 库），以及 `sum` 和 `sum_calls`，它只从 `vec.h` 的声明里认识这两个名字。`main` 的局部变量 `s` 没有出现在表里。

`sum.o` 定义了全局函数 `sum` 和全局变量 `sum_calls`；后者初始化为零，被放进 `.bss`（`B`）。变量 `last` 在文件作用域声明为 `static`，是一个*局部*符号（小写 `b`），位于 `.bss` 的偏移 $4$。另一个文件可以定义自己的 `static int last` 而不冲突，但无法引用这一个。把文件作用域中不属于本文件接口的每个函数和变量都标上 `static` 是好习惯：避免无意的名字冲突，并让编译器更放手地优化。
:::
:::

## 符号解析

链接器的头一项任务是**符号解析**：给每个对符号的引用配上恰好一个定义。

::: definition 解析规则 {#def-resolution}
对每个全局符号，链接器查看正在链接的所有目标文件中的定义：

1. 若恰有一个定义，每个引用都解析到它。
2. 若有多个普通（**强**）定义，链接失败，报 "multiple definition"。
3. **弱**定义（GCC 中用 `__attribute__((weak))` 声明）让位于强定义：若存在强定义就选它、忽略弱定义；否则在弱定义中任选一个。
4. 若某个被引用的符号在任何目标文件或库中都没有定义，链接失败，报 "undefined reference"。
:::

不带 `sum.o` 去链接 `main.o` 会触发规则 4：

```console
$ gcc -o prog main.o
/usr/bin/x86_64-linux-gnu-ld.bfd: main.o: in function `main':
main.c:(.text+0x1c): undefined reference to `sum'
/usr/bin/x86_64-linux-gnu-ld.bfd: main.c:(.text+0x25): undefined reference to `sum_calls'
collect2: error: ld returned 1 exit status
```

消息会点名每个未解析引用的位置（`main` 代码中的偏移 `0x1c` 和 `0x25`——这些偏移我们还会再见到）。再添加一个同样含 `int sum_calls = 5;` 的第三个文件会触发规则 2：

```console
$ gcc -o bad main.o sum.o dup.o
/usr/bin/x86_64-linux-gnu-ld.bfd: dup.o:(.data+0x0): multiple definition of `sum_calls'; sum.o:(.bss+0x0): first defined here
collect2: error: ld returned 1 exit status
```

::: warning 两个文件中的未初始化全局变量
直到 GCC 10（2020 年），在*两个*文件里都写 `int counter;` 这样的未初始化全局变量，会被悄悄地合并成一个变量（"公共符号"，名为例外、实为规则 3）。自 GCC 10 起默认是 `-fno-common`，同样的代码会因 "multiple definition of `counter`" 而失败。依赖旧行为的代码用近年的编译器编译就会坏。补救不是 `-fcommon` 而是正确的 C：变量只在一个 `.c` 文件里定义，在别处都包含的头文件里声明 `extern int counter;`。反过来，把头文件里写定义（在 `vec.h` 里写 `int counter = 0;`）是个迟早要爆的 bug：每个包含它的文件都定义这个符号。
:::

弱符号让库可以提供一个默认版本、供程序覆盖：

```c
#include <stdio.h>
/* 一个默认版本，其他目标文件可以替换它。 */
__attribute__((weak)) const char *greeting(void) { return "default"; }
int main(void) { printf("%s\n", greeting()); return 0; }
```

单独编译它打印 `default`；与一个含强定义 `const char *greeting(void) { return "custom"; }` 的文件一起链接，则打印 `custom`。

### 静态库

**静态库**（**归档文件**，`.a`）是由 `ar` 打成一包、附带索引的一组可重定位目标文件：

```console
$ ar rcs libvec.a sum.o
$ gcc -o p1 main.o -L. -lvec
$ ./p1
sum = 6, calls = 1
```

`-lvec` 的意思是"库 `libvec.a`（或 `libvec.so`）"，`-L.` 把当前目录加进搜索路径。关键在于，链接器不会把整个归档复制进程序，只取用得到的成员，而它判断"用得到"的依据是对命令行一次从左到右的扫描。

::: algorithm 对静态库做符号解析 {#alg-archive}
维护三个集合：$E$，要并入可执行文件的目标文件；$U$，已被引用但还没有定义的符号；$D$，迄今已定义的符号。最初三个集合都为空。对每个输入文件 $f$，沿命令行从左到右：

1. 若 $f$ 是目标文件，把它加入 $E$，并用它的定义和引用更新 $U$ 与 $D$。
2. 若 $f$ 是归档文件，反复执行直到没有变化：对每个定义了 $U$ 中某符号的成员 $m$，把 $m$ 加入 $E$，并用 $m$ 的定义与引用更新 $U$ 和 $D$。然后把 $f$ 中其余成员丢掉。

结束时，若 $U$ 非空，把其中每个符号报为未定义引用；若任何符号在 $E$ 中被（强）定义了两次，报多重定义。否则重定位并合并 $E$ 中的文件。
:::

::: example 跟踪归档扫描 {#ex-archive}
`libm2.a` 有两个成员：定义 `sum` 和 `sum_calls` 的 `vec.o`，以及定义 `mean`、引用 `sum` 的 `stats.o`。跟踪 `gcc main.o -L. -lm2` 上的 [[#alg-archive]]（忽略 C 库），其中 `main.o` 就是本章的那个文件。
::: solution
| 步骤 | 输入 | 动作 | 之后的 $U$ | 之后的 $D$ |
|---|---|---|---|---|
| 1 | `main.o` | 目标文件：加入 $E$ | `printf`、`sum`、`sum_calls` | `data`、`main` |
| 2 | `libm2.a`，第 1 遍 | `vec.o` 定义了 $U$ 中的 `sum`：加入它 | `printf` | `data`、`main`、`sum`、`sum_calls` |
| 3 | `libm2.a`，第 1 遍 | `stats.o` 未定义 $U$ 中的任何符号：跳过 | `printf` | （不变） |
| 4 | `libm2.a`，第 2 遍 | 没有成员能新增什么：停止 | `printf` | （不变） |

$E = \set{\texttt{main.o}, \texttt{vec.o}}$；`stats.o` 没有被链接进来，所以程序不会因从不调用的函数的代码而变大。`printf` 留在 $U$ 中，由 C 库解析，而 `gcc` 会自动把 C 库补在命令线的末尾。若 `main` 同时也调用了 `mean`，步骤 3 就会取走 `stats.o`；它对 `sum` 的引用此时已在 $D$ 里，所以步骤 4 的重扫不会再加任何东西。
:::
:::

一个直接后果是**次序有讲究**。把库放在需要它的目标文件之前，链接就会失败：

```console
$ gcc -o p2 -L. -lvec main.o
main.c:(.text+0x1c): undefined reference to `sum'
/usr/bin/x86_64-linux-gnu-ld.bfd: main.c:(.text+0x25): undefined reference to `sum_calls'
```

链接器走到 `libvec.a` 时，$U$ 还是空的，于是一个成员也没取；等 `main.o` 把 `sum` 加进 $U$ 时，归档已经被扫过去了。规则：库放在使用它的目标文件之后，依赖别的库的库放在被依赖者之前。当依赖关系构成有向无环图时，图的任何一个**拓扑序**都是正确的命令行。

::: widget graph
nodes: main.o@0,1; libparse.a@2,2; libnet.a@2,0; libutil.a@4,1; libc@6,1
edges: main.o>libparse.a; main.o>libnet.a; libparse.a>libutil.a; libnet.a>libutil.a; libutil.a>libc; libnet.a>libc
algorithm: topo
start: main.o
caption: 一次链接的各输入之间谁依赖谁：箭头 $X \to Y$ 表示 $X$ 引用 $Y$ 中定义的符号。一步步看拓扑排序。它可能产生的每一种次序——例如 `main.o -lparse -lnet -lutil -lc`——都把每个文件排在它所依赖的库之前，因而都是符合 [[#alg-archive]] 那次从左到右单次扫描的合法命令行。加一条环 `libutil.a>libparse.a`，拓扑序就不存在了：这时链接器需要把一个库列两遍（`-lparse -lutil -lparse`），或者使用 `--start-group … --end-group` 选项，它会对一组归档反复重扫直到再无变化。
:::

## 重定位

一旦每个引用都解析完毕，链接器就知道了每个名字指哪个定义，但机器码里仍然留着占位符。`main.c` 的编译器必须在不知道 `sum` 地址的情况下发出一条对它的 `call`；它填上零，再留下一张便条。这些便条就是**重定位表项**。

::: definition 重定位表项 {#def-relocation}
一个**重定位表项**记录节中的一个位置（其**偏移**）、一个符号 $S$、一个**加数** $A$（常量）和一个说明如何计算要存入之值的**类型**。x86-64 上最重要的两种类型是，其中 $P$ 是被改写位置的运行时地址：

- `R_X86_64_PC32`：存入 32 位的值 $S + A - P$——一个 PC 相对位移；
- `R_X86_64_64`：存入 64 位绝对地址 $S + A$。

`R_X86_64_PLT32` 的计算与 `PC32` 相同，但当符号位于共享库中时（见下文），$S$ 是该符号的过程链接表表项的地址；否则是符号自身的地址。
:::

`objdump -dr` 会把 `main.o` 的代码与其重定位表项交错显示：

```console
$ objdump -dr --no-show-raw-insn main.o
0000000000000000 <main>:
   0:	endbr64
   4:	push   %rbp
   5:	mov    %rsp,%rbp
   8:	sub    $0x10,%rsp
   c:	lea    0x0(%rip),%rax        # 13 <main+0x13>
			f: R_X86_64_PC32	data-0x4
  13:	mov    $0x3,%esi
  18:	mov    %rax,%rdi
  1b:	call   20 <main+0x20>
			1c: R_X86_64_PLT32	sum-0x4
  20:	mov    %eax,-0x4(%rbp)
  23:	mov    0x0(%rip),%edx        # 29 <main+0x29>
			25: R_X86_64_PC32	sum_calls-0x4
  ...
  3d:	call   42 <main+0x42>
			3e: R_X86_64_PLT32	printf-0x4
```

每条提及全局量的指令都有一个零占位符和一条表项：偏移 `0xf` 处的 4 个字节必须变成到 `data` 的位移，`0x1c` 处的 4 个字节变成到 `sum` 的位移，如此如此——正是"undefined reference"消息里出现的那些偏移。为什么加数是 $-4$？x86-64 计算 `%rip` 相对地址和调用目标时以指令的*末尾*为基准，而每种情形下被改写的 4 字节字段都是所在指令的最后部分。所以指令末尾在 $P + 4$，需要的位移是 $S - (P + 4) = S + A - P$，其中 $A = -4$。

::: theorem PC 相对重定位是正确的 {#thm-pcrel}
设一条指令结束于地址 $P + 4$，其 32 位位移字段位于 $P$，硬件按（下一条指令的地址）$+$ 位移计算目标，链接器存入 $S + A - P$ 且 $A = -4$。则该指令指向 $S$。而且，若整个映像（代码与数据一起）平移任意偏移 $\Delta$，存入的位移仍然指向平移后的 $S$，于是改写后的代码是**位置无关**的。
:::

::: proof
目标是 $(P + 4) + (S - 4 - P) = S$。若指令与其目标都平移 $\Delta$，硬件算出的新目标是 $(P + \Delta + 4) + (S - 4 - P) = S + \Delta$，正是符号的新地址。（这里假设位移能装进 32 位；当代码与数据彼此相距不超过 $\pm 2$ GiB 时这一点成立——默认的"小代码模型"。）
:::

::: example 重定位一次调用 {#ex-reloc}
链接之后，`objdump -d prog` 显示

```text
0000000000001149 <main>:
    ...
    1155:	48 8d 05 b4 2e 00 00 	lea    0x2eb4(%rip),%rax        # 4010 <data>
    ...
    1164:	e8 29 00 00 00       	call   1192 <sum>
```

而 `nm prog` 给出 `data` 在 `0x4010`、`sum` 在 `0x1192`。按 [[#def-relocation]] 核对这两个位移。
::: solution
`main` 被放在 `0x1149`，所以 `main.o` 中偏移 `0x1c` 的位置现在位于 $P = \text{0x1149} + \text{0x1c} = \text{0x1165}$，即这条 `call` 的 `e8` 操作码之后的那个字节。存入的值是 $S + A - P = \text{0x1192} - 4 - \text{0x1165} = \text{0x29}$，而 `e8` 之后的字节确实是 `29 00 00 00`（小端序）。处理器把目标算成下一条指令的地址 `0x1169` 加上 `0x29`：`0x1192`，正是 `sum` 的地址。

那条 `lea` 原本在偏移 `0xc`，现在是 `0x1155`，其位移字段（`main.o` 中的偏移 `0xf`）位于 $P = \text{0x1158}$。值为 $\text{0x4010} - 4 - \text{0x1158} = \text{0x2eb4}$，与字节 `b4 2e 00 00` 相符；硬件把它加到下一条指令的地址 `0x115c` 上，得 `0x4010`。注意编译器给这条对 `sum` 的 `call` 发的是 `PLT32` 重定位，但由于 `sum` 最终被证实定义在程序自身之内，链接器让它直接指向了 `sum`。
:::
:::

::: quiz
为什么编译器要为 `main.c` 里的 `data` 发一条重定位表项，尽管 `data` 就定义在同一个文件里？
- [x] 因为 `data` 在 `.data`、代码在 `.text`，而两个节彼此相对落在哪里只有链接器说了算。
- [ ] 因为全局变量总是通过一张地址表来访问的。
- [ ] 因为另一个文件可能含有会替换本定义的 `data` 强定义。
- [ ] 这是不作优化的编译的低效之处；用 `-O2` 重定位就消失了。
::: solution
链接器把所有输入的 `.text` 节合并成一个，`.data` 节也同样如此，然后才分配地址，所以编译器不可能知道从 `main` 里那条 `lea` 到 `data` 的距离。可执行文件的全局变量*不是*通过地址表访问的（GOT 是给共享库中的符号用的）；`data` 的第二个强定义是链接错误而不是替换；而且在任何优化级别下这条重定位都是必需的。
:::
:::

## 可执行文件与加载

链接器把 $E$ 中所有文件的节合并——所有 `.text` 节并成一个 `.text`，其余类推——分配运行时地址，应用重定位，然后写出一个**可执行目标文件**。除了节（供工具使用）之外，可执行文件还有一张**程序头表**，描述**段**——加载器必须映射进内存的各个分块：

```console
$ readelf -lW prog
...
  Type           Offset   VirtAddr           PhysAddr           FileSiz  MemSiz   Flg Align
  INTERP         0x000374 0x0000000000000374 0x0000000000000374 0x00001c 0x00001c R   0x1
  LOAD           0x000000 0x0000000000000000 0x0000000000000000 0x000608 0x000608 R   0x1000
  LOAD           0x001000 0x0000000000001000 0x0000000000001000 0x000201 0x000201 R E 0x1000
  LOAD           0x002000 0x0000000000002000 0x0000000000002000 0x000178 0x000178 R   0x1000
  LOAD           0x002db8 0x0000000000003db8 0x0000000000003db8 0x000264 0x000270 RW  0x1000
```

每个 `LOAD` 段是文件中要按给定权限映射到某个虚拟地址的一段范围，按 4 KiB 页对齐（[[computer-systems/memory-hierarchy]]）：文件头（只读）、代码（可读可执行，`R E`）、只读数据，以及可读可写数据——后者的内存大小比文件大小多出 `.bss` 的部分，由加载器填零。代码永不可写，数据永不可执行：[[computer-systems/c-programming#sec-ub]] 的 W⊕X 策略由此开始。

地址从 $0$ 开始，是因为 `prog` 是一个**位置无关可执行文件**（PIE），这是现代 Linux 发行版的默认：它的所有代码都使用 PC 相对寻址，所以按 [[#thm-pcrel]]，内核可以在每次运行时把它加载到一个随机的基地址上，正如地址空间布局随机化所要求的。这就是为什么在 [[computer-systems/c-programming]] 中打印的地址每次运行都在变。

要运行一个程序，shell 请求内核 `execve` 它（[[computer-systems/exceptions-processes]]）。内核的**加载器**读取程序头，创建一个新的地址空间，映射各段，设置一个装有命令行参数与环境变量的栈，并且——因为 `INTERP` 段点名了 `/lib64/ld-linux-x86-64.so.2`——先运行**动态链接器**，由它加载程序所需的共享库。然后控制权交给程序的**入口点**：来自 C 库 `crt1.o` 的启动例行程序 `_start`，它调用 `__libc_start_main`，后者初始化库并调用 `main`，最后把 `main` 的返回值交给 `exit`。

## 共享库

静态库有两个毛病。每个使用 `printf` 的程序都自带一份拷贝，浪费磁盘和内存：静态链接（`gcc -static`）后，我们这个小小程序从 16 KB 膨胀到约 800 KB。而库修了一个 bug，就意味着每个程序都要重新链接。**共享库**（共享目标文件，`.so`；Windows 上是 DLL）两病同治：库在**加载时**、甚至**运行时**才链接进程序，其在物理内存中的一份代码被映射进每个使用它的进程。

```console
$ gcc -std=c17 -Wall -Wextra -fPIC -shared -o libvec.so sum.c
$ gcc -std=c17 -Wall -Wextra -o p3 main.c -L. -lvec
$ ./p3
./p3: error while loading shared libraries: libvec.so: cannot open shared object file: No such file or directory
$ LD_LIBRARY_PATH=. ./p3
sum = 6, calls = 1
$ LD_LIBRARY_PATH=. ldd p3
	linux-vdso.so.1
	libvec.so => ./libvec.so
	libc.so.6 => /usr/lib/x86_64-linux-gnu/libc.so.6
	/lib64/ld-linux-x86-64.so.2
```

（`ldd` 输出中的地址已删去。）链接时，链接器只是检查 `libvec.so` 定义了 `sum` 和 `sum_calls`，并记下一条依赖（`readelf -d p3` 显示 `NEEDED: libvec.so`）。加载时，动态链接器必须*找到*这个库：依次搜索 `LD_LIBRARY_PATH` 中的目录、可执行文件中记录的运行路径（`-Wl,-rpath,…`），以及 `/etc/ld.so.cache` 列出的系统目录——但不包括当前目录，这就是第一个错误的由来。真正的库以带版本号的名字（`libc.so.6`）安装在系统目录里：这个数字称为 **soname**，只有当库的接口发生不兼容变化时才会改变，因此一次修复版发布只需替换文件，每个程序下次启动时都会用上它。

::: example 构建与使用共享库 {#ex-shared}
解释为什么 `sum.c` 必须用 `-fPIC` 编译，以及 `p3` 如何能在一个运行之前都不知道是什么的地址找到 `sum`。
::: solution
共享库在每个进程中被映射到不同的地址（也必须如此，为了 ASLR，也因为不同程序加载的库集合不同）。它的代码页在各进程之间共享，所以动态链接器绝不能改写这些页：被改写过的代码会因进程而异，就再也不能共享了。**位置无关代码**（`-fPIC`）彻底避免改写代码。库内部的引用用 PC 相对寻址，加载到哪里都对（[[#thm-pcrel]]）。对可能住在*另一个*模块中的符号的引用——或者说，在库里可能对那些可能被别的模块覆盖的符号的引用——要经过一张**全局偏移表**（GOT）：一张位于库的可写数据段中、与代码相距固定偏移的地址表，动态链接器在加载时把它填好。代码用一条 PC 相对加载从 GOT 读出地址，然后使用它。

在 `p3` 中，对 `sum` 的调用经过**过程链接表**（PLT）：每个外部函数一小段桩：

```text
0000000000001070 <sum@plt>:
    1070:	f3 0f 1e fa          	endbr64
    1074:	ff 25 56 2f 00 00    	jmp    *0x2f56(%rip)        # 3fd0 <sum>
```

`main` 调用 `sum@plt`（`call 1070 <sum@plt>`），桩经由 `0x3fd0` 处的 GOT 表项间接跳转，而该表项已被动态链接器填成 `sum` 在 `libvec.so` 中的运行时地址。各进程之间有差异的只有 GOT——它在私有的可写页里；程序和库的代码都保持共享。
:::
:::

传统上，函数的 GOT 表项是**惰性**填充的：起初每个表项都指回动态链接器，由它在第一次调用时解析符号、然后改写表项，于是启动不会为从不调用的函数付钱。Ubuntu 与其他一些发行版现在默认采用**立即绑定**（`readelf -d p3` 显示 `FLAGS BIND_NOW`）：所有表项在启动时解析完毕，随后把 GOT 设为只读（**RELRO**），这样内存破坏缺陷就无法通过改写它来改变调用的去向。

程序也可以在运行中用 `<dlfcn.h>` 里的 `dlopen("libplugin.so", RTLD_NOW)` 和 `dlsym(handle, "name")` 加载库：插件系统、语言运行时和 Python 的扩展模块就是这样工作的。

::: application 符号插入
由于共享库中的符号在加载时按名字解析，动态链接器允许先加载的库对后加载库的符号进行**插入**（interposition）。设置 `LD_PRELOAD=./libtrace.so` 会让某个库先于所有其他库加载，于是它定义的 `malloc` 会取代 C 库的那一个。调试与剖析工具借此在不重编译的情况下统计分配或跟踪调用（一个小例子：一个 `malloc` 包装函数，统计调用次数并用 `dlsym(RTLD_NEXT, "malloc")` 找到真正的 `malloc` 转调过去）。同一机制也是一个安全考量：动态链接器对 set-user-ID 程序忽略 `LD_PRELOAD` 与 `LD_LIBRARY_PATH`，因为这类程序的特权不能取决于启动它的用户的环境；而程序库搜索路径上一个可写的目录就是一处漏洞。
:::

::: history
剑桥的 EDSAC 团队——莫里斯·威尔克斯（Maurice Wilkes）、大卫·惠勒（David Wheeler）与 Stanley Gill——把子程序库存放在纸带上，用读入时调整地址的"initial orders"（预排例行程序）把它们装载进来；他们 1951 年的著作《The Preparation of Programs for an Electronic Digital Computer》是第一本程序设计教科书，书中描述了重定位加载器的祖先。Multics（1965 年起设计）引入了命名段的首次引用时动态链接。Unix 使用简单的 `a.out` 目标格式；AT&T 的 System V Release 4（1988–89 年）引入了 ELF 和现代形态的共享库，其先例是 SunOS 4（1988 年），后者的共享库由 Robert Gingell 及其同事们于 1987 年描述。Linux 在 1990 年代中期从 `a.out` 转向 ELF。John Levine 的《Linkers and Loaders》（2000）至今仍是该领域的标准著作。
:::

## 后续内容

链接与后续许多主题相连。编译器的一侧——发出可重定位代码与调试信息——是 [[compilers]] 的一部分，**链接时优化**（`-flto`）也是：链接器回调编译器，跨文件做优化。加载器构建地址空间的工作在 [[computer-systems/exceptions-processes]] 的 `fork` 与 `execve` 中继续，[[operating-systems]] 则会展示共享库如何借虚拟内存共享物理页。包管理器、符号版本控制与应用二进制接口（ABI）稳定性属于 [[software-engineering]]。

::: summary
- 分离编译产生**可重定位目标文件**；**链接器**把它们与库组合成可执行文件，其间完成**符号解析**与**重定位**。Linux 上三类目标文件都用 ELF。
- 节：`.text` 代码，`.rodata` 常量，`.data` 已初始化全局量，`.bss` 零初始化全局量（不占文件空间），`.symtab` 符号，`.rela.*` 重定位。
- 全局符号对其他文件可见，`static` 的是局部的；声明放头文件，每个定义恰好在一个 `.c` 文件里。强定义重复与定义缺失都是链接错误；弱定义让位于强定义（[[#def-resolution]]）。
- 静态归档只从左到右扫一遍（[[#alg-archive]]）：把库列在使用它们的文件之后，并按其依赖关系的拓扑序排列。
- 重定位表项修补占位符；PC 相对重定位存入 $S + A - P$，产出位置无关代码（[[#thm-pcrel]]）。
- 加载器以 W⊕X 权限把各段映射到随机化的基地址上（PIE、ASLR），并从 `_start` 开始执行，`_start` 最终调用 `main`。
- 共享库在加载时或运行时链接；位置无关代码经 GOT 与 PLT 触及外部符号，代码页因此得以共享；带 RELRO 的立即绑定如今是常见的默认设置。
:::

## 习题

::: exercise 符号的分类 {level=1}
对下面这个文件，说出哪些名字会出现在它的符号表中、各自的绑定（全局、外部还是局部）和所在的节。

```c
static double rate = 1.5;
int total;
extern int limit;
static void helper(void) {}
int compute(int x) { int y = x * 2; helper(); return y + limit + total; }
```
::: solution
`rate`：局部，`.data`（已初始化，`static`）。`total`：全局，`.bss`（未初始化的全局变量；在 `-fno-common`——自 GCC 10 起的默认——下，它是 `.bss` 中的一个普通定义）。`limit`：外部（未定义，`U`）——在此声明但未定义。`helper`：局部，`.text`，除非编译器把它内联后删掉（开了优化它可能彻底消失，因为文件外没有东西能调用它）。`compute`：全局，`.text`。`x` 与 `y` 不是符号：它们住在寄存器或栈里。
:::
:::

::: exercise 一次调用的位移 {level=1 check="219"}
一条 5 字节的 `call` 指令（操作码 `e8` 后跟 32 位位移）起始于地址 `0x401020`，其目标函数在 `0x401100`。链接器存入的位移是多少？（以十进制输入。）
::: solution
位移字段始于 $P = \text{0x401021}$，取 $A = -4$，值为 $S + A - P = \text{0x401100} - 4 - \text{0x401021} = \text{0x401100} - \text{0x401025} = \text{0xdb} = 219$。等价地说：目标地址减去下一条指令的地址。
:::
:::

::: exercise 命令行的次序 {level=1}
`main.o` 调用定义在 `libparse.a` 中的 `parse`，`parse` 又调用定义在 `libutil.a` 中的 `log_msg`。下面哪些命令能链接成功？(a) `gcc main.o -lparse -lutil` (b) `gcc main.o -lutil -lparse` (c) `gcc -lparse -lutil main.o` (d) `gcc main.o -lutil -lparse -lutil`。假设同时给了 `-L.`。
::: solution
套用 [[#alg-archive]]。(a) 成功：`main.o` 之后 $U = \set{\texttt{parse}}$；`libparse.a` 提供 `parse` 并把 `log_msg` 加入 $U$；`libutil.a` 再提供它。(b) 失败：扫到 `libutil.a` 时，$U = \set{\texttt{parse}}$ 里没有它定义的东西；随后 `libparse.a` 加入 `log_msg`，其后没有库了："undefined reference to `log_msg`"。(c) 失败：两个归档都是在 $U$ 为空时扫的，`main.o` 之后 `parse` 仍未定义。(d) 成功：第二个 `-lutil` 解析了 `log_msg`。
:::
:::

::: exercise static 与 extern {level=2}
文件 `a.c` 含 `static int count = 0; void inc(void) { count++; }`，文件 `b.c` 含 `int count = 10; void inc(void); int main(void) { inc(); inc(); printf("%d\n", count); }`（并含 `<stdio.h>`）。它能链接吗？打印什么？如果去掉 `static` 呢？
::: solution
有 `static` 时，`a.c` 的 `count` 是局部符号，`b.c` 看不见；`b.c` 的全局 `count` 是另一个变量。没有冲突，程序能链接，`inc` 把 `a.c` 的私有计数器加二，`main` 打印 `b.c` 的 `count`：`10`。去掉 `static` 后，两个文件都强定义了全局 `count`，链接失败，报 "multiple definition of `count`"（[[#def-resolution]]，规则 2）。
:::
:::

::: exercise 数重定位表项 {level=2 check="4"}
`gcc -c`（不作优化）对下面这个文件会在 `.rela.text` 中产生多少条重定位表项？（数表项条数，不是不同符号的个数。）

```c
extern int x;
int y;
int f(void);
int g(void) { return f() + x + y + f(); }
```
::: solution
每个地址无法由编译器确定的符号的引用需要一条表项：两次对 `f` 的调用（两条 `R_X86_64_PLT32`，每条 call 指令一条）、一次对 `x` 的加载和一次对 `y` 的加载（`R_X86_64_PC32`）。共 $4$ 条。`y` 虽然定义在本文件，但在 `.bss` 中，而 `.bss` 相对于 `.text` 的位置只有链接器才定得下来（可对照前面那道选择题）。对目标文件运行 `readelf -r` 恰好能看到这四条。（用某些编译器或选项，对外的 `x` 会经 GOT 访问，代之以一条 `R_X86_64_GOTPCRELX` 表项；总数相同。）
:::
:::

::: exercise 一个循环依赖 {level=2}
`libparse.a` 调用 `libutil.a` 中的 `log_msg`，而 `log_msg` 又反过来调用 `libparse.a` 中的 `format_ast`，`format_ast` 与 `parse` 不在同一个成员里。证明 `gcc main.o -lparse -lutil` 会失败，并给出两种补救办法。
::: solution
`main.o` 之后 $U = \set{\texttt{parse}}$。扫 `libparse.a` 时取走定义 `parse` 的成员，它加入 `log_msg`；没有其他成员定义 $U$ 中的符号，`libparse.a` 的扫描到此结束。扫 `libutil.a` 时取走 `log_msg` 所在的成员，它把 `format_ast` 加入 $U$。后面没有东西了，于是 `format_ast` 未定义。补救：把库重列一遍，`gcc main.o -lparse -lutil -lparse`；或使用 `gcc main.o -Wl,--start-group -lparse -lutil -Wl,--end-group`，它会对这一组反复重扫直到 $U$ 不再变化。更好的补救是从结构上解决：挪走 `format_ast` 或 `log_msg` 以消除环，因为互相依赖的两个库实际上就是一个库。
:::
:::

::: exercise 实现一个可被覆盖的钩子 {level=3}
设计一个小小的"库"文件 `hook.c`，它每处理一个事件就调用一次 `on_event(int)`，并提供一个打印 `event N` 的默认实现，使得应用程序只需在自己的文件里定义自己的 `on_event` 就能替换默认实现。写出这两个文件和命令，并说明是哪条解析规则使它成立。如果应用程序的两个文件都定义了 `on_event` 会怎样？
::: solution
```c
/* hook.c */
#include <stdio.h>

__attribute__((weak)) void on_event(int n) { printf("event %d\n", n); }

void process(int count) {
    for (int i = 1; i <= count; i++)
        on_event(i);
}
```

```c
/* app.c */
#include <stdio.h>
void process(int count);
void on_event(int n) { printf("app saw %d\n", n * 10); }   /* 强定义 */
int main(void) { process(2); return 0; }
```

```console
$ gcc -std=c17 -Wall -Wextra -o app app.c hook.c && ./app
app saw 10
app saw 20
```

若没有 `app.c` 的定义（比如某个不定义 `on_event` 的 `main`），就会用弱默认实现，打印 `event 1`、`event 2`。起作用的是 [[#def-resolution]] 的规则 3：强定义压倒弱定义。应用程序里的两个强定义仍然是错误（规则 2）。注意：若把 `hook.c` 放进*静态库*，它的成员反正会因 `process` 被取进来，`app.o` 中的强定义会赢；但若默认实现独自住在自己的成员里，只有当 `on_event` 在那个时刻仍未定义时它才会被链接进来。弱符号是 GCC/ELF 的扩展，不是 ISO C。
:::
:::

::: exercise 为什么位置无关代码可以共享 {level=3}
精确解释：为什么一个*不带* `-fPIC` 编译的共享库（对它的全局变量使用 64 位绝对地址，`R_X86_64_64` 重定位）会迫使每个进程持有该库代码页的私有副本，而 GOT 如何避免这一点。用到 [[#thm-pcrel]]。
::: solution
代码中的一条 `R_X86_64_64` 重定位存入变量的绝对地址 $S + A$。库在每个进程中以不同的基址 $L$ 加载，$S = L + s$，其中 $s$ 是变量在库内的偏移，于是存入的值 $L + s + A$ 在各进程之间不同。动态链接器就必须在每个进程里向代码写入不同的字节；而写过一页就对该进程私有（写时复制，[[operating-systems]]），于是每个进程最终都对每个含这种重定位的代码页持有一份自己的拷贝，共享带来的内存节省荡然无存。（现代链接器在 x86-64 上会拒绝构建这样的库，或者警告它们制造了"代码段重定位"（text relocations）。）

采用 PIC 后，代码用 PC 相对位移访问自己的函数与数据，按 [[#thm-pcrel]] 这些位移对任何加载地址都相同；对可能定义在别处的符号则经 GOT 表项访问，表项同样处在固定的 PC 相对距离上。依赖 $L$（或依赖其他库的基址）的值只有 GOT 表项本身，而它们住在库的数据段里——那里装着库的可写全局量，本来就对每个进程私有。所以代码页在每个进程中逐字节相同，可以从同一块物理内存映射。
:::
:::
