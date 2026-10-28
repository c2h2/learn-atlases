一个夜间作业从电子表格导出的文件读取价格表并计算平均价格。它已经正确运行了好几个月。后来有人编辑了电子表格，有一列被格式化成文本，于是作业在凌晨三点失败，报 `TypeError: unsupported operand type(s) for +: 'int' and 'str'`——深处 `sum` 内部，离读文件那一行十万八千里。缺陷其实一直都在，意思是说，程序里没有任何地方说过价格必须是数；它只是从未被触发过。

**类型**描述一个名字可以持有什么种类的值，而**类型检查器**在程序运行*之前*检查程序，寻找施加在错误种类的值上的运算。Python 在程序运行时检查类型；借助**类型标注**与一个独立的检查器，它也能提前检查。本章讨论类型是什么、静态检查与动态检查有何区别、如何为 Python 程序加标注，以及让类型强大到足以支撑真实设计的三个想法：**泛型**，让一个定义适用于多种类型；**接口**，分为名义与结构两种，刻画一个对象必须能做什么；以及**型变**（variance），它决定一个类型上的容器或函数何时可以充当另一个。类型是规格说明（[[program-design/abstraction-specifications]]）中能被机器完全检查的那一部分。

## 类型与类型错误

::: definition 类型、类型错误 {#def-type}
**类型**是一个值集合连同其上定义的运算：`int` 是带 `+`、`*`、`//` 等运算的整数；`str` 是带拼接、索引与 `.upper()` 的字符串。**类型错误**是试图对一个值施加运算、而该值不在该运算所定义的集合之内，例如把整数加到字符串上，或调用 `None` 的 `.upper()`。
:::

各语言在*何时*发现类型错误、以及*多严格*地对待它们，两者互不相同。

- **动态类型：**类型属于值，每个运算在执行时检查其操作数的类型。Python、JavaScript、Ruby 与 Lisp 是动态类型语言。类型错误只有当出错的那一行真的运行时才会被发现。
- **静态类型：**类型也属于程序文本中的名字与表达式，一个**类型检查器**（通常是编译器的一部分）在执行之前验证每个运算都将收到合适类型的操作数。Java、C、C++、Rust、Haskell 与 OCaml 是静态类型语言。

与此无关地，一个语言若从不悄悄重解释错误类型的值，就称为**强类型**的；若隐式地转换或重解释它们，则称为**弱类型**的。Python 是动态但强类型的：`"3" + 4` 抛出 `TypeError`。JavaScript 是动态的且更弱：`"3" * 2` 是 `6`，`"3" + 4` 是 `"34"`，靠的是方向相反的隐式转换。C 是静态类型的，但强制转换与 union 让程序可以把一个值的字节重解释成另一个类型（[[computer-systems/c-programming]]）。"强"与"弱"这些词并不形式化，更精确的问法是：一个语言会进行哪些隐式转换。

静态检查既有收益也有代价：它必须拒绝一些实际上永远不会出错的程序。

::: proposition 没有完美的类型检查器 {#prop-no-perfect-checker}
不存在这样的算法：对每个 Python 程序都能判定运行它是否会抛出 `TypeError`。因此任何静态类型检查器要么拒绝一些永远不会抛 `TypeError` 的程序，要么接受一些会抛的程序。
:::

::: proof
假设有算法 $D$ 能判定它。给定任何程序 $P$（无输入），构造程序 $Q$：

```text
try:
    P                      # 运行 P，吞掉它抛出的任何异常
except BaseException:
    pass
1 + "a"                    # 恰在 P 终止时到达
```

若 $P$ 终止（正常终止或抛异常终止），$Q$ 就在最后一行抛出 `TypeError`；否则 $Q$ 永远运行，永远到不了那一行；$Q$ 的其他任何一行都放不出一个逃出的 `TypeError`。于是 $D(Q)$ 就能告诉我们 $P$ 是否停机，从而判定停机问题，而这是不可能的（[[theory-of-computation]]）。第二句随之成立：一个恰好接受所有永不抛 `TypeError` 的程序的检查器，就会是这样一种算法。
:::

所以每个静态类型系统都是**保守的**：它接受自己能用简单、局部的规则证明安全的程序，拒绝其余的，其中也包括一些正确的程序。**可靠的**（sound）类型系统保证被接受的程序绝不会犯它所排除的那些类型错误——米尔纳（Milner）为 ML 提出的口号是"良类型的程序不会出错"——而设计良好的类型系统很少拒绝程序员想要书写的程序。

## Python 中的类型标注

自 Python 3.5（PEP 484，2014）起，程序可以用**标注**声明它期望的类型：变量或形参写作 `name: T`，函数的结果写作 `-> T`。语言本身在运行时忽略它们；mypy、Pyright、Pyre 等独立工具读取它们并对程序做静态检查。常见形式有：

| 标注 | 含义 |
|---|---|
| `int`、`float`、`str`、`bool`、`None` | 内建类型（作结果类型时，`None` 表示"不返回任何东西"） |
| `list[int]`、`dict[str, float]`、`set[str]`、`tuple[int, str]` | 带元素类型的容器；`tuple[int, ...]` 是任意长度的元组 |
| `int \| None`、`int \| str` | **联合类型**：两种类型之一 |
| `Callable[[int, str], bool]` | 以一个 `int` 和一个 `str` 为一个 `bool` 的函数（来自 `collections.abc`） |
| `Iterable[T]`、`Iterator[T]`、`Sequence[T]`、`Mapping[K, V]` | 来自 `collections.abc` 的接口 |
| `Any` | 未知类型：什么都行，什么都不检查 |

::: example 检查价格程序 {#ex-mypy-prices}
给一个 `average` 函数加上标注，并对一个含两处缺陷的程序运行 mypy：一处是把字符串列表当数字传入，一处是在算术运算中使用了可能缺失的字典值。
::: solution
```python
def average(xs: list[float]) -> float:
    return sum(xs) / len(xs)

prices = {"tea": 2.5, "scone": 3.0}
print(average(list(prices.values())))
print(average(["2.5", "3.0"]))
discount = prices.get("cake")
print(discount * 2)
```

```console
$ mypy prices.py
prices.py:6: error: List item 0 has incompatible type "str"; expected "float"  [list-item]
prices.py:6: error: List item 1 has incompatible type "str"; expected "float"  [list-item]
prices.py:8: error: Unsupported operand types for * ("None" and "int")  [operator]
prices.py:8: note: Left operand is of type "float | None"
Found 3 errors in 1 file (checked 1 source file)
```

```console
$ python3 prices.py
2.75
Traceback (most recent call last):
  File ".../prices.py", line 6, in <module>
    print(average(["2.5", "3.0"]))
          ~~~~~~~^^^^^^^^^^^^^^^^
  File ".../prices.py", line 2, in average
    return sum(xs) / len(xs)
           ~~~^^^^
TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

mypy（2.4 版，2026 年；各版本的消息略有出入）不运行任何东西就在犯错的那一行报出了两处缺陷。运行程序则只会发现第一处，在 `sum` 内部，且已经打印了一个正确结果之后。第二处缺陷很微妙：`dict.get` 对缺失的键返回 `None`，所以它的类型是 `float | None`；mypy 不靠任何标注就为 `discount` *推断*出这个类型，随后看出 `None * 2` 没有定义。若靠 Python 自己，这个缺陷只有在蛋糕恰好缺失的那次运行中才会暴露。
:::
:::

像 `str | None` 这样的联合类型，必须先**收窄**，才能使用 `str` 的运算。类型检查器理解常用的那些测试——`if x is None:`、`isinstance(x, str)`、提前 `return`——并在它们所守护的代码中把 `x` 当作 `str`：

```python
def describe(name: str | None) -> str:
    if name is None:
        return "anonymous"
    return name.upper()              # 此处 name: str

def shout(name: str | None) -> str:
    return name.upper()              # name 可能仍是 None
```

```console
$ mypy narrowing.py
narrowing.py:7: error: Item "None" of "str | None" has no attribute "upper"  [union-attr]
Found 1 error in 1 file (checked 1 source file)
```

那个臭名昭著的"空引用"错误——Python 里的 `AttributeError: 'NoneType' object has no attribute ...`，Java 里的 `NullPointerException`——是那些没有显式可选类型的类型系统抓不住的类型错误，因为它们允许每个引用都为空。把"可能缺失"变成类型的一部分，正如 `str | None` 所做的，就把这一类缺陷从运行时刻搬到了检查时刻。

::: warning 标注不在运行时被检查
Python 不强制执行标注。对于 `def double(n: int) -> int: return n * 2`，调用 `double("ab")` 会运行并返回 `"abab"`；只有静态检查器会报告它。标注也不是转换：`n: int = input()` 之后 `n` 仍是一个字符串。越过程序边界的数据——用户输入、文件、网络消息、JSON——带着它们各自实际的类型而来，必须先经运行时验证（`int(s)`、模式校验）才能信任。静态类型描述的是程序自己的代码，不是它所读取的世界。
:::

::: quiz
已知 `def f(x: float) -> str: ...`，mypy 会拒绝下列哪些行？
- [ ] `f(3)`——实参是一个 `int`
- [x] `y: int = f(2.0)`
- [ ] `f(True)`
- [x] `f(None)`
::: solution
`f` 的结果是 `str`，所以把它赋给 `int` 变量是错误；而 `None` 不是 `float`。按 PEP 484 的一条特别规则，期望 `float` 的地方接受 `int`（尽管运行时 `int` 并不是 `float` 的子类），而 `bool` 是 `int` 的子类，所以 `f(3)` 与 `f(True)` 都被接受。
:::
:::

## 泛型

返回列表第一个元素的函数对任何元素的列表都适用。把它标注成 `def first(xs: list[Any]) -> Any` 会丢失信息：检查器再也说不出 `first(["a", "b"])` 是字符串。我们真正想说的是"对每个类型 $T$，`first` 接受一个 `list[T]` 并返回一个 `T`”。

::: definition 泛型函数与泛型类 {#def-generic}
一个**泛型**定义带有**类型参数**——代表类型的变量——并且可以在把实类型代入它们所得到的每个类型上使用。在 Python（3.12 及以后）中，参数写在名字后的方括号里：`def first[T](xs: list[T]) -> T` 与 `class Stack[T]: ...`。在特定类型上使用一个泛型称为**实例化**：`Stack[int]` 是整数的栈；调用 `first(["a", "b"])` 把 `T` 实例化为 `str`，这个选择由检查器从实参**推断**。
:::

这就是 [[program-design/inheritance-polymorphism]] 中提到过的**参数式多态**：一个定义，对一切类型一致地成立。

::: example 一个泛型栈 {#ex-generic-stack}
写一个关于元素类型泛型的栈类，以及一个返回列表第一个元素的泛型函数，并看看 mypy 报告了哪些误用。
::: solution
```python
class Stack[T]:
    """A LIFO stack of elements of type T."""
    def __init__(self) -> None:
        self._items: list[T] = []
    def push(self, x: T) -> None:
        self._items.append(x)
    def pop(self) -> T:
        return self._items.pop()

def first[T](xs: list[T]) -> T:
    return xs[0]

s = Stack[int]()
s.push(1)
s.push("two")
n: int = s.pop()
w: str = first(["a", "b"])
z: int = first(["a", "b"])
```

```console
$ mypy generic.py
generic.py:15: error: Argument 1 to "push" of "Stack" has incompatible type "str"; expected "int"  [arg-type]
generic.py:18: error: Incompatible types in assignment (expression has type "str", variable has type "int")  [assignment]
Found 2 errors in 1 file (checked 1 source file)
```

检查器知道 `s.pop()` 返回 `int`，因为 `s` 是 `Stack[int]`；也知道 `first(["a", "b"])` 是 `str`，因为 `T` 被实例化成了 `str`。这两处错误在程序运行时都不会被 Python 察觉：`s.push("two")` 会成功，栈里只是多了一个字符串。（在 Python 3.12 之前，类型参数用 `T = TypeVar("T")` 声明，泛型类从 `Generic[T]` 派生；两种风格你都会见到。）
:::
:::

类型参数可以**有界**，把它限制在支持某个运算的类型上：`def largest[T: SupportsRichComparison](xs: list[T]) -> T` 会接受任何能用 `<` 比较的东西的列表。泛型代码只能使用每个被允许的类型都支持的运算——对无界的 `T`，只有 `object` 的那些。正是这一限制使该定义在每个实例化处都有效。

::: warning 泛型类型在运行时被擦除
类型实参只为检查器而存在。运行时，`Stack[int]()` 与 `Stack[str]()` 创建的是同一个类的对象，而 `isinstance(x, list[int])` 抛出 `TypeError: isinstance() argument 2 cannot be a parameterized generic`——列表对象不记录它的元素类型，要检查它就得检查每个元素。Java 做了同样的选择（类型擦除，自 2004 年的 Java 5 起）；C++ 模板与 Rust 泛型则为每个实例化编译一份独立的代码副本。
:::

## 接口：名义与结构

**接口**是一个必须提供的运算的具名集合，连同它们的类型。标注为接受某个接口的函数，接受任何提供那些运算的值。类型系统以两种方式之一决定*哪些*值提供一个接口。

::: definition 名义与结构子类型 {#def-subtyping}
类型 $S$ 称为类型 $T$ 的**子类型**，记作 $S <: T$，只要在期望类型为 $T$ 的值之处都可以使用类型为 $S$ 的值。在**名义**子类型中，$S <: T$ 只有当它已被*声明*时才成立，例如通过 `class S(T)`。在**结构**子类型中，只要 $S$ *具备* $T$ 的全部运算且类型相容，$S <: T$ 就成立，无论有没有人声明过它。
:::

Java 与 C# 的接口、Python 的抽象基类都是名义的：一个类通过明说来实现一个接口。Go 的接口与 TypeScript 的对象类型是结构的。Python 两者都给：普通类与抽象基类是名义的，而**协议**（protocol，PEP 544，Python 3.8）是一个结构型接口——鸭子类型（duck typing）的静态形式。

::: example 一个结构型接口 {#ex-protocol}
为"有一个面积"定义一个协议，并检查一个对面积求和的函数，针对满足与不满足该协议的若干类，其中没有一个类继承自该协议。
::: solution
```python
from collections.abc import Sequence
from typing import Protocol
import math

class HasArea(Protocol):
    def area(self) -> float: ...

class Circle:                        # 没有任何基类提到 HasArea
    def __init__(self, r: float) -> None:
        self.r = r
    def area(self) -> float:
        return math.pi * self.r ** 2

class Square:
    def __init__(self, side: float) -> None:
        self.side = side
    def area(self) -> float:
        return self.side ** 2

class Label:
    def __init__(self, text: str) -> None:
        self.text = text

def total_area(shapes: Sequence[HasArea]) -> float:
    return sum(s.area() for s in shapes)

print(round(total_area([Circle(1), Square(2)]), 4))
print(total_area([Square(1), Label("hi")]))
```

```console
$ mypy protocol.py
protocol.py:28: error: List item 1 has incompatible type "Label"; expected "HasArea"  [list-item]
Found 1 error in 1 file (checked 1 source file)
```

`Circle` 与 `Square` 满足 `HasArea`，因为它们有一个返回 `float` 的 `area` 方法；`Label` 不满足，mypy 在程序运行之前就这样说了（若仍然去运行，它打印 `7.1416`，随后以 `AttributeError: 'Label' object has no attribute 'area'` 失败）。
:::
:::

结构类型适合 Python——代码本来就一直是针对"任何有一个 `area` 方法的东西"写的：协议把这一期望记录下来并使它可以检查，而不强迫每个类继承一个共同的基类。名义类型自有其好处：一次声明记录了*意图*，于是一个碰巧有一个名为 `area`、量的却是别的东西的方法的类（[[program-design/inheritance-polymorphism]] 中的 field，以平方米计）不会被误收。

子类型关系是一个**预序**——每个类型都是自身的子类型，且子类型关系具有传递性——而在不同的具名类之间它是一个**偏序**，因为两个不同的类不可能互为对方的子类。

::: widget relation
set: bool; int; str; object
pairs: bool,bool; int,int; str,str; object,object; bool,int; bool,object; int,object; str,object
view: properties
name: <:
caption: 四个 Python 类型上的子类型关系 $S <: T$：`bool` 是 `int` 的子类，每个类都是 `object` 的子类。该关系是自反、反对称且传递的——一个偏序。删去有序对 $(bool, object)$，传递性就被破坏，因为 $bool <: int <: object$；检查器从不需要被告知那一对，因为它已被蕴含。
:::

## 型变

若 `Circle <: Shape`，那么 `list[Circle] <: list[Shape]` 吗？圆的列表是形状的列表，看似显然，但它不是。

::: example 为什么 list 是不变的 {#ex-invariant}
构造一个程序：若 `list[Circle]` 是 `list[Shape]` 的子类型，它就会把一个矩形放进圆的列表里，并看看 mypy 怎么说。然后说明只读的 `Sequence[Circle]` 可以安全地当作 `Sequence[Shape]` 使用。
::: solution
```python
from collections.abc import Sequence

class Shape:
    def area(self) -> float:
        return 0.0

class Circle(Shape):
    def __init__(self, r: float) -> None:
        self.r = r
    def area(self) -> float:
        return 3.14159 * self.r ** 2

class Rect(Shape):
    def __init__(self, w: float, h: float) -> None:
        self.w, self.h = w, h
    def area(self) -> float:
        return self.w * self.h

def add_unit_square(shapes: list[Shape]) -> None:
    shapes.append(Rect(1, 1))        # 对形状的列表来说没问题

def total(shapes: Sequence[Shape]) -> float:
    return sum(s.area() for s in shapes)

circles: list[Circle] = [Circle(1), Circle(2)]
print(total(circles))
add_unit_square(circles)
print([c.r for c in circles])
```

```console
$ mypy variance.py
variance.py:27: error: Argument 1 to "add_unit_square" has incompatible type "list[Circle]"; expected "list[Shape]"  [arg-type]
variance.py:27: note: "list" is invariant -- see https://mypy.readthedocs.io/en/stable/common_issues.html#variance
variance.py:27: note: Consider using "Sequence" instead, which is covariant
Found 1 error in 1 file (checked 1 source file)
```

`add_unit_square` 对 `list[Shape]` 是正确的：向形状的列表追加一个矩形，它仍然是一个形状的列表。若接受一个 `list[Circle]`，这次调用就会把一个 `Rect` 放进 `circles`，而下一行——对圆的列表是正确的——将以 `AttributeError: 'Rect' object has no attribute 'r'` 失败，你若仍去运行程序，发生的就是这个。列表既可读又可写，而写入一个 `Shape` 只有对元素类型至少是 `Shape` 的列表才安全。只读的 `total` 用 `Sequence[Shape]` 被接受了：从圆的序列中读出的每个元素都是一个圆，因而是一个形状。
:::
:::

::: definition 型变 {#def-variance}
设 $C[T]$ 是一个泛型类型且 $S <: T$。则 $C$ 是

- **协变**的，若 $C[S] <: C[T]$（朝同一方向变化）：只读的容器，如 `Sequence`、`Iterable`、`Iterator`、`tuple` 与 `frozenset`，以及函数的结果；
- **逆变**的，若 $C[T] <: C[S]$（朝相反方向变化）：函数的参数；
- **不变**的，若两者一般都不成立：可变容器，如 `list`、`dict` 与 `set`。
:::

函数的规则就是同一段推理用在一次调用上。`Callable[[Shape], float] <: Callable[[Circle], float]`：一个能测量*任何*形状的函数，当然可以用在期望一个测量圆的函数的地方——对实参要求更少的函数适用范围更广。反过来不成立：

```python
from collections.abc import Callable

class Shape:
    def area(self) -> float:
        return 0.0

class Circle(Shape):
    def __init__(self, r: float) -> None:
        self.r = r
    def area(self) -> float:
        return 3.0 * self.r ** 2

def apply_to_circles(f: Callable[[Circle], float], cs: list[Circle]) -> list[float]:
    return [f(c) for c in cs]

def apply_to_shapes(f: Callable[[Shape], float], ss: list[Shape]) -> list[float]:
    return [f(s) for s in ss]

def any_area(s: Shape) -> float:
    return s.area()

def radius(c: Circle) -> float:
    return c.r

print(apply_to_circles(any_area, [Circle(1)]))
print(apply_to_shapes(radius, [Shape()]))
```

```console
$ mypy callables.py
callables.py:26: error: Argument 1 to "apply_to_shapes" has incompatible type "Callable[[Circle], float]"; expected "Callable[[Shape], float]"  [arg-type]
Found 1 error in 1 file (checked 1 source file)
```

`radius` 要求一个圆；`apply_to_shapes` 却会喂给它一个普通的 `Shape`，而它没有半径。这正是 [[program-design/abstraction-specifications#def-stronger]] 的规格说明规则与 [[program-design/inheritance-polymorphism#def-lsp]] 的替换原则在类型上的重述：替换者可以*放宽*它所要求的（逆变的参数），并*加强*它所保证的（协变的结果）。

::: theorem 函数类型的型变 {#thm-function-variance}
若 $A' <: A$ 且 $R <: R'$，则 $\mathrm{Callable}[[A], R] <: \mathrm{Callable}[[A'], R']$。用语言说：函数类型对其参数类型逆变，对其结果类型协变。
:::

::: proof
设 $f$ 具有类型 $\mathrm{Callable}[[A], R]$，并考虑任何一个期望一个类型为 $\mathrm{Callable}[[A'], R']$ 的函数 $g$ 的上下文。这样的上下文对 $g$ 只能做一件事：以类型为 $A'$ 的实参 $a$ 调用它，并把结果用作类型为 $R'$ 的值。用 $f$ 替换 $g$。实参 $a$ 的类型是 $A'$，而 $A' <: A$，所以 $a$ 可以用在期望 $A$ 之处；于是调用 $f(a)$ 类型正确。其结果的类型是 $R$，而 $R <: R'$，所以它可以被用作 $R'$。上下文对 $g$ 的每种用法因此对 $f$ 都有效，这正是 $\mathrm{Callable}[[A], R] <: \mathrm{Callable}[[A'], R']$ 的定义。
:::

可变容器的表现就像一对函数：一个读取器 `get: () -> T`，关于 $T$ 协变；一个写入器 `set: T -> None`，关于 $T$ 逆变。一个既须关于 $T$ 协变又须关于 $T$ 逆变的类型只能是不变的——这就是 `list` 不变、而只有读取器的 `Sequence` 协变的原因。

::: application Java 的协变数组
Java 从第一版（1995）起就让数组协变：`Circle[]` 可以传入期望 `Shape[]` 的地方。为了保持语言的可靠性，对数组的每次存写都在运行时检查，把一个 `Rect` 存进实际类型为 `Circle[]` 的数组会抛出 `ArrayStoreException`。Java 5（2004）加入的泛型集合是不变的，像 Python 的 `list`，用显式的"通配符"（`List<? extends Shape>`）表达协变的只读用法——这提醒我们：型变是一个设计决策，若做得不可靠，是要付出运行时代价的。
:::

## 渐进类型实践

Python 的标注是**渐进的**：有标注与无标注的代码可以自由混合，而类型 `Any` 在两个方向上都与每个类型相容，检查器一遇到它就停止检查。无标注的函数被当作接受并返回 `Any`。这使一个大型程序可以逐个模块地获得类型，从最重要的接口开始；这也正是静态类型到底能被加入 Python 的原因。代价是所有保证都强不过标注本身：一个类型为 `Any` 的值流入有标注的代码，可能夹带走任何类型而无人察觉。

下面是几条按类型设计的守则：

- 先给**接口**加标注：函数签名，尤其是公有函数与类方法的签名。局部变量的类型通常能被推断出来。
- 参数接受能用的最泛化的类型（对只循环的函数用 `Iterable[T]` 而不是 `list[T]`；用一个协议而不是某个具体类），返回符合事实的最具体的类型（`list[int]` 而不是 `Iterable[int]`，调用者才能按下标访问）。这就是协变与逆变的学以致用。
- 让"值的缺失"显式化（`T | None`），并在它产生处就近收窄一次。
- 宁可选择使非法状态无法表示的类型：字段类型确定的冻结数据类，或如 [[program-design/functional-style]] 中表达式树那样的结点类的联合，而不是什么都能装的字典。

::: history
FORTRAN（1957）用首字母区分整型与浮点型变量，ALGOL 60 显式声明类型。罗杰·欣德利（Roger Hindley，1969）与罗宾·米尔纳（Robin Milner，《A theory of type polymorphism in programming》，1978）展示了如何自动推断一个程序最一般的多项态类型，这是 ML 与 Haskell 的基础；让-伊夫·吉拉尔（Jean-Yves Girard，1972）与约翰·雷诺兹（John Reynolds，1974）独立地提出了系统 F，即显式类型参数的理论。卢卡·卡尔代利（Luca Cardelli）与彼得·韦格纳（Peter Wegner）的综述《On understanding types, data abstraction, and polymorphism》（*Computing Surveys*，1985）对本课程用到的多态种类做了分类。Java 于 2004 年获得了泛型。杰里米·西克（Jeremy Siek）与瓦利德·塔哈（Walid Taha）在 2006 年命名并形式化了**渐进类型**；Jukka Lehtosalo 于 2012 年前后开始了 mypy，PEP 484（2014）把类型提示带进 Python 3.5，随后是协议（PEP 544，Python 3.8）与类型参数的方括号语法（PEP 695，Python 3.12，2023）。
:::

## 后续内容

[[program-design/modules-patterns]] 用协议与泛型来描述模块之间的接口。在 [[programming-languages]] 中，类型系统被形式化地定义：给出类型规则，并证明可靠性（进展性与保持性），类型推断则作为算法来研究；[[compilers]] 把类型检查器实现为编译器的一个趟。[[#prop-no-perfect-checker]] 中的不可判定性论证，是 [[theory-of-computation]] 中里斯（Rice）定理的一个实例；而在 [[software-engineering]] 中，类型检查与测试、代码评审并列，成为例行的质量关口。

::: summary
- **类型**是一个值集合连同其运算；**类型错误**是对集合之外的值施加运算（[[#def-type]]）。Python **动态**且**强**地检查类型；mypy 这样的静态检查器在带标注的 Python 运行之前检查它。
- 没有检查器能恰好判定哪些程序会抛出类型错误（[[#prop-no-perfect-checker]]）；可靠的静态类型系统是保守的。
- 标注（`list[int]`、`str | None`、`Callable[[int], bool]`）在运行时被忽略；联合类型在使用前必须**收窄**，这把"空"错误搬到了检查时刻。
- **泛型**（`def first[T](xs: list[T]) -> T`、`class Stack[T]`）给出参数式多态；类型实参在运行时被擦除（[[#def-generic]]）。
- **名义**子类型靠声明，**结构**子类型（协议）则取决于一个类型拥有的运算（[[#def-subtyping]]）。
- **型变**：只读容器与结果协变，参数逆变，可变容器不变（[[#def-variance]]、[[#thm-function-variance]]）——这是类型版本的替换原则。
- Python 的类型标注是**渐进的**：给接口加标注，接受泛化的类型，返回具体的类型，外部数据在运行时验证。
:::

## 习题

::: exercise 哪些会抛出 TypeError？{level=1 check="2"}
下列 Python 表达式中有多少个会抛出 `TypeError`：`"3" + 4`、`"3" * 2`、`[1] * 3`、`1 + True`、`None + 1`、`(1, 2) + (3,)`？（填入数字。）
::: solution
`"3" + 4` 抛出（`str` 与 `int` 没有加法）。`"3" * 2` 是 `"33"`（重复），`[1] * 3` 是 `[1, 1, 1]`。`1 + True` 是 `2`，因为 `bool` 是 `int` 的子类。`None + 1` 抛出。`(1, 2) + (3,)` 拼接元组，得到 `(1, 2, 3)`。有两个表达式抛出。
:::
:::

::: exercise 加标注 {level=1}
给下列函数加标注：(a) `def mean(xs): return sum(xs) / len(xs)`；(b) `def lookup(d, k): return d.get(k)`，字典从字符串到整数；(c) `def apply_twice(f, x): return f(f(x))`，尽可能泛化。
::: solution
(a) `def mean(xs: Sequence[float]) -> float`（用 `Sequence` 因为需要 `len`；`list[float]` 也行，只是更不泛化）。(b) `def lookup(d: dict[str, int], k: str) -> int | None`——`get` 对缺失的键返回 `None`，结果类型必须说明这一点。(c) `def apply_twice[T](f: Callable[[T], T], x: T) -> T`：`f` 必须能接受它自己的结果，所以它的参数类型与结果类型是同一个类型参数。
:::
:::

::: exercise 检查器推断出什么？{level=1}
对 `def first[T](xs: list[T]) -> T`，mypy 为 `first([1, 2])`、`first([[1], [2, 3]])` 与 `first([1, "a"])` 各推断出什么类型？
::: solution
`int`；`list[int]`；至于混合列表，元素类型被推断为 `int` 与 `str` 的最小公共上界，mypy 报告为 `object`（Pyright 报告 `int | str`）。最后这种情形里，收窄之前几乎无法对结果做任何事——这是检查器在说：一个类型混杂的列表让读者无从依赖。
:::
:::

::: exercise 用例子看型变 {level=2 check="3"}
已知 `bool <: int`，下列赋值中可靠的检查器会接受多少个？(a) 把 `list[bool]` 的值赋给类型 `list[int]` 的变量；(b) 把 `Sequence[bool]` 的值赋给 `Sequence[int]`；(c) 把 `Callable[[int], bool]` 的值赋给 `Callable[[bool], int]`；(d) 把 `Callable[[bool], bool]` 的值赋给 `Callable[[int], int]`；(e) 把 `tuple[bool, bool]` 的值赋给 `tuple[int, int]`。（填入数字。）
::: solution
(a) 不接受：`list` 是不变的，而且经由 `list[int]` 这个别名就能向一个布尔值的列表追加 `2`。(b) 接受：`Sequence` 是协变的。(c) 接受：参数类型从 `int` 到 `bool`（逆变要求 $bool <: int$ ✓），结果从 `bool` 到 `int`（协变要求 $bool <: int$ ✓）。(d) 不接受：这个函数只接受布尔值，而变量的类型承诺它可以被任何整数调用。(e) 接受：元组不可变，因而协变。接受三个：(b)、(c) 与 (e)。
:::
:::

::: exercise 一个泛型配对函数与一个协议 {level=2}
(a) 写一个带两个类型参数的泛型函数 `pairs(xs, ys)`，返回对应元素组成的对 `(x, y)` 的列表，并加标注使 `pairs([1, 2], ["a", "b"])` 的类型是 `list[tuple[int, str]]`。(b) 写一个协议 `SupportsClose`，带有方法 `close(self) -> None`，再写一个函数 `close_all`，关闭这样一个可迭代对象中的每个对象。哪些标准对象满足它？
::: solution
```python
from collections.abc import Iterable
from typing import Protocol

def pairs[T, U](xs: list[T], ys: list[U]) -> list[tuple[T, U]]:
    return list(zip(xs, ys))

class SupportsClose(Protocol):
    def close(self) -> None: ...

def close_all(things: Iterable[SupportsClose]) -> None:
    for t in things:
        t.close()

print(pairs([1, 2], ["a", "b"]))
```

```console
$ python3 pairs.py
[(1, 'a'), (2, 'b')]
```

（标准库里已有 `typing.SupportsAbs`、`SupportsInt` 等协议，而 `contextlib.closing` 在运行时依赖同样的结构性想法。）文件对象、套接字与生成器都有一个返回 `None` 的 `close()` 方法，所以它们都从结构上满足 `SupportsClose`，尽管它们没有任何声明此事的共同基类。
:::
:::

::: exercise 泛型类型的运行时检查 {level=2}
一位同事写 `if isinstance(data, list[int]): ...` 来校验从 JSON 文件加载的数据。解释为什么这会失败，并写一个函数 `is_int_list(x: object) -> bool` 完成本想做成的检查。为什么只有当把该函数的返回类型声明为 `TypeGuard[list[int]]`（或 `TypeIs`）时，静态检查器才能用它的结果来收窄 `x`？
::: solution
泛型类型实参会被擦除：列表对象不记录元素类型，所以 Python 拒绝带参数化泛型的 `isinstance`（`TypeError: isinstance() argument 2 cannot be a parameterized generic`）。检查必须考察各个元素：

```python
def is_int_list(x: object) -> bool:
    return isinstance(x, list) and all(type(e) is int for e in x)

print(is_int_list([1, 2]), is_int_list([1, "2"]), is_int_list([True]), is_int_list((1,)))
```

```console
$ python3 isintlist.py
True False False False
```

（`type(e) is int` 排除了 `True`，而 `isinstance(e, int)` 会接受它。）检查器把返回 `bool` 的函数当作不透明的：它无从知道 `True` 意味着"`x` 是一个 `list[int]`"。把返回类型声明为 `TypeGuard[list[int]]`（PEP 647）或 `TypeIs[list[int]]`（PEP 742），是程序员做出的、未经核实的承诺：它确实意味着这个；检查器便据此在 `if` 分支内收窄 `x`。这是可靠性上一个小的、明明白白的缺口，位置恰好在由运行时检查来补上的地方。
:::
:::

::: exercise 可变容器必须是不变的 {level=3}
用一个类型 $\mathrm{Cell}[T]$ 的两个运算 $\mathit{get}\colon () \to T$ 与 $\mathit{set}\colon T \to \mathrm{None}$ 来模拟一个可变单元格。用 [[#thm-function-variance]] 证明：若 $S <: T$ 且 $S \ne T$，则 $\mathrm{Cell}[S] <: \mathrm{Cell}[T]$ 与 $\mathrm{Cell}[T] <: \mathrm{Cell}[S]$ 都无从成立，并对每个方向给出一个会出错的两行程序。假定运算记录的子类型化要求每个运算各自子类型化。
::: solution
$\mathrm{Cell}[S] <: \mathrm{Cell}[T]$ 将要求 $\mathit{get}_S <: \mathit{get}_T$，即 $\mathrm{Callable}[[], S] <: \mathrm{Callable}[[], T]$，由于 $S <: T$ 它由结果的协变成立；并要求 $\mathit{set}_S <: \mathit{set}_T$，即 $\mathrm{Callable}[[S], \mathrm{None}] <: \mathrm{Callable}[[T], \mathrm{None}]$，由逆变这要求 $T <: S$——这是假的，因为 $S <: T$、$S \ne T$ 且不同类类型间的子类型关系是反对称的。程序：给定 `c: Cell[bool]`，把它看作 `d: Cell[int]` 并 `d.set(2)`；于是 `c.get()` 返回 `2`，不是 `bool`。

$\mathrm{Cell}[T] <: \mathrm{Cell}[S]$ 将要求 $\mathit{get}_T <: \mathit{get}_S$，即 $T <: S$——又是假的。程序：给定装着 `2` 的 `c: Cell[int]`，把它看作 `d: Cell[bool]`；于是 `d.get()` 声称返回一个 `bool` 而返回 `2`。

每个运算单独看，各在一个方向上没问题；合在一起就迫使不变。只读视图（只有 `get`）是协变的，只写视图（只有 `set`）是逆变的——Java 的 `? extends T` 与 `? super T` 通配符正是这样把一个列表拆成它的两半。
:::
:::

::: exercise 规格说明与函数子类型 {level=3}
函数类型 $\mathrm{Callable}[[A], R]$ 可以读作一份规格说明：前置条件"实参属于 $A$"，后置条件"结果属于 $R$"。通过核对 [[program-design/abstraction-specifications#def-stronger]] 精化关系的两个条件，证明 [[#thm-function-variance]] 是它的一个特例。与完整的规格说明相比，这一比较对"类型能对函数说多少话"暗示了什么？
::: solution
设 $S_1$ 为 $\mathrm{Callable}[[A'], R']$ 的规格说明：$P_1(x) \equiv x \in A'$，$Q_1(x, y) \equiv y \in R'$；$S_2$ 为 $\mathrm{Callable}[[A], R]$ 的规格说明：$P_2(x) \equiv x \in A$，$Q_2(x, y) \equiv y \in R$。把类型读作值集合、把 $<:$ 读作 $\subseteq$：精化的条件 1，$P_1 \Rightarrow P_2$，说的是 $A' \subseteq A$，即 $A' <: A$；条件 2，在满足 $P_1$ 的输入上 $Q_2 \Rightarrow Q_1$，说的是 $R \subseteq R'$，即 $R <: R'$。这恰好是定理的假设，而它的结论——$f$ 可以替换 $g$——正是 [[program-design/abstraction-specifications]] 的替换定理。

由此可见，类型是一种前后件被限定在"属于检查器看得懂的那些集合"的精化式规格说明。它能说"返回一个 `int`"，却不能说"返回整数平方根""列表是有序的"或"结果非负"。正是这一限制使类型检查对每个程序都能以保守的方式判定，也正是类型与规格说明和测试互补、而非取而代之的原因。更强的类型系统（refinement 类型，以及 Agda、Idris、Lean 等语言中的依赖类型）以检查更困难为代价，把更多规格说明搬进了类型。
:::
:::
