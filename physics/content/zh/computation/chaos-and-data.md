一台计算机积分一个混沌系统，产出的轨迹很快就错，而统计量在很长时间内都对。这句话的两半都需要数字来支撑。「很快」是多快？哪些统计量，误差条多大？本章通过计算回答前一半：给逻辑斯蒂（logistic）画分岔图和费根鲍姆（Feigenbaum）常数，算洛伦兹（Lorenz）系统的最大李雅普诺夫（Lyapunov）指数，找出藏在洛伦兹吸引子里的一维映射。然后转向后一半问题——那是物理学家与数据打交道的日常：带着不确定度拟合模型、用 $\chi^2$ 评判拟合、传播误差、用自助法（bootstrap）重抽样，以及通过傅里叶变换与自相关来审视一个信号。

混沌的理论——不动点、庞加莱（Poincaré）截面、李雅普诺夫指数的定义——在 [[analytical-mechanics/chaos]]，这里不复述。作为线性代数的最小二乘在 [[computation/linear-algebra]]；傅里叶级数与变换在 [[math-methods/fourier]]。积分器是 [[computation/integrating-motion#alg-rk4]] 的经典 RK4。所有程序只用 Python 3 加标准库，所以 FFT、拟合和积分器都写了出来。每个打印出的数字都是旁边那段程序的输出，每个随机数都出自写明的种子。

## 算出来的逻辑斯蒂映射 {#logistic}

$[0, 1]$ 上的逻辑斯蒂映射 $x_{n+1} = r x_n(1 - x_n)$ 是标准的实验台。它的倍周期级联和几个 $r$ 值处的李雅普诺夫指数在 [[analytical-mechanics/chaos]] 里已经算过。这里我们算三样东西：分岔图、沿它的李雅普诺夫指数、以及六位数字的费根鲍姆比。

::: definition 分岔图 {#def-bifurcation}
对一族映射 $x \mapsto f_r(x)$，**分岔图**把每个参数值 $r$ 之后一条轨道（丢弃瞬态之后）所到达的值的集合画在 $r$ 上方。稳定的 $p$ 周期圈出现为该 $r$ 上方的 $p$ 个点；混沌吸引子出现为一条带。
:::

一张画出来的分岔图由成千上万列组成。每一列都是下面这个计算，程序对十个 $r$ 值各做一遍：从 $x = 0.5$ 迭代 $2000$ 次丢弃瞬态，再记录 $64$ 个迭代值（舍入到六位小数）并数出其中出现多少个不同的值。同时它对 $10^5$ 个迭代值平均 $\ln\lvert f_r'(x_n)\rvert = \ln\lvert r(1 - 2x_n)\rvert$，那就是映射的李雅普诺夫指数。

程序的后半段求**超稳定**参数 $R_n$，即 $2^n$ 周期圈穿过临界点 $x = \frac12$（此处 $f'(\frac12) = 0$）的那些 $r$。它们与分岔点交错排列，以相同的几何速率收敛到同一个积累点，但要精确计算容易得多：$R_n$ 是单个方程 $f_r^{2^n}(\frac12) = \frac12$ 的根。牛顿法需要关于 $r$ 的导数，它对 $x_{k+1} = r x_k(1 - x_k)$ 求导得到一条递推：

$$
\frac{\partial x_{k+1}}{\partial r} = x_k(1 - x_k) + r(1 - 2x_k)\,\frac{\partial x_k}{\partial r}, \qquad \frac{\partial x_0}{\partial r} = 0.
$$

```python
import math
def attractor(r, x=0.5, transient=2000, keep=64, n=100000):
    for _ in range(transient): x = r*x*(1 - x)
    pts, lam = set(), 0.0
    for i in range(n):
        x = r*x*(1 - x)
        lam += math.log(abs(r*(1 - 2*x)))
        if i < keep: pts.add(round(x, 6))
    return sorted(pts), lam/n
for r in (2.9, 3.1, 3.46, 3.55, 3.566, 3.6, 3.74, 3.83, 3.9, 4.0):
    a, lam = attractor(r)
    print("r = %.3f  distinct values = %2d  range %.4f..%.4f  lambda = %7.4f" % (r, len(a), a[0], a[-1], lam))
print("r = 4.000 started at x = 0.3 instead: lambda = %.4f" % attractor(4.0, x=0.3)[1])

def superstable(n, r):            # Newton's method for f^(2^n)(1/2) = 1/2 in the variable r
    for _ in range(50):
        x, dx = 0.5, 0.0          # dx is the derivative of x with respect to r
        for _ in range(2**n):
            dx = x*(1 - x) + r*(1 - 2*x)*dx
            x = r*x*(1 - x)
        step = (x - 0.5)/dx; r -= step
        if abs(step) < 1e-14: break
    return r
R = [2.0, 1 + math.sqrt(5)]
for n in range(2, 12):
    R.append(superstable(n, R[-1] + (R[-1] - R[-2])/4.67))
for n in range(2, len(R)):
    print("n = %2d  R_n = %.10f  delta_n = %.6f" % (n, R[n], (R[n-1] - R[n-2])/(R[n] - R[n-1])))
```

输出（不到一秒）：

```
r = 2.900  distinct values =  1  range 0.6552..0.6552  lambda = -0.1054
r = 3.100  distinct values =  2  range 0.5580..0.7646  lambda = -0.2638
r = 3.460  distinct values =  4  range 0.4132..0.8613  lambda = -0.0582
r = 3.550  distinct values =  8  range 0.3548..0.8874  lambda = -0.0999
r = 3.566  distinct values = 16  range 0.3450..0.8915  lambda = -0.0745
r = 3.600  distinct values = 64  range 0.3252..0.8996  lambda =  0.1829
r = 3.740  distinct values =  5  range 0.2275..0.9349  lambda = -0.1119
r = 3.830  distinct values =  3  range 0.1561..0.9574  lambda = -0.3697
r = 3.900  distinct values = 64  range 0.0953..0.9749  lambda =  0.4944
r = 4.000  distinct values =  1  range 0.0000..0.0000  lambda =  1.3863
r = 4.000 started at x = 0.3 instead: lambda = 0.6931
n =  2  R_n = 3.4985616993  delta_n = 4.708943
n =  3  R_n = 3.5546408628  delta_n = 4.680771
n =  4  R_n = 3.5666673799  delta_n = 4.662960
n =  5  R_n = 3.5692435316  delta_n = 4.668404
n =  6  R_n = 3.5697952937  delta_n = 4.668954
n =  7  R_n = 3.5699134654  delta_n = 4.669157
n =  8  R_n = 3.5699387742  delta_n = 4.669191
n =  9  R_n = 3.5699441946  delta_n = 4.669199
n = 10  R_n = 3.5699453555  delta_n = 4.669201
n = 11  R_n = 3.5699456041  delta_n = 4.669201
```

::: example 读这几列 {#ex-columns}
解读前九行。映射在哪些地方是混沌的？不同值的个数与 $\lambda$ 的符号如何相互印证？
::: solution
$r = 2.9$ 处只有一个值：稳定不动点 $1 - 1/r = 0.6552$。$3.1$ 处两个值，$3.46$ 处四个，$3.55$ 处八个，$3.566$ 处十六个：这就是级联，且一路 $\lambda < 0$，因为稳定圈把邻近轨道往回收缩。$3.6$ 越过积累点 $r_\infty \approx 3.5699$，记录的 $64$ 个值全不相同且 $\lambda = 0.18 > 0$：一条混沌带。$3.74$ 处的 $5$ 周期窗和 $3.83$ 处的 $3$ 周期窗，二者 $\lambda$ 为负，是混沌范围内的秩序孤岛。$3.9$ 处 $\lambda = 0.49$，轨道几乎游遍 $[0.095, 0.975]$ 全体。$64$ 这个计数意为「至少 $64$」：它分不清混沌与 $128$ 周期圈。指数可以，所以分岔图和 $\lambda$ 要成对出现。
:::
:::

::: warning 落在不动点上的轨道
$r = 4$ 那行声称只有一个不同的值 $0$，且 $\lambda = 1.3863 = \ln 4$。两者都是起点的产物。从 $x = 0.5$ 出发，映射精确给出 $f(0.5) = 1$，随后 $f(1) = 0$，而 $0$ 是不动点。平均里的每一项此后都是 $\ln\lvert f'(0)\rvert = \ln 4$。轨道在精确的二进制算术里坐落在这个不稳定不动点上，没有任何舍入误差能把它推开。从 $x = 0.3$ 出发，同一段代码给出 $0.6931 = \ln 2$，混沌吸引子的真正指数。用单一固定起点扫描 $r$ 的程序应当检查恰好卡死的轨道，或者从一个一般性的值出发。
:::

超稳定参数给出费根鲍姆比。估计 $\delta_n = (R_{n-1} - R_{n-2})/(R_n - R_{n-1})$ 到 $n = 10$ 稳定在 $4.669201$，即 [[analytical-mechanics/chaos]] 中引用的 $\delta = 4.669201609\ldots$。它们的逼近本身是几何的，所以 $\delta_n$ 大约每三层多挣两位数字。$n = 11$ 时周期为 $2048$，且 $R_{11} - R_{10} \approx 2.5 \times 10^{-7}$。每往下一层，这个差就除以 $4.67$，再来十几层就降到 $r = 3.57$ 附近双精度 $10^{-15}$ 的分辨率，这就是表格能走多远上限的由来。初值 $R_{n-1} + (R_{n-1} - R_{n-2})/4.67$ 用的正是那个待测常数来给牛顿法定方位。这并不循环：它只决定牛顿法从哪里起步，而从 $4$ 到 $5$ 之间任何粗略比值来的猜测都收敛到同样的根。

## 洛伦兹系统与其指数 {#lorenz}

逻辑斯蒂映射是个映射。洛伦兹系统是一个流，是对流方程经过粗暴截断得到的三个常微分方程：

$$
\dot x = \sigma(y - x), \qquad \dot y = x(\rho - z) - y, \qquad \dot z = xy - \beta z,
$$ {#eq-lorenz}

取经典参数 $\sigma = 10$、$\rho = 28$、$\beta = 8/3$。矢量场的散度是 $-(\sigma + 1 + \beta) = -13.67$，所以相空间中的体积每个单位时间缩小为 $e^{-13.67}$，轨道被吸引到一个零体积的集合上——洛伦兹吸引子。

要测量敏感依赖，就积分两个在 $x$ 上相差 $10^{-9}$ 的拷贝，观察它们的间距 $d(t)$。若最大李雅普诺夫指数是 $\lambda$，则 $d(t) \approx d_0 e^{\lambda t}$，直到 $d$ 大到与吸引子的尺寸相当。单独一对给出的是一次有噪声的有限时间估计。可靠的估计靠反复重标度把间距一直保持很小。

::: algorithm 用重整化求最大李雅普诺夫指数 {#alg-benettin}
选取小量 $d_0$、一个时间间隔 $\tau$ 和总时间 $T = M\tau$。从吸引子上启动参考轨道 $\mathbf u$ 和一条伴随轨道 $\mathbf v = \mathbf u + d_0\hat{\mathbf e}$。重复 $M$ 次：两条各积分时间 $\tau$；记录 $\ell_m = \ln(d/d_0)$，其中 $d = \lvert \mathbf v - \mathbf u\rvert$；然后重置 $\mathbf v = \mathbf u + (\mathbf v - \mathbf u)\,d_0/d$。于是

$$
\lambda \approx \frac{1}{M\tau}\sum_{m=1}^{M}\ell_m.
$$

重标度后的间距保持自己的方向，所以几个区间之后它就与最不稳定的方向对齐，估计量也就收敛到最大的那个指数。
:::

程序用 $h = 0.01$ 的 RK4 从 $(1, 1, 1)$ 积分 [[#eq-lorenz]]，丢弃 $10$ 个时间单位，并打印一对未经重整化的轨道的间距。它对 $t \le 20$ 把 $\ln d$ 对 $t$ 拟合直线，然后在两个步长下用 $d_0 = 10^{-8}$、$\tau = 1$、$T = 5000$ 执行 [[#alg-benettin]]。误差条来自 $10$ 个 $500$ 时间单位的块。

```python
import math
sigma, rho, beta = 10.0, 28.0, 8/3
def f(u):
    x, y, z = u
    return (sigma*(y - x), x*(rho - z) - y, x*y - beta*z)
def rk4(u, h):
    k1 = f(u)
    k2 = f([u[i] + 0.5*h*k1[i] for i in range(3)])
    k3 = f([u[i] + 0.5*h*k2[i] for i in range(3)])
    k4 = f([u[i] + h*k3[i] for i in range(3)])
    return [u[i] + h/6*(k1[i] + 2*k2[i] + 2*k3[i] + k4[i]) for i in range(3)]
def dist(u, v): return math.sqrt(sum((a - c)**2 for a, c in zip(u, v)))
def settle(h):                                   # 10 time units onto the attractor
    u = [1.0, 1.0, 1.0]
    for _ in range(round(10/h)): u = rk4(u, h)
    return u

h = 0.01; u = settle(h); v = [u[0] + 1e-9, u[1], u[2]]; ts, ls = [], []
for n in range(1, 4001):
    u = rk4(u, h); v = rk4(v, h); t = n*h
    if n % 500 == 0: print("t = %4.1f  separation = %.3e" % (t, dist(u, v)))
    if n % 10 == 0 and t <= 20: ts.append(t); ls.append(math.log(dist(u, v)))
tb, lb = sum(ts)/len(ts), sum(ls)/len(ls)
print("slope of ln(separation) for t <= 20: %.3f" % (sum((t - tb)*(l - lb) for t, l in zip(ts, ls))
                                                    / sum((t - tb)**2 for t in ts)))

def lyapunov(h, T=5000, d0=1e-8):               # renormalise the separation every time unit
    u = settle(h); v = [u[0] + d0, u[1], u[2]]; rates = []
    for _ in range(T):
        for _ in range(round(1/h)): u = rk4(u, h); v = rk4(v, h)
        d = dist(u, v); rates.append(math.log(d/d0))
        v = [u[i] + (v[i] - u[i])*d0/d for i in range(3)]
    m = T//10; blocks = [sum(rates[i*m:(i+1)*m])/m for i in range(10)]
    mu = sum(blocks)/10
    return mu, math.sqrt(sum((b - mu)**2 for b in blocks)/90)
for h in (0.01, 0.005): print("h = %.3f  lambda = %.4f +- %.4f" % ((h,) + lyapunov(h)))
```

输出（约 $8$ s）：

```
t =  5.0  separation = 3.312e-08
t = 10.0  separation = 1.629e-06
t = 15.0  separation = 4.997e-04
t = 20.0  separation = 3.557e-02
t = 25.0  separation = 6.422e+00
t = 30.0  separation = 2.113e+01
t = 35.0  separation = 3.913e+00
t = 40.0  separation = 1.215e+00
slope of ln(separation) for t <= 20: 0.925
h = 0.010  lambda = 0.9065 +- 0.0028
h = 0.005  lambda = 0.9069 +- 0.0025
```

::: example 预报管多久？ {#ex-horizon}
用测得的指数预言：初间距 $10^{-9}$ 的那对未重整化轨道，何时间距达到 $1$？与表格比较。
::: solution
由 $d(t) = d_0 e^{\lambda t}$，从 $d_0$ 长到 $\Delta$ 的时间是

$$
t_\Delta = \frac{1}{\lambda}\ln\frac{\Delta}{d_0} = \frac{\ln 10^9}{0.906} = \frac{20.72}{0.906} = 22.9.
$$

表格在 $t = 20$ 时 $d = 0.036$，$t = 25$ 时 $d = 6.4$，所以 $d = 1$ 在两者之间被越过，与 $22.9$ 一致。在那之后 $d$ 饱和到吸引子的尺寸——几十的量级——然后来回摆动：两次运行不过是吸引子上两个不相干的点。无情之处全在 $t_\Delta$ 的对数里。把初值精度从 $10^{-9}$ 提到双精度的极限 $10^{-15}$，$\Delta/d_0$ 增大一百万倍，预报却只多出 $\ln 10^6/0.906 = 15$ 个时间单位。
:::
:::

两个重整化估计 $0.9065 \pm 0.0028$ 与 $0.9069 \pm 0.0025$ 彼此相符，所以步长 $h = 0.01$ 在这个精度下没有给指数引入偏差；而它们在误差条内也符合这组参数下发表的数值 $\lambda_1 \approx 0.906$。单对轨道的斜率 $0.925$ 偏高。那是一次有限时间的样本，其值取决于那二十个时间单位里这对轨道恰好走过哪里，也取决于间距转向不稳定方向的瞬态。它根本没有误差条。$5000$ 个单位上的重整化平均才是测量；斜率只是示意。

::: widget plot
f: x*log(10)/l
x: 0, 16
y: 0, 45
sliders: l=0.906:0.2:2:0.01
labels: 由 10^(−位数) 增长到 1 的预报时间
caption: 对洛伦兹指数 $\lambda = 0.906$，可预报时间 $t = \ln(1/d_0)/\lambda$ 随初值正确位数 $-\log_{10} d_0$ 的变化。每多一位数字只买 $\ln 10/\lambda \approx 2.5$ 个时间单位，约等于绕吸引子一个翼三圈。拖动 $\lambda$，看看更快的指数如何按比例缩短一切预报。
:::

### 藏在流中的映射

庞加莱截面通过记录依次穿越某张曲面的点把流约化为映射；[[analytical-mechanics/chaos]] 给出了定义。洛伦兹在 1963 年的论文里用一个变体：他记录 $z(t)$ 的各个极大值 $z_n$，把 $z_{n+1}$ 对 $z_n$ 作图。接着上面的程序（`f`、`rk4` 和 `settle` 就按那里的定义），下面几行跑 $2000$ 个时间单位，用三点抛物线拟合定位每个极大值，并打印排序后数对的样本：

```python
h = 0.01; u = settle(h); maxima = []; z2 = z1 = None
for n in range(200000):                          # 2000 time units
    u = rk4(u, h); z = u[2]
    if z2 is not None and z1 > z2 and z1 > z:    # z1 is a local maximum: refine by a parabola
        maxima.append(z1 + (z - z2)**2/(8*(2*z1 - z2 - z)))
    z2, z1 = z1, z
pairs = sorted(zip(maxima[:-1], maxima[1:]))
print("%d maxima between %.3f and %.3f" % (len(maxima), min(maxima), max(maxima)))
for k in range(0, len(pairs), len(pairs)//8): print("z_n = %.3f  ->  z_n+1 = %.3f" % pairs[k])
print("largest z_n+1 = %.3f, reached from z_n = %.3f" % max(pairs, key=lambda p: p[1])[::-1])
```

```
2660 maxima between 30.163 and 47.103
z_n = 30.163  ->  z_n+1 = 30.372
z_n = 34.524  ->  z_n+1 = 35.440
z_n = 35.948  ->  z_n+1 = 37.435
z_n = 36.926  ->  z_n+1 = 39.094
z_n = 37.984  ->  z_n+1 = 41.690
z_n = 38.989  ->  z_n+1 = 42.178
z_n = 40.292  ->  z_n+1 = 38.884
z_n = 41.880  ->  z_n+1 = 36.386
z_n = 46.655  ->  z_n+1 = 30.667
largest z_n+1 = 47.103, reached from z_n = 38.553
```

按 $z_n$ 排序后，下一个极大值稳步上升，在 $z_n = 38.55$ 附近达到一个尖峰，然后下落。$2659$ 个数对在画图精度内落在同一条曲线上，形状像一个带尖顶的帐篷。住在三维空间里的流，被自己的强收缩挤到了近似一个一维映射的东西上；而这种形状的映射——单个极大值两侧都很陡——和帐篷映射出于同样的理由是混沌的。正是这个观察说明，为什么逻辑斯蒂映射这个玩具能描述真实耗散流的特征。

::: quiz
两个学生跑同一个洛伦兹程序，一个在笔记本上，一个在集群上，他们的 $x(40)$ 值第一位小数就不同。他们该得出什么结论？
- [ ] 某台机器有 bug，因为 RK4 是确定性的。
- [ ] 步长 $h = 0.01$ 太大；把它减半能让两次运行在 $t = 40$ 处一致。
- [x] 什么都没坏。最后一比特的差异——来自编译器或运算顺序——按 $e^{0.9t}$ 增长，到 $t \approx 40$ 已达 $1$ 的量级。他们该比较统计量，比如 $\lambda$ 或 $z_n$ 的分布，而不是轨道。
- [ ] 混沌使 $t \approx 40$ 之后的每个数值结果失去意义。
::: solution
$10^{-16}$ 的差异被 $e^{0.906 \times 40} \approx 5 \times 10^{15}$ 放大后就是 $1$ 的量级。把 $h$ 减半同样会改变轨道，并不能让两台不同的机器算到一处。指数、吸引子以及在其上的平均值在统计误差内可复现——程序里的两个步长就是证明。
:::
:::

## 可复现性 {#reproducibility}

浮点算术是确定性的：同样的输入、同样的顺序做同样的运算，得到同样的比特。但它不满足结合律。$(a + b) + c$ 与 $a + (b + c)$ 可以在最后一比特上不同，$\sigma(y - x)$ 与 $\sigma y - \sigma x$ 也可以。在非混沌的计算里，这类差异停留在舍入的层面；在混沌的计算里，它们会长大。

下面的程序用 $h = 0.01$ 的 RK4 从 $(1, 1, 1)$ 两次积分 [[#eq-lorenz]]，把右端写成两种代数上相同的写法：

```python
import math
s, rho, b = 10.0, 28.0, 8/3
def fA(u):
    x, y, z = u; return (s*(y - x), x*(rho - z) - y, x*y - b*z)
def fB(u):
    x, y, z = u; return (s*y - s*x, rho*x - x*z - y, x*y - b*z)   # same algebra
def rk4(f, u, h):
    k1 = f(u); k2 = f([u[i] + 0.5*h*k1[i] for i in range(3)])
    k3 = f([u[i] + 0.5*h*k2[i] for i in range(3)]); k4 = f([u[i] + h*k3[i] for i in range(3)])
    return [u[i] + h/6*(k1[i] + 2*k2[i] + 2*k3[i] + k4[i]) for i in range(3)]
u = v = [1.0, 1.0, 1.0]; first = None
for n in range(1, 6001):
    u = rk4(fA, u, 0.01); v = rk4(fB, v, 0.01)
    d = math.sqrt(sum((a - c)**2 for a, c in zip(u, v)))
    if first is None and d > 0: first = n
    if n % 1000 == 0: print("t = %2d  x_A = %9.5f  x_B = %9.5f  |A - B| = %.2e" % (n//100, u[0], v[0], d))
print("first difference at step", first)
```

```
t = 10  x_A =  -4.90282  x_B =  -4.90282  |A - B| = 5.30e-14
t = 20  x_A =  13.47291  x_B =  13.47291  |A - B| = 6.56e-11
t = 30  x_A =   9.86686  x_B =   9.86686  |A - B| = 1.42e-06
t = 40  x_A =  -8.73678  x_B =  -8.82299  |A - B| = 1.42e-01
t = 50  x_A =   8.81327  x_B =  -0.10757  |A - B| = 1.60e+01
t = 60  x_A =  -7.05006  x_B =  -9.63008  |A - B| = 2.38e+01
```

两次运行在第 $41$ 步首次不同，差一个舍入；从 $t = 10$ 到 $t = 30$，差异增长了 $2.7 \times 10^{7}$ 倍，平均速率 $\ln(2.7 \times 10^7)/20 = 0.86$，接近 $\lambda$。到 $t = 50$，它们已在不同的翼上。$t \gtrsim 35$ 之后，两次运行都不能称为从 $(1, 1, 1)$ 出发的 [[#eq-lorenz]] 的「那条」解。关于**影子轨道（shadowing）**的一个定理——对某些混沌系统已获证明，对更多系统则被相信——说的是：每条数值轨道都贴近某条从稍异初值出发的真实轨道。正是这一点，让从任一次运行算出的统计量有意义。

::: remark 可复现数值工作的规则
记录每条随机流的种子，如 [[computation/random-sampling]] 那样。记录语言版本和库。输出要带够能比较两次运行的位数。对混沌系统，用带误差条的平均值而不是晚期状态来检验可复现性。若结果必须逐比特复现，就固定每个浮点求和的次序；求和顺序依赖计时的并行求和，是运行无法重复的常见根源。
:::

## 把模型拟合到数据 {#fitting}

混沌讲的是预报的极限。本章余下的部分讲模型如何与测量碰面。例子是单摆。小摆动下 $T = 2\pi\sqrt{L/g}$，所以 $T^2 = (4\pi^2/g)\,L$ 对 $L$ 线性，斜率 $b = 4\pi^2/g$。下面这段程序模拟一次实验：九个摆长从 $0.2$ 到 $1.0\,\mathrm m$，周期用 $g = 9.80\,\mathrm{m/s^2}$ 算出，再加上来自 `random.Random(5)`、$\sigma_T = 0.010\,\mathrm s$ 的高斯计时误差。分析者随后只拿到 $(L, T)$ 的表和 $\sigma_T$。

::: definition 加权最小二乘与 $\chi^2$ {#def-chi2}
给定数据 $(x_i, y_i)$，$i = 1, \dots, N$，$y_i$ 的误差是标准差 $\sigma_i$ 的独立高斯误差，模型为 $y = a + bx$，一对参数的**卡方**为

$$
\chi^2(a, b) = \sum_{i=1}^{N}\left(\frac{y_i - a - bx_i}{\sigma_i}\right)^2.
$$ {#eq-chi2}

**加权最小二乘**估计 $\hat a, \hat b$ 就是使它最小的那对。若模型正确且 $\sigma_i$ 取得对，最小值 $\chi^2_\mathrm{min}$ 服从自由度 $\nu = N - 2$ 的卡方分布，均值为 $\nu$，标准差为 $\sqrt{2\nu}$。
:::

::: theorem 直线拟合 {#thm-linfit}
设权重 $w_i = 1/\sigma_i^2$，记 $S = \sum w_i$，$S_x = \sum w_ix_i$，$S_y = \sum w_iy_i$，$S_{xx} = \sum w_ix_i^2$，$S_{xy} = \sum w_ix_iy_i$，$D = SS_{xx} - S_x^2$。则

$$
\hat a = \frac{S_{xx}S_y - S_xS_{xy}}{D}, \qquad \hat b = \frac{SS_{xy} - S_xS_y}{D},
$$

并且

$$
\sigma_a^2 = \frac{S_{xx}}{D}, \qquad \sigma_b^2 = \frac{S}{D}, \qquad \Cov(\hat a, \hat b) = -\frac{S_x}{D}.
$$
:::

::: proof
令 $\partial\chi^2/\partial a = 0$ 与 $\partial\chi^2/\partial b = 0$，得正规方程 $S a + S_x b = S_y$ 与 $S_x a + S_{xx} b = S_{xy}$。其行列式为 $D$；除非所有 $x_i$ 相等，它为正（由关于权重的柯西–施瓦茨不等式）。克拉默法则给出 $\hat a$ 与 $\hat b$。两个估计量都对数据线性：$\hat b = \sum_i c_iy_i$，其中 $c_i = w_i(Sx_i - S_x)/D$。对独立的 $y_i$，$\Var(\hat b) = \sum c_i^2\sigma_i^2 = \sum w_i(Sx_i - S_x)^2/D^2$。把平方展开，$\sum w_i(Sx_i - S_x)^2 = S^2S_{xx} - 2SS_x^2 + SS_x^2 = SD$，故 $\Var(\hat b) = S/D$。对 $\hat a = \sum d_iy_i$、$d_i = w_i(S_{xx} - S_xx_i)/D$ 做同样计算，得 $\Var(\hat a) = S_{xx}/D$ 与 $\Cov(\hat a, \hat b) = \sum c_id_i\sigma_i^2 = -S_x/D$。
:::

$T^2$ 上的误差来自 $T$ 上的误差。这一步，以及从 $\hat b$ 到 $g$ 的那一步，用的是同一条法则。

::: proposition 一阶误差传播 {#prop-propagation}
若 $q = F(p_1, \dots, p_m)$ 可微，且 $p_j$ 带有协方差矩阵 $C$ 的小误差，则到一阶

$$
\sigma_q^2 = \sum_{j,k}\frac{\partial F}{\partial p_j}\frac{\partial F}{\partial p_k}\,C_{jk},
$$

误差独立时即 $\sigma_q^2 = \sum_j (\partial F/\partial p_j)^2\sigma_j^2$。
:::

::: proof
把 $F$ 在真值 $\bar p$ 附近展开：$q - F(\bar p) = \sum_j \partial_jF\,(p_j - \bar p_j) + O(\lvert p - \bar p\rvert^2)$。丢掉二次余项，$q$ 就是误差的线性组合，而 $\sum_j c_j\varepsilon_j$ 的方差是 $\sum_{j,k}c_jc_k\Cov(\varepsilon_j, \varepsilon_k)$。当误差比起 $\partial F$ 变化的尺度来很小时，这个近似很好。
:::

对 $y = T^2$，$\sigma_y = 2T\sigma_T$。对 $g = 4\pi^2/b$，$\sigma_g = (4\pi^2/b^2)\,\sigma_b = g\,\sigma_b/b$：相对误差原封不动地穿过一个幂。

自助法给误差一个不依赖所报 $\sigma_i$ 的第二意见。

::: algorithm 自助重抽样 {#alg-bootstrap}
从 $N$ 个数据点**有放回**地随机抽 $N$ 个点，于是有的点出现两次，有的根本不出现。在这个重样本上重算估计量。重复 $B$ 次，典型地 $B \ge 1000$。$B$ 个估计量的标准差估计原估计量的标准误差，它们的中间 $68\%$ 给出近似的置信区间。
:::

```python
import math, random
rng = random.Random(5)
g_true, sT = 9.80, 0.010                        # metres per second squared; seconds
L = [0.2 + 0.1*i for i in range(9)]
T = [2*math.pi*math.sqrt(l/g_true) + rng.gauss(0, sT) for l in L]
y = [t*t for t in T]; sy = [2*t*sT for t in T]   # propagate sigma_T to T^2

def linfit(x, y, s):                             # weighted least squares, y = a + b x
    w = [1/si**2 for si in s]
    S = sum(w); Sx = sum(wi*xi for wi, xi in zip(w, x)); Sy = sum(wi*yi for wi, yi in zip(w, y))
    Sxx = sum(wi*xi*xi for wi, xi in zip(w, x)); Sxy = sum(wi*xi*yi for wi, xi, yi in zip(w, x, y))
    D = S*Sxx - Sx*Sx
    a = (Sxx*Sy - Sx*Sxy)/D; b = (S*Sxy - Sx*Sy)/D
    chi2 = sum(((yi - a - b*xi)/si)**2 for xi, yi, si in zip(x, y, s))
    return a, b, math.sqrt(Sxx/D), math.sqrt(S/D), -Sx/D, chi2

def chi2_sf(c, k):                               # P(chi^2_k > c), series for the lower gamma
    a, x = k/2, c/2; term = total = 1/a; n = 0
    while term > 1e-17*total:
        n += 1; term *= x/(a + n); total += term
    return 1 - math.exp(-x + a*math.log(x) - math.lgamma(a))*total

a, b, sa, sb, cab, chi2 = linfit(L, y, sy)
for l, t in zip(L, T): print("L = %.1f m  T = %.4f s" % (l, t))
print("a = %.5f +- %.5f s^2,  b = %.5f +- %.5f s^2/m,  r_ab = %.3f" % (a, sa, b, sb, cab/(sa*sb)))
print("chi2 = %.2f for %d degrees of freedom, P(chi2 > this) = %.3f" % (chi2, len(L) - 2, chi2_sf(chi2, len(L) - 2)))
g = 4*math.pi**2/b; print("g = %.3f +- %.3f m/s^2" % (g, g*sb/b))

boot = random.Random(11); bs = []
for _ in range(2000):                            # resample (L, T) pairs with replacement
    idx = [boot.randrange(len(L)) for _ in L]
    if len(set(idx)) < 3: continue
    bs.append(linfit([L[i] for i in idx], [y[i] for i in idx], [sy[i] for i in idx])[1])
m = sum(bs)/len(bs)
print("bootstrap: %d resamples, slope sd = %.5f" % (len(bs), math.sqrt(sum((v - m)**2 for v in bs)/(len(bs) - 1))))
gs = sorted(4*math.pi**2/v for v in bs)
print("bootstrap 68%% interval for g: %.3f .. %.3f" % (gs[int(0.16*len(gs))], gs[int(0.84*len(gs))]))
a2, b2, sa2, sb2, c2, chi2b = linfit(L, y, [v/2 for v in sy])
print("if sigma_T were claimed as 0.005 s: chi2 = %.2f, P = %.4f" % (chi2b, chi2_sf(chi2b, len(L) - 2)))
w = [1/v**2 for v in sy]                         # one-parameter fit y = b x
Swxx = sum(wi*xi*xi for wi, xi in zip(w, L))
b0 = sum(wi*xi*yi for wi, xi, yi in zip(w, L, y))/Swxx; sb0 = 1/math.sqrt(Swxx)
c0 = sum(((yi - b0*xi)/si)**2 for xi, yi, si in zip(L, y, sy)); g0 = 4*math.pi**2/b0
print("through origin: b = %.5f +- %.5f, chi2 = %.2f (8 dof), P = %.3f, g = %.3f +- %.3f"
      % (b0, sb0, c0, chi2_sf(c0, 8), g0, g0*sb0/b0))
```

```
L = 0.2 m  T = 0.8858 s
L = 0.3 m  T = 1.0878 s
L = 0.4 m  T = 1.2761 s
L = 0.5 m  T = 1.3963 s
L = 0.6 m  T = 1.5533 s
L = 0.7 m  T = 1.6567 s
L = 0.8 m  T = 1.8062 s
L = 0.9 m  T = 1.9061 s
L = 1.0 m  T = 2.0207 s
a = -0.03681 +- 0.01923 s^2,  b = 4.07562 +- 0.03652 s^2/m,  r_ab = -0.881
chi2 = 12.42 for 7 degrees of freedom, P(chi2 > this) = 0.087
g = 9.686 +- 0.087 m/s^2
bootstrap: 2000 resamples, slope sd = 0.05150
bootstrap 68% interval for g: 9.599 .. 9.782
if sigma_T were claimed as 0.005 s: chi2 = 49.70, P = 0.0000
through origin: b = 4.01400 +- 0.01724, chi2 = 16.09 (8 dof), P = 0.041, g = 9.835 +- 0.042
```

::: example 拟合可接受吗，$g$ 是多少？ {#ex-fit}
解读输出。$\chi^2$ 合理吗？自助法与公式为何不一致，该报告哪个 $g$ 值？
::: solution
$\nu = 7$ 时，$\chi^2$ 的均值是 $7$，标准差是 $\sqrt{14} = 3.7$。$12.42$ 高出 $1.5$ 个标准差，取值至少这么大的概率是 $0.087$。这并不稀奇：大约每十一次诚实的实验就有一次这么糟。倘若分析者当初宣称 $\sigma_T = 0.005\,\mathrm s$，$\chi^2$ 就会大四倍，成 $49.7$，概率低于 $10^{-4}$，拟合便当场戳穿这个宣称。

两参数拟合给出 $g = 9.686 \pm 0.087\,\mathrm{m/s^2}$，比真值 $9.80$ 低 $1.3$ 个标准误差。截距是 $-0.037 \pm 0.019\,\mathrm{s^2}$，且 $\hat a$ 与 $\hat b$ 的相关系数为 $-0.88$：绕数据中心转动的直线用截距换斜率。物理说截距为零。强加这一条后，单参数拟合给出 $g = 9.835 \pm 0.042\,\mathrm{m/s^2}$，误差条减半，距 $9.80$ 只有 $0.8$ 个标准误差，$\chi^2 = 16.09$ 对 $8$ 个自由度。一个约束使 $\chi^2$ 增加 $3.67$，是 $1.9\sigma$ 的紧张，不是保留截距的理由。

斜率的自助标准差是 $0.0515$，而公式给 $0.0365$。公式完全信任所报的 $\sigma_i$；自助法用的是实际的散布。散布比宣称的大 $\sqrt{\chi^2/\nu} = \sqrt{12.42/7} = 1.33$ 倍，而 $0.0365 \times 1.33 = 0.049$，与自助法接近。只有九个点时自助法本身也很粗，因为每个重样本都从同样九个值里抽。
:::
:::

::: widget plot
f: x^(k/2 - 1)*exp(-x/2)/(2^(k/2)*gamma(k/2))
x: 0, 30
y: 0, 0.25
sliders: k=7:1:20:1
labels: k 自由度下的卡方密度
caption: $\chi^2$ 在 $k$ 个自由度下的概率密度。$k = 7$ 时它在 $5$ 处达峰值、均值为 $7$；拟合的 $12.42$ 落在上尾，其外还有 $8.7\%$ 的概率。增大 $k$，密度右移、且相对均值变窄：$\chi^2/k$ 集中在 $1$ 附近——这就是「约化卡方」对多数据点是有用的概括、对少数点却很糟的原因。
:::

::: warning 滥用拟合的三种方式
三种常见错误在单摆拟合里聚齐了。对 $T^2$ 用非加权最小二乘，把每个点当作同样精确，尽管 $\sigma_{T^2} = 2T\sigma_T$ 随 $T$ 增大。不看 $\chi^2$ 就照公式报 $\sigma_b$，等于假定误差条是对的，而那恰是数据唯一能检验的东西。把 $\chi^2/\nu = 0.1$ 当作「非常好的拟合」来报告，则错过了误差被高估、或数据点并不独立这两层含义。
:::

## 信号：离散傅里叶变换 {#fourier}

以间隔 $\Delta t$ 采样的时间序列 $x_0, \dots, x_{N-1}$ 可以写成 $N$ 个复指数之和。权重告诉你信号里含有哪些频率。

::: definition 离散傅里叶变换 {#def-dft}
$x_0, \dots, x_{N-1}$ 的**离散傅里叶变换**为

$$
X_k = \sum_{n=0}^{N-1} x_n\, e^{-2\pi i kn/N}, \qquad k = 0, \dots, N - 1,
$$ {#eq-dft}

其逆变换为 $x_n = \frac1N\sum_k X_k\,e^{2\pi i kn/N}$。下标 $k$ 对应频率 $f_k = k/(N\Delta t)$。**功率谱**为 $\lvert X_k\rvert^2$；对实数据 $X_{N-k} = \overline{X_k}$，所以只有 $k \le N/2$ 携带信息。
:::

直接照 [[#eq-dft]] 求值要花 $N^2$ 次复数乘法。库利（Cooley）与图基（Tukey）的算法把开销降到 $N\log N$ 量级。

::: theorem 基-2 快速傅里叶变换 {#thm-fft}
设 $N$ 为偶数，$E_k$ 与 $O_k$ 分别是偶数下标样本 $x_0, x_2, \dots$ 与奇数下标样本 $x_1, x_3, \dots$ 的长度 $N/2$ 的 DFT。则对 $0 \le k < N/2$，

$$
X_k = E_k + e^{-2\pi i k/N}O_k, \qquad X_{k + N/2} = E_k - e^{-2\pi i k/N}O_k.
$$

若 $N = 2^p$，递归地套用此式，算 DFT 只需 $\frac N2\log_2 N$ 次复数乘法。
:::

::: proof
把和式 [[#eq-dft]] 按偶数 $n = 2m$ 与奇数 $n = 2m + 1$ 分开：

$$
X_k = \sum_{m=0}^{N/2-1} x_{2m}\,e^{-2\pi i km/(N/2)} + e^{-2\pi ik/N}\sum_{m=0}^{N/2-1} x_{2m+1}\,e^{-2\pi i km/(N/2)} = E_k + e^{-2\pi ik/N}O_k .
$$

这两个半长变换以 $N/2$ 为周期依赖 $k$，且 $e^{-2\pi i(k + N/2)/N} = -e^{-2\pi ik/N}$，于是得到第二个式子。合并要花 $N/2$ 次乘旋转因子 $e^{-2\pi ik/N}$。若 $M(N)$ 是长度 $N$ 的乘法次数，则 $M(N) = 2M(N/2) + N/2$ 且 $M(1) = 0$；对 $N = 2^p$，其解为 $M(N) = \frac N2 p = \frac N2\log_2 N$，代入即可验证：$2 \cdot \frac N4(p - 1) + \frac N2 = \frac N2 p$。
:::

采样有一个任何算法都去不掉的极限。

::: theorem 混叠与奈奎斯特频率 {#thm-alias}
以速率 $f_s = 1/\Delta t$ 取样，无法区分频率 $f$ 与 $f + mf_s$（$m$ 为任意整数），对实信号也无法区分它与 $mf_s - f$。因此每个频率都与 $[0, f_s/2]$ 内的某个频率无法区分。上限 $f_s/2$ 称为**奈奎斯特（Nyquist）频率**。
:::

::: proof
在采样时刻 $t_n = n/f_s$ 处，$e^{2\pi i(f + mf_s)t_n} = e^{2\pi i f t_n}e^{2\pi i mn} = e^{2\pi i f t_n}$，因为 $mn$ 是整数。对实信号，$\cos(2\pi(mf_s - f)t_n) = \cos(2\pi m n - 2\pi f t_n) = \cos(2\pi f t_n)$，而正弦只是变了符号。任何 $f$ 都能平移 $f_s$ 的整数倍进入 $(-f_s/2, f_s/2]$，再反射进 $[0, f_s/2]$。
:::

::: widget plot
f: sin(2*pi*a*x); sin(2*pi*(a - 8)*x)
x: 0, 1
y: -1.3, 1.3
sliders: a=5:0:8:0.1
labels: a Hz 处的信号; a − 8 Hz 处的混叠
caption: 频率为 $a$ 的正弦及其混叠 $a - 8$（即频率 $\lvert a - 8\rvert$ 的正弦），在一秒之内。以 $8$ Hz 采样、在 $t = 0, \frac18, \frac28, \dots$ 这些时刻看，两条曲线经过同样的点：去看它们相交之处。$a = 5$ 时混叠是 $3$ Hz。把 $a$ 拖到奈奎斯特频率 $4$ 以下，混叠反而成了较快的那条曲线：这时样本显示的是较慢的那条。
:::

下面的程序实现直接 DFT 和一个递归 FFT，把两者互相校验、给它们计时，并用 FFT 处理四个信号。它接着洛伦兹那段程序往下写，最后的信号由那里的 `rk4` 与 `settle` 产生。

```python
import cmath, math, time

def dft(x):                                      # direct sum, O(N^2)
    N = len(x)
    return [sum(x[n]*cmath.exp(-2j*math.pi*k*n/N) for n in range(N)) for k in range(N)]

def fft(x):                                      # radix-2 Cooley-Tukey, len(x) a power of 2
    N = len(x)
    if N == 1: return [complex(x[0])]
    E, O = fft(x[0::2]), fft(x[1::2])
    t = [cmath.exp(-2j*math.pi*k/N)*O[k] for k in range(N//2)]
    return [E[k] + t[k] for k in range(N//2)] + [E[k] - t[k] for k in range(N//2)]

x = [math.sin(0.3*n) + 0.5*math.cos(1.1*n) for n in range(256)]
print("max |DFT - FFT| for N = 256: %.2e" % max(abs(a - b) for a, b in zip(dft(x), fft(x))))
for N in (256, 1024):
    x = [math.sin(0.3*n) for n in range(N)]
    t0 = time.perf_counter(); dft(x); t1 = time.perf_counter(); fft(x); t2 = time.perf_counter()
    print("N = %4d  DFT %.3f s  FFT %.4f s" % (N, t1 - t0, t2 - t1))

def power(x):                                    # one-sided |X_k|^2 after removing the mean
    m = sum(x)/len(x); X = fft([v - m for v in x])
    return [abs(X[k])**2 for k in range(len(x)//2 + 1)]

fs, N = 8.0, 128                                 # aliasing: sample for 16 s at 8 Hz
for f0 in (3.0, 5.0):
    P = power([math.sin(2*math.pi*f0*n/fs) for n in range(N)])
    print("%.0f Hz sampled at 8 Hz: peak at %.3f Hz" % (f0, max(range(len(P)), key=P.__getitem__)*fs/N))

# logistic map: period 4 versus chaos
def logistic(r, N, x=0.3):
    for _ in range(1000): x = r*x*(1 - x)
    out = []
    for _ in range(N): x = r*x*(1 - x); out.append(x)
    return out
for r in (3.5, 3.9):
    P = power(logistic(r, 4096)); tot = sum(P)
    top = sorted(range(len(P)), key=P.__getitem__, reverse=True)[:2]
    print("r = %.1f  fraction of power in the 2 largest bins = %.4f  at frequencies %s"
          % (r, sum(P[k] for k in top)/tot, [round(k/4096, 4) for k in top]))

def autocorr(x, lags):
    m = sum(x)/len(x); d = [v - m for v in x]; c0 = sum(v*v for v in d)
    return [sum(d[i]*d[i + k] for i in range(len(d) - k))/c0 for k in lags]
print("logistic r = 4, autocorrelation at lags 1..4:",
      [round(c, 4) for c in autocorr(logistic(4.0, 100000), range(1, 5))])

u = settle(0.01); xs = []                         # Lorenz x(t), sampled every 0.05
for _ in range(8192):
    for _ in range(5): u = rk4(u, 0.01)
    xs.append(u[0])
P = power(xs); tot = sum(P)
top = sorted(range(len(P)), key=P.__getitem__, reverse=True)[:2]
print("Lorenz x(t): fraction of power in the 2 largest bins = %.4f" % (sum(P[k] for k in top)/tot))
half = 0; acc = 0.0
for k in range(len(P)):
    acc += P[k]
    if acc >= tot/2: half = k; break
print("half the power lies below f = %.3f" % (half/(8192*0.05)))
print("Lorenz x autocorrelation at lags 0.5, 1, 2, 4 time units:",
      [round(c, 3) for c in autocorr(xs, (10, 20, 40, 80))])
```

输出（约 $1$ s；计时因运行而异）：

```
max |DFT - FFT| for N = 256: 2.08e-12
N =  256  DFT 0.032 s  FFT 0.0008 s
N = 1024  DFT 0.514 s  FFT 0.0038 s
3 Hz sampled at 8 Hz: peak at 3.000 Hz
5 Hz sampled at 8 Hz: peak at 3.000 Hz
r = 3.5  fraction of power in the 2 largest bins = 1.0000  at frequencies [0.5, 0.25]
r = 3.9  fraction of power in the 2 largest bins = 0.0163  at frequencies [0.3811, 0.3997]
logistic r = 4, autocorrelation at lags 1..4: [-0.0008, -0.0028, -0.004, -0.0031]
Lorenz x(t): fraction of power in the 2 largest bins = 0.0352
half the power lies below f = 0.461
Lorenz x autocorrelation at lags 0.5, 1, 2, 4 time units: [0.19, 0.146, 0.025, 0.031]
```

::: example 周期与混沌的谱 {#ex-spectra}
解释 $r = 3.5$ 与 $r = 3.9$ 处逻辑斯蒂映射的行，以及混叠正弦的行。
::: solution
$r = 3.5$ 时吸引子是 $4$ 周期圈，序列每四步一重复。$4$ 周期序列只含每步频率 $0$、$\frac14$ 与 $\frac12$（还有 $\frac14$ 的镜像 $\frac34$）。去掉均值后，全部功率都在 $\frac14$ 与 $\frac12$ 两个 bin 里：打印的份额是 $1.0000$。$r = 3.9$ 时最大的两个 bin 只占功率的 $1.6\%$。谱是**宽带**的：功率铺在连续的频率上，这是混沌的谱签名。单凭宽带谱不能证明混沌，因为噪声也是宽带的；它排除的是周期或准周期信号——那类信号的功率坐在离散的谱线上。

$3\,\mathrm{Hz}$ 与 $5\,\mathrm{Hz}$ 两个正弦以 $8\,\mathrm{Hz}$ 采样后，峰值都在 $3\,\mathrm{Hz}$。奈奎斯特频率是 $4\,\mathrm{Hz}$；$5\,\mathrm{Hz}$ 在其上，被折回 $8 - 5 = 3\,\mathrm{Hz}$，正如 [[#thm-alias]] 所说。仅凭样本，两个实验完全相同。唯一的防御是在采样之前滤掉 $f_s/2$ 以上的频率。每个正弦在 $16\,\mathrm s$ 内都恰是整数个周期，所以峰值正好落在 bin 上；否则功率会泄漏进邻近的 bin。
:::
:::

计时展示了标度：$N$ 增为四倍，直接 DFT 的时间乘 $16$，FFT 的时间乘约 $5$，正合预测的 $4 \times 10/8 = 5$。$N = 1024$ 时 FFT 快出一百倍之上，而且优势无界地增长。$2 \times 10^{-12}$ 的一致性是舍入所致：两个算法把同样的项按不同的顺序相加。

## 自相关 {#autocorrelation}

::: definition 自相关函数 {#def-autocorr}
均值为 $\mu$、方差为 $s^2$ 的平稳序列在滞后 $k$ 处的**自相关**为

$$
\rho_k = \frac{\E[(x_n - \mu)(x_{n+k} - \mu)]}{s^2},
$$

估计时把期望换成对可得的配对求平均。$\rho_0 = 1$，且 $\lvert\rho_k\rvert \le 1$。
:::

自相关与功率谱携带同样的信息。由**维纳–辛钦（Wiener–Khinchin）定理**，平稳过程的功率谱是其自相关的傅里叶变换；对周期序列的离散表述见 [[#exr-wk]]。窄的谱线意味着持久的关联，宽的谱意味着很快死去的关联。洛伦兹的 $x(t)$ 把两者都演示了：它的自相关在滞后 $0.5$ 处降到 $0.19$，到滞后 $2$ 只剩 $0.03$；它的一半功率位于每单位时间 $0.46$ 个周期以下，来自吸引子两翼之间的不规则切换。关联时间对误差条要紧：平均一条相关序列，需要 [[computation/random-sampling#ex-metro]] 里量过、并在 [[computation/many-particles]] 里用作分块误差的那个修正。

::: example 不相关但是确定性的 {#ex-uncorrelated}
$r = 4$ 的逻辑斯蒂映射是完全确定性的：$x_{n+1}$ 是 $x_n$ 的函数。可程序在滞后 $1$ 到 $4$ 处找到的自相关是 $-0.0008$、$-0.0028$、$-0.0040$、$-0.0031$。它们与零相容吗？这教会我们什么？
::: solution
对一条不相关序列的 $N = 10^5$ 个值，估计的 $\rho_k$ 的标准误差约为 $1/\sqrt N = 0.0032$。四个值都在距零约 $1.3$ 个标准误差之内。事实上这个映射的精确自相关在每个非零滞后处都为零：用映射的不变密度，$\E[(x_n - \frac12)(x_{n+1} - \frac12)] = 0$，[[#exr-zero-corr]] 请你验证。于是这个确定性序列的自相关——连同功率谱——正是白噪声的自相关。二阶统计量只看得见线性依赖。这里的依赖完全非线性：$x_{n+1}$ 对 $x_n$ 的图就是抛物线 $4x(1 - x)$。要把混沌与噪声区分开，需要能看见那种结构的工具，比如回归映射、李雅普诺夫指数或吸引子的维数。
:::
:::

::: quiz
一台探测器以 $f_s = 1000\,\mathrm{Hz}$ 采样。它的谱在 $40\,\mathrm{Hz}$ 处显示一条尖线，可仪器里没有任何已知的源在这个频率上。已知存在一个 $1040\,\mathrm{Hz}$ 的振动。最可能的解释是什么？
- [ ] FFT 在低频处有 bug。
- [x] 那个 $1040\,\mathrm{Hz}$ 的振动被混叠到了 $1040 - 1000 = 40\,\mathrm{Hz}$，因为采样前没有把它滤掉。
- [ ] $40\,\mathrm{Hz}$ 的谱线意味着信号是混沌的。
- [ ] 只有当信号在窗口内周期时，奈奎斯特频率以下才可能出现谱线。
::: solution
由 [[#thm-alias]]，在每秒 $1000$ 个样本下，$1040\,\mathrm{Hz}$ 与 $40\,\mathrm{Hz}$ 无法区分。办法是在数字转换器前面加一个 $500\,\mathrm{Hz}$ 以下的模拟低通滤波器，或者提高采样率。单条尖线与混沌的宽带谱恰好相反。
:::
:::

## 历史与后续内容 {#leads}

::: history 从洛伦兹到自助法
爱德华·洛伦兹（Lorenz）1963 年在《Journal of the Atmospheric Sciences》上发表了「Deterministic nonperiodic flow」。按他后来的自述，他是这样发现敏感依赖的：他用印到三位小数的值重启了一个更大的天气模型的运行，眼看着新运行与原运行分道扬镳。罗伯特·梅（May）1976 年在《Nature》上的综述「Simple mathematical models with very complicated dynamics」让逻辑斯蒂映射在生物学家和物理学家中间出了名。米切尔·费根鲍姆（Feigenbaum）在洛斯阿拉莫斯用一台可编程袖珍计算器工作，1975 年发现分岔点以比值 $4.669\ldots$ 几何收敛，1978 年发表了这一比值的普适性。詹卡洛·贝内廷（Benettin）、路易吉·加尔加尼（Galgani）、安东尼奥·焦尔吉利（Giorgilli）与让-马里·斯特雷尔钦（Strelcyn）在 1980 年给出了整个李雅普诺夫谱的重整化算法。

数据这一侧，最小二乘可追溯到勒让德（Legendre，1805）与高斯（Gauss，1809）。詹姆斯·库利（Cooley）与约翰·图基（Tukey）在 1965 年发表了快速傅里叶变换，尽管高斯在 1805 年前后的未发表工作中已用过同一种拆分。采样极限的名字连着哈里·奈奎斯特（Nyquist，1928）与克劳德·香农（Shannon，1949）。布拉德利·埃夫龙（Efron）在 1979 年引入了自助法。
:::

这里算的混沌是 [[analytical-mechanics/chaos]] 的数值一侧；它对统计力学基础的后果——为什么沿一条混沌轨道的平均等于系综平均——在 [[statistical-mechanics/microcanonical]]。信号的傅里叶分析会回到 [[optics/diffraction]]，那里一个透镜就在计算二维傅里叶变换；也会回到 [[condensed-matter/crystals]]，那里的衍射图样是一个格子的傅里叶变换。用 $\chi^2$ 拟合、把误差传播出去，是你今后要写的每一份实验报告的语言。

::: summary
- 分岔图就是每个参数一列弃去瞬态后的迭代值。要把它和李雅普诺夫指数配成对：不同值的个数分不清混沌与长周期圈，$\lambda > 0$ 分得清。当心恰好落在不稳定不动点上的轨道。
- 用牛顿法找到的超稳定参数，不到一秒就给出七位数字的费根鲍姆 $\delta = 4.669201$。
- 对洛伦兹系统，重整化的 RK4 轨道对在 $h = 0.01$ 下给出 $\lambda = 0.9065 \pm 0.0028$，换 $h = 0.005$ 不变。从 $10^{-9}$ 精度出发的预报在约 $23$ 个时间单位后失效，每多一位数字只买 $\ln 10/\lambda \approx 2.5$。
- 代数上完全相同的代码在混沌运行中也会分道扬镳。要复现的是带误差条的统计量，不是晚期状态；记下种子与版本。
- 加权最小二乘以闭式给出估计、误差与协方差。$\chi^2$ 检验误差条；一阶传播把误差带过函数；自助法用实际散布估计误差。
- FFT 以 $\frac N2\log_2 N$ 次乘法算出 DFT。$f_s/2$ 以上的频率会混叠进 $[0, f_s/2]$，采样之后无法再剔除。
- 周期信号是线谱，混沌信号是宽带。自相关是功率谱的傅里叶伙伴，它定下误差条必须尊重的关联时间，但对非线性确定性是盲的。
:::

## 习题 {#exercises}

::: exercise 奈奎斯特频率 {level=1 check="4"}
一个信号以 $8\,\mathrm{Hz}$ 采样。样本能不混叠地表示的最高频率是多少赫兹？
::: solution
$f_s/2 = 4\,\mathrm{Hz}$，由 [[#thm-alias]]。
:::
:::

::: exercise $7\,\mathrm{Hz}$ 出现在哪里？ {level=1 check="3"}
一个 $7\,\mathrm{Hz}$ 的正弦以 $10\,\mathrm{Hz}$ 采样。它的谱峰出现在多少赫兹？
::: solution
奈奎斯特频率是 $5\,\mathrm{Hz}$，$7\,\mathrm{Hz}$ 折回 $10 - 7 = 3\,\mathrm{Hz}$。
:::
:::

::: exercise 一个费根鲍姆估计 {level=1 check="4.668"}
由 $R_3 = 3.5546408628$、$R_4 = 3.5666673799$ 与 $R_5 = 3.5692435316$，以四位有效数字计算 $\delta_5 = (R_4 - R_3)/(R_5 - R_4)$。
::: solution
$R_4 - R_3 = 0.0120265171$，$R_5 - R_4 = 0.0025761517$，故 $\delta_5 = 4.668$，与程序的输出相同。
:::
:::

::: exercise 预报期限 {level=1 check="22.9"}
设 $\lambda = 0.906$，初始间距 $10^{-9}$ 长到 $1$ 需要多久？给出一位小数。
::: solution
$t = \ln(10^9)/0.906 = 20.723/0.906 = 22.9$ 个时间单位。见 [[#ex-horizon]]。
:::
:::

::: exercise 传播到 $g$ {level=2 check="0.087"}
拟合斜率为 $b = 4.07562 \pm 0.03652\,\mathrm{s^2/m}$。以两位有效数字求 $g = 4\pi^2/b$ 的标准误差。
::: solution
由 [[#prop-propagation]]，$\sigma_g = \lvert\deriv{g}{b}\rvert\sigma_b = (4\pi^2/b^2)\sigma_b = g\,\sigma_b/b$。由 $g = 39.478/4.07562 = 9.686$，$\sigma_g = 9.686 \times 0.03652/4.07562 = 0.087\,\mathrm{m/s^2}$。
:::
:::

::: exercise FFT 省下的开销 {level=2 check="204.8"}
对 $N = 1024$，把直接 DFT 的 $N^2$ 次复数乘法与基-2 FFT 的 $\frac N2\log_2 N$ 比较。比值是多少？
::: solution
$N^2 = 1048576$，$\frac N2\log_2 N = 512 \times 10 = 5120$。比值是 $204.8$。程序里实测的时间比约 $0.514/0.0038 \approx 135$，之所以小些，是因为 FFT 还要为列表切片和递归付出开销。
:::
:::

::: exercise 合并两个测量 {level=2 check="9.82"}
两个独立实验给出 $g = 9.70 \pm 0.10$ 与 $g = 9.85 \pm 0.05\,\mathrm{m/s^2}$。求加权平均及其标准误差。
::: hint
加权平均就是常数的最小二乘拟合 $y = a$：对 $a$ 极小化 $\chi^2$。
:::
::: solution
极小化 $\sum (g_i - a)^2/\sigma_i^2$ 给出 $\hat a = \sum w_ig_i/\sum w_i$，其中 $w_i = 1/\sigma_i^2$：这里 $w$ 为 $100$ 和 $400$，故 $\hat a = (970 + 3940)/500 = 9.82\,\mathrm{m/s^2}$。其方差为 $1/\sum w_i = 1/500$，所以标准误差是 $0.045$。两个值相差 $0.15$，合并标准误差为 $\sqrt{0.01 + 0.0025} = 0.11$：即 $1.3\sigma$，是相容的。
:::
:::

::: exercise 卡住轨道的指数 {level=2 check="ln(4)"}
在逻辑斯蒂程序里，$r = 4$ 下从 $x = 0.5$ 出发的轨道两步之后到达 $x = 0$。证明此时 $\ln\lvert f'(x_n)\rvert$ 的平均收敛到 $\ln 4$，并解释为什么这个数不是吸引子的李雅普诺夫指数。
::: solution
$f(0.5) = 4 \times 0.5 \times 0.5 = 1$ 且 $f(1) = 0$，两者在二进制下都精确。此后 $x_n = 0$、$f'(0) = r = 4$，所以每一项都是 $\ln 4 = 1.3863$，$10^5$ 项的平均到第四位小数就等于它。这是 $0$ 处不稳定不动点的指数。一般的轨道永远不会被那个点俘获，它的指数是 $\ln 2$——从 $x = 0.3$ 得到的那个值。恰好落到 $0$ 上的起点集是可数的，但 $0.5$ 正是其中之一，而且它是一个自然的默认值。
:::
:::

::: exercise 离散傅里叶变换的帕塞瓦尔（Parseval）定理 {level=3}
证明 $\sum_{n=0}^{N-1}\lvert x_n\rvert^2 = \frac1N\sum_{k=0}^{N-1}\lvert X_k\rvert^2$。
::: hint
对 $0 \le n, m < N$ 使用：$n = m$ 时 $\sum_{k=0}^{N-1}e^{2\pi ik(n - m)/N} = N$，否则为 $0$。
:::
::: solution
先证提示。$n = m$ 时每一项都是 $1$。否则 $z = e^{2\pi i(n - m)/N} \ne 1$ 且 $z^N = 1$，于是几何和为 $(1 - z^N)/(1 - z) = 0$。现在

$$
\sum_k\lvert X_k\rvert^2 = \sum_k\sum_n\sum_m x_n\overline{x_m}\,e^{-2\pi ik(n - m)/N} = \sum_n\sum_m x_n\overline{x_m}\sum_k e^{-2\pi ik(n - m)/N} = N\sum_n\lvert x_n\rvert^2 .
$$

有限和的交换总是允许的。除以 $N$ 即得结论。这解释了为什么 $\sum_k \lvert X_k\rvert^2$——功率谱的总和——量的是信号的能量，也解释了程序里打印的功率份额为什么有意义。
:::
:::

::: exercise 离散的维纳–辛钦 {#exr-wk level=3}
对周期延拓的序列 $x_0, \dots, x_{N-1}$，定义循环自协方差 $c_k = \sum_{n=0}^{N-1}x_n\overline{x_{n+k}}$，下标模 $N$。证明 $\sum_{k=0}^{N-1} c_k\,e^{2\pi ijk/N} = \lvert X_j\rvert^2$。
::: solution
计算 $\sum_k c_k e^{2\pi ijk/N} = \sum_n x_n\sum_k \overline{x_{n+k}}\,e^{2\pi ijk/N}$。作代换 $m = n + k \bmod N$：$k$ 跑完一个周期时 $m$ 也跑完一个周期，而因为指数关于 $k$ 以 $N$ 为周期，$e^{2\pi ijk/N} = e^{2\pi ijm/N}e^{-2\pi ijn/N}$。二重和化为

$$
\sum_n x_ne^{-2\pi ijn/N}\,\sum_m\overline{x_m}\,e^{2\pi ijm/N} = X_j\,\overline{X_j} = \lvert X_j\rvert^2 .
$$

若把 $e^{+2\pi ijk/N}$ 换成 $e^{-2\pi ijk/N}$，结果是 $\lvert X_{-j}\rvert^2$，对实数据它等于 $\lvert X_j\rvert^2$。所以用 FFT 算出 $\lvert X_j\rvert^2$ 再变换回去，就能以 $O(N\log N)$ 次运算得到自相关，而不是程序里直接求和的 $O(N^2)$。对非周期序列，先补 $N$ 个零，循环求和就不会绕回去。
:::
:::

::: exercise 一个相关为零的确定性序列 {#exr-zero-corr level=3}
$r = 4$ 的逻辑斯蒂映射在 $(0, 1)$ 上的不变密度为 $p(x) = 1/(\pi\sqrt{x(1 - x)})$，它关于 $\frac12$ 对称。证明当 $x_n$ 服从这个密度时，$\E[(x_n - \frac12)(x_{n+1} - \frac12)] = 0$。
::: hint
写成 $x_{n+1} - \frac12 = 4x(1 - x) - \frac12 = \frac12 - 4(x - \frac12)^2$，再用对称性。
:::
::: solution
令 $u = x_n - \frac12$，则 $u$ 的密度在 $(-\frac12, \frac12)$ 上关于 $0$ 对称，且 $x_n(1 - x_n) = \frac14 - u^2$。于是 $x_{n+1} - \frac12 = 4(\frac14 - u^2) - \frac12 = \frac12 - 4u^2$，从而

$$
\E\bigl[u\bigl(\tfrac12 - 4u^2\bigr)\bigr] = \tfrac12\E[u] - 4\E[u^3] = 0,
$$

因为对称密度的奇数矩为零。$x$ 的均值由同一对称性是 $\frac12$，所以这就是协方差，且 $\rho_1 = 0$。程序里的 $-0.0008$ 是 $1/\sqrt N$ 量级的抽样涨落。对任何 $k \ge 1$，$x_{n+k}$ 是 $x_{n+1}$ 的函数，而后者是 $u$ 的偶函数；于是 $(x_{n+k} - \frac12)$ 关于 $u$ 为偶，与 $u$ 相乘得奇函数，所以每个 $k \ge 1$ 都有 $\rho_k = 0$。
:::
:::
