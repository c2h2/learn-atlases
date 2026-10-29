本课程的先前章节逐一讨论了预训练运行的各项选择：目标、数据、配比、训练循环。**模型家族**是一支团队把所有这些选择一起做出来、再把成果放大规模所得到的东西：BERT、T5、GPT 系列、LLaMA，以及其后众多开放权重的家族。研究家族有两个用处。其一，它展示了哪些选择的组合行得通、又是如何收敛的——今天的解码器彼此之间的差异，远小于当年 BERT 与 GPT 的差异。其二，它磨炼阅读技术报告的技能：把写明的与暗含的分开，并留意没有写出的部分。

本章沿[[transformers/architecture-families]]的三条架构谱系——编码器、编码器-解码器与解码器——追溯其记录最完备的成员，日期、规模与词元数一律按发表所述。我们将数一数代表性配置的参数量，跟踪从计算最优到大幅**过训练**模型的转向，讨论混合专家家族，并界定模型发布的**开放程度**。本章只写发表过的东西；开发者未披露的细节，本章也不写。事实以 2026 年为准，家族列表是示例而非完备。

## 什么定义了一个家族 {#sec-defining}

::: definition 模型家族 {#def-family}
**模型家族**是一位开发者（或合作团队）发布的一组模型，它们共享一个架构与训练配方，主要差别在规模——参数量$N$、训练词元数$D$，有时还有上下文长度——通常由一份技术报告或模型卡描述。其**设计选择**包括：架构（编码器、解码器或编码器-解码器，[[transformers/architecture-families]]）、块细节（归一化、激活、位置编码、注意力变体）、分词器与词表、预训练目标、数据及其配比、词元预算、以及发布条款。
:::

下面的谱系图概括了哪些设计建造在哪些之上。这是一种简化：这个领域的影响流向多方，每个家族都借鉴了多个前辈。

::: widget graph
nodes: Transformer@0,2; GPT@1,3; BERT@1,1; GPT2@2,3; RoBERTa@2,0.5; ELECTRA@3,0.5; T5@2,2; BART@2,1.5; GPT3@3,3; LLaMA@4,3; Mistral@5,3.6; DeepSeek@5,2.4
edges: Transformer>GPT; Transformer>BERT; Transformer>T5; Transformer>BART; GPT>GPT2; GPT2>GPT3; GPT3>LLaMA; BERT>RoBERTa; RoBERTa>ELECTRA; BERT>T5; BERT>BART; LLaMA>Mistral; LLaMA>DeepSeek
algorithm: topo
caption: 预训练模型家族的简化谱系：箭头表示“直接建立在其设计或目标之上”。编码器（BERT、RoBERTa、ELECTRA）在下方，编码器-解码器（T5、BART）在中间，解码器（GPT 系列、LLaMA 及采用其设计的家族）在上方。逐步播放拓扑排序，可以看到每个家族都排在其所借鉴的一切之后。
:::

## 编码器 {#sec-encoders}

**BERT**（Devlin 等，2018 年 10 月发布，发表于 NAACL 2019）定义了编码器家族：一个双向 Transformer，用掩码语言建模（[[pretraining/pretraining-objectives#def-mlm]]）与下一句预测在 BooksCorpus（$8$亿词）与英文维基百科（$25$亿词）上预训练，分两种规模——Base（$1.1$亿参数、$12$层、$d = 768$）与 Large（$3.4$亿、$24$层、$d = 1024$）——词表为$30{,}000$词元的 WordPiece。接上小的任务头微调后，它在当时多数语言理解基准上创下最好成绩。

其后继者改的是配方而不是架构。**RoBERTa**（Liu 等，2019）去掉下一句预测，改用动态掩码，用大得多的批次与$160$ GB 文本，证明 BERT 训练严重不足。**ALBERT**（Lan 等，2019）跨层共享参数、把嵌入矩阵分解以减少参数。**ELECTRA**（Clark 等，2020）用替换词元检测取代掩码，使每个位置都成为目标。**DeBERTa**（He 等，2021）在注意力中分离内容与位置。**XLM-R**（Conneau 等，2020）在$100$种语言的$2.5$ TB 过滤后 Common Crawl 文本上训练了多语言编码器。**ModernBERT**（Warner 等，2024 年 12 月）用解码器的技术让编码器焕然一新——旋转位置、门控激活、$8192$词元上下文——以及$2$万亿训练词元。编码器在分类、检索与嵌入（[[prompting-rag/text-embeddings]]）中仍被广泛使用，其双向性与小巧在这些场景是优势。

## 编码器-解码器 {#sec-encdec}

**T5**（Raffel 等，2019 年 10 月发布，JMLR 2020）把所有任务都表述为文本到文本，在 C4（[[pretraining/training-data#sec-datasets]]）上用片段损坏（[[pretraining/pretraining-objectives#def-span-corruption]]）预训练，规模从$6000$万到$110$亿参数；其论文对目标、架构与数据的系统比较至今仍是参考。**mT5**（Xue 等，2021）把它扩展到$101$种语言。**BART**（Lewis 等，2020）用去噪（[[pretraining/pretraining-objectives#def-denoising]]）预训练一个编码器-解码器。**UL2**（Tay 等，2023）用去噪器混合训练了一个$200$亿参数的编码器-解码器，**Flan-T5**（Chung 等，2022）则展示了指令微调能在多大程度上提升这类模型（[[post-training/instruction-tuning]]）。编码器-解码器在语音识别与翻译中仍是标准选择，但通用语言模型已收敛到解码器，原因见[[transformers/architecture-families#sec-which]]。

## 解码器：从 GPT 到过训练模型 {#sec-decoders}

**GPT 系列**。OpenAI 的 **GPT**（Radford 等，2018 年 6 月）在 BooksCorpus 上预训练了一个$1.17$亿参数的解码器，再逐任务微调。**GPT-2**（2019 年 2 月）扩大到$15$亿参数，在 WebText（约$800$万个 Reddit 链接页面、$40$ GB 文本）上训练，展示了零样本任务能力；出于滥用顾虑，完整模型分阶段发布，2019 年 11 月完成。**GPT-3**（Brown 等，2020 年 5 月）有$1750$亿参数——$96$层、$d = 12{,}288$、$96$头、$2048$词元上下文——在$3000$亿词元上训练（[[pretraining/data-mixtures#ex-gpt3]]），演示了从少量样例出发的上下文学习（[[prompting-rag/in-context-learning]]）。**GPT-4** 技术报告（2023 年 3 月）声明其中不含架构（包括模型规模）、硬件、训练算力、数据构造或训练方法的任何细节，理由是竞争态势与安全；其后继者主要通过系统卡与评测来了解。

**2021–2022 年的大稠密解码器**。**Gopher**（Rae 等，2021 年 12 月；DeepMind）在 MassiveText 的$3000$亿词元上训练了$2800$亿参数。**Chinchilla**（Hoffmann 等，2022 年 3 月）用与 Gopher 相同的算力在$1.4$万亿词元上训练了$700$亿参数并将其击败，确立了约每参数$20$词元的计算最优比例（[[scaling/compute-optimal-training]]）。**PaLM**（Chowdhery 等，2022 年 4 月；Google）在$6144$块 TPU v4 上用$7800$亿词元训练了$5400$亿参数。**OPT**（Zhang 等，2022 年 5 月；Meta）连同其日志向研究者发布了$1750$亿参数的模型，**BLOOM**（BigScience，2022 年 7 月）由上千名研究者组成的开放协作在$46$种自然语言与$13$种编程语言上训练了$1760$亿参数的多语言模型，**GLM-130B**（Zeng 等，2022；清华大学）则是一个中英双语模型。

**LLaMA 与开放权重浪潮**。**LLaMA**（Touvron 等，2023 年 2 月；Meta）在$1.0$到$1.4$万亿词元的公开可得数据上训练了$70$亿到$650$亿参数的模型，有意使用远超出计算最优建议的每参数词元数，使较小的模型运行起来便宜；其权重向研究者发布后不久便广泛流传。**Llama 2**（2023 年 7 月）在$2$万亿词元上训练了$70$亿、$130$亿与$700$亿参数的模型，上下文$4096$词元，许可证允许有条件的商业使用。**Llama 3**（2024 年 4 月）与**Llama 3.1**（2024 年 7 月）使用$128{,}256$词元的词表、超过$15$万亿训练词元与最大$4050$亿参数的规模，上下文$128$K 词元。同一时期出现了许多其他开发者的家族，其中有：**Mistral 7B**（Mistral AI，2023 年 10 月，以 Apache 2.0 许可证发布，采用分组查询与滑动窗口注意力）、**Falcon**（技术创新研究院，2023，主要在 RefinedWeb 上训练，最大$1800$亿参数）、**Qwen**（阿里巴巴，自 2023；2024 年的 Qwen2.5 报告描述了$18$万亿预训练词元）、**DeepSeek**（自 2023）、**Gemma**（Google，自 2024 年 2 月）、小型 **phi** 模型（Microsoft，自 2023）与 **Yi**（零一万物，2023）。完全开放的研究家族——**Pythia**（EleutherAI，2023）与 **OLMo**（艾伦人工智能研究院，自 2024 年 2 月）——除权重外还发布了数据、代码与中间检查点。

**闭源家族**。若干使用最广的模型家族——例如 OpenAI 的 GPT-4 及以后的模型、Anthropic 的 Claude，以及 Google DeepMind 的 Gemini（其首份报告（2023 年 12 月）称其为原生多模态）——通过产品与 API 提供，其技术报告与模型卡描述能力、评测与安全措施，但一般不包含参数量、数据或训练细节。并非出自其开发者的、关于这些模型内部的说法都是猜测，本书不复述。

### 解码器设计的收敛 {#sec-convergence}

到 2024 年，多数开放解码器家族共用一个公共块，有时被称为“LLaMA 风格”：

| 选择 | GPT-3（2020） | 典型开放解码器（2023–2025） | 章节 |
|---|---|---|---|
| 归一化 | 前 LayerNorm | 前 RMSNorm | [[transformers/transformer-block#def-rmsnorm]] |
| 前馈 | GELU，$4d$ | SwiGLU，$\approx\frac83d$ 或更大 | [[transformers/transformer-block#def-swiglu]] |
| 位置 | 学习的绝对位置 | RoPE | [[transformers/positional-encoding#def-rope]] |
| 注意力 | 多头（交替稀疏） | 分组查询 | [[transformers/efficient-attention#def-gqa]] |
| 偏置 | 有 | 无 | |
| 词表 | $50{,}257$ | $32$K 到 $256$K | [[text-and-language/tokenisation]] |
| 稳定性附加 | — | 部分用 QK 归一化、z 损失 | [[pretraining/training-stability]] |

家族之间的差异如今更少在块本身，而在数据、词元预算、分词器、后训练，以及——对最大的模型——前馈层是否为混合专家。

::: example 数一数 Llama 3 8B 的参数量 {#ex-llama3}
Llama 3 8B 有$32$层、$d = 4096$、$32$个维度为$128$的查询头配$8$个键值头（分组查询注意力）、$d_{\text{ff}} = 14{,}336$的 SwiGLU 网络、$128{,}256$词元的词表、RMSNorm 增益、无偏置、输入输出嵌入不共享。数一数它的参数量。
::: solution
每层的注意力：$W_Q$与$W_O$各为$4096\times4096$（各$16{,}777{,}216$）；$W_K$与$W_V$把$4096$映到$8\cdot128 = 1024$（各$4{,}194{,}304$）；合计$41{,}943{,}040$。前馈：$3\cdot4096\cdot14{,}336 = 176{,}160{,}768$。归一化：$2\cdot4096 = 8192$。每层$218{,}112{,}000$；$32$层共$6{,}979{,}584{,}000$。嵌入：$2\cdot128{,}256\cdot4096 = 1{,}050{,}673{,}152$。末尾归一化：$4096$。总计$8{,}030{,}261{,}248$——即发表的$80.3$亿。与 LLaMA-7B（[[transformers/transformer-block#ex-llama]]）相比，更大的词表增加$7.9$亿参数（模型的八分之一），分组查询注意力省下$2\cdot32\cdot(4096^2 - 4096\cdot1024) = 8.1$亿，这笔钱花在了更宽的前馈网络上。
:::
:::

### 词元预算：从计算最优到过训练 {#sec-over-training}

::: definition 每参数词元数 {#def-tokens-per-param}
模型的**每参数词元数**比为$D/N$。由训练算力$C\approx6ND$（[[pretraining/training-loop#prop-6nd]]），Hoffmann 等（2022）的计算最优分析给出$D/N\approx20$；以远大于此的比值训练的模型称为**过训练**（相对于计算最优而言，不是过拟合意义上的）。
:::

::: proposition 固定算力下的规模与词元数 {#prop-fixed-compute}
对训练预算$C = 6ND$与选定的比值$r = D/N$，模型规模与词元数为

$$
N = \sqrt{\frac{C}{6r}},\qquad D = \sqrt{\frac{Cr}{6}}。
$$

固定算力下把比值乘以因子$k$，$N$除以$\sqrt k$，$D$乘以$\sqrt k$。
:::

::: proof
把$D = rN$代入$C = 6ND$得$C = 6rN^2$，于是$N = \sqrt{C/(6r)}$，且$D = rN = \sqrt{r^2C/(6r)} = \sqrt{Cr/6}$。把$r$换成$kr$，$N$乘以$1/\sqrt k$，$D$乘以$\sqrt k$。
:::

::: example Gopher 与 Chinchilla {#ex-chinchilla}
Gopher 有$2800$亿参数、$3000$亿训练词元；Chinchilla 为$700$亿与$1.4$万亿。比较二者的训练算力与每参数词元数，并用[[#prop-fixed-compute]]求：以 Gopher 的算力、按 Chinchilla 的比值训练，模型该多大。
::: solution
Gopher：$6\cdot2.8\times10^{11}\cdot3\times10^{11} = 5.0\times10^{23}$ FLOPs，比值$1.07$。Chinchilla：$6\cdot7\times10^{10}\cdot1.4\times10^{12} = 5.9\times10^{23}$ FLOPs，比值$20$。取$C = 5.0\times10^{23}$、$r = 20$，$N = \sqrt{5.0\times10^{23}/120} = 6.5\times10^{10}$——约是 Chinchilla 的规模。在大致相同的算力下，那个小四倍、词元几乎多五倍的模型在 Hoffmann 等报告的几乎所有评测上都更好；这一结果改变了其后每个家族选择词元预算的方式。
:::
:::

计算最优针对给定**训练**预算最小化损失。但一个部署模型的终身成本包含**推理**——每个生成词元约$2N$ FLOPs——若模型服务大量用户，推理可能远超训练。更小的模型配更多词元，以更多训练算力、更少推理算力达到给定损失（Sardana 等，2024 使这一权衡明确化）。这解释了比值的走向：

::: widget plot
f: 1.301 + 0*x
x: 2019.5, 2025
y: -0.5, 4
points: 2020.4,0.234; 2021.9,0.030; 2022.2,1.301; 2022.3,0.159; 2023.1,1.333; 2023.15,2.171; 2023.5,1.456; 2023.55,2.472; 2024.3,3.272; 2024.55,1.586; 2024.7,3.374
labels: compute-optimal $D/N\approx20$ ($\log_{10} = 1.30$)
caption: 已发表模型的每参数词元数取$\log_{10}$，横轴为发布日期：GPT-3 175B（$1.7$）、Gopher（$1.1$）、Chinchilla（$20$）、PaLM 540B（$1.4$）、LLaMA-65B（$22$）与 LLaMA-7B（$148$）、Llama 2 70B（$29$）与 7B（$297$）、Llama 3 8B（约$1900$）、Llama 3.1 405B（$39$）与 Qwen2.5-7B（约$2400$，按报告的$18$万亿词元计）。直线标出计算最优比值。2022 年之后，大型旗舰模型移到大致计算最优的比值附近，而小型模型则远远越过它。
:::

::: example 小模型有多过训练？ {#ex-over-training}
Llama 3 8B 在约$15$万亿词元上训练。计算它的每参数词元数与训练算力。同样算力下，计算最优模型应有多少词元、多大规模？
::: solution
$D/N = 1.5\times10^{13}/8.03\times10^9 = 1868$，约为计算最优值$20$的$93$倍。算力：$6\cdot8.03\times10^9\cdot1.5\times10^{13} = 7.2\times10^{23}$ FLOPs。一个$D = 20N$、算力同为$C = 6ND = 120N^2$的计算最优模型有$N = \sqrt{7.2\times10^{23}/120} = 7.8\times10^{10}$个参数与$D = 1.55\times10^{12}$个词元：大致是一个在$1.6$万亿词元上训练的$780$亿参数模型。它的训练算力相同、损失会更低，但每个生成词元的推理成本约高十倍。
:::
:::

## 混合专家家族 {#sec-moe}

**混合专家**（MoE）模型把每个前馈网络换成若干专家与一个把每个词元送往其中少数专家的路由器（[[transformers/mixture-of-experts#def-moe]]），于是参数量$N_{\text{total}}$增长，而每词元的算力取决于**激活**参数$N_{\text{active}}$。训练算力因此约为$6N_{\text{active}}D$。

已发表的 MoE 语言模型包括 Google 的 GShard（Lepikhin 等，2020）与 Switch Transformer（Fedus 等，2021）、**Mixtral 8x7B**（Mistral AI，2023 年 12 月；共$467$亿、激活$129$亿参数，每词元取八个专家中的两个）、**DeepSeek-V2**（2024 年 5 月；共$2360$亿、激活$210$亿、$8.1$万亿词元，并用多头潜在注意力缩减键值缓存）与**DeepSeek-V3**（2024 年 12 月；共$6710$亿、激活$370$亿、$14.8$万亿词元、FP8 训练，[[pretraining/training-stability#sec-formats]]），以及 2024 年起 Qwen、Llama 等家族的 MoE 成员。

::: example DeepSeek-V3 的算力 {#ex-deepseek}
DeepSeek-V3 有$370$亿激活参数，在$14.8$万亿词元上预训练；其报告给出预训练$266.4$万 GPU 小时。估计训练 FLOPs 与每 GPU 达到的平均模型 FLOP/s。一个$6710$亿参数的稠密模型与之相比如何？
::: solution
$C\approx6\cdot3.7\times10^{10}\cdot1.48\times10^{13} = 3.29\times10^{24}$ FLOPs（忽略注意力与多词元预测模块）。每 GPU：$3.29\times10^{24}/(2.664\times10^6\cdot3600\text{ s}) = 3.4\times10^{14}$ FLOP/s，平均$340$ TFLOP/s。一个$6710$亿参数的稠密模型在同样词元上需要$6\cdot6.71\times10^{11}\cdot1.48\times10^{13} = 6.0\times10^{25}$ FLOPs，是它的$18$倍。MoE 模型用更多的显存与通信为代价，不必付出全部算力就买到参数（以及随之而来的知识容量）（[[transformers/mixture-of-experts#sec-systems]]）。
:::
:::

## 开放程度 {#sec-openness}

“开放”一词被用于大不相同的发布。

::: definition 发布类别 {#def-openness}
- **闭源**（API 或产品访问）：用户可以查询模型，但得不到权重。
- **开放权重**：训练好的权重可以下载，许可证可能宽松（例如 Apache 2.0 或 MIT），也可能对用途、用户或规模附加条件；训练数据与代码可以不开源。
- **完全开放**（有时称“开源”）：权重、训练代码与数据（或一套能完整重建数据的配方），常附中间检查点与评测代码。开放源代码促进会的《开源 AI 定义》（Open Source AI Definition，1.0 版，2024 年 10 月）要求，除其他事项外，提供足够详细的训练数据信息，使具备技能的人能够构建实质等价的系统。
:::

各有各的成本与好处，而且各方都是真诚地为之辩护。开放权重让研究者能研究模型、让组织能在私有环境中运行并改造模型（[[pretraining/continued-pretraining]]），并把能力扩散到少数公司之外；它同时使安全措施可被移除、发布不可撤销。闭源发布保持对使用的控制，允许更新与监测，但把能力集中起来，也让独立审查更难。完全开放的发布成就最多的科学（数据研究、污染检查、训练动力学研究），但代价高昂，并带来自身的数据许可问题（[[pretraining/training-data#sec-rights]]）。许可证也会变：多个家族在不同版本之间更改过许可条款，因此某个具体发布的条款应当到源头去读。更宽泛的争论属于[[llm-society]]与[[safety-alignment]]。

::: warning 读报告，别读标题
单凭模型名字和参数量说明不了什么。两个“7B”模型可能训练词元相差十倍、分词器不同（因此损失不可比）、上下文长度不同、后训练也不同。报告中的基准表使用不同的提示、示例数与评分约定（[[pretraining/in-training-evaluation#def-mc-scoring]]），去污染的方式也未必相同。比较家族之前，为每个家族找出：$N$（总量与激活量）、$D$、数据来源、分词器、上下文长度、评测协议——并记下其中哪些是开发者没有披露的。
:::

## 用代码数配置 {#sec-code}

下面的清单从配置数出参数量，处理 GELU 或 SwiGLU 前馈网络、LayerNorm 或 RMSNorm、偏置、分组查询注意力、嵌入共享与否，并把它用于四个已发表配置。

```python
def count(cfg):
    d, L, V, f = cfg["d"], cfg["layers"], cfg["vocab"], cfg["ffn"]
    h, kv = cfg["heads"], cfg.get("kv_heads", cfg["heads"])
    dk = d // h
    attn = d * d + 2 * d * kv * dk + d * d                  # W_Q、W_K、W_V（分组）、W_O
    ffn = (3 if cfg["glu"] else 2) * d * f                   # SwiGLU 有三个矩阵
    norms = (2 if cfg["rms"] else 4) * d                     # RMSNorm：只有增益；LayerNorm：增益 + 偏置
    bias = 0
    if cfg.get("bias"):
        bias = d + 2 * kv * dk + d + f * (2 if cfg["glu"] else 1) + d
    block = attn + ffn + norms + bias
    emb = V * d * (1 if cfg["tied"] else 2) + cfg.get("positions", 0) * d
    final = (1 if cfg["rms"] else 2) * d
    return L * block + emb + final, L * ffn, emb

models = {
    "GPT-3 175B": dict(d=12288, layers=96, vocab=50257, ffn=4 * 12288, heads=96, glu=False,
                       rms=False, bias=True, tied=True, positions=2048),
    "LLaMA-7B": dict(d=4096, layers=32, vocab=32000, ffn=11008, heads=32, glu=True, rms=True, tied=False),
    "Mistral 7B": dict(d=4096, layers=32, vocab=32000, ffn=14336, heads=32, kv_heads=8, glu=True,
                       rms=True, tied=False),
    "Llama 3 8B": dict(d=4096, layers=32, vocab=128256, ffn=14336, heads=32, kv_heads=8, glu=True,
                       rms=True, tied=False),
}
print(f"{'model':12s} {'parameters':>16s} {'FFN share':>10s} {'embeddings':>12s}")
for name, cfg in models.items():
    total, ffn, emb = count(cfg)
    print(f"{name:12s} {total:16,d} {ffn / total:10.1%} {emb / total:12.1%}")
```

```text
model              parameters  FFN share   embeddings
GPT-3 175B    174,604,259,328      66.4%         0.4%
LLaMA-7B        6,738,415,616      64.2%         3.9%
Mistral 7B      7,241,732,096      77.8%         3.6%
Llama 3 8B      8,030,261,248      70.2%        13.1%
```

计数与发表数字吻合：GPT-3 的$1750$亿、LLaMA-7B 的$67.4$亿、Mistral 7B 的$72.4$亿、Llama 3 8B 的$80.3$亿。分组查询注意力把参数从注意力挪往前馈网络，而大词表让嵌入在小型模型中占了可观的份额——$1750$亿参数的模型上可忽略不计，$80$亿参数的模型上却有八分之一。

::: quiz
关于模型家族，哪些说法有其已发表报告的支持？（多选。）
- [x] LLaMA 较小的模型以远高于计算最优比值的每参数词元数训练。
- [x] BERT 用掩码语言建模与下一句预测预训练。
- [ ] GPT-4 技术报告给出了参数量。
- [x] Mixtral 8x7B 的激活参数少于总参数。
::: solution
LLaMA-7B 每参数约$148$词元，而计算最优约为$20$。BERT 两个目标都用；RoBERTa 后来去掉了下一句预测。GPT-4 报告明确略去模型规模。Mixtral 把每个词元路由到八个专家中的两个，所以每个词元激活$467$亿参数中的约$129$亿。
:::
:::

::: history
谱系始于 2018 年：GPT（6 月）与 BERT（10 月）把 2017 年的 Transformer 拆成一个解码器和一个编码器。2019 年有 GPT-2（2 月）、RoBERTa、XLNet、ALBERT、T5（10 月）与 BART；2020 年有 ELECTRA、GPT-3（5 月）与最早的大规模混合专家语言模型（GShard）。2021–2022 年出现了最大的稠密解码器——Gopher、PaLM——以及 Chinchilla 的计算最优修正（2022 年 3 月），OPT、BLOOM 与 GLM-130B 则开放发布了大模型。GPT-4 报告（2023 年 3 月）标志最强闭源模型转向不披露；而 LLaMA（2023 年 2 月）开启了开放权重家族的浪潮：2023–2024 年的 Llama 2、Mistral 与 Mixtral、Falcon、Qwen、Yi、DeepSeek 与 Gemma，以及完全开放的 Pythia 和 OLMo。DeepSeek-V3（2024 年 12 月）展示了一个以不多的报告成本训练的大型混合专家模型，ModernBERT（2024 年 12 月）则让编码器重获新生。
:::

::: summary
- **模型家族**是一套配方放大到各种规模：架构、块、分词器、目标、数据、词元预算与发布条款。
- **编码器**（BERT 2018、RoBERTa、ELECTRA、DeBERTa、XLM-R、ModernBERT）仍是分类与嵌入的工具；**编码器-解码器**（T5、BART、UL2、Flan-T5）用于文本到文本任务、语音与翻译；**解码器**（GPT 系列、LLaMA 及其后继者）用于通用语言模型。
- 开放解码器收敛到一个公共块——前 RMSNorm、SwiGLU、RoPE、无偏置、分组查询注意力——差异主要在数据、词元、分词器与后训练。
- 每参数词元数从约$2$（GPT-3）升到$20$（Chinchilla），再到现代小模型的远超$1000$，因为小模型过训练能降低推理成本。
- **混合专家**家族（Switch、Mixtral、DeepSeek-V2/V3）把总参数与激活参数分开；训练算力约为$6N_{\text{active}}D$。
- 发布方式从**闭源**到**开放权重**再到**完全开放**；依据报告比较家族，并留意未披露之处。
:::

## 习题

::: exercise 每参数词元数 {level=1 check="20"}
Chinchilla 有$700$亿参数，在$1.4$万亿词元上训练。它的每参数词元数是多少？
::: solution
$1.4\times10^{12}/7\times10^{10} = 20$。
:::
:::

::: exercise GPT-3 的算力 {level=1 check="3.15e23"}
用$C = 6ND$、$N = 1.75\times10^{11}$、$D = 3\times10^{11}$估计 GPT-3 的训练算力。
::: solution
$6\cdot1.75\times10^{11}\cdot3\times10^{11} = 3.15\times10^{23}$ FLOPs，即通常引用的 GPT-3 数字。
:::
:::

::: exercise 激活参数 {level=1 check="0.276"}
Mixtral 8x7B 共$467$亿参数、激活$129$亿，每个词元激活的比例是多少？保留三位小数。
::: solution
$12.9/46.7 = 0.276$，略超过四分之一。比例大于$2/8$，因为注意力、嵌入与归一化由所有词元共享。
:::
:::

::: exercise 嵌入份额 {level=2 check="0.131"}
Llama 3 8B 的$8{,}030{,}261{,}248$个参数中，（不共享的）输入输出嵌入占多大比例？词表$128{,}256$、$d = 4096$。保留三位小数。
::: solution
$2\cdot128{,}256\cdot4096 = 1{,}050{,}673{,}152$；除以总数得$0.131$。
:::
:::

::: exercise 分组查询的节省 {level=2}
对$d = 8192$、$64$个维度为$128$的查询头的一层，分别计算完整多头注意力与$8$个键值头时的注意力参数量，并计算$80$层的节省。
::: solution
多头：每层$4d^2 = 4\cdot8192^2 = 268{,}435{,}456$。分组查询（$8$个 KV 头）：$W_Q$与$W_O$为$2d^2 = 134{,}217{,}728$；$W_K$与$W_V$为$2\cdot8192\cdot1024 = 16{,}777{,}216$；合计$150{,}994{,}944$。每层节省$117{,}440{,}512$；$80$层共$94$亿参数。（这些正是 Llama 2 与 3 的$700$亿参数模型的维度。）分组查询注意力更大的效应在推理：它把键值缓存缩小$8$倍（[[transformers/efficient-attention#sec-gqa]]）。
:::
:::

::: exercise 一个计算最优的替代者 {level=2 check="1.55e12"}
仿照[[#ex-over-training]]：一个训练算力与 Llama 3 8B 相同（$7.2\times10^{23}$ FLOPs）的计算最优模型（$D = 20N$）会用多少训练词元？保留三位有效数字。
::: solution
$C = 6ND = 6\cdot(D/20)\cdot D = 0.3D^2$，故$D = \sqrt{7.2\times10^{23}/0.3} = \sqrt{2.4\times10^{24}} = 1.55\times10^{12}$词元，此时$N = 7.75\times10^{10}$个参数。
:::
:::

::: exercise 终身算力 {level=2}
一个团队将在模型终身服务$10^{13}$个生成词元（忽略提示处理）。比较下列两者的总算力：(a) 在$1.4$万亿词元上训练的$700$亿参数模型；(b) 在$15$万亿词元上训练的$80$亿参数模型。训练用$6ND$，推理每生成词元$2N$。哪个终身更便宜？这个比较遗漏了什么？
::: solution
(a) 训练$6\cdot7\times10^{10}\cdot1.4\times10^{12} = 5.9\times10^{23}$；推理$2\cdot7\times10^{10}\cdot10^{13} = 1.4\times10^{24}$；合计$2.0\times10^{24}$ FLOPs。(b) 训练$6\cdot8\times10^9\cdot1.5\times10^{13} = 7.2\times10^{23}$；推理$2\cdot8\times10^9\cdot10^{13} = 1.6\times10^{23}$；合计$8.8\times10^{23}$。小的过训练模型终身的成本不到大模型的一半。这个比较遗漏了质量——两个模型未必达到相同的损失或能力，较大的模型很可能更好——也遗漏了推理受显存带宽限制、其成本取决于批处理与硬件（[[inference/latency-cost]]）这两点。
:::
:::

::: exercise 阅读模型卡 {level=3}
给定两张模型卡。模型 A：“$7$B 参数，$2$T 词元训练，$32$K 词表，$4$K 上下文，MMLU $5$ 样本 $46\%$。”模型 B：“$7$B 参数（稠密），高质量数据训练，$152$K 词表，$32$K 上下文，MMLU $74\%$。”列出你得先知道、才能断定 B 的配方更好的信息，并解释每一项为什么重要。
::: solution
(1) B 的词元数：它可能训练了多得多的词元，仅此一项就能解释差距（[[#sec-over-training]]）。(2) 数据来源及其对 MMLU 的去污染（[[pretraining/training-data#sec-contamination]]）：包含类基准材料、或以其退火的“高质量”数据会抬高分数。(3) 评测协议：提示格式、完形填空与字母选项式表述、归一化方式、评分的是基座模型还是后训练模型（[[pretraining/in-training-evaluation#def-mc-scoring]]）。(4) B 的“7B”是否计入嵌入：$152$K 词表下嵌入占小模型的很大份额，B 的非嵌入参数量可能小于 A。(5) 精确参数量、激活量与总量（B 注明稠密，这有帮助）。(6) 多个基准（含留出的基准），而不是一个。(7) 发布日期：方法进步很快，后来的模型受益于更好的数据流水线，这与任何单独的配方选择无关。
:::
:::

::: exercise 数一个 GPT-3 式配置 {level=3}
用清单中的`count`函数（或手算）计算一个$n_{\text{layer}} = 32$、$d = 4096$、$32$头、$d_{\text{ff}} = 4d$、词表$50{,}257$、$2048$个学习位置、LayerNorm、有偏置、共享嵌入的 GPT-3 式模型的参数量（即 GPT-3 6.7B 的配置）。验证$12n_{\text{layer}}d^2$是一个不错的近似。
::: solution
每块：注意力$4d^2 = 67{,}108{,}864$；前馈$8d^2 = 134{,}217{,}728$；两个 LayerNorm $4d = 16{,}384$；偏置$d + 2d + d + 4d + d = 9d = 36{,}864$。每块合计$201{,}379{,}840$；$32$块共$6{,}444{,}154{,}880$。嵌入：$50{,}257\cdot4096 + 2048\cdot4096 = 205{,}852{,}672 + 8{,}388{,}608 = 214{,}241{,}280$。末尾 LayerNorm $8192$。总计$6{,}658{,}404{,}352$，即 GPT-3 论文的“6.7B”。$12n_{\text{layer}}d^2 = 6{,}442{,}450{,}944$，误差在$3.3\%$以内；差额主要来自嵌入。
:::
:::
