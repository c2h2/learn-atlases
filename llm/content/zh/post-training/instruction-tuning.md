预训练语言模型只会续写文本。给它 *What is the capital of France?*，它也许会回答 *Paris*，但同样可能续上一串 *What is the capital of Germany? What is the capital of Spain?*，因为测验题目清单在网页上十分常见。下一词元预测（[[pretraining/pretraining-objectives]]）没有任何内容告诉模型：眼前的文本是一个想要答案的人提出的请求。**指令微调（instruction tuning）**——在指令与优良回复配对的样例上做监督微调（SFT）——教的恰恰就是这件事。它是后训练的第一个阶段，通常也是最便宜的阶段，本课程后续的所有阶段都从它的输出出发。

本章给出带**提示掩码（prompt masking）**的监督微调目标，说明它优化的到底是什么；随后梳理奠定指令微调的一系列工作——FLAN、T0、Flan-T5 与 Flan-PaLM、Self-Instruct 与 LIMA——并谨慎地陈述每一项的发现。接着处理把一场对话变成训练序列的实务机制：**对话模板**、**特殊词元**、多轮掩码、打包（packing）以及超参数的选择。最后说明 SFT 做不到什么，这正是后面几章强化学习内容的动机。被微调的基座模型已在[[pretraining/model-families]]中综述；不改动权重而设计提示属于[[prompting-rag/prompt-design]]的主题。

## 从续写到遵循指令 {#sec-why}

基座模型见过大量“问题后面跟着答案”“指令后面跟着执行”“对话”的例子。回答问题的能力是有的，缺的是那种**约定**：光标之前的文本是一个请求，之后的文本应当满足它。少样本提示（[[prompting-rag/in-context-learning]]）通过在上下文窗口里给出几个例子来提供这个约定；指令微调则通过成千上万条训练样本把它写进权重。

本课程将要建立的后训练流程有一个固定的形状，如下图所示：预训练模型先在示范数据上微调，其结果或者直接使用，或者借助反馈进一步改进——奖励模型与强化学习（[[post-training/rlhf]]），或直接偏好优化（[[post-training/preference-optimisation]]）。指令微调就是从基座模型出发的那条箭头。

::: widget graph
nodes: Pretrained@0,1; SFT@1,1; Demonstrations@1,2; Preferences@2,2; RewardModel@3,2; RL@3,1; DPO@3,0; Assistant@4,1
edges: Pretrained>SFT; Demonstrations>SFT; SFT>RL; SFT>DPO; Preferences>RewardModel; RewardModel>RL; Preferences>DPO; RL>Assistant; DPO>Assistant; SFT>Assistant
algorithm: topo
caption: 后训练的形状。在示范数据上做监督微调（SFT），把预训练模型变成遵循指令的模型；随后或者部署，或者用偏好数据改进——经由奖励模型与强化学习（RL），或者直接进行（DPO）。按拓扑序逐步展开：本课程中的每种方法都需要先做 SFT。实际流程会重复这些阶段若干次，并混入其他数据。
:::

## 监督微调目标 {#sec-objective}

::: definition 指令数据集与 SFT 损失 {#def-sft}
**指令数据集**是一个集合 $\mathcal{D} = \{(\mathbf{x}^{(i)}, \mathbf{y}^{(i)})\}_{i=1}^{n}$，由**提示** $\mathbf{x}$（一条指令，可能附带输入数据、系统提示以及对话的前几轮）与被撰写或被认可为优良答案的**回复** $\mathbf{y} = (y_1, \dots, y_{L})$ 组成。**监督微调**从预训练参数 $\theta_0$ 出发，最小化给定提示下回复的负对数似然，

$$
\mathcal{L}_{\text{SFT}}(\theta) = -\frac{1}{\sum_i L_i}\sum_{i=1}^{n}\sum_{t=1}^{L_i}\log p_\theta\big(y^{(i)}_t \,\big\vert\, \mathbf{x}^{(i)}, y^{(i)}_{<t}\big),
$$ {#eq-sft}

其中 $L_i$ 是第 $i$ 条回复的长度。提示词元属于输入，但**不是预测目标**：这就是**提示掩码**（也称损失掩码）。
:::

从机制上看，SFT 就是把带教师强制的因果语言建模损失（[[pretraining/pretraining-objectives#def-clm]]）作用在提示与回复的拼接串上，再把提示位置上的逐词元损失乘以零。在代码里，被掩位置的目标 id 会被设为交叉熵跳过的“忽略”值（常取 $-100$）。此外一切照旧：同样的模型、同样的优化器，只是数据集小得多、学习率低得多。

由于损失是条件似然，它和任何交叉熵一样，最小点就是数据的条件分布。这里的“数据”，指的就是撰写这些回复的人——或模型。

::: proposition SFT 模仿示范者 {#prop-imitation}
设提示服从分布 $p(\mathbf{x})$，回复来自**示范者（demonstrator）**分布 $\pi_{\text{demo}}(\mathbf{y}\mid\mathbf{x})$。期望的求和 SFT 损失满足

$$
\E_{\mathbf{x}}\E_{\mathbf{y}\sim\pi_{\text{demo}}}\big[-\log p_\theta(\mathbf{y}\mid\mathbf{x})\big] = \E_{\mathbf{x}}\Big[H\big(\pi_{\text{demo}}(\cdot\mid\mathbf{x})\big) + D_{\mathrm{KL}}\big(\pi_{\text{demo}}(\cdot\mid\mathbf{x})\,\Vert\,p_\theta(\cdot\mid\mathbf{x})\big)\Big],
$$ {#eq-sft-kl}

因此在足够丰富的模型类上最小化它，便对每个满足 $p(\mathbf{x}) > 0$ 的提示得到 $p_\theta(\cdot\mid\mathbf{x}) = \pi_{\text{demo}}(\cdot\mid\mathbf{x})$。
:::

::: proof
由链式法则（[[pretraining/pretraining-objectives#prop-chain]]），$\sum_t\log p_\theta(y_t\mid\mathbf{x}, y_{<t}) = \log p_\theta(\mathbf{y}\mid\mathbf{x})$，所以单条样例的求和损失就是 $-\log p_\theta(\mathbf{y}\mid\mathbf{x})$。固定 $\mathbf{x}$，写出 $-\log p_\theta = -\log\pi_{\text{demo}} + \log(\pi_{\text{demo}}/p_\theta)$，再对 $\mathbf{y}\sim\pi_{\text{demo}}(\cdot\mid\mathbf{x})$ 取期望：第一项给出熵，第二项给出散度，与[[pretraining/pretraining-objectives#prop-minimiser]]相同。熵不依赖 $\theta$，而散度非负，且恰在两个分布相等时为零（吉布斯（Gibbs）不等式，[[math-for-ml/information-theory#thm-gibbs]]）。对提示取平均逐条保持这一结论。
:::

由此得出两个后果，左右了后面的一切。第一，SFT 至多只能复现示范者——包括它的错误、不一致与风格；它根本没有“某条回复比示范**更好**”的概念。第二，[[#eq-sft-kl]] 中的散度是**前向** KL，即 $D_{\mathrm{KL}}(\pi_{\text{demo}}\Vert p_\theta)$，它严厉惩罚模型给示范者的任何行为以低概率。无法精确表示示范者的模型会被迫把概率摊到他们的全部行为上——**模式覆盖**（mode covering）——而不是从中挑出最好的。从反馈中做强化学习优化的是另一个类似反向 KL 的目标（[[post-training/rl-for-language-models#sec-kl]]），两个阶段行为上的差别很大程度上正源于此。

### 为什么要掩掉提示？ {#sec-masking}

如果提示词元也是目标，单条样例的求和损失就成了 $-\log p_\theta(\mathbf{x}) - \log p_\theta(\mathbf{y}\mid\mathbf{x}) = -\log p_\theta(\mathbf{x}, \mathbf{y})$：整段对话的联合似然。

::: proposition 不掩提示的 SFT 会多出一项提示建模项 {#prop-unmasked}
在提示词元和回复词元上同时训练，最小化的是

$$
\E\big[-\log p_\theta(\mathbf{x}, \mathbf{y})\big] = \underbrace{\E\big[-\log p_\theta(\mathbf{x})\big]}_{\text{建模用户}} + \underbrace{\E\big[-\log p_\theta(\mathbf{y}\mid\mathbf{x})\big]}_{\text{SFT 损失}}.
$$

在足够丰富、能把两项都精确表示出来的模型类中，条件项的最小点在掩与不掩两种情况下相同。但在有限容量与有限梯度步数下，第一项会与第二项争夺资源。
:::

::: proof
这个分解就是链式法则 $p(\mathbf{x}, \mathbf{y}) = p(\mathbf{x})\,p(\mathbf{y}\mid\mathbf{x})$ 两边取 $-\log$。在因果模型中，提示位置与回复位置的条件分布是网络的不同输出，所以只要模型类能表示任意一族条件分布，两项就能各自独立最小化，无论第一项怎么处理，使第二项最小的回复条件分布总是[[#prop-imitation]]中的那个。
:::

所以掩码关乎的不是极限意义下的正确性，而是训练信号流向哪里。指令数据集中的提示往往很长（待摘要的文档、待修复的代码、先前几轮对话），若不掩码，大部分梯度会用来教模型模仿用户。实践中做法不一。InstructGPT 与 Llama 2 的报告显示只在回复词元上训练；有研究发现，当回复非常短时，给提示词元一个小权重反而有帮助（Shi 等，2024，“instruction modelling”）。掩码是默认做法，也是合理的做法。

::: example 数一数对话中的目标 {#ex-targets}
一条训练对话渲染如下：一个序列起始词元；一轮 $40$ 个词元的系统提示；一轮 $120$ 个词元的用户输入；一条 $80$ 个词元的助手回复；第二轮 $30$ 个词元的用户输入；第二条 $150$ 个词元的助手回复。每轮都用一个角色头部和一个轮次结束词元包裹。若损失覆盖每条助手回复及其轮次结束词元，这条序列共有多少词元，其中多少是 SFT 目标？
::: solution
每轮额外增加 $2$ 个包裹词元，五轮共 $40 + 120 + 80 + 30 + 150 = 420$ 个内容词元和 $10$ 个包裹词元；加上起始词元，序列共 $431$ 个词元。目标是 $80 + 150 = 230$ 个助手词元及它们的 $2$ 个轮次结束词元：共 $232$ 个目标，约占位置的 $54\%$。轮次结束词元必须作为目标：模型正是靠它学会何时停笔。若只训练**最后**一条回复（一些处理从模型收集来的对话的流程会这样选），目标就只有 $151$ 个。
:::
:::

### 按词元平均还是按序列平均 {#sec-averaging}

[[#eq-sft]] 除以的是批次中回复词元的总数。另一种做法是先对每条回复内部取平均，再对回复取平均。两种平均在所有回复等长时一致，否则不同。

::: proposition 按词元与按序列的平均损失对样例的加权不同 {#prop-weights}
设一个批次中各回复长度为 $L_1, \dots, L_B$，逐词元平均损失为 $\bar\ell_1, \dots, \bar\ell_B$，则**按词元平均**的损失 $\sum_iL_i\bar\ell_i/\sum_iL_i$ 给第 $i$ 条样例的权重是 $w_i = L_i/\sum_jL_j$，而**按序列平均**的损失 $\frac1B\sum_i\bar\ell_i$ 给每条样例的权重都是 $1/B$。按词元平均时，每个词元的梯度权重都是 $1/\sum_jL_j$；按序列平均时，第 $i$ 条样例的每个词元权重为 $1/(BL_i)$。
:::

::: proof
展开：$\sum_iL_i\bar\ell_i/\sum_jL_j = \sum_iw_i\bar\ell_i$，其中 $w_i = L_i/\sum_jL_j$；再由 $\bar\ell_i = \frac1{L_i}\sum_t\ell_{i,t}$ 即得逐词元权重。按序列平均就是普通平均。
:::

多数库默认按词元平均；这会让长回复主导梯度。按序列平均则让短回复在每词元上占主导。两者都谈不上“对”——它们表达的是“长回答是否包含更多信息”的不同信念——但这个选择会与梯度累积和数据打包相互作用（累积的词元平均必须除以各微批次词元总数，而不是把微批次的平均值再平均；见[[neural-networks/training-practice#sec-accumulation]]），而且它还会在强化学习中重现，那里的按序列归一会引入长度偏置（[[post-training/preference-optimisation#sec-grpo]]）。

::: widget plot
f: x/(x+a); 0.5 + 0*x
x: 1, 500
y: 0, 1
sliders: a=100:1:500:1
labels: weight under token averaging; weight under sequence averaging
caption: 两条样例的批次中，长度为 $x$ 词元的样例在另一条长度为 $a$ 时的权重。按词元平均（[[#prop-weights]]）下权重为 $x/(x + a)$：一条 $4$ 词元的回答与一条 $60$ 词元的回答同批时只分到 $\frac{1}{16}$ 的梯度。按序列平均时，无论长度如何，两者各分一半。
:::

::: example 同一批次，两种平均 {#ex-averages}
一个批次包含两条回复：一条 $4$ 词元的回答，平均每词元损失 $2.5705$ 纳特；一条 $60$ 词元的回答，平均每词元损失 $1.0731$。计算按词元平均与按序列平均的损失。
::: solution
按词元：$(4\cdot2.5705 + 60\cdot1.0731)/64 = (10.282 + 64.386)/64 = 1.1667$。按序列：$(2.5705 + 1.0731)/2 = 1.8218$。两者权重分别是 $4/64 = 0.0625$ 和 $0.9375$，对 $0.5$ 和 $0.5$。那条困难的短回答几乎不影响按词元平均的梯度。这些正是[[#sec-code]]中程序打印出的数字。
:::
:::

## 指令微调作为多任务学习 {#sec-history}

一个模型可以在许多以自然语言表述的任务上训练，并因此能遵循新指令——这一思想在 2021 与 2022 年由一系列论文确立，每篇各改变一种原料：任务的来源、任务的数目、模型的规模，或回复的来源。

### 用指令措辞的众多任务 {#sec-flan}

::: definition 多任务提示训练 {#def-templates}
给定一批有监督数据集（分类、问答、翻译、摘要……），用若干条自然语言**模板**——例如 *“Premise: … Hypothesis: … Does the premise entail the hypothesis? Options: yes, no”*——把每个数据集渲染成（提示，回复）对，然后在并集上用 SFT 损失微调模型。泛化性在**留出**（held-out）任务上衡量：即完全未进入训练混合的任务类型。
:::

**FLAN**（Wei 等，ICLR 2022）在 $62$ 个数据集（分为 $12$ 个任务簇，每个数据集十个模板）上微调了一个 1370 亿参数的解码器（LaMDA-PT）。在训练时留出的任务簇上做零样本评估，微调后的模型比未微调的模型有大幅提升，且论文报告其在评估的 $25$ 个数据集中有 $20$ 个超过了零样本 GPT-3（175B）。两项消融实验影响了后来的工作：随着加入的任务簇增多，留出任务簇上的表现持续上升；而且这一收益只在足够大的规模上出现——就论文中 $80$ 亿参数及更小的模型而言，指令微调*损害*了留出表现，作者将此归因于小模型在训练任务上已经用尽了自身容量。

**T0**（Sanh 等，ICLR 2022）用一个 110 亿参数的编码器-解码器（经语言模型化改造的 T5）在公开众包模板集合（P3，由 PromptSource 工具构建）上训练，得到了类似的结论：其在留出任务上的零样本表现常常匹敌甚至超过大自己许多倍的模型。**Super-NaturalInstructions**（Wang 等，EMNLP 2022）收集了 $1{,}616$ 个由专家撰写指令的任务。

**Flan-T5 与 Flan-PaLM**（Chung 等，2022）把这一配方扩展到 $1{,}836$ 个任务和最大 5400 亿参数的模型，发现性能随任务数和模型规模一同提升，并且需要在混合数据中加入少量**思维链**数据（[[reasoning/chain-of-thought]]），才能在微调后保住模型逐步推理的能力。发布的 Flan-T5 检查点成了广泛使用的基线。

::: example 带上限的混合 {#ex-mixing}
FLAN 按数据集大小比例混合，但给每个数据集设了 $30{,}000$ 条样例的上限，以免大数据集淹没其余。现有三个数据集，分别有 $400{,}000$、$50{,}000$ 和 $10{,}000$ 条样例：不设上限与设上限时，各占混合的多少？
::: solution
不设上限：$400/460 = 0.870$、$50/460 = 0.109$、$10/460 = 0.022$。设上限后规模变为 $30{,}000$、$30{,}000$、$10{,}000$：占比为 $3/7 = 0.429$、$0.429$ 和 $1/7 = 0.143$。上限把最小数据集的份额提高了六倍多；这与按温度采样语言的思路相同（[[pretraining/data-mixtures#sec-languages]]）。
:::
:::

### 由人和模型撰写的回复 {#sec-self-instruct}

学术任务集合的回复短而格式化——一个标签、一个片段、一句话——与助手使用者的期望相去甚远。**InstructGPT**（Ouyang 等，2022）转而用雇佣标注者撰写的回复在约 $13{,}000$ 条提示上微调 GPT-3，其中许多提示来自某 API 的用户；这个 SFT 模型就是[[post-training/rlhf]]中 RLHF 流程的第一阶段。手写此类回复十分昂贵，由此催生了两个方向：公开众包（Databricks 的 Dolly，约 $15{,}000$ 条由员工撰写；OpenAssistant Conversations，Köpf 等，2023，$35$ 种语言、超过 $160{,}000$ 条由志愿者撰写并评分的消息）以及用模型生成。

::: algorithm Self-Instruct（Wang 等，2023）{#alg-self-instruct}
1. 用一小组人工撰写的种子任务（论文中为 $175$ 条）启动任务池，每条是一个带一或多组输入–输出实例的指令。
2. 从池中抽取若干任务（种子与生成的混用），提示语言模型以同样风格写出一条**新指令**。
3. 提示模型为新指令生成**实例**：输入与输出（对分类任务，先输出标签、再据此生成输入，以免所有实例标签相同）。
4. **过滤**：若指令与池中已有指令过于相似（ROUGE-L 重合度超过 $0.7$）、要求文本模型做不到的事（例如图像），或实例为空或重复，则丢弃该指令。
5. 将幸存者加入池，回到第 2 步。最后，在所有生成的（指令，输入，输出）样例上微调一个模型。
:::

Wang 等（ACL 2023）用 GPT-3 生成了约 $52{,}000$ 条指令、约 $82{,}000$ 个实例，并报告：用这些数据微调 GPT-3 本身，在 Super-NaturalInstructions 上有大幅提升，在他们的人类评估中逼近最早的 InstructGPT 模型——一个模型靠训练自己（过滤后的）文字而进步。斯坦福的 **Alpaca**（Taori 等，2023）采用简化版 Self-Instruct 流程，以更强的 OpenAI 模型做生成器，在 $52{,}000$ 条样例上微调 $70$ 亿参数的 LLaMA 模型，据称成本仅数百美元，展示了让小开放模型廉价地表现得像聊天助手是可行的。用一个模型的输出训练另一个模型就是**蒸馏**，将在[[post-training/distillation]]中讨论，连同它的局限：模仿学到的风格多于能力。

### 对齐需要多少数据？ {#sec-lima}

**LIMA**（Zhou 等，NeurIPS 2023）只在 $1{,}000$ 条精心挑选的样例上微调了一个 650 亿参数的 LLaMA 模型——约 $750$ 条选自社区问答网站、$250$ 条由作者撰写——完全不做强化学习。在 $300$ 条测试提示上的人类偏好研究中，LIMA 的回答在 $43\%$ 的情形被评为与 GPT-4 相当或更好；面对更弱的系统时胜得更多。作者提出了**表层对齐假说**（superficial alignment hypothesis）：模型的知识与能力几乎全部在预训练中学得，对齐主要教的是与用户交互时应采用的格式与风格。他们在较小模型上做的消融发现：样例的质量与多样性比数量更重要。

::: warning LIMA 证明了什么，没证明什么
LIMA 常被概括成“$1{,}000$ 条样例就够对齐了”。论文的结论其实狭窄得多。比较是在 $300$ 条与精选数据同类型的提示上做的偏好判断；它没有检验安全性、拒答、多轮鲁棒性或大规模困难推理，作者也报告 LIMA 在其中某些方面更弱。表层对齐假说只是与他们的结果相符的一个*假说*，并非实测事实，后来的工作发现更大、更多样的 SFT 数据集在数学、代码与工具调用上仍能持续带来提升。真正稳固的教训是那项消融：几千条优秀、多样的样例，胜过十万条平庸的。
:::

数据选择此后自成一个研究领域——用模型评分质量、按多样性、或按样例对被训练模型的难度来过滤指令集。Wang 等（2023，“How far can camels go?”）比较了众多开放指令数据集，发现没有一个在所有能力上都最好，因此实际的 SFT 混合会组合多种来源：通用聊天、代码、带完整解答的数学、多语言数据、安全样例（包括恰当的拒答）与工具调用。

::: quiz
一个团队用外包人员撰写的 $10{,}000$ 条回复微调基座模型，而外包人员偶尔会犯事实错误。根据[[#prop-imitation]]，SFT 模型至多能做到什么？
- [ ] 学到正确答案，因为错误是随机的，会被平均掉
- [x] 复现外包人员的回复分布，包括他们犯错的比例与类型
- [ ] 超过外包人员，因为基座模型已经知道这些事实
- [ ] 只学到格式，忽略内容
::: solution
SFT 最小化到示范者分布的前向 KL，其最小点正是那个分布本身。外包人员系统性犯下的错误也是被模仿的对象。实践中，模型有时可能由于预训练获得的知识和有限训练的平滑效应而表现得比示范更好，但目标函数中没有任何一项奖励“正确”胜过“模仿”。后面章节中基于反馈的方法补上的正是这个缺失的信号。
:::
:::

## 对话模板与特殊词元 {#sec-templates}

部署中的助手收到的是对话，而不是一个字符串。在模型看到它之前，对话会由**对话模板**渲染成一个词元序列。

::: definition 对话模板 {#def-template}
**对话模板**是把对话——按顺序排列的轮次列表，每轮带一个**角色**（system、user、assistant，许多模型还有 tool）和内容——映射为词元序列的确定性函数。它插入**控制词元**来标记每轮的起始与角色以及每轮的结束，并在推理时追补一个助手轮次的头部，使模型的续写就是回复。控制词元是**特殊词元**：词表中分词器绝不会从普通文本产生的单独条目。
:::

一个用通用词元名的典型渲染是

```text
<|bos|><|system|>You are a concise assistant.<|end|><|user|>What is the capital of France?<|end|><|assistant|>Paris.<|end|>
```

真实模板在词元字符串与细节上各不相同。OpenAI 于 2023 年发布的 ChatML 约定把每轮包裹成 `<|im_start|>role … <|im_end|>`，为若干开放权重模型家族所采用；Llama 2 的聊天模型使用 `[INST] … [/INST]` 标记加独立的系统块，后来的 Llama 版本改用头部词元；其他家族各有自己的约定。Hugging Face Transformers 这类库会把每个模型的模板连同其分词器一起存储（作为一小段 Jinja 程序），使训练与推理的渲染保持一致。

**系统提示**是由开发者或部署者放在对话之前的轮次，承载应当统辖整段对话的指令——人设、格式、约束、可用工具。模型只有在系统提示与用户请求相互作用的样例（包括二者冲突的样例）上训练过，才会学会给予它优先权。OpenAI 关于**指令层级**（instruction hierarchy，Wallace 等，2024）的工作训练模型优先服从系统指令而非冲突的用户或工具内容，这是对提示注入的一种防御（[[prompting-rag/prompt-design#sec-injection]]）。

为什么用特殊词元，而不是 `User:` 这样的普通文本？三个理由。一个保留的单独词元不可能由用户敲键盘打出来，所以轮次边界无法被普通输入伪造（前提是服务代码对用户内容中的特殊串做转义或拒绝）。它只占一个位置，而不是几个。而且模型可以为它赋予鲜明的含义——特别是，当模型输出轮次结束词元时生成停止，所以该词元在每条助手回复的末尾必须作为**训练目标**。新的特殊词元需要在嵌入矩阵和输出矩阵中新增行；它们通常像词表扩展（[[pretraining/continued-pretraining#sec-tokeniser]]）那样初始化为现有嵌入的均值。

::: warning 模板不匹配会无声地失败
用一个模板微调、却用另一个模板服务的模型通常仍会输出文本——只是质量更差：它可能无视系统提示、停不下来、续写用户的轮次，或丧失拒答能力。常见原因有：序列起始词元缺失或重复、角色头部周围空白约定不同（这会改变回复第一个词的分词）、轮次结束词元在损失中被掩掉致使模型从未学会输出它，以及用手工字符串拼接而不用模型自带模板构造提示。排查办法：分别用训练代码和服务代码渲染同一场对话，比较词元 id 而不是字符串。
:::

### 多轮对话与打包 {#sec-multiturn}

在含多条助手轮次的对话中，损失通常覆盖**每一**条助手轮次：每条都是以之前所有内容为本轮回复的条件分布，一次前向传播就能全部算出。当较早的助手轮次出自较弱模型、不值得模仿时，有的流程只训练最后一轮。工具调用与工具结果也符合同一模式：模型自己的工具调用词元是目标，工具返回的文本不是（[[agents/function-calling]]）。

指令样例相比上下文长度很短，为了效率会把若干条**打包**进同一行训练数据。打包能把有用位置的占比从大约三分之一提高到接近全部，但朴素的打包会让每条样例注意到同行中排在它前面的无关样例。干净的做法是**块对角因果掩码**——每个词元只允许注意所属样例内更早的词元——并让位置 id 对每条样例都从零重新开始。高效注意力核对这种变长批次有直接支持（[[transformers/efficient-attention]]）。

::: example SFT 的开销 {#ex-sft-cost}
一个 $70$ 亿参数的模型在平均 $1{,}000$ 词元的 $100{,}000$ 条对话上微调 $3$ 个轮次。用 $6ND$ 的训练 FLOPs 估计（[[pretraining/training-loop#prop-6nd]]），与同一模型在 $2$ 万亿词元上预训练的算力相比如何？
::: solution
$D = 10^5\cdot10^3\cdot3 = 3\times10^8$ 个处理的词元，于是 SFT 花费 $6\cdot7\times10^9\cdot3\times10^8 = 1.26\times10^{19}$ FLOPs。预训练花费 $6\cdot7\times10^9\cdot2\times10^{12} = 8.4\times10^{22}$ FLOPs。二者之比为 $1.5\times10^{-4}$：SFT 大约只用掉预训练算力的 $0.015\%$。掩码并不会降低成本，因为提示词元仍要过一遍网络。SFT 贵在数据，不在算力。
:::
:::

### 超参数及其影响 {#sec-hyper}

SFT 训练很短——通常只过数据一到几个轮次——峰值学习率比预训练学习率调度末端低约一个数量级，带预热与衰减。由于数据集小，模型可能过拟合：InstructGPT 的标注者撰写 SFT 数据训练了 $16$ 个轮次，Ouyang 等报告验证损失在一个轮次后就开始上升，而奖励模型得分与人类偏好却随更多轮次继续改善。因此在示范数据上的验证损失是 SFT 质量的糟糕指南；对你关心的行为做小型留出评估更可靠（[[evaluation/evaluation-principles]]）。

微调还会把模型从预训练状态推开，未被 SFT 数据练到的能力可能退化——**灾难性遗忘**（[[pretraining/continued-pretraining#sec-forgetting]]）。缓解办法与继续预训练相同：低学习率、少步数、混入一些通用数据，以及改动更少参数的参数高效方法（[[post-training/parameter-efficient-tuning]]）。

## SFT 做不到的事 {#sec-limits}

SFT 简单、稳定、有效，对许多用途来说甚至是一个模型得到的全部后训练。它的局限都由[[#prop-imitation]]推出。

- **它优化的是似然，不是质量。** 一条百分之九十出色、却夹着一处捏造引用的回复，其损失与完美回复几乎相同。目标函数表达不了“这个答案比那个更好”。
- **示范决定了上限。** 为难题写出一条优秀回答，比认出一条优秀回答难得多；在候选答案之间作偏好的收集，比示范更便宜也更可靠（[[post-training/reward-models]]）。
- **它会教出幻觉。** 若某条示范陈述了模型预训练中并不知道的事实，SFT 就教模型在没有知识支撑时给出自信的说法。Gekhman 等（2024）发现：引入新知识的样例比与模型已有知识一致的样例学得更慢，而一旦学会，它们会加剧模型在其他问题上产生幻觉的倾向（[[prompting-rag/hallucination]]）。
- **它从不见自己的错误。** 教师强制以示范者的前缀为条件；生成时模型以自己的、可能错误的前缀为条件（[[pretraining/pretraining-objectives#sec-teacher-forcing]]）。在模型自身样本上训练的方法——强化学习，下一章的主题——才会看到自己的错误。

## 代码实现 {#sec-code}

下面的程序用一个通用模板渲染双轮对话，用提示掩码构造下一词元标签，并在两条回复、带模拟逐词元损失的批次上比较[[#prop-weights]]中的两种平均。词元按空白切分为单词，以保持输出可读。

```python
import math, random

SPECIAL = ["<|bos|>", "<|system|>", "<|user|>", "<|assistant|>", "<|end|>"]

def render(conversation):
    """用通用聊天模板渲染 (角色, 文本) 轮次列表。
    返回词元列表及等长的损失标志列表（1 = 在该词元上训练）。"""
    tokens, train = ["<|bos|>"], [0]
    for role, text in conversation:
        tokens.append(f"<|{role}|>"); train.append(0)          # 角色头部：永远不是目标
        words = text.split()
        tokens += words
        flag = 1 if role == "assistant" else 0                 # 提示掩码
        train += [flag] * len(words)
        tokens.append("<|end|>"); train.append(flag)           # 模型必须学会停笔
    return tokens, train

conv = [("system", "You are a concise assistant."),
        ("user", "What is the capital of France?"),
        ("assistant", "Paris."),
        ("user", "And of Italy?"),
        ("assistant", "Rome, which is also its largest city.")]
tokens, train = render(conv)
# 下一词元预测的标签：位置 t 预测词元 t+1；-100 = 忽略
labels = [tokens[t + 1] if train[t + 1] else -100 for t in range(len(tokens) - 1)]
print(len(tokens), "tokens,", sum(train), "trained targets")
print(" ".join(tok if f else f"[{tok}]" for tok, f in zip(tokens, train)))

# 两条样例批次上的按词元平均与按序列平均
rng = random.Random(0)
lengths = [4, 60]                                             # 回复长度（词元）
ranges = [(2.0, 3.0), (0.5, 1.5)]                            # 短答案更难
losses = [[rng.uniform(*ab) for _ in range(n)] for n, ab in zip(lengths, ranges)]
per_token = sum(map(sum, losses)) / sum(lengths)
per_seq = sum(sum(l) / len(l) for l in losses) / len(losses)
w_tok = [n / sum(lengths) for n in lengths]
print("mean loss of each example:", [round(sum(l) / len(l), 4) for l in losses])
print(f"per-token average {per_token:.4f}, per-sequence average {per_seq:.4f}")
print("weight of each example, per-token:", [round(w, 4) for w in w_tok], " per-sequence: [0.5, 0.5]")
```

```text
33 tokens, 10 trained targets
[<|bos|>] [<|system|>] [You] [are] [a] [concise] [assistant.] [<|end|>] [<|user|>] [What] [is] [the] [capital] [of] [France?] [<|end|>] [<|assistant|>] Paris. <|end|> [<|user|>] [And] [of] [Italy?] [<|end|>] [<|assistant|>] Rome, which is also its largest city. <|end|>
mean loss of each example: [2.5705, 1.0731]
per-token average 1.1667, per-sequence average 1.8218
weight of each example, per-token: [0.0625, 0.9375]  per-sequence: [0.5, 0.5]
```

带方括号的词元只是输入，其余是目标。$33$ 个词元中有 $10$ 个参与训练：两条回复及其轮次结束词元。角色头部 `<|assistant|>` 不是目标，因为推理时它由模板补上。真实实现中 `labels` 存放词元 id，损失是在形状 $(B, T, V)$ 的 logits 上计算 `cross_entropy(logits.view(-1, V), labels.view(-1), ignore_index=-100)`。

::: history
在有监督下游任务上微调预训练语言模型可追溯到 Dai 与 Le（2015），并随 GPT（Radford 等，2018）和 BERT（Devlin 等，2019）成为标准做法。把众多任务统一成文本到文本格式是 decaNLP 竞赛（McCann 等，2018）与 T5（Raffel 等，2020）的纲领，自然语言任务指令则汇集于 Natural Instructions（Mishra 等，2022）。从指令格式的多任务训练迈向**零样本**泛化的一步由 FLAN（Wei 等，arXiv 2021，ICLR 2022）与 T0（Sanh 等，ICLR 2022）迈出，其后是 Super-NaturalInstructions（Wang 等，2022）与 Flan-T5/Flan-PaLM（Chung 等，2022）。InstructGPT（Ouyang 等，2022）把标注者撰写的示范定为 RLHF 的第一阶段。2023 年，Self-Instruct（Wang 等）与 Alpaca（Taori 等）表明模型生成的指令数据能把小开放模型变成助手，LIMA（Zhou 等）主张一千条精选样例作用巨大，OpenAssistant Conversations（Köpf 等）等开放对话数据集相继出现。带保留控制词元的对话模板随着 2022–2023 年的聊天模型成为标准。
:::

::: summary
- **监督微调**在给定提示下的回复上最小化因果损失，并使用**提示掩码**：提示词元是输入但不是目标（[[#eq-sft]]）。
- 其期望损失是示范者的熵加上到示范者的**前向 KL**，因此 SFT 至多能**模仿**示范者——错误也在所难免——并倾向于覆盖他们的全部行为（[[#prop-imitation]]）。
- 在提示词元上训练会多出一项用户建模项；掩码把梯度留给回复。按词元平均依长度加权样例，按序列平均则一视同仁（[[#prop-weights]]）。
- **FLAN** 与 **T0** 表明：在指令模板上做多任务训练，在足够规模下能零样本泛化到留出任务；Flan-T5/Flan-PaLM 把任务扩展到 $1{,}836$ 个，并需要思维链数据保住推理能力；**Self-Instruct** 与 Alpaca 使用了模型生成的数据；**LIMA** 发现 $1{,}000$ 条精选样例作用巨大，并提出了（仍是假说的）表层对齐假说。
- **对话模板**用保留的**特殊词元**标记角色与轮次结束来渲染对话；轮次结束词元必须作为目标，训练与服务端的模板必须逐词元一致。打包需要块对角掩码。
- SFT 算力便宜（约为预训练的 $\sim10^{-4}$），但受示范上限约束，对回复质量与自身错误视而不见——这些空缺由基于反馈的方法填补。
:::

## 习题

::: exercise 数目标 {level=1 check="154"}
一场对话包含 $25$ 个词元的系统轮次、$60$ 个词元的用户轮次、$70$ 个词元的助手回复、$15$ 个词元的用户轮次和 $82$ 个词元的助手回复。每轮由一个角色头部和一个轮次结束词元包裹，另有一个序列起始词元。若训练每条助手回复及其轮次结束词元，有多少词元是 SFT 目标？
::: solution
目标是 $70 + 82 = 152$ 个回复词元加 $2$ 个轮次结束词元：$154$。（序列共 $25 + 60 + 70 + 15 + 82 = 252$ 个内容词元、$10$ 个包裹词元和 $1$ 个起始词元，合计 $263$，故 $58.6\%$ 的位置是目标。）
:::
:::

::: exercise 按词元平均下的一个权重 {level=1 check="0.1"}
一个批次含 $10$ 词元和 $90$ 词元的两条回复，用按词元平均的损失[[#eq-sft]]训练。较短的回复分到批次梯度权重的多少？
::: solution
由[[#prop-weights]]，$w = 10/(10 + 90) = 0.1$。按序列平均的话它会分到 $0.5$。
:::
:::

::: exercise 手算 SFT 损失 {level=1 check="0.3405"}
一个模型给定提示及回复的先前词元，为回复的三个词元赋予概率 $0.5$、$0.8$ 和 $0.9$。以每词元纳特计，SFT 损失是多少（保留四位小数）？整条回复的概率是多少？
::: solution
$-\tfrac13(\ln0.5 + \ln0.8 + \ln0.9) = \tfrac13(0.6931 + 0.2231 + 0.1054) = 1.0217/3 = 0.3405$ 纳特每词元。回复概率为 $0.5\cdot0.8\cdot0.9 = 0.36 = e^{-1.0217}$。
:::
:::

::: exercise SFT 的算力 {level=2 check="0.0003"}
一个在 $15$ 万亿词元上预训练的 $700$ 亿参数模型，在 $100$ 万条 $1{,}500$ 词元的对话上微调 $3$ 个轮次。用 $6ND$，SFT 用掉预训练算力的多少？答案保留一位有效数字。
::: solution
SFT 处理 $10^6\cdot1500\cdot3 = 4.5\times10^9$ 个词元；由于 $N$ 相同，算力之比等于词元之比：$4.5\times10^9/1.5\times10^{13} = 3\times10^{-4}$，即 $0.0003$（$0.03\%$）。绝对算力 $6\cdot7\times10^{10}\cdot4.5\times10^9 = 1.9\times10^{21}$ FLOPs 仍大到需要集群，但与预训练相比微不足道。
:::
:::

::: exercise 带上限的混合 {level=2 check="0.1429"}
按[[#ex-mixing]]的上限混合方式，上限为 $30{,}000$，三个数据集分别有 $400{,}000$、$50{,}000$ 和 $10{,}000$ 条样例。混合中有多大比例来自最小的数据集（保留四位小数）？上限改为 $5{,}000$ 时比例各是多少？
::: solution
设上限后的规模是 $30{,}000$、$30{,}000$、$10{,}000$：最小数据集占 $10/70 = 0.1429$。上限为 $5{,}000$ 时所有数据集都触顶，混合变成均匀，各占 $1/3$——此时最小数据集的每条样例被看到的次数是最大数据集的 $40$ 倍，有在它上面过拟合的风险。
:::
:::

::: exercise 掩码与未掩码的损失 {level=2}
一个模型给 $3$ 个词元的提示赋予条件概率 $0.1$、$0.2$、$0.05$，给 $2$ 个词元的回复赋予概率 $0.6$ 和 $0.9$。计算掩码后的求和损失、未掩码的求和损失，以及 $-\log p_\theta(\mathbf{x}, \mathbf{y})$，验证[[#prop-unmasked]]。未掩码损失的梯度由哪一项主导？为什么这不理想？
::: solution
掩码：$-(\ln0.6 + \ln0.9) = 0.5108 + 0.1054 = 0.6162$。提示部分：$-(\ln0.1 + \ln0.2 + \ln0.05) = 2.3026 + 1.6094 + 2.9957 = 6.9078$。未掩码：$6.9078 + 0.6162 = 7.5240 = -\ln(0.1\cdot0.2\cdot0.05\cdot0.6\cdot0.9) = -\ln(5.4\times10^{-4})$，正是 $-\log p_\theta(\mathbf{x}, \mathbf{y})$。提示项大了十倍以上，因为用户的提示难以预测；它的梯度主要在教模型预测用户会打什么字，而这是助手永远不需要做的事。
:::
:::

::: exercise 诊断模板故障 {level=2}
微调后，一个模型答得不错却从不停止：它写完答案后，又凭空写出一轮新的 `<|user|>`、替用户编出下一个问题，无限续写。给出训练流程中的两个可能原因和服务端的一个原因，并说明各如何检验。
::: solution
训练方面：（1）助手回复后的轮次结束词元被掩出了损失（例如把所有特殊词元都掩掉），模型从未学会输出它——打印某条样例的标签掩码来检验；（2）打包时没有块对角掩码，或样例之间没有结束词元，模型于是学到“回复后面还跟着更多对话”——检查一行打包数据。服务端：停止条件里没有包含轮次结束词元的 id（例如它在等通用的序列结束词元；或模板的结束词元因为是以文本而非特殊词元加入的，被分词成了多个普通词元）——把渲染出的提示与模型输出的词元 id 和词表的特殊词元 id 相对照。
:::
:::

::: exercise 模仿示范者的混合 {level=3 check="0.6109"}
对某个提示，$70\%$ 的示范者写短答案 $A$，$30\%$ 写长答案 $B$（各视为单个结果）。(a) 什么分布最小化期望 SFT 损失？最小期望损失是多少纳特（保留四位小数）？(b) 设模型被限制在族 $q_\lambda = (\lambda, 1-\lambda)$、$\lambda\in[0.9, 1]$ 中，例如因为预训练带来的强先验。哪个 $\lambda$ 最小化前向 KL？这个答案说明了什么？
::: solution
(a) 由[[#prop-imitation]]，最小点是 $q = (0.7, 0.3)$，最小值是熵 $-(0.7\ln0.7 + 0.3\ln0.3) = 0.2497 + 0.3612 = 0.6109$ 纳特。(b) 期望损失 $-0.7\ln\lambda - 0.3\ln(1-\lambda)$ 的导数为 $-0.7/\lambda + 0.3/(1-\lambda)$，在 $\lambda > 0.7$ 时为正，所以在 $[0.9, 1]$ 上损失递增，最小值在边界 $\lambda = 0.9$——允许范围内离示范者混合最近的一点。$\lambda = 1$ 处损失为无穷：前向 KL 拒绝给示范者的任何行为零概率。即使答案 $A$ 更好，SFT 也不会选它而舍弃混合；那需要关于质量的信号。
:::
:::

::: exercise 用块对角掩码实现打包 {level=3}
用纯 Python 编写函数 `pack(examples, max_len)`：把（词元，标志）样例贪心地打包进至多 `max_len` 词元的行，并为每个词元记录一个段 id；以及 `mask(segments)`：返回同时阻断跨样例注意力的因果掩码。在 `max_len = 12` 上对三条短样例运行，并说出还必须对什么按样例重新开始。
::: solution
```python
def pack(examples, max_len):
    """examples: (词元, 训练标志) 列表。贪心打包成长度 <= max_len 的行。
    返回由 (词元, 标志, 段 id) 组成的行。"""
    rows, cur = [], ([], [], [])
    for seg, (toks, flags) in enumerate(examples):
        if len(cur[0]) + len(toks) > max_len and cur[0]:
            rows.append(cur); cur = ([], [], [])
        cur[0].extend(toks); cur[1].extend(flags); cur[2].extend([seg] * len(toks))
    if cur[0]:
        rows.append(cur)
    return rows

def mask(segments):
    """同时阻断跨样例注意力的因果掩码：M[i][j] = 1 表示 i 可以注意 j。"""
    T = len(segments)
    return [[1 if j <= i and segments[i] == segments[j] else 0 for j in range(T)] for i in range(T)]

ex = [(["<u>", "hi", "<a>", "hello", "<e>"], [0, 0, 0, 1, 1]),
      (["<u>", "2+2?", "<a>", "4", "<e>"], [0, 0, 0, 1, 1]),
      (["<u>", "name", "a", "colour", "<a>", "red", "<e>"], [0, 0, 0, 0, 0, 1, 1])]
for toks, flags, segs in pack(ex, 12):
    print(toks); print("flags", flags, " segments", segs)
    for row in mask(segs):
        print("".join(map(str, row)))
```

```text
['<u>', 'hi', '<a>', 'hello', '<e>', '<u>', '2+2?', '<a>', '4', '<e>']
flags [0, 0, 0, 1, 1, 0, 0, 0, 1, 1]  segments [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
1000000000
1100000000
1110000000
1111000000
1111100000
0000010000
0000011000
0000011100
0000011110
0000011111
['<u>', 'name', 'a', 'colour', '<a>', 'red', '<e>']
flags [0, 0, 0, 0, 0, 1, 1]  segments [2, 2, 2, 2, 2, 2, 2]
1000000
1100000
1110000
1111000
1111100
1111110
1111111
```

前两条样例共用一行；掩码是块对角的，每条各有一个下三角块。第三条放不下，另起一行（该行会被补齐到批次长度，填充位置从损失中掩掉）。位置 id 也必须对每个段从 $0$ 重新开始，使第二条样例的编码与它单独成行时完全一致；并且一条样例最后一个词元的标签不能是下一条样例的第一个词元——这里的标志已经把下一条样例的第一个词元（用户头部）排除在损失之外。
:::
:::

::: exercise SFT 期间的遗忘 {level=3}
一个团队在 $50{,}000$ 条客服对话上微调模型，发现其数学基准得分从 $52\%$ 跌到 $41\%$。提出三项应能缓解跌落的 SFT 改动，结合[[pretraining/continued-pretraining#sec-forgetting]]解释各自的机理，并说明如何检查客服质量没有牺牲。
::: solution
(1) **混入通用数据**，包括带完整解答的数学，占批次的百分之几到几十（重放）：损失便会对偏离数学行为施加惩罚。(2) **缩小更新幅度**：更低的学习率、更少的轮次，或对初始权重更强的拉近；遗忘随模型在旧任务关键方向上移动的距离增长，继续预训练一章中考虑曲率的加权分析把这一点说得很清楚。(3) **少改参数**：低秩适配（[[post-training/parameter-efficient-tuning]])把更新限制在一个小子空间内，Biderman 等（2024）报告 LoRA 比全量微调遗忘更少（尽管学得的也更少）。要检验权衡，留出一组客服对话，对每个变体同时评估客服任务与数学基准，最好用多个种子，并在两个得分的前沿上选择变体，而不是按验证损失选择。
:::
:::
