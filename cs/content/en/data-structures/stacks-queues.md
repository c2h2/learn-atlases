Your text editor's *undo* command takes back the most recent change, then the one before it, and so on: the last change made is the first undone. A printer, on the other hand, prints documents in the order they were sent: the first job submitted is the first printed. These two disciplines — **last in, first out** and **first in, first out** — appear everywhere in computing: in the way a processor keeps track of function calls, in compilers and calculators that evaluate expressions, in operating-system schedulers and network routers, and in the search algorithms of [[algorithms]].

The structures that implement them, **stacks** and **queues**, are the simplest data structures there are. They are worth a chapter for two reasons. They are the first examples of an **abstract data type** — a structure defined by what its operations do rather than by how it stores data — and the habit of separating the two is the most important design idea in this course. And both have clean implementations on top of the arrays and linked lists of [[data-structures/arrays-lists]], with every operation in $O(1)$ time, whose details (circular buffers, amortised resizing, two-stack queues) are instructive in themselves. Along the way we use a stack to check brackets, to evaluate arithmetic expressions and to translate them into a form a machine can evaluate.

## Abstract data types

::: definition Abstract data type {#def-adt}
An **abstract data type** (ADT) is a collection of values together with a set of operations on them, specified only by their behaviour — what each operation returns and how it changes the value — and not by any particular representation in memory. A **data structure** is a concrete representation of an ADT, together with algorithms implementing its operations.
:::

A program that uses an ADT only through its operations does not care how it is implemented, so the implementation can be changed — for a faster one, or one that uses less memory — without touching the rest of the program. In Python an ADT is usually a class whose methods are the operations; in Java an `interface`; in C a header file of function declarations. The specification should also state the cost of each operation, because a user's program depends on it: a queue whose `dequeue` takes $\Theta(n)$ time is correct but not acceptable.

::: definition Stack {#def-stack}
A **stack** holds a sequence of items, one end of which is called the **top**. Its operations are:

- `push(x)`: add $x$ at the top;
- `pop()`: remove and return the item at the top (an error if the stack is empty);
- `peek()` (or `top()`): return the item at the top without removing it;
- `is_empty()`: whether the stack has no items; often also `size()`.

Items leave in the reverse of the order in which they arrived: the stack is **last in, first out** (LIFO).
:::

The behaviour can be stated as equations that any implementation must satisfy: for every stack $S$ and item $x$, `pop` applied to `push(x)` on $S$ returns $x$ and leaves $S$; `peek` after `push(x)` returns $x$; a new stack is empty, and `push(x)` makes it non-empty. These **axioms** pin the ADT down completely without mentioning memory.

## Implementing a stack

**On a dynamic array.** Keep the items in a dynamic array with the top at the *end*. Then `push` is an append and `pop` removes the last element: both $O(1)$ amortised by [[data-structures/arrays-lists#thm-doubling]] (with shrinking at one-quarter full if memory must be returned). `peek` and `is_empty` are $O(1)$. In Python the built-in `list` is exactly this: `append`, `pop()` and `a[-1]`.

Putting the top at the *front* of the array would be a mistake: every push and pop would shift all the other items, costing $\Theta(n)$ each ([[data-structures/arrays-lists#prop-array-insert]]).

**On a singly linked list.** Keep the top at the head. `push(x)` creates a node pointing to the old head; `pop()` moves the head to the next node. Both are $O(1)$ in the worst case — not merely amortised — at the price of one node allocation per push and a reference per item.

| | dynamic array | linked list |
|---|---|---|
| `push`, `pop` | $O(1)$ amortised, $\Theta(n)$ worst case for one call | $O(1)$ worst case |
| memory per item | one slot, plus unused capacity (at most a factor of 2) | one node: item plus a reference, plus allocator overhead |
| locality | contiguous, cache-friendly | nodes scattered in memory |

In practice the array version is usually faster, and it is what Python, Java (`ArrayDeque`) and C++ (`std::stack` over `std::vector` or `std::deque`) provide. The linked version is preferred when a hard bound on every single operation is needed, or when many stacks share nodes (an immutable linked stack can be extended by several owners without copying, which functional languages use heavily).

### The call stack

The most important stack in computing is invisible. When a function is called, the machine pushes a **stack frame** holding its parameters, local variables and the address to return to; when it returns, the frame is popped and execution resumes at the saved address. Because calls finish in the reverse order in which they started, a stack is exactly right, and recursive functions ([[programming-1/recursion]]) need nothing more: each recursive call simply pushes another frame. Each active call costs one frame, so a recursion of depth $d$ needs $\Theta(d)$ stack space. CPython limits the depth (the default limit is $1000$ frames, adjustable with `sys.setrecursionlimit`) and raises `RecursionError` beyond it; C programs that recurse too deeply crash with a **stack overflow**.

## Applications of stacks

### Matching brackets

A compiler must check that the brackets in a program are properly matched: `a[i] = (b + c) * {d}` is fine, but `f(x[0)]` is not, because the `(` is closed by `]`. Formally:

::: definition Balanced string {#def-balanced}
Consider strings over an alphabet containing the openers `(`, `[`, `{`, their matching closers `)`, `]`, `}`, and other characters, which we ignore. The **balanced** strings are defined inductively: the empty string is balanced, a string with no brackets is balanced, and if $u$ and $v$ are balanced then so are `(`$u$`)`$v$, `[`$u$`]`$v$ and `{`$u$`}`$v$.
:::

The algorithm reads the string from left to right, pushing each opener; each closer must match the opener on top of the stack, which it pops.

::: algorithm Bracket matching {#alg-brackets}
1. Create an empty stack $S$.
2. For each character $c$ of the input, from left to right:
   1. If $c$ is an opener, push $c$.
   2. If $c$ is a closer: if $S$ is empty or `pop()` does not return the opener matching $c$, **reject**.
3. **Accept** if $S$ is empty; otherwise reject.
:::

```python
PAIRS = {")": "(", "]": "[", "}": "{"}

def balanced(text):
    stack = []
    for ch in text:
        if ch in "([{":
            stack.append(ch)                 # push an opener
        elif ch in PAIRS:
            if not stack or stack.pop() != PAIRS[ch]:
                return False                 # closer with no matching opener
    return not stack                         # every opener must be closed

for s in ["a[i] = (b + c) * {d}", "f(x[0)]", "((", "())", ""]:
    print(repr(s), balanced(s))
```

```console
$ python3 brackets.py
'a[i] = (b + c) * {d}' True
'f(x[0)]' False
'((' False
'())' False
'' True
```

::: example Tracing bracket matching {#ex-bracket-trace}
Trace [[#alg-brackets]] on `{[()()]}` and on `f(x[0)]`, showing the stack (bottom on the left) after each bracket.
::: solution
For `{[()()]}`:

| bracket | `{` | `[` | `(` | `)` | `(` | `)` | `]` | `}` |
|---|---|---|---|---|---|---|---|---|
| action | push | push | push | pop `(` ✓ | push | pop `(` ✓ | pop `[` ✓ | pop `{` ✓ |
| stack after | `{` | `{ [` | `{ [ (` | `{ [` | `{ [ (` | `{ [` | `{` | (empty) |

Every closer finds its own opener on top, and the stack ends empty: accept.

For `f(x[0)]` the non-bracket characters are skipped. `(` is pushed, then `[`, giving `( [`. The closer `)` pops `[`, which is not its partner `(`, so the algorithm rejects at once. The string has the right *number* of each kind of bracket — counting alone would accept it — but the order is wrong, and only the stack notices: the most recently opened bracket must be the first one closed.
:::
:::

::: theorem Bracket matching is correct {#thm-brackets}
[[#alg-brackets]] accepts a string $s$ if and only if $s$ is balanced. It runs in $\Theta(n)$ time and uses $O(n)$ space for a string of length $n$.
:::

::: proof
Write "processing $s$ from stack $S$" for running step 2 on $s$ starting with the stack $S$ instead of an empty one.

*($\Leftarrow$)* We prove the stronger claim: *if $s$ is balanced, processing $s$ from any stack $S$ never rejects and ends with the stack equal to $S$.* We use induction on the inductive definition. For the empty string and bracket-free strings nothing is pushed or popped. For $s =$ `(`$u$`)`$v$ with $u$, $v$ balanced: the `(` is pushed, giving $S$ with `(` on top; by the induction hypothesis processing $u$ never rejects and returns to that stack; the `)` then pops the matching `(`, leaving $S$; and processing $v$ returns to $S$ again. The cases for `[` and `{` are the same. Taking $S$ empty, step 3 accepts.

*($\Rightarrow$)* By strong induction on the length of $s$, we show: *if processing $s$ from the empty stack never rejects and ends empty, then $s$ is balanced.* If $s$ contains no brackets it is balanced. Otherwise let $c$ be its first bracket and write $s = w c t$ with $w$ bracket-free. $c$ cannot be a closer, since the stack is empty when it is read. So $c$ is an opener, and after reading it the stack has height $1$. Each later bracket changes the height by exactly one and the final height is $0$, so there is a first closer $c'$ after which the height is $0$ again; write $t = u c' v$. This closer pops $c$ itself (the bottom item), so $c'$ matches $c$ (we did not reject). Throughout $u$ the height stays $\ge 1$, so $u$ never pops $c$; processing $u$ from the empty stack therefore behaves identically one level lower — it never pops from an empty stack and never mismatches — and ends empty. By the induction hypothesis $u$ is balanced. After $c'$ the stack is empty, and processing $v$ never rejects and ends empty, so $v$ is balanced too. Hence $c\,u\,c'\,v$ is balanced by the definition, and so is $s$, since the bracket-free prefix $w$ does not affect balance (the definition ignores non-bracket characters).

*Cost.* Each character is examined once and causes at most one push or pop, each $O(1)$ amortised, so the total is $\Theta(n)$. The stack never holds more than $n$ items.
:::

### Evaluating expressions in postfix

We write arithmetic in **infix** notation, with each operator between its operands: $5 + (1 + 2)\times 4 - 3$. Infix needs precedence rules and parentheses to be unambiguous. In **postfix** notation (also called **reverse Polish notation**) each operator follows its two operands, and no parentheses or precedence rules are needed at all: the expression above becomes `5 1 2 + 4 * + 3 -`. Postfix is evaluated with a stack of values: push each number; on an operator, pop the right operand, then the left, and push the result.

```python
import operator
OPS = {"+": operator.add, "-": operator.sub, "*": operator.mul, "/": operator.truediv}

def eval_postfix(tokens):
    stack = []
    for t in tokens:
        if t in OPS:
            right = stack.pop()              # the right operand is on top
            left = stack.pop()
            stack.append(OPS[t](left, right))
        else:
            stack.append(float(t))
        print(f"{t:>2}  stack = {stack}")
    (result,) = stack                        # exactly one value must remain
    return result

print(eval_postfix("5 1 2 + 4 * + 3 -".split()))
```

::: example Evaluating a postfix expression {#ex-postfix}
Trace the evaluation of `5 1 2 + 4 * + 3 -`.
::: solution
The program prints the stack after each token (bottom on the left):

```console
$ python3 postfix.py
 5  stack = [5.0]
 1  stack = [5.0, 1.0]
 2  stack = [5.0, 1.0, 2.0]
 +  stack = [5.0, 3.0]
 4  stack = [5.0, 3.0, 4.0]
 *  stack = [5.0, 12.0]
 +  stack = [17.0]
 3  stack = [17.0, 3.0]
 -  stack = [14.0]
14.0
```

At `+` the top two values $1, 2$ are replaced by $3$; at `*`, $3$ and $4$ by $12$; then $5 + 12 = 17$ and $17 - 3 = 14$, which is $5 + (1+2)\times 4 - 3$. Order matters for `-` and `/`: the value popped first is the *right* operand. An input such as `1 +` makes `pop` fail on an empty stack, and `1 2` leaves two values, which the line `(result,) = stack` rejects — both are malformed postfix expressions.
:::
:::

The same idea, with instructions in place of numbers, is how the **Java virtual machine** and CPython's interpreter work: they are **stack machines**, and compilers translate expressions into postfix-like sequences of instructions such as "push 5, push 1, push 2, add, …".

### Translating infix to postfix

How do we get from infix to postfix? Edsger Dijkstra's **shunting-yard algorithm** uses a stack of *operators* (and opening parentheses). Operands go straight to the output; an operator waits on the stack until an operator of lower precedence, a closing parenthesis or the end of the input shows that its right operand is complete.

::: algorithm Shunting-yard (for left-associative binary operators) {#alg-shunting}
Each operator has a precedence: $1$ for $+$ and $-$, $2$ for $\times$ and $/$. Read the tokens from left to right.

1. An **operand** is appended to the output.
2. An **operator** $o$: while the top of the stack is an operator of precedence $\ge$ that of $o$, pop it to the output. Then push $o$.
3. A `(` is pushed.
4. A `)`: pop operators to the output until the top is `(`; pop and discard the `(`.
5. At the end, pop all remaining operators to the output.
:::

The test "$\ge$" in step 2 makes equal-precedence operators associate to the left: in `8 - 3 - 2` the first `-` is output before the second is pushed, giving `8 3 - 2 -`, which means $(8-3)-2$. (A right-associative operator such as exponentiation uses "$>$" instead.)

```python
PREC = {"+": 1, "-": 1, "*": 2, "/": 2}     # all four are left-associative

def to_postfix(tokens):
    out, ops = [], []                        # ops is the operator stack
    for t in tokens:
        if t in PREC:
            # pop operators that bind at least as tightly as t
            while ops and ops[-1] != "(" and PREC[ops[-1]] >= PREC[t]:
                out.append(ops.pop())
            ops.append(t)
        elif t == "(":
            ops.append(t)
        elif t == ")":
            while ops[-1] != "(":
                out.append(ops.pop())
            ops.pop()                        # discard the "("
        else:
            out.append(t)                    # operands go straight to the output
    while ops:
        out.append(ops.pop())
    return out

for e in ["5 + ( 1 + 2 ) * 4 - 3", "8 - 3 - 2", "2 * ( 3 + 4 ) * 5"]:
    print(e, " => ", " ".join(to_postfix(e.split())))
```

```console
$ python3 shunting.py
5 + ( 1 + 2 ) * 4 - 3  =>  5 1 2 + 4 * + 3 -
8 - 3 - 2  =>  8 3 - 2 -
2 * ( 3 + 4 ) * 5  =>  2 3 4 + * 5 *
```

::: example A shunting-yard trace {#ex-shunting}
Convert `8 / ( 4 - 2 ) * 3` to postfix, showing the output and the operator stack (bottom on the left) after each token, and evaluate the result.
::: solution
| token | output | stack |
|---|---|---|
| `8` | 8 | |
| `/` | 8 | / |
| `(` | 8 | / ( |
| `4` | 8 4 | / ( |
| `-` | 8 4 | / ( - |
| `2` | 8 4 2 | / ( - |
| `)` | 8 4 2 - | / |
| `*` | 8 4 2 - / | * |
| `3` | 8 4 2 - / 3 | * |
| end | 8 4 2 - / 3 * | |

At `-` the top of the stack is `(`, so nothing is popped. At `)` the `-` is popped and the `(` discarded. At `*` the `/` on top has the same precedence, so it is popped first — that is left associativity: $(8/(4-2))\times 3$. Evaluating `8 4 2 - / 3 *` gives $4 - 2 = 2$, $8/2 = 4$, $4 \times 3 = 12$, matching Python's `8/(4-2)*3 == 12.0`. Each token is pushed and popped at most once, so the conversion takes $\Theta(n)$ time for $n$ tokens.
:::
:::

::: quiz
What is the value of the postfix expression `6 2 3 * - 4 2 / +`?
- [ ] $14$
- [x] $2$
- [ ] $-2$
- [ ] It is malformed.
::: solution
Push $6, 2, 3$; `*` replaces $2, 3$ by $6$, leaving $6, 6$; `-` gives $6 - 6 = 0$. Push $4, 2$; `/` gives $2$, leaving $0, 2$; `+` gives $2$. The infix form is $6 - 2\times3 + 4/2 = 2$.
:::
:::

## Queues

::: definition Queue {#def-queue}
A **queue** holds a sequence of items with a **front** and a **back**. Its operations are `enqueue(x)` (add $x$ at the back), `dequeue()` (remove and return the front item; an error if empty), `peek()` (return the front item) and `is_empty()`. Items leave in the order in which they arrived: the queue is **first in, first out** (FIFO).
:::

Queues model anything that waits its turn: processes ready to run, packets waiting for a link, requests to a web server, keystrokes not yet handled. In algorithms, the queue is what makes breadth-first search explore a graph in order of distance from the start.

::: widget graph
nodes: A@0,1; B@1,2; C@1,0; D@2,2; E@2,1; F@2,0; G@3,1
edges: A-B; A-C; B-D; B-E; C-E; C-F; E-G; F-G
algorithm: bfs
start: A
caption: Breadth-first search keeps the discovered but unexplored vertices in a **queue**. Step through it and watch the queue under the figure: vertices are added at the back as they are discovered and taken from the front, so all vertices at distance 1 from A are explored before any at distance 2. Change the algorithm to `dfs` in your head — the next figure does it — and the queue becomes a stack.
:::

**On a linked list.** Dequeue at the head and enqueue at the tail. With a reference to the last node as well as the first, both operations are $O(1)$ in the worst case: enqueue links a new node after the tail and moves the tail reference; dequeue moves the head reference. (Enqueuing at the head and dequeuing at the tail would fail: removing the last node of a singly linked list needs its predecessor.)

**On an array, naively.** Appending at the end and removing from the front with `pop(0)` costs $\Theta(n)$ per dequeue, because every remaining item shifts left. Avoiding the shift by just remembering where the front is leaves dead space at the start of the array that is never reused.

**On a circular array.** The fix is to treat the array as a ring. Keep an array $a$ of capacity $C$, the index `head` of the front item and the number $n$ of items. The items occupy positions `head`, `head+1`, …, `head+n-1`, all taken modulo $C$, so the queue can wrap round from the end of the array to its start. Enqueue writes at position $(\mathit{head} + n) \bmod C$; dequeue reads position $\mathit{head}$ and advances it to $(\mathit{head} + 1) \bmod C$. When the array is full, copy the items in queue order into an array of twice the capacity — the resizing argument of [[data-structures/arrays-lists#thm-doubling]] makes this $O(1)$ amortised.

```python
class RingQueue:
    """FIFO queue in a circular array; doubles its capacity when full."""
    def __init__(self, capacity=4):
        self.a = [None] * capacity
        self.head = 0                        # index of the front element
        self.n = 0                           # number of elements

    def enqueue(self, x):
        if self.n == len(self.a):
            self._grow()
        self.a[(self.head + self.n) % len(self.a)] = x
        self.n += 1

    def dequeue(self):
        if self.n == 0:
            raise IndexError("dequeue from empty queue")
        x = self.a[self.head]
        self.a[self.head] = None             # drop the reference
        self.head = (self.head + 1) % len(self.a)
        self.n -= 1
        return x

    def _grow(self):                         # unroll the ring into a bigger array
        old, cap = self.a, len(self.a)
        self.a = [old[(self.head + i) % cap] for i in range(self.n)] + [None] * cap
        self.head = 0
```

::: example A circular buffer wrapping round {#ex-ring}
Starting from an empty `RingQueue` of capacity $4$, enqueue `a`, `b`, `c`, dequeue twice, enqueue `d`, `e`, `f`, then enqueue `g`. Give the array, `head` and $n$ after `f` and after `g`.
::: solution
After `a, b, c` the array is `[a, b, c, None]` with head $0$ and $n = 3$. The two dequeues return `a` and `b`, leaving `[None, None, c, None]`, head $2$, $n = 1$. Then `d` goes to $(2 + 1) \bmod 4 = 3$, `e` to $(2 + 2) \bmod 4 = 0$ and `f` to $(2+3) \bmod 4 = 1$: the queue has wrapped round. Enqueuing `g` finds $n = 4 = C$, so `_grow` copies the items in queue order — starting from `head` — into a new array of capacity $8$. Running the class confirms it:

```python
q = RingQueue()
for x in "abc":
    q.enqueue(x)
print(q.dequeue(), q.dequeue())              # a b
for x in "def":
    q.enqueue(x)                             # e and f wrap round to the start
print(q.a, q.head, q.n)
q.enqueue("g")                               # full: grows to capacity 8
print(q.a, q.head, q.n)
print([q.dequeue() for _ in range(q.n)])
```

```console
$ python3 ring.py
a b
['e', 'f', 'c', 'd'] 2 4
['c', 'd', 'e', 'f', 'g', None, None, None] 0 5
['c', 'd', 'e', 'f', 'g']
```

The array `['e', 'f', 'c', 'd']` with head $2$ represents the queue `c, d, e, f`: physical order and queue order differ, and only `head` connects them. That is why `_grow` cannot simply copy the old array to the start of the new one.
:::
:::

::: warning Do not use a Python list as a queue
`queue.pop(0)` on a `list` shifts every remaining element, so a loop that processes $n$ items this way takes $\Theta(n^2)$ time. The error is common in breadth-first search code and invisible on small tests. Use `collections.deque`, whose `append` and `popleft` are $O(1)$, or `queue.Queue` when several threads share the queue.
:::

### A queue from two stacks

A queue can also be built from two stacks, an idea that matters in functional programming, where immutable stacks (linked lists) are the basic structure. Keep an `inbox` stack for arriving items and an `outbox` stack for leaving ones. Enqueue pushes onto the inbox. Dequeue pops from the outbox; if the outbox is empty, first pop every item of the inbox and push it onto the outbox, which reverses their order so that the oldest item ends on top.

```python
class TwoStackQueue:
    def __init__(self):
        self.inbox, self.outbox = [], []     # two stacks (Python lists)
        self.moves = 0                       # elements moved inbox -> outbox

    def enqueue(self, x):
        self.inbox.append(x)

    def dequeue(self):
        if not self.outbox:                  # refill only when empty
            while self.inbox:
                self.outbox.append(self.inbox.pop())
                self.moves += 1
        return self.outbox.pop()

q = TwoStackQueue()
out = []
for x in range(1, 6):
    q.enqueue(x)
out.append(q.dequeue())
out.append(q.dequeue())
for x in range(6, 9):
    q.enqueue(x)
while q.inbox or q.outbox:
    out.append(q.dequeue())
print(out, "moves:", q.moves)
```

```console
$ python3 twostack.py
[1, 2, 3, 4, 5, 6, 7, 8] moves: 8
```

The first dequeue moves $5$ items at once — a single operation costing $\Theta(n)$ — yet eight items cost only eight moves in total.

::: theorem Two-stack queue {#thm-two-stack}
The two-stack queue returns items in FIFO order, and any sequence of $m$ enqueue and dequeue operations starting from an empty queue performs at most $3m$ stack operations (pushes and pops). Each queue operation therefore takes $O(1)$ amortised time (assuming $O(1)$ stack operations).
:::

::: proof
*Order.* Invariant: the queue's contents, front to back, are the outbox from top to bottom followed by the inbox from bottom to top. Initially both are empty. Enqueue pushes onto the inbox, appending at the back. A dequeue with a non-empty outbox pops its top, the front of the queue. A dequeue with an empty outbox first moves the inbox onto the outbox: the inbox's bottom item (the oldest) ends on top, so the outbox top to bottom lists the items oldest first, as the invariant requires; then the pop returns the front.

*Cost.* Follow one item. It is pushed onto the inbox once (by its enqueue), popped from the inbox and pushed onto the outbox at most once (the outbox is refilled only when empty, and items never go back), and popped from the outbox at most once. That is at most $4$ stack operations per item, but counting per operation is tighter: charge each enqueue $3$ — its own push plus a pre-payment of the later inbox pop and outbox push — and each dequeue $1$ for its outbox pop. The pre-payments cover every move, so the total actual cost is at most $3 \times (\text{enqueues}) + 1 \times (\text{dequeues}) \le 3m$.
:::

## Deques

::: definition Deque {#def-deque}
A **double-ended queue** or **deque** (pronounced "deck") allows insertion and removal at both ends: `push_front`, `push_back`, `pop_front`, `pop_back`, and `peek` at either end.
:::

A deque generalises both a stack (use one end only) and a queue (insert at one end, remove at the other). A circular array implements it with every operation in $O(1)$ amortised time — `push_front` decrements `head` modulo $C$ — and so does a doubly linked list in $O(1)$ worst-case time ([[data-structures/arrays-lists]]). Python's `collections.deque` is a doubly linked list of fixed-size blocks of item references, combining $O(1)$ operations at both ends with better locality than one node per item; indexing into the middle of it is $O(n)$. Its `maxlen` option turns it into a bounded buffer that discards from the other end when full, handy for keeping "the last $k$ items":

```python
from collections import deque

d = deque([2, 3])
d.appendleft(1)
d.append(4)
print(d)
print(d.popleft(), d.pop())
recent = deque(maxlen=3)
for x in range(6):
    recent.append(x)          # once full, each append drops the oldest item
print(recent)
```

```console
$ python3 deques.py
deque([1, 2, 3, 4])
1 4
deque([3, 4, 5], maxlen=3)
```

::: widget graph
nodes: A@0,1; B@1,2; C@1,0; D@2,2; E@2,1; F@2,0; G@3,1
edges: A-B; A-C; B-D; B-E; C-E; C-F; E-G; F-G
algorithm: dfs
start: A
caption: The same graph explored by depth-first search, which keeps its path in a **stack** (shown bottom to top under the figure). The search always continues from the most recently discovered vertex and backs up — pops — only when that vertex has no unexplored neighbours. Compare the order of discovery with the breadth-first search above: the only difference between the two algorithms is a stack in place of a queue.
:::

::: quiz
Which structure supports all of these in $O(1)$ amortised time: add at the back, remove from the front, remove from the back?
- [ ] A stack implemented on a dynamic array
- [ ] A singly linked list with head and tail references
- [x] A deque on a circular array
- [ ] A queue on a dynamic array using `pop(0)`
::: solution
A deque on a circular array does all three. A stack cannot remove from the "front" (bottom) cheaply. A singly linked list with a tail reference can add at the back and remove at the front in $O(1)$, but removing the last node requires its predecessor, a $\Theta(n)$ walk. `pop(0)` on a dynamic array is $\Theta(n)$.
:::
:::

::: history
Stacks were invented several times over. Alan Turing's design for the ACE computer (1946) used a stack of return addresses for subroutines, with operations he called BURY and UNBURY. Friedrich L. Bauer and Klaus Samelson described the "cellar principle" (*Kellerprinzip*) for translating and evaluating formulas — filing a German patent in 1957 and publishing "Sequential formula translation" in *Communications of the ACM* in 1960 — and the stack became the basis of the ALGOL 60 compilers. Jan Łukasiewicz had introduced parenthesis-free prefix ("Polish") notation for logic in the 1920s; Charles Hamblin proposed the reversed, postfix form for computers in 1957, and it later appeared in stack-based machines and in Hewlett-Packard's calculators from 1968 onwards. Edsger Dijkstra described the shunting-yard algorithm in a 1961 report from the Mathematisch Centrum in Amsterdam on his ALGOL 60 compiler.
:::

## Where this leads

Stacks and queues are the engines of graph search: breadth-first search with a queue and depth-first search with a stack, both in [[algorithms]], shown above on a small graph and analysed using the representations of [[data-structures/graph-representations]]. Tree traversals in [[data-structures/trees]] use a stack (for pre-, in- and post-order without recursion) or a queue (for level order). A **priority queue**, in which the item removed is the one of highest priority rather than the oldest, needs a cleverer structure — the heap of [[data-structures/heaps]]. Parsing expressions, which the shunting-yard algorithm began, is developed fully in [[compilers]], and the call stack is examined in [[computer-systems]].

::: summary
- An **abstract data type** ([[#def-adt]]) specifies operations and their behaviour (and cost); a data structure implements it. Code that uses only the operations survives a change of implementation.
- A **stack** ([[#def-stack]]) is LIFO; on a dynamic array (top at the end) push and pop are $O(1)$ amortised, on a linked list (top at the head) $O(1)$ worst case.
- Stack applications: the call stack, bracket matching ([[#thm-brackets]]), postfix evaluation and the shunting-yard translation from infix ([[#alg-shunting]]), all in linear time.
- A **queue** ([[#def-queue]]) is FIFO; implement it with a linked list with a tail reference, or a **circular array** indexed modulo the capacity — never with `list.pop(0)`.
- Two stacks make a queue with $O(1)$ amortised operations ([[#thm-two-stack]]), because each item moves between the stacks at most once.
- A **deque** ([[#def-deque]]) allows both ends; Python's `collections.deque` provides it.
- Breadth-first search uses a queue and depth-first search a stack.
:::

## Exercises

::: exercise Stack trace {level=1}
Starting from an empty stack, perform `push(1)`, `push(2)`, `pop()`, `push(3)`, `push(4)`, `pop()`, `pop()`, `push(5)`. What values are popped, in order, and what is left on the stack (bottom to top)?
::: solution
After `push(1), push(2)` the stack is $[1, 2]$; `pop()` returns $2$. Then $[1, 3, 4]$; two pops return $4$ and $3$. Finally `push(5)` gives $[1, 5]$. Popped values: $2, 4, 3$; remaining stack $[1, 5]$.
:::
:::

::: exercise Evaluating postfix {level=1 check="22"}
Evaluate the postfix expression `2 3 4 * + 5 3 - 4 * +`. (Enter the value.)
::: solution
Push $2, 3, 4$; `*` gives $[2, 12]$ and `+` gives $[14]$. Then `5 3 -` gives $[14, 2]$, `4 *` gives $[14, 8]$, and the final `+` gives $[22]$. The value is $22$, the postfix form of $2 + 3\times 4 + (5 - 3)\times 4$.
:::
:::

::: exercise Circular indices {level=1 check="2"}
A circular-array queue has capacity $8$, `head` $= 6$ and $n = 3$ items. At which index will the next enqueued item be stored? (Enter the index.)
::: solution
The items occupy positions $6, 7, 0$; the next free position is $(\mathit{head} + n) \bmod C = (6 + 3) \bmod 8 = 1$.
:::
:::

::: exercise Infix to postfix {level=2}
Convert `( 1 + 2 ) * ( 3 - 4 / 2 ) - 5` to postfix with [[#alg-shunting]], showing the operator stack at each operator or parenthesis, and evaluate the result.
::: solution
Tokens and the stack after each (bottom on the left): `(`: `(`; `1` → output 1; `+`: `( +`; `2` → 1 2; `)`: pop `+`, output `1 2 +`, stack empty; `*`: `*`; `(`: `* (`; `3` → `1 2 + 3`; `-`: `* ( -`; `4`; `/`: top is `-` of lower precedence, so push: `* ( - /`; `2` → `1 2 + 3 4 2`; `)`: pop `/`, `-`, discard `(`: output `1 2 + 3 4 2 / -`, stack `*`; `-`: the `*` has higher precedence, pop it: output `… - *`, stack `-`; `5`; end: pop `-`.

Postfix: `1 2 + 3 4 2 / - * 5 -`. Value: $(1+2)\times(3 - 4/2) - 5 = 3 \times 1 - 5 = -2$.
:::
:::

::: exercise Stack-sortable sequences {level=2}
Items $1, 2, \dots, n$ arrive in that order. Each can be pushed onto a stack, and at any time the top can be popped to the output. Show that the output $3, 1, 2$ (for $n = 3$) is impossible, while $2, 3, 1$ is possible. How many of the $6$ permutations of $1, 2, 3$ can be produced?
::: solution
$2, 3, 1$: push 1, push 2, pop 2, push 3, pop 3, pop 1. For $3, 1, 2$: to output $3$ first, $1$ and $2$ must already be on the stack with $2$ above $1$; after popping $3$ the next pop must give $2$, not $1$. So $3, 1, 2$ is impossible.

Checking all six, only $3, 1, 2$ is impossible: $1,2,3$; $1,3,2$; $2,1,3$; $2,3,1$; $3,2,1$ are all producible. So $5$ permutations can be produced. In general the number is the Catalan number $C_n = \binom{2n}{n}/(n+1)$, which is $5$ for $n = 3$ (see [Maths Atlas: generating functions](/learn/maths/lesson.php?c=discrete&l=generating-functions)); Knuth showed the impossible ones are exactly those containing a pattern $k, i, j$ with $i < j < k$ in that relative order.
:::
:::

::: exercise A stack with minimum {level=2}
Design a stack that supports `push`, `pop` and `min()` (return the smallest item currently on the stack), all in $O(1)$ time. Implement it in Python.
::: solution
Store with each item the minimum of the stack up to and including it. The minimum after a pop is then the stored minimum of the new top.

```python
class MinStack:
    def __init__(self):
        self.items = []                      # pairs (value, min so far)

    def push(self, x):
        m = x if not self.items else min(x, self.items[-1][1])
        self.items.append((x, m))

    def pop(self):
        return self.items.pop()[0]

    def min(self):
        return self.items[-1][1]

s = MinStack()
for x in [5, 3, 7, 2, 8]:
    s.push(x)
print(s.min(), s.pop(), s.pop(), s.min())   # 2 8 2 3
```

Each operation does $O(1)$ work (amortised, because of the underlying list). A plain min-variable would not suffice: after popping the minimum we would need the second smallest, which a single variable does not remember.
:::
:::

::: exercise Worst case of the two-stack queue {level=3}
(a) Give a sequence of $m$ operations on the two-stack queue in which one single dequeue costs $\Theta(m)$. (b) An interactive system needs every queue operation in $O(1)$ worst-case time and has only stacks and constant extra space per operation. Explain why the simple two-stack queue does not provide this, and describe in outline how it could be repaired. (c) Give a potential function that proves [[#thm-two-stack]] by the potential method.
::: solution
(a) Enqueue $m - 1$ items and then dequeue once: the dequeue moves all $m - 1$ items, $\Theta(m)$ stack operations.

(b) The guarantee in [[#thm-two-stack]] is amortised: a single dequeue can move every item. To bound every operation, the transfer must be spread out — start moving the inbox to a fresh outbox gradually, a few items per operation, *before* the current outbox runs empty (a technique called incremental rebuilding or deamortisation; the real-time queue of Hood and Melville, 1981, does this with a constant number of stacks). The details are intricate; the idea is that by doing $O(1)$ extra work on every operation, the new outbox is ready by the time it is needed.

(c) Let $\Phi = 2\lvert\mathit{inbox}\rvert$. Initially $\Phi = 0$ and always $\Phi \ge 0$. Enqueue: actual cost $1$, $\Delta\Phi = 2$, amortised $3$. Dequeue with non-empty outbox: cost $1$, $\Delta\Phi = 0$, amortised $1$. Dequeue that moves $k$ items: cost $2k + 1$ ($k$ pops, $k$ pushes, one final pop), $\Delta\Phi = -2k$, amortised $1$. So the total actual cost is at most the total amortised cost, at most $3m$.
:::
:::

::: exercise Bracket depth {level=3 check="5"}
Modify [[#alg-brackets]] to report the maximum nesting depth of a balanced string — the largest stack size reached — and prove that your modification is correct. What is the maximum depth of `{a[(b)((c[d]))]}`? (Enter the depth.)
::: solution
Keep a variable `depth = max(depth, len(stack))` updated after each push. By the invariant in the proof of [[#thm-brackets]], after reading a prefix the stack holds exactly the openers of that prefix not yet closed, so its size is the number of brackets enclosing the current position; the maximum over all positions is the nesting depth.

For `{a[(b)((c[d]))]}` the stack sizes after each bracket are: `{` 1, `[` 2, `(` 3, `)` 2, `(` 3, `(` 4, `[` 5, `]` 4, `)` 3, `)` 2, `]` 1, `}` 0. The maximum depth is $5$, reached at `d`, which is enclosed by `{ [ ( ( [`.
:::
:::
