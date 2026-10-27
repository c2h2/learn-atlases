列表能立刻回答“第 5 个元素是什么？”这个问题。但对于“Grace 的电话号码是多少？”这类问题，它只能通过搜索来回答——逐个查看每一项，直到找到 Grace——而且列表越长，搜索所需的时间越久。程序设计中的许多问题正是后一种：某个名字对应的号码、某个产品代码对应的价格、某个单词的出现次数、选修某门课程的学生集合、某个电子邮箱地址是否出现过。对这些问题，我们想要的是一种按**键**而不是按位置组织的集合，无论其中装有十个还是千万个元素，查找所花的时间都大致相同。

Python 内建了两个这样的集合。**字典**把键映射到值，如同电话号码簿把姓名映射到号码。**集合**是互异元素的无序集合，如同数学中的集合，能快速回答成员资格问题。二者都由**哈希表**实现，哈希表是计算中最重要的数据结构之一。本章展示如何使用它们——查找、计数、分组与比较数据——概略解释它们为什么快、这对键提出了什么要求，最后就如何为具体任务选择合适的集合给出建议。

## 字典

::: definition 字典 {#def-dict}
**字典**（类型 `dict`）是由**键–值对**组成的可变集合，其中每个键至多出现一次。它写作 `{key_1: value_1, ..., key_n: value_n}`，`{}` 是空字典。对于字典 `d`：

- `d[k]` 是键 `k` 关联的值，若 `k` 不是键则引发 `KeyError`；
- `d[k] = v` 把 `v` 与 `k` 关联起来：若 `k` 是新键则添加该键，否则替换旧值；
- `k in d` 判断 `k` 是否为键，`len(d)` 是键值对的数量，`del d[k]` 删除一个键值对；
- `d.get(k, default)` 在 `k` 是键时给出 `d[k]`，否则给出 `default`（或 `None`）。

键必须是**可哈希的**（实际上即不可变的——数字、字符串、由可哈希值组成的元组）；值可以是任何东西。
:::

从数学上说，字典是从其键集到值的一个有限函数。遍历字典按**插入顺序**访问各个键——即它们最初被添加的先后顺序，这是自 Python 3.7 起语言作出的保证。方法 `d.keys()`、`d.values()` 与 `d.items()` 分别给出所有的键、值和 `(key, value)` 对。

::: example 电话号码簿 {#ex-phone}
追踪这个程序的执行过程，并解释每一行输出。（这些号码属于专为虚构作品保留的号段。）

```python
phone = {"Ada": "01632 960001", "Alan": "01632 960002"}
phone["Grace"] = "01632 960003"        # 添加一个新键
phone["Ada"] = "01632 960999"          # 替换已有键的值
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

前三行执行后，字典中有三个键：`"Grace"` 是新添加的；而对已有键 `"Ada"` 赋值替换的是它的值，并没有添加第二个条目。`in` 检查的是键而不是值。`get` 对缺失的键返回 `None` 或所给的默认值，而不是引发错误。`del` 之后，对 `items()` 的循环按插入顺序访问剩下的两个键值对——`"Ada"` 即使值被替换过，仍保持原来的位置。最后一行用方括号索取一个不存在的键，程序以 `KeyError` 终止：当键*必须*存在时用 `[]`（此时缺键是一个缺陷，你希望立刻得知），而当缺失属于正常情况时用 `get`。
:::
:::

### 计数

字典最常见的用途是为事物**计数**：对每个不同的项，它出现了几次？

::: algorithm 用字典计数 {#alg-count}
**输入：** 一个由可哈希项组成的序列 $x_1, \dots, x_n$。**输出：** 一个字典 $c$，使得对每个不同的项 $x$，$c[x]$ 等于 $x$ 出现的次数。

1. 令 $c \gets$ 空字典。
2. 按顺序对每个项 $x$：令 $c[x] \gets c.\mathrm{get}(x, 0) + 1$。
3. 返回 $c$。
:::

不变式是：在处理完 $x_1, \dots, x_k$ 之后，$c$ 的键恰为其中出现过的不同项，而 $c[x]$ 计数其中 $x$ 出现的次数。表达式 `c.get(x, 0)` 同时处理了两种情况：见过的项计数加一，新的项以计数 $0 + 1$ 进入。

::: example 单词频率 {#ex-wordcount}
统计《双城记》（*A Tale of Two Cities*）开篇中的单词，忽略大小写和逗号，列出出现最多的三个。
::: solution
```python
text = """It was the best of times, it was the worst of times,
it was the age of wisdom, it was the age of foolishness"""

counts = {}
for word in text.lower().replace(",", " ").split():
    counts[word] = counts.get(word, 0) + 1     # 若单词是新的则按 0 计

print(counts)
top = sorted(counts.items(), key=lambda pair: pair[1], reverse=True)
print(top[:3])
```

```console
$ python3 wordcount.py
{'it': 4, 'was': 4, 'the': 4, 'best': 1, 'of': 4, 'times': 2, 'worst': 1, 'age': 2, 'wisdom': 1, 'foolishness': 1}
[('it', 4), ('was', 4), ('the', 4)]
```

字符串先转成小写，逗号替换为空格，`split` 把它切成 $24$ 个单词——三引号字符串跨两行，而换行符算作空白字符。要找出出现最多的单词，我们把 `(word, count)` 对按第二个分量从大到小排序。Python 的排序是**稳定的**：键相等的项保持原有顺序，所以计数为 $4$ 的四个单词按它们最初出现的顺序出现，排在第四的 `'of'` 被切片截去。标准库把这一模式打包为 `collections.Counter`：`Counter(words).most_common(3)` 给出同样的三个对。
:::
:::

### 分组

值本身是列表的字典按某种属性把项**分组**——学生按辅导组、文件按扩展名、单词按首字母。方法 `d.setdefault(k, default)` 在 `k` 是键时返回 `d[k]`，否则先执行 `d[k] = default` 再返回；它能把分组写成一行代码。

::: example 变位词类 {#ex-anagrams}
把单词 `listen`、`silent`、`enlist`、`google`、`banana`、`inlets`、`gogole` 和 `tinsel` 分入各个**变位词**类（字母相同而次序不同的单词）。
::: solution
两个单词互为变位词，当且仅当把它们各自的字母排序后结果相同，因此排序后的字母是一个好键。

```python
words = ["listen", "silent", "enlist", "google", "banana", "inlets", "gogole", "tinsel"]

groups = {}
for w in words:
    key = "".join(sorted(w))            # 变位词排序后的字母相同
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

`sorted(w)` 把 `w` 的字母以有序列表形式返回，例如 `['e', 'i', 'l', 'n', 's', 't']`；`"".join` 把它变回字符串，而字符串（不像列表）可以作为字典的键。用这种方法找出所有变位词类，每个单词只需处理一次；若改为逐对比较单词，这里需要 $\binom{8}{2} = 28$ 次比较，$n$ 个单词则大约需要 $n^2/2$ 次。
:::
:::

## 字典的工作原理（概略）

字典为什么不必搜索就能找到键？这个思想称为**哈希**：由键本身算出它*应当*存放在哪里。

::: definition 哈希函数与哈希表 {#def-hash}
**哈希函数**把每个键映射为一个整数，称为它的**哈希值**，并保证相等的键必有相等的哈希值。**哈希表**把条目存放在一个含 $m$ 个槽位的数组中，把键为 $k$ 的条目保持在槽位 $\mathit{hash}(k) \bmod m$ 处或其附近。两个不同的键若其哈希值落到同一个槽位，就称为发生**冲突**；表必须解决冲突，例如依次尝试其他一些槽位。
:::

Python 的内置函数 `hash` 可以计算任何可哈希值的哈希值。查找一个键时，字典先计算它的哈希值，直接到达对应的槽位并比较那里找到的键；只有发生冲突时才需要继续往后看。如果哈希函数把键均匀散开，并且表从不被允许装得太满——CPython 在字典的表装到约三分之二满时就会扩容，并重新插入每个条目——那么无论有多少条目，平均只需检查少量、常数个槽位。因此查找、插入和删除都需要**期望常数时间**。采用不同冲突解决策略的完整分析见 [[data-structures]]。

即使哈希函数完美无缺，冲突也无法避免。这就是“生日悖论”：在一个只有 $23$ 人的房间里，至少有两人同一天生日的概率已经超过一半。

::: widget plot
f: 1 - exp(-x*(x - 1)/(2*m))
x: 0, 100
y: 0, 1
sliders: m=365:50:2000:1
hlines: 0.5
vlines: 23
labels: P(\text{共 } n \text{ 个键中存在碰撞})
caption: 把 $n$ 个键独立且均匀随机地放入 $m$ 个槽位后至少包含一次碰撞的概率，使用标准近似 $1 - e^{-n(n-1)/(2m)}$。当 $m = 365$（生日数）时，曲线在 $n = 23$ 附近越过 $\tfrac12$。增大 $m$：碰撞变得可能的键数只按 $\sqrt{m}$ 量级增长，所以任何装有不止几个键的哈希表都必须预料冲突并处理它们。
:::

哈希解释了关于键的规则。键的哈希值决定其条目存放的位置，所以若一个键在插入后能够改变，它的哈希值也会改变，条目就会待在错误的位置，再也找不到。因此 Python 拒绝可变的键：

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

（提示信息的准确措辞来自 Python 3.14。）由不可变值组成的元组是可哈希的，所以坐标、日期等复合键写作元组。

::: warning “字典操作总是常数时间”
常数时间是一种*期望*代价，前提是哈希值散布良好。它不是最坏情况保证：若大量键发生冲突，每次操作都会退化为在冲突的条目之间搜索，其时间与条目数量成正比。病态的冲突甚至可以是人为造成的——2011 年有研究者证明，几种语言的 Web 服务器会被精心构造得互相冲突的请求数据拖得极其缓慢。自 Python 3.3 起，字符串和字节的哈希值会用每个进程独有的秘密密钥**随机化**（自 Python 3.4 起使用 SipHash）以防御这种攻击，这也正是*字符串集合*的打印顺序可能在程序的不同次运行之间改变的原因。字典则始终按插入顺序保存。
:::

::: quiz
下列哪些可以作为字典的键？
- [x] `"user@example.com"`
- [x] `(2026, 10, 27)`
- [ ] `[2026, 10, 27]`
- [x] `3.5`
- [ ] `{"a": 1}`
::: solution
字符串、数字组成的元组和浮点数都是不可变且可哈希的。列表和字典是可变的，因此不可哈希，不能作键（当然，它们可以作*值*）。浮点数允许作键但很少是个好主意，因为两次“本应”给出同一数值的计算可能在最后一个二进制位上不同（[[programming-1/values-types#prop-tenth]]）。
:::
:::

## 集合

::: definition 集合 {#def-set}
**集合**（类型 `set`）是由互异的可哈希项组成的可变、无序集合，写作 `{item_1, ..., item_n}`；空集是 `set()`，因为 `{}` 是空字典。`x in s` 以期望常数时间判断成员资格；`s.add(x)` 插入，`s.remove(x)` 删除（若不存在则引发 `KeyError`），`s.discard(x)` 在存在时删除。对集合 `a` 与 `b`：

| 运算 | 含义 |
|---|---|
| `a \| b` | 并集 $a \cup b$ |
| `a & b` | 交集 $a \cap b$ |
| `a - b` | 差集 $a \setminus b$ |
| `a ^ b` | 对称差：恰属于其中之一 |
| `a <= b` | 子集 $a \subseteq b$ |
:::

集合是一个只有键、没有值的字典，其实现方式也相同。`set(xs)` 构造出由序列中不同元素组成的集合，所以 `len(set(xs))` 统计不同值的个数；像 `{x % 7 for x in range(20)}` 这样的集合推导式与列表推导式用法相同。还有一个不可变、可哈希的变体 `frozenset`，它可以作为另一个集合的元素或字典的键。

::: example 课程选课 {#ex-enrol}
四名学生选修数学，四名学生选修物理。谁两门都选？至少选一门？只选一门？
::: solution
```python
maths = {"Ada", "Alan", "Grace", "John"}
physics = {"Alan", "Emmy", "John", "Marie"}
print(sorted(maths & physics))      # 交集：两门都选
print(sorted(maths | physics))      # 并集：至少选一门
print(sorted(maths - physics))      # 差集：选了数学但没选物理
print(sorted(maths ^ physics))      # 对称差：恰好选一门
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

由于集合没有顺序，而字符串的哈希值是随机化的，直接打印字符串集合会以可能在每次运行时不同的顺序显示元素。`sorted` 把每个集合变成固定顺序的列表，使输出可复现——当测试要比较输出时这一点很重要。计数满足容斥原理：$\lvert M \cup P\rvert = \lvert M\rvert + \lvert P\rvert - \lvert M \cap P\rvert = 4 + 4 - 2 = 6$。
:::
:::

::: widget venn
sets: 2
expr: (M - P) | (P - M)
labels: M; P
caption: 对称差 `maths ^ physics`：恰好选修两门课程之一（$M$ 表示数学，$P$ 表示物理）的学生，写作 $(M \setminus P) \cup (P \setminus M)$。键入其他表达式——`M & P`、`M | P`、`M - P`——即可看到 [[#ex-enrol]] 中的其他运算。Python 的集合运算严格遵循 [Maths Atlas：集合](/learn/maths/lesson.php?c=proofs&l=sets)中的运算律。
:::

快速的成员资格检验改变了哪些算法切实可用。作为一个观测结果（CPython 3.14 的某一次运行，2026 年；时间因机器而异）：对一个含 $100{,}000$ 个数字的列表，对接近末尾的数做 $1000$ 次成员资格检验用了约 $0.6$ 秒，而对同样这些数字组成的集合做同样的检验只用了约 $0.0001$ 秒——快了大约四个数量级，因为列表的每次检验几乎要扫完整个列表。

::: algorithm 和为给定值的一对数 {#alg-twosum}
**输入：** 由数字组成的序列 $x_1, \dots, x_n$ 和目标 $t$。**输出：** 是否存在下标 $i < j$ 使得 $x_i + x_j = t$。

1. 令 $S \gets \emptyset$。
2. 对 $j = 1, \dots, n$：
   1. 若 $t - x_j \in S$，返回真。
   2. 把 $x_j$ 加入 $S$。
3. 返回假。
:::

```python
def has_pair_with_sum(xs, target):
    """True if two elements at different positions of xs add up to target."""
    seen = set()
    for x in xs:
        # 不变式：seen 是 x 之前出现的元素组成的集合，且其中没有两个元素之和等于 target
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

::: theorem 对搜索的正确性 {#thm-twosum}
[[#alg-twosum]] 返回真当且仅当存在 $i < j$ 使 $x_i + x_j = t$。它执行 $n$ 次集合插入和至多 $n$ 次成员资格检验，因此期望时间与 $n$ 成正比。
:::

::: proof
*不变式：* 第 $j$ 次迭代开始时，$S = \set{x_1, \dots, x_{j-1}}$，且不存在满足 $i < i' \le j - 1$ 的 $x_i + x_{i'} = t$。初始时 $S$ 为空，没有数对。第 $j$ 次迭代中，若 $t - x_j \in S$，则存在 $i < j$ 使 $t - x_j = x_i$，于是 $x_i + x_j = t$，返回真是正确的。否则不存在 $i < j$ 使 $x_i = t - x_j$，因此不存在以下标 $j$ 结尾且和为 $t$ 的数对；结合不变式，不存在两个下标都不超过 $j$ 且和为 $t$ 的数对，把 $x_j$ 加入 $S$ 后不变式对 $j + 1$ 恢复。若循环结束，$j = n + 1$ 时的不变式说明没有任何数对的和为 $t$，返回假是正确的。每次迭代做一次检验和至多一次插入。
:::

显然的替代做法——枚举每个 $i < j$——要做 $n(n-1)/2$ 次加法，当 $n = 10^5$ 时约为 $5 \times 10^9$。集合版本以空间（集合最多存放 $n$ 项）换时间，这样的权衡在 [[algorithms]] 中反复出现。注意目标为 $10$ 时 `[5]` 的情形是如何处理的：在 $5$ 被加入*之前*检验 $10 - 5 = 5$，因此元素绝不会与自身配成一对。

## 字典求逆

字典把键映射到值。能否把它反过来，让每个值指回它的键？仅当没有两个键共享同一个值时才行。

::: proposition 字典何时可以求逆 {#prop-invert}
设 $d$ 是以 $K$ 为键集的字典，视作函数 $d \colon K \to V$。存在字典 $e$ 使得对每个 $k \in K$ 都有 $e[d[k]] = k$，当且仅当 $d$ 是**单射**：只要 $k \neq k'$，就有 $d[k] \neq d[k']$。
:::

::: proof
若 $d$ 是单射，通过对每个 $k$ 令 $e[d[k]] = k$ 来定义 $e$；没有值 $d[k]$ 被赋值两次，因为不同的键有不同的值，于是对每个 $k$ 都有 $e[d[k]] = k$。反之，若 $d[k] = d[k'] = v$ 且 $k \neq k'$，则任何满足条件的 $e$ 都必须同时满足 $e[v] = k$ 和 $e[v] = k'$，这是不可能的，因为一个字典的每个键只有一个值。
:::

当 $d$ 不是单射时，自然的替代方案是把每个值映射到拥有它的键所组成的*列表*（或集合）——又是分组：

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

`invert` 的最后一行是一个**字典推导式** `{key_expr: value_expr for ...}`，即列表推导式的字典版本。

::: widget mapping
domain: Rex; Tom; Fido
codomain: dog; cat
map: Rex>dog; Tom>cat; Fido>dog
caption: 用从键到值的箭头图表示字典 `pets`。它不是单射——有两条箭头到达 `dog`——所以由 [[#prop-invert]]，它没有逆字典，只有分组后的逆 `{'dog': ['Fido', 'Rex'], 'cat': ['Tom']}`。把从 `Fido` 出发的箭头拖到 `cat`：映射仍然不是单射。一个字典可逆，当且仅当该图报告它是单射的。
:::

::: quiz
执行 `d = {"a": 1, "b": 2, "c": 1}` 和 `e = {v: k for k, v in d.items()}` 后，`e` 是什么？
- [ ] `{1: "a", 2: "b"}`
- [x] `{1: "c", 2: "b"}`
- [ ] `{1: ["a", "c"], 2: ["b"]}`
- [ ] 因为值不相同，它会引发错误。
::: solution
推导式按插入顺序处理键值对：`e[1] = "a"`，然后 `e[2] = "b"`，然后 `e[1] = "c"`，后者*替换*了先前的值。不会引发错误——信息就这样悄悄丢失了。键 `1` 保持原来的位置，所以 `e` 打印为 `{1: 'c', 2: 'b'}`。这正是 [[#prop-invert]] 的体现：只有单射字典的求逆才是忠实的。
:::
:::

## 选择合适的集合

Python 的四种内建集合能满足大部分需求。选择取决于数据将*如何*被使用。

| 集合 | 按什么定序 | 可变 | 允许重复 | 快速运算 | 典型用途 |
|---|---|---|---|---|---|
| `list` | 位置 | 是 | 是 | 按下标访问、追加 | 同类项组成的序列：读数、任务队列 |
| `tuple` | 位置 | 否 | 是 | 按下标访问 | 固定的记录：坐标、一行数据、复合键 |
| `dict` | 键（插入顺序） | 是 | 键唯一 | 按键查找、插入、删除 | 映射：计数、索引、按 ID 存放的记录 |
| `set` | 无 | 是 | 否 | 成员资格、并、交 | 互异的项、“这个见过吗？” |

实际程序通常把它们组合起来：记录表用字典的列表（`[{"name": "Ada", "born": 1815}, …]`），分组用列表的字典，嵌套配置用字典的字典，走过的网格位置用元组的集合。这正是 JSON 的形状——JSON 是程序间交换数据最常用的格式，Python 用标准模块 `json` 把它读入的正是这些类型。

::: warning 在应当用集合或字典的地方搜索列表
一个对 $n$ 个项逐一执行 `if x in some_list:` 检验的循环，若列表长到 $n$ 个元素，大约要做 $n^2/2$ 次比较。改用集合则只需约 $n$ 次哈希查找。只要程序反复询问“这个存在吗？”或“这个名字下存了什么？”，所用的集合就应该是集合或字典——仅此一改就是实践中最常见的显著加速之一。反过来，用 $0, 1, 2, \dots$ 作键的字典只是一个更慢的列表。
:::

::: history
哈希法在 20 世纪 50 年代初被多人独立发明；Hans Peter Luhn 在 1953 年写了一份 IBM 内部备忘录，描述了用链地址法实现的哈希；几乎同时，Gene Amdahl、Elaine McGraw、Nathaniel Rochester 与 Arthur Samuel 在 IBM 开发了带线性探测的开放定址法。最早的公开发表分析出自 Arnold Dumey（1956 年），W. Wesley Peterson 1957 年的论文则深入研究了开放定址法。关联数组作为语言内建特性先后出现在 SNOBOL4（1967 年）以及后来的 AWK（1977 年）和 Perl（1987 年）中。Python 自 1991 年首个版本起就有字典，并在 2.4 版（2004 年）加入了内建 `set` 类型。紧凑的、按插入顺序排列的字典存储于 CPython 3.6（2016 年）中引入，其顺序性在 Python 3.7（2018 年）成为语言规范的一部分。
:::

## 后续内容

字典和集合使许多程序既短又快；下一章 [[programming-1/files-exceptions]] 用它们分析从文件读入的数据。哈希表究竟如何工作——哈希函数、链地址法与开放定址法、装填因子与扩容，以及操作耗时期望常数的证明——是 [[data-structures]] 的核心主题；按键查找在大规模场景下的应用会重现于 [[databases]]（索引）和 [[information-retrieval]]（倒排索引把每个单词映射到包含它的文档，正是 [[#ex-anagrams]] 的宏大版本）。

::: summary
- **字典**把可哈希的唯一键映射到值（[[#def-dict]]）：`d[k]`（键缺失时引发 `KeyError`）、`d.get(k, default)`、`d[k] = v`、`k in d`、`del d[k]`，以及按插入顺序遍历 `keys`、`values`、`items`。
- 计数（`c[x] = c.get(x, 0) + 1`，或 `collections.Counter`）与分组（`d.setdefault(k, []).append(x)`）是字典的两个日常模式。
- 字典和集合是**哈希表**（[[#def-hash]]）：查找、插入和删除的代价是*期望*常数时间，而不是最坏情况常数时间。键必须可哈希，所以列表不能作键；元组可以。
- **集合**存放互异的项，成员资格判断很快，支持运算 `|`、`&`、`-`、`^`、`<=`（[[#def-set]]）；`set()` 是空集。要得到可复现的输出，就打印排序后的集合。
- 把列表搜索替换成集合查找，能把如对搜索这样的平方级算法变成线性算法（[[#thm-twosum]]）。
- 字典可求逆当且仅当它是单射的（[[#prop-invert]]）；否则按值给键分组。
- 依据数据的用法选择集合：位置（列表、元组）、键（字典）还是成员资格（集合）。
:::

## 习题

::: exercise 预测字典的内容 {level=1 check="3"}
执行完下面的语句后 `d` 是什么？`len(d)` 是多少？（输入长度。）

```python
d = {"x": 1, "y": 2}
d["z"] = 3
d["x"] = d["x"] + d["y"]
del d["y"]
d["w"] = d.get("v", 0)
```
::: solution
第二行后 `d` 是 `{'x': 1, 'y': 2, 'z': 3}`。第三行把 `d["x"]` 置为 $1 + 2 = 3$，其位置保持不变。删除 `"y"` 后剩下 `{'x': 3, 'z': 3}`。`d.get("v", 0)` 是 $0$，因为 `"v"` 不是键，所以最后一行添加了 `"w"`。最终结果是 `{'x': 3, 'z': 3, 'w': 0}`，长度为 $3$。
:::
:::

::: exercise 集合运算 {level=1 check="7"}
设 `a = {n for n in range(1, 11) if n % 2 == 0}`，`b = {n for n in range(1, 11) if n % 3 == 0}`。求 `a | b`、`a & b`、`a - b` 和 `a ^ b`。（输入 `len(a | b)`。）
::: solution
`a = {2, 4, 6, 8, 10}`，`b = {3, 6, 9}`。于是 `a | b = {2, 3, 4, 6, 8, 9, 10}`（七个元素）、`a & b = {6}`、`a - b = {2, 4, 8, 10}`、`a ^ b = {2, 3, 4, 8, 9, 10}`。用容斥原理检验：$5 + 3 - 1 = 7$。
:::
:::

::: exercise 字母计数 {level=1 check="4"}
用 [[#alg-count]]（或 `collections.Counter`）统计 `"mississippi"` 中各字母的出现次数。哪些字母出现最频繁？共有多少个不同的字母？（输入不同字母的个数。）
::: solution
计数为 `i`: 4、`s`: 4、`p`: 2、`m`: 1，所以 `i` 和 `s` 并列最频繁，不同的字母有 $4$ 个（`len(set("mississippi"))` 是 `4`）。`Counter("mississippi")` 把它们显示为 `Counter({'i': 4, 's': 4, 'p': 2, 'm': 1})`。
:::
:::

::: exercise 可哈希吗？ {level=2}
对下面每一项，判断它能否作字典的键；若不能，给出一个携带相同信息的可哈希替代方案：`[3, 4]`、`("Ada", [1815, 1852])`、`{"a", "b"}`、`("Ada", 1815)`、`frozenset({"a", "b"})`。
::: solution
`[3, 4]`：不能（列表）；改用元组 `(3, 4)`。`("Ada", [1815, 1852])`：不能——元组只有当它的所有元素都可哈希时才可哈希，而它含有一个列表；改用 `("Ada", (1815, 1852))`。`{"a", "b"}`：不能（集合是可变的）；改用 `frozenset({"a", "b"})`，它就是最后一项，是可哈希的。`("Ada", 1815)`：能。
:::
:::

::: exercise 生日问题 {level=2 check="23"}
编写一个函数，用 $1 - \prod_{k=0}^{n-1} \frac{365 - k}{365}$ 精确计算 $n$ 个人（生日相互独立且在 $365$ 天中均匀分布）中至少两人同一天生日的概率，并求出使该概率超过 $\tfrac12$ 的最小 $n$。（输入 $n$。）
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

它打印 `23 0.4757 0.5073`。这个乘积（对每个 $k$）是第 $k$ 个人避开已被占用的 $k$ 个生日的概率。把 $365$ 天换成 $m$ 个哈希表槽位后仍用同样的计算，就解释了为什么冲突是家常便饭。
:::
:::

::: exercise 带重复值的求逆 {level=2}
修改 `invert`：当字典不是单射时，引发带有清晰信息的 `ValueError` 而不再分组，否则返回普通的逆。解释你的检验为什么正确。
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

不变式：处理若干键值对后，`inverse` 把见过的每个值映射到它唯一的键。若新的键值对的值已经是 `inverse` 的键，就证明有两个不同的键共享同一个值，由 [[#prop-invert]]，逆不存在；否则加入它使不变式保持。若循环完成，则没有值重复出现，所以 $d$ 是单射的，而 `inverse` 就是它的逆。（`invert_strict(pets)` 引发 `ValueError: keys 'Rex' and 'Fido' share the value 'dog'`。）
:::
:::

::: exercise 3 或 5 的倍数 {level=3 check="466"}
满足 $1 \le n < 1000$ 且能被 $3$ 或 $5$ 整除的整数 $n$ 有多少个？用集合推导式计算，并用容斥原理验证。（输入个数。）
::: solution
`len({n for n in range(1, 1000) if n % 3 == 0 or n % 5 == 0})` 是 $466$。另一种做法：`threes = set(range(3, 1000, 3))` 和 `fives = set(range(5, 1000, 5))` 分别有 $333$ 和 $199$ 个元素，它们的交是 $15$ 的倍数，共有 $\lfloor 999/15\rfloor = 66$ 个，于是 $\lvert \text{threes} \cup \text{fives}\rvert = 333 + 199 - 66 = 466$。
:::
:::

::: exercise 计数数对 {level=3}
把 [[#alg-twosum]] 推广为统计满足 $x_i + x_j = t$ 的数对 $i < j$ 的*个数*，期望时间与 $n$ 成正比。（提示：把集合换成用于计数的字典。）证明你的函数正确，并用 `[1, 5, 7, -1, 5]`、$t = 6$ 测试（答案为 $3$）。
::: solution
```python
def count_pairs_with_sum(xs, target):
    """Number of index pairs i < j with xs[i] + xs[j] == target."""
    seen = {}                 # 值 -> 当前位置之前出现的次数
    pairs = 0
    for x in xs:
        pairs += seen.get(target - x, 0)
        seen[x] = seen.get(x, 0) + 1
    return pairs

print(count_pairs_with_sum([1, 5, 7, -1, 5], 6))   # (1, 5), (1, 5), (7, -1)
```

它打印 `3`。*不变式：* 第 $j$ 次迭代开始时，`seen[v]` 是满足 $i < j$ 且 $x_i = v$ 的 $i$ 的个数，`pairs` 是满足 $i < i' < j$ 且和为 $t$ 的数对个数。第 $j$ 次迭代中，满足 $x_i + x_j = t$ 的数对 $(i, j)$ 恰是那些 $i < j$ 且 $x_i = t - x_j$ 的对，共有 `seen.get(t - x_j, 0)` 个；加上这一计数后再把 $x_j$ 记入 `seen`，不变式对 $j + 1$ 恢复。结束时 `pairs` 统计了所有的数对。每次迭代做两次字典操作，所以期望时间与 $n$ 成正比，而暴力法需要 $n(n-1)/2$ 次检验。
:::
:::
