一个画图程序要处理圆、矩形与三角形。第一种设计在每个图形里存一个"种类"标签，并把每个运算写成一条测试链：

```text
def area(s):
    if s.kind == "circle":      return pi * s.r ** 2
    elif s.kind == "rectangle": return s.w * s.h
    elif s.kind == "triangle":  return ...
```

于是 `perimeter` 需要同一条测试链，`draw`、`scale`、`contains_point` 也都一样。当程序加入椭圆时，必须有人找出程序里每一条这样的链，并给每条加上一个分支；被忘记的那一条就成了一个缺陷，只在某个椭圆走到那个函数时才现身。"圆是什么"这一知识散布在每个运算里，而不是放在一处。

面向对象程序设计颠倒了这个布局。每种图形成为一个自带 `area`、`perimeter` 与 `draw` 的类；处理图形的代码调用 `s.area()`，让对象自己决定这意味着什么。加入椭圆意味着加入一个类，而任何既有代码都不必改变。本章解释这一颠倒背后的两个机制——**继承**（通过扩充另一个类来定义一个类）与**动态分派**（在运行时按对象的类选择方法）——以及决定继承何时正确的那个原则：凡是期待其超类的地方，子类都必须可以顶替。我们最后给出反对滥用继承的理由，以及它的替代方案：组合。

## 子类与覆盖

::: definition 子类、继承、覆盖 {#def-subclass}
以 `class D(B):` 定义的类 `D` 是**基类**（或**超类**）`B` 的**子类**（或**派生类**）。`D` **继承**`B` 的每个它自己没有定义的属性；`D` 若定义了与 `B` 的某个方法同名的方法，就**覆盖**（override）它。在 `D` 的方法内部，`super().m(...)` 调用的是倘若 `D` 没有覆盖时本会使用的那个 `m` 的版本。每个类归根结底都是内建类 `object` 的子类。
:::

下面是图形层次结构。基类 `Shape` 放着所有图形共有的东西：一个名字，以及一个用 `area` 与 `perimeter` 写成的 `describe` 方法——这两个量基类自己算不出来。

```python
import math

class Shape:
    """A plane figure.  Subclasses must override area() and perimeter()."""
    def __init__(self, name):
        self.name = name
    def area(self):
        raise NotImplementedError
    def perimeter(self):
        raise NotImplementedError
    def describe(self):
        return f"{self.name}: area {self.area():.2f}, perimeter {self.perimeter():.2f}"

class Circle(Shape):
    def __init__(self, r):
        super().__init__("circle")        # 让 Shape 初始化它那部分
        self.r = r
    def area(self):
        return math.pi * self.r ** 2
    def perimeter(self):
        return 2 * math.pi * self.r

class Rectangle(Shape):
    def __init__(self, w, h):
        super().__init__("rectangle")
        self.w, self.h = w, h
    def area(self):
        return self.w * self.h
    def perimeter(self):
        return 2 * (self.w + self.h)

shapes = [Circle(1), Rectangle(3, 4), Circle(0.5)]
for s in shapes:
    print(s.describe())
print(round(sum(s.area() for s in shapes), 4))
print(isinstance(shapes[1], Shape), issubclass(Circle, Rectangle))
```

```console
$ python3 shapes.py
circle: area 3.14, perimeter 6.28
rectangle: area 12.00, perimeter 14.00
circle: area 0.79, perimeter 3.14
15.927
True False
```

`describe` 只在 `Shape` 里定义了一次，却能为每个图形打印出正确的面积。这是要害所在，它由 [[program-design/classes-objects#def-lookup]] 的查找规则推广到基类后得出。

## 动态分派

::: definition 动态分派 {#def-dispatch}
在方法调用 `obj.m(args)` 中，所运行的方法是**在调用的那一刻**到 `obj` 的类中搜索 `m` 来确定的——先搜这个类本身，再按一个固定的顺序搜它的基类（**方法解析顺序**，见下文）——而不是在调用所书写处源码中点名的那个类里。这种运行时的选择就是**动态分派**。
:::

::: example 跟踪一次分派调用 {#ex-dispatch}
对上面程序中的 `Rectangle(3, 4).describe()` 进行跟踪。
::: solution
1. `Rectangle(3, 4)` 运行 `Rectangle.__init__`，它调用 `super().__init__("rectangle")`——即 `Shape.__init__`——设置 `self.name`，然后设置 `self.w = 3`、`self.h = 4`。
2. `Rectangle` 中没有定义 `describe`；搜索继续在 `Shape` 中进行，找到它，并以 `self` 为该矩形调用 `Shape.describe(self)`。
3. 在 `describe` 内部，`self.area()` 是一次全新的查找，重新从 `self` 的类——`Rectangle`——开始，而不是从 `describe` 的代码写在哪里的 `Shape` 开始。它找到 `Rectangle.area`，返回 `12`。同样，`self.perimeter()` 找到 `Rectangle.perimeter`，返回 `14`。
4. f 串把这两个数格式化成两位小数。

倘若第 3 步从 `Shape` 开始搜索，每个图形都会抛出 `NotImplementedError`。这种"向下调用"进子类的方法称为**模板方法**：基类定下算法的轮廓，子类填入各个步骤。
:::
:::

动态分派正是使**多态**——一段代码作用于许多类型的值——对对象成为可能的东西。循环 `for s in shapes: print(s.describe())` 不知道、也不需要知道存在多少种图形。这常被概括为**开闭原则**（伯特兰·梅耶（Bertrand Meyer），1988）：一个模块应当*对扩展开放*（可以加入新图形）而*对修改关闭*（加入它们不需要改动既有代码）。

多态有好几种，Python 都以某种形式具备：

- **子类型多态**：为一个类编写的代码靠分派对其子类也适用——本章内容；
- **特设多态**（重载）：一个名字对不同类型有互不相干的实现，例如用于数、字符串与列表的 `+`，通过特殊方法选择；
- **参数多态**：对每种类型都一致地工作的代码，例如 `len`，或一个能逆序任何列表的函数——由 [[program-design/types-interfaces]] 的泛型把它明确化。

### 鸭子类型

Python 并不要求多态必须有公共基类。分派按*名字*寻找方法，所以任何带有 `area` 方法的对象都可以传给调用 `s.area()` 的代码：

```python
class Square:                     # 不是 Shape 的子类
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side ** 2

class Field:                      # 一个不相关、却有面积概念的类
    def __init__(self, hectares):
        self.hectares = hectares
    def area(self):
        return self.hectares * 10_000

print(sum(x.area() for x in [Square(3), Field(0.5), Square(1)]))
```

```console
$ python3 duck.py
5010.0
```

这就是**鸭子类型**（"走起路来像鸭子、叫起来像鸭子……"）：重要的是对象支持哪些运算，而不是它声明的类。Python 的大部分内容都是这样工作的——`len` 接受任何有 `__len__` 的东西，`for` 接受任何有 `__iter__` 的东西——它使代码非常可复用。它的风险在反面：没有任何东西事先检查对象是否有那个方法，也没有任何东西检查它的 `area` 是否是调用者以为的含义（这里田地的面积单位是平方米，而正方形的面积单位则取决于边长所用的单位）。[[program-design/types-interfaces]] 展示了**协议**如何让类型检查器静态地检验鸭子类型。

### 抽象基类

上面的 `Shape` 靠抛出 `NotImplementedError` 来表示"子类必须覆盖此方法"，而这只有在那个缺失的方法被调用时才会暴露。标准模块 `abc` 允许一个类声明**抽象方法**；一个带有未被覆盖的抽象方法的类根本无法被实例化。

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self): ...

class Blob(Shape):               # 忘了定义 area
    pass

for cls in (Shape, Blob):
    try:
        cls()
    except TypeError as e:
        print(e)
```

```console
$ python3 abstract.py
Can't instantiate abstract class Shape without an implementation for abstract method 'area'
Can't instantiate abstract class Blob without an implementation for abstract method 'area'
```

错误如今出现在这个不完整的对象被创建之时，而不是很久以后某个不走运的调用者走到缺失方法之时——失败得更早，也更清楚。抽象基类是 Python 与 Java 意义上的**接口**最接近的东西：一组具名的运算，子类承诺提供它们。标准库的 `collections.abc` 定义了许多这样的接口，如 `Sequence`、`Mapping` 与 `Iterable`；从 `collections.abc.Sequence` 派生并定义 `__getitem__` 与 `__len__`，一个类就免费得到 `__contains__`、`__iter__`、`index` 与 `count`，作为继承来的模板方法。

::: quiz
对 `shapes.py` 中的那些类，一位程序员加了 `class Unit(Circle): def area(self): return 1`。`Unit(5).describe()` 返回什么？
- [ ] `circle: area 78.54, perimeter 31.42`
- [x] `circle: area 1.00, perimeter 31.42`
- [ ] `unit: area 1.00, perimeter 31.42`
- [ ] 它抛出 `NotImplementedError`。
::: solution
`Unit` 从 `Circle` 继承 `__init__`，所以 `name` 是 `"circle"` 且 `r = 5`。`describe` 来自 `Shape`；在其内部 `self.area()` 按 `self` 的类——`Unit`——分派，得到 `1`，而 `self.perimeter()` 在 `Unit` 中找不到 `perimeter`，于是用 `Circle.perimeter`，$2\pi\cdot 5 \approx 31.42$。（`Unit` 是一个面积与其半径不相符的圆，这本身就是一种设计上的坏味道——正是下文替换原则的主题。）
:::
:::

## 方法解析顺序

一个类可以有多个基类：`class D(B, C):` 就是**多重继承**。这时基类的搜索顺序就很要紧，在一个**菱形**中尤其如此——两个基类共享一个公共祖先。

```python
class Base:
    def hello(self):  return ["Base"]
class Left(Base):
    def hello(self):  return ["Left"] + super().hello()
class Right(Base):
    def hello(self):  return ["Right"] + super().hello()
class Both(Left, Right):
    def hello(self):  return ["Both"] + super().hello()

print(Both().hello())
print([c.__name__ for c in Both.__mro__])
print(Left().hello())
```

```console
$ python3 diamond.py
['Both', 'Left', 'Right', 'Base']
['Both', 'Left', 'Right', 'Base', 'object']
['Left', 'Base']
```

有两个事实格外醒目。每个类的方法恰好运行一次，尽管 `Base` 沿两条路径都可达。而 `Left` 中的 `super()` 并不总意味着 `Base`：对 `Both` 的实例来说它意味着 `Right`，而对 `Left` 的实例来说它意味着 `Base`。`super()` 的意思是"在该对象类的方法解析顺序中、排在这个类*之后*的下一个类"，正是这一点让一个菱形中的各个类能够**协作**。

::: definition 方法解析顺序 {#def-mro}
类 $C$ 的**方法解析顺序**（MRO）是一个表 $L[C]$，含 $C$ 及其全部祖先各恰好一次，属性按它来搜索。一个令人满意的 MRO 必须具有两条性质：它**对继承单调**——每个类都排在它自己的基类之前——并且它遵守**局部优先序**——若一条 `class` 语句把 $B_1$ 列在 $B_2$ 之前，则 $B_1$ 出现在 $B_2$ 之前。
:::

第一条性质说 $L[C]$ 是继承图的一个拓扑序（边从每个类指向它的各个基类；拓扑排序见 [[data-structures/graph-representations]]）。Python 用 **C3 线性化**计算它，这一算法 1996 年为语言 Dylan 而设计，Python 自 2.3 版起采用。

::: algorithm C3 线性化 {#alg-c3}
**输入：** 一个类 $C$，其基类为 $B_1, \dots, B_k$（按书写顺序），且它们的线性化 $L[B_i]$ 已知。**输出：** $L[C]$。

1. 构造表 $L[B_1], \dots, L[B_k]$ 以及基类本身的表 $B_1 \dots B_k$。
2. 置 $L[C] \gets [C]$。只要某个表非空：
   1. 按上述顺序选出第一个这样的表：它的头部（第一个元素）$h$ 不出现在任何表的*尾部*（除第一位以外的任何位置）中。若这样的表不存在则失败：不存在一致的 MRO。
   2. 把 $h$ 追加到 $L[C]$ 末尾，并把 $h$ 从它出现的每个表中删除。
3. 返回 $L[C]$。
:::

::: example 计算一个 MRO {#ex-c3}
对层次结构 `class A(O)`、`class B(O)`、`class C(O)`、`class D(A, B)`、`class E(B, C)`、`class F(D, E)` 计算 `F` 的 MRO，并用 Python 核对。
::: solution
对只有单个基 $O$ 的类，$L[A] = A\,O$，类似地 $L[B] = B\,O$、$L[C] = C\,O$。

$L[D] = D + \text{合并}(A\,O,\ B\,O,\ A\,B)$：$A$ 不在任何尾部中，取它；于是各表成为 $O$、$B\,O$、$B$，而 $O$ 在 $B\,O$ 的尾部中，于是跳到 $B$；最后是 $O$。所以 $L[D] = D\,A\,B\,O$。类似地 $L[E] = E\,B\,C\,O$。

$L[F] = F + \text{合并}(D\,A\,B\,O,\ E\,B\,C\,O,\ D\,E)$：

| 步骤 | 各表 | 尝试的候选 | 选中 |
|---|---|---|---|
| 1 | $DABO$、$EBCO$、$DE$ | $D$ — 不在任何尾部 | $D$ |
| 2 | $ABO$、$EBCO$、$E$ | $A$ — 不在任何尾部 | $A$ |
| 3 | $BO$、$EBCO$、$E$ | $B$ — 在 $EBCO$ 的尾部中；$E$ — 不在任何尾部 | $E$ |
| 4 | $BO$、$BCO$ | $B$ — 不在任何尾部 | $B$ |
| 5 | $O$、$CO$ | $O$ — 在 $CO$ 的尾部中；$C$ | $C$ |
| 6 | $O$、$O$ | $O$ | $O$ |

所以 $L[F] = F\,D\,A\,E\,B\,C\,O$。在 Python 中，把 `O` 取为一个普通类，`[c.__name__ for c in F.__mro__]` 给出 `['F', 'D', 'A', 'E', 'B', 'C', 'O', 'object']`。注意第 3 步：$B$ 必须等到它的子类 $E$ 就位——这就是单调性在起作用。
:::
:::

::: widget graph
nodes: F@2,4; D@1,3; E@3,3; A@0,2; B@2,2; C@4,2; O@2,0
edges: F>D; F>E; D>A; D>B; E>B; E>C; A>O; B>O; C>O
algorithm: topo
caption: [[#ex-c3]] 的继承图，每个类向它的每个基类各引一条箭头。逐步执行一次拓扑排序：它把每个类都列在它的各个基类之前，这正是对 MRO 的第一条要求。拓扑序存在很多个；C3 选出的那一个还让每条 `class` 语句的各个基类保持书写顺序（$D$ 在 $E$ 前、$A$ 在 $B$ 前、$B$ 在 $C$ 前），得到 $F, D, A, E, B, C, O$。拖动节点可以把图画理顺。
:::

当两条要求冲突时，C3 会失败。设 `class X(A, B)` 与 `class Y(B, A)`，那么类 `class Z(X, Y)` 就需要 $A$ 在 $B$ 之前（为了 $X$）且 $B$ 在 $A$ 之前（为了 $Y$）；Python 予以拒绝：`TypeError: Cannot create a consistent method resolution order (MRO) for bases A, B`。实践中，多重继承最好只用于**混入类（mixin）**：只增加一种能力（比较方法、序列化、日志）的小类，被设计成可组合使用，并且处处调用 `super()`。

## 替换原则

Python 中的继承同时做两件事：它*复用代码*（子类得到基类的方法），并且*声明一种关系*（对每个圆 `isinstance(c, Shape)` 都为真，所以期待一个 `Shape` 的代码会接受一个圆）。第二件事是对基类的每个客户的一个承诺，而它是可能被违背的。

::: definition 行为子类型 {#def-lsp}
若对 $T$ 的每个方法 $m$（连同 $T$ 对它的规格说明）以及 $m$ 在 $T'$ 中的版本，都有：

1. **前置条件不更强：** $\mathit{pre}_T(m) \implies \mathit{pre}_{T'}(m)$；
2. **后置条件不更弱：** 在满足 $\mathit{pre}_T(m)$ 的输入上，$\mathit{post}_{T'}(m) \implies \mathit{post}_T(m)$——包括它可能抛出的异常；
3. **不变式保持：** $T'$ 的每个对象经 $T$ 的抽象函数来看都满足 $T$ 的不变式；
4. **历史保持：** $T'$ 的方法（包括新增的方法）只以 $T$ 的方法所能的方式改变对象的抽象状态。

那么类 $T'$ 是类 $T$ 的**行为子类型**。**利斯科夫替换原则**断言：子类应当是其基类的行为子类型。
:::

条件 1 与 2 恰好是说，子类对每个方法的规格说明精化（refine）基类的规格说明，其含义见 [[program-design/abstraction-specifications#def-stronger]]。因此回报也是同一个。

::: theorem 替换性 {#thm-lsp}
设 $T'$ 是 $T$ 的行为子类型。那么任何在拿到类 $T$ 的对象时正确的客户——也就是说，其正确性论证只用到 $T$ 的各个方法的规格说明与 $T$ 的不变式——在拿到类 $T'$ 的对象时仍然正确。
:::

::: proof
客户的论证由两种类型的步骤组成。*方法调用：*在每次调用 `x.m(args)` 处，论证确立 $\mathit{pre}_T(m)$，此后使用 $\mathit{post}_T(m)$。若 `x` 是一个 $T'$，动态分派会运行 `m` 在 $T'$ 中的版本；由条件 1 与 2，它的规格说明精化 $T$ 的规格说明，于是由 [[program-design/abstraction-specifications]] 的替换定理，它满足 $T$ 的规格说明，该步骤保持有效。*调用之间关于状态的事实：*论证可能使用 $T$ 的不变式（由条件 3 它成立），并且可能假定对象的抽象状态只通过那些调用者能看见、且由 $T$ 的规格说明描述清楚的调用而改变——例如一个不可变的值保持不变。条件 4 保证 $T'$ 的任何方法都不会以任何其他方式改变状态。既然论证的每一步都保持有效，它的结论也是如此。
:::

一个经典的违反情形看起来完全自然。

::: example 正方形不是矩形 {#ex-square}
一个可变的 `Rect` 有方法 `set_width(w)` 与 `set_height(h)`，其规格说明是"把宽（高）设为给定的值；另一个维度不变"。一位程序员派生出 `Square(Rect)`，并为了让正方形保持为正方形而覆盖两个 setter，让它们改变两条边。请给出一个对 `Rect` 正确、对 `Square` 出错的客户。
::: solution
```python
class Rect:
    def __init__(self, w, h):
        self.w, self.h = w, h
    def set_width(self, w):            # Effects：宽 = w；高不变
        self.w = w
    def set_height(self, h):           # Effects：高 = h；宽不变
        self.h = h
    def area(self):
        return self.w * self.h

class Square(Rect):
    def __init__(self, side):
        super().__init__(side, side)
    def set_width(self, w):            # 让正方形保持是正方形……
        self.w = self.h = w
    def set_height(self, h):           # ……但破坏了 Rect 的后置条件
        self.w = self.h = h

def widen(r):
    """Requires: a Rect.  Effects: doubles r's width; returns the factor by which the area grew."""
    before = r.area()
    r.set_width(2 * r.w)
    return r.area() / before

print(widen(Rect(2, 3)), widen(Square(2)))
```

```console
$ python3 square.py
2.0 4.0
```

`widen` 对 `Rect` 是正确的：由 `set_width` 的后置条件，高不变，所以宽加倍则面积加倍。而对 `Square`，被覆盖的 `set_width` 连高也一起改变，违反 [[#def-lsp]] 的条件 2——"高不变"是基类后置条件的一部分——客户的推理随之坍塌：面积增长为四倍。以下备选方案全都好于派生这个子类：把 `Rect` 与 `Square` 都做成不可变的（一个不可变的正方形*确实*是一个不可变矩形的行为子类型，因为已没有可供双方各执一词的 setter），给它们一个不带 setter 的公共基类 `Shape`，或者把"是正方形"做成矩形的一个属性而不是一个类。
:::
:::

::: warning 英语里的"是一个"不是"是一个子类型"
"正方形是一个矩形"、"企鹅是一种鸟"、"有界栈是一个栈"在英语里都成立，而每一句都诱使你去派生一个破坏基类规格说明的子类：`Square.set_width`、抛出异常的 `Penguin.fly()`、当 `Stack.push` 总是成功时 `BoundedStack.push` 却在栈满时拒绝放入元素。该问的问题不是这些字面不上得上，而是基类的**每个客户**是否都会保持正确。若一个子类必须加强前置条件、削弱后置条件或扔掉一个运算，它就不该是子类。
:::

Python 自己的类型大体遵守这条原则。`bool` 是 `int` 的子类，而且确实 `True + True == 2`：每个整数运算对布尔值都如对 $0$ 与 $1$ 一样工作。更有教益的例子是内建容器的子类，它引出本章的第二个大主题。

## 组合优先于继承

继承把一个子类耦合到其基类的*实现*上，而不只是它的规格说明。子类的覆盖版本会被基类的其他方法调用，前提是那些方法恰好调用它们——一个基类很少写进文档的细节。

::: example 一个统计自己写入次数的字典 {#ex-fragile}
写一个统计存入了多少元素的字典，先作为 `dict` 的子类实现并覆盖 `__setitem__`，再用组合实现一遍。
::: solution
```python
class CountingDict(dict):
    def __init__(self, *args, **kwargs):
        self.writes = 0
        super().__init__(*args, **kwargs)
    def __setitem__(self, key, value):
        self.writes += 1
        super().__setitem__(key, value)

d = CountingDict(a=1)                # 存入 'a'
d["b"] = 2                           # 存入 'b'
d.update({"c": 3, "d": 4})           # 存入 'c' 与 'd'
d.setdefault("e", 5)                 # 存入 'e'
print(d.writes, len(d))
```

```console
$ python3 countingdict.py
1 5
```

存入了五个元素，却只数到一次写入。在 CPython 中，`dict.__init__`、`dict.update` 与 `dict.setdefault` 用 C 写成，直接往表里插入而不调用 `__setitem__`，于是覆盖版本被绕过了。这个子类是对是错，取决于其基类的一个实现细节——**脆弱基类问题**。更糟的是，将来的版本可能改变哪些方法经由 `__setitem__` 进行。

组合版本*拥有*一个字典而不是*是*一个字典，并且恰好定义它所支持的那些运算：

```python
class CountingStore:
    """A mapping that counts stores.  Rep: dict self._d, int self.writes."""
    def __init__(self, items=()):
        self._d = {}
        self.writes = 0
        for k, v in dict(items).items():
            self[k] = v
    def __setitem__(self, key, value):
        self.writes += 1
        self._d[key] = value
    def __getitem__(self, key):
        return self._d[key]
    def __len__(self):
        return len(self._d)
    def update(self, other):
        for k, v in dict(other).items():
            self[k] = v

s = CountingStore({"a": 1})
s["b"] = 2
s.update({"c": 3, "d": 4})
print(s.writes, len(s), s["c"])
```

```console
$ python3 countingstore.py
4 4 3
```

每次存入都经过这个类控制的同一个方法，所以无论 `dict` 内部如何运作，计数都由构造保证正确。代价是必须写这些转发方法。（标准库提供了一个折中方案：`collections.UserDict` 是一个用 Python 写成的字典类，它的其他方法确实调用 `__setitem__`——正是为了能被安全地派生。）
:::
:::

**组合**——用被当作属性持有并向其委托的其他对象来构造对象——避开了本章看到的继承的两个问题。它只依赖组件的*接口*，所以组件的实现可以自由改变；它不作任何可替换性的承诺，所以不可能违反替换原则。伽玛（Gamma）、赫尔姆（Helm）、约翰逊（Johnson）与弗利西德斯（Vlissides）把这句话列为他们的《Design Patterns》（1994）的第二条原则："优先使用对象组合，而不是类继承。" 当子类确实是行为子类型、而基类又是*为了*被扩展而*设计*的时候——带模板方法的抽象基类、异常层次结构、混入类——继承仍是合适的工具；其余情形默认用组合。

::: quiz
下列子类中，哪一个是其基类的行为子类型（基类规格说明在方括号中给出）？
- [ ] `ReadOnlyList(list)`，其 `append` 抛出 `TypeError` [`append(x)`：把 `x` 加到末尾]
- [x] `SortedBag(Bag)`，其 `items()` 按递增顺序返回元素 [`items()`：按某种顺序返回元素]
- [ ] `PositiveAccount(Account)`，其 `deposit` 要求金额低于 £1000 [`deposit(a)`：要求 `a > 0`]
- [ ] `Penguin(Bird)`，其 `fly()` 抛出 `CannotFly` [`fly()`：使鸟腾空]
::: solution
`SortedBag.items` 有相同的前置条件和*更强*的后置条件（一个特定的顺序是若干允许的顺序之一），所以它精化基类的规格说明。`ReadOnlyList.append` 与 `Penguin.fly` 削弱后置条件（抛出异常而不是干活），`PositiveAccount.deposit` 加强前置条件。为基类编写的代码在这三者面前都会坏掉。
:::
:::

::: history
Simula 67 在 1967 年引入了子类（"前缀类"）与**虚**过程，子类可以重定义它们——动态分派。Smalltalk-80 把每一次调用都变成一条动态分派的消息。利斯科夫（Liskov）在 1987 年 OOPSLA 会议的大会报告《Data abstraction and hierarchy》中非正式地提出了替换要求，并与周以真（Jeannette Wing）在《A behavioral notion of subtyping》（*ACM TOPLAS*，1994）中给出了精确的定义，其中包括历史规则。梅耶（Meyer）的《Object-Oriented Software Construction》（1988）陈述了开闭原则，以及子类可以削弱前置条件、加强后置条件这条规则。C3 线性化由巴雷特（Barrett）与其合作者发表于《A monotonic superclass linearization for Dylan》（OOPSLA 1996），并被 Python 2.3 在 2003 年采纳。伽玛、赫尔姆、约翰逊与弗利西德斯的《Design Patterns》（1994）论证了组合优于继承。
:::

## 后续内容

[[program-design/types-interfaces]] 让子类型关系对类型检查器可见：名义子类型（声明的基类）、结构子类型（协议，鸭子类型的静态形式），以及决定"子类型的容器何时是一个容器的子类型"的变型规则。[[program-design/modules-patterns]] 汇集由分派与组合构建的设计——策略、观察者、适配器。在 [[programming-languages]] 中，分派、子类型与三种多态被作为类型系统的特征来研究；[[compilers]] 展示分派如何用方法指针表实现。

::: summary
- 子类继承其基类的属性，并可以**覆盖**方法；`super()` 调用下一个类的版本（[[#def-subclass]]）。
- **动态分派**按对象的运行时类选择方法，每次调用都从头开始搜索——所以基类的**模板方法**可以调用子类的步骤（[[#def-dispatch]]）。
- 多态让一段代码对许多类型工作；Python 还加上**鸭子类型**（任何带正确方法的对象都行），而抽象基类在实例化时就能抓住缺失的方法。
- 多重继承下，**MRO** 把每个类排在其基类之前并遵守基类的书写顺序；Python 用 **C3** 计算它（[[#alg-c3]]），而 `super()` 沿着它走。
- **利斯科夫替换原则**：子类不得收紧任何前置条件的接受范围，不得削弱任何后置条件，要保持不变式与历史（[[#def-lsp]]）；这样基类的客户就能保持正确（[[#thm-lsp]]）。一个可变的正方形不是一个矩形。
- 继承把子类耦合到其基类的实现上（**脆弱基类**问题）；除非基类是为扩展而设计的，否则优先使用**组合**。
:::

## 习题

::: exercise 哪个方法在运行？{level=1 check="31"}
这个程序打印什么？（输入数目。）

```python
class A:
    def f(self):  return 1 + self.g()
    def g(self):  return 10
class B(A):
    def g(self):  return 20
class C(B):
    def f(self):  return super().f() * 0 + self.g() + 1
print(B().f() + C().f() - A().f())
```
::: solution
```console
$ python3 which.py
31
```

`B().f()` 运行 `A.f`，其中的 `self.g()` 按 `self` 的类——`B`——分派到 `B.g`：$1 + 20 = 21$。`C().f()` 运行 `C.f`。它的 `super().f()` 找到 `A.f`（经由未定义 `f` 的 `B`），而其中 `self.g()` 再次按 `self` 的类分派——如今是继承了 `B.g` 的 `C`——所以 `super().f()` 是 $21$，乘以 $0$；然后 `self.g() + 1 = 21`。`A().f()` 是 $1 + 10 = 11$。总和为 $21 + 21 - 11 = 31$。
:::
:::

::: exercise 读出一个 MRO {level=1}
对 `class P: pass`、`class Q(P): pass`、`class R(P): pass`、`class S(R, Q): pass`，写出 `S.__mro__`，并说明在一个 `S` 上调用只在 `P` 与 `Q` 中定义过的方法 `m` 时，Python 到哪里去找它。
::: solution
由 C3，$L[S] = S + \text{合并}(R\,P, Q\,P, R\,Q) = S\,R\,Q\,P$，其后是 `object`：`(S, R, Q, P, object)`。对 `m` 的搜索依次经过 $S$、$R$（没找到）、$Q$（找到）：`Q.m` 运行，尽管 $R$ 排在前面、$P$ 也定义了 `m`——$P$ 被排在它的两个子类之后。
:::
:::

::: exercise 总面积 {level=1 check="30.5664"}
给 `shapes.py` 加上类 `Triangle(Shape)`，带边 $a, b, c$，用海伦公式 $\sqrt{s(s-a)(s-b)(s-c)}$（其中 $s = (a+b+c)/2$）计算面积。`[Circle(2), Rectangle(3, 4), Triangle(3, 4, 5), Circle(0)]` 的总面积是多少，保留四位小数？（输入该值。）
::: solution
```python
class Triangle(Shape):
    def __init__(self, a, b, c):
        super().__init__("triangle")
        self.a, self.b, self.c = a, b, c
    def perimeter(self):
        return self.a + self.b + self.c
    def area(self):
        s = self.perimeter() / 2
        return math.sqrt(s * (s - self.a) * (s - self.b) * (s - self.c))
```

各面积是 $4\pi \approx 12.5664$、$12$、$6$（对 3-4-5 直角三角形，$s = 6$ 且 $\sqrt{6\cdot3\cdot2\cdot1} = 6$）以及 $0$，所以总和是 $12.5664 + 12 + 6 + 0 = 30.5664$（保留四位小数；$4\pi = 12.56637\ldots$）。半径为零给出一个合法、退化的圆，而代码无需任何特殊情形就能处理它。
:::
:::

::: exercise 子类能替换吗 {level=2}
对每一对，判断子类方法是否满足 [[#def-lsp]] 的条件 1 与 2。(a) 基类 `sqrt(x)`：要求 $x \ge 0$，返回满足 $\abs{y^2 - x} < 10^{-6}$ 的 $y \ge 0$；子类：不作要求，对负的 $x$ 返回 `nan`，其余情形返回满足 $\abs{y^2 - x} < 10^{-9}$ 的 $y \ge 0$。(b) 基类 `pick(xs)`：要求 `xs` 非空，返回 `xs` 的某个元素；子类：要求 `xs` 非空且有序，返回中位数。(c) 基类 `save(data)`：可能抛出 `IOError`；子类：可能抛出 `IOError` 或 `PermissionError`，其中 `PermissionError` 是 `OSError` 的子类，而 `IOError` 是 `OSError` 的别名。
::: solution
(a) 能。前置条件更弱（任何东西都蕴含它），而在 $x \ge 0$ 上后置条件更强（$10^{-9} < 10^{-6}$）。$x < 0$ 时发生什么与基类的客户无关。
(b) 不能。前置条件更强（它要求输入有序），所以基类的一个传入无序列表的客户会被这个子类坑掉，尽管"中位数"本来是一个可以接受的"某个元素"。
(c) 能。在 Python 3 中，`IOError` 与 `OSError` 是同一个类，而 `PermissionError` 是它的子类，所以"可能抛出 `PermissionError`"包含在"可能抛出 `IOError`"之中：客户的 `except IOError:` 两者都能捕获。倘若子类抛出该层次之外的一个新异常，它就削弱了后置条件。
:::
:::

::: exercise 不可能的 MRO {level=2}
用 [[#alg-c3]] 说明当 `class X(A, B)` 与 `class Y(B, A)` 时，`class Z(X, Y)` 为何失败。然后用一句话解释，为什么任何线性化都无法同时满足 [[#def-mro]] 的两条要求。
::: solution
$L[X] = X\,A\,B\,O$ 且 $L[Y] = Y\,B\,A\,O$（$O$ = `object`）。$L[Z] = Z + \text{合并}(X\,A\,B\,O,\ Y\,B\,A\,O,\ X\,Y)$。取 $X$（不在任何尾部），于是各表成为 $A\,B\,O$、$Y\,B\,A\,O$、$Y$；$A$ 在 $Y\,B\,A\,O$ 的尾部中，于是试 $Y$：不在任何尾部，取它。现在是 $A\,B\,O$ 与 $B\,A\,O$：$A$ 在第二个表的尾部中，$B$ 在第一个表的尾部中，而 $O$ 不是头部。没有可接受的头部，于是 C3 失败。任何顺序都不可能成功：$X$ 的局部优先序要求 $A$ 在 $B$ 之前，$Y$ 的要求 $B$ 在 $A$ 之前，而两者都是 $Z$ 的祖先，所以 $L[Z]$ 就得按两种顺序同时包含它们。
:::
:::

::: exercise 有界栈 {level=2}
`Stack.push(x)` 的规格说明是"把 `x` 压到栈顶；总是成功"。一个容量为 $n$ 的 `BoundedStack(Stack)` 在栈满时抛出 `OverflowError`。解释它为什么不是行为子类型，并给出两个既保持有界、又遵守替换原则的设计。
::: solution
这个子类削弱了后置条件（等价地，添加了一条前置条件"不满"）：`Stack` 的一个依赖"总是成功"、压入 $n + 1$ 个元素的客户会失败。遵守该原则的设计：(1) 修改*基类*的规格说明为"把 `x` 压到栈顶，若栈满则抛出 `OverflowError`"，使无界栈成为永不抛出这一特例，客户必须处理这个异常；(2) 不用继承关联这两个类：把 `BoundedStack` 做成一个*使用*列表的独立类（组合），最多共享一个其 `push` 规格说明允许失败的抽象基类。两种设计中，需要无界行为的客户都通过它们所用的类型被告知自己会得到什么。
:::
:::

::: exercise 子类型关系是传递的 {level=3}
证明：若 $T''$ 是 $T'$ 的行为子类型且 $T'$ 是 $T$ 的行为子类型，则对 [[#def-lsp]] 的条件 1 与 2，$T''$ 是 $T$ 的行为子类型。为什么层级深于一层的类层次要保证安全，就必须要有这一点？
::: solution
取定 $T$ 的一个方法 $m$；它也是 $T'$ 与 $T''$ 的一个方法（继承而来或被覆盖）。条件 1：$\mathit{pre}_T \Rightarrow \mathit{pre}_{T'} \Rightarrow \mathit{pre}_{T''}$。条件 2：取一个满足 $\mathit{pre}_T$ 的输入与一个满足 $\mathit{post}_{T''}$ 的结果。该输入满足 $\mathit{pre}_{T'}$（由 $T'$ 与 $T$ 之间的条件 1），于是 $T''$ 与 $T'$ 之间的条件 2 给出 $\mathit{post}_{T'}$，接着 $T'$ 与 $T$ 之间的条件 2（在同一输入上，它满足 $\mathit{pre}_T$）给出 $\mathit{post}_T$。这就是 [[program-design/abstraction-specifications]] 的习题中证明过的精化关系的传递性。

之所以必须有这一点，是因为 `isinstance` 是传递的：$T''$ 的实例在任何期待 $T$ 的地方都被接受，而不必有人去检查中间那一层。若可替换性只在相邻两层之间成立，$T$ 的一个客户就可能收到一个沉在下下层的、其行为无法依赖的对象。
:::
:::

::: exercise 安全的计数字典 {level=3}
像 [[#ex-fragile]] 那样派生 `collections.UserDict` 来统计写入，并验证构造方法、元素赋值、`update` 与 `setdefault` 全都被计数。然后解释这个子类为什么比 `dict` 的子类更安全，以及它仍然依赖什么。
::: solution
```python
from collections import UserDict

class CountingDict(UserDict):
    def __init__(self, *args, **kwargs):
        self.writes = 0
        super().__init__(*args, **kwargs)
    def __setitem__(self, key, value):
        self.writes += 1
        super().__setitem__(key, value)

d = CountingDict(a=1)
d["b"] = 2
d.update({"c": 3, "d": 4})
d.setdefault("e", 5)
print(d.writes, len(d), dict(d))
```

```console
$ python3 userdict.py
5 5 {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5}
```

`UserDict` 用 Python 写在 `MutableMapping` 抽象基类之上，后者的 `update` 与 `setdefault` 是实现为调用 `self[key] = value` 的模板方法；而 `UserDict.__init__` 会调用 `update`。让每次写入都经由 `__setitem__` 进行，是这些类*有文档的设计决策*，做出这一决策正是为了让子类能覆盖那一个方法——而这正是继承得以安全的条件。这个子类仍然依赖那个决策（以及 `self.writes` 要在 `super().__init__` 运行之前设好，因为构造方法已经在存元素了）；它依赖的是一份公开的契约，而不是 C 实现的一次偶然。
:::
:::
