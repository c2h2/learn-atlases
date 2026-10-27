The test machine for this course has 160 GiB of memory, and a process on it can ask for a terabyte with a single `mmap` call — and get it. Nothing is allocated at that moment. Only when the program first touches a page does the kernel find a frame for it; and if memory runs out, the kernel quietly writes some page that has not been used recently to disk and reuses its frame. The program sees one large, uniform memory. That memory is an illusion stitched together from DRAM, the disk and a stream of **page faults**, and whether the illusion is fast or catastrophically slow depends on one decision made thousands of times a second: *which page should leave memory to make room?*

[[operating-systems/address-spaces-paging]] built the mechanism — page tables with a present bit, and a fault when it is clear. This chapter uses it. We see how the kernel handles a page fault and what demand paging and copy-on-write cost, measured in faults; then we study **replacement policies**: the optimal one (which needs to know the future), FIFO and its strange anomaly, LRU and the property that rules the anomaly out, and the clock algorithm that real kernels use to approximate LRU. Finally we look at what happens when the pages in active use do not fit at all — **thrashing** — and at the working-set model that explains and prevents it.

## Demand paging

::: definition Demand paging {#def-demand-paging}
In **demand paging** a page is brought into physical memory only when it is first referenced. A page-table entry whose present bit is clear may describe a page that is *valid but not resident* — never yet touched, or moved to **backing store** (a swap area or the file it maps) — and the kernel keeps, for every region of the address space, enough information to find or create its contents. A reference to such a page causes a **page fault**, which the kernel resolves by loading the page and retrying the instruction. A fault that needs no I/O (the page is zero-filled, or already in memory in the page cache) is a **minor fault**; one that must read from disk is a **major fault**.
:::

::: algorithm Handling a page fault {#alg-fault}
On a page fault at virtual address $\text{va}$ (the processor supplies $\text{va}$ — in `%cr2` on x86-64 — and whether the access was a read, write or fetch, from user or kernel mode):

1. Find the region of the address space containing $\text{va}$. If there is none, or the region forbids the access, the reference is invalid: send the process `SIGSEGV` and stop.
2. Obtain a free frame. If none is free, choose a victim page with the **replacement policy**; if the victim is dirty, write it to backing store; clear the present bit in its PTE (and invalidate it in the TLBs).
3. Fill the frame: with zeros for a new anonymous page; by reading from swap or from the mapped file otherwise (the process blocks during the I/O and another process runs).
4. Update the PTE: set the PFN, the present bit and the permissions.
5. Return from the exception; the faulting instruction is re-executed and now succeeds.
:::

Demand paging explains several everyday facts. A program starts quickly even if it is large, because only the pages it actually executes are read. `malloc` of a gigabyte is instantaneous. And `fork` is cheap even for a big process, because of **copy-on-write**: the child receives a copy of the parent's page tables in which every writable private page is marked read-only in *both* processes; the first write by either one faults, and only then does the kernel copy that single page and make both copies writable.

The C library reports a process's fault counts through `getrusage`. The following program touches 10,000 pages, touches them again, then forks a child that reads all of them and writes half:

```c
#define _DEFAULT_SOURCE                       /* MAP_ANONYMOUS, getrusage */
#include <stdio.h>
#include <sys/mman.h>
#include <sys/resource.h>
#include <sys/wait.h>
#include <unistd.h>

static long minflt(void) {                    /* minor page faults so far */
    struct rusage u;
    getrusage(RUSAGE_SELF, &u);
    return u.ru_minflt;
}

int main(void) {
    enum { PAGES = 10000, PG = 4096 };
    char *a = mmap(NULL, (size_t)PAGES * PG, PROT_READ | PROT_WRITE,
                   MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
    if (a == MAP_FAILED) return 1;
    madvise(a, (size_t)PAGES * PG, MADV_NOHUGEPAGE);   /* keep 4 KiB pages */
    long f0 = minflt();
    for (long i = 0; i < PAGES; i++) a[i * PG] = 1;     /* first touch of each page */
    long f1 = minflt();
    for (long i = 0; i < PAGES; i++) a[i * PG] = 2;     /* second touch */
    long f2 = minflt();
    printf("first touch: %ld faults, second touch: %ld faults\n", f1 - f0, f2 - f1);
    fflush(stdout);                                     /* before fork: no duplicate output */
    pid_t pid = fork();
    if (pid == 0) {                                     /* child shares pages copy-on-write */
        long g0 = minflt();
        long sum = 0;
        for (long i = 0; i < PAGES; i++) sum += a[i * PG];          /* reads */
        long g1 = minflt();
        for (long i = 0; i < PAGES / 2; i++) a[i * PG] = 3;         /* writes to half */
        long g2 = minflt();
        printf("child: reading all: %ld faults, writing half: %ld faults (sum %ld)\n",
               g1 - g0, g2 - g1, sum);
        fflush(stdout);
        _exit(0);
    }
    waitpid(pid, NULL, 0);
    printf("parent still sees a[0] = %d\n", a[0]);
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -O2 -o faults faults.c && ./faults
first touch: 10000 faults, second touch: 0 faults
child: reading all: 1 faults, writing half: 5000 faults (sum 20000)
parent still sees a[0] = 2
```

Each first touch is one minor fault, in which the kernel allocates a zeroed frame; the second pass finds every page present. In the child, reading the shared pages costs nothing (the single fault is almost certainly the child's first write to its own stack, whose page is also shared copy-on-write) — but each of the $5000$ writes to a shared page faults and copies it. The parent's page is untouched: `a[0]` is still $2$.

### The cost of a fault

::: theorem Effective access time with page faults {#thm-eat-fault}
Let a memory reference that does not fault take time $m$, a page fault take time $F$ in total (trap, handling, I/O and restart), and let a fraction $p$ of references fault. Then the effective access time is

$$
\text{EAT} = (1 - p)\,m + p\,F .
$$ {#eq-eat-fault}

To keep the slowdown below a factor $1 + \delta$, the fault rate must satisfy $p < \delta m / (F - m)$.
:::

::: proof
The first formula averages the two cases. $\text{EAT} < (1+\delta) m$ means $m + p(F - m) < m + \delta m$, that is $p < \delta m/(F - m)$.
:::

The trouble is the size of $F$. A minor fault costs a microsecond or so. A major fault from a hard disk costs a seek and a rotation, around $8$ ms ([[operating-systems/storage-io]]), and from an SSD perhaps $100$ µs. Against a $100$ ns memory reference these are factors of $80{,}000$ and $1{,}000$.

::: example How rare must major faults be? {#ex-fault-rate}
Memory references take $100$ ns, and major faults $8$ ms (hard disk) or $100$ µs (SSD). What fault rate keeps the slowdown below $10\%$ in each case?
::: solution
By [[#thm-eat-fault]] with $\delta = 0.1$: for the disk, $p < 0.1 \times 100 / (8 \times 10^6 - 100) \approx 1.25 \times 10^{-6}$ — at most one fault in $800{,}000$ references. For the SSD, $p < 10 / (10^5 - 100) \approx 1.0 \times 10^{-4}$, one in $10{,}000$. A program that executes $10^9$ references per second can afford about $1250$ major faults per second from a disk, or $10^5$ from an SSD. This is why a machine that has started swapping to a hard disk seems to stop: its fault rate is far above the threshold, and every process spends almost all its time waiting.
:::
:::

::: widget plot
f: (1 - x)*0.1 + x*F
x: 0, 0.0001
y: 0, 1
sliders: F=8000:100:8000:100
labels: \text{EAT (µs)}
points: 0.00001,0.18
caption: Effective access time in microseconds against the fault rate $p$ (from $0$ to $10^{-4}$), with $m = 0.1$ µs and a fault time of $F$ µs: $8000$ for a hard disk, down to $100$ for an SSD. With the disk, the dot shows that one fault in $100{,}000$ references makes memory $1.8$ times slower on average, and at $p = 10^{-4}$ it is nine times slower. Drag $F$ down to $100$ and the line becomes almost flat: a faster backing store raises the tolerable fault rate in proportion.
:::

## Replacement policies

When a fault finds no free frame, the kernel must evict a resident page. The choice matters only through its effect on *future* faults. We study it on **reference strings** — the sequence of page numbers referenced, with consecutive repetitions of the same page removed, since they cannot fault — and count faults with a fixed number $k$ of frames, starting empty. The first reference to each page is a **compulsory** fault under any policy.

Our running example is the reference string

$$
4,\ 2,\ 5,\ 2,\ 3,\ 4,\ 2,\ 5,\ 4,\ 3,\ 4,\ 1
$$

with $k = 3$ frames. It touches five distinct pages, so every policy has at least $5$ faults. All counts below were computed by a Python simulator of each policy (the exercises ask you to write one) and checked by hand.

### The optimal policy

::: definition The optimal policy (MIN) {#def-opt}
The **optimal** replacement policy, **OPT** or **MIN**, evicts the resident page whose next reference lies farthest in the future (a page never referenced again counts as infinitely far).
:::

On the running example, the first three references fill the frames with $4, 2, 5$, and $2$ hits. At the reference to $3$, the next uses of the resident pages are: $4$ at position $6$, $2$ at $7$, $5$ at $8$; OPT evicts $5$. Then $4$ and $2$ hit. At the reference to $5$ (position $8$) the frames hold $2, 3, 4$, whose next uses are: $2$ never, $3$ at $10$, $4$ at $9$; OPT evicts $2$. Then $4$, $3$ and $4$ hit, and the final $1$ faults (nothing is used again, so any victim will do). Total: $6$ faults — the five compulsory ones and one more.

::: theorem OPT is optimal {#thm-opt}
For every reference string and every number of frames $k$, no replacement policy (even one that knows the future, and even one that evicts pages without being forced to) incurs fewer faults than OPT.
:::

::: proof
Fix the string $r_1 r_2 \dots r_n$ and $k$. We may restrict attention to **demand** policies, which load a page only when it is referenced and missing and evict only when they must: any policy can be converted into a demand policy with no more faults, by postponing each load until the page is referenced (and then evicting whatever the original policy would have evicted before, if it is still needed). Let $A$ be any demand policy. We show: if $A$ makes the same decisions as OPT on the first $i$ references, there is a demand policy $A'$ that makes the same decisions as OPT on the first $i+1$ references and has no more faults than $A$. Applying this $n$ times turns $A$ into OPT without increasing the number of faults, which proves the theorem.

At reference $i + 1$ both policies have the same frames. If it hits, or both evict the same page, let $A' = A$. Otherwise OPT evicts $p$ and $A$ evicts $q \ne p$. Let $A'$ evict $p$. Now $A'$ holds $q$ but not $p$, and $A$ holds $p$ but not $q$; otherwise their frames are the same. Thereafter $A'$ copies $A$'s choices, with $p$ and $q$ trading roles, until the two memories become equal:

- A reference to a page other than $p$ and $q$ hits or faults in both. If $A$ evicts $p$, let $A'$ evict $q$: the memories are now equal. Otherwise $A'$ evicts the same page as $A$.
- Because OPT chose $p$, the next reference to $q$ comes before the next reference to $p$ (or $p$ is never referenced again). At that reference to $q$, $A$ faults and $A'$ hits. If $A$ evicts $p$ to load $q$, the memories are equal and $A'$ has one fault fewer than $A$. If $A$ evicts some other page $x$, the memories now differ in that $A'$ holds $x$ instead of $p$; $A'$ is one fault ahead, and we continue in the same way with $x$ in place of $q$.
- If $p$ is referenced while $A'$ is still one fault ahead, $A$ hits and $A'$ faults; $A'$ evicts the page it holds in place of $p$, and the memories become equal, with the two policies level.

In every case, when the memories become equal (or the string ends), $A'$ has made no more faults than $A$; from then on let $A'$ copy $A$ exactly. So $A'$ agrees with OPT on the first $i + 1$ references and has at most as many faults as $A$.
:::

OPT cannot be implemented in a kernel, which does not know future references. Its value is as a yardstick: a policy within a few per cent of OPT on realistic traces cannot be improved much. (It *can* be implemented in a simulator, given a recorded trace, which is how policies are compared.)

### First in, first out, and Bélády's anomaly

::: definition FIFO replacement {#def-fifo}
**FIFO** replacement evicts the page that has been resident longest, keeping resident pages in a queue in order of arrival.
:::

FIFO is simple and needs no information about use. On the running example: $4, 2, 5$ fill the frames and $2$ hits; $3$ evicts the oldest, $4$; then $4$ evicts $2$, $2$ evicts $5$, $5$ evicts $3$ — each fault evicting exactly the page that will be needed soonest; $4$ hits; $3$ evicts $4$, $4$ evicts $2$, and $1$ evicts $5$. Total: $10$ faults out of $12$ references. FIFO evicts a page because it is old, even if it is used constantly.

Worse, FIFO can behave *perversely*: giving it more memory can make it fault more. On the string

$$
1,\ 2,\ 3,\ 4,\ 1,\ 2,\ 5,\ 1,\ 2,\ 3,\ 4,\ 5
$$

FIFO makes these numbers of faults with $k$ frames:

| frames $k$ | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| FIFO | 12 | 12 | 9 | **10** | 5 |
| LRU | 12 | 12 | 10 | 8 | 5 |
| OPT | 12 | 9 | 7 | 6 | 5 |

With $3$ frames FIFO faults $9$ times, with $4$ frames $10$ times. This is **Bélády's anomaly**, found by László Bélády, R. A. Nelson and G. S. Shedler in 1969. The table also shows that LRU and OPT are well behaved; the next section explains why.

::: example Tracing the anomaly {#ex-belady}
Trace FIFO on the string above with $3$ and with $4$ frames, and find the first reference at which the larger memory does worse.
::: solution
With $3$ frames (queue shown oldest first; F marks a fault):

| ref | 1 | 2 | 3 | 4 | 1 | 2 | 5 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| queue | 1 | 1 2 | 1 2 3 | 2 3 4 | 3 4 1 | 4 1 2 | 1 2 5 | 1 2 5 | 1 2 5 | 2 5 3 | 5 3 4 | 5 3 4 |
| fault | F | F | F | F | F | F | F | | | F | F | |

$9$ faults. With $4$ frames:

| ref | 1 | 2 | 3 | 4 | 1 | 2 | 5 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| queue | 1 | 1 2 | 1 2 3 | 1 2 3 4 | 1 2 3 4 | 1 2 3 4 | 2 3 4 5 | 3 4 5 1 | 4 5 1 2 | 5 1 2 3 | 1 2 3 4 | 2 3 4 5 |
| fault | F | F | F | F | | | F | F | F | F | F | F |

$10$ faults. The larger memory first does worse at the reference to $1$ in position $8$: with $3$ frames, the earlier faults on $1$ and $2$ (positions $5$ and $6$) re-inserted them at the back of the queue, so they survived the eviction for $5$; with $4$ frames those references hit, $1$ and $2$ stayed at the front of the queue, and the fault on $5$ evicted $1$, which was needed next. After position $7$ the two memories hold different sets — $\{1, 2, 5\}$ is *not* a subset of $\{2, 3, 4, 5\}$ — and that is the root of the anomaly.
:::
:::

### Least recently used, and stack algorithms

The principle of locality ([[computer-systems/memory-hierarchy#def-locality]]) suggests using the past as a guide to the future: a page used recently will probably be used again soon.

::: definition LRU replacement {#def-lru}
**LRU** (least recently used) replacement evicts the resident page whose most recent reference is oldest.
:::

LRU is OPT with time reversed: OPT looks forward for the farthest next use, LRU looks backward for the farthest last use. On the running example, with the resident pages listed from least to most recently used: $4, 2, 5$ fault; $2$ hits (order $4, 5, 2$); $3$ evicts $4$; $4$ evicts $5$; $2$ hits; $5$ evicts $3$; $4$ hits; $3$ evicts $2$; $4$ hits; and $1$ evicts $5$. Total: $8$ faults — between OPT's $6$ and FIFO's $10$.

Why does LRU have no anomaly? Because the pages it keeps with $k$ frames are always among those it keeps with $k + 1$.

::: definition Stack algorithm {#def-stack}
Let $M_k(t)$ be the set of pages resident after reference $t$ when a policy runs with $k$ frames. The policy is a **stack algorithm** (has the **inclusion property**) if $M_k(t) \subseteq M_{k+1}(t)$ for every reference string, every $t$ and every $k$.
:::

::: theorem Stack algorithms have no anomaly {#thm-stack}
(a) For a stack algorithm, the number of faults on any reference string is a non-increasing function of $k$. (b) LRU is a stack algorithm, and so is OPT. (c) FIFO is not.
:::

::: proof
(a) If reference $t + 1$ to page $r$ hits with $k$ frames, then $r \in M_k(t) \subseteq M_{k+1}(t)$, so it hits with $k + 1$ frames. Hence the set of references that fault with $k + 1$ frames is contained in the set that fault with $k$ frames, and the count cannot be larger.

(b) For LRU, $M_k(t)$ is exactly the set of the $k$ most recently referenced distinct pages up to time $t$ (or all pages referenced so far, if fewer than $k$). Proof by induction on $t$: on a hit the referenced page becomes most recent and the set is unchanged; on a fault with all frames full, the new page joins and the least recently used page — the $(k+1)$-th most recent after the reference — leaves. The $k$ most recent pages are always among the $k + 1$ most recent, so $M_k(t) \subseteq M_{k+1}(t)$. For OPT the same argument works with "the $k$ resident pages whose next references are soonest" in place of "most recent", provided ties are broken consistently; we omit the details (they are in Mattson et al., 1970).

(c) In [[#ex-belady]], after reference $7$ FIFO holds $M_3 = \{1, 2, 5\}$ and $M_4 = \{2, 3, 4, 5\}$, and $1 \notin M_4$.
:::

The name comes from the observation of Richard Mattson and colleagues at IBM (1970) that for a stack algorithm all memory sizes can be simulated in one pass, by keeping the pages in a single ordered list — a stack — in which memory of size $k$ holds the top $k$ entries. For LRU the stack is ordered by recency, and a reference at depth $d$ in it hits for every $k \ge d$. One pass over a trace thus gives the fault count for every memory size at once.

::: warning "LRU is always the best practical policy"
LRU is good when the recent past predicts the near future, but some access patterns defeat it completely. A program that loops over $50$ pages with $49$ frames faults on *every* reference under LRU (and FIFO and clock): each page is evicted just before it is needed again. A random policy does far better — in a simulation of $20$ passes of such a loop ($1000$ references), random replacement averaged $87$ faults over ten seeds, and OPT needed $69$, against LRU's $1000$. Sequential scans larger than memory are the classic case, and they are common: copying a large file, a database scanning a table, a backup. Real systems therefore detect scans (Linux's page cache puts newly read pages on an *inactive* list and promotes them only on a second use), let programs advise the kernel (`madvise(MADV_SEQUENTIAL)`, `posix_fadvise`), or use policies such as ARC and 2Q that resist scans.
:::

::: quiz
Which statements about replacement policies are true?
- [x] Under any policy, a reference string touching $d$ distinct pages causes at least $d$ faults.
- [ ] FIFO always makes at least as many faults as LRU.
- [x] Under LRU, adding a frame can never increase the number of faults.
- [x] OPT makes at most as many faults as LRU on every reference string.
::: solution
The first reference to each page is compulsory. FIFO can beat LRU: on Bélády's string with $3$ frames, FIFO makes $9$ faults and LRU $10$ (see the table above). LRU is a stack algorithm ([[#thm-stack]]), so it has no anomaly, and OPT is optimal ([[#thm-opt]]).
:::
:::

## Approximating LRU: the clock algorithm

Exact LRU needs to update a recency order on *every memory reference* — billions per second — which no hardware does for pages. What the hardware does provide is the **accessed** bit (also called the reference or use bit) in each PTE, set whenever the page is referenced ([[operating-systems/address-spaces-paging#def-paging]]). The kernel can read and clear it. One bit per page cannot give a full order, but it can tell recently used pages from others.

::: algorithm Clock (second-chance) replacement {#alg-clock}
Arrange the frames in a circle with a **hand** pointing at one of them. On a hit, the hardware sets the page's use bit. On a fault:

1. While the page under the hand has its use bit set: clear the bit and advance the hand (the page gets a "second chance").
2. Evict the page under the hand, load the new page into its frame with its use bit set, and advance the hand.
:::

Each pass of the hand clears the bits, so a page survives only if it was used again since the hand last passed — roughly, if it was used in the last revolution. If all bits are set, the hand clears them all in one revolution and evicts the page where it started: clock degenerates to FIFO. If none is set, it evicts the first page it meets.

::: example Clock on the running example {#ex-clock}
Trace the clock algorithm with $3$ frames on $4, 2, 5, 2, 3, 4, 2, 5, 4, 3, 4, 1$.
::: solution
Frames are listed in circular order, with an asterisk marking a set use bit and – an empty frame; the hand column gives the frame the hand points to after the reference.

| ref | frames after | hand after | event |
|---|---|---|---|
| 4 | `4* – –` | 1 | fault, free frame |
| 2 | `4* 2* –` | 2 | fault, free frame |
| 5 | `4* 2* 5*` | 0 | fault, free frame |
| 2 | `4* 2* 5*` | 0 | hit |
| 3 | `3* 2 5` | 1 | fault: clear 4, 2, 5 (all had second chances), evict 4 |
| 4 | `3* 4* 5` | 2 | fault: 2's bit is clear, evict 2 |
| 2 | `3* 4* 2*` | 0 | fault: evict 5 |
| 5 | `5* 4 2` | 1 | fault: clear 3, 4, 2, evict 3 |
| 4 | `5* 4* 2` | 1 | hit, set 4's bit |
| 3 | `5* 4 3*` | 0 | fault: clear 4, evict 2 |
| 4 | `5* 4* 3*` | 0 | hit |
| 1 | `1* 4 3` | 1 | fault: clear 5, 4, 3, evict 5 |

Total: $9$ faults — between LRU's $8$ and FIFO's $10$. The hit on $2$ at the fourth reference saved nothing, because every page had a set bit when the hand first moved; at the reference to $3$ in position $10$, by contrast, $4$'s second chance kept it in memory for the next reference.
:::
:::

Real kernels refine clock. The **enhanced** version also looks at the dirty bit and prefers to evict pages that are both unused and clean, since a dirty victim must be written to disk first. Some keep a small *pool of free frames* and run the hand in the background (in Linux, the `kswapd` kernel thread) so that a fault rarely has to wait for an eviction. Linux's classical design keeps two lists per memory cgroup and node, *active* and *inactive*, and moves pages between them on second-chance principles; since Linux 6.1 (2022) the **multi-generational LRU** (MGLRU) sorts pages into several generations by age, scanning page tables for accessed bits in bulk. As of 2026 MGLRU is enabled by default in several distributions (on the test machine `/sys/kernel/mm/lru_gen/enabled` reads `0x0007`, all features on).

::: widget plot
f: 1 - x/100
x: 0, 100
y: 0, 1
labels: \text{fault rate with no locality (any policy)}
points: 10,0.694; 20,0.415; 30,0.234; 40,0.159; 50,0.128; 60,0.104; 70,0.077; 80,0.054; 90,0.029
caption: Fault rate against the number of frames $k$ for $100$ pages. The line is a workload with no locality — every reference to a uniformly random page — for which *every* policy that does not know the future has fault rate $1 - k/100$: when nothing predicts the future, replacement policy is irrelevant. The dots are a simulation of LRU on $20{,}000$ references with "80–20" locality: $80\%$ go to $20$ hot pages. Once the hot pages fit ($k \ge 20$) the fault rate collapses. In the same simulation clock was within $0.04$ of LRU at every $k$ and FIFO up to $0.1$ worse: policies matter only when there is locality to exploit.
:::

## Thrashing and the working set

So far the memory was fixed and the reference string given. In a real system many processes compete, and the question becomes how many frames each should have — and whether all should run at once.

::: definition Working set {#def-working-set}
The **working set** $W(t, \tau)$ of a process at time $t$ with window $\tau$ is the set of pages it referenced in the last $\tau$ references (or the last $\tau$ units of its virtual time). Its size $\lvert W(t, \tau)\rvert$ estimates how many frames the process needs to run with few faults.
:::

Peter Denning's **working-set principle** (1968) is: a process should run only if its whole working set can be resident, and no page of a running process's working set should be evicted. When the sum of the working sets of the running processes exceeds physical memory, the system **thrashes**: each process faults, and its fault evicts a page another process is about to use, which faults in turn. Processes spend their time waiting for the disk; CPU utilisation collapses; a scheduler that reacts to low utilisation by admitting *more* processes, as some early systems did, makes it worse. Thrashing was observed on the first multiprogrammed paging systems in the 1960s, and Denning's model was the explanation.

The remedies are to measure and to control. A **page-fault-frequency** policy tracks each process's fault rate: if it is above an upper threshold, the process gets more frames; below a lower threshold, it gives some up; if no frames are available, a process is **suspended** — swapped out entirely — until memory frees up. Linux does not suspend processes; when it cannot reclaim enough memory it invokes the **out-of-memory (OOM) killer**, which terminates the process with the highest "badness" score (roughly, the largest memory use, adjustable through `/proc/<pid>/oom_score_adj`). Many current systems also compress pages in memory before writing them out (`zswap`, `zram`), and many servers run with no swap at all — the test machine has none — preferring an OOM kill to a thrashing machine.

::: example Estimating a working set {#ex-ws}
For the running string $4, 2, 5, 2, 3, 4, 2, 5, 4, 3, 4, 1$, compute the working set $W(t, 4)$ after references $t = 4, 8$ and $12$. Is a $3$-frame memory enough to hold the working set throughout?
::: solution
$W(4, 4)$ covers references $1$–$4$: $4, 2, 5, 2$, so $\{2, 4, 5\}$, size $3$. $W(8, 4)$ covers references $5$–$8$: $3, 4, 2, 5$, so $\{2, 3, 4, 5\}$, size $4$. $W(12, 4)$ covers references $9$–$12$: $4, 3, 4, 1$, so $\{1, 3, 4\}$, size $3$. In the middle of the string the working set has four pages, one more than the three frames — which is why every policy, even OPT, faults there more than the compulsory five times. Window size matters: with $\tau = 2$ the working sets have at most two pages, and with $\tau = 12$ all five.
:::
:::

::: history
The Atlas computer (Manchester, 1962) had the first paged virtual memory and the first replacement algorithm, a "learning program" that predicted page use from observed loop periods. László Bélády's 1966 *IBM Systems Journal* study of replacement algorithms for virtual storage introduced the optimal algorithm MIN and compared it with FIFO, random and usage-based policies on real traces; with Nelson and Shedler he reported the FIFO anomaly in 1969. Richard Mattson, Jan Gecsei, Donald Slutz and Irving Traiger's 1970 paper defined stack algorithms and the one-pass simulation of all memory sizes. Peter Denning introduced the working-set model in 1968, explaining the thrashing that had plagued early time-sharing systems; Fernando Corbató's 1968 MIT report described the clock-like algorithm used in Multics. Modern refinements include 2Q (1994), ARC (Megiddo and Modha, 2003), used in IBM's storage controllers and in the ZFS file system, and Linux's multi-generational LRU (Yu Zhao, merged in 2022).
:::

## Where this leads

The same policies decide what stays in every cache that software manages: the file-system **page cache** and buffer pools of [[operating-systems/file-systems]] and [[databases]], web caches and content-delivery networks in [[networks]], and caches in distributed systems ([[distributed-systems]]). Hardware caches face the same choice with far less time, and use cheap approximations of LRU ([[computer-systems/memory-hierarchy]]). The analysis of online algorithms against an optimal offline adversary, of which [[#thm-opt]] is the starting point, is a topic of [[algorithms]]: LRU is $k$-competitive, and no deterministic online policy does better.

::: summary
- **Demand paging** loads pages on first reference ([[#def-demand-paging]]); the fault handler ([[#alg-fault]]) checks validity, finds a frame (evicting if needed), fills it and restarts the instruction. Copy-on-write makes `fork` cheap: one fault per page actually written (measured: $5000$ faults for $5000$ writes).
- $\text{EAT} = (1-p)m + pF$ ([[#thm-eat-fault]]); with disk-backed faults of milliseconds, even one fault per million references matters.
- **OPT** evicts the page used farthest in the future and is optimal ([[#thm-opt]]) but needs the future; it is the yardstick for real policies.
- **FIFO** ignores use and suffers **Bélády's anomaly**: more frames, more faults ([[#ex-belady]]). **Stack algorithms** — LRU and OPT — cannot, since memory with $k$ frames is always a subset of memory with $k+1$ ([[#thm-stack]]).
- **LRU** is good with locality but fails on loops and scans larger than memory; the **clock** algorithm approximates it with one accessed bit per page ([[#alg-clock]]); Linux uses active/inactive lists and, since 6.1, MGLRU.
- When the total **working set** exceeds memory, the system **thrashes** ([[#def-working-set]]); remedies are fault-frequency control, suspending processes, or the OOM killer.
:::

## Exercises

::: exercise OPT by hand {level=1 check="4"}
How many faults does OPT make on $1, 2, 3, 1, 2, 3, 4, 1, 2$ with $3$ frames? (Enter the number of faults.)
::: solution
$1, 2, 3$ are compulsory faults, and the following $1, 2, 3$ hit. At $4$ the frames hold $1, 2, 3$, whose next uses are $1$ at position $8$, $2$ at position $9$, and $3$ never: OPT evicts $3$. The final $1$ and $2$ hit. Total $4$ faults — one per distinct page, the minimum possible. (LRU would evict $1$ at the reference to $4$ and then fault on both $1$ and $2$: $6$ faults.)
:::
:::

::: exercise LRU by hand {level=1 check="7"}
How many faults does LRU make on the reference string $1, 2, 3, 4, 2, 1, 5, 6, 2, 1, 2, 3$ with $4$ frames? (Enter the number of faults.)
::: solution
Listing resident pages from least to most recently used: $1, 2, 3, 4$ are compulsory faults (memory $1, 2, 3, 4$). $2$ hits ($1, 3, 4, 2$); $1$ hits ($3, 4, 2, 1$). $5$ faults, evicting $3$ ($4, 2, 1, 5$). $6$ faults, evicting $4$ ($2, 1, 5, 6$). $2$ hits ($1, 5, 6, 2$), $1$ hits ($5, 6, 2, 1$), $2$ hits ($5, 6, 1, 2$). $3$ faults, evicting $5$. Total $4 + 3 = 7$.
:::
:::

::: exercise Fault-rate budget {level=1 check="0.000004"}
Memory references take $200$ ns and a page fault takes $10$ ms. What is the largest fault rate $p$, to one significant figure, for which the effective access time is at most $240$ ns? (Enter $p$.)
::: solution
The allowed slowdown is $\delta = 40/200 = 0.2$. By [[#thm-eat-fault]], $p \le \delta m/(F - m) = 40/(10^7 - 200) \approx 4.0 \times 10^{-6}$: at most four faults per million references.
:::
:::

::: exercise Three policies on one string {level=2 check="7"}
For the reference string $3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5$ and $3$ frames, count the faults under FIFO, LRU and OPT. (Enter the number of faults under OPT.)
::: solution
FIFO (queue oldest first): $3, 1, 4$ fault; $1$ hits; $5$ evicts $3$; $9$ evicts $1$; $2$ evicts $4$; $6$ evicts $5$; $5$ evicts $9$; $3$ evicts $2$; $5$ hits. $9$ faults.

LRU (least recent first): $3, 1, 4$ fault; $1$ hits (order $3, 4, 1$); $5$ evicts $3$; $9$ evicts $4$; $2$ evicts $1$; $6$ evicts $5$; $5$ evicts $9$; $3$ evicts $2$; $5$ hits. $9$ faults.

OPT: $3, 1, 4$ fault; $1$ hits. At $5$, the next uses are $3$ at position $10$ and never for $1$ and $4$: evict $1$ (or $4$). At $9$, frames $3, 4, 5$: $4$ is never used again, evict it. At $2$, frames $3, 5, 9$: evict $9$. At $6$, frames $2, 3, 5$: evict $2$. Then $5$, $3$, $5$ all hit. $7$ faults: six distinct pages are compulsory, plus one. This string has little reuse, so LRU's knowledge of the past is no better than FIFO's.
:::
:::

::: exercise Clock can be anomalous {level=2}
Explain in your own words, using the definition of a stack algorithm, why the clock algorithm can exhibit Bélády's anomaly, and find a reference string on which it does (a short search with a simulator is fine).
::: solution
Clock is not a stack algorithm: its state depends on the position of the hand and on the use bits, which evolve differently for different numbers of frames, so the set resident with $k$ frames need not be contained in the set resident with $k + 1$. When all use bits are set at every fault, clock behaves exactly like FIFO, so any string that makes every resident page be referenced between consecutive faults reproduces FIFO's behaviour. The classic string $1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5$ gives clock $9$ faults with $3$ frames and $10$ with $4$ (the same as FIFO), as a simulator shows:

```python
def clock(refs, k):
    pages, use, hand, faults = [None] * k, [0] * k, 0, 0
    for r in refs:
        if r in pages:
            use[pages.index(r)] = 1
            continue
        faults += 1
        while pages[hand] is not None and use[hand]:
            use[hand] = 0
            hand = (hand + 1) % k
        pages[hand], use[hand] = r, 1
        hand = (hand + 1) % k
    return faults

s = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]
print([clock(s, k) for k in range(1, 6)])
```
```console
$ python3 clock.py
[12, 12, 9, 10, 5]
```
:::
:::

::: exercise A simulator for all policies {level=2}
Write a Python program that computes the number of faults of FIFO, LRU and OPT for a reference string and a number of frames, and use it to reproduce the table of Bélády's string.
::: solution
```python
from collections import OrderedDict, deque

def fifo(refs, k):
    frames, queue, faults = set(), deque(), 0
    for r in refs:
        if r not in frames:
            faults += 1
            if len(frames) == k:
                frames.discard(queue.popleft())   # oldest arrival
            frames.add(r); queue.append(r)
    return faults

def lru(refs, k):
    frames, faults = OrderedDict(), 0             # least recent first
    for r in refs:
        if r in frames:
            frames.move_to_end(r)
        else:
            faults += 1
            if len(frames) == k:
                frames.popitem(last=False)
            frames[r] = True
    return faults

def opt(refs, k):
    frames, faults = set(), 0
    for i, r in enumerate(refs):
        if r in frames:
            continue
        faults += 1
        if len(frames) == k:
            def next_use(p):
                rest = refs[i + 1:]
                return rest.index(p) if p in rest else len(refs)
            frames.discard(max(frames, key=next_use))
        frames.add(r)
    return faults

b = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]
for k in range(1, 6):
    print(k, fifo(b, k), lru(b, k), opt(b, k))
```
```console
$ python3 policies.py
1 12 12 12
2 12 12 9
3 9 10 7
4 10 8 6
5 5 5 5
```
The output matches the table in the text. OPT here takes quadratic time; a production simulator would precompute next-use positions in one backwards pass.
:::
:::

::: exercise LRU on a loop {level=3 check="0"}
A program loops over pages $0, 1, \dots, n$ — that is, $n + 1$ pages — repeatedly, and has $n$ frames. Prove that LRU faults on every reference, and show that OPT, after the first pass, faults only once every $n$ references (hence about once per pass). How many hits does LRU get in total, for any number of passes? (Enter the number of hits.)
::: solution
LRU: we show by induction that just before each reference, the page about to be referenced is the one not resident. On the first pass each reference is a compulsory fault, except that once the $n$ frames are full (after page $n-1$), page $n$ faults and evicts the least recently used page, $0$ — the next one needed. In general, after referencing page $j$ in the loop the resident pages are the $n$ most recent ones, which are all pages except $j + 1 \pmod{n+1}$, the page referenced least recently — and exactly the next one referenced. So every reference faults: $0$ hits. OPT: at a fault, the resident pages are all but the requested one; OPT evicts the page whose next use is farthest, which is the page referenced *just before* the current one (its next use is a whole pass away). After that the next $n - 1$ references are to resident pages, so OPT faults once every $n$ references — the best possible, since $n + 1$ pages cannot fit in $n$ frames.
:::
:::

::: exercise Working sets and thrashing {level=3}
Three processes have working sets of $60$, $50$ and $40$ thousand pages, and memory holds $120$ thousand page frames. (a) Explain what happens if all three run with frames allocated by a global LRU policy. (b) What should a working-set scheduler do? (c) Under that scheduler, if each process runs for one second at a time and a page fault takes $100$ µs from an SSD, estimate the time to load a suspended process's working set when it resumes, and the fraction of time lost if processes swap in every three seconds.
::: solution
(a) The total working set, $150$ thousand pages, exceeds memory by $30$ thousand. Under global LRU every process's least recently used pages are evicted by the others' faults; each process keeps running into the pages that were just taken, and the fault rate rises far above the threshold of [[#thm-eat-fault]]. The system thrashes: processes wait on the SSD and CPU utilisation drops. (b) Run only a set of processes whose working sets fit: for example the first and third ($100$ thousand pages) or the second and third ($90$ thousand), suspending the other and rotating periodically so that none starves. (c) Reloading a $60$-thousand-page working set by demand faults costs about $6 \times 10^4 \times 100$ µs $= 6$ s if the faults are serviced one at a time — longer than the one-second turn. Even at the SSD's internal parallelism of, say, $8$ concurrent reads, it is $0.75$ s, a large fraction of a three-second cycle. This is why real systems avoid frequent whole-process swapping: they prefetch pages in large sequential batches, compress them in memory, or simply buy enough memory that the working sets fit.
:::
:::
