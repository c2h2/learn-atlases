Two threads each execute `x = x + 1` once, starting from `x = 0`. Afterwards `x` is usually $2$ — and sometimes $1$. The statement is not one step but three: load `x` into a register, add one, store the register back. If both threads load before either stores, one increment is lost. Nothing in the text of the program says which outcome to expect; it depends on how the steps of the two threads are interleaved, which the programmer does not control. Bugs of this kind — **race conditions** — are rare, hard to reproduce and sometimes catastrophic, and they are the reason concurrency is the part of programming where informal reasoning fails most often.

Programming languages offer several **models of concurrency**, each a different answer to the question of how concurrent activities communicate. In the **shared-memory** model, threads read and write common variables and coordinate with locks; the language must then say what a read can return, which is the job of a **memory model**. In the **message-passing** models — channels in the style of CSP and Go, and **actors** in the style of Erlang — activities share nothing and communicate only by sending values. **Futures** and **async/await** structure concurrent computations as values that will be available later, building on the coroutines of [[programming-languages/control]]. This chapter gives each model a precise semantics, proves the basic facts about interleavings and deadlock, runs small experiments (including one that shows real x86 hardware breaking sequential consistency), and shows how Rust's type system rules out data races at compile time. Threads, processes and scheduling as operating-system mechanisms are the subject of [[operating-systems]].

## Shared memory and interleavings

::: definition Interleaving semantics {#def-interleaving}
A **concurrent program** consists of threads $P_1, \ldots, P_n$, each a sequence of atomic **actions** (a load, a store, an arithmetic step on a register, a lock operation), operating on a shared memory. An **execution** is an **interleaving**: a sequence containing every action of every thread exactly once, in which the actions of each thread appear in program order. Its result is obtained by performing the actions in that order on the initial memory. A concurrent program is correct only if *every* interleaving produces an acceptable result.
:::

Interleaving is the small-step semantics of [[programming-languages/syntax-semantics]] with non-determinism: at each step, *any* thread that can move may take the next step. Determinacy, the first theorem we proved for a sequential language, fails by design. How many executions are there?

::: theorem Counting interleavings {#thm-interleavings}
Two threads with $m$ and $n$ actions have exactly $\binom{m+n}{m}$ interleavings. More generally, $k$ threads with $n_1, \ldots, n_k$ actions have $\dfrac{(n_1 + \cdots + n_k)!}{n_1! \cdots n_k!}$ interleavings.
:::

::: proof
An interleaving of two threads is determined by the set of positions, among $1, \ldots, m + n$, occupied by the first thread's actions: given the positions, program order fixes which action goes where, and the second thread fills the remaining positions in its own order. Conversely, every $m$-element set of positions gives an interleaving, and different sets give different sequences. So the interleavings correspond bijectively to $m$-element subsets of an $(m+n)$-element set, of which there are $\binom{m+n}{m}$. For $k$ threads, assign each of the $N = \sum n_i$ positions to a thread, with exactly $n_i$ positions for thread $i$; the number of such assignments is the multinomial coefficient $N! / (n_1! \cdots n_k!)$, by the same bijection.
:::

The count grows exponentially: two threads of $20$ actions each have $\binom{40}{20} \approx 1.4 \times 10^{11}$ interleavings. Testing cannot cover them, which is why concurrent code needs reasoning — or a model in which most interleavings are equivalent.

::: example The lost update {#ex-lost-update}
Enumerate every interleaving of two threads executing `load x; add 1; store x` from `x = 0`, and count the final values.
::: solution
```python
from itertools import combinations
from collections import Counter

def interleavings(a, b):
    """All merges of sequences a and b that keep each one's order."""
    n = len(a) + len(b)
    for pos in combinations(range(n), len(a)):     # positions taken by a
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

There are $\binom{6}{3} = 20$ interleavings, as [[#thm-interleavings]] predicts, and only two of them — all of A before all of B, or the reverse — give $2$. In the other $18$, both threads load before the other stores, and one update is lost. (These are counts of *schedules*, not probabilities: on real hardware, the fast paths are far more likely, which is exactly why the bug hides during testing.)
:::
:::

::: widget graph
nodes: 00@0,0; 10@1,0; 20@2,0; 30@3,0; 01@0,1; 11@1,1; 21@2,1; 31@3,1; 02@0,2; 12@1,2; 22@2,2; 32@3,2; 03@0,3; 13@1,3; 23@2,3; 33@3,3
edges: 00>10; 10>20; 20>30; 01>11; 11>21; 21>31; 02>12; 12>22; 22>32; 03>13; 13>23; 23>33; 00>01; 01>02; 02>03; 10>11; 11>12; 12>13; 20>21; 21>22; 22>23; 30>31; 31>32; 32>33
algorithm: topo
caption: The state space of two threads with three actions each. Vertex $ij$ means "thread A has done $i$ actions and B has done $j$"; a step right is an action of A, a step up an action of B. Every interleaving is a monotone path from $00$ to $33$, and there are $\binom{6}{3} = 20$ of them. The race in [[#ex-lost-update]] is visible in this picture: the lost update happens on every path that passes through $11$, $12$, $21$ or $22$ — both threads have loaded before either has stored — which is every path except the two along the edges of the square. Run the topological sort: any order it produces lists each state after all states that can precede it.
:::

::: widget pascal
rows: 16
mod: 2
caption: Pascal's triangle: the entry in row $m + n$, position $m$, is $\binom{m+n}{m}$, the number of interleavings of threads with $m$ and $n$ actions ([[#thm-interleavings]]); row $6$ contains the $20$ of the lost-update example. The colouring by parity shows the triangle's fractal structure; what matters here is how quickly the middle entries grow — row $16$ already has $12\,870$ in the middle.
:::

### Data races, locks and atomicity

::: definition Data race {#def-data-race}
Two memory accesses **conflict** if they are made by different threads to the same location and at least one is a write. A **data race** is a pair of conflicting accesses that are not ordered by synchronisation — in an interleaving semantics, that can occur next to each other in some execution.
:::

The standard remedy is **mutual exclusion**: a **lock** (mutex) `m` with operations `acquire(m)`, which blocks while another thread holds `m`, and `release(m)`. A **critical section** bracketed by `acquire` and `release` executes **atomically** with respect to every other critical section on the same lock: no interleaving places another thread's protected actions inside it. With `acquire; load; add; store; release` in both threads, the enumerator — extended so that `acquire` can run only when the lock is free — finds exactly two executions, both giving $x = 2$ (an exercise asks you to write it). Locks restore the sequential reasoning of one thread at a time, at the cost of waiting, and introduce a new failure.

::: definition Deadlock {#def-deadlock}
A set of threads is **deadlocked** if each is blocked waiting for a lock held by another thread of the set. The **wait-for graph** has an edge $T \to U$ when thread $T$ waits for a lock held by $U$; a deadlock is a cycle in it.
:::

::: theorem Lock ordering prevents deadlock {#thm-lock-order}
Suppose the locks are totally ordered, $\ell_1 < \ell_2 < \cdots < \ell_k$, and every thread that holds locks acquires a new lock only if it is greater than every lock it currently holds. Then no execution reaches a deadlock.
:::

::: proof
Suppose threads $T_1, \ldots, T_r$ form a cycle in the wait-for graph: $T_i$ waits for a lock $a_i$ held by $T_{i+1}$ (indices modulo $r$). Since $T_{i+1}$ holds $a_i$ and is itself waiting to acquire $a_{i+1}$, the rule says $a_{i+1} > a_i$ (it may request $a_{i+1}$ only if it is greater than every lock it holds, including $a_i$). Following the cycle, $a_1 < a_2 < \cdots < a_r < a_1$, a contradiction.
:::

The **dining philosophers** problem (Dijkstra, 1965) is the classic illustration: five philosophers, each needing the forks on both sides, deadlock if each picks up the left fork first; numbering the forks and picking up the lower-numbered one first breaks the cycle. Lock ordering is how large systems — operating-system kernels, databases ([[databases]]) — avoid deadlock in practice.

::: widget graph
nodes: T1@0,1; T2@1,2; T3@2,1; T4@1,0
edges: T1>T2; T2>T3; T3>T4; T4>T1
algorithm: topo
caption: A wait-for graph of four threads: T1 waits for a lock held by T2, T2 for one held by T3, and so on round to T1. The cycle is a deadlock: none of them can proceed. Run the topological sort — it cannot complete, because a directed graph has a topological order exactly when it has no cycle. Delete the edge T4 > T1 (as lock ordering would force: the thread holding the largest lock never waits for a smaller one) and the sort succeeds.
:::

::: quiz
Which of these code fragments, run by two threads at once on shared `x` and `y`, contain a data race?
- [x] Both threads run `x = x + 1` with no lock.
- [ ] Both threads run `with lock: x = x + 1` using the same lock.
- [x] Thread A runs `with lock_a: x = 1`; thread B runs `with lock_b: print(x)`.
- [ ] Thread A runs `print(x)`; thread B runs `print(x)`.
::: solution
The first has conflicting unsynchronised accesses. The second protects every access with one lock, so the accesses are ordered. The third uses *different* locks, which do not order anything between the two threads: still a race. The fourth has two reads only; reads do not conflict.
:::
:::

## Memory models

The interleaving semantics assumes that every thread sees every write as soon as it happens, in a single global order. Lamport called this **sequential consistency**.

::: definition Sequential consistency (Lamport, 1979) {#def-sc}
An execution is **sequentially consistent** (SC) if its result is the same as that of some interleaving of the threads' actions in which each read returns the value of the most recent write to the same location.
:::

Real hardware and compilers do not provide SC, because it forbids optimisations that single-threaded code relies on: reordering independent memory operations, keeping values in registers, and — most importantly in hardware — buffering stores. The classic witness is the **store-buffering** test:

$$
\text{initially } x = y = 0; \qquad \text{A: } x := 1;\ r_1 := y \qquad\qquad \text{B: } y := 1;\ r_2 := x
$$

Under SC, $r_1 = r_2 = 0$ is impossible: whichever store comes first in the interleaving precedes both loads, so at least one load sees a $1$. Enumerating the six interleavings confirms that only $(0,1)$, $(1,0)$ and $(1,1)$ occur. But on x86 processors, each core puts its stores into a **store buffer** and continues; a load can complete before the core's own earlier store has reached memory. This model, **TSO** (total store order), allows $(0, 0)$ — a Python simulation that adds a FIFO buffer per thread, drained at arbitrary moments, finds all four outcomes.

::: example Observing store buffering on real hardware {#ex-store-buffer}
Run the store-buffering test a million times on an x86-64 machine with C11 relaxed atomics, and again with sequentially consistent atomics.
::: solution
The test (condensed; each round, a coordinator resets `x` and `y`, releases both threads, waits for them and records `r1`, `r2`):

```c
/* thread A, in each round */
atomic_store_explicit(&x, 1, memory_order_relaxed);
atomic_store_explicit(&r1, atomic_load_explicit(&y, memory_order_relaxed), memory_order_relaxed);
/* thread B, in each round */
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

This is an observation on one machine (a 36-core x86-64 server, GCC, as of 2026); the proportions vary from run to run and machine to machine. The disassembly shows that the compiler kept the store before the load (`movl $0x1, x` then `mov y, %eax`), so the $994\,432$ outcomes $(0, 0)$ — impossible under SC — come from the hardware's store buffers: both threads' stores were still buffered when their loads ran. With `memory_order_seq_cst`, the compiler emits an atomic exchange (`xchg`) for each store, which drains the store buffer, and $(0, 0)$ disappears entirely.
:::
:::

If hardware and compilers are not SC, what may a programmer assume? Modern languages answer with a contract:

::: theorem Data-race freedom implies sequential consistency (Adve and Hill, 1990) {#thm-drf-sc}
If every sequentially consistent execution of a program is free of data races (with synchronisation through locks and through accesses declared atomic), then every execution of the program, on an implementation conforming to the language's memory model, behaves as if sequentially consistent.
:::

This "SC for DRF" guarantee is the core of the Java memory model (JSR-133; Manson, Pugh and Adve, 2005), of C11 and C++11 (Boehm and Adve, 2008), and of Go, Rust and Swift. We state it without proof — it is a theorem about each language's formal model and about the compilers and hardware that implement it. Its message is practical: *write race-free programs, and you may reason with interleavings*. A program with a data race gets weaker guarantees (Java) or none (in C and C++ a data race on a non-atomic variable is undefined behaviour). Experts can use weaker atomics (`memory_order_acquire`, `release`, `relaxed`) for speed, giving up SC on purpose, as in the experiment above.

## Message passing

The alternative to sharing memory is not to share it. In the **message-passing** model, concurrent processes have private state and interact only by sending and receiving messages. Tony Hoare's **Communicating Sequential Processes** (CSP, 1978) made the model precise: processes communicate over **channels** with `ch ! v` (send) and `ch ? x` (receive), and on an unbuffered channel a send and a receive happen together, as a **rendezvous**. Go's channels and `select`, Occam, Clojure's `core.async` and Rust's `std::sync::mpsc` follow CSP; Robin Milner's **π-calculus** (Milner, Parrow and Walker, 1992) is its theoretical successor, in which channel names can themselves be sent, so the communication topology can change.

::: example A pipeline of channels {#ex-pipeline}
Build a three-stage pipeline — a producer of $1, \ldots, 5$, a squaring stage, a consumer — as threads connected by bounded queues.
::: solution
```python
import threading, queue

def producer(out):
    for i in range(1, 6): out.put(i)
    out.put(None)                                  # end-of-stream marker
def squarer(inp, out):
    while (v := inp.get()) is not None: out.put(v * v)
    out.put(None)
def consumer(inp, results):
    while (v := inp.get()) is not None: results.append(v)

a, b, results = queue.Queue(maxsize=2), queue.Queue(maxsize=2), []   # bounded channels
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

Although the three threads interleave unpredictably, the output is the same on every run: each queue is FIFO, and each stage is sequential, so the order of values is determined. No variable is shared except through the queues, whose operations are internally synchronised. The bound (`maxsize=2`) gives **back-pressure**: a fast producer blocks when the channel is full instead of exhausting memory. This determinism is not luck: Gilles Kahn proved (1974) that networks of sequential processes connected by FIFO channels, in which each process reads from one channel at a time with blocking receives, compute a deterministic function of their inputs.
:::
:::

Message passing removes data races but not every concurrency bug. Two processes that each wait to receive from the other before sending deadlock exactly as lock cycles do, and programs with `select` (receive from whichever channel is ready first) are non-deterministic again.

### Actors

The **actor model** (Carl Hewitt, Peter Bishop and Richard Steiger, 1973; formalised by Gul Agha, 1986) makes the concurrent entity the unit of everything.

::: definition Actor {#def-actor}
An **actor** has private state, an address, and a **mailbox**. Communication is by **asynchronous** message sends to an address: a send never blocks, and messages wait in the receiver's mailbox. An actor processes one message at a time; in response to a message it may update its own state, send messages to actors whose addresses it knows, and create new actors.
:::

Because an actor's state is touched only by the actor itself, one message at a time, there are no data races by construction, and each message handler can be reasoned about sequentially. Erlang (Armstrong, Virding and Williams, from 1986) built telephone switches on actors — its processes are cheap enough to have millions, and its "let it crash" philosophy restarts failed actors from supervisors — and Akka (for Scala and Java) and Orleans (.NET) bring the model to other platforms. Here is an actor implemented with Python's `asyncio`:

```python
import asyncio

class Actor:
    """An actor: private state, a mailbox, and one task that handles messages in order."""
    def __init__(self):
        self.mailbox = asyncio.Queue()
        self.task = asyncio.create_task(self._loop())
    def send(self, msg):                # asynchronous: never blocks the sender
        self.mailbox.put_nowait(msg)
    async def _loop(self):
        while True:
            msg = await self.mailbox.get()
            if msg == "stop": return
            await self.receive(msg)

class Counter(Actor):
    def __init__(self):
        self.n = 0                      # touched only by this actor's own task
        super().__init__()
    async def receive(self, msg):
        match msg:
            case ("add", k): self.n += k
            case ("get", reply): reply.set_result(self.n)   # answer through a future

async def main():
    c = Counter()
    async def client(i):
        for _ in range(1000):
            c.send(("add", 1))
            await asyncio.sleep(0)      # yield to other tasks: maximal interleaving
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

Four clients send $4000$ increments, interleaved as finely as the event loop allows, and none is lost: the increments are serialised by the mailbox. The query is answered through a *future*, the subject of the next section. The actor model's costs are the mirror image of its benefits: there is no atomic operation spanning two actors (a transfer between two bank-account actors needs a protocol), message order between different senders is not guaranteed, and a mailbox can grow without bound.

## Futures and async–await

A **future** (or **promise**) is a placeholder for a value that is being computed concurrently and will be available later. Asking for the value — `result()`, `await`, `force` — blocks until it is ready. Futures were proposed by Henry Baker and Carl Hewitt (1977) and, as "promises", by Daniel Friedman and David Wise (1976); Barbara Liskov and Liuba Shrira's "Promises" (1988) added them to a language for distributed calls. A future is the concurrent cousin of the thunk of call-by-need ([[programming-languages/scope-binding]]): a delayed computation evaluated once, but *eagerly and in parallel* rather than on demand.

```python
from concurrent.futures import ThreadPoolExecutor
import time

def slow_square(x):
    time.sleep(0.2); return x * x

with ThreadPoolExecutor(max_workers=4) as pool:
    t = time.perf_counter()
    futs = [pool.submit(slow_square, x) for x in range(4)]   # start all four
    print([f.result() for f in futs], f"{time.perf_counter() - t:.1f}s")
```

```console
[0, 1, 4, 9] 0.2s
```

Four calls of $0.2$ s each finish in $0.2$ s, because they wait concurrently. (They wait in `sleep`, which releases Python's global interpreter lock; CPU-bound Python threads run in parallel only on the free-threaded builds available since Python 3.13, as of 2026.)

**Async–await** builds on futures and on the coroutines of [[programming-languages/control]]. An `async def` function is a coroutine; `await f` suspends it until the future or coroutine `f` completes, returning control to an **event loop**, which runs other ready coroutines in the meantime and resumes the suspended one when its result arrives. All of this happens on *one* thread: concurrency without parallelism, used for programs that spend their time waiting for the network or the disk.

::: example Concurrent waiting with asyncio {#ex-asyncio}
Start three simulated network requests taking $0.3$, $0.1$ and $0.2$ seconds and wait for all of them.
::: solution
```python
import asyncio, time

async def fetch(name, delay):
    print(f"{name}: start")
    await asyncio.sleep(delay)          # suspend; the event loop runs other tasks
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

All three start before any finishes; they complete in order of their delays; the total is the longest delay, $0.3$ s, not the sum $0.6$ s. `gather` returns the results in the order of its arguments, not of completion. Interleaving happens only at `await` points, so code between two `await`s runs atomically with respect to other coroutines — a much smaller set of interleavings than with threads, which is the main reason async code is easier to get right. The flip side: a coroutine that computes for a long time without awaiting blocks every other task.
:::
:::

::: warning async is not parallel, and await is contagious
`async`/`await` in Python and JavaScript runs on one thread: it overlaps *waiting*, not computation, and a CPU-heavy coroutine stalls the whole event loop. Because only a coroutine can `await`, a function that calls an async function must usually become async itself, and so on up the call chain — Bob Nystrom's "What color is your function?" (2015) named this the **function colouring** problem. Calling a blocking function (`time.sleep`, a synchronous database driver) inside a coroutine silently blocks every other task. Languages differ: Go hides the distinction with cheap threads (goroutines) scheduled by its runtime, and Java 21 (2023) added virtual threads for the same reason.
:::

## Types for concurrency

Data races are a property of programs that a type system can rule out, much as [[programming-languages/type-systems]] rules out stuck states. Rust does so with two ingredients we have met. **Ownership and borrowing** ([[programming-languages/scope-binding]]) allow either one mutable reference or any number of shared read-only references to a value at a time — exactly the condition that excludes conflicting accesses. And two marker traits record which types may cross threads: `Send` (ownership may be transferred to another thread) and `Sync` (shared references may be used from several threads). The compiler infers them structurally; a type such as `Rc<T>`, whose reference count is updated non-atomically, is neither.

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let count = Arc::new(Mutex::new(0));          // atomically counted, locked
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

The only way to reach the counter is through `lock()`, which returns a guard that releases the mutex when it goes out of scope: forgetting the lock is a type error, not a race. Trying to share a plain variable mutably between two threads, or to send an `Rc` to another thread, is rejected (rustc 1.95, as of 2026; excerpts of the two error messages):

```console
error[E0499]: cannot borrow `count` as mutable more than once at a time
5 |         s.spawn(|| count += 1);       // two threads both want to mutate count
  |                 -- first mutable borrow occurs here
6 |         s.spawn(|| count += 1);
  |                 ^^ second mutable borrow occurs here
error[E0277]: `Rc<i32>` cannot be sent between threads safely
```

Rust's guarantee is freedom from data races, hence, by [[#thm-drf-sc]], sequential consistency for safe code; it does not prevent deadlocks or higher-level race conditions (two correctly locked operations whose combination is not atomic). Other type-based approaches include session types, which describe communication protocols on channels, and the region and effect systems of research languages.

For shared objects built without a single lock — concurrent queues, hash maps, counters — the standard correctness criterion is **linearisability** (Herlihy and Wing, 1990): every operation appears to take effect instantaneously at some point between its invocation and its response, so that the history of operations is equivalent to a sequential one that respects real-time order. It is SC lifted from memory locations to objects, and it is what `java.util.concurrent` and similar libraries promise.

::: history
Edsger Dijkstra's "Solution of a problem in concurrent programming control" (1965) solved mutual exclusion and introduced the critical section, and his semaphores and the dining philosophers followed; Coffman, Elphick and Shoshani (1971) gave the conditions for deadlock. Per Brinch Hansen and Tony Hoare introduced monitors (1973–1974). Hewitt, Bishop and Steiger proposed actors in 1973; Gilles Kahn's process networks appeared in 1974; Hoare's "Communicating sequential processes" (*CACM*, 1978) and Milner's CCS (1980) founded process algebra. Leslie Lamport defined sequential consistency in "How to make a multiprocessor computer that correctly executes multiprocess programs" (1979). Sarita Adve and Mark Hill's "Weak ordering — a new definition" (1990) introduced the data-race-free contract, adopted by Java (2005) and C++11 (2011). Futures came from Baker and Hewitt (1977) and Friedman and Wise (1976); Erlang was developed at Ericsson from 1986; async–await appeared in F# (2007) and C# 5.0 (2012), then in Python 3.5 (PEP 492, 2015) and JavaScript (ES2017).
:::

## Where this leads

Operating systems implement threads, scheduling and the primitive synchronisation underlying locks ([[operating-systems]]); databases provide transactions, which make whole groups of operations atomic and isolated ([[databases]]); distributed systems face message passing with failures, delays and no shared clock ([[distributed-systems]]); and parallel computing studies how to make concurrent programs fast ([[parallel-computing]]). The semantic tools of this course — small-step rules, type systems, continuations — are the ones used to define and verify all of them.

::: summary
- The shared-memory model is given meaning by **interleavings** ([[#def-interleaving]]); their number grows as a binomial coefficient ([[#thm-interleavings]]), so testing cannot cover them.
- A **data race** is a pair of unsynchronised conflicting accesses ([[#def-data-race]]); locks make critical sections atomic but can **deadlock** ([[#def-deadlock]]), which a global lock order prevents ([[#thm-lock-order]]).
- Hardware and compilers are not **sequentially consistent** ([[#def-sc]]): x86 store buffers produce outcomes no interleaving allows. Languages promise **SC for data-race-free programs** ([[#thm-drf-sc]]).
- **Message passing** shares nothing: CSP channels synchronise sender and receiver; **actors** ([[#def-actor]]) process asynchronous messages one at a time and have no data races by construction. Deadlock remains possible.
- A **future** is a value computed concurrently; **async–await** suspends coroutines at `await` points on a single-threaded event loop, overlapping waits, not computation.
- Type systems can exclude data races: Rust's ownership, borrowing and `Send`/`Sync` make them compile-time errors.
:::

## Exercises

::: exercise Counting schedules {level=1 check="15"}
How many interleavings do two threads with $4$ and $2$ actions have? (Enter the number.)
::: solution
By [[#thm-interleavings]], $\binom{6}{2} = 15$: choose which $2$ of the $6$ positions belong to the second thread.
:::
:::

::: exercise Three incrementing threads {level=2 check="1680"}
Three threads each run `load x; add 1; store x` from `x = 0`. How many interleavings are there, and which final values of `x` are possible? (Enter the number of interleavings.)
::: solution
The multinomial coefficient $9! / (3!\,3!\,3!) = 362880 / 216 = 1680$. Final values: $1$, $2$ or $3$. All three are possible: $3$ when the threads run one after another; $1$ when all three load $0$ before any stores; $2$, for example, when A and B overlap but C runs after both. Extending the enumerator to three threads gives $\{3: 6, 2: 270, 1: 1404\}$, totalling $1680$ — only the $3! = 6$ serial orders give the correct answer.
:::
:::

::: exercise Where are the races? {level=1}
In the following Python fragment, threads run `worker` concurrently. Which shared accesses race, and how would you fix the program without changing its result? `total = 0; seen = set()` / `def worker(items): global total; for x in items: if x not in seen: seen.add(x); total += x`.
::: solution
`seen` is read (`x not in seen`) and written (`seen.add`) by several threads, and `total` is read and written by `total += x`: both are races. Even if each individual operation were atomic, the check-then-act sequence "test membership, then add" is not, so two threads can both find `x` absent and both add it to `total` — a race condition at a higher level than a data race. Fix: protect the whole test-and-update with one lock, `with lock: if x not in seen: seen.add(x); total += x`; or avoid sharing — each worker builds its own set and the main thread merges them, which also gives the same total.
:::
:::

::: exercise Dining philosophers {level=2}
Five philosophers sit at a round table with a fork between each pair. Philosopher $i$ ($0 \le i \le 4$) needs forks $i$ and $(i + 1) \bmod 5$. (a) Show that "pick up the left fork $i$, then the right fork" can deadlock. (b) Apply [[#thm-lock-order]]: what does philosopher $4$ do differently, and why is there no deadlock?
::: solution
(a) If all five pick up their left forks at the same moment, every fork is held and each philosopher waits for the right fork, held by the neighbour: the wait-for graph is the cycle $0 \to 1 \to 2 \to 3 \to 4 \to 0$. (b) Order the forks by number and require each philosopher to take the lower-numbered fork first. Philosophers $0$ to $3$ take fork $i$ then $i + 1$ as before, but philosopher $4$ needs forks $4$ and $0$ and must take fork $0$ first. Every thread now acquires forks in increasing order, so by the theorem no cycle of waiting can form. Concretely, philosophers $0$ and $4$ compete for fork $0$; whichever loses waits without holding anything, so fork $4$ stays free for philosopher $3$, who can eat, and the chain unblocks.
:::
:::

::: exercise SC by hand {level=2}
For the program A: $x := 1;\ r_1 := y$ and B: $y := 1;\ r_2 := x$ (initially $x = y = 0$), list the six SC interleavings and their outcomes $(r_1, r_2)$, and explain in terms of store buffers how $(0, 0)$ arises on x86.
::: solution
Writing $a_1, a_2$ for A's actions and $b_1, b_2$ for B's: $a_1 a_2 b_1 b_2 \mapsto (0, 1)$; $a_1 b_1 a_2 b_2 \mapsto (1, 1)$; $a_1 b_1 b_2 a_2 \mapsto (1, 1)$; $b_1 a_1 a_2 b_2 \mapsto (1, 1)$; $b_1 a_1 b_2 a_2 \mapsto (1, 1)$; $b_1 b_2 a_1 a_2 \mapsto (1, 0)$. So SC allows $(0,1)$, $(1,0)$, $(1,1)$, never $(0,0)$. On x86, A's store $x := 1$ goes into A's store buffer and A proceeds to load $y$ from memory, still $0$; simultaneously B buffers $y := 1$ and loads $x$, still $0$; only then do the buffers drain. Each thread sees its own store (store forwarding) but not the other's, so the effective order is "both loads before both stores", which violates program order in each thread — the relaxation TSO permits.
:::
:::

::: exercise Channels and deadlock {level=2}
Two goroutine-like threads communicate over two *unbuffered* channels `c` and `d` (a send blocks until a receiver takes the value). Thread P runs `c.send(1); x = d.receive()`; thread Q runs `d.send(2); y = c.receive()`. Does the program deadlock? What if Q's two operations are swapped, or if the channels have capacity $1$?
::: solution
As written, P blocks in `c.send(1)` until someone receives on `c`, and Q blocks in `d.send(2)` until someone receives on `d`; neither reaches its receive: deadlock (each waits for the other — a cycle). If Q runs `y = c.receive(); d.send(2)`, P's send meets Q's receive, then Q's send meets P's receive: no deadlock. With capacity-$1$ channels both sends complete immediately into the buffers, and both receives then find a value: no deadlock either. Buffering hides the dependency; it does not remove it — with more messages than buffer space, the original pattern deadlocks again.
:::
:::

::: exercise A lock in the enumerator {level=3}
Extend the interleaving enumerator with `acq` and `rel` actions on a single lock: `acq` may be taken only when the lock is free. Verify that with `acq; load; add; store; rel` in both threads, every execution ends with $x = 2$, and count the executions. Explain why the count is not $\binom{10}{5}$.
::: solution
Explore the state space recursively instead of enumerating merges blindly, because which actions are enabled depends on the lock:

```python
def explore(threads):
    finals = Counter()
    def go(pcs, mem, regs, holder):
        progressed = False
        for t, prog in enumerate(threads):
            if pcs[t] == len(prog): continue
            op = prog[pcs[t]]
            if op == "acq" and holder is not None: continue        # blocked
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

Without the lock it reproduces the $20$ executions of [[#ex-lost-update]]. With the lock there are only $2$ executions, both giving $2$. Of the $\binom{10}{5} = 252$ merges of the two action sequences, all but two place one thread's `acq` between the other's `acq` and `rel`, which the lock forbids; once a thread acquires the lock, the other cannot take any action until the release (its next action is its own `acq`), so the threads' critical sections run back to back. The lock reduces the reachable state space to the serial executions.
:::
:::

::: exercise Is this history linearisable? {level=3}
A shared register initially holds $0$. Thread A calls `write(1)`, invoked at time $1$ and returning at time $4$. Thread B calls `read()` invoked at $2$, returning $1$ at time $3$, then `read()` invoked at $5$ returning $0$ at time $6$. Is the history linearisable? What if B's second read returned $1$?
::: solution
Linearisability requires choosing a point inside each operation's interval so that the resulting sequential history is legal for a register. B's first read returns $1$, so its point must come after the point of `write(1)`; both intervals allow that (write at, say, $2.5$, read at $2.7$). B's second read, at a point in $[5, 6]$, comes after the write's point in every choice (the write's interval ends at $4$), and no other write exists, so a legal sequential register would return $1$, not $0$. The history is **not** linearisable — the register "forgot" a write that had completed. If the second read returned $1$, the sequence write $\to$ read $\to$ read with points $2.5, 2.7, 5.5$ is legal and respects real-time order: linearisable. The first history is not even sequentially consistent: SC must respect B's program order, and no interleaving of a single `write(1)` with two reads in order can make them return $1$ and then $0$. The two criteria differ on histories in which operations of *different* threads are ordered in real time (one returns before the other is invoked) — linearisability must respect that order, SC need not.
:::
:::
