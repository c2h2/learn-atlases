语言模型从它学到的分布中一次生成一个词元的文本。生成图像原则上是同一个问题——学一个图像上的分布 $p_\theta(\mathbf{x})$，或在给定描述 $c$ 下的 $p_\theta(\mathbf{x}\mid c)$，然后从中采样——但对象截然不同：一张 $512\times512$ 的彩色图像有 $786{,}432$ 个连续值，没有天然的顺序，在所有尺度上都有强相关性，而其质量由能一眼看出一只畸形的手的眼睛来评判。

截至 2026 年，两种答案占主导。**扩散模型**（diffusion models）学习逆转一个逐渐把图像变成噪声的过程：生成从纯噪声开始，一步步把它去掉。**自回归模型**用一个学出来的量化器把图像变成离散词元的序列，并像对文本那样对它建模。本章把这两条路都建立起来。先从提供了关键材料的两个更老的家族开始——变分自编码器（其证据下界将完整推导）与生成对抗网络——然后推导 Ho 等人（2020）的扩散模型：封闭形式的前向过程、噪声预测目标，以及用 DDPM 与 DDIM 采样。一个 $1$ 维扩散模型用纯 Python 在一个高斯混合上训练。随后本章讨论**无分类器引导**、**潜在扩散**、**流匹配**、**扩散 Transformer** 与自回归图像词元，并以评测收尾。

## 变分自编码器 {#sec-vae}

**隐变量模型**（latent-variable model）用未观测的因由解释数据：抽取 $\mathbf{z}\sim p(\mathbf{z})$，通常取 $\Normal(\mathbf{0}, I)$，再抽取 $\mathbf{x}\sim p_\theta(\mathbf{x}\mid\mathbf{z})$，其参数由一个称为**解码器**的神经网络算出。对神经解码器而言，似然 $p_\theta(\mathbf{x}) = \int p_\theta(\mathbf{x}\mid\mathbf{z})p(\mathbf{z})\,d\mathbf{z}$ 不可计算，后验 $p_\theta(\mathbf{z}\mid\mathbf{x})$ 亦然。变分自编码器（variational autoencoder，VAE）（Kingma 与 Welling，2014；Rezende 等人，2014）引入一个**编码器** $q_\phi(\mathbf{z}\mid\mathbf{x})$ 来近似后验，并最大化对数似然的一个下界。

::: theorem 证据下界 {#thm-elbo}
对任何与后验同支撑的分布 $q_\phi(\mathbf{z}\mid\mathbf{x})$，

$$
\log p_\theta(\mathbf{x}) = \underbrace{\E_{q_\phi(\mathbf{z}\mid\mathbf{x})}\big[\log p_\theta(\mathbf{x}\mid\mathbf{z})\big] - \mathrm{KL}\big(q_\phi(\mathbf{z}\mid\mathbf{x})\,\big\|\,p(\mathbf{z})\big)}_{\text{ELBO}(\mathbf{x};\,\theta,\phi)} + \mathrm{KL}\big(q_\phi(\mathbf{z}\mid\mathbf{x})\,\big\|\,p_\theta(\mathbf{z}\mid\mathbf{x})\big),
$$ {#eq-elbo}

于是 $\log p_\theta(\mathbf{x})\ge\text{ELBO}$，当且仅当 $q_\phi(\mathbf{z}\mid\mathbf{x}) = p_\theta(\mathbf{z}\mid\mathbf{x})$ 时取等。
:::

::: proof
由贝叶斯定理，$p_\theta(\mathbf{z}\mid\mathbf{x}) = p_\theta(\mathbf{x}\mid\mathbf{z})p(\mathbf{z})/p_\theta(\mathbf{x})$，故对每个 $\mathbf{z}$

$$
\log p_\theta(\mathbf{x}) = \log p_\theta(\mathbf{x}\mid\mathbf{z}) + \log\frac{p(\mathbf{z})}{q_\phi(\mathbf{z}\mid\mathbf{x})} + \log\frac{q_\phi(\mathbf{z}\mid\mathbf{x})}{p_\theta(\mathbf{z}\mid\mathbf{x})}.
$$

左端不依赖 $\mathbf{z}$；对两端在 $q_\phi(\mathbf{z}\mid\mathbf{x})$ 下取期望。三项变成 $\E_q[\log p_\theta(\mathbf{x}\mid\mathbf{z})]$、$-\mathrm{KL}(q\,\|\,p(\mathbf{z}))$ 与 $\mathrm{KL}(q\,\|\,p_\theta(\mathbf{z}\mid\mathbf{x}))$，即[[#eq-elbo]]。最后一个 KL散度非负，仅当两个分布重合时为零（吉布斯（Gibbs）不等式，见[[math-for-ml/information-theory#thm-gibbs]]）。
:::

ELBO 有一个好读的形式：一个**重建**项（把一个从编码器采出的潜在变量解码，为原始图像打分），和一个把编码器的分布拉近先验的**正则项**，使得从先验采出的潜在变量能解码成合理的图像。对高斯编码器 $q_\phi(\mathbf{z}\mid\mathbf{x}) = \Normal(\boldsymbol\mu_\phi(\mathbf{x}), \diag\boldsymbol\sigma^2_\phi(\mathbf{x}))$，正则项有封闭形式

$$
\mathrm{KL}\big(\Normal(\boldsymbol\mu, \diag\boldsymbol\sigma^2)\,\big\|\,\Normal(\mathbf{0}, I)\big) = \frac12\sum_{j}\big(\mu_j^2 + \sigma_j^2 - 1 - \log\sigma_j^2\big),
$$ {#eq-kl-gauss}

而重建项用一个样本估计，把样本写成 $\mathbf{z} = \boldsymbol\mu + \boldsymbol\sigma\odot\boldsymbol\varepsilon$、$\boldsymbol\varepsilon\sim\Normal(\mathbf{0}, I)$——这就是**重参数化技巧**，它把样本变成关于 $\phi$ 的可微函数。对方差固定的高斯解码器，重建项就是一个平方误差。VAE 的样本通常偏模糊，因为平方误差会对可接受的细节取平均；但下面 VAE 会作为潜在扩散的**自编码器**再度登场，那里只需要它的压缩；而扩散本身原来也是一个用 ELBO 训练的深度隐变量模型。

::: example 手算一项 KL {#ex-kl}
某个编码器对一张图像输出 $\mu = (1, 0)$ 与 $\sigma = (0.5, 1)$。计算 KL 正则项。
::: solution
由[[#eq-kl-gauss]]：第一个坐标给出 $\frac12(1 + 0.25 - 1 - \ln0.25) = \frac12(0.25 + 1.386) = 0.818$；第二个给出 $\frac12(0 + 1 - 1 - 0) = 0$。总和为 $0.818$ 纳特。第二个坐标与先验完全一致，不携带关于图像的任何信息；第一个坐标被平移又被锐化，并为此付出代价。
:::
:::

## 生成对抗网络 {#sec-gan}

生成对抗网络（generative adversarial network，GAN）（Goodfellow 等人，2014）彻底丢掉了似然。**生成器** $G$ 把噪声 $\mathbf{z}$ 映射成图像；**判别器** $D$ 输出其输入为真的概率。二者进行下面的**极小极大博弈**（minimax game）

$$
\min_G\max_D\ \E_{\mathbf{x}\sim p_{\text{data}}}\big[\log D(\mathbf{x})\big] + \E_{\mathbf{z}}\big[\log\big(1 - D(G(\mathbf{z}))\big)\big].
$$ {#eq-gan}

::: proposition 最优判别器 {#prop-gan}
对固定的、样本密度为 $p_g$ 的生成器，[[#eq-gan]]的内层最大值在 $D^\star(\mathbf{x}) = p_{\text{data}}(\mathbf{x})/\big(p_{\text{data}}(\mathbf{x}) + p_g(\mathbf{x})\big)$ 处取得，此时目标等于 $2\,\mathrm{JSD}(p_{\text{data}}\,\|\,p_g) - \log4$，当且仅当 $p_g = p_{\text{data}}$ 时取最小。
:::

::: proof
目标为 $\int\big(p_{\text{data}}(\mathbf{x})\log D(\mathbf{x}) + p_g(\mathbf{x})\log(1 - D(\mathbf{x}))\big)\,d\mathbf{x}$。对每个 $\mathbf{x}$，被积函数 $a\log y + b\log(1 - y)$（$a, b\ge0$）在 $y = a/(a + b)$ 处取最大（令导数 $a/y - b/(1 - y)$ 为零）。代入，记 $m = (p_{\text{data}} + p_g)/2$，得 $\int p_{\text{data}}\log\frac{p_{\text{data}}}{2m} + \int p_g\log\frac{p_g}{2m} = \mathrm{KL}(p_{\text{data}}\|m) + \mathrm{KL}(p_g\|m) - 2\log2$，即 $2\,\mathrm{JSD} - \log4$。詹森–香农（Jensen–Shannon）散度仅在两分布相等时为零。
:::

GAN 只需一次前向传播就能生成锐利的图像，StyleGAN（Karras 等人，2019）生成的面孔让人无法同照片区分。但对抗训练不稳定，GAN 还会**模式坍塌**（mode collapse）——只覆盖数据分布的一部分——这使它们难以扩展到多样的文本条件生成。它们的判别器作为辅助损失存活了下来：[[multimodal/audio-language-models#def-codec]]的音频编解码器与[[#sec-ar]]的图像词元化器都用对抗损失让重建变得锐利。

## 去噪扩散 {#sec-ddpm}

扩散模型（Sohl-Dickstein 等人，2015；Ho 等人，2020）定义一个固定的过程，以许多小步添加高斯噪声来破坏数据，并学习把它逆转过来。

::: definition 前向（加噪）过程 {#def-forward}
选取**噪声调度** $0 < \beta_1 < \dots < \beta_T < 1$，并令 $\alpha_t = 1 - \beta_t$、$\bar\alpha_t = \prod_{s=1}^{t}\alpha_s$。前向过程是马尔可夫链

$$
q(\mathbf{x}_t\mid\mathbf{x}_{t-1}) = \Normal\big(\sqrt{\alpha_t}\,\mathbf{x}_{t-1},\ \beta_tI\big),\qquad t = 1, \dots, T,
$$

从数据点 $\mathbf{x}_0$ 出发。Ho 等人使用 $T = 1000$，$\beta_t$ 从 $10^{-4}$ 线性上升到 $0.02$。
:::

$\sqrt{\alpha_t}$ 这个缩放使方差保持有界：若 $\mathbf{x}_{t-1}$ 每个坐标的方差为 $1$，$\mathbf{x}_t$ 也如此。关键的事实是，可以直接跳到任意一步。

::: proposition 前向过程的封闭形式 {#prop-closed-form}
对每个 $t$，

$$
q(\mathbf{x}_t\mid\mathbf{x}_0) = \Normal\big(\sqrt{\bar\alpha_t}\,\mathbf{x}_0,\ (1 - \bar\alpha_t)I\big),\quad\text{即}\quad \mathbf{x}_t = \sqrt{\bar\alpha_t}\,\mathbf{x}_0 + \sqrt{1 - \bar\alpha_t}\,\boldsymbol\varepsilon,\ \ \boldsymbol\varepsilon\sim\Normal(\mathbf{0}, I).
$$ {#eq-closed-form}
:::

::: proof
对 $t$ 归纳。$t = 1$ 时它就是定义，因为 $\bar\alpha_1 = \alpha_1$ 且 $1 - \alpha_1 = \beta_1$。设 $\mathbf{x}_{t-1} = \sqrt{\bar\alpha_{t-1}}\,\mathbf{x}_0 + \sqrt{1 - \bar\alpha_{t-1}}\,\boldsymbol\varepsilon'$。一步给出 $\mathbf{x}_t = \sqrt{\alpha_t}\,\mathbf{x}_{t-1} + \sqrt{\beta_t}\,\boldsymbol\varepsilon''$，其中 $\boldsymbol\varepsilon''$ 与 $\boldsymbol\varepsilon'$ 独立，于是

$$
\mathbf{x}_t = \sqrt{\alpha_t\bar\alpha_{t-1}}\,\mathbf{x}_0 + \Big(\sqrt{\alpha_t(1 - \bar\alpha_{t-1})}\,\boldsymbol\varepsilon' + \sqrt{\beta_t}\,\boldsymbol\varepsilon''\Big).
$$

方括号中是独立零均值高斯之和，故为高斯，协方差为 $\big(\alpha_t(1 - \bar\alpha_{t-1}) + 1 - \alpha_t\big)I = (1 - \alpha_t\bar\alpha_{t-1})I = (1 - \bar\alpha_t)I$，且 $\sqrt{\alpha_t\bar\alpha_{t-1}} = \sqrt{\bar\alpha_t}$。
:::

当 $\bar\alpha_t\to0$ 时数据被遗忘，$\mathbf{x}_T$ 接近 $\Normal(\mathbf{0}, I)$。**信噪比** $\mathrm{SNR}(t) = \bar\alpha_t/(1 - \bar\alpha_t)$ 从极大单调降到几乎为零。

::: example 线性调度 {#ex-schedule}
对 Ho 等人的调度，$\bar\alpha_{100} = 0.897$、$\bar\alpha_{250} = 0.524$、$\bar\alpha_{500} = 0.0786$、$\bar\alpha_{1000} = 4.04\times10^{-5}$（数值计算）。一个像素值 $x_0 = 0.8$ 以 $\varepsilon = -1$ 加噪。求 $x_{500}$ 与 $t = 500$ 处的 SNR。
::: solution
由[[#eq-closed-form]]，$x_{500} = \sqrt{0.0786}\cdot0.8 + \sqrt{0.9214}\cdot(-1) = 0.280\cdot0.8 - 0.960 = -0.736$。SNR 为 $0.0786/0.9214 = 0.085$：链走到一半，信号的方差已经不到噪声的十分之一。Nichol 与 Dhariwal（2021）认为线性调度破坏信息太快，提出了**余弦调度** $\bar\alpha_t = \cos^2\!\big(\frac{t/T + s}{1 + s}\cdot\frac\pi2\big)/\cos^2\!\big(\frac{s}{1 + s}\cdot\frac\pi2\big)$，其中 $s = 0.008$，它给出 $\bar\alpha_{500} = 0.49$。
:::
:::

::: widget plot
f: exp(-(0.0001*x + 0.0199*x^2/2000)); cos(((x/1000 + 0.008)/1.008)*pi/2)^2/cos((0.008/1.008)*pi/2)^2
x: 0, 1000
y: 0, 1
labels: linear schedule; cosine schedule
caption: $T = 1000$ 时信号系数 $\bar\alpha_t$ 随步数 $t$ 的变化：Ho 等人的线性调度（$\beta$ 从 $10^{-4}$ 到 $0.02$；以精确的近似 $\bar\alpha_t\approx e^{-\sum_s\beta_s}$ 绘制）与 Nichol 和 Dhariwal 的余弦调度。线性调度在链的最后三分之一几乎不留信号，因此许多步花在近乎纯噪声的东西上；余弦调度把破坏摊得更均匀。
:::

::: widget plot
f: 0.3*exp(-(x + 2*sqrt(a))^2/(2*(0.09*a + 1 - a)))/sqrt(2*pi*(0.09*a + 1 - a)) + 0.7*exp(-(x - 1.5*sqrt(a))^2/(2*(0.25*a + 1 - a)))/sqrt(2*pi*(0.25*a + 1 - a))
x: -4, 4
y: 0, 1
sliders: a=1:0.001:1:0.001
labels: $q(x_t)$ for signal level $\bar\alpha_t = a$
caption: 当数据取下面清单使用的混合 $0.3\,\Normal(-2, 0.3^2) + 0.7\,\Normal(1.5, 0.5^2)$ 时 $x_t$ 的边际密度。由[[#prop-closed-form]]，每个分量变成 $\Normal(\sqrt a\,\mu_k, a\sigma_k^2 + 1 - a)$。把 $a$ 从 $1$ 向 $0$ 调低：窄的模式先弥散，两个模式合并，密度趋近 $\Normal(0, 1)$。生成就是把这段影片倒放。
:::

### 反向过程及其目标 {#sec-reverse}

要生成，我们希望采样 $\mathbf{x}_T\sim\Normal(\mathbf{0}, I)$，然后对 $t = T, \dots, 1$ 采样 $\mathbf{x}_{t-1}\sim q(\mathbf{x}_{t-1}\mid\mathbf{x}_t)$。这个反向分布是未知的，但当 $\beta_t$ 很小时它接近高斯，而在给定 $\mathbf{x}_0$ 的条件下恰为高斯：

$$
q(\mathbf{x}_{t-1}\mid\mathbf{x}_t, \mathbf{x}_0) = \Normal\big(\tilde{\boldsymbol\mu}_t(\mathbf{x}_t, \mathbf{x}_0),\ \tilde\beta_tI\big),\quad \tilde{\boldsymbol\mu}_t = \frac{\sqrt{\bar\alpha_{t-1}}\,\beta_t}{1 - \bar\alpha_t}\mathbf{x}_0 + \frac{\sqrt{\alpha_t}(1 - \bar\alpha_{t-1})}{1 - \bar\alpha_t}\mathbf{x}_t,\quad \tilde\beta_t = \frac{1 - \bar\alpha_{t-1}}{1 - \bar\alpha_t}\beta_t
$$ {#eq-posterior}

（习题中经配方法推出）。因此扩散模型以固定方差 $\sigma_t^2$ 学习 $p_\theta(\mathbf{x}_{t-1}\mid\mathbf{x}_t) = \Normal(\boldsymbol\mu_\theta(\mathbf{x}_t, t), \sigma_t^2I)$（Ho 等人用 $\beta_t$ 或 $\tilde\beta_t$）。把[[#eq-closed-form]]中的 $\mathbf{x}_0 = (\mathbf{x}_t - \sqrt{1 - \bar\alpha_t}\,\boldsymbol\varepsilon)/\sqrt{\bar\alpha_t}$ 代入[[#eq-posterior]]，得

$$
\tilde{\boldsymbol\mu}_t = \frac{1}{\sqrt{\alpha_t}}\Big(\mathbf{x}_t - \frac{\beta_t}{\sqrt{1 - \bar\alpha_t}}\,\boldsymbol\varepsilon\Big),
$$ {#eq-mu-eps}

这就提示我们通过一个预测噪声的网络 $\boldsymbol\varepsilon_\theta(\mathbf{x}_t, t)$ 来参数化均值。

::: theorem 扩散 ELBO 是加权的噪声预测损失 {#thm-ddpm-loss}
把 $\mathbf{x}_{1:T}$ 当作隐变量，编码器为 $q(\mathbf{x}_{1:T}\mid\mathbf{x}_0)$，解码器为 $p(\mathbf{x}_T)\prod_tp_\theta(\mathbf{x}_{t-1}\mid\mathbf{x}_t)$。把 $\boldsymbol\mu_\theta$ 写成[[#eq-mu-eps]]的形式，只是以 $\boldsymbol\varepsilon_\theta(\mathbf{x}_t, t)$ 代替 $\boldsymbol\varepsilon$，则负 ELBO 除去与 $\theta$ 无关的项后等于

$$
\sum_{t\ge2}\ \frac{\beta_t^2}{2\sigma_t^2\alpha_t(1 - \bar\alpha_t)}\ \E_{\mathbf{x}_0, \boldsymbol\varepsilon}\Big[\big\lVert\boldsymbol\varepsilon - \boldsymbol\varepsilon_\theta\big(\sqrt{\bar\alpha_t}\,\mathbf{x}_0 + \sqrt{1 - \bar\alpha_t}\,\boldsymbol\varepsilon,\ t\big)\big\rVert^2\Big]\ +\ (\text{对 } t = 1 \text{ 的一项}).
$$
:::

::: proof
对隐变量 $\mathbf{x}_{1:T}$ 应用[[#thm-elbo]]，并用马尔可夫链的贝叶斯公式 $q(\mathbf{x}_t\mid\mathbf{x}_{t-1}) = q(\mathbf{x}_{t-1}\mid\mathbf{x}_t, \mathbf{x}_0)\,q(\mathbf{x}_t\mid\mathbf{x}_0)/q(\mathbf{x}_{t-1}\mid\mathbf{x}_0)$ 重排对数比，负 ELBO 分成三部分：不含参数的 $\mathrm{KL}(q(\mathbf{x}_T\mid\mathbf{x}_0)\|p(\mathbf{x}_T))$、重建项 $-\E\log p_\theta(\mathbf{x}_0\mid\mathbf{x}_1)$，以及 $t\ge2$ 时 $\mathrm{KL}\big(q(\mathbf{x}_{t-1}\mid\mathbf{x}_t, \mathbf{x}_0)\,\|\,p_\theta(\mathbf{x}_{t-1}\mid\mathbf{x}_t)\big)$ 的期望（Ho 等人，2020，附录 A）。每个 KL 中的两个分布都是高斯，第一个协方差为 $\tilde\beta_tI$，第二个为 $\sigma_t^2I$；除去常数，KL 为 $\lVert\tilde{\boldsymbol\mu}_t - \boldsymbol\mu_\theta\rVert^2/(2\sigma_t^2)$。由[[#eq-mu-eps]]及 $\boldsymbol\mu_\theta$ 的对应式，$\tilde{\boldsymbol\mu}_t - \boldsymbol\mu_\theta = -\frac{\beta_t}{\sqrt{\alpha_t}\sqrt{1 - \bar\alpha_t}}(\boldsymbol\varepsilon - \boldsymbol\varepsilon_\theta)$，平方即得所述的权重。最后，由[[#prop-closed-form]]，$\mathbf{x}_t$ 的分布就是 $\sqrt{\bar\alpha_t}\mathbf{x}_0 + \sqrt{1 - \bar\alpha_t}\boldsymbol\varepsilon$。
:::

Ho 等人发现去掉权重反而得到更好的样本：

$$
\mathcal{L}_{\text{simple}}(\theta) = \E_{t\sim\mathcal{U}\{1, \dots, T\},\ \mathbf{x}_0,\ \boldsymbol\varepsilon}\Big[\big\lVert\boldsymbol\varepsilon - \boldsymbol\varepsilon_\theta\big(\sqrt{\bar\alpha_t}\,\mathbf{x}_0 + \sqrt{1 - \bar\alpha_t}\,\boldsymbol\varepsilon,\ t\big)\big\rVert^2\Big].
$$ {#eq-simple}

因此训练就是回归：取一张图像、一个步数和一个噪声样本，用[[#eq-closed-form]]一步给图像加噪，再要网络说出加进去的是什么噪声。由于平方误差的最小化者是条件均值，理想的网络输出 $\E[\boldsymbol\varepsilon\mid\mathbf{x}_t]$；由 Tweedie 公式，这等于 $-\sqrt{1 - \bar\alpha_t}\,\nabla_{\mathbf{x}_t}\log q(\mathbf{x}_t)$，所以噪声预测器同时也是加噪数据分布的**得分函数**（score）的估计——这正是它与 Song 与 Ermon（2019）的得分模型、以及 Song 等人（2021）的随机微分方程观点之间的联系。

::: algorithm DDPM 的训练与采样 {#alg-ddpm}
**训练。** 反复执行：从数据抽 $\mathbf{x}_0$，从 $\{1, \dots, T\}$ 均匀抽 $t$，抽 $\boldsymbol\varepsilon\sim\Normal(\mathbf{0}, I)$；对 $\lVert\boldsymbol\varepsilon - \boldsymbol\varepsilon_\theta(\sqrt{\bar\alpha_t}\mathbf{x}_0 + \sqrt{1 - \bar\alpha_t}\boldsymbol\varepsilon, t)\rVert^2$ 走一步梯度。

**采样。** 抽 $\mathbf{x}_T\sim\Normal(\mathbf{0}, I)$。对 $t = T, \dots, 1$：令 $\mathbf{x}_{t-1} = \frac{1}{\sqrt{\alpha_t}}\big(\mathbf{x}_t - \frac{\beta_t}{\sqrt{1 - \bar\alpha_t}}\boldsymbol\varepsilon_\theta(\mathbf{x}_t, t)\big) + \sigma_t\mathbf{z}$，其中 $\mathbf{z}\sim\Normal(\mathbf{0}, I)$（$t = 1$ 时取 $\mathbf{z} = \mathbf{0}$）。返回 $\mathbf{x}_0$。
:::

**DDIM。** DDPM 采样每一步需要一次网络评估，Ho 等人的模型要 $1000$ 次。Song、Meng 与 Ermon（2021）观察到，目标[[#eq-simple]]只依赖边际分布 $q(\mathbf{x}_t\mid\mathbf{x}_0)$，而有一族非马尔可夫过程共享这些边际分布——所以同一个训练好的网络可以换一个采样器用。这一族中的确定性成员 **DDIM** 先预测干净样本，再沿同一噪声方向移到更早的步 $s < t$：

$$
\hat{\mathbf{x}}_0 = \frac{\mathbf{x}_t - \sqrt{1 - \bar\alpha_t}\,\boldsymbol\varepsilon_\theta(\mathbf{x}_t, t)}{\sqrt{\bar\alpha_t}},\qquad \mathbf{x}_s = \sqrt{\bar\alpha_s}\,\hat{\mathbf{x}}_0 + \sqrt{1 - \bar\alpha_s}\,\boldsymbol\varepsilon_\theta(\mathbf{x}_t, t).
$$ {#eq-ddim}

DDIM 可以跳步——常用 $50$ 步而非 $1000$ 步——并把每个初始噪声映射到一张固定的图像，使生成可复现，还允许在噪声空间中插值。它是某个常微分方程（"概率流 ODE"）的离散化，高阶 ODE 求解器能进一步减少步数。

### 一维扩散模型 {#sec-toy}

下面的清单训练一个噪声预测器——一个单隐层网络，输入为 $(x_t, \sqrt{\bar\alpha_t}, \sqrt{1 - \bar\alpha_t})$，反向传播手写实现——在来自 $0.3\,\Normal(-2, 0.3^2) + 0.7\,\Normal(1.5, 0.5^2)$ 的样本上以 $T = 100$ 步训练，然后用 DDPM 和 DDIM 采样。耗时约一分钟。

```python
import math, random
random.seed(6)

# 数据：两个高斯的混合
def sample_data():
    return random.gauss(-2.0, 0.3) if random.random() < 0.3 else random.gauss(1.5, 0.5)

# 噪声调度：T = 100 步，beta 从 1e-4 线性升到 0.2（链较短，所以 beta 取大些）
T = 100
betas = [1e-4 + (0.2 - 1e-4) * t / (T - 1) for t in range(T)]
abar, p = [], 1.0
for b in betas:
    p *= 1 - b; abar.append(p)

# eps 预测器：MLP，输入为 (x_t, t 的特征)，一个含 H 个 tanh 单元的隐层
H = 64
feats = lambda x, t: [x, math.sqrt(abar[t]), math.sqrt(1 - abar[t]), 1.0]
W1 = [[random.gauss(0, 0.5) for _ in range(4)] for _ in range(H)]
W2 = [random.gauss(0, 0.1) for _ in range(H)]
params = [W1[i][j] for i in range(H) for j in range(4)] + W2[:]
m = [0.0] * len(params); v = [0.0] * len(params)

def forward(x, t):
    f = feats(x, t)
    h = [math.tanh(sum(W1[i][j] * f[j] for j in range(4))) for i in range(H)]
    return sum(W2[i] * h[i] for i in range(H)), f, h

def adam_step(grad, step, lr=3e-3):
    global params
    for k in range(len(params)):
        m[k] = 0.9 * m[k] + 0.1 * grad[k]; v[k] = 0.999 * v[k] + 0.001 * grad[k] ** 2
        params[k] -= lr * (m[k] / (1 - 0.9 ** step)) / (math.sqrt(v[k] / (1 - 0.999 ** step)) + 1e-8)
    for i in range(H):
        for j in range(4): W1[i][j] = params[i * 4 + j]
        W2[i] = params[H * 4 + i]

batch, steps, run = 32, 8000, 0.0
for step in range(1, steps + 1):          # L_simple: E || eps - eps_theta(x_t, t) ||^2
    grad = [0.0] * len(params); loss = 0.0
    for _ in range(batch):
        x0, t, eps = sample_data(), random.randrange(T), random.gauss(0, 1)
        xt = math.sqrt(abar[t]) * x0 + math.sqrt(1 - abar[t]) * eps
        out, f, h = forward(xt, t)
        d = 2 * (out - eps) / batch; loss += (out - eps) ** 2 / batch
        for i in range(H):
            grad[H * 4 + i] += d * h[i]
            g = d * W2[i] * (1 - h[i] ** 2)
            for j in range(4): grad[i * 4 + j] += g * f[j]
    adam_step(grad, step, lr=1e-2 * (1 - step / steps) + 1e-4); run += loss / 2000
    if step % 2000 == 0: print(f"steps {step - 1999}-{step}: mean loss {run:.3f}"); run = 0.0

def ddpm_sample():                         # 祖先采样，sigma_t^2 = beta_t
    x = random.gauss(0, 1)
    for t in reversed(range(T)):
        eps = forward(x, t)[0]
        x = (x - betas[t] / math.sqrt(1 - abar[t]) * eps) / math.sqrt(1 - betas[t])
        if t > 0: x += math.sqrt(betas[t]) * random.gauss(0, 1)
    return x

def ddim_sample(n_steps):                  # 在步骤子序列上的确定性 DDIM
    ts = [round(i * (T - 1) / (n_steps - 1)) for i in range(n_steps)][::-1]
    x = random.gauss(0, 1)
    for k, t in enumerate(ts):
        eps = forward(x, t)[0]
        x0 = (x - math.sqrt(1 - abar[t]) * eps) / math.sqrt(abar[t])
        x0 = max(-4.0, min(4.0, x0))         # 把预测的干净样本裁剪到数据范围
        eps = (x - math.sqrt(abar[t]) * x0) / math.sqrt(1 - abar[t])
        a_prev = abar[ts[k + 1]] if k + 1 < len(ts) else 1.0
        x = math.sqrt(a_prev) * x0 + math.sqrt(1 - a_prev) * eps
    return x

def describe(name, xs):
    left = [x for x in xs if x < 0]; right = [x for x in xs if x >= 0]
    st = lambda s: (sum(s) / len(s), math.sqrt(sum((x - sum(s) / len(s)) ** 2 for x in s) / len(s)))
    (ml, sl), (mr, sr) = st(left), st(right)
    print(f"{name:12s} left mode {len(left) / len(xs):.3f}: mean {ml:+.2f} sd {sl:.2f} | "
          f"right: mean {mr:+.2f} sd {sr:.2f}")

print(f"abar at t = 1, 50, 100: {abar[0]:.4f} {abar[49]:.4f} {abar[-1]:.2e}")
describe("data", [sample_data() for _ in range(2000)])
describe("DDPM 100", [ddpm_sample() for _ in range(2000)])
describe("DDIM 10", [ddim_sample(10) for _ in range(2000)])
describe("DDIM 25", [ddim_sample(25) for _ in range(2000)])
```

```text
steps 1-2000: mean loss 0.305
steps 2001-4000: mean loss 0.284
steps 4001-6000: mean loss 0.281
steps 6001-8000: mean loss 0.277
abar at t = 1, 50, 100: 0.9999 0.0769 2.14e-05
data         left mode 0.302: mean -2.01 sd 0.31 | right: mean +1.51 sd 0.50
DDPM 100     left mode 0.285: mean -1.97 sd 0.38 | right: mean +1.51 sd 0.50
DDIM 10      left mode 0.302: mean -1.53 sd 0.69 | right: mean +1.42 sd 0.52
DDIM 25      left mode 0.301: mean -1.78 sd 0.54 | right: mean +1.50 sd 0.50
```

::: example 解读玩具模型 {#ex-toy}
解读清单的结果。作为参照，这个混合分布的精确噪声预测器 $\E[\varepsilon\mid x_t]$ 可以封闭地计算出来；它的损失为 $0.267$，用它做 DDIM 得到的左模式标准差为 $0.42$（$10$ 步）与 $0.35$（$25$ 步）。
::: solution
训练损失从约 $0.31$ 降到 $0.277$，而可达到的最好值是 $0.267$（损失不可能到零：$t$ 大时噪声无法预测）。纯噪声（$\bar\alpha_{100} = 2\times10^{-5}$）被 $100$ 步 DDPM 变成一个双峰分布，权重几乎正确（$0.285$ 对比 $0.30$）、均值正确、宽模式的展布也正确；只有窄模式出来时偏宽（$0.38$ 对比 $0.30$），那里正是小网络的误差影响最大的地方。用 $10$ 步的 DDIM 权重正确，却把窄模式严重抹开；用 $25$ 步则有所改善。参照数字表明，DDIM 在 $10$ 步时的大部分误差来自**离散化**——沿弯曲路径的大跳跃——而非网络误差，这就是少步采样器要用高阶求解器或蒸馏的原因。
:::
:::

## 引导 {#sec-guidance}

文本生成图像的模型针对描述嵌入 $c$ 学习 $\boldsymbol\varepsilon_\theta(\mathbf{x}_t, t, c)$。直接按训练好的条件模型采样能得到多样的图像，但往往只是松散地遵循描述。**引导**用多样性换保真度。Dhariwal 与 Nichol（2021）用到一个在含噪图像上单独训练的分类器的梯度；Ho 与 Salimans（2022）发现扩散模型可以自我引导。

::: definition 无分类器引导 {#def-cfg}
用一个网络同时做条件训练与无条件训练：在一部分训练样本（通常 $10$–$20\%$）中把 $c$ 换成空词元 $\varnothing$。采样时，取**引导权重** $w\ge0$，用

$$
\tilde{\boldsymbol\varepsilon}_\theta(\mathbf{x}_t, t, c) = (1 + w)\,\boldsymbol\varepsilon_\theta(\mathbf{x}_t, t, c) - w\,\boldsymbol\varepsilon_\theta(\mathbf{x}_t, t, \varnothing)
$$ {#eq-cfg}

代替 $\boldsymbol\varepsilon_\theta$。（许多库写作 $\boldsymbol\varepsilon_\varnothing + s(\boldsymbol\varepsilon_c - \boldsymbol\varepsilon_\varnothing)$，其中 $s = 1 + w$。）
:::

::: proposition 引导在采样什么 {#prop-cfg}
若 $\boldsymbol\varepsilon_\theta(\mathbf{x}_t, t, c) = -\sqrt{1 - \bar\alpha_t}\,\nabla\log p_t(\mathbf{x}_t\mid c)$ 且 $\boldsymbol\varepsilon_\theta(\mathbf{x}_t, t, \varnothing) = -\sqrt{1 - \bar\alpha_t}\,\nabla\log p_t(\mathbf{x}_t)$，则[[#eq-cfg]]是对应 $p_t(\mathbf{x}_t\mid c)\,p_t(c\mid\mathbf{x}_t)^{w}$ 的得分的噪声预测：引导把条件分布锐化，推向那个隐式分类器认为最能代表 $c$ 的图像。
:::

::: proof
由贝叶斯定理 $\log p_t(c\mid\mathbf{x}_t) = \log p_t(\mathbf{x}_t\mid c) - \log p_t(\mathbf{x}_t) + \log p(c)$，于是 $\nabla\log\big[p_t(\mathbf{x}_t\mid c)p_t(c\mid\mathbf{x}_t)^w\big] = (1 + w)\nabla\log p_t(\mathbf{x}_t\mid c) - w\nabla\log p_t(\mathbf{x}_t)$。乘以 $-\sqrt{1 - \bar\alpha_t}$ 就把每个得分变成对应的噪声预测，即[[#eq-cfg]]。
:::

这条命题描述的是理想情形；用学出来的网络、且 $w$ 达几个单位时，引导采样并不精确地采样这个倾斜分布，但直觉成立。$w$ 越大，图像与提示越吻合、看上去越讲究，但变化越少；$w$ 非常大时颜色会过饱和。引导使每步开销翻倍（两次网络评估，通常合在一起批处理）。同样的手法也用在自回归的图像与音频模型里：把条件 logits 与无条件 logits 组合起来。

::: example 手算引导 {#ex-cfg}
在某像素上，条件预测为 $0.5$，无条件预测为 $0.2$。计算 $w = 0$、$1$、$3$ 时的引导预测。
::: solution
$\tilde\varepsilon = (1 + w)\cdot0.5 - w\cdot0.2 = 0.5 + 0.3w$：$0.5$、$0.8$ 与 $1.4$。引导在条件预测之外继续外推、远离无条件预测，外推量为二者之差的 $w$ 倍——也就是描述改变预测的方向。
:::
:::

## 潜在扩散与扩散 Transformer {#sec-latent}

像素空间扩散很贵：众多采样步中的每一步都要在全分辨率下运行一个大网络，而它的大部分容量花在无法察觉的高频细节上。Rombach 等人（2022）把工作拆开。**一个自编码器**用重建损失、感知损失、基于图块的对抗损失和轻量的 KL 或 VQ 正则项一次性训练好，把图像在每个空间维度上压缩 $f$ 倍；扩散模型随后在潜在空间里工作。

::: definition 潜在扩散 {#def-ldm}
设 $\mathcal{E}$ 与 $\mathcal{D}$ 是满足 $\mathcal{D}(\mathcal{E}(\mathbf{x}))\approx\mathbf{x}$ 的编码器与解码器，把 $H\times W\times3$ 的图像映到 $\frac Hf\times\frac Wf\times c$ 的潜在表示。**潜在扩散模型**在 $\mathbf{z}_0 = \mathcal{E}(\mathbf{x})$ 上用[[#eq-simple]]训练 $\boldsymbol\varepsilon_\theta(\mathbf{z}_t, t, c)$，用反向扩散采样 $\mathbf{z}_0$，并返回 $\mathcal{D}(\mathbf{z}_0)$。文本条件经由**交叉注意力**层进入：去噪器的空间特征去注意一个冻结文本编码器的词元嵌入。
:::

Stable Diffusion 是 2022 年公开发布的潜在扩散模型，取 $f = 8$、$c = 4$——一张 $512\times512$ 的图像变成一个 $64\times64\times4$ 的潜在表示——去噪器是一个约 $8.6$ 亿参数的 U-Net，文本编码器用冻结的 CLIP ViT-L/14（[[multimodal/contrastive-learning]]）。Imagen（Saharia 等人，2022）则在低分辨率下对像素做扩散并配以超分辨率阶段，以冻结的 T5-XXL 文本编码器为条件，并发现把文本编码器做大比把去噪器做大更能改善图像与文本的对齐。

::: example 潜在扩散省下多少 {#ex-latent}
比较去噪器要处理的数值个数：一张 $512\times512$ 的 RGB 图像，与它的 Stable Diffusion 潜在表示。若在潜在表示上取图块大小 $2$，Transformer 去噪器会看到多少词元？
::: solution
像素：$512\cdot512\cdot3 = 786{,}432$ 个值；潜在表示：$64\cdot64\cdot4 = 16{,}384$，少 $48$ 倍。取 $2\times2$ 图块，潜在表示变成 $32\cdot32 = 1024$ 个词元，嵌入前每个维数为 $2\cdot2\cdot4 = 16$——序列长度与用 $16$ 像素图块处理 $512$ 像素图像的 ViT 相当（[[multimodal/vision-transformers#def-patch-embedding]]）。
:::
:::

### 扩散 Transformer {#sec-dit}

早期扩散模型的去噪器是带注意力层的卷积 U-Net。Peebles 与 Xie（2023）用**扩散 Transformer**（Diffusion Transformer，DiT）取代它们：把含噪潜在表示切成图块、加上位置嵌入、套用标准 Transformer 模块，再把输出还原成噪声预测。时间步和类别标签通过**自适应层归一化**给每个模块提供条件——LayerNorm 的缩放与平移（以及每条残差分支上的门控）由条件嵌入回归而来，门控初始化为零（"adaLN-Zero"），于是每个模块起初都是恒等映射，与 Flamingo 的门控非常相像（[[multimodal/vision-language-models#prop-gate-init]]）。在 $256\times256$ 的类别条件 ImageNet 上（潜在表示为 $32\times32\times4$），图像质量随 Transformer 单次前向计算量稳定提升，最大的模型 DiT-XL/2 在无分类器引导下达到 FID $2.27$。文本生成图像的 Transformer 随之而来；Stable Diffusion 3（Esser 等人，2024）在同一次注意力操作中拼接文本词元与图像词元、两种模态各用一套权重（"MM-DiT"），并用校正流训练。

### 流匹配 {#sec-flow}

扩散模型固定一个加噪过程，再学习以随机方式或沿弯曲的 ODE 路径逆转它。**流匹配**（Lipman 等人，2023）与**校正流**（Liu 等人，2023）直接学一个 ODE，路径是从噪声到数据的直线。

::: definition 沿直线路径的条件流匹配 {#def-flow}
对数据点 $\mathbf{x}_1$ 与噪声 $\mathbf{x}_0\sim\Normal(\mathbf{0}, I)$，令 $\mathbf{x}_t = (1 - t)\mathbf{x}_0 + t\mathbf{x}_1$，$t\in[0, 1]$，其速度为 $\mathbf{x}_1 - \mathbf{x}_0$。网络 $\mathbf{v}_\theta(\mathbf{x}, t)$ 按下式训练

$$
\mathcal{L}_{\text{FM}}(\theta) = \E_{t\sim\mathcal{U}[0, 1],\ \mathbf{x}_0,\ \mathbf{x}_1}\big\lVert\mathbf{v}_\theta(\mathbf{x}_t, t) - (\mathbf{x}_1 - \mathbf{x}_0)\big\rVert^2,
$$ {#eq-fm}

采样时求解 $d\mathbf{x}/dt = \mathbf{v}_\theta(\mathbf{x}, t)$，从 $t = 0$（噪声）用少数几步欧拉法或高阶方法积分到 $t = 1$。（哪一端是噪声，各家约定不同。）
:::

::: proposition 对条件速度做回归即学到边际场 {#prop-fm}
令 $\mathbf{u}(\mathbf{x}, t) = \E[\mathbf{x}_1 - \mathbf{x}_0\mid\mathbf{x}_t = \mathbf{x}]$。则 $\mathcal{L}_{\text{FM}}(\theta) = \E\lVert\mathbf{v}_\theta(\mathbf{x}_t, t) - \mathbf{u}(\mathbf{x}_t, t)\rVert^2 + C$，其中 $C$ 与 $\theta$ 无关，故最小化者在 $\mathbf{v}_\theta = \mathbf{u}$ 处取得。速度场为 $\mathbf{u}$ 的 ODE 把噪声分布输运到数据分布，且在每个 $t$ 与 $\mathbf{x}_t$ 有相同的边际分布（Lipman 等人，2023；Liu 等人，2023）。
:::

::: proof
记 $\mathbf{y} = \mathbf{x}_1 - \mathbf{x}_0$。展开 $\lVert\mathbf{v} - \mathbf{y}\rVert^2 = \lVert\mathbf{v} - \mathbf{u}\rVert^2 + 2(\mathbf{v} - \mathbf{u})^\top(\mathbf{u} - \mathbf{y}) + \lVert\mathbf{u} - \mathbf{y}\rVert^2$ 并以 $\mathbf{x}_t$ 为条件，交叉项的期望为零，因为 $\E[\mathbf{u} - \mathbf{y}\mid\mathbf{x}_t] = \mathbf{0}$ 而 $\mathbf{v} - \mathbf{u}$ 是 $\mathbf{x}_t$ 的函数。最后一项不含 $\theta$。输运性质就是所引论文中的连续性方程论证，这里只陈述、不证明。
:::

同样的论证说明了为什么 $\mathcal{L}_{\text{simple}}$ 学到的是 $\E[\boldsymbol\varepsilon\mid\mathbf{x}_t]$。条件路径是直的，并不能让边际 ODE 也是直的——从不同噪声样本到不同图像的路径会交叉，平均之后的场因此弯曲——但它们比扩散的路径更直，所以需要更少的积分步；Liu 等人的 "reflow"（回流）程序在（噪声，生成图像）对上重新训练，把它们进一步拉直。

::: warning 扩散模型不会"存起图像再加噪" {#warn-memorise}
一种流行的说法是，扩散模型记住训练图像、再把它们从噪声中恢复出来。模型其实是从含噪输入和步数到噪声估计的一个函数，在数十亿加噪样本上训练；它的采样器把这个函数复合许多次，不同的噪声给出不同的图像，而这些图像一般不在训练集里。但相反的说法——它**从不**复现训练数据——同样是错的：Carlini 等人（2023）从 Stable Diffusion 与 Imagen 中提取出少量被严重重复的训练图像的近乎复制品。记忆化现象罕见、集中在重复的数据上、且可以度量（[[llm-society/privacy-memorisation]]、[[llm-society/copyright-provenance]]）。
:::

## 自回归图像生成 {#sec-ar}

另一条路把图像当作文本。**VQ-VAE**（van den Oord 等人，2017）是在瓶颈处带一个向量量化器的自编码器（[[multimodal/audio-language-models#def-vq]]）：编码器把图像映成 $h\times w$ 的向量网格，每个向量替换为其最近码本条目的索引，解码器再从量化后的网格重建图像。按光栅顺序（raster order）读，这个网格就是 $hw$ 个离散词元的序列，Transformer 可以在文本词元条件下对它做自回归建模。VQGAN（Esser 等人，2021）给词元化器加上感知损失与对抗损失，使 $16\times$ 下采样也能得到锐利的重建。

- **DALL·E**（Ramesh 等人，2021）用一个离散 VAE 把 $256\times256$ 的图像编码成来自 $8192$ 词表的 $32\times32 = 1024$ 个词元，并在"最多 $256$ 个文本词元后接图像词元"的序列上训练一个 $120$ 亿参数的仅解码器 Transformer。
- **Parti**（Yu 等人，2022）用一个基于 ViT 的 VQGAN 词元化器（每张 $256\times256$ 图像 $1024$ 个词元、$8192$ 个码），以及最大达 $200$ 亿参数的编码器–解码器 Transformer：文本进编码器，图像词元由解码器生成；质量——尤其是渲染文字与复杂提示——随规模显著改善。
- **MaskGIT**（Chang 等人，2022）与 Muse（2023）并行生成词元：从完全掩码的网格出发，预测所有词元、保留最有把握的那些、重复几轮——把 BERT 式的掩码建模（[[transformers/architecture-families#def-mlm]]）用于生成。

生成 $1024$ 个词元的自回归需要 $1024$ 个顺序步（带 KV 缓存，[[inference/kv-cache]]），而扩散只需几十次去噪器评估；但它用的正是语言模型的机制，所以能与文本天然地合并在一个模型里——这是 [[multimodal/native-multimodal]] 的主题。量化限制了保真度（词元化器的重建质量给定了上限），而对图像来说光栅顺序是任意的，这催生了由粗到细的"下一尺度"预测（VAR；Tian 等人，2024）这类顺序。

::: quiz
一个文本生成图像的模型自回归地生成 $1024$ 个图像词元，而一个潜在扩散模型用 $30$ 步采样并带无分类器引导。哪种说法正确？
- [ ] 自回归模型需要的顺序网络评估更少。
- [x] 扩散模型需要 $30$ 个顺序步，每步评估去噪器两次（条件与无条件），通常合在一起批处理；自回归模型需要 $1024$ 个顺序步。
- [ ] 无分类器引导不能用于自回归模型。
- [ ] 扩散模型的输出是一串离散词元。
::: solution
扩散在每一步同时细化所有潜在位置；自回归模型每步吐出一个词元。引导使每步的工作量翻倍，但不增加顺序步数，而且通过混合条件与无条件的 logits 也适用于自回归模型。
:::
:::

## 评测图像生成器 {#sec-eval}

::: definition Fréchet Inception 距离 {#def-fid}
用一个固定的 Inception-v3 网络（取其 $2048$ 维池化特征）分别嵌入一组真实图像与一组生成图像，对两组各拟合一个高斯，均值 $\boldsymbol\mu_r$、$\boldsymbol\mu_g$，协方差 $\Sigma_r$、$\Sigma_g$，计算 **FID**（Heusel 等人，2017）：

$$
\mathrm{FID} = \lVert\boldsymbol\mu_r - \boldsymbol\mu_g\rVert^2 + \tr\big(\Sigma_r + \Sigma_g - 2(\Sigma_r\Sigma_g)^{1/2}\big).
$$

越小越好；它是两个拟合高斯之间 Wasserstein-2 距离的平方。
:::

FID 同时度量真实感与多样性，但它依赖样本量、图像分辨率与预处理；其特征来自一个 ImageNet 分类器，对其他内容未必反映人类判断；并且它完全不说明图像是否与其提示相匹配。因此文本生成图像的模型还会用图像与提示的 CLIP 相似度评分（[[multimodal/contrastive-learning#sec-zero-shot]]）、用对生成图像的问答（图中有没有"三个红方块"？），而最重要的是用人类偏好研究——其结果取决于所选的提示与评审者。截至 2026 年，没有任何单一自动指标被认为足够。

::: application 合成图像与出处
照片级的生成让伪造的证据变得廉价：真实人物的合成图像、不曾发生的事件、未经当事人同意的影像。开发者过滤训练数据与提示、拒绝某些请求、给输出加上不可见的水印、附上带签名的出处元数据（C2PA 内容凭证）；检测器则试图识别生成图像。每项措施都有用，却没有哪一项单独靠得住——水印会被削弱、元数据会被剥除、检测器会被绕过。这些问题在 [[llm-society/copyright-provenance#sec-c2pa]] 与 [[llm-society/misinformation]] 中处理，并在 [[multimodal/native-multimodal]] 中就多模态模型再次谈及。
:::

::: history
图像的深生成模型沿几条线索发展：VAE（Kingma 与 Welling；Rezende 等人，2014）、GAN（Goodfellow 等人，2014）（以 BigGAN 与 StyleGAN（2019）为顶峰）、自回归像素模型（PixelRNN 与 PixelCNN，van den Oord 等人，2016）与标准化流。Sohl-Dickstein 等人（2015）提出扩散概率模型；Song 与 Ermon（2019）用退火的 Langevin 采样训练得分模型；Ho、Jain 与 Abbeel（2020）用噪声预测目标使扩散变得有竞争力。随后是 DDIM（2021）、改进的调度（Nichol 与 Dhariwal，2021）、在 ImageNet 上击败 GAN 的引导扩散（Dhariwal 与 Nichol，2021）与 SDE 框架（Song 等人，2021）。文本生成图像从 DALL·E（2021，自回归）走到 GLIDE、DALL·E 2、Imagen、Parti 与潜在扩散（均在 2022 年），其间有无分类器引导（Ho 与 Salimans，2021 年研讨会论文，2022 年正式发表）。扩散 Transformer（Peebles 与 Xie，2023）、流匹配与校正流（2023），以及它们在大型文本生成图像模型中的结合（2024），塑造了截至 2026 年在用的系统；视频生成把同样的方法推广到时空潜在表示。
:::

::: summary
- 证据下界 $\log p(\mathbf{x})\ge\E_q\log p(\mathbf{x}\mid\mathbf{z}) - \mathrm{KL}(q\|p(\mathbf{z}))$ 由贝叶斯定理与吉布斯不等式得出；VAE 用重参数化技巧最大化它。GAN 让生成器与判别器对抗训练，后者的最优解是 $p_{\text{data}}/(p_{\text{data}} + p_g)$。
- DDPM 的前向过程有封闭形式 $\mathbf{x}_t = \sqrt{\bar\alpha_t}\mathbf{x}_0 + \sqrt{1 - \bar\alpha_t}\boldsymbol\varepsilon$；ELBO 化为一个加权的噪声预测损失，实践中不带权重的 $\mathcal{L}_{\text{simple}}$ 效果最好。
- DDPM 以 $T$ 步随机采样；DDIM 以少得多的步数确定性地复用同一个网络；少步采样器会受离散化误差之累。
- 无分类器引导把条件与无条件预测组合成 $(1 + w)\boldsymbol\varepsilon_c - w\boldsymbol\varepsilon_\varnothing$，（理想情况下）从 $p(\mathbf{x}\mid c)p(c\mid\mathbf{x})^w$ 采样。
- 潜在扩散在自编码器的潜在空间里做扩散（$512^2\times3\to64^2\times4$，数值少 $48$ 倍）；DiT 用作用在潜在图块上的 Transformer 取代 U-Net；流匹配对直线路径的速度做回归，学到边际速度场。
- 自回归模型用语言模型的机制生成 VQ 词元（DALL·E、Parti）或并行生成掩码词元（MaskGIT）。
- FID 比较 Inception 特征的高斯拟合；提示对齐与人类偏好需要另行评测。
:::

## 习题

::: exercise 最后还剩多少信号 {level=1 check="4.04e-5"}
对 Ho 等人的线性调度（$T = 1000$，$\beta_t$ 从 $10^{-4}$ 到 $0.02$），数值计算 $\bar\alpha_{1000}$，保留三位有效数字。
::: solution
$\prod_{t=1}^{1000}(1 - \beta_t) = 4.04\times10^{-5}$（一个短循环即可算出；近似 $e^{-\sum\beta_t} = e^{-10.05} = 4.3\times10^{-5}$ 很接近）。信号的标准差被缩放 $\sqrt{\bar\alpha_{1000}} = 0.0064$：图像几乎不剩什么了。
:::
:::

::: exercise 潜在扩散的压缩率 {level=1 check="48"}
一个 $f = 8$、$c = 4$ 的自编码器把一张 RGB 图像的数值个数缩小多少倍？
::: solution
$H W\cdot3/\big((H/8)(W/8)\cdot4\big) = 3\cdot64/4 = 48$。
:::
:::

::: exercise DiT 的词元数 {level=1 check="256"}
DiT-XL/2 在图块大小 $2$、潜在表示为 $32\times32\times4$ 上工作。它处理多少个词元？
::: solution
$(32/2)^2 = 256$ 个词元，每个词元嵌入一个 $2\times2\times4 = 16$ 值的图块。
:::
:::

::: exercise 一个 KL散度 {level=1 check="0.818"}
以纳特计算 $\mathrm{KL}(\Normal(1, 0.5^2)\,\|\,\Normal(0, 1))$，保留三位小数。
::: solution
$\frac12(1 + 0.25 - 1 - \ln0.25) = \frac12(0.25 + 1.3863) = 0.818$。
:::
:::

::: exercise 一步 DDIM {level=2 check="0.997"}
在某一步 $\bar\alpha_t = 0.5$，当前样本为 $x_t = 1$，网络预测 $\hat\varepsilon = 0.6$。计算 $\hat x_0$，并用 DDIM 更新式[[#eq-ddim]]走到 $\bar\alpha_s = 0.8$ 的那一步。给出 $x_s$，保留三位小数。
::: solution
$\hat x_0 = (1 - \sqrt{0.5}\cdot0.6)/\sqrt{0.5} = (1 - 0.4243)/0.7071 = 0.8142$。于是 $x_s = \sqrt{0.8}\cdot0.8142 + \sqrt{0.2}\cdot0.6 = 0.7283 + 0.2683 = 0.997$。样本朝预测的干净值移动，同时保留较少的同一份噪声。
:::
:::

::: exercise 一维的 FID {level=2 check="2"}
在一维情形，FID 化为 $(\mu_r - \mu_g)^2 + \sigma_r^2 + \sigma_g^2 - 2\sigma_r\sigma_g$。对真实特征 $\Normal(0, 1)$ 与生成特征 $\Normal(1, 4)$ 计算它。
::: solution
$(0 - 1)^2 + 1 + 4 - 2\cdot1\cdot2 = 1 + 1 = 2$，即均值差的平方加上标准差差的平方 $(\sigma_r - \sigma_g)^2 = 1$。
:::
:::

::: exercise 更大图像的词元数 {level=1 check="4096"}
一个图像词元化器在每个维度上下采样 $16$ 倍。一张 $1024\times1024$ 的图像变成多少个词元？
::: solution
$(1024/16)^2 = 64^2 = 4096$ 个词元——是 DALL·E 的 $1024$ 的四倍，对光栅顺序的自回归模型就是 $4096$ 个顺序步。
:::
:::

::: exercise 预测 $\mathbf{x}_0$ 还是 $\boldsymbol\varepsilon$ {level=2}
证明预测干净样本的网络 $\hat{\mathbf{x}}_\theta(\mathbf{x}_t, t)$ 与预测噪声的网络可以互相替换，并把损失 $\lVert\boldsymbol\varepsilon - \boldsymbol\varepsilon_\theta\rVert^2$ 用 $\hat{\mathbf{x}}_\theta$ 表示。关于 $\varepsilon$-损失偏重哪些时间步，这说明了什么？
::: solution
由[[#eq-closed-form]]，$\mathbf{x}_t = \sqrt{\bar\alpha_t}\mathbf{x}_0 + \sqrt{1 - \bar\alpha_t}\boldsymbol\varepsilon$，所以噪声预测定义了 $\hat{\mathbf{x}}_\theta = (\mathbf{x}_t - \sqrt{1 - \bar\alpha_t}\boldsymbol\varepsilon_\theta)/\sqrt{\bar\alpha_t}$，反之 $\boldsymbol\varepsilon_\theta = (\mathbf{x}_t - \sqrt{\bar\alpha_t}\hat{\mathbf{x}}_\theta)/\sqrt{1 - \bar\alpha_t}$。于是 $\boldsymbol\varepsilon - \boldsymbol\varepsilon_\theta = \frac{\sqrt{\bar\alpha_t}}{\sqrt{1 - \bar\alpha_t}}(\hat{\mathbf{x}}_\theta - \mathbf{x}_0)$，故 $\lVert\boldsymbol\varepsilon - \boldsymbol\varepsilon_\theta\rVert^2 = \mathrm{SNR}(t)\,\lVert\mathbf{x}_0 - \hat{\mathbf{x}}_\theta\rVert^2$。$\varepsilon$-损失就是以信噪比为权重的 $\mathbf{x}_0$-损失：它重看低噪声的步、轻看高噪声的步。因此，参数化的选择（噪声、干净样本，或"速度" $\sqrt{\bar\alpha_t}\boldsymbol\varepsilon - \sqrt{1 - \bar\alpha_t}\mathbf{x}_0$）与时间步采样的选择，都是在选择损失的权重。
:::
:::

::: exercise 前向后验 {level=3}
推导[[#eq-posterior]]：证明 $q(\mathbf{x}_{t-1}\mid\mathbf{x}_t, \mathbf{x}_0)\propto q(\mathbf{x}_t\mid\mathbf{x}_{t-1})\,q(\mathbf{x}_{t-1}\mid\mathbf{x}_0)$ 是所给均值与方差的高斯分布（单个坐标即可）。
::: solution
由马尔可夫性与贝叶斯定理，$q(x_{t-1}\mid x_t, x_0)\propto q(x_t\mid x_{t-1})\,q(x_{t-1}\mid x_0)$。把它当作 $y = x_{t-1}$ 的函数，右端的对数在常数之外为
$$
-\frac{(x_t - \sqrt{\alpha_t}\,y)^2}{2\beta_t} - \frac{(y - \sqrt{\bar\alpha_{t-1}}\,x_0)^2}{2(1 - \bar\alpha_{t-1})}.
$$
它关于 $y$ 是二次的，所以分布是高斯。$-y^2/2$ 的系数是精度
$$
\frac{\alpha_t}{\beta_t} + \frac{1}{1 - \bar\alpha_{t-1}} = \frac{\alpha_t(1 - \bar\alpha_{t-1}) + \beta_t}{\beta_t(1 - \bar\alpha_{t-1})} = \frac{1 - \bar\alpha_t}{\beta_t(1 - \bar\alpha_{t-1})},
$$
其中用了 $\alpha_t + \beta_t = 1$ 与 $\alpha_t\bar\alpha_{t-1} = \bar\alpha_t$。其倒数是 $\tilde\beta_t = \frac{1 - \bar\alpha_{t-1}}{1 - \bar\alpha_t}\beta_t$。$y$ 的系数为 $\frac{\sqrt{\alpha_t}}{\beta_t}x_t + \frac{\sqrt{\bar\alpha_{t-1}}}{1 - \bar\alpha_{t-1}}x_0$，均值是它的 $\tilde\beta_t$ 倍：
$$
\tilde\mu_t = \frac{\sqrt{\alpha_t}(1 - \bar\alpha_{t-1})}{1 - \bar\alpha_t}x_t + \frac{\sqrt{\bar\alpha_{t-1}}\,\beta_t}{1 - \bar\alpha_t}x_0,
$$
即[[#eq-posterior]]。
:::
:::

::: exercise 高斯上的引导 {level=3}
设 $p(x) = \Normal(0, 1)$、$p(x\mid c) = \Normal(m, s^2)$，其中 $s < 1$，考虑无噪声的情形（$t = 0$）。(a) 证明 $p(x\mid c)\,p(c\mid x)^w\propto p(x\mid c)^{1 + w}p(x)^{-w}$ 是高斯，并求其均值与方差。(b) 代入 $m = 1$、$s = 0.5$、$w = 3$ 求值并解释。
::: solution
(a) $p(c\mid x)\propto p(x\mid c)/p(x)$，所以乘积正比于 $p(x\mid c)^{1 + w}p(x)^{-w}$。其对数为 $-\frac{(1 + w)(x - m)^2}{2s^2} + \frac{wx^2}{2} + \text{const}$，是一个二次函数，精度为 $\lambda = \frac{1 + w}{s^2} - w$，因 $s < 1$ 而为正。$x$ 的系数为 $\frac{(1 + w)m}{s^2}$，故均值为 $\frac{(1 + w)m/s^2}{\lambda}$、方差为 $1/\lambda$。

(b) $\lambda = 4/0.25 - 3 = 13$，方差 $1/13 = 0.077$（标准差 $0.28$，而无引导时为 $0.5$），均值 $(4\cdot1/0.25)/13 = 16/13 = 1.23$。引导既收窄分布，又把它推到条件均值**之外**、远离无条件的那一端：样本变得更像是"是 $c$ 而不是其余"的典型——这就解释了高引导权重下所见的多样性下降与夸张变形。
:::
:::
