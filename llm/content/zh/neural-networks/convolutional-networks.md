全连接层把输入当作一堆没有结构的数：把每张图像的像素按同样的方式重新排列，MLP 照样学得一模一样。图像、音频和许多其他信号并不是没有结构的。相邻的像素彼此相关，而猫无论在画面里出现在哪儿都是猫。**卷积网络**（convolutional network，CNN）把这两个事实内建到架构里：每个单元只看一个小小的邻域（**局部性**），并且在每个位置使用同一套权重（**权重共享**）。这样一来，这一层的参数比全连接层少得多，而且输入平移时输出随之平移。卷积网络是第一种在大规模上取得成功的深度架构——AlexNet 在2012年的 ImageNet 结果开启了深度学习时代——由它们搭建的残差网络引入了如今每个 Transformer 都在使用的跳跃连接。

本章定义卷积层，数出它的参数量与代价，证明它的平移等变性，推导它的反向传播，分析感受野的增长，并梳理从 LeNet 到 ResNet 再到视觉 Transformer 的架构演变。本章使用反向传播（[[neural-networks/backpropagation]]）以及[[neural-networks/initialisation-normalisation]]中的残差连接与归一化。

## 卷积层 {#sec-conv}

在深度学习中，“卷积”几乎总是指**互相关**（cross-correlation）：把一个小卷积核在输入上滑动，在每个位置取一个点积。（数学中的卷积会先把卷积核翻转；由于卷积核是学出来的，这一区别无关紧要。）

::: definition 卷积层 {#def-conv}
一个具有$C_{\text{in}}$个输入通道、$C_{\text{out}}$个输出通道、卷积核大小$k\times k$、步幅$s$、零填充$p$的**二维卷积层**，把输入$X\in\R^{C_{\text{in}}\times H\times W}$映到$Y\in\R^{C_{\text{out}}\times H'\times W'}$：

$$
Y_{o,i,j} = b_o + \sum_{c=1}^{C_{\text{in}}}\sum_{a=0}^{k-1}\sum_{b=0}^{k-1}K_{o,c,a,b}\,X_{c,\,si + a - p,\,sj + b - p},
$$ {#eq-conv}

其中$X$越界的元素按$0$计。参数是卷积核$K\in\R^{C_{\text{out}}\times C_{\text{in}}\times k\times k}$与偏置$\mathbf{b}\in\R^{C_{\text{out}}}$。每个输出通道是一张**特征图**（feature map）：一个学出来的滤波器在每个位置的响应。加上批次就多出一个前置维度，激活的形状为$(B, C, H, W)$。
:::

各列权重为$-1, 0, 1$的$3\times3$滤波器对竖直边缘有响应；权重全为相等正数的滤波器则做模糊。训练好的网络的第一层学到的正是这类滤波器——各种朝向的边缘与颜色检测器——后续层把它们组合成纹理、部件和物体。

::: proposition 输出尺寸与代价 {#prop-conv-size}
[[#def-conv]]的输出的空间尺寸为

$$
H' = \Big\lfloor\frac{H + 2p - k}{s}\Big\rfloor + 1
$$

（$W'$同理）。这一层有$k^2C_{\text{in}}C_{\text{out}} + C_{\text{out}}$个参数，每个样例约花费$2k^2C_{\text{in}}C_{\text{out}}H'W'$ FLOPs。
:::

::: proof
对输出行$i$，卷积核的左上角落在输入行$si - p$上；卷积核放得下当且仅当$si - p + k - 1\le H + p - 1$，即$i\le(H + 2p - k)/s$。行$i = 0, 1, \dots, \lfloor(H + 2p - k)/s\rfloor$都有效，这就是所声明的数目。卷积核为输出通道、输入通道与卷积核位置的每一种组合各有一个权重。每个输出值需要$k^2C_{\text{in}}$次乘加，而输出共有$C_{\text{out}}H'W'$个。
:::

取$k = 3$、$s = 1$、$p = 1$（“same”填充）时输出与输入同尺寸；取$s = 2$时空间尺寸减半，这是常见的**下采样**方式。

::: example ResNet 的第一层 {#ex-stem}
ResNet-50 以一个卷积开头：在$3\times224\times224$的图像上，用$64$个大小$7\times7$、步幅$2$、填充$3$的滤波器。求输出形状、参数个数、FLOPs，以及一个具有相同输入与输出尺寸的全连接层需要多少权重。
::: solution
$H' = \lfloor(224 + 6 - 7)/2\rfloor + 1 = 111 + 1 = 112$，所以输出是$64\times112\times112$。参数：$7\cdot7\cdot3\cdot64 + 64 = 9{,}472$（ResNet 实际上省去了这个偏置，因为后面紧跟批归一化）。FLOPs：$2\cdot49\cdot3\cdot64\cdot112\cdot112 = 2.36\times10^8$。全连接层则需要$(3\cdot224^2)\cdot(64\cdot112^2) = 150{,}528\cdot802{,}816\approx1.2\times10^{11}$个权重——多一千三百万倍。正是局部性与权重共享让视觉网络成为可行之事。
:::
:::

### 卷积是带约束的线性映射 {#sec-conv-linear}

尺寸固定时，[[#eq-conv]]对$X$是线性的，所以它就是一次矩阵乘法$\operatorname{vec}(Y) = M\operatorname{vec}(X)$，乘的是一个非常特殊的矩阵$M$：绝大多数元素为零（局部性），非零元素沿对角线重复（权重共享）。在一维单通道情形，$M$是一个带状的**托普利兹（Toeplitz）矩阵**；当$k = 3$、$s = 1$、不做填充时，

$$
M = \begin{pmatrix}w_0&w_1&w_2&0&\cdots&0\\0&w_0&w_1&w_2&\cdots&0\\\vdots&&\ddots&\ddots&\ddots&\vdots\\0&\cdots&0&w_0&w_1&w_2\end{pmatrix}.
$$

因此，卷积网络就是一个权重矩阵被限制成这种形式的 MLP。这一限制编码了一个先验——同一个局部模式无论出现在哪里都同样重要——这正是卷积网络学习视觉任务所需数据远少于 MLP 的主要原因。

::: proposition 平移等变性 {#prop-equivariance}
设$T_{\mathbf{u}}$在无穷网格$\Z^2$上（或在环面上，配圆形填充）把图像平移$\mathbf{u}\in\Z^2$：$(T_{\mathbf{u}}X)_{c, i, j} = X_{c, i - u_1, j - u_2}$。步幅为$1$的卷积与平移可交换：$\operatorname{conv}(T_{\mathbf{u}}X) = T_{\mathbf{u}}\operatorname{conv}(X)$。逐元素激活也与平移可交换，所以由步幅$1$的卷积与激活叠成的网络是平移等变的。
:::

::: proof
在无穷网格上用$s = 1$、$p = 0$的[[#eq-conv]]，

$$
\operatorname{conv}(T_{\mathbf{u}}X)_{o, i, j} = b_o + \sum_{c, a, b}K_{o, c, a, b}X_{c,\,i + a - u_1,\,j + b - u_2} = \operatorname{conv}(X)_{o,\,i - u_1,\,j - u_2} = \big(T_{\mathbf{u}}\operatorname{conv}(X)\big)_{o, i, j}.
$$

逐元素函数$\phi$显然满足$\phi(T_{\mathbf{u}}X) = T_{\mathbf{u}}\phi(X)$，而与$T_{\mathbf{u}}$可交换的映射的复合也与$T_{\mathbf{u}}$可交换。
:::

等变不是不变：特征图随着物体一起移动。不变性——无论物体在哪儿输出都一样——最后靠对所有位置做**池化**得到。等变在实践中也只近似成立：零填充在边界处破坏它，步幅对不是步幅整数倍的平移破坏它（这是卷积网络存在轻微平移敏感性的一个有据可查的原因；Zhang, 2019）。

::: widget plot
f: sin(x) + 0.3*sin(7*x); sin(x)*sin(w/2)/(w/2) + 0.3*sin(7*x)*sin(7*w/2)/(7*w/2)
x: -6.3, 6.3
y: -1.6, 1.6
sliders: w=0.9:0.05:2:0.05
labels: signal; after a moving-average filter of width $w$
caption: 卷积即滤波。一个含有慢分量与快分量的信号与宽度为$w$的矩形核（滑动平均）做卷积。每个正弦波出来后频率与相位不变，只是乘以频率与$w$之积对应的$\operatorname{sinc}$值：慢波留下，快波被抑制，且在$w = 2\pi/7\approx0.9$处完全消失。因为卷积与平移可交换，正弦函数是它的特征函数——这就是它能按频率分析的原因。
:::

### 多通道、$1\times1$与深度卷积 {#sec-variants}

每个输出通道对*所有*输入通道求和，所以卷积同时在通道之间与空间上混合信息。两个特例把这两种角色分开。**$1\times1$卷积**（$k = 1$）只混合通道：它在每个位置施加同一个$C_{\text{out}}\times C_{\text{in}}$矩阵，即逐位置地施加一个全连接层——正是 Transformer 的逐位置前馈层（[[transformers/transformer-block#def-ffn]]）。**深度卷积**（depthwise convolution）对每个通道各用一个$k\times k$滤波器，不做混合。深度卷积后接一个$1\times1$卷积，称为**深度可分离**卷积（depthwise separable，用于 MobileNet，Howard et al., 2017），花费$k^2C + C^2$个权重而非$k^2C^2$个。**膨胀卷积**（dilated convolution）把卷积核的抽头间隔$d$个像素排开，不增加参数就扩大所见的区域；WaveNet（van den Oord et al., 2016）把膨胀$1, 2, 4, \dots$叠起来，以长的一维上下文建模原始音频。

## 池化与感受野 {#sec-pooling}

::: definition 池化 {#def-pooling}
窗口为$k\times k$、步幅为$s$的**池化**（pooling）层把每个通道的每个窗口替换为一个汇总值：它的最大值（**最大池化**）或它的平均值（**平均池化**）。**全局平均池化**对每个通道在所有位置取平均，把$C\times H\times W$的特征图变成$\R^C$中的一个向量。
:::

池化没有参数。最大池化使输出对窗口内的小平移不敏感，它的反向规则只把梯度送给出最大值的位置（[[neural-networks/backpropagation#sec-rules]]）。现代架构常用带步幅的卷积代替网络内部的池化，但在分类器之前保留全局平均池化，使网络适用于任意尺寸的输入。

深层网络的每个单元只依赖输入的一块有限区域——它的**感受野**（receptive field），感受野随深度增长。

::: proposition 一串层的感受野 {#prop-receptive}
考虑$\ell = 1, \dots, L$层（卷积或池化），卷积核大小为$k_\ell$、步幅为$s_\ell$。第$L$层一个单元的感受野的边长为

$$
r_L = 1 + \sum_{\ell=1}^L(k_\ell - 1)\prod_{i=1}^{\ell-1}s_i .
$$ {#eq-receptive}
:::

::: proof
记$j_\ell = \prod_{i\le\ell}s_i$为第$\ell$层相邻两个单元之间以输入像素计的距离（“跳距”），并设$j_0 = 1$。第$\ell$层的一个单元看第$\ell - 1$层的$k_\ell$个相邻单元，这些单元的感受野边长为$r_{\ell-1}$、彼此错开$j_{\ell-1}$，合起来覆盖$r_\ell = r_{\ell-1} + (k_\ell - 1)j_{\ell-1}$个像素。由$r_0 = 1$展开即得[[#eq-receptive]]。
:::

::: widget plot
f: 1 + (k - 1)*x; 1 + (k - 1)*(2^x - 1)
x: 0, 8
y: 0, 120
sliders: k=3:2:7:1
labels: stride $1$ everywhere; stride $2$ in every layer (or dilations doubling)
caption: 由[[#eq-receptive]]得到的、大小为$k$的卷积核下感受野边长$r_L$随深度$L$变化的图像。步幅为$1$时每层增长$k - 1$；当每层都让分辨率减半（或保持分辨率、把膨胀加倍）时，增长是几何级的，$1 + (k - 1)(2^L - 1)$。
:::

没有步幅时，感受野只线性增长，每层多$k - 1$；步幅与池化让跳距成倍放大，使后面各层的感受野几何式增长。这就是分类网络反复下采样的原因：靠近顶端的单元必须看得见整个物体。

::: example 堆叠小卷积核 {#ex-vgg}
(a) 三层步幅为$1$的$3\times3$卷积堆起来有多大的感受野？对$C$个输入、输出通道，它们的权重与一个$7\times7$卷积相比如何？(b) 求 ResNet 词干（stem）之后的感受野：一个步幅$2$的$7\times7$卷积、一个步幅$2$的$3\times3$最大池化，再两个步幅$1$的$3\times3$卷积。
::: solution
(a) 由[[#eq-receptive]]，$r = 1 + 2 + 2 + 2 = 7$：与一层$7\times7$相同。权重是$3\cdot9C^2 = 27C^2$对$49C^2$，约$55\%$，而且这一堆有三个非线性而非一个。这一观察催生了 VGG（Simonyan and Zisserman, 2015），它只用$3\times3$卷积核。(b) 跳距依次为$1, 2, 4, 4$。四层后$r = 1 + 6\cdot1 + 2\cdot2 + 2\cdot4 + 2\cdot4 = 27$个像素。下面的清单从单个输出单元反向传播、数出收到非零梯度的输入像素，验证了(a)部分。
:::
:::

理论感受野高估了一个单元实际使用的范围：其中各像素的贡献远非均匀，而是集中在中心附近、大致按高斯衰减（Luo et al., 2016，“有效感受野”）。

## 卷积的反向传播 {#sec-conv-backward}

卷积是带共享卷积核的线性映射，它的反向规则可由线性映射与权重共享的规则得出。

::: proposition 卷积的梯度 {#prop-conv-backward}
对单通道一维卷积$y_i = \sum_{a=0}^{k-1}w_ax_{i+a}$（步幅$1$、无填充），设输出的伴随量为$\bar{\mathbf{y}}$，则

$$
\bar x_r = \sum_{a=0}^{k-1}w_a\,\bar y_{r-a},\qquad\bar w_a = \sum_i\bar y_i\,x_{i+a},
$$

其中越界的$\bar y_i$取$0$。输入梯度是$\bar{\mathbf{y}}$与翻转卷积核的一次*完整*卷积；卷积核梯度是输入与$\bar{\mathbf{y}}$的互相关。二维与多通道情形同样成立，只需对通道指标求和。
:::

::: proof
输入$x_r$出现在输出$y_i$中，当且仅当对某个卷积核位置$a$有$r = i + a$，系数为$w_a$；由扇出规则（[[neural-networks/backpropagation#thm-backprop]]），$\bar x_r = \sum_a\bar y_{r-a}w_a$。权重$w_a$被所有输出$y_i$共享，在每一项中的系数是$x_{i+a}$，所以$\bar w_a = \sum_i\bar y_ix_{i+a}$。把$\bar x_r = \sum_a w_a\bar y_{r-a}$用$\tilde w_a = w_{k-1-a}$改写，可见它是零填充的$\bar{\mathbf{y}}$与翻转卷积核的互相关。
:::

所以卷积的反向传播就是再来两次卷积，代价与前向传播相同——又是[[neural-networks/backpropagation#prop-flops]]的$2\times$。带步幅卷积的输入梯度，是把步幅为$1$的卷积核作用在*上采样*后的伴随量上，这一运算因此得名**转置卷积**，并被用于分割与生成模型中的上采样。

::: example 手算卷积及其梯度 {#ex-conv1d}
取$\mathbf{x} = (1, 2, 0, -1, 3)$、卷积核$\mathbf{w} = (1, 0, -1)$。计算$\mathbf{y}$，并对伴随量$\bar{\mathbf{y}} = (1, 0, 2)$计算$\bar{\mathbf{x}}$与$\bar{\mathbf{w}}$。
::: solution
$y_i = x_i - x_{i+2}$：$\mathbf{y} = (1 - 0, 2 + 1, 0 - 3) = (1, 3, -3)$——一个差分滤波器。由[[#prop-conv-backward]]，$\bar x_r = \sum_aw_a\bar y_{r-a}$：$\bar x_0 = 1$，$\bar x_1 = w_1\bar y_0 + w_0\bar y_1 = 0$，$\bar x_2 = w_2\bar y_0 + w_1\bar y_1 + w_0\bar y_2 = -1 + 0 + 2 = 1$，$\bar x_3 = w_2\bar y_1 + w_1\bar y_2 = 0$，$\bar x_4 = w_2\bar y_2 = -2$；所以$\bar{\mathbf{x}} = (1, 0, 1, 0, -2)$。又$\bar w_a = \sum_i\bar y_ix_{i+a}$：$\bar w_0 = 1\cdot1 + 0 + 2\cdot0 = 1$，$\bar w_1 = 2 + 0 + 2\cdot(-1) = 0$，$\bar w_2 = 0 + 0 + 2\cdot3 = 6$；所以$\bar{\mathbf{w}} = (1, 0, 6)$。
:::
:::

下面的清单实现了带步幅与填充的多通道二维卷积、按证明中散布规则实现的反向传播、一个梯度检查、一个平移等变性测试和一个经验感受野。

```python
import random

rng = random.Random(0)

def conv2d(X, W, stride=1, pad=0):
    """X: (C_in, H, W_), W: (C_out, C_in, k, k) -> (C_out, H_out, W_out); cross-correlation."""
    C_in, H, Wd = len(X), len(X[0]), len(X[0][0])
    C_out, k = len(W), len(W[0][0])
    Ho, Wo = (H + 2 * pad - k) // stride + 1, (Wd + 2 * pad - k) // stride + 1
    get = lambda c, i, j: X[c][i][j] if 0 <= i < H and 0 <= j < Wd else 0.0   # 零填充
    return [[[sum(W[o][c][a][b] * get(c, i * stride + a - pad, j * stride + b - pad)
                  for c in range(C_in) for a in range(k) for b in range(k))
              for j in range(Wo)] for i in range(Ho)] for o in range(C_out)]

def conv2d_backward(X, W, dY, stride=1, pad=0):
    """Gradients of sum(dY * conv2d(X, W)) with respect to X and W."""
    C_in, H, Wd = len(X), len(X[0]), len(X[0][0])
    C_out, k = len(W), len(W[0][0])
    dX = [[[0.0] * Wd for _ in range(H)] for _ in range(C_in)]
    dW = [[[[0.0] * k for _ in range(k)] for _ in range(C_in)] for _ in range(C_out)]
    for o in range(C_out):
        for i in range(len(dY[0])):
            for j in range(len(dY[0][0])):
                g = dY[o][i][j]
                for c in range(C_in):
                    for a in range(k):
                        for b in range(k):
                            r, s = i * stride + a - pad, j * stride + b - pad
                            if 0 <= r < H and 0 <= s < Wd:   # 每个输出把梯度散布回去
                                dX[c][r][s] += g * W[o][c][a][b]
                                dW[o][c][a][b] += g * X[c][r][s]
    return dX, dW

rand = lambda *shape: ([rand(*shape[1:]) for _ in range(shape[0])] if len(shape) > 1
                       else [rng.gauss(0, 1) for _ in range(shape[0])])
X, W = rand(2, 6, 6), rand(3, 2, 3, 3)          # 2 个输入通道，3 个输出通道，3x3 卷积核
Y = conv2d(X, W, stride=2, pad=1)
print("output shape", (len(Y), len(Y[0]), len(Y[0][0])), " expected (3, 3, 3)")

# 对随机的 dY，检查 L = sum(dY * Y) 的梯度
dY = rand(3, 3, 3)
L = lambda X, W: sum(a * b for o in range(3) for ra, rb in zip(conv2d(X, W, 2, 1)[o], dY[o])
                     for a, b in zip(ra, rb))
dX, dW = conv2d_backward(X, W, dY, 2, 1)
eps = 1e-6
X[1][2][3] += eps; lp = L(X, W); X[1][2][3] -= 2 * eps; lm = L(X, W); X[1][2][3] += eps
print(f"dL/dX[1][2][3]  analytic {dX[1][2][3]:.6f}  numeric {(lp - lm) / (2 * eps):.6f}")
W[2][0][1][1] += eps; lp = L(X, W); W[2][0][1][1] -= 2 * eps; lm = L(X, W); W[2][0][1][1] += eps
print(f"dL/dW[2][0][1][1]  analytic {dW[2][0][1][1]:.6f}  numeric {(lp - lm) / (2 * eps):.6f}")

# 平移等变性：输入平移则输出平移（步幅 1，远离边界）
img = [[[0.0] * 10 for _ in range(10)]]
img[0][3][4] = 1.0                                          # 单个亮像素
shifted = [[[0.0] * 10 for _ in range(10)]]
shifted[0][5][6] = 1.0                                      # 同一像素平移了 (2, 2)
K = rand(1, 1, 3, 3)
A, B = conv2d(img, K), conv2d(shifted, K)
same = all(abs(A[0][i][j] - B[0][i + 2][j + 2]) < 1e-12 for i in range(6) for j in range(6))
print("conv(shift(x)) == shift(conv(x)):", same)

# 感受野：三次 3x3 卷积后，哪些输入像素影响某一个输出？
x = [[[1.0] * 15 for _ in range(15)]]
k3 = [[[[1.0] * 3 for _ in range(3)]]]                       # 全 1 的 3x3 卷积核，1 通道
h1 = conv2d(x, k3); h2 = conv2d(h1, k3); h3 = conv2d(h2, k3)  # 13x13, 11x11, 9x9
g3 = [[[1.0 if (i, j) == (4, 4) else 0.0 for j in range(9)] for i in range(9)]]  # 单个输出
g2, _ = conv2d_backward(h2, k3, g3); g1, _ = conv2d_backward(h1, k3, g2); g0, _ = conv2d_backward(x, k3, g1)
rows = [i for i in range(15) if any(g0[0][i])]
cols = [j for j in range(15) if any(g0[0][i][j] for i in range(15))]
print(f"receptive field after three 3x3 layers: {len(rows)} x {len(cols)} input pixels")
```

```text
output shape (3, 3, 3)  expected (3, 3, 3)
dL/dX[1][2][3]  analytic 0.528159  numeric 0.528159
dL/dW[2][0][1][1]  analytic 6.088516  numeric 6.088516
conv(shift(x)) == shift(conv(x)): True
receptive field after three 3x3 layers: 7 x 7 input pixels
```

真正的实现并不这样循环。它们要么把输入小块重排成一个矩阵（“im2col”）再调用一次大矩阵乘法，要么在 cuDNN 这类库中使用基于 FFT 或 Winograd 的算法。

::: warning 通道在前还是在后，以及“same”的含义
各框架对布局的意见不一致：PyTorch 把图像存成$(B, C, H, W)$，TensorFlow 与 JAX 常用$(B, H, W, C)$。把一种布局喂给期待另一种的代码，当$C$恰好等于$H$或$W$时不会报错，只会产出垃圾。填充约定也不一致：“same”填充只在步幅为$1$时保持尺寸，而卷积核大小为偶数时填充无法对称。而且[[#prop-conv-size]]的输出尺寸公式向下取整，所以输入尺寸为奇数、步幅为$2$时会悄悄丢掉最后一行一列。搭卷积网络时，把每层之后的形状都打印出来。
:::

## 架构 {#sec-architectures}

卷积架构的历史，就是对同一个问题的一连串回答：怎样把网络做得更深，同时又让它可训练、可负担。

- **LeNet-5**（LeCun、Bottou、Bengio 与 Haffner，1998）：两层带$5\times5$卷积核的卷积加子采样，再接全连接层；约$60{,}000$个参数；用反向传播训练，识读银行支票上的手写数字。更早的一个版本（LeCun et al., 1989）已能识读邮政编码。
- **AlexNet**（Krizhevsky、Sutskever 与 Hinton，2012）：五层卷积加三层全连接，约$6{,}000$万个参数，ReLU 激活、Dropout、数据增强，在两块 GPU 上训练。它以$15.3\%$的 top-5 错误率赢得 ImageNet 竞赛，亚军为$26.2\%$。
- **VGG**（Simonyan 与 Zisserman，2015）：清一色的$3\times3$卷积堆叠，$16$或$19$层；VGG-16 约有$1.38$亿个参数，大多在全连接层里。
- **GoogLeNet / Inception**（Szegedy et al., 2015）：使用不同卷积核大小的并行分支，并在昂贵的卷积之前用$1\times1$卷积缩减通道；$22$层，参数远少于 VGG。
- **ResNet**（He、Zhang、Ren 与 Sun，2016）：带批归一化的残差模块（[[neural-networks/initialisation-normalisation#def-residual]]），在 ImageNet 上从$18$层到$152$层。更深的版本采用**瓶颈**（bottleneck）模块：先一个把通道缩至四分之一的$1\times1$卷积，再一个$3\times3$卷积，最后用一个$1\times1$卷积把通道恢复原样。ResNet-50 约有$2{,}560$万个参数，每张$224\times224$图像约需$3.8\times10^9$次乘加。

::: proposition 瓶颈模块的代价 {#prop-bottleneck}
在$C$个通道上含两个$3\times3$卷积的残差模块有$18C^2$个权重。而在$4C$个通道上的瓶颈模块——$1\times1$降到$C$个通道、$3\times3$作用在$C$个通道上、$1\times1$升回$4C$——有$17C^2$个权重，尽管它的残差流携带四倍多的通道。
:::

::: proof
$C$个通道上的两个$3\times3$卷积：$2\cdot9C^2 = 18C^2$。瓶颈模块：第一个$1\times1$花$4C\cdot C$，$3\times3$花$9C^2$，最后一个$1\times1$花$C\cdot4C$，合计$4C^2 + 9C^2 + 4C^2 = 17C^2$（忽略偏置与归一化参数）。FLOPs 按同样的比例缩放，因为每个权重在每个空间位置恰好用一次。
:::

ResNet 之后是改进——更宽的残差网络、分组卷积与深度卷积（ResNeXt、MobileNet、EfficientNet）——然后是来自 Transformer 的挑战。**视觉 Transformer**（vision Transformer，ViT；Dosovitskiy et al., 2021）把图像切成$16\times16$的图像块，对每个块线性嵌入，再用标准 Transformer 编码器处理图像块嵌入组成的序列（[[transformers]]）。图像块嵌入*就是*一个卷积核大小与步幅都为$16$的卷积。数据足够多时，ViT 追平或超过了卷积网络；数据少时，卷积网络内建的局部性与等变性占优。ConvNeXt（Liu et al., 2022）随后表明，用 Transformer 时代的设计选择——更大的卷积核、层归一化（LayerNorm）、GELU、更少的激活——现代化过的卷积网络再次具有竞争力。截至2026年，两大阵营都被广泛使用，许多多模态语言模型用 ViT 风格的编码器编码图像（[[multimodal]]）。

::: example 视觉 Transformer 的图像块嵌入 {#ex-vit}
ViT-Base 把$224\times224$的 RGB 图像按$16\times16$的图像块嵌入到$d = 768$维。有多少个图像块词元？把图像块嵌入写成卷积时它有多少个参数？
::: solution
每边$224/16 = 14$个图像块，共$14^2 = 196$个词元（原模型还要加上一个分类词元）。作为$C_{\text{in}} = 3$、$C_{\text{out}} = 768$、$k = s = 16$的卷积：$16\cdot16\cdot3\cdot768 + 768 = 590{,}592$个参数。由[[#prop-conv-size]]，输出为$768\times14\times14$，展平成$196$个$768$维向量组成的序列。因为步幅等于卷积核大小，图像块互不重叠，这个“卷积”不过是把一个线性层作用在每个展平的$768$维图像块上。
:::
:::

::: quiz
在一个$56\times56$的特征图上，以步幅$1$、填充$1$施加一个$256$个输入通道、$256$个输出通道的$3\times3$卷积。哪一句话是正确的？
- [ ] 输出是$54\times54$
- [x] 这一层有$589{,}824$个权重，输出是$56\times56$
- [ ] 这一层有$256\cdot256 = 65{,}536$个权重
- [ ] 它的代价与空间尺寸无关，因为权重是共享的
::: solution
由[[#prop-conv-size]]，$H' = (56 + 2 - 3)/1 + 1 = 56$，权重数为$3\cdot3\cdot256\cdot256 = 589{,}824$。权重共享让*参数个数*与空间尺寸无关，但代价$2\cdot589{,}824\cdot56^2\approx3.7\times10^9$ FLOPs随位置个数增长。
:::
:::

::: history
David Hubel 与 Torsten Wiesel 对猫视觉皮层的电生理记录（1959、1962）发现：“简单”细胞对特定位置上特定朝向的边缘作出响应，“复杂”细胞则在一片位置范围内对同样的边缘有响应。Kunihiko Fukushima 的**认知机**（neocognitron，1980）用这样的层搭建起层次结构，带权重共享与池化，不用反向传播训练。Yann LeCun 与贝尔实验室的同事们用反向传播训练卷积网络来识读邮政编码（1989）与支票（LeNet-5，1998）；Alex Waibel 的时延神经网络（1989）把同样的思想用到了语音上。这个领域的转折点是 ImageNet 数据集（Deng et al., 2009）和 Alex Krizhevsky、Ilya Sutskever 与 Geoffrey Hinton 借助 GPU 取得的 AlexNet 2012年胜利。2014年 VGG 与 GoogLeNet 接踵而至，Kaiming He、Xiangyu Zhang、Shaoqing Ren 与 Jian Sun 的残差网络以$152$层赢得2015年竞赛，超过了报道中该分类任务的人类水平错误率。视觉 Transformer（2021）把 Transformer 带到了视觉。
:::

::: summary
- **卷积层**在每个位置施加同一个小子卷积核：局部性与权重共享把参数降到$k^2C_{\text{in}}C_{\text{out}}$，与图像尺寸无关，而代价是$2k^2C_{\text{in}}C_{\text{out}}H'W'$ FLOPs。输出边长为$\lfloor(H + 2p - k)/s\rfloor + 1$。
- 卷积对应的矩阵是带状、共享权重的线性映射；步幅为$1$的卷积**平移等变**；对位置做池化把等变变成不变。
- 它的**反向传播**是两次卷积：输入梯度是输出梯度与翻转卷积核的卷积，卷积核梯度是输入与输出梯度的相关。
- **感受野**每层扩大$(k_\ell - 1)$乘以前面积累的步幅之积；$3\times3$卷积核的堆叠用更少的权重、更多的非线性达到更大卷积核的效果。
- LeNet $\to$ AlexNet $\to$ VGG $\to$ Inception $\to$ ResNet 这条脉络用 ReLU、归一化、$1\times1$瓶颈与残差连接把网络做得越来越深；视觉 Transformer 把图像块当作词元，其图像块嵌入是带步幅的卷积。
:::

## 习题

::: exercise 一个输出尺寸 {level=1 check="27"}
对$53\times53$的输入施加一个步幅$2$、填充$2$的$5\times5$卷积。输出尺寸是多少？
::: solution
$\lfloor(53 + 4 - 5)/2\rfloor + 1 = \lfloor26\rfloor + 1 = 27$，即$27\times27$。
:::
:::

::: exercise 数参数 {level=1 check="73856"}
从$64$个通道到$128$个通道的$3\times3$卷积有多少个参数（含偏置）？
::: solution
$3\cdot3\cdot64\cdot128 + 128 = 73{,}728 + 128 = 73{,}856$。
:::
:::

::: exercise 一个感受野 {level=1 check="13"}
求四层$3\times3$卷积堆叠的感受野，其中第二层步幅为$2$，其余步幅为$1$。
::: solution
在[[#eq-receptive]]中，每层的贡献$k_\ell - 1 = 2$要乘以*它前面*各层步幅的乘积：第$1$到第$4$层分别为$1$、$1$、$2$、$2$。所以$r = 1 + 2\cdot1 + 2\cdot1 + 2\cdot2 + 2\cdot2 = 13$。没有步幅时感受野为$9$。
:::
:::

::: exercise 深度可分离卷积的节省 {level=2 check="(9*256+256^2)/(9*256^2)"}
比较从$256$到$256$通道的$3\times3$卷积与深度可分离卷积（$256$个通道上的深度$3\times3$卷积，再加从$256$到$256$的$1\times1$卷积）的权重数。给出比值。
::: solution
标准：$9\cdot256^2 = 589{,}824$。可分离：$9\cdot256 + 256^2 = 2{,}304 + 65{,}536 = 67{,}840$。比值$67{,}840/589{,}824 = 0.115$，接近$1/k^2 + 1/C = 1/9 + 1/256$。FLOPs 以同样的比例下降，代价是些许精度损失，由 MobileNet 这类架构用更多通道补回。
:::
:::

::: exercise 一层的代价 {level=2 check="2*9*256*256*56*56"}
计算测验中那一层每张图像的 FLOPs，以及仅这一层在$256$张图像的批次上一步训练的 FLOPs。
::: solution
前向：每张图像$2\cdot9\cdot256\cdot256\cdot56\cdot56 = 3.70\times10^9$ FLOPs。一步训练的代价约为前向的三倍（[[neural-networks/backpropagation#prop-flops]]），所以仅这一层就是$3\cdot256\cdot3.70\times10^9\approx2.8\times10^{12}$ FLOPs。
:::
:::

::: exercise 等变性与步幅 {level=2}
用一维的例子说明步幅为$2$的卷积对平移一个位置不等变。它对哪些平移等变？以何种意义？
::: solution
取大小为$1$、步幅为$2$的卷积核$(1)$：它保留偶数下标的元素，$y_i = x_{2i}$。对$\mathbf{x} = (1, 0, 0, 0)$，$\mathbf{y} = (1, 0)$；输入平移一位得$(0, 1, 0, 0)$，输出$\mathbf{y} = (0, 0)$，这不是$(1, 0)$的平移。输入平移$2$个位置则输出平移$1$位：$(T_2\mathbf{x})_{2i} = x_{2i-2} = y_{i-1}$。所以步幅为$s$的卷积对$s$的整数倍平移等变，输出的平移量是平移量除以$s$。反复下采样会加剧这一点，这就是卷积网络的输出在单像素平移下仍可能明显变化的原因。
:::
:::

::: exercise 卷积即矩阵 {level=2}
写出在长度为$4$的输入上、卷积核为$(w_0, w_1)$、步幅$1$、无填充的一维卷积的矩阵$M$。再证明$M^\top\bar{\mathbf{y}}$恰为[[#prop-conv-backward]]中的输入梯度。
::: solution
输出长度为$3$，$M = \begin{pmatrix}w_0&w_1&0&0\\0&w_0&w_1&0\\0&0&w_0&w_1\end{pmatrix}$。于是$M^\top\bar{\mathbf{y}} = (w_0\bar y_0,\ w_1\bar y_0 + w_0\bar y_1,\ w_1\bar y_1 + w_0\bar y_2,\ w_1\bar y_2)$，而[[#prop-conv-backward]]给出$\bar x_r = \sum_aw_a\bar y_{r-a}$：$\bar x_0 = w_0\bar y_0$，$\bar x_1 = w_0\bar y_1 + w_1\bar y_0$，$\bar x_2 = w_0\bar y_2 + w_1\bar y_1$，$\bar x_3 = w_1\bar y_2$——完全一致。任何线性层的输入梯度都是乘转置，这里就是“转置卷积”。
:::
:::

::: exercise 瓶颈模块对比基本模块 {level=3 check="17/18"}
用[[#prop-bottleneck]]求$4C$个通道上的瓶颈模块与$C$个通道上的基本模块的权重之比。再算出$C = 64$时两者的权重数，并解释 ResNet-50 为何尽管更深仍采用瓶颈模块。
::: solution
$17C^2/18C^2 = 17/18\approx0.944$。$C = 64$时：基本模块$18\cdot4{,}096 = 73{,}728$个权重；瓶颈模块$17\cdot4{,}096 = 69{,}632$个权重，残差流却是$256$个通道而非$64$。参数与代价大致相同时，瓶颈模块有三个非线性层而非两个，沿跳跃连接传递的表示宽四倍，这让 He et al. 能以适中的代价搭出$50$、$101$与$152$层的网络。$1\times1$卷积廉价地完成了通道混合；只有窄窄的中间层付出$k^2$因子。
:::
:::

::: exercise 膨胀堆叠的感受野 {level=3 check="2^8"}
WaveNet 把卷积核大小为$2$、膨胀为$1, 2, 4, \dots, 2^{L-1}$（步幅$1$）的一维因果卷积堆叠起来。膨胀$d$使卷积核的两个抽头相距$d$个位置，这在[[#eq-receptive]]中相当于把$k_\ell - 1$换成$(k_\ell - 1)d_\ell$。求$L = 8$时这种堆叠的感受野，并与同深度、无膨胀的堆叠比较。
::: solution
$r = 1 + \sum_{\ell=1}^L(2 - 1)\,2^{\ell-1} = 1 + (2^L - 1) = 2^L$。$L = 8$时$r = 256$个采样点。$8$个大小为$2$的卷积核无膨胀堆叠$r = 1 + 8 = 9$。膨胀让感受野随深度指数增长，而每层不增加额外代价——这是用卷积获得长上下文的一种办法，WaveNet 用若干这样的堆叠重复了这一做法。
:::
:::

::: exercise 全局平均池化与参数 {level=3}
ResNet-50 最后一个卷积阶段在$7\times7$的网格上输出$2{,}048$个通道。比较一个$1{,}000$类分类器的参数量：(a) 把特征图展平后接一个全连接层；(b) 先做全局平均池化。(b) 还多得到了什么？
::: solution
(a) 展平的输入有$2{,}048\cdot49 = 100{,}352$个特征，该层需要$100{,}352\cdot1{,}000 + 1{,}000\approx1.0\times10^8$个参数——是 ResNet-50 其余部分的四倍。(b) 池化后输入有$2{,}048$个特征：$2{,}048\cdot1{,}000 + 1{,}000 = 2{,}049{,}000$个参数，少了$49$倍。全局池化还让网络接受任意尺寸的输入（网格可以是$7\times7$或$10\times10$；池化后的向量都含$2{,}048$个分量），并使预测对证据出现在图像何处保持不变，走完从等变到不变的一步。VGG 庞大的全连接层占了它$1.38$亿参数的大部分，正是方案(a)之代价的写照。
:::
:::
