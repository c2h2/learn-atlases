打开文件管理器，你看到的是一个层次结构：主目录里装着文件夹，文件夹里又装着更多的文件夹和文件。网页是层层嵌套的元素构成的层次结构；编译器把 `5 + (1 + 2) * 4 - 3` 变成一个每个运算符都高居其操作数之上的层次结构；公司的组织架构图、家谱、一本书的章、节、段落，也都是层次结构。前几章的列表、栈和队列是*线性*的——每个元素至多只有一个后继——无法直接表达这些东西。**树**可以。

树还是最快的通用搜索结构的基础：二叉搜索树（[[data-structures/binary-search-trees]]）、它们的平衡版本（[[data-structures/balanced-trees]]）、堆（[[data-structures/heaps]]），以及每一个数据库都在用的 B 树。本章打下的正是它们共同的基础：有根树与二叉树的术语、把树的高度与结点数联系起来的计数事实、树在内存中的存储方式，以及四种按部就班地访问每个结点的标准**遍历**——连同它们在表达式树与文件系统层次结构上的应用。

## 有根树

::: definition 有根树 {#def-rooted-tree}
**有根树**要么为空，要么由一个结点 $r$——它的**根**——与零个或多个有根树 $T_1, \dots, T_k$ 的一个有限序列组成，这些树称为 $r$ 的**子树**，它们之间以及与 $r$ 都不共享结点。非空 $T_i$ 的根称为 $r$ 的**孩子**，$r$ 称为它们的**双亲**。
:::

这个定义是递归的——树是一个根下面挂着一棵棵更小的树——所以树上几乎所有算法也是递归的（[[programming-1/recursion]]）。（图论对树的定义不同：树是无圈的连通图；任选一个顶点作根、把所有边定向为离开根的方向，这样的图就变成上述意义的有根树。见[数学图谱：图](/learn/maths/lesson.php?c=discrete&l=graphs)。）

这套术语一半借自植物学，一半借自谱系学：

- 没有孩子的结点称为**叶子**；至少有一个孩子的结点称为**内部结点**。
- 双亲相同的结点互为**兄弟**。一个结点的**祖先**是它的双亲、双亲的双亲，如此直到根；它的**子孙**是它的孩子、孩子的孩子，如此下去。**以 $v$ 为根的子树**由 $v$ 及其全部子孙组成。
- 一个结点的**深度**是从根到它的路径上的边数；根的深度为 $0$。深度为 $d$ 的结点构成第 $d$ **层**。
- 一个结点的**高度**是从它向下到叶子的最长路径上的边数；**树的高度**是根的高度，等于任一结点的最大深度。只有一个结点的树高度为 $0$；按惯例空树的高度为 $-1$。
- 一个结点的**度**是它的孩子个数。若每个结点的孩子们有指定的次序（第一个、第二个、……），则称树是**有序**的；我们这里的定义正是如此。

::: proposition n 个结点的树有 n − 1 条边 {#prop-edges}
有 $n \ge 1$ 个结点的有根树恰有 $n - 1$ 条双亲—孩子边。
:::

::: proof
除根之外，每个结点恰有一个双亲，而每条边正是把一个结点连向它的双亲。所以边与 $n - 1$ 个非根结点一一对应。
:::

## 二叉树

::: definition 二叉树 {#def-binary-tree}
**二叉树**要么为空，要么由一个根结点与两棵二叉树——它的**左子树**与**右子树**——组成。结点的**左孩子**与**右孩子**是其左右子树的根（若子树非空）。
:::

注意"左"与"右"是结构的一部分：只有一个左孩子的根与只有一个右孩子的根是*不同*的二叉树，尽管作为有序树看，两者都是"一个根带一个孩子"。有些形状值得一一命名。

- 若每个结点都有零个或两个孩子，二叉树称为**正则的**（full，或称 *proper*）。
- 若它是正则的且所有叶子深度相同，称为**完美的**（perfect）。
- 若除最后一层外每层都满，且最后一层的结点尽量靠左排列，称为**完全的**（complete）。堆（[[data-structures/heaps]]）就是完全二叉树。

多数树操作的代价与高度成正比，所以高度与规模的关系是根本性的。

::: theorem 二叉树的高度与规模 {#thm-height-size}
高度为 $h$ 的二叉树至多有 $2^{h+1} - 1$ 个结点，等号恰在树为完美时成立。于是有 $n \ge 1$ 个结点的二叉树高度至少为 $\lceil \log_2(n+1)\rceil - 1 = \lfloor \log_2 n\rfloor$，至多为 $n - 1$。
:::

::: proof
第 $d$ 层至多有 $2^d$ 个结点：$d = 0$ 时（根）为真，且第 $d$ 层的每个结点至多有两个孩子落在第 $d+1$ 层。对第 $0, \dots, h$ 层求和，

$$
n \le 1 + 2 + 4 + \dots + 2^h = 2^{h+1} - 1,
$$

等号成立当且仅当每层都满，即当且仅当树是完美的。变形得 $2^{h+1} \ge n + 1$，故 $h \ge \log_2(n+1) - 1$，又 $h$ 是整数，所以 $h \ge \lceil\log_2(n+1)\rceil - 1$。$n \ge 1$ 时它等于 $\lfloor\log_2 n\rfloor$：若 $2^k \le n < 2^{k+1}$，则 $2^k < n + 1 \le 2^{k+1}$，故 $\lceil\log_2(n+1)\rceil = k + 1$。至于上界：高度为 $h$ 的树含有一条由 $h + 1$ 个不同结点组成的根—叶子路径，所以 $h \le n - 1$；每个结点都只有一个孩子的"路径树"达到这个上界。
:::

所以有 $n$ 个结点的二叉树，高度介于约 $\log_2 n$（茂密）与 $n - 1$（一条链）之间。接下来两章的全部内容，就是让搜索树的高度贴着下界。

::: theorem 正则二叉树的叶子数 {#thm-full-leaves}
有 $i$ 个内部结点的正则二叉树有 $i + 1$ 个叶子，从而共有 $2i + 1$ 个结点。
:::

::: proof
对 $i$ 归纳。$i = 0$ 时树是一个叶子：$1 = 0 + 1$ 个叶子。否则根是内部结点，它的两棵子树都是非空正则二叉树，内部结点数分别为 $i_L$ 与 $i_R$，且 $i_L + i_R = i - 1$。由归纳假设，它们分别有 $i_L + 1$ 与 $i_R + 1$ 个叶子，所以整棵树有 $i_L + i_R + 2 = i + 1$ 个叶子。
:::

例如，内部结点都是二元运算符的表达式树是正则的：含 $i$ 个运算符的表达式有 $i + 1$ 个操作数。

::: quiz
一棵二叉树有 $100$ 个结点。哪些高度是可能的？
- [ ] $0$ 到 $100$ 之间的任意高度
- [x] $6$ 到 $99$ 之间的任意高度
- [ ] $7$ 到 $99$ 之间的任意高度
- [ ] 只能是 $6$ 或 $7$
::: solution
由 [[#thm-height-size]]，高度至少为 $\lfloor\log_2 100\rfloor = 6$（高度 $5$ 的树至多容纳 $63$ 个结点，高度 $6$ 的至多 $127$ 个），至多为 $100 - 1 = 99$（一条链）。中间每个高度都取得到：从一条链出发，逐步把它往上折拢。
:::
:::

## 树在内存中的表示

**链式二叉结点。**标准表示法给每个结点一个键（或其他数据）和分别指向孩子的引用 `left` 与 `right`，缺失的孩子记 `None`。常再加一个 `parent` 引用，以便向上走（搜索树的删除会用到）。整棵树由指向根的引用给出。

```python
class Node:
    def __init__(self, key, left=None, right=None):
        self.key, self.left, self.right = key, left, right
```

**一般树。**若结点可以有任意多个孩子，可以让每个结点保存一个（动态数组）孩子列表——在 Python 里很自然——或用**左孩子—右兄弟**表示法：每个结点存两个引用，一个指向第一个孩子，一个指向下一个兄弟。后者把任何有序树变成结点相同的二叉树，且无论每个孩子有多少个孩子，每个结点只用两个引用。

**双亲数组。**若结点编号为 $0, \dots, n-1$，则单个数组、其中 $\mathit{parent}[v]$ 为 $v$ 的双亲（根记 $-1$），就用 $n$ 个整数记录了这棵树。它很紧凑，向上走到根很方便，但求一个结点的孩子必须扫描整个数组。[[algorithms]] 中的并查集结构用的正是这种表示。

**完全树的隐式数组。**完全二叉树根本不需要引用。按层、每层从左到右给结点编号，根为下标 $0$；则结点 $i$ 的孩子在下标 $2i + 1$ 与 $2i + 2$，双亲在 $\lfloor (i - 1)/2\rfloor$。完全性保证下标 $0, \dots, n-1$ 恰是全部占据的位置，所以树就是这个数组本身。二叉堆正是这样存储的（[[data-structures/heaps]]）。

::: example 完全树中的下标运算 {#ex-implicit}
一棵完全二叉树按上述方式存放在长度为 $n = 10$ 的数组中。下标 $3$ 的结点，其孩子和双亲各是谁？哪些下标是叶子？
::: solution
结点 $3$ 的孩子是 $2\cdot3+1 = 7$ 与 $2\cdot 3 + 2 = 8$，二者都小于 $10$；双亲是 $\lfloor (3-1)/2\rfloor = 1$。结点 $i$ 是叶子，当且仅当其左孩子下标越界，$2i + 1 \ge 10$，即 $i \ge 4.5$：叶子是下标 $5, 6, 7, 8, 9$。结点 $4$ 有左孩子（$9$）但没有右孩子（$10$ 越界）。一般地，有 $n$ 个结点的完全树有 $\lceil n/2\rceil$ 个叶子，位于下标 $\lfloor n/2\rfloor$ 到 $n-1$；并且结点 $i$ 的深度是 $\lfloor \log_2(i+1)\rfloor$，所以结点 $9$ 在第 $3$ 层。
:::
:::

## 遍历

**遍历**把树的每个结点恰好访问一次，每次访问做点事——打印它、累加一个量、检查一条性质。对二叉树，三种**深度优先**遍历只是根结点在其两棵子树*之前、之间、之后*访问的时点不同。

::: algorithm 二叉树的深度优先遍历 {#alg-traversals}
遍历二叉树 $t$：若 $t$ 为空，什么也不做。否则：

- **先序**：访问 $t$ 的根；遍历它的左子树；遍历它的右子树；
- **中序**：遍历它的左子树；访问根；遍历它的右子树；
- **后序**：遍历它的左子树；遍历它的右子树；访问根。
:::

第四种标准遍历是广度优先的：

::: algorithm 层序遍历 {#alg-level-order}
1. 建一个队列，放入根（若树非空）。
2. 只要队列非空：出队一个结点，访问它，再把它的非空孩子从左到右依次入队。
:::

四种遍历都是很短的程序：

```python
from collections import deque

def preorder(t, out):
    if t is not None:
        out.append(t.key)          # 先访问根
        preorder(t.left, out)
        preorder(t.right, out)
    return out

def inorder(t, out):
    if t is not None:
        inorder(t.left, out)
        out.append(t.key)          # 在两棵子树之间访问根
        inorder(t.right, out)
    return out

def postorder(t, out):
    if t is not None:
        postorder(t.left, out)
        postorder(t.right, out)
        out.append(t.key)          # 最后访问根
    return out

def level_order(t):
    out, q = [], deque([t] if t else [])
    while q:
        node = q.popleft()         # 先进先出：层次浅的结点先出队
        out.append(node.key)
        for child in (node.left, node.right):
            if child is not None:
                q.append(child)
    return out
```

::: example 同一棵树的四种遍历 {#ex-traversals}
给出下面这棵树的先序、中序、后序与层序序列

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
*先序*：先是根 $A$，然后整棵左子树按先序（$B$，然后 $D$，然后是 $E$ 的子树 $E, G$），最后是右子树（$C, F$）：`A B D E G C F`。

*中序*：$A$ 的左子树的中序是 $D$（在 $B$ 的左边）、$B$，然后是 $E$ 的子树——即 $G$（在 $E$ 的左边）再 $E$：所以是 `D B G E`；然后是 $A$；然后是 $C$ 的子树，先是 $C$ 再是 $F$（因为 $C$ 没有左孩子）。合起来 `D B G E A C F`。

*后序*：$D$，然后 $G$、$E$（孩子先于双亲），然后 $B$；然后 $F$、$C$；最后 $A$：`D G E B F C A`。

*层序*：第 $0$ 层是 $A$，第 $1$ 层是 $B, C$，第 $2$ 层是 $D, E, F$，第 $3$ 层是 $G$：`A B C D E F G`。

用 `Node` 类构造这棵树并运行四个函数可以验证：

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

两条检查可以发现多数错误：先序第一个是根、后序最后一个是根；中序里根所在位置左边的一切都属于它的左子树。
:::
:::

::: widget graph
nodes: A@3,3; B@1.5,2; C@4.5,2; D@0.75,1; E@2.25,1; F@5.25,1; G@1.75,0
edges: A-B; A-C; B-D; B-E; E-G; C-F
algorithm: dfs
start: A
caption: 对 [[#ex-traversals]] 中树从根出发的深度优先搜索。结点被*发现*的次序就是先序 `A B D E G C F`，被*完成*（从栈中弹出）的次序就是后序 `D G E B F C A`。盯着栈看：它始终装着从根到当前结点的路径，所以它的大小从不超过高度加一。
:::

::: widget graph
nodes: A@3,3; B@1.5,2; C@4.5,2; D@0.75,1; E@2.25,1; F@5.25,1; G@1.75,0
edges: A-B; A-C; B-D; B-E; E-G; C-F
algorithm: bfs
start: A
caption: 广度优先搜索在同一棵树上按层访问结点——即 [[#alg-level-order]] 的层序 `A B C D E F G`。距离标注就是深度。队列在最长时会装着树的整整一层，对茂密的树这约为全部结点数的一半。
:::

::: theorem 遍历的代价 {#thm-traversal-cost}
有 $n$ 个结点、高度为 $h$ 的二叉树的每种遍历，每个结点恰好访问一次；若每次访问花 $O(1)$ 时间，总时间为 $\Theta(n)$。除输出之外，递归的深度优先遍历还需 $\Theta(h)$ 栈空间；层序遍历需 $O(w)$ 队列空间，其中 $w$ 是单层结点数的最大值。
:::

::: proof
*每个结点恰被访问一次*，对树的大小作强归纳：对以 $r$ 为根的树的一次调用访问 $r$ 一次，并且由归纳假设，递归调用在两棵子树中各访问每个结点一次；两棵子树不相交，也不含 $r$。层序方面，每个结点恰好入队一次——在它的双亲出队时，根则在开始时——并在出队时被访问。

**时间。**递归遍历对每个结点调用一次，对每棵空子树调用一次。$n$ 个结点的二叉树有 $2n$ 个孩子位置，其中 $n - 1$ 个被占据（由 [[#prop-edges]]），所以空子树有 $n + 1$ 棵，总共 $2n + 1$ 次调用，每次除递归调用外只做 $O(1)$ 工作：$\Theta(n)$。层序遍历每个结点做 $O(1)$ 工作。

**空间。**任一时刻活动中的调用对应于从根出发的一条路径上的结点（可能再外加一棵空子树），所以递归深度至多 $h + 2$。层序方面，可归纳证明队列中只有相邻两层 $d$（尚未出队）与 $d+1$（作为孩子入队）的结点，且不超过第 $d$ 层的结点数加上已入队的它们的孩子数，即 $O(w)$。
:::

$\Theta(h)$ 栈空间至关重要：在高度 $n - 1$ 的退化树上，递归遍历会递归 $n$ 层深，这在 Python 超过约 $1000$ 层时会抛出 `RecursionError`。显式栈可以避免这一点。迭代式的中序遍历把沿左骨架向下的路径压进栈，访问栈顶结点，再走到它的右子树：

```python
def inorder_iterative(t):
    out, stack, p = [], [], t
    while stack or p is not None:
        while p is not None:       # 一直往左走到底，沿途入栈
            stack.append(p)
            p = p.left
        p = stack.pop()            # 最左边尚未访问的结点
        out.append(p.key)
        p = p.right                # 然后遍历它的右子树
    return out
```

对 [[#ex-traversals]] 的树，它返回 `D B G E A C F`，与递归版完全相同。这正是递归原本在做的事，只不过把调用栈显式化——与 [[data-structures/stacks-queues]] 的深度优先搜索同一个想法。

::: example 迭代中序遍历的跟踪 {#ex-inorder-stack}
对 [[#ex-traversals]] 的树跟踪 `inorder_iterative` 的执行，每次访问结点时写出栈的内容（栈底在左）。
::: solution
内层循环先把左骨架 $A, B, D$ 压入栈。然后：

| 访问 | 出栈后的栈 | 下一个 `p` | 下一轮内层循环压入 |
|---|---|---|---|
| $D$ | $A\;B$ | 无（$D$ 没有右孩子） | — |
| $B$ | $A$ | $E$ | $E, G$ |
| $G$ | $A\;E$ | 无 | — |
| $E$ | $A$ | 无 | — |
| $A$ | （空） | $C$ | $C$ |
| $C$ | （空） | $F$ | $F$ |
| $F$ | （空） | 无 | — |

栈空且 `p` 为 `None` 时循环结束。访问次序拼出 `D B G E A C F`。每一时刻栈里装的都是"左子树正在被遍历、自己尚待访问"的结点——路径上曾在向左拐处的祖先——所以它从不超过 $h + 1$ 个结点。每个结点恰好进出栈一次，所以遍历花 $\Theta(n)$ 时间。
:::
:::

## 遍历的应用

### 表达式树

算术表达式天然是正则二叉树：每个内部结点是一个运算符，它的子树是操作数；叶子是数。表达式 `5 + (1 + 2) * 4 - 3`（按通常的优先级与左结合律）对应于树

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

它的三种遍历给出三种记法：先序给出前缀（波兰）记法 `- + 5 * + 1 2 4 3`；后序给出后缀记法 `5 1 2 + 4 * + 3 -`，恰是 [[data-structures/stacks-queues#alg-shunting]] 中调度场算法的输出；中序给每个子表达式加上括号，就还原出中缀形式。求值是一次后序遍历——两个操作数都知道了，运算符才能应用：

```python
import operator
OPS = {"+": operator.add, "-": operator.sub, "*": operator.mul}

class Expr:
    def __init__(self, op, left=None, right=None):
        self.op, self.left, self.right = op, left, right   # op 是 "+", "-", "*" 或一个数

def evaluate(e):                       # 后序：操作数先于运算符
    if e.left is None:
        return e.op
    return OPS[e.op](evaluate(e.left), evaluate(e.right))

def infix(e):                          # 中序，加全括号
    if e.left is None:
        return str(e.op)
    return f"({infix(e.left)} {e.op} {infix(e.right)})"

def postfix(e):
    if e.left is None:
        return str(e.op)
    return f"{postfix(e.left)} {postfix(e.right)} {e.op}"

# 5 + (1 + 2) * 4 - 3，按 (5 + ((1 + 2) * 4)) - 3 解析
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

编译器为整个程序构造这样的树——**抽象语法树**——然后依靠遍历对其进行检查、优化与代码生成（[[compilers]]）。

### 层次结构：一个文件系统

目录是一棵一般树：每个目录可以有任意多个孩子，文件是叶子。关于它的两个问题需要两种不同的遍历次序。*每个目录占多大空间？*需要孩子们的大小先算出来：后序。*把层次打成带缩进的清单打印出来*需要每个目录先于其内容：先序。在 Python 里，嵌套字典是方便的一般树。

::: example 目录大小与缩进清单 {#ex-dirs}
在一棵小树上算出每个目录的总大小，并把层次连同每个条目的大小打印出来。
::: solution
```python
# 目录树：dict 把名字映射到子树；int 是文件大小的字节数。
home = {
    "notes.txt": 1200,
    "photos": {"cat.jpg": 250_000, "dog.jpg": 310_000},
    "code": {
        "ds": {"heap.py": 3_400, "bst.py": 5_100},
        "README": 800,
    },
}

def total_size(tree):                  # 后序：先孩子，后本目录
    if isinstance(tree, int):
        return tree
    return sum(total_size(sub) for sub in tree.values())

def show(name, tree, depth=0):         # 先序：目录先于其内容打印
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

`total_size` 只有算完孩子们才计算目录的大小——这正是后序的标志性性质——`show` 则先打印目录本身再递归进入。Unix 命令 `du`（磁盘用量）与 `tree` 做的恰是这两种遍历。注意一处低效：`show` 对每个目录都重新调用 `total_size`，所以深度为 $d$ 的文件会被累加 $d + 1$ 次，在深树上代价是 $\Theta(n h)$ 而非 $\Theta(n)$。[[#exr-dirs-linear]] 将修复这一点。
:::
:::

::: quiz
在 C 中要释放（free）一棵树的每个结点，且任何结点在仍被引用时不得释放，应采用哪种遍历？
- [ ] 先序
- [ ] 中序
- [x] 后序
- [ ] 不带队列的层序
::: solution
结点的 `left` 与 `right` 引用是到达其孩子所必需的，所以一个结点只有当两棵子树都已释放之后才能释放：先孩子后双亲，即后序。若先释放结点（先序），程序就得去读已释放的内存才能找到孩子们——在 C 中是未定义行为。
:::
:::

::: warning 遍历次序容易混淆
"先序""中序""后序"说的是**根的访问**相对于它的两棵子树的位置，与结点的键或深度的次序无关。中序把键排成有序列出，*仅*对二叉搜索树成立（[[data-structures/binary-search-trees]]）。层序根本不是深度优先遍历，它需要队列而不是栈。而且单靠一条遍历序列定不下这棵树：`A B` 既可能是"根 $A$ 带左孩子 $B$"的先序，也可能是"根 $A$ 带右孩子 $B$"的先序（[[#exr-reconstruct]] 表明，键互不相同时，先序加中序足以确定这棵树）。
:::

::: history
凯莱（Cayley）在一篇 1857 年关于微分算子理论的论文中引入了"tree"（树）这个词，并于 1889 年证明了 $n$ 个顶点上的标号树有 $n^{n-2}$ 棵；基尔霍夫（Kirchhoff）早在 1847 年分析电路网络时就用到了生成树。在计算领域，树随着表处理而来：纽厄尔（Newell）、肖（Shaw）与西蒙（Simon）的 IPL 语言（1956），以及麦卡锡（McCarthy）的 LISP（1960）——它的 S 表达式就是二叉树——使树形数据成为寻常之物。表达式树及其遍历支撑了 1950 年代末的公式翻译程序。高德纳（Knuth）的《计算机程序设计艺术》第 1 卷（1968）§2.3 给出了教科书沿用至今的术语与遍历算法（包括不借助栈遍历的线索树）；佩利斯（Perlis）与桑顿（Thornton）早在 1960 年就引入了线索树。
:::

## 后续内容

下一章 [[data-structures/binary-search-trees]] 给二叉树的键排序，使中序遍历按有序列出它们、查找沿一条根到叶子的路径完成；查找的代价就是高度，而 [[#thm-height-size]] 把它夹在 $\log_2 n$ 与 $n$ 之间。[[data-structures/balanced-trees]] 使高度保持对数量级，[[data-structures/heaps]] 则利用完全树的隐式数组表示。深度优先与广度优先遍历会从树推广到图（[[data-structures/graph-representations]] 与 [[algorithms]]），在那里树变为遍历的搜索树。语法分析树与抽象语法树是 [[compilers]] 的中心数据结构。

::: summary
- **有根树**（[[#def-rooted-tree]]）是一个根加上一列两两不交的树；$n$ 个结点的树有 $n - 1$ 条边（[[#prop-edges]]）。深度从根量起，高度从叶子量起。
- **二叉树**（[[#def-binary-tree]]）的左右子树分得清清楚楚。高度 $h$ 的二叉树至多有 $2^{h+1} - 1$ 个结点，所以高度介于 $\lfloor \log_2 n\rfloor$ 与 $n - 1$ 之间（[[#thm-height-size]]）。正则二叉树的叶子比内部结点多一个（[[#thm-full-leaves]]）。
- 树的存储方式：链式结点、孩子列表或左孩子—右兄弟对、双亲数组，或对完全树而言，隐式存于数组中——结点 $i$ 的孩子在 $2i+1$ 与 $2i+2$。
- 先序、中序、后序分别在两棵子树之前、之间、之后访问根；层序用队列。都是 $\Theta(n)$ 时间；递归需 $\Theta(h)$ 栈空间（[[#thm-traversal-cost]]）。
- 后序用来对表达式树求值、对层次结构求和汇总；先序用来打印层次结构、复制树；后序用来释放它们。
:::

## 习题

::: exercise 术语 {level=1}
在 [[#ex-traversals]] 的树中，列出叶子、内部结点、$G$ 的祖先、$G$ 的深度、$B$ 的高度与树的高度。这棵树是正则的吗？是完全的吗？
::: solution
叶子：$D, G, F$。内部结点：$A, B, C, E$。$G$ 的祖先：$E, B, A$。$G$ 的深度：$3$。$B$ 的高度：$2$（路径 $B$–$E$–$G$）。树的高度：$3$。它不正则（$C$ 与 $E$ 各只有一个孩子），也不完全：第 2 层的四个可能位置只占了三个（$C$ 的左孩子缺失），却存在第 3 层。
:::
:::

::: exercise 完美树的结点数 {level=1 check="1023"}
高度为 $9$ 的完美二叉树有多少个结点？（输入数目。）
::: solution
由 [[#thm-height-size]]，$2^{9+1} - 1 = 1023$。其中 $2^9 = 512$ 个是叶子，$511$ 个是内部结点，与 [[#thm-full-leaves]] 相符。
:::
:::

::: exercise 形态计数 {level=1 check="5"}
恰有 $3$ 个结点的二叉树（只讲形状，不看键）共有多少种？（输入数目。）
::: solution
设 $b_n$ 为 $n$ 个结点的形态数。$n \ge 1$ 个结点的树由一个根与规模为 $k$ 与 $n - 1 - k$ 的两棵子树组成，故 $b_n = \sum_{k=0}^{n-1} b_k b_{n-1-k}$，$b_0 = 1$。于是 $b_1 = 1$，$b_2 = 2$，$b_3 = b_0b_2 + b_1b_1 + b_2b_0 = 2 + 1 + 2 = 5$。这就是卡特兰数：五种形态中四种是链（下面两个结点各可取左或右），一种是高度 $1$ 的完美树。
:::
:::

::: exercise 表达式树的遍历 {level=2}
画出 `(a - b) * (c + d * e)` 的表达式树，写出它的先序、中序与后序序列。
::: solution
根是 `*`；左子树是 `-`，叶子 `a`、`b`；右子树是 `+`，左叶子 `c`，右子树是 `*`，叶子 `d`、`e`。

先序：`* - a b + c * d e`。中序：`a - b * c + d * e`（不加括号这是含混的——中缀记法正因如此才需要括号）。后序：`a b - c d e * + *`。
:::
:::

::: exercise 重建二叉树 {#exr-reconstruct level=2}
一棵键互不相同的二叉树，先序为 `F B A D C E G I H`，中序为 `A B C D E F G H I`。重建这棵树，并证明：键互不相同时，先序与中序序列总能唯一确定一棵二叉树。
::: solution
先序的第一个键 $F$ 是根。在中序中，$F$ 把键分成左子树 `A B C D E` 与右子树 `G H I`。于是先序接下来的 $5$ 个键是左子树的（`B A D C E`），最后 $3$ 个是右子树的（`G I H`）。递归下去：左子树根为 $B$，左子树为 `A`，右子树中序 `C D E`、先序 `D C E`，即根 $D$、孩子 $C$ 与 $E$。右子树根为 $G$，左子树为空，右子树先序 `I H`、中序 `H I`：根 $I$、左孩子 $H$。

对 $n$ 作强归纳：先序的第一个键是根；键互不相同，所以它在中序中的位置唯一，并把其余的键分成左子树的那些（在它之前）与右子树的那些（在它之后）。知道了左子树的规模 $k$，先序的接下来 $k$ 个键就是左子树的先序，其余的是右子树的先序。由归纳假设两棵子树都被唯一确定，整棵树也就被唯一确定。
:::
:::

::: exercise 递归计算高度 {level=2}
写一个递归函数 `height(t)`（空树高度记 $-1$）与一个函数 `size(t)`。证明 `height` 返回的确实是高度，并说明运行时间。
::: solution
```python
def height(t):
    if t is None:
        return -1
    return 1 + max(height(t.left), height(t.right))

def size(t):
    return 0 if t is None else 1 + size(t.left) + size(t.right)
```

对结点数作强归纳。空树按惯例高度为 $-1$。对非空树，从根出发的最长向下路径先走到它的某一个孩子，再沿那个孩子向下的最长路径走到底，或者根本是叶子；两种情形下长度都是 $1 + \max(h_L, h_R)$，其中空子树贡献 $-1$（于是叶子得到 $1 + (-1) = 0$）。由归纳假设，递归调用返回 $h_L$ 与 $h_R$。两个函数都是后序遍历，运行时间 $\Theta(n)$（[[#thm-traversal-cost]]）。
:::
:::

::: exercise 线性时间算目录大小 {#exr-dirs-linear level=3}
重写 [[#ex-dirs]] 的 `show`，使整份清单对 $n$ 个条目的树只花 $\Theta(n)$ 时间，同时仍*先*打印每个目录（连同其总大小）再打印其内容。解释为什么一次遍历无法既按先序打印又已知大小，并说明两趟扫描、或先收集各行再回填这两条解决途径。
::: solution
目录的大小只有在其全部子孙都被看过之后才知道（后序），却必须赶在它们之前打印（先序）。可以先用一趟后序把大小算出来存好，再用一趟先序打印；或者一次遍历，在先序位置预留输出行，等某个目录的子树处理完毕再回填它的大小：

```python
def listing(name, tree, depth=0, lines=None):
    if lines is None:
        lines = []
    slot = len(lines)
    lines.append(None)                     # 为该条目预留一行
    if isinstance(tree, int):
        size = tree
    else:
        size = sum(listing(c, tree[c], depth + 1, lines)[0] for c in sorted(tree))
    lines[slot] = "    " * depth + f"{name}  ({size} B)"
    return size, lines

print("\n".join(listing("home", home)[1]))
```

每个条目只被处理一次，除孩子们之外做 $O(1)$ 工作（另加在每个目录里对名字排序，$k$ 个孩子花 $O(k\log k)$），所以除排序外总代价 $\Theta(n)$。输出与 [[#ex-dirs]] 完全相同。
:::
:::

::: exercise 按层分组的层序遍历 {level=3}
改造层序遍历，使其返回一个按层分组的表——一个列表的列表，第 $d$ 个表从左到右存放深度为 $d$ 的各键——而不在队列中存深度。证明你的方法正确且运行时间 $\Theta(n)$。
::: solution
一次处理一层：每一轮开始时，队列里恰好装着一层的结点。

```python
from collections import deque

def levels(t):
    result, q = [], deque([t] if t else [])
    while q:
        level = []
        for _ in range(len(q)):            # 恰好是当前层的全部结点
            node = q.popleft()
            level.append(node.key)
            for child in (node.left, node.right):
                if child is not None:
                    q.append(child)
        result.append(level)
    return result
```

不变式：第 $d$ 轮开始时，队列中恰为深度 $d$ 的结点，从左到右排列。$d = 0$ 时成立。第 $d$ 轮中我们恰好出队当前的 `len(q)` 个结点（按序）并入队它们的孩子——恰是深度 $d+1$ 的全部结点；由于左结点的孩子先于右结点的孩子入队，次序仍是左到右。对 [[#ex-traversals]] 的树，结果是 `[['A'], ['B', 'C'], ['D', 'E', 'F'], ['G']]`。每个结点恰好进出队一次：$\Theta(n)$。
:::
:::
