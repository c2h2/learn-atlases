今天训练神经网络的人，没有一个会手工写出它的反向传播。人们写出前向计算——在 PyTorch、JAX 或其他框架里——然后调用一个返回梯度的函数。这次调用背后的机器就是**自动微分**（automatic differentiation，AD）：一整套*对程序*逐运算求导的技术，除浮点舍入外精确，代价与运行程序成正比。反向传播（[[neural-networks/backpropagation]]）就是其中一个实例：作用在网络上的反向模式自动微分。本章介绍自动微分的两种模式，证明各自的代价，用四十行左右的 Python 搭出一个能用的反向模式自动求导引擎，再讲大型框架如何围绕张量组织同样的思想，以及实践中重要的几种扩展：高阶导数、省内存的检查点与自定义梯度。

## 求导数的三种方式 {#sec-three-ways}

设一个程序计算$f\colon\R^n\to\R^m$。求它的导数一共有三条大路。

- **数值微分**在扰动后的输入处求值$f$、取差分。它不需要了解程序内部，但它是近似的（截断误差与舍入误差，[[neural-networks/backpropagation#prop-fd]]），而且每个输入方向要一到两次求值——对百万参数而言除了当作检查外毫无用处。
- **符号微分**像计算机代数系统那样摆弄公式，返回导数的公式。它是精确的，但嵌套表达式的导数公式可能比原式大得多（“表达式膨胀”：$k$个因子乘积的导数有$k$项，每项带$k$个因子），而且不能直接用于带循环、分支与赋值的程序。
- **自动微分**作用于程序实际执行的那串初等运算。它在每一步数值地施加链式法则，携带的是导数*值*而不是导数*公式*。它除舍入外精确，能处理程序使用的任何控制流，代价有界。

自动微分立在一个观察上：程序再复杂，它在某个具体输入上的一次执行，是一条初等运算的直线序列。

::: definition 求值轨迹 {#def-trace}
程序在输入$\mathbf{x} = (x_1, \dots, x_n)$上的**求值轨迹**（或 Wengert 列表）是中间变量序列$v_{1-n}, \dots, v_0, v_1, \dots, v_N$，输入为$v_{i-n} = x_i$，其余

$$
v_j = \psi_j\big(v_k : k\in\operatorname{pa}(j)\big),\qquad j = 1, \dots, N,
$$

其中每个$\psi_j$是具有已知偏导数的初等运算，且每个父节点的编号都小于$j$。输出是其中某些$v_j$。循环被展开，只出现实际走到的那个分支。
:::

轨迹就是运行程序所产生的计算图（[[neural-networks/backpropagation#def-graph]]）。贯穿全章的例子取自 Baydin、Pearlmutter、Radul 与 Siskind（2018）的综述：$f(x_1, x_2) = \ln x_1 + x_1x_2 - \sin x_2$在$(x_1, x_2) = (2, 5)$处：

| 变量 | 运算 | 值 |
|---|---|---|
| $v_{-1}$ | $x_1$ | $2$ |
| $v_0$ | $x_2$ | $5$ |
| $v_1$ | $\ln v_{-1}$ | $0.6931$ |
| $v_2$ | $v_{-1}\times v_0$ | $10$ |
| $v_3$ | $\sin v_0$ | $-0.9589$ |
| $v_4$ | $v_1 + v_2$ | $10.6931$ |
| $v_5$ | $v_4 - v_3$ | $11.6521$ |

::: widget graph
nodes: x1@0,2; x2@0,-2; v1@3,3; v2@3,0; v3@3,-3; v4@6,1.5; v5@9,0
edges: x1>v1; x1>v2; x2>v2; x2>v3; v1>v4; v2>v4; v4>v5; v3>v5
algorithm: topo
start: x1
caption: 把$f(x_1, x_2) = \ln x_1 + x_1x_2 - \sin x_2$的求值轨迹画成图。前向模式按拓扑序沿箭头把导数连同值一起向前推送；反向模式先把值正向跑完，再把伴随量逆着箭头拉回。两个输入各自扇出到两个运算。
:::

## 前向模式 {#sec-forward}

前向模式给每个中间变量挂上它沿选定的输入方向$\dot{\mathbf{x}}\in\R^n$的导数，即**切向量**$\dot v_j = \nabla v_j\cdot\dot{\mathbf{x}}$，并用链式法则把它与值一同算出：

$$
\dot v_j = \sum_{k\in\operatorname{pa}(j)}\frac{\partial\psi_j}{\partial v_k}\,\dot v_k .
$$

从$\dot{\mathbf{x}}$出发，一次前向便产出$\dot{\mathbf{y}} = J_f(\mathbf{x})\,\dot{\mathbf{x}}$，一个**雅可比-向量乘积**（JVP）。一种优雅的实现方式，是使用一种把链式法则内置到算术里的数系。

::: definition 对偶数 {#def-dual}
**对偶数**是形如$a + b\epsilon$的形式表达式，其中$a, b\in\R$，符号$\epsilon$满足$\epsilon^2 = 0$（但$\epsilon\ne0$）。它们的加法与乘法遵守通常的规则：

$$
(a + b\epsilon) + (c + d\epsilon) = (a + c) + (b + d)\epsilon,\qquad(a + b\epsilon)(c + d\epsilon) = ac + (ad + bc)\epsilon .
$$

可导的初等函数$\psi$按$\psi(a + b\epsilon) = \psi(a) + \psi'(a)\,b\,\epsilon$扩张到对偶数上。
:::

::: proposition 对偶数计算导数 {#prop-dual}
设一个程序仅由$+$、$\times$与按[[#def-dual]]扩张的可导初等函数计算$f\colon\R\to\R$。把对偶数$x + 1\epsilon$喂进程序，返回$f(x) + f'(x)\epsilon$。更一般地，把输入$x_i + \dot x_i\epsilon$喂进计算$f\colon\R^n\to\R^m$的程序，返回$f(\mathbf{x}) + \big(J_f(\mathbf{x})\dot{\mathbf{x}}\big)\epsilon$。
:::

::: proof
沿轨迹归纳证明每个中间变量都形如$v_j + \dot v_j\epsilon$，其中$v_j$是它的通常值，$\dot v_j$是$v_j$沿$\dot{\mathbf{x}}$的导数。对输入，由构造成立。对加法，$(u + \dot u\epsilon) + (w + \dot w\epsilon) = (u + w) + (\dot u + \dot w)\epsilon$，而$\dot u + \dot w$正是$u + w$的导数。对乘法，$(u + \dot u\epsilon)(w + \dot w\epsilon) = uw + (u\dot w + \dot uw)\epsilon + \dot u\dot w\epsilon^2 = uw + (u\dot w + \dot uw)\epsilon$，即乘积法则；这里用到了$\epsilon^2 = 0$。对初等函数，$\psi(u + \dot u\epsilon) = \psi(u) + \psi'(u)\dot u\epsilon$，而$\psi'(u)\dot u$按一元链式法则正是$\psi(u)$的导数。每一步都保持这一断言，故它对输出成立，而输出的$\epsilon$部分就是方向导数$J_f\dot{\mathbf{x}}$。
:::

::: example 轨迹上的前向模式 {#ex-forward}
用前向模式计算贯穿全章的例子在$(2, 5)$处的$\partial f/\partial x_1$。
::: solution
播种$\dot x_1 = 1$、$\dot x_2 = 0$，让切向量沿轨迹行进：$\dot v_1 = \dot v_{-1}/v_{-1} = 0.5$；$\dot v_2 = \dot v_{-1}v_0 + v_{-1}\dot v_0 = 5$；$\dot v_3 = \cos(v_0)\dot v_0 = 0$；$\dot v_4 = \dot v_1 + \dot v_2 = 5.5$；$\dot v_5 = \dot v_4 - \dot v_3 = 5.5$。于是$\partial f/\partial x_1 = 5.5$，与$1/x_1 + x_2$吻合。再以$(0, 1)$播种做第二次前向，得$\partial f/\partial x_2 = x_1 - \cos x_2 = 2 - 0.2837 = 1.7163$。每次前向给出雅可比的一个*列*——这里雅可比是$1\times2$矩阵，所以两次前向得到整个梯度。
:::
:::

前向模式除了每个活跃变量一个切向量外不需要额外内存，而且是输入少、输出多的函数的天然模式：比如整条仿真轨迹对某一个物理参数的敏感度。而对有$n$个参数的损失，它要$n$次前向才能拼出梯度，这在训练上不可行。

## 反向模式 {#sec-reverse}

反向模式把程序正向跑一遍，记录轨迹与值（录在一条**磁带**上），然后反向扫描，按[[neural-networks/backpropagation#eq-adjoint]]计算选定输出$y$的**伴随量**$\bar v_j = \partial y/\partial v_j$。把输出的伴随量播种为向量$\bar{\mathbf{y}}\in\R^m$而不是$1$，就得到$\bar{\mathbf{x}} = J_f(\mathbf{x})^\top\bar{\mathbf{y}}$，一个**向量-雅可比乘积**（VJP）：每次前向给出雅可比的一个*行*组合。

::: example 轨迹上的反向模式 {#ex-reverse}
用一次反向扫描算出贯穿全章的例子的两个偏导数。
::: solution
前向之后置$\bar v_5 = 1$，逆序访问轨迹。$v_5 = v_4 - v_3$：$\bar v_4 = 1$，$\bar v_3 = -1$。$v_4 = v_1 + v_2$：$\bar v_1 = 1$，$\bar v_2 = 1$。$v_3 = \sin v_0$：$\bar v_0\mathrel{+}=\bar v_3\cos v_0 = -0.2837$。$v_2 = v_{-1}v_0$：$\bar v_{-1}\mathrel{+}=\bar v_2v_0 = 5$，且$\bar v_0\mathrel{+}=\bar v_2v_{-1} = 2$。$v_1 = \ln v_{-1}$：$\bar v_{-1}\mathrel{+}=\bar v_1/v_{-1} = 0.5$。总计：$\bar x_1 = \bar v_{-1} = 5.5$，$\bar x_2 = \bar v_0 = 2 - 0.2837 = 1.7163$。一次扫描产出了整个梯度；每个输入的伴随量按使用次数各累加一份贡献。
:::
:::

两种模式以不同的次序算出同样的数。它们的代价随雅可比形状急剧变化。

::: theorem 前向与反向模式的代价 {#thm-modes}
设一个程序用$C$次初等运算计算$f\colon\R^n\to\R^m$。则存在只依赖初等运算集合的常数（而且很小——实践中约$2$到$4$）：

1. 一次前向模式的扫描以$O(C)$次运算算出 JVP $J\dot{\mathbf{x}}$，每个活跃变量$O(1)$的额外内存，故完整雅可比花费$O(nC)$；
2. 一次反向模式的扫描以$O(C)$次运算算出 VJP $J^\top\bar{\mathbf{y}}$，但需要为磁带上的值保存内存，最多$O(C)$，故完整雅可比花费$O(mC)$。

特别地，标量函数（$m = 1$）的梯度用反向模式只要$O(C)$，与$n$无关。
:::

::: proof
每个有$q_j$个参数的初等运算$v_j = \psi_j(\cdot)$，在前向模式中贡献它的$q_j$个偏导数的计算与$q_j$个乘积的求和——是$\psi_j$本身代价的有界倍数，因为初等运算（$+$、$\times$、$\exp$、$\sin$，……）的偏导数本身也是初等运算，而且就在同一点取值。沿轨迹求和，每次扫描$O(C)$。把$\dot{\mathbf{x}}$依次取为$n$个单位向量，就得到$J$的$n$个列。反向模式中，每个运算在反向扫描里被再次访问，它向每个父节点的伴随量加上$\bar v_j\,\partial\psi_j/\partial v_k$——同样是该运算代价的有界倍数——所以一个 VJP 花费$O(C)$；把$\bar{\mathbf{y}}$依次播种为$m$个单位向量，就得到$m$个行。反向扫描要在前向值处取$\partial\psi_j/\partial v_k$的值，这些值因此必须存下来（或重算）：这就是内存的代价。
:::

所以是$J$的形状说了算。训练时$f$是损失——$n$是参数个数，$m = 1$——反向模式以$n$倍的优势胜出。$n\ll m$时前向模式胜出。雅可比是方的、或问题有结构时，则两种模式混用。

::: quiz
一个函数把$3$维输入映到$1{,}000$维输出，你需要它的完整雅可比。哪种模式更便宜？需要几次扫描？
- [x] 前向模式，$3$次
- [ ] 反向模式，$1$次
- [ ] 反向模式，$3$次
- [ ] 前向模式，$1{,}000$次
::: solution
前向模式每次扫描给出$1{,}000\times3$雅可比的一列，所以$3$次。反向模式每次扫描给出一行，需要$1{,}000$次。反向模式只在输出少——尤其只有一个标量损失——时才是正确的选择。
:::
:::

## 一个微型自动求导引擎 {#sec-engine}

反向模式需要三样东西：记得自己父节点与局部导数的节点、图的拓扑序、一次反向扫描。下面的类针对标量提供这三样，风格仿照 Andrej Karpathy 的 *micrograd*（2020）。对`Value`对象的每个算术运算都创建一个新节点——图是*随程序运行*建立的，这叫**边运行边定义**（define-by-run）——而`backward()`执行[[neural-networks/backpropagation#alg-backprop]]。

```python
import math, random

class Value:
    """A scalar node of a computation graph that records how it was made."""
    def __init__(self, data, parents=(), local_grads=()):
        self.data = data                  # 前向值
        self.grad = 0.0                   # 伴随量 dL/d(self)，由 backward() 填入
        self.parents = parents            # 计算它所依据的节点
        self.local_grads = local_grads    # 对每个父节点的 d(self)/d(parent)

    # 每个运算返回新节点，并存储它的局部导数
    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        return Value(self.data + other.data, (self, other), (1.0, 1.0))
    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        return Value(self.data * other.data, (self, other), (other.data, self.data))
    def __pow__(self, k):                 # k 为普通数
        return Value(self.data ** k, (self,), (k * self.data ** (k - 1),))
    def __neg__(self):        return self * -1.0
    def __sub__(self, other): return self + (-other)
    def __radd__(self, other): return self + other
    def __rmul__(self, other): return self * other
    def __truediv__(self, other): return self * other ** -1.0
    def exp(self):
        e = math.exp(self.data); return Value(e, (self,), (e,))
    def log(self):
        return Value(math.log(self.data), (self,), (1.0 / self.data,))
    def sin(self):
        return Value(math.sin(self.data), (self,), (math.cos(self.data),))
    def tanh(self):
        t = math.tanh(self.data); return Value(t, (self,), (1 - t * t,))

    def backward(self):
        """Reverse-mode sweep: topological order, then adjoints in reverse."""
        order, seen = [], set()
        def visit(v):                     # 深度优先搜索，父节点先入序
            if id(v) not in seen:
                seen.add(id(v))
                for p in v.parents:
                    visit(p)
                order.append(v)
        visit(self)
        self.grad = 1.0
        for v in reversed(order):         # 把每个伴随量推送给父节点
            for p, g in zip(v.parents, v.local_grads):
                p.grad += v.grad * g

# 1. Baydin 等的例子：f(x1, x2) = ln x1 + x1 x2 - sin x2 在 (2, 5) 处
x1, x2 = Value(2.0), Value(5.0)
f = x1.log() + x1 * x2 - x2.sin()
f.backward()
print(f"f = {f.data:.4f}   df/dx1 = {x1.grad:.4f}   df/dx2 = {x2.grad:.4f}")

# 2. 用对偶数 a + b*eps（eps^2 = 0）做前向模式
class Dual:
    def __init__(self, a, b=0.0): self.a, self.b = a, b
    def __add__(s, o): o = o if isinstance(o, Dual) else Dual(o); return Dual(s.a + o.a, s.b + o.b)
    def __sub__(s, o): o = o if isinstance(o, Dual) else Dual(o); return Dual(s.a - o.a, s.b - o.b)
    def __mul__(s, o): o = o if isinstance(o, Dual) else Dual(o); return Dual(s.a * o.a, s.a * o.b + s.b * o.a)
def dlog(d): return Dual(math.log(d.a), d.b / d.a)
def dsin(d): return Dual(math.sin(d.a), math.cos(d.a) * d.b)
for seed in [(1.0, 0.0), (0.0, 1.0)]:         # 每个输入方向一次前向
    u1, u2 = Dual(2.0, seed[0]), Dual(5.0, seed[1])
    g = dlog(u1) + u1 * u2 - dsin(u2)
    print(f"forward mode, direction {seed}: f = {g.a:.4f}, directional derivative = {g.b:.4f}")

# 3. 用 Value 搭一个极小 MLP，用中心差分校验
rng = random.Random(1)
def mlp(params, x):                           # 2 -> 4 -> 1，tanh 隐藏层
    W1, b1, w2, b2 = params
    h = [(sum((W1[i][j] * x[j] for j in range(2)), b1[i])).tanh() for i in range(4)]
    return sum((w2[i] * h[i] for i in range(4)), b2)
def loss_fn(params, data):                    # 均方误差
    return sum(((mlp(params, x) - y) ** 2 for x, y in data), Value(0.0)) * (1.0 / len(data))
def fresh(raw):                               # 把浮点数包装成叶子 Value
    W1, b1, w2, b2 = raw
    return ([[Value(w) for w in r] for r in W1], [Value(b) for b in b1],
            [Value(w) for w in w2], Value(b2))
raw = ([[rng.gauss(0, 1) for _ in range(2)] for _ in range(4)], [0.0] * 4,
       [rng.gauss(0, 0.5) for _ in range(4)], 0.0)
xor = [((0., 0.), -1.), ((0., 1.), 1.), ((1., 0.), 1.), ((1., 1.), -1.)]

params = fresh(raw)
L = loss_fn(params, xor); L.backward()
eps = 1e-6
for i, j in [(0, 1), (3, 0)]:
    plus = ([r[:] for r in raw[0]], raw[1], raw[2], raw[3]); plus[0][i][j] += eps
    minus = ([r[:] for r in raw[0]], raw[1], raw[2], raw[3]); minus[0][i][j] -= eps
    num = (loss_fn(fresh(plus), xor).data - loss_fn(fresh(minus), xor).data) / (2 * eps)
    print(f"dL/dW1[{i}][{j}]  autograd {params[0][i][j].grad: .8f}  numeric {num: .8f}")

# 4. 训练它：每步新建一个图、跑反向、更新叶子
for step in range(1, 301):
    params = fresh(raw)
    L = loss_fn(params, xor); L.backward()
    W1, b1, w2, b2 = params
    raw = ([[w.data - 0.1 * w.grad for w in r] for r in W1], [b.data - 0.1 * b.grad for b in b1],
           [w.data - 0.1 * w.grad for w in w2], b2.data - 0.1 * b2.grad)
    if step in (1, 100, 300):
        preds = [round(mlp(fresh(raw), x).data, 3) for x, _ in xor]
        print(f"step {step:3d}  loss {L.data:.2e}  outputs {preds}")
```

```text
f = 11.6521   df/dx1 = 5.5000   df/dx2 = 1.7163
forward mode, direction (1.0, 0.0): f = 11.6521, directional derivative = 5.5000
forward mode, direction (0.0, 1.0): f = 11.6521, directional derivative = 1.7163
dL/dW1[0][1]  autograd -0.00422464  numeric -0.00422464
dL/dW1[3][0]  autograd  0.06343612  numeric  0.06343612
step   1  loss 8.91e-01  outputs [-0.059, 0.38, 0.144, 0.196]
step 100  loss 3.86e-02  outputs [-0.93, 0.826, 0.818, -0.722]
step 300  loss 3.20e-08  outputs [-1.0, 1.0, 1.0, -1.0]
```

引擎复现了[[#ex-forward]]与[[#ex-reverse]]，在一个 MLP 的损失上与中心差分一致，并在 XOR（目标$\pm1$）上训练了这个 MLP——全程没有手写过网络的一个导数。`backward`里的`+=`就是扇出规则：被多次使用的节点每次使用收集一份贡献。引擎也和它看起来一样慢——每个标量运算一个 Python 对象。真正的系统把同样的算法施加到**张量**上：一个节点就是一次由优化核完成的整矩阵乘法，图有几千个节点而不是几十亿个。

## 张量与广播 {#sec-tensors}

节点取张量值时，每个运算的反向规则就是一个 VJP：给定输出形状的$\bar{\mathbf{y}}$，返回输入形状的伴随量（[[neural-networks/backpropagation#sec-rules]]）。有一条规则值得特别点名，因为许多形状 bug 源于它。数组库会**广播**：把形状$(d)$的偏置$\mathbf{b}$加到形状$(B, d)$的矩阵$X$上，悄悄把$\mathbf{b}$复制到每一行。

::: proposition 广播及其伴随量 {#prop-broadcast}
若输入$\mathbf{u}$在运算前被沿某些轴广播，则它的伴随量是广播副本的输出伴随量**沿这些轴求和**。对$Y = X + \mathbf{1}\mathbf{b}^\top$，$X\in\R^{B\times d}$，$\mathbf{b}\in\R^d$：$\bar X = \bar Y$且$\bar{\mathbf{b}} = \sum_{r=1}^B\bar Y_{r,:}$。
:::

::: proof
广播是线性映射$\mathbf{b}\mapsto\mathbf{1}\mathbf{b}^\top$，它把$\mathbf{b}$复制进$B$行中的每一行。每个元素$b_k$被使用$B$次，每行$r$一次，局部导数为$1$；由扇出规则，它的伴随量是$\sum_r\bar Y_{rk}$。等价地，线性映射的反向规则是它的转置，而“沿某个轴复制”的转置是“沿那个轴求和”。
:::

框架自动实现这一点（“反广播”），所以偏置的梯度总是与偏置同形状。自己写运算时必须手工套用这条规则，忘了它就会得到形状不对的梯度——或者更糟，因为巧合（$B = d$时）形状恰好对。

::: example 批量层中的形状 {#ex-shapes}
一层计算$Y = \tanh(XW + \mathbf{b})$，$X$形状$(64, 128)$，$W$形状$(128, 32)$，$\mathbf{b}$形状$(32)$。已知$\bar Y$，写出反向传播，标出每个量的形状。
::: solution
令$A = XW + \mathbf{b}$，形状$(64, 32)$。则$\bar A = \bar Y\odot(1 - Y^2)$，形状$(64, 32)$；$\bar W = X^\top\bar A$，形状$(128, 64)(64, 32) = (128, 32)$；$\bar{\mathbf{b}} = \bar A$的各列之和，形状$(32)$，依据[[#prop-broadcast]]；$\bar X = \bar AW^\top$，形状$(64, 32)(32, 128) = (64, 128)$。每个伴随量的形状都等于它所隶属之量的形状——这一检查能抓住大多数错误。
:::
:::

## 自动求导系统 {#sec-systems}

大型框架都在张量上实现反向模式，配几百个可微运算、每条前向与反向规则的 GPU 核，以及精心的内存管理。两种设计各占一方（截至2026年）。

**边运行边定义的磁带（PyTorch）。**用`requires_grad=True`创建的张量是叶子；其上的每个运算都在图里记录一个节点，如上文`Value`类那样，对象是标量时调用`.backward()`便执行反向扫描，并把叶子的伴随量*累加*进它们的`.grad`字段。由于图在每次前向传播时重新建立，普通的 Python 控制流——循环、分支、递归——拿来即用。设计见 Paszke 等（2019）的论文。

```python
import torch

x = torch.tensor([2.0, 5.0], requires_grad=True)        # 叶子张量，形状 (2,)
f = torch.log(x[0]) + x[0] * x[1] - torch.sin(x[1])     # 图随执行被记录
f.backward()                                            # 从标量 f 反向扫描
print(x.grad)                                           # tensor([5.5000, 1.7163])
```

**函数变换（JAX）。**JAX（Bradbury 等，2018）把求导当作对纯函数的变换：`jax.grad(f)`是一个返回`f`的梯度的新函数，`jax.jvp`与`jax.vjp`直接给出两种模式，`jax.vmap`沿批量轴向量化，`jax.jit`负责编译。JAX 让 Python 函数在抽象的“追踪”值上运行以求得轨迹，把它记录为中间表示，再对这个表示求导。变换可以复合：`jax.jacfwd(jax.grad(f))`是黑塞矩阵，`jax.vmap(jax.grad(loss), in_axes=(None, 0))`给出逐样例梯度。PyTorch 在`torch.func`中提供了类似的可复合变换。TensorFlow 2 在`tf.GradientTape`上记录运算，是与 PyTorch 同类的边运行边定义设计。

::: warning 梯度会累加，且自动微分微分的是程序
三个意外等着大多数新手。第一，在 PyTorch 里`.backward()`是往`.grad`里*加*（扇出规则跨调用生效），所以若不在每步用`optimizer.zero_grad()`清零，相邻各步的梯度会越堆越高；这是有意为之，微批量上的梯度累加就是这么工作的（[[neural-networks/training-practice]]）。第二，自动微分微分的是*实际执行的计算*，不是你心里想的那个数学函数：在 ReLU 的折点处它返回库的规则规定的值（PyTorch 与 JAX 在恰为$0$处取$0$）；程序`x*x if x != 1 else 1.0`在$x = 1$处的 AD 导数是$0$，尽管函数处处等于$x^2$；$\sqrt{x}$在$x = 0$处给出无穷梯度，下游变成 NaN。第三，离开框架的运算——转成 Python 浮点数或 NumPy 数组——会切断图，梯度从中流过不了。
:::

## 梯度之外 {#sec-beyond}

### 黑塞-向量乘积 {#sec-hvp}

度量曲率需要二阶导数——那个限制学习率的尖锐程度（[[math-for-ml/optimisation#sec-quadratic]]）——二阶优化器也需要。$n$个参数的损失的黑塞矩阵有$n^2$个元素，根本造不出来，但它与向量的乘积却很便宜。

::: proposition 线性时间的黑塞-向量乘积 {#prop-hvp}
对用$C$次运算计算的二次可导函数$f\colon\R^n\to\R$与任意$\mathbf{v}\in\R^n$，乘积$\nabla^2f(\mathbf{x})\,\mathbf{v}$可以精确地在$O(C)$次运算内算出：把前向模式施加到反向模式的梯度计算上（“前向叠反向”），或把反向模式施加到标量$\nabla f(\mathbf{x})^\top\mathbf{v}$上。
:::

::: proof
$\nabla^2f(\mathbf{x})\mathbf{v} = \frac{d}{dt}\nabla f(\mathbf{x} + t\mathbf{v})\big|_{t=0}$，即映射$\mathbf{x}\mapsto\nabla f(\mathbf{x})$沿方向$\mathbf{v}$的 JVP。该映射由反向模式的程序以$O(C)$次运算算出（[[#thm-modes]]），穿过它做一次前向扫描只花它的常数倍，所以是$O(C)$。另一种做法：$g(\mathbf{x}) = \nabla f(\mathbf{x})^\top\mathbf{v}$是用$O(C)$次运算算出的标量，由黑塞矩阵的对称性，它的梯度是$\nabla^2f(\mathbf{x})\mathbf{v}$；反向模式以$O(C)$算出它。
:::

这就是 Pearlmutter（1994）的“快速精确的黑塞矩阵乘法”。配上幂迭代，它能估计网络损失的最大的黑塞特征值——[[math-for-ml/optimisation]]中“稳定性边缘”观察背后的量；配上共轭梯度，它给出不造任何矩阵的牛顿型步长。

### 检查点 {#sec-checkpointing}

反向模式的软肋是内存：反向扫描需要的每个值都得从前向传播保存下来（[[neural-networks/backpropagation#sec-memory]]）。**检查点**只保存其中一部分，用计算换内存。

::: proposition 平方根检查点 {#prop-checkpoint}
考虑$L$层的链，每层激活大小相同。前向传播时只保存每第$k$层的激活。反向传播时，在一段$k$层的激活即将被用到之前，从段首保存的检查点把它们重算出来。则存储的激活数峰值约为$L/k + k$，在$k = \sqrt L$处取最小$2\sqrt L$，而额外计算至多一次额外的前向传播。
:::

::: proof
检查点共$L/k$个。反向扫描到达一段时，从段首的检查点重算该段的$k$个激活，用完、在转向上一段之前释放，所以同时存活的被重算激活至多$k$个，合计$L/k + k$。由算术-几何平均值不等式，$L/k + k\ge2\sqrt L$，等号在$k = \sqrt L$处取到。每层的前向计算至多被重复一次（每段的层在重算时各多算一次），所以额外开销至多一次前向传播，约为一个训练步代价的三分之一（[[neural-networks/backpropagation#prop-flops]]）。
:::

::: widget plot
f: L/x + x; L
x: 1, 64
y: 0, 70
sliders: L=48:4:64:4
labels: stored activations with checkpoints every $k$ layers; without checkpointing
caption: 长度为$L$的链的存储激活数峰值$L/k + k$对检查点间距$k$的图像，与全部保存时的$L$相对照。最小值$2\sqrt L$在$k = \sqrt L$处：$L = 64$时只需$16$个激活而不是$64$个，代价是重算一次前向传播。
:::

Chen、Xu、Zhang 与 Guestrin（2016）让平方根检查点在深度网络中流行起来；更早的 Griewank（1992）已经证明递归（“二项式”）检查点只需$O(\log L)$的内存与$O(L\log L)$的计算。框架把它做成`torch.utils.checkpoint`与`jax.checkpoint`（也叫“重materialise”，rematerialisation）；大模型训练通常在 Transformer 模块的边界处设检查点。

### 自定义梯度 {#sec-custom}

有时，链式法则算出的导数并不是你想要的那一个。可以为某个运算提供数值上更好的反向规则（例如[[neural-networks/backpropagation#prop-softmax-vjp]]的融合 softmax–交叉熵）；迭代求解器可以通过隐函数定理、而非展开它的迭代步来求导；而在几乎处处导数为零的运算——比如量化中的舍入——可以配一个代理。**直通估计器**（straight-through estimator，Bengio、Léonard 与 Courville，2013）把恒等映射用作舍入的反向规则，于是梯度“笔直地穿过”舍入传到未量化的权重——一个在实践中相当管用的便利虚构，用于量化感知训练（[[inference]]）。PyTorch 通过`torch.autograd.Function`、JAX 通过`jax.custom_vjp`与`jax.custom_jvp`暴露自定义规则。

::: example 给深堆叠加检查点 {#ex-checkpoint}
一个网络是$L = 100$个模块串成的链。在当前批量下，保存一个模块的反向传播所需的激活要$0.5$ GB，其中模块的*输入*只占$0.05$ GB（其余是内部的：注意力得分、宽前馈层）。比较三种方案的激活内存：不加检查点；在每个模块输入处设检查点；以及对模块做平方根检查点。
::: solution
不加检查点时每个模块的激活都要留着：$100\cdot0.5 = 50$ GB。在每个模块输入处检查点存$100\cdot0.05 = 5$ GB；反向传播时一次从一个模块的输入重算它，增加$0.5$ GB，峰值约$5.5$ GB。平方根检查点每十个模块存一个输入（$10\cdot0.05 = 0.5$ GB），并且对正在处理的那一段，重算并保留其十个模块的输入（$0.5$ GB）加上一个模块的内部激活（$0.5$ GB），约$1.5$ GB——代价是更繁琐的调度。每种方案都约多花一次前向传播，把一个训练步的代价从约$3$次前向抬到约$4$次。对 Transformer 常用的是按模块检查点，因为模块输入比起模块内部来要小得多。
:::
:::

::: history
前向模式自动微分由 Robert Wengert（1964）描述，他的“简单的自动求导程序”（A simple automatic derivative evaluation program，1964）给求值轨迹起了名字。Seppo Linnainmaa 的硕士论文（1970）描述了反向模式。Bert Speelpenning 1980年的论文造出了一个生成反向模式代码的编译器；Andreas Griewank 在1980与1990年代的工作（总结于《Evaluating Derivatives》，2000；与 Andrea Walther 合著的第二版，2008）建立了理论，包括检查点（1992）。Barak Pearlmutter（1994）证明了如何以线性时间乘黑塞矩阵。在机器学习方面，Theano（Bergstra 等，2010）构建被求导并编译的符号图；Chainer（Tokui 等，2015）与 Python 包 *autograd*（Maclaurin、Duvenaud 与 Adams，2015）带来对普通代码的边运行边定义求导；随后是 TensorFlow（Abadi 等，2016）、PyTorch（Paszke 等，2017、2019）与 JAX（Bradbury 等，2018；Frostig、Johnson 与 Leary，2018）。Baydin、Pearlmutter、Radul 与 Siskind 的综述《机器学习中的自动微分》（“Automatic differentiation in machine learning”，2018）把两个学术社区连接了起来。
:::

::: summary
- **自动微分**把链式法则施加到程序的求值轨迹上，携带的是数而不是公式；它除舍入外精确，能处理任何控制流。
- **前向模式**让切向量与值同行（对偶数$a + b\epsilon$，$\epsilon^2 = 0$），每次扫描算出一个雅可比-向量乘积：对$f\colon\R^n\to\R^m$求完整雅可比要$n$次扫描。
- **反向模式**先录一条磁带，再反向扫描计算伴随量：每次扫描一个向量-雅可比乘积，完整雅可比要$m$次扫描，所以标量损失的梯度只花求值代价的常数倍——代价是保存中间值。
- 反向模式引擎需要带父节点与局部导数的节点、一次拓扑排序、一次带`+=`的反向扫描；框架把它施加到张量上，**广播**的输入的伴随量沿广播的轴求和。
- PyTorch 靠运行代码建图并累加进`.grad`；JAX 变换纯函数（`grad`、`vjp`、`jvp`、`vmap`、`jit`），变换可以复合。
- **黑塞-向量乘积**花$O(C)$；**检查点**以一次额外前向传播为代价把激活内存降到$O(\sqrt L)$；**自定义梯度**（融合、隐式、直通）在链式法则不灵的地方取而代之。
:::

## 习题

::: exercise 手算对偶数 {level=1 check="14"}
在对偶数$2 + \epsilon$上求$f(x) = x^3 + 2x$的值，读出$f'(2)$。
::: solution
$(2 + \epsilon)^2 = 4 + 4\epsilon$，$(2 + \epsilon)^3 = (4 + 4\epsilon)(2 + \epsilon) = 8 + 12\epsilon$（舍去$\epsilon^2$）。加上$2(2 + \epsilon) = 4 + 2\epsilon$得$12 + 14\epsilon$。所以$f(2) = 12$，$f'(2) = 14$，与$3x^2 + 2$吻合。
:::
:::

::: exercise 数扫描次数 {level=1 check="1000000"}
一个损失依赖$10^6$个参数。求它的完整梯度需要多少次前向模式扫描？多少次反向模式扫描？填入前向模式的扫描次数。
::: solution
前向模式每次扫描给出一个方向导数，所以要$10^6$次；反向模式一次扫描给出整个梯度（外加记录磁带的那次前向）。
:::
:::

::: exercise 广播的偏置 {level=1 check="32"}
在$Y = X + \mathbf{b}$中，$X$形状$(32, 10)$，$\mathbf{b}$形状$(10)$，损失为$\mathcal{L} = \sum_{r,k}Y_{rk}$。$\bar{\mathbf{b}}$的每个分量是多少？
::: solution
$\bar Y$全是$1$，由[[#prop-broadcast]]，对每个$k$有$\bar b_k = \sum_{r=1}^{32}\bar Y_{rk} = 32$。
:::
:::

::: exercise 一条前向模式的轨迹 {level=2 check="-pi"}
写出$f(x) = x\sin x$的求值轨迹，用前向模式计算$f'(\pi)$。
::: solution
$v_0 = x = \pi$，$\dot v_0 = 1$；$v_1 = \sin v_0 = 0$，$\dot v_1 = \cos(v_0)\dot v_0 = -1$；$v_2 = v_0v_1 = 0$，$\dot v_2 = \dot v_0v_1 + v_0\dot v_1 = 0 + \pi\cdot(-1) = -\pi$。所以$f'(\pi) = -\pi\approx-3.142$，与$\sin x + x\cos x$一致。
:::
:::

::: exercise 一次反向扫描 {level=2 check="2"}
对$f(x, y) = xy + e^{xy}$在$(x, y) = (1, 0)$处，用轨迹$u = xy$，$f = u + e^u$做一次反向扫描，求出两个偏导数。填入$\partial f/\partial y$。
::: solution
$u = 0$，$f = 0 + 1 = 1$。反向：$\bar f = 1$，故$\bar u = 1 + e^u = 2$。于是$\bar x = \bar u\,y = 0$，$\bar y = \bar u\,x = 2$。所以$\partial f/\partial x = 0$，$\partial f/\partial y = 2$。
:::
:::

::: exercise 选择检查点间距 {level=2 check="16"}
一条链有$L = 64$层，各层激活大小相同。按[[#prop-checkpoint]]，每$k$层设一个检查点时，存储激活数峰值最小可到多少？在哪个$k$？
::: solution
$L/k + k$在$k = \sqrt{64} = 8$处最小，得$8 + 8 = 16$个激活，是不做检查点时存储的$64$个的四分之一。
:::
:::

::: exercise 一个黑塞-向量乘积 {level=2}
对$f(\mathbf{x}) = \frac12\mathbf{x}^\top A\mathbf{x}$，对称的$A = \begin{pmatrix}2&1\\1&3\end{pmatrix}$，用[[#prop-hvp]]的第二种方法计算$\nabla^2f\,\mathbf{v}$，其中$\mathbf{v} = (1, -1)$：造出$g(\mathbf{x}) = \nabla f(\mathbf{x})^\top\mathbf{v}$并对它求导。
::: solution
$\nabla f(\mathbf{x}) = A\mathbf{x}$，所以$g(\mathbf{x}) = \mathbf{v}^\top A\mathbf{x} = (A\mathbf{v})^\top\mathbf{x}$，$\nabla g = A\mathbf{v} = (2 - 1, 1 - 3) = (1, -2)$。这就是$\nabla^2f\,\mathbf{v}$，因为$\nabla^2f = A$。在框架里，会先做一次反向传播算出$g$，再对标量$g$调用一次反向（“双重反向”）。
:::
:::

::: exercise 扩展引擎 {level=3}
给[[#sec-engine]]的`Value`引擎加上`relu`与数值稳定的、基于`log_softmax`的交叉熵：给定一列 logits 的`Value`与一个目标下标，返回损失。在 logits $(2, 1, 0.1)$、目标$1$（从零计数）上验证 logits 的梯度是$\mathbf{p} - \mathbf{e}_1$。
::: solution
```python
def relu(self):
    return Value(max(0.0, self.data), (self,), (1.0 if self.data > 0 else 0.0,))
Value.relu = relu

def cross_entropy(logits, target):
    m = max(z.data for z in logits)                 # 一个常数：不需要梯度
    lse = sum(((z - m).exp() for z in logits), Value(0.0)).log() + m
    return lse - logits[target]                     # -log softmax(z)[target]

z = [Value(2.0), Value(1.0), Value(0.1)]
loss = cross_entropy(z, 1)
loss.backward()
print(round(loss.data, 4), [round(v.grad, 4) for v in z])
# 1.417 [0.659, -0.7576, 0.0986]   正是 p - e_1
```
指数之前减去最大值$m$可防上溢，且在数学上不改变任何东西，因为$\log\sum_je^{z_j} = m + \log\sum_je^{z_j - m}$。$m$是以普通数的身份进入的，所以没有梯度从中流过——这是对的，因为结果不依赖$m$。损失$1.417$与梯度$(0.659, -0.758, 0.099)$与[[ml-fundamentals/logistic-regression#ex-softmax]]一致。
:::
:::

::: exercise 分支处 AD 给出什么 {level=3}
考虑程序`def f(x): return x * x if x != 1.0 else 1.0`。反向模式 AD 在$x = 1$处返回什么导数？它所计算的函数的真实导数是多少？再给一个例子，其中函数可导而 AD 返回 NaN 梯度，并解释库如何在范数$\lVert\mathbf{x}\rVert$这类常见运算中避免这一点。
::: solution
在$x = 1$处，程序执行分支`return 1.0`，是一个常数，所以 AD 返回$0$。所计算的函数对所有$x$都是$x^2$（在$x = 1$处等于$1 = 1^2$），它在$1$处的导数是$2$。AD 对实际执行的轨迹是正确微分的，而$x = 1$处的轨迹是一个常数。第二个例子：把$f(x) = x^2$算成`sqrt(x**4)`。函数处处可导且$f'(0) = 0$。但在$x = 0$处，$\sqrt u$的反向规则$1/(2\sqrt u)$在$u = 0$处是$\infty$，再乘以$du/dx = 4x^3 = 0$，在浮点中得到$\infty\cdot0 = $ NaN。范数$\lVert\mathbf{x}\rVert = \sqrt{\sum_ix_i^2}$在$\mathbf{x} = \mathbf{0}$处也一样（那里不可导，但$\mathbf{0}$是一个合法的次梯度）。库会给范数配一条自定义反向规则：$\mathbf{x}\ne\mathbf{0}$时返回$\mathbf{x}/\lVert\mathbf{x}\rVert$，原点处返回$\mathbf{0}$；许多代码库同样出于这个原因计算$\sqrt{u + \varepsilon}$，其中$\varepsilon$很小。
:::
:::

::: exercise 逐样例梯度 {level=3}
差分隐私与某些诊断需要每个样例的损失各自的梯度，而不只是平均的梯度。对 MLP 的一层$A = HW$，$H$形状$(B, d_{\text{in}})$、误差信号$\Delta$形状$(B, d_{\text{out}})$，用$B$个逐样例梯度表示$W$的梯度，并与平均梯度所需内存比较。`vmap`作用在`grad`上如何产生它们？
::: solution
批量梯度是$H^\top\Delta = \sum_r\mathbf{h}_r\boldsymbol{\delta}_r^\top$，即$B$个外积之和；样例$r$的逐样例梯度（其损失不除以$B$）是$\mathbf{h}_r\boldsymbol{\delta}_r^\top$，形状$(d_{\text{in}}, d_{\text{out}})$。全部存下来要$B\,d_{\text{in}}d_{\text{out}}$个数，是平均梯度内存的$B$倍——$B = 256$、层为$4{,}096\times4{,}096$时约$4.3\times10^9$个数，而平均梯度只要$1.7\times10^7$个。注意$\mathbf{h}_r$与$\boldsymbol{\delta}_r$在通常的反向传播中已经算好，所以逐样例**范数**可以按$\lVert\mathbf{h}_r\rVert\,\lVert\boldsymbol{\delta}_r\rVert$廉价得到，无需造出外积（Goodfellow，2015）。`jax.vmap(jax.grad(loss), in_axes=(None, 0))`把单样例梯度函数映射到数据的批量轴上、同时共享参数；它生成的向量化程序算的正是批量化的这些外积。
:::
:::
