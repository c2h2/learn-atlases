[[vision-language-action/imitation-learning]] 结尾提出了一个要求：面向真实示范的策略必须表示动作上的一个*分布*——它有多个分立的峰——而不仅仅是它的均值。[[vision-language-action/action-representations]] 补充了第二个要求：策略应当输出一个连续动作的*分块*——7到14维机械臂的几十个时间步——并且在时间上平滑。对箱的分类分布头能处理多峰性，但每个维度各自为战而且粒度很粗；高斯混合能处理连续取值，但面对含700个数的分块就变得难以驾驭。

来自图像生成的生成式模型能一举解决这两个问题。**扩散模型**学会通过一步步去噪，把随机噪声变成来自数据分布的样本；**流匹配**模型学一个速度场，把噪声沿光滑路径送到数据。两者都不假定分布的形状，都能在数百维上工作，而且都能一次产出整个分块。Diffusion Policy（Chi 等，2023）把扩散带进了视觉运动控制；流匹配则成为 π0（2024）及其后许多 VLA 的动作生成器。本章从头推导这两者，展示它们如何以观测为条件，解释为什么它们的训练目标——都是均方误差——却*不会*把模式平均掉，并算出它们在运行时的代价。

同一套数学在图像生成一侧的内容见 LLM Atlas 的[生成图像](/learn/llm/lesson.php?c=multimodal&l=image-generation)；概率背景在[机器学习中的概率](/learn/llm/lesson.php?c=math-for-ml&l=probability)。

## 采样，而非预测 {#sec-sampling}

记$\mathbf x$为策略必须产出的量——归一化后的动作分块$\mathbf A_t\in\R^{H\times d}$，展平成一个向量——记$\mathbf o$为观测。目标不是函数$\mathbf x = f(\mathbf o)$，而是一个采样器：给定$\mathbf o$时，产出服从专家的$p(\mathbf x\mid\mathbf o)$分布的随机$\mathbf x$的过程。每次调用给出一个说得通的分块；若一半示范从障碍左边绕、一半从右边绕，样本也一半如此。

两种方法构造采样器的方式相同。它们先固定一个简单的**参考分布**（reference distribution），即标准高斯$\mathcal N(\mathbf 0, I)$，再取一条把数据逐渐掺入其中的分布路径。训练教给网络一个沿路径逆向移动的局部法则；采样从高斯噪声出发，反复应用这个法则。

## 去噪扩散 {#sec-ddpm}

::: definition 前向（加噪）过程 {#def-forward}
给定一个干净样本$\mathbf x_0$和一个**噪声调度** $0 < \beta_1 < \dots < \beta_K < 1$，去噪扩散概率模型（denoising diffusion probabilistic model，DDPM；Ho、Jain 与 Abbeel，2020）的**前向过程**是马尔可夫链
$$
\mathbf x_k = \sqrt{1-\beta_k}\,\mathbf x_{k-1} + \sqrt{\beta_k}\,\boldsymbol\epsilon_k,\qquad \boldsymbol\epsilon_k\sim\mathcal N(\mathbf 0, I)\ \text{independent},\qquad k = 1,\dots,K.
$$ {#eq-forward}
记$\alpha_k = 1-\beta_k$、$\bar\alpha_k = \prod_{s=1}^{k}\alpha_s$。
:::

每一步都稍微缩小信号、再加入一点噪声；步数足够多之后，$\mathbf x_0$的信息荡然无存。（我们把$k$用作扩散步数，以便把$t$留给机器人时间。）

::: proposition 加噪样本的封闭形式 {#prop-marginal}
对每个$k$，给定$\mathbf x_0$时的$\mathbf x_k$服从高斯分布：
$$
\mathbf x_k = \sqrt{\bar\alpha_k}\,\mathbf x_0 + \sqrt{1-\bar\alpha_k}\,\boldsymbol\epsilon,\qquad \boldsymbol\epsilon\sim\mathcal N(\mathbf 0, I).
$$ {#eq-marginal}
若$\bar\alpha_K\to0$，则无论数据分布为何，$\mathbf x_K$的分布都趋于$\mathcal N(\mathbf 0, I)$。
:::

::: proof
对$k$归纳。$k = 1$时，[[#eq-forward]] 就是取$\bar\alpha_1 = \alpha_1$的 [[#eq-marginal]]。设$\mathbf x_{k-1} = \sqrt{\bar\alpha_{k-1}}\,\mathbf x_0 + \sqrt{1-\bar\alpha_{k-1}}\,\boldsymbol\epsilon'$，则
$$
\mathbf x_k = \sqrt{\alpha_k\bar\alpha_{k-1}}\,\mathbf x_0 + \sqrt{\alpha_k(1-\bar\alpha_{k-1})}\,\boldsymbol\epsilon' + \sqrt{1-\alpha_k}\,\boldsymbol\epsilon_k .
$$
最后两项是独立的零均值高斯，所以其和是高斯的、协方差为$\bigl(\alpha_k - \alpha_k\bar\alpha_{k-1} + 1 - \alpha_k\bigr)I = (1-\bar\alpha_k)I$，即$\sqrt{1-\bar\alpha_k}\,\boldsymbol\epsilon$，其中$\boldsymbol\epsilon$为标准正态；并且$\alpha_k\bar\alpha_{k-1} = \bar\alpha_k$。至于极限，$\mathbf x_0$的系数趋于0、$\boldsymbol\epsilon$的系数趋于1，所以对方差有限的数据，$\mathbf x_K$依分布收敛于$\boldsymbol\epsilon$。
:::

于是在任意层级$k$都能一行产出训练分块的含噪版本，无需模拟整条链。调度决定信号衰减得多快。Ho 等人用了$K = 1000$，$\beta$从$10^{-4}$线性升到$0.02$，得到$\bar\alpha_{1000} = 4.0\times10^{-5}$。Diffusion Policy 用了“平方余弦”调度（Nichol 与 Dhariwal，2021），$\bar\alpha_k = \cos^2\!\bigl(\frac{k/K+s}{1+s}\frac{\pi}{2}\bigr)/\cos^2\!\bigl(\frac{s}{1+s}\frac{\pi}{2}\bigr)$，取$s = 0.008$、$K = 100$。

::: example 一个噪声调度与一个加噪动作 {#ex-schedule}
(a) 平方余弦调度取$K = 100$时有$\bar\alpha_{10} = 0.972$、$\bar\alpha_{50} = 0.494$、$\bar\alpha_{90} = 0.024$。求每层的信号系数与噪声系数，以及信噪比$\mathrm{SNR} = \bar\alpha/(1-\bar\alpha)$。(b) 归一化后的动作分量$x_0 = 0.50$在$k = 50$处加噪，噪声抽样为$\epsilon = -1.20$。求$x_{50}$，并验证精确知道$\epsilon$时能恢复$x_0$。
::: solution
(a) $k = 10$：$\sqrt{0.972} = 0.986$、$\sqrt{0.028} = 0.167$，SNR $= 34.8$。$k = 50$：$0.703$与$0.711$，SNR $= 0.976$ —— 信号与噪声大致相当。$k = 90$：$0.155$与$0.988$，SNR $= 0.025$ —— 几乎是纯噪声。
(b) $x_{50} = 0.703\times0.50 + 0.711\times(-1.20) = 0.351 - 0.853 = -0.502$。把 [[#eq-marginal]] 反解：$x_0 = (x_{50} - \sqrt{1-\bar\alpha}\,\epsilon)/\sqrt{\bar\alpha} = (-0.502 + 0.853)/0.703 = 0.50$。
检验：数据被归一化到大致单位尺度，所以在$k = 90$处，噪声的标准差（0.99）远压过信号（0.155 × 一个量级为1的数），正如设计所愿。要是动作还留在毫米单位（量级为100的值），即使$k = 90$，相对于1的噪声也仍会留下15的信号 —— 调度永远到不了纯噪声。见下方的警告。
:::
:::

### 反向过程与噪声预测目标 {#sec-reverse}

要生成，就把这条链倒过来跑：从$\mathbf x_K\sim\mathcal N(\mathbf 0, I)$出发，一步步走到$\mathbf x_{K-1}, \dots, \mathbf x_0$。若 [[#eq-marginal]] 中的$\boldsymbol\epsilon$已知，$\mathbf x_0$就能像 [[#ex-schedule]] 那样立刻算出。它当然未知 —— 但可以由网络$\boldsymbol\epsilon_\theta(\mathbf x_k, k)$从$\mathbf x_k$ *估计*出来，网络被训练来预测当初加入的噪声。

::: algorithm DDPM 的训练与采样 {#alg-ddpm}
**训练。** 反复执行：取训练样本$\mathbf x_0$、从$\{1,\dots,K\}$均匀抽一个步数$k$、以及$\boldsymbol\epsilon\sim\mathcal N(\mathbf 0, I)$；按 [[#eq-marginal]] 组装$\mathbf x_k$；对
$$
\mathcal L(\theta) = \bigl\lVert\boldsymbol\epsilon - \boldsymbol\epsilon_\theta(\mathbf x_k, k)\bigr\rVert^2 .
$$ {#eq-eps-loss}
**采样。** 抽取$\mathbf x_K\sim\mathcal N(\mathbf 0, I)$。对$k = K, \dots, 1$：
$$
\mathbf x_{k-1} = \frac{1}{\sqrt{\alpha_k}}\left(\mathbf x_k - \frac{\beta_k}{\sqrt{1-\bar\alpha_k}}\,\boldsymbol\epsilon_\theta(\mathbf x_k, k)\right) + \sigma_k\mathbf z,\qquad \mathbf z\sim\mathcal N(\mathbf 0, I),
$$ {#eq-reverse}
其中$\sigma_k^2 = \beta_k$（最后一步取$\mathbf z = \mathbf 0$）。返回$\mathbf x_0$。
:::

Ho 等人把 [[#eq-eps-loss]] 推导为对数似然变分下界的一个简化、重加权形式，并由高斯后验$q(\mathbf x_{k-1}\mid\mathbf x_k, \mathbf x_0)$推出 [[#eq-reverse]]、把其中的$\mathbf x_0$换成它的估计量；完整推导见上文链接的 LLM Atlas 课程。这里我们只需要关于这个目标函数的一个事实，因为它解释了为什么均方误差回归失败的地方扩散却能成功。

::: proposition 噪声预测器学到了什么 {#prop-tweedie}
在$(\mathbf x_k, k)$的所有函数中，损失 [[#eq-eps-loss]] 在条件均值$\boldsymbol\epsilon^*(\mathbf x_k, k) = \E[\boldsymbol\epsilon\mid\mathbf x_k]$处取到最小。等价地，由此隐含的干净样本估计
$$
\hat{\mathbf x}_0(\mathbf x_k) = \frac{\mathbf x_k - \sqrt{1-\bar\alpha_k}\,\boldsymbol\epsilon^*(\mathbf x_k, k)}{\sqrt{\bar\alpha_k}} = \E[\mathbf x_0\mid\mathbf x_k],
$$ {#eq-x0hat}
就是在层级$k$处给定含噪样本时数据的后验均值。
:::

::: proof
第一句话就是把 [[vision-language-action/imitation-learning#prop-mean]] 用到输入$(\mathbf x_k, k)$、目标$\boldsymbol\epsilon$上。第二句：对 [[#eq-marginal]] 取给定$\mathbf x_k$的条件期望：$\mathbf x_k = \sqrt{\bar\alpha_k}\,\E[\mathbf x_0\mid\mathbf x_k] + \sqrt{1-\bar\alpha_k}\,\E[\boldsymbol\epsilon\mid\mathbf x_k]$，再解出$\E[\mathbf x_0\mid\mathbf x_k]$。
:::

所以扩散网络*就是*一个 MSE 回归器 —— 但回归的是噪声、在每个噪声层级上，而不是动作。高噪声时，$\E[\mathbf x_0\mid\mathbf x_k]$是总均值附近一团模糊的平均，采样器只朝它挪动一点。随着噪声降低，后验集中到离当前样本最近的那个模式，条件均值就变成了那个模式。采样器借助起始噪声与$\sigma_k\mathbf z$项的随机性逐步承诺于某个模式，从不需要输出模式的平均。

::: example 双峰分布的去噪器 {#ex-denoiser}
设干净动作以$\tfrac12$的概率取$x_0 = +1$或$-1$。证明最优去噪器是$\E[x_0\mid x_k] = \tanh\bigl(\sqrt{\bar\alpha_k}\,x_k/(1-\bar\alpha_k)\bigr)$，并在$x_k = 0.3$处对$\bar\alpha_k = 0.1$、$0.5$与$0.99$求值。
::: solution
给定$x_0 = \pm1$时，$x_k\sim\mathcal N(\pm\sqrt{\bar\alpha}, 1-\bar\alpha)$。由贝叶斯公式及相等的先验，
$$
\frac{\Prob(x_0 = 1\mid x_k)}{\Prob(x_0 = -1\mid x_k)} = \exp\!\left(\frac{(x_k+\sqrt{\bar\alpha})^2 - (x_k-\sqrt{\bar\alpha})^2}{2(1-\bar\alpha)}\right) = \exp\!\left(\frac{2\sqrt{\bar\alpha}\,x_k}{1-\bar\alpha}\right),
$$
且$\E[x_0\mid x_k] = \Prob(+1) - \Prob(-1) = \tanh\bigl(\sqrt{\bar\alpha}\,x_k/(1-\bar\alpha)\bigr)$。
在$x_k = 0.3$处：$\bar\alpha = 0.1$给出$\tanh(0.105) = 0.105$ —— 几乎没有任何信息，估计停在均值0附近。$\bar\alpha = 0.5$：$\tanh(0.424) = 0.401$。$\bar\alpha = 0.99$：$\tanh(29.8) = 1.000$ —— 确定模式为$+1$。
检验：在每个噪声层级，估计都介于$-1$与$+1$之间，且在$x_k = 0$处恰好是均值0，那里两个模式等可能；这一点正是随机噪声决定样本去往哪个模式的地方。
:::
:::

::: warning 扩散之前先归一化动作
[[#eq-marginal]] 中的噪声在每个维度上方差都是1。若一个动作维度以毫米计（散布数百），另一个是夹爪开度（散布0.3），调度会在几步之内毁掉夹爪信号，却几乎碰不到位置。训练前先逐维归一化（到$[-1, 1]$，或零均值单位方差），采样后再反归一化；训练与部署必须使用*同一套*统计量；这里的不匹配是策略方向正确而幅度错误的经典原因。
:::

## 以观测为条件 {#sec-conditioning}

策略需要的是$p(\mathbf x\mid\mathbf o)$，不是$p(\mathbf x)$。条件化很简单：把观测作为额外输入喂给网络，$\boldsymbol\epsilon_\theta(\mathbf x_k, k, \mathbf o)$，并在示范提供的对$(\mathbf o, \mathbf x_0)$上训练。[[#prop-tweedie]] 对以$\mathbf o$为条件的所有期望仍然成立，采样时固定$\mathbf o$跑 [[#eq-reverse]] 即可。

**Diffusion Policy**（Chi、Feng、Du、Xu、Cousineau、Burchfiel 与 Song，2023）定下了后来大多数工作沿用的设计选择：

- 生成变量是一个**动作块**（其默认配置中预测时域$T_p = 16$步），执行前$T_a = 8$步后即重新规划，并以最近$T_o = 2$个观测为条件；
- 观测每个策略步编码一次：每个相机一个 ResNet 图像编码器，加上本体感知；编码给去噪器提供条件 —— 在 CNN 变体中通过 **FiLM**（对去噪器各通道做特征级的缩放与平移），在 Transformer 变体中通过从含噪动作词元向观测词元的交叉注意力；
- 去噪器是作用在分块上的1D 时间 U-Net，天然产出平滑的动作序列；
- 训练用100个扩散步，推理时用更少（配合下面的 DDIM 采样器）。

观测只编码一次、然后小去噪器跑很多遍，这是速度的关键：昂贵的部分（图像）不随每个去噪步重复。带扩散或流匹配头的 VLA 同样如此，只是用大型视觉-语言模型充当编码器（[[vision-language-action/vla-architectures]]）。

::: remark 引导
图像生成器常用无分类器引导（classifier-free guidance）：从无条件预测朝条件预测外推，让样本更强地跟随提示词。机器人策略里用得少得多，因为观测条件本身已经很强；使用时它以多样性换取依从性，可能产生夸张的动作。
:::

## 更少的步数：DDIM {#sec-ddim}

采样器 [[#eq-reverse]] 需要$K$次网络评估 —— 100到1000次 —— 对实时控制来说太多了。Song、Meng 与 Ermon（2021）观察到，同一个训练好的网络定义了一族采样器，其中一个确定性的采样器可以跳步。由$\mathbf x_k$，按 [[#eq-x0hat]] 估计$\hat{\mathbf x}_0$、取$\hat{\boldsymbol\epsilon} = \boldsymbol\epsilon_\theta(\mathbf x_k, k)$，再用估计出的噪声对估计量重新加噪，直接跳到任意更早的层级$k' < k$：
$$
\mathbf x_{k'} = \sqrt{\bar\alpha_{k'}}\,\hat{\mathbf x}_0 + \sqrt{1-\bar\alpha_{k'}}\,\hat{\boldsymbol\epsilon} .
$$ {#eq-ddim}
这个 **DDIM** 更新无需重新训练；选好10个层级，就能给出接近100步 DDPM 采样器的样本。每步只用一次网络，所以10步 DDIM 便宜十倍。蒸馏类方法（一致性模型及相关思路）训练一个独立的网络，从噪声一两步到数据；它们被用到过策略上，但不常见。

## 流匹配 {#sec-flow}

扩散是绕道一条随机链才到达确定性采样器的。**流匹配**（Lipman 等人，2023）与**校正流**（Liu、Gong 与 Liu，2023）直接定义路径及其速度。

::: definition 线性插值路径与流匹配损失 {#def-flow}
设$\mathbf x_0\sim\mathcal N(\mathbf 0, I)$是噪声、$\mathbf x_1$是一个数据样本（本节下标与扩散相反：$\tau = 0$是噪声，$\tau = 1$是数据）。**插值路径**为
$$
\mathbf x_\tau = (1-\tau)\,\mathbf x_0 + \tau\,\mathbf x_1,\qquad \tau\in[0,1],
$$ {#eq-path}
沿每条直线的速度为$\mathbf u = \mathbf x_1 - \mathbf x_0$。网络$\mathbf v_\theta(\mathbf x, \tau, \mathbf o)$用**流匹配损失**训练
$$
\mathcal L(\theta) = \E_{\tau, \mathbf x_0, (\mathbf o, \mathbf x_1)}\bigl\lVert\mathbf v_\theta(\mathbf x_\tau, \tau, \mathbf o) - (\mathbf x_1 - \mathbf x_0)\bigr\rVert^2 .
$$ {#eq-fm-loss}
样本由积分 ODE $d\mathbf x/d\tau = \mathbf v_\theta(\mathbf x, \tau, \mathbf o)$产生，从$\tau = 0$处的噪声样本积分到$\tau = 1$。
:::

各家论文对哪一端是噪声、以及符号约定各有不同（例如 π0按它自己对$\tau$的标注写路径）；实质相同。

::: proposition 流匹配损失的极小元 {#prop-fm}
损失 [[#eq-fm-loss]] 在**边际速度场**（marginal velocity field）处取到最小
$$
\mathbf v^*(\mathbf x, \tau, \mathbf o) = \E\bigl[\mathbf x_1 - \mathbf x_0 \mid \mathbf x_\tau = \mathbf x, \mathbf o\bigr] = \frac{\E[\mathbf x_1\mid\mathbf x_\tau = \mathbf x, \mathbf o] - \mathbf x}{1-\tau}\quad(\tau < 1),
$$ {#eq-vstar}
且从$\mathbf x_0\sim\mathcal N(\mathbf 0, I)$出发的$d\mathbf x/d\tau = \mathbf v^*$的解，在每个$\tau$处的分布与 [[#eq-path]] 中的$\mathbf x_\tau$相同；特别地，在$\tau = 1$处服从数据分布。
:::

::: proof
第一个等号又是条件均值性质（[[vision-language-action/imitation-learning#prop-mean]]），输入为$(\mathbf x_\tau, \tau, \mathbf o)$、目标为$\mathbf x_1 - \mathbf x_0$。第二个：由 [[#eq-path]] 得$\mathbf x_0 = (\mathbf x_\tau - \tau\mathbf x_1)/(1-\tau)$，于是$\mathbf x_1 - \mathbf x_0 = (\mathbf x_1 - \mathbf x_\tau)/(1-\tau)$；取给定$\mathbf x_\tau = \mathbf x$的条件期望。
输运性质（这里附带一个梗概陈述；假设条件见 Lipman 等人，2023）：设$p_\tau$是$\mathbf x_\tau$的密度。对检验函数（test function）$\varphi$，$\frac{d}{d\tau}\E[\varphi(\mathbf x_\tau)] = \E[\nabla\varphi(\mathbf x_\tau)\cdot(\mathbf x_1 - \mathbf x_0)] = \E[\nabla\varphi(\mathbf x_\tau)\cdot\mathbf v^*(\mathbf x_\tau, \tau)]$，最后一个等号由塔性质成立。这正是连续性方程$\partial_\tau p_\tau + \nabla\cdot(p_\tau\mathbf v^*) = 0$的弱形式（weak form）。ODE 解的密度满足同一方程、同一初始条件$p_0 = \mathcal N(\mathbf 0, I)$，所以在解唯一（这需要$\mathbf v^*$具有一定正则性）的前提下，两族分布重合。
:::

证明揭示了与扩散相同的机制：网络对某个量做平方误差回归，而这个量的条件均值是*速度*，不是动作。在$\tau = 0$附近，每个样本看到的都是同一团模糊的平均，于是朝数据中部移动；随着$\tau$增大，条件期望$\E[\mathbf x_1\mid\mathbf x_\tau]$锁定到一个模式，速度便把样本送过去。

::: example 手工积分一个双峰流 {#ex-flow}
设数据为$x_1 = \pm1$、等概率（一个动作维度）。(a) 证明$\E[x_1\mid x_\tau = x] = \tanh\bigl(\tau x/(1-\tau)^2\bigr)$。(b) 从噪声样本$x_0 = 0.2$出发，用步长$\Delta\tau = 0.25$的四步欧拉法积分$dx/d\tau = v^*$。
::: solution
(a) 给定$x_1 = \pm1$时，$x_\tau = (1-\tau)x_0 \pm \tau\sim\mathcal N(\pm\tau, (1-\tau)^2)$。后验概率的对数比为$\bigl[(x+\tau)^2 - (x-\tau)^2\bigr]/\bigl(2(1-\tau)^2\bigr) = 2\tau x/(1-\tau)^2$，所以$\E[x_1\mid x] = \tanh\bigl(\tau x/(1-\tau)^2\bigr)$；再由 [[#eq-vstar]] 得$v^* = \bigl(\tanh(\tau x/(1-\tau)^2) - x\bigr)/(1-\tau)$。
(b) $\tau = 0$：$v^* = (0 - 0.2)/1 = -0.200$；$x = 0.2 - 0.25\times0.200 = 0.1500$。
$\tau = 0.25$：$\tanh(0.25\times0.15/0.5625) = \tanh(0.0667) = 0.0666$；$v^* = (0.0666 - 0.15)/0.75 = -0.111$；$x = 0.15 - 0.0278 = 0.1222$。
$\tau = 0.5$：$\tanh(0.5\times0.1222/0.25) = \tanh(0.2444) = 0.2397$；$v^* = (0.2397 - 0.1222)/0.5 = 0.235$；$x = 0.1222 + 0.0588 = 0.1810$。
$\tau = 0.75$：$\tanh(0.75\times0.181/0.0625) = \tanh(2.172) = 0.9743$；$v^* = (0.9743 - 0.1810)/0.25 = 3.173$；$x = 0.1810 + 0.7933 = 0.9743$。
样本终止于$0.974$，接近模式$+1$（精确积分给出$1.000$）。在流的前半程，样本*朝中间*漂移；到$\tau\approx0.5$，后验承诺于$+1$，速度随之变大。噪声样本$-0.1$以同样方式去往$-1$。没有样本终止在0 —— 那是模式的平均。
检验：这里四步就够，因为模式一旦选定，路径几乎笔直；取十步（如 π0那样），误差还会更小。
:::
:::

::: widget slopefield
f: tanh(x*y/((1 - x)^2 + x^2*s^2)) + (x*s^2 - (1 - x))/((1 - x)^2 + x^2*s^2)*(y - x*tanh(x*y/((1 - x)^2 + x^2*s^2)))
x: 0, 1
y: -2.5, 2.5
points: 0, 0.2; 0, -0.1; 0, 1.5; 0, -1.8; 0, 0.6
sliders: s=0.05:0.05:0.5
caption: 一维数据的精确流匹配速度场，数据由两个等权重、位于$\pm1$、标准差为$s$的高斯模式构成；横轴是流时间$\tau$，从噪声（左）到数据（右），纵轴是动作。每条解曲线都始于一个噪声样本、终止于两个模式之一；没有一条终止在0。点击可在$y=0$附近让更多曲线出发，看它们分岔；改用大步长的欧拉法，可见一条几乎笔直的流只需几步。
:::

### 为什么流很快

[[#eq-path]] 的理想流有笔直的*条件*路径（每对$(\mathbf x_0, \mathbf x_1)$由一条直线连接），但*边际*路径在不同对相交处会弯曲，如图中$\tau = 0.5$附近所示。边际路径越直，所需的积分步就越少。实践中流匹配策略大约用5–10步欧拉法，而训练时$\tau$的分布可以向噪声端加权，那里速度最难学（π0正因如此从一个平移的 beta 分布抽取$\tau$）。它与扩散的关系很紧密：以高斯为参考分布、配上合适的调度，扩散与流匹配学到的是等价的量，而 DDIM 正是同一类 ODE 积分器。实际差异在于参数化（噪声还是速度）、调度以及默认步数。

::: quiz
扩散策略与流匹配策略都用均方误差损失训练。为什么它们不会像对动作做 MSE 回归那样，把双峰示范分布的模式平均掉？
- [ ] 因为它们用了更大的网络。
- [x] 因为回归目标是给定噪声层级下的噪声或速度，其条件均值是一个运动方向；样本随着噪声移除承诺于某个模式，输出是一个样本，不是动作的条件均值。
- [ ] 因为它们用似然损失而非 MSE 训练。
::: solution
网络确实是条件均值估计器，但估计的对象是对的：给定当前含噪样本的速度（或噪声）。从随机噪声出发迭代它，产出的是整个分布的样本。相比之下，对动作做 MSE 回归输出的才是动作本身的条件均值。
:::
:::

## 推理代价 {#sec-cost}

生成式策略以网络评估次数为其表达能力付账。产出一个分块的代价是
$$
t_{\mathrm{chunk}} = t_{\mathrm{enc}} + N_{\mathrm{steps}}\,t_{\mathrm{den}},
$$ {#eq-cost}
即观测编码一次，加上每个积分步一次去噪器（或速度网络）。对 Transformer 有一条有用的量级法则：前向一次大约每词元耗费$2P$次浮点运算，其中$P$为参数量（再计入注意力，短序列下它占比很小）；用时即该计算量除以硬件实际达到的吞吐。

::: example 扩散对比流，小模型与大模型 {#ex-cost}
(a) 一个 Diffusion-Policy 风格的控制器有一个$10\,\mathrm{ms}$的图像编码器，以及一个在机器人 GPU 上每次评估耗时$4\,\mathrm{ms}$的 U-Net 去噪器（示意数字）。对每次执行8步、频率10 Hz 的分块，比较100个 DDPM 步与10个 DDIM 步下的分块时间。(b) 一个 VLA 有30亿参数的视觉-语言主干，一次性处理800个词元（三张图像加指令），还有一个3亿参数的动作网络，在10个流步的每一步处理一个含50个动作词元的分块（如 π0，2024）。设实际吞吐为$10^{14}$ FLOP/s，估计每个分块的用时。
::: solution
(a) DDPM：$10 + 100\times4 = 410\,\mathrm{ms}$。DDIM：$10 + 10\times4 = 50\,\mathrm{ms}$。以10 Hz 执行8个动作需$0.8\,\mathrm s$，所以两者原则上都放得下，但 DDPM 版本把半个周期花在计算上，若同步运行，每个分块还要停顿0.41 s；50 ms 则是几乎察觉不到的停顿。
(b) 主干：$2\times3\times10^9\times800 = 4.8\times10^{12}$ FLOP，$48\,\mathrm{ms}$。每步动作网络：$2\times3\times10^8\times50 = 3\times10^{10}$ FLOP，$0.3\,\mathrm{ms}$ —— 再加上从50个动作词元到800个已缓存主干词元的注意力，总量仍很小。十步合计约$3\,\mathrm{ms}$的算术；在这个规模下，实际上 kernel 启动与内存搬运占主导，每步几毫秒才符合现实。总计每个分块$60$–$80\,\mathrm{ms}$量级。
检验：对 VLA 而言积分步便宜，因为动作网络只有主干的十分之一、又跑在少量词元上；代价由观测编码主导，而它只发生一次。这正是把 VLA 拆成大主干与小“动作专家”的原因。
:::
:::

::: example 选择步数 {#ex-steps}
一个流策略在轴孔装配任务上的成功率，在1、2、5、10个积分步下分别测得40%、71%、83%与84%（每个配置60次试验；示意数据）。每步耗时6 ms，编码之后留给一个分块的预算是40 ms。你会采用多少步？还会补做什么测试？
::: solution
预算最多允许$\lfloor40/6\rfloor = 6$步。5步与10步的差距（83%对84%）远小于60次试验下的抽样不确定度（83%的95%区间约为$\pm10$个百分点；[[vision-language-action/policy-evaluation]]），而1步或2步明显更差。用5步（$30\,\mathrm{ms}$），留有余量。然后，若这个余量要紧，再做一次更大规模、交替进行的5对10步 A/B 测试；并检查平滑度（执行轨迹的加加速度，jerk），步数少时它可能先于成功率恶化。
:::
:::

::: history
扩散模型由 Sohl-Dickstein 等人于2015年提出，作为通过逆转非平衡热力学中的扩散过程来学习的一种方式；Ho、Jain 与 Abbeel 的 DDPM（2020）使它在大图像上具备了竞争力，Song 等人则把它与得分匹配和随机微分方程联系起来（2021），同年 DDIM 大幅削减了步数。Janner 等人的 Diffuser（2022）用扩散来规划轨迹；Chi 等人的 Diffusion Policy（2023）在真实与仿真的操作任务上展示了相对早期行为克隆动作头的大幅提升。流匹配与校正流于2022–23年作为更简单、确定性的替代方案出现，π0（Physical Intelligence，2024）把流匹配动作生成器与视觉-语言模型结合，此后众多 VLA 沿用了这一设计。
:::

::: summary
- 生成式策略从$p(\mathbf x\mid\mathbf o)$采样一个动作块，而不是预测单个取值；由此能表示多峰行为。
- DDPM 按$\mathbf x_k = \sqrt{\bar\alpha_k}\mathbf x_0 + \sqrt{1-\bar\alpha_k}\boldsymbol\epsilon$给数据加噪、用 MSE 训练$\boldsymbol\epsilon_\theta$；最优解是$\E[\boldsymbol\epsilon\mid\mathbf x_k]$，等价于每个噪声层级上的后验均值$\E[\mathbf x_0\mid\mathbf x_k]$。
- 采样逐步去噪；随着噪声降低，样本承诺于某一个模式。DDIM 以约10步复用同一个网络。
- 流匹配沿噪声到数据的直线路径回归速度$\mathbf x_1 - \mathbf x_0$；其极小元是边际速度，对应的 ODE 用5–10步欧拉法把噪声送到数据。
- 观测为去噪器提供条件（FiLM、交叉注意力）；每个分块编码一次，小去噪器跑很多遍。
- 代价$\approx t_{\mathrm{enc}} + N_{\mathrm{steps}}t_{\mathrm{den}}$；务必把动作归一化到单位尺度。
:::

## 习题

::: exercise 信号系数 {#exr-signal level=1 check="0.379"}
设$\bar\alpha_k = 0.144$，求 [[#eq-marginal]] 中$\mathbf x_0$的系数。（保留三位有效数字。）
::: solution
$\sqrt{0.144} = 0.379$。噪声系数为$\sqrt{0.856} = 0.925$：这一层下样本基本由噪声构成。
:::
:::

::: exercise 恢复干净动作 {#exr-recover level=1 check="0.4"}
在$\bar\alpha = 0.64$的某一层级，含噪动作分量为$x_k = -0.28$，网络预测$\hat\epsilon = -1.00$。由 [[#eq-x0hat]] 求$\hat x_0$。（输入该值。）
::: solution
$\hat x_0 = (x_k - \sqrt{0.36}\,\hat\epsilon)/\sqrt{0.64} = (-0.28 + 0.60)/0.80 = 0.40$。
:::
:::

::: exercise 预算内的步数 {#exr-budget level=1 check="7"}
某策略的观测编码器耗时22 ms，每次调用去噪器9 ms，分块必须在90 ms 内就绪。去噪步数最多是多少？（输入步数。）
::: solution
$(90 - 22)/9 = 7.6$，所以7步。
:::
:::

::: exercise 累积乘积 {#exr-alphabar level=2 check="0.9900"}
线性调度在$K = 100$步内把$\beta_k$从$10^{-4}$升到$0.02$，求$\bar\alpha_{10}$。（保留四位小数。）
::: solution
$\beta_k = 10^{-4} + (k-1)(0.02 - 10^{-4})/99$，故$\beta_1,\dots,\beta_{10}$从$0.0001$到$0.00191$，总和$0.01005$。于是$\bar\alpha_{10} = \prod(1-\beta_k)\approx e^{-\sum\beta_k} = 0.9900$；精确乘积是$0.98999$。
:::
:::

::: exercise 一个流步 {#exr-flowstep level=2 check="0.664"}
对 [[#ex-flow]] 的双峰数据，在$\tau = 0.5$处从$x = 0.4$出发，用$v^* = (\tanh(\tau x/(1-\tau)^2) - x)/(1-\tau)$迈一步$\Delta\tau = 0.5$的欧拉步。样本到达$\tau = 1$时在哪里？（保留三位小数。）
::: solution
$\tanh(0.5\times0.4/0.25) = \tanh(0.8) = 0.664$；$v^* = (0.664 - 0.4)/0.5 = 0.528$；$x = 0.4 + 0.5\times0.528 = 0.664$。（由 [[#eq-vstar]]，走到$\tau = 1$的一步恰好落在当前估计$\E[x_1\mid x_\tau] = \tanh(0.8)$上。）单个过大的步迈不到模式$+1$：在$\tau = 0.5$处模式的估计仍然模糊，要达到精度就需要更多步。
:::
:::

::: exercise 流的 MSE 目标 {#exr-target level=2}
证明：在只有一个模式的数据上训练的流匹配网络 —— 给定观测时$\mathbf x_1$恒等于固定的$\mathbf a$ —— 学到$\mathbf v^*(\mathbf x, \tau) = (\mathbf a - \mathbf x)/(1-\tau)$，且每条 ODE 解都在$\tau = 1$处到达$\mathbf a$。
::: solution
$\mathbf x_1 = \mathbf a$为确定量时，$\E[\mathbf x_1\mid\mathbf x_\tau] = \mathbf a$，由 [[#eq-vstar]] 得到所述场。ODE $d\mathbf x/d\tau = (\mathbf a - \mathbf x)/(1-\tau)$的解为$\mathbf x(\tau) - \mathbf a = (1-\tau)(\mathbf x_0 - \mathbf a)$（验证：导数为$-(\mathbf x_0 - \mathbf a) = (\mathbf a - \mathbf x)/(1-\tau)$）。在$\tau = 1$处，它对每个起始噪声都等于$\mathbf a$：一条直线，单步欧拉即可精确积分。
:::
:::

::: exercise 中间时刻的后验 {#exr-posterior level=3}
对 [[#ex-flow]] 的双峰数据（模式$\pm1$、等权重），求$x_\tau = 0.1$处的样本最终落入$+1$模式的概率，分别取$\tau = 0.25$、$0.5$与$0.75$。结合流何时“决断”来解读结果。
::: solution
$\Prob(+1\mid x) = \tfrac12\bigl(1 + \tanh(\tau x/(1-\tau)^2)\bigr)$。$\tau = 0.25$：自变量$0.025/0.5625 = 0.0444$，概率$0.522$。$\tau = 0.5$：$0.05/0.25 = 0.2$，概率$0.599$。$\tau = 0.75$：$0.075/0.0625 = 1.2$，概率$0.917$。流的早期，靠近中间的点尚未决断；到$\tau = 0.75$，即使距中间只有0.1的点也几乎已经选定。决断集中在流的中段，这正是训练应向那些时刻加权、且那里不该省积分步的原因。
:::
:::

::: exercise 设计一个生成式动作头 {#exr-design level=3}
贵公司的机械臂跑着50 Hz 的关节控制器；任务（擦桌子）是多峰的（擦拭图案多变），机载 GPU 在观测编码之后给动作生成器每个分块40 ms。请给出分块长度、执行时域、生成器（扩散或流）、步数与条件化方案，并说明你将如何检验这些选择。
::: solution
一个合理的设计：流匹配（或用 DDIM 采样的扩散），分块取$H = 50$个关节目标（50 Hz 下的1 s），每次执行$h = 10$–$25$步，使策略在约0.3–0.6 s 内做出反应；用交叉注意力（CNN 则用 FiLM）把编码后的图像与本体感知作为条件输入速度网络；积分5–10步，按40 ms 预算确定（在目标 GPU 上实测每步耗时）；对每个动作维度做归一化。检验：在固定初始条件集合上的闭环成功率与桌面覆盖；执行轨迹的平滑度（加加速度）；相邻分块之间的模式切换（擦拭图案会不会中途改变？若会，就以前一分块为条件，或取更长的$h$）；对步数做消融。不要在不同样本的分块之间做时间维集成。
:::
:::
