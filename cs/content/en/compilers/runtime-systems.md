The x86-64 code of [[compilers/code-generation]] does not run alone. Even our three-line C runtime brings in `printf`, and with it the C library's buffered I/O, its startup code that calls `main`, and the kernel's loader that set up the stack before that. Languages with closures, objects and automatic memory management need much more: a way to keep a function's variables alive after it returns, a way to find the right method for an object whose class is known only at run time, and a **garbage collector** that finds and reclaims memory the program can no longer reach. This support, compiled into or linked with every program, is the **run-time system**.

The compiler and the run-time system are designed together. The compiler decides how frames, closures and objects are laid out; the run-time system relies on that layout — a garbage collector must know which words of an object are pointers, and which stack slots hold live pointers at each point where it can run. This chapter builds the main pieces: activation records, **closure conversion** (with a compiler from a small functional language to C), **virtual-method tables** (and how GCC optimises calls through them), and garbage collectors — **mark-sweep**, **Cheney's copying collector**, **generational** collection and **incremental** collection with the **tri-colour invariant** — each as a working simulator.

## Activation records

::: definition Activation record {#def-frame}
An **activation record** (or **frame**) holds the state of one call of a function that must survive while the call is active: its parameters and local variables that are not kept in registers, saved registers, the return address, and a link to the caller's frame. Frames are allocated on a **stack** when calls are nested, that is, when every call returns before its caller does and no reference to a frame outlives its call.
:::

::: example How deep can recursion go? {#ex-depth}
Our code generator's frames are minimal. The Mini function `down(n)`, which returns 0 for $n = 0$ and `1 + down(n - 1)` otherwise, is compiled by our back end of [[compilers/code-generation]] with Linux's default stack. How many nested calls fit on the stack, and what happens beyond that?
::: solution
The function compiles to:

```text
mini_down:
    pushq   %rbp                # link to the caller's frame
    movq    %rsp, %rbp
    subq    $8, %rsp            # padding for alignment
    pushq   %rbx                # callee-saved register used for n
    movq    %rdi, %rbx
    ...
    subq    $1, %rbx
    movq    %rbx, %rdi
    call    mini_down
```

Each activation takes 32 bytes: return address, saved `%rbp`, 8 bytes of padding and the saved `%rbx`. Linux gives the main thread a stack of 8 MiB by default (`ulimit -s` prints 8192, in KiB), room for $8 \cdot 2^{20} / 32 = 262\,144$ activations. Running the compiled program confirms the arithmetic: `down(260000)` prints 260000, while `down(270000)` is killed by signal 11 (`SIGSEGV`, a segmentation fault) when the stack runs into the unmapped guard page below it. GCC at `-O2` turns the equally recursive `fact` into a loop — it recognises that `n * fact(n - 1)` can accumulate the product in a register — so its frames never pile up. Scheme and most functional languages *require* calls in tail position (a call whose result is returned directly) to run in constant space; `n * fact(n - 1)` is not such a call, and GCC first had to introduce an accumulator.
:::
:::

How the stack discipline arises in the first place, and when it fails, was studied in [[programming-languages/scope-binding#prop-stack]]: frames can live on a stack as long as no function value escapes the call that created it.

## Closures and closure conversion

A function nested inside another can use the outer function's variables. If the inner function is only called while the outer one is active, it can reach them through a **static link**, a pointer to the frame of the enclosing function, stored in its own frame (Algol and Pascal do this; following $d$ static links reaches the variables $d$ levels out). But in a language with first-class functions an inner function can be returned and called later:

```text
let add = λn. λx. x + n in (add 1) 41
```

The value of `add 1` is a function that adds 1, and it must remember $n = 1$ after the call of `add` has returned. The run-time representation of such a function is a **closure** ([[programming-languages/interpreters#def-closure]]): its code together with the values of its free variables.

::: definition Closure conversion {#def-closure-conversion}
**Closure conversion** translates a program with nested functions into one where every function is closed (has no free variables) and is defined at top level. Each `λx. e` with free variables $y_1, \dots, y_k$ becomes (1) a top-level function `code(env, x)` whose body is $e$ with each $y_i$ replaced by `env[i]`, and (2) at the place where the λ was, an allocation of a **closure record** `[code, y_1, …, y_k]` on the heap. A call `f a` becomes `apply(f, a)`, which calls `f[0](f, a)`.
:::

The free variables of a term are computed by structural recursion: $\mathrm{FV}(x) = \set{x}$, $\mathrm{FV}(\lambda x.\, e) = \mathrm{FV}(e) \setminus \set{x}$, and the union over subterms otherwise. The converter is short:

```python
class Converter:
    def __init__(self): self.funs, self.n = [], 0
    def expr(self, t, env):
        """C expression for t; env maps each variable in scope to the C expression that reads it."""
        k = t[0]
        if k == "int": return str(t[1])
        if k == "var": return env[t[1]]
        if k == "add": return f"({self.expr(t[1], env)} + {self.expr(t[2], env)})"
        if k == "app": return f"apply({self.expr(t[1], env)}, {self.expr(t[2], env)})"
        if k == "let":
            return f"({{ V {t[1]} = {self.expr(t[2], env)}; {self.expr(t[3], env | {t[1]: t[1]})}; }})"
        if k == "lam":                        # the heart of closure conversion
            fv = sorted(free_vars(t))
            self.n += 1; name = f"lam{self.n}"
            inner = {x: f"env[{i + 1}]" for i, x in enumerate(fv)} | {t[1]: t[1]}
            body = self.expr(t[2], inner)     # code: may use only its parameter and env
            self.funs.append(f"static V {name}(V *env, V {t[1]}) {{ return {body}; }}")
            fields = ", ".join([f"(V){name}"] + [env[x] for x in fv])
            return f"closure({len(fv) + 1}, (V[]){{{fields}}})"   # record: code + free values
```

Every value is a C `long` (`V`): either an integer or the address of a closure record. The run-time support is two functions:

```c
static V closure(int n, V *fields) { /* a heap record: [code, free variable 1, ...] */
    V *c = malloc(n * sizeof(V)); memcpy(c, fields, n * sizeof(V)); allocated += n * sizeof(V);
    return (V)c;
}
static V apply(V f, V a) { V *c = (V *)f; return ((V (*)(V *, V))c[0])(c, a); }
```

::: lemma Converted code is closed {#lem-closed}
In the output of the converter, the body of each generated function refers only to its parameter and to `env`; and if the source term is closed, so is the expression for `main`.
:::

::: proof
The converter translates a variable $x$ to `env[x]`'s entry in the mapping it is given. When it translates the body of `λx. e`, the mapping `inner` contains exactly $x$ (mapped to the parameter) and the free variables of `λx. e` (mapped to `env[i]`), and nested `let`s add only their own bound names, declared as C locals inside the body. By induction on $e$, every variable occurring free in $e$ is either $x$ or in $\mathrm{FV}(\lambda x.\, e)$, and variables bound inside $e$ are handled by the inner mappings; so the lookup `env[t[1]]` never fails and never produces a name from outside the function. For `main`, the initial mapping is empty, so a closed term translates without error, and the only C names it uses are those declared by its own `let`s.
:::

Correctness also needs that the record captures the *right values*: at the λ, the converter fills the record with the current translation of each free variable — exactly the values the variables have in the environment where the closure is created, as the environment semantics requires.

::: example Converting compose {#ex-compose}
Convert and run

```text
let add = λn. λx. x + n in
let compose = λf. λg. λx. f (g x) in
compose (add 1) (add 10) 5
```
::: solution
The converter produces five functions, one per λ (numbered in the order their translation finishes, inner ones first):

```c
static V lam2(V *env, V x) { return (x + env[1]); }
static V lam1(V *env, V n) { return closure(2, (V[]){(V)lam2, n}); }
static V lam5(V *env, V x) { return apply(env[1], apply(env[2], x)); }
static V lam4(V *env, V g) { return closure(3, (V[]){(V)lam5, env[1], g}); }
static V lam3(V *env, V f) { return closure(2, (V[]){(V)lam4, f}); }
```

`λx. x + n` has the free variable $n$, so its record is `[lam2, n]` and its body reads `env[1]`. The innermost λ of `compose`, `λx. f (g x)`, has free variables $f$ and $g$; it is created inside `lam4`, where $f$ is itself a free variable (`env[1]` of `lam4`'s record) and $g$ is the parameter — hence `closure(3, (V[]){(V)lam5, env[1], g})`. Compiled with `gcc -O2 -Wall` (no warnings), the program prints `16` and reports 88 bytes of closures: 11 words, for the two top-level closures (1 word each), the two closures returned by `add` (2 each), and the closures for `compose (add 1)` (2) and `compose (add 1) (add 10)` (3).

Nothing ever frees these records. A language with closures needs a garbage collector, because whether a closure is still reachable depends on the program's dynamic behaviour.
:::
:::

Closure conversion copies free variables' *values* into the record. If a captured variable can be assigned, the closure and the enclosing function must share it, so the compiler puts such variables in a heap-allocated **box** (a one-field record) and copies the pointer to the box instead — what CPython calls a *cell* and Java avoids by requiring captured locals to be effectively final.

## Objects and dynamic dispatch

In an object-oriented language, the call `s->area()` selects the method by the run-time class of `s`. The standard implementation, from Simula 67, is a **virtual-method table**.

::: definition Virtual-method table {#def-vtable}
Each class $C$ has a **vtable**: an array of code addresses, one for each virtual method, in which the methods of a subclass occupy the same indices as in its superclass (overriding replaces the entry; new methods are appended). Every object of class $C$ starts with a pointer to $C$'s vtable (the **vptr**), followed by its fields, those inherited from the superclass first, at the same offsets as in the superclass. A virtual call `o.m(args)` loads the vptr from `o`, loads the entry for $m$ at its fixed index, and calls it with `o` as an extra first argument.
:::

Because indices and field offsets agree along the inheritance chain, code compiled for a class works unchanged on objects of every subclass: this is how dispatch costs only two loads and an indirect call, whatever the depth of the class hierarchy.

::: example Vtables and devirtualisation in GCC {#ex-vtable}
Compile with `g++ -O2` (GCC 15.2):

```cpp
struct Shape { virtual long area() const = 0; virtual long sides() const { return 0; } long id; };
struct Rect : Shape { long w, h; long area() const override { return w * h; } long sides() const override { return 4; } };
struct Square : Rect { };
long total(const Shape *const *s, long n) { long t = 0; for (long i = 0; i < n; i++) t += s[i]->area(); return t; }
long sq() { Square s; s.w = s.h = 3; return s.area(); }
```
::: solution
The vtable GCC emits for `Rect`:

```text
vtable for Rect:
    .quad   0                       # offset to the top of the object (used with multiple inheritance)
    .quad   typeinfo for Rect       # for dynamic_cast and typeid
    .quad   Rect::area() const      # <- the vptr points here: index 0
    .quad   Rect::sides() const     #    index 1
```

`Rect::area` is `movq 16(%rdi), %rax; imulq 24(%rdi), %rax`: the object layout is vptr at offset 0, `id` at 8, `w` at 16 and `h` at 24. The loop in `total` contains the dispatch:

```text
.L8:
    movq    0(%r13,%rbx,8), %rdi    # s[i]
    movq    (%rdi), %rax            # its vptr
    movq    (%rax), %rax            # vtable entry 0: area
    cmpq    %r14, %rax              # is it Rect::area?
    je      .L12                    # yes: inlined w * h, no call
    call    *%rax                   # no: indirect call
```

GCC has **speculatively devirtualised** the call: it guesses that the target is `Rect::area`, the only definition of `area` in the program, compares the loaded address with it, and on a match runs an inlined copy of the method. For `sq`, the object's class is known exactly, so the call is resolved at compile time and the whole function becomes `movl $9, %eax; ret`.
:::
:::

Dynamically typed languages such as JavaScript and Smalltalk have no fixed method indices: an object's methods are found by name, through its class or prototype. Their implementations make lookup fast with **inline caches** (Deutsch and Schiffman, 1984): each call site remembers the class it saw last and the method it found, and checks the class before jumping directly to the method — the same guard as GCC's speculative devirtualisation, but filled in at run time.

## Garbage collection

The heap of a running program is a directed graph whose vertices are objects and whose edges are pointer fields ([[computer-systems/dynamic-memory#def-reachable]]). The **roots** are the pointers held outside the heap: in registers, stack slots and global variables. An object reachable from no root can never be used again; a **tracing** collector finds the reachable objects by graph search and reclaims the rest.

::: theorem Tracing collection is safe {#thm-tracing}
If an object is unreachable from the roots at some moment, it remains unreachable for the rest of the execution, so a collector may free it at any later time.
:::

::: proof
The program (the **mutator**, in GC terminology) can obtain a pointer only by allocating a new object, or by reading a pointer from a root or from a field of an object it already holds a pointer to — which is reachable, since the held pointer is itself a root. Storing a pointer adds an edge whose target was reachable; overwriting removes edges. By induction on the steps of execution, every edge ever created points to an object that was reachable or newly allocated at that moment. So no step creates a path to an unreachable object, and an object unreachable at one moment stays unreachable. (This needs a language without pointer arithmetic or casts from integers: C programs can fabricate pointers, which is why collectors for C must be **conservative**.)
:::

The collectors below run on a simulated heap: memory is a list of words; an object is a header word holding its number of fields, followed by the fields; a pointer is a tagged address `('ptr', a)`. A real collector has the same information from the compiler: object headers with sizes and type descriptors that say which fields are pointers.

### Mark-sweep

**Mark-sweep** (McCarthy, 1960) marks every object reachable from the roots by a depth-first search, then sweeps the heap linearly, freeing every unmarked object:

```python
def mark_sweep(heap, roots):
    marked, stack = set(), [r[1] for r in roots if is_ptr(r)]
    while stack:                            # mark: depth-first search from the roots
        a = stack.pop()
        if a in marked: continue
        marked.add(a)
        stack += [v[1] for v in heap.fields(("ptr", a)) if is_ptr(v)]
    free, a = [], 1
    while a < heap.top:                     # sweep: visit every object in the heap
        if a not in marked: free.append(a)
        a += 1 + heap.mem[a]
    return marked, free
```

Marking costs time proportional to the reachable data; sweeping, to the whole heap. Freed objects go on free lists, and the heap fragments as in [[computer-systems/dynamic-memory]].

### Copying collection

A **copying** collector divides the heap into two **semispaces** and allocates in one of them by bumping a pointer, which is as cheap as allocation can be. When it is full, the collector copies every reachable object to the other semispace, compacting them as it goes, and swaps the roles of the two. Cheney's 1970 algorithm needs no stack and no recursion: the to-space itself is the queue of a breadth-first search.

```python
def cheney(old, roots):
    """Copy everything reachable from roots into a fresh heap; return it and new roots."""
    new = Heap(old.size); cheney.copied = 0
    def copy(v):
        if not is_ptr(v): return v
        a = v[1]
        if not isinstance(old.mem[a], tuple):   # not yet copied: copy it, then overwrite its
            b = new.alloc(old.fields(v))[1]     # header with a forwarding pointer
            old.mem[a] = ("fwd", b); cheney.copied += 1
        return ("ptr", old.mem[a][1])
    roots = [copy(r) for r in roots]
    scan = 1
    while scan < new.top:                   # objects between scan and top are grey
        n = new.mem[scan]
        for i in range(n):
            new.mem[scan + 1 + i] = copy(new.mem[scan + 1 + i])
        scan += 1 + n
    return new, roots
```

When an object is copied, its old header is overwritten by a **forwarding pointer** to the copy, so later pointers to it are redirected to the same copy rather than copying it twice.

::: theorem Cheney's algorithm {#thm-cheney}
`cheney` copies each object reachable from the roots exactly once and no other object, and the copied objects with their redirected pointers form a graph isomorphic to the reachable part of the old heap. Its running time is $O(R + W)$, where $R$ is the number of roots and $W$ the number of words of reachable objects, independent of the amount of garbage.
:::

::: proof
Call an old object *white* if it has not been copied, *grey* if its copy lies between `scan` and `top` (copied, but its fields still point into the old space), and *black* if its copy lies below `scan` (all its fields redirected). Invariant: no field of a black copy points to the old space, and every old object pointed to by an original field of a grey or black object, or by a root, has been copied. Initially the roots are copied, and there are no black objects. Processing the grey object at `scan` copies (makes grey) each white object it points to, redirects each field to the copy — found through the forwarding pointer — and advances `scan`, turning it black. When `scan` reaches `top` there are no grey objects, so every object reachable from the roots by a path has been copied: by induction on the path length, each object on it is the target of a field of a black object. Conversely an object is copied only when a root or a field of a copied object points to it, so only reachable objects are copied, and the forwarding pointer prevents a second copy. The map from each copied object to its copy is a bijection that maps each pointer field to a pointer to the copy of its target: an isomorphism. Each root and each word of a reachable object is processed once, in constant time.
:::

::: example A collection, step by step {#ex-cheney}
The heap holds seven objects, allocated in the order $E, C, A, B, F, D, G$; the roots point to $A$ and $B$, both $A$ and $B$ point to $C$, $C$ points to $E$, $D$ and $F$ point to each other, and nothing points to $G$. Run mark-sweep and Cheney's algorithm.
::: solution
The old heap uses 19 words (addresses 1 to 19: $E$ at 1, $C$ at 3, $A$ at 6, $B$ at 9, $F$ at 12, $D$ at 15, $G$ at 18). Mark-sweep marks addresses $\set{1, 3, 6, 9}$ and frees $[12, 15, 18]$ — the cycle $D \leftrightarrow F$ and $G$. Cheney's algorithm copies 4 objects into 11 words:

```text
copied 4 objects; new top = 12 roots -> [('ptr', 1), ('ptr', 4)]
  1 [2, ('ptr', 7), 1]      A: header 2, then its pointer to C and the integer 1
  4 [2, ('ptr', 7), 2]      B
  7 [2, ('ptr', 10), 3]     C
  10 [1, 5]                 E
```

The objects arrive in breadth-first order from the roots: $A$ and $B$ (copied when the roots are processed), then $C$ (found while scanning $A$; when $B$ is scanned, $C$'s forwarding pointer redirects $B$'s field to the same copy at 7), then $E$. The live objects are now contiguous, the free space is one block from address 12, and the garbage was never examined.

::: widget graph
nodes: roots@0,2; A@2,3; B@2,1; C@4,2; E@6,2; D@4,0; F@6,0; G@6,4
edges: roots>A; roots>B; A>C; B>C; C>E; D>F; F>D
algorithm: bfs
start: roots
caption: The heap of [[#ex-cheney]]. Run the breadth-first search from `roots`: it visits $A$, $B$, $C$, $E$ — exactly the order in which Cheney's algorithm places the objects in to-space, because the region between `scan` and `top` is the search's queue. $D$, $F$ and $G$ are never visited; a copying collector's cost does not depend on them.
:::
:::
:::

The cost of copying collection depends on how much memory it is given. With $L$ words live at each collection and two semispaces of $H/2$ words each, each collection copies $L$ words and then leaves room for $H/2 - L$ words of allocation before the next, so the copying work per allocated word is

$$
\frac{L}{H/2 - L} = \frac{1}{r/2 - 1}, \qquad r = H / L.
$$ {#eq-gc-cost}

A simulated mutator that keeps 300 words live and allocates 60 000 words confirms the formula: copying cost per allocated word 4.145, 2.03, 1.005, 0.495, 0.33 and 0.245 for $r = 2.5, 3, 4, 6, 8, 10$, against the predicted 4.0, 2.0, 1.0, 0.5, 0.333 and 0.25.

::: widget plot
f: c/(x/2 - 1)
x: 2.2, 12
y: 0, 6
sliders: c=1:0.5:3:0.25
labels: \text{GC work per allocated word}
points: 2.5,4.145; 3,2.03; 4,1.005; 6,0.495; 8,0.33; 10,0.245
caption: The cost of copying collection per allocated word, $c / (r/2 - 1)$ from [[#eq-gc-cost]], against the ratio $r$ of heap size to live data, with $c$ the cost of copying one word relative to allocating it. The dots are the simulated measurements. With a heap only a little larger than twice the live data, collection dominates; with $r = 6$, each allocated word costs only half a word of copying. Garbage collection trades memory for time, and with enough memory it can be cheaper than explicit freeing.
:::

### Generational collection

Most objects die young: temporary strings, iterators, intermediate results. This **weak generational hypothesis**, observed in Lisp and Smalltalk systems and since in Java, .NET and JavaScript, suggests collecting the recently allocated objects often and the old ones rarely. A **generational** collector allocates in a small **nursery**; a **minor collection** traces only the nursery, from the roots, and promotes the survivors to the **old generation**, which is collected by an occasional **major collection**.

A minor collection does not trace the old generation, so it would miss a young object referenced only from an old one. The compiler therefore emits a **write barrier** at every pointer store: a few instructions that, when an old object is made to point to a young one, record the old object in a **remembered set**, which the minor collection treats as additional roots. In the simulator of [[#ex-generational]], an old table that receives a pointer to a new entry loses the entry at the next minor collection without the barrier (`freed: ['entry', 'tmp']`) and keeps it with the barrier (`freed: ['tmp']`).

### Incremental collection and the tri-colour invariant

A collector that stops the program for the whole collection causes **pauses** proportional to the live data — unacceptable for interactive and real-time programs. An **incremental** collector interleaves marking with the mutator; a **concurrent** one runs alongside it on another core. The difficulty is that the mutator changes the graph while the collector traverses it.

::: definition Tri-colour abstraction {#def-tricolour}
During marking, each object is **white** (not yet reached), **grey** (reached, but its fields not yet scanned) or **black** (reached, and all its fields scanned). Marking starts with the roots' targets grey and everything else white, repeatedly blackens a grey object after shading its white children grey, and ends when no grey objects remain; the white objects are then freed. The **strong tri-colour invariant** says that no black object points to a white object.
:::

::: theorem Tri-colour marking is safe {#thm-tricolour}
If the strong tri-colour invariant holds throughout marking, and roots never point to white objects (the collector shades any object a root comes to point to), then when no grey object remains, every white object is unreachable.
:::

::: proof
When no grey objects remain, every object is black or white. Suppose a white object $w$ were reachable, by a path from a root. The root's target is not white, so the path starts at a black object and reaches the white $w$; somewhere along it there is an edge from a black object to a white one. That contradicts the invariant.
:::

Without help, the mutator breaks the invariant easily. In this scenario, $R$ (the root object) and $A$ have been scanned (black), $B$ is grey and points to the white $C$. The mutator copies $B$'s pointer to $C$ into $A$, then clears $B$'s field. The collector then scans $B$, finds nothing, and frees $C$ — which $A$ still points to. The fix is a write barrier again: **Dijkstra's insertion barrier** shades the target of every stored pointer grey, so a black object can never acquire a pointer to a white one.

```python
class Incremental:
    def __init__(self, objects, roots, barrier):
        self.obj, self.barrier = objects, barrier        # objects: name -> list of field targets
        self.colour = {o: "white" for o in objects}
        self.grey = []
        for r in roots: self.shade(r)
    def shade(self, o):
        if o is not None and self.colour[o] == "white":
            self.colour[o] = "grey"; self.grey.append(o)
    def step(self):                                      # the collector: blacken one grey object
        if not self.grey: return False
        o = self.grey.pop(0)
        for t in self.obj[o]: self.shade(t)
        self.colour[o] = "black"; return True
    def write(self, o, i, t):                            # the mutator: o.field[i] = t
        if self.barrier: self.shade(t)                   # Dijkstra's insertion barrier
        self.obj[o][i] = t
```

Running the scenario:

```text
no barrier -> freed: ['C']  reachable: ['A', 'B', 'C', 'R']  ERROR
barrier -> freed: []  reachable: ['A', 'B', 'C', 'R']  ok
```

::: quiz
Which property does Dijkstra's insertion barrier guarantee, and why is that enough for [[#thm-tricolour]]?
- [ ] it guarantees that no object is ever grey twice, so marking terminates
- [x] after any store `o.f = t`, the target `t` is not white, so no store creates a black-to-white pointer
- [ ] it guarantees that the mutator never reads a white object
- [ ] it turns every object the mutator writes to black
::: solution
The barrier shades `t` before the store, so after it `t` is grey or black, and the new edge `o → t` cannot be black-to-white whatever the colour of `o`. Stores are the only operations that create edges, and the collector's own steps preserve the invariant (a grey object becomes black only after all its white children are shaded). So the strong invariant holds throughout, and the theorem applies. The barrier may keep alive some objects that become garbage during marking — `t` stays grey even if the pointer to it is overwritten immediately — but those are freed at the next collection. **Yuasa's deletion barrier** is the main alternative: it shades the *old* target of an overwritten pointer, which preserves a weaker invariant (every white object pointed to by a black one is also reachable from a grey object through white ones) and keeps everything that was reachable when marking began.
:::
:::

::: warning A missed root is silent corruption
A collector is only as correct as the compiler's list of roots. If generated code holds a pointer in a register, or in a stack slot the collector does not know about, while a collection runs, a mark-sweep collector may free the object, and a copying collector will move it and leave the hidden pointer aimed at the abandoned from-space copy. Nothing fails at the moment of the mistake; the program reads stale data much later, often only under memory pressure. This is why compilers for collected languages emit **stack maps** — for each **safepoint** (a call or allocation where a collection can happen), the set of stack slots and registers that hold live pointers — computed with the liveness analysis of [[compilers/dataflow-optimisation]]. In C extensions for collected runtimes the programmer must maintain the roots by hand: CPython's reference counts (`Py_INCREF`, `Py_DECREF`), Java's JNI local and global references, and OCaml's `CAMLparam` and `CAMLlocal` macros exist precisely for this, and forgetting one is a classic source of heisenbugs.
:::

::: history
Edsger Dijkstra's "Recursive programming" (1960) introduced the run-time stack of activation records for Algol 60, and Brian Randell and Lawford Russell's *ALGOL 60 Implementation* (1964) described displays and static links. Peter Landin's SECD machine (1964) defined closures as code plus environment; closure conversion became standard compiler practice with the Scheme compilers of the late 1970s and 1980s — Guy Steele's Rabbit (1978), Kranz and colleagues' Orbit (1986) — and Appel's *Compiling with Continuations* (1992) for Standard ML. Simula 67 (Ole-Johan Dahl and Kristen Nygaard) introduced classes, inheritance and virtual procedures, implemented with what became vtables; C++ (Bjarne Stroustrup, from 1979) made them the industry standard. L. Peter Deutsch and Allan Schiffman's Smalltalk-80 implementation (POPL 1984) introduced inline caches, extended to polymorphic inline caches by Urs Hölzle, Craig Chambers and David Ungar (1991) for Self. John McCarthy invented garbage collection for LISP ("Recursive functions of symbolic expressions", 1960, mark-sweep), and George Collins described reference counting the same year. Robert Fenichel and Jerome Yochelson (1969) introduced semispace copying, and C. J. Cheney's "A nonrecursive list compacting algorithm" (*CACM* 1970) the breadth-first version. Dijkstra, Lamport, Martin, Scholten and Steffens's "On-the-fly garbage collection" (*CACM* 1978) introduced the tri-colour abstraction. Henry Lieberman and Carl Hewitt (1983) proposed generational collection, and David Ungar's "Generation scavenging" (1984) made it practical. Hans Boehm and Mark Weiser's conservative collector for C (1988) is still in use. Richard Jones and Rafael Lins's *Garbage Collection* (1996), and its successor *The Garbage Collection Handbook* by Jones, Hosking and Moss (2011; 2nd ed. 2023), survey the field.
:::

## Where this leads

This chapter ends the course's journey from source text to running program: lexing, parsing, checking, lowering, optimising, generating code and supporting it at run time. Modern systems blur the stages. **Just-in-time** compilers (HotSpot, V8, PyPy, LuaJIT) compile while the program runs, using profiles gathered by an interpreter to specialise code to the types and paths actually seen, and **deoptimise** — fall back to the interpreter — when a speculation fails. **Multi-level IRs** such as MLIR let a compiler lower through several abstraction levels with the same infrastructure. And the semantics of the languages themselves, which this course has taken as given, are studied in [[programming-languages]].

::: summary
- A program's run-time system provides the stack of **activation records**, heap allocation, dispatch and garbage collection; the compiler fixes the layouts it relies on.
- Functions that escape their defining call need **closures**: **closure conversion** turns each λ into closed top-level code plus a heap record of its free variables ([[#def-closure-conversion]], [[#lem-closed]]); our converter compiles `compose (add 1) (add 10) 5` to C that prints 16.
- **Vtables** give dispatch in two loads and an indirect call, with method indices and field offsets fixed along the inheritance chain; GCC **devirtualises** speculatively when it can guess the target, and inline caches do the same at run time.
- Tracing collection is safe because unreachable objects stay unreachable ([[#thm-tracing]]). **Mark-sweep** costs time proportional to the heap; **Cheney's copying collector** is a breadth-first search through to-space, costs time proportional to live data only ([[#thm-cheney]]), and costs $1/(r/2 - 1)$ copied words per allocated word ([[#eq-gc-cost]]).
- **Generational** collectors exploit the early death of most objects, with a write barrier and remembered set for old-to-young pointers; **incremental** collectors maintain the **tri-colour invariant** ([[#thm-tricolour]]), again with a write barrier.
- Collectors depend on the compiler for exact roots: **stack maps** at safepoints, computed from liveness.
:::

## Exercises

::: exercise Frame size and recursion depth {level=1 check="131072"}
A function's frame is 64 bytes (including return address and saved registers). How many nested activations fit in a 8 MiB stack, ignoring everything else on the stack? (Enter the number.)
::: solution
$8 \text{ MiB} = 8 \cdot 2^{20} = 8\,388\,608$ bytes, and $8\,388\,608 / 64 = 131\,072 = 2^{17}$. For `mini_down`'s 32-byte frames the limit was $2^{18} = 262\,144$, consistent with the observed crash between depths 260 000 and 270 000 (the stack also holds the environment, the C runtime's frames and the frame of `main`).
:::
:::

::: exercise Free variables {level=1 check="3"}
In `let f = … in let g = … in λy. λx. f (g x) + y`, how many free variables does the inner λ-expression `λx. f (g x) + y` have? (Enter the number.)
::: solution
$\mathrm{FV}(\lambda x.\, f\,(g\,x) + y) = \set{f, g, x, y} \setminus \set{x} = \set{f, g, y}$: **3**. Being bound by an enclosing `let` or λ does not stop a variable being free in the inner expression — freeness is a property of the expression alone, and it is exactly what the closure must capture. Our converter would build the record `[code, f, g, y]` (variables sorted by name), 4 words. A compiler could avoid capturing $f$ and $g$ if they are bound at top level to known functions, calling them directly instead; that refinement is part of **lambda lifting** and of closure-conversion optimisations in ML and Scheme compilers.
:::
:::

::: exercise Cheney by hand {level=1 check="8"}
Roots point to $P$ and $Q$, in that order. $P$ has two fields, pointing to $Q$ and $R$; $Q$ has one field, pointing to $P$; $R$ has one integer field; $S$ has two fields, pointing to $R$ and $P$, but nothing points to $S$. With the simulator's layout (a header word, then the fields; to-space addresses start at 1), where does Cheney's algorithm place each object, and what is `top` afterwards? (Enter the value of `top`.)
::: solution
The roots are processed first: $P$ (header + 2 fields) is copied to addresses 1–3 and $Q$ (header + 1 field) to 4–5. Scanning $P$ at 1: its field to $Q$ finds $Q$'s forwarding pointer and becomes `('ptr', 4)`; its field to $R$ copies $R$ to 6–7. Scanning $Q$ at 4: its field to $P$ is forwarded to 1. Scanning $R$ at 6: no pointers. `scan` meets `top` = **8**. $S$ is never touched. The simulator gives the same to-space: `[2, ('ptr', 4), ('ptr', 6), 1, ('ptr', 1), 1, 9]` from address 1, with `top` = 8.
:::
:::

::: exercise Write barriers {level=2}
(a) Give the scenario of the tri-colour section in terms of the three colours at each step, and show where the invariant is violated. (b) Show that Yuasa's deletion barrier (before overwriting a field, shade its old target) also saves $C$ in that scenario. (c) Why do generational collectors and incremental collectors both need write barriers, and could one barrier serve both purposes?
::: solution
(a) After two collector steps: $R$ black, $A$ black (scanned while its field was null), $B$ grey, $C$ white. The mutator stores `A.f = C`: now black $A$ points to white $C$ — the strong invariant is violated. It then stores `B.f = null`, removing the only grey-to-white path to $C$. The collector scans $B$ (nothing to shade) and finishes; $C$ is white and freed although reachable from $A$.

(b) With a deletion barrier, the store `A.f = C` overwrites a null, so it shades nothing; the store `B.f = null` overwrites a pointer to $C$, so $C$ is shaded grey first. The collector then scans $C$, and nothing reachable is freed. The deletion barrier preserves "snapshot at the beginning": every object reachable when marking began is marked.

(c) Both must know when the mutator creates pointers that the collector's partial view would miss: from old to young objects (generational) or from black to white objects (incremental). A single barrier routine often does both: the barrier code that runs on every pointer store checks the generation of source and target and the marking state, and records or shades accordingly. Production collectors (such as Java's G1) use a card-marking barrier for generations and a snapshot barrier for concurrent marking together.
:::
:::

::: exercise Generational collection {level=2 #ex-generational}
Implement a minimal generational collector over objects represented as a dictionary from names to lists of field targets: allocation adds to the nursery, a minor collection traces only nursery objects from the roots and the remembered set, frees the unreached nursery objects and promotes the survivors; the write barrier adds an old object to the remembered set when a pointer to a young object is stored into it. Demonstrate the barrier's necessity.
::: solution
```python
class Generational:
    def __init__(self, barrier=True):
        self.obj, self.young, self.remembered, self.barrier = {}, set(), set(), barrier
    def new(self, name, fields):
        self.obj[name] = list(fields); self.young.add(name); return name
    def write(self, o, i, t):
        if self.barrier and o not in self.young and t in self.young:
            self.remembered.add(o)          # an old object now points to a young one
        self.obj[o][i] = t
    def minor(self, roots):
        """Trace only young objects, from the roots and the remembered old objects."""
        live, work = set(), [r for r in roots if r in self.young]
        for o in self.remembered: work += [t for t in self.obj[o] if t in self.young]
        while work:
            o = work.pop()
            if o in live: continue
            live.add(o); work += [t for t in self.obj[o] if t in self.young]
        dead = self.young - live
        for o in dead: del self.obj[o]
        self.young, self.remembered = set(), set()   # survivors are promoted to the old generation
        return sorted(dead)

for barrier in (False, True):
    h = Generational(barrier)
    h.new("table", [None]); h.minor(["table"])          # table survives: now old
    h.new("tmp", []); h.new("entry", [])               # two young objects
    h.write("table", 0, "entry")                        # old -> young pointer
    print("barrier" if barrier else "no barrier", "freed:", h.minor(["table"]))
```

Output: `no barrier freed: ['entry', 'tmp']` and `barrier freed: ['tmp']`. The root `table` is old, so the minor collection does not trace it; only the remembered set reveals that `entry` is reachable. The cost of a minor collection is proportional to the surviving nursery objects plus the remembered set, not to the old generation — the point of the design.
:::
:::

::: exercise Reference counting and cycles {level=2}
(a) Explain why reference counting cannot reclaim a cycle. (b) Demonstrate it in CPython with `gc.disable()`, a two-object cycle and `weakref` to observe whether the objects survive, then call `gc.collect()`. (c) Name two techniques that let reference-counted systems cope with cycles.
::: solution
(a) Each object in a cycle is pointed to by its predecessor in the cycle, so its count is at least 1 even when nothing outside the cycle points to it; the count never reaches zero.

(b)

```python
import gc, weakref
class Node: pass
gc.disable()
a, b = Node(), Node(); a.other, b.other = b, a
probe = weakref.ref(a)
del a, b
print("after del:", probe() is not None)      # True: the cycle is still alive
print("collected:", gc.collect() >= 2, "after collect:", probe() is not None)
```

prints `after del: True` and then `collected: True after collect: False` (on CPython 3.14.4): reference counting alone kept the unreachable pair, and CPython's backup cycle collector — a tracing collector over container objects — reclaimed it.

(c) A backup tracing collector, as in CPython; trial deletion (Bacon and Rajan's synchronous cycle collection, 2001), which tentatively decrements counts within a suspected cycle to see whether they reach zero; or programmer discipline with **weak references** that do not count, as with Swift's `weak` and C++'s `std::weak_ptr`.
:::
:::

::: exercise Mark-sweep versus copying {level=3}
Model the cost of mark-sweep as $c_m L + c_s H$ per collection (marking live data $L$ and sweeping the heap $H$), freeing $H - L$ words. (a) Derive the cost per allocated word and compare it with [[#eq-gc-cost]]. (b) For which ratios $r = H/L$ is copying cheaper if $c_m = c_s = 1$ and copying costs 1 per word? (c) Name two costs the model leaves out.
::: solution
(a) Mark-sweep: $\dfrac{c_m L + c_s H}{H - L} = \dfrac{c_m + c_s r}{r - 1}$, which tends to $c_s$ as $r \to \infty$ — sweeping is never free, because its cost grows with the heap. Copying: $\dfrac{1}{r/2 - 1} = \dfrac{2}{r - 2}$, which tends to $0$.

(b) Copying is cheaper when $\dfrac{2}{r - 2} < \dfrac{1 + r}{r - 1}$, that is $2(r - 1) < (1 + r)(r - 2) = r^2 - r - 2$, or $r^2 - 3r > 0$, i.e. $r > 3$ (for $r > 2$, where copying is defined). With little memory ($2 < r < 3$) mark-sweep wins; with plenty, copying does, and its cost keeps falling as memory grows.

(c) Copying needs twice the memory for the same heap and moves objects, which costs cache misses and requires exact pointer information; mark-sweep fragments the heap and makes allocation slower than bumping a pointer. Neither model counts the mutator's improved locality after compaction, the cost of write barriers, or pause times. Real collectors combine the techniques: copying for the nursery, mark-sweep or mark-compact for the old generation.
:::
:::

::: exercise Mutable captured variables {level=3}
Extend the closure converter with a statement `set x e` that assigns to a variable, so that `let c = 0 in let inc = λu. set c (c + 1) in …` gives a counter. (a) Explain why copying values into closure records breaks this. (b) Describe the conversion with boxes: which variables need boxing, and how reads and writes are translated. (c) What does Java require instead, and why?
::: solution
(a) The closure for `inc` would hold a copy of `c`'s value at creation time, 0. Assignments in `inc` would update the copy (if anything), invisible to the enclosing function and to other closures that captured `c`; each call would see the same stale value.

(b) Find the variables that are both captured by some λ and assigned anywhere (a simple syntactic analysis). Each such variable is allocated as a one-word heap box when it is bound: `V c = box(0)`. Reads become `((V *)c)[0]` and `set c e` becomes `((V *)c)[0] = e`, both in the defining function and in the closures, which capture the *pointer* to the box in their records. All closures and the enclosing scope share the box, so updates are visible everywhere. Variables that are not captured, or never assigned, need no box and stay in registers. This is what CPython's cells (`LOAD_DEREF`, `STORE_DEREF`) and the assignment conversion of Scheme compilers do.

(c) Java allows a lambda or inner class to capture a local variable only if it is **effectively final** — never assigned after initialisation — so copying its value is always correct and no boxes are needed. A programmer who wants a shared mutable counter must allocate a mutable object explicitly (an `AtomicInteger` or a one-element array), making the box visible in the source.
:::
:::
