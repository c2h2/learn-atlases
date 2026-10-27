Open a file browser and you see a hierarchy: a home directory contains folders, which contain further folders and files. A web page is a hierarchy of elements nested inside one another; a compiler turns `5 + (1 + 2) * 4 - 3` into a hierarchy in which each operator sits above its operands; a company's organisation chart, a family tree and the chapters, sections and paragraphs of a book are hierarchies too. The lists, stacks and queues of the previous chapters are *linear* — every item has at most one successor — and cannot express any of this directly. **Trees** can.

Trees are also the basis of the fastest general-purpose searching structures: binary search trees ([[data-structures/binary-search-trees]]), their balanced versions ([[data-structures/balanced-trees]]), heaps ([[data-structures/heaps]]) and the B-trees used by every database. This chapter lays the foundations they all share: the vocabulary of rooted and binary trees, the counting facts that relate a tree's height to its number of nodes, ways of storing trees in memory, and the four standard **traversals** that visit every node in a systematic order — with their applications to expression trees and file-system hierarchies.

## Rooted trees

::: definition Rooted tree {#def-rooted-tree}
A **rooted tree** is either empty, or consists of a node $r$, its **root**, together with a finite sequence of zero or more rooted trees $T_1, \dots, T_k$, the **subtrees** of $r$, which share no nodes with each other or with $r$. The roots of the non-empty $T_i$ are the **children** of $r$, and $r$ is their **parent**.
:::

The definition is recursive — a tree is a root with smaller trees hanging below it — and that is why almost every algorithm on trees is recursive too ([[programming-1/recursion]]). (Graph theory defines a tree differently, as a connected graph without cycles; choosing any vertex as root and directing edges away from it turns such a tree into a rooted tree in the sense above. See [Maths Atlas: graphs](/learn/maths/lesson.php?c=discrete&l=graphs).)

The vocabulary comes partly from botany and partly from genealogy:

- A node with no children is a **leaf**; a node with at least one child is **internal**.
- Nodes with the same parent are **siblings**. The **ancestors** of a node are its parent, its parent's parent, and so on up to the root; its **descendants** are its children, their children, and so on. The **subtree rooted at** $v$ consists of $v$ and all its descendants.
- The **depth** of a node is the number of edges on the path from the root to it; the root has depth $0$. The nodes of depth $d$ form **level** $d$.
- The **height** of a node is the number of edges on the longest path from it down to a leaf; the **height of the tree** is the height of its root, equal to the greatest depth of any node. A tree with one node has height $0$; by convention the empty tree has height $-1$.
- The **degree** of a node is its number of children. A tree is **ordered** if the children of each node have a specified order (first, second, …), as in our definition.

::: proposition A tree with n nodes has n − 1 edges {#prop-edges}
A rooted tree with $n \ge 1$ nodes has exactly $n - 1$ parent–child edges.
:::

::: proof
Every node except the root has exactly one parent, and each edge joins a node to its parent. So the edges correspond one-to-one with the $n - 1$ non-root nodes.
:::

## Binary trees

::: definition Binary tree {#def-binary-tree}
A **binary tree** is either empty, or consists of a root node together with two binary trees, its **left subtree** and **right subtree**. A node's **left child** and **right child** are the roots of its left and right subtrees (if they are non-empty).
:::

Note that "left" and "right" are part of the structure: a root with only a left child and a root with only a right child are *different* binary trees, although as ordered trees both are "a root with one child". Some shapes deserve names.

- A binary tree is **full** (or *proper*) if every node has zero or two children.
- It is **perfect** if it is full and all leaves have the same depth.
- It is **complete** if every level except possibly the last is completely filled, and the nodes of the last level are as far left as possible. Heaps ([[data-structures/heaps]]) are complete binary trees.

The cost of most tree operations is proportional to the height, so the relation between height and size is fundamental.

::: theorem Height and size of binary trees {#thm-height-size}
A binary tree of height $h$ has at most $2^{h+1} - 1$ nodes, with equality exactly when it is perfect. Consequently a binary tree with $n \ge 1$ nodes has height at least $\lceil \log_2(n+1)\rceil - 1 = \lfloor \log_2 n\rfloor$, and at most $n - 1$.
:::

::: proof
Level $d$ contains at most $2^d$ nodes: true for $d = 0$ (the root), and each node of level $d$ has at most two children on level $d+1$. Summing over levels $0, \dots, h$,

$$
n \le 1 + 2 + 4 + \dots + 2^h = 2^{h+1} - 1,
$$

with equality iff every level is full, that is iff the tree is perfect. Rearranging, $2^{h+1} \ge n + 1$, so $h \ge \log_2(n+1) - 1$, and since $h$ is an integer, $h \ge \lceil\log_2(n+1)\rceil - 1$. For $n \ge 1$ this equals $\lfloor\log_2 n\rfloor$: if $2^k \le n < 2^{k+1}$ then $2^k < n + 1 \le 2^{k+1}$, so $\lceil\log_2(n+1)\rceil = k + 1$. For the upper bound, a tree of height $h$ contains a root-to-leaf path of $h + 1$ distinct nodes, so $h \le n - 1$; a "path" in which every node has one child attains it.
:::

So the height of a binary tree with $n$ nodes lies between about $\log_2 n$ (bushy) and $n - 1$ (a chain). The whole of the next two chapters is about keeping search trees near the lower end.

::: theorem Leaves of a full binary tree {#thm-full-leaves}
A full binary tree with $i$ internal nodes has $i + 1$ leaves, and hence $2i + 1$ nodes.
:::

::: proof
By induction on $i$. If $i = 0$ the tree is a single leaf: $1 = 0 + 1$ leaves. Otherwise the root is internal and both its subtrees are non-empty full binary trees, with $i_L$ and $i_R$ internal nodes where $i_L + i_R = i - 1$. By the induction hypothesis they have $i_L + 1$ and $i_R + 1$ leaves, so the whole tree has $i_L + i_R + 2 = i + 1$ leaves.
:::

For example, an expression tree whose internal nodes are binary operators is full: an expression with $i$ operators has $i + 1$ operands.

::: quiz
A binary tree has $100$ nodes. Which heights are possible?
- [ ] Any height from $0$ to $100$
- [x] Any height from $6$ to $99$
- [ ] Any height from $7$ to $99$
- [ ] Only $6$ or $7$
::: solution
By [[#thm-height-size]] the height is at least $\lfloor\log_2 100\rfloor = 6$ (a tree of height $5$ holds at most $63$ nodes, and one of height $6$ up to $127$) and at most $100 - 1 = 99$ (a chain). Every height in between is achievable: start from a chain and fold it up gradually.
:::
:::

## Representing trees in memory

**Linked binary nodes.** The standard representation gives each node a key (or other data) and references `left` and `right` to its children, `None` for a missing child. A reference `parent` is often added, so that one can walk upwards (useful for deletion in search trees). A tree is given by a reference to its root.

```python
class Node:
    def __init__(self, key, left=None, right=None):
        self.key, self.left, self.right = key, left, right
```

**General trees.** If nodes can have any number of children, each node can hold a list (dynamic array) of its children — natural in Python — or use the **left-child, right-sibling** representation, in which each node stores two references: to its first child and to its next sibling. The second turns any ordered tree into a binary tree with the same nodes, using only two references per node however many children there are.

**Parent array.** If nodes are numbered $0, \dots, n-1$, a single array with $\mathit{parent}[v]$ the parent of $v$ ($-1$ for the root) records the tree in $n$ integers. It is compact and makes walking up to the root easy, but finding the children of a node requires scanning the whole array. Union–find structures in [[algorithms]] use exactly this representation.

**Implicit array for complete trees.** A complete binary tree needs no references at all. Number the nodes level by level, left to right, starting with the root at index $0$; then the children of node $i$ are at indices $2i + 1$ and $2i + 2$, and its parent at $\lfloor (i - 1)/2\rfloor$. Completeness guarantees that indices $0, \dots, n-1$ are exactly the occupied positions, so the tree is just an array. This is how binary heaps are stored ([[data-structures/heaps]]).

::: example Index arithmetic in a complete tree {#ex-implicit}
A complete binary tree is stored in an array of length $n = 10$ as above. What are the children and parent of the node at index $3$? Which indices are leaves?
::: solution
Node $3$ has children $2\cdot3+1 = 7$ and $2\cdot 3 + 2 = 8$, both less than $10$, and parent $\lfloor (3-1)/2\rfloor = 1$. A node $i$ is a leaf when its left child index is out of range, $2i + 1 \ge 10$, that is $i \ge 4.5$: the leaves are indices $5, 6, 7, 8, 9$. Node $4$ has a left child ($9$) but no right child ($10$ is out of range). In general a complete tree with $n$ nodes has $\lceil n/2\rceil$ leaves, at indices $\lfloor n/2\rfloor$ to $n-1$; and depth of node $i$ is $\lfloor \log_2(i+1)\rfloor$, so node $9$ is at depth $3$.
:::
:::

## Traversals

A **traversal** visits every node of a tree exactly once, doing something at each visit — printing it, adding up a quantity, checking a property. For a binary tree the three **depth-first** traversals differ only in *when* the root is visited relative to its subtrees.

::: algorithm Depth-first traversals of a binary tree {#alg-traversals}
To traverse a binary tree $t$: if $t$ is empty, do nothing. Otherwise:

- **preorder**: visit the root of $t$; traverse its left subtree; traverse its right subtree;
- **inorder**: traverse its left subtree; visit the root; traverse its right subtree;
- **postorder**: traverse its left subtree; traverse its right subtree; visit the root.
:::

The fourth standard traversal is breadth-first:

::: algorithm Level-order traversal {#alg-level-order}
1. Create a queue containing the root (if the tree is non-empty).
2. While the queue is non-empty: dequeue a node, visit it, and enqueue its non-empty children from left to right.
:::

All four are short programs:

```python
from collections import deque

def preorder(t, out):
    if t is not None:
        out.append(t.key)          # visit the root first
        preorder(t.left, out)
        preorder(t.right, out)
    return out

def inorder(t, out):
    if t is not None:
        inorder(t.left, out)
        out.append(t.key)          # visit the root between the subtrees
        inorder(t.right, out)
    return out

def postorder(t, out):
    if t is not None:
        postorder(t.left, out)
        postorder(t.right, out)
        out.append(t.key)          # visit the root last
    return out

def level_order(t):
    out, q = [], deque([t] if t else [])
    while q:
        node = q.popleft()         # FIFO: shallower nodes come out first
        out.append(node.key)
        for child in (node.left, node.right):
            if child is not None:
                q.append(child)
    return out
```

::: example Four traversals of one tree {#ex-traversals}
Give the preorder, inorder, postorder and level-order sequences of the tree

```text
        A
      /   \
     B     C
    / \     \
   D   E     F
      /
     G
```
::: solution
*Preorder*: the root $A$ first, then all of the left subtree in preorder ($B$, then $D$, then $E$'s subtree $E, G$), then the right subtree ($C, F$): `A B D E G C F`.

*Inorder*: the left subtree of $A$ in inorder is $D$ (left of $B$), $B$, then $E$'s subtree, which is $G$ (left of $E$) then $E$: so `D B G E`; then $A$; then $C$'s subtree, $C$ followed by $F$ (since $C$ has no left child). Altogether `D B G E A C F`.

*Postorder*: $D$, then $G$, $E$ (children before parents), then $B$; then $F$, $C$; finally $A$: `D G E B F C A`.

*Level order*: level $0$ is $A$, level $1$ is $B, C$, level $2$ is $D, E, F$, level $3$ is $G$: `A B C D E F G`.

Building the tree with the `Node` class and running the four functions confirms it:

```python
t = Node("A", Node("B", Node("D"), Node("E", Node("G"))), Node("C", None, Node("F")))
print("pre  ", " ".join(preorder(t, [])))
print("in   ", " ".join(inorder(t, [])))
print("post ", " ".join(postorder(t, [])))
print("level", " ".join(level_order(t)))
```

```console
$ python3 traversals.py
pre   A B D E G C F
in    D B G E A C F
post  D G E B F C A
level A B C D E F G
```

Two checks catch most mistakes: the root is first in preorder and last in postorder, and in inorder everything left of the root's position belongs to its left subtree.
:::
:::

::: widget graph
nodes: A@3,3; B@1.5,2; C@4.5,2; D@0.75,1; E@2.25,1; F@5.25,1; G@1.75,0
edges: A-B; A-C; B-D; B-E; E-G; C-F
algorithm: dfs
start: A
caption: Depth-first search from the root of the tree in [[#ex-traversals]]. The order in which nodes are *discovered* is the preorder `A B D E G C F`, and the order in which they are *finished* (popped off the stack) is the postorder `D G E B F C A`. Watch the stack: it always holds the path from the root to the current node, so its size never exceeds the height plus one.
:::

::: widget graph
nodes: A@3,3; B@1.5,2; C@4.5,2; D@0.75,1; E@2.25,1; F@5.25,1; G@1.75,0
edges: A-B; A-C; B-D; B-E; E-G; C-F
algorithm: bfs
start: A
caption: Breadth-first search on the same tree visits the nodes level by level — the level order `A B C D E F G` of [[#alg-level-order]]. The distance labels are the depths. At its fullest, the queue holds a whole level of the tree, which in a bushy tree is about half of all the nodes.
:::

::: theorem Cost of traversals {#thm-traversal-cost}
Each traversal of a binary tree with $n$ nodes and height $h$ visits every node exactly once and runs in $\Theta(n)$ time, assuming each visit takes $O(1)$ time. The recursive depth-first traversals use $\Theta(h)$ stack space beyond the output; level order uses $O(w)$ queue space, where $w$ is the largest number of nodes on one level.
:::

::: proof
*Each node is visited exactly once*, by strong induction on the size of the tree: a call on a tree with root $r$ visits $r$ once and, by the induction hypothesis, each node of the two subtrees once in the recursive calls; the subtrees are disjoint and do not contain $r$. For level order, each node is enqueued exactly once — when its parent is dequeued, or at the start for the root — and visited when it is dequeued.

*Time.* A recursive traversal makes one call per node and one per empty subtree. A binary tree with $n$ nodes has $2n$ child slots of which $n - 1$ are filled (by [[#prop-edges]]), so there are $n + 1$ empty subtrees, and $2n + 1$ calls in all, each doing $O(1)$ work besides its recursive calls: $\Theta(n)$. Level order does $O(1)$ work per node.

*Space.* The active calls at any moment correspond to the nodes on a path from the root, plus possibly one empty subtree, so the recursion depth is at most $h + 2$. For level order, by induction, the queue holds only nodes of two adjacent levels, $d$ (not yet dequeued) and $d+1$ (enqueued as children), and at most the number of nodes on level $d$ plus their children enqueued so far, which is $O(w)$.
:::

The $\Theta(h)$ stack space matters: on a degenerate tree of height $n - 1$ a recursive traversal recurses $n$ levels deep, which in Python raises `RecursionError` beyond about $1000$ levels. An explicit stack avoids this. The iterative inorder traversal pushes the path down the left spine, visits the node on top, and moves to its right subtree:

```python
def inorder_iterative(t):
    out, stack, p = [], [], t
    while stack or p is not None:
        while p is not None:       # go as far left as possible, saving the path
            stack.append(p)
            p = p.left
        p = stack.pop()            # leftmost node not yet visited
        out.append(p.key)
        p = p.right                # then traverse its right subtree
    return out
```

On the tree of [[#ex-traversals]] it returns `D B G E A C F`, the same as the recursive version. This is exactly what the recursion was doing, with the call stack made explicit — the same idea as the depth-first search of [[data-structures/stacks-queues]].

::: example Tracing the iterative inorder traversal {#ex-inorder-stack}
Trace `inorder_iterative` on the tree of [[#ex-traversals]], showing the stack (bottom on the left) each time a node is visited.
::: solution
The inner loop first pushes the left spine $A, B, D$. Then:

| visit | stack after the pop | next `p` | pushed by the inner loop next |
|---|---|---|---|
| $D$ | $A\;B$ | none ($D$ has no right child) | — |
| $B$ | $A$ | $E$ | $E, G$ |
| $G$ | $A\;E$ | none | — |
| $E$ | $A$ | none | — |
| $A$ | (empty) | $C$ | $C$ |
| $C$ | (empty) | $F$ | $F$ |
| $F$ | (empty) | none | — |

The loop ends when the stack is empty and `p` is `None`. The visits spell `D B G E A C F`. At every moment the stack holds the nodes whose left subtree is being traversed and which are still waiting to be visited — the ancestors at which the path turned left — so it never holds more than $h + 1$ nodes. Each node is pushed and popped once, so the traversal takes $\Theta(n)$ time.
:::
:::

## Applications of traversals

### Expression trees

An arithmetic expression is naturally a full binary tree: each internal node is an operator and its subtrees are the operands; the leaves are numbers. The expression `5 + (1 + 2) * 4 - 3` (with the usual precedence and left associativity) is the tree

```text
           -
         /   \
        +     3
      /   \
     5     *
         /   \
        +     4
       / \
      1   2
```

Its three traversals produce the three notations: preorder gives prefix (Polish) notation `- + 5 * + 1 2 4 3`; postorder gives postfix `5 1 2 + 4 * + 3 -`, exactly the output of the shunting-yard algorithm in [[data-structures/stacks-queues#alg-shunting]]; and inorder, with parentheses around every subexpression, gives back the infix form. Evaluation is a postorder traversal — both operands must be known before the operator can be applied:

```python
import operator
OPS = {"+": operator.add, "-": operator.sub, "*": operator.mul}

class Expr:
    def __init__(self, op, left=None, right=None):
        self.op, self.left, self.right = op, left, right   # op is "+", "-", "*" or a number

def evaluate(e):                       # postorder: operands before the operator
    if e.left is None:
        return e.op
    return OPS[e.op](evaluate(e.left), evaluate(e.right))

def infix(e):                          # inorder, fully parenthesised
    if e.left is None:
        return str(e.op)
    return f"({infix(e.left)} {e.op} {infix(e.right)})"

def postfix(e):
    if e.left is None:
        return str(e.op)
    return f"{postfix(e.left)} {postfix(e.right)} {e.op}"

# 5 + (1 + 2) * 4 - 3, parsed as (5 + ((1 + 2) * 4)) - 3
e = Expr("-", Expr("+", Expr(5), Expr("*", Expr("+", Expr(1), Expr(2)), Expr(4))), Expr(3))
print(infix(e))
print(postfix(e))
print(evaluate(e))
```

```console
$ python3 exprtree.py
((5 + ((1 + 2) * 4)) - 3)
5 1 2 + 4 * + 3 -
14
```

Compilers build such trees — **abstract syntax trees** — for whole programs, and then check, optimise and generate code from them by traversals ([[compilers]]).

### Hierarchies: a file system

A directory is a general tree: each directory has any number of children, files are leaves. Two questions about it need different traversal orders. *How much space does each directory use?* needs the sizes of the children first: postorder. *Print the hierarchy as an indented listing* needs each directory before its contents: preorder. In Python a nested dictionary is a convenient general tree.

::: example Directory sizes and an indented listing {#ex-dirs}
Compute the total size of every directory in a small tree and print the hierarchy with each entry's size.
::: solution
```python
# A directory tree: a dict maps names to subtrees; an int is a file size in bytes.
home = {
    "notes.txt": 1200,
    "photos": {"cat.jpg": 250_000, "dog.jpg": 310_000},
    "code": {
        "ds": {"heap.py": 3_400, "bst.py": 5_100},
        "README": 800,
    },
}

def total_size(tree):                  # postorder: children first, then the parent
    if isinstance(tree, int):
        return tree
    return sum(total_size(sub) for sub in tree.values())

def show(name, tree, depth=0):         # preorder: a directory before its contents
    print("    " * depth + f"{name}  ({total_size(tree)} B)")
    if isinstance(tree, dict):
        for child in sorted(tree):
            show(child, tree[child], depth + 1)

show("home", home)
```

```console
$ python3 dirs.py
home  (570500 B)
    code  (9300 B)
        README  (800 B)
        ds  (8500 B)
            bst.py  (5100 B)
            heap.py  (3400 B)
    notes.txt  (1200 B)
    photos  (560000 B)
        cat.jpg  (250000 B)
        dog.jpg  (310000 B)
```

`total_size` computes a directory's size only after its children's — the defining property of postorder — and `show` prints each directory before recursing into it. The Unix commands `du` (disk usage) and `tree` do exactly these two traversals. Note one inefficiency: `show` calls `total_size` afresh at every directory, so a file at depth $d$ is added up $d + 1$ times, and on a deep tree the cost is $\Theta(n h)$ rather than $\Theta(n)$. [[#exr-dirs-linear]] fixes it.
:::
:::

::: quiz
Which traversal should you use to delete (free) every node of a tree in C, so that no node is freed while a reference to it is still needed?
- [ ] Preorder
- [ ] Inorder
- [x] Postorder
- [ ] Level order without a queue
::: solution
A node's `left` and `right` references are needed to reach its children, so a node may be freed only after both subtrees have been freed: children before parent, which is postorder. Freeing the node first (preorder) would leave the program reading freed memory to find the children — undefined behaviour in C.
:::
:::

::: warning Traversal orders are easy to confuse
"Preorder", "inorder" and "postorder" refer to the position of the **root's visit** relative to its two subtrees, not to the order of the nodes' keys or depths. Inorder lists keys in sorted order *only* for a binary search tree ([[data-structures/binary-search-trees]]). Level order is not a depth-first traversal at all and needs a queue, not a stack. And a single traversal sequence does not determine the tree: `A B` is the preorder of both a root $A$ with left child $B$ and a root $A$ with right child $B$ ([[#exr-reconstruct]] shows that preorder and inorder together do determine it, when the keys are distinct).
:::

::: history
Arthur Cayley introduced the word "tree" in an 1857 paper on the theory of differential operators, and in 1889 proved that there are $n^{n-2}$ labelled trees on $n$ vertices; Gustav Kirchhoff had used spanning trees in his 1847 analysis of electrical networks. In computing, trees arrived with list processing: the IPL languages of Newell, Shaw and Simon (1956) and McCarthy's LISP (1960), whose S-expressions are binary trees, made tree-shaped data ordinary. Expression trees and their traversals underlie the formula translators of the late 1950s. Donald Knuth's *The Art of Computer Programming*, volume 1 (1968), §2.3, set out the terminology and the traversal algorithms (including threaded trees for traversal without a stack) that textbooks still follow; Alan Perlis and Charles Thornton had introduced threaded trees in 1960.
:::

## Where this leads

The next chapter, [[data-structures/binary-search-trees]], orders the keys of a binary tree so that inorder traversal lists them in sorted order and a search follows a single root-to-leaf path; its cost is the height, which [[#thm-height-size]] bounds between $\log_2 n$ and $n$. [[data-structures/balanced-trees]] keeps the height logarithmic, and [[data-structures/heaps]] uses the implicit array representation of complete trees. Depth-first and breadth-first traversals generalise from trees to graphs ([[data-structures/graph-representations]] and [[algorithms]]), where the tree becomes the search tree of the traversal. Parse trees and abstract syntax trees are the central data structures of [[compilers]].

::: summary
- A **rooted tree** ([[#def-rooted-tree]]) is a root with a sequence of disjoint subtrees; a tree with $n$ nodes has $n - 1$ edges ([[#prop-edges]]). Depth is measured from the root, height from the leaves.
- A **binary tree** ([[#def-binary-tree]]) has distinct left and right subtrees. One of height $h$ has at most $2^{h+1} - 1$ nodes, so its height is between $\lfloor \log_2 n\rfloor$ and $n - 1$ ([[#thm-height-size]]). A full binary tree has one more leaf than internal nodes ([[#thm-full-leaves]]).
- Trees are stored as linked nodes, as lists of children or left-child/right-sibling pairs, as parent arrays, or — for complete trees — implicitly in an array with children of $i$ at $2i+1$ and $2i+2$.
- Preorder, inorder and postorder visit the root before, between or after its subtrees; level order uses a queue. All take $\Theta(n)$ time; recursion needs $\Theta(h)$ stack space ([[#thm-traversal-cost]]).
- Postorder evaluates expression trees and aggregates over hierarchies; preorder prints hierarchies and copies trees; postorder frees them.
:::

## Exercises

::: exercise Vocabulary {level=1}
In the tree of [[#ex-traversals]], list the leaves, the internal nodes, the ancestors of $G$, the depth of $G$, the height of $B$ and the height of the tree. Is the tree full? Complete?
::: solution
Leaves: $D, G, F$. Internal: $A, B, C, E$. Ancestors of $G$: $E, B, A$. Depth of $G$: $3$. Height of $B$: $2$ (path $B$–$E$–$G$). Height of the tree: $3$. It is not full ($C$ and $E$ have one child each) and not complete: level 2 has only three of its four possible positions filled (the left child of $C$ is missing), yet there is a level 3.
:::
:::

::: exercise Nodes in a perfect tree {level=1 check="1023"}
How many nodes does a perfect binary tree of height $9$ have? (Enter the number.)
::: solution
By [[#thm-height-size]], $2^{9+1} - 1 = 1023$. Of these, $2^9 = 512$ are leaves and $511$ are internal, in line with [[#thm-full-leaves]].
:::
:::

::: exercise Counting shapes {level=1 check="5"}
How many different binary trees (shapes, ignoring keys) have exactly $3$ nodes? (Enter the number.)
::: solution
Let $b_n$ be the number of shapes with $n$ nodes. A tree with $n \ge 1$ nodes has a root and subtrees of sizes $k$ and $n - 1 - k$, so $b_n = \sum_{k=0}^{n-1} b_k b_{n-1-k}$ with $b_0 = 1$. Then $b_1 = 1$, $b_2 = 2$, $b_3 = b_0b_2 + b_1b_1 + b_2b_0 = 2 + 1 + 2 = 5$. These are the Catalan numbers: four of the five shapes are chains (each of the two lower nodes to the left or right) and one is the perfect tree of height $1$.
:::
:::

::: exercise Traversals of an expression tree {level=2}
Draw the expression tree of `(a - b) * (c + d * e)` and write down its preorder, inorder and postorder sequences.
::: solution
The root is `*`; its left subtree is `-` with leaves `a`, `b`; its right subtree is `+` with left leaf `c` and right subtree `*` with leaves `d`, `e`.

Preorder: `* - a b + c * d e`. Inorder: `a - b * c + d * e` (without parentheses this is ambiguous — which is why infix needs them). Postorder: `a b - c d e * + *`.
:::
:::

::: exercise Reconstructing a tree {#exr-reconstruct level=2}
A binary tree with distinct keys has preorder `F B A D C E G I H` and inorder `A B C D E F G H I`. Reconstruct it, and prove that preorder and inorder sequences of distinct keys always determine the tree.
::: solution
The first key of the preorder, $F$, is the root. In the inorder, $F$ splits the keys into the left subtree `A B C D E` and the right subtree `G H I`. The preorder then lists the left subtree's $5$ keys next (`B A D C E`) and the right subtree's $3$ keys last (`G I H`). Recursing: the left subtree has root $B$, with left `A` and right subtree of inorder `C D E` and preorder `D C E`, so root $D$ with children $C$ and $E$. The right subtree has root $G$, empty left, right subtree with preorder `I H` and inorder `H I`: root $I$ with left child $H$.

Proof by strong induction on $n$: the preorder's first key is the root; since keys are distinct, its position in the inorder is unique and splits the remaining keys into those of the left subtree (before it) and of the right subtree (after it). Knowing the left subtree's size $k$, the next $k$ keys of the preorder are its preorder and the rest are the right subtree's. By the induction hypothesis each subtree is determined, hence so is the tree.
:::
:::

::: exercise Height recursively {level=2}
Write a recursive function `height(t)` (with height $-1$ for the empty tree) and a function `size(t)`. Prove that `height` returns the height, and state the running time.
::: solution
```python
def height(t):
    if t is None:
        return -1
    return 1 + max(height(t.left), height(t.right))

def size(t):
    return 0 if t is None else 1 + size(t.left) + size(t.right)
```

By strong induction on the number of nodes. The empty tree has height $-1$ by convention. For a non-empty tree, the longest downward path from the root goes to one of its children and then along the longest downward path from that child, or the root is a leaf; in both cases its length is $1 + \max(h_L, h_R)$ where an empty subtree contributes $-1$ (so a leaf gets $1 + (-1) = 0$). By the induction hypothesis the recursive calls return $h_L$ and $h_R$. Both functions are postorder traversals and run in $\Theta(n)$ time ([[#thm-traversal-cost]]).
:::
:::

::: exercise Directory sizes in linear time {#exr-dirs-linear level=3}
Rewrite `show` from [[#ex-dirs]] so that the whole listing takes $\Theta(n)$ time for a tree of $n$ entries, while still printing each directory *before* its contents with its total size. Explain why a single traversal cannot print in preorder with sizes known, and how two passes, or collecting lines, solve it.
::: solution
A directory's size is known only after all its descendants have been seen (postorder), but it must be printed before them (preorder). Either compute the sizes in one postorder pass and store them, then print in a second preorder pass, or do one traversal that builds the output lines in preorder positions and fills in each directory's size when its subtree has been processed:

```python
def listing(name, tree, depth=0, lines=None):
    if lines is None:
        lines = []
    slot = len(lines)
    lines.append(None)                     # reserve the line for this entry
    if isinstance(tree, int):
        size = tree
    else:
        size = sum(listing(c, tree[c], depth + 1, lines)[0] for c in sorted(tree))
    lines[slot] = "    " * depth + f"{name}  ({size} B)"
    return size, lines

print("\n".join(listing("home", home)[1]))
```

Each entry is handled once, with $O(1)$ work besides its children (plus the sorting of names in each directory, $O(k\log k)$ for $k$ children), so the total is $\Theta(n)$ apart from sorting. The output is identical to that of [[#ex-dirs]].
:::
:::

::: exercise Level order with levels {level=3}
Modify level-order traversal to return a list of levels — a list of lists, the $d$th holding the keys of depth $d$ from left to right — without storing depths in the queue. Prove that your method is correct and runs in $\Theta(n)$ time.
::: solution
Process the queue one level at a time: at the start of each round the queue holds exactly the nodes of one level.

```python
from collections import deque

def levels(t):
    result, q = [], deque([t] if t else [])
    while q:
        level = []
        for _ in range(len(q)):            # exactly the nodes of the current level
            node = q.popleft()
            level.append(node.key)
            for child in (node.left, node.right):
                if child is not None:
                    q.append(child)
        result.append(level)
    return result
```

Invariant: at the start of round $d$ the queue contains exactly the nodes of depth $d$, left to right. True for $d = 0$. During round $d$ we dequeue exactly those `len(q)` nodes (in order) and enqueue their children, which are exactly the nodes of depth $d+1$, in left-to-right order because children of a left node precede those of a right node. On the tree of [[#ex-traversals]] the result is `[['A'], ['B', 'C'], ['D', 'E', 'F'], ['G']]`. Each node is enqueued and dequeued once: $\Theta(n)$.
:::
:::
