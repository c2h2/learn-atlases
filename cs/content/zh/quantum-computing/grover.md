肖尔算法利用的是周期性这一非常特殊的结构，而大多数问题并没有这种结构。对一个毫无结构的问题，量子计算机能做什么？这类问题中最简洁的是**无结构搜索**：$N$ 个项目中有一个（或几个）是"被标记的"，而获取信息的唯一方式，就是对给定的项目询问它是否被标记。经典做法没有比逐个检查更好的办法，平均需要约 $N/2$ 次检查，最坏情况需要 $N$ 次。1996 年，格罗弗（Lov Grover）发现了一个量子算法，只需约 $\tfrac\pi4\sqrt N$ 次查询就能以高概率找到被标记的项目。而且不到一年，人们就证明了这已是最优：任何量子算法在无结构空间中搜索都需要 $\sqrt N$ 数量级以上的查询。

加速"仅仅"是平方级的，但它惊人地通用：凡是能有效识别解的问题——$\mathsf{NP}$ 中的每个问题、每次密钥搜索、每个约束满足问题——都能相对于穷举获得平方级加速。本章从一个单一的几何事实（两次反射构成一次旋转）导出格罗弗算法，对它进行精确分析，处理解的个数未知的情形，把它推广到**振幅放大**——能为任何概率算法提速——并证明表明平方根无法被击败的 **BBBV 下界**。预言机记号与相位反冲沿用 [[quantum-computing/first-algorithms]]。

## 搜索问题

::: definition 无结构搜索 {#def-search}
设 $N = 2^n$，$f\colon\{0, 1, \dots, N-1\}\to\{0, 1\}$ 只能通过相位预言机 $O_f\ket x = (-1)^{f(x)}\ket x$ 访问（由 $U_f$ 经相位反冲得到，[[quantum-computing/first-algorithms#lem-kickback]]）。满足 $f(x) = 1$ 的项目称为**被标记的**，或称为**解**；设其个数为 $M$，$1\le M < N$。任务是输出一个被标记的项目。
:::

按随机顺序查询不同项目的经典算法平均需要 $(N + 1)/(M + 1)$ 次查询才能找到解，而任何经典算法要以概率 $1/2$ 成功都需要 $\Omega(N/M)$ 次查询（当 $M = 1$：$q$ 次查询后，随机取一个被标记项，至多以 $q/N$ 的概率已被看到，再加上在其余项目中猜一次）。格罗弗算法使用两次反射。设
$$
\ket s = H^{\otimes n}\ket{0^n} = \frac{1}{\sqrt N}\sum_{x=0}^{N-1}\ket x
$$
为均匀叠加，并定义**扩散算子**
$$
D = 2\ket s\!\bra s - I = H^{\otimes n}\bigl(2\ket{0^n}\!\bra{0^n} - I\bigr)H^{\otimes n}.
$$ {#eq-diffusion}
第二个形式展示了如何构造它：$2\ket{0^n}\!\bra{0^n} - I$ 把除 $\ket{0^n}$ 之外的每个基状态都乘以 $-1$，这相差一个全局相位就是一个多重受控 $Z$ 门（外围配上 $X$ 门），借助一个辅助量子比特花费 $O(n)$ 个基本门。在振幅上，$D$ 是**关于均值反演**：若 $\ket\psi = \sum_x\alpha_x\ket x$ 且 $\bar\alpha = \frac1N\sum_x\alpha_x$，则 $D\ket\psi = \sum_x(2\bar\alpha - \alpha_x)\ket x$，因为 $\braket{s|\psi} = \sqrt N\bar\alpha$。

::: algorithm 格罗弗算法 {#alg-grover}
输入：$n$ 个量子比特上的相位预言机 $O_f$；解的个数 $M$（未知时见下文）。
1. 制备 $\ket s = H^{\otimes n}\ket{0^n}$。
2. 重复 $k = \lfloor\pi/(4\theta)\rfloor$ 次，其中 $\sin\theta = \sqrt{M/N}$：施加**格罗弗迭代** $G = D\,O_f$。
3. 在计算基下测量并输出结果 $x$（如有需要，再查询一次检验 $f(x) = 1$）。
:::

每次迭代使用一次查询。在分析它之前，先看最小的情形，它是精确的。

::: example 搜索四个项目 {#ex-grover-4}
设 $N = 4$，唯一的被标记项为 $x = 2$（$\ket{10}$）。对 $\ket s$ 施加一次格罗弗迭代并测量。
::: solution
$\ket s = \tfrac12(\ket0 + \ket1 + \ket2 + \ket3)$，所有振幅都是 $\tfrac12$。预言机翻转被标记项的振幅：$(\tfrac12, \tfrac12, -\tfrac12, \tfrac12)$。均值为 $\bar\alpha = \tfrac14(\tfrac12\cdot 3 - \tfrac12) = \tfrac14$，关于均值反演给出 $2\bar\alpha - \alpha_x$：$(0, 0, 1, 0)$。一次查询就以确定的概率找到被标记项，而经典算法平均需要 $2.25$ 次查询（第四个项目可由排除法得知：$1\cdot\tfrac14 + 2\cdot\tfrac14 + 3\cdot\tfrac12 = 2.25$）。这里 $\sin\theta = \tfrac12$，$\theta = \pi/6$，一次迭代后振幅为 $\sin 3\theta = \sin(\pi/2) = 1$，正如下一条定理所预测。
:::
:::

## 两次反射构成一次旋转

把均匀叠加拆成被标记与未被标记两部分。设
$$
\ket\beta = \frac{1}{\sqrt M}\sum_{f(x) = 1}\ket x, \qquad \ket\alpha = \frac{1}{\sqrt{N - M}}\sum_{f(x) = 0}\ket x ,
$$
这是一组标准正交态，即归一化后的"好"部分与"坏"部分。于是
$$
\ket s = \cos\theta\,\ket\alpha + \sin\theta\,\ket\beta, \qquad \sin\theta = \sqrt{M/N}, \quad 0 < \theta \le \tfrac\pi2 .
$$ {#eq-s-split}
在 $\ket\alpha$ 与 $\ket\beta$ 张成的实平面内，预言机 $O_f$ 把 $\ket\alpha\mapsto\ket\alpha$、$\ket\beta\mapsto-\ket\beta$：它就是**关于过 $\ket\alpha$ 直线的反射**。扩散算子 $D = 2\ket s\!\bra s - I$ 固定 $\ket s$ 并取负平面内与它正交的向量：它就是**关于过 $\ket s$ 直线的反射**。两者都把该平面映到自身，所以整个算法都发生在二维实平面内。

::: lemma 两次反射之积 {#lem-reflections}
在 $\R^2$ 中，设 $R_\ell$ 表示关于过原点的直线 $\ell$ 的反射。若 $\ell_2$ 与 $\ell_1$ 的夹角为 $\theta$（按逆时针方向度量），则 $R_{\ell_2}R_{\ell_1}$ 是旋转 $2\theta$。
:::

::: proof
关于与 $x$ 轴成 $\phi$ 角的直线的反射，其矩阵为 $\begin{pmatrix}\cos2\phi & \sin2\phi\\ \sin2\phi & -\cos2\phi\end{pmatrix}$。对角度为 $\phi_1$ 与 $\phi_2 = \phi_1 + \theta$ 的两条直线相乘得
$$
\begin{pmatrix}\cos2\phi_2 & \sin2\phi_2\\ \sin2\phi_2 & -\cos2\phi_2\end{pmatrix}\begin{pmatrix}\cos2\phi_1 & \sin2\phi_1\\ \sin2\phi_1 & -\cos2\phi_1\end{pmatrix} = \begin{pmatrix}\cos2(\phi_2 - \phi_1) & -\sin2(\phi_2 - \phi_1)\\ \sin2(\phi_2 - \phi_1) & \cos2(\phi_2 - \phi_1)\end{pmatrix},
$$
由差角公式即得；这就是旋转 $2(\phi_2 - \phi_1) = 2\theta$。
:::

::: theorem 格罗弗算法 {#thm-grover}
经过 $k$ 次格罗弗迭代后，状态为
$$
G^k\ket s = \cos\bigl((2k+1)\theta\bigr)\ket\alpha + \sin\bigl((2k+1)\theta\bigr)\ket\beta ,
$$ {#eq-grover-state}
因此测量以概率 $\sin^2((2k+1)\theta)$ 给出被标记项。当 $k = \lfloor\pi/(4\theta)\rfloor$ 时此概率至少为 $1 - M/N$，且 $k \le \frac\pi4\sqrt{N/M}$。
:::

::: proof
在 $(\ket\alpha, \ket\beta)$ 平面内，$O_f$ 是关于 $\ket\alpha$ 所在直线（角度 $0$）的反射，$D$ 是关于 $\ket s$ 所在直线（角度 $\theta$，由 [[#eq-s-split]]）的反射。由 [[#lem-reflections]]，$G = DO_f$ 是旋转 $2\theta$。从角度为 $\theta$ 的 $\ket s$ 出发，$k$ 次旋转到达角度 $(2k + 1)\theta$，即 [[#eq-grover-state]]。

至于界，令 $\tilde k = \pi/(4\theta) - \tfrac12$ 为使 $(2\tilde k + 1)\theta = \pi/2$ 的实数，$k = \lfloor\pi/(4\theta)\rfloor$，于是 $\abs{k - \tilde k}\le\tfrac12$。这样最终角度 $(2k+1)\theta$ 与 $\pi/2$ 相差不超过 $\theta$，故失败概率为 $\cos^2((2k+1)\theta)\le\sin^2\theta = M/N$。最后由 $\theta\ge\sin\theta = \sqrt{M/N}$ 得 $k\le\pi/(4\theta)\le\frac\pi4\sqrt{N/M}$。
:::

图中展示了这次旋转。平面的横轴是 $\ket\alpha$，纵轴是 $\ket\beta$；向量从 $\ket s$ 出发，恰在横轴上方，每施加一次 $G$ 就向 $\ket\beta$ 转过 $2\theta$。

::: widget transform2d
matrix: 0.875, -0.4841; 0.4841, 0.875
vector: 0.9682, 0.25
range: 1.2
editable: false
caption: $N = 16$、$M = 1$ 时的格罗弗迭代 $G$，写成作用在 $\ket\alpha$（横轴）与 $\ket\beta$（纵轴）张成平面上的 $2\times2$ 矩阵。这里 $\sin\theta = 1/4$，所以 $G$ 旋转 $2\theta \approx 0.505$ 弧度（$29°$），向量是 $\ket s = (\cos\theta, \sin\theta) \approx (0.968, 0.25)$。三次旋转把向量转到角度 $7\theta \approx 101°$，刚越过纵轴：成功概率 $\sin^2 7\theta \approx 0.96$。行列式为 $1$——是一次旋转，尽管它的两个因子各是一次反射。
:::

::: example 模拟器中的格罗弗搜索 {#ex-grover-sim}
在模拟器中对 $N = 64$、一个被标记项运行格罗弗算法，把每次迭代后的成功概率与 [[#eq-grover-state]] 比较。
::: solution
预言机翻转被标记项振幅的符号；扩散使用 [[#eq-diffusion]]。

```python
from qsim import *

def grover_iteration(s, marked, n):
    for i in marked: s[i] = -s[i]                 # 预言机 O_f：翻转被标记项的符号
    for q in range(n): apply(s, H, q)             # 扩散 D = H^n (2|0><0| - I) H^n
    s[1:] = [-a for a in s[1:]]                   #   (2|0><0| - I)：除 |0...0> 外全部翻转
    for q in range(n): apply(s, H, q)

def grover(n, marked, iterations):
    s = zeros(n)
    for q in range(n): apply(s, H, q)             # 均匀叠加 |s>
    history = []
    for k in range(iterations + 1):
        history.append(sum(abs(s[i]) ** 2 for i in marked))
        if k < iterations: grover_iteration(s, marked, n)
    return history

n, marked = 6, {42}                               # N = 64，一个被标记项
theta = math.asin(math.sqrt(len(marked) / 2 ** n))
print(f"N = {2**n}, M = {len(marked)}, theta = {theta:.4f}, "
      f"optimal k = floor(pi/(4 theta)) = {math.floor(math.pi / (4 * theta))}")
for k, p in enumerate(grover(n, marked, 12)):
    print(f"k = {k:2}: P(marked) = {p:.4f}   sin^2((2k+1)theta) = {math.sin((2*k+1)*theta)**2:.4f}")
```

```console
$ python3 grover.py
N = 64, M = 1, theta = 0.1253, optimal k = floor(pi/(4 theta)) = 6
k =  0: P(marked) = 0.0156   sin^2((2k+1)theta) = 0.0156
k =  1: P(marked) = 0.1348   sin^2((2k+1)theta) = 0.1348
k =  2: P(marked) = 0.3439   sin^2((2k+1)theta) = 0.3439
k =  3: P(marked) = 0.5914   sin^2((2k+1)theta) = 0.5914
k =  4: P(marked) = 0.8164   sin^2((2k+1)theta) = 0.8164
k =  5: P(marked) = 0.9635   sin^2((2k+1)theta) = 0.9635
k =  6: P(marked) = 0.9966   sin^2((2k+1)theta) = 0.9966
k =  7: P(marked) = 0.9074   sin^2((2k+1)theta) = 0.9074
k =  8: P(marked) = 0.7180   sin^2((2k+1)theta) = 0.7180
k =  9: P(marked) = 0.4750   sin^2((2k+1)theta) = 0.4750
k = 10: P(marked) = 0.2381   sin^2((2k+1)theta) = 0.2381
k = 11: P(marked) = 0.0656   sin^2((2k+1)theta) = 0.0656
k = 12: P(marked) = 0.0001   sin^2((2k+1)theta) = 0.0001
```

模拟与公式在四位小数内一致。$k = 6$ 次查询后，以概率 $0.9966$ 找到被标记项；经典搜索平均需要 $32.5$ 次查询。越过最优值后概率再次下降：在 $k = 12$（约为最优值的两倍）处，状态几乎已转到 $-\ket\alpha$，几乎再也看不到被标记项。
:::
:::

::: widget plot
f: sin((2*x + 1)*asin(sqrt(m/N)))^2
x: 0, 30
y: 0, 1
sliders: N=256:16:4096:16; m=1:1:16:1
labels: \sin^2((2k+1)\theta)
caption: 对 $N$ 个项目、其中 $m$ 个被标记，$k$ 次格罗弗迭代后的成功概率（横轴，在整数处读数）。第一个峰值在 $k \approx \frac\pi4\sqrt{N/m}$：$N$ 变为四倍则峰值位置加倍。概率关于 $k$ 是周期的，所以"多迭代几次以保险"可能适得其反；而当 $m = N/4$（试试 $N = 16$、$m = 4$）时，一次迭代恰好成功。
:::

::: warning 格罗弗算法不是"迭代越多，成功越多"
经典随机搜索只会随尝试次数增多而越来越好。格罗弗算法的成功概率却是振荡的：它为 $\sin^2((2k+1)\theta)$，在约 $\frac\pi2\sqrt{N/M}$ 次迭代后回落到接近 $0$。因此用错误的 $M$ 运行算法——例如实际有 $4$ 个解却按 $M = 1$ 选取迭代数——就可能严重过冲：按 $M = 1$ 的最优 $k$ 会使 $M = 4$ 时的角度达到约 $2\cdot\frac\pi2 = \pi$，成功概率接近 $0$。当 $M$ 未知时，使用下一节的随机化方案，或先用量子计数估计 $M$。
:::

::: quiz
某个数据库有 $N = 1024$ 条记录，其中恰好 $M = 256$ 条被标记。多少次格罗弗迭代能给出最高的成功概率，该概率是多少？
- [ ] $25$ 次迭代，概率约为 $1$
- [ ] $0$ 次迭代：直接测量 $\ket s$，概率 $1/4$
- [x] $1$ 次迭代，概率 $1$
- [ ] $2$ 次迭代，概率 $1$
::: solution
$\sin\theta = \sqrt{256/1024} = 1/2$，所以 $\theta = \pi/6$，一次迭代后角度为 $3\theta = \pi/2$：必然成功。这就是 [[#ex-grover-4]] 的四项目例子的放大版；只要 $M = N/4$，一次迭代就是精确的。两次迭代给出 $\sin^2(5\pi/6) = 1/4$，不比猜测好。
:::
:::

::: example 用格罗弗搜索求满足赋值 {#ex-grover-sat}
用格罗弗算法求 $\phi = (x_1\vee x_2)\wedge(\neg x_1\vee x_3)\wedge(\neg x_2\vee\neg x_3)$ 的一个满足赋值：构造预言机、选取迭代次数，并给出成功概率。
::: solution
*预言机。* 由 [[quantum-computing/quantum-circuits#thm-oracle]]，把每个子句计算到一个辅助量子比特上（或运算是一个输入输出都加 $X$ 门的 Toffoli 门，因为 $a\vee b = \neg(\neg a\wedge\neg b)$），再用两个 Toffoli 门和一个辅助量子比特把三个子句位之与计算到处于 $\ket-$ 态的目标量子比特上，然后反算掉子句辅助量子比特。相位反冲（[[quantum-computing/first-algorithms#lem-kickback]]）把这一切变成三个变量量子比特上的 $O_f\ket x = (-1)^{\phi(x)}\ket x$，代价约为十个 Toffoli 门与五个辅助量子比特。

*计数。* 逐一检验八个赋值，$\phi$ 恰被 $(x_1, x_2, x_3) = (0, 1, 0)$ 与 $(1, 0, 1)$ 满足，所以 $M = 2$、$N = 8$。于是 $\sin\theta = \sqrt{2/8} = \tfrac12$，$\theta = \pi/6$，$k = \lfloor\pi/(4\theta)\rfloor = \lfloor 1.5\rfloor = 1$。一次迭代后成功概率为 $\sin^2(3\theta) = 1$：测量返回两个解中的一个，各有概率 $1/2$（由 [[#eq-grover-state]] 的对称性，二者振幅相等）。

*一般情形。* 对于有 $m$ 个变量、解的个数未知的公式，指数搜索以 $O(\sqrt{2^m/M})$ 次预言机调用找到一个解，每次调用都是多项式规模的线路。对于解很少的困难算例，这约为 $2^{m/2}$——相对穷举是平方级加速，但仍是指数级的；而利用结构的经典 SAT 求解器在真实算例上往往远快于穷举。
:::
:::

### 门的代价

每次迭代花费一次预言机调用加上扩散算子——后者是 $2n$ 个哈达玛门与一个 $n$ 量子比特的多重受控 $Z$ 门——共 $O(n)$ 个门。所以格罗弗算法的运行时间为 $O(\sqrt N\,(T_f + \log N))$，其中 $T_f$ 是预言机的门开销。对由多项式规模线路检验的 $\mathsf{NP}$ 问题的 $2^m$ 个候选见证进行搜索，代价是 $2^{m/2}\operatorname{poly}(m)$，而穷举是 $2^m\operatorname{poly}(m)$——这是穷举搜索的平方级加速，不是多项式时间算法。

## 解的个数未知与量子计数

[[#alg-grover]] 需要 $\theta$，从而需要 $M$。两种方法可以免去这一要求。

**指数搜索**（Boyer、Brassard、Høyer 与 Tapp，1998）。从 $m = 1$ 开始；反复从 $\{0, \dots, \lceil m\rceil - 1\}$ 中均匀选取 $j$，从 $\ket s$ 出发运行 $j$ 次格罗弗迭代并测量；若结果被标记则停止；否则把 $m$ 乘以 $\lambda = 6/5$（封顶在 $\sqrt N$）。关键事实是一个平均引理：当 $j$ 在 $\{0, \dots, m - 1\}$ 中均匀选取且 $m\ge 1/\sin(2\theta)$ 时，平均成功概率 $\frac1m\sum_j\sin^2((2j+1)\theta)$ 至少为 $1/4$。在 $m$ 达到 $1/\sin 2\theta = O(\sqrt{N/M})$ 之前，代价按几何级数增长，因而总和为 $O(\sqrt{N/M})$；此后每一轮都至少以概率 $1/4$ 成功。查询总次数的期望为 $O(\sqrt{N/M})$，且无需知道 $M$；若无解，算法可在 $O(\sqrt N)$ 次查询后停止并报告"无解"（单侧错误）。

**量子计数**（Brassard、Høyer 与 Tapp，1998）。格罗弗迭代 $G$ 在 $(\ket\alpha, \ket\beta)$ 平面内是旋转 $2\theta$，所以它在该平面上的特征值为 $e^{\pm2i\theta}$，而 $\ket s$ 是两个特征向量的叠加。对 $G$ 以 $\ket s$ 为输入施加相位估计（[[quantum-computing/shor#alg-pe]]），于是能估计 $\theta$，进而得到 $M = N\sin^2\theta$：用 $t$ 个计数量子比特——即 $2^t$ 次 $G$ 的作用——$\theta$ 的误差为 $O(2^{-t})$，$M$ 的误差为 $O(\sqrt{MN}\,2^{-t} + N2^{-2t})$。计数把本课程的两大工具——肖尔（Shor）算法与格罗弗（Grover）算法——结合到了一起。

## 振幅放大

[[#thm-grover]] 中没有任何一步用到 $\ket s$ 是均匀叠加这一事实。任何成功概率很小的量子算法都能用同样的方式提升。

::: theorem 振幅放大 {#thm-aa}
设 $\mathcal A$ 是一个不含测量的量子线路，$\chi\colon\{0,1\}^n\to\{0,1\}$ 标记"好"结果，并设测量 $\mathcal A\ket{0^n}$ 以概率 $p = \sin^2\theta > 0$ 给出好结果。令 $S_\chi$ 为 $\chi$ 的相位预言机，$S_0 = I - 2\ket{0^n}\!\bra{0^n}$，并置
$$
Q = -\mathcal A\,S_0\,\mathcal A^{-1}S_\chi .
$$
则对 $\mathcal A\ket{0^n}$ 施加 $k$ 次 $Q$ 后，测量以概率 $\sin^2((2k+1)\theta)$ 给出好结果。施加 $k = \lfloor\pi/(4\theta)\rfloor = O(1/\sqrt p)$ 次——每次用到 $\mathcal A$ 与 $\mathcal A^{-1}$ 各一次——后，成功概率至少为 $1 - p$。
:::

::: proof
写 $\ket\psi = \mathcal A\ket{0^n} = \cos\theta\ket{\psi_0} + \sin\theta\ket{\psi_1}$，其中 $\ket{\psi_1}$ 与 $\ket{\psi_0}$ 是 $\ket\psi$ 在好基状态与坏基状态各自张成的子空间上投影的归一化。$S_\chi$ 是 $\ket{\psi_0}, \ket{\psi_1}$ 张成平面内关于 $\ket{\psi_0}$ 的反射。而 $-\mathcal AS_0\mathcal A^{-1} = \mathcal A(2\ket{0^n}\!\bra{0^n} - I)\mathcal A^{-1} = 2\ket\psi\!\bra\psi - I$ 是关于 $\ket\psi$ 的反射。两者都保持该平面不变；[[#thm-grover]] 证明的其余部分可逐字照搬，只需把 $\ket\alpha, \ket\beta, \ket s$ 换成 $\ket{\psi_0}, \ket{\psi_1}, \ket\psi$。
:::

格罗弗算法就是 $\mathcal A = H^{\otimes n}$ 的情形，此时 $Q = -H^{\otimes n}S_0H^{\otimes n}O_f = DO_f$。经典地，成功概率为 $p$ 的算法必须重复约 $1/p$ 次；振幅放大只需约 $1/\sqrt p$ 次运行 $\mathcal A$，*前提*是 $\mathcal A$ 是一个我们能运行其逆的量子线路，且成功与否可以识别。

::: example 放大一个弱算法 {#ex-aa}
量子线路 $\mathcal A$ 以概率 $p = 0.01$ 输出一个可用快速检验识别的正确答案。比较经典地与用振幅放大把成功概率提到 $0.99$ 以上各自所需的运行次数。
::: solution
经典地，$k$ 次独立重复以概率 $1 - 0.99^k$ 成功，当 $k\ge\ln(0.01)/\ln(0.99)\approx 458.2$ 即 $459$ 次运行时超过 $0.99$。用振幅放大，$\sin\theta = 0.1$ 给出 $\theta\approx0.10017$，$k = \lfloor\pi/(4\theta)\rfloor = 7$ 次 $Q$ 的施加，成功概率为 $\sin^2(15\theta)\approx\sin^2(1.5025)\approx 0.9953$。每次施加 $Q$ 要运行 $\mathcal A$ 一次及其逆一次，而制备初始状态还要再多运行 $\mathcal A$ 一次，所以代价是 $15$ 次 $\mathcal A$ 或其逆的运行——大约少了 $30$ 倍。
:::
:::

## 格罗弗已是最优

更聪明的量子算法能否搜索得更快，比如只用 $O(\log N)$ 次查询——那将相对预言机把 $\mathsf{NP}$ 放进 $\mathsf{BQP}$？Bennett、Bernstein、Brassard 与 Vazirani 在 1997 年证明这是不可能的——当时格罗弗的论文甚至尚未刊出。

::: theorem BBBV 下界 {#thm-bbbv}
设 $\mathcal B$ 是任意对未知的 $x\in\{0, \dots, N - 1\}$ 的相位预言机 $O_x$ 做 $T$ 次查询的量子算法（$O_x\ket y = -\ket y$ 当 $y = x$，否则 $O_x\ket y = \ket y$，作用在一个查询寄存器上，可带有工作空间）。若 $\mathcal B$ 对每个 $x$ 都以至少 $1/2$ 的概率输出 $x$，则 $T = \Omega(\sqrt N)$；精确地说，$T\ge\frac{\sqrt N}{8\sqrt2}\bigl(1 - \frac4N\bigr)$。
:::

::: proof
把算法写成 $U_TO\,U_{T-1}O\cdots U_1O\,U_0\ket0$，其中 $U_t$ 是固定酉门，$O$ 是预言机。设 $\ket{\psi_t}$ 为预言机取恒等（无被标记项）时 $U_t$ 之后的状态（第 $t + 1$ 次查询之前；故 $\ket{\psi_0} = U_0\ket0$，$\ket{\psi_T}$ 为最终状态），$\ket{\psi^x_t}$ 为预言机取 $O_x$ 时对应的状态。设 $a_{t,y}$ 为 $\ket{\psi_t}$ 中查询寄存器持有 $y$ 的那部分的范数；则 $\sum_ya_{t,y}^2 = 1$。

*第 1 步：状态分离得很慢。* 我们有 $\ket{\psi^x_{t+1}} - \ket{\psi_{t+1}} = U_{t+1}\bigl(O_x\ket{\psi^x_t} - \ket{\psi_t}\bigr) = U_{t+1}\bigl(O_x(\ket{\psi^x_t} - \ket{\psi_t}) + (O_x - I)\ket{\psi_t}\bigr)$。$O_x - I$ 把 $\ket{\psi_t}$ 中查询寄存器为 $x$ 的部分乘以 $-2$ 并消灭其余部分，所以 $\norm{(O_x - I)\psi_t} = 2a_{t,x}$。酉门保持范数，故 $\norm{\psi^x_{t+1} - \psi_{t+1}}\le\norm{\psi^x_t - \psi_t} + 2a_{t,x}$，并由 $\psi^x_0 = \psi_0$ 归纳得
$$
\norm{\psi^x_T - \psi_T}\le 2\sum_{t=0}^{T-1}a_{t,x}.
$$
平方并使用柯西-施瓦茨（Cauchy–Schwarz）不等式，$\norm{\psi^x_T - \psi_T}^2\le 4T\sum_ta_{t,x}^2$。对 $x$ 求和并使用 $\sum_xa_{t,x}^2 = 1$：
$$
\sum_x\norm{\psi^x_T - \psi_T}^2\le 4T^2 .
$$ {#eq-bbbv-upper}

*第 2 步：成功迫使状态分离得足够远。* 最终测量从 $\ket{\psi_T}$ 以某个概率 $q_x$ 输出 $x$，而 $\sum_xq_x = 1$，所以至少 $N/2$ 个 $x$ 满足 $q_x\le 2/N$。对每个这样的 $x$，单位向量 $\ket{\psi^x_T}$ 与 $\ket{\psi_T}$ 上输出 $x$ 的概率分别 $\ge\tfrac12$ 与 $\le\tfrac2N$。对任意投影算子 $P$ 与单位向量 $u, v$，$\abs{\norm{Pu}^2 - \norm{Pv}^2} = (\norm{Pu} + \norm{Pv})\,\abs{\norm{Pu} - \norm{Pv}}\le 2\norm{u - v}$。于是对至少 $N/2$ 个 $x$ 有 $\norm{\psi^x_T - \psi_T}\ge\tfrac12(\tfrac12 - \tfrac2N)$，从而
$$
\sum_x\norm{\psi^x_T - \psi_T}^2\ge\frac N2\cdot\frac{1}{16}\Bigl(1 - \frac4N\Bigr)^2 .
$$
与 [[#eq-bbbv-upper]] 合并得 $4T^2\ge\frac{N}{32}(1 - \frac4N)^2$，即 $T\ge\frac{\sqrt N}{8\sqrt2}(1 - \frac4N)$。
:::

该常数远非紧；Zalka（1999）证明了格罗弗的 $\frac\pi4\sqrt N$ 次查询对接近 $1$ 的成功概率恰好是最优的，而更精细的技术——Beals、Buhrman、Cleve、Mosca 与 de Wolf（1998）的**多项式方法**以及 Ambainis 的**对手方法**（2000）——为许多其他问题给出了紧下界。该定理有两个重要推论。其一，把 $\mathsf{NP}$ 问题当作 $2^m$ 个候选的黑盒搜索来对待的算法需要 $\Omega(2^{m/2})$ 次查询：任何对 $\mathsf{NP}$ 完全问题的多项式时间量子算法都必须利用这些问题的结构。其二，相对随机预言机，$\mathsf{NP}\not\subseteq\mathsf{BQP}$（[[quantum-computing/quantum-complexity]]）。

::: warning 实际上格罗弗并没有把密钥长度减半
查询次数的平方级加速常被概括为"AES-128 对量子计算机只有 $64$ 位安全性"。这忽略了三点。预言机是一个完整的可逆 AES 线路，要在纠错机器内运行，每次"查询"花费成千上万个逻辑门；$2^{64}$ 次迭代是**顺序**执行的，把搜索分摊到 $P$ 台机器上只能把时间缩短 $\sqrt P$（每台机器用 $\sqrt{N/P}$ 步搜索 $N/P$ 个密钥，由 Zalka 给出的 [[#thm-bbbv]] 并行版本可知这是最优的）；而搜索经典数据库需要把它以叠加方式载入（"QRAM"），其构建代价至少是 $N$ 的数量级。截至 2026 年，[[cryptography/post-quantum]] 所归纳的共识是：AES-128 对多数用途仍然够用，AES-256 则留有大幅裕量。
:::

::: history
格罗弗（Lov Grover）于 1996 年 5 月在 STOC 上作了报告 "A fast quantum mechanical algorithm for database search"，并于 1997 年在 *Physical Review Letters* 上发表 "Quantum mechanics helps in searching for a needle in a haystack"。Charles Bennett、Ethan Bernstein、Gilles Brassard 与 Umesh Vazirani 的 "Strengths and weaknesses of quantum computing"（其中包含 $\Omega(\sqrt N)$ 下界）写于 1994 年——先于格罗弗算法——发表于 1997 年的 *SIAM Journal on Computing*，与肖尔（Shor）的论文同期。Michel Boyer、Gilles Brassard、Peter Høyer 与 Alain Tapp 在 1996 年分析了解个数未知的格罗弗算法（期刊版 1998 年），Brassard、Høyer、Michele Mosca 与 Tapp 在 2002 年给出了振幅放大与估计的一般框架（基于 1997–98 年的工作）。Christof Zalka 在 1999 年证明了精确最优性。
:::

## 后续内容

振幅放大是许多后续算法中的子程序：计数、求最小值（Dürr 与 Høyer，1996）、求碰撞（Brassard–Høyer–Tapp，$O(N^{1/3})$ 次查询）与元素互异性（Ambainis 的量子行走，$O(N^{2/3})$）的平方级加速，以及蒙特卡洛估计——用它，$k$ 次采样可达 $1/k$ 的误差，而非 $1/\sqrt k$。[[quantum-computing/quantum-complexity]] 把 BBBV 定理安置到关于 $\mathsf{BQP}$ 的预言机结果之中，并讨论它为何暗示 $\mathsf{NP}\not\subseteq\mathsf{BQP}$。工程层面——平方级加速为何可能被现实问题规模下纠错的开销抵消——在 [[quantum-computing/quantum-hardware]] 中讨论。

::: summary
- $N$ 个项目中 $M$ 个被标记的**无结构搜索**需要 $\Theta(N/M)$ 次经典查询；格罗弗算法需要 $O(\sqrt{N/M})$ 次。
- 格罗弗迭代 $G = DO_f$ 是两次反射之积——关于坏状态的一次，关于 $\ket s$ 的一次——因而是旋转 $2\theta$，其中 $\sin\theta = \sqrt{M/N}$（[[#lem-reflections]]）。
- $k$ 次迭代后的成功概率为 $\sin^2((2k+1)\theta)$（[[#thm-grover]]）；$k = \lfloor\pi/(4\theta)\rfloor\approx\frac\pi4\sqrt{N/M}$ 给出至少 $1 - M/N$。概率会振荡，因此过冲有害。
- $M$ 未知：带随机迭代次数的指数搜索仍只需 $O(\sqrt{N/M})$ 次查询；量子计数通过对 $G$ 的相位估计来估计 $M$。
- **振幅放大**（[[#thm-aa]]）用某量子算法及其逆的 $O(1/\sqrt p)$ 次运行，把成功概率 $p$ 提升到接近必然。
- **BBBV**（[[#thm-bbbv]]）：任何量子搜索算法都需要 $\Omega(\sqrt N)$ 次查询；黑盒方法对 $\mathsf{NP}$ 问题只能给出平方级加速。
:::

## 习题

::: exercise 一百万个项目需要多少次迭代 {level=1 check="804"}
对 $N = 2^{20}$ 个项目、一个被标记项，[[#alg-grover]] 使用多少次格罗弗迭代？（填一个数。）
::: solution
$\theta = \arcsin(2^{-10})\approx 9.765\,6\times10^{-4}$，故 $\pi/(4\theta)\approx 804.25$，$k = 804$；成功概率为 $\sin^2(1609\theta)\approx 0.9999998$。经典搜索平均需要约 $524\,288$ 次查询。
:::
:::

::: exercise 八个项目 {level=1 check="sin(5*asin(1/sqrt(8)))^2"}
对 $N = 8$、一个被标记项，最优迭代次数后的成功概率是多少？（填精确表达式或小数。）
::: solution
$\sin\theta = 1/\sqrt8$，故 $\theta\approx0.3614$，$\pi/(4\theta)\approx2.17$：$k = 2$。概率为 $\sin^2(5\theta) = \sin^2(5\arcsin(1/\sqrt8))\approx 0.9453$。（精确值：两次迭代后被标记项的振幅为 $11/(8\sqrt2)$，即 $121/128 = 0.9453125$。）
:::
:::

::: exercise 关于均值反演 {level=1}
验证 $D = 2\ket s\!\bra s - I$ 把 $\sum_x\alpha_x\ket x$ 映为 $\sum_x(2\bar\alpha - \alpha_x)\ket x$，并据此对 $x = 0$ 被标记重做 [[#ex-grover-4]]。
::: solution
$\ket s\!\bra s\,\ket\psi = \braket{s|\psi}\ket s = \bigl(\frac{1}{\sqrt N}\sum_x\alpha_x\bigr)\frac{1}{\sqrt N}\sum_y\ket y = \sum_y\bar\alpha\ket y$，所以 $D\ket\psi = \sum_y(2\bar\alpha - \alpha_y)\ket y$。对 $x = 0$：预言机作用后振幅为 $(-\tfrac12, \tfrac12, \tfrac12, \tfrac12)$，均值为 $\tfrac14$，反演给出 $(\tfrac12 + \tfrac12, 0, 0, 0) = (1, 0, 0, 0)$。哪个项目被标记并不重要——算法是对称的。
:::
:::

::: exercise 一半项目被标记 {level=2 check="1/2"}
若 $N$ 个项目中恰好一半被标记，一次格罗弗迭代后的成功概率是多少？（填一个分数。）
::: solution
$\sin\theta = \sqrt{1/2}$，$\theta = \pi/4$，一次迭代后 $\sin^2(3\pi/4) = 1/2$——恰好是随机猜测的概率，也是零次迭代给出的概率。事实上此时 $G$ 是旋转 $\pi/2$，把 $\ket s$ 映到一个概率分布相同的态上。当 $M = N/2$ 时应直接猜测；[[#thm-grover]] 只保证 $1 - M/N = 1/2$。
:::
:::

::: exercise 扩散算子的线路 {level=2}
证明 $X^{\otimes n}\,(\text{受控}^{\,n-1}\text{-}Z)\,X^{\otimes n} = I - 2\ket{0^n}\!\bra{0^n}$，其中受控$^{n-1}$-$Z$ 当第一个 $n - 1$ 个量子比特全为 $1$ 时把 $Z$ 作用于最后一个量子比特。由此得出 $D$ 等于 $-H^{\otimes n}X^{\otimes n}(C^{n-1}Z)X^{\otimes n}H^{\otimes n}$，且花费 $O(n)$ 个门。
::: solution
$C^{n-1}Z$ 把 $\ket{1^n}$ 乘以 $-1$ 并固定所有其他基状态：它就是 $I - 2\ket{1^n}\!\bra{1^n}$。用把 $\ket{1^n}\mapsto\ket{0^n}$ 的 $X^{\otimes n}$ 共轭，即得 $I - 2\ket{0^n}\!\bra{0^n}$。于是由 [[#eq-diffusion]]，$-H^{\otimes n}X^{\otimes n}C^{n-1}ZX^{\otimes n}H^{\otimes n} = H^{\otimes n}(2\ket{0^n}\!\bra{0^n} - I)H^{\otimes n} = D$；整体符号是一个全局相位（即使在振幅放大内部也无妨，因为它把 $Q$ 乘以 $-1$）。$C^{n-1}Z$ 可由 $2(n - 2) + 1$ 个 Toffoli 型门与 $n - 2$ 个辅助量子比特构成（把控制位之与计算到一条辅助量子比特链上、施加受控 $Z$、再反算），所以除预言机外每次迭代花费 $O(n)$ 个门。
:::
:::

::: exercise 一轮振幅放大 {level=2}
算法 $\mathcal A$ 的成功概率恰好是 $1/4$。证明单次施加 $Q$（[[#thm-aa]]）就能使其必然成功。若改为 $p = 1/2$ 会怎样，这种情形如何补救？
::: solution
对 $p = 1/4$，$\theta = \pi/6$，一轮给出 $\sin^2(3\theta) = 1$。对 $p = 1/2$，$\theta = \pi/4$，且对每个 $k$ 都有 $\sin^2((2k+1)\pi/4) = 1/2$：振幅放大停滞不前。标准的补救是先削弱 $\mathcal A$：添加一个旋转到 $\cos\gamma\ket0 + \sin\gamma\ket1$ 的辅助量子比特，仅当 $\mathcal A$ 成功*且*辅助量子比特为 $1$ 时才算好结果。选取 $\sin^2\gamma = 1/2$ 使成功概率变为 $1/4$，一轮放大便必然成功。一般地，把 $p$ 降到适合某个 $k$ 的 $\sin^2(\pi/(2(2k+1)))$，就能使振幅放大精确。
:::
:::

::: exercise 并行搜索 {level=3}
你有 $P$ 台量子计算机，必须在 $N$ 个项目中找到唯一的被标记项。(a) 描述一个每台机器只做 $O(\sqrt{N/P})$ 次查询的算法。(b) 用 [[#thm-bbbv]] 证明：任何运行 $R$ 轮、每轮中 $P$ 台机器各做一次查询的算法都需要 $R = \Omega(\sqrt N/P)$。(c) 比较 (a) 与 (b)。
::: solution
(a) 把项目分成 $P$ 个块，每块 $N/P$ 个。机器 $i$ 在块 $i$ 上运行 [[#alg-grover]]（对一个在块外一律回答"未被标记"的预言机，由 $O_f$ 构造很容易），迭代约 $\frac\pi4\sqrt{N/P}$ 次，并用一次查询检验自己的答案。包含被标记项的那台机器以接近 $1$ 的概率找到它；其余机器报告失败。运行时间为 $O(\sqrt{N/P})$ 轮。

(b) 一台量子计算机可以把 $P$ 台机器依次模拟，把每轮的 $P$ 次查询顺序做完。这样它总共做 $RP$ 次查询，由 [[#thm-bbbv]]，当 $N$ 很大时 $RP\ge c\sqrt N$，其中 $c = 1/(8\sqrt2)$，故 $R\ge c\sqrt N/P$。

(c) (b) 的下界留下了间隙：算法用 $\sqrt{N/P} = \sqrt N/\sqrt P$ 轮，而下界只排除少于 $\sqrt N/P$ 轮。Zalka（1999）把混合论证直接用在 $P$ 个并行的查询寄存器上，弥合了这个间隙，证明 $\Omega(\sqrt{N/P})$ 轮是必需的：$P$ 台机器只能把量子搜索加速 $\sqrt P$，这与经典搜索中可获得 $P$ 倍加速不同。这正是并行性对基于格罗弗的密钥搜索帮助如此之小的原因。
:::
:::

::: exercise 解个数未知的搜索 {level=3}
在模拟器中实现上文描述的指数搜索算法，对 $N = 256$ 比较平均查询次数（迭代次数加每轮一次检验查询）与 $\sqrt{N/M}$，其中 $M = 1, 3, 32$。
::: solution
```python
from qsim import *

def grover_iteration(s, marked, n):
    for i in marked: s[i] = -s[i]                 # 预言机 O_f：翻转被标记项的符号
    for q in range(n): apply(s, H, q)             # 扩散 D = H^n (2|0><0| - I) H^n
    s[1:] = [-a for a in s[1:]]                   #   (2|0><0| - I)：除 |0...0> 外全部翻转
    for q in range(n): apply(s, H, q)

def sample_after(n, marked, j, rng):              # 运行 j 次格罗弗迭代，然后测量
    s = zeros(n)
    for q in range(n): apply(s, H, q)
    for _ in range(j): grover_iteration(s, marked, n)
    return rng.choices(range(2 ** n), weights=probs(s))[0]

def exponential_search(n, marked, rng):           # Boyer-Brassard-Hoyer-Tapp，M 未知
    m, lam, used = 1.0, 6 / 5, 0
    while True:
        j = rng.randrange(math.ceil(m))           # 不超过 m 的随机迭代次数
        x = sample_after(n, marked, j, rng); used += j + 1   # j 次迭代 + 1 次检验查询
        if x in marked: return x, used
        m = min(lam * m, math.sqrt(2 ** n))

rng = random.Random(5)
n = 8                                             # N = 256
for marked in ({17}, {17, 99, 200}, set(range(0, 256, 8))):
    runs = [exponential_search(n, marked, rng)[1] for _ in range(200)]
    M = len(marked)
    print(f"M = {M:2}: mean queries {sum(runs) / len(runs):5.1f}   "
          f"sqrt(N/M) = {math.sqrt(256 / M):4.1f}   classical N/(M+1) = {256 / (M + 1):5.1f}")
```

```console
$ python3 exponential_search.py
M =  1: mean queries  25.5   sqrt(N/M) = 16.0   classical N/(M+1) = 128.0
M =  3: mean queries  13.9   sqrt(N/M) =  9.2   classical N/(M+1) =  64.0
M = 32: mean queries   4.1   sqrt(N/M) =  2.8   classical N/(M+1) =   7.8
```

各 $200$ 次运行的平均代价约为 $\sqrt{N/M}$ 的 $1.5$ 到 $1.6$ 倍，与 $O(\sqrt{N/M})$ 的上界相符，并远低于经典的 $\approx N/(M+1)$——而算法自始至终不曾被告知 $M$。若已知 $M$，[[#alg-grover]] 只需 $\lfloor\pi/(4\theta)\rfloor + 1$ 次查询：分别为 $13$、$8$ 与 $2$。
:::
:::

::: exercise 两个被标记项时格罗弗也无法被击败 {level=3}
改写 [[#thm-bbbv]] 的证明，证明当被标记集合是一个均匀随机的二元对时，找出两个被标记项之一仍需 $\Omega(\sqrt N)$ 次查询。
::: solution
把预言机 $O_{\{x, y\}}$ 与恒等比较。与第 1 步相同，$\norm{\psi^{xy}_T - \psi_T}\le 2\sum_t(a_{t,x} + a_{t,y})$，由柯西-施瓦茨（Cauchy–Schwarz）不等式，$\norm{\psi^{xy}_T - \psi_T}^2\le 8T\sum_t(a_{t,x}^2 + a_{t,y}^2)$。对全部 $\binom N2$ 个对求和，每个 $x$ 出现在 $N - 1$ 个对中，所以 $\sum_{\{x,y\}}\norm{\psi^{xy}_T - \psi_T}^2\le 8T\cdot(N - 1)\cdot T = 8(N-1)T^2$。第 2 步中，$\ket{\psi_T}$ 的输出分布在 $N$ 个项目上的总概率至多为 $1$，所以至少一半的对满足 $q_x + q_y\le 4/N$；对这些对，$1/2$ 的成功概率迫使 $\norm{\psi^{xy}_T - \psi_T}\ge\tfrac12(\tfrac12 - \tfrac4N)$。于是 $8(N-1)T^2\ge\tfrac12\binom N2\cdot\tfrac{1}{16}(1 - \tfrac8N)^2$，得 $T^2\ge\frac{N}{512}(1 - \tfrac8N)^2$，故 $T = \Omega(\sqrt N)$——与格罗弗的 $\frac\pi4\sqrt{N/2}$ 相符。
:::
:::
