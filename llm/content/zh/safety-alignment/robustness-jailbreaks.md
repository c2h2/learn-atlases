一个模型，若被直接询问时会拒绝有害请求，但同一个请求包进故事、换了语言、拆成几段、或在末尾附上一串优化出来的词元之后就照办，那它并不安全——它只在开发者恰好测过的那些输入上安全。**越狱**（jailbreak）是蓄意设计来让模型产出其开发者曾训练它拒绝的输出的输入。它们是"对抗样本"（adversarial example）这一古老现象的语言模型版本：常常与良性输入几乎无异的输入，却把模型的输出改成设计者不想要的样子。

本章把稳健性当作测量与防御问题来处理。先从分类器中的对抗样本讲起，那里的数学干净：线性模型上的快速梯度符号法，以及一个*有证明的*稳健性认证，而且它恰好是紧的。然后按发表摘要的层次，逐类、按机制描述语言模型的越狱——本章不含任何可用的攻击提示或字符串，理解防御也不需要它们。我们介绍主要的防御——拒绝训练、对抗训练、输入与输出分类器、断路器一类的表征层方法、宪法式分类器——以及为什么防御在结构上难于攻击。最后讲如何诚实地测量攻击成功率：置信区间与自适应攻击者。提示注入——攻击者不是用户、而是模型所读内容的第三方——在 [[agents/agent-security]] 中讨论，这里只做链接。

## 对抗样本 {#sec-adversarial}

Szegedy 等（ICLR 2014，"Intriguing properties of neural networks"）发现，测试准确率极高的图像分类器，可以被加上一个人几乎察觉不到的微小扰动而误分类，而且为一个网络找到的扰动常常也能骗过别的网络。Goodfellow、Shlens 与 Szegedy（ICLR 2015）给出了解释和一种快速攻击。

::: definition 对抗样本与稳健性 {#def-adversarial}
设 $f$ 把输入 $\mathbf x\in\R^d$ 映为标签，$\norm{\cdot}$ 为输入上的一个范数。$f$ 在 $\mathbf x$ 处、预算 $\eps$ 下的**对抗样本**是满足 $\norm{\boldsymbol\delta}\le\eps$ 且 $f(\mathbf x')\ne f(\mathbf x)$ 的 $\mathbf x' = \mathbf x + \boldsymbol\delta$。若这样的 $\mathbf x'$ 不存在，则称模型**在 $\mathbf x$ 处以半径 $\eps$ 稳健**。$\eps$ 下的**稳健准确率**是测试点上既被正确分类*又*以半径 $\eps$ 稳健的比例。
:::

**快速梯度符号法**（fast gradient sign method，FGSM）在 $\ell_\infty$ 预算下，沿使损失增长最快的方向走一个长度为 $\eps$ 的步：
$$
\mathbf x' = \mathbf x + \eps\,\sgn\big(\nabla_{\mathbf x}\mathcal L(\mathbf x, y)\big).
$$ {#eq-fgsm}
Goodfellow 等的**线性性假设**解释了为什么这么小一步就够：在线性分数 $s(\mathbf x) = \mathbf w\cdot\mathbf x + b$ 中，这一步使分数改变 $\eps\norm{\mathbf w}_1$——即使每个坐标只动 $\eps$，这个量也随维数增长。

::: proposition 对线性分数，FGSM 达到最坏情形 {#prop-fgsm}
对 $s(\mathbf x) = \mathbf w\cdot\mathbf x + b$，
$$
\max_{\norm{\boldsymbol\delta}_\infty\le\eps}\mathbf w\cdot\boldsymbol\delta = \eps\norm{\mathbf w}_1,
$$
最大值在 $\boldsymbol\delta = \eps\,\sgn(\mathbf w)$ 处取得。若 $d$ 个权重的典型幅度为 $m$，改变量约为 $\eps m d$：对 $d$ 是线性的，而每个坐标上的扰动大小始终只是 $\eps$。
:::

::: proof
对任何满足 $\abs{\delta_i}\le\eps$ 的 $\boldsymbol\delta$，$\mathbf w\cdot\boldsymbol\delta = \sum_i w_i\delta_i\le\sum_i\abs{w_i}\abs{\delta_i}\le\eps\sum_i\abs{w_i}$。当且仅当每个 $i$ 都有 $\delta_i = \eps\sgn(w_i)$ 时取等（若 $w_i = 0$，$\abs{\delta_i}\le\eps$ 内任取）。对逻辑损失 $\mathcal L = \log(1 + e^{-ys(\mathbf x)})$，梯度为 $\nabla_{\mathbf x}\mathcal L = -y\,\sigma(-ys)\,\mathbf w$，其符号为 $-y\,\sgn(\mathbf w)$，所以 FGSM [[#eq-fgsm]] 恰好沿真实标签的最坏方向移动。
:::

同样的计算给出反方向的一个保证。

::: theorem 线性分类器的认证半径 {#thm-certified}
设 $f(\mathbf x) = \sgn(\mathbf w\cdot\mathbf x + b)$ 且 $\mathbf w\ne\mathbf 0$，$p, q\in[1, \infty]$ 满足 $1/p + 1/q = 1$。若
$$
\norm{\boldsymbol\delta}_p < \frac{\abs{\mathbf w\cdot\mathbf x + b}}{\norm{\mathbf w}_q},
$$ {#eq-radius}
则 $f(\mathbf x + \boldsymbol\delta) = f(\mathbf x)$。这一界是紧的：存在一个 $\norm{\boldsymbol\delta}_p$ 恰好等于右端的 $\boldsymbol\delta$，把 $\mathbf x + \boldsymbol\delta$ 放到决策边界上。特别地，$\ell_\infty$ 半径为 $\abs{s(\mathbf x)}/\norm{\mathbf w}_1$，$\ell_2$ 半径为 $\abs{s(\mathbf x)}/\norm{\mathbf w}_2$。
:::

::: proof
由 Hölder 不等式，$\abs{\mathbf w\cdot\boldsymbol\delta}\le\norm{\mathbf w}_q\norm{\boldsymbol\delta}_p < \abs{s(\mathbf x)}$。于是 $s(\mathbf x + \boldsymbol\delta) = s(\mathbf x) + \mathbf w\cdot\boldsymbol\delta$ 既不能变号也不能到达零。至于紧性，Hölder 不等式可以取等：存在 $\mathbf u$ 使 $\norm{\mathbf u}_p = 1$ 且 $\mathbf w\cdot\mathbf u = \norm{\mathbf w}_q$（$p = \infty$ 时取 $\mathbf u = \sgn(\mathbf w)$；$p = 2$ 时 $\mathbf u = \mathbf w/\norm{\mathbf w}_2$）。于是 $\boldsymbol\delta = -\sgn(s(\mathbf x))\,\frac{\abs{s(\mathbf x)}}{\norm{\mathbf w}_q}\mathbf u$ 具有所述范数，且 $s(\mathbf x + \boldsymbol\delta) = 0$。
:::

因此，对线性模型，[[#prop-fgsm]] 的攻击与[[#thm-certified]] 的认证恰好吻合：稳健准确率可以被计算，而不只是估计。对深度网络，两者并不吻合。攻击给出稳健准确率的**上界**（经受住已试攻击的点，仍可能有谁也没找到的对抗样本），认证则通过区间界传播或**随机平滑**（Cohen、Rosenfeld 与 Kolter，2019——对输入的高斯扰动副本投票的分类器，由此可认证一个 $\ell_2$ 半径）一类方法给出**下界**。困难正在这两个界之间的缝隙里。

::: example $100$ 维中为 $2$ 的间隔 {#ex-margin}
$d = 100$ 个特征上的线性分类器，每个权重的幅度约为 $0.14$，故 $\norm{\mathbf w}_1 = 14$、$\norm{\mathbf w}_2 = 1.4$；一个测试点的分数为 $s = 2$。(a) 它的认证 $\ell_\infty$ 与 $\ell_2$ 半径各是多少？(b) 一个 $\eps = 0.15$ 的 FGSM 扰动把每个特征改变 $0.15$，不到噪声标准差的六分之一。它能翻转预测吗？
::: solution
(a) 由[[#thm-certified]]，$r_\infty = 2/14 = 0.143$，$r_2 = 2/1.4 = 1.43$。(b) 分数至多改变 $\eps\norm{\mathbf w}_1 = 0.15\cdot14 = 2.1 > 2$，所以能。该扰动的 $\ell_2$ 范数为 $0.15\sqrt{100} = 1.5$，恰在 $r_2$ 之上——这与 $\ell_2$ 认证相符：坐标一多，每个坐标上微不足道的扰动在 $\ell_2$ 下并不小。[[#sec-code]]中的清单训练了这样一个分类器：准确率 $0.81$ 在 $\eps = 0.1$ 时降到 $0.525$，在 $\eps = 0.3$ 时降到 $0.095$；而在每个 $\eps$ 下，认证准确率都恰等于 FGSM 之下的准确率。
:::
:::

分类器的标准防御是**对抗训练**（Madry 等，ICLR 2018）：在内层攻击找到的最坏扰动上训练，即求解
$$
\min_\theta\ \E_{(\mathbf x, y)}\Big[\max_{\norm{\boldsymbol\delta}\le\eps}\mathcal L\big(f_\theta(\mathbf x + \boldsymbol\delta), y\big)\Big].
$$ {#eq-minmax}
它对图像分类器是最可靠的经验防御，代价是干净准确率与算力；而且它的稳健性只在其训练所依据的威胁模型——某个给定半径的 $\ell_\infty$ 球——内成立，出了这个范围就不可靠。这两条教训都适用于语言模型：稳健性总是相对于威胁模型定义的，防御住一类攻击对别的类别说明不了什么。

## 越狱 {#sec-jailbreaks}

对语言模型，输入空间是离散的，而"标签"是一整个行为，所以稳健性必须重新定义。

::: definition 越狱与攻击成功率 {#def-jailbreak}
固定一个**违禁行为**集合 $\mathcal B$（开发者政策要求模型拒绝的请求），以及一个判定回答 $\mathbf y$ 是否真的表现出行为 $b$ 的**评审** $J(b, \mathbf y)\in\{0, 1\}$。若输入 $\mathbf x$ 由攻击者在某个**威胁模型**（他能改什么：只改用户轮次、系统提示、还是权重；多少次查询；能否看到对数概率）之下构造出来，使模型的回应 $\mathbf y$ 满足 $J(b, \mathbf y) = 1$，则称 $\mathbf x$ 为 $b$ 的一个**越狱**。一个攻击对一个模型的**攻击成功率**（attack success rate，ASR），是基准的行为中该攻击产出经评审认定之成功的比例，可以允许每个行为 $k$ 次尝试的预算（"ASR at $k$"）。
:::

两个特征使它不同于分类器的稳健性。其一，没有小扰动约束：攻击者能打进来的任何输入都合法，所以稳健性无法用范数球来认证。其二，成败由评审——通常是一个模型——判定，评审自己的误差也进入测量（[[#sec-measuring]]）。

### 安全训练为何失效

Wei、Haghtalab 与 Steinhardt（NeurIPS 2023，"Jailbroken: how does LLM safety training fail?"）提出了两个失效模式，大多数已知攻击都能在其中找到位置。

::: definition 目标竞争与错配泛化 {#def-failure-modes}
**目标竞争**（competing objectives）：模型为好几个目标同时训练——遵循指令、对用户有用、把文本续写得自然、拒绝有害请求——攻击构造出这样的情境：其余目标与拒绝互相拉扯，于是拒绝反而会违背模型同时被训练出来的行为。**错配泛化**（mismatched generalisation）：模型的能力泛化到了它的安全训练没有覆盖的输入——在那些格式、编码、语言或情境下，它仍然听得懂、也做得了这个请求，但拒绝从未在这些输入上被训练过。
:::

Wei 等表明，综合这两条原则构造的攻击，在他们所策展的大部分有害提示上攻破了当时的安全训练模型，并主张需要"安全–能力均衡"（safety-capability parity）——保护模型的安全机制要与模型本身一样精巧，因为越能干的模型越能理解安全训练漏掉的那些输入。例如 Yong、Menghini 与 Bach（2023）发现，把请求翻译成低资源语言，能大幅提高对当时某个模型的攻击成功率——这正是错配泛化的一个实例。

### 攻击的类别

已发表的攻击归于几大家族。这里只描述机制。

- **人工构造的提示。**角色扮演与人格设定、假设或虚构的外壳、以及劝阻拒绝的指令；多数利用目标竞争。社区早期的提示收集由 Shen 等（2024）作了系统研究。
- **混淆。**编码、密码、模型能解码、却未曾训练过拒绝的格式或语言——错配泛化。
- **多样本越狱**（many-shot jailbreaking；Anil 等，2024）。往长上下文里塞满编造的、其中助手顺从的对话，利用上下文学习；作者发现攻击成功率随示例数量按幂律增长，而且这只有在长上下文窗口出现后才成为可能。
- **基于优化的攻击。**贪心坐标梯度（greedy coordinate gradient，GCG；Zou 等，2023）利用经由词元嵌入的梯度，在开放权重模型上搜索一个后缀，使目标模型以肯定答复开头的概率上升；在开放模型上找到的后缀能在一定程度上迁移到闭源模型。这类后缀看起来像乱码，因此可以被困惑度过滤器检测（Jain 等，2023；Alon 与 Kamfonas，2023）；后来的方法转而搜索通顺的替代。
- **模型驱动的攻击。**攻击者模型根据目标的回应迭代改进提示，如 PAIR（Chao 等，2023）及其树搜索扩展 TAP（Mehrotra 等，2023），通常几十次查询即可得手；红队测试模型（[[safety-alignment/red-teaming]]）把这一想法一般化了。
- **随机搜索与采样。**best-of-$N$ 越狱（Hughes 等，2024）对请求反复施加随机的表层改写并重新采样，利用模型的随机性；成功率随 $N$ 可预期地增长。
- **微调攻击。**只要拿得到权重或微调服务，简短的进一步训练就能去掉安全行为：Qi 等（2023）发现，在某个商用微调接口上，少量有害示例就足以抵消模型安全训练的相当一部分，而连良性的微调也会使其有所退化。对开放权重模型，这是首要的威胁模型（[[llm-society/open-closed-models]]）。

### 攻击者的优势

防御难于攻击，有可以量化的结构性原因。

::: proposition 尝试次数与攻击家族会叠加 {#prop-compound}
(a) 若某攻击的每次尝试以概率 $p$ 独立成功，则 $k$ 次尝试中至少一次成功的概率为 $1 - (1 - p)^k$。(b) 若攻击者掌握 $m$ 个攻击家族，分别以概率 $p_1, \dots, p_m$ 独立成功，则至少一个家族成功的概率为 $1 - \prod_i(1 - p_i)\ge\max_i p_i$：防守方的失败概率由它*最弱*的那个家族支配，而且还要更大。
:::

::: proof
(a) 由独立性，$k$ 次全部失败的概率为 $(1 - p)^k$；取补集。(b) 同样地，全部家族都失败的概率为 $\prod_i(1 - p_i)$；又因每个因子至多为 $1$，对任何 $j$ 有 $\prod_i(1 - p_i)\le 1 - p_j$。
:::

::: widget plot
f: 1 - (1 - p)^x; 1 - b/(b + x)
x: 1, 200
y: 0, 1
sliders: p=0.02:0.001:0.2:0.001; b=49:1:100:1
labels: same success probability $p$ on every behaviour; heterogeneous behaviours, Beta$(1, b)$
caption: $k$ 次尝试的攻击成功率随尝试次数的变化。上曲线：每个行为的单次成功概率同为 $p$（[[#prop-compound]]）；$p = 0.02$ 时，$50$ 次尝试的成功率为 $64\%$，$100$ 次为 $87\%$。下曲线：各行为的单次概率服从 Beta$(1, b)$ 分布，在默认 $b = 49$ 下均值 $1/(1 + b)$ 恰为 $0.02$（[[#prop-heterogeneous]]）；$50$ 次尝试只达到 $51\%$——有些行为几乎无懈可击，曲线因此爬升得慢得多。真实的攻击标度曲线介于两者之间。
:::

独立性是理想化：针对同一行为的各次尝试是相关的，因为有些行为就比其他行为难诱发得多。把这层异质性建模之后，就能解释攻击成功率为什么比 (a) 的预测增长得更慢、更像幂律。

::: proposition 异质的行为集合 {#prop-heterogeneous}
设行为的单次成功概率 $P$ 随行为服从 Beta$(a, b)$ 分布，且给定 $P$ 时同一行为上的各次尝试独立。则
$$
1 - \mathrm{ASR}@k = \E\big[(1 - P)^k\big] = \frac{\mathrm B(a, b + k)}{\mathrm B(a, b)} \sim \frac{\Gamma(a + b)}{\Gamma(b)}\,k^{-a}\quad(k\to\infty).
$$
$a = 1$ 时它恰为 $b/(b + k)$。尚未被攻破的行为比例按 $k$ 的幂衰减，而非指数衰减。
:::

::: proof
$\E[(1 - P)^k] = \frac{1}{\mathrm B(a, b)}\int_0^1 p^{a - 1}(1 - p)^{b - 1 + k}\,dp = \frac{\mathrm B(a, b + k)}{\mathrm B(a, b)}$。写出 $\mathrm B(a, b + k) = \Gamma(a)\Gamma(b + k)/\Gamma(a + b + k)$；由 $\Gamma(b + k)/\Gamma(a + b + k)\sim k^{-a}$，该比值渐近于 $\frac{\Gamma(a)\Gamma(a + b)}{\Gamma(a)\Gamma(b)}k^{-a}$。$a = 1$ 时 $\mathrm B(1, c) = 1/c$，得 $b/(b + k)$。
:::

::: example 五十次尝试 {#ex-attempts}
某攻击平均对 $2\%$ 的（行为，尝试）对单次尝试成功。估计 $50$ 次尝试下的 ASR：(a) 每个行为都有 $p = 0.02$；(b) 各行为的单次概率服从均值为 $0.02$ 的 Beta$(1, 49)$。
::: solution
(a) $1 - 0.98^{50} = 1 - 0.364 = 0.636$。(b) $1 - 49/(49 + 50) = 1 - 0.495 = 0.505$。两者都远高于单次的 $2\%$：一个每个行为只评测一次尝试的防御，几乎说明不了面对可以重试的攻击者时的情形。把 ASR 作为攻击预算——查询、算力、人工时——的函数来报告，比单个数字信息量大得多。
:::
:::

还有一处不对称是**自适应**：攻击者后手落子。一个防御若只对设计它时就已存在的攻击做了评测，那它其实是被一个不知道它存在攻击者试过的。对图像分类器，Athalye、Carlini 与 Wagner（2018）为某个顶级会议录用的九个防御中的七个逐个改造攻击并加以攻破，Tramèr 等（2020）又照样攻破了另外十三个；这一教训成了规范：防御必须对照**在充分了解防御的情况下设计的自适应攻击**来评测。语言模型的防御重演了这段历史：Andriushchenko、Croce 与 Flammarion（2024）报告，针对每个模型简单改造的简单攻击，对多个安全训练模型几乎全部得手；Nasr、Carlini 与合作者（2025，"The attacker moves second"）报告用自适应攻击绕开了一批已发表的越狱与提示注入防御——尽管它们中的大多数曾报告对固定攻击的成功率接近于零。

::: warning 固定基准上的低 ASR 不是稳健性
一个挡下了公开基准里所有攻击的防御，可能只是学会了那些攻击。有意义的说法长这样："对拥有这种知识、这个预算、这种访问权限的攻击者，攻击成功率至多 $x$"，并且要用防御出现之后设计的攻击来测量。防御还必须度量它的代价：什么都拦，ASR 自然是零。
:::

## 防御 {#sec-defences}

防御在四个位置起作用：模型的权重、它的内部表征、它周围的输入输出、以及它所在的部署系统。

**拒绝训练。**监督微调与偏好学习中的安全数据（[[post-training/rlhf]]、[[post-training/ai-feedback]]）教会模型拒绝违禁请求。这是第一道防线，也是越狱的靶子：Wei 等的两个失效模式，正是拒绝训练的泛化之失败。一个变体让模型在回答前先对一个成文的安全规格做显式推理（Guan 等，2024，"deliberative alignment"，慎思式对齐），据报道这提高了对已知越狱的稳健性，同时减少了过度拒绝。

**对抗训练。**对当前模型生成攻击，再训练它拒绝这些攻击——即把[[#eq-minmax]]中的内层最大化换成一个攻击生成器。Mazeika 等（2024）推出了标准化评测 HarmBench，并配有对抗训练方法 R2D2：对持续更新的基于优化攻击的池子做训练，大幅降低了它们的成功率。由于输入空间没有边界，训练中所见攻击家族的稳健性只能部分迁移到新家族。**潜在对抗训练**（latent adversarial training；Casper 等，2024；Sheshadri 等，2024）扰动内部激活而非输入，追求的是对输入空间中无法预见的攻击的稳健性。

**表征层防御。**断路器（circuit breakers；Zou 等，2024，"Improving alignment and robustness with circuit breakers"）使用**表征重定向**（representation rerouting）：在一次简短的微调中，把生成有害内容时出现的内部表征推向不相干的方向，同时保持良性数据上的表征不变。其意图不是识别有害输入，而是不管输入从哪来，都打断有害的*过程*本身。作者报告在大量攻击家族——包括训练中未使用的——上攻击成功率大幅下降，能力几乎无损。其后的独立评测则报告，某些自适应攻击——包括直接扰动输入嵌入的攻击（只在白盒访问下才存在的更强威胁模型）——比原评测所示更常得手，又是上面那条自适应教训的一个实例。

**输入与输出分类器。**由一个单独的分类器筛查提示、回答或两者：例子包括 Llama Guard（Inan 等，2023，一个微调的语言模型，按一份危害类型清单给对话打标签），以及针对乱码后缀的困惑度过滤器。输出分类器对输入过滤器有一个优势：它判断的是模型实际产出的东西，因此不太受混淆输入的影响——尽管攻击者也可以索要混淆的输出。宪法式分类器（constitutional classifiers；Sharma 等，Anthropic，2025）用从一份自然语言**宪法**——列出某个领域内允许与限制的内容（已发表的工作聚焦化学、生物、放射性与核武器信息）——生成的大量合成数据，训练输入分类器与流式输出分类器。流式输出分类器能在生成途中截停回答。Anthropic 报告：在一次原型系统的漏洞赏金计划中，$183$ 名参与者花费超过 $3{,}000$ 小时，没有找到能提取全部十个目标问题答案的**通用越狱**；在自动化评测中，有分类器时越狱成功率从无分类器时的 $86\%$ 降到 $4.4\%$；改进版在生产流量上以 $23.7\%$ 的算力开销，把拒绝率提高了 $0.38$ 个百分点。在其后的公开挑战赛中，确实有参与者通过了所有关卡。这些是开发者自己的结果，而且这一防御在设计上就是限定领域的。

**系统级措施。**速率限制与查询预算（它们限制[[#prop-compound]]中的 $k$）、账户级监控与处置、对更高滥用潜能的分级访问、事件响应（[[safety-alignment/monitoring-control]]、[[safety-alignment/safety-frameworks]]）。把危险知识从模型中移除——**机器遗忘**（machine unlearning），例如在 WMDP 基准上评测（Li 等，2024）——追求的是让越狱失去意义、而不只是更难；不过被遗忘的知识能否经微调恢复，仍是活跃的问题。

::: example 分层防御与它们的相关性 {#ex-layers}
三层防御——拒绝训练、输入分类器、输出分类器——面对数量相等的两类攻击。普通攻击被三层独立漏过的概率各为 $0.1$、$0.2$、$0.15$。混淆攻击被每一层漏过的概率都是 $0.5$，且相互独立。(a) 每层的总漏过率是多少？(b) 全部攻击中有多大比例能穿过三层？(c) 若错误地把三层当成以总漏过率独立，你会预测多少？
::: solution
(a) $0.5\cdot0.5 + 0.5\cdot0.1 = 0.3$、$0.5\cdot0.5 + 0.5\cdot0.2 = 0.35$、$0.5\cdot0.5 + 0.5\cdot0.15 = 0.325$。(b) 普通攻击以概率 $0.1\cdot0.2\cdot0.15 = 0.003$ 穿过三层，混淆攻击以 $0.5^3 = 0.125$ 穿过，总体为 $0.5\cdot0.003 + 0.5\cdot0.125 = 0.064$。(c) $0.3\cdot0.35\cdot0.325 = 0.034$，将近乐观了两倍。在每一类攻击内部，三层在这里是独立的，但混合却让它们的失败正相关：一层漏过的攻击，恰好也是别层更常漏过的那些。分层防御在失败互不相关时收益最大，这就是为什么检查不同对象（权重、输入、输出、账户行为）的各层，比几个彼此相似的层更值钱（[[agents/agent-security#prop-depth]]）。
:::
:::

## 测量稳健性 {#sec-measuring}

稳健性的论断就是关于攻击成功率的统计论断，因此它继承了评测的所有问题（[[evaluation/evaluation-principles]]），外加几个自己独有的。

**什么算成功。**早期论文常把任何不以拒绝套话开头的回答都算作越狱成功。Souly 等（2024，StrongREJECT）表明这会高估成功率：许多"被越狱"的回答含糊、错误或无用；有些攻击把模型的能力削弱得太厉害，它的顺从其实无害。他们提议对回答同时评"意愿"与"质量"。HarmBench（Mazeika 等，2024）把行为、攻击与一个微调的评审标准化，使结果可以互相比较。评审必须对照人工标签在*被攻击的*分布上验证过，因为攻击也可能骗过评审本身。

**过度拒绝。**防御必须在表面上像有害请求的良性请求上计分——XSTest（Röttger 等，2024）与 OR-Bench 是例子——也要在普通流量上计分。良性提示上的拒绝率要与 ASR 成对报告。

**不确定性。**基准只含几百个行为，而小 ASR 需要精确区间。

::: proposition 三法则 {#prop-rule-three}
若某攻击在 $n$ 次独立试验中成功 $0$ 次，则其成功概率的精确单侧 $95\%$ 置信上界为 $1 - 0.05^{1/n}$，大 $n$ 时近似 $3/n$。
:::

::: proof
上界是不被"零成功"的观测在 $0.05$ 水平拒绝的最大 $p$，即使 $\Prob(0\text{ 次成功}) = (1 - p)^n = 0.05$ 的 $p$，解得 $p = 1 - 0.05^{1/n}$。由 $0.05^{1/n} = e^{\ln(0.05)/n}$ 且 $\ln 0.05 = -2.996$，大 $n$ 时得 $1 - e^{-2.996/n}\approx2.996/n\approx3/n$。
:::

::: example 零次成功 {#ex-zero}
一个带防御的模型在 $100$ 次攻击尝试中成功 $0$ 次。(a) 给出双侧 $95\%$ Clopper–Pearson 区间与单侧的三法则界。(b) 若要宣称 ASR 低于 $0.5\%$（$95\%$ 置信、零成功），需要多少次尝试？(c) $100$ 次中成功 $3$ 次，区间是什么？
::: solution
(a) 双侧：$[0, 1 - 0.025^{1/100}] = [0, 0.0362]$。单侧：$1 - 0.05^{1/100} = 0.0295$，接近 $3/100$。(b) $1 - 0.05^{1/n}\le0.005$ 需要 $n\ge\ln0.05/\ln0.995 = 597.6$，即 $598$ 次（三法则给 $600$）。(c) Clopper–Pearson 给出 $[0.0062, 0.0852]$（[[#sec-code]]）。"一百次里零次"与真实比率 $3\%$ 相容，而放到数百万次查询里，$3\%$ 是多得惊人的成功次数。
:::
:::

::: widget confidence
dist: bernoulli
n: 100
level: 0.95
intervals: 50
caption: 五十次模拟的攻击评测，每次 $n$ 次尝试，各给出一个 $95\%$ 置信区间。约 $95\%$ 的区间覆盖真实攻击成功率。$n = 100$ 时，接近一半的比率的区间半宽约 $\pm10$ 个百分点；对比率接近零的情形，这里展示的正态近似区间并不可靠，所以小 ASR 要用精确（Clopper–Pearson）区间或 Wilson 区间，以及三法则（[[#prop-rule-three]]）。
:::

**聚类。**同一行为的各次尝试是相关的，因此每个行为多次尝试时，标准误应按行为聚类（[[agents/agent-security#prop-variance]]）。同一批行为上不同防御之间的比较应当配对进行。

::: algorithm 报告一次稳健性评测 {#alg-report}
1. 声明**威胁模型**：访问（黑盒 API、对数概率、权重、微调）、预算（查询、算力、人工时）、对防御的了解程度。
2. 固定来自可查来源的**行为**、**评审**及其对照人工标签的验证、成功标准（意愿与有用性）。
3. 跑文献中的**固定**攻击，并由未参与构建该防御的人跑针对该防御设计的**自适应**攻击。
4. 报告每种攻击的 ASR 及精确区间，并按预算报告其变化；标准误按行为聚类；报告**最坏**的攻击，而不是平均。
5. 报告**代价**：良性与边界提示上的过度拒绝、能力基准、延迟与算力。
6. 公开足以复现的细节，但对已部署系统不公开可用的攻击（披露问题见[[safety-alignment/red-teaming]]）。
:::

## 代码 {#sec-code}

下面的清单在 $d = 100$ 个特征的合成数据上训练一个逻辑回归分类器，用 FGSM 攻击它，按[[#thm-certified]]计算认证准确率，并为攻击成功率计算精确的 Clopper–Pearson 区间。

```python
import random, math

# --- 1. 合成数据上的线性分类器 -------------------------------------------------
rng = random.Random(3)
d, n = 100, 600
mu = [0.15 if i < 50 else 0.0 for i in range(d)]   # 类别均值为 ±mu：许多特征上的弱信号
def sample(label):
    return [label * m + rng.gauss(0, 1) for m in mu], label
data = [sample(rng.choice((-1, 1))) for _ in range(n)]
train, test = data[:400], data[400:]

w, b, lr = [0.0] * d, 0.0, 0.05
for epoch in range(200):                          # 逻辑回归，全批量梯度下降
    gw, gb = [0.0] * d, 0.0
    for x, y in train:
        m = y * (sum(wi * xi for wi, xi in zip(w, x)) + b)
        g = -y / (1 + math.exp(m))                # 对 log(1 + exp(-y*score)) 关于 score 求导
        for i in range(d):
            gw[i] += g * x[i]
        gb += g
    w = [wi - lr * gi / len(train) for wi, gi in zip(w, gw)]
    b -= lr * gb / len(train)

score = lambda x: sum(wi * xi for wi, xi in zip(w, x)) + b
l1 = sum(abs(wi) for wi in w)
l2 = math.sqrt(sum(wi * wi for wi in w))
sign = lambda v: (v > 0) - (v < 0)
print(f"||w||_1 = {l1:.2f}   ||w||_2 = {l2:.3f}   ratio {l1 / l2:.1f}")

# --- 2. 对线性模型，FGSM 恰是最坏情形 -----------------------------------------
for eps in (0.0, 0.05, 0.1, 0.2, 0.3):
    fgsm_ok = cert_ok = 0
    for x, y in test:
        x_adv = [xi - eps * y * sign(wi) for xi, wi in zip(x, w)]   # 沿不利于真实标签的方向走一步
        fgsm_ok += sign(score(x_adv)) == y
        cert_ok += y * score(x) > eps * l1                          # 认证条件：间隔 / ||w||_1 > eps
    print(f"eps={eps:.2f}: accuracy under FGSM {fgsm_ok / len(test):.3f}   certified {cert_ok / len(test):.3f}")

# --- 3. 攻击成功率与精确（Clopper-Pearson）区间 --------------------------------
def binom_cdf(k, n, p):
    return sum(math.comb(n, i) * p**i * (1 - p)**(n - i) for i in range(k + 1))
def clopper_pearson(k, n, alpha=0.05):
    def solve(f, lo=0.0, hi=1.0):                  # 对递减函数 f 二分求根
        for _ in range(60):
            mid = (lo + hi) / 2
            lo, hi = (mid, hi) if f(mid) > 0 else (lo, mid)
        return (lo + hi) / 2
    lower = 0.0 if k == 0 else solve(lambda p: alpha / 2 - (1 - binom_cdf(k - 1, n, p)))
    upper = 1.0 if k == n else solve(lambda p: binom_cdf(k, n, p) - alpha / 2)
    return lower, upper
for k, n_att in ((0, 100), (3, 100), (12, 300), (0, 1000)):
    lo, hi = clopper_pearson(k, n_att)
    print(f"{k:3d}/{n_att:<5d} ASR {k / n_att:.3f}  95% CI [{lo:.4f}, {hi:.4f}]")
print("rule of three, n=1000:", 3 / 1000, " exact one-sided:", round(1 - 0.05 ** (1 / 1000), 5))
```

输出：

```
||w||_1 = 14.05   ||w||_2 = 1.766   ratio 8.0
eps=0.00: accuracy under FGSM 0.810   certified 0.810
eps=0.05: accuracy under FGSM 0.695   certified 0.695
eps=0.10: accuracy under FGSM 0.525   certified 0.525
eps=0.20: accuracy under FGSM 0.245   certified 0.245
eps=0.30: accuracy under FGSM 0.095   certified 0.095
  0/100   ASR 0.000  95% CI [0.0000, 0.0362]
  3/100   ASR 0.030  95% CI [0.0062, 0.0852]
 12/300   ASR 0.040  95% CI [0.0208, 0.0688]
  0/1000  ASR 0.000  95% CI [0.0000, 0.0037]
rule of three, n=1000: 0.003  exact one-sided: 0.00299
```

两列准确率的数值完全相同，正如[[#prop-fgsm]]与[[#thm-certified]]对线性模型一起要求的那样：攻击是最优的，认证是紧的。比值 $\norm{\mathbf w}_1/\norm{\mathbf w}_2 = 8$，正是 $\ell_\infty$ 半径远小于 $\ell_2$ 半径的原因。

::: quiz
一篇论文报告：在其包含 $200$ 个行为的公开基准上，用基准里自带的攻击，其越狱防御把 ASR 从 $62\%$ 降到 $1\%$。最重要的缺失证据是什么？
- [ ] 在第二个公开基准上、用同样的攻击测得的 ASR。
- [x] 对照在了解该防御的情况下设计的自适应攻击的结果，以及该防御在良性提示上的过度拒绝率。
- [ ] 一个更大的模型。
- [ ] 评审在重复运行中与自己的一致程度。
::: solution
固定攻击度量的只是对不知道防御存在的攻击者的稳健性；历史表明，这类结果面对自适应攻击常常崩盘（[[#sec-jailbreaks]]）。没有过度拒绝率，一个拒绝一切的防御看起来会完美无缺（[[#alg-report]]）。
:::
:::

::: history
Biggio 等（2013）与 Szegedy 等（2014）发现了对抗样本；Goodfellow 等（2015）提出了 FGSM 与线性性假设；Madry 等（2018）确立了作为鲁棒优化的对抗训练；Athalye 等（2018）与 Tramèr 等（2020）让自适应评测成了规范；Cohen 等（2019）引入了随机平滑。语言模型方面，Wallace 等（2019）为文本分类器与生成器找到了通用对抗触发器。社区对聊天助手的越狱从 2022 年底流传开来；Wei 等（2023）用目标竞争与错配泛化解释了它们；Zou 等（2023）找到可迁移的优化后缀；Chao 等（2023）用攻击者模型自动化攻击；Qi 等（2023）表明微调能移除安全措施；Anil 等（2024）描述了多样本越狱，Hughes 等（2024）描述了 best-of-$N$ 越狱。防御方面，Inan 等（2023）发布 Llama Guard；Mazeika 等（2024）发布 HarmBench；Souly 等（2024）发布 StrongREJECT；Zou 等（2024）提出断路器；Sharma 等（2025）提出宪法式分类器。截至 2026 年，还没有哪个防御被证明能在各领域对自适应攻击者保持稳健，开发者依赖的是分层防御与监控的结合。
:::

::: summary
- 对抗样本以威胁模型内的扰动改变模型的输出。对线性分数，FGSM 的最坏改变是 $\eps\norm{\mathbf w}_1$，随维数增长。
- 线性分类器在 $\ell_p$ 下于半径 $\abs{s(\mathbf x)}/\norm{\mathbf w}_q$ 内可认证稳健，且该界是紧的；对深度网络，攻击与认证给出一对并不吻合的上下界。
- 越狱诱发违禁行为；安全训练因目标竞争与错配泛化而失效（Wei 等，2023）。攻击家族：人工提示、混淆、多样本、优化、攻击者模型、随机搜索、微调。
- 攻击在尝试次数与家族之间叠加；行为异质性让成功率随预算呈幂律增长；自适应攻击者后手落子：ASR 要对照自适应攻击、并作为预算的函数来报告。
- 防御：拒绝训练、对抗训练与潜在对抗训练、断路器、输入与输出（含宪法式）分类器、机器遗忘、系统级限制；每一层都有记录在案的限度，各层失败互不相关时收益最大。
- 用经过验证、兼评有用性的评审来判定成功，报告过度拒绝，并使用精确区间：$n$ 次试验零成功，仍与接近 $3/n$ 的真实比率相容。
:::

## 习题

::: exercise 线性分数上的 FGSM {level=1 check="2.5"}
一个线性分数有 $\norm{\mathbf w}_1 = 25$。$\eps = 0.1$ 的 $\ell_\infty$ 扰动至多能把分数改变多少？
::: solution
$\eps\norm{\mathbf w}_1 = 0.1\cdot25 = 2.5$（[[#prop-fgsm]]）。
:::
:::

::: exercise 认证半径 {level=1 check="0.4"}
一个线性分类器的 $\mathbf w = (3, -4)$、$b = 0$，考察点 $\mathbf x = (0.5, -0.125)$。它的认证 $\ell_2$ 半径是多少？
::: solution
$s(\mathbf x) = 3\cdot0.5 + (-4)(-0.125) = 1.5 + 0.5 = 2$，$\norm{\mathbf w}_2 = 5$，故 $r_2 = 2/5 = 0.4$（[[#thm-certified]]）。$\ell_\infty$ 半径为 $2/\norm{\mathbf w}_1 = 2/7 = 0.286$。
:::
:::

::: exercise 三法则 {level=1 check="0.0006"}
一个防御在 $5{,}000$ 次攻击尝试中没有出现成功。用三法则，其 ASR 的近似 $95\%$ 上界是多少？
::: solution
$3/5000 = 0.0006$（[[#prop-rule-three]]）；精确值 $1 - 0.05^{1/5000} = 0.000599$。
:::
:::

::: exercise 需要的尝试次数 {level=2 check="114"}
某攻击在每个行为上的单次成功概率都是 $0.02$，相互独立。ASR at $k$ 要达到 $90\%$，每个行为需要多少次尝试？给出最小整数。
::: solution
$1 - 0.98^k\ge0.9$ 需要 $k\ge\ln0.1/\ln0.98 = 2.3026/0.020203 = 113.97$，故 $k = 114$（[[#prop-compound]]）。
:::
:::

::: exercise 异质性 {level=2 check="0.8"}
各行为的单次成功概率服从 Beta$(1, 24)$。$k = 96$ 次尝试时的 ASR 是多少？
::: solution
由[[#prop-heterogeneous]]，取 $a = 1$，$1 - \mathrm{ASR} = 24/(24 + 96) = 0.2$，故 ASR $= 0.8$。若为齐次的 $p = 1/25 = 0.04$，则会是 $1 - 0.96^{96} = 0.980$。
:::
:::

::: exercise 一次论断需要的次数 {level=2 check="2995"}
要以 $95\%$ 单侧置信宣称 ASR 低于 $0.1\%$，在零成功的情况下需要多少次攻击尝试？用精确界。
::: solution
$(1 - 0.001)^n\le0.05$ 给出 $n\ge\ln0.05/\ln0.999 = -2.99573/-0.0010005 = 2994.2$，即 $2{,}995$ 次尝试（[[#prop-rule-three]]）。
:::
:::

::: exercise 失效模式归类 {level=2}
对下列每种防御，说明它主要应对 Wei 等的哪个失效模式（[[#def-failure-modes]]），为什么：(a) 在多种语言与多种编码中加入安全训练数据；(b) 训练模型在回答前对一个成文的安全规格做推理；(c) 检查解码后回答的输出分类器；(d) 断路器。
::: solution
(a) 错配泛化：把拒绝训练扩展到能力已经泛化过去了的输入。(b) 主要是目标竞争：对规格做显式推理，让模型得以察觉有用性或遵从中何时有违政策，并按政策解决冲突；若能认出背后的请求，对错配泛化也有帮助。(c) 两者各沾一部分：不管输入是什么，它判断的是输出本身，从而绕开混淆的输入；但它有自己的泛化缺口（混淆的输出）。(d) 意图上是两者：它作用于有害生成的内部表征，与输入走哪条路线无关，因此不依赖攻击利用某个特定目标或格式——不过与任何学出来的防御一样，它的泛化必须用自适应攻击来测量。
:::
:::

::: exercise 认证需要间隔 {level=3}
证明：对线性分类器，在 $\ell_\infty$ 半径 $\eps$ 下获得认证的测试点比例，恰等于 $\eps$ 下的稳健准确率；并解释为什么 ReLU 网络不满足同一等式。此时攻击与认证各能告诉你什么？
::: solution
一个点计入 $\eps$ 下的稳健准确率，当且仅当它被正确分类，且不存在 $\norm{\boldsymbol\delta}_\infty\le\eps$ 的 $\boldsymbol\delta$ 改变其预测。由[[#thm-certified]]取 $p = \infty$，每个满足 $\norm{\boldsymbol\delta}_\infty < y\,s(\mathbf x)/\norm{\mathbf w}_1$ 的 $\boldsymbol\delta$ 都不改变预测；又由紧性，恰在该范数处存在某个 $\boldsymbol\delta$ 抵达边界；于是（边界情形除外）一个被正确分类的点在 $\eps$ 下稳健，当且仅当 $y\,s(\mathbf x) > \eps\norm{\mathbf w}_1$——这正是认证判据。对 ReLU 网络，最坏扰动要解一个非凸问题（精确地说是一个一般情形 NP 难的混合整数规划），于是梯度攻击可能漏掉对抗样本，可处理的认证则放宽了问题、可能认证不了本已稳健的点。此时攻击给稳健准确率的*上*界，认证给*下*界，真值介于两者之间（[[#sec-adversarial]]）。
:::
:::

::: exercise 相关的各层 {level=3}
三层防御各漏掉比例为 $m$ 的攻击。比例为 $\phi$ 的攻击是"通用的"，被所有层漏掉；其余攻击在每层以概率 $r$ 独立被漏掉。用 $\phi$ 与 $r$ 表示每层的漏过率与总穿透率，并在 $\phi = 0.01$、$r = 0.1$ 下求值。
::: solution
每层漏掉全部通用攻击及其余攻击中的 $r$ 比例：$m = \phi + (1 - \phi)r$。一次攻击穿过三层，当它是通用的，或它是普通攻击且三次都被漏掉：穿透率 $= \phi + (1 - \phi)r^3$。代入 $\phi = 0.01$、$r = 0.1$：$m = 0.01 + 0.99\cdot0.1 = 0.109$，穿透率 $= 0.01 + 0.99\cdot0.001 = 0.01099$。若把三层当作漏过率 $0.109$ 的独立层，会预测 $0.109^3 = 0.0013$，乐观了不止八倍。无论再加多少层，穿透率都永不低于 $\phi$：通用攻击定着下限——这就是宪法式分类器的评测格外强调搜寻*通用*越狱的原因（[[#sec-defences]]）。
:::
:::

::: exercise 实现 Wilson 区间 {level=3}
给清单加一个计算 Wilson 得分区间的函数，与 Clopper–Pearson 在 $3/100$ 与 $0/100$ 下比较，并说明做一个安全论断时你会报告哪一个。
::: solution
Wilson 区间为 $\big(\hat p + \frac{z^2}{2n}\pm z\sqrt{\frac{\hat p(1 - \hat p)}{n} + \frac{z^2}{4n^2}}\big)/(1 + z^2/n)$（与[[safety-alignment/reward-hacking#sec-code]]的清单同形）。$3/100$ 时它给出 $[0.0103, 0.0845]$，$0/100$ 时给出 $[0, 0.0370]$；Clopper–Pearson 给出 $[0.0062, 0.0852]$ 与 $[0, 0.0362]$。Wilson 区间平均覆盖率接近名义水平且略窄；Clopper–Pearson 对每个真实 $p$ 保证至少名义覆盖，偏保守。做一个安全论断——一个别人会依赖的上界——时，有覆盖保证的区间（或精确的单侧界）才是站得住的选择；而在这些样本量下，与[[#alg-report]]中威胁模型的问题相比，两者的差别并不重要。
:::
:::
