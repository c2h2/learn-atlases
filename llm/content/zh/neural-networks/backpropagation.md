训练网络，就是沿着损失对其每一个参数的梯度往前走——小 MLP 里有几万个参数，大语言模型里有几千亿个。**反向传播**（backpropagation）用一次穿过网络的反向扫描算出所有这些偏导数，代价约为前向传播的两倍。它不过就是链式法则，按特定的次序施加、并把中间结果存下来；但正是这个次序，把一次不可能的计算变成了一次廉价的计算。

[[math-for-ml/gradients]]介绍了各个部件：多元链式法则（[[math-for-ml/gradients#thm-chain]]）、从输出往回求值只需要向量-雅可比乘积这一观察（[[math-for-ml/gradients#sec-modes]]）、线性层与 softmax 交叉熵的梯度，以及一个手工求导的两层网络（[[math-for-ml/gradients#ex-backprop]]）。本章把这套方法一般化——先在任意计算图上，再用之于 MLP 的批量矩阵形式——然后数一数它要花多少算术量和内存，把它实现出来，并按从业者惯用的方式检验实现。下一章[[neural-networks/automatic-differentiation]]把同一个思想变成能为任意程序求导的软件。

## 计算图 {#sec-graphs}

任何公式，以及任何不依赖数据长度的、无循环的程序，都能拆成一串初等运算，每个运算读取若干早先的值并产生一个新值。

::: definition 计算图 {#def-graph}
**计算图**是一个有向无环图，节点是变量$v_1, \dots, v_N$。前$n$个节点是**输入**（数据与参数）；其余每个节点由一个初等运算从其**父节点**算出，

$$
v_j = \psi_j\big(v_i : i\in\operatorname{pa}(j)\big),\qquad j = n + 1, \dots, N,
$$

而最后一个节点$v_N$是标量输出，这里就是损失$\mathcal{L}$。节点按**拓扑序**编号：每个父节点都排在它的子节点之前。**前向传播**按这个次序计算$v_{n+1}, \dots, v_N$。
:::

“初等”指任何我们知道如何求其偏导数的运算：加法、乘法、$\exp$、$\tanh$，也包括整个矩阵乘法或一个 softmax——把它们当作一个取向量或矩阵值的节点。粒度是一种选择。有向无环图总有拓扑序，可用深度优先搜索找到；在一个程序里，各运算被执行的先后次序就是一个。

::: widget graph
nodes: w@0,2; x@0,0; b@0,-2; mul@2,1; a@4,0; p@6,0; diff@8,0; sq@10,0; reg@8,2; L@12,1
edges: w>mul; x>mul; mul>a; b>a; a>p; p>diff; diff>sq; sq>L; w>reg; reg>L
algorithm: topo
start: w
caption: [[#ex-neuron]]的计算图：逻辑神经元$p = \sigma(wx + b)$，配平方误差$\frac12(p - y)^2$与权重惩罚$\frac\lambda2 w^2$。逐步走完拓扑排序：它把每个节点列在其所有父节点之后，这正是前向传播可以运行的次序。反向传播按这个次序的逆序访问节点。权重$w$有两个子节点，所以它的梯度将是两个贡献之和。
:::

## 反向扫描 {#sec-backward}

对每个节点定义它的**伴随量**——损失对它的敏感度。

::: definition 伴随量 {#def-adjoint}
节点$v_i$的**伴随量**是$\bar v_i = \partial\mathcal{L}/\partial v_i$，即输出对$v_i$的导数，*固定$v_i$的全部输入、并重算它的全部后代*。（若$v_i$是向量或矩阵，$\bar v_i$与它同形状。）
:::

输出的伴随量是$\bar v_N = 1$。作为参数的那些输入的伴随量，正是我们想要的梯度。在其间，链式法则把每个节点与它的子节点联系起来。

::: theorem 反向传播 {#thm-backprop}
在标量输出为$\mathcal{L} = v_N$的计算图中，伴随量满足

$$
\bar v_N = 1,\qquad\bar v_i = \sum_{j\,:\,i\in\operatorname{pa}(j)}\bar v_j\,\frac{\partial\psi_j}{\partial v_i}\qquad(i < N),
$$ {#eq-adjoint}

其中每个偏导数都在前向传播所得的值处取值。按拓扑序的逆序$i = N - 1, N - 2, \dots, 1$计算伴随量，算出每个$\bar v_i$时，它所依赖的全部伴随量都已经算好。
:::

::: proof
把$v_i$当作自由变量，其后每个节点都从它重算；记由此得到的导数为$\dot v_k = dv_k/dv_i$，于是$\dot v_i = 1$，而每个不依赖$v_i$的节点（特别地，对所有$k < i$）有$\dot v_k = 0$。对后面的节点$v_k = \psi_k(\text{parents})$，链式法则（[[math-for-ml/gradients#thm-chain]]）给出

$$
\dot v_k = \sum_{m\in\operatorname{pa}(k)}\frac{\partial\psi_k}{\partial v_m}\,\dot v_m .
$$

沿拓扑序展开这个递推，$\dot v_N = d\mathcal{L}/dv_i$就是对图中所有有向路径$i = k_0\to k_1\to\dots\to k_r = N$求和，每条路径的项是沿途局部导数的乘积$\prod_{s=1}^r\partial\psi_{k_s}/\partial v_{k_{s-1}}$。把这些路径按第一步$i\to j$分组，其中$j$是$i$的一个子节点。以该步开头的那些路径贡献$\partial\psi_j/\partial v_i$乘以从$j$到$N$的所有路径之和，而对$v_j$用同一路径和恒等式，这个内部和恰是$\bar v_j$。对所有子节点相加便得[[#eq-adjoint]]。$i$的每个子节点$j$都有$j > i$，所以按逆拓扑序计算$\bar v_i$时，和式里的所有$\bar v_j$都已算好。
:::

两条规则由此直接得出，值得记住。**扇出求和**：一个值被多个运算使用时，它的伴随量是来自每次使用的贡献之和。**每个运算只需要自己的局部导数**$\partial\psi_j/\partial v_i$，在存下来的前向值处取值；没有人需要写下整个网络的导数。实践中，和式[[#eq-adjoint]]以“推送”方式累加：访问节点$j$时，把$\bar v_j\,\partial\psi_j/\partial v_i$加进每个父节点的累计伴随量。

::: algorithm 计算图上的反向传播 {#alg-backprop}
1. **前向。**对$j = n + 1, \dots, N$：计算$v_j = \psi_j(\text{parents})$并保存（以及$\psi_j$的导数所需的一切）。
2. **初始化。**$\bar v_N\leftarrow1$，对所有$i < N$置$\bar v_i\leftarrow0$。
3. **反向。**对$j = N, N - 1, \dots, n + 1$：对$j$的每个父节点$i$，$\bar v_i\leftarrow\bar v_i + \bar v_j\,\partial\psi_j/\partial v_i$。
4. 返回参数节点的$\bar v_i$。

当节点存的是向量或矩阵时，第3步做的是向量-雅可比乘积$\bar{\mathbf{v}}_i\mathrel{+}=J_{ji}^\top\bar{\mathbf{v}}_j$，其中$J_{ji} = \partial\mathbf{v}_j/\partial\mathbf{v}_i$，它无需造出雅可比矩阵就能算出。
:::

::: example 穿过单个神经元的反向传播 {#ex-neuron}
一个逻辑神经元的输入$x = 2$、目标$y = 1$、权重$w = 0.5$、偏置$b = 0$、惩罚系数$\lambda = 0.1$，损失为$\mathcal{L} = \frac12(p - y)^2 + \frac\lambda2w^2$，其中$p = \sigma(a)$，$a = wx + b$。按[[#alg-backprop]]计算$\mathcal{L}$、$\partial\mathcal{L}/\partial w$与$\partial\mathcal{L}/\partial b$。
::: solution
**前向。**$a = 1$，$p = \sigma(1) = 0.731059$，且$\mathcal{L} = \frac12(0.268941)^2 + 0.05\cdot0.25 = 0.036165 + 0.0125 = 0.048665$。

**反向**，按逆序访问图中的节点。输出是一个和，所以它的两个加数各获得伴随量$1$。由$\frac12(p - y)^2$：$\bar p = p - y = -0.268941$。由$p = \sigma(a)$：$\bar a = \bar p\,\sigma'(a) = \bar p\,p(1 - p) = -0.268941\cdot0.196612 = -0.052877$。由$a = wx + b$：$\bar b = \bar a = -0.052877$，而乘法向$\bar w$贡献$\bar a\,x = -0.105754$。由$\frac\lambda2w^2$：第二个贡献$\lambda w = 0.05$。按扇出规则，$\bar w = -0.105754 + 0.05 = -0.055754$。

步长$10^{-6}$的中心差分给出$\partial\mathcal{L}/\partial w\approx-0.0557542$，两者一致。梯度步会增大$w$，这正是应有之义：预测$0.73$低于目标，而惩罚向$0$的拉力只抵消了一部分。
:::
:::

## 多层感知机中的反向传播 {#sec-mlp-backprop}

对 MLP（[[neural-networks/perceptrons-mlps#def-mlp]]），自然的做法是把每个矩阵乘法、每个逐元素激活各当作一个节点，并且一次处理整个小批量。把$B$个输入按行堆起来：$H_0 = X\in\R^{B\times d_0}$，对$\ell = 1, \dots, L$

$$
A_\ell = H_{\ell-1}W_\ell + \mathbf{1}\mathbf{b}_\ell^\top\in\R^{B\times d_\ell},\qquad H_\ell = \phi(A_\ell)\ (\ell < L),\qquad Z = A_L,
$$

其中$W_\ell\in\R^{d_{\ell-1}\times d_\ell}$（代码惯用的行向量约定；这里的$W_\ell$是[[neural-networks/perceptrons-mlps#eq-mlp]]中矩阵的转置）。损失是平均交叉熵$\mathcal{L} = -\frac1B\sum_{r=1}^B\log\operatorname{softmax}(\mathbf{z}_r)_{y_r}$。记$\Delta_\ell = \partial\mathcal{L}/\partial A_\ell$，即第$\ell$层预激活处的“误差信号”，是一个$B\times d_\ell$矩阵。

::: theorem MLP 的反向传播方程 {#thm-mlp-backprop}
设$P\in\R^{B\times K}$存放预测概率，$Y$存放独热目标。则

$$
\begin{aligned}
\Delta_L &= \tfrac1B(P - Y),\\
\frac{\partial\mathcal{L}}{\partial W_\ell} &= H_{\ell-1}^\top\Delta_\ell,\qquad\frac{\partial\mathcal{L}}{\partial\mathbf{b}_\ell} = \Delta_\ell^\top\mathbf{1},\\
\Delta_{\ell-1} &= \big(\Delta_\ell W_\ell^\top\big)\odot\phi'(A_{\ell-1})\qquad(\ell = L, \dots, 2),
\end{aligned}
$$ {#eq-mlp-backprop}

其中$\odot$是逐元素乘积。形状可以核对：$H_{\ell-1}^\top\Delta_\ell$是$(d_{\ell-1}, B)(B, d_\ell)$，即$W_\ell$的形状；$\Delta_\ell W_\ell^\top$是$(B, d_\ell)(d_\ell, d_{\ell-1})$，即$A_{\ell-1}$的形状。
:::

::: proof
*输出层。*损失对行取平均，第$r$行的项只依赖$\mathbf{z}_r$，由[[math-for-ml/gradients#prop-softmax-ce]]其梯度为$\mathbf{p}_r - \mathbf{e}_{y_r}$。为平均除以$B$，得$\Delta_L = (P - Y)/B$。

*权重。*$A_\ell$的元素$(r, k)$是$\sum_iH_{\ell-1, ri}W_{\ell, ik} + b_{\ell, k}$，故$\partial A_{\ell, rk}/\partial W_{\ell, ik} = H_{\ell-1, ri}$，而$W_{\ell, ik}$影响每一行$r$的元素$A_{\ell, rk}$——这是在整个批次上的扇出。求和得$\partial\mathcal{L}/\partial W_{\ell, ik} = \sum_rH_{\ell-1, ri}\Delta_{\ell, rk} = (H_{\ell-1}^\top\Delta_\ell)_{ik}$。类似地，$b_{\ell, k}$以系数$1$进入每一行，给出列和$\sum_r\Delta_{\ell, rk}$。

*逐层传递。*$H_{\ell-1, ri}$以系数$W_{\ell, ik}$影响所有$k$的$A_{\ell, rk}$，所以$\partial\mathcal{L}/\partial H_{\ell-1, ri} = \sum_k\Delta_{\ell, rk}W_{\ell, ik} = (\Delta_\ell W_\ell^\top)_{ri}$。最后，$H_{\ell-1, ri} = \phi(A_{\ell-1, ri})$只依赖单个元素$A_{\ell-1, ri}$，导数为$\phi'(A_{\ell-1, ri})$，于是得到逐元素乘积。
:::

把[[#eq-mlp-backprop]]当作一张菜谱来读：误差信号在输出处以“预测减目标”进入，通过与$W_\ell^\top$相乘逐层向后流过每个权重矩阵，并在每一层被激活函数的斜率门控。每个权重的梯度是到达其输出端的信号与它输入端激活值的乘积、再对批次求和——所以只有当*两个*条件同时成立——它的输入单元有激活、它的输出单元收到误差——一个权重才学习。沿途相乘的因子$\phi'(A_\ell)$，正是饱和单元构成的深网络中梯度消失的原因（[[neural-networks/initialisation-normalisation]]）。

::: quiz
在[[#thm-mlp-backprop]]中，梯度$\partial\mathcal{L}/\partial W_\ell$为什么要对批次求和？
- [ ] 因为每个例子的权重不同
- [x] 因为同一个权重被批内每个例子使用，所以它的伴随量每个例子收集一份贡献
- [ ] 因为损失是各例子的乘积
- [ ] 不需要；梯度是一个例子一个例子算的
::: solution
矩阵$W_\ell$被批内全部$B$行共享，是一个$B$次使用的扇出。按[[#thm-backprop]]的扇出规则，它的伴随量是$B$份逐例子贡献之和，也就是矩阵乘积$H_{\ell-1}^\top\Delta_\ell$。$\Delta_L$内部的因子$1/B$把这个和变成了平均。
:::
:::

## 反向传播的代价 {#sec-cost}

### 算术量 {#sec-flops}

数浮点运算次数（FLOPs），一次乘法与一次加法各计一次。$m\times k$矩阵乘$k\times n$矩阵约花费$2mkn$ FLOPs。

::: proposition 一个训练步的代价 {#prop-flops}
对有$N_W = \sum_\ell d_{\ell-1}d_\ell$个权重的 MLP（偏置与激活是低阶项），一批$B$个样例约需

$$
C_{\text{forward}}\approx2BN_W,\qquad C_{\text{backward}}\approx4BN_W,\qquad C_{\text{step}}\approx6BN_W
$$ {#eq-6n}

FLOPs：反向扫描的算术量约为前向传播的两倍，整个参数向量的梯度约为三次前向传播。
:::

::: proof
前向传播把形状$(B, d_{\ell-1})$的$H_{\ell-1}$乘以形状$(d_{\ell-1}, d_\ell)$的$W_\ell$：每层$2Bd_{\ell-1}d_\ell$ FLOPs，共$2BN_W$。反向扫描每层做两个同样大小的乘积：$H_{\ell-1}^\top\Delta_\ell$（形状$(d_{\ell-1}, B)$乘$(B, d_\ell)$，$2Bd_{\ell-1}d_\ell$ FLOPs）与$\Delta_\ell W_\ell^\top$（形状$(B, d_\ell)$乘$(d_\ell, d_{\ell-1})$，数目相同）。这是$4BN_W$，再减去第一层那个不需要的输入梯度乘积。逐元素的部分——激活、它们的导数、softmax、偏置求和——是$O(B\sum_\ell d_\ell)$，比矩阵乘积小一个层宽因子。
:::

这就是廉价梯度原理（[[math-for-ml/gradients#prop-cheap-gradient]]）最具体的形态：$N$个分量的梯度，只花一次求值代价的常数倍，而不是$N$倍。对任何以矩阵乘法为主的网络，同样的计数都成立；它也是下述经验公式的来源：用$N$个参数在$D$个词元上训练 Transformer 约花费$6ND$ FLOPs（[[scaling]]）；对 Transformer 而言，注意力得分还会添一项随上下文长度增长的项。

::: example 训练的 FLOPs {#ex-flops}
(a) [[neural-networks/perceptrons-mlps#ex-params]]的数字 MLP 以批量$64$训练，一个训练步要多少 FLOPs？(b) 估算一个$7\times10^9$参数的模型在$10^{12}$个词元上训练的代价；若设备持续提供$10^{15}$ FLOP/s，需要多久？
::: solution
(a) 该 MLP 有$N_W = 784\cdot512 + 512\cdot512 + 512\cdot10 = 668{,}672$个权重，一步花费$6\cdot64\cdot668{,}672\approx2.57\times10^8$ FLOPs——在现代 GPU 上不到一毫秒的几分之一，这就是小模型通常受限于数据加载而非算术的原因。

(b) $6ND = 6\cdot7\times10^9\cdot10^{12} = 4.2\times10^{22}$ FLOPs。以$10^{15}$ FLOP/s 计算是$4.2\times10^7$秒，单台设备约$486$天——或$100$台设备在完美并行效率下约一周。实际的运行只能达到设备峰值吞吐量的一小部分，实际与峰值之比（“模型FLOPs利用率”）是衡量训练效率的标准指标。
:::
:::

### 内存 {#sec-memory}

[[#eq-mlp-backprop]]的反向扫描需要$H_{\ell-1}$来构成权重梯度，需要$A_{\ell-1}$（或$H_{\ell-1}$，从中可算出$\tanh'$与$\sigma'$）来构成激活函数的导数。这些全都由前向传播产生，而且必须一直保存，直到反向扫描用到它们。这些存下来的**激活值**所占的内存随批量和深度增长：

$$
M_{\text{act}}\approx B\sum_{\ell}(\text{第 }\ell\text{ 层保存的数值个数})\times(\text{每个值的字节数}).
$$

数字 MLP 用批量$64$、32位浮点数存储$X$、$A_1, H_1, A_2, H_2$与$Z$，需$64\cdot(784 + 4\cdot512 + 10)\cdot4\approx0.73$ MB，相比之下参数占$2.7$ MB。在用长序列训练的大型 Transformer 里，激活值可能超过参数好几倍，这就是从业者用**激活检查点**——只存一部分激活，其余在反向扫描期间重算——来拿计算换内存的原因（[[neural-networks/automatic-differentiation#sec-checkpointing]]）。

::: warning 反向传播不是学习规则
“反向传播”常被不加区分地用来指整个训练流程。严格说来，它只是计算梯度的算法；拿梯度做什么——普通的梯度下降、动量、Adam，配什么学习率——是优化器（[[neural-networks/optimisers]]）的事，是另一个独立的选择。把两者分清有助于调试：梯度正确（用下文的方法数值核对过）而损失发散，问题指向优化器或数据，而不是反向扫描。反向传播也不是神经网络专属的：它能对任何可微运算的复合求导。
:::

## 实现 {#sec-code}

下面的清单用纯 Python——列表的列表当矩阵——实现[[#thm-mlp-backprop]]：隐藏层用 tanh 的 MLP，对三个梯度元素用中心差分核对，并用全批量梯度下降训练网络，把一个圆盘与环绕它的圆环分开。

```python
import math, random

# --- 基于列表的列表的极小矩阵工具 ---------------------------------------------
def matmul(A, B):                     # (m, k) @ (k, n) -> (m, n)
    Bt = list(zip(*B))
    return [[sum(a * b for a, b in zip(row, col)) for col in Bt] for row in A]

def T(A):                             # 转置
    return [list(r) for r in zip(*A)]

# --- 隐藏层为 tanh、输出为 softmax 交叉熵的 MLP -------------------------------
def init(sizes, rng):
    params = []
    for n_in, n_out in zip(sizes[:-1], sizes[1:]):
        W = [[rng.gauss(0, 1 / math.sqrt(n_in)) for _ in range(n_out)] for _ in range(n_in)]
        params.append([W, [0.0] * n_out])          # W: (n_in, n_out), b: (n_out,)
    return params

def forward(params, X):
    """X: (B, d0). Returns the cache of every layer's input and pre-activation."""
    H, cache = X, []
    for l, (W, b) in enumerate(params):
        A = [[a + bj for a, bj in zip(row, b)] for row in matmul(H, W)]   # (B, d_l)
        cache.append((H, A))
        H = A if l == len(params) - 1 else [[math.tanh(a) for a in row] for row in A]
    return H, cache                                                     # logits (B, K)

def loss_and_grads(params, X, y):
    Z, cache = forward(params, X)
    B = len(X)
    loss, D = 0.0, []
    for z, t in zip(Z, y):                         # softmax 交叉熵，逐行
        m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e)
        loss += -(z[t] - m - math.log(s))
        D.append([ei / s - (k == t) for k, ei in enumerate(e)])
    D = [[d / B for d in row] for row in D]        # dL/dZ = (P - Y) / B，形状 (B, K)
    grads = [None] * len(params)
    for l in reversed(range(len(params))):
        H_in, A = cache[l]
        W, b = params[l]
        dW = matmul(T(H_in), D)                    # (d_{l-1}, d_l) = H^T D
        db = [sum(col) for col in zip(*D)]         # (d_l,) = D 的各列之和
        grads[l] = (dW, db)
        if l > 0:
            dH = matmul(D, T(W))                   # (B, d_{l-1}) = D W^T
            D = [[g * (1 - h * h) for g, h in zip(gr, hr)]   # tanh' = 1 - tanh^2
                 for gr, hr in zip(dH, H_in)]
    return loss / B, grads

# --- 数据：圆盘（类别 0）被圆环（类别 1）包围 -----------------------------------
rng = random.Random(0)
def make_rings(n):
    X, y = [], []
    for i in range(n):
        t = i % 2                                   # 类别 0：内部圆盘；类别 1：圆环
        r = rng.uniform(0, 1) if t == 0 else rng.uniform(1.3, 2)
        a = rng.uniform(0, 2 * math.pi)
        X.append([r * math.cos(a), r * math.sin(a)]); y.append(t)
    return X, y

X, y = make_rings(200)
params = init([2, 8, 8, 2], rng)

# --- 梯度检查：解析值对几个元素做中心差分 ---------------------------------------
loss, grads = loss_and_grads(params, X[:10], y[:10])
eps = 1e-5
for l, i, j in [(0, 0, 3), (1, 5, 2), (2, 7, 1)]:
    W = params[l][0]; old = W[i][j]
    W[i][j] = old + eps; lp, _ = loss_and_grads(params, X[:10], y[:10])
    W[i][j] = old - eps; lm, _ = loss_and_grads(params, X[:10], y[:10])
    W[i][j] = old
    num, ana = (lp - lm) / (2 * eps), grads[l][0][i][j]
    print(f"layer {l} W[{i}][{j}]  analytic {ana: .8f}  numeric {num: .8f}  "
          f"rel. error {abs(num - ana) / max(abs(num), abs(ana)):.1e}")

# --- 全批量梯度下降 -------------------------------------------------------------
eta = 0.5
for step in range(1, 801):
    loss, grads = loss_and_grads(params, X, y)
    for (W, b), (dW, db) in zip(params, grads):
        for i in range(len(W)):
            for j in range(len(W[0])):
                W[i][j] -= eta * dW[i][j]
        for j in range(len(b)):
            b[j] -= eta * db[j]
    if step in (1, 50, 200, 800):
        Z, _ = forward(params, X)
        acc = sum((z[1] > z[0]) == t for z, t in zip(Z, y)) / len(y)
        print(f"step {step:4d}  loss {loss:.4f}  train accuracy {acc:.3f}")
```

```text
layer 0 W[0][3]  analytic -0.01591598  numeric -0.01591598  rel. error 1.8e-10
layer 1 W[5][2]  analytic  0.02492981  numeric  0.02492981  rel. error 2.1e-10
layer 2 W[7][1]  analytic  0.15918732  numeric  0.15918732  rel. error 2.1e-11
step    1  loss 0.7172  train accuracy 0.550
step   50  loss 0.1294  train accuracy 1.000
step  200  loss 0.0209  train accuracy 1.000
step  800  loss 0.0029  train accuracy 1.000
```

打印出的损失是本步更新*之前*测得的，准确率则是更新之后的。第1步的损失接近$\ln2 = 0.693$——那是一个什么都不知道的两类模型的交叉熵——[[neural-networks/training-practice]]养成的第一个习惯就是这项最基本的检查。任何线性分类器都无法把一个圆盘与环绕它的圆环分开；隐藏层学出了一个使问题变线性的特征（大体上是到圆心的距离）。注意`loss_and_grads`的结构：前向传播为每一层缓存`(H, A)`，反向的循环逆序消费这份缓存——[[#sec-memory]]的内存代价就在这里现形。

## 反向规则一览 {#sec-rules}

一个深度学习库在很大程度上就是一份运算清单，每个运算配上它的反向规则：给定输出的伴随量，返回输入的伴随量。这些规则一旦写好并测过，用它们搭出的任何网络都可按[[#alg-backprop]]求导。到此为止遇到的运算的规则如下，对单个样例（批量中的行向量逐行同理）：

| 运算 | 前向 | 反向（已知$\bar{\mathbf{y}}$） |
|---|---|---|
| 加法 | $\mathbf{y} = \mathbf{u} + \mathbf{v}$ | $\bar{\mathbf{u}} = \bar{\mathbf{y}}$，$\bar{\mathbf{v}} = \bar{\mathbf{y}}$ |
| 逐元素乘积 | $\mathbf{y} = \mathbf{u}\odot\mathbf{v}$ | $\bar{\mathbf{u}} = \bar{\mathbf{y}}\odot\mathbf{v}$，$\bar{\mathbf{v}} = \bar{\mathbf{y}}\odot\mathbf{u}$ |
| 线性映射 | $\mathbf{y} = W\mathbf{x}$ | $\bar{\mathbf{x}} = W^\top\bar{\mathbf{y}}$，$\bar W = \bar{\mathbf{y}}\mathbf{x}^\top$ |
| 激活函数 | $y_i = \phi(x_i)$ | $\bar x_i = \bar y_i\,\phi'(x_i)$ |
| 求和 | $y = \sum_ix_i$ | 对所有$i$，$\bar x_i = \bar y$ |
| 复制（广播） | 对所有$i$，$y_i = x$ | $\bar x = \sum_i\bar y_i$ |
| 最大值 | $y = \max_ix_i$ | 在取到最大值处$i^*$，$\bar x_{i^*} = \bar y$，其余为零 |
| softmax | $\mathbf{s} = \operatorname{softmax}(\mathbf{z})$ | $\bar{\mathbf{z}} = \mathbf{s}\odot\big(\bar{\mathbf{s}} - (\bar{\mathbf{s}}^\top\mathbf{s})\mathbf{1}\big)$ |
| 嵌入查表 | $\mathbf{y} = E_{t,:}$ | $\bar E_{t,:}\mathrel{+}=\bar{\mathbf{y}}$，其余行不变 |

表中有一对对**对偶**：求和与复制，以及线性映射的两个半边。前向传播收集什么，反向传播就散发什么，反之亦然——这是下述事实的反映：线性运算的反向规则就是乘它的转置。最大值把梯度只路由给获胜的输入，最大池化（[[neural-networks/convolutional-networks]]）与 ReLU（$\max(0, x)$）的行为由此而来。嵌入规则说明了嵌入表的梯度为何是稀疏的：只有批内出现的词元所在的行才收到更新（[[ml-fundamentals/representations#prop-embedding]]）。

::: proposition softmax 的反向规则 {#prop-softmax-vjp}
对$\mathbf{s} = \operatorname{softmax}(\mathbf{z})\in\R^K$与任意上游伴随量$\bar{\mathbf{s}}$，logits 的伴随量为$\bar{\mathbf{z}} = \mathbf{s}\odot(\bar{\mathbf{s}} - c\mathbf{1})$，其中$c = \bar{\mathbf{s}}^\top\mathbf{s}$。它只需$O(K)$次运算，尽管雅可比矩阵有$K^2$个元素；它的各分量之和为零。
:::

::: proof
$\partial s_i/\partial z_j = s_i([i = j] - s_j)$，故雅可比矩阵为$J = \operatorname{diag}(\mathbf{s}) - \mathbf{s}\mathbf{s}^\top$，它是对称的。于是$\bar{\mathbf{z}} = J^\top\bar{\mathbf{s}} = \mathbf{s}\odot\bar{\mathbf{s}} - \mathbf{s}(\mathbf{s}^\top\bar{\mathbf{s}})$，正是该公式。先算$c$再做逐元素表达式只需$O(K)$次运算。最后$\sum_i\bar z_i = \sum_is_i\bar s_i - c\sum_is_i = c - c = 0$。
:::

给 softmax 的每个 logit 加同一个常数，输出不变，所以它的梯度必与$\mathbf{1}$正交——和为零。把这条规则与$-\log s_y$的反向规则（即$\bar{\mathbf{s}} = -\mathbf{e}_y/s_y$）合起来，得$c = -1$与$\bar{\mathbf{z}} = \mathbf{s} - \mathbf{e}_y$，即熟悉的交叉熵梯度。程序库把两者融合成一个运算，既是为了速度，也因为分开计算$\log s_y$在$s_y$极小时损失精度。

::: example 一次 softmax 的反向传播 {#ex-softmax-vjp}
对 logits $\mathbf{z} = (1, 2, 0.5)$，用[[#prop-softmax-vjp]]计算第一个概率$s_1$对 logits 的梯度。
::: solution
$e^{\mathbf{z}} = (2.718, 7.389, 1.649)$，总和$11.756$，故$\mathbf{s} = (0.2312, 0.6285, 0.1402)$。关心的输出是$s_1$，所以$\bar{\mathbf{s}} = (1, 0, 0)$，$c = \bar{\mathbf{s}}^\top\mathbf{s} = 0.2312$。于是$\bar{\mathbf{z}} = \mathbf{s}\odot(\bar{\mathbf{s}} - c\mathbf{1}) = (0.2312\cdot0.7688,\ 0.6285\cdot(-0.2312),\ 0.1402\cdot(-0.2312)) = (0.1778, -0.1453, -0.0324)$。各分量之和为零，中心差分给出同样的三个数，精确到小数点后六位。增大$z_1$会增大$s_1$；增大另外任何一个 logit 都会减小它，竞争对手越大，减小得越厉害。
:::
:::

::: intuition 信用分配
反向传播回答的是**信用分配**问题：几百万个权重中，是哪些、各在多大程度上，对这个样例的误差负有责任？答案沿着每个权重影响输出的那些路径原路返回，每条路径以沿途局部敏感度之积加权。在1980年代中期反向传播广为人知之前，对*隐藏*单元——没有人给它们规定期望输出——缺少这个问题切实用的答案，一直是训练多层网络的主要障碍。
:::

## 检验梯度 {#sec-gradcheck}

有 bug 的反向传播常常照样能训练，只是差一些，所以错误可能长期不被察觉。标准检验是把解析梯度同数值梯度比较，如上文那样。

::: proposition 差分的精度 {#prop-fd}
设$f$在$x$附近三次连续可导。前向差分与中心差分满足

$$
\frac{f(x + \varepsilon) - f(x)}{\varepsilon} = f'(x) + \frac\varepsilon2f''(x) + O(\varepsilon^2),\qquad\frac{f(x + \varepsilon) - f(x - \varepsilon)}{2\varepsilon} = f'(x) + \frac{\varepsilon^2}{6}f'''(x) + O(\varepsilon^3).
$$

若每次求值$f$带有至多$\delta\lvert f\rvert$的舍入误差，则中心差分的总误差约为$\frac{\varepsilon^2}{6}\lvert f'''\rvert + \frac{\delta\lvert f\rvert}{\varepsilon}$，在$\varepsilon\approx(3\delta\lvert f\rvert/\lvert f'''\rvert)^{1/3}$处取到最小。
:::

::: proof
由泰勒定理$f(x\pm\varepsilon) = f(x)\pm\varepsilon f'(x) + \frac{\varepsilon^2}2f''(x)\pm\frac{\varepsilon^3}6f'''(x) + O(\varepsilon^4)$。减去$f(x)$再除以$\varepsilon$得第一个展开。两式相减消去偶数次幂：$f(x + \varepsilon) - f(x - \varepsilon) = 2\varepsilon f'(x) + \frac{\varepsilon^3}3f'''(x) + O(\varepsilon^5)$，除以$2\varepsilon$得第二个。两个舍入误差各至多$\delta\lvert f\rvert$，合计至多$2\delta\lvert f\rvert/(2\varepsilon)$。令$\frac{\varepsilon^2}6\lvert f'''\rvert + \delta\lvert f\rvert/\varepsilon$的导数为零，得$\frac\varepsilon3\lvert f'''\rvert = \delta\lvert f\rvert/\varepsilon^2$，即所述的极值点。
:::

在64位算术中$\delta\approx1.1\times10^{-16}$，所以对尺度适当的函数，中心差分的最优步长在$10^{-5}$到$10^{-6}$上下，误差约$10^{-10}$到$10^{-11}$——清单中看到的相对误差正是这个量级。下图在双对数坐标上画出两个误差项。

::: widget plot
f: log10(10^(2*x)/6 + 1.1e-16*10^(-x)); log10(10^x/2 + 2.2e-16*10^(-x))
x: -14, 0
y: -12, 1
labels: central difference; forward difference
caption: 双精度下$\lvert f\rvert = \lvert f''\rvert = \lvert f'''\rvert = 1$的函数，误差界之$\log_{10}$对$\log_{10}\varepsilon$的图像。$\varepsilon$大时截断误差占上风（中心差分斜率$2$，前向差分斜率$1$）；$\varepsilon$小时舍入误差$\delta/\varepsilon$接管。中心差分在$\varepsilon = 10^{-5}$附近达到几倍$10^{-11}$；前向差分只在$10^{-8}$附近达到约$10^{-8}$。
:::

实践建议：用中心差分，用64位浮点数计算，在每一层随机抽查一部分参数，并看**相对误差**$\lvert g_{\text{num}} - g_{\text{ana}}\rvert/\max(\lvert g_{\text{num}}\rvert, \lvert g_{\text{ana}}\rvert)$，因为绝对误差取决于梯度的尺度。值在$10^{-7}$以下说明实现正确；$10^{-2}$说明有 bug。三个坑人人都会踩：折点（输入落在$0$的$\varepsilon$邻域内的 ReLU，数值导数毫无意义）；随机性（dropout 掩码或数据增强必须在两次求值之间固定）；低精度（32位浮点下$\delta\approx6\times10^{-8}$，能达到的最好误差也只有约$10^{-5}$）。

::: example 手做一次梯度检查 {#ex-gradcheck}
用$\varepsilon = 0.1$的中心差分检查$f(w) = \ln(1 + e^{w})$在$w = 0$处的导数，并按[[#prop-fd]]预测误差。
::: solution
$f'(w) = \sigma(w)$，精确值为$\sigma(0) = 0.5$。数值上，$f(0.1) = \ln(1 + e^{0.1}) = \ln2.105171 = 0.744397$，$f(-0.1) = \ln1.904837 = 0.644397$，中心差分为$(0.744397 - 0.644397)/0.2 = 0.500000$。预测误差为$\frac{\varepsilon^2}6f'''(0)$，其中$f''' = \sigma'' = \sigma(1 - \sigma)(1 - 2\sigma)$在$w = 0$处为$0$：由对称性，主误差项消失，实际误差是$\varepsilon^4$量级，此处约$10^{-6}$。在$w = 1$处，$f''' = 0.197\cdot(1 - 1.462) = -0.091$，同样的步长会带来约$0.01\cdot0.091/6 = 1.5\times10^{-4}$的误差。
:::
:::

::: history
链式法则是莱布尼茨（Leibniz）的（1676），但把它沿计算过程反向组织起来是二十世纪的思想，而且被独立发现了好几次。在最优控制中，Henry Kelley（1960）与 Arthur Bryson（1961）用反向递推计算轨迹的梯度——伴随方法。Seppo Linnainmaa 1970年在赫尔辛基大学的硕士论文描述了任意初等运算程序的**反向模式自动微分**并给出实现，背景是估计累积的舍入误差。Paul Werbos 在他1974年的哈佛博士论文中提出把它用于神经网络，并于1982年发表了这一应用；David Parker（1985）与 Yann LeCun（1985）也各自重新发现了它。使它广为人知的论文——David Rumelhart、Geoffrey Hinton 与 Ronald Williams 的《用反向传播误差学习表示》（“Learning representations by back-propagating errors”，*Nature*，1986）——用实验表明这样训练的隐藏单元能发现有用的特征——例如编码亲属关系——并让这个方法在神经网络研究中有了名字。
:::

::: summary
- **计算图**把初等运算按拓扑序列出；**前向传播**求值并保存它们的值。
- **伴随量**$\bar v_i = \partial\mathcal{L}/\partial v_i$满足$\bar v_i = \sum_{\text{子节点 } j}\bar v_j\,\partial\psi_j/\partial v_i$；按逆拓扑序计算伴随量就是**反向传播**。被多次使用的值收到各次贡献之和。
- 对批量上的 MLP：$\Delta_L = (P - Y)/B$，$\partial\mathcal{L}/\partial W_\ell = H_{\ell-1}^\top\Delta_\ell$，$\Delta_{\ell-1} = (\Delta_\ell W_\ell^\top)\odot\phi'(A_{\ell-1})$。
- **代价**：反向扫描的 FLOPs 约为前向传播的两倍，所以$N$个权重的一个训练步约花$6BN$ FLOPs——$6ND$法则之源。**内存**：反向传播所需的全部激活都要保存，且随批量与深度增长。
- **梯度检查**用中心差分（误差$O(\varepsilon^2)$，双精度下最优$\varepsilon\approx10^{-5}$）配相对误差，能抓住反向传播的 bug；当心折点、随机性与低精度。
:::

## 习题

::: exercise 一个加法节点与一个乘法节点 {level=1 check="4"}
在$x = 1$、$y = 3$、$z = -1$处，对$\mathcal{L} = (x + y)\cdot z$计算$\bar x$、$\bar y$与$\bar z$。填入$\bar z$。
::: solution
令$s = x + y = 4$，于是$\mathcal{L} = sz = -4$。反向：$\bar s = z = -1$，$\bar z = s = 4$；再得$\bar x = \bar y = \bar s = -1$。所以$(\bar x, \bar y, \bar z) = (-1, -1, 4)$。加法节点把它的伴随量复制给每个输入；乘法节点把伴随量乘以*另一个*输入发给每个输入。
:::
:::

::: exercise 一步的 FLOPs {level=1 check="1351680"}
一个 MLP 的宽度为$100, 64, 10$。用[[#prop-flops]]并忽略偏置，批量$32$的一个训练步要多少 FLOPs？$\Delta_2$、$\partial\mathcal{L}/\partial W_1$与$\Delta_1$的形状各是什么？
::: solution
$N_W = 100\cdot64 + 64\cdot10 = 7{,}040$，故$6BN_W = 6\cdot32\cdot7{,}040 = 1{,}351{,}680$ FLOPs。按[[#thm-mlp-backprop]]的行约定，$\Delta_2$是$(32, 10)$，$\partial\mathcal{L}/\partial W_1 = H_0^\top\Delta_1$是$(100, 64)$（与$W_1$同形），$\Delta_1$是$(32, 64)$（与$A_1$同形）。
:::
:::

::: exercise 从输出求导数 {level=1}
证明 sigmoid、tanh 与 ReLU 的导数都可以只由单元的*输出*$h = \phi(a)$算出。这对反向传播有什么好处？
::: solution
$\sigma'(a) = \sigma(a)(1 - \sigma(a)) = h(1 - h)$；$\tanh'(a) = 1 - \tanh^2a = 1 - h^2$；$\operatorname{ReLU}'(a) = [a > 0] = [h > 0]$。反向传播为算权重梯度$H_{\ell-1}^\top\Delta_\ell$反正需要$H_{\ell-1}$，所以对这些激活就无需再保存预激活$A_{\ell-1}$，把[[#sec-memory]]的激活内存减半（[[#sec-code]]中的清单用的正是这一招：`1 - h * h`）。GELU 与 SiLU 没有这个性质，需要它们的输入。
:::
:::

::: exercise 共享的中间值 {level=2 check="2*(cos(1)+1)"}
对$\mathcal{L} = \sin(x^2) + x^2$，沿图$u = x^2$，$\mathcal{L} = \sin u + u$做反向传播，计算$x = 1$处的$d\mathcal{L}/dx$。
::: solution
节点$u$有两处使用，由扇出规则$\bar u = \cos u + 1$。于是$\bar x = \bar u\cdot2x = 2x(\cos x^2 + 1)$，在$x = 1$处为$2(\cos1 + 1)\approx3.081$。直接求导同样得$2x\cos x^2 + 2x$。
:::
:::

::: exercise 穿过残差模块的反向传播 {level=2}
一个残差模块对单个输入（列向量）计算$\mathbf{y} = \mathbf{x} + W_2\operatorname{ReLU}(W_1\mathbf{x})$。已知$\bar{\mathbf{y}} = \partial\mathcal{L}/\partial\mathbf{y}$，写出$\bar W_2$、$\bar W_1$与$\bar{\mathbf{x}}$。
::: solution
令$\mathbf{a} = W_1\mathbf{x}$，$\mathbf{h} = \operatorname{ReLU}(\mathbf{a})$。输出是$\mathbf{x}$与$W_2\mathbf{h}$的和，所以两者都收到$\bar{\mathbf{y}}$。于是$\bar W_2 = \bar{\mathbf{y}}\mathbf{h}^\top$，$\bar{\mathbf{h}} = W_2^\top\bar{\mathbf{y}}$，$\bar{\mathbf{a}} = \bar{\mathbf{h}}\odot[\mathbf{a} > 0]$，$\bar W_1 = \bar{\mathbf{a}}\mathbf{x}^\top$。输入$\mathbf{x}$被用了两次（捷径与$W_1\mathbf{x}$），所以$\bar{\mathbf{x}} = \bar{\mathbf{y}} + W_1^\top\bar{\mathbf{a}}$。第一项让梯度原封不动通过——这条恒等路径正是[[neural-networks/initialisation-normalisation]]用来解释残差网络为何能训练的东西。
:::
:::

::: exercise 激活内存 {level=2 check="50331648"}
一个 MLP 有$24$个宽度为$1{,}024$的隐藏层。批量$256$、以32位浮点数存储时，隐藏层的预激活与激活$A_\ell, H_\ell$占多少字节？
::: solution
每层$2$个$256\times1{,}024$的矩阵，$24$层，每个数$4$字节：$2\cdot24\cdot256\cdot1{,}024\cdot4 = 50{,}331{,}648$字节，约$50$ MB。仅$23$个隐藏到隐藏层的权重就占$23\cdot1{,}024^2\cdot4\approx96$ MB，所以这里激活约占参数内存的一半；激活随批量线性增长，参数不会。只存$H_\ell$（习题3）可把激活内存减半。
:::
:::

::: exercise 单精度下的最优步长 {level=2 check="(1.8e-7)^(1/3)"}
32位浮点中相对舍入误差约为$\delta = 6\times10^{-8}$。对$\lvert f\rvert = \lvert f'''\rvert = 1$的函数，[[#prop-fd]]误差界的中心差分最优步长是多少？大致误差是多少？
::: solution
$\varepsilon^* = (3\delta)^{1/3} = (1.8\times10^{-7})^{1/3}\approx5.6\times10^{-3}$。误差为$\varepsilon^2/6 + \delta/\varepsilon\approx5.3\times10^{-6} + 1.1\times10^{-5}\approx1.6\times10^{-5}$。所以单精度下的梯度检查只能确认大约四五位数字；请在双精度下做。
:::
:::

::: exercise 矩阵乘积的反向传播 {level=3}
设$C = AB$，$A\in\R^{m\times k}$，$B\in\R^{k\times n}$，$\bar C = \partial\mathcal{L}/\partial C$。证明$\bar A = \bar CB^\top$且$\bar B = A^\top\bar C$，并证明两者都算的代价是计算$C$的 FLOPs 的两倍。
::: solution
$C_{ij} = \sum_lA_{il}B_{lj}$，故$A_{il}$以系数$B_{lj}$影响所有$j$的$C_{ij}$。由[[#eq-adjoint]]，$\bar A_{il} = \sum_j\bar C_{ij}B_{lj} = (\bar CB^\top)_{il}$。同理，$B_{lj}$以系数$A_{il}$影响所有$i$的$C_{ij}$，故$\bar B_{lj} = \sum_iA_{il}\bar C_{ij} = (A^\top\bar C)_{lj}$。形状正确：$(m\times n)(n\times k) = m\times k$，$(k\times m)(m\times n) = k\times n$。计算$C$花$2mkn$ FLOPs；$\bar CB^\top$花$2mnk$，$A^\top\bar C$花$2kmn$，所以反向传播花$4mkn$，是前向传播的两倍——这正是[[#prop-flops]]逐层结论背后的事实。
:::
:::

::: exercise 为什么不用有限差分？ {level=3 check="(10^6+1)/3"}
一个网络有$N = 10^6$个权重，前向传播花$2BN$ FLOPs。用前向差分估计梯度需要$N + 1$次前向传播。它比反向传播的$6BN$贵多少倍？除了代价，也评论一下精度。
::: solution
$(N + 1)\cdot2BN/(6BN) = (N + 1)/3 = (10^6 + 1)/3\approx333{,}334$。有限差分还更不准：由[[#prop-fd]]，双精度下前向差分的误差最好也在$10^{-8}$左右，而反向传播算出的梯度除运算本身的舍入外是精确的。这就是为什么数值微分只用来在少数元素上*检查*梯度。
:::
:::

::: exercise sigmoid 链上的梯度 {level=3 check="0.25^10"}
考虑标量链$h_\ell = \sigma(w_\ell h_{\ell-1})$，$\ell = 1, \dots, L$，所有$\lvert w_\ell\rvert\le1$。证明$\lvert\partial h_L/\partial h_0\rvert\le4^{-L}$。计算$L = 10$时界的值，并解释它对到达第一层权重的梯度意味着什么。
::: solution
由链式法则$\partial h_L/\partial h_0 = \prod_{\ell=1}^L\sigma'(w_\ell h_{\ell-1})\,w_\ell$。每个因子满足$\lvert\sigma'\rvert\le\frac14$且$\lvert w_\ell\rvert\le1$，所以乘积的绝对值至多$4^{-L}$。$L = 10$时为$0.25^{10}\approx9.5\times10^{-7}$。对$w_1$的梯度是$\bar h_1\cdot\sigma'(w_1h_0)h_0$，而$\bar h_1$含有其余$L - 1$个因子之积，所以第一层的学习比最后一层慢大约一百万倍：**梯度消失问题**。更大的权重可以抵偿因子$\frac14$，但那样单元又会饱和，$\sigma'$变得更小。一般情形见[[neural-networks/initialisation-normalisation]]。
:::
:::
