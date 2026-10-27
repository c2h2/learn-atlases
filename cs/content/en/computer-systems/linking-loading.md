Every program of any size is split into many source files, compiled separately, and combined with libraries written by other people. When `main.c` calls a function `sum` defined in `sum.c`, the compiler translating `main.c` has never seen `sum` and has no idea where it will end up in memory. When either file calls `printf`, nobody even compiles `printf`: it sits ready-made in the C library, which on a typical Linux system is not copied into the program at all, but shared, already in memory, by every running process. Something has to connect the uses of names to their definitions and fix up the addresses. That something is the **linker**, aided at run time by the **loader** and the **dynamic linker**.

Linking is easy to ignore until it fails, and then its error messages — `undefined reference to 'sum'`, `multiple definition of 'counter'`, `cannot open shared object file` — are baffling without a model of what it does. Understanding linking also explains the scope rules of C (`static` and `extern`), why the order of libraries on a command line matters, how shared libraries save memory and can be updated without recompiling programs, and what the mysterious `@PLT` in the assembly of [[computer-systems/machine-code]] means.

This chapter follows one small program from object files to a running process. We look inside object files (the ELF format), define symbols and the rules for resolving them, work through relocation, build static and shared libraries, and see how a program is loaded. The tools are the GNU toolchain on x86-64 Linux as of 2026: GCC 15.2, GNU `ld` 2.46, glibc 2.43, and the inspection tools `nm`, `readelf` and `objdump`. Programs in this chapter were compiled with `gcc -std=c17 -Wall -Wextra` and no optimisation, so that the machine code follows the source closely; Ubuntu's GCC adds an `endbr64` instruction at the start of each function for control-flow protection, which you can ignore.

## A program in two files

Here is the running example. A header file declares what `sum.c` provides; each `.c` file includes it.

```c
/* vec.h */
#ifndef VEC_H
#define VEC_H
int sum(const int *a, int n);   /* declaration: defined in sum.c */
extern int sum_calls;           /* declaration of a global defined elsewhere */
#endif
```

```c
/* sum.c */
#include "vec.h"

int sum_calls = 0;              /* global, visible to other files */
static int last = 0;            /* local to this file */

int sum(const int *a, int n) {
    int s = 0;
    for (int i = 0; i < n; i++)
        s += a[i];
    sum_calls++;
    last = s;
    return s;
}
```

```c
/* main.c */
#include <stdio.h>
#include "vec.h"

int data[3] = {1, 2, 3};        /* defined here, used here */

int main(void) {
    int s = sum(data, 3);
    printf("sum = %d, calls = %d\n", s, sum_calls);
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -c main.c sum.c
$ gcc -o prog main.o sum.o
$ ./prog
sum = 6, calls = 1
```

The first command (`-c`: compile only) produces two **relocatable object files**, `main.o` and `sum.o`. The second runs the linker, which combines them with the C start-up code and the C library into an **executable object file**, `prog`. (The call to `sum` is made before the `printf`, in its own statement, because C does not specify the order in which function arguments are evaluated: `printf("%d %d", sum(data, 3), sum_calls)` might read `sum_calls` before the call.)

The distinction between a **declaration** and a **definition** is the key to C's model of separate compilation. A declaration tells the compiler that a name exists and what its type is (`int sum(const int *a, int n);`, `extern int sum_calls;`); a definition creates the function or object (`int sum_calls = 0;`, or a function with its body). Every name used must be declared in each file that uses it — that is what header files are for — and every function or global variable actually used must be defined exactly once in the whole program.

## Object files

On Linux, object files of all three kinds — relocatable (`.o`), executable, and shared (`.so`) — use the **Executable and Linkable Format** (ELF). An ELF relocatable file is a header followed by **sections**, each a block of bytes of one kind:

| section | contents |
|---|---|
| `.text` | machine code of the file's functions |
| `.rodata` | read-only data: string literals, `const` tables, jump tables |
| `.data` | initialised global and `static` variables (`int data[3] = {1, 2, 3};`) |
| `.bss` | zero-initialised globals and statics; occupies no space in the file, only a size |
| `.symtab` | the **symbol table**: names defined and referenced by this file |
| `.rela.text` | **relocation entries**: places in `.text` that must be patched once addresses are known |
| `.debug_*` | debugging information (only with `-g`) |
| `.strtab` | the strings (names) used by the symbol table |

`readelf -S main.o` lists them. (".bss" is a name from a 1950s IBM assembler, "block started by symbol"; "better save space" is a useful mnemonic, since it costs nothing in the file.)

### Symbols

::: definition Symbol {#def-symbol}
A **symbol** is a name in an object file's symbol table, with a value (an offset within a section, later an address), a size, a type (function or data object) and a **binding**:

- a **global** symbol is defined in this file and may be referenced by other files: non-`static` functions and global variables;
- an **external** (undefined) symbol is referenced by this file but defined in some other file;
- a **local** symbol is defined in this file and visible only within it: functions and global variables declared `static`.

Local variables of functions (which live on the stack or in registers) are not symbols at all.
:::

`nm` prints a symbol table, one line per symbol, with a letter for its section: `T` text, `D` data, `B` bss, `R` read-only data, `U` undefined; a lower-case letter marks a local symbol.

::: example Reading symbol tables {#ex-nm}
Explain the output of `nm` on the two object files.

```console
$ nm main.o
0000000000000000 D data
0000000000000000 T main
                 U printf
                 U sum
                 U sum_calls
$ nm sum.o
0000000000000004 b last
0000000000000000 T sum
0000000000000000 B sum_calls
```
::: solution
`main.o` defines two global symbols: `data`, an initialised array in `.data` (`D`) at offset $0$, and `main`, a function in `.text` (`T`). It references three symbols it does not define (`U`): `printf` (from the C library), and `sum` and `sum_calls`, which it knows only from the declarations in `vec.h`. The local variable `s` of `main` does not appear.

`sum.o` defines the global function `sum` and the global variable `sum_calls`, which, being initialised to zero, is placed in `.bss` (`B`). The variable `last`, declared `static` at file scope, is a *local* symbol (lower-case `b`), at offset $4$ in `.bss`. Another file could define its own `static int last` without conflict, but could not refer to this one. Marking every file-scope function and variable that is not part of the file's interface `static` is good practice: it avoids accidental name clashes and lets the compiler optimise more freely.
:::
:::

## Symbol resolution

The linker's first task is **symbol resolution**: to associate every reference to a symbol with exactly one definition.

::: definition Resolution rules {#def-resolution}
For each global symbol, the linker considers all definitions in the object files being linked:

1. If there is exactly one definition, every reference resolves to it.
2. If there is more than one ordinary (**strong**) definition, the link fails with "multiple definition".
3. A **weak** definition (declared `__attribute__((weak))` in GCC) yields to a strong one: if a strong definition exists, it is chosen and the weak ones are ignored; otherwise one weak definition is chosen.
4. If a referenced symbol has no definition in any object file or library, the link fails with "undefined reference".
:::

Linking `main.o` without `sum.o` triggers rule 4:

```console
$ gcc -o prog main.o
/usr/bin/x86_64-linux-gnu-ld.bfd: main.o: in function `main':
main.c:(.text+0x1c): undefined reference to `sum'
/usr/bin/x86_64-linux-gnu-ld.bfd: main.c:(.text+0x25): undefined reference to `sum_calls'
collect2: error: ld returned 1 exit status
```

The message names the place of each unresolved reference (offsets `0x1c` and `0x25` in `main`'s code — we will see those offsets again). Adding a third file that also contains `int sum_calls = 5;` triggers rule 2:

```console
$ gcc -o bad main.o sum.o dup.o
/usr/bin/x86_64-linux-gnu-ld.bfd: dup.o:(.data+0x0): multiple definition of `sum_calls'; sum.o:(.bss+0x0): first defined here
collect2: error: ld returned 1 exit status
```

::: warning Uninitialised globals in two files
Until GCC 10 (2020), an uninitialised global such as `int counter;` written in *two* files was silently merged into one variable (a "common symbol", rule 3 in all but name). Since GCC 10 the default is `-fno-common`, and the same code fails with "multiple definition of `counter`". Code that relied on the old behaviour breaks when compiled with a recent compiler. The fix is not `-fcommon` but correct C: define the variable in exactly one `.c` file, and declare it `extern int counter;` in a header included everywhere else. Conversely, a definition in a header file (`int counter = 0;` in `vec.h`) is a bug waiting to happen: every file that includes it defines the symbol.
:::

Weak symbols let a library provide a default that a program can override:

```c
#include <stdio.h>
/* A default that another object file may replace. */
__attribute__((weak)) const char *greeting(void) { return "default"; }
int main(void) { printf("%s\n", greeting()); return 0; }
```

Compiled alone this prints `default`; linked together with a file containing a strong `const char *greeting(void) { return "custom"; }` it prints `custom`.

### Static libraries

A **static library** (an **archive**, `.a`) is a collection of relocatable object files bundled with an index, made by `ar`:

```console
$ ar rcs libvec.a sum.o
$ gcc -o p1 main.o -L. -lvec
$ ./p1
sum = 6, calls = 1
```

`-lvec` means "the library `libvec.a` (or `libvec.so`)" and `-L.` adds the current directory to the search path. Crucially, the linker does not copy the whole archive into the program, only the members that are needed, and it decides what is needed by a single left-to-right scan of the command line.

::: algorithm Resolving against static libraries {#alg-archive}
Maintain three sets: $E$, the object files to be merged into the executable; $U$, the symbols referenced but not yet defined; $D$, the symbols defined so far. Initially all are empty. For each input file $f$, from left to right on the command line:

1. If $f$ is an object file, add it to $E$, and update $U$ and $D$ with its definitions and references.
2. If $f$ is an archive, repeat until no change: for each member $m$ that defines a symbol in $U$, add $m$ to $E$ and update $U$ and $D$ with $m$'s definitions and references. Then discard the remaining members of $f$.

At the end, if $U$ is non-empty, report each symbol in it as an undefined reference; if any symbol was defined twice in $E$ (strongly), report a multiple definition. Otherwise relocate and merge the files in $E$.
:::

::: example Tracing the archive scan {#ex-archive}
`libm2.a` has two members: `vec.o`, defining `sum` and `sum_calls`, and `stats.o`, defining `mean` and referencing `sum`. Trace [[#alg-archive]] on `gcc main.o -L. -lm2` (ignoring the C library), where `main.o` is the file of this chapter.
::: solution
| step | input | action | $U$ afterwards | $D$ afterwards |
|---|---|---|---|---|
| 1 | `main.o` | object file: add to $E$ | `printf`, `sum`, `sum_calls` | `data`, `main` |
| 2 | `libm2.a`, pass 1 | `vec.o` defines `sum` $\in U$: add it | `printf` | `data`, `main`, `sum`, `sum_calls` |
| 3 | `libm2.a`, pass 1 | `stats.o` defines nothing in $U$: skip | `printf` | (unchanged) |
| 4 | `libm2.a`, pass 2 | no member adds anything: stop | `printf` | (unchanged) |

$E = \set{\texttt{main.o}, \texttt{vec.o}}$; `stats.o` is not linked, so the program does not grow by the code of functions it never calls. `printf` remains in $U$ and is resolved by the C library, which `gcc` adds to the end of the command line automatically. If `main` had also called `mean`, step 3 would have taken `stats.o`; its reference to `sum` would already be in $D$, so the repeat in step 4 would add nothing more.
:::
:::

A consequence is that **order matters**. Put the library before the object file that needs it, and the link fails:

```console
$ gcc -o p2 -L. -lvec main.o
main.c:(.text+0x1c): undefined reference to `sum'
/usr/bin/x86_64-linux-gnu-ld.bfd: main.c:(.text+0x25): undefined reference to `sum_calls'
```

When the linker reached `libvec.a`, $U$ was still empty, so no member was taken; when `main.o` then added `sum` to $U$, the archive had already been passed. The rule: libraries go after the object files that use them, and a library that depends on another goes before it. When dependencies form a directed acyclic graph, any **topological order** of the graph is a correct command line.

::: widget graph
nodes: main.o@0,1; libparse.a@2,2; libnet.a@2,0; libutil.a@4,1; libc@6,1
edges: main.o>libparse.a; main.o>libnet.a; libparse.a>libutil.a; libnet.a>libutil.a; libutil.a>libc; libnet.a>libc
algorithm: topo
start: main.o
caption: Who-needs-whom among the inputs of a link: an arrow $X \to Y$ means $X$ references symbols defined in $Y$. Step through the topological sort. Every order it can produce — for example `main.o -lparse -lnet -lutil -lc` — lists each file before the libraries it depends on, and so is a valid command line for the single left-to-right scan of [[#alg-archive]]. Add a cycle, `libutil.a>libparse.a`, and no topological order exists: the linker then needs one library to be listed twice (`-lparse -lutil -lparse`) or the `--start-group … --end-group` option, which rescans a group of archives until nothing changes.
:::

## Relocation

Once every reference is resolved, the linker knows which definition each name denotes, but the machine code still contains placeholders. The compiler of `main.c` had to emit a `call` to `sum` without knowing its address; it wrote zeros and left a note. Those notes are **relocation entries**.

::: definition Relocation entry {#def-relocation}
A **relocation entry** records a location in a section (its **offset**), a symbol $S$, an **addend** $A$ (a constant), and a **type** saying how to compute the value to store. For the two types that matter most on x86-64, with $P$ the run-time address of the location being patched:

- `R_X86_64_PC32`: store the 32-bit value $S + A - P$ — a PC-relative displacement;
- `R_X86_64_64`: store the 64-bit absolute address $S + A$.

`R_X86_64_PLT32` is computed like `PC32`, but with $S$ the address of the symbol's procedure-linkage-table entry when the symbol is in a shared library (see below), and otherwise of the symbol itself.
:::

`objdump -dr` shows the code of `main.o` with its relocation entries interleaved:

```console
$ objdump -dr --no-show-raw-insn main.o
0000000000000000 <main>:
   0:	endbr64
   4:	push   %rbp
   5:	mov    %rsp,%rbp
   8:	sub    $0x10,%rsp
   c:	lea    0x0(%rip),%rax        # 13 <main+0x13>
			f: R_X86_64_PC32	data-0x4
  13:	mov    $0x3,%esi
  18:	mov    %rax,%rdi
  1b:	call   20 <main+0x20>
			1c: R_X86_64_PLT32	sum-0x4
  20:	mov    %eax,-0x4(%rbp)
  23:	mov    0x0(%rip),%edx        # 29 <main+0x29>
			25: R_X86_64_PC32	sum_calls-0x4
  ...
  3d:	call   42 <main+0x42>
			3e: R_X86_64_PLT32	printf-0x4
```

Each instruction that mentions a global has a zero placeholder and an entry: the 4 bytes at offset `0xf` must become the displacement to `data`, the 4 bytes at `0x1c` the displacement to `sum`, and so on — the same offsets that appeared in the "undefined reference" messages. Why the addend $-4$? x86-64 computes `%rip`-relative addresses and call targets relative to the *end* of the instruction, and in each case the 4-byte field being patched is the last thing in its instruction. So the end of the instruction is $P + 4$, and the displacement needed is $S - (P + 4) = S + A - P$ with $A = -4$.

::: theorem PC-relative relocation is correct {#thm-pcrel}
Suppose an instruction ends at address $P + 4$ with a 32-bit displacement field at $P$, the hardware computes its target as (address of next instruction) $+$ displacement, and the linker stores $S + A - P$ with $A = -4$. Then the instruction refers to $S$. Moreover, if the whole image (code and data together) is moved by any offset $\Delta$, the stored displacement still refers to the moved $S$, so the patched code is **position-independent**.
:::

::: proof
The target is $(P + 4) + (S - 4 - P) = S$. If both the instruction and its target move by $\Delta$, the new target computed by the hardware is $(P + \Delta + 4) + (S - 4 - P) = S + \Delta$, which is the new address of the symbol. (This assumes the displacement fits in 32 bits, which holds when code and data lie within $\pm 2$ GiB of each other — the default "small code model".)
:::

::: example Relocating a call {#ex-reloc}
After linking, `objdump -d prog` shows

```text
0000000000001149 <main>:
    ...
    1155:	48 8d 05 b4 2e 00 00 	lea    0x2eb4(%rip),%rax        # 4010 <data>
    ...
    1164:	e8 29 00 00 00       	call   1192 <sum>
```

and `nm prog` gives `data` at `0x4010` and `sum` at `0x1192`. Check both displacements against [[#def-relocation]].
::: solution
`main` was placed at `0x1149`, so the location at offset `0x1c` in `main.o` is now at $P = \text{0x1149} + \text{0x1c} = \text{0x1165}$, the byte after the `e8` opcode of the `call`. The value stored is $S + A - P = \text{0x1192} - 4 - \text{0x1165} = \text{0x29}$, and the bytes after `e8` are indeed `29 00 00 00` (little-endian). The processor computes the target as the address of the next instruction, `0x1169`, plus `0x29`: `0x1192`, the address of `sum`.

The `lea` was at offset `0xc`, now `0x1155`, and its displacement field (offset `0xf` in `main.o`) is at $P = \text{0x1158}$. The value is $\text{0x4010} - 4 - \text{0x1158} = \text{0x2eb4}$, matching the bytes `b4 2e 00 00`; the hardware adds it to the next instruction's address, `0x115c`, giving `0x4010`. Note that the `call` to `sum` was given a `PLT32` relocation by the compiler, but since `sum` turned out to be defined in the program itself, the linker pointed it straight at `sum`.
:::
:::

::: quiz
Why does the compiler emit a relocation for `data` in `main.c`, even though `data` is defined in the same file?
- [x] Because `data` is in `.data` and the code in `.text`, and only the linker decides where the two sections will lie relative to each other.
- [ ] Because global variables are always accessed through a table of addresses.
- [ ] Because another file might contain a strong definition of `data` that replaces this one.
- [ ] It is an inefficiency of compiling without optimisation; with `-O2` the relocation disappears.
::: solution
The linker merges the `.text` sections of all input files into one, and likewise the `.data` sections, and only then assigns addresses, so the compiler cannot know the distance from the `lea` in `main` to `data`. Global variables of an executable are *not* reached through a table (the GOT is for symbols in shared libraries), a second strong definition of `data` would be a link error rather than a replacement, and the relocation is needed at every optimisation level.
:::
:::

## Executables and loading

The linker merges the sections of all files in $E$ — all `.text` sections into one `.text`, and so on — assigns run-time addresses, applies the relocations, and writes an **executable object file**. Besides sections (for tools), an executable has a **program header table** describing **segments**, the chunks the loader must map into memory:

```console
$ readelf -lW prog
...
  Type           Offset   VirtAddr           PhysAddr           FileSiz  MemSiz   Flg Align
  INTERP         0x000374 0x0000000000000374 0x0000000000000374 0x00001c 0x00001c R   0x1
  LOAD           0x000000 0x0000000000000000 0x0000000000000000 0x000608 0x000608 R   0x1000
  LOAD           0x001000 0x0000000000001000 0x0000000000001000 0x000201 0x000201 R E 0x1000
  LOAD           0x002000 0x0000000000002000 0x0000000000002000 0x000178 0x000178 R   0x1000
  LOAD           0x002db8 0x0000000000003db8 0x0000000000003db8 0x000264 0x000270 RW  0x1000
```

Each `LOAD` segment is a range of the file to be mapped at a virtual address with given permissions, aligned to 4 KiB pages ([[computer-systems/memory-hierarchy]]): headers (read-only), code (read and execute, `R E`), read-only data, and read–write data, whose memory size exceeds its file size by the `.bss`, which the loader fills with zeros. Code is never writable and data never executable: the W⊕X policy of [[computer-systems/c-programming#sec-ub]] begins here.

The addresses start at $0$ because `prog` is a **position-independent executable** (PIE), the default on modern Linux distributions: all its code uses PC-relative addressing, so by [[#thm-pcrel]] the kernel can load it at a random base address each time it runs, as address-space layout randomisation requires. That is why the addresses printed in [[computer-systems/c-programming]] changed from run to run.

To run a program, the shell asks the kernel to `execve` it ([[computer-systems/exceptions-processes]]). The kernel's **loader** reads the program headers, creates a fresh address space, maps the segments, sets up a stack containing the command-line arguments and environment, and — because of the `INTERP` segment, which names `/lib64/ld-linux-x86-64.so.2` — first runs the **dynamic linker**, which loads the shared libraries the program needs. Control then passes to the program's **entry point**, a start-up routine `_start` from the C library's `crt1.o`, which calls `__libc_start_main`, which initialises the library and calls `main`, and finally passes `main`'s return value to `exit`.

## Shared libraries

Static libraries have two drawbacks. Every program that uses `printf` contains its own copy, wasting disk and memory: linked statically (`gcc -static`), our tiny program grows from 16 KB to about 800 KB. And fixing a bug in the library means relinking every program. **Shared libraries** (shared objects, `.so`; DLLs on Windows) solve both: the library is linked into the program at **load time** or even **run time**, and one copy of its code in physical memory is mapped into every process that uses it.

```console
$ gcc -std=c17 -Wall -Wextra -fPIC -shared -o libvec.so sum.c
$ gcc -std=c17 -Wall -Wextra -o p3 main.c -L. -lvec
$ ./p3
./p3: error while loading shared libraries: libvec.so: cannot open shared object file: No such file or directory
$ LD_LIBRARY_PATH=. ./p3
sum = 6, calls = 1
$ LD_LIBRARY_PATH=. ldd p3
	linux-vdso.so.1
	libvec.so => ./libvec.so
	libc.so.6 => /usr/lib/x86_64-linux-gnu/libc.so.6
	/lib64/ld-linux-x86-64.so.2
```

(`ldd` addresses removed.) At link time the linker only checks that `libvec.so` defines `sum` and `sum_calls` and records a dependency (`readelf -d p3` shows `NEEDED: libvec.so`). At load time the dynamic linker must *find* the library, searching the directories in `LD_LIBRARY_PATH`, any run-path recorded in the executable (`-Wl,-rpath,…`), and the system directories listed in `/etc/ld.so.cache` — but not the current directory, hence the first error. Real libraries are installed in system directories under a versioned name (`libc.so.6`): the number, the **soname**, changes only when the library's interface changes incompatibly, so a bug-fix release can replace the file and every program picks it up at its next start.

::: example Building and using a shared library {#ex-shared}
Explain why `sum.c` had to be compiled with `-fPIC`, and how `p3` can find `sum` at an address that is not known until it runs.
::: solution
A shared library is mapped at a different address in each process (and must be, for ASLR and because different programs load different sets of libraries). Its code pages are shared between processes, so the dynamic linker must not patch them: patched code would differ per process and could no longer be shared. **Position-independent code** (`-fPIC`) avoids patching code entirely. References within the library use PC-relative addressing, correct wherever it is loaded ([[#thm-pcrel]]). References to symbols that may live in *another* module — or, in a library, that may be overridden by another module — go through a **global offset table** (GOT): a table of addresses in the library's writable data segment, at a fixed offset from its code, which the dynamic linker fills in at load time. Code reads the address from the GOT by a PC-relative load and then uses it.

In `p3`, the call to `sum` goes through the **procedure linkage table** (PLT), a small stub per external function:

```text
0000000000001070 <sum@plt>:
    1070:	f3 0f 1e fa          	endbr64
    1074:	ff 25 56 2f 00 00    	jmp    *0x2f56(%rip)        # 3fd0 <sum>
```

`main` calls `sum@plt` (`call 1070 <sum@plt>`), and the stub jumps indirectly through the GOT entry at `0x3fd0`, which the dynamic linker filled with the run-time address of `sum` in `libvec.so`. Only the GOT, in a private writable page, differs between processes; the code of both the program and the library stays shared.
:::
:::

Traditionally, the GOT entries for functions were filled **lazily**: initially each pointed back into the dynamic linker, which resolved the symbol on the first call and then overwrote the entry, so start-up did not pay for functions never called. Ubuntu and several other distributions now link with **immediate binding** by default (`readelf -d p3` shows `FLAGS BIND_NOW`): all entries are resolved at start-up and the GOT is then made read-only (**RELRO**), so that a memory-corruption bug cannot redirect calls by overwriting it.

Programs can also load libraries while running, with `dlopen("libplugin.so", RTLD_NOW)` and `dlsym(handle, "name")` from `<dlfcn.h>`: this is how plug-in systems, language runtimes and Python's extension modules work.

::: application Interposition
Because symbols in shared libraries are resolved by name at load time, the dynamic linker lets a library loaded earlier **interpose** on symbols of later ones. Setting `LD_PRELOAD=./libtrace.so` loads a library before all others, so a `malloc` defined in it is used instead of the C library's. Debugging and profiling tools use this to count allocations or trace calls without recompiling (a toy example: a `malloc` wrapper that counts calls and forwards to the real one found with `dlsym(RTLD_NEXT, "malloc")`). The same mechanism is a security consideration: the dynamic linker ignores `LD_PRELOAD` and `LD_LIBRARY_PATH` for set-user-ID programs, whose privileges must not depend on the environment of the user who starts them, and a writable directory on a program's library search path is a vulnerability.
:::

::: history
The EDSAC team at Cambridge — Maurice Wilkes, David Wheeler and Stanley Gill — kept a library of subroutines on paper tape and loaded them with "initial orders" that adjusted addresses as they were read in; their 1951 book *The Preparation of Programs for an Electronic Digital Computer* was the first textbook on programming and describes the ancestor of the relocating loader. Multics (designed from 1965) introduced dynamic linking of named segments on first reference. Unix used the simple `a.out` object format; AT&T's System V Release 4 (1988–89) introduced ELF and shared libraries in their modern form, following SunOS 4 (1988), whose shared libraries Robert Gingell and colleagues described in 1987. Linux moved from `a.out` to ELF in the mid-1990s. John Levine's *Linkers and Loaders* (2000) remains the standard book on the subject.
:::

## Where this leads

Linking connects to many later topics. The compiler's side — emitting relocatable code and debugging information — is part of [[compilers]], and so is **link-time optimisation** (`-flto`), in which the linker calls back into the compiler to optimise across files. The loader's work of building an address space is continued in [[computer-systems/exceptions-processes]] with `fork` and `execve`, and in [[operating-systems]], which shows how shared libraries share physical pages through virtual memory. Package managers, symbol versioning and application binary interface (ABI) stability are part of [[software-engineering]].

::: summary
- Separate compilation produces **relocatable object files**; the **linker** combines them and libraries into an executable, performing **symbol resolution** and **relocation**. On Linux all three object kinds use ELF.
- Sections: `.text` code, `.rodata` constants, `.data` initialised globals, `.bss` zero-initialised globals (no file space), `.symtab` symbols, `.rela.*` relocations.
- Global symbols are visible to other files, `static` ones are local; declarations go in headers, each definition in exactly one `.c` file. Duplicate strong definitions and missing definitions are link errors; weak definitions yield to strong ones ([[#def-resolution]]).
- Static archives are searched once, left to right ([[#alg-archive]]): list libraries after the files that use them, in a topological order of their dependencies.
- Relocation entries patch placeholders; PC-relative relocation stores $S + A - P$ and yields position-independent code ([[#thm-pcrel]]).
- The loader maps segments with W⊕X permissions at a randomised base (PIE, ASLR) and starts at `_start`, which calls `main`.
- Shared libraries are linked at load or run time; position-independent code reaches external symbols through the GOT and PLT, so code pages stay shared; immediate binding with RELRO is now a common default.
:::

## Exercises

::: exercise Classifying symbols {level=1}
For the file below, say which names appear in its symbol table, with what binding (global, external or local) and in which section.

```c
static double rate = 1.5;
int total;
extern int limit;
static void helper(void) {}
int compute(int x) { int y = x * 2; helper(); return y + limit + total; }
```
::: solution
`rate`: local, `.data` (initialised, `static`). `total`: global, `.bss` (uninitialised global; with `-fno-common`, the default since GCC 10, it is a normal definition in `.bss`). `limit`: external (undefined, `U`) — declared but not defined here. `helper`: local, `.text`, unless the compiler inlines it and drops it (with optimisation it may disappear entirely, because nothing outside the file can call it). `compute`: global, `.text`. `x` and `y` are not symbols: they live in registers or on the stack.
:::
:::

::: exercise A call displacement {level=1 check="219"}
A 5-byte `call` instruction (opcode `e8` followed by a 32-bit displacement) starts at address `0x401020`, and its target function is at `0x401100`. What displacement does the linker store? (Enter it in decimal.)
::: solution
The displacement field starts at $P = \text{0x401021}$, and with $A = -4$ the value is $S + A - P = \text{0x401100} - 4 - \text{0x401021} = \text{0x401100} - \text{0x401025} = \text{0xdb} = 219$. Equivalently: the target minus the address of the next instruction.
:::
:::

::: exercise Command-line order {level=1}
`main.o` calls `parse`, defined in `libparse.a`, which calls `log_msg`, defined in `libutil.a`. Which of these commands link successfully? (a) `gcc main.o -lparse -lutil` (b) `gcc main.o -lutil -lparse` (c) `gcc -lparse -lutil main.o` (d) `gcc main.o -lutil -lparse -lutil`. Assume `-L.` is also given.
::: solution
Apply [[#alg-archive]]. (a) works: after `main.o`, $U = \set{\texttt{parse}}$; `libparse.a` supplies `parse` and adds `log_msg` to $U$; `libutil.a` supplies it. (b) fails: at `libutil.a`, $U = \set{\texttt{parse}}$ contains nothing it defines; then `libparse.a` adds `log_msg`, and no library follows: "undefined reference to `log_msg`". (c) fails: both archives are scanned while $U$ is empty, and `main.o` then leaves `parse` undefined. (d) works: the second `-lutil` resolves `log_msg`.
:::
:::

::: exercise Static and extern {level=2}
File `a.c` contains `static int count = 0; void inc(void) { count++; }` and file `b.c` contains `int count = 10; void inc(void); int main(void) { inc(); inc(); printf("%d\n", count); }` (with `<stdio.h>`). Does it link, and what does it print? What if the `static` is removed?
::: solution
With `static`, the `count` in `a.c` is a local symbol, invisible to `b.c`; the global `count` of `b.c` is a different variable. There is no conflict, the program links, `inc` increments `a.c`'s private counter twice, and `main` prints `b.c`'s `count`: `10`. Without `static`, both files strongly define the global `count`, and the link fails with "multiple definition of `count`" ([[#def-resolution]], rule 2).
:::
:::

::: exercise Counting relocations {level=2 check="4"}
How many relocation entries does `gcc -c` (without optimisation) produce in `.rela.text` for the following file? (Count entries, not distinct symbols.)

```c
extern int x;
int y;
int f(void);
int g(void) { return f() + x + y + f(); }
```
::: solution
Each reference to a symbol whose address the compiler cannot fix needs one entry: two calls to `f` (two `R_X86_64_PLT32` entries, one per call instruction), one load of `x` and one load of `y` (`R_X86_64_PC32`). That is $4$. `y` is defined in this file, but in `.bss`, whose position relative to `.text` is fixed only by the linker (compare the quiz). Compiling and running `readelf -r` on the object file shows exactly these four entries. (With some compilers or options the external `x` would be reached through the GOT, with a `R_X86_64_GOTPCRELX` entry instead; the count is the same.)
:::
:::

::: exercise A circular dependency {level=2}
`libparse.a` calls `log_msg` in `libutil.a`, and `log_msg` in turn calls `format_ast` in `libparse.a`, which is in a different member from `parse`. Show that `gcc main.o -lparse -lutil` fails, and give two ways to fix it.
::: solution
After `main.o`, $U = \set{\texttt{parse}}$. Scanning `libparse.a` takes the member defining `parse`, which adds `log_msg`; no other member defines a symbol in $U$, so the scan of `libparse.a` ends. Scanning `libutil.a` takes `log_msg`'s member, which adds `format_ast` to $U$. Nothing follows, so `format_ast` is undefined. Fixes: repeat the library, `gcc main.o -lparse -lutil -lparse`, or use `gcc main.o -Wl,--start-group -lparse -lutil -Wl,--end-group`, which rescans the group until $U$ stops changing. The better fix is structural: remove the cycle by moving `format_ast` or `log_msg`, since mutually dependent libraries are effectively one library.
:::
:::

::: exercise Implementing an overridable hook {level=3}
Design a tiny "library" file `hook.c` that calls a function `on_event(int)` for each event it processes, providing a default implementation that prints `event N`, such that an application can replace the default simply by defining its own `on_event` in its own file. Write both files and the commands, and explain which resolution rule makes it work. What happens if two application files both define `on_event`?
::: solution
```c
/* hook.c */
#include <stdio.h>

__attribute__((weak)) void on_event(int n) { printf("event %d\n", n); }

void process(int count) {
    for (int i = 1; i <= count; i++)
        on_event(i);
}
```

```c
/* app.c */
#include <stdio.h>
void process(int count);
void on_event(int n) { printf("app saw %d\n", n * 10); }   /* strong */
int main(void) { process(2); return 0; }
```

```console
$ gcc -std=c17 -Wall -Wextra -o app app.c hook.c && ./app
app saw 10
app saw 20
```

Without `app.c`'s definition (for example in a `main` that defines no `on_event`), the weak default is used and prints `event 1`, `event 2`. Rule 3 of [[#def-resolution]] makes it work: a strong definition overrides a weak one. Two strong definitions in the application are still an error (rule 2). Note that if `hook.c` were placed in a *static library*, its member would be pulled in for `process` anyway, and the strong definition in `app.o` would win; but if the default lived alone in its own member, it would be linked only if `on_event` were still undefined at that point. Weak symbols are a GCC/ELF extension, not ISO C.
:::
:::

::: exercise Why position-independent code can be shared {level=3}
Explain precisely why a shared library compiled *without* `-fPIC` (using absolute 64-bit addresses for its global variables, `R_X86_64_64` relocations) would force each process to have a private copy of the library's code pages, and why the GOT avoids this. Use [[#thm-pcrel]].
::: solution
An `R_X86_64_64` relocation in the code stores the absolute address $S + A$ of a variable. The library is loaded at a different base $L$ in each process, and $S = L + s$ where $s$ is the variable's offset in the library, so the stored value $L + s + A$ differs between processes. The dynamic linker must therefore write different bytes into the code in each process; a page that has been written is private to its process (copy-on-write, [[operating-systems]]), so every process ends up with its own copy of every code page containing such a relocation, and the memory saving of sharing is lost. (Modern linkers refuse to build such libraries on x86-64, or warn that they create "text relocations".)

With PIC, the code reaches its own functions and data by PC-relative displacements, which by [[#thm-pcrel]] are the same for every load address, and reaches symbols that may be defined elsewhere through GOT entries, also at a fixed PC-relative distance. The only values that depend on $L$ (or on other libraries' bases) are the GOT entries themselves, which live in the library's data segment — already private to each process, since it holds the library's writable globals. So the code pages are byte-for-byte identical in every process and can be mapped from the same physical memory.
:::
:::
