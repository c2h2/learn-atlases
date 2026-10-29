[[ml-fundamentals/generalisation]]告诉我们，用少量样例拟合的灵活模型方差很大：它会拟合噪声，于是即使训练误差极小，测试误差也可能很大。**正则化**是一系列办法的统称，这些办法在不放弃灵活模型的前提下降低这种方差——除了“拟合数据”之外，还告诉学习器：在那些能拟合数据的函数里，*哪些*更合心意。Goodfellow、Bengio 与 Courville（2016）给了一个宽泛的定义：对学习算法所作的任何意图降低其泛化误差、而非降低其训练误差的修改，都叫正则化。

本章讨论四种经典形式，每一种都会在学习神经网络与语言模型时重登舞台。对权重取值的**惩罚**（$\ell_2$给出岭回归与权重衰减，$\ell_1$给出 lasso 与稀疏性）；对梯度下降的**早停**，事实证明它的作用与 $\ell_2$惩罚十分相像；**数据增强**通过造出新样例来编码已知的不变性，其最简单的情形又是以一个惩罚等价实现的；最后是把这些统一起来的**贝叶斯**解读：惩罚就是一个先验，而完全贝叶斯的替代做法不是挑出一个模型，而是对数据允许的所有模型做平均。深度网络特有的方法——dropout、归一化、标签平滑——在[[neural-networks/regularisation-deep]]。

全文都会用到[[math-for-ml/matrix-decompositions]]的奇异值分解、[[ml-fundamentals/linear-regression#def-ridge]]的岭估计，以及[[math-for-ml/estimation#prop-weight-decay]]中先验与惩罚的对应关系。

## 惩罚化的经验风险 {#sec-penalties}

::: definition 正则化的经验风险最小化 {#def-penalised}
给定经验风险$\hat R_S(\mathbf{w})$与一个**惩罚**（正则项）$\Omega(\mathbf{w})\ge0$，**正则化 ERM**返回

$$
\hat{\mathbf{w}}_\lambda = \arg\min_{\mathbf{w}}\Big[\hat R_S(\mathbf{w}) + \lambda\,\Omega(\mathbf{w})\Big],
$$

其中**正则化强度**$\lambda\ge0$是一个超参数。常见的惩罚是$\Omega(\mathbf{w}) = \frac12\lVert\mathbf{w}\rVert_2^2$（**$\ell_2$**，岭、Tikhonov、权重衰减）与$\Omega(\mathbf{w}) = \lVert\mathbf{w}\rVert_1 = \sum_j\lvert w_j\rvert$（**$\ell_1$**，即 lasso）。截距通常不加惩罚。
:::

惩罚并不限制假设类——每个$\mathbf{w}$依然是允许的——但它让大权重变得“昂贵”，以至于只有当大权重换来的训练损失下降相应够大时，它才会被选中。对凸损失，存在一个等价的**约束**形式：对每个$\lambda > 0$都有某个半径$r$，使得$\hat{\mathbf{w}}_\lambda$同样在约束$\Omega(\mathbf{w})\le r$之下极小化$\hat R_S(\mathbf{w})$，反之亦然。惩罚正是该约束的拉格朗日乘子（[[math-for-ml/optimisation#sec-constrained]]）。约束形式解释了几何图像；被实际优化的则是惩罚形式。

::: widget contour
f: (x - 2)^2 + 2(y - 1)^2
constraint: x^2 + y^2 - 1
x: -2.5, 3.5
y: -2, 2.5
point: 0.8, 0.6
caption: 把岭回归看作约束问题。等高线是某个二次训练损失的等值线，其无约束极小点在$(2, 1)$；圆是约束$\lVert\mathbf{w}\rVert^2\le1$。拖动那个点：约束极小点出现在某条等值线与圆相切之处，在那里损失的梯度与约束的梯度平行——这就是拉格朗日条件，其乘子正是惩罚$\lambda$。解被拉向原点，并且沿损失更平坦的$x$方向拉得更多。
:::

### $\ell_2$惩罚在每个方向上的作用 {#sec-ridge-svd}

对最小二乘，$\ell_2$惩罚的效果可以被精确读出。设$X = U\Sigma V^\top$为瘦奇异值分解，奇异值$s_1\ge\dots\ge s_p > 0$，左奇异向量$\mathbf{u}_j$（在$\R^n$中标准正交），右奇异向量$\mathbf{v}_j$（在$\R^p$中标准正交）。

::: proposition 岭回归沿奇异方向收缩 {#prop-ridge-svd}
岭估计$\hat{\mathbf{w}}_\lambda = (X^\top X + \lambda I)^{-1}X^\top\mathbf{y}$及其拟合值为

$$
\hat{\mathbf{w}}_\lambda = \sum_{j=1}^p\frac{s_j^2}{s_j^2 + \lambda}\cdot\frac{\mathbf{u}_j^\top\mathbf{y}}{s_j}\,\mathbf{v}_j,\qquad X\hat{\mathbf{w}}_\lambda = \sum_{j=1}^p\frac{s_j^2}{s_j^2 + \lambda}\,(\mathbf{u}_j^\top\mathbf{y})\,\mathbf{u}_j.
$$ {#eq-ridge-svd}

最小二乘（$\lambda = 0$）把因子$s_j^2/(s_j^2 + \lambda)$取为$1$。岭几乎原样保留$s_j^2\gg\lambda$的方向，而压制$s_j^2\ll\lambda$的方向。它的**有效参数个数**为$\operatorname{df}(\lambda) = \sum_js_j^2/(s_j^2 + \lambda)$，随$\lambda$增大从$p$降到$0$。
:::

::: proof
$X^\top X = V\Sigma^2V^\top$且$X^\top\mathbf{y} = V\Sigma U^\top\mathbf{y}$，于是$(X^\top X + \lambda I)^{-1}X^\top\mathbf{y} = V(\Sigma^2 + \lambda I)^{-1}\Sigma U^\top\mathbf{y}$，它在基$\mathbf{v}_j$下的第$j$个坐标是$s_j(\mathbf{u}_j^\top\mathbf{y})/(s_j^2 + \lambda)$，正是所给的表达式。乘以$X$把$\mathbf{v}_j$映为$s_j\mathbf{u}_j$，即得拟合值。拟合值为$H_\lambda\mathbf{y}$，其中$H_\lambda = U\operatorname{diag}\big(s_j^2/(s_j^2 + \lambda)\big)U^\top$，而$\operatorname{df}(\lambda) = \operatorname{tr}H_\lambda$把最小二乘帽子矩阵的迹$p$推广开来（[[ml-fundamentals/linear-regression#prop-projection]]）。
:::

奇异值小的方向，就是数据几乎不沿其变化的方向：训练输入几乎分不开只沿$\mathbf{v}_j$不同的两个权重向量。最小二乘却偏要除以一个小数目，把这根方向上的系数估成$\mathbf{u}_j^\top\mathbf{y}/s_j$，于是$\mathbf{y}$中的噪声被放大$1/s_j$倍。这正是近似共线的特征、高次多项式，以及[[ml-fundamentals/generalisation#sec-modern]]中插值峰值处方差爆炸的根源。岭恰恰压低这些方向。[[ml-fundamentals/generalisation]]的习题7表明，这种压低只要选取得当，就是用一点偏差换取更大的方差下降。

::: example 收缩因子 {#ex-shrinkage}
某中心化设计矩阵的奇异值平方为$s_j^2 = 10$、$1$与$0.1$。取$\lambda = 1$，计算收缩因子与有效参数个数。每个方向的噪声放大各改变了多少？
::: solution
因子$s_j^2/(s_j^2 + 1)$为$10/11 = 0.909$、$1/2 = 0.5$与$0.1/1.1 = 0.091$，故$\operatorname{df}(1) = 1.50$：名义上三个参数，有效的一半个。$\mathbf{u}_j^\top\mathbf{y}$中的噪声在最小二乘中乘以$1/s_j$，在岭中乘以$s_j/(s_j^2 + \lambda)$。对$s_j^2 = 0.1$（$s_j = 0.316$），两者是$3.16$比$0.287$，缩小十一倍；对$s_j^2 = 10$，是$0.316$比$0.287$，几乎没变。
:::
:::

### $\ell_1$惩罚与稀疏性 {#sec-lasso}

把平方换成绝对值，解的性质就变了：许多系数会变成*恰好*的零。若设计矩阵是正交归一的，解有显式公式。

::: proposition 正交特征上的 lasso 是软阈值 {#prop-lasso}
设$X^\top X = I$，并令$\mathbf{z} = X^\top\mathbf{y}$为最小二乘估计。$\frac12\lVert\mathbf{y} - X\mathbf{w}\rVert^2 + \lambda\lVert\mathbf{w}\rVert_1$的极小点为

$$
\hat w_j = \operatorname{sign}(z_j)\max(\lvert z_j\rvert - \lambda, 0)\qquad(j = 1, \dots, p),
$$

而$\frac12\lVert\mathbf{y} - X\mathbf{w}\rVert^2 + \frac\lambda2\lVert\mathbf{w}\rVert^2$的极小点为$\hat w_j = z_j/(1 + \lambda)$。
:::

::: proof
当$X^\top X = I$时，$\frac12\lVert\mathbf{y} - X\mathbf{w}\rVert^2 = \frac12\lVert\mathbf{y}\rVert^2 - \mathbf{w}^\top\mathbf{z} + \frac12\lVert\mathbf{w}\rVert^2 = \frac12\lVert\mathbf{w} - \mathbf{z}\rVert^2 + \text{const}$，于是两个问题都分离成一维问题$\min_w\frac12(w - z)^2 + \lambda\lvert w\rvert$（相应地为$+\frac\lambda2w^2$）。$\ell_2$情形的导数是$w - z + \lambda w$，零点为$w = z/(1 + \lambda)$。$\ell_1$情形中，当$w > 0$时导数为$w - z + \lambda$，在$w = z - \lambda$处为零，而这只有当$z > \lambda$时才是合法的正解；对称地，$z < -\lambda$时$w = z + \lambda$。若$\lvert z\rvert\le\lambda$，目标函数在$0$右侧近旁斜率为$-z + \lambda\ge0$、左侧近旁为$-z - \lambda\le0$，故$w = 0$就是极小点。目标是严格凸的，所以这些极小点都唯一。
:::

$\ell_2$惩罚把每个系数按同一个*因子*收缩；$\ell_1$惩罚把每个系数按同一个*数额*收缩，并把小的那些置为零。几何上，$\ell_1$球$\{\lVert\mathbf{w}\rVert_1\le r\}$是顶点落在坐标轴上的菱形，损失的等值线通常先碰到它的某个顶点，而顶点处有些坐标为零。稀疏解完成了特征选择，让模型求值更便宜、也更易读，还是压缩感知的基石。统计上，$\ell_1$是拉普拉斯先验下的 MAP 惩罚（[[math-for-ml/estimation#prop-weight-decay]]）。一般情形（$X$不正交归一）下 lasso 没有封闭形式，要用坐标下降或邻近梯度法求解，而这两种方法的每一步都是一次软阈值。

::: widget plot
f: sign(x)*max(abs(x) - l, 0); x/(1 + l); x
x: -3, 3
y: -3, 3
sliders: l=0.5:0:2:0.05
labels: lasso (soft threshold); ridge; least squares
equal: true
caption: 正交特征下，单个系数的惩罚估计随其最小二乘值$z$变化的图像（[[#prop-lasso]]）。lasso 把所有$\lvert z\rvert\le\lambda$的值置为恰好零，其余的向零平移$\lambda$；ridge 把每个值缩放$1/(1 + \lambda)$，永远到不了零。大系数受 ridge 的偏差比受 lasso 的更大。
:::

::: example lasso 对 ridge {#ex-lasso}
正交特征下最小二乘系数为$\mathbf{z} = (3, -0.8, 0.2)$。按[[#prop-lasso]]的参数化，取$\lambda = 0.5$，计算 lasso 与 ridge 估计。
::: solution
lasso：$\operatorname{sign}(z_j)\max(\lvert z_j\rvert - 0.5, 0)$给出$(2.5, -0.3, 0)$——第三个特征被丢掉了，每个幸存的系数都向零移动$0.5$。ridge：$z_j/1.5$给出$(2, -0.533, 0.133)$——什么都不丢，而绝对值损失最大的是那个最大的系数。
:::
:::

## 权重衰减 {#sec-weight-decay}

在基于梯度的训练中，$\ell_2$惩罚有一个简单的机械解释。

::: proposition $\ell_2$惩罚就是权重衰减 {#prop-decay}
对$\hat R_S(\mathbf{w}) + \frac\lambda2\lVert\mathbf{w}\rVert^2$走一步大小为$\eta$的梯度，得

$$
\mathbf{w}\leftarrow(1 - \eta\lambda)\,\mathbf{w} - \eta\nabla\hat R_S(\mathbf{w}):
$$

即权重先被乘以**衰减因子**$1 - \eta\lambda$，再按原来的梯度更新。没有梯度信号时，权重按几何级数衰减，$t$步后只剩原值的$(1 - \eta\lambda)^t\approx e^{-\eta\lambda t}$。
:::

证明只有一行：$\frac\lambda2\lVert\mathbf{w}\rVert^2$的梯度是$\lambda\mathbf{w}$。数据持续支持的权重由梯度维持；数据不需要的权重则向零衰减。对朴素（随机）梯度下降，惩罚与衰减本来就是同一件事。但对 Adam 这类自适应优化器并非如此：把$\lambda\mathbf{w}$加进梯度，会让逐坐标的自适应缩放压低大梯度参数的衰减；而把权重直接乘以$1 - \eta\lambda$——**解耦权重衰减**，即 Loshchilov 与 Hutter（2019）的 AdamW 优化器——让所有权重以同样的速率衰减。AdamW 是训练 Transformer 的标准优化器（见[[math-for-ml/optimisation]]）；在这类训练中，权重衰减通常只施加于权重矩阵，不施加于偏置与归一化参数——这是一种约定，不是定理。

::: example 权重衰减得有多快 {#ex-decay}
某模型用学习率$\eta = 0.01$、权重衰减$\lambda = 0.1$训练。每步的衰减因子是多少？一个始终收不到梯度的权重，$1000$步后还剩原值的多少？多少步能减半？
::: solution
因子为$1 - 0.001 = 0.999$。$1000$步后剩$0.999^{1000} = 0.368\approx e^{-1}$。减半需要$\log2/(-\log0.999)\approx693$步。在$10^5$步的训练中，一个得不到支持的权重会被“忘掉”好几轮；决定遗忘时间尺度的是乘积$\eta\lambda$而不是其中任何一个数——这就是改了学习率却不同步调整权重衰减、等效正则化就会改变的原因。
:::
:::

## 早停 {#sec-early-stopping}

从$\mathbf{w}_0 = \mathbf{0}$出发的梯度下降朝最小二乘解移动，但并不均匀：奇异值大的方向先被拟合，奇异值小的方向——那些噪声多的方向——最后才被拟合。及早停下手来本身就是一种正则化器，而且对最小二乘，它可以与岭作精确比较。本节损失取$\frac12\lVert\mathbf{y} - X\mathbf{w}\rVert^2$，其梯度为$X^\top(X\mathbf{w} - \mathbf{y})$。

::: proposition 早停就是谱滤波 {#prop-early-stopping}
梯度下降$\mathbf{w}_{t+1} = \mathbf{w}_t - \eta X^\top(X\mathbf{w}_t - \mathbf{y})$从$\mathbf{w}_0 = \mathbf{0}$出发，设$0 < \eta s_1^2 < 1$，则$t$步后

$$
\mathbf{w}_t = \sum_{j=1}^p\Big[1 - (1 - \eta s_j^2)^t\Big]\frac{\mathbf{u}_j^\top\mathbf{y}}{s_j}\,\mathbf{v}_j.
$$ {#eq-early-stopping}

与[[#eq-ridge-svd]]相比，岭的因子$s^2/(s^2 + \lambda)$被$1 - (1 - \eta s^2)^t$取代。两者对大的$s^2$都接近$1$，对小的$s^2$都接近$0$；并且在$s^2\ll\lambda$时都接近$s^2/\lambda$，只要按$\lambda = 1/(\eta t)$来对应。
:::

::: proof
记$\mathbf{w}_t = \sum_jc_j(t)\mathbf{v}_j$。由$X^\top X\mathbf{v}_j = s_j^2\mathbf{v}_j$且$X^\top\mathbf{y} = \sum_js_j(\mathbf{u}_j^\top\mathbf{y})\mathbf{v}_j$（在$\mathbf{v}_j$的张成之外没有别的分量），更新便逐坐标解耦：$c_j(t + 1) = (1 - \eta s_j^2)c_j(t) + \eta s_j\,\mathbf{u}_j^\top\mathbf{y}$。由$c_j(0) = 0$与不动点$c_j^* = \mathbf{u}_j^\top\mathbf{y}/s_j$，误差$c_j(t) - c_j^*$每步乘以$1 - \eta s_j^2$，故$c_j(t) = c_j^*\big(1 - (1 - \eta s_j^2)^t\big)$。至于比较：若$\eta s^2t\ll1$，则$1 - (1 - \eta s^2)^t\approx\eta s^2t$；若$s^2\ll\lambda$，则$s^2/(s^2 + \lambda)\approx s^2/\lambda$；取$\lambda = 1/(\eta t)$两者一致。$s^2$大时两个因子都趋于$1$。
:::

于是步数起着正则化强度倒数的作用：训练得越久，就像$\lambda$取得越小。在验证误差的最小处停手是一种廉价的模型选择——只需要一次带检查点的训练——几乎每个神经网络都在用它。这一等价只对二次损失精确成立，但定性的图景（梯度下降先学大尺度、确定得好的结构，最后才去拟合噪声）可以搬到神经网络上来，神经网络的训练曲线常常显示验证损失先降到一个最小值、随后回升，而训练损失还在下降。

::: widget plot
f: x/(x + l); 1 - (1 - h*x)^t
x: 0, 1
y: 0, 1.05
sliders: l=0.05:0.005:0.5:0.005; h=0.1:0.01:0.9:0.01; t=200:1:2000:1
labels: ridge $s^2/(s^2 + \lambda)$; early stopping $1 - (1 - \eta s^2)^t$
caption: [[#prop-early-stopping]]的两种谱滤波作为奇异值平方$s^2$的函数。取$\lambda = 1/(\eta t)$（例如$\eta = 0.1$、$t = 200$、$\lambda = 0.05$），两条曲线在小$s^2$处几乎重合；早停截断得更陡。增大$t$会让早停滤波器向左移，放进更多确定得不好的方向，正像减小$\lambda$一样。
:::

::: example 步数与惩罚 {#ex-early}
取$\eta = 0.1$、$t = 100$步，在$s^2 = 0.01$、$0.1$与$1$处比较早停因子与岭因子（取$\lambda = 1/(\eta t)$）。
::: solution
$\lambda = 1/(0.1\cdot100) = 0.1$。

| $s^2$ | 早停 $1 - (1 - 0.1s^2)^{100}$ | ridge $s^2/(s^2 + 0.1)$ |
|---|---|---|
| $0.01$ | $1 - 0.999^{100} = 0.095$ | $0.091$ |
| $0.1$ | $1 - 0.99^{100} = 0.634$ | $0.500$ |
| $1$ | $1 - 0.9^{100} = 1.000$ | $0.909$ |

两者在方差最关键的小$s^2$方向上非常一致，而早停更接近“留还是弃”：确定得好的方向它原封不动，岭却连它们也要稍稍带上偏差。
:::
:::

## 数据增强 {#sec-augmentation}

降低方差最直接的办法是多要数据。当我们知道某些变换不应改变标签——平移几个像素或左右翻转的照片、稍快一点的音频片段、替换了同义词或先翻译成另一种语言再翻回来的句子——就可以用变换后的副本**增强**训练集。这是把先验知识编码进数据而不是编码进惩罚；对图像而言，它常常是最有效的单个正则化器。变换必须真正保持标签：镜像对猫的照片无害，对文字图像、或被旋转$180°$的数字$6$和$9$就是灾难。

最简单的增强——给输入加小随机噪声——等价于一种惩罚。

::: proposition 输入噪声就是岭回归 {#prop-noise}
对线性模型，设每个输入受到独立噪声$\boldsymbol\xi$的扰动，$\E\boldsymbol\xi = \mathbf{0}$，$\Cov\boldsymbol\xi = \nu^2I$。则期望平方损失为

$$
\E_{\boldsymbol\xi}\big[(y - \mathbf{w}^\top(\mathbf{x} + \boldsymbol\xi))^2\big] = (y - \mathbf{w}^\top\mathbf{x})^2 + \nu^2\lVert\mathbf{w}\rVert^2,
$$

因此在数据的大量含噪副本上训练，极限情形下就是在极小化岭目标：对总损失施加惩罚$n\nu^2$（等价地，对平均损失施加$\nu^2$）。
:::

::: proof
$y - \mathbf{w}^\top(\mathbf{x} + \boldsymbol\xi) = (y - \mathbf{w}^\top\mathbf{x}) - \mathbf{w}^\top\boldsymbol\xi$。平方后取期望：交叉项因$\E\boldsymbol\xi = \mathbf{0}$而消失，且$\E(\mathbf{w}^\top\boldsymbol\xi)^2 = \mathbf{w}^\top\Cov(\boldsymbol\xi)\mathbf{w} = \nu^2\lVert\mathbf{w}\rVert^2$。对$n$个样例求和，得到惩罚$n\nu^2\lVert\mathbf{w}\rVert^2$。
:::

Bishop（1995）把这个结果在$\nu^2$的一阶精度内推广到了非线性模型，它解释了噪声增强为何能正则化：一个必须对相近输入给出同样答案的模型不敢用大权重——大权重会让模型对微小扰动敏感。更丰富的增强编码更丰富的不变性（习题9算出其中一个例子）；对语言模型，类似物是预训练语料库本身的庞杂多样，外加机器翻译中的回译一类技术（Sennrich、Haddow 与 Birch，2016）。

## 贝叶斯视角 {#sec-bayesian}

[[ml-fundamentals/linear-regression#prop-ridge-map]]表明，岭回归是高斯先验下的 MAP 估计。MAP 只取后验的众数，把其余部分统统丢掉。若保留整个后验，得到的就更多：对每个预测有多不确定的一个度量。

::: proposition 贝叶斯线性回归 {#prop-posterior}
设$\mathbf{y}\mid\mathbf{w}\sim\Normal(X\mathbf{w}, \sigma^2I)$，先验$\mathbf{w}\sim\Normal(\mathbf{0}, \tau^2I)$。后验为$\Normal(\mathbf{m}, \Sigma_{\text{post}})$，其中

$$
\Sigma_{\text{post}} = \Big(\frac{X^\top X}{\sigma^2} + \frac{I}{\tau^2}\Big)^{-1},\qquad\mathbf{m} = \frac1{\sigma^2}\Sigma_{\text{post}}X^\top\mathbf{y} = \Big(X^\top X + \frac{\sigma^2}{\tau^2}I\Big)^{-1}X^\top\mathbf{y}.
$$

后验均值正是取$\lambda = \sigma^2/\tau^2$的岭估计。在$\mathbf{x}_*$处新标签的**后验预测**分布为$\Normal\big(\mathbf{m}^\top\mathbf{x}_*,\ \sigma^2 + \mathbf{x}_*^\top\Sigma_{\text{post}}\mathbf{x}_*\big)$。
:::

::: proof
对数后验在相差一个常数下为$-\frac1{2\sigma^2}\lVert\mathbf{y} - X\mathbf{w}\rVert^2 - \frac1{2\tau^2}\lVert\mathbf{w}\rVert^2 = -\frac12\mathbf{w}^\top A\mathbf{w} + \mathbf{w}^\top\mathbf{b} + \text{const}$，其中$A = X^\top X/\sigma^2 + I/\tau^2$，$\mathbf{b} = X^\top\mathbf{y}/\sigma^2$。配方后它是$-\frac12(\mathbf{w} - A^{-1}\mathbf{b})^\top A(\mathbf{w} - A^{-1}\mathbf{b}) + \text{const}$，即$\Normal(A^{-1}\mathbf{b}, A^{-1})$的对数密度。把$A^{-1}\mathbf{b}$乘上$\sigma^2$即得$\mathbf{m}$的第二个形式。新标签为$y_* = \mathbf{w}^\top\mathbf{x}_* + \varepsilon_*$，其中$\varepsilon_*$与$\mathbf{w}$独立；在后验之下，$\mathbf{w}^\top\mathbf{x}_*$服从高斯分布，均值为$\mathbf{m}^\top\mathbf{x}_*$，方差为$\mathbf{x}_*^\top\Sigma_{\text{post}}\mathbf{x}_*$，再加上独立噪声，方差再添$\sigma^2$。
:::

预测方差有两部分：不可约的噪声$\sigma^2$，以及关于权重的**认知**不确定性$\mathbf{x}_*^\top\Sigma_{\text{post}}\mathbf{x}_*$——训练数据稠密处它小，远离数据处它大。点估计——最小二乘、岭、任何 MAP——两者都不报告。贝叶斯框架还提供了选取$\lambda$（或$\sigma$与$\tau$）的有原则的办法：极大化**边际似然**$p(\mathbf{y}\mid X, \sigma, \tau)$，即把权重积分掉之后数据的概率（MacKay，1992；Bishop，2006，§3.5）。对大型神经网络，精确的后验不可计算，各种近似——独立训练模型的集成、拉普拉斯近似、随机梯度蒙特卡洛——截至2026年仍是活跃的研究课题，尚非惯常做法。

::: example 一个预测区间 {#ex-predictive}
不带截距，用噪声方差$\sigma^2 = 1$、先验$w\sim\Normal(0, 1)$给$(1, 2)$与$(2, 4.5)$拟合$y = wx$。给出后验以及在$x_* = 3$处的预测分布。
::: solution
$X^\top X = 5$，故$\Sigma_{\text{post}} = (5 + 1)^{-1} = 1/6$，且$m = \frac16\cdot X^\top\mathbf{y} = 11/6 = 1.833$——正是[[ml-fundamentals/linear-regression]]习题3中$\lambda = 1$的岭斜率。在$x_* = 3$处，预测均值为$5.5$，方差为$1 + 9/6 = 2.5$，标准差$1.58$；$95\%$预测区间为$5.5\pm1.96\cdot1.58 = [2.40, 8.60]$。方差$2.5$中，$1$是噪声，$1.5$是关于$w$的不确定性，它随$x_*^2$增长：离数据越远的预测越不确定。
:::
:::

## 选取强度 {#sec-choosing}

每个正则化器都有一个强度——$\lambda$、步数、增强噪声的幅度——而没有一个能只凭训练数据来定，因为训练误差永远偏好不正则化。标准工具是交叉验证（[[ml-fundamentals/generalisation#alg-cv]]），在对数网格上搜索。下面的清单用$10$次多项式——十一个系数——去拟合$[-1, 1]$上$\sin(\pi x)$的$30$个带噪点（噪声$\sigma = 0.3$），截距不加惩罚，用五折交叉验证选出$\lambda$，并在$5000$个全新测试点上报告误差。

```python
import math, random

rng = random.Random(6)
f = lambda x: math.sin(math.pi * x)
deg, sigma = 10, 0.3
phi = lambda x: [x ** j for j in range(deg + 1)]                  # 11 个多项式特征

def data(n):
    xs = [rng.uniform(-1, 1) for _ in range(n)]
    return [(phi(x), f(x) + rng.gauss(0, sigma)) for x in xs]

def solve(A, b):
    m = len(A); M = [r[:] + [v] for r, v in zip(A, b)]
    for k in range(m):
        q = max(range(k, m), key=lambda i: abs(M[i][k])); M[k], M[q] = M[q], M[k]
        for i in range(k + 1, m):
            c = M[i][k] / M[k][k]
            for j in range(k, m + 1): M[i][j] -= c * M[k][j]
    x = [0.0] * m
    for k in reversed(range(m)):
        x[k] = (M[k][m] - sum(M[k][j] * x[j] for j in range(k + 1, m))) / M[k][k]
    return x

def ridge(D, lam):
    """Minimise sum (y - w.phi)^2 + lam * sum_{j>=1} w_j^2 (intercept w_0 not penalised)."""
    p = len(D[0][0])
    G = [[sum(x[i] * x[j] for x, _ in D) + (lam if i == j and i > 0 else 0) for j in range(p)] for i in range(p)]
    return solve(G, [sum(x[i] * y for x, y in D) for i in range(p)])

mse = lambda w, D: sum((sum(a * b for a, b in zip(w, x)) - y) ** 2 for x, y in D) / len(D)

train, test = data(30), data(5000)
folds = [train[i::5] for i in range(5)]                           # 5 折，每折 6 个样例

print("lambda     train    5-fold CV   test")
for lam in (0, 1e-4, 1e-3, 1e-2, 1e-1, 1, 10):
    cv = sum(mse(ridge([e for j, F in enumerate(folds) if j != k for e in F], lam), folds[k])
             for k in range(5)) / 5
    w = ridge(train, lam)
    print(f"{lam:8g}  {mse(w, train):7.3f}  {cv:10.3f}  {mse(w, test):6.3f}")
```

```text
lambda     train    5-fold CV   test
       0    0.075    4784.423  5043.619
  0.0001    0.086       1.479  11.254
   0.001    0.088       0.535   1.756
    0.01    0.095       0.264   0.126
     0.1    0.113       0.223   0.106
       1    0.169       0.247   0.326
      10    0.388       0.502   0.359
```

没有惩罚时，$10$次多项式的训练误差（$0.075$）低于噪声水平，测试误差却是数千的量级：在随机的训练输入之间和之外，它剧烈摆动。$\lambda = 0.01$这样小的惩罚就把它驯服了。交叉验证选中$\lambda = 0.1$，它的测试误差$0.106$恰好也最低，接近噪声下限$\sigma^2 = 0.09$。$\lambda$再往大走，训练、验证、测试误差便一起上升：模型现在被约束得太紧了（偏差占主导）。交叉验证误差带噪——每折只有六个点——而且在$\lambda$较小时大于测试误差，因为在$24$个点上训练的模型不如在$30$个点上的最终模型稳定；要紧的是它们的极小位置于何处。

::: quiz
某岭模型的训练误差为$0.10$，交叉验证误差为$0.40$。哪种改动最有望降低交叉验证误差？
- [ ] 减小$\lambda$，让模型把训练数据拟合得更好
- [x] 增大$\lambda$，用较高的训练误差换取较低的方差
- [ ] 改为以极小化训练误差来选取$\lambda$
- [ ] 从模型中去掉截距
::: solution
训练误差与留出误差之间的大差距，正是高方差（过拟合）的标志，而更强的惩罚能压低它。减小$\lambda$会拉大差距。训练误差永远偏好$\lambda = 0$，不能用来选它。截距不是方差的来源，应当不加惩罚。
:::
:::

::: warning 正则化不能替代验证
每个正则化器都是一场关于真实函数长相的赌注——权重小、非零特征少、对某个变换不变。赌错了会坏事：信号摊在许多相关特征上的问题配上$\ell_1$惩罚，会丢掉有用的信息；一个会改变标签的增强，则是在教模型说谎。惩罚还与缩放相互作用：同一个特征，用毫米度量与用千米度量，$\ell_2$惩罚看待它们截然不同，所以先标准化、再惩罚。而且正则化模型的训练误差并不比未正则化的更能度量模型好坏：赌注是否兑现，只有留出数据说了算。
:::

::: history
吉洪诺夫（Tikhonov）1943年引入用二次惩罚对不适定反问题作正则化，并于1963年将其发展完善；Arthur Hoerl 与 Robert Kennard 于1970年为共线统计数据提出岭回归。Robert Tibshirani 的 lasso（1996）——连同 Chen、Donoho 与 Saunders（1998）紧密相关的基追踪——使$\ell_1$惩罚成为标准工具，并引出稀疏恢复与压缩感知的理论（Candès、Romberg 与 Tao，2006；Donoho，2006）。神经网络的权重衰减由 Hinton 等人在1980年代研究，并经 Krogh 与 Hertz（1992）分析；早停则由 Morgan 与 Bourlard（1990）等人研究。Chris Bishop 于1995年证明带输入噪声的训练等价于吉洪诺夫正则化。David MacKay 对神经网络的贝叶斯处理（1992）引入了基于证据选取正则化常数的方法。Ilya Loshchilov 与 Frank Hutter 的解耦权重衰减（AdamW，2019）用于当今大多数大语言模型的训练。
:::

::: summary
- 正则化通过在被数据拟合的函数之间表达偏好来降低方差：惩罚、早停、增强与先验。
- $\ell_2$惩罚（岭）把每个奇异方向上的最小二乘系数乘以$s_j^2/(s_j^2 + \lambda)$：保留确定得好的方向，压制确定得差（放大噪声）的方向。$\operatorname{df}(\lambda) = \sum_js_j^2/(s_j^2 + \lambda)$统计有效参数。
- $\ell_1$惩罚（lasso）做软阈值：把系数按恒定数额收缩，并把小的恰好置零，从而选出特征。
- 在梯度下降中，$\ell_2$惩罚就是每步乘以因子$1 - \eta\lambda$的权重衰减；配 Adam 时，标准形式是解耦衰减（AdamW）。
- 走$t$步后早停，其谱滤波相当于取$\lambda\approx1/(\eta t)$的岭：训练越久，正则化越弱。
- 增强把不变性编码成数据；线性模型中的输入噪声恰好就是一个$\ell_2$惩罚。
- 高斯先验使岭成为后验均值，而完整的后验额外给出预测不确定性。一切强度都靠验证来选，绝不靠训练误差。
:::

## 习题

::: exercise 一个收缩因子 {level=1 check="4/5"}
某岭回归中，设计矩阵的一个奇异方向满足$s^2 = 4$，惩罚为$\lambda = 1$。该方向上的最小二乘系数被乘以多少？
::: solution
由[[#prop-ridge-svd]]，乘以$s^2/(s^2 + \lambda) = 4/5 = 0.8$。
:::
:::

::: exercise 有效参数 {level=1 check="3/2"}
某设计矩阵的奇异值平方为$9$、$1$与$1/9$。$\lambda = 1$时$\operatorname{df}(\lambda)$是多少？
::: solution
$9/10 + 1/2 + (1/9)/(10/9) = 0.9 + 0.5 + 0.1 = 1.5$。
:::
:::

::: exercise 软阈值 {level=1 check="0.7"}
如[[#prop-lasso]]，正交特征、惩罚$\lambda = 0.5$，最小二乘系数为$1.2$与$-0.3$。lasso 系数是多少？给出第一个。
::: solution
$\operatorname{sign}(1.2)\max(1.2 - 0.5, 0) = 0.7$，$\operatorname{sign}(-0.3)\max(0.3 - 0.5, 0) = 0$：第二个特征被剔除。
:::
:::

::: exercise 半衰期 {level=2 check="693"}
每步$\eta\lambda = 10^{-3}$，一个收不到梯度的权重衰减到不超过原值的一半，需要多少步（取最小整数）？
::: solution
需要$(1 - 10^{-3})^t\le1/2$，即$t\ge\log2/(-\log0.999) = 0.693147/0.0010005 = 692.8$，故$t = 693$步。用近似$e^{-\eta\lambda t}$得$\log2/10^{-3} = 693.1$，是同一个整数。
:::
:::

::: exercise 早停的惩罚 {level=2 check="0.05"}
在损失$\frac12\lVert\mathbf{y} - X\mathbf{w}\rVert^2$上以步长$\eta = 0.05$做梯度下降，$t = 400$步后停手。按[[#prop-early-stopping]]，它大致相当于哪个岭惩罚？
::: solution
$\lambda\approx1/(\eta t) = 1/(0.05\cdot400) = 0.05$。
:::
:::

::: exercise 噪声即惩罚 {level=2 check="5"}
一个线性模型在$n = 500$个样例上用最小二乘（对样例求和）训练，每步其输入都被重新施加每个特征标准差$\nu = 0.1$的独立噪声扰动。对目标$\lVert\mathbf{y} - X\mathbf{w}\rVert^2 + \lambda\lVert\mathbf{w}\rVert^2$，这近似于哪个岭惩罚$\lambda$？
::: solution
由[[#prop-noise]]，每个样例期望贡献$\nu^2\lVert\mathbf{w}\rVert^2$，故总惩罚为$n\nu^2 = 500\cdot0.01 = 5$。
:::
:::

::: exercise 预测不确定性 {level=2 check="5/3"}
在[[#ex-predictive]]中，$x_* = 2$处的预测方差是多少？
::: solution
$\sigma^2 + x_*^2\Sigma_{\text{post}} = 1 + 4/6 = 5/3\approx1.67$。
:::
:::

::: exercise 最佳子集就是硬阈值 {level=3}
正交特征（$X^\top X = I$，$\mathbf{z} = X^\top\mathbf{y}$）下考虑$\ell_0$惩罚，它数非零系数的个数：极小化$\frac12\lVert\mathbf{y} - X\mathbf{w}\rVert^2 + \lambda\lVert\mathbf{w}\rVert_0$。证明解在$\lvert z_j\rvert > \sqrt{2\lambda}$时保持$z_j$不变，否则置为零（硬阈值）。与[[#prop-lasso]]比较。
::: solution
如[[#prop-lasso]]的证明，目标在相差一个常数下为$\frac12\lVert\mathbf{w} - \mathbf{z}\rVert^2 + \lambda\lVert\mathbf{w}\rVert_0$，且逐坐标分离。对坐标$j$：取$w_j = 0$花费$\frac12z_j^2$；取$w_j\ne0$花费$\lambda$加上$\frac12(w_j - z_j)^2$，后者在$w_j = z_j$处最小、花费$\lambda$。当$\lambda < \frac12z_j^2$、即$\lvert z_j\rvert > \sqrt{2\lambda}$时保留该坐标。与 lasso 不同，幸存的系数完全不被收缩，因而大系数没有偏差；但目标不是凸的，而且对一般的（不正交归一的）$X$，最佳子集选择是一场组合搜索，一般是 NP 难的。lasso 是它的凸松弛。
:::
:::

::: exercise 用对称性做增强 {level=3}
在$[-1, 1]$上的输入使用多项式特征$1, x, \dots, x^p$，并已知标签是对称的：$f(-x) = f(x)$。对每个$(x_i, y_i)$，把镜像样例$(-x_i, y_i)$加入训练集以作增强。证明：在增强集上作最小二乘拟合，无论数据如何，所有奇次幂的系数都是零。
::: solution
在增强后的输入上，任何奇次幂与任何偶次幂的乘积之和都为零：$a + b$为奇数时$\sum_i(x_i^{a + b} + (-x_i)^{a + b}) = 0$。于是 Gram 矩阵$\Phi^\top\Phi$分块对角，分为偶块与奇块，正规方程随之分裂。奇块中，奇数$a$对应的右端为$\sum_i(x_i^a y_i + (-x_i)^a y_i) = 0$。因此奇系数满足齐次方程组，并且（只要该块可逆——输入点足够多时便是）它们必为零；即便奇异，极小范数解仍是零。拟合函数是偶函数：增强恰好强加了已知的对称性，不加任何惩罚便让有效参数减半。
:::
:::

::: exercise 实践中的早停 {level=3}
在清单后附加一段：对训练均方误差从$\mathbf{w} = \mathbf{0}$、$\eta = 0.2$、无惩罚开始做梯度下降，在$10$、$100$、$1000$、$10^4$与$10^5$步后打印训练误差与测试误差。用[[#prop-early-stopping]]解释输出。
::: solution
代码是

```python
p = deg + 1
w = [0.0] * p
eta = 0.2
for t in range(1, 100001):
    r = [sum(a * b for a, b in zip(w, x)) - y for x, y in train]          # 残差 (30,)
    g = [2 / len(train) * sum(ri * x[j] for ri, (x, _) in zip(r, train)) for j in range(p)]
    w = [wj - eta * gj for wj, gj in zip(w, g)]
    if t in (10, 100, 1000, 10000, 100000):
        print(f"step {t:6d}  train {mse(w, train):.3f}  test {mse(w, test):.3f}  "
              f"|w| {math.sqrt(sum(v*v for v in w)):.2f}")
```

输出是

```text
step     10  train 0.286  test 0.363  |w| 0.94
step    100  train 0.149  test 0.359  |w| 1.87
step   1000  train 0.101  test 0.188  |w| 3.77
step  10000  train 0.093  test 0.119  |w| 5.61
step 100000  train 0.087  test 4.565  |w| 12.96
```

训练误差单调下降到最小二乘值$0.075$。测试误差一路下降到$10^4$步附近——那里是$0.119$，接近 ridge 的最好结果——然后在$10^5$步后升到$4.6$，因为梯度下降开始拟合那些确定得最差（多项式设计矩阵的微小$s_j^2$）、主要装噪声的方向。权重范数一路增长，那些方向上的系数正逐个补上。训练得足够久，梯度下降便抵达无惩罚的拟合，测试误差重回数千量级；在验证最小处停手，正是隐式惩罚$\lambda\approx1/(\eta t)$。
:::
:::
