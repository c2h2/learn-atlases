A program that reads a file of unknown length, builds a tree of unknown size, or keeps a cache that grows and shrinks cannot know at compile time how much memory it needs. Globals have a fixed size, and local variables die when their function returns. For everything else, C programs call `malloc` to obtain memory from the **heap** and `free` to give it back, as in [[computer-systems/c-programming]]. Those two functions look trivial. They are not: `malloc` must find a suitable piece of free memory in microseconds or less, among millions of allocated and free pieces of every size, without wasting much space, while `free` receives nothing but a pointer and must work out how big the block is and whether it can be merged with its neighbours. And because C trusts the programmer completely, mistakes in using them — forgetting to free, freeing twice, using memory after freeing it — are among the most common and most dangerous bugs in systems software.

This chapter opens the box. We state what an allocator must do and how its quality is measured; build, line by line, a complete working allocator (an implicit free list with boundary tags, first-fit placement, splitting and coalescing); survey the better designs used in practice — explicit and segregated free lists, the buddy system, and glibc's allocator; and then turn to the programmer's side: the catalogue of memory errors, the tools that find them, and garbage collection, which removes the need to call `free` at all.

Programs were compiled with GCC 15.2 on x86-64 Linux with glibc 2.43, as `gcc -std=c17 -Wall -Wextra` and tested with `-fsanitize=address,undefined`. Details of glibc's allocator are as of 2026 and change between versions.

## The allocator's job

The C standard library provides four functions, declared in `<stdlib.h>`:

- `void *malloc(size_t n)` returns a pointer to at least `n` bytes of uninitialised memory, suitably aligned for any type, or `NULL` on failure;
- `void *calloc(size_t k, size_t size)` does the same for an array of `k` elements of `size` bytes, checks `k * size` for overflow, and zeroes the memory;
- `void *realloc(void *p, size_t n)` changes the size of the block at `p`, moving it (and copying the contents) if necessary;
- `void free(void *p)` returns the block at `p`, which must have come from one of the three functions above and not been freed already; `free(NULL)` does nothing.

On x86-64 Linux, "suitably aligned" means a multiple of 16 bytes. The allocator manages the heap, a region of the process's virtual address space ([[computer-systems/c-programming#sec-regions]]) that it obtains from the kernel: traditionally by moving the end of the data segment, the **program break**, with the `brk`/`sbrk` system calls, and for large blocks by mapping fresh pages with `mmap`. In this run, a 100-byte request was served from the `brk` heap and a 1 MiB request by its own `mmap`, released by `munmap` when freed:

```console
$ strace -e trace=brk,mmap,munmap ./big
...
brk(0x626c6b9d3000)                     = 0x626c6b9d3000
mmap(NULL, 1052672, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x71946f30f000
munmap(0x71946f30f000, 1052672)         = 0
```

::: definition Allocator requirements {#def-allocator}
An **explicit allocator** must:

1. handle any sequence of allocate and free requests, in any order, where each free is of a currently allocated block;
2. respond immediately, without reordering or buffering requests;
3. keep its own data structures in the heap itself (it cannot call `malloc`);
4. return blocks aligned for any type;
5. never move or modify an allocated block (the program holds pointers into it).
:::

Rule 5 is what makes the problem hard: once allocated, a block stays where it is, so the allocator can only make good decisions at the moment of each request.

Within these constraints there are two competing goals. **Throughput** is the number of requests handled per unit of time. **Memory utilisation** measures how much of the heap actually holds the program's data. Let the **payload** of a block be the bytes the program asked for, let $P_k$ be the total payload of the blocks allocated after the first $k$ requests, and let $H_k$ be the size of the heap then (the heap does not shrink, in this model). The **peak utilisation** after $k$ requests is

$$
U_k = \frac{\max_{i \le k} P_i}{H_k} .
$$ {#eq-util}

An allocator that never reused memory would be very fast and have terrible utilisation; one that searched the whole heap for the perfect block would utilise memory well and be slow.

### Fragmentation

Poor utilisation has two causes. **Internal fragmentation** occurs when an allocated block is larger than its payload: because of headers, alignment, or a policy of not splitting a slightly-too-large block. **External fragmentation** occurs when there is enough free memory in total to satisfy a request, but no single free block is large enough. Internal fragmentation is easy to quantify — it depends only on the past. External fragmentation depends on future requests too, which is why allocators rely on heuristics.

::: example External fragmentation {#ex-external}
A heap of 64 bytes is managed with no headers, in 8-byte units. The program allocates eight 8-byte blocks $b_1, \ldots, b_8$, filling the heap, then frees $b_1, b_3, b_5, b_7$. Can it now allocate 16 bytes?
::: solution
No. There are $32$ free bytes, but they form four separate 8-byte holes, each between two allocated blocks, and an allocated block cannot be moved (rule 5). A 16-byte request must grow the heap, although half of it is free. Peak utilisation was $64/64 = 1$ before the frees; after the request is served by growing the heap to $80$ bytes, the maximum payload so far is still $64$, so $U = 64/80 = 0.8$, with $32$ bytes free but unusable for this request. In general no allocator can avoid this: J. M. Robson proved in the early 1970s that for some request sequences every allocator needs a heap larger than the maximum live payload $M$ by a factor that grows like $\log_2 n$, where $n$ is the ratio of the largest to the smallest block size.
:::
:::

::: quiz
A program calls `malloc(1)` a million times under glibc (32-byte chunks) and never frees anything. Which statements are correct?
- [x] The heap needs about 32 MB, so peak utilisation is about $1/32$.
- [x] Almost all of the waste is internal fragmentation.
- [ ] Almost all of the waste is external fragmentation.
- [ ] Coalescing would recover most of the wasted space.
::: solution
Each 1-byte payload occupies a 32-byte chunk, so $10^6$ bytes of payload need $3.2 \times 10^7$ bytes of heap: $U \approx 1/32$. The waste lies *inside* allocated blocks (headers, alignment, minimum size): internal fragmentation. There are no free blocks at all, so there is no external fragmentation and nothing to coalesce. The remedy is a different design — allocate the bytes as one array, or use a pool allocator for tiny objects.
:::
:::

## An implicit free list allocator

Any practical allocator must answer four questions. How does `free(p)` find the size of the block at `p`? How are free blocks found? Which free block is chosen for a request (**placement**)? What happens to the remainder of a block that is too large (**splitting**), and to neighbouring free blocks when a block is freed (**coalescing**)? We answer them with the simplest complete design, and implement it in about 70 lines of C. It is a teaching allocator managing a fixed 4 KiB array, not a replacement for `malloc`.

::: definition Block format with boundary tags {#def-block}
The heap is a sequence of contiguous **blocks**. Each block begins with an 8-byte **header** and ends with an identical 8-byte **footer** (a **boundary tag**), and holds a payload in between. A tag packs the block's total size — a multiple of 16, so its low four bits are zero — with an **allocated bit** in bit 0. A pointer to a block (`bp`) points at its payload, 8 bytes after the header, which is a multiple of 16. Because each header records the block's size, the blocks form an **implicit free list**: from any block, the next is `bp + size`, and through the previous block's footer, just before our header, the previous block is reachable too.
:::

Two special blocks avoid edge cases: an allocated **prologue** block of 16 bytes (header and footer only) at the start, and an allocated **epilogue** header of size 0 at the end. The smallest real block is 32 bytes: header, footer, and 16 bytes of payload so that the payload alignment is preserved.

```c
/* A toy allocator: implicit free list, boundary tags, first fit (for teaching only). */
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>

#define HEAP_SIZE 4096
#define ALIGN 16
#define WSIZE 8                               /* header and footer size */
static _Alignas(16) unsigned char heap[HEAP_SIZE];

/* A tag packs a block size (a multiple of 16) and an allocated bit. */
static uint64_t *hdr(unsigned char *bp) { return (uint64_t *) (bp - WSIZE); }
static size_t size_of(unsigned char *bp) { return *hdr(bp) & ~(uint64_t) 0xf; }
static int alloc_of(unsigned char *bp) { return (int) (*hdr(bp) & 1); }
static uint64_t *ftr(unsigned char *bp) { return (uint64_t *) (bp + size_of(bp) - 2 * WSIZE); }
static unsigned char *next_bp(unsigned char *bp) { return bp + size_of(bp); }
static unsigned char *prev_bp(unsigned char *bp) {
    return bp - (*(uint64_t *) (bp - 2 * WSIZE) & ~(uint64_t) 0xf);
}
static void set(unsigned char *bp, size_t size, int alloc) {
    *hdr(bp) = size | (uint64_t) alloc;
    *ftr(bp) = size | (uint64_t) alloc;
}

static unsigned char *first;                  /* first real block */

void toy_init(void) {
    /* layout: pad(8) | prologue hdr,ftr (16, allocated) | free block | epilogue hdr (0, allocated) */
    unsigned char *pro = heap + 2 * WSIZE;    /* payload address of the prologue */
    set(pro, 16, 1);
    first = pro + 16;
    set(first, HEAP_SIZE - 32, 0);            /* one big free block */
    *hdr(next_bp(first)) = 0 | 1;             /* epilogue: size 0, allocated */
}
```

The helper functions are the whole data structure: `hdr` and `ftr` locate the tags, `size_of` and `alloc_of` decode them, and `next_bp` and `prev_bp` move along the list. After `toy_init`, the heap holds 8 bytes of alignment padding, the prologue, one free block of $4096 - 32 = 4064$ bytes, and the epilogue header in the last 8 bytes. (Accessing the array through `uint64_t *` pointers is acceptable here because `heap` is suitably aligned and used for nothing else; a production allocator must take more care with C's aliasing rules.)

### Placement, splitting and coalescing

::: algorithm First-fit allocation with splitting {#alg-firstfit}
To allocate $n$ bytes:

1. If $n = 0$, return `NULL`. Compute the block size needed, $s = \lceil (n + 16)/16 \rceil \cdot 16$: payload plus header and footer, rounded up to the alignment.
2. Walk the blocks from the first to the epilogue. At the first free block $b$ with $\text{size}(b) \ge s$:
   1. If the remainder $r = \text{size}(b) - s$ is at least the minimum block size (32), **split**: mark the first $s$ bytes of $b$ as an allocated block and the remaining $r$ bytes as a free block.
   2. Otherwise allocate all of $b$ (the excess becomes internal fragmentation).
   3. Return $b$'s payload pointer.
3. If no block fits, fail (a real allocator would grow the heap with `sbrk` or `mmap` and retry).
:::

**First fit** takes the first block that is large enough. **Next fit** starts each search where the previous one ended, which is faster but tends to fragment more; **best fit** examines every free block and takes the smallest that fits, which utilises memory well but must search the whole list. Studies of real programs (notably by Wilson, Johnstone, Neely and Boles in 1995) found first fit and best fit — with good implementations — to fragment comparably and modestly.

When a block is freed, its free neighbours should be merged with it into a single larger free block; otherwise the heap would soon consist of many small free blocks that together could satisfy a large request but individually cannot (**false fragmentation**). The boundary tags make that merging cheap.

::: theorem Constant-time coalescing {#thm-coalesce}
With boundary tags at both ends of every block (and the prologue and epilogue in place), freeing a block and merging it with any free neighbours takes $O(1)$ time, independent of the number of blocks.
:::

::: proof
Let $b$ be the block being freed. Its successor starts at $b + \text{size}(b)$, and its header gives the successor's size and status; the predecessor's footer lies in the 8 bytes immediately before $b$'s header and gives the predecessor's size and status, from which the predecessor's start is $b - \text{size}$. Thanks to the prologue and epilogue, both neighbours always exist and are marked allocated at the ends of the heap. There are four cases, each handled by a constant number of tag reads and writes:

1. Both neighbours allocated: mark $b$ free (write its header and footer).
2. Successor free: the merged block starts at $b$ and has size $\text{size}(b) + \text{size}(\text{succ})$; write the header at $b$ and the footer at the end of the successor.
3. Predecessor free: the merged block starts at the predecessor, with size $\text{size}(\text{pred}) + \text{size}(b)$; write the predecessor's header and $b$'s footer.
4. Both free: the merged block runs from the predecessor's header to the successor's footer, with the sum of three sizes.

In every case the result is a valid block, with matching header and footer, and no two free blocks are adjacent afterwards, provided none were before: so by induction over the sequence of operations, the heap never contains two adjacent free blocks.
:::

The code follows the proof (in `coalesce`, cases 2–4 are handled by the two `if` statements, since the size computation is the same):

```c
static unsigned char *coalesce(unsigned char *bp) {
    int prev_alloc = alloc_of(prev_bp(bp)), next_alloc = alloc_of(next_bp(bp));
    size_t size = size_of(bp);
    if (!next_alloc) size += size_of(next_bp(bp));               /* merge with next */
    if (!prev_alloc) { bp = prev_bp(bp); size += size_of(bp); }  /* merge with previous */
    set(bp, size, 0);
    return bp;
}

void *toy_malloc(size_t n) {
    if (n == 0 || n > HEAP_SIZE) return NULL;
    size_t need = (n + 2 * WSIZE + ALIGN - 1) & ~(size_t) (ALIGN - 1);  /* + header, footer */
    for (unsigned char *bp = first; size_of(bp) > 0; bp = next_bp(bp)) {
        if (!alloc_of(bp) && size_of(bp) >= need) {               /* first fit */
            size_t rest = size_of(bp) - need;
            if (rest >= 32) {                                      /* split */
                set(bp, need, 1);
                set(next_bp(bp), rest, 0);
            } else {
                set(bp, size_of(bp), 1);
            }
            return bp;
        }
    }
    return NULL;                                                   /* out of memory */
}

void toy_free(void *p) {
    if (p == NULL) return;
    unsigned char *bp = p;
    set(bp, size_of(bp), 0);
    coalesce(bp);
}
```

(`set` writes the header first and then uses the *new* size to find where the footer goes, which is why `set(bp, size, 0)` in `coalesce` correctly writes the footer at the end of the merged block.)

::: example Tracing the toy allocator {#ex-toy}
A test driver prints the heap as a list of `[size, a/f]` blocks after each operation:

```c
static void show(const char *label) {
    printf("%-12s", label);
    for (unsigned char *bp = first; size_of(bp) > 0; bp = next_bp(bp))
        printf(" [%zu%s]", size_of(bp), alloc_of(bp) ? "a" : "f");
    printf("\n");
}

int main(void) {
    toy_init();                          show("init");
    char *a = toy_malloc(10);            show("a = 10");
    char *b = toy_malloc(100);           show("b = 100");
    char *c = toy_malloc(30);            show("c = 30");
    printf("a %% 16 = %zu\n", (size_t) ((uintptr_t) a % 16));
    toy_free(b);                         show("free b");
    toy_free(a);                         show("free a");
    char *d = toy_malloc(120);           show("d = 120");
    printf("d == a: %d\n", d == a);
    toy_free(c); toy_free(d);            show("free c, d");
    return 0;
}
```

Explain each line of its output.

```console
$ gcc -std=c17 -Wall -Wextra -fsanitize=address,undefined -o toy toy.c && ./toy
init         [4064f]
a = 10       [32a] [4032f]
b = 100      [32a] [128a] [3904f]
c = 30       [32a] [128a] [48a] [3856f]
a % 16 = 0
free b       [32a] [128f] [48a] [3856f]
free a       [160f] [48a] [3856f]
d = 120      [160a] [48a] [3856f]
d == a: 1
free c, d    [4064f]
```
::: solution
The block sizes follow step 1 of [[#alg-firstfit]]: $10 + 16 = 26 \to 32$, $100 + 16 = 116 \to 128$, $30 + 16 = 46 \to 48$. Each request is carved from the front of the big free block, which is split each time. The payload of `a` is 16-byte aligned, as required.

Freeing `b` is case 1 of [[#thm-coalesce]] (both neighbours allocated): it just becomes a free 128-byte block. Freeing `a` is case 2: its successor `b` is free, so they merge into a 160-byte free block. For `d = 120` the needed size is $120 + 16 = 136 \to 144$. First fit finds the 160-byte block first; the remainder, $16$ bytes, is below the minimum block size, so the whole block is allocated and `d` receives the address that `a` had, with 16 bytes of internal fragmentation. Finally, freeing `c` merges it with the big block at the end (case 2), and freeing `d` merges with that (case 2 again), restoring the initial single free block of 4064 bytes. AddressSanitizer reports no errors.
:::
:::

::: widget plot
f: max(32, 16*floor((x + 23)/16)); x
x: 0, 120
y: 0, 140
labels: \text{glibc chunk size}; \text{request } n
caption: The size of the block (chunk) glibc's `malloc` uses for a request of $n$ bytes, against $n$ itself: an 8-byte size field plus the request, rounded up to a multiple of 16, with a minimum of 32. The vertical gap between the staircase and the diagonal is the overhead per block — internal fragmentation. Notice that it is large in relative terms for small requests (a 1-byte request occupies 32 bytes) and negligible for large ones, which is why programs that allocate millions of tiny objects often use their own pool allocators.
:::

## Allocators in practice

The implicit list makes `malloc` take time linear in the number of *all* blocks, allocated and free: far too slow for a heap with millions of blocks. Real allocators organise free blocks better.

**Explicit free lists.** Since a free block's payload is unused, it can hold pointers: a doubly linked list of just the free blocks, with `next` and `prev` stored in the payload. Allocation then takes time linear in the number of *free* blocks. Freed blocks can be inserted at the front (**LIFO** order, constant time) or in address order (which makes first fit fragment less, at the cost of a search on free).

**Segregated free lists.** Keep an array of free lists, one per **size class** (for example 32, 48, 64, …, 512 bytes, then powers of two). A request for $n$ bytes searches only the list for its class, and then larger classes. With exact classes for small sizes, allocation of a small block is a constant-time pop from a list. Nearly all fast allocators are built this way; best fit within a size class is close to best fit overall.

::: example Why the implicit list is too slow {#ex-cost}
A long-running program has $10^6$ allocated blocks and $1000$ free blocks of assorted sizes scattered through its heap. Roughly how many blocks must `malloc` examine in the worst case with an implicit list, an explicit free list, and segregated lists with 100 size classes?
::: solution
An implicit list walks *all* blocks, allocated or free, until it finds a fit: up to $10^6 + 1000 \approx 10^6$ blocks, each a memory access that is likely to miss in the cache ([[computer-systems/memory-hierarchy]]) — around a hundred milliseconds per call in the worst case, at roughly 100 ns per miss. An explicit list visits only free blocks: at most $1000$. With segregated lists, a request looks first in the list of its own size class; if the 1000 free blocks are spread over 100 classes and the class matches exactly, the first block of the list fits, and the search is a constant-time pop. (If the class is empty, the allocator moves on to the next larger non-empty class, which a bitmap of non-empty classes finds in a few instructions.) The orders of magnitude, $10^6$, $10^3$ and $1$, are why every production allocator segregates.
:::
:::

**The buddy system.** All block sizes are powers of two. A free block of size $2^k$ is split into two "buddies" of size $2^{k-1}$, and when a block is freed it is merged with its buddy if that is free. A block's buddy is found by flipping one bit of its address (the address of a $2^k$-byte block is a multiple of $2^k$, and its buddy's differs exactly in bit $k$), so splitting and coalescing are fast; the price is internal fragmentation of up to almost half of each block. For example, in a 16 KiB buddy heap a request for 3000 bytes splits the 16 KiB block into two 8 KiB buddies, and one of those into two 4 KiB buddies, and allocates a 4 KiB block — wasting $4096 - 3000 = 1096$ bytes to internal fragmentation. If that block is at offset `0x3000`, its buddy is at `0x3000` XOR `0x1000` $=$ `0x2000`; when both are free they merge into the 8 KiB block at `0x2000`, whose buddy, `0x2000` XOR `0x2000` $= 0$, is the other half of the original heap. Linux uses a buddy allocator to manage physical pages.

::: application glibc's malloc
The GNU C library's allocator (ptmalloc, derived from Doug Lea's dlmalloc) works with **chunks** whose 8-byte size field precedes the payload; the field holding the previous chunk's size overlaps the end of the previous chunk's payload and is used only while that chunk is free. So the overhead of an allocated chunk is just 8 bytes, the minimum chunk is 32 bytes, and sizes are multiples of 16, as the plot above shows and as this program confirms:

```c
#define _GNU_SOURCE                  /* for malloc_usable_size */
#include <malloc.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    size_t sizes[] = {1, 24, 25, 40, 100};
    char *p[5];
    for (int i = 0; i < 5; i++)      /* allocate first: printf allocates too */
        if ((p[i] = malloc(sizes[i])) == NULL) return 1;
    for (int i = 0; i < 5; i++) {
        printf("malloc(%3zu): usable %3zu, address mod 16 = %zu",
               sizes[i], malloc_usable_size(p[i]), (size_t) ((uintptr_t) p[i] % 16));
        if (i > 0) printf(", %3td bytes after previous", p[i] - p[i - 1]);
        printf("\n");
    }
    for (int i = 0; i < 5; i++) free(p[i]);
    return 0;
}
```

```console
$ ./usable
malloc(  1): usable  24, address mod 16 = 0
malloc( 24): usable  24, address mod 16 = 0,  32 bytes after previous
malloc( 25): usable  40, address mod 16 = 0,  32 bytes after previous
malloc( 40): usable  40, address mod 16 = 0,  48 bytes after previous
malloc(100): usable 104, address mod 16 = 0,  48 bytes after previous
```

Free chunks are kept in segregated **bins**; since glibc 2.26 (2017) each thread also has a small cache of recently freed chunks per size (the **tcache**), so most small allocations need no locking. Requests above a threshold (128 KiB by default, adjusted dynamically) are served directly by `mmap`. Other widely used allocators — jemalloc, tcmalloc, mimalloc — are built on the same ideas with more emphasis on multithreaded scalability.
:::

## Memory errors

The allocator's interface is simple, and the ways to misuse it are well known. All of them are **undefined behaviour** ([[computer-systems/c-programming#def-ub]]), and many are silent until they cause damage far from the bug.

| error | example | typical consequence |
|---|---|---|
| **memory leak** | allocated block becomes unreachable without `free` | memory use grows until the program is killed |
| **use after free** | reading or writing `*p` after `free(p)` | reads stale or reused data; writes corrupt another object or the allocator's lists |
| **double free** | `free(p); free(p);` | corrupts the free lists; glibc usually detects it and aborts |
| **invalid free** | `free(p + 1)`, or freeing a stack or global object | corrupts or crashes the allocator |
| **heap buffer overflow** | writing past the end of a block | overwrites the next block's header or data |
| **uninitialised read** | reading `malloc`ed memory before writing it | indeterminate values (use `calloc` when zeros are needed) |
| **mismatched size** | `malloc(n)` instead of `malloc(n * sizeof *p)` | buffer overflow |

GCC 15 catches the simplest cases at compile time (`-Wuse-after-free`), and glibc detects some at run time — the double free below is caught by its tcache checks:

```console
$ ./df
free(): double free detected in tcache 2
Aborted
$ echo $?
134
```

(The exit status $134 = 128 + 6$ means the process died from `SIGABRT`; see [[computer-systems/exceptions-processes]].) But detection by the allocator is a safety net, not a guarantee. **AddressSanitizer** finds far more: it allocates "red zones" around every block, delays the reuse of freed memory, and checks every load and store. For a use after free:

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    char *name = malloc(16);
    if (name == NULL) return 1;
    strcpy(name, "Ada");
    free(name);
    printf("%s\n", name);          /* bug: use after free */
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -g -fsanitize=address -o uaf uaf.c
uaf.c: In function 'main':
uaf.c:10:5: warning: pointer 'name' used after 'free' [-Wuse-after-free]
$ ./uaf
==3343680==ERROR: AddressSanitizer: heap-use-after-free on address 0x7807eade0010 ...
READ of size 2 at 0x7807eade0010 thread T0
    #0 ... in puts
    #1 ... in main uaf.c:10
freed by thread T0 here:
    #0 ... in free
    #1 ... in main uaf.c:9
previously allocated by thread T0 here:
...
```

(Output shortened.) The report gives the bad access, where the block was freed, and where it was allocated. Its leak checker (LeakSanitizer, enabled with AddressSanitizer on Linux) reports blocks still unreachable at exit: for a loop that allocates three 10-byte copies of a string and never frees them it reports `Direct leak of 30 byte(s) in 3 object(s)`. Valgrind's Memcheck finds the same classes of error without recompiling, at a larger slowdown.

::: warning `free` does not change the pointer
After `free(p)`, the variable `p` still holds the same address — a **dangling pointer**. Any later use is a use after free, and the bug is often invisible in testing because the freed memory still contains the old data until something reuses it. Set pointers to `NULL` after freeing them when they remain in scope (`free(p); p = NULL;`), so that a later use crashes immediately rather than corrupting memory, and give every heap object a clearly defined **owner** responsible for freeing it exactly once. Note that setting one pointer to `NULL` does not help if other copies of it exist elsewhere.
:::

::: application Heap errors and security
Use-after-free and heap overflows are among the most frequently exploited vulnerability classes in browsers and operating systems. Conceptually, the danger is that freed memory is *reused*: if a program frees an object but keeps using a stale pointer to it, and the allocator then hands the same memory to a new object whose contents an attacker influences, the stale pointer reads or writes attacker-chosen data — for example a function pointer. Defences work at several levels: designs and languages with clear ownership (or garbage collection or compile-time ownership checking, [[programming-languages]]); sanitisers and fuzzing during development; and **hardened allocators** that check their metadata, randomise placement, quarantine freed memory before reuse, and, since glibc 2.32 (2020), mangle the free-list pointers stored in freed chunks ("safe-linking") so that corrupting them is harder. As always, mitigations raise the cost of exploitation; only fixing the bug removes it.
:::

## Garbage collection

The alternative to `free` is not to call it. A **garbage collector** is an allocator that reclaims blocks automatically when the program can no longer use them. Python, Java, Go, JavaScript and most other modern languages use one.

::: definition Reachability {#def-reachable}
View memory as a directed **reachability graph**: its vertices are the allocated blocks plus a set of **roots** — locations outside the heap that may hold pointers into it (registers, stack slots, global variables); there is an edge from $u$ to $v$ if some word of $u$ holds a pointer into block $v$. A block is **reachable** if there is a path to it from a root, and **garbage** otherwise.
:::

A garbage block can never be used again, because the program has no way to obtain a pointer to it; a collector may therefore free it. A **mark-and-sweep** collector does exactly that: the **mark** phase runs a graph search (depth- or breadth-first, as in [[data-structures]]) from the roots, setting a mark bit in each block it reaches; the **sweep** phase walks the heap — an implicit list works — freeing every allocated block that is not marked.

::: widget graph
nodes: roots@0,2; A@2,3; B@2,1; C@4,3; D@4,1; E@6,2; F@6,0
edges: roots>A; roots>B; A>C; B>C; C>E; F>D; D>F
algorithm: bfs
start: roots
caption: A reachability graph: the vertex `roots` stands for the registers, stack and globals, and an arrow $u \to v$ means that block $u$ holds a pointer into block $v$. Run the breadth-first search, which is the mark phase of a mark-and-sweep collector. It marks $A$, $B$, $C$ and $E$. Blocks $D$ and $F$ point to each other but nothing reachable points to them: they are garbage, and the sweep frees them. A collector based on **reference counts** alone would never free them, because each still has a count of one — the classic weakness that makes CPython add a cycle-detecting collector to its reference counting.
:::

::: example Reference counting versus marking {#ex-refcount}
In the graph of the figure, give every block's **reference count** (the number of pointers to it). Then the program overwrites the root pointers to $A$ and to $B$. What does a reference-counting collector free, and what does mark-and-sweep free?
::: solution
Counting incoming edges: $A$: 1 (from the roots), $B$: 1, $C$: 2 (from $A$ and $B$), $D$: 1 (from $F$), $E$: 1 (from $C$), $F$: 1 (from $D$). A reference-counting collector frees a block when its count drops to $0$, and then decrements the counts of the blocks it points to.

When the root pointers to $A$ and $B$ are overwritten, their counts drop to $0$, so both are freed; freeing them decrements $C$ from $2$ to $0$, so $C$ is freed, which decrements $E$ to $0$, freeing $E$. $D$ and $F$ still have count $1$ each — they keep each other alive — and are never freed: a leak. Mark-and-sweep marks nothing (the roots now point to no block), and the sweep frees all six blocks. Reference counting reclaims memory promptly and incrementally, which is why it is used (in CPython, in Swift, in C++'s `shared_ptr`), but it needs a backup cycle collector or programmer discipline (weak references) for cyclic structures.
:::
:::

Collecting C programs is harder, because C does not say which words are pointers: an integer that happens to look like an address cannot be distinguished from a pointer. **Conservative** collectors for C (the Boehm–Demers–Weiser collector, 1988) treat every word that could be a pointer into the heap as one; they may keep some garbage alive but never free a reachable block. Languages designed for garbage collection give the collector exact type information, and modern collectors are *generational* (most objects die young, so young objects are collected often) and *concurrent* (they run alongside the program to keep pauses short). Their design is part of [[programming-languages]] and [[compilers]].

::: history
Dynamic storage allocation dates from the earliest list-processing languages. John McCarthy's LISP (described in 1960) introduced garbage collection, by mark-and-sweep; George Collins described reference counting in the same year. Donald Knuth's *The Art of Computer Programming*, Volume 1 (1968) analysed first fit and best fit, introduced the **boundary tag** method for constant-time coalescing, and described the buddy system (invented by Harry Markowitz and published by Kenneth Knowlton in 1965). Doug Lea's dlmalloc (1987), the basis of glibc's ptmalloc, popularised segregated bins. Paul Wilson, Mark Johnstone, Michael Neely and David Boles's survey *Dynamic Storage Allocation: A Survey and Critical Review* (1995) reassessed decades of allocator research using traces of real programs.
:::

## Where this leads

Allocators connect to much of the rest of computer science. The free-list structures are the linked lists and trees of [[data-structures]]; amortised analysis of resizable arrays ([[algorithms]]) explains why `realloc` growth by a constant factor is efficient. [[operating-systems]] covers the kernel's own allocators (the buddy allocator for physical pages and slab allocators for kernel objects) and how `brk` and `mmap` manipulate virtual memory. [[programming-languages]] studies garbage collection in depth and the ownership types that let languages such as Rust prevent use-after-free at compile time, and [[security]] covers heap exploitation and its mitigations.

::: summary
- `malloc`, `calloc`, `realloc` and `free` manage the heap, obtained from the kernel with `brk` and `mmap`; blocks are 16-byte aligned on x86-64 and never move once allocated.
- Allocators trade **throughput** against **peak utilisation** $U_k = \max_{i\le k} P_i / H_k$; poor utilisation comes from **internal** fragmentation (overhead, rounding) and **external** fragmentation (free memory in pieces too small to use).
- An **implicit free list** with **boundary tags** (size and allocated bit in a header and a footer) supports first/next/best-fit placement, splitting, and constant-time coalescing of free neighbours ([[#thm-coalesce]]).
- Practical allocators use **explicit** and **segregated** free lists (size classes) or the **buddy** system; glibc uses 8-byte chunk overhead, 32-byte minimum chunks, segregated bins, per-thread caches and `mmap` for large blocks.
- Memory errors — leaks, use after free, double and invalid frees, heap overflows, uninitialised reads — are undefined behaviour; find them with `-Wall -Wextra`, AddressSanitizer, LeakSanitizer and Valgrind, and prevent them with clear ownership.
- **Garbage collection** frees unreachable blocks automatically: mark from the roots, sweep the rest; reference counting alone cannot reclaim cycles; conservative collectors work even for C.
:::

## Exercises

::: exercise Toy block sizes {level=1 check="80"}
What block size does the toy allocator of this chapter use for `toy_malloc(50)`? How many bytes of that block are overhead or padding? (Enter the block size.)
::: solution
By step 1 of [[#alg-firstfit]], $50 + 16 = 66$, rounded up to a multiple of 16: $80$. Of these, $16$ bytes are header and footer and $80 - 16 - 50 = 14$ bytes are padding, for $30$ bytes of internal fragmentation in all.
:::
:::

::: exercise glibc usable size {level=1 check="72"}
Using the rule shown in the plot (an 8-byte size field plus the request, rounded up to a multiple of 16, minimum 32), what does `malloc_usable_size(malloc(60))` return under glibc on x86-64? (Enter the number of bytes.)
::: solution
$60 + 8 = 68$, rounded up to a multiple of 16 is $80$ — the chunk size. The usable size is the chunk size minus the 8-byte size field: $72$. (The 8 bytes of the *next* chunk's previous-size field are usable while this chunk is allocated, which is why the usable size is not $80 - 16$.) Running `malloc_usable_size(malloc(60))` on the test system prints $72$.
:::
:::

::: exercise Peak utilisation {level=1 check="0.625"}
A heap of 256 bytes (which never grows) serves the requests: allocate 64, allocate 96, free the 64, allocate 32. Using payloads only, compute the peak utilisation $U_4$. (Enter it as a decimal.)
::: solution
Payloads after each request: $P_1 = 64$, $P_2 = 160$, $P_3 = 96$, $P_4 = 128$. The maximum is $160$ and $H_4 = 256$, so by [[#eq-util]] $U_4 = 160/256 = 0.625$. Peak utilisation uses the *maximum* payload so far, not the current one ($128/256 = 0.5$), because the heap had to be large enough for the peak.
:::
:::

::: exercise First fit versus best fit {level=2 check="3"}
A free list contains, in address order, free blocks of sizes 40, 96, 64, 128 and 48 bytes (block sizes include all overhead). Requests for blocks of 48, 32 and 112 bytes arrive in that order, and splitting is allowed whenever the remainder is at least 16. Which blocks satisfy each request under first fit and under best fit? Under best fit, how many free blocks remain afterwards? (Enter that number.)
::: solution
**First fit.** 48: the first block $\ge 48$ is 96, split into 48 (allocated) and 48 free. List: 40, 48, 64, 128, 48. 32: the first block $\ge 32$ is 40, remainder 8 is below 16, so all 40 bytes are allocated. List: 48, 64, 128, 48. 112: the 128 block, remainder 16, split. List: 48, 64, 16, 48 — four free blocks.

**Best fit.** 48: the smallest block $\ge 48$ is the 48 at the end, used exactly. List: 40, 96, 64, 128. 32: the smallest $\ge 32$ is 40, remainder 8, allocated whole. List: 96, 64, 128. 112: only 128 fits, split into 112 and 16. List: 96, 64, 16 — **three** free blocks, and the large 96- and 64-byte blocks are kept intact for future requests.
:::
:::

::: exercise Which coalescing case? {level=2}
In the trace of [[#ex-toy]], suppose instead of freeing `b` then `a`, the program frees `a`, then `c`, then `b`. Give the heap after each `free`, and name the case of [[#thm-coalesce]] used each time.
::: solution
Start: `[32a] [128a] [48a] [3856f]`. Free `a`: predecessor is the prologue (allocated) and successor `b` is allocated, so case 1: `[32f] [128a] [48a] [3856f]`. Free `c`: predecessor `b` allocated, successor the free 3856 block, so case 2: `[32f] [128a] [3904f]`. Free `b`: both neighbours free, case 4: one block of $32 + 128 + 3904 = 4064$, `[4064f]`.
:::
:::

::: exercise Find the bugs {level=2}
Identify every memory error in this function, and fix it.

```c
char *join(const char *a, const char *b) {
    char *r = malloc(strlen(a) + strlen(b));
    strcpy(r, a);
    strcat(r, b);
    free(r);
    return r;
}
```
::: solution
(1) The allocation is one byte short: the result needs `strlen(a) + strlen(b) + 1` bytes for the terminating `'\0'`, so `strcat` writes one byte past the end of the block — a heap buffer overflow. (2) The result of `malloc` is not checked for `NULL`. (3) The block is freed and then returned: the caller receives a dangling pointer, and any use is a use after free. (4) If the lengths were attacker-controlled and huge, the addition could overflow. Fixed:

```c
#include <stdlib.h>
#include <string.h>

char *join(const char *a, const char *b) {     /* caller must free the result */
    size_t la = strlen(a), lb = strlen(b);
    if (la > SIZE_MAX - lb - 1) return NULL;   /* size would overflow */
    char *r = malloc(la + lb + 1);
    if (r == NULL) return NULL;
    memcpy(r, a, la);
    memcpy(r + la, b, lb + 1);                 /* includes b's terminator */
    return r;
}
```
:::
:::

::: exercise A toy realloc {level=3}
Implement `void *toy_realloc(void *p, size_t n)` for the toy allocator with the semantics of `realloc`: `NULL` means `toy_malloc`, $n = 0$ frees and returns `NULL`, a block that is already big enough is returned unchanged, and otherwise a new block is allocated, the old contents copied, and the old block freed; on failure the old block must be left untouched. Test it.
::: solution
```c
#include <string.h>

void *toy_realloc(void *p, size_t n) {
    if (p == NULL) return toy_malloc(n);
    if (n == 0) { toy_free(p); return NULL; }
    size_t have = size_of(p) - 2 * WSIZE;          /* current payload capacity */
    if (n <= have) return p;                       /* shrinking: keep the block */
    void *q = toy_malloc(n);
    if (q == NULL) return NULL;                    /* old block left intact */
    memcpy(q, p, have);
    toy_free(p);
    return q;
}
```

A test that allocates `s = toy_malloc(10)` containing `"systems"`, then `x = toy_malloc(10)` (so that `s` cannot grow in place), then `s = toy_realloc(s, 200)`, prints `systems` and the heap `[32f] [32a] [224a] [3776f]`: the old 32-byte block is free, `x` is untouched, and the new block holds $200 + 16 = 216 \to 224$ bytes. After freeing both, the heap is again `[4064f]`; AddressSanitizer reports no errors. An improvement would grow the block in place when its successor is free and large enough, avoiding the copy; glibc does this, and for blocks served by `mmap` it can even use `mremap` to grow without copying.
:::
:::

::: exercise Dropping the footers {level=3}
Footers cost 8 bytes per block. Show that allocated blocks do not need footers if each header stores, in a second low-order bit, whether the *previous* block is allocated. Explain how each operation of the toy allocator must change, and what the new minimum block size is.
::: solution
A footer is read only by `prev_bp`, during coalescing, to find the start of the *previous* block — and coalescing needs that only if the previous block is free. So only free blocks need footers, provided we can tell, from the current block alone, whether the previous one is free. Store that in bit 1 of each header (the "prev-alloc" bit; sizes are multiples of 16, so bits 1–3 are available).

Changes: `set` for an allocated block writes only the header, preserving the prev-alloc bit; for a free block it writes header and footer. Whenever a block's allocation status changes, the allocator must also update the prev-alloc bit in the *next* block's header. `coalesce` reads the prev-alloc bit of the freed block's header: if it says allocated, it does not touch the predecessor at all; if free, the predecessor has a footer, and the merge proceeds as before. The successor's status is still read from its header.

An allocated block now needs only an 8-byte header, so its payload can extend to the end of the block: the minimum block is still 32 bytes, because a *free* block of that size must hold a header, a footer and (in an explicit-list allocator) two list pointers — $8 + 8 + 16 = 32$; but the overhead of an allocated block falls from 16 to 8 bytes. This is the scheme glibc uses: its chunk "size" field has a `PREV_INUSE` bit, and the previous-size field is valid only when the previous chunk is free.
:::
:::
