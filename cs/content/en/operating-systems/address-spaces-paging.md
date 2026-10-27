Compile a C program, run two copies of it at once, and print the address of a global variable in each: both print the same number. Yet when one copy changes the variable, the other does not see the change. The two programs use the same *address* for two different pieces of memory. This is possible because the addresses a program uses are not the addresses of memory chips at all: they are **virtual addresses**, translated on every single load, store and instruction fetch into **physical addresses** by hardware that the operating system configures.

This translation is the second great virtualisation of the operating system, after the processor ([[operating-systems/processes-scheduling]]). It gives each process the illusion of a large, private memory starting at address zero; it isolates processes from one another and the kernel from all of them; and, as the next chapter shows, it lets the system use more memory than it physically has. The price is that every memory reference needs a translation, and the translation must be very fast and must not itself need much memory.

This chapter develops the mechanisms in the order they were invented, because each fixes a defect of the previous one: base-and-bounds relocation, segmentation, paging, multi-level page tables, and the **translation lookaside buffer** (TLB), the cache that makes paging fast. [[computer-systems/memory-hierarchy]] sketched virtual memory as "DRAM as a cache for the disk" and gave the x86-64 numbers; here we work out how and why the design looks the way it does, prove its basic cost formulas, and measure the TLB on a real machine. Policy — what to do when memory runs out — is the subject of [[operating-systems/page-replacement]].

## The address space

::: definition Address space {#def-address-space}
The **address space** of a process is the set of virtual addresses it may use, together with what each refers to and with which permissions (read, write, execute). On Linux, an address space consists of **regions** (virtual memory areas): the program's code and read-only data, its initialised and uninitialised data, the heap, memory-mapped files and shared libraries, and the stack for each thread. Unused gaps between regions are not part of the address space, and any reference to them is a fault.
:::

Linux shows the regions of a process in `/proc/<pid>/maps` (the layout was described in [[computer-systems/c-programming]] and [[computer-systems/linking-loading]]). A process can see its own:

```console
$ cat /proc/self/maps | head -5
61ea1621e000-61ea16312000 r--p 00000000 00:34 5597191     /usr/lib/cargo/bin/coreutils/cat
61ea16312000-61ea167e2000 r-xp 000f4000 00:34 5597191     /usr/lib/cargo/bin/coreutils/cat
61ea167e2000-61ea16bf4000 r--p 005c4000 00:34 5597191     /usr/lib/cargo/bin/coreutils/cat
61ea16bf4000-61ea16d5a000 r--p 009d6000 00:34 5597191     /usr/lib/cargo/bin/coreutils/cat
61ea16d5a000-61ea16d60000 rw-p 00b3c000 00:34 5597191     /usr/lib/cargo/bin/coreutils/cat
```

Each line is a region: start and end addresses, permissions (`r-xp` is readable, executable, private), the offset in the file, the device and inode, and the file it maps — here the `cat` program itself (on the test machine, the Rust reimplementation of the core utilities), whose code region is the only executable one. The addresses differ from run to run because of address-space layout randomisation. A virtualised memory system must meet three goals:

- **Transparency**: a program is written as if it had the memory to itself; it does not know where in physical memory it is.
- **Protection**: a process cannot touch memory outside its own address space — another process's, or the kernel's.
- **Efficiency**: translation must add little time to each reference and little memory per process.

## Base and bounds

The simplest hardware that achieves transparency and protection is a pair of registers.

::: definition Base-and-bounds relocation {#def-base-bounds}
In **dynamic relocation** with base and bounds, the processor has two privileged registers, **base** $B$ and **bounds** $L$. For every virtual address $v$ issued in user mode, the hardware checks $0 \le v < L$ and, if so, uses the physical address $p = B + v$; otherwise it raises a fault. On a context switch the kernel saves and restores $B$ and $L$ in the process control block.
:::

For example, a process loaded at physical address $0x8000$ (32 KiB) with a 16 KiB address space has $B = 0x8000$ and $L = 0x4000$. Its virtual address $0x1234$ becomes physical $0x8000 + 0x1234 = 0x9234$; virtual address $0x5000$ is beyond the bounds and faults. The kernel can move the process — copy its memory elsewhere and change $B$ — without the program noticing.

Base and bounds is cheap (one comparison and one addition) and secure, given that only the kernel can change the registers ([[operating-systems/os-structure#prop-protection]]). But it wastes memory. The address space must be contiguous in physical memory, *including the unused space between the heap and the stack*, which in a 64-bit program may be terabytes. And because processes occupy variable-sized contiguous chunks, free physical memory fragments into holes too small to use — the **external fragmentation** that [[computer-systems/dynamic-memory]] analysed for `malloc`.

## Segmentation

**Segmentation** generalises base and bounds to one pair per logical region. The address space is divided into **segments** — code, heap, stack — each with its own base, bounds and permissions; a virtual address names a segment and an offset within it.

::: example Translating with segments {#ex-segments}
A machine has 16-bit virtual addresses whose top two bits select the segment and whose low 14 bits are the offset. The segment table is:

| segment | bits | base | size | grows | permissions |
|---|---|---|---|---|---|
| code | 00 | $0x20000$ | $0x0800$ | up | read, execute |
| heap | 01 | $0x34000$ | $0x1000$ | up | read, write |
| stack | 11 | $0x58000$ | $0x0800$ | down | read, write |

Translate the reads of $0x0123$, $0x4FFF$ and $0xFF00$, and a write of $0x0010$.
::: solution
$0x0123 = 00\,00000100100011_2$: segment 00 (code), offset $0x123 < 0x800$, physical $0x20000 + 0x123 = 0x20123$; reading code is allowed.

$0x4FFF = 01\,00111111111111_2$: segment 01 (heap), offset $0x0FFF < 0x1000$, physical $0x34000 + 0xFFF = 0x34FFF$.

$0xFF00 = 11\,11111100000000_2$: segment 11 (stack), offset $0x3F00$. The stack grows downwards, so its offsets count down from the top of the 16 KiB ($2^{14}$-byte) segment space: the negative offset is $0x3F00 - 0x4000 = -0x100$, whose magnitude $0x100$ is within the size $0x800$, and the physical address is base $+$ negative offset $= 0x58000 - 0x100 = 0x57F00$ (the stack occupies $[0x57800, 0x58000)$).

The write to $0x0010$ is in the code segment, which is not writable: a **protection fault**, reported to the program as `SIGSEGV` — the origin of the name "segmentation fault".
:::
:::

Segmentation removes the waste between heap and stack and lets processes share segments (one copy of a library's code, mapped read-only into many address spaces). But segments are still variable-sized, contiguous chunks of physical memory, so external fragmentation remains, and a segment that grows may have to be moved. x86 processors kept segmentation from the 8086 (1978) onwards, but 64-bit mode disables it almost entirely: base addresses are zero and limits are ignored except for the `%fs` and `%gs` registers, whose bases point at thread-local storage (`%fs`, in user programs) and at per-CPU kernel data (`%gs`).

## Paging

The cure for external fragmentation is to make every allocation the same size. **Paging** divides the virtual address space into fixed-size **pages** and physical memory into **frames** of the same size, and maps each page independently to any frame.

::: definition Paging {#def-paging}
With pages of $2^p$ bytes, a $v$-bit virtual address is split into a **virtual page number** (VPN), its top $v - p$ bits, and a $p$-bit **offset**. A **page table** maps each VPN to a **page-table entry** (PTE) holding a **physical frame number** (PFN) and control bits. The physical address is the PFN followed by the unchanged offset:

$$
\text{VA} = (\text{VPN}, \text{offset}) \;\longmapsto\; \text{PA} = (\text{PTE}[\text{VPN}].\text{PFN}, \text{offset}).
$$

The most important control bits are: **present** (valid) — if clear, any access faults; **writable**; **user** (accessible in user mode, not only kernel mode); **no-execute** (NX); **accessed**, set by hardware on every access; and **dirty**, set by hardware on every write.
:::

Paging has no external fragmentation: any free frame will do for any page. It has **internal fragmentation** instead — on average half a page wasted at the end of each region — which, with 4 KiB pages, is small. Pages make sharing and protection fine-grained: a page can be read-only in one process and writable in another, and the kernel's pages are mapped into every address space without the user bit, so they are invisible to user code. The accessed and dirty bits are the hardware's contribution to page replacement ([[operating-systems/page-replacement]]).

Two processes printing the same address for a global variable now make sense: the same VPN in two address spaces is looked up in two different page tables and lands in two different frames.

### How big is a page table?

The simplest page table is an array indexed by VPN — a **linear page table**.

::: proposition Size of a linear page table {#prop-linear-size}
A linear page table for $v$-bit virtual addresses, $2^p$-byte pages and $e$-byte entries occupies $2^{v - p} \cdot e$ bytes per process, whatever the process actually uses.
:::

::: proof
There is one entry per virtual page, and there are $2^v / 2^p = 2^{v - p}$ virtual pages; each entry occupies $e$ bytes.
:::

For a 32-bit address space with 4 KiB pages and 4-byte entries this is $2^{20} \times 4$ bytes $= 4$ MiB per process — already uncomfortable with a hundred processes on a 1990s machine. For x86-64's 48-bit virtual addresses with 8-byte entries it is $2^{36} \times 8 = 2^{39}$ bytes $= 512$ GiB per process: impossible. Yet almost all of the table is empty, because address spaces are **sparse**: a typical process uses a few megabytes of code and heap near the bottom and a stack near the top, with a vast unused hole between.

## Multi-level page tables

The fix is to apply paging to the page table itself: split it into page-sized pieces, and do not allocate pieces that would contain only invalid entries. A small **page directory** records which pieces exist.

::: definition Multi-level page table {#def-multilevel}
In a $k$-level page table, the VPN is split into $k$ indices $i_1, \dots, i_k$. The root table (whose physical address is held in a privileged register — `%cr3` on x86-64) is indexed by $i_1$; its entry gives the physical frame of a second-level table, indexed by $i_2$; and so on, until the $k$-th level entry gives the PFN of the data page. A missing entry at any level means that the whole range of addresses below it is unmapped, and no tables are allocated for it. Each table occupies exactly one page.
:::

On x86-64 with 4 KiB pages, a 48-bit address splits into four 9-bit indices and a 12-bit offset ($48 = 4 \times 9 + 12$): each table has $2^9 = 512$ eight-byte entries, exactly 4 KiB. Intel calls the levels PML4, page-directory-pointer table, page directory and page table. Five-level paging, on processors that support it, adds a fifth index for 57-bit addresses. A 32-bit x86 without extensions uses two levels with 10-bit indices and 4-byte entries.

::: algorithm Page-table walk {#alg-walk}
Input: a virtual address $\text{va}$ and the root table's physical address $r$; the access type (read, write, fetch; user or kernel).

1. $t \gets r$.
2. For $\ell = 1, \dots, k$:
   1. $\text{pte} \gets$ the entry at index $i_\ell(\text{va})$ of the table at $t$ (one memory read).
   2. If $\text{pte}$ is not present, or forbids the access, raise a page fault with $\text{va}$ and the reason.
   3. $t \gets \text{pte}.\text{PFN} \times 2^p$.
3. Return $t + \text{offset}(\text{va})$.
:::

::: example Walking a toy two-level table {#ex-toy-walk}
Implement [[#alg-walk]] for 32-bit addresses with two levels of 10-bit indices and 4 KiB pages, and use it to translate five addresses in a small address space: two code pages (read-only), one data page and one stack page at the top of memory.
::: solution
A few lines of Python suffice, and show the three outcomes a real walk can have: a physical address, a page fault, or a protection fault.

```python
# A toy two-level page table for 32-bit addresses: 10-bit directory index,
# 10-bit table index, 12-bit offset. Tables are dicts; a PTE is (frame, writable).
PAGE = 4096

def translate(directory, va, write=False):
    d, t, off = va >> 22, (va >> 12) & 0x3FF, va & 0xFFF
    table = directory.get(d)
    if table is None:
        raise LookupError(f"page fault: no page table for directory entry {d}")
    pte = table.get(t)
    if pte is None:
        raise LookupError(f"page fault: entry {t} of table {d} not present")
    frame, writable = pte
    if write and not writable:
        raise PermissionError("protection fault: page is read-only")
    return frame * PAGE + off

directory = {
    0x001: {0x000: (0x2A5, False), 0x001: (0x2A6, False)},   # code, read-only
    0x002: {0x3FF: (0x013, True)},                            # data
    0x3FF: {0x3FF: (0x7C0, True)},                            # stack, top of memory
}
for va, w in [(0x00400ABC, False), (0x00BFF010, True), (0xFFFFF004, True),
              (0x00401000, True), (0x00C00000, False)]:
    try:
        print(f"{va:#010x} -> {translate(directory, va, w):#010x}")
    except (LookupError, PermissionError) as e:
        print(f"{va:#010x} -> {e}")
```

```console
$ python3 walk.py
0x00400abc -> 0x002a5abc
0x00bff010 -> 0x00013010
0xfffff004 -> 0x007c0004
0x00401000 -> protection fault: page is read-only
0x00c00000 -> page fault: no page table for directory entry 3
```

The whole 4 GiB address space is described by one directory and three tables — $4$ pages, $16$ KiB — instead of a 4 MiB linear table.
:::
:::

::: widget graph
nodes: cr3@3,3; L4-0@1.5,2; L4-255@4.5,2; L3-a@1.5,1; L3-b@4.5,1; L2-a@1.5,0.5; L2-b@4.5,0.5; PT-code@0.5,0; PT-heap@2.5,0; PT-stack@4.5,0
edges: cr3>L4-0; cr3>L4-255; L4-0>L3-a; L4-255>L3-b; L3-a>L2-a; L3-b>L2-b; L2-a>PT-code; L2-a>PT-heap; L2-b>PT-stack
algorithm: bfs
start: cr3
caption: The page-table tree of the process in [[#ex-sparse]]: the root (PML4, pointed to by `%cr3`) has two valid entries out of 512 — one for the low addresses, one for the stack near the top of user space — and each path ends in a last-level page table. Step through breadth-first search: each level of the tree is one memory read in a walk ([[#alg-walk]]), so translating an address that misses in the TLB costs four reads. Notice how few nodes there are: every absent edge is $512$ GiB, $1$ GiB or $2$ MiB of address space that costs nothing.
:::

::: example Page tables of a sparse process {#ex-sparse}
A 64-bit process uses 8 pages of code at $0x400000$, 64 pages of heap at $0x600000$, and 34 pages of stack ending just below $0x7ffc00000000$. How many page-table pages does a four-level x86-64 table need? How does that compare with a linear table?
::: solution
A last-level table covers $512 \times 4$ KiB $= 2$ MiB; a page directory covers $512 \times 2$ MiB $= 1$ GiB; a PDPT covers $512$ GiB. Count the distinct prefixes:

- Last-level tables: code $[0x400000, 0x408000)$ lies in the 2 MiB block $0x400000 \gg 21 = 2$; heap $[0x600000, 0x640000)$ in block $3$; the stack in one block just below the 2 MiB-aligned address $0x7ffc00000000$. That is $3$ tables.
- Page directories: code and heap are both in the first gigabyte; the stack is in another. $2$ directories.
- PDPTs: code and heap in the first $512$ GiB; the stack, at about $128$ TiB, in entry $255$ of the PML4. $2$ PDPTs.
- One PML4.

Total $1 + 2 + 2 + 3 = 8$ pages $= 32$ KiB (a short Python loop over the pages confirms the counts), against $512$ GiB for a linear table. The tree's cost is proportional to the number of distinct regions times the depth, not to the size of the address space.
:::
:::

There is a cost. A walk makes one memory reference per level, so on a four-level machine *every* access would take five memory references — four for the walk and one for the data. That would make paging five times slower than no translation at all. The cure is a cache.

Before we get to it, one alternative deserves mention: an **inverted page table** has one entry per *physical frame*, recording which process and VPN occupy it, and is searched through a hash table. Its size is proportional to physical memory, not to the number of processes. PowerPC and IA-64 used hashed tables; they make sharing awkward (a frame can have only one owner in the table), and x86 and ARM use multi-level trees.

## The translation lookaside buffer

::: definition Translation lookaside buffer {#def-tlb}
A **translation lookaside buffer** (TLB) is a small, fast, usually highly associative cache, part of the MMU, that holds recently used translations: each entry maps a VPN (and, on many machines, an **address-space identifier**) to a PFN and its permission bits. On each memory reference the MMU looks up the VPN in the TLB. On a **TLB hit** it forms the physical address at once; on a **TLB miss** it walks the page table ([[#alg-walk]]), inserts the translation into the TLB, and retries.
:::

TLBs work for the same reason caches do: locality ([[computer-systems/memory-hierarchy#def-locality]]). One translation serves all $4096$ bytes of a page, so a loop scanning an array misses in the TLB once per page — once every $512$ eight-byte elements. The number of bytes a TLB can map at once, entries times page size, is its **reach**.

::: theorem Effective access time with a TLB {#thm-eat}
Let a TLB lookup take $\varepsilon$, a memory reference $m$, the hit ratio be $h$, and a miss require a $k$-level walk whose reads all go to memory. Then the average time of one memory reference is

$$
\text{EAT} = \varepsilon + m + (1 - h)\,k\,m .
$$ {#eq-eat}
:::

::: proof
Every reference pays the lookup $\varepsilon$ and the data reference $m$. A fraction $1 - h$ of references also performs the walk, $k$ further memory reads costing $m$ each. Averaging over references gives $\varepsilon + m + (1 - h)km$. This is the AMAT formula of [[computer-systems/memory-hierarchy#thm-amat]] with hit time $\varepsilon + m$ and miss penalty $km$. (In real processors, page-table entries are themselves cached in the data caches and in dedicated paging-structure caches, so the walk usually costs much less than $km$; the formula is a pessimistic model.)
:::

::: example How good must the hit ratio be? {#ex-eat}
Memory takes $m = 100$ ns, a TLB lookup $\varepsilon = 1$ ns, and a miss needs a four-level walk. What is the EAT with hit ratios of $99\%$ and $98\%$? What hit ratio keeps the slowdown relative to untranslated memory below $5\%$?
::: solution
By [[#eq-eat]]: with $h = 0.99$, $1 + 100 + 0.01 \times 4 \times 100 = 105$ ns; with $h = 0.98$, $1 + 100 + 0.02 \times 400 = 109$ ns. Without translation a reference takes $100$ ns, so these are slowdowns of $5\%$ and $9\%$. To keep it below $5\%$ we need $1 + 400(1 - h) < 5$, so $1 - h < 0.01$, $h > 99\%$. A program touching eight-byte elements sequentially misses once per $512$ references, $h \approx 99.8\%$ — comfortably there. A program jumping to a random page on every access can have $h$ near $0$.
:::
:::

::: widget plot
f: e + m + (1 - x)*k*m
x: 0.9, 1
y: 0, 300
sliders: m=100:50:150:5; k=4:1:5:1; e=1:0:5:0.5
labels: \text{EAT (ns)}
points: 0.99,105; 0.98,109
caption: Effective access time against the TLB hit ratio, from [[#eq-eat]], with a memory reference of $m$ ns, a $k$-level walk and lookup time $e$ ns. The dots are [[#ex-eat]]. Notice that the slope is $km$: every $1\%$ of misses costs $4$ ns per reference on a four-level machine with $100$ ns memory, as much as four L1 cache hits. Change $k$ to $5$ (five-level paging) and see the line steepen.
:::

### TLBs on a real machine

What happens when a program's pages exceed the TLB's reach can be measured. The program below allocates memory, links one cache line in each of $n$ pages into a random cycle, and follows it; each load depends on the previous one, so the time per step is the full latency of a reference. It does this twice, once with ordinary 4 KiB pages and once asking for 2 MiB **huge pages** with `madvise(MADV_HUGEPAGE)` (Linux's transparent huge pages are set to `madvise` mode on the test machine, so they are used only where asked for). The data touched are the same in both runs — the same number of cache lines — so the difference is translation.

```c
#define _DEFAULT_SOURCE                    /* madvise, MAP_ANONYMOUS */
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <time.h>

/* Chase pointers through one cache line in each of n pages, in random order. */
static double chase(char *mem, long n) {
    const long PG = 4096;
    long *perm = malloc(n * sizeof *perm);
    for (long i = 0; i < n; i++) perm[i] = i;
    srand(1);                                          /* same order every run */
    for (long i = n - 1; i > 0; i--) { long j = rand() % (i + 1), t = perm[i]; perm[i] = perm[j]; perm[j] = t; }
    for (long i = 0; i < n; i++)                       /* line (k/8 mod 64) of page k: spreads over cache sets */
        *(long *)(mem + perm[i] * PG + (perm[i] >> 3 & 63) * 64) = perm[(i + 1) % n];
    long p = perm[0], steps = 1 << 24;
    struct timespec t0, t1;
    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (long s = 0; s < steps; s++)                   /* each load depends on the last */
        p = *(long *)(mem + p * PG + (p >> 3 & 63) * 64);
    clock_gettime(CLOCK_MONOTONIC, &t1);
    free(perm);
    return (p == -1) + ((t1.tv_sec - t0.tv_sec) * 1e9 + (t1.tv_nsec - t0.tv_nsec)) / steps;
}

int main(int argc, char *argv[]) {
    long n = argc > 1 ? atol(argv[1]) : 2048;          /* number of 4 KiB pages touched */
    size_t len = (n * 4096 + (2 << 20) - 1) & ~(size_t)((2 << 20) - 1);
    for (int huge = 0; huge <= 1; huge++) {
        char *raw = mmap(NULL, len + (2 << 20), PROT_READ | PROT_WRITE,
                         MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
        if (raw == MAP_FAILED) return 1;
        char *mem = (char *)(((uintptr_t)raw + (2 << 20) - 1) & ~(uintptr_t)((2 << 20) - 1));
        madvise(mem, len, huge ? MADV_HUGEPAGE : MADV_NOHUGEPAGE);
        printf("%5ld pages, %s: %5.1f ns per access\n", n, huge ? "2 MiB pages" : "4 KiB pages", chase(mem, n));
        munmap(raw, len + (2 << 20));
    }
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -O2 -o tlb tlb.c
$ for n in 32 512 2048 8192 32768; do taskset -c 33 ./tlb $n; done
   32 pages, 4 KiB pages:   2.8 ns per access
   32 pages, 2 MiB pages:   2.9 ns per access
  512 pages, 4 KiB pages:   5.3 ns per access
  512 pages, 2 MiB pages:   2.6 ns per access
 2048 pages, 4 KiB pages:  10.5 ns per access
 2048 pages, 2 MiB pages:   4.9 ns per access
 8192 pages, 4 KiB pages:  29.9 ns per access
 8192 pages, 2 MiB pages:  21.0 ns per access
32768 pages, 4 KiB pages:  39.4 ns per access
32768 pages, 2 MiB pages:  22.2 ns per access
```

(The counter `thp_fault_alloc` in `/proc/vmstat` rose by $64$ during the last run — $64$ huge pages, $128$ MiB — confirming that huge pages were really used.) Read the table with the TLB sizes Intel documents for this Haswell processor: a first-level data TLB of $64$ entries for 4 KiB pages and a shared second-level TLB of $1024$ entries.

- $32$ pages fit in the first-level TLB with either page size: no difference.
- $512$ pages ($2$ MiB) overflow the 64-entry TLB with 4 KiB pages, but not the second-level TLB: each access pays a second-level lookup, and the time doubles. With huge pages, $2$ MiB is a single page.
- $2048$ pages ($8$ MiB) exceed even the second-level TLB with 4 KiB pages, so most accesses need a page-table walk; huge pages need only $4$ entries. The cache lines touched ($2048 \times 64$ bytes $= 128$ KiB) fit in the L2 cache, so the whole difference is translation.
- From $8192$ pages on, the data no longer fit in L2 and both versions slow down; the 4 KiB version also misses on page-table entries in the caches.

These are **observations** on one machine; the shape — flat, then a step at each TLB level — is universal, and the positions of the steps reveal the TLB sizes. The measurement explains why databases, virtual machines and scientific codes with large working sets use huge pages: a 1024-entry TLB has a reach of $4$ MiB with 4 KiB pages and $2$ GiB with 2 MiB pages.

::: quiz
A TLB has $64$ entries and pages are 4 KiB. A program repeatedly sums an array of $10^6$ eight-byte integers from start to end. Which statements are true?
- [x] The TLB's reach is $256$ KiB.
- [x] The program misses in the TLB about once per $512$ elements.
- [ ] The program misses in the TLB on almost every access, because the array (about 7.6 MiB) is larger than the reach.
- [x] With 2 MiB pages the array needs only $4$ TLB entries.
::: solution
Reach $= 64 \times 4$ KiB $= 256$ KiB. The array is much larger than the reach, but the scan is sequential: each translation is used for all $512$ elements of its page before the next page is needed, so there is one miss per page, a hit ratio of $511/512$. Being larger than the reach matters only when accesses jump between pages, as in the pointer chase above. The array occupies $8 \times 10^6$ bytes $\approx 7.6$ MiB, spanning $4$ huge pages (or $5$ if it is not aligned to 2 MiB).
:::
:::

### Who handles a TLB miss, and context switches

On x86 and ARM, the hardware walks the page table itself — a **hardware-managed TLB** — so the format of page tables is fixed by the architecture. On MIPS and some other RISC machines, a TLB miss raises an exception, and a kernel handler walks whatever data structure the kernel likes and inserts the entry with a privileged instruction — a **software-managed TLB**, more flexible and slower.

A TLB entry is valid only for the address space it came from. On a context switch to a different process, the kernel must either **flush** the TLB (invalidate every entry) or tag entries with an **address-space identifier** so that entries of several processes coexist. x86-64 calls these tags **process-context identifiers** (PCIDs, 12 bits; the test machine's `/proc/cpuinfo` lists `pcid`), and Linux uses them to avoid most flushes on context switches. When the kernel changes a mapping — unmapping a page, making it read-only — it must also invalidate the stale entry in the TLB of *every* core that may cache it, by sending each an inter-processor interrupt: a **TLB shootdown**, one of the hidden costs of `munmap` and `mprotect` in multithreaded programs.

::: warning "Virtual memory just means swapping to disk"
Virtual memory is often equated with using the disk as overflow for RAM. That is one use of it ([[operating-systems/page-replacement]]), but the translation mechanism is on even when nothing is ever swapped, and its everyday purposes are different: giving each process a private address space; protecting the kernel and other processes; sharing code pages of libraries between processes; mapping files into memory; allocating physical memory lazily, only when a page is first touched; and implementing `fork` cheaply by copy-on-write. A machine with swap disabled and plenty of RAM still translates every reference through page tables and the TLB.
:::

::: history
Virtual memory with paging was invented for the Atlas computer at Manchester by Tom Kilburn and colleagues (described in 1962 as a "one-level storage system"), which translated page numbers with an associative memory of page-address registers — one per physical frame, in effect an inverted page table searched in hardware. Segmentation came with the Burroughs B5000 (1961); Multics (1965 onwards) combined segmentation with paging on the GE 645. The IBM System/360 Model 67 (shipped from 1967) and the System/370 (virtual memory announced in 1972) brought paging to mainstream computing; the name "translation lookaside buffer" comes from IBM. Peter Denning's 1970 survey "Virtual Memory" in *Computing Surveys* fixed the terminology. The Intel 80386 (1985) brought two-level paging to personal computers, AMD's x86-64 (2003) the four-level scheme used today; Intel specified five-level paging in 2016, and Linux has supported it since version 4.14 (2017).
:::

## Where this leads

Translation is a mechanism; [[operating-systems/page-replacement]] supplies the policies that make virtual memory larger than physical memory: demand paging, page faults, replacement algorithms and the working set. Copy-on-write `fork` and memory-mapped files are built from the PTE bits of [[#def-paging]]. Threads share one address space ([[operating-systems/threads-locks]]), which is why they can communicate through memory and also why they can corrupt each other's data. [[operating-systems/virtualisation]] adds a second layer of translation — guest-virtual to guest-physical to host-physical — whose walks cost up to $24$ memory references. Address-space layout randomisation, NX bits and kernel page-table isolation, which defend against memory-corruption attacks and Meltdown, are part of [[security]].

::: summary
- Each process has an **address space** of virtual addresses ([[#def-address-space]]), translated by the MMU on every reference; translation provides transparency, protection and efficient sharing.
- **Base and bounds** ([[#def-base-bounds]]) relocates a contiguous address space with one addition and one comparison; **segmentation** does it per region; both suffer external fragmentation.
- **Paging** ([[#def-paging]]) maps fixed-size pages to frames; a PTE holds the PFN and present, writable, user, NX, accessed and dirty bits. A linear table needs $2^{v-p}e$ bytes ([[#prop-linear-size]]) — 512 GiB for x86-64 — so real tables are **multi-level trees** ([[#def-multilevel]]), costing a few pages for a sparse process ([[#ex-sparse]]).
- x86-64 splits a 48-bit address into four 9-bit indices and a 12-bit offset; a walk ([[#alg-walk]]) makes one memory read per level.
- The **TLB** ([[#def-tlb]]) caches translations: $\text{EAT} = \varepsilon + m + (1-h)km$ ([[#thm-eat]]), so hit ratios must exceed about $99\%$. Measured: beyond the TLB's reach, access time doubles and then quadruples; 2 MiB huge pages remove the effect.
- Context switches need TLB flushes or address-space identifiers (PCIDs); changing mappings requires TLB shootdowns on other cores.
:::

## Exercises

::: exercise Base and bounds {level=1}
A process has base $0x5000$ and bounds $0x2000$. Translate virtual addresses $0x1A00$ and $0x2000$, if possible. 
::: solution
$0x1A00 < 0x2000$, so it is legal: $0x5000 + 0x1A00 = 0x6A00$. $0x2000$ is not less than the bounds, so it faults; the legal addresses are $0x0000$ to $0x1FFF$.
:::
:::

::: exercise Splitting an address {level=1 check="145"}
Split the x86-64 virtual address $0x00007f3a12345678$ into its four 9-bit page-table indices and its offset. (Enter the page-directory index, the third of the four.)
::: solution
The offset is the low $12$ bits, $0x678$. Shifting right: bits 39–47 give $(\text{va} \gg 39) \mathbin{\&} 511 = 254$; bits 30–38 give $232$; bits 21–29 give $145$; bits 12–20 give $325$. So the walk reads entry $254$ of the PML4, entry $232$ of the PDPT, entry $145$ of the page directory and entry $325$ of the page table. A Python one-liner checks it: `[(va >> s) & 511 for s in (39, 30, 21, 12)]` gives `[254, 232, 145, 325]`.
:::
:::

::: exercise Linear page tables {level=1 check="4"}
A 32-bit machine with 4 KiB pages and 4-byte page-table entries uses linear page tables. How many MiB does each process's page table occupy? What if the pages were 16 KiB? (Enter the first answer in MiB.)
::: solution
By [[#prop-linear-size]], $2^{32-12} \times 4 = 2^{22}$ bytes $= 4$ MiB. With 16 KiB pages, $2^{32-14} \times 4 = 2^{20}$ bytes $= 1$ MiB: larger pages shrink the table, at the cost of more internal fragmentation.
:::
:::

::: exercise A TLB hit-ratio requirement {level=2 check="0.995"}
With $m = 80$ ns, $\varepsilon = 0$ and four-level walks to memory, what TLB hit ratio $h$ makes the effective access time $81.6$ ns? (Enter $h$.)
::: solution
$80 + (1 - h) \times 4 \times 80 = 81.6$ gives $320(1 - h) = 1.6$, so $1 - h = 0.005$ and $h = 0.995$. A $2\%$ slowdown already needs a $99.5\%$ hit ratio.
:::
:::

::: exercise Two-level table size {level=2 check="12"}
A 32-bit machine uses the two-level scheme of the Python listing (10-bit indices, 4 KiB pages, 4-byte entries). A process uses $4$ MiB of code and data starting at address $0$, and $1$ MiB of stack ending at $0xFFFFFFFF$ inclusive. How many KiB of page tables does it need, counting the directory? (Enter KiB.)
::: solution
Each second-level table maps $1024 \times 4$ KiB $= 4$ MiB. The code and data, $[0, 4\text{ MiB})$, fit exactly in one table (directory entry $0$). The stack, $[0xFFF00000, 0x100000000)$, lies in the last 4 MiB (directory entry $1023$): one more table. With the directory that is $3$ pages $= 12$ KiB, against $4$ MiB for a linear table.
:::
:::

::: exercise What the measurement says {level=2}
In the TLB measurement, the time for $512$ pages with 4 KiB pages ($5.3$ ns) is about twice that with huge pages ($2.6$ ns), although both touch the same $512$ cache lines. Explain why, using the documented TLB sizes. Predict roughly what happens for $64$ and $1024$ pages, then check by running the program.
::: solution
With 4 KiB pages, $512$ distinct pages do not fit in the $64$-entry first-level TLB, so almost every access misses there and is served by the second-level TLB (1024 entries), costing several extra cycles; the data themselves ($512 \times 64$ B $= 32$ KiB) are in L1 or L2 in both runs. With 2 MiB pages, all $512$ lines lie in one huge page and every access hits the first-level TLB. Prediction: at $64$ pages the 4 KiB version should be close to the huge-page time, since the first-level TLB just suffices; at $1024$ pages the 4 KiB version needs the second-level TLB (and, with other pages competing, some walks). On the test machine:

```console
$ taskset -c 33 ./tlb 64; taskset -c 33 ./tlb 1024
   64 pages, 4 KiB pages:   2.9 ns per access
   64 pages, 2 MiB pages:   2.9 ns per access
 1024 pages, 4 KiB pages:   8.6 ns per access
 1024 pages, 2 MiB pages:   5.6 ns per access
```

The first prediction holds. At $1024$ pages the huge-page time has also risen, from $2.9$ to $5.6$ ns: $1024$ cache lines ($64$ KiB) no longer fit in the $32$ KiB L1 data cache, so even with perfect translation each access is an L2 hit. The difference that remains, about $3$ ns, is the second-level TLB and occasional walks. A good experiment changes one thing at a time; here the cache footprint changed with $n$ too, which is why the program compares the two page sizes at each $n$ rather than comparing different $n$. Your numbers will differ on other processors, but the steps will appear at their TLB sizes.
:::
:::

::: exercise Nested translation {level=3 check="24"}
In a virtual machine, a guest's virtual address is translated by the guest's four-level page table into a guest-physical address, and every guest-physical address — *including the addresses of the guest's page-table pages* — is translated by the hypervisor's four-level table into a host-physical address. If no TLB or paging-structure cache helps, how many memory references does one guest TLB miss need, not counting the final data access? Generalise to $n$-level guest and $m$-level host tables. (Enter the number for $n = m = 4$.)
::: solution
The guest walk reads $n$ guest page-table entries. Before each read, the guest-physical address of that table must be translated by an $m$-level host walk ($m$ reads), and then the entry itself is read ($1$ read): $n(m + 1)$. At the end, the guest walk yields the guest-physical address of the data, which needs one more host walk of $m$ reads. Total $n(m+1) + m = nm + n + m = (n+1)(m+1) - 1$. For $n = m = 4$: $25 - 1 = 24$. This is why hardware-assisted virtualisation relies on large TLBs and paging-structure caches, and benefits so much from huge pages on the host ([[operating-systems/virtualisation]]).
:::
:::

::: exercise Implementing permission checks {level=3}
Extend the Python `translate` function to a three-level table with 8-bit indices and a 12-bit offset (36-bit addresses), with PTEs that carry `present`, `writable`, `user` and `nx` bits, and an access described by `kind` (`'r'`, `'w'` or `'x'`) and `user` (True for user mode). Raise a different exception for not-present and for each kind of protection violation, and test it on a kernel page accessed from user mode, a write to a read-only page, and a fetch from an NX page.
::: solution
```python
from dataclasses import dataclass

@dataclass
class PTE:
    frame: int
    present: bool = True
    writable: bool = False
    user: bool = True
    nx: bool = False

class PageFault(Exception): pass
class ProtectionFault(Exception): pass

def translate(root, va, kind='r', user=True):
    idx = [(va >> s) & 0xFF for s in (28, 20, 12)]
    table = root
    for level, i in enumerate(idx):
        pte = table.get(i)
        if pte is None or not pte.present:
            raise PageFault(f"level {level + 1} entry {i} not present")
        if user and not pte.user:
            raise ProtectionFault("kernel page accessed in user mode")
        if level < 2:
            table = pte.frame          # here: the next table itself, for simplicity
    if kind == 'w' and not pte.writable:
        raise ProtectionFault("write to read-only page")
    if kind == 'x' and pte.nx:
        raise ProtectionFault("instruction fetch from no-execute page")
    return (pte.frame << 12) | (va & 0xFFF)

leaf = {0: PTE(0x123, writable=True, nx=True),     # data
        1: PTE(0x124),                             # code: read-only, executable
        2: PTE(0x200, writable=True, user=False)}  # kernel data
root = {0: PTE({0: PTE(leaf)})}
for va, kind in [(0x0000, 'w'), (0x1000, 'x'), (0x1000, 'w'), (0x0000, 'x'), (0x2000, 'r'), (0x3000, 'r')]:
    try:
        print(hex(va), kind, '->', hex(translate(root, va, kind)))
    except (PageFault, ProtectionFault) as e:
        print(hex(va), kind, '->', type(e).__name__ + ':', e)
```
```console
$ python3 perm.py
0x0 w -> 0x123000
0x1000 x -> 0x124000
0x1000 w -> ProtectionFault: write to read-only page
0x0 x -> ProtectionFault: instruction fetch from no-execute page
0x2000 r -> ProtectionFault: kernel page accessed in user mode
0x3000 r -> PageFault: level 3 entry 3 not present
```
Checking the user bit at every level mirrors x86-64, where an access is allowed in user mode only if *every* entry on the path permits it; real hardware also combines the writable bits along the path in the same way.
:::
:::
