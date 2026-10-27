Type `2 * (3 + 4) - 10 / 5` into a calculator and it prints `12`. Put the same expression in a C function, compile it, and look at the machine code: there is no multiplication by 2, no addition of 3 and 4, no division — the processor is simply told to use the number `12`. Somewhere between the text you wrote and the instructions that run, a program read your characters, worked out their structure, checked that they made sense, did the arithmetic in advance, and wrote out instructions for a machine that knows nothing about parentheses or operator precedence. That program is a **compiler**, and this course is about how it works.

Compilers are among the oldest and best-understood large programs in computer science, and their techniques reach far beyond turning C into machine code. The same ideas — scanning text into tokens, parsing tokens into trees, checking trees against rules, rewriting them into a simpler form, analysing that form to prove facts about every possible run, and generating code — are used in database query engines, regular-expression libraries, web browsers' JavaScript engines, graphics shader compilers, linters and refactoring tools, configuration languages and machine-learning frameworks. This chapter sets out the overall structure that the rest of the course fills in. We build a complete (if tiny) compiler from arithmetic expressions to x86-64 machine code in about sixty lines of Python, prove that its code generator is correct, and then look at how real compilers are organised into phases and passes, how they are split into front and back ends, and how a compiler can be written in the language it compiles.

**Conventions for the course.** Programs are in Python 3 (the listings were run with Python 3.14) and C; the target machine is x86-64 running Linux with the System V calling convention, in AT&T assembly syntax, exactly as in [[computer-systems/machine-code]], which you should have read. Real compiler output comes from GCC 15.2 and Clang 21.1 on Ubuntu, with the flags stated each time.

## What a compiler is

::: definition Compiler {#def-compiler}
A **compiler** is a program that translates a program in a **source language** into an equivalent program in a **target language**. *Equivalent* means: for every input, if the source program has a defined behaviour on that input (it produces some output, or fails in a way the language specifies), the target program has the same behaviour. A compiler must also **reject** source texts that are not programs of the language, with a useful message.
:::

The target need not be machine code. A compiler from TypeScript to JavaScript, from a query language to a query plan, or from C to WebAssembly is still a compiler; a program that translates between two high-level languages is often called a **transpiler** or **source-to-source compiler**. What distinguishes a compiler from an **interpreter** is *when* the source is examined: an interpreter executes the source program directly, statement by statement, each time it runs; a compiler examines the whole program once, ahead of time, and produces something that runs without the compiler. Many systems mix the two. Python compiles source to bytecode, which a virtual machine interprets; Java compiles to bytecode, which the JVM first interprets and then compiles to machine code while the program runs (**just-in-time compilation**).

The definition says "if the source program has a defined behaviour". This qualification matters. In C, `i = i++ + 1;` or a signed integer overflow has *undefined behaviour*, and the compiler may then produce any code at all. Much of the apparent strangeness of optimising compilers comes from their right to assume that undefined behaviour never happens.

### Phases

A compiler is too large to write as one piece, so it is divided into **phases**, each a translation between two representations of the program. The classic list is:

1. **Lexical analysis** (scanning): characters → **tokens**, the words of the language — identifiers, numbers, operators, keywords — with spaces and comments thrown away ([[compilers/lexical-analysis]]).
2. **Syntax analysis** (parsing): tokens → a **syntax tree** that shows how the tokens group according to the grammar ([[compilers/top-down-parsing]], [[compilers/bottom-up-parsing]]).
3. **Semantic analysis**: checks the rules a grammar cannot express — every name declared before use, types consistent — and annotates the tree with what it learns ([[compilers/semantic-analysis]]).
4. **Intermediate code generation**: tree → an **intermediate representation** (IR), a simple, explicit, machine-independent form such as three-address code ([[compilers/intermediate-representations]]).
5. **Optimisation**: IR → better IR, guided by analyses that prove facts true on every execution ([[compilers/dataflow-optimisation]]).
6. **Code generation**: IR → target instructions, with **instruction selection** and **register allocation** ([[compilers/code-generation]]).

Alongside the phases runs a **symbol table**, the compiler's database of names and what it knows about them, and an **error handler** that reports problems with their positions in the source. The program that runs also needs a **runtime system** — code for allocating memory, collecting garbage, handling exceptions — that the compiler's output calls into ([[compilers/runtime-systems]]).

::: definition Front end, middle end, back end {#def-ends}
The **front end** of a compiler comprises the phases that depend on the source language (lexing, parsing, semantic analysis and generation of the IR). The **back end** comprises the phases that depend on the target machine (instruction selection, register allocation, instruction scheduling, emission). The **middle end** (or **optimiser**) works on the IR and depends, ideally, on neither.
:::

### Passes

A **pass** is one traversal of a representation of the whole program (or of one function). Phases and passes are different things. A one-pass compiler interleaves all its phases: the parser asks the lexer for the next token when it needs one and emits code as soon as it recognises a construct, so the program is never held in memory as a whole. Early compilers were organised like this because memory was scarce, and Pascal and C were designed so that one pass suffices (which is why C requires declarations before use). A modern optimising compiler is the opposite: the front end builds an IR of the whole function or file, and then dozens or hundreds of passes each read and rewrite it. On this machine, GCC 15.2 asked to list its passes for a small C file at `-O2` (`gcc -O2 -c -fdump-passes f.c`) reports 282 enabled passes, from `tree-cfg` (build the control-flow graph) and `tree-ssa` (convert to static single assignment form) through `tree-ccp1` (conditional constant propagation) and `tree-pre` (partial redundancy elimination) to `rtl-expand` (lower to a machine-level IR), `rtl-ira` (register allocation) and `rtl-final` (emit assembly).

## A whole compiler in sixty lines

The clearest way to see the structure is to build the smallest compiler that has it. Our source language is integer arithmetic: decimal numbers, `+ - * /` and parentheses, with the usual precedence (`*` and `/` bind tighter than `+` and `-`) and left associativity (`8 - 3 - 2` means `(8 - 3) - 2`). Its meaning is 64-bit two's-complement arithmetic, as in C's `long`, with division truncating towards zero. The target is an x86-64 assembly program whose `main` prints the value.

The front end is a lexer and a parser. The lexer uses Python's regular-expression library to split the text into numbers and single-character operators; the parser is a **recursive-descent parser**, with one function per rule of the grammar

$$
\begin{aligned}
\textit{expr} &\to \textit{term}\ \bigl((\texttt{+} \mid \texttt{-})\ \textit{term}\bigr)^* \\
\textit{term} &\to \textit{atom}\ \bigl((\texttt{*} \mid \texttt{/})\ \textit{atom}\bigr)^* \\
\textit{atom} &\to \texttt{NUM} \mid \texttt{(}\ \textit{expr}\ \texttt{)}
\end{aligned}
$$ {#eq-tiny-grammar}

that we justify properly in [[compilers/top-down-parsing]]. The tree is built from Python tuples: a number is an `int`, and `('+', l, r)` is an operator node.

```python
import re, sys

def lex(src):                       # phase 1: characters -> tokens
    toks = re.findall(r"\s*(\d+|[-+*/()])", src)
    if "".join(toks) != re.sub(r"\s", "", src):
        raise SyntaxError("bad character")
    return toks + ["$"]             # "$" marks the end of input

def parse(toks):                    # phase 2: tokens -> syntax tree
    pos = 0
    def peek(): return toks[pos]
    def advance():
        nonlocal pos; pos += 1; return toks[pos - 1]
    def expr():                     # expr := term (('+'|'-') term)*
        t = term()
        while peek() in "+-":
            t = (advance(), t, term())
        return t
    def term():                     # term := atom (('*'|'/') atom)*
        t = atom()
        while peek() in "*/":
            t = (advance(), t, atom())
        return t
    def atom():                     # atom := NUM | '(' expr ')'
        tok = advance()
        if tok.isdigit(): return int(tok)
        if tok == "(":
            e = expr()
            if advance() == ")": return e
        raise SyntaxError(f"unexpected {tok!r}")
    tree = expr()
    if peek() != "$": raise SyntaxError(f"unexpected {peek()!r}")
    return tree
```

The `while` loops build the tree leaning to the left, `((8 - 3) - 2)`, which is what left associativity means; precedence comes from the layering, since a `term` is complete before `expr` looks for a `+`. The check in `lex` rejects any character that the pattern skipped over, such as a letter.

The back end walks the tree and emits instructions. It uses the simplest possible strategy, a **stack machine** discipline: the code for every subtree leaves that subtree's value in `%rax`, and a pending operand waits on the hardware stack.

```python
OPS = {"+": ["addq %rcx, %rax"], "-": ["subq %rcx, %rax"],
       "*": ["imulq %rcx, %rax"], "/": ["cqto", "idivq %rcx"]}

def gen(t, out):                    # phase 3: tree -> x86-64, result in %rax
    if isinstance(t, int):
        out.append(f"movq ${t}, %rax")
        return
    op, l, r = t
    gen(r, out); out.append("pushq %rax")   # right operand saved on the stack
    gen(l, out); out.append("popq %rcx")    # left in %rax, right in %rcx
    out += OPS[op]

def compile_expr(src):
    body = []
    gen(parse(lex(src)), body)
    return "\n".join([".globl main", "main:", "    subq $8, %rsp"]
        + ["    " + i for i in body]
        + ["    leaq fmt(%rip), %rdi", "    movq %rax, %rsi",
           "    movl $0, %eax", "    call printf", "    movl $0, %eax",
           "    addq $8, %rsp", "    ret",
           ".section .rodata", 'fmt: .string "%ld\\n"',
           '.section .note.GNU-stack,"",@progbits']) + "\n"

if __name__ == "__main__":
    sys.stdout.write(compile_expr(sys.argv[1]))
```

Evaluating the right operand first means that when the left operand is finished it is already in `%rax`, where `subq` and `idivq` need the left operand to be. Division uses the instruction pair of [[computer-systems/machine-code]]: `cqto` sign-extends `%rax` into `%rdx:%rax` and `idivq %rcx` divides, leaving the quotient in `%rax`. The prologue `subq $8, %rsp` keeps the stack 16-byte aligned at the call to `printf`, as the ABI requires; the pushes and pops of the expression code are balanced, so they do not disturb it. The last line tells the linker the program does not need an executable stack.

::: example The three phases on one input {#ex-phases}
Run the front end on `2 * (3 + 4) - 10 / 5`, then compile, assemble and run the result.
::: solution
```console
$ python3 -c "import tiny; t = tiny.lex('2 * (3 + 4) - 10 / 5'); print(t); print(tiny.parse(t))"
['2', '*', '(', '3', '+', '4', ')', '-', '10', '/', '5', '$']
('-', ('*', 2, ('+', 3, 4)), ('/', 10, 5))
$ python3 tiny.py "2 * (3 + 4) - 10 / 5" > t.s
$ gcc t.s -o t && ./t
12
```

The lexer produced eleven tokens plus the end marker; spaces have gone. The tree has `-` at the root because `-` has the lowest precedence, with the product and the quotient as its operands. Here is the body of `main` in `t.s`, with comments added:

```text
    movq $5, %rax           # right operand of / ...
    pushq %rax
    movq $10, %rax          # ... left operand of /
    popq %rcx
    cqto
    idivq %rcx              # rax = 10 / 5 = 2
    pushq %rax              # save it: it is the right operand of -
    movq $4, %rax
    pushq %rax
    movq $3, %rax
    popq %rcx
    addq %rcx, %rax         # rax = 3 + 4 = 7
    pushq %rax
    movq $2, %rax
    popq %rcx
    imulq %rcx, %rax        # rax = 2 * 7 = 14
    popq %rcx               # rcx = 2, saved long ago
    subq %rcx, %rax         # rax = 14 - 2 = 12
```

Every operator node produced exactly one `pushq` (after its right operand) and one `popq` (after its left operand), and the stack is empty again at the end. GCC's assembler, `as`, turned the text into machine code and its linker added the C library's `printf`.
:::
:::

The compiler is small, but every essential is present: a front end that knows the source language (and nothing about x86-64), a tree as the interface between the halves, and a back end that knows x86-64 (and nothing about how the source was written). Errors are caught by the phase that understands them: `2 + x` is rejected by the lexer, `2 + * 3` by the parser ("unexpected `'*'`"). What it lacks is everything that makes real compilers hard: names and types, control flow, a real IR, optimisation and good use of registers. The rest of the course adds them.

### The code generator is correct

Because the back end is defined by recursion on the tree, it can be proved correct by induction on the tree. Write $\llbracket t \rrbracket$ for the value of tree $t$ under the language's semantics: $\llbracket n \rrbracket = n$, and $\llbracket (\mathit{op}, l, r) \rrbracket = \llbracket l \rrbracket \mathbin{\mathit{op}} \llbracket r \rrbracket$ computed in 64-bit two's-complement arithmetic, where division truncates towards zero.

::: theorem Correctness of the stack code generator {#thm-gen-correct}
Let $t$ be a tree whose numbers are all less than $2^{63}$ and whose evaluation involves no division by zero and no division of $-2^{63}$ by $-1$. If the instructions emitted by `gen(t)` are executed from any machine state in which the stack holds a sequence $S$, then execution terminates in a state in which `%rax` $= \llbracket t \rrbracket$ and the stack holds exactly $S$ again (the same values at the same addresses). Only `%rax`, `%rcx`, `%rdx`, the flags and memory below the initial stack pointer are changed.
:::

::: proof
By structural induction on $t$.

*Base case*, $t = n$ a number. The code is `movq $n, %rax`, which sets `%rax` $= n = \llbracket t \rrbracket$ and touches nothing else. (The 7-byte `movq` immediate form holds a signed 32-bit constant; for larger ones the GNU assembler silently chooses the 10-byte `movabsq` encoding, as `objdump` shows for `5000000000 * 3`. Numbers of $2^{63}$ or more cannot be represented at all, hence the assumption.)

*Inductive step*, $t = (\mathit{op}, l, r)$; assume the claim for $l$ and $r$. Start with stack $S$.
1. By the hypothesis for $r$, after `gen(r)` the stack is $S$ and `%rax` $= \llbracket r \rrbracket$.
2. `pushq %rax` makes the stack $S \cdot \llbracket r \rrbracket$.
3. By the hypothesis for $l$, applied with initial stack $S \cdot \llbracket r \rrbracket$, after `gen(l)` the stack is still $S \cdot \llbracket r \rrbracket$ and `%rax` $= \llbracket l \rrbracket$. The hypothesis also says `gen(l)` changed memory only below its initial stack pointer, so the saved value $\llbracket r \rrbracket$ survived.
4. `popq %rcx` sets `%rcx` $= \llbracket r \rrbracket$ and restores the stack to $S$.
5. The instructions for $\mathit{op}$ compute `%rax` $\gets$ `%rax` $\mathbin{\mathit{op}}$ `%rcx` $= \llbracket l \rrbracket \mathbin{\mathit{op}} \llbracket r \rrbracket$: `addq`, `subq` and `imulq` compute the 64-bit wrap-around results, and `cqto; idivq` computes the truncated quotient of the 128-bit value `%rdx:%rax` (which equals `%rax` after sign extension) by `%rcx`; the assumption excludes the two cases in which `idivq` traps. They change only `%rax`, `%rdx` and the flags.

So the claim holds for $t$. Termination is clear because the code is straight-line.
:::

Two remarks about this proof carry over to every compiler. First, the induction hypothesis had to be *stronger* than "the result ends up in `%rax`": it also had to say that the stack is restored and that memory above the stack pointer is preserved, since step 3 relies on the inner code leaving the saved value alone. Finding the right invariant is the heart of every compiler-correctness proof. Second, the theorem is relative to a precise semantics. Python's `//` rounds towards minus infinity, so `0 - 7 // 2` is $-4$ in Python, while our language (like C and the `idivq` instruction) gives $-3$:

```console
$ python3 tiny.py "0 - 7 / 2" > d.s && gcc d.s -o d && ./d
-3
```

Had we specified Python's semantics, the code generator would be wrong for negative operands, and no amount of testing on positive numbers would have shown it.

### How much stack does the code use?

::: proposition Stack depth {#prop-depth}
Let $d(t)$ be the maximum number of values that the code `gen(t)` pushes on the stack at any moment. Then $d(n) = 0$ for a number and

$$
d\bigl((\mathit{op}, l, r)\bigr) = \max\bigl(d(r),\ 1 + d(l)\bigr).
$$ {#eq-depth}
:::

::: proof
The code for $(\mathit{op}, l, r)$ runs `gen(r)` from the initial depth, reaching depth at most $d(r)$ above it and ending at the initial depth ([[#thm-gen-correct]]); then one push; then `gen(l)`, which reaches $d(l)$ more; then the pop and the operator instructions, which push nothing. The maximum over the three stretches is $\max(d(r), 1, 1 + d(l)) = \max(d(r), 1 + d(l))$.
:::

::: example Stack depth of two trees {#ex-depth}
Compute $d$ for the tree of `2 * (3 + 4) - 10 / 5`, and for `(12 + 3) * 45 - 6`.
::: solution
For the first tree, `10 / 5` and `3 + 4` each have $d = \max(0, 1 + 0) = 1$. Then `2 * (3 + 4)` has $d = \max(1, 1 + 0) = 1$ (its right operand is the deep one, evaluated first, before anything is pushed), and the root has $d = \max(d(\texttt{10/5}), 1 + d(\texttt{2*(3+4)})) = \max(1, 2) = 2$. The listing in [[#ex-phases]] indeed has at most two values pushed at once (just after `pushq` of `4`, with `2` waiting below it).

For the second, `12 + 3` has $d = 1$, `(12 + 3) * 45` has $d = \max(0, 1 + 1) = 2$, and the root has $d = \max(0, 1 + 2) = 3$. Here the deep subtree is on the left and costs one extra slot at each level. A cleverer generator chooses the evaluation order per node so that the deeper subtree goes first — the idea of **Sethi–Ullman numbering** ([[#ex-sethi-ullman]]) — and a real code generator keeps values in registers rather than on the stack ([[compilers/code-generation]]).
:::
:::

Compare our output with a real compiler. Put the expression in a C function:

```c
long f(long x) {
    long y = 2 * (3 + 4) - 10 / 5;
    return x * y;
}
```

With `gcc -O2 -S -fno-asynchronous-unwind-tables -fcf-protection=none` (GCC 15.2), the whole function is

```text
f:
    leaq    (%rdi,%rdi,2), %rax     # rax = 3x
    salq    $2, %rax                # rax = 12x
    ret
```

The arithmetic has been done at compile time (**constant folding**), and the multiplication by 12 has been replaced by an address computation and a shift, which are cheaper than `imulq` on most x86-64 processors. Even at `-O0` GCC emits `movq $12, -8(%rbp)`: C requires compilers to evaluate *constant expressions* in some contexts anyway, so the folding happens in the front end before optimisation starts.

::: warning `-O0` does not mean "translated literally"
It is tempting to think that an unoptimised build shows "what the source really says", and optimisation then changes it. Neither half is right. Even at `-O0`, the front end folds constants, discards unreachable code after a `return`, and is free to choose any evaluation order the language permits (C does not specify whether the left or the right operand of `+` is evaluated first — our compiler chose the right). And optimisation does not change the meaning of correct programs; when an optimised build "behaves differently", the cause is almost always undefined behaviour in the source (an uninitialised variable, an out-of-bounds access, a signed overflow, a data race) which the optimiser assumed could not happen. Use `-fsanitize=address,undefined` to find such bugs instead of blaming the optimiser — although compilers do have bugs too, as the history below shows.
:::

::: quiz
Which phase of a C compiler reports each problem? (a) `int 9lives = 1;` — (b) `x = (y + 1;` — (c) `int x; x();` — Select the correct assignment.
- [ ] (a) parser, (b) lexer, (c) parser
- [x] (a) lexer, (b) parser, (c) semantic analysis
- [ ] (a) semantic analysis, (b) parser, (c) code generation
- [ ] all three are found by the parser
::: solution
`9lives` is not a valid token: a number cannot be followed directly by letters, so the lexer rejects it (GCC 15.2: "invalid suffix 'lives' on integer constant"). `(y + 1;` is a sequence of valid tokens that does not fit the grammar: a parse error. `x()` is grammatical — calling something is a valid expression shape — but `x` has type `int`, which is not a function: only semantic analysis, which knows the types of names, can see that.
:::
:::

## Front ends, back ends and intermediate representations

Our tiny compiler hands a tree from its front end to its back end. Real compilers have a richer interface, an **intermediate representation**, designed so that the front end can say everything about the program that the back end needs, in a form that is easy to analyse and transform. Clang's IR is LLVM IR. For the function `f` above, `clang -O0 -S -emit-llvm` (Clang 21.1) produces

```text
define dso_local i64 @f(i64 noundef %0) #0 {
  %2 = alloca i64, align 8
  %3 = alloca i64, align 8
  store i64 %0, ptr %2, align 8
  store i64 12, ptr %3, align 8
  %4 = load i64, ptr %2, align 8
  %5 = load i64, ptr %3, align 8
  %6 = mul nsw i64 %4, %5
  ret i64 %6
}
```

and at `-O2`

```text
define dso_local i64 @f(i64 noundef %0) local_unnamed_addr #0 {
  %2 = mul nsw i64 %0, 12
  ret i64 %2
}
```

The IR looks like the assembly language of an imaginary machine with unlimited registers (`%0`, `%2`, …), explicit types (`i64`) and explicit facts (`nsw`, "no signed wrap", records that C's signed multiplication cannot overflow in a defined program). At `-O0` every variable lives in a stack slot (`alloca`); the optimiser has promoted them to registers, folded the constant and deleted the loads and stores. Turning `mul … 12` into `lea` and `sal` was left to the x86-64 back end, which knows what is cheap on that machine. [[compilers/intermediate-representations]] studies this kind of IR, in **static single assignment** form, in detail.

The IR is what makes it economical to support many languages and many machines.

::: example Counting translators {#ex-mn}
An organisation needs compilers for $m$ source languages on $n$ target machines. How many components must it write (a) with a separate compiler for each pair, (b) with a common IR?
::: solution
(a) $m n$ compilers, each a complete program. (b) $m$ front ends (one per language, each producing the IR) plus $n$ back ends (one per machine, each consuming it): $m + n$ components, plus one shared optimiser. For $m = 5$ languages and $n = 4$ machines that is $20$ against $9$. Adding a sixth language costs one front end instead of four compilers. This is the design of GCC (front ends for C, C++, Objective-C, Fortran, Ada, Go, D and Modula-2, with COBOL added in GCC 15 in 2025 and an experimental Rust front end, all sharing the GIMPLE and RTL IRs), of LLVM (Clang, Swift, Rust, Julia, Zig and others emit LLVM IR), and of the Java and .NET virtual machines, whose bytecodes act as a common IR between many languages and the just-in-time compilers for each processor. The idea was proposed in 1958 as UNCOL, a "universal computer-oriented language"; it took decades for an IR general enough to succeed.
:::
:::

The saving is real but not free. A common IR must be low-level enough for every back end and expressive enough for every front end, and information the IR cannot express is lost: once a Rust or Swift program has been lowered to LLVM IR, the optimiser no longer sees its high-level types, so language-specific optimisations must happen earlier. This is why many modern compilers have *several* IRs at decreasing levels of abstraction — Rust's compiler lowers its syntax tree to HIR, then to the control-flow-graph IR MIR (on which the borrow checker runs), then to LLVM IR, then to LLVM's machine IR; GCC goes from GENERIC to GIMPLE to RTL.

## Writing a compiler in its own language

A compiler is a program, so it must itself be written in some language and compiled. To keep track of the three languages involved we use **T-diagrams**.

::: definition T-diagram notation {#def-tdiagram}
A compiler from source language $S$ to target language $T$, written in implementation language $I$, is written $S \xrightarrow{I} T$ (traditionally drawn as a letter T with $S$ and $T$ on the arms and $I$ on the stem). A program written in $I$ can run directly only if $I$ is the machine language $M$ of an available computer, or if an interpreter for $I$ is available. **Composition rule**: running a compiler $I \xrightarrow{M} J$ on machine $M$ with the text of a compiler $S \xrightarrow{I} T$ as input produces a compiler $S \xrightarrow{J} T$ — same source and target, new implementation language.
:::

The composition rule is just the definition of compilation ([[#def-compiler]]) applied to a program that happens to be a compiler: translation changes the language a program is written in and preserves what it does. A compiler written in its own source language, $S \xrightarrow{S} T$, is called **self-hosting**. Most production compilers are: GCC and Clang are written in C++, the Rust compiler in Rust, the Go compiler in Go, the OCaml compiler in OCaml. Writing a compiler in its own language is a strong test of the language and of the compiler, and it means the compiler's developers use the language every day. But it poses a chicken-and-egg problem: how is the first such compiler compiled?

::: definition Bootstrapping {#def-bootstrap}
**Bootstrapping** a self-hosting compiler $S \xrightarrow{S} M$ means obtaining a running version of it (one written in $M$) by first producing some running compiler or interpreter for $S$ by other means — written in another language, or for a small subset of $S$ — and then using it to compile $S \xrightarrow{S} M$.
:::

::: example Bootstrapping a new language {#ex-bootstrap}
You are creating a language $L$ and want a self-hosting compiler for machine $M$ (x86-64), which already has a C compiler $C \xrightarrow{M} M$. Describe a bootstrap with T-diagrams.
::: solution
1. Write a simple compiler for $L$ in C: $L \xrightarrow{C} M$. Compile it with the C compiler (composition rule): $C \xrightarrow{M} M$ applied to $L \xrightarrow{C} M$ gives $L \xrightarrow{M} M$, a running $L$ compiler. Call it *stage 0*. It may be slow and produce poor code; it only has to be correct.
2. Write the real compiler in $L$ itself: $L \xrightarrow{L} M$. Compile it with stage 0: the result is $L \xrightarrow{M} M$, the *stage 1* compiler. It is the new compiler, but built by the old one, so its own code is of stage-0 quality.
3. Compile $L \xrightarrow{L} M$ again, this time with stage 1. The result, *stage 2*, is the new compiler compiled by the new compiler, so it has the good code quality.
4. Compile once more with stage 2, giving *stage 3*. If the compiler is deterministic and correct, stages 2 and 3 were produced by compilers with the same source code (stage 1 and stage 2 differ only in how well they were compiled, not in what they do), from the same input, so they must be **bit-for-bit identical**. Comparing them is a powerful test.

Now the C version can be retired; from here on, each new version of the compiler is compiled by the previous one. This is how Rust was bootstrapped (its first compiler was written in OCaml), and step 4 is literally what GCC's `make bootstrap` does: it builds stage 1 with the system's compiler, stage 2 with stage 1 and stage 3 with stage 2, and compares the object files of stages 2 and 3.
:::
:::

::: example Porting to a new machine {#ex-port}
You have a self-hosting compiler running on machine $A$, $L \xrightarrow{A} A$, with its source $L \xrightarrow{L} A$. You want it on a new machine $B$ that has no compiler at all. What do you write, and what do you run?
::: solution
Write a new back end, producing $L \xrightarrow{L} B$ (the same front end and middle end, different code generator). On machine $A$, compile it with the existing compiler: the result is $L \xrightarrow{A} B$, a **cross-compiler** that runs on $A$ and produces code for $B$. Use the cross-compiler to compile $L \xrightarrow{L} B$ once more: the result is $L \xrightarrow{B} B$, a native compiler for $B$. Copy it to $B$; from now on $B$ is self-sufficient. Cross-compilation is also everyday practice for targets too small to run a compiler, such as microcontrollers, and for building phone applications on a desktop.
:::
:::

Bootstrapping has a disturbing consequence, pointed out by Ken Thompson in his 1984 Turing Award lecture "Reflections on Trusting Trust". The binary of a self-hosting compiler is produced by an earlier binary of itself, and a binary can contain behaviour that is not in the source. Thompson described how a compiler could be modified to recognise when it is compiling the login program (and insert a back door) and to recognise when it is compiling *itself* (and insert both recognisers into the new binary). Once that binary is installed, the modifications can be removed from the compiler's source: every future compiler built with it inherits them, and reading every line of source code would reveal nothing. The defence studied since is **diverse double-compiling** (David A. Wheeler, 2005, and his 2009 thesis): compile the compiler's source with an independent second compiler, use that result to compile the source again, and compare with the binary under suspicion; a mismatch exposes a difference that is not explained by the source. Modern projects also aim for **reproducible builds** — the same source always giving bit-identical binaries — so that anyone can check a distributed binary against its source.

::: widget graph
nodes: sub@4,0; mul@2,1; div@6,1; two@1,2; add@3,2; ten@5,2; five@7,2; three@2,3; four@4,3
edges: sub>mul; sub>div; mul>two; mul>add; add>three; add>four; div>ten; div>five
algorithm: dfs
start: sub
caption: The syntax tree of `2 * (3 + 4) - 10 / 5` (`sub`, `mul`, `add` and `div` are the operator nodes). Step through a depth-first search from the root. A code generator is a depth-first traversal that emits instructions as it *finishes* each vertex: in post-order, operands before operators. The search here visits left children first; our `gen` visits the right child first, so it finishes `five`, `ten`, `div`, `four`, `three`, `add`, `two`, `mul`, `sub` — compare with the instruction sequence in [[#ex-phases]].
:::

::: history
The first programs that translated a notation into machine code appeared in 1951–52: Corrado Böhm's ETH Zürich thesis (1951, published 1954) described a compiler written in its own language, Alick Glennie wrote the *Autocode* for the Manchester Mark 1 in 1952, and Grace Hopper's A-0 system for the UNIVAC I (1952) assembled programs from a library of subroutines. The decisive demonstration was **FORTRAN**. John Backus's team at IBM described "The FORTRAN automatic coding system" at the Western Joint Computer Conference in February 1957 and delivered the compiler for the IBM 704 that April; it was organised in six sections (phases), took about 18 person-years of work, and generated code good enough to persuade programmers to give up assembly language — the team regarded optimisation as essential to the language's acceptance. In 1958 Strong and colleagues proposed UNCOL, a universal intermediate language. Timothy Hart and Michael Levin's LISP compiler of 1962, written in LISP and bootstrapped by running it in the LISP interpreter, was the first self-hosting compiler of the modern kind. Richard Stallman released GCC in 1987, and Chris Lattner and Vikram Adve described LLVM in 2004. Ken Thompson's "Reflections on Trusting Trust" appeared in *Communications of the ACM* in 1984. Testing compilers is itself a research field: Csmith (Yang, Chen, Eide and Regehr, 2011), which generates random C programs free of undefined behaviour and compares compilers' outputs, found hundreds of bugs in GCC and LLVM, while Xavier Leroy's CompCert (2006–2009) is a C compiler whose back end is proved correct in the Coq proof assistant, in the spirit of [[#thm-gen-correct]].
:::

## Where this leads

The next chapter, [[compilers/lexical-analysis]], replaces our one-line `re.findall` with a lexer generated from regular expressions through finite automata. [[compilers/top-down-parsing]] and [[compilers/bottom-up-parsing]] explain when a recursive-descent parser like ours works and what to do when it does not. [[compilers/semantic-analysis]] adds names and types, [[compilers/intermediate-representations]] a real IR with control flow, [[compilers/dataflow-optimisation]] the analyses behind constant folding and its cousins, [[compilers/code-generation]] register allocation and calling conventions — the step from our stack-machine code to GCC's two instructions — and [[compilers/runtime-systems]] the run-time support that compiled programs rely on.

::: summary
- A **compiler** ([[#def-compiler]]) translates a source program into a target program with the same behaviour on every input for which the source behaviour is defined, and rejects texts that are not programs.
- It is organised into **phases** — lexing, parsing, semantic analysis, IR generation, optimisation, code generation — with a symbol table alongside; a **pass** is one traversal of the program, and modern compilers run hundreds of passes over an IR.
- The **front end** depends on the source language, the **back end** on the target machine; a common **IR** reduces $mn$ compilers to $m + n$ components ([[#ex-mn]]).
- A compiler defined by recursion on the tree is proved correct by **structural induction** with a sufficiently strong invariant ([[#thm-gen-correct]]); correctness is always relative to a precise semantics (truncating versus flooring division).
- Stack-machine code is simple but uses memory for every intermediate value; its stack depth obeys $d = \max(d(r), 1 + d(l))$ ([[#prop-depth]]).
- **T-diagrams** track source, target and implementation languages; **bootstrapping** builds a self-hosting compiler in stages, and comparing stages 2 and 3 tests it ([[#ex-bootstrap]]). Cross-compilers port it to new machines.
- A compiler binary can carry behaviour absent from its source (Thompson's attack); diverse double-compiling and reproducible builds are the defences.
:::

## Exercises

::: exercise Counting tokens {level=1 check="9"}
How many tokens does the lexer of the tiny compiler produce for `(12+3)*45-6`, not counting the end marker `$`? (Enter the number.)
::: solution
`(`, `12`, `+`, `3`, `)`, `*`, `45`, `-`, `6`: nine tokens. Multi-digit numbers are single tokens because the pattern `\d+` matches as many digits as possible.
:::
:::

::: exercise Which phase? {level=1}
For each of the following C fragments, name the earliest phase of a compiler that must reject it: (a) `int x = 08;` (b) `if x > 0 { }` (c) `int a[3]; a = 0;` (d) `return 1 +;` (e) `char *s = "abc;` (f) `int f(void) { return y; }` with no declaration of `y`.
::: solution
(a) Lexical analysis: `08` is not a valid octal constant (GCC 15.2: "invalid digit '8' in octal constant"). (b) Parsing: C requires parentheses around the condition. (c) Semantic analysis: the code is grammatical, but an array is not assignable. (d) Parsing. (e) Lexical analysis: the string literal is not terminated before the end of the line. (f) Semantic analysis: the name `y` is undeclared; this needs the symbol table.
:::
:::

::: exercise Stack depth of a left-deep tree {level=1 check="4"}
Using [[#prop-depth]], what is the maximum number of values the tiny compiler's code for `((((1-2)-3)-4)-5)` has pushed at once? (Enter the number.)
::: solution
Let $t_1 = 1 - 2$, $t_{k} = t_{k-1} - (k+1)$. Then $d(t_1) = \max(0, 1 + 0) = 1$ and $d(t_k) = \max(0, 1 + d(t_{k-1})) = d(t_{k-1}) + 1$, so $d(t_4) = 4$. By contrast `1-(2-(3-(4-5)))` has depth $1$: each right operand is evaluated before anything is pushed. Both programs print the correct results, $-13$ and $3$.
:::
:::

::: exercise Components with a common IR {level=2 check="11"}
A company supports compilers for 5 languages on 4 processors. How many fewer separate components (front ends plus back ends, ignoring the shared optimiser) does a common-IR design need than a design with one compiler per language–processor pair? (Enter the difference.)
::: solution
Separate compilers: $5 \times 4 = 20$. Common IR: $5 + 4 = 9$. The difference is $20 - 9 = 11$, and it grows quickly: with 10 languages and 10 processors it is $100 - 20 = 80$.
:::
:::

::: exercise Unary minus {level=2}
Extend the tiny compiler with unary minus, so that `-3 * -(2 - 5)` and `2 - -3` are accepted. Change the grammar, the parser and the code generator, and extend the proof of [[#thm-gen-correct]] to the new case.
::: solution
Grammar: $\textit{atom} \to \texttt{NUM} \mid \texttt{(}\,\textit{expr}\,\texttt{)} \mid \texttt{-}\ \textit{atom}$. Because unary minus is part of `atom`, it binds tighter than any binary operator, so `-3 * 2` means `(-3) * 2`. In `atom`, after `tok = advance()`, add

```python
        if tok == "-": return ("neg", atom())
```

and at the start of the non-number case of `gen`:

```python
    if t[0] == "neg":
        gen(t[1], out); out.append("negq %rax"); return
```

The lexer needs no change: `-` is already a token, and the parser decides from context whether it is unary (where an atom is expected) or binary (after a term). Results:

```console
$ for e in "-3 * -(2 - 5)" "--4" "2 - -3"; do python3 tinyneg.py "$e" > n.s && gcc n.s -o n && ./n; done
-9
4
5
```

Proof of the new case $t = (\texttt{neg}, u)$: by the hypothesis for $u$, after `gen(u)` the stack is $S$ and `%rax` $= \llbracket u \rrbracket$; `negq %rax` sets `%rax` to the 64-bit two's-complement negation, which is $\llbracket -u \rrbracket$ (with $-(-2^{63}) = -2^{63}$, the wrap-around result, as in our semantics). Nothing else changes except the flags.
:::
:::

::: exercise A cross-compiler bootstrap {level=2}
A team has a C compiler $C \xrightarrow{A} A$ on machine $A$ and the source of a self-hosting Go compiler with back ends for $A$ and $B$ (so they have $Go \xrightarrow{Go} A$ and $Go \xrightarrow{Go} B$). They also have an old Go compiler written in C, $Go \xrightarrow{C} A$, that handles the language the new compiler is written in. Using the composition rule of [[#def-tdiagram]], list the compilations needed to obtain a native Go compiler $Go \xrightarrow{B} B$, saying for each one which compiler runs and what it produces.
::: solution
1. Run $C \xrightarrow{A} A$ on $Go \xrightarrow{C} A$: produces $Go \xrightarrow{A} A$ (the old compiler, now running on $A$).
2. Run that on $Go \xrightarrow{Go} A$: produces $Go \xrightarrow{A} A$, the new compiler (stage 1). Optionally repeat to get a stage-2 compiler compiled by itself.
3. Run the new $Go \xrightarrow{A} A$ on $Go \xrightarrow{Go} B$: produces $Go \xrightarrow{A} B$, a cross-compiler.
4. Run the cross-compiler on $Go \xrightarrow{Go} B$: produces $Go \xrightarrow{B} B$. Copy it to $B$.
(Go's real bootstrap, since Go 1.5 in 2015, needs an earlier Go release instead of a C compiler, and Go's tool chain can cross-compile by setting `GOOS` and `GOARCH`.)
:::
:::

::: exercise Why stage 2 and stage 3 must agree {level=2}
In [[#ex-bootstrap]], explain precisely why stages 2 and 3 should be identical while stages 1 and 2 usually are not. Name two things that can make stages 2 and 3 differ even though the compiler is correct, and say why a difference is nevertheless worth investigating.
::: solution
A compiler's *output* depends only on its *behaviour* (what translation it computes) and its input. Stage 1 and stage 2 have the same source code, so — if the compiler that built each of them was correct — they compute the same translation; they differ only in the quality of their own machine code (stage 1 was built by the old compiler). Stages 2 and 3 are the outputs of stage 1 and stage 2 on the same input, so they must be identical. Stages 1 and 2 are outputs of different compilers (stage 0 and stage 1), so they differ.

Correct compilers can still produce different bytes if their output depends on something other than the input: embedded timestamps or file paths, iteration over hash tables whose order depends on memory addresses (address-space randomisation differs between runs), or uninitialised padding bytes written to object files. These are exactly the obstacles that reproducible-build efforts remove. A difference is worth investigating because, once such nondeterminism is excluded, it means stage 1 and stage 2 behave differently — that is, one of the compilers that built them miscompiled the compiler.
:::
:::

::: exercise Choosing the evaluation order {level=3 #ex-sethi-ullman}
Modify `gen` so that for each operator node it evaluates the subtree with the larger depth first, and prove that the maximum stack depth becomes

$$
d'(t) = \begin{cases} 0 & t \text{ a number},\\ \max\bigl(d'(l), d'(r)\bigr) & d'(l) \ne d'(r),\\ d'(l) + 1 & d'(l) = d'(r). \end{cases}
$$

Show that $d'$ is never worse than $d$ of [[#prop-depth]], compute $d'$ for `((((1-2)-3)-4)-5)`, and show that $d'(t) \le \lfloor \log_2 (\text{number of leaves}) \rfloor$.
::: solution
Code for the left-first order: `gen(l); pushq %rax; gen(r); movq %rax, %rcx; popq %rax`, followed by the operator instructions (the right operand ends in `%rcx`, the left in `%rax`, as before). Its depth is $\max(d'(l), 1 + d'(r))$. The right-first order of the original has depth $\max(d'(r), 1 + d'(l))$. Choosing the deeper subtree first: if $d'(l) > d'(r)$, the left-first order gives $\max(d'(l), 1 + d'(r)) = d'(l)$ since $1 + d'(r) \le d'(l)$; symmetrically if $d'(r) > d'(l)$; if they are equal, either order gives $d'(l) + 1$. This is the formula. Correctness is proved exactly as in [[#thm-gen-correct]] for each order.

Never worse: by induction, $d'(t) \le d(t)$ since $d'(t) \le \max(d'(r), 1 + d'(l))$ (the minimum of the two orders is at most the right-first one) and the induction hypothesis applies to the subtrees.

For the left-deep chain, every node has one subtree a number ($d' = 0$) and the other, at the bottom, `1-2` with $d' = 1$; then $d'(t_k) = \max(d'(t_{k-1}), 0) = 1$ for all $k$. The depth drops from $4$ to $1$.

Logarithmic bound: let $N(t)$ be the number of leaves. We show $N(t) \ge 2^{d'(t)}$ by induction. For a leaf, $1 \ge 2^0$. If $d'(l) \ne d'(r)$, say $d'(t) = d'(l)$, then $N(t) > N(l) \ge 2^{d'(l)}$. If $d'(l) = d'(r) = k$, then $N(t) = N(l) + N(r) \ge 2^k + 2^k = 2^{k+1} = 2^{d'(t)}$. Taking logarithms, $d'(t) \le \log_2 N(t)$, and $d'$ is an integer. This is the Sethi–Ullman labelling (1970), used to evaluate expressions with the fewest registers.
:::
:::

::: exercise Trusting trust {level=3}
(a) Explain why, in Thompson's attack, inspecting the complete source code of the compiler and of the login program does not reveal the back door. (b) Explain the idea of diverse double-compiling: given the source $s$ of compiler $X$, a binary $b$ claimed to be built from $s$, and an independent trusted compiler $T$, what is computed and compared, and what does a match show? (c) What assumption about $T$ is essential?
::: solution
(a) The back door lives only in the *binary* of the compiler. The compromised binary recognises two inputs: the login program, into whose binary it inserts the back door, and the compiler's own source, into whose binary it inserts both recognisers. The source files of the compiler and of login are clean, so reading them reveals nothing, and recompiling the clean compiler source with the compromised binary regenerates the compromise.

(b) Compile $s$ with $T$, obtaining a binary $X_1$; it behaves as $s$ says (if $T$ is correct), although its code differs from $b$. Then compile $s$ with $X_1$, obtaining $X_2$. Since $X_1$ computes the translation specified by $s$, $X_2$ is what $s$ compiled by a faithful implementation of $s$ yields — the same as what $b$ yields when it compiles $s$ *if* $b$ is a faithful build of $s$ and compilation is deterministic. Compare $X_2$ with $b$ bit for bit. A match shows that $b$ corresponds to $s$: any hidden self-reproducing code in $b$ would have to be in $s$, or in $T$ as well.

(c) $T$ must not be compromised *in the same way* — it must be independent of $X$'s possible attacker (written by others, built from a different lineage). It need not be perfect or even fast; it need only not share the attack. Compilation must also be deterministic, as in the previous exercise.
:::
:::
