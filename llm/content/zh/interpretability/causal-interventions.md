到目前为止，每一种方法都要经受同一个检验的考验：**改变模型内部的某个东西，看行为是否如解释所预言的那样改变**。探针表明信息可解码，归因分配功劳，回路与稀疏特征提出机制——在每一种情形下，决定性的证据都来自干预。本章把干预本身作为主题。与大多数科学不同，可解释性能够做"完美"的实验：模型可以在任何输入上运行，任何激活都可以设为任何值，实验可以分毫不差地重复。

本章从**激活修补**（activation patching）讲起：在干净输入与受损输入上运行模型，并在两次运行之间移植激活。它区分**去噪**与**加噪**——二者回答不同的问题，在冗余机制与合取机制上以不同方式失效；接着介绍**因果追踪**（Meng 等人，2022）、**归因修补**（一种我们给出误差上界的一阶近似）与**路径修补**；并把它们与**因果抽象**（Geiger 等人）以及因果清洗联系起来。随后从"检验"转向"控制"：**引导向量**与激活添加（Turner 等人，2023）、**表征工程**（Zou 等人，2023），以及聊天模型的拒绝由单一方向中介的发现（Arditi 等人，2024）。最后一部分讲**知识编辑**：ROME 的秩一更新——作为带约束的最小二乘问题推导出来——以及它的副作用。实验室部分修补一个"单单元修补会误导人"的玩具网络，并编辑一个线性联想记忆。

## 干预与效应 {#sec-effects}

固定一个模型、一个由其输出计算的**度量** $m$——正确与错误答案之间的 logit 差、正确词元的概率、或一个 KL散度——以及两个输入：模型在其中表现出该行为的**干净**输入 $x_{\text{clean}}$，以及以受控方式不同的**受损**输入 $x_{\text{corr}}$（换一个主语、对调名字、给某些词元嵌入加噪声）。设 $a$ 是某个内部激活——某个头在一个位置的输出、一个 MLP 的输出、一个残差流向量、一个特征——并用 $a(x)$ 记它在输入 $x$ 上的值。

::: definition 激活修补 {#def-patching}
记 $m(x\mid a\leftarrow v)$ 为在 $x$ 上运行模型、把激活 $a$ 设为 $v$、并允许 $a$ 之后的计算自由响应时的度量值。于是：
- **去噪**（把干净值修补进受损运行）度量 $m(x_{\text{corr}}\mid a\leftarrow a(x_{\text{clean}})) - m(x_{\text{corr}})$：只恢复 $a$ 就能带回多少干净行为？
- **加噪**（把受损值修补进干净运行）度量 $m(x_{\text{clean}}\mid a\leftarrow a(x_{\text{corr}})) - m(x_{\text{clean}})$：只破坏 $a$ 会损失多少行为？

记 $\Delta = m(x_{\text{clean}}) - m(x_{\text{corr}})$ 为受损的**总效应**，效应常报告为 $\Delta$ 的份额。
:::

用因果中介分析的语言（Pearl，2001；由 Vig 等人引入神经语言模型，2020）：输入是一种处理，$a$ 是中介变量，$m$ 是结果。去噪估计经由 $a$ 的*间接效应*——保持输入受损、只把中介移到其干净值所产生的变化——加噪则估计总效应中有多少*离不开* $a$。**消融**是加噪的特例，其中替换值不取自某个特定的受损输入：**零消融**设 $a = 0$；**均值消融**把它设为在数据集上的平均；**重采样消融**用它在另一条随机输入上的值。零消融最粗糙，因为零可能远远落在下游计算见过的取值范围之外；均值消融与重采样消融更贴近激活的分布。Heimersheim 与 Nanda（2024）以及 Zhang 与 Nanda（2024）综述了这些选择如何改变结论，并建议使用与干净输入差异最小的受损输入。

### 去噪与加噪回答不同的问题 {#sec-and-or}

若度量是各组件贡献之和，去噪与加噪本应一致，效应也应相加。一般而言并非如此，两个经典反例是合取与冗余。

::: proposition 只有加性机制才有可加性 {#prop-additive}
设度量只通过 $m = \sum_ig_i(a_i)$ 依赖激活 $a_1,\dots,a_n$，且每个 $a_i$ 直接由输入算出。则对每个 $i$，$a_i$ 的去噪效应等于其加噪效应的相反数，二者都等于 $g_i(a_i(x_{\text{clean}})) - g_i(a_i(x_{\text{corr}}))$，且所有 $a_i$ 的效应之和为 $\Delta$。没有可加性时，每条陈述都可能失效：若 $m = \min(a_1, a_2)$，$a_i\in\{0,1\}$，干净为 $(1,1)$、受损为 $(0,0)$，则每个单元的去噪效应为 $0$、加噪效应为 $-1$；若 $m = \max(a_1, a_2)$，每个单元的去噪效应为 $1$、加噪效应为 $0$。
:::

::: proof
在可加性下，无论朝哪个方向修补 $a_i$，改变的只有 $g_i$ 一项，从 $g_i(a_i(x_{\text{corr}}))$ 变到 $g_i(a_i(x_{\text{clean}}))$ 或反向，且 $\Delta = \sum_i[g_i(a_i(x_{\text{clean}})) - g_i(a_i(x_{\text{corr}}))]$。对合取情形，把 $\min$ 的一个输入从 $0$ 恢复到 $1$，$\min$ 仍为 $0$（去噪效应 $0$）；而破坏 $\min(1,1)$ 的一个输入得到 $0$（加噪效应 $-1$）。对析取情形，恢复 $\max(0,0)$ 的一个输入得到 $1$，而破坏 $\max(1,1)$ 的一个输入仍是 $1$。
:::

两个反例对应真实现象。在**合取**（AND 型）机制中，若干组件联合起来才必要——前词元头与归纳头（[[interpretability/circuits]]）——单独去噪其中一个都看不出什么，单独加噪其一却显示全部效应。在**冗余**（OR 型）机制中，若干组件各自都能顶上——IOI 回路的后备名字搬运头——单独加噪其一看不出什么，单独去噪其一却显示全部效应。去噪找出**充分**的组件（在干净计算的其余部分缺席时），加噪找出**必要**的组件（其余部分在场时）。Heimersheim 与 Nanda（2024）建议两者都用，并且修补组件集合，而不只是单个组件。

::: example 读一张修补表 {#ex-table}
实验室网络（[[#sec-code]]）有隐藏单元 $h_1,\dots,h_4$，度量 $m = 2\operatorname{ReLU}(h_1 + h_2 - 1) + 2\min(1, h_3 + h_4)$，干净值为 $(1,1,1,1)$，受损值为 $(0,0,0,0)$。计算 $h_1$ 与 $h_3$ 的去噪和加噪效应并解读。
::: solution
$m(\text{clean}) = 2 + 2 = 4$，$m(\text{corr}) = 0$，所以 $\Delta = 4$。去噪 $h_1$：$(1,0,0,0)$ 给出 $2\operatorname{ReLU}(0) + 2\min(1, 0) = 0$，效应 $0$。加噪 $h_1$：$(0,1,1,1)$ 给出 $0 + 2 = 2$，效应 $-2$。去噪 $h_3$：$(0,0,1,0)$ 给出 $0 + 2 = 2$，效应 $+2$。加噪 $h_3$：$(1,1,0,1)$ 给出 $2 + 2\min(1,1) = 4$，效应 $0$。$h_1$ 是一个合取的半边：必要而不充分。$h_3$ 是两份冗余拷贝之一：充分而不必要。只用加噪的研究会完全漏掉 $h_3$ 与 $h_4$；只用去噪的研究会漏掉 $h_1$ 与 $h_2$。
:::
:::

### 因果追踪 {#sec-tracing}

Meng、Bau、Andonian 与 Belinkov（2022）的《定位并编辑 GPT 中的事实关联》（*Locating and Editing Factual Associations in GPT*）把去噪用于事实回忆。对 "The Space Needle is located in the city of" 这样的提示，干净运行预测 "Seattle"。受损运行给**主语**词元（"The Space Needle"）的嵌入加高斯噪声，于是模型不再知道说的是哪个实体，"Seattle" 的概率下降。然后对每个层的每个词元位置，把干净运行的隐藏状态还原进受损运行，记录正确答案恢复的概率——该状态的**间接效应**。在许多事实上取平均后，他们报告在 GPT-2 XL 与 GPT-J 中有两个高效应区域：中间层**最后一个主语词元**处的隐藏状态——在那里还原 **MLP 输出**尤其有效——以及靠后层中提示**最后一个词元**处的状态——在那里注意力很重要。他们把前者解释为中间层 MLP 回忆主语属性的场所，把后者解释为把该信息搬到预测处的注意力——这是关于事实"存放"在何处的假说，也是 [[#sec-editing]] 编辑方法的动机。

::: example 归一化间接效应 {#ex-trace}
在一次因果追踪实验中，正确对象在干净提示上的概率为 $0.90$，主语受损后为 $0.05$。还原第 $15$ 层最后一个主语词元处的 MLP 输出可将其升到 $0.60$；还原第 $15$ 层提示最后一个词元处的输出则升到 $0.08$。计算间接效应及其占总效应的份额。
::: solution
总效应 $0.90 - 0.05 = 0.85$。最后一个主语词元：$0.60 - 0.05 = 0.55$，份额 $0.55/0.85 = 0.65$。最后一个词元：$0.08 - 0.05 = 0.03$，份额 $0.035$。在该层，主语位置上的 MLP（在其余下游部分自由响应的条件下）足以恢复约三分之二的效应；同一层在末尾位置上的 MLP 几乎不贡献什么。
:::
:::

### 归因修补 {#sec-attribution-patching}

逐个修补每个激活需要每个激活一次前向传播，对大模型来说很昂贵。**归因修补**（Nanda，2023；针对边见 Syed、Rager 与 Conmy，2023）用一阶泰勒近似取代每次修补，它只需一次前向与一次反向传播就能为所有激活算出：

$$
m(x_{\text{clean}}\mid a\leftarrow a(x_{\text{corr}})) - m(x_{\text{clean}})\approx\nabla_am\big|_{x_{\text{clean}}}\cdot\bigl(a(x_{\text{corr}}) - a(x_{\text{clean}})\bigr).
$$ {#eq-atp}

::: proposition 归因修补的误差 {#prop-atp}
设 $\varphi(t) = m\bigl(x_{\text{clean}}\mid a\leftarrow a_{\text{clean}} + t(a_{\text{corr}} - a_{\text{clean}})\bigr)$ 为度量沿 $a$ 从干净值到受损值这条直线路径的取值，并设 $\varphi$ 二次可微且在 $[0,1]$ 上 $\lvert\varphi''\rvert\le M$。则 [[#eq-atp]] 的误差至多 $M/2$。若 $\varphi$ 只是连续且分段线性，误差可以大到整个效应。
:::

::: proof
近似值是 $\varphi'(0)$，真实效应是 $\varphi(1) - \varphi(0)$。由泰勒公式，存在 $\tau\in(0,1)$ 使 $\varphi(1) = \varphi(0) + \varphi'(0) + \tfrac12\varphi''(\tau)$，所以误差为 $\tfrac12\lvert\varphi''(\tau)\rvert\le M/2$（与 [[interpretability/interpretability-goals#prop-local]] 相同）。至于第二条，[[#ex-table]] 中对 $\{h_3, h_4\}$ 的加噪有 $\varphi(t) = 2 + 2\min(1, 2 - 2t)$：由于 $\min$ 在 $t = 0$ 处饱和，$\varphi'(0) = 0$；但 $\varphi(1) - \varphi(0) = -2$，是全部效应。
:::

因此，在小激活改变与光滑区域中归因修补是可靠的，而在模型饱和处不可靠——已经锁定某个词元的 softmax 注意力、尺度剧烈变化的 LayerNorm、或受损程度很大的残差流。改进版本沿路径对梯度积分，即把积分梯度用于激活（[[interpretability/probing-attribution#def-ig]]），代价是更多传播次数。实践中的用法是筛选候选，然后再用真正的修补检验。

### 路径修补与因果清洗 {#sec-paths}

修补一个激活会改变它下游的一切。为了检验关于组件效应*经由何种路径*传导的假说，**路径修补**（Wang 等人，2023；由 Goldowsky-Dill 等人，2023 给出一般形式）只沿指定路径修补激活：例如，头 $A$ 的输出*只在进入头 $B$ 的键时*才从受损运行修补过来，其余每个组件仍收到干净的值。这样隔离的是计算图的边，正是回路发现（[[interpretability/circuits#alg-acdc]]）所需要的。

**因果清洗**（causal scrubbing；Chan 等人，2022）把整个假说变成一个检验。假说指明计算的哪些部分重要、各代表什么；它意味着某些激活可以被*重采样*——替换为它们在另一些输入上的值，只要那些输入在假说认为重要的一切上保持一致——而输出不变。因果清洗一次性执行所有这些重采样，并度量度量值幸存了多少。经受住清洗的假说解释了相应比例的行为；经受不住的则被驳倒或不完整。

**因果抽象**（Geiger 等人，2021，及后续工作）在 [[interpretability/interpretability-goals#sec-mechanism]] 中已引入，是这些方法背后的一般理论：若对对齐变量做互换干预在两个层面上产生相同效应——以互换干预准确率（[[interpretability/interpretability-goals#def-iia]]）度量——那么高层因果模型就是网络的忠实抽象。Geiger 等人（2024）表明，激活修补、路径修补、因果清洗与回路分析都能在这一框架内表达，并提出了**分布式对齐搜索**（DAS）：学习激活空间的一个旋转，使高层变量与子空间（而非神经元）对齐。这条研究线的一个警示：Makelov、Lange 与 Nanda（2024）表明子空间修补会产生**可解释性幻觉**——它激活了一条休眠通路，使被修补的子空间看起来携带着模型平时并不在此使用的变量。

::: warning 修补结果依赖受损方式
"头 9.6 有很大的修补效应"的意思是：*在这个度量、这对干净–受损输入分布、这个方向（去噪或加噪）、其余一切按规定保持不变的条件下*，改变头 9.6 会改变度量。换一种受损方式——换一个别的词元、加噪声而非替换、换概率而非 logit 差——组件的排序就会改变，有时是彻底的改变。报告完整的实验设计，优先使用只改变目标变量的最小受损，并在多种设计下复核结论。
:::

## 引导 {#sec-steering}

修补检验的是关于某个方向或组件的假说；**引导**（steering）则用一个方向或组件来改变行为。若一个概念是线性表征的（[[interpretability/superposition#def-superposition]]），把它的方向加到残差流上，就应当让模型表现得仿佛该概念更常出现。

::: definition 引导向量、激活添加 {#def-steering}
第 $\ell$ 层的一个**引导向量**是一个向量 $\mathbf{v}\in\R^d$，在前向传播中以系数 $\alpha$ 加到该层的残差流上（所有位置，或选定的位置）：$\mathbf{x}_\ell\mapsto\mathbf{x}_\ell + \alpha\mathbf{v}$。一种常见的构造是**均值差**：对带某性质与不带该性质的提示集合 $P$ 与 $N$，$\mathbf{v} = \frac{1}{\lvert P\rvert}\sum_{p\in P}\mathbf{x}_\ell(p) - \frac{1}{\lvert N\rvert}\sum_{q\in N}\mathbf{x}_\ell(q)$。**激活添加**（activation addition；Turner 等人，2023）则用单对对比提示的激活之差。
:::

Turner 等人（2023）的《激活添加：无需优化的语言模型引导》（*Activation Addition: Steering Language Models Without Optimization*）计算了诸如 "Love" 与 "Hate" 在 GPT-2 XL 较浅层激活之差这样的向量，并在模型生成文本时把它们加进去，无需任何训练就改变了补全的情感与话题；他们报告，系数适度时该方法能相当好地保持无关任务上的性能。对比激活添加（Rimsky、Gabrieli 与合作者，2024）对大量对比式选择题对取平均，用来引导谄媚之类的行为（在 Llama 2 聊天模型上）。用稀疏自编码器特征作引导（Templeton 等人，2024；[[interpretability/sparse-features]]）是同一操作，只是向量换成特征的解码器方向。

引导向量对一个 logit 的效应有简单的一阶描述，它同时揭示了这一方法的主要局限。

::: proposition 引导向量的直接效应 {#prop-steer}
设引导向量 $\alpha\mathbf{v}$ 在最后一层、最终归一化之前加到残差流上，归一化为无增益的 RMSNorm。以 $\Delta\mathbf{u}$ 记两个词元的 logit 差方向（[[interpretability/residual-stream#prop-dla]]），则新的 logit 差为
$$
\frac{(\mathbf{x} + \alpha\mathbf{v})\cdot\Delta\mathbf{u}}{\operatorname{RMS}(\mathbf{x} + \alpha\mathbf{v})}.
$$ {#eq-steer}
当 $\alpha$ 小时，改变量近似为 $\alpha\,\mathbf{v}\cdot\Delta\mathbf{u}/\operatorname{RMS}(\mathbf{x})$ 加上尺度变化的一项；当 $\alpha\to\infty$ 时，logit 差趋于 $\mathbf{v}\cdot\Delta\mathbf{u}/\operatorname{RMS}(\mathbf{v})$，与 $\mathbf{x}$ 无关。
:::

::: proof
第一条陈述就是把 logit 的定义用到被引导的流上。对 $\alpha\to\infty$，分子分母同除以 $\alpha$：$(\mathbf{x}/\alpha + \mathbf{v})\cdot\Delta\mathbf{u}/\operatorname{RMS}(\mathbf{x}/\alpha + \mathbf{v})\to\mathbf{v}\cdot\Delta\mathbf{u}/\operatorname{RMS}(\mathbf{v})$，因为 RMS 连续且正齐次。$\alpha$ 小时，在 $\alpha = 0$ 处求导。
:::

所以引导的分寸在于相对残差流的尺度：与 $\lVert\mathbf{x}\rVert$ 相比很小的系数只是轻推输出；很大的系数则用引导方向覆写整个流，模型的行为被它支配——方向选得好时尚连贯，但随着 $\alpha$ 增大，流畅性与能力都会退化。在较浅层引导要经过所有后续计算，其效应不是 [[#eq-steer]] 单独能给出的，实践中层与系数都靠搜索选定。

::: widget plot
f: x/sqrt((s^2 + x^2)/2); x*sqrt(2)/s
x: 0, 10
y: 0, 3
sliders: s=0.5:0.5:6
labels: \text{归一化后的 logit 差}; \text{一阶近似}
caption: 引导的直接效应（[[#eq-steer]]），在二维情形下：流 $\mathbf{x}$ 的范数为 $s$，在引导方向 $\mathbf{v}$ 上没有分量，$\mathbf{v}$ 是与 $\Delta\mathbf{u}$ 对齐的单位向量。横轴是系数 $\alpha$。logit 差先以斜率 $\sqrt2/s$ 线性增长，然后在引导向量支配整个流时饱和于 $\sqrt2$。残差范数 $s$ 越大，需要成比例更大的系数。
:::

::: example 一次引导的计算 {#ex-steer}
在最后一层，残差流为 $\mathbf{x} = (3, 0, 1)$，引导向量 $\mathbf{v} = (0, 1, 0)$，$\Delta\mathbf{u} = (0, 2, 1)$。用无增益的 RMSNorm，计算不加引导与 $\alpha = 2$ 时的 logit 差。
::: solution
无引导：$\operatorname{RMS}(\mathbf{x}) = \sqrt{(9 + 0 + 1)/3} = 1.826$，且 $\mathbf{x}\cdot\Delta\mathbf{u} = 1$，得 $0.548$。加引导：$\mathbf{x} + 2\mathbf{v} = (3, 2, 1)$，$\operatorname{RMS} = \sqrt{14/3} = 2.160$，$(3, 2, 1)\cdot(0, 2, 1) = 5$，得 $2.315$。一阶估计 $0.548 + 2\times2/1.826 = 2.739$ 高估了，因为加上 $\mathbf{v}$ 同时增大了流的尺度。
:::
:::

### 表征工程 {#sec-repe}

Zou 等人（2023）的《表征工程：AI 透明性的自顶向下方法》（*Representation Engineering: A Top-Down Approach to AI Transparency*）提出把诚实、有害性、权力寻求、情绪这类高层性质作为激活空间中的方向来研究——方向从激活的*群体*中找出，而不是把网络分解为回路。他们的**读取**程序（线性人工层析成像）用能引出某概念的刺激提示模型、收集激活、再抽取一个方向——例如成对激活之差的第一主成分。**控制**则加上或减去这样的方向，或训练低秩适配器让表征沿方向移动。他们报告的结果包括：读取出的诚实向量能在模型被指示撒谎时检测出其中一些谎言，而把它加回去能提高 TruthfulQA 上真实回答的比例。支持者把表征工程说成是自底向上机制工作的互补：更粗糙，但适用于可能散布在许多回路之间的性质。批评者指出：在特意设计的刺激上与概念相关的方向，可能编码的是与概念共同变化的别的东西（刺激的格式、指示语本身），所以需要因果与分布外的检验——与对探针的告诫相同。

### 拒绝方向 {#sec-refusal}

Arditi 等人（2024）的《语言模型中的拒绝由单一方向中介》（*Refusal in Language Models Is Mediated by a Single Direction*）研究了至多 $72$ 亿参数的十三个开放权重聊天模型。他们计算有害与无害指令激活之间的均值差方向，并报告：在这些模型中，拒绝行为由这一个一维子空间中介——压制该方向能在很大程度上使模型不再拒绝有害请求，而加上它则会使模型拒绝无害的请求。他们还分析了一些越狱提示如何压低该方向的表达。论文的主要结论关乎稳健性：在开放权重模型中，谁拿到权重谁就能做这样的干预，所以实现为单一线性特征的安全行为是脆弱的——这也是采用不只依赖微调拒绝的安全措施的一个论据（[[safety-alignment/robustness-jailbreaks]]）。这一发现也是可解释性结果双刃剑性质的例子：理解一个机制，既让它更容易被监控，也让它更容易被拆除。

## 编辑知识 {#sec-editing}

若事实如因果追踪所提示、由中间层 MLP 在主语的最后一个词元处回忆，那么改一个事实也许只需要改一个 MLP 的权重。Meng 等人（2022）提出了 **ROME**（秩一模型编辑，Rank-One Model Editing），它把 MLP 的第二个矩阵 $W$ 当作**线性联想记忆**：MLP 在主语处的隐藏激活是一个**键** $\mathbf{k}$，而 $W\mathbf{k}$ 是一个**值**——写入残差流后编码了主语的诸属性。要让模型相信 "The Space Needle is in Paris"，ROME 计算主语的键 $\mathbf{k}^*$，并用优化算出一个值 $\mathbf{v}^*$ 使模型输出新宾语，然后在 $W'\mathbf{k}^* = \mathbf{v}^*$ 的约束下把 $W$ 改得尽可能少。

::: theorem 秩一编辑 {#thm-rome}
设 $K\in\R^{d_k\times N}$ 以列为键、$V\in\R^{d_v\times N}$ 存相应的值，$C = KK\T$ 可逆，且设 $W = VK\T C^{-1}$ 为最小二乘记忆，即极小化 $\lVert WK - V\rVert_F^2$。在所有满足 $W'\mathbf{k}^* = \mathbf{v}^*$ 的 $W'$ 中，使 $\lVert W'K - V\rVert_F^2$ 最小的那个是
$$
W' = W + \frac{(\mathbf{v}^* - W\mathbf{k}^*)\,(C^{-1}\mathbf{k}^*)\T}{(\mathbf{k}^*)\T C^{-1}\mathbf{k}^*}.
$$ {#eq-rome}
:::

::: proof
写 $W' = W + \Delta$。则 $\lVert W'K - V\rVert_F^2 = \lVert\Delta K\rVert_F^2 + 2\operatorname{tr}\bigl((\Delta K)\T(WK - V)\bigr) + \lVert WK - V\rVert_F^2$。交叉项为 $2\operatorname{tr}\bigl(\Delta\,K(WK - V)\T\bigr)$，而 $K(WK - V)\T = (WKK\T - VK\T)\T = (VK\T C^{-1}C - VK\T)\T = 0$——这正是最小二乘拟合的正规方程。所以我们必须在约束 $\Delta\mathbf{k}^* = \mathbf{r}$（其中 $\mathbf{r} = \mathbf{v}^* - W\mathbf{k}^*$）下极小化 $\lVert\Delta K\rVert_F^2 = \operatorname{tr}(\Delta C\Delta\T)$。目标（因 $C$ 正定）是 $\Delta$ 的凸二次函数而约束是线性的，所以拉格朗日函数 $\operatorname{tr}(\Delta C\Delta\T) - 2\boldsymbol\lambda\T(\Delta\mathbf{k}^* - \mathbf{r})$ 的驻点就是全局极小。把它对 $\Delta$ 的梯度取零得 $2\Delta C - 2\boldsymbol\lambda(\mathbf{k}^*)\T = 0$，即 $\Delta = \boldsymbol\lambda(C^{-1}\mathbf{k}^*)\T$（$C$ 对称）。约束给出 $\boldsymbol\lambda\,(\mathbf{k}^*)\T C^{-1}\mathbf{k}^* = \mathbf{r}$，所以 $\boldsymbol\lambda = \mathbf{r}/((\mathbf{k}^*)\T C^{-1}\mathbf{k}^*)$，即 [[#eq-rome]]。
:::

在 ROME 中，$C$ 由在大规模文本样本上收集的键估计，于是"对其他已存关联的改变尽可能小"是在典型输入上度量的。更新方向 $C^{-1}\mathbf{k}^*$ 是经键的统计"白化"后的键：它主要把记忆朝普通键很少占据的方向移动，从而保护常见的关联。

::: example 二维中的秩一编辑 {#ex-rome}
设 $W = I_2$，$C = \operatorname{diag}(4, 1)$（键沿第一个轴的变化是其余方向的 $4$ 倍），$\mathbf{k}^* = (1, 1)$，$\mathbf{v}^* = (0, 2)$。计算 ROME 更新和朴素更新 $\mathbf{r}(\mathbf{k}^*)\T/\lVert\mathbf{k}^*\rVert^2$，以及它们对键 $(1, 0)$ 与 $(0, 1)$ 的影响。
::: solution
$\mathbf{r} = \mathbf{v}^* - W\mathbf{k}^* = (-1, 1)$。$C^{-1}\mathbf{k}^* = (0.25, 1)$，$(\mathbf{k}^*)\T C^{-1}\mathbf{k}^* = 1.25$，于是 $\Delta_{\text{ROME}} = (-1, 1)\T(0.25, 1)/1.25 = \begin{pmatrix}-0.2 & -0.8\\ 0.2 & 0.8\end{pmatrix}$。验证：$\Delta_{\text{ROME}}\mathbf{k}^* = (-1, 1) = \mathbf{r}$。朴素更新为 $(-1, 1)\T(1, 1)/2 = \begin{pmatrix}-0.5 & -0.5\\ 0.5 & 0.5\end{pmatrix}$。在键 $(1, 0)$——那个常见方向——上，ROME 把输出改变 $(-0.2, 0.2)$，朴素更新改变 $(-0.5, 0.5)$；在 $(0, 1)$ 上，ROME 改变 $(-0.8, 0.8)$，朴素改变 $(-0.5, 0.5)$。按键的统计加权的总平方改变 $\operatorname{tr}(\Delta C\Delta\T) = \lVert\Delta K\rVert_F^2$，ROME 为 $1.6$，朴素更新为 $2.5$。ROME 把改变集中到典型键稀少的地方。
:::
:::

### 编辑揭示了什么，及其副作用 {#sec-side}

ROME 的评估维度是**有效性**（新事实被产出）、**泛化性**（在提示的复述下成立）与**特异性**（关于其他主语的事实不变），用的是 CounterFact 数据集，并在这几项上表现出色。MEMIT（Meng 等人，2023）把更新扩展到一次数千条事实、分散在若干层。后来的工作发现了种种局限：

- **定位并不能预测编辑的成功。** Hase 等人（2023）的《定位对编辑有指导意义吗？》（*Does Localization Inform Editing?*）发现，因果追踪定位到某事实的那些层，并不比其他层更适合编辑该事实：编辑的成功与追踪结果几乎无关。因果追踪找到的是信息以足以恢复输出的方式*存在*之处，未必是它最容易被改动的地方。
- **涟漪效应。** 被编辑的事实应当改变它的推论（"Space Needle 在 Paris"意味着它在法国）。Cohen 等人（2024）构建了 RippleEdits 基准，发现编辑方法常常没能把编辑传播到相关事实，还可能产出自相矛盾的知识。
- **大量编辑下的退化。** Gupta、Rao 与 Anumanchipalli（2024）报告，用 ROME 或 MEMIT 顺序编辑会逐步、有时突然地损害模型的通用能力，其中会出现一次"失能编辑"，此后模型的输出崩溃。
- **特异性的测量太窄。** 编辑可能影响相关主语或共享表面特征的不相关提示，而标准特异性检验（同一关系下的其他主语）捕捉不到这些。

这些结果既关乎工程，也关乎解读：倘若事实存储在单一、局部化的记忆里，局部编辑就会表现得很干净。它们的部分成功表明：事实性知识的局部化程度有用但有限，与在回路中看到的冗余一致。

::: quiz
因果追踪显示，还原第 $18$ 层最后一个主语词元处的 MLP 输出，能恢复正确对象概率的 $70\%$。哪个结论是站得住的？
- [ ] 事实存储在第 $18$ 层，编辑那一层是改变它的最佳方式。
- [x] 在受损运行的其余部分自由响应的条件下，还原该激活足以恢复大部分行为；其他层可能也携带这一信息，最适合编辑的层必须另行检验。
- [ ] 消融该 MLP 会抹去 $70\%$ 的概率。
- [ ] 其他层在回忆该事实上不起作用。
::: solution
因果追踪是去噪：它度量单个被还原状态的充分性，不是必要性（那要靠加噪或消融来检验，[[#prop-additive]]），也不是最宜干预的位置——Hase 等人（2023）发现追踪结果很难预测编辑在哪些层会成功。
:::
:::

## 一个数值实验室 {#sec-code}

清单的第一部分对 [[#ex-table]] 的网络计算去噪、加噪与归因修补的估计，对单个单元和成对的单元都做。第二部分搭一个 $8$ 维、$40$ 对键值的最小二乘线性联想记忆，键沿两个轴的变化大于其余方向，然后用朴素秩一更新与 [[#thm-rome]] 的 ROME 更新编辑某个键存储的值，并度量对其余 $39$ 个键输出的改变。

```python
import math, random
rng = random.Random(7)

# ---- 1. 修补一个含 AND 与冗余 OR 的玩具网络 ------------------------------------------
# 隐藏单元 h1..h4 拷贝输入（h3 与 h4 都拷贝 x3）；度量为
#   m = 2 ReLU(h1 + h2 - 1) + 2 min(1, h3 + h4)
def metric(h): return 2 * max(0.0, h[0] + h[1] - 1) + 2 * min(1.0, h[2] + h[3])
def hidden(x): return [x[0], x[1], x[2], x[2]]
clean, corrupt = hidden([1, 1, 1]), hidden([0, 0, 0])
m_clean, m_corr = metric(clean), metric(corrupt)
print(f"clean metric {m_clean:.1f}, corrupted {m_corr:.1f}")

def patch(base, src, units): return [src[i] if i in units else base[i] for i in range(4)]
def directional_grad(h, target, eps=1e-6):     # 沿 h + t (target - h) 方向的 d m / d t，逐单元，在 t = 0 处
    out = []
    for i in range(4):
        hp = list(h); hp[i] += eps * (target[i] - h[i])
        out.append((metric(hp) - metric(h)) / eps)
    return out
ap = directional_grad(clean, corrupt)          # 归因修补：加噪的一阶估计
for units in [(0,), (1,), (2,), (3,), (0, 1), (2, 3)]:
    den = metric(patch(corrupt, clean, units)) - m_corr     # 去噪：把干净值补进受损运行
    noi = metric(patch(clean, corrupt, units)) - m_clean    # 加噪：把受损值补进干净运行
    name = "+".join(f"h{i + 1}" for i in units)
    print(f"{name:6s} denoising {den:+.1f}   noising {noi:+.1f}   attribution patching {sum(ap[i] for i in units):+.1f}")

# ---- 2. 对线性联想记忆做一次秩一编辑（ROME 风格） ------------------------------------
DK, DV, N = 8, 8, 40
keys = [[rng.gauss(0, 1) * (2.0 if j < 2 else 0.5) for j in range(DK)] for _ in range(N)]   # 各向异性
vals = [[rng.gauss(0, 1) for _ in range(DV)] for _ in range(N)]
def matmul(A, B): return [[sum(a * b for a, b in zip(r, c)) for c in zip(*B)] for r in A]
def T(A): return [list(r) for r in zip(*A)]
def inverse(A):                                 # 带部分主元的 Gauss-Jordan 消元
    n = len(A); M = [row[:] + [float(i == j) for j in range(n)] for i, row in enumerate(A)]
    for c in range(n):
        p = max(range(c, n), key=lambda r: abs(M[r][c])); M[c], M[p] = M[p], M[c]
        piv = M[c][c]; M[c] = [v / piv for v in M[c]]
        for r in range(n):
            if r != c:
                f = M[r][c]; M[r] = [a - f * b for a, b in zip(M[r], M[c])]
    return [row[n:] for row in M]
K, V = T(keys), T(vals)                         # (DK, N), (DV, N)
C = matmul(K, T(K))                             # 键的二阶矩矩阵，(DK, DK)
Cinv = inverse(C)
W = matmul(matmul(V, T(K)), Cinv)               # 最小二乘记忆：W = V K^T (K K^T)^-1，(DV, DK)
def apply(W, k): return [sum(w * x for w, x in zip(row, k)) for row in W]
def dist(a, b): return math.sqrt(sum((x - y) ** 2 for x, y in zip(a, b)))

k_star = keys[0]                                # 编辑键 0 所存储的值
v_star = [rng.gauss(0, 1) for _ in range(DV)]
r = [a - b for a, b in zip(v_star, apply(W, k_star))]          # 残差 v* - W k*
def rank_one(u):                                # W + r u^T / (u . k*)：满足 W' k* = v*
    s = sum(a * b for a, b in zip(u, k_star))
    return [[W[i][j] + r[i] * u[j] / s for j in range(DK)] for i in range(DV)]
naive = rank_one(k_star)                        # 沿 k* 本身更新
rome = rank_one(apply(Cinv, k_star))            # 沿 C^-1 k* 更新（带约束的最优解）
for name, W2 in [("naive", naive), ("ROME ", rome)]:
    err = dist(apply(W2, k_star), v_star)
    side = sum(dist(apply(W2, k), apply(W, k)) ** 2 for k in keys[1:])
    print(f"{name} edit: |W' k* - v*| = {err:.1e}, total squared change on the other {N - 1} keys = {side:.3f}")
```

```text
clean metric 4.0, corrupted 0.0
h1     denoising +0.0   noising -2.0   attribution patching -2.0
h2     denoising +0.0   noising -2.0   attribution patching -2.0
h3     denoising +2.0   noising +0.0   attribution patching +0.0
h4     denoising +2.0   noising +0.0   attribution patching +0.0
h1+h2  denoising +2.0   noising -2.0   attribution patching -4.0
h3+h4  denoising +2.0   noising -2.0   attribution patching +0.0
naive edit: |W' k* - v*| = 3.1e-16, total squared change on the other 39 keys = 591.694
ROME  edit: |W' k* - v*| = 3.4e-16, total squared change on the other 39 keys = 142.457
```

单单元去噪漏掉 $h_1, h_2$，单单元加噪漏掉 $h_3, h_4$，正如 [[#prop-additive]] 所预言；成对修补能把两种机制都找回来。归因修补在这里与单单元加噪吻合，但对成对的两个方向都失灵：它把合取的效应翻了倍（$-4$ 对 $-2$），因为线性近似把两个单元的梯度相加，而 ReLU 把输出在 $0$ 处截住；它又完全漏掉冗余对（$0$ 对 $-2$），因为 $\min$ 在干净点饱和。两种编辑都精确存入了新值，但 ROME 更新对其余关联的改变只有朴素更新的约四分之一，因为它极小化的恰是这一改变。

::: history
因果中介分析由 Robins 与 Greenland（1992）以及 Pearl（2001）形式化；Vig 等人（2020）把它用于 Transformer 语言模型中的性别偏见，Geiger 等人（2021）为神经网络引入了因果抽象与互换干预。Meng 等人（2022）提出了因果追踪与 ROME，MEMIT 于 2023 年跟进；Hase 等人（2023）质疑了定位与编辑之间的联系。Chan 等人（2022）提出因果清洗，Wang 等人（2023）提出路径修补，Goldowsky-Dill 等人（2023）给出其一般形式，Nanda（2023）提出归因修补，Geiger 等人（2024）提出分布式对齐搜索；Makelov 等人（2024）警示了子空间修补的幻觉，Heimersheim 与 Nanda（2024）以及 Zhang 与 Nanda（2024）整理了最佳实践。引导源于生成模型中的隐空间算术；Turner 等人（2023）为语言模型引入激活添加，Zou 等人（2023）提出表征工程，Li 等人（2023）对真实性头做推理时干预，Rimsky 等人（2024）提出对比激活添加，Arditi 等人（2024）发现了拒绝方向。Wu 等人的 AxBench（2025）系统地比较了各种引导方法。
:::

::: summary
- **激活修补**把一个激活设为它在另一输入上的值。**去噪**（干净补进受损）检验充分性，**加噪**（受损补进干净）检验必要性；二者只对加性机制一致，在合取（AND）与冗余（OR、后备组件）下不一致。要修补组件集合，也不只修补单个组件。
- **因果追踪**（Meng 等人, 2022）在破坏主语后还原隐藏状态，发现对事实回忆重要的是最后一个主语词元处的中间层 MLP。**归因修补**把修补近似到一阶，光滑路径上误差 $\le M/2$，饱和处不可靠。**路径修补**、**因果清洗**与**因果抽象**检验关于路径与整个机制的假说；消融与受损方式的选择会改变结论。
- **引导**往残差流加一个向量，常常是**均值差**；其直接效应先线性增长，然后相对流的范数饱和。**表征工程**读取并控制群体层面的方向。许多开放权重聊天模型的拒绝被发现由**单一方向**中介（Arditi 等人, 2024），这关系到安全微调的稳健性。
- **ROME** 用秩一更新 $W' = W + \mathbf{r}(C^{-1}\mathbf{k}^*)\T/((\mathbf{k}^*)\T C^{-1}\mathbf{k}^*)$ 编辑一条事实——对最小二乘记忆的最小改动；编辑可能传播不开，反复编辑会损害模型，而且如人所料，编辑并不依赖基于追踪的定位。
:::

## 习题

::: exercise 归一化的修补效应 {level=1 check="0.6"}
干净的 logit 差是 $3.0$，受损时是 $-1.0$。对某个头的输出做去噪得到 $1.4$。这个头恢复了总效应的几分之几？
::: solution
总效应 $3.0 - (-1.0) = 4.0$；恢复了 $1.4 - (-1.0) = 2.4$；比例为 $2.4/4.0 = 0.6$。
:::
:::

::: exercise 合取的去噪与加噪 {level=1}
设 $m = a_1a_2a_3$，干净时 $(1, 1, 1)$，受损时 $(0, 0, 0)$。给出每个单元以及配对 $\{a_1, a_2\}$ 的去噪效应与加噪效应。
::: solution
单单元去噪：只有一个因子是 $1$，故 $m = 0$，效应为 $0$。加噪：有一个因子是 $0$，故 $m = 0$，效应为 $-1$。配对 $\{a_1, a_2\}$：去噪后仍有 $a_3 = 0$，效应 $0$；加噪得 $m = 0$，效应 $-1$。只有对全部三个单元做去噪才显示出完整效应；而对任意非空子集做加噪都能显示出它。
:::
:::

::: exercise 一个引导系数 {level=1 check="sqrt(2)"}
在引导那张图的设定中，流的范数为 $s$，引导方向是与流正交的单位向量、且与 $\Delta\mathbf{u}$（单位向量）对齐，并且 $d = 2$。当 $\alpha\to\infty$ 时，logit 差趋于什么值？
::: solution
由 [[#prop-steer]]，极限是 $\mathbf{v}\cdot\Delta\mathbf{u}/\operatorname{RMS}(\mathbf{v}) = 1/\sqrt{1/2} = \sqrt2$，与 $s$ 无关。
:::
:::

::: exercise 归因修补的误差 {level=2}
对 $\varphi(t) = \sigma(4 - 8t)$（修补路径上的一个 logistic 函数），计算真实效应 $\varphi(1) - \varphi(0)$ 与归因修补的估计 $\varphi'(0)$，并用 [[#prop-atp]] 解释这一差距。
::: solution
$\varphi(0) = \sigma(4) = 0.982$，$\varphi(1) = \sigma(-4) = 0.018$，故真实效应为 $-0.964$。$\varphi'(0) = -8\sigma(4)(1 - \sigma(4)) = -8\times0.982\times0.018 = -0.141$。估计只捕捉到效应的 $15\%$，因为在 $t = 0$ 处 logistic 已经饱和：它在那里的斜率很小，尽管函数在路径的中段下降得很陡。二阶导数的绝对值最大约 $8^2\times0.096 = 6.2$，所以界 $M/2\approx3.1$ 虽然松弛，但与 $0.82$ 的误差相容。
:::
:::

::: exercise 验证秩一更新 {level=2}
直接验证 [[#eq-rome]] 中的 $W'$ 满足 $W'\mathbf{k}^* = \mathbf{v}^*$，并证明对任何满足 $(C^{-1}\mathbf{k}^*)\cdot\mathbf{k} = 0$ 的键 $\mathbf{k}$，这次编辑不改变 $W\mathbf{k}$。描述 $C = I$ 时这类键的集合。
::: solution
$W'\mathbf{k}^* = W\mathbf{k}^* + (\mathbf{v}^* - W\mathbf{k}^*)\,\frac{(C^{-1}\mathbf{k}^*)\cdot\mathbf{k}^*}{(\mathbf{k}^*)\T C^{-1}\mathbf{k}^*} = W\mathbf{k}^* + \mathbf{v}^* - W\mathbf{k}^* = \mathbf{v}^*$。对满足 $(C^{-1}\mathbf{k}^*)\cdot\mathbf{k} = 0$ 的键，更新项乘上了 $0$，故 $W'\mathbf{k} = W\mathbf{k}$。当 $C = I$ 时，这些就是与 $\mathbf{k}^*$ 正交的键：编辑只改变那些沿 $\mathbf{k}^*$ 有分量的键的输出，且改变量与该分量成正比。对于一般的 $C$，受保护的集合是与 $C^{-1}\mathbf{k}^*$ 正交的超平面，也就是在键的统计所定义的内积下「与 $\mathbf{k}^*$ 正交」。
:::
:::

::: exercise 选择受损方式 {level=2}
你想找出模型的哪些组件决定了 "The nurse said that ___" 中代词的性别。设计一对干净与受损的输入以及一个度量，并解释为什么给 "nurse" 这个词加高斯噪声会是更差的受损。
::: solution
用只在性别线索上不同的最小对，例如 "The nurse said that" 与 "The man said that"；或者更适合受控比较的做法，用频率与分词都匹配的职业词对；也可以用只在显式线索上不同的对（"Mary, the nurse, said that" 对 "John, the nurse, said that"）。度量：logit 差 $\text{logit}(\text{she}) - \text{logit}(\text{he})$。两个方向都做修补。高斯噪声毁掉关于主语的**全部**信息——它的身份、它的频率、甚至它是不是名词——并且产生偏离模型正常分布的激活，于是对噪声本身有反应的组件、或携带任何主语信息的组件都会显出效应；最小替换只改变我们感兴趣的那个变量，并使输入保持自然。
:::
:::

::: exercise 秩一编辑的代价 {level=2 check="1.6"}
证明对任何更新 $\Delta = \mathbf{r}\,\mathbf{u}\T/(\mathbf{u}\cdot\mathbf{k}^*)$，代价为 $\operatorname{tr}(\Delta C\Delta\T) = \lVert\mathbf{r}\rVert^2\,\mathbf{u}\T C\mathbf{u}/(\mathbf{u}\cdot\mathbf{k}^*)^2$，并由此推出 ROME 更新（$\mathbf{u} = C^{-1}\mathbf{k}^*$）的代价是 $\lVert\mathbf{r}\rVert^2/((\mathbf{k}^*)\T C^{-1}\mathbf{k}^*)$。对 [[#ex-rome]] 求值。
::: solution
$\Delta C\Delta\T = \mathbf{r}\,(\mathbf{u}\T C\mathbf{u})\,\mathbf{r}\T/(\mathbf{u}\cdot\mathbf{k}^*)^2$，其迹为 $\lVert\mathbf{r}\rVert^2\,\mathbf{u}\T C\mathbf{u}/(\mathbf{u}\cdot\mathbf{k}^*)^2$。取 $\mathbf{u} = C^{-1}\mathbf{k}^*$，则 $\mathbf{u}\T C\mathbf{u} = (\mathbf{k}^*)\T C^{-1}\mathbf{k}^*$ 且 $\mathbf{u}\cdot\mathbf{k}^* = (\mathbf{k}^*)\T C^{-1}\mathbf{k}^*$，故代价为 $\lVert\mathbf{r}\rVert^2/((\mathbf{k}^*)\T C^{-1}\mathbf{k}^*)$。在 [[#ex-rome]] 中，$\lVert\mathbf{r}\rVert^2 = 2$，$(\mathbf{k}^*)\T C^{-1}\mathbf{k}^* = 1.25$，故代价为 $1.6$。朴素更新取 $\mathbf{u} = \mathbf{k}^*$，得 $2\times5/2^2 = 2.5$。由 $C$ 定义的内积下的柯西–施瓦茨不等式，$(\mathbf{u}\cdot\mathbf{k}^*)^2\le(\mathbf{u}\T C\mathbf{u})((\mathbf{k}^*)\T C^{-1}\mathbf{k}^*)$，所以没有哪个 $\mathbf{u}$ 能胜过 ROME——这也是秩一更新情形下 [[#thm-rome]] 的又一个证明。
:::
:::

::: exercise 引导向量何时失效 {level=3}
在第 $10$ 层，用 $200$ 条正式提示与 $200$ 条随意提示算出「正式与随意」的均值差向量。以 $\alpha = 4$ 加上它确实让输出更正式，但也更常离题。给出三种可能的解释，并为每一种设计一个检验实验。
::: solution
（1）**向量混杂了概念**：正式提示与随意提示可能话题不同（商务对私人），于是均值差里含有一个话题方向。检验：用话题匹配的对重算向量，比较离题率；或者把另行估计的话题方向投影出去。（2）**系数相对于残差范数太大**，覆盖了模型保持话题所需的信息（[[#prop-steer]]）。检验：扫描 $\alpha$，画出正式度与主题相关性随它的变化曲线；把 $\alpha$ 按第 $10$ 层的平均残差范数归一化。（3）**层选错了**：在第 $10$ 层，这个方向可能与后面各层用于话题的内容纠缠在一起，而更晚的层也许能把风格分开。检验：在若干层上分别计算并施加向量，比较权衡曲线；再用激活修补检查第 $10$ 层的正式性信息是否真的如引导所假设的那样被后面的组件读取。
:::
:::

::: exercise 充分性、必要性与后备头 {level=3}
一个回路有一个主头 $A$ 和一个后备头 $B$，$B$ 只在 $A$ 的输出缺失时才复制答案。把它建模为 $m = \max(a, b\cdot[a = 0])$，其中 $a, b\in\{0, 1\}$。取干净 $(1, 1)$、受损 $(0, 0)$，计算 $A$、$B$ 与 $\{A, B\}$ 的加噪效应与去噪效应。哪些实验能揭示 $B$？这与自我修复有什么关系？
::: solution
$m(\text{clean}) = \max(1, 0) = 1$（因为 $a = 1$，后备项为 $0$）；$m(\text{corr}) = 0$。对 $A$ 加噪：$(0, 1)$ 给出 $\max(0, 1) = 1$，效应 $0$——后备头补上了。对 $B$ 加噪：$(1, 0)$ 给出 $1$，效应 $0$。两者都加噪：$0$，效应 $-1$。对 $A$ 去噪：$(1, 0)$ 给出 $1$，效应 $+1$。对 $B$ 去噪：$(0, 1)$ 给出 $1$，效应 $+1$。两者都去噪：$1$。单单元加噪揭示不了任何一个头；联合加噪或单单元去噪能把两者都揭示出来。在真实的 IOI 研究中，消融主名字搬运头几乎没有降低性能，因为后备头改变了自身的行为——**自我修复**——而后备头是靠观察消融之后什么发生了变化找到的，也就是逐组件比较两次运行。
:::
:::
