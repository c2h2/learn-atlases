假设计算预算给定——比如 $10^{24}$ 次浮点运算，几千台加速器跑几个星期。你可以把它花在参数量大、训练词元相对少的模型上，也可以花在参数量小、训练词元多的模型上。既然训练 $N$ 个参数、$D$ 个词元约花 $6ND$ FLOPs（[[scaling/flops-memory]]），$N$ 每取一个值就定下 $D = C/(6N)$，问题在于这条曲线上的哪一点损失最低。Kaplan et al.（2020）之后的两年里，答案是“尽量把模型做大”，GPT-3（$1750$ 亿参数、$3000$ 亿词元）与 Gopher（$2800$ 亿、$3000$ 亿词元）之类的模型便照此建成。2022 年，DeepMind 的 Hoffmann 与合作者表明这些模型**训练不足**：同样的计算量，用四分之一大小、四倍数据的模型会更好。他们那个 $700$ 亿参数的模型 **Chinchilla** 用 $1.4$ 万亿词元训练，在他们跑的几乎每一项评测上都胜过了 Gopher。

本章用拉格朗日乘数从参数化缩放定律导出计算最优分配，解释 Hoffmann et al. 使用的三种方法、以及它们为何与 Kaplan et al. 相左；然后放宽假设中实践里要紧的两个方向：当模型要用于大量推理时，最优模型更小、训练得更久；当数据不够时，重复使用有帮助，但边际收益递减。这里用到的幂律与拟合方法见[[scaling/scaling-laws]]。

## 分配问题 {#sec-problem}

::: definition 计算最优分配 {#def-compute-optimal}
设 $L(N, D)$ 为 $N$ 个参数的模型用调好的配方在 $D$ 个词元上训练的损失，训练代价 $C(N, D) = 6ND$ FLOPs。给定预算 $C$，**计算最优**的模型规模与数据规模为

$$
\big(N^\ast(C), D^\ast(C)\big) = \operatorname*{arg\,min}_{N, D\,:\,6ND = C} L(N, D).
$$

曲线 $C\mapsto L\big(N^\ast(C), D^\ast(C)\big)$ 称为**计算效率前沿**。
:::

这个定义藏着一个值得挑明的假设，因为它正是文献中主要分歧的来源：$L(N, D)$ 必须是为 $D$ 个词元**设计**的那次运行的损失。为 $4D$ 词元训练、在第 $D$ 个词元处评测的模型，与为 $D$ 训练的模型不一样；若调度按更长的运行设定、第 $D$ 步处学习率还在高位，损失就更差。Kaplan et al. 对所有运行只用一种调度长度、中途读出损失；Hoffmann et al. 则为每个 $D$ 单独训练一次运行，用与其长度匹配的余弦调度。

## 三种方法 {#sec-approaches}

Hoffmann et al.（2022）训练了 $400$ 多个模型，参数从 $7000$ 万到 $160$ 亿以上，在 MassiveText 语料上喂 $500$ 亿到 $5000$ 亿词元，用三种不同途径估计 $N^\ast(C)$。

::: algorithm 方法 1：训练曲线的下包络 {#alg-envelope}
1. 对一系列模型规模中的每一个，训练若干次运行，余弦调度长度各不相同（词元数横跨 $16$ 倍）。
2. 在同一张图上画出每次运行的训练损失对迄今已花计算量 $6N\cdot(\text{已见词元数})$ 的曲线。
3. 对每个计算量 $C$，取损失最低的运行与那个点——所有曲线的下**包络**——记下它的 $N$ 和 $D$。
4. 对记下的点拟合幂律 $N^\ast\propto C^{a}$、$D^\ast\propto C^{b}$。
:::

::: algorithm 方法 2：IsoFLOP 剖面 {#alg-isoflop}
1. 选取一组计算预算（论文用了 $9$ 个预算，从 $6\times10^{18}$ 到 $3\times10^{21}$ FLOPs）。
2. 对每个预算 $C$，训练若干规模 $N$ 的模型，各训 $D = C/(6N)$ 个词元、调度与长度匹配。
3. 对每个预算画最终损失对 $\log N$ 的曲线——一条**IsoFLOP 剖面**——并拟合一条抛物线；其最小值估计 $N^\ast(C)$。
4. 对各个预算处极小点的序列拟合幂律。
:::

::: algorithm 方法 3：参数化拟合 {#alg-parametric}
1. 收集方法 1 与 2 全部运行的最终损失 $L_i$ 及对应的 $(N_i, D_i)$。
2. 最小化 $\sum_i h_\delta\big(\log\hat L(N_i, D_i) - \log L_i\big)$（Huber 损失 $h_\delta$，$\delta = 10^{-3}$），从一组初值出发用 L-BFGS 拟合 $\hat L(N, D) = E + A/N^\alpha + B/D^\beta$。
3. 解析地最小化拟合出的 $\hat L$，约束为 $6ND = C$（[[#thm-chinchilla]]）。
:::

三种方法对 $N^\ast\propto C^a$ 给出的指数为 $a = 0.50, 0.49, 0.46$，对 $D^\ast\propto C^b$ 给出 $b = 0.50, 0.51, 0.54$。三者都说**参数量与数据量应按大致相同的比例**随计算量增长——计算量每翻倍，应在两边各分得约 $\sqrt2$——与 Kaplan et al. 的 $N^\ast\propto C^{0.73}$ 恰成对照。方法 1 的计算最优配置表在各规模上给出接近**每参数 $20$ 个词元**：$4$ 亿参数配 $80$ 亿词元，$100$ 亿配 $2050$ 亿，$670$ 亿配 $1.5$ 万亿。这个比例就是如今广为引用的“Chinchilla 法则”。

下面的 IsoFLOP 图展示了方法 2 要找什么，用的是本章稍后讨论的参数化拟合。

::: widget plot
f: 1.69 + 406.4*10^(-0.34*x) + 410.7*(10^c/(6*10^x))^(-0.28); 1.82 + 482.01*10^(-0.3478*x) + 2085.43*(10^c/(6*10^x))^(-0.3658)
x: 8, 12.5
y: 1.8, 3
sliders: c=23:20:26:0.25
labels: fit of Hoffmann et al. (2022); refit of Besiroglu et al. (2024)
caption: IsoFLOP 剖面：固定计算预算 $10^c$ FLOPs（每个 $N$ 训 $D = 10^c/(6N)$ 个词元）下，预测损失对 $\log_{10}N$。模型太小则容量不足，太大则数据不足，故每条剖面都有极小值。滑杆上移一个数量级，极小值约右移半个数量级。两条曲线来自对同一份数据的两个拟合；在 $c\approx23.8$（Chinchilla 的预算）处，两者极小点对应的 $N$ 相差约两倍——[[#sec-refit]]的主题。
:::

## 导出最优 {#sec-derivation}

有了参数化形式，分配问题就成了一道约束优化练习题，其解恰好指明每参数二十词元法则从何而来。

::: theorem 可分幂律下的计算最优分配 {#thm-chinchilla}
设 $L(N, D) = E + AN^{-\alpha} + BD^{-\beta}$，$A, B, \alpha, \beta > 0$，$C = 6ND$。则 $L$ 在约束 $6ND = C$ 下的唯一最小元为

$$
N^\ast(C) = G\left(\frac{C}{6}\right)^{a},\qquad D^\ast(C) = G^{-1}\left(\frac{C}{6}\right)^{b},\qquad
a = \frac{\beta}{\alpha + \beta},\quad b = \frac{\alpha}{\alpha + \beta},\quad G = \left(\frac{\alpha A}{\beta B}\right)^{1/(\alpha+\beta)}.
$$ {#eq-chinchilla-opt}

在最优点，两个可归约项满足

$$
\frac{AN^{\ast-\alpha}}{BD^{\ast-\beta}} = \frac{\beta}{\alpha},
$$ {#eq-balance}

词元与参数之比为

$$
\frac{D^\ast}{N^\ast} = G^{-2}\left(\frac{C}{6}\right)^{(\alpha - \beta)/(\alpha + \beta)}.
$$ {#eq-ratio}
:::

::: proof
作拉格朗日函数 $\mathcal{J}(N, D, \lambda) = E + AN^{-\alpha} + BD^{-\beta} + \lambda(6ND - C)$。其驻点满足

$$
\frac{\partial\mathcal{J}}{\partial N} = -\alpha AN^{-\alpha-1} + 6\lambda D = 0,\qquad
\frac{\partial\mathcal{J}}{\partial D} = -\beta BD^{-\beta-1} + 6\lambda N = 0.
$$

第一个方程乘 $N$、第二个乘 $D$，得 $\alpha AN^{-\alpha} = 6\lambda ND = \beta BD^{-\beta}$，即[[#eq-balance]]。代入 $D = C/(6N)$：$\alpha AN^{-\alpha} = \beta B(C/6)^{-\beta}N^{\beta}$，于是

$$
N^{\alpha+\beta} = \frac{\alpha A}{\beta B}\left(\frac{C}{6}\right)^{\beta},\qquad N^\ast = \left(\frac{\alpha A}{\beta B}\right)^{1/(\alpha+\beta)}\left(\frac{C}{6}\right)^{\beta/(\alpha+\beta)},
$$

且 $D^\ast = (C/6)/N^\ast = G^{-1}(C/6)^{1 - a}$，其中 $1 - a = \alpha/(\alpha + \beta) = b$。把 $D^\ast$ 除以 $N^\ast$ 即得[[#eq-ratio]]，因为 $b - a = (\alpha - \beta)/(\alpha + \beta)$。

剩下只需证这个驻点是全局最小。在约束上令 $u = \log N$；则 $D = (C/6)e^{-u}$，$L = E + Ae^{-\alpha u} + B(C/6)^{-\beta}e^{\beta u}$ 是两个（系数为正的指数函数的）严格凸函数之和，故关于 $u$ 严格凸，$u\to\pm\infty$ 时趋于 $+\infty$，恰有一个驻点，它就是全局最小。
:::

由此得三条推论。其一，指数只依赖 $\alpha$ 与 $\beta$ 的**比值**：$N^\ast\propto C^{0.5}$——Hoffmann 的方法 1 与 2——对应 $\alpha = \beta$，即参数量与数据量同样“难以替代”。其二，由[[#eq-ratio]]，**每参数词元数在所有计算预算下恰为常数当且仅当 $\alpha = \beta$**，此时它等于 $G^{-2} = (B/A)^{1/\alpha}$；若 $\alpha > \beta$ 比例随计算量增大，若 $\alpha < \beta$ 则缩小。所以“约每参数 $20$ 个词元”的固定法则，其实是说在所研究范围内 $\alpha\approx\beta$ 且 $A$ 与 $B$ 之比取某个特定值的经验陈述。其三，由[[#eq-balance]]，最优点处可归约损失中受参数限制与受数据限制的两部分成固定比 $\beta/\alpha$：两种资源都不许成为瓶颈。

::: example Chinchilla 的预算 {#ex-chinchilla}
Hoffmann et al. 估计 Gopher 的训练计算量 $C = 5.76\times10^{23}$ FLOPs。用其公布的参数化拟合 $E = 1.69$、$A = 406.4$、$B = 410.7$、$\alpha = 0.34$、$\beta = 0.28$，计算 $N^\ast$、$D^\ast$，以及该预算下 Gopher（$N = 2800$ 亿）与 Chinchilla（$N = 700$ 亿）的预测损失。
::: solution
$a = 0.28/0.62 = 0.452$，$b = 0.548$。$G = (0.34\cdot406.4/(0.28\cdot410.7))^{1/0.62} = (138.18/115.00)^{1.613} = 1.2016^{1.613} = 1.345$。由 $C/6 = 9.6\times10^{22}$：$N^\ast = 1.345\cdot(9.6\times10^{22})^{0.452} = 3.2\times10^{10}$，$D^\ast = 3.0\times10^{12}$，约每参数 $93$ 个词元。

Gopher：$D = 5.76\times10^{23}/(6\cdot2.8\times10^{11}) = 3.4\times10^{11}$ 词元，$L = 1.69 + 406.4/(2.8\times10^{11})^{0.34} + 410.7/(3.4\times10^{11})^{0.28} = 1.984$。Chinchilla：$D = 1.37\times10^{12}$ 词元，$L = 1.938$。拟合偏好更小的模型，每词元低 $0.046$ 纳特——而且还会更偏好一个 $320$ 亿参数、$L = 1.931$ 的更小模型。注意剖面在极小值附近有多平坦：$N$ 从 Chinchilla 的 $700$ 亿减半，损失变化不到 $0.01$。
:::
:::

这个例子暴露了一处紧张关系。公布的参数化拟合把 Chinchilla 预算下的最优点放在约每参数 $93$ 个词元，其指数（$\alpha > \beta$）还让比例随计算量增大——而方法 1 与 2、以及 Chinchilla 模型本身，都待在 $20$ 附近。Hoffmann et al. 自己也指出方法 3 预测的最优模型比另两种方法小一些。下面的程序做这个对照，并附上稍后讨论的第二个拟合。

```python
import math

FITS = {"Hoffmann 2022": (1.69, 406.4, 410.7, 0.34, 0.28),
        "Besiroglu 2024": (1.82, 482.01, 2085.43, 0.3478, 0.3658)}

def loss(f, N, D):
    E, A, B, al, be = f
    return E + A / N ** al + B / D ** be

def chinchilla(f, C):
    """Lagrange solution of min L(N, D) subject to 6 N D = C."""
    E, A, B, al, be = f
    G = (al * A / (be * B)) ** (1 / (al + be))
    N = G * (C / 6) ** (be / (al + be))
    return N, C / (6 * N)

def grid_check(f, C):
    """Brute-force scan of N on a log grid as a check on the closed form."""
    Ns = [10 ** (7 + 7 * i / 7000) for i in range(7001)]
    return min(Ns, key=lambda N: loss(f, N, C / (6 * N)))

for name, f in FITS.items():
    print(name)
    for C in (1e21, 5.76e23, 1e25):
        N, D = chinchilla(f, C)
        print(f"  C={C:.2e}  N*={N:.3e} (grid {grid_check(f, C):.3e})"
              f"  D*={D:.3e}  D*/N*={D / N:5.1f}  L={loss(f, N, D):.4f}")

# 考虑推理的最优解（Sardana & Frankle 2024）：达到 Chinchilla 最优模型在
# 1e23 FLOPs 下达到的损失，同时最小化 6*N*D + 2*N*D_inf。
f = FITS["Besiroglu 2024"]; E, A, B, al, be = f
N0, D0 = chinchilla(f, 1e23); target = loss(f, N0, D0)
print(f"target loss {target:.4f} (Chinchilla-optimal at 1e23: N={N0:.2e}, D={D0:.2e})")
print(" D_inf     N         D_train    D/N    train FLOPs  infer FLOPs  total vs Chinchilla")
for D_inf in (0, 1e12, 1e13, 1e14):
    best = None
    for i in range(1, 4001):
        N = N0 * 10 ** (-2 + 2 * i / 4000)             # 在 N0/100 ... N0 中搜索
        gap = target - E - A / N ** al                  # 数据项须达到的值
        if gap <= 0:
            continue
        D = (B / gap) ** (1 / be)
        cost = 6 * N * D + 2 * N * D_inf
        if best is None or cost < best[0]:
            best = (cost, N, D)
    cost, N, D = best
    base = 6 * N0 * D0 + 2 * N0 * D_inf
    print(f"{D_inf:8.0e}  {N:.3e}  {D:.3e}  {D / N:6.0f}  {6 * N * D:.3e}    "
          f"{2 * N * D_inf:.3e}    {cost / base:.3f}")
```

```text
Hoffmann 2022
  C=1.00e+21  N*=1.824e+09 (grid 1.824e+09)  D*=9.136e+10  D*/N*= 50.1  L=2.3289
  C=5.76e+23  N*=3.219e+10 (grid 3.221e+10)  D*=2.982e+12  D*/N*= 92.6  L=1.9307
  C=1.00e+25  N*=1.168e+11 (grid 1.169e+11)  D*=1.427e+13  D*/N*=122.1  L=1.8453
Besiroglu 2024
  C=1.00e+21  N*=2.778e+09 (grid 2.780e+09)  D*=5.999e+10  D*/N*= 21.6  L=2.3083
  C=5.76e+23  N*=7.225e+10 (grid 7.228e+10)  D*=1.329e+12  D*/N*= 18.4  L=1.9772
  C=1.00e+25  N*=3.121e+11 (grid 3.119e+11)  D*=5.341e+12  D*/N*= 17.1  L=1.9145
target loss 2.0349 (Chinchilla-optimal at 1e23: N=2.94e+10, D=5.66e+11)
 D_inf     N         D_train    D/N    train FLOPs  infer FLOPs  total vs Chinchilla
   0e+00  2.945e+10  5.660e+11      19  1.000e+23    0.000e+00    1.000
   1e+12  1.966e+10  9.078e+11      46  1.071e+23    3.931e+22    0.921
   1e+13  1.136e+10  2.427e+12     214  1.655e+23    2.273e+23    0.570
   1e+14  7.465e+09  9.483e+12    1270  4.248e+23    1.493e+24    0.320
```

[[#thm-chinchilla]]的闭式解与暴力网格扫描在网格分辨率内一致。输出的后半在[[#sec-inference]]解释。

## 重新拟合 Chinchilla {#sec-refit}

Besiroglu、Erdil、Barnett 与 You（2024）从 Chinchilla 论文的一张图中提取数据点，重构了方法 3 背后的数据，并用同样的 Huber 目标重新拟合同一函数形式。他们报告：公布的参数对重构数据的拟合很差，报告的置信区间相对于运行次数窄得不可信，而他们的重新拟合 $E = 1.82$、$A = 482.01$、$B = 2085.43$、$\alpha = 0.3478$、$\beta = 0.3658$ 对数据拟合更好。重拟合后 $\alpha\approx\beta$，指数变为 $a = 0.513$、$b = 0.487$，最优点移到约每参数 $20$ 个词元，并随计算量缓慢下行（由上面的输出：$10^{21}$ 处 $21.6$，Chinchilla 预算处 $18.4$，$10^{25}$ 处 $17.1$）。三种方法于是彼此一致。

超越这些具体数字还有两点教训。拟合出的缩放定律参数可能很脆弱：五个参数、几百条带噪的运行、加上 $\delta$ 极小的稳健损失，优化器可能停在又长又平的谷地里互不相同的点上——$A$、$B$、$\alpha$、$\beta$ 在谷中彼此抵消，对数据的拟合却几乎不变。凡是依赖比值 $\alpha/\beta$ 或 $(B/A)^{1/\alpha}$ 的导出量，比如每参数词元数，都继承这份脆弱。而**每参数二十词元**这个数字，最好理解为方法 1 与 2 在 MassiveText 上用 Chinchilla 配方得到的经验结果——与重拟合的参数化定律一致——而不是一个能原样搬到别的数据、分词器或架构上的常数。后续研究发现计算最优比例大约在 $10$ 到 $100$ 之间，视这些细节而定；例如 Llama 3 报告（2024）拟合了自己的 IsoFLOP 剖面，在 $3.8\times10^{25}$ FLOPs 的预算下得到约 $4020$ 亿参数配 $16.55$ 万亿词元的最优点，约每参数 $41$ 个词元。

::: warning “Chinchilla 最优”不等于“最好的模型”
计算最优指的是给定**训练**预算下**训练**损失最低，仅此而已。它不管服务的成本——那随 $N$ 增长；它假设新鲜数据取之不尽；它对每单位推理成本的下游质量一无所知。2023 年以来大多数广泛使用的开放权重模型，都是有意按远超每参数 $20$ 词元训练的。说这样的模型“过度训练”，只是陈述它相对训练计算量最优点的位置，不是批评。
:::

## Kaplan 与 Chinchilla 为何相左 {#sec-why-differ}

Kaplan et al.（2020）得到 $N^\ast\propto C^{0.73}$；Hoffmann et al.（2022）得到 $N^\ast\propto C^{0.5}$。在 $10^{24}$ FLOPs 的预算下，两种法则预测的模型规模相差一个数量级以上，分歧必须有个说法。Hoffmann et al. 指向学习率调度：Kaplan et al. 只用一种调度长度，短的运行在学习率尚未衰减完时就被评测，惩罚了小的 $D$，使得大模型（达到同一损失所需词元更少）显得更好。后来的两项研究把原因量化了。

**Pearce 与 Song（2024）**把大部分差异归因于**数了什么**与**在什么尺度上**。Kaplan et al. 数的是非嵌入参数 $N_{\setminus E}$ 和不含嵌入的计算量，且他们的模型小（至多 $15$ 亿参数），此时嵌入矩阵占总量的很大份额。若真实定律用总参数 $N_T = N_{\setminus E} + \lvert\mathcal{V}\rvert d$ 表示是 Chinchilla 式的，那么把它改写成 $N_{\setminus E}$ 的表达式、再只在小模型上拟合幂律，局部指数会远大于 $0.5$、接近 Kaplan 的数字——因为在尺寸小的时候，$N_{\setminus E}$ 的变化只是 $N_T$ 的一次较小的相对变化。模型变大后嵌入变得无关紧要，局部指数便回落到 Chinchilla 的值。

::: example 嵌入有多大？ {#ex-embeddings}
词表 $50{,}257$ 个词元。比较小模型（$6$ 层、宽 $512$）与大模型（$80$ 层、宽 $8192$）中嵌入参数的份额：每块按 $12d^2$ 个参数计，外加一张 $\lvert\mathcal{V}\rvert\times d$ 的嵌入矩阵。在小模型里，若非嵌入参数量翻倍而嵌入矩阵不变，总量变为几倍？
::: solution
小模型：非嵌入 $12\cdot6\cdot512^2 = 1890$ 万，嵌入 $50{,}257\cdot512 = 2570$ 万，合计 $4460$ 万；嵌入占 $58\%$。大模型：非嵌入 $12\cdot80\cdot8192^2 = 644$ 亿，嵌入 $4.1$ 亿，占 $0.6\%$。小模型的非嵌入量翻倍使总量变为 $(3770 + 2570)/4460 = 1.42$ 倍——一个轴上的 $2$ 倍变化在另一个轴上只是 $1.42$ 倍（$2^{0.51}$）。因此，对总参数是干净幂律的定律，在 Kaplan et al. 工作的小尺寸范围内，用非嵌入参数表示的表观指数要陡得多；模型变大后这种畸变消失。
:::
:::

**Porian、Wortsman、Jitsev、Schmidt 与 Carmon（2024）**在两个数据集上复现了两种定律，并识别出三个因素：输出（unembedding）层的 FLOPs——Kaplan 的计算量记账漏掉了它，而它在小规模上很要紧；**预热**长度——Kaplan 的设定里它对小模型太长；以及**与尺度相关的优化器调参**——把学习率、批次大小和 Adam 的 $\beta_2$ 按模型大小分别调（小批次处较大的 $\beta_2$ 很重要）之后，Kaplan 式的运行就移向 Chinchilla 指数。修正这些之后，他们发现与 Hoffmann et al. 高度一致；他们还报告：仔细衰减的学习率对结果并不像早先的解释所说的那样板上钉钉。

更宽的教训就是[[scaling/scaling-laws#sec-practice]]里说过的那条：缩放定律的可靠性，不会超过其上每个点的调参和测量口径的一致性。小模型便宜，用一套配方批量训练很多个很诱人，但为一种尺寸调好的配方对别的尺寸系统性出错，而这个误差会变成指数里的偏。

::: widget plot
f: log10(2.89e9) + 0.5*(x - 21); log10(2.89e9) + 0.73*(x - 21)
x: 18, 26
y: 7, 13
labels: $N^\ast\propto C^{0.50}$ (Hoffmann et al.); $N^\ast\propto C^{0.73}$ (Kaplan et al.)
caption: 计算最优模型规模对计算量，两轴均取 $\log_{10}$，两条直线都过 $10^{21}$ FLOPs 处的同一点（$N^\ast = 2.9\times10^9$，即每参数 $20$ 词元的取值 $\sqrt{C/120}$）。由于这里只比较指数，绝对高度仅具示意性。横跨五个数量级的计算量，两种法则给出的 $N$ 相差超过一个数量级——GPT-3 与 Gopher 贴近上面那条线所预测的规模，Chinchilla 落在下面那条上。
:::

## 为推理而过度训练 {#sec-inference}

模型训练一次，之后可能要用它处理数万亿词元。每个生成或处理的词元在前向传播中约花 $2N$ FLOPs（[[scaling/flops-memory]]）。若模型生命周期内预计推理词元数为 $D_{\text{inf}}$，总计算量即 $6ND + 2ND_{\text{inf}}$，而问题不再是“哪个 $(N, D)$ 在给定训练预算下损失最低”，而是“哪个 $(N, D)$ 以最低总代价达到目标质量”。Sardana 与 Frankle（2024）正是以此形式提出问题的。

::: proposition 考虑推理的最优解 {#prop-inference}
对 $L(N, D) = E + AN^{-\alpha} + BD^{-\beta}$，在约束 $L(N, D) = \ell$ 下最小化 $6ND + 2ND_{\text{inf}}$。在最优点，

$$
\frac{AN^{-\alpha}}{BD^{-\beta}} = \frac{\beta}{\alpha}\left(1 + \frac{D_{\text{inf}}}{3D}\right).
$$ {#eq-inference-balance}

$D_{\text{inf}} = 0$ 时它就是 Chinchilla 平衡[[#eq-balance]]；$D_{\text{inf}} > 0$ 时参数项相对数据项必须更大，故最优模型比达到同一损失的 Chinchilla 最优模型更小、训练词元更多。
:::

::: proof
乘子为 $\mu$，$6ND + 2ND_{\text{inf}} - \mu\big(E + AN^{-\alpha} + BD^{-\beta} - \ell\big)$ 的驻点条件给出

$$
6D + 2D_{\text{inf}} = -\mu\alpha AN^{-\alpha-1},\qquad 6N = -\mu\beta BD^{-\beta-1}.
$$

第一式乘 $N$、第二式乘 $D$ 再相除：$\dfrac{(6D + 2D_{\text{inf}})N}{6ND} = \dfrac{\alpha AN^{-\alpha}}{\beta BD^{-\beta}}$，整理即[[#eq-inference-balance]]。沿约束固定两项之和时，增大比值 $AN^{-\alpha}/(BD^{-\beta})$ 意味着增大 $AN^{-\alpha}$（更小的 $N$）并减小 $BD^{-\beta}$（更大的 $D$）。
:::

程序的后半用重拟合定律数值解这个问题，目标取 Chinchilla 最优模型在 $10^{23}$ FLOPs 处的损失（$290$ 亿参数、$5660$ 亿词元）。预计推理 $10^{13}$ 词元时，最佳模型是 $110$ 亿参数、训 $2.4$ 万亿词元，每参数 $214$ 个；训练多花 $65\%$，总量却降到 Chinchilla 最优模型的 $57\%$。推理 $10^{14}$ 词元时，最优是 $75$ 亿参数、约每参数 $1300$ 词元的模型，总代价只有三分之一。

这正是 2023 年以来“小模型喂海量词元”潮流背后的经济逻辑：LLaMA 的 $70$ 亿参数模型喂 $1$ 万亿词元（2023），Llama 3 的 $80$ 亿参数模型喂约 $15$ 万亿词元、接近每参数 $1900$ 个（2024）；Llama 3 报告指出，训练停止时 $8$B 与 $70$B 模型的性能仍在按对数线性改善。Sardana 与 Frankle 把模型训练到远超 Chinchilla 比例，以检验参数化定律在那里仍描述损失，结果表明大体如此，但附有警告：极端比例下拟合定律的可靠性下降，预测的节省是外推。还有两笔成本朝同一方向推。小模型按词元的单位服务成本在 FLOPs 数之外还要低，因为解码受内存带宽以及每词元必须读取的权重与 KV 缓存字节数限制（[[scaling/accelerators]]）；而且它们占用的设备更少。

::: example 部署预算 {#ex-overtrain}
一个团队预计其模型生命周期要处理 $D_{\text{inf}} = 3\times10^{12}$ 词元。它在两个方案之间抉择：$N = 3\times10^{10}$ 个参数、训 $6\times10^{11}$ 词元；或 $N = 1.5\times10^{10}$、训 $1.6\times10^{12}$ 词元，两者损失大致相同。比较训练、推理与总 FLOPs。
::: solution
大模型：训练 $6\cdot3\times10^{10}\cdot6\times10^{11} = 1.08\times10^{23}$；推理 $2\cdot3\times10^{10}\cdot3\times10^{12} = 1.8\times10^{23}$；总计 $2.88\times10^{23}$。小模型：训练 $6\cdot1.5\times10^{10}\cdot1.6\times10^{12} = 1.44\times10^{23}$；推理 $9\times10^{22}$；总计 $2.34\times10^{23}$。小模型训练贵 $33\%$，总量省 $19\%$——而且更小的内存占用让服务更轻松。
:::
:::

## 数据受限下的缩放 {#sec-data-constrained}

Chinchilla 的分析假设每个词元都是新鲜的。计算量增大时，$D^\ast$ 也随之增大——大约随 $\sqrt C$——对最大的预算，高质量文本的供应成为约束（[[pretraining/training-data]]）。自然的对策是重复数据若干**轮次**（epoch）。一个重复的词元值多少？

Muennighoff、Rush、Barak、Le Scao、Piktus、Tazi、Pyysalo、Wolf 与 Raffel（2023）把模型训到至多 $90$ 亿参数、在语料子集上训到至多 $1500$ 轮次，并用一个替代 Chinchilla 式中 $D$ 的**有效数据**量来为重复建模。

::: definition 重复下的有效数据 {#def-effective-data}
$U_D$ 个不重复词元各看 $1 + R_D$ 遍（首轮之后重复 $R_D$ 次），**有效数据**为

$$
D' = U_D + U_DR_D^\ast\left(1 - e^{-R_D/R_D^\ast}\right),
$$ {#eq-effective-data}

其中 $R_D^\ast$ 是拟合常数（Muennighoff et al. 中 $R_D^\ast\approx15.4$）。另有带常数 $R_N^\ast\approx5.3$ 的类似表达式，描述参数量超出独有数据能支撑的程度后，其价值如何衰减。
:::

::: proposition 有效数据的性质 {#prop-effective-data}
设 $D = U_D(1 + R_D)$ 为实际处理的总词元数。则 $D'\le D$；$R_D\to0$ 时 $D'/D\to1$（新鲜词元一个个都算数）；$\partial D'/\partial R_D = U_De^{-R_D/R_D^\ast}$（每多一轮的价值按因子 $e^{-1/R_D^\ast}$、约 $6\%$ 递减）；$R_D\to\infty$ 时 $D'\to U_D(1 + R_D^\ast)$：多少重复也抵不上约 $16$ 轮新鲜数据。
:::

::: proof
由 $1 - e^{-x}\le x$（$x\ge0$），$U_DR_D^\ast(1 - e^{-R_D/R_D^\ast})\le U_DR_D$，故 $D'\le U_D + U_DR_D = D$；又 $1 - e^{-x}\sim x$，故 $R_D\to0$ 时比值趋于 $1$。对[[#eq-effective-data]]关于 $R_D$ 求导得 $U_DR_D^\ast\cdot e^{-R_D/R_D^\ast}/R_D^\ast = U_De^{-R_D/R_D^\ast}$，$R_D$ 每增加一单位就乘上 $e^{-1/R_D^\ast}$。$R_D\to\infty$ 时 $e^{-R_D/R_D^\ast}\to0$、$D'\to U_D(1 + R_D^\ast)$；取 $R_D^\ast = 15.4$ 即 $16.4\,U_D$。
:::

::: example 四轮还是四十轮？ {#ex-epochs}
语料有 $U_D = 5\times10^{11}$ 个不重复词元。$4$ 轮与 $40$ 轮之后的有效数据各是多少？两种情形下实际处理的词元中“相当于新鲜词元”的占多大比例？
::: solution
四轮：$R_D = 3$，$D' = U_D(1 + 15.4(1 - e^{-3/15.4})) = U_D(1 + 15.4\cdot0.177) = 3.73\,U_D = 1.86\times10^{12}$，而处理了 $2\times10^{12}$：$93\%$。四十轮：$R_D = 39$，$D' = U_D(1 + 15.4(1 - e^{-2.53})) = 15.2\,U_D = 7.6\times10^{12}$，而处理了 $2\times10^{13}$：$38\%$。Muennighoff et al. 报告：约四轮以内，损失与用新鲜数据训练几乎难分高下；超过约十六轮，再往重复上投计算的价值便迅速衰减趋零。
:::
:::

Muennighoff et al. 给出了实用结论。数据受限时，计算最优的对策是多训几轮**并且**把比 Chinchilla 建议稍少的量分给参数，因为并不存在的数据撑不起多出来的参数。用代码（他们发现代码可占训练数据的可观份额而不伤自然语言性能）和经过滤的数据补缺口都有用。后续工作研究合成数据与同义改写作为拉伸固定语料的其他办法（[[pretraining/data-mixtures]]）。

::: quiz
拟合得到 $\alpha = 0.30$、$\beta = 0.36$ 的缩放定律。由[[#thm-chinchilla]]，哪些说法成立？
- [x] $N^\ast$ 比 $\sqrt{C}$ 增长得快。
- [ ] 计算最优的每参数词元数随计算量增大。
- [x] 最优点处，受参数限制的项 $AN^{-\alpha}$ 是受数据限制项 $BD^{-\beta}$ 的 $1.2$ 倍。
- [ ] 最优比例为每参数 $20$ 个词元。
::: solution
$a = \beta/(\alpha + \beta) = 0.36/0.66 = 0.545 > 0.5$，故 $N^\ast$ 比 $\sqrt C$ 增长得快。比例按 $C^{(\alpha - \beta)/(\alpha + \beta)} = C^{-0.09}$ 变化，所以*缩小*。由[[#eq-balance]]，两项之比为 $\beta/\alpha = 1.2$。比例的具体数值取决于 $A$ 与 $B$，题中未给。
:::
:::

::: history
OpenAI 的 Kaplan et al.（2020）导出的计算效率分配偏向模型规模（$N^\ast\propto C^{0.73}$），塑造了 GPT-3（Brown et al., 2020）、Jurassic-1、Gopher（Rae et al., 2021）与 Megatron-Turing NLG（Smith et al., 2022）。DeepMind 的 Hoffmann et al.（2022）——论文《Training Compute-Optimal Large Language Models》，发表于 NeurIPS 2022——用三种方法表明参数量与词元数应同比例缩放，并训练 Chinchilla（$70$B 参数、$1.4$T 词元）以示范。LLaMA（Touvron et al., 2023）把“小模型按远超 Chinchilla 比例训练以求更廉价的推理”推广开来，这一选择由 Sardana 与 Frankle（2024）形式化，小模型方面的论证见 de Vries（2023）。Muennighoff et al.（2023）的重复研究获 NeurIPS 2023 杰出论文奖。Besiroglu et al.（2024）重拟合了方法 3；Pearce 与 Song（2024）以及 Porian et al.（2024）调和了 Kaplan 与 Chinchilla 的指数。
:::

::: summary
- 预算 $C = 6ND$ 下，**计算最优**的 $(N^\ast, D^\ast)$ 在约束上最小化损失；其上每个点都必须是调度与长度匹配的、单独调好的运行。
- Hoffmann et al.（2022）用了**训练曲线下包络**、**IsoFLOP 剖面**与**参数化拟合** $L = E + A/N^\alpha + B/D^\beta$；三者都发现 $N^\ast$ 与 $D^\ast$ 约按 $\sqrt C$ 增长，方法 1–2 给出约**每参数 $20$ 个词元**。
- **拉格朗日乘数**给出 $N^\ast = G(C/6)^{\beta/(\alpha+\beta)}$、$D^\ast = G^{-1}(C/6)^{\alpha/(\alpha+\beta)}$ 与平衡式 $AN^{-\alpha}/(BD^{-\beta}) = \beta/\alpha$；$D^\ast/N^\ast$ 仅在 $\alpha = \beta$ 时为常数。
- **公布**的拟合（$\alpha = 0.34$、$\beta = 0.28$）在 Chinchilla 预算下意味着约每参数 $93$ 个词元；Besiroglu et al.（2024）的**重拟合**给出约 $20$，与方法 1–2 一致。
- Kaplan 的指数偏大，主要源于在小规模上数**非嵌入**参数，以及**未调好**的调度、预热与优化器设置（Pearce & Song 2024；Porian et al. 2024）。
- 计入**推理**（每词元 $2N$ FLOPs）后，更小、训练更久的模型成为最优：$AN^{-\alpha}/(BD^{-\beta}) = (\beta/\alpha)(1 + D_{\text{inf}}/3D)$。
- **重复数据**约四轮以内的价值与新鲜数据相差无几，到约 $16$ 轮处饱和（Muennighoff et al., 2023）。
:::

## 习题

::: exercise 二十词元法则 {level=1 check="2.89e9"}
设计算最优模型每参数用 $20$ 个词元、$C = 6ND$，把 $N^\ast$ 用 $C$ 表示，并求 $C = 10^{21}$ FLOPs 处的值。保留三位有效数字。
::: solution
$D = 20N$ 给出 $C = 120N^2$，故 $N^\ast = \sqrt{C/120}$。$C = 10^{21}$ 时：$\sqrt{8.33\times10^{18}} = 2.89\times10^9$ 个参数，配 $5.77\times10^{10}$ 个词元。
:::
:::

::: exercise 预算放大 {level=1 check="3.16"}
按 $N^\ast\propto C^{0.5}$，计算量增大 $10$ 倍时模型应放大几倍？按 $N^\ast\propto C^{0.73}$ 呢？
::: solution
Chinchilla 指数下 $10^{0.5} = 3.16$；Kaplan 指数下 $10^{0.73} = 5.37$。后一种情形数据只按 $10^{0.27} = 1.86$ 增长。
:::
:::

::: exercise 由拟合读出指数 {level=1 check="0.513"}
对重拟合定律 $\alpha = 0.3478$、$\beta = 0.3658$，计算 $N^\ast\propto C^a$ 中的指数 $a$，保留三位小数。
::: solution
$a = \beta/(\alpha + \beta) = 0.3658/0.7136 = 0.513$，且 $b = 0.487$。
:::
:::

::: exercise Gopher 对阵 Chinchilla {level=2 check="0.046"}
用公布的拟合 $L = 1.69 + 406.4N^{-0.34} + 410.7D^{-0.28}$ 与 $C = 5.76\times10^{23}$，计算该预算下 $2800$ 亿参数与 $700$ 亿参数模型的预测损失差，保留三位小数。
::: solution
Gopher：$D = 3.43\times10^{11}$；$406.4/(2.8\times10^{11})^{0.34} = 406.4/7{,}799 = 0.0521$，$410.7/(3.43\times10^{11})^{0.28} = 410.7/1{,}698 = 0.2419$；$L = 1.9840$。Chinchilla：$D = 1.371\times10^{12}$；$406.4/(7\times10^{10})^{0.34} = 406.4/4{,}868 = 0.0835$，$410.7/(1.371\times10^{12})^{0.28} = 410.7/2{,}503 = 0.1641$；$L = 1.9376$。相差 $0.046$ 纳特每词元。
:::
:::

::: exercise 最优点的平衡 {level=2 check="0.824"}
用公布的拟合（$\alpha = 0.34$、$\beta = 0.28$），计算最优处受参数限制项与受数据限制项之比。保留三位小数。并用[[#ex-chinchilla]]中 $N^\ast = 3.22\times10^{10}$、$D^\ast = 2.98\times10^{12}$ 的数值验证。
::: solution
由[[#eq-balance]]，$\beta/\alpha = 0.28/0.34 = 0.824$。验证：$406.4/(3.22\times10^{10})^{0.34} = 406.4/3{,}738 = 0.1087$，$410.7/(2.98\times10^{12})^{0.28} = 410.7/3{,}111 = 0.1320$；比值 $0.823$，舍入误差内一致。
:::
:::

::: exercise 有效轮次 {level=2 check="6.63"}
取 $R_D^\ast = 15.4$，第 $8$ 轮结束时的有效数据（以 $U_D$ 为单位）是多少？保留两位小数。
::: solution
$R_D = 7$：$D'/U_D = 1 + 15.4(1 - e^{-7/15.4}) = 1 + 15.4(1 - 0.6347) = 1 + 5.63 = 6.63$，即 $8$ 轮的价值约为 $8$ 轮新鲜数据的 $83\%$。
:::
:::

::: exercise 推理何时反超？ {level=2 check="3"}
$N$ 个参数、训 $D$ 词元的模型，推理词元数达到 $D$ 的多少倍时推理计算量追平训练计算量？对 Chinchilla——$700$ 亿参数、$1.4$ 万亿词元——那是多少词元？
::: solution
$2ND_{\text{inf}} = 6ND$ 得 $D_{\text{inf}} = 3D$。Chinchilla 是 $4.2$ 万亿词元。一个流行的已部署模型几周就能处理这么多，这就是广为使用的模型里推理成本主导经济学的原因。
:::
:::

::: exercise 最优的平坦性 {level=2}
证明在约束 $6ND = C$ 上，损失作为 $u = \ln N$ 的函数在最优点的二阶导数为 $\alpha(\alpha + \beta)AN^{\ast-\alpha}$。用公布的拟合在 $C = 5.76\times10^{23}$ 处（此时 $AN^{\ast-\alpha} = 0.1087$）估计模型偏离 $N^\ast$ 两倍的损失代价。
::: solution
约束上 $L(u) = E + Ae^{-\alpha u} + B(C/6)^{-\beta}e^{\beta u}$，故 $L''(u) = \alpha^2Ae^{-\alpha u} + \beta^2B(C/6)^{-\beta}e^{\beta u} = \alpha^2AN^{-\alpha} + \beta^2BD^{-\beta}$。最优点处 $\beta BD^{-\beta} = \alpha AN^{-\alpha}$，故 $\beta^2BD^{-\beta} = \alpha\beta AN^{-\alpha}$，于是 $L'' = \alpha(\alpha + \beta)AN^{\ast-\alpha}$。数值上 $0.34\cdot0.62\cdot0.1087 = 0.0229$。两倍即 $\Delta u = \ln2 = 0.693$，代价约 $\tfrac12\cdot0.0229\cdot0.480 = 0.0055$ 纳特每词元——与[[#ex-chinchilla]]记录的平坦剖面吻合。最优点很浅：模型规模差两倍，代价很小。
:::
:::

::: exercise 闭式的考虑推理最优解 {level=3}
设 $\alpha = \beta$、目标损失 $\ell$ 固定。用[[#eq-inference-balance]]证明 $D_{\text{inf}}\gg D$ 时最优模型满足 $AN^{-\alpha}\approx\ell - E$（参数项几乎占尽可归约损失），并解释为何 $N$ 趋近其可能的最小规模时所需的 $D$ 随之发散。这对超大规模部署用极小模型意味着什么？
::: solution
$\alpha = \beta$ 时[[#eq-inference-balance]]给出 $AN^{-\alpha}/(BD^{-\alpha}) = 1 + D_{\text{inf}}/(3D)$。$D_{\text{inf}}\gg D$ 时右端很大，$BD^{-\alpha}$ 只是可归约损失 $\ell - E = AN^{-\alpha} + BD^{-\alpha}$ 的一小部分，故 $AN^{-\alpha}\approx\ell - E$。能触及 $\ell$ 的最小模型恰有 $AN_{\min}^{-\alpha} = \ell - E$，这要求 $BD^{-\alpha} = 0$，即 $D = \infty$。$N_{\min}$ 附近，$D = (B/(\ell - E - AN^{-\alpha}))^{1/\alpha}$ 发散。所以对海量部署，最优解趋近于能达到质量目标的最小模型、配以海量词元的训练；实践中，这个极限由可用数据（[[#sec-data-constrained]]）和定律在极端比例处的可靠性决定。
:::
:::

::: exercise 复现 IsoFLOP 极小点 {level=3}
写一个短程序：对 $C = 10^{22}$ FLOPs，在 $10^9$ 到 $10^{11}$ 之间按 $\log N$ 均匀取 $15$ 个模型规模求值 Besiroglu et al. 的重拟合定律，加上 $0.5\%$ 乘性高斯噪声（带种子），用最小二乘对 $\log_{10}N$ 拟合抛物线，报告估计的 $N^\ast$。与[[#thm-chinchilla]]的精确最优比较，并讨论噪声水平与规模范围如何影响方法 2。
::: solution
纯 Python 版通过解 $3\times3$ 正规方程组拟合 $y = c_0 + c_1u + c_2u^2$，然后报告 $u^\ast = -c_1/(2c_2)$：

```python
import math, random
random.seed(1)
E, A, B, al, be = 1.82, 482.01, 2085.43, 0.3478, 0.3658
C = 1e22
us = [9 + 2 * i / 14 for i in range(15)]                    # log10 N
ys = [(E + A / 10 ** (al * u) + B / (C / (6 * 10 ** u)) ** be)
      * math.exp(random.gauss(0, 0.005)) for u in us]
S = [[sum(u ** (i + j) for u in us) for j in range(3)] for i in range(3)]
t = [sum(y * u ** i for u, y in zip(us, ys)) for i in range(3)]
for i in range(3):                                          # 高斯-约当消元
    p = S[i][i]
    S[i] = [v / p for v in S[i]]; t[i] /= p
    for k in range(3):
        if k != i:
            m = S[k][i]
            S[k] = [a - m * b for a, b in zip(S[k], S[i])]; t[k] -= m * t[i]
c0, c1, c2 = t
G = (al * A / (be * B)) ** (1 / (al + be))
print(f"parabola N* = {10 ** (-c1 / (2 * c2)):.3e},"
      f"  exact N* = {G * (C / 6) ** (be / (al + be)):.3e}")
```

精确最优为 $G(C/6)^{0.513} = 9.0\times10^9$；种子 $1$ 下抛物线给出 $9.6\times10^9$，种子 $2$ 到 $4$ 给出 $9.6$、$9.1$ 与 $9.1\times10^9$——仅 $0.5\%$ 的损失噪声就带来高达约 $6\%$ 的误差。因为剖面在极小值附近很平（上一题），损失上的小噪声会让顶点挪动很多；规模范围取宽些能约束曲率，却让抛物线对真实、不对称剖面的近似变差。Hoffmann et al. 两手都缓解：每个预算用许多个规模，并在九个预算之间拟合幂律，让各个极小点的误差相互抵消。
:::
:::
