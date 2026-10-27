A list answers the question "what is the 5th element?" instantly. It answers the question "what is Grace's phone number?" only by searching — looking at every entry in turn until it finds Grace — and the search takes longer the longer the list. Much of programming is about the second kind of question: the number of a name, the price of a product code, the count of a word, the set of students taking a course, whether an e-mail address has been seen before. For these we want a collection organised by **key** rather than by position, in which looking something up takes about the same time whether the collection holds ten items or ten million.

Python has two such collections built in. A **dictionary** maps keys to values, like a phone book mapping names to numbers. A **set** is an unordered collection of distinct items, like a mathematical set, and answers membership questions quickly. Both are implemented by **hash tables**, one of the most important data structures in computing. This chapter shows how to use them — for looking up, counting, grouping and comparing data — explains in outline why they are fast and what that requires of their keys, and ends with advice on choosing the right collection for a job.

## Dictionaries

::: definition Dictionary {#def-dict}
A **dictionary** (type `dict`) is a mutable collection of **key–value pairs** in which each key occurs at most once. It is written `{key_1: value_1, ..., key_n: value_n}`, and `{}` is the empty dictionary. For a dictionary `d`:

- `d[k]` is the value associated with key `k`, and raises `KeyError` if `k` is not a key;
- `d[k] = v` associates `v` with `k`, adding the key if it is new and replacing the old value otherwise;
- `k in d` tests whether `k` is a key, `len(d)` is the number of pairs, and `del d[k]` removes a pair;
- `d.get(k, default)` is `d[k]` if `k` is a key and `default` (or `None`) otherwise.

Keys must be **hashable** (in practice: immutable — numbers, strings, tuples of hashable values); values may be anything.
:::

Mathematically, a dictionary is a finite function from its set of keys to values. Iterating over a dictionary visits its keys in **insertion order** — the order in which they were first added, a guarantee of the language since Python 3.7. The methods `d.keys()`, `d.values()` and `d.items()` give the keys, the values and the `(key, value)` pairs.

::: example A phone book {#ex-phone}
Trace this program and explain each line of output. (The numbers are in a range reserved for fiction.)

```python
phone = {"Ada": "01632 960001", "Alan": "01632 960002"}
phone["Grace"] = "01632 960003"        # add a new key
phone["Ada"] = "01632 960999"          # replace the value for an existing key
print(phone["Alan"])
print(len(phone), "Grace" in phone, "Edsger" in phone)
print(phone.get("Edsger"), phone.get("Edsger", "unknown"))
del phone["Alan"]
for name, number in phone.items():
    print(name, number)
print(phone["Edsger"])
```
::: solution
```console
$ python3 phone.py
01632 960002
3 True False
None unknown
Ada 01632 960999
Grace 01632 960003
Traceback (most recent call last):
  File ".../phone.py", line 10, in <module>
    print(phone["Edsger"])
          ~~~~~^^^^^^^^^^
KeyError: 'Edsger'
```

After the first three lines the dictionary has three keys: `"Grace"` was added, and assigning to the existing key `"Ada"` replaced its value rather than adding a second entry. `in` tests keys, not values. `get` returns `None`, or the supplied default, for a missing key instead of raising an error. After `del`, the loop over `items()` visits the two remaining pairs in insertion order — `"Ada"` keeps its original position even though its value was replaced. The last line asks for a missing key with square brackets and stops the program with `KeyError`: use `[]` when the key *must* be present (a missing key is then a bug, and you want to hear about it) and `get` when absence is normal.
:::
:::

### Counting

The most common use of a dictionary is to **count** things: for each distinct item, how many times does it occur?

::: algorithm Counting with a dictionary {#alg-count}
**Input:** a sequence of hashable items $x_1, \dots, x_n$. **Output:** a dictionary $c$ with $c[x]$ equal to the number of occurrences of $x$, for each distinct item $x$.

1. Set $c \gets$ an empty dictionary.
2. For each item $x$ in order: set $c[x] \gets c.\mathrm{get}(x, 0) + 1$.
3. Return $c$.
:::

The invariant is that after processing $x_1, \dots, x_k$, the keys of $c$ are exactly the distinct items among them and $c[x]$ counts the occurrences of $x$ among them. The expression `c.get(x, 0)` handles both cases at once: an item seen before has its count increased, and a new item enters with count $0 + 1$.

::: example Word frequencies {#ex-wordcount}
Count the words in the opening of *A Tale of Two Cities*, ignoring case and commas, and list the three most frequent.
::: solution
```python
text = """It was the best of times, it was the worst of times,
it was the age of wisdom, it was the age of foolishness"""

counts = {}
for word in text.lower().replace(",", " ").split():
    counts[word] = counts.get(word, 0) + 1     # 0 if the word is new

print(counts)
top = sorted(counts.items(), key=lambda pair: pair[1], reverse=True)
print(top[:3])
```

```console
$ python3 wordcount.py
{'it': 4, 'was': 4, 'the': 4, 'best': 1, 'of': 4, 'times': 2, 'worst': 1, 'age': 2, 'wisdom': 1, 'foolishness': 1}
[('it', 4), ('was', 4), ('the', 4)]
```

The string is lower-cased, commas are replaced by spaces, and `split` cuts it into $24$ words — the triple-quoted string spans two lines, and the newline counts as whitespace. To find the most frequent words we sort the `(word, count)` pairs by their second component, largest first. Python's sort is **stable**: items with equal keys keep their original order, so the four words with count $4$ appear in the order they were first seen and `'of'`, the fourth, is cut off by the slice. The standard library packages this pattern as `collections.Counter`: `Counter(words).most_common(3)` gives the same three pairs.
:::
:::

### Grouping

A dictionary whose values are lists **groups** items by some property — students by tutor group, files by extension, words by their first letter. The method `d.setdefault(k, default)` returns `d[k]` if `k` is a key, and otherwise first sets `d[k] = default`; it makes grouping a one-liner.

::: example Anagram classes {#ex-anagrams}
Group the words `listen`, `silent`, `enlist`, `google`, `banana`, `inlets`, `gogole` and `tinsel` into classes of **anagrams** (words with the same letters in a different order).
::: solution
Two words are anagrams exactly when sorting their letters gives the same result, so the sorted letters make a good key.

```python
words = ["listen", "silent", "enlist", "google", "banana", "inlets", "gogole", "tinsel"]

groups = {}
for w in words:
    key = "".join(sorted(w))            # anagrams have the same sorted letters
    groups.setdefault(key, []).append(w)

for key, members in groups.items():
    print(key, members)
```

```console
$ python3 anagrams.py
eilnst ['listen', 'silent', 'enlist', 'inlets', 'tinsel']
eggloo ['google', 'gogole']
aaabnn ['banana']
```

`sorted(w)` returns the letters of `w` as a sorted list, such as `['e', 'i', 'l', 'n', 's', 't']`, and `"".join` turns it back into a string, which (unlike a list) can be a dictionary key. Finding all anagram classes this way processes each word once; comparing every pair of words instead would need $\binom{8}{2} = 28$ comparisons here and about $n^2/2$ for $n$ words.
:::
:::

## How dictionaries work, in outline

Why can a dictionary find a key without searching? The idea, called **hashing**, is to compute *where* a key should be stored from the key itself.

::: definition Hash function and hash table {#def-hash}
A **hash function** maps each key to an integer, its **hash**, such that equal keys always have equal hashes. A **hash table** stores its entries in an array of $m$ slots and keeps the entry with key $k$ at, or near, slot $\mathit{hash}(k) \bmod m$. Two different keys whose hashes give the same slot are said to **collide**; the table must resolve collisions, for example by trying a sequence of other slots.
:::

Python's built-in `hash` computes the hash of any hashable value. To look up a key, a dictionary computes its hash, goes straight to the corresponding slot and compares the key found there; only if there is a collision does it have to look further. If the hash function spreads keys evenly and the table is never allowed to get too full — CPython enlarges a dictionary's table, re-inserting every entry, whenever it becomes about two-thirds full — then on average only a small, constant number of slots is examined, however many entries there are. Looking up, inserting and deleting therefore take **expected constant time**. The full analysis, with different collision strategies, is in [[data-structures]].

Collisions cannot be avoided, even with a perfect hash function. This is the "birthday paradox": in a room of only $23$ people, the probability that two share a birthday is already above one half.

::: widget plot
f: 1 - exp(-x*(x - 1)/(2*m))
x: 0, 100
y: 0, 1
sliders: m=365:50:2000:1
hlines: 0.5
vlines: 23
labels: P(\text{some collision among } n \text{ keys})
caption: The probability that $n$ keys placed independently and uniformly at random into $m$ slots include at least one collision, using the standard approximation $1 - e^{-n(n-1)/(2m)}$. With $m = 365$ (birthdays) the curve crosses $\tfrac12$ near $n = 23$. Increase $m$: the number of keys at which a collision becomes likely grows only like $\sqrt{m}$, so any hash table with more than a handful of keys must expect collisions and handle them.
:::

Hashing explains the rule about keys. A key's hash determines where its entry is stored, so if a key could change after insertion, its hash would change and the entry would be in the wrong place, never to be found again. Python therefore refuses mutable keys:

```python
d = {}
d[(1, 2)] = 3          # a tuple of numbers is hashable
print(d)
d[[1, 2]] = 3          # a list is not
```

```console
$ python3 unhashable.py
{(1, 2): 3}
Traceback (most recent call last):
  File ".../unhashable.py", line 4, in <module>
    d[[1, 2]] = 3          # a list is not
    ~^^^^^^^^
TypeError: cannot use 'list' as a dict key (unhashable type: 'list')
```

(The exact wording of the message is that of Python 3.14.) A tuple of immutable values is hashable, so coordinates, dates and other compound keys are written as tuples.

::: warning "Dictionary operations are always constant time"
Constant time is an *expected* cost, under the assumption that hashes are well spread. It is not a worst-case guarantee: if many keys collide, every operation degrades towards a search through the colliding entries, which takes time proportional to their number. Pathological collisions can even be caused on purpose — in 2011 researchers showed that web servers in several languages could be slowed to a crawl by request data crafted to collide. Since Python 3.3, the hashes of strings and bytes are **randomised** with a secret per-process key (SipHash since Python 3.4) to defend against this, which is also why the order in which a *set* of strings is printed can change from one run of a program to the next. Dictionaries keep insertion order regardless.
:::

::: quiz
Which of these can be used as dictionary keys?
- [x] `"user@example.com"`
- [x] `(2026, 10, 27)`
- [ ] `[2026, 10, 27]`
- [x] `3.5`
- [ ] `{"a": 1}`
::: solution
Strings, tuples of numbers and floats are immutable and hashable. Lists and dictionaries are mutable, so they are unhashable and cannot be keys (they can, of course, be *values*). Floats are allowed but rarely a good idea as keys, because two computations that "should" give the same number may differ in the last bit ([[programming-1/values-types#prop-tenth]]).
:::
:::

## Sets

::: definition Set {#def-set}
A **set** (type `set`) is a mutable, unordered collection of distinct hashable items, written `{item_1, ..., item_n}`; the empty set is `set()`, because `{}` is an empty dictionary. `x in s` tests membership in expected constant time; `s.add(x)` inserts, `s.remove(x)` deletes (raising `KeyError` if absent) and `s.discard(x)` deletes if present. For sets `a` and `b`:

| operation | meaning |
|---|---|
| `a \| b` | union $a \cup b$ |
| `a & b` | intersection $a \cap b$ |
| `a - b` | difference $a \setminus b$ |
| `a ^ b` | symmetric difference: in exactly one of them |
| `a <= b` | subset $a \subseteq b$ |
:::

A set is a dictionary with keys and no values, and it is implemented the same way. `set(xs)` builds the set of distinct elements of a sequence, so `len(set(xs))` counts distinct values; set comprehensions such as `{x % 7 for x in range(20)}` work like list comprehensions. There is also an immutable, hashable variant, `frozenset`, which can be an element of another set or a dictionary key.

::: example Course enrolments {#ex-enrol}
Four students take mathematics and four take physics. Who takes both? Either? Only one?
::: solution
```python
maths = {"Ada", "Alan", "Grace", "John"}
physics = {"Alan", "Emmy", "John", "Marie"}
print(sorted(maths & physics))      # intersection: in both
print(sorted(maths | physics))      # union: in either
print(sorted(maths - physics))      # difference: in maths but not physics
print(sorted(maths ^ physics))      # symmetric difference: in exactly one
print({"Ada", "Grace"} <= maths, len(maths | physics))
```

```console
$ python3 sets.py
['Alan', 'John']
['Ada', 'Alan', 'Emmy', 'Grace', 'John', 'Marie']
['Ada', 'Grace']
['Ada', 'Emmy', 'Grace', 'Marie']
True 6
```

Because sets have no order, and string hashes are randomised, printing a set of strings directly shows its elements in an order that may change from run to run. `sorted` turns each set into a list in a fixed order, which makes output reproducible — important when output is compared in tests. The counts satisfy inclusion–exclusion: $\lvert M \cup P\rvert = \lvert M\rvert + \lvert P\rvert - \lvert M \cap P\rvert = 4 + 4 - 2 = 6$.
:::
:::

::: widget venn
sets: 2
expr: (M - P) | (P - M)
labels: M; P
caption: The symmetric difference `maths ^ physics`, students taking exactly one of the two subjects ($M$ for mathematics, $P$ for physics), written as $(M \setminus P) \cup (P \setminus M)$. Type other expressions — `M & P`, `M | P`, `M - P` — to see the other operations of [[#ex-enrol]]. Set algebra in Python follows the laws of [Maths Atlas: sets](/learn/maths/lesson.php?c=proofs&l=sets) exactly.
:::

Fast membership testing changes what algorithms are practical. As an observation (one run with CPython 3.14, 2026; times vary by machine), $1000$ membership tests for numbers near the end of a list of $100{,}000$ numbers took about $0.6$ seconds, and the same tests on a set of those numbers about $0.0001$ seconds — some four orders of magnitude faster, because each list test scans almost the whole list.

::: algorithm Pair with a given sum {#alg-twosum}
**Input:** a sequence $x_1, \dots, x_n$ of numbers and a target $t$. **Output:** whether there are indices $i < j$ with $x_i + x_j = t$.

1. Set $S \gets \emptyset$.
2. For $j = 1, \dots, n$:
   1. If $t - x_j \in S$, return true.
   2. Add $x_j$ to $S$.
3. Return false.
:::

```python
def has_pair_with_sum(xs, target):
    """True if two elements at different positions of xs add up to target."""
    seen = set()
    for x in xs:
        # invariant: seen is the set of elements before x, and no two of them sum to target
        if target - x in seen:
            return True
        seen.add(x)
    return False

print(has_pair_with_sum([8, 3, 11, 5, 2], 13))   # 8 + 5
print(has_pair_with_sum([8, 3, 11, 5, 2], 20))
print(has_pair_with_sum([5], 10), has_pair_with_sum([5, 5], 10))
```

```console
$ python3 twosum.py
True
False
False True
```

::: theorem Correctness of the pair search {#thm-twosum}
[[#alg-twosum]] returns true if and only if some $i < j$ have $x_i + x_j = t$. It performs $n$ set insertions and at most $n$ membership tests, so it takes expected time proportional to $n$.
:::

::: proof
*Invariant:* at the start of iteration $j$, $S = \set{x_1, \dots, x_{j-1}}$ and no pair $i < i' \le j - 1$ has $x_i + x_{i'} = t$. Initially $S$ is empty and there are no pairs. In iteration $j$, if $t - x_j \in S$ then $t - x_j = x_i$ for some $i < j$, so $x_i + x_j = t$ and returning true is correct. Otherwise no $i < j$ has $x_i = t - x_j$, so no pair ending at $j$ sums to $t$; together with the invariant, no pair with both indices at most $j$ does, and adding $x_j$ to $S$ restores the invariant for $j + 1$. If the loop finishes, the invariant for $j = n + 1$ says no pair sums to $t$, so returning false is correct. Each iteration does one test and at most one insertion.
:::

The obvious alternative — try every pair $i < j$ — makes $n(n-1)/2$ additions, which for $n = 10^5$ is about $5 \times 10^9$. The set version trades memory (the set holds up to $n$ items) for time, a trade that recurs throughout [[algorithms]]. Note how the case `[5]` with target $10$ is handled: $10 - 5 = 5$ is tested *before* $5$ is added, so an element is never paired with itself.

## Inverting a dictionary

A dictionary maps keys to values. Can it be turned round, to map each value back to its key? Only if no two keys share a value.

::: proposition When a dictionary can be inverted {#prop-invert}
Let $d$ be a dictionary with keys $K$, viewed as a function $d \colon K \to V$. There is a dictionary $e$ with $e[d[k]] = k$ for every $k \in K$ if and only if $d$ is **injective**: $d[k] \neq d[k']$ whenever $k \neq k'$.
:::

::: proof
If $d$ is injective, define $e$ by setting $e[d[k]] = k$ for each $k$; no value $d[k]$ is assigned twice, because distinct keys have distinct values, so $e[d[k]] = k$ for every $k$. Conversely, if $d[k] = d[k'] = v$ with $k \neq k'$, then any $e$ satisfying the condition would need both $e[v] = k$ and $e[v] = k'$, which is impossible because a dictionary has one value per key.
:::

When $d$ is not injective, the natural replacement maps each value to the *list* (or set) of keys that have it — grouping again:

```python
def invert(d):
    """Map each value of d to the sorted list of keys that have that value."""
    inverse = {}
    for key, value in d.items():
        inverse.setdefault(value, []).append(key)
    return {v: sorted(ks) for v, ks in inverse.items()}

capital = {"France": "Paris", "Japan": "Tokyo", "Peru": "Lima"}
pets = {"Rex": "dog", "Tom": "cat", "Fido": "dog"}
print(invert(capital))
print(invert(pets))
```

```console
$ python3 invert.py
{'Paris': ['France'], 'Tokyo': ['Japan'], 'Lima': ['Peru']}
{'dog': ['Fido', 'Rex'], 'cat': ['Tom']}
```

The last line of `invert` is a **dictionary comprehension**, `{key_expr: value_expr for ...}`, the dictionary counterpart of a list comprehension.

::: widget mapping
domain: Rex; Tom; Fido
codomain: dog; cat
map: Rex>dog; Tom>cat; Fido>dog
caption: The dictionary `pets` as an arrow diagram from keys to values. It is not injective — two arrows arrive at `dog` — so by [[#prop-invert]] it has no inverse dictionary, only the grouped inverse `{'dog': ['Fido', 'Rex'], 'cat': ['Tom']}`. Drag the arrow from `Fido` to `cat`: the map is still not injective. A dictionary is invertible exactly when the figure reports it injective.
:::

::: quiz
After `d = {"a": 1, "b": 2, "c": 1}` and `e = {v: k for k, v in d.items()}`, what is `e`?
- [ ] `{1: "a", 2: "b"}`
- [x] `{1: "c", 2: "b"}`
- [ ] `{1: ["a", "c"], 2: ["b"]}`
- [ ] It raises an error because the values are not distinct.
::: solution
The comprehension processes the pairs in insertion order: `e[1] = "a"`, then `e[2] = "b"`, then `e[1] = "c"`, which *replaces* the earlier value. No error is raised — information is silently lost. The key `1` stays in its original position, so `e` prints as `{1: 'c', 2: 'b'}`. This is [[#prop-invert]] in action: an inversion is faithful only for injective dictionaries.
:::
:::

## Choosing a collection

Python's four built-in collections cover most needs. The choice depends on how the data will be *used*.

| collection | ordered by | mutable | duplicates | fast operations | typical use |
|---|---|---|---|---|---|
| `list` | position | yes | yes | index, append | a sequence of similar items: readings, a queue of tasks |
| `tuple` | position | no | yes | index | a fixed record: a coordinate, a row, a compound key |
| `dict` | key (insertion order) | yes | keys unique | look up, insert, delete by key | a mapping: counts, an index, records by ID |
| `set` | none | yes | no | membership, union, intersection | distinct items, "have we seen this?" |

Real programs usually combine them: a list of dictionaries for a table of records (`[{"name": "Ada", "born": 1815}, …]`), a dictionary of lists for groups, a dictionary of dictionaries for nested settings, a set of tuples for visited grid positions. This is the shape of JSON, the most common format for exchanging data between programs, which Python reads into exactly these types with the standard module `json`.

::: warning Searching a list where a set or dictionary belongs
A loop that tests `if x in some_list:` for each of $n$ items, with a list that grows to $n$ elements, does about $n^2/2$ comparisons. With a set it does about $n$ hash lookups. Whenever a program repeatedly asks "is this present?" or "what is stored under this name?", the collection should be a set or a dictionary — this single change is one of the most common large speed-ups in practice. Conversely, a dictionary keyed by $0, 1, 2, \dots$ is just a slower list.
:::

::: history
Hashing was invented independently several times in the early 1950s; Hans Peter Luhn wrote an internal IBM memorandum describing hashing with chaining in 1953, and Gene Amdahl, Elaine McGraw, Nathaniel Rochester and Arthur Samuel developed open addressing with linear probing at IBM at about the same time. The first published analysis was by Arnold Dumey in 1956, and W. Wesley Peterson's 1957 paper studied open addressing in depth. Associative arrays became a built-in language feature in SNOBOL4 (1967) and later in AWK (1977) and Perl (1987). Python has had dictionaries since its first release in 1991 and gained a built-in `set` type in version 2.4 (2004). The compact, insertion-ordered dictionary layout was introduced in CPython 3.6 (2016) and its ordering made part of the language in Python 3.7 (2018).
:::

## Where this leads

Dictionaries and sets make many programs short and fast; the next chapter, [[programming-1/files-exceptions]], uses them to analyse data read from files. How hash tables really work — hash functions, chaining and open addressing, load factors and resizing, and the proof that operations take expected constant time — is a central topic of [[data-structures]], and the use of keyed lookups at scale returns in [[databases]] (indexes) and [[information-retrieval]] (inverted indexes, which map every word to the documents containing it, exactly like [[#ex-anagrams]] on a grand scale).

::: summary
- A **dictionary** maps unique, hashable keys to values ([[#def-dict]]): `d[k]` (raises `KeyError` if missing), `d.get(k, default)`, `d[k] = v`, `k in d`, `del d[k]`, and iteration over `keys`, `values`, `items` in insertion order.
- Counting (`c[x] = c.get(x, 0) + 1`, or `collections.Counter`) and grouping (`d.setdefault(k, []).append(x)`) are the two everyday dictionary patterns.
- Dictionaries and sets are **hash tables** ([[#def-hash]]): look-up, insertion and deletion take *expected* constant time, not worst-case. Keys must be hashable, so lists cannot be keys; tuples can.
- A **set** holds distinct items with fast membership and the operations `|`, `&`, `-`, `^`, `<=` ([[#def-set]]); `set()` is the empty set. Print sorted sets for reproducible output.
- Replacing a list search by a set lookup turns quadratic algorithms such as the pair search into linear ones ([[#thm-twosum]]).
- A dictionary can be inverted exactly when it is injective ([[#prop-invert]]); otherwise group keys by value.
- Choose the collection by how the data will be used: position (list, tuple), key (dict) or membership (set).
:::

## Exercises

::: exercise Predict the dictionary {level=1 check="3"}
What is `d` after these statements, and what is `len(d)`? (Enter the length.)

```python
d = {"x": 1, "y": 2}
d["z"] = 3
d["x"] = d["x"] + d["y"]
del d["y"]
d["w"] = d.get("v", 0)
```
::: solution
After the second line `d` is `{'x': 1, 'y': 2, 'z': 3}`. The third sets `d["x"]` to $1 + 2 = 3$, keeping its position. Deleting `"y"` leaves `{'x': 3, 'z': 3}`. `d.get("v", 0)` is $0$ because `"v"` is not a key, so the last line adds `"w"`. The result is `{'x': 3, 'z': 3, 'w': 0}`, of length $3$.
:::
:::

::: exercise Set operations {level=1 check="7"}
Let `a = {n for n in range(1, 11) if n % 2 == 0}` and `b = {n for n in range(1, 11) if n % 3 == 0}`. Find `a | b`, `a & b`, `a - b` and `a ^ b`. (Enter `len(a | b)`.)
::: solution
`a = {2, 4, 6, 8, 10}` and `b = {3, 6, 9}`. Then `a | b = {2, 3, 4, 6, 8, 9, 10}` (seven elements), `a & b = {6}`, `a - b = {2, 4, 8, 10}` and `a ^ b = {2, 3, 4, 8, 9, 10}`. Check with inclusion–exclusion: $5 + 3 - 1 = 7$.
:::
:::

::: exercise Letter counts {level=1 check="4"}
Use [[#alg-count]] (or `collections.Counter`) to count the letters of `"mississippi"`. Which letters are most frequent, and how many distinct letters are there? (Enter the number of distinct letters.)
::: solution
The counts are `i`: 4, `s`: 4, `p`: 2, `m`: 1, so `i` and `s` are joint most frequent, and there are $4$ distinct letters (`len(set("mississippi"))` is `4`). `Counter("mississippi")` displays them as `Counter({'i': 4, 's': 4, 'p': 2, 'm': 1})`.
:::
:::

::: exercise Hashable or not? {level=2}
For each of the following, say whether it can be a dictionary key, and if not, suggest a hashable alternative that carries the same information: `[3, 4]`, `("Ada", [1815, 1852])`, `{"a", "b"}`, `("Ada", 1815)`, `frozenset({"a", "b"})`.
::: solution
`[3, 4]`: no (a list); use the tuple `(3, 4)`. `("Ada", [1815, 1852])`: no — a tuple is hashable only if all its elements are, and this one contains a list; use `("Ada", (1815, 1852))`. `{"a", "b"}`: no (a set is mutable); use `frozenset({"a", "b"})`, which is the last item and is hashable. `("Ada", 1815)`: yes.
:::
:::

::: exercise Birthdays {level=2 check="23"}
Write a function that computes exactly the probability that among $n$ people (with birthdays independent and uniform over $365$ days) at least two share a birthday, using $1 - \prod_{k=0}^{n-1} \frac{365 - k}{365}$, and find the smallest $n$ for which it exceeds $\tfrac12$. (Enter $n$.)
::: solution
```python
def p_shared(n, days=365):
    """Probability that n people include two with the same birthday."""
    all_different = 1.0
    for k in range(n):
        all_different *= (days - k) / days
    return 1 - all_different

n = 1
while p_shared(n) <= 0.5:
    n += 1
print(n, round(p_shared(22), 4), round(p_shared(23), 4))
```

This prints `23 0.4757 0.5073`. The product is the probability that the $k$-th person avoids the $k$ birthdays already taken, for each $k$. The same calculation with $m$ hash-table slots in place of $365$ days explains why collisions are routine.
:::
:::

::: exercise Inverting with duplicates {level=2}
Modify `invert` so that it raises `ValueError` with a helpful message when the dictionary is not injective, instead of grouping, and returns the plain inverse otherwise. Explain why your check is correct.
::: solution
```python
def invert_strict(d):
    """Return the inverse of an injective dictionary d; raise ValueError otherwise."""
    inverse = {}
    for key, value in d.items():
        if value in inverse:
            raise ValueError(f"keys {inverse[value]!r} and {key!r} share the value {value!r}")
        inverse[value] = key
    return inverse
```

Invariant: after processing some pairs, `inverse` maps each value seen so far to its unique key. A new pair whose value is already a key of `inverse` proves that two distinct keys share a value, so by [[#prop-invert]] no inverse exists; otherwise adding it keeps the invariant. If the loop completes, no value was repeated, so $d$ is injective and `inverse` is its inverse. (`invert_strict(pets)` raises `ValueError: keys 'Rex' and 'Fido' share the value 'dog'`.)
:::
:::

::: exercise Multiples of 3 or 5 {level=3 check="466"}
How many integers $n$ with $1 \le n < 1000$ are divisible by $3$ or by $5$? Compute it with a set comprehension, and verify by inclusion–exclusion. (Enter the count.)
::: solution
`len({n for n in range(1, 1000) if n % 3 == 0 or n % 5 == 0})` is $466$. Alternatively, `threes = set(range(3, 1000, 3))` and `fives = set(range(5, 1000, 5))` have $333$ and $199$ elements, their intersection is the multiples of $15$, of which there are $\lfloor 999/15\rfloor = 66$, and $\lvert \text{threes} \cup \text{fives}\rvert = 333 + 199 - 66 = 466$.
:::
:::

::: exercise Counting pairs {level=3}
Generalise [[#alg-twosum]] to count the *number* of pairs $i < j$ with $x_i + x_j = t$, in expected time proportional to $n$. (Hint: replace the set by a dictionary of counts.) Prove your function correct and test it on `[1, 5, 7, -1, 5]` with $t = 6$, where the answer is $3$.
::: solution
```python
def count_pairs_with_sum(xs, target):
    """Number of index pairs i < j with xs[i] + xs[j] == target."""
    seen = {}                 # value -> how many times it occurred before the current position
    pairs = 0
    for x in xs:
        pairs += seen.get(target - x, 0)
        seen[x] = seen.get(x, 0) + 1
    return pairs

print(count_pairs_with_sum([1, 5, 7, -1, 5], 6))   # (1, 5), (1, 5), (7, -1)
```

This prints `3`. *Invariant:* at the start of iteration $j$, `seen[v]` is the number of $i < j$ with $x_i = v$, and `pairs` is the number of pairs $i < i' < j$ summing to $t$. In iteration $j$ the pairs $(i, j)$ with $x_i + x_j = t$ are exactly those with $i < j$ and $x_i = t - x_j$, and there are `seen.get(t - x_j, 0)` of them; adding that count and then recording $x_j$ in `seen` restores the invariant for $j + 1$. At the end `pairs` counts all pairs. Each iteration does two dictionary operations, so the expected time is proportional to $n$, against $n(n-1)/2$ checks for the brute-force method.
:::
:::
