数据并行即便完全分片，每台设备仍在自己的微批次上运行整个模型。随着模型变大，这件事在两个方面难以为继。一层在一个微批次上的计算可能慢过一块设备的承受力，其激活值也可能大到放不下；而在 ZeRO-3 之下，每层每步的参数全收集会占满网络。出路是把模型本身切开：每层内部的矩阵（**张量并行**）、词元的序列（**序列并行与上下文并行**）、层的堆叠（**流水线并行**），以及混合专家模型中的专家（**专家并行**）。它们各自切分计算的不同维度，各有各的通信模式，而通信模式决定了它可以用在链路层次的哪一级上。

本章从 Transformer 块的结构出发逐一推导这些方案。张量并行方面，我们证明第一个前馈矩阵按列、第二个按行切分只需一次全规约，并数出通信量；流水线并行方面，我们导出空闲比例 $(p - 1)/(m + p - 1)$，并模拟 GPipe 与一前一后（one-forward-one-backward）两种调度；混合专家方面，我们导出负载均衡损失的最小值与全对全交换的代价。这些方案在真实集群上如何组合，在[[scaling/large-runs]]中完整推演。块结构沿用[[transformers/transformer-block]]，专家层沿用[[transformers/mixture-of-experts]]。

## 张量并行 {#sec-tp}

考察一个块的前馈网络 $Z = \operatorname{GeLU}(XA)\,B$，输入 $X\in\R^{n\times h}$（$n$ 个词元），$A\in\R^{h\times4h}$，$B\in\R^{4h\times h}$。要把它切到 $t$ 台设备上，得决定如何划分 $A$ 与 $B$。

::: theorem Megatron 的前馈切分 {#thm-megatron-mlp}
把 $A$ 按列、$B$ 按行划成 $t$ 块，

$$
A = \begin{bmatrix}A_1 & A_2 & \cdots & A_t\end{bmatrix},\qquad B = \begin{bmatrix}B_1\\ B_2\\ \vdots\\ B_t\end{bmatrix},\qquad A_i\in\R^{h\times4h/t},\ B_i\in\R^{4h/t\times h},
$$

并让设备 $i$ 持有 $A_i$、$B_i$ 以及完整的输入 $X$。则

$$
Z = \sum_{i=1}^{t}\operatorname{GeLU}(XA_i)\,B_i.
$$ {#eq-megatron}

每台设备无须通信即可算出自己的那一项，对 $n\times h$ 的部分结果做一次**全规约**就在每台设备上得到 $Z$。反向传播需要对 $n\times h$ 的输入梯度 $\bar X$ 做一次全规约。此外不再需要任何通信。
:::

::: proof
按列划分给出 $XA = \begin{bmatrix}XA_1 & \cdots & XA_t\end{bmatrix}$。GeLU 逐元素作用，因而对每个列块独立起作用：$\operatorname{GeLU}(XA) = \begin{bmatrix}\operatorname{GeLU}(XA_1) & \cdots & \operatorname{GeLU}(XA_t)\end{bmatrix} = \begin{bmatrix}Y_1 & \cdots & Y_t\end{bmatrix}$。分块行向量乘分块列向量等于对应块乘积之和：$YB = \sum_iY_iB_i$，即[[#eq-megatron]]。

反向：给定 $\bar Z$（因 $Z$ 相同而在各设备上相同），设备 $i$ 由本地数据算出 $\bar B_i = Y_i\T\bar Z$、$\bar Y_i = \bar ZB_i\T$、逐元素的 GeLU 反向、$\bar A_i = X\T\bar{(XA_i)}$，以及输入梯度中属于它的份额 $\bar X^{(i)} = \bar{(XA_i)}A_i\T$。由于 $X$ 馈入每台设备的那一项，$\bar X = \sum_i\bar X^{(i)}$，由一次全规约算出。
:::

另一种选择——按行划分 $A$，让每台设备持有输入维的一个切片——行不通：那时 $XA = \sum_iX_iA_i$ 是一个和，而 $\operatorname{GeLU}(\sum_iX_iA_i)\ne\sum_i\operatorname{GeLU}(X_iA_i)$，所以必须**先**把部分乘积求和、**再**过非线性，多出一次全规约。Shoeybi et al.（2019）正因如此选择了先列后行的安排。同样的做法适用于 SwiGLU 之类的门控前馈网络，其门控投影与上投影都按列切分。

注意力照同样方式沿头切分。设头数 $a$ 可被 $t$ 整除，设备 $i$ 持有头 $(i-1)a/t + 1,\dots,ia/t$ 对应的 $W_Q, W_K, W_V$ 的列，完全在本地算完这些头的注意力（各头相互独立），并持有输出投影 $W_O$ 相应的行；$W_O$ 之后一次全规约就完成了前向传播。于是一个块需要**前向两次全规约、反向两次**，每次都是 $n\times h$ 的激活张量。Megatron-LM 把它们写成一对互逆算子：$f$ 在前向是恒等、反向是全规约，$g$ 反之，分别放在每个子层的入口与出口。

::: widget graph
nodes: X@0,1; GeLU(XA1)@1,2; GeLU(XA2)@1,0; Y1B1@2,2; Y2B2@2,0; all-reduce@3,1; Z@4,1
edges: X>GeLU(XA1); X>GeLU(XA2); GeLU(XA1)>Y1B1; GeLU(XA2)>Y2B2; Y1B1>all-reduce; Y2B2>all-reduce; all-reduce>Z
caption: [[#thm-megatron-mlp]]的张量并行前馈网络在 $t = 2$ 台设备上的数据流。输入 $X$ 复制在各设备上；每台设备乘以自己的列块 $A_i$、在本地施加 GeLU、再乘自己的行块 $B_i$，一次全规约把两个 $n\times h$ 的部分输出相加。注意力按头照同样方式切分。
:::

::: proposition 张量并行的通信量 {#prop-tp-comm}
对宽度 $h$ 的块，每设备以 16 位处理 $n$ 个词元，张量并行度为 $t$、全规约取环形，则每设备每块每个训练步发送

$$
4\cdot2\,\frac{t-1}{t}\cdot2nh\ \text{字节},
$$

而它执行约 $72nh^2/t$ FLOPs（不含注意力打分）。当 $t$ 较大时，FLOPs 与字节之比 $\approx\frac{72nh^2/t}{16nh} = \frac{9h}{2t}$。
:::

::: proof
每块每步四次全规约（两次前向、两次反向），每次 $n\times h$ 个元素、每个 $2$ 字节，由[[scaling/data-parallelism#thm-ring]]每设备花费 $2\frac{t-1}{t}\cdot2nh$ 字节。一个块的训练 FLOPs 为 $72nh^2$（[[scaling/flops-memory#eq-step-flops]]，不含注意力项），由 $t$ 台设备均分。相除得 $\frac{72nh^2/t}{16nh(t-1)/t} = \frac{9h}{2(t-1)}\approx\frac{9h}{2t}$。
:::

这个比值与 $n$ 无关：把批次做大并不能帮张量并行摊薄通信，而它随 $t$ 增大反而变小。$h = 8192$、$t = 8$ 时，设备每 $4600$ 个 FLOPs 就要搬运一个字节，$450$ GB/s 的链路只有在大部分通信被重叠掉的情况下才供得起约 $400$ TFLOP/s 的实得算力；换到 $50$ GB/s 的网络上则完全不行。因此张量并行用在**服务器内部**、其最快的链路上，通常 $t\le8$。

::: example 服务器内外的张量并行 {#ex-tp}
$h = 8192$ 的块每设备处理 $n = 4096$ 个词元，$t = 8$。设设备在矩阵乘法上实得 $400$ TFLOP/s。估算每块每步的计算与通信时间，分别取服务器内 $450$ GB/s 链路与 $50$ GB/s 网络。
::: solution
计算：$72\cdot4096\cdot8192^2/8 = 2.47\times10^{12}$ FLOPs，$6.2$ 毫秒。通信：每次全规约每设备搬运 $2\cdot\frac78\cdot2\cdot4096\cdot8192 = 117$ MB；四次共 $470$ MB。服务器内：$470\text{ MB}/450\text{ GB/s} = 1.0$ 毫秒，占计算时间的 $17\%$——可以接受，且能部分重叠。跨网络：$9.4$ 毫秒，比计算本身还长。所以规则是：张量并行留在高速域内。
:::
:::

嵌入层与输出层沿词表切分：每台设备持有嵌入矩阵的 $V/t$ 行，计算自己词表切片的 logits；softmax 交叉熵通过对逐词元的最大值与指数和做全规约来计算，从而始终不必收集完整的 $n\times V$ logits 矩阵。

## 序列并行与上下文并行 {#sec-sp}

张量并行切分了矩阵乘法，但夹在中间的运算——层归一化、dropout、残差加法——在 $t$ 台设备上各复制一份，它们的激活值也一样，而按[[scaling/flops-memory#thm-activations]]，激活值占总量的很大一块。

::: definition 序列并行 {#def-sp}
**序列并行**（sequence parallelism；Korthikanti et al., 2022）把非张量并行区域的词元沿序列维切到同样这 $t$ 台设备上。张量并行的每次全规约被替换为一次**规约-分散**（每台设备得到 $n/t$ 个词元的求和输出，在其上施加归一化与残差加法），并在下一个张量并行区域的开头接一次**全收集**（为矩阵乘法重新拼出完整序列）。
:::

由于一次全规约**本来**就是规约-分散接全收集，序列并行不增加任何通信；它只是利用其间的空隙干了有用的活，并把复制的激活值除以 $t$。这正是[[scaling/flops-memory#thm-activations]]中的 $1/t$ 如今对每一项都成立的原因。

::: example 序列并行省下什么 {#ex-sp}
Korthikanti et al.（2022）给出仅有张量并行时每块的激活显存为 $sbh\,(10 + 24/t + 5as/(ht))$ 字节：其中归一化输入与 dropout 掩码的 $10sbh$ 是复制的。对 GPT-3 的尺寸（$s = 2048$、$b = 1$、$h = 12{,}288$、$a = 96$）取 $t = 8$，比较三种情形：仅张量并行、加上序列并行、再加选择性重计算。
::: solution
$sbh = 2520$ 万，且 $5as/(ht) = 10$。仅张量并行：$sbh(10 + 3 + 10) = 579$ MB 每块。加序列并行：$sbh(34/8 + 10) = 14.25\,sbh = 359$ MB。再加选择性重计算去掉打分项：$4.25\,sbh = 107$ MB，而完全不并行时每块要 $2.87$ GB（[[scaling/flops-memory]]）。$96$ 个块合计：每设备 $55.6$、$34.4$、$10.3$ GB。
:::
:::

上下文极长时连这也不够用：注意力的代价随 $n^2$ 增长，一条百万词元序列的激活值放不进一台服务器。**上下文并行**在包括注意力在内的整个块上，把序列切到 $c$ 台设备上。注意力是唯一混合词元的运算，因而也是唯一需要通信的运算。

::: algorithm 环形注意力 {#alg-ring-attention}
把序列分成 $c$ 块；设备 $j$ 持有第 $j$ 块的查询、键与值。
1. 每台设备计算自己的查询对自己键、值的注意力，保留在线 softmax 的运行最大值、归一化因子与输出（[[transformers/attention-complexity]]）。
2. 进行 $c - 1$ 步：每台设备把自己持有的键、值块沿环传给下一台设备，并从上一台接回一块；对收到的块做注意力，更新自己的 softmax 运行统计量与输出。下一块的传输与当前块的计算重叠。
3. $c - 1$ 步后，每个查询都已注意到每个键；归一化后的输出是精确的。
:::

环形注意力（Liu、Zaharia 与 Abbeel，2023）每层把每台设备的键和值移动 $c - 1$ 次，但每步的计算量——两块之间的注意力，随块长成平方——比通信增长得快，块足够长就能把它完全藏住。在因果掩码下，朴素的连续切分会让持有第一块的设备几乎无事可做；实现里给每台设备分配序列两端各一块来平衡工作量。另一种做法 **DeepSpeed-Ulysses**（Jacobs et al., 2023）用全对全交换，先按序列分片的布局换成分片到各头的布局做注意力、再换回来，这要求头数能被 $c$ 整除。

## 流水线并行 {#sec-pp}

::: definition 流水线并行 {#def-pp}
**流水线并行**把 $L$ 层分成 $p$ 个连续的**阶段**，阶段 $s$ 放在设备（或设备组）$s$ 上。一个批次切成 $m$ 个**微批次**。每个微批次的前向传播沿阶段 $1,\dots,p$ 流过，把激活值从每个阶段送到下一个；其反向传播从 $p$ 传回 $1$，送回激活梯度。一个**调度**规定各阶段处理各微批次前向与反向的先后次序。同步（**冲刷**，flushing）调度指所有微批次都完成反向之后才做优化器步。
:::

通信很轻：只有阶段边界处的激活值，每个方向每个微批次 $n\times h$，点对点。流水线并行因此可以跨网络。它的代价是空闲时间。

::: theorem 流水线气泡 {#thm-bubble}
设每个阶段对一个微批次的前向耗时 $t_f$、反向耗时 $t_b$，忽略通信时间。GPipe 调度——先做完全部 $m$ 次前向，再做全部 $m$ 次反向——一步耗时

$$
T = (m + p - 1)(t_f + t_b),
$$

设备时间中空闲的比例（**气泡**）为

$$
\frac{p - 1}{m + p - 1}.
$$ {#eq-bubble}
:::

::: proof
**前向段。**微批次 $i$（$i = 1,\dots,m$）要能在阶段 $s$ 开工，必须它已在阶段 $s - 1$ 完工、且阶段 $s$ 已做完微批次 $i - 1$。归纳可知它在阶段 $s$ 于时刻 $(i + s - 1)t_f$ 完工：$i = s = 1$ 时成立；若微批次 $i$ 在阶段 $s - 1$ 于 $(i + s - 2)t_f$ 完工、微批次 $i - 1$ 在阶段 $s$ 也于 $(i + s - 2)t_f$ 完工，两个约束都在 $(i + s - 2)t_f$ 放行它，再过 $t_f$ 它完工。最后一个微批次在 $(m + p - 1)t_f$ 离开最后一个阶段。

**反向段。**对称地，反向传播从阶段 $p$ 进入、向阶段 $1$ 行进；最后一次在反向段开始后 $(m + p - 1)t_b$ 完工。（阶段 $p$ 一做完自己最后一次前向就能开始第一次反向；反向段在阶段 $p$ 于时刻 $(m + p - 1)t_f$ 开始，更早的各阶段按同样节奏跟进，故总时间是两段之和。）

**气泡。**每台设备一步的有效工作为 $m(t_f + t_b)$，而步长为 $(m + p - 1)(t_f + t_b)$，空闲比例为 $1 - m/(m + p - 1) = (p - 1)/(m + p - 1)$。
:::

气泡就是流水线的填充与排空：开头，阶段 $s$ 要空等 $(s - 1)t_f$ 才等到第一个微批次；结尾，它在等后面的阶段把反向传回来。只有 $m\gg p$ 时气泡才小。但在 GPipe 里，一个阶段必须把全部 $m$ 个微批次的激活值保留到它们的反向开始为止，显存随 $m$ 增长——而我们恰恰想把 $m$ 做大。

::: algorithm 一前一后（1F1B）调度 {#alg-1f1b}
阶段 $s$（编号 $0,\dots,p-1$）：
1. **预热**：先做前 $p - 1 - s$ 个微批次的前向。
2. **稳态**：交替做一次前向（下一个微批次）与一次反向（已做完前向的最老微批次），直到前向全部做完。
3. **冷却**：把剩下的反向做完。
:::

1F1B 出自 PipeDream（Narayanan et al., 2019）的同步形式“PipeDream-Flush”（Narayanan et al., 2021），它让每个微批次的反向一开始就绪就尽早开跑。它的气泡与 GPipe 相同，但阶段 $s$ 一次至多持有 $p - s$ 个微批次的激活值——至多 $p$ 个、与 $m$ 无关——于是可以增大批次里的 $m$ 来缩小气泡而不增加显存。下面的程序取 $t_b = 2t_f$ 模拟两种调度，每个阶段在其操作的依赖一满足就按调度次序处理之。

```python
def schedule(p, m, kind):
    """Per-stage operation order for GPipe or 1F1B: ('F', i) / ('B', i)."""
    orders = []
    for s in range(p):
        if kind == "gpipe":
            ops = [("F", i) for i in range(m)] + [("B", i) for i in range(m)]
        else:                                          # 1F1B（PipeDream-Flush）
            warm = min(p - 1 - s, m)
            ops = [("F", i) for i in range(warm)]
            f, b = warm, 0
            while b < m:
                if f < m:
                    ops.append(("F", f)); f += 1
                ops.append(("B", b)); b += 1
        orders.append(ops)
    return orders

def simulate(p, m, kind, tf=1.0, tb=2.0):
    """Each op starts when its stage is free and its dependency has finished:
    F(s,i) needs F(s-1,i); B(s,i) needs B(s+1,i) (and, on the last stage, F(s,i))."""
    orders = schedule(p, m, kind)
    done, free, pos = {}, [0.0] * p, [0] * p
    in_flight, peak = [0] * p, [0] * p
    while any(pos[s] < len(orders[s]) for s in range(p)):
        progressed = False
        for s in range(p):
            if pos[s] == len(orders[s]):
                continue
            op, i = orders[s][pos[s]]
            dep = (s - 1, "F", i) if op == "F" else (s + 1, "B", i)
            if op == "F" and s == 0:
                ready = 0.0
            elif op == "B" and s == p - 1:
                ready = done.get((s, "F", i))
            else:
                ready = done.get((dep[0], dep[1], i))
            if ready is None:
                continue
            start = max(free[s], ready)
            done[(s, op, i)] = free[s] = start + (tf if op == "F" else tb)
            in_flight[s] += 1 if op == "F" else -1
            peak[s] = max(peak[s], in_flight[s])
            pos[s] += 1
            progressed = True
        assert progressed, "deadlock"
    T = max(free)
    return T, 1 - m * (tf + tb) / T, max(peak)

print(" p   m  schedule  step time  bubble  (p-1)/(m+p-1)  peak micro-batches stored")
for p, m in ((4, 4), (4, 16), (8, 8), (8, 32)):
    for kind in ("gpipe", "1f1b"):
        T, bubble, peak = simulate(p, m, kind)
        print(f"{p:2d} {m:3d}  {kind:8s}  {T:8.1f}  {bubble:6.3f}  {(p - 1) / (m + p - 1):12.3f}"
              f"  {peak:4d}")
```

```text
 p   m  schedule  step time  bubble  (p-1)/(m+p-1)  peak micro-batches stored
 4   4  gpipe         21.0   0.429         0.429     4
 4   4  1f1b          21.0   0.429         0.429     4
 4  16  gpipe         57.0   0.158         0.158    16
 4  16  1f1b          57.0   0.158         0.158     4
 8   8  gpipe         45.0   0.467         0.467     8
 8   8  1f1b          45.0   0.467         0.467     8
 8  32  gpipe        117.0   0.179         0.179    32
 8  32  1f1b         117.0   0.179         0.179     8
```

两种调度都耗时 $(m + p - 1)(t_f + t_b)$，与[[#eq-bubble]]严丝合缝；1F1B 的峰值显存是 $p$ 个微批次，GPipe 则是 $m$ 个。

::: proposition 交错调度 {#prop-interleaved}
若每台设备持有 $v$ 个互不相邻的**虚拟阶段**（各含 $L/(pv)$ 层的块，设备 $s$ 持有第 $s, s + p, s + 2p, \dots$ 块），填充与排空耗时 $(p - 1)$ 个时长为 $(t_f + t_b)/v$ 的“块时刻”，气泡比例变为

$$
\frac{(p - 1)/v}{m + (p - 1)/v} = \frac{p - 1}{vm + p - 1}.
$$
:::

::: proof
每设备的有效工作不变，仍是 $m(t_f + t_b)$，只是被分成 $mv$ 个时长 $(t_f + t_b)/v$ 的块行程。流水线共有 $pv$ 个块阶段，但同一设备上的相邻块阶段首尾相接、无须填充：微批次经 $p - 1$ 个块时刻第一次抵达设备 $p$，排空对称，故每设备空闲 $(p - 1)(t_f + t_b)/v$，比不交错小 $v$ 倍。空闲比例为 $\frac{(p-1)/v}{m + (p-1)/v}$。
:::

交错调度（Narayanan et al., 2021）以 $v$ 倍的点对点传输为代价把气泡除以 $v$。**零气泡**调度（Qi et al., 2024）更进一步：把每次反向拆成输入梯度的计算（前一阶段在等它）与权重梯度的计算（谁也不等，可以拿来填气泡）。

::: widget plot
f: (p - 1)/(x + p - 1); (p - 1)/(v*x + p - 1)
x: 1, 64
y: 0, 1
sliders: p=8:2:32:1; v=2:1:8:1
labels: GPipe / 1F1B; interleaved with $v$ chunks per device
caption: 由[[#eq-bubble]]与[[#prop-interleaved]]得出的流水线气泡比例随每步微批次 $m$ 的变化，阶段数为 $p$。要把气泡压在约 $10\%$ 以内，不交错需要 $m\approx9(p-1)$——$p$ 大时这是很大的全局批次——交错则所需为 $1/v$。
:::

::: example 流水线要多深 {#ex-pipeline}
一个模型切成 $p = 16$ 个阶段，全局批次允许每个数据并行副本 $m = 32$ 个微批次。1F1B 的气泡是多大？$v = 4$ 的交错调度呢？1F1B 要把气泡压到 $5\%$ 需要多少个微批次？
::: solution
1F1B：$15/47 = 31.9\%$。交错：$15/(128 + 15) = 10.5\%$。解 $(p - 1)/(m + p - 1) = 0.05$：$m + 15 = 300$，$m = 285$——约为现有微批次数的九倍。深的流水线要么交错，要么减小 $p$、用更多张量并行或数据并行补上。
:::
:::

流水线还有两笔代价值得知道。各阶段必须**负载均衡**：最慢的阶段决定节奏；而且首末两个阶段还担着嵌入层与输出层，它们往往很大（词表 $128$K 词元、$h = 16{,}384$ 时，输出层就有 $20$ 亿参数），所以通常少给这两个阶段分 Transformer 层。另外，流水线并行会让一切需要同时拿到整个模型的事情变复杂，从检查点保存器到依赖层的功能都是如此。

## 专家并行 {#sec-ep}

混合专家（mixture-of-experts，MoE）层用 $E$ 个专家网络加一个**路由器**取代前馈网络，路由器把每个词元派给其中 $k$ 个专家（[[transformers/mixture-of-experts]]）。Shazeer et al.（2017）提出带带噪 top-$k$ 路由的稀疏门控 MoE 层；GShard（Lepikhin et al., 2021）在 Transformer 中用 top-$2$ 路由并把专家铺到各设备上；Switch Transformer（Fedus、Zoph 与 Shazeer，2022）把它简化为 top-$1$。总参数量随 $E$ 增长，每词元的计算只随 $k$ 增长。

::: definition 专家并行 {#def-ep}
**专家并行**度为 $e$ 时，每个 MoE 层的 $E$ 个专家分给 $e$ 台设备、每台 $E/e$ 个；模型其余部分复制（或用别的方案切分），每台设备处理自己的词元。每个 MoE 层中：路由器把每个词元指派给它的专家；一次**全对全**把每个词元的隐向量送到持有其专家的设备（**分发**，dispatch）；每台设备把自己收到的词元过自己的专家；第二次全对全把输出送回各词元的原设备（**合并**，combine）。反向传播反向重做这两次交换。
:::

::: proposition 专家并行的通信量 {#prop-ep-comm}
设一台设备以 16 位持有 $n$ 个宽 $h$ 的词元，每个词元路由到 $k$ 个专家、专家均匀随机地分布在 $e$ 台设备上，则一次全对全它期望发送

$$
\frac{e - 1}{e}\cdot k\cdot n\cdot2h
$$

字节，一个训练步每个 MoE 层要做四次这样的交换。
:::

::: proof
每个词元按选中的专家各复制一份：$kn$ 个 $2h$ 字节的向量。专家恰在本设备上的那份不必发送；专家均匀放置时这以概率 $1/e$ 发生，故期望发送量为 $(1 - 1/e)\cdot2khn$。前向有分发与合并各一次，反向对应有梯度交换两次：共四次。
:::

全对全的流量没有环形全规约那种带宽最优的结构：每台设备都要同每台说话，因而对网络的对分带宽很敏感。专家并行常被放在服务器内部或某个高速域里；大型 MoE 模型用限制每个词元只路由到少数设备、或通信与计算重叠来控制代价。

上面的流量还假设各专家收到的词元数相等。若路由器把太多词元发给同一个专家，那台设备就成了掉队的短板；固定容量的实现中，超额的词元会被**丢弃**（只沿残差连接原样通过）。

::: definition 容量与负载均衡损失 {#def-balance}
批次有 $T$ 个词元、$E$ 个专家时，**专家容量**为每专家 $\left\lceil\text{cf}\cdot kT/E\right\rceil$ 个词元槽位，其中**容量因子** $\text{cf}\ge1$；超出容量的词元丢弃。Switch Transformer 的**辅助负载均衡损失**为

$$
\mathcal{L}_{\text{aux}} = \alpha\,E\sum_{i=1}^{E}f_iP_i,
$$

其中 $f_i$ 是派给专家 $i$ 的词元比例，$P_i$ 是批次上分配给专家 $i$ 的路由概率的平均，$\alpha$ 是一个小权重（Fedus et al. 取 $10^{-2}$）。
:::

::: proposition 均衡损失在均匀路由处最小 {#prop-balance}
$f_i$ 关于路由器参数分段为常数，梯度经由 $P_i$ 到达路由器。若路由与概率一致，$f_i = P_i$，则 $E\sum_iP_i^2\ge1$，等号成立当且仅当每个 $P_i = 1/E$。均匀路由时 $\mathcal{L}_{\text{aux}} = \alpha$。
:::

::: proof
$P_i$ 是概率向量的平均，故 $\sum_iP_i = 1$。由柯西-施瓦茨不等式，$1 = \big(\sum_i1\cdot P_i\big)^2\le E\sum_iP_i^2$，等号恰在 $(P_i)$ 与 $(1,\dots,1)$ 成比例时成立，即 $P_i = 1/E$。此时 $\mathcal{L}_{\text{aux}} = \alpha E\cdot E\cdot(1/E)^2 = \alpha$。
:::

容量因子调大，丢弃的词元就少，但空槽位浪费计算与显存、通信也增大；Fedus et al. 发现 top-$1$ 路由取 $1$ 到 $1.25$ 之间效果不错。后来的设计有的完全不丢弃（无丢弃 MoE，Gale et al., 2023，配合分块稀疏核），DeepSeek-V3（2024）则给每个专家配一个在梯度之外调整的偏置项来平衡负载，而非依赖大的辅助损失。

::: example 全对全的流量 {#ex-ep}
一台设备以 bf16 持有 $n = 8192$ 个宽 $h = 4096$ 的词元，top-$2$ 路由，专家分布在 $e = 8$ 台设备上。每个 MoE 层每个训练步它发送多少字节？top-$2$ 路由、$64$ 个专家、每批 $T = 65{,}536$ 词元时，$\text{cf} = 1.25$ 下每个专家的容量是多大？
::: solution
一次全对全：$\frac78\cdot2\cdot8192\cdot2\cdot4096 = 117$ MB。每层四次：$470$ MB——与[[#ex-tp]]中宽度大一倍的张量并行块的通信量同阶，但走的是全对全模式。容量：$\lceil1.25\cdot2\cdot65{,}536/64\rceil = 2560$ 个词元槽位每专家，而平均负载是 $2048$。
:::
:::

::: warning 并行是相乘，不是相加
各方案切分不同的量，它们对显存、通信与批次的影响彼此复合。张量并行把权重与激活值除以 $t$，但需要高速链路；流水线并行把层除以 $p$，但需要 $m\gg p$ 个微批次，它乘上数据并行度后就定下了全局批次的下限；数据并行又把批次再乘一遍。在 $t\cdot p\cdot d$ 台设备上，全局批次至少 $m\cdot d$ 个微批次。一次只定一个并行度、不拿临界批次大小去检查全局批次、不拿设备实际容量去检查每设备显存，得到的配置能跑，却会把集群大半闲下来。[[scaling/large-runs]]完整推演一种布局。
:::

::: quiz
并行方案与主导通信模式的哪些配对正确？
- [x] 张量并行——每个块内对激活做全规约（或规约-分散加全收集）。
- [x] 流水线并行——相邻阶段间激活的点对点传输。
- [ ] 专家并行——专家权重的环形全规约。
- [x] 采用环形注意力的上下文并行——键、值块沿环传递。
::: solution
专家并行用全对全交换的是词元（隐向量），不是权重；专家权重根本不动。其余三条正确。
:::
:::

::: history
模型并行同大型神经网络一样老：Krizhevsky et al. 的 AlexNet（2012）把层切到两块 GPU 上，Dean et al.（2012）在 DistBelief 中把模型划分到多台机器。Shazeer et al.（2017）提出拥有数千专家的稀疏门控混合专家层。Mesh-TensorFlow（Shazeer et al., 2018）把张量切分表达为具名的网格维度，Shoeybi et al.（2019）给出 Megatron-LM 的张量并行 Transformer。Huang et al.（2019）提出 GPipe，Narayanan et al.（2019）提出 PipeDream；Narayanan et al.（2021）用交错调度把张量、流水线与数据并行合在一起，以 $52\%$ 的峰值效率训练了一个万亿参数模型。Lepikhin et al.（2021）提出 GShard，Fedus et al.（2022）提出 Switch Transformer。Korthikanti et al.（2022）补上序列并行与选择性重计算；Liu et al.（2023）提出环形注意力，Jacobs et al.（2023）提出 DeepSpeed-Ulysses；Qi et al.（2024）提出零气泡流水线调度。
:::

::: summary
- **张量并行**把每个子层第一个矩阵按列、第二个按行切分（注意力按头切）：每个子层前向一次全规约、反向一次。其 FLOPs 与字节之比约 $9h/(2t)$，与批次无关，所以只能待在服务器内部。
- **序列并行**把每次全规约换成一次规约-分散与一次全收集，并沿序列切分归一化与 dropout，不增加通信就把全部激活值除以 $t$。**上下文并行**（环形注意力、Ulysses）切分长序列，连注意力一起切。
- **流水线并行**把层切成 $p$ 个阶段；$m$ 个微批次时气泡为 $(p-1)/(m+p-1)$。**1F1B** 至多持有 $p$ 个微批次的激活值；以 $v$ 块**交错**把气泡再除以 $v$。
- **专家并行**把专家放在不同设备上，用前向两次、反向两次全对全交换词元，每次 $\frac{e-1}{e}\cdot2khn$ 字节；负载均衡由 $\alpha E\sum_if_iP_i$ 促动（均匀路由处最小）、由容量因子落实。
- 各方案相乘：设备数 $= t\cdot p\cdot d\,(\cdot c\cdot e)$，全局批次至少 $m\cdot d$ 个微批次。
:::

## 习题

::: exercise 矩阵的分片 {level=1 check="67108864"}
张量并行前馈网络中 $h = 8192$、$t = 4$，每台设备的第一矩阵（$h\times4h$）的块 $A_i$ 有多少个元素？
::: solution
$h\cdot4h/t = 4h^2/4 = h^2 = 8192^2 = 67{,}108{,}864$，bf16 下 $134$ MB；$B_i$ 同数。
:::
:::

::: exercise 气泡 {level=1 check="0.125"}
GPipe 或 1F1B 流水线有 $p = 4$ 个阶段、$m = 21$ 个微批次。气泡比例是多少？
::: solution
$(p-1)/(m+p-1) = 3/24 = 0.125$。
:::
:::

::: exercise 交错 {level=1 check="0.0625"}
$p = 8$、$m = 21$、每设备 $v = 5$ 个虚拟阶段时，交错调度的气泡比例是多少？
::: solution
$(p-1)/(vm + p - 1) = 7/(105 + 7) = 7/112 = 0.0625$。
:::
:::

::: exercise 均衡损失 {level=2 check="0.0112"}
一个 Switch 层有 $E = 4$ 个专家、$\alpha = 0.01$，$f = (0.4, 0.2, 0.2, 0.2)$、$P = (0.4, 0.2, 0.2, 0.2)$。计算 $\mathcal{L}_{\text{aux}}$，并与均匀路由处的值比较。
::: solution
$\sum f_iP_i = 0.16 + 0.04 + 0.04 + 0.04 = 0.28$；$\mathcal{L}_{\text{aux}} = 0.01\cdot4\cdot0.28 = 0.0112$，而均匀路由处为 $\alpha = 0.01$：不均衡使损失抬高 $12\%$，其经 $P_1$ 的梯度会把概率从过载的专家推开。
:::
:::

::: exercise 达到目标气泡所需的微批次 {level=2 check="58"}
$p = 7$ 个阶段的 1F1B 流水线要把气泡压到至多 $9.5\%$，需要多少个微批次？给出最小整数。
::: solution
$(p-1)/(m+p-1)\le0.095$ 给出 $m + 6\ge6/0.095 = 63.2$，故 $m\ge57.2$，最小整数为 $58$（校验：$m = 57$ 得 $6/63 = 0.0952$，恰在目标之上；$m = 58$ 得 $6/64 = 0.094$）。
:::
:::

::: exercise 张量并行的流量 {level=2 check="117.44"}
验证[[#ex-tp]]中单次张量并行全规约的大小（$n = 4096$、$h = 8192$、$t = 8$、bf16），以 MB（$10^6$ 字节）计，保留两位小数。
::: solution
$2\cdot\frac78\cdot2\cdot4096\cdot8192 = 1.75\cdot67{,}108{,}864 = 117{,}440{,}512$ 字节 $= 117.44$ MB。
:::
:::

::: exercise 为什么不能先按行切 {level=2}
用一个 $1\times2$ 的例子证明一般有 $\operatorname{GeLU}(x_1a_1 + x_2a_2)\ne\operatorname{GeLU}(x_1a_1) + \operatorname{GeLU}(x_2a_2)$（为简便用 $\operatorname{ReLU}$），并说明若 $A$ 先按行切会多需要什么通信。
::: solution
取 $x = (1, 1)$、$a = (1, -1)\T$：$\operatorname{ReLU}(1 - 1) = 0$，而 $\operatorname{ReLU}(1) + \operatorname{ReLU}(-1) = 1$。$A$ 按行切分时，每台设备算出预激活的部分和 $X_iA_i$；非线性需要完整的和，于是 GeLU 之前要对 $n\times4h$ 的预激活做一次全规约——比 Megatron 切分末端那个 $n\times h$ 的全规约大四倍，而且是在它之外另加的。
:::
:::

::: exercise 1F1B 的显存 {level=2}
$p$ 个阶段的 1F1B 调度中，阶段 $s$（从 $0$ 起编号）至多持有多少个微批次的激活值？若一个阶段持有 $L/p$ 层、每层每微批次激活显存为 $M_a$，最坏阶段的激活显存是多少？与 GPipe 比如何？
::: solution
阶段 $s$ 在第一次反向之前要跑 $p - 1 - s$ 次预热前向、再加一次，故至多持有 $p - s$ 个微批次——第一阶段是 $p$ 个。最坏阶段显存：$p\cdot(L/p)\cdot M_a = LM_a$，即一个微批次流过整个模型的激活值，与 $m$ 无关。GPipe 每阶段持有 $m$ 个微批次：$m(L/p)M_a$，大 $m/p$ 倍。
:::
:::

::: exercise 环形注意力的重叠 {level=3}
环形注意力在 $c$ 台设备上，每台持有 $n/c$ 个宽 $h$ 的词元（键、值同宽，bf16），每步计算一个查询块与一个键值块之间的注意力并传输一个键值块。证明每步计算约 $4(n/c)^2h$ FLOPs、通信 $4(n/c)h$ 字节，并在实得 $400$ TFLOP/s、链路 $50$ GB/s 的设备上求二者平衡时的块长。这对每设备最短序列长度意味着什么？
::: solution
$n/c$ 个查询与 $n/c$ 个键的打分 $QK\T$ 花 $2(n/c)^2h$ FLOPs，值的加权和再 $2(n/c)^2h$：共 $4(n/c)^2h$（前向；反向计算约为其两倍，通信也是两倍）。传输是一个 $K$ 块一个 $V$ 块：$2\cdot(n/c)h\cdot2 = 4(n/c)h$ 字节。时间平衡：$4(n/c)^2h/(4\times10^{14}) = 4(n/c)h/(5\times10^{10})$ 解得 $n/c = 4\times10^{14}/5\times10^{10} = 8000$ 词元。每设备块超过约 $8000$ 词元时传输能藏到计算背后；所以环形注意力对跨几十台设备、数十万词元的序列高效，对短序列则是浪费。（分组查询注意力把 $K$ 与 $V$ 缩小，阈值随之降低。）
:::
:::

::: exercise 流水线并行与数据并行如何取舍 {level=3}
一个模型固定 $t = 8$ 时需要至少 $t\cdot p = 64$ 台设备才装得下一个副本。集群有 $1024$ 台设备，每设备微批次为 $1$ 条 $8192$ 词元的序列，全局批次不得超过 $1024$ 条序列（$840$ 万词元）。用不带交错的 1F1B 比较 $p = 8$（$d = 16$）与 $p = 16$（$d = 8$）两种配置：各自的每副本微批次 $m$ 与气泡。哪个更好？$v = 2$ 的交错会改变什么？
::: solution
设备 $t\cdot p\cdot d = 1024$。$p = 8$ 时 $d = 1024/64 = 16$，每副本 $m = 1024/16 = 64$ 个微批次，气泡 $7/71 = 9.9\%$。$p = 16$ 时 $d = 8$、$m = 128$，气泡 $15/143 = 10.5\%$。两者接近；$p = 8$ 气泡略优、阶段数减半从而流水线激活显存减半，$p = 16$ 则把每设备模型状态减半，这也许是显存装下所必需的。$v = 2$ 时：$7/(128 + 7) = 5.2\%$ 与 $15/(256 + 15) = 5.5\%$。限制气泡能做小程度的，是全局批次的上限，而非设备数量。
:::
:::
