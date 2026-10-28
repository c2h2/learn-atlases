[[compilers/code-generation]] 里的 x86-64 代码不是孤立运行的。就是我们那三行 C 运行时，也会带进 `printf`，进而带进 C 库的带缓冲输入输出、库中调用 `main` 的启动代码，以及在那之前搭好栈的内核加载器。带闭包、对象和自动内存管理的语言需要的支持多得多：一种让函数的变量在它返回之后仍然存活的方法，一种为类只有运行期才能确定的对象找到正确方法的方法，还有一个找出并回收程序再也够不着的内存的**垃圾回收器**。这些支持编译进或链接进每一个程序，合称**运行时系统**。

编译器和运行时系统是放在一起设计的。编译器决定帧、闭包与对象的布局；运行时系统则依赖这种布局——垃圾回收器必须知道一个对象的哪些字是指针，还必须知道在它可能运行的每个点上，哪些栈槽装着活跃指针。本章把主要的几块都造出来：激活记录、**闭包转换**（附一个把小型函数式语言编译到 C 的编译器）、**虚拟方法表**（以及 GCC 如何优化穿过它的调用），还有垃圾回收器——**标记-清扫**、**Cheney 复制式回收器**、**分代**回收和带**三色不变式**的**增量**回收——每一个都是一个可运行的模拟器。

## 激活记录

::: definition 激活记录 {#def-frame}
**激活记录**（或**帧**）保存一次函数调用在其存续期间必须保持的状态：它的形参和不放在寄存器里的局部变量、保存的寄存器、返回地址，以及一条指向调用方帧的链接。当调用是嵌套的——每个调用都在它的调用者返回之前返回，且没有对帧的引用比其调用活得更久——帧就分配在**栈**上。
:::

::: example 递归能递归多深？ {#ex-depth}
我们代码生成器的帧已经极简。Mini 函数 `down(n)` 在 $n = 0$ 时返回 0，否则返回 `1 + down(n - 1)`。它在 [[compilers/code-generation]] 的后端下、配合 Linux 默认栈编译。栈上装得下多少层嵌套调用？超过了会发生什么？
::: solution
该函数编译成：

```text
mini_down:
    pushq   %rbp                # link to the caller's frame
    movq    %rsp, %rbp
    subq    $8, %rsp            # padding for alignment
    pushq   %rbx                # callee-saved register used for n
    movq    %rdi, %rbx
    ...
    subq    $1, %rbx
    movq    %rbx, %rdi
    call    mini_down
```

每次激活要占 32 个字节：返回地址、保存的 `%rbp`、8 字节填充和保存的 `%rbx`。Linux 默认给主线程 8 MiB 栈（`ulimit -s` 报 8192，单位 KiB），装得下 $8 \cdot 2^{20} / 32 = 262\,144$ 次激活。运行编译好的程序证实了这个算术：`down(260000)` 打印 260000，而 `down(270000)` 在栈撞到其下方未映射的警戒页时死于信号 11（`SIGSEGV`，段错误）。GCC 在 `-O2` 下把同样递归的 `fact` 变成了循环——它认出 `n * fact(n - 1)` 可以把乘积累加在一个寄存器里——所以它的帧从不会堆起来。Scheme 和大多数函数式语言*要求*尾位置的调用（其结果被直接返回的调用）以常数空间运行；`n * fact(n - 1)` 不是这样的调用，GCC 必须先引入一个累加器才行。
:::
:::

栈支配地位最初从何而来、又何时失效，[[programming-languages/scope-binding#prop-stack]] 已经研究过：只要没有函数值逃出创建它的那次调用，帧就能待在栈上。

## 闭包与闭包转换

嵌套在另一个函数内部的函数可以使用外层函数的变量。若内层函数只在外层函数活跃期间被调用，它可以通过一条**静态链**够到那些变量——静态链是存在自己帧里的、指向外围函数帧的指针（Algol 和 Pascal 就这么做；顺着 $d$ 条静态链走，就到达外面第 $d$ 层的变量）。但在一等函数的语言里，内层函数可以被返回、以后才被调用：

```text
let add = λn. λx. x + n in (add 1) 41
```

`add 1` 的值是一个加 1 的函数，它必须在 `add` 的调用返回之后仍然记得 $n = 1$。这种函数的运行期表示就是一个**闭包**（[[programming-languages/interpreters#def-closure]]）：它的代码，连同它的自由变量的值。

::: definition 闭包转换 {#def-closure-conversion}
**闭包转换**把一个带嵌套函数的程序翻译成每个函数都是闭合的（没有自由变量）、都定义在顶层的程序。每个带自由变量 $y_1, \dots, y_k$ 的 `λx. e` 变成：(1) 一个顶层函数 `code(env, x)`，其体是 $e$ 中每个 $y_i$ 替换成 `env[i]` 后的结果；(2) 在原来 λ 所在的位置，改为在堆上分配一个**闭包记录** `[code, y_1, …, y_k]`。调用 `f a` 变成 `apply(f, a)`，后者调用 `f[0](f, a)`。
:::

一项的自由变量按结构递归计算：$\mathrm{FV}(x) = \set{x}$，$\mathrm{FV}(\lambda x.\, e) = \mathrm{FV}(e) \setminus \set{x}$，其余情形对子项取并。转换器很短：

```python
class Converter:
    def __init__(self): self.funs, self.n = [], 0
    def expr(self, t, env):
        """t 的 C 表达式；env 把每个处于作用域内的变量映到读它的 C 表达式。"""
        k = t[0]
        if k == "int": return str(t[1])
        if k == "var": return env[t[1]]
        if k == "add": return f"({self.expr(t[1], env)} + {self.expr(t[2], env)})"
        if k == "app": return f"apply({self.expr(t[1], env)}, {self.expr(t[2], env)})"
        if k == "let":
            return f"({{ V {t[1]} = {self.expr(t[2], env)}; {self.expr(t[3], env | {t[1]: t[1]})}; }})"
        if k == "lam":                        # 闭包转换的核心
            fv = sorted(free_vars(t))
            self.n += 1; name = f"lam{self.n}"
            inner = {x: f"env[{i + 1}]" for i, x in enumerate(fv)} | {t[1]: t[1]}
            body = self.expr(t[2], inner)     # 代码：只能用它的形参和 env
            self.funs.append(f"static V {name}(V *env, V {t[1]}) {{ return {body}; }}")
            fields = ", ".join([f"(V){name}"] + [env[x] for x in fv])
            return f"closure({len(fv) + 1}, (V[]){{{fields}}})"   # 记录：代码 + 自由变量的值
```

每个值都是一个 C 的 `long`（`V`）：要么是一个整数，要么是一个闭包记录的地址。运行期支持只有两个函数：

```c
static V closure(int n, V *fields) { /* 一块堆上记录：[code, 自由变量 1, ...] */
    V *c = malloc(n * sizeof(V)); memcpy(c, fields, n * sizeof(V)); allocated += n * sizeof(V);
    return (V)c;
}
static V apply(V f, V a) { V *c = (V *)f; return ((V (*)(V *, V))c[0])(c, a); }
```

::: lemma 转换后的代码是闭合的 {#lem-closed}
在转换器的输出里，每个生成函数的体只引用它自己的形参和 `env`；并且若源项是闭合的，`main` 的表达式也是闭合的。
:::

::: proof
转换器把变量 $x$ 翻译成它所得映射中 `env[x]` 的那一项。翻译 `λx. e` 的体时，映射 `inner` 恰含 $x$（映到形参）和 $\lambda x.\, e$ 的自由变量（映到 `env[i]`），嵌套的 `let` 只添上它们自己绑定的名字，它们被声明为体内的 C 局部变量。对 $e$ 归纳：$e$ 中任何自由出现的变量要么是 $x$，要么属于 $\mathrm{FV}(\lambda x.\, e)$，而在 $e$ 内部绑定的变量由内层的映射处理；所以查找 `env[t[1]]` 永不失败，也永不产生函数之外的名字。对 `main`，初始映射为空，于是一个闭合项能无误地翻译出来，而它用到的 C 名字只有它自己的 `let` 所声明的那些。
:::

正确性还需要记录捕获的是*正确的值*：在每个 λ 处，转换器把每个自由变量当前的翻译填进记录——正是创建闭包时各环境变量表里的那些值，正如环境语义所要求的那样。

::: example 转换 compose {#ex-compose}
转换并运行

```text
let add = λn. λx. x + n in
let compose = λf. λg. λx. f (g x) in
compose (add 1) (add 10) 5
```
::: solution
转换器生成五个函数，每个 λ 一个（按各自翻译完成的次序编号，内层的先完成）：

```c
static V lam2(V *env, V x) { return (x + env[1]); }
static V lam1(V *env, V n) { return closure(2, (V[]){(V)lam2, n}); }
static V lam5(V *env, V x) { return apply(env[1], apply(env[2], x)); }
static V lam4(V *env, V g) { return closure(3, (V[]){(V)lam5, env[1], g}); }
static V lam3(V *env, V f) { return closure(2, (V[]){(V)lam4, f}); }
```

`λx. x + n` 有自由变量 $n$，所以它的记录是 `[lam2, n]`，其体读 `env[1]`。`compose` 最内层的 λ，`λx. f (g x)`，有自由变量 $f$ 和 $g$；它在 `lam4` 内部创建，那里 $f$ 本身是个自由变量（`lam4` 记录里的 `env[1]`）而 $g$ 是形参——于是 `closure(3, (V[]){(V)lam5, env[1], g})`。用 `gcc -O2 -Wall` 编译（无警告），程序打印 `16`，并报告闭包共 88 字节：11 个字，分属两个顶层闭包（各 1 个字）、`add` 返回的两个闭包（各 2 个），以及 `compose (add 1)`（2 个）和 `compose (add 1) (add 10)`（3 个）的闭包。

这些记录没有任何地方会释放。带闭包的语言需要一个垃圾回收器，因为一个闭包是否仍然可达取决于程序的动态行为。
:::
:::

闭包转换把自由变量的*值*复制进记录。若一个被捕获的变量可以被赋值，闭包和外层函数就必须共享它，于是编译器把这样的变量放进堆上分配的一个**箱子**（box，一元素的记录），复制的是指向箱子的指针——CPython 把箱子叫 *cell*，Java 则干脆要求被捕获的局部变量事实上最终（effectively final），以避开这件事。

## 对象与动态分派

在面向对象语言里，调用 `s->area()` 按 `s` 的运行期类来选择方法。标准实现——源自 Simula 67——是一张**虚拟方法表**。

::: definition 虚拟方法表 {#def-vtable}
每个类 $C$ 有一张 **vtable**：一个代码地址数组，每个虚方法一项，其中子类的方法与其超类占据相同的下标（覆写替换表项；新方法追加在后面）。类 $C$ 的每个对象都以一个指向 $C$ 的 vtable 的指针（**vptr**）开头，其后是它的字段：从超类继承的字段排在前面，且与在超类中的偏移相同。一次虚调用 `o.m(args)` 从 `o` 装入 vptr，按其固定下标装入 $m$ 的表项，并把 `o` 作为额外的第一个实参调用它。
:::

因为下标和字段偏移沿继承链保持一致，为一个类编译的代码无需改动就能用于每个子类的对象：这就是分派只花两次装载加一次间接调用、与类层次多深无关的道理。

::: example GCC 中的虚拟方法表与去分派 {#ex-vtable}
用 `g++ -O2`（GCC 15.2）编译：

```cpp
struct Shape { virtual long area() const = 0; virtual long sides() const { return 0; } long id; };
struct Rect : Shape { long w, h; long area() const override { return w * h; } long sides() const override { return 4; } };
struct Square : Rect { };
long total(const Shape *const *s, long n) { long t = 0; for (long i = 0; i < n; i++) t += s[i]->area(); return t; }
long sq() { Square s; s.w = s.h = 3; return s.area(); }
```
::: solution
GCC 为 `Rect` 发出的 vtable：

```text
vtable for Rect:
    .quad   0                       # 到对象顶部的偏移（用于多重继承）
    .quad   typeinfo for Rect       # 供 dynamic_cast 和 typeid 使用
    .quad   Rect::area() const      # <- vptr 指向这里：下标 0
    .quad   Rect::sides() const     #    下标 1
```

`Rect::area` 是 `movq 16(%rdi), %rax; imulq 24(%rdi), %rax`：对象布局是 vptr 在偏移 0，`id` 在 8，`w` 在 16，`h` 在 24。`total` 的循环里含有分派：

```text
.L8:
    movq    0(%r13,%rbx,8), %rdi    # s[i]
    movq    (%rdi), %rax            # 它的 vptr
    movq    (%rax), %rax            # vtable 表项 0：area
    cmpq    %r14, %rax              # 是 Rect::area 吗？
    je      .L12                    # 是：内联的 w * h，不用调用
    call    *%rax                   # 否：间接调用
```

GCC 对这个调用作了**推测性去分派**：它猜目标是 `Rect::area`——程序里 `area` 的唯一一处定义——把装入的地址与它比较，一旦相符就运行该方法的内联副本。对 `sq`，对象的类是精确已知的，所以调用在编译期就确定了，整个函数变成 `movl $9, %eax; ret`。
:::
:::

JavaScript 和 Smalltalk 这样的动态类型语言没有固定的方法下标：对象的方法按名字、经由它的类或原型查找。它们的实现用**内联缓存**（Deutsch 与 Schiffman，1984 年）让查找变快：每个调用点记住它上次见到的类和找到的方法，先核对类、再直接跳到方法——和 GCC 的推测性去分派是同一条守卫，只不过在运行期填充。

## 垃圾回收

运行中程序的堆是一张有向图，顶点是对象，边是指针字段（[[computer-systems/dynamic-memory#def-reachable]]）。**根**是堆外持有的指针：寄存器、栈槽和全局变量里的指针。一个从任何根都不可达的对象再也无法被使用；**追踪式**回收器通过图搜索找出可达对象，回收其余的。

::: theorem 追踪式回收是安全的 {#thm-tracing}
若一个对象在某个时刻从根不可达，那么它在其余下的整个执行中都保持不可达，所以回收器可以在任何稍后的时刻释放它。
:::

::: proof
程序（回收术语里的**修改器**）取得一个指针，只有两种途径：分配一个新对象，或者从某个根、或从一个它已持有其指针的对象的某个字段里读出一个指针——后一种情况里那个对象是可达的，因为持有的指针本身就是一根根。存入一个指针会添一条以可达对象为目标的边；改写则删除边。对执行步数归纳：凡被创建的边都指向当时可达或刚刚分配的对象。所以没有任何一步会造出一条通往不可达对象的路径，一个时刻不可达的对象将永远不可达。（这需要一种没有指针算术、也不能从整数强转出指针的语言：C 程序能凭空捏造指针，这就是针对 C 的回收器必须**保守**的原因。）
:::

下面的回收器都在一个模拟堆上运行：内存是一个字的列表；一个对象是一个装着字段数的头字，后面跟着各字段；指针是一个带标记的地址 `('ptr', a)`。真正的回收器从编译器得到同样的信息：带大小的对象头，以及说明哪些字段是指针的类型描述符。

### 标记-清扫

**标记-清扫**（McCarthy，1960 年）用深度优先搜索标记从根可达的每个对象，然后线性扫过整个堆，把每个未标记的对象释放：

```python
def mark_sweep(heap, roots):
    marked, stack = set(), [r[1] for r in roots if is_ptr(r)]
    while stack:                            # 标记：从根出发深度优先搜索
        a = stack.pop()
        if a in marked: continue
        marked.add(a)
        stack += [v[1] for v in heap.fields(("ptr", a)) if is_ptr(v)]
    free, a = [], 1
    while a < heap.top:                     # 清扫：访问堆中的每个对象
        if a not in marked: free.append(a)
        a += 1 + heap.mem[a]
    return marked, free
```

标记花与可达数据成正比的时间；清扫与整个堆成正比。被释放的对象进入空闲链表，堆像 [[computer-systems/dynamic-memory]] 里那样变得碎片化。

### 复制式回收

**复制式**回收器把堆分成两个**半空间**，在其中一个里靠 bump 指针分配——那已是分配能有的最低代价。它装满时，回收器把每个可达对象复制到另一个半空间，顺手把它们压紧，然后两个半空间互换角色。Cheney 1970 年的算法既不要栈也不要递归：to-space 本身就是广度优先搜索的队列。

```python
def cheney(old, roots):
    """把所有从 roots 可达的对象复制进一块新堆；返回新堆与新根。"""
    new = Heap(old.size); cheney.copied = 0
    def copy(v):
        if not is_ptr(v): return v
        a = v[1]
        if not isinstance(old.mem[a], tuple):   # 还没复制：复制它，然后把它的
            b = new.alloc(old.fields(v))[1]     # 头字改写为一个转发指针
            old.mem[a] = ("fwd", b); cheney.copied += 1
        return ("ptr", old.mem[a][1])
    roots = [copy(r) for r in roots]
    scan = 1
    while scan < new.top:                   # scan 与 top 之间的对象是灰色的
        n = new.mem[scan]
        for i in range(n):
            new.mem[scan + 1 + i] = copy(new.mem[scan + 1 + i])
        scan += 1 + n
    return new, roots
```

一个对象被复制后，它旧的头字被一个指向副本的**转发指针**改写，于是后来指向它的指针都被引向同一个副本，而不是复制两次。

::: theorem Cheney 算法 {#thm-cheney}
`cheney` 把每个从根可达的对象恰好复制一次，不复制其他对象；被复制的对象连同被改写的指针构成的图，与旧堆的可达部分同构。它的运行时间为 $O(R + W)$，其中 $R$ 是根的个数，$W$ 是可达对象的字数，与垃圾的量无关。
:::

::: proof
称尚未复制的旧对象为*白*；称其副本位于 `scan` 与 `top` 之间的旧对象为*灰*（已复制，但它的字段仍指向旧空间）；称其副本位于 `scan` 之下的旧对象为*黑*（所有字段都已改写）。不变式：黑色副本的任何字段都不指向旧空间；灰对象或黑对象的原生字段、或者某个根所指向的每个旧对象都已被复制。最初诸根都已复制，且不存在黑对象。处理 `scan` 处的灰对象时，把它指向的每个白对象复制（染灰），把每个字段改写指向副本——经由转发指针找到——并推进 `scan`，使该对象变黑。`scan` 到达 `top` 时不再存在灰对象，于是从根经某条路径可达的每个对象都已被复制：按路径长度归纳，路径上的每个对象都是某个黑对象的字段所指。反过来，一个对象只有当某个根或某个已复制对象的字段指向它时才会被复制，所以只有可达对象被复制，而转发指针杜绝了第二次复制。把每个被复制对象映到其副本的映射是一个双射，它把每个指针字段映到指向其目标副本的指针：一个同构。每个根和可达对象的每个字都只被处理一次，每次常数时间。
:::

::: example 一次回收，逐步演算 {#ex-cheney}
堆里放着七个对象，分配次序为 $E, C, A, B, F, D, G$；根指向 $A$ 和 $B$，$A$ 和 $B$ 都指向 $C$，$C$ 指向 $E$，$D$ 与 $F$ 互相指向对方，没有东西指向 $G$。运行标记-清扫和 Cheney 算法。
::: solution
旧堆用了 19 个字（地址 1 到 19：$E$ 在 1，$C$ 在 3，$A$ 在 6，$B$ 在 9，$F$ 在 12，$D$ 在 15，$G$ 在 18）。标记-清扫标记地址 $\set{1, 3, 6, 9}$，释放 $[12, 15, 18]$——圈 $D \leftrightarrow F$ 和 $G$。Cheney 算法把 4 个对象复制进 11 个字：

```text
copied 4 objects; new top = 12 roots -> [('ptr', 1), ('ptr', 4)]
  1 [2, ('ptr', 7), 1]      A: header 2, then its pointer to C and the integer 1
  4 [2, ('ptr', 7), 2]      B
  7 [2, ('ptr', 10), 3]     C
  10 [1, 5]                 E
```

对象按从根出发的广度优先次序到达：$A$ 和 $B$（处理根时复制），然后 $C$（扫描 $A$ 时找到；扫描 $B$ 时，$C$ 的转发指针把 $B$ 的字段引到 7 处同一个副本），然后 $E$。存活对象如今连续排列，空闲空间是从地址 12 起的一整块，而垃圾从头到尾没被看过一眼。

::: widget graph
nodes: roots@0,2; A@2,3; B@2,1; C@4,2; E@6,2; D@4,0; F@6,0; G@6,4
edges: roots>A; roots>B; A>C; B>C; C>E; D>F; F>D
algorithm: bfs
start: roots
caption: [[#ex-cheney]] 的堆。从 `roots` 运行广度优先搜索：它访问 $A$、$B$、$C$、$E$——正是 Cheney 算法把对象放进 to-space 的次序，因为 `scan` 与 `top` 之间的区域就是搜索的队列。$D$、$F$ 和 $G$ 永不访问；复制式回收器的代价与它们无关。
:::
:::
:::

复制式回收的代价取决于给它多少内存。设每次回收时有 $L$ 个字活着、两个半空间各有 $H/2$ 个字，则每次回收复制 $L$ 个字，然后为下一轮腾出 $H/2 - L$ 个字的分配空间，于是每个分配字的复制工作量为

$$
\frac{L}{H/2 - L} = \frac{1}{r/2 - 1}, \qquad r = H / L.
$$ {#eq-gc-cost}

一个保持 300 个字存活、共分配 60 000 个字的模拟修改器证实了公式：$r = 2.5, 3, 4, 6, 8, 10$ 时，每个分配字的复制代价实测为 4.145、2.03、1.005、0.495、0.33 和 0.245，预言值是 4.0、2.0、1.0、0.5、0.333 和 0.25。

::: widget plot
f: c/(x/2 - 1)
x: 2.2, 12
y: 0, 6
sliders: c=1:0.5:3:0.25
labels: \text{每个分配字的垃圾回收工作量}
points: 2.5,4.145; 3,2.03; 4,1.005; 6,0.495; 8,0.33; 10,0.245
caption: 每个分配字的复制式回收代价 $c / (r/2 - 1)$（来自 [[#eq-gc-cost]]），对堆大小与活数据之比 $r$ 作图，其中 $c$ 是复制一个字相对于分配一个字的代价。圆点是模拟的实测值。堆只比活数据的两倍大一点时，回收占去大头；$r = 6$ 时每分配一个字只摊到半个字的复制。垃圾回收用内存换时间，内存足够多时，它可以比显式释放更便宜。
:::

### 分代回收

大多数对象年少夭亡：临时字符串、迭代器、中间结果。这条**弱分代假说**——在 Lisp 和 Smalltalk 系统中观察到，后来在 Java、.NET 和 JavaScript 中亦然——提示我们多回收最近分配的对象、少回收老对象。一个**分代**回收器在一个小小的**育婴区**（nursery）里分配；一次**小回收**只从根出发追踪育婴区，把存活者**晋升**到**老代**，老代由偶尔运行的**大回收**回收。

小回收不追踪老代，就会漏掉只被老对象引用的年轻对象。编译器因此在每次指针存储处发出一条**写屏障**：几条指令，当某个老对象被改为指向一个年轻对象时，把该老对象登记进一个**被记住集合**（remembered set），小回收把它当作额外的根。在 [[#ex-generational]] 的模拟器里，一张老 `table` 收到了指向新 `entry` 的指针：没有屏障时，`entry` 会在下一次小回收中被丢掉（`freed: ['entry', 'tmp']`）；有屏障则保住了（`freed: ['tmp']`）。

### 增量回收与三色不变式

一个在整个回收期间暂停程序的回收器，会造成与活数据成正比的**停顿**——对交互和实时程序不可接受。**增量**回收器把标记与修改器交替进行；**并发**回收器则在另一个核上与修改器同时运行。困难在于：回收器遍历图的同时，修改器在改这张图。

::: definition 三色抽象 {#def-tricolour}
标记期间，每个对象或是**白**（尚未到达）、**灰**（已到达，但它的字段尚未扫描）或**黑**（已到达，且所有字段都已扫描）。标记从根的目标为灰、其余一切为白开始，反复执行"把一个灰对象的白色孩子染灰后把它染黑"，直到不再剩灰对象；那时把白对象释放。**强三色不变式**说的是：没有黑对象指向白对象。
:::

::: theorem 三色标记是安全的 {#thm-tricolour}
若强三色不变式在整个标记期间成立，且根从不指向白对象（根一旦开始指向某个对象，回收器就把它染色），那么当不再有灰对象时，每个白对象都不可达。
:::

::: proof
不再有灰对象时，每个对象非黑即白。设某个白对象 $w$ 可达，经由一条从某根出发的路径。根的目标不是白的，所以这条路径从某个黑对象出发、到达白的 $w$；沿途某处必有一条从黑对象到白对象的边。这与不变式矛盾。
:::

没有援助时，修改器很容易破坏不变式。在这个场景里，$R$（根对象）和 $A$ 已被扫描（黑），$B$ 是灰的且指向白的 $C$。修改器把 $B$ 指向 $C$ 的指针抄进 $A$，然后清空 $B$ 的这个字段。回收器随后扫描 $B$，什么也没发现，于是释放 $C$——而 $A$ 还指着它。补救还是要靠写屏障：**Dijkstra 插入型屏障**把每次存入的指针的目标染灰，于是黑对象永远不可能得到一条指向白对象的指针。

```python
class Incremental:
    def __init__(self, objects, roots, barrier):
        self.obj, self.barrier = objects, barrier        # objects：名字 -> 各字段所指对象的列表
        self.colour = {o: "white" for o in objects}
        self.grey = []
        for r in roots: self.shade(r)
    def shade(self, o):
        if o is not None and self.colour[o] == "white":
            self.colour[o] = "grey"; self.grey.append(o)
    def step(self):                                      # 回收器：把一个灰对象染黑
        if not self.grey: return False
        o = self.grey.pop(0)
        for t in self.obj[o]: self.shade(t)
        self.colour[o] = "black"; return True
    def write(self, o, i, t):                            # 修改器：o.field[i] = t
        if self.barrier: self.shade(t)                   # Dijkstra 插入型屏障
        self.obj[o][i] = t
```

运行该场景：

```text
no barrier -> freed: ['C']  reachable: ['A', 'B', 'C', 'R']  ERROR
barrier -> freed: []  reachable: ['A', 'B', 'C', 'R']  ok
```

::: quiz
Dijkstra 插入型屏障保证哪个性质？它为什么对 [[#thm-tricolour]] 已经足够？
- [ ] 它保证任何对象都不会被染灰两次，所以标记终止
- [x] 任何一次存储 `o.f = t` 之后，目标 `t` 不再是白的，所以没有存储能造出黑到白的指针
- [ ] 它保证修改器从不读一个白对象
- [ ] 它把修改器写入的每个对象都变成黑的
::: solution
屏障在存入之前就把 `t` 染色，所以存入之后 `t` 是灰的或黑的，新边 `o → t` 无论 `o` 是什么颜色都不可能是黑到白。存入是唯一种造边的操作，而回收器自身的步骤保持不变式（灰对象要等它所有白的孩子都染灰之后才变黑）。于是强不变式全程成立，定理适用。屏障可能让一些在标记期间变成垃圾的对象活下来——即使指向 `t` 的指针立刻被覆盖，`t` 仍保持灰——但那些会在下次回收时释放。**Yuasa 删除型屏障**是主要的替代方案：它给被覆盖指针的*旧*目标染色，这保持一个较弱的不变式（每个被黑对象指向的白对象，也都能经白对象从某个灰对象到达），并保住标记开始时一切可达的东西。
:::
:::

::: warning 漏掉一根根就是无声的破坏
回收器只和编译器给出的根清单一样正确。若生成的代码在一次回收运行时把一个指针握在寄存器里、或握在回收器不知道的栈槽里，标记-清扫回收器就可能释放那个对象，复制式回收器则会把它搬走，留下那根藏起来的指针对着被遗弃的 from-space 副本。犯错的那一刻什么也不会失败；程序在很久之后读到陈旧数据，而且常常只在内存吃紧时才发作。这就是为垃圾回收而生的语言的编译器要发出**栈地图**的原因——对每个**安全点**（一次调用或一次分配，回收可能在那里发生），列出装着活跃指针的栈槽与寄存器集合——由 [[compilers/dataflow-optimisation]] 的活跃性分析算出。在为带回收的运行时编写的 C 扩展里，程序员必须手工维护根：CPython 的引用计数（`Py_INCREF`、`Py_DECREF`）、Java 的 JNI 局部与全局引用、OCaml 的 `CAMLparam` 与 `CAMLlocal` 宏，全都是为此而设，忘了一个就是海森 bug 的经典来源。
:::

::: history
Edsger Dijkstra 的 "Recursive programming"（1960 年）为 Algol 60 引入了存放激活记录的运行期栈，Brian Randell 与 Lawford Russell 的 *ALGOL 60 Implementation*（1964 年）描述了显示表和静态链。Peter Landin 的 SECD 机（1964 年）把闭包定义为代码加环境；随着 1970 年代末和 1980 年代的 Scheme 编译器——Guy Steele 的 Rabbit（1978 年）、Kranz 等人的 Orbit（1986 年）——闭包转换成了编译器的标准做法，Appel 的 *Compiling with Continuations*（1992 年）则把它带到了 Standard ML。Simula 67（Ole-Johan Dahl 与 Kristen Nygaard）引入了类、继承和虚过程，实现手段就是后来的 vtable；C++（Bjarne Stroustrup，自 1979 年）使它们成为业界标准。L. Peter Deutsch 与 Allan Schiffman 的 Smalltalk-80 实现（POPL 1984）引入了内联缓存，Urs Hölzle、Craig Chambers 与 David Ungar（1991 年）又为 Self 把它扩展成多态内联缓存。John McCarthy 为 LISP 发明了垃圾回收（"Recursive functions of symbolic expressions"，1960 年，标记-清扫），George Collins 在同一年描述了引用计数。Robert Fenichel 与 Jerome Yochelson（1969 年）引入了半空间复制，C. J. Cheney 的 "A nonrecursive list compacting algorithm"（*CACM* 1970 年）给出了广度优先版本。Dijkstra、Lamport、Martin、Scholten 与 Steffens 的 "On-the-fly garbage collection"（*CACM* 1978 年）引入三色抽象。Henry Lieberman 与 Carl Hewitt（1983 年）提出分代回收，David Ungar 的 "Generation scavenging"（1984 年）使它走向实用。Hans Boehm 与 Mark Weiser 针对 C 的保守回收器（1988 年）至今仍在服役。Richard Jones 与 Rafael Lins 的 *Garbage Collection*（1996 年），及其续作 Jones、Hosking 与 Moss 的 *The Garbage Collection Handbook*（2011 年；第 2 版 2023 年）则对这一领域作了综述。
:::

## 后续内容

本章结束了本课程从源正文到运行中程序的旅程：词法分析、语法分析、检查、降低、优化、代码生成，加上运行时的支撑。现代系统模糊了这些阶段。**即时**编译器（HotSpot、V8、PyPy、LuaJIT）在程序运行时编译，利用解释器收集的信息（profile）把代码特化到实际见到的类型和路径上，并在一次推测失败时**去优化**——退回解释器执行。**多层 IR**（如 MLIR）让编译器用同一套基础设施穿过好几个抽象层次逐步降低。而这些语言自身的语义——本课程一直把它们当作给定的——是 [[programming-languages]] 的研究对象。

::: summary
- 程序的运行时系统提供**激活记录**栈、堆分配、分派和垃圾回收；编译器定下它所依赖的各种布局。
- 逃出定义它的调用的函数需要**闭包**：**闭包转换**把每个 λ 变成闭合的顶层代码加上其自由变量的堆记录（[[#def-closure-conversion]]、[[#lem-closed]]）；我们的转换器把 `compose (add 1) (add 10) 5` 编译成打印 16 的 C。
- **vtable** 让分派只需两次装载和一次间接调用，方法下标与字段偏移沿继承链固定；GCC 猜得到目标时就**推测性去分派**，内联缓存在运行期做同样的事。
- 追踪式回收安全，因为不可达对象保持不可达（[[#thm-tracing]]）。**标记-清扫**花与堆成正比的时间；**Cheney 复制式回收器**是一次穿过 to-space 的广度优先搜索，只花与活数据成正比的时间（[[#thm-cheney]]），每个分配字复制 $1/(r/2 - 1)$ 个字（[[#eq-gc-cost]]）。
- **分代**回收器利用大多数对象早夭的规律，用写屏障和被记住集合对付老到年轻的指针；**增量**回收器维护**三色不变式**（[[#thm-tricolour]]），同样要靠写屏障。
- 回收器依赖编译器给出精确的根：安全点处的**栈地图**，由活跃性分析算出。
:::

## 习题

::: exercise 帧大小与递归深度 {level=1 check="131072"}
一个函数的帧是 64 字节（含返回地址和保存的寄存器）。忽略栈上的一切其他东西，8 MiB 的栈装得下多少层嵌套激活？（填入数字。）
::: solution
$8 \text{ MiB} = 8 \cdot 2^{20} = 8\,388\,608$ 字节，而 $8\,388\,608 / 64 = 131\,072 = 2^{17}$。`mini_down` 的帧是 32 字节，所以它的上限是 $2^{18} = 262\,144$，与在深度 260 000 和 270 000 之间观察到的崩溃相一致（栈上还放着环境、C 运行时的帧和 `main` 的帧）。
:::
:::

::: exercise 自由变量 {level=1 check="3"}
在 `let f = … in let g = … in λy. λx. f (g x) + y` 中，内层 λ 表达式 `λx. f (g x) + y` 有几个自由变量？（填入数字。）
::: solution
$\mathrm{FV}(\lambda x.\, f\,(g\,x) + y) = \set{f, g, x, y} \setminus \set{x} = \set{f, g, y}$：**3**。被外层的 `let` 或 λ 绑定，并不妨碍一个变量在内层表达式中是自由的——自由是表达式自身的性质，而闭包要捕获的恰恰就是它。我们的转换器会构造记录 `[code, f, g, y]`（变量按名字排序），4 个字。若 $f$ 和 $g$ 在顶层绑定到已知函数，编译器本可以直接调用它们而不必捕获；这一精化属于 **λ 提升**，也属于 ML 和 Scheme 编译器里闭包转换的优化。
:::
:::

::: exercise 手工 Cheney {level=1 check="8"}
根按次序指向 $P$ 和 $Q$。$P$ 有两个字段，指向 $Q$ 和 $R$；$Q$ 有一个字段，指向 $P$；$R$ 有一个整数字段；$S$ 有两个字段，指向 $R$ 和 $P$，但没有东西指向 $S$。按模拟器的布局（一个头字，然后是字段；to-space 地址从 1 开始），Cheney 算法把每个对象放在哪里？结束时 `top` 是多少？（填入 `top` 的值。）
::: solution
先处理根：$P$（头字 + 2 个字段）被复制到地址 1–3，$Q$（头字 + 1 个字段）到 4–5。扫描 1 处的 $P$：它指向 $Q$ 的字段查到 $Q$ 的转发指针，变成 `('ptr', 4)`；它指向 $R$ 的字段把 $R$ 复制到 6–7。扫描 4 处的 $Q$：它指向 $P$ 的字段被转发到 1。扫描 6 处的 $R$：没有指针。`scan` 追上 `top` = **8**。$S$ 从未被碰过。模拟器给出同样的 to-space：从地址 1 起为 `[2, ('ptr', 4), ('ptr', 6), 1, ('ptr', 1), 1, 9]`，`top` = 8。
:::
:::

::: exercise 写屏障 {level=2}
（a）用每一步三种颜色的形式给出三色一节的那个场景，指出不变式在哪里被破坏。（b）证明 Yuasa 删除型屏障（覆盖一个字段之前，先给它旧的目标染色）在那个场景里同样救得了 $C$。（c）为什么分代回收器和增量回收器都需要写屏障？一道屏障能否同时服务两个目的？
::: solution
（a）回收器走两步之后：$R$ 黑，$A$ 黑（它的字段还是空的时候被扫描过），$B$ 灰，$C$ 白。修改器存入 `A.f = C`：此刻黑的 $A$ 指向白的 $C$——强不变式被破坏。接着它存入 `B.f = null`，抹掉了通往 $C$ 的唯一一条灰到白的路。回收器扫描 $B$（无物可染）后收工；$C$ 是白的，被释放了，尽管 $A$ 还可达它。

（b）用删除型屏障，存入 `A.f = C` 覆盖的是一个空值，什么都不染；存入 `B.f = null` 覆盖的是指向 $C$ 的指针，于是 $C$ 先被染灰。回收器随后扫描 $C$，没有可达的东西被释放。删除型屏障保持的是"起始快照"：标记开始时每个可达的对象都被标记。

（c）两者都必须知道修改器何时造出了回收器的部分视图会漏掉的指针：从老对象到年轻对象（分代）或从黑对象到白对象（增量）。一个屏障例程常常一举两得：每次指针存储都运行的屏障代码检查源与目标所在的分代和标记状态，相应地记录或染色。工业界回收器（如 Java 的 G1）会把用于分代的卡标记屏障和用于并发标记的快照屏障一起使用。
:::
:::

::: exercise 分代回收 {level=2 #ex-generational}
实现一个最小的分代回收器，对象表示为名字到字段所指对象列表的字典：分配加进育婴区；小回收只从根和被记住集合出发追踪育婴区里的对象，释放没被追到的育婴区对象并把存活者晋升；写屏障在把指向年轻对象的指针存入老对象时，把该老对象加入被记住集合。演示屏障的必要性。
::: solution
```python
class Generational:
    def __init__(self, barrier=True):
        self.obj, self.young, self.remembered, self.barrier = {}, set(), set(), barrier
    def new(self, name, fields):
        self.obj[name] = list(fields); self.young.add(name); return name
    def write(self, o, i, t):
        if self.barrier and o not in self.young and t in self.young:
            self.remembered.add(o)          # 一个老对象现在指向了一个年轻对象
        self.obj[o][i] = t
    def minor(self, roots):
        """只从根和被记住的老对象出发，追踪年轻对象。"""
        live, work = set(), [r for r in roots if r in self.young]
        for o in self.remembered: work += [t for t in self.obj[o] if t in self.young]
        while work:
            o = work.pop()
            if o in live: continue
            live.add(o); work += [t for t in self.obj[o] if t in self.young]
        dead = self.young - live
        for o in dead: del self.obj[o]
        self.young, self.remembered = set(), set()   # 存活者晋升到老代
        return sorted(dead)

for barrier in (False, True):
    h = Generational(barrier)
    h.new("table", [None]); h.minor(["table"])          # table 存活：现在是老对象
    h.new("tmp", []); h.new("entry", [])               # 两个年轻对象
    h.write("table", 0, "entry")                        # 老 -> 年轻指针
    print("barrier" if barrier else "no barrier", "freed:", h.minor(["table"]))
```

输出：`no barrier freed: ['entry', 'tmp']` 和 `barrier freed: ['tmp']`。根 `table` 是老的，所以小回收不追踪它；只有被记住集合揭示了 `entry` 是可达的。一次小回收的代价与育婴区存活对象加上被记住集合成正比，而与老代无关——这正是这套设计的要点。
:::
:::

::: exercise 引用计数与圈 {level=2}
（a）解释为什么引用计数回收不了一个圈。（b）在 CPython 里演示它：用 `gc.disable()`、一个两对象圈，并用 `weakref` 观察对象是否存活，然后调用 `gc.collect()`。（c）说出两种让引用计数系统对付圈的技术。
::: solution
（a）圈里每个对象都被圈中它的前驱指着，所以即便圈外没有任何东西指向它，它的计数也至少是 1；计数永远到不了零。

（b）

```python
import gc, weakref
class Node: pass
gc.disable()
a, b = Node(), Node(); a.other, b.other = b, a
probe = weakref.ref(a)
del a, b
print("after del:", probe() is not None)      # True：这个圈还活着
print("collected:", gc.collect() >= 2, "after collect:", probe() is not None)
```

先打印 `after del: True`，再打印 `collected: True after collect: False`（CPython 3.14.4 上）：单靠引用计数留住了那对不可达对象，而 CPython 后备的圈回收器——一个对容器对象运行的追踪式回收器——把它回收了。

（c）后备的追踪式回收器，如 CPython 所用；试探删除（Bacon 与 Rajan 的同步圈回收，2001 年），它在一个嫌疑圈内试探性地递减计数，看它们能否归零；或者靠程序员的自律使用**弱引用**——不计数，如 Swift 的 `weak` 和 C++ 的 `std::weak_ptr`。
:::
:::

::: exercise 标记-清扫对复制 {level=3}
把标记-清扫的代价建模为每次回收 $c_m L + c_s H$（标记活数据 $L$、清扫堆 $H$），释放 $H - L$ 个字。（a）导出每个分配字的代价，并与 [[#eq-gc-cost]] 比较。（b）若 $c_m = c_s = 1$、复制每字花费 1，比值 $r = H/L$ 在什么范围时复制更便宜？（c）说出这个模型漏掉的两种代价。
::: solution
（a）标记-清扫：$\dfrac{c_m L + c_s H}{H - L} = \dfrac{c_m + c_s r}{r - 1}$，当 $r \to \infty$ 时趋于 $c_s$——清扫永不是免费的，因为它的代价随堆增长。复制：$\dfrac{1}{r/2 - 1} = \dfrac{2}{r - 2}$，趋于 $0$。

（b）复制更便宜当 $\dfrac{2}{r - 2} < \dfrac{1 + r}{r - 1}$，即 $2(r - 1) < (1 + r)(r - 2) = r^2 - r - 2$，亦即 $r^2 - 3r > 0$，即 $r > 3$（在复制有定义的 $r > 2$ 之内）。内存少（$2 < r < 3$）时标记-清扫占优；内存多时复制占优，而且内存越多它的代价越低。

（c）复制为同样的堆要两倍的内存，而且要搬动对象——这要付出缓存缺失，还要求精确的指针信息；标记-清扫使堆碎片化，且分配比 bump 指针慢。两个模型都没算压紧之后修改器局部性的改善、写屏障的代价和停顿时间。真正的回收器把诸技术组合起来：育婴区用复制，老代用标记-清扫或标记-压紧。
:::
:::

::: exercise 可变的被捕获变量 {level=3}
给闭包转换器添加一条给变量赋值的语句 `set x e`，使 `let c = 0 in let inc = λu. set c (c + 1) in …` 能给出一个计数器。（a）解释为什么把值复制进闭包记录会坏事。（b）描述用箱子的转换：哪些变量需要装箱，读和写如何翻译。（c）Java 对此的要求是什么？为什么？
::: solution
（a）`inc` 的闭包里装的将是对 `c` 求值时刻其值的副本，即 0。`inc` 里的赋值即便改了点什么，改的也是副本，外层函数和其他捕获了 `c` 的闭包都看不见；每次调用看到的都是同一份陈旧的值。

（b）找出那些既被某个 λ 捕获、又在任何地方被赋值的变量（一个简单句法分析）。每个这样的变量在绑定时分配为一个字的堆上箱子：`V c = box(0)`。读变成 `((V *)c)[0]`，`set c e` 变成 `((V *)c)[0] = e`，定义它的函数和闭包里的都如此改，而闭包的记录里捕获的是指向箱子的*指针*。所有闭包与外层作用域共享这个箱子，于是更新处处可见。没被捕获、或从不被赋值的变量不需要箱子，留在寄存器里。CPython 的 cell（`LOAD_DEREF`、`STORE_DEREF`）和 Scheme 编译器的赋值转换做的正是这件事。

（c）Java 只允许 λ 或内部类捕获**事实上最终**的局部变量——初始化后从不被赋值——所以复制它的值永远正确，用不着箱子。想要一个共享可变计数器的程序员必须显式分配一个可变对象（一个 `AtomicInteger` 或一个一元素数组），把箱子摆在源代码里。
:::
:::
