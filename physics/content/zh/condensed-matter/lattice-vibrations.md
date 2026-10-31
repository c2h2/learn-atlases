晶体的原子并非冻结在自己的格点上。每个原子坐在近邻们共同造成的势阱底部，围绕平衡位置抖动；而近邻之间由同一种力耦合，所以抖动是集体性的：一个原子的位移推挤下一个原子，扰动随之传播。这一运动的简正模是穿晶格而行的波——长波处是声波，短波处则是更有意思的东西。

本章由两个疑难驱动。经典物理依据能量均分预言一切固体的摩尔热容都是 $3R = 24.9\,\mathrm{J\,mol^{-1}\,K^{-1}}$，即杜隆-珀蒂（Dulong–Petit）定律，常温下多数简单固体确实遵守。然而低温下每个绝缘体的热容都趋于零，金刚石在常温下就已经只有应有值的四分之一。其次，晶格不是连续介质：波长短于原子间距两倍的波没有意义，这一截断必须在某处显现。

两个疑难都要解决。一维链的经典简正模——先算每个胞一个原子，再算两个——给出色散关系 $\omega(k)$、布里渊区，以及声学支与光学支的区别。把每个模量子化为谐振子，波就成为**声子**；随后爱因斯坦模型与德拜模型给出热容，包括著名的 $T^3$ 定律。我们使用 [[condensed-matter/crystals]] 的倒格子、[[quantum-1/harmonic-oscillator]] 的量子谐振子，以及 [[statistical-mechanics/bose-fermi]] 的玻色–爱因斯坦占据数。

## 单原子链 {#monatomic}

考察排成一条线的 $N$ 个质量为 $m$ 的全同原子，平衡位置在 $na$，最近邻之间用常数为 $K$ 的弹簧相连。弹簧是真实原子间势的模型：无论该势具体如何，把它在平衡位置附近展开到二阶，得到的恢复力都线性依赖位移。这就是**谐振近似**，在振动幅度远小于 $a$ 时成立。

设 $u_n(t)$ 是原子 $n$ 相对格点的位移。右边的弹簧被拉伸 $u_{n+1} - u_n$，以力 $K(u_{n+1}-u_n)$ 把原子 $n$ 向右拉；左边的弹簧被拉伸 $u_n - u_{n-1}$，把它向左拉。牛顿第二定律给出

$$
m\,\ddot u_n = K(u_{n+1} - u_n) - K(u_n - u_{n-1}) = K(u_{n+1} + u_{n-1} - 2u_n).
$$ {#eq-chain-eom}

这是 $N$ 个耦合的线性方程，每个原子一个。我们寻找这样的解：每个原子都以同一频率振动，相位沿链条均匀推进：

$$
u_n(t) = A\,e^{i(kna - \omega t)}.
$$ {#eq-ansatz}

这类复数解的实部才是物理位移。代入 [[#eq-chain-eom]]：公因子 $A e^{i(kna-\omega t)}$ 出现在每一项中并被约去，留下

$$
-m\omega^2 = K\bigl(e^{ika} + e^{-ika} - 2\bigr) = 2K(\cos ka - 1) = -4K\sin^2\frac{ka}{2}.
$$

::: proposition 单原子链的色散 {#prop-monatomic}
链 [[#eq-chain-eom]] 存在行波解 [[#eq-ansatz]]，当且仅当

$$
\omega(k) = 2\sqrt{\frac{K}{m}}\,\Bigl\lvert\sin\frac{ka}{2}\Bigr\rvert.
$$ {#eq-mono-disp}

最高频率为 $\omega_\mathrm{max} = 2\sqrt{K/m}$，在 $k = \pm\pi/a$ 处达到。当 $\abs{ka}\ll 1$ 时色散是线性的，$\omega \approx v_s\abs k$，声速 $v_s = a\sqrt{K/m}$。
:::

::: proof
上面的计算表明 [[#eq-ansatz]] 恰在 $m\omega^2 = 4K\sin^2(ka/2)$ 时求解 [[#eq-chain-eom]]；取非负根即得 [[#eq-mono-disp]]。它对 $k$ 的最大值是 $2\sqrt{K/m}$，在 $\abs{\sin(ka/2)} = 1$、即 $ka = \pm\pi$ 时取到。$\abs{ka}$ 很小时 $\sin(ka/2)\approx ka/2$，故 $\omega\approx a\sqrt{K/m}\,\abs k$。
:::

长波处链条表现为一条弹性弦：许多间距内的原子几乎一起运动，离散性不可见，波以 [[oscillations/travelling-waves]] 的恒定速度前进。$k$ 增大时曲线弯平。到区边界，相邻原子严格反相运动，$u_{n+1} = -u_n$，该模是驻波。

### 为什么 k 只在模 2π/a 下有定义

把 [[#eq-ansatz]] 中的 $k$ 换成 $k + 2\pi/a$。原子 $n$ 的位移获得因子 $e^{i2\pi n} = 1$，一切不变。两个波矢描述的是原子*同一个*运动，因为波只在格点上被采样。连续波 $e^{ikx}$ 与 $e^{i(k+2\pi/a)x}$ 在原子之间有差别，但原子之间没有任何东西去分辨这个差别。平移量 $2\pi/a$ 正是这条链的一个倒格矢。

因此，区间 $-\pi/a < k \le \pi/a$——一维格子的**第一布里渊区**，即其倒格子的维格纳–赛茨胞，定义见 [[condensed-matter/crystals]]——恰好各一次地代表每个不同的模。波长小于 $2a$ 的波等同于某个更长的波，正如以错误帧率拍摄的转轮看起来在倒转。

::: proposition 模的计数 {#prop-count}
在周期边界条件 $u_{n+N} = u_n$ 下，第一布里渊区中允许的波矢为 $k = 2\pi j/(Na)$，$j$ 为满足 $-N/2 < j \le N/2$ 的整数。这样的 $k$ 恰有 $N$ 个，每个原子一个；它们均匀分布，在 $k$ 上的密度为 $L/2\pi$，其中 $L = Na$ 是链长。
:::

::: proof
把条件 $u_{n+N} = u_n$ 用于 [[#eq-ansatz]] 要求 $e^{ikNa} = 1$，故 $kNa = 2\pi j$，$j\in\Z$。不同的模需要模 $2\pi/a$ 意义下不同的 $k$，即模 $N$ 意义下不同的 $j$；区间 $-N/2 < j \le N/2$ 恰含每个剩余类一个代表。间距为 $\Delta k = 2\pi/(Na) = 2\pi/L$。
:::

这个计数很重要。$N$ 个原子的链有 $N$ 个自由度，所以必须恰有 $N$ 个简正模，而布里渊区恰好装下这么多。周期边界条件是把链接成一个环，由玻恩（Born）与冯·卡门（von Kármán）引入的便利手法；对长链而言，边界只影响少数几个模，不影响体性质。

### 群速度

由 $k$ 附近的模构成的波包以**群速度**行进

$$
v_g = \deriv{\omega}{k} = a\sqrt{\frac{K}{m}}\,\cos\frac{ka}{2} \qquad (0 \le k \le \pi/a).
$$ {#eq-vgroup}

长波处它等于 $v_s$，到区边界降为零。驻波不携带能量；区边界的模是一个反射条件，即布拉格反射的一维版本：$2a\sin 90^\circ = \lambda = 2\pi/k$ 在 $k = \pi/a$ 处成立。

::: example 铜原子模型链 {#ex-chain}
用弹簧常数 $K = 20.0\,\mathrm{N/m}$ 模拟一条铜原子链（$m = 63.546\,\mathrm{u}$），间距取最近邻距离 $a = 2.556\,\text{Å}$。求最高角频率、以赫兹为单位的频率（太赫兹）、以毫电子伏为单位的能量 $\hbar\omega_\mathrm{max}$，以及声速。
::: solution
质量为 $m = 63.546\times1.66054\times10^{-27} = 1.0552\times10^{-25}\,\mathrm{kg}$，于是

$$
\sqrt{K/m} = \sqrt{\frac{20.0}{1.0552\times10^{-25}}} = 1.3767\times10^{13}\,\mathrm{s^{-1}}, \qquad \omega_\mathrm{max} = 2\sqrt{K/m} = 2.753\times10^{13}\,\mathrm{rad/s}.
$$

频率为 $\omega_\mathrm{max}/2\pi = 4.38\,\mathrm{THz}$，且

$$
\hbar\omega_\mathrm{max} = (1.05457\times10^{-34})(2.753\times10^{13})\,\mathrm{J} = 2.904\times10^{-21}\,\mathrm{J} = 18.1\,\mathrm{meV}.
$$

声速为 $v_s = a\sqrt{K/m} = (2.556\times10^{-10})(1.3767\times10^{13}) = 3.52\times10^{3}\,\mathrm{m/s}$。真实铜的纵波声速为 $4.76\,\mathrm{km/s}$，声子能量高到约 $30\,\mathrm{meV}$，由中子散射测得；所以几十牛顿每米的弹簧正合适。留意这些尺度：晶格振动活在太赫兹频率、几十毫电子伏，对应的温度 $\hbar\omega/k_B$ 为几百开尔文。热容的量子效应之所以在常温以下显现，原因就在这里。
:::
:::

## 双原子链 {#diatomic}

现在让链条在质量为 $m_1$ 与 $m_2$ 的原子间交替，弹簧仍为 $K$，如同穿过岩盐的一条线。重复周期，即晶格常数，现在是 $a$，每个胞两个原子，相距 $a/2$。把胞 $n$ 中的位移记作 $u_n$（质量 $m_1$）与 $v_n$（质量 $m_2$）。原子 $u_n$ 的近邻是 $v_n$ 与 $v_{n-1}$；原子 $v_n$ 的近邻是 $u_n$ 与 $u_{n+1}$：

$$
m_1\ddot u_n = K(v_n + v_{n-1} - 2u_n), \qquad m_2\ddot v_n = K(u_{n+1} + u_n - 2v_n).
$$ {#eq-diatomic-eom}

试取 $u_n = A\,e^{i(kna-\omega t)}$ 与 $v_n = B\,e^{i(kna-\omega t)}$，两个复振幅可以不同。代入并约去公指数因子，得到关于 $A$、$B$ 的一对线性方程：

$$
\begin{aligned}
(2K - m_1\omega^2)\,A - K(1 + e^{-ika})\,B &= 0, \\
-K(1 + e^{ika})\,A + (2K - m_2\omega^2)\,B &= 0.
\end{aligned}
$$

非零解要求行列式为零：

$$
(2K - m_1\omega^2)(2K - m_2\omega^2) - K^2\abs{1 + e^{ika}}^2 = 0.
$$

由于 $\abs{1+e^{ika}}^2 = 2 + 2\cos ka = 4\cos^2(ka/2)$，这是关于 $\omega^2$ 的二次方程：$m_1m_2\omega^4 - 2K(m_1+m_2)\omega^2 + 4K^2\sin^2(ka/2) = 0$。

::: theorem 声学支与光学支 {#thm-diatomic}
对第一布里渊区 $-\pi/a < k \le \pi/a$ 中的每个 $k$，双原子链有两个简正模频率，

$$
\omega_\pm^2 = K\Bigl(\frac{1}{m_1} + \frac{1}{m_2}\Bigr) \pm K\sqrt{\Bigl(\frac{1}{m_1}+\frac{1}{m_2}\Bigr)^2 - \frac{4\sin^2(ka/2)}{m_1m_2}}.
$$ {#eq-diatomic-disp}

下支 $\omega_-$，**声学支**，在 $k = 0$ 处线性消失。上支 $\omega_+$，**光学支**，满足 $\omega_+(0) = \sqrt{2K(1/m_1+1/m_2)}$。若 $m_1 > m_2$，则在区边界 $\omega_- = \sqrt{2K/m_1}$、$\omega_+ = \sqrt{2K/m_2}$，没有模的频率落在这两个值之间。
:::

::: proof
把二次方程除以 $m_1m_2$，用求根公式解：记 $\mu^{-1} = 1/m_1 + 1/m_2$，

$$
\omega^2 = \frac{K}{\mu} \pm\sqrt{\frac{K^2}{\mu^2} - \frac{4K^2\sin^2(ka/2)}{m_1m_2}},
$$

即 [[#eq-diatomic-disp]]。根号内非负，因为 $(1/m_1+1/m_2)^2 - 4/(m_1m_2) = (1/m_1 - 1/m_2)^2 \ge 0$；两根非负，因为根号项至多为 $K/\mu$。$k = 0$ 时根号等于 $K/\mu$，得 $\omega_-=0$、$\omega_+^2 = 2K/\mu$。$k$ 很小时，用 $\sqrt{X^2 - \delta}\approx X - \delta/2X$，取 $X = K/\mu$、$\delta = K^2k^2a^2/(m_1m_2)$：则 $\omega_-^2\approx \delta/(2X) = Kk^2a^2/(2(m_1+m_2))$，关于 $k$ 线性。$k = \pi/a$ 时 $\sin^2(ka/2) = 1$，根号为 $K\abs{1/m_2 - 1/m_1}$；$m_1 > m_2$ 时两根为 $\omega^2 = 2K/m_1$ 与 $2K/m_2$。最后在 $[0,\pi/a]$ 上 $\omega_-$ 随 $\abs k$ 增大、$\omega_+$ 随 $\abs k$ 减小，因为 $\sin^2(ka/2)$ 在该区间增大；于是 $\omega_-$ 的值域是 $[0,\sqrt{2K/m_1}]$，$\omega_+$ 的值域是 $[\sqrt{2K/m_2},\sqrt{2K/\mu}]$，两者之间为空档。
:::

两个支的名字描述着运动。声学支在 $k=0$ 附近，第一个方程给出 $B\approx A$：一个胞内两个原子一起运动，这列波就是声波。光学支在 $k = 0$ 处给出 $m_1A + m_2B = 0$：两个原子相对运动，质心不动。在 $\mathrm{NaCl}$ 这样的离子晶体中，这种运动是振荡的电偶极子，与同频率的红外光强烈耦合，故名"光学"。这段频率空档是有基元的格子的真实特征：该频率范围内的波无法传播而被反射，这是 [[condensed-matter/band-structure]] 中电子能隙的力学版本。

::: widget plot
f: sqrt((1 + 1/M) - sqrt(max((1 + 1/M)^2 - 4*sin(pi*x/2)^2/M, 0))); sqrt((1 + 1/M) + sqrt(max((1 + 1/M)^2 - 4*sin(pi*x/2)^2/M, 0)))
x: -1, 1
y: 0, 2.1
labels: 声学支; 光学支
sliders: M=1:0.2:5:0.05
caption: 双原子链的两个支，$\omega$ 以 $\sqrt{K/m_2}$ 为单位，对横跨第一布里渊区的 $x = ka/\pi$ 作图，质量比为 $M = m_1/m_2$。$M = 1$ 时空档闭合，曲线是单原子链色散"折叠"进一个减半的布里渊区的样子，因为胞被平白无故地加倍了。把 $M$ 调大：区边界处 $\sqrt{2/M}$ 与 $\sqrt2$ 之间打开空档，声学支变平，光学支向轻原子在固定重原子之间振动的频率收拢。
:::

::: example 岩盐链的支频率 {#ex-nacl-chain}
一条链在 $\mathrm{Cl}$（$m_1 = 35.45\,\mathrm{u}$）与 $\mathrm{Na}$（$m_2 = 22.99\,\mathrm{u}$）之间交替，$K = 30.0\,\mathrm{N/m}$。以赫兹（太赫兹）为单位求声学支的顶端、光学支的底端以及 $k=0$ 处的光学频率。
::: solution
两质量为 $5.887\times10^{-26}\,\mathrm{kg}$ 与 $3.818\times10^{-26}\,\mathrm{kg}$。由 [[#thm-diatomic]]，$m_1 > m_2$ 时

$$
\omega_-(\pi/a) = \sqrt{\frac{2K}{m_1}} = 3.193\times10^{13}\,\mathrm{s^{-1}}, \qquad \omega_+(\pi/a) = \sqrt{\frac{2K}{m_2}} = 3.964\times10^{13}\,\mathrm{s^{-1}},
$$

且

$$
\omega_+(0) = \sqrt{2K\Bigl(\frac1{m_1} + \frac1{m_2}\Bigr)} = 5.090\times10^{13}\,\mathrm{s^{-1}}.
$$

除以 $2\pi$，声学支止于 $5.08\,\mathrm{THz}$，光学支从 $6.31$ 跑到 $8.10\,\mathrm{THz}$，$5.08$ 到 $6.31\,\mathrm{THz}$ 之间没有任何波能传播。注意 $\omega_+(0)^2 = \omega_-(\pi/a)^2 + \omega_+(\pi/a)^2$，这是模型的一个恒等式。$\mathrm{NaCl}$ 真实的横向光学频率约 $4.9\,\mathrm{THz}$，远红外波长 $61\,\mu\mathrm m$，岩盐在该波段强烈反射；一维链只是三维晶体的漫画，但量级是对的。
:::
:::

### 三维情形

在三维晶体中，每个原胞有 $p$ 个原子，同样的分析把 $2\times2$ 矩阵换成 $3p\times3p$ 矩阵，对第一布里渊区中的 $\mathbf k$ 给出 $3p$ 个支 $\omega_s(\mathbf k)$。其中三个是声学支，$\mathbf k\to0$ 时 $\omega\to0$：每个声学支都逼近晶体的一次平移，而独立的平移方向有三个。$\mathbf k = 0$ 附近，一个是**纵向**支，位移沿 $\mathbf k$；两个是**横向**支；纵向支更快。其余 $3p-3$ 个支是光学支。$N$ 个胞的晶体共有 $3pN$ 个模，每个自由度一个。铜每个原胞一个原子，只有声学支；硅每个原胞两个原子，另有三个光学支。

::: quiz
单原子链的布里渊区边界 $k = \pi/a$ 处，格波的群速度是什么？
- [ ] 声速 $a\sqrt{K/m}$。
- [ ] 声速的两倍。
- [x] 零：该模是驻波。
- [ ] 无定义，因为 $k = \pi/a$ 不是允许的波矢。
::: solution
由 [[#eq-vgroup]]，$v_g = a\sqrt{K/m}\cos(ka/2)$，在 $ka = \pi$ 处为零。相邻原子反相运动，$k$ 与 $k - 2\pi/a = -k$ 处右行、左行两列波是同一个模，所以运动是驻波。这就是格波被晶格自身的布拉格反射。波矢 $\pi/a$ 是允许的：它位于区边界，只计一次。
:::
:::

## 声子 {#phonons}

谐振晶体在简正坐标下是一组独立谐振子，每个模 $(\mathbf k, s)$ 一个。这种解耦在经典力学中成立，在量子力学中依然成立。每个振子具有 [[quantum-1/harmonic-oscillator]] 的能级，于是晶体的能量为

$$
E = \sum_{\mathbf k, s}\hbar\omega_s(\mathbf k)\Bigl(n_{\mathbf k s} + \frac12\Bigr), \qquad n_{\mathbf k s} = 0, 1, 2, \dots
$$ {#eq-phonon-energy}

::: definition 声子 {#def-phonon}
**声子（phonon）** 是晶体简正模 $(\mathbf k, s)$ 中一份 $\hbar\omega_s(\mathbf k)$ 的振动能量量子。整数 $n_{\mathbf k s}$ 是该模中的声子数。向量 $\hbar\mathbf k$，定义在模 $\hbar\mathbf G$ 的意义下，是声子的**晶体动量**。
:::

粒子语言不只是比喻。声子可以一份一份地产生和消灭，例如被一个非弹性散射、恰好损失 $\hbar\omega$ 能量的中子；这类过程中能量与晶体动量守恒，正是色散曲线据此测定的原理。但晶体动量不是真正的动量：$\mathbf k \ne 0$ 的均匀模不携带原子的净动量，而且它只在模一个倒格矢的意义下守恒，因为 $\mathbf k$ 与 $\mathbf k + \mathbf G$ 是同一个模。

一个模中的量子数并不固定。声子是玻色子，其数目由温度决定，所以化学势为零；热平衡下平均占据数是 [[statistical-mechanics/bose-fermi]] 导出的玻色–爱因斯坦分布

$$
\langle n\rangle = \frac{1}{e^{\hbar\omega/k_BT} - 1}.
$$ {#eq-bose}

于是单个模的平均能量为 $\hbar\omega(\langle n\rangle + \frac12)$。高温时 $k_BT\gg\hbar\omega$，占据数 $\approx k_BT/\hbar\omega$，平均能量趋于 $k_BT$，即振子的经典均分值。低温时占据数指数小：该模被**冻结**。

::: example 有多少个声子？ {#ex-occupation}
某个模有 $\hbar\omega = 30.0\,\mathrm{meV}$。求它在 $300\,\mathrm K$ 与 $77\,\mathrm K$ 下的平均声子数。
::: solution
$300\,\mathrm K$ 时 $k_BT = 25.85\,\mathrm{meV}$，$\hbar\omega/k_BT = 1.1605$，于是

$$
\langle n\rangle = \frac{1}{e^{1.1605} - 1} = \frac{1}{3.1915 - 1} = 0.456.
$$

$77\,\mathrm K$ 时 $k_BT = 6.635\,\mathrm{meV}$，比值为 $4.521$，$\langle n\rangle = 1/(e^{4.521}-1) = 0.0110$。温度降低四倍，该模的声子数减少 $40$ 倍。经典振子只会按四倍损失能量。高频模的这种指数冻结，就是低温热容的全部解释。
:::
:::

## 绝缘体的热容 {#heat-capacity}

晶格的热能是各模 $\hbar\omega\langle n\rangle$ 之和，热容是它对温度的导数。单个模为

$$
c(\omega, T) = \deriv{}{T}\,\frac{\hbar\omega}{e^{\hbar\omega/k_BT}-1} = k_B\,\frac{x^2 e^x}{(e^x - 1)^2}, \qquad x = \frac{\hbar\omega}{k_BT}.
$$ {#eq-mode-c}

当温度升高越过 $\hbar\omega/k_B$ 时，它从 $0$ 升到 $k_B$。全部物理都在模频率的分布之中，两个经典模型做了方向相反的简化。

### 爱因斯坦模型

爱因斯坦在 1907 年把 $N$ 个原子的晶体的全部 $3N$ 个模取为同一频率 $\omega_E$，并定义**爱因斯坦温度** $\Theta_E = \hbar\omega_E/k_B$。热容是 $3N$ 份 [[#eq-mode-c]]：

$$
C_E = 3Nk_B\,\frac{(\Theta_E/T)^2\,e^{\Theta_E/T}}{\bigl(e^{\Theta_E/T}-1\bigr)^2}.
$$ {#eq-einstein}

高温时它趋于 $3Nk_B$，每摩尔即 $3R$，杜隆-珀蒂定律。低温时按 $e^{-\Theta_E/T}$ 下降。对金刚石，爱因斯坦拟合出 $\Theta_E = 1320\,\mathrm K$；在 $300\,\mathrm K$，$\Theta_E/T = 4.40$，[[#eq-einstein]] 给出 $C_E = 0.244\times3R = 6.08\,\mathrm{J\,mol^{-1}\,K^{-1}}$，与实测的 $6.1$ 接近。这一次拟合就是量子理论对固体的首次应用，并解释了为什么硬而轻的固体在常温就偏离杜隆-珀蒂定律。但指数下降太快。实测绝缘体的热容按 $T^3$ 消失，原因是真实晶体总有频率任意低的声学模，任何温度都无法把它们完全冻结。

### 德拜模型

德拜（Debye）在 1912 年保住了低频模的正确性。他把每个支都换成线性色散 $\omega = v\abs{\mathbf k}$，三个声学偏振共用一个平均声速 $v$，并把布里渊区换成等体积的球，使球内仍装 $N$ 个波矢。

在边长 $L$ 的立方体中取周期边界条件，允许的波矢构成间距 $2\pi/L$ 的立方网格，即 [[#prop-count]] 的三维版本，所以每个波矢占据 $(2\pi/L)^3 = (2\pi)^3/V$ 的 $\mathbf k$ 空间体积。满足 $\abs{\mathbf k} < k$ 的数目为 $\frac43\pi k^3\cdot V/(2\pi)^3$；计入三个偏振，频率低于 $\omega$ 的模数为

$$
\mathcal N(\omega) = 3\cdot\frac{V}{(2\pi)^3}\cdot\frac{4\pi}{3}\Bigl(\frac{\omega}{v}\Bigr)^3 = \frac{V\omega^3}{2\pi^2v^3}.
$$

其导数即**态密度** $g(\omega) = \dd\mathcal N/\dd\omega = 3V\omega^2/(2\pi^2v^3)$。截断频率，即**德拜频率** $\omega_D$，由总模数为 $3N$、$\mathcal N(\omega_D) = 3N$ 定出：

$$
\omega_D = v\,(6\pi^2 n)^{1/3}, \qquad \Theta_D = \frac{\hbar\omega_D}{k_B}, \qquad n = \frac NV.
$$ {#eq-debye-freq}

::: theorem 德拜热容 {#thm-debye}
德拜模型中 $N$ 个原子的热容为

$$
C_D = 9Nk_B\Bigl(\frac{T}{\Theta_D}\Bigr)^3\int_0^{\Theta_D/T}\frac{x^4 e^x}{(e^x-1)^2}\,\dd x.
$$ {#eq-debye}

$T\gg\Theta_D$ 时它趋于 $3Nk_B$。$T\ll\Theta_D$ 时

$$
C_D \approx \frac{12\pi^4}{5}\,Nk_B\Bigl(\frac{T}{\Theta_D}\Bigr)^3.
$$ {#eq-debye-t3}
:::

::: proof
用态密度对诸模的 [[#eq-mode-c]] 求和：

$$
C_D = \int_0^{\omega_D} g(\omega)\,k_B\frac{x^2e^x}{(e^x-1)^2}\,\dd\omega, \qquad x = \frac{\hbar\omega}{k_BT}.
$$

由 [[#eq-debye-freq]]，$3V/(2\pi^2 v^3) = 9N/\omega_D^3$，所以 $g(\omega) = 9N\omega^2/\omega_D^3$。换元为 $x$，$\omega = k_BTx/\hbar$，$\dd\omega = (k_BT/\hbar)\,\dd x$；上限化为 $\hbar\omega_D/k_BT = \Theta_D/T$。于是

$$
C_D = \frac{9Nk_B}{\omega_D^3}\Bigl(\frac{k_BT}{\hbar}\Bigr)^3\int_0^{\Theta_D/T}\frac{x^4e^x}{(e^x-1)^2}\,\dd x,
$$

再由 $(k_BT/\hbar\omega_D)^3 = (T/\Theta_D)^3$ 即得 [[#eq-debye]]。高温时上限很小；那里 $x^2e^x/(e^x-1)^2 = 1 - x^2/12 + \dots\to1$，积分 $\approx\frac13(\Theta_D/T)^3$，故 $C_D\to3Nk_B$。低温时上限可取到无穷，因为被积函数按 $x^4e^{-x}$ 衰减。分部积分，利用 $\dd\bigl(-1/(e^x-1)\bigr) = e^x/(e^x-1)^2\,\dd x$，

$$
\int_0^\infty\frac{x^4e^x}{(e^x-1)^2}\,\dd x = \Bigl[-\frac{x^4}{e^x-1}\Bigr]_0^\infty + 4\int_0^\infty\frac{x^3}{e^x-1}\,\dd x = 4\cdot\frac{\pi^4}{15},
$$

其中边界项为零，且 $\int_0^\infty x^3/(e^x-1)\,\dd x = \Gamma(4)\zeta(4) = 6\cdot\pi^4/90 = \pi^4/15$，即斯特藩–玻尔兹曼定律的那个积分。相乘，$9\cdot 4\pi^4/15 = 12\pi^4/5$，即 [[#eq-debye-t3]]。
:::

$T^3$ 定律对任何晶体在低温都是精确的，不限于模型：因为只有 $\hbar\omega\lesssim k_BT$ 的模被激发，而温度足够低时这些模全在声学支的线性段上。被激发的模数按 $\mathbf k$ 空间半径 $k_BT/\hbar v$ 的球体积增长，$\propto T^3$，每个模能量 $\sim k_BT$，故 $U\propto T^4$、$C\propto T^3$。对光子同样论证给出斯特藩–玻尔兹曼定律；声子就是一个带上限的"声音黑体"。

::: widget plot
f: 3*x^3*sum(((k - 0.5)/(80*x))^4*exp((k - 0.5)/(80*x))/(exp((k - 0.5)/(80*x)) - 1)^2, k, 1, 80)/(80*x); (r/x)^2*exp(r/x)/(exp(r/x) - 1)^2; 4*pi^4/5*x^3
x: 0.02, 1.5
y: 0, 1.1
labels: 德拜; 爱因斯坦; T³ 律
sliders: r=0.75:0.3:1.2:0.01
caption: 热容除以经典值 $3Nk_B$，对 $x = T/\Theta_D$ 作图。德拜曲线由 [[#eq-debye]] 算出；爱因斯坦曲线取 $\Theta_E = r\,\Theta_D$，$r \approx 0.75$ 使两者高温相符。$T\approx\Theta_D$ 以上两者都逼近 $1$，即杜隆-珀蒂值。现在看 $x = 0.1$ 以下：爱因斯坦曲线指数崩塌，德拜曲线沿 $T^3$ 律走。调整 $r$，注意没有任何爱因斯坦温度能重现实低温尾巴。
:::

::: example 铜在 10 K 的热容 {#ex-copper-t3}
由低温测量得铜的德拜温度 $\Theta_D = 343\,\mathrm K$。求 $10\,\mathrm K$ 下每摩尔的晶格热容，并与 $3R$ 比较。
::: solution
$T/\Theta_D = 10/343 = 0.0292$，深处在 $T^3$ 区，[[#eq-debye-t3]] 适用，取 $Nk_B = R$：

$$
C = \frac{12\pi^4}{5}R\Bigl(\frac{T}{\Theta_D}\Bigr)^3 = 233.78\times8.3145\,\mathrm{J\,mol^{-1}\,K^{-1}}\times\Bigl(\frac{10}{343}\Bigr)^3.
$$

前置因子为 $1943.8\,\mathrm{J\,mol^{-1}\,K^{-1}}$，立方项为 $2.478\times10^{-5}$，故

$$
C = 0.0482\,\mathrm{J\,mol^{-1}\,K^{-1}}.
$$

这是 $3R = 24.94\,\mathrm{J\,mol^{-1}\,K^{-1}}$ 的 $0.19\%$。温度翻倍到 $20\,\mathrm K$，数值乘 $8$，得 $0.385\,\mathrm{J\,mol^{-1}\,K^{-1}}$。铜在 $10\,\mathrm K$ 时传导电子还贡献约 $7\,\mathrm{mJ\,mol^{-1}\,K^{-1}}$，随 $T$ 线性；那要在 [[condensed-matter/free-electrons]] 中计算。作 $C/T$ 对 $T^2$ 的图可把两部分贡献分为截距与斜率。
:::
:::

::: example 由声速求德拜温度 {#ex-debye-sound}
多晶铜的纵波与横波声速为 $v_L = 4760\,\mathrm{m/s}$、$v_T = 2325\,\mathrm{m/s}$，原子密度 $n = 8.49\times10^{28}\,\mathrm{m^{-3}}$。估算 $\Theta_D$。
::: solution
德拜模型对三个偏振用一个声速。只要这个速度取重现模数的平均，$3/v^3 = 1/v_L^3 + 2/v_T^3$，低频态密度就正确：

$$
\frac{3}{v^3} = \frac{1}{(4760)^3} + \frac{2}{(2325)^3} = 9.27\times10^{-12} + 1.591\times10^{-10}\ \mathrm{s^3/m^3},
$$

故 $v = 2612\,\mathrm{m/s}$。慢的横波主导平均值。于是 $(6\pi^2n)^{1/3} = 1.713\times10^{10}\,\mathrm{m^{-1}}$，由 [[#eq-debye-freq]]

$$
\Theta_D = \frac{\hbar v\,(6\pi^2 n)^{1/3}}{k_B} = \frac{(1.05457\times10^{-34})(2612)(1.713\times10^{10})}{1.38065\times10^{-23}}\,\mathrm K = 342\,\mathrm K.
$$

量热学值是 $343\,\mathrm K$。符合得比模型该得的更好，但并非巧合：低温下热容只依赖 $\mathbf k = 0$ 附近的声学模，那正是声波，也正是超声测量所探测的东西。对铝做同样估算约低 $7\%$（文末习题），因为真实色散偏离线性更厉害。
:::
:::

::: warning 德拜温度不是熔点
$\Theta_D$ 是一个伪装成温度的频率：它标记最高频的模开始被经典激发，从而标记杜隆-珀蒂定律开始成立的地方。它对稳定性一无所说。铅的 $\Theta_D = 105\,\mathrm K$，熔点却是 $601\,\mathrm K$；金刚石的 $\Theta_D = 2230\,\mathrm K$。也不可在 $\Theta_D$ 附近或更高处使用 [[#eq-debye-t3]]。铜在 $T = 30\,\mathrm K$ 时 $T/\Theta_D = 0.087$，$T^3$ 公式与 [[#eq-debye]] 相差仍约 $1\%$ 以内；到 $T = \Theta_D/5$ 已经高出 $70\%$；常温下它对铜给出 $1300\,\mathrm{J\,mol^{-1}\,K^{-1}}$，是真实值的五十五倍。
:::

### 超越谐振晶格

谐振近似让简正模永远彼此独立：声子一旦产生就永不衰变，一热脉冲将以声速穿过完美晶体。真实的原子间势不严格二次。展开中的三次及更高次项耦合各个模，于是声子彼此散射；由此产生两个谐振模型无法给出的后果。

其一是**热膨胀**。在二次势阱中，平均位置不依赖振动幅度，所以谐振晶体受热不膨胀。非对称势阱——压缩方向陡、拉伸方向缓——随振动增大把平均间距向外推移。

其二是有限的**热导率**。把声子当作气体，借用 [[thermodynamics/kinetic-theory]] 的粒子动理论结果：单位体积热容为 $C$、速度为 $v$、平均自由程为 $\ell$ 的载流子气体，其热导率为

$$
\kappa = \frac13\,C\,v\,\ell.
$$ {#eq-kappa}

绝缘体中平均自由程由声子–声子碰撞、杂质与同位素决定；低温下由样品器壁决定。并非每种碰撞都阻碍热流。严格保持晶体动量守恒的碰撞无法弛豫声子的定向流；只有使总 $\mathbf k$ 改变一个倒格矢的碰撞才行，佩尔斯（Peierls）在 1929 年称其为**倒逆（umklapp）过程**。它们需要波矢与区尺寸相当的声子，而这种声子数目按 $e^{-\Theta_D/bT}$ 减少，$b$ 为 $2$ 量级；于是纯净晶体的热导率在冷却中陡升，直到被样品边界接管。

::: example 硅中的声子平均自由程 {#ex-silicon-mfp}
$300\,\mathrm K$ 硅的热导率 $\kappa = 148\,\mathrm{W\,m^{-1}\,K^{-1}}$，单位体积热容 $C = 1.64\times10^{6}\,\mathrm{J\,m^{-3}\,K^{-1}}$。取平均声学速度 $v = 6.0\,\mathrm{km/s}$，由 [[#eq-kappa]] 估算声子平均自由程。
::: solution
解出 $\ell$，

$$
\ell = \frac{3\kappa}{Cv} = \frac{3\times148}{(1.64\times10^6)(6.0\times10^3)}\,\mathrm m = 4.5\times10^{-8}\,\mathrm m = 45\,\mathrm{nm}.
$$

约八十个晶格常数。这个估算粗糙：热主要由更慢、更长的波长声子携带，它们的平均自由程远大于平均值，可达微米量级；这就是几百纳米厚的硅膜热导率可测地下降的原因。它是微电子学的设计约束——数十亿晶体管产生的热必须穿过这样的薄膜散出。
:::
:::

::: quiz
德拜模型中，热容为什么按 $T^3$ 下降，而不是像爱因斯坦模型那样按指数下降？
- [ ] 因为德拜截断 $\omega_D$ 高于 $\omega_E$。
- [x] 因为存在任意低频的声学模，$k_BT/\hbar$ 以下的模数按 $T^3$ 增长。
- [ ] 因为德拜模型中的声子是费米子。
- [ ] 因为德拜模型包含了光学支。
::: solution
一旦 $k_BT\ll\hbar\omega_E$，爱因斯坦的单一频率就完全冻结。德拜模型与真实晶体一样，声学支从 $\omega = 0$ 出发，所以任何温度下都有一些模保持被经典激发。满足 $\hbar\omega < k_BT$ 的模在 $\mathbf k$ 空间填满一个球，半径 $\propto T$，故模数 $\propto T^3$，每个贡献约 $k_B$。声子是玻色子，而德拜模型根本没有光学支。
:::
:::

::: history 热容与第一个量子固体
皮埃尔·路易·杜隆（Pierre Louis Dulong）与阿历克西·泰雷兹·珀蒂（Alexis Thérèse Petit）在 1819 年宣布：比热与原子量的乘积对许多固体元素几乎相同。十九世纪七十年代海因里希·韦伯（Heinrich Weber）发现碳、硼、硅远低于该规律，只有高温时才趋近。1907 年阿尔伯特·爱因斯坦（Albert Einstein）把普朗克的量子假说用于原子振动，导出 [[#eq-einstein]]，用一个参数拟合了韦伯的金刚石数据。1912 年彼得·德拜把固体当作带上限的弹性连续介质，得到 $T^3$ 定律；同年马克斯·玻恩（Max Born）与西奥多·冯·卡门（Theodore von Kármán）建立了离散晶体的晶格动力学，采用周期边界条件，即本章采用的方法。晶格振动的量子由伊戈尔·塔姆（Igor Tamm）于 1930 年引入，"声子"之名由雅可夫·弗伦克尔（Yakov Frenkel）提议。色散曲线最早在二十世纪五十年代由非弹性中子散射测得，主要功臣是伯特伦·布罗克豪斯（Bertram Brockhouse），他因此分享 1994 年诺贝尔奖。
:::

## 后续内容 {#leads}

声子遍布此后的全部内容。它们散射电子，从而决定 [[condensed-matter/free-electrons]] 中金属电阻的温度依赖；它们在电子之间中介的吸引是 [[condensed-matter/magnetism-superconductivity]] 中常规超导的起源。超越谐振近似后，声子彼此碰撞；这些碰撞限制绝缘体的热导率并产生热膨胀。耦合振子、简正模及其量子化的同一套数学，描述磁体中的自旋波，并在场论中描述每一个自由粒子。简正模的一般理论在 [[oscillations/superposition]]，玻色子的统计在 [[statistical-mechanics/bose-fermi]]。

::: summary
- 谐振近似下，原子链的波解满足 $\omega = 2\sqrt{K/m}\,\abs{\sin(ka/2)}$；小 $k$ 处波是线性的（声波），区边界处是驻波。
- 相差一个倒格矢的波矢描述同一个运动，所以全部模都在第一布里渊区内，区内每个原胞恰含一个 $k$。
- 每个原胞 $p$ 个原子给出 $3$ 个声学支和 $3p-3$ 个光学支；两种质量时在 $\sqrt{2K/m_1}$ 与 $\sqrt{2K/m_2}$ 之间打开频率空档。
- 每个模是量子振子；其量子——声子——服从化学势为零的玻色–爱因斯坦统计。
- 爱因斯坦的单一频率解释了偏离杜隆-珀蒂定律的现象，但在低温指数下降。
- 德拜的线性色散配上截断 $\Theta_D$，低温给出 $C = \frac{12\pi^4}{5}Nk_B(T/\Theta_D)^3$，高温给出 $3Nk_B$。
:::

## 习题 {#exercises}

::: exercise 能带顶端 {level=1 check="4.38"}
单原子链的原子质量 $63.546\,\mathrm u$，弹簧 $K = 20.0\,\mathrm{N/m}$。求最高振动频率 $f_\mathrm{max} = \omega_\mathrm{max}/2\pi$，以赫兹（太赫兹）为单位。
::: solution
由 [[#prop-monatomic]]，$\omega_\mathrm{max} = 2\sqrt{K/m}$。$m = 1.0552\times10^{-25}\,\mathrm{kg}$ 时 $\sqrt{K/m} = 1.3767\times10^{13}\,\mathrm{s^{-1}}$，故 $\omega_\mathrm{max} = 2.7534\times10^{13}\,\mathrm{s^{-1}}$，$f_\mathrm{max} = 4.38\,\mathrm{THz}$，与 [[#ex-chain]] 相同。晶格间距不进入结果：区边界频率只依赖弹簧和质量。
:::
:::

::: exercise 铅在五开尔文 {level=1 check="0.210"}
铅的 $\Theta_D = 105\,\mathrm K$。用德拜 $T^3$ 律求它在 $5.00\,\mathrm K$ 的摩尔热容，以 $\mathrm{J\,mol^{-1}\,K^{-1}}$ 为单位。
::: solution
$T/\Theta_D = 0.04762$，深入低温区。于是

$$
C = 1943.8\times(0.04762)^3 = 1943.8\times1.0798\times10^{-4} = 0.210\,\mathrm{J\,mol^{-1}\,K^{-1}}.
$$

同温度下铜（$\Theta_D = 343\,\mathrm K$）只有 $1943.8\times(5/343)^3 = 0.0060$，小三十五倍：软而重的铅低频模多得多。
:::
:::

::: exercise 铝的杜隆-珀蒂值 {level=1 check="0.9245"}
铝的摩尔质量为 $26.9815\,\mathrm{g/mol}$。杜隆-珀蒂（Dulong–Petit）定律预言的比热容是多少，以 $\mathrm{J\,g^{-1}\,K^{-1}}$ 为单位？
::: solution
摩尔值 $3R = 3\times8.31446 = 24.943\,\mathrm{J\,mol^{-1}\,K^{-1}}$。每克 $24.943/26.9815 = 0.9245\,\mathrm{J\,g^{-1}\,K^{-1}}$。$25\,^\circ\mathrm C$ 实测值 $0.897$；铝的 $\Theta_D = 428\,\mathrm K$，常温下尚未完全经典，且 $C_p$ 也略大于 $C_V$。
:::
:::

::: exercise 数一数支 {level=2 check="12"}
钛酸锶 $\mathrm{SrTiO_3}$ 具有立方钙钛矿结构，每个原胞五个原子。它有几个光学声子支？
::: solution
每个原胞 $p = 5$ 个原子，共 $3p = 15$ 个支。三个是声学支，故 $15 - 3 = 12$ 个是光学支。$\mathrm{SrTiO_3}$ 中一个区边界光学模随晶体冷却到 $105\,\mathrm K$ 而软化趋于零频，其时结构发生变化；$\mathbf k = 0$ 的横向光学模在最低温时几乎软化到零。这类"软模"是结构相变的晶格动力学标志。
:::
:::

::: exercise 区边界空档 {level=2 check="sqrt(2)"}
双原子链 $m_1 = 2m_2$，求区边界处两个频率之比 $\omega_+/\omega_-$。
::: solution
由 [[#thm-diatomic]]，$k = \pi/a$ 且 $m_1 > m_2$ 时 $\omega_- = \sqrt{2K/m_1}$、$\omega_+ = \sqrt{2K/m_2}$。比值为

$$
\frac{\omega_+}{\omega_-} = \sqrt{\frac{m_1}{m_2}} = \sqrt2 \approx 1.414.
$$

只有两质量相等时空档才闭合。声学支的区边界模中只有重原子在振动、轻原子静止；光学支则相反，只有轻原子振动。把 $\omega^2 = 2K/m_1$ 代入振幅方程组第一式即可验证：由于 $1 + e^{-i\pi} = 0$，必有 $B = 0$。
:::
:::

::: exercise 铝的德拜温度 {level=2 check="399"}
铝的密度 $2.70\,\mathrm{g/cm^3}$，摩尔质量 $26.9815\,\mathrm{g/mol}$，声速 $v_L = 6420\,\mathrm{m/s}$、$v_T = 3040\,\mathrm{m/s}$。仿照 [[#ex-debye-sound]] 估算 $\Theta_D$，以开尔文为单位。
::: solution
原子密度 $n = \rho N_A/M = 2700\times6.02214\times10^{23}/0.0269815 = 6.026\times10^{28}\,\mathrm{m^{-3}}$。由 $3/v^3 = 1/v_L^3 + 2/v_T^3$ 得平均速度 $v = 3420\,\mathrm{m/s}$。于是 $(6\pi^2n)^{1/3} = 1.527\times10^{10}\,\mathrm{m^{-1}}$，

$$
\Theta_D = \frac{\hbar v(6\pi^2n)^{1/3}}{k_B} = 399\,\mathrm K.
$$

量热学值为 $428\,\mathrm K$。这个差距提醒我们：$\Theta_D$ 是模型的拟合参数，由不同方法、在不同温度得到的数值不必一致。
:::
:::

::: exercise 双原子链中的声波 {level=3}
证明双原子链声学支的声速为 $v_s = a\sqrt{K/(2(m_1+m_2))}$，其中 $a$ 是双原子胞的长度。检验 $m_1 = m_2 = m$ 时与单原子结果一致。
::: solution
[[#thm-diatomic]] 的证明给出小 $k$ 时 $\omega_-^2 \approx Kk^2a^2/(2(m_1+m_2))$，故 $\omega_- \approx v_s\abs k$，$v_s = a\sqrt{K/(2(m_1+m_2))}$。独立验证：长波极限下链条是一条弹性弦，线密度 $\lambda = (m_1+m_2)/a$；张力式刚度：跨一个胞的两根弹簧 $K$ 串联，等效弹簧为 $K/2$、长度 $a$，即模量 $Ka/2$，于是 $v_s = \sqrt{(Ka/2)/\lambda} = a\sqrt{K/(2(m_1+m_2))}$。两质量相等时原子间距为 $a/2$，用间距 $a/2$ 的单原子公式得 $(a/2)\sqrt{K/m} = a\sqrt{K/(4m)}$，与 $a\sqrt{K/(2\cdot2m)}$ 相同。
:::
:::

::: exercise 高温修正 {level=3}
证明 $T\gg\Theta_D$ 时德拜热容为 $C_D \approx 3Nk_B\bigl[1 - \frac{1}{20}(\Theta_D/T)^2\bigr]$。
::: hint
把 $x^2e^x/(e^x-1)^2$ 展开到 $x^2$ 阶；它是 $x$ 的偶函数。
:::
::: solution
写 $x^2e^x/(e^x-1)^2 = x^2/(4\sinh^2(x/2))$。由 $\sinh y = y(1 + y^2/6 + \dots)$，$\sinh^2(x/2) = (x^2/4)(1 + x^2/12 + \dots)$，所以比值为 $1 - x^2/12 + O(x^4)$。令 $u = \Theta_D/T$ 很小，

$$
\int_0^u\Bigl(x^2 - \frac{x^4}{12}\Bigr)\dd x = \frac{u^3}{3} - \frac{u^5}{60}.
$$

乘以 [[#eq-debye]] 的 $9Nk_B/u^3$ 得 $C_D \approx 9Nk_B\bigl(\frac13 - \frac{u^2}{60}\bigr) = 3Nk_B\bigl(1 - \frac{u^2}{20}\bigr)$。$T = \Theta_D$ 时修正公式给出 $0.95$，[[#eq-debye]] 的精确值为 $0.952$；经典极限来得很快。
:::
:::

::: exercise 链的态密度 {level=3}
对 $N$ 个原子、长度 $L$ 的单原子链，证明态密度为 $0 < \omega < \omega_\mathrm{max}$ 时 $g(\omega) = \dfrac{2N}{\pi}\dfrac{1}{\sqrt{\omega_\mathrm{max}^2 - \omega^2}}$，并验证其积分为 $N$。
::: solution
由 [[#prop-count]]，波矢间距 $2\pi/L$，所以 $\dd k$ 内数目为 $(L/2\pi)\,\dd k$。低于 $\omega_\mathrm{max}$ 的每个频率来自两个波矢 $\pm k$，故 $g(\omega)\,\dd\omega = 2(L/2\pi)\,\dd k$，$g = (L/\pi)/(\dd\omega/\dd k)$。由 [[#eq-vgroup]]，$\dd\omega/\dd k = (a\omega_\mathrm{max}/2)\cos(ka/2)$，且 $\cos(ka/2) = \sqrt{1 - \omega^2/\omega_\mathrm{max}^2}$，于是

$$
g(\omega) = \frac{L}{\pi}\cdot\frac{2}{a\sqrt{\omega_\mathrm{max}^2-\omega^2}} = \frac{2N}{\pi\sqrt{\omega_\mathrm{max}^2-\omega^2}}.
$$

于是 $\int_0^{\omega_\mathrm{max}} g\,\dd\omega = (2N/\pi)\arcsin(1) = N$。态密度在群速度为零的 $\omega_\mathrm{max}$ 处发散：**范霍夫（van Hove）奇点**。三维情形这类点给出拐折而非发散，在实测声子谱中可见。
:::
:::
