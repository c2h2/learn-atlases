编译一个 C 程序，同时运行它的两份拷贝，在每份里打印一个全局变量的地址：两边打印同一个数。然而当一份拷贝修改这个变量时，另一份看不到变化。两个不同的内存块用着同一个*地址*。这之所以可能，是因为程序使用的地址根本不是内存芯片的地址：它们是**虚拟地址**，在每一次载入、存储和取指令时，都由操作系统配置好的硬件转换成**物理地址**。

这一转换是操作系统的第二大虚拟化，排在处理器（[[operating-systems/processes-scheduling]]）之后。它给每个进程一种从地址零开始的大而私有的内存的幻象；它使进程彼此隔离、使内核与所有进程隔离；并且，正如下一章要展示的，它让系统能用比物理上更多的内存。代价是每次内存引用都需要一次转换，而转换必须非常快，其自身又不能占用太多内存。

本章按被发明的顺序展开这些机制，因为每一个都修补了前一个的缺陷：基址-界限重定位、分段、分页、多级页表，最后是**转换后备缓冲器**（TLB），即让分页快起来的缓存。[[computer-systems/memory-hierarchy]] 曾把虚拟内存勾画为"DRAM 是磁盘的高速缓存"并给出 x86-64 的数字；这里我们弄清这个设计为何长成这样，证明它的基本代价公式，并在真机上测量 TLB。策略——内存不够用时怎么办——是 [[operating-systems/page-replacement]] 的主题。

## 地址空间

::: definition 地址空间 {#def-address-space}
一个进程的**地址空间**是它可以使用的虚拟地址的集合，连同每个地址所指向的东西以及以何种权限使用（读、写、执行）。在 Linux 上，一个地址空间由若干**区域**（虚拟内存区域）组成：程序的代码与只读数据、已初始化与未初始化数据、堆、内存映射的文件与共享库，以及每个线程各自的栈。区域之间未使用的间隙不属于地址空间，对它们的任何引用都是故障。
:::

Linux 在 `/proc/<pid>/maps` 中显示一个进程的区域（布局已在 [[computer-systems/c-programming]] 和 [[computer-systems/linking-loading]] 中描述过）。进程甚至能看到自己的：

```console
$ cat /proc/self/maps | head -5
61ea1621e000-61ea16312000 r--p 00000000 00:34 5597191     /usr/lib/cargo/bin/coreutils/cat
61ea16312000-61ea167e2000 r-xp 000f4000 00:34 5597191     /usr/lib/cargo/bin/coreutils/cat
61ea167e2000-61ea16bf4000 r--p 005c4000 00:34 5597191     /usr/lib/cargo/bin/coreutils/cat
61ea16bf4000-61ea16d5a000 r--p 009d6000 00:34 5597191     /usr/lib/cargo/bin/coreutils/cat
61ea16d5a000-61ea16d60000 rw-p 00b3c000 00:34 5597191     /usr/lib/cargo/bin/coreutils/cat
```

每一行是一个区域：起止地址、权限（`r-xp` 即可读、可执行、私有）、在文件中的偏移、设备与 inode，以及它映射的文件——这里是 `cat` 程序本身（测试机上那个核心工具的 Rust 重实现），它的代码区域是唯一可执行的一个。由于地址空间布局随机化，地址每次运行都不同。一个虚拟化的内存系统必须达成三个目标：

- **透明性**：程序仿佛独享内存那样编写；它不知道自己在物理内存中的哪里。
- **保护**：进程不能触碰自己地址空间之外的内存——别的进程的，或内核的。
- **效率**：转换给每次引用增加的时间要少，给每个进程增加的内存也要少。

## 基址与界限

实现透明性与保护的最简单硬件是一对寄存器。

::: definition 基址-界限重定位 {#def-base-bounds}
在采用基址与界限的**动态重定位**中，处理器有两个特权寄存器：**基址** $B$ 与**界限** $L$。对用户态发出的每个虚拟地址 $v$，硬件检查 $0 \le v < L$，通过则使用物理地址 $p = B + v$；否则引发一个故障。上下文切换时，内核在进程控制块中保存并恢复 $B$ 与 $L$。
:::

例如，一个加载在物理地址 $0x8000$（32 KiB）处、地址空间为 16 KiB 的进程有 $B = 0x8000$、$L = 0x4000$。它的虚拟地址 $0x1234$ 变成物理地址 $0x8000 + 0x1234 = 0x9234$；虚拟地址 $0x5000$ 越过界限，触发故障。内核可以搬动这个进程——把它的内存复制到别处并改变 $B$——而程序毫无察觉。

基址-界限很便宜（一次比较、一次加法），并且在只有内核能改寄存器的前提下是安全的（[[operating-systems/os-structure#prop-protection]]）。但它浪费内存。地址空间必须在物理内存中连续，*包括堆与栈之间未使用的空间*，而在一个 64 位程序里那可能是几 TB。而且由于进程占据大小不等的连续块，空闲物理内存会碎成用不上的空洞——即 [[computer-systems/dynamic-memory]] 针对 `malloc` 分析过的**外部碎片**。

## 分段

**分段**把基址-界限推广为每个逻辑区域一对。地址空间划分为若干**段**——代码、堆、栈——每段有自己的基址、界限与权限；一个虚拟地址指明一个段以及段内的偏移。

::: example 用分段做转换 {#ex-segments}
一台机器的虚拟地址为 16 位，高两位选择段，低 14 位是偏移。段表如下：

| 段 | 位 | 基址 | 大小 | 生长方向 | 权限 |
|---|---|---|---|---|---|
| 代码 | 00 | $0x20000$ | $0x0800$ | 向上 | 读、执行 |
| 堆 | 01 | $0x34000$ | $0x1000$ | 向上 | 读、写 |
| 栈 | 11 | $0x58000$ | $0x0800$ | 向下 | 读、写 |

转换对 $0x0123$、$0x4FFF$、$0xFF00$ 的读，以及对 $0x0010$ 的一次写。
::: solution
$0x0123 = 00\,00000100100011_2$：段 00（代码），偏移 $0x123 < 0x800$，物理地址 $0x20000 + 0x123 = 0x20123$；读代码是允许的。

$0x4FFF = 01\,00111111111111_2$：段 01（堆），偏移 $0x0FFF < 0x1000$，物理地址 $0x34000 + 0xFFF = 0x34FFF$。

$0xFF00 = 11\,11111100000000_2$：段 11（栈），偏移 $0x3F00$。栈向下生长，所以它的偏移从 16 KiB（$2^{14}$ 字节）段空间的顶端往下数：负偏移为 $0x3F00 - 0x4000 = -0x100$，其大小 $0x100$ 在界限 $0x800$ 之内，物理地址为基址 $+$ 负偏移 $= 0x58000 - 0x100 = 0x57F00$（栈占据 $[0x57800, 0x58000)$）。

对 $0x0010$ 的写落在代码段，而代码段不可写：**保护性故障**，程序收到 `SIGSEGV`——"段错误"一名的由来。
:::
:::

分段消除了堆与栈之间的浪费，还让进程可以共享段（库代码的一份副本，以只读方式映射进多个地址空间）。但段仍是大小不等的连续物理块，所以外部碎片依旧存在，而且一个生长中的段可能不得不搬迁。x86 处理器从 8086（1978）起一直保留着分段，但 64 位模式几乎把它整个禁用：基址全为零、界限被忽略，只有 `%fs` 和 `%gs` 两个寄存器的基址在用，分别指向线程局部存储（用户程序里的 `%fs`）和内核的每 CPU 数据（`%gs`）。

## 分页

外部碎片的解药是让每次分配都一样大。**分页**把虚拟地址空间划分为固定大小的**页**，把物理内存划分为同样大小的**页框**，并把每一页独立地映射到任意页框。

::: definition 分页 {#def-paging}
设页大小为 $2^p$ 字节，则 $v$ 位的虚拟地址划分为高 $v - p$ 位的**虚拟页号**（VPN）和 $p$ 位的**偏移**。**页表**把每个 VPN 映射到一个**页表项**（PTE），其中保存一个**物理页框号**（PFN）和控制位。物理地址就是 PFN 后接原封不动的偏移：

$$
\text{VA} = (\text{VPN}, \text{offset}) \;\longmapsto\; \text{PA} = (\text{PTE}[\text{VPN}].\text{PFN}, \text{offset}).
$$

最重要的控制位有：**present**（有效）——若为 0，任何访问都故障；**writable**（可写）；**user**（用户态可访问，而非仅内核态）；**no-execute**（不可执行，NX）；**accessed**（已访问）——每次访问由硬件置位；**dirty**（脏）——每次写入由硬件置位。
:::

分页没有外部碎片：任何空闲页框都能给任何一页用。取而代之的是**内部碎片**——每个区域末尾平均浪费半页——在页为 4 KiB 时这很小。页使共享与保护变得精细：同一页在一个进程里可以只读、在另一个进程里可写；内核的页映射进每个地址空间时不带用户位，因此用户代码看不见它们。accessed 位与 dirty 位是硬件对页替换的贡献（[[operating-systems/page-replacement]]）。

两个进程打印同一个全局变量的同一地址，现在就可以理解了：同一个 VPN 在两个地址空间要到两张不同的页表里查找，落在两个不同的页框里。

### 页表有多大？

最简单的页表是以 VPN 为下标的数组——**线性页表**。

::: proposition 线性页表的大小 {#prop-linear-size}
对 $v$ 位虚拟地址、$2^p$ 字节的页、$e$ 字节的表项，线性页表每个进程占 $2^{v - p} \cdot e$ 字节，无论该进程实际用了多少。
:::

::: proof
每个虚拟页一个表项，而虚拟页有 $2^v / 2^p = 2^{v - p}$ 个；每个表项占 $e$ 字节。
:::

对 32 位地址空间、4 KiB 的页、4 字节的表项，这是 $2^{20} \times 4$ 字节 $= 4$ MiB 每个进程——在一台 1990 年代的机器上开一百个进程就已经难堪。对 x86-64 的 48 位虚拟地址、8 字节的表项，则是 $2^{36} \times 8 = 2^{39}$ 字节 $= 512$ GiB 每个进程：不可能。然而这张表几乎全是空的，因为地址空间是**稀疏**的：典型进程在低处用几兆字节的代码和堆、在高处用一个栈，中间巨大的空洞无人使用。

## 多级页表

解法是把分页用到页表自己身上：把表切成页大小的小块，凡是只装无效表项的小块干脆不分配。一个小**页目录**记录哪些小块存在。

::: definition 多级页表 {#def-multilevel}
在 $k$ 级页表中，VPN 被划分为 $k$ 个索引 $i_1, \dots, i_k$。根表（其物理地址保存在一个特权寄存器里——x86-64 上的 `%cr3`）由 $i_1$ 索引；它的表项给出第二级表所在的物理页框，第二级由 $i_2$ 索引；如此下去，直到第 $k$ 级的表项给出数据页的 PFN。任何一级上的缺失表项意味着它下面的整段地址都没有映射，不必为它分配任何表。每张表恰好占一页。
:::

在 x86-64 上配 4 KiB 的页，48 位地址划分为四个 9 位索引和一个 12 位偏移（$48 = 4 \times 9 + 12$）：每张表有 $2^9 = 512$ 个八字节的表项，恰好 4 KiB。Intel 把这四级叫作 PML4、页目录指针表、页目录和页表。支持五级分页的处理器再加一个第五索引，用于 57 位地址。不带扩展的 32 位 x86 使用两级、10 位索引和 4 字节的表项。

::: algorithm 页表遍历 {#alg-walk}
输入：虚拟地址 $\text{va}$ 与根表的物理地址 $r$；访问类型（读、写、取指令；用户态或内核态）。

1. $t \gets r$。
2. 对 $\ell = 1, \dots, k$：
   1. $\text{pte} \gets$ 位于 $t$ 的表中下标为 $i_\ell(\text{va})$ 的表项（一次内存读）。
   2. 若 $\text{pte}$ 不在场，或不允许该访问，带着 $\text{va}$ 和原因引发一次缺页故障。
   3. $t \gets \text{pte}.\text{PFN} \times 2^p$。
3. 返回 $t + \text{offset}(\text{va})$。
:::

::: example 遍历一张玩具两级表 {#ex-toy-walk}
为 32 位地址、两级 10 位索引、4 KiB 的页实现 [[#alg-walk]]，用它在一个小地址空间里转换五个地址：两个代码页（只读）、一个数据页，以及位于内存顶端的一个栈页。
::: solution
几行 Python 就够了，而且能看到一次真正的遍历可能有的三种结局：物理地址、缺页故障，或保护性故障。

```python
# 32 位地址的玩具式两级页表：目录索引 10 位、
# 页表索引 10 位、偏移 12 位。表用 dict 表示；表项是 (frame, writable)。
PAGE = 4096

def translate(directory, va, write=False):
    d, t, off = va >> 22, (va >> 12) & 0x3FF, va & 0xFFF
    table = directory.get(d)
    if table is None:
        raise LookupError(f"page fault: no page table for directory entry {d}")
    pte = table.get(t)
    if pte is None:
        raise LookupError(f"page fault: entry {t} of table {d} not present")
    frame, writable = pte
    if write and not writable:
        raise PermissionError("protection fault: page is read-only")
    return frame * PAGE + off

directory = {
    0x001: {0x000: (0x2A5, False), 0x001: (0x2A6, False)},   # 代码，只读
    0x002: {0x3FF: (0x013, True)},                            # 数据
    0x3FF: {0x3FF: (0x7C0, True)},                            # 栈，内存顶端
}
for va, w in [(0x00400ABC, False), (0x00BFF010, True), (0xFFFFF004, True),
              (0x00401000, True), (0x00C00000, False)]:
    try:
        print(f"{va:#010x} -> {translate(directory, va, w):#010x}")
    except (LookupError, PermissionError) as e:
        print(f"{va:#010x} -> {e}")
```

```console
$ python3 walk.py
0x00400abc -> 0x002a5abc
0x00bff010 -> 0x00013010
0xfffff004 -> 0x007c0004
0x00401000 -> protection fault: page is read-only
0x00c00000 -> page fault: no page table for directory entry 3
```

整个 4 GiB 地址空间由一个目录加三张表描述——$4$ 页、$16$ KiB——而线性表要 4 MiB。
:::
:::

::: widget graph
nodes: cr3@3,3; L4-0@1.5,2; L4-255@4.5,2; L3-a@1.5,1; L3-b@4.5,1; L2-a@1.5,0.5; L2-b@4.5,0.5; PT-code@0.5,0; PT-heap@2.5,0; PT-stack@4.5,0
edges: cr3>L4-0; cr3>L4-255; L4-0>L3-a; L4-255>L3-b; L3-a>L2-a; L3-b>L2-b; L2-a>PT-code; L2-a>PT-heap; L2-b>PT-stack
algorithm: bfs
start: cr3
caption: [[#ex-sparse]] 中进程的页表树：根（PML4，由 `%cr3` 指向）的 512 个表项中只有两个有效——一个管低地址，一个管靠近用户空间顶端的栈——每条路径都止于一张最末级页表。逐步执行广度优先搜索：树的每一层都是一次遍历（[[#alg-walk]]）中的一次内存读，所以转换一个在 TLB 中缺失的地址要四次读。注意节点少得惊人：每一条缺席的边都代表 $512$ GiB、$1$ GiB 或 $2$ MiB 一文不值的地址空间。
:::

::: example 稀疏进程的页表 {#ex-sparse}
一个 64 位进程在 $0x400000$ 处使用 8 页代码，在 $0x600000$ 处使用 64 页堆，并在紧靠 $0x7ffc00000000$ 之下结束处使用 34 页栈。四级 x86-64 页表需要多少页页表？与线性表相比如何？
::: solution
最末级表覆盖 $512 \times 4$ KiB $= 2$ MiB；一个页目录覆盖 $512 \times 2$ MiB $= 1$ GiB；一个 PDPT 覆盖 $512$ GiB。数不同的前缀：

- 最末级页表：代码 $[0x400000, 0x408000)$ 落在 2 MiB 块 $0x400000 \gg 21 = 2$ 里；堆 $[0x600000, 0x640000)$ 在块 $3$；栈在与 $0x7ffc00000000$ 这个 2 MiB 对齐地址相邻的下一个块里。共 $3$ 张表。
- 页目录：代码与堆都在第一个吉字节内；栈在另一个。$2$ 个目录。
- PDPT：代码与堆在头 $512$ GiB 内；栈位于约 $128$ TiB，挂在 PML4 的表项 $255$ 上。$2$ 个 PDPT。
- 一个 PML4。

总计 $1 + 2 + 2 + 3 = 8$ 页 $= 32$ KiB（一个对页做循环的简短 Python 程序证实了计数），而线性表要 $512$ GiB。这棵树的代价正比于不同区域数乘以深度，而不是地址空间的大小。
:::
:::

代价也是有的。一次遍历每级要一次内存引用，所以在四级机器上*每次*访问都要五次内存引用——四次遍历、一次取数据。那会让分页比完全不转换慢五倍。解药是缓存。

在此之前，有一个替代方案值得一提：**反转页表**按*物理页框*一框一项，记录哪个进程和哪个 VPN 占据它，经哈希表查找。它的大小正比于物理内存，而不是进程数。PowerPC 与 IA-64 用过哈希表；它们让共享变得别扭（一个页框在表里只能有一个主人），而 x86 和 ARM 使用多级树。

## 转换后备缓冲器

::: definition 转换后备缓冲器 {#def-tlb}
**转换后备缓冲器**（TLB）是一个小的、快速的、通常高度相联的缓存，是 MMU 的一部分，保存最近用过的转换：每个表项把一个 VPN（在许多机器上还加上一个**地址空间标识符**）映射到一个 PFN 及其权限位。每次内存引用时，MMU 都在 TLB 中查找 VPN。**TLB 命中**时立刻拼出物理地址；**TLB 缺失**时它遍历页表（[[#alg-walk]]），把这次转换插入 TLB，然后重试。
:::

TLB 奏效的原因与高速缓存相同：局部性（[[computer-systems/memory-hierarchy#def-locality]]）。一次转换覆盖一页全部 $4096$ 个字节，所以扫描数组的循环每页才在 TLB 中缺失一次——每 $512$ 个八字节元素一次。TLB 一次能映射的字节数——表项数乘以页大小——是它的**覆盖范围**（reach）。

::: theorem 带 TLB 的有效访问时间 {#thm-eat}
设 TLB 查找花 $\varepsilon$，一次内存引用花 $m$，命中率为 $h$，缺失需要一次 $k$ 级遍历且遍历的各次读都到内存。则一次内存引用的平均时间为

$$
\text{EAT} = \varepsilon + m + (1 - h)\,k\,m .
$$ {#eq-eat}
:::

::: proof
每次引用都付查找 $\varepsilon$ 和数据引用 $m$。比例为 $1 - h$ 的引用还要执行遍历，即另外 $k$ 次内存读，每次 $m$。对引用取平均即得 $\varepsilon + m + (1 - h)km$。这就是 [[computer-systems/memory-hierarchy#thm-amat]] 的 AMAT 公式，取命中时间 $\varepsilon + m$、缺失损失 $km$。（在真实处理器里，页表项本身也被缓存在数据高速缓存和专用的分页结构缓存里，所以遍历的实际代价常远小于 $km$；该公式是一个悲观模型。）
:::

::: example 命中率必须多高？ {#ex-eat}
内存 $m = 100$ ns，TLB 查找 $\varepsilon = 1$ ns，缺失需要一次四级遍历。命中率为 $99\%$ 和 $98\%$ 时 EAT 各是多少？要把相对于不转换内存的减速控制在 $5\%$ 以下，命中率需要多高？
::: solution
由 [[#eq-eat]]：$h = 0.99$ 时 $1 + 100 + 0.01 \times 4 \times 100 = 105$ ns；$h = 0.98$ 时 $1 + 100 + 0.02 \times 400 = 109$ ns。不转换时一次引用花 $100$ ns，所以这两个数字分别是 $5\%$ 与 $9\%$ 的减速。要把它压在 $5\%$ 以下需要 $1 + 400(1 - h) < 5$，即 $1 - h < 0.01$，$h > 99\%$。顺序触及八字节元素的程序每 $512$ 次引用才缺失一次，$h \approx 99.8\%$——绰绰有余。而每次访问都跳到一个随机页的程序，$h$ 可以接近 $0$。
:::
:::

::: widget plot
f: e + m + (1 - x)*k*m
x: 0.9, 1
y: 0, 300
sliders: m=100:50:150:5; k=4:1:5:1; e=1:0:5:0.5
labels: \text{EAT（ns）}
points: 0.99,105; 0.98,109
caption: 由 [[#eq-eat]] 得到的有效访问时间对 TLB 命中率：一次内存引用 $m$ ns，$k$ 级遍历，查找时间 $e$ ns。图中的点是 [[#ex-eat]] 的值。注意斜率是 $km$：在内存 $100$ ns 的四级机器上，每 $1\%$ 的缺失让每次引用多花 $4$ ns，相当于四次 L1 高速缓存命中。把 $k$ 改到 $5$（五级分页），看直线变得多陡。
:::

### 真机上的 TLB

程序的页超出 TLB 覆盖范围时会发生什么，是可以测量的。下面的程序分配内存，把 $n$ 个页面中每个页面里的一条高速缓存行链接成一个随机环，然后沿环跟踪；每次载入都依赖上一次，所以每一步的时间就是一次引用的全部时延。它做两轮：一轮用普通的 4 KiB 页，一轮用 `madvise(MADV_HUGEPAGE)` 请求 2 MiB **大页**（测试机上 Linux 的透明大页设为 `madvise` 模式，所以只在明确要求的地方使用）。两轮触及的数据相同——高速缓存行根数相同——所以差别全在转换。

```c
#define _DEFAULT_SOURCE                    /* madvise、MAP_ANONYMOUS */
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <time.h>

/* 以随机顺序跟踪穿过 n 个页面中每页一条高速缓存行的指针。 */
static double chase(char *mem, long n) {
    const long PG = 4096;
    long *perm = malloc(n * sizeof *perm);
    for (long i = 0; i < n; i++) perm[i] = i;
    srand(1);                                          /* 每次运行顺序相同 */
    for (long i = n - 1; i > 0; i--) { long j = rand() % (i + 1), t = perm[i]; perm[i] = perm[j]; perm[j] = t; }
    for (long i = 0; i < n; i++)                       /* 第 k 页的第 (k/8 mod 64) 条高速缓存行：分散到各缓存组 */
        *(long *)(mem + perm[i] * PG + (perm[i] >> 3 & 63) * 64) = perm[(i + 1) % n];
    long p = perm[0], steps = 1 << 24;
    struct timespec t0, t1;
    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (long s = 0; s < steps; s++)                   /* 每次载入依赖上一次 */
        p = *(long *)(mem + p * PG + (p >> 3 & 63) * 64);
    clock_gettime(CLOCK_MONOTONIC, &t1);
    free(perm);
    return (p == -1) + ((t1.tv_sec - t0.tv_sec) * 1e9 + (t1.tv_nsec - t0.tv_nsec)) / steps;
}

int main(int argc, char *argv[]) {
    long n = argc > 1 ? atol(argv[1]) : 2048;          /* 触及的 4 KiB 页数 */
    size_t len = (n * 4096 + (2 << 20) - 1) & ~(size_t)((2 << 20) - 1);
    for (int huge = 0; huge <= 1; huge++) {
        char *raw = mmap(NULL, len + (2 << 20), PROT_READ | PROT_WRITE,
                         MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
        if (raw == MAP_FAILED) return 1;
        char *mem = (char *)(((uintptr_t)raw + (2 << 20) - 1) & ~(uintptr_t)((2 << 20) - 1));
        madvise(mem, len, huge ? MADV_HUGEPAGE : MADV_NOHUGEPAGE);
        printf("%5ld pages, %s: %5.1f ns per access\n", n, huge ? "2 MiB pages" : "4 KiB pages", chase(mem, n));
        munmap(raw, len + (2 << 20));
    }
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -O2 -o tlb tlb.c
$ for n in 32 512 2048 8192 32768; do taskset -c 33 ./tlb $n; done
   32 pages, 4 KiB pages:   2.8 ns per access
   32 pages, 2 MiB pages:   2.9 ns per access
  512 pages, 4 KiB pages:   5.3 ns per access
  512 pages, 2 MiB pages:   2.6 ns per access
 2048 pages, 4 KiB pages:  10.5 ns per access
 2048 pages, 2 MiB pages:   4.9 ns per access
 8192 pages, 4 KiB pages:  29.9 ns per access
 8192 pages, 2 MiB pages:  21.0 ns per access
32768 pages, 4 KiB pages:  39.4 ns per access
32768 pages, 2 MiB pages:  22.2 ns per access
```

（`/proc/vmstat` 里的计数器 `thp_fault_alloc` 在最后一轮运行期间增加了 $64$——$64$ 个大页、$128$ MiB——证实大页确实被用了。）结合 Intel 为这颗 Haswell 处理器文档化的 TLB 尺寸来读这张表：针对 4 KiB 页的一级数据 TLB 有 $64$ 个表项，共享的二级 TLB 有 $1024$ 个表项。

- $32$ 页在两种页大小下都装得进一级 TLB：没有差别。
- $512$ 页（$2$ MiB）在 4 KiB 页下溢出了 64 项 TLB，但没溢出二级 TLB：每次访问多付一次二级查找，时间翻倍。而用大页时，$2$ MiB 就是一页。
- $2048$ 页（$8$ MiB）在 4 KiB 页下连二级 TLB 也超了，所以多数访问要做一次页表遍历；大页只需要 $4$ 个表项。触及的高速缓存行（$2048 \times 64$ 字节 $= 128$ KiB）装得进 L2 高速缓存，所以全部差别都在转换。
- 从 $8192$ 页起，数据不再装得进 L2，两个版本都变慢；4 KiB 版本还要为高速缓存中的页表项缺失。

这些是一台机器上的**观测**；形状——先平坦，然后在每个 TLB 层级处跳一级——是普适的，跳变的位置透露 TLB 的尺寸。这项测量解释了为什么大型工作集的数据库、虚拟机和科学计算程序使用大页：1024 个表项的 TLB，在 4 KiB 页下覆盖范围是 $4$ MiB，在 2 MiB 页下是 $2$ GiB。

::: quiz
一个 TLB 有 $64$ 个表项，页大小 4 KiB。一个程序反复从头到尾累加一个 $10^6$ 个八字节整数的数组。哪些说法正确？
- [x] TLB 的覆盖范围是 $256$ KiB。
- [x] 该程序大约每 $512$ 个元素在 TLB 中缺失一次。
- [ ] 该程序几乎每次访问都在 TLB 中缺失，因为数组（约 7.6 MiB）大于覆盖范围。
- [x] 用 2 MiB 页时，该数组只需要 $4$ 个 TLB 表项。
::: solution
覆盖范围 $= 64 \times 4$ KiB $= 256$ KiB。数组远大于覆盖范围，但扫描是顺序的：每页的转换在需要下一页之前会用于本页全部 $512$ 个元素，所以每页只有一次缺失，命中率 $511/512$。"大于覆盖范围"只在访问跨页乱跳时才是问题，比如上面的指针环。数组占 $8 \times 10^6$ 字节 $\approx 7.6$ MiB，横跨 $4$ 个大页（若没有 2 MiB 对齐则 $5$ 个）。
:::
:::

### 谁处理 TLB 缺失，以及上下文切换

在 x86 和 ARM 上，页表由硬件自己遍历——**硬件管理的 TLB**——于是页表的格式由体系结构定死。在 MIPS 和其他一些 RISC 机器上，TLB 缺失引发一次异常，由内核的处理程序遍历内核中意的任何数据结构，再用一条特权指令插入表项——**软件管理的 TLB**，更灵活，也更慢。

TLB 表项只对它来自的地址空间有效。切换到另一个进程的上下文时，内核要么**冲刷** TLB（使每个表项失效），要么给表项打上**地址空间标识符**，让几个进程的表项并存。x86-64 称这些标记为**进程上下文标识符**（PCID，12 位；测试机的 `/proc/cpuinfo` 列有 `pcid`），Linux 用它们避免了上下文切换时的大部分冲刷。内核改动一个映射时——解除映射、把页改成只读——还必须使*每个*可能缓存了它的核心的 TLB 中那个过时表项失效，方法是给每个核心发一次处理器间中断：**TLB 集体驱逐**（TLB shootdown），多线程程序中 `munmap` 和 `mprotect` 的隐性代价之一。

::: warning "虚拟内存不过就是换页到磁盘"
人们常把虚拟内存等同于拿磁盘当 RAM 的溢出空间。这只是它的用途之一（[[operating-systems/page-replacement]]），但即使什么都不换出，转换机制也在工作，而它日常的职责是别的：给每个进程一个私有地址空间；保护内核和其他进程；在进程之间共享库的代码页；把文件映射进内存；惰性分配物理内存，直到一个页第一次被触及；用写时复制廉价地实现 `fork`。一台禁用交换、内存充裕的机器，仍然让每次引用穿过页表和 TLB 做转换。
:::

::: history
带分页的虚拟内存由曼彻斯特 Atlas 计算机的汤姆·基尔本（Tom Kilburn）等人发明（1962 年发表，称"单级存储系统"），它用一个页地址寄存器的相联存储器做转换——每个物理页框一个，实际上是硬件查找的反转页表。分段随 Burroughs B5000（1961）而来；Multics（1965 年起）在 GE 645 上把分段与分页结合。IBM System/360 Model 67（1967 年起交付）和 System/370（1972 年宣布虚拟内存）把分页带入主流计算；"translation lookaside buffer" 这个名字来自 IBM。彼得·登宁（Peter Denning）1970 年发表在《计算综述》（*Computing Surveys*）上的综述《虚拟存储器》（"Virtual Memory"）确立了术语。Intel 80386（1985）把两级分页带进个人计算机，AMD 的 x86-64（2003）带来今天使用的四级方案；Intel 于 2016 年规定五级分页，Linux 自 4.14 版（2017）起支持。
:::

## 后续内容

转换是机制；[[operating-systems/page-replacement]] 提供让虚拟内存大于物理内存的策略：请求分页、缺页、替换算法与工作集。写时复制的 `fork` 与内存映射文件建立在 [[#def-paging]] 的 PTE 位之上。线程共享一个地址空间（[[operating-systems/threads-locks]]），这既让它们可以通过内存通信，也正是它们能破坏彼此数据的原因。[[operating-systems/virtualisation]] 加上第二层转换——客户虚拟到客户物理再到宿主物理——其遍历最多要 $24$ 次内存引用。地址空间布局随机化、NX 位与内核页表隔离防御内存破坏攻击和 Meltdown，属于 [[security]]。

::: summary
- 每个进程有一个虚拟地址的**地址空间**（[[#def-address-space]]），每次引用都由 MMU 转换；转换提供透明性、保护与高效共享。
- **基址-界限**（[[#def-base-bounds]]）用一次加法和一次比较重定位一个连续地址空间；**分段**按区域来做；两者都有外部碎片。
- **分页**（[[#def-paging]]）把固定大小的页映射到页框；PTE 保存 PFN 与 present、writable、user、NX、accessed、dirty 位。线性表要 $2^{v-p}e$ 字节（[[#prop-linear-size]]）——x86-64 上是 512 GiB——所以真实的页表是**多级树**（[[#def-multilevel]]），稀疏进程只花几页（[[#ex-sparse]]）。
- x86-64 把 48 位地址划分为四个 9 位索引和一个 12 位偏移；一次遍历（[[#alg-walk]]）每级一次内存读。
- **TLB**（[[#def-tlb]]）缓存转换：$\text{EAT} = \varepsilon + m + (1-h)km$（[[#thm-eat]]），所以命中率必须超过约 $99\%$。实测：超出 TLB 覆盖范围后，访问时间先翻倍再翻两番；2 MiB 大页能消去这一效应。
- 上下文切换需要 TLB 冲刷或地址空间标识符（PCID）；改动映射需要在其他核心上做 TLB 集体驱逐。
:::

## 习题

::: exercise 基址与界限 {level=1}
一个进程的基址为 $0x5000$、界限为 $0x2000$。若可能，转换虚拟地址 $0x1A00$ 与 $0x2000$。
::: solution
$0x1A00 < 0x2000$，合法：$0x5000 + 0x1A00 = 0x6A00$。$0x2000$ 不小于界限，触发故障；合法的地址是 $0x0000$ 到 $0x1FFF$。
:::
:::

::: exercise 划分地址 {level=1 check="145"}
把 x86-64 虚拟地址 $0x00007f3a12345678$ 划分为四个 9 位页表索引和偏移。（输入页目录的索引，即四级中的第三级。）
::: solution
偏移是低 $12$ 位，$0x678$。右移：第 39–47 位给 $(\text{va} \gg 39) \mathbin{\&} 511 = 254$；第 30–38 位给 $232$；第 21–29 位给 $145$；第 12–20 位给 $325$。于是遍历读 PML4 的表项 $254$、PDPT 的表项 $232$、页目录的表项 $145$、页表的表项 $325$。一行 Python 可以验证：`[(va >> s) & 511 for s in (39, 30, 21, 12)]` 给出 `[254, 232, 145, 325]`。
:::
:::

::: exercise 线性页表 {level=1 check="4"}
一台 32 位机器用 4 KiB 的页和 4 字节的页表项，采用线性页表。每个进程的页表占多少 MiB？若页是 16 KiB 呢？（第一问以 MiB 作答。）
::: solution
由 [[#prop-linear-size]]，$2^{32-12} \times 4 = 2^{22}$ 字节 $= 4$ MiB。16 KiB 页时，$2^{32-14} \times 4 = 2^{20}$ 字节 $= 1$ MiB：更大的页缩小了表，代价是更多的内部碎片。
:::
:::

::: exercise TLB 命中率要求 {level=2 check="0.995"}
设 $m = 80$ ns、$\varepsilon = 0$、四级遍历直达内存，TLB 命中率 $h$ 为多少时有效访问时间是 $81.6$ ns？（输入 $h$。）
::: solution
由 $80 + (1 - h) \times 4 \times 80 = 81.6$ 得 $320(1 - h) = 1.6$，所以 $1 - h = 0.005$，$h = 0.995$。区区 $2\%$ 的减速就已经需要 $99.5\%$ 的命中率。
:::
:::

::: exercise 两级表的大小 {level=2 check="12"}
一台 32 位机器采用上面 Python 清单的两级方案（10 位索引、4 KiB 页、4 字节表项）。一个进程从地址 $0$ 起使用 4 MiB 的代码和数据，并使用 1 MiB 的栈，止于 $0xFFFFFFFF$（含）。连同目录在内，它需要多少 KiB 页表？（输入 KiB 数。）
::: solution
每张第二级表映射 $1024 \times 4$ KiB $= 4$ MiB。代码和数据 $[0, 4\text{ MiB})$ 恰好装进一张表（目录表项 $0$）。栈 $[0xFFF00000, 0x100000000)$ 落在最后一个 4 MiB（目录表项 $1023$）：还要一张表。连同目录共 $3$ 页 $= 12$ KiB，而线性表要 4 MiB。
:::
:::

::: exercise 测量说明了什么 {level=2}
在 TLB 测量中，$512$ 页在 4 KiB 页下的时间（$5.3$ ns）约为大页（$2.6$ ns）的两倍，尽管两者触及同样 $512$ 条高速缓存行。用文档给出的 TLB 尺寸解释原因。预测 $64$ 页与 $1024$ 页时大致会发生什么，然后运行程序验证。
::: solution
4 KiB 页时，$512$ 个不同的页装不进 $64$ 表项的一级 TLB，所以几乎每次访问都在一级缺失、由二级 TLB（1024 表项）服务，多花几个周期；数据本身（$512 \times 64$ B $= 32$ KiB）在两个版本里都在 L1 或 L2 里。用 2 MiB 页时，全部 $512$ 条高速缓存行都在一个大页里，每次访问都命中一级 TLB。预测：$64$ 页时 4 KiB 版本应接近大页时间，因为一级 TLB 刚好够用；$1024$ 页时 4 KiB 版本要用二级 TLB（还有其他页竞争，会有若干次遍历）。测试机上：

```console
$ taskset -c 33 ./tlb 64; taskset -c 33 ./tlb 1024
   64 pages, 4 KiB pages:   2.9 ns per access
   64 pages, 2 MiB pages:   2.9 ns per access
 1024 pages, 4 KiB pages:   8.6 ns per access
 1024 pages, 2 MiB pages:   5.6 ns per access
```

第一个预测成立。$1024$ 页时大页时间也从 $2.9$ ns 升到了 $5.6$ ns：$1024$ 条高速缓存行（$64$ KiB）不再装得进 32 KiB 的 L1 数据高速缓存，所以即使转换完美，每次访问也是一次 L2 命中。剩下的约 $3$ ns 差别是二级 TLB 和偶尔的遍历。好的实验一次只改一个条件；这里高速缓存足迹也随 $n$ 改变了，所以程序比较的是每个 $n$ 下的两种页大小，而不是不同的 $n$。在别的处理器上数字会不同，但台阶会出现在它们各自的 TLB 尺寸处。
:::
:::

::: exercise 嵌套转换 {level=3 check="24"}
在虚拟机里，客户机的虚拟地址由客户机的四级页表转换成客户物理地址，而每个客户物理地址——*包括客户机页表页的地址*——再由虚拟机监控器的四级表转换成宿主物理地址。若 TLB 与分页结构缓存都帮不上忙，一次客户机 TLB 缺失需要多少次内存引用（不含最后的数据访问）？推广到客户机 $n$ 级、宿主机 $m$ 级。（输入 $n = m = 4$ 的数值。）
::: solution
客户机遍历要读 $n$ 个客户机页表项。每次读之前，那张表的客户物理地址要由一次 $m$ 级宿主遍历转换（$m$ 次读），然后才能读表项本身（$1$ 次读）：$n(m + 1)$。最后，客户机遍历得到数据的客户物理地址，还需要再一次 $m$ 次读的宿主遍历。总计 $n(m+1) + m = nm + n + m = (n+1)(m+1) - 1$。$n = m = 4$ 时：$25 - 1 = 24$。这就是硬件辅助的虚拟化依赖大容量 TLB 与分页结构缓存、并从宿主机的大页获益巨大的原因（[[operating-systems/virtualisation]]）。
:::
:::

::: exercise 实现权限检查 {level=3}
把 Python 的 `translate` 函数扩展成索引 8 位、偏移 12 位（36 位地址）的三级表，PTE 带 `present`、`writable`、`user`、`nx` 位，访问由 `kind`（`'r'`、`'w'` 或 `'x'`）和 `user`（用户态为 True）描述。对不在场以及每种保护违例各抛出一个不同的异常，并用三个例子测试：从用户态访问一个内核页、向只读页写入、从 NX 页取指令。
::: solution
```python
from dataclasses import dataclass

@dataclass
class PTE:
    frame: int
    present: bool = True
    writable: bool = False
    user: bool = True
    nx: bool = False

class PageFault(Exception): pass
class ProtectionFault(Exception): pass

def translate(root, va, kind='r', user=True):
    idx = [(va >> s) & 0xFF for s in (28, 20, 12)]
    table = root
    for level, i in enumerate(idx):
        pte = table.get(i)
        if pte is None or not pte.present:
            raise PageFault(f"level {level + 1} entry {i} not present")
        if user and not pte.user:
            raise ProtectionFault("kernel page accessed in user mode")
        if level < 2:
            table = pte.frame          # 这里为简单起见，直接放下一张表本身
    if kind == 'w' and not pte.writable:
        raise ProtectionFault("write to read-only page")
    if kind == 'x' and pte.nx:
        raise ProtectionFault("instruction fetch from no-execute page")
    return (pte.frame << 12) | (va & 0xFFF)

leaf = {0: PTE(0x123, writable=True, nx=True),     # 数据
        1: PTE(0x124),                             # 代码：只读、可执行
        2: PTE(0x200, writable=True, user=False)}  # 内核数据
root = {0: PTE({0: PTE(leaf)})}
for va, kind in [(0x0000, 'w'), (0x1000, 'x'), (0x1000, 'w'), (0x0000, 'x'), (0x2000, 'r'), (0x3000, 'r')]:
    try:
        print(hex(va), kind, '->', hex(translate(root, va, kind)))
    except (PageFault, ProtectionFault) as e:
        print(hex(va), kind, '->', type(e).__name__ + ':', e)
```
```console
$ python3 perm.py
0x0 w -> 0x123000
0x1000 x -> 0x124000
0x1000 w -> ProtectionFault: write to read-only page
0x0 x -> ProtectionFault: instruction fetch from no-execute page
0x2000 r -> ProtectionFault: kernel page accessed in user mode
0x3000 r -> PageFault: level 3 entry 3 not present
```
在每一级都检查用户位，这仿照 x86-64：在用户态，只有路径上*每个*表项都允许，访问才被允许；真实硬件还会以同样的方式合并路径上的可写位。
:::
:::
