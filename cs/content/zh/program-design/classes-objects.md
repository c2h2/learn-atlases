[[program-design/abstract-data-types]] 中的有理数是一个能工作的抽象数据类型，但用起来令人不安。语言里没有任何东西把 `make_rat`、`numer`、`add_rat` 与 `str_rat` 彼此联系起来：它们是恰好就二元组达成一致的四个函数。客户可以写 `r[0]` 而不写 `numer(r)`，直到表示改变之前都不会有任何东西对此提出反对。每个运算都需要一个前缀（`intset_insert`、`intset_remove`）来避免与其他类型的运算冲突。而 `make_rat(1, 2) == make_rat(1, 2)` 成立仅仅是二元组表示碰巧使然，`print(r)` 显示出的是原始的数对，`r + s` 拼接的是元组。

**类**一举解决了所有这些问题。它把一种表示和作用于其上的运算捆绑成一个具名的单元，给每个运算一个在该类型内部的短名字，并让这个类型能够按自己的方式参与 Python 自身的语法——`==`、`+`、`<`、`print`、`in`、`for`。本章讲述类与对象在 Python 中如何工作：定义类、构造方法与方法；让一个类表现得像内建类型的特殊方法；封装、property 与不变式；以及一个对象的标识、它的值与它的状态三者之间的区别。

## 类、实例与方法

::: definition 类、实例、属性、方法 {#def-class}
**类**是对象的具名模板；执行一条 `class` 语句会创建一个类对象，并把它绑定到那个名字上。调用这个类，`C(args)`，会创建一个新对象，称为 `C` 的一个**实例**，并运行该类的**构造方法** `__init__(self, args)` 来初始化它。每个实例都有自己的**属性**——绑定到值上的名字，写作 `obj.name` 来访问——用来记录它的状态。**方法**是定义在类体中的函数；以 `obj.m(args)` 的方式调用时，它把实例本身作为第一个形参接收，按惯例命名为 `self`。
:::

下面还是有理数，这次是一个类。表示不变式与抽象函数写进类的 docstring，每个维护者都会看到它们。

```python
from math import gcd

class Rational:
    """An immutable rational number.

    Rep: ints self._n, self._d.
    RI:  self._d > 0 and gcd(self._n, self._d) == 1.
    AF:  the rational number self._n / self._d.
    """

    def __init__(self, n, d=1):
        if d == 0:
            raise ZeroDivisionError("denominator is zero")
        if d < 0:
            n, d = -n, -d
        g = gcd(n, d)
        self._n, self._d = n // g, d // g     # 建立 RI

    def numer(self):
        return self._n

    def denom(self):
        return self._d

    def add(self, other):
        return Rational(self._n * other._d + other._n * self._d,
                        self._d * other._d)

    def __repr__(self):
        return f"Rational({self._n}, {self._d})"

half = Rational(1, 2)
x = half.add(Rational(1, 3))
print(x, x.numer(), Rational.add(half, half))
print(type(half).__name__, isinstance(half, Rational), vars(half))
```

```console
$ python3 rational1.py
Rational(5, 6) 5 Rational(1, 1)
Rational True {'_n': 1, '_d': 2}
```

ADT 的每个部分都找到了自己的位置。构造方法 `__init__` 是创建操作：它建立不变式。`numer` 与 `denom` 是观察操作，`add` 是生成操作。表示——属性 `_n` 与 `_d`——存在于每个实例内部，而 `vars(half)` 把它显示为实例的属性字典。

### 方法调用做了什么

除了属性查找这一条规则，Python 对方法没有特殊的机制。方法就是存放在类中的一个普通函数，而

$$
\texttt{obj.m(a, b)} \quad\text{等价于}\quad \texttt{type(obj).m(obj, a, b)}.
$$

这就是上面 `Rational.add(half, half)` 能够工作、且与 `half.add(half)` 给出相同结果的原因：实例只是被当作第一个实参传入。名字 `self` 是一条惯例，不是关键字。

::: definition 属性查找 {#def-lookup}
求值一个普通属性 `obj.name`：

1. 若 `name` 在实例自己的属性字典中，结果就是那个值；
2. 否则，若 `name` 定义在 `obj` 的类中（或者，如 [[program-design/inheritance-polymorphism]] 所示，定义在它的某个基类中），结果就是那个值——而如果它是一个函数，它会被先包装成一个**绑定方法**，由它把 `obj` 作为第一个实参供给；
3. 否则，这次查找抛出 `AttributeError`。

赋值 `obj.name = value` 总是在实例自己的字典中绑定 `name`。
:::

（下面即将介绍的 property 是第一条规则的一个例外：类中的一个 property 优先于实例字典。完整的规则涉及*描述符*；上面的简化版本对本课程已经足够。）

::: example 跟踪一次构造与一次调用 {#ex-trace-init}
跟踪 Python 执行 `r = Rational(6, -9)` 然后再执行 `r.add(r)` 时发生的事。
::: solution
1. `Rational(6, -9)` 先创建一个新的、空的 `Rational` 实例（经由继承来的方法 `__new__`），然后调用 `Rational.__init__(instance, 6, -9)`。在这次调用的帧中，`self` 是那个新实例，`n = 6`，`d = -9`。
2. 由于 `d < 0`，帧中的 `n` 与 `d` 变成 `-6` 与 `9`。`gcd(-6, 9)` 是 `3`（`math.gcd` 总返回非负结果），于是 `self._n, self._d = -2, 3` 在实例的字典中绑定两个属性。`__init__` 返回 `None`；调用表达式的值是那个实例，它被绑定到 `r`。
3. 查找 `r.add`：`vars(r)` 中只有 `_n` 与 `_d`，没有 `add`，于是它在类中被找到，并绑定到 `r`。调用 `r.add(r)` 变成 `Rational.add(r, r)`，`self` 与 `other` 给同一个对象命名。
4. 函数体算出 `Rational(-2 * 3 + -2 * 3, 3 * 3)`，即 `Rational(-12, 9)`，它的 `__init__` 把它约简为 `_n = -4`、`_d = 3`。结果是一个*新*实例；`r` 保持不变，正如不可变类型所要求的那样。
:::
:::

### 类属性与实例属性

直接在类体中、任何方法之外绑定的名字是**类属性**，被所有实例共享。方法是类属性；属于该类型的常量也是。

```python
class Circle:
    pi = 3.14159                 # 类属性，所有实例共享
    count = 0                    # 已创建的圆的个数

    def __init__(self, r):
        self.r = r               # 实例属性
        Circle.count += 1        # 通过类来更新共享计数器

    def area(self):
        return self.pi * self.r ** 2

a, b = Circle(1), Circle(2)
b.pi = 3                         # 只在 b 上创建一个实例属性
print(a.area(), b.area(), Circle.count, a.count)
print(vars(a), vars(b))
```

```console
$ python3 circle.py
3.14159 12 2 2
{'r': 1} {'r': 2, 'pi': 3}
```

由 [[#def-lookup]]，`a.pi` 找到的是类属性，而 `b.pi = 3` 创建了一个新的实例属性，只对 `b` 而言把它*遮蔽*了。在 `__init__` 里写 `self.count += 1` 也会做同样的事：读出类的值，然后绑定一个实例属性，让 `Circle.count` 停在零——这就是计数器要通过 `Circle` 来更新的原因。

::: warning 可变的类属性被每个实例共享
在类体里写 `items = []`、再在方法里写 `self.items.append(x)`，并不会让每个实例拥有自己的列表。列表只有一个，属于类，每个实例都往它上面追加——这与 [[programming-1/functions]] 中共享的可变默认参数是同一个错误。要在 `__init__` 里初始化每个实例的状态（`self.items = []`）。类属性应当是常量或刻意共享的数据。
:::

## 让类表现得像内建类型

Python 的语法是用**特殊方法**（special methods，也叫 *dunder* 方法，因双下划线得名）定义的。表达式 `a + b` 调用 `a.__add__(b)`；`a == b` 调用 `a.__eq__(b)`；`str(a)` 与 `print(a)` 调用 `a.__str__()`；`len(a)` 调用 `a.__len__()`；`x in a` 调用 `a.__contains__(x)`。定义这些方法，就能让一个 ADT 用语言的记号、表达这个 ADT 自己的含义。

```python
from math import gcd

class Rational:
    """Immutable rational. RI: _d > 0, gcd(_n, _d) == 1. AF: _n / _d."""
    def __init__(self, n, d=1):
        if d == 0:
            raise ZeroDivisionError("denominator is zero")
        if d < 0:
            n, d = -n, -d
        g = gcd(n, d)
        self._n, self._d = n // g, d // g

    @staticmethod
    def _coerce(x):                      # 在需要 Rational 的地方接受 int
        return Rational(x) if isinstance(x, int) else x

    def __add__(self, other):
        other = Rational._coerce(other)
        if not isinstance(other, Rational):
            return NotImplemented        # 让 Python 去试 other.__radd__，否则失败
        return Rational(self._n * other._d + other._n * self._d, self._d * other._d)
    __radd__ = __add__                   # 1 + r：加法可交换

    def __mul__(self, other):
        other = Rational._coerce(other)
        if not isinstance(other, Rational):
            return NotImplemented
        return Rational(self._n * other._n, self._d * other._d)
    __rmul__ = __mul__

    def __eq__(self, other):
        other = Rational._coerce(other)
        if not isinstance(other, Rational):
            return NotImplemented
        return self._n == other._n and self._d == other._d   # 由 RI 保证正确

    def __hash__(self):                  # 相等的值必须有相等的哈希
        return hash(self._n) if self._d == 1 else hash((self._n, self._d))

    def __repr__(self):
        return f"Rational({self._n}, {self._d})"

    def __str__(self):
        return str(self._n) if self._d == 1 else f"{self._n}/{self._d}"
```

```python
h = Rational(1, 2)
print(h + Rational(1, 3), 1 + h, h * 4, h == Rational(2, 4), h == 0.5)
print(sum([Rational(1, n) for n in range(1, 5)], Rational(0)))
print(len({Rational(1, 2), Rational(2, 4), Rational(3, 6), Rational(2), 2}))
print([h, Rational(5, 3)])
```

（与上面的类放在一起运行，输出为）

```text
5/6 3/2 2 True False
25/12
2
[Rational(1, 2), Rational(5, 3)]
```

这里有几个设计决策清晰可见。

- **返回 `NotImplemented`**（一个特殊常量，不是异常）告诉 Python：这个方法不知道如何处理另一个操作数。对于 `h == 0.5`，`Rational.__eq__` 返回 `NotImplemented`，Python 接着试 `float.__eq__(0.5, h)`，它也推辞不干，最后退回标识比较，得到 `False`。对于 `1 + h`，`int.__add__(1, h)` 推辞，于是 Python 调用 `h.__radd__(1)`。
- **`__repr__` 与 `__str__`** 服务不同的读者：`repr` 面向程序员（无歧义，最好是一段合法的 Python，用于列表内部和调试器），`str` 面向最终用户。
- **`__eq__` 使用不变式。**因为每个有理数恰有一个满足 $RI$ 的表示（该结论在 [[program-design/abstract-data-types]] 的习题中已证），比较属性就是在比较值。
- **`__hash__` 与 `__eq__` 一致**，跨类型也一样：`Rational(2) == 2`，所以 `hash(Rational(2))` 必须等于 `hash(2)`，这就是整数要特殊哈希的原因。因此第三行的集合只有两个元素，$\tfrac12$ 与 $2$。

最后一点是一条规则，不是某种便利。

::: definition 相等与哈希的约定 {#def-eq-contract}
一个类要被字典、集合以及语言的其余部分正确使用，它的 `__eq__` 必须在其接受的值上是一个**等价关系**——自反（$x = x$）、对称（$x = y \Rightarrow y = x$）且传递（$x = y \land y = z \Rightarrow x = z$）——并且它的 `__hash__` 必须满足

$$
x == y \implies \texttt{hash}(x) = \texttt{hash}(y).
$$

此外，用作字典键或集合元素的对象，只要还被存放在那里，它的哈希就不能改变。只定义 `__eq__` 而不定义 `__hash__`，会把 `__hash__` 置为 `None`，使实例**不可哈希**：它们根本不能作集合元素或字典键。
:::

哈希条件正是哈希表工作方式的直接推论（[[data-structures/hash-tables]]）：一次查找先算出键的哈希，走到对应的桶，然后才用 `==` 比较。若相等的对象可能有不同的哈希，查找就会搜错桶而落空。

::: example 不是等价关系的相等 {#ex-tolerance}
传感器的测量值要"在噪声范围内"比较：一位程序员写了一个类 `Reading`，它的 `__eq__` 返回 `abs(self.v - other.v) < 0.1`。说明这不是一个等价关系，并解释把它用于集合会出什么问题。
::: solution
取三个读数 $a = 0$、$b = 0.06$、$c = 0.12$。于是 $a = b$（差为 $0.06 < 0.1$）且 $b = c$（差 $0.06$），但 $a \neq c$（差 $0.12$）。传递性失效。

除了一个常数函数（或在很长的取值段上为常数），任何哈希函数都无法与这个 `__eq__` 相容：$a = b$ 迫使 $\texttt{hash}(a) = \texttt{hash}(b)$，$b = c$ 迫使 $\texttt{hash}(b) = \texttt{hash}(c)$，而两两相差 $0.06$ 的读数链把每个值与所有其他值连在一起，所以所有读数都需要同一个哈希。用这样的哈希，每个元素都落进同一个桶，集合退化成一个慢速列表，而且它的内容仍取决于插入顺序：按 $a$、$c$、$b$ 插入留下两个元素（$b$ 被当作与 $a$"相等"而遭拒绝），而按 $b$、$a$、$c$ 插入只留下 $b$，因为 $a$ 与 $c$ 都"等于" $b$。近似比较是一个有用的*函数*（`math.isclose`），但它绝不能成为这个类型的 `==`。
:::
:::

::: widget relation
set: a; b; c
pairs: a,a; b,b; c,c; a,b; b,a; b,c; c,b
view: properties
name: E
caption: 读数 $a = 0$、$b = 0.06$、$c = 0.12$ 上"相差小于 $0.1$"的关系。它自反、对称，但不传递：$a\,E\,b$ 且 $b\,E\,c$，却没有 $a\,E\,c$。点击矩阵加上对子 $(a, c)$ 与 $(c, a)$，这个关系就成为一个只剩一个等价类的等价关系——想让"容差相等"具有传递性，唯一的办法是让所有东西都相等。
:::

## 封装与属性

Python 没有 `private` 关键字。封装是一个惯例问题，只有一点点语法支持。

- 以一个下划线开头、如 `_n` 的名字是**内部的**：属于表示的一部分，不属于接口。客户*能*读 `r._n`，但被告知不要这样做，而工具（静态检查工具、文档生成器）尊重这一惯例。
- 以两个下划线开头、不以两个下划线结尾、如 `__secret` 的名字会被**改编**：在类 `Account` 内部，`self.__secret` 被存成 `_Account__secret`。名称改编避免与子类使用的名字发生偶然的冲突；它不是一种安全机制。

惯例之所以行得通，是因为 Python 程序员把它当作契约的一部分：伸手进入另一个类的 `_属性` 的代码，在那个类改变时按定义就坏了，正如使用 `r[0]` 的客户一样。Java、C++ 这类语言在编译器里强制执行这条边界；Python 信任程序员，并让违规在源代码中一目了然。

**property** 让一个类能够把一个观察器呈现得仿佛它是一个普通属性，同时对它保持控制。用 `@property` 装饰一个方法，`obj.name` 就会调用这个方法；没有定义 setter 时，赋值会被拒绝。

```python
from functools import total_ordering

@total_ordering                       # 由 __eq__ 与 __lt__ 导出 <=、>、>=
class Time:
    """A time of day to the minute.  RI: 0 <= _m < 1440.  AF: _m minutes after midnight."""
    def __init__(self, hour, minute):
        if not (0 <= hour < 24 and 0 <= minute < 60):
            raise ValueError(f"invalid time {hour}:{minute}")
        self._m = 60 * hour + minute

    @classmethod
    def from_minutes(cls, m):         # 第二个创建操作
        m %= 1440                     # Python 的 % 落在 [0, 1440) 内：恢复 RI
        return cls(m // 60, m % 60)

    @property
    def hour(self):   return self._m // 60
    @property
    def minute(self): return self._m % 60

    def plus(self, minutes):   return Time.from_minutes(self._m + minutes)
    def __eq__(self, other):   return isinstance(other, Time) and self._m == other._m
    def __lt__(self, other):
        return self._m < other._m if isinstance(other, Time) else NotImplemented
    def __hash__(self):        return hash(self._m)
    def __repr__(self):        return f"Time({self.hour}, {self.minute})"
    def __str__(self):         return f"{self.hour:02d}:{self.minute:02d}"

t = Time(23, 50)
print(t, t.plus(25), t.plus(-24 * 60), t.hour, t.minute)
print(sorted([Time(9, 5), Time(8, 59), Time(12, 0)]), Time(8, 0) >= Time(7, 59))
try:
    t.hour = 3
except AttributeError as e:
    print("AttributeError:", e)
```

```console
$ python3 time_of_day.py
23:50 00:15 23:50 23 50
[Time(8, 59), Time(9, 5), Time(12, 0)] True
AttributeError: property 'hour' of 'Time' object has no setter
```

这个类示范了一个小型不可变值类型的完整套路：docstring 中的不变式、验证实参的构造方法、一个替代构造方法 `from_minutes`（`@classmethod` 以 `cls` 接收类本身，因此它对子类也适用）、把观察器做成 property，以及负责打印、相等、哈希与排序的特殊方法。注意 `from_minutes` 如何用 `%` *恢复*不变式，于是 `plus` 对任意分钟数——无论正负——都成立。

### 可变对象及其不变式

可变类同样需要不变式，而它们的变更操作必须在每条路径上保持它，包括抛出异常的那些路径。

::: example 银行账户 {#ex-account}
为一个银行账户设计一个类，其余额以便士计，绝不允许为负。会导致透支的取款必须失败，且不改变余额。
::: solution
```python
class InsufficientFunds(Exception):
    """Raised when a withdrawal exceeds the balance."""

class Account:
    """A bank account.  RI: self._balance is an int >= 0 (pence)."""
    def __init__(self, owner, balance=0):
        if balance < 0:
            raise ValueError("opening balance must be non-negative")
        self.owner = owner
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("deposit must be positive")
        self._balance += amount

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("withdrawal must be positive")
        if amount > self._balance:                    # 在改变任何东西之前先检查
            raise InsufficientFunds(f"balance {self._balance}, requested {amount}")
        self._balance -= amount

acct = Account("Ada", 5000)
acct.withdraw(1200)
try:
    acct.withdraw(10_000)
except InsufficientFunds as e:
    print("refused:", e)
print(acct.owner, acct.balance)
```

```console
$ python3 account.py
refused: balance 3800, requested 10000
Ada 3800
```

每个变更操作都在改变状态之前检查*全部*条件，于是一次失败的调用会让对象保持原样——**强异常保证**。若 `withdraw` 先减钱再检查，一次被拒绝的取款就会留下被破坏的不变式。`InsufficientFunds` 是一个新的异常类型，被定义成从 `Exception` 派生的类；调用者可以专门捕获它，而不会把无关的 `ValueError` 一并捕获。（由一个类派生另一个类是下一章的主题。）把 `balance` 做成只读 property，意味着客户无法写 `acct.balance = -100`；他们仍然可以写 `acct._balance = -100`，但那样一来，不变式被破坏就明显是他们自己的责任。
:::
:::

::: quiz
在 `Account` 类中，哪个改动会让客户能够只使用公开的名字破坏不变式？
- [ ] 把 `_balance` 改名为 `__balance`
- [x] 添加一个方法 `history(self)`，返回内部列表 `self._transactions`，假设余额由该列表重新计算
- [ ] 添加一个方法 `statement(self)`，返回一个字符串
- [ ] 把 `owner` 做成只读 property
::: solution
返回一个内部的 mutable 列表就是表示暴露（[[program-design/abstract-data-types]]）：客户能往它里面追加一笔假的取款，而如果余额由该列表导出，就能把余额压成负数。字符串是不可变的，没法用它来改动账户。名称改编和只读 property 只会让访问*更难*，所以它们不可能引入破坏不变式的途径。
:::
:::

## 标识、相等与状态

每个对象都有三样东西：**标识**（它是哪个对象；在其生命周期内永不改变，`id(obj)` 以一个整数报告它）、**类型**（同样永不改变），以及**值**或**状态**（其属性的内容，若对象可变则可能改变）。Python 有两个比较运算与它们对应。

- `x is y` 测试标识：它们是同一个对象吗？
- `x == y` 测试值的相等，由 `__eq__` 定义。没有定义 `__eq__` 的类继承默认版本，而默认版本*就是*标识：两个不同的 `Account` 对象，即使所有者与余额相同，也不满足 `==`。

```python
a = Account("Ada", 100)
b = a                            # 同一个对象的第二个名字
c = Account("Ada", 100)          # 另一个对象，状态相同
b.deposit(50)
print(a.balance, a is b, a is c, a == c)
```

（使用 [[#ex-account]] 中的 `Account` 时，这段程序打印 `150 True False False`。）通过 `b` 完成的存款从 `a` 也看得见，因为 `a` 与 `b` 是**别名**：两个名字，一个对象。这正是 [[programming-1/sequences]] 中列表的别名现象，而对账户这样有标识的对象，这通常正是你想要的：账户只有一个，无论有多少个变量引用它。

::: widget mapping
domain: a; b; c
codomain: account 1; account 2
map: a>account 1; b>account 1; c>account 2
editable: true
caption: 名字到对象的映射。`a` 与 `b` 是同一个 `Account` 的别名；`c` 给第二个账户命名，它的状态与前者的相同。名字到对象的映射不满足单射，这就是别名：通过 `b` 做出的任何改动，从 `a` 也看得见。把 `c` 的箭头拖到 `account 1`，就模拟了 `c = a`——现在三个名字都能看见每一笔存款。`is` 运算问的是：两个名字是否映到右边同一个点上。
:::

标识与值之间的区别，决定了一个类应当如何定义相等。

- **值对象**——有理数、时刻、点、金额——完全由它们的值定义。它们通常应当是不可变的，按值定义 `__eq__` 与 `__hash__`，并且可以被自由地复制与共享，因为没有人能改变它们。
- **实体对象**——账户、用户、打开的文件、网络连接——有一个在其状态改变期间持续存在的标识。它们通常应当保留默认的、基于标识的 `__eq__` 与 `__hash__`。

把两者混为一谈会产生一个经典缺陷：一个可变对象的哈希依赖于它的状态。

::: example 一把消失的键 {#ex-lost-key}
一个 `Point` 类用可变的属性 `x` 与 `y` 定义 `__eq__` 与 `__hash__`。这个程序打印什么，为什么？

```python
class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __eq__(self, other):
        return isinstance(other, Point) and (self.x, self.y) == (other.x, other.y)
    def __hash__(self):
        return hash((self.x, self.y))

p = Point(1, 2)
s = {p}
p.x = 5                          # 修改一个已经在集合中的对象
print(p in s, Point(1, 2) in s, Point(5, 2) in s, len(s))
print(any(q is p for q in s))
```
::: solution
```console
$ python3 lostkey.py
False False False 1
True
```

`p` 被加入时，集合把它存放在 `hash((1, 2))` 对应的桶里。`p.x = 5` 之后，查找 `p in s` 算出的是 `hash((5, 2))`，去搜另一个桶，于是找不到 `p`。`Point(1, 2) in s` 搜的是正确的桶，但那里的那个对象如今与 `(1, 2)` 比较已不相等。`Point(5, 2)` 与 `p` 失败的原因相同。这个点其实还在集合里——遍历它就能找到这个对象本身——可任何查找都够不着它。集合的不变式（"每个元素都在它的哈希对应的桶里"）被从外部破坏了：违反 [[#def-eq-contract]] 最后一款的结果。修法是让 `Point` 不可变（例如 `@dataclass(frozen=True)`），或者保留基于标识的相等。
:::
:::

::: warning `is` 不是更快的 `==`
`x is y` 与 `x == y` 回答的是不同的问题。`is` 只用于标识检查，首推 `x is None`。比较值就用 `==`：两个相等的字符串或整数未必是同一个对象，这取决于它们是如何创建的，也取决于实现细节，例如 CPython 对小整数的缓存，所以当 `x == 1000` 为 `True` 时 `x is 1000` 可能是 `False`（Python 会警告：`SyntaxWarning: "is" with 'int' literal`）。
:::

### 数据类

给每个小型值类型都写一遍 `__init__`、`__repr__` 与 `__eq__` 是重复劳动。标准模块 `dataclasses`（Python 3.7 及以后）根据带标注的类属性生成它们：

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Point:
    x: float
    y: float

    def norm(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

p = Point(3, 4)
print(p, p.norm(), p == Point(3, 4), len({p, Point(3, 4)}))
try:
    p.x = 0
except AttributeError as e:
    print(type(e).__name__, "-", e)
```

```console
$ python3 dc.py
Point(x=3, y=4) 5.0 True 1
FrozenInstanceError - cannot assign to field 'x'
```

`frozen=True` 使实例不可变，并且由于此时相等与哈希是安全的，它还生成 `__hash__`。标注 `x: float` 是类型提示，见 [[program-design/types-interfaces]]；Python 在运行时不检查它们（`Point(3, 4)` 存的是整数）。数据类是快速造出一个值类型的方式，但它不会替你写出表示不变式：若需要不变式，就在 `__post_init__` 方法中检验它。

::: history
类与对象来自 Simula 67：奥勒-约翰·达尔（Ole-Johan Dahl）与克里斯滕·尼加德（Kristen Nygaard）在挪威计算中心设计它是为了编写模拟程序——每个被模拟的实体是一个对象，是一个把数据与作用于它的数据的过程捆绑在一起的类的实例，而 Simula 已经有了子类与虚过程。首创"面向对象程序设计"一词的艾伦·凯（Alan Kay）自 1972 年起在施乐 PARC 开发了 Smalltalk：一切皆对象，计算就是对象之间的消息传递；Smalltalk-80 发表于阿黛尔·戈德堡（Adele Goldberg）与大卫·罗布森（David Robson）合著的《Smalltalk-80: The Language and its Implementation》（1983）。比亚尼·斯特劳斯特鲁普（Bjarne Stroustrup）的 C++（首个商业版本发行于 1985 年）把 Simula 的类带进了 C，而 Java（1995）把类变成了每个程序的基本单位。Python 自吉多·范罗苏姆（Guido van Rossum）1991 年的首次公开发布起就有类；`dataclasses` 模块随 Python 3.7 于 2018 年到来。
:::

## 后续内容

类是本课程其余部分的设计单位。[[program-design/inheritance-polymorphism]] 用其他类来定义类，并让一段代码作用于许多类的对象；[[program-design/iterators-generators]] 用特殊方法 `__iter__` 与 `__next__` 让对象能配合 `for` 工作；[[program-design/types-interfaces]] 向类型检查器描述类。在 [[data-structures]] 中，每个数据结构——链表、树、堆——都是一个带有表示不变式的类；而在 [[software-engineering]] 中，类被组织成更大的组件，并遵循那些决定哪个类应当拥有哪个职责的设计原则。

::: summary
- **类**把一种表示（实例属性）与运算（方法）捆绑在一起；`__init__` 是创建操作，必须建立表示不变式（[[#def-class]]）。
- `obj.m(args)` 意味着 `type(obj).m(obj, args)`：方法是类中的函数，而属性查找先搜实例、再搜类（[[#def-lookup]]）。对 `obj.name` 的赋值总是绑定一个实例属性。
- **特殊方法**（`__add__`、`__eq__`、`__hash__`、`__lt__`、`__repr__`、`__str__`……）让一个类型用 Python 的语法表达它自己的含义；对不处理的操作数返回 `NotImplemented`。
- `__eq__` 必须是等价关系，相等的对象必须有相等的哈希；已被存放的键的哈希不得改变（[[#def-eq-contract]]）。只定义 `__eq__` 会让一个类不可哈希。
- Python 中的封装靠惯例（`_name`）加 property 实现只读访问；变更操作应当在改变任何东西之前检查完一切。
- 对象有标识（`is`）、类型与状态；**值对象**应当是不可变的、按值相等，**实体对象**保持按标识相等。别名共享同一个对象。
- `@dataclass(frozen=True)` 生成一个值类型的样板代码，但不生成它的不变式。
:::

## 习题

::: exercise 类还是实例？{level=1 check="-7"}
最后一行打印什么？

```python
class Counter:
    n = 0
    def tick(self):
        self.n += 1

a, b = Counter(), Counter()
a.tick(); a.tick(); b.tick()
Counter.n = 10
print(a.n + b.n - Counter.n)
```

（输入数目。）
::: solution
```console
$ python3 counter.py
-7
```

`self.n += 1` 意味着 `self.n = self.n + 1`。第一次 `a.tick()` 读出 `self.n`，由 [[#def-lookup]]，它找到类属性 `0`，然后*绑定一个实例属性* `a.n = 1`；第二次调用读出实例属性，设 `a.n = 2`。同样 `b.n = 1`。`Counter.n = 10` 只改变类属性，而两个实例如今都已把它遮蔽。所以这一行打印 $2 + 1 - 10 = -7$。
:::
:::

::: exercise 不带点号的方法调用 {level=1}
把每个调用改写成不使用绑定方法的形式 `Class.method(obj, …)`：(a) `"a,b".split(",")`；(b) 对列表 `xs` 执行 `xs.append(3)`；(c) `Rational(1, 2).add(Rational(1, 3))`；(d) `acct.withdraw(100)`。
::: solution
(a) `str.split("a,b", ",")`。(b) `list.append(xs, 3)`。(c) `Rational.add(Rational(1, 2), Rational(1, 3))`。(d) `Account.withdraw(acct, 100)`。每种情形下，点号之前的对象都成为第一个实参——也就是方法的 `self`。
:::
:::

::: exercise 集合有多大？{level=2 check="5"}
用定义了 `__eq__` 与 `__hash__`（并且对浮点数推辞）的 `Rational` 类，集合 `{Rational(1, 2), Rational(2, 4), Rational(-1, -2), Rational(1, 3), Rational(3), 3, 3.0, Rational(0, 5), 0}` 有几个元素？（输入数目。）这个答案揭示了关于这个类的什么？
::: solution
```console
$ python3 setsize.py
5
```

集合字面量从左到右加入元素，并且只在已有元素中没有一个与它 `==` 时才保留一个元素。$\tfrac12$ 的三种写法给出一个元素，`Rational(1, 3)` 给出第二个。`Rational(3)` 被加入；`3` 与它相等（`Rational.__eq__` 会把 int 强制转换，而且两者的哈希一致），所以不被加入。`3.0` 与 `3` 有相同的哈希，但与已存放的 `Rational(3)` 比较时，`float.__eq__` 与 `Rational.__eq__` 都返回 `NotImplemented`，于是 Python 退回标识比较，两者*不相等*：`3.0` 被加入。最后 `Rational(0, 5)` 被加入，而 `0` 与它相等。剩下的就是 $\tfrac12$、$\tfrac13$、`Rational(3)`、`3.0` 与 $0$：五个元素。

这一意外表明，这个 `==` 跨类型时不满足传递性：`Rational(3) == 3` 且 `3 == 3.0`，却有 `Rational(3) != 3.0`，违反了 [[#def-eq-contract]]。集合的大小如今取决于字面量中元素的顺序（把 `3` 放在最前，集合就只有四个元素）。标准库的 `fractions.Fraction` 通过同时与浮点数做精确比较来避免这一点。
:::
:::

::: exercise 一个栈类 {level=2}
用一个 Python 列表作表示，写一个类 `Stack`，它有方法 `push(x)`、`pop()` 与 `peek()`，一个 `__len__` 方法，以及一个自底向上显示各条目的 `__repr__`。对空栈执行 `pop` 与 `peek` 必须抛出带消息 `"empty stack"` 的 `IndexError`。然后说明 `if stack:` 在你的类上可以使用，并解释为什么。
::: solution
```python
class Stack:
    """LIFO stack. Rep: list self._items, bottom first. AF: the stack of those items."""
    def __init__(self):
        self._items = []
    def push(self, x):
        self._items.append(x)
    def pop(self):
        if not self._items:
            raise IndexError("empty stack")
        return self._items.pop()
    def peek(self):
        if not self._items:
            raise IndexError("empty stack")
        return self._items[-1]
    def __len__(self):
        return len(self._items)
    def __repr__(self):
        return f"Stack({self._items!r})"

s = Stack()
for x in "abc":
    s.push(x)
print(s, s.pop(), s.peek(), len(s), bool(s), bool(Stack()))
```

```console
$ python3 stackclass.py
Stack(['a', 'b']) c b 2 True False
```

`if stack:` 之所以可用，是因为当一个类没有定义 `__bool__` 时，Python 的真值测试会调用 `__len__`，并把长度 $0$ 当作假。（注意打印出的第一项只显示 `a` 与 `b`：`print` 会先对所有实参求值——其中包括 `s.pop()`——然后才把它们中的任何一个转换成字符串，所以 `s` 是在弹出之后才被显示的。）
:::
:::

::: exercise 共享的列表 {level=1}
解释这个程序的输出，并修复这个类。

```python
class Playlist:
    songs = []
    def __init__(self, name):
        self.name = name
    def add(self, song):
        self.songs.append(song)

rock, jazz = Playlist("rock"), Playlist("jazz")
rock.add("Paranoid"); jazz.add("So What")
print(rock.songs)
```
::: solution
它打印 `['Paranoid', 'So What']`。`songs` 是一个类属性，而 `self.songs.append(song)` 并没有对 `self.songs` *赋值*——它查找这个名字（由 [[#def-lookup]]，找到的是类的那个列表），并修改那一个列表。两个播放列表共享它。修法：在 `__init__` 中为每个实例创建列表：

```python
class Playlist:
    def __init__(self, name):
        self.name = name
        self.songs = []
    def add(self, song):
        self.songs.append(song)
```
:::
:::

::: exercise 给有理数排序 {level=2}
给带运算符的 `Rational` 类加上 `__lt__`，并用 `functools.total_ordering` 装饰这个类。然后对 `[Rational(2, 3), Rational(-1, 2), Rational(5, 8), 1]` 排序，并求列表的最大值。为什么只比较 $n_1 d_2$ 与 $n_2 d_1$ 就够了？
::: solution
```python
    def __lt__(self, other):
        other = Rational._coerce(other)
        if not isinstance(other, Rational):
            return NotImplemented
        return self._n * other._d < other._n * self._d
```

有了这个方法，`sorted([Rational(2, 3), Rational(-1, 2), Rational(5, 8), 1])` 给出 `[Rational(-1, 2), Rational(5, 8), Rational(2, 3), 1]`，而 `max` 给出 `1`，那个 int。int 与 `Rational` 之间的比较在两个方向上都能工作：`int` 的比较方法对 `Rational` 返回 `NotImplemented`，于是 Python 调用 `Rational` 的反身方法（对 `1 < r` 来说就是 `r.__gt__(1)`，由 `total_ordering` 导出）。由于不变式使两个分母都为正，把不等式 $\frac{n_1}{d_1} < \frac{n_2}{d_2}$ 两边乘以 $d_1 d_2 > 0$ 保持其方向，得到 $n_1 d_2 < n_2 d_1$——精确的整数算术，没有除法，没有舍入。若没有 $d > 0$ 这条不变式，对负分母这个比较就会出错。
:::
:::

::: exercise 整数取值的有理数的哈希 {level=3}
假设 `Rational` 类中的 `__hash__` 干脆就是 `hash((self._n, self._d))`。证明 [[#def-eq-contract]] 的约定此后会被违反，并给出一个含两个元素的集合字面量，它的两个元素 `==` 却会有两个元素。然后证明：对 `__eq__` 所接受的一切 `Rational` 与 `int` 值对，题给的 `__hash__` 满足该约定。
::: solution
`Rational.__eq__` 会把 int 强制转换，所以 `Rational(2) == 2` 为 `True`。用 `hash((2, 1))` 的话，相等成立而 `hash(Rational(2)) == hash(2)`（几乎肯定）不成立，因为 `hash(2) == 2`，而元组的哈希是把各元素的哈希混合算出的。于是 `{Rational(2), 2}` 通常会有两个元素：两个对象落进不同的桶，从不被比较。（即便碰上不走运的桶冲突，这条规则也被破坏了；约定必须对所有值成立，而不是通常成立。）

用题给的定义：取 $x == y$，两者都为 `__eq__` 所接受。*两种都是有理数：*由不变式与 [[program-design/abstract-data-types]]，相等的有理数有完全相同的表示 $(n, d)$，于是两个哈希都由同一个分支从同一个 $(n, d)$ 算出，相等。*情形 $x$ 是 Rational、$y$ 是整数 $k$：*`__eq__` 把 $x$ 与 `Rational(k)` = $(k, 1)$ 比较，所以 $x$ 的表示是 $(k, 1)$，而 `hash(x)` 由第一个分支等于 `hash(k)`，即等于 `hash(y)`。*两个都是整数：*Python 自己的 `int` 哈希。所以相等的值总有相等的哈希。
:::
:::

::: exercise 一个向量类型 {level=3}
为一个二维向量写一个不可变类 `Vec`，带 `__add__`、`__sub__`、`__mul__`（乘以一个数，两侧都行，使 `2 * v` 与 `v * 2` 都可使用）、`__eq__`、`__hash__`、`__abs__`（长度）与 `__repr__`。用 `*` 让两个向量相乘应当抛出 `TypeError`。说明 Python 如何求值 `2 * v`。
::: solution
```python
class Vec:
    """Immutable 2D vector. Rep: floats or ints self._x, self._y."""
    def __init__(self, x, y):
        self._x, self._y = x, y
    def __add__(self, o):
        return Vec(self._x + o._x, self._y + o._y) if isinstance(o, Vec) else NotImplemented
    def __sub__(self, o):
        return Vec(self._x - o._x, self._y - o._y) if isinstance(o, Vec) else NotImplemented
    def __mul__(self, k):
        if isinstance(k, (int, float)):
            return Vec(k * self._x, k * self._y)
        return NotImplemented
    __rmul__ = __mul__
    def __eq__(self, o):
        return isinstance(o, Vec) and (self._x, self._y) == (o._x, o._y)
    def __hash__(self):
        return hash((self._x, self._y))
    def __abs__(self):
        return (self._x ** 2 + self._y ** 2) ** 0.5
    def __repr__(self):
        return f"Vec({self._x}, {self._y})"

v, w = Vec(3, 4), Vec(1, -1)
print(v + w, v - w, 2 * v, v * 0.5, abs(v), v == Vec(3, 4))
try:
    v * w
except TypeError as e:
    print("TypeError:", e)
```

```console
$ python3 vec.py
Vec(4, 3) Vec(2, 5) Vec(6, 8) Vec(1.5, 2.0) 5.0 True
TypeError: unsupported operand type(s) for *: 'Vec' and 'Vec'
```

对于 `2 * v`，Python 先调用 `int.__mul__(2, v)`，它返回 `NotImplemented`，因为 `int` 对 `Vec` 一无所知；于是它再试右操作数的反身方法 `v.__rmul__(2)`，这里就是 `__mul__`，返回 `Vec(6, 8)`。对于 `v * w`，`v.__mul__(w)` 与 `w.__rmul__(v)` 都返回 `NotImplemented`，于是 Python 抛出 `TypeError`。
:::
:::
