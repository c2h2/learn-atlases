FlashAttention（[[transformers/attention-complexity]]）不存储注意力矩阵就能精确计算注意力，但它改变不了两个硬事实。训练和处理提示的算术开销仍按 $T^2$ 增长；而模型生成文本时，必须把之前每个词元的键和值留在内存里——**KV缓存**——并且每生成一个新词元就要把它们全部读一遍。对一个使用完整多头注意力的 700 亿参数级模型，单条 $4096$ 词元序列的缓存就要 $10$ GiB。

本章介绍两类补救办法。第一类改变*哪些*词元对之间发生相互作用：稀疏模式、滑动窗口与核化的"线性"注意力通过近似或限制注意力来削减 $T^2$ 项。第二类改变*每个词元存多少*：多查询注意力与分组查询注意力在多个头之间共享键和值，把缓存缩小数倍，质量损失却很小。如今的长上下文模型把两类的思想结合使用。

## KV缓存 {#sec-kv}

解码器生成第 $t + 1$ 个词元时，位置 $1, \dots, t$ 的键和值自算出以来没有变过——因果掩码保证了这一点（[[transformers/multi-head-attention#prop-causal]]）——所以可以把它们存下来重复使用。每生成一个词元，每层每个头就各多出一个键向量和一个值向量。

::: proposition KV缓存的大小 {#prop-kv-size}
一个有 $L$ 层、$h_{kv}$ 个维数为 $d_k$ 的键值头、每个数占 $b$ 字节的解码器，每词元需要

$$
2\cdot L\cdot h_{kv}\cdot d_k\cdot b \quad\text{字节}
$$

的 KV缓存，$T$ 词元的上下文需要它的 $T$ 倍，而且每个正在生成的序列都各要一份。
:::

::: proof
对每个词元，每层要为其 $h_{kv}$ 个键值头各存一个长度 $d_k$ 的键向量与值向量：每层 $2h_{kv}d_k$ 个数，每词元 $2Lh_{kv}d_k$ 个数，每个 $b$ 字节。
:::

标准多头注意力中 $h_{kv} = h$，即查询头的个数，且 $h_{kv}d_k = d_{\text{model}}$。于是缓存随模型的宽度、深度和上下文增长——而且每生成一个词元都要整个读一遍，这使生成成为访存受限（[[transformers/attention-complexity#sec-decode]]）。

## 在头之间共享键和值 {#sec-gqa}

Shazeer（2019）注意到，各个查询头不必各有自己的键和值。

::: definition 多查询注意力与分组查询注意力 {#def-gqa}
在**分组查询注意力**（grouped-query attention，GQA）中，$h$ 个查询头被分成 $g$ 组、每组 $h/g$ 个头，组内所有头共用一个键头和一个值头，于是 $h_{kv} = g$。**多查询注意力**（multi-query attention，MQA）是 $g = 1$ 的情形：一个键头和一个值头被所有查询头共享。标准多头注意力则是 $g = h$。
:::

每个查询头仍从自己的查询出发计算自己的注意力模式，只是它查询的键和值在组内共享。缓存缩小为原来的 $h/g$，每生成一个词元的读内存量也同比缩小。投影 $W_K$ 与 $W_V$ 按同样比例缩小，从 $d\times d$ 变成 $d\times gd_k$。

::: example 七百亿参数模型的缓存 {#ex-kv}
Llama 2 70B 有 $L = 80$ 层、$64$ 个维数 $d_k = 128$ 的查询头，使用带 $8$ 个键值头的 GQA。计算 bfloat16 下它每词元与每条 $4096$ 词元序列的 KV缓存，并与完整多头注意力和 MQA 比较。
::: solution
由 [[#prop-kv-size]]，取 $h_{kv} = 8$：$2\cdot80\cdot8\cdot128\cdot2 = 327{,}680$ 字节 $= 320$ KiB 每词元，每条序列 $4096\cdot320$ KiB $= 1.25$ GiB。若用 $64$ 个键值头（完整 MHA），缓存要大八倍：每词元 $2.5$ MiB，每条序列 $10$ GiB。MQA 下则是每词元 $40$ KiB。以 GQA 同时服务 $16$ 条 $4096$ 词元的对话要 $20$ GiB 缓存；用完整 MHA 则要 $160$ GiB——超过任何单块 GPU 的容量。
:::
:::

质量损失有多少？Ainslie et al.（2023）发现，MQA 会明显拉低质量并可能使训练不稳定，而只要少数几个键值头的 GQA 已接近多头注意力的质量，速度却几乎与 MQA 相同。他们还证明，一个已有的多头模型可以被转换（"uptrain"）为 GQA：把每组内的键头和值头取平均，再补训大约相当于原预训练计算量 $5\%$ 的训练即可。GQA 如今已是标准做法：Llama 2 70B 与所有 Llama 3 模型、Mistral 7B 以及许多其他模型都在使用。

::: widget plot
f: 2*80*64*128*2*x/2^30; 2*80*g*128*2*x/2^30
x: 0, 32768
sliders: g=8:1:64:1
labels: full multi-head ($64$ KV heads); grouped-query ($g$ KV heads)
caption: 一个 $80$ 层、头维 $128$、bfloat16 的模型，单条序列的 KV缓存（GiB）随序列长度的变化。缓存随上下文线性增长。当键值头取 $g = 8$ 时，它只有多头缓存的八分之一：$32{,}768$ 词元时是 $10$ GiB 而不是 $80$ GiB。
:::

::: quiz
一个模型有 $32$ 个查询头，使用带 $4$ 个键值头的分组查询注意力。与完整多头注意力相比，它的 KV缓存和注意力分数的 FLOPs 分别如何？
- [x] 缓存小 $8$ 倍；分数的 FLOPs 不变
- [ ] 两者都小 $8$ 倍
- [ ] 缓存小 $4$ 倍；分数的 FLOPs 小 $8$ 倍
- [ ] 缓存不变；只有参数变少了
::: solution
缓存只存 $h_{kv} = 4$ 个头而不是 $32$ 个，相差 $8$ 倍。$32$ 个查询头每一个仍计算自己的 $T\times T$ 分数（针对所在组共享的键），所以注意力的 FLOPs 保持不变；缩小的只有键值投影和每词元的读内存量。GQA 帮到大的是访存受限的生成，而对计算受限的预填充帮助不大。
:::
:::

在代码里，GQA 只需对多头注意力作一处改动：计算 $g$ 个键头和 $g$ 个值头，并让查询头 $i$ 使用键值头 $\lfloor i/(h/g)\rfloor$。最简单的做法是在通常的注意力计算之前，沿头的维数把每个键值头重复 $h/g$ 次；优化过的核则直接索引共享的头，而不必复制。

```python
import torch, torch.nn.functional as F

B, T, h, g, d_k = 2, 10, 8, 2, 16                  # 8 个查询头共享 2 个键值头
q = torch.randn(B, h, T, d_k)                       # (B, h, T, d_k)
k, v = torch.randn(B, g, T, d_k), torch.randn(B, g, T, d_k)   # (B, g, T, d_k)：需要缓存的张量
k_rep = k.repeat_interleave(h // g, dim=1)          # (B, h, T, d_k)：头 0-3 用第 0 组，4-7 用第 1 组
v_rep = v.repeat_interleave(h // g, dim=1)
out = F.scaled_dot_product_attention(q, k_rep, v_rep, is_causal=True)   # (B, h, T, d_k)
print(out.shape, k.numel() / k_rep.numel())         # torch.Size([2, 8, 10, 16]) 0.25
```

需要存进缓存的只有 `k` 和 `v`——这里它们的大小只是 `k_rep`、`v_rep` 的四分之一。

DeepSeek-V2（2024）走得更远，提出了**多头潜在注意力**（multi-head latent attention）：每词元每层只存一个压缩的潜在向量，所有头的键和值都由它重建；作者报告的 KV缓存比其较早的采用多头注意力的稠密模型小 $93\%$。另一些做法把缓存量化到 $8$ 位或更低（[[inference/quantisation]]）。

## 限制谁能注意谁 {#sec-sparse}

第二类办法冲着 $T^2$ 个词元对下手。最简单的限制是局部性。

::: definition 滑动窗口注意力 {#def-window}
在窗口为 $w$ 的**滑动窗口注意力**中，位置 $i$ 的查询只允许注意位置 $j$ 满足 $i - w < j\le i$ 的键：自己以及前面的 $w - 1$ 个词元。每层开销从 $O(T^2d)$ 降为 $O(Twd)$，KV缓存也永远只需最近 $w$ 个词元。
:::

带窗口的单层只看得见往后 $w$ 个词元，但层会复合：上一轮位置 $i - w + 1$ 看到的东西，这一轮会到达位置 $i$。

::: proposition 堆叠窗口的作用范围 {#prop-reach}
在 $L$ 层窗口为 $w$ 的因果滑动窗口注意力堆叠中，位置 $i$ 的输出能依赖位置 $j\ge i - L(w - 1)$ 的输入，更早的则都不能。
:::

::: proof
对 $L$ 归纳。一层让位置 $i$ 能读位置 $i - (w - 1), \dots, i$。若 $L$ 层后位置 $p$ 依赖于回溯到 $p - L(w - 1)$ 的输入，那么在第 $L + 1$ 层，位置 $i$ 读回溯到 $i - (w - 1)$ 的那些位置，而这些位置各自依赖于回溯到 $i - (w - 1) - L(w - 1) = i - (L + 1)(w - 1)$ 的输入。任何更早的输入都无法到达位置 $i$，因为每层至多把信息向前搬运 $w - 1$ 个位置。
:::

Mistral 7B（Jiang et al., 2023）在它的 $32$ 层中每层都使用 $w = 4096$ 的窗口，理论作用范围约 $32\cdot4096 = 131{,}072$ 个词元。Gemma 2 及其后的模型把滑动窗口层与通常的全局注意力层交错排列，让廉价的局部层承担大部分工作，同时由少数全局层保持精确的长程访问。

::: widget graph
nodes: t1@0,0; t2@1,0.8; t3@2,0; t4@3,0.8; t5@4,0; t6@5,0.8
edges: t1>t2; t1>t3; t2>t3; t2>t4; t3>t4; t3>t5; t4>t5; t4>t6; t5>t6
algorithm: bfs
start: t1
caption: 窗口 $w = 3$ 的滑动窗口注意力（每个词元能看见自己和前两个）。一条箭头表示"可以注意"。从 $t_1$ 运行广度优先搜索：它到各词元的距离，就是 $t_1$ 的信息到达该词元所需的层数——$t_6$ 相距三跳，因此需要三层，与 [[#prop-reach]] 在每层 $w - 1 = 2$ 个位置下的预言一致。
:::

::: example 窗口的代价 {#ex-window}
一个因果模型以窗口 $w = 4096$ 处理 $T = 32{,}768$ 个词元。它计算的（查询，键）对占完整因果注意力的百分之几？
::: solution
完整因果注意力计算 $T(T + 1)/2 = 536{,}887{,}296$ 对。带窗口时，位置 $i$ 计算 $\min(i, w)$ 对，总计 $125{,}831{,}168$：约为完整数的 $23\%$。节省随 $T$ 增大：窗口的开销随 $T$ 线性增长，到 $131{,}072$ 词元时只计算约 $6\%$ 的对。
:::
:::

::: warning 够得着不等于记得住
[[#prop-reach]] 给出的是上界：信息*能*走 $L(w-1)$ 个位置，但每一跳都要把它挤过一个固定大小的表示，并与同一个窗口里的所有别的东西竞争。带滑动窗口的模型从 $100{,}000$ 词元之外取回一条事实的可靠性，通常远不如带全局注意力的模型。这正是最近的模型保留一些全局层、而不单靠窗口的原因。
:::

当窗口从一条长序列的开头滑过之后，还有一个实用细节值得注意。训练好的模型无论开头几个词元内容如何，都会把相当大的一份注意力放在序列最开头的几个词元上——它们是**注意力汇聚点**（attention sink），在没有别的键相关时吸收权重——若把它们从缓存中逐出，生成立刻崩溃。Xiao et al.（2023）证明，在滑动窗口之外始终在缓存里保留最初四个词元，就能在数百万词元上恢复稳定的生成，他们称此方法为 StreamingLLM（[[inference/long-context]]）。

在窗口成为标准做法之前，研究者们探索过许多稀疏模式。Sparse Transformer（Child et al., 2019）把局部注意力与对每隔 $\sqrt T$ 个位置的注意结合起来，开销为 $O(T\sqrt T)$。Longformer（Beltagy et al., 2020）加入了少数**全局**词元——它们注意所有位置、也被所有位置注意；BigBird（Zaheer et al., 2020）把窗口、全局词元与随机连接组合起来，并证明这类稀疏模式保持了完整注意力的表达能力。Reformer（Kitaev et al., 2020）用哈希把相似的查询和键分到一组，Linformer（Wang et al., 2020）则把键和值沿序列方向投影到固定长度。这些思想最终证明对长文档的编码器最有用；对大型解码器而言，FlashAttention 已让精确注意力足够快，以致大多数固定稀疏模式得不偿失。

## 线性注意力 {#sec-linear}

还有一种思想通过改变相似度函数来去掉 $T^2$ 项。softmax 注意力给每个值配的权重是 $\exp(\mathbf{q}_i\cdot\mathbf{k}_j/\sqrt{d_k})$；假如此权重改成一个**特征映射**的内积 $\phi(\mathbf{q}_i)\cdot\phi(\mathbf{k}_j)$，其中 $\phi\colon\R^{d_k}\to\R^{r}_{>0}$。

::: definition 线性注意力 {#def-linear}
给定取正值的特征映射 $\phi$，**线性注意力**对每个查询计算

$$
\mathbf{y}_i = \frac{\sum_j\big(\phi(\mathbf{q}_i)\cdot\phi(\mathbf{k}_j)\big)\mathbf{v}_j}{\sum_j\phi(\mathbf{q}_i)\cdot\phi(\mathbf{k}_j)} = \frac{\phi(\mathbf{q}_i)^\top\Big(\sum_j\phi(\mathbf{k}_j)\mathbf{v}_j^\top\Big)}{\phi(\mathbf{q}_i)^\top\Big(\sum_j\phi(\mathbf{k}_j)\Big)},
$$

其中和式跑过所有键（因果版本则跑过 $j\le i$）。Katharopoulos et al.（2020）使用 $\phi(\mathbf{x}) = \operatorname{elu}(\mathbf{x}) + 1$。
:::

第二个写法才是重点：由结合律，$\big(\phi(Q)\phi(K)^\top\big)V = \phi(Q)\big(\phi(K)^\top V\big)$。矩阵 $\phi(K)^\top V$ 的大小是 $r\times d_v$，只需计算一次、花 $O(Trd_v)$ 次运算，取代了 $T\times T$ 的权重矩阵。开销随 $T$ 线性增长。

::: proposition 因果线性注意力是循环网络 {#prop-linear-rnn}
对因果和 $\sum_{j\le i}$，定义状态 $S_i = \sum_{j\le i}\phi(\mathbf{k}_j)\mathbf{v}_j^\top\in\R^{r\times d_v}$ 与 $\mathbf{z}_i = \sum_{j\le i}\phi(\mathbf{k}_j)\in\R^r$。则

$$
S_i = S_{i-1} + \phi(\mathbf{k}_i)\mathbf{v}_i^\top, \qquad \mathbf{z}_i = \mathbf{z}_{i-1} + \phi(\mathbf{k}_i), \qquad \mathbf{y}_i = \frac{\phi(\mathbf{q}_i)^\top S_i}{\phi(\mathbf{q}_i)^\top\mathbf{z}_i},
$$

其中 $S_0 = 0$、$\mathbf{z}_0 = \mathbf{0}$。生成一个词元需要 $O(rd_v)$ 的时间与内存，与上下文长度无关。
:::

::: proof
递推成立，是因为每个和恰好新增 $j = i$ 的那一项。把和代入 $j\le i$ 的 [[#def-linear]] 即得 $\mathbf{y}_i$。每一步更新一个 $r\times d_v$ 矩阵与一个 $r$ 维向量，再与 $\phi(\mathbf{q}_i)$ 作一次乘法，开销与 $i$ 无关。
:::

于是因果线性注意力是一个状态取矩阵值的 RNN，而且不需要不断增长的缓存。代价是表达能力：整个过去被压缩进 $S_i$，softmax 注意力在千万键中锐利锁定其一的能力随之失去。Performer（Choromanski et al., 2020）选择了能近似 softmax 核本身的随机特征（习题 10），但在语言建模上线性注意力的质量始终不及 softmax 注意力。Arora et al.（2023）把大部分差距归因于*联想回忆*（associative recall）——取回上下文中某个特定键之后紧跟的值——一旦上下文里的键值对多到固定大小的状态无法分辨，它就力不从心。它的思想存活在一类给状态加上门控或衰减的循环架构里——RetNet（Sun et al., 2023）、门控线性注意力，以及选择性状态空间模型 Mamba（[[sequence-models/state-space-models]]）——也活在把这类层与少数注意力层组合起来的混合模型里。

::: example 手工计算线性注意力 {#ex-linear}
取 $\phi$ 为恒等映射（下面所有向量均为正），两个词元的查询 $\mathbf{q}_1 = (1, 0)$、$\mathbf{q}_2 = (1, 1)$，键 $\mathbf{k}_1 = (1, 1)$、$\mathbf{k}_2 = (2, 0)$，一维值 $v_1 = 1$、$v_2 = 3$。分别用 [[#def-linear]] 和 [[#prop-linear-rnn]] 的递推计算因果输出。
::: solution
直接计算：词元 1 的分数为 $\mathbf{q}_1\cdot\mathbf{k}_1 = 1$；词元 2 的分数为 $\mathbf{q}_2\cdot\mathbf{k}_1 = 2$、$\mathbf{q}_2\cdot\mathbf{k}_2 = 2$。于是 $y_1 = 1\cdot1/1 = 1$，$y_2 = (2\cdot1 + 2\cdot3)/(2 + 2) = 2$。

递推计算：$S_1 = \mathbf{k}_1v_1 = (1, 1)^\top$，$\mathbf{z}_1 = (1, 1)$，故 $y_1 = \mathbf{q}_1\cdot S_1/\mathbf{q}_1\cdot\mathbf{z}_1 = 1/1 = 1$。接着 $S_2 = (1, 1)^\top + (2, 0)^\top\cdot3 = (7, 1)^\top$，$\mathbf{z}_2 = (3, 1)$，故 $y_2 = (7 + 1)/(3 + 1) = 2$。两种算法一致，而递推那一种无论序列多长，只维护了一个 $2\times1$ 的状态和一个二维向量。
:::
:::

::: example 线性注意力省下多少 {#ex-linear-cost}
单个头 $T = 32{,}768$、$d_k = d_v = r = 128$，比较 softmax 注意力的算术（分数约 $T^2d$ 次乘加，值同样多）与线性注意力的算术（$\phi(K)^\top V$ 约 $Trd_v$ 次，与 $\phi(Q)$ 的乘积同样多）。
::: solution
softmax 注意力：$2T^2d = 2\cdot32{,}768^2\cdot128\approx2.7\times10^{11}$ 次乘加。线性注意力：$2Trd = 2\cdot32{,}768\cdot128^2\approx1.1\times10^9$。比值为 $T/d = 256$。节省随上下文线性增长，这正是线性层与状态空间层对超长输入极具吸引力的原因——前提是质量损失可以忍受或得到补偿。
:::
:::

::: history
Shazeer（2019）提出多查询注意力以加速增量解码；Ainslie et al.（2023）提出分组查询注意力，并给出了把已有模型补训（uptrain）的方法；Llama 2（2023）把 GQA 带进了广泛使用的开放模型。稀疏注意力模式由 Sparse Transformer（Child et al., 2019）、Longformer（Beltagy、Peters 与 Cohan，2020）和 BigBird（Zaheer et al., 2020）探索；Reformer（Kitaev、Kaiser 与 Levskaya，2020）使用局部敏感哈希，Linformer（Wang et al., 2020）使用低秩投影。Katharopoulos et al.（2020）证明核化注意力关于 $T$ 是线性的且可写成循环形式（"Transformers are RNNs"）；Choromanski et al.（2020）在 Performer 中用正随机特征逼近 softmax 核。Mistral 7B（Jiang et al., 2023）把滑动窗口与 GQA 结合；Gemma 2（2024）交错局部层与全局层；DeepSeek-V2（2024）提出了多头潜在注意力。门控循环的替代方案——RetNet（2023）、Mamba（Gu 与 Dao，2023）——以及 Jamba（2024）等混合架构，仍在继续探索开销随上下文增长更缓的注意力。
:::

::: summary
- 生成期间每个词元的键和值进入缓存；缓存每词元占 $2Lh_{kv}d_kb$ 字节，每生成一个新词元都要整个读一遍。
- 分组查询注意力让一组查询头共享每个键值头，把缓存和每词元读内存量缩小 $h/g$ 倍而质量损失很小；多查询注意力是 $g = 1$ 的极端情形。
- 滑动窗口注意力每层花 $O(Twd)$，只缓存 $w$ 个词元；堆叠的窗口可回溯 $L(w-1)$ 个位置，但长程回忆不如全局注意力，因此模型交错排列局部层与全局层。
- 稀疏模式（隔行、全局词元、随机连接）削减了 $T^2$ 个词元对；它们对长文档编码器最为重要。
- 线性注意力把 $\exp(\mathbf{q}\cdot\mathbf{k})$ 换成 $\phi(\mathbf{q})\cdot\phi(\mathbf{k})$；结合律使其开销关于 $T$ 线性，其因果形式是一个矩阵状态的 RNN——更便宜，但锐利检索的能力更差。
:::

## 习题

::: exercise 多头的缓存 {level=1 check="524288"}
一个 $32$ 层、$32$ 个维数 $128$ 的头、使用完整多头注意力的模型以 bfloat16 存储缓存。它每词元需要多少字节 KV缓存？$4096$ 个词元需要多少 GiB？
::: solution
$2\cdot32\cdot32\cdot128\cdot2 = 524{,}288$ 字节 $= 512$ KiB 每词元；$4096$ 个词元即 $2$ GiB。这正是 LLaMA 与 Llama 2 7B 模型的配置。
:::
:::

::: exercise GQA 的倍数 {level=1 check="1/8"}
一个模型有 $64$ 个查询头，使用 $8$ 组的 GQA。它需要完整多头 KV缓存的几分之几？
::: solution
$h_{kv}/h = 8/64 = 1/8$。
:::
:::

::: exercise 窗口的作用范围 {level=1 check="131072"}
按 [[#prop-reach]]，$32$ 层 $w = 4096$ 的滑动窗口层能让信息回溯多远？给出位置数（像 Mistral 论文那样用 $L\cdot w$，因为 $w - 1\approx w$）。
::: solution
$L(w - 1) = 32\cdot4095 = 131{,}040$ 个位置，通常写作 $32\cdot4096 = 131{,}072$。
:::
:::

::: exercise 线性对平方 {level=1 check="256"}
按 [[#ex-linear-cost]]，$T = 32{,}768$、$d = r = 128$ 时，线性注意力把一个头的算术开销缩小多少倍？
::: solution
$T/d = 32{,}768/128 = 256$。
:::
:::

::: exercise 一批对话 {level=2 check="20"}
利用 [[#ex-kv]]：Llama 2 70B 同时服务 $16$ 条 $4096$ 词元的对话需要多少 GiB 的 KV缓存？若该模型使用完整多头注意力，$80$ GiB 缓存装得下几条这样的对话？
::: solution
GQA 下 $16\cdot1.25 = 20$ GiB。完整 MHA 下每条对话要 $10$ GiB，因此只装得下 $8$ 条——而且模型自己约 $140$ GB（bfloat16）的权重还得另找地方放。
:::
:::

::: exercise 窗口中的词元对 {level=2 check="21"}
$T = 8$ 时，$w = 3$ 的因果滑动窗口注意力计算多少个（查询，键）对？与完整因果注意力比较。
::: solution
位置 $i$ 看见 $\min(i, 3)$ 个键：$1 + 2 + 3\cdot6 = 21$ 对，而完整因果注意力是 $36$ 对。
:::
:::

::: exercise GQA 的参数量 {level=2 check="150994944"}
$d = 8192$、$64$ 个维数 $128$ 的查询头、$8$ 个键值头时，一个注意力层有多少个权重（无偏置）？与完整多头注意力比较。
::: solution
$W_Q$ 与 $W_O$ 各为 $8192\times8192$，合计 $134{,}217{,}728$；$W_K$ 与 $W_V$ 各为 $8192\times1024$，合计 $16{,}777{,}216$。总计 $150{,}994{,}944$，而 MHA 是 $4\cdot8192^2 = 268{,}435{,}456$——少约 $44\%$。使用 GQA 的模型通常把省下的参数花在别处，例如更宽的前馈层。
:::
:::

::: exercise 线性注意力的递推 {level=2}
证明：用 [[#prop-linear-rnn]] 的递推算出的因果线性注意力输出，等于由二次公式 $\mathbf{y} = \big(M\odot\phi(Q)\phi(K)^\top\big)V$ 出发、逐行除以 $\big(M\odot\phi(Q)\phi(K)^\top\big)\mathbf{1}$ 得到的结果，其中 $M$ 是下三角全 1 矩阵。然后在 PyTorch 中取 $\phi = \operatorname{elu} + 1$，对随机输入作数值检验。
::: solution
$M\odot\phi(Q)\phi(K)^\top$ 的第 $i$ 行是 $\big(\phi(\mathbf{q}_i)\cdot\phi(\mathbf{k}_j)\big)_{j\le i}$（$i$ 之后全为零），所以由线性性，分子为 $\sum_{j\le i}(\phi(\mathbf{q}_i)\cdot\phi(\mathbf{k}_j))\mathbf{v}_j = \phi(\mathbf{q}_i)^\top S_i$，分母为 $\phi(\mathbf{q}_i)^\top\mathbf{z}_i$。

```python
import torch, torch.nn.functional as F
torch.manual_seed(0)
T, d_k, d_v = 6, 4, 3
q, k, v = torch.randn(T, d_k), torch.randn(T, d_k), torch.randn(T, d_v)
Q, K = F.elu(q) + 1, F.elu(k) + 1                    # 正特征 (T, d_k)
A = torch.tril(Q @ K.T)                               # 带掩码的权重 (T, T)
quadratic = (A @ v) / A.sum(1, keepdim=True)          # (T, d_v)
S, z, out = torch.zeros(d_k, d_v), torch.zeros(d_k), []
for t in range(T):                                    # 每词元 O(d_k d_v) 工作量
    S, z = S + torch.outer(K[t], v[t]), z + K[t]
    out.append((Q[t] @ S) / (Q[t] @ z))
print(torch.allclose(quadratic, torch.stack(out), atol=1e-5))   # True
```
:::
:::

::: exercise 为长上下文做选择 {level=3}
一个聊天模型必须处理 $128{,}000$ 词元的上下文。它有 $L = 32$ 层和 $32$ 个维数 $128$ 的查询头。计算 bfloat16 下每条序列的 KV缓存：(a) 完整 MHA；(b) 带 $8$ 个键值头的 GQA；(c) $8$ 层全局层用 $8$ 个键值头、其余 $24$ 层用 $4096$ 的滑动窗口。讨论每种设计各放弃了什么。
::: solution
(a) 每词元 $2\cdot32\cdot32\cdot128\cdot2 = 524{,}288$ 字节，$128{,}000$ 词元：$6.7\times10^{10}$ 字节 $\approx62.5$ GiB。(b) 四分之一：$\approx15.6$ GiB。(c) 全局层缓存所有词元，$8$ 层 $\cdot2\cdot8\cdot128\cdot2 = 32{,}768$ 字节每词元，$\approx3.9$ GiB；窗口层每层只缓存 $4096$ 个词元，$24\cdot2\cdot8\cdot128\cdot2\cdot4096\approx0.4$ GiB；合计 $\approx4.3$ GiB。方案 (a) 让每个头保留自己对过去的完整视野，但服务开销大到不现实；(b) 因共享键值而损失一点质量；(c) 此外还在四分之三的层里放弃精确的长程访问，靠八个全局层承担整个上下文的检索——对长聊天通常是合算的权衡，但必须用长上下文评测来检验。
:::
:::

::: exercise softmax 核的随机特征 {level=3}
设 $\mathbf{w}\sim\mathcal{N}(\mathbf{0}, I_d)$，定义 $\phi_{\mathbf{w}}(\mathbf{x}) = \exp\big(\mathbf{w}\cdot\mathbf{x} - \tfrac12\lVert\mathbf{x}\rVert^2\big)$。证明 $\E_{\mathbf{w}}\big[\phi_{\mathbf{w}}(\mathbf{q})\,\phi_{\mathbf{w}}(\mathbf{k})\big] = \exp(\mathbf{q}\cdot\mathbf{k})$。解释对 $r$ 个随机向量 $\mathbf{w}$ 取平均如何给出一个可用于线性注意力、近似 softmax 注意力的特征映射，以及为什么它使用取正值的特征。（对标准正态的 $\mathbf{w}$，使用 $\E[e^{\mathbf{w}\cdot\mathbf{u}}] = e^{\lVert\mathbf{u}\rVert^2/2}$。）
::: solution
$\phi_{\mathbf{w}}(\mathbf{q})\phi_{\mathbf{w}}(\mathbf{k}) = \exp\big(\mathbf{w}\cdot(\mathbf{q} + \mathbf{k}) - \tfrac12\lVert\mathbf{q}\rVert^2 - \tfrac12\lVert\mathbf{k}\rVert^2\big)$。取期望，$\E[e^{\mathbf{w}\cdot(\mathbf{q}+\mathbf{k})}] = e^{\lVert\mathbf{q} + \mathbf{k}\rVert^2/2}$，而 $\tfrac12\lVert\mathbf{q} + \mathbf{k}\rVert^2 - \tfrac12\lVert\mathbf{q}\rVert^2 - \tfrac12\lVert\mathbf{k}\rVert^2 = \mathbf{q}\cdot\mathbf{k}$。于是期望为 $\exp(\mathbf{q}\cdot\mathbf{k})$。取 $r$ 个独立样本 $\mathbf{w}_1, \dots, \mathbf{w}_r$，向量 $\phi(\mathbf{x}) = r^{-1/2}\big(\phi_{\mathbf{w}_1}(\mathbf{x}), \dots, \phi_{\mathbf{w}_r}(\mathbf{x})\big)$ 满足 $\phi(\mathbf{q})\cdot\phi(\mathbf{k})\approx\exp(\mathbf{q}\cdot\mathbf{k})$，即未归一化的 softmax 权重（把 $\mathbf{q}$、$\mathbf{k}$ 乘以 $d_k^{-1/4}$ 以纳入 $1/\sqrt{d_k}$）。取正值的特征保证每个估计出的权重为正，于是 [[#def-linear]] 中的分母不会接近零或为负；用正弦与余弦构造的特征可能为负，会使估计不稳定。用 $200{,}000$ 个样本作数值检验，一对随机向量得到 $1.2256$，精确值为 $1.2273$。
:::
:::
