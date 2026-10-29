一次大规模训练开跑之前，几行算术就能决定它到底是否可行。需要多少次浮点运算？每块设备为权重、梯度、优化器状态和激活值需要多少显存？在现有硬件上要跑多久，成本几何？这些都不需要剖析器，也不需要一行模型代码：它们由网络的形状——层数、宽度、头数、词表、序列长度——加上几条精确的计数规则推出。本章从第一性原理导出这些规则，并把它们组装成一台计算器。

两个招牌结论——训练约花费$6ND$次 FLOPs，混合精度 Adam 约需每参数$16$字节——已在[[pretraining/training-loop]]与[[neural-networks/training-practice]]中简要介绍过。这里我们逐层完整地推导它们，包括招牌公式略去的各项：注意力对序列长度的依赖、输出层、重计算，以及激活值的显存——长序列时后者可以压过其余一切。后面的各章会不断用到这些计数：[[scaling/accelerators]]问这些 FLOPs 能多快执行，[[scaling/data-parallelism]]与[[scaling/model-parallelism]]问如何把显存分摊到各设备。

## 计数规则 {#sec-rules}

本章的一切都建立在矩阵乘积的一条规则之上。

::: proposition 矩阵乘积的 FLOPs {#prop-matmul}
把一个$m\times k$矩阵与一个$k\times n$矩阵相乘，要做$mn$个长度为$k$的点积，每个点积含$k$次乘法与$k-1$次加法。把一次乘加计为两个 FLOP，这个乘积的代价是

$$
2mkn\ \text{FLOPs}.
$$ {#eq-matmul}
:::

::: proof
结果的$mn$个元素中每一个都是$\sum_{j=1}^{k}a_{ij}b_{jl}$，需要$k$个乘积与$k-1$次求和，即$2k - 1$个 FLOP。总和为$mn(2k - 1)$，忽略低阶项$mn$即$2mkn$——整个文献都采用这一约定，对于把融合乘加累加到初始为零的累加器里的硬件，它恰好精确。
:::

对$n$个词元施加一个线性层，就是用一个$n\times d_{\text{in}}$的激活矩阵去乘$d_{\text{in}}\times d_{\text{out}}$的权重矩阵：$2nd_{\text{in}}d_{\text{out}}$个 FLOP，即**每权重每词元两个 FLOP**。逐元素运算——激活函数、残差加法、归一化——每词元花费$O(d)$，在$d$为几千时只占 FLOPs 的微不足道一份（尽管不像[[scaling/accelerators]]所示，在时间上也无关紧要）。

反向传播用同一条规则计数。

::: proposition 反向传播的代价是前向的两倍 {#prop-backward}
对线性层$Y = XW$，$X\in\R^{n\times d_{\text{in}}}$、$W\in\R^{d_{\text{in}}\times d_{\text{out}}}$，反向传播由上游梯度$\bar Y\in\R^{n\times d_{\text{out}}}$计算$\bar X = \bar YW\T$与$\bar W = X\T\bar Y$。两者各花费$2nd_{\text{in}}d_{\text{out}}$个 FLOP，所以反向传播是前向的两倍，一个训练步是前向的三倍。
:::

::: proof
由[[#eq-matmul]]，$\bar YW\T$是$(n\times d_{\text{out}})\cdot(d_{\text{out}}\times d_{\text{in}})$的乘积，花费$2nd_{\text{out}}d_{\text{in}}$；$X\T\bar Y$是$(d_{\text{in}}\times n)\cdot(n\times d_{\text{out}})$，花费$2d_{\text{in}}nd_{\text{out}}$。前向乘积$XW$代价相同。注意力内部的矩阵乘积，如$S = QK\T$，遵循同样的模式：它们的反向传播需要$\bar Q = \bar SK$与$\bar K = \bar S\T Q$，两个与前向同样大小的乘积。逐元素运算的反向代价与前向同阶，依然可以忽略。
:::

## Transformer 的参数数量 {#sec-params}

取一个只有解码器的 Transformer：$L$个宽度为$d$的块，$a$个维度为$d_h = d/a$的查询头，$a_{kv}$个键值头（标准多头注意力中等于$a$，分组查询注意力（grouped-query attention）中更小），前馈宽度$d_{\text{ff}}$，词表含$V$个词元。块的结构即[[transformers/transformer-block]]中的那个。

::: proposition 参数量 {#prop-params}
忽略偏置，一个块有

$$
\underbrace{2d^2 + 2d\,a_{kv}d_h}_{\text{注意力：} W_Q, W_O, W_K, W_V} + \underbrace{c\,d\,d_{\text{ff}}}_{\text{前馈}} + \underbrace{2d}_{\text{归一化}}
$$

个参数，其中两矩阵前馈网络$c = 2$，SwiGLU 这类门控前馈网络$c = 3$。模型再加上词元嵌入的$Vd$、除非绑定否则输出层再一个$Vd$、以及最终归一化的$d$。当$a_{kv} = a$且$c\,d_{\text{ff}} = 8d$时，块有$12d^2 + 2d$个参数，故大模型$N\approx12Ld^2$。
:::

::: proof
$W_Q$与$W_O$是$d\times d$的（全部$a$个头的查询，以及从$a\,d_h = d$回到$d$的输出投影）。$W_K$与$W_V$各把$d$映到$a_{kv}d_h$。前馈网络有$c$个$d\,d_{\text{ff}}$个元素的矩阵。两个 RMSNorm 增益向量（或 LayerNorm 增益；LayerNorm 的偏置会再加$2d$）各有$d$个元素。由$a_{kv}d_h = d$，注意力贡献$4d^2$；$c\,d_{\text{ff}} = 8d$使前馈网络贡献$8d^2$：合计$12d^2$。
:::

::: example 精确计算 Llama-2-7B 的参数量 {#ex-llama-params}
70亿参数的 Llama 2 模型（Touvron 等，2023）有$L = 32$、$d = 4096$、$a = a_{kv} = 32$、SwiGLU 且$d_{\text{ff}} = 11{,}008$、$V = 32{,}000$，嵌入不绑定，使用 RMSNorm。数一数它的参数。
::: solution
注意力：$4\cdot4096^2 = 67{,}108{,}864$。前馈：$3\cdot4096\cdot11{,}008 = 135{,}266{,}304$。归一化：$8192$。每块：$202{,}383{,}360$；$32$个块共$6{,}476{,}267{,}520$。嵌入：$2\cdot32{,}000\cdot4096 = 262{,}144{,}000$。最终归一化：$4096$。总计：$6{,}738{,}415{,}616$——即发表的“6.7B”。$12Ld^2$近似给出$64.4$亿；差额来自嵌入与稍大的前馈（$3\cdot11{,}008 = 33{,}024 > 8\cdot4096 = 32{,}768$）。
:::
:::

## 训练步的 FLOPs {#sec-flops}

现在数一个块在$n$个词元的序列上前向传播的开销，取$a_{kv} = a$、$c\,d_{\text{ff}} = 8d$。

::: theorem Transformer 块前向传播的 FLOPs {#thm-block-flops}
对$n$个词元的序列，一个块的前向传播花费

$$
\underbrace{6nd^2}_{Q,K,V} + \underbrace{2n^2d}_{QK\T} + \underbrace{2n^2d}_{\text{softmax}\cdot V} + \underbrace{2nd^2}_{W_O} + \underbrace{16nd^2}_{\text{前馈}} = 24nd^2 + 4n^2d\ \text{FLOPs}
$$ {#eq-block-flops}

若完整的$n\times n$打分矩阵被算出；逐元素运算另加$O(nd + an^2)$。利用因果掩码可把注意力项平均减半为$2n^2d$。输出层每条序列再加$2ndV$个 FLOPs。
:::

::: proof
三个投影把$n\times d$的输入乘上三个$d\times d$矩阵，由[[#eq-matmul]]花费$3\cdot2nd^2$。对每个头，$Q_iK_i\T$是$(n\times d_h)(d_h\times n)$的乘积，花费$2n^2d_h$；加权和$P_iV_i$是$(n\times n)(n\times d_h)$的乘积，花费$2n^2d_h$；对$a$个头求和，由$ad_h = d$，两者各得$2n^2d$。输出投影花费$2nd^2$。前馈矩阵含$8d^2$个权重，每词元花费$2\cdot8d^2 = 16d^2$。有因果掩码时，查询$t$只需要$t$个键，于是跳过被掩没一半的内核做$\sum_{t=1}^{n}t\approx n^2/2$个点积而不是$n^2$个，把两个注意力乘积都减半。softmax、缩放、归一化、激活与残差加法对$n\times d$或$a\times n\times n$数组的每个元素花费常数个 FLOP。输出层把$n\times d$乘上$d\times V$。
:::

乘上三得到反向传播（[[#prop-backward]]），再对$L$个块与输出层求和，得到含$B$条序列的一个训练步的代价：

$$
C_{\text{step}} = 3\big(L(24Bnd^2 + 4Bn^2d) + 2BndV\big) = 72BnLd^2\left(1 + \frac{n}{6d} + \frac{V}{12Ld}\right).
$$ {#eq-step-flops}

这就是 Narayanan 等（2021）为 Megatron-LM 给出的形式。由$12Ld^2\approx N$，首项$72BnLd^2 = 6N\cdot Bn$：**每参数每词元六个 FLOP**，即$6ND$法则。两个修正项是注意力项——用完整打分矩阵时相对大小为$n/(6d)$（用因果跳过时为$n/(12d)$，即[[pretraining/training-loop]]采用的形式）——以及输出层的$V/(12Ld)$。

::: example GPT-3 的修正项 {#ex-gpt3-flops}
GPT-3 175B（Brown 等，2020）有$L = 96$、$d = 12{,}288$、$n = 2048$、$V = 50{,}257$。[[#eq-step-flops]]的两个修正项有多大？每条序列的训练代价是多少？
::: solution
$n/(6d) = 2048/73{,}728 = 0.028$，$V/(12Ld) = 50{,}257/14{,}155{,}776 = 0.0036$。每步每条序列花费$72\cdot2048\cdot96\cdot12{,}288^2\cdot1.031 = 2.20\times10^{15}$个 FLOPs，每词元约$1.08\times10^{12}$个，而$6N = 1.05\times10^{12}$个。在 GPT-3 的上下文长度下，$6ND$法则精确到$3\%$；对同一个模型，若上下文为$32{,}768$个词元，注意力修正将达到$44\%$。
:::
:::

::: definition 激活重计算 {#def-recompute}
**激活重计算**（也称梯度检查点；Chen 等，2016）在前向传播中只存部分中间张量，其余在反向传播中由存下的张量重新算出。**完整**重计算只存每个块的输入，在反向传播中重做该块的整个前向传播；**选择性**重计算（Korthikanti 等，2022）只重做选定的那些输出很大但计算便宜的操作。
:::

完整重计算增加一次前向传播，一步的代价从$3\times$前向变为$4\times$：硬件执行约$8ND$个 FLOPs，而模型只需要$6ND$个。Megatron-LM 公式中重计算运行用$96$取代$72$，就是这个$4/3$。因为模型 FLOPs 利用率只数$6ND$（[[scaling/large-runs]]），重计算总会把它压低；问题在于省下的显存能否换来一个收益远超代价的配置。

## 训练状态的显存 {#sec-state}

训练显存分为**模型状态**——大小与$N$成正比的那些量——和**激活值**——大小与批次和序列长度成正比的那些。模型状态按参数计数。

::: proposition 混合精度 Adam 的每参数字节数 {#prop-bytes}
权重与梯度用16位（bf16 或 fp16）、外加 fp32 主副本与 fp32 Adam 矩时，每个参数需要

$$
\underbrace{2}_{\text{权重}} + \underbrace{2}_{\text{梯度}} + \underbrace{4 + 4 + 4}_{\text{主权重、} m, v} = 16\ \text{字节}。
$$

常见变体：梯度保留 fp32（为了累加）得$18$；去掉单独的16位副本、从主权重即时转换得$14$；纯 bf16 训练、bf16 矩、无主副本得$8$；把 Adam 的两个矩存成$8$位（Dettmers 等，2022）省$6$字节。
:::

::: proof
每一项对每个参数按所述位宽存一个数：16位两个字节，fp32 四个字节。混合精度训练保留 fp32 主副本，以免微小更新被舍入吞掉（[[scaling/mixed-precision]]）；Adam 的一阶、二阶矩$m, v$各一个数。各变体改变个别项的位宽或有无：fp32 梯度加$2$；去掉16位工作副本减$2$；bf16 矩加无主副本剩$2 + 2 + 2 + 2 = 8$；两个1字节的矩取代两个4字节的省$6$。
:::

因此一个700亿参数的模型按标准配方需要$1.12$ TB 模型状态——还没存任何一个激活值，就已经是约十四块$80$ GB 加速器的显存。这个数字驱动了[[scaling/data-parallelism]]的分片。实践中，临时缓冲区（通信桶、融合核工作区）与显存碎片通常再加$10$–$20\%$。

## 激活值的显存 {#sec-activations}

每层的反向传播需要前向传播期间保存的输入：要算$\bar W = X\T\bar Y$就需要$X$。保存多少取决于实现；Korthikanti 等（2022）对 GPT 风格块的 Megatron-LM 实现（两矩阵 GeLU 前馈、$d_{\text{ff}} = 4d$、dropout、LayerNorm）给出了精确记账，激活为16位、dropout 掩码每元素1字节。

::: theorem 每块的激活显存 {#thm-activations}
微批次$b$、序列长度$s$、宽度$h$、$a$个头，不作重计算、不作并行时，一个 Transformer 块存

$$
M_{\text{act}} = sbh\left(34 + \frac{5as}{h}\right)\ \text{字节}。
$$ {#eq-act}

$t$度张量并行配合序列并行时，每一项都除以$t$。对注意力打分操作作选择性重计算时，第二项消失：$34sbh/t$。完整重计算只保留块输入：$2sbh$。
:::

::: proof
数反向传播需要的张量，16位元素每个2字节、掩码元素每个1字节。

*注意力。*$Q, K, V$投影的输入：$2sbh$。$Q$与$K$，$QK\T$的反向需要：$4sbh$。softmax 输出，它自己的反向需要：$2as^2b$。注意力概率上的 dropout 掩码：$as^2b$。dropout 输出与$V$，加权和的反向需要：$2as^2b + 2sbh$。输出投影的输入：$2sbh$。其后的 dropout 掩码：$sbh$。合计：$11sbh + 5as^2b$。

*前馈。*第一个矩阵的输入：$2sbh$。GeLU 的输入，宽度$4h$：$8sbh$。GeLU 输出，第二个矩阵的输入：$8sbh$。它的 dropout 掩码：$sbh$。合计：$19sbh$。

*归一化。*两个 LayerNorm 各存自己的输入：$4sbh$。

总和为$34sbh + 5as^2b = sbh(34 + 5as/h)$。$t$度张量并行下，注意力与前馈的张量按头、按前馈宽度切分到各设备；序列并行再沿序列切分剩下的张量——归一化输入与 dropout 掩码，这些只有张量并行会重复保存——于是全部除以$t$。选择性重计算丢弃 softmax 输出、它的 dropout 掩码和 dropout 输出——那些对$s$二次、但重算便宜的$5as^2b$项——在反向传播中重新生成。完整重计算只保留块输入的$2sbh$字节。
:::

现代实现改变常数、不改变结构。多数大语言模型预训练已不用 dropout，掩码随之消失；门控前馈网络改变$19sbh$；FlashAttention 这类融合注意力内核（[[transformers/attention-complexity]]）从不存$s\times s$的打分矩阵，反向传播时逐块重算，从构造上就消去了$5as/h$项。[[#thm-activations]]的教训在一切变体中都成立：**激活随微批次和序列长度线性增长；若保留打分矩阵，还随序列长度二次增长。**

::: example GPT-3 的激活值 {#ex-gpt3-act}
对 GPT-3 175B（$L = 96$、$h = 12{,}288$、$a = 96$、$s = 2048$）、微批次$b = 1$，分别计算整个模型在以下情形的激活显存：不作重计算；$t = 8$台设备上张量并行加序列并行并配选择性重计算；以及完整重计算。
::: solution
$5as/h = 5\cdot96\cdot2048/12{,}288 = 80$——注意力打分项是其余部分的两倍多。每块：$2048\cdot12{,}288\cdot114 = 2.87$ GB；$96$个块共$275$ GB。$t = 8$加选择性重计算：每设备$96\cdot34\cdot2048\cdot12{,}288/8 = 10.3$ GB。完整重计算：单台设备$96\cdot2\cdot2048\cdot12{,}288 = 4.8$ GB（并行则更少），代价是多一次前向传播。Korthikanti 等发现，选择性重计算配序列并行能以几个百分点而非约三分之一的算力开销，找回完整重计算的大部分显存节省。
:::
:::

::: widget plot
f: x*1*4096*(34 + 5*32*x/4096)*32/1e9; x*1*4096*34*32/1e9; x*1*4096*2*32/1e9
x: 0, 32768
y: 0, 400
labels: no recomputation; selective recomputation; full recomputation
caption: 由[[#thm-activations]]得到的激活显存（GB），$32$层、宽度$h = 4096$、$32$个头、微批次$1$的模型，横轴为序列长度$s$（不作并行）。保存打分矩阵使显存对$s$呈二次——$32{,}768$个词元时超过$350$ GB——而选择性重计算让它保持线性。完整重计算只存块输入；在这个规模上，即便长序列也只有几 GB。
:::

::: warning 权重放得下不等于这次训练放得下
一个常见错误是只检查参数放不放得进显存就此收工。训练还需要梯度和优化器状态——按[[#prop-bytes]]是 bf16 权重的八倍显存——还需要激活值，长序列时后者能超过前面所有项之和。一个权重在 bf16 下占$13.5$ GB 的70亿参数模型，Adam 需要约$108$ GB 模型状态，而每条序列$4096$个词元、不作重计算时，每条序列的激活值约达$100$ GB。反过来，推理不需要梯度和优化器状态，但需要 KV缓存。
:::

## KV缓存 {#sec-kv-cache}

推理时，自回归模型一次生成一个词元。每步都重算所有历史词元的键和值，仅投影就要为每条序列花$O(n^2)$的工作量，所以把它们缓存起来（[[transformers/efficient-attention]]）。

::: proposition KV缓存的大小 {#prop-kv}
$L$层、$a_{kv}$个维度为$d_h$的键值头、每元素存$p$字节的键和值，模型需要

$$
M_{\text{KV}} = 2\cdot L\cdot a_{kv}\cdot d_h\cdot p\ \text{字节/词元},
$$ {#eq-kv}

$B$条$T$词元序列的批次需要$M_{\text{KV}}\cdot T\cdot B$。
:::

::: proof
每层对每个词元、每个键值头存一个键向量和一个值向量，各含$d_h$个$p$字节的元素：每层每词元$2a_{kv}d_hp$，共$L$层。
:::

::: example 700亿参数模型的 KV缓存 {#ex-kv}
Llama-2-70B 有$L = 80$层、$64$个查询头和$a_{kv} = 8$个维度$d_h = 128$的键值头（分组查询注意力）。bf16 下，KV缓存每词元占多少显存？$16$条$4096$词元的序列呢？若用标准多头注意力呢？
::: solution
$2\cdot80\cdot8\cdot128\cdot2 = 327{,}680$字节 $= 0.3125$ MiB 每词元。$16\cdot4096 = 65{,}536$个词元：$21.5$ GB。若$a_{kv} = 64$将大八倍，达$172$ GB——超过 bf16 权重的$138$ GB。分组查询注意力被采用，很大程度就是为了让这个数字保持可控。
:::
:::

::: widget plot
f: 2*80*g*128*2*x*b/1e9; 138
x: 0, 131072
y: 0, 400
sliders: g=8:1:64:1; b=4:1:32:1
labels: KV cache (GB); bf16 weights of a $70$B model
caption: 按[[#eq-kv]]对 Llama-2-70B 形状的模型（$80$层、$d_h = 128$、bf16）画出的 KV缓存显存，横轴为上下文长度，$g$个键值头、批次含$b$条序列。多头注意力（$g = 64$）下，几条长序列就要比权重更多的显存；$g = 8$时缓存的增长慢八倍。推理服务系统按这条曲线确定批次大小。
:::

在上下文位置$t$解码一个词元，权重乘法花费$2N$个 FLOPs，加上对缓存做注意力约$4Ltd$个（$d = ad_h$），但必须从内存*读*全部权重和整个缓存——这就是解码受显存带宽而非算术限制的原因，[[scaling/accelerators]]将作解释。

## 一台计算器 {#sec-calculator}

下面的函数汇集本章的公式。参数量严格按[[#prop-params]]计数；每词元训练 FLOPs 取[[#thm-block-flops]]前向的三倍（不含因果节省）；模型状态按每参数$16$字节；激活按[[#thm-activations]]——其常数假定宽度$4h$的 GeLU 前馈，对 SwiGLU 模型只是近似；KV缓存按[[#eq-kv]]。

```python
def transformer_budget(L, d, heads, kv_heads, d_ff, vocab, seq, micro_batch,
                       swiglu=True, tied=False, tp=1, recompute="none"):
    """Parameters, FLOPs and memory (bytes) of a decoder-only Transformer."""
    dh = d // heads
    attn = 2 * d * d + 2 * d * kv_heads * dh           # W_Q、W_O 与更小的 W_K、W_V
    ffn = (3 if swiglu else 2) * d * d_ff              # gate、up、down（或 up、down）
    block = attn + ffn + 2 * d                          # + 两个 RMSNorm 增益
    emb = vocab * d * (1 if tied else 2)
    N = L * block + emb + d                             # + 最终归一化
    # 每词元前向 FLOPs：块与输出层中每权重 2 个，
    # 另加每层 4*seq*d 用于打分与加权和（不作因果节省）
    fwd = 2 * L * (attn + ffn) + 2 * vocab * d + 4 * L * seq * d
    s, b, h, a = seq, micro_batch, d, heads
    if recompute == "none":                            # Korthikanti 等（2022），16 位
        act = L * s * b * h * (34 + 5 * a * s / h) / tp
    elif recompute == "selective":                     # 注意力打分被重算
        act = L * s * b * h * 34 / tp
    else:                                              # 完整：只存每块输入
        act = L * 2 * s * b * h
    kv_per_token = 2 * L * kv_heads * dh * 2           # K 与 V，每个 2 字节
    return dict(params=N, train_flops_per_token=3 * fwd, state=16 * N,
                activations=act, kv_per_token=kv_per_token)

GB = 1e9
cfg = dict(L=32, d=4096, heads=32, kv_heads=32, d_ff=11008, vocab=32000)  # Llama-2-7B 形状
r = transformer_budget(**cfg, seq=4096, micro_batch=1)
print(f"parameters            {r['params']:,}")
print(f"train FLOPs / token   {r['train_flops_per_token']:.3e}  (6N = {6 * r['params']:.3e})")
print(f"weights+grads+Adam    {r['state'] / GB:.1f} GB")
for mode in ("none", "selective", "full"):
    a = transformer_budget(**cfg, seq=4096, micro_batch=1, recompute=mode)["activations"]
    print(f"activations ({mode:9s}) {a / GB:6.1f} GB  per sequence of 4096 tokens")
print(f"KV cache              {r['kv_per_token'] / 2**20:.3f} MiB per token")

big = transformer_budget(L=80, d=8192, heads=64, kv_heads=8, d_ff=28672, vocab=32000,
                         seq=4096, micro_batch=1)                          # Llama-2-70B 形状
print(f"70B shape: params {big['params'] / 1e9:.2f} B, KV {big['kv_per_token'] / 2**20:.3f} MiB/token,"
      f" 16 sequences x 4096 tokens: {16 * 4096 * big['kv_per_token'] / GB:.1f} GB")
```

```text
parameters            6,738,415,616
train FLOPs / token   4.608e+10  (6N = 4.043e+10)
weights+grads+Adam    107.8 GB
activations (none     )  104.2 GB  per sequence of 4096 tokens
activations (selective)   18.3 GB  per sequence of 4096 tokens
activations (full     )    1.1 GB  per sequence of 4096 tokens
KV cache              0.500 MiB per token
70B shape: params 68.98 B, KV 0.312 MiB/token, 16 sequences x 4096 tokens: 21.5 GB
```

参数量与[[#ex-llama-params]]吻合。上下文为$4096$个词元时，注意力项为每词元增加$6.4\times10^9$个 FLOPs，是$6N$的$16\%$（因果节省下$8\%$）；总数只比$6N$高$14\%$，因为计入$N$的输入嵌入是查表、不花 FLOPs。不作重计算时，一条序列的激活值与整个模型状态一样大，这就是重计算、融合注意力和张量或序列并行成为标准配置的原因。70B 那一行与[[#ex-kv]]吻合。

## 时间与成本 {#sec-time}

有了 FLOPs 计数，训练时间由实际达到的吞吐量推出。

::: proposition 实际耗时与加速器小时 {#prop-time}
$C$个 FLOPs 的运行，在$n$台峰值吞吐为$F$ FLOP/s 的加速器上以模型 FLOPs 利用率$U$执行，耗时$t = C/(nFU)$秒、$nt/3600 = C/(3600FU)$加速器小时。加速器小时数与$n$无关。
:::

::: proof
集群每秒完成$nFU$个有效 FLOPs，所以需要$C/(nFU)$秒；乘$n$再除$3600$得加速器小时，其中$n$相消。
:::

与$n$无关，正是用加速器小时报价的原因：增加设备缩短运行时间，但在利用率不变时不改变成本。实践中，随着设备增多通信增长，利用率会缓慢下降（[[scaling/large-runs]]），所以成本随$n$有所上升。

::: example 核对一个已发表的数字 {#ex-gpu-hours}
Llama 2 论文（2023）报告在$2$万亿词元上预训练700亿参数模型用了$1{,}720{,}320$ GPU 小时，使用 NVIDIA A100 GPU，NVIDIA 标称其稠密 bf16 峰值为$312$ TFLOP/s。这隐含多大的 MFU？
::: solution
$C = 6\cdot6.898\times10^{10}\cdot2\times10^{12} = 8.28\times10^{23}$个 FLOPs。可用的峰值 FLOPs：$1{,}720{,}320\cdot3600\cdot3.12\times10^{14} = 1.93\times10^{24}$。隐含 MFU：$8.28/19.3 = 43\%$，处于大型稠密运行的典型范围。（报告的小时数含若干开销，所以训练期间的真实利用率可能略高。）对7B 模型的$184{,}320$ GPU 小时作同样计算得$39\%$。
:::
:::

货币成本是加速器小时乘以每小时单价，取决于硬件代际、合同与提供商、变化很快；任何数字都应注明其日期与来源。耗电量是加速器小时乘以每设备平均功率，再加上散热与网络的开销，见[[llm-society/environmental-cost]]。

::: quiz
一个团队把训练运行的序列长度从$4096$个词元加倍到$8192$个，同时保持每批词元数不变（序列条数减半）。哪些量变了？
- [x] 每词元 FLOPs 中的注意力部分大致加倍。
- [ ] 模型状态（权重、梯度、优化器）加倍。
- [x] 不作融合注意力或重计算时，一条序列一个微批次的打分矩阵激活显存变为四倍。
- [ ] 每词元 FLOPs 中的$6N$部分加倍。
::: solution
注意力项是每层每词元$4nd$个 FLOPs，与$n$成正比。模型状态只依赖$N$。打分项$5as^2b$对$s$是二次的：$b = 1$时把$s$加倍就使其变四倍（线性项加倍）。权重乘法无论序列多长都是每词元$6N$。
:::
:::

::: history
用数 FLOPs 来估计神经网络的代价是老传统；对 Transformer，Kaplan 等（2020）列表给出每层参数量与 FLOPs，并普及了$C\approx6ND$；Narayanan 等（2021）给出带注意力与输出层修正的精确 Megatron-LM 公式。Chen、Xu、Zhang 与 Guestrin（2016）为深度网络引入梯度检查点，其结论是$L$层网络可以用$O(\sqrt L)$的显存训练、代价是多一次前向传播，这建立在自动微分中更早的检查点思想之上（Griewank，1992）。Rajbhandari 等（2020）在 ZeRO 论文中给出了混合精度 Adam 每参数$16$字节的记账。Korthikanti 等（2022）导出 Transformer 层的激活显存，并提出选择性重计算与序列并行。KV缓存始于最早的自回归 Transformer 实现；多查询注意力（Shazeer，2019）与分组查询注意力（Ainslie 等，2023）被提出，很大程度上就是为了缩小它。
:::

::: summary
- $m\times k$与$k\times n$矩阵的乘积花费$2mkn$个 FLOPs；线性层前向每权重每词元$2$个 FLOP、反向$4$个。
- 一个块有$2d^2 + 2da_{kv}d_h + c\,d\,d_{\text{ff}}$个权重，标准形状下为$12d^2$，故$N\approx12Ld^2$再加上嵌入。
- 一个块的前向传播每条序列花费$24nd^2 + 4n^2d$个 FLOPs；一个训练步花费$72BnLd^2(1 + n/(6d) + V/(12Ld))$——即**$6ND$**加上注意力与输出层修正。完整重计算把执行的 FLOPs 抬到约$8ND$。
- 混合精度 Adam 需要**每参数 16 字节**（$2 + 2 + 12$）；各变体从$8$到$18$不等。
- 激活按 Megatron 记账每块占$sbh(34 + 5as/h)$字节；张量与序列并行除以$t$，选择性重计算消去二次项，完整重计算剩$2sbh$。
- **KV缓存**每词元占$2La_{kv}d_hp$字节；分组查询注意力把它缩小$a/a_{kv}$倍。
- 训练时间为$C/(nFU)$；加速器小时$C/(3600FU)$与设备数量无关。
:::

## 习题

::: exercise 一个矩阵乘积 {level=1 check="1.37e11"}
一个$4096\times4096$矩阵乘一个$4096\times4096$矩阵需要多少 FLOPs？保留三位有效数字。
::: solution
$2\cdot4096^3 = 1.37\times10^{11}$个 FLOPs。
:::
:::

::: exercise 一个块的参数量 {level=1 check="201326592"}
一个块宽度$d = 4096$，标准多头注意力，前馈网络$d_{\text{ff}} = 4d$、两个矩阵。忽略归一化与偏置，它有多少参数？
::: solution
$12d^2 = 12\cdot16{,}777{,}216 = 201{,}326{,}592$。
:::
:::

::: exercise 每参数字节数 {level=1 check="840"}
一个700亿参数的模型，只用 fp32 主权重与 fp32 Adam 矩（无16位副本）时，需要多少 GB 模型状态？
::: solution
每参数$12$字节：$12\cdot7\times10^{10} = 8.4\times10^{11}$字节 $= 840$ GB——这正是一个能精确恢复训练的检查点的大小。
:::
:::

::: exercise 注意力修正项 {level=2 check="2048"}
一个宽度$d = 4096$、用完整（非因果）打分计算的模型，序列长度为多少时，[[#eq-step-flops]]的注意力项使 FLOPs 增加$8.33\%$，即$n/(6d) = 1/12$？
::: solution
$n = 6d/12 = d/2 = 2048$个词元。
:::
:::

::: exercise 分组查询注意力的 KV缓存 {level=2 check="0.125"}
一个模型有$32$层、$8$个维度$128$的键值头，键和值以 bf16 存储。它的 KV缓存每词元占多少 MiB（$2^{20}$字节）？保留三位小数。
::: solution
$2\cdot32\cdot8\cdot128\cdot2 = 131{,}072$字节 $= 0.125$ MiB 每词元。$128$K 词元的上下文需要每条序列$16$ GiB。
:::
:::

::: exercise 带并行的激活显存 {level=2 check="10.27"}
按 GB 保留两位小数，验证[[#ex-gpt3-act]]中$t = 8$配选择性重计算时每设备的激活显存。
::: solution
$96\cdot34\cdot2048\cdot12{,}288/8 = 1.0268\times10^{10}$字节 $= 10.27$ GB。
:::
:::

::: exercise 加速器小时 {level=2 check="1.6e6"}
一次$2.304\times10^{24}$个 FLOPs 的运行计划在峰值$10^{15}$ FLOP/s、预期 MFU 为$40\%$的加速器上进行。需要多少加速器小时？在$4096$台设备上要多少天？
::: solution
每台加速器小时交付$3600\cdot10^{15}\cdot0.4 = 1.44\times10^{18}$个有效 FLOPs，所以运行需要$2.304\times10^{24}/1.44\times10^{18} = 1.6\times10^6$加速器小时。$4096$台设备即$1.6\times10^6/4096 = 391$小时，约$16.3$天。
:::
:::

::: exercise 重计算的代价 {level=2}
证明完整重计算把每步执行的 FLOPs 抬高$4/3$倍，并解释 Megatron-LM 的公式为何从$72$变成$96$。为什么对注意力打分作选择性重计算代价要小得多？
::: solution
不重计算时，前向加反向为$1 + 2 = 3$次前向。完整重计算在反向传播中加一次前向：$4$次，即$4/3$倍；$72\cdot4/3 = 96$。选择性重计算只重做 softmax、dropout 与加权和的输入——花费$O(as^2)$的逐元素工作，加上加权和那个每条序列每层$2s^2d$个 FLOPs 的乘积——而不是投影与前馈网络的$24sd^2$；当$s\ll6d$时只占一步的几个百分点。
:::
:::

::: exercise 显存规划 {level=3}
一个130亿参数的模型（$L = 40$、$h = 5120$、$a = 40$）要在每块$80$ GB 显存的加速器上以$4096$词元的序列训练。用[[#prop-bytes]]与[[#thm-activations]]判断它能否：(a) 在单台设备上以微批次$1$、完整重计算训练；(b) 在$t = 8$台设备上张量并行加序列并行、选择性重计算、微批次$1$，忽略张量并行本身提供的之外的模型状态分片。这对接下来几章分片方案的意义有何提示？
::: solution
(a) 模型状态：$16\cdot1.3\times10^{10} = 208$ GB——已超过$80$ GB，不行。完整重计算下激活只有$40\cdot2\cdot4096\cdot5120 = 1.7$ GB。(b) 张量并行把块的权重、梯度和优化器状态除以$8$：$208/8 = 26$ GB。激活：$40\cdot34\cdot4096\cdot5120/8 = 3.6$ GB。合计约$30$ GB，放得下还有余量给缓冲区。单台设备失败不是因为激活，而是因为模型状态；把模型状态分到各设备——用张量并行，或用 ZeRO 把它分片到数据并行副本上（[[scaling/data-parallelism]]）——才是关键一步。
:::
:::

::: exercise 因果跳过 {level=3}
导出$n$个词元的因果注意力层中查询–键点积的总数，进而证明：跳过完全被掩没的$c\times c$块的实现（$c$整除$n$）做$\tfrac12n^2(1 + c/n)$个点积。$n = 8192$、$c = 128$时，它相对完整的$n^2$省下多大比例？
::: solution
查询$t$（从$1$到$n$）注意键$1,\dots,t$：$\sum_{t=1}^{n}t = n(n+1)/2$个点积。分块时，$n/c$个块行中，第$i$行含不完全被掩没的块$1,\dots,i$（对角线上的块$i$部分被掩没但整块计算）：$\sum_{i=1}^{n/c}i = \tfrac12(n/c)(n/c + 1)$个块，每块$c^2$个乘积，得$\tfrac12n^2(1 + c/n)$。$n = 8192$、$c = 128$时，$1 + c/n = 1.0156$，所以实现做全部工作量的$50.8\%$，省下$49.2\%$。
:::
:::
