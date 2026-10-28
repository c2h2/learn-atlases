计算一列考试成绩中位数的函数很短，而且就其结果而言是正确的：

```python
def median(xs):
    xs.sort()
    n = len(xs)
    return xs[n // 2] if n % 2 else (xs[n // 2 - 1] + xs[n // 2]) / 2
```

后来，有一份要把每个学生的成绩印在其姓名旁边的报告，开始把成绩排错了行。这份报告建立了一个姓名列表和一个与之下标对应的成绩列表，为了打印班级小结调用 `median(marks)`，然后继续往下执行——可是 `median` 已经把调用者的列表原地排好了序，成绩不再与姓名一一对应。调用 `median(marks)` 处没有任何线索提示它会改变什么；缺陷安坐在一个函数里，却在远处的另一个函数里暴露出来。

到目前为止的每一章都遇到过这个问题的种种版本：[[programming-1/sequences]] 中的别名、[[program-design/abstract-data-types]] 中的表示暴露、[[program-design/classes-objects]] 中丢失的字典键。它们有一个共同的原因——**对共享状态的修改**——而本章讲的正是消除这一原因的一种程序设计风格。在**函数式风格**中，函数只从实参的值算出结果，此外什么都不做；数据一旦构造完成就永不改变。这样写出的程序可以像代数中做替换那样进行推理；它的各个部分可以放心地测试、缓存、并行运行；而且，有了**持久化数据结构**，它们未必更慢。我们还要学会写形状跟随数据形状的递归函数，并用结构归纳法证明关于它们的性质。

## 纯函数

::: definition 纯函数、副作用 {#def-pure}
一个函数称为**纯函数**，如果 (1) 它的结果只取决于其形参的值，并且 (2) 调用它没有**副作用**——对函数之外的一切都没有可观察的改变：不修改其实参，也不修改全局对象或共享对象，不做输入或输出，除实参所确定的那些异常外不抛出异常。不是纯函数的函数称为**不纯函数**。
:::

纯函数：`len`、`abs`、`sorted`、`math.sqrt`、`str.upper`、[[program-design/abstraction-specifications]] 中的 `isqrt`，以及本章后面的 `simplify` 函数。不纯函数：`list.sort`（修改其实参）、`print`（输出）、`input` 与 `open(...).read()`（输入）、`random.random()` 与 `time.time()`（结果依赖于隐蔽状态），以及任何读取了可能改变的全局变量的函数。上面的 `median` 因为 `xs.sort()` 而不纯；把那一行换成 `xs = sorted(xs)` 就使它变纯，代价是复制一份列表。

纯粹性正是下面这条性质得以成立的前提。

::: definition 引用透明 {#def-referential-transparency}
一个表达式称为**引用透明**的，如果它在任何出现的地方都可以被替换为它的值，而不改变程序的行为。每个表达式都引用透明的程序，可以像代数那样通过**以相等者替换相等者**来推理。
:::

若 `f` 是纯的，那么 `f(3)` 是引用透明的：`f(3) + f(3)` 可以被替换为 `2 * f(3)`，或在 `y = f(3)` 之后替换为 `y + y`，程序对此毫无察觉。若 `f` 不纯，这样的替换就会改变含义：

```python
counter = [0]

def next_id():                    # 不纯：读取并修改共享状态
    counter[0] += 1
    return counter[0]

print(next_id() + next_id(), 2 * next_id())
```

```console
$ python3 nextid.py
3 6
```

`next_id() + next_id()` 是 $1 + 2 = 3$，而 `2 * next_id()` 是 $2 \times 3 = 6$——于是一个看似无害的代数化简、一次编译器优化、或一个引入变量的重构，都会改变输出。面对不纯的代码，调用的*顺序*与*次数*都重要，每个读者都必须盯着它们。

### 保持纯粹的好处

- **测试。** 纯函数的行为可以被一张输入与输出的表完全刻画。测试既不必布置隐蔽状态，也不必善后清理，而且每次都给出同样的答案。
- **缓存。** [[program-design/higher-order-functions]] 中的 `memo` 装饰器只对纯函数才是正确的：缓存 `next_id` 会永远返回 `1`。
- **并行。** 两次纯函数调用不可能互相干扰，所以它们可以在不同处理器上不加锁地同时运行。[[parallel-computing]] 与 [[operating-systems]] 里的难题——竞争、死锁——全是共享可变状态的问题。
- **推理。** 纯函数的规格说明没有 Modifies 子句。要理解一次调用，你只需要它的实参和它的规格说明，别无其他。

没有哪个有用的程序是完全纯粹的：它必须读入输入、产生输出。一种实用的纪律——有时被称为"**函数式内核，命令式外壳**"——是把决策与计算放进纯函数，而把副作用——读文件、打印、与网络通信、改数据库——关进调用它们的一层薄薄的外壳里。本课程每个清单末尾的 `print` 就是那层外壳。

::: quiz
下列哪个函数是纯的？
- [ ] `def f(xs): xs.append(0); return len(xs)`
- [ ] `def g(x): return x + offset`，其中 `offset` 是一个会被其他代码改变的全局变量
- [x] `def h(xs): return sorted(xs)[-1] if xs else None`
- [ ] `def k(n): print(n); return n * n`
::: solution
`h` 构造一个新的已排序列表并返回其最后一个元素；它不改变任何东西，且只取决于 `xs`。`f` 修改它的实参；`g` 依赖于一个可能改变的全局变量，所以同一个实参可能给出不同的结果；`k` 执行了输出，这是一个副作用，尽管它的结果只取决于 `n`。
:::
:::

## 用替换进行推理

对纯代码，一次函数调用的含义可以由**替换模型**得到：把调用替换为函数体，并把每个形参替换为对应实参的值，然后化简。阿贝尔森（Abelson）与苏斯曼（Sussman）的《Structure and Interpretation of Computer Programs》正是这样开讲的，而这也正是我们在数学中对 $f(x) = x^2 + 1$ 求 $f(3)$ 的做法。

::: example 用替换求值 {#ex-substitution}
设 `square(x) = x * x`、`sum_squares(a, b) = square(a) + square(b)`，用替换按两种不同的次序求 `sum_squares(3, 4 + 1)`。
::: solution
**先求实参**（Python 的次序，称为**应用序**）：

```text
sum_squares(3, 4 + 1)
= sum_squares(3, 5)                 先求各实参的值
= square(3) + square(5)             把 a = 3、b = 5 代入函数体
= (3 * 3) + (5 * 5)
= 9 + 25
= 34
```

**先替换，后求值**（**正规序**）：

```text
sum_squares(3, 4 + 1)
= square(3) + square(4 + 1)
= (3 * 3) + ((4 + 1) * (4 + 1))
= 9 + (5 * 5)
= 34
```

两种次序都得 $34$。对会终止的纯代码，这不是巧合：求子表达式的次序不能改变值（这是 λ演算的丘奇-罗瑟（Church–Rosser）定理的一个推论，见 [[programming-languages]]）。正规序把 `4 + 1` 求了两次，这是推迟工作的代价；Haskell 等语言使用**惰性求值**，即带结果共享的正规序，它保留了"只有当需要时才求某个实参"的好处。[[program-design/iterators-generators]] 中 Python 的生成器把这种惰性带给了序列。
:::
:::

替换不仅是一种手工执行程序的方式；它还是一种*证明*关于程序之性质的方式。形如映射融合（map fusion，[[program-design/higher-order-functions#thm-map-fusion]]）的等式靠展开定义来证明，它们之所以成立，正因为所涉及的函数是纯的。

## 不可变数据

纯函数不得修改它的实参，所以要"改变"一个值就得构造一个新的。对 Python 内建的不可变类型——数、字符串、元组、`frozenset`——这是自然而然的事；冻结的数据类（frozen data class）也是如此，`dataclasses.replace` 能为它制作一份改过的副本。

```python
from dataclasses import dataclass, replace

@dataclass(frozen=True)
class Order:
    customer: str
    items: tuple = ()
    paid: bool = False

def add_item(order, item):
    """Effects: returns order with item appended; order itself is unchanged."""
    return replace(order, items=order.items + (item,))

o1 = Order("Ada")
o2 = add_item(add_item(o1, "tea"), "scone")
o3 = replace(o2, paid=True)
print(o1)
print(o2)
print(o3.paid, o2.paid, o2.items is o3.items)
```

```console
$ python3 order.py
Order(customer='Ada', items=(), paid=False)
Order(customer='Ada', items=('tea', 'scone'), paid=False)
True False True
```

订单的每个版本都仍然存在且未被改变：`o3` 造好之后，`o1` 仍是空的，`o2` 仍未付款。没有任何东西能在调用者背后悄悄变化，所以值可以自由共享——`o3` 与 `o2` 共享的就是同一个项目元组，而这之所以安全，恰恰因为两者都无法修改它。当没有任何东西可变时就不存在别名问题：别名只有与修改结合在一起才危险。

::: warning 不可变不等于深层不可变
元组本身不能改变，但它的元素可以。`t = (1, [2, 3])` 之后，`t[1].append(4)` 使 `t` 等于 `(1, [2, 3, 4])`：元组装的仍是同一个列表对象，变的是列表。这样的元组也不可哈希（`hash(t)` 抛出 `TypeError: unhashable type: 'list'`）。同样，带有列表属性的冻结数据类只是*浅层*不可变。对于绝不能改变的值，要一路使用不可变类型：元组的元组、`frozenset`、字段全为不可变类型的冻结数据类。
:::

复制听起来很昂贵：难道每次"更新"都要复制整个结构吗？对上面的 `add_item` 来说，是的——`order.items + (item,)` 会复制元组，所以一个一个地构造一个含 $n$ 个项目的订单要花费 $\Theta(n^2)$。补救之道不是放弃不可变性，而是选择为不可变性设计的数据结构。

## 持久化数据结构

::: definition 持久化数据结构 {#def-persistent}
一个数据结构称为**持久化的**，如果每个"修改"它的运算都返回一个新版本，同时让此前所有版本保持原样、依旧可用。持久化结构因**结构共享**而高效：新版本不必复制，就重复使用旧版本中该运算没有改变的每一部分。
:::

最简单的持久化结构，是把 [[data-structures/arrays-lists]] 中的链表不可变地使用。用 `None` 表示空表，用二元组 `(first, rest)` 表示非空表。那么把一个元素放到最前面是 $O(1)$，并且共享整个旧表：

```python
def cons(x, xs):  return (x, xs)          # 一个新单元；xs 被共享而非复制

def to_list(xs):
    out = []
    while xs is not None:
        x, xs = xs
        out.append(x)
    return out

base = cons(2, cons(3, None))
a = cons(1, base)                          # [1, 2, 3]
b = cons(9, base)                          # [9, 2, 3]
print(to_list(a), to_list(b), a[1] is b[1])
```

```console
$ python3 cons.py
[1, 2, 3] [9, 2, 3] True
```

两个列表、五个值，却只有四个单元：装着 $2$ 与 $3$ 的单元同时属于两个列表。这又是 [[program-design/abstract-data-types]] 中的栈，也正是 $\mathit{pop}(\mathit{push}(s, x))$ 与 $s$ 本是同一个对象的原因。

::: example 免费的撤销 {#ex-undo}
一个文字处理软件保存文档的每个版本，使用户可以撤销任意多次编辑。若用可变的单词列表，每个保存的版本都必须是一份完整副本。说明持久化列表如何让保存一个版本的代价为 $O(1)$，并数一数所用的单元。
::: solution
把单词按最新在前的顺序存成 cons 列表，并维护一个版本列表：

```python
def cons(x, xs):  return (x, xs)

def words(doc):                            # 最早的单词在前
    out = []
    while doc is not None:
        w, doc = doc
        out.append(w)
    return out[::-1]

history = [None]                           # 版本 0：空文档
for w in ["persistence", "makes", "undo", "trivial"]:
    history.append(cons(w, history[-1]))   # 每次编辑新增一个单元
print(" ".join(words(history[-1])))
history.pop()                              # 撤销最后一次编辑
history.pop()                              # 以及倒数第二次
print(" ".join(words(history[-1])), "| versions kept:", len(history))
```

```console
$ python3 undo.py
persistence makes undo trivial
persistence makes | versions kept: 3
```

四次编辑之后有五个版本，长度分别为 $0, 1, 2, 3, 4$——总共十个单词——但只存在四个单元，因为版本 $i$ 就是版本 $i - 1$ 在前面多挂一个单元。撤销就是对历史做一次 `pop`，而且任何版本都不会被后来的编辑损坏，因为没有任何版本可以被修改。若靠复制，对一个 $n$ 个单词的文档做 $k$ 次编辑要存 $\Theta(kn)$ 个单词；靠共享，只需 $\Theta(n + k)$。真正的编辑器使用持久化的*树*（绳（rope）、分片表（piece table））而不是列表，使得中间的编辑也同样廉价。
:::
:::

树同样善于共享。要向不可变的二叉搜索树插入，只需复制从根到插入点这条路径上的结点——**路径复制**——并让副本指向那些未改变的字树。

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Node:
    left: "Node | None"
    key: int
    right: "Node | None"

def insert(t, k):
    """Effects: returns a BST with the keys of t and k; t is unchanged."""
    if t is None:
        return Node(None, k, None)
    if k < t.key:
        return Node(insert(t.left, k), t.key, t.right)    # 只复制这个结点
    if k > t.key:
        return Node(t.left, t.key, insert(t.right, k))
    return t                                              # 键已存在

def nodes(t):
    return [] if t is None else nodes(t.left) + [t] + nodes(t.right)

v1 = None
for k in [50, 30, 70, 20, 40, 60, 80]:
    v1 = insert(v1, k)
v2 = insert(v1, 45)
print([n.key for n in nodes(v1)])
print([n.key for n in nodes(v2)])
shared = {id(n) for n in nodes(v1)} & {id(n) for n in nodes(v2)}
print(len(nodes(v1)), len(nodes(v2)), len(shared))
```

```console
$ python3 pbst.py
[20, 30, 40, 50, 60, 70, 80]
[20, 30, 40, 45, 50, 60, 70, 80]
7 8 4
```

::: theorem 路径复制的代价 {#thm-path-copying}
设 $t$ 是一棵二叉搜索树，$k$ 是不在 $t$ 中的一个键，$d$ 是 $k$ 的搜索路径上的结点数（即 `insert` 拿其键与 $k$ 比较过的那些结点）。那么 `insert(t, k)` 恰好新建 $d + 1$ 个结点，而新树的每个其他结点都是 $t$ 的结点。特别地，对一棵高为 $h$ 的树，它的代价是 $O(h)$，与可变的插入相同。
:::

::: proof
对 $d$ 归纳。若 $d = 0$，则 $t$ 是 `None`（搜索路径为空），`insert` 创建一个结点，而新树再无其他结点。设 $d \ge 1$，于是 $t$ 是一个键满足 $t.key \ne k$ 的结点；不妨设 $k < t.key$（另一种情形对称）。$k$ 在 $t$ 中的搜索路径是根，接着是 $t.left$ 中的搜索路径，后者有 $d - 1$ 个结点。由归纳假设，`insert(t.left, k)` 恰好新建 $(d - 1) + 1 = d$ 个结点，且其结果的所有其他结点都属于 $t.left$。这次调用随后再多创建一个结点，即根的副本，它的右子树就是 $t.right$ 本身。所以恰好有 $d + 1$ 个结点是新的，而结果的每个其他结点属于 $t.left$ 或 $t.right$，从而属于 $t$。每个新建的结点花费 $O(1)$ 的工作，且 $d \le h$。
:::

在例子里，$45$ 的搜索路径是 $50, 30, 40$（$d = 3$），所以有四个新结点——$50$、$30$、$40$ 的副本以及叶子 $45$——而 `v2` 的其余四个结点（$20$、$60$、$70$、$80$）与 `v1` 共享。

::: widget graph
nodes: 50@3,4; 30@1.5,3; 70@4.5,3; 20@0.5,2; 40@2.5,2; 60@4,2; 80@5.5,2; 50b@3,5.5; 30b@1.5,4.6; 40b@2.5,3.6; 45@3.2,1
edges: 50>30; 50>70; 30>20; 30>40; 70>60; 70>80; 50b>30b; 50b>70; 30b>20; 30b>40b; 40b>45
algorithm: dfs
start: 50b
caption: 一张图中的一棵持久二叉搜索树的两个版本。版本 1 的根是 `50`；插入 $45$ 创建了版本 2，它的根是 `50b`，搜索路径上结点的新副本 `30b` 与 `40b`，外加叶子 `45`。从 `50b` 出发逐步执行一次深度优先搜索：它恰好访问版本 2 的八个结点，经由新的路径到达共享的旧结点 `20`、`70`、`60` 与 `80`。把起点改为 `50`，搜索到的就是原封不动的版本 1。
:::

同一思想的平衡版本（持久化红黑树、指状树（finger tree）、哈希数组映射前缀树）为集合、映射与序列提供 $O(\log n)$ 的更新，是 Clojure、Scala、Haskell 等语言的标准集合库。能够廉价地保留每个旧版本，其用处远在函数式编程之外：编辑器的撤销历史、数据库与文件系统的快照、版本控制，全都依赖结构共享（[[software-engineering]]）。

## 沿结构递归

不可变数据通常由几种递归定义的结点构造而成。这样一个**数据定义**的形状，告诉我们要处理它的函数应有怎样的形状。费莱森（Felleisen）、芬德勒（Findler）、弗拉特（Flatt）与克里希纳穆尔蒂（Krishnamurthi）的 *How to Design Programs* 把它变成了一套方法——**设计规程**：(1) 写出数据定义；(2) 写出函数的签名、目的陈述与示例；(3) 从数据定义导出一个**模板**——每种结点一个分支，每个自指部分对应一次递归调用；(4) 填写模板；(5) 把示例变成测试。

::: example 一个表达式求值器与化简器 {#ex-expr}
含整数常量、变量、加法与乘法的算术表达式是树。写出数据定义、一个求值器，以及一个使用 Python 的 `match` 语句、应用 $0 + x = x$、$1 \cdot x = x$ 与 $0 \cdot x = 0$ 的化简器。
::: solution
**数据定义。** 一个表达式是下列之一：带整数值 `value` 的 `Num(value)`；带字符串名字 `name` 的 `Var(name)`；`Add(left, right)` 或 `Mul(left, right)`，其中 `left` 与 `right` 是表达式。

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Num:  value: int
@dataclass(frozen=True)
class Var:  name: str
@dataclass(frozen=True)
class Add:  left: object; right: object
@dataclass(frozen=True)
class Mul:  left: object; right: object

def evaluate(e, env):
    """Value of expression e, with variables looked up in the dict env."""
    match e:
        case Num(v):    return v
        case Var(name): return env[name]
        case Add(l, r): return evaluate(l, env) + evaluate(r, env)
        case Mul(l, r): return evaluate(l, env) * evaluate(r, env)

def simplify(e):
    """An expression with the same value as e, using 0+x = x, 1*x = x and 0*x = 0."""
    match e:
        case Add(l, r):
            l, r = simplify(l), simplify(r)
            if l == Num(0): return r
            if r == Num(0): return l
            return Add(l, r)
        case Mul(l, r):
            l, r = simplify(l), simplify(r)
            if Num(0) in (l, r): return Num(0)
            if l == Num(1): return r
            if r == Num(1): return l
            return Mul(l, r)
        case _:                       # Num 与 Var 已经是简式
            return e

e = Add(Mul(Num(1), Var("x")), Mul(Var("y"), Add(Num(0), Num(0))))
print(simplify(e))
print(evaluate(e, {"x": 7, "y": 3}), evaluate(simplify(e), {"x": 7, "y": 3}))
```

```console
$ python3 expr.py
Var(name='x')
7 7
```

两个函数有同一个模板：每种结点一个 `case` 分支，并且对复合类型的每个子表达式递归调用。`match` 语句（Python 3.10 及以后）把 `e` 的形状与每个模式依次比较；`case Add(l, r)` 匹配一个 `Add` 结点，并把它的两个字段绑定到 `l` 和 `r`。冻结的数据类赋予结点按值相等，`simplify` 在 `l == Num(0)` 中正用到这一点；并且化简器从不修改它的输入：它构造一棵新树，复用未改变的那些子表达式，如 `Var("x")`。这里 $(1 \cdot x) + (y \cdot (0 + 0))$ 化简为 $x$：内层的 $0 + 0$ 变成 $0$，然后 $y \cdot 0$ 变成 $0$，$1 \cdot x$ 变成 $x$，而 $x + 0$ 变成 $x$。
:::
:::

按结构递归定义的函数，用与之匹配的证明原则来证明其正确性。

::: theorem 结构归纳法 {#thm-structural-induction}
设某个值集合被定义为：由一些**基本**构造器（不含该集合的子系统值）与**递归**构造器（其实参中包含该集合的值）构造出的最小集合。要为集合的每个值 $v$ 证明性质 $P(v)$，只需证明：对每个由基本构造器构造的值 $P(v)$ 成立；并且对每个递归构造器，只要某个值的所有属于该集合的子系统值使 $P$ 成立，由它构造出的值也使 $P$ 成立。
:::

::: proof
给每个值赋予它的**尺寸**，即构造它所用的构造器应用次数；子系统值的尺寸严格更小。假设 $P$ 对某个值不成立，并令 $v$ 是使 $P$ 不成立的最小尺寸的值。若 $v$ 由基本构造器构造，则由假设的第一部分 $P(v)$ 成立——矛盾。否则 $v$ 由递归构造器从更小尺寸的子系统值构造而来，这些子系统值由 $v$ 的极小性使 $P$ 成立；于是假设的第二部分给出 $P(v)$——又是矛盾。所以 $P$ 对每个值都成立。（这就是关于尺寸的普通强归纳法，见[数学图谱：归纳法](/learn/maths/lesson.php?c=proofs&l=induction)。）
:::

::: example 叶子与运算符 {#ex-leaves}
证明：在 [[#ex-expr]] 的每个表达式中，叶子（`Num` 与 `Var` 结点）的个数比运算符（`Add` 与 `Mul` 结点）的个数多一。然后证明 `simplify` 保持值：只要 `evaluate(e, env)` 能成功，就有 `evaluate(simplify(e), env) == evaluate(e, env)`。
::: solution
**叶子。** 设 $\ell(e)$ 与 $o(e)$ 分别计数叶子与运算符；我们按 [[#thm-structural-induction]] 证明 $\ell(e) = o(e) + 1$。基本情形：一个 `Num` 或一个 `Var` 有 $\ell = 1$，$o = 0$。递归情形：对 $e = \mathrm{Add}(l, r)$（`Mul` 同理），$e$ 的叶子就是 $l$ 与 $r$ 的叶子，而运算符是 $l$ 与 $r$ 的运算符再加一。假设该性质对 $l$ 与 $r$ 成立，则 $\ell(e) = \ell(l) + \ell(r) = (o(l) + 1) + (o(r) + 1) = (o(l) + o(r) + 1) + 1 = o(e) + 1$。

**值。** 把 `evaluate(e, env)` 记作 $[\![e]\!]$。基本情形：`simplify` 原样返回 `Num` 与 `Var` 结点。情形 $e = \mathrm{Add}(l, r)$：设 $l' = $ `simplify(l)`、$r' = $ `simplify(r)`；由归纳假设 $[\![l']\!] = [\![l]\!]$ 且 $[\![r']\!] = [\![r]\!]$。若 $l' = \mathrm{Num}(0)$，结果是 $r'$，其值为 $[\![r]\!] = 0 + [\![r]\!] = [\![l]\!] + [\![r]\!] = [\![e]\!]$；情形 $r' = \mathrm{Num}(0)$ 对称；否则结果是 $\mathrm{Add}(l', r')$，其值为 $[\![l']\!] + [\![r']\!] = [\![e]\!]$。情形 $e = \mathrm{Mul}(l, r)$：完全同样，对整数使用 $0 \cdot v = v \cdot 0 = 0$ 与 $1 \cdot v = v \cdot 1 = v$。

证明假定了 `evaluate(e, env)` 成功。若 `env` 缺少某个被乘以零的变量，`evaluate(e, env)` 会抛出 `KeyError`，而化简后的表达式可能不需要它就能求值——化简能使一个表达式*更*有定义，绝不会更无定义。这类定律正是优化编译器必须遵守的。
:::
:::

::: warning Python 不是为深递归而生的
Python 限制递归的深度（默认 $1000$ 个栈帧，见 `sys.getrecursionlimit()`），并且不做尾调用消除，所以对一个 $5000$ 单元的链表做递归的 `length` 会抛出 `RecursionError: maximum recursion depth exceeded`。结构递归对树是理想的——树的深度通常关于其规模是对数的——但对长的线性结构请写循环——同时保持*接口*是纯的。Scheme、OCaml、Haskell 等函数式语言保证尾调用不增加栈，这就是递归成为它们的基本循环构造的原因。
:::

::: history
LISP（麦卡锡（McCarthy），1960）建立在关于由 `cons` 单元构成的不可变列表的递归函数之上；彼得·兰丁（Peter Landin）的《The next 700 programming languages》（1966）描述了 ISWIM——一种建立在表达式与替换之上的语言设计。罗德·伯斯特奥尔（Rod Burstall）的《Proving properties of programs by structural induction》（*The Computer Journal*，1969）提出了本章的证明原则。罗宾·米尔纳（Robin Milner）的 ML（始于 1973 年，为 LCF 定理证明器而设计）加入了静态类型与针对数据定义的模式匹配；大卫·特纳（David Turner）的 Miranda（1985）以及其后的 Haskell（首份报告 1990）使惰性的纯函数式编程变得实用。詹姆斯·德里斯科尔（James Driscoll）、尼尔·萨尔纳克（Neil Sarnak）、丹尼尔·斯莱托（Daniel Sleator）与罗伯特·塔扬（Robert Tarjan）的《Making data structures persistent》（1989）给出了实现持久化的一般技术，克里斯·奥卡萨基（Chris Okasaki）的《Purely Functional Data Structures》（1998）则表明高效的不可变队列、堆与树可以与可变的对应物不相上下。
:::

## 后续内容

[[program-design/iterators-generators]] 把惰性求值带入 Python 的序列。[[program-design/types-interfaces]] 给数据定义配上类型，使检查器能够确认一个 `match` 处理了每一种结点。在 [[programming-languages]] 中，替换模型成为 λ演算的形式语义，解释器被写成对语法树的结构递归——正是上面那个 `evaluate` 长大后的样子——而 [[compilers]] 把 `simplify` 这类保持值的改写用作优化。持久化结构将在 [[databases]]（多版本并发控制）与 [[distributed-systems]] 中重现，在那里，不可变的日志比可变状态更容易复制。

::: summary
- **纯**函数的结果只取决于它的实参，且它没有副作用（[[#def-pure]]）；纯表达式是**引用透明**的，可以被替换为它们的值（[[#def-referential-transparency]]）。
- 纯粹使代码易于测试、缓存、并行与推理；把副作用关在函数式内核之外的一层薄薄的命令式外壳里。
- **替换模型**用实参替换形参来求纯调用的值；对会终止的纯代码，求值次序不能改变结果。
- **不可变**的值可以共享而没有别名之害；"更新"构造新值（`dataclasses.replace`）。元组只是浅层不可变。
- **持久化**结构保留所有版本并共享未改变的部分：`cons` 是 $O(1)$；对二叉搜索树做路径复制插入，当搜索路径上有 $d$ 个结点时新建 $d + 1$ 个结点（[[#thm-path-copying]]）。
- 递归的数据定义给出函数**模板**（设计规程）与按**结构归纳法**的证明（[[#thm-structural-induction]]）；Python 的 `match` 与冻结数据类可以直接表达它们。
- Python 限制递归深度且没有尾调用消除：对树用递归，对长列表用循环。
:::

## 习题

::: exercise 纯还是不纯？{level=1}
把下列函数分类为纯或不纯，并给出理由：(a) `def f(d, k): return d.get(k, 0)`；(b) `def g(d, k): d.setdefault(k, 0); return d[k]`；(c) `def h(): return random.randint(1, 6)`；(d) `def m(xs): return [x for x in xs if x > 0]`；(e) `def n(path): return open(path).read()`。
::: solution
(a) 纯：它只读 `d` 而不改变它，结果只取决于 `d` 与 `k`。（严格地说，它依赖于可变字典的*当前内容*——关于可变实参的函数的纯度，是相对于调用时刻的实参值而言的。）(b) 不纯：`setdefault` 可能把 `k` 插入调用者的字典。(c) 不纯：结果依赖于随机数生成器的隐蔽状态，而调用也会改变它。(d) 纯：它构造一个新列表。(e) 不纯：它执行输入，且结果依赖于文件系统，而文件系统可能在两次调用之间改变。
:::
:::

::: exercise 新结点 {level=1 check="4"}
把 $8, 4, 12, 2, 6, 10, 14, 1$ 按此顺序逐个插入一棵空树构造出的持久二叉搜索树，在收到键 $7$ 时，`insert` 新建多少个结点？（填入数字。）
::: solution
$7$ 的搜索路径是 $8$（向左）、$4$（向右）、$6$（向右，到达空子树）：$d = 3$。由 [[#thm-path-copying]]，新增 $d + 1 = 4$ 个结点——$8$、$4$、$6$ 的副本以及叶子 $7$；其余 $8 - 3 = 5$ 个结点是共享的。
:::
:::

::: exercise 手工替换 {level=1 check="50"}
设 `double(x) = x + x`、`f(a, b) = double(a) * b`，按替换模型、先求实参，求 `f(2 + 3, double(2) + 1)`。（填入数值。）
::: solution
先求实参：`2 + 3 = 5`；`double(2) + 1 = (2 + 2) + 1 = 5`。于是 `f(5, 5) = double(5) * 5 = (5 + 5) * 5 = 50`。
:::
:::

::: exercise 可变的内部 {level=2}
预测输出，然后逐行解释。

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Team:
    name: str
    members: list

t = Team("blue", ["ann"])
u = t
t.members.append("bob")
print(u.members, t == Team("blue", ["ann", "bob"]))
try:
    print(hash(t))
except TypeError as e:
    print("TypeError:", e)
```
::: solution
```console
$ python3 team.py
['ann', 'bob'] True
TypeError: unhashable type: 'list'
```

`frozen=True` 禁止重新绑定属性（`t.members = []` 会抛出 `FrozenInstanceError`），但不禁止修改属性所指向的列表，所以 `append` 会成功，并且透过别名 `u` 也看得见。相等比较各字段，所以这个队与一个成员相同的新队相等。生成的 `__hash__` 对字段元组求哈希，这会失败，因为列表不可哈希。把声明改为 `members: tuple` 就能让这个类深层不可变。
:::
:::

::: exercise cons 列表上的函数 {level=2}
采用表示法 `None` / `(first, rest)`，写出递归的纯函数 `length(xs)`、`append(xs, ys)` 与 `reverse(xs)`（最后一个用累加器），遵循"对 `None` 一个分支，对一个二元组一个分支、对 `rest` 递归调用"的模板。`append(xs, ys)` 新建多少个单元？结果与哪些单元共享？
::: solution
```python
def length(xs):
    return 0 if xs is None else 1 + length(xs[1])

def append(xs, ys):
    return ys if xs is None else (xs[0], append(xs[1], ys))

def reverse(xs, acc=None):
    return acc if xs is None else reverse(xs[1], (xs[0], acc))

def from_list(items):
    out = None
    for x in reversed(items):
        out = (x, out)
    return out

a, b = from_list([1, 2, 3]), from_list([4, 5])
c = append(a, b)
print(c, length(c), reverse(c))
print(c[1][1][1] is b)
```

```console
$ python3 conslist.py
(1, (2, (3, (4, (5, None))))) 5 (5, (4, (3, (2, (1, None)))))
True
```

`append` 为 `xs` 的每个元素新建一个单元——这里是 $3$ 个——并共享整个 `ys`：`c` 的第四个单元就*是* `b`。因此它的代价是 $\Theta(xs\text{ 的长度})$，与 `ys` 无关。`xs` 无法被共享，因为它的最后一个单元指向 `None`，而它不得不改为指向 `ys`。
:::
:::

::: exercise 数叶子 {level=2 check="8"}
语言见 [[#ex-expr]] 的某个表达式共有 $7$ 个 `Add` 与 `Mul` 结点。它包含多少个 `Num` 与 `Var` 结点？（填入数字。）
::: solution
由 [[#ex-leaves]]，叶子数 $=$ 运算符数 $+ 1 = 8$，无论树的形状如何。
:::
:::

::: exercise 反转一个拼接 {level=3}
对前面练习中的 cons 列表函数（其中 `rev` 是两情形的定义 $\mathrm{rev}(\mathrm{None}) = \mathrm{None}$，$\mathrm{rev}((x, xs)) = \mathrm{append}(\mathrm{rev}(xs), (x, \mathrm{None}))$），用结构归纳法证明 $\mathrm{rev}(\mathrm{append}(xs, ys)) = \mathrm{append}(\mathrm{rev}(ys), \mathrm{rev}(xs))$。引理 $\mathrm{append}(xs, \mathrm{None}) = xs$ 与 $\mathrm{append}(\mathrm{append}(xs, ys), zs) = \mathrm{append}(xs, \mathrm{append}(ys, zs))$ 可在证明它们之后使用。
::: solution
**引理 1**，$\mathrm{append}(xs, \mathrm{None}) = xs$，对 $xs$ 归纳：对 $\mathrm{None}$ 两边都是 $\mathrm{None}$；对 $(x, xs')$，由归纳假设 $\mathrm{append}((x, xs'), \mathrm{None}) = (x, \mathrm{append}(xs', \mathrm{None})) = (x, xs')$。

**引理 2**（结合律），对 $xs$ 归纳：对 $\mathrm{None}$ 两边都是 $\mathrm{append}(ys, zs)$；对 $(x, xs')$，左边是 $(x, \mathrm{append}(\mathrm{append}(xs', ys), zs))$，右边是 $(x, \mathrm{append}(xs', \mathrm{append}(ys, zs)))$，由归纳假设相等。

**主要断言**，对 $xs$ 归纳。基本情形：由引理 1，$\mathrm{rev}(\mathrm{append}(\mathrm{None}, ys)) = \mathrm{rev}(ys) = \mathrm{append}(\mathrm{rev}(ys), \mathrm{None})$，且 $\mathrm{rev}(\mathrm{None}) = \mathrm{None}$。递推：对 $xs = (x, xs')$，

$$
\begin{aligned}
\mathrm{rev}(\mathrm{append}((x, xs'), ys)) &= \mathrm{rev}((x, \mathrm{append}(xs', ys))) = \mathrm{append}(\mathrm{rev}(\mathrm{append}(xs', ys)), [x])\\
&= \mathrm{append}(\mathrm{append}(\mathrm{rev}(ys), \mathrm{rev}(xs')), [x]) \quad\text{（归纳假设）}\\
&= \mathrm{append}(\mathrm{rev}(ys), \mathrm{append}(\mathrm{rev}(xs'), [x])) \quad\text{（引理 2）}\\
&= \mathrm{append}(\mathrm{rev}(ys), \mathrm{rev}((x, xs'))),
\end{aligned}
$$

其中 $[x]$ 是 $(x, \mathrm{None})$ 的缩写。每一步都是以相等者替换相等者，其有效性正因这些函数是纯的。
:::
:::

::: exercise 符号求导 {level=3}
写一个纯函数 `d(e, x)`，返回 [[#ex-expr]] 中某个表达式关于名为 `x` 的变量的导数，使用 $\frac{d}{dx}c = 0$、$\frac{d}{dx}x = 1$、对其他变量 $\frac{d}{dx}y = 0$、和的求导法则与乘积法则 $(uv)' = u'v + uv'$。对结果施用 `simplify`，并在 $x = 5$ 处对照值 $2x + 3 = 13$ 测试 $x \cdot x + 3 \cdot x$ 的导数。
::: solution
```python
# （Num、Var、Add、Mul、evaluate 与 simplify 同 expr.py）
def d(e, x):
    match e:
        case Num(_):    return Num(0)
        case Var(name): return Num(1) if name == x else Num(0)
        case Add(l, r): return Add(d(l, x), d(r, x))
        case Mul(l, r): return Add(Mul(d(l, x), r), Mul(l, d(r, x)))

e = Add(Mul(Var("x"), Var("x")), Mul(Num(3), Var("x")))
de = simplify(d(e, "x"))
print(de)
print(evaluate(de, {"x": 5}))
```

在 `expr.py` 的定义之后运行，它打印

```text
Add(left=Add(left=Var(name='x'), right=Var(name='x')), right=Num(value=3))
13
```

未经化简的导数是 $(1\cdot x + x\cdot 1) + (0 \cdot x + 3 \cdot 1)$；`simplify` 消去那些 $1$ 与零因子，得到 $(x + x) + 3$，在 $x = 5$ 处为 $13$。`d` 恰有 `evaluate` 的模板：每种结点一个分支，对子表达式递归。证明 `d` 正确——即它的结果作为 $x$ 的函数求值出原表达式的导数——是一次使用微积分和法则与积法则的结构归纳。
:::
:::
