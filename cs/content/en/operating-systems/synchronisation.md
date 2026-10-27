A web server has a pool of worker threads and a queue of incoming connections. A thread that accepts a connection puts it on the queue; a worker takes connections off it. Locks from [[operating-systems/threads-locks]] keep the queue consistent. But what should a worker do when the queue is empty? Spinning — locking, looking, unlocking, again and again — burns a core for nothing. It needs to **sleep until something happens**, and the thread that adds a connection needs to wake it. Doing this without losing a wake-up, without waking the wrong thread, and without deadlocking is the subject of this chapter.

We introduce the two classic tools for waiting: **condition variables**, which are used with a lock, and **semaphores**, which combine counting with waiting. We use them to solve the standard problems of concurrent programming — the bounded buffer, readers and writers, the dining philosophers — and on the way meet the most dangerous failure of concurrent systems: **deadlock**, in which threads wait for one another for ever. We state the conditions under which deadlock can occur, prove that a resource-allocation graph detects it, and study the three ways of dealing with it: prevention (lock ordering), avoidance (the banker's algorithm), and detection with recovery. We finish with priority inversion, the bug that nearly ended a mission on Mars.

All programs were compiled as `gcc -std=c17 -Wall -Wextra -O2 -pthread` on the test machine, and the correct ones were also run under ThreadSanitizer (`-fsanitize=thread`) without reports. Outputs of concurrent programs are nondeterministic; deadlocks are detected with `timeout`, whose exit status $124$ means that it had to kill the program.

## Condition variables

::: definition Condition variable {#def-cv}
A **condition variable** is a queue of threads waiting for some condition on shared state, used together with the mutex that protects that state. It has three operations:

- `wait(cv, m)`: called with $m$ held; *atomically* releases $m$ and puts the caller to sleep on $cv$; when woken, re-acquires $m$ before returning.
- `signal(cv)`: wakes one thread waiting on $cv$, if there is one (otherwise does nothing).
- `broadcast(cv)`: wakes all threads waiting on $cv$.

In POSIX these are `pthread_cond_wait`, `pthread_cond_signal` and `pthread_cond_broadcast`.
:::

Two details of this definition carry all the weight. First, `wait` releases the mutex and sleeps *atomically*: if it released the mutex first and then slept, another thread could change the state and signal in between, and the signal — sent to nobody — would be lost while the waiter slept for ever (the **lost wake-up**). Second, a condition variable has no memory: a signal sent when no one is waiting is simply discarded. So the *state* must be kept in shared variables, and the condition variable is only a place to sleep until the state may have changed.

There are two possible meanings of `signal`. In **Hoare semantics** (Hoare, 1974) the signalled thread runs immediately, in the state the signaller left; in **Mesa semantics** (Lampson and Redell, 1980) it is merely made ready, and by the time it re-acquires the mutex another thread may have changed the state again. POSIX, Java and almost every real system use Mesa semantics, and they also permit **spurious wake-ups** (returns from `wait` without any signal). The consequence is a rule with no exceptions:

::: proposition The waiting rule {#prop-while}
Under Mesa semantics, a thread waiting for a condition $C$ on state protected by $m$ must wait in a loop, `while (!C) wait(cv, m);`, and may rely on $C$ only after the loop exits, while still holding $m$.
:::

::: proof
When `wait` returns, the thread holds $m$, but between the signal and the re-acquisition other threads may have acquired $m$ and falsified $C$; and a spurious wake-up may return when $C$ never held. Hence nothing is known about $C$ on return, and it must be re-tested. The loop exits only when the test, made while holding $m$, finds $C$ true; since all changes to the state are made while holding $m$, $C$ remains true until the thread releases $m$ (or waits again).
:::

### The bounded buffer

The **producer–consumer** or **bounded-buffer** problem is the pattern behind every queue between threads: producers add items to a buffer of fixed capacity, consumers remove them; producers must wait while it is full, and consumers while it is empty.

::: example A bounded buffer with condition variables {#ex-bbuf}
Implement a circular buffer of $8$ integers shared by $2$ producers, each putting the numbers $1$ to $10^6$, and $3$ consumers, which add up what they take. Use one mutex and two condition variables. How do the consumers know when to stop?

```c
#include <pthread.h>
#include <stdio.h>

enum { CAP = 8, ITEMS = 1000000, PRODUCERS = 2, CONSUMERS = 3 };
static int buf[CAP], head, tail, count;            /* circular buffer */
static pthread_mutex_t m = PTHREAD_MUTEX_INITIALIZER;
static pthread_cond_t not_full = PTHREAD_COND_INITIALIZER;
static pthread_cond_t not_empty = PTHREAD_COND_INITIALIZER;
static long consumed_sum[CONSUMERS];

static void put(int x) {
    pthread_mutex_lock(&m);
    while (count == CAP)                           /* while, not if */
        pthread_cond_wait(&not_full, &m);          /* releases m while asleep */
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
    for (int x; (x = get()) != 0; ) *sum += x;    /* 0 means "stop" */
    return NULL;
}

int main(void) {
    pthread_t p[PRODUCERS], c[CONSUMERS];
    for (int i = 0; i < CONSUMERS; i++) pthread_create(&c[i], NULL, consumer, &consumed_sum[i]);
    for (int i = 0; i < PRODUCERS; i++) pthread_create(&p[i], NULL, producer, NULL);
    for (int i = 0; i < PRODUCERS; i++) pthread_join(p[i], NULL);
    for (int i = 0; i < CONSUMERS; i++) put(0);    /* one stop marker per consumer */
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
The total is exactly $2 \times 10^6(10^6+1)/2$, so no item was lost or taken twice; how the work is divided between consumers differs from run to run. Correctness rests on three facts. All accesses to `buf`, `head`, `tail` and `count` happen with `m` held. A producer writes only when `count < CAP` and a consumer reads only when `count > 0`, each established by its `while` loop ([[#prop-while]]). And no waiter sleeps for ever while its condition holds: every `put` that makes the buffer non-empty signals `not_empty`, and every `get` signals `not_full`. Using *two* condition variables matters — with one shared by producers and consumers, a consumer's signal meant for a producer could wake another consumer, which would find the buffer empty and go back to sleep, and all threads could end up asleep. Termination uses **sentinels**: after the producers finish, `main` puts one $0$ per consumer, and a consumer that takes a $0$ stops (the producers never put $0$).
:::
:::

::: warning `if` instead of `while`
It is tempting to write `if (count == 0) wait(...)`, reasoning that a consumer is woken only when an item has been added. Under Mesa semantics that is false: between the signal and the moment the woken consumer re-acquires the mutex, another consumer may take the item. Change both `while`s in [[#ex-bbuf]] to `if` and the program goes wrong in every run:

```console
$ ./bbuf-if | head -1
sum consumed 1374012642068, expected 1000001000000
$ ./bbuf-if | head -1
sum consumed 1342370524925, expected 1000001000000
```

Consumers took items from an empty buffer — reading stale slots and driving `count` negative — so the sums are wrong, by different amounts each time. The `while` loop costs nothing when the condition holds, and makes the code correct under spurious wake-ups too.
:::

## Semaphores

Dijkstra's **semaphore** (1965) predates condition variables and combines a counter with waiting in one object.

::: definition Semaphore {#def-semaphore}
A **semaphore** $S$ holds a non-negative integer value, set when it is created, and has two atomic operations:

- $P(S)$ (also *wait*, *down*, `sem_wait`): wait until the value is positive, then decrement it;
- $V(S)$ (also *signal*, *up*, `sem_post`): increment the value, waking one waiting thread if there is one.

A semaphore whose value is only ever $0$ or $1$ is a **binary semaphore**; otherwise it is a **counting semaphore**. (The letters come from the Dutch *passeren*, to pass, or *proberen*, to try, and *vrijgeven*, to release, or *verhogen*, to increase.)
:::

::: theorem The semaphore invariant {#thm-sem-invariant}
For a semaphore with initial value $s_0$, at every moment

$$
s = s_0 + \#V - \#P \ge 0,
$$ {#eq-sem}

where $s$ is its value, $\#V$ is the number of completed $V$ operations and $\#P$ the number of completed $P$ operations. Consequently, if every thread brackets its critical section by $P(S)$ and $V(S)$ and $s_0 = 1$, at most one thread is in its critical section at a time; with $s_0 = k$, at most $k$.
:::

::: proof
Initially $\#V = \#P = 0$ and $s = s_0$. Each completed $V$ adds $1$ to $s$ and to $\#V$; each completed $P$ subtracts $1$ from $s$ and adds $1$ to $\#P$, and it completes only when $s$ was positive, so $s$ stays non-negative. By induction on the sequence of completed operations (which are atomic, so they occur in some order), [[#eq-sem]] holds. For the corollary, the number of threads in critical sections is $\#P - \#V$ (each entered by a completed $P$ and not yet left by a $V$), which by [[#eq-sem]] equals $s_0 - s \le s_0$.
:::

A semaphore can be used in three ways: as a **lock** ($s_0 = 1$), to **count resources** ($s_0 = k$, for example $k$ database connections), and to **order events** ($s_0 = 0$: one thread does $P$ to wait until another does $V$, as in "wait until the child has initialised"). A semaphore initialised to $0$ is like a condition variable *with memory*: a $V$ that happens before the $P$ is not lost.

The bounded buffer with semaphores uses one of each kind: `empty` counts free slots ($s_0 = $ capacity), `full` counts filled slots ($s_0 = 0$), and `mutex` protects the indices ($s_0 = 1$).

::: example The order of P operations matters {#ex-sem-order}
In the semaphore bounded buffer below, the producer first waits for a free slot, then locks. Show that exchanging the two `sem_wait` calls in `put` can deadlock, and confirm it by running the program.

```c
#define _POSIX_C_SOURCE 200809L
#include <pthread.h>
#include <semaphore.h>
#include <stdio.h>

enum { CAP = 8, ITEMS = 1000000 };
static int buf[CAP], head, tail;
static sem_t empty, full, mutex;            /* counts of free slots, filled slots; a lock */

static void put(int x) {
#ifdef WRONG
    sem_wait(&mutex); sem_wait(&empty);    /* lock first, then wait for space: deadlock */
#else
    sem_wait(&empty); sem_wait(&mutex);    /* wait for space, then lock */
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
    sem_init(&empty, 0, CAP);               /* all slots free */
    sem_init(&full, 0, 0);                  /* none filled */
    sem_init(&mutex, 0, 1);                 /* binary semaphore = lock */
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
Suppose the buffer is full and the producer runs the wrong `put`: it acquires `mutex` (value $1 \to 0$) and then blocks in `sem_wait(&empty)`, because `empty` is $0$ — *still holding the mutex*. The consumer passes `sem_wait(&full)` and blocks in `sem_wait(&mutex)`. Now the producer waits for the consumer to post `empty`, and the consumer waits for the producer to post `mutex`: neither can proceed.

```console
$ gcc -std=c17 -Wall -Wextra -O2 -pthread -o sembuf sembuf.c && ./sembuf
sum 500000500000, expected 500000500000
$ gcc -std=c17 -Wall -Wextra -O2 -pthread -DWRONG -o sembuf-wrong sembuf.c
$ timeout 10 ./sembuf-wrong; echo "status $?"
status 124
```

The wrong version hung in three runs out of three (the buffer is full almost at once). The rule: never block waiting for a condition while holding a lock that the thread which would make the condition true needs. Condition variables enforce this automatically, since `wait` releases the mutex.
:::
:::

Semaphores are powerful but unstructured — a missing $V$ or an extra $P$ anywhere in a program breaks it — and Per Brinch Hansen (1973) and Tony Hoare (1974) proposed the **monitor**: a module whose data can be accessed only through its procedures, which the language executes under an implicit mutual-exclusion lock, with condition variables for waiting. Java's `synchronized` methods with `wait`, `notify` and `notifyAll`, and C#'s `lock` with `Monitor.Wait`, are monitors in all but name; in C, a mutex and condition variables used with discipline, as in [[#ex-bbuf]], amount to the same thing.

### Readers and writers

Many data structures are read far more often than they are written. A plain mutex serialises readers needlessly; a **readers–writer lock** allows any number of readers *or* one writer. Courtois, Heymans and Parnas (1971) gave the two classic solutions with semaphores, and noticed the policy question they raise: if readers may enter whenever no writer is *active*, a steady stream of readers starves a waiting writer; if new readers must wait whenever a writer is *waiting*, writers can starve readers. POSIX provides `pthread_rwlock_t`, whose preference is implementation-defined (glibc prefers readers by default, with an option to prefer writers); Linux's kernel offers `rwlock_t`, `rw_semaphore` and the **read-copy-update** (RCU) mechanism, in which readers take no lock at all and writers publish new versions of the data.

::: quiz
A semaphore $S$ is created with value $2$. Three threads each execute $P(S)$, and then one thread executes $V(S)$. Which statements are true?
- [x] Two of the $P$ operations complete at once; the third waits.
- [x] After the $V$, the third $P$ completes and the value is $0$.
- [ ] After the $V$, the value is $1$.
- [x] By the invariant, the value is $2 + 1 - 3 = 0$ once all four operations have completed.
::: solution
The first two $P$s take the value from $2$ to $0$; the third must wait. The $V$ wakes it, and its $P$ completes; the value is $s_0 + \#V - \#P = 2 + 1 - 3 = 0$ by [[#thm-sem-invariant]]. The value can never be negative, so it cannot "remember" the waiting thread as $-1$ (some textbook implementations let it go negative to count waiters, but that is an implementation detail; the abstract value is the one in the invariant).
:::
:::

## Deadlock

::: definition Deadlock {#def-deadlock}
A set of threads is **deadlocked** if each thread in the set is waiting for an event — typically the release of a resource — that only another thread in the set can cause.
:::

The canonical example is the **dining philosophers** (Dijkstra, 1965; the story is Hoare's): five philosophers sit at a round table with one fork between each pair; each alternates thinking and eating, and needs both neighbouring forks to eat. If each picks up the fork on the left and then the one on the right, and all pick up their left forks at once, each waits for ever for the right one.

::: example The philosophers deadlock {#ex-dining}
Implement the philosophers with one mutex per fork, each philosopher taking the left fork, then the right, $10^5$ times. Run it, and inspect the threads when it hangs. Then make each philosopher take the lower-numbered fork first.

```c
#include <pthread.h>
#include <stdio.h>

enum { N = 5, MEALS = 100000 };
static pthread_mutex_t fork_[N];
static int ordered;                        /* 1: always take the lower-numbered fork first */
static long meals[N];

static void *philosopher(void *arg) {
    int i = (int)(long)arg;
    int first = i, second = (i + 1) % N;   /* left fork, then right fork */
    if (ordered && first > second) { int t = first; first = second; second = t; }
    for (int k = 0; k < MEALS; k++) {
        pthread_mutex_lock(&fork_[first]);
        pthread_mutex_lock(&fork_[second]);
        meals[i]++;                        /* eat */
        pthread_mutex_unlock(&fork_[second]);
        pthread_mutex_unlock(&fork_[first]);
    }
    return NULL;
}

int main(int argc, char *argv[]) {
    ordered = argc > 1;                    /* any argument selects the ordered version */
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
The unordered version deadlocked in three runs out of three, within a fraction of a second: with $10^5$ meals each, the moment when all five hold their left forks comes quickly. `ps` shows every thread asleep (`S`) in the kernel's futex wait, using no CPU — a deadlock, unlike the busy spinning of [[operating-systems/threads-locks]], is silent. (The first thread listed is `main`, waiting in `pthread_join`.) With ordering, philosopher $4$ takes fork $0$ before fork $4$, and the program finished every time. The next theorem explains why.
:::
:::

::: widget graph
nodes: P0@2,4; P1@4,2.5; P2@3.2,0; P3@0.8,0; P4@0,2.5
edges: P0>P1; P1>P2; P2>P3; P3>P4; P4>P0
algorithm: dfs
start: P0
caption: The wait-for graph of the deadlocked philosophers: each philosopher $P_i$ holds fork $i$ and waits for fork $i+1$, held by $P_{i+1}$, so there is an edge $P_i \to P_{i+1}$. Step through depth-first search from $P_0$: the last edge examined, $P_4 \to P_0$, leads back to a vertex still on the stack, revealing the cycle. Now imagine $P_4$ takes the lower-numbered fork $0$ first, as in the ordered version: while $P_0$ holds fork $0$, $P_4$ waits for fork $0$ holding nothing, so the edge $P_3 \to P_4$ disappears, and with it the cycle.
:::

Edward Coffman, Melanie Elphick and Arie Shoshani (1971) identified the conditions that every deadlock involving resources satisfies.

::: theorem Necessary conditions for deadlock {#thm-coffman}
If threads that acquire resources and hold them while waiting for others are deadlocked, then all four of the following hold:

1. **Mutual exclusion**: some resources can be held by only one thread at a time.
2. **Hold and wait**: a thread holds resources while waiting for others.
3. **No preemption**: a resource cannot be taken away from the thread holding it; it is released only voluntarily.
4. **Circular wait**: there is a cycle of threads $T_1, \dots, T_k$ in which each $T_i$ waits for a resource held by $T_{i+1}$, and $T_k$ for one held by $T_1$.
:::

::: proof
Each deadlocked thread $T$ is waiting for a resource that only another deadlocked thread can release ([[#def-deadlock]]). If no resource were exclusive, $T$ would not need to wait for it (1). $T$'s waiting prevents it from releasing what it holds, and some thread in the set must be holding something, or no one would be waiting for a release (2). If resources could be preempted, the system could take the resource $T$ waits for from its holder and the wait would end (3). For (4), define for each deadlocked thread a successor: a deadlocked thread holding a resource it waits for. Following successors from any thread, we stay inside the finite deadlocked set, so some thread repeats: there is a cycle.
:::

The conditions are necessary, not sufficient in general — with several identical units of a resource, a cycle of waiting can be broken when some thread outside it releases a unit. With one unit of each resource, they are sufficient too, and a picture shows deadlock exactly.

::: definition Resource-allocation graph {#def-rag}
A **resource-allocation graph** is a directed graph with a vertex for each thread and for each resource, an edge $R \to T$ if resource $R$ is held by thread $T$, and an edge $T \to R$ if $T$ is waiting for $R$. For resources with one unit each, the **wait-for graph** has an edge $T \to T'$ whenever $T$ waits for a resource held by $T'$.
:::

::: theorem Deadlock is a cycle {#thm-rag-cycle}
If every resource has a single unit, a set of threads is deadlocked if and only if the resource-allocation graph (equivalently, the wait-for graph) contains a cycle through them.
:::

::: proof
If the threads are deadlocked, the successor argument in the proof of [[#thm-coffman]] produces a cycle $T_1 \to R_1 \to T_2 \to \dots \to T_1$, where each $T_i$ waits for $R_i$, held by $T_{i+1}$. Conversely, suppose there is such a cycle. Each $R_i$ has a single unit, held by $T_{i+1}$, which is itself blocked waiting for $R_{i+1}$; so $R_i$ will be released only after $T_{i+1}$ proceeds, which requires $R_{i+1}$ to be released first, and so on around the cycle back to $R_i$. No thread on the cycle can ever proceed: they are deadlocked.
:::

::: widget graph
nodes: T1@0,2; R1@1,3; T2@2,2; R2@3,1; T3@2,0; R3@1,1; T4@4,2; R4@4,3
edges: R1>T1; T1>R3; R3>T3; T3>R2; R2>T2; T2>R1; R4>T4; T4>R2
algorithm: dfs
start: T1
caption: A resource-allocation graph: $R \to T$ means $R$ is held by $T$, $T \to R$ means $T$ waits for $R$. Step through depth-first search from $T1$. When it examines the edge $T2 \to R1$, $R1$ is still on the stack — a **back edge**, which in a directed graph exists exactly when there is a cycle. The cycle $T1 \to R3 \to T3 \to R2 \to T2 \to R1 \to T1$ is a deadlock by [[#thm-rag-cycle]]. $T4$ is waiting too (for $R2$), but it is not on the cycle: it is blocked behind the deadlock, not part of it. Delete the edge $T2 > R1$ and the deadlock disappears.
:::

Deadlock detection is therefore cycle detection, in time linear in the size of the graph — the depth-first search of [[algorithms]]. With multiple units per resource, detection uses a variant of the safety algorithm below.

### Prevention: breaking a condition

Since all four conditions are necessary, making any one impossible prevents deadlock.

- **Mutual exclusion** can sometimes be avoided by not sharing: lock-free data structures built from compare-and-swap, or giving each thread its own copy.
- **Hold and wait** can be prevented by acquiring all locks at once, before doing anything (often impractical: the set of locks needed may depend on what the thread discovers), or by `trylock`: if the second lock is not available, release the first and start again (which risks **livelock**, threads repeatedly backing off in lock-step).
- **No preemption** can be relaxed for resources whose state can be saved and restored — processors, memory pages — but not for locks protecting half-updated data.
- **Circular wait** is the condition that real systems break, by ordering.

::: theorem Lock ordering prevents deadlock {#thm-ordering}
Suppose the locks are numbered, and every thread acquires the locks it holds simultaneously in increasing order of number. Then no deadlock among these locks is possible.
:::

::: proof
Suppose threads $T_1, \dots, T_k$ are deadlocked; by [[#thm-coffman]] there is a cycle in which $T_i$ holds lock $L_i$ and waits for $L_{i+1}$, held by $T_{i+1}$ (indices modulo $k$). Since $T_i$ holds $L_i$ while requesting $L_{i+1}$, ordered acquisition gives $n(L_i) < n(L_{i+1})$ for every $i$, where $n$ is the lock's number. Following the cycle, $n(L_1) < n(L_2) < \dots < n(L_k) < n(L_1)$, which is impossible.
:::

The ordered philosophers of [[#ex-dining]] are this theorem at work. In large programs the order is a documented hierarchy — the Linux kernel's `mm/filemap.c` begins with a comment listing the order in which its memory-management locks must be taken — and tools check it: Linux's **lockdep** records the order in which every lock class is acquired at run time and reports any acquisition that could close a cycle, *before* a deadlock actually happens. ThreadSanitizer does the same for user programs ("lock-order-inversion").

### Avoidance: the banker's algorithm

Avoidance does not restrict how resources are requested; instead, the system refuses (delays) any request that could lead to deadlock. It needs advance knowledge: each thread declares the **maximum** number of units of each resource type it may ever hold.

::: definition Safe state {#def-safe}
There are $n$ threads and $m$ resource types. Let $\text{Avail}[j]$ be the free units of type $j$, $\text{Alloc}[i][j]$ the units held by thread $i$, $\text{Max}[i][j]$ its declared maximum, and $\text{Need} = \text{Max} - \text{Alloc}$. A state is **safe** if there is an order $i_1, \dots, i_n$ of the threads — a **safe sequence** — such that each $i_k$'s remaining need can be met by the free units plus the units held by $i_1, \dots, i_{k-1}$:

$$
\text{Need}[i_k] \le \text{Avail} + \sum_{\ell < k} \text{Alloc}[i_\ell] \quad \text{(componentwise)}.
$$
:::

In a safe state, the system can always avoid deadlock: run $i_1$ to completion if necessary (its whole need can be met), let it release everything, then $i_2$, and so on. An unsafe state is not necessarily deadlocked — threads may not actually ask for their maximum — but the system can no longer guarantee to avoid it.

::: algorithm Banker's algorithm (Dijkstra) {#alg-banker}
*Safety check.* Set $\text{Work} \gets \text{Avail}$ and mark every thread unfinished. Repeat: find an unfinished thread $i$ with $\text{Need}[i] \le \text{Work}$; mark it finished and set $\text{Work} \gets \text{Work} + \text{Alloc}[i]$. When no such thread exists, the state is safe if and only if every thread is finished.

*Request.* When thread $i$ requests a vector $\text{Req}$: if $\text{Req} > \text{Need}[i]$ in any component, it is an error; if $\text{Req} > \text{Avail}$ in any component, $i$ must wait. Otherwise pretend to grant it ($\text{Avail} \mathrel{-}= \text{Req}$, $\text{Alloc}[i] \mathrel{+}= \text{Req}$) and run the safety check; grant the request if the new state is safe, and otherwise undo the pretence and make $i$ wait.
:::

The safety check is correct even though it picks threads greedily: finishing a thread only *increases* $\text{Work}$, so a thread that could finish at some point can still finish later, and the order of choices never matters. It costs $O(mn^2)$ per check.

::: example Running the banker's algorithm {#ex-banker}
Five threads $P_0$–$P_4$ share three resource types A, B, C. Currently:

| thread | Alloc (A B C) | Max (A B C) | Need (A B C) |
|---|---|---|---|
| $P_0$ | 1 0 1 | 3 2 2 | 2 2 1 |
| $P_1$ | 2 1 0 | 2 2 1 | 0 1 1 |
| $P_2$ | 0 1 1 | 1 3 1 | 1 2 0 |
| $P_3$ | 1 1 0 | 2 1 2 | 1 0 2 |
| $P_4$ | 0 0 2 | 1 1 3 | 1 1 1 |

and $\text{Avail} = (1, 1, 1)$. Is the state safe? Should the system grant $P_2$'s request for $(1, 0, 0)$? $P_0$'s request for $(1, 1, 0)$?
::: solution
Safety: $\text{Work} = (1,1,1)$. $P_0$ needs $(2,2,1)$: no. $P_1$ needs $(0,1,1) \le (1,1,1)$: finish it, $\text{Work} = (1,1,1) + (2,1,0) = (3,2,1)$. $P_2$: $(1,2,0) \le (3,2,1)$, $\text{Work} = (3,3,2)$. $P_3$: $(1,0,2) \le (3,3,2)$, $\text{Work} = (4,4,2)$. $P_4$: $(1,1,1)$, $\text{Work} = (4,4,4)$. $P_0$: $(2,2,1)$, $\text{Work} = (5,4,5)$, the total of each resource. Safe, with safe sequence $P_1, P_2, P_3, P_4, P_0$.

$P_2$ requests $(1,0,0)$: within its need and available. Pretend: $\text{Avail} = (0,1,1)$, $\text{Alloc}[2] = (1,1,1)$, $\text{Need}[2] = (0,2,0)$. Safety: $P_1$ needs $(0,1,1) \le (0,1,1)$, $\text{Work} = (2,2,1)$; $P_2$ needs $(0,2,0)$, $\text{Work} = (3,3,2)$; then $P_3$, $P_4$, $P_0$ as before. Safe: **grant**.

$P_0$ requests $(1,1,0)$ (from the original state): within its need and available. Pretend: $\text{Avail} = (0,0,1)$, $\text{Need}[0] = (1,1,1)$. Now every thread needs at least one unit of A or B, and none is free: $P_1$ needs $(0,1,1)$, $P_2$ $(1,2,0)$, $P_3$ $(1,0,2)$, $P_4$ $(1,1,1)$, $P_0$ $(1,1,1)$. No thread can be guaranteed to finish: unsafe, so $P_0$ **waits**. A short Python implementation of [[#alg-banker]] gives the same verdicts.
:::
:::

The banker's algorithm is elegant and almost never used in general-purpose operating systems: threads rarely know their maximum needs, the number of threads changes constantly, and the check on every request is expensive. Its ideas survive in admission control — a real-time scheduler admitting a task only if all deadlines can still be met, a database limiting concurrent transactions.

### Detection and recovery

The third approach lets deadlocks happen, detects them by finding cycles, and recovers by **aborting** a thread on the cycle or **preempting** one of its resources. This is what databases do: their lock managers maintain a wait-for graph of transactions, and when a cycle appears they abort one transaction (the "victim", chosen to minimise lost work), roll back its changes and retry it ([[databases]]). Operating systems mostly choose the fourth approach — ignoring the problem (the "ostrich algorithm") for user-level locks — leaving prevention to programmers and lockdep, and using timeouts for distributed resources.

## Priority inversion

Locks interact badly with priority scheduling ([[operating-systems/processes-scheduling]]). Suppose a low-priority thread $L$ holds a lock that a high-priority thread $H$ needs. $H$ blocks — that is expected, and lasts only as long as $L$'s critical section. But if a medium-priority thread $M$, which does not need the lock, becomes ready, it preempts $L$; now $H$ waits for $L$, which waits for $M$, for as long as $M$ runs. $H$ is effectively running at a priority *below* $M$: **priority inversion**.

In July 1997 the Mars Pathfinder lander began resetting itself repeatedly, days after landing. A low-priority meteorological task held a mutex protecting an information bus; a high-priority bus-management task needed it; medium-priority communications tasks preempted the low-priority holder; a watchdog noticed that the bus task had not run in time and reset the system. Engineers at JPL reproduced the fault on a replica on Earth and fixed it by uploading a change that turned on **priority inheritance** for that mutex: while a thread holds a lock that a higher-priority thread is waiting for, it runs at the waiter's priority, so $M$ can no longer preempt it. POSIX offers this as the `PTHREAD_PRIO_INHERIT` mutex protocol, and Linux's real-time mutexes implement it; the alternative, **priority ceiling**, raises a lock holder to the highest priority of any thread that may use the lock.

::: history
Edsger Dijkstra introduced semaphores in his 1965 manuscript "Cooperating sequential processes" (EWD 123), together with the bounded-buffer and dining-philosophers problems and the banker's algorithm; his 1968 paper on the THE multiprogramming system showed semaphores organising a whole operating system. Pierre-Jacques Courtois, Frans Heymans and David Parnas published the readers–writers problem in 1971, the same year Coffman, Elphick and Shoshani's survey "System deadlocks" set out the four conditions and the strategies of prevention, avoidance and detection. Richard Holt's 1972 paper "Some deadlock properties of computer systems" formalised resource-allocation graphs. Per Brinch Hansen (1973) and C. A. R. Hoare (1974) proposed monitors; Butler Lampson and David Redell's 1980 paper on Mesa explained why real systems use "signal as a hint" semantics. Lui Sha, Ragunathan Rajkumar and John Lehoczky analysed priority inheritance and priority ceiling protocols in 1990 — the work that the Pathfinder team applied in 1997.
:::

## Where this leads

The same patterns appear at every scale. Within one machine, [[parallel-computing]] studies scalable synchronisation — barriers, lock-free queues, transactional memory — and the memory models that make them correct. Across machines, [[distributed-systems]] faces distributed deadlock, mutual exclusion without shared memory and consensus. Databases detect deadlocks among transactions and use two-phase locking to make them serialisable ([[databases]]). Higher-level concurrency — message passing, channels, actors, async/await — is designed to make the bugs of this chapter harder to write ([[programming-languages]]). In this course, [[operating-systems/file-systems]] needs ordering of a different kind: keeping on-disk structures consistent when a crash can interrupt any sequence of writes.

::: summary
- A **condition variable** ([[#def-cv]]) lets a thread sleep, releasing a mutex atomically, until another signals that the state may have changed; under Mesa semantics, always wait in a `while` loop ([[#prop-while]]) — with `if`, the bounded buffer computed wrong sums in every run.
- The **bounded buffer** needs a mutex and two condition variables (or three semaphores), and a clean way to stop consumers ([[#ex-bbuf]]).
- A **semaphore** ([[#def-semaphore]]) satisfies $s = s_0 + \#V - \#P \ge 0$ ([[#thm-sem-invariant]]); it serves as a lock, a counter and an ordering device. Never wait on a semaphore while holding a lock the poster needs ([[#ex-sem-order]]).
- **Deadlock** ([[#def-deadlock]]) requires mutual exclusion, hold and wait, no preemption and circular wait ([[#thm-coffman]]); with single-unit resources it is exactly a cycle in the resource-allocation graph ([[#thm-rag-cycle]]).
- **Prevent** it by acquiring locks in a global order ([[#thm-ordering]]) — the ordered philosophers always finished, the unordered ones always hung; **avoid** it with the banker's algorithm and safe states ([[#alg-banker]]); or **detect** cycles and abort a victim, as databases do.
- **Priority inversion** lets a medium-priority thread delay a high-priority one through a lock; **priority inheritance** fixes it (Mars Pathfinder, 1997).
:::

## Exercises

::: exercise Semaphore arithmetic {level=1 check="3"}
A semaphore starts at $5$. Over some time, $9$ $P$ operations and $7$ $V$ operations complete, and no thread is waiting. What is its value? (Enter the value.)
::: solution
By [[#thm-sem-invariant]], $s = 5 + 7 - 9 = 3$.
:::
:::

::: exercise Ordering with a semaphore {level=1}
Thread A must execute statement $a_1$ before thread B executes $b_2$, and B must execute $b_1$ before A executes $a_2$. Each thread's code is `a1; a2;` and `b1; b2;`. Add semaphores (with initial values) so that both constraints hold and there is no deadlock.
::: solution
Use two semaphores initialised to $0$: `aDone` and `bDone`. Thread A: `a1; V(aDone); P(bDone); a2;`. Thread B: `b1; V(bDone); P(aDone); b2;`. Each thread *signals before it waits*, so neither can be blocked waiting for a signal that the other has not yet been able to send: this is the **rendezvous** pattern. If both waited first (`P` before `V`), both would block for ever.
:::
:::

::: exercise Counting deadlocked threads {level=1 check="3"}
In the resource-allocation graph of the figure, how many threads are deadlocked? (Enter the number.)
::: solution
The cycle $T1 \to R3 \to T3 \to R2 \to T2 \to R1 \to T1$ passes through $T1$, $T2$ and $T3$: these three are deadlocked ([[#thm-rag-cycle]]). $T4$ waits for $R2$, held by $T2$, which will never release it, so $T4$ is blocked for ever too — but it is not *in* the deadlock in the sense of [[#def-deadlock]]: it could be aborted without affecting the others, and aborting it would not resolve anything. The answer is $3$.
:::
:::

::: exercise One more request {level=2}
In the original state of [[#ex-banker]], $P_3$ requests $(0, 0, 1)$. Should it be granted? Find a request by $P_4$ of a single unit that can be granted.
::: solution
After pretending: $\text{Avail} = (1, 1, 0)$, $\text{Alloc}[3] = (1, 1, 1)$, $\text{Need}[3] = (1, 0, 1)$. No thread's need fits in $(1,1,0)$: $P_0$ needs $(2,2,1)$, $P_1$ $(0,1,1)$ (needs a C), $P_2$ $(1,2,0)$ (needs two Bs), $P_3$ $(1,0,1)$ (needs a C), $P_4$ $(1,1,1)$. Unsafe: $P_3$ waits. For $P_4$, try $(0, 1, 0)$: $\text{Avail} = (1, 0, 1)$, $\text{Need}[4] = (1, 0, 1)$. Then $P_4$ itself fits: $\text{Work} = (1,0,1) + (0,1,2) = (1,1,3)$; $P_1$ $(0,1,1)$ fits, $\text{Work} = (3,2,3)$; $P_2$, $P_3$, $P_0$ then fit. Safe: grant. (Requests of $(1,0,0)$ and $(0,0,1)$ by $P_4$ are safe as well; check them with the Python version of the algorithm.)
:::
:::

::: exercise A semaphore from a mutex and a condition variable {level=2}
Implement a counting semaphore type with `sem_init_(s, v)`, `P(s)` and `V(s)` using one `pthread_mutex_t` and one `pthread_cond_t`, and argue that it satisfies [[#thm-sem-invariant]].
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
    while (s->value == 0)                       /* wait until positive */
        pthread_cond_wait(&s->positive, &s->m);
    s->value--;
    pthread_mutex_unlock(&s->m);
}

void V(semaphore *s) {
    pthread_mutex_lock(&s->m);
    s->value++;
    pthread_cond_signal(&s->positive);         /* one waiter can now proceed */
    pthread_mutex_unlock(&s->m);
}
```
`value` is changed only with `m` held, so each `P` and `V` is atomic with respect to the others. `P` decrements only after its `while` loop has found `value > 0` with the mutex held ([[#prop-while]]), so `value` never becomes negative, and each completed `P` subtracts exactly $1$, each `V` adds $1$: that is the invariant. No `V` is lost: the value is incremented even if no one is waiting, and a later `P` will find it. Signalling one waiter per `V` suffices, since one increment can satisfy only one `P`.
:::
:::

::: exercise Philosophers without ordering {level=2}
Give two other ways to prevent the dining philosophers from deadlocking, each breaking a different Coffman condition, and say what each costs.
::: solution
(1) Break *hold and wait*: a philosopher takes both forks atomically or neither — for example with `pthread_mutex_trylock` on the second fork, putting the first back and retrying if it fails. Cost: possible livelock and wasted work; add a random back-off. (2) Limit the number of philosophers at the table to four with a counting semaphore initialised to $4$ (the "butler"). Then there are at most four philosophers and five forks, so some philosopher can always get both forks; this breaks *circular wait* in a different way from ordering — a cycle would have to involve all five. Cost: one more semaphore operation per meal, and philosophers can wait even when their forks are free. Breaking *mutual exclusion* would mean a fork that two can use at once — not a fork at all.
:::
:::

::: exercise Deadlock with multiple units {level=3}
Show by an example that with resources having several units, a cycle in the resource-allocation graph does not imply deadlock. Then show that if there are $n$ threads sharing $m$ identical units of one resource, each needing at most $k$ units, and $n(k - 1) + 1 \le m$, deadlock is impossible.
::: solution
Example: resource $R$ has two units, held by $T_2$ and $T_3$; resource $S$ has one unit, held by $T_1$. $T_1$ waits for $R$, and $T_2$ waits for $S$. The graph contains the cycle $T_1 \to R \to T_2 \to S \to T_1$. But $T_3$ is not waiting; when it finishes and releases its unit of $R$, $T_1$ gets it, finishes, and releases $S$ for $T_2$. No deadlock.

Bound: suppose the threads were deadlocked, each waiting for at least one more unit while holding the rest. A waiting thread holds at most $k - 1$ units (otherwise it would have all it needs). So the units held total at most $n(k - 1)$, and at least $m - n(k-1) \ge 1$ unit is free — so some waiting thread's request could be granted, contradicting deadlock. (Any thread that is not waiting will finish and release its units, which only helps.) For example, three threads each needing two units of a printer pool can never deadlock if there are $3 \times 1 + 1 = 4$ printers.
:::
:::

::: exercise A lock-order checker {level=3}
Write a Python class that records, for a program's run, each time a thread acquires lock $B$ while holding lock $A$, as an edge $A \to B$ in a graph, and reports a potential deadlock as soon as an acquisition would create a cycle — the idea behind lockdep. Test it on the philosophers' acquisition orders.
::: solution
```python
from collections import defaultdict

class LockOrder:
    def __init__(self):
        self.after = defaultdict(set)      # A -> {B}: B was acquired while holding A
        self.held = defaultdict(list)      # thread -> locks held, in order

    def _reaches(self, a, b):              # is there a path a -> ... -> b?
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
            if self._reaches(lock, h):     # new edge h -> lock would close a cycle
                print(f"possible deadlock: {thread} takes {lock} while holding {h}")
            self.after[h].add(lock)
        self.held[thread].append(lock)

    def release(self, thread, lock):
        self.held[thread].remove(lock)

for ordered in (False, True):
    lo = LockOrder()
    for i in range(5):                     # each philosopher eats once, in turn
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
Even though the philosophers ate one at a time here, so that no deadlock actually occurred, the checker found the potential one: the edges fork0 → fork1 → fork2 → fork3 → fork4 were recorded by philosophers 0–3, and philosopher 4's acquisition of fork0 while holding fork4 would close the cycle. With ordering, philosopher 4 takes fork0 first, and no cycle can form ([[#thm-ordering]]). Checking the *order* rather than waiting for a deadlock is what makes lockdep effective: a single run that exercises each code path is enough.
:::
:::
