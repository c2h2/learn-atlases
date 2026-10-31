一根铜线若无其事地载着一安培电流，导热几乎和金刚石一样好，还会发光。这些都是它的传导电子的性质：每个铜原子约贡献一个电子，每立方米约 $10^{29}$ 个，在晶体形成时从原子上解放出来。金属最简单的可能模型把这些电子当作气体，除了偶尔碰撞外完全自由，运动在均匀正电荷背景中以保持整体中性。

这个模型有两个版本，两者之间的对照正是本章的要点。德鲁德（Drude）1900 年的气体是经典的；它对导电和霍尔效应的描述相当成功，对热导的描述则准得著名，但它预言的电子热容根本不存在。索末菲（Sommerfeld）1928 年的气体是同一个气体，但服从泡利原理和费米–狄拉克（Fermi–Dirac）统计。于是几乎所有电子都被冻在费米球深处，只有费米能附近一层薄壳能对热或场作出响应，热容疑难随之消失。

我们使用 [[statistical-mechanics/bose-fermi]] 的费米–狄拉克分布、[[condensed-matter/lattice-vibrations]] 中 $\mathbf k$ 空间的态计数，以及 [[electrostatics/current]] 的电路基本量。这里忽略的离子及其周期势将在 [[condensed-matter/band-structure]] 中回归，那里会解释自由电子模型为什么能工作得这么好。

## 德鲁德模型 {#drude}

::: definition 德鲁德模型 {#def-drude}
**德鲁德模型**中，金属每单位体积含 $n$ 个传导电子，每个电荷 $-e$、质量 $m$。两次碰撞之间每个电子在外场中自由运动。碰撞是瞬时且随机的：在任一短时段 $\dd t$ 内，电子碰撞的概率为 $\dd t/\tau$，与它此前的历史无关，碰后速度的方向随机，不保留碰前速度的任何记忆。常数 $\tau$ 称为**弛豫时间**。
:::

德鲁德设想电子在离子之间反弹。这个图像是错的，我们马上会看到；完美格子中的电子根本不散射，$\tau$ 是由杂质、缺陷和声子决定的。但模型并不关心碰撞由什么引起，只关心它们以 $1/\tau$ 的速率把动量随机化。

设 $\mathbf p(t)$ 为电子的平均动量。在 $\dd t$ 时间内，$\dd t/\tau$ 的比例发生碰撞并失去平均动量，其余的从受力获得 $\mathbf F\,\dd t$。对 $\dd t$ 取一阶，

$$
\deriv{\mathbf p}{t} = -\frac{\mathbf p}{\tau} + \mathbf F.
$$ {#eq-drude}

碰撞的作用相当于一个正比于平均动量的摩擦力。

::: theorem 德鲁德电导率 {#thm-drude}
在均匀恒定电场 $\mathbf E$ 中，德鲁德模型给出欧姆定律 $\mathbf j = \sigma\mathbf E$，其中

$$
\sigma = \frac{ne^2\tau}{m}.
$$ {#eq-sigma}
:::

::: proof
取 $\mathbf F = -e\mathbf E$，[[#eq-drude]] 的稳态满足 $\deriv{\mathbf p}{t} = 0$，故 $\mathbf p = -e\tau\mathbf E$。平均速度即**漂移速度**，$\mathbf v_d = \mathbf p/m = -e\tau\mathbf E/m$。电流密度是单位体积的电荷乘其平均速度，$\mathbf j = -ne\,\mathbf v_d = (ne^2\tau/m)\,\mathbf E$。
:::

电导率是可测量的，所以这个公式实际上是测量 $\tau$ 的一种方式。注意 $\sigma$ 不依赖什么：不依赖电子两次碰撞之间的速度。进入公式的只有弛豫时间。这就是为什么德鲁德对电子运动的图像虽然不对，他对 $\sigma$ 的估计却可以有模有样。

::: example 铜的弛豫时间 {#ex-tau-cu}
铜常温下的电阻率 $\rho = 1.68\times10^{-8}\,\Omega\,\mathrm m$，每个原子一个传导电子，密度 $8.96\,\mathrm{g/cm^3}$，摩尔质量 $63.546\,\mathrm{g/mol}$。求 $n$、弛豫时间，以及 $1.00\,\mathrm A$ 电流流过截面积 $1.00\,\mathrm{mm^2}$ 导线时的漂移速度。
::: solution
单位体积的原子数为 $\rho_m N_A/M$：

$$
n = \frac{8960\,\mathrm{kg/m^3}\times6.02214\times10^{23}\,\mathrm{mol^{-1}}}{0.063546\,\mathrm{kg/mol}} = 8.49\times10^{28}\,\mathrm{m^{-3}}.
$$

对 [[#eq-sigma]] 取 $\sigma = 1/\rho$ 反解，

$$
\tau = \frac{m}{ne^2\rho} = \frac{9.1094\times10^{-31}}{(8.49\times10^{28})(1.60218\times10^{-19})^2(1.68\times10^{-8})}\,\mathrm s = 2.49\times10^{-14}\,\mathrm s.
$$

电流密度 $j = 1.00/(1.00\times10^{-6}) = 1.00\times10^{6}\,\mathrm{A/m^2}$，故漂移速度

$$
v_d = \frac{j}{ne} = \frac{1.00\times10^6}{(8.49\times10^{28})(1.60218\times10^{-19})} = 7.35\times10^{-5}\,\mathrm{m/s},
$$

即 $0.0735\,\mathrm{mm/s}$，约每小时四分之一米。导线中的信号以接近光速传播，电子本身却在爬行。
:::
:::

### 霍尔效应

把通电流的薄板放进与电流垂直的磁场。洛伦兹力（Lorentz）把载流子向侧面偏转，直到积累的横向电荷产生的电场抵消磁力为止。埃德温·霍尔（Edwin Hall）1879 年发现了这一电压，它的符号揭示载流子的电性。

::: proposition 霍尔系数 {#prop-hall}
设电流密度 $j_x$ 沿 $x$ 流动，磁场 $\mathbf B = B\hat{\mathbf z}$，$y$ 方向不允许有电流。德鲁德模型给出横向场 $E_y = R_H\,j_xB$，**霍尔系数**

$$
R_H = -\frac{1}{ne}
$$ {#eq-hall}

对电荷为 $-e$ 的载流子成立。它与 $\tau$ 和 $B$ 都无关。
:::

::: proof
稳态下 [[#eq-drude]] 取 $\mathbf F = -e(\mathbf E + \mathbf p\times\mathbf B/m)$，即 $0 = -\mathbf p/\tau - e\mathbf E - e\,\mathbf p\times\mathbf B/m$。乘以 $-ne\tau/m$ 并用 $\mathbf j = -ne\mathbf p/m$；记 $\omega_c = eB/m$，分量为

$$
\sigma E_x = j_x + \omega_c\tau\,j_y, \qquad \sigma E_y = -\omega_c\tau\,j_x + j_y.
$$

令 $j_y = 0$ 得 $E_x = j_x/\sigma$，即寻常的欧姆定律；以及 $E_y = -\omega_c\tau\,j_x/\sigma = -(eB\tau/m)(m/ne^2\tau)\,j_x = -j_xB/(ne)$。于是 $R_H = E_y/(j_xB) = -1/(ne)$；$\tau$ 已约掉。
:::

由于 $\tau$ 被约去，霍尔系数直接测量载流子密度。碱金属的实测值与"每个原子一个电子"符合到约 $20\%$ 以内。而铍、镁、铝在高场下测得的霍尔系数是*正的*，仿佛载流子带正电。自由电子气解释不了这个符号。能带论可以，用**空穴**，见 [[condensed-matter/band-structure]]。

::: example 一个霍尔电压 {#ex-hall-v}
厚 $0.100\,\mathrm{mm}$ 的铜条通 $1.00\,\mathrm A$ 电流，处在垂直的 $1.00\,\mathrm T$ 磁场中。求其宽度上的霍尔电压。
::: solution
若铜条宽 $w$、厚 $t$，则 $j_x = I/(wt)$，宽度方向的霍尔电压 $V_H = E_y w = R_H IB/t$，与 $w$ 无关。由 $\abs{R_H} = 1/(ne) = 7.35\times10^{-11}\,\mathrm{m^3/C}$，

$$
\abs{V_H} = \frac{(7.35\times10^{-11})(1.00)(1.00)}{1.00\times10^{-4}}\,\mathrm V = 7.35\times10^{-7}\,\mathrm V = 0.735\,\mu\mathrm V.
$$

金属巨大的载流子密度使电压微乎其微。半导体 $n \sim 10^{22}\,\mathrm{m^{-3}}$ 时它大七个数量级，所以实际的霍尔传感器——每部手机的指南针、每台发动机的曲轴传感器——都用半导体。
:::
:::

### 德鲁德模型的失败

德鲁德把电子当作经典理想气体，每个平均动能 $\frac32k_BT$。这有两个可检验的推论，而两者都不成立。经典电子气会给热容添加每个电子 $\frac32k_B$，一价金属每摩尔 $\frac32R$，使常温值从 $3R$ 升到 $4.5R$。金属和绝缘体一样服从杜隆-珀蒂（Dulong–Petit）定律；多出来的半个不见踪影。而常温下的经典热速率 $\sqrt{3k_BT/m} = 1.2\times10^5\,\mathrm{m/s}$ 乘上 [[#ex-tau-cu]] 的 $\tau$，得平均自由程 $0.3\,\mathrm{nm}$，约一个原子间距——这符合德鲁德"与离子碰撞"的图像，却与纯晶体低温下观察到的长平均自由程矛盾，那里 $\ell$ 可达毫米。

## 索末菲模型 {#sommerfeld}

保留德鲁德的自由电子，但把它们当量子粒子。体积 $V = L^3$ 箱中的每个电子有一个满足自由薛定谔方程的波函数。取周期边界条件 $\psi(x + L, y, z) = \psi(x,y,z)$，$y$、$z$ 方向同理，解为平面波

$$
\psi_{\mathbf k}(\mathbf r) = \frac{1}{\sqrt V}\,e^{i\mathbf k\cdot\mathbf r}, \qquad E(\mathbf k) = \frac{\hbar^2k^2}{2m}, \qquad \mathbf k = \frac{2\pi}{L}(n_x, n_y, n_z),\ n_i\in\Z.
$$ {#eq-plane-waves}

每个允许的 $\mathbf k$ 占据 $\mathbf k$ 空间中 $(2\pi/L)^3 = (2\pi)^3/V$ 的体积，每个 $\mathbf k$ 可容纳两个电子，自旋向上与向下。电子是费米子。基态中它们从最低能级填起，每态一个，直到 $N$ 个全部安置完毕。由于 $E$ 只依赖 $\abs{\mathbf k}$，被占据的态填满一个球。

::: definition 费米球、费米能 {#def-fermi}
**费米球**是自由电子气基态在 $\mathbf k$ 空间中所占据的区域；其半径 $k_F$ 称为**费米波矢**，其球面称为**费米面**。**费米能**为 $E_F = \hbar^2k_F^2/2m$，是最高被占据能级的能量。**费米速度**为 $v_F = \hbar k_F/m$，**费米温度**为 $T_F = E_F/k_B$。
:::

::: theorem 费米波矢与费米能 {#thm-fermi}
单位体积电子数为 $n$ 的自由电子气满足

$$
k_F = (3\pi^2 n)^{1/3}, \qquad E_F = \frac{\hbar^2}{2m}(3\pi^2n)^{2/3}.
$$ {#eq-kf}
:::

::: proof
半径 $k_F$ 的球内态数，每个波矢计两个自旋态，为

$$
N = 2\cdot\frac{\frac43\pi k_F^3}{(2\pi)^3/V} = \frac{Vk_F^3}{3\pi^2}.
$$

令 $N/V = n$ 得 $k_F^3 = 3\pi^2n$。费米能由 $E_F = \hbar^2k_F^2/2m$ 得到。
:::

费米波矢只依赖密度，理应如此：不相容原理迫使电子在挤得更近时进入波长越来越短的态。$\hbar$ 和 $m$ 都不进入 $k_F$。铜的密度定下了它的费米球。

::: example 铜与钠的费米能 {#ex-fermi-cu-na}
求铜（$n = 8.49\times10^{28}\,\mathrm{m^{-3}}$）和钠（密度 $0.968\,\mathrm{g/cm^3}$，摩尔质量 $22.990\,\mathrm{g/mol}$，每个原子一个传导电子）的 $k_F$、$E_F$、$T_F$ 与 $v_F$。
::: solution
铜的 $3\pi^2n = 2.514\times10^{30}\,\mathrm{m^{-3}}$，其立方根为 $k_F = 1.360\times10^{10}\,\mathrm{m^{-1}}$。于是

$$
E_F = \frac{(1.05457\times10^{-34})^2(1.360\times10^{10})^2}{2\times9.1094\times10^{-31}}\,\mathrm J = 1.129\times10^{-18}\,\mathrm J = 7.04\,\mathrm{eV}.
$$

故 $T_F = E_F/k_B = 8.17\times10^4\,\mathrm K$，$v_F = \hbar k_F/m = 1.57\times10^{6}\,\mathrm{m/s}$，约为光速的半个百分点。

钠的 $n = 968\times6.02214\times10^{23}/0.022990 = 2.536\times10^{28}\,\mathrm{m^{-3}}$，得 $k_F = 9.09\times10^9\,\mathrm{m^{-1}}$，$E_F = 3.15\,\mathrm{eV}$，$T_F = 3.65\times10^4\,\mathrm K$，$v_F = 1.05\times10^6\,\mathrm{m/s}$。

两个费米温度都是常温的数百倍。$300\,\mathrm K$ 的金属，对其电子而言冷得出奇：分布几乎就是基态。而费米速度是经典热速率的十倍。费米面附近的电子即使在绝对零度也高速运动，这是不相容原理的纯粹量子效应。
:::
:::

### 态密度与基态能量

能量低于 $E$ 的态数为 $N(E) = V(2mE)^{3/2}/(3\pi^2\hbar^3)$，即由 [[#thm-fermi]] 的证明取 $k = \sqrt{2mE}/\hbar$。其按单位体积的导数是**态密度**，

$$
g(E) = \frac{1}{V}\deriv{N}{E} = \frac{1}{2\pi^2}\Bigl(\frac{2m}{\hbar^2}\Bigr)^{3/2}\sqrt E = \frac{3n}{2E_F}\sqrt{\frac{E}{E_F}}.
$$ {#eq-dos}

第二种形式由 [[#eq-kf]] 消去常数得到。费米能处 $g(E_F) = 3n/(2E_F)$。基态中每个电子的平均能量为

$$
\frac{U}{N} = \frac1n\int_0^{E_F}E\,g(E)\,\dd E = \frac{3}{2E_F^{3/2}}\cdot\frac{2}{5}E_F^{5/2} = \frac35E_F.
$$ {#eq-u0}

对铜，绝对零度下每个电子 $4.2\,\mathrm{eV}$，相当于经典气体在 $33\,000\,\mathrm K$ 才有的能量。气体以**简并压** $P = -\partial U/\partial V = \frac23U/V = \frac25nE_F$ 向外推，铜约为 $38\,\mathrm{GPa}$，靠离子的吸引压住。其体积模量 $B = -V\,\partial P/\partial V = \frac23nE_F$，钠为 $8.5\,\mathrm{GPa}$，实测值约 $6$–$7\,\mathrm{GPa}$：碱金属的可压缩性主要就是自由电子气的可压缩性。

::: quiz
某金属的传导电子密度增大为 $8$ 倍，其费米能变为几倍？
- [ ] $2$
- [x] $4$
- [ ] $8$
- [ ] $16$
::: solution
由 [[#eq-kf]]，$E_F\propto n^{2/3}$，而 $8^{2/3} = 4$。费米波矢翻倍，$k_F\propto n^{1/3}$，能量是其平方。这正是不相容原理在起作用：挤得更密迫使波长更短。
:::
:::

## 有限温度下的费米气体 {#finite-t}

温度 $T$ 下，能量为 $E$ 的单粒子态的平均占据数是费米–狄拉克函数

$$
f(E) = \frac{1}{e^{(E-\mu)/k_BT} + 1},
$$ {#eq-fd}

其中化学势 $\mu$ 由电子总数为 $N$ 的条件固定。$T = 0$ 时它是阶跃：$\mu = E_F$ 以下 $f = 1$，以上 $f = 0$。$T > 0$ 时，阶跃在 $\mu$ 附近几个 $k_BT$ 的能量范围内被抹圆，范围之外一切如旧。费米球深处的电子无法吸收少量能量，因为它们紧上方的态已经占满。

::: widget plot
f: 1/(exp((x - 1)/t) + 1); sqrt(max(x, 0))/(exp((x - 1)/t) + 1)
x: 0, 2
y: 0, 1.5
labels: 占据数 f(E); 占据态密度 g(E) f(E)
sliders: t=0.05:0.005:0.5:0.005
caption: 费米–狄拉克占据数与被占据态密度 $g(E)f(E)$，能量以 $E_F$ 为单位，态密度以 $g(E_F)$ 为单位，参数 $t = k_BT/E_F$。铜在常温下 $t \approx 0.004$，太陡，这里看不见；从 $t = 0.05$ 开始，注意只有 $E = E_F$ 附近宽约 $2t$ 的一条薄壳受到扰动。把 $t$ 推到 $0.5$，阶跃消融，气体正在变经典。（化学势被固定在 $E_F$；它真实的移动为 $t^2$ 量级。）
:::

因此热学性质由费米面 $k_BT$ 范围内的电子主宰，其比例为 $T/T_F$ 量级，常温下不到百分之一。一个估算立刻可得：单位体积约有 $g(E_F)k_BT$ 个电子被激发，每个激发约 $k_BT$，所以热能 $\sim g(E_F)(k_BT)^2$，热容 $\sim g(E_F)k_B^2T$：随 $T$ 线性，比经典的 $\frac32nk_B$ 小一个 $T/T_F$ 量级的因子。精确系数还需要一件工具。

::: lemma 索末菲展开 {#lem-sommerfeld}
对光滑函数 $H(E)$，若在 $E\to-\infty$ 时消失、在 $E\to\infty$ 时增长不快于幂，则

$$
\int_{-\infty}^\infty H(E)\,f(E)\,\dd E = \int_{-\infty}^{\mu}H(E)\,\dd E + \frac{\pi^2}{6}(k_BT)^2H'(\mu) + O\bigl((k_BT)^4\bigr).
$$ {#eq-sommerfeld}
:::

::: proof
令 $K(E) = \int_{-\infty}^E H$。分部积分：左边成为 $\int K(E)\,(-\partial f/\partial E)\,\dd E$，边界项消失，因为 $K(-\infty) = 0$，且 $f(\infty) = 0$ 比 $K$ 的增长更快。函数 $-\partial f/\partial E$ 是一个单位面积的峰，关于 $\mu$ 对称，宽 $\sim k_BT$。把 $K$ 在 $\mu$ 处泰勒展开：$K(E) = K(\mu) + (E-\mu)H(\mu) + \frac12(E-\mu)^2H'(\mu) + \dots$。奇次项由对称性积分为零。令 $x = (E-\mu)/k_BT$，二阶项给出 $\frac12H'(\mu)(k_BT)^2\int x^2\,e^x/(e^x+1)^2\,\dd x$，该积分等于 $\pi^2/3$（它是 $2\int_0^\infty x^2e^x/(e^x+1)^2\,\dd x = 4\int_0^\infty x/(e^x+1)\,\dd x = 4\cdot\pi^2/12$，再分部积分一次即得）。于是得到 $\frac{\pi^2}{6}(k_BT)^2H'(\mu)$。渐近级数的完整论证见 Ashcroft 与 Mermin 附录 C。
:::

::: theorem 电子热容 {#thm-cel}
$T\ll T_F$ 时，自由电子气单位体积的热容为

$$
c_\mathrm{el} = \frac{\pi^2}{3}\,g(E_F)\,k_B^2\,T = \frac{\pi^2}{2}\,nk_B\,\frac{T}{T_F}.
$$ {#eq-cel}
:::

::: proof
对单位体积两次运用 [[#lem-sommerfeld]]。密度 $n = \int g f\,\dd E = \int_0^\mu g\,\dd E + \frac{\pi^2}{6}(k_BT)^2g'(\mu)$。$T = 0$ 时它是 $\int_0^{E_F}g$，两者必须相等；取主导阶，$\int_0^\mu g\approx\int_0^{E_F}g + (\mu - E_F)g(E_F)$，于是

$$
(\mu - E_F)\,g(E_F) = -\frac{\pi^2}{6}(k_BT)^2g'(E_F).
$$

能量密度 $u = \int Egf\,\dd E = \int_0^\mu Eg\,\dd E + \frac{\pi^2}{6}(k_BT)^2\bigl[g(\mu) + \mu g'(\mu)\bigr]$。用同样办法把第一个积分在 $E_F$ 处展开，得 $u_0 + (\mu - E_F)E_Fg(E_F)$；代入 $\mu$ 的移动后，$\mu g'$ 项在这一阶恰好抵消：

$$
u = u_0 + \frac{\pi^2}{6}(k_BT)^2g(E_F).
$$

对 $T$ 求导得 $c_\mathrm{el} = \frac{\pi^2}{3}g(E_F)k_B^2T$。代入 $g(E_F) = 3n/(2E_F)$ 即得 $\frac{\pi^2}{2}nk_B\,(k_BT/E_F)$。
:::

与经典的 $\frac32nk_B$ 相比，电子热容缩小了 $\frac{\pi^2}{3}\,T/T_F$，铜在常温下约 $1.2\%$。每摩尔写作 $\gamma T$，**索末菲系数**为

$$
\gamma = \frac{\pi^2}{2}\,\frac{zR\,k_B}{E_F},
$$ {#eq-gamma}

其中 $z$ 是每个原子的传导电子数。击垮德鲁德模型的疑难就此解决：电子都在，但其中几乎全体被不相容原理禁止吸热。

::: example 铜的索末菲系数 {#ex-gamma-cu}
由 $E_F = 7.04\,\mathrm{eV}$ 计算铜的 $\gamma$，与实测值 $0.695\,\mathrm{mJ\,mol^{-1}\,K^{-2}}$ 比较，并求 $300\,\mathrm K$ 下的电子热容。
::: solution
取 $z = 1$，$R = 8.3145\,\mathrm{J\,mol^{-1}\,K^{-1}}$，$k_B = 1.38065\times10^{-23}\,\mathrm{J/K}$，$E_F = 1.1286\times10^{-18}\,\mathrm J$，

$$
\gamma = \frac{\pi^2}{2}\cdot\frac{8.3145\times1.38065\times10^{-23}}{1.1286\times10^{-18}}\,\mathrm{J\,mol^{-1}\,K^{-2}} = 5.02\times10^{-4}\,\mathrm{J\,mol^{-1}\,K^{-2}} = 0.502\,\mathrm{mJ\,mol^{-1}\,K^{-2}}.
$$

实测值大 $0.695/0.502 = 1.38$ 倍。固定密度时 $\gamma\propto g(E_F)\propto m$，所以这个比值常表示为**热有效质量** $m^*/m = 1.38$。它笼统概括了晶格势对能带结构的影响以及与声子、其他电子的相互作用，这些这里全部略去。$300\,\mathrm K$ 下电子热容为 $\gamma T = 0.15\,\mathrm{J\,mol^{-1}\,K^{-1}}$（自由电子值）至 $0.21$（实测），而晶格贡献为 $24.9$。它只在低温下可见，那里晶格项 $\propto T^3$ 衰减得更快。
:::
:::

::: widget plot
f: 0.695*x; 1943.8/343^3*1000*x^3; 0.695*x + 1943.8/343^3*1000*x^3
x: 0, 8
y: 0, 30
labels: 电子 γT; 晶格 βT³; 总和
caption: 铜的低温热容，以 $\mathrm{mJ\,mol^{-1}\,K^{-1}}$ 为单位，对以开尔文为单位的 $T$ 作图，取实测 $\gamma = 0.695\,\mathrm{mJ\,mol^{-1}\,K^{-2}}$ 与 $\Theta_D = 343\,\mathrm K$ 的德拜晶格项。找出两部分贡献的交点，在 $3.8\,\mathrm K$ 附近：以下电子占主导，以上晶格占主导。实验者作 $C/T$ 对 $T^2$ 的图，总和就化为一条直线，截距为 $\gamma$，斜率为 $\beta$。
:::

::: warning 并非所有电子都参与
很容易诱惑人给每个传导电子安上热能 $\frac32k_BT$，或经典热速率，德鲁德就是这么做的。对简并气体两者皆错。热能由 $\sim T/T_F$ 比例的电子携带，而载流或载热的电子以 $v_F$ 运动，不是 $\sqrt{3k_BT/m}$——后者常温下小了十倍，且 $T\to0$ 时竟不消失。与此相关的错误是对金属使用麦克斯韦-玻尔兹曼统计（Maxwell–Boltzmann）。只有 $T\gg T_F$ 时才有效，对金属意味着永远无效；它对半导体中稀薄的载流子*确实*有效，[[condensed-matter/semiconductors]] 将会展示。
:::

## 费米气体的输运 {#transport}

索末菲图像如何改变德鲁德的电导率？电场以同样的速率移动每个电子的波矢，$\hbar\,\dd\mathbf k/\dd t = -e\mathbf E$，于是整个费米球被平移。碰撞以速率 $1/\tau$ 弛豫这个位移，稳态下球平移了 $\delta\mathbf k = -e\tau\mathbf E/\hbar$。电流为 $-ne\hbar\,\delta\mathbf k/m$，结果又是 [[#eq-sigma]]。真正改变状态的只有费米面附近的电子——平移球的前沿与后沿——而这些电子以 $v_F$ 运动。于是平均自由程为

$$
\ell = v_F\tau,
$$

铜在常温下为 $(1.57\times10^6)(2.49\times10^{-14}) = 3.9\times10^{-8}\,\mathrm m$，约 $40\,\mathrm{nm}$，即 $150$ 个原子间距。电子并没有在每一个离子上反弹。在完美格子中它们根本不散射；布洛赫（Bloch）定理，见 [[condensed-matter/band-structure]]，正是这个理由。它们散射自对完美周期性的偏离：杂质与缺陷，给出与温度无关的**残余电阻率**；以及声子，其数目随温度增长。两种散射率相加（**马西森（Matthiessen）定则**），故 $\rho(T) = \rho_0 + \rho_\mathrm{ph}(T)$，$\Theta_D/3$ 以上 $\rho_\mathrm{ph}\propto T$。

### 维德曼–弗兰茨定律

1853 年古斯塔夫·维德曼（Gustav Wiedemann）与鲁道夫·弗兰茨（Rudolf Franz）发现：给定温度下热导率与电导率之比对所有金属大致相同；路德维希·洛伦兹（Ludvig Lorenz）1872 年进一步证明该比值正比于 $T$。

::: theorem 维德曼–弗兰茨定律 {#thm-wf}
若热与电荷都由电子携带，且电子经历弹性散射、弛豫时间同为 $\tau$，则

$$
\frac{\kappa}{\sigma T} = L = \frac{\pi^2}{3}\Bigl(\frac{k_B}{e}\Bigr)^2 = 2.44\times10^{-8}\,\mathrm{W\,\Omega\,K^{-2}}.
$$ {#eq-wf}
:::

::: proof
粒子动理论给载流子气体的热导率 $\kappa = \frac13c\,v^2\tau$，其中 $c$ 是单位体积热容，$v$ 是载流子速度，$\ell = v\tau$ 是平均自由程（[[thermodynamics/kinetic-theory]]）。费米气体中载流子以 $v_F$ 运动，$c$ 取 [[#eq-cel]]：

$$
\kappa = \frac13\cdot\frac{\pi^2}{2}\,\frac{nk_B^2T}{E_F}\,v_F^2\tau = \frac{\pi^2}{3}\,\frac{nk_B^2T\tau}{m},
$$

其中用了 $E_F = \frac12mv_F^2$。除以 $\sigma T = ne^2\tau T/m$，$n$、$\tau$、$m$ 全部约去，剩下 $\frac{\pi^2}{3}(k_B/e)^2$。数值上 $(1.380649\times10^{-23}/1.602177\times10^{-19})^2 = 7.426\times10^{-9}\,\mathrm{V^2/K^2}$，乘以 $\pi^2/3$ 得 $2.443\times10^{-8}\,\mathrm{W\,\Omega\,K^{-2}}$。
:::

德鲁德用经典的 $c = \frac32nk_B$ 和 $v^2 = 3k_BT/m$，得到 $\frac32(k_B/e)^2$，恰为正确值的一半；他原始论文里的一次算术失误又把它翻倍，几乎精确撞上实测值。经典热容大了上百倍，经典 $v^2$ 小了上百倍，两个错误互相抵消。索末菲的结果消去两个错误，保留了相符。

::: example 铜的热导率 {#ex-kappa-cu}
由铜在 $295\,\mathrm K$ 的电阻率 $1.68\times10^{-8}\,\Omega\,\mathrm m$ 预言其热导率。
::: solution
由 [[#eq-wf]]，

$$
\kappa = \frac{LT}{\rho} = \frac{(2.443\times10^{-8})(295)}{1.68\times10^{-8}}\,\mathrm{W\,m^{-1}\,K^{-1}} = 429\,\mathrm{W\,m^{-1}\,K^{-1}}.
$$

实测值约 $400\,\mathrm{W\,m^{-1}\,K^{-1}}$，即实测洛伦兹比为 $2.28\times10^{-8}$，与理论相差 $7\%$ 以内。该定律在常温（声子散射近乎弹性）和极低温（杂质主导）都成立得很好。中间温度下，小角度声子散射弛豫热流比弛豫电流更有效，比值出现下陷。金属导热好与导电好出于同一原因——这一定律说的就是这件事；金属中声子对 $\kappa$ 的贡献只有百分之几。
:::
:::

### 交变场与等离子体频率

德鲁德方程还回答一个关于光的问题。设电场振荡，$\mathbf E(t) = \operatorname{Re}\bigl(\mathbf E_0e^{-i\omega t}\bigr)$，求同频稳态响应 $\mathbf p(t) = \operatorname{Re}\bigl(\mathbf p_0e^{-i\omega t}\bigr)$。代入 [[#eq-drude]] 得 $-i\omega\mathbf p_0 = -\mathbf p_0/\tau - e\mathbf E_0$，故 $\mathbf p_0 = -e\tau\mathbf E_0/(1 - i\omega\tau)$，电流密度 $\mathbf j_0 = -ne\mathbf p_0/m$ 定义**交流电导率**

$$
\sigma(\omega) = \frac{\sigma_0}{1 - i\omega\tau}, \qquad \sigma_0 = \frac{ne^2\tau}{m}.
$$ {#eq-sigma-ac}

磁力已被忽略，这没问题，因为它小一个 $v/c$ 因子。低频 $\omega\tau\ll1$ 时，金属像一个以其直流电导率工作的电阻。高频时电子跟不上：两次碰撞之间几乎不动，电流落后场四分之一个周期，响应从耗散变为电抗性的。

把这个电流放进麦克斯韦方程。对按 $e^{-i\omega t}$ 变化的场，传导电流 $\sigma\mathbf E$ 的作用完全像极化电流，金属表现为相对介电常数为 $\varepsilon(\omega) = 1 + i\sigma(\omega)/(\varepsilon_0\omega)$ 的介质。$\omega\tau\gg1$ 时它化为

$$
\varepsilon(\omega) \approx 1 - \frac{\omega_p^2}{\omega^2}, \qquad \omega_p = \sqrt{\frac{ne^2}{\varepsilon_0 m}}.
$$ {#eq-plasma}

常数 $\omega_p$ 是**等离子体频率**。低于它时 $\varepsilon < 0$，光在金属中的波矢为虚数，场在表面附近短距离内衰减，光被反射。高于它时 $\varepsilon > 0$，金属变得透明。它也是整个电子气相对离子平移后自由振荡的频率；该振荡的量子——**等离激元（plasmon）**——表现为快电子穿过金属薄膜时的尖锐能量损失。

::: example 金属为什么发光 {#ex-plasma}
求铜（$n = 8.49\times10^{28}\,\mathrm{m^{-3}}$）和钠（$n = 2.536\times10^{28}\,\mathrm{m^{-3}}$）的等离子体能量 $\hbar\omega_p$ 及对应的真空波长，并检验可见光在铜中满足 $\omega\tau\gg1$。
::: solution
对铜，

$$
\omega_p = \sqrt{\frac{(8.49\times10^{28})(1.60218\times10^{-19})^2}{(8.8542\times10^{-12})(9.1094\times10^{-31})}}\,\mathrm{s^{-1}} = 1.644\times10^{16}\,\mathrm{s^{-1}},
$$

故 $\hbar\omega_p = 10.8\,\mathrm{eV}$，$\lambda_p = 2\pi c/\omega_p = 115\,\mathrm{nm}$，在远紫外。钠的 $\omega_p$ 按 $\sqrt n$ 缩放，得 $\hbar\omega_p = 5.91\,\mathrm{eV}$，$\lambda_p = 210\,\mathrm{nm}$。波长 $550\,\mathrm{nm}$ 的绿光 $\omega = 3.42\times10^{15}\,\mathrm{s^{-1}}$，用 [[#ex-tau-cu]] 的 $\tau = 2.49\times10^{-14}\,\mathrm s$，$\omega\tau = 85$，高频形式 [[#eq-plasma]] 适用。一切可见光都在 $\omega_p$ 之下而被反射：金属因此闪闪发光。碱金属在紫外、靠近这些自由电子波长的地方会变透明，这是伍德（Wood）1933 年发现的。铜的淡红色不在本模型之内；它来自满 $d$ 带电子对蓝光的吸收，是能带结构效应。
:::
:::

::: quiz
钠薄膜先后被波长 $150\,\mathrm{nm}$ 与 $400\,\mathrm{nm}$ 的光照射。按自由电子模型，哪个说法正确？
- [x] $150\,\mathrm{nm}$ 的光大部分透过，$400\,\mathrm{nm}$ 的光被反射。
- [ ] 两者都被反射，因为钠是金属。
- [ ] $400\,\mathrm{nm}$ 的光透过，$150\,\mathrm{nm}$ 的光被反射。
- [ ] 两者都透过，因为膜很薄。
::: solution
钠的等离子体波长约 $210\,\mathrm{nm}$。波长更短则 $\omega > \omega_p$，由 [[#eq-plasma]] 得 $\varepsilon > 0$，光可以传播。波长更长则 $\varepsilon < 0$，被反射。金属只有在等离子体频率之下才是镜子。
:::
:::

::: history 从德鲁德到索末菲
约瑟夫·约翰·汤姆孙（J. J. Thomson）1897 年发现电子，三年之内保罗·德鲁德（Paul Drude）在莱比锡把气体动理论用于金属中的电子，1900 年发表了他的模型。亨德里克·洛伦兹（Hendrik Lorentz）1905 年用恰当的麦克斯韦-玻尔兹曼分布对它作了改进，但没有治好热容疑难。治好它需要量子统计。恩里科·费米（Enrico Fermi）与保罗·狄拉克（Paul Dirac）1926 年建立了服从不相容原理的粒子的统计，沃尔夫冈·泡利（Wolfgang Pauli）1927 年用它解释了金属自旋顺磁性为何小而与温度无关。阿诺德·索末菲（Arnold Sommerfeld）在慕尼黑随后于 1927、1928 年的一系列论文中把德鲁德理论建立在费米–狄拉克统计之上，得到线性热容和正确的洛伦兹数。霍尔效应比这一切都早：埃德温·霍尔（Edwin Hall）1879 年还是约翰斯·霍金斯大学的研究生时发现了它。
:::

## 后续内容 {#leads}

自由电子气好得难以置信。它完全无视离子，却预言了简单金属的费米能、几十个百分点以内的热容、以及它们的压缩性。[[condensed-matter/band-structure]] 解释了原因：在周期势中电子态仍用波矢标记，势主要在布里渊区边界附近起作用，其余被有效质量吸收。它还解释了自由气体无法解释的东西，从正的霍尔系数到绝缘体。本章的费米–狄拉克统计用于几乎空带中寥寥几个载流子，就成为 [[condensed-matter/semiconductors]] 的半导体物理；而费米面是 [[condensed-matter/magnetism-superconductivity]] 中超导发生的地方。简并费米气体还撑住了白矮星，见 [[statistical-mechanics/bose-fermi]]。

::: summary
- 德鲁德：电子当作带弛豫时间 $\tau$ 的经典气体；$\sigma = ne^2\tau/m$，霍尔系数 $R_H = -1/(ne)$ 测量载流子的密度与符号。
- 德鲁德在热容上失败——缺少经典的每电子 $\frac32k_B$——也在平均自由程上失败。
- 索末菲：自由费米子填满费米球，$k_F = (3\pi^2n)^{1/3}$；铜的 $E_F = 7.0\,\mathrm{eV}$，$T_F\approx8\times10^4\,\mathrm K$，金属永远是简并的。
- 态密度 $g(E)\propto\sqrt E$，$g(E_F) = 3n/2E_F$；基态能量为每电子 $\frac35E_F$。
- 只有 $E_F$ 附近 $\sim k_BT$ 内的电子有响应：$c_\mathrm{el} = \frac{\pi^2}{3}g(E_F)k_B^2T$，即 $\gamma T$，铜的 $\gamma\approx0.5\,\mathrm{mJ\,mol^{-1}\,K^{-2}}$。
- 输运由费米面上以 $v_F$ 运动的电子承担；铜常温下平均自由程约 $40\,\mathrm{nm}$。
- 维德曼–弗兰茨定律：$\kappa/\sigma T = \frac{\pi^2}{3}(k_B/e)^2 = 2.44\times10^{-8}\,\mathrm{W\,\Omega\,K^{-2}}$。
:::

## 习题 {#exercises}

::: exercise 铝的费米能 {level=1 check="11.66"}
铝密度 $2.70\,\mathrm{g/cm^3}$，摩尔质量 $26.9815\,\mathrm{g/mol}$，每个原子三个传导电子。求其自由电子费米能，以电子伏为单位。
::: solution
电子密度 $n = 3\times2700\times6.02214\times10^{23}/0.0269815 = 1.808\times10^{29}\,\mathrm{m^{-3}}$。于是 $k_F = (3\pi^2n)^{1/3} = 1.749\times10^{10}\,\mathrm{m^{-1}}$，

$$
E_F = \frac{\hbar^2k_F^2}{2m} = 1.868\times10^{-18}\,\mathrm J = 11.66\,\mathrm{eV}.
$$

三价使费米能相对铜几乎翻倍。用德哈斯–范阿尔芬（de Haas–van Alphen）测量描绘的铝的真实费米面，在被切开并重新拼进布里渊区之后，与这个自由电子球出奇地接近。
:::
:::

::: exercise 漂移速度 {level=1 check="0.0735"}
截面积 $1.00\,\mathrm{mm^2}$ 的铜线载 $1.00\,\mathrm A$ 电流，$n = 8.49\times10^{28}\,\mathrm{m^{-3}}$。求传导电子的漂移速度，以毫米每秒为单位。
::: solution
由 $I = neAv_d$，

$$
v_d = \frac{I}{neA} = \frac{1.00}{(8.49\times10^{28})(1.60218\times10^{-19})(1.00\times10^{-6})}\,\mathrm{m/s} = 7.35\times10^{-5}\,\mathrm{m/s} = 0.0735\,\mathrm{mm/s}.
$$

与 $v_F = 1.57\times10^6\,\mathrm{m/s}$ 相比：漂移只是费米球半径约 $2\times10^{10}$ 分之一的平移。
:::
:::

::: exercise 洛伦兹数 {level=1 check="2.443e-8"}
用 $k_B$ 与 $e$ 的精确 SI 值计算 $L = \frac{\pi^2}{3}(k_B/e)^2$，以 $\mathrm{W\,\Omega\,K^{-2}}$ 为单位。
::: solution
$k_B/e = 1.380649\times10^{-23}/1.602176634\times10^{-19} = 8.6173\times10^{-5}\,\mathrm{V/K}$。平方为 $7.4259\times10^{-9}\,\mathrm{V^2/K^2}$，乘以 $\pi^2/3 = 3.2899$ 得 $L = 2.443\times10^{-8}\,\mathrm{V^2/K^2}$。由于 $\mathrm{V^2} = \mathrm{W\,\Omega}$，这就是 $2.443\times10^{-8}\,\mathrm{W\,\Omega\,K^{-2}}$。这个数不含任何金属的任何性质，这正是该定律的非凡之处。
:::
:::

::: exercise 钠的费米速度 {level=2 check="1.05"}
用 $n = 2.536\times10^{28}\,\mathrm{m^{-3}}$，求钠的费米速度，以 $10^6\,\mathrm{m/s}$ 为单位，并与 $300\,\mathrm K$ 的经典热速率 $\sqrt{3k_BT/m}$ 比较。
::: solution
$k_F = (3\pi^2\times2.536\times10^{28})^{1/3} = 9.089\times10^9\,\mathrm{m^{-1}}$，故

$$
v_F = \frac{\hbar k_F}{m} = \frac{(1.05457\times10^{-34})(9.089\times10^9)}{9.1094\times10^{-31}}\,\mathrm{m/s} = 1.05\times10^6\,\mathrm{m/s}.
$$

经典速率为 $\sqrt{3(1.380649\times10^{-23})(300)/9.1094\times10^{-31}} = 1.17\times10^5\,\mathrm{m/s}$，小九倍。比值 $v_F/v_\mathrm{th} = \sqrt{2T_F/3T}$ 很大，因为 $T_F/T\approx120$。
:::
:::

::: exercise 一次霍尔测量 {level=2 check="0.735"}
厚 $0.100\,\mathrm{mm}$ 的铜条载 $1.00\,\mathrm A$ 电流，处在垂直的 $1.00\,\mathrm T$ 磁场中。求霍尔电压的大小，以微伏为单位。
::: solution
如 [[#ex-hall-v]]，$\abs{V_H} = IB/(net) = (1.00)(1.00)/\bigl[(8.49\times10^{28})(1.60218\times10^{-19})(1.00\times10^{-4})\bigr] = 7.35\times10^{-7}\,\mathrm V = 0.735\,\mu\mathrm V$。把磁场或电流反号，符号随之反转。铜的符号对应负电荷载流子，与 [[#eq-hall]] 一致。
:::
:::

::: exercise 电子对声子 {level=2 check="3.80"}
铜的 $C = \gamma T + \beta T^3$，$\gamma = 0.695\,\mathrm{mJ\,mol^{-1}\,K^{-2}}$，$\beta = \frac{12\pi^4}{5}R/\Theta_D^3$，$\Theta_D = 343\,\mathrm K$。两部分贡献相等的温度是多少，以开尔文为单位？
::: solution
相等即 $\gamma T = \beta T^3$，故 $T = \sqrt{\gamma/\beta}$。晶格系数 $\beta = 1943.77/343^3 = 4.817\times10^{-5}\,\mathrm{J\,mol^{-1}\,K^{-4}} = 0.04817\,\mathrm{mJ\,mol^{-1}\,K^{-4}}$。于是

$$
T = \sqrt{\frac{0.695}{0.04817}}\,\mathrm K = \sqrt{14.43}\,\mathrm K = 3.80\,\mathrm K.
$$

这就是金属的电子热容要在液氦温度测量的原因。这个交叉可以在第二张图上读出来。
:::
:::

::: exercise 费米能级的态密度 {level=2 check="0.213"}
用 $E_F = 7.04\,\mathrm{eV}$，求铜在费米能处的自由电子态密度，以每原子每电子伏的态数计（含两种自旋）。
::: solution
由 [[#eq-dos]]，$g(E_F) = 3n/(2E_F)$ 是单位体积的值。除以原子密度 $n$（每原子一个电子），每原子得 $3/(2E_F)$：

$$
\frac{3}{2\times7.04\,\mathrm{eV}} = 0.213\,\mathrm{eV^{-1}}\ \text{每原子}.
$$

实测 $\gamma$ 隐含每原子 $0.213\times1.38 = 0.29\,\mathrm{eV^{-1}}$。$d$ 带部分填充的过渡金属，如镍或钯，$E_F$ 处的态密度大好几倍，$\gamma$ 也相应地大。
:::
:::

::: exercise 费米气体的压强 {level=3}
证明自由电子气的基态能量为 $U = \frac35NE_F$，在固定 $N$ 下按 $V^{-2/3}$ 依赖体积，并推出压强 $P = \frac23U/V$、体积模量 $B = \frac53P = \frac23nE_F$。
::: solution
由 [[#eq-u0]]，$U = \frac35NE_F$。由 [[#eq-kf]]，$E_F\propto n^{2/3} = (N/V)^{2/3}$，故 $U = AV^{-2/3}$，$A$ 与 $V$ 无关。于是

$$
P = -\pdv{U}{V} = \frac23AV^{-5/3} = \frac23\frac UV = \frac25nE_F.
$$

再求导，$\partial P/\partial V = -\frac53P/V$，故 $B = -V\,\partial P/\partial V = \frac53P = \frac23nE_F$。对钠，$\frac23(2.536\times10^{28})(3.147\times1.60218\times10^{-19})\,\mathrm{Pa} = 8.5\,\mathrm{GPa}$。关系式 $PV = \frac23U$ 对任何非相对论理想气体成立，无论经典还是量子，因为每个单粒子能级都有 $E\propto k^2\propto V^{-2/3}$。
:::
:::

::: exercise 有限温度的化学势 {level=3}
用 [[#thm-cel]] 证明中的那一步，证明到二阶 $\mu(T) = E_F\bigl[1 - \frac{\pi^2}{12}(T/T_F)^2\bigr]$，并求铜在 $300\,\mathrm K$ 的相对移动。
::: hint
对 $g\propto\sqrt E$，$g'(E_F)/g(E_F) = 1/(2E_F)$。
:::
::: solution
前面的证明给出 $(\mu - E_F)g(E_F) = -\frac{\pi^2}{6}(k_BT)^2g'(E_F)$。由 $g'/g = 1/(2E_F)$，

$$
\mu - E_F = -\frac{\pi^2}{6}\,\frac{(k_BT)^2}{2E_F} = -\frac{\pi^2}{12}E_F\Bigl(\frac{T}{T_F}\Bigr)^2.
$$

化学势下降是因为 $g$ 随能量增长：热激发放入 $E_F$ 上方众多态的电子会比从下方较少态取走的更多，除非 $\mu$ 下降予以补偿。铜在 $300\,\mathrm K$，$T/T_F = 300/81\,700 = 3.67\times10^{-3}$，相对移动为 $-(\pi^2/12)(1.35\times10^{-5}) = -1.1\times10^{-5}$。这就是金属中 $\mu$ 与 $E_F$ 可以混用的原因。
:::
:::

::: exercise 德鲁德模型没有磁阻 {level=3}
用 [[#prop-hall]] 证明中的方程组证明：单载流子德鲁德金属的纵向电阻率 $E_x/j_x$ 与 $B$ 无关。解释为何有两类载流子的金属会显示磁阻。
::: solution
$j_y = 0$ 时，第一个分量方程为 $\sigma E_x = j_x$，所以任意 $B$ 下都有 $E_x/j_x = 1/\sigma$。物理上，霍尔场恰好抵消以漂移速度运动的载流子所受的磁力，它们直线行进，仿佛场不存在。有两类载流子——例如电子和空穴，或两种 $\tau/m$ 不同的电子带——单个霍尔场无法同时抵消两类载流子所受的磁力。每一股都被偏转，横向净电流只是平均为零，每种载流子的横向运动都减小其沿 $x$ 的贡献。于是电阻随 $B$ 增大，低场下典型地按 $B^2$。金属中实测的磁阻因此是其能带结构的直接证据。
:::
:::
