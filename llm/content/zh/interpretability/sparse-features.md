如果一层存储的特征远多于它的维数——正如 [[interpretability/superposition]] 所论证的——那么它的神经元就是错误的分析单位，而正确的单位——特征方向——必须被找出来。叠加图景说清了要找什么：一个过完备的方向集合 $\mathbf{d}_1,\dots,\mathbf{d}_M$，其中 $M$ 远大于层宽 $d$，使得每个激活向量都近似是它们的*稀疏*非负组合。从数据中恢复这样的字典是**稀疏字典学习**（sparse dictionary learning）问题，一个来自信号处理与视觉皮层研究的古老问题。自 2023 年以来，它一直是分解语言模型激活使用最广的方法，经由**稀疏自编码器**（SAE）。

本章定义 SAE 及其训练目标，证明通常的 $L_1$ 惩罚造成的**收缩**（shrinkage），以及迫使对解码器施加约束的退化性，并描述各种修正——top-$k$、门控与 JumpReLU 激活。它讨论**死潜特征**（dead latents）的实际问题，以及用来评估字典的指标：重构误差、把重构拼接回模型时的**下游损失**、以及自动**可解释性得分**。它讲述 SAE 从单层模型（Bricken 等人，2023；Cunningham 等人，2023）到生产模型（Templeton 等人，2024；Gao 等人，2024）的扩展，以及后来的变体——**转码器**（transcoder）、**交叉编码器**（crosscoder）、以及由它们构建的归因图。最后以 2024 年起发表的批评收束：SAE 在若干下游任务上表现不及简单基线——以及相应的回应。实验室在带有植入特征的合成数据上，用纯 Python 训练小型 SAE，并度量它们恢复得如何。

## 稀疏自编码器 {#sec-sae}

设 $\mathbf{x}\in\R^d$ 为某个词元位置上的一个激活向量——某层的残差流、某个 MLP 的输出，或某个注意力层的输出。

::: definition 稀疏自编码器 {#def-sae}
一个带 $M$ 个**潜特征**（latent；即字典的大小；$M/d$ 称为**扩展因子**）的**稀疏自编码器**由一个编码器和一个线性解码器组成，
$$
\mathbf{f}(\mathbf{x}) = \sigma\bigl(W_{\text{enc}}(\mathbf{x} - \mathbf{b}_{\text{dec}}) + \mathbf{b}_{\text{enc}}\bigr)\in\R^M_{\ge0},\qquad
\hat{\mathbf{x}} = W_{\text{dec}}\mathbf{f}(\mathbf{x}) + \mathbf{b}_{\text{dec}} = \mathbf{b}_{\text{dec}} + \sum_{i=1}^Mf_i(\mathbf{x})\,\mathbf{d}_i,
$$
其中 $W_{\text{enc}}\in\R^{M\times d}$，解码器的各列 $\mathbf{d}_i\in\R^d$ 称为**特征方向**，$\sigma$ 是一个非负激活函数（除另有说明外取 ReLU）。它在一大批激活上训练，以最小化
$$
\mathcal{L} = \E_{\mathbf{x}}\Bigl[\lVert\mathbf{x} - \hat{\mathbf{x}}\rVert^2 + \lambda\sum_if_i(\mathbf{x})\,\lVert\mathbf{d}_i\rVert\Bigr],
$$ {#eq-sae}
或者强制 $\lVert\mathbf{d}_i\rVert = 1$ 并使用朴素惩罚 $\lambda\sum_if_i$。非零潜特征的个数 $L_0 = \lvert\{i: f_i(\mathbf{x}) > 0\}\rvert$ 度量稀疏程度。
:::

解码器就是字典；编码器则是对稀疏编码问题“找出最稀疏的非负 $\mathbf{f}$ 使得 $W_{\text{dec}}\mathbf{f}\approx\mathbf{x}$”的一个廉价近似。经典稀疏编码对每个输入都求解那个优化问题；SAE 把它摊销（amortise）成一次线性映射加一个 ReLU，快到足以施加到数十亿个激活上，代价是编码的精度有所损失。$\mathbf{f}$ 的一个坐标就是一个**潜特征**；当它可以解释——它对一类可辨认的输入激发，且它的方向有可辨认的效应——时就被称为一个**特征**，尽管用法并不严格。

::: example SAE 的规模 {#ex-size}
一个扩展因子为 $16$ 的 SAE 在宽度 $d = 4096$ 的残差流上训练。它有多少个潜特征、多少个参数？它的权重用 32 位浮点数存放需要多少内存？
::: solution
$M = 16\times4096 = 65{,}536$ 个潜特征。参数：$W_{\text{enc}}$ 与 $W_{\text{dec}}$ 各有 $4096\times65{,}536$ 个，加上 $\mathbf{b}_{\text{enc}}$（$65{,}536$ 个）与 $\mathbf{b}_{\text{dec}}$（$4096$ 个）：$2\times268{,}435{,}456 + 69{,}632 = 536{,}940{,}544$，约 $5.4$ 亿——仅仅一层就相当于一个小型语言模型的体量。按每个参数 $4$ 字节算，约 $2.1$ GB。已发表的最大字典还要大得多：Templeton 等人（2024）在 Claude 3 Sonnet 的一个中间层上训练了一个约 $3400$ 万潜特征的字典，Gao 等人（2024）则在 GPT-4 的激活上训练了一个 $1600$ 万潜特征的字典。
:::
:::

### 为什么必须控制解码器的范数 {#sec-norm}

[[#eq-sae]] 中的惩罚把每个激活乘上它对应的解码器范数。若不如此，这个目标函数就没有任何值得取的极小值。

::: proposition 无约束的 $L_1$ 目标是退化的 {#prop-degenerate}
设惩罚为 $\lambda\sum_if_i$，而对 $\lVert\mathbf{d}_i\rVert$ 不加约束。对任意 SAE 与任意 $c > 1$，把 $W_{\text{enc}}$ 的第 $i$ 行与 $b_{\text{enc},i}$ 都乘上 $1/c$、把 $\mathbf{d}_i$ 乘上 $c$（对每个 $i$ 都如此），所得的 SAE 有相同的重构，而惩罚变为 $1/c$ 倍。因此目标的下确界等于只含重构误差一项时的下确界，且在激活非零处取不到。
:::

::: proof
ReLU 是正齐次的，$\operatorname{ReLU}(z/c) = \operatorname{ReLU}(z)/c$，于是新的激活是 $f_i/c$，而 $(f_i/c)(c\,\mathbf{d}_i) = f_i\mathbf{d}_i$：重构不变。惩罚变为 $\lambda\sum_if_i/c$。令 $c\to\infty$，就在不改变重构的情况下把惩罚压向 $0$，所以稀疏项在最优点处施加不了任何压力。
:::

因此 Bricken 等人（2023）把解码器各列约束为单位范数（每步之后重新归一化）；后来的方案，包括 Templeton 等人（2024）的方案，改为惩罚 $f_i\lVert\mathbf{d}_i\rVert$，它对重标度不变。无论哪种方式，$f_i$ 此后都度量输入含有方向 $\mathbf{d}_i$ 的分量有多少。

### 收缩 {#sec-shrinkage}

$L_1$ 惩罚让激活变得稀疏，但也让它们系统性地偏小。最简单的情形说明了原因。

::: proposition 软阈值 {#prop-shrink}
设 $\mathbf{d}$ 是单位向量，$\mathbf{x} = a\,\mathbf{d} + \mathbf{r}$ 且 $\mathbf{r}\perp\mathbf{d}$。$\lVert\mathbf{x} - f\mathbf{d}\rVert^2 + \lambda f$ 在 $f\ge0$ 上的最小元是
$$
f^* = \max\bigl(0,\ a - \lambda/2\bigr).
$$ {#eq-soft}
:::

::: proof
因为 $\mathbf{r}\perp\mathbf{d}$ 且 $\lVert\mathbf{d}\rVert = 1$，$\lVert\mathbf{x} - f\mathbf{d}\rVert^2 = (a - f)^2 + \lVert\mathbf{r}\rVert^2$。函数 $g(f) = (a - f)^2 + \lambda f$ 是一条凸抛物线，其导数 $g'(f) = -2(a - f) + \lambda$ 在 $f = a - \lambda/2$ 处为零。若 $a > \lambda/2$，该点可行且就是最小元；否则在 $f > 0$ 上 $g' > 0$，约束最小值在 $f = 0$ 处。
:::

于是（在这个理想化的设定中）每个被激活的潜特征都被削减 $\lambda/2$，而真实激活较小的那些被置为零——这就是统计学中 $L_1$ 惩罚著名的**收缩**（lasso；[[ml-fundamentals/regularisation]]）。重构沿每个特征方向都偏短，而编码器会学到能部分补偿的偏置。截至 2026 年，在用的修正有好几种：

- **top-$k$ SAE**（Makhzani 与 Frey，2013；Gao 等人，2024）去掉惩罚，只保留最大的 $k$ 个预激活，其余置为零；稀疏度由 $k$ 固定，被保留的激活不会被收缩。Gao 等人发现，top-$k$ SAE 在给定的稀疏度下重构更好、缩放更干净，并引入了 **multi-$k$** 训练，使一个字典能在多种稀疏度下工作。
- **门控 SAE**（gated SAE；Rajamanoharan 等人，2024）把一个潜特征*是否*激活的判断（用惩罚训练的门）与它*有多大*（不用惩罚的幅值通路）分离开来。
- **JumpReLU SAE**（Rajamanoharan 等人，2024）使用 $\sigma(z) = z\,[z > \theta_i]$，每个潜特征有一个学出来的阈值，因而激活的潜特征不被收缩，并用直通（straight-through）梯度估计直接训练一个 $L_0$ 惩罚。Gemma Scope（Lieberum 等人，2024）——一套覆盖 Gemma 2 每一层的开放 SAE 套件——用的就是它们。

::: widget plot
f: max(0, x - l/2); x*heaviside(x - l/2); x
x: -0.5, 2
y: -0.2, 2
sliders: l=0:0.1:2
labels: \text{软阈值 } (L_1); \text{硬阈值（JumpReLU 或 top-}k\text{）}; \text{真实值}
caption: 一个理想化 SAE 赋予某输入的激活，该输入沿单一特征方向的真实系数为 $a$（横轴），惩罚为 $\lambda$。$L_1$ 惩罚给出 [[#prop-shrink]] 的软阈值 $\max(0, a - \lambda/2)$：阈值以下特征被漏掉，阈值以上激活偏小 $\lambda/2$。硬阈值（JumpReLU 里的那种，或 top-$k$ 隐含的截断）同样漏掉较小的值，但精确复现较大的值。
:::

::: example 收缩多少？ {#ex-shrink}
特征在场时的真实激活服从 $[0.5, 1.5]$ 上的均匀分布，一个理想化的 $L_1$ SAE 使用 $\lambda = 0.3$。SAE 的激活与真实值之比的平均是多少？当 $\lambda = 1$ 时呢？
::: solution
由 [[#eq-soft]]，当 $a > \lambda/2$ 时 $f^*/a = 1 - \lambda/(2a)$，对这两个值，整个区间 $[0.5, 1.5]$ 都满足该条件。$1/a$ 在 $[0.5, 1.5]$ 上的平均值是 $\int_{0.5}^{1.5}\frac{da}{a} = \ln3 = 1.099$。于是 $\lambda = 0.3$ 时平均比为 $1 - 0.15\times1.099 = 0.835$，$\lambda = 1$ 时为 $1 - 0.5\times1.099 = 0.451$。[[#sec-code]] 中训练出来的 SAE 收缩得比这更多一些（它们的编码器不是最优编码，且一些激活泄漏给了别的潜特征），但趋势相同。
:::
:::

## 训练实践 {#sec-training}

**数据。** SAE 在模型跑过大规模文本语料时收集的激活上训练——大字典通常需要数亿到数十亿词元——常常跨文档打乱顺序。激活通常被归一化到一个固定的平均范数，使超参数能在层与模型之间迁移。

**死潜特征。** 一个在任何输入上预激活都为负的潜特征，从重构项收不到任何梯度，也永远不会复活；称它是**死的**。死潜特征浪费容量，且在大型字典中十分常见——Templeton 等人报告，他们最大的几个 SAE 中有相当比例的潜特征是死的。补救办法包括：定期把死潜特征**重采样**到重构最差的输入上（Bricken 等人，2023）、用解码器的转置来初始化编码器、以及用一个辅助损失要求死潜特征去拟合重构残差（Gao 等人，2024 报告，有了这些措施，即便在 $1600$ 万潜特征时死潜特征也极少）。

**选取 $\lambda$ 或 $k$。** 惩罚强度在稀疏与重构之间权衡。并没有一个“真正”的稀疏度可作为目标，所以字典沿其重构误差对 $L_0$ 的**帕累托前沿**（Pareto frontier）来比较。Gao 等人与 Templeton 等人报告了缩放定律：在稀疏度固定时，重构误差随潜特征个数与训练计算量按幂律下降。

**特征分裂。** 随着字典增大，特征会**分裂**：在小字典里对所有数学文本激发的一个潜特征，在更大的字典里可能变成好几个，分别对应数学的不同分支（Bricken 等人，2023）。分裂意味着不存在唯一正确的字典大小；找到的特征取决于 $M$，并构成某种层级结构。一个相关的失效是**特征吸收**（Chanin 等人，2024）：对应一般特征（“以字母 S 开头”）的潜特征，在某个更具体的潜特征（“词元 *short*”）已经吸收它的输入上不再激发，因为稀疏惩罚奖励用一个潜特征而不是两个。吸收使潜特征作为分类器，不如它们的描述所暗示的那样可靠。

## 评估字典 {#sec-eval}

由于真实特征未知，评估依赖代理指标，而不同的指标可能给字典排出不同的次序。

::: definition 重构与下游指标 {#def-metrics}
对一组激活 $\mathbf{x}$，其均值为 $\bar{\mathbf{x}}$：
- **未解释方差比例**为 $\operatorname{FVU} = \sum\lVert\mathbf{x} - \hat{\mathbf{x}}\rVert^2\big/\sum\lVert\mathbf{x} - \bar{\mathbf{x}}\rVert^2$；
- **下游损失** $\mathcal{L}_{\text{SAE}}$ 是把前向传播中的 $\mathbf{x}$ 换成 $\hat{\mathbf{x}}$ 并让计算继续下去时，语言模型的交叉熵；
- **损失恢复比例**将它与干净损失 $\mathcal{L}_{\text{clean}}$ 以及把该激活消融（置零或置为其均值）后的损失 $\mathcal{L}_{\text{abl}}$ 相比较：
$$
\text{损失恢复} = \frac{\mathcal{L}_{\text{abl}} - \mathcal{L}_{\text{SAE}}}{\mathcal{L}_{\text{abl}} - \mathcal{L}_{\text{clean}}}.
$$
:::

下游损失之所以重要，是因为重构误差在各个方向上的危害并不相同：模型所依赖的方向上一个很小的误差就能让损失升高很多。损失恢复比例很容易被读过头，因为消融基线往往差得离谱；报告绝对增量 $\mathcal{L}_{\text{SAE}} - \mathcal{L}_{\text{clean}}$，或训练出一个达到该损失的模型所需的计算量，信息更多。Gao 等人注意到，把他们的 GPT-4 SAE 的重构拼接进去，使损失升高到了某个水平——按他们的估计——相当于一个只用了 GPT-4 大约 $10\%$ 预训练计算量训练出来的模型——这提醒我们，即便大字典也漏掉了模型所计算之物的一部分。

::: example 损失恢复 {#ex-loss}
某个模型的损失是每词元 $2.30$ 纳特。把某个 SAE 的重构拼接进第 $12$ 层得到 $2.45$；把该层的残差流做置零消融得到 $7.00$。计算损失恢复比例并评论。
::: solution
$(7.00 - 2.45)/(7.00 - 2.30) = 4.55/4.70 = 0.968$。“恢复了 $97\%$ 的损失”听起来近乎完美，但每词元 $0.15$ 纳特的绝对增量是很大的——就语言建模而言，它可能对应一个小得多或训练量少得多的模型。这个比例给 SAE 脸上贴金，因为把残差流置零消融会摧毁几乎全部性能。
:::
:::

**可解释性**由人或语言模型来评估。在**自动可解释性**（automated interpretability；Bills 等人，2023，针对神经元；经 Bricken 等人及其他人改造用于 SAE 潜特征）中，让一个模型看某个潜特征激发最强的那些上下文并写下一段简短解释；第二个模型只根据这段解释，在留出文本上预测该潜特征的激活；**得分**就是预测激活与真实激活之间的相关系数。后来的变体用检测（一个模型能否分辨激发与不激发的样例？）或用干预（引导该潜特征所产生的文本是否与解释相符？）来给解释打分。Bricken 等人与 Cunningham 等人报告，SAE 潜特征的得分显著高于神经元，也高于 PCA 或 ICA 给出的方向。SAEBench（Karvonen 等人，2025）这样的基准收集了许多指标——稀疏探针、特征解耦、吸收、遗忘——并发现重构—稀疏前沿上的改进并不总能转化为这些指标上的改进。

::: example 一个自动可解释性得分 {#ex-autointerp}
某个潜特征在六个词元上的真实激活为 $(0, 0, 3, 1, 0, 5)$。给定解释“在提到河流时激发”，一个模拟器预测 $(0, 1, 2, 1, 0, 4)$。计算相关系数得分。
::: solution
均值：$1.5$ 与 $1.333$。中心化后的乘积之和为 $15.0$；偏差平方和为 $21.5$ 与 $11.333$。Pearson 相关系数为 $15.0/\sqrt{21.5\times11.333} = 15.0/15.61 = 0.961$。得分高只说明这段解释在这些词元上能预测激活；并不说明该潜特征*意味着*河流——模拟器也许在常见情形上表现出色，而该潜特征还会在这六个词元没有包含的、不相关的输入上较弱地激发。
:::
:::

## 从单层模型到生产模型 {#sec-scaling}

**《迈向单义性》**（*Towards Monosemanticity*；Bricken 等人，2023）在一个单层 Transformer 的 $512$ 神经元 MLP 层上训练 SAE，字典规模从 $512$ 到 $131{,}072$ 个潜特征。找到的特征比神经元可解释得多：DNA 序列、阿拉伯文字、base64 字符串、希伯来语文本、HTTP 请求等等，不一而足——由人工与自动分析、以及激发它们时模型输出的变化来检验。他们记录了特征分裂，并发现许多特征在两个独立训练出来的模型中反复出现——一种普适性。独立地，**Cunningham 等人（2023）** 的《稀疏自编码器在语言模型中发现高度可解释的特征》（*Sparse Autoencoders Find Highly Interpretable Features in Language Models*）在 Pythia 模型的残差流上训练 SAE，报告了高于基线分解的自动可解释性得分，并用这些特征把 IOI 任务的组件定位到注意力头所不允许的精度。

**《单义性的规模化》**（*Scaling Monosemanticity*；Templeton 等人，2024）把约 $100$ 万、$400$ 万与 $3400$ 万潜特征的 SAE 用到 Claude 3 Sonnet 中间层的残差流上。这些特征常常是跨语言、跨模态的——一个金门大桥的特征会对几种语言的名称以及这座桥的图片作出反应——而且许多是抽象的：代码漏洞的特征、谄媚赞美的特征、保密与欺骗的特征、危险内容的特征。把特征钳制（clamp）到很大的值，会按其描述的预言改变行为；把金门大桥特征钳到高位后，模型言必提及这座桥，甚至自称就是这座桥（其一个版本曾短暂公开提供）。作者们小心区分这证明了什么、没有证明什么：存在与欺骗有关的特征，并不说明模型是欺骗性的，也不说明模型每次欺骗时都用到了这个特征；他们还估计，自己的字典只捕获了模型所表征概念的一小部分。**Gao 等人（2024）** 的《稀疏自编码器的规模化与评估》（*Scaling and Evaluating Sparse Autoencoders*）引入了 top-$k$ 方案、缩放定律与评估指标，并在 GPT-4 上训练了一个 $1600$ 万潜特征的 SAE。开放套件——Gemma Scope（Lieberum 等人，2024）与 Llama Scope（He 等人，2024）——发布了开放权重模型每一层的 SAE，使这套方法人尽可用。

### 转码器、交叉编码器与归因图 {#sec-variants}

SAE 分解一个激活；它不解释一个层如何*变换*它的输入。各种变体针对这一点。

- **转码器**（transcoder；Dunefsky、Chlenski 与 Nanda，2024）读取一个 MLP 层的输入，并经一个稀疏潜特征层训练去重构该层的*输出*：$\widehat{\text{MLP}}(\mathbf{x}) = W_{\text{dec}}\sigma(W_{\text{enc}}\mathbf{x} + \mathbf{b}_{\text{enc}}) + \mathbf{b}_{\text{dec}}$。用转码器替换 MLP，就把一个稠密的非线性层变成一个更宽而稀疏的层，其潜特征同时具有输入端与输出端的含义，于是从特征到特征的计算变得可以追踪。
- **交叉编码器**（crosscoder；Lindsey 等人，2024）用一个共享字典读取并重构若干层——或若干模型——中的激活。共享的潜特征表征跨层持续存在的特征；在**模型差分**（model diffing）中，在基座模型与其微调版本上训练的交叉编码器能把共享特征与只属于某一个模型的特征分开。
- **跨层转码器与归因图**（Ameisen 等人，2025 的《回路追踪》*Circuit Tracing*；Lindsey 等人，2025 的《大语言模型的生物学》*On the Biology of a Large Language Model*）把模型的每个 MLP 换成可以写入所有后续层的转码器特征，得到一个“替换模型”。对一个给定的提示，**归因图**追踪特征彼此之间、以及特征对输出的影响，并剪枝到最重要的那些路径。对 Claude 3.5 Haiku 的案例研究报告了多项发现，包括：两步事实回忆（“含达拉斯的州的首府”要经过一个得克萨斯特征）、写出一行诗之前先规划好押韵的词、以及算术的实际机制与模型对自己算术的解释不同。作者们强调替换模型与真模型不同——图中包含误差节点，用来容纳转码器漏掉的东西——并且他们报告，在自己尝试的提示中只有少数几个得到了令人满意的洞见。

这些方法把 [[interpretability/circuits]] 的回路纲领从注意力头与神经元转到学出来的特征，并自动化了其中大部分工作；它们的忠实性取决于替换与模型吻合到什么程度（[[interpretability/open-problems]]）。

## 批评与争论现状 {#sec-critiques}

2023–2024 年对 SAE 的热情之后，是拿简单基线做的评估，结论好坏参半，且在某些情形下是负面的。截至 2026 年，已发表的发现包括下列这些。

- **下游任务。** 2025 年 3 月，Google DeepMind 的机制可解释性团队（Smith、Rajamanoharan、Nanda 与合作者）报告：在检测用户提示中的有害意图上，原始激活上的线性探针比 SAE 潜特征上的探针有更强的分布外泛化，并宣布他们正在下调 SAE 基础研究的优先级。Kantamneni 等人（2025）的《稀疏自编码器有用吗？稀疏探针案例研究》（*Are Sparse Autoencoders Useful? A Case Study in Sparse Probing*）在数据稀缺、类别不平衡、标签噪声与协变量偏移之下，跨上百个二分类数据集把基于 SAE 的探针与基线作了比较，发现 SAE 探针并不稳定地胜过基线。
- **引导。** AxBench（Wu 等人，2025）比较了检测与引导概念的各种方法，发现基于 SAE 的引导不及简单基线，包括提示与均值差方向（[[interpretability/causal-interventions]]）。
- **字典唯一吗？** Paulo 与 Belrose（2025）发现，在相同的激活上用不同随机种子训练出来的 SAE，学到的特征集合只有部分重叠；Heap 等人（2025）发现，在随机初始化的 Transformer 上训练的 SAE，其潜特征的自动可解释性得分与训练好的模型所得的相当——这提示一部分表面上的可解释性反映的是数据或方法，而不是模型的计算。
- **暗物质。** Engels 等人（2024）发现，SAE 重构误差的相当一部分可以由激活本身预测出来，这部分“暗物质”随字典增大只缓慢减少，由此引出一个问题：稀疏字典究竟能捕获模型计算的多大一部分。

也有正面的证据。Marks 等人（2024）的《稀疏特征回路》（*Sparse Feature Circuits*）用 SAE 特征寻找回路，并通过消融负有责任的相关特征，移除了一个分类器对虚假性别线索的依赖（他们称之为 SHIFT 的方法）——这需要一个可解释的单位才能奏效。在 Marks 等人（2025）报告的**审计博弈**中，一个模型被刻意带着隐藏目标训练，若干团队受要求去发现它；能接触 SAE 的团队成功了，尽管论文也报告某些非可解释性方法（如搜索训练数据）同样有效，而博弈的小规模限制了结论。而建立在稀疏字典之上的归因图，则产生了上文那些案例研究。

双方的立场可以公允地概括如下。批评者主张：在有明确目标的任务上——分类、检测、引导——SAE 没有胜过更便宜的基线，所以它们的价值还没能在可度量之处得到证明。支持者主张：SAE 的主要目的是*无监督发现*——找到没有人想到要去找的特征与机制，而这从构造上就是有监督基线做不到的——并且这些方法还年轻，仍在改进。双方都同意：不应不加批判地把 SAE 潜特征等同于“模型的特征”，并且论断需要和任何其它可解释性结果一样的因果验证。

::: warning 潜特征的描述是一个假说
被自动解释器标为“欺骗”的潜特征，是一个方向：在所检查的样例上，它在解释器描述为欺骗的文本上激活过。它可能对别的东西也激发，可能在某些欺骗文本上不激发（吸收），可能在更大的字典里分裂成几个潜特征，也可能在不同训练种子之间有所不同。在把一个潜特征用作检测器或引导把手之前，先检验它：对着有标签的数据度量精确率与召回率，与线性探针基线比较，并通过干预检验它的因果效应。
:::

::: quiz
一个带 $L_1$ 惩罚的 SAE 以低误差重构激活，但在只有一个已知特征激活的输入上，其潜特征的激活系统性地比该特征的真实强度小约 $25\%$。最可能的原因是什么？哪种改动能解决问题？
- [ ] 死潜特征；把它们重采样。
- [ ] 扩展因子太小；把 $M$ 加倍。
- [x] $L_1$ 惩罚造成的收缩；改用 top-$k$ 或 JumpReLU 激活（或去掉惩罚来微调幅值）。
- [ ] 特征分裂；训练一个更小的字典。
::: solution
$L_1$ 惩罚把每个激活的潜特征削减大约 $\lambda/2$（[[#prop-shrink]]）。top-$k$、JumpReLU 与门控 SAE 把*哪些*潜特征激活与它们*有多大*解耦，从而消除收缩。死潜特征、字典大小与分裂影响的是找到哪些特征，而不是对幅值的一致低估。
:::
:::

## 一个数值实验室 {#sec-code}

清单合成地造出带已知特征的“激活”：$\R^8$ 中 $12$ 个随机单位方向（叠加：特征比维数还多），每个以 $0.06$ 的概率激活、强度服从 $[0.5, 1.5]$ 上的均匀分布，再加一点噪声。它用纯 Python 与 Adam 训练三个 $L_1$ SAE——$16$ 个潜特征、解码器各行单位范数、$\lambda = 0.1$、$0.3$ 与 $1.0$——以及一个 $k = 2$ 的 top-$k$ SAE。对每一个，它报告 FVU、平均 $L_0$、激发过的潜特征个数、恢复了多少个真实特征（某个解码器方向与它的余弦 $> 0.95$），以及在只有一个特征激活的输入上，最匹配的潜特征的激活与真实强度之比的平均值。运行约需半分钟。

```python
import math, random
rng = random.Random(6)

# 合成激活：NF = 12 个真值特征叠加在 D = 8 个维度中。
D, NF, P = 8, 12, 0.06                 # 每个特征以 0.06 的概率激活
def unit(v): s = math.sqrt(sum(a * a for a in v)); return [a / s for a in v]
true_dirs = [unit([rng.gauss(0, 1) for _ in range(D)]) for _ in range(NF)]      # (NF, D)
def sample():
    c = [rng.uniform(0.5, 1.5) if rng.random() < P else 0.0 for _ in range(NF)]   # 真值编码
    x = [sum(c[i] * true_dirs[i][k] for i in range(NF)) + rng.gauss(0, 0.01) for k in range(D)]
    return x, c
data = [sample() for _ in range(6000)]
test = [sample() for _ in range(2000)]

def train_sae(M=16, mode="l1", lam=0.3, k=2, epochs=20, lr=3e-3, batch=32, seed=0):
    """f = act(W_enc (x - b_dec) + b_enc), x_hat = W_dec^T f + b_dec, decoder rows of unit norm.
    mode 'l1': act = ReLU, loss |x - x_hat|^2 + lam * sum(f);  mode 'topk': keep the k largest."""
    r = random.Random(seed)
    Wd = [unit([r.gauss(0, 1) for _ in range(D)]) for _ in range(M)]      # (M, D) 解码器各行
    We = [row[:] for row in Wd]                                            # 初始化时令编码器 = 解码器的转置
    be, bd = [0.0] * M, [0.0] * D
    mom = {name: [[0.0] * D for _ in range(M)] for name in ("We", "Wd")}
    var = {name: [[0.0] * D for _ in range(M)] for name in ("We", "Wd")}
    mbe, vbe, mbd, vbd = [0.0] * M, [0.0] * M, [0.0] * D, [0.0] * D
    t = 0
    def adam(val, g, mo, va, j):
        mo[j] = 0.9 * mo[j] + 0.1 * g; va[j] = 0.999 * va[j] + 0.001 * g * g
        return val - lr * (mo[j] / (1 - 0.9 ** t)) / (math.sqrt(va[j] / (1 - 0.999 ** t)) + 1e-8)
    def encode(x):
        xc = [a - b for a, b in zip(x, bd)]
        pre = [sum(w * v for w, v in zip(We[i], xc)) + be[i] for i in range(M)]
        if mode == "topk":
            keep = set(sorted(range(M), key=lambda i: -pre[i])[:k])
            pre = [z if i in keep else 0.0 for i, z in enumerate(pre)]
        return xc, [max(0.0, z) for z in pre]
    def decode(f): return [sum(f[i] * Wd[i][j] for i in range(M)) + bd[j] for j in range(D)]
    for _ in range(epochs):
        r.shuffle(data)
        for s in range(0, len(data), batch):
            t += 1
            gWe = [[0.0] * D for _ in range(M)]; gWd = [[0.0] * D for _ in range(M)]
            gbe, gbd = [0.0] * M, [0.0] * D
            for x, _ in data[s:s + batch]:
                xc, f = encode(x)
                e = [2 * (a - b) / batch for a, b in zip(decode(f), x)]       # dLoss/dx_hat
                for j in range(D): gbd[j] += e[j]
                for i in range(M):
                    if f[i] > 0:
                        gf = sum(e[j] * Wd[i][j] for j in range(D)) + (lam / batch if mode == "l1" else 0.0)
                        for j in range(D):
                            gWd[i][j] += e[j] * f[i]; gWe[i][j] += gf * xc[j]
                        gbe[i] += gf
            for i in range(M):
                for j in range(D):
                    We[i][j] = adam(We[i][j], gWe[i][j], mom["We"][i], var["We"][i], j)
                    Wd[i][j] = adam(Wd[i][j], gWd[i][j], mom["Wd"][i], var["Wd"][i], j)
                be[i] = adam(be[i], gbe[i], mbe, vbe, i)
                Wd[i] = unit(Wd[i])                                        # 投影回单位范数
            for j in range(D): bd[j] = adam(bd[j], gbd[j], mbd, vbd, j)
    return encode, decode, Wd

def report(name, enc, dec, Wd):
    codes = [enc(x)[1] for x, _ in test]
    sse = sum(sum((a - b) ** 2 for a, b in zip(dec(f), x)) for f, (x, _) in zip(codes, test))
    mean = [sum(x[j] for x, _ in test) / len(test) for j in range(D)]
    sst = sum(sum((a - m) ** 2 for a, m in zip(x, mean)) for x, _ in test)
    l0 = sum(sum(v > 0 for v in f) for f in codes) / len(test)
    alive = [i for i in range(len(Wd)) if any(f[i] > 0 for f in codes)]
    cos = lambda u, v: sum(a * b for a, b in zip(u, v))
    best = [max(alive, key=lambda i: cos(td, Wd[i])) for td in true_dirs]   # 每个特征的最佳匹配潜特征
    match = [cos(td, Wd[i]) for td, i in zip(true_dirs, best)]
    ratios = [f[best[j]] / c[j] for f, (_, c) in zip(codes, test)          # 只有一个特征激活的输入
              for j in range(NF) if c[j] > 0 and sum(v > 0 for v in c) == 1]
    print(f"{name}: FVU {sse / sst:.3f}, L0 {l0:.2f}, alive {len(alive)}/{len(Wd)}, "
          f"recovered {sum(m > 0.95 for m in match)}/{NF} (worst cos {min(match):.3f}), "
          f"activation/true {sum(ratios) / len(ratios):.3f}")

print(f"true L0 per input: {sum(sum(v > 0 for v in c) for _, c in test) / len(test):.2f}")
for lam in [0.1, 0.3, 1.0]:
    report(f"L1 SAE, lambda={lam}", *train_sae(mode="l1", lam=lam))
report("top-k SAE, k=2     ", *train_sae(mode="topk", k=2))
```

```text
true L0 per input: 0.72
L1 SAE, lambda=0.1: FVU 0.024, L0 1.96, alive 16/16, recovered 8/12 (worst cos 0.793), activation/true 0.751
L1 SAE, lambda=0.3: FVU 0.057, L0 1.22, alive 16/16, recovered 12/12 (worst cos 0.965), activation/true 0.741
L1 SAE, lambda=1.0: FVU 0.310, L0 0.86, alive 16/16, recovered 11/12 (worst cos 0.920), activation/true 0.381
top-k SAE, k=2     : FVU 0.068, L0 1.99, alive 14/16, recovered 9/12 (worst cos 0.768), activation/true 0.933
```

这些结果说明了本章的主要观点。光看重构是个很差的指南：FVU *最好*的 SAE（$\lambda = 0.1$）最不稀疏，只恢复了 $12$ 个植入特征中的 $8$ 个，把它的潜特征花在了组合上；在 $\lambda = 0.3$ 时 $12$ 个全部恢复，代价是更高的 FVU。惩罚太强（$\lambda = 1$）则丢掉重构，并把激活收缩到真实值的 $38\%$，与 [[#ex-shrink]] 相符。top-$k$ SAE 几乎不收缩（$93\%$），但在 $k = 2$ 下，它在大多只有零个或一个特征激活的输入上用了两个潜特征，恢复的特征更少，还有两个死潜特征。真实的激活没有植入的特征可供对照，这就是评估困难的原因。

::: history
Olshausen 与 Field（1996）对自然图像的稀疏编码表明，用稀疏惩罚学到的过完备字典能给出与视觉皮层相似的接受野；随后出现了 K-SVD（Aharon、Elad 与 Bruckstein，2006）这样的字典学习算法，而 lasso（Tibshirani，1996）让 $L_1$ 收缩在统计学中广为人知。Makhzani 与 Frey（2013）引入了 $k$-稀疏自编码器。Arora 等人（2018）与 Yun 等人（2021）把稀疏编码用于词嵌入与 Transformer 激活。2023 年，Bricken 等人（《迈向单义性》）与 Cunningham 等人确立了 SAE 在语言模型可解释性中的地位；2024 年，Templeton 等人把它扩展到 Claude 3 Sonnet，Gao 等人用 top-$k$ SAE 扩展到 GPT-4，Rajamanoharan 等人引入了门控与 JumpReLU SAE，Lieberum 等人发布了 Gemma Scope，Dunefsky 等人提出了转码器，Lindsey 等人提出了交叉编码器，Marks 等人提出了稀疏特征回路。Ameisen 等人与 Lindsey 等人（2025）用跨层转码器构建了归因图。从 2024 年末起，对照基线的评估——来自 Google DeepMind 的团队、Kantamneni 等人、Wu 等人（AxBench）、Paulo 与 Belrose、Heap 等人以及 SAEBench 的作者们——让各种主张降温，关于这套方法是否有用的争论仍在继续。
:::

::: summary
- **稀疏自编码器**把一个激活编码进许多非负潜特征，$\mathbf{f} = \operatorname{ReLU}(W_{\text{enc}}(\mathbf{x} - \mathbf{b}_{\text{dec}}) + \mathbf{b}_{\text{enc}})$，并解码为 $\hat{\mathbf{x}} = W_{\text{dec}}\mathbf{f} + \mathbf{b}_{\text{dec}}$，以重构加稀疏性训练；解码器各列是特征方向。
- 不控制解码器范数时，$L_1$ 目标是**退化的**；控制之后，$L_1$ 惩罚把激活**收缩**约 $\lambda/2$（软阈值）。**top-$k$**、**门控**与 **JumpReLU** SAE 可避免收缩。
- 实践中的问题：**死潜特征**、沿帕累托前沿选取稀疏度、随字典大小的**特征分裂**、以及**特征吸收**。
- 评估用到 FVU、$L_0$、把重构拼接进去后的**下游损失**（看绝对增量，而非只看“损失恢复”）、自动**可解释性得分**、以及基准套件；各个代理指标互不一致。
- SAE 从单层模型扩展到 Claude 3 Sonnet 与 GPT-4，发现了抽象的、跨语言的、可引导的特征；**转码器**、**交叉编码器**与**归因图**把它们扩展到跨层的计算。
- 截至 2026 年，SAE 在若干有监督的下游任务（探针、引导）上不及简单基线，并表现出种子依赖与暗物质问题；支持者强调无监督发现与审计。潜特征的描述是待检验的假说。
:::

## 习题

::: exercise 数参数 {level=1 check="134252544"}
一个在宽度 $d = 2048$ 的残差流上、有 $M = 32{,}768$ 个潜特征的 SAE 有多少个参数（两个权重矩阵与两个偏置）？
::: solution
每个权重矩阵有 $2048\times32{,}768 = 67{,}108{,}864$ 个元素，两个合计 $134{,}217{,}728$；偏置再加 $32{,}768 + 2048 = 34{,}816$。总数是 $134{,}252{,}544$。
:::
:::

::: exercise 软阈值 {level=1 check="0.55"}
某个输入沿一个单位特征方向的系数为 $a = 0.8$。$\lambda = 0.5$ 的最优 $L_1$ 编码给出多少激活？能被检测到的最小系数是多少？
::: solution
$f^* = 0.8 - 0.25 = 0.55$。不超过 $\lambda/2 = 0.25$ 的系数都使 $f^* = 0$，所以能被检测到的系数是任何大于 $0.25$ 的值。
:::
:::

::: exercise 未解释方差比例 {level=1 check="0.05"}
在测试集上，激活对其均值的偏差平方和为 $400$，SAE 的重构误差平方和为 $20$。计算 FVU。
::: solution
$20/400 = 0.05$：这个 SAE 解释了 $95\%$ 的方差。
:::
:::

::: exercise 损失恢复对比损失增量 {level=2}
同一层上的两个 SAE 给出下游损失 $2.36$ 与 $2.52$；干净损失为 $2.30$，均值消融损失为 $3.10$。分别计算两者的损失恢复比例，并解释当基线换成 $8.0$ 的置零消融时，这一比较为何可能看起来不同。
::: solution
用均值消融基线：$(3.10 - 2.36)/(3.10 - 2.30) = 0.925$ 与 $(3.10 - 2.52)/0.80 = 0.725$。用置零消融：$(8.0 - 2.36)/5.7 = 0.989$ 与 $(8.0 - 2.52)/5.7 = 0.961$。绝对增量 $0.06$ 与 $0.22$ 纳特在两种情形下都相同；只有基线改变了比值，而更苛刻的基线会把比值压缩向 $1$。报告比值时请一并报告绝对增量，并说明用的是哪种消融。
:::
:::

::: exercise 带解码器范数的惩罚 {level=2}
证明惩罚 $\sum_if_i\lVert\mathbf{d}_i\rVert$ 在 [[#prop-degenerate]] 的重标度下不变，并且用它最小化 [[#eq-sae]] 等价于最小化带单位范数约束的目标。
::: solution
在重标度 $f_i\to f_i/c$、$\mathbf{d}_i\to c\,\mathbf{d}_i$ 之下，乘积 $f_i\lVert\mathbf{d}_i\rVert\to(f_i/c)(c\lVert\mathbf{d}_i\rVert) = f_i\lVert\mathbf{d}_i\rVert$，且重构不变，所以目标不变。给定任意 SAE，把每个潜特征按 $c_i = 1/\lVert\mathbf{d}_i\rVert$（当 $\mathbf{d}_i\ne\mathbf{0}$）重标度；这既不改变重构也不改变惩罚，并产生单位范数的解码器列，其惩罚为 $\sum_if_i$。于是加范数权目标的每个取值都由某个单位范数 SAE 达到，且约束目标取值相同，反之亦然；两个问题有相同的最优值与相对应的最小元。
:::
:::

::: exercise 一个 top-k 编码器 {level=2}
某个 SAE 在一个输入上的预激活为 $(2.1, -0.3, 0.9, 1.7, 0.2)$。给出 ReLU SAE、top-$2$ SAE、以及每个潜特征阈值 $\theta = 1$ 的 JumpReLU SAE 的潜特征激活。哪些给出 $L_0 = 2$？
::: solution
ReLU：$(2.1, 0, 0.9, 1.7, 0.2)$，$L_0 = 4$。top-$2$：保留最大的两个，$(2.1, 0, 0, 1.7, 0)$，$L_0 = 2$。JumpReLU：$z\,[z > 1]$ 给出 $(2.1, 0, 0, 1.7, 0)$，$L_0 = 2$。top-$k$ 固定每个输入激活的潜特征个数；JumpReLU 固定每个潜特征的阈值，所以它的 $L_0$ 随输入而变。
:::
:::

::: exercise 吸收 {level=3}
考虑两个二值特征：$g$ = “词元以 S 开头”（在 $10\%$ 的词元上出现）与 $s$ = “词元是 *short*”（在 $0.1\%$ 上出现，且总是与 $g$ 一同出现）。它们的方向是 $\mathbf{u}_g$ 与 $\mathbf{u}_s$，而在 *short* 上激活为 $\mathbf{u}_g + \mathbf{u}_s$。一个 SAE 有一个对应 $g$、方向为 $\mathbf{u}_g$ 的潜特征，以及另一个潜特征。比较 (a) 潜特征 2 方向为 $\mathbf{u}_s$、两个潜特征都在 *short* 上激发，与 (b) 潜特征 2 方向为 $(\mathbf{u}_g + \mathbf{u}_s)/\lVert\mathbf{u}_g + \mathbf{u}_s\rVert$、只在 *short* 上单独激发，两者的 $L_1$ 代价，假设 $\mathbf{u}_g\perp\mathbf{u}_s$、范数为单位、两种情形都精确重构。(b) 对 $g$ 潜特征作为分类器意味着什么？
::: solution
(a) 在 *short* 上，$f_g = 1$ 且 $f_s = 1$：惩罚 $2\lambda$。(b) 潜特征 2 的方向是 $(\mathbf{u}_g + \mathbf{u}_s)/\sqrt2$，且 $f_2 = \sqrt2$ 在 $f_g = 0$ 之下精确重构：惩罚 $\sqrt2\lambda\approx1.41\lambda$。稀疏惩罚偏爱 (b)，其中具体的潜特征**吸收**了一般特征。于是 $g$ 潜特征在 *short* 上不激发：作为“以 S 开头”的检测器，凡有更具体的潜特征吸收过的地方它就有漏洞，所以它的召回率低于它的描述所暗示的水平——这正是 Chanin 等人（2024）测量的现象。两种情形重构同样精确，所以重构指标检测不出这个问题。
:::
:::

::: exercise 用更多潜特征恢复特征 {level=3}
修改实验室，让 $\lambda = 0.3$ 的 $L_1$ SAE 用 $M = 32$ 个潜特征而不是 $16$ 个来训练。运行之前先预测：恢复特征的个数、死潜特征的个数、以及多出来的潜特征的含义会怎样。然后说明，要判定两个方向相似的潜特征是一个“分裂”的特征还是一个重复，你会检查什么。
::: solution
预测：$12$ 个植入特征应该仍会被恢复（字典比所需的大），一些多出来的潜特征可能死去（没有留给它们表征的方向了），另一些可能复制某个特征，或表征两个共现特征的组合。运行 `report("L1 SAE, M=32", *train_sae(M=32, mode="l1", lam=0.3))` 打印出 `FVU 0.057, L0 1.63, alive 31/32, recovered 12/12 (worst cos 0.957), activation/true 0.636`：所有特征仍被恢复，一个潜特征死去；但在同样的重构误差下，$L_0$ 从 $1.22$ 升到 $1.63$，且最佳匹配的潜特征承担的每个特征的激活更少了（$0.636$ 对 $0.741$）——其中一部分被近重复的潜特征分了去。要区分分裂与重复，比较这两个潜特征在相同输入上的激活：重复的潜特征方向几乎相同、在相同的输入上激发、把激活摊到彼此头上（它们的激活强烈正相关，且各自单独重构得更少）；分裂特征则由在父特征输入的*不同*子集上激发的潜特征构成（共激活低），方向只有微小差异——在真实模型中对应子概念。合成数据里没有子概念，所以靠得很近的一对要么是重复，要么是组合。
:::
:::

::: exercise 为双方各辩 {level=2}
一位同事说：“SAE 没有用——线性探针在检测有害提示上胜过它们。”另一位反驳：“探针需要标签；SAE 能找到你根本不知道要找的东西。”写一段中立审稿人能够接受的简短评估，援引双方各自依赖的证据种类，并给出一个能推动争论的实验。
::: solution
第一个论断是从特定的有监督任务外推的：已发表的比较（Google DeepMind 2025 年关于有害意图检测的报告；Kantamneni 等人，2025，关于稀疏探针；AxBench，2025，关于引导）发现，在有带标签的目标之处，基于 SAE 的方法没有胜过简单基线。这是 SAE 不是这些任务的最佳工具的有力证据，而不是它们没有用的证据。第二个论断指向另一种用途——无监督发现——由案例研究支持（不靠先前假设找到的特征与回路、审计博弈的结果、归因图），这些更难立基准，也还没有被系统地证明胜过替代方案。一个中立的评估是：截至 2026 年，SAE 对于发现是未经证明而有前途的工具，对于有监督检测则是软弱的工具。一个能推动争论的实验：一项预先登记的审计研究，训练若干模型、各自带有审计者不知道的几种隐藏行为，比较能接触 SAE 与不能接触 SAE 的团队（或自动智能体），给定同样的时间预算与强非 SAE 基线（黑盒测试、训练数据搜索、探针），并度量各自发现了哪些行为。
:::
:::
