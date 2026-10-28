哈希表（[[data-structures/hash-tables]]）回答"这个键在不在？"只花期望常数时间，但它回答不了"最小的键是谁？""紧接在 1984 之后的键是哪个？""把 `apple` 与 `apricot` 之间的所有键按顺序列出来"。哈希是故意把键打散的，序的信息荡然无存。有序数组保持着序，支持 $O(\log n)$ 时间的二分查找，但往里插入要花 $\Theta(n)$（[[data-structures/arrays-lists#prop-array-insert]]）。我们想两全其美：一个既保持键有序、查找又堪比二分查找、插入删除同样利落的结构。

**二叉搜索树**（binary search tree）把键存放在一棵精心安排的二叉树（[[data-structures/trees]]）里，使查找每一步都能丢掉整整一棵子树——恰如二分查找每步丢掉数组的一半。本章定义这个结构，导出它的算法——查找、最大最小、后继、插入，以及略需小心的删除——并证明它们的正确性。所有这些操作都花 $O(h)$ 时间，$h$ 是树的高度。蹩脚之处正在于此：高度取决于键到达的次序，最坏情况下二叉搜索树不比链表强。我们既分析最坏情况，也分析随机插入的平均情况，为下一章的平衡树做铺垫。

## 搜索树性质

::: definition 二叉搜索树 {#def-bst}
**二叉搜索树**（BST）是这样一棵二叉树：每个结点存放一个键（通常还带一个关联的值），键互不相同、取自一个全序集，并且每个结点 $x$ 都满足**搜索树性质**：$x$ 左子树中的每个键都小于 $x.\mathit{key}$，$x$ 右子树中的每个键都大于 $x.\mathit{key}$。
:::

这条性质约束的是*整棵子树*，不只是孩子。一棵"每个孩子小于其左双亲、大于其右双亲"的树仍可能违反它：若 $50$ 有左孩子 $30$，而 $30$ 有右孩子 $60$，那么 $60$ 位于 $50$ 的左子树中，却比 $50$ 大。

下面是我们从始至终要用的树。把 $50, 30, 70, 20, 40, 60, 80, 35, 45, 65$ 按此顺序依次插入一棵空树，得到的就是它。

::: widget graph
nodes: 50@4,3; 30@2,2; 70@6,2; 20@1,1; 40@3,1; 60@5,1; 80@7,1; 35@2.5,0; 45@3.5,0; 65@5.5,0
edges: 50-30; 50-70; 30-20; 30-40; 70-60; 70-80; 40-35; 40-45; 60-65
caption: 一棵含十个键、高度为 3 的二叉搜索树。在根处验证搜索树性质：它左边的一切（20、30、35、40、45）都小于 50，右边的一切都大于 50。按图从左到右读这些键，就得到有序序列——这正是 [[#thm-inorder-sorted]]。结点可以拖动：树由边和每个孩子挂在左还是右决定，与位置无关。
:::

::: theorem 中序遍历按键有序列出 {#thm-inorder-sorted}
二叉搜索树的中序遍历（[[data-structures/trees#alg-traversals]]）按递增次序访问它的键。反之，键互不相同且中序序列递增的二叉树是二叉搜索树。
:::

::: proof
对结点数作强归纳。空树给出空序列。对以 $r$ 为根的树，中序先列出左子树，再是 $r$，再是右子树。由归纳假设，每棵子树的键按递增次序出来；由搜索树性质，左子树的每个键都小于 $r.\mathit{key}$，而 $r.\mathit{key}$ 小于右子树的每个键。所以整个序列递增。

反过来，若中序序列递增，则对任何结点 $x$，其左子树的键在序列中恰好紧挨在 $x$ 之前、其右子树的键恰好紧挨在 $x$ 之后（中序把一棵子树连续地列出），于是它们相应地更小、更大。
:::

所以二叉搜索树是一支化了装的有序序列，中序遍历以 $\Theta(n)$ 时间把它的键排好序（[[data-structures/trees#thm-traversal-cost]]）。把 $n$ 个键逐个插入二叉搜索树再遍历一遍，就是一种排序算法，称为**树排序**；它的代价就是插入的代价，我们现在就来研究插入。

## 查找

查找键 $k$：与根比较。相等便完成；更小，则 $k$ 只可能在左子树；更大，则只可能在右子树。重复下去，直到找到该键或走进空树。

::: algorithm 二叉搜索树的查找 {#alg-bst-search}
**输入：**BST 的根 $t$ 与键 $k$。**输出：**键为 $k$ 的结点，或空无。

1. $p \gets t$。
2. 当 $p$ 非空且 $k \ne p.\mathit{key}$：若 $k < p.\mathit{key}$ 则置 $p \gets p.\mathit{left}$，否则置 $p \gets p.\mathit{right}$。
3. 返回 $p$。
:::

::: theorem 查找的正确性与 O(h) 代价 {#thm-bst-search}
[[#alg-bst-search]] 若存在键为 $k$ 的结点就返回它，否则返回空无。它检查的结点恰是从根出发向下的单条路径上的结点，所以在高度为 $h$ 的树中至多做 $h + 1$ 次键比较（三分：小于、等于、大于）。
:::

::: proof
不变式：*若 $k$ 在树中，则 $k$ 在以 $p$ 为根的子树中*。起初 $p$ 是根。若 $k < p.\mathit{key}$，则 $k$ 不是 $p$ 的键，且由搜索树性质也不在 $p$ 的右子树中，所以若 $k$ 存在，它在左子树里；$k > p.\mathit{key}$ 的情形对称。循环停止时，或者 $p$ 持有 $k$，或者 $p$ 为空、由不变式知 $k$ 不在树中。每轮迭代把 $p$ 向下一层，所以迭代至多 $h + 1$ 轮。
:::

最小键沿"一直向左"找到，最大键沿"一直向右"找到；都是 $O(h)$。（为什么向左行走停下的那个结点 $x$ 就是最小键？若有比它更小的键，查找那个键会做出同样的向左动作——因为它比路径上每个结点都小——到达 $x$ 后还须向左走——走进一棵空子树。所以树中不存在更小的键。）

### 后继

树中键 $k$ 的**后继**是大于 $k$ 的最小键——中序里的下一个键。"从 $k$ 往后逐个遍历"、删除、"找第一个 $\ge q$ 的键"都要用到它。对结点 $x$ 分两种情形：

- 若 $x$ 有右子树，后继是**那棵子树的最小值**：向右一步，再一路向左到底。
- 若没有，后继是**最近的、其*左*子树包含 $x$ 的祖先**：向上走，直到你是从某个结点的左孩子来到它的。若这样的祖先不存在，$x$ 持有的就是最大键，没有后继。

没有 parent 引用时，第二种情形可在从根下降的途中处理：记住查找 $k$ 时最后一次向左拐经过的结点。下面这个函数就是这么做的，并且顺带回答了"$q$ 的上界"（**ceiling**）——即"不小于 $q$ 的最小键"，$q$ 本身不必在树中。

```python
def ceiling(t, q):
    """Smallest key >= q in the BST rooted at t, or None."""
    best = None
    while t is not None:
        if q == t.key:
            return t.key
        if q < t.key:
            best = t.key          # t 是候选；左边可能还有更小的
            t = t.left
        else:
            t = t.right           # t 及其左子树全都 < q
    return best
```

::: example 贯穿示例中的查找与后继 {#ex-bst-search}
在上面这棵树中，跟踪对 $45$ 与对 $62$ 的查找，并求 $45$ 的后继、$50$ 的后继与 $62$ 的 ceiling。
::: solution
*查找 45*：$45 < 50$，向左到 $30$；$45 > 30$，向右到 $40$；$45 > 40$，向右到 $45$：$4$ 次比较后找到，即 $45$ 的深度加一。

*查找 62*：$62 > 50$ 右到 $70$；$62 < 70$ 左到 $60$；$62 > 60$ 右到 $65$；$62 < 65$，向左——空。未找到，共 $4$ 次比较。

*$45$ 的后继*：$45$ 没有右子树。向上走：$45$ 是 $40$ 的右孩子，$40$ 是 $30$ 的右孩子，$30$ 是 $50$ 的*左*孩子。所以后继是 $50$。等价地说，在查找 $45$ 的过程中最后一次向左拐是在 $50$ 处。

*$50$ 的后继*：$50$ 有右子树；其最小值先到 $70$、再向左一直走得到 $60$（它没有左孩子）。所以后继是 $60$。

*$62$ 的 ceiling*：查找 $62$ 时在 $70$ 与 $65$ 处向左拐过，最后一次是 $65$；所以 `ceiling(root, 62)` 返回 $65$，即不小于 $62$ 的最小键。
:::
:::

## 插入

要插入键 $k$，先查找它。若找到，就替换它的值（键互不相同）。否则查找恰好停在一棵空子树处——那正是 $k$ 该在的地方——于是把那里放上一个新叶子。

::: algorithm 二叉搜索树的插入 {#alg-bst-insert}
按 [[#alg-bst-search]] 查找 $k$，同时记住访问过的最后一个非空结点 $y$。若找到键为 $k$ 的结点，更新其值。否则新建键为 $k$ 的结点 $z$；若原树为空则令 $z$ 为根，否则当 $k < y.\mathit{key}$ 时令 $z$ 为 $y$ 的左孩子，否则为右孩子。
:::

::: example 向贯穿示例插入 {#ex-bst-insert}
先插入 $42$、再插入 $67$。它们各落在哪里？每次插入做多少次比较？
::: solution
*插入 42*：$42 < 50$ 左到 $30$；$42 > 30$ 右到 $40$；$42 > 40$ 右到 $45$；$42 < 45$，而 $45$ 没有左孩子。所以 $42$ 成为 $45$ 的左孩子，做了 $4$ 次比较。在新树中它是 $40$ 的后继：按有序它恰好坐在 $40$ 与 $45$ 之间，也正是挂靠的地方。

*插入 67*：$67 > 50$ 右到 $70$；$67 < 70$ 左到 $60$；$67 > 60$ 右到 $65$；$67 > 65$，而 $65$ 没有右孩子。所以 $67$ 成为 $65$ 的右孩子，同样做了 $4$ 次比较。树的高度从 $3$ 长到 $4$，因为两个新叶子都在深度 $4$。

注意新键总是成为一个叶子，已有的结构从不改变。这既是插入简单的缘由——也是树的形状完全由插入次序决定的缘由。
:::
:::

新结点成为叶子，性质依然成立：$z$ 被放在搜索路径上每棵子树相对于该子树根的正确一侧，因为查找曾把它与每棵子树的根比较过。插入花费 $O(h)$，与一次不成功查找相同。下面的递归写法更短：`_put(t, …)` 在以 `t` 为根的子树中插入，并返回那棵子树（可能已换的）根，双亲的链接由赋值更新。这个类还包含删除，下一节解释。

```python
class Node:
    def __init__(self, key, value):
        self.key, self.value = key, value
        self.left = self.right = None

class BST:
    def __init__(self):
        self.root = None

    def get(self, key):                      # O(h)：从根出发的一条路径
        p = self.root
        while p is not None:
            if key == p.key:
                return p.value
            p = p.left if key < p.key else p.right
        raise KeyError(key)

    def put(self, key, value):
        self.root = self._put(self.root, key, value)

    def _put(self, t, key, value):           # 返回子树 t 的新根
        if t is None:
            return Node(key, value)
        if key < t.key:
            t.left = self._put(t.left, key, value)
        elif key > t.key:
            t.right = self._put(t.right, key, value)
        else:
            t.value = value                  # 已有的键：替换值
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
        elif t.left is None:                 # 零个或一个孩子：把 t 摘掉
            return t.right
        elif t.right is None:
            return t.left
        else:                                # 两个孩子：用后继
            s = t.right
            while s.left is not None:
                s = s.left                   # 右子树中的最小键
            t.key, t.value = s.key, s.value
            t.right = self._delete(t.right, s.key)
        return t
```

## 删除

删除结点 $z$ 之后，剩下的必须仍是一棵二叉搜索树，且恰含其余所有键。按 $z$ 的孩子数分三种情形。

::: algorithm 二叉搜索树的删除（Hibbard） {#alg-bst-delete}
找到待删键所在的结点 $z$。

1. 若 $z$ 是**叶子**，删去它：它双亲的链接变为空。
2. 若 $z$ 有**一个孩子**，把 $z$ 摘除：在它的双亲中，把指向 $z$ 的链接改为指向 $z$ 唯一的孩子。
3. 若 $z$ 有**两个孩子**，令 $s$ 为它的后继，即 $z$ 右子树中的最小值。把 $s$ 的键和值复制进 $z$，然后从右子树中删除 $s$。由于 $s$ 是最小值，它没有左孩子，删除它归结为情形 1 或情形 2。
:::

::: theorem 删除保持搜索树性质 {#thm-bst-delete}
[[#alg-bst-delete]] 之后，树是一棵二叉搜索树，且恰含原有的键除去被删的那一个。删除耗时 $O(h)$。
:::

::: proof
由 [[#thm-inorder-sorted]]，只需证明新树的中序序列就是旧序列删去被删的键（那样它就仍然递增）。

**情形 1 与 2。**中序把以 $z$ 为根的子树列为（$z$ 的左子树）、$z$、（$z$ 的右子树），且两棵子树之一为空。用以 $z$ 为根的子树替代为它唯一非空的子树（或什么都不放），恰好把 $z$ 从序列的这一部分中移除，其余一切不变。

**情形 3。**后继 $s$ 在中序中恰排在 $z$ 之后。把 $s$ 的键复制进 $z$、再删去结点 $s$（一次情形 1 或 2 的删除，按上面的结论恰从序列中删去 $s$ 的位置），就把 $\dots, z, s, \dots$ 变成 $\dots, s, \dots$——正是删去了 $z$ 的键的序列。

**代价。**找 $z$ 沿一条路径；找 $s$ 继续沿这条路径伸入 $z$ 的右子树；总共 $O(h)$。
:::

::: example 三次删除 {#ex-bst-delete}
从贯穿示例中先删 $30$，再删 $60$，再删 $20$。画出每一步之后的树，并用程序核对。
::: solution
*删除 30*（两个孩子：$20$ 与 $40$）。它的后继是以 $40$ 为根的右子树中的最小值：从 $40$ 向左到 $35$，它没有左孩子。把 $35$ 复制进原来放 $30$ 的结点，再删去旧的 $35$（一个叶子）。现在根的左孩子是 $35$，其孩子为 $20$ 与 $40$，而 $40$ 只剩右孩子 $45$。

*删除 60*（一个孩子，$65$）。把它摘除：$70$ 的左孩子变为 $65$。

*删除 20*（一个叶子）。删去它：$35$ 现在只剩右孩子 $40$。

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

运行这个类：

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
T.delete(30)                                 # 两个孩子：后继 35
T.delete(60)                                 # 一个孩子 (65)
T.delete(20)                                 # 一个叶子
print(inorder(T.root), "root", T.root.key, "left child", T.root.left.key)
```

```console
$ python3 bst.py
[20, 30, 35, 40, 45, 50, 60, 65, 70, 80] height 3
45
[35, 40, 45, 50, 65, 70, 80] root 50 left child 35
```

中序序列仍然有序，且恰好少了被删的三个键，正如 [[#thm-bst-delete]] 的承诺。
:::
:::

::: warning 复制后继并非总是无害
情形 3 把一个键和一个值从一个结点搬到另一个结点。若程序的其他部分持有对*结点*的引用（一个停在后继处的迭代器，或一张从键到结点的索引），这些引用如今指向的结点内容已变，或者指向一个已被移出树外的结点。因此对外交付结点引用的库，实现情形 3 时会把**后继结点本身**搬进 $z$ 的位置——改链接而不搬数据（CLRS 的 `TRANSPLANT` 过程就是这么做的）。另请注意，反复用后继删除、再随机插入，长时间之后会使树轻微地向左失衡——这是实验观察到、并由 Eppinger（1983）与 Culberson 分析过的现象——这也是实践中应采用平衡树的又一个理由。
:::

::: quiz
在 BST 中，结点 $z$ 有两个孩子。关于它的后继 $s$，哪些说法正确？（多选。）
- [x] $s$ 在 $z$ 的右子树中。
- [x] $s$ 没有左孩子。
- [ ] $s$ 是叶子。
- [ ] $s$ 是 $z$ 的右孩子。
::: solution
$z$ 有右子树，所以 $s$ 是它的最小值，向左一直走找到——因此 $s$ 没有左孩子。但 $s$ 可能有右孩子（它只是有时才是叶子），而 $s$ 是 $z$ 的右孩子，仅当那个右孩子自己没有左孩子时。
:::
:::

## 二叉搜索树能有多高？

每个操作都花 $O(h)$。由 [[data-structures/trees#thm-height-size]]，$\lfloor\log_2 n\rfloor \le h \le n - 1$，而且两端都取得到。

::: proposition 有序插入长出一条路径 {#prop-degenerate}
把键 $1, 2, \dots, n$ 按递增次序插入一棵空 BST，得到一棵高度为 $n - 1$、每个结点都只有右孩子的树。建树共做 $\binom{n}{2} = n(n-1)/2$ 次键比较，之后查找 $n$ 要做 $n$ 次。
:::

::: proof
归纳：插入 $1, \dots, i$ 之后，树是沿右孩子的路径 $1 \to 2 \to \dots \to i$。键 $i+1$ 比它们都大，其查找一路向右 $i$ 次、与每个结点各比较一次，最后挂为 $i$ 的右孩子。对 $i = 0, \dots, n-1$ 把 $i$ 次比较求和，得 $n(n-1)/2$。
:::

有序或近乎有序的输入司空见惯——按时间先后到达的记录、顺序分配的标识符——所以这不是什么理论奇谈。那么完全随机的次序呢？

::: theorem 随机二叉搜索树 {#thm-random-bst}
把 $n$ 个互不相同的键，按 $n!$ 种次序中等可能随机选取的一种次序，插入一棵空 BST。则所有结点深度之和（**内部路径长度**）的期望为

$$
\E[\text{内部路径长度}] = 2(n+1)H_n - 4n,
$$ {#eq-ipl}

其中 $H_n = \sum_{k=1}^n 1/k$。于是随机选取的一个结点的期望深度为 $2(1 + 1/n)H_n - 4 = 2\ln n + O(1) \approx 1.39\log_2 n$，一次随机的成功查找平均做约 $1.39\log_2 n$ 次比较。
:::

::: proof
按秩给键命名，$1 < 2 < \dots < n$。结点 $j$ 的深度等于它的真祖先个数，所以内部路径长度就是满足"$i$ 是 $j$ 的祖先"的有序对 $(i, j)$（$i \ne j$）的个数。

**断言：**$i$ 是 $j$ 的祖先，当且仅当 $i$ 在 $i$ 与 $j$ 之间（含两端）这个范围内所有其他键之前被插入。考虑从 $\min(i,j)$ 到 $\max(i,j)$ 这个闭区间 $I$ 中的键。在 $I$ 中第一个键插入之前，$I$ 中任何键的搜索路径上的每个结点都在 $I$ 之外，而这样的结点把 $I$ 的所有键送往同一侧（它们全都位于它的同一边）。所以 $I$ 的所有键沿一条公共路径下行，直到其中第一个——记作 $f$——被插到那条路径的末端。若 $f = i$，则 $j$ 后来的查找会经过 $i$，$i$ 是 $j$ 的祖先。若 $f$ 严格介于 $i$ 与 $j$ 之间，则 $i$ 与 $j$ 分道扬镳、分居 $f$ 的两侧，谁也不是谁的祖先。若 $f = j$，则 $j$ 是 $i$ 的祖先，而祖先关系不能两相情愿，$i$ 就不是 $j$ 的祖先。

随机次序中，$I$ 的 $\lvert j - i\rvert + 1$ 个键等可能是最先出现的那个，所以 $\Prob[i \text{ 是 } j \text{ 的祖先}] = 1/(\lvert j-i\rvert + 1)$。对有序对求和（用期望的线性性），并按 $d = \lvert j - i\rvert$ 分组（距离为 $d$ 的有序对有 $2(n - d)$ 个）：

$$
\E[\text{IPL}] = \sum_{d=1}^{n-1}\frac{2(n-d)}{d+1} = 2\sum_{k=2}^{n}\frac{n + 1 - k}{k} = 2(n+1)(H_n - 1) - 2(n - 1) = 2(n+1)H_n - 4n.
$$

除以 $n$ 即得平均深度。由 $H_n = \ln n + \gamma + O(1/n)$、$\gamma \approx 0.577$，它是 $2\ln n + 2\gamma - 4 + o(1)$，而 $2\ln n = 2\ln 2\cdot\log_2 n \approx 1.386\log_2 n$。
:::

*平均*深度只比完美平衡的树差约 $39\%$。随机 BST 的*最大*深度（高度）在期望下也是对数的，渐近地约为 $4.311\ln n$（德弗鲁瓦（Devroye），1986），尽管收敛到该常数的速度很慢。一次模拟把随机输入与有序输入的对比呈现得十分直观（这是观察，随机序取种子 $42$）：

```python
import random, sys
sys.setrecursionlimit(10_000)                # 有序情形会递归 2000 层深

def depths(t):                               # 深度总和与高度，迭代实现
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

公式 [[#eq-ipl]] 对 $n = 2000$ 预测平均深度 $12.36$，与这一次随机序实测的 $11.80$ 相去不远；完美平衡的树高度为 $10$、平均深度约 $9$。

::: widget plot
f: (x - 1)/2; 2*(1 + 1/x)*(ln(x) + 0.5772) - 4; log2(x + 1) - 2
labels: \text{有序插入（路径）}; \text{随机插入}; \text{完美平衡}
x: 1, 1000
y: 0, 30
caption: 三种形态的 BST 的平均结点深度随 $n$ 的变化：有序插入长出的路径（$(n-1)/2$，很快就冲出画面）、[[#thm-random-bst]] 中随机插入次序下的期望值（取 $H_n \approx \ln n + 0.5772$）、完美平衡树（约 $\log_2(n+1) - 2$）。随机树与平衡理想之间只差一个常数因子；有序输入则是灾难。
:::

::: quiz
键 $1, \dots, 1000$ 以均匀随机的次序插入一棵空 BST。随机选取的一个结点的期望深度大约是多少？
- [ ] 约 $8$，与完美平衡的树相同
- [x] 约 $11$
- [ ] 约 $40$
- [ ] 约 $500$
::: solution
由 [[#thm-random-bst]]，期望平均深度为 $2(1 + 1/n)H_n - 4$。$H_{1000} \approx \ln 1000 + 0.577 \approx 7.485$，于是 $2 \cdot 1.001 \cdot 7.485 - 4 \approx 10.99$，约 $11$。有 $1000$ 个结点的完美平衡树高度为 $9$、平均深度约 $8$，所以随机序每次查找大约多花三次比较。$500$ 是按*有序*插入后的平均深度。
:::
:::

::: warning "平均情况 O(log n)"假设的是随机插入次序
[[#thm-random-bst]] 是对插入*次序*取平均，不是对所查找的键取平均；它对有序、近乎有序或敌手构造的输入建树、以及对经历大量删除之后的树，都一无所说。实际应用里次序很少是随机的。若所有键事先已知，先把键洗牌确实能回到随机情形；但动态字典需要对*每一*条操作序列都有保证——这正是 [[data-structures/balanced-trees]] 的平衡树所提供的：最坏情况高度 $O(\log n)$。
:::

## 有序操作

二叉搜索树之于哈希表的长处是序。下面每个操作都花 $O(h)$ 时间，有输出时再加上输出的规模：

- **最小值、最大值**：最左与最右的结点；
- **floor 与 ceiling**：不超过 $q$ 的最大键与不小于 $q$ 的最小键，如上面的 `ceiling`；
- **后继与前驱**；
- **区间查询**：按序列出 $[a, b]$ 内的所有键——用一次中序遍历，跳过完全落在区间外的子树——对报告 $r$ 个键花 $O(h + r)$；
- **秩与选择**——小于 $q$ 的键数，以及第 $i$ 小的键——条件是每个结点还存储自己子树的**规模**（size），由插入与删除沿各自的搜索路径维护（[[#exr-select]]）。

::: example 一次区间查询 {#ex-range}
写一个列出 $[a, b]$ 内所有键的函数，并在贯穿示例中以 $a = 33$、$b = 62$ 跟踪它。
::: solution
```python
def keys_between(t, a, b, out):
    if t is None:
        return out
    if a < t.key:
        keys_between(t.left, a, b, out)   # 左子树可能有 >= a 的键
    if a <= t.key <= b:
        out.append(t.key)
    if t.key < b:
        keys_between(t.right, a, b, out)  # 右子树可能有 <= b 的键
    return out
```

在 $50$：$33 < 50$，向左递归进 $30$。在 $30$：$33 > 30$，跳过 $30$ 的左子树（其中所有键 $< 30 < 33$），也不报告 $30$；$30 < 62$，向右递归进 $40$。在 $40$：向左递归进 $35$（报告；它的两棵子树为空），报告 $40$，向右递归进 $45$（报告）。回到 $50$：报告 $50$；$50 < 62$，向右递归进 $70$。在 $70$：$33 < 70$，向左递归进 $60$：报告 $60$，向右递归进 $65$——不报告（$65 > 62$），它的右子树被跳过。$70$ 不报告，且因为 $70 \not< 62$，它的右子树（$80$）也被跳过。

输出是 `[35, 40, 45, 50, 60]`，有序，因为这个函数就是一次带剪枝的中序遍历。被访问的结点恰是持有被报告键的结点，加上为 $a$ 与为 $b$ 的两条边界搜索路径上的结点，所以代价为 $O(h + r)$。
:::
:::

::: history
二叉搜索树在 1960 年前后由多人各自独立发现。P. F. 温德利（P. F. Windley）在 "Trees, forests and rearranging"（*The Computer Journal*，1960）、A. D. 布思（A. D. Booth）与 A. J. T. 科林（A. J. T. Colin）在 "On the efficiency of a new method of dictionary construction"（*Information and Control*，1960）、托马斯·希巴德（Thomas Hibbard）在 "Some combinatorial properties of certain trees with applications to searching and sorting"（*Journal of the ACM*，1962），都描述了树的插入并分析了随机树，得到 $2\ln n$ 的平均值；希巴德还给出了本章使用的删除算法。它与快速排序的联系——快排的比较次数与随机 BST 的内部路径长度同分布——见于高德纳（Knuth）的《计算机程序设计艺术》第 3 卷（1973）。吕克·德弗鲁瓦（Luc Devroye）在 1986 年确定了随机 BST 的渐近高度 $4.311\ln n$。
:::

## 后续内容

高度问题在 [[data-structures/balanced-trees]] 中解决：AVL 树与红黑树在每次插入、删除后用**旋转**恢复平衡，使最坏情况 $h = O(\log n)$；B 树把二叉搜索树推广为一结点多个键，服务于磁盘存储。Treap 与跳表用随机优先级或掷硬币，对*任何*输入都达到 [[#thm-random-bst]] 的随机树界；伸展树在每次访问时重构，取得摊还 $O(\log n)$；见 [[algorithms]]。标准库中的有序映射——C++ 的 `std::map`、Java 的 `TreeMap`——都是平衡的二叉搜索树；[[databases]] 的数据库索引是 B+ 树。[[#thm-random-bst]] 的分析原封不动地重现为快速排序的平均情况分析。

::: summary
- **二叉搜索树**（[[#def-bst]]）存放键的方式是：任一结点左子树的键都更小、右子树的键都更大；中序遍历按键有序列出（[[#thm-inorder-sorted]]）。
- 查找、最大、最小、后继、floor、ceiling、插入与删除，各沿一条或两条根—叶路径进行，花 $O(h)$（[[#thm-bst-search]]）。
- 插入把叶子放在一次不成功查找终止之处。删除至多摘除一个有一个孩子的结点，并用后继顶替有两个孩子的结点（[[#alg-bst-delete]]、[[#thm-bst-delete]]）。
- 高度介于 $\lfloor\log_2 n\rfloor$ 与 $n - 1$ 之间。有序插入长出一条高度 $n-1$ 的路径，总代价 $\Theta(n^2)$（[[#prop-degenerate]]）。
- 随机插入次序下，期望平均深度为 $2(1+1/n)H_n - 4 \approx 1.39\log_2 n$（[[#thm-random-bst]]）；但真实输入很少随机，最坏情况的保证需要平衡。
- 二叉搜索树支持哈希表做不到的有序查询——区间查询 $O(h + r)$，借助子树规模支持秩与选择。
:::

## 习题

::: exercise 它是不是二叉搜索树？ {level=1}
下列二叉树（写作 root(left, right)，`-` 表示空子树）哪些是二叉搜索树？(a) $8(3(1, 6), 10(-, 14))$；(b) $8(3(1, 9), 10(-, 14))$；(c) $8(3(1, 6(4, 7)), 10(9, 14))$。
::: solution
(a) 是：中序给出 $1, 3, 6, 8, 10, 14$，递增。(b) 否：$9$ 在 $8$ 的左子树中却比它大（中序 $1, 3, 9, 8, \dots$ 不递增），尽管每个孩子都在自己双亲的正确一侧。(c) 是：中序 $1, 3, 4, 6, 7, 8, 9, 10, 14$。
:::
:::

::: exercise 插入次序与高度 {level=1 check="6"}
把 $1, 2, 3, 4, 5, 6, 7$ 先按次序 $4, 2, 6, 1, 3, 5, 7$ 插入一棵空 BST，再（在另一棵新树中）按次序 $1, 7, 2, 6, 3, 5, 4$ 插入。第二棵树的高度是多少？（输入高度。）
::: solution
第一个次序给出高度 $2$ 的完美树：根 $4$，孩子 $2$ 与 $6$，叶子 $1, 3, 5, 7$。第二个次序给出一条之字形路径：$1$，右孩子 $7$，$7$ 的左孩子 $2$，$2$ 的右孩子 $6$，$6$ 的左孩子 $3$，$3$ 的右孩子 $5$，$5$ 的左孩子 $4$——一条 $7$ 个结点的路径，高度 $6$。同样的键，代价天差地别。
:::
:::

::: exercise 一次查找的比较次数 {level=1 check="4"}
在 [[#ex-bst-delete]] 的三次删除之后的树中，查找 $45$ 要做多少次键比较？（输入数目。）
::: solution
这棵树是 $50$ 带左孩子 $35$；$35$ 带右孩子 $40$；$40$ 带右孩子 $45$。查找依次与 $50$（向左）、$35$（向右）、$40$（向右）、$45$（找到）比较：$4$ 次比较。
:::
:::

::: exercise 前驱 {level=2}
仿照 `ceiling`，描述并实现函数 `floor(t, q)`，返回不超过 $q$ 的最大键。用它求贯穿示例中 $62$ 与 $19$ 的 floor。
::: solution
与 `ceiling` 对称：当 $q > t.\mathit{key}$，当前结点是候选，更大且仍 $\le q$ 的东西在它的右子树里；当 $q < t.\mathit{key}$，向左走。

```python
def floor(t, q):
    best = None
    while t is not None:
        if q == t.key:
            return t.key
        if q > t.key:
            best = t.key          # t 是候选；右边可能还有更大的
            t = t.right
        else:
            t = t.left
    return best
```

$62$：在 $50$ 向右（best $50$），在 $70$ 向左，在 $60$ 向右（best $60$），在 $65$ 向左：空。floor 为 $60$。$19$：从 $50$、$30$、$20$ 一直向左，$20$ 的左子树为空；没有记录过任何候选，所以 floor 是 `None`——每个键都比 $19$ 大。
:::
:::

::: exercise 内部路径长度 {level=2 check="29/6"}
用 [[#eq-ipl]] 计算由 $4$ 个键随机次序建成的 BST 的期望内部路径长度。（输入精确值。）
::: solution
$H_4 = 1 + \tfrac12 + \tfrac13 + \tfrac14 = \tfrac{25}{12}$。于是 $2\cdot 5\cdot\tfrac{25}{12} - 16 = \tfrac{250}{12} - 16 = \tfrac{125}{6} - \tfrac{96}{6} = \tfrac{29}{6} \approx 4.83$。枚举全部 $24$ 种次序（比如用一个小程序）核对，得到同样的值：各棵可能的树的内部路径长度从 $4$（平衡的形状）到 $6$（路径）不等。
:::
:::

::: exercise 检查性质 {level=2}
一位学生检查二叉树是不是 BST，办法是在每个结点检验孩子的 `left.key < node.key < right.key`。举一个反例说明这是错的，然后写一个正确的 $\Theta(n)$ 检查器。
::: solution
第一题中的树 $8(3(1, 9), 10)$ 在每个结点都能通过该学生的检验，但它不是 BST。正确的检查器把子树的键必须落入的开区间往下传：

```python
def is_bst(t, lo=None, hi=None):
    if t is None:
        return True
    if (lo is not None and t.key <= lo) or (hi is not None and t.key >= hi):
        return False
    return is_bst(t.left, lo, t.key) and is_bst(t.right, t.key, hi)
```

在根处区间无界；向左走，上界变为双亲的键；向右走，下界变为双亲的键。每个结点检查一次：$\Theta(n)$。（另一种办法是做一次中序遍历并检查序列递增，依据 [[#thm-inorder-sorted]]。）
:::
:::

::: exercise 借助子树规模进行选择 {#exr-select level=3}
给每个结点增储 `size`，即其子树中的结点数。(a) 说明 `_put` 与 `_delete` 如何维护它，路径上每个结点只多做 $O(1)$ 额外工作。(b) 写出 $O(h)$ 时间的 `select(t, i)`，返回第 $i$ 小的键（最小键取 $i = 0$），并证明其正确。(c) 写出 `rank(t, q)`，即小于 $q$ 的键数。
::: solution
(a) 在 `_put` 或 `_delete` 的递归调用返回之后，置 `t.size = 1 + size(t.left) + size(t.right)`，其中 `size(None) = 0`。只有搜索路径上的结点规模会变，每个恰好重算一次。

(b)
```python
def size(t):
    return 0 if t is None else t.size

def select(t, i):
    while t is not None:
        k = size(t.left)                 # 本子树中小于 t.key 的键数
        if i < k:
            t = t.left
        elif i == k:
            return t.key
        else:
            i, t = i - k - 1, t.right    # 跳过左子树和 t 自己
    raise IndexError(i)
```

不变式：答案是以 `t` 为根的子树中第 $i$ 小的键。按中序，这棵子树先列出左子树的 $k = $ `size(t.left)` 个键，然后在位置 $k$ 列出 `t.key`，再后是右子树。所以第 $i$ 小的键在 $i < k$ 时位于左子树，在 $i = k$ 时就是 `t.key`，否则是右子树的第 $(i - k - 1)$ 小的键。每步下降到下一层：$O(h)$。

(c)
```python
def rank(t, q):
    r = 0
    while t is not None:
        if q <= t.key:
            t = t.left
        else:
            r += size(t.left) + 1        # t 及其整个左子树都 < q
            t = t.right
    return r
```
:::
:::

::: exercise 由有序数组建树 {level=3}
给定一个含 $n$ 个互异键的已排序 Python 列表，以 $\Theta(n)$ 时间建一棵高度最小的 BST，并证明它的高度为 $\lfloor\log_2 n\rfloor$。为什么把键按有序次序逐个插入是很差的建法？若按你所建这棵树的层序次序插入，又会得到什么？
::: solution
取中间元素作根，递归地建两半：

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

每个键成为一个结点、做 $O(1)$ 工作（不做切片），所以时间 $\Theta(n)$。高度：规模为 $s$ 的区间产生一个根和规模分别为 $\lfloor s/2\rfloor$ 与 $\lceil s/2\rceil - 1$ 的两个子区间，二者都不超过 $\lfloor s/2 \rfloor$。归纳可证：规模 $s$ 满足 $2^k \le s < 2^{k+1}$ 的区间给出高度至多 $k$ 的树：子区间规模小于 $2^k$，故高度至多 $k - 1$。于是高度至多 $\lfloor\log_2 n\rfloor$，而由 [[data-structures/trees#thm-height-size]] 这也是可能的最小值。

按有序次序插入会长出高度 $n - 1$ 的路径、花 $\Theta(n^2)$ 次比较（[[#prop-degenerate]]）。按平衡树的层序次序插入（先根，再两半的中项，依此类推）恰好重建出同一棵平衡树，因为每个键都在其全部祖先之后、且相对于它们在其正确的位置插入；它花 $O(n\log n)$ 次比较。
:::
:::
