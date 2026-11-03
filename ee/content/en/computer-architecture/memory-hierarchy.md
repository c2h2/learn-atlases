The pipeline of [[computer-architecture/pipelining]] assumed that the instruction and data memories answer in one clock cycle. Real memories do not. A processor core running at $4\,\mathrm{GHz}$ has a cycle of $0.25\,\mathrm{ns}$, while a read from the DRAM chips on the motherboard takes around $80\,\mathrm{ns}$ — more than three hundred cycles. If every load waited that long, the fastest processor would run at the speed of a 1990s machine. Yet memory must also be *large*: gigabytes for programs and their data, far more than could ever be built from fast on-chip circuits.

The way out is a **memory hierarchy**: a small, fast memory close to the processor holding copies of the data in use right now, backed by larger and slower levels, down to DRAM and finally to flash storage. If the hierarchy is well designed, almost every access is served by the fast level, and the processor sees a memory that is nearly as fast as the smallest level and nearly as large as the biggest. That this works at all is a statement about programs, not hardware: programs reuse data and use data that lie close together. This chapter makes that statement precise and builds on it: the organisation of caches, how they are looked up and how they decide what to keep, how to calculate their effect on performance, and how **virtual memory** gives each program the illusion of a private address space using the same ideas one level further down.

The circuits themselves — SRAM cells, DRAM cells and refresh, the organisation of memory arrays — are in [[digital-logic/memories-programmable-logic]]. The programmer's view, how to write code that uses caches well, is in [The memory hierarchy and caches](/learn/cs/lesson.php?c=computer-systems&l=memory-hierarchy), and the operating system's management of pages in [Address spaces and paging](/learn/cs/lesson.php?c=operating-systems&l=address-spaces-paging).

## Technology and locality

Memory technologies span a huge range of speed, density and cost. The figures below are typical as of 2026; they change from year to year, but their ratios have been similar for decades.

| level | technology | typical size | access time | cost per GiB |
|---|---|---|---|---|
| registers | flip-flops | $< 1\,\mathrm{KiB}$ | $< 0.3\,\mathrm{ns}$ | — |
| L1 cache | SRAM, on the core | $32$–$64\,\mathrm{KiB}$ | about $1\,\mathrm{ns}$ ($4$–$5$ cycles) | — |
| L2 cache | SRAM, on the core | $1$–$3\,\mathrm{MiB}$ | $3$–$4\,\mathrm{ns}$ | — |
| L3 cache | SRAM, shared on the chip | $16$–$128\,\mathrm{MiB}$ | $10$–$20\,\mathrm{ns}$ | — |
| main memory | DRAM (DDR5, LPDDR5X) | $8$–$512\,\mathrm{GiB}$ | $60$–$100\,\mathrm{ns}$ | a few dollars |
| storage | NAND flash (SSD) | $0.5$–$8\,\mathrm{TB}$ | $20$–$100\,\mathrm{\mu s}$ | under $0.1$ dollars |

SRAM uses six transistors per bit and is fast but large; DRAM stores a bit as charge on one capacitor with one transistor, so it is dense but slow, and it must be refreshed. Flash is denser still, non-volatile, and a thousand times slower again. No single technology is fast, large and cheap — hence the hierarchy.

::: definition Locality {#def-locality}
A program exhibits **temporal locality** if a memory location it has accessed is likely to be accessed again soon, and **spatial locality** if locations near a recently accessed one are likely to be accessed soon.
:::

Loops give temporal locality to their instructions and to variables such as counters and accumulators; sequential instruction fetch, arrays and structures give spatial locality. A memory hierarchy exploits temporal locality by keeping recently used data in the fast level, and spatial locality by moving data between levels in **blocks** (also called **lines**) of several consecutive words, so that one slow access brings in the neighbours too.

The vocabulary is the same at every level. An access that finds its data in the upper level is a **hit**; one that does not is a **miss**. The **hit rate** is the fraction of accesses that hit, and the **miss rate** $m = 1 - $ hit rate. The **hit time** is the time to access the upper level, including the time to find out whether it is a hit; the **miss penalty** is the extra time to fetch the block from the lower level and deliver it.

::: theorem Average memory access time {#thm-amat}
If a level of the hierarchy has hit time $t_h$, miss rate $m$ and miss penalty $P$, the **average memory access time** is

$$
\text{AMAT} = t_h + m\,P .
$$ {#eq-amat}

For two levels of cache in front of main memory, with L1 hit time $t_1$ and miss rate $m_1$, L2 hit time $t_2$ and **local** miss rate $m_2$ (the fraction of accesses *reaching* L2 that miss there), and memory access time $t_{\text{mem}}$,

$$
\text{AMAT} = t_1 + m_1\bigl(t_2 + m_2\,t_{\text{mem}}\bigr).
$$ {#eq-amat2}
:::

::: proof
Every access spends $t_h$ finding out whether it hits. A fraction $m$ of accesses also spends $P$ fetching the block. Averaging over accesses, $\text{AMAT} = (1 - m)t_h + m(t_h + P) = t_h + mP$. For two levels, the miss penalty of L1 is the average access time of the level below it, which by the same argument is $t_2 + m_2 t_{\text{mem}}$; substituting gives [[#eq-amat2]].
:::

The product $m_1 m_2$ is the **global** miss rate of L2 — the fraction of *all* accesses that go to memory. Local miss rates of L2 caches look poor (often $20$–$50\,\%$) because L1 has already filtered out the easy accesses; the global rate is what matters for traffic to memory.

::: example A two-level hierarchy {#ex-amat}
An L1 cache has a hit time of $1$ cycle and a miss rate of $5\,\%$. The L2 cache has a hit time of $12$ cycles and a local miss rate of $20\,\%$. Main memory takes $200$ cycles. Find the AMAT, the global L2 miss rate, and the AMAT without the L2.
::: solution
By [[#eq-amat2]], $\text{AMAT} = 1 + 0.05(12 + 0.20\times 200) = 1 + 0.05\times 52 = 3.6$ cycles. The global miss rate is $0.05\times 0.20 = 1\,\%$: one access in a hundred goes to DRAM.

Without the L2, $\text{AMAT} = 1 + 0.05\times 200 = 11$ cycles. The L2, which catches four out of five L1 misses, makes the memory system three times faster on average.
:::
:::

::: widget plot
f: h1 + x*(t2 + m2*tm); h1 + x*tm
x: 0, 0.2
y: 0, 50
sliders: h1=1:1:5:1; t2=12:4:30:1; m2=0.2:0.05:0.8:0.05; tm=200:50:500:10
labels: \text{with L2}; \text{L1 only}
caption: Average memory access time in cycles against the L1 miss rate, with and without an L2 cache ([[#eq-amat2]]). Even a $5\,\%$ L1 miss rate costs ten cycles per access without an L2. Raise the L2's local miss rate towards $1$ and its benefit disappears; raise the memory latency and every percent of L1 misses becomes more expensive.
:::

## Cache organisation

A **cache** is a small memory that holds copies of blocks of main memory, together with enough information to say which blocks they are. When the processor presents an address, the cache must decide quickly whether it holds that block and, if so, where. The answer depends on where a block is allowed to go.

::: definition Cache mapping {#def-mapping}
A cache of $C$ bytes with blocks of $B$ bytes has $C/B$ **lines** (slots for blocks), grouped into $S$ **sets** of $A$ lines each, so $C = S\cdot A\cdot B$. A memory block with block address $b$ (the byte address divided by $B$) may be placed only in set $b \bmod S$, in any of its $A$ lines. The cache is

- **direct-mapped** if $A = 1$ (each block has exactly one possible line),
- **$A$-way set-associative** if $1 < A < C/B$,
- **fully associative** if $S = 1$ (a block may go in any line).
:::

To locate a block, the cache splits the address into three fields. The low $\log_2 B$ bits are the **block offset**, selecting a byte within the block. The next $\log_2 S$ bits are the **index**, selecting the set. The remaining high bits are the **tag**, stored with each line to identify which of the many blocks that map to the set it holds. Each line also has a **valid bit**, cleared at reset, and in a write-back cache a **dirty bit**.

::: proposition Address fields {#prop-fields}
For an $n$-bit byte address and a cache with block size $B$, $S$ sets and associativity $A$ (all powers of two), the offset has $\log_2 B$ bits, the index $\log_2 S$ bits and the tag $n - \log_2 S - \log_2 B$ bits. A lookup reads the $A$ lines of the indexed set, compares their tags with the address tag in parallel, and hits if one of them is valid and matches.
:::

::: proof
Blocks are $B$-byte aligned, so the byte address is $b\cdot B + \text{offset}$ with $0 \le \text{offset} < B$, the low $\log_2 B$ bits. The set is $b \bmod S$, the low $\log_2 S$ bits of $b$. All blocks in the same set share these index bits, so they differ only in $\lfloor b/S \rfloor$, the remaining $n - \log_2 S - \log_2 B$ bits: the tag. Index and tag together determine $b$, so a matching valid tag in the indexed set identifies the block uniquely.
:::

A direct-mapped cache needs one comparator and no choice of where to put a block, so it is fast and simple; but two blocks that map to the same line evict each other even if the rest of the cache is empty. A set-associative cache needs $A$ comparators and an $A$-way multiplexer on the data, which adds to the hit time, but it tolerates up to $A$ blocks with the same index. Fully associative caches are used only when the number of entries is small, as in TLBs.

::: example Address fields and storage {#ex-fields}
A $32\,\mathrm{KiB}$, 4-way set-associative cache has $64$-byte blocks and serves a processor with 32-bit addresses. Find the sizes of the address fields and the total storage needed, including a valid bit and a dirty bit per line.
::: solution
Lines: $32768/64 = 512$. Sets: $512/4 = 128$. Offset: $\log_2 64 = 6$ bits. Index: $\log_2 128 = 7$ bits. Tag: $32 - 7 - 6 = 19$ bits.

Each line stores $19 + 1 + 1 = 21$ bits of tag and status in addition to $512$ bits of data. The overhead is $512\times 21 = 10\,752$ bits $= 1344$ bytes, $4.1\,\%$ of the data capacity, so the cache holds $33\,\mathrm{KiB}$ and a bit of SRAM in total. (An LRU replacement policy adds a few more bits per set.)
:::
:::

::: example The effect of associativity {#ex-assoc}
A tiny cache holds four $16$-byte blocks. The processor reads the byte addresses `0x000`, `0x004`, `0x040`, `0x008`, `0x044`, `0x100`, `0x000`, `0x04C`. Count the hits if the cache is (a) direct-mapped, (b) 2-way set-associative with LRU replacement, (c) fully associative with LRU. The cache is empty at the start.
::: solution
The block address is the byte address divided by $16$: blocks $0, 0, 4, 0, 4, 16, 0, 4$.

(a) *Direct-mapped*, $4$ sets: set $= b \bmod 4$, which is $0$ for every one of these blocks! Block 0 misses (compulsory), the second access to it hits, block 4 misses and evicts block 0, block 0 misses and evicts 4, block 4 misses, block 16 misses, block 0 misses, block 4 misses. **1 hit** in 8.

(b) *2-way*, $2$ sets: set $= b \bmod 2 = 0$ for all, but the set holds two blocks. Block 0 miss; 0 hit; 4 miss (set now $\{0, 4\}$); 0 hit; 4 hit; 16 miss, evicting the least recently used, 0; 0 miss, evicting 4; 4 miss, evicting 16. **3 hits**.

(c) *Fully associative*: all four lines are available. Blocks 0, 4 and 16 all fit: miss, hit, miss, hit, hit, miss, hit, hit. **5 hits**, and every miss is a first reference.

The three misses that full associativity removes from case (a) to case (c) are **conflict misses**: the cache had room, but the mapping forced the blocks into the same place.
:::
:::

### The three kinds of miss

Misses are usefully classified by their cause (the "three Cs"):

- **Compulsory** misses: the first access to a block can never hit (also called cold misses). Larger blocks reduce them, by bringing in more data per miss.
- **Capacity** misses: the program's working set is larger than the cache, so blocks are evicted and re-fetched even in a fully associative cache. Only a larger cache helps.
- **Conflict** misses: blocks are evicted because too many map to the same set, although the cache as a whole has room. Higher associativity helps.

A useful empirical rule from many measurements: a direct-mapped cache of size $C$ has about the same miss rate as a 2-way set-associative cache of size $C/2$; and beyond $8$ ways, extra associativity rarely matters.

### Replacement

In a set-associative or fully associative cache, a miss must choose which line of the set to evict. The ideal choice (which needs knowledge of the future) is the block used furthest ahead. Practical policies approximate it: **least recently used** (LRU) evicts the block unused for longest, which exploits temporal locality and needs $\lceil\log_2 A!\rceil$ bits per set for exact tracking — so large caches use **pseudo-LRU** approximations with $A - 1$ bits per set. **Random** replacement is simple and, for large associative caches, only slightly worse than LRU.

### Writes

Reads are the easy case. On a write hit, the cache has two choices:

- **Write-through**: write the data into both the cache and the next level. Memory is always up to date, but every store generates traffic to the lower level; a **write buffer** lets the processor continue while the writes drain.
- **Write-back**: write only into the cache and set the line's **dirty bit**. The block is written to the lower level only when it is evicted. Repeated writes to the same block cost nothing extra; the price is the dirty bit, the more complex eviction, and the fact that the lower level is not up to date (which matters for I/O and multiprocessors).

On a write miss, a **write-allocate** cache fetches the block and then writes into it, which suits write-back; a **no-write-allocate** cache writes around the cache to the lower level, which suits write-through. Almost all L1 data caches today are write-back with write-allocate.

::: warning Local and global miss rates
When comparing L2 caches, or calculating memory traffic, make sure you know which miss rate you have. An L2 with a "$40\,\%$ miss rate" behind an L1 with a $4\,\%$ miss rate sends $1.6\,\%$ of all accesses to memory, not $40\,\%$. Conversely, plugging a global L2 miss rate into [[#eq-amat2]], which needs the local one, underestimates the AMAT badly.
:::

::: quiz
A 2-way set-associative cache of $8\,\mathrm{KiB}$ with $32$-byte blocks serves 32-bit addresses. How many bits does each tag have?
- [ ] $18$
- [x] $20$
- [ ] $21$
- [ ] $27$
::: solution
Lines: $8192/32 = 256$; sets: $256/2 = 128$, so $7$ index bits; offset $\log_2 32 = 5$ bits. Tag: $32 - 7 - 5 = 20$ bits.
:::
:::

## Caches and processor performance

Memory stalls add to the CPI of [[computer-architecture/pipelining#eq-cpi-stalls]]. Every instruction is fetched (one instruction-cache access) and a fraction of instructions are loads or stores (data-cache accesses):

$$
\text{CPI} = \text{CPI}_{\text{base}} + \frac{\text{memory accesses}}{\text{instruction}}\times m \times P ,
$$ {#eq-cpi-mem}

with separate terms for instruction and data caches if their miss rates differ.

::: example Memory stalls in the CPI {#ex-cpimem}
A processor has a base CPI of $1.1$ with perfect caches. Its L1 instruction cache misses on $2\,\%$ of fetches and its L1 data cache on $5\,\%$ of accesses; $30\,\%$ of instructions are loads or stores. Misses go to the L2 and memory of [[#ex-amat]]: L2 hit $12$ cycles, local miss rate $20\,\%$, memory $200$ cycles. The processor stalls for the whole miss penalty. Find the CPI, and the CPI without the L2.
::: solution
The L1 miss penalty is the L2's average access time, $12 + 0.2\times 200 = 52$ cycles. L1 misses per instruction: $1\times 0.02 + 0.30\times 0.05 = 0.035$. By [[#eq-cpi-mem]],

$$
\text{CPI} = 1.1 + 0.035\times 52 = 1.1 + 1.82 = 2.92 .
$$

Without the L2, the penalty is $200$ cycles: $\text{CPI} = 1.1 + 0.035\times 200 = 8.1$. With the L2, the processor still spends $62\,\%$ of its time ($1.82/2.92$) waiting for memory, and without it $86\,\%$. This is why real processors do not simply stall on a miss: out-of-order execution and **non-blocking caches** let independent instructions continue while several misses are outstanding ([[computer-architecture/parallel-architectures]]), and hardware **prefetchers** fetch blocks before they are requested by detecting sequential and strided access patterns.
:::
:::

### Choosing the block size

Larger blocks exploit spatial locality and reduce compulsory misses, but for a fixed cache size they mean fewer blocks, so capacity and conflict misses eventually rise. They also take longer to transfer: if memory has latency $L$ cycles and delivers $W$ bytes per cycle, the miss penalty is $P(B) = L + B/W$.

::: example Choosing a block size {#ex-blocksize}
For a $16\,\mathrm{KiB}$ cache, a benchmark shows miss rates of $8.0\,\%$, $5.0\,\%$, $3.5\,\%$, $3.0\,\%$ and $3.2\,\%$ for block sizes $16$, $32$, $64$, $128$ and $256$ bytes. The hit time is $1$ cycle, the memory latency $80$ cycles and the bandwidth $16$ bytes per cycle. Which block size minimises the AMAT?
::: solution
$\text{AMAT}(B) = 1 + m(B)\,(80 + B/16)$:

| $B$ (bytes) | $m$ | $P$ (cycles) | AMAT (cycles) |
|---|---|---|---|
| 16 | 0.080 | 81 | 7.48 |
| 32 | 0.050 | 82 | 5.10 |
| 64 | 0.035 | 84 | 3.94 |
| 128 | 0.030 | 88 | 3.64 |
| 256 | 0.032 | 96 | 4.07 |

The best block size is $128$ bytes. The lowest *miss rate* and the lowest *AMAT* happen to coincide here, but in general they need not: with lower memory bandwidth the longer transfer time would favour $64$-byte blocks. Most processors use $64$-byte lines for L1 and L2, a compromise also driven by the burst length of DRAM.
:::
:::

::: intuition Why caches work so well
A $32\,\mathrm{KiB}$ L1 cache holds about one millionth of a $32\,\mathrm{GiB}$ main memory, yet it serves well over $90\,\%$ of accesses. The reason is that at any moment a program works on a small **working set**: the instructions of the current loop and functions, the top of the stack, the parts of arrays being traversed. The working set changes slowly compared with the rate of accesses, so each block brought in is used many times before it is evicted. When a program's working set does not fit — a large hash table probed at random, a matrix traversed in the wrong order — hit rates collapse, and the program may run ten times slower on the same hardware.
:::

A bigger cache is not automatically better, because its hit time grows: longer word lines and bit lines, more decoding, and a larger multiplexer. A common empirical rule says that the miss rate falls roughly as $1/\sqrt{C}$ — doubling the cache divides the miss rate by about $\sqrt2$ — while the hit time grows roughly with $\log_2 C$. The figure combines the two into a simple model.

::: widget plot
f: s*x + m0*2^(-a*(x - 5))*P
x: 2, 12
y: 0, 12
sliders: s=0.5:0:1.5:0.1; m0=0.05:0.01:0.2:0.01; a=0.5:0.2:1:0.05; P=50:10:300:10
labels: \text{AMAT (cycles)}
caption: A model of AMAT against cache size, with $x = \log_2(C/1\,\mathrm{KiB})$ on the horizontal axis ($x = 5$ is $32\,\mathrm{KiB}$, $x = 10$ is $1\,\mathrm{MiB}$). The hit time is $s\,x$ cycles and the miss rate $m_0\,2^{-a(x-5)}$, so $a = 0.5$ is the square-root rule; $P$ is the miss penalty. With the defaults the best size is around $64$–$128\,\mathrm{KiB}$. Raise the miss penalty and the optimum moves to larger caches — the reason for building a hierarchy of several cache levels, each larger and slower than the one before, rather than one huge cache.
:::

## Virtual memory

Main memory itself acts as a cache for storage, and the same ideas, with very different parameters, give **virtual memory**. Each program runs in its own **virtual address space**; the hardware translates every virtual address it issues into a **physical address** in DRAM, and the operating system decides which virtual pages are resident in physical memory. Virtual memory provides three things at once:

- **Isolation and protection**: one program cannot read or corrupt another's memory, because it has no virtual address that translates to the other's pages.
- **Relocation and sharing**: programs are compiled for the same virtual addresses wherever they end up physically, and pages such as library code can be mapped into many address spaces.
- **The illusion of a large memory**: pages not recently used can be kept on storage and brought in on demand.

::: definition Paging and page tables {#def-paging}
In a **paged** virtual memory, virtual and physical address spaces are divided into **pages** of $2^p$ bytes (commonly $4\,\mathrm{KiB}$, $p = 12$). A virtual address is split into a **virtual page number** (VPN), its high bits, and a **page offset**, its low $p$ bits. A **page table**, maintained by the operating system in memory, maps each VPN to a **page table entry** (PTE) holding a physical page number (PPN) and status bits: valid, readable, writable, executable, user-accessible, accessed and dirty. The physical address is the PPN followed by the unchanged page offset. An access to a page whose PTE is not valid, or that violates its permissions, raises a **page fault** exception handled by the operating system.
:::

The parameters differ from those of caches because the miss penalty is so large: a page fault that must read the page from an SSD costs tens of microseconds, around $10^5$ processor cycles. So pages are large (to amortise the transfer), placement is fully associative (any virtual page can go in any physical page), replacement is done by the operating system with an LRU approximation, and writes are always write-back. The policies are described in [Swapping and page replacement](/learn/cs/lesson.php?c=operating-systems&l=page-replacement).

### Page table organisation

A flat page table for a 32-bit address space with $4\,\mathrm{KiB}$ pages and $4$-byte PTEs would have $2^{20}$ entries — $4\,\mathrm{MiB}$ per process, most of it describing addresses the process never uses. Real systems use **multi-level** (hierarchical) page tables, in which the VPN is split into several fields, each indexing a table at one level, and tables for unused regions are simply omitted.

RISC-V's **Sv32** scheme (for RV32) splits the 20-bit VPN into two 10-bit fields: the first indexes a $1024$-entry root table, whose PTE points to a $1024$-entry second-level table, whose PTE gives the physical page. Each table is exactly one $4\,\mathrm{KiB}$ page. **Sv39** for RV64 uses three levels of 9 bits with 8-byte PTEs, giving a 39-bit ($512\,\mathrm{GiB}$) virtual address space; Sv48 and Sv57 add a fourth and fifth level. The hardware **page-table walker** follows the levels from the root, whose physical address is held in the `satp` register.

::: example Page tables for a small process {#ex-pagetable}
Under Sv32, a process uses $8\,\mathrm{MiB}$ of code and data starting at virtual address `0x00000000` and $1\,\mathrm{MiB}$ of stack just below `0x80000000`. How much memory do its page tables occupy, compared with a flat page table?
::: solution
One second-level table ($1024$ PTEs of $4\,\mathrm{KiB}$ pages) maps $4\,\mathrm{MiB}$. The code and data need $8/4 = 2$ second-level tables; the stack lies within one $4\,\mathrm{MiB}$ region and needs one more. With the root table, that is $4$ tables of $4\,\mathrm{KiB}$: $16\,\mathrm{KiB}$, against $4\,\mathrm{MiB}$ for a flat table — $256$ times less.
:::
:::

### Translation look-aside buffers

A page-table walk costs one memory access per level. If every load and store needed two or three extra memory accesses for translation, virtual memory would be unaffordable. Translations are therefore cached in a **translation look-aside buffer** (TLB): a small, usually fully associative or highly associative cache whose tags are VPNs and whose data are PTEs. Typical L1 TLBs have $32$ to $128$ entries, backed by an L2 TLB of one or two thousand. Because of locality — a $4\,\mathrm{KiB}$ page holds a thousand words — TLB hit rates are typically above $99\,\%$.

The **reach** of a TLB is the amount of memory it can map at once: entries × page size. A $64$-entry TLB with $4\,\mathrm{KiB}$ pages reaches only $256\,\mathrm{KiB}$, less than an L2 cache; this is why processors support **huge pages** ($2\,\mathrm{MiB}$ and $1\,\mathrm{GiB}$ in x86-64 and RISC-V Sv39), which let the same $64$ entries reach $128\,\mathrm{MiB}$.

::: example The cost of TLB misses {#ex-tlb}
A processor with Sv39 translation has a TLB miss rate of $1\,\%$ per memory access. Each of the three levels of a page walk costs $100$ cycles if it goes to DRAM. What does translation add to the AMAT? How does the answer change if the page-table entries are usually found in the L2 cache ($12$ cycles)?
::: solution
With every level from DRAM: $0.01\times 3\times 100 = 3$ cycles per access — almost doubling the AMAT of [[#ex-amat]]. If PTEs hit in the L2: $0.01\times 3\times 12 = 0.36$ cycles. In practice page-walk caches hold the upper levels of the table, so most walks need only the last level from the cache hierarchy, and the cost is lower still.
:::
:::

### Caches and translation together

Translation must happen before the cache can compare a physical tag, which would add the TLB lookup to every hit time. Most L1 caches avoid this by being **virtually indexed, physically tagged** (VIPT): they use bits of the address that are not changed by translation — the page offset — to index the cache, so the set can be read *while* the TLB translates the page number; the physical tag from the TLB is then compared with the tags read from the set.

::: proposition The VIPT size limit {#prop-vipt}
A virtually indexed, physically tagged cache behaves exactly like a physically indexed cache if its index and offset bits lie within the page offset, that is, if

$$
\frac{C}{A} \le 2^p ,
$$

the size of one way of the cache is at most one page.
:::

::: proof
The index and offset together occupy the low $\log_2(S\cdot B) = \log_2(C/A)$ bits of the address. If $C/A \le 2^p$ these bits are inside the page offset, which is identical in the virtual and physical addresses. So the set selected with the virtual address is the set the physical address would select, and the physical-tag comparison decides the hit exactly as in a physically addressed cache. If $C/A > 2^p$, some index bits come from the VPN; two virtual addresses mapping to the same physical address (a shared page) could then select different sets, and the same data could be cached twice — the **aliasing** problem.
:::

With $4\,\mathrm{KiB}$ pages this limits an 8-way L1 cache to $32\,\mathrm{KiB}$ and a 12-way one to $48\,\mathrm{KiB}$ — exactly the sizes found in many processors as of 2026. Apple's processors use $16\,\mathrm{KiB}$ pages, which permits their larger L1 caches.

::: quiz
Why are pages so much larger than cache blocks?
- [ ] because DRAM cannot transfer small blocks
- [x] because the miss penalty of a page fault is enormous, and a large transfer amortises the access latency of storage
- [ ] because the TLB requires it
- [ ] because the page offset must equal the cache block offset
::: solution
A page fault costs tens of microseconds, almost all of it latency before the first byte arrives. Transferring $4\,\mathrm{KiB}$ instead of $64\,\mathrm{B}$ costs little extra time, and spatial locality makes the extra data useful. Large pages also keep page tables and TLBs small.
:::
:::

::: application Memory systems in 2026
A desktop or server processor core in 2026 typically has $32$–$64\,\mathrm{KiB}$ L1 instruction and data caches ($4$–$5$ cycles), a private L2 of $1$–$3\,\mathrm{MiB}$ (about $12$–$17$ cycles), and a share of an L3 of tens of megabytes ($40$–$80$ cycles), with DRAM $300$–$500$ cycles away. DDR5 memory transfers up to about $6400$ million transfers per second on a 64-bit channel, $51.2\,\mathrm{GB/s}$, and servers have eight or twelve channels per socket. GPUs and AI accelerators use **high-bandwidth memory** (HBM), DRAM dies stacked beside the processor with a 1024-bit interface per stack, delivering over $1\,\mathrm{TB/s}$ per stack. Some processors stack extra SRAM cache dies directly on the processor die. The gap between processor speed and memory latency — the "memory wall" — remains the most important constraint in computer design.
:::

::: history
The first cache memory in a commercial computer was the $16$–$32\,\mathrm{KiB}$ "buffer storage" of the IBM System/360 Model 85, delivered in 1969; Maurice Wilkes had described the idea of a fast "slave memory" in 1965. Virtual memory is older: the Atlas computer of the University of Manchester and Ferranti (1962), designed by Tom Kilburn and colleagues, introduced paging with what it called a "one-level store", and Peter Denning formulated the working-set model in 1968. Mark Hill classified misses into compulsory, capacity and conflict in his 1987 Berkeley thesis. The DRAM cell with one transistor and one capacitor was invented by Robert Dennard at IBM in 1966 (patented 1968), and Intel's 1103 of 1970 was the first commercially successful DRAM chip.
:::

## Where this leads

Caches complicate input and output: a device that writes memory directly may leave stale copies in a cache, which is one of the problems of [[computer-architecture/input-output]]. [[computer-architecture/performance]] puts the memory-stall term of [[#eq-cpi-mem]] into the general performance equation. In a multicore processor several caches hold copies of the same block, and keeping them consistent — cache coherence — is a central topic of [[computer-architecture/parallel-architectures]]. The SRAM arrays that make up caches are designed at circuit level in [[digital-ic/memory-arrays]].

::: summary
- A memory hierarchy exploits temporal and spatial locality ([[#def-locality]]) to give a memory nearly as fast as its smallest level and as large as its largest.
- AMAT $= t_h + mP$, applied recursively for several levels ([[#thm-amat]]); distinguish local from global miss rates.
- A cache of $S$ sets of $A$ lines of $B$ bytes splits addresses into tag, index and offset ([[#prop-fields]]); direct-mapped, set-associative and fully associative caches trade hit time against conflict misses.
- Misses are compulsory, capacity or conflict; replacement is LRU or an approximation; L1 data caches are usually write-back with write-allocate.
- Memory stalls add (accesses per instruction) × miss rate × penalty to the CPI ([[#eq-cpi-mem]]); the best block size balances miss rate against transfer time.
- Virtual memory translates virtual pages to physical pages through multi-level page tables ([[#def-paging]]), with TLBs caching translations.
- A VIPT L1 cache can be indexed during translation if one way is no larger than a page ([[#prop-vipt]]).
:::

## Exercises

::: exercise Address fields {level=1}
A $64\,\mathrm{KiB}$ direct-mapped cache has $32$-byte blocks and 32-bit addresses. How many bits are in the offset, index and tag?
::: solution
Offset $\log_2 32 = 5$. Lines $= 65536/32 = 2048$, all separate sets: index $11$ bits. Tag $32 - 11 - 5 = 16$ bits.
:::
:::

::: exercise A simple AMAT {level=1 check="6"}
A cache has a hit time of $2$ cycles, a miss rate of $4\,\%$ and a miss penalty of $100$ cycles. What is its AMAT in cycles?
::: solution
$\text{AMAT} = 2 + 0.04\times 100 = 6$ cycles.
:::
:::

::: exercise Counting sets {level=1 check="1024"}
How many sets does a $1\,\mathrm{MiB}$, 16-way set-associative cache with $64$-byte lines have?
::: solution
$S = C/(A\cdot B) = 2^{20}/(16\times 64) = 2^{20}/2^{10} = 1024$.
:::
:::

::: exercise Tracing a cache {level=2}
A direct-mapped cache has $8$ lines of $8$ bytes. Starting empty, it receives reads to byte addresses $0, 8, 64, 0, 72, 8, 128, 4$. Show the index and tag of each access and whether it hits.
::: solution
Block address $b = \lfloor a/8 \rfloor$, index $= b \bmod 8$, tag $= \lfloor b/8\rfloor$.

| address | $b$ | index | tag | result |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | miss |
| 8 | 1 | 1 | 0 | miss |
| 64 | 8 | 0 | 1 | miss (evicts tag 0 from line 0) |
| 0 | 0 | 0 | 0 | miss (evicts tag 1) |
| 72 | 9 | 1 | 1 | miss (evicts tag 0 from line 1) |
| 8 | 1 | 1 | 0 | miss (evicts tag 1) |
| 128 | 16 | 0 | 2 | miss (evicts tag 0) |
| 4 | 0 | 0 | 0 | miss (evicts tag 2) |

No hits at all: the addresses are multiples of $64$ bytes apart, the cache size, so they collide in lines $0$ and $1$. A 2-way cache of the same size (4 sets) would hit on the 4th, 6th and 8th accesses.
:::
:::

::: exercise Traversing a matrix {level=2}
A $1024\times 1024$ matrix of 8-byte `double`s is stored in row-major order (rows contiguous). A program sums all elements, once row by row and once column by column. The data cache is $32\,\mathrm{KiB}$ with $64$-byte lines. Estimate the miss rate of each traversal.
::: solution
*Row by row*: consecutive accesses are $8$ bytes apart, so each $64$-byte line serves $8$ accesses: one miss, then seven hits. Miss rate $1/8 = 12.5\,\%$ (less with a prefetcher).

*Column by column*: consecutive accesses are $8192$ bytes apart (one row), each in a different line. Before the program returns to the next element of a line — after a whole column of $1024$ accesses — it has touched $1024$ lines, $64\,\mathrm{KiB}$ of lines, twice the cache. With LRU replacement all are evicted, and every access misses: about $100\,\%$. The same arithmetic, eight times as many misses — the reason loop order matters so much (see [The memory hierarchy and caches](/learn/cs/lesson.php?c=computer-systems&l=memory-hierarchy)).
:::
:::

::: exercise Write traffic {level=2}
A program executes $10^9$ instructions, of which $10\,\%$ are 4-byte stores, on a processor with a data cache with $64$-byte lines. Compare the bytes written to the next level by (a) a write-through cache and (b) a write-back cache in which $2\times 10^6$ dirty lines are evicted during the run.
::: solution
(a) Every store goes through: $10^8 \times 4 = 4\times 10^8$ bytes ($400\,\mathrm{MB}$).

(b) Only evicted dirty lines are written: $2\times 10^6\times 64 = 1.28\times 10^8$ bytes ($128\,\mathrm{MB}$), about a third — and the stores that hit dirty lines cost nothing. The advantage of write-back grows with temporal locality of writes, for example in a loop that updates the same variables repeatedly.
:::
:::

::: exercise Page table size {level=2 check="16384"}
Under Sv32 ($4\,\mathrm{KiB}$ pages, two levels of $1024$ four-byte entries), a process uses $12\,\mathrm{MiB}$ of contiguous memory starting at virtual address $0$, and nothing else. How many bytes do its page tables occupy?
::: solution
Each second-level table maps $4\,\mathrm{MiB}$, so $12\,\mathrm{MiB}$ needs $3$ tables, plus the root: $4\times 4\,\mathrm{KiB} = 16\,384$ bytes.
:::
:::

::: exercise Designing a cache for a CPI target {level=3}
A processor has base CPI $1.0$, $1.35$ memory accesses per instruction (all fetches plus $0.35$ data accesses) and a memory latency of $150$ cycles. With no L2 it needs a combined L1 miss rate of $m_1$. (a) What $m_1$ gives CPI $\le 1.5$ without an L2? (b) With $m_1 = 3\,\%$, an L2 with a hit time of $10$ cycles is added. What local L2 miss rate $m_2$ meets the target?
::: solution
(a) $1.0 + 1.35\,m_1\times 150 \le 1.5 \Rightarrow m_1 \le 0.5/202.5 = 0.247\,\%$ — unrealistically low for an L1 cache.

(b) $1.0 + 1.35\times 0.03\times(10 + 150\,m_2) \le 1.5 \Rightarrow 0.0405(10 + 150\,m_2) \le 0.5 \Rightarrow 10 + 150\,m_2 \le 12.35 \Rightarrow m_2 \le 1.56\,\%$. That is a demanding local miss rate for an L2; in practice one adds an L3, or relies on out-of-order execution to overlap misses, since the stall-on-miss model is pessimistic.
:::
:::

::: exercise The VIPT limit {level=3}
A designer wants a $64\,\mathrm{KiB}$ L1 data cache for a processor with $4\,\mathrm{KiB}$ pages, indexed in parallel with the TLB lookup. (a) What associativity does [[#prop-vipt]] require? (b) Suggest two other ways to obtain a large VIPT cache, with their costs.
::: solution
(a) $C/A \le 4096 \Rightarrow A \ge 65536/4096 = 16$: a 16-way cache, with $16$ tag comparators and a 16-way data multiplexer, which costs hit time and energy on every access.

(b) Use larger pages ($16\,\mathrm{KiB}$ pages permit a 4-way $64\,\mathrm{KiB}$ cache), at the cost of more internal fragmentation and incompatibility with software that assumes $4\,\mathrm{KiB}$ pages. Or allow index bits from the VPN and handle aliases in hardware — for example by checking the other possible sets on a miss, or by having the operating system colour pages so that aliases always share those bits — at the cost of complexity.
:::
:::

::: exercise Global miss rate and traffic {level=3}
Prove that the global miss rate of the last level of a hierarchy of $k$ caches with local miss rates $m_1, \dots, m_k$ is $\prod_i m_i$, and generalise [[#eq-amat2]] to $k$ levels. For $k = 3$ with $t = (4, 14, 50)$ cycles, $m = (0.05, 0.3, 0.4)$ and memory $300$ cycles, compute the AMAT.
::: solution
An access reaches level $i + 1$ only if it missed in levels $1$ to $i$. Of the accesses reaching level $i$, a fraction $m_i$ miss; so by induction the fraction of all accesses reaching level $i+1$ is $m_1 m_2\cdots m_i$, and the fraction missing in all $k$ levels is $\prod_{i=1}^k m_i$.

The AMAT is the sum over levels of (time at that level) × (fraction of accesses reaching it):

$$
\text{AMAT} = t_1 + m_1 t_2 + m_1m_2 t_3 + \dots + \Bigl(\prod_{i=1}^{k} m_i\Bigr)t_{\text{mem}},
$$

which for $k = 2$ is [[#eq-amat2]] expanded. For the numbers given: $4 + 0.05\times 14 + 0.05\times 0.3\times 50 + 0.05\times 0.3\times 0.4\times 300 = 4 + 0.7 + 0.75 + 1.8 = 7.25$ cycles. The global L3 miss rate is $0.6\,\%$, yet those accesses contribute a quarter of the AMAT.
:::
:::
