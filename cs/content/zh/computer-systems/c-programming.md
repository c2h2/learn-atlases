Python 让你忘记数据住在何处。列表在追加时变长，整数永不溢出，越过列表末尾的下标会抛出 `IndexError`。C 不做任何这些保证。C 的数组是固定地址上一段固定长度的字节；读越界就读到碰巧在那里的任何东西；而这样做的程序不只是错了，还是*无意义的*——其确切含义我们马上就会定义。既然如此，为什么 C 仍然是操作系统内核、语言运行时（包括 Python 自身的参考实现）、数据库、网络协议栈和嵌入式固件所用的语言？

因为 C 把机器暴露出来。一个 C 程序确切地说明它的数据如何在内存中排布、何时取得内存、何时归还内存，并且编译成几乎没有隐藏机制的机器码。这使 C 成为研究程序究竟如何运行——本课程的主题——的天然语言，也是编写那些供其他一切软件赖以运行的软件的天然语言。

本章教到足以支撑 [[computer-systems]] 其余内容的 C：编译模型、类型及其大小、指针与指针算术、数组与字符串、结构体及其在内存中的布局、运行中的程序所占用的各个内存区域，以及未定义行为。假定你已经会编程（Python，如 [[programming-1/functions]]），并且知道整数如何表示（[[computer-systems/bits-integers]]）。每个程序都在 x86-64 Linux 上用 GCC 15.2 以 `gcc -std=c17 -Wall -Wextra` 编译，并用 `-fsanitize=address,undefined` 作了测试。程序打印的地址每次运行都不同，因为 Linux 会对每个进程的布局随机化。

## 从源代码到运行中的程序

一个最小的 C 程序：

```c
#include <stdio.h>

int main(void) {
    int n = 10;
    long total = 0;
    for (int i = 1; i <= n; i++)
        total += (long) i * i;
    printf("sum of squares 1..%d = %ld\n", n, total);
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -o squares squares.c
$ ./squares
sum of squares 1..10 = 385
```

与 Python 的差别并非表面文章。C 是**编译**的：`gcc` 事先把整个源文件翻译成机器码，产出一个无需编译器即可运行的可执行文件。每个变量都有一个在编译时确定的**静态类型**（`int n`），它决定变量所占的大小和那些位的含义；没有运行期类型信息。代码块由花括号划定，语句以分号结尾。执行从 `main` 开始，其返回值成为进程的退出状态（按约定，$0$ 表示成功）。`printf` 按格式字符串打印，格式字符串中的**转换说明**（`int` 用 `%d`，`long` 用 `%ld`，`size_t` 用 `%zu`，指针用 `%p`，字符串用 `%s`）必须与实参的类型匹配——不匹配就是未定义行为，`-Wall` 会为此报警。

`gcc` 命令掩盖了四个步骤。**预处理器**处理以 `#` 开头的行：`#include <stdio.h>` 把标准输入输出库的声明粘贴进来，`#define` 做文本替换。**编译器**本体把 C 翻译成汇编语言。**汇编器**把汇编变成由机器码构成的**目标文件**。最后，**链接器**把目标文件和库组合成可执行文件。编译器是 [[compilers]] 的主题，汇编是 [[computer-systems/machine-code]] 的主题，目标文件与链接是 [[computer-systems/linking-loading]] 的主题。编译选项大有讲究：`-std=c17` 选用语言的 2017 年版，`-Wall -Wextra` 打开能抓住真实缺陷的警告，`-O2` 启用优化，`-g` 保留调试信息，`-fsanitize=address,undefined` 加上本章通篇使用的运行期检查。

### 类型与声明

C 的基本类型是 [[computer-systems/bits-integers]] 的整数类型（`char`、`short`、`int`、`long`、`long long`、它们的 `unsigned` 版本、`<stdint.h>` 中的精确宽度类型 `int32_t`、`uint64_t` 等，以及表示长度的 `size_t`）、[[computer-systems/floating-point]] 的浮点类型 `float` 与 `double`、`_Bool`（包含 `<stdbool.h>` 后写作 `bool`），以及表示"没有值"的 `void`。由这些构造**派生类型**：指针、数组、结构体、共用体和函数。运算符 `sizeof` 以字节为单位给出类型或对象的大小，结果是 `size_t`，在编译时算出。

未初始化的局部变量具有*不确定*的值——那块内存里留下的是什么位就是什么位。读取它是缺陷（对某些类型还是未定义行为）。永远要初始化。

## 对象、地址与指针

::: definition 对象与地址 {#def-object}
**对象**是存放某个类型的一个值的一片内存；对类型 `T`，它占据 `sizeof(T)` 个连续字节。对象的**地址**是其第一个（最低地址的）字节的地址。对由表达式 `x` 指称的对象，表达式 `&x` 给出它的地址，其类型为"`T` 的指针"，写作 `T *`。
:::

::: definition 指针 {#def-pointer}
**指针**是一个指称某对象（或数组末尾之后的一个位置，或什么都不指称：**空指针**，写作 `NULL`）的值。若 `p` 的类型是 `T *` 且指向某对象，则表达式 `*p`（对 `p` **解引用**）指称那个对象：可以读它，并且只要 `T` 没有 `const` 限定，也可以对它赋值。在 x86-64 上，指针就是一个 64 位地址。
:::

指针就是 C 传递"引用"的方式。C 调用函数是**按值**的：被调用方收到实参的副本，正如 [[programming-1/functions]] 描述 Python 不可变值的那样。要让一个函数修改调用方的变量，就把变量的地址传进去：

```c
#include <stdio.h>

static void swap_wrong(int x, int y) { int t = x; x = y; y = t; }
static void swap(int *x, int *y)      { int t = *x; *x = *y; *y = t; }

int main(void) {
    int a = 1, b = 2;
    swap_wrong(a, b);
    printf("after swap_wrong: a = %d, b = %d\n", a, b);
    swap(&a, &b);
    printf("after swap:       a = %d, b = %d\n", a, b);
    return 0;
}
```

```console
$ ./swap
after swap_wrong: a = 1, b = 2
after swap:       a = 2, b = 1
```

`swap_wrong` 交换的是它自己的副本，对 `a` 和 `b` 毫无影响。`swap` 收到的是地址 `&a` 与 `&b`；在它内部，`*x` *就是* `a`，所以对 `*x` 赋值就是在改 `a`。这也是 C 函数返回多个结果的办法（`scanf("%d", &n)` 把值存进 `n`），以及廉价传递大对象的办法（对象再大，指针都是 8 字节）。

当两个表达式指称同一个对象时，它们互为**别名**。别名是许多微妙缺陷的来源，因为经由一个名字写入，会悄悄改变另一个名字读到的东西。

::: widget mapping
domain: p; q; r
codomain: a; b; c
map: p>a; q>b; r>a
caption: 三个指针变量和它们所指向的对象。一次指针赋值画出一条箭头；`*p` 沿箭头找过去。这个映射不是单射——`p` 与 `r` 都指向 `a`，所以 `*p` 与 `*r` 互为**别名**，写 `*p = 5` 会改变 `*r` 读到的值。把 `r>a` 改成 `r>c` 即可消除别名，并注意图中此时报告映射是单射：没有两个指针共享同一个目标（指针数与对象数相同时甚至构成双射）。假定指针实参互不别名的代码（`memcpy` 就是）必须写明这一点；C99 的 `restrict` 限定符就是把这个假定告诉编译器。
:::

::: example 追踪指针赋值 {#ex-trace}
这个程序打印什么？给出每条编号语句之后的状态。

```c
#include <stdio.h>

int main(void) {
    int x = 5, y = 7;
    int *p = &x, *q = &y;
    *p = *q + 1;          /* (1) */
    q = p;                /* (2) */
    *q *= 2;              /* (3) */
    int **pp = &p;
    **pp += y;            /* (4) */
    printf("x = %d, y = %d, *q = %d\n", x, y, *q);
    return 0;
}
```
::: solution
起初 $x = 5$，$y = 7$，`p` 指向 `x`，`q` 指向 `y`。

| 之后 | `x` | `y` | `p` → | `q` → | 原因 |
|---|---|---|---|---|---|
| (1) | 8 | 7 | `x` | `y` | `*q` 即 `y` $= 7$；`*p` 即 `x`，被置为 $8$ |
| (2) | 8 | 7 | `x` | `x` | 复制的是*指针*：现在 `p` 与 `q` 都是 `x` 的别名 |
| (3) | 16 | 7 | `x` | `x` | `*q` 即 `x`，翻了一倍 |
| (4) | 23 | 7 | `x` | `x` | `pp` 指向 `p`，所以 `**pp` 即 `*p`，即 `x`；$16 + 7 = 23$ |

程序打印 `x = 23, y = 7, *q = 23`。必须分清的是对指针赋值（`q = p`，改变 `q` 指向何处）与经由指针赋值（`*q = …`，改变它指向的对象）。指向指针的指针（`int **`）又多了一层：C 函数在必须修改调用方的*指针*时用它，例如代调用方分配内存。
:::
:::

### 指针算术与数组

**数组** `T a[n]` 是连续存放的 $n$ 个类型 `T` 的对象，`a[0]` 在最低地址。它的大小是 `n * sizeof(T)`，而它的长度（对普通数组而言）必须在建数组时已知。C 哪里都不存储长度，也不检查下标。

::: definition 指针算术 {#def-ptr-arith}
若 `p` 指向某个 `T` 数组的第 $i$ 个元素，`k` 是整数，则 `p + k` 指向第 $i + k$ 个元素，前提是 $0 \le i + k \le n$（第 $n$ 个位置，即末尾之后的一个位置，可以计算、可以比较，但不可解引用）。就数值而言，地址增加 `k * sizeof(T)` 字节。若 `p` 与 `q` 指向同一个数组之内，`q - p` 是二者之间的*元素*个数，类型为 `ptrdiff_t`。任何其他指针算术都是未定义行为。
:::

::: theorem 下标运算就是指针算术 {#thm-subscript}
在 C 中，`E1[E2]` 的定义就是 `*((E1) + (E2))`。在大多数表达式中，数组 `a` 会被转换（"退化"）为指向其首元素的指针 `&a[0]`。因此 `a[i]`、`*(a + i)` 乃至 `i[a]` 都指称同一个对象。
:::

::: proof
第一句是 C 标准中下标运算符的定义（C17 的 §6.5.2.1），第二句是数组到指针的转换规则（§6.3.2.1），除用作 `sizeof` 的操作数、一元 `&` 的操作数，或以字符串字面量初始化数组之外，它处处适用。有了这两条，`a[i]` 按定义就是 `*(a + i)`，其中 `a` 已退化为 `&a[0]`；由 [[#def-ptr-arith]]，`a + i` 指向第 $i$ 个元素。由于指针与整数之间的 `+` 可交换，`*(a + i)` = `*(i + a)` = `i[a]`。
:::

```c
#include <stdio.h>

int main(void) {
    int a[4] = {10, 20, 30, 40};
    int *p = a;                       /* 数组退化为 &a[0] */
    printf("sizeof a = %zu, sizeof p = %zu\n", sizeof a, sizeof p);
    printf("p = %p, p + 1 = %p\n", (void *) p, (void *) (p + 1));
    printf("*(p + 2) = %d, p[2] = %d, 2[p] = %d\n", *(p + 2), p[2], 2[p]);
    int *q = &a[3];
    printf("q - p = %td\n", q - p);   /* 数的是元素个数，不是字节 */
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -o ptr ptr.c && ./ptr
sizeof a = 16, sizeof p = 8
p = 0x7ffff9a26e10, p + 1 = 0x7ffff9a26e14
*(p + 2) = 30, p[2] = 30, 2[p] = 30
q - p = 3
```

因为 `sizeof(int)` 是 $4$，`p + 1` 在 `p` 之后四个字节处。而 `sizeof a` 是 $16$——整个数组——`sizeof p` 却是 $8$，指针的大小。一旦把数组传给函数，这个差别就立刻要紧起来：声明为 `int a[]` 的形参*就是*指针 `int *a`，所以在函数内部 `sizeof a` 是 $8$，长度丢了。这就是处理数组的 C 函数把长度作为单独的实参传入的原因（如 `void reverse(int *a, size_t n)`），也是 `sizeof v / sizeof v[0]` 这个求元素个数的写法只在 `v` 声明为数组处才有效的原因。

::: example 手算指针算术 {#ex-ptr-arith}
`double d[10]` 起始于地址 `0x7ffc0000a000`。地址 `d + 3` 和 `&d[9] + 1` 各是多少？`&d[7] - &d[2]` 是多少？表达式 `*(d + 9)`、`d + 10`、`*(d + 10)`、`d + 11` 中哪些是允许的？
::: solution
`sizeof(double)` 是 $8$，所以 `d + 3` 还要往前走 $3 \times 8 = 24 = $ `0x18` 个字节：`0x7ffc0000a018`。`&d[9] + 1` 就是 `d + 10`，往里走 $80 = $ `0x50` 个字节：`0x7ffc0000a050`，即末尾之后的一个位置。`&d[7] - &d[2]` 是 $5$（元素个数，不是 $40$ 个字节）。

`*(d + 9)` 读最后一个元素：允许。`d + 10` 可以计算（并可与指向 `d` 之内的其他指针比较），`for (p = d; p < d + 10; p++)` 这样的循环正是因此才合法。`*(d + 10)` 对末尾之后的一个位置解引用：未定义行为。由 [[#def-ptr-arith]]，`d + 11` 即便不解引用也是未定义的。
:::
:::

### 字符串

C 没有字符串类型。**字符串**是以**空字符** `'\0'`（值为 $0$ 的字节）结尾的 `char` 序列，字符串通过指向其首字符的 `char *` 来处理。长度要一路走到终止符才能求得，所以 `strlen` 的耗时与长度成正比；少了终止符，每个字符串函数都会在内存里一路走失。

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[] = "cat";                 /* 含 4 个 char 的数组：'c' 'a' 't' '\0' */
    const char *t = "cat";            /* 指向只读字面量的指针 */
    printf("sizeof s = %zu, strlen(s) = %zu, sizeof t = %zu\n",
           sizeof s, strlen(s), sizeof t);
    s[0] = 'b';                       /* 没问题：s 是我们自己的数组 */
    printf("%s %s\n", s, t);
    char buf[8];
    int n = snprintf(buf, sizeof buf, "%s-%s", "abcd", "efgh");
    printf("buf = \"%s\", needed %d chars\n", buf, n);
    return 0;
}
```

```console
$ ./str
sizeof s = 4, strlen(s) = 3, sizeof t = 8
bat cat
buf = "abcd-ef", needed 9 chars
```

`s` 是由字面量初始化的数组，所以它为终止符留了位置，而且可以修改。`t` 指向字面量本身，字面量住在只读内存里：写 `t[0] = 'b'` 将是未定义行为（实际表现为崩溃）。`snprintf` 至多写入 `sizeof buf` 个字节（含终止符），必要时截断，并返回完整输出*本来*会有的长度，于是调用方能察觉截断（`n >= sizeof buf`）。这里 GCC 甚至在编译期就发出警告：`'snprintf' output 10 bytes into a destination of size 8`。更早的函数 `strcpy`、`strcat` 和 `sprintf` 不管目标多大，输入要写多少就写多少；[[#sec-ub]] 解释为什么这很危险。

::: quiz
在执行 `char name[16] = "Ada";` 和 `char *p = name + 1;` 之后，`sizeof name`、`strlen(name)`、`*p` 与 `strlen(p)` 各是什么？
- [ ] $4$, $3$, `'A'`, $3$
- [x] $16$, $3$, `'d'`, $2$
- [ ] $16$, $16$, `'d'`, $15$
- [ ] $8$, $3$, `'d'`, $2$
::: solution
`name` 是含 16 个 char 的数组，所以无论内容如何 `sizeof name` 都是 $16$（初始值列表剩余部分补零）。`strlen` 数第一个 `'\0'` 之前的字符：$3$。`p` 指向 `name[1]`，即 `'d'`，从那里开始的字符串是 `"da"`，长度 $2$。答案中的 $8$ 是 `sizeof p`，即指针的大小。
:::
:::

## 结构体与内存布局

**结构体**把若干个类型可以不同、各有名字的数据成员组合成一个对象：

```c
struct point { double x, y; };
struct point p = { .x = 1.5, .y = -2.0 };
struct point *pp = &p;
pp->x = 3.0;             /* 等价于 (*pp).x = 3.0 */
```

结构体按值传递和赋值（整个对象被复制），所以大结构体通常用指针传递，而 `pp->x` 是 `(*pp).x` 的简写。结构体配上指针，搭起了 [[data-structures]] 里每一个链式数据结构：链表的结点就是 `struct node { int value; struct node *next; };`。

成员是怎么排布的？按声明顺序，但因为对齐的关系，未必连续。

::: definition 对齐 {#def-alignment}
类型 `T` 有一个**对齐值** `_Alignof(T)`，是 2 的幂：类型 `T` 的每个对象必须起始于它的倍数的地址。在 x86-64 Linux（System V ABI）上，每个基本类型按自身大小对齐：`char` 为 1，`short` 为 2，`int` 与 `float` 为 4，`long`、`double` 和指针为 8。结构体按其成员的最大对齐值对齐。编译器把每个成员放在既是其对齐值倍数、又不早于前一成员结尾的最低偏移处，必要时插入闲置的**填充**字节，并加上**尾部填充**，使结构体的大小是其对齐值的倍数。
:::

存在对齐要求，是因为硬件按对齐的块读内存：一个 8 字节的值若骑在两条高速缓存行之间（[[computer-systems/memory-hierarchy]]），就要两次访问，有些处理器干脆拒绝未对齐访问。尾部填充保证在结构体*数组*中每个元素也都对齐。

```c
#include <stdio.h>
#include <stddef.h>

struct rec {
    char   tag;      /* 1 字节 */
    int    count;    /* 4 字节，必须从 4 的倍数处开始 */
    char   flag;     /* 1 字节 */
    double value;    /* 8 字节，必须从 8 的倍数处开始 */
};

struct rec2 {        /* 同样的字段，从大到小排列 */
    double value;
    int    count;
    char   tag;
    char   flag;
};

int main(void) {
    printf("offsets: tag %zu, count %zu, flag %zu, value %zu\n",
           offsetof(struct rec, tag), offsetof(struct rec, count),
           offsetof(struct rec, flag), offsetof(struct rec, value));
    printf("sizeof(struct rec) = %zu, sizeof(struct rec2) = %zu\n",
           sizeof(struct rec), sizeof(struct rec2));
    return 0;
}
```

```console
$ ./layout
offsets: tag 0, count 4, flag 8, value 16
sizeof(struct rec) = 24, sizeof(struct rec2) = 16
```

::: example 计算布局 {#ex-layout}
解释上面的各个偏移与两个大小。
::: solution
在 `struct rec` 中：`tag` 放在偏移 $0$，到 $1$ 处结束。`count` 需要 $4$ 的倍数；下一个是 $4$，所以字节 $1$–$3$ 是填充，`count` 占据 $4$–$7$。`flag` 只需对齐 $1$，放在 $8$。`value` 需要 $8$ 的倍数；下一个是 $16$，所以字节 $9$–$15$ 是填充，`value` 占据 $16$–$23$。大小 $24$ 已经是结构体对齐值 $8$ 的倍数。24 个字节里有 10 个是填充。

在 `struct rec2` 中：`value` 在 $0$–$7$，`count` 在 $8$–$11$，`tag` 在 $12$，`flag` 在 $13$。共 $14$ 个字节，向上取到 $8$ 的倍数：$16$，尾部填充 2 个字节。同样的数据少用三分之一的空间——对一百万条记录的数组，少占 8 MB 内存，缺失的高速缓存也相应更少。
:::
:::

重排的这招在一般情况下都有效。

::: proposition 按对齐值递减声明成员 {#prop-order}
设每个成员的大小都是其对齐值的倍数，且所有对齐值都是 2 的幂（基本类型、数组和结构体都满足）。若结构体的成员按对齐值不减的顺序声明，编译器就不会在成员之间插入填充；可能剩下的只有尾部填充，且不足结构体的对齐值个字节。在 [[#def-alignment]] 的布局规则下，所得的大小是这些成员可能的最小值。
:::

::: proof
设成员为 $m_1, \ldots, m_k$，对齐值 $a_1 \ge a_2 \ge \cdots \ge a_k$，大小 $s_i$ 都是 $a_i$ 的倍数。归纳证明成员 $m_j$ 可以无填充地放在偏移 $o_j = s_1 + \cdots + s_{j-1}$ 处。$j = 1$ 时 $o_1 = 0$。$j > 1$ 时，每个先前的 $s_i$ 都是 $a_i$ 的倍数，而 $a_i \ge a_j$ 且二者皆为 2 的幂，所以 $a_j$ 整除 $a_i$，从而整除 $s_i$；因此 $a_j$ 整除 $o_j$，这正是对齐要求。于是成员连续占据 $S = \sum s_i$ 个字节，总大小是 $S$ 向上取到 $a_1$ 的倍数，尾部填充不足 $a_1$ 个字节。任何布局都不可能更小：一切布局都要不重叠地放下所有成员，其大小至少是 $S$，又必须是结构体对齐值 $a_1$ 的倍数，所以至少是 $S$ 向上取到 $a_1$ 的倍数。
:::

C 标准禁止编译器重排成员（成员的顺序是程序含义的一部分，能通过 `offsetof` 和指针强制转换看到），所以要由程序员来做。

## 运行中程序的各个区域 {#sec-regions}

程序作为进程运行时（[[computer-systems/exceptions-processes]]），操作系统给它一个私有的**地址空间**——在 x86-64 Linux 上，供程序使用的虚拟地址共 $2^{47}$ 字节（$128$ TiB）——划分为用途和寿命各不相同的区域：

| 区域 | 内容 | 寿命 |
|---|---|---|
| 代码段（text） | 机器指令 | 整个运行期；只读且可执行 |
| 只读数据段 | 字符串字面量、`const` 全局变量 | 整个运行期；只读 |
| 数据段与 bss 段 | 全局与 `static` 变量（已初始化的，和零初始化的） | 整个运行期 |
| 堆区 | `malloc`、`calloc`、`realloc` 分配的对象 | 从分配起到 `free` 为止 |
| 栈区 | 局部变量、函数实参、返回地址 | 到该函数返回为止 |
| 共享库 | C 库及其他库 | 启动时或按需映射 |

```c
#include <stdio.h>
#include <stdlib.h>

int counter = 0;                     /* 全局变量：数据段 */

int main(void) {
    int local = 0;                   /* 栈区 */
    int *heap = malloc(sizeof *heap);/* 堆区 */
    if (heap == NULL) return 1;
    const char *lit = "hello";       /* 只读数据 */
    printf("code   %p\n", (void *) main);
    printf("rodata %p\n", (void *) lit);
    printf("data   %p\n", (void *) &counter);
    printf("heap   %p\n", (void *) heap);
    printf("stack  %p\n", (void *) &local);
    free(heap);
    return 0;
}
```

```console
$ ./regions
code   0x621c997611a9
rodata 0x621c99762004
data   0x621c99764014
heap   0x621cb9a04010
stack  0x7ffe7bc317c4
```

（把函数指针转成 `void *` 来打印是一种常见扩展，ISO C 并不保证；`-Wpedantic` 会对此报警。）程序的代码、常量和全局变量依次紧挨着坐在地址空间的低处；堆区从它们上方不远处开始向上生长；栈区坐在用户地址空间的顶端附近，向下生长。把程序跑两遍，每个数字都会变，因为**地址空间布局随机化**（ASLR）这项安全措施让地址难以预测。

**栈区**为每个活动函数调用保存一个**栈帧**，内含该调用的局部变量和返回调用方所需的簿记（[[computer-systems/machine-code]] 详细展示了栈帧）。分配是自动的、几乎免费的——挪一个指针——但局部变量在其函数返回时就消亡。所以返回它的地址是缺陷，GCC 会警告：

```console
$ gcc -std=c17 -Wall -Wextra -c dangle.c
dangle.c: In function 'make':
dangle.c:3:12: warning: function returns address of local variable [-Wreturn-local-addr]
    3 |     return &x;            /* x dies when make returns */
      |            ^~
```

**堆区**用于大小到运行期才已知、或必须比创建它的函数活得更久的对象。`malloc(n)` 返回指向 $n$ 个新字节的指针（没有可用的就返回 `NULL`），内容不确定；`calloc(k, size)` 返回清零后的、可容纳 `k` 个元素的空间；`free(p)` 把空间归还。堆内存没有任何东西会自动释放：忘记释放是**泄漏**，释放两次、或释放后继续使用这块内存，都是具有未定义行为的错误。[[computer-systems/dynamic-memory]] 展示分配器如何实现这些函数。

::: example 一个动态大小的数组 {#ex-malloc}
写一个函数，返回一个新分配在堆上的数组，存放前 `n` 个平方数，并正确地使用它。
::: solution
```c
#include <stdio.h>
#include <stdlib.h>

/* 返回含前 n 个平方数的新数组；内存耗尽时返回 NULL。 */
static long *squares(size_t n) {
    long *a = malloc(n * sizeof *a);    /* 这里的 n 很小；见下文 */
    if (a == NULL) return NULL;
    for (size_t i = 0; i < n; i++)
        a[i] = (long) (i * i);
    return a;                           /* 调用方必须释放 */
}

int main(void) {
    long *sq = squares(6);
    if (sq == NULL) { perror("squares"); return 1; }
    for (size_t i = 0; i < 6; i++) printf("%ld ", sq[i]);
    printf("\n");
    free(sq);                           /* 每次 malloc 都需要一次 free */
    sq = NULL;                          /* 避免悬空指针 */
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -fsanitize=address,undefined -o sq sq.c && ./sq
0 1 4 9 16 25
```

这个数组不能是 `squares` 的局部变量，因为它必须活过这次调用。写 `sizeof *a` 而不是 `sizeof(long)`，使得 `a` 的类型日后改变时分配的大小依然正确。`malloc` 的结果要检查，所有权要写明（"调用方必须释放"），调用方恰好释放一次。对不可信的 `n`，乘法 `n * sizeof *a` 必须像 [[computer-systems/bits-integers]] 中那样检查溢出；`calloc(n, sizeof *a)` 自己会做这项检查。AddressSanitizer 对这个程序没有报告任何泄漏或错误。
:::
:::

## 未定义行为 {#sec-ub}

::: definition 未定义行为 {#def-ub}
**未定义行为**是标准就"使用了不可移植或有误的程序构造或有误的数据"而言不施加任何要求的行为。执行过程中做了未定义操作的程序根本没有含义可言：编译器可以假定它永不发生，而实际结果可以是任何东西——预期的答案、崩溃、错误的答案，或在不同优化水平下表现不同。
:::

标准把未定义行为与**实现定义**行为（每个编译器必须选定并记录一种行为，例如负数右移的结果）与**未指定**行为（若干结果之一，未必有记录，例如函数各实参的求值顺序）区分开来。未定义行为的常见来源有：

- 越界访问数组，或构造出越过数组末尾一个以上位置的指针；
- 解引用空指针、悬空（已释放或已离开作用域）或未对齐的指针；
- 读取未初始化的局部变量；
- 带符号整数溢出、移位量达到或超过位宽、除以零、把超范围的浮点数转换为整数；
- 修改字符串字面量或 `const` 对象；
- 通过不兼容类型的指针访问对象（**严格别名**规则；`memcpy` 与 `unsigned char *` 是查看对象字节的规范途径）；
- 两次修改一个变量而其间没有顺序点，如 `i = i++ + 1`；
- 线程之间的数据竞争（[[parallel-computing]]）。

存在未定义行为，是为了让 C 能在每种机器上编译出高效的代码：编译器不必插入边界检查或溢出检查，并且可以在"程序正确"的假定下优化。代价是缺陷不会自行声张。一次越界读通常只是返回旁边的值。这个循环多跑了一圈：

```c
#include <stdio.h>

int main(void) {
    int a[4] = {1, 2, 3, 4};
    int sum = 0;
    for (int i = 0; i <= 4; i++)     /* 缺陷：应为 i < 4 */
        sum += a[i];
    printf("%d\n", sum);
    return 0;
}
```

正常编译时，它打印某个数并成功退出。用 AddressSanitizer 编译——它给每个对象围上被"下毒"的"红区"，并检查每一次访问——它会在坏的那次读处停下（输出有删节）：

```console
$ gcc -std=c17 -Wall -Wextra -g -fsanitize=address -o oob oob.c && ./oob
=================================================================
==3255279==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7856be8f0030 ...
READ of size 4 at 0x7856be8f0030 thread T0
    #0 0x5d964c8a7424 in main .../oob.c:7
...
  This frame has 1 object(s):
    [32, 48) 'a' (line 4) <== Memory access at offset 48 overflows this variable
```

::: warning "我跑过一遍，是好的"
一个含未定义行为的 C 程序可以通过所有测试，然后在线上出事——换一个编译器版本、换一个优化水平，或换一批输入。跑一遍证明不了任何东西。应当：用 `-Wall -Wextra` 编译并消除每一条警告；用 `-fsanitize=address,undefined` 测试（AddressSanitizer 管内存错误，UBSan 管溢出等问题）；使用 Valgrind、静态分析器和模糊测试一类的工具；并优先采用带长度信息的接口（`snprintf`、`strnlen`、显式给定长度的 `memcpy`），而不用不带的（`gets`——C11 已把它从语言中移除——`strcpy`、`sprintf`）。
:::

::: application 缓冲区溢出及其防御
当程序不检查长度就把不可信输入拷进定长缓冲区——比如对 64 字节的 `buf` 和一段更长的 `input` 写 `strcpy(buf, input)`——多出的字节会覆盖内存中紧挨着的任何内容。在栈上，这包括当前函数保存的返回地址（[[computer-systems/machine-code]]），于是精心挑选的输入能让函数"返回"到攻击者选定的地址。自 1988 年的莫里斯蠕虫（Morris）以来——它的一部分传播正是靠 `fingerd` 服务器使用 `gets` 造成的溢出——**缓冲区溢出**这类缺陷一直是软件界破坏最惨重的缺陷之一。

现代系统层层设防。第一道也是最好的一道防线在代码里：检查长度，使用带边界限制的函数，或为处理不可信输入的新代码改用内存安全的语言。在此之后，编译器插入**栈金丝雀**（stack canary，`-fstack-protector`，Ubuntu 的 GCC 默认开启）：一个放在返回地址之前、函数返回之前校验的秘密值；操作系统把栈和堆标为不可执行（**W⊕X**，"写或执行，二者居其一"），并对地址随机化（**ASLR**）；较新的处理器加入硬件**影子栈**，为返回地址保存一份受保护的副本（Intel CET，用 GCC 的 `-fcf-protection` 启用）。任何单独一道防御都可能被绕过，所以要组合使用。细节在 [[security]] 中；在本课程里，溢出实验仅限于在你自己的机器上跑玩具程序，并且带着消毒器构建，让缺陷被报告出来而不是被利用。
:::

::: history
C 由里奇（Ritchie）于 1969 至 1973 年间在贝尔实验室创造，由汤普森（Thompson）的 B 语言（其本身源自 Martin Richards 的 BCPL）演化而来，目的是用高级语言重写 Unix 内核；重写在 1973 年完成。柯林汉（Kernighan）与里奇合著的《C 程序设计语言》（*The C Programming Language*，1978）为这门语言定了十年的规矩（"K&R C"）。ANSI 于 1989 年标准化了 C（ISO 于 1990 年采纳："C89/C90"），加入了函数原型和 `const`；其后的版本是 C99（`//` 注释、`long long`、`stdint.h`、`restrict`、声明可出现在任意位置）、C11（线程、原子操作、`_Alignof`、移除 `gets`）、C17（仅作修正）和 C23（ISO 于 2024 年发布：`bool` 与 `nullptr` 关键字、强制补码、`<stdckdint.h>`）。里奇与汤普森因 Unix 获得 1983 年的图灵奖。
:::

## 后续内容

下一章 [[computer-systems/machine-code]] 把本章的构造——算术、指针、数组、结构体、循环与函数调用——编译成 x86-64 指令，并展示栈帧里到底装了什么。本章的布局规则会在 [[computer-systems/memory-hierarchy]] 中重现：程序触碰内存的顺序决定其速度；堆则重回 [[computer-systems/dynamic-memory]]。更大规模的 C——头文件、分离编译、`static` 与 `extern`——是 [[computer-systems/linking-loading]] 的主题。保留 C 对内存的掌控、又在编译期排除未定义行为的语言，在 [[programming-languages]] 中讨论。

::: summary
- C 提前编译、静态类型；`gcc` 依次运行预处理器、编译器、汇编器和链接器。编译时用 `-std=c17 -Wall -Wextra`，测试时用 `-fsanitize=address,undefined`。
- 每个对象都有地址；`&x` 取地址，`*p` 沿地址找过去。实参按值传递，所以函数经由指针修改调用方的变量；同一个对象的两个名字互为**别名**。
- 指针算术以所指类型为单位移动，只在数组之内及末尾之后一个位置有效；`a[i]` 就是 `*(a + i)`，数组退化为指针（[[#thm-subscript]]），所以函数收到数组时不带长度。
- 字符串是以 `'\0'` 终止的 `char` 数组；使用 `snprintf` 这类感知长度的函数。
- 结构体成员按自然边界对齐并带填充；成员按对齐值从大到小声明可使大小最小（[[#prop-order]]）。
- 进程有代码段、只读数据段、数据/bss 段、堆区和栈区；局部变量在其函数返回时消亡，堆对象活到 `free`。
- **未定义行为**——越界访问、悬空指针、读未初始化、带符号溢出——使程序失去含义；它是缓冲区溢出漏洞的根源，防御靠谨慎的代码、消毒器、金丝雀、W⊕X、ASLR 与影子栈。
:::

## 习题

::: exercise 结构体的大小 {level=1 check="24"}
在 x86-64 Linux 上，`struct s { char c; double d; short h; };` 的 `sizeof(struct s)` 是多少？给出各偏移。（输入大小。）
::: solution
`c` 在偏移 $0$；`d` 需要 $8$ 的倍数，所以偏移 $1$–$7$ 是填充，`d` 占据 $8$–$15$；`h` 在 $16$–$17$。成员到 $18$ 处结束，而结构体的对齐值是 $8$，所以大小向上取到 $24$。若重排为 `double d; short h; char c;` 则得 $8 + 2 + 1 = 11$，取整为 $16$。对原来的声明，GCC 打印 $24$。
:::
:::

::: exercise 指针算术 {level=1 check="40"}
`short *p` 存放地址 `0x1000`，`long *q` 存放 `0x1000`。`p + 20` 比 `p` 高出多少字节？`q + 5` 比 `q` 高出多少字节？（输入 `p + 20` 的字节差。）
::: solution
`sizeof(short)` 是 $2$，所以 `p + 20` 远 $40$ 个字节（`0x1028`）。`sizeof(long)` 是 $8$，所以 `q + 5` 同样远 $40$ 个字节。两种情形下，只有当指针指向足够长的数组之内时，该算术才有定义。
:::
:::

::: exercise 指出未定义行为 {level=1}
下列哪些片段有未定义行为？(a) `int x; printf("%d\n", x);` (b) `unsigned u = 0; u--;` (c) `char *s = "abc"; s[0] = 'X';` (d) `int a[3]; int *p = a + 3;` (e) `int a[3]; int *p = a + 4;` (f) `printf("%d\n", 3.5);`
::: solution
(a) 实际上未定义：`x` 未初始化，值不确定（对地址从未被取走的自动变量，读取它是未定义行为）。(b) 有定义：无符号算术回绕，`u` 成为 `UINT_MAX`。(c) 未定义：字符串字面量不得修改。(d) 有定义：可以构造末尾之后一个位置的指针。(e) 未定义：越过了末尾之后一个位置。(f) 未定义：`%d` 要求 `int` 却收到 `double`；在 x86-64 上通常打印垃圾值，因为 `double` 经 `%xmm0` 传递而 `printf` 读 `%esi`。GCC 的 `-Wall` 会对 (a)（`'x' is used uninitialized`）和 (f)（`format '%d' expects argument of type 'int'`）报警，却默默编译 (c)，因为在 C 中字符串字面量的类型是 `char[4]` 而非 `const char[4]`；选项 `-Wwrite-strings` 能把 (c) 也变成警告。
:::
:::

::: exercise 实现 strlen {level=2}
用指针算术（不用下标）写 `size_t my_strlen(const char *s)`，并解释为什么它必须接受 `const char *`。若 `s` 没有以空字符终止，它会怎样？
::: solution
```c
#include <stdio.h>
#include <stddef.h>

static size_t my_strlen(const char *s) {
    const char *p = s;
    while (*p != '\0')
        p++;
    return (size_t) (p - s);
}

int main(void) {
    printf("%zu %zu\n", my_strlen("systems"), my_strlen(""));
    return 0;
}
```

```console
$ ./mystrlen
7 0
```

`p - s` 数的是终止符之前的字符数。形参取 `const char *`，使函数承诺不修改字符串，从而可以把它用在字符串字面量和其他只读数据上。若没有终止符，循环会读过数组的末尾——未定义行为；实际后果或是在某处碰上一个零星的零字节、返回一个错误的长度，或是走到未映射的内存而崩溃。这就是 `strnlen(s, max)` 存在的原因。
:::
:::

::: exercise 原地反转 {level=2}
写 `void reverse(int *a, size_t n)`，用两个相向移动的指针反转数组。陈述一个循环不变式，并用它证明正确性，包括 $n = 0$ 与 $n = 1$ 的情形。
::: solution
```c
#include <stdio.h>
#include <stddef.h>

/* 用两个指针原地反转 a[0..n-1]。 */
static void reverse(int *a, size_t n) {
    if (n == 0) return;
    int *lo = a, *hi = a + n - 1;
    while (lo < hi) {
        int t = *lo; *lo = *hi; *hi = t;
        lo++; hi--;
    }
}

int main(void) {
    int v[] = {1, 2, 3, 4, 5};
    size_t n = sizeof v / sizeof v[0];
    reverse(v, n);
    for (size_t i = 0; i < n; i++) printf("%d ", v[i]);
    printf("\n");
    return 0;
}
```

```console
$ ./rev
5 4 3 2 1 
```

设 $A$ 为原始内容，$\ell = $ `lo - a`，$h = $ `hi - a`。**不变式**：$\ell + h = n - 1$；对 $i < \ell$ 和 $i > h$，$a[i] = A[n-1-i]$；对 $\ell \le i \le h$，$a[i] = A[i]$。初始时 $\ell = 0$，$h = n - 1$，前两个条件空虚地成立。$\ell < h$ 时的一轮迭代交换位置 $\ell$ 与 $h = n-1-\ell$，于是此后 $a[\ell] = A[n-1-\ell]$ 且 $a[h] = A[n-1-h]$，两个增量又恢复了不变式。每轮迭代使 $h - \ell$ 减少 $2$，所以循环终止，且 $\ell \ge h$。此时每个 $i$ 或者在 $[\ell, h]$ 之外——那里 $a[i] = A[n-1-i]$——或者恰是中间下标 $\ell = h = (n-1)/2$，对该下标本来就有 $A[i] = A[n-1-i]$。$n = 1$ 时循环一次也不执行，正确。对 $n = 0$ 的提前返回必不可少：否则 `a + n - 1` 就是 `a - 1`，一个非法指针。
:::
:::

::: exercise 别名陷阱 {level=2 check="0"}
"异或交换"`void xs(int *x, int *y) { *x ^= *y; *y ^= *x; *x ^= *y; }` 不用临时变量就交换两个整数。执行 `int a = 7; xs(&a, &a);` 之后 `a` 是多少？解释之。（输入该值。）
::: solution
`x` 与 `y` 都指向 `a`，第一条语句算的是 `a ^= a`，得 $0$。剩下两条语句把 $0$ 与 $0$ 异或。所以 `a` 最终是 $0$ 而不是 $7$：值被毁掉了。异或交换的代数（见 [[computer-systems/bits-integers]]）假定 `*x` 与 `*y` 是不同的对象。用临时变量的普通交换，即便两者别名也照样工作。GCC 证实：程序打印 `0`。
:::
:::

::: exercise 最少填充 {level=3 check="12"}
用 [[#prop-order]] 求一个含 `char`、`short`、`int` 和 `char` 各一个（共两个 `char`）的结构体的最小可能大小，并给出一个达到它的声明顺序。再计算顺序 `short a; char b; int c; char d;` 的大小。（输入后一顺序的大小。）
::: solution
按对齐值递减排列，`int c; short a; char b; char d;` 把成员放在偏移 $0$、$4$、$6$、$7$：$8$ 个字节且无填充，而 $8$ 是对齐值 $4$ 的倍数，所以大小是 $8$——由命题，这就是最小值。对 `short a; char b; int c; char d;`：`a` 在 $0$–$1$，`b` 在 $2$，填充一字节，`c` 在 $4$–$7$，`d` 在 $8$，再加三个字节尾部填充才达到 $4$ 的倍数：大小 $12$。GCC 的结果一致（$12$）。
:::
:::

::: exercise 一个带界的拷贝 {level=3}
写 `size_t copy_str(char *dst, size_t cap, const char *src)`：把 `src` 中能放进 `dst`（其大小为 `cap`）的部分尽量拷贝过去；只要 `cap > 0` 就总是补空字符终止；绝不写 `dst[0..cap-1]` 之外的地方；并返回 `strlen(src)`，让调用方能察觉截断。证明写操作有界。
::: solution
```c
#include <stdio.h>
#include <string.h>

size_t copy_str(char *dst, size_t cap, const char *src) {
    size_t len = strlen(src);
    if (cap > 0) {
        size_t n = len < cap - 1 ? len : cap - 1;   /* 为 '\0' 留出位置 */
        memcpy(dst, src, n);
        dst[n] = '\0';
    }
    return len;
}

int main(void) {
    char buf[5];
    size_t need = copy_str(buf, sizeof buf, "computer");
    printf("\"%s\" (truncated: %s)\n", buf, need >= sizeof buf ? "yes" : "no");
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -fsanitize=address,undefined -o copy copy.c && ./copy
"comp" (truncated: yes)
```

`cap == 0` 时什么都不写。否则 $n = \min(len, cap - 1) \le cap - 1$；`memcpy` 写 `dst[0]` 到 `dst[n-1]`，终止符写到 `dst[n]`，所以被写的最大下标是 $n \le cap - 1$，在缓冲区之内。终止符总会写入，所以 `dst` 是一个合法的字符串。恰在 $len \ge cap$ 时发生了截断，调用方用返回值检验这一点。这正是 BSD 函数 `strlcpy` 的约定；glibc 自 2.38 版（2023 年）起提供了它，POSIX 也在其 2024 年版中将其收录。
:::
:::
