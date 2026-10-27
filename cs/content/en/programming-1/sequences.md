Until now each variable has held a single value: one number, one string, one Boolean. Real data rarely comes one value at a time. A class has a list of marks; a sentence is a sequence of words; a measurement run is a series of readings; a line of a spreadsheet is a row of fields. To compute an average, find the longest word or sort the readings we need values that *contain* other values, in order, and operations to get at them.

Python's main tools for ordered collections are **lists**, **tuples** and **strings**. All three are **sequences**: their elements are numbered from $0$ and can be selected by index or by slice. They differ in one essential way. A list can be changed after it is created — elements added, removed, replaced — whereas tuples and strings cannot. That difference, **mutability**, brings with it the most important new idea of this chapter: two names can refer to the *same* list, so that a change made through one name is visible through the other. Understanding this **aliasing** precisely is what separates programmers who are occasionally baffled by their own code from those who are not.

## Lists, indexing and slicing

A **list** is written as a comma-separated sequence of values in square brackets: `[62, 48, 91, 75]`, `["eggs", "milk"]`, `[]` (the empty list). The elements may have any types, and may themselves be lists. `len(xs)` is the number of elements.

::: definition Indexing {#def-index}
The elements of a sequence `xs` of length $n$ have **indices** $0, 1, \dots, n - 1$, and `xs[i]` is the element at index $i$. A negative index counts from the end: `xs[-k]` means `xs[n - k]` for $1 \le k \le n$, so `xs[-1]` is the last element. Any other index raises `IndexError`.
:::

Indices start at $0$ because an index measures *how far from the start* an element is; the first element is $0$ steps from the start. This convention, shared by C, Java, JavaScript and most modern languages, fits naturally with half-open ranges: the indices of a list of length $n$ are exactly `range(n)`.

::: definition Slicing {#def-slice}
The **slice** `xs[i:j]` is a new sequence of the elements of `xs` with indices $i \le k < j$ (half-open, like `range`). An omitted `i` means the start and an omitted `j` the end; negative values count from the end; values beyond the ends are clamped, so slicing never raises `IndexError`. The extended slice `xs[i:j:s]` takes every $s$-th element, starting from $i$; with $s < 0$ it goes backwards, and `xs[::-1]` is the sequence reversed.
:::

::: example Indexing and slicing {#ex-slicing}
Let `xs = [10, 20, 30, 40, 50]`. Evaluate `xs[0]`, `xs[-2]`, `xs[1:3]`, `xs[:2]`, `xs[2:]`, `xs[-3:]`, `xs[::2]`, `xs[::-1]`, `xs[1:100]`, `xs[3:1]` and `xs[5]`.
::: solution
| expression | value | reason |
|---|---|---|
| `xs[0]` | `10` | first element |
| `xs[-2]` | `40` | `xs[5 - 2]` |
| `xs[1:3]` | `[20, 30]` | indices 1 and 2; 3 is excluded |
| `xs[:2]` | `[10, 20]` | the first two elements |
| `xs[2:]` | `[30, 40, 50]` | everything from index 2 |
| `xs[-3:]` | `[30, 40, 50]` | the last three |
| `xs[::2]` | `[10, 30, 50]` | indices 0, 2, 4 |
| `xs[::-1]` | `[50, 40, 30, 20, 10]` | reversed |
| `xs[1:100]` | `[20, 30, 40, 50]` | the end is clamped to 5 |
| `xs[3:1]` | `[]` | no $k$ with $3 \le k < 1$ |
| `xs[5]` | `IndexError: list index out of range` | indices go up to 4 |

Two identities are worth remembering: `xs[:k] + xs[k:] == xs` for every `k` (the two halves join with no gap and no overlap), and `len(xs[i:j]) == j - i` when $0 \le i \le j \le n$.
:::
:::

### Changing a list

Lists are **mutable**: they can be changed in place. Assigning to an index replaces an element, and **methods** — functions called with a dot on the list — add and remove elements:

```python
shopping = ["eggs", "milk"]
shopping.append("bread")          # add at the end
shopping.insert(0, "tea")         # add at position 0
shopping[2] = "oat milk"          # replace an element
last = shopping.pop()             # remove and return the last element
print(shopping, last)
shopping.extend(["rice", "beans"])
shopping.remove("eggs")           # remove the first occurrence of a value
print(shopping, len(shopping))
```

```console
$ python3 mutate.py
['tea', 'eggs', 'oat milk'] bread
['tea', 'oat milk', 'rice', 'beans'] 4
```

Other common operations are `xs.pop(i)` (remove and return the element at index `i`), `x in xs` (membership), `xs.index(x)` (the first index of `x`), `xs.count(x)`, `xs.reverse()`, and the built-ins `sum`, `min` and `max`. Two ways of sorting show a general pattern in Python:

```python
marks = [62, 48, 91, 75]
ordered = sorted(marks)     # a new sorted list; marks is unchanged
print(ordered, marks)
result = marks.sort()       # sorts marks itself, and returns None
print(result, marks)
```

```console
$ python3 sortdemo.py
[48, 62, 75, 91] [62, 48, 91, 75]
None [48, 62, 75, 91]
```

A method that changes an object in place usually returns `None`, so that you cannot mistake it for one that makes a new object. `xs = xs.sort()` is therefore a bug: it sorts the list and then rebinds `xs` to `None`.

## Mutability and aliasing

The name-tag picture of variables from [[programming-1/values-types#def-variable]] now becomes essential. A list is an **object** in memory; a variable is a name bound to that object. Assignment never copies an object — it only binds another name to it.

::: definition Identity, aliasing and copying {#def-alias}
Every object has an **identity** that never changes while it exists. `x is y` is `True` when `x` and `y` refer to the same object, whereas `x == y` compares values. Two names that refer to the same mutable object are **aliases**: a change to the object made through either name is visible through both. A **copy** is a new object with the same elements: `xs[:]`, `list(xs)` and `xs.copy()` all make one.
:::

```python
a = [1, 2, 3]
b = a              # b and a are two names for ONE list
c = a[:]           # c is a new list with the same elements (a copy)
a.append(4)
print(a, b, c)
print(a is b, a is c)
```

```console
$ python3 alias.py
[1, 2, 3, 4] [1, 2, 3, 4] [1, 2, 3]
True False
```

::: widget mapping
domain: a; b; c
codomain: list #1; list #2
map: a>list #1; b>list #1; c>list #2
editable: false
caption: Names and objects after `b = a` and `c = a[:]`. Two names point at list #1, so `a.append(4)` changes what both `a` and `b` show; `c` points at a different object, the copy. Aliasing is exactly the failure of this name-to-object map to be injective. For immutable values (numbers, strings, tuples) sharing is harmless, because nothing can change the shared object.
:::

Aliasing is not a defect: it is how Python passes arguments. By [[programming-1/functions#def-call]], a parameter is bound to the argument *value*, which for a list is the list object itself. A function can therefore change a list that its caller can see — and the caller had better know whether it does.

```python
def add_bonus(marks, bonus):
    """Add bonus to every mark, changing the list in place."""
    for i in range(len(marks)):
        marks[i] += bonus

def with_bonus(marks, bonus):
    """Return a new list of marks with bonus added; marks is unchanged."""
    return [m + bonus for m in marks]

scores = [50, 60, 70]
new_scores = with_bonus(scores, 5)
print(scores, new_scores)
add_bonus(scores, 5)
print(scores)
```

```console
$ python3 modify.py
[50, 60, 70] [55, 65, 75]
[55, 65, 75]
```

Both styles are legitimate; what matters is that the docstring says which one a function uses. Notice the difference from [[programming-1/functions]], where we saw that a function cannot rebind its caller's variables: `add_bonus` does not rebind `scores` — it changes the object that `scores` refers to. **Rebinding a name** and **mutating an object** are different operations, and only the second is visible through other names.

::: example A grid that changes in three places {#ex-grid}
A programmer builds a $3 \times 3$ grid of zeros and sets the top-left cell to $9$. Explain the output of the first half of this program, and why the second half fixes it.

```python
grid = [[0] * 3] * 3            # three references to ONE row
grid[0][0] = 9
print(grid)

grid = [[0] * 3 for _ in range(3)]   # three separate rows
grid[0][0] = 9
print(grid)
```
::: solution
```console
$ python3 grid.py
[[9, 0, 0], [9, 0, 0], [9, 0, 0]]
[[9, 0, 0], [0, 0, 0], [0, 0, 0]]
```

`[0] * 3` builds one row `[0, 0, 0]`. Multiplying the list `[row]` by $3$ makes a list containing *the same row object* three times — repetition copies references, not objects. So `grid[0]`, `grid[1]` and `grid[2]` are aliases, and changing `grid[0][0]` changes "all three". The list comprehension in the second half evaluates `[0] * 3` afresh for each of the three rows, creating three different row objects. (`[0] * 3` itself is safe, because its elements are integers, which cannot be mutated.)
:::
:::

::: warning `b = a` does not copy
The single most common surprise with lists is expecting assignment to copy. `b = a` creates an alias; use `b = a[:]` or `b = list(a)` to copy. Note also that these copies are **shallow**: they copy the outer list but not the objects inside it, so a copy of a list of lists still shares the inner lists. When you need a completely independent copy of nested data, build it explicitly (as in the grid comprehension) or use the standard library's `copy.deepcopy`.
:::

::: quiz
After running these lines, what does `print(x, y)` show?

```python
x = [1, 2]
y = x
y = y + [3]
y.append(4)
```
- [ ] `[1, 2, 3, 4] [1, 2, 3, 4]`
- [x] `[1, 2] [1, 2, 3, 4]`
- [ ] `[1, 2, 4] [1, 2, 3, 4]`
- [ ] `[1, 2, 3] [1, 2, 3, 4]`
::: solution
After `y = x` the two names are aliases. But `y + [3]` builds a *new* list `[1, 2, 3]`, and the assignment rebinds `y` to it; `x` still refers to the original `[1, 2]`. The `append` then mutates the new list. (By contrast `y += [3]` on a list mutates it in place, like `extend`, and *would* have changed `x` as well — one of the few places where `a += b` and `a = a + b` differ.)
:::
:::

## Working through a list

The `for` loop iterates over the elements of any sequence. Use the elements directly when you do not need the indices — `for m in marks:` rather than `for i in range(len(marks)):` with `marks[i]`. When you do need the index as well, `enumerate` supplies both, and to walk through two sequences in step use `zip`:

```python
names = ["Ada", "Alan", "Grace"]
years = [1815, 1912, 1906]
for i, name in enumerate(names, start=1):
    print(i, name)
for name, year in zip(names, years):
    print(f"{name:6} {year}")
pairs = list(zip(names, years))
print(pairs)
```

```console
$ python3 enum.py
1 Ada
2 Alan
3 Grace
Ada    1815
Alan   1912
Grace  1906
[('Ada', 1815), ('Alan', 1912), ('Grace', 1906)]
```

(`{name:6}` pads the name to width $6$.) An index-based loop is still the right tool when the algorithm needs positions, as when we reverse a list in place by swapping its ends.

::: algorithm Reversal in place {#alg-reverse}
**Input:** a list $xs$ of length $n$. **Effect:** reverses $xs$ in place.

1. Set $i \gets 0$ and $j \gets n - 1$.
2. While $i < j$: swap $xs[i]$ and $xs[j]$; set $i \gets i + 1$ and $j \gets j - 1$.
:::

```python
def reverse_in_place(xs):
    """Reverse the list xs in place; return None."""
    i, j = 0, len(xs) - 1
    while i < j:
        # invariant: xs[:i] and xs[j+1:] are already in their final places
        xs[i], xs[j] = xs[j], xs[i]
        i += 1
        j -= 1

data = [3, 1, 4, 1, 5, 9, 2]
reverse_in_place(data)
print(data)
```

prints `[2, 9, 5, 1, 4, 1, 3]`, and an empty list is left unchanged (the loop does not run).

::: theorem Reversal is correct {#thm-reverse}
[[#alg-reverse]] terminates after $\lfloor n/2 \rfloor$ swaps, leaving $xs[k] = a_{n-1-k}$ for every $0 \le k < n$, where $a_0, \dots, a_{n-1}$ are the original elements.
:::

::: proof
*Invariant:* $i + j = n - 1$, and for every $k < i$ and every $k > j$, $xs[k] = a_{n-1-k}$, while for $i \le k \le j$, $xs[k] = a_k$ (the middle is untouched). Initially $i = 0$, $j = n-1$, there are no $k < 0$ or $k > n - 1$, and every element is untouched. In an iteration with $i < j$, the swap puts $a_j = a_{n-1-i}$ at position $i$ and $a_i = a_{n-1-j}$ at position $j$, which are their final values; then $i$ increases and $j$ decreases by $1$, keeping $i + j = n - 1$ and moving positions $i$ and $j$ out of the untouched middle.

*Termination:* $j - i$ decreases by $2$ per iteration, so the loop stops when $j - i \le 0$, after $\lceil (n - 1)/2\rceil = \lfloor n/2\rfloor$ iterations.

*Result:* at the end $i \ge j$ with $i + j = n - 1$. Every $k$ is either $< i$, $> j$, or (when $n$ is odd) the single middle index $k = i = j = (n-1)/2$, for which $a_k = a_{n-1-k}$. So every position holds $a_{n-1-k}$.
:::

## List comprehensions

Transforming every element of a list, or keeping only some of them, is so common that Python has a special notation for it, modelled on mathematical set notation such as $\set{x^2 : x \in S,\ x \text{ odd}}$.

::: definition List comprehension {#def-comprehension}
The **list comprehension** `[expr for x in iterable if condition]` evaluates to the list of the values of `expr`, one for each item `x` of the iterable for which the condition is truthy, in order. The `if` part is optional, and several `for` (and `if`) clauses may follow one another, read from left to right as nested loops.
:::

So `[x * x for x in range(1, 20, 2)]` is `[1, 9, 25, 49, 81, 121, 169, 225, 289, 361]`, the squares of the odd numbers below $20$; `[w for w in words if len(w) > 3]` keeps the longer words; and `[(x, y) for x in range(3) for y in range(x)]` is `[(1, 0), (2, 0), (2, 1)]`. A comprehension is equivalent to a loop that appends to an empty list, but it says in one line what list is being built. With round brackets instead of square ones, `(x * x for x in xs)`, it is a **generator expression**, which produces the values one at a time without building a list; it is the natural argument for functions such as `sum`, `max` and `"".join`.

Keep comprehensions simple. When one needs nested conditions or more than two `for` clauses, an ordinary loop is clearer.

## Tuples

A **tuple** is an immutable sequence, written with commas and usually parentheses: `(3, 4)`, `("Ada", 1815)`, `(7,)` for a one-element tuple, `()` for the empty one. It supports indexing, slicing, `len`, `in` and iteration, but not assignment to elements (`t[0] = 5` raises `TypeError: 'tuple' object does not support item assignment`).

Tuples are used for fixed groups of values whose positions have meanings — a coordinate pair, a date, a row of a table — whereas lists are used for variable-length collections of similar things. You have used tuples since [[programming-1/computation-and-programs]] without naming them: `a, b = b, a % b` builds the tuple `(b, a % b)` and **unpacks** it into `a` and `b`. Functions return several results the same way: `return min(xs), max(xs)` returns a tuple, and `lo, hi = min_max(xs)` unpacks it. Because tuples are immutable they can be used where a value must not change, for example as keys of dictionaries in [[programming-1/dictionaries-sets]].

## Strings

A string is an immutable sequence of characters, so everything about indexing and slicing applies: with `s = "programming"`, `s[0]` is `'p'`, `s[3:7]` is `'gram'`, `s[-3:]` is `'ing'` and `s[::-1]` is `'gnimmargorp'`. Immutability means that string methods never change a string — they return a new one — and assigning to `s[0]` raises `TypeError`.

Python strings are sequences of **Unicode** characters, so `"naïve"` has length $5$ and `"ß".upper()` is `'SS'`. `ord(c)` gives a character's Unicode code point (`ord("A")` is `65`) and `chr(n)` the character with code point $n$ (`chr(97)` is `'a'`). How characters are stored as bytes (the UTF-8 encoding) matters when reading files, and is taken up in [[programming-1/files-exceptions]].

The most useful string methods for processing text are

| method | example | result |
|---|---|---|
| `s.split()` | `"  a  b c ".split()` | `['a', 'b', 'c']` (split on runs of whitespace) |
| `s.split(sep)` | `"a,b,,c".split(",")` | `['a', 'b', '', 'c']` |
| `sep.join(xs)` | `"-".join(["2026", "10", "27"])` | `'2026-10-27'` |
| `s.strip()` | `"  hi \n".strip()` | `'hi'` |
| `s.lower()`, `s.upper()` | `"Ada".lower()` | `'ada'` |
| `s.replace(a, b)` | `"a-b-c".replace("-", "+")` | `'a+b+c'` |
| `s.find(t)` | `"programming".find("gram")` | `3` (or `-1` if absent) |
| `s.startswith(t)`, `s.endswith(t)` | `"report.pdf".endswith(".pdf")` | `True` |
| `t in s` | `"gram" in "programming"` | `True` (substring test) |

::: example Parsing a record {#ex-record}
A line of a data file reads `"Lovelace, Ada ,1815, London"`. Split it into fields, remove the stray spaces, and print a sentence using the fields, with the year as an integer.
::: solution
```python
record = "Lovelace, Ada ,1815, London"
fields = [f.strip() for f in record.split(",")]
surname, forename, year, city = fields      # unpack a list of four strings
born = int(year)
print(f"{forename} {surname} was born in {city} in {born}.")
print(fields)
```

```console
$ python3 record.py
Ada Lovelace was born in London in 1815.
['Lovelace', 'Ada', '1815', 'London']
```

`split(",")` cuts the string at every comma, giving `['Lovelace', ' Ada ', '1815', ' London']`; the comprehension strips the spaces from each field. Unpacking into four names fails with `ValueError` if the line has a different number of fields — which is useful: malformed data is caught at once rather than silently mangled. Real comma-separated files allow commas inside quoted fields, so for them use the standard module `csv` rather than `split`.
:::
:::

::: example Words in a sentence {#ex-words}
Split `"  The quick brown fox jumps over the lazy dog  "` into words; find how many there are, their lengths and the longest; and print the sentence with each word capitalised.
::: solution
```python
line = "  The quick brown fox jumps over the lazy dog  "
words = line.split()                       # split on runs of whitespace
print(len(words), words[:3])
lengths = [len(w) for w in words]
longest = max(words, key=len)
print(lengths, longest)
print(" ".join(w.capitalize() for w in words))
```

```console
$ python3 words.py
9 ['The', 'quick', 'brown']
[3, 5, 5, 3, 5, 4, 3, 4, 3] quick
The Quick Brown Fox Jumps Over The Lazy Dog
```

`max(words, key=len)` compares the words by length and returns the *first* longest one, `'quick'`, though `'brown'` and `'jumps'` are as long. Building the output with `" ".join(...)` rather than repeated `+` is both clearer and, for long texts, much faster, for the reason explained next.
:::
:::

## What operations cost

Lists are stored as a block of consecutive memory slots, each holding a reference to an element, with some spare slots at the end. This layout makes some operations fast and others slow, and a programmer should know which. In the following, $n$ is the length of the list; "constant time" means a cost that does not grow with $n$.

- `xs[i]`, `xs[i] = v`, `len(xs)`: constant time — the address of slot $i$ is computed directly.
- `xs.append(v)`, `xs.pop()`: constant time on average (**amortised**). When the spare slots run out, CPython allocates a larger block, about $1.125$ times the size, and copies the references across; the occasional copy is paid for by the many cheap appends between copies.
- `xs.insert(0, v)`, `xs.pop(0)`: time proportional to $n$, because every element after the position must shift one slot.
- `v in xs`, `xs.index(v)`, `xs.remove(v)`: up to $n$ comparisons, because the list must be searched from the start.
- `xs[i:j]`, `xs + ys`, `xs[:]`: time proportional to the length of the result, since a new list is built.

These costs compound inside loops. Building a list of $n$ elements by inserting each at the front shifts $0 + 1 + \dots + (n-1) = n(n-1)/2$ elements in total, whereas appending shifts none:

::: widget plot
f: x*(x - 1)/2; x
x: 0, 1000
y: 0, 500000
labels: \text{insert at front: } n(n-1)/2 \text{ shifts}; \text{append: } n \text{ operations}
caption: Total work to build a list of $n$ elements one at a time, counted in element moves for `insert(0, v)` and in operations for `append(v)`. The quadratic curve leaves the linear one far behind: at $n = 1000$ inserting at the front costs $499{,}500$ shifts. Doubling $n$ roughly quadruples the quadratic cost — try reading off $n = 500$ and $n = 1000$.
:::

As an observation (one run with CPython 3.14 on a 2026 desktop computer; your times will differ), building lists of $10{,}000$, $20{,}000$ and $40{,}000$ elements took $0.016$, $0.059$ and $0.315$ seconds by inserting at the front, but only $0.0004$, $0.0008$ and $0.0014$ seconds by appending. The first set roughly quadruples with each doubling of $n$ and the second roughly doubles, as the model predicts.

Strings are immutable, so `s = s + "x"` must in general build a new string and copy the old one into it, and a loop that grows a string by `+` can take quadratic time in the same way. (CPython sometimes avoids the copy as an optimisation, but you should not rely on it.) The idiom is to collect the pieces in a list and join them once: `"".join(pieces)` takes time proportional to the total length.

::: warning Modifying a list while iterating over it
Removing elements from a list inside a `for` loop over the same list skips elements: after `xs.remove(x)` every later element shifts left by one, but the loop's hidden index moves on, so the element that slid into the current position is never examined. For example, removing every even number from `[2, 4, 5, 6]` this way leaves `[4, 5]`. Build a new list instead — `xs = [x for x in xs if x % 2 != 0]` — or iterate over a copy, `for x in xs[:]:`.
:::

::: history
Lists as a basic data type go back to the Information Processing Language of Allen Newell, Cliff Shaw and Herbert Simon (1956) and to John McCarthy's LISP (1958–1960), whose name abbreviates "list processing". Arrays — fixed-size sequences indexed by integers — were built into FORTRAN (1957), which numbered from $1$. Edsger Dijkstra's note "Why numbering should start at zero" (EWD 831, 1982) gave the argument for half-open ranges and zero-based indices used in this chapter. Python's list comprehensions, added in Python 2.0 (2000), were adapted from the functional languages SETL and Haskell. Unicode, the standard for representing the characters of the world's writing systems, published its first version in 1991; Python 3 (2008) made every string a Unicode string.
:::

## Where this leads

Sequences give us the first data structure with a cost model, and the next chapters build on it: [[programming-1/dictionaries-sets]] introduces collections that find an element by key without searching, and [[programming-1/files-exceptions]] reads sequences of lines from files. The costs listed above — constant-time indexing, amortised appends, linear search — are analysed properly in [[data-structures]], where dynamic arrays, linked lists and their trade-offs are the first topic, and sorting a list, here a single call to `sorted`, becomes one of the central problems of [[algorithms]].

::: summary
- Lists, tuples and strings are **sequences**: indexed from $0$, with negative indices counting from the end and half-open slices `xs[i:j]` that never raise `IndexError` ([[#def-index]], [[#def-slice]]).
- Lists are **mutable** (`append`, `insert`, `pop`, `remove`, item assignment, `sort`); tuples and strings are **immutable**, and their operations return new objects.
- Assignment binds names to objects and never copies. Two names for one mutable object are **aliases** ([[#def-alias]]); copy with `xs[:]` or `list(xs)`, remembering that such copies are shallow. Functions receive the caller's objects, so they can mutate them.
- Use `for x in xs`, `enumerate` and `zip` to iterate; **list comprehensions** build lists by transforming and filtering ([[#def-comprehension]]).
- Tuples group fixed collections of values and make multiple assignment and multiple return values work.
- String methods `split`, `join`, `strip`, `replace`, `find` and `lower` do most text processing; build long strings with `join`.
- Indexing and `append` take constant (amortised) time; `insert(0, …)`, `in` and `remove` take time proportional to the length.
:::

## Exercises

::: exercise Slices of a string {level=1 check="6"}
Let `s = "programming"`. Give `s[3:7]`, `s[-3:]`, `s[::2]` and `s[::-1]`. (Enter the length of `s[::2]`.)
::: solution
`s[3:7]` is `'gram'` (indices 3 to 6), `s[-3:]` is `'ing'`, `s[::2]` takes indices $0, 2, 4, 6, 8, 10$ and is `'pormig'`, and `s[::-1]` is `'gnimmargorp'`. The string has $11$ characters, and every second one starting from index $0$ gives $\lceil 11/2\rceil = 6$ characters.
:::
:::

::: exercise Who sees the change? {level=1}
Predict the output, then explain it in terms of names and objects.

```python
p = [1, 2, 3]
q = p
r = list(p)
q[0] = 99
r.append(4)
print(p, q, r)
```
::: solution
It prints `[99, 2, 3] [99, 2, 3] [1, 2, 3, 4]`. `q = p` makes `q` an alias of the list that `p` refers to, so the item assignment through `q` changes the one shared list. `list(p)` builds a new list with the same elements, so `r` is independent: appending to it affects neither `p` nor `q`.
:::
:::

::: exercise A comprehension {level=1 check="1330"}
Write a list comprehension for the squares of the odd numbers from $1$ to $19$, and use `sum` to add them. (Enter the sum.)
::: solution
`[x * x for x in range(1, 20, 2)]` is `[1, 9, 25, 49, 81, 121, 169, 225, 289, 361]`, and `sum(x * x for x in range(1, 20, 2))` is $1330$. As a check, the sum of the squares of the first $m$ odd numbers is $m(2m-1)(2m+1)/3$, which for $m = 10$ is $10 \cdot 19 \cdot 21/3 = 1330$.
:::
:::

::: exercise Rotation by slicing {level=2}
Write a function `rotate(xs, k)` that returns a new list with the elements of `xs` moved $k$ places to the left, cyclically, for any integer `k` (negative means to the right). For example `rotate([1, 2, 3, 4, 5], 2)` is `[3, 4, 5, 1, 2]`. Prove that your function returns a list whose element at index $i$ is `xs[(i + k) % n]`.
::: solution
```python
def rotate(xs, k):
    """Rotate xs left by k places (right if k < 0); return a new list."""
    if not xs:
        return []
    k = k % len(xs)          # now 0 <= k < n, and the rotation is the same
    return xs[k:] + xs[:k]

print(rotate([1, 2, 3, 4, 5], 2), rotate([1, 2, 3, 4, 5], -1), rotate([1, 2, 3], 7))
```

This prints `[3, 4, 5, 1, 2] [5, 1, 2, 3, 4] [2, 3, 1]`. *Proof.* Let $n = $ `len(xs)` $\ge 1$ and $k' = k \bmod n$, so $0 \le k' < n$ by [[programming-1/values-types#thm-division]], and $(i + k) \bmod n = (i + k') \bmod n$. The result is `xs[k':]` (length $n - k'$) followed by `xs[:k']`. For $0 \le i < n - k'$ its element at $i$ is `xs[i + k']`, and $i + k' < n$ so $i + k' = (i + k') \bmod n$. For $n - k' \le i < n$ its element at $i$ is `xs[i - (n - k')]` $=$ `xs[i + k' - n]`, and $0 \le i + k' - n < n$, so again this is `xs[(i + k') % n]`.
:::
:::

::: exercise The grid again {level=2}
Explain why `[[0] * 3] * 3` creates aliased rows but `[[0] * 3 for _ in range(3)]` does not. Would `[[0] * 3, [0] * 3, [0] * 3]` be safe?
::: solution
`[[0] * 3] * 3` evaluates the inner expression `[0] * 3` *once*, producing one row object, and then repetition puts three references to that one object into the outer list. The comprehension evaluates `[0] * 3` once per iteration, producing three distinct row objects. The explicit list `[[0] * 3, [0] * 3, [0] * 3]` also evaluates the inner expression three times, so it creates three distinct rows and is safe. The rule: each evaluation of a list display or comprehension creates a new list; repetition with `*` and assignment never do.
:::
:::

::: exercise Counting shifts {level=2 check="499500"}
A program builds a list of $1000$ elements by calling `xs.insert(0, v)` $1000$ times, starting from an empty list. Each insertion shifts every element already present one place right. How many shifts happen in total? (Enter the number.)
::: solution
The $k$-th insertion ($k = 1, \dots, 1000$) finds $k - 1$ elements present and shifts them all, so the total is $0 + 1 + \dots + 999 = \dfrac{999 \cdot 1000}{2} = 499{,}500$. Appending instead would shift nothing. If the elements must end up in reverse order, append them and call `reverse()` once at the end, which takes time proportional to $n$.
:::
:::

::: exercise Merging sorted lists {level=3}
Write a function `merge(xs, ys)` that takes two lists sorted in non-decreasing order and returns a single sorted list containing all their elements, using at most `len(xs) + len(ys)` comparisons and no call to `sort` or `sorted`. Prove it correct with a loop invariant.
::: solution
```python
def merge(xs, ys):
    """Merge two sorted lists into one sorted list."""
    out = []
    i = j = 0
    while i < len(xs) and j < len(ys):
        # invariant: out is sorted, holds xs[:i] and ys[:j], and every element
        # of out is <= every element of xs[i:] and of ys[j:]
        if xs[i] <= ys[j]:
            out.append(xs[i])
            i += 1
        else:
            out.append(ys[j])
            j += 1
    out.extend(xs[i:])      # at most one of these two is non-empty
    out.extend(ys[j:])
    return out

print(merge([1, 4, 9, 10], [2, 3, 9, 12, 15]))
print(merge([], [5, 6]), merge([7], []))
```

```console
$ python3 merge.py
[1, 2, 3, 4, 9, 9, 10, 12, 15]
[5, 6] [7]
```

*Invariant* (as in the comment). Initially `out` is empty and $i = j = 0$, so it holds trivially. Suppose it holds and both lists have elements left, with say `xs[i] <= ys[j]`. Because `xs` is sorted, `xs[i]` is the smallest element of `xs[i:]`, and it is at most `ys[j]`, the smallest of `ys[j:]`; so `xs[i]` is at most every remaining element. Appending it keeps `out` sorted (every element of `out` was $\le$ `xs[i]` by the invariant) and keeps the third clause true. The other case is symmetric.

*Termination:* $i + j$ increases by one per iteration and is at most `len(xs) + len(ys)`, and each iteration makes one comparison, so there are at most that many comparisons. *Result:* when the loop ends one list is exhausted; the remaining elements of the other are sorted and, by the invariant, at least every element of `out`, so extending by them gives a sorted list containing every element exactly once. Merging is the core of merge sort in [[algorithms]].
:::
:::

::: exercise Run-length encoding {level=3}
Write a function `run_length(s)` that returns the list of `(character, count)` pairs for the maximal runs of equal characters in `s`, so that `run_length("aaabcc")` is `[('a', 3), ('b', 1), ('c', 2)]`, and use it to write `encode(s)`, giving `'6W3B4W'` for `"WWWWWWBBBWWWW"`. What does your function return for the empty string?
::: solution
```python
def run_length(s):
    """Run-length encoding: 'aaabcc' -> [('a', 3), ('b', 1), ('c', 2)]."""
    runs = []
    for ch in s:
        if runs and runs[-1][0] == ch:
            runs[-1] = (ch, runs[-1][1] + 1)    # tuples are immutable: replace it
        else:
            runs.append((ch, 1))
    return runs

def encode(s):
    return "".join(f"{count}{ch}" for ch, count in run_length(s))

print(run_length("aaabcc"))
print(encode("WWWWWWBBBWWWW"), encode(""))
```

```console
$ python3 rle.py
[('a', 3), ('b', 1), ('c', 2)]
6W3B4W 
```

The condition `runs and runs[-1][0] == ch` relies on short-circuiting: for the first character `runs` is empty (falsy) and `runs[-1]` is never evaluated, which would otherwise raise `IndexError`. A run's count cannot be incremented in place because tuples are immutable, so the last pair is replaced by a new one. The empty string gives `[]` and the empty encoding `''` (the output line ends after the space printed between the two values). The invariant of the loop is that `runs` is the run-length encoding of the characters processed so far.
:::
:::
