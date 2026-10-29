反向传播被推广后的四分之一世纪里，超过几层隐藏层的网络曾被认为几乎不可能从随机起点训练起来。障碍不在优化器，而在**信号的尺度**：激活与梯度一层层传下去，会几何级数地缩小或增大，二十层之后就会小到或大到一百万倍，最前面的层根本收不到有用的梯度。三个想法——全部出自 2010 到 2016 年——移除了这个障碍：靠设计保持信号尺度的初始化、在每一层把尺度恢复的**归一化**层，以及给梯度提供一条绕过每一层之路的**残差连接**。现代 Transformer 三者并用。

本章推导信号既不消失也不爆炸的条件，由得出 Xavier 初始化与 He 初始化，定义批归一化、层归一化与 RMS 归一化以及它们的共同性质，并解释上百层的残差网络为什么能训练。假定已知[[neural-networks/backpropagation#thm-mlp-backprop]]的反向传播方程和[[math-for-ml/probability#prop-init]]的方差计算，并加以推广。

## 梯度消失与梯度爆炸 {#sec-vanishing}

把 MLP 写成 $\mathbf{h}_\ell = \phi(\mathbf{a}_\ell)$，$\mathbf{a}_\ell = W_\ell\mathbf{h}_{\ell-1}$（偏置在初始化时为零，这里可以忽略）。由链式法则，到达第 $\ell$ 层的梯度为

$$
\frac{\partial\mathcal{L}}{\partial\mathbf{h}_\ell} = J_{\ell+1}^\top J_{\ell+2}^\top\cdots J_L^\top\,\frac{\partial\mathcal{L}}{\partial\mathbf{h}_L},\qquad J_k = \frac{\partial\mathbf{h}_k}{\partial\mathbf{h}_{k-1}} = \operatorname{diag}\big(\phi'(\mathbf{a}_k)\big)W_k,
$$ {#eq-jacobian-product}

即 $L - \ell$ 个矩阵的乘积。许多矩阵的乘积表现得像一个数的幂：除非每个因子平均而言保持长度，否则乘积随因子个数指数地缩小或增大。前向信号 $\mathbf{h}_\ell$ 也是同样类型的乘积。

::: proposition 随机网络中的信号传播 {#prop-propagation}
设第 $\ell$ 层的权重相互独立、均值为 $0$、方差为 $\sigma_\ell^2$，与之前的所有量独立；记 $q_\ell = \frac1{d_\ell}\E\lVert\mathbf{a}_\ell\rVert^2$ 为预激活的均方。设 $\phi$ 为恒等或 ReLU，且对 ReLU 假定预激活关于 $0$ 对称。则

$$
q_\ell = d_{\ell-1}\sigma_\ell^2\,c_\phi\,q_{\ell-1},\qquad c_{\text{identity}} = 1,\quad c_{\text{ReLU}} = \tfrac12,
$$ {#eq-propagation}

于是 $q_L = q_1\prod_{\ell=2}^Ld_{\ell-1}\sigma_\ell^2c_\phi$：除非 $d_{\ell-1}\sigma_\ell^2c_\phi = 1$，它按几何级数消失或爆炸。反向传播的梯度均方 $\frac1{d_{\ell-1}}\E\lVert\partial\mathcal{L}/\partial\mathbf{a}_{\ell-1}\rVert^2$ 的情形完全相同，只是 $d_\ell$（扇出）代替 $d_{\ell-1}$（扇入）——所用的简化假设是反向传递用到的权重与前向激活相互独立。
:::

::: proof
由[[math-for-ml/probability#prop-init]]，$\mathbf{a}_\ell = W_\ell\mathbf{h}_{\ell-1}$ 的每个坐标均值为 $0$，对 $j$ 平均后的二阶矩为 $d_{\ell-1}\sigma_\ell^2\,\E[h_{\ell-1,j}^2]$。恒等激活下 $\E h^2 = \E a^2$，故 $c = 1$。对关于 $0$ 对称的预激活 $a$ 取 ReLU，由对称性 $\E[\operatorname{ReLU}(a)^2] = \E[a^2\,[a > 0]] = \frac12\E[a^2]$，故 $c = \frac12$。迭代即得乘积形式。反向看，$\partial\mathcal{L}/\partial\mathbf{a}_{\ell-1} = \phi'(\mathbf{a}_{\ell-1})\odot W_\ell^\top\boldsymbol\delta_\ell$；$W_\ell^\top\boldsymbol\delta_\ell$ 的每个坐标是 $d_\ell$ 项之和，其二阶矩是 $\boldsymbol\delta_\ell$ 的二阶矩乘以 $d_\ell\sigma_\ell^2$；再乘以 $\phi'$ 把二阶矩乘以 $\E[\phi'(a)^2]$，对恒等激活为 $1$，对 ReLU 为 $\frac12$。
:::

对其他激活函数，因子 $c_\phi$ 依赖于 $q$ 自身，分析变成追踪一个非线性映射 $q_{\ell-1}\mapsto q_\ell$ 及其不动点（Poole 等，2016；Schoenholz 等，2017，“深度信息传播”（deep information propagation））。对 tanh，$c_\phi < 1$，信号缓慢收缩；对逻辑 sigmoid，导数至多 $\frac14$，所以除非权重很大，梯度每层至少缩小四倍，而大权重又会使单元饱和（[[neural-networks/backpropagation]]习题 10）。这就是 Hochreiter（1991）在循环网络上指出、Bengio、Simard 与 Frasconi（1994）加以分析的**梯度消失问题**。

::: widget plot
f: x*log10(g); log10(1 + a*x)
x: 0, 50
y: -6, 6
sliders: g=1.2:0.5:2:0.01; a=1:0:2:0.05
hlines: 0
labels: plain network: $\log_{10}$ of signal size with gain $g$ per layer; pre-norm residual network: $\log_{10}(1 + aL)$
caption: 均方信号随深度 $L$ 的变化。普通网络里每层把它乘以[[#eq-propagation]]的增益 $g = d\sigma^2c_\phi$；任何 $g\ne1$ 在这条对数刻度上都是一条直线——$g = 1.32$ 时五十层后就是 $10^6$ 倍。分支看到归一化输入的残差网络里，每个模块*加上*大致恒定的量 $a$，信号只线性增长。反向流动的梯度也是如此。
:::

::: example 尺度的小误差会复利累积 {#ex-compound}
一个宽 $512$ 的 $50$ 层 ReLU 网络以标准差 $0.066$ 而不是 He 的 $\sqrt{2/512} = 0.0625$ 初始化。均方信号穿过整个网络后变化多少倍？若标准差是 $0.059$ 呢？
::: solution
每层增益为 $512\cdot0.066^2\cdot\frac12 = 1.115$，$50$ 层后倍数为 $1.115^{50}\approx230$。取 $0.059$ 时增益为 $512\cdot0.059^2/2 = 0.891$，倍数为 $0.891^{50}\approx0.0031$。标准差上 $6\%$ 的误差，到了信号的二阶矩上就成了几百倍的因子。作为对照，精确的 He 值给出增益 $1$，而增益 $1.1$ 与 $0.9$ 分别给出 $1.1^{50} = 117$ 与 $0.9^{50} = 0.0052$。
:::
:::

::: widget distribution
dist: normal
params: mu=0, sigma=0.0625
a: -0.125
b: 0.125
caption: 宽 $n = 512$ 层的 He 初始化 $\Normal(0, 2/n)$，阴影为 $\pm2\sigma$ 区间。许多代码库从这个分布截断到 $\pm2\sigma$ 抽样（区间外的值重抽），若不相应校正标准差，方差会略微变小——约成 $0.774\sigma^2$。改变 $\sigma$ 看看初始权重有多窄：几乎所有权重都落在 $\pm0.13$ 以内。
:::

## 初始化 {#sec-init}

### 打破对称 {#sec-symmetry}

最简单的初始化——权重全为零——失败的原因与尺度无关。

::: proposition 相同的单元永远相同 {#prop-symmetry}
若 MLP 的两个隐藏单元入边权重相同、出边权重也相同，它们就收到完全相同的梯度，于是梯度下降（或任何逐元素施加的优化器，如 Adam）会让它们永远相同。特别地，把一层的所有权重初始化成同一个常数，这一层的行为就相当于一个单元。
:::

::: proof
设第 $\ell$ 层的单元 $i$ 与 $j$ 的入边权重行与偏置相等（$W_{\ell, i:} = W_{\ell, j:}$）、出边权重列相等（$W_{\ell+1, :i} = W_{\ell+1, :j}$）。则对每个输入，二者的预激活与激活相等。误差信号为 $\delta_{\ell, i} = \phi'(a_{\ell, i})(W_{\ell+1, :i}^\top\boldsymbol\delta_{\ell+1})$ 与把 $i$ 换成 $j$ 的同一表达式，故相等。入边权重的梯度 $\delta_{\ell, i}\mathbf{h}_{\ell-1}$ 与 $\delta_{\ell, j}\mathbf{h}_{\ell-1}$ 相等，出边的 $\boldsymbol\delta_{\ell+1}h_{\ell, i}$ 与 $\boldsymbol\delta_{\ell+1}h_{\ell, j}$ 也相等。更新之后两个单元仍然完全相同，归纳即知它们永远如此。交换这两个单元是网络的一个对称性，而梯度尊重这个对称性。
:::

所以权重必须是**随机**的——为了打破单元之间的对称——尺度则按[[#prop-propagation]]选取。偏置可以从零开始，因为随机的权重已经让单元彼此不同了。

### Xavier 与 He 初始化 {#sec-xavier-he}

::: definition Xavier（Glorot）初始化与 He 初始化 {#def-init}
对扇入为 $n_{\text{in}}$、扇出为 $n_{\text{out}}$ 的层，把权重以均值 $0$、方差

$$
\sigma^2_{\text{Xavier}} = \frac{2}{n_{\text{in}} + n_{\text{out}}}\qquad\text{或}\qquad\sigma^2_{\text{He}} = \frac{2}{n_{\text{in}}},
$$

从正态分布独立抽取，或从 $[-r, r]$ 上的均匀分布抽取，其中 $r = \sqrt{3\sigma^2}$（因为 $[-r, r]$ 上均匀变量的方差是 $r^2/3$）。**Xavier**（或 **Glorot**）初始化（Glorot 与 Bengio，2010）针对在 $0$ 附近近似线性的激活函数，如 tanh；**He**（或 **Kaiming**）初始化（He、Zhang、Ren 与 Sun，2015）针对 ReLU。方差 $1/n_{\text{in}}$ 称为 **LeCun** 初始化（LeCun 等，1998）。
:::

::: proposition 公式从何而来 {#prop-init-derivation}
在[[#prop-propagation]]的假设下，前向信号恰被保持当且仅当 $n_{\text{in}}\sigma^2c_\phi = 1$，反向梯度恰被保持当且仅当 $n_{\text{out}}\sigma^2c_\phi = 1$。对恒等激活（$c_\phi = 1$），两个条件是 $\sigma^2 = 1/n_{\text{in}}$ 与 $\sigma^2 = 1/n_{\text{out}}$，而 Xavier 的 $\sigma^2 = 2/(n_{\text{in}} + n_{\text{out}})$ 是它们的调和平均，在 $n_{\text{in}} = n_{\text{out}}$ 时同时满足两者。对 ReLU（$c_\phi = \frac12$），前向条件是 $\sigma^2 = 2/n_{\text{in}}$，即 He 的选择。
:::

::: proof
令[[#eq-propagation]]的每层因子——前向为 $n_{\text{in}}\sigma^2c_\phi$，反向为 $n_{\text{out}}\sigma^2c_\phi$——等于 $1$，解出 $\sigma^2$。$1/n_{\text{in}}$ 与 $1/n_{\text{out}}$ 的调和平均为 $2\big/\big(n_{\text{in}} + n_{\text{out}}\big)$。
:::

相邻层宽度不同时，Glorot 与 Bengio 无法同时满足两个条件，于是选择了这个折中。He 等人观察到：用 ReLU 并按扇入缩放时，反向的每层因子是 $n_{\text{out}}/n_{\text{in}}$，而这些因子的乘积叠缩成首末两层宽度之比——是个常数，不是指数——所以保持两个方向中的任何一个就够。两篇论文更深一层的要点是：正确的尺度取决于激活函数。把 Xavier 的 $1/n$（等宽情形）用在 ReLU 上，每层把信号减半；这样初始化的 $30$ 层 ReLU 网络，开头的信号就小 $2^{-15}\approx3\times10^{-5}$ 倍——下面的实验会看到。He 等人用他们的初始化从头训练成 $30$ 层 ReLU 网络，而这种网络用 Xavier 初始化是失败的。

::: example 数字分类器的初始尺度 {#ex-init-scales}
对[[neural-networks/perceptrons-mlps#ex-params]]那个 MLP 的第一层（$n_{\text{in}} = 784$，$n_{\text{out}} = 512$），给出 LeCun、Xavier（正态）与 He 初始化下的标准差，以及 Xavier 均匀分布的界 $r$。
::: solution
LeCun：$\sqrt{1/784} = 0.0357$。Xavier 正态：$\sqrt{2/(784 + 512)} = \sqrt{2/1296} = 0.0393$。He：$\sqrt{2/784} = 0.0505$。Xavier 均匀：$r = \sqrt{3\cdot2/1296} = \sqrt{6/1296} = 0.0680$。差别看着不大，但会复利累积：逐层看，这里 He 的方差是 Xavier 的 $1296/784\approx1.65$ 倍；而对正方形层，He 与 Xavier 之间相差因子 $2$，$30$ 层下来方差相差 $2^{30}\approx10^9$。
:::
:::

### 一个实验 {#sec-experiment}

下面的清单把一批 $32$ 个单位方差的输入推过 $30$ 层宽 $128$ 的网络，再从顶端反向传播一个单位方差的随机梯度，记录第 $1$、$10$、$20$、$30$ 层激活与梯度的均方根。最后两个例子使用[[#sec-residual]]讨论的残差块 $H\leftarrow H + s\cdot\operatorname{ReLU}(H)W$。

```python
import math, random

rng = random.Random(0)
n, depth, B = 128, 30, 32                     # 宽度、层数、批量大小

def matmul(H, W):                             # H: (B, n), W: (n, n) -> (B, n)
    Wt = list(zip(*W))
    return [[sum(h * w for h, w in zip(row, col)) for col in Wt] for row in H]

def rms(M):                                   # 矩阵元素的均方根
    return math.sqrt(sum(v * v for row in M for v in row) / (len(M) * len(M[0])))

def run(act, std, residual=False, s=1.0):
    """Plain layers H <- act(H W) or residual blocks H <- H + s * act(H) W, with W ~ N(0, std^2).
    Returns rms of the activations H_l and of the gradients dL/dH_l for l = 1, 10, 20, 30."""
    Ws = [[[rng.gauss(0, std) for _ in range(n)] for _ in range(n)] for _ in range(depth)]
    H = [[rng.gauss(0, 1) for _ in range(n)] for _ in range(B)]   # (B, n) 单位方差输入
    cache, fwd = [], []
    for W in Ws:                                                  # 前向传播
        if residual:
            cache.append(H)                                       # 模块的输入
            F = matmul([[act(h)[0] for h in row] for row in H], W)
            H = [[h + s * f for h, f in zip(hr, fr)] for hr, fr in zip(H, F)]
        else:
            A = matmul(H, W)
            cache.append(A)                                       # 预激活
            H = [[act(a)[0] for a in row] for row in A]
        fwd.append(rms(H))
    G = [[rng.gauss(0, 1) for _ in range(n)] for _ in range(B)]   # 随机取一个 dL/dH_30
    bwd = [rms(G)]
    for W, C in zip(reversed(Ws), reversed(cache)):               # 反向传播
        Wt = [list(r) for r in zip(*W)]
        if residual:          # dL/dH_in = G + s * (G W^T) * act'(H_in)：恒等路径 + 分支
            GW = matmul(G, Wt)
            G = [[g + s * d * act(h)[1] for g, d, h in zip(gr, dr, hr)]
                 for gr, dr, hr in zip(G, GW, C)]
        else:                 # dL/dH_in = (G * act'(A)) W^T
            D = [[g * act(a)[1] for g, a in zip(gr, ar)] for gr, ar in zip(G, C)]
            G = matmul(D, Wt)
        bwd.append(rms(G))
    bwd.reverse()                                                 # bwd[l] = rms dL/dH_l，l = 0..30
    pick = [1, 10, 20, 30]
    return [fwd[l - 1] for l in pick], [bwd[l] for l in pick]

tanh = lambda a: (math.tanh(a), 1 - math.tanh(a) ** 2)
relu = lambda a: (max(a, 0.0), 1.0 if a > 0 else 0.0)
cases = [("plain tanh, std 1/sqrt(n)      ", tanh, 1 / math.sqrt(n), False, 1.0),
         ("plain ReLU, std 1/sqrt(n)      ", relu, 1 / math.sqrt(n), False, 1.0),
         ("plain ReLU, std sqrt(2/n) (He) ", relu, math.sqrt(2 / n), False, 1.0),
         ("plain ReLU, std 1.5 sqrt(2/n)  ", relu, 1.5 * math.sqrt(2 / n), False, 1.0),
         ("residual ReLU, He, s = 1       ", relu, math.sqrt(2 / n), True, 1.0),
         ("residual ReLU, He, s = 1/sqrt30", relu, math.sqrt(2 / n), True, 1 / math.sqrt(depth))]
print("                                 rms H_l, l = 1/10/20/30            |  rms dL/dH_l, l = 1/10/20/30")
for name, act, std, res, s in cases:
    f, b = run(act, std, res, s)
    print(f"{name}  " + " ".join(f"{v:8.2e}" for v in f) + "  |  " + " ".join(f"{v:8.2e}" for v in b))
```

```text
                                 rms H_l, l = 1/10/20/30            |  rms dL/dH_l, l = 1/10/20/30
plain tanh, std 1/sqrt(n)        6.21e-01 2.22e-01 1.48e-01 1.16e-01  |  2.03e-01 5.45e-01 7.85e-01 9.95e-01
plain ReLU, std 1/sqrt(n)        7.41e-01 2.03e-02 3.49e-04 9.32e-06  |  3.54e-05 9.10e-04 3.26e-02 9.93e-01
plain ReLU, std sqrt(2/n) (He)   9.97e-01 7.27e-01 7.35e-01 5.00e-01  |  7.46e-01 8.32e-01 7.64e-01 1.01e+00
plain ReLU, std 1.5 sqrt(2/n)    1.50e+00 5.20e+01 3.77e+03 1.47e+05  |  1.42e+05 3.24e+03 5.32e+01 9.97e-01
residual ReLU, He, s = 1         1.40e+00 4.35e+01 1.75e+03 5.27e+04  |  2.79e+04 1.11e+03 3.35e+01 9.95e-01
residual ReLU, He, s = 1/sqrt30  1.02e+00 1.17e+00 1.38e+00 1.65e+00  |  1.61e+00 1.37e+00 1.19e+00 1.02e+00
```

ReLU 各行正是[[#prop-propagation]]的实况。方差取 $1/n$ 时每层增益为 $\frac12$，激活与第一层的梯度都塌缩四到五个数量级；取 He 的 $2/n$ 则保持在 $1$ 的量级；标准差乘 $1.5$（方差增益 $2.25$）就爆炸五个数量级。实测值与均值的预言有些偏移——He 的激活到第 $30$ 层掉到 $0.5$，$1/n$ 下的塌缩也比 $2^{-15}$ 差约三倍——因为在有限宽度下，每层的增益本身就是随机的，随机增益的乘积像对数的随机游走一样漂移（Hanin 与 Rolnick，2018）。tanh 网络收缩得很慢，因为 tanh 在 $0$ 以外的增益小于 $1$。

::: warning 好的初始化必要而不充分
初始化时方差正确，只保证网络在第零步尺度合适。训练会改变权重，没有任何初始化能在其后继续看好尺度；网络越深、学习率越大，尺度漂移得越早。这就是深网络还要用归一化层或残差连接（通常两者都用）的原因，也是从业者要在整个训练过程中而不仅在开头监控激活与梯度范数的原因。反过来说，每层都有归一化时，确切的初始尺度就重要得少了——不过说完全不重要又过头了：残差分支的尺度仍然要紧（见[[#sec-residual]]）。
:::

## 归一化层 {#sec-normalisation}

与其指望尺度一直保持正确，归一化层索性把它显式重置：把激活标准化为零均值、单位方差，再施加学到的尺度与平移。各种变体的区别在于对哪些数算统计量。

::: definition 批归一化 {#def-batchnorm}
对一批预激活 $A\in\R^{B\times d}$，**批归一化**（Ioffe 与 Szegedy，2015）在批量上对每个特征 $k$ 归一化：

$$
\mu_k = \frac1B\sum_{r=1}^BA_{rk},\qquad s_k^2 = \frac1B\sum_{r=1}^B(A_{rk} - \mu_k)^2,\qquad\operatorname{BN}(A)_{rk} = \gamma_k\frac{A_{rk} - \mu_k}{\sqrt{s_k^2 + \epsilon}} + \beta_k,
$$

其中 $\boldsymbol\gamma, \boldsymbol\beta\in\R^d$ 是学出来的参数，$\epsilon$ 很小。训练时统计量取自当前批量（反向传播还会穿过它们求导）；$\mu_k$ 与 $s_k^2$ 的滑动平均被存下，推理时改用它，使预测不依赖批量中的其他例子。卷积网络中，每个通道的统计量在批量*和*全部空间位置之上计算。
:::

::: definition 层归一化与 RMS 归一化 {#def-layer-rms}
**层归一化**（Ba、Kiros 与 Hinton，2016）在每个例子上对它自己的 $d$ 个特征归一化：对行 $\mathbf{a}\in\R^d$，$\mu = \frac1d\sum_ka_k$，$s^2 = \frac1d\sum_k(a_k - \mu)^2$，$\operatorname{LN}(\mathbf{a}) = \boldsymbol\gamma\odot(\mathbf{a} - \mu)/\sqrt{s^2 + \epsilon} + \boldsymbol\beta$。**RMS 归一化**（Zhang 与 Sennrich，2019）省去中心化与平移：$\operatorname{RMSNorm}(\mathbf{a}) = \boldsymbol\gamma\odot\mathbf{a}/\sqrt{\frac1d\sum_ka_k^2 + \epsilon}$。两者在训练与推理时行为相同，且不依赖批量。
:::

这些就是每个 Transformer 用的归一化，在[[transformers/transformer-block#def-layernorm]]与[[transformers/transformer-block#def-rmsnorm]]处定义，并在[[transformers/transformer-block#ex-norms]]处手工算过。批归一化在*例子之间*标准化每个特征，层归一化与 RMS 归一化在*特征之间*标准化每个例子。还有一个变体**组归一化**（Wu 与 He，2018），在每个例子内部对一组通道归一化，面向用小批量训练的卷积网络。

::: example 手算批归一化 {#ex-bn}
某个特征在四个例子的批量上取值 $1, 2, 3, 6$。计算归一化后的值（$\epsilon$ 可忽略，$\gamma = 1$，$\beta = 0$），并求：若这四个数是单个例子的四个特征，层归一化会怎么做。
::: solution
均值为 $3$，（有偏）方差为 $\frac14(4 + 1 + 0 + 9) = 3.5$，故 $s = 1.871$，归一化后的值为 $(-2, -1, 0, 3)/1.871 = (-1.069, -0.535, 0, 1.604)$：均值 $0$，方差 $1$。若 $(1, 2, 3, 6)$ 是一个例子的四个特征，层归一化在这一行上做完全相同的计算，给出同样的数——两者的区别在于这四个数来自哪个轴。对这一行作 RMS 归一化则除以 $\sqrt{(1 + 4 + 9 + 36)/4} = \sqrt{12.5} = 3.536$，得 $(0.283, 0.566, 0.849, 1.697)$，不作中心化。
:::
:::

归一化让前向信号在构造上就尺度良好。它还改变损失的几何，这一点能解释它对训练的大部分作用。

::: proposition 归一化层的尺度不变性 {#prop-scale-invariance}
设 $\mathcal{L}(W)$ 只通过 $\operatorname{Norm}(W\mathbf{x})$（对一切输入 $\mathbf{x}$）依赖权重矩阵 $W$，其中 $\operatorname{Norm}$ 为批、层或 RMS 归一化，且 $\epsilon = 0$。则对每个 $c > 0$：

1. $\mathcal{L}(cW) = \mathcal{L}(W)$；
2. $\langle\nabla\mathcal{L}(W), W\rangle = 0$：梯度与权重正交；
3. $\nabla\mathcal{L}(cW) = \frac1c\nabla\mathcal{L}(W)$：把权重放大，梯度就缩小。

（对批归一化，结论对 $W$ 的每一行分别成立。）
:::

::: proof
(1) 每种归一化都除以由同一批数算出的标准差（或 RMS），所以输入乘 $c > 0$ 时分子分母同乘 $c$；先减均值时，$c$ 在中心化后的分子里也约掉。(2) 把 $\mathcal{L}(cW) = \mathcal{L}(W)$ 对 $c$ 在 $c = 1$ 处求导：由链式法则 $\langle\nabla\mathcal{L}(W), W\rangle = 0$。(3) 把 $\mathcal{L}(cW) = \mathcal{L}(W)$ 对 $W$ 求导：左边给出 $c\,\nabla\mathcal{L}(cW)$，右边为 $\nabla\mathcal{L}(W)$。
:::

由此有两个推论。其一，要紧的是 $W$ 的**方向**，而该方向上的有效学习率为 $\eta/\lVert W\rVert^2$：长度为 $\eta\lVert\nabla\mathcal{L}\rVert$ 的梯度步把 $W$ 旋转约 $\eta\lVert\nabla\mathcal{L}(W)\rVert/\lVert W\rVert$ 的角度，而 $\lVert\nabla\mathcal{L}(W)\rVert$ 本身按 $1/\lVert W\rVert$ 缩放。其二，因为梯度与 $W$ 正交，普通梯度下降只能*增大*范数：$\lVert W - \eta\mathbf{g}\rVert^2 = \lVert W\rVert^2 + \eta^2\lVert\mathbf{g}\rVert^2$，于是有效学习率在训练中自动衰减。权重衰减抵消这种增长，两者的平衡定下均衡的有效学习率——这就是权重衰减对归一化网络有效果、尽管它改变不了网络所计算的函数的原因（van Laarhoven，2017；[[neural-networks/regularisation-deep]]）。

批归一化为什么有助优化仍在争论。Ioffe 与 Szegedy 的动机是减小**内部协变量漂移**——早先的各层学习时，每层输入的分布在变。Santurkar、Tsipras、Ilyas 与 Madry（2018）发现，加上*增大*这种漂移的噪声几乎无碍，转而定称归一化让损失及其梯度更平滑，从而允许更大的学习率。它的实际好处——训练更快、对初始化稳健、容忍更高的学习率、批量噪声带来轻微的正则化——经验上十分确定。毛病同样明显：它把同一批量里的例子耦合在一起，小批量下表现不佳，训练与推理行为不同，对长度可变的序列模型和自回归生成也很别扭。层归一化四点全都避开，这就是 Transformer 用它（或 RMSNorm——省掉减均值，省一点开销，结果相仿）的原因。

::: quiz
一个网络在线性层 $W$ 之后紧跟一层归一化。训练中 $W$ 的范数翻倍。网络的输出和对 $W$ 的梯度各发生什么？
- [ ] 两者都翻倍
- [x] 输出不变，梯度减半
- [ ] 输出翻倍，梯度不变
- [ ] 两者都不变
::: solution
由[[#prop-scale-invariance]]，$\mathcal{L}(2W) = \mathcal{L}(W)$ 且 $\nabla\mathcal{L}(2W) = \frac12\nabla\mathcal{L}(W)$。于是同样的学习率把 $W$ 转过的角度只有原来的四分之一：增长中的权重范数起到学习率衰减的作用。
:::
:::

## 残差连接 {#sec-residual}

到 2015 年，配上好的初始化与批归一化，二三十层的网络已经训练得很好，更深的却不行：He、Zhang、Ren 与 Sun（2016）报告，普通的 $56$ 层卷积网络在 CIFAR-10 上的*训练误差*比 $20$ 层的还高。这种**退化**不是过拟合——训练误差本身就更差——也不可能是表达能力的极限，因为更深的网络本可以照抄浅的那个、把多出的层设为恒等映射。优化器就是找不到这样的解。他们的办法是让恒等成为默认。

::: definition 残差模块 {#def-residual}
**残差模块**计算 $\mathbf{x}_{\ell+1} = \mathbf{x}_\ell + F_\ell(\mathbf{x}_\ell)$，其中 $F_\ell$ 称为**残差分支**，是一个小网络——最初的 ResNet 里是两次 $3\times3$ 卷积配批归一化与 ReLU——而恒等通路称为**跳跃**（skip，或捷径）连接。分支改变形状时，跳跃改用线性投影代替恒等。
:::

分支只需要学习与恒等的*差*；分支输出为零的模块原样通过输入。梯度受益更直接：由[[transformers/transformer-block#prop-identity]]，$L$ 个残差模块的雅可比为 $\prod_\ell(I + J_\ell) = I + \sum_\ell J_\ell + \dots$，所以不论网络多深，任何一层的梯度里都原样含有顶端的梯度。[[#eq-jacobian-product]]那个按几何级数消失或爆炸的乘积，变成了和式加上高阶项。He 等人用残差连接与批归一化在 ImageNet 上训练了 $152$ 层的网络，在 CIFAR-10 上训练了超过 $1{,}000$ 层的网络。

残差连接带来一个新的尺度问题。每个模块都往流上*加*东西，所以流会增长。

::: proposition 残差流中的方差 {#prop-residual-variance}
设 $\mathbf{x}_{\ell+1} = \mathbf{x}_\ell + s\,F_\ell(\mathbf{x}_\ell)$，每个分支输出均值为零、与自身输入不相关，且 $\frac1d\E\lVert F_\ell(\mathbf{x}_\ell)\rVert^2 = v_\ell$。则 $q_{\ell+1} = q_\ell + s^2v_\ell$，其中 $q_\ell = \frac1d\E\lVert\mathbf{x}_\ell\rVert^2$。特别地：

1. 分支读*归一化后*的输入（pre-norm）时，$v_\ell = v$ 为常数，$q_L = q_0 + Ls^2v$ 随深度线性增长；
2. 分支输出与其输入成比例时，$v_\ell = \alpha q_\ell$，则 $q_L = (1 + s^2\alpha)^Lq_0$：除非 $s^2\alpha = O(1/L)$，它是指数的。
:::

::: proof
展开得 $\E\lVert\mathbf{x}_\ell + sF_\ell\rVert^2 = \E\lVert\mathbf{x}_\ell\rVert^2 + 2s\,\E\langle\mathbf{x}_\ell, F_\ell\rangle + s^2\E\lVert F_\ell\rVert^2$，中间项消失，因为 $F_\ell$ 均值为零且与 $\mathbf{x}_\ell$ 不相关。除以 $d$ 即得递推；$v$ 恒定时对其求和得 (1)，解 $q_{\ell+1} = (1 + s^2\alpha)q_\ell$ 得 (2)。
:::

[[#sec-experiment]]实验的最后两行是 $\alpha = 1$ 的情形 2（He 初始化的分支保持输入的尺度）：$s = 1$ 时信号每个模块方差翻倍，总共 $2^{30}$；$s = 1/\sqrt{30}$ 时方差增长 $(1 + 1/30)^{30}\approx e$ 倍、大小增长 $(1 + 1/30)^{15} = 1.64$ 倍，与实测相符。若干实用配方实现了 $s\propto1/\sqrt L$ 的缩放，或让每个分支从零起步：Goyal 等（2017）把每个残差分支最后一个批归一化的增益初始化为 $0$；Fixup（Zhang、Dauphin 与 Ma，2019）重标定分支权重，不用归一化也能训练深残差网络；GPT-2（Radford 等，2019）把每个残差分支输出投影的初始权重乘 $1/\sqrt N$，$N$ 为残差层数。Pre-norm 的 Transformer 属于情形 1：流只线性增长，输出层前最后的归一化再把它除掉。

::: example GPT-2 的残差缩放 {#ex-gpt2-scaling}
GPT-2 small 有 $12$ 个模块，每个模块有两个残差分支（注意力与前馈），权重从 $\Normal(0, 0.02^2)$ 初始化，分支的输出投影还额外乘 $1/\sqrt N$。这些输出投影的标准差是多少？若每个分支输出都带有不作缩放时应有的方差 $v$，初始化时残差流的方差穿过整个网络总共增大多少？
::: solution
$N = 2\cdot12 = 24$ 个残差层，所以输出投影的标准差为 $0.02/\sqrt{24} = 0.00408$。它们输出的方差被缩放 $1/24$，由[[#prop-residual-variance]]（情形 1），所有分支加起来流的方差总共增大 $24\cdot v/24 = v$，而不是 $24v$：流的顶端与底端数量级相同，无论多深。许多开源实现正因如此取 $\text{std} = 0.02/\sqrt{2L}$。
:::
:::

::: history
深网络与循环网络的训练困难，Sepp Hochreiter 在其 1991 年的毕业论文中、以及 Yoshua Bengio、Patrice Simard 与 Paolo Frasconi（1994）都做过分析；LSTM（Hochreiter 与 Schmidhuber，1997）用一个加法记忆单元——一条沿时间的残差连接——解决了循环网络的情形。2006 年，Hinton、Osindero 与 Teh 以贪心的逐层预训练让深网络复活——预训练提供了好的初始化。Xavier Glorot 与 Yoshua Bengio 的《Understanding the difficulty of training deep feedforward neural networks》（2010）推出了保持尺度的初始化，并表明不用预训练也能训练普通深网络；Kaiming He 等人把分析推广到 ReLU（2015）。Sergey Ioffe 与 Christian Szegedy 于 2015 年引入批归一化，Jimmy Ba、Jamie Kiros 与 Geoffrey Hinton 于 2016 年引入层归一化，Biao Zhang 与 Rico Sennrich 于 2019 年引入 RMSNorm。残差网络（He、Zhang、Ren 与 Sun；arXiv 2015 年 12 月，CVPR 2016）以 $152$ 层赢得 2015 年 ImageNet 竞赛；Rupesh Srivastava、Klaus Greff 与 Jürgen Schmidhuber 的高速网络（highway network，2015）稍早前用过带门的跳跃连接。残差连接与归一化从此成为 Transformer（2017）的两种结构元件。
:::

::: summary
- 深层的梯度是许多雅可比的乘积，前向信号是许多层的乘积；除非每层平均而言保持尺度，两者都会按几何级数**消失或爆炸**。
- 权重必须随机，以打破单元间的**对称**。对 ReLU，$\E[\operatorname{ReLU}(a)^2] = \frac12\E a^2$，所以方差 $2/n_{\text{in}}$（**He**）保持信号；对大致线性的激活，$1/n_{\text{in}}$ 保持前向，**Xavier** 的 $2/(n_{\text{in}} + n_{\text{out}})$ 在前向与反向之间折中。
- **批归一化**在批量上标准化每个特征（推理用滑动统计量）；**层归一化**与 **RMS 归一化**在每个例子上对其特征标准化、不依赖批量，适合 Transformer。
- 归一化层对权重**尺度不变**：梯度与权重正交、并随权重增长而缩小，所以权重范数相当于一个倒数的学习率。
- **残差连接** $\mathbf{x} + F(\mathbf{x})$ 给梯度一条恒等通路，让 $100$ 层以上的网络可训。流的方差随分支累积增长，所以分支要缩放（约 $1/\sqrt L$）或初始化为零，pre-norm 则让增长保持线性。
:::

## 习题

::: exercise 宽层的 He 初始化 {level=1 check="sqrt(2/4096)"}
$4{,}096$ 个输入的层，He 初始化给出的标准差是多少？
::: solution
$\sqrt{2/4096} = 0.0221$。
:::
:::

::: exercise Xavier 均匀分布 {level=1 check="sqrt(6/(256+128))"}
给出 $n_{\text{in}} = 256$、$n_{\text{out}} = 128$ 的层所用 Xavier 均匀分布的界 $r$。
::: solution
$r = \sqrt{3\sigma^2} = \sqrt{3\cdot2/(256 + 128)} = \sqrt{6/384} = 0.125$。
:::
:::

::: exercise 收缩的信号 {level=1 check="2^(-20)"}
一个 $20$ 层等宽的 ReLU 网络以方差 $1/n$ 初始化。据[[#prop-propagation]]，最后一层预激活的均方比第一层小多少倍？（用 $20$ 个因子。）
::: solution
每层增益为 $n\cdot\frac1n\cdot\frac12 = \frac12$，所以倍数为 $2^{-20}\approx9.5\times10^{-7}$，约一百万分之一——标准差上是 $1{,}000$ 倍。
:::
:::

::: exercise ReLU 的二阶矩 {level=2}
设 $a\sim\Normal(0, q)$。计算 $\E[\operatorname{ReLU}(a)]$、$\E[\operatorname{ReLU}(a)^2]$ 与 $\Var(\operatorname{ReLU}(a))$。为什么[[#prop-propagation]]追踪的是激活的二阶矩而不是方差？
::: solution
由对称性 $\E[\operatorname{ReLU}(a)^2] = \frac12\E a^2 = q/2$。均值为 $\E[a\,[a > 0]] = \sqrt q\int_0^\infty z\varphi(z)\,dz = \sqrt q\,\varphi(0) = \sqrt{q/(2\pi)}$，其中 $\varphi$ 是标准正态密度。于是 $\Var = q/2 - q/(2\pi) = q(\pi - 1)/(2\pi)\approx0.341q$。下一层预激活的方差是 $n\sigma^2\E[h^2]$——是二阶矩、含均值在内——因为零均值权重乘上非零均值的输入，贡献的是输入完整的二阶矩（[[math-for-ml/probability#prop-init]]）。只追踪方差会把下一层低估 $0.341/0.5$ 这个因子。
:::
:::

::: exercise 推理时的批归一化 {level=2 check="(5-3)/sqrt(3.5)"}
训练结束后，某特征的滑动均值为 $3$、滑动方差为 $3.5$，$\gamma = 1$、$\beta = 0$。一个测试样例在该特征上取值 $5$。批归一化输出什么？若测试时用自己的批量统计量来归一化，会出什么问题？
::: solution
$(5 - 3)/\sqrt{3.5} = 1.069$。批量为一个样例时，批量均值就是 $5$、方差为 $0$，于是无论输入是什么输出都是 $0$（没有 $\epsilon$ 则无定义）：预测将不带任何信息。用滑动统计量，推理才是确定的、且不依赖其他例子。
:::
:::

::: exercise 对称的单元 {level=2}
一个单层隐藏层有 $100$ 个单元的网络，入边权重全部初始化为 $0.01$，出边权重也全部为 $0.01$。用 SGD 训练后，它实际上相当于多少个不同的隐藏单元？训练时加上 dropout 会改变答案吗？
::: solution
由[[#prop-symmetry]]，$100$ 个单元永远相同，所以网络相当于一个隐藏单元（出边权重乘了 $100$）。dropout 每步把随机一小撮单元置零，不同单元收到不同的梯度，对称因此被打破；单元会逐渐分化，但既慢又浪费。正确的办法是随机初始化。
:::
:::

::: exercise 归一化下的权重范数 {level=2 check="sqrt(1+0.01)"}
权重向量 $\mathbf{w}$ 满足 $\lVert\mathbf{w}\rVert = 1$，接到一层归一化上，走一步 $\eta\lVert\nabla\mathcal{L}\rVert = 0.1$ 的梯度步。用[[#prop-scale-invariance]]求步后的 $\lVert\mathbf{w}\rVert$。解释为什么没有权重衰减时，重复走步会让范数一直增长。
::: solution
梯度与 $\mathbf{w}$ 正交，由勾股定理 $\lVert\mathbf{w} - \eta\nabla\mathcal{L}\rVert^2 = 1 + 0.01$，新范数为 $\sqrt{1.01}\approx1.005$。每步给范数的平方加上 $\eta^2\lVert\nabla\mathcal{L}\rVert^2 > 0$，而没有任何东西减去它，所以范数单调增长，有效学习率 $\eta/\lVert\mathbf{w}\rVert^2$ 随之下降。权重衰减每步把范数乘 $1 - \eta\lambda$，两种效应在均衡范数处平衡。
:::
:::

::: exercise 未缩放残差流的增长 {level=3 check="2^24"}
一个普通残差网络有 $24$ 个模块 $\mathbf{x}\leftarrow\mathbf{x} + F(\mathbf{x})$，其分支保持输入的二次矩不变（[[#prop-residual-variance]]中的 $\alpha = 1$）。激活的均方从输入到输出增大多少倍？分支尺度 $s$ 取多少能把增长限制在至多 $e$ 倍？
::: solution
$(1 + 1)^{24} = 2^{24}\approx1.7\times10^7$。尺度为 $s$ 时倍数为 $(1 + s^2)^{24}\le e^{24s^2}$，只要 $s^2\le1/24$、即 $s\le1/\sqrt{24}\approx0.204$ 就不超过 $e$；精确条件 $(1 + s^2)^{24} = e$ 给出 $s^2 = e^{1/24} - 1 = 0.0425$，$s = 0.206$。这就是 $1/\sqrt L$ 法则。
:::
:::

::: exercise 穿过残差链的梯度 {level=3}
考虑标量链 $x_{\ell+1} = x_\ell + s\,w_\ell\tanh(x_\ell)$，$\ell = 0, \dots, L - 1$，$\lvert w_\ell\rvert\le1$。证明 $\partial x_L/\partial x_0$ 介于 $(1 - s)^L$ 与 $(1 + s)^L$ 之间，并与普通链 $x_{\ell+1} = w_\ell\tanh(x_\ell)$ 比较。这对选择 $s = 1/L$ 说明什么？
::: solution
$\partial x_{\ell+1}/\partial x_\ell = 1 + sw_\ell\tanh'(x_\ell)$，且 $0 < \tanh'\le1$，所以每个因子落在 $[1 - s, 1 + s]$ 中，$L$ 个因子的乘积介于 $(1 - s)^L$ 与 $(1 + s)^L$ 之间。普通链的每个因子是 $w_\ell\tanh'(x_\ell)$，绝对值至多 $1$、通常远小于 $1$，乘积可能按几何级数消失。取 $s = 1/L$ 时 $(1 \pm 1/L)^L\to e^{\pm1}$：网络全程的梯度在任何深度都保持在顶端梯度的约 $0.37$ 到 $2.72$ 倍之间——残差网络的梯度既不消失也不爆炸。
:::
:::

::: exercise LayerNorm 的反向是一个投影 {level=3}
设 $\mathbf{y} = (\mathbf{a} - \mu\mathbf{1})/s$ 是不带增益、平移与 $\epsilon$ 的层归一化，$\mathbf{a}\in\R^d$ 不是常向量。证明梯度 $\bar{\mathbf{a}} = J^\top\bar{\mathbf{y}}$ 与 $\mathbf{1}$ 和 $\mathbf{y}$ 都正交，并把它显式写出来。解释这个结果。
::: solution
$\mathbf{a}$ 平移（$\mathbf{a} + c\mathbf{1}$）或缩放（$c\mathbf{a}$，$c > 0$）时 $\mathbf{y}$ 不变。对这两个不变性求导：$J\mathbf{1} = \mathbf{0}$ 且 $J\mathbf{a} = \mathbf{0}$，于是 $J(\mathbf{a} - \mu\mathbf{1}) = J(s\mathbf{y}) = \mathbf{0}$。所以 $\mathbf{1}^\top\bar{\mathbf{a}} = \mathbf{1}^\top J^\top\bar{\mathbf{y}} = (J\mathbf{1})^\top\bar{\mathbf{y}} = 0$，同理 $\mathbf{y}^\top\bar{\mathbf{a}} = 0$。显式地，对 $\mu$ 与 $s$ 求导得
$$
\bar{\mathbf{a}} = \frac1s\Big(\bar{\mathbf{y}} - \frac1d(\mathbf{1}^\top\bar{\mathbf{y}})\mathbf{1} - \frac1d(\mathbf{y}^\top\bar{\mathbf{y}})\mathbf{y}\Big),
$$
它是 $\bar{\mathbf{y}}$ 乘 $\frac1s$ 后向 $\mathbf{1}$ 与 $\mathbf{y}$ 的正交补上的投影（这两个向量彼此正交，且 $\lVert\mathbf{y}\rVert^2 = d$）。归一化丢弃了那些只会改变输入均值或尺度的梯度分量——它的输出无法沿其改变的方向——并把剩下的部分除以输入的尺度，这正是[[#prop-scale-invariance]]的逐样例版本。
:::
:::
