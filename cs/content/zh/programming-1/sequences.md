到目前为止，每个变量都只保存一个值：一个数、一个字符串或一个布尔值。真实数据很少一个一个值地到来：一个班级有一份成绩列表；一个句子是一串词；一次测量是一系列读数；电子表格的一行是一排字段。要计算平均值、找出最长的词或对读数排序，我们需要能够*包含*其他值、且其中有序的值，还需要访问它们的运算。

Python 组织有序集合的主要工具是**列表**、**元组**和**字符串**。三者都是**序列**：其中的元素从 $0$ 开始编号，可以用索引或切片选取。它们在一个本质方面不同：列表创建之后还可以修改——增加、删除、替换元素——而元组和字符串不能。这个差别就是**可变性**，它也带来了本章最重要的新概念：两个名字可以引用*同一个*列表，因此通过一个名字做出的修改，通过另一个名字也看得到。精确理解这种**别名（aliasing）**现象，正是偶尔被自己的代码弄糊涂的程序员与不被弄糊涂的程序员之间的分水岭。

## 列表、索引与切片

**列表**写在方括号内，由逗号分隔的一串值构成：`[62, 48, 91, 75]`、`["eggs", "milk"]`、`[]`（空列表）。元素可以是任意类型，列表本身也可以作为元素。`len(xs)` 返回元素个数。

::: definition 索引 {#def-index}
长度为 $n$ 的序列 `xs` 的各元素具有**索引** $0, 1, \dots, n - 1$，`xs[i]` 是索引 $i$ 处的元素。负索引从末尾向前计数：当 $1 \le k \le n$ 时 `xs[-k]` 表示 `xs[n - k]`，因此 `xs[-1]` 是最后一个元素。其他任何索引都会抛出 `IndexError`。
:::

索引从 $0$ 开始，是因为索引度量的是元素*离开头的距离*：第一个元素离开头 $0$ 步。这一约定为 C、Java、JavaScript 和多数现代语言所共有，与半开区间配合得非常自然：长度为 $n$ 的列表的索引恰好就是 `range(n)`。

::: definition 切片 {#def-slice}
**切片** `xs[i:j]` 是一个新序列，由 `xs` 中满足 $i \le k < j$ 的索引 $k$ 处的元素组成（半开区间，与 `range` 相同）。省略 `i` 表示从头开始，省略 `j` 表示到末尾为止；负值从末尾计数；超出两端的值会被截断到端点，所以切片从不抛出 `IndexError`。扩展切片 `xs[i:j:s]` 从 $i$ 开始每隔 $s$ 个元素取一个；当 $s < 0$ 时反向进行，而 `xs[::-1]` 就是逆序的序列。
:::

::: example 索引与切片 {#ex-slicing}
设 `xs = [10, 20, 30, 40, 50]`。求值 `xs[0]`、`xs[-2]`、`xs[1:3]`、`xs[:2]`、`xs[2:]`、`xs[-3:]`、`xs[::2]`、`xs[::-1]`、`xs[1:100]`、`xs[3:1]` 和 `xs[5]`。
::: solution
| 表达式 | 值 | 原因 |
|---|---|---|
| `xs[0]` | `10` | 第一个元素 |
| `xs[-2]` | `40` | `xs[5 - 2]` |
| `xs[1:3]` | `[20, 30]` | 索引 $1$ 和 $2$；不含 $3$ |
| `xs[:2]` | `[10, 20]` | 前两个元素 |
| `xs[2:]` | `[30, 40, 50]` | 索引 $2$ 起的一切 |
| `xs[-3:]` | `[30, 40, 50]` | 最后三个 |
| `xs[::2]` | `[10, 30, 50]` | 索引 0、2、4 |
| `xs[::-1]` | `[50, 40, 30, 20, 10]` | 逆序 |
| `xs[1:100]` | `[20, 30, 40, 50]` | 末尾被截断到 $5$ |
| `xs[3:1]` | `[]` | 不存在满足 $3 \le k < 1$ 的 $k$ |
| `xs[5]` | `IndexError: list index out of range` | 索引最大到 $4$ |

有两个恒等式值得记住：对任意 `k` 都有 `xs[:k] + xs[k:] == xs`（两半拼接，无缝也无重叠）；以及当 $0 \le i \le j \le n$ 时 `len(xs[i:j]) == j - i`。
:::
:::

### 修改列表

列表是**可变的**：可以原地修改。对索引赋值会替换元素；**方法**——用点号在列表上调用的函数——用于增加和删除元素：

```python
shopping = ["eggs", "milk"]
shopping.append("bread")          # 在末尾添加
shopping.insert(0, "tea")         # 在位置 0 添加
shopping[2] = "oat milk"          # 替换一个元素
last = shopping.pop()             # 删除并返回最后一个元素
print(shopping, last)
shopping.extend(["rice", "beans"])
shopping.remove("eggs")           # 删除第一个等于该值的元素
print(shopping, len(shopping))
```

```console
$ python3 mutate.py
['tea', 'eggs', 'oat milk'] bread
['tea', 'oat milk', 'rice', 'beans'] 4
```

其他常用运算还有 `xs.pop(i)`（删除并返回索引 `i` 处的元素）、`x in xs`（成员测试）、`xs.index(x)`（`x` 第一次出现的索引）、`xs.count(x)`、`xs.reverse()`，以及内建函数 `sum`、`min` 和 `max`。两种排序方式展示了 Python 中的一个普遍规律：

```python
marks = [62, 48, 91, 75]
ordered = sorted(marks)     # 新的已排序列表；marks 不变
print(ordered, marks)
result = marks.sort()       # 就地对 marks 排序，并返回 None
print(result, marks)
```

```console
$ python3 sortdemo.py
[48, 62, 75, 91] [62, 48, 91, 75]
None [48, 62, 75, 91]
```

一个方法若原地修改对象，通常返回 `None`，以免把它误认为返回新对象的方法。因此 `xs = xs.sort()` 是一个缺陷：它先排序列表，再把 `xs` 重新绑定到 `None`。

## 可变性与别名

现在，[[programming-1/values-types#def-variable]] 中变量是名字标签的图像变得至关重要起来。列表是内存中的一个**对象**；变量是绑定到该对象的名字。赋值从不复制对象——它只是再绑定一个名字到它上面。

::: definition 标识、别名与复制 {#def-alias}
每个对象都有一个在其存续期间永不改变的**标识**。当 `x` 和 `y` 引用同一个对象时 `x is y` 为 `True`，而 `x == y` 比较的是值。引用同一个可变对象的两个名字互为**别名**：通过任一名字对对象做出的修改，从两个名字都看得到。**副本**是一个元素相同的新对象：`xs[:]`、`list(xs)` 和 `xs.copy()` 都会创建一个。
:::

```python
a = [1, 2, 3]
b = a              # b 和 a 是同一个列表的两个名字
c = a[:]           # c 是一个新列表，元素相同（一份副本）
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
caption: `b = a` 和 `c = a[:]` 之后的名字与对象。两个名字指向列表 #1，所以 `a.append(4)` 会同时改变 `a` 和 `b` 显示的内容；`c` 指向另一个对象，即副本。别名正是这个从名字到对象的映射不满足单射的结果。对不可变的值（数、字符串、元组）来说，共享是无害的，因为没有东西能改变被共享的对象。
:::

别名不是缺陷：它是 Python 传递参数的方式。由 [[programming-1/functions#def-call]]，形参绑定到实参*值*，对列表来说就是列表对象本身。因此一个函数能够修改调用者看得见的列表——而调用者最好知道函数是否会这样做。

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

两种风格都是正当的；重要的是文档字符串说明函数用的是哪一种。注意它与 [[programming-1/functions]] 的区别：在那里我们看到函数无法重新绑定调用者的变量：`add_bonus` 并不重新绑定 `scores`——它修改的是 `scores` 所引用的对象。**重新绑定一个名字**和**修改一个对象**是不同的运算，只有后者能通过其他名字被看到。

::: example 一个在三处同时变化的网格 {#ex-grid}
一个程序员构造一个 $3 \times 3$ 的零网格，然后把左上角的元素设为 $9$。解释这个程序前半部分的输出，以及后半部分为什么修复了它。

```python
grid = [[0] * 3] * 3            # 三个引用指向同一个行对象
grid[0][0] = 9
print(grid)

grid = [[0] * 3 for _ in range(3)]   # 三个独立的行
grid[0][0] = 9
print(grid)
```
::: solution
```console
$ python3 grid.py
[[9, 0, 0], [9, 0, 0], [9, 0, 0]]
[[9, 0, 0], [0, 0, 0], [0, 0, 0]]
```

`[0] * 3` 构造出一行 `[0, 0, 0]`。把列表 `[row]` 乘以 $3$ 得到的列表里装着*同一个行对象*三次——重复复制的是引用，不是对象。所以 `grid[0]`、`grid[1]` 和 `grid[2]` 互为别名，修改 `grid[0][0]` 就等于改变了“三行”。后半部分的列表推导式为三行中的每一行都重新求值 `[0] * 3`，创建三个不同的行对象。（`[0] * 3` 本身是安全的，因为它的元素是整数，而整数不可变。）
:::
:::

::: warning `b = a` 不会复制
关于列表最常见的意外，就是误以为赋值会复制。`b = a` 创建的是别名；要复制请用 `b = a[:]` 或 `b = list(a)`。还应注意这些复制都是**浅拷贝**：它们只复制外层列表，而不复制其中的对象，所以列表的列表的副本仍共享内层列表。当你需要嵌套数据的一份完全独立的副本时，请显式地构造它（如网格的推导式那样），或使用标准库的 `copy.deepcopy`。
:::

::: quiz
执行这些行之后，`print(x, y)` 输出什么？

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
`y = x` 之后两个名字互为别名。但 `y + [3]` 构造了一个*新*列表 `[1, 2, 3]`，赋值把 `y` 重新绑定到它；`x` 仍引用原来的 `[1, 2]`。随后的 `append` 修改的是新列表。（相比之下，对列表做 `y += [3]` 会像 `extend` 一样原地修改，*因而也会*改变 `x`——这是 `a += b` 与 `a = a + b` 不同的少数几处之一。）
:::
:::

## 遍历列表

`for` 循环可以遍历任何序列的元素。不需要索引时就直接使用元素——`for m in marks:`，而不是配合 `marks[i]` 的 `for i in range(len(marks)):`。当确实同时需要索引时，`enumerate` 两者都给；要同步遍历两个序列，用 `zip`：

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

（`{name:6}` 把名字补足到宽度 $6$。）当算法需要位置信息时，基于索引的循环仍是合适的工具，例如我们通过交换两端原地逆转列表的时候。

::: algorithm 原地逆转 {#alg-reverse}
**输入：**长度为 $n$ 的列表 $xs$。**效果：**原地逆转 $xs$。

1. 令 $i \gets 0$，$j \gets n - 1$。
2. 当 $i < j$：交换 $xs[i]$ 与 $xs[j]$；令 $i \gets i + 1$，$j \gets j - 1$。
:::

```python
def reverse_in_place(xs):
    """Reverse the list xs in place; return None."""
    i, j = 0, len(xs) - 1
    while i < j:
        # 不变式：xs[:i] 与 xs[j+1:] 已经各就其位
        xs[i], xs[j] = xs[j], xs[i]
        i += 1
        j -= 1

data = [3, 1, 4, 1, 5, 9, 2]
reverse_in_place(data)
print(data)
```

输出 `[2, 9, 5, 1, 4, 1, 3]`；空列表保持不变（循环一次都不执行）。

::: theorem 原地逆转的正确性 {#thm-reverse}
[[#alg-reverse]] 在 $\lfloor n/2 \rfloor$ 次交换后终止，使得对所有 $0 \le k < n$ 都有 $xs[k] = a_{n-1-k}$，其中 $a_0, \dots, a_{n-1}$ 是原来的元素。
:::

::: proof
**不变式：** $i + j = n - 1$，并且对所有 $k < i$ 和所有 $k > j$ 有 $xs[k] = a_{n-1-k}$，而对 $i \le k \le j$ 有 $xs[k] = a_k$（中间部分未被触动）。初始时 $i = 0$，$j = n-1$，不存在 $k < 0$ 或 $k > n - 1$，且每个元素都未被触动。在满足 $i < j$ 的一次迭代中，交换把 $a_j = a_{n-1-i}$ 放到位置 $i$，把 $a_i = a_{n-1-j}$ 放到位置 $j$，它们都已是最终值；随后 $i$ 增大、$j$ 减小 $1$，保持 $i + j = n - 1$，并把位置 $i$ 和 $j$ 移出未触动区。

**终止性：** $j - i$ 每次迭代减少 $2$，所以循环在 $j - i \le 0$ 时停止，共执行 $\lceil (n - 1)/2\rceil = \lfloor n/2\rfloor$ 次迭代。

**结果：** 结束时 $i \ge j$ 且 $i + j = n - 1$。每个 $k$ 或者 $< i$，或者 $> j$，或者（当 $n$ 为奇数时）是唯一的中间下标 $k = i = j = (n-1)/2$，此时 $a_k = a_{n-1-k}$。所以每个位置上都放着 $a_{n-1-k}$。
:::

## 列表推导式

对列表的每个元素做变换，或者只保留其中一部分，实在太常见了，以致 Python 为此设计了专门的记法，其蓝本是 $\set{x^2 : x \in S,\ x \text{ 为奇数}}$ 这样的数学集合记法。

::: definition 列表推导式 {#def-comprehension}
**列表推导式** `[expr for x in iterable if condition]` 的值是一个列表，其中按顺序装着 `expr` 的值：对可迭代对象中使条件为真的每个条目 `x`，各取一个。`if` 部分可以省略；还可以接连写多个 `for`（和 `if`）子句，从左到右读作嵌套的循环。
:::

于是 `[x * x for x in range(1, 20, 2)]` 是 `[1, 9, 25, 49, 81, 121, 169, 225, 289, 361]`，即小于 $20$ 的奇数的平方；`[w for w in words if len(w) > 3]` 保留较长的词；而 `[(x, y) for x in range(3) for y in range(x)]` 是 `[(1, 0), (2, 0), (2, 1)]`。一个推导式等价于往空列表里做 append 的循环，但它用一行说清了正在构造的是哪个列表。把方括号换成圆括号——`(x * x for x in xs)`——就得到**生成器表达式**，它不构造列表，而是一次产出一个值；它是 `sum`、`max` 和 `"".join` 这类函数的自然实参。

推导式要保持简单。当一个推导式需要嵌套条件或两个以上的 `for` 子句时，普通循环更清楚。

## 元组

**元组**是不可变序列，用逗号书写，通常带圆括号：`(3, 4)`、`("Ada", 1815)`，单元素元组写作 `(7,)`，空元组写作 `()`。它支持索引、切片、`len`、`in` 和迭代，但不支持对元素赋值（`t[0] = 5` 会抛出 `TypeError: 'tuple' object does not support item assignment`）。

元组用于位置具有含义的固定值的组合——一个坐标对、一个日期、表中一行；列表则用于长度可变、彼此同类的事物。你从 [[programming-1/computation-and-programs]] 起就在不知不觉地使用元组：`a, b = b, a % b` 构造元组 `(b, a % b)` 并把它**解包**成 `a` 和 `b`。函数返回多个结果也是同样的方式：`return min(xs), max(xs)` 返回一个元组，`lo, hi = min_max(xs)` 把它解包。因为元组不可变，它们可以用在值不得改变的地方，例如 [[programming-1/dictionaries-sets]] 中作为字典的键。

## 字符串

字符串是字符的不可变序列，所以关于索引和切片的一切同样适用：设 `s = "programming"`，则 `s[0]` 是 `'p'`，`s[3:7]` 是 `'gram'`，`s[-3:]` 是 `'ing'`，`s[::-1]` 是 `'gnimmargorp'`。不可变意味着字符串方法从不改变字符串——它们返回新串——而对 `s[0]` 赋值会抛出 `TypeError`。

Python 的字符串是 **Unicode**（统一码）字符的序列，所以 `"naïve"` 的长度是 $5$，而 `"ß".upper()` 是 `'SS'`。`ord(c)` 给出字符的 Unicode 码位（`ord("A")` 是 `65`），`chr(n)` 给出码位 $n$ 对应的字符（`chr(97)` 是 `'a'`）。字符如何以字节存储（UTF-8 编码）在读文件时很重要，将在 [[programming-1/files-exceptions]] 中讨论。

处理文本最有用的字符串方法有

| 方法 | 示例 | 结果 |
|---|---|---|
| `s.split()` | `"  a  b c ".split()` | `['a', 'b', 'c']`（按连续空白切分） |
| `s.split(sep)` | `"a,b,,c".split(",")` | `['a', 'b', '', 'c']` |
| `sep.join(xs)` | `"-".join(["2026", "10", "27"])` | `'2026-10-27'` |
| `s.strip()` | `"  hi \n".strip()` | `'hi'` |
| `s.lower()`, `s.upper()` | `"Ada".lower()` | `'ada'` |
| `s.replace(a, b)` | `"a-b-c".replace("-", "+")` | `'a+b+c'` |
| `s.find(t)` | `"programming".find("gram")` | `3`（不存在时为 `-1`） |
| `s.startswith(t)`, `s.endswith(t)` | `"report.pdf".endswith(".pdf")` | `True` |
| `t in s` | `"gram" in "programming"` | `True`（子串测试） |

::: example 解析一条记录 {#ex-record}
数据文件的一行是 `"Lovelace, Ada ,1815, London"`。把它切分成字段，去掉多余的空格，再用这些字段输出一个句子，其中年份作为整数。
::: solution
```python
record = "Lovelace, Ada ,1815, London"
fields = [f.strip() for f in record.split(",")]
surname, forename, year, city = fields      # 解包四个字符串组成的列表
born = int(year)
print(f"{forename} {surname} was born in {city} in {born}.")
print(fields)
```

```console
$ python3 record.py
Ada Lovelace was born in London in 1815.
['Lovelace', 'Ada', '1815', 'London']
```

`split(",")` 在每个逗号处切开字符串，得到 `['Lovelace', ' Ada ', '1815', ' London']`；推导式去掉每个字段两端的空格。若该行的字段数不同，把列表解包成四个名字会抛出 `ValueError`——这正是有用的地方：格式不对的数据立即被发现，而不是被悄悄弄错。真正的逗号分隔文件允许带引号的字段中含有逗号，所以处理它们时应使用标准模块 `csv`，而不是 `split`。
:::
:::

::: example 句子中的单词 {#ex-words}
把 `"  The quick brown fox jumps over the lazy dog  "` 切分成单词；求出词数、各词长度以及最长的词；再输出把每个单词首字母大写的句子。
::: solution
```python
line = "  The quick brown fox jumps over the lazy dog  "
words = line.split()                       # 按连续空白切分
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

`max(words, key=len)` 按长度比较单词，返回*第一个*最长的 `'quick'`，尽管 `'brown'` 和 `'jumps'` 和它一样长。用 `" ".join(...)` 而不是重复的 `+` 来拼接输出，不仅更清楚，对长文本也快得多，原因下一节解释。
:::
:::

## 操作的代价

列表在内存中存储为一段连续的槽位，每个槽位持有指向一个元素的引用，末尾留有一些备用槽位。这种布局使某些运算很快、另一些很慢，程序员应当知道是哪些。以下 $n$ 表示列表的长度；“常数时间”指代价不随 $n$ 增长。

- `xs[i]`、`xs[i] = v`、`len(xs)`：常数时间——槽位 $i$ 的地址可直接算出。
- `xs.append(v)`、`xs.pop()`：平均情形为**摊还**常数时间。当备用槽位用完时，CPython 分配一块更大的空间（约为原来的 $1.125$ 倍），并把引用复制过去；偶尔一次的复制由两次复制之间大量廉价的 append 分摊。
- `xs.insert(0, v)`、`xs.pop(0)`：时间正比于 $n$，因为该位置之后的每个元素都要移动一格。
- `v in xs`、`xs.index(v)`、`xs.remove(v)`：最多 $n$ 次比较，因为必须从头搜索列表。
- `xs[i:j]`、`xs + ys`、`xs[:]`：时间正比于结果的长度，因为要构造新列表。

这些代价在循环里会累积。每次在头部插入来构造 $n$ 个元素的列表，总共要移动 $0 + 1 + \dots + (n-1) = n(n-1)/2$ 个元素，而在尾部追加一个都不用移动：

::: widget plot
f: x*(x - 1)/2; x
x: 0, 1000
y: 0, 500000
labels: \text{头部插入：共移动 } n(n-1)/2 \text{ 次}; \text{尾部追加：} n \text{ 次操作}
caption: 逐个构造 $n$ 个元素的列表所需的全部工作量：`insert(0, v)` 按移动的元素数计算，`append(v)` 按运算次数计算。二次曲线把线性曲线远远甩在身后：$n = 1000$ 时头部插入要移动 $499{,}500$ 次。$n$ 加倍，二次代价大约变为四倍——不妨读出 $n = 500$ 和 $n = 1000$ 处试试。
:::

作为一个观测结果（CPython 3.14 在 2026 年一台台式电脑上的一次运行；你的时间会不同）：构造 $10{,}000$、$20{,}000$ 和 $40{,}000$ 个元素的列表，在头部插入用时 $0.016$、$0.059$ 和 $0.315$ 秒，而尾部追加只用了 $0.0004$、$0.0008$ 和 $0.0014$ 秒。第一组时间随 $n$ 的每次加倍大约变为四倍，第二组大约加倍，与模型预测一致。

字符串不可变，所以 `s = s + "x"` 一般必须构造一个新字符串并把旧的复制进去；用 `+` 增长字符串的循环同样可能花费二次时间。（CPython 有时会把复制优化掉，但不应依赖这一点。）惯用做法是把片段收集到列表里，再一次性连接：`"".join(pieces)` 的时间正比于总长度。

::: warning 在遍历列表的同时修改它
在对该列表的 `for` 循环内部删除元素会跳过元素：`xs.remove(x)` 之后，其后的每个元素都向左移动一格，但循环的隐藏索引照常前进，于是滑进当前位置的元素永远得不到检查。例如，用这种方法删除 `[2, 4, 5, 6]` 中的每个偶数，剩下的是 `[4, 5]`。应当改为构造新列表——`xs = [x for x in xs if x % 2 != 0]`——或者遍历一个副本，`for x in xs[:]:`。
:::

::: history
把列表作为基本数据类型，可以追溯到艾伦·纽厄尔（Allen Newell）、克里夫·肖（Cliff Shaw）和赫伯特·西蒙（Herbert Simon）的信息处理语言（Information Processing Language，1956），以及约翰·麦卡锡（John McCarthy）的 LISP（1958–1960），其名字就是“列表处理”（list processing）的缩写。数组——按整数索引的定长序列——则内置于 FORTRAN（1957），它从 $1$ 开始编号。艾兹格·迪杰斯特拉（Edsger Dijkstra）的笔记《为什么编号应当从零开始》（“Why numbering should start at zero”，EWD 831，1982）给出了本章使用的半开区间与零基索引的论证。Python 的列表推导式在 Python 2.0（2000）中加入，借鉴自函数式语言 SETL 和 Haskell。统一码（Unicode）是表示世界各种书写系统字符的标准，1991 年发布第一版；Python 3（2008）让每个字符串都是 Unicode 字符串。
:::

## 后续内容

序列给出了第一个带代价模型的数据结构，后续各章将在它之上继续：[[programming-1/dictionaries-sets]] 引入按键查找元素而无需搜索的集合；[[programming-1/files-exceptions]] 从文件读取由行组成的序列。上面列出的代价——常数时间索引、摊还的 append、线性搜索——将在 [[data-structures]] 中认真分析，其中动态数组、链表及其取舍是第一个主题；而在这里只是一句 `sorted` 调用的列表排序，将成为 [[algorithms]] 的中心问题之一。

::: summary
- 列表、元组和字符串是**序列**：从 $0$ 开始索引，负索引从末尾计数，半开切片 `xs[i:j]` 从不抛出 `IndexError`（[[#def-index]]、[[#def-slice]]）。
- 列表是**可变的**（`append`、`insert`、`pop`、`remove`、元素赋值、`sort`）；元组和字符串是**不可变的**，它们的运算返回新对象。
- 赋值把名字绑定到对象，从不复制。同一个可变对象的两个名字互为**别名**（[[#def-alias]]）；用 `xs[:]` 或 `list(xs)` 复制，并记住这样的复制是浅拷贝。函数收到的是调用者的对象，所以函数可以修改它们。
- 用 `for x in xs`、`enumerate` 和 `zip` 遍历；**列表推导式**通过变换和过滤构造列表（[[#def-comprehension]]）。
- 元组把值组成固定的组合，使多重赋值和多重返回值成为可能。
- 字符串方法 `split`、`join`、`strip`、`replace`、`find` 和 `lower` 足以应付大部分文本处理；长字符串用 `join` 构造。
- 索引和 `append` 花费（摊还的）常数时间；`insert(0, …)`、`in` 和 `remove` 花费正比于长度的时间。
:::

## 习题

::: exercise 字符串的切片 {level=1 check="6"}
设 `s = "programming"`。写出 `s[3:7]`、`s[-3:]`、`s[::2]` 和 `s[::-1]`。（输入 `s[::2]` 的长度。）
::: solution
`s[3:7]` 是 `'gram'`（索引 $3$ 到 $6$），`s[-3:]` 是 `'ing'`，`s[::2]` 取索引 $0, 2, 4, 6, 8, 10$，得到 `'pormig'`，`s[::-1]` 是 `'gnimmargorp'`。字符串有 $11$ 个字符，从索引 $0$ 起每隔一个取一个，得 $\lceil 11/2\rceil = 6$ 个字符。
:::
:::

::: exercise 谁看得到修改？{level=1}
预测输出，然后用名字与对象解释它。

```python
p = [1, 2, 3]
q = p
r = list(p)
q[0] = 99
r.append(4)
print(p, q, r)
```
::: solution
输出 `[99, 2, 3] [99, 2, 3] [1, 2, 3, 4]`。`q = p` 使 `q` 成为 `p` 所引用的那个列表的别名，所以通过 `q` 的元素赋值改变了这一个共享的列表。`list(p)` 构造一个元素相同的新列表，所以 `r` 是独立的：对它 append 既不影响 `p` 也不影响 `q`。
:::
:::

::: exercise 一个推导式 {level=1 check="1330"}
写出 $1$ 到 $19$ 之间奇数的平方的列表推导式，并用 `sum` 求和。（输入这个和。）
::: solution
`[x * x for x in range(1, 20, 2)]` 是 `[1, 9, 25, 49, 81, 121, 169, 225, 289, 361]`，而 `sum(x * x for x in range(1, 20, 2))` 是 $1330$。作为校验：前 $m$ 个奇数的平方和为 $m(2m-1)(2m+1)/3$，$m = 10$ 时为 $10 \cdot 19 \cdot 21/3 = 1330$。
:::
:::

::: exercise 用切片做循环移位 {level=2}
编写函数 `rotate(xs, k)`，返回一个新列表，其中 `xs` 的元素循环左移 $k$ 格，`k` 可为任意整数（负数表示右移）。例如 `rotate([1, 2, 3, 4, 5], 2)` 是 `[3, 4, 5, 1, 2]`。证明你返回的列表中索引 $i$ 处的元素是 `xs[(i + k) % n]`。
::: solution
```python
def rotate(xs, k):
    """Rotate xs left by k places (right if k < 0); return a new list."""
    if not xs:
        return []
    k = k % len(xs)          # 此时 0 <= k < n，且移位结果不变
    return xs[k:] + xs[:k]

print(rotate([1, 2, 3, 4, 5], 2), rotate([1, 2, 3, 4, 5], -1), rotate([1, 2, 3], 7))
```

输出 `[3, 4, 5, 1, 2] [5, 1, 2, 3, 4] [2, 3, 1]`。**证明。** 设 $n = $ `len(xs)` $\ge 1$，$k' = k \bmod n$，由 [[programming-1/values-types#thm-division]] 有 $0 \le k' < n$，且 $(i + k) \bmod n = (i + k') \bmod n$。结果是 `xs[k':]`（长度 $n - k'$）后接 `xs[:k']`。当 $0 \le i < n - k'$ 时，其索引 $i$ 处的元素是 `xs[i + k']`，且 $i + k' < n$，故 $i + k' = (i + k') \bmod n$。当 $n - k' \le i < n$ 时，其索引 $i$ 处的元素是 `xs[i - (n - k')]` $=$ `xs[i + k' - n]`，且 $0 \le i + k' - n < n$，所以它仍是 `xs[(i + k') % n]`。
:::
:::

::: exercise 再看网格 {level=2}
解释为什么 `[[0] * 3] * 3` 创建的行互为别名，而 `[[0] * 3 for _ in range(3)]` 不会。`[[0] * 3, [0] * 3, [0] * 3]` 安全吗？
::: solution
`[[0] * 3] * 3` 把内层表达式 `[0] * 3` 只求值*一次*，产生一个行对象，然后重复把对该对象的三个引用放进外层列表。推导式则每次迭代求值一次 `[0] * 3`，产生三个不同的行对象。显式列表 `[[0] * 3, [0] * 3, [0] * 3]` 同样把内层表达式求值三次，因此创建三个不同的行，是安全的。规则：列表显示式或推导式的每次求值都创建一个新列表；`*` 重复和赋值从不创建。
:::
:::

::: exercise 移动次数 {level=2 check="499500"}
一个程序从空列表出发，调用 $1000$ 次 `xs.insert(0, v)`，构造一个含 $1000$ 个元素的列表。每次插入都把已存在的每个元素向右移动一格。总共发生多少次移动？（输入这个数。）
::: solution
第 $k$ 次插入（$k = 1, \dots, 1000$）面对 $k - 1$ 个已存在的元素，把它们全部移动，所以总数是 $0 + 1 + \dots + 999 = \dfrac{999 \cdot 1000}{2} = 499{,}500$。改用 append 则一个也不用移动。若元素最终必须以相反次序排列，可以先全部追加，最后调用一次 `reverse()`，其时间正比于 $n$。
:::
:::

::: exercise 归并已排序列表 {level=3}
编写函数 `merge(xs, ys)`，输入两个按非递减顺序排好的列表，返回一个包含它们全部元素的单一已排序列表，最多使用 `len(xs) + len(ys)` 次比较，且不得调用 `sort` 或 `sorted`。用循环不变式证明它正确。
::: solution
```python
def merge(xs, ys):
    """Merge two sorted lists into one sorted list."""
    out = []
    i = j = 0
    while i < len(xs) and j < len(ys):
        # 不变式：out 已排序，包含 xs[:i] 与 ys[:j]，且 out 的每个元素
        # 都 <= xs[i:] 与 ys[j:] 的每个元素
        if xs[i] <= ys[j]:
            out.append(xs[i])
            i += 1
        else:
            out.append(ys[j])
            j += 1
    out.extend(xs[i:])      # 这两行最多一个非空
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

**不变式**（如注释中所述）。初始时 `out` 为空且 $i = j = 0$，不变式平凡成立。设不变式成立且两个列表都还有元素，不妨设 `xs[i] <= ys[j]`。因为 `xs` 已排序，`xs[i]` 是 `xs[i:]` 的最小元素，它不超过 `ys[j]`，即 `ys[j:]` 的最小元素；所以 `xs[i]` 不超过每一个剩余元素。把它 append 进去后 `out` 仍然有序（由不变式，`out` 的每个元素都 $\le$ `xs[i]`），且第三个子句保持成立。另一种情形对称。

**终止性：** $i + j$ 每次迭代增加一，且不超过 `len(xs) + len(ys)`，而每次迭代恰做一次比较，所以比较次数不超过这个数。**结果：** 循环结束时一个列表已耗尽；另一个列表的剩余元素已排序，且由不变式不小于 `out` 的每个元素，所以把它们 extend 进去，得到一个每个元素恰好出现一次的已排序列表。归并是 [[algorithms]] 中归并排序的核心。
:::
:::

::: exercise 游程编码 {level=3}
编写函数 `run_length(s)`，返回 `s` 中极大等字符游程的 `(character, count)` 对列表，使得 `run_length("aaabcc")` 是 `[('a', 3), ('b', 1), ('c', 2)]`，并用它写出 `encode(s)`，对 `"WWWWWWBBBWWWW"` 给出 `'6W3B4W'`。你的函数对空字符串返回什么？
::: solution
```python
def run_length(s):
    """Run-length encoding: 'aaabcc' -> [('a', 3), ('b', 1), ('c', 2)]."""
    runs = []
    for ch in s:
        if runs and runs[-1][0] == ch:
            runs[-1] = (ch, runs[-1][1] + 1)    # 元组不可变：整个替换掉
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

条件 `runs and runs[-1][0] == ch` 依赖短路求值：对第一个字符，`runs` 为空（假值），`runs[-1]` 根本不会被求值，否则会抛出 `IndexError`。游程的计数无法原地加一，因为元组不可变，所以最后一对要换成一个新的。空字符串返回 `[]`，编码为空串 `''`（输出行以两个值之间打印的那个空格结尾）。循环的不变式是：`runs` 是迄今处理过的字符的游程编码。
:::
:::
