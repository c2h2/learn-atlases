一个训练好的语言模型——[[sequence-models/seq2seq]]那样条件式的，或无条件的——并不直接输出文本。它在每一步输出的是给定已有词元时下一个词元上的概率分布。把这些分布变成序列就是**解码**，而解码方法的选择对输出的改变不亚于对模型的许多改动。两个目标彼此拉扯。翻译或语音识别要的是*那个*最好的输出，最可能的序列，于是解码是个搜索问题。开放式生成——故事、对话、模型对提示的回答——最可能的输出却平淡而重复，我们要的是看起来像人写文本的一个*样本*，于是解码是个带旋钮的采样问题。

本章两者都讲。它定义搜索问题，说明它为什么不能精确求解、贪心解码为什么不是最优，发展**束搜索**及其长度偏差与纠正它的归一化，然后转向采样：**温度**、**top-$k$** 与**核（top-$p$）采样**，以及重复问题。这里的一切原封不动地适用于 Transformer 语言模型；[[inference/decoding-sampling]]在此基础上讲述快速生成的工程。

## 搜索问题 {#sec-search}

以下$p_\theta(y_t\mid y_{<t})$一律表示模型的下一词元分布（条件模型则处处加上“$, \mathbf{x}$”），输出以 $\langle\text{eos}\rangle$ 结尾，完整输出的概率是其各条件概率的乘积（[[sequence-models/seq2seq#def-clm]]）。

::: definition MAP 解码 {#def-map}
**最大后验（MAP）解码**求

$$
\hat{\mathbf{y}} = \operatorname*{arg\,max}_{\mathbf{y}}\ \log p_\theta(\mathbf{y}) = \operatorname*{arg\,max}_{\mathbf{y}}\ \sum_{t=1}^{\lvert\mathbf{y}\rvert}\log p_\theta(y_t\mid y_{<t}),
$$ {#eq-map}

的最大值，其中在全体以 $\langle\text{eos}\rangle$ 结尾（实际上是长度不超过某个 $T_{\max}$）的序列上取最大。
:::

长度为 $T$ 的序列有 $\lvert\mathcal{V}\rvert^{T}$ 个——词表 $32{,}000$、$T = 20$ 时约 $10^{90}$ 个。与 $n$ 元模型或隐马尔可夫模型不同，循环或 Transformer 解码器的状态依赖*整个*前缀，因而没有一小组状态能让动态规划（Viterbi 算法）在上面共享计算：每个前缀都是它自己的状态。精确的 MAP 解码一般不可行，实用的解码器都是启发式的。

最简单的启发式在每一步押注最好的词元。

::: algorithm 贪心解码 {#alg-greedy}
1. 令 $\mathbf{y}\leftarrow()$。
2. 重复直到 $y_t = \langle\text{eos}\rangle$ 或 $\lvert\mathbf{y}\rvert = T_{\max}$：追加 $y_t = \operatorname*{arg\,max}_vp_\theta(v\mid\mathbf{y})$。
3. 返回 $\mathbf{y}$。

每个输出词元花费一次模型步骤。
:::

::: proposition 贪心解码不是最优的 {#prop-greedy}
存在这样的模型：贪心输出不是最可能的序列。
:::

::: proof
一个例子就够了。设词表为 $\{a, b, \langle\text{eos}\rangle\}$，第一步 $p(a) = 0.6$、$p(b) = 0.4$；$a$ 之后：$p(a\mid a) = 0.4$、$p(b\mid a) = 0.3$、$p(\langle\text{eos}\rangle\mid a) = 0.3$；$b$ 之后：$p(b\mid b) = 0.9$、$p(\langle\text{eos}\rangle\mid b) = 0.1$；任意两个词元之后 $\langle\text{eos}\rangle$ 的概率为 $1$。贪心选 $a$，再选 $a$，再选 $\langle\text{eos}\rangle$，概率 $0.6\cdot0.4 = 0.24$。但 $p(bb) = 0.4\cdot0.9 = 0.36 > 0.24$，且没有别的序列超过 $0.36$（$ab$ 和 $a$ 各为 $0.18$，$b$ 为 $0.04$）。第 $1$ 步的贪心选择看起来最好，却把搜索带进了树中所有延续都平平的一块。
:::

搜索最可能的序列是一个最短路问题：给每条从前缀到其延拓的边赋代价 $-\log p(y_t\mid y_{<t})\ge0$，最可能的完整输出就是从空前缀到某个“已结束”节点的最便宜路径。在证明里那棵小树上，Dijkstra 算法——一致代价搜索——按代价从小到大的顺序扩展前缀，就能精确求出它。在真实模型上树大得多的多，搜索前沿还会无限增长；束搜索把它封顶。

::: widget graph
nodes: root@0,1; a@1,2; b@1,0; aa@2,3; ab@2,2.2; aE@2,1.4; bb@2,0.6; bE@2,-0.2; aaE@3,3; abE@3,2.2; bbE@3,0.6
edges: root>a:0.511; root>b:0.916; a>aa:0.916; a>ab:1.204; a>aE:1.204; b>bb:0.105; b>bE:2.303; aa>aaE:0; ab>abE:0; bb>bbE:0
algorithm: dijkstra
start: root
caption: [[#prop-greedy]]的搜索树。每个节点是一个前缀（“E” 标记 $\langle\text{eos}\rangle$，所以 “aE” 是已完成的输出 “a”），每条边的代价是其词元的 $-\ln p$。从根运行 Dijkstra 算法：最便宜的完成节点是 “bbE”，距离 $1.022 = -\ln0.36$；贪心解码则沿着最便宜的*第一条*边走向 “a”，停在 “aaE”，距离 $1.427 = -\ln0.24$。宽度为 $2$ 的束搜索在第一步之后同时保留 “a” 和 “b”，于是找到 “bb”。
:::

## 束搜索 {#sec-beam}

::: algorithm 束搜索 {#alg-beam}
输入：束宽 $k$，最大长度 $T_{\max}$。

1. 以束 $B = \{()\}$——分数为 $0$ 的空前缀——和空的已完成假设表 $F$ 开始。
2. 对 $t = 1, \dots, T_{\max}$，只要 $B$ 非空：
   - **扩展**：对 $\mathbf{y}\in B$ 和 $v\in\mathcal{V}$ 生成全部候选 $\mathbf{y}\,v$，分数为 $s(\mathbf{y}v) = s(\mathbf{y}) + \log p_\theta(v\mid\mathbf{y})$。
   - **剪枝**：按分数从大到小过一遍候选；把以 $\langle\text{eos}\rangle$ 结尾的移入 $F$，其余留在新束中，直到束里有 $k$ 个假设。
3. 返回 $F$ 中最终分数最好的假设（原始分数，或如[[#sec-length]]那样作长度归一化）。

每一步花费 $k$ 次模型评估（打包成一批）和在 $k\lvert\mathcal{V}\rvert$ 个候选中选前 $k$ 的选择操作。
:::

$k = 1$ 时束搜索就是贪心解码。$k\ge\lvert\mathcal{V}\rvert^{T_{\max}-1}$ 时任何候选都不会被剪掉，束搜索枚举一切长度不超过 $T_{\max}$ 的序列——精确但无用。介于两者之间，它拿计算量换搜索质量；而在神经机器翻译中，小束（$k = 4$ 到 $10$）就带来了大部分收益：Sutskever 等人（2014）报告，他们束宽 $12$ 的好处大部分在束宽 $2$ 时就已经得到。

一个有用的性质使提前停止成为可能。

::: proposition 分数只会下降 {#prop-monotone}
对任何前缀 $\mathbf{y}$ 和任何延拓 $\mathbf{y}\mathbf{z}$，$\log p_\theta(\mathbf{y}\mathbf{z})\le\log p_\theta(\mathbf{y})$。于是，一旦最好的已完成假设的原始分数不低于束中每个假设，后续任何一步都不可能产生原始分数更好的输出，束搜索即可停止。
:::

::: proof
$\log p_\theta(\mathbf{y}\mathbf{z}) = \log p_\theta(\mathbf{y}) + \sum_j\log p_\theta(z_j\mid\mathbf{y}z_{<j})$，而和式中每一项都 $\le0$，因为概率至多为 $1$。每个未来的候选都延拓当前在束中的某个假设，所以它的分数至多是那个假设当前的分数，而至多不超过最好的已完成分数。
:::

同一个命题也暴露了一个缺陷。因为每个词元都要收掉一个非正的对数概率，*其他条件相同时，越长的输出分数越低*。用原始分数的束搜索因此偏爱短输出，而且束越大，越容易找到一个短假设——也许一个词元就结束——压过所有完整而合格的输出。

::: example 手算束搜索 {#ex-beam}
在[[#prop-greedy]]的模型上运行 $k = 2$ 的束搜索。
::: solution
第 $1$ 步：候选 $a$（$\ln0.6 = -0.511$）和 $b$（$\ln0.4 = -0.916$）；都保留。第 $2$ 步：扩展 $a$ 得 $aa$（$-0.511 - 0.916 = -1.427$）、$ab$（$-1.715$）和 $a\langle\text{eos}\rangle$（$-1.715$）；扩展 $b$ 得 $bb$（$-0.916 - 0.105 = -1.022$）和 $b\langle\text{eos}\rangle$（$-3.219$）。按序：$bb$（$-1.022$）进束，$aa$（$-1.427$）进束，束满。第 $3$ 步：两者都只能结束，得到已完成的 $bb$ 分数 $-1.022$、$aa$ 分数 $-1.427$。答案是 $bb$，概率 $e^{-1.022} = 0.36$：束保住了次优的第一个词元，直到它强大的延续显露出来。[[#sec-code]]中的清单做的正是这件事。
:::
:::

### 长度归一化 {#sec-length}

::: definition 长度归一化分数 {#def-length-norm}
**长度归一化**的束搜索按

$$
\operatorname{score}(\mathbf{y}) = \frac{\log p_\theta(\mathbf{y})}{\operatorname{lp}(\lvert\mathbf{y}\rvert)}
$$

给已完成的假设排序，

长度惩罚可取 $\operatorname{lp}(n) = n^\alpha$（$\alpha = 1$ 即逐词元平均对数概率，$\alpha = 0$ 即原始分数），或谷歌神经翻译系统（Wu et al., 2016）使用的形式 $\operatorname{lp}(n) = (5 + n)^\alpha/(5 + 1)^\alpha$、$\alpha$ 取 $0.6$–$0.7$ 左右，由留出数据定。
:::

归一化只改变*已完成*假设之间的比较；束内的剪枝仍用原始分数，这没有妨碍，因为同一步的所有未结束假设长度相同。Wu 等人还加了一个**覆盖惩罚**，偏爱注意到每个源词的译文；Murray 和 Chiang（2018）则提议按词给奖励而不是做除法；它们都是对同一个偏差的修正。

::: example 在短输出与长输出之间抉择 {#ex-length}
两个已完成的假设：A 有 $3$ 个词元（含 $\langle\text{eos}\rangle$），$\log p = -2.1$；B 有 $8$ 个词元，$\log p = -3.0$。原始分数下、$\alpha = 1$ 时、以及 GNMT 惩罚取 $\alpha = 0.6$ 时各是谁获胜？
::: solution
原始：A（$-2.1 > -3.0$）。逐词元（$\alpha = 1$）：A 为 $-0.700$，B 为 $-0.375$，B 胜。GNMT：$\operatorname{lp}(3) = (8/6)^{0.6} = 1.188$，$\operatorname{lp}(8) = (13/6)^{0.6} = 1.590$，于是 A 得 $-2.1/1.188 = -1.767$，B 得 $-3.0/1.590 = -1.886$：A 又胜。这个决定取决于一个超参数，这就是每个系统都要在开发集上调 $\alpha$ 的原因——归一化是一个修正因子，不是从模型推出来的东西。
:::
:::

### 束搜索的诅咒 {#sec-curse}

若模型完美，找出它的最大概率输出就是对的目标，束越宽只会越好。对真实模型，更宽的束常常让输出*更差*。Koehn 和 Knowles（2017）发现，对若干语言对，翻译质量在中等束宽处达到峰值，随束变宽转而下降，很大程度上因为更宽的束找到了更短的译文。Stahlberg 和 Byrne（2019）走到极限：对一个 Transformer 翻译模型用精确搜索算法，他们发现单个最大概率的输出是**空译文**——立刻 $\langle\text{eos}\rangle$——在超过一半的测试句上都是如此。模型的众数是退化的；束搜索之所以能用，恰恰*因为*它是不精确的搜索，停留在典型的、合格输出的区域。

::: warning 束搜索找到最好的输出，所以束越宽总是越好
束搜索逼近的是*模型*的最大概率序列，而模型的最大概率序列往往不是好输出：它可能为空、过短或重复。更宽的束是对错误目标的更好搜索。翻译中，带长度归一化的中等束宽是标准做法；开放式生成中则通常完全不用束搜索（[[#sec-degeneration]]）。质量随束变宽而下降时，原因是模型的分布（模型误差），不是搜索（搜索误差）。
:::

## 采样 {#sec-sampling}

开放式生成没有唯一正确的答案，我们要的输出既多样又像人写的文本。自然的方法是从模型的分布中抽每个词元。

::: definition 祖先采样与温度 {#def-temperature}
**祖先采样**对 $t = 1, 2, \dots$ 生成 $y_t\sim p_\theta(\cdot\mid y_{<t})$ 直到 $\langle\text{eos}\rangle$；它完全按 $p_\theta(\mathbf{y})$ 抽取整条序列。给定 logits $\mathbf{z}_t$ 和**温度** $\tau > 0$，它改从

$$
p_\tau(v\mid y_{<t}) = \operatorname{softmax}(\mathbf{z}_t/\tau)_v = \frac{\exp(z_{t,v}/\tau)}{\sum_u\exp(z_{t,u}/\tau)} .
$$ {#eq-temperature}

中采样。$\tau < 1$ 使分布变尖，$\tau > 1$ 使其变平，$\tau = 1$ 就是模型自己的分布。
:::

::: proposition 温度在 argmax 与均匀分布之间插值 {#prop-entropy}
设 $H(\tau)$ 为固定 logits $\mathbf{z}$ 下 $p_\tau$ 的熵。则 (1) 当 $\tau\to0^+$，$p_\tau$ 收敛到最大 logit 词元上的均匀分布（argmax 唯一时即收敛到它）；(2) 当 $\tau\to\infty$，$p_\tau$ 收敛到 $\mathcal{V}$ 上的均匀分布；(3) $H(\tau)$ 关于 $\tau$ 不减，且除非所有 logit 相等则严格递增。
:::

::: proof
记 $\beta = 1/\tau$、$m = \max_vz_v$。(1) $p_\tau(v) = e^{\beta(z_v - m)}/\sum_ue^{\beta(z_u - m)}$；当 $\beta\to\infty$，$z_u < m$ 的项趋于 $0$，$z_u = m$ 的项等于 $1$，于是 $p_\tau(v)$ 对 $M$ 个最大词元趋于 $1/M$、对其余趋于 $0$。(2) 当 $\beta\to0$，每个 $e^{\beta z_v}\to1$，故 $p_\tau(v)\to1/\lvert\mathcal{V}\rvert$。(3) 记 $Z(\beta) = \sum_ue^{\beta z_u}$，则 $\log p_v = \beta z_v - \log Z$，于是 $H = -\sum_vp_v\log p_v = \log Z - \beta\,\E_p[z]$。求导得 $\frac{d}{d\beta}\log Z = \E_p[z]$、$\frac{d}{d\beta}\E_p[z] = \E_p[z^2] - \E_p[z]^2 = \Var_p(z)$，所以

$$
\frac{dH}{d\beta} = \E_p[z] - \E_p[z] - \beta\Var_p(z) = -\beta\Var_p(z)\le0 .
$$

因此熵随 $\beta$ 递减、随 $\tau = 1/\beta$ 递增；方差为零当且仅当 $z$ 在支撑上为常数，即所有 logit 相等。
:::

::: example 手算温度 {#ex-temperature}
三个词元上的 logits $(2, 1, 0)$。计算 $\tau = 0.5, 1, 2$ 时的分布及其熵。
::: solution
$\tau = 1$：$e^2, e^1, e^0 = 7.389, 2.718, 1$，和 $11.107$：$(0.665, 0.245, 0.090)$，熵 $0.832$ 纳特。
$\tau = 0.5$：logits 变为 $(4, 2, 0)$：$54.598, 7.389, 1$，和 $62.987$：$(0.867, 0.117, 0.016)$，熵 $0.441$。
$\tau = 2$：logits $(1, 0.5, 0)$：$2.718, 1.649, 1$，和 $5.367$：$(0.506, 0.307, 0.186)$，熵 $1.020$。
词元的先后次序从不改变；变的只是最上面的词元占多大优势。最大可能的熵是 $\ln3 = 1.099$。
:::
:::

::: widget plot
f: exp(3/x)/(exp(3/x)+exp(2.5/x)+exp(1/x)+exp(0.5/x)+exp(0/x)+exp(-1/x)); exp(2.5/x)/(exp(3/x)+exp(2.5/x)+exp(1/x)+exp(0.5/x)+exp(0/x)+exp(-1/x)); exp(1/x)/(exp(3/x)+exp(2.5/x)+exp(1/x)+exp(0.5/x)+exp(0/x)+exp(-1/x)); exp(-1/x)/(exp(3/x)+exp(2.5/x)+exp(1/x)+exp(0.5/x)+exp(0/x)+exp(-1/x))
x: 0.1, 5
y: 0, 1
labels: mat (logit 3); rug (logit 2.5); sofa (logit 1); idea (logit −1)
vlines: 1
caption: 清单示例六个词元中四个（logits $3, 2.5, 1, 0.5, 0, -1$）的概率随温度 $\tau$ 的变化。$\tau = 1$（虚线）时 “mat” 为 $0.53$。$\tau\to0$ 时全部质量归最上面的词元，就是贪心解码；$\tau$ 增大时每个词元——包括荒唐的 “idea”——都逼近 $1/6$。低温度给出安全而重复的文本；高温度给出多样却漂向胡言乱语的文本。
:::

### 截断：top-$k$ 与核采样 {#sec-truncation}

$\tau = 1$ 的纯采样有一个具体的失效方式。语言模型的分布有一条长长的**尾部**，里面的词元各自不太可能、合起来却带着实实在在的概率质量；每一步都有相当的机会抽中其中之一，一百步下来几乎是必然。一次糟糕的抽样就能把文本带偏，而模型随后会尽职地沿着偏掉的方向继续。**截断**方法只从分布的头部采样。

::: definition Top-k 与核（top-$p$）采样 {#def-top-p}
设 $p$ 为下一词元分布，词元按 $p_{(1)}\ge p_{(2)}\ge\dots$ 排好。

- **Top-$k$ 采样**（Fan、Lewis 和 Dauphin，2018）保留最可能的 $k$ 个词元，其余置零再归一化。
- **核**或 **top-$p$ 采样**（Holtzman et al., 2020）保留总质量至少为 $p$ 的最可能的最小词元集 $V^{(p)}$，即排序后的前 $m$ 个词元，$m = \min\{j : \sum_{i\le j}p_{(i)}\ge p\}$，并从中采样

$$
q(v) = \begin{cases}p(v)/\sum_{u\in V^{(p)}}p(u) & v\in V^{(p)}\\ 0 & \text{否则}\end{cases}
$$ {#eq-top-p}

通常是先把温度施加于 logits，再对所得分布作截断。
:::

区别在于 top-$p$ 随分布的形状自适应。模型有信心时（“the capital of France is” → “Paris”），核里可能只有一个词元；许多延续都合理时（故事的首词），里面有几百个。固定的 $k$ 在前一种情形太多、后一种情形太少。Holtzman 等人发现 $p$ 取 $0.9$–$0.95$ 左右的核采样产生的文本，其统计量（困惑度、重复、词表分布）在他们比较的方法中最接近人类文本。

::: example 手算核采样 {#ex-top-p}
$\tau = 1$ 时清单的六个词元概率为 $0.529, 0.321, 0.072, 0.043, 0.026, 0.010$（“mat”、“rug”、“sofa”、“floor”、“moon”、“idea”）。$p = 0.9$ 的 top-$p$ 下哪些词元存活，概率各是多少？与 $k = 2$ 的 top-$k$ 比较。
::: solution
按序的累积和：$0.529$、$0.850$、$0.922$。第一个达到 $0.9$ 的前缀有三个词元，所以核是 {mat, rug, sofa}，质量 $0.922$；除过去得 $q = (0.574, 0.348, 0.078)$。Top-$2$ 只留 mat 和 rug，$(0.622, 0.378)$，把“sofa”——一个完全合理的延续——丢掉了，因为 $k$ 是事先定死的。“floor”、“moon” 和 “idea” 在两种规则下都从不出现。
:::
:::

::: quiz
对固定的分布 $p$，关于 top-$p$ 采样哪句话是正确的？
- [ ] 给定 $p$，它保留的词元个数总是相同。
- [x] 提高 $p$ 只会往核里加词元，不会删。
- [ ] $p = 1$ 时它与贪心解码相同。
- [ ] 它会改变所保留词元之间的相对概率。
::: solution
核是排序词元中质量达到 $p$ 的最短前缀；更大的 $p$ 需要至少同样长的前缀，因此它包含较小的核。词元个数取决于 $p$ 的形状，不只是 $p$ 的取值。$p = 1$ 时每个概率为正的词元都保留：纯采样。归一化把所有保留的概率除以同一个数，它们的比值不变。
:::
:::

## 退化与重复 {#sec-degeneration}

Holtzman 等人（2020）的论文标题是“The curious case of neural text degeneration”（神经文本退化这一奇事）。他们用一个大 Transformer 语言模型（GPT-2）表明，基于最大化的解码——贪心与束搜索——产生的文本平庸，而且最要命的是**重复**：同一个短语或句子循环出现。两个观察解释了它。人类文本不是最大概率的文本：人写的文本逐词元概率起伏不定，常常远低于模型的首选，而束搜索输出的概率一律很高。而重复会自我强化：一个短语在上下文里出现得越多，模型给它再次出现的概率就越高，贪心解码便沿着这条正反馈回路走到黑。

除了改用采样，还有若干直接的对策。

- **$n$ 元组屏蔽**（Paulus、Xiong 和 Socher，2018 在摘要中使用）：束搜索中，把任何会补全一个输出中已出现的 $n$ 元组（常取 $n = 3$）的词元的概率置零。
- **重复惩罚**（Keskar et al., 2019，用于 CTRL 模型）：把上下文中已出现的词元的 logits 除以 $1.2$ 这样的因子（实现上让 logit 总是往下走：正 logit 除以因子、负 logit 乘以因子），从而压低其概率。
- **频率与存在惩罚**，若干生成接口都有：从每个词元的 logits 里减去其出现次数乘一个系数，若出现过再减一个常数。
- **训练期的修法**，例如不可能性训练（Welleck et al., 2020）：加一项损失压低会造成重复的词元的概率。

所有惩罚都是启发式的，也会压掉合法的重复——人名、代码里的变量名——其强度靠肉眼调。新的截断规则还在不断提出；例如 **min-$p$ 采样**（Nguyen et al., 2024）保留概率不低于最大词元概率的固定比例的词元。截至 2026 年，大语言模型的生成接口通常暴露温度和 top-$p$，常常还有 top-$k$ 与重复或频率惩罚；束搜索在机器翻译和语音识别中仍是标准，而开放式和聊天生成大多采样。

::: application 面向推理的解码
采样还促成了模型的一种不同用法：对同一个问题抽若干个独立答案再合并。**自洽性**（self-consistency，Wang et al., 2023）在适中的温度下采样许多条推理链，返回出现最多次的最终答案，在算术和常识基准上比贪心解码单条链提高了准确率。这是拿推理时更多的计算换准确率，这一思想在[[reasoning]]中展开。
:::

## 实现 {#sec-code}

下面的清单对任意函数 `next_dist(prefix)` 实现贪心解码与束搜索——这里用的是[[#prop-greedy]]的玩具模型——以及[[#def-temperature]]和[[#def-top-p]]的采样变换，并检验带种子的 top-$p$ 抽样服从[[#eq-top-p]]。

```python
import math, random

# 一个玩具条件模型：给定前缀（词元元组）的下一词元分布。
MODEL = {
    ():         {"a": 0.6, "b": 0.4},
    ("a",):     {"a": 0.4, "b": 0.3, "<eos>": 0.3},
    ("b",):     {"b": 0.9, "<eos>": 0.1},
    ("a", "a"): {"<eos>": 1.0},
    ("a", "b"): {"<eos>": 1.0},
    ("b", "b"): {"<eos>": 1.0},
}
def next_dist(prefix): return MODEL[tuple(prefix)]

def greedy(next_dist, max_len=10):
    seq, logp = [], 0.0
    while len(seq) < max_len:
        tok, p = max(next_dist(seq).items(), key=lambda kv: kv[1])
        logp += math.log(p)
        if tok == "<eos>": break
        seq.append(tok)
    return seq, logp

def beam_search(next_dist, k, max_len=10, alpha=0.0):
    """Keeps the k best partial hypotheses by log-probability. Finished ones are
    scored by logp / len^alpha (len counts <eos>); alpha = 0 is no normalisation."""
    beam, finished = [((), 0.0)], []
    for _ in range(max_len):
        cand = [(seq + (tok,), lp + math.log(p))
                for seq, lp in beam for tok, p in next_dist(seq).items()]
        cand.sort(key=lambda c: -c[1])
        beam = []
        for seq, lp in cand:
            if seq[-1] == "<eos>": finished.append((seq[:-1], lp, lp / len(seq) ** alpha))
            else: beam.append((seq, lp))
            if len(beam) == k: break
        if not beam: break                      # 每个幸存的假设都已结束
    return max(finished, key=lambda f: f[2])

seq, lp = greedy(next_dist)
print(f"greedy        ({seq}, logp {lp:.4f}, p {math.exp(lp):.3f})")
for k in (1, 2):
    seq, lp, score = beam_search(next_dist, k)
    print(f"beam k={k}      ({list(seq)}, logp {lp:.4f}, p {math.exp(lp):.3f})")

# --- 采样：温度、top-k 与 top-p（核） ------------------------------------------
def softmax(z, T=1.0):
    m = max(z); e = [math.exp((v - m) / T) for v in z]; s = sum(e)
    return [v / s for v in e]

def filter_top_k(p, k):
    keep = sorted(range(len(p)), key=lambda i: -p[i])[:k]
    q = [p[i] if i in keep else 0.0 for i in range(len(p))]
    s = sum(q); return [v / s for v in q]

def filter_top_p(p, top_p):
    order = sorted(range(len(p)), key=lambda i: -p[i])
    keep, total = [], 0.0
    for i in order:                      # 质量达到 top_p 的最小集合
        keep.append(i); total += p[i]
        if total >= top_p: break
    q = [p[i] if i in keep else 0.0 for i in range(len(p))]
    s = sum(q); return [v / s for v in q]

def sample(p, rng):
    u, acc = rng.random(), 0.0
    for i, v in enumerate(p):
        acc += v
        if u < acc: return i
    return len(p) - 1

logits = [3.0, 2.5, 1.0, 0.5, 0.0, -1.0]
words = ["mat", "rug", "sofa", "floor", "moon", "idea"]
for T in (0.5, 1.0, 2.0):
    print(f"T={T}:", " ".join(f"{w} {q:.3f}" for w, q in zip(words, softmax(logits, T))))
p = softmax(logits)
print("top-k=2:  ", " ".join(f"{q:.3f}" for q in filter_top_k(p, 2)))
q = filter_top_p(p, 0.9)
print("top-p=0.9:", " ".join(f"{v:.3f}" for v in q))
rng = random.Random(0)
counts = [0] * len(words)
for _ in range(10000): counts[sample(q, rng)] += 1
print("10000 top-p draws:", dict(zip(words, counts)))
```

输出：

```
greedy        (['a', 'a'], logp -1.4271, p 0.240)
beam k=1      (['a', 'a'], logp -1.4271, p 0.240)
beam k=2      (['b', 'b'], logp -1.0217, p 0.360)
T=0.5: mat 0.716 rug 0.264 sofa 0.013 floor 0.005 moon 0.002 idea 0.000
T=1.0: mat 0.529 rug 0.321 sofa 0.072 floor 0.043 moon 0.026 idea 0.010
T=2.0: mat 0.358 rug 0.279 sofa 0.132 floor 0.103 moon 0.080 idea 0.048
top-k=2:   0.622 0.378 0.000 0.000 0.000 0.000
top-p=0.9: 0.574 0.348 0.078 0.000 0.000 0.000
10000 top-p draws: {'mat': 5724, 'rug': 3521, 'sofa': 755, 'floor': 0, 'moon': 0, 'idea': 0}
```

$k = 1$ 的束搜索复现了贪心解码，$k = 2$ 找到了[[#ex-beam]]中更好的序列。抽样频率 $0.572$、$0.352$、$0.076$ 在 $10{,}000$ 次抽样的误差范围内（最大项约 $\pm0.005$）吻合核分布 $0.574$、$0.348$、$0.078$，而被截掉的词元从不出现。在真实解码器里，`next_dist` 是网络对 $k$ 个前缀这一批的一次前向步骤，束重排时要复制幸存假设的隐藏状态（或键值缓存，[[inference/kv-cache]]），而这一切都向量化实现。

::: example 束搜索的代价 {#ex-beam-cost}
一个翻译模型的 $\lvert\mathcal{V}\rvert = 32{,}000$，输出层宽度 $512$。用 $k = 5$ 解码一个 $50$ 词元的输出，每步要形成多少个候选分数？输出层在整个输出上花多少 FLOPs？与贪心解码相比如何？
::: solution
每步给 $k\lvert\mathcal{V}\rvert = 160{,}000$ 个候选打分。输出层每步是一个 $(5\times512)\cdot(512\times32{,}000)$ 乘积，$2\cdot5\cdot512\cdot32{,}000\approx1.64\times10^8$ FLOPs，$50$ 步共约 $8.2\times10^9$ FLOPs。贪心解码的代价是它的五分之一。在 $160{,}000$ 个分数里选前 $5$ 与之相比不值一提（部分排序，对候选数线性）。因为 $k$ 个假设作为一批处理，束在 GPU 上的墙钟代价常常远小于贪心解码的 $k$ 倍：小批量解码受制于内存带宽而非算术。
:::
:::

::: history
束搜索比神经网络更老：1970 年代卡内基梅隆的 Harpy 语音理解系统就用了它（Lowerre, 1976），它成为统计语音识别和基于短语的翻译的标准解码器，并与 $n$ 元组状态上的动态规划结合使用。神经翻译继承了它（Sutskever et al., 2014；Bahdanau et al., 2015），连同长度归一化（Wu et al., 2016，用于 GNMT）。随着神经语言模型开始生成长文本，最大化的失效显露出来：Fan、Lewis 和 Dauphin（2018）为故事生成引入 top-$k$ 采样，Holtzman、Buys、Du、Forbes 和 Choi（ICLR 2020）诊断了退化并提出核采样，Stahlberg 和 Byrne（2019）与 Meister、Cotterell 和 Vieira（2020）则追问束搜索为何在瞄准一个退化众数的情况下仍然好用，后者提出它隐式偏爱信息均匀散布在各词元上的输出。温度本身来自统计物理：经玻尔兹曼分布 $e^{-E/kT}$，经由模拟退火和玻尔兹曼机传到了这里。
:::

::: summary
- **解码**把下一词元分布变成输出。MAP 解码（最大概率序列）对神经解码器不可行，因为它的状态依赖整个前缀。
- **贪心解码**便宜但不最优。**束搜索**每步保留最好的 $k$ 个前缀；$k = 1$ 即贪心。分数随长度只会下降，这既允许提前停止，也造成对短输出的偏差。
- **长度归一化**把分数除以 $n^\alpha$ 或 GNMT 惩罚；$\alpha$ 需要调。更宽的束可能有害：模型的众数常常很短甚至为空（束搜索的诅咒）。
- **温度** $\tau$ 重新缩放 logits；熵随 $\tau$ 增大，从 argmax（$\tau\to0$）到均匀分布（$\tau\to\infty$）。
- **Top-$k$** 保留固定个数的词元，**核（top-$p$）**保留质量 $\ge p$ 的最小集合，随分布的形状自适应。它们切掉不可靠的尾部。
- 在开放式生成中，最大化产生**重复、退化**的文本；带截断的采样、$n$ 元组屏蔽和重复惩罚是常用的补救，每个都是启发式。
:::

## 习题

::: exercise 束假设的概率 {level=1 check="0.5*0.6*0.8"}
假设 “the cat ⟨eos⟩” 的各条件概率为 $0.5$、$0.6$、$0.8$。它的概率是多少？
::: solution
$0.5\cdot0.6\cdot0.8 = 0.24$；其对数概率为 $\ln0.24 = -1.427$。
:::
:::

::: exercise 温度与最上面的词元 {level=1 check="exp(2)/(exp(2)+exp(1)+1)"}
logits $(4, 2, 0)$ 在温度 $\tau = 2$ 下采样。第一个词元得到多少概率？
::: solution
除以 $\tau$ 得 $(2, 1, 0)$，所以概率为 $e^2/(e^2 + e + 1) = 7.389/11.107 = 0.665$——与 logits $(2, 1, 0)$、$\tau = 1$ 相同，因为起作用的只有比值 $\mathbf{z}/\tau$。
:::
:::

::: exercise 核的大小 {level=1 check="4"}
一个分布的排序概率为 $0.30, 0.25, 0.20, 0.10, 0.08, 0.07$。$p = 0.8$ 的核含多少个词元？
::: solution
累积和：$0.30$、$0.55$、$0.75$、$0.85$。第一个达到 $0.8$ 的是第四个，所以核有 $4$ 个词元，质量 $0.85$。
:::
:::

::: exercise 贪心可以任意糟糕 {level=2}
对任意 $\delta > 0$，构造一个在长度为 $2$ 的序列（其后接 $\langle\text{eos}\rangle$）上的模型，使贪心输出的概率不到最好输出概率的 $\delta$ 倍。
::: solution
第 1 步取 $p(a) = 0.5 + \eta$、$p(b) = 0.5 - \eta$，$\eta > 0$ 很小。$a$ 之后，质量均匀分给 $N$ 个词元，各 $1/N$；$b$ 之后，把概率 $1$ 放在单个词元 $c$ 上。贪心选 $a$，再从 $N$ 个词元中任选其一，概率 $(0.5 + \eta)/N$。最好的输出是 $bc$，概率 $0.5 - \eta$。比值为 $(0.5 + \eta)/\big(N(0.5 - \eta)\big)$，一旦 $N > (0.5 + \eta)/\big(\delta(0.5 - \eta)\big)$ 就低于 $\delta$。$k = 2$ 的束搜索能找到 $bc$；但把构造嵌套起来，可以击败任何固定的束宽。
:::
:::

::: exercise 长度归一化翻转决定 {level=2 check="log(3.2/2.4)/log(9/4)"}
假设 A 有 $4$ 个词元，$\log p = -2.4$；假设 B 有 $9$ 个词元，$\log p = -3.2$。对惩罚 $\operatorname{lp}(n) = n^\alpha$，求使两者分数相等的 $\alpha$。$\alpha$ 更大时哪个假设获胜？
::: solution
分数相等：$-2.4/4^\alpha = -3.2/9^\alpha$，即 $(9/4)^\alpha = 3.2/2.4 = 4/3$，故 $\alpha = \ln(4/3)/\ln(9/4) = 0.2877/0.8109 = 0.355$。$\alpha > 0.355$ 时较长的假设 B 胜（它的分数除以增长更快的惩罚）；更小的 $\alpha$——包括原始分数——A 胜。
:::
:::

::: exercise 两个温度下的熵 {level=2}
对 logits 为 $(z, 0)$ 的两个词元，把熵 $H(\tau)$ 明确写出来，并在 $z = 1$、$\tau = 1$ 处验证[[#prop-entropy]]的导数公式。
::: solution
第一个词元 $p = \sigma(z/\tau)$，且 $H = -p\ln p - (1 - p)\ln(1 - p)$。记 $\beta = 1/\tau$，$\Var_p(z) = z^2p(1 - p)$（取值 $z$ 和 $0$ 的两点分布），于是公式预言 $dH/d\beta = -\beta z^2p(1 - p)$。在 $z = 1$、$\beta = 1$ 处：$p = \sigma(1) = 0.731$，故 $dH/d\beta = -0.731\cdot0.269 = -0.197$。直接算：$p = \sigma(1)$ 处 $dH/dp = \ln\frac{1 - p}{p} = -1$（因为 $\ln\frac{p}{1 - p} = \beta z = 1$），而 $dp/d\beta = zp(1 - p) = 0.197$，所以 $dH/d\beta = -0.197$。两者一致。
:::
:::

::: exercise 尖峰与平坦分布上的 top-k 与 top-p {level=2}
在 (a) $p_{(1)} = 0.95$、其余 $0.05$ 均匀分给 $999$ 个词元的尖峰分布，和 (b) $1{,}000$ 个词元上的均匀分布上，比较 $k = 10$ 的 top-$k$ 与 $p = 0.9$ 的 top-$p$。每种情形下哪个方法表现合理？
::: solution
(a) Top-$p$：第一个词元的质量已有 $0.95\ge0.9$，所以核就是那一个词元，采样是确定性的，正该如此。Top-$10$ 保留最上面的词元外加九个概率 $0.05/999\approx5\times10^{-5}$ 的尾部词元；归一化后，尾部共得 $9\cdot5.0\times10^{-5}/0.95045\approx4.7\times10^{-4}$——这里人畜无害，但 top-$k$ 并没有自适应。(b) Top-$p$ 保留 $900$ 个词元，反映真实的不确定性。Top-$10$ 在一千个同样合理的词元里保留任意十个，毫无道理地把分布猛地收窄。两种情形下 top-$p$ 都表现合理；top-$k$ 在 (a) 原则上太宽、在 (b) 太窄。
:::
:::

::: exercise 带长度归一化的束搜索 {level=3}
修改 `beam_search`，使它在 `alpha > 0` 时也能提前停止。举出两个假设，其中更长的延拓的归一化分数好于其前缀，以此说明[[#prop-monotone]]的停止规则对归一化分数不成立。再给出已知 $T_{\max}$ 时一个有效的界。
::: solution
$\alpha = 1$ 时，$2$ 个词元、$\log p = -2.0$ 的前缀分数为 $-1.0$；追加一个概率 $0.9$ 的词元得 $3$ 个词元、$\log p = -2.105$，分数 $-0.702$——更好。所以，一个压过所有未结束假设*当前*归一化分数的已完成假设仍可能被反超。一个有效的界：长度为 $n$、原始分数为 $s\le0$ 的未结束假设最好也只能保持原始分数 $s$（其后的词元概率全为 $1$）而长到 $T_{\max}$，所以它能达到的最好归一化分数是 $s/T_{\max}^\alpha$（一个非正数除以最大的惩罚）。当最好的已完成归一化分数不小于 $\max_{\text{open}}s/T_{\max}^\alpha$ 时即可停止。这个界很松，所以实现常常索性跑完，直到 $k$ 个假设全部结束或达到 $T_{\max}$。
:::
:::

::: exercise 实现重复惩罚 {level=3}
给清单加一个函数：给定已生成的词元，对 logits 施加 CTRL 式的重复惩罚 $\theta$——对每个已生成的词元，其 logit 为正则除以 $\theta$、为负则乘以 $\theta$。当 “mat” 和 “idea” 已经生成时，用 $\theta = 1.2$ 作用到 logits $(3, 2.5, 1, 0.5, 0, -1)$ 上，计算 $\tau = 1$ 时 “mat” 的新概率。为什么这条规则对正负 logit 区别对待？
::: solution
```python
def repetition_penalty(z, seen, theta):
    return [(v / theta if v > 0 else v * theta) if i in seen else v
            for i, v in enumerate(z)]
z = repetition_penalty([3.0, 2.5, 1.0, 0.5, 0.0, -1.0], {0, 5}, 1.2)
print([round(v, 3) for v in z], round(softmax(z)[0], 3))   # [2.5, 2.5, 1.0, 0.5, 0.0, -1.2] 0.406
```
“mat” 从 $0.529$ 落到 $0.406$，现在与 “rug” 打平。把*负* logit 除以 $\theta > 1$ 会把它推向 $0$，也就是*提高*它的概率，与意图相反；乘以 $\theta$ 才使它更负。这条规则对“给所有 logits 加同一个常数”（softmax 不变）不是不变的，这是它只是启发式、而非分布的有原则变换的一个信号。
:::
:::
