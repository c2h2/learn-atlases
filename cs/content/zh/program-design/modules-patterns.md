1972 年，戴维·帕纳斯（David Parnas）发表了一篇关于一个小程序的短论文：一个“KWIC 索引”生成器，它读入一组标题，产出每个标题的所有循环移位——“Program Design Course”、“Design Course Program”、“Course Program Design”——按字母序排列，好让读者能凭标题的任何一个词找到它。他在文中描述了把该程序划分为模块的两种方式。两种都可行；两种都能让一个小团队花一两周写出来。它们的差别在于**之后**会发生什么——当有人想要改变标题的存储方式，或者惰性计算移位而不是一次全部算出，或者按不同的字母表排序时。第一种设计中，几乎每个模块都要为这些改动逐一修改；第二种设计中，每次都恰好只有一个模块要改。

差别不在模块内部的代码，而在边界画在哪里。这最后一章讲的就是如何画这些边界：**模块**以及 Python 如何实现它们，帕纳斯的**信息隐藏**准则，**耦合**与**内聚**这两个度量，程序的**依赖图**以及它为什么必须无环，还有**设计模式**——对反复出现的设计问题的命名、可复用的解法，其中有好几个你早已见过它们改头换面的样子。

## Python 中的模块

::: definition 模块、接口与实现 {#def-module}
**模块**是一个带有名字、一组定义和一个边界的程序文本单元：一个**接口**——其他模块可以使用的名字——以及一个**实现**——其余的一切——实现是其他模块不得依赖的部分。在 Python 中，模块就是一个文件 `name.py`；执行 `import name` 会在一个全新的命名空间里把该文件运行一次，并把 `name` 绑定到所得的**模块对象**上，它的属性就是文件的顶层名字。
:::

Python 的导入机制有几条值得精确了解的规则。

- 在一次程序运行中，模块只会在**第一次**被导入时执行。模块对象随后被缓存进字典 `sys.modules`，之后每一次 `import name` 都返回这个缓存对象，而不会再运行该文件。
- `import name` 绑定模块本身；`from name import f` 把 `f` 绑定到模块中 `f` 的当前值；`import name as n` 以另一个名字绑定模块。
- 在模块内部，变量 `__name__` 保存着模块的名字——如果文件是作为程序运行的，它就是字符串 `"__main__"`。因此惯用法 `if __name__ == "__main__":` 标记的是只在文件被直接执行时才运行的代码，例如演示代码或命令行入口点。
- 以下划线开头的名字按惯例是内部的，正如类的属性一样；可选的列表 `__all__` 给出公开接口（它控制 `from name import *`，并记录设计意图）。

::: example 一个模块及其客户 {#ex-module}
编写一个温度换算模块，带一个有文档的接口和一个私有辅助函数，再写一个以三种方式导入它的客户程序。客户程序运行时打印什么？模块自己运行时又打印什么？
::: solution
```python
# file: temperature.py
"""Conversions between temperature scales."""

__all__ = ["c_to_f", "f_to_c"]

_ABSOLUTE_ZERO_C = -273.15             # 内部名字：不属于接口

def c_to_f(c):
    """Requires: c >= -273.15.  Effects: returns c in degrees Fahrenheit."""
    _check(c)
    return c * 9 / 5 + 32

def f_to_c(f):
    """Effects: returns f degrees Fahrenheit in degrees Celsius."""
    return (f - 32) * 5 / 9

def _check(c):
    if c < _ABSOLUTE_ZERO_C:
        raise ValueError(f"{c} is below absolute zero")

print("loading temperature, __name__ =", __name__)

if __name__ == "__main__":             # 仅当作为程序运行时
    print(c_to_f(100))
```

```console
$ python3 temperature.py
loading temperature, __name__ = __main__
212.0
```

```python
# file: report.py
import temperature
from temperature import f_to_c
import temperature as t

print(temperature.c_to_f(37), round(f_to_c(98.6), 2), t is temperature)
```

```console
$ python3 report.py
loading temperature, __name__ = temperature
98.6 37.0 True
```

直接运行时，模块看到的 `__name__` 是 `"__main__"`，于是运行它的演示代码。被导入时，它看到的是自己的名字，于是演示代码被跳过——而它虽然被导入了三次，*加载*却只有一次：那条消息只出现一次，而 `t` 与 `temperature` 是同一个模块对象。在真实模块里于顶层放一条 `print` 会是个坏主意（导入不应有可见的副作用）；这里只是为了显示文件何时运行才这么做。
:::
:::

**包**是模块的目录，通常带一个在包被导入时运行的文件 `__init__.py`：`import shop.pricing` 先加载 `shop/__init__.py`，再加载 `shop/pricing.py`。在包内部，**相对导入**——如 `from . import pricing` 或 `from .pricing import price`——指明兄弟模块，而无需重复包名。包为大型程序提供层次化的命名空间——标准库的 `collections.abc`、`email.mime.text` 与 `concurrent.futures` 就是例子——也是 Python 代码的发布单位。

## 信息隐藏

一个模块应当包含什么？帕纳斯的回答是软件设计中影响最深远的一句话。

::: definition 信息隐藏 {#def-information-hiding}
**信息隐藏**是这样一条分解系统的准则：让每个模块都对其余所有模块隐藏一个**设计决策**——通常是一个难以定夺或很可能改变的决策。它的接口尽可能少地透露那个决策；其他每个模块只依赖接口。
:::

值得拥有自己模块的决策包括：一个数据结构的表示（抽象数据类型就是把信息隐藏应用于数据，[[program-design/abstract-data-types]]）；一个文件或一条网络消息的格式；一个有多种解法的任务中算法的选择；与硬件、操作系统或外部服务的接口；以及可能改变的策略，例如价格、税收规则或用户界面文本。

::: example KWIC 的两种分解 {#ex-kwic}
帕纳斯的第一种分解遵循计算的步骤：(1) *Input* 把标题读入一个共享的字符数组；(2) *Circular shift* 在该数组之上建立一个由 (标题, 起始词) 对组成的索引；(3) *Alphabetise* 对索引排序；(4) *Output* 打印这些移位；(5) 一个 *Master control* 依次调用它们。他的第二种分解包含模块 (1′) *Line storage*，提供“第 $\ell$ 行第 $i$ 个词的第 $j$ 个字符”，并隐藏行的存储方式；(2′) *Input*，调用 line storage 来存储标题；(3′) *Circular shifter*，为“移位后的行”提供同类接口，隐藏它们是预先算好还是按需计算；(4′) *Alphabetiser*，提供“按字母序的第 $i$ 行”，隐藏排序算法以及排序是否一次完成；(5′) *Output* 与 (6′) *Master control*。对下面每项改动，每种设计中哪些模块必须修改？

(a) 紧凑地存储标题——每个字存四个字符——而不是每个数组单元存一个字符。(b) 按需计算循环移位，而不是存储一个索引。(c) 只在某行被请求时才排序，而不是一次全部排好。
::: solution
在第一种设计中，每个读取共享数组或移位索引的模块都依赖它们的确切格式。

| 改动 | 第一种设计（处理步骤） | 第二种设计（隐藏的决策） |
|---|---|---|
| (a) 存储格式 | Input, Circular shift, Alphabetise, Output | Line storage |
| (b) 移位按需计算 | Circular shift, Alphabetise, Output | Circular shifter |
| (c) 惰性排序 | Alphabetise, Output（还有 Master control，它安排各步骤的顺序） | Alphabetiser |

在第二种设计中，每项改动都被限制在隐藏那个决策的唯一一个模块里。两种设计甚至可能在运行时由完全相同的代码构成；不同的是对每个决策而言，哪段代码*知道*它。注意 (b) 与 (c) 正是 [[program-design/iterators-generators]] 中惰性对急切的选择：形如“给我第 $i$ 行”或“给我下一行”的接口让实现者保有选择的自由，而形如“数组在这里”的接口则没有。
:::
:::

### 耦合与内聚

有两个互补的度量用来评判一个分解的好坏，它们由韦恩·史蒂文斯（Wayne Stevens）、格伦福德·迈尔斯（Glenford Myers）与拉里·康斯坦丁（Larry Constantine）于 1974 年提出。

::: definition 耦合与内聚 {#def-coupling}
**耦合**度量一个模块对其他模块的依赖程度：依赖多少个，以及每个依赖多少。**内聚**度量一个模块的各个部分归属一起、服务于单一目的的程度。好的设计在模块之间**低耦合**，在每个模块内部**高内聚**。
:::

耦合有多种类型，从轻到重：

- **数据耦合**——模块之间只通过参数与结果交换简单值（`f_to_c(98.6)`）；
- **标记耦合**——它们传递一个结构，而接收方只使用其中一部分，于是接收方依赖该结构的布局；
- **控制耦合**——一个模块传入一个标志来选择另一个模块内部做什么（`process(data, mode=3)`），于是调用者必须知道被调用者的逻辑；
- **公共耦合**——它们共享全局变量，于是其中任何一个都能影响所有其他模块；
- **内容耦合**——一个模块伸手进入另一个模块的内部（`other._cache.clear()`），破坏了后者的不变式。

内聚同样有一个范围：从**功能内聚**（模块中的一切服务于一个定义明确的任务，比如 `temperature`）一路向下到**偶然内聚**（一个塞满互不相关的小函数的 `utils.py`，为每一个理由而改变）。信息隐藏让这两个度量都朝正确的方向走：一个只负责一个决策的模块在构造上就是内聚的；而既然没有别的模块知道那个决策，也就没有别的模块与它耦合。

### 依赖图

若模块 $A$ 使用模块 $B$ 接口中的任何名字，就说 $A$ **依赖** $B$。**依赖图**为每个模块设一个顶点，并为每条依赖设一条边 $A \to B$。它的形状很重要：模块必须按某种顺序被加载、初始化、编译与测试，使得每个模块都排在它所使用的那些模块之后。

::: theorem 依赖顺序 {#thm-dependency-order}
一个有限的模块集合能被排成一张表，使每个模块都出现在它所依赖的全部模块之后，当且仅当依赖图不含有向环。
:::

::: proof
**必要性。** 假设存在这样一张表，并且存在环 $M_1 \to M_2 \to \cdots \to M_k \to M_1$。每个模块都排在环中它的下一个之后，于是 $M_1$ 排在 $M_2$ 之后，$M_2$ 排在 $M_3$ 之后，……，直到排在 $M_1$ 之后——于是 $M_1$ 排在它自己之后，这是不可能的。

**充分性。** 对模块个数 $n$ 作归纳。$n = 0$ 时，空表即可。对 $n \ge 1$，先找一个不依赖任何其他模块的模块 $S$：从任意模块出发，沿依赖边走；由于没有环，任何模块都不会被访问两次，所以这条行走至多 $n$ 步，停在一个没有出边的模块上。把 $S$ 放在第一位。剩下的 $n - 1$ 个模块仍然无环，于是由归纳假设它们能被排成一个合法顺序；把那张表接在 $S$ 之后，就得到全部 $n$ 个模块的合法顺序，因为 $S$ 不依赖任何东西，而其余模块中没有一个依赖排在它后面的模块。
:::

这个证明本身就是一个算法——反复移除一个没有剩余依赖的模块——也是 [[data-structures/graph-representations]] 中**拓扑排序**的一个变体。

::: widget graph
nodes: app@2,4; ui@0.5,2.5; storage@3.5,2.5; model@1,0.5; config@3,0.5
edges: app>ui; app>storage; ui>model; ui>config; storage>model; storage>config
algorithm: topo
caption: 一个小型应用的依赖图，每个模块到它导入的每个模块都有箭头指出。一步步走完这个拓扑排序：它把每个模块都列在它依赖的模块之前（`app` 在最前）。把这个顺序倒过来读，就得到一个合法的构建与初始化顺序——被依赖者在前：这里是 `model` 与 `config` 先于 `ui` 与 `storage`，`app` 最后。拖动 `config`，再在脑中补上一条假想的边 `config → app`：图中就会出现一个环，由 [[#thm-dependency-order]] 可知，任何合法顺序都将不复存在。
:::

Python 以最艰苦的方式发现环：在运行时。当模块 $A$ 导入 $B$ 而 $B$ 又导入 $A$ 时，后一次导入会在 `sys.modules` 中找到 $A$，但它只*执行了一部分*，导入行以下定义的名字还不存在。

```python
# file: pricing.py
from customers import discount_for

def price(customer, amount):
    return amount * (1 - discount_for(customer))
```

```python
# file: customers.py
from pricing import price             # 只有 preview() 需要它

VIP = {"ada"}

def discount_for(customer):
    return 0.1 if customer in VIP else 0.0

def preview(customer):
    return price(customer, 100)
```

```python
# file: main.py
import pricing
print(pricing.price("ada", 50))
```

```console
$ python3 main.py
Traceback (most recent call last):
  File ".../main.py", line 2, in <module>
    import pricing
  File ".../pricing.py", line 2, in <module>
    from customers import discount_for
  File ".../customers.py", line 2, in <module>
    from pricing import price             # needed only by preview()
    ^^^^^^^^^^^^^^^^^^^^^^^^^
ImportError: cannot import name 'price' from 'pricing' (consider renaming '.../pricing.py' if it has the same name as a library you intended to import)
```

`main` 开始加载 `pricing`，`pricing` 的第一行开始加载 `customers`，而 `customers` 的第一行向 `pricing`——它已登记在案，却还没越过自己的第一行——索要 `price`，而 `price` 还不存在。（每个文件的第 2 行是 `# file:` 注释之后的第一行代码。Python 3.14 报错信息里关于改名的提示在这里是个烟雾弹；较早的版本会说 "from partially initialized module 'pricing' (most likely due to a circular import)"。）把导入移进 `preview` 也能让程序跑起来，但那样做掩盖了真正的问题：这两个模块在两个方向上互相耦合。更好的修法是重画边界，让依赖只指向一个方向：`preview` 讲的是价格，应当属于 `pricing`；这样一来 `customers` 就什么都不依赖了。

::: warning 循环依赖是设计异味
一个导入环意味着两个模块无法被分别理解、测试或复用：每个都需要对方。Python 有时会容忍环（当名字只在函数内部、两个模块都加载完成之后才被使用），所以环可能悄悄潜伏着，直到某人重排一条导入才暴露。要把每个环都当作一个请求：要么移动一个定义，要么把共享部分抽进第三个模块让两者都导入它，要么通过把一个函数或对象作为参数传入来代替导入，从而反转依赖。
:::

::: quiz
模块 `report` 调用 `stats.mean(xs)`，还读取 `stats._cache` 来查看某个值此前是否已被算出。模块 `stats` 有一个函数 `summary(xs, mode)`，其中 `mode` 取 `1` 表示均值、`2` 表示中位数、`3` 表示两者都要。这里存在哪些类型的耦合？
- [ ] 只有数据耦合
- [x] 内容耦合与控制耦合
- [ ] 只有公共耦合
- [ ] 只有标记耦合
::: solution
读取另一个模块内部的 `_cache` 是内容耦合：`report` 依赖 `stats` 的实现方式，缓存一改它就会坏。用一个 `mode` 标志选择被调用者的内部行为，这是控制耦合。单独的调用 `stats.mean(xs)` 是数据耦合，最轻的一种。要去掉较重的那两种，就得给 `stats` 一个公开的观察器来满足 `report` 的需要，并把 `summary` 拆成几个独立的函数。
:::
:::

## 设计模式

有些设计问题在一个又一个程序中反复出现：一个应当可以互换的算法；许多需要获知某个事件的相关方；一个对象，其接口对必须使用它的那段代码来说是错的。有经验的设计者以类似的方式解决它们，而给这些解法起名字，便于教授、识别和讨论。

::: definition 设计模式 {#def-pattern}
**设计模式**是对一个反复出现的设计问题的命名描述、这个问题的解法的核心——参与的函数或对象以及它们如何协作——以及采用它的后果与权衡。伽玛（Gamma）、赫尔姆（Helm）、约翰逊（Johnson）与弗利西德斯（Vlissides）的 23 个模式目录（1994）把模式分为**创建型**（对象如何创建）、**结构型**（对象如何组合）与**行为型**（职责与通信如何划分）三类。
:::

你其实已经用过了好几个模式：**迭代器**（Iterator，[[program-design/iterators-generators]]）在不暴露表示的前提下对集合提供顺序访问；**模板方法**（Template method，[[program-design/inheritance-polymorphism]]）把算法的轮廓固定在基类里，让子类填入其中的步骤；**工厂方法**（Factory method）曾以替代构造方法 `Time.from_minutes` 的身份出现在 [[program-design/classes-objects]] 中；而**装饰器**（Decorator）——包住一个对象、在保持其接口的同时添加行为——正是 Python 的函数装饰器对函数所做的事（[[program-design/higher-order-functions]]）。下面再介绍三个。

### 策略（Strategy）

**问题：** 一个计算有多种可互换的变体——定价规则、排序顺序、压缩方法——而使用它的代码不应依赖于选中了哪一种。**解法：** 为这个变体定义一个接口，分别实现每个变体，再把要用的那个变体交给客户。在函数即值的 Python 里，一个策略通常就是一个函数。

::: example 定价策略 {#ex-strategy}
一家商店的结账功能要支持多条定价规则，按顾客或按促销活动选择。用可互换的策略实现结账，并计算同一个购物篮在各策略下的总价。
::: solution
```python
from collections.abc import Callable
from dataclasses import dataclass

@dataclass(frozen=True)
class Item:
    name: str
    price: float
    quantity: int

type Pricing = Callable[[list[Item]], float]       # 策略接口

def full_price(items: list[Item]) -> float:
    return sum(i.price * i.quantity for i in items)

def bulk_discount(items: list[Item]) -> float:     # 数量达 10 及以上的行打九折
    return sum(i.price * i.quantity * (0.9 if i.quantity >= 10 else 1) for i in items)

def three_for_two(items: list[Item]) -> float:     # 每第三个单位免费
    return sum(i.price * (i.quantity - i.quantity // 3) for i in items)

class Checkout:
    def __init__(self, pricing: Pricing = full_price) -> None:
        self.items: list[Item] = []
        self.pricing = pricing                      # 组合，而非继承
    def add(self, item: Item) -> None:
        self.items.append(item)
    def total(self) -> float:
        return round(self.pricing(self.items), 2)

basket = [Item("pen", 1.20, 12), Item("pad", 3.50, 3)]
for strategy in (full_price, bulk_discount, three_for_two):
    c = Checkout(strategy)
    for item in basket:
        c.add(item)
    print(f"{strategy.__name__:>14}: {c.total():6.2f}")
```

```console
$ python3 strategy.py
    full_price:  24.90
 bulk_discount:  23.46
 three_for_two:  16.60
```

结账代码对任何定价规则都一无所知；新的促销就是一个新的函数，无须改动 `Checkout` 即可加入（[[program-design/inheritance-polymorphism]] 的开闭原则）。类型别名 `Pricing`（用 Python 3.12 的 `type` 语句书写）记录了每个策略必须满足的接口。在一门没有一等功能函数的语言里，每个策略都会是实现单方法接口的一个类；在 Python 里，只有当策略需要状态、或有若干相关操作时，这样做才值得。
:::
:::

作为参数传入的策略，也是为测试切断依赖的最干净的方式：一个需要当前时间的函数可以把 `now: Callable[[], datetime]` 作为形参，默认值取 `datetime.now`，于是测试可以传入一个返回固定时间的函数。这就是**依赖注入**：模块接收它所依赖的东西，而不是自己去导入，于是那条依赖边就从图上消失了。

### 观察者（Observer）

**问题：** 当一个对象改变时，一批数目不设上限的其他对象必须作出反应——显示界面、日志、警报——而这个发生改变的对象不应依赖它们中的任何一个。**解法：** **主题**（subject）维护一个**观察者**（observer）列表（在 Python 中通常是一些可调用对象），并在每次变化时通知它们中的每一个；观察者在运行时**订阅**与**退订**。

::: example 带观察者的恒温器 {#ex-observer}
实现一个恒温器，它的温度每次变化都通知订阅者，并提供一种退订的途径；再接上一个日志、一个显示界面和一个风扇控制器。
::: solution
```python
class Thermostat:
    """Subject: notifies every subscriber of each change of temperature."""
    def __init__(self) -> None:
        self._observers = []
        self._temp = None

    def subscribe(self, callback):
        """Effects: callback(t) will be called on each change; returns an unsubscribe function."""
        self._observers.append(callback)
        return lambda: self._observers.remove(callback)

    def set_temperature(self, t):
        if t != self._temp:
            self._temp = t
            for notify in list(self._observers):   # 一个副本：观察者可能退订
                notify(t)

log = []
th = Thermostat()
th.subscribe(log.append)
cancel_display = th.subscribe(lambda t: print("display:", t))
th.subscribe(lambda t: print("fan on") if t > 25 else None)

th.set_temperature(21)
th.set_temperature(21)         # 未变化：没有人收到通知
th.set_temperature(27)
cancel_display()
th.set_temperature(19)
print(log)
```

```console
$ python3 observer.py
display: 21
display: 27
fan on
[21, 27, 19]
```

恒温器不依赖任何观察者：它只是调用交给它的那些可调用对象，接口不过是“一个参数的函数”。依赖从观察者指向主题，从不反向，因此可以添加新的观察者种类而无需改动主题。遍历列表的一份*副本*是有讲究的：否则，一个在通知期间退订自己的观察者就会改动正在被遍历的那个列表。这个模式众所周知的代价也在这里显形：通知顺序就是订阅顺序，一个观察者中的异常会拦住其余的观察者，而一个从不退订的观察者会因主题的列表而始终可达、无法回收（这是长时间运行程序中内存泄漏的一个常见来源；`weakref` 可以提供帮助）。
:::
:::

观察者是图形用户界面（按钮的“点击时”处理函数）、电子表格（单元格观察它们所依赖的单元格）以及 [[distributed-systems]] 中发布-订阅系统的骨架。

### 适配器（Adapter）

**问题：** 一个已有的类功能合适，但接口对必须使用它的那段代码来说是错的，而你既不能改这个类，也不能改那段代码。**解法：** 写一个小小的**适配器**，它持有那个已有对象并翻译调用——又是组合。

```python
import math

class LegacyPlot:                       # 来自一个我们无法修改的库
    def __init__(self, width_m, depth_m):
        self.width_m, self.depth_m = width_m, depth_m
    def get_size_m2(self):
        return self.width_m * self.depth_m

class PlotAdapter:
    """Presents a LegacyPlot through the HasArea interface (area in m^2)."""
    def __init__(self, plot):
        self._plot = plot
    def area(self):
        return self._plot.get_size_m2()

class Circle:
    def __init__(self, r):
        self.r = r
    def area(self):
        return math.pi * self.r ** 2

def total_area(shapes):                 # 期待带 .area() 的对象
    return sum(s.area() for s in shapes)

print(round(total_area([Circle(1), PlotAdapter(LegacyPlot(3, 4))]), 4))
```

```console
$ python3 adapter.py
15.1416
```

`total_area` 是针对 [[program-design/types-interfaces]] 的 `HasArea` 协议编写的；适配器让那个遗留类不去修改任何一方就满足该协议，并把翻译——包括任何单位换算——收拢在一个地方。

::: warning 模式是工具，不是目标
一个模式凭借解决程序实际存在的问题才赢得立足之地。为一条永远不会变的规则引入策略，或为一个单独的监听者引入观察者，只会增加一层每个读者都必须穿过的间接。1994 年目录里的许多模式是为 C++ 与 Smalltalk 写的，它们在一等功能函数与动态类型的语言里会缩成一行，或者干脆消失——诺维格（Norvig）在 1996 年观察到，23 个模式中有 16 个在 Lisp 或 Dylan 里变得更简单或“隐于无形”，Python 也差不多。要把模式当作一套设计的词汇表以及它们带来的权衡来学，并从那个足以隐藏可能改变之决策的最简单代码出发。
:::

::: history
帕纳斯的《On the criteria to be used in decomposing systems into modules》（*Communications of the ACM*，1972 年 12 月）以本章使用的 KWIC 例子引入了信息隐藏。韦恩·史蒂文斯（Wayne Stevens）、格伦福德·迈尔斯（Glenford Myers）与拉里·康斯坦丁（Larry Constantine）的《Structured design》（*IBM Systems Journal*，1974）引入了耦合与内聚。语言把模块造了出来：Modula-2（尼克劳斯·维尔特（Niklaus Wirth），1978）与 Ada（1983）拥有分别编译、接口显式的模块，Python 的模块与包在 1990 年代接踵而至。建筑师克里斯托弗·亚历山大（Christopher Alexander）的《A Pattern Language》（1977）描述了建筑与城镇里反复出现的解法；肯特·贝克（Kent Beck）与沃德·坎宁安（Ward Cunningham）在 1987 年的 OOPSLA 大会上把这个想法带进了程序设计，而埃里希·伽玛（Erich Gamma）、理查德·赫尔姆（Richard Helm）、拉尔夫·约翰逊（Ralph Johnson）与约翰·弗利西德斯（John Vlissides）的《Design Patterns: Elements of Reusable Object-Oriented Software》（1994）使它成为主流。彼得·诺维格（Peter Norvig）的报告《Design Patterns in Dynamic Languages》（1996）面向带一等功能函数的语言重新审视了这份目录。
:::

## 后续内容

本课程从单个函数走到了完整的程序：为函数写规格说明，为数据设计抽象数据类型，用类与继承实现它们，用高阶函数、不可变性与迭代器组合计算，用类型检查接口，最后用模块与模式把一个程序按它的各个决策划分开来。[[software-engineering]] 在系统与团队的尺度上继续——体系结构、设计原则、重构、测试与版本控制——而 [[programming-languages]] 研究模块、对象、闭包与类型背后的语言机制。[[data-structures]] 里的数据结构与 [[algorithms]] 里的算法，都将写成本课程教你设计的模块与抽象数据类型。

::: summary
- Python 的**模块**是一个文件，首次导入时执行一次并被缓存在 `sys.modules` 中；`__name__ == "__main__"` 区分运行与导入；包是模块的目录（[[#def-module]]）。
- **信息隐藏**：让每个模块负责一个可能改变的设计决策，并给它一个不泄露该决策的接口（[[#def-information-hiding]]）。在帕纳斯的 KWIC 例子里，每次改动只触及一个模块而不是四个。
- 追求**低耦合**与**高内聚**；耦合从数据耦合（无妨）经控制耦合与公共耦合一直延伸到内容耦合（最糟）（[[#def-coupling]]）。
- 一个程序存在合法的依赖顺序，当且仅当它的**依赖图**无环（[[#thm-dependency-order]]）；Python 的导入环会在模块初始化到一半时失败——要靠重画边界来修复。
- **设计模式**给一个反复出现的问题、一个解法及其权衡命名（[[#def-pattern]]）。**策略**（常常只是一个函数参数）、**观察者**（订阅并通知回调）、**适配器**（用组合翻译接口），此外还有先前遇到的迭代器、模板方法、工厂方法与装饰器。
- 只在模式能解决真实问题的地方使用它们；在 Python 里，许多模式就是一行代码。
:::

## 习题

::: exercise 只执行一次 {level=1 check="1"}
模块 `m.py` 的内容是 `print("loading m")` 和 `x = 1`。一个由 `import m`、`import m`、`from m import x`、`import m as mm` 组成的程序会把 `loading m` 打印几次？（输入数目。）
::: solution
一次。第一条 `import m` 执行文件并把模块存进 `sys.modules`；之后每一条导入，无论什么形式，都在那里找到它，而不会再执行文件。（`importlib.reload(m)` 会再执行一次。）
:::
:::

::: exercise 给耦合归类 {level=1}
判断下列每种情形中模块之间的耦合类型：(a) `invoice.total(lines)`，其中 `lines` 是 `(price, quantity)` 对的列表，而 `total` 两项都用；(b) `render(doc, fast=True)`，其中 `fast` 在两个内部算法之间切换；(c) 一个模块设置 `config.DEBUG = True`，另外五个模块读取它；(d) 一个测试在调用 `withdraw` 之前设置 `account._balance = 0`。
::: solution
(a) 数据耦合（或者，如果 `total` 只使用每对的一部分，则是标记耦合）。(b) 控制耦合：调用者选择被调用者的内部算法；更好的做法是公开两个函数，或者使用一个策略。(c) 通过全局变量的公共耦合：任何模块都能改变所有地方的行为。(d) 内容耦合：测试依赖账户的表示，并绕过了它的不变式；它应当经由构造方法创建账户（`Account("x", 0)`）。
:::
:::

::: exercise 数依赖顺序 {level=1 check="2"}
模块：`app` 导入 `ui` 与 `storage`；`ui` 与 `storage` 都导入 `model`；`model` 什么都不导入。有多少种顺序能让每个模块都排在它所依赖的全部模块之后？（输入数目。）
::: solution
`model` 必须排第一（所有模块都直接或间接依赖它），`app` 排最后（它依赖其他所有模块）。`ui` 与 `storage` 互不依赖，可以按任意先后出现：`model, ui, storage, app` 与 `model, storage, ui, app`。两种顺序。
:::
:::

::: exercise 打破循环 {level=2}
重写本章的 `pricing.py` 与 `customers.py`，使依赖图无环且 `main.py` 能打印价格。然后解释为什么把 `from pricing import price` 移进 `preview` 也能让程序运行，以及为什么它是较弱的那种修法。
::: solution
把 `preview` 移到 `pricing` 里，那是它该在的地方（它讲的是价格），这样一来 `customers` 就什么都不依赖：

```python
# file: customers.py
VIP = {"ada"}

def discount_for(customer):
    return 0.1 if customer in VIP else 0.0
```

```python
# file: pricing.py
from customers import discount_for

def price(customer, amount):
    return amount * (1 - discount_for(customer))

def preview(customer):
    return price(customer, 100)
```

```python
# file: main.py
import pricing
print(pricing.price("ada", 50), pricing.preview("bob"))
```

```console
$ python3 main.py
45.0 100.0
```

写在 `preview` 内部的导入只在调用 `preview` 时才执行，到那时两个模块都已加载完毕，于是名字都存在。但两个模块仍然互相依赖：缺了对方，谁也无法被测试或复用；而将来 `customers` 中任何对 `price` 的顶层使用都会把错误带回来。
:::
:::

::: exercise 不守规矩的观察者 {level=2}
在 [[#ex-observer]] 的 `Thermostat` 中，一个观察者抛出了异常。在它之后订阅的那些观察者会怎么样？修改 `set_temperature`，使得即使某些观察者失败，每个观察者仍会被通知，而失败事后再报告。讨论这是否总是正确的策略。
::: solution
不加改动的话，异常会在失败的那个观察者处穿出 `set_temperature`，于是后面的观察者收不到通知，而温度已经更新——观察者从此与主题各说各话。一个隔离失败的版本：

```python
    def set_temperature(self, t):
        if t != self._temp:
            self._temp = t
            errors = []
            for notify in list(self._observers):
                try:
                    notify(t)
                except Exception as e:      # 继续通知其余观察者
                    errors.append(e)
            if errors:
                raise ExceptionGroup("observer failures", errors)
```

`ExceptionGroup`（Python 3.11 及以后）一次携带多个异常。是否继续是一个策略决定：对彼此独立的观察者（一个日志、一个显示界面），隔离失败是对的；如果观察者必须协同行动（借记与贷记），一个失败可能要求撤销其他操作，继续反而是错的。主题的规格说明应当写明它遵循哪种策略。
:::
:::

::: exercise 带状态的策略 {level=2}
添加一个“忠诚客户”定价策略，打九五折并统计它已为多少个购物篮定过价，且不改动 `Checkout`。分别用闭包和用带 `__call__` 的类实现一次，并解释为什么 `Checkout` 两者都接受。
::: solution
```python
def make_loyalty():
    baskets = 0
    def loyalty(items):
        nonlocal baskets
        baskets += 1
        return 0.95 * sum(i.price * i.quantity for i in items)
    loyalty.count = lambda: baskets
    return loyalty

class Loyalty:
    def __init__(self):
        self.baskets = 0
    def __call__(self, items):
        self.baskets += 1
        return 0.95 * sum(i.price * i.quantity for i in items)
```

`Checkout` 调用 `self.pricing(self.items)`；任何能用一个参数调用并返回数值的对象都满足这个接口。函数、闭包、带 `__call__` 的类的实例全都满足——这就是结构类型在起作用，别名 `Pricing = Callable[[list[Item]], float]` 向类型检查器描述了它。对 [[#ex-strategy]] 中的购物篮，两者在精确算术中都算出 $0.95 \times 24.90 = 23.655$，但在浮点数下乘积是 `23.654999999999998`，于是 `Checkout.total` 报出 `23.65`，而一家按 half-up 四舍五入计价的商店会收 $23.66$——这也是钱应当用整数便士或 `decimal.Decimal` 来计算的原因之一（[[computer-systems/floating-point]]）。
:::
:::

::: exercise 用 Kahn 算法求导入顺序 {level=3}
写一个函数 `build_order(deps)`，它接受一个把每个模块映射到它所导入的模块集合的字典，返回一个让每个模块都排在其依赖之后的表，或者抛出一个点名环上各模块的 `ValueError`。使用[[#thm-dependency-order]]证明中的算法，为每个模块维护一个未处理依赖的计数，使整个计算对 $n$ 个模块和 $m$ 条依赖耗时 $O(n + m)$。
::: solution
```python
from collections import deque

def build_order(deps):
    """deps: module -> set of modules it imports (all keys).  Dependencies first."""
    remaining = {m: len(ds) for m, ds in deps.items()}       # 未处理的依赖
    users = {m: [] for m in deps}                            # 反向边
    for m, ds in deps.items():
        for d in ds:
            users[d].append(m)
    ready = deque(sorted(m for m, k in remaining.items() if k == 0))
    order = []
    while ready:
        m = ready.popleft()
        order.append(m)
        for u in users[m]:                  # m 已完成：u 的依赖少一个
            remaining[u] -= 1
            if remaining[u] == 0:
                ready.append(u)
    if len(order) < len(deps):
        raise ValueError(f"cycle among {sorted(m for m in deps if remaining[m] > 0)}")
    return order

deps = {"app": {"ui", "storage"}, "ui": {"model", "config"},
        "storage": {"model", "config"}, "model": set(), "config": set()}
print(build_order(deps))
try:
    build_order({"pricing": {"customers"}, "customers": {"pricing"}, "main": {"pricing"}})
except ValueError as e:
    print(e)
```

```console
$ python3 kahn.py
['config', 'model', 'ui', 'storage', 'app']
cycle among ['customers', 'main', 'pricing']
```

每个模块只在它的计数归零时进入 `ready` 一次，每条依赖边只在其目标被处理时检查一次，所以时间是 $O(n + m)$（开头的 `sorted` 只是让输出确定化）。如果存在环，环上的模块永远到不了零计数，依赖它们的东西也一样——这就是为什么 `main` 会与真正处于环上的那两个模块一起被报告出来。正确性就是[[#thm-dependency-order]]中的证明：一个模块只有在它的所有依赖都已被加入之后才会被加入。
:::
:::

::: exercise 按隐藏的决策分解 {level=3}
一个小型图书馆系统向会员借出图书。它必须：(1) 存储图书与会员，目前放在一个 CSV 文件里，以后大概会放进数据库；(2) 执行借阅规则——图书馆每年都要调整的借期与限额；(3) 发送提醒，目前用电子邮件，以后也许改用短信；(4) 打印报表。按信息隐藏提出一个划分为模块的方案：对每个模块给出它隐藏的决策和接口的概要，并画出依赖图。用改动“儿童读物的借期从三周改为四周”来检验你的设计。
::: solution
一个合理的设计：

- `catalogue` 隐藏存储格式与技术。接口：`find_book(id)`、`find_member(id)`、`save_loan(loan)`、`loans_due_before(date)`。其他任何东西都不知道 CSV 或 SQL。
- `rules` 隐藏借阅策略。接口：`due_date(book, member, today)`、`may_borrow(member, current_loans)`。关于实参的纯函数，容易测试。
- `notify` 隐藏投递渠道。接口：`send_reminder(member, message)`。把电子邮件换成短信只改变这个模块（或者传入一个不同的策略）。
- `lending` 隐藏借书与还书的流程。接口：`borrow(member_id, book_id, today)`、`give_back(book_id, today)`。它使用 `catalogue` 与 `rules`。
- `reminders` 隐藏提醒何时发出、多久发一次：`send_due_reminders(today)`，使用 `catalogue`、`rules` 与 `notify`。
- `reports` 生成报表，只使用 `catalogue`。

依赖：`lending → catalogue, rules`；`reminders → catalogue, rules, notify`；`reports → catalogue`；一个 `main` 模块依赖 `lending`、`reminders` 与 `reports`。这个图是无环的，而 `rules`、`notify` 与 `catalogue` 不依赖系统里的任何东西。儿童读物借期的改动是策略上的改动，所以只触及 `rules.due_date` 一处；任何负责存储、发送或报表的东西都不必知道。若改为按处理步骤来组织设计（“读 CSV，检查借阅，写 CSV，发电子邮件”），这些决策中的每一个都会散布在好几个步骤上——又是帕纳斯的第一种 KWIC 设计。
:::
:::
