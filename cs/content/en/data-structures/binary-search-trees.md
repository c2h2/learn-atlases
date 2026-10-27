A hash table ([[data-structures/hash-tables]]) answers "is this key present?" in expected constant time, but it cannot answer "what is the smallest key?", "which key comes just after 1984?", or "list every key between `apple` and `apricot` in order". Hashing scatters keys deliberately, destroying their order. A sorted array keeps the order and supports binary search in $O(\log n)$ time, but inserting into it costs $\Theta(n)$ ([[data-structures/arrays-lists#prop-array-insert]]). We want the best of both: a structure that keeps keys in order, searches like binary search, and also inserts and deletes quickly.

A **binary search tree** does this by storing the keys in a binary tree ([[data-structures/trees]]) arranged so that a search can discard a whole subtree at every step, exactly as binary search discards half of an array. This chapter defines the structure, derives its algorithms — search, minimum and maximum, successor, insertion and the slightly delicate deletion — and proves them correct. All of them cost $O(h)$, where $h$ is the height of the tree. That is the catch: the height depends on the order in which keys arrive, and in the worst case a binary search tree is no better than a linked list. We analyse both the worst case and the average case of random insertions, setting up the balanced trees of the next chapter.

## The search-tree property

::: definition Binary search tree {#def-bst}
A **binary search tree** (BST) is a binary tree in which each node stores a key (and usually an associated value), the keys are distinct and drawn from a totally ordered set, and every node $x$ satisfies the **search-tree property**: every key in the left subtree of $x$ is less than $x.\mathit{key}$, and every key in the right subtree of $x$ is greater than $x.\mathit{key}$.
:::

The property concerns *whole subtrees*, not just children. A tree in which each left child is smaller and each right child larger than its parent can still violate it: if $50$ has left child $30$, and $30$ has right child $60$, then $60$ lies in the left subtree of $50$ although it is larger.

Here is the tree we shall use as a running example. It is what you get by inserting $50, 30, 70, 20, 40, 60, 80, 35, 45, 65$ in that order into an empty tree.

::: widget graph
nodes: 50@4,3; 30@2,2; 70@6,2; 20@1,1; 40@3,1; 60@5,1; 80@7,1; 35@2.5,0; 45@3.5,0; 65@5.5,0
edges: 50-30; 50-70; 30-20; 30-40; 70-60; 70-80; 40-35; 40-45; 60-65
caption: A binary search tree with ten keys and height 3. Check the search-tree property at the root: everything to its left (20, 30, 35, 40, 45) is smaller than 50 and everything to its right larger. Reading the keys from left to right across the picture gives them in sorted order — that is [[#thm-inorder-sorted]]. You can drag nodes; the tree is defined by the edges and by which child is left or right.
:::

::: theorem Inorder traversal lists the keys in sorted order {#thm-inorder-sorted}
An inorder traversal ([[data-structures/trees#alg-traversals]]) of a binary search tree visits its keys in increasing order. Conversely, a binary tree with distinct keys whose inorder sequence is increasing is a binary search tree.
:::

::: proof
By strong induction on the number of nodes. An empty tree gives the empty sequence. For a tree with root $r$, inorder lists the left subtree, then $r$, then the right subtree. By the induction hypothesis each subtree's keys come out in increasing order; by the search-tree property every key of the left subtree is less than $r.\mathit{key}$, which is less than every key of the right subtree. So the whole sequence is increasing.

Conversely, if the inorder sequence is increasing, then for any node $x$ the keys of its left subtree appear immediately before $x$ in that sequence and those of its right subtree immediately after it (inorder lists a subtree contiguously), so they are smaller and larger respectively.
:::

So a BST is a sorted sequence in disguise, and inorder traversal sorts its keys in $\Theta(n)$ time ([[data-structures/trees#thm-traversal-cost]]). Inserting $n$ keys into a BST and then traversing it is a sorting algorithm, called **tree sort**; its cost is that of the insertions, which we now study.

## Searching

To search for key $k$, compare it with the root. If it is equal, we are done; if smaller, $k$ can only be in the left subtree; if larger, only in the right. Repeat until the key is found or we fall off the tree.

::: algorithm BST search {#alg-bst-search}
**Input:** the root $t$ of a BST and a key $k$. **Output:** the node with key $k$, or nothing.

1. $p \gets t$.
2. While $p$ is not empty and $k \ne p.\mathit{key}$: if $k < p.\mathit{key}$ set $p \gets p.\mathit{left}$, otherwise set $p \gets p.\mathit{right}$.
3. Return $p$.
:::

::: theorem Search is correct and costs O(h) {#thm-bst-search}
[[#alg-bst-search]] returns the node with key $k$ if there is one, and nothing otherwise. It examines the nodes of a single path from the root downwards, so it makes at most $h + 1$ key comparisons (three-way: less, equal or greater) in a tree of height $h$.
:::

::: proof
Invariant: *if $k$ is in the tree, it is in the subtree rooted at $p$*. Initially $p$ is the root. If $k < p.\mathit{key}$, then $k$ is not $p$'s key and, by the search-tree property, not in $p$'s right subtree, so if present it is in the left subtree; symmetrically for $k > p.\mathit{key}$. When the loop stops, either $p$ holds $k$, or $p$ is empty and by the invariant $k$ is not in the tree. Each iteration moves $p$ one level down, so there are at most $h + 1$ iterations.
:::

The minimum key is found by going left as long as possible, and the maximum by going right; both cost $O(h)$. (Why is the node $x$ where the leftward walk stops the minimum? A search for any smaller key would make the same leftward moves, since that key is smaller than every node on the path, and would then go left from $x$ — into an empty subtree. So no smaller key is present.)

### Successor

The **successor** of a key $k$ in the tree is the smallest key greater than $k$ — the next key in inorder. It is needed for "iterate from $k$ onwards", for deletion, and for "find the first key $\ge q$". There are two cases for a node $x$:

- If $x$ has a right subtree, the successor is the *minimum of that subtree*: go right once, then left as far as possible.
- If not, the successor is the nearest ancestor of $x$ whose *left* subtree contains $x$: walk up until you arrive at a node from its left child. If no such ancestor exists, $x$ holds the maximum and has no successor.

Without parent references, the second case is handled during the descent from the root: remember the last node at which the search for $k$ went left. The following function does this, and also answers "smallest key $\ge q$" (the **ceiling** of $q$) for keys $q$ that need not be in the tree.

```python
def ceiling(t, q):
    """Smallest key >= q in the BST rooted at t, or None."""
    best = None
    while t is not None:
        if q == t.key:
            return t.key
        if q < t.key:
            best = t.key          # t is a candidate; something smaller may be on the left
            t = t.left
        else:
            t = t.right           # t and its left subtree are all < q
    return best
```

::: example Searching and successors in the running example {#ex-bst-search}
In the tree above, trace the search for $45$ and for $62$, and find the successors of $45$ and of $50$ and the ceiling of $62$.
::: solution
*Search for 45*: $45 < 50$, go left to $30$; $45 > 30$, go right to $40$; $45 > 40$, go right to $45$: found after $4$ comparisons, the depth of $45$ plus one.

*Search for 62*: $62 > 50$ right to $70$; $62 < 70$ left to $60$; $62 > 60$ right to $65$; $62 < 65$, left — empty. Not found, after $4$ comparisons.

*Successor of 45*: $45$ has no right subtree. Walking up: $45$ is the right child of $40$, $40$ the right child of $30$, $30$ the *left* child of $50$. So the successor is $50$. Equivalently, in the search for $45$ the last time we went left was at $50$.

*Successor of 50*: $50$ has a right subtree; its minimum is found by going to $70$ and then left as far as possible: $60$ (which has no left child). So the successor is $60$.

*Ceiling of 62*: the search for $62$ went left at $70$ and at $65$, the last of these being $65$; so `ceiling(root, 62)` returns $65$, the smallest key $\ge 62$.
:::
:::

## Insertion

To insert key $k$, search for it. If it is found, replace its value (keys are distinct). Otherwise the search ended at an empty subtree — exactly where $k$ would have to be — so put a new leaf there.

::: algorithm BST insertion {#alg-bst-insert}
Search for $k$ as in [[#alg-bst-search]], keeping track of the last non-empty node $y$ visited. If a node with key $k$ is found, update its value. Otherwise create a node $z$ with key $k$; if the tree was empty make $z$ the root, else make $z$ the left child of $y$ if $k < y.\mathit{key}$ and the right child otherwise.
:::

::: example Inserting into the running example {#ex-bst-insert}
Insert $42$ and then $67$ into the running example. Where do they go, and how many comparisons does each insertion make?
::: solution
*Insert 42*: $42 < 50$ left to $30$; $42 > 30$ right to $40$; $42 > 40$ right to $45$; $42 < 45$, and $45$ has no left child. So $42$ becomes the left child of $45$, after $4$ comparisons. It is the successor of $40$ in the new tree: in sorted order it sits between $40$ and $45$, exactly where it was attached.

*Insert 67*: $67 > 50$ right to $70$; $67 < 70$ left to $60$; $67 > 60$ right to $65$; $67 > 65$, and $65$ has no right child. So $67$ becomes the right child of $65$, again after $4$ comparisons. The height of the tree grows from $3$ to $4$, because both new leaves are at depth $4$.

Notice that a new key always becomes a leaf, and the existing structure never changes. That is what makes insertion simple — and also why the shape of the tree is fixed entirely by the insertion order.
:::
:::

The new node becomes a leaf, and the property still holds: $z$ was placed in every subtree on the search path on the correct side of that subtree's root, because the search compared $k$ with each of them. Insertion costs $O(h)$, the same as an unsuccessful search. The recursive formulation below is shorter: `_put(t, …)` inserts into the subtree rooted at `t` and returns the (possibly new) root of that subtree, so the parent's link is updated by assignment. The class also contains deletion, explained next.

```python
class Node:
    def __init__(self, key, value):
        self.key, self.value = key, value
        self.left = self.right = None

class BST:
    def __init__(self):
        self.root = None

    def get(self, key):                      # O(h): one path from the root
        p = self.root
        while p is not None:
            if key == p.key:
                return p.value
            p = p.left if key < p.key else p.right
        raise KeyError(key)

    def put(self, key, value):
        self.root = self._put(self.root, key, value)

    def _put(self, t, key, value):           # returns the new root of subtree t
        if t is None:
            return Node(key, value)
        if key < t.key:
            t.left = self._put(t.left, key, value)
        elif key > t.key:
            t.right = self._put(t.right, key, value)
        else:
            t.value = value                  # existing key: replace the value
        return t

    def delete(self, key):
        self.root = self._delete(self.root, key)

    def _delete(self, t, key):
        if t is None:
            raise KeyError(key)
        if key < t.key:
            t.left = self._delete(t.left, key)
        elif key > t.key:
            t.right = self._delete(t.right, key)
        elif t.left is None:                 # zero or one child: splice t out
            return t.right
        elif t.right is None:
            return t.left
        else:                                # two children: use the successor
            s = t.right
            while s.left is not None:
                s = s.left                   # smallest key in the right subtree
            t.key, t.value = s.key, s.value
            t.right = self._delete(t.right, s.key)
        return t
```

## Deletion

Deleting a node $z$ must leave a binary search tree containing all the other keys. There are three cases, according to the number of children of $z$.

::: algorithm BST deletion (Hibbard) {#alg-bst-delete}
Find the node $z$ with the key to be deleted.

1. If $z$ is a **leaf**, remove it: its parent's link becomes empty.
2. If $z$ has **one child**, splice $z$ out: replace the link to $z$ in its parent by a link to $z$'s only child.
3. If $z$ has **two children**, let $s$ be its successor, the minimum of $z$'s right subtree. Copy $s$'s key and value into $z$, and then delete $s$ from the right subtree. Since $s$ is a minimum, it has no left child, so deleting it is case 1 or 2.
:::

::: theorem Deletion preserves the search-tree property {#thm-bst-delete}
After [[#alg-bst-delete]] the tree is a binary search tree containing exactly the original keys except the deleted one. The deletion takes $O(h)$ time.
:::

::: proof
By [[#thm-inorder-sorted]] it suffices to show that the inorder sequence of the new tree is the old sequence with the deleted key removed (it is then still increasing).

*Cases 1 and 2.* Inorder lists the subtree rooted at $z$ as (left subtree of $z$), $z$, (right subtree of $z$), and one of the two subtrees is empty. Replacing the subtree rooted at $z$ by its only non-empty subtree (or by nothing) removes exactly $z$ from this part of the sequence and leaves everything else unchanged.

*Case 3.* The successor $s$ immediately follows $z$ in inorder. Copying $s$'s key into $z$ and then removing node $s$ (a case 1 or 2 removal, which by the above deletes exactly $s$'s position from the sequence) turns $\dots, z, s, \dots$ into $\dots, s, \dots$ — the sequence with $z$'s key removed.

*Cost.* Finding $z$ follows one path; finding $s$ continues down the same path's extension into $z$'s right subtree; so $O(h)$ in total.
:::

::: example Three deletions {#ex-bst-delete}
From the running example delete $30$, then $60$, then $20$. Show the tree after each step and check with the program.
::: solution
*Delete 30* (two children: $20$ and $40$). Its successor is the minimum of the right subtree rooted at $40$: go left from $40$ to $35$, which has no left child. Copy $35$ into the node that held $30$, then delete the old $35$ (a leaf). Now the root's left child is $35$, with children $20$ and $40$, and $40$ has only the right child $45$.

*Delete 60* (one child, $65$). Splice it out: $70$'s left child becomes $65$.

*Delete 20* (a leaf). Remove it: $35$ now has only the right child $40$.

```text
after deleting 30           after deleting 60 and 20
        50                          50
      /    \                      /    \
    35      70                  35      70
   /  \    /  \                   \    /  \
 20   40  60   80                 40  65   80
        \   \                       \
        45   65                     45
```

Running the class:

```python
def inorder(t):
    return [] if t is None else inorder(t.left) + [t.key] + inorder(t.right)

def height(t):
    return -1 if t is None else 1 + max(height(t.left), height(t.right))

T = BST()
for k in [50, 30, 70, 20, 40, 60, 80, 35, 45, 65]:
    T.put(k, str(k))
print(inorder(T.root), "height", height(T.root))
print(T.get(45))
T.delete(30)                                 # two children: successor 35
T.delete(60)                                 # one child (65)
T.delete(20)                                 # a leaf
print(inorder(T.root), "root", T.root.key, "left child", T.root.left.key)
```

```console
$ python3 bst.py
[20, 30, 35, 40, 45, 50, 60, 65, 70, 80] height 3
45
[35, 40, 45, 50, 65, 70, 80] root 50 left child 35
```

The inorder sequence is still sorted and has lost exactly the three deleted keys, as [[#thm-bst-delete]] promises.
:::
:::

::: warning Copying the successor is not always harmless
Case 3 moves a key and value from one node to another. If other parts of a program hold references to *nodes* (an iterator positioned at the successor, or an index from keys to nodes), they now point at a node with different contents, or at a node removed from the tree. Libraries that hand out node references therefore implement case 3 by *moving the successor node itself* into $z$'s place, relinking pointers instead of copying data (CLRS's `TRANSPLANT` procedure does this). Also note that repeatedly deleting with the successor and inserting at random tends, over long sequences, to make the tree slightly unbalanced to the left — an effect observed experimentally and analysed by Eppinger (1983) and Culberson — which is one more reason to use balanced trees in practice.
:::

::: quiz
In a BST, node $z$ has two children. Which statements about its successor $s$ are true? (Choose all that apply.)
- [x] $s$ is in the right subtree of $z$.
- [x] $s$ has no left child.
- [ ] $s$ is a leaf.
- [ ] $s$ is the right child of $z$.
::: solution
Since $z$ has a right subtree, $s$ is the minimum of it, found by going left as far as possible — so $s$ has no left child. But $s$ may have a right child (it is a leaf only sometimes), and $s$ is the right child of $z$ only when that right child has no left child.
:::
:::

## How tall is a binary search tree?

Every operation costs $O(h)$. By [[data-structures/trees#thm-height-size]], $\lfloor\log_2 n\rfloor \le h \le n - 1$, and both extremes occur.

::: proposition Sorted insertions build a path {#prop-degenerate}
Inserting the keys $1, 2, \dots, n$ in increasing order into an empty BST produces a tree of height $n - 1$ in which every node has only a right child. Building it makes $\binom{n}{2} = n(n-1)/2$ key comparisons, and a subsequent search for $n$ makes $n$.
:::

::: proof
By induction: after inserting $1, \dots, i$ the tree is the path $1 \to 2 \to \dots \to i$ of right children. Key $i+1$ is larger than all of them, so its search goes right $i$ times, comparing with each, and it is attached as the right child of $i$. Summing $i$ comparisons over $i = 0, \dots, n-1$ gives $n(n-1)/2$.
:::

Sorted or nearly sorted input is common — records arriving in order of time, identifiers assigned sequentially — so this is not a theoretical curiosity. What about input in random order?

::: theorem Random binary search trees {#thm-random-bst}
Insert $n$ distinct keys into an empty BST in an order chosen uniformly at random from all $n!$ orders. Then the expected sum of the depths of all nodes (the **internal path length**) is

$$
\E[\text{internal path length}] = 2(n+1)H_n - 4n,
$$ {#eq-ipl}

where $H_n = \sum_{k=1}^n 1/k$. Hence the expected depth of a node chosen at random is $2(1 + 1/n)H_n - 4 = 2\ln n + O(1) \approx 1.39\log_2 n$, and a random successful search makes about $1.39\log_2 n$ comparisons on average.
:::

::: proof
Name the keys by rank, $1 < 2 < \dots < n$. The depth of node $j$ equals the number of its proper ancestors, so the internal path length is the number of ordered pairs $(i, j)$, $i \ne j$, such that $i$ is an ancestor of $j$.

*Claim: $i$ is an ancestor of $j$ exactly when $i$ is inserted before every other key in the range between $i$ and $j$ (inclusive).* Consider the keys of the closed interval $I$ from $\min(i,j)$ to $\max(i,j)$. Until the first key of $I$ is inserted, every node on the search path of any key in $I$ is outside $I$, and each such node sends all keys of $I$ the same way (they all lie on the same side of it). So all keys of $I$ follow a common path until the first of them, say $f$, is inserted, at the end of that path. If $f = i$, then $j$'s later search passes through $i$, so $i$ is an ancestor of $j$. If $f$ is strictly between $i$ and $j$, then $i$ and $j$ go to different sides of $f$ and neither is an ancestor of the other. If $f = j$, then $j$ is an ancestor of $i$, and since ancestry cannot go both ways, $i$ is not an ancestor of $j$.

In a random order each of the $\lvert j - i\rvert + 1$ keys of $I$ is equally likely to come first, so $\Prob[i \text{ is an ancestor of } j] = 1/(\lvert j-i\rvert + 1)$. Summing over ordered pairs, by linearity of expectation, and grouping by $d = \lvert j - i\rvert$ (there are $2(n - d)$ ordered pairs at distance $d$):

$$
\E[\text{IPL}] = \sum_{d=1}^{n-1}\frac{2(n-d)}{d+1} = 2\sum_{k=2}^{n}\frac{n + 1 - k}{k} = 2(n+1)(H_n - 1) - 2(n - 1) = 2(n+1)H_n - 4n.
$$

Dividing by $n$ gives the average depth. Since $H_n = \ln n + \gamma + O(1/n)$ with $\gamma \approx 0.577$, it is $2\ln n + 2\gamma - 4 + o(1)$, and $2\ln n = 2\ln 2\cdot\log_2 n \approx 1.386\log_2 n$.
:::

The *average* depth is only about $39\%$ worse than in a perfectly balanced tree. The *maximum* depth (the height) of a random BST is also logarithmic in expectation, about $4.311\ln n$ asymptotically (Devroye, 1986), though the convergence to that constant is slow. A simulation makes the contrast with sorted input vivid (an observation, random order with seed $42$):

```python
import random, sys
sys.setrecursionlimit(10_000)                # the sorted case recurses 2000 deep

def depths(t):                               # total depth and height, iteratively
    total, h, stack = 0, -1, [(t, 0)]
    while stack:
        node, d = stack.pop()
        if node is not None:
            total, h = total + d, max(h, d)
            stack += [(node.left, d + 1), (node.right, d + 1)]
    return total, h

random.seed(42)
n = 2000
for name, keys in [("sorted", list(range(n))),
                   ("random", random.sample(range(n), n))]:
    T = BST()
    for k in keys:
        T.put(k, None)
    total, h = depths(T.root)
    print(f"{name:6}: height {h:4d}, average depth {total / n:7.2f}")
```

```console
$ python3 shapes.py
sorted: height 1999, average depth  999.50
random: height   22, average depth   11.80
```

The formula [[#eq-ipl]] predicts an average depth of $12.36$ for $n = 2000$, close to the observed $11.80$ for this one random order; a perfectly balanced tree has height $10$ and average depth about $9$.

::: widget plot
f: (x - 1)/2; 2*(1 + 1/x)*(ln(x) + 0.5772) - 4; log2(x + 1) - 2
labels: \text{sorted insertions (path)}; \text{random insertions}; \text{perfectly balanced}
x: 1, 1000
y: 0, 30
caption: Average node depth against $n$ for three shapes of BST: the path built by sorted insertions ($(n-1)/2$, leaving the chart almost at once), the expected value for random insertion order from [[#thm-random-bst]] (with $H_n \approx \ln n + 0.5772$), and a perfectly balanced tree (about $\log_2(n+1) - 2$). Random trees stay within a constant factor of the balanced ideal; sorted input is catastrophic.
:::

::: quiz
The keys $1, \dots, 1000$ are inserted into an empty BST in a uniformly random order. Approximately what is the expected depth of a randomly chosen node?
- [ ] About $8$, as in a perfectly balanced tree
- [x] About $11$
- [ ] About $40$
- [ ] About $500$
::: solution
By [[#thm-random-bst]] the expected average depth is $2(1 + 1/n)H_n - 4$. With $H_{1000} \approx \ln 1000 + 0.577 \approx 7.485$, this is $2 \cdot 1.001 \cdot 7.485 - 4 \approx 10.99$, so about $11$. A perfectly balanced tree with $1000$ nodes has height $9$ and average depth about $8$, so random order costs roughly three extra comparisons per search. The value $500$ is the average depth after *sorted* insertions.
:::
:::

::: warning "Average case O(log n)" assumes random insertion order
[[#thm-random-bst]] averages over insertion *orders*, not over the keys searched for, and it says nothing about trees built from sorted, nearly sorted or adversarial input — or about trees after many deletions. In applications the order is rarely random. Shuffling the keys first restores the random case when all keys are known in advance, but a dynamic dictionary needs a guarantee for every sequence of operations: that is what the balanced trees of [[data-structures/balanced-trees]] provide, with height $O(\log n)$ in the worst case.
:::

## Ordered operations

What a BST offers beyond a hash table is order. All of the following take $O(h)$ time, plus the size of the output where there is one:

- **minimum, maximum**: leftmost and rightmost nodes;
- **floor and ceiling**: the largest key $\le q$ and the smallest key $\ge q$, as in `ceiling` above;
- **successor and predecessor**;
- **range query**: all keys in $[a, b]$ in sorted order, by an inorder traversal that skips subtrees lying entirely outside the range — $O(h + r)$ for $r$ reported keys;
- **rank and selection** — the number of keys less than $q$, and the $i$th smallest key — if each node also stores the **size** of its subtree, which insertion and deletion update along their search paths ([[#exr-select]]).

::: example A range query {#ex-range}
Write a function listing all keys in $[a, b]$ and trace it on the running example with $a = 33$, $b = 62$.
::: solution
```python
def keys_between(t, a, b, out):
    if t is None:
        return out
    if a < t.key:
        keys_between(t.left, a, b, out)   # the left subtree may hold keys >= a
    if a <= t.key <= b:
        out.append(t.key)
    if t.key < b:
        keys_between(t.right, a, b, out)  # the right subtree may hold keys <= b
    return out
```

At $50$: $33 < 50$, recurse left into $30$. At $30$: $33 > 30$, so skip $30$'s left subtree (all keys $< 30 < 33$) and do not report $30$; $30 < 62$, recurse right into $40$. At $40$: recurse left into $35$ (reported; its subtrees are empty), report $40$, recurse right into $45$ (reported). Back at $50$: report $50$; $50 < 62$, recurse right into $70$. At $70$: $33 < 70$, recurse left into $60$: report $60$, recurse right into $65$ — not reported ($65 > 62$), and its right subtree is skipped. $70$ is not reported and, since $70 \not< 62$, its right subtree ($80$) is skipped.

The output is `[35, 40, 45, 50, 60]`, in sorted order because the function is an inorder traversal with pruning. The nodes visited are those holding reported keys plus those on the two boundary search paths, for $a$ and for $b$, so the cost is $O(h + r)$.
:::
:::

::: history
Binary search trees were discovered independently by several people around 1960. P. F. Windley in "Trees, forests and rearranging" (*The Computer Journal*, 1960), A. D. Booth and A. J. T. Colin in "On the efficiency of a new method of dictionary construction" (*Information and Control*, 1960), and Thomas Hibbard in "Some combinatorial properties of certain trees with applications to searching and sorting" (*Journal of the ACM*, 1962) all described tree insertion and analysed random trees, obtaining the $2\ln n$ average; Hibbard also gave the deletion algorithm used in this chapter. The connection with quicksort, whose comparison count has the same distribution as the internal path length of a random BST, is described in Knuth's *The Art of Computer Programming*, volume 3 (1973). Luc Devroye determined the asymptotic height $4.311\ln n$ of random BSTs in 1986.
:::

## Where this leads

The height problem is solved in [[data-structures/balanced-trees]]: AVL and red–black trees restore balance after each insertion and deletion by **rotations**, keeping $h = O(\log n)$ in the worst case, and B-trees generalise BSTs to many keys per node for storage on disk. Treaps and skip lists achieve the random-tree bounds of [[#thm-random-bst]] for *every* input by using random priorities or coin flips, and splay trees achieve $O(\log n)$ amortised by restructuring on every access; see [[algorithms]]. Ordered maps in standard libraries — C++'s `std::map`, Java's `TreeMap` — are balanced BSTs, and the database indexes of [[databases]] are B+-trees. The analysis of [[#thm-random-bst]] reappears unchanged as the average-case analysis of quicksort.

::: summary
- A **binary search tree** ([[#def-bst]]) stores keys so that every key in a node's left subtree is smaller and every key in its right subtree larger; inorder traversal lists the keys in sorted order ([[#thm-inorder-sorted]]).
- Search, minimum, maximum, successor, floor, ceiling, insertion and deletion each follow one or two root-to-leaf paths and cost $O(h)$ ([[#thm-bst-search]]).
- Insertion adds a leaf where an unsuccessful search ends. Deletion splices out a node with at most one child, and replaces a node with two children by its successor ([[#alg-bst-delete]], [[#thm-bst-delete]]).
- The height is between $\lfloor\log_2 n\rfloor$ and $n - 1$. Sorted insertions give a path of height $n-1$ and $\Theta(n^2)$ total cost ([[#prop-degenerate]]).
- With random insertion order the expected average depth is $2(1+1/n)H_n - 4 \approx 1.39\log_2 n$ ([[#thm-random-bst]]), but real input is rarely random; worst-case guarantees need balancing.
- BSTs support ordered queries — ranges in $O(h + r)$, rank and selection with subtree sizes — that hash tables cannot.
:::

## Exercises

::: exercise Is it a BST? {level=1}
Which of these binary trees (written as root(left, right), with `-` for an empty subtree) are binary search trees? (a) $8(3(1, 6), 10(-, 14))$; (b) $8(3(1, 9), 10(-, 14))$; (c) $8(3(1, 6(4, 7)), 10(9, 14))$.
::: solution
(a) Yes: inorder gives $1, 3, 6, 8, 10, 14$, increasing. (b) No: $9$ is in the left subtree of $8$ but larger than it (inorder $1, 3, 9, 8, \dots$ is not increasing), although every child is on the correct side of its own parent. (c) Yes: inorder $1, 3, 4, 6, 7, 8, 9, 10, 14$.
:::
:::

::: exercise Insertion order and height {level=1 check="6"}
Insert $1, 2, 3, 4, 5, 6, 7$ into an empty BST in the order $4, 2, 6, 1, 3, 5, 7$, and then (into a fresh tree) in the order $1, 7, 2, 6, 3, 5, 4$. What is the height of the second tree? (Enter the height.)
::: solution
The first order gives the perfect tree of height $2$: root $4$, children $2$ and $6$, leaves $1, 3, 5, 7$. The second gives a zigzag path: $1$, right child $7$, whose left child is $2$, whose right child is $6$, whose left child is $3$, whose right child is $5$, whose left child is $4$ — a path of $7$ nodes, height $6$. Same keys, very different costs.
:::
:::

::: exercise Comparisons for a search {level=1 check="4"}
In the tree obtained after the three deletions in [[#ex-bst-delete]], how many key comparisons does a search for $45$ make? (Enter the number.)
::: solution
The tree is $50$ with left child $35$; $35$ has right child $40$; $40$ has right child $45$. The search compares with $50$ (go left), $35$ (go right), $40$ (go right), $45$ (found): $4$ comparisons.
:::
:::

::: exercise Predecessor {level=2}
Describe, and implement as a function `floor(t, q)` analogous to `ceiling`, the largest key $\le q$. Use it to find the floor of $62$ and of $19$ in the running example.
::: solution
Symmetric to `ceiling`: when $q > t.\mathit{key}$, the current node is a candidate and anything larger and still $\le q$ is in its right subtree; when $q < t.\mathit{key}$, go left.

```python
def floor(t, q):
    best = None
    while t is not None:
        if q == t.key:
            return t.key
        if q > t.key:
            best = t.key          # t is a candidate; something larger may be on the right
            t = t.right
        else:
            t = t.left
    return best
```

For $62$: at $50$ go right (best $50$), at $70$ go left, at $60$ go right (best $60$), at $65$ go left: empty. Floor $60$. For $19$: left from $50$, $30$, $20$, and the left subtree of $20$ is empty; no candidate was recorded, so the floor is `None` — every key is greater than $19$.
:::
:::

::: exercise Internal path length {level=2 check="29/6"}
Using [[#eq-ipl]], compute the expected internal path length of a BST built from $4$ keys inserted in a random order. (Enter the exact value.)
::: solution
$H_4 = 1 + \tfrac12 + \tfrac13 + \tfrac14 = \tfrac{25}{12}$. Then $2\cdot 5\cdot\tfrac{25}{12} - 16 = \tfrac{250}{12} - 16 = \tfrac{125}{6} - \tfrac{96}{6} = \tfrac{29}{6} \approx 4.83$. Checking by enumerating all $24$ orders (for instance with a short program) gives the same value: the possible trees have internal path length $4$ (balanced shapes) up to $6$ (paths).
:::
:::

::: exercise Checking the property {level=2}
A student checks whether a binary tree is a BST by testing, at every node, `left.key < node.key < right.key` for its children. Give a counterexample showing that this is wrong, then write a correct $\Theta(n)$ checker.
::: solution
The tree $8(3(1, 9), 10)$ from the first exercise passes the student's test at every node but is not a BST. A correct checker passes down the open interval in which a subtree's keys must lie:

```python
def is_bst(t, lo=None, hi=None):
    if t is None:
        return True
    if (lo is not None and t.key <= lo) or (hi is not None and t.key >= hi):
        return False
    return is_bst(t.left, lo, t.key) and is_bst(t.right, t.key, hi)
```

At the root the interval is unbounded; going left, the upper bound becomes the parent's key; going right, the lower bound does. Every node is checked once: $\Theta(n)$. (An alternative is to do an inorder traversal and check that the sequence is increasing, by [[#thm-inorder-sorted]].)
:::
:::

::: exercise Selection with subtree sizes {#exr-select level=3}
Augment each node with `size`, the number of nodes in its subtree. (a) Show how `_put` and `_delete` maintain it with $O(1)$ extra work per node on the path. (b) Write `select(t, i)`, returning the $i$th smallest key ($i = 0$ for the minimum), in $O(h)$ time, and prove it correct. (c) Write `rank(t, q)`, the number of keys less than $q$.
::: solution
(a) After the recursive call in `_put` or `_delete` returns, set `t.size = 1 + size(t.left) + size(t.right)`, where `size(None) = 0`. Only nodes on the search path change size, and each is recomputed once.

(b)
```python
def size(t):
    return 0 if t is None else t.size

def select(t, i):
    while t is not None:
        k = size(t.left)                 # keys smaller than t.key in this subtree
        if i < k:
            t = t.left
        elif i == k:
            return t.key
        else:
            i, t = i - k - 1, t.right    # skip the left subtree and t itself
    raise IndexError(i)
```

Invariant: the answer is the $i$th smallest key of the subtree rooted at `t`. In inorder, the subtree lists $k = $ `size(t.left)` keys of the left subtree, then `t.key` at position $k$, then the right subtree. So the $i$th key is in the left subtree if $i < k$, is `t.key` if $i = k$, and is the $(i - k - 1)$th key of the right subtree otherwise. Each step descends one level: $O(h)$.

(c)
```python
def rank(t, q):
    r = 0
    while t is not None:
        if q <= t.key:
            t = t.left
        else:
            r += size(t.left) + 1        # t and its whole left subtree are < q
            t = t.right
    return r
```
:::
:::

::: exercise Building from a sorted array {level=3}
Given a sorted Python list of $n$ distinct keys, build a BST of minimum height in $\Theta(n)$ time, and prove that its height is $\lfloor\log_2 n\rfloor$. Why is inserting the keys one at a time in sorted order a bad way to do it, and what would inserting them in the order of a level-order traversal of your tree achieve?
::: solution
Make the middle element the root and build the two halves recursively:

```python
def build(keys, lo=0, hi=None):
    if hi is None:
        hi = len(keys)
    if lo >= hi:
        return None
    mid = (lo + hi) // 2
    t = Node(keys[mid], None)
    t.left = build(keys, lo, mid)
    t.right = build(keys, mid + 1, hi)
    return t
```

Each key becomes one node with $O(1)$ work (no slicing), so the time is $\Theta(n)$. Height: a range of size $s$ produces a root and subranges of sizes $\lfloor s/2\rfloor$ and $\lceil s/2\rceil - 1$, both at most $\lfloor s/2 \rfloor$. By induction, a range of size $s$ with $2^k \le s < 2^{k+1}$ gives a tree of height at most $k$: the subranges have size less than $2^k$, so height at most $k - 1$. Hence the height is at most $\lfloor\log_2 n\rfloor$, which is also the minimum possible by [[data-structures/trees#thm-height-size]].

Inserting in sorted order produces a path of height $n - 1$ with $\Theta(n^2)$ comparisons ([[#prop-degenerate]]). Inserting in the level order of the balanced tree (root first, then the two middle elements of the halves, and so on) reproduces exactly the balanced tree, because each key is inserted after all its ancestors and in the right place relative to them; it costs $O(n\log n)$ comparisons.
:::
:::
