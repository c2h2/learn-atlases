把 [[quantum-2/identical-particles]] 中的单态制备到两个自旋-$\frac12$ 粒子上，把它们送到城市两侧的两个实验室。沿同一根轴测量两个自旋，结果总是相反的。单看这一点并不奇怪：两只手套分装两个盒子寄出，总是一只左手一只右手。奇怪的是两个实验室沿*不同*的轴测量时会发生什么——而且轴是到最后一刻才选定的。那时的关联遵循一条定律，任何手套组合、以及任何其他其组成部分各自携带预先赋予属性的系统，都无法重现。约翰·贝尔（John Bell）1964 年证明了这一点，1972 年以来的实验以日益严格的方式确认了它，2015 年三个小组堵上了最后几个主要漏洞。2022 年诺贝尔物理学奖授予阿莱恩·阿斯佩（Alain Aspect）、约翰·克劳泽（John Clauser）与安东·蔡林格（Anton Zeilinger），以表彰那些实验。

承担这一角色的性质是**纠缠**：一个不对各部分之态取乘积形式的复合系统的态。本章发展描述它所需的工具。**密度矩阵**单独描述一个子系统，或描述一个我们只有不完全信息的系统。**施密特分解**表明两部分纠缠到什么程度。然后我们导出单态的量子力学的预言，跟随爱因斯坦、波多尔斯基（Podolsky）与罗森（Rosen）的论证，并证明每个定域隐变量理论都服从的 **CHSH 不等式**，以及违背它的量子力学最大值 $2\sqrt2$。最后一节把纠缠从疑难变成资源，给出作为量子信息基石的两个结果：**不可克隆定理**与**量子隐形传态**。

需要的预备知识是 [[quantum-1/formalism]] 的态向量形式体系与 [[quantum-1/spin]] 的自旋 $\frac12$ 和泡利矩阵。记号采用量子信息学的惯例（尼尔森与钱南（Nielsen & Chuang））：二能级系统是一个**量子比特**，基为 $\lvert0\rangle, \lvert1\rangle$；对一个自旋来说，这就是沿 $z$ 的 $\lvert{\uparrow}\rangle, \lvert{\downarrow}\rangle$。

## 复合系统与纠缠态 {#composite}

由两部分 $A$ 与 $B$ 组成的系统的态空间是张量积 $\mathcal H_A\otimes\mathcal H_B$。若 $\{\lvert i\rangle_A\}$ 与 $\{\lvert j\rangle_B\}$ 是标准正交基，则乘积 $\lvert i\rangle_A\otimes\lvert j\rangle_B$（记作 $\lvert ij\rangle$）构成一组基，所以一般态为

$$
\lvert\psi\rangle = \sum_{i,j}c_{ij}\,\lvert i\rangle_A\lvert j\rangle_B.
$$ {#eq-general}

对两个量子比特，这是四维空间，基为 $\lvert00\rangle, \lvert01\rangle, \lvert10\rangle, \lvert11\rangle$。作用在一部分上的算符形如 $\hat O_A\otimes\mathbb 1_B$，算符的张量积逐因子作用：$(\hat O_A\otimes\hat O_B)\lvert a\rangle\lvert b\rangle = \hat O_A\lvert a\rangle\otimes\hat O_B\lvert b\rangle$。

::: definition 乘积态与纠缠态 {#def-entangled}
纯态 $\lvert\psi\rangle \in \mathcal H_A\otimes\mathcal H_B$ 若能写成 $\lvert\psi\rangle = \lvert a\rangle_A\otimes\lvert b\rangle_B$（对某两个态 $\lvert a\rangle$、$\lvert b\rangle$），则称为**乘积态**。否则称为**纠缠态**。
:::

乘积态给每一部分指派一个确定的态，纠缠态则不然。四个**贝尔态**

$$
\lvert\Phi^\pm\rangle = \frac{1}{\sqrt2}\bigl(\lvert00\rangle \pm \lvert11\rangle\bigr), \qquad \lvert\Psi^\pm\rangle = \frac{1}{\sqrt2}\bigl(\lvert01\rangle \pm \lvert10\rangle\bigr)
$$ {#eq-bell-states}

构成两个量子比特的标准正交基，且每一个都是纠缠的。$\lvert\Psi^-\rangle$ 就是自旋单态。

对两个量子比特有一个快捷判据。把 [[#eq-general]] 中的 $c_{ij}$ 写成 $2\times2$ 矩阵 $C$，乘积态 $(a_0\lvert0\rangle + a_1\lvert1\rangle)(b_0\lvert0\rangle + b_1\lvert1\rangle)$ 满足 $c_{ij} = a_ib_j$，是秩 $1$ 矩阵。所以**两量子比特的纯态是乘积态当且仅当 $\det C = 0$**。对 $\lvert\Phi^+\rangle$，$C = \frac1{\sqrt2}\mathbb 1$，$\det C = \frac12 \ne 0$。

::: example 纠缠还是不纠缠？ {#ex-test}
判定下列态是否纠缠：(a) $\frac12(\lvert00\rangle + \lvert01\rangle + \lvert10\rangle + \lvert11\rangle)$；(b) $\frac{1}{\sqrt3}(\lvert00\rangle + \lvert01\rangle + \lvert10\rangle)$。
::: solution
(a) $C = \frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$，$\det C = 0$：乘积态。事实上它就是 $\lvert+\rangle\lvert+\rangle$，其中 $\lvert+\rangle = (\lvert0\rangle + \lvert1\rangle)/\sqrt2$，两个自旋都指向 $+x$。在一个基里把一个态写成很多项，并不会使它纠缠。

(b) $C = \frac{1}{\sqrt3}\begin{pmatrix}1&1\\1&0\end{pmatrix}$，$\det C = -\frac13 \ne 0$：纠缠。至于纠缠多少，[[#thm-schmidt]] 之后就能说了。
:::
:::

一般结构由一个线性代数定理给出。

::: theorem 施密特分解 {#thm-schmidt}
$\mathcal H_A\otimes\mathcal H_B$ 的每个纯态都可写成

$$
\lvert\psi\rangle = \sum_{k=1}^{r}\sqrt{p_k}\,\lvert u_k\rangle_A\lvert v_k\rangle_B,
$$ {#eq-schmidt}

其中 $\{\lvert u_k\rangle\}$ 是 $\mathcal H_A$ 中的标准正交组，$\{\lvert v_k\rangle\}$ 是 $\mathcal H_B$ 中的标准正交组，**施密特系数** $p_k > 0$ 满足 $\sum_kp_k = 1$。数 $r$（**施密特秩**）与诸 $p_k$ 由 $\lvert\psi\rangle$ 唯一确定，且该态是乘积态当且仅当 $r = 1$。
:::

::: proof
把 $\lvert\psi\rangle$ 按系数矩阵 $C$ 写成 [[#eq-general]] 的样子。由奇异值分解，$C = U\Sigma V^{\mathsf T}$，其中 $U$、$V$ 为酉矩阵，$\Sigma$ 为对角元非负的矩阵；这是标准定理，可由对正矩阵 $CC^\dagger$ 对角化证明。于是

$$
c_{ij} = \sum_kU_{ik}s_kV_{jk}, \qquad \lvert\psi\rangle = \sum_ks_k\Bigl(\sum_iU_{ik}\lvert i\rangle_A\Bigr)\Bigl(\sum_jV_{jk}\lvert j\rangle_B\Bigr).
$$

定义 $\lvert u_k\rangle = \sum_iU_{ik}\lvert i\rangle$ 与 $\lvert v_k\rangle = \sum_jV_{jk}\lvert j\rangle$：它们标准正交，因为酉矩阵的列标准正交。保留 $s_k > 0$ 的 $r$ 项并令 $p_k = s_k^2$。归一化给出 $\sum p_k = \sum_{ij}\lvert c_{ij}\rvert^2 = 1$。诸 $p_k$ 是 $CC^\dagger$ 的本征值，而 $CC^\dagger$ 只依赖 $\lvert\psi\rangle$ 与所选基；换基使 $CC^\dagger$ 作酉相似变换，所以本征值唯一。乘积态的 $C$ 秩为 $1$，故 $r = 1$；反过来 $r = 1$ 就是单个乘积项。
:::

施密特系数度量纠缠的程度。乘积态有 $p_1 = 1$。贝尔态有 $p_1 = p_2 = \frac12$，是两个量子比特所能达到的最大纠缠。

## 密度矩阵 {#density}

设处于纠缠态的一对粒子中，我们手里只有 $A$。$A$ 处于什么态？它不处于任何纯态，否则整对粒子就是乘积态。我们需要更一般的描述。

::: definition 密度算符 {#def-density}
一个以概率 $w_k$（$w_k \ge 0$，$\sum_kw_k = 1$）处于纯态 $\lvert\psi_k\rangle$ 的系统，用**密度算符**描述

$$
\hat\rho = \sum_kw_k\,\lvert\psi_k\rangle\langle\psi_k\rvert.
$$ {#eq-density}

一个观测量的期望值为 $\langle\hat O\rangle = \operatorname{tr}(\hat\rho\hat O)$。若 $\hat\rho = \lvert\psi\rangle\langle\psi\rvert$ 对单个 $\lvert\psi\rangle$ 成立，则态是**纯态**；否则是**混合态**。
:::

期望值公式就是对系综取平均：$\operatorname{tr}(\lvert\psi\rangle\langle\psi\rvert\hat O) = \langle\psi\vert\hat O\vert\psi\rangle$，再以权重 $w_k$ 平均就得 $\operatorname{tr}(\hat\rho\hat O)$。一切预言只通过 $\hat\rho$ 依赖系综。不同的系综可以有同一个 $\hat\rho$：$\lvert0\rangle$ 与 $\lvert1\rangle$ 的等权混合，和 $\lvert{+}\rangle$ 与 $\lvert{-}\rangle$ 的等权混合，都给出 $\hat\rho = \frac12\mathbb 1$，任何实验都无法区分二者。

::: theorem 密度算符的性质 {#thm-density}
每个密度算符都是厄米的、迹为 $1$、且正的（对一切 $\lvert\phi\rangle$ 有 $\langle\phi\vert\hat\rho\vert\phi\rangle \ge 0$）。它的**纯度**满足 $\operatorname{tr}\hat\rho^2 \le 1$，等号成立当且仅当态是纯态。反过来，每个迹为 $1$ 的厄米正算符都是密度算符。
:::

::: proof
厄米性由 [[#eq-density]] 显然。迹为 $\sum_kw_k\langle\psi_k\vert\psi_k\rangle = 1$，且 $\langle\phi\vert\hat\rho\vert\phi\rangle = \sum_kw_k\lvert\langle\phi\vert\psi_k\rangle\rvert^2 \ge 0$。迹为 $1$ 的厄米正算符有标准正交本征基 $\lvert e_n\rangle$，本征值 $\lambda_n \ge 0$，$\sum\lambda_n = 1$，于是 $\hat\rho = \sum_n\lambda_n\lvert e_n\rangle\langle e_n\rvert$ 具有 [[#eq-density]] 的形式；这就证明了反向断言。在该本征基下 $\operatorname{tr}\hat\rho^2 = \sum_n\lambda_n^2 \le \sum_n\lambda_n = 1$，因为 $0 \le \lambda_n \le 1$ 给出 $\lambda_n^2 \le \lambda_n$。取等号要求每个 $n$ 都有 $\lambda_n^2 = \lambda_n$，所以每个本征值是 $0$ 或 $1$，又因为它们之和为 $1$，恰有一个是 $1$：$\hat\rho = \lvert e\rangle\langle e\rvert$，纯态。
:::

对单个量子比特，每个迹为 $1$ 的厄米 $2\times2$ 矩阵都可写成

$$
\hat\rho = \frac12\left(\mathbb 1 + \mathbf r\cdot\boldsymbol\sigma\right), \qquad \mathbf r = \langle\boldsymbol\sigma\rangle,
$$ {#eq-bloch}

其本征值 $\frac12(1\pm\lvert\mathbf r\rvert)$ 非负当且仅当 $\lvert\mathbf r\rvert \le 1$。量子比特的态就是**布洛赫球**内的点：纯态在球面上，混合态在球内，**最大混合态** $\frac12\mathbb 1$ 在球心。对自旋 $\frac12$，$\mathbf r$ 是极化矢量。

### 子系统的约化态

若粒子对处于态 $\hat\rho_{AB}$，而我们只测量 $A$ 的、形如 $\hat O_A\otimes\mathbb 1$ 的可观测量，则

$$
\langle\hat O_A\otimes\mathbb 1\rangle = \operatorname{tr}_{AB}\bigl(\hat\rho_{AB}(\hat O_A\otimes\mathbb 1)\bigr) = \operatorname{tr}_A\bigl(\hat\rho_A\hat O_A\bigr), \qquad \hat\rho_A = \operatorname{tr}_B\hat\rho_{AB},
$$

其中对 $B$ 的**偏迹**定义为 $\langle i\vert\hat\rho_A\vert i'\rangle = \sum_j\langle ij\vert\hat\rho_{AB}\vert i'j\rangle$。**约化密度算符** $\hat\rho_A$ 包含了仅凭对 $A$ 的测量所能学到的一切。

对写成施密特形式 [[#eq-schmidt]] 的纯态，

$$
\hat\rho_A = \sum_kp_k\,\lvert u_k\rangle\langle u_k\rvert, \qquad \hat\rho_B = \sum_kp_k\,\lvert v_k\rangle\langle v_k\rvert.
$$

两部分有相同的谱，即施密特系数；且 $\hat\rho_A$ 是纯态当且仅当 $\lvert\psi\rangle$ 是乘积态。**纠缠熵** $S = -\sum_kp_k\log_2p_k$，即 $\hat\rho_A$ 的冯·诺依曼熵，对乘积态为 $0$，对贝尔态为 $1$ 比特。

::: example 单态的约化态 {#ex-singlet-reduced}
求单态 $\lvert\Psi^-\rangle$ 以及 $\cos\theta\lvert00\rangle + \sin\theta\lvert11\rangle$ 的 $\hat\rho_A$ 及其纯度。
::: solution
单态已是施密特形式，$p_1 = p_2 = \frac12$，$\lvert u_1\rangle = \lvert0\rangle$，$\lvert u_2\rangle = \lvert1\rangle$。所以 $\hat\rho_A = \frac12\lvert0\rangle\langle0\rvert + \frac12\lvert1\rangle\langle1\rvert = \frac12\mathbb 1$，布洛赫球的球心，纯度 $\frac12$。任何只对 $A$ 进行的测量，沿任何轴都以概率 $\frac12$ 给出 $\pm\frac{\hbar}{2}$。整对粒子处于确定的纯态，而每一半却随机到一个量子比特的极致。

对 $\cos\theta\lvert00\rangle + \sin\theta\lvert11\rangle$，$\hat\rho_A = \cos^2\theta\,\lvert0\rangle\langle0\rvert + \sin^2\theta\,\lvert1\rangle\langle1\rvert$，布洛赫向量为 $(0, 0, \cos2\theta)$，纯度为 $\cos^4\theta + \sin^4\theta$。它从 $\theta = 0$（乘积态）的 $1$ 变到 $\theta = \pi/4$（贝尔态 $\lvert\Phi^+\rangle$）的 $\frac12$。
:::
:::

::: widget plot
f: -(cos(x)^2*log2(cos(x)^2) + sin(x)^2*log2(sin(x)^2)); cos(x)^4 + sin(x)^4
x: 0.01, 1.56
y: 0, 1.1
labels: 纠缠熵（比特）; 约化态的纯度
caption: 对态 $\cos\theta\lvert00\rangle + \sin\theta\lvert11\rangle$，横轴 $\theta$ 从 $0$ 到 $\pi/2$。两端是乘积态：熵 $0$，纯度 $1$。$\theta = \pi/4 \approx 0.785$ 处是贝尔态：熵 $1$ 比特，纯度 $\frac12$。注意熵在最大值附近多么平坦：$\theta = \pi/8$、恰好走到一半处，熵已达 $0.60$ 比特。
:::

::: quiz
爱丽丝（Alice）持有处于态 $\lvert\Phi^+\rangle$ 的粒子对中的量子比特 $A$。远处的鲍勃（Bob）沿 $z$ 测量量子比特 $B$，但不把结果告诉爱丽丝。爱丽丝现在应把 $A$ 指派为什么态？
- [ ] $\lvert0\rangle$ 或 $\lvert1\rangle$，取决于鲍勃测到哪个
- [x] $\frac12\mathbb 1$，与鲍勃测量之前完全一样
- [ ] $\lvert\Phi^+\rangle$，因为这对粒子仍然纠缠
- [ ] 取决于鲍勃离得多远
::: solution
鲍勃的测量使 $A$ 以概率 $\frac12$ 各半地处于 $\lvert0\rangle$ 或 $\lvert1\rangle$，而对不知道是哪一个的爱丽丝，密度算符是 $\frac12\lvert0\rangle\langle0\rvert + \frac12\lvert1\rangle\langle1\rvert = \frac12\mathbb 1$，没有改变。若鲍勃沿 $x$ 测量，爱丽丝的态将是 $\lvert{+}\rangle$ 与 $\lvert{-}\rangle$ 的等权混合：也是 $\frac12\mathbb 1$。鲍勃做什么都改变不了爱丽丝的统计。这就是**无信号传递**性质（[[#exr-nosignal]]）。
:::
:::

## EPR 论证 {#epr}

1935 年，阿尔伯特·爱因斯坦（Albert Einstein）、鲍里斯·波多尔斯基（Boris Podolsky）与纳森·罗森（Nathan Rosen）论证量子力学是不完备的。在戴维·玻姆（David Bohm）1951 年用自旋表述的版本里，论证如下。两个自旋-$\frac12$ 粒子被制备到单态并分开。

1. 若爱丽丝对 $A$ 测 $\sigma_z$ 得 $+1$，她能确信地预言鲍勃对 $B$ 测 $\sigma_z$ 将得 $-1$。对 $\sigma_x$ 或任何其它轴同样成立。
2. **定域性**：爱丽丝选测什么，不可能影响远处 $B$ 处的物理情形。
3. **实在性判据**：若不扰动一个系统就能确信地预言某个量的值，就存在与它对应的物理实在要素。

由 (1)–(3)，$B$ 同时具有确定的 $\sigma_z$ 值*与*确定的 $\sigma_x$ 值，二者都在任何测量之前就已确定，因为爱丽丝无需碰 $B$ 就能预言其中任何一个。量子力学给 $B$ 的二者皆无（两个算符不对易），所以它是不完备的描述，应当寻找一个更深的、用额外"隐"变量固定结果的理论。尼尔斯·玻尔同年回应说，当实验安排本身就是一个量之定义的一部分时，实在性判据是含混的。此后三十年，这被视为一场没有实验后果的哲学分歧。

在检验它之前，我们需要沿任意轴测量的量子力学预言。

::: proposition 单态中的关联 {#prop-singlet}
对单位向量 $\mathbf a$ 与 $\mathbf b$，在单态 $\lvert\Psi^-\rangle$ 中对 $A$ 测 $\boldsymbol\sigma\cdot\mathbf a$、对 $B$ 测 $\boldsymbol\sigma\cdot\mathbf b$，所得结果 $\pm1$ 之乘积的均值为

$$
E(\mathbf a, \mathbf b) = \langle\Psi^-\vert(\boldsymbol\sigma\cdot\mathbf a)\otimes(\boldsymbol\sigma\cdot\mathbf b)\vert\Psi^-\rangle = -\mathbf a\cdot\mathbf b = -\cos\theta_{ab}.
$$ {#eq-correlation}
:::

::: proof
单态的总自旋为零，故 $(\boldsymbol\sigma_A + \boldsymbol\sigma_B)\lvert\Psi^-\rangle = 0$；作用于它时可用 $-\boldsymbol\sigma_A$ 替换 $\boldsymbol\sigma_B$：

$$
(\boldsymbol\sigma_A\cdot\mathbf a)(\boldsymbol\sigma_B\cdot\mathbf b)\lvert\Psi^-\rangle = -(\boldsymbol\sigma_A\cdot\mathbf a)(\boldsymbol\sigma_A\cdot\mathbf b)\lvert\Psi^-\rangle.
$$

（$A$ 与 $B$ 上的算符对易，所以可先作用 $(\boldsymbol\sigma_B\cdot\mathbf b)$。）由泡利恒等式 $(\boldsymbol\sigma\cdot\mathbf a)(\boldsymbol\sigma\cdot\mathbf b) = (\mathbf a\cdot\mathbf b)\mathbb 1 + i\boldsymbol\sigma\cdot(\mathbf a\times\mathbf b)$ 得

$$
E(\mathbf a, \mathbf b) = -\mathbf a\cdot\mathbf b - i(\mathbf a\times\mathbf b)\cdot\langle\Psi^-\vert\boldsymbol\sigma_A\vert\Psi^-\rangle = -\mathbf a\cdot\mathbf b,
$$

因为对 $\hat\rho_A = \frac12\mathbb 1$ 有 $\langle\boldsymbol\sigma_A\rangle = \operatorname{tr}(\hat\rho_A\boldsymbol\sigma) = 0$（[[#ex-singlet-reduced]]）。
:::

平行轴时 $E = -1$：完美反相关，正是 EPR 用过的。垂直轴时 $E = 0$：毫无关联。两者之间，关联随夹角按余弦变化。

## 贝尔定理与 CHSH 不等式 {#bell}

贝尔的洞见在于：把 EPR 的几条假设合在一起，会产生可检验的推论。设想与 EPR 一起，结果由粒子携带的某些变量 $\lambda$ 预先固定，其概率密度 $\rho(\lambda)$ 在源处就已定下。由定域性，爱丽丝对设置 $\mathbf a$ 的结果是不依赖鲍勃设置的函数 $A(\mathbf a, \lambda) = \pm1$，鲍勃的结果是 $B(\mathbf b, \lambda) = \pm1$。于是

$$
E(\mathbf a, \mathbf b) = \int\rho(\lambda)\,A(\mathbf a, \lambda)\,B(\mathbf b, \lambda)\,\dd\lambda.
$$ {#eq-lhv}

这个框架称为**定域隐变量**（或定域实在论）。它包含手套之类的一切经典模型，以及 EPR 所期望的那种模型。

::: theorem CHSH 不等式 {#thm-chsh}
在任何满足 [[#eq-lhv]] 的定域隐变量模型中，对爱丽丝的任意设置 $\mathbf a, \mathbf a'$ 与鲍勃的任意设置 $\mathbf b, \mathbf b'$，

$$
\lvert S\rvert \le 2, \qquad S = E(\mathbf a, \mathbf b) + E(\mathbf a, \mathbf b') + E(\mathbf a', \mathbf b) - E(\mathbf a', \mathbf b').
$$ {#eq-chsh}
:::

::: proof
固定 $\lambda$，简记 $A = A(\mathbf a, \lambda)$、$A' = A(\mathbf a', \lambda)$、$B = B(\mathbf b, \lambda)$、$B' = B(\mathbf b', \lambda)$，每个都取 $\pm1$。于是

$$
AB + AB' + A'B - A'B' = A(B + B') + A'(B - B').
$$

因为 $B, B' = \pm1$，要么 $B = B'$，此时 $B - B' = 0$、$B + B' = \pm2$；要么 $B = -B'$，此时 $B + B' = 0$、$B - B' = \pm2$。两种情形下表达式都是 $\pm2$。对一个恒为 $+2$ 或 $-2$ 的量以概率密度 $\rho(\lambda)$ 平均，得到的数介于 $-2$ 与 $2$ 之间，而由 [[#eq-lhv]] 这个平均就是 $S$。
:::

证明用到三件事：四个设置同时都有确定的结果（实在论）、爱丽丝的结果不依赖鲍勃的设置（反之亦然）（定域性）、以及分布 $\rho(\lambda)$ 不依赖设置（测量独立性，或"自由选择"）。它没有用到任何量子力学的东西，甚至没有用到任何物理。这一不等式出自约翰·克劳泽（John Clauser）、迈克尔·霍恩（Michael Horne）、阿布纳·希莫尼（Abner Shimony）与理查德·霍尔特（Richard Holt）（1969）；它是贝尔 1964 年原始不等式的一个变体，更适合关联不完美的实验。

::: example 量子力学的违背 {#ex-violation}
在 [[#eq-correlation]] 中把四个设置都取在一个平面内：$\mathbf a$ 取 $0^\circ$、$\mathbf a'$ 取 $90^\circ$、$\mathbf b$ 取 $45^\circ$、$\mathbf b'$ 取 $-45^\circ$。计算 $S$。
::: solution
各设置之间的夹角为 $\theta_{ab} = 45^\circ$、$\theta_{ab'} = 45^\circ$、$\theta_{a'b} = 45^\circ$、$\theta_{a'b'} = 135^\circ$。于是

$$
S = -\cos45^\circ - \cos45^\circ - \cos45^\circ + \cos135^\circ = -4\cdot\frac{1}{\sqrt2} = -2\sqrt2 \approx -2.83.
$$

从而 $\lvert S\rvert = 2\sqrt2 > 2$。量子力学预言的关联是任何定域隐变量模型都做不到的。这是对一组确定的、实验可及的设置的预言，而 $2$ 与 $2.83$ 之间的差距大到足以用不完美的探测器测出来。
:::
:::

::: widget plot
f: 3*cos(x) - cos(3*x); 2; -2; 2*sqrt(2); -2*sqrt(2)
x: 0, pi
y: -3, 3
piticks: true
labels: 量子值; 定域界限; 定域界限; 齐雷尔松界; 齐雷尔松界
caption: 各设置按角 $\theta$ 等间隔排布：$\mathbf a$ 在 $0$，$\mathbf b$ 在 $\theta$，$\mathbf a'$ 在 $2\theta$，$\mathbf b'$ 在 $3\theta$。于是三对的间隔为 $\theta$，而 $(\mathbf a, \mathbf b')$ 这一对间隔 $3\theta$；把 CHSH 组合中的负号放在这一对上（[[#eq-chsh]] 同样成立的形式）并用 $E = -\cos$，量子值为 $-(3\cos\theta - \cos3\theta)$，曲线画出的是 $3\cos\theta - \cos3\theta$。找出它离开 $-2$ 与 $2$ 之间窄带的地方：在 $\theta = \pi/4$ 附近触及 $2\sqrt2$，在 $3\pi/4$ 附近达到 $-2\sqrt2$。在 $\theta = 0$ 与 $\pi/2$ 处，量子关联仍处在定域界限之内；违背需要既不平行的也不垂直的设置。
:::

更巧妙的设置选择或不同的量子态，能把 $S$ 推得更高吗？不能。

::: theorem 齐雷尔松界 {#thm-tsirelson}
对两个系统的任意量子态，以及对第一个系统上本征值落在 $[-1, 1]$ 内的任意可观测量 $\hat A, \hat A'$、第二个系统上的 $\hat B, \hat B'$，$\lvert\langle\hat A\hat B + \hat A\hat B' + \hat A'\hat B - \hat A'\hat B'\rangle\rvert \le 2\sqrt2$。
:::

::: proof
只需处理本征值恰为 $\pm1$ 的可观测量，从而 $\hat A^2 = \hat A'^2 = \hat B^2 = \hat B'^2 = \mathbb 1$；一般情形可化归于此，因为表达式对每个可观测量都是线性的，而本征值落在 $[-1, 1]$ 内的可观测量是本征值为 $\pm1$ 的可观测量的凸组合。作用在不同系统上的算符对易。令 $\hat C = \hat A(\hat B + \hat B') + \hat A'(\hat B - \hat B')$。平方并用 $(\hat B\pm\hat B')^2 = 2\pm(\hat B\hat B' + \hat B'\hat B)$，

$$
\hat C^2 = \hat A^2(\hat B + \hat B')^2 + \hat A'^2(\hat B - \hat B')^2 + \hat A\hat A'(\hat B + \hat B')(\hat B - \hat B') + \hat A'\hat A(\hat B - \hat B')(\hat B + \hat B') = 4\cdot\mathbb 1 - [\hat A, \hat A'][\hat B, \hat B'].
$$

最后一步：$(\hat B + \hat B')(\hat B - \hat B') = -[\hat B, \hat B']$ 且 $(\hat B - \hat B')(\hat B + \hat B') = [\hat B, \hat B']$，所以两个交叉项合并为 $-(\hat A\hat A' - \hat A'\hat A)[\hat B, \hat B']$。每个对易子的范数至多 $2$（因为 $\lVert\hat A\hat A'\rVert \le 1$），故 $\lVert\hat C^2\rVert \le 8$。最后，对任何态 $\langle\hat C\rangle^2 \le \langle\hat C^2\rangle \le 8$（方差非负），所以 $\lvert\langle\hat C\rangle\rvert \le 2\sqrt2$。
:::

证明指出了量子优势从何而来：若爱丽丝的两个可观测量对易（或鲍勃的对易），则 $\hat C^2 = 4$ 且 $\lvert S\rvert \le 2$。违背要求两边都做不相容的测量。比量子力学还非定域的理论可以把 $S$ 推到 $4$ 而仍不允许超光速传信；自然为何止步于 $2\sqrt2$，是当前量子理论基础研究的问题之一。

::: warning 纠缠不能传递信号
一个常见错误是从贝尔定理推出：爱丽丝的测量向鲍勃发出他能利用的瞬时影响。它不能。鲍勃的约化态、因此他能测到的一切的统计，都不依赖爱丽丝做什么（[[#exr-nosignal]]）。[[#eq-chsh]] 的违背只有在把两人的结果清单凑到一起——通过不超光速的普通通信——并比较之后才显现。贝尔定理所排除的是定域性*与*预先存在的值这一组合，而不是相对论。
:::

::: application 实验
斯图尔特·弗里德曼（Stuart Freedman）与约翰·克劳泽（John Clauser）（1972）测量了钙原子发出的光子对的偏振关联，发现了 CHSH 型不等式的违背。阿莱恩·阿斯佩、菲利普·格朗热（Philippe Grangier）、让·达利巴尔（Jean Dalibard）与热拉尔·罗歇（Gérard Roger）（1981–82）以高得多的精度做了同样的事，并在一个实验里于光子飞行途中切换分析器的设置，第一次以部分方式关上了"定域性漏洞"。还剩两个漏洞：漏掉大量光子的探测器原则上可能选出有偏的样本（探测漏洞），以及设置必须选得足够快，使其与对方的测量类空分隔。2015 年三个实验同时关上了两者：巴斯·亨森（Bas Hensen）与同事在代尔夫特用相距 $1.3\,\mathrm{km}$ 的金刚石中的电子自旋，马里萨·朱斯蒂纳（Marissa Giustina）与同事在维也纳、林登·沙姆（Lynden Shalm）与同事在国家标准与技术研究院用光子。定域隐变量理论被排除了，除非放弃测量独立性（即设置是自由选定的）——而愿意这么做的物理学家寥寥无几。基于纠缠的**量子密钥分发**方案使用同样的关联；其安全性正建立在 CHSH 违背本身之上。
:::

## 作为资源的纠缠 {#resource}

下面两个结果表明：量子力学的规则禁止某些经典上轻而易举的操作，却使另一些经典上不可能的操作成为可能。

::: theorem 不可克隆定理 {#thm-nocloning}
不存在 $\mathcal H\otimes\mathcal H$ 上的酉算符 $\hat U$ 与固定的"空白"态 $\lvert e\rangle$，使得对每个态 $\lvert\psi\rangle$ 都有 $\hat U(\lvert\psi\rangle\lvert e\rangle) = \lvert\psi\rangle\lvert\psi\rangle$。更确切地说，能复制两个态 $\lvert\psi\rangle$ 与 $\lvert\phi\rangle$ 的酉算符存在，仅当二者相等（至多差一个相位）或正交。
:::

::: proof
设 $\hat U(\lvert\psi\rangle\lvert e\rangle) = \lvert\psi\rangle\lvert\psi\rangle$ 且 $\hat U(\lvert\phi\rangle\lvert e\rangle) = \lvert\phi\rangle\lvert\phi\rangle$。酉算符保持内积，所以

$$
\langle\phi\vert\psi\rangle\langle e\vert e\rangle = \bigl(\langle\phi\vert\langle\phi\vert\bigr)\bigl(\lvert\psi\rangle\lvert\psi\rangle\bigr) = \langle\phi\vert\psi\rangle^2.
$$

由 $\langle e\vert e\rangle = 1$，数 $z = \langle\phi\vert\psi\rangle$ 满足 $z = z^2$，故 $z = 0$ 或 $z = 1$。若 $z = 1$，归一化态相等。于是两个不同且不正交的态不能同时被复制，特别地，没有任何装置能复制所有态。若允许复制器有一个会改变的内部态 $\hat U\lvert\psi\rangle\lvert e\rangle\lvert M\rangle = \lvert\psi\rangle\lvert\psi\rangle\lvert M_\psi\rangle$，结论依然成立：此时 $z = z^2\langle M_\phi\vert M_\psi\rangle$，故 $\lvert z\rvert \le \lvert z\rvert^2$，而 $0 \le \lvert z\rvert \le 1$ 时这仍迫使 $\lvert z\rvert = 0$ 或 $1$。
:::

复制正交态没有问题：经典比特可以复制，因为 $\lvert0\rangle$ 与 $\lvert1\rangle$ 正交。不能复制的是未知的叠加态。若能，就可以造出许多份拷贝，每份沿不同的轴测量，从而完全确定该态；再配上纠缠，就能超光速传信。量子密钥分发依赖不可克隆性：窃听者无法复制传输中的量子比特，只能扰动它们。

那么，一个未知的量子比特态如何从一个地方移到另一个地方？不能靠测量它——那会毁掉它；也不能靠复制。有了纠缠和两个经典比特，它可以被精确地转移过去。

::: example 量子隐形传态 {#ex-teleport}
爱丽丝有处于未知态 $\lvert\psi\rangle = \alpha\lvert0\rangle + \beta\lvert1\rangle$ 的量子比特 $1$。爱丽丝与鲍勃共享处于态 $\lvert\Phi^+\rangle$ 的一对量子比特 $2$（爱丽丝的）与 $3$（鲍勃的）。证明：若爱丽丝对量子比特 $1$ 与 $2$ 做贝尔基测量并把结果告诉鲍勃，鲍勃就能把量子比特 $3$ 变成 $\lvert\psi\rangle$。
::: solution
三个量子比特的初始态为

$$
\lvert\psi\rangle_1\lvert\Phi^+\rangle_{23} = \frac{1}{\sqrt2}\bigl(\alpha\lvert000\rangle + \alpha\lvert011\rangle + \beta\lvert100\rangle + \beta\lvert111\rangle\bigr).
$$

用 $\lvert00\rangle = (\lvert\Phi^+\rangle + \lvert\Phi^-\rangle)/\sqrt2$、$\lvert11\rangle = (\lvert\Phi^+\rangle - \lvert\Phi^-\rangle)/\sqrt2$、$\lvert01\rangle = (\lvert\Psi^+\rangle + \lvert\Psi^-\rangle)/\sqrt2$、$\lvert10\rangle = (\lvert\Psi^+\rangle - \lvert\Psi^-\rangle)/\sqrt2$ 把量子比特 $1$ 与 $2$ 的状态改写成贝尔基 [[#eq-bell-states]]，并合并同类项：

$$
\frac12\Bigl[\lvert\Phi^+\rangle(\alpha\lvert0\rangle + \beta\lvert1\rangle) + \lvert\Phi^-\rangle(\alpha\lvert0\rangle - \beta\lvert1\rangle) + \lvert\Psi^+\rangle(\alpha\lvert1\rangle + \beta\lvert0\rangle) + \lvert\Psi^-\rangle(\alpha\lvert1\rangle - \beta\lvert0\rangle)\Bigr].
$$

此刻还没有发生任何物理过程；这只是同一状态在另一组基下的写法。爱丽丝的贝尔测量以概率 $\frac14$ 给出四个结果中的每一个，与 $\alpha$、$\beta$ 无关，所以她关于 $\lvert\psi\rangle$ 什么也学不到。测量后量子比特 $3$ 处于四个态之一，每个都与 $\lvert\psi\rangle$ 差一个固定的泡利操作：

| 爱丽丝的结果 | 鲍勃的量子比特 | 鲍勃施加 |
|---|---|---|
| $\Phi^+$ | $\alpha\lvert0\rangle + \beta\lvert1\rangle$ | $\mathbb 1$ |
| $\Phi^-$ | $\alpha\lvert0\rangle - \beta\lvert1\rangle$ | $\sigma_z$ |
| $\Psi^+$ | $\beta\lvert0\rangle + \alpha\lvert1\rangle$ | $\sigma_x$ |
| $\Psi^-$ | $-\beta\lvert0\rangle + \alpha\lvert1\rangle$ | $\sigma_z\sigma_x$ |

（检验最后一行：$\sigma_x$ 把 $\alpha\lvert1\rangle - \beta\lvert0\rangle$ 变成 $\alpha\lvert0\rangle - \beta\lvert1\rangle$，接着 $\sigma_z$ 给出 $\alpha\lvert0\rangle + \beta\lvert1\rangle$。）爱丽丝发出两个经典比特说明出现的是哪个结果，鲍勃据此施加修正。量子比特 $3$ 现在精确处于 $\lvert\psi\rangle$，而量子比特 $1$ 与量子比特 $2$ 留在一个贝尔态里，不留 $\alpha$、$\beta$ 的任何痕迹：态是被移动了，不是被复制了，与 [[#thm-nocloning]] 相容。在两个比特送达之前，鲍勃的量子比特处于表中四个态的等权混合，无论 $\lvert\psi\rangle$ 是什么都是 $\frac12\mathbb 1$。没有任何东西超光速传播。
:::
:::

::: quiz
隐形传态中，哪些资源被消耗掉了？
- [ ] 什么也没有：态是免费转移的。
- [ ] 一份 $\lvert\psi\rangle$ 的拷贝，爱丽丝必须先把它克隆出来。
- [x] 一对共享的纠缠比特与两个经典比特的通信。
- [ ] 无穷多的经典信息，用来给出 $\alpha$ 与 $\beta$。
::: solution
贝尔对被消耗掉了（量子比特 $2$ 与 $3$ 此后不再相互纠缠），并发送了两个经典比特。用经典方式描述 $\alpha$ 与 $\beta$ 需要无穷多个比特，何况爱丽丝本来也不知道它们。隐形传态由查尔斯·贝内特（Charles Bennett）与五位合作者于 1993 年提出，1997 年由安东·蔡林格的组用光子实现；如今它是量子网络中的常规步骤。
:::
:::

::: history 从 EPR 到诺贝尔奖
阿尔伯特·爱因斯坦、鲍里斯·波多尔斯基与纳森·罗森于 1935 年 5 月在《物理评论》（*Physical Review*）上发表了他们的论证；尼尔斯·玻尔的回应同年稍后刊于同一期刊；埃尔温·薛定谔（Erwin Schrödinger）在同年的论文里创造了**纠缠**（*Verschränkung*）一词，并称其为"量子力学特有的东西"。密度矩阵则由约翰·冯·诺依曼（John von Neumann）与列夫·朗道（Lev Landau）于 1927 年引入。戴维·玻姆在他 1951 年的教科书里用自旋重述了 EPR 论证。贝尔 1964 年的论文发表在天命短暂的期刊《物理学》（*Physics*）上，证明定域隐变量无法重现单态关联；克劳泽、霍恩、希莫尼与霍尔 1969 年的不等式使检验变得可行。鲍里斯·齐雷尔松（Boris Tsirelson）1980 年证明了 $2\sqrt2$ 的界。威廉·伍特斯（William Wootters）与沃伊切赫·祖雷克（Wojciech Zurek），以及独立地丹尼斯·迪克斯（Dennis Dieks），1982 年证明了不可克隆定理。继弗里德曼与克劳泽（1972）、阿斯佩与合作者（1982）的实验以及 2015 年无漏洞检验之后，2022 年诺贝尔物理学奖授予阿莱恩·阿斯佩、约翰·克劳泽与安东·蔡林格，"因为他们用纠缠光子做的实验、确立了对贝尔不等式的违背并开创量子信息科学"。
:::

## 后续内容 {#leads}

纠缠是量子计算、量子密码学与量子计量背后的资源，尼尔森与钱南的著作对此有长篇论述。密度矩阵是 [[statistical-mechanics/canonical]] 的自然语言——正则态 $e^{-\beta\hat H}/Z$ 就是混合态——也是向环境丢失相干性的开放系统理论（退相干）的自然语言，后者解释了为什么大对象的纠缠如此难以观测。本文的单态关联与 [[quantum-2/identical-particles]] 的交换相互作用用的是同一套自旋代数；在多体物理中，纠缠熵随区域大小的标度现在被用来对 [[condensed-matter]] 中物质的相作分类。

::: summary
- 复合系统的态空间是张量积。纯态若不是乘积态就是纠缠的；对两个量子比特，当且仅当 $\det(c_{ij}) \ne 0$。
- 每个二部纯态都有施密特分解 $\sum_k\sqrt{p_k}\lvert u_k\rangle\lvert v_k\rangle$。诸 $p_k$ 是两个约化态共同的本征值，纠缠熵为 $-\sum p_k\log_2p_k$。
- 密度算符 $\hat\rho = \sum w_k\lvert\psi_k\rangle\langle\psi_k\rvert$ 是正的、迹为 $1$；$\operatorname{tr}\hat\rho^2 \le 1$，仅纯态取等。量子比特的态是 $\frac12(\mathbb 1 + \mathbf r\cdot\boldsymbol\sigma)$，$\lvert\mathbf r\rvert \le 1$。
- 贝尔态每一半的约化态都是 $\frac12\mathbb 1$。单态中 $E(\mathbf a, \mathbf b) = -\mathbf a\cdot\mathbf b$。
- 定域隐变量蕴含 CHSH 不等式 $\lvert S\rvert \le 2$。量子力学达到 $2\sqrt2$，任何量子态都不能超过它（齐雷尔松）。2015 年的无漏洞实验证实了违背。
- 纠缠不允许传信：鲍勃的约化态不依赖爱丽丝的行动。
- 未知量子态不能克隆，但可以用一对贝尔态加两个经典比特隐形传态。
:::

## 习题 {#exercises}

::: exercise 混合态的纯度 {level=1 check="5/8"}
一个量子比特以概率 $\frac34$ 处于 $\lvert0\rangle$、以概率 $\frac14$ 处于 $\lvert1\rangle$。求 $\operatorname{tr}\hat\rho^2$。
::: solution
$\hat\rho = \operatorname{diag}(\frac34, \frac14)$，所以 $\operatorname{tr}\hat\rho^2 = \frac{9}{16} + \frac{1}{16} = \frac{10}{16} = \frac58$。它介于 $\frac12$（最大混合）与 $1$（纯态）之间。布洛赫向量为 $(0, 0, \frac12)$。
:::
:::

::: exercise 六十度的关联 {level=1 check="-1/2"}
单态中，爱丽丝沿 $z$ 测自旋，鲍勃沿与 $z$ 成 $60^\circ$ 的轴测。求 $E(\mathbf a, \mathbf b)$，以及二人结果（$\pm1$）相同的概率。
::: solution
由 [[#eq-correlation]]，$E = -\cos60^\circ = -\frac12$。由 $E = P_{\mathrm{same}} - P_{\mathrm{opposite}}$ 且两概率之和为 $1$，$P_{\mathrm{same}} = (1 + E)/2 = \frac14$。
:::
:::

::: exercise 布洛赫向量 {level=1 check="1/2"}
求 $\hat\rho = \begin{pmatrix}\frac12 & \frac14\\ \frac14 & \frac12\end{pmatrix}$ 的布洛赫向量及其长度。
::: solution
与 [[#eq-bloch]] 比较：$\frac12(\mathbb 1 + r_x\sigma_x + r_y\sigma_y + r_z\sigma_z)$ 的对角元为 $\frac12(1\pm r_z)$，右上非对角元为 $\frac12(r_x - ir_y)$。所以 $r_z = 0$、$r_x = \frac12$、$r_y = 0$，且 $\lvert\mathbf r\rvert = \frac12$：一个混合态，部分沿 $+x$ 极化。
:::
:::

::: exercise 纠缠熵 {level=2 check="-(cos(pi/8)^2*log2(cos(pi/8)^2) + sin(pi/8)^2*log2(sin(pi/8)^2))"}
求 $\cos(\pi/8)\lvert00\rangle + \sin(\pi/8)\lvert11\rangle$ 的纠缠熵（以比特计）。
::: solution
该态已是施密特形式，$p_1 = \cos^2(\pi/8) = \frac{2 + \sqrt2}{4} = 0.8536$，$p_2 = \sin^2(\pi/8) = 0.1464$。于是

$$
S = -p_1\log_2p_1 - p_2\log_2p_2 = 0.8536\times0.2284 + 0.1464\times2.7716 = 0.601\,\mathrm{bits}.
$$
:::
:::

::: exercise 带噪声的单态 {level=2 check="1/sqrt(2)"}
一个源产生**维纳（Werner）态** $\hat\rho = p\,\lvert\Psi^-\rangle\langle\Psi^-\rvert + (1 - p)\,\frac14\mathbb 1$：以概率 $p$ 给出单态，否则给出完全噪声。求 [[#ex-violation]] 的设置下的 CHSH 值，以及不等式被违背的最小 $p$。
::: solution
每个关联 $\operatorname{tr}(\hat\rho\,\hat A\otimes\hat B)$ 对 $\hat\rho$ 是线性的。噪声部分：$\operatorname{tr}(\frac14\mathbb 1\,(\boldsymbol\sigma\cdot\mathbf a)\otimes(\boldsymbol\sigma\cdot\mathbf b)) = \frac14\operatorname{tr}(\boldsymbol\sigma\cdot\mathbf a)\operatorname{tr}(\boldsymbol\sigma\cdot\mathbf b) = 0$。所以 $E = -p\,\mathbf a\cdot\mathbf b$，$\lvert S\rvert = 2\sqrt2\,p$。违背需要 $2\sqrt2p > 2$，即 $p > 1/\sqrt2 = 0.707$。（维纳态对一切 $p > \frac13$ 都是纠缠的；$\frac13 < p \le 1/\sqrt2$ 时它纠缠却不违背 CHSH，说明纠缠与贝尔非定域性不是一回事。）
:::
:::

::: exercise 贝尔基 {level=2}
证明四个贝尔态 [[#eq-bell-states]] 标准正交，证明 $(\sigma_x\otimes\mathbb 1)\lvert\Phi^+\rangle = \lvert\Psi^+\rangle$ 与 $(\sigma_z\otimes\mathbb 1)\lvert\Phi^+\rangle = \lvert\Phi^-\rangle$，并证明对两个量子比特施加同一转动时，$\lvert\Psi^-\rangle$ 是四个贝尔态中唯一保持不变（至多差一个相位）的。
::: solution
每个贝尔态都是两个基态以系数 $\pm1/\sqrt2$ 的组合，故每个模为 $1$。$\lvert\Phi^\pm\rangle$ 含 $\lvert00\rangle, \lvert11\rangle$，$\lvert\Psi^\pm\rangle$ 含 $\lvert01\rangle, \lvert10\rangle$，所以全体 $\Phi$ 与全体 $\Psi$ 正交；且 $\langle\Phi^+\vert\Phi^-\rangle = \frac12(1 - 1) = 0$，$\Psi$ 同理。其次，$\sigma_x$ 交换 $\lvert0\rangle\leftrightarrow\lvert1\rangle$，所以 $(\sigma_x\otimes\mathbb 1)\lvert\Phi^+\rangle = \frac1{\sqrt2}(\lvert10\rangle + \lvert01\rangle) = \lvert\Psi^+\rangle$；$\sigma_z$ 给 $\lvert1\rangle$ 乘 $-1$，所以 $(\sigma_z\otimes\mathbb 1)\lvert\Phi^+\rangle = \frac1{\sqrt2}(\lvert00\rangle - \lvert11\rangle) = \lvert\Phi^-\rangle$。最后，$\lvert\Psi^-\rangle$ 是自旋单态，总自旋 $0$，所以转动 $e^{-i\theta\mathbf n\cdot(\hat{\mathbf S}_1 + \hat{\mathbf S}_2)/\hbar}$ 在其上作用是恒等的。其余三个张成三重态 $S = 1$，转动把它们彼此混合：例如对两个量子比特同时施加绕 $z$ 转 $\pi/2$ 的 $e^{-i\pi\sigma_z/4}\otimes e^{-i\pi\sigma_z/4}$，给 $\lvert00\rangle$ 乘 $-i$、给 $\lvert11\rangle$ 乘 $i$，于是把 $\lvert\Phi^+\rangle$ 映为 $-i\lvert\Phi^-\rangle$。正是这一转动不变性使单态对*每一对*轴都给出 $E = -\mathbf a\cdot\mathbf b$。
:::
:::

::: exercise 无信号传递 {#exr-nosignal level=3}
证明：若爱丽丝对她那部分施加任意酉 $\hat U_A$，或在其上测任意可观测量并丢弃结果，则对任意态 $\hat\rho_{AB}$，鲍勃的约化态 $\hat\rho_B$ 都不变。
::: solution
用偏迹的性质 $\operatorname{tr}_A\bigl((\hat X_A\otimes\mathbb 1)\hat\rho_{AB}(\hat Y_A\otimes\mathbb 1)\bigr) = \operatorname{tr}_A\bigl((\hat Y_A\hat X_A\otimes\mathbb 1)\hat\rho_{AB}\bigr)$，它由矩阵元 $\langle j\vert\cdot\vert j'\rangle_B$ 中对 $A$ 的迹的循环性得出。对酉操作，$\hat\rho_{AB} \to (\hat U_A\otimes\mathbb 1)\hat\rho_{AB}(\hat U_A^\dagger\otimes\mathbb 1)$，新的约化态为 $\operatorname{tr}_A((\hat U_A^\dagger\hat U_A\otimes\mathbb 1)\hat\rho_{AB}) = \operatorname{tr}_A\hat\rho_{AB} = \hat\rho_B$。

对以 $A$ 上的投影算符 $\hat\Pi_k$ 描述（$\sum_k\hat\Pi_k = \mathbb 1$，$\hat\Pi_k^2 = \hat\Pi_k$）且丢弃结果的测量，态变为 $\sum_k(\hat\Pi_k\otimes\mathbb 1)\hat\rho_{AB}(\hat\Pi_k\otimes\mathbb 1)$，于是

$$
\operatorname{tr}_A\sum_k(\hat\Pi_k\otimes\mathbb 1)\hat\rho_{AB}(\hat\Pi_k\otimes\mathbb 1) = \operatorname{tr}_A\Bigl(\Bigl(\sum_k\hat\Pi_k\Bigr)\otimes\mathbb 1\;\hat\rho_{AB}\Bigr) = \hat\rho_B.
$$

由于鲍勃的一切统计都是 $\operatorname{tr}(\hat\rho_B\hat O_B)$，爱丽丝在局域做的一切都对他不可见。鲍勃只有在以爱丽丝的结果为条件时才能看到效应，而那必须有人告诉他。
:::
:::

::: exercise 乘积态的各部分是纯的 {level=3}
证明纯态 $\lvert\psi\rangle_{AB}$ 是乘积态当且仅当 $\operatorname{tr}\hat\rho_A^2 = 1$。
::: solution
由 [[#thm-schmidt]]，$\hat\rho_A = \sum_kp_k\lvert u_k\rangle\langle u_k\rvert$，诸 $\lvert u_k\rangle$ 标准正交，所以 $\operatorname{tr}\hat\rho_A^2 = \sum_kp_k^2$。在 $p_k > 0$、$\sum p_k = 1$ 下，它等于 $1$ 当且仅当只有一项，$r = 1$，而由 [[#thm-schmidt]] 这就是乘积态。等价地，由 [[#thm-density]]，该态是乘积态当且仅当 $\hat\rho_A$ 是纯态。对 $AB$ 的混合态这一判据失效：$\frac12(\lvert00\rangle\langle00\rvert + \lvert11\rangle\langle11\rvert)$ 的各部分是混合的，但它不纠缠，只有经典关联。
:::
:::

::: exercise 不用不等式的贝尔定理 {level=3}
三个量子比特的 GHZ 态为 $\lvert\mathrm{GHZ}\rangle = \frac{1}{\sqrt2}(\lvert000\rangle + \lvert111\rangle)$。证明它是 $\sigma_x\sigma_x\sigma_x$ 的本征值为 $+1$ 的本征态，并且是 $\sigma_x\sigma_y\sigma_y$、$\sigma_y\sigma_x\sigma_y$、$\sigma_y\sigma_y\sigma_x$ 的本征值为 $-1$ 的本征态（每个量子比特各一个泡利矩阵）。然后证明：对三个量子比特预先赋值 $x_k, y_k = \pm1$ 的任何做法，都无法重现全部四个结果。
::: solution
$\sigma_x$ 翻转一个量子比特；$\sigma_y\lvert0\rangle = i\lvert1\rangle$ 且 $\sigma_y\lvert1\rangle = -i\lvert0\rangle$。于是 $\sigma_x\sigma_x\sigma_x$ 把 $\lvert000\rangle\leftrightarrow\lvert111\rangle$ 互换，GHZ 态保持不变：本征值 $+1$。对 $\sigma_x\sigma_y\sigma_y$，$\lvert000\rangle \to \lvert1\rangle(i\lvert1\rangle)(i\lvert1\rangle) = -\lvert111\rangle$ 且 $\lvert111\rangle \to \lvert0\rangle(-i\lvert0\rangle)(-i\lvert0\rangle) = -\lvert000\rangle$，所以态变成自己的相反数：本征值 $-1$。另外两个次序是同样的计算。

设每个量子比特携带两个测量的取值 $x_k$、$y_k \in \{\pm1\}$，且不依赖于其它量子比特上测什么（定域性）。量子力学的确定性预言是 $x_1y_2y_3 = -1$、$y_1x_2y_3 = -1$、$y_1y_2x_3 = -1$。三式相乘，每个 $y_k$ 出现两次且 $y_k^2 = 1$，故 $x_1x_2x_3 = (-1)^3 = -1$。但量子力学确定性地预言 $x_1x_2x_3 = +1$。这一矛盾是彻底的，不是统计性的：$\sigma_x\sigma_x\sigma_x$ 测量的一次运行就足以证伪该模型。这一论证出自格林伯格（Greenberger）、霍恩与蔡林格（1989），其形式由默明（Mermin）1990 年给出。
:::
:::
