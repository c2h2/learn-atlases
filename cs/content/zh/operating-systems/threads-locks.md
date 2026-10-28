下面是一个 C 程序，其中两个线程各自给一个共享计数器加一，各执行一百万次：

```c
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

static volatile long counter = 0;          /* 共享；volatile 使每次 ++ 都落在内存中 */

static void *work(void *arg) {
    long n = *(long *)arg;
    for (long i = 0; i < n; i++)
        counter++;                           /* 载入、加、存回：不是原子的 */
    return NULL;
}

int main(int argc, char *argv[]) {
    long n = argc > 1 ? atol(argv[1]) : 1000000;
    pthread_t a, b;
    pthread_create(&a, NULL, work, &n);
    pthread_create(&b, NULL, work, &n);
    pthread_join(a, NULL);
    pthread_join(b, NULL);
    printf("expected %ld, got %ld\n", 2 * n, counter);
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -O2 -pthread -o race race.c
$ ./race; ./race; ./race
expected 2000000, got 1016775
expected 2000000, got 1022792
expected 2000000, got 1003549
$ ./race 1000
expected 2000, got 2000
```

一半的加一运算凭空消失，而且每次运行丢掉的数目都不同。每个线程只加一千次时答案是对的——每个线程都在另一个真正开始之前就干完了——这正是这类缺陷能在测试中存活的原因。这个程序的输出是**不确定的**（nondeterministic）：你得到的数字会不一样。

本章解释错在哪里、如何预防。我们定义线程，看清它为何有用而便宜；精确分析上面的**竞争条件**；说明**临界区问题**的解必须保证什么；纯靠软件证明一个解的正确性——Peterson 算法——然后眼看它在真实的 x86 处理器上失败；再用硬件提供的原子指令构造**锁**，从 test-and-set 自旋锁，经公平的门票锁，直到 `pthread_mutex_lock` 实际上就是的那个基于 futex 的互斥锁。[[operating-systems/synchronisation]] 接续讨论等待条件、信号量与死锁。

程序都用 GCC 15.2 以 `gcc -std=c17 -Wall -Wextra -O2 -pthread` 编译，测试机有 36 个核心。本章每个并发程序的时间都不确定，有缺陷的程序结果也不确定；所示输出都是真实运行。

## 线程

::: definition 线程 {#def-thread}
**线程**是进程内一条顺序的控制流。每个线程有自己的程序计数器、寄存器和栈（以及自己的线程局部存储）；一个进程的所有线程共享它的地址空间——代码、全局变量、堆——以及它的打开文件、信号处理程序和凭据。单线程进程就是 [[computer-systems/exceptions-processes#def-process]] 里的那个进程。
:::

线程因两个理由而存在。**并行**：分成若干线程的计算可以同时跑在多个核心上——一个拥有 $36$ 个线程的进程就能用满整台测试机。**重叠等待**：一个线程阻塞着读磁盘或网络时，服务器可以由另一个线程服务某个客户，而不必把代码扭曲成状态机。这两件事进程也能做，但线程更便宜，而且通过读写共享内存就能通信。

上面的清单使用的是 POSIX 线程接口（`pthread_create`、`pthread_join`、`pthread_exit`）。在 Linux 上，每个线程都是独立的内核**任务**，由 `clone` 系统调用带着诸如 `CLONE_VM`（共享地址空间）、`CLONE_FILES` 和 `CLONE_SIGHAND` 的标志创建——`fork` 基本上就是不带这些标志的 `clone`。这种**一对一**模型让内核能把线程调度到不同核心上，也能阻塞其中一个而不阻塞其余的。**用户级**线程（绿色线程、协程、goroutine）由运行时库复用到较少的内核线程上；它们切换更快、不需要系统调用，但必须留心别让一次阻塞调用卡住全部。

::: example 线程比进程便宜 {#ex-create}
在一个已使用 100 MiB 内存的进程里，测量创建并回收一个什么也不干的线程的代价，以及 `fork` 并回收一个立即退出的子进程的代价。

```c
#define _POSIX_C_SOURCE 200809L
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <time.h>
#include <unistd.h>

static void *nothing(void *arg) { return arg; }

static double now(void) {
    struct timespec t;
    clock_gettime(CLOCK_MONOTONIC, &t);
    return t.tv_sec + t.tv_nsec * 1e-9;
}

int main(void) {
    enum { N = 10000 };
    char *big = malloc(100 << 20);             /* fork 必须映射的 100 MiB */
    for (long i = 0; i < (100 << 20); i += 4096) big[i] = 1;
    double t0 = now();
    for (int i = 0; i < N; i++) {
        pthread_t t;
        pthread_create(&t, NULL, nothing, NULL);
        pthread_join(t, NULL);
    }
    double t1 = now();
    for (int i = 0; i < N; i++) {
        pid_t p = fork();
        if (p == 0) _exit(0);
        waitpid(p, NULL, 0);
    }
    double t2 = now();
    printf("thread create+join: %5.1f us\n", (t1 - t0) / N * 1e6);
    printf("fork+wait:          %5.1f us\n", (t2 - t1) / N * 1e6);
    free(big);
    return 0;
}
```
::: solution
```console
$ ./create
thread create+join:  44.1 us
fork+wait:          3988.5 us
```
这里一个线程约 $44$ µs，一次 fork 约 $4$ ms——相差九十倍（一项**观测**；两个数字都随机器及其负载变化）。差别在于地址空间。新线程共享它，所以内核只分配一个任务结构、C 库只分配一个栈。fork 却必须复制那 100 MiB 堆的页表——$25{,}600$ 个页表项，每个都标成写时复制（[[operating-systems/page-replacement]]）——然后子进程退出时再拆掉它们。一个 `fork` 之后马上 `exec` 的程序白白浪费这些工作，这就是 `posix_spawn` 和 `vfork` 存在的原因。
:::
:::

## 竞争条件

计数器为什么丢了加一？语句 `counter++` 编译成三条指令。`objdump -d race` 显示出循环体：

```text
mov    0x2d51(%rip),%rax        # 把 counter 载入寄存器
add    $0x1,%rax                # 寄存器加一
mov    %rax,0x2d42(%rip)        # 把寄存器存回 counter
```

::: example 一次丢加一，逐步展示 {#ex-lost-update}
计数器里现在是 $41$。给出线程 A 与 B 执行这三条指令的一次交错，使得结束后计数器里是 $42$，尽管两个线程都对它加过一。
::: solution
每个线程有自己的 `%rax`（寄存器是每线程一份的），但 `counter` 是共享的。若两个线程都在任何一方存回之前载入同一个值，那么两者都存入那个值加一，于是一次加一被丢掉：

| 步 | 线程 A | 线程 B | counter |
|---|---|---|---|
| 1 | 载入 counter → `%rax` $= 41$ | | 41 |
| 2 | | 载入 counter → `%rax` $= 41$ | 41 |
| 3 | 加：`%rax` $= 42$ | | 41 |
| 4 | | 加：`%rax` $= 42$ | 41 |
| 5 | 存回 `%rax` → counter | | 42 |
| 6 | | 存回 `%rax` → counter | 42 |

在一个核心上，这发生在定时器中断于载入与存回之间抢占 A 时；在两个核心上，只要两个线程的循环有重叠就会发生，这就是上面那个程序丢掉近一半加一的原因。
:::
:::

::: definition 竞争条件与临界区 {#def-race}
当计算的**结果**取决于其各线程的相对时序或交错时，就发生**竞争条件**。**数据竞争**是其中一种具体情形：两个线程并发访问同一内存位置，至少一次访问是写，且没有任何东西给它们定序；在 C（自 C11 起）和 C++ 中，普通变量上存在数据竞争的程序具有**未定义行为**。**临界区**是一段访问共享数据、不得由一个以上线程同时执行的代码。
:::

要推理竞争，我们把每个线程建模成一串**原子步**（这里是指令），把一次执行建模成一次**交错**：对线程序列的一个归并，保持每个线程内部的先后次序。调度器和硬件能产生任何交错，所以正确的程序必须对一切交错都正确。

::: proposition 数交错的个数 {#prop-interleavings}
执行 $a$ 步与 $b$ 步的两个线程共有 $\binom{a+b}{a}$ 种交错。两个线程各自把 `counter++` 的载入、加、存回三步执行一遍、从 $0$ 出发时，$\binom{6}{3} = 20$ 种交错中恰有 $2$ 种使计数器停在 $2$；其余 $18$ 种使它停在 $1$。
:::

::: proof
选定 $a + b$ 个位置中哪 $a$ 个属于第一个线程，交错即被完全确定；其余位置按第二个线程自己的顺序归它。对计数器：若每个线程的载入都发生在另一个的存回之前，则两者都载入 $0$、都存入 $1$。否则有一个线程——设为 A——在 B 载入之前存回；由于 A 的载入和加先于它的存回，A 的三步都先于 B 的载入，进而先于 B 的全部三步：交错就是 A 的三步接着 B 的三步。这只发生在 $2$ 种交错中（A 先或 B 先），两种都得 $2$。用 Python 对全部 $20$ 种逐一枚举可证实这个计数。
:::

::: widget graph
nodes: 00@0,3; 10@1,3; 20@2,3; 30@3,3; 01@0,2; 11@1,2; 21@2,2; 31@3,2; 02@0,1; 12@1,1; 22@2,1; 32@3,1; 03@0,0; 13@1,0; 23@2,0; 33@3,0
edges: 00>10; 10>20; 20>30; 01>11; 11>21; 21>31; 02>12; 12>22; 22>32; 03>13; 13>23; 23>33; 00>01; 01>02; 02>03; 10>11; 11>12; 12>13; 20>21; 21>22; 22>23; 30>31; 31>32; 32>33
algorithm: bfs
start: 00
caption: 两个各三步的线程的交错，看成网格中的路径：顶点 $ij$ 表示线程 A 已执行 $i$ 步、线程 B 已执行 $j$ 步；向右的边是 A 的一步，向下的边是 B 的一步。从 $00$ 到 $33$ 的每条路径是一种交错，共有 $\binom{6}{3} = 20$ 种。逐步执行广度优先搜索并注意所有满足 $i + j = k$ 的顶点是一起被到达的：它们是 $k$ 步之后的可能状态。只有沿网格两条外沿的路径——A 全体然后 B 全体，或反过来——能避免丢加一。
:::

交错的数目指数增长：各 $50$ 步的两个线程有 $\binom{100}{50} \approx 10^{29}$ 种。测试不可能覆盖它们；正确性必须靠*论证*，办法是确保临界区绝不同时被两个线程执行。

## 临界区问题

::: definition 互斥的要求 {#def-cs-requirements}
**临界区问题**对 $n$ 个线程的解——每个线程反复执行*进入协议*、它的临界区、*退出协议*和其他代码——必须满足：

1. **互斥**：任何时刻至多一个线程在它的临界区内。
2. **推进**（无死锁）：若没有线程在它的临界区内且有些线程正试图进入，它们之中有一个终将进入；决策不能被无限期推迟，协议之外的线程不参与决策。
3. **有限等待**（无饥饿）：一个线程一旦开始试图进入，其他线程抢在它前面进入的次数就有上界。

我们假设每个线程在有限时间内离开临界区，且执行协议的线程总能得到调度；对各线程的相对速度不作任何假设。
:::

两个明显的尝试都会失败。*严格轮流*——一个共享变量 `turn` 加"等到 `turn` 轮到我；离开临界区后把轮次让出去"——保证了互斥，却违反推进：若另一个线程再也不打算进入，我就永远等一个它永远不会还回来的轮次。*举旗*——每个线程置 `flag[self] = 1`，然后当 `flag[other]` 为 1 时等待——也保证互斥，但若两个线程都在对方检查之前举了旗，两者就永远等下去，违反推进。Gary Peterson 1981 年的算法把这两个想法合为一体。

::: algorithm 面向两个线程的 Peterson 算法 {#alg-peterson}
共享变量：`flag[0] = flag[1] = 0`，以及 `turn`。线程 $i$（令 $j = 1 - i$）：

```text
entry:  flag[i] ← 1           // 我要进入
        turn ← j              // 但你可以先走
        while flag[j] = 1 and turn = j: wait
        (critical section)
exit:   flag[i] ← 0
```
:::

::: theorem Peterson 算法是正确的 {#thm-peterson}
若 `flag` 与 `turn` 的每次读和写都是原子的，且每个线程的操作按程序顺序生效（**顺序一致性**），则 Peterson 算法满足互斥、推进，以及上界为 $1$ 的有限等待。
:::

::: proof
*互斥。* 设两个线程都在各自的临界区内。两者都在进入前把自己的旗置 $1$ 且尚未复位，所以两面旗都是 $1$。考虑此刻之前对 `turn` 的最后一次写；设线程 $0$ 最后写了它、置 `turn` $= 1$（另一情形对称）。线程 $0$ 随后通过了它的循环测试，而该测试是在它写 `turn` 之后求值的，所以测试时或者 `flag[1]` $= 0$，或者 `turn` $= 0$。`turn` $= 0$ 不可能，因为线程 $0$ 的那次写是最后一次、写的是 $1$。于是测试时 `flag[1]` 是 $0$，意味着线程 $1$ 尚未执行 `flag[1] ← 1`——可那样线程 $1$ 之后又执行了 `turn ← 0`，与把线程 $0$ 的写选作最后一次矛盾。所以两者不可能同时在里面。

*推进。* 设线程 $i$ 在循环里永远等待。则从某时刻起，它每次测试时都有 `flag[j]` $= 1$ 且 `turn` $= j$。`turn` 只有在线程执行进入协议时才可能改变；若线程 $j$ 在协议之外，则 `flag[j]` $= 0$，所以线程 $j$ 必在协议之内。若线程 $j$ 也在等待，它等的是 `turn` $= i$，可 `turn` 不可能既是 $i$ 又是 $j$：两者之一会进入。若线程 $j$ 进入又离开，它会复位 `flag[j]`，而它若再次尝试就置 `turn ← i`，从而放行线程 $i$。

*有限等待。* 线程 $i$ 等待期间，线程 $j$ 至多还能进入一次：$j$ 下次试图进入时置 `turn ← i`，而此时 $i$ 仍带着 `flag[i]` $= 1$ 在等待，于是 $j$ 转而为等 $i$ 进去过而等待。
:::

这个证明假设了每个线程的操作按程序顺序发生，并被另一个线程按那个顺序看到。现代处理器并不承诺这一点。

::: example Peterson 算法在 x86-64 上失败 {#ex-peterson-fail}
用普通的载入和存储（C11 的 `memory_order_relaxed` 原子操作，编译成普通的 `mov` 指令）实现 Peterson 算法来保护一个普通计数器，让两个线程各跑两百万次迭代。然后改用顺序一致性原子操作。

```c
#include <pthread.h>
#include <stdatomic.h>
#include <stdio.h>

static atomic_int flag[2], turn;
#ifdef SEQ_CST                     /* 顺序一致性原子操作：正确 */
#define ST(x, v) atomic_store(&(x), (v))
#define LD(x)    atomic_load(&(x))
#else                              /* 松弛访问：普通载入和存储的效果 */
#define ST(x, v) atomic_store_explicit(&(x), (v), memory_order_relaxed)
#define LD(x)    atomic_load_explicit(&(x), memory_order_relaxed)
#endif
static long counter;               /* 普通变量，由锁保护 */
enum { N = 2000000 };

static void lock(int self) {
    int other = 1 - self;
    ST(flag[self], 1);             /* 我要进入 */
    ST(turn, other);               /* 但你先走 */
    while (LD(flag[other]) && LD(turn) == other) ;
}
static void unlock(int self) { ST(flag[self], 0); }

static void *work(void *arg) {
    int self = *(int *)arg;
    for (int i = 0; i < N; i++) { lock(self); counter++; unlock(self); }
    return NULL;
}

int main(void) {
    pthread_t t[2];
    int id[2] = {0, 1};
    for (int i = 0; i < 2; i++) pthread_create(&t[i], NULL, work, &id[i]);
    for (int i = 0; i < 2; i++) pthread_join(t[i], NULL);
    printf("expected %d, got %ld\n", 2 * N, counter);
    return 0;
}
```
::: solution
```console
$ gcc -std=c17 -Wall -Wextra -O2 -pthread -o peterson peterson.c
$ for i in 1 2 3 4 5 6; do ./peterson; done
expected 4000000, got 3999995
expected 4000000, got 3994767
expected 4000000, got 3999683
expected 4000000, got 3999989
expected 4000000, got 4000000
expected 4000000, got 3999996
$ gcc -std=c17 -Wall -Wextra -O2 -pthread -DSEQ_CST -o peterson-sc peterson.c
$ ./peterson-sc
expected 4000000, got 4000000
```
松弛版本大多数运行都会丢掉几次加一（丢多少次因运行而异，有的运行一次不丢），所以互斥被违反了。反汇编显示编译器保持了程序顺序——先 `movl $0x1,(flag)`，再 `mov %edx,(turn)`，然后才是那些载入——所以重排是处理器干的。每个 x86 核心有一个**存储缓冲**（store buffer）：一条存储在缓冲区里排队，稍后才对其他核心可见，而核心已继续执行其后的载入。于是线程 $0$ 可能读到 `flag[1]` $= 0$，而它自己的 `flag[0] ← 1` 还躺在它的存储缓冲里，线程 $1$ 可能对称地如法炮制；两者都进来了。x86 恰恰允许这一种重排——存储之后载入另一个地址——且仅此一种。对 `memory_order_seq_cst`（`atomic_store` 的默认序），GCC 为存储发出 `xchg`，它在 x86 上还会清空存储缓冲，算法重新正确；顺序一致性版本在我们的运行中从未丢过一次加一。
:::
:::

::: warning `volatile` 不是同步
`volatile` 告诉 C 编译器：对变量的每次访问都必须真正执行，且相对于其他 volatile 访问保持次序。它并不能让 `counter++` 成为原子（开头那个程序就用了 `volatile`，丢了一半的更新），不能阻止*处理器*重排访问（[[#ex-peterson-fail]]），也不安排 volatile 访问相对于普通访问的次序。在 C11 及以后，对不加锁访问的共享变量用 `_Atomic` 类型和 `<stdatomic.h>`，其余一切用锁。测试构建用 `-fsanitize=thread` 编译，它会在运行期报告观察到的数据竞争。
:::

Peterson 算法的推广性也差：$n$ 个线程需要 $\Theta(n)$ 个共享变量，而任何只用读和写、仅靠软件达成的解至少需要 $n$ 个（Burns 与 Lynch，1993）。真实系统借助硬件。

## 用原子指令构造锁

在单处理器上，内核可以靠**关中断**把一串指令变成原子的：没有中断就没有上下文切换。早期内核就是这样保护自己的数据的，如今内核仍会在本地核心上短暂关中断。这对用户程序毫无用处（这条指令是特权指令——[[operating-systems/os-structure#prop-protection]]），在多处理器上也不够——别的核心照跑不误。于是处理器提供**原子读改写指令**，把一个内存位置的读和写并成对所有核心不可分割的一步：

| 指令 | 效果（作为一个原子步） | x86-64 | C11 |
|---|---|---|---|
| **test-and-set** | 写入 1，返回旧值 | `xchg` | `atomic_flag_test_and_set` |
| **fetch-and-add** | 加 $d$，返回旧值 | `lock xadd` | `atomic_fetch_add` |
| **compare-and-swap** | 若当前值等于 `expected` 则写入 `new`；报告是否写入 | `lock cmpxchg` | `atomic_compare_exchange_strong` |

ARM 和 RISC-V 用一对指令 **load-linked/store-conditional**（`ldxr`/`stxr`、`lr`/`sc`）提供同样的效果：只有在载入之后没有其他核心写过该位置时，存储才成功。

::: definition 锁 {#def-lock}
**锁**（mutex）是带有两个操作的对象：`acquire`（加锁），只有当调用线程持锁时才返回；`release`（解锁），由持有者调用，使锁变为可用。同一时刻至多一个线程持锁。用同一把锁保护对共享数据的每次访问——临界区之前获取、之后释放——就使各临界区互斥。
:::

::: algorithm test-and-set 自旋锁 {#alg-tas}
锁是一个字，空闲时为 $0$。

- acquire：**当** test-and-set(lock) $= 1$ 时：什么都不做（自旋）
- release：lock $\gets 0$
:::

::: proposition 自旋锁提供互斥与推进 {#prop-tas}
若 test-and-set 是原子的，则同一时刻至多一个线程持有 test-and-set 锁，且若锁空闲而有线程在尝试，其中一个会获得它。有限等待不加保证。
:::

::: proof
线程从返回 $0$ 的那次 test-and-set 起持锁，直到它的 release。设两个线程同时持锁；考察它们两次成功的 test-and-set——它们是原子的，因而按某种先后发生。第一次之后该字为 $1$，只有 release 会把它置回 $0$；而并没有过 release（两者都还持着锁），所以第二次 test-and-set 返回 $1$——不算成功。矛盾。推进：若该字为 $0$ 而有线程在自旋，它们中任何一个接下来执行的 test-and-set 都会返回 $0$。但没有任何东西决定*哪个*线程的 test-and-set 排在下一个，所以一个线程可能永远输掉每一次竞争：等待没有上界。
:::

取个号就能找回公平，就像在商店柜台领号一样。

::: algorithm 门票锁 {#alg-ticket}
两个计数器，`next` 和 `serving`，初始都是 $0$。

- acquire：my $\gets$ fetch-and-add(next, 1)；**当** serving $\ne$ my 时：自旋
- release：serving $\gets$ serving $+ 1$
:::

门票锁按 fetch-and-add 的先后把锁发放出去：一个线程只等比它先取号的线程——有限等待，$n$ 个线程时上界为 $n - 1$（[[#ex-ticket-proof]]）。

下面是这两把锁、一个 `pthread_mutex_t` 和一个无锁的 `atomic_fetch_add`，各自用来数到四百万：

```c
#define _POSIX_C_SOURCE 200809L
#include <pthread.h>
#include <stdatomic.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

static long counter;                                   /* 由所选的锁保护 */
static atomic_long acounter;
static pthread_mutex_t m = PTHREAD_MUTEX_INITIALIZER;
static atomic_flag flag = ATOMIC_FLAG_INIT;             /* test-and-set 自旋锁 */
static atomic_uint next_ticket, now_serving;            /* 门票锁 */
static int kind;                                        /* 0 互斥锁 1 tas 2 门票 3 原子 */
static long iters;

static void tas_lock(void)   { while (atomic_flag_test_and_set(&flag)) ; }
static void tas_unlock(void) { atomic_flag_clear(&flag); }
static void ticket_lock(void) {
    unsigned my = atomic_fetch_add(&next_ticket, 1);   /* 取号 */
    while (atomic_load(&now_serving) != my) ;           /* 等待叫号 */
}
static void ticket_unlock(void) { atomic_fetch_add(&now_serving, 1); }

static void *work(void *arg) {
    (void)arg;
    for (long i = 0; i < iters; i++) {
        switch (kind) {
        case 0: pthread_mutex_lock(&m); counter++; pthread_mutex_unlock(&m); break;
        case 1: tas_lock(); counter++; tas_unlock(); break;
        case 2: ticket_lock(); counter++; ticket_unlock(); break;
        case 3: atomic_fetch_add(&acounter, 1); break;
        }
    }
    return NULL;
}

int main(int argc, char *argv[]) {
    const char *names[] = {"mutex", "tas", "ticket", "atomic"};
    if (argc < 3) return 1;
    for (kind = 0; kind < 4 && strcmp(argv[1], names[kind]); kind++) ;
    int t = atoi(argv[2]);
    long total = argc > 3 ? atol(argv[3]) : 4000000;
    iters = total / t;                                   /* 总工作量相同 */
    pthread_t th[64];
    struct timespec t0, t1;
    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (int i = 0; i < t; i++) pthread_create(&th[i], NULL, work, NULL);
    for (int i = 0; i < t; i++) pthread_join(th[i], NULL);
    clock_gettime(CLOCK_MONOTONIC, &t1);
    double ns = ((t1.tv_sec - t0.tv_sec) * 1e9 + (t1.tv_nsec - t0.tv_nsec)) / (iters * t);
    printf("%-6s %2d threads: total %ld, %5.1f ns per increment\n", names[kind], t,
           kind == 3 ? (long)acounter : counter, ns);
    return 0;
}
```

```console
$ for k in mutex tas ticket atomic; do for t in 1 2 8; do ./locks $k $t; done; done
mutex   1 threads: total 4000000,  21.6 ns per increment
mutex   2 threads: total 4000000,  90.4 ns per increment
mutex   8 threads: total 4000000,  92.9 ns per increment
tas     1 threads: total 4000000,  12.3 ns per increment
tas     2 threads: total 4000000, 106.1 ns per increment
tas     8 threads: total 4000000, 353.4 ns per increment
ticket  1 threads: total 4000000,  12.6 ns per increment
ticket  2 threads: total 4000000, 130.3 ns per increment
ticket  8 threads: total 4000000, 528.1 ns per increment
atomic  1 threads: total 4000000,   6.8 ns per increment
atomic  2 threads: total 4000000,  15.2 ns per increment
atomic  8 threads: total 4000000,  15.3 ns per increment
```

现在每个版本都是正确的：总数永远是四百万。时间（都是**观测**，且各次运行波动）给出三条教训。第一，*线程变多让每个受锁保护的程序都更慢*，而不是更快：工作全在临界区里，于是被串行化了；此外每次加锁，装着锁和计数器的那个缓存行都必须在核心之间搬一次家。第二，自旋锁随自旋者增多而劣化——每次自旋的 test-and-set 都是一次来抢缓存行的写——而公平的门票锁劣化得最厉害，因为锁必须交给*某一个特定的*线程，而它未必正是缓存行所在的那个核心上的线程。第三，同样这活一条原子指令干起来比任何锁快四到二十倍：临界区只是一次更新时，就用原子操作。

::: widget plot
f: 1/(s + (1 - s)/x)
x: 1, 36
y: 0, 36
sliders: s=0.1:0:1:0.01
labels: \text{串行化比例为 } s \text{ 时的加速比}
points: 8,4.71
caption: 阿姆达尔定律：若程序 $s$ 比例的工作在一个锁保护的临界区内（于是被串行化），$n$ 个线程至多让它快 $1/(s + (1-s)/n)$，且绝不超过 $1/s$。$s = 0.1$ 时，8 个线程至多 $4.7$ 倍，$36$ 个线程 $8$ 倍。计数基准是极端的 $s = 1$：毫无加速，实际上反而是减速，因为这个模型忽略了锁在核心间搬移的代价。把 $s$ 滑向 $0$，就明白多核机器上细粒度加锁为何要紧。
:::

### 自旋还是睡眠

自旋锁浪费等待线程的处理器。当临界区很短、且每个线程都有自己的核心时——内核内部的常见情形——这是可以接受的。当线程数超过核心数时，它就是一场灾难。那时持有锁的线程（对门票锁，是下一个轮到持锁的线程）可能被抢占，等待的线程自旋掉整个时间片而一事无成：

```console
$ timeout 30 taskset -c 0-1 ./locks ticket 4 1000000; echo "status $?"
status 124
$ taskset -c 0-1 ./locks mutex 4 1000000
mutex   4 threads: total 1000000, 290.3 ns per increment
```

限制在两个核心上的四个线程，$30$ 秒完不成一百万次门票锁加一——两次运行皆如此（`timeout` 杀掉了程序；状态 $124$）。锁每交给一个不在运行的线程一次，两个在运行的线程就自旋到一个时间片——几毫秒——过去；按每次加一几毫秒计，一百万次要跑上一个小时。互斥锁则在 $0.3$ s 内完成。

补救办法是**睡眠**而不是自旋：拿不到锁的线程请内核阻塞自己，释放锁的线程把它唤醒。但一次系统调用要花几百纳秒（[[operating-systems/os-structure]]）——远超一次无竞争的加锁。Linux 的答案是 **futex**（"fast user-space mutex"，快速用户空间互斥体，2002）：锁是用户内存里的一个字，用原子指令操作；只有出现竞争时内核才通过两个操作介入——`FUTEX_WAIT(addr, val)` 在 `*addr` 仍等于 `val` 时睡眠（在内核里原子地检查，所以唤醒不可能在检查与睡眠之间丢失），`FUTEX_WAKE(addr, n)` 至多唤醒 $n$ 个睡眠者。

::: example 一个基于 futex 的互斥锁 {#ex-futex}
实现一个互斥锁，它的字取 $0$（未锁）、$1$（已锁，无人等待）或 $2$（已锁，可能有等待者），使得没有竞争时 `lock` 与 `unlock` 不发起任何系统调用。用四个线程检验它。
::: solution
```c
#define _GNU_SOURCE                        /* syscall() */
#include <linux/futex.h>
#include <pthread.h>
#include <stdatomic.h>
#include <stdio.h>
#include <sys/syscall.h>
#include <unistd.h>

/* 状态：0 未锁，1 已锁，2 已锁且可能有人睡着 */
typedef struct { atomic_int state; } mutex;

static void futex(atomic_int *addr, int op, int val) {
    syscall(SYS_futex, addr, op, val, NULL, NULL, 0);
}

static void mutex_lock(mutex *m) {
    int c = 0;
    if (atomic_compare_exchange_strong(&m->state, &c, 1))
        return;                                    /* 快路径：无系统调用 */
    if (c != 2)
        c = atomic_exchange(&m->state, 2);         /* 声明一个等待者 */
    while (c != 0) {
        futex(&m->state, FUTEX_WAIT_PRIVATE, 2);   /* 状态仍为 2 才睡 */
        c = atomic_exchange(&m->state, 2);
    }
}

static void mutex_unlock(mutex *m) {
    if (atomic_exchange(&m->state, 0) == 2)        /* 可能有人睡着 */
        futex(&m->state, FUTEX_WAKE_PRIVATE, 1);   /* 唤醒一个 */
}

static mutex mu;
static long counter;

static void *work(void *arg) {
    for (long i = 0; i < 1000000; i++) { mutex_lock(&mu); counter++; mutex_unlock(&mu); }
    return arg;
}

int main(void) {
    pthread_t t[4];
    for (int i = 0; i < 4; i++) pthread_create(&t[i], NULL, work, NULL);
    for (int i = 0; i < 4; i++) pthread_join(t[i], NULL);
    printf("counter = %ld\n", counter);
    return 0;
}
```
```console
$ gcc -std=c17 -Wall -Wextra -O2 -pthread -o futexlock futexlock.c && ./futexlock
counter = 4000000
$ strace -f -c ./futexlock 2>&1 | grep futex
 99.76    0.220487          16     13777      5162 futex
```
计数是对的，`strace` 显示四百万次加锁只发起 $13{,}777$ 次 `futex` 系统调用（这个数目因运行而异；其中 $5162$ 次返回了错误——`EAGAIN`，因为内核检查时那个字已经变了，这无害）。为什么它正确：加锁成功只可能靠用原子操作把字从 $0$ 改成非零——那次 compare-and-swap，或一次返回了 $0$ 的 exchange——所以两个线程不可能都加到锁（[[#prop-tas]] 的论证）。去睡的线程先把字置成了 $2$，所以释放者的 exchange 会看到 $2$ 并发出唤醒；而 `FUTEX_WAIT` 只在字仍为 $2$ 时才睡，于是在 exchange 与睡眠之间完成的释放会让等待立即返回，而不是永远睡下去。这个设计正是 Ulrich Drepper 的论文 "Futexes are tricky"（2004）在展示了更简单的设计为何失败之后得出的那个。glibc 的 `pthread_mutex_lock` 按同一原理工作，某些配置下先短暂自旋再睡眠。
:::
:::

这样的**两阶段**锁——先自旋一会儿，赌持有者很快释放，然后睡眠——是操作系统和语言运行时的常态。内核还得操心一件事：一个线程持有自旋锁时被中断，而中断处理程序随后也试图获取这把锁（单核心上的死锁），这就是 Linux 的 `spin_lock_irqsave` 在持锁期间关闭本地中断的原因。

::: quiz
一个程序用一把 `pthread_mutex_t` 保护一张共享哈希表。哪些说法正确？
- [x] 每个读或写这张表的函数都必须获取互斥锁，包括只读的函数。
- [ ] 读不需要锁，因为读不会把表弄坏。
- [x] 若临界区很长，超过几个线程之后再增加线程可能毫无加速。
- [ ] 把互斥锁换成自旋锁总是更快。
::: solution
不带锁的读者可能看到被写者改到一半的表——例如指针已经置好、它指向的对象却还没初始化——而在 C 中这就是数据竞争，是未定义行为。（读者-写者锁让多个读者同时通过而排斥写者；见 [[operating-systems/synchronisation]]。）一把锁把临界区串行化了，所以按阿姆达尔定律加速比至多 $1/s$。自旋锁只有在持有者从不被抢占且临界区很短时才更快；线程多于核心时它可以灾难性地更慢，门票锁的测量就是明证。
:::
:::

::: history
迪杰斯特拉（Dijkstra）提出了 $n$ 个进程的互斥问题，并用一篇 1965 年发表、只有 *Communications of the ACM* 一页纸的论文仅凭读写解决了它，同时把最早的双方进程解归功于荷兰数学家 Theodorus Dekker。兰波特（Lamport）的**面包店算法**（1974）在不假设读写原子的情况下解决了问题——像面包店里的顾客那样取号——它是门票锁的祖先。Gary Peterson 的双变量算法 1981 年发表于 *Information Processing Letters*。IBM 的 System/370 在 1970 年代引入了 compare-and-swap；Maurice Herlihy 1991 年的论文 "Wait-free synchronization" 证明 compare-and-swap 能无锁地实现任何并发对象，而读写和 test-and-set 不能。John Mellor-Crummey 与 Michael Scott 1991 年的队列式（MCS）锁让自旋扩展到多处理器规模，是 Linux 排队自旋锁的基础。POSIX 于 1995 年标准化了线程（IEEE 1003.1c）；Hubertus Franke、Rusty Russell 与 Matthew Kirkwood 于 2002 年把 futex 引入 Linux；C 和 C++ 在 2011 年获得了内存模型与原子类型。
:::

## 后续内容

锁给出互斥；但锁不能让线程*等待一个条件*——等缓冲区变非空，或等另一个线程干完——而不忙等。[[operating-systems/synchronisation]] 添加条件变量与信号量、经典的生产者-消费者与读者-写者问题，以及只有多把锁才可能的死锁。内存模型、无锁数据结构、可扩展的锁与事务内存将在 [[parallel-computing]] 中展开；证明并发程序的正确性、并对它们的所有交错做模型检测，属于 [[software-engineering]] 与 [[programming-languages]]。竞争也是安全问题——[[operating-systems/os-structure]] 的双重取用（double fetch）就是一例（[[security]]）。

::: summary
- **线程**是共享其进程地址空间的一条控制流（[[#def-thread]]）；创建线程比创建进程便宜得多（[[#ex-create]] 实测 $44$ µs 对 $4$ ms），彼此经由内存通信。
- `counter++` 是载入、加、存回；交错会丢更新。两个这样的线程有 $20$ 种交错，其中只有 $2$ 种正确（[[#prop-interleavings]]）。有竞争的程序结果不确定，所以测试不能确立正确性。
- 临界区协议需要**互斥**、**推进**和**有限等待**（[[#def-cs-requirements]]）。**Peterson 算法**在顺序一致性下三者兼备（[[#thm-peterson]]）——却因存储缓冲在真实的 x86 硬件上失效，除非使用栅栏（[[#ex-peterson-fail]]）。
- `volatile` 不是同步；用 C11 原子操作或锁，并用 `-fsanitize=thread` 做测试。
- 锁由原子 **test-and-set**、**fetch-and-add** 和 **compare-and-swap** 构造：test-and-set 自旋锁给出互斥但不公平（[[#prop-tas]]）；**门票锁**是 FIFO 的（[[#alg-ticket]]）。
- 自旋只适用于短临界区且没有超额订阅的场合（门票锁四个线程挤两个核心就没跑完）；基于 **futex** 的互斥锁在用户态走快路径，只在竞争时才到内核里睡眠（[[#ex-futex]]）。单次更新时，一条原子指令胜过任何锁。
:::

## 习题

::: exercise 数交错的个数 {level=1 check="252"}
两个线程各执行 $5$ 个原子步。共有多少种交错？（输入数目。）
::: solution
由 [[#prop-interleavings]]，$\binom{10}{5} = 252$。若换成三个各 $5$ 步的线程，则将有 $\frac{15!}{5!\,5!\,5!} = 756{,}756$ 种。
:::
:::

::: exercise 最小的结果 {level=1 check="2"}
两个线程各在一个循环里执行 $n = 5$ 次 `counter++`（载入、加、存回），从 $0$ 开始，不加锁。最终值最小可能是多少？（输入该值。）描述一个达到它的交错。
::: solution
答案是 $2$，对任何 $n \ge 2$ 都一样（不是想当然的 $5$）。一个达到它的交错：A 载入 $0$。B 完成 $n - 1 = 4$ 次完整的加一（counter $= 4$）。A 加一并存回 $1$，抹掉 B 的成果。B 载入 $1$。A 完成其余 $4$ 次加一（counter $= 5$）。B 加一并存回 $2$，抹掉 A 的成果。最终值 $2$。

不可能更小。每次存回写的都是（某个载入值）$+ 1 \ge 1$。最终值由最后一次存回写下，设那次存回出自线程 X 的最后一轮；它比 X 那一轮载入的值大一。那次载入读到的要么是初值 $0$，要么是某次更早存回的值。它不可能读到初值 $0$：X 自己第一轮的存回（$n \ge 2$）发生在它之前，而一次载入返回的是该位置最近一次存回的值——一旦有过存回，就绝不返回初值。所以它读到的是 $\ge 1$ 的值，最终值 $\ge 2$。对 $n = 3$ 用 Python 穷举全部 $\binom{18}{9} = 48{,}620$ 种交错可以证实：最终值的范围是 $2$ 到 $6$。
:::
:::

::: exercise 这些协议错在哪里？ {level=1}
对每个进入协议，说出它违反 [[#def-cs-requirements]] 的哪一条要求，并给出一个交错。(a) `while (lock) ; lock = 1;`，退出用 `lock = 0`（普通的载入和存储）。(b) `flag[i] = 1; while (flag[j]) ;`，退出用 `flag[i] = 0`。(c) `while (turn != i) ;`，退出用 `turn = j`。
::: solution
(a) 互斥：两个线程都在任何一方写 $1$ 之前读到 `lock == 0`；两者都进来了。测试与置位必须是同一个原子步——这正是 test-and-set 提供的。(b) 推进：线程 $0$ 置 `flag[0] = 1`，线程 $1$ 置 `flag[1] = 1`，然后两者永远自旋，各等对方放旗——死锁。(c) 推进：若线程 $1$ 在线程 $0$ 把轮次让给它之后再也不想进入，线程 $0$ 就永远等待，尽管临界区空着。（严格轮流确实满足互斥与有限等待。）
:::
:::

::: exercise 一把锁的阿姆达尔定律 {level=2 check="1/(0.1 + 0.9/8)"}
一个程序单线程运行时间的 $10\%$ 花在一把锁保护的临界区里，$90\%$ 花在完全可并行的工作上。$8$ 个线程在 $8$ 个核心上，最好的可能加速比是多少？（输入加速比。）
::: solution
被串行化的部分仍占原时间的 $0.1$；并行部分占 $0.9/8$。加速比 $= 1/(0.1 + 0.9/8) = 1/0.2125 \approx 4.71$。线程数不限时趋近 $1/0.1 = 10$。想做得更好，就缩小临界区，或把锁拆成几把（比如每个哈希桶一把）。
:::
:::

::: exercise 用 compare-and-swap 造一把锁 {level=2}
用 C11 的 `atomic_compare_exchange_weak` 写出一把自旋锁的 `acquire` 和 `release`，并证明它提供互斥。为什么 `expected` 变量必须在循环内重置？
::: solution
```c
#include <stdatomic.h>

typedef struct { atomic_int held; } spinlock;    /* 0 空闲，1 已持有 */

void acquire(spinlock *l) {
    int expected = 0;
    while (!atomic_compare_exchange_weak(&l->held, &expected, 1))
        expected = 0;              /* 失败的 CAS 会把当前值（1）写到这里 */
}

void release(spinlock *l) { atomic_store(&l->held, 0); }
```
互斥：线程从一次成功的 compare-and-swap 起持锁——那次操作原子地把字从 $0$ 改成 $1$——直到它的 release。两次成功之间没有 release 的 compare-and-swap 是不可能的，因为第一次之后字为 $1$，第二次会发现 $1 \ne 0$。compare-and-swap 失败时，C11 把它发现的值写进 `expected`；若不重置，下一次尝试就会拿 $1$ 来比较，在别的线程持着锁的情况下"成功"地把 $1$ 换成 $1$。`_weak` 形式可能虚假失败（在 load-linked/store-conditional 的机器上），在循环里无害。
:::
:::

::: exercise 门票锁是公平的 {#ex-ticket-proof level=2}
证明门票锁（[[#alg-ticket]]）提供互斥，且一个取到号的线程至多在 $n - 1$ 次别人的进入之后就能进入，其中 $n$ 是线程数。假设计数器不会溢出。
::: solution
fetch-and-add 是原子的，所以发出去的门票互不相同：$0, 1, 2, \dots$ 按 fetch-and-add 的先后。线程恰在 `serving` 等于它的门票且尚未释放时持锁；由于 `serving` 一次只取一个值、门票互不相同，至多一个线程持锁：互斥。每次 release 使 `serving` 加一，所以锁按门票递增的顺序发放。持门票 $t$ 的线程要等 `serving`、…、$t - 1$ 各号的持有者，其中每一号都属于一个更早取号且尚未释放的不同线程；除它之外至多还有 $n - 1$ 个线程，所以至多 $n - 1$ 次进入先于它自己。（用 32 位计数器时，只要同时等待的线程少于 $2^{32}$ 个，溢出便无害，因为比较的是模 $2^{32}$ 意义下的相等。）
:::
:::

::: exercise 超额订阅的门票锁 {level=3 check="3000"}
在四个线程挤两个核心的门票锁实验中，设每次锁交接都交给一个不在运行的线程，让在运行的线程空转，代价为一个 $3$ ms 的时间片。估计一百万次加一要花多少秒。（输入秒数。）为什么 test-and-set 锁没这么惨？
::: solution
$10^6 \times 3$ ms $= 3000$ s，约 $50$ 分钟——与程序 $30$ s 跑不完相吻合。这个估计偏悲观（有时下一张票属于一个正在运行的线程），但数量级是对的。test-and-set 锁把锁交给释放之后*最先*执行自己的 test-and-set 的线程；只有正在运行的线程才执行指令，所以锁总能给到一个在运行的线程，抢占等待者毫无代价。公平是有代价的：FIFO 锁在抢占之下不堪一击。这就是 Linux 只在内核里使用类门票的排队自旋锁、且持锁期间关闭抢占的原因。
:::
:::

::: exercise 加栅栏的 Peterson {level=3}
在不把每次访问都改成顺序一致性原子操作的前提下，通过在 `lock` 中插入一条 `atomic_thread_fence(memory_order_seq_cst)` 修复 [[#ex-peterson-fail]] 的松弛版本。栅栏必须放在哪里，为什么在 x86 上一条就够？运行修复后的版本。
::: solution
x86 上唯一破坏该算法的重排，是存储越过其后的载入：对 `flag[self]` 和 `turn` 的存储必须先于对 `flag[other]` 的载入变得可见。把栅栏放在两者之间：

```c
static void lock(int self) {
    int other = 1 - self;
    ST(flag[self], 1);
    ST(turn, other);
    atomic_thread_fence(memory_order_seq_cst);   /* 全栅栏 */
    while (LD(flag[other]) && LD(turn) == other) ;
}
```

GCC 15 把栅栏编译成 `lock orq $0x0,(%rsp)`——一条什么都不改的加锁前缀指令，选它是因为它比 `mfence` 快而效果相同：它让核心等到自己的存储缓冲排空之后再执行其后的载入。在 x86 上，unlock 的那次存储不需要栅栏（存储不会与更早的载入或存储重排），尽管在 ARM 这类较弱的架构上需要的栅栏不同，而且还需要在 unlock 的存储上用释放序、在载入上用获取序，才能把计数器的更新保持在临界区之内。加上栅栏后，连续八次运行全部打印 `expected 4000000, got 4000000`（同时做的四次不加栅栏的运行中有两次丢了加一）。实践中，永远不要为生产系统自己写互斥算法；用平台的互斥锁。
:::
:::
