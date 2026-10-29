在语言模型历史的大部分时间里，获得更好答案的办法是拿更多数据训练更大的模型，而[[scaling]]的缩放定律描述了损失如何随训练算力下降。本课程的这些方法加上了第二个旋钮：多采样几个解答、投票、搜索、想得更久，都是在**推理（inference）时**按问题花更多计算，而准确率随投入持续上升。随之而来的是一串连着真金白银的量化问题：准确率随测试时计算增长多快？固定预算什么时候该花在更大的模型上，什么时候该花在小模型的更多样本上？预算在容易题与难题之间、在并行样本与更长链之间应如何分配？一个推理模型的思考，推理部署的成本又有多大？

本章用已发表的证据和背后的数学回答这些问题。我们建立计算量的账目，研究**覆盖率**——$k$ 个样本中至少一个正确的概率——并证明：尽管每道题自己的曲线收敛指数般快，混合了难易悬殊题目的基准却产生幂律的覆盖率曲线。我们推导样本跨题的最优分配，介绍 Snell 等（2024）的计算最优分析与 Brown 等（2024）的重复采样结果，讲到序列式扩展与**预算强制**（budget forcing；s1；Muennighoff 等，2025），最后谈推理模型的成本账与测试时扩展的极限。降低每词元成本的投机解码等推理服务优化见[[inference]]；这里的问题是该花多少个词元。

## 计算量核算 {#sec-accounting}

基本单位是浮点运算次数。一个有 $N$ 个参数的稠密模型，训练时每词元约 $6N$ FLOPs（前向与反向传播），前向运行每词元 $2N$ FLOPs（[[scaling]]）；注意力还带来一项随上下文长度增长的开销，它在极长的思维链上很重要，下文先忽略。

::: proposition 测试时计算与模型规模的兑换 {#prop-flops-match}
设一个 $N$ 参数的模型在 $D_{\text{pre}}$ 个词元上预训练，部署中共生成 $D_{\text{inf}}$ 个词元，记 $R = D_{\text{inf}}/D_{\text{pre}}$。一个大 $M$ 倍的模型，用同样的数据训练、生成同样的词元，其总计算量与小模型生成 $k$ 倍数量推理词元时的总计算量相同，当

$$
k = \frac{M(3 + R) - 3}{R}.
$$ {#eq-flops-match}

$R\to\infty$（推理主导的使用）时 $k\to M$；$R\to0$（几乎不推理）时 $k\to\infty$。
:::

::: proof
带 $k$ 倍推理的小模型，总计算量为 $6ND_{\text{pre}} + 2NkD_{\text{inf}}$；大模型的是 $6MND_{\text{pre}} + 2MND_{\text{inf}}$。令两者相等并除以 $2ND_{\text{pre}}$，得 $3 + kR = M(3 + R)$，即[[#eq-flops-match]]。两个极限一目了然。
:::

Snell 等（2024）正是用这套账目，在总 FLOPs 相等时比较“更多测试时计算”与“更大的模型”。比值 $R$ 很要紧：若一个模型服务的词元远多于其训练词元，每个额外的推理词元都会摊到整个部署头上，大模型就相对便宜；若用得很少，测试时花钱是买准确率更便宜的方式。

::: example 更大的模型值多少个样本？ {#ex-match}
一个模型比另一个大 $14$ 倍。$R = 1$ 与 $R = 100$ 时，在相同总计算量下，小模型能生成多几倍的推理词元？
::: solution
$R = 1$：$k = (14\cdot4 - 3)/1 = 53$。$R = 100$：$k = (14\cdot103 - 3)/100 = 14.39$。当推理只占总计算量的一小部分时，小模型能用得起大模型约 $53$ 倍的词元——比如每题采样 $53$ 次而不是 $1$ 次。当推理占主导时，两个预算几乎与模型规模成正比。
:::
:::

## 覆盖率与重复采样 {#sec-coverage}

回忆[[reasoning/self-consistency#def-passk]]中的 pass@$k$：单样本成功概率为 $p$ 的问题，$k$ 个独立样本中至少一个正确的概率是 $1 - (1-p)^k$。Brown 等（2024）把它的基准平均称为**覆盖率**（coverage），并问它究竟能长到多高。

他们在《Large Language Monkeys》里给出的回答是：高得很。在数学应用题、竞赛编程、形式证明与真实软件工程任务上，在多个开放模型家族上，覆盖率随样本数增长四个数量级而稳步上升，常常大致**与 $\log k$ 成比例**。在以 GitHub issue 为内容的基准 SWE-bench Lite 上，一个开放代码模型的成功率从单样本的 $15.9\%$ 升到 $250$ 个样本的 $56\%$，超过了当时单次尝试 $43\%$ 的最先进水平；而在他们的成本比较中，较便宜的开放模型采样五次解决的问题，多于当时更贵的前沿模型采样一次。他们把覆盖率建模为**指数化幂律**，

$$
c(k)\approx\exp\big(a\,k^{b}\big),\qquad a < 0,\ b < 0,
$$ {#eq-epl}

这是一个经验拟合，每个模型、每个任务两个参数。

为什么覆盖率增长得这样慢、这样有规律，而每道题自己的曲线 $1 - (1-p)^k$ 却指数般快地逼近 $1$？因为一个基准混着难易天差的题，而在大 $k$ 处占统治地位的正是那些最难的题——$p$ 极小的题。

::: theorem 难度服从 Beta 分布时的覆盖率 {#thm-beta-coverage}
设基准的单样本成功概率 $p$ 服从 $\mathrm{Beta}(\alpha, \beta)$ 分布。则 $k$ 个样本仍未解出的题目比例的期望为

$$
1 - c(k) = \E\big[(1-p)^k\big] = \frac{B(\alpha, \beta + k)}{B(\alpha, \beta)} = \frac{\Gamma(\alpha+\beta)\,\Gamma(\beta+k)}{\Gamma(\beta)\,\Gamma(\alpha+\beta+k)},
$$ {#eq-beta-cov}

且当 $k\to\infty$ 时

$$
1 - c(k)\sim\frac{\Gamma(\alpha+\beta)}{\Gamma(\beta)}\,k^{-\alpha}.
$$ {#eq-power-tail}

于是未解比例按 $k$ 的**幂律**衰减，幂指数恰为形状参数 $\alpha$——它决定 $p = 0$ 附近压着多少概率。
:::

::: proof
对密度 $p^{\alpha-1}(1-p)^{\beta-1}/B(\alpha,\beta)$，

$$
\E\big[(1-p)^k\big] = \frac1{B(\alpha,\beta)}\int_0^1p^{\alpha-1}(1-p)^{\beta+k-1}\,dp = \frac{B(\alpha,\beta+k)}{B(\alpha,\beta)},
$$

由 Beta 函数的定义即得，而 $B(u,v) = \Gamma(u)\Gamma(v)/\Gamma(u+v)$ 给出 Gamma 形式（因子 $\Gamma(\alpha)$ 相消）。至于渐近式，由 Stirling 公式的标准推论 $z\to\infty$ 时 $\Gamma(z + s)/\Gamma(z + t)\sim z^{s-t}$，取 $z = k$、$s = \beta$、$t = \alpha + \beta$，得 $\Gamma(\beta+k)/\Gamma(\alpha+\beta+k)\sim k^{-\alpha}$。
:::

对[[#eq-power-tail]]取对数，$\log(1 - c)\approx\text{const} - \alpha\log k$：在双对数坐标上是一条直线。Schaeffer 等（2025）针对 Large Language Monkeys 的数据详细展开了这一论证：单题成功率按 $k$ 指数下降，而汇总的幂律来自单次尝试成功率分布的重左尾。一个实践推论是：幂律指数可以从每题中等数量的样本估出，不必对每题都跑上 $10{,}000$ 个样本。

::: example 外推覆盖率 {#ex-extrapolate}
某基准上，$10$ 个样本时 $40\%$ 的题未解出，$100$ 个样本时 $20\%$。假设尾部是幂律，预测 $1000$ 个样本时的覆盖率，并说明这要求题目分布具备什么条件？
::: solution
幂律 $1 - c = Ck^{-\alpha}$：$k$ 每扩大十倍就把未解比例减半，要求 $10^{-\alpha} = 1/2$，即 $\alpha = \log_{10}2 = 0.301$。$k = 1000$ 时未解比例为 $0.1$，覆盖率 $0.9$。这一外推假设每题成功率的分布在朝 $0$ 的方向继续平滑延伸；若有些题对该模型确实不可解（恰有 $p = 0$），覆盖率就会在可解题的占比处进入平台。
:::
:::

::: widget plot
f: exp(a*(10^x)^b); 1 - (1 - exp(a))^(10^x)
x: 0, 4
y: 0, 1
sliders: a=-1.6:-3:-0.2:0.05; b=-0.33:-0.8:-0.05:0.01
labels: exponentiated power law $\exp(ak^b)$; every problem equally hard, $1-(1-p)^k$
caption: 覆盖率对 $\log_{10}k$，样本数从 $1$ 到 $10{,}000$。第一条曲线是 Brown 等（2024）拟合的经验形式[[#eq-epl]]：它缓慢上升，在好几个数量级内几乎与 $\log k$ 成比例。第二条则是假如每题都有相同的单样本成功率 $p = e^a$ 时的覆盖率：约一个数量级内就跳到 $1$。差别在于题目难度之间的散布（[[#thm-beta-coverage]]）。把 $b$ 移近 $0$，可看到覆盖率变平。
:::

### 覆盖率不是准确率 {#sec-verification}

覆盖率假设正确的样本一经生成就能被认出。Brown 等发现，在有自动检验器（单元测试、证明检查器）的地方，重复采样的收益能兑现；但在 GSM8K 与 MATH 上——答案必须被*选出*——多数投票与奖励模型选择在几百个样本之后便不再提升，且远低于覆盖率。这就是[[reasoning/self-consistency#prop-bon]]在大规模下的样子：选择不超过覆盖率，两者的差距正是更好验证器的价值。因此，基于采样的测试时扩展恰恰在可验证奖励的强化学习奏效的地方最强大（[[reasoning/verifiable-rewards]]）：在答案可以被检验的地方。

## 在不同题目之间分配计算 {#sec-allocation}

固定的样本预算若均匀花费，就把力气浪费在几次尝试后已经解出的题、以及任何预算下都解不出的题上。若每题的成功概率已知，最优分配由一个简单性质决定。

::: theorem 贪心分配是最优的 {#thm-greedy-alloc}
设题 $i = 1,\dots,m$ 的成功概率为 $p_i$，$B$ 个样本的预算拆分为 $n_1 + \dots + n_m = B$，并配一个完美的验证器。期望解题数 $S(n) = \sum_i\big(1 - (1-p_i)^{n_i}\big)$ 被如下贪心规则最大化：逐个分配样本，每个都给当前**边际增益** $g_i(n_i) = p_i(1-p_i)^{n_i}$ 最大的题。
:::

::: proof
题 $i$ 在 $n_i$ 个样本后的贡献，是其前 $n_i$ 个边际增益之和，$1 - (1-p_i)^{n_i} = \sum_{j=0}^{n_i-1}p_i(1-p_i)^j$，而这些增益关于 $j$ 不增。于是任何分配都等价于：从每题不增的增益序列中各取一个前缀，共取 $B$ 个增益，而 $S$ 就是所选增益之和。任意 $B$ 个增益之和至多是全体中最大的 $B$ 个增益之和。因为每个序列不增，全体最大的 $B$ 个增益（平局按一致方式处理）恰构成每个序列的一个前缀，所以它们可由某个分配实现；而贪心规则选出的正是它们。故贪心最优。
:::

边际增益 $p(1-p)^n$ 的形状很说明问题。第一个样本处它是 $p$——所以容易的题最先被采样。但它对容易的题衰减得最快，于是几个样本之后，预算转移到中等难度的题上，而 $p$ 极小的题可能什么都分不到：那里的一个样本几乎总是浪费。下面的清单用四道题展示这一点。实践中 $p_i$ 未知、必须被*预测*——根据验证器在最初几个样本上的分数、根据投票的一致程度、或根据一个难度模型——而预测并不完美；一旦票面一致就停止采样的自适应方法（Aggarwal 等，2023）是其一种实用版本。

::: example 拆分四十个样本 {#ex-alloc}
四道题的 $p$ 为 $0.5, 0.2, 0.05, 0.01$，预算为 $40$ 个样本，配完美检验器。比较均匀分配 $(10, 10, 10, 10)$ 与贪心分配。
::: solution
均匀：$(1 - 0.5^{10}) + (1 - 0.8^{10}) + (1 - 0.95^{10}) + (1 - 0.99^{10}) = 0.999 + 0.893 + 0.401 + 0.096 = 2.389$。贪心（清单中算出）：$(5, 12, 23, 0)$，得 $0.969 + 0.931 + 0.693 + 0 = 2.593$。贪心分配给最难的题*什么也没分*：它第一个样本的增益 $0.01$，小于第 $23$ 个样本加在 $p = 0.05$ 那题上的增益 $0.05\cdot0.95^{22} = 0.016$。预算再大些，它最终也会被采样。
:::
:::

::: widget plot
f: 0.5*0.5^x; 0.2*0.8^x; 0.05*0.95^x; p*(1 - p)^x
x: 0, 40
y: 0, 0.12
sliders: p=0.01:0.005:0.3:0.005
labels: $p = 0.5$; $p = 0.2$; $p = 0.05$; adjustable $p$
caption: 不同难度题目上第 $(n+1)$ 个样本的边际增益 $p(1-p)^n$。由[[#thm-greedy-alloc]]，最优分配就是画一条水平线，把增益落在线上方的样本分给各题。容易的题拿到少量样本，中等的拿到很多，极难的在预算够大之前一个也拿不到。移动 $p$，看给定难度的题目何时进入分配。
:::

### Snell 等：计算最优的测试时扩展 {#sec-snell}

Snell 等（2024）在 MATH 基准上用 PaLM 2 模型系统地研究了这些权衡。他们比较两种花费测试时计算的方式——**对着 PRM 搜索**（best-of-$N$、步骤级束搜索、超前搜索；[[reasoning/search#alg-beam]]）与用专门微调来修正上一次尝试的模型**序贯修改**一个候选答案——并按基模型的 pass@1 把题目分为五档难度。他们的主要发现，按其报告：

- 最好的方法取决于难度。较容易的题上，序贯修改优于并行采样；较难的题上，并行与序贯的混合最好。束搜索在低预算与较难题上胜过 best-of-$N$，而 best-of-$N$ 在高预算的容易题上赶上。
- 按难度档选择策略与预算——一种**计算最优**的策略，其难度由验证器预测而非由先知给出——相比 best-of-$N$ 基线把效率提高了 $4$ 倍以上。
- 用[[#prop-flops-match]]做的 FLOPs 对齐比较中，在小模型已有非平凡成功率的题目上，当推理只占总计算的一小部分（$R\ll1$）时，带计算最优测试时扩展的小模型胜过大 $14$ 倍的模型。在最难的题上，或当 $R$ 很大时，把算力花在预训练大模型上是更好的用法。

这篇论文的结论很谨慎：测试时计算与预训练计算一般不能互相替代；但在模型能力之内的题目上，测试时计算往往是更便宜的改进方式。后来关于“推理扩展定律”的分析（Wu 等，2024）得出了相容的结论：在固定推理预算下，带好的搜索策略的小模型可以位于成本–准确率的前沿上。

## 序列式扩展：想得更久 {#sec-sequential}

用强化学习训练的推理模型（[[reasoning/verifiable-rewards]]）以*序列*方式花费测试时计算：一条长长的思维链。OpenAI 的 o1 公告（2024 年 9 月）展示了一道数学竞赛题的准确率随测试时计算的对数大致线性上升；DeepSeek-R1 报告记录了训练中响应长度随准确率上升而增长。序列式计算天然是自适应的——模型可以在容易题上早早停笔——但它更难控制，且延迟随长度增长，因为词元是一个接一个生成的。

Muennighoff 等（2025）问：序列式测试时扩展能简单到什么程度。他们的 **s1** 配方在一个开放 $320$ 亿参数指令模型（Qwen2.5-32B-Instruct）上微调，数据是**s1K**——按难度、多样性与质量选出的 $1{,}000$ 个问题，推理轨迹由另一个推理模型生成；微调在 $16$ 块 H100 GPU 上用了 $26$ 分钟。随后他们用**预算强制**在测试时控制思考的长度。

::: algorithm 预算强制（s1） {#alg-budget}
**输入：**一个在分隔符之间思考的模型；思考词元数的下限与上限。
1. 生成思考词元。
2. **要封顶思考：**一旦到达上限，就追加思考结束分隔符（外加一个诸如 "Final Answer:" 的提示），让模型作答。
3. **要延长思考：**若模型在到达下限之前发出思考结束分隔符，就压制它并追加 "Wait"，迫使模型继续推理；需要时重复。
4. 提取分隔符之后的答案。
:::

借助预算强制，s1-32B 在 AIME 2024 上的准确率在被强制继续思考时从 $50\%$ 升到 $57\%$，作者报告它在竞赛数学上最多超出 o1-preview $27\%$。他们也观察到极限：过多地强制 "Wait" 最终不再有帮助，模型会陷入重复的循环，序列式扩展因此变平。控制思考长度的其他方式包括用带长度条件的奖励训练（例如 Aggarwal 与 Welleck 的 L1，2025），以及部署系统中“推理力度”或思考预算上限之类的设置，其实现细节一般不见诸文档。

::: warning 想得多不总是更好
测试时扩展的曲线是在那些“更长的推理有帮助”的基准上取的平均。有些任务上它反而有害：Gema 等（2025）构制了一些任务——带干扰信息的简单计数、带伪特征的回归、带大量约束的演绎——若干推理模型在这些任务上的准确率随思考预算增长而*下降*。在容易题上过度思考浪费词元（[[reasoning/verifiable-rewards#sec-length]]），长链会积累错误、可能把正确答案说丢。先在你自己的任务上测量准确率随预算的变化，再假定越多越好。
:::

## 推理的经济学 {#sec-cost}

每个思考词元都是一个输出词元。就推理部署而言，有三个成本随它增长。

::: proposition 思维链的推理服务成本 {#prop-serve}
对一个有 $n$ 个提示词元、$m$ 个生成词元（思考加答案）的请求，在一台 $N$ 参数、$L$ 层、$n_{\text{kv}}$ 个维度为 $d_k$ 的键值头、每个存储数 $b$ 字节的模型上：

- 生成计算量约 $2Nm$ FLOPs，加上对增长到 $n + m$ 的上下文的注意力；
- 结束时的 KV缓存容纳 $2Ln_{\text{kv}}d_k b\,(n + m)$ 字节；
- 延迟至少是 $m$ 个串行的解码步骤；在每秒 $v$ 个词元下为 $m/v$ 秒。

在每输出词元价格 $c_{\text{out}}$ 与准确率 $A$ 下，**每个正确答案的成本**为 $m\,c_{\text{out}}/A$（另加输入成本）。
:::

::: proof
计算量与延迟两条同[[reasoning/chain-of-thought#prop-cost]]。每层为每个键值头、每个词元各存一个键向量和一个值向量，即每词元 $2Ln_{\text{kv}}d_k$ 个数，每个 $b$ 字节（[[inference]]）。若每个请求以概率 $A$ 成功，则每个正确答案所需的期望请求数为 $1/A$。
:::

KV缓存常常是要害约束：一条长长的思维链在整个存续期内都占着显存，一块加速器上同时放得下的请求就少了，吞吐量随之下降。并行采样把计算量与显存乘 $k$ 但不增延迟；序列式思考增的是延迟。

::: example 一条长思考占多少显存 {#ex-kv}
某模型 $L = 64$ 层，$n_{\text{kv}} = 8$ 个维度 $d_k = 128$ 的键值头，缓存以 $16$ 比特存储。一条请求思考 $32{,}768$ 个词元后占用多少缓存？$80$ GB 里除去 $40$ GB 权重还放得下几条这样的请求？
::: solution
每词元：$2\cdot64\cdot8\cdot128\cdot2 = 262{,}144$ 字节 $= 256$ KiB。$32{,}768$ 个词元：$2^{18}\cdot2^{15} = 2^{33}$ 字节 $= 8$ GiB。余下 $40$ GB，约可放 $40\times10^9/8.59\times10^9\approx4$ 条请求。同一块加速器本可容纳上百条每条 $1{,}000$ 词元的请求；长推理把批量大小、连同比吞吐量，压低了一个数量级以上（[[inference]]）。
:::
:::

::: example 每个正确答案的成本 {#ex-cost-correct}
一个大模型在某任务上以 $1$ 条 $1{,}500$ 词元的回复答对 $80\%$ 的时候，其每词元价格是小模型的 $10$ 倍；小模型每个样本答对 $70\%$。比较大模型，与小模型 $1$、$5$、$9$ 个样本多数投票的每个正确答案的成本（设对错二元、样本相互独立）。
::: solution
大模型：$1500\cdot10/0.8 = 18{,}750$ 单位。小模型单样本：$1500/0.7 = 2{,}143$；$5$ 票投票：准确率 $P_5(0.7) = 0.837$（[[reasoning/self-consistency#thm-condorcet]]），成本 $7500/0.837 = 8{,}961$；$9$ 票：准确率 $0.901$，成本 $13{,}500/0.901 = 14{,}980$。这里小模型的投票在准确率*与*每正确答案成本上都胜过大模型。两点提醒：真实误差相关，投票的收益会小一些（[[reasoning/self-consistency#thm-mixture]]）；而延迟与吞吐量没有被价格刻画。这一比较必须在实际任务上用实测准确率重做。
:::
:::

## 数值实验室 {#sec-code}

清单在 $5000$ 道题、难度服从 $\mathrm{Beta}(0.3, 3)$ 的模拟基准上检验[[#thm-beta-coverage]]，对 $\log(1 - c)$ 关于 $\log k$ 拟合斜率，计算[[#ex-alloc]]的贪心分配，以及[[#ex-cost-correct]]的成本表。

```python
import math, random
rng = random.Random(7)

# 1. 单题成功率 p ~ Beta(a, b) 时，重复采样的覆盖率
a, b = 0.3, 3.0
def coverage_exact(k):                         # 1 - E(1-p)^k = 1 - B(a, b+k) / B(a, b)
    return 1 - math.exp(math.lgamma(a + b) + math.lgamma(b + k) - math.lgamma(b) - math.lgamma(a + b + k))
ps = [rng.betavariate(a, b) for _ in range(5000)]   # 一个 5000 题的模拟基准
print("     k   coverage (exact)   simulated   power-law tail 1 - C k^-a")
C = math.exp(math.lgamma(a + b) - math.lgamma(b))
for k in [1, 10, 100, 1000, 10000]:
    sim = sum(1 - (1 - p)**k for p in ps) / len(ps)
    print(f"{k:6d}   {coverage_exact(k):16.4f}   {sim:9.4f}   {1 - C * k**-a:12.4f}")

# 用 k = 10..10000 对 log(1 - 覆盖率) 关于 log k 做最小二乘拟合
xs = [math.log(k) for k in [10, 30, 100, 300, 1000, 3000, 10000]]
ys = [math.log(1 - coverage_exact(round(math.exp(x)))) for x in xs]
mx, my = sum(xs) / len(xs), sum(ys) / len(ys)
slope = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx)**2 for x in xs)
print(f"fitted slope of log(1 - coverage) vs log k: {slope:.3f}  (theory: -a = {-a})")

# 2. 把样本预算分配给难度不同的题目
probs = [0.5, 0.2, 0.05, 0.01]                # 四道题的单样本成功率
budget = 40
def solved(alloc):                            # 完美验证器下的期望解题数
    return sum(1 - (1 - p)**n for p, n in zip(probs, alloc))
uniform = [budget // len(probs)] * len(probs)
alloc = [0] * len(probs)
for _ in range(budget):                       # 贪心：下一个样本给边际增益最大的题
    gains = [p * (1 - p)**n for p, n in zip(probs, alloc)]
    alloc[gains.index(max(gains))] += 1
print(f"\nuniform {uniform}: expected solved {solved(uniform):.3f}")
print(f"greedy  {alloc}: expected solved {solved(alloc):.3f}")

# 3. 每个正确答案的成本：大模型跑一次 vs 小模型配投票
def majority(p, n):
    return sum(math.comb(n, k) * p**k * (1 - p)**(n - k) for k in range(n // 2 + 1, n + 1))
print("\nsetting                       accuracy  tokens/question  cost per correct (relative)")
big = (0.80, 1 * 1500, 10.0)                  # 准确率、输出词元数、每词元价格（相对）
print(f"large model, 1 sample          {big[0]:.3f}  {big[1]:15d}  {big[1] * big[2] / big[0]:10.0f}")
for n in [1, 5, 9]:
    acc = majority(0.70, n)
    toks = n * 1500
    print(f"small model, vote of {n}        {acc:.3f}  {toks:15d}  {toks * 1.0 / acc:10.0f}")
```

```text
     k   coverage (exact)   simulated   power-law tail 1 - C k^-a
     1             0.0909      0.0908        -0.3417
    10             0.3734      0.3708         0.3275
   100             0.6656      0.6629         0.6630
  1000             0.8312      0.8300         0.8311
 10000             0.9154      0.9134         0.9153
fitted slope of log(1 - coverage) vs log k: -0.292  (theory: -a = -0.3)

uniform [10, 10, 10, 10]: expected solved 2.389
greedy  [5, 12, 23, 0]: expected solved 2.593

setting                       accuracy  tokens/question  cost per correct (relative)
large model, 1 sample          0.800             1500       18750
small model, vote of 1        0.700             1500        2143
small model, vote of 5        0.837             7500        8961
small model, vote of 9        0.901            13500       14980
```

覆盖率从平均成功率 $0.3/3.3 = 0.091$ 出发，$k$ 每扩大十倍大约增长同样多——Brown 等观察到的对数线性形态——而幂律近似[[#eq-power-tail]]在 $k = 1$ 处毫无用处，从 $k = 100$ 起却很准，且拟合斜率逼近 $-\alpha$。同样的 $40$ 个样本，贪心分配期望多解 $0.2$ 道题，成本表则复现了[[#ex-cost-correct]]。

::: quiz
一个团队有固定的每题推理预算，还有一个可靠性一般的验证器。本章支持哪些说法？（多选。）
- [x] 多样本的覆盖率会高估他们实际得到的准确率，因为选择不超过覆盖率，又受验证器限制。
- [x] 把更多样本花在中等难度的题上、少花给极容易或无望的题，可以增加解题数。
- [ ] 把推理模型的思考预算翻倍总能提高准确率。
- [ ] 大 $14$ 倍的模型在相同算力下总是胜过小模型的 $14$ 个样本。
::: solution
选择不超过覆盖率，并随不完美的验证器饱和（[[#sec-verification]]）；贪心分配偏爱中等难度（[[#thm-greedy-alloc]]）。更长的思考在有些任务上反而有害，而更大的模型能否胜过更多样本取决于难度与比值 $R$（[[#sec-snell]]）。
:::
:::

::: history
带过滤的重复采样是 AlphaCode（Li 等，2022）的核心：它为每道竞赛题生成多达数百万个程序，再用样例测试过滤。Chen 等（2021）提出了无偏的 pass@$k$ 估计量，Wang 等（2022）提出了自洽性。2024 年，Brown 等测到了 $10{,}000$ 个样本的覆盖率（《Large Language Monkeys》），Snell 等分析了计算最优的测试时扩展，Wu 等研究了推理扩展定律，OpenAI 的 o1 公告（2024 年 9 月）给出了一个推理模型的准确率作为测试时计算函数的曲线。2025 年，DeepSeek-R1 报告描述了强化学习中思考长度的增长，Muennighoff 等提出 s1 与预算强制，Schaeffer 等解释了覆盖率曲线的幂律形态，Gema 等记录了某些任务上准确率随推理长度反向变化的现象。
:::

::: summary
- 推理每词元约 $2N$ FLOPs；在相同总计算量下，大 $M$ 倍的模型抵得上小模型 $k = (M(3+R) - 3)/R$ 倍的推理词元，其中 $R$ 是推理词元与预训练词元之比。
- **覆盖率**（pass@$k$ 对题目取平均）在多个数量级内大致与 $\log k$ 成比例增长；Brown 等拟合了 $\exp(ak^b)$。若难度服从 $\mathrm{Beta}(\alpha,\beta)$，未解比例为 $B(\alpha,\beta+k)/B(\alpha,\beta)\sim\frac{\Gamma(\alpha+\beta)}{\Gamma(\beta)}k^{-\alpha}$：指数混合生出幂律。
- 没有精确检验器时，选择远低于覆盖率便进入平台；重复采样在答案可验证处回报最大。
- 成功率已知时，按边际增益 $p(1-p)^n$ 的**贪心分配**最优；它偏爱中等难度。Snell 等发现，计算最优、随难度而变的策略比 best-of-$N$ 高效 $4$ 倍以上，并能在小模型能力之内的题上胜过大 $14$ 倍的模型。
- **序列式**扩展（更长的链）能就题自适应，但增加延迟；**预算强制**用思考结束分隔符给思考封顶、用 "Wait" 延长思考（s1），其收益终会变平。
- 推理服务成本随思考词元数在计算量、KV缓存显存（每词元 $2Ln_{\text{kv}}d_kb$ 字节）与延迟上增长；用**每个正确答案的成本**比较系统，并记住想得多可能反而有害。
:::

## 习题

::: exercise 一道题的覆盖率 {level=1 check="0.6415"}
一道题单个样本有 $0.05$ 的概率解出。$20$ 个独立样本中至少一个解出它的概率是多少？给出四位小数。
::: solution
$1 - 0.95^{20} = 1 - 0.3585 = 0.6415$。
:::
:::

::: exercise FLOPs 对齐的预算 {level=1 check="53"}
用[[#eq-flops-match]]，取 $M = 14$、$R = 1$，在相同总计算量下小模型能生成多几倍的推理词元？
::: solution
$k = (14\cdot(3+1) - 3)/1 = 53$。
:::
:::

::: exercise 长思考的缓存 {level=1 check="8"}
$L = 64$、$n_{\text{kv}} = 8$、$d_k = 128$、每个数 $2$ 字节时，一条 $32{,}768$ 词元的序列占多少 GiB 键值缓存？
::: solution
每词元 $2\cdot64\cdot8\cdot128\cdot2 = 262{,}144$ 字节；乘以 $32{,}768$ 得 $8{,}589{,}934{,}592$ 字节 $= 8$ GiB。
:::
:::

::: exercise 均匀的难度 {level=2 check="0.99"}
若单样本成功率在 $[0,1]$ 上均匀分布（$\alpha = \beta = 1$），由[[#eq-beta-cov]]证明覆盖率为 $k/(k+1)$，并求 $k = 99$ 处的值。
::: solution
$B(1, 1+k)/B(1,1) = \Gamma(2)\Gamma(1+k)/(\Gamma(1)\Gamma(2+k)) = k!/(k+1)! = 1/(k+1)$，所以 $c(k) = 1 - 1/(k+1) = k/(k+1)$，且 $c(99) = 0.99$。幂律的指数为 $\alpha = 1$：$k$ 每扩大十倍，未解比例下降为十分之一。
:::
:::

::: exercise 外推幂律 {level=2 check="0.9"}
$k = 10$ 时未解比例为 $0.4$，$k = 100$ 时为 $0.2$。设 $1 - c = Ck^{-\alpha}$，预测 $k = 1000$ 处的覆盖率。
::: solution
$10^{-\alpha} = 0.2/0.4$，故 $\alpha = \log_{10}2$，$k = 1000$ 处的未解比例为 $0.2/2 = 0.1$：覆盖率 $0.9$。
:::
:::

::: exercise 两道题，三个样本 {level=2 check="0.875"}
两道题的 $p$ 分别为 $0.5$ 与 $0.1$。用[[#thm-greedy-alloc]]分配 $3$ 个样本，并给出期望解题数。
::: solution
边际增益：第一题 $0.5, 0.25, 0.125, \dots$；第二题 $0.1, 0.09, 0.081, \dots$。最大的三个是 $0.5$、$0.25$ 与 $0.125$，全在第一题，所以分配是 $(3, 0)$，期望解题数 $0.5 + 0.25 + 0.125 = 0.875$。（分配 $(2, 1)$ 给出 $0.75 + 0.1 = 0.85$。）
:::
:::

::: exercise 拟合指数化幂律 {level=2 check="0.924"}
$k = 1$ 时覆盖率为 $0.2$，$k = 100$ 时为 $0.7$。把 $c(k) = \exp(ak^b)$ 拟合到这两点上，并预测 $k = 10{,}000$ 处的覆盖率，精确到三位小数。
::: solution
$k = 1$：$a = \ln0.2 = -1.6094$。$k = 100$：$\ln0.7 = -0.35667 = a\cdot100^b$，故 $100^b = 0.22162$，$b = \ln0.22162/\ln100 = -0.3272$。$k = 10^4$ 时：$10^{4b} = (100^b)^2 = 0.049115$，且 $c = \exp(-1.6094\cdot0.049115) = \exp(-0.07905) = 0.924$。
:::
:::

::: exercise 并行还是序列？ {level=2}
某推理模型在 $4{,}000$ 词元预算下达到 $60\%$ 的准确率，在 $16{,}000$ 词元下达到 $66\%$。另一个选择：对四个 $4{,}000$ 词元的样本做多数投票。对一个在每秒 $1{,}000$ 词元下有 $10$ 秒硬性延迟限制的应用，和一个只关心吞吐量的应用，各选哪种？应当先测什么？
::: solution
在每秒 $1{,}000$ 词元、$10$ 秒的限制下，$16{,}000$ 词元的链要 $16$ 秒，直接出局；四个并行的 $4{,}000$ 词元样本约需 $4$ 秒墙钟时间（硬件足够时），所以要在限制内多花计算，投票是唯一选项。只求吞吐量时，两种方案花同样多的词元，但长链每次请求同一时间占用的 KV缓存显存更多（[[#prop-serve]]），而并行样本共享提示的缓存。应先测的：本任务上四样本投票的准确率（误差相关时它可能远低于独立假设的预测，[[reasoning/self-consistency#thm-mixture]]）；以及长链的准确率随预算的变化——它可能变平甚至下降（[[#sec-sequential]]）。
:::
:::

::: exercise 自适应投票 {level=3}
写一个纯 Python 模拟**自适应自洽性**：逐个抽样，当领先答案比第二名多 $3$ 票时停止（或抽满 $40$ 个后停止）。错误答案均匀分散在 $5$ 个取值上。在单样本准确率 $0.9$、$0.6$ 与 $0.35$ 下，把它的准确率与平均样本数和固定 $15$ 票比较，并解释所见规律。
::: solution
```python
import random
rng = random.Random(8)

def sample_answer(p_correct):
    """一个采样答案：0 正确；错误答案分散在 1..5。"""
    return 0 if rng.random() < p_correct else rng.randint(1, 5)

def adaptive_vote(p_correct, lead=3, max_n=40):
    counts = {}
    for n in range(1, max_n + 1):
        a = sample_answer(p_correct)
        counts[a] = counts.get(a, 0) + 1
        top = sorted(counts.values(), reverse=True) + [0]
        if top[0] - top[1] >= lead:
            break
    return max(counts, key=counts.get) == 0, n

def fixed_vote(p_correct, n):
    counts = {}
    for _ in range(n):
        a = sample_answer(p_correct)
        counts[a] = counts.get(a, 0) + 1
    best = max(counts.values())
    return rng.choice([a for a, c in counts.items() if c == best]) == 0, n

for p in [0.9, 0.6, 0.35]:
    for name, f in [("fixed n = 15  ", lambda: fixed_vote(p, 15)), ("stop at lead 3", lambda: adaptive_vote(p))]:
        res = [f() for _ in range(20000)]
        acc = sum(r[0] for r in res) / len(res); n = sum(r[1] for r in res) / len(res)
        print(f"p = {p:.2f}  {name}  accuracy {acc:.3f}  mean samples {n:5.1f}")
```

```text
p = 0.90  fixed n = 15    accuracy 1.000  mean samples  15.0
p = 0.90  stop at lead 3  accuracy 1.000  mean samples   3.7
p = 0.60  fixed n = 15    accuracy 0.991  mean samples  15.0
p = 0.60  stop at lead 3  accuracy 0.993  mean samples   7.3
p = 0.35  fixed n = 15    accuracy 0.731  mean samples  15.0
p = 0.35  stop at lead 3  accuracy 0.876  mean samples  17.5
```

容易题上，自适应规则约四个样本就停，准确率毫无损失；中等难度上，成本减半；难题上，它自动花掉*多于* $15$ 个样本，还换来更高的准确率。它是[[#thm-greedy-alloc]]的数据驱动版：票面的一致程度充当难度的估计，不需要知道 $p$——但正如[[reasoning/self-consistency#sec-correlated]]警告的，在一道有系统性错答案的题上，它会提前停下，而且信心十足。
:::
:::
