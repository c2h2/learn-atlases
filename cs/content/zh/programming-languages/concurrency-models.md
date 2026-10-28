两个线程各自执行一次 `x = x + 1`，从 `x = 0` 出发。之后 `x` 通常是 $2$——但有时是 $1$。这条语句不是一步而是三步：把 `x` 装入寄存器、加一、再把寄存器存回去。若两个线程都在任何存储之前装载，就有一次自增被丢掉。程序文本里没有说明期望哪种结果；它取决于两个线程的步骤如何交错，而这不受程序员控制。这类缺陷——**竞争条件**——罕见、难以复现、有时是灾难性的，这正是并发成为程序设计中非形式推理最容易失效之处的原因。

程序设计语言提供若干**并发模型**，每个都是对「并发活动如何通信」这个问题的不同回答。在**共享内存**模型中，线程读写公共变量、用锁协调；语言就必须说清一次读能返回什么，这是**内存模型**的职责。在**消息传递**模型——CSP 与 Go 风格的通道，以及 Erlang 风格的**参与者**（actor）——中，活动不共享任何东西，只靠发送值通信。**未来值**（future）与 **async/await** 把并发计算构造成「稍后才可用的值」，建立在 [[programming-languages/control]] 的协程之上。本章给每个模型一个精确语义，证明关于交错与死锁的基本事实，运行小实验（包括一个展示真实 x86 硬件破坏顺序一致性的实验），并说明 Rust 的类型系统如何在编译期排除数据竞争。作为操作系统机制的线程、进程与调度是 [[operating-systems]] 的主题。

## 共享内存与交错

::: definition 交错语义 {#def-interleaving}
一个**并发程序**由线程 $P_1, \ldots, P_n$ 组成，每个线程是一列原子**动作**（一次装载、一次存储、寄存器上的一步算术、一次锁操作），操作一块共享内存。一次**执行**是一个**交错**：一个把每个线程的每个动作恰好包含一次、且每个线程的动作都按程序次序出现的序列。它的结果是在初始内存上按该次序执行这些动作得到的。并发程序只有当**每个**交错都产生可接受的结果时才是正确的。
:::

交错就是 [[programming-languages/syntax-semantics]] 的小步语义加上非确定性：每一步，*任何*能动的线程都可能走下一步。确定性——我们为顺序语言证明的第一条定理——被有意放弃了。执行到底有多少？

::: theorem 数交错 {#thm-interleavings}
具有 $m$ 与 $n$ 个动作的两个线程恰有 $\binom{m+n}{m}$ 个交错。更一般地，$k$ 个线程具有 $n_1, \ldots, n_k$ 个动作时有 $\dfrac{(n_1 + \cdots + n_k)!}{n_1! \cdots n_k!}$ 个交错。
:::

::: proof
两个线程的一个交错由第一个线程的动作在 $1, \ldots, m + n$ 中占据的位置集合决定：位置定了，程序次序就固定了哪个动作落在哪里，第二个线程再按自己的次序填满其余位置。反过来，每个 $m$ 元位置集合给出一个交错，不同的集合给出不同的序列。所以交错与 $(m+n)$ 元集的 $m$ 元子集一一对应，这样的子集有 $\binom{m+n}{m}$ 个。对 $k$ 个线程，把 $N = \sum n_i$ 个位置各分配给一个线程，线程 $i$ 恰得 $n_i$ 个位置；由同样的双射，这种分配的数目是多项式系数 $N! / (n_1! \cdots n_k!)$。
:::

这个数目指数增长：两个各 $20$ 个动作的线程有 $\binom{40}{20} \approx 1.4 \times 10^{11}$ 个交错。测试无法覆盖它们，这正是并发代码需要推理——或者需要一个使大多数交错等价的模型——的原因。

::: example 丢失的更新 {#ex-lost-update}
枚举两个线程从 `x = 0` 出发执行 `load x; add 1; store x` 的所有交错，统计最终取值。
::: solution
```python
from itertools import combinations
from collections import Counter

def interleavings(a, b):
    """a 与 b 的所有保持各自次序的归并。"""
    n = len(a) + len(b)
    for pos in combinations(range(n), len(a)):     # a 占据的位置
        it_a, it_b = iter(a), iter(b)
        yield [next(it_a) if i in pos else next(it_b) for i in range(n)]

def run(schedule):
    mem = {"x": 0}; reg = {}
    for thread, op in schedule:
        match op:
            case "load":  reg[thread] = mem["x"]
            case "add":   reg[thread] += 1
            case "store": mem["x"] = reg[thread]
    return mem["x"]

T1 = [("A", "load"), ("A", "add"), ("A", "store")]
T2 = [("B", "load"), ("B", "add"), ("B", "store")]
outcomes = Counter(run(s) for s in interleavings(T1, T2))
print(sum(outcomes.values()), "interleavings; final x:", dict(outcomes))
```

```console
20 interleavings; final x: {2: 2, 1: 18}
```

交错共有 $\binom{6}{3} = 20$ 个，正如 [[#thm-interleavings]] 预言；其中只有两个——A 全部先于 B，或相反——给出 $2$。其余 $18$ 个里，两个线程都在对方存储之前装载，一次更新被丢掉。（这是对*调度*的计数，不是概率：在真实硬件上，快路径的概率大得多，这恰恰是这个缺陷在测试中藏身的原因。）
:::
:::

::: widget graph
nodes: 00@0,0; 10@1,0; 20@2,0; 30@3,0; 01@0,1; 11@1,1; 21@2,1; 31@3,1; 02@0,2; 12@1,2; 22@2,2; 32@3,2; 03@0,3; 13@1,3; 23@2,3; 33@3,3
edges: 00>10; 10>20; 20>30; 01>11; 11>21; 21>31; 02>12; 12>22; 22>32; 03>13; 13>23; 23>33; 00>01; 01>02; 02>03; 10>11; 11>12; 12>13; 20>21; 21>22; 22>23; 30>31; 31>32; 32>33
algorithm: topo
caption: 两个各有三个动作的线程的状态空间。顶点 $ij$ 表示「线程 A 已做 $i$ 个动作、B 已做 $j$ 个」；向右一步是 A 的一个动作，向上一步是 B 的一个动作。每个交错都是从 $00$ 到 $33$ 的一条单调路径，共有 $\binom{6}{3} = 20$ 条。[[#ex-lost-update]] 中的竞争在这张图上看得见：丢失更新发生在每条经过 $11$、$12$、$21$ 或 $22$ 的路径上——两个线程都在对方存储之前完成了装载——即除沿正方形两条边走的两条路径之外的所有路径。运行拓扑排序：它产生的任何次序都把每个状态排在其所有可能前驱之后。
:::

::: widget pascal
rows: 16
mod: 2
caption: 杨辉三角：第 $m + n$ 行第 $m$ 个元素是 $\binom{m+n}{m}$，即具有 $m$ 与 $n$ 个动作的两个线程的交错数（[[#thm-interleavings]]）；第 $6$ 行含有丢失更新例子里的 $20$。按奇偶着色显示了三角形的分形结构；这里要紧的是中间元素增长之快——第 $16$ 行中间已经是 $12\,870$。
:::

### 数据竞争、锁与原子性

::: definition 数据竞争 {#def-data-race}
两个内存访问**冲突**，若它们由不同线程对同一存储位置做出、且至少一个是写。**数据竞争**是一对不由同步定序的冲突访问——在交错语义下，即可能在某次执行中相邻出现的一对。
:::

标准的补救是**互斥**：一把**锁**（mutex）`m`，配有操作 `acquire(m)`（另一线程持有 `m` 时阻塞等待）与 `release(m)`。由 `acquire` 与 `release` 括起来的**临界区**，相对于同一把锁的其他一切临界区**原子地**执行：没有任何交错能把另一个线程受保护的动作放进它内部。若在两个线程中都写 `acquire; load; add; store; release`，那个枚举器——扩充后使 `acquire` 只在锁空闲时才能运行——恰好发现两次执行，都给出 $x = 2$（有一道习题请你写出来）。锁恢复了「一次一个线程」的顺序推理，代价是等待，并引入一种新的故障。

::: definition 死锁 {#def-deadlock}
若一组线程中的每一个都在阻塞等待该组中另一个线程持有的锁，则这组线程**死锁**。**等待图**在 $T$ 等待 $U$ 持有的锁时带有边 $T \to U$；死锁就是其中的一个环。
:::

::: theorem 锁序防止死锁 {#thm-lock-order}
设锁全序排列，$\ell_1 < \ell_2 < \cdots < \ell_k$，且每个持有锁的线程只在新锁大于它当前持有的每一把锁时才获取新锁。则没有执行会到达死锁。
:::

::: proof
设线程 $T_1, \ldots, T_r$ 在等待图中构成一个环：$T_i$ 等待 $T_{i+1}$ 持有的锁 $a_i$（下标模 $r$）。既然 $T_{i+1}$ 持有 $a_i$ 且自己正等待获取 $a_{i+1}$，规则要求 $a_{i+1} > a_i$（它只有在 $a_{i+1}$ 大于它持有的每一把锁——包括 $a_i$——时才允许请求 $a_{i+1}$）。沿环走一圈得 $a_1 < a_2 < \cdots < a_r < a_1$，矛盾。
:::

**哲学家就餐**问题（迪杰斯特拉（Dijkstra），1965）是经典演示：五个哲学家，每人需要左右两边的叉子，若每人都先拿左边的叉子就会死锁；给叉子编号并要求先拿编号小的，环就断了。锁序正是操作系统内核、数据库（[[databases]]）等大型系统在实务中避免死锁的办法。

::: widget graph
nodes: T1@0,1; T2@1,2; T3@2,1; T4@1,0
edges: T1>T2; T2>T3; T3>T4; T4>T1
algorithm: topo
caption: 四个线程的等待图：T1 等待 T2 持有的锁，T2 等待 T3 持有的锁，如此绕回 T1。这个环就是死锁：谁也动不了。运行拓扑排序——它无法完成，因为一个有向图有拓扑序当且仅当它无环。删掉边 T4 > T1（锁序就会强制这一点：持有最大锁的线程永远不会去等一把更小的锁），排序便成功了。
:::

::: quiz
下面哪些代码片段被两个线程同时在共享的 `x` 与 `y` 上运行时含有数据竞争？
- [x] 两个线程都无锁地运行 `x = x + 1`。
- [ ] 两个线程都用同一把锁运行 `with lock: x = x + 1`。
- [x] 线程 A 运行 `with lock_a: x = 1`；线程 B 运行 `with lock_b: print(x)`。
- [ ] 线程 A 运行 `print(x)`；线程 B 运行 `print(x)`。
::: solution
第一个有未同步的冲突访问。第二个用一把锁保护了每个访问，访问因此被定序。第三个用了*不同*的锁，而不同的锁不在两个线程之间定序任何东西：仍是竞争。第四个只有两次读；读与读不冲突。
:::
:::

## 内存模型

交错语义假定每个线程都立即看到每个写、且所有线程处于一个全局次序之中。兰波特（Lamport）称之为**顺序一致性**。

::: definition 顺序一致性（兰波特（Lamport），1979） {#def-sc}
一次执行是**顺序一致**的（SC），若它的结果与某个交错相同：在该交错中，每个读返回对同一位置的最近一次写的值。
:::

真实硬件与编译器不提供 SC，因为 SC 禁止了单线程代码所依赖的优化：重排彼此独立的内存操作、把值留在寄存器里——而在硬件上最重要的是——缓冲存储。经典见证是**存储缓冲**（store-buffering）测试：

$$
\text{initially } x = y = 0; \qquad \text{A: } x := 1;\ r_1 := y \qquad\qquad \text{B: } y := 1;\ r_2 := x
$$

在 SC 下 $r_1 = r_2 = 0$ 不可能：无论哪个存储排在交错前面，它都先于两个装载，所以至少一个装载会看到 $1$。枚举六个交错可确认只出现 $(0,1)$、$(1,0)$ 与 $(1,1)$。但在 x86 处理器上，每个核把自己的存储放进一个**存储缓冲**（store buffer）然后继续执行；一个装载可以在本核更早的存储到达内存之前完成。这个模型叫 **TSO**（全存储序，total store order），它允许 $(0, 0)$——一个给每个线程加上 FIFO 缓冲、可在任意时刻排空的 Python 模拟能找到全部四种结果。

::: example 在真实硬件上观察存储缓冲 {#ex-store-buffer}
在一台 x86-64 机器上用 C11 宽松（relaxed）原子量把存储缓冲测试跑一百万次，再用顺序一致原子量跑一遍。
::: solution
测试（节选；每轮由协调者重置 `x` 与 `y`，放行两个线程，等它们结束并记录 `r1`、`r2`）：

```c
/* 线程 A，每轮 */
atomic_store_explicit(&x, 1, memory_order_relaxed);
atomic_store_explicit(&r1, atomic_load_explicit(&y, memory_order_relaxed), memory_order_relaxed);
/* 线程 B，每轮 */
atomic_store_explicit(&y, 1, memory_order_relaxed);
atomic_store_explicit(&r2, atomic_load_explicit(&x, memory_order_relaxed), memory_order_relaxed);
```

```console
$ gcc -std=c17 -O2 -Wall -Wextra -pthread sb.c -o sb && ./sb
r1=0 r2=0: 994432
r1=0 r2=1: 3805
r1=1 r2=0: 1747
r1=1 r2=1: 16
$ sed 's/memory_order_relaxed/memory_order_seq_cst/g' sb.c > sb_sc.c && gcc ... && ./sb_sc
r1=0 r2=0: 0
r1=0 r2=1: 594428
r1=1 r2=0: 388811
r1=1 r2=1: 16761
```

这是一台机器上的观测（一台 36 核 x86-64 服务器，GCC，2026 年）；比例随每次运行、每台机器而变。反汇编显示编译器把存储保持在装载之前（先 `movl $0x1, x` 再 `mov y, %eax`），所以那 $994\,432$ 个 $(0, 0)$ 结果——在 SC 下不可能——来自硬件的存储缓冲：两个线程的装载运行时，双方的存储都还堵在缓冲里。换成 `memory_order_seq_cst` 后，编译器为每个存储发出一条原子交换（`xchg`），它会把存储缓冲排空，$(0, 0)$ 于是彻底消失。
:::
:::

硬件与编译器都不 SC，程序员还能假定什么？现代语言用一纸契约回答：

::: theorem 无数据竞争蕴含顺序一致性（阿德夫（Adve）与希尔（Hill），1990） {#thm-drf-sc}
若一个程序的每个顺序一致执行都无数据竞争（同步经由锁与经由声明为原子的访问进行），则该程序的每次执行，在符合语言内存模型的实现上，都表现得如同顺序一致。
:::

这条「无数据竞争则 SC」（SC for DRF）的保证是 Java 内存模型（JSR-133；曼森（Manson）、皮尤（Pugh）与阿德夫（Adve），2005）、C11 与 C++11（伯姆（Boehm）与阿德夫（Adve），2008）以及 Go、Rust、Swift 的核心。我们不作证明地陈述——它是关于每个语言的形式模型、以及实现它的编译器与硬件的定理。它的信息是务实的：*写出无竞争的程序，你就可以用交错来推理*。有数据竞争的程序得到更弱的保证（Java）或根本没有保证（在 C 与 C++ 中，对非原子变量的数据竞争是未定义行为）。专家可以用更弱的原子量（`memory_order_acquire`、`release`、`relaxed`）换速度，故意放弃 SC，就像上面实验那样。

## 消息传递

共享内存之外的选择就是不去共享它。在**消息传递**模型中，并发进程各有私有状态，只靠发送与接收消息交互。霍尔（Hoare）的**通信顺序进程**（CSP，1978）使该模型精确化：进程经由**通道**用 `ch ! v`（发送）与 `ch ? x`（接收）通信，而在无缓冲通道上，一次发送与一次接收同时发生，称为一次**会合**（rendezvous）。Go 的通道与 `select`、Occam、Clojure 的 `core.async` 与 Rust 的 `std::sync::mpsc` 沿袭 CSP；米尔纳（Milner）的 **π-演算**（Milner、Parrow 与沃克（Walker），1992）是其理论后继，其中通道名本身也可以被发送，于是通信拓扑可以变化。

::: example 一条通道流水线 {#ex-pipeline}
搭一个三阶段的流水线——产生 $1, \ldots, 5$ 的生产者、平方阶段、消费者——用有界队列连接的线程实现。
::: solution
```python
import threading, queue

def producer(out):
    for i in range(1, 6): out.put(i)
    out.put(None)                                  # 流结束标记
def squarer(inp, out):
    while (v := inp.get()) is not None: out.put(v * v)
    out.put(None)
def consumer(inp, results):
    while (v := inp.get()) is not None: results.append(v)

a, b, results = queue.Queue(maxsize=2), queue.Queue(maxsize=2), []   # 有界通道
ts = [threading.Thread(target=producer, args=(a,)),
      threading.Thread(target=squarer, args=(a, b)),
      threading.Thread(target=consumer, args=(b, results))]
for t in ts: t.start()
for t in ts: t.join()
print(results)
```

```console
[1, 4, 9, 16, 25]
```

三个线程虽然交错得不可预测，输出在每次运行中却相同：每个队列都是先进先出，每个阶段都是顺序的，所以值的次序被确定了。除了经由队列（其操作内部自带同步）之外不共享任何变量。上界（`maxsize=2`）给出了**背压**（back-pressure）：通道满时，快的生产者会阻塞，而不是耗尽内存。这种确定性不是运气：卡恩（Kahn）证明（1974）了由先进先出通道连接的顺序进程网络——其中每个进程一次从一个通道用阻塞接收读数——计算其输入的确定性函数。
:::
:::

消息传递除去了数据竞争，但没有除去每种并发缺陷。两个都等着从对方接收后才发送的进程，会像锁环一样精确地死锁；而带 `select`（哪个通道先就绪就从哪个接收）的程序又非确定了起来。

### 参与者

**参与者模型**（卡尔·休伊特（Hewitt）、彼得·毕肖普（Bishop）与理查德·施泰格（Steiger），1973；由古尔·阿加（Agha，1986）形式化）把并发实体作为一切的单位。

::: definition 参与者 {#def-actor}
一个**参与者**有私有状态、一个地址和一个**邮箱**。通信是朝地址**异步**发送消息：发送从不阻塞，消息在接收者的邮箱里等候。参与者一次处理一条消息；对一条消息的回应中，它可以更新自己的状态、向它知道地址的参与者发送消息、并创建新的参与者。
:::

因为参与者的状态只被该参与者自己、且一次一条消息地触碰，数据竞争在构造上就不存在，每条消息的处理器都可以按顺序推理。Erlang（阿姆斯特朗（Armstrong）、维尔丁（Virding）与威廉姆斯（Williams），始于 1986）用参与者造电话交换机——它的进程廉价到可以有数百万个，其「让它崩溃」的哲学由监督者重启失败的参与者——Akka（面向 Scala 与 Java）与 Orleans（.NET）把该模型带往其他平台。下面是一个用 Python 的 `asyncio` 实现的参与者：

```python
import asyncio

class Actor:
    """一个参与者：私有状态、一个邮箱，以及一个按序处理消息的任务。"""
    def __init__(self):
        self.mailbox = asyncio.Queue()
        self.task = asyncio.create_task(self._loop())
    def send(self, msg):                # 异步：从不阻塞发送者
        self.mailbox.put_nowait(msg)
    async def _loop(self):
        while True:
            msg = await self.mailbox.get()
            if msg == "stop": return
            await self.receive(msg)

class Counter(Actor):
    def __init__(self):
        self.n = 0                      # 只被本参与者自己的任务触碰
        super().__init__()
    async def receive(self, msg):
        match msg:
            case ("add", k): self.n += k
            case ("get", reply): reply.set_result(self.n)   # 通过未来值作答

async def main():
    c = Counter()
    async def client(i):
        for _ in range(1000):
            c.send(("add", 1))
            await asyncio.sleep(0)      # 让给其他任务：最大化交错
    await asyncio.gather(*(client(i) for i in range(4)))
    answer = asyncio.get_running_loop().create_future()
    c.send(("get", answer))
    print("count =", await answer)
    c.send("stop"); await c.task

asyncio.run(main())
```

```console
count = 4000
```

四个客户端发送 $4000$ 次自增，交错得尽可能细，一次不丢：自增被邮箱串行化。那次查询通过一个*未来值*作答，即下一节的主题。参与者模型的代价正是其益处的镜像：没有横跨两个参与者的原子操作（两个银行账户参与者之间的转账需要一个协议），不同发送者之间的消息次序不保证，邮箱还可能无界增长。

## 未来值与 async–await

**未来值**（future，或**承诺值** promise）是一个占位符，代表正在并发计算、稍后才可得到的值。索取该值——`result()`、`await`、`force`——会阻塞直到它就绪。未来值由亨利·贝克（Baker）与卡尔·休伊特（Hewitt，1977）提出，以「promise」之名则由丹尼尔·弗里德曼（Friedman）与戴维·怀斯（Wise，1976）提出；莉斯科夫（Liskov）柳芭·什里拉（Shrira）的 "Promises"（1988）把它加进了一种用于分布式调用的语言。未来值是按需调用（call-by-need）的 thunk（[[programming-languages/scope-binding]]）的并发表亲：一个只求值一次的延迟计算，不过是*提前地、并行地*求值，而非按需。

```python
from concurrent.futures import ThreadPoolExecutor
import time

def slow_square(x):
    time.sleep(0.2); return x * x

with ThreadPoolExecutor(max_workers=4) as pool:
    t = time.perf_counter()
    futs = [pool.submit(slow_square, x) for x in range(4)]   # 四个一起启动
    print([f.result() for f in futs], f"{time.perf_counter() - t:.1f}s")
```

```console
[0, 1, 4, 9] 0.2s
```

四个各需 $0.2$ 秒的调用在 $0.2$ 秒内全部完成，因为它们在并发地等待。（它们是在 `sleep` 里等待，而 `sleep` 会释放 Python 的全局解释器锁；CPU 密集的 Python 线程只在 2026 年起的 Python 3.13 提供的自由线程构建上才真正并行。）

**Async–await** 建立在未来值与 [[programming-languages/control]] 的协程之上。`async def` 函数是一个协程；`await f` 把它挂起，直到未来值或协程 `f` 完成，把控制权交回**事件循环**，后者趁此运行其他就绪的协程，并在结果到来时恢复挂起的那个。这一切都发生在**一个**线程上：不并行的并发，用于那些把时间花在等网络或等磁盘上的程序。

::: example 用 asyncio 并发等待 {#ex-asyncio}
启动三个分别需 $0.3$、$0.1$ 与 $0.2$ 秒的模拟网络请求，并等待全部完成。
::: solution
```python
import asyncio, time

async def fetch(name, delay):
    print(f"{name}: start")
    await asyncio.sleep(delay)          # 挂起；事件循环去跑其他任务
    print(f"{name}: done after {delay}s")
    return len(name)

async def main():
    t = time.perf_counter()
    results = await asyncio.gather(fetch("alpha", 0.3), fetch("be", 0.1), fetch("gamma", 0.2))
    print(results, f"{time.perf_counter() - t:.1f}s total")

asyncio.run(main())
```

```console
alpha: start
be: start
gamma: start
be: done after 0.1s
gamma: done after 0.2s
alpha: done after 0.3s
[5, 2, 5] 0.3s total
```

三个都在任何一个结束之前开始；它们按各自时延的长短完成；总耗时是最长的时延 $0.3$ 秒，而不是总和 $0.6$ 秒。`gather` 按其参数的次序、而非完成的次序返回结果。交错只发生在 `await` 点，所以两个 `await` 之间的代码相对于其他协程原子执行——交错集合比线程小得多，这正是 async 代码更容易写对的主因。反面是：一个长时间计算而不 `await` 的协程会阻塞所有其他任务。
:::
:::

::: warning async 不是并行，await 会传染
Python 与 JavaScript 的 `async`/`await` 跑在一个线程上：它重叠的是*等待*而不是计算，一个 CPU 密集的协程会拖垮整个事件循环。因为只有协程能 `await`，一个调用 async 函数的函数通常自己也得变成 async，并沿调用链一路上溯——鲍勃·尼斯特朗（Nystrom）的 "What color is your function?"（2015）把这称为**函数着色**问题。在协程里调用一个阻塞函数（`time.sleep`、同步数据库驱动）会悄悄阻塞所有其他任务。各语言做法不同：Go 用运行时调度的廉价线程（goroutine）把这一区别藏起来；Java 21（2023）出于同样原因加入了虚拟线程。
:::

## 面向并发的类型

数据竞争是程序的一种性质，而类型系统可以把它排除在外，正如 [[programming-languages/type-systems]] 排除卡住状态。Rust 用两个我们已经见过的成分做到这一点。**所有权与借用**（[[programming-languages/scope-binding]]）允许任一时刻对一个值或者一个可变引用、或者任意多个共享只读引用——恰是排除冲突访问的那个条件。还有两个标记 trait 记录哪些类型可以跨线程：**Send**（所有权可以转移到另一个线程）与 **Sync**（共享引用可以从多个线程使用）。编译器按结构推断它们；像 `Rc<T>` 这样引用计数非原子更新的对象，两者都不是。

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let count = Arc::new(Mutex::new(0));          // 原子计数、加锁
    let mut handles = vec![];
    for _ in 0..4 {
        let c = Arc::clone(&count);
        handles.push(thread::spawn(move || {
            for _ in 0..100_000 { *c.lock().unwrap() += 1; }
        }));
    }
    for h in handles { h.join().unwrap(); }
    println!("{}", *count.lock().unwrap());
}
```

```console
400000
```

通往计数器的唯一途径是 `lock()`，它返回一个在离开作用域时释放互斥锁的守卫：忘了加锁是类型错误，不是竞争。想把一个普通变量在两个线程间可变地共享，或把一个 `Rc` 送到另一个线程，都会被拒绝（rustc 1.95，2026 年版本；两条错误信息的节选）：

```console
error[E0499]: cannot borrow `count` as mutable more than once at a time
5 |         s.spawn(|| count += 1);       // 两个线程都想修改 count
  |                 -- first mutable borrow occurs here
6 |         s.spawn(|| count += 1);
  |                 ^^ second mutable borrow occurs here
error[E0277]: `Rc<i32>` cannot be sent between threads safely
```

Rust 的保证是无数据竞争，从而由 [[#thm-drf-sc]]，对安全代码是顺序一致性；它不防止死锁或更高层次的竞争条件（两个各自加锁正确的操作，组合起来却不原子）。其他基于类型的方法包括会话类型（描述通道上的通信协议），以及研究型语言的区域与效果系统。

对于不是用一把单锁构造的共享对象——并发队列、哈希表、计数器——标准的正确性判据是**线性一致性**（赫利希（Herlihy）与温（Wing），1990）：每个操作都如同在其发出与响应之间的某一时刻瞬时生效，从而操作的历史等价于一个尊重实时次序的顺序历史。它是从存储位置提升到对象上的 SC，也是 `java.util.concurrent` 之类库所承诺的东西。

::: history
艾兹赫尔·迪杰斯特拉（Dijkstra）的 "Solution of a problem in concurrent programming control"（1965）解决了互斥并引入临界区，随后是他的信号量与哲学家就餐问题；科夫曼（Coffman）、埃尔菲克（Elphick）与肖沙尼（Shoshani，1971）给出了死锁条件。彼尔·布林奇·汉森（Brinch Hansen）与托尼·霍尔（Hoare）引入了管程（1973–1974）。休伊特（Hewitt）、毕肖普（Bishop）与施泰格（Steiger）于 1973 年提出参与者；吉尔·卡恩（Kahn）的进程网络出现于 1974 年；霍尔（Hoare）的 "Communicating sequential processes"（*CACM*，1978）与米尔纳（Milner）的 CCS（1980）创立了进程代数。莱斯利·兰波特（Lamport）在 "How to make a multiprocessor computer that correctly executes multiprocess programs"（1979）中定义了顺序一致性。萨丽塔·阿德夫（Adve）与马克·希尔（Hill）的 "Weak ordering — a new definition"（1990）引入了无数据竞争契约，被 Java（2005）与 C++11（2011）采纳。未来值来自贝克（Baker）与休伊特（Hewitt，1977）以及弗里德曼（Friedman）与怀斯（Wise，1976）；Erlang 自 1986 年起在爱立信开发；async–await 出现在 F#（2007）与 C# 5.0（2012），随后是 Python 3.5（PEP 492，2015）与 JavaScript（ES2017）。
:::

## 后续内容

操作系统实现线程、调度以及锁底层的原语同步（[[operating-systems]]）；数据库提供事务，让成组的操作原子且隔离（[[databases]]）；分布式系统面对的是有故障、有延迟、没有共享时钟的消息传递（[[distributed-systems]]）；并行计算则研究如何让并发程序跑得快（[[parallel-computing]]）。本课程的工具——小步规则、类型系统、续延——正是用来定义和验证这一切的工具。

::: summary
- 共享内存模型用**交错**赋义（[[#def-interleaving]]）；交错数目按二项式系数增长（[[#thm-interleavings]]），测试无法覆盖。
- **数据竞争**是一对未同步的冲突访问（[[#def-data-race]]）；锁使临界区原子，但可能**死锁**（[[#def-deadlock]]），全局锁序可防死锁（[[#thm-lock-order]]）。
- 硬件与编译器不是**顺序一致**的（[[#def-sc]]）：x86 存储缓冲会产生任何交错都不允许的结果。语言承诺**对无数据竞争的程序保持 SC**（[[#thm-drf-sc]]）。
- **消息传递**什么都不共享：CSP 通道让发送者与接收者同步；**参与者**（[[#def-actor]]）一次一条地处理异步消息，构造上没有数据竞争。死锁仍然可能。
- **未来值**是一个并发计算中的值；**async–await** 把协程挂起在单线程事件循环的 `await` 点上，重叠的是等待、不是计算。
- 类型系统可以排除数据竞争：Rust 的所有权、借用与 `Send`/`Sync` 把它变成编译期错误。
:::

## 习题

::: exercise 数调度 {level=1 check="15"}
具有 $4$ 与 $2$ 个动作的两个线程有多少个交错？（输入数目。）
::: solution
由 [[#thm-interleavings]]，$\binom{6}{2} = 15$：从 $6$ 个位置中选出属于第二个线程的 $2$ 个。
:::
:::

::: exercise 三个自增线程 {level=2 check="1680"}
三个线程都从 `x = 0` 出发运行 `load x; add 1; store x`。有多少个交错？`x` 有哪些可能的最终值？（输入交错的数目。）
::: solution
多项式系数 $9! / (3!\,3!\,3!) = 362880 / 216 = 1680$。最终值：$1$、$2$ 或 $3$。三者都可能：线程一个接一个跑时是 $3$；三个都在任何存储前装载 $0$ 时是 $1$；例如 A 与 B 重叠而 C 在两者之后跑时是 $2$。把枚举器扩到三个线程得到 $\{3: 6, 2: 270, 1: 1404\}$，合计 $1680$——只有 $3! = 6$ 个串行次序给出正确答案。
:::
:::

::: exercise 竞争在哪里？ {level=1}
在下面的 Python 片段中，线程并发运行 `worker`。哪些共享访问存在竞争？如何在不改变结果的前提下修复程序？`total = 0; seen = set()` / `def worker(items): global total; for x in items: if x not in seen: seen.add(x); total += x`。
::: solution
`seen` 被多个线程读（`x not in seen`）又写（`seen.add`），`total` 被 `total += x` 读写：两者都是竞争。即便每个单独的操作都是原子的，「先测成员、再添加」这一检查后行动序列也不是原子的，两个线程可能都发现 `x` 不在集合里、都把它加进 `total`——这是比数据竞争更高层次的竞争条件。修复：用一把锁保护整个「测试并更新」，`with lock: if x not in seen: seen.add(x); total += x`；或者不共享——每个工作线程建立自己的集合，主线程再把它们合并，这样总数也相同。
:::
:::

::: exercise 哲学家就餐 {level=2}
五个哲学家围坐圆桌，每两人之间放一把叉子。哲学家 $i$（$0 \le i \le 4$）需要叉子 $i$ 与 $(i + 1) \bmod 5$。(a) 说明「先拿起左叉 $i$，再拿右叉」会死锁。(b) 应用 [[#thm-lock-order]]：哲学家 $4$ 的做法有何不同？为什么没有死锁？
::: solution
(a) 若五个人同时拿起各自的左叉，则每把叉子都被持有，每个哲学家都在等右边那把、即邻座手中的叉子：等待图是环 $0 \to 1 \to 2 \to 3 \to 4 \to 0$。(b) 按编号给叉子定序，要求每个哲学家先拿编号小的叉子。哲学家 $0$ 到 $3$ 照旧先拿 $i$ 再拿 $i + 1$，但哲学家 $4$ 需要叉子 $4$ 与 $0$，必须先拿叉子 $0$。如今每个线程都按递增次序拿叉子，由定理，等待之环无法形成。具体地说：哲学家 $0$ 与 $4$ 争叉子 $0$；谁抢不到就一无持有地等待，于是叉子 $4$ 留给哲学家 $3$，他能进餐，链条随之解开。
:::
:::

::: exercise 手工 SC {level=2}
对程序 A: $x := 1;\ r_1 := y$ 与 B: $y := 1;\ r_2 := x$（初始 $x = y = 0$），列出六个 SC 交错及其结果 $(r_1, r_2)$，并用存储缓冲解释 $(0, 0)$ 在 x86 上如何产生。
::: solution
记 A 的两个动作为 $a_1, a_2$，B 的为 $b_1, b_2$：$a_1 a_2 b_1 b_2 \mapsto (0, 1)$；$a_1 b_1 a_2 b_2 \mapsto (1, 1)$；$a_1 b_1 b_2 a_2 \mapsto (1, 1)$；$b_1 a_1 a_2 b_2 \mapsto (1, 1)$；$b_1 a_1 b_2 a_2 \mapsto (1, 1)$；$b_1 b_2 a_1 a_2 \mapsto (1, 0)$。所以 SC 允许 $(0,1)$、$(1,0)$、$(1,1)$，绝不允许 $(0,0)$。在 x86 上，A 的存储 $x := 1$ 进入 A 的存储缓冲，A 继续从内存装载 $y$，仍是 $0$；与此同时 B 把 $y := 1$ 缓冲起来并装载 $x$，仍是 $0$；然后两个缓冲才排空。每个线程看到自己的存储（存储转发）却看不到对方的，于是有效次序是「两个装载都在两个存储之前」，这违反了每个线程内部的程序次序——正是 TSO 允许的松弛。
:::
:::

::: exercise 通道与死锁 {level=2}
两个类 goroutine 的线程经由两个*无缓冲*通道 `c` 与 `d` 通信（发送会阻塞，直到接收者取走值）。线程 P 运行 `c.send(1); x = d.receive()`；线程 Q 运行 `d.send(2); y = c.receive()`。程序会死锁吗？若把 Q 的两个操作对调呢？若通道容量为 $1$ 呢？
::: solution
照原样，P 会阻塞在 `c.send(1)` 里直到有人在 `c` 上接收，Q 会阻塞在 `d.send(2)` 里直到有人在 `d` 上接收；谁也走不到自己的接收：死锁（各等对方——一个环）。若 Q 运行 `y = c.receive(); d.send(2)`，P 的发送会遇上了 Q 的接收，随后 Q 的发送遇上 P 的接收：不死锁。通道容量为 $1$ 时，两个发送都立即进入缓冲，两个接收随后都能取到值：也不死锁。缓冲把依赖藏了起来，却没有消除它——消息多于缓冲空间时，原模式再次死锁。
:::
:::

::: exercise 给枚举器加上锁 {level=3}
给交错枚举器加上对单把锁的 `acq` 与 `rel` 动作：`acq` 只在锁空闲时才能执行。验证两个线程都用 `acq; load; add; store; rel` 时，每次执行都以 $x = 2$ 结束，并统计执行数。解释为什么这个数不是 $\binom{10}{5}$。
::: solution
改为递归地探索状态空间，而不是盲目枚举归并，因为哪些动作被允许取决于锁：

```python
def explore(threads):
    finals = Counter()
    def go(pcs, mem, regs, holder):
        progressed = False
        for t, prog in enumerate(threads):
            if pcs[t] == len(prog): continue
            op = prog[pcs[t]]
            if op == "acq" and holder is not None: continue        # 阻塞
            m, r, h = dict(mem), dict(regs), holder
            match op:
                case "acq": h = t
                case "rel": h = None
                case "load": r[t] = m["x"]
                case "add": r[t] += 1
                case "store": m["x"] = r[t]
            go(pcs[:t] + (pcs[t] + 1,) + pcs[t + 1:], m, r, h)
            progressed = True
        if not progressed: finals[mem["x"]] += 1
    go(tuple(0 for _ in threads), {"x": 0}, {}, None)
    return finals

inc = ["load", "add", "store"]
print(dict(explore([inc, inc])), dict(explore([["acq"] + inc + ["rel"]] * 2)))
```

```console
{2: 2, 1: 18} {2: 2}
```

无锁时它复现了 [[#ex-lost-update]] 的 $20$ 次执行。加锁后只有 $2$ 次执行，都给 $2$。两条动作序列的 $\binom{10}{5} = 252$ 种归并中，除两种外，其余每一种都把一个线程的 `acq` 放进另一个线程的 `acq` 与 `rel` 之间，而这把锁不允许；一个线程一拿到锁，另一个在线程释放之前任何动作都做不了（它的下一个动作就是它自己的 `acq`），于是两个临界区首尾相接地运行。锁把可达状态空间缩减为串行执行。
:::
:::

::: exercise 这个历史线性一致吗？ {level=3}
一个共享寄存器初始存 $0$。线程 A 调用 `write(1)`，在时刻 $1$ 发出、时刻 $4$ 返回。线程 B 调用 `read()`，在时刻 $2$ 发出、时刻 $3$ 返回 $1$，然后又调用 `read()`，在时刻 $5$ 发出、时刻 $6$ 返回 $0$。这个历史线性一致吗？若 B 的第二次读返回 $1$ 呢？
::: solution
线性一致性要求在每个操作的区间内选一点，使得到的顺序历史对寄存器合法。B 的第一次读返回 $1$，所以它的点必须排在 `write(1)` 的点之后；两个区间都允许这样（比如写在 $2.5$、读在 $2.7$）。B 的第二次读，其点在 $[5, 6]$ 内，在一切选法下都排在写的点之后（写的区间到 $4$ 就结束），而除那一次写之外再无别的写，所以合法的顺序寄存器应返回 $1$ 而不是 $0$。该历史**不**线性一致——寄存器「忘记」了一次已完成的写。若第二次读返回 $1$，则写 $\to$ 读 $\to$ 读的序列配点 $2.5, 2.7, 5.5$ 既合法又尊重实时次序：线性一致。第一个历史甚至连顺序一致都不满足：SC 必须尊重 B 的程序次序，而单次 `write(1)` 与两个按序的读的任何交错都无法让它们先返回 $1$、后返回 $0$。两个判据的差别出现在**不同**线程的操作被实时定序的历史上（一个在另一个发出之前就已返回）——线性一致性必须尊重这一序，SC 则不必。
:::
:::
