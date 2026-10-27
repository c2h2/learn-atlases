A stack holds $64$ nodes. Each of $p$ threads repeatedly pops a node and pushes it back, two million times. We implement the stack three ways: with a mutex around each operation; without any lock, using the atomic **compare-and-swap** instruction; and the same lock-free design with one apparently harmless simplification. After the run, a check walks the stack and confirms that all $64$ nodes are present exactly once.

```console
$ gcc -std=c17 -Wall -Wextra -O2 -fopenmp -pthread -o stack stack.c
$ for p in 1 4 16; do for k in 0 1 2; do OMP_NUM_THREADS=$p ./stack $k; done; done
mutex       p= 1  21 ns/pair  nodes 64/64  (empty pops 0)
CAS+tag     p= 1  27 ns/pair  nodes 64/64  (empty pops 0)
CAS, no tag p= 1  26 ns/pair  nodes 64/64  (empty pops 0)
mutex       p= 4  753 ns/pair  nodes 64/64  (empty pops 0)
CAS+tag     p= 4  434 ns/pair  nodes 64/64  (empty pops 0)
CAS, no tag p= 4  260 ns/pair  nodes 1/64  CORRUPTED  (empty pops 0)
mutex       p=16  4647 ns/pair  nodes 64/64  (empty pops 0)
CAS+tag     p=16  2520 ns/pair  nodes 64/64  (empty pops 0)
CAS, no tag p=16  1026 ns/pair  nodes 1/64  CORRUPTED  (empty pops 0)
```

(Observations on the $36$-core machine of this course, as of 2026; each line gives the wall-clock time divided by the two million pairs each thread performed.) Three lessons are in these lines. First, a single shared stack does not scale, however it is implemented: with $16$ threads the total throughput of the lock-free stack is $16/2520\text{ ns} \approx 6.3$ million pairs per second, against $48$ million for one thread alone — every operation must move the cache line holding the top of the stack ([[parallel-computing/memory-consistency]]). Second, the lock-free stack is still about twice as fast as the mutex under contention. Third, the version "without tag" is fast and *wrong*: it lost $63$ of the $64$ nodes, a failure called the **ABA problem**, which no amount of testing on one thread reveals.

This chapter is about shared data structures that many threads use at once. We first need a definition of correctness for objects whose operations overlap in time — **linearisability** — and a vocabulary for progress: what it means for an implementation to be **lock-free** or **wait-free**. Then we build concurrent sets and stacks with locks of increasing subtlety, and without locks using compare-and-swap; meet the ABA problem and the memory-reclamation problem behind it; sketch the Michael–Scott queue; and prove Herlihy's theorem that some atomic instructions are fundamentally more powerful than others. We assume the atomic instructions and locks of [[operating-systems/threads-locks]] and the memory orders of [[parallel-computing/memory-consistency]].

## What correctness means

For a sequential stack, correctness is easy to state: each operation transforms the state as the specification says. With concurrent operations that overlap in time, it is not even clear what "the state when `pop` started" means. We describe executions by their externally visible events.

::: definition Histories {#def-history}
A **history** of a concurrent object is a finite sequence of **invocation** events (thread $T$ calls operation $op$ with arguments) and **response** events (the operation returns a result to $T$). An operation is **complete** if its response appears, and **pending** otherwise. Operation $a$ **precedes** operation $b$ in real time, written $a \prec b$, if $a$'s response comes before $b$'s invocation; operations neither of which precedes the other **overlap**. A history is **sequential** if every invocation is immediately followed by its response.
:::

::: definition Linearisability (Herlihy and Wing, 1990) {#def-linearisable}
A history $H$ is **linearisable** if each pending operation can either be removed or completed with some response, and then the complete operations can be arranged in a sequential history $S$ such that

1. $S$ is **legal**: it satisfies the object's sequential specification;
2. $S$ **respects real time**: if $a \prec b$ in $H$, then $a$ comes before $b$ in $S$.

An implementation of an object is linearisable if every history it can produce is linearisable. Equivalently, each operation appears to take effect instantaneously at some moment — its **linearisation point** — between its invocation and its response.
:::

Linearisability is the natural correctness condition for concurrent objects: users may reason as if the operations happened one at a time, in an order consistent with what they observed. Operations that overlap may be ordered either way; operations that do not overlap must keep their real-time order. A weaker condition, **sequential consistency** of the object, requires only that each thread's own operations keep their order. Linearisability has a property that sequential consistency lacks: it is **local** (Herlihy and Wing proved that a history is linearisable if and only if its restriction to each object is), so a system built from linearisable objects is linearisable, and objects can be verified one at a time.

::: example Checking histories by brute force {#ex-check-history}
Two histories of a FIFO queue, with times in arbitrary units:

- $H_1$: A: `enq(x)` during $[0, 3]$; B: `enq(y)` during $[1, 4]$; A: `deq() → y` during $[5, 7]$; B: `deq() → x` during $[6, 8]$.
- $H_2$: A: `enq(x)` during $[0, 2]$; B: `enq(y)` during $[3, 5]$; A: `deq() → y` during $[6, 8]$.

Are they linearisable?
::: solution
A short program tries every order of the operations, keeping those that respect real time, and replays each against a sequential queue:

```python
from itertools import permutations

# An operation: (name, thread, op, arg, result, invocation time, response time)
def legal(seq):
    """Is this sequential order legal for a FIFO queue?"""
    q = []
    for _, _, op, arg, res, _, _ in seq:
        if op == "enq":
            q.append(arg)
        elif (q.pop(0) if q else None) != res:      # deq must return the oldest item
            return False
    return True

def linearizable(history):
    """Brute force: some order that respects real time and is legal."""
    for order in permutations(history):
        pos = {op[0]: k for k, op in enumerate(order)}
        respects = all(pos[a[0]] < pos[b[0]]
                       for a in history for b in history if a[6] < b[5])  # a ends before b starts
        if respects and legal(order):
            return [op[0] for op in order]
    return None

H1 = [("A1", "A", "enq", "x", None, 0, 3), ("B1", "B", "enq", "y", None, 1, 4),
      ("A2", "A", "deq", None, "y", 5, 7), ("B2", "B", "deq", None, "x", 6, 8)]
H2 = [("A1", "A", "enq", "x", None, 0, 2), ("B1", "B", "enq", "y", None, 3, 5),
      ("A2", "A", "deq", None, "y", 6, 8)]
print("H1:", linearizable(H1))
print("H2:", linearizable(H2))
```

```console
$ python3 linearize.py
H1: ['A1', 'B1', 'B2', 'A2']
H2: None
```

$H_1$ is linearisable: the two enqueues overlap, and so do the two dequeues, so the order `enq(x)`, `enq(y)`, B's `deq → x`, A's `deq → y` respects real time and is legal. $H_2$ is not: `enq(x)` finished before `enq(y)` began, so every real-time order enqueues $x$ first, and then the first dequeue must return $x$. $H_2$ *is* sequentially consistent — the order `enq(y)`, `enq(x)`, `deq → y` keeps each thread's operations in order — which shows that the two conditions differ. Brute force takes $n!$ steps for $n$ operations; deciding linearisability is NP-complete in general (Gibbons and Korach, 1997), but practical checkers handle histories of thousands of operations by pruning.
:::
:::

### Progress

Correctness says nothing about whether operations finish. A lock-based object can be correct and still let every thread wait for ever if the lock's holder is descheduled, crashes, or is interrupted by a signal handler that tries to take the same lock.

::: definition Progress conditions {#def-progress}
An implementation of a concurrent object is

- **deadlock-free** (blocking) if, whenever threads are executing operations and the threads holding locks keep being scheduled, some operation eventually completes; **starvation-free** if every operation eventually completes under the same assumption;
- **obstruction-free** if every operation completes in a finite number of its own steps whenever it runs in isolation (all other threads paused) from some point on;
- **lock-free** if, in every infinite execution, infinitely many operations complete — some thread always makes progress, however the threads are scheduled, even if some are paused for ever;
- **wait-free** if every operation completes in a finite number of its own steps, regardless of the other threads.
:::

Wait-free implies lock-free, which implies obstruction-free. The non-blocking conditions (the last three) are robust to the scheduler: a thread that is paused, swapped out or killed in the middle of an operation cannot prevent the others from completing theirs. Lock-freedom allows an individual operation to starve — to fail its compare-and-swap for ever because others keep succeeding — but the system as a whole always progresses. In practice, lock-free structures are chosen less for robustness than for avoiding the convoying and priority problems of locks under contention, and wait-free ones for real-time guarantees.

## Locking designs

The simplest concurrent object wraps a sequential one in a single lock — **coarse-grained locking**. Every operation holds the lock from start to finish, so operations are linearisable (the linearisation point is any moment while the lock is held), and correctness follows from the sequential implementation. But operations are serialised, and under contention the lock's cache line becomes the bottleneck, as the mutex stack above showed.

Finer locking lets operations on different parts of a structure proceed in parallel. Take a set of integers represented as a sorted linked list with sentinel nodes $-\infty$ and $+\infty$ at the ends.

::: algorithm Hand-over-hand locking (lock coupling) {#alg-hand-over-hand}
Each node has its own lock. To `add(k)` or `remove(k)`:

1. Lock the head sentinel; let `pred` be the head and `curr` its successor; lock `curr`.
2. While `curr.key` $< k$: unlock `pred`; set `pred` $\gets$ `curr` and `curr` $\gets$ `curr.next`; lock `curr`.
3. Now `pred.key` $< k \le$ `curr.key`, and both are locked. For `add`: if `curr.key` $= k$ report false; otherwise link a new node between `pred` and `curr`. For `remove`: if `curr.key` $= k$, set `pred.next` $\gets$ `curr.next` and report true; otherwise report false.
4. Unlock `curr` and `pred`.
:::

A thread always holds the lock of the node it is about to leave until it has locked the next one, so threads move along the list in single file and can never overtake one another. Two threads working on distant parts of the list proceed concurrently. Each operation linearises at the moment it locks the second of its final two nodes. Holding *two* locks is essential: if `remove` held only `curr`'s lock, two concurrent removals of adjacent nodes $a$ and $b$ could each unlink its node by changing its predecessor's `next`, and the removal of $b$ would be undone ([[#ex-two-locks]]).

Hand-over-hand locking still makes every operation acquire a lock per node it passes. **Optimistic** synchronisation traverses without locks, locks only `pred` and `curr`, and then *validates* — re-traverses to check that `pred` is still reachable and still points to `curr` — retrying if not. The **lazy list** (Heller, Herlihy, Luchangco, Moir, Scherer and Shavit, 2005) adds a `marked` bit to each node, set before the node is unlinked, so that validation only needs to check the two nodes' marks and link, and `contains` needs no locks at all. Most reads of a set are `contains`, so the lazy list is fast in practice.

## Lock-free programming with compare-and-swap

The basic tool of lock-free programming is the **compare-and-swap** loop: read a shared word, compute a new value from it, and install the new value only if the word has not changed meanwhile; otherwise retry. In C11 `atomic_compare_exchange_weak(&w, &expected, new)` performs, as one atomic step, "if `w` equals `expected`, store `new` and return true; otherwise copy the current value of `w` into `expected` and return false". (The "weak" form may fail spuriously, which is harmless in a loop.)

::: algorithm Treiber's lock-free stack {#alg-treiber}
The stack is a linked list of nodes; a single shared word `top` points to the top node (or is null).

- `push(n)`: **repeat**: `old` $\gets$ `top`; `n.next` $\gets$ `old` **until** CAS(`top`, `old`, `n`) succeeds.
- `pop()`: **repeat**: `old` $\gets$ `top`; **if** `old` is null **return** empty; `new` $\gets$ `old.next` **until** CAS(`top`, `old`, `new`) succeeds; **return** `old`.
:::

::: theorem Treiber's stack is linearisable and lock-free {#thm-treiber}
Assume that a node is never reused (freed and reallocated) while any thread might still hold a pointer to it. Then Treiber's stack is linearisable, with each successful operation linearised at its successful CAS (and an empty `pop` at its read of a null `top`), and it is lock-free.
:::

::: proof
*Invariant.* Between successful CASes, `top` and the `next` fields of the nodes reachable from it form a list representing the stack's contents, top first; we show that each successful CAS changes it exactly as the sequential operation would. A `push(n)` whose CAS succeeds found `top` $=$ `old`, with `n.next` $=$ `old` written before the CAS by the pushing thread, which owns `n` until it is published; so after the CAS the list is `n` followed by the old list — a push. A `pop` whose CAS succeeds found `top` $=$ `old` at the CAS and installs the value `new` it read from `old.next` earlier. That value is still `old.next` at the moment of the CAS: `next` fields of nodes in the stack are written only by the thread that pushes the node, before publishing it, and by the assumption `old` has not been popped, freed and pushed again in between (that is the ABA case, excluded by the hypothesis). So after the CAS the list is the old list without its first node — a pop that returns `old`. A failed CAS changes nothing. An empty `pop` read `top` $=$ null, so the stack was empty at that instant.

*Linearisability.* Each operation's linearisation point lies between its invocation and response, and the sequence of linearisation points, ordered by time, replays the sequential specification by the invariant. Hence the histories are linearisable.

*Lock-freedom.* A CAS on `top` fails only if `top` changed after the thread read it, and `top` changes only through a successful CAS, after which that operation returns immediately. Suppose some infinite execution had only finitely many completed operations. After the last completion, some thread takes infinitely many steps; each attempt of the loop is a bounded number of steps, so it executes infinitely many CASes, all of which fail. Each failure requires a successful CAS by another thread after the failing thread's read — and so a completed operation after the last one. This contradiction shows that infinitely many operations complete. (The stack is not wait-free: one thread's CAS may fail for ever while others keep succeeding.)
:::

::: example Two pushes race {#ex-push-race}
The stack holds one node $x$. Threads 1 and 2 call `push(a)` and `push(b)` at the same time, and their steps interleave as follows: 1 reads `top` $= x$; 2 reads `top` $= x$; 1 sets `a.next` $= x$; 2 sets `b.next` $= x$; 1 executes CAS(`top`, $x$, $a$); 2 executes CAS(`top`, $x$, $b$); 2 retries. Trace the state.
::: solution
| step | `top` | `a.next` | `b.next` | note |
|---|---|---|---|---|
| 1 reads `top` | $x$ | — | — | thread 1's `old` $= x$ |
| 2 reads `top` | $x$ | — | — | thread 2's `old` $= x$ |
| 1 writes `a.next` | $x$ | $x$ | — | $a$ is still private to thread 1 |
| 2 writes `b.next` | $x$ | $x$ | $x$ | $b$ is still private to thread 2 |
| 1: CAS($x 	o a$) | $a$ | $x$ | $x$ | succeeds: **push(a) linearises here** |
| 2: CAS($x 	o b$) | $a$ | $x$ | $x$ | fails: `top` is $a$; C11 copies $a$ into thread 2's `old` |
| 2 writes `b.next` | $a$ | $x$ | $a$ | retry with `old` $= a$ |
| 2: CAS($a 	o b$) | $b$ | $x$ | $a$ | succeeds: **push(b) linearises here** |

The final list is $b 	o a 	o x$, the result of the sequential history `push(a)`, `push(b)`. Thread 2's failed CAS did no harm: it changed nothing, and its effect was to make thread 2 redo its two cheap steps. Had the CAS been replaced by a plain store, thread 2 would have set `top` $= b$ with `b.next` $= x$, losing $a$.
:::
:::

### The ABA problem

The hypothesis of [[#thm-treiber]] is where the third version of the opening program went wrong. That version reused nodes — every thread pops a node and pushes the same node back — and compared only the node's index.

::: example How ABA corrupts the stack {#ex-aba}
The stack is $A \to B \to C$. Thread 1 starts `pop`: it reads `old` $= A$ and `new` $= A.\text{next} = B$, and is then delayed before its CAS. Thread 2 pops $A$, pops $B$, and pushes $A$ back. Trace the stack.
::: solution
After thread 2: the stack is $A \to C$ ($A$'s `next` was rewritten to $C$ when $A$ was pushed back), and thread 2 holds $B$. Thread 1 now executes CAS(`top`, $A$, $B$): `top` is $A$ again, so the CAS *succeeds*, and `top` becomes $B$ — a node that is not in the stack but in thread 2's hands. The stack now reads $B \to \dots$ (whatever $B$'s stale `next` is), $C$ is lost, and when thread 2 pushes $B$ the list may become a cycle. The CAS compared the value $A$ and could not tell that `top` had changed from $A$ to something else and back to $A$ — hence "ABA". In the opening experiment the check found `nodes 1/64 CORRUPTED`: walking from `top` reached a node twice almost immediately.
:::
:::

There are three standard defences:

- **Tagged pointers** (version counters): store a counter next to the pointer in the CAS'd word, and increment it on every successful CAS. A CAS then fails if the word changed and changed back, unless the counter has wrapped around in the meantime. This is the "CAS+tag" version of the opening program, which packs a 32-bit node index and a 32-bit tag into one 64-bit word; with full 64-bit pointers it needs a double-width CAS (`cmpxchg16b` on x86-64) or spare pointer bits.
- **Safe memory reclamation**: ABA with pointers arises because a node is freed and its memory reused while a delayed thread still holds a pointer to it. **Hazard pointers** (Maged Michael, 2004) make each thread publish the pointers it is about to dereference, and a node is freed only when no hazard pointer names it. **Epoch-based reclamation** frees a node only after every thread has passed through a quiescent point since it was unlinked; the **read–copy–update** (RCU) mechanism of the Linux kernel is of this kind. Both also prevent the use-after-free that the same delayed thread would otherwise commit when reading `old.next`.
- **Garbage collection**: in Java, Go or C#, a node cannot be reused while any thread holds a reference to it, so the pointer form of ABA cannot occur — one reason lock-free structures were first widespread in Java (`java.util.concurrent`, 2004).

Here is the lock-free stack with tags from the opening experiment. Nodes are indices into an array, and `top` packs an index (low $32$ bits) and a tag (high $32$ bits); `next[i]` is atomic because a thread executing `pop` may read it while another thread writes it, a race that the CAS then detects.

```c
#define NIL 0xFFFFFFFFu
static atomic_uint next[M];                  /* next[i]: node below node i */
static _Alignas(64) atomic_uint_least64_t top;   /* low 32 bits: index; high: tag */

static uint64_t pack(uint32_t idx, uint32_t tag) { return (uint64_t)tag << 32 | idx; }

static uint32_t pop(void) {
    uint64_t old = atomic_load_explicit(&top, memory_order_acquire), new;
    do {
        uint32_t i = (uint32_t)old;
        if (i == NIL) return NIL;                            /* empty */
        uint32_t below = atomic_load_explicit(&next[i], memory_order_relaxed);
        new = pack(below, (uint32_t)(old >> 32) + 1);        /* new tag */
    } while (!atomic_compare_exchange_weak_explicit(&top, &old, new,
                 memory_order_acquire, memory_order_acquire));
    return (uint32_t)old;
}

static void push(uint32_t i) {
    uint64_t old = atomic_load_explicit(&top, memory_order_relaxed), new;
    do {
        atomic_store_explicit(&next[i], (uint32_t)old, memory_order_relaxed);
        new = pack(i, (uint32_t)(old >> 32) + 1);
    } while (!atomic_compare_exchange_weak_explicit(&top, &old, new,
                 memory_order_release, memory_order_relaxed));
}
```

The release ordering of `push`'s successful CAS and the acquire ordering of `pop`'s loads make the pusher's write of `next[i]` (and anything it wrote into the node) visible to the thread that pops the node ([[parallel-computing/memory-consistency#thm-message-passing]]). The "no tag" version of the experiment is identical except that the tag is always $0$. The full program, which adds a mutex version, the OpenMP driver and the integrity check, has $76$ lines.

::: quiz
Which statements about Treiber's stack are true?
- [x] If a thread is paused for ever in the middle of `push`, the other threads can still complete their operations.
- [ ] Every individual `pop` completes within a bounded number of steps.
- [x] In a garbage-collected language, a version without tags is correct as long as every `push` allocates a fresh node.
- [ ] Making `top` a `volatile` pointer instead of an atomic one would also prevent ABA.
::: solution
The stack is lock-free: a paused thread holds no lock, and its unfinished CAS does not prevent others from succeeding. It is not wait-free: a `pop` can fail its CAS indefinitely under contention. With garbage collection, a node that a delayed thread still references cannot be reclaimed and reused, so `top` cannot return to the same node unless that node was popped and pushed again — which fresh allocation on every `push` rules out. `volatile` provides neither atomicity nor protection against ABA.
:::
:::

::: example Why the shared stack cannot scale {#ex-stack-throughput}
From the opening measurements, compute the total throughput of the mutex and lock-free stacks for $p = 1, 4, 16$, and compare it with the limit imposed by moving the line holding `top` between cores, at $100$–$200$ ns per transfer ([[parallel-computing/memory-consistency#ex-pingpong]]).
::: solution
Each line of the output gives the time per pop–push pair per thread, so the total throughput is $p$ divided by that time:

| $p$ | mutex | CAS with tag |
|---|---|---|
| $1$ | $1/21	ext{ ns} = 47.6$ M pairs/s | $1/27	ext{ ns} = 37.0$ M pairs/s |
| $4$ | $4/753	ext{ ns} = 5.3$ M pairs/s | $4/434	ext{ ns} = 9.2$ M pairs/s |
| $16$ | $16/4647	ext{ ns} = 3.4$ M pairs/s | $16/2520	ext{ ns} = 6.3$ M pairs/s |

With one thread the line never moves, and the mutex (one atomic instruction to acquire and one to release, all within a single cache line) is even slightly faster than the two CAS loops. With several threads, every operation needs the line holding `top` (and, for the mutex, the line holding the lock word) in its own cache in state M. A pair of operations needs at least two transfers when consecutive operations come from different threads, so at $100$–$200$ ns per transfer the throughput is at most about $1/(2 	imes 100	ext{ ns}) = 5$ M to $1/(2 	imes 200	ext{ ns}) = 2.5$ M pairs per second, unless a thread manages several operations while it holds the line. The measurements are of that order. Neither design can exceed it, whatever the number of threads; only a design in which threads usually work on different lines can.
:::
:::

::: widget plot
f: 500/t
x: 1, 16
y: 0, 50
sliders: t=100:50:250:10
labels: 	ext{bound } 1/(2t) 	ext{ (M pairs/s)}
points: 1,47.6; 4,5.3; 16,3.4; 1,37.0; 4,9.2; 16,6.3
caption: Total throughput of the shared stack in millions of pop–push pairs per second against the number of threads $p$, from [[#ex-stack-throughput]]: the mutex stack ($47.6$, $5.3$, $3.4$) and the tagged lock-free stack ($37.0$, $9.2$, $6.3$). The horizontal line is the coherence bound $1/(2t)$ for a transfer time of $t$ ns. Notice that one thread beats any number of threads: as soon as two threads compete, every operation pays for moving a cache line. Drag $t$ between $100$ and $250$ ns, the range measured on this machine, and see that the multi-threaded points sit near the line.
:::

### Queues and helping

A queue is harder than a stack because it has two ends. The **Michael–Scott queue** (1996), the basis of Java's `ConcurrentLinkedQueue`, keeps a linked list with a dummy node and two shared pointers, `head` and `tail`. An `enqueue` links its node after the last node with a CAS on that node's `next` field, and then swings `tail` to the new node with a second CAS. Between the two CASes, `tail` lags one node behind the real end. A thread that finds `tail.next` non-null therefore knows that some enqueue is half-finished and **helps** it, advancing `tail` itself before retrying its own operation. Helping is the key idea of non-blocking design: an operation that is interrupted half-way leaves the structure in a state from which any thread can finish it, so nobody needs to wait. The queue is linearisable (an enqueue linearises at the CAS that links its node, a dequeue at the CAS that advances `head`) and lock-free.

## The power of atomic instructions

Can every concurrent object be implemented without locks? With which instructions? Maurice Herlihy answered both questions in 1991 by comparing instructions according to the hardest problem they can solve.

::: definition Consensus {#def-consensus}
In the **consensus** problem, each of $n$ threads starts with an input value and calls `decide`, which returns a value, such that

- **agreement**: all threads decide the same value;
- **validity**: the decided value is the input of some thread;
- **wait-freedom**: each thread decides in a finite number of its own steps.

The **consensus number** of an object type is the largest $n$ for which consensus among $n$ threads can be solved using objects of that type and read–write registers, or $\infty$ if there is no largest.
:::

::: theorem Compare-and-swap has consensus number infinity {#thm-cas-consensus}
For every $n$, consensus among $n$ threads can be solved wait-free with one compare-and-swap word.
:::

::: proof
Let the word $w$ initially hold a value $\bot$ that is no thread's input. Each thread with input $v$ executes CAS($w$, $\bot$, $v$) once, then reads $w$ and decides the value it read. Exactly one CAS succeeds — the first one executed, since all others find $w \ne \bot$ — and after it $w$ never changes again, since every later CAS fails. So every thread reads and decides the value $v_1$ written by the first CAS: agreement. $v_1$ is the input of the thread that executed it: validity. Each thread takes two steps: wait-freedom.
:::

By contrast, read–write registers have consensus number $1$: there is no wait-free consensus protocol for two threads using only reads and writes (Loui and Abu-Amara, 1987; Herlihy, 1991). The proof is a **valency argument** in the style of Fischer, Lynch and Paterson's impossibility theorem for asynchronous message passing (1985), taught in [[distributed-systems]]: one shows that some reachable state is *critical* — the next step of either thread fixes the outcome, differently — and then that whatever those two steps are (reads or writes, of the same or different registers), the other thread cannot tell them apart, a contradiction. The same argument shows that test-and-set, fetch-and-add and atomic swap have consensus number exactly $2$: they solve consensus for two threads ([[#ex-tas-consensus]]) but not for three. Queues and stacks also have consensus number $2$.

Herlihy also proved a converse: consensus is **universal**. Any object with a sequential specification has a wait-free linearisable implementation for $n$ threads from $n$-thread consensus objects and registers (the *universal construction* threads all operations through a sequence of consensus instances that decide the order of operations, with helping to make it wait-free). Two consequences follow. No wait-free implementation of a queue, or of compare-and-swap, can be built from reads, writes and test-and-set for three or more threads, however clever; and with compare-and-swap (or load-linked/store-conditional), anything can be built. That is why every modern multiprocessor instruction set provides one of the two.

::: warning Lock-free does not mean fast
Lock-free structures avoid the worst behaviours of locks — a holder descheduled while others wait, priority inversion, deadlock — but they do not remove contention. Every successful operation on Treiber's stack writes the same word, so its throughput is bounded by how fast one cache line can move between cores, exactly like a lock's; in the opening experiment, $16$ threads achieved less total throughput than one. CAS loops can also waste work: a failed attempt has done all the work of a successful one. A lock-free design scales only if threads usually operate on *different* cache lines — a hash table with many buckets, per-thread queues with stealing ([[parallel-computing/shared-memory#alg-work-stealing]]), or counters sharded by thread. When in doubt, measure, and prefer well-tested library implementations (Java's `java.util.concurrent`, C++ libraries such as Folly or `libcds`, Rust's `crossbeam`) to your own.
:::

### Avoiding contention altogether

The most scalable shared objects are the ones that are rarely shared. Some recurring designs:

- **Sharded counters**: each thread increments its own padded counter, and a read adds them up. Increments are contention-free; reads cost $O(p)$ and see a value that was correct at some moment during the read (it is linearisable only if reads are rare and you accept a slightly weaker guarantee, or you use a more careful protocol). Linux's per-CPU counters and Java's `LongAdder` work this way.
- **Combining**: threads that find a structure busy leave their operations with one thread that applies them all at once while holding the lock — **flat combining** (Hendler, Incze, Shavit and Tzafrir, 2010) — so the structure's cache lines stay in one cache.
- **Read-mostly data**: readers proceed without writing any shared location (RCU, sequence locks), and writers pay the whole cost of synchronisation.
- **Transactional memory**: the programmer marks a block atomic, and the system runs it speculatively, detecting conflicts and retrying (Herlihy and Moss, 1993). Intel shipped hardware transactional memory with Haswell processors in 2013, but it has since been disabled by default on many processors after errata and security problems (as of 2026); software transactional memory is used in Haskell and Clojure.

::: history
Concurrent data structures began with operating systems. R. Kent Treiber described the lock-free stack in an IBM research report in 1986, using the System/370's compare-and-swap, together with the version-counter defence against ABA. Maurice Herlihy and Jeannette Wing defined linearisability in 1990; Herlihy's "Wait-free synchronization" (1991) introduced consensus numbers and the universal construction. Maged Michael and Michael Scott published their non-blocking queue in 1996, and Timothy Harris a lock-free linked list using marked pointers in 2001. Maged Michael introduced hazard pointers in 2004, the same year Doug Lea's `java.util.concurrent` package, built on such algorithms, entered Java 5. Paul McKenney and John Slingwine described read–copy–update in 1998; it entered the Linux kernel in 2002. Maurice Herlihy and Eliot Moss proposed transactional memory in 1993, and Herlihy and Nir Shavit's *The Art of Multiprocessor Programming* (2008; second edition with Victor Luchangco and Michael Spear, 2020) became the standard text.
:::

## Where this leads

The work-stealing deques of [[parallel-computing/shared-memory]] are lock-free structures of this chapter's kind, owned at one end and stolen from at the other. [[parallel-computing/parallel-algorithms]] turns from data structures shared by independent threads to algorithms designed in the work–span model, where synchronisation is implicit in fork and join. Consensus among processes that communicate by messages and may crash — where the impossibility of [[#thm-cas-consensus]]'s counterpart for registers becomes the FLP theorem, and protocols such as Paxos and Raft work around it — is the heart of [[distributed-systems]]. Databases implement the same ideas at larger scale: two-phase locking and optimistic concurrency control are the transactional versions of this chapter's locking and validation ([[databases]]).

::: summary
- A concurrent object is correct if it is **linearisable** ([[#def-linearisable]]): every history can be explained by a sequential order that respects real time and the sequential specification; each operation takes effect at a linearisation point. Linearisability is local, so linearisable objects compose. Small histories can be checked by brute force ([[#ex-check-history]]).
- Progress conditions ([[#def-progress]]): deadlock-free and starvation-free (blocking), obstruction-free, **lock-free** (some operation always completes) and **wait-free** (every operation completes in bounded steps).
- Lock-based designs range from one coarse lock to **hand-over-hand** locking ([[#alg-hand-over-hand]]), optimistic validation and the lazy list.
- **Treiber's stack** ([[#alg-treiber]]) is linearisable and lock-free with one CAS per operation ([[#thm-treiber]]) — provided nodes are not reused while referenced. Reuse causes the **ABA problem** ([[#ex-aba]]), which corrupted our untagged stack; tags, hazard pointers, epochs or garbage collection prevent it.
- **Helping** lets the Michael–Scott queue stay lock-free when an operation stops half-way.
- Compare-and-swap solves consensus for any number of threads ([[#thm-cas-consensus]]); registers solve it for none, and test-and-set and fetch-and-add only for two. With consensus, every object has a wait-free implementation.
- Lock-free is not contention-free: one shared word limits throughput like a lock; scalable designs shard, combine or avoid writes to shared lines.
:::

## Exercises

::: exercise Counting linearisations {level=1 check="6"}
Three threads each call `push` on an initially empty stack, with values $1$, $2$ and $3$, and all three operations overlap in time. No other operations occur. How many different sequential histories are valid linearisations? (Enter the number.)
::: solution
All three overlap, so real time imposes no order, and any order of three pushes is legal for a stack. There are $3! = 6$ linearisations. A later sequence of `pop`s would reveal which one was chosen, and would rule out the others.
:::
:::

::: exercise Classify the progress {level=1}
Classify each implementation of a shared counter's `increment` by the strongest condition of [[#def-progress]] it satisfies: (a) a mutex around `count++`; (b) a loop that reads `count` and attempts CAS(`count`, $v$, $v + 1$) until it succeeds; (c) one `atomic_fetch_add`; (d) each thread increments its own padded slot of an array.
::: solution
(a) Blocking: deadlock-free, and starvation-free if the mutex is fair; if the holder is descheduled, everyone waits. (b) Lock-free: a CAS fails only because another increment succeeded, so some increment always completes, but a particular thread can keep failing; not wait-free. (c) Wait-free, assuming the hardware executes `lock xadd` in bounded time (it does on x86; on LL/SC machines the compiler emits a retry loop, which is only lock-free). (d) Wait-free and contention-free for increments; a read must sum all slots, and is not linearisable with respect to concurrent increments without further care.
:::
:::

::: exercise Is it linearisable? {level=1}
A stack history: A calls `push(1)` during $[0, 2]$; B calls `push(2)` during $[1, 3]$; A calls `pop() → 1` during $[4, 5]$; B calls `pop() → 1` during $[6, 7]$. Is it linearisable? What if B's second operation had returned $2$?
::: solution
Not linearisable: both pops are after both pushes in real time, and A's pop precedes B's pop, so in any linearisation the stack holds $\{1, 2\}$ before the first pop, which removes one element, and the second pop must return the other. Two pops cannot both return $1$, since $1$ was pushed once. If B's pop returned $2$, the order `push(2)`, `push(1)`, `pop → 1`, `pop → 2` is legal and respects real time (the pushes overlap), so the history is linearisable.
:::
:::

::: exercise ABA by tag wrap-around {level=2 check="2^32/10^8"}
In the tagged stack, the tag has $32$ bits and is incremented on every successful CAS. Suppose the stack sustains $10^8$ successful operations per second. A delayed thread can still suffer ABA if, while it is paused, the tag advances by exactly a multiple of $2^{32}$ and the same index is back on top. What is the shortest pause, in seconds, for which this is possible? (Enter the number of seconds.)
::: solution
The tag returns to the same value after $2^{32}$ increments, which take $2^{32}/10^8 \approx 42.9$ seconds. A thread that is paused for $43$ seconds in the middle of a `pop` — possible under heavy swapping, or when a process is stopped with a signal — could see an unchanged word. With $64$-bit pointers and a $64$-bit tag (double-width CAS) the interval becomes thousands of years. Tags make ABA improbable rather than impossible; hazard pointers and epochs make it impossible.
:::
:::

::: exercise Why two locks? {#ex-two-locks level=2}
In a sorted linked list $\text{head} \to a \to b \to c$, threads 1 and 2 concurrently remove $a$ and $b$. Show that if each removal locks only the node it removes (and its predecessor is updated without a lock), $b$ can remain in the list after both removals report success. Then explain why hand-over-hand locking ([[#alg-hand-over-hand]]) prevents this.
::: solution
Thread 1 locks $a$, finds its predecessor `head`, and will set `head.next` $\gets$ `a.next`. Thread 2 locks $b$, finds its predecessor $a$, and will set `a.next` $\gets$ `b.next` $= c$. Interleave: thread 1 reads `a.next` $= b$; thread 2 sets `a.next` $\gets c$ (removing $b$); thread 1 sets `head.next` $\gets b$. Now the list is $\text{head} \to b \to c$: $b$, whose removal succeeded, is back, and $a$ is gone. With hand-over-hand locking, removing $a$ requires holding the locks of `head` and $a$, and removing $b$ requires the locks of $a$ and $b$; both need $a$'s lock, so the two removals cannot overlap. Whichever comes second re-reads the up-to-date `next` fields under its locks.
:::
:::

::: exercise Test-and-set solves two-thread consensus {#ex-tas-consensus level=2}
Using one test-and-set bit (initially $0$, `TAS` sets it to $1$ and returns the old value) and two registers, give a wait-free consensus protocol for two threads, and prove it correct. Why does the same protocol not work for three threads?
::: solution
Thread $i \in \{0, 1\}$ with input $v_i$: write $v_i$ into register `prefer[i]`; then if `TAS(bit)` returns $0$, decide $v_i$; otherwise decide `prefer[1 - i]`.

Exactly one thread's TAS returns $0$, the first; call it the winner. It decides its own input. The loser's TAS came after the winner's, which came after the winner's write of `prefer[winner]`, so the loser reads the winner's input and decides it: agreement and validity. Each thread takes three steps: wait-free. With three threads, a loser knows that it lost but not *which* of the other two won, and reading both `prefer` registers does not tell it — the bit records only that someone set it. Herlihy proved that no protocol at all can solve three-thread consensus with test-and-set and registers: its consensus number is $2$.
:::
:::

::: exercise A sharded counter {level=3}
Write a sharded counter in C11 for up to $64$ threads: `inc(t)` increments slot $t$ (each slot padded to $64$ bytes) with a relaxed atomic add, and `read()` sums all slots with relaxed loads. Model each slot access as an atomic event at an instant (as coherent hardware provides), and let $C(\tau)$ be the number of increments performed by instant $\tau$. Prove that a `read` running from instant $s$ to instant $e$ returns a value that $C$ took at some instant in $[s, e]$ — so `read` is linearisable — and explain why the argument fails if the counter also supports `dec`.
::: solution
```c
#include <stdatomic.h>

typedef struct { _Alignas(64) atomic_long n; } slot;
static slot count[64];

void inc(int t) { atomic_fetch_add_explicit(&count[t].n, 1, memory_order_relaxed); }

long read(void) {
    long sum = 0;
    for (int t = 0; t < 64; t++) sum += atomic_load_explicit(&count[t].n, memory_order_relaxed);
    return sum;
}
```

Let $c_t(\tau)$ be slot $t$'s value at instant $\tau$, so $C(\tau) = \sum_t c_t(\tau)$, and let the read load slot $t$ at instant $\tau_t \in [s, e]$. It returns $v = \sum_t c_t(\tau_t)$. Each $c_t$ never decreases, so $c_t(s) \le c_t(\tau_t) \le c_t(e)$, and summing, $C(s) \le v \le C(e)$. Now $C$ is a non-decreasing integer function that changes by exactly $1$ at each increment, so on the way from $C(s)$ to $C(e)$ it takes every integer value in between at some instant of $[s, e]$; in particular it takes the value $v$ at some instant $\tau^* \in [s, e]$. Linearise the read at $\tau^*$: the sequential specification ("a read returns the number of increments before it") is then satisfied, and $\tau^*$ lies within the read's interval. Increments linearise at their atomic add. Hence the counter is linearisable.

With `dec`, the slot values are no longer monotone and the bounds fail. Start with both slots $0$. Thread $0$ increments slot $0$ to $1$ ($C = 1$); the reader loads slot $0$ and gets $1$; thread $0$ decrements slot $0$ to $0$ ($C = 0$); thread $1$ increments slot $1$ to $1$ ($C = 1$); the reader loads slot $1$ and gets $1$. The read returns $2$, although $C$ took only the values $0, 1, 0, 1$. This is why Java's `LongAdder` documents only that `sum()` is exact in the absence of concurrent updates.
:::
:::

::: exercise Lock-free is not wait-free {level=3}
Construct a schedule of two threads executing Treiber's `push` in which one thread's `push` never completes, while the other thread completes infinitely many operations. Then describe how a wait-free stack could guarantee that every operation completes, at the cost of extra work, using the idea of helping.
::: solution
Thread A starts `push(a)`: it reads `top` $= x$ and sets `a.next` $= x$. Before A's CAS, thread B completes a `push` (`top` changes). A's CAS fails; A re-reads `top` and sets `a.next`. Before A's CAS, B completes a `pop` or another `push`. Repeat for ever: every time A is about to CAS, B has just changed `top`, so A's CAS always fails, while B completes an operation in every round. The schedule is unfair to A but legal, and lock-freedom only promises that *some* thread progresses.

*Wait-free design by helping.* Give each thread a slot in an **announcement array** in which it publishes the operation it wants performed, with a sequence number. Before performing its own operation, a thread scans the array (or one slot, chosen round robin) and performs any older announced operation on the announcer's behalf, recording the result in the announcer's slot, all with CAS so that each announced operation is applied exactly once. A thread whose operation has been announced for a while is then guaranteed to have it completed by others within $O(p)$ operations of any thread, so its own number of steps is bounded. This is the idea of Herlihy's universal construction, and of practical wait-free queues such as Kogan and Petrank's (2011); the price is that every operation does work for others, so wait-free structures are typically slower than lock-free ones on average while bounding the worst case.
:::
:::
