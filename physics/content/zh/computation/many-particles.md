给定力场中的一颗粒子，是 [[computation/integrating-motion]] 解过的那一类初值问题。两体问题借质心可以归约为单体，三个或更多则不能归约；而一旦有了三十个、一百个、十万个粒子，就没有人指望公式了。剩下的事是同时积分所有粒子的牛顿方程，并追问这些数字是什么意思。粒子是原子时，这叫**分子动力学**；粒子是恒星时，叫 **$N$ 体模拟**。两个领域共用一个积分器、一个代价问题和一套习惯。

每个粒子受的力是对其他所有粒子的求和，而算这个和几乎就是全部开销。我们从每一对都相互作用的引力开始，看软化、辛步子与树如何把代价和能量都控制住。然后转向周期盒子里的伦纳德–琼斯（Lennard-Jones）原子液体，从 $108$ 个类氩原子的一次运行里读出温度、压强和径向分布函数，每个都带误差条。

积分器是速度韦尔莱法，[[computation/integrating-motion#alg-verlet]]，作用在每个粒子上。时间平均的统计意义见 [[statistical-mechanics/canonical]] 与 [[statistical-mechanics/classical-gas]]。相关数据的误差条在 [[computation/random-sampling#ex-metro]] 中引入过。下面每个数字都由为本页运行过的程序产生，环境是只带标准库的 CPython 3.14；两个主程序全文给出。随机数来自 `random.Random(seed)`，每次使用的种子都已写明。

## 众多质点，一个受力律 {#direct}

::: definition 经典 $N$ 体问题 {#def-nbody}
给定 $N$ 个质点，质量 $m_i$、位置 $\mathbf r_i$、速度 $\mathbf v_i$，只通过依赖间距的成对势 $u(r)$ 相互作用，**$N$ 体问题**就是初值问题

$$
m_i \ddot{\mathbf r}_i = \sum_{j \neq i} \mathbf F_{ij}, \qquad \mathbf F_{ij} = -u'(r_{ij})\,\frac{\mathbf r_{ij}}{r_{ij}}, \qquad \mathbf r_{ij} = \mathbf r_i - \mathbf r_j,
$$ {#eq-nbody}

对 $i = 1, \dots, N$ 成立。总能量为 $E = \sum_i \frac12 m_i v_i^2 + \sum_{i<j} u(r_{ij})$。
:::

力 $\mathbf F_{ij}$ 是 $j$ 作用在 $i$ 上的力。牛顿第三定律 $\mathbf F_{ji} = -\mathbf F_{ij}$ 内建在公式里，因为交换 $i$ 与 $j$ 会把 $\mathbf r_{ij}$ 反向。程序应当利用这一点：每一对只算一次，把力加给一个粒子、从另一个粒子减去。对共有 $N(N-1)/2$ 个，所以用**直接求和**做一次受力计算的代价按 $N^2$ 增长。

::: proposition 动量的精确守恒 {#prop-momentum}
若 [[#eq-nbody]] 中的力逐对累加并保持 $\mathbf F_{ji} = -\mathbf F_{ij}$，则一步速度韦尔莱法改变总动量 $\mathbf P = \sum_i m_i \mathbf v_i$ 的量，除舍入外为零。
::: proof
速度韦尔莱步子对每个速度改变两次：一次加上按旧位置算出的 $\frac{h}{2m_i}\sum_j \mathbf F_{ij}$，一次在新位置处加上同一表达式。这样一次踢给 $\mathbf P$ 带来的改变是

$$
\frac{h}{2}\sum_i \sum_{j \neq i} \mathbf F_{ij} = \frac{h}{2}\sum_{i<j}\bigl(\mathbf F_{ij} + \mathbf F_{ji}\bigr) = \mathbf 0.
$$

位置更新不改变任何速度。于是两次踢都不动 $\mathbf P$。论证只用到成对力的反对称性，所以对任何成对势都成立，无论是否引入后文的周期映像——只要一对的两个成员用的是同一个间距矢量。
:::
:::

能量是另一回事。韦尔莱不精确守恒能量，但把它保持在一条宽度按 $h^2$ 收缩的带内，正如单个振子上的情形。动量与能量是本章每次运行的两个诊断量。

::: example 直接求和的代价 {#ex-cost}
下一节的函数 `accel` 为一个团簇计算全部成对力。在一台机器上对它调用三次计时，得到

| $N$ | 对数 $N(N-1)/2$ | 每次求值秒数 |
| --- | --- | --- |
| $64$ | $2016$ | $0.0025$ |
| $128$ | $8128$ | $0.0098$ |
| $256$ | $32640$ | $0.0388$ |
| $512$ | $130816$ | $0.1591$ |

估算 $N = 10^5$ 时一次求值的时间，以及 $N = 512$ 下一次运行 $1000$ 步的时间。
::: solution
$N$ 每翻倍一次，时间乘以 $3.9$、$4.0$ 和 $4.1$，正是 $N^2$ 个对数所预期的因子 $2^2$。每一对的耗时约 $0.1591/130816 = 1.2 \times 10^{-6}$ s。$N = 10^5$ 时有 $5.0 \times 10^9$ 对，一次求值约需 $6 \times 10^3$ s，将近两个小时。$N = 512$ 时，一千步约花 $160$ s。绝对数字属于那台机器和那门语言。每翻倍因子 $4$ 不属于它们。
:::
:::

## 引力与软化 {#gravity}

引力有 $u(r) = -Gm_im_j/r$，两天体靠近时力无界地增长。一次近距离相遇会要求一个比适合其他所有粒子的步长短得多的时间步长。无碰撞模拟——对星系或暗物质的——不去追踪这样的相遇：它们的粒子采样的是光滑的质量分布。标准的补救是在短程把势磨钝。

::: definition 普拉默（Plummer）软化 {#def-softening}
软化长度为 $\varepsilon > 0$ 的**软化**引力成对势是

$$
u_\varepsilon(r) = -\frac{G m_i m_j}{\sqrt{r^2 + \varepsilon^2}},
\qquad
\mathbf F_{ij} = -\frac{G m_i m_j\,\mathbf r_{ij}}{\bigl(r_{ij}^2 + \varepsilon^2\bigr)^{3/2}}.
$$ {#eq-soft}

当 $r \gg \varepsilon$ 时它就是牛顿引力。在 $r = 0$ 处它有限，且力为零。
:::

程序积分的是软化后的力，所以它应当守恒的是软化能量。这是另一个、更光滑的模型，在小于 $\varepsilon$ 的尺度上不同于牛顿引力。

::: widget plot
f: -1/x; -1/sqrt(x^2 + e^2)
x: 0.01, 2
y: -12, 0
sliders: e=0.1:0.01:0.5:0.01
labels: 牛顿 −1/r; 软化 −1/√(r² + ε²)
caption: 牛顿势与普拉默软化势，$G m_i m_j = 1$。拖动 $\varepsilon$。当 $r$ 大于几个 $\varepsilon$ 时两条曲线重合；在其内部，软化势阱在 $-1/\varepsilon$ 处有一个平底。底部的斜率就是力，它趋于零，所以一对靠得很近的粒子不再强迫取极小的时间步长。
:::

下面这段程序构造一个由 $32$ 个等质量质点组成的团簇，总质量 $1$，在单位球内均匀放置，每个速度分量是标准差 $0.3$ 的高斯抽样，全部出自 `random.Random(1)`。单位制取 $G = 1$。它分别用前向欧拉与速度韦尔莱积分到 $t = 10$——约为五个穿越时间 $\sim(G\rho)^{-1/2} \approx 2$——并打印运行期间所见最大的相对能量误差。

```python
import math, random

def accel(pos, m, eps2):                      # direct sum over pairs, G = 1
    n = len(pos); acc = [[0.0]*3 for _ in range(n)]; pot = 0.0
    for i in range(n):
        for j in range(i + 1, n):
            d = [pos[j][k] - pos[i][k] for k in range(3)]
            r2 = d[0]*d[0] + d[1]*d[1] + d[2]*d[2] + eps2
            inv = 1/math.sqrt(r2); inv3 = inv/r2
            pot -= m[i]*m[j]*inv
            for k in range(3):
                acc[i][k] += m[j]*d[k]*inv3; acc[j][k] -= m[i]*d[k]*inv3
    return acc, pot

def kinetic(vel, m):
    return 0.5*sum(mi*(v[0]**2 + v[1]**2 + v[2]**2) for mi, v in zip(m, vel))

def cluster(n, seed):
    rng = random.Random(seed); pos = []
    while len(pos) < n:                       # uniform in the unit ball
        p = [rng.uniform(-1, 1) for _ in range(3)]
        if sum(c*c for c in p) < 1: pos.append(p)
    vel = [[rng.gauss(0, 0.3) for _ in range(3)] for _ in range(n)]
    for k in range(3):                        # centre of mass at rest
        vc = sum(v[k] for v in vel)/n
        for v in vel: v[k] -= vc
    return pos, vel, [1/n]*n

def run(method, h, n=32, T=10, eps=0.05, seed=1):
    pos, vel, m = cluster(n, seed); eps2 = eps*eps
    acc, pot = accel(pos, m, eps2); E0 = kinetic(vel, m) + pot; worst = 0
    for s in range(round(T/h)):
        if method == "euler":
            for p, v, a in zip(pos, vel, acc):
                for k in range(3): p[k] += h*v[k]; v[k] += h*a[k]
            acc, pot = accel(pos, m, eps2)
        else:                                 # velocity Verlet: kick, drift, kick
            for p, v, a in zip(pos, vel, acc):
                for k in range(3): v[k] += 0.5*h*a[k]; p[k] += h*v[k]
            acc, pot = accel(pos, m, eps2)
            for v, a in zip(vel, acc):
                for k in range(3): v[k] += 0.5*h*a[k]
        worst = max(worst, abs(kinetic(vel, m) + pot - E0)/abs(E0))
    return E0, kinetic(vel, m) + pot, worst

for method in ("euler", "verlet"):
    for h in (0.01, 0.005):
        E0, E, w = run(method, h)
        print("%-6s h=%.3f  E0=%.6f  E(10)=%.6f  max|dE/E0|=%.2e" % (method, h, E0, E, w))
```

输出（约 $4$ s）：

```
euler  h=0.010  E0=-0.418622  E(10)=-0.185106  max|dE/E0|=5.58e-01
euler  h=0.005  E0=-0.418622  E(10)=-0.238792  max|dE/E0|=4.30e-01
verlet h=0.010  E0=-0.418622  E(10)=-0.418714  max|dE/E0|=1.57e-03
verlet h=0.005  E0=-0.418622  E(10)=-0.418703  max|dE/E0|=3.74e-04
```

$t = 0$ 时的动能与势能是 $0.1499$ 与 $-0.5686$，故 $2K/\lvert U\rvert = 0.53$。处于位力平衡的团簇应有这个比值等于 $1$。这个团簇出发时太冷，在安定之前先坍缩——这是一个苛刻的检验：坍缩期间粒子彼此靠近、不断加速。

::: example 读能量列 {#ex-nbody-energy}
解读四行输出。哪个方法可用？步长减半的表现是否符合阶的预言？
::: solution
到 $t = 10$，前向欧拉已经丢掉一半以上的束缚能：总能量从 $-0.4186$ 升到了 $-0.1851$。把团簇加热的是积分器而不是任何物理，而步长减半只把最差误差从 $56\%$ 降到 $43\%$。

韦尔莱的最差相对误差在 $h = 0.01$ 时是 $1.57 \times 10^{-3}$，在 $h = 0.005$ 时是 $3.74 \times 10^{-4}$。比值是 $4.2$，接近二阶方法的因子 $4$。最终能量 $-0.418714$ 与 $-0.418703$ 距初值不超过 $2 \times 10^{-4}$。两个方法每步都只求一次力，所以韦尔莱的优势不花额外代价。
:::
:::

软化必须与步长匹配。在 $h = 0.01$ 下重跑韦尔莱、只改 $\varepsilon$，得到：

| $\varepsilon$ | $E_0$ | 最大相对能量误差 |
| --- | --- | --- |
| $0.2$ | $-0.388076$ | $6.97 \times 10^{-5}$ |
| $0.05$ | $-0.418622$ | $1.57 \times 10^{-3}$ |
| $0.01$ | $-0.421528$ | $8.57 \times 10^{-1}$ |
| $0.002$ | $-0.421650$ | $7.55$ |

::: example 相对于软化太长的步长 {#ex-soften}
解释为什么 $\varepsilon \le 0.01$ 时能量误差爆炸，并估计一个能治好它的步长。
::: solution
近距离相遇中最短的时间尺度是穿过软化核的时间，约 $\varepsilon/v$，而坍缩期间相对速度的量级为 $1$。$\varepsilon = 0.05$ 时这约是 $0.05$，相当于 $h = 0.01$ 的若干步。$\varepsilon = 0.01$ 时它只剩一步：一对粒子可能一次踢就跳过核心，带着错误的能量出来。需要比 $\varepsilon/v$ 短好几倍的步长。$h = 0.001$、$\varepsilon = 0.01$ 的运行给出最差相对误差 $2.44 \times 10^{-3}$，与 $\varepsilon = 0.05$ 那次相当。小软化的代价出在步长上。
:::
:::

::: warning 守恒了错的能量，或把对的守坏了
软化模拟守恒的是软化能量。在间距与 $\varepsilon$ 相当处拿它的输出去和牛顿二体轨道比较，检验的是程序里并不包含的一个模型。相反的错误是不缩 $h$ 就「为了精度」缩小 $\varepsilon$。表格展示了结果：一个能量改变了好几倍的团簇。$\varepsilon$ 要由物理来选——对无碰撞系统通常取平均粒子间距的一个分数——然后由 $\varepsilon$ 和速度选 $h$，最后再核对能量。
:::

## 树方法：巴恩斯–哈特 {#tree}

远处的一群恒星作用在某颗恒星上的拉力，几乎等同于把质量集中在这群质心处的一个质点。这个代换的误差就是 [[math-methods/green-functions]] 的多极展开里的四极项：对一团尺度为 $s$、距离为 $d$ 的粒子，相对大小约 $(s/d)^2$。巴恩斯（Barnes）与哈特（Hut）把这个观察变成了一个代价按 $N\log N$ 而非 $N^2$ 增长的算法。

::: algorithm 巴恩斯–哈特受力计算 {#alg-bh}
1. 用一个立方体包住所有粒子。任何含有不止一个粒子的立方体都递归地分成八个子块，直到每个叶子至多含一个粒子。这就是一棵**八叉树**。
2. 在每个单元里保存它的总质量与质心，由子块算出。
3. 要求粒子 $i$ 上的力，就从根开始。对一个边长 $s$、质心与 $i$ 相距 $d$ 的单元：若 $s/d < \theta$，就在质心处加上一个质点的力并停止；否则打开这个单元，对其子块同样处理。含有另一个粒子的叶子总是直接使用。

**开角** $\theta$ 控制精度。$\theta = 0$ 会打开每个单元，复现直接求和。
:::

对大致均匀的分布，树的深度约 $\log_8 N$，每个粒子在每一层只与数目有界的单元相互作用。因此每个力的代价是 $\log N$ 量级的相互作用，整次求值是 $N\log N$。一个简短的 Python 八叉树（未印出；约六十行）在 $N$ 个于单位球内均匀分布的等质量质点上做了检验，种子 `random.Random(7)`，软化 $\varepsilon = 0.01$。对 $50$ 个测试粒子，把树算出的力与直接求和比较：

| $N$ | $\theta$ | 每个粒子的相互作用数 | 直接求和 | 相对力误差中位数 |
| --- | --- | --- | --- | --- |
| $1000$ | $0.5$ | $214$ | $999$ | $6.0 \times 10^{-3}$ |
| $4000$ | $0.5$ | $375$ | $3999$ | $4.9 \times 10^{-3}$ |
| $16000$ | $0.5$ | $497$ | $15999$ | $5.0 \times 10^{-3}$ |
| $16000$ | $0.3$ | $1450$ | $15999$ | $9.7 \times 10^{-4}$ |
| $16000$ | $0.8$ | $183$ | $15999$ | $1.6 \times 10^{-2}$ |

::: example 树省下了多少 {#ex-bh}
由表可见，$N = 16000$、$\theta = 0.5$ 时树把工作量降到几分之一？省下的量随 $N$ 如何增长？
::: solution
直接求和每个粒子要 $15999$ 次相互作用，树只要 $497$，因子 $32$。$N = 1000$ 时因子是 $999/214 = 4.7$，$N = 4000$ 时是 $3999/375 = 10.7$。$N$ 每增四倍，树的功只乘以 $1.75$、再乘 $1.33$——对数的缓慢增长——而由 $\theta$ 定夺的精度停在 $5 \times 10^{-3}$ 附近。把 $\theta$ 降到 $0.3$，用三倍的工作量换来五倍的精度。
:::
:::

千分之五的力误差对无碰撞系统可以接受，因为误差从一个粒子到下一个近乎随机，而粒子本身就是对光滑密度的一次带噪声的采样。对行星它不可接受：那里只有区区几个天体被追踪几十亿个轨道，何况直接求和本来就便宜。格林格德（Greengard）与罗赫林（Rokhlin）的快速多极方法（1987）把展开推到更高阶、让单元与单元相互作用，代价正比于 $N$。

## 伦纳德–琼斯流体 {#lj}

惰性气体原子在远处通过按 $r^{-6}$ 衰减的范德华（van der Waals，色散）相互作用微弱吸引，在电子云重叠时强烈排斥。同时具备这两个特征的最简单模型是 12–6 势。

::: definition 伦纳德–琼斯势与约化单位 {#def-lj}
**伦纳德–琼斯（Lennard-Jones）势**为

$$
u(r) = 4\epsilon\left[\left(\frac{\sigma}{r}\right)^{12} - \left(\frac{\sigma}{r}\right)^{6}\right],
$$ {#eq-lj}

它在 $r_\mathrm{min} = 2^{1/6}\sigma \approx 1.122\,\sigma$ 处有深度为 $-\epsilon$ 的极小，在 $r = \sigma$ 处为零。**约化单位**以 $\sigma$ 量长度、以 $\epsilon$ 量能量、以原子质量 $m$ 量质量，于是时间以 $\tau = \sigma\sqrt{m/\epsilon}$ 量。温度为 $T^* = k_BT/\epsilon$，数密度为 $\rho^* = \rho\sigma^3$，压强为 $P^* = P\sigma^3/\epsilon$。
:::

$r^{-12}$ 那面墙没有多深的道理；它便宜，因为它是 $r^{-6}$ 的平方。这个模型做对的是标度：在约化单位下，每一种伦纳德–琼斯物质都是同一种物质，一次运行近似地同时描述氩、氪或氙，只看你把哪一组 $\sigma$、$\epsilon$ 和 $m$ 代回去。这就是经典的对应态定律。

::: example 普通单位下的氩 {#ex-argon}
对氩取 $\sigma = 3.405\,\text{Å}$、$\epsilon/k_B = 119.8\,\mathrm K$、$m = 39.948\,\mathrm u$。把状态点 $T^* = 0.728$、$\rho^* = 0.8442$ 与时间步长 $h = 0.005\,\tau$ 换算成 SI 单位。
::: solution
温度是 $T = 0.728 \times 119.8\,\mathrm K = 87.2\,\mathrm K$，恰在氩的常压沸点 $87.3\,\mathrm K$ 之下。能量单位是 $\epsilon = 119.8 \times 1.380649 \times 10^{-23}\,\mathrm J = 1.654 \times 10^{-21}\,\mathrm J$，且 $m = 39.948 \times 1.66054 \times 10^{-27}\,\mathrm{kg} = 6.634 \times 10^{-26}\,\mathrm{kg}$。于是

$$
\tau = \sigma\sqrt{m/\epsilon} = 3.405 \times 10^{-10}\,\mathrm m \times \sqrt{\frac{6.634 \times 10^{-26}}{1.654 \times 10^{-21}}}\,\mathrm{s/m} = 2.156 \times 10^{-12}\,\mathrm s,
$$

故 $h = 0.005\,\tau = 1.08 \times 10^{-14}\,\mathrm s$，约 $11$ 飞秒。数密度为 $0.8442/\sigma^3 = 2.138 \times 10^{28}\,\mathrm m^{-3}$，质量密度是这个数乘 $m$，即 $1419\,\mathrm{kg/m^3}$，与沸点下液态氩接近。压强单位是 $\epsilon/\sigma^3 = 4.19 \times 10^{7}\,\mathrm{Pa}$，约 $419$ bar，所以约化压强 $0.03$ 约为 $13$ bar。
:::
:::

这个势是短程的：在 $r = 2.5\sigma$ 处它是 $-0.0163\,\epsilon$，不到势阱深度的 $2\%$。所以模拟都把它截断。在 $r_c$ 处生硬截掉会在 $u$ 上留下一个台阶，粒子跨过 $r_c$ 时总能量就会改变一个台阶那么大。**截断平移**势

$$
u_\mathrm{sh}(r) = \begin{cases} u(r) - u(r_c), & r < r_c, \\ 0, & r \ge r_c, \end{cases}
$$ {#eq-shift}

是连续的，在 $r_c$ 以内有同样的力，并且让韦尔莱的能量带完好如初。它的力在 $r_c$ 处仍然跳变 $u'(r_c)$，但跳变小，而且平移只影响能量，不影响截断以内的动力学。

::: widget plot
f: 4*(x^-12 - x^-6); (4*(x^-12 - x^-6) - 4*(c^-12 - c^-6))*heaviside(c - x); 24*(2*x^-13 - x^-7)
x: 0.9, 3
y: -2.5, 3
sliders: c=2.5:1.2:3:0.05
labels: u(r); 在 r_c 处截断平移; 力 −u′(r)
caption: 约化单位下的伦纳德–琼斯势、在 $r_c$ 处截断并平移的版本、以及力。力在 $r = 2^{1/6} \approx 1.12$ 处变号，那里是势阱底部。把 $r_c$ 向 $1.2$ 拖过去，看平移后的势阱变浅：短的截断改变的是模型，不只是代价。$r_c = 2.5$ 时，在这个尺度下平移与否的两条曲线几乎无法分辨。
:::

## 没有壁的盒子 {#periodic}

一个带壁的 $108$ 原子立方体会有很大比例的原子挨着壁，而表面会主宰一个本意模仿体相液体的样本。补救办法是用盒子的拷贝取代壁。

::: definition 周期边界与最小映像 {#def-minimage}
在边长 $L$ 的立方盒中取**周期性边界条件**：盒子被无穷多个自己的平移拷贝包围，每个整数矢量 $\mathbf n$ 对应平移 $L\mathbf n$。从一个面离开的粒子从对面重新进入。**最小映像约定**下，对 $(i, j)$ 使用的间距矢量取诸矢量 $\mathbf r_i - \mathbf r_j + L\mathbf n$ 中最短的一个。逐分量地，

$$
\Delta x \;\mapsto\; \Delta x - L\,\operatorname{round}(\Delta x / L),
$$

它把每个分量放进 $[-L/2, L/2]$。
:::

只有当没有粒子能与同一个伙伴的两个映像相互作用时，最小映像才是对截断势的正确实现。这要求 $r_c \le L/2$。$\rho^* = 0.8442$ 下的 $108$ 个原子给出 $L = (108/0.8442)^{1/3} = 5.0388$，于是 $L/2 = 2.519$，$r_c = 2.5$ 勉强装得下。要在这样一个盒子上用更大的截断就得换更大的盒子——这就是截断半径和粒子数要一起定的缘故。

::: quiz
一个程序在边长 $L = 5.04$ 的盒子里用 $N = 108$ 个原子，采用最小映像约定与截断 $r_c = 3.0$。有什么不对？
- [ ] 没什么；截断越长总是越精确。
- [x] 截断球不再装得进盒子：距离在 $L/2$ 与 $3.0$ 之间的对子，某些取向下被算上，另一些取向下被漏掉。
- [ ] 能量不再守恒，因为周期边界下动量守恒失效了。
- [ ] 最小映像把每一对数了两次。
::: solution
最小映像只保留每个伙伴最近的那个拷贝。沿坐标轴它给出的距离从不超过 $L/2 = 2.52$，而沿体对角线会出现大到 $\sqrt3\,L/2 \approx 4.4$ 的间距，所以 $2.52$ 与 $3.0$ 之间的一些对子被算上、另一些没有。动量仍然守恒，见 [[#prop-momentum]]。修法是 $r_c \le L/2$。
:::
:::

把每一对都拿去与截断比较仍然花 $N^2/2$ 次运算，尽管每个原子在 $r_c$ 以内只有几十个邻居。韦尔莱（Verlet）1967 年的论文提出了补救。

::: algorithm 韦尔莱邻居列表 {#alg-nlist}
选一个**皮层** $\delta > 0$。对每个原子，保存 $r_c + \delta$ 以内的伙伴列表。只在列出的对子上计算力。记下建表时刻的位置。一旦任何原子自那以后移动超过 $\delta/2$，就重建列表。
:::

这条重建规则是安全的，因为相距超过 $r_c + \delta$ 的两个原子只有当二者的位移合起来超过 $\delta$ 才可能进到 $r_c$ 以内，这就要求其中至少一个移动超过了 $\delta/2$。对所有对子建一次列表本身是 $O(N^2)$，但它只是偶尔做一次。**单元列表**把原子装进边长至少 $r_c + \delta$ 的立方格子里、只往相邻的格子里看，于是把建表也变成 $O(N)$。

::: example 邻居列表何时划算 {#ex-nlist}
在 $\rho^* = 0.8442$ 的理想面心立方（fcc）晶格上，取 $r_c = 2.5$、$\delta = 0.3$，分别对全部对子与列表内对子做一次截断力求值，得到

| $N$ | $L/2$ | 全部对子 | 列表内对子 | 全部用时 | 列表用时 |
| --- | --- | --- | --- | --- | --- |
| $108$ | $2.519$ | $5778$ | $3564$ | $0.006$ s | $0.004$ s |
| $256$ | $3.359$ | $32640$ | $9984$ | $0.031$ s | $0.011$ s |
| $500$ | $4.199$ | $124750$ | $19500$ | $0.103$ s | $0.023$ s |
| $864$ | $5.039$ | $372816$ | $33696$ | $0.303$ s | $0.041$ s |

解释每个原子的列表内对子数，以及为什么 $N = 108$ 时列表几乎不帮忙。
::: solution
每个原子平均拥有的邻居数，等于半径 $r_c + \delta = 2.8$ 的球内的原子数，即 $\frac43\pi(2.8)^3\rho^* = 77.6$。每一对只列一次，所以每个原子的期望对子数是它的一半，$38.8$。表中 $19500/500 = 39.0$、$33696/864 = 39.0$，正是晶格值。这个数不依赖 $N$，所以列表让求力的代价成为 $N$ 的线性函数。

$N = 108$ 时，半径 $2.8$ 的列表球伸出半个盒子（$2.519$）之外，罩住了大半个盒子，列表保住了全部对子的 $62\%$。对 $108$ 个原子，朴素的双重循环才是老实的选择。$864$ 个原子——韦尔莱自己用的系统规模——列表快七倍。
:::
:::

## $108$ 个原子的一次运行 {#run}

下面这段程序是一个完整的分子动力学程序。它把 $108$ 个原子放在 $\rho^* = 0.8442$ 的 fcc 晶格上，速度取 `random.Random(2023)` 的高斯抽样并去掉总动量，然后用 $h = 0.005$ 的速度韦尔莱法积分。前 $500$ 步里每十步把速度重标度到 $T^* = 0.728$，让晶格熔化。最后 $1500$ 步定能运行，记录温度、压强、能量，并每二十步记录一次间距直方图。

```python
import math, random
ncell, rho, T0, h, rc = 3, 0.8442, 0.728, 0.005, 2.5
N = 4*ncell**3; L = (N/rho)**(1/3); V = L**3
ecut = 4*(rc**-12 - rc**-6)                     # shift so that U(rc) = 0
a = L/ncell; cell = [(0,0,0), (.5,.5,0), (.5,0,.5), (0,.5,.5)]
pos = [[(i+b[0])*a, (j+b[1])*a, (k+b[2])*a] for i in range(ncell)
       for j in range(ncell) for k in range(ncell) for b in cell]   # fcc start
rng = random.Random(2023)
vel = [[rng.gauss(0, 1) for _ in range(3)] for _ in range(N)]
for k in range(3):                              # zero total momentum
    vc = sum(v[k] for v in vel)/N
    for v in vel: v[k] -= vc

def temperature():                              # 3N - 3 degrees of freedom
    return sum(c*c for v in vel for c in v)/(3*(N-1))

def rescale(T):
    s = math.sqrt(T/temperature())
    for v in vel: v[0] *= s; v[1] *= s; v[2] *= s

def forces():
    f = [[0.0]*3 for _ in range(N)]; U = W = 0.0
    for i in range(N):
        for j in range(i+1, N):
            d = [pos[i][k] - pos[j][k] for k in range(3)]
            d = [x - L*round(x/L) for x in d]   # minimum image
            r2 = d[0]*d[0] + d[1]*d[1] + d[2]*d[2]
            if r2 < rc*rc:
                s6 = 1/r2**3
                U += 4*s6*(s6 - 1) - ecut
                rF = 24*s6*(2*s6 - 1)           # r times the force magnitude
                W += rF
                for k in range(3):
                    f[i][k] += rF/r2*d[k]; f[j][k] -= rF/r2*d[k]
    return f, U, W

nbin = 50; dr = (L/2)/nbin; hist = [0]*nbin; nsamp = 0
def sample_gr():
    for i in range(N):
        for j in range(i+1, N):
            d = [x - L*round(x/L) for x in (pos[i][k] - pos[j][k] for k in range(3))]
            b = int(math.sqrt(d[0]*d[0] + d[1]*d[1] + d[2]*d[2])/dr)
            if b < nbin: hist[b] += 2

rescale(T0); f, U, W = forces(); Ts, Ps, Es = [], [], []
for n in range(2000):
    for p, v, F in zip(pos, vel, f):            # velocity Verlet, m = 1
        for k in range(3):
            v[k] += 0.5*h*F[k]; p[k] += h*v[k]
    f, U, W = forces()
    for v, F in zip(vel, f):
        for k in range(3): v[k] += 0.5*h*F[k]
    if n < 500:
        if n % 10 == 9: rescale(T0)             # equilibration only
        continue
    T = temperature(); K = 1.5*(N-1)*T
    Ts.append(T); Es.append((K + U)/N); Ps.append(rho*T + W/(3*V))
    if n % 20 == 0: sample_gr(); nsamp += 1

mean = lambda x: sum(x)/len(x)
def block_error(x, nb=10):
    m = len(x)//nb; b = [mean(x[i*m:(i+1)*m]) for i in range(nb)]
    return math.sqrt(sum((y - mean(b))**2 for y in b)/(nb*(nb - 1)))
Ptail = 16/3*math.pi*rho**2*(2/3*rc**-9 - rc**-3)
print("N = %d, L = %.4f, production steps = %d" % (N, L, len(Ts)))
print("T = %.4f +- %.4f" % (mean(Ts), block_error(Ts)))
print("P = %.4f +- %.4f (cut-off), tail = %.4f, P + tail = %.4f" % (mean(Ps), block_error(Ps), Ptail, mean(Ps) + Ptail))
print("E/N: first %.6f, last %.6f, max - min %.2e" % (Es[0], Es[-1], max(Es) - min(Es)))
g = [hist[b]/(nsamp*N*rho*4/3*math.pi*dr**3*((b+1)**3 - b**3)) for b in range(nbin)]
print("g(r) = 0 for r < %.2f" % (dr*min(b for b in range(nbin) if hist[b])))
for b in range(19, nbin, 2): print("r = %.3f  g = %.3f" % ((b + 0.5)*dr, g[b]))
```

输出（约 $19$ s）：

```
N = 108, L = 5.0388, production steps = 1500
T = 0.7002 +- 0.0039
P = 0.7912 +- 0.0325 (cut-off), tail = -0.7621, P + tail = 0.0291
E/N: first -4.158347, last -4.157962, max - min 1.15e-03
g(r) = 0 for r < 0.91
r = 0.983  g = 0.753
r = 1.083  g = 2.997
r = 1.184  g = 2.010
r = 1.285  g = 1.106
r = 1.386  g = 0.739
r = 1.486  g = 0.592
r = 1.587  g = 0.604
r = 1.688  g = 0.692
r = 1.789  g = 0.875
r = 1.890  g = 1.076
r = 1.990  g = 1.220
r = 2.091  g = 1.282
r = 2.192  g = 1.205
r = 2.293  g = 1.031
r = 2.393  g = 0.907
r = 2.494  g = 0.817
```

::: example 先核对运行，再相信它 {#ex-run-check}
从输出里读物理之前，先核对能量和温度。能量守恒得够好吗？平均温度为什么是 $0.700$，而不是恒温器强加的 $0.728$？
::: solution
在 $1500$ 个定能步中，每个原子的能量待在宽 $1.15 \times 10^{-3}$ 的一条带里，带心在 $-4.158$ 附近。这是 $0.03\%$，约为每个原子动能的 $0.1\%$；首末两个值只差 $3.9 \times 10^{-4}$：看不到漂移。

温度是另一回事。重标度在第 $500$ 步停止，只跑了 $2.5\tau$，那时系统还在把晶格秩序转成液体无序、抬高势能。总能量固定时，这笔账由动能来付，于是温度落在 $0.700 \pm 0.004$ 附近。这次运行是 $T^* = 0.700$ 下一次有效的定能模拟，而不是 $0.728$ 的。细致的研究会平衡到势能不再漂移为止。
:::
:::

能量带有多大？它的表现像不像一个二阶方法该有的？有一组单独的实验：从同一个已平衡的状态出发重启三次定能运行，各跑 $2\tau$，只改步长——

| $h$ | 步数 | $E/N$ 的标准差 |
| --- | --- | --- |
| $0.01$ | $200$ | $7.63 \times 10^{-4}$ |
| $0.005$ | $400$ | $1.92 \times 10^{-4}$ |
| $0.0025$ | $800$ | $4.57 \times 10^{-5}$ |

每次减半把涨落除以 $3.97$、再除以 $4.20$——正是 [[computation/integrating-motion#alg-verlet]] 的因子 $4$。一条可用的经验是：让它们比动能自身的涨落小得多。

## 这次运行测量的是什么 {#measure}

一次运行产出一条轨迹；物理来自对它的平均。若动力学是遍历的，则固定能量下的时间平均等于 [[statistical-mechanics/microcanonical]] 的微正则系综平均。$N$ 大时，它与对应温度下的正则平均无法分辨。

::: definition 动能温度 {#def-kintemp}
总动量固定为零的 $N$ 个原子的**瞬时动能温度**为

$$
T_\mathrm{kin} = \frac{2K}{N_f k_B}, \qquad K = \sum_i \tfrac12 m_i v_i^2, \qquad N_f = 3N - 3.
$$

这次运行的**温度**是它的时间平均。
:::

计数 $N_f = 3N - 3$ 来自能量均分：每个平方项自由度摊到 $\frac12 k_BT$，而把总动量的三个分量固定住就去掉了其中三个。$N = 108$ 时 $3N$ 与 $3N - 3$ 相差约 $1\%$，是 [[#ex-run-check]] 中温度降幅的三分之一。瞬时值是涨落的。在生产段运行里，它在 $0.595$ 到 $0.823$ 之间摆动，标准差 $0.038$——这就是只有带误差条的平均才算得上温度。

压强不能从与壁的碰撞中读出，因为没有壁。它来自位力。

::: theorem 位力压强 {#thm-virial}
体积 $V$ 的容器中、带成对力 $\mathbf F_{ij}$ 的 $N$ 个粒子，在定态下满足

$$
PV = N k_BT + \frac13 \Bigl\langle \sum_{i<j} \mathbf r_{ij}\cdot\mathbf F_{ij} \Bigr\rangle,
$$ {#eq-virial}

其中 $T$ 是按 $N_f = 3N$ 定义的动能温度，角括号表示时间平均。
:::

::: proof
考察 $G = \sum_i \mathbf r_i\cdot\mathbf p_i$。运动有界则 $G$ 有界，所以它的时间导数在长时间上平均为零：

$$
0 = \Bigl\langle \frac{\dd G}{\dd t} \Bigr\rangle = \Bigl\langle \sum_i \frac{p_i^2}{m_i} \Bigr\rangle + \Bigl\langle \sum_i \mathbf r_i\cdot\mathbf F_i \Bigr\rangle = 2\langle K\rangle + \Bigl\langle \sum_i \mathbf r_i\cdot\mathbf F_i \Bigr\rangle .
$$

粒子 $i$ 上的总力 $\mathbf F_i$ 是其他粒子的力与壁的力之和。对成对力，按对归并并使用 $\mathbf F_{ji} = -\mathbf F_{ij}$，

$$
\sum_i \sum_{j\neq i} \mathbf r_i\cdot\mathbf F_{ij} = \sum_{i<j} (\mathbf r_i - \mathbf r_j)\cdot\mathbf F_{ij} = \sum_{i<j}\mathbf r_{ij}\cdot\mathbf F_{ij}.
$$

平均而言，壁作用在气体上的力，在每个面元处是 $-P\,\hat{\mathbf n}\,\dd A$，$\hat{\mathbf n}$ 是外法向。由高斯散度定理，它的贡献是

$$
-P \oint \mathbf r\cdot\hat{\mathbf n}\,\dd A = -P\int_V \nabla\cdot\mathbf r\,\dd V = -3PV.
$$

把各项收拢得 $0 = 2\langle K\rangle + \langle\sum_{i<j}\mathbf r_{ij}\cdot\mathbf F_{ij}\rangle - 3PV$。代入 $2\langle K\rangle = 3Nk_BT$ 就是 [[#eq-virial]]。
:::

这个证明需要一面壁，而周期盒子没有。同一个公式在周期系统中照样成立，只要 $\mathbf r_{ij}$ 取当初用来计算 $\mathbf F_{ij}$ 的那个最小映像间距；推导见艾伦（Allen）与蒂尔德斯利（Tildesley）《Computer Simulation of Liquids》第 2 章。程序里，`rF` 在约化单位下就是 $\mathbf r_{ij}\cdot\mathbf F_{ij} = -r\,u'(r) = 24 r^{-6}(2r^{-6} - 1)$，瞬时压强是 `rho*T + W/(3*V)`。

::: example 压强与它的尾巴 {#ex-pressure}
截断压强是 $0.791 \pm 0.033$，程序又加了一个 $-0.762$ 的尾部修正。这个修正从何而来？完整的伦纳德–琼斯液体的压强是多少？
::: solution
$r_c$ 以外那些对子的力被略去了。若液体在这些距离上没有结构——$r > r_c$ 时 $g(r) = 1$——那么单位体积缺失的位力是

$$
P_\mathrm{tail} = -\frac{2\pi\rho^2}{3}\int_{r_c}^\infty r^3 u'(r)\,\dd r = \frac{16\pi\rho^2}{3}\left[\frac23 r_c^{-9} - r_c^{-3}\right]
$$

在约化单位下；[[#exr-tail]] 给出推导。$\rho = 0.8442$、$r_c = 2.5$ 时它是 $-0.7621$，与打印一致。修正后的压强是 $0.791 - 0.762 = 0.029$，误差条仍是 $\pm 0.033$，所以它在一个误差条内就是零。换成普通单位，对氩是 $12 \pm 14$ bar。压强接近零在意料之中，因为这个状态点靠近伦纳德–琼斯三相点，液体与压强可忽略的蒸气共存。教训在于修正的大小：一条不到势阱深度 $2\%$ 的尾巴，改变压强却超过了全部答案本身，因为远处邻居的数目按 $r^2$ 增长。
:::
:::

输出中的误差条是分块误差。$1500$ 个值被切成 $10$ 个连续块，标准误差由块平均算出。压强的朴素标准误差——全部 $1500$ 个值的标准差 $0.264$ 除以 $\sqrt{1500}$——会是 $0.0068$，小了将近五倍，因为相邻的步强相关。对相关性做同样修正的事，曾在米特罗波利斯链上量过，见 [[computation/random-sampling#ex-metro]]。长 $0.75\tau$ 的块刚刚够长；补救是多跑步。

::: definition 径向分布函数 {#def-gr}
数密度为 $\rho$ 的均匀流体中，**径向分布函数** $g(r)$ 的定义使得到某个原子距离在 $r$ 与 $r + \dd r$ 之间的薄球壳内，原子数的平均为 $\rho\, g(r)\, 4\pi r^2\,\dd r$。理想气体中 $g = 1$。模拟里它的估计办法是：把间距直方图除以每层球壳的理想气体计数。
:::

程序在 `hist` 里把每一对数两次，两端各一次，再除以 $N$（中心原子数）、样本数、以及 $\rho$ 乘壳体积。输出展示的是稠密液体的结构：

- $r < 0.91$ 时 $g(r) = 0$：排斥墙禁止近距离接触。
- 一个约 $3.0$ 的尖锐第一峰，在 $r = 1.08$ 附近，恰在 $1.12$ 处势阱极小的内侧：第一层邻居壳。
- 一个约 $0.59$ 的极小，在 $r = 1.5$ 附近；随后是更宽的第二峰，约 $1.28$，在 $r = 2.1$ 附近。
- 振荡向 $1$ 衰减，$r = 2.5$ 处仍差着 $0.2$，所以半宽 $2.52$ 的盒子刚刚够大，尾部修正的假设 $g = 1$ 只是近似。

没有长程序。晶体会在 fcc 的邻居距离 $a/\sqrt2$、$a$、$\sqrt{3/2}\,a$ 处出现彼此分立的尖峰，其间 $g = 0$。中子或 X 射线散射在液氩上测得的结构因子，差一个傅里叶变换，就是同一个函数——拉赫曼（Rahman）与韦尔莱（Verlet）就是这样把他们的模拟同实验对照的。

::: quiz
在 [[#ex-run-check]] 中，恒温器关掉之后温度从 $0.728$ 落到 $0.700$，而能量守恒到了 $0.03\%$。这说明什么？
- [ ] 积分器在漏能量，必须减小步长。
- [x] 系统还没有完成平衡；势能仍在以动能为代价上升。
- [ ] 动能温度应当用 $3N$ 而不是 $3N - 3$ 个自由度来算。
- [ ] 速度重标度破坏了动量守恒。
::: solution
能量恒定排除了第一个答案。温度公式自始至终是同一个，它造不出下降来；一致重标度也让零总动量保持为零。熔化中的晶格在恒温器停止补给之后，一直把动能转成势能。
:::
:::

## 恒温器 {#thermostats}

牛顿方程守恒能量，所以分子动力学天然采样微正则系综，而实验通常在固定温度下做。**恒温器**修改运动方程，让系统同一个想象的热库交换能量。

最粗糙的选择就是程序里那个：时不时把所有速度乘以 $\sqrt{T_0/T_\mathrm{kin}}$。它压掉了 $K$ 的天然涨落，所以它给出的状态不是正则样本；它只配用来做平衡。贝伦德森（Berendsen）恒温器（1984）把 $T_\mathrm{kin}$ 温和地朝 $T_0$ 弛豫，毛病相同。安德森（Andersen）恒温器（1980）不时给一个随机原子换上一个新鲜的麦克斯韦–玻尔兹曼（Maxwell–Boltzmann）速度；它采样正则系综，但随机的碰撞会毁掉输运系数。诺泽–胡佛（Nosé–Hoover）恒温器（诺泽 1984，胡佛 1985）添加一个动力学摩擦变量：系统过热时它增大，过冷时变负。推广后的动力学是确定性的、时间可逆的，若遍历，则采样正则分布。

::: remark 哪个系综，要紧吗？
对 $P$ 或 $g(r)$ 这类平均，各系综之间只差 $1/N$ 量级的修正。对涨落——比如从能量的方差求热容量——公式必须与所采样的系综匹配。对动力学量——比如扩散——应当在定能下测量，或使用对动力学扰动很弱的恒温器。
:::

::: application 蒙特卡罗还是分子动力学？
把 [[computation/random-sampling]] 的米特罗波利斯方法用在同一个势上，得到同样的静态平均；1953 年的那篇论文就是拿硬圆盘用它。它给不出时间关联，因为它的状态序列不是轨迹。[[statistical-mechanics/phase-transitions]] 里的米特罗波利斯伊辛运行是它的格点版本。分子动力学追踪真实时间，所以能测输运。
:::

## 历史与后续内容 {#leads}

::: history 从 MANIAC 到氩
1955 年，恩里科·费米（Fermi）、约翰·帕斯塔（Pasta）、斯塔尼斯拉夫·乌拉姆（Ulam）与玛丽·钦古（Tsingou）在洛斯阿拉莫斯的 MANIAC 上积分了至多 $64$ 个由弱非线性弹簧连成的质点链。放在最低模态上的能量没有如预期那样铺开到所有模态，而是几乎全部回到了起始模态。程序是钦古写的，报告上却没有她的名字；这个问题如今带着四个人的名字。

贝尔尼·奥尔德（Alder）与托马斯·温赖特（Wainwright）在 1957 年追踪了 $32$ 个和 $108$ 个硬球的碰撞，发现了流体–固体相变。阿尼斯乌尔·拉赫曼（Rahman）在 1964 年用氩的参数模拟了 $864$ 个伦纳德–琼斯原子，把成对关联与扩散同实验作了比较。卢普·韦尔莱（Verlet）在 1967 年用带他名字的积分器和邻居列表算出了伦纳德–琼斯流体的状态方程与 $g(r)$。乔希·巴恩斯（Barnes）与皮特·哈特（Hut）在 1986 年把他们的 $O(N\log N)$ 树算法发表在了《Nature》上。
:::

这里的平均是 [[statistical-mechanics/classical-gas]] 意义上的统计力学，而稠密流体的状态方程正是 [[thermodynamics/kinetic-theory]] 只能近似的东西。星系与宇宙结构的树码、网格码连着 [[gravitation/cosmology]]；同一组方程在低温下给出 [[condensed-matter/lattice-vibrations]] 的声子。下一章 [[computation/chaos-and-data]] 要问：为什么初始数据只差最后一比特的两次运行会终结于不同的微状态，而它们的平均却一致。

::: summary
- 直接求和每步的代价是 $N(N-1)/2$ 次成对相互作用；$N$ 翻倍使时间乘以 $4$。每对只累加一次并保持 $\mathbf F_{ji} = -\mathbf F_{ij}$，动量就精确守恒。
- 普拉默软化去掉了引力的奇性，步长随后必须分辨 $\varepsilon/v$。在坍缩的团簇上，韦尔莱的能量误差在 $h$ 减半时缩小 $4.2$ 倍；欧拉丢掉了半个束缚能。
- $\theta = 0.5$ 的巴恩斯–哈特在 $N = 16000$ 时用每粒子 $497$ 次相互作用——而不是 $15999$ 次——给出了 $0.5\%$ 的力误差。
- 约化的伦纳德–琼斯单位一次描述了所有惰性气体。对氩，$T^* = 0.728$ 即 $87.2\,\mathrm K$，$\tau = 2.16\,\mathrm{ps}$。
- 带最小映像的周期边界需要 $r_c \le L/2$。盒子宽出几个截断之后，邻居列表让代价成为 $N$ 的线性函数。
- 温度来自以 $3N - 3$ 个自由度计的 $K$，压强来自位力加尾部修正，结构来自 $g(r)$。$108$ 个原子：$T = 0.700 \pm 0.004$、$P = 0.03 \pm 0.03$。
- 误差条需要块平均。用来做平衡的恒温器，测量之前必须关掉，或者从一开始就选成采样正确系综的那种。
:::

## 习题 {#exercises}

::: exercise 数对子 {level=1 check="5778"}
$N = 108$ 个原子时，直接求和要走多少个不同的对子？
::: solution
$N(N-1)/2 = 108 \times 107/2 = 5778$。这就是 [[#ex-nlist]] 中表格第一行的数。
:::
:::

::: exercise 氩的温度 {level=1 check="87.2"}
氩的 $\epsilon/k_B = 119.8\,\mathrm K$，$T^* = 0.728$ 是多少开尔文？给出一位小数。
::: solution
$T = T^*\,\epsilon/k_B = 0.728 \times 119.8\,\mathrm K = 87.2\,\mathrm K$。
:::
:::

::: exercise 一个最小映像 {level=1 check="-0.5388"}
边长 $L = 5.0388$ 的盒子里，两个原子的 $x$ 坐标相差 $\Delta x = 4.5$。最小映像约定用哪个 $x$ 间距？
::: solution
$\Delta x/L = 0.893$，舍入为 $1$。最小映像间距是 $4.5 - 5.0388 = -0.5388$。伙伴其实很近——穿过盒子的面就是它。
:::
:::

::: exercise 平移常数 {level=1 check="-0.0163"}
对 $r_c = 2.5$ 的截断平移势 [[#eq-shift]]，以三位有效数字计算约化单位下的 $u(r_c)$。
::: solution
$2.5^{-6} = 4.096 \times 10^{-3}$，$2.5^{-12} = 1.678 \times 10^{-5}$。故 $u(2.5) = 4(1.678 \times 10^{-5} - 4.096 \times 10^{-3}) = -0.0163$。截断以内的每一对，能量都被加上了 $0.0163$。
:::
:::

::: exercise 势阱底部 {level=2 check="2^(1/6)"}
求伦纳德–琼斯力为零时的间距（以 $\sigma$ 为单位），以及那里 $u$ 的值。
::: solution
$u'(r) = 4(-12r^{-13} + 6r^{-7}) = 0$ 给出 $r^6 = 2$，故 $r = 2^{1/6} \approx 1.1225$。那里 $r^{-6} = \frac12$，$u = 4(\frac14 - \frac12) = -1$，即势阱深度 $-\epsilon$。
:::
:::

::: exercise 预言能量带 {level=2 check="4.8e-5"}
$h = 0.005$ 时 $E/N$ 的标准差是 $1.92 \times 10^{-4}$。设二阶标度律成立，预言 $h = 0.0025$ 时的值，并与实测值比较。
::: solution
$h$ 减半把它除以 $4$：$1.92 \times 10^{-4}/4 = 4.8 \times 10^{-5}$。实测值为 $4.57 \times 10^{-5}$，低了约 $5\%$。从同一个状态出发的短运行，其带宽本身也是涨落的数；得到确认的是标度律，不是第三位数字。
:::
:::

::: exercise 列表里的邻居 {level=2 check="38.8"}
$\rho^* = 0.8442$、$r_c = 2.5$、皮层 $0.3$，设密度均匀，估计每个原子的列表内对子数。给出一位小数。
::: solution
列表球半径 $2.8$，平均包含 $\frac43\pi(2.8)^3 \times 0.8442 = 77.6$ 个其他原子。每对只存一次，所以每个原子是 $77.6/2 = 38.8$。[[#ex-nlist]] 中的晶格给出 $39.0$。
:::
:::

::: exercise 动量与最小映像 {level=3}
证明本章的速度韦尔莱程序在精确算术下精确守恒总动量，尽管位置是经过最小映像比较的。然后解释：一个只在计算 $i$ 上的力时施加最小映像、计算 $j$ 上的力时又独立重算间距的程序，为什么可能守恒不了。
::: hint
[[#prop-momentum]] 需要 $\mathbf F_{ji} = -\mathbf F_{ij}$，而且两边是同一个矢量。
:::
::: solution
程序里一对的间距 $\mathbf d$ 只算一次：力矢量 $(rF/r^2)\,\mathbf d$ 加到原子 $i$ 上，同一个矢量从原子 $j$ 减去。于是 $\mathbf F_{ji} = -\mathbf F_{ij}$ 精确成立，[[#prop-momentum]] 适用：每次踢给 $\mathbf P$ 的改变都是 $\frac h2\sum_{i<j}(\mathbf F_{ij} + \mathbf F_{ji}) = \mathbf 0$。漂移只改位置，而把位置按 $L$ 回绕（这段程序连这一步都不需要）不改任何速度。

现在假设第二个原子的间距用各自的舍入独立重算。在约定 $\operatorname{round}(y) = \lfloor y + \frac12\rfloor$ 下，平局 $\Delta x/L = \frac12$ 给出映像 $-\frac12 L$；反过来的一对 $\Delta x/L = -\frac12$ 也保留 $-\frac12 L$。两个原子看到伙伴都在同一侧，力不抵消，$\mathbf P$ 跳变。每对只算一次，从构造上就避开了这个问题。
:::
:::

::: exercise 尾部修正 {#exr-tail level=3}
设 $r > r_c$ 时 $g(r) = 1$。从 [[#eq-virial]] 出发，证明截断以外的对子贡献

$$
P_\mathrm{tail} = \frac{16\pi\rho^2}{3}\left[\frac23 r_c^{-9} - r_c^{-3}\right]
$$

（在约化单位下），并对 $\rho = 0.8442$、$r_c = 2.5$ 求值。
::: hint
间距落在 $[r, r + \dd r]$ 内的对子平均数是 $\frac12 N\rho\,g(r)\,4\pi r^2\,\dd r$，而每对贡献 $\mathbf r\cdot\mathbf F = -r\,u'(r)$。
:::
::: solution
$PV$ 中缺的项，是对 $r_c$ 以外的对子求 $\sum \mathbf r_{ij}\cdot\mathbf F_{ij}$ 平均的 $\frac13$：

$$
P_\mathrm{tail}V = \frac13 \cdot \frac12 N\rho \int_{r_c}^\infty 4\pi r^2\,\bigl(-r\,u'(r)\bigr)\,\dd r .
$$

除以 $V$ 并使用 $N/V = \rho$：$P_\mathrm{tail} = -\frac{2\pi\rho^2}{3}\int_{r_c}^\infty r^3u'(r)\,\dd r$。由 $u = 4(r^{-12} - r^{-6})$，$r^3u'(r) = -48r^{-10} + 24r^{-4}$，于是

$$
\int_{r_c}^\infty\bigl(-48r^{-10} + 24r^{-4}\bigr)\dd r = -\frac{48}{9}r_c^{-9} + 8r_c^{-3}.
$$

故 $P_\mathrm{tail} = -\frac{2\pi\rho^2}{3}\bigl(8r_c^{-3} - \frac{16}{3}r_c^{-9}\bigr) = \frac{16\pi\rho^2}{3}\bigl(\frac23 r_c^{-9} - r_c^{-3}\bigr)$。$\rho = 0.8442$、$r_c = 2.5$ 时：$r_c^{-3} = 0.064$，$\frac23 r_c^{-9} = 1.75 \times 10^{-4}$，所以 $P_\mathrm{tail} = \frac{16\pi}{3}(0.71267)(-0.063825) = -0.762$，与程序一致。
:::
:::
