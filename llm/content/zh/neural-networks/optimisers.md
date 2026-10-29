反向传播给出梯度；拿它怎么办，由**优化器**决定。对深度网络来说，这个选择比[[math-for-ml/optimisation]]的凸理论所暗示的更重要。损失是非凸的，曲率在不同方向、不同层之间相差若干个数量级，梯度是小批量给出的带噪估计，而一个糟糕的步子就可能把训练送进再也回不来的区域。今天常用的优化器——许多视觉模型用带动量的 SGD，Transformer 用 Adam 与 AdamW——都是些简单规则，每条规则修补前一条的一个具体弱点，并且都配上一个与规则本身同样重要的**学习率调度**。

[[math-for-ml/optimisation]]定义了梯度下降及其在光滑函数上的收敛、随机梯度下降（[[math-for-ml/optimisation#def-sgd]]）、重球动量（[[math-for-ml/optimisation#def-momentum]]）以及 Adam 与 AdamW（[[math-for-ml/optimisation#alg-adam]]），并分析了那个解释学习率为何受最陡方向限制的二次模型。本章在这些定义之上继续，不再重复它们：讲 SGD 的噪声下限、动量的两种写法、从 AdaGrad 到 Adam 的自适应方法及其性质、解耦权重衰减为什么不同于 $\ell_2$ 惩罚、实践中使用的调度与预热、梯度裁剪，以及此后提出的东西。

## 实践中的随机梯度下降 {#sec-sgd}

深度网络用小批量训练。一个**轮次**（epoch）是对训练集完整过一遍。实践中数据会被打乱、切成一个个连续的小批量（在一个轮次内*无*放回抽样），它的性态像理论假设的独立抽样，而每个例子每个轮次恰好被访问一次。语言模型的预训练在数万亿词元的语料上大约只训练一个轮次，所以对它们来说每个批量都是新数据，这个区别也就消失了。

学习率恒定时，SGD 并不收敛到最小值点：一旦接近，梯度噪声会不停把它踢来踢去。对最小二乘，这个**噪声下限**的大小可以精确算出。

::: proposition SGD 在最小二乘上的噪声下限 {#prop-floor}
考虑输入 $\mathbf{x}\sim\Normal(\mathbf{0}, I_d)$、响应 $y = \mathbf{w}_\star^\top\mathbf{x} + \xi$ 的最小二乘，噪声 $\xi$ 均值为 $0$、方差为 $\sigma^2$，与 $\mathbf{x}$ 独立。批量大小为 $1$、学习率为常数 $\eta$ 的 SGD 每步在一个新例子上更新 $\mathbf{w}\leftarrow\mathbf{w} - \eta(\mathbf{w}^\top\mathbf{x} - y)\mathbf{x}$。若 $0 < \eta < 2/(d + 2)$，误差 $\mathbf{e}_t = \mathbf{w}_t - \mathbf{w}_\star$ 满足

$$
\E\lVert\mathbf{e}_t\rVert^2\to\frac{\eta\sigma^2d}{2 - \eta(d + 2)}\approx\frac{\eta\sigma^2d}{2}\quad(\eta\text{ 较小})。
$$ {#eq-floor}
:::

::: proof
残量为 $\mathbf{w}^\top\mathbf{x} - y = \mathbf{e}^\top\mathbf{x} - \xi$，故 $\mathbf{e}_{t+1} = (I - \eta\mathbf{x}\mathbf{x}^\top)\mathbf{e}_t + \eta\xi\mathbf{x}$。平方后对新鲜的 $(\mathbf{x}, \xi)$ 在给定 $\mathbf{e}_t$ 下取期望；交叉项消失，因为 $\E\xi = 0$ 且 $\xi$ 与 $\mathbf{x}$ 独立。对标准高斯的 $\mathbf{x}$，$\E[\mathbf{x}\mathbf{x}^\top] = I$，$\E[(\mathbf{x}^\top\mathbf{e})^2\lVert\mathbf{x}\rVert^2] = (d + 2)\lVert\mathbf{e}\rVert^2$（一个四阶矩恒等式：$\E x_i^4 = 3$，$i\ne j$ 时 $\E x_i^2x_j^2 = 1$），且 $\E\lVert\mathbf{x}\rVert^2 = d$。于是

$$
\E\big[\lVert\mathbf{e}_{t+1}\rVert^2\mid\mathbf{e}_t\big] = \lVert\mathbf{e}_t\rVert^2 - 2\eta\lVert\mathbf{e}_t\rVert^2 + \eta^2(d + 2)\lVert\mathbf{e}_t\rVert^2 + \eta^2\sigma^2d。
$$

记 $u_t = \E\lVert\mathbf{e}_t\rVert^2$，这就是 $u_{t+1} = (1 - 2\eta + \eta^2(d + 2))u_t + \eta^2\sigma^2d$，一个线性递推，当 $0 < \eta < 2/(d + 2)$ 时其系数落在 $(0, 1)$ 内。它收敛到不动点 $u = \eta^2\sigma^2d/(2\eta - \eta^2(d + 2))$，化简后即得[[#eq-floor]]。
:::

::: example 噪声下限的数值 {#ex-floor}
设 $d = 2$、$\sigma^2 = 1$，计算 $\eta = 0.1$ 与 $\eta = 0.01$ 的噪声下限，并估算各需要多少步才能从 $\E\lVert\mathbf{e}\rVert^2 = 5$ 降到下限的两倍以内。
::: solution
由[[#eq-floor]]，$\eta = 0.1$ 给出 $0.2/(2 - 0.4) = 0.125$，$\eta = 0.01$ 给出 $0.02/1.96 = 0.0102$。证明中的递推每步把超出量 $u_t - u_\infty$ 收缩 $1 - 2\eta + 4\eta^2$：$\eta = 0.1$ 时为 $0.84$，$\eta = 0.01$ 时为 $0.9804$。要把超出量从约 $5$ 缩到下限的量级，大学习率需要 $\ln(0.125/5)/\ln0.84\approx21$ 步，小学习率需要 $\ln(0.0102/5)/\ln0.9804\approx313$ 步。大学习率快十五倍，终点却高十倍：这正是调度来解决的取舍。[[#sec-code]]中的实验测得的下限为 $0.12$–$0.15$ 与 $0.009$–$0.012$。
:::
:::

下限与学习率、与噪声成正比。学习率大，前期进展快，然后停在高位；学习率小，下限低，但很久才到。**衰减学习率**两头都能占：离得远时迈大步，收尾时迈小步。这就是[[math-for-ml/optimisation#sec-sgd]]中 Robbins–Monro 条件的实践内容，也是每一次正经训练都用调度的原因（见[[#sec-schedules]]）。把批量大小 $B$ 增大，梯度噪声方差除以 $B$，对下限的作用在一阶近似下与把 $\eta$ 除以 $B$ 相同——学习率随批量缩放的直觉就在这里。

## 动量 {#sec-momentum}

各库写动量的方式与教科书的重球法不同。PyTorch 的 `torch.optim.SGD(momentum=β)` 更新为

$$
\mathbf{b}_t = \beta\mathbf{b}_{t-1} + \mathbf{g}_t,\qquad\theta_t = \theta_{t-1} - \eta\,\mathbf{b}_t,
$$ {#eq-torch-momentum}

即把原始梯度累计进缓冲区 $\mathbf{b}$，最后才乘 $\eta$。

::: proposition 动量的两种形式等价 {#prop-momentum-forms}
学习率恒定时，[[#eq-torch-momentum]]产生的迭代点与[[math-for-ml/optimisation#def-momentum]]的重球更新 $\mathbf{v}_t = \beta\mathbf{v}_{t-1} - \eta\mathbf{g}_t$、$\theta_t = \theta_{t-1} + \mathbf{v}_t$ 完全相同。展开看，步子是过去梯度的加权和，

$$
\theta_t - \theta_{t-1} = -\eta\sum_{s=1}^t\beta^{t-s}\mathbf{g}_s,
$$

其权重之和不超过 $1/(1 - \beta)$：梯度恒定时，有效学习率趋于 $\eta/(1 - \beta)$。
:::

::: proof
令 $\mathbf{v}_t = -\eta\mathbf{b}_t$。把缓冲区的递推乘以 $-\eta$ 得 $\mathbf{v}_t = \beta\mathbf{v}_{t-1} - \eta\mathbf{g}_t$，且 $\theta_t = \theta_{t-1} - \eta\mathbf{b}_t = \theta_{t-1} + \mathbf{v}_t$。从 $\mathbf{b}_0 = \mathbf{0}$ 展开 $\mathbf{b}_t = \sum_{s\le t}\beta^{t-s}\mathbf{g}_s$ 即得这个和，且 $\sum_{s\le t}\beta^{t-s} = (1 - \beta^t)/(1 - \beta) < 1/(1 - \beta)$。
:::

::: example 动量既放大又抵消 {#ex-momentum}
设 $\beta = 0.9$，求[[#eq-torch-momentum]]的缓冲区 $\mathbf{b}_t$ 在恒定梯度 $g_t = 1$ 下的长期取值，以及在交替梯度 $g_t = (-1)^t$ 下的取值。
::: solution
梯度恒定时，$b_t = \sum_{k=0}^{t-1}0.9^k\to10$：步子是一般梯度步的十倍。梯度交替时，$b_t = (-1)^t\sum_{k=0}^{t-1}(-0.9)^k\to(-1)^t/(1 + 0.9)$，大小为 $0.526$：约为一般步子的一半。方向一致方向的放大倍数与振荡方向的放大倍数之比是 $(1 + \beta)/(1 - \beta) = 19$。在狭谷里，横跨谷的梯度每步翻一次符号、沿谷的梯度稳定不变，这个比值正是把之字形折返变成前进的东西。
:::
:::

训练中途学习率变化时，两种形式就有差别了：[[#eq-torch-momentum]]里新的学习率立刻作用到整个已累积的缓冲区，重球形式只作用到新梯度。$\beta = 0.9$ 时有效学习率是 $\eta$ 的十倍，所以不降低 $\eta$ 就打开动量，常常导致发散。

**Nesterov 动量**在动量即将把参数送到的那个点处求梯度：$\mathbf{v}_t = \beta\mathbf{v}_{t-1} - \eta\nabla f(\theta_{t-1} + \beta\mathbf{v}_{t-1})$，$\theta_t = \theta_{t-1} + \mathbf{v}_t$。往前看一步，就能提前一步纠正过冲；在光滑凸函数上它达到最优的加速速率（Nesterov，1983），而 Sutskever、Martens、Dahl 与 Hinton（2013）表明，动量——连同 Nesterov 变体和选得好的初始化——就足以训练那些曾被认为需要二阶方法的深网络和循环网络。

::: widget gradientdescent
f: (1 - x)^2 + 100*(y - x^2)^2
start: -1.2, 1
rate: 0.001
steps: 200
method: momentum
x: -2, 2
y: -1, 3
caption: Rosenbrock 函数 $(1 - x)^2 + 100(y - x^2)^2$，其极小值点 $(1, 1)$ 位于一条长而弯曲的谷底。普通梯度下降（可切换方法）需要把学习率压到约 $0.0015$（起点处最大曲率的二倍）以下，才不会从两侧陡峭的谷壁上弹出去，然后只能贴着谷底缓慢爬行；动量则沿谷底积累速度，同时横跨谷底的振荡相互抵消。调大学习率，看看每种方法在哪里失稳。
:::

## 自适应方法 {#sec-adaptive}

动量解决了依赖方向的振荡，但一个学习率仍要适合所有参数。在深网络里这是货真价实的限制：稀有词元对应嵌入行的梯度又小又不经常出现，归一化增益的梯度很大，尺度还逐层不同。**自适应**方法给每个参数自己的步长，与其梯度的典型大小成反比。

::: definition AdaGrad 与 RMSProp {#def-adagrad}
所有运算逐元素进行，$\epsilon > 0$ 很小：

- **AdaGrad**（Duchi、Hazan 与 Singer，2011）累积梯度平方，$\mathbf{r}_t = \mathbf{r}_{t-1} + \mathbf{g}_t^2$，更新为 $\theta_t = \theta_{t-1} - \eta\,\mathbf{g}_t/(\sqrt{\mathbf{r}_t} + \epsilon)$。
- **RMSProp**（Tieleman 与 Hinton，2012，出自 Hinton 的 Coursera 课程）把和换成指数滑动平均，$\mathbf{r}_t = \rho\mathbf{r}_{t-1} + (1 - \rho)\mathbf{g}_t^2$，更新式不变。
:::

AdaGrad 的累积和只增不减，所以步长像 $1/\sqrt t$ 那样衰减——对有稀疏特征的凸问题很合适（它有强力的 regret 保证），但对漫长的非凸训练衰减太狠，会停止学习。RMSProp 以约 $1/(1 - \rho)$ 步的时间常数遗忘旧梯度，于是步长追踪的是*最近*的梯度尺度。Adam（[[math-for-ml/optimisation#alg-adam]]）就是在 RMSProp 的分子上加动量、并对两个平均都作偏差校正。

::: proposition Adam 更新的性质 {#prop-adam}
设 $\mathbf{m}_t$ 与 $\mathbf{v}_t$ 是 Adam 的滑动平均，$\mathbf{m}_0 = \mathbf{v}_0 = \mathbf{0}$。

1. （*偏差校正。*）若梯度 $\mathbf{g}_1, \dots, \mathbf{g}_t$ 都有相同的均值 $\boldsymbol{\mu}$ 和相同的二阶矩 $\mathbf{s} = \E\mathbf{g}^2$，则 $\E\mathbf{m}_t = (1 - \beta_1^t)\boldsymbol{\mu}$，$\E\mathbf{v}_t = (1 - \beta_2^t)\mathbf{s}$，于是 $\hat{\mathbf{m}}_t$ 与 $\hat{\mathbf{v}}_t$ 是无偏的。
2. （*尺度不变性。*）$\epsilon = 0$ 时，把所有梯度乘以常数 $c > 0$——或把某个坐标的梯度乘以它自己的常数——更新不变。
3. （*符号下降作为极限。*）$\beta_1 = \beta_2 = 0$ 且 $\epsilon = 0$ 时，更新为 $-\eta\operatorname{sign}(\mathbf{g}_t)$。
:::

::: proof
(1) 展开得 $\mathbf{m}_t = (1 - \beta_1)\sum_{s=1}^t\beta_1^{t-s}\mathbf{g}_s$，故 $\E\mathbf{m}_t = (1 - \beta_1)\boldsymbol{\mu}\sum_{k=0}^{t-1}\beta_1^k = (1 - \beta_1^t)\boldsymbol{\mu}$；把同样的计算用于 $\mathbf{g}_s^2$ 得 $\E\mathbf{v}_t$。除以 $1 - \beta^t$ 就消去该因子。(2) 把 $\mathbf{g}_s$ 换成 $c\mathbf{g}_s$，$\mathbf{m}_t$ 与 $\hat{\mathbf{m}}_t$ 乘以 $c$，$\mathbf{v}_t$ 乘以 $c^2$，于是 $\sqrt{\hat{\mathbf{v}}_t}$ 乘以 $c$，比值 $\hat{\mathbf{m}}_t/\sqrt{\hat{\mathbf{v}}_t}$ 不变；逐坐标同样成立。(3) 此时 $\hat{\mathbf{m}}_t = \mathbf{g}_t$，$\sqrt{\hat{\mathbf{v}}_t} = \lvert\mathbf{g}_t\rvert$，二者之比即符号。
:::

偏差校正最重要的地方是开头：不加校正，开头几百步里 $\mathbf{v}_t$（$\beta_2 = 0.999$）几乎为零，步子会过大。尺度不变性意味着 Adam 的步长由 $\eta$ 和每个坐标梯度的*信噪比*决定——梯度方向一致时接近 $\eta$，符号来回摇摆时小得多——而不由其原始尺度决定。这就是为什么 Adam 的学习率（语言模型取 $10^{-4}$ 到 $10^{-3}$）与 SGD 的没有可比性，也是为什么 Adam 对层间梯度尺度差异远不那么敏感。但它对参数空间的旋转并不不变，也不会自动把病态问题变成良态问题。

::: example 手算两步 AdamW {#ex-adamw}
用 AdamW 从 $\theta_0 = 1$ 出发极小化 $f(\theta) = \theta^2$，$\eta = 0.1$，$\beta_1 = 0.9$，$\beta_2 = 0.999$，$\epsilon = 0$，权重衰减 $\lambda = 0.01$。计算 $\theta_1$ 与 $\theta_2$。
::: solution
**第 1 步。** $g_1 = 2\theta_0 = 2$；$m_1 = 0.1\cdot2 = 0.2$，$v_1 = 0.001\cdot4 = 0.004$；偏差校正后 $\hat m_1 = 0.2/0.1 = 2$，$\hat v_1 = 0.004/0.001 = 4$。更新量为 $\eta(\hat m_1/\sqrt{\hat v_1} + \lambda\theta_0) = 0.1(1 + 0.01) = 0.101$，故 $\theta_1 = 0.899$。

**第 2 步。** $g_2 = 1.798$；$m_2 = 0.9\cdot0.2 + 0.1\cdot1.798 = 0.3598$，$\hat m_2 = 0.3598/0.19 = 1.89368$；$v_2 = 0.999\cdot0.004 + 0.001\cdot1.798^2 = 0.0072288$，$\hat v_2 = 0.0072288/0.001999 = 3.61621$，$\sqrt{\hat v_2} = 1.90163$。更新量为 $0.1(1.89368/1.90163 + 0.01\cdot0.899) = 0.1(0.99582 + 0.00899) = 0.10048$，故 $\theta_2 = 0.79852$。

两步的大小都约为 $\eta$，尽管梯度缩小了 $10\%$：只要梯度保持符号，Adam 就以大致恒定的速度移动。接近极小值时梯度开始变号，$\hat m$ 相对于 $\sqrt{\hat v}$ 变小，步子随之变小。
:::
:::

### 自适应方法中的权重衰减 {#sec-adamw}

对普通 SGD，在损失中加入 $\ell_2$ 惩罚 $\frac\lambda2\lVert\theta\rVert^2$ 与每步把权重乘以 $1 - \eta\lambda$ 是同一回事（[[ml-fundamentals/regularisation#prop-decay]]）。对自适应方法则不是。

::: proposition 在 Adam 下 $\ell_2$ 惩罚不是权重衰减 {#prop-decoupled}
设 Adam 的预处理子已趋于稳定值 $\sqrt{\hat{\mathbf{v}}}$，忽略动量（$\beta_1 = 0$）与 $\epsilon$。在损失中加入 $\frac\lambda2\lVert\theta\rVert^2$ 后，除了损失梯度的那一步，坐标 $i$ 每步还额外乘以 $1 - \eta\lambda/\sqrt{\hat v_i}$。解耦权重衰减（AdamW）则让每个坐标都乘以同一个因子 $1 - \eta\lambda$。
:::

::: proof
加惩罚时，喂给 Adam 的梯度是 $\mathbf{g} + \lambda\theta$，更新为 $-\eta(\mathbf{g} + \lambda\theta)/\sqrt{\hat{\mathbf{v}}}$，其第 $i$ 个分量拆成 $-\eta g_i/\sqrt{\hat v_i}$ 与 $-\eta\lambda\theta_i/\sqrt{\hat v_i}$；第二项把 $\theta_i$ 乘以 $1 - \eta\lambda/\sqrt{\hat v_i}$。AdamW 在除法之外加上 $-\eta\lambda\theta_i$，对每个 $i$ 都是因子 $1 - \eta\lambda$。
:::

在耦合的 $\ell_2$ 形式下，梯度历史大或噪声大的权重（$\hat v_i$ 大）几乎正则化不到，梯度很小的权重反而被狠狠衰减——这与惩罚本应表达的先验“所有权重同样可能很小”正好相反。Loshchilov 与 Hutter（2019）表明解耦恢复了权重衰减对 Adam 的好处，AdamW 从此成为 Transformer 的标准优化器。注意各框架对 $\lambda$ 是否乘以当前的 $\eta$ 并不一致（PyTorch 的 `AdamW` 乘以学习率，与[[math-for-ml/optimisation#alg-adam]]一致）——在不同代码库之间照搬超参数时，这是个要留意的细节。权重衰减通常不用于偏置与归一化增益。

::: quiz
一个模型用 Adam 训练，并在损失中加入 $\ell_2$ 惩罚 $\frac\lambda2\lVert\theta\rVert^2$。哪些参数受到的正则化*最弱*？
- [ ] 梯度最小的那些
- [x] 梯度典型大小最大的那些
- [ ] 所有参数一样，与 SGD 相同
- [ ] 只有偏置
::: solution
由[[#prop-decoupled]]，惩罚对坐标 $i$ 的收缩除以了 $\sqrt{\hat v_i}$——其梯度的均方根——所以梯度大的参数被收缩得最少。AdamW 把衰减放在自适应缩放之外，避免了这一点。
:::
:::

## 学习率调度 {#sec-schedules}

几乎没有深度网络是在恒定学习率下训练的。调度 $\eta_t$ 把一个峰值学习率 $\eta_{\max}$ 乘上一个开头上升、结尾下降的形状。

::: definition 常用学习率调度 {#def-schedules}
设 $T$ 为总步数，$T_w$ 为预热步数。

- **线性预热**：$t\le T_w$ 时 $\eta_t = \eta_{\max}\,t/T_w$。
- 预热之后的**余弦衰减**（Loshchilov 与 Hutter，2017）：$\eta_t = \eta_{\min} + \frac12(\eta_{\max} - \eta_{\min})\big(1 + \cos(\pi\frac{t - T_w}{T - T_w})\big)$。
- **阶梯衰减**：在固定的轮次把 $\eta$ 乘上一个因子（常取 $0.1$），如最初残差网络的训练。
- **反平方根**（Vaswani 等，2017）：$\eta_t\propto\min\big(t^{-1/2}, t\,T_w^{-3/2}\big)$，即线性预热后按 $1/\sqrt t$ 衰减。
- **预热–恒定–衰减（WSD）**：预热后把 $\eta_{\max}$ 恒定保持到训练的大部分时间，最后一段（约占总步数的 $10$–$20\%$）快速衰减（线性或其他形状）（Hu 等，2024；Hägele 等，2024）。
:::

::: widget plot
f: max(0, min(x/w, 0.1 + 0.45*(1 + cos(pi*(x - w)/(100 - w))))); max(0, min(x/w, 1, 0.1 + 0.9*(100 - x)/20))
x: 0, 100
y: 0, 1.1
sliders: w=5:1:30:1
labels: warm-up then cosine to $10\%$; warm-up–stable–decay
caption: 在 $100$（千）步上的两种调度，以 $\eta_{\max}$ 的分数表示，预热 $w$ 步。余弦调度在预热结束后立刻开始衰减；WSD 把峰值保持到最后 $20\%$ 才线性衰减。WSD 的运行可以在任意时刻停下并转入衰减，所以在最终训练长度事先不固定时很方便。
:::

这个形状由[[#prop-floor]]决定：高学习率出进展，低学习率落进好点，所以训练把大部分时间花在高处、在低处收尾。衰减的收尾通常带来损失的急剧下降，在 WSD 的运行里表现为衰减段开始时的一道悬崖。

**预热**很难从第一性原理论证，它的好处是经验确立的。初始化时损失的曲率可能远高于训练中途，所以后期安全的学习率开头可能不稳定；Adam 的二阶矩估计早期样本太少，步子不稳（Liu 等，2020）；Goyal 等（2017）发现，用非常大的批量和相应很大的学习率训练时，平缓的预热必不可少。Post-norm 的 Transformer 尤其依赖预热（[[transformers/transformer-block#sec-residual]]）。当前的语言模型配方里，预热从几百到几千步。

::: example 调度的数值 {#ex-schedule}
一次 $T = 100{,}000$ 步的训练用 $\eta_{\max} = 3\times10^{-4}$、$T_w = 2{,}000$ 步预热、余弦衰减到 $\eta_{\min} = 0.1\,\eta_{\max}$，与 LLaMA 报告的调度相同（Touvron 等，2023）。求第 $1{,}000$、$2{,}000$、$51{,}000$、$100{,}000$ 步的 $\eta$。
::: solution
第 $1{,}000$ 步在预热正中间：$\eta = 3\times10^{-4}\cdot0.5 = 1.5\times10^{-4}$。第 $2{,}000$ 步：峰值 $3\times10^{-4}$。第 $51{,}000$ 步：$(t - T_w)/(T - T_w) = 49{,}000/98{,}000 = \frac12$，故 $\cos(\pi/2) = 0$，$\eta = \eta_{\min} + \frac12(\eta_{\max} - \eta_{\min}) = 3\times10^{-5} + 1.35\times10^{-4} = 1.65\times10^{-4}$。第 $100{,}000$ 步：$\cos\pi = -1$，$\eta = \eta_{\min} = 3\times10^{-5}$。
:::
:::

## 梯度裁剪 {#sec-clipping}

偶尔有一个批量产生的梯度远大于寻常——一次不走运的批量、一个高曲率区域、一个长得过大的注意力 logit。这样一步就能毁掉几小时的训练。**裁剪**给步子设上限。

::: definition 按全局范数裁剪梯度 {#def-clipping}
给定完整梯度 $\mathbf{g}$（所有参数拼接）与阈值 $c > 0$，作替换

$$
\mathbf{g}\leftarrow\mathbf{g}\cdot\min\Big(1, \frac{c}{\lVert\mathbf{g}\rVert}\Big)。
$$
:::

裁剪后的梯度方向不变、范数至多 $c$；本来就不超过 $c$ 的梯度原样不动。按*全局*范数裁剪保持了不同层梯度之间的相对大小，逐坐标裁剪则不然。它最初是为循环网络引入的——长序列上其梯度会爆炸（Pascanu、Mikolov 与 Bengio，2013）——如今是 Transformer 的标准配置：GPT-3（Brown 等，2020）与 LLaMA（Touvron 等，2023）都报告用 AdamW、$\beta_1 = 0.9$、$\beta_2 = 0.95$、权重衰减 $0.1$，并把全局范数裁剪到 $1.0$。每步记录的梯度范数也是诊断一次训练最有用的信号之一（[[neural-networks/training-practice]]）。

::: warning 学习率不可照搬
学习率只有与优化器、批量大小、调度、初始化和模型宽度放在一起才有意义。Adam 的 $3\times10^{-4}$ 与 SGD 的 $0.1$ 对各自的优化器都是合理的取值；对调就是灾难。批量翻倍通常要求更大的学习率（对 SGD 大致成比例，直到某个上限）；网络加宽通常要求其隐藏层的学习率变小。$\mu$P（Yang 等，2021）这类参数化正是为了让最佳学习率随宽度增长而近似不变设计的（[[scaling]]）。复用已发表的配方时，一次只改一个东西，并且先重新调学习率。
:::

## 比较各优化器 {#sec-code}

下面的清单在 Rosenbrock 函数上从标准起点 $(-1.2, 1)$ 运行各种方法，各自取对它大致稳定的最大学习率附近的一个学习率；然后在带噪最小二乘（$d = 2$，$\sigma^2 = 1$，批量大小 $1$）上展示 SGD 的噪声下限与调度的效果。

```python
import math, random

def rosenbrock(p):                        # f(x, y) = (1 - x)^2 + 100 (y - x^2)^2，极小值点 (1, 1)
    x, y = p
    f = (1 - x) ** 2 + 100 * (y - x * x) ** 2
    g = [-2 * (1 - x) - 400 * x * (y - x * x), 200 * (y - x * x)]
    return f, g

def sgd(lr):
    def step(p, g, s):
        return [pi - lr * gi for pi, gi in zip(p, g)]
    return step

def momentum(lr, beta=0.9):               # PyTorch 形式：v <- beta v + g；p <- p - lr v
    def step(p, g, s):
        s.setdefault("v", [0.0] * len(p))
        s["v"] = [beta * vi + gi for vi, gi in zip(s["v"], g)]
        return [pi - lr * vi for pi, vi in zip(p, s["v"])]
    return step

def rmsprop(lr, rho=0.9, eps=1e-8):
    def step(p, g, s):
        s.setdefault("r", [0.0] * len(p))
        s["r"] = [rho * ri + (1 - rho) * gi * gi for ri, gi in zip(s["r"], g)]
        return [pi - lr * gi / (math.sqrt(ri) + eps) for pi, gi, ri in zip(p, g, s["r"])]
    return step

def adam(lr, b1=0.9, b2=0.999, eps=1e-8, wd=0.0):   # wd > 0：解耦衰减（AdamW）
    def step(p, g, s):
        t = s["t"] = s.get("t", 0) + 1
        s.setdefault("m", [0.0] * len(p)); s.setdefault("v", [0.0] * len(p))
        s["m"] = [b1 * mi + (1 - b1) * gi for mi, gi in zip(s["m"], g)]
        s["v"] = [b2 * vi + (1 - b2) * gi * gi for vi, gi in zip(s["v"], g)]
        mh = [mi / (1 - b1 ** t) for mi in s["m"]]
        vh = [vi / (1 - b2 ** t) for vi in s["v"]]
        return [pi - lr * (mi / (math.sqrt(vi) + eps) + wd * pi) for pi, mi, vi in zip(p, mh, vh)]
    return step

print("Rosenbrock from (-1.2, 1):")
for name, opt in [("gradient descent  lr=1e-3", sgd(1e-3)),
                  ("momentum 0.9      lr=1e-3", momentum(1e-3)),
                  ("RMSProp           lr=1e-2", rmsprop(1e-2)),
                  ("Adam              lr=1e-2", adam(1e-2))]:
    p, s = [-1.2, 1.0], {}
    out = []
    for t in range(1, 5001):
        f, g = rosenbrock(p)
        p = opt(p, g, s)
        if t in (100, 1000, 5000):
            out.append(f"{rosenbrock(p)[0]:.2e}")
    print(f"  {name}  f after 100/1000/5000 steps: {' / '.join(out)}   end ({p[0]:.3f}, {p[1]:.3f})")

# 随机梯度：带噪数据上的最小二乘，恒定学习率 vs 衰减学习率
rng = random.Random(0)
data = []
for _ in range(1000):
    x = [rng.gauss(0, 1), rng.gauss(0, 1)]
    data.append((x, 2.0 * x[0] - 1.0 * x[1] + rng.gauss(0, 1)))
# 经验最小二乘解 w_hat，由 2x2 正规方程解出
a = sum(x[0] * x[0] for x, _ in data); b = sum(x[0] * x[1] for x, _ in data)
d = sum(x[1] * x[1] for x, _ in data)
c0 = sum(x[0] * y for x, y in data); c1 = sum(x[1] * y for x, y in data)
det = a * d - b * b
w_hat = [(d * c0 - b * c1) / det, (a * c1 - b * c0) / det]
print("SGD with batch size 1 on noisy least squares;")
print("mean |w - w_hat|^2 over steps 1-1000 / 4001-5000 / 19001-20000:")
for name, sched in [("constant lr 0.1      ", lambda t: 0.1),
                    ("constant lr 0.01     ", lambda t: 0.01),
                    ("lr 0.1 cosine to zero", lambda t: 0.05 * (1 + math.cos(math.pi * t / 20000)))]:
    w = [0.0, 0.0]; acc = 0.0; out = []
    for t in range(1, 20001):
        x, y = data[rng.randrange(len(data))]
        r = w[0] * x[0] + w[1] * x[1] - y
        lr = sched(t)
        w = [w[0] - lr * r * x[0], w[1] - lr * r * x[1]]
        acc += (w[0] - w_hat[0]) ** 2 + (w[1] - w_hat[1]) ** 2
        if t % 1000 == 0:
            if t in (1000, 5000, 20000):
                out.append(f"{acc / 1000:.1e}")
            acc = 0.0
    print(f"  {name}  {' / '.join(out)}")
```

```text
Rosenbrock from (-1.2, 1):
  gradient descent  lr=1e-3  f after 100/1000/5000 steps: 3.80e+00 / 4.54e-01 / 3.76e-03   end (0.939, 0.881)
  momentum 0.9      lr=1e-3  f after 100/1000/5000 steps: 1.43e-01 / 2.51e-05 / 8.82e-20   end (1.000, 1.000)
  RMSProp           lr=1e-2  f after 100/1000/5000 steps: 3.48e+00 / 3.58e-02 / 2.22e-02   end (0.989, 0.963)
  Adam              lr=1e-2  f after 100/1000/5000 steps: 4.18e+00 / 1.25e+00 / 4.72e-10   end (1.000, 1.000)
SGD with batch size 1 on noisy least squares;
mean |w - w_hat|^2 over steps 1-1000 / 4001-5000 / 19001-20000:
  constant lr 0.1        1.4e-01 / 1.2e-01 / 1.5e-01
  constant lr 0.01       2.1e-01 / 8.8e-03 / 1.2e-02
  lr 0.1 cosine to zero  1.6e-01 / 9.9e-02 / 1.1e-03
```

在 Rosenbrock 狭谷上，这个学习率下动量是明显的赢家；普通梯度下降 $5{,}000$ 步后仍在谷底爬动。RMSProp 没有动量、学习率恒定，最后不是在收敛，而是在极小值附近来回弹跳——自适应方法无论梯度多大都以约为 $\eta$ 的速度移动，所以必须有衰减的学习率才能落定。Adam 的动量把这些弹跳平均掉了。在随机问题上看，恒定学习率的运行停在[[#eq-floor]]预言的下限上——$0.1\cdot2/(2 - 0.4) = 0.125$ 与 $0.01\cdot2/(2 - 0.04) = 0.0102$——而余弦调度用大学习率快速开头，终点比小的恒定学习率低十倍。不存在跨问题都成立的优化器排序；这些玩具结果说明的是机制，不是一般性能。

## Adam 之后 {#sec-beyond}

Adam 每个参数要多存两个数——对 $7\times10^9$ 参数的模型，以 32 位浮点算是 $56$ GB 的优化器状态（[[math-for-ml/optimisation#ex-adam]]）。多条工作线试图削减这份内存，或改进 Adam 的对角预处理。截至 2026 年，记录最充分的包括：

- **Adafactor**（Shazeer 与 Stern，2018）以因子形式存放权重矩阵的二阶矩：行一个向量、列一个向量，把每个矩阵的内存从 $mn$ 个数降到 $m + n$ 个；它被用于训练 T5。
- **Lion**（Chen 等，2023）由自动程序搜索找到，按动量与梯度插值的*符号*更新，于是每个坐标都正好移动 $\eta$；它只存动量。
- **Shampoo**（Gupta、Koren 与 Singer，2018）及其后续工作对每个权重矩阵，用其行与列的累积梯度统计的矩阵根做预处理，是全矩阵 AdaGrad 的结构化近似；SOAP（Vyas 等，2024）在 Shampoo 的特征基下运行 Adam。
- **Muon**（Jordan 等，2024）把每个隐藏权重矩阵的动量矩阵换成近似正交化的版本（用几次 Newton–Schulz 迭代算出），使其所有奇异方向迈同样大小的步；Liu 等（2025）报告把它放大到了大语言模型的训练。

相对于调优良好的 AdamW 基线的改进主张，在仔细复评后往往缩水，因为基线的超参数与优化器本身一样要紧。AdamW 配上预热、余弦或 WSD 衰减、范数 $1$ 处裁剪、权重衰减约 $0.1$，仍是多数已发表语言模型配方的默认选择。

::: history
随机逼近始于 Herbert Robbins 与 Sutton Monro（1951）。Boris Polyak 于 1964 年提出重球法，Yurii Nesterov 于 1983 年提出他的加速梯度。神经网络从一开始就用 SGD 与动量训练：Rumelhart、Hinton 与 Williams（1986）就用了动量项。逐参数的自适应步长来自在线凸优化中的 AdaGrad（Duchi、Hazan 与 Singer，2011）；Matthew Zeiler 的 AdaDelta（2012）与 Tijmen Tieleman、Geoffrey Hinton 的 RMSProp（2012）把它改造用于非凸训练。Diederik Kingma 与 Jimmy Ba 的 Adam（arXiv 2014，ICLR 2015）把动量与 RMSProp 式缩放和偏差校正合为一体；Reddi、Kale 与 Kumar（2018）指出 Adam 在某些凸问题上可能不收敛，并提出 AMSGrad；Ilya Loshchilov 与 Frank Hutter 提出了带热启动的余弦退火（2017）与解耦权重衰减（AdamW，2019）。Goyal 等（2017）用大批量、线性学习率缩放与预热，用一小时训练出 ImageNet 模型。
:::

::: summary
- 学习率恒定时，SGD 停在正比于 $\eta$ 乘以梯度噪声的**噪声下限**上（最小二乘为 $\eta\sigma^2d/2$）；衰减学习率能消去它，更大的批量能压低它。
- **动量**以权重 $\beta^k$ 平均过去梯度，在方向一致的方向上给出有效学习率 $\eta/(1 - \beta)$，并抵消振荡；PyTorch 形式与重球法在恒定 $\eta$ 下等价。Nesterov 的变体往前看一步。
- **AdaGrad**、**RMSProp** 与 **Adam** 把每个坐标的步长除以该坐标梯度的均方根。Adam 的偏差校正让两个平均无偏；其更新对梯度尺度不变，梯度方向一致时每个坐标大约移动 $\eta$。
- 在 Adam 下，$\ell_2$ 惩罚对梯度大的参数正则化最弱；**AdamW** 把衰减解耦，让所有权重以同一因子收缩。
- **调度**：线性预热，随后余弦、阶梯、反平方根或预热–恒定–衰减。预热的好处是经验的；收尾的低损失靠衰减达成。
- **按全局范数裁剪梯度**在不改变方向的前提下压住罕见的大步；典型的语言模型配方用 AdamW、$\beta_2 = 0.95$、权重衰减 $0.1$、裁剪阈值 $1$。
:::

## 习题

::: exercise 动量的有效学习率 {level=1 check="0.1"}
动量 $\beta = 0.9$、学习率 $\eta = 0.01$ 时，[[#eq-torch-momentum]]对一个单位恒定梯度最终每步走多大？
::: solution
由[[#prop-momentum-forms]]，权重之和为 $1/(1 - \beta) = 10$，所以步子趋于梯度的 $\eta/(1 - \beta) = 0.1$ 倍。
:::
:::

::: exercise 手算偏差校正 {level=1 check="0.39/0.19"}
Adam 取 $\beta_1 = 0.9$，某个参数收到梯度 $g_1 = 1$ 与 $g_2 = 3$。计算 $m_2$ 与 $\hat m_2$，并填入 $\hat m_2$。
::: solution
$m_1 = 0.1\cdot1 = 0.1$，$m_2 = 0.9\cdot0.1 + 0.1\cdot3 = 0.39$。校正除以 $1 - 0.9^2 = 0.19$：$\hat m_2 = 0.39/0.19\approx2.053$，是 $1$ 与 $3$ 以权重 $0.09/0.19$ 和 $0.1/0.19$ 的加权平均。不作校正，$m_2 = 0.39$ 会把梯度大小低估五倍。
:::
:::

::: exercise 一个余弦调度 {level=1 check="1e-3*(1+cos(pi/4))/2"}
一个没有预热的余弦调度在 $T = 1{,}000$ 步内从 $\eta_{\max} = 10^{-3}$ 衰减到 $0$。第 $250$ 步的学习率是多少？
::: solution
$\eta_{250} = \frac12\cdot10^{-3}\big(1 + \cos(\pi\cdot250/1000)\big) = \frac12\cdot10^{-3}(1 + \cos\frac\pi4) = 10^{-3}\cdot0.8536 = 8.54\times10^{-4}$。走了四分之一程，余弦调度只损失了峰值的 $15\%$。
:::
:::

::: exercise 裁剪一个梯度 {level=2 check="3/13"}
梯度 $\mathbf{g} = (3, 4, 12)$ 被裁剪到全局范数 $c = 1$。裁剪后它的第一个分量是多少？把每个坐标分别裁剪到 $[-1, 1]$ 会给出相同的方向吗？
::: solution
$\lVert\mathbf{g}\rVert = \sqrt{9 + 16 + 144} = 13$，故 $\mathbf{g}\leftarrow\mathbf{g}/13 = (3/13, 4/13, 12/13)$，第一个分量 $3/13\approx0.231$。逐坐标裁剪给出 $(1, 1, 1)$，指向另一个方向，并丢掉了第三个分量是第一个四倍这一信息。
:::
:::

::: exercise 一个噪声下限 {level=2 check="0.5/1.4"}
在[[#prop-floor]]的假设下，$d = 10$、$\sigma^2 = 1$、$\eta = 0.05$，$\E\lVert\mathbf{w}_t - \mathbf{w}_\star\rVert^2$ 的极限是多少？把 $\eta$ 减半能让它缩小多少？
::: solution
$\eta\sigma^2d/(2 - \eta(d + 2)) = 0.5/(2 - 0.6) = 0.5/1.4\approx0.357$。取 $\eta = 0.025$：$0.25/(2 - 0.3) = 0.147$，缩小为 $2.43$ 分之一——略多于 $2$，因为分母也变大了。学习率 $0.05$ 距离稳定性极限 $2/(d + 2) = 0.167$ 只有大约三倍，这就是分母要紧的原因。
:::
:::

::: exercise 耦合衰减与解耦衰减 {level=2}
两个参数的 Adam 二阶矩估计为 $\hat v_1 = 100$、$\hat v_2 = 10^{-4}$。取 $\eta = 10^{-3}$、$\lambda = 0.1$，用[[#prop-decoupled]]计算每个参数在 $\ell_2$ 惩罚（耦合）与 AdamW（解耦）下每步的收缩因子。
::: solution
耦合：$1 - \eta\lambda/\sqrt{\hat v_i}$，第一个是 $1 - 10^{-4}/10 = 1 - 10^{-5}$，第二个是 $1 - 10^{-4}/10^{-2} = 1 - 10^{-2}$：梯度小的参数被以一千倍快的速度衰减。解耦：两者都是 $1 - \eta\lambda = 1 - 10^{-4}$。
:::
:::

::: exercise 动量在二次函数上的价值 {level=2 check="9/11"}
在条件数 $\kappa = 100$ 的二次函数上，最佳恒定步长的梯度下降每步把误差收缩 $(\kappa - 1)/(\kappa + 1)$，最佳调参的重球动量收缩 $(\sqrt\kappa - 1)/(\sqrt\kappa + 1)$（[[math-for-ml/optimisation#sec-momentum]]）。求动量的因子，并计算两者各需多少步把误差缩小 $10^6$ 倍。
::: solution
动量：$(10 - 1)/(10 + 1) = 9/11\approx0.818$；梯度下降：$99/101\approx0.980$。步数：$\ln10^{-6}/\ln(9/11) = 68.8$，即 $69$ 步；对照 $\ln10^{-6}/\ln(99/101) = 690.8$，即 $691$ 步——省了十倍，正是因子 $\sqrt\kappa$。
:::
:::

::: exercise 两步 AdamW {level=3 check="0.798519"}
把[[#ex-adamw]]仔细重算到小数点后六位，给出 $\theta_2$。然后说明：若不作偏差校正，第一步会有什么不同。
::: solution
照该例计算：$\theta_1 = 1 - 0.1(2/2 + 0.01) = 0.899$；$g_2 = 1.798$，$\hat m_2 = 0.3598/0.19 = 1.893684$，$\hat v_2 = 0.0072288/0.001999 = 3.616210$，$\sqrt{\hat v_2} = 1.901634$，比值 $0.995818$；更新量 $0.1(0.995818 + 0.00899) = 0.100481$；$\theta_2 = 0.798519$。若不作偏差校正，第一步将用 $m_1/\sqrt{v_1} = 0.2/\sqrt{0.004} = 3.162$ 而不是 $1$，步长为 $0.317$ 而不是 $0.101$——即[[math-for-ml/optimisation#ex-adam]]中的因子 $(1 - \beta_1)/\sqrt{1 - \beta_2}$。
:::
:::

::: exercise Adam 的第一步有多大？ {level=3 check="0.05"}
某层有 $N = 10^6$ 个权重，以标准差 $0.02$ 初始化。Adam 取 $\eta = 10^{-3}$ 的第一步把每个梯度非零的权重移动 $\pm\eta$（[[#prop-adam]]）。估计更新范数与权重范数之比，并说明这对预热意味着什么。
::: solution
更新有 $N$ 个大小为 $10^{-3}$ 的坐标，范数 $\sqrt N\cdot10^{-3} = 1$。权重范数约为 $\sqrt N\cdot0.02 = 20$。相对大小为 $1/20 = 0.05$：头一步就改变这一层 $5\%$，而方向取自单个带噪批量，无论梯度大小如何。由估计很差的矩得出的类符号步，是 Adam 开头需要小学习率的一个合理原因；预热让早期的相对更新保持很小，直到 $\hat{\mathbf{v}}$ 在许多批量上估计得比较准。
:::
:::

::: exercise 因子化的二阶矩 {level=3}
Adafactor 用秩一矩阵 $\hat V = \mathbf{r}\mathbf{c}^\top/(\mathbf{1}^\top\mathbf{r})$ 近似权重矩阵的二阶矩矩阵 $V\in\R^{m\times n}$，其中 $\mathbf{r} = V\mathbf{1}$ 是行和，$\mathbf{c} = V^\top\mathbf{1}$ 是列和。证明 $\hat V$ 与 $V$ 有相同的行和与列和；证明当 $V$ 本身是元素为正的秩一矩阵时 $\hat V = V$；并计算 $4{,}096\times4{,}096$ 矩阵省下的内存。
::: solution
记 $S = \mathbf{1}^\top\mathbf{r} = \mathbf{1}^\top V\mathbf{1}$，即总和。$\hat V$ 的行和：$\hat V\mathbf{1} = \mathbf{r}(\mathbf{c}^\top\mathbf{1})/S = \mathbf{r}\,S/S = \mathbf{r}$，因为 $\mathbf{c}^\top\mathbf{1} = S$；列和同理给出 $\mathbf{c}$。若 $V = \mathbf{a}\mathbf{b}^\top$ 且元素全为正，则 $\mathbf{r} = \mathbf{a}(\mathbf{b}^\top\mathbf{1})$，$\mathbf{c} = \mathbf{b}(\mathbf{a}^\top\mathbf{1})$，$S = (\mathbf{a}^\top\mathbf{1})(\mathbf{b}^\top\mathbf{1})$，于是 $\hat V = \mathbf{a}\mathbf{b}^\top = V$。内存：$V$ 有 $4{,}096^2 = 16{,}777{,}216$ 个元素；$\mathbf{r}$ 与 $\mathbf{c}$ 共 $8{,}192$ 个，少 $2{,}048$ 倍。（Shazeer 与 Stern 把这个选择推导为使 $V$ 与秩一近似之间的广义 KL 散度最小的解。）
:::
:::
