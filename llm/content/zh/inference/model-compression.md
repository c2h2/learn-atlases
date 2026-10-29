量化（[[inference/quantisation]]）保留每个权重，只是用更少的位存放。让模型变便宜的其余道路改变的是*哪些*计算发生。**蒸馏**训练一个更小的模型去模仿更大的模型。**剪枝**移除权重、神经元、注意力头乃至整层。**提前退出**则一旦某个中间层足够自信，就不再为该词元继续计算。本章从推理一侧考察它们：在真实硬件上各能省下多少字节与 FLOPs，哪些方法只需少量校准数据就能在训练后施加，哪些需要重新训练。

蒸馏的训练一面——损失函数、学生从教师的分布里学什么、蒸馏推理轨迹——是[[post-training/distillation]]的主题；在这里，它主要作为修复剪枝后模型的那一步出现。本章大部分篇幅属于剪枝，因为“参数更少”与“推理更快”之间的鸿沟在这里最宽：一个把一半权重置零的模型，在 GPU 上通常一点都不更快——除非这些零落在硬件看得懂的模式上。

## 一段话讲蒸馏 {#sec-distil}

::: definition 知识蒸馏 {#def-kd}
给定训练好的**教师**$p_T(\cdot\mid x_{<t})$与更小的**学生**$p_\theta$，**蒸馏**在上下文的语料上最小化两个下一词元分布之间的一个散度来训练学生，通常为

$$
\mathcal{L}_{\text{KD}}(\theta) = \E_{x}\sum_t\operatorname{KL}\big(p_T(\cdot\mid x_{<t})\ \big\|\ p_\theta(\cdot\mid x_{<t})\big),
$$

并可能在升高的温度下进行、再与普通的下一词元损失混合（Hinton、Vinyals 与 Dean，2015）。**序列级**蒸馏则改为在教师生成的文本上训练学生。
:::

就推理而言，蒸馏在三个地方要紧。它产出可直接顶替大模型服务的小模型；它产出投机解码的**草稿模型**，其价值取决于与目标模型的接近程度（[[inference/speculative-decoding]]）；它还**修复**剪枝后的模型，如下文所见。它的代价是一次训练——远小于预训练，但也不是训练后量化所需的那几分钟校准。细节以及 logit 级与序列级蒸馏的取舍见[[post-training/distillation]]。

## 剪枝：能去掉什么 {#sec-pruning}

::: definition 剪枝与稀疏模式 {#def-pruning}
对权重矩阵$W$**剪枝**，就是用一个二值**掩码**$M$把它换成$M\odot W$，必要时再调整幸存的权重。**稀疏度**是零所占的比例。按零的分布模式分：

- **非结构化**：任意的单个权重都可以为零。
- **半结构化（$N{:}M$）**：沿每行每$M$个连续权重一组，非零者至多$N$个；**2:4**稀疏（四个中留两个）有硬件支持。
- **结构化**：整行或整列被移除——MLP 的神经元、注意力头、嵌入通道乃至整层——留下一个更小的稠密模型。
:::

这些模式以精度换速度。非结构化剪枝的自由最多，给定稀疏度下精度损失最小，但它留下的矩阵形状不变、零散落其间，稠密矩阵乘法硬件无法跳过。结构化剪枝产出在任何硬件上都更快的更小的稠密模型，但一次砍掉整个单元，通常需要重新训练才能恢复。半结构化稀疏介于两者之间。

### 稀疏矩阵有多大？ {#sec-storage}

::: proposition 稀疏格式的存储 {#prop-storage}
一个有$m$个元素、每个$b$字节、密度为$\rho$（非零比例）的矩阵需要

1. 稠密存储$mb$字节；
2. 压缩行格式约$\rho m(b + c)$字节——每个非零值配一个$c$字节的列下标（另有可忽略不计的行指针数组）——只有当$\rho < b/(b + c)$时才比稠密小；
3. $N{:}M$格式$\tfrac{N}{M}m\,b + \tfrac{N}{M}m\,\lceil\log_2M\rceil/8$字节——每个保留值附上它在组内的位置；16 位值的 2:4 格式这是稠密的$\tfrac{2\cdot16 + 2\cdot2}{4\cdot16} = 0.5625$。
:::

::: proof
稠密存储是显然的。压缩行存储保留$\rho m$个值与同样多个列下标，即$\rho m(b + c)$字节，外加每行一个指针；当$\rho(b + c) < b$时它小于$mb$。$N{:}M$格式中每$M$个权重一组保留$N$个值，每个值再配组内下标，需$\lceil\log_2M\rceil$比特：2:4 即每$4$个权重存$2$个值与$2\times2$比特，也就是$(2b\cdot8 + 4)$比特对$4b\cdot8$比特，$b = 2$时为$36/64 = 0.5625$。
:::

16 位值配 32 位下标时，压缩行矩阵只在密度低于$1/3$时才比稠密小；$50\%$稀疏时它反而*大$1.5$倍*。速度更糟：稀疏内核访存不规则，在 GPU 上通常只有稀疏度极高时才胜过稠密内核。这就是大语言模型的非结构化剪枝无论多精确、对 GPU 服务而言基本只有研究价值的原因，也是 2:4 模式存在的理由：NVIDIA 随 2020 年的 A100 一代引入了支持它的稀疏张量核心（Mishra 等，2021），把 2:4 稀疏矩阵的峰值算术速率翻倍，并按上面$0.5625$的比例存储。

::: example 2:4 稀疏买到了什么 {#ex-24}
一个含$8\times10^9$参数的 bfloat16 模型，所有线性层都剪到 2:4 稀疏（假设参数全在线性层里）。估算 (a) 权重显存；(b) 访存受限解码步的最好情形加速比与 (c) 计算受限预填充的最好情形加速比；(d) 若剩余权重再量化到 8 比特，情况有何变化。
::: solution
(a) $16\text{ GB}\times0.5625 = 9$ GB。(b) 访存受限步的时间与读取的字节数成正比，故至多快$1/0.5625 = 1.78$倍（实际更少，因为缓存读取不变，[[inference/batching-serving#prop-attn-intensity]]）。(c) 稀疏张量核心使峰值速率翻倍，故至多$2\times$；实测端到端增益更小，因为并非每个运算都是稀疏矩阵乘。(d) 8 位值时为$(2\cdot8 + 4)/(4\cdot16) = 0.3125$，即 bfloat16 稠密模型的$5$ GB——两项技术可以叠加，SparseGPT 把两者合而为之便是证明。
:::
:::

::: widget plot
f: 3*x; 1; 0.5625; 0.5
x: 0, 1
y: 0, 2
labels: compressed rows (16-bit values, 32-bit indices); dense; 2:4 (16-bit values, 2-bit indices); ideal (values only, 50%)
points: 0.333, 1; 0.5, 1.5
caption: 相对稠密 16 位矩阵的存储，横轴为密度$\rho$（保留权重的比例），见[[#prop-storage]]。通用稀疏格式只在$\rho = 1/3$以下才胜过稠密（图中已标出）；$\rho = 0.5$时反而大$1.5$倍。2:4 格式恰好存下一半的值、每个值另加$2$比特位置信息，为稠密的$0.5625$，且有硬件支持。
:::

## 该剪什么 {#sec-criteria}

哪些权重最不要紧？答案取决于“要紧”指什么，而训练之后的自然含义与[[inference/quantisation#def-layerwise]]相同：在代表性输入上每层输出的变化。剪去权重$w_{rj}$就是把它量化为零，于是那一章的理论直接适用；而三个常用的判据，恰好是同一目标在逐渐减弱的三个假设下的形态。

::: proposition 剪枝判据的层级 {#prop-criteria}
设某层计算$\mathbf{y} = W\mathbf{x}$，输入的二阶矩矩阵为$\Sigma = \E[\mathbf{x}\mathbf{x}^\top]$（由校准数据以$H = XX^\top/n$估计）。从第$r$行去掉一组权重$S_r$而*不调整其余权重*，期望平方输出误差增加$\mathbf{u}^\top\Sigma\mathbf{u}$，其中$\mathbf{u}$存放被去掉的权重。于是：

1. 若$\Sigma = \sigma^2I$（各向同性输入），误差为$\sigma^2\sum_{j\in S_r}w_{rj}^2$，去掉幅值最小的权重最优（**幅值剪枝**）；
2. 若$\Sigma$为对角矩阵、对角元为$\sigma_j^2$，误差为$\sum_{j\in S_r}w_{rj}^2\sigma_j^2$，去掉$\lvert w_{rj}\rvert\,\sigma_j$最小的权重最优——差因子$\sqrt n$，正是**Wanda**（Sun 等，2024）的分数$\lvert w_{rj}\rvert\,\lVert X_{j,:}\rVert_2$；
3. 若该行其余权重可以调整，则去掉单个权重$j$的最小误差为$w_{rj}^2/[\Sigma^{-1}]_{jj}$（**最优脑手术**显著性），由[[inference/quantisation#prop-obs]]的补偿更新实现，其中取$e_j = w_{rj}$。
:::

::: proof
输出误差是$(W - \hat W)\mathbf{x}$，其第$r$行为$\mathbf{u}^\top\mathbf{x}$，$\mathbf{u}$为被去权重组成的向量（其余位置为零）。其平方期望为$\E[(\mathbf{u}^\top\mathbf{x})^2] = \mathbf{u}^\top\Sigma\mathbf{u}$。(1) $\Sigma = \sigma^2I$时这是$\sigma^2\lVert\mathbf{u}\rVert^2$，各项$\sigma^2w_{rj}^2$相互独立；要最小代价地去掉$k$个权重，就去掉最小的$k$个。(2) $\Sigma$对角时交叉项消失，代价为$\sum_{j\in S_r}w_{rj}^2\sigma_j^2$；同样的论证适用于分数$\lvert w_{rj}\rvert\sigma_j$，而$\lVert X_{j,:}\rVert_2^2 = n\,H_{jj}$估计$n\sigma_j^2$。(3) 去掉权重$j$就是把它量化为$0$，误差$e_j = w_{rj}$；[[inference/quantisation#prop-obs]]给出其余权重重新优化时的最小值$e_j^2/[\Sigma^{-1}]_{jj}$。
:::

这个层级解释了实证记录。幅值剪枝在较小的网络上成功使用了几十年（Han 等，2015），它假定所有输入同样大——对大语言模型而言错得厉害，因为其激活有离群特征（[[inference/quantisation#sec-outliers]]）：巨大特征上的小权重，比微小特征上的大权重要紧得多。Sun 等发现，对 LLaMA 模型作$50\%$非结构化稀疏的幅值剪枝会使困惑度陡升，而他们的 Wanda 分数——权重乘输入范数、在每个输出行内比较、不更新权重、校准数据只需一次前向传播——已经接近代价高得多的一系列重建方法。

### SparseGPT {#sec-sparsegpt}

**SparseGPT**（Frantar 与 Alistarh，2023）应用了第三层：按 OBS 显著性剪枝，并更新其余权重作补偿，机制与 GPTQ 相同——所有行共享的固定列顺序，使逆黑塞矩阵序列每层只算一次；惰性的分块更新；以及 Cholesky 分解。掩码是自适应选取的：按列分块，用当前（已补偿的）权重计算显著性。Frantar 与 Alistarh 在几个 GPU 小时内把$1750$亿参数的模型（OPT-175B 与 BLOOM-176B）剪到$50\%$–$60\%$的非结构化稀疏，困惑度只有很小的上升，并表明该方法可推广到 2:4 与 4:8 模式、可在单次遍历中与量化结合。他们还观察到模型越大越好剪：给定稀疏度下的相对损失随规模缩小。

::: algorithm 带重建的 OBS 剪枝（一行；简化版 SparseGPT） {#alg-sparsegpt}
1. 对$H = XX^\top + \lambda I$（带阻尼）计算$H^{-1}$。
2. 对每个$B$个连续列组成的块（2:4 时$B = 4$）：用当前的$\mathbf{w}$与$H^{-1}$计算块内每个权重的显著性$w_j^2/[H^{-1}]_{jj}$，把显著性最低的一半标记为待移除。
3. 在块内，对每列$j$依次：若被标记，置$e = w_j/[H^{-1}]_{jj}$，对剩余列更新$w_k\mathrel{-}= e\,[H^{-1}]_{jk}$（$k > j$），并置$w_j = 0$；无论是否标记，都按[[inference/quantisation#eq-schur]]把$j$从$H^{-1}$中删去。
:::

::: example 幅值对 Wanda {#ex-wanda}
某行权重为$(1.0, 0.5)$；对应的输入通道在校准集上的范数为$\lVert X_{1,:}\rVert = 1$与$\lVert X_{2,:}\rVert = 4$，且互不相关。要不去掉一个权重而另一个不更新。每个判据各去掉哪个？由此产生的平方输出误差（对校准词元求和）是多少？
::: solution
幅值去掉$0.5$；误差为$0.5^2\cdot4^2 = 4$。Wanda 的分数为$1.0\cdot1 = 1$与$0.5\cdot4 = 2$，去掉第一个权重，误差为$1.0^2\cdot1^2 = 1$。由于输入不相关，$\Sigma$是对角矩阵，Wanda 的选择在所有“不更新”的剪法中最优（[[#prop-criteria]]）：较小的权重反而更要紧，因为它的输入大四倍。
:::
:::

## 实现 {#sec-code}

清单在一个$16\times32$的层上比较三种剪枝：校准输入相关、通道尺度各不相同（三个通道比平均大$8$倍，八个通道为$0.3$倍）；比较有代表性的幅值剪枝、Wanda 与带重建的 OBS 剪枝，稀疏模式取$50\%$非结构化与 2:4，并检验存储公式。

```python
import math, random
rng = random.Random(0)
d_in, d_out, n = 32, 16, 512
# 校准输入：相关的特征，尺度差异极大（如同 LLM 的激活）
scale = [8.0 if i < 3 else (0.3 if i >= 24 else 1.0) for i in range(d_in)]
A = [[rng.gauss(0, 1) for _ in range(d_in)] for _ in range(d_in)]
Z = [[rng.gauss(0, 1) for _ in range(n)] for _ in range(d_in)]
X = [[scale[i] * sum(A[i][k] * Z[k][c] for k in range(d_in)) / math.sqrt(d_in) for c in range(n)]
     for i in range(d_in)]                                            # (d_in, n)
W = [[rng.gauss(0, 1) for _ in range(d_in)] for _ in range(d_out)]    # (d_out, d_in)

def matmul(A, B): return [[sum(a * b for a, b in zip(r, c)) for c in zip(*B)] for r in A]
def inverse(M):
    m = len(M); A = [row[:] + [float(i == j) for j in range(m)] for i, row in enumerate(M)]
    for c in range(m):
        p = max(range(c, m), key=lambda r: abs(A[r][c])); A[c], A[p] = A[p], A[c]
        piv = A[c][c]; A[c] = [v / piv for v in A[c]]
        for r in range(m):
            if r != c and A[r][c] != 0:
                f = A[r][c]; A[r] = [a - f * b for a, b in zip(A[r], A[c])]
    return [row[m:] for row in A]
Y = matmul(W, X)
def out_err(Wp):
    Yp = matmul(Wp, X)
    return sum((a - b) ** 2 for r1, r2 in zip(Y, Yp) for a, b in zip(r1, r2)) / sum(a * a for r in Y for a in r)

xnorm = [math.sqrt(sum(v * v for v in X[i])) for i in range(d_in)]   # 每个输入通道的 ||X_j||_2
def prune_by_score(score, pattern):
    """模式 'half'：每行去掉分数最低的 50%；'2:4'：每 4 个去掉 2 个。"""
    Wp = []
    for r, row in enumerate(W):
        s = [score(r, j) for j in range(d_in)]
        if pattern == "half":
            drop = set(sorted(range(d_in), key=lambda j: s[j])[:d_in // 2])
        else:
            drop = {j for g in range(0, d_in, 4) for j in sorted(range(g, g + 4), key=lambda j: s[j])[:2]}
        Wp.append([0.0 if j in drop else w for j, w in enumerate(row)])
    return Wp

H = matmul(X, list(map(list, zip(*X))))
damp = 0.01 * sum(H[i][i] for i in range(d_in)) / d_in
Hinv0 = inverse([[H[i][j] + damp * (i == j) for j in range(d_in)] for i in range(d_in)])
def sparsegpt(pattern, block=4):
    """带重建的 OBS 剪枝（简化版 SparseGPT）：列从左到右；每块中选
    显著性 w^2 / [H^-1]_jj 最低的权重，置零并更新其余部分。"""
    Wp = []
    for row in W:
        w = row[:]; Hi = [r[:] for r in Hinv0]
        b = block if pattern == "2:4" else d_in
        drop = set()
        for j in range(d_in):
            if j % b == 0:                                           # 自适应选定本块的掩码
                cols = range(j, j + b)
                sal = sorted(cols, key=lambda c: w[c] ** 2 / Hi[c - j][c - j])
                drop = set(sal[: b // 2])
            if j in drop:
                err = w[j] / Hi[0][0]
                for k in range(1, len(Hi)): w[j + k] -= err * Hi[0][k]
                w[j] = 0.0
            hj = Hi[0][:]                                            # 从 H^-1 中删去剩余的当前列
            Hi = [[Hi[a][c] - Hi[a][0] * hj[c] / hj[0] for c in range(1, len(Hi))] for a in range(1, len(Hi))]
        Wp.append(w)
    return Wp

for pattern in ("half", "2:4"):
    mag = out_err(prune_by_score(lambda r, j: abs(W[r][j]), pattern))
    wanda = out_err(prune_by_score(lambda r, j: abs(W[r][j]) * xnorm[j], pattern))
    sg = out_err(sparsegpt(pattern))
    print(f"50% sparsity ({pattern:4s}): relative output error  magnitude {mag:.3f}  Wanda {wanda:.3f}  "
          f"OBS+update {sg:.3f}")

# 稀疏格式的存储，相对稠密 16 位
for name, ratio in [("2:4, 16-bit values + 2-bit indices", (2 * 16 + 2 * 2) / (4 * 16)),
                    ("CSR at 50% density, 16-bit values + 32-bit column ids", 0.5 * (2 + 4) / 2),
                    ("CSR at 10% density", 0.1 * (2 + 4) / 2)]:
    print(f"{name:55s}: {ratio:.4f} of dense")
```

Output:

```
50% sparsity (half): relative output error  magnitude 0.078  Wanda 0.006  OBS+update 0.006
50% sparsity (2:4 ): relative output error  magnitude 0.139  Wanda 0.080  OBS+update 0.029
2:4, 16-bit values + 2-bit indices                     : 0.5625 of dense
CSR at 50% density, 16-bit values + 32-bit column ids  : 1.5000 of dense
CSR at 10% density                                     : 0.3000 of dense
```

（在重建中，每处理完一列，逆黑塞矩阵就缩掉一行一列，因此下标$0$始终指当前的第$j$列。）输入尺度不等时，幅值剪枝在$50\%$非结构化稀疏下比 Wanda 差十三倍，而 Wanda 与重建法不相上下：这里占主导的效应是输入的尺度，Wanda 恰好捕捉到了它。2:4 模式对每种方法都更难，因为哪怕四个权重都重要，每四个也必须去掉两个；此时靠幸存权重补偿就划得来了，把 Wanda 的误差削减近三倍。这些是合成数据上的单层误差；整个模型的结果取决于误差如何随层传播，要以困惑度与任务准确率来度量。

::: quiz
一个$50\%$非结构化稀疏的模型，以配 32 位下标的标准压缩稀疏格式存放，在只跑稠密内核的 GPU 上服务。与稠密模型相比会发生什么？
- [ ] 运行速度约快一倍，因为省掉了一半乘法
- [x] 稠密内核下并不更快，而稀疏格式占的显存反而比稠密多
- [ ] 显存减半，速度不变
- [ ] 它变成计算受限
::: solution
稠密内核把零和其他数一样乘过去，除非把矩阵转成稀疏格式，否则什么也省不下；而在$50\%$密度下，值加 32 位下标要占稠密存储的$1.5$倍（[[#prop-storage]]），且稀疏内核在这种密度下很少有更快的。只有硬件支持的 2:4 模式才能在 GPU 上把$50\%$稀疏变成实实在在的好处。
:::
:::

## 结构化剪枝 {#sec-structured}

要让模型在所有地方都更快，就得移除整个单元。一个 MLP 神经元是上投影的一列（门控 MLP 中还有门投影的那一列）连同下投影相对应的一行；一个注意力头是查询、键、值与输出投影中的一个切片；一层则是一整个模块。移除一个单元，就精确地删去它的参数与它们的 FLOPs，留下更小的稠密模型。

::: definition 结构的重要性 {#def-importance}
**重要性分数**给可剪的结构排序。常用的取法有：该单元在校准数据上激活的幅度；损失变化的一阶**泰勒**估计$\big\lvert\sum_{w\in\text{该单元}}w\,\partial\mathcal{L}/\partial w\big\rvert$（Molchanov 等，2017）；以及针对整层，看该层对其输入的改变有多小——例如对词元平均的$1 - \cos(\mathbf{h}_{\text{in}}, \mathbf{h}_{\text{out}})$。
:::

语言模型的结构化剪枝几乎总是需要一个**修复**阶段。有代表性的公开做法（各自都是在特定模型上评测过的研究结果）有：LLM-Pruner（Ma 等，2023），剪去成组耦合的结构，再靠短暂的低秩微调恢复；Sheared LLaMA（Xia 等，2024），用学习到的掩码把 Llama 2 7B 剪到$13$亿与$27$亿参数的目标形状，然后继续预训练；以及 Minitron 工作（Muralidharan 等，2024），把一个$150$亿参数模型的宽度与深度剪到$80$亿与$40$亿，再用原模型蒸馏着重训，报告其质量与同样大小、从头训练且只用其一小部分训练词元的模型相当。若干研究（例如 Gromov 等，2024；Men 等，2024）发现，某些开放模型相当一部分较深的层可以在部分基准上只付出较小损失的代价被移除，若在稍加修复之后则更是如此——这是关于那些模型冗余性的观察，不是对任何任务都成立的配方。

::: example 移除 MLP 神经元 {#ex-structured}
某模型有$32$层，宽度$d = 4096$，门控 MLP 的内层宽度$d_{\text{ff}} = 14{,}336$（每个 MLP 三个矩阵：形状为$d\times d_{\text{ff}}$的门投影与上投影、形状为$d_{\text{ff}}\times d$的下投影）。结构化剪枝在每层移除$25\%$的 MLP 神经元。移除了多少参数？MLP 解码步的权重流量缩小为几分之几？
::: solution
每个神经元占$3d = 12{,}288$个参数（门投影与上投影各一列，下投影一行）。每层移除$0.25\cdot14{,}336 = 3584$个神经元，即每层移除$3584\cdot12{,}288 = 4.40\times10^7$个参数、共$1.41\times10^9$个。MLP 权重从$3\cdot4096\cdot14{,}336\cdot32 = 5.64\times10^9$降到$4.23\times10^9$，于是其流量与 FLOPs 在任何硬件上都恰好减少$25\%$——与非结构化稀疏不同，不需要特殊内核。质量能否保住，取决于修复。
:::
:::

## 彩票假说 {#sec-lottery}

剪枝一个训练好的网络，说明它到最后并不需要全部权重。一个稀疏网络能否从一开始就这样训练？Frankle 与 Carbin（2019）在小型视觉网络上给出了影响深远的实证观察：训练一个稠密网络，剪去幅值最小的权重，把幸存者**回退**到它们*最初的初始值*，再训练这个稀疏网络；如此重复（迭代幅值剪枝），找到了原网络$10$–$20\%$大小的子网络，能训练到与完整网络相同的准确率，而且往往更快。若改用新的随机初始值，同样的稀疏架构训练得更差。他们称这样的子网络为**中奖彩票**，并提出**彩票假说**：随机初始化的稠密网络中包含着这样的子网络——单独训练它们便可匹敌完整网络。

这是一个发现，不是定理，且适用范围有限。对较大的网络，回退到初始化行不通；Frankle 等（2020）发现回退到训练的早期时点（百分之几处）即可，并把成功与训练对数据顺序噪声的稳定性联系起来。找到一张彩票需要先训练稠密网络——迭代剪枝还要反复训练——所以它并不降低训练成本；而且彩票是非结构化的，在稠密硬件上不会加快推理。这一假说的意义在于帮助理解为什么过参数化网络易于训练也易于剪枝，并催生了一系列稀疏训练的工作，但它不是大语言模型的压缩方法。

## 提前退出 {#sec-early-exit}

剪枝让每个词元的成本按同样的幅度下降。但词元与词元不同：读完“The capital of France is”，下一个词元在几层之后就一目了然；别处则用得上全部深度。**提前退出**让容易的词元少花计算。

::: definition 提前退出解码 {#def-early-exit}
**提前退出**模型在若干中间层$\ell_1 < \ell_2 < \dots < L$上各接一个输出头（常常共用最后的解嵌入）。每个词元在第$\ell_i$层后计算一个**置信度**——例如中间分布的最大概率，或最大两概率之差——一旦超过阈值$\lambda$，就直接发出该词元，不再运行剩余的层。
:::

::: proposition 提前退出的期望成本 {#prop-early-exit}
若一个词元在第$\ell_i$层后退出，概率为$\pi_i$（$\sum_i\pi_i = 1$，最后一个出口即$L$），且每次退出检查花费$c$个“层当量”，则每词元的期望成本为

$$
\E[\text{成本}] = \sum_i\pi_i\big(\ell_i + i\,c\big)\quad\text{层},
$$

相对完整模型的加速比为$L/\E[\text{成本}]$。
:::

::: proof
在第$i$个出口退出的词元运行了$\ell_i$层，并做了$i$次置信度检查（到第$i$个出口为止每个出口各一次）。对退出分布取期望即得公式。
:::

::: example 批次中的提前退出 {#ex-exit-batch}
出口设在$32$层模型的第$8$、$16$与$32$层之后，每个词元独立地以概率$0.3$、$0.3$与$0.4$在它们处退出。单独一路时，一个解码步平均读取多少层的权重？$4$路和$64$路共同解码的批次呢？
::: solution
单独一路平均读取$0.3\cdot8 + 0.3\cdot16 + 0.4\cdot32 = 20$层的权重。批处理时，只要有*任何*一个词元越过第$8$层继续，第$9$–$16$层就必须读取，其概率为$1 - 0.3^B$；只要有词元越过第$16$层，第$17$–$32$层就必须读取，概率$1 - 0.6^B$。$B = 4$时：$8 + 8(1 - 0.0081) + 16(1 - 0.1296) = 29.9$层。$B = 64$时两个概率到小数点后许多位都是$1$：$32$层全部要读。提前退出为退出的词元省下算术，但访存受限的批处理步几乎什么都省不下，因为总有词元需要深处的层。
:::
:::

有两个障碍使提前退出对自回归模型比对分类器更难。其一是**缺失缓存**：若词元$t$在$32$层中的第$8$层后退出，第$9$–$32$层从未为它计算键和值，而之后运行那些层的词元却要汇聚到它。CALM（Schuster 等，2022）把退出处的隐藏状态向上复制以填补这些缺失的条目（近似地），并校准退出阈值，使输出以给定的概率与完整模型一致；另有设计稍后并行地补算缺失的缓存。其二是**批处理**：同批的词元在不同层退出，批次逐层不均等地缩小，而省下的算术在访存受限的解码步里很难变成省下的时间——这一步仍须为每个仍在运行的词元读取每层的权重。一个避开这两个障碍的替代办法，是把前几层当作投机解码的草稿模型、用完整模型验证：LayerSkip（Elhoushi 等，2024）在把模型训练得使提前退出足够准确之后就是这样做的（[[inference/speculative-decoding]]）。

::: warning “参数减半，成本就减半”
非零参数更少，本身并不意味着搬运的字节更少或时钟周期更短。非结构化的零在稠密内核里和别的数一样费；稀疏格式可能比稠密格式还占显存；提前退出省下的，是一个访存受限的步骤本来也没在花用的算术。剪枝之前，先问是什么资源限制了部署——显存容量、显存带宽还是算术——再问稀疏模式在目标硬件上是否真的减少那种资源。
:::

::: widget plot
f: 1-exp(-x); 1-exp(-x)*(1+x+x^2/2)
x: 0, 5
y: 0, 1
labels: fraction of weights pruned; fraction of squared norm removed
vlines: 0.693
caption: 对尺度为$1$的拉普拉斯分布的权重作幅值剪枝，横轴为阈值$u$：$\lvert w\rvert < u$的权重被移除。$u = \ln 2$（虚线）处一半权重消失了，但只占$\sum w^2$的$3.3\%$——即各向同性输入下的误差（[[#prop-criteria]]）。在这一度量下稀疏之所以便宜，是因为多数权重都很小；大语言模型的难处在于输入远非各向同性。
:::

::: history
LeCun、Denker 与 Solla 的“最优脑损伤”（optimal brain damage，1990）按对角二阶显著性剪枝权重；Hassibi 与 Stork 的“最优脑手术”（optimal brain surgeon，1993）使用完整的逆黑塞矩阵与补偿更新。Han、Pool、Tran 与 Dally（2015）以及 Han、Mao 与 Dally 的 Deep Compression（2016）使“幅值剪枝加再训练”成为卷积网络的标准做法。Hinton、Vinyals 与 Dean（2015）为知识蒸馏命名，其基础是 Buciluǎ、Caruana 与 Niculescu-Mizil（2006）的模型压缩；Kim 与 Rush（2016）引入序列级蒸馏。Frankle 与 Carbin 提出彩票假说（ICLR 2019）。NVIDIA 的 A100（2020）引入 2:4 稀疏的硬件支持。就大语言模型而言，Frantar 与 Alistarh 的 SparseGPT（ICML 2023）以及 Sun、Liu、Bair 与 Kolter 的 Wanda（ICLR 2024）展示了规模化的单次剪枝。提前退出可追溯到 BranchyNet（Teerapittayanon、McDanel 与 Kung，2016），并经 CALM（Schuster 等，NeurIPS 2022）引入语言生成。
:::

::: summary
- **蒸馏**在学生上按教师的分布训练；对推理而言，它产出小模型、草稿模型以及剪枝后的修复步骤（[[post-training/distillation]]）。
- **非结构化**稀疏精度损失最小，但在 GPU 上很少变快：密度约高于$1/3$时，通用稀疏格式比稠密更大。**2:4**稀疏有硬件支持：16 位下存储为稠密的$0.5625$，算术至多$2\times$。**结构化**剪枝产出更小的稠密模型，但需要修复。
- 不更新权重时，剪枝的输出误差为$\mathbf{u}^\top\Sigma\mathbf{u}$：**幅值**剪枝假设各向同性输入，**Wanda**（$\lvert w\rvert\lVert X_j\rVert$）假设对角输入，**OBS/SparseGPT**使用完整的逆黑塞矩阵并用其余权重补偿。
- **彩票假说**是关于可训练稀疏子网络的一个实证发现，不是推理技术。
- **提前退出**在容易的词元上省层，但必须处理缺失缓存与不均齐的批次；其期望成本为$\sum_i\pi_i(\ell_i + ic)$。
- 压缩要对着限制部署的那个资源下手，并在目标硬件与任务上测量。
:::

## 习题

::: exercise 8 位值的 2:4 存储 {level=1 check="0.625"}
一个 8 位值的矩阵以 2:4 格式存储，下标占$2$比特。它占稠密 8 位存储的多少？
::: solution
每四个一组：$2\cdot8 + 2\cdot2 = 20$比特，对$32$比特而言：$20/32 = 0.625$。相对稠密 16 位则是$0.3125$。
:::
:::

::: exercise 盈亏平衡的密度 {level=1 check="0.5"}
一种稀疏格式以 16 位存值、16 位存列下标。密度低于多少时它比稠密 16 位存储更小？
::: solution
由[[#prop-storage]]，$\rho < b/(b + c) = 2/(2 + 2) = 0.5$。
:::
:::

::: exercise 手算幅值剪枝 {level=1 check="0.0426"}
按幅值剪去行$(0.3, -0.05, 0.2, -0.6, 0.01, 0.4)$的$50\%$。在各向同性、单位方差的输入下，期望平方输出误差是多少？
::: solution
幅值最小的三个是$0.01$、$0.05$与$0.2$；去掉它们的代价为$0.0001 + 0.0025 + 0.04 = 0.0426$（[[#prop-criteria]]，取$\sigma^2 = 1$）。保留后的行为$(0.3, 0, 0, -0.6, 0, 0.4)$。
:::
:::

::: exercise 一个 2:4 组 {level=1}
对行$(0.1, -0.7, 0.3, 0.2,\ 0.5, 0.45, -0.05, 0.6)$施行基于幅值的 2:4 剪枝。各向同性输入下的代价是多少？与同一行$50\%$非结构化的幅值剪枝相比如何？
::: solution
第一组保留$-0.7$与$0.3$，去掉$0.1$与$0.2$（代价$0.01 + 0.04 = 0.05$）。第二组保留$0.6$与$0.5$，去掉$0.45$与$-0.05$（代价$0.2025 + 0.0025 = 0.205$）。合计$0.255$。非结构化时：四个最小的幅值是$0.05, 0.1, 0.2, 0.3$，代价$0.0025 + 0.01 + 0.04 + 0.09 = 0.1425$。2:4 的约束逼着去掉了$0.45$，因为第二组里有三个大权重。
:::
:::

::: exercise 提前退出的期望层数 {level=2 check="20"}
一个$32$层模型在$8$、$16$与$32$层后设有出口。词元以概率$0.3$在第$8$层退出，以概率$0.3$在第$16$层退出，其余跑完全部$32$层。忽略检查的成本，每词元平均运行多少层？
::: solution
$0.3\cdot8 + 0.3\cdot16 + 0.4\cdot32 = 2.4 + 4.8 + 12.8 = 20$层，算术上加速$32/20 = 1.6$。若每个出口的检查看作$c = 0.1$层，则另加$0.3\cdot0.1 + 0.3\cdot0.2 + 0.4\cdot0.3 = 0.21$（[[#prop-early-exit]]）。
:::
:::

::: exercise 结构化剪枝移除的参数 {level=2 check="1409286144"}
在[[#ex-structured]]中，精确计算被移除的参数个数。
::: solution
$3\cdot4096\cdot3584\cdot32 = 1{,}409{,}286{,}144$，约$1.41\times10^9$。
:::
:::

::: exercise 解码中 2:4 的最好情形 {level=2 check="1.78"}
一个解码步完全访存受限，其时间与读取的权重字节数成正比（忽略缓存）。16 位值、2 位下标的 2:4 稀疏至多能让它快多少倍？保留两位小数。
::: solution
字节数降为稠密的$0.5625$，故该步至多快$1/0.5625 = 1.78$倍——不到计算受限预填充用得到的$2\times$算术加速。
:::
:::

::: exercise 二维的 OBS 显著性 {level=2}
对某行$\mathbf{w} = (1.0, 0.5)$，$H = \begin{pmatrix}1&0.9\\0.9&1\end{pmatrix}$（输入强相关），计算每个权重的 OBS 显著性，以及*不作*补偿时去掉每个权重的误差。应当去掉哪个？补偿起了什么作用？
::: solution
$H^{-1} = \frac{1}{0.19}\begin{pmatrix}1&-0.9\\-0.9&1\end{pmatrix}$，故$[H^{-1}]_{11} = [H^{-1}]_{22} = 5.263$。显著性：$1.0^2/5.263 = 0.19$与$0.5^2/5.263 = 0.0475$；去掉第二个。它的补偿为$\delta_1 = -\frac{0.5}{5.263}\cdot(-4.737) = 0.45$，于是第一个权重变为$1.45$：两个输入几乎是同一信号，第一个权重便接过了第二个的大部分贡献（$0.5\cdot0.9$）。不作补偿时，去掉第二个的代价是$0.5^2\cdot H_{22} = 0.25$，比补偿后的$0.0475$多五倍不止；去掉第一个则要付$1.0$。输入强相关时，正是补偿使剪枝变得便宜。
:::
:::

::: exercise 设计一个彩票实验 {level=3}
你想检验一个小型 Transformer 语言模型在$80\%$稀疏下是否存在中奖彩票。描述实验流程、支持结论所需的对照，以及在这样的规模上什么结果会构成对假说的不利证据。
::: solution
从初始化$\theta_0$把稠密模型训练到收敛，在早期步$k$（如训练的$1$–$5\%$）记录$\theta_k$。迭代幅值剪枝：按幅值剪去剩余权重的$20\%$（全局或逐层），把幸存者回退到$\theta_k$（另设回退到$\theta_0$的一组），用同样的调度重新训练，如此重复到$80\%$稀疏。对照：(i) 同样的掩码配新的随机初始值（检验要紧的是否不只是架构、还有初始值）；(ii) 逐层稀疏度相同的随机掩码、同样回退；(iii) 训练同样多步的稠密模型；每组各跑多个种子，报告带置信区间的验证损失。若回退后的彩票在噪声范围内匹敌稠密模型的损失、而对照(i)(ii)明显更差，假说在这一规模上得到支持。不利的证据有：彩票只有靠很晚的回退才能匹敌（这把结论弱化到“一个部分训练过的网络包含一个好的稀疏子网络”）；或者对照与彩票打平（稀疏本身就够了，与彩票无关）。
:::
:::

::: exercise 量化结合的 SparseGPT {level=3}
把清单中的`sparsegpt`改造成：每个*保留*的权重在其所在列被处理时，同时量化到$4$比特（按行的 absmax 缩放因子由原始行算出），其量化误差与剪枝误差同样地补偿。解释为什么这两种操作在该算法中天然地结合在一起。
::: solution
在不剪去第$j$列的分支里，把原权重换成它的量化值，并完全照 GPTQ 的方式传播误差：

```python
s4 = max(abs(v) for v in row) / 7                    # 列循环之前
...
target = 0.0 if j in drop else s4 * max(-8, min(7, round(w[j] / s4)))
err = (w[j] - target) / Hi[0][0]
for k in range(1, len(Hi)): w[j + k] -= err * Hi[0][k]
w[j] = target
```

剪枝就是量化到单一的值$0$，所以两者都是“把第$j$列固定到一个值并补偿”，用的是同样的逆黑塞更新（[[inference/quantisation#prop-obs]）与同样的从$H^{-1}$删去第$j$列。把两者合在一起做，意味着后面的列同时对两种误差作补偿——Frantar 与 Alistarh 发现这比先剪枝再分别量化更精确。按清单的种子，重建法的相对输出误差从$0.006$升到$0.012$（非结构化）、从$0.029$升到$0.036$（2:4）——比只剪枝时更大，而 2:4 配 4 位值的存储则降到稠密的约$(2\cdot4 + 2\cdot2)/(4\cdot16)\approx0.19$。
:::
:::
