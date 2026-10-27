静力分析假定载荷施加得足够缓慢，惯性不起作用。机器、车辆和结构很少如此“体贴”：发动机和转子激起振动，道路和地震摇动基础，冲击和跌落在几毫秒内加载于零件。在[[vibrations/modal-analysis]]和[[vibrations/continuous-systems]]中，你分析的系统，其质量和刚度是给定的，或其几何形状简单到足以求得精确解。本章说明有限元模型如何为任意结构提供质量矩阵和刚度矩阵，使振动理论的全部工具——固有频率、振型、模态叠加、阻尼——都能用于它；以及当模态方法不适用时，如何直接对运动方程进行时间积分。新的单元要素是**质量矩阵**（mass matrix）；新的数值要素是**时间积分**（time integration），其稳定性和精度问题与[[finite-element-method/field-problems]]中的相同，只不过现在针对的是一个振荡而非衰减的二阶系统。

## 由虚功导出运动方程

达朗贝尔（d'Alembert）原理把单位体积的惯性力$-\rho\ddot{\mathbf{u}}$视为又一种体积力。把它的虚功加到[[finite-element-method/plane-elements]]的静力原理中，再顺带加上黏性阻尼力$-c\dot{\mathbf{u}}$，得到
$$
\int_V\delta\boldsymbol{\varepsilon}^{\mathsf T}\boldsymbol{\sigma}\,dV + \int_V\delta\mathbf{u}^{\mathsf T}\rho\,\ddot{\mathbf{u}}\,dV + \int_V\delta\mathbf{u}^{\mathsf T}c\,\dot{\mathbf{u}}\,dV = \int_V\delta\mathbf{u}^{\mathsf T}\mathbf{b}\,dV + \int_S\delta\mathbf{u}^{\mathsf T}\mathbf{q}\,dS.
$$
只在空间上插值，$\mathbf{u}(\mathbf{x}, t) = \mathbf{N}(\mathbf{x})\,\mathbf{d}(t)$，从而$\ddot{\mathbf{u}} = \mathbf{N}\ddot{\mathbf{d}}$，并要求方程对所有虚节点位移成立，便得到**半离散运动方程**（semi-discrete equations of motion）。

::: proposition 有限元运动方程 {#prop-eom}
$$
\mathbf{M}\ddot{\mathbf{d}} + \mathbf{C}\dot{\mathbf{d}} + \mathbf{K}\mathbf{d} = \mathbf{F}(t), \qquad \mathbf{m}^{(e)} = \int_{V_e}\rho\,\mathbf{N}^{\mathsf T}\mathbf{N}\,dV,
$$ {#eq-eom}
其中$\mathbf{K}$和$\mathbf{F}$是静力刚度矩阵和载荷向量，$\mathbf{M}$是组装后的**一致质量矩阵**（consistent mass matrix），$\mathbf{C}$是阻尼矩阵（实践中很少由$\int c\mathbf{N}^{\mathsf T}\mathbf{N}$导出；见下文）。
:::

::: proof
代入$\delta\mathbf{u} = \mathbf{N}\delta\mathbf{d}$和$\ddot{\mathbf{u}} = \mathbf{N}\ddot{\mathbf{d}}$，惯性项变为$\delta\mathbf{d}^{\mathsf T}\left(\int\rho\mathbf{N}^{\mathsf T}\mathbf{N}\,dV\right)\ddot{\mathbf{d}}$，其余各项变为静力分析中的那些项。由于$\delta\mathbf{d}$是任意的（支座处除外），系数向量必须为零。组装逐个单元进行，与$\mathbf{K}$完全相同，因为每个积分都是对单元求和。假设：小位移、线弹性材料、质量密度不随时间变化，并且位移和加速度采用相同的形函数——这就是“一致”的含义。
:::

## 质量矩阵

### 杆单元

取$N_1 = 1 - x/L$，$N_2 = x/L$，由积分$\int_0^LN_1^2\,dx = L/3$和$\int_0^LN_1N_2\,dx = L/6$得到密度为$\rho$、截面积为$A$的等截面杆的**一致**质量矩阵，
$$
\mathbf{m}^{(e)}_\text{consistent} = \frac{\rho AL}{6}\begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}, \qquad \mathbf{m}^{(e)}_\text{lumped} = \frac{\rho AL}{2}\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}.
$$ {#eq-bar-mass}
**集中**（lumped，对角）质量矩阵把单元质量的一半放在每个节点上，正如工程师凭直觉所做的那样。两者的总质量都正确：所有元素之和为$\rho AL$，这正是动能要求——刚体平移$\dot u_1 = \dot u_2 = v$的动能为$\tfrac12\rho ALv^2$。

### 梁单元

采用[[finite-element-method/trusses-frames]]中的埃尔米特（Hermite）三次多项式和自由度$[v_1, \theta_1, v_2, \theta_2]$，等截面欧拉-伯努利梁的一致质量矩阵为
$$
\mathbf{m}^{(e)} = \frac{\rho AL}{420}\begin{bmatrix} 156 & 22L & 54 & -13L \\ 22L & 4L^2 & 13L & -3L^2 \\ 54 & 13L & 156 & -22L \\ -13L & -3L^2 & -22L & 4L^2 \end{bmatrix}.
$$ {#eq-beam-mass}
（元素$m_{11} = \rho AL\int_0^1(1 - 3\xi^2 + 2\xi^3)^2d\xi = \tfrac{156}{420}\rho AL$，其余类推。）集中梁质量矩阵在每个平动自由度上放$\rho AL/2$，在转动自由度上放零（或一个小值）；对梁而言，它比对杆粗糙得多。

一致质量矩阵不是对角矩阵，因此它使各节点加速度耦合，存储和求解的代价更高，并使显式时间积分变得昂贵。集中质量矩阵是对角的，求逆轻而易举。哪一种更精确取决于单元和模态，如下面的例子所示。

::: example 杆的固有频率 {#ex-bar}
一根钢杆（$E = 200\,\mathrm{GPa}$，$\rho = 7850\,\mathrm{kg/m^3}$），长$L = 1\,\mathrm{m}$，一端固定，另一端自由。用一个单元（一致质量和集中质量）求其基频，并将更多单元的结果与精确值$\omega_1 = \frac{\pi}{2}\frac{c}{L}$比较，其中$c = \sqrt{E/\rho}$。
::: solution
$c = \sqrt{200\times10^9/7850} = 5048\,\mathrm{m/s}$；精确值$\omega_1 = (\pi/2)(5048/1) = 7929\,\mathrm{rad/s}$，$f_1 = 1262\,\mathrm{Hz}$。

**一个单元。**节点1固定后只剩$u_2$：$k = EA/L$，质量为$\rho AL/3$（一致质量，元素$m_{22}$）或$\rho AL/2$（集中质量）。于是
$$
\omega_\text{cons} = \sqrt{\frac{EA/L}{\rho AL/3}} = \sqrt3\,\frac{c}{L} = 8743\,\mathrm{rad/s}\ (+10.3\,\%), \qquad \omega_\text{lump} = \sqrt2\,\frac{c}{L} = 7138\,\mathrm{rad/s}\ (-10.0\,\%).
$$
**更多单元**（数值求解$\mathbf{K}\boldsymbol\phi = \omega^2\mathbf{M}\boldsymbol\phi$）：

| 单元数 | 一致质量$\omega_1$ | 误差 | 集中质量$\omega_1$ | 误差 | $\omega_2$误差（一致 / 集中） |
|---|---|---|---|---|---|
| 1 | 8743 | $+10.3\,\%$ | 7138 | $-10.0\,\%$ | — |
| 2 | 8134 | $+2.59\,\%$ | 7726 | $-2.55\,\%$ | $+19.5\,\%$ / $-21.6\,\%$ |
| 4 | 7980 | $+0.64\,\%$ | 7878 | $-0.64\,\%$ | $+5.8\,\%$ / $-5.7\,\%$ |
| 8 | 7941 | $+0.16\,\%$ | 7916 | $-0.16\,\%$ | $+1.45\,\%$ / $-1.44\,\%$ |

**校核。**单元尺寸每减半，误差降为四分之一——频率误差按$h^2$收敛，是应力收敛速度的两倍——而且一致质量与集中质量的结果几乎对称地把精确值夹在中间，因此二者的平均值远好于其中任何一个。在同一网格上，高阶模态的精度要差得多：一个模态在每个半波长内需要若干个单元。
:::
:::

::: example 用一个单元计算悬臂梁 {#ex-beam}
一根钢扁条（$E = 200\,\mathrm{GPa}$，$\rho = 7850\,\mathrm{kg/m^3}$），宽$50\,\mathrm{mm}$、厚$10\,\mathrm{mm}$，夹持成长$0.5\,\mathrm{m}$的悬臂梁，在其柔性方向振动。用一个采用一致质量的梁单元估算其第一阶固有频率，并与精确值$\omega_1 = 1.8751^2\sqrt{EI/(\rho AL^4)}$比较。
::: solution
$I = 50 \times 10^3/12 = 4167\,\mathrm{mm^4} = 4.167\times10^{-9}\,\mathrm{m^4}$，$A = 5\times10^{-4}\,\mathrm{m^2}$，所以$\sqrt{EI/(\rho AL^4)} = \sqrt{833.3/(3.925 \times 0.0625)} = 58.28\,\mathrm{rad/s}$。

由$v_1 = \theta_1 = 0$，自由的自由度$v_2, \theta_2$有
$$
\mathbf{K} = \frac{EI}{L^3}\begin{bmatrix} 12 & -6L \\ -6L & 4L^2 \end{bmatrix}, \qquad \mathbf{M} = \frac{\rho AL}{420}\begin{bmatrix} 156 & -22L \\ -22L & 4L^2 \end{bmatrix}.
$$
记$\omega^2 = \lambda\,EI/(\rho AL^4)$，令$\det(\mathbf{K} - \omega^2\mathbf{M}) = 0$，约去比例因子后得$\det\begin{bmatrix} 12 - 156\mu & -6 + 22\mu \\ -6 + 22\mu & 4 - 4\mu \end{bmatrix} = 0$，其中$\mu = \lambda/420$，展开后即$140\mu^2 - 408\mu + 12 = 0$（$12 \cdot 4 - 36 = 12$；$-48\mu - 624\mu + 264\mu = -408\mu$；$624\mu^2 - 484\mu^2 = 140\mu^2$）。较小的根为$\mu = 0.029716$，所以$\lambda_1 = 12.48$，$\omega_1 = \sqrt{12.48} \times 58.28 = 3.533 \times 58.28 = 205.9\,\mathrm{rad/s}$，$f_1 = 32.77\,\mathrm{Hz}$。

精确值：$1.8751^2 = 3.516$，$\omega_1 = 204.9\,\mathrm{rad/s}$，$f_1 = 32.62\,\mathrm{Hz}$。一个一致质量单元偏高$0.48\,\%$；两个单元给出$3.5177$（$0.05\,\%$）。若把梁的一半质量集中在端部并忽略转动惯量，则得$\omega = \sqrt{3EI/L^3}/\sqrt{\rho AL/2} = 2.449\sqrt{EI/\rho AL^4}$，偏低$30\,\%$。

**校核。**第二个根$\lambda_2^{1/2} = 34.8$对精确值$22.03$的近似很差：一个单元无法表示在跨内有节点的模态。
:::
:::

## 固有频率与振型

在无阻尼、无载荷时，把$\mathbf{d} = \boldsymbol\phi\sin\omega t$代入[[#eq-eom]]：结果是**广义特征值问题**（generalised eigenvalue problem）
$$
\mathbf{K}\boldsymbol\phi = \omega^2\mathbf{M}\boldsymbol\phi,
$$ {#eq-eig}
它的$n$个解（对$n$个自由的自由度）就是离散化结构的固有频率$\omega_1 \le \omega_2 \le \dots \le \omega_n$和振型$\boldsymbol\phi_i$。大型模型用子空间迭代法或兰乔斯（Lanczos）法求解，只提取最低的几十阶模态（[特征值](/learn/maths/lesson.php?c=linear-algebra&l=eigenvalues)）；网格的最高阶模态没有物理意义，从不计算。

::: theorem 振型的正交性 {#thm-orth}
若$\mathbf{K}$和$\mathbf{M}$对称且$\mathbf{M}$正定，则[[#eq-eig]]的所有特征值$\omega_i^2$都是实数，并且属于不同特征值的振型关于这两个矩阵都正交：
$$
\boldsymbol\phi_i^{\mathsf T}\mathbf{M}\boldsymbol\phi_j = 0, \qquad \boldsymbol\phi_i^{\mathsf T}\mathbf{K}\boldsymbol\phi_j = 0 \qquad (\omega_i \neq \omega_j).
$$
按$\boldsymbol\phi_i^{\mathsf T}\mathbf{M}\boldsymbol\phi_i = 1$归一化后，它们满足$\boldsymbol\Phi^{\mathsf T}\mathbf{M}\boldsymbol\Phi = \mathbf{I}$和$\boldsymbol\Phi^{\mathsf T}\mathbf{K}\boldsymbol\Phi = \operatorname{diag}(\omega_i^2)$，其中$\boldsymbol\Phi = [\boldsymbol\phi_1, \dots, \boldsymbol\phi_n]$。
:::

::: proof
写出模态$i$和$j$的特征方程，用$\boldsymbol\phi_j^{\mathsf T}$左乘第一个，用$\boldsymbol\phi_i^{\mathsf T}$左乘第二个：$\boldsymbol\phi_j^{\mathsf T}\mathbf{K}\boldsymbol\phi_i = \omega_i^2\boldsymbol\phi_j^{\mathsf T}\mathbf{M}\boldsymbol\phi_i$和$\boldsymbol\phi_i^{\mathsf T}\mathbf{K}\boldsymbol\phi_j = \omega_j^2\boldsymbol\phi_i^{\mathsf T}\mathbf{M}\boldsymbol\phi_j$。由对称性，两式左边相等，两个$\mathbf{M}$乘积也相等；相减得$(\omega_i^2 - \omega_j^2)\,\boldsymbol\phi_i^{\mathsf T}\mathbf{M}\boldsymbol\phi_j = 0$，所以当频率不同时$\mathbf{M}$乘积为零，进而$\mathbf{K}$乘积也为零。实性：若$\boldsymbol\phi$是复向量、对应特征值$\lambda$，用其共轭转置左乘得$\bar{\boldsymbol\phi}^{\mathsf T}\mathbf{K}\boldsymbol\phi = \lambda\,\bar{\boldsymbol\phi}^{\mathsf T}\mathbf{M}\boldsymbol\phi$，对实对称矩阵这两个二次型都是实数，且第二个为正；因此$\lambda$是实数。（重频的振型可以选成正交的；见[谱定理](/learn/maths/lesson.php?c=linear-algebra&l=spectral-theorem)。）
:::

::: example 两自由度模型 {#ex-2dof}
一个两层框架的集中质量模型，楼层质量为$m_1 = 200\,\mathrm{kg}$（下层）和$m_2 = 100\,\mathrm{kg}$（上层），层间刚度为$k_1 = 2\times10^5\,\mathrm{N/m}$和$k_2 = 1\times10^5\,\mathrm{N/m}$。求固有频率和按质量归一化的振型，并验证正交性。
::: solution
$\mathbf{K} = \begin{bmatrix} 3\times10^5 & -1\times10^5 \\ -1\times10^5 & 1\times10^5 \end{bmatrix}$，$\mathbf{M} = \operatorname{diag}(200, 100)$。$\det(\mathbf{K} - \omega^2\mathbf{M}) = (3\times10^5 - 200\omega^2)(1\times10^5 - 100\omega^2) - 10^{10} = 0$。令$s = \omega^2$：$20\,000s^2 - 5\times10^7s + 2\times10^{10} = 0$，即$s^2 - 2500s + 10^6 = 0$，所以$s = 500$或$2000$：$\omega_1 = 22.36\,\mathrm{rad/s}$（$3.56\,\mathrm{Hz}$），$\omega_2 = 44.72\,\mathrm{rad/s}$（$7.12\,\mathrm{Hz}$）。

由第二行$-10^5\phi_1 + (10^5 - 100s)\phi_2 = 0$求振型：$s = 500$时，$\phi_2/\phi_1 = 2$（两层同相，顶层位移为下层的两倍）；$s = 2000$时，$\phi_2/\phi_1 = -1$（两层反相）。质量归一化：$\boldsymbol\phi_1 = [1, 2]^{\mathsf T}/\sqrt{200 + 400} = [0.0408, 0.0816]^{\mathsf T}$，$\boldsymbol\phi_2 = [1, -1]^{\mathsf T}/\sqrt{300} = [0.0577, -0.0577]^{\mathsf T}\,\mathrm{kg^{-1/2}}$。

**校核。**$\boldsymbol\phi_1^{\mathsf T}\mathbf{M}\boldsymbol\phi_2 \propto 200(1)(1) + 100(2)(-1) = 0$；对刚度，$\mathbf{K}[1, 2]^{\mathsf T} = [3\times10^5 - 2\times10^5,\ -1\times10^5 + 2\times10^5]^{\mathsf T} = [1, 1]^{\mathsf T}\times10^5$，所以$\boldsymbol\phi_1^{\mathsf T}\mathbf{K}\boldsymbol\phi_1 = [1, 2]\cdot[1, 1]\times10^5/600 = 500 = \omega_1^2$，与定理的要求一致。
:::
:::

::: proposition 瑞利商与界 {#prop-rayleigh}
对任一非零向量$\mathbf{x}$，**瑞利商**（Rayleigh quotient）$R(\mathbf{x}) = \mathbf{x}^{\mathsf T}\mathbf{K}\mathbf{x}/\mathbf{x}^{\mathsf T}\mathbf{M}\mathbf{x}$满足$\omega_1^2 \le R(\mathbf{x}) \le \omega_n^2$，在相应振型处取等号。因此，采用一致质量的有限元模型给出的基频是连续体模型精确基频的**上界**，而加密网格（嵌套网格）只会使它降低。
:::

::: proof
把$\mathbf{x} = \sum a_i\boldsymbol\phi_i$按质量归一化振型展开；由[[#thm-orth]]，$R = \sum a_i^2\omega_i^2/\sum a_i^2$，是各$\omega_i^2$的加权平均，因而介于最小值与最大值之间。对连续体，$\omega_1^2$是连续瑞利商$\int(\text{应变能密度})/\int\tfrac12\rho\lvert\mathbf{u}\rvert^2$在所有容许场上的最小值。一致质量有限元模型计算的正是这个商，但只在有限元函数上取值，而它们是容许场的一个子集；在子集上的最小值不可能更低。加密（嵌套）的网格包含较粗网格的空间，所以它的最小值不会更高。集中质量矩阵并不计算插值场的真实动能，因此这个界不再成立——这就是[[#ex-bar]]中集中质量频率偏低的原因。
:::

## 模态叠加与阻尼

变换到模态坐标$\mathbf{d} = \boldsymbol\Phi\mathbf{y}$，并用$\boldsymbol\Phi^{\mathsf T}$左乘[[#eq-eom]]，无阻尼方程即解耦：
$$
\ddot y_i + 2\zeta_i\omega_i\dot y_i + \omega_i^2y_i = \boldsymbol\phi_i^{\mathsf T}\mathbf{F}(t), \qquad i = 1, \dots, m,
$$
前提是阻尼也能被这些振型对角化（**经典**阻尼或比例阻尼）。每个方程都是一个单自由度振子，可以精确求解，或用[[vibrations/harmonic-excitation]]中的方法求解，并且只需保留频率处在载荷频率范围内的$m \ll n$个模态。判断所含模态是否足够的一个有用指标是**有效模态质量**（effective modal mass）：对沿方向$\mathbf{r}$（单位刚体位移向量）的基础激励，模态$i$的参与因子为$\Gamma_i = \boldsymbol\phi_i^{\mathsf T}\mathbf{M}\mathbf{r}$，有效质量为$\Gamma_i^2$；各有效质量之和等于总质量，常用的规则（例如在抗震规范中）是保留模态直到捕获约 90 % 的总质量。

结构中的阻尼来自连接处的摩擦、材料滞回和周围介质；它无法逐个单元地确定。因此，它被规定为模态阻尼比$\zeta_i$（金属结构通常为 1–5 %），或规定为**瑞利阻尼**（Rayleigh damping）：

::: proposition 瑞利阻尼 {#prop-rayleigh-damping}
取$\mathbf{C} = a_0\mathbf{M} + a_1\mathbf{K}$，[[#eq-eig]]的振型可使$\mathbf{C}$对角化，频率为$\omega$的模态的阻尼比为
$$
\zeta(\omega) = \frac{a_0}{2\omega} + \frac{a_1\omega}{2}.
$$ {#eq-rayleigh}
令两个频率$\omega_a, \omega_b$处的$\zeta$等于$\zeta_0$，得到$a_0 = 2\zeta_0\dfrac{\omega_a\omega_b}{\omega_a + \omega_b}$和$a_1 = \dfrac{2\zeta_0}{\omega_a + \omega_b}$。
:::

::: proof
由[[#thm-orth]]，$\boldsymbol\phi_i^{\mathsf T}\mathbf{C}\boldsymbol\phi_i = a_0 + a_1\omega_i^2$，且非对角项为零。与$2\zeta_i\omega_i$比较即得[[#eq-rayleigh]]。两个条件$\zeta(\omega_a) = \zeta(\omega_b) = \zeta_0$关于$a_0, a_1$是线性的；求解即得所述系数。
:::

质量比例部分阻尼低频，刚度比例部分阻尼高频。在$\omega_a$与$\omega_b$之间，阻尼略低于$\zeta_0$；在此区间之外，阻尼上升——这有助于抑制网格的虚假高频模态，但若$\omega_b$选得过低，也会使真实的高阶模态阻尼过大。

::: widget plot
f: a/(2*x) + b*x/2; 0.02
x: 1, 200
y: 0, 0.08
sliders: a=0.3636:0:2:0.01; b=0.000364:0:0.002:0.00001
labels: \zeta(\omega); \zeta_0 = 0.02
points: 10,0.02; 100,0.02
caption: 瑞利阻尼$\mathbf{C} = a_0\mathbf{M} + a_1\mathbf{K}$的阻尼比随频率$\omega$（rad/s）的变化（滑块$a = a_0$，单位 s⁻¹；$b = a_1$，单位 s）。初始值使$\zeta$恰好在$10$和$100\,\mathrm{rad/s}$处等于$2\,\%$（已标出）。注意两者之间的下凹——在$50\,\mathrm{rad/s}$处约为$1.3\,\%$——以及区间外的陡峭上升。令$b = 0$：纯质量比例阻尼在高频处趋于零；令$a = 0$：纯刚度比例阻尼线性增长，把高阶模态完全抑制掉。
:::

## 直接时间积分

当载荷短促而剧烈（冲击、爆炸、跌落）、激起许多模态，或问题是非线性时，就直接对运动方程进行时间积分。

### 中心差分：显式积分

用中心差分代替导数，$\ddot{\mathbf{d}}_n \approx (\mathbf{d}_{n+1} - 2\mathbf{d}_n + \mathbf{d}_{n-1})/\Delta t^2$，$\dot{\mathbf{d}}_n \approx (\mathbf{d}_{n+1} - \mathbf{d}_{n-1})/(2\Delta t)$，并在时刻$t_n$施加平衡：
$$
\left(\frac{\mathbf{M}}{\Delta t^2} + \frac{\mathbf{C}}{2\Delta t}\right)\mathbf{d}_{n+1} = \mathbf{F}_n - \mathbf{K}\mathbf{d}_n + \frac{\mathbf{M}}{\Delta t^2}(2\mathbf{d}_n - \mathbf{d}_{n-1}) + \frac{\mathbf{C}}{2\Delta t}\mathbf{d}_{n-1}.
$$
若$\mathbf{M}$为集中（对角）质量矩阵，且阻尼为质量比例阻尼或无阻尼，则左端矩阵是对角的：每一步只需逐个单元计算内力$\mathbf{K}\mathbf{d}_n$，无需求解方程组。这就是显式程序能在碰撞和跌落仿真中处理数百万个单元的原因。代价是一个稳定性限制。

::: proposition 中心差分法的稳定性 {#prop-cfl}
对无阻尼系统，中心差分法稳定当且仅当
$$
\Delta t \le \Delta t_\text{cr} = \frac{2}{\omega_{\max}},
$$
其中$\omega_{\max}$是网格的最高固有频率。由于$\omega_{\max}$不超过任一无支承单个单元的最大固有频率，安全的估计是$\Delta t \le \min_e 2/\omega_{\max}^{(e)}$；对集中质量杆单元，$\omega_{\max}^{(e)} = 2c/L_e$，由此得到**库朗条件**（Courant condition）$\Delta t \le L_e/c$，其中$c = \sqrt{E/\rho}$。
:::

::: proof
对单个模态，$y_{n+1} - 2y_n + y_{n-1} + \omega^2\Delta t^2y_n = 0$。试取$y_n = G^n$得$G^2 - (2 - \omega^2\Delta t^2)G + 1 = 0$。两根之积为 1；当$\lvert 2 - \omega^2\Delta t^2\rvert \le 2$，即$\omega\Delta t \le 2$时，它们是模为 1 的共轭复数（稳定振荡），否则为实数且其中一个的模大于 1。单元界来自这样一个事实：组装系统的瑞利商是各单元能量之和的比值，而每个单元的应变能至多是其单元动能的$\omega_{\max}^{(e)2}$倍（艾恩斯（Irons）单元特征值定理）。对集中质量杆单元，取$\boldsymbol\phi = [1, -1]$，由$\mathbf{K}^{(e)}\boldsymbol\phi = \omega^2\mathbf{M}^{(e)}\boldsymbol\phi$得$2EA/L = \omega^2\rho AL/2$，$\omega = 2c/L$。
:::

从物理上看，应力波在一个时间步内不得穿过超过一个单元。对钢（$c \approx 5050\,\mathrm{m/s}$）和$5\,\mathrm{mm}$的单元，$\Delta t \le 0.99\,\mu\mathrm{s}$：一次$10\,\mathrm{ms}$的冲击需要约一万步，而模型中任何地方的一个小单元或畸变单元都会决定整个模型的步长。因此显式程序会报告稳定步长最小的单元，有些程序还使用**质量缩放**（mass scaling，给最小的单元增加人为密度），但增加量必须足够小，以免改变动力学行为。

### 纽马克法：隐式积分

对振动问题——持续数秒、由少数低阶模态主导的响应——显式方法的限制会要求数百万步。隐式方法消除了这一限制。

::: algorithm 纽马克法 {#alg-newmark}
取参数$\beta$和$\gamma$，近似
$$
\mathbf{d}_{n+1} = \mathbf{d}_n + \Delta t\,\dot{\mathbf{d}}_n + \Delta t^2\left[(\tfrac12 - \beta)\ddot{\mathbf{d}}_n + \beta\ddot{\mathbf{d}}_{n+1}\right], \qquad \dot{\mathbf{d}}_{n+1} = \dot{\mathbf{d}}_n + \Delta t\left[(1 - \gamma)\ddot{\mathbf{d}}_n + \gamma\ddot{\mathbf{d}}_{n+1}\right].
$$
1. 起步：$\ddot{\mathbf{d}}_0 = \mathbf{M}^{-1}(\mathbf{F}_0 - \mathbf{C}\dot{\mathbf{d}}_0 - \mathbf{K}\mathbf{d}_0)$。
2. 形成有效刚度$\hat{\mathbf{K}} = \mathbf{K} + \dfrac{\gamma}{\beta\Delta t}\mathbf{C} + \dfrac{1}{\beta\Delta t^2}\mathbf{M}$，并只分解一次。
3. 每一步：求解$\hat{\mathbf{K}}\mathbf{d}_{n+1} = \mathbf{F}_{n+1} + \mathbf{M}\left[\dfrac{\mathbf{d}_n}{\beta\Delta t^2} + \dfrac{\dot{\mathbf{d}}_n}{\beta\Delta t} + \left(\dfrac{1}{2\beta} - 1\right)\ddot{\mathbf{d}}_n\right] + \mathbf{C}[\dots]$（类似的阻尼项），然后由第一个公式更新$\ddot{\mathbf{d}}_{n+1}$，由第二个公式更新$\dot{\mathbf{d}}_{n+1}$。

**平均加速度**（梯形）法则$\beta = \tfrac14$，$\gamma = \tfrac12$具有二阶精度，对线性问题无条件稳定，且不引入数值阻尼。$\gamma > \tfrac12$以牺牲精度为代价加入数值阻尼；希尔伯（Hilber）、休斯（Hughes）和泰勒（Taylor）的 HHT-α 法（1977）在保持二阶精度的同时阻尼高阶模态。
:::

无条件稳定并不意味着任何步长都精确。平均加速度法则对线性无阻尼系统守恒能量，但会使周期变长：频率为$\omega$的模态以表观频率$\bar\omega$积分，$\bar\omega$满足$\tan(\bar\omega\Delta t/2) = \omega\Delta t/2$。每个周期十步时，周期误差约为 3 %；二十步时，低于 1 %。实用规则是对所关心的最短周期取$\Delta t \le T/20$；周期短于几个时间步的模态于是积分得不准确，但无害（它们被扭曲，而不是被放大）。

::: example 一个纽马克步 {#ex-newmark}
一个振子，$m = 1\,\mathrm{kg}$，$k = 100\,\mathrm{N/m}$（$\omega = 10\,\mathrm{rad/s}$），无阻尼、无载荷，从$x_0 = 1\,\mathrm{m}$处静止释放。用平均加速度法取一步$\Delta t = 0.1\,\mathrm{s}$，与精确解比较，并校核能量。
::: solution
$a_0 = -kx_0/m = -100\,\mathrm{m/s^2}$。有效刚度$\hat k = k + 4m/\Delta t^2 = 100 + 400 = 500\,\mathrm{N/m}$。右端项$m[4x_0/\Delta t^2 + 4v_0/\Delta t + a_0] = 400 + 0 - 100 = 300\,\mathrm{N}$。所以$x_1 = 300/500 = 0.600\,\mathrm{m}$。于是$a_1 = \frac{4}{\Delta t^2}(x_1 - x_0) - \frac{4}{\Delta t}v_0 - a_0 = 400(-0.4) + 100 = -60\,\mathrm{m/s^2}$（等于$-kx_1/m$，理应如此），$v_1 = v_0 + \tfrac{\Delta t}{2}(a_0 + a_1) = 0.05(-160) = -8.00\,\mathrm{m/s}$。

精确解：$x(0.1) = \cos 1 = 0.540\,\mathrm{m}$，$v(0.1) = -10\sin 1 = -8.41\,\mathrm{m/s}$。

**校核。**能量：$\tfrac12 kx_1^2 + \tfrac12 mv_1^2 = 18 + 32 = 50\,\mathrm{J} = \tfrac12 kx_0^2$，严格守恒。这一步长（$\omega\Delta t = 1$，每周期约六步）对精度而言太长——数值运动滞后，因为其周期长了$7.8\,\%$——但没有任何量增长。取$\Delta t = 0.03\,\mathrm{s}$（每周期约二十步），滞后将低于 1 %。
:::
:::

::: widget oscillator
m: 1
c: 0.4
k: 100
F: 0
omega: 10
x0: 1
v0: 0
caption: 在模态坐标中，有限元模型的每个模态都化为这样一个单自由度振子——这里是[[#ex-newmark]]的系统，加了少许阻尼（$\zeta = c/(2\sqrt{km}) = 2\,\%$）。在$\omega = 10\,\mathrm{rad/s}$附近加一个简谐力即可看到共振：在大型结构的模态分析中，每个保留的模态都像这个振子一样运动，各有其自身的$\omega_i$、$\zeta_i$和模态力$\boldsymbol\phi_i^{\mathsf T}\mathbf{F}$。
:::

::: warning 分析方法与时间步长的选择
有三种失配反复出现。**用显式积分求解慢过程问题**：用 2 mm 单元计算钢制零件 1 秒的振动响应需要约$2.5$百万步；应改用模态叠加或纽马克法。**用隐式积分以巨大步长求解冲击问题**：方法是稳定的，但应力波被抹平，峰值载荷被遗漏；波传播问题无论如何都需要$\Delta t \approx L_e/c$，这有利于显式方法。**模态太少或网格太粗**：只有当网格在每个半波长内有若干个单元、且时间步长能分辨其周期时，一个模态才有意义；通过加密网格检查你所依赖的模态的频率，并检查累积有效质量。
:::

::: quiz
两位分析人员在同一网格上计算同一支架的第一阶固有频率，一位用一致质量，一位用集中质量。他们得到 412 Hz 和 398 Hz。哪种说法最站得住脚？
- [ ] 集中质量的结果是错的，因为集中质量矩阵是一种近似。
- [x] 连续体模型的精确频率很可能介于两者之间，低于 412 Hz；加密网格会使一致质量的结果降低。
- [ ] 精确频率高于 412 Hz，因为有限元模型过于柔软。
- [ ] 这一差异表明网格已经收敛。
::: solution
采用一致质量时，[[#prop-rayleigh]]使 412 Hz 成为一个随加密而降低的上界。对连续体单元，集中质量通常（但并非总是）偏低，因此两个结果把答案夹在中间；3.5 % 的差距说明网格对这一模态尚未收敛。基于位移的模型过于**刚硬**，这就是其频率偏高的原因。
:::
:::

::: history
矩阵结构动力学是在航空工业中与静力方法同步发展起来的，20 世纪 50 年代，颤振和振动在那里是紧迫的问题。一致质量矩阵由阿彻（John Archer）于 1963 年提出（《分布质量系统的一致质量矩阵》（"Consistent mass matrix for distributed mass systems"），*Journal of the Structural Division, ASCE*），他证明了对梁而言它给出的频率比集中质量更精确。纽马克（Nathan Newmark）1959 年的论文《结构动力学的一种计算方法》（"A method of computation for structural dynamics"）提出了以他的名字命名的积分格式族，原本是为爆炸和地震响应设计的。希尔伯、休斯和泰勒 1977 年的 α 法加入了可控的高频阻尼。用于冲击的显式中心差分程序，始于 1976 年哈尔奎斯特（John Hallquist）在劳伦斯·利弗莫尔国家实验室开发的 DYNA3D，使整车碰撞仿真成为可能，如今已在汽车安全设计中常规使用。
:::

::: summary
- 虚功加上达朗贝尔惯性力给出$\mathbf{M}\ddot{\mathbf{d}} + \mathbf{C}\dot{\mathbf{d}} + \mathbf{K}\mathbf{d} = \mathbf{F}(t)$，一致质量为$\int\rho\mathbf{N}^{\mathsf T}\mathbf{N}\,dV$；杆：$\tfrac{\rho AL}{6}[2, 1; 1, 2]$，集中质量$\tfrac{\rho AL}{2}\mathbf{I}$。
- 固有频率和振型由$\mathbf{K}\boldsymbol\phi = \omega^2\mathbf{M}\boldsymbol\phi$求得；振型关于$\mathbf{M}$和$\mathbf{K}$正交，从而把方程解耦为单自由度振子。
- 一致质量频率是上界，随加密而下降；集中质量频率通常偏低。频率误差按$h^2$收敛；高阶模态需要更细的网格。
- 瑞利阻尼$a_0\mathbf{M} + a_1\mathbf{K}$给出$\zeta(\omega) = a_0/2\omega + a_1\omega/2$，在两个频率处拟合。
- 采用集中质量的中心差分法是显式的，每步代价低，但需要$\Delta t \le 2/\omega_{\max} \approx L_e/c$；纽马克平均加速度法则无条件稳定且能量守恒，但为保证精度需要$\Delta t \lesssim T/20$。
- 对波和冲击用显式积分，对振动用模态法或隐式方法，并通过网格加密和有效质量检查模态。
:::

## 习题

::: exercise 一致质量矩阵的一个元素 {level=1 check="0.13083"}
一个钢杆单元（$\rho = 7850\,\mathrm{kg/m^3}$），截面积$1.0\times10^{-4}\,\mathrm{m^2}$，长$0.5\,\mathrm{m}$。其一致质量矩阵的对角元素$m_{11}$是多少？（以 kg 为单位输入。）
::: solution
$m_{11} = \rho AL/3 = 7850 \times 10^{-4} \times 0.5/3 = 0.13083\,\mathrm{kg}$。非对角元素是它的一半；四个元素之和等于单元质量$0.3925\,\mathrm{kg}$。
:::
:::

::: exercise 临界时间步长 {level=1 check="0.3928"}
一个铝制零件（$E = 70\,\mathrm{GPa}$，$\rho = 2700\,\mathrm{kg/m^3}$）的最小单元尺寸为$2\,\mathrm{mm}$，估算其显式分析的临界时间步长。（以 μs 为单位输入$\Delta t$。）
::: solution
$c = \sqrt{70\times10^9/2700} = 5092\,\mathrm{m/s}$；$\Delta t \le L_e/c = 0.002/5092 = 3.93\times10^{-7}\,\mathrm{s} = 0.3928\,\mu\mathrm{s}$。（程序会施加约 0.9 的安全系数。）
:::
:::

::: exercise 两拟合频率之间的阻尼 {level=1 check="1.2727"}
瑞利阻尼拟合为在$10$和$100\,\mathrm{rad/s}$处给出$\zeta = 2\,\%$。在$50\,\mathrm{rad/s}$处的阻尼比是多少？（以百分数输入。）
::: solution
$a_0 = 2(0.02)(1000)/110 = 0.3636\,\mathrm{s^{-1}}$，$a_1 = 0.04/110 = 3.636\times10^{-4}\,\mathrm{s}$。$\zeta(50) = 0.3636/100 + 3.636\times10^{-4} \times 25 = 0.003636 + 0.009091 = 0.012727$，即$1.2727\,\%$。
:::
:::

::: exercise 单个单元的铝杆 {level=2 check="2865.1"}
一根铝杆（$E = 70\,\mathrm{GPa}$，$\rho = 2700\,\mathrm{kg/m^3}$），长$0.4\,\mathrm{m}$，一端固定、另一端自由，用一个单元和集中质量建模。模型给出的基频是多少？（以 Hz 为单位输入$f_1$。）并与精确值比较。
::: solution
$\omega = \sqrt2\,c/L = 1.4142 \times 5091.8/0.4 = 18\,002\,\mathrm{rad/s}$，$f_1 = 2865.1\,\mathrm{Hz}$。精确值：$f_1 = c/(4L) = 3182\,\mathrm{Hz}$；模型偏低 10 %，与[[#ex-bar]]相同。
:::
:::

::: exercise 两质量链的频率 {level=2 check="22.361"}
对[[#ex-2dof]]的两层模型，验证其特征方程，并给出较低的固有频率。（以 rad/s 为单位输入$\omega_1$。）
::: solution
$(3\times10^5 - 200s)(10^5 - 100s) - 10^{10} = 2\times10^4s^2 - 5\times10^7s + 3\times10^{10} - 10^{10}$，所以$s^2 - 2500s + 10^6 = 0$，$s = 500$和$2000$。$\omega_1 = \sqrt{500} = 22.361\,\mathrm{rad/s}$。
:::
:::

::: exercise 纽马克法的有效刚度 {level=2 check="500"}
对[[#ex-newmark]]的振子，由$\beta = \tfrac14$、$\gamma = \tfrac12$的两个纽马克公式导出平均加速度法的有效刚度，并对$\Delta t = 0.1\,\mathrm{s}$求值。（以 N/m 为单位输入$\hat k$。）
::: solution
由$\beta = \tfrac14$的位移公式：$a_{n+1} = \frac{4}{\Delta t^2}(x_{n+1} - x_n) - \frac{4}{\Delta t}v_n - a_n$。代入$ma_{n+1} + kx_{n+1} = F_{n+1}$得$(k + 4m/\Delta t^2)x_{n+1} = F_{n+1} + m\left[\frac{4}{\Delta t^2}x_n + \frac{4}{\Delta t}v_n + a_n\right]$。因此$\hat k = 100 + 4/0.01 = 500\,\mathrm{N/m}$。
:::
:::

::: exercise 周期延长 {level=3 check="1.0321"}
对平均加速度法，数值频率满足$\tan(\bar\omega\Delta t/2) = \omega\Delta t/2$。由该格式应用于$\ddot x + \omega^2x = 0$导出此式，并计算每个精确周期取十个时间步时数值周期与精确周期之比$\bar T/T$。（输入$\bar T/T$。）
::: solution
对无阻尼振子，把$\beta = \tfrac14$、$\gamma = \tfrac12$的纽马克公式合并，得到两步递推式$(1 + \tfrac{\Omega^2}{4})x_{n+1} - 2(1 - \tfrac{\Omega^2}{4})x_n + (1 + \tfrac{\Omega^2}{4})x_{n-1} = 0$，其中$\Omega = \omega\Delta t$。试取$x_n = e^{i\bar\omega n\Delta t}$：$\cos(\bar\omega\Delta t) = \dfrac{1 - \Omega^2/4}{1 + \Omega^2/4}$，结合$\cos 2\psi = (1 - \tan^2\psi)/(1 + \tan^2\psi)$即得$\tan(\bar\omega\Delta t/2) = \Omega/2$；$\lvert G\rvert = 1$，所以没有振幅误差。每周期十步：$\Omega = 2\pi/10 = 0.6283$；$\bar\omega\Delta t = 2\arctan(0.31416) = 0.60878$；$\bar T/T = \omega/\bar\omega = 0.6283/0.6088 = 1.0321$，周期延长 3.2 %。
:::
:::

::: exercise 上界性质 {level=3}
利用瑞利商证明：对一端固定、一端自由的杆，单个一致质量单元的频率$\sqrt3\,c/L$必定超过精确值$\frac{\pi}{2}c/L$；并解释为什么单个集中质量单元的频率$\sqrt2\,c/L$不在此论证的覆盖范围之内。然后证明：对一个单元，一致质量矩阵与集中质量矩阵的**平均**给出$\omega = \sqrt{12/5}\,c/L$，并将其误差与这两个“母”矩阵的误差比较。
::: solution
精确的$\omega_1^2$是$R = \int EA(u')^2dx/\int\rho Au^2dx$在所有容许$u(x)$（满足$u(0) = 0$）上的最小值。单元场$u = (x/L)u_2$是容许的：$R = (EA/L)/(\rho AL/3) = 3c^2/L^2$，所以$3c^2/L^2 \ge \omega_1^2 = (\pi^2/4)c^2/L^2$，即$\sqrt3 > \pi/2$ ✓。集中质量矩阵给出的动能是$\tfrac12(\rho AL/2)\dot u_2^2$，而不是线性场的真实动能$\tfrac12(\rho AL/3)\dot u_2^2$，因此它的商不是任何容许场的连续瑞利商，得不出界。平均矩阵的$m_{22} = \tfrac12(\tfrac13 + \tfrac12)\rho AL = \tfrac{5}{12}\rho AL$，给出$\omega = \sqrt{12/5}\,c/L = 1.549\,c/L$，而精确值为$1.571\,c/L$：误差$-1.4\,\%$，对比$+10.3\,\%$和$-10.0\,\%$。这类“高阶”质量矩阵被用来减小波传播分析中的频散误差。
:::
:::

::: exercise 规划动力分析 {level=3}
对下列各情形，在模态叠加、隐式（纽马克）积分和显式（中心差分）积分之间作出选择，并用时间步长或模态数的估计来说明理由：(a) 机器机架对以 1500 rpm 运转的不平衡转子的响应；(b) 一个带包装的电子设备从 1.5 m 高处跌落到混凝土上，冲击持续几毫秒；(c) 一座钢制人行桥在一群行人用 60 s 走过时的瞬态响应。
::: solution
(a) 线性结构受$25\,\mathrm{Hz}$的稳态简谐激励：采用模态分析（或直接频率响应），使用频率达到$25\,\mathrm{Hz}$的两到三倍的模态，并采用模态阻尼，检查没有固有频率接近$25\,\mathrm{Hz}$（或二次谐波的$50\,\mathrm{Hz}$）。(b) 带接触和应力波的短促、剧烈、非线性事件：显式积分。对铝或钢中的$2\,\mathrm{mm}$单元，$\Delta t \approx 0.4\,\mu\mathrm{s}$，所以$10\,\mathrm{ms}$的仿真需要约 25 000 步——属于常规规模。隐式积分每一步都需要非线性迭代，而在如此小的步长下毫无益处。(c) 长时间、低频、线性的响应：用前几阶竖向和横向模态（人行桥频率通常为 1–5 Hz）及随时间变化的模态载荷进行模态叠加，或用$\Delta t \approx T_{\min}/20$的纽马克法（若所关心的最高模态为 10 Hz，则$\Delta t = 5\,\mathrm{ms}$，共 12 000 步）。显式积分需要微秒级的步长——数千万步——因而不适用。在所有情形中，结果都必须对照相关的设计指南进行校核（例如对 (c) 采用行人舒适度准则）；分析为设计提供依据，但不能取代设计指南。
:::
:::
