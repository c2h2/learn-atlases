Two loops add up the same sixteen million integers of a $4096 \times 4096$ array. They differ only in the order of the loops:

```c
#define _POSIX_C_SOURCE 199309L   /* for clock_gettime under -std=c17 */
#include <stdio.h>
#include <time.h>

#define N 4096
static int a[N][N];                    /* 64 MiB, far larger than any cache */

static double now(void) {
    struct timespec t;
    clock_gettime(CLOCK_MONOTONIC, &t);
    return t.tv_sec + t.tv_nsec * 1e-9;
}

int main(void) {
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++)
            a[i][j] = i + j;
    long s = 0;
    double t0 = now();
    for (int i = 0; i < N; i++)        /* row by row: stride 1 */
        for (int j = 0; j < N; j++)
            s += a[i][j];
    double t1 = now();
    for (int j = 0; j < N; j++)        /* column by column: stride N */
        for (int i = 0; i < N; i++)
            s += a[i][j];
    double t2 = now();
    printf("sum %ld\nrow-major    %.3f s\ncolumn-major %.3f s\n", s, t1 - t0, t2 - t1);
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -O2 -o rowcol rowcol.c && ./rowcol
sum 137405399040
row-major    0.009 s
column-major 0.049 s
```

The column-by-column loop is more than five times slower (compiled with `-O1`, the gap was $0.011$ s against $0.155$ s, a factor of fourteen). It executes the same number of additions; the asymptotic analysis of [[algorithms]] calls both loops $\Theta(n^2)$. The difference lies entirely in the *order in which memory is touched*, and it comes from the **memory hierarchy**: the fact that a computer's memory is not one uniform array, as [[computer-systems/machine-code]] pretended, but a stack of storage devices of increasing size and decreasing speed, with small, fast **caches** close to the processor holding copies of recently used data.

This chapter explains how caches work and how to write programs that use them well. We start from the speed gap that makes caches necessary and the property of programs, **locality**, that makes them effective. Then we define cache organisation exactly — sets, lines, blocks, tags — and trace caches by hand, derive the average memory access time, and analyse loop nests by counting misses. The same ideas, one level further down, explain virtual memory.

All timings in this chapter are **observations** on one machine — an Intel Xeon E5-2696 v3 (Haswell, 2014) with 32 KiB 8-way L1 data caches, 256 KiB L2 caches, a shared 45 MiB L3 and 64-byte lines, running Linux — compiled with GCC 15.2. Other machines give different numbers and the same lessons.

## The memory gap

A processor can start several instructions per nanosecond, but fetching a value from main memory takes around a hundred nanoseconds. The gap is a consequence of physics and economics. Fast memory (**SRAM**, static RAM, six transistors per bit) is expensive per bit and must be physically close to the processor to be fast; capacious memory (**DRAM**, dynamic RAM, one transistor and a capacitor per bit) is cheap but slower, and lives on separate chips. Persistent storage (flash memory in **SSDs**, magnetic disks) is cheaper again and slower by orders of magnitude. Since the 1980s processor speed improved much faster than DRAM latency, so the gap widened — the "memory wall".

Typical figures, as of 2026, for a desktop or server processor (orders of magnitude only; they vary by a factor of two or more between machines):

| level | typical size | typical latency | in cycles at ~3 GHz |
|---|---|---|---|
| registers | ~1 KiB | < 0.3 ns | 0 |
| L1 cache (SRAM, per core) | 32–64 KiB | ~1 ns | ~4–5 |
| L2 cache (SRAM, per core) | 0.25–2 MiB | ~4 ns | ~12–15 |
| L3 cache (SRAM, shared) | 8–100+ MiB | ~10–20 ns | ~40–70 |
| main memory (DRAM) | 8 GiB – 1 TiB | ~80–100 ns | ~250–300 |
| SSD (flash) | 0.5–8 TB | ~10–100 µs | ~$10^5$ |
| hard disk | 1–30 TB | ~5–10 ms | ~$10^7$ |

Each level is roughly ten times larger and several times slower than the one above it. The hierarchy works if, most of the time, the data a program needs are found in a small, fast level.

## Locality

Programs do not access memory at random.

::: definition Locality {#def-locality}
A program has good **temporal locality** if a memory location it references is likely to be referenced again soon, and good **spatial locality** if, after referencing a location, it is likely to reference nearby locations soon. An access pattern that visits consecutive elements of an array has **stride 1**; one that visits every $k$-th element has **stride $k$**.
:::

The row-by-row sum has excellent spatial locality: it visits `a[i][0]`, `a[i][1]`, … in order, and since C stores arrays in row-major order ([[computer-systems/machine-code#eq-rowmajor]]) these are adjacent in memory. The variable `s` has excellent temporal locality — it is used in every iteration (and lives in a register). The column-by-column sum touches `a[0][j]`, `a[1][j]`, …, which are $4 \times 4096 = 16\,384$ bytes apart: stride $4096$, with essentially no spatial locality. Instructions have locality too: a loop body is executed over and over (temporal) and its instructions are consecutive (spatial).

::: quiz
Which of these loops over `double v[n]` and a linked list have good *spatial* locality?
- [x] `for (i = 0; i < n; i++) s += v[i];`
- [x] `for (i = n - 1; i >= 0; i--) s += v[i];`
- [ ] `for (i = 0; i < n; i++) s += v[(i * 4099) % n];` for large $n$
- [ ] Following `next` pointers through a list whose nodes were allocated at scattered addresses
::: solution
Stride 1 is good in either direction: consecutive elements share cache blocks whichever way you walk. Multiplying the index by a large constant modulo $n$ jumps around the array, and a list allocated at scattered addresses visits unrelated memory at every step (this is why linked lists are often slower than arrays in practice, even when the asymptotic costs agree — see [[data-structures]]).
:::
:::

### Caching as a principle

::: definition Cache, hit and miss {#def-cache}
A **cache** is a smaller, faster storage device that holds copies of a subset of the data of a larger, slower device. Data move between the two levels in fixed-size units called **blocks** (in CPU caches, also **lines**; in virtual memory, **pages**). When a program requests data and the block containing it is in the cache, the access is a **hit**; otherwise it is a **miss**, and the block is fetched from the next level, possibly replacing (**evicting**) another block. The **miss rate** is the fraction of accesses that miss, and the **hit rate** is $1 -$ miss rate.
:::

Misses come in three kinds, the "three Cs". A **compulsory** (cold) miss is the first reference to a block, which no cache could avoid. A **capacity** miss happens because the program's **working set** — the blocks it is actively using — is larger than the cache. A **conflict** miss happens when the cache has room, but the placement rules force two blocks that are both in use into the same location, so they keep evicting each other.

Blocks are why spatial locality helps: a miss on one byte brings in the whole block, and the following accesses to the same block hit. The hierarchy applies the same principle at every level: L1 caches L2, L2 caches L3, L3 caches DRAM, DRAM caches the disk (virtual memory), and the disk caches remote servers (web caches, content-delivery networks).

## Cache organisation

A CPU cache must answer, in about a nanosecond, the question "is the block containing address $A$ here, and where?" It cannot search the whole cache. Instead each block may go only in a restricted set of places, determined by bits of its address.

::: definition Cache parameters {#def-cache-org}
Let addresses have $m$ bits. A cache is organised as an array of $S = 2^s$ **sets**, each containing $E$ **lines**; each line holds one **block** of $B = 2^b$ bytes, together with a **valid bit** and a **tag** of $t = m - s - b$ bits. The **capacity** is $C = S \times E \times B$ bytes (not counting tags and valid bits). An address $A$ is divided, from the most significant bit down, into

$$
A = \underbrace{t \text{ tag bits}}_{\text{which block}} \;\Big|\; \underbrace{s \text{ set-index bits}}_{\text{which set}} \;\Big|\; \underbrace{b \text{ block-offset bits}}_{\text{which byte}} .
$$

A cache with $E = 1$ is **direct-mapped**; one with $1 < E < C/B$ is **$E$-way set associative**; one with a single set ($S = 1$, $E = C/B$) is **fully associative**.
:::

::: algorithm Cache lookup {#alg-lookup}
To read the byte at address $A$:

1. **Set selection.** Extract the set index $i$ (bits $b$ to $b + s - 1$ of $A$) and select set $i$.
2. **Line matching.** Compare the tag bits of $A$ with the tag of every valid line in the set (in hardware, all $E$ comparisons happen in parallel).
3. **Hit.** If a valid line's tag matches, return the byte at offset (the low $b$ bits of $A$) within its block.
4. **Miss.** Otherwise fetch the block containing $A$ — the $B$ bytes starting at $A$ with its low $b$ bits cleared — from the next level. If the set has an invalid line, use it; otherwise evict a line chosen by the **replacement policy** (typically least recently used, **LRU**, or an approximation). Store the block, set the valid bit and tag, and return the byte.
:::

::: proposition Addresses map to unique lines {#prop-unique}
For fixed $s$ and $b$, two addresses lie in the same block if and only if they agree in their tag and set-index bits; and a block is identified, within its set, by its tag. Consequently a lookup that finds a valid line with a matching tag in the selected set has found the right block.
:::

::: proof
The block containing $A$ is $\lfloor A / 2^b \rfloor$, whose binary representation is exactly the top $t + s$ bits of $A$ (the tag bits followed by the set-index bits). So two addresses are in the same block iff these bits agree. All blocks placed in set $i$ have the same set-index bits $i$, so among them the block number is determined by the tag bits alone. Hence a valid line in set $i$ with tag $T$ holds exactly the block with number $T \cdot 2^s + i$, the block of $A$.
:::

Using the *middle* bits for the set index is deliberate. If the high bits chose the set, consecutive blocks would all fall into the same set, and a program scanning an array would use only one set of the cache. With middle bits, consecutive blocks go to consecutive sets, and a contiguous region of $C$ bytes fits in the cache exactly.

::: example A real L1 cache {#ex-l1}
The L1 data cache of the test machine has $C = 32$ KiB, $E = 8$ and $B = 64$ bytes. How many sets does it have, and how is the address `0x7ffc3a5e` split? (Treat addresses as 48 bits wide.)
::: solution
$S = C/(E \cdot B) = 32768 / (8 \cdot 64) = 64$ sets, so $s = 6$, and $B = 64$ gives $b = 6$; the tag is $t = 48 - 6 - 6 = 36$ bits. The block offset is the low six bits of `0x7ffc3a5e`: `0x5e & 0x3f` $= 30$. The set index is the next six bits: $(\text{0x7ffc3a5e} \gg 6) \mathbin{\&} 63 = 41$. The tag is everything above bit 12: `0x7ffc3`. So this byte, if cached, lives at offset $30$ of one of the eight lines of set $41$, and that line's tag is `0x7ffc3`. Because $s + b = 12$, the set index comes entirely from the low 12 bits of the address — the offset within a 4 KiB page — which lets the hardware begin the lookup before address translation (below) has finished.
:::
:::

::: example Direct-mapped versus two-way {#ex-trace}
A tiny cache with $C = 32$ bytes and $B = 8$ bytes receives the byte reads `0, 4, 8, 36, 0, 40, 8, 68, 4` (addresses in decimal). Trace it as direct-mapped ($S = 4$, $E = 1$) and as two-way set associative with LRU replacement ($S = 2$, $E = 2$).
::: solution
The block number of address $A$ is $\lfloor A/8 \rfloor$. Direct-mapped: set $= $ block mod $4$, tag $= \lfloor \text{block}/4 \rfloor$.

| address | block | set | tag | result |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | miss (cold) |
| 4 | 0 | 0 | 0 | hit |
| 8 | 1 | 1 | 0 | miss (cold) |
| 36 | 4 | 0 | 1 | miss, evicts block 0 |
| 0 | 0 | 0 | 0 | miss (conflict), evicts block 4 |
| 40 | 5 | 1 | 1 | miss, evicts block 1 |
| 8 | 1 | 1 | 0 | miss (conflict), evicts block 5 |
| 68 | 8 | 0 | 2 | miss, evicts block 0 |
| 4 | 0 | 0 | 0 | miss (conflict), evicts block 8 |

One hit, eight misses. Blocks $0$, $4$ and $8$ all map to set $0$ and $1$ and $5$ to set $1$, so they keep evicting each other although the cache has four lines and only five distinct blocks are used.

Two-way: set $= $ block mod $2$, tag $= \lfloor \text{block}/2 \rfloor$; each set holds two blocks, and a miss in a full set evicts the least recently used one.

| address | block | set | tag | result | set contents afterwards (LRU first) |
|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | miss | {0} |
| 4 | 0 | 0 | 0 | hit | {0} |
| 8 | 1 | 1 | 0 | miss | {1} |
| 36 | 4 | 0 | 2 | miss | {0, 4} |
| 0 | 0 | 0 | 0 | hit | {4, 0} |
| 40 | 5 | 1 | 2 | miss | {1, 5} |
| 8 | 1 | 1 | 0 | hit | {5, 1} |
| 68 | 8 | 0 | 4 | miss, evicts block 4 (LRU) | {0, 8} |
| 4 | 0 | 0 | 0 | hit | {8, 0} |

Four hits, five misses. With the same capacity, associativity removed most conflict misses. (A simulation in Python, written for this example, gives the same counts.) Real L1 caches are typically 8- to 12-way: enough associativity to make conflicts rare, while keeping the parallel tag comparison fast.
:::
:::

### Writes

Reads are simple because a cached copy agrees with the next level. Writes create a choice. A **write-through** cache writes every store to the next level immediately; a **write-back** cache updates only the cached block, marks it **dirty**, and writes it back when it is evicted, saving traffic when a block is written repeatedly. On a write miss, a **write-allocate** cache fetches the block and then writes into it (exploiting spatial locality of later writes); a **no-write-allocate** cache writes straight to the next level. Modern CPU caches are typically write-back and write-allocate at every level. With several cores, each with private caches, a **coherence protocol** (such as MESI) keeps copies of the same block consistent; that, and its performance consequences such as false sharing, belongs to [[parallel-computing]].

## Measuring cache performance

The cost of memory accesses is summarised by one number.

::: theorem Average memory access time {#thm-amat}
Suppose a cache has hit time $T_h$ (the time to determine a hit and deliver the data), miss rate $r$, and miss penalty $P$ (the additional time to obtain the block from the next level). Then the average time per access is

$$
\text{AMAT} = T_h + r \cdot P .
$$ {#eq-amat}

For a hierarchy, the miss penalty of one level is the AMAT of the level below: with two levels, $\text{AMAT} = T_{h,1} + r_1 \,(T_{h,2} + r_2 P_2)$, where $r_2$ is the **local** miss rate of L2 (the fraction of accesses *reaching* L2 that miss there).
:::

::: proof
Every access spends $T_h$ in the cache. A fraction $r$ of accesses also pays $P$. Averaging over accesses, $\text{AMAT} = (1 - r) T_h + r(T_h + P) = T_h + rP$. For two levels, an L1 miss behaves, from L1's point of view, like one access to the L2 subsystem, whose average cost by the same formula is $T_{h,2} + r_2 P_2$; substituting this for $P$ gives the second formula. (This is an average under the model in which each access independently hits or misses; real processors overlap misses with other work, so the formula is a model of cost, not an exact prediction of running time.)
:::

::: widget plot
f: h + (1 - x)*p
x: 0.8, 1
y: 0, 60
sliders: h=4:1:10:1; p=200:50:400:10
labels: \text{AMAT (cycles)}
caption: The average memory access time of a single cache as a function of its hit rate $x$, with hit time $h$ and miss penalty $p$ in cycles. Notice how steep the line is: with a penalty of $200$ cycles, raising the hit rate from $97\%$ to $99\%$ cuts the average from $10$ to $6$ cycles. Small changes in miss rate dominate memory performance, which is why the rest of the chapter counts misses.
:::

::: example A two-level hierarchy {#ex-amat}
L1 has a hit time of 4 cycles and a miss rate of 5%. L2 has a hit time of 12 cycles and a local miss rate of 20%. Main memory costs 200 cycles. What is the AMAT? What if a program change halves the L1 miss rate?
::: solution
By [[#thm-amat]], $\text{AMAT} = 4 + 0.05 \times (12 + 0.2 \times 200) = 4 + 0.05 \times 52 = 6.6$ cycles. With an L1 miss rate of $2.5\%$: $4 + 0.025 \times 52 = 5.3$ cycles. The program's memory accesses become about $20\%$ faster on average, though L1 hits are no faster at all. The **global** miss rate of L2 — the fraction of all accesses that go to memory — is $0.05 \times 0.2 = 1\%$ in the first case.
:::
:::

## Writing cache-friendly code

Two rules of thumb follow from the model: make the common case — the inner loop — hit in the cache, and minimise misses in it by stride-1 access (spatial locality) and repeated use of data already loaded (temporal locality). We can quantify the first.

::: proposition Miss rate of a strided scan {#prop-stride}
A loop reads $n$ elements of an array of $w$-byte elements with stride $k$, once each, starting from a cold cache, with the array aligned to a block boundary and $kw$ either dividing $B$ or a multiple of $B$. If no block is evicted while it is still being used, the miss rate is

$$
r = \min\!\left(1, \frac{kw}{B}\right)
$$

(up to rounding at the end of the array).
:::

::: proof
Consecutive accesses are $kw$ bytes apart. If $kw \ge B$ (and $kw$ is a multiple of $B$), every access falls in a different block, never touched before, so every access is a compulsory miss: $r = 1$. If $kw < B$ and $kw$ divides $B$, each block receives exactly $B/(kw)$ consecutive accesses, because the block boundaries are multiples of $B$ and hence of $kw$. The first access to each block misses and, since the block is not evicted while in use, the remaining $B/(kw) - 1$ hit. So the miss rate is $1 / (B/(kw)) = kw/B$.
:::

For `int` ($w = 4$) and 64-byte lines, the row-by-row sum has miss rate $4/64 = 1/16$: one miss per sixteen elements. The column-by-column sum has stride $4096$ elements, $16\,384$ bytes, so every access misses — and worse, all the elements of a column are $16\,384$ bytes apart, a multiple of the $64 \times 64 = 4096$ bytes that the 64 sets of L1 span, so they all map to the *same* L1 set and conflict. That explains the observed factor (mitigated in practice by hardware **prefetchers**, which detect regular strides and fetch blocks ahead of time).

### Conflicts and padding

::: example Thrashing in a dot product {#ex-thrash}
A direct-mapped cache has 16 sets of 16-byte blocks (256 bytes). A function computes $\sum_i x_i y_i$ for two arrays of 16 `double`s, `x` at address $0$ and `y` at address $256$, reading `x[0], y[0], x[1], y[1], …`. Count the misses. Then suppose `y` is moved to address $272$.
::: solution
`x[i]` is at $8i$, block $\lfloor i/2 \rfloor$, set $\lfloor i/2 \rfloor$. `y[i]` is at $256 + 8i$, block $16 + \lfloor i/2 \rfloor$, set $(16 + \lfloor i/2 \rfloor) \bmod 16 = \lfloor i/2 \rfloor$ — the same set. So the read of `x[0]` loads block 0 into set 0, the read of `y[0]` evicts it, the read of `x[1]` (same block as `x[0]`) misses again and evicts `y`'s block, and so on: all **32 accesses miss**. The cache is said to **thrash**, although the arrays together occupy exactly its capacity.

With `y` at $272$, `y[i]` is in block $17 + \lfloor i/2 \rfloor$, set $(1 + \lfloor i/2 \rfloor) \bmod 16$: always the set *after* the one used by `x[i]`. Now each block is loaded once and both of its elements are used before it is evicted: 16 misses and 16 hits, the miss rate $8/16 = 1/2$ of [[#prop-stride]]. A simulation confirms both counts. Inserting **padding** to shift arrays relative to each other is a standard fix, as is avoiding array dimensions that are large powers of two.
:::
:::

### Loop order in matrix multiplication

Consider $C \mathrel{+}= AB$ for $n \times n$ matrices of `double`, with the triple loop over $i$, $j$, $k$ computing `C[i][j] += A[i][k] * B[k][j]`. All six orders of the three loops compute the same result with $n^3$ multiply–adds, but they access memory differently. Analyse the **inner loop**, for large $n$ (a row does not fit in the cache) and 64-byte blocks holding 8 doubles, using [[#prop-stride]]:

| order | inner loop varies | `A` access | `B` access | `C` access | misses per inner iteration |
|---|---|---|---|---|---|
| `ijk` (and `jik`) | $k$ | row, stride 1: $1/8$ | column: $1$ | fixed: $0$ | $1.125$ |
| `jki` (and `kji`) | $i$ | column: $1$ | fixed: $0$ | column: $1$ | $2$ |
| `kij` (and `ikj`) | $j$ | fixed: $0$ | row, stride 1: $1/8$ | row, stride 1: $1/8$ | $0.25$ |

The prediction is that `kij` is fastest and `jki` slowest. Measured, for $n = 1024$ with `gcc -O2`:

```console
$ ./mm
check -3.58373e+08 -3.58373e+08 -3.58373e+08
ijk 4.30 s   jki 18.27 s   kij 0.57 s
```

The order matches the analysis; the size of the gaps (a factor of $32$ between the extremes, larger than the miss ratio $8$) shows two further effects: with $n = 1024$, column elements are $8192$ bytes apart and conflict in the same sets, and the stride-1 inner loop of `kij` can also be **vectorised** by the compiler into SIMD instructions that process several doubles at once. (The full program, 41 lines, initialises `A[i][j] = i - j` and `B[i][j] = i + j` and runs the three versions one after another; the `check` line confirms they compute the same $C_{7,9}$.)

::: warning Counting operations is not counting time
"Both loops are $\Theta(n^3)$, so they take the same time" is wrong by a factor of 30 here. Asymptotic analysis counts operations in a model in which every memory access costs the same; real memory does not. When performance matters, also count *misses* — the **external-memory** or **cache-oblivious** models of [[algorithms]] do this formally — and measure. Conversely, do not "optimise" for the cache without measuring: modern prefetchers and out-of-order execution hide many misses in simple access patterns.
:::

**Blocking** (tiling) improves temporal locality further when the working set exceeds the cache: split the matrices into $b \times b$ sub-matrices small enough that three of them fit in the cache, and multiply block by block. Each block is loaded once per block-multiplication and then reused $b$ times from the cache, which divides the number of misses by a factor proportional to $b$. Optimised libraries (BLAS implementations) combine blocking for every cache level with vectorisation, and run tens of times faster than the best simple loop.

## Virtual memory: DRAM as a cache for the disk

One level down, the same organisation reappears with very different numbers. Each process sees a private **virtual address space** ([[computer-systems/c-programming#sec-regions]]); the hardware's **memory management unit** (MMU) translates every virtual address to a **physical address** in DRAM, using **page tables** maintained by the operating system. Memory is divided into **pages**, 4 KiB on x86-64 by default ($2^{12}$ bytes, with optional 2 MiB and 1 GiB "huge" pages). A virtual address is split into a **virtual page number** and a 12-bit **page offset**; translation replaces the page number by a physical page number and keeps the offset.

Viewed as a cache, DRAM holds pages of the virtual address space; a reference to a page that is not in DRAM is a **page fault**, handled by the operating system ([[computer-systems/exceptions-processes]]), which reads the page from disk. The miss penalty is enormous — milliseconds for a hard disk, tens of microseconds for an SSD, millions or hundreds of thousands of cycles — so virtual memory is fully associative (any page can go in any physical frame), uses sophisticated replacement policies in software, and is always write-back.

On x86-64, 48-bit virtual addresses are translated through a four-level page table: $48 = 12 + 4 \times 9$, each level indexed by 9 bits and holding $2^9 = 512$ eight-byte entries, exactly one 4 KiB page. (Processors with five-level paging extend this to 57 bits.) Walking four levels on every access would be ruinous, so the MMU caches recent translations in a **translation lookaside buffer** (TLB), a small, highly associative cache of page-table entries. A TLB with 64 entries for 4 KiB pages covers $64 \times 4 = 256$ KiB of memory — its **reach** — which is why programs with large, scattered working sets benefit from huge pages. Page replacement algorithms, page-table structures and their management are treated in [[operating-systems]].

::: history
Maurice Wilkes described the idea of a small, fast "slave memory" holding copies of words from a larger main memory in 1965; the IBM System/360 Model 85 (1968) was the first commercial computer with a cache, which IBM called a buffer. Virtual memory is older: the Atlas computer at the University of Manchester (operational 1962, designed by Tom Kilburn's group) used a "one-level store" in which pages moved automatically between core memory and a magnetic drum. Peter Denning's working-set model (1968) gave locality a precise formulation. Wm. A. Wulf and Sally McKee named the growing processor–memory gap the "memory wall" in 1995. Bryant and O'Hallaron's *Computer Systems: A Programmer's Perspective* (3rd edition, 2016) popularised the "memory mountain", a plot of read throughput against working-set size and stride that makes the hierarchy visible on any machine.
:::

## Where this leads

The miss-counting arguments of this chapter reappear in the analysis of B-trees in [[databases]], whose node size is chosen to match a disk or SSD block, and in cache-efficient algorithms in [[algorithms]]. [[computer-systems/dynamic-memory]] considers how an allocator's placement decisions affect locality. Caches shared between cores, coherence and false sharing are part of [[parallel-computing]]; virtual memory, page replacement and TLB management are developed in [[operating-systems]]. The circuits of SRAM and DRAM and the design of cache controllers belong to computer architecture in the [Electrical Engineering Atlas](/learn/ee/). Caches also leak information through timing, the basis of side-channel attacks such as Spectre and their mitigations ([[security]]).

::: summary
- Storage forms a hierarchy — registers, L1, L2, L3, DRAM, SSD, disk — each level roughly ten times larger and several times slower than the last; the processor–memory gap is about 100 ns or hundreds of cycles.
- Caches work because programs have **temporal** and **spatial locality**; data move in blocks (64-byte lines in current CPUs).
- A cache has $S = 2^s$ sets of $E$ lines of $B = 2^b$ bytes; an address splits into tag, set index and block offset ([[#def-cache-org]]); direct-mapped, set-associative and fully associative caches trade conflict misses against lookup cost.
- Misses are compulsory, capacity or conflict; write-back, write-allocate is the usual write policy.
- $\text{AMAT} = T_h + rP$, applied level by level ([[#thm-amat]]): small changes in miss rate dominate.
- A stride-$k$ scan of $w$-byte elements misses at rate $\min(1, kw/B)$ ([[#prop-stride]]). Prefer stride-1 inner loops, reuse data while cached, choose loop orders by counting inner-loop misses, block large computations, and pad arrays to avoid conflicts.
- Virtual memory applies the same ideas to DRAM and disk with 4 KiB pages, multi-level page tables and a TLB.
:::

## Exercises

::: exercise Cache geometry {level=1 check="1024"}
A 1 MiB L2 cache is 16-way set associative with 64-byte lines. How many sets does it have, and how many set-index and offset bits? (Enter the number of sets.)
::: solution
$S = C/(E B) = 2^{20} / (2^4 \cdot 2^6) = 2^{10} = 1024$. So $s = 10$ and $b = 6$, and with 48-bit addresses the tag has $48 - 10 - 6 = 32$ bits. Doubling the associativity to 32 ways at the same capacity would halve the number of sets to $512$.
:::
:::

::: exercise Splitting an address {level=1 check="25"}
For the L1 cache of [[#ex-l1]] (64 sets, 64-byte blocks), which set does the address `0x12345678` map to? Give also the block offset. (Enter the set index.)
::: solution
The offset is the low six bits: `0x78 & 0x3f` $= 0x38 = 56$. The set index is bits 6–11: $(\text{0x12345678} \gg 6) \mathbin{\&} 63$. Shifting right by six gives `0x48d159`, and `0x59 & 0x3f` $= 0x19 = 25$. So set $25$, offset $56$, tag `0x12345`.
:::
:::

::: exercise Average access time {level=1 check="4"}
A cache has a hit time of 1 ns, a miss rate of 3% and a miss penalty of 100 ns. What is the AMAT in nanoseconds? (Enter it.)
::: solution
By [[#eq-amat]], $1 + 0.03 \times 100 = 4$ ns. Three per cent of accesses contribute three times as much time as all the hits together.
:::
:::

::: exercise Strided reads {level=2 check="0.25"}
A loop reads every second element of a large `double` array (stride 2) once, with 64-byte blocks and a cold cache. What is the miss rate? (Enter it as a fraction or decimal.)
::: solution
By [[#prop-stride]] with $k = 2$, $w = 8$, $B = 64$: $kw/B = 16/64 = 1/4$. Each 64-byte block holds 8 doubles, of which the loop reads 4; the first read of each block misses and the next three hit.
:::
:::

::: exercise Tracing a direct-mapped cache {level=2 check="6"}
A direct-mapped cache has 4 sets and 16-byte blocks. Trace the byte reads `0x00, 0x08, 0x40, 0x48, 0x00, 0x80, 0x08, 0x40` and count the misses. (Enter the number of misses.)
::: solution
The block is $\lfloor A/16 \rfloor$ and the set is block mod 4. Blocks: `0x00` → 0, `0x08` → 0, `0x40` → 4, `0x48` → 4, `0x80` → 8. All three blocks map to set $0$. Sequence: block 0 miss; block 0 hit; block 4 miss (evicts 0); block 4 hit; block 0 miss (evicts 4); block 8 miss (evicts 0); block 0 miss (evicts 8); block 4 miss (evicts 0). That is $6$ misses and $2$ hits, although the cache has four sets and only three distinct blocks are used. A two-way LRU cache with 2 sets (the same capacity) maps all three blocks to set 0 as well (block mod 2 $= 0$), but holds two of them at once: it misses on blocks 0, 4, 8 and finally 4 again, $4$ misses and $4$ hits.
:::
:::

::: exercise The other loop orders {level=2}
Complete the analysis of matrix multiplication for the orders `jik` and `ikj`: write each loop nest, say which matrix each inner-loop reference walks along and with what stride, and give the misses per inner iteration under the assumptions of the table in the text.
::: solution
`jik`: `for j, for i { s = C[i][j]; for k: s += A[i][k] * B[k][j]; C[i][j] = s; }`. The inner loop varies $k$: `A[i][k]` walks row $i$ with stride 1 ($1/8$ miss per iteration), `B[k][j]` walks column $j$ with stride $n$ (one miss per iteration), and `C[i][j]` is fixed in a register. Total $1.125$, like `ijk`.

`ikj`: `for i, for k { r = A[i][k]; for j: C[i][j] += r * B[k][j]; }`. The inner loop varies $j$: `B[k][j]` walks row $k$ and `C[i][j]` walks row $i$, both stride 1 ($1/8$ each), and `A[i][k]` is fixed. Total $0.25$, like `kij`. The rule: the best orders make the innermost loop index the *last* subscript of every array it touches.
:::
:::

::: exercise LRU and cyclic access {level=3}
A fully associative cache holds $E$ blocks and uses LRU replacement. A program repeatedly cycles through $E + 1$ distinct blocks $b_0, b_1, \ldots, b_E, b_0, b_1, \ldots$. Prove that every access misses. What would an optimal replacement policy achieve?
::: solution
Claim: just before each access to $b_j$ (after the first $E + 1$ accesses), the cache contains exactly the $E$ blocks accessed most recently, which are the $E$ blocks *other than* $b_j$. LRU keeps the $E$ most recently used blocks, since a miss evicts the least recently used one. In a cyclic sequence of $E + 1$ blocks, the block accessed least recently among the last $E + 1$ accesses is $b_j$ itself, the block about to be accessed: the previous $E$ accesses were to the other $E$ blocks. So $b_j$ is not in the cache and the access misses. The first $E + 1$ accesses are compulsory misses. Hence every access misses: the miss rate is $1$.

An optimal policy (Belady's: evict the block whose next use is furthest in the future) misses only about once every $E$ accesses in the steady state: on a miss it evicts the block that will be needed last, which in a cycle is the one used most recently, after which the next $E - 1$ accesses hit. This "LRU cliff", where performance collapses as soon as the working set exceeds the cache by one block, is why some caches use other policies and why scanning a data set larger than the cache gets no benefit from it. (A simulation with $E = 4$ and 20 accesses to 5 blocks gives 20 misses.)
:::
:::

::: exercise Blocked transpose {level=3}
Write a C function that transposes an $n \times n$ matrix of `double` (`dst[j][i] = src[i][j]`) in $b \times b$ blocks, and explain, using [[#prop-stride]], why the naive version misses about $n^2 (1/8 + 1)$ times for large $n$ while the blocked version with $b = 8$ misses about $n^2/4$ times, assuming 64-byte blocks, a cache that holds two $8 \times 8$ tiles, and arrays aligned to blocks.
::: solution
```c
#include <stddef.h>

void transpose_blocked(size_t n, double dst[n][n], const double src[n][n], size_t b) {
    for (size_t ii = 0; ii < n; ii += b)
        for (size_t jj = 0; jj < n; jj += b)
            for (size_t i = ii; i < ii + b && i < n; i++)      /* one b-by-b tile */
                for (size_t j = jj; j < jj + b && j < n; j++)
                    dst[j][i] = src[i][j];
}
```

(The parameters use variable-length array types, standard since C99, so that `src[i][j]` indexes an $n \times n$ array.) In the naive double loop over $i$ then $j$, `src` is read along rows, stride 1, miss rate $1/8$; `dst` is written down columns, stride $n$, and for large $n$ each write touches a new block that has been evicted by the time the next element of that block is written, so every write misses: about $n^2(1/8 + 1)$ misses in total.

In the blocked version with $b = 8$, one tile of `src` is 8 rows of 8 doubles, that is 8 cache blocks, and the corresponding tile of `dst` is also 8 blocks. If both tiles stay in the cache while the tile is processed, every block is loaded once: $8 + 8 = 16$ misses per tile of $64$ elements, so $16 \cdot n^2 / 64 = n^2/4$ misses in total — about a fifth of the naive count. (In real caches with power-of-two $n$, the eight rows of a tile can conflict in the same set; padding the row length avoids that.)
:::
:::
