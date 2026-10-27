A music player keeps a playlist. You jump straight to song 300; you add songs at the end; now and then you insert one in the middle or delete one. How should the program store the list? There are two fundamentally different answers, and nearly every data structure in this course is built from one of them or both. Store the items **side by side** in one block of memory, and any item can be found by arithmetic on its position. Or store each item **anywhere**, together with a reference to the next one, and items can be added or removed by changing a couple of references.

This chapter studies both. We see why contiguous arrays give constant-time indexing but costly insertion; how a **dynamic array** — Python's `list`, Java's `ArrayList`, C++'s `std::vector` — grows by doubling and still appends in constant time *on average over any sequence of operations*, which leads to our first **amortised analysis**; and how **singly and doubly linked lists** trade indexing for cheap insertion and deletion. We finish by comparing the two on real hardware, where memory caches change the picture.

## Contiguous arrays

::: definition Array {#def-array}
An **array** of length $n$ stores elements $a[0], a[1], \dots, a[n-1]$, all of the same size $w$ bytes, in one contiguous block of memory. If the block starts at address $b$, element $a[i]$ occupies the $w$ bytes starting at

$$
\operatorname{addr}(a[i]) = b + i\cdot w.
$$ {#eq-address}
:::

Because [[#eq-address]] is one multiplication and one addition, reading or writing $a[i]$ costs $O(1)$ in the RAM model ([[data-structures/asymptotic-analysis#def-ram]]), whatever $i$ is. That is the defining strength of an array. C exposes the arithmetic directly: `a[i]` *means* `*(a + i)`, the contents of the address $i$ elements past `a`.

```c
#include <stdio.h>
#include <stdint.h>

int main(void) {
    int32_t a[5] = {10, 20, 30, 40, 50};
    double d[3] = {1.5, 2.5, 3.5};
    for (int i = 0; i < 5; i++)          /* byte offset of a[i] from a[0] */
        printf("a[%d] = %d at offset %td\n", i, a[i],
               (char *)&a[i] - (char *)&a[0]);
    for (int i = 0; i < 3; i++)
        printf("d[%d] = %.1f at offset %td\n", i, d[i],
               (char *)&d[i] - (char *)&d[0]);
    printf("*(a + 3) = %d\n", *(a + 3)); /* a[i] is defined as *(a + i) */
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra address.c -o address && ./address
a[0] = 10 at offset 0
a[1] = 20 at offset 4
a[2] = 30 at offset 8
a[3] = 40 at offset 12
a[4] = 50 at offset 16
d[0] = 1.5 at offset 0
d[1] = 2.5 at offset 8
d[2] = 3.5 at offset 16
*(a + 3) = 40
```

The offsets go up in steps of $w = 4$ bytes for 32-bit integers and $w = 8$ for doubles, exactly as [[#eq-address]] says. (We print offsets rather than raw addresses, which change from run to run.) A Python list ([[programming-1/sequences]]) is an array too, but of *references*: every slot holds an 8-byte pointer to an object stored elsewhere, which is how one list can hold an integer, a string and another list at once.

The weakness is the other side of the same coin. Since positions are fixed by arithmetic, an element cannot be inserted at position $i$ without moving every element from $i$ onwards one place to the right.

::: proposition Cost of inserting into an array {#prop-array-insert}
Inserting an element at position $i$ of an array holding $n$ elements (with spare capacity) moves $n - i$ elements; deleting the element at position $i$ moves $n - i - 1$. In the worst case ($i = 0$) both are $\Theta(n)$; at the end ($i = n$, respectively $i = n-1$) they are $O(1)$.
:::

::: proof
After inserting, the elements formerly at positions $i, \dots, n-1$ must be at positions $i+1, \dots, n$, by [[#eq-address]]; each of these $n - i$ elements is copied once (from the right end backwards so that nothing is overwritten), and nothing else moves. Deletion is symmetric: positions $i+1, \dots, n-1$ move one place left.
:::

::: example Building an array from the front {#ex-front}
Starting from an empty array with enough capacity, we insert $n$ elements one at a time, each at position $0$. How many element moves are made in total? What if each is inserted at the end instead?
::: solution
When the array holds $k$ elements, inserting at position $0$ moves all $k$ of them ([[#prop-array-insert]] with $i = 0$). The $n$ insertions happen at sizes $k = 0, 1, \dots, n-1$, so the total is

$$
0 + 1 + \dots + (n-1) = \frac{n(n-1)}{2} = \Theta(n^2).
$$

For $n = 1000$ that is $499\,500$ moves. Inserting at the end moves nothing: $n$ writes in total, $\Theta(n)$. If the elements are needed in reverse order, it is far cheaper to append them all and reverse the array once at the end ($\lfloor n/2\rfloor$ swaps) than to insert each at the front.
:::
:::

If the insertion position is uniformly random over $0, \dots, n$, the expected number of moves is $\frac{1}{n+1}\sum_{i=0}^{n}(n-i) = n/2$: still linear. Arrays are excellent for reading and for changing the end, poor for changing the middle.

## Dynamic arrays

A plain array has a fixed length chosen when it is created. But programs rarely know in advance how many items they will store. A **dynamic array** hides the fixed size: it keeps the elements in an array (its **block**) of some **capacity** $C \ge n$, and when an append finds the block full, it allocates a bigger block, copies the elements over, and frees the old one.

The whole question is *how much bigger*. Growing by one slot at a time makes the $k$th append copy $k - 1$ elements, for a total of $0 + 1 + \dots + (n-1) = \Theta(n^2)$ over $n$ appends. Growing by a constant $c$ slots helps only by a factor of $c$: the total is still about $n^2/(2c)$. The right answer is to grow by a constant *factor*.

::: algorithm Append to a dynamic array with doubling {#alg-append}
The array has size $n$, capacity $C$ (initially $C = 1$, $n = 0$) and a block $B[0..C-1]$.

1. If $n = C$:
   1. Allocate a block $B'$ of capacity $2C$.
   2. Copy $B[0..n-1]$ into $B'[0..n-1]$; free $B$; set $B \gets B'$ and $C \gets 2C$.
2. $B[n] \gets x$; $n \gets n + 1$.
:::

A direct implementation, with a counter for the copies made by resizing (a Python list stands in for a raw fixed-size block):

```python
class DynamicArray:
    """A growable array on top of fixed-size blocks, doubling when full."""
    def __init__(self):
        self.capacity = 1
        self.n = 0
        self.block = [None] * self.capacity   # stands in for a fixed-size memory block
        self.copies = 0                       # element copies made by resizing

    def append(self, x):
        if self.n == self.capacity:           # full: move into a block twice as big
            new = [None] * (2 * self.capacity)
            for i in range(self.n):
                new[i] = self.block[i]
                self.copies += 1
            self.block, self.capacity = new, 2 * self.capacity
        self.block[self.n] = x
        self.n += 1

    def __getitem__(self, i):
        if not 0 <= i < self.n:
            raise IndexError(i)
        return self.block[i]
```

::: example Tracing appends with doubling {#ex-doubling-trace}
Append $1, 2, \dots, 17$ to an empty `DynamicArray`. After each append, what are the capacity and the total number of copies so far?
::: solution
A resize happens when an append finds $n = C$, that is before appending items $2, 3, 5, 9, 17$ (when $n = 1, 2, 4, 8, 16$); it copies $n$ elements and doubles $C$.

| append $k$ | 1 | 2 | 3 | 4 | 5 | 6–8 | 9 | 10–16 | 17 |
|---|---|---|---|---|---|---|---|---|---|
| capacity after | 1 | 2 | 4 | 4 | 8 | 8 | 16 | 16 | 32 |
| copies so far | 0 | 1 | 3 | 3 | 7 | 7 | 15 | 15 | 31 |

Printing `k, d.capacity, d.copies` after each append in the class above gives exactly these values. The append of item $17$ alone costs $16$ copies, but the total after $17$ appends is only $31 < 2\cdot 17$. Expensive appends are rare, and they become rarer as the array grows, exactly fast enough to keep the total linear.
:::
:::

The trace suggests that although a single append can cost $\Theta(n)$, a *sequence* of $n$ appends costs $O(n)$. This kind of statement has a name.

::: definition Amortised cost {#def-amortised}
Let a data structure support some operations, and let $c_i$ be the actual cost of the $i$th operation in a sequence. Numbers $\hat c_i$ assigned to the operations are valid **amortised costs** if, for every sequence of operations starting from the initial (empty) structure, and every prefix of it,

$$
\sum_{i=1}^{k} c_i \;\le\; \sum_{i=1}^{k} \hat c_i .
$$

We then say an operation takes, for example, "$O(1)$ amortised time" if each $\hat c_i = O(1)$.
:::

Amortised cost is a worst-case guarantee about *totals*: no probability is involved, and it holds for every sequence, including an adversarial one. What it does not promise is that each individual operation is fast — a single append can still take $\Theta(n)$ time, which matters in real-time systems where one long pause is unacceptable.

::: theorem Appending with doubling takes O(1) amortised time {#thm-doubling}
Starting from an empty dynamic array with capacity $1$, any sequence of $n$ appends performs fewer than $2n$ element copies, so its total cost (copies plus writes) is less than $3n$. Each append therefore has amortised cost $3$, and the array never uses more than $2n$ slots for $n \ge 1$ elements.
:::

::: proof
*Aggregate method.* Resizes happen when the size reaches $1, 2, 4, \dots, 2^k$, where $2^k$ is the largest power of $2$ less than $n$ (the append that would make the size reach $2^k + 1$ triggers that resize). The resize at size $2^j$ copies $2^j$ elements, so the total number of copies is

$$
1 + 2 + 4 + \dots + 2^k = 2^{k+1} - 1 < 2\cdot 2^k < 2n.
$$

Adding the $n$ writes of new elements, the total is less than $3n$. The same argument applies to every prefix of the sequence, so assigning $\hat c_i = 3$ is valid. Finally, the capacity is $1$ or $2^{k+1}$ with $2^k < n$, hence at most $2n$ (for $n \ge 1$).

*Accounting method* (a second proof that explains *why*). Charge each append $3$ units: one pays for writing the element, and two are saved as credit on that element. Consider a resize from capacity $C$ to $2C$ with $C \ge 2$. Since the previous resize (to capacity $C$) the $C/2$ elements in positions $C/2, \dots, C-1$ were appended, each leaving $2$ credits: $C$ credits in total, exactly enough to pay for copying all $C$ elements. The first resize ($C = 1$) copies one element, paid by the two credits of the first append. Credit is never negative, so the charged amounts always cover the actual costs.
:::

The same argument works for any growth factor $\alpha > 1$: the copies form a geometric series whose largest term is less than $n$, so their total is less than $n(1 + 1/\alpha + 1/\alpha^2 + \dots) = n\alpha/(\alpha - 1)$ (ignoring rounding of capacities). A smaller $\alpha$ wastes less memory but copies more: $\alpha = 2$ gives fewer than $2n$ copies and up to $50\%$ unused space; $\alpha = 1.5$ gives fewer than $3n$ copies and up to a third unused.

::: widget plot
f: x + 2^(floor(log2(x - 1)) + 1) - 1; 3*x; x + c*floor((x - 1)/c)*(floor((x - 1)/c) + 1)/2
labels: \text{doubling}; 3n; \text{grow by } c
sliders: c=1:1:40
x: 2, 200
y: 0, 1500
caption: Total cost (writes plus copies) of $n$ appends, starting from capacity $1$ for doubling and capacity $c$ for growing by $c$ slots. The doubling curve jumps at every power of two but always stays below the line $3n$ of [[#thm-doubling]]. Increase $c$: growing by a constant delays the blow-up but the curve is still a parabola, about $n^2/(2c)$.
:::

### Shrinking

If elements can also be removed from the end, we may want to give memory back. The tempting rule "halve the capacity when the array is half full" is a trap. Suppose the array is full, $n = C$. An append doubles the capacity to $2C$ and copies $C$ elements; a remove then brings the size back to $C$, half of $2C$, so the array halves and copies $C$ elements again; it is now full, and the next append doubles once more. Alternating append and remove makes *every* operation copy about $n$ elements. The standard fix leaves a gap between the two thresholds: double when full, halve when the array becomes **one-quarter** full. After either kind of resize the array is exactly half full, so at least $C/4$ cheap operations must happen before the next resize, and they pay for it. Pop-from-the-end then also takes $O(1)$ amortised time (exercise [[#exr-shrink]]).

### Python's list

Python's `list` is a dynamic array of references. CPython does not double: as of version 3.14, when an append finds the block full it grows it to about $n + n/8 + 6$ slots, rounded to a multiple of $4$ — a growth factor of about $1.125$, trading some extra copying for less wasted memory. You can watch it happen with `sys.getsizeof`, which reports the size of the list object including its block of 8-byte pointers:

```python
import sys
a = []
last = sys.getsizeof(a)
print(f"len  0: {last} bytes")
for i in range(1, 65):
    a.append(i)
    size = sys.getsizeof(a)
    if size != last:                   # the list just grew its block
        print(f"len {len(a):2d}: {size} bytes")
        last = size
```

```console
$ python3 growth.py
len  0: 56 bytes
len  1: 88 bytes
len  5: 120 bytes
len  9: 184 bytes
len 17: 248 bytes
len 25: 312 bytes
len 33: 376 bytes
len 41: 472 bytes
len 53: 568 bytes
```

Subtracting the 56-byte header and dividing by $8$, the capacities are $4, 8, 16, 24, 32, 40, 52, 64$. This is an implementation detail that has changed between versions and may change again; what the language guarantees in practice is the amortised $O(1)$ append.

::: warning A Python list is not a linked list
The name misleads many beginners. `a.append(x)`, `a.pop()` and `a[i]` are fast, but `a.insert(0, x)`, `a.pop(0)` and `del a[0]` shift every element and cost $\Theta(n)$ ([[#prop-array-insert]]). A loop that builds a list with `insert(0, x)` is quadratic. One run on the author's machine (2026; an observation, your numbers will differ):

```console
n =  25000  append 0.0024 s   insert(0) 0.0961 s
n =  50000  append 0.0045 s   insert(0) 0.4959 s
n = 100000  append 0.0086 s   insert(0) 2.4992 s
```

Doubling $n$ doubles the time for `append` and multiplies the time for `insert(0)` by four or more. To add and remove at both ends, use `collections.deque` ([[data-structures/stacks-queues]]).
:::

::: quiz
A dynamic array that doubles when full currently has size $n = 1024$ and capacity $1024$. Which statement is true?
- [ ] The next append costs $O(1)$, because appends are $O(1)$ amortised.
- [x] The next append copies 1024 elements, but the 1023 appends after it copy nothing.
- [ ] Every append from now on copies the array.
- [ ] Amortised analysis assumes appends happen in random order.
::: solution
The array is full, so the next append resizes to capacity $2048$ and copies all $1024$ elements: amortised $O(1)$ does not mean each operation is cheap. After it the size is $1025$, and appends number $1026$ to $2048$ fit without copying. Amortised bounds hold for every sequence; there is no randomness in them.
:::
:::

## Linked lists

A **linked list** gives up contiguity. Each element lives in its own small record, a **node**, which also stores a reference to the next node.

::: definition Singly linked list {#def-linked-list}
A **node** is a record with two fields: `value` and `next`, where `next` is a reference to another node or the null reference (`None` in Python, `NULL` in C). A **singly linked list** is given by a reference `head` to its first node; following `next` references from `head` visits the nodes in order and ends at a node whose `next` is null. The empty list has `head` null.
:::

::: widget graph
nodes: head@0,0; 10@1,0; 20@2,0; 25@3,0; 30@4,0; None@5,0
edges: head>10; 10>20; 20>25; 25>30; 30>None
caption: A singly linked list after `insert_after(find(20), 25)` in the program below. Each arrow is a `next` reference; the nodes can live anywhere in memory. Inserting 25 created one node and changed one arrow (20 → 30 became 20 → 25), whatever the length of the list. Drag the nodes around: the list is defined by the arrows, not by the positions.
:::

```python
class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next          # the following node, or None at the end

class LinkedList:
    def __init__(self):
        self.head = None

    def push_front(self, x):      # O(1): the new node points at the old head
        self.head = Node(x, self.head)

    def find(self, x):            # O(n): follow links until x or the end
        p = self.head
        while p is not None and p.value != x:
            p = p.next
        return p

    def insert_after(self, p, x): # O(1) once we hold a reference to node p
        p.next = Node(x, p.next)

    def remove_front(self):       # O(1)
        x = self.head.value
        self.head = self.head.next
        return x

    def __iter__(self):
        p = self.head
        while p is not None:
            yield p.value
            p = p.next

L = LinkedList()
for x in [30, 20, 10]:
    L.push_front(x)
print(list(L))
L.insert_after(L.find(20), 25)
print(list(L))
print(L.remove_front(), list(L))
```

```console
$ python3 linked.py
[10, 20, 30]
[10, 20, 25, 30]
10 [20, 25, 30]
```

The costs are the mirror image of an array's. There is no address arithmetic, so reaching the $i$th node means following $i$ links: $\Theta(i)$ time, and searching for a value is $\Theta(n)$ in the worst case. But once we hold a reference to a node, inserting after it or deleting its successor changes a constant number of references, however long the list. And the list never needs resizing; each node is allocated when needed.

::: example Reversing a linked list in place {#ex-reverse}
Write a loop that reverses a singly linked list by changing the `next` references, using $O(1)$ extra space, and trace it on $1 \to 2 \to 3$.
::: solution
Walk along the list, turning each arrow round. Keep `prev` (the already-reversed part) and `cur` (the rest):

```python
def reverse(L):
    prev, cur = None, L.head
    while cur is not None:
        nxt = cur.next      # remember the rest of the list
        cur.next = prev     # turn this node's arrow round
        prev, cur = cur, nxt
    L.head = prev
```

| step | `prev` (reversed part) | `cur` (rest) |
|---|---|---|
| start | (empty) | $1 \to 2 \to 3$ |
| 1 | $1$ | $2 \to 3$ |
| 2 | $2 \to 1$ | $3$ |
| 3 | $3 \to 2 \to 1$ | (empty) |

The loop invariant is: *`prev` is the reverse of the nodes already visited, and `cur` is the list of the nodes not yet visited*. It holds at the start (nothing visited) and each iteration moves one node from the front of `cur` to the front of `prev`. When `cur` is empty, `prev` is the whole list reversed. Each node is visited once: $\Theta(n)$ time, $O(1)$ extra space. Saving `nxt` before overwriting `cur.next` is essential — without it the rest of the list is lost.
:::
:::

::: example Deleting by value from a singly linked list {#ex-delete-value}
Write `remove(self, x)` for `LinkedList`, deleting the first node whose value is `x` (if any), and trace it on the list $10 \to 20 \to 25 \to 30$ with $x = 25$.
::: solution
To unlink a node we must change its *predecessor's* `next`, so we walk with two references, `prev` one step behind `p`. The head has no predecessor and is a special case.

```python
def remove(self, x):
    prev, p = None, self.head
    while p is not None and p.value != x:
        prev, p = p, p.next
    if p is None:
        return False            # x is not in the list
    if prev is None:
        self.head = p.next      # removing the first node
    else:
        prev.next = p.next      # bypass p
    return True
```

| step | `prev` | `p` | test `p.value != 25` |
|---|---|---|---|
| start | `None` | node 10 | true, advance |
| 1 | node 10 | node 20 | true, advance |
| 2 | node 20 | node 25 | false, stop |

Now `prev` is node 20, so `prev.next = p.next` makes 20 point to 30, and the list is $10 \to 20 \to 30$. Node 25 is no longer reachable; Python's garbage collector reclaims it (in C we would `free` it). The search costs $\Theta(k)$ for a value at position $k$; the unlinking itself is $O(1)$. The special case for the head is exactly what a sentinel removes, as we see next.
:::
:::

### Doubly linked lists and sentinels

A singly linked list cannot delete a node given only a reference to that node: the *previous* node's `next` must change, and finding the previous node takes a walk from the head. A **doubly linked list** stores in each node both `next` and `prev` references, at the cost of one more reference per node. Then a node can be unlinked in $O(1)$ time from a reference to it alone, and the list can be walked in both directions.

Code for linked lists is notorious for special cases: inserting into an empty list, deleting the first or last node. A **sentinel** — a dummy node that holds no value and is always present — removes them. In a **circular doubly linked list with a sentinel** `nil`, `nil.next` is the first node and `nil.prev` the last; the empty list is `nil` pointing to itself in both directions. Every real node then has a real predecessor and successor, so one piece of code handles all positions.

```python
class DNode:
    def __init__(self, value=None):
        self.value = value
        self.prev = self.next = self   # a lone node is a circle of one

class DList:
    """Circular doubly linked list with a sentinel: no special cases at the ends."""
    def __init__(self):
        self.nil = DNode()             # sentinel; nil.next is first, nil.prev is last

    def insert_after(self, p, x):      # O(1)
        q = DNode(x)
        q.prev, q.next = p, p.next
        p.next.prev = q
        p.next = q
        return q

    def push_back(self, x):
        return self.insert_after(self.nil.prev, x)

    def remove(self, q):               # O(1): unlink q given only q itself
        q.prev.next = q.next
        q.next.prev = q.prev
        return q.value

    def __iter__(self):
        p = self.nil.next
        while p is not self.nil:
            yield p.value
            p = p.next

D = DList()
nodes = [D.push_back(c) for c in "abcde"]
D.remove(nodes[2])                     # delete "c" without searching for it
D.remove(nodes[0])                     # deleting the first node is no different
D.insert_after(D.nil, "z")             # insert at the front
print(list(D))
```

```console
$ python3 dlist.py
['z', 'b', 'd', 'e']
```

Doubly linked lists with $O(1)$ removal by reference appear wherever items must be moved around cheaply while something else knows where they are: an **LRU cache** keeps its entries in a doubly linked list in order of use, together with a hash table ([[data-structures/hash-tables]]) mapping each key to its node, so that a used entry can be unlinked and moved to the front in $O(1)$ time.

::: quiz
In a doubly linked list you hold a reference `q` to a node in the middle. Which operation does **not** take $O(1)$ time?
- [ ] Deleting `q`.
- [ ] Inserting a new node just before `q`.
- [x] Finding the position (index) of `q` in the list.
- [ ] Moving `q` to the front of the list.
::: solution
Deleting `q`, inserting next to it and moving it (delete, then insert after the sentinel) each change a constant number of references. But a node does not know its index; computing it means walking from the head and counting, $\Theta(n)$ in the worst case.
:::
:::

## Arrays versus linked lists

| operation | array / dynamic array | singly linked | doubly linked |
|---|---|---|---|
| access $i$th element | $O(1)$ | $\Theta(i)$ | $\Theta(\min(i, n-i))$ |
| search for a value | $\Theta(n)$ ($O(\log n)$ if sorted) | $\Theta(n)$ | $\Theta(n)$ |
| insert / delete at front | $\Theta(n)$ | $O(1)$ | $O(1)$ |
| insert / delete at end | $O(1)$ amortised | $O(1)$ insert with a tail reference; delete $\Theta(n)$ | $O(1)$ |
| insert / delete next to a known node | $\Theta(n)$ | $O(1)$ after it | $O(1)$ before or after |
| extra space | up to $\Theta(n)$ unused capacity | one reference per element | two references per element |

(The doubly linked access bound assumes we know $n$ and can walk from either end.) Binary search, which needs $O(1)$ access to the middle, is impossible to do quickly on a linked list: even if the list is sorted, reaching the middle takes $n/2$ steps.

::: application Locality of reference
The RAM model charges the same for every memory access, but real processors do not. As of 2026, reading from main memory takes on the order of $100$ ns, while reading from the level-1 cache takes about $1$ ns. Memory moves into the cache in **cache lines** of (typically) $64$ bytes, so after reading `a[i]` of an array of 8-byte values, the next seven elements are probably already in the cache, and hardware **prefetchers** recognise the sequential pattern and fetch ahead. Following the nodes of a linked list jumps to unrelated addresses, and each jump may miss the cache. The consequence, an observation that benchmarks confirm repeatedly, is that scanning an array is often many times faster than scanning a linked list of the same length, even though both are $\Theta(n)$ — and that for moderate $n$, inserting into the middle of an array by shifting can beat walking a list to the insertion point. Asymptotic analysis tells you which costs grow; the constants, which depend on memory layout, decide many practical contests. Caches are studied in [[computer-systems]].
:::

::: history
Arrays are as old as stored-program computers: indexing by computing addresses was built into the instruction sets of the late 1940s, and FORTRAN (1957) made the subscripted variable `A(I)` a staple of programming. Linked lists were introduced by Allen Newell, Cliff Shaw and Herbert Simon in the Information Processing Language (IPL) of 1956, written for their Logic Theorist program, and John McCarthy's LISP (1958, described in 1960) made the linked list its central data structure. Knuth's *The Art of Computer Programming*, volume 1 (1968), surveyed linked allocation, sentinels and doubly linked lists systematically. Amortised analysis was named and formalised by Robert Tarjan in "Amortized computational complexity" (*SIAM Journal on Algebraic and Discrete Methods*, 1985), building on his work with Daniel Sleator on self-adjusting data structures.
:::

## Where this leads

Arrays and linked nodes are the raw materials of the rest of the course. [[data-structures/stacks-queues]] builds stacks, queues and deques on both; [[data-structures/hash-tables]] uses an array of buckets, each often a linked list, and resizes it by the doubling argument of [[#thm-doubling]]; trees ([[data-structures/trees]]) generalise linked nodes to several children, and heaps ([[data-structures/heaps]]) pack a tree into an array by index arithmetic. Graph representations ([[data-structures/graph-representations]]) choose between an array of lists and a two-dimensional array. The amortised method returns in [[algorithms]], for example in the analysis of union–find.

::: summary
- An array stores elements contiguously; $a[i]$ is at address $b + iw$, so access is $O(1)$, but inserting or deleting at position $i$ moves $n - i$ elements ([[#prop-array-insert]]).
- A dynamic array grows by a constant **factor**; with doubling, $n$ appends cost less than $3n$ in total ([[#thm-doubling]]), so append is $O(1)$ **amortised**. Growing by a constant amount makes $n$ appends cost $\Theta(n^2)$.
- Amortised cost ([[#def-amortised]]) bounds the total over every sequence of operations; it involves no probability, but individual operations may still be slow.
- Shrink by halving only when one-quarter full, so that resizes cannot alternate.
- A singly linked list ([[#def-linked-list]]) inserts and deletes at the front, or after a known node, in $O(1)$, but accessing the $i$th element takes $\Theta(i)$.
- Doubly linked lists with a sentinel delete any node by reference in $O(1)$ and have no special cases at the ends.
- Python's `list` is a dynamic array: `append`/`pop()` are fast, `insert(0, x)`/`pop(0)` are $\Theta(n)$. On real hardware arrays benefit from cache locality that linked lists lack.
:::

## Exercises

::: exercise Address arithmetic {level=1 check="4148"}
An array of 32-bit integers starts at address $4096$ (decimal). At what address does `a[13]` start? (Enter the address in decimal.)
::: solution
By [[#eq-address]] with $w = 4$: $4096 + 13 \cdot 4 = 4096 + 52 = 4148$.
:::
:::

::: exercise Copies with doubling {level=1 check="63"}
Starting from an empty dynamic array of capacity $1$ that doubles when full, how many element copies do $40$ appends cause in total? (Enter the number.)
::: solution
Resizes happen at sizes $1, 2, 4, 8, 16, 32$ (each power of two less than $40$), copying $1 + 2 + 4 + 8 + 16 + 32 = 63$ elements. The capacity ends at $64$. As [[#thm-doubling]] promises, $63 < 2 \cdot 40$.
:::
:::

::: exercise Linked list operations {level=1}
Using the `LinkedList` class above, write a method `length(self)` and a method `get(self, i)` returning the value at index $i$ (raising `IndexError` if there is none). What are their costs? Why might a real implementation keep a separate `size` field?
::: solution
```python
def length(self):
    count, p = 0, self.head
    while p is not None:
        count, p = count + 1, p.next
    return count

def get(self, i):
    p = self.head
    for _ in range(i):
        if p is None:
            break
        p = p.next
    if i < 0 or p is None:
        raise IndexError(i)
    return p.value
```

`length` is $\Theta(n)$ and `get(i)` is $\Theta(\min(i, n))$. Keeping a `size` field, updated by every insertion and deletion at $O(1)$ extra cost, makes `length` $O(1)$ and lets `get` reject a bad index immediately.
:::
:::

::: exercise Growing by a constant {level=2 check="49500"}
A dynamic array starts with capacity $10$ and grows by $10$ slots whenever it is full. How many element copies are made by $1000$ appends? (Enter the number.)
::: solution
Resizes happen when an append finds the size equal to the capacity, that is at sizes $10, 20, \dots, 990$; the append of item $1000$ fits into capacity $1000$ without a resize. The resizes copy

$$
10 + 20 + \dots + 990 = 10\,(1 + 2 + \dots + 99) = 10 \cdot 4950 = 49\,500
$$

elements — about $n^2/(2c)$ with $n = 1000$, $c = 10$. Doubling from capacity $1$ would have made only $1 + 2 + \dots + 512 = 1023$ copies.
:::
:::

::: exercise Alternating operations {level=2}
A dynamic array doubles when full and *halves when half full*. Starting with size $n = C = 2^k$, describe what happens under the sequence append, remove, append, remove, … and compute the total cost of $m$ such operations. Then explain why the rule "halve when one-quarter full" avoids the problem.
::: solution
The append finds the array full, doubles to $2^{k+1}$ and copies $2^k$ elements; the size is now $2^k + 1$. The remove brings the size to $2^k$, exactly half of $2^{k+1}$, so the array halves and copies $2^k$ elements again. The array is full again, and the pattern repeats: every operation costs $\Theta(n)$, and $m$ operations cost $\Theta(mn)$.

With "halve at one-quarter", after a doubling the array is half full and at least $C/4$ removals are needed (with $C$ the new capacity) before a halving; after a halving the array is half full again and needs $C'/2$ appends before the next doubling. Each resize, of cost proportional to the current capacity, is therefore preceded by a number of cheap operations proportional to the same capacity, which pays for it.
:::
:::

::: exercise Shrinking is amortised O(1) {#exr-shrink level=3}
Prove that with "double when full, halve when one-quarter full" (never shrinking below capacity $1$), any sequence of $m$ appends and pops on an initially empty array costs $O(m)$. Use the potential $\Phi = \lvert 2n - C\rvert$, where $n$ is the size and $C$ the capacity.
::: hint
Show that the amortised cost $c_i + \Phi_i - \Phi_{i-1}$ of each operation is at most a constant, using that $\Phi = 0$ just after a resize and that $\Phi \ge 0$ always.
:::
::: solution
We use the **potential method**: if $\Phi \ge 0$ always and $\Phi_0 = \lvert 0 - 1\rvert = 1$, then $\sum c_i = \sum (c_i + \Phi_i - \Phi_{i-1}) - \Phi_m + \Phi_0 \le \sum \hat c_i + 1$ with $\hat c_i = c_i + \Delta\Phi$. So it suffices to show each $\hat c_i \le 3$.

*Append without resize.* Cost $1$; $n$ grows by $1$, so $2n - C$ grows by $2$ and $\lvert 2n - C\rvert$ changes by at most $2$: $\hat c \le 3$.

*Append with resize* ($n = C$ beforehand). Cost $n + 1$ (copy $n$, write one). Before: $\Phi = \lvert 2n - n\rvert = n$. After: size $n + 1$, capacity $2n$, $\Phi = \lvert 2n + 2 - 2n\rvert = 2$. So $\hat c = n + 1 + 2 - n = 3$.

*Pop without resize.* Cost $1$; $\Phi$ changes by at most $2$: $\hat c \le 3$.

*Pop with resize.* The pop brings the size to $n = C/4$ and then the array halves to capacity $C/2$, copying $n$ elements: cost $1 + n$. Before the pop, the size was $n + 1$ and $\Phi = \lvert 2n + 2 - 4n\rvert = 2n - 2$ (for $n \ge 1$). After: $\Phi = \lvert 2n - 2n\rvert = 0$. So $\hat c = 1 + n + 0 - (2n - 2) = 3 - n \le 3$.

Hence every operation has amortised cost at most $3$, and $m$ operations cost at most $3m + 1 = O(m)$.
:::
:::

::: exercise Middle of a linked list {level=2}
Give an algorithm that finds the middle node of a singly linked list in one pass, without knowing its length and using $O(1)$ extra space. Prove that it is correct.
::: solution
Use two references: `slow` moves one node per step and `fast` moves two.

```python
def middle(L):
    slow = fast = L.head
    while fast is not None and fast.next is not None:
        slow, fast = slow.next, fast.next.next
    return slow
```

Invariant: after $t$ iterations, `slow` is node $t$ and `fast` is node $2t$ (counting from $0$). The loop stops at the first $t$ for which node $2t$ or node $2t + 1$ does not exist, i.e. $2t \ge n - 1$; so $t = \lceil (n-1)/2 \rceil = \lfloor n/2 \rfloor$, and `slow` is node $\lfloor n/2\rfloor$ — the middle node for odd $n$ and the second of the two middle nodes for even $n$. For an empty list it returns `None`. The pass takes $\Theta(n)$ time and $O(1)$ space.
:::
:::

::: exercise Growth factor and waste {level=3}
A dynamic array grows by a factor $\alpha > 1$ whenever it is full (ignore rounding). (a) Show that $n$ appends make fewer than $n\alpha/(\alpha - 1)$ copies. (b) Show that just after a resize at most a fraction $1 - 1/\alpha$ of the capacity is unused. (c) Some implementations prefer $\alpha < \phi = (1 + \sqrt5)/2 \approx 1.618$ so that, with a simple memory allocator, freed blocks can eventually be combined and reused for a later block. Explain the idea: with $\alpha = 2$, why can the next block never fit into the space freed by all earlier blocks?
::: solution
(a) The resizes copy $s_1 < s_2 < \dots < s_r$ elements with $s_{j+1} = \alpha s_j$ and $s_r < n$. So $s_{r-j} = s_r/\alpha^j$ and the total is $s_r(1 + 1/\alpha + \dots + 1/\alpha^{r-1}) < n \cdot \frac{1}{1 - 1/\alpha} = n\frac{\alpha}{\alpha-1}$.

(b) Just after a resize from capacity $C$ the size is $C + 1$ and the capacity $\alpha C$, so the unused fraction is $(\alpha C - C - 1)/(\alpha C) < 1 - 1/\alpha$; before the next resize the array fills up completely.

(c) With $\alpha = 2$ and capacities $1, 2, 4, \dots, 2^k$, the blocks freed so far have total size $1 + 2 + \dots + 2^{k-1} = 2^k - 1$, while the next block requested has size $2^{k+1}$ (and the current block of size $2^k$ is still in use while copying). Since $2^k - 1 < 2^{k+1}$, the freed space — even if it were all adjacent — is never enough. With a growth factor below $\phi$, the sum of earlier block sizes eventually exceeds the next request, because $\phi$ is the root of $x^2 = x + 1$: a sequence growing more slowly than the Fibonacci numbers has each term eventually smaller than the sum of the earlier terms. This is a heuristic about allocators, not a guarantee; real allocators are more complex.
:::
:::
