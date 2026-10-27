You put £1,000 into a savings account that pays 5% interest a year. How many whole years must you wait before the balance is at least £2,000? You could reach for logarithms, or you could do something more humble: start with £1,000, add a year's interest, check whether you have reached £2,000, and if not, add another year's interest, counting as you go. The second approach needs no cleverness at all — only patience and accuracy. That makes it the kind of job a computer does perfectly:

```python
# doubling.py: how many whole years until savings at least double?
balance = 1000.0       # starting amount, in pounds
rate = 0.05            # 5% interest per year
years = 0
while balance < 2000.0:
    balance = balance * (1 + rate)   # one year of interest
    years = years + 1
print("Years needed:", years)
print("Final balance:", round(balance, 2))
```

```console
$ python3 doubling.py
Years needed: 15
Final balance: 2078.93
```

These nine lines are a **program**: a precise, unambiguous description of a computation, written in a language that a machine can carry out. This course teaches you to write such descriptions, in the language Python, for problems far less tidy than compound interest. It starts here with the ideas underneath every program: what a computation is, what an algorithm is, how a description written by a person ends up being executed by a machine, and how to read a program as a sequence of states so that you can predict what it does before you run it.

## Algorithms: computation as a precise recipe

People computed long before there were computers. Long multiplication, the method you learned for dividing one number by another, the procedure a bank clerk once used to balance a ledger: each is a fixed sequence of simple steps that anyone can follow without understanding why it works, and that always produces the answer. Such a procedure is called an algorithm.

::: definition Algorithm {#def-algorithm}
An **algorithm** is a finite list of instructions for solving a problem, with these properties:

1. **Definiteness.** Each step is precisely specified; there is never any doubt about what to do next.
2. **Effectiveness.** Each step is simple enough to be carried out exactly, in a finite time, by a person with pencil and paper (or by a machine).
3. **Finiteness.** For every valid input, the procedure stops after a finite number of steps.
4. **Input and output.** It receives zero or more inputs from a specified set and produces at least one output that stands in a specified relation to the input.
:::

A cookbook recipe resembles an algorithm but fails the first two tests: "season to taste" and "bake until golden" are not definite, and they depend on judgement the recipe does not supply. Most of the difficulty of programming is the work of turning a vague description of what we want into steps that pass all four tests.

The oldest algorithm still in everyday use is Euclid's method for the **greatest common divisor** $\gcd(a, b)$ of two whole numbers — the largest integer that divides both. It appears in Book VII of Euclid's *Elements*, written around 300 BCE, and it is still used every day, for example by cryptographic software to compute modular inverses. Its modern form uses the remainder $a \bmod b$, the amount left over when $a$ is divided by $b$ (for instance $17 \bmod 5 = 2$).

::: algorithm Euclid's algorithm {#alg-euclid}
**Input:** integers $a \ge 0$ and $b \ge 0$, not both zero. **Output:** $\gcd(a, b)$.

1. While $b \neq 0$:
   1. Let $r \gets a \bmod b$.
   2. Set $a \gets b$ and then $b \gets r$.
2. Return $a$.
:::

Before believing that a procedure computes what it claims, we should prove it. The proof rests on one fact about remainders.

::: lemma The remainder step preserves the gcd {#lem-gcd-step}
If $b > 0$, then $\gcd(a, b) = \gcd(b, a \bmod b)$.
:::

::: proof
Write $a = qb + r$ with $q$ the quotient and $r = a \bmod b$, so $r = a - qb$. If an integer $d$ divides both $a$ and $b$, then it divides $a - qb = r$; so every common divisor of $a$ and $b$ is a common divisor of $b$ and $r$. Conversely, if $d$ divides both $b$ and $r$, then it divides $qb + r = a$. Hence the pairs $(a, b)$ and $(b, r)$ have exactly the same common divisors, and in particular the same greatest one.
:::

::: theorem Euclid's algorithm is correct {#thm-euclid}
For all integers $a, b \ge 0$, not both zero, [[#alg-euclid]] stops and returns $\gcd(a, b)$.
:::

::: proof
*It stops.* Each time round the loop, the new value of $b$ is a remainder on division by the old $b$, so it is strictly smaller than the old $b$ and still at least $0$. A strictly decreasing sequence of non-negative integers cannot go on for ever, so after at most $b$ iterations (counting with the original $b$) we reach $b = 0$ and the loop ends.

*It returns the right value.* Let $g = \gcd(a, b)$ for the original inputs. The statement "$\gcd(a, b) = g$" is true before the first iteration, and by [[#lem-gcd-step]] each iteration replaces $(a, b)$ by a pair with the same gcd, so the statement remains true after every iteration. When the loop stops we have $b = 0$, and $\gcd(a, 0) = a$ because every integer divides $0$ and the largest divisor of $a > 0$ is $a$ itself. (Here $a > 0$: if $a$ were also $0$, then either the input was $(0, 0)$, which is excluded, or the previous iteration started with $b = 0$, in which case it would not have run.) So the returned value $a$ equals $g$.
:::

This proof has the two halves that every correctness argument in computer science has: the procedure **terminates**, and when it terminates its answer is **right**. The statement that stayed true throughout the loop is called a **loop invariant**; we shall use invariants constantly from [[programming-1/control-flow]] onwards.

::: example Tracing Euclid's algorithm {#ex-euclid-trace}
Compute $\gcd(1071, 462)$ with [[#alg-euclid]], showing $a$, $b$ and the remainder at each step.
::: solution
| step | $a$ | $b$ | $r = a \bmod b$ |
|---|---|---|---|
| 1 | $1071$ | $462$ | $1071 - 2\cdot 462 = 147$ |
| 2 | $462$ | $147$ | $462 - 3\cdot 147 = 21$ |
| 3 | $147$ | $21$ | $147 - 7 \cdot 21 = 0$ |
| end | $21$ | $0$ | — |

After three iterations $b = 0$, so the algorithm returns $\gcd(1071, 462) = 21$. Check: $1071 = 3 \cdot 7 \cdot 51 = 21 \cdot 51$ and $462 = 21 \cdot 22$, and $\gcd(51, 22) = 1$, so $21$ really is the largest common divisor.
:::
:::

::: widget euclid
a: 1071
b: 462
mode: gcd
caption: Euclid's algorithm on $1071$ and $462$, as a table of divisions and as squares tiling a $1071 \times 462$ rectangle: each division removes as many $b \times b$ squares as fit, and the side of the last square is the gcd. Change $a$ and $b$ and count the rows. Try two consecutive Fibonacci numbers such as $89$ and $55$: every quotient is $1$ and the algorithm takes as many steps as it ever can for numbers of that size.
:::

Notice what the algorithm does *not* need. It does not factorise $1071$ and $462$ into primes, which for numbers hundreds of digits long would be hopelessly slow; it only divides and keeps remainders. Choosing a good algorithm is often worth far more than any amount of care in carrying out a bad one. How fast Euclid's algorithm is — the number of steps grows only with the number of *digits* of the inputs — is the subject of [[#exr-euclid-halving]].

## From algorithms to programs

An algorithm written in English and mathematical notation is meant for people. To have a machine carry it out we must write it in a **programming language**: an artificial language with a precisely defined form and meaning.

::: definition Program, syntax and semantics {#def-program}
A **program** is a description of a computation in a programming language. The **syntax** of the language is the set of rules saying which sequences of characters are well-formed programs; the **semantics** says what each well-formed program does when it runs. The text of the program, as a person writes it, is its **source code**.
:::

Here is Euclid's algorithm as a Python function (functions are the subject of [[programming-1/functions]]; for now read `def gcd(a, b):` as "here is how to compute `gcd(a, b)`"):

```python
def gcd(a, b):
    """Greatest common divisor of non-negative integers a and b, not both zero."""
    while b != 0:
        a, b = b, a % b      # % is the remainder; both new values use the old a and b
    return a

print(gcd(1071, 462))
print(gcd(462, 1071))
print(gcd(17, 5))
print(gcd(0, 9))
```

```console
$ python3 gcd.py
21
21
1
9
```

The program follows [[#alg-euclid]] almost line for line. The line `a, b = b, a % b` performs both assignments of step 1.2 *at once*: Python first evaluates `b` and `a % b` using the current values, and only then stores them. The second call, `gcd(462, 1071)`, shows something the proof predicted: if $a < b$, the first iteration simply swaps them, because $462 \bmod 1071 = 462$.

### What the machine actually runs

A processor does not understand Python. It executes **machine code**: sequences of binary-encoded instructions, each doing something very small — add two numbers held in registers, load a word from memory, jump to another instruction if a value is zero. Machine code is different for each family of processor (x86-64, ARM, RISC-V) and painful for people to write. A **high-level language** such as Python, C or Java lets us write in terms of numbers, text, lists and functions, and leaves the translation to software. There are two classic strategies for that translation.

- A **compiler** translates the whole source program, ahead of time, into another language — often machine code — and saves the result. You then run the translation. C is usually compiled: `gcc` turns `prog.c` into an executable file that the processor runs directly.
- An **interpreter** is a program that reads the source (or a translation of it) and carries out its instructions itself, one after another, while the program runs.

The distinction is about implementations, not languages, and real systems mix the two. The standard implementation of Python, called **CPython** (because it is written in C), first compiles your source code into **bytecode** — instructions for an imaginary, simplified machine — and then a **virtual machine**, an interpreter loop inside CPython, executes the bytecode. You can see the bytecode with the standard module `dis`:

```python
import dis
dis.dis("y = 3 * x + 1")
```

```console
$ python3 dis1.py
  0           RESUME                   0

  1           LOAD_SMALL_INT           3
              LOAD_NAME                0 (x)
              BINARY_OP                5 (*)
              LOAD_SMALL_INT           1
              BINARY_OP                0 (+)
              STORE_NAME               1 (y)
              LOAD_CONST               1 (None)
              RETURN_VALUE
```

This output is from CPython 3.14; the instruction set changes between versions, so other versions print something slightly different. You never need to read bytecode to write Python, but it is worth seeing once, because it makes the abstraction concrete. The virtual machine keeps a **stack** of values: `LOAD_SMALL_INT 3` pushes $3$, `LOAD_NAME x` pushes the current value of `x`, `BINARY_OP *` pops two values and pushes their product, and so on, until `STORE_NAME y` pops the result and gives it the name `y`. The expression $3x + 1$ has been turned into a sequence of definite, effective steps — an algorithm for evaluating it.

::: widget graph
nodes: Source@0,1; Parser@1,1; Bytecode@2,1; VM@3,1; Output@4,1; Errors@1,0; Machine@3,0
edges: Source>Parser; Parser>Bytecode; Bytecode>VM; VM>Output; Parser>Errors; VM>Errors; VM>Machine
caption: How CPython runs `python3 prog.py`. The source text is parsed and compiled to bytecode (a syntax error stops everything at the parser, before a single line runs); the virtual machine then executes the bytecode, itself running as machine code on the processor, and either produces output or stops with a runtime error. Drag the nodes to rearrange the diagram.
:::

::: example Python as a calculator {#ex-repl}
Python can also be used **interactively**. Typing `python3` with no file name starts the **REPL** (read–evaluate–print loop), which shows the prompt `>>>`, reads one statement, runs it and, if it was an expression, prints its value. Predict the four results, then compare with the session below.

```console
>>> 7 / 2
>>> 7 // 2
>>> 2 ** 100
>>> "ab" * 3
```
::: solution
```console
>>> 7 / 2
3.5
>>> 7 // 2
3
>>> 2 ** 100
1267650600228229401496703205376
>>> "ab" * 3
'ababab'
```

`/` is true division and always gives a floating-point number; `//` is **floor division**, which rounds down to a whole number; `**` is exponentiation. Python integers have no fixed size limit, so $2^{100}$ is printed exactly, all 31 digits. Multiplying a string by an integer repeats it. Each of these is explained in [[programming-1/values-types]]. The REPL is the quickest way to try an idea: whenever you are unsure what a small piece of Python does, ask Python.
:::
:::

::: quiz
Which statement about CPython is correct?
- [ ] It translates a program to machine code once, saves it, and the processor then runs that file directly, as `gcc` does.
- [x] It compiles source code to bytecode, and a virtual machine (an interpreter written in C) executes the bytecode.
- [ ] It executes the source text character by character, without any translation.
- [ ] Python is an interpreted language, so no compilation of any kind happens.
::: solution
CPython compiles each source file to bytecode (that is why a syntax error anywhere in a file is reported before any line of it runs) and then interprets the bytecode in its virtual machine. "Compiled" and "interpreted" describe implementations, not languages: other implementations of Python exist, some of which compile to machine code while the program runs.
:::
:::

## A first look at Python

Python was designed to be readable, and a short Python program reads almost like the algorithm it implements. Here are the pieces of `doubling.py` from the start of the chapter, which you will meet properly in the next three chapters.

- **Comments** begin with `#` and run to the end of the line. Python ignores them; they are for people.
- **Assignment** `balance = 1000.0` evaluates the right-hand side and gives the result the name on the left. The `=` sign does *not* mean mathematical equality: `years = years + 1` means "compute `years + 1` and make `years` refer to the result".
- **Expressions** such as `balance * (1 + rate)` combine values with operators, much as in algebra.
- **Control flow**: `while balance < 2000.0:` repeats the indented lines below it for as long as the condition is true. In Python, **indentation is syntax**: the lines that belong to the loop are exactly those indented under it (four spaces is the convention).
- **Function calls**: `print(...)` displays values; `round(balance, 2)` rounds to two decimal places. A function is a named piece of computation that takes arguments in parentheses and gives back a result.

A Python program is run from the top down, one **statement** at a time, unless a control-flow statement such as `while` says otherwise. You can run it as a file (`python3 doubling.py`) or type its statements into the REPL. The file form is what you will use for anything longer than a few lines: it can be saved, edited, re-run and shared.

::: example Running the doubling program by hand {#ex-doubling}
Change `rate` in `doubling.py` to `0.10`. Without running the program, work out what it prints.
::: solution
At 10% the balance after $n$ years is $1000 \times 1.1^n$. The loop continues while the balance is below $2000$:

| years | balance after that year |
|---|---|
| 1 | 1100.00 |
| 2 | 1210.00 |
| 3 | 1331.00 |
| 4 | 1464.10 |
| 5 | 1610.51 |
| 6 | 1771.56 |
| 7 | 1948.72 |
| 8 | 2143.59 |

After 7 years the balance is still below $2000$, so the loop runs again; after 8 years it is $2143.59 \ge 2000$, the condition `balance < 2000.0` is false, and the loop stops. The program prints `Years needed: 8` and `Final balance: 2143.59`. (Running it confirms both lines.) The logarithm approach agrees: we need the least whole $n$ with $1.1^n \ge 2$, and $\ln 2/\ln 1.1 \approx 7.27$, so $n = 8$.
:::
:::

## Programs as sequences of states

To understand a program — and above all to predict what it will do before running it — we need a model of what happens when it runs. The model used throughout this course is simple.

::: definition State and execution {#def-state}
At any moment during a run, the **state** of a program consists of the names that currently exist, the value each one refers to, and the position of the next statement to execute. Executing a statement transforms one state into the next. An **execution** (or run) of the program is the resulting sequence of states, from the initial state to the final state when the program stops.
:::

A **trace table** writes an execution down: one column per variable, one row per step. Drawing trace tables by hand is the single most useful skill for a beginning programmer, because it forces you to do exactly what the machine does rather than what you hoped it would do.

::: example Swapping two values {#ex-swap}
A program should exchange the values of `x` and `y`. Trace each version and decide which ones work.

```python
# Version A           # Version B           # Version C
x = 3                 x = 3                 x = 3
y = 8                 y = 8                 y = 8
x = y                 t = x                 x, y = y, x
y = x                 x = y
                      y = t
```
::: solution
**Version A.**

| after line | `x` | `y` |
|---|---|---|
| `x = 3` | 3 | — |
| `y = 8` | 3 | 8 |
| `x = y` | 8 | 8 |
| `y = x` | 8 | 8 |

The value $3$ is lost at the third line: once `x` refers to $8$, nothing remembers the old value. Version A fails.

**Version B.** After `t = x` we have `t` $= 3$; after `x = y`, `x` $= 8$; after `y = t`, `y` $= 3$. The temporary variable `t` keeps the old value of `x` safe, and the swap works.

**Version C.** Python evaluates the whole right-hand side `y, x` first, producing the pair $(8, 3)$ from the *current* values, and only then assigns $8$ to `x` and $3$ to `y`. It works, and it is the idiomatic way to swap in Python — the same simultaneous assignment that `gcd` uses.
:::
:::

::: warning `=` is not equality
In mathematics, $x = y$ is a symmetric statement of fact, and $x = x + 1$ is a contradiction. In Python, `x = y` is a *command*: make the name `x` refer to whatever `y` refers to now. It is not symmetric (`x = y` and `y = x` do different things, as Version A shows), and `x = x + 1` is perfectly sensible: it increases `x` by one. Python writes the equality *test* as `==`, which you will meet in [[programming-1/values-types]].
:::

The state model also explains why the order of statements matters, why a loop eventually stops (some part of the state changes in a way that must eventually make the condition false), and what a bug is: an execution whose states differ from the ones you intended.

## Three kinds of error

Programs fail in three different ways, and recognising which kind of failure you are looking at is the first step in fixing it.

::: definition Syntax, runtime and logic errors {#def-errors}
- A **syntax error** means the source text is not a well-formed program. It is detected when the program is translated, before any of it runs.
- A **runtime error** occurs while a syntactically correct program is running, when some operation cannot be carried out (dividing by zero, using a name that does not exist). In Python it raises an **exception**, which by default stops the program with an error report.
- A **logic error** (or **bug** in the narrow sense) means the program runs to completion without complaint but computes the wrong thing.
:::

::: example Recognising the three kinds {#ex-errors}
Run each of the three programs below and classify the outcome.

```python
print("Hello, world!"
```

```python
total = 10
count = 0
print("Average:", total / count)
```

```python
width = 5
height = 3
area = width + height   # should be width * height
print("Area:", area)
```
::: solution
The first file is missing its closing parenthesis. Python refuses to run any of it:

```console
$ python3 syn.py
  File ".../syn.py", line 1
    print("Hello, world!"
         ^
SyntaxError: '(' was never closed
```

The second is well-formed, but the division fails when the program reaches it:

```console
$ python3 zero.py
Traceback (most recent call last):
  File ".../zero.py", line 3, in <module>
    print("Average:", total / count)
                      ~~~~~~^~~~~~~
ZeroDivisionError: division by zero
```

The **traceback** names the file, the line and the exact operation (marked with `^`) and ends with the type of exception and a message. This is a runtime error.

The third program runs and prints `Area: 8`. Nothing complains — the computer did exactly what it was told — but the area of a $5 \times 3$ rectangle is $15$. This is a logic error, the hardest kind to find, because only *you* know what the program was supposed to do. (Output from CPython 3.14; the long file paths are shortened to `...` here. Earlier versions word some messages differently.)
:::
:::

Error messages are not insults; they are the most useful information you will ever get about a failing program. Read them from the bottom up: the last line says *what* went wrong, the lines above say *where*. Modern Python often makes a suggestion as well — misspell `print` as `prnt` and the report ends with `NameError: name 'prnt' is not defined. Did you mean: 'print'?`. Systematic ways of finding logic errors are the subject of [[programming-1/testing-debugging]].

::: warning "It runs, so it works"
A program that runs without an error message has passed only the weakest test there is. The interpreter checks that each operation *can* be performed, never that it is the operation you meant. The `area` program above and the `Version A` swap both run cleanly and both are wrong. Evidence that a program works comes from checking its output against answers you know independently — by hand calculation, by a different method, or by a proof like the one for [[#thm-euclid]].
:::

::: quiz
A program that should print the larger of two numbers prints the smaller one. It produces no error message. What kind of error is this?
- [ ] A syntax error
- [ ] A runtime error
- [x] A logic error
::: solution
The program is well-formed (no syntax error) and every operation succeeded (no runtime error, hence no traceback); it simply computes the wrong thing. Most likely a comparison is the wrong way round, such as `<` where `>` was intended.
:::
:::

## What can be computed?

It is natural to ask whether some problems are beyond any program. In 1936 Alan Turing answered this by defining a very simple abstract machine — now called a **Turing machine** — which reads and writes symbols on an unbounded tape according to a finite table of rules. At about the same time Alonzo Church gave an apparently different definition, the λ-calculus, and the two were soon proved to define exactly the same class of computable functions. The **Church–Turing thesis** is the claim that this class captures every function that can be computed by any effective procedure in the sense of [[#def-algorithm]]. It is a thesis rather than a theorem, because "effective procedure" is an informal idea, but every model of computation proposed since — including every real programming language, given unlimited memory — has turned out to compute exactly the same functions.

Two consequences matter even in a first course. First, the choice of language does not limit *what* you can compute: anything you can write in C or Java can be written in Python, and vice versa. Languages differ in convenience, speed and safety, not in fundamental power. Second, there are well-defined problems that *no* program solves. Turing showed that there is no program which, given any program and its input, correctly decides whether that program eventually stops — the **halting problem**. One practical consequence is that no tool can automatically find every infinite loop in every program, which is part of why testing and careful reasoning will always be needed.

::: history
In 1843 Ada Lovelace published a translation of Luigi Menabrea's paper on Charles Babbage's proposed Analytical Engine, adding notes three times as long as the original; her Note G sets out, step by step, how the engine could compute the Bernoulli numbers, and is often called the first published computer program, although the machine was never built. Alan Turing's paper "On computable numbers, with an application to the Entscheidungsproblem" (1936) and Alonzo Church's work on the λ-calculus (1936) gave the first precise definitions of computation. John von Neumann's *First Draft of a Report on the EDVAC* (1945) described the **stored-program** design, in which instructions are held in the same memory as data, used by almost every computer since. FORTRAN, the first widely used high-level language, was delivered by John Backus's team at IBM in 1957. Python was created by Guido van Rossum, who released its first public version, 0.9.0, in February 1991.
:::

## Where this leads

The rest of this course builds the vocabulary for writing programs like `gcd` and `doubling.py` with confidence. [[programming-1/values-types]] looks closely at the values a program manipulates and the expressions that combine them; [[programming-1/control-flow]] at decisions and loops, and at the invariants that let us reason about them; [[programming-1/functions]] and [[programming-1/recursion]] at breaking a problem into named, reusable parts. Later courses study algorithms and their cost in depth ([[algorithms]]), the precise limits of computation ([[theory-of-computation]]) and how a processor actually executes machine code ([[computer-systems]]).

::: summary
- An **algorithm** is a finite, definite, effective procedure that stops on every valid input and produces the required output ([[#def-algorithm]]); Euclid's gcd algorithm is the classic example.
- A correctness argument has two parts: the procedure terminates, and its answer is right — often proved with a statement that stays true on every iteration, a **loop invariant**.
- A **program** is an algorithm written in a programming language, whose **syntax** says what is well-formed and whose **semantics** says what it does.
- Compilers translate ahead of time; interpreters execute as the program runs. CPython compiles source to bytecode and interprets the bytecode in a virtual machine.
- A running program is a sequence of **states**; a trace table records them and is the best way to predict what code does. Assignment `=` is a command, not an equation.
- Errors are **syntax** errors (found before running), **runtime** errors (exceptions, with a traceback) or **logic** errors (wrong answers, no message). Read tracebacks from the bottom up.
- By the Church–Turing thesis all general-purpose languages compute the same functions, and some problems, such as the halting problem, are not computable at all.
:::

## Exercises

::: exercise A gcd by hand {level=1 check="18"}
Use [[#alg-euclid]] to compute $\gcd(252, 198)$, writing out the table of $a$, $b$ and $r$. How many iterations of the loop are performed? (Enter the gcd.)
::: solution
| step | $a$ | $b$ | $r$ |
|---|---|---|---|
| 1 | $252$ | $198$ | $54$ |
| 2 | $198$ | $54$ | $36$ |
| 3 | $54$ | $36$ | $18$ |
| 4 | $36$ | $18$ | $0$ |
| end | $18$ | $0$ | — |

Four iterations; $\gcd(252, 198) = 18$. Check: $252 = 18 \cdot 14$, $198 = 18 \cdot 11$, and $\gcd(14, 11) = 1$.
:::
:::

::: exercise Classify the error {level=1}
For each situation say whether it is a syntax error, a runtime error or a logic error.

1. A program to convert Celsius to Fahrenheit uses `f = c * 9 / 5 - 32`.
2. A program contains the line `while x < 10` with no colon at the end.
3. A program asks for the 10th item of a list that has only 3 items, and stops with a traceback.
4. A program to count down from 10 to 1 prints the numbers from 10 to 0.
::: solution
1. Logic error: the formula should be `c * 9 / 5 + 32`; the program runs but gives wrong answers (for $c = 100$ it gives $148$ instead of $212$).
2. Syntax error: a `while` header must end with `:`; Python reports it before running anything.
3. Runtime error: the operation cannot be performed, so Python raises an exception (`IndexError`).
4. Logic error: an "off-by-one" mistake in the loop condition, the most common bug of all; nothing is reported.
:::
:::

::: exercise Doubling at 10% {level=1 check="8"}
In `doubling.py`, how many years are needed if `rate = 0.10` but the starting balance is £1,500 and the target is £3,000? (Enter the number of years.)
::: solution
The loop condition compares the balance with the target, and both have been multiplied by $1.5$, so the number of years is the same as for £1,000 and £2,000: we need the least $n$ with $1.1^n \ge 2$. From the table in [[#ex-doubling]], $1.1^7 \approx 1.949 < 2$ and $1.1^8 \approx 2.144 \ge 2$, so the answer is $8$. (Floating-point rounding could matter only if some $1.1^n$ were extremely close to $2$; none is.)
:::
:::

::: exercise A trace table {level=2 check="13"}
Trace this program, recording `i`, `a` and `b` after each pass through the loop, and give the final value printed.

```python
a, b = 0, 1
i = 0
while i < 6:
    a, b = b, a + b
    i = i + 1
print(b)
```

(Enter the printed value.)
::: solution
| after pass | `i` | `a` | `b` |
|---|---|---|---|
| start | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 |
| 2 | 2 | 1 | 2 |
| 3 | 3 | 2 | 3 |
| 4 | 4 | 3 | 5 |
| 5 | 5 | 5 | 8 |
| 6 | 6 | 8 | 13 |

After the sixth pass `i < 6` is false, so the program prints `13`. The pairs $(a, b)$ are consecutive **Fibonacci numbers** $0, 1, 1, 2, 3, 5, 8, 13, \dots$, each the sum of the previous two; we meet them again in [[programming-1/recursion]].
:::
:::

::: exercise Compiler or interpreter? {level=2}
Explain why a syntax error on line 50 of a Python file prevents line 1 from running, while a `ZeroDivisionError` on line 50 does not prevent lines 1–49 from running. What does this tell you about how CPython processes a file?
::: solution
CPython first parses and compiles the *whole* file into bytecode. If any part of the file is not well-formed, compilation fails and there is no bytecode to run, so nothing runs — not even line 1. A division by zero, in contrast, is a property of the values at the moment the operation is executed: the file compiles successfully, the virtual machine executes lines 1–49 one after another (producing any output they produce), and the exception is raised only when line 50 is reached. So CPython processes a file in two phases: translation of the whole file, then execution.
:::
:::

::: exercise What does this loop compute? {level=2}
State, in one sentence, what this program prints for a positive integer `n`, and justify your answer with a trace for `n = 1234`.

```python
n = 1234
count = 0
while n > 0:
    n = n // 10
    count = count + 1
print(count)
```
::: solution
It prints the number of decimal digits of `n`. Floor division by $10$ removes the last digit: the values of `n` are $1234, 123, 12, 1, 0$, and `count` goes $0, 1, 2, 3, 4$. When `n` reaches $0$ the loop stops, having run once per digit, so the program prints `4`. The loop terminates for every positive `n` because `n` is a non-negative integer that strictly decreases on every pass.
:::
:::

::: exercise Euclid halves the numbers {#exr-euclid-halving level=3}
Let $a \ge b > 0$ be integers.

1. Prove that $a \bmod b < a/2$.
2. Deduce that after every two iterations of [[#alg-euclid]] the value of $a$ is less than half of what it was, and hence that for $a \ge b > 0$ the number of iterations $N$ satisfies $N \le 2\log_2 a + 2$.
::: hint
For part 1 consider separately the cases $b \le a/2$ and $b > a/2$.
:::
::: solution
1. If $b \le a/2$, then $a \bmod b < b \le a/2$. If $b > a/2$, then $a < 2b$, so the quotient of $a$ by $b$ is $1$ and $a \bmod b = a - b < a - a/2 = a/2$. In both cases $a \bmod b < a/2$.
2. Write the successive pairs as $(a_0, b_0), (a_1, b_1), (a_2, b_2), \dots$, where $(a_{k+1}, b_{k+1}) = (b_k, a_k \bmod b_k)$, so that $a_{k+2} = b_{k+1} = a_k \bmod b_k$. At the start $a_0 \ge b_0 > 0$ by assumption, and after every iteration $a_k > b_k$ (a remainder is smaller than the divisor), so part 1 applies to every pair with $b_k > 0$ and gives $a_{k+2} < a_k/2$: every two iterations at least halve $a$. Suppose the loop performs $N$ iterations and let $j = \lfloor (N-1)/2 \rfloor$. The pair $(a_{2j}, b_{2j})$ is reached with the loop still running, so $a_{2j} \ge 1$, while halving $j$ times gives $a_{2j} \le a/2^j$. Hence $2^j \le a$, that is $j \le \log_2 a$, and since $j \ge (N-2)/2$ we get $N \le 2\log_2 a + 2$. The number of steps therefore grows with the number of digits of $a$, not with $a$ itself: for $a$ around $10^{100}$ the bound is about $666$ iterations.
:::
:::

::: exercise The slowest case {level=3 check="9"}
How many iterations does [[#alg-euclid]] perform on $a = 89$, $b = 55$? Explain why consecutive Fibonacci numbers make the algorithm take many steps. (Enter the number of iterations.)
::: solution
The pairs are $(89, 55) \to (55, 34) \to (34, 21) \to (21, 13) \to (13, 8) \to (8, 5) \to (5, 3) \to (3, 2) \to (2, 1) \to (1, 0)$: nine iterations, and the gcd is $1$. For consecutive Fibonacci numbers $F_{k+1} = F_k + F_{k-1}$, so $F_{k+1} \bmod F_k = F_{k-1}$ with quotient $1$: each step moves back only one place in the Fibonacci sequence, the smallest possible progress. Gabriel Lamé proved in 1844 that this is the worst case: if Euclid's algorithm takes $N$ steps on $a > b > 0$, then $b \ge F_{N+1}$, from which it follows that the number of steps is at most five times the number of decimal digits of $b$.
:::
:::

::: exercise Your first programs {level=2}
Write a Python program that starts with `population = 7000` and `growth = 0.02` and prints the number of whole years until the population exceeds $10{,}000$, together with the population in that year rounded to the nearest whole number. Before running it, estimate the answer using $\ln(10/7)/\ln 1.02$.
::: solution
```python
population = 7000.0
growth = 0.02
years = 0
while population <= 10000:
    population = population * (1 + growth)
    years = years + 1
print(years, round(population))
```

```console
$ python3 population.py
19 10198
```

The estimate is $\ln(10/7)/\ln 1.02 \approx 0.3567/0.0198 \approx 18.01$, so the population first exceeds $10{,}000$ in year $19$, which the program confirms. Note the condition `<=`: "exceeds" means strictly greater than, so the loop must continue while the population is at most $10{,}000$.
:::
:::
