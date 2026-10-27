The binary search trees of [[data-structures/binary-search-trees]] have one serious flaw: their height, and hence the cost of every operation, depends on the order in which keys arrive. Insert a hundred thousand customer numbers in increasing order and the "tree" is a path a hundred thousand nodes long; each search walks, on average, fifty thousand steps. A random order would give a height of a few dozen — but a library cannot assume that its users insert in random order.

**Balanced search trees** remove the dependence. They keep the height $O(\log n)$ for *every* sequence of insertions and deletions, by checking a local balance condition after each update and repairing it with a few cheap restructuring steps called **rotations**. This chapter presents the three classical designs. **AVL trees** keep the heights of the two subtrees of every node within one of each other. **Red–black trees** colour nodes and keep every root-to-leaf path within a factor of two of every other; they are the ordered maps of most standard libraries. **B-trees** give up binary nodes altogether, storing many keys per node so that a tree of a billion keys is only three or four levels deep — the right shape when every node visited costs a disk access. For each we prove the height bound, which is where the guarantee comes from, and explain how updates maintain it.

## Rotations

All balanced binary trees restructure with the same primitive. A rotation changes the shape of a small part of the tree while preserving the inorder sequence — and therefore, by [[data-structures/binary-search-trees#thm-inorder-sorted]], the search-tree property.

::: definition Rotation {#def-rotation}
Let $y$ be a node with left child $x$, and let $A$ and $B$ be the left and right subtrees of $x$ and $C$ the right subtree of $y$. A **right rotation** at $y$ makes $x$ the root of this part of the tree, with $y$ as its right child, $A$ as $x$'s left subtree, and $B$ and $C$ as $y$'s left and right subtrees. A **left rotation** at $x$ is the inverse operation.

```text
          y                           x
         / \     rotate right at y   / \
        x   C   ---------------->   A   y
       / \      <----------------      / \
      A   B      rotate left at x     B   C
```
:::

::: lemma Rotations preserve the search-tree property {#lem-rotation}
A rotation changes $O(1)$ references, takes $O(1)$ time, and leaves the inorder sequence of the tree unchanged.
:::

::: proof
Both shapes have inorder sequence $A, x, B, y, C$: in the left shape, $y$'s left subtree (listed before $y$) is $A, x, B$; in the right shape, $x$'s right subtree (listed after $x$) is $B, y, C$. The rest of the tree sees only a different root for this part, attached to the same parent link. Exactly three links change: the parent's link (to $x$ instead of $y$), $x$'s right link (to $y$) and $y$'s left link (to $B$).
:::

Rotations move $A$ up one level and $C$ down one level (for a right rotation), leaving $B$ at the same depth. That is the lever balanced trees pull: if $A$ is too deep, a right rotation at $y$ lifts it.

## AVL trees

::: definition AVL tree {#def-avl}
The **balance factor** of a node is the height of its left subtree minus the height of its right subtree (with height $-1$ for an empty subtree). An **AVL tree** is a binary search tree in which every node has balance factor $-1$, $0$ or $+1$.
:::

Each node stores its height (or just its balance factor, which needs two bits). The condition is local, but it constrains the shape globally.

::: theorem AVL trees have logarithmic height {#thm-avl-height}
An AVL tree with $n$ nodes has height $h \le \log_\phi(n + 1) - 1 < 1.4405\log_2(n+1)$, where $\phi = (1 + \sqrt5)/2$. More precisely, $n \ge F_{h+3} - 1$, where $F_k$ is the $k$th Fibonacci number ($F_1 = F_2 = 1$).
:::

::: proof
Let $N(h)$ be the minimum number of nodes in an AVL tree of height $h$. Then $N(0) = 1$ and $N(1) = 2$. For $h \ge 2$, a minimal tree of height $h$ has a root, one subtree of height $h-1$ and, since balance factors are at most $1$ in absolute value, another of height at least $h - 2$; a minimal tree uses height exactly $h - 2$ for it and minimal subtrees throughout, so

$$
N(h) = 1 + N(h-1) + N(h-2).
$$

Put $M(h) = N(h) + 1$: then $M(h) = M(h-1) + M(h-2)$ with $M(0) = 2 = F_3$ and $M(1) = 3 = F_4$, so $M(h) = F_{h+3}$ and $N(h) = F_{h+3} - 1$. Every AVL tree of height $h$ has $n \ge N(h)$ nodes.

The Fibonacci numbers satisfy $F_k \ge \phi^{k-2}$ for $k \ge 1$ (by induction, since $\phi^2 = \phi + 1$: $F_{k} = F_{k-1} + F_{k-2} \ge \phi^{k-3} + \phi^{k-4} = \phi^{k-4}(\phi + 1) = \phi^{k-2}$, with $F_1 = 1 \ge \phi^{-1}$ and $F_2 = 1 = \phi^0$). So $n + 1 \ge F_{h+3} \ge \phi^{h+1}$, giving $h \le \log_\phi(n+1) - 1 < \log_\phi(n+1)$. Finally $\log_\phi x = \log_2 x / \log_2\phi$ and $1/\log_2\phi \approx 1.4404$.
:::

So an AVL tree is never more than about $44\%$ taller than a perfectly balanced tree. The minimal AVL trees in the proof are called **Fibonacci trees**; they are as lopsided as the condition allows.

### Insertion

Insert as in an ordinary BST; the new leaf may increase the heights of its ancestors and so unbalance some of them, by one too many. Walking back up the insertion path, we update heights and, at the first node whose balance factor has become $\pm 2$, perform one rotation or a pair of rotations.

::: algorithm AVL rebalancing {#alg-avl}
At a node $z$ on the path back to the root, after updating its height:

1. If $z$'s balance factor is $+2$ (left subtree too tall), let $x$ be its left child.
   - **Left–left case** ($x$'s left subtree is at least as tall as its right): rotate right at $z$.
   - **Left–right case** ($x$'s right subtree is taller): rotate left at $x$, then right at $z$ (a **double rotation**).
2. If $z$'s balance factor is $-2$, do the mirror image: rotate left at $z$ in the right–right case; rotate right at $z$'s right child and then left at $z$ in the right–left case.
:::

::: theorem One rebalancing suffices after an insertion {#thm-avl-insert}
After a BST insertion into an AVL tree, let $z$ be the lowest ancestor of the new leaf whose balance factor is $\pm2$. The rebalancing of [[#alg-avl]] at $z$ makes the subtree rooted there an AVL tree whose height equals its height *before* the insertion. Hence no node above it needs any change, and insertion takes $O(\log n)$ time with at most two rotations.
:::

::: proof
Suppose $z$'s balance factor is $+2$ (the other case is symmetric). Let $x = z.\mathit{left}$ and let $h$ be the height of $z$'s right subtree, so $x$ now has height $h + 2$. Since the insertion added one leaf, it raised $x$'s height by exactly one, from $h + 1$: $z$ was balanced before, with height $h + 2$. The new leaf is in one subtree of $x$, whose height has become $h + 1$, and the other subtree of $x$ has height $h$ — if it were $h + 1$, $x$ would already have had height $h + 2$ before the insertion. ($x$ itself is balanced, because $z$ is the *lowest* unbalanced node.)

*Left–left case*: $x.\mathit{left}$ has height $h + 1$ and $x.\mathit{right}$ height $h$. After a right rotation at $z$, node $z$ has subtrees $x.\mathit{right}$ and the old right subtree, both of height $h$, so $z$ has height $h+1$ and balance $0$; node $x$ has subtrees of heights $h + 1$ and $h + 1$, balance $0$ and height $h + 2$.

*Left–right case*: $x.\mathit{left}$ has height $h$ and $y = x.\mathit{right}$ has height $h + 1$, with subtrees $B$ and $C$ of heights $h$ and $h-1$ in some order (or $y$ is the new leaf itself, when $h = -1$). The double rotation makes $y$ the root with children $x$ (subtrees $x.\mathit{left}$ of height $h$ and $B$ of height $\le h$) and $z$ (subtrees $C$ of height $\le h$ and $z$'s right subtree of height $h$). Both $x$ and $z$ have height $h + 1$ and balance factor $0$ or $\pm1$, and $y$ has height $h + 2$ and balance $0$.

In both cases the subtree is balanced and its height $h + 2$ is the height before the insertion, so the heights and balance factors of all ancestors are as they were before. The work is $O(1)$ per node on a path of length $O(\log n)$ (by [[#thm-avl-height]]), plus at most two rotations.
:::

Deletion is similar but less tidy: removing a node may *decrease* a height, and the rotation that repairs one node may decrease the height of its subtree, unbalancing an ancestor in turn. Deletion therefore takes $O(\log n)$ time but may need up to $O(\log n)$ rotations, one at each level.

Here is AVL insertion in Python. Each node stores its height; `rebalance` is called on every node of the insertion path as the recursion unwinds, which is simpler than stopping at the first unbalanced node and costs only $O(1)$ extra per level.

```python
class Node:
    def __init__(self, key):
        self.key, self.left, self.right, self.height = key, None, None, 0

def h(t):
    return -1 if t is None else t.height

def update(t):
    t.height = 1 + max(h(t.left), h(t.right))

def rotate_right(y):              # y's left child x becomes the subtree root
    x = y.left
    y.left, x.right = x.right, y
    update(y); update(x)
    return x

def rotate_left(x):               # mirror image
    y = x.right
    x.right, y.left = y.left, x
    update(x); update(y)
    return y

def rebalance(t):
    update(t)
    bf = h(t.left) - h(t.right)   # balance factor
    if bf > 1:                    # left-heavy
        if h(t.left.left) < h(t.left.right):
            t.left = rotate_left(t.left)        # left-right case: double rotation
        return rotate_right(t)
    if bf < -1:                   # right-heavy
        if h(t.right.right) < h(t.right.left):
            t.right = rotate_right(t.right)     # right-left case: double rotation
        return rotate_left(t)
    return t

def insert(t, key):
    if t is None:
        return Node(key)
    if key < t.key:
        t.left = insert(t.left, key)
    elif key > t.key:
        t.right = insert(t.right, key)
    return rebalance(t)           # fix heights and balance on the way back up
```

::: example Sorted insertions into an AVL tree {#ex-avl-sorted}
Insert $1, 2, \dots, 7$ in increasing order into an empty AVL tree, showing the tree after each insertion in the notation root(left, right). Then insert $1, \dots, 100\,000$ in order and report the height.
::: solution
```python
def shape(t):                     # root(left, right) notation
    if t is None:
        return "-"
    if t.left is None and t.right is None:
        return str(t.key)
    return f"{t.key}({shape(t.left)}, {shape(t.right)})"

root = None
for k in range(1, 8):
    root = insert(root, k)
    print(k, shape(root))

root = None
for k in range(1, 100_001):       # sorted input: the worst case for a plain BST
    root = insert(root, k)
print("height after 100000 sorted insertions:", root.height)
```

```console
$ python3 avl.py
1 1
2 1(-, 2)
3 2(1, 3)
4 2(1, 3(-, 4))
5 2(1, 4(3, 5))
6 4(2(1, 3), 5(-, 6))
7 4(2(1, 3), 6(5, 7))
height after 100000 sorted insertions: 16
```

Inserting $3$ makes the root $1$ right-heavy (balance $-2$) with its right child $2$ right-heavy too: a right–right case, fixed by a left rotation at $1$. Inserting $5$ unbalances $3$ (the lowest unbalanced node), fixed by a left rotation there, which makes $4$ the right child of $2$. Inserting $6$ unbalances the root $2$: rotating left at $2$ makes $4$ the root. Inserting $7$ unbalances $5$. After $7$ insertions the tree is perfect, of height $2$.

For $100\,000$ sorted keys the height is $16 = \lfloor\log_2 100\,000\rfloor$, the minimum possible — where a plain BST would have height $99\,999$. (Sorted input happens to be a good case for AVL trees; [[#thm-avl-height]] guarantees at most $1.44\log_2(n+1) \approx 23.9$ for any order.)
:::
:::

::: example A double rotation {#ex-avl-double}
Insert $40, 20, 60, 10, 30$ and then $25$ into an empty AVL tree. Which case occurs at the last insertion, and what is the resulting tree?
::: solution
The first five keys give $40(20(10, 30), 60)$, an AVL tree with balance factor $+1$ at the root. The key $25$ goes left of $30$. Now $30$ has height $1$, $20$ has height $2$, and the root $40$ has a left subtree of height $2$ and a right subtree ($60$) of height $0$: balance $+2$. The lowest unbalanced node is $40$ ($20$ has subtrees of heights $0$ and $1$, balance $-1$). Its left child $20$ is *right*-heavy, so this is the **left–right case**: rotate left at $20$ (making $30$ the parent of $20$), then rotate right at $40$. The result is

```text
        30
       /  \
     20    40
    /  \     \
  10    25    60
```

that is, $30(20(10, 25), 40(-, 60))$, which the program above also produces. A single right rotation at $40$ would not have worked: it would make $20$ the root with right subtree $40(30(25, -), 60)$, whose root has balance $+1$, but $20$ itself would have balance $0 - 2 = -2$. The middle key $30$ has to move up two levels, which takes two rotations.
:::
:::

::: widget graph
nodes: 4@3,2; 2@1.5,1; 6@4.5,1; 1@0.75,0; 3@2.25,0; 5@3.75,0; 7@5.25,0
edges: 4-2; 4-6; 2-1; 2-3; 6-5; 6-7
caption: The AVL tree after inserting $1, \dots, 7$ in sorted order ([[#ex-avl-sorted]]) — perfectly balanced, where a plain binary search tree would be a path of seven nodes. Four rotations produced it. Imagine inserting $8$: it goes right of $7$, every balance factor on the path becomes $-1$ but none reaches $-2$, so no rotation is needed.
:::

## Red–black trees

AVL trees are tightly balanced, but keeping them so can need many rotations on deletion. **Red–black trees** relax the balance condition to a factor of two, in exchange for updates that need only a constant number of rotations.

::: definition Red–black tree {#def-rb}
A **red–black tree** is a binary search tree whose nodes are each coloured red or black, with empty subtrees regarded as black **nil** leaves, such that:

1. the root is black;
2. a red node has no red child (equivalently: both children of a red node are black);
3. for every node $x$, all paths from $x$ down to a nil leaf contain the same number of black nodes, not counting $x$ itself. This number is the **black-height** $\mathit{bh}(x)$.
:::

::: theorem Red–black trees have logarithmic height {#thm-rb-height}
A red–black tree with $n$ (non-nil) nodes has height at most $2\log_2(n+1)$.
:::

::: proof
*Claim: the subtree rooted at any node $x$ contains at least $2^{\mathit{bh}(x)} - 1$ non-nil nodes.* By induction on the height of $x$. If $x$ is a nil leaf, $\mathit{bh}(x) = 0$ and the subtree has $0 = 2^0 - 1$ nodes. Otherwise each child $c$ of $x$ has black-height $\mathit{bh}(x)$ (if $c$ is red) or $\mathit{bh}(x) - 1$ (if $c$ is black), so at least $\mathit{bh}(x) - 1$; by the induction hypothesis each child's subtree has at least $2^{\mathit{bh}(x) - 1} - 1$ nodes, and the subtree of $x$ has at least $2(2^{\mathit{bh}(x)-1} - 1) + 1 = 2^{\mathit{bh}(x)} - 1$.

Now let $h$ be the height of the tree. On a longest root-to-leaf path, no two red nodes are adjacent (property 2), and the root is black, so at least half of the nodes below the root on this path, i.e. at least $h/2$ of them, are black. Hence $\mathit{bh}(\mathit{root}) \ge h/2$, and by the claim $n \ge 2^{h/2} - 1$. Rearranging gives $h \le 2\log_2(n + 1)$.
:::

The bound is weaker than the AVL bound ($2$ against $1.44$), so red–black trees can be somewhat taller, and searches somewhat slower. In return, updates restructure less.

### Insertion

A new key is inserted as a BST leaf and coloured **red**, which preserves property 3 (it adds no black nodes to any path). The only property that can fail is property 2, if the new node's parent is red, or property 1, if the new node is the root. The **fix-up** moves the problem up the tree. Let $z$ be the red node with a red parent $p$; then $p$ is not the root (the root is black), so $z$ has a grandparent $g$, which is black. Let $u$ be $z$'s **uncle**, the other child of $g$.

::: algorithm Red–black insertion fix-up {#alg-rb-insert}
While $z$'s parent $p$ is red (with grandparent $g$ and uncle $u$):

1. **Case 1 — the uncle is red.** Recolour: $p$ and $u$ become black, $g$ becomes red. Continue with $z \gets g$, two levels up.
2. **Case 2 — the uncle is black and $z$ is an "inner" grandchild** ($z$ is the right child of a left child $p$, or the left child of a right child). Rotate at $p$ so that $p$ becomes the child of $z$; rename so that $z$ is again the lower of the two red nodes (now an "outer" grandchild) and go to case 3.
3. **Case 3 — the uncle is black and $z$ is an "outer" grandchild.** Rotate at $g$ (right if $p$ is a left child, left otherwise), then colour $p$ black and $g$ red. The loop ends.

Finally colour the root black.
:::

Case 1 changes only colours and may repeat up the tree, $O(\log n)$ times. Cases 2 and 3 happen at most once, at the end. A proof that each step preserves property 3 and makes progress on property 2 is a careful case check; see Cormen, Leiserson, Rivest and Stein (4th ed., 2022), §13.3. The results:

::: theorem Red–black updates {#thm-rb-updates}
Insertion into a red–black tree takes $O(\log n)$ time and performs at most two rotations; deletion takes $O(\log n)$ time and performs at most three rotations.
:::

::: example Red–black insertions {#ex-rb}
Insert $10, 20, 30, 15, 25, 5, 1, 28$ in that order into an empty red–black tree. Write $k$R for a red node and $k$B for a black one. (The trees below are the output of an implementation of [[#alg-rb-insert]].)
::: solution
| insert | fix-up | tree after |
|---|---|---|
| 10 | root coloured black | 10B |
| 20 | parent black: nothing | 10B(-, 20R) |
| 30 | uncle (nil) black, outer: case 3, rotate left at 10 | 20B(10R, 30R) |
| 15 | uncle 30 red: case 1, recolour; root back to black | 20B(10B(-, 15R), 30B) |
| 25 | parent black: nothing | 20B(10B(-, 15R), 30B(25R, -)) |
| 5 | parent black: nothing | 20B(10B(5R, 15R), 30B(25R, -)) |
| 1 | uncle 15 red: case 1 at 5, then 10's parent 20 is black, stop | 20B(10R(5B(1R, -), 15B), 30B(25R, -)) |
| 28 | uncle (nil, right of 30) black, $28$ inner: case 2 rotate left at 25, then case 3 rotate right at 30 | 20B(10R(5B(1R, -), 15B), 28B(25R, 30R)) |

Check the final tree. The root is black, and no red node has a red child. Every path from the root down to a nil leaf meets exactly two black nodes below the root, counting the nil leaf: $20 \to 10 \to 5 \to 1 \to \text{nil}$ meets $5$B and the nil; $20 \to 10 \to 15 \to \text{nil}$ meets $15$B and the nil; $20 \to 28 \to 30 \to \text{nil}$ meets $28$B and the nil. So the black-height of the root is $2$. The tree has height $3$, within the bound $2\log_2 9 \approx 6.3$ of [[#thm-rb-height]].
:::
:::

::: intuition Red–black trees are 2–3–4 trees in disguise
Merge every red node into its black parent. Each black node together with its red children becomes one "fat" node holding $1$, $2$ or $3$ keys and having $2$, $3$ or $4$ children, and property 3 says that all leaves of the fat tree are at the same depth. This fat tree is a **2–3–4 tree**, the B-tree with minimum degree $2$ of the next section, and the red–black operations simulate its node splits by recolouring and rotation: case 1 of [[#alg-rb-insert]] is the split of a full 4-node, whose middle key (now red) moves up into the parent. Sedgewick's **left-leaning red–black trees** (2008) correspond in the same way to 2–3 trees and have particularly short code.
:::

::: quiz
Which statements about a red–black tree with $n$ nodes are true? (Choose all that apply.)
- [x] The longest root-to-leaf path is at most twice as long as the shortest.
- [x] Its height is $O(\log n)$.
- [ ] Every node has balance factor in $\set{-1, 0, 1}$.
- [ ] Insertion can require $\Theta(\log n)$ rotations.
::: solution
All root-to-nil paths have the same number of black nodes, and the longest can at most interleave a red node after each black one, so it is at most twice as long as the shortest (all black). Height is at most $2\log_2(n+1)$ ([[#thm-rb-height]]). A red–black tree need not be AVL-balanced: the subtree heights at a node can differ by more than one. Insertion needs at most two rotations ([[#thm-rb-updates]]), though recolouring can propagate up $\Theta(\log n)$ levels.
:::
:::

## B-trees

Binary trees are the wrong shape when nodes live on a disk or SSD. Reading a block from storage takes far longer than examining the keys in it — as of 2026, on the order of $10$ ms for a random read from a hard disk and $0.1$ ms from an SSD, against nanoseconds for a comparison in memory. A balanced binary tree of a billion keys has height about $30$, so a search would read $30$ blocks. If instead each node holds hundreds of keys and has hundreds of children, filling one block, the height drops to three or four.

::: definition B-tree {#def-btree}
A **B-tree** of **minimum degree** $t \ge 2$ is a rooted tree in which:

1. every node $x$ stores $k_x$ keys in increasing order, $\mathit{key}_1 < \dots < \mathit{key}_{k_x}$, and, if it is internal, $k_x + 1$ children $c_0, \dots, c_{k_x}$, such that every key in the subtree of $c_i$ lies between $\mathit{key}_i$ and $\mathit{key}_{i+1}$ (with $\mathit{key}_0 = -\infty$, $\mathit{key}_{k_x + 1} = +\infty$);
2. all leaves have the same depth;
3. every node other than the root has at least $t - 1$ keys, every node at most $2t - 1$ keys, and a non-empty tree's root at least $1$ key.

A node with $2t-1$ keys is **full**. For $t = 2$, nodes have $2$, $3$ or $4$ children: a **2–3–4 tree**.
:::

::: theorem B-tree height {#thm-btree-height}
A B-tree of minimum degree $t$ with $n \ge 1$ keys has height $h \le \log_t\dfrac{n+1}{2}$.
:::

::: proof
The root has at least one key and so at least $2$ children (if $h \ge 1$); every other internal node has at least $t$ children. So there are at least $2$ nodes at depth $1$, at least $2t$ at depth $2$, and at least $2t^{d-1}$ at depth $d$, for $1 \le d \le h$, each holding at least $t - 1$ keys. Counting keys,

$$
n \ge 1 + (t - 1)\sum_{d=1}^{h} 2t^{d-1} = 1 + 2(t-1)\frac{t^h - 1}{t - 1} = 2t^h - 1,
$$

so $t^h \le (n+1)/2$ and $h \le \log_t\frac{n+1}{2}$.
:::

With $t = 500$ (up to $999$ keys per node) and $n = 10^9$ keys, $h \le \log_{500}(5\times10^8) \approx 3.2$, so $h \le 3$: any key is found by reading at most $4$ nodes, and the root and probably the second level stay cached in memory.

**Search** is the BST search generalised: in node $x$, find the first key $\ge k$ (by linear or binary search within the node); if it equals $k$, done; otherwise descend into the child between the neighbouring keys. It reads $O(h) = O(\log_t n)$ nodes and does $O(t)$ work in each (or $O(\log t)$ with binary search), $O(t\log_t n)$ CPU time in all.

**Insertion** always adds the key to a leaf, but a full leaf cannot take another key. The remedy is to **split** a full node: its median key moves up into the parent, and the $t - 1$ keys on each side form two nodes. To be sure the parent has room, the standard algorithm splits every full node it meets *on the way down*, so it never has to come back up.

::: algorithm B-tree insertion (single pass, splitting on the way down) {#alg-btree-insert}
1. If the root is full, create a new root with the old root as its only child and split that child; the tree grows one level taller. (This is the only way a B-tree's height increases — at the top, which is why all leaves stay at the same depth.)
2. Descend from the root towards the leaf where $k$ belongs. Before moving to a child that is full, split it: its median key moves up into the current node (which is not full, by the previous step), and the child becomes two nodes of $t - 1$ keys each. Continue into the half that contains $k$'s position.
3. Insert $k$ into the leaf, which is not full, at its place in the sorted order.
:::

```python
class BNode:
    def __init__(self, leaf=True):
        self.keys, self.children, self.leaf = [], [], leaf

class BTree:
    """B-tree of minimum degree t: every node except the root holds t-1 to 2t-1 keys."""
    def __init__(self, t):
        self.t, self.root = t, BNode()

    def search(self, x, k):
        i = 0
        while i < len(x.keys) and k > x.keys[i]:
            i += 1                                   # first key >= k
        if i < len(x.keys) and k == x.keys[i]:
            return x, i
        return None if x.leaf else self.search(x.children[i], k)

    def _split_child(self, x, i):                    # x.children[i] is full
        t, y = self.t, x.children[i]
        z = BNode(y.leaf)
        x.keys.insert(i, y.keys[t - 1])              # the median moves up
        x.children.insert(i + 1, z)
        z.keys, y.keys = y.keys[t:], y.keys[:t - 1]  # t-1 keys on each side
        if not y.leaf:
            z.children, y.children = y.children[t:], y.children[:t]

    def insert(self, k):
        r = self.root
        if len(r.keys) == 2 * self.t - 1:            # full root: the tree grows taller
            self.root = BNode(leaf=False)
            self.root.children.append(r)
            self._split_child(self.root, 0)
        x = self.root
        while not x.leaf:                            # descend, splitting full nodes first
            i = sum(1 for key in x.keys if key < k)
            if len(x.children[i].keys) == 2 * self.t - 1:
                self._split_child(x, i)
                if k > x.keys[i]:
                    i += 1
            x = x.children[i]
        x.keys.insert(sum(1 for key in x.keys if key < k), k)
```

::: example Growing a 2–3–4 tree {#ex-btree}
Insert $10, 20, \dots, 90$ into an empty B-tree with $t = 2$ (at most $3$ keys per node), showing the tree after each insertion. Children are shown in braces after their parent.
::: solution
```python
def show(x):
    if x.leaf:
        return str(x.keys)
    return str(x.keys) + "{" + " ".join(show(c) for c in x.children) + "}"

B = BTree(t=2)                                       # a 2-3-4 tree
for k in [10, 20, 30, 40, 50, 60, 70, 80, 90]:
    B.insert(k)
    print(k, show(B.root))
print(B.search(B.root, 70)[0].keys, B.search(B.root, 75))
```

```console
$ python3 btree.py
10 [10]
20 [10, 20]
30 [10, 20, 30]
40 [20]{[10] [30, 40]}
50 [20]{[10] [30, 40, 50]}
60 [20, 40]{[10] [30] [50, 60]}
70 [20, 40]{[10] [30] [50, 60, 70]}
80 [20, 40, 60]{[10] [30] [50] [70, 80]}
90 [40]{[20]{[10] [30]} [60]{[50] [70, 80, 90]}}
[70, 80, 90] None
```

Inserting $40$ finds the root $[10, 20, 30]$ full: it is split, its median $20$ becoming a new root, and $40$ goes into the right half. Inserting $60$ finds the leaf $[30, 40, 50]$ full on the way down: it is split, $40$ moving up into the root. Inserting $80$ splits the full leaf $[50, 60, 70]$, sending $60$ up. Inserting $90$ finds the root $[20, 40, 60]$ full: it is split first, $40$ becoming the new root and the height growing to $2$; the descent then goes $[40] \to [60] \to [70, 80]$, which is not full, and $90$ joins that leaf. All leaves are always at the same depth. Searching for $70$ reads three nodes and returns the leaf $[70, 80, 90]$; searching for $75$ reads three and returns `None`.
:::
:::

Deletion from a B-tree is the mirror image: on the way down, make sure every node entered has at least $t$ keys, borrowing a key from a sibling (through the parent) or **merging** with a sibling when both are minimal. It too takes one pass and $O(\log_t n)$ node accesses.

In practice databases and file systems use **B+-trees**, a variant in which all keys and records live in the leaves, internal nodes hold only copies of keys for routing (so more of them fit per block, increasing the fan-out), and the leaves are linked in order so that a range scan reads consecutive leaves without returning to the root. They are the subject of index structures in [[databases]].

::: widget plot
f: log2(x + 1); 1.4405*log2(x + 2) - 0.3277; 2*log2(x + 1); log(x/2 + 0.5)/log(t)
labels: \text{perfect binary}; \text{AVL bound}; \text{red–black bound}; \text{B-tree bound}
sliders: t=2:1:200
x: 1, 1000000
y: 0, 45
caption: Worst-case heights against $n$, up to a million keys: the minimum possible for a binary tree ($\approx\log_2 n$), the AVL bound ($1.44\log_2 n$, Knuth's sharper form of [[#thm-avl-height]]), the red–black bound $2\log_2(n+1)$ ([[#thm-rb-height]]) and the B-tree bound $\log_t\frac{n+1}{2}$ ([[#thm-btree-height]]). All are logarithmic. Drag $t$: with a few hundred keys per node a B-tree of a million keys has height at most $2$.
:::

::: warning Balanced trees are not free
Balanced trees guarantee $O(\log n)$ in the worst case, but their constants are larger than a plain BST's or a hash table's: each update maintains heights or colours and may rotate, and each node carries extra fields. When the keys do not need to be ordered, a hash table is usually faster ([[data-structures/hash-tables]]). When they arrive in random order and are rarely deleted, a plain BST may do as well in practice — but only a balanced tree is safe against sorted or adversarial input. Also, "$O(\log n)$" counts comparisons: comparing long string keys costs more than comparing integers, and on modern hardware cache misses, one per level, dominate — a reason why B-tree-like layouts with many keys per node are fast even in memory.
:::

## In practice

As of 2026, red–black trees implement `std::map` and `std::set` in the major C++ standard libraries, `TreeMap` and `TreeSet` in Java, and many ordered collections inside the Linux kernel (`lib/rbtree.c`), for example the run queues of its CPU scheduler. AVL trees, being more tightly balanced, suit lookup-heavy workloads. Python has no balanced tree in its standard library: `dict` is a hash table, and code that needs order typically keeps a sorted list with the `bisect` module (fast for moderate sizes thanks to contiguous memory) or uses a third-party package. B-trees, mostly in the B+-tree form, are the default index structure of relational databases such as PostgreSQL, MySQL's InnoDB and SQLite, and organise the metadata of file systems including NTFS, Btrfs and Apple's APFS. Other balanced structures appear in the same roles: skip lists (Pugh, 1990), which balance by coin flips and are used, for example, in Redis's sorted sets; treaps; and splay trees, which are amortised rather than worst-case balanced.

::: history
Georgy Adelson-Velsky and Evgenii Landis published the first balanced search tree in "An algorithm for the organization of information" (*Doklady Akademii Nauk SSSR*, 1962), the AVL tree. Rudolf Bayer and Edward McCreight invented B-trees at Boeing Scientific Research Laboratories, presenting them in 1970 and publishing "Organization and maintenance of large ordered indexes" in *Acta Informatica* in 1972; the "B" has never been officially explained. In the same year Bayer introduced "symmetric binary B-trees", binary representations of 2–3–4 trees, and Leonidas Guibas and Robert Sedgewick recast them with red and black colours in "A dichromatic framework for balanced trees" (1978), the origin of the name red–black tree. Douglas Comer's survey "The ubiquitous B-tree" (*ACM Computing Surveys*, 1979) recorded how quickly B-trees had become universal in databases. William Pugh's skip lists (1990) and Sedgewick's left-leaning red–black trees (2008) are later simplifications of the same ideas.
:::

## Where this leads

With balanced trees, every ordered-map operation — search, insert, delete, minimum, successor, rank and range queries with the augmentations of [[data-structures/binary-search-trees]] — runs in $O(\log n)$ worst-case time. Augmented balanced trees (interval trees, order-statistic trees) and amortised or randomised alternatives (splay trees, treaps, skip lists) are developed in [[algorithms]]. Heaps ([[data-structures/heaps]]) solve a narrower problem — repeatedly extracting the minimum — more simply and faster, by giving up full ordering. B+-trees return as the index structure of [[databases]], where their cost is counted in disk blocks read, and balanced trees are the building blocks of many concurrent and persistent data structures in [[parallel-computing]] and [[distributed-systems]].

::: summary
- A **rotation** ([[#def-rotation]]) restructures three links in $O(1)$ time and preserves the inorder sequence ([[#lem-rotation]]); balanced trees use rotations to restore balance after updates.
- An **AVL tree** ([[#def-avl]]) keeps every balance factor in $\set{-1,0,1}$; its height is less than $1.4405\log_2(n+1)$ because a tree of height $h$ has at least $F_{h+3} - 1$ nodes ([[#thm-avl-height]]). One single or double rotation repairs an insertion ([[#thm-avl-insert]]); deletion may need $O(\log n)$.
- A **red–black tree** ([[#def-rb]]) has a black root, no red node with a red child, and equal black-heights; its height is at most $2\log_2(n+1)$ ([[#thm-rb-height]]). Updates need $O(\log n)$ recolourings but at most $2$ (insertion) or $3$ (deletion) rotations.
- Red–black trees correspond to 2–3–4 trees, which are B-trees of minimum degree $2$.
- A **B-tree** ([[#def-btree]]) of minimum degree $t$ keeps $t-1$ to $2t-1$ keys per node and all leaves at one depth; its height is at most $\log_t\frac{n+1}{2}$ ([[#thm-btree-height]]), which makes it the structure of choice for storage, where each node is one block.
- B-tree insertion splits full nodes on the way down; the tree grows only at the root.
:::

## Exercises

::: exercise Rotations by hand {level=1}
Perform a left rotation at the root of $2(1, 4(3, 5))$ and write the result in root(left, right) notation. Check that the inorder sequence is unchanged.
::: solution
The root $x = 2$ has right child $y = 4$; $A = 1$, $B = 3$, $C = 5$. After the left rotation $y$ is the root with left child $x$, which keeps $A$ and takes $B$ as its right subtree: $4(2(1, 3), 5)$. Inorder before: $1, 2, 3, 4, 5$; after: $1, 2, 3, 4, 5$.
:::
:::

::: exercise Minimum AVL size {level=1 check="88"}
What is the minimum number of nodes in an AVL tree of height $8$? (Enter the number.)
::: solution
$N(h) = F_{h+3} - 1$, so $N(8) = F_{11} - 1 = 89 - 1 = 88$. Alternatively from the recurrence: $N(0..8) = 1, 2, 4, 7, 12, 20, 33, 54, 88$.
:::
:::

::: exercise B-tree height {level=1 check="3"}
A B-tree of minimum degree $t = 100$ holds $n = 10^7$ keys. What is the largest height it can have? (Enter the height.)
::: solution
By [[#thm-btree-height]], $h \le \log_{100}\bigl((10^7 + 1)/2\bigr) = \log_{100}(5\,000\,000.5) \approx 3.35$, and $h$ is an integer, so $h \le 3$. (A height-$4$ tree would need at least $2\cdot 100^4 - 1 = 2\times10^8 - 1$ keys.)
:::
:::

::: exercise AVL insertions {level=2}
Insert $3, 2, 1, 4, 5, 6, 7, 16, 15, 14$ into an empty AVL tree. Name the case and the rotation(s) at each rebalancing, and give the final tree.
::: solution
$3, 2, 1$: left–left at $3$, rotate right: $2(1, 3)$. $4$: no rebalancing. $5$: right–right at $3$, rotate left: $2(1, 4(3, 5))$. $6$: right–right at $2$, rotate left: $4(2(1, 3), 5(-, 6))$. $7$: right–right at $5$: $4(2(1,3), 6(5, 7))$. $16$: no rebalancing. $15$: inserted left of $16$, unbalancing $7$ (balance $-2$) with its right child $16$ left-heavy: right–left case, rotate right at $16$ then left at $7$: $6$'s right subtree becomes $15(7, 16)$. $14$: inserted right of $7$ (below $15$), unbalancing $6$ (left height $0$, right height $2$) with right child $15$ left-heavy: right–left case, rotate right at $15$ then left at $6$, making $7$ the root of that subtree: $7(6(5, -), 15(14, 16))$. Final tree: $4(2(1, 3), 7(6(5, -), 15(14, 16)))$, height $3$. Running the `insert` function confirms it.
:::
:::

::: exercise Red–black properties {level=2}
(a) Is a tree in which every node is black a valid red–black tree? Which shapes are possible? (b) Show that a red–black tree whose root has black-height $b$ (counting the nil leaf, as in [[#def-rb]]) has at most $4^b - 1$ nodes. (c) Give a valid red–black tree with keys $1, \dots, 7$ in which the two subtrees of the root have heights $0$ and $2$ — something an AVL tree does not allow.
::: solution
(a) Yes, provided property 3 holds: with no red nodes, all root-to-nil paths have the same number of nodes, so every nil leaf is at the same depth and the tree must be perfect.

(b) Consider any path from the root down to a nil leaf. Below the root it contains exactly $b$ black nodes, the last being the nil leaf. Each red node on it is followed by a black one (property 2), so it contains at most $b$ red nodes. So the path has at most $2b$ nodes below the root, of which at most $2b - 1$ are non-nil: every non-nil node has depth at most $2b - 1$. A binary tree of height at most $2b - 1$ has at most $2^{2b} - 1 = 4^b - 1$ nodes ([[data-structures/trees#thm-height-size]]).

(c) Take $2$B$(1$B$,\ 4$R$(3$B$,\ 6$B$(5$R$, 7$R$)))$. It is a BST (inorder $1, \dots, 7$). The root is black; the red node $4$ has black children, and $5$, $7$ have nil children. Black nodes below the root on each path, counting nil: $2 \to 1 \to$ nil: $1$, nil; $2 \to 4 \to 3 \to$ nil: $3$, nil; $2 \to 4 \to 6 \to 5 \to$ nil: $6$, nil. All equal $2$. The root's left subtree has height $0$ and its right subtree height $2$, so the root's balance factor is $-2$.
:::
:::

::: exercise Splitting cost {level=2 check="1"}
In [[#ex-btree]], insert $100$ next. How many node splits does the insertion perform? (Enter the number.)
::: solution
The tree is $[40]\{[20]\{[10]\ [30]\}\ [60]\{[50]\ [70, 80, 90]\}\}$. The root has one key: not full. Descending to $[60]$: not full. Descending to the leaf $[70, 80, 90]$: full, so it is split: $80$ moves up, giving $[60, 80]$ with children $[50]$, $[70]$, $[90]$; then $100$ joins $[90]$. That is exactly $1$ split, and the result is $[40]\{[20]\{[10]\ [30]\}\ [60, 80]\{[50]\ [70]\ [90, 100]\}\}$, as the program confirms. Splits are rare: most insertions only add a key to a leaf that has room.
:::
:::

::: exercise AVL deletion can cascade {level=3}
Show that deleting a single key from an AVL tree can require $\Theta(\log n)$ rotations. Use the **Fibonacci trees**: $T_0$ is a single node, $T_1$ is a root with a left child, and $T_h$ is a root whose left subtree is $T_{h-1}$ and right subtree $T_{h-2}$.
::: hint
Prove by induction: for every $h \ge 0$ there is a key of $T_h$ whose deletion, with rebalancing, leaves an AVL tree of height $h - 1$ and performs at least $\lfloor h/2 \rfloor$ rotations.
:::
::: solution
$T_h$ is an AVL tree of height $h$ in which every internal node has balance factor $+1$, with $F_{h+3} - 1$ nodes (it is minimal, as in [[#thm-avl-height]]), so $h = \Theta(\log n)$.

*Claim:* for every $h \ge 0$ some key of $T_h$ can be deleted so that the result is an AVL tree of height $h - 1$, using at least $\lfloor h/2\rfloor$ rotations.

For $h = 0$ delete the only node (height $-1$, no rotation); for $h = 1$ delete the leaf (height $0$, no rotation). For $h \ge 2$, apply the claim to the right subtree $T_{h-2}$: it becomes an AVL tree of height $h - 3$ after at least $\lfloor (h-2)/2\rfloor$ rotations. Now the root $z$ has a left subtree $x = T_{h-1}$ of height $h - 1$ and a right subtree of height $h - 3$: balance $+2$. Since $x$ has balance $+1$ (its left subtree $T_{h-2}$ has height $h-2$, its right $T_{h-3}$ height $h - 3$), this is the left–left case: rotate right at $z$. Then $z$ gets subtrees of heights $h - 3$ and $h - 3$, so height $h - 2$, and $x$ gets subtrees of heights $h - 2$ and $h - 2$, so height $h - 1$. The result is an AVL tree of height $h - 1$, using $\lfloor (h-2)/2\rfloor + 1 = \lfloor h/2 \rfloor$ rotations.

The key point is that the rotation *reduces* the height of the subtree (from $h$ to $h - 1$), so the imbalance propagates to the parent — whereas after an insertion the rotation restores the original height ([[#thm-avl-insert]]) and the repair stops.
:::
:::

::: exercise B-tree with t = 3 {level=3}
Using the `BTree` class with $t = 3$ (at most $5$ keys per node), insert the keys $1, 2, \dots, 20$ in increasing order. Predict the final tree by hand, then run the code. How many nodes does the tree have, and what fraction of the key slots ($5$ per node) is used? Explain why sorted insertion leaves most nodes minimally full, and why some databases special-case appends at the right edge of a B+-tree.
::: solution
The first split happens when $6$ arrives at the full root $[1, 2, 3, 4, 5]$: the median $3$ moves up into a new root, leaving $[1, 2]$ and $[4, 5]$, and $6$ joins the right leaf. From then on every key goes to the rightmost leaf; whenever it is full, $[a, \dots, a+4]$, it is split, its median $a + 2$ moving up and $[a, a+1]$ staying behind, never to be touched again. When the root itself fills up ($[3, 6, 9, 12, 15]$), it is split on the next insertion that reaches it. The program prints

```console
[9]{[3, 6]{[1, 2] [4, 5] [7, 8]} [12, 15]{[10, 11] [13, 14] [16, 17, 18, 19, 20]}}
```

There are $9$ nodes (a root, $2$ internal nodes and $6$ leaves) holding $20$ keys in $45$ slots, about $44\%$; every node off the right edge holds the minimum $t - 1 = 2$ keys. Because sequential keys — timestamps, auto-incremented identifiers — are very common, some B+-tree implementations split a full rightmost leaf unevenly when the new key is the largest, leaving the old leaf full and starting a nearly empty new one; append-only workloads then fill nodes almost completely.
:::
:::
