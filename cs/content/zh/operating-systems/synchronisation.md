一台 web 服务器有一个工作线程池和一个到达连接的队列。接受连接的线程把连接放进队列；工作线程从队列里取连接。[[operating-systems/threads-locks]] 里的锁让队列保持一致。可当队列为空时，工作线程该怎么办？自旋——加锁、看一眼、解锁、再来一遍——白白烧掉一个核心。它需要**睡到事情发生**，而放入连接的线程得把它唤醒。不丢失唤醒、不唤错线程、也不死锁地做到这一点，正是本章的主题。

我们引入等待的两件经典工具：**条件变量**，与锁配合使用；**信号量**，把计数与等待合二为一。我们用它们解决并发编程的标准问题——有界缓冲区、读者与写者、哲学家就餐——途中还会结识并发系统最危险的故障：**死锁**，线程们彼此无休无止地互相等待。我们陈述死锁得以发生的条件，证明资源分配图能检测死锁，并研究对付它的三种办法：预防（锁排序）、避免（银行家算法），以及检测并恢复。最后以优先级反转收尾——那个险些断送一次火星任务的缺陷。

所有程序都在测试机上以 `gcc -std=c17 -Wall -Wextra -O2 -pthread` 编译，其中正确的程序还在 ThreadSanitizer（`-fsanitize=thread`）下运行过，没有报告。并发程序的输出是不确定的；死锁用 `timeout` 检测，其退出状态 $124$ 意味着它不得不杀掉程序。

## 条件变量

::: definition 条件变量 {#def-cv}
**条件变量**是等待共享状态上某个条件的线程队列，与保护该状态的互斥锁一起使用。它有三个操作：

- `wait(cv, m)`：持着 $m$ 调用；*原子地*释放 $m$ 并让调用者睡在 $cv$ 上；被唤醒后，返回之前重新获取 $m$。
- `signal(cv)`：唤醒一个在 $cv$ 上等待的线程，如果有（否则什么也不做）。
- `broadcast(cv)`：唤醒所有在 $cv$ 上等待的线程。

在 POSIX 中它们就是 `pthread_cond_wait`、`pthread_cond_signal` 和 `pthread_cond_broadcast`。
:::

这个定义里有两处细节承担全部重量。第一，`wait` 是*原子地*释放互斥锁并入睡：若它先释放互斥锁再睡，另一个线程就能在其间改变状态并发出信号，而那个信号——发给了没有人的信号——会丢掉，等待者则长睡不醒（**丢失唤醒**）。第二，条件变量没有记忆：无人等待时发出的信号被径直丢弃。所以*状态*必须保存在共享变量里，条件变量只不过是一个"状态可能变了之前先睡在这里"的地方。

`signal` 有两种可能的含义。**霍尔语义**（Hoare，1974）下，被信号的线程立即运行，处于发信号者留下的状态；**Mesa 语义**（Lampson 与 Redell，1980）下，它只是被变为就绪，等它重新拿到互斥锁时，别的线程可能已经把状态又改了。POSIX、Java 和几乎每个真实系统都用 Mesa 语义，而且它们还容许**虚假唤醒**（没有任何信号却从 `wait` 返回）。其后果是一条没有例外的规则：

::: proposition 等待规则 {#prop-while}
在 Mesa 语义下，等待由 $m$ 保护的状态上条件 $C$ 的线程必须在循环里等待，`while (!C) wait(cv, m);`，且只能在循环退出之后、仍持着 $m$ 时依赖 $C$。
:::

::: proof
`wait` 返回时线程持着 $m$，但在信号发出与重新获取之间，其他线程可能取得 $m$ 并把 $C$ 弄假；而虚假唤醒也可能在 $C$ 从未成立时返回。所以返回时对 $C$ 一无所知，必须重新测试。循环只在持着 $m$ 做的测试发现 $C$ 为真时才退出；由于状态的一切改动都在持着 $m$ 时做出，直到线程释放 $m$（或再次等待）之前 $C$ 都保持为真。
:::

### 有界缓冲区

**生产者-消费者**或**有界缓冲区**问题是线程之间每条队列背后的模式：生产者把条目放入固定容量的缓冲区，消费者从中取出；缓冲区满时生产者必须等，空时消费者必须等。

::: example 用条件变量实现有界缓冲区 {#ex-bbuf}
实现一个 $8$ 个整数的环形缓冲区，由 $2$ 个生产者共享——每个放入数字 $1$ 到 $10^6$——和 $3$ 个消费者，消费者把取到的数加起来。使用一个互斥锁和两个条件变量。消费者怎么知道该停了？

```c
#include <pthread.h>
#include <stdio.h>

enum { CAP = 8, ITEMS = 1000000, PRODUCERS = 2, CONSUMERS = 3 };
static int buf[CAP], head, tail, count;            /* 环形缓冲区 */
static pthread_mutex_t m = PTHREAD_MUTEX_INITIALIZER;
static pthread_cond_t not_full = PTHREAD_COND_INITIALIZER;
static pthread_cond_t not_empty = PTHREAD_COND_INITIALIZER;
static long consumed_sum[CONSUMERS];

static void put(int x) {
    pthread_mutex_lock(&m);
    while (count == CAP)                           /* 用 while，不是 if */
        pthread_cond_wait(&not_full, &m);          /* 睡着期间释放 m */
    buf[tail] = x; tail = (tail + 1) % CAP; count++;
    pthread_cond_signal(&not_empty);
    pthread_mutex_unlock(&m);
}

static int get(void) {
    pthread_mutex_lock(&m);
    while (count == 0)
        pthread_cond_wait(&not_empty, &m);
    int x = buf[head]; head = (head + 1) % CAP; count--;
    pthread_cond_signal(&not_full);
    pthread_mutex_unlock(&m);
    return x;
}

static void *producer(void *arg) {
    (void)arg;
    for (int i = 1; i <= ITEMS; i++) put(i);
    return NULL;
}

static void *consumer(void *arg) {
    long *sum = arg;
    for (int x; (x = get()) != 0; ) *sum += x;    /* 0 表示"停止" */
    return NULL;
}

int main(void) {
    pthread_t p[PRODUCERS], c[CONSUMERS];
    for (int i = 0; i < CONSUMERS; i++) pthread_create(&c[i], NULL, consumer, &consumed_sum[i]);
    for (int i = 0; i < PRODUCERS; i++) pthread_create(&p[i], NULL, producer, NULL);
    for (int i = 0; i < PRODUCERS; i++) pthread_join(p[i], NULL);
    for (int i = 0; i < CONSUMERS; i++) put(0);    /* 每个消费者一个停止标记 */
    long total = 0;
    for (int i = 0; i < CONSUMERS; i++) { pthread_join(c[i], NULL); total += consumed_sum[i]; }
    printf("sum consumed %ld, expected %ld\n", total, (long)PRODUCERS * ITEMS * (ITEMS + 1L) / 2);
    for (int i = 0; i < CONSUMERS; i++) printf("consumer %d: %ld\n", i, consumed_sum[i]);
    return 0;
}
```
::: solution
```console
$ gcc -std=c17 -Wall -Wextra -O2 -pthread -o bbuf bbuf.c && ./bbuf
sum consumed 1000001000000, expected 1000001000000
consumer 0: 326381382670
consumer 1: 339399617069
consumer 2: 334220000261
```
总和恰为 $2 \times 10^6(10^6+1)/2$，所以没有条目丢失或被取走两次；工作如何在消费者之间分摊每次运行都不同。正确性立于三个事实。对 `buf`、`head`、`tail` 和 `count` 的所有访问都发生在持着 `m` 时。生产者只在 `count < CAP` 时写，消费者只在 `count > 0` 时读，这各自由它的 `while` 循环确立（[[#prop-while]]）。并且没有等待者会在其条件成立时长睡：每次使缓冲区变非空的 `put` 都信号 `not_empty`，每次 `get` 都信号 `not_full`。用*两个*条件变量是有讲究的——若生产者和消费者共用一个，消费者发给生产者的信号可能唤醒另一个消费者，它发现缓冲区是空的、只好又睡下，于是所有线程可能全都睡着。终止用**哨兵**：生产者结束后，`main` 为每个消费者放一个 $0$，取到 $0$ 的消费者停止（生产者从不放 $0$）。
:::
:::

::: warning 用 `if` 而不是 `while`
人们很想写 `if (count == 0) wait(...)`，理由是有条目加入时被唤醒的才会是消费者。在 Mesa 语义下这是错的：从信号发出到被唤醒的消费者重新拿到互斥锁之间，另一个消费者可能把条目取走。把 [[#ex-bbuf]] 里的两个 `while` 都改成 `if`，程序每次运行都会出错：

```console
$ ./bbuf-if | head -1
sum consumed 1374012642068, expected 1000001000000
$ ./bbuf-if | head -1
sum consumed 1342370524925, expected 1000001000000
```

消费者从空缓冲区里取了条目——读到过期的槽位、把 `count` 拖成负数——于是和是错的，而且每次错的量都不同。条件成立时 `while` 循环不花分文，还让代码在虚假唤醒下也保持正确。
:::

## 信号量

迪杰斯特拉（Dijkstra）的**信号量**（1965）早于条件变量，把一个计数器与等待合并在同一个对象里。

::: definition 信号量 {#def-semaphore}
**信号量** $S$ 持有一个创建时设定的非负整数值，有两个原子操作：

- $P(S)$（也称 *wait*、*down*、`sem_wait`）：等到值为正，然后将其减一；
- $V(S)$（也称 *signal*、*up*、`sem_post`）：将值加一，若有等待线程则唤醒其中一个。

值只取 $0$ 或 $1$ 的信号量称为**二元信号量**；否则称为**计数信号量**。（这两个字母来自荷兰语：$P$ 取 *passeren*"通过"或 *proberen*"尝试"，$V$ 取 *vrijgeven*"释放"或 *verhogen*"增加"。）
:::

::: theorem 信号量不变式 {#thm-sem-invariant}
对初值为 $s_0$ 的信号量，在每一时刻都有

$$
s = s_0 + \#V - \#P \ge 0,
$$ {#eq-sem}

其中 $s$ 是它的值，$\#V$ 是已完成的 $V$ 操作数，$\#P$ 是已完成的 $P$ 操作数。因此，若每个线程都用 $P(S)$ 和 $V(S)$ 把自己临界区的两头括起来且 $s_0 = 1$，则同一时刻至多一个线程在其临界区内；$s_0 = k$ 时至多 $k$ 个。
:::

::: proof
初始时 $\#V = \#P = 0$ 且 $s = s_0$。每个完成的 $V$ 给 $s$ 加 $1$、给 $\#V$ 加 $1$；每个完成的 $P$ 给 $s$ 减 $1$、给 $\#P$ 加 $1$，而它只在 $s$ 为正时才完成，所以 $s$ 保持非负。对已完成操作的序列（它们是原子的，故有其先后）归纳，即得 [[#eq-sem]]。对推论，处在临界区内的线程数是 $\#P - \#V$（每个都由一个完成的 $P$ 进入、尚未被 $V$ 送出），由 [[#eq-sem]] 它等于 $s_0 - s \le s_0$。
:::

信号量有三种用法：作**锁**（$s_0 = 1$）、**计数资源**（$s_0 = k$，例如 $k$ 个数据库连接）、**安排事件先后**（$s_0 = 0$：一个线程做 $P$ 等待，直到另一个做 $V$，如"等子进程完成初始化"）。初值为 $0$ 的信号量像一个*有记忆*的条件变量：先于 $P$ 发生的 $V$ 不会丢。

用信号量的有界缓冲区每种恰用一个：`empty` 数空闲槽位（$s_0 =$ 容量），`full` 数已填槽位（$s_0 = 0$），`mutex` 保护下标（$s_0 = 1$）。

::: example $P$ 操作的顺序要紧 {#ex-sem-order}
在下面的信号量版有界缓冲区中，生产者先等空闲槽位、再加锁。证明把 `put` 里两个 `sem_wait` 调用的次序交换会引起死锁，并运行程序加以证实。

```c
#define _POSIX_C_SOURCE 200809L
#include <pthread.h>
#include <semaphore.h>
#include <stdio.h>

enum { CAP = 8, ITEMS = 1000000 };
static int buf[CAP], head, tail;
static sem_t empty, full, mutex;            /* 空槽数、满槽数；一把锁 */

static void put(int x) {
#ifdef WRONG
    sem_wait(&mutex); sem_wait(&empty);    /* 先加锁再等空位：死锁 */
#else
    sem_wait(&empty); sem_wait(&mutex);    /* 先等空位再加锁 */
#endif
    buf[tail] = x; tail = (tail + 1) % CAP;
    sem_post(&mutex); sem_post(&full);
}

static int get(void) {
    sem_wait(&full); sem_wait(&mutex);
    int x = buf[head]; head = (head + 1) % CAP;
    sem_post(&mutex); sem_post(&empty);
    return x;
}

static void *producer(void *arg) {
    for (int i = 1; i <= ITEMS; i++) put(i);
    return arg;
}

int main(void) {
    sem_init(&empty, 0, CAP);               /* 槽位全空 */
    sem_init(&full, 0, 0);                  /* 没有已填的 */
    sem_init(&mutex, 0, 1);                 /* 二元信号量 = 锁 */
    pthread_t p;
    pthread_create(&p, NULL, producer, NULL);
    long sum = 0;
    for (int i = 0; i < ITEMS; i++) sum += get();
    pthread_join(p, NULL);
    printf("sum %ld, expected %ld\n", sum, ITEMS * (ITEMS + 1L) / 2);
    return 0;
}
```
::: solution
设缓冲区已满而生产者跑的是错误版 `put`：它拿到 `mutex`（值 $1 \to 0$），然后阻塞在 `sem_wait(&empty)` 里，因为 `empty` 是 $0$——*手里还攥着互斥锁*。消费者通过了 `sem_wait(&full)`，阻塞在 `sem_wait(&mutex)` 上。现在生产者等消费者 $V$ 出 `empty`，消费者等生产者 $V$ 出 `mutex`：谁都动不了。

```console
$ gcc -std=c17 -Wall -Wextra -O2 -pthread -o sembuf sembuf.c && ./sembuf
sum 500000500000, expected 500000500000
$ gcc -std=c17 -Wall -Wextra -O2 -pthread -DWRONG -o sembuf-wrong sembuf.c
$ timeout 10 ./sembuf-wrong; echo "status $?"
status 124
```

错误版三次运行三次挂住（缓冲区几乎立刻就被填满）。规则是：手里攥着"使条件成立的那个线程所需要的锁"时，绝不等条件。条件变量自动强加这条规则，因为 `wait` 会释放互斥锁。
:::
:::

信号量很强大却没有结构——程序里任何地方少一个 $V$ 或多一个 $P$ 都会把程序弄坏——所以 Per Brinch Hansen（1973）和霍尔（Hoare，1974）提出了**管程**：一个模块，其数据只能通过它的过程访问，而语言在隐式的互斥锁下执行这些过程，等待则交给条件变量。Java 的 `synchronized` 方法配 `wait`、`notify` 和 `notifyAll`，C# 的 `lock` 配 `Monitor.Wait`，实质都是管程；在 C 里，像 [[#ex-bbuf]] 那样有纪律地使用一个互斥锁和条件变量，等同于同一回事。

### 读者与写者

许多数据结被读的次数远多于被写。一把普通互斥锁毫无必要地把读者串行化；**读者-写者锁**允许任意多个读者*或*一个写者。Courtois、Heymans 与 Parnas（1971）给出了用信号量的两个经典解法，并指出了它们引出的策略问题：若只要没有写者*正在写*读者就可进入，源源不断的读者会饿死等待的写者；若只要有写者*正在等*新读者就必须等待，写者又可能饿死读者。POSIX 提供 `pthread_rwlock_t`，其偏向由实现定义（glibc 默认偏向读者，也有选项偏向写者）；Linux 内核提供 `rwlock_t`、`rw_semaphore` 和**读-复制-更新**（RCU）机制——读者完全不拿锁，写者发布数据的新版本。

::: quiz
信号量 $S$ 以值 $2$ 创建。三个线程各执行一次 $P(S)$，然后一个线程执行一次 $V(S)$。哪些说法正确？
- [x] 头两个 $P$ 操作立即完成；第三个等待。
- [x] 那次 $V$ 之后，第三个 $P$ 完成，值为 $0$。
- [ ] 那次 $V$ 之后，值为 $1$。
- [x] 按不变式，四个操作全部完成后值为 $2 + 1 - 3 = 0$。
::: solution
头两个 $P$ 把值从 $2$ 取到 $0$；第三个必须等。$V$ 唤醒它，它的 $P$ 完成；由 [[#thm-sem-invariant]]，值为 $s_0 + \#V - \#P = 2 + 1 - 3 = 0$。值永不可能为负，所以它不会以 $-1$ "记住"等待的线程（有些教科书写法让值变负以数等待者，但那是实现细节；抽象的值以不变式里那个为准）。
:::
:::

## 死锁

::: definition 死锁 {#def-deadlock}
若一组线程中的每个线程都在等待一个通常只有组内另一个线程才能引发的事件——通常是某个资源的释放——则称这组线程**死锁**。
:::

典型例子是**哲学家就餐**问题（迪杰斯特拉，1965；故事出自霍尔）：五位哲学家围坐圆桌，每两人之间放一支叉；每人交替思考和进食，进食需要左右两支叉。若每人都先拿左手的叉、再拿右手的，而所有人同时抄起左手的叉，每人就永远等右手那支。

::: example 哲学家死锁 {#ex-dining}
用每支叉一把互斥锁实现哲学家，每人先拿左叉再拿右叉，进餐 $10^5$ 次。运行它，并在其挂住时查看各线程。然后让每人先拿编号较小的那支叉。

```c
#include <pthread.h>
#include <stdio.h>

enum { N = 5, MEALS = 100000 };
static pthread_mutex_t fork_[N];
static int ordered;                        /* 1：总是先拿编号较小的叉 */
static long meals[N];

static void *philosopher(void *arg) {
    int i = (int)(long)arg;
    int first = i, second = (i + 1) % N;   /* 左手的叉，然后右手的叉 */
    if (ordered && first > second) { int t = first; first = second; second = t; }
    for (int k = 0; k < MEALS; k++) {
        pthread_mutex_lock(&fork_[first]);
        pthread_mutex_lock(&fork_[second]);
        meals[i]++;                        /* 吃 */
        pthread_mutex_unlock(&fork_[second]);
        pthread_mutex_unlock(&fork_[first]);
    }
    return NULL;
}

int main(int argc, char *argv[]) {
    ordered = argc > 1;                    /* 带任意参数即选有序版 */
    (void)argv;
    pthread_t t[N];
    for (int i = 0; i < N; i++) pthread_mutex_init(&fork_[i], NULL);
    for (long i = 0; i < N; i++) pthread_create(&t[i], NULL, philosopher, (void *)i);
    for (int i = 0; i < N; i++) pthread_join(t[i], NULL);
    long total = 0;
    for (int i = 0; i < N; i++) total += meals[i];
    printf("all philosophers finished: %ld meals\n", total);
    return 0;
}
```
::: solution
```console
$ gcc -std=c17 -Wall -Wextra -O2 -pthread -o dine dine.c
$ timeout 10 ./dine; echo "status $?"
status 124
$ ./dine & sleep 2; ps -L -o tid,stat,wchan:20,pcpu -p $!
    TID STAT WCHAN                %CPU
3574903 Sl   futex_do_wait         0.0
3574905 Sl   futex_do_wait         0.0
3574906 Sl   futex_do_wait         0.0
3574907 Sl   futex_do_wait         0.0
3574908 Sl   futex_do_wait         0.0
3574909 Sl   futex_do_wait         0.0
$ timeout 10 ./dine ordered; echo "status $?"
all philosophers finished: 500000 meals
status 0
```
无序版三次运行三次死锁，都在眨眼之间：每人 $10^5$ 餐，五人同时持住左叉的时刻来得飞快。`ps` 显示所有线程都*睡*（`S`）在内核的 futex 等待里，一个 CPU 也不耗——死锁不像 [[operating-systems/threads-locks]] 里那种忙自旋，它悄无声息。（列出的第一个线程是 `main`，在 `pthread_join` 里等。）采用排序后，哲学家 $4$ 先拿叉 $0$ 再拿叉 $4$，程序每次都跑完。下一条定理解释了为什么。
:::
:::

::: widget graph
nodes: P0@2,4; P1@4,2.5; P2@3.2,0; P3@0.8,0; P4@0,2.5
edges: P0>P1; P1>P2; P2>P3; P3>P4; P4>P0
algorithm: dfs
start: P0
caption: 死锁哲学家的等待图：每个哲学家 $P_i$ 持叉 $i$、等 $P_{i+1}$ 持有的叉 $i+1$，于是有边 $P_i \to P_{i+1}$。从 $P_0$ 起逐步执行深度优先搜索：最后检查的边 $P_4 \to P_0$ 指回一个仍在栈上的顶点，环就此现形。再设想 $P_4$ 像有序版那样先拿编号较小的叉 $0$：只要 $P_0$ 持着叉 $0$，两手空空的 $P_4$ 就在等叉 $0$，于是边 $P_3 \to P_4$ 消失，环也随之消失。
:::

Edward Coffman、Melanie Elphick 与 Arie Shoshani（1971）找出了每个涉及资源的死锁都满足的条件。

::: theorem 死锁的必要条件 {#thm-coffman}
若一组获取资源且持着资源等别的资源的线程死锁了，则下面四条全部成立：

1. **互斥**：有些资源一次只能被一个线程持有。
2. **占有并等待**：线程持着资源的同时等待别的资源。
3. **不可抢占**：资源不能被从持有它的线程手里夺走；只能由持有者自愿释放。
4. **循环等待**：存在一个线程环 $T_1, \dots, T_k$，其中每个 $T_i$ 等待 $T_{i+1}$ 持有的资源，而 $T_k$ 等待 $T_1$ 持有的资源。
:::

::: proof
每个死锁线程 $T$ 都在等一个只有另一个死锁线程才能释放的资源（[[#def-deadlock]]）。若没有资源是排他的，$T$ 就不必等它（1）。$T$ 的等待使它无法释放自己占着的东西，而组内必有线程占着某个东西，否则没人会等着谁释放（2）。若资源可被抢占，系统本可以从持有者手里拿走 $T$ 所等的资源，等待便告结束（3）。对 (4)，给每个死锁线程定义一个后继：一个持有它所等之资源的死锁线程。从任何线程出发沿后继走，我们始终留在有限的死锁集合内，于是某个线程必会重复：存在环。
:::

这些条件是必要的，一般却不是充分的——资源有多个相同单位时，环外的某个线程释放一个单位就能解开等待环。每种资源只有一个单位时，它们就也是充分的，而且一张图恰好看清死锁。

::: definition 资源分配图 {#def-rag}
**资源分配图**是有向图，每个线程、每个资源各有一个顶点；资源 $R$ 被线程 $T$ 持有时有边 $R \to T$，$T$ 等待 $R$ 时有边 $T \to R$。当每种资源只有一个单位时，**等待图**在 $T$ 等待 $T'$ 持有的资源时含有边 $T \to T'$。
:::

::: theorem 死锁即环 {#thm-rag-cycle}
若每种资源只有一个单位，则一组线程死锁当且仅当资源分配图（等价地，等待图）中含有经过它们的环。
:::

::: proof
若线程们死锁，[[#thm-coffman]] 证明里的后继论证给出环 $T_1 \to R_1 \to T_2 \to \dots \to T_1$，其中每个 $T_i$ 等待由 $T_{i+1}$ 持有的 $R_i$。反过来，设存在这样的环。每个 $R_i$ 只有一个单位，由 $T_{i+1}$ 持有，而 $T_{i+1}$ 自己正阻塞着等 $R_{i+1}$；所以 $R_i$ 只有 $T_{i+1}$ 前进之后才会释放，而这要求 $R_{i+1}$ 先释放，如此绕环一周回到 $R_i$。环上没有线程能够前进：它们死锁了。
:::

::: widget graph
nodes: T1@0,2; R1@1,3; T2@2,2; R2@3,1; T3@2,0; R3@1,1; T4@4,2; R4@4,3
edges: R1>T1; T1>R3; R3>T3; T3>R2; R2>T2; T2>R1; R4>T4; T4>R2
algorithm: dfs
start: T1
caption: 一张资源分配图：$R \to T$ 表示 $R$ 由 $T$ 持有，$T \to R$ 表示 $T$ 等待 $R$。从 $T1$ 起逐步执行深度优先搜索。当它检查边 $T2 \to R1$ 时，$R1$ 还在栈上——一条**后向边**，在有向图中它恰在存在环时出现。环 $T1 \to R3 \to T3 \to R2 \to T2 \to R1 \to T1$ 由 [[#thm-rag-cycle]] 即是一场死锁。$T4$ 也在等（等 $R2$），但它不在环上：它被堵在死锁之后，而不是死锁的一部分。删去边 $T2 > R1$，死锁即告消失。
:::

于是死锁检测就是环检测，时间对该图的大小是线性的——[[algorithms]] 的深度优先搜索。每种资源有多个单位时，检测要用下面安全性算法的一个变体。

### 预防：打破一个条件

四条条件无一必要不可，所以让其中任何一条不可能成立就预防了死锁。

- **互斥**有时可以不共享而避免：用 compare-and-swap 构造的无锁数据结构，或让每个线程人手一份副本。
- **占有并等待**可以通过做事之前一次拿齐所有锁来预防（常常不切实际：需要的锁集合可能取决于线程会发现什么），也可以用 `trylock`：第二把锁拿不到就放下第一把、从头再来（这有**活锁**之虞——线程们步调一致地反复退让）。
- **不可抢占**对状态可以保存并恢复的资源——处理器、内存页——可以放宽，但对保护着一半更新数据的锁不行。
- **循环等待**是真实系统实际打破的那条，靠排序。

::: theorem 锁排序预防死锁 {#thm-ordering}
设锁都编了号，且每个线程按编号递增的顺序获取它同时持有的锁。则这些锁之间不可能发生死锁。
:::

::: proof
设线程 $T_1, \dots, T_k$ 死锁；由 [[#thm-coffman]] 存在一个环，其中 $T_i$ 持锁 $L_i$、等待 $T_{i+1}$ 持有的 $L_{i+1}$（下标模 $k$）。既然 $T_i$ 持着 $L_i$ 时请求 $L_{i+1}$，按序获取给出对一切 $i$ 有 $n(L_i) < n(L_{i+1})$，其中 $n$ 是锁的编号。沿环走一圈，$n(L_1) < n(L_2) < \dots < n(L_k) < n(L_1)$，不可能。
:::

[[#ex-dining]] 的有序哲学家就是这一定理在干活。在大型程序里，这个顺序是一份成文的层级——Linux 内核的 `mm/filemap.c` 开头就有一段注释列出它的内存管理锁必须按什么顺序获取——并有工具检查它：Linux 的 **lockdep** 在运行期记录每个锁类被获取的顺序，在任何可能闭合成环的获取*真正*酿成死锁之前报告它。ThreadSanitizer 对用户程序做同样的事（"lock-order-inversion"）。

### 避免：银行家算法

避免不限制资源的请求方式；系统改为拒绝（推迟）任何可能通向死锁的请求。它需要预先的知识：每个线程申报它每种资源可能持有的**最大**数量。

::: definition 安全状态 {#def-safe}
有 $n$ 个线程和 $m$ 种资源。设 $\text{Avail}[j]$ 为类型 $j$ 的空闲数量，$\text{Alloc}[i][j]$ 为线程 $i$ 持有的类型 $j$ 数量，$\text{Max}[i][j]$ 为其申报的最大值，$\text{Need} = \text{Max} - \text{Alloc}$。一个状态称为**安全的**，若存在线程的一个次序 $i_1, \dots, i_n$——一条**安全序列**——使得每个 $i_k$ 的剩余需求都能由空闲数量加上 $i_1, \dots, i_{k-1}$ 持有的数量满足：

$$
\text{Need}[i_k] \le \text{Avail} + \sum_{\ell < k} \text{Alloc}[i_\ell] \quad \text{（按分量）}.
$$
:::

在安全状态下，系统总能避开死锁：必要时把 $i_1$ 跑到完（它的全部需求都能满足），让它释放一切，然后 $i_2$，依此类推。不安全状态未必已经死锁——线程们可能压根不去要满最大值——但系统不再能保证避开死锁。

::: algorithm 银行家算法（迪杰斯特拉） {#alg-banker}
*安全性检查。* 置 $\text{Work} \gets \text{Avail}$，把每个线程标为未完成。反复：找一个未完成且 $\text{Need}[i] \le \text{Work}$ 的线程 $i$；把它标为完成并置 $\text{Work} \gets \text{Work} + \text{Alloc}[i]$。当这样的线程不存在时，状态安全当且仅当每个线程都已完成。

*请求。* 线程 $i$ 请求一个向量 $\text{Req}$ 时：若任一分量上 $\text{Req} > \text{Need}[i]$，这是错误；若任一分量上 $\text{Req} > \text{Avail}$，$i$ 必须等待。否则假装批准（$\text{Avail} \mathrel{-}= \text{Req}$，$\text{Alloc}[i] \mathrel{+}= \text{Req}$）并做安全性检查；新状态安全就批准请求，否则撤销假装，让 $i$ 等待。
:::

安全性检查虽然是贪心地挑线程，结果却是正确的：完成一个线程只会*增大* $\text{Work}$，所以某个时刻能完成的线程之后照样能完成，挑选的次序从不影响结果。每次检查代价 $O(mn^2)$。

::: example 运行银行家算法 {#ex-banker}
五个线程 $P_0$–$P_4$ 共享三种资源 A、B、C。当前状态：

| 线程 | Alloc (A B C) | Max (A B C) | Need (A B C) |
|---|---|---|---|
| $P_0$ | 1 0 1 | 3 2 2 | 2 2 1 |
| $P_1$ | 2 1 0 | 2 2 1 | 0 1 1 |
| $P_2$ | 0 1 1 | 1 3 1 | 1 2 0 |
| $P_3$ | 1 1 0 | 2 1 2 | 1 0 2 |
| $P_4$ | 0 0 2 | 1 1 3 | 1 1 1 |

且 $\text{Avail} = (1, 1, 1)$。状态安全吗？该批准 $P_2$ 对 $(1, 0, 0)$ 的请求吗？$P_0$ 对 $(1, 1, 0)$ 的请求呢？
::: solution
安全性：$\text{Work} = (1,1,1)$。$P_0$ 需要 $(2,2,1)$：不行。$P_1$ 需要 $(0,1,1) \le (1,1,1)$：让它完成，$\text{Work} = (1,1,1) + (2,1,0) = (3,2,1)$。$P_2$：$(1,2,0) \le (3,2,1)$，$\text{Work} = (3,3,2)$。$P_3$：$(1,0,2) \le (3,3,2)$，$\text{Work} = (4,4,2)$。$P_4$：$(1,1,1)$，$\text{Work} = (4,4,4)$。$P_0$：$(2,2,1)$，$\text{Work} = (5,4,5)$，每种资源的总量。安全，安全序列为 $P_1, P_2, P_3, P_4, P_0$。

$P_2$ 请求 $(1,0,0)$：不超过它的需求，且数量可得。假装：$\text{Avail} = (0,1,1)$，$\text{Alloc}[2] = (1,1,1)$，$\text{Need}[2] = (0,2,0)$。安全性：$P_1$ 需要 $(0,1,1) \le (0,1,1)$，$\text{Work} = (2,2,1)$；$P_2$ 需要 $(0,2,0)$，$\text{Work} = (3,3,2)$；然后 $P_3$、$P_4$、$P_0$ 如前。安全：**批准**。

$P_0$ 请求 $(1,1,0)$（从原始状态出发）：不超过它的需求，且数量可得。假装：$\text{Avail} = (0,0,1)$，$\text{Need}[0] = (1,1,1)$。现在每个线程都至少需要一单位 A 或 B，而两者都无空闲：$P_1$ 需要 $(0,1,1)$，$P_2$ $(1,2,0)$，$P_3$ $(1,0,2)$，$P_4$ $(1,1,1)$，$P_0$ $(1,1,1)$。没有任何线程能被保证跑完：不安全，所以 $P_0$ **等待**。[[#alg-banker]] 的一个简短 Python 实现给出同样的判决。
:::
:::

银行家算法虽然优雅，通用操作系统却几乎不用：线程很少知道自己的最大需求，线程数瞬息万变，而且每个请求都检查一次代价不菲。它的思想在准入控制里存活下来——实时调度器只在所有期限仍能守住时才接纳一个任务，数据库限制并发事务数。

### 检测与恢复

第三种做法让死锁发生，靠找环把它们检测出来，再通过**终止**环上的一个线程或**抢占**它的某个资源来恢复。数据库就是这么做的：它们的锁管理器维护事务间的等待图，环一出现就终止一个事务（"牺牲者"，按损失工作量最小来选），回滚它的改动再重试（[[databases]]）。操作系统多半选第四种办法——对用户级锁装聋作哑（"鸵鸟算法"）——把预防留给程序员和 lockdep，对分布式资源用超时。

## 优先级反转

锁与优先级调度（[[operating-systems/processes-scheduling]]）相处得很糟。设低优先级线程 $L$ 持有一把高优先级线程 $H$ 需要的锁。$H$ 阻塞——这在预料之中，且只持续 $L$ 的一个临界区长。但若一个不需要这把锁的中优先级线程 $M$ 变为就绪，它就抢占 $L$；如今 $H$ 等 $L$、$L$ 等 $M$，$M$ 跑多久就等多久。$H$ 实际上在以*低于* $M$ 的优先级运行：**优先级反转**。

1997 年 7 月，火星探路者号（Mars Pathfinder）着陆器在着陆数天后开始一次次复位。一个低优先级的气象任务持着保护信息总线的互斥锁；一个高优先级的总线管理任务需要它；中优先级的通信任务抢占了这个低优先级持锁者；看门狗发现总线任务没有按时运行，于是复位系统。喷气推进实验室（JPL）的工程师在地球上的副本上复现了故障，并上传一个改动修复了它：给那把互斥锁打开**优先级继承**——一个线程持着高优先级线程正在等待的锁期间，以等待者的优先级运行，于是 $M$ 再也抢占不了它。POSIX 以 `PTHREAD_PRIO_INHERIT` 互斥锁协议提供这一机制，Linux 的实时互斥锁实现了它；另一个方案**优先级天花板**把锁持有者提升到可能使用这把锁的线程中的最高优先级。

::: history
迪杰斯特拉（Dijkstra）在 1965 年的手稿 "Cooperating sequential processes"（EWD 123）中引入了信号量，连同有界缓冲区和哲学家就餐问题以及银行家算法；他 1968 年关于 THE 多道程序系统的论文展示了信号量组织起整个操作系统。Pierre-Jacques Courtois、Frans Heymans 与 David Parnas 于 1971 年发表了读者-写者问题，同年 Coffman、Elphick 与 Shoshani 的综述 "System deadlocks" 给出了四个条件以及预防、避免、检测三大策略。Richard Holt 1972 年的论文 "Some deadlock properties of computer systems" 把资源分配图形式化。Per Brinch Hansen（1973）与霍尔（Hoare，1974）提出了管程；Butler Lampson 与 David Redell 1980 年关于 Mesa 的论文解释了为什么真实系统采用"信号只是提醒"的语义。Lui Sha、Ragunathan Rajkumar 与 John Lehoczky 于 1990 年分析了优先级继承与优先级天花板协议——探路者号团队 1997 年应用的正是这项工作。
:::

## 后续内容

同样的模式出现在每一个尺度上。在一台机器内，[[parallel-computing]] 研究可扩展的同步——屏障、无锁队列、事务内存——以及使它们正确的内存模型。跨机器，[[distributed-systems]] 面对分布式死锁、没有共享内存的互斥与共识。数据库检测事务之间的死锁，并用两阶段锁使它们可串行化（[[databases]]）。更高层次的并发——消息传递、通道、actor、async/await——旨在让本章这些缺陷更难写出来（[[programming-languages]]）。在本课程中，[[operating-systems/file-systems]] 需要另一种先后：当任何一串写的中途都可能被崩溃打断时，如何让盘上结构保持一致。

::: summary
- **条件变量**（[[#def-cv]]）让线程一边原子地释放互斥锁一边睡下，直到另一个线程信号说状态可能变了；在 Mesa 语义下，永远用 `while` 循环等待（[[#prop-while]]）——改用 `if`，有界缓冲区每次运行都算出错误的和。
- **有界缓冲区**需要一个互斥锁和两个条件变量（或三个信号量），外加一个体面的让消费者停下来的办法（[[#ex-bbuf]]）。
- **信号量**（[[#def-semaphore]]）满足 $s = s_0 + \#V - \#P \ge 0$（[[#thm-sem-invariant]]）；它可作锁、作计数器、作先后安排器。手里拿着发信号者需要的锁时，绝不在信号量上等待（[[#ex-sem-order]]）。
- **死锁**（[[#def-deadlock]]）需要互斥、占有并等待、不可抢占与循环等待（[[#thm-coffman]]）；资源均为单单位时，它恰是资源分配图中的环（[[#thm-rag-cycle]]）。
- 按全局顺序获取锁来**预防**（[[#thm-ordering]]）——有序哲学家每次都跑完，无序的每次都挂住；用银行家算法和安全状态来**避免**（[[#alg-banker]]）；或者**检测**环并终止一个牺牲者，数据库就是这么干的。
- **优先级反转**让中优先级线程经由一把锁拖住高优先级线程；**优先级继承**治好了它（火星探路者号，1997）。
:::

## 习题

::: exercise 信号量算术 {level=1 check="3"}
一个信号量从 $5$ 起步。一段时间内，$9$ 次 $P$ 操作和 $7$ 次 $V$ 操作完成，且没有线程在等待。它的值是多少？（输入该值。）
::: solution
由 [[#thm-sem-invariant]]，$s = 5 + 7 - 9 = 3$。
:::
:::

::: exercise 用信号量安排先后 {level=1}
线程 A 必须在 B 执行 $b_2$ 之前执行语句 $a_1$，且 B 必须在 A 执行 $a_2$ 之前执行 $b_1$。各线程的代码是 `a1; a2;` 和 `b1; b2;`。加上信号量（连同初值），使两个约束都成立且没有死锁。
::: solution
用两个初值为 $0$ 的信号量：`aDone` 和 `bDone`。线程 A：`a1; V(aDone); P(bDone); a2;`。线程 B：`b1; V(bDone); P(aDone); b2;`。每个线程*先发信号后等待*，所以谁也不可能卡在等另一个还没来得及发出的信号上：这就是**会合**（rendezvous）模式。若两者都先等待（`P` 在 `V` 前），两者就永远阻塞。
:::
:::

::: exercise 数一数死锁的线程 {level=1 check="3"}
图里那张资源分配图中有几个线程死锁？（输入数目。）
::: solution
环 $T1 \to R3 \to T3 \to R2 \to T2 \to R1 \to T1$ 经过 $T1$、$T2$ 和 $T3$：死锁的是这三个（[[#thm-rag-cycle]]）。$T4$ 等待 $T2$ 持有的 $R2$，而 $T2$ 永远不会释放它，所以 $T4$ 也永远被堵住——但按 [[#def-deadlock]] 的含义它并*不*在死锁*之中*：终止它不影响其他线程，终止它也解决不了任何问题。答案是 $3$。
:::
:::

::: exercise 再多一个请求 {level=2}
在 [[#ex-banker]] 的原始状态中，$P_3$ 请求 $(0, 0, 1)$。该批准吗？再为 $P_4$ 找出一个单单位的、可以批准的请求。
::: solution
假装批准之后：$\text{Avail} = (1, 1, 0)$，$\text{Alloc}[3] = (1, 1, 1)$，$\text{Need}[3] = (1, 0, 1)$。没有线程的需求装得进 $(1,1,0)$：$P_0$ 需要 $(2,2,1)$，$P_1$ $(0,1,1)$（要一个 C），$P_2$ $(1,2,0)$（要两个 B），$P_3$ $(1,0,1)$（要一个 C），$P_4$ $(1,1,1)$。不安全：$P_3$ 等待。对 $P_4$，试 $(0, 1, 0)$：$\text{Avail} = (1, 0, 1)$，$\text{Need}[4] = (1, 0, 1)$。于是 $P_4$ 自己就能满足：$\text{Work} = (1,0,1) + (0,1,2) = (1,1,3)$；$P_1$ 的 $(0,1,1)$ 装得下，$\text{Work} = (3,2,3)$；随后 $P_2$、$P_3$、$P_0$ 都装得下。安全：批准。（$P_4$ 请求 $(1,0,0)$ 或 $(0,0,1)$ 也是安全的；用该算法的 Python 版验一验。）
:::
:::

::: exercise 用互斥锁和条件变量造信号量 {level=2}
用一个 `pthread_mutex_t` 和一个 `pthread_cond_t` 实现一个计数信号量类型，含 `sem_init_(s, v)`、`P(s)` 和 `V(s)`，并论证它满足 [[#thm-sem-invariant]]。
::: solution
```c
#include <pthread.h>

typedef struct {
    int value;
    pthread_mutex_t m;
    pthread_cond_t positive;
} semaphore;

void sem_init_(semaphore *s, int v) {
    s->value = v;
    pthread_mutex_init(&s->m, NULL);
    pthread_cond_init(&s->positive, NULL);
}

void P(semaphore *s) {
    pthread_mutex_lock(&s->m);
    while (s->value == 0)                       /* 等到为正 */
        pthread_cond_wait(&s->positive, &s->m);
    s->value--;
    pthread_mutex_unlock(&s->m);
}

void V(semaphore *s) {
    pthread_mutex_lock(&s->m);
    s->value++;
    pthread_cond_signal(&s->positive);         /* 一个等待者现在可以前进 */
    pthread_mutex_unlock(&s->m);
}
```
`value` 只在持着 `m` 时被改动，所以每个 `P` 和 `V` 相对于其他都是原子的。`P` 只在它的 `while` 循环于持锁状态下发现 `value > 0` 之后才减一（[[#prop-while]]），所以 `value` 永不为负，且每个完成的 `P` 恰好减 $1$、每个 `V` 加 $1$：这就是不变式。没有 `V` 会丢：无人等待时值照样增加，之后的某个 `P` 会发现它。每个 `V` 信号一个等待者就够，因为一次增量只能满足一个 `P`。
:::
:::

::: exercise 不排序的哲学家 {level=2}
给出另外两种让哲学家不死锁的办法，各打破一条 Coffman 条件，并分别说出代价。
::: solution
(1) 打破*占有并等待*：哲学家要么原子地两支叉一起拿、要么一支都不拿——例如对第二支叉用 `pthread_mutex_trylock`，失败就放回第一支重来。代价：可能活锁、白费功夫；加上随机退避。(2) 用初值为 $4$ 的计数信号量（"管家"）把入席哲学家的数目限制为四。这样至多四个哲学家对五支叉，必有哲学家能拿到两支；这以有别于排序的方式打破了*循环等待*——环非得牵扯全部五人不可。代价：每餐多一次信号量操作，而且叉子空着时哲学家也可能要等。打破*互斥*意味着一支两人可同时用的叉——那根本不算叉子了。
:::
:::

::: exercise 多单位资源的死锁 {level=3}
举例说明资源有多个单位时，资源分配图中的环并不蕴含死锁。然后证明：若 $n$ 个线程共享某资源的 $m$ 个相同单位、每个至多需要 $k$ 个单位，且 $n(k - 1) + 1 \le m$，则死锁不可能发生。
::: solution
例：资源 $R$ 有两个单位，由 $T_2$ 和 $T_3$ 持有；资源 $S$ 有一个单位，由 $T_1$ 持有。$T_1$ 等 $R$，$T_2$ 等 $S$。图中含有环 $T_1 \to R \to T_2 \to S \to T_1$。但 $T_3$ 并没有在等；它跑完释放它的 $R$ 单位后，$T_1$ 得到它、跑完，再释放 $S$ 给 $T_2$。没有死锁。

上界：设线程们死锁，每个都在等至少一个更多单位、持着其余的。等待的线程至多持有 $k - 1$ 个单位（否则它需要的已全部到手）。所以持住的单位总数至多 $n(k - 1)$，于是至少 $m - n(k-1) \ge 1$ 个单位空闲——某个等待线程的请求本可被满足，与死锁矛盾。（任何不在等待的线程都会跑完并释放它的单位，只有好处。）例如，打印机资源池中三个各需要两台打印机的线程，只要有 $3 \times 1 + 1 = 4$ 台打印机就永远不会死锁。
:::
:::

::: exercise 一个锁序检查器 {level=3}
写一个 Python 类，在程序的一次运行中记录线程每次持着锁 $A$ 时获取锁 $B$，作为图中一条边 $A \to B$，并在某次获取将造成环时立刻报告潜在的死锁——lockdep 背后的思想。用哲学家们的获取次序测试它。
::: solution
```python
from collections import defaultdict

class LockOrder:
    def __init__(self):
        self.after = defaultdict(set)      # A -> {B}：持 A 时曾获取过 B
        self.held = defaultdict(list)      # 线程 -> 持有的锁，按顺序

    def _reaches(self, a, b):              # 是否存在路径 a -> ... -> b？
        stack, seen = [a], set()
        while stack:
            x = stack.pop()
            if x == b:
                return True
            if x not in seen:
                seen.add(x)
                stack.extend(self.after[x])
        return False

    def acquire(self, thread, lock):
        for h in self.held[thread]:
            if self._reaches(lock, h):     # 新边 h -> lock 将闭合一个环
                print(f"possible deadlock: {thread} takes {lock} while holding {h}")
            self.after[h].add(lock)
        self.held[thread].append(lock)

    def release(self, thread, lock):
        self.held[thread].remove(lock)

for ordered in (False, True):
    lo = LockOrder()
    for i in range(5):                     # 每个哲学家轮流进餐一次
        a, b = i, (i + 1) % 5
        if ordered and a > b:
            a, b = b, a
        lo.acquire(f"P{i}", f"fork{a}"); lo.acquire(f"P{i}", f"fork{b}")
        lo.release(f"P{i}", f"fork{b}"); lo.release(f"P{i}", f"fork{a}")
    print("ordered" if ordered else "unordered", "done")
```
```console
$ python3 lockorder.py
possible deadlock: P4 takes fork0 while holding fork4
unordered done
ordered done
```
尽管这里哲学家们是一个一个进餐的、实际上并未发生任何死锁，检查器还是找出了那个潜在的：fork0 → fork1 → fork2 → fork3 → fork4 这些边由哲学家 0–3 记下，而哲学家 4 持着 fork4 时获取 fork0 将闭合这个环。采用排序后，哲学家 4 先拿 fork0，环无从形成（[[#thm-ordering]]）。检查*顺序*而不是坐等死锁发生，正是 lockdep 有效的缘由：一次走遍每条代码路径的运行就足够。
:::
:::
