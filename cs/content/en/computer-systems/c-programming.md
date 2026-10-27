Python lets you forget where your data live. A list grows when you append to it, an integer never overflows, and an index past the end of a list raises `IndexError`. C makes none of these promises. A C array is a fixed run of bytes at a fixed address; reading past its end reads whatever happens to be there; and a program that does so is not merely wrong but *meaningless*, in a precise sense we shall define. Why, then, is C still the language of operating-system kernels, language runtimes (including the reference implementation of Python itself), databases, network stacks and embedded firmware?

Because C exposes the machine. A C program says exactly how its data are laid out in memory, when memory is obtained and when it is given back, and it compiles to machine code with very little hidden machinery. That makes C the natural language in which to study how programs really run — the subject of this course — and the natural language in which to write the software on which everything else runs.

This chapter teaches enough C for the rest of [[computer-systems]]: the compilation model, types and their sizes, pointers and pointer arithmetic, arrays and strings, structures and their layout in memory, the regions of memory a running program uses, and undefined behaviour. It assumes you can program (in Python, as in [[programming-1/functions]]) and know how integers are represented ([[computer-systems/bits-integers]]). Every program was compiled with GCC 15.2 on x86-64 Linux as `gcc -std=c17 -Wall -Wextra` and tested with `-fsanitize=address,undefined`. Addresses printed by the programs differ between runs, because Linux randomises the layout of each process.

## From source to running program

A minimal C program:

```c
#include <stdio.h>

int main(void) {
    int n = 10;
    long total = 0;
    for (int i = 1; i <= n; i++)
        total += (long) i * i;
    printf("sum of squares 1..%d = %ld\n", n, total);
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -o squares squares.c
$ ./squares
sum of squares 1..10 = 385
```

The differences from Python are not cosmetic. C is **compiled**: `gcc` translates the whole source file to machine code ahead of time, producing an executable file that runs without the compiler. Every variable has a **static type** fixed at compile time (`int n`), which determines its size and the meaning of its bits; there is no run-time type information. Blocks are delimited by braces and statements end with semicolons. Execution starts at `main`, whose return value becomes the process's exit status (by convention, $0$ for success). `printf` prints according to a format string whose **conversion specifications** (`%d` for `int`, `%ld` for `long`, `%zu` for `size_t`, `%p` for pointers, `%s` for strings) must match the argument types — a mismatch is undefined behaviour, and `-Wall` warns about it.

The `gcc` command hides four steps. The **preprocessor** handles lines beginning with `#`: `#include <stdio.h>` pastes in the declarations of the standard input/output library, and `#define` performs textual substitution. The **compiler** proper translates C to assembly language. The **assembler** turns assembly into an **object file** of machine code. Finally the **linker** combines object files and libraries into an executable. The compiler is the subject of [[compilers]], assembly of [[computer-systems/machine-code]], and object files and linking of [[computer-systems/linking-loading]]. The flags matter: `-std=c17` selects the 2017 edition of the language, `-Wall -Wextra` turn on warnings that catch real bugs, `-O2` enables optimisation, `-g` keeps debugging information, and `-fsanitize=address,undefined` adds run-time checks used throughout this chapter.

### Types and declarations

C's basic types are the integer types of [[computer-systems/bits-integers]] (`char`, `short`, `int`, `long`, `long long`, their `unsigned` versions, the exact-width types `int32_t`, `uint64_t` … from `<stdint.h>`, and `size_t` for sizes), the floating types `float` and `double` of [[computer-systems/floating-point]], `_Bool` (spelt `bool` with `<stdbool.h>`), and `void`, meaning "no value". From these we build **derived types**: pointers, arrays, structures, unions and functions. The operator `sizeof` gives the size of a type or object in bytes, as a `size_t`, computed at compile time.

A local variable that is not initialised has an *indeterminate* value — whatever bits were left in that memory. Reading it is a bug (and for some types undefined behaviour). Always initialise.

## Objects, addresses and pointers

::: definition Object and address {#def-object}
An **object** is a region of memory that holds a value of some type; it occupies `sizeof(T)` consecutive bytes for its type `T`. The **address** of an object is the address of its first (lowest) byte. For an object designated by an expression `x`, the expression `&x` gives its address, and its type is "pointer to `T`", written `T *`.
:::

::: definition Pointer {#def-pointer}
A **pointer** is a value that designates an object (or one position past the end of an array, or nothing at all: the **null pointer**, written `NULL`). If `p` has type `T *` and points to an object, the expression `*p` (**dereferencing** `p`) designates that object: it can be read, and, unless `T` is `const`-qualified, assigned to. On x86-64 a pointer is a 64-bit address.
:::

Pointers are how C passes "references". C calls functions **by value**: the callee receives copies of its arguments, exactly as [[programming-1/functions]] described for Python's immutable values. To let a function change a caller's variable, pass its address:

```c
#include <stdio.h>

static void swap_wrong(int x, int y) { int t = x; x = y; y = t; }
static void swap(int *x, int *y)      { int t = *x; *x = *y; *y = t; }

int main(void) {
    int a = 1, b = 2;
    swap_wrong(a, b);
    printf("after swap_wrong: a = %d, b = %d\n", a, b);
    swap(&a, &b);
    printf("after swap:       a = %d, b = %d\n", a, b);
    return 0;
}
```

```console
$ ./swap
after swap_wrong: a = 1, b = 2
after swap:       a = 2, b = 1
```

`swap_wrong` exchanges its own copies and has no effect on `a` and `b`. `swap` receives the addresses `&a` and `&b`; inside it, `*x` *is* `a`, so assigning to `*x` changes `a`. This is also how C functions return several results (`scanf("%d", &n)` stores into `n`) and how large objects are passed cheaply (a pointer is 8 bytes however big the object).

When two expressions designate the same object, they are **aliases**. Aliasing is the source of many subtle bugs, because writing through one name silently changes what the other reads.

::: widget mapping
domain: p; q; r
codomain: a; b; c
map: p>a; q>b; r>a
caption: Three pointer variables and the objects they point to. A pointer assignment draws an arrow; `*p` follows it. The map is not injective — `p` and `r` both point to `a`, so `*p` and `*r` are **aliases**, and writing `*p = 5` changes the value read by `*r`. Change `r>a` to `r>c` to remove the aliasing, and notice that the figure now reports the map as injective: no two pointers share a target (with as many pointers as objects, it is even a bijection). Code that assumes its pointer arguments are not aliased (as `memcpy` does) must document it; C99's `restrict` qualifier states the assumption to the compiler.
:::

::: example Tracing pointer assignments {#ex-trace}
What does this program print? Give the state after each numbered statement.

```c
#include <stdio.h>

int main(void) {
    int x = 5, y = 7;
    int *p = &x, *q = &y;
    *p = *q + 1;          /* (1) */
    q = p;                /* (2) */
    *q *= 2;              /* (3) */
    int **pp = &p;
    **pp += y;            /* (4) */
    printf("x = %d, y = %d, *q = %d\n", x, y, *q);
    return 0;
}
```
::: solution
Initially $x = 5$, $y = 7$, `p` points to `x` and `q` to `y`.

| after | `x` | `y` | `p` → | `q` → | reason |
|---|---|---|---|---|---|
| (1) | 8 | 7 | `x` | `y` | `*q` is `y` $= 7$; `*p` is `x`, set to $8$ |
| (2) | 8 | 7 | `x` | `x` | copies the *pointer*: now `p` and `q` alias `x` |
| (3) | 16 | 7 | `x` | `x` | `*q` is `x`, doubled |
| (4) | 23 | 7 | `x` | `x` | `pp` points to `p`, so `**pp` is `*p`, which is `x`; $16 + 7 = 23$ |

The program prints `x = 23, y = 7, *q = 23`. The distinction to keep straight is between assigning to a pointer (`q = p`, which changes where `q` points) and assigning through it (`*q = …`, which changes the object it points to). A pointer to a pointer (`int **`) adds one more level: C functions use it when they must change a caller's *pointer*, for example to allocate memory on its behalf.
:::
:::

### Pointer arithmetic and arrays

An **array** `T a[n]` is $n$ objects of type `T` stored contiguously, `a[0]` at the lowest address. Its size is `n * sizeof(T)`, and its length must (for ordinary arrays) be known when the array is created. C does not store the length anywhere and does not check indices.

::: definition Pointer arithmetic {#def-ptr-arith}
If `p` points to element `i` of an array of `T` and `k` is an integer, then `p + k` points to element `i + k`, provided $0 \le i + k \le n$ (position $n$, one past the end, may be computed and compared but not dereferenced). Numerically, the address increases by `k * sizeof(T)` bytes. If `p` and `q` point into the same array, `q - p` is the number of *elements* between them, of type `ptrdiff_t`. Any other pointer arithmetic is undefined behaviour.
:::

::: theorem Subscripting is pointer arithmetic {#thm-subscript}
In C, `E1[E2]` is defined to mean `*((E1) + (E2))`. In most expressions an array `a` is converted ("decays") to a pointer to its first element, `&a[0]`. Consequently `a[i]`, `*(a + i)` and even `i[a]` designate the same object.
:::

::: proof
The first sentence is the definition of the subscript operator in the C standard (§6.5.2.1 of C17), and the second is the array-to-pointer conversion rule (§6.3.2.1), which applies everywhere except as the operand of `sizeof`, of unary `&`, or as a string literal initialising an array. Given these, `a[i]` is `*(a + i)` by definition, where `a` has decayed to `&a[0]`; by [[#def-ptr-arith]] `a + i` points to element `i`. Since `+` between a pointer and an integer is commutative, `*(a + i)` = `*(i + a)` = `i[a]`.
:::

```c
#include <stdio.h>

int main(void) {
    int a[4] = {10, 20, 30, 40};
    int *p = a;                       /* the array decays to &a[0] */
    printf("sizeof a = %zu, sizeof p = %zu\n", sizeof a, sizeof p);
    printf("p = %p, p + 1 = %p\n", (void *) p, (void *) (p + 1));
    printf("*(p + 2) = %d, p[2] = %d, 2[p] = %d\n", *(p + 2), p[2], 2[p]);
    int *q = &a[3];
    printf("q - p = %td\n", q - p);   /* counts elements, not bytes */
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -o ptr ptr.c && ./ptr
sizeof a = 16, sizeof p = 8
p = 0x7ffff9a26e10, p + 1 = 0x7ffff9a26e14
*(p + 2) = 30, p[2] = 30, 2[p] = 30
q - p = 3
```

`p + 1` is four bytes beyond `p`, because `sizeof(int)` is $4$. And `sizeof a` is $16$ — the whole array — whereas `sizeof p` is $8$, the size of a pointer. The difference matters as soon as an array is passed to a function: a parameter declared `int a[]` *is* a pointer `int *a`, so inside the function `sizeof a` is $8$ and the length is lost. That is why C functions on arrays take the length as a separate argument, as in `void reverse(int *a, size_t n)`, and why the idiom `sizeof v / sizeof v[0]` for the number of elements works only where `v` is declared as an array.

::: example Pointer arithmetic by hand {#ex-ptr-arith}
`double d[10]` starts at address `0x7ffc0000a000`. What are the addresses `d + 3` and `&d[9] + 1`, and what is `&d[7] - &d[2]`? Which of the expressions `*(d + 9)`, `d + 10`, `*(d + 10)`, `d + 11` are allowed?
::: solution
`sizeof(double)` is $8$, so `d + 3` is $3 \times 8 = 24 = $ `0x18` bytes further: `0x7ffc0000a018`. `&d[9] + 1` is `d + 10`, $80 = $ `0x50` bytes in: `0x7ffc0000a050`, the one-past-the-end position. `&d[7] - &d[2]` is $5$ (elements, not $40$ bytes).

`*(d + 9)` reads the last element: allowed. `d + 10` may be computed (and compared with other pointers into `d`), which is what makes loops like `for (p = d; p < d + 10; p++)` legal. `*(d + 10)` dereferences one past the end: undefined behaviour. `d + 11` is undefined even without dereferencing, by [[#def-ptr-arith]].
:::
:::

### Strings

C has no string type. A **string** is a sequence of `char` ending with the **null character** `'\0'` (the byte $0$), and a string is handled through a `char *` pointing to its first character. The length is found by walking to the terminator, so `strlen` takes time proportional to the length, and a missing terminator sends every string function wandering through memory.

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[] = "cat";                 /* array of 4 chars: 'c' 'a' 't' '\0' */
    const char *t = "cat";            /* pointer to a read-only literal */
    printf("sizeof s = %zu, strlen(s) = %zu, sizeof t = %zu\n",
           sizeof s, strlen(s), sizeof t);
    s[0] = 'b';                       /* fine: s is our own array */
    printf("%s %s\n", s, t);
    char buf[8];
    int n = snprintf(buf, sizeof buf, "%s-%s", "abcd", "efgh");
    printf("buf = \"%s\", needed %d chars\n", buf, n);
    return 0;
}
```

```console
$ ./str
sizeof s = 4, strlen(s) = 3, sizeof t = 8
bat cat
buf = "abcd-ef", needed 9 chars
```

`s` is an array initialised from the literal, so it has room for the terminator and can be modified. `t` points to the literal itself, which lives in read-only memory: assigning `t[0] = 'b'` would be undefined behaviour (in practice, a crash). `snprintf` writes at most `sizeof buf` bytes including the terminator, truncating if necessary, and returns the length the full output *would* have had, so the caller can detect truncation (`n >= sizeof buf`). GCC even warns at compile time here: `'snprintf' output 10 bytes into a destination of size 8`. The older functions `strcpy`, `strcat` and `sprintf` write as much as their input demands, whatever the size of the destination; [[#sec-ub]] explains why that is dangerous.

::: quiz
After `char name[16] = "Ada";` and `char *p = name + 1;`, what are `sizeof name`, `strlen(name)`, `*p` and `strlen(p)`?
- [ ] $4$, $3$, `'A'`, $3$
- [x] $16$, $3$, `'d'`, $2$
- [ ] $16$, $16$, `'d'`, $15$
- [ ] $8$, $3$, `'d'`, $2$
::: solution
`name` is an array of 16 chars, so `sizeof name` is $16$ regardless of its contents (the initialiser fills the rest with zeros). `strlen` counts characters before the first `'\0'`: $3$. `p` points to `name[1]`, which is `'d'`, and the string starting there is `"da"`, of length $2$. The answer $8$ would be `sizeof p`, the size of a pointer.
:::
:::

## Structures and memory layout

A **structure** groups named members of possibly different types into one object:

```c
struct point { double x, y; };
struct point p = { .x = 1.5, .y = -2.0 };
struct point *pp = &p;
pp->x = 3.0;             /* same as (*pp).x = 3.0 */
```

Structures are passed and assigned by value (the whole object is copied), so large structures are usually passed by pointer, and `pp->x` abbreviates `(*pp).x`. Combined with pointers, structures build every linked data structure of [[data-structures]]: a list node is `struct node { int value; struct node *next; };`.

How are the members laid out? In order of declaration, but not necessarily contiguously, because of alignment.

::: definition Alignment {#def-alignment}
A type `T` has an **alignment** `_Alignof(T)`, a power of two: every object of type `T` must start at an address that is a multiple of it. On x86-64 Linux (the System V ABI) each basic type is aligned to its size: `char` to 1, `short` to 2, `int` and `float` to 4, `long`, `double` and pointers to 8. A structure is aligned to the largest alignment of its members. The compiler places each member at the lowest offset that is a multiple of its alignment and not before the previous member's end, inserting unused **padding** bytes as needed, and adds **trailing padding** so that the size is a multiple of the structure's alignment.
:::

Alignment exists because hardware reads memory in aligned chunks; an 8-byte value that straddles two cache lines ([[computer-systems/memory-hierarchy]]) costs two accesses, and some processors refuse misaligned accesses altogether. Trailing padding ensures that in an *array* of structures every element is aligned too.

```c
#include <stdio.h>
#include <stddef.h>

struct rec {
    char   tag;      /* 1 byte */
    int    count;    /* 4 bytes, must start at a multiple of 4 */
    char   flag;     /* 1 byte */
    double value;    /* 8 bytes, must start at a multiple of 8 */
};

struct rec2 {        /* same fields, largest first */
    double value;
    int    count;
    char   tag;
    char   flag;
};

int main(void) {
    printf("offsets: tag %zu, count %zu, flag %zu, value %zu\n",
           offsetof(struct rec, tag), offsetof(struct rec, count),
           offsetof(struct rec, flag), offsetof(struct rec, value));
    printf("sizeof(struct rec) = %zu, sizeof(struct rec2) = %zu\n",
           sizeof(struct rec), sizeof(struct rec2));
    return 0;
}
```

```console
$ ./layout
offsets: tag 0, count 4, flag 8, value 16
sizeof(struct rec) = 24, sizeof(struct rec2) = 16
```

::: example Computing a layout {#ex-layout}
Explain the offsets and both sizes above.
::: solution
In `struct rec`: `tag` goes at offset $0$ and ends at $1$. `count` needs a multiple of $4$; the next is $4$, so bytes $1$–$3$ are padding, and `count` occupies $4$–$7$. `flag` needs alignment $1$ and goes at $8$. `value` needs a multiple of $8$; the next is $16$, so bytes $9$–$15$ are padding, and `value` occupies $16$–$23$. The size $24$ is already a multiple of the structure's alignment $8$. Of the 24 bytes, 10 are padding.

In `struct rec2`: `value` at $0$–$7$, `count` at $8$–$11$, `tag` at $12$, `flag` at $13$. That is $14$ bytes, rounded up to the next multiple of $8$: $16$, with 2 bytes of trailing padding. The same data take a third less space — for an array of a million records, 8 MB less memory and correspondingly fewer cache misses.
:::
:::

The reordering trick works in general.

::: proposition Ordering members by decreasing alignment {#prop-order}
Suppose every member's size is a multiple of its alignment and all alignments are powers of two (true of the basic types, of arrays and of structures). If the members of a structure are declared in order of non-increasing alignment, the compiler inserts no padding between members; only trailing padding, of fewer bytes than the structure's alignment, can remain. The resulting size is the minimum possible for those members under the layout rule of [[#def-alignment]].
:::

::: proof
Let the members be $m_1, \ldots, m_k$ with alignments $a_1 \ge a_2 \ge \cdots \ge a_k$ and sizes $s_i$, each a multiple of $a_i$. We show by induction that member $m_j$ can be placed at offset $o_j = s_1 + \cdots + s_{j-1}$ with no padding. For $j = 1$, $o_1 = 0$. For $j > 1$, every earlier $s_i$ is a multiple of $a_i$, and $a_i \ge a_j$ are powers of two, so $a_j$ divides $a_i$ and hence divides $s_i$; therefore $a_j$ divides $o_j$, which is exactly the alignment requirement. So the members occupy $S = \sum s_i$ bytes contiguously, and the total size is $S$ rounded up to a multiple of $a_1$, with fewer than $a_1$ bytes of trailing padding. No layout can be smaller: any layout places all members without overlap, so its size is at least $S$, and it must be a multiple of the structure alignment $a_1$, so it is at least $S$ rounded up to a multiple of $a_1$.
:::

The C standard forbids the compiler to reorder members (their order is part of the program's meaning, visible through `offsetof` and pointer casts), so the programmer must do it.

## The regions of a running program {#sec-regions}

When a program runs as a process ([[computer-systems/exceptions-processes]]), the operating system gives it a private **address space** — on x86-64 Linux, $2^{47}$ bytes ($128$ TiB) of virtual addresses for the program — divided into regions with different purposes and lifetimes:

| region | contents | lifetime |
|---|---|---|
| text (code) | machine instructions | whole run; read-only and executable |
| read-only data | string literals, `const` globals | whole run; read-only |
| data and bss | global and `static` variables (initialised, and zero-initialised) | whole run |
| heap | objects from `malloc`, `calloc`, `realloc` | from allocation until `free` |
| stack | local variables, function arguments, return addresses | until the function returns |
| shared libraries | the C library and others | mapped at start-up or on demand |

```c
#include <stdio.h>
#include <stdlib.h>

int counter = 0;                     /* global: data segment */

int main(void) {
    int local = 0;                   /* stack */
    int *heap = malloc(sizeof *heap);/* heap */
    if (heap == NULL) return 1;
    const char *lit = "hello";       /* read-only data */
    printf("code   %p\n", (void *) main);
    printf("rodata %p\n", (void *) lit);
    printf("data   %p\n", (void *) &counter);
    printf("heap   %p\n", (void *) heap);
    printf("stack  %p\n", (void *) &local);
    free(heap);
    return 0;
}
```

```console
$ ./regions
code   0x621c997611a9
rodata 0x621c99762004
data   0x621c99764014
heap   0x621cb9a04010
stack  0x7ffe7bc317c4
```

(Converting a function pointer to `void *` for printing is a common extension that ISO C does not guarantee; `-Wpedantic` warns about it.) The program's code, constants and globals sit together low in the address space, in that order; the heap starts a little above them and grows upwards; the stack sits near the top of the user address space and grows downwards. Run the program twice and every number changes, because of **address-space layout randomisation** (ASLR), a security measure that makes addresses hard to predict.

The **stack** holds one **frame** per active function call, containing its local variables and the bookkeeping needed to return to the caller ([[computer-systems/machine-code]] shows frames in detail). Allocation is automatic and almost free — moving a pointer — but a local variable dies when its function returns. Returning its address is therefore a bug, and GCC warns:

```console
$ gcc -std=c17 -Wall -Wextra -c dangle.c
dangle.c: In function 'make':
dangle.c:3:12: warning: function returns address of local variable [-Wreturn-local-addr]
    3 |     return &x;            /* x dies when make returns */
      |            ^~
```

The **heap** is for objects whose size is known only at run time or that must outlive the function that creates them. `malloc(n)` returns a pointer to `n` fresh bytes (or `NULL` if none are available), with indeterminate contents; `calloc(k, size)` returns zeroed space for `k` elements; `free(p)` gives the space back. Nothing frees heap memory automatically: forgetting is a **leak**, freeing twice or using the memory after freeing it are errors with undefined behaviour. [[computer-systems/dynamic-memory]] shows how an allocator implements these functions.

::: example A dynamically sized array {#ex-malloc}
Write a function that returns a new heap array holding the first `n` squares, and use it correctly.
::: solution
```c
#include <stdio.h>
#include <stdlib.h>

/* Return a new array of n squares, or NULL if memory is exhausted. */
static long *squares(size_t n) {
    long *a = malloc(n * sizeof *a);    /* n is small here; see below */
    if (a == NULL) return NULL;
    for (size_t i = 0; i < n; i++)
        a[i] = (long) (i * i);
    return a;                           /* caller must free */
}

int main(void) {
    long *sq = squares(6);
    if (sq == NULL) { perror("squares"); return 1; }
    for (size_t i = 0; i < 6; i++) printf("%ld ", sq[i]);
    printf("\n");
    free(sq);                           /* every malloc needs one free */
    sq = NULL;                          /* avoid a dangling pointer */
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -fsanitize=address,undefined -o sq sq.c && ./sq
0 1 4 9 16 25
```

The array cannot be a local variable of `squares`, because it must outlive the call. Writing `sizeof *a` rather than `sizeof(long)` keeps the allocation right if the type of `a` changes. The result of `malloc` is checked, ownership is documented ("caller must free"), and the caller frees exactly once. For untrusted `n`, the multiplication `n * sizeof *a` must be checked for overflow as in [[computer-systems/bits-integers]]; `calloc(n, sizeof *a)` does that check itself. AddressSanitizer reports no leaks or errors for this program.
:::
:::

## Undefined behaviour {#sec-ub}

::: definition Undefined behaviour {#def-ub}
**Undefined behaviour** is behaviour, "upon use of a nonportable or erroneous program construct or of erroneous data", for which the C standard imposes no requirements. A program whose execution performs an undefined operation has no meaning at all: the compiler may assume it never happens, and the actual result can be anything — the expected answer, a crash, a wrong answer, or different behaviour at different optimisation levels.
:::

The standard distinguishes undefined behaviour from **implementation-defined** behaviour (each compiler must choose and document a behaviour, such as the result of right-shifting a negative number) and **unspecified** behaviour (one of several outcomes, not necessarily documented, such as the order in which function arguments are evaluated). The common sources of undefined behaviour are:

- accessing an array outside its bounds, or forming a pointer more than one past its end;
- dereferencing a null, dangling (freed or out-of-scope) or misaligned pointer;
- reading an uninitialised local variable;
- signed integer overflow, shifting by the width or more, dividing by zero, converting an out-of-range float to an integer;
- modifying a string literal or a `const` object;
- accessing an object through a pointer of an incompatible type (the **strict aliasing** rule; `memcpy` and `unsigned char *` are the sanctioned ways to look at an object's bytes);
- modifying a variable twice without an intervening sequence point, as in `i = i++ + 1`;
- a data race between threads ([[parallel-computing]]).

Undefined behaviour exists so that C can be compiled to fast code on every machine: the compiler need not insert bounds checks or overflow checks, and it may optimise on the assumption that the program is correct. The price is that bugs do not announce themselves. An out-of-bounds read usually just returns a neighbouring value. This loop runs once too often:

```c
#include <stdio.h>

int main(void) {
    int a[4] = {1, 2, 3, 4};
    int sum = 0;
    for (int i = 0; i <= 4; i++)     /* bug: should be i < 4 */
        sum += a[i];
    printf("%d\n", sum);
    return 0;
}
```

Compiled normally, it prints some number and exits successfully. Compiled with AddressSanitizer, which surrounds every object with poisoned "red zones" and checks every access, it stops at the bad read (output shortened):

```console
$ gcc -std=c17 -Wall -Wextra -g -fsanitize=address -o oob oob.c && ./oob
=================================================================
==3255279==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7856be8f0030 ...
READ of size 4 at 0x7856be8f0030 thread T0
    #0 0x5d964c8a7424 in main .../oob.c:7
...
  This frame has 1 object(s):
    [32, 48) 'a' (line 4) <== Memory access at offset 48 overflows this variable
```

::: warning "It worked when I ran it"
A C program with undefined behaviour can pass every test and then fail in production, under a different compiler version, at a different optimisation level, or on different input. Running it proves nothing. Instead: compile with `-Wall -Wextra` and fix every warning; test with `-fsanitize=address,undefined` (AddressSanitizer for memory errors, UBSan for overflow and similar); use tools such as Valgrind, static analysers and fuzzers; and prefer interfaces that carry sizes (`snprintf`, `strnlen`, `memcpy` with explicit lengths) to those that do not (`gets`, which was removed from the language in C11, `strcpy`, `sprintf`).
:::

::: application Buffer overflows and their defences
When a program copies untrusted input into a fixed-size buffer without checking its length — `strcpy(buf, input)` with a 64-byte `buf` and a longer `input` — the extra bytes overwrite whatever lies next in memory. On the stack, that includes the saved return address of the current function ([[computer-systems/machine-code]]), so a carefully chosen input could make the function "return" to an address of the attacker's choosing. This class of bug, the **buffer overflow**, has been among the most damaging in software since the Morris worm of 1988, which spread partly through an overflow in the `fingerd` server's use of `gets`.

Modern systems defend in depth. The first and best defence is in the code: check lengths, use bounded functions, or use a memory-safe language for new code that handles untrusted input. Behind that, compilers insert **stack canaries** (`-fstack-protector`, on by default in Ubuntu's GCC), a secret value placed before the return address and checked before returning; the operating system marks the stack and heap non-executable (**W⊕X**, "write xor execute"), and randomises addresses (**ASLR**); and newer processors add hardware **shadow stacks** that keep a protected copy of return addresses (Intel CET, enabled by GCC's `-fcf-protection`). Each defence can be bypassed in isolation, which is why they are combined. The details are in [[security]]; in this course, overflow experiments are confined to toy programs on your own machine, built with sanitisers so that the bug is reported rather than exploited.
:::

::: history
C was created by Dennis Ritchie at Bell Labs between 1969 and 1973, evolving from Ken Thompson's language B (itself derived from Martin Richards's BCPL), in order to rewrite the Unix kernel in a high-level language; the rewrite was done in 1973. Brian Kernighan and Ritchie's book *The C Programming Language* (1978) defined the language for a decade ("K&R C"). ANSI standardised C in 1989 (ISO adopted it in 1990: "C89/C90"), adding function prototypes and `const`; later editions are C99 (`//` comments, `long long`, `stdint.h`, `restrict`, declarations anywhere), C11 (threads, atomics, `_Alignof`, removal of `gets`), C17 (corrections only) and C23 (published by ISO in 2024: `bool` and `nullptr` keywords, mandatory two's complement, `<stdckdint.h>`). Ritchie and Thompson received the 1983 Turing Award for Unix.
:::

## Where this leads

The next chapter, [[computer-systems/machine-code]], compiles the constructs of this chapter — arithmetic, pointers, arrays, structures, loops and function calls — to x86-64 instructions and shows what a stack frame really contains. The layout rules of this chapter return in [[computer-systems/memory-hierarchy]], where the order in which a program touches memory decides its speed, and the heap returns in [[computer-systems/dynamic-memory]]. Larger-scale C — header files, separate compilation, `static` and `extern` — is the subject of [[computer-systems/linking-loading]]. Languages that keep C's control over memory while ruling out undefined behaviour at compile time are discussed in [[programming-languages]].

::: summary
- C is compiled ahead of time with static types; `gcc` runs the preprocessor, compiler, assembler and linker. Compile with `-std=c17 -Wall -Wextra`, and test with `-fsanitize=address,undefined`.
- Every object has an address; `&x` takes it and `*p` follows it. Arguments are passed by value, so functions modify caller variables through pointers; two names for one object are **aliases**.
- Pointer arithmetic moves in units of the pointed-to type, valid only within an array and one past its end; `a[i]` means `*(a + i)` and arrays decay to pointers ([[#thm-subscript]]), so functions receive arrays without their lengths.
- Strings are `char` arrays terminated by `'\0'`; use length-aware functions such as `snprintf`.
- Structure members are aligned to their natural boundaries, with padding; ordering members by decreasing alignment minimises the size ([[#prop-order]]).
- A process has text, read-only data, data/bss, heap and stack regions; locals die when their function returns, heap objects live until `free`.
- **Undefined behaviour** — out-of-bounds access, dangling pointers, uninitialised reads, signed overflow — makes a program meaningless; it is the root of buffer-overflow vulnerabilities, defended against by careful code, sanitisers, canaries, W⊕X, ASLR and shadow stacks.
:::

## Exercises

::: exercise Structure size {level=1 check="24"}
On x86-64 Linux, what is `sizeof(struct s)` for `struct s { char c; double d; short h; };`? Give the offsets. (Enter the size.)
::: solution
`c` at offset $0$; `d` needs a multiple of $8$, so offsets $1$–$7$ are padding and `d` occupies $8$–$15$; `h` at $16$–$17$. The members end at $18$, and the structure's alignment is $8$, so the size is rounded up to $24$. Reordering as `double d; short h; char c;` gives $8 + 2 + 1 = 11$, rounded to $16$. GCC prints $24$ for the original.
:::
:::

::: exercise Pointer arithmetic {level=1 check="40"}
`short *p` holds the address `0x1000`, and `long *q` holds `0x1000`. By how many bytes does `p + 20` exceed `p`, and by how many does `q + 5` exceed `q`? (Enter the byte difference for `p + 20`.)
::: solution
`sizeof(short)` is $2$, so `p + 20` is $40$ bytes further (`0x1028`). `sizeof(long)` is $8$, so `q + 5` is also $40$ bytes further. In both cases the arithmetic is only defined if the pointers point into arrays long enough.
:::
:::

::: exercise Spot the undefined behaviour {level=1}
Which of these fragments have undefined behaviour? (a) `int x; printf("%d\n", x);` (b) `unsigned u = 0; u--;` (c) `char *s = "abc"; s[0] = 'X';` (d) `int a[3]; int *p = a + 3;` (e) `int a[3]; int *p = a + 4;` (f) `printf("%d\n", 3.5);`
::: solution
(a) Undefined in practice: `x` is uninitialised and has an indeterminate value (for an automatic variable whose address is never taken, reading it is undefined behaviour). (b) Defined: unsigned arithmetic wraps, `u` becomes `UINT_MAX`. (c) Undefined: string literals must not be modified. (d) Defined: one past the end may be formed. (e) Undefined: two past the end. (f) Undefined: `%d` requires an `int` but receives a `double`; on x86-64 it typically prints garbage, because the double is passed in `%xmm0` while `printf` reads `%esi`. GCC's `-Wall` warns about (a) (`'x' is used uninitialized`) and (f) (`format '%d' expects argument of type 'int'`), but compiles (c) silently, because in C a string literal has type `char[4]` rather than `const char[4]`; the option `-Wwrite-strings` turns (c) into a warning too.
:::
:::

::: exercise Implement strlen {level=2}
Write `size_t my_strlen(const char *s)` using pointer arithmetic (no indexing), and explain why it must take a `const char *`. What does it do if `s` is not null-terminated?
::: solution
```c
#include <stdio.h>
#include <stddef.h>

static size_t my_strlen(const char *s) {
    const char *p = s;
    while (*p != '\0')
        p++;
    return (size_t) (p - s);
}

int main(void) {
    printf("%zu %zu\n", my_strlen("systems"), my_strlen(""));
    return 0;
}
```

```console
$ ./mystrlen
7 0
```

`p - s` counts the characters before the terminator. The parameter is `const char *` so that the function promises not to modify the string and can be called on string literals and other read-only data. If there is no terminator, the loop reads past the end of the array — undefined behaviour; in practice it either finds a stray zero byte somewhere and returns a wrong length, or reaches unmapped memory and crashes. This is why `strnlen(s, max)` exists.
:::
:::

::: exercise Reverse in place {level=2}
Write `void reverse(int *a, size_t n)` that reverses an array using two pointers moving towards each other. State a loop invariant and use it to prove correctness, including for $n = 0$ and $n = 1$.
::: solution
```c
#include <stdio.h>
#include <stddef.h>

/* Reverse a[0..n-1] in place using two pointers. */
static void reverse(int *a, size_t n) {
    if (n == 0) return;
    int *lo = a, *hi = a + n - 1;
    while (lo < hi) {
        int t = *lo; *lo = *hi; *hi = t;
        lo++; hi--;
    }
}

int main(void) {
    int v[] = {1, 2, 3, 4, 5};
    size_t n = sizeof v / sizeof v[0];
    reverse(v, n);
    for (size_t i = 0; i < n; i++) printf("%d ", v[i]);
    printf("\n");
    return 0;
}
```

```console
$ ./rev
5 4 3 2 1 
```

Let $A$ be the original contents, $\ell = $ `lo - a` and $h = $ `hi - a`. **Invariant**: $\ell + h = n - 1$; for $i < \ell$ and for $i > h$, $a[i] = A[n-1-i]$; and for $\ell \le i \le h$, $a[i] = A[i]$. Initially $\ell = 0$, $h = n - 1$, and the first two conditions are vacuous. One iteration with $\ell < h$ swaps positions $\ell$ and $h = n-1-\ell$, so afterwards $a[\ell] = A[n-1-\ell]$ and $a[h] = A[n-1-h]$, and the increments restore the invariant. Each iteration reduces $h - \ell$ by $2$, so the loop terminates, with $\ell \ge h$. Then every $i$ is either outside $[\ell, h]$, where $a[i] = A[n-1-i]$, or equal to the middle index $\ell = h = (n-1)/2$, for which $A[i] = A[n-1-i]$ anyway. For $n = 1$ the loop does not run, correctly. The early return for $n = 0$ is essential: `a + n - 1` would be `a - 1`, an invalid pointer.
:::
:::

::: exercise The aliasing trap {level=2 check="0"}
The "XOR swap" `void xs(int *x, int *y) { *x ^= *y; *y ^= *x; *x ^= *y; }` exchanges two integers without a temporary. What is `a` after `int a = 7; xs(&a, &a);`? Explain. (Enter the value.)
::: solution
With `x` and `y` both pointing to `a`, the first statement computes `a ^= a`, which is $0$. The remaining two statements XOR $0$ with $0$. So `a` ends as $0$, not $7$: the value is destroyed. The algebra of the XOR swap (from [[computer-systems/bits-integers]]) assumes `*x` and `*y` are different objects. The ordinary swap with a temporary works even when they alias. GCC confirms: the program prints `0`.
:::
:::

::: exercise Minimal padding {level=3 check="12"}
Using [[#prop-order]], find the smallest possible size of a structure containing one each of `char`, `short`, `int` and `char` (two chars in total), and give a declaration order that achieves it. Then compute the size for the order `short a; char b; int c; char d;`. (Enter the size of the second order.)
::: solution
Ordered by decreasing alignment, `int c; short a; char b; char d;` places members at offsets $0$, $4$, $6$, $7$: $8$ bytes with no padding, and $8$ is a multiple of the alignment $4$, so the size is $8$ — the minimum, by the proposition. For `short a; char b; int c; char d;`: `a` at $0$–$1$, `b` at $2$, one byte of padding, `c` at $4$–$7$, `d` at $8$, then three bytes of trailing padding to reach a multiple of $4$: size $12$. GCC agrees ($12$).
:::
:::

::: exercise A bounded copy {level=3}
Write `size_t copy_str(char *dst, size_t cap, const char *src)` that copies as much of `src` as fits into `dst` (whose size is `cap`), always null-terminates when `cap > 0`, never writes outside `dst[0..cap-1]`, and returns `strlen(src)` so that the caller can detect truncation. Prove the bound on writes.
::: solution
```c
#include <stdio.h>
#include <string.h>

size_t copy_str(char *dst, size_t cap, const char *src) {
    size_t len = strlen(src);
    if (cap > 0) {
        size_t n = len < cap - 1 ? len : cap - 1;   /* room for '\0' */
        memcpy(dst, src, n);
        dst[n] = '\0';
    }
    return len;
}

int main(void) {
    char buf[5];
    size_t need = copy_str(buf, sizeof buf, "computer");
    printf("\"%s\" (truncated: %s)\n", buf, need >= sizeof buf ? "yes" : "no");
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -fsanitize=address,undefined -o copy copy.c && ./copy
"comp" (truncated: yes)
```

If `cap == 0` nothing is written. Otherwise $n = \min(len, cap - 1) \le cap - 1$; `memcpy` writes `dst[0]` to `dst[n-1]`, and the terminator goes to `dst[n]`, so the highest index written is $n \le cap - 1$, inside the buffer. The terminator is always written, so `dst` is a valid string. Truncation occurred exactly when $len \ge cap$, which the caller tests with the return value. This is the contract of the BSD function `strlcpy`, which glibc has provided since version 2.38 (2023) and which POSIX added in its 2024 edition.
:::
:::
