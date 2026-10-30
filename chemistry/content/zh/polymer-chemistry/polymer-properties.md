在橡皮筋上挂一个重物，再用吹风机加热橡皮筋。橡皮筋会*收缩*，把重物举起来。你认识的其他所有固体受热都会膨胀。再看饮料瓶用的透明硬 PET，和同一种 PET 经纺丝拉伸变成的涤纶衣料纤维：化学上一模一样，一个是玻璃状板材，另一个是柔韧结实的细线。把一团"聪明胶"（轻度交联的硅橡胶）扔下去，它像橡胶一样弹跳；放在桌上一夜，它又像液体一样流成一摊。这些行为没有一种能用键能或官能团解释。它们来自长链的*物理*：链如何堆入晶区或堆不进去，链在玻璃化转变之上如何集体运动，缠结的线团如何储存与耗散能量，以及拉伸线团的熵如何产生力。

本章把分子结构与工程师使用的性能联系起来。我们从固态聚合物的两种状态开始：**晶态**（折叠链片晶，熔点由片晶厚度控制）与**非晶态**（$T_\mathrm{g}$ 以下是玻璃，其上是橡胶或熔体）。我们看什么决定 $T_\mathrm{g}$、增塑剂和摩尔质量如何移动它，并由自由体积导出 Williams–Landel–Ferry（WLF）方程。然后处理**黏弹性**——弹簧–黏壶模型与时温等效——**橡胶弹性**——[[polymer-chemistry/polymer-solutions]]的熵弹簧乘以一个网络——**熔体黏度**对摩尔质量的那种非同寻常的依赖，最后是**强度**：聚合物为什么屈服、银纹和断裂，取向如何使纤维的单位质量强度超过钢。

## 晶态与非晶态聚合物

聚合物只有链足够规整、能堆进晶格时才能结晶。线型聚乙烯、等规聚丙烯、尼龙、PET 与 PTFE 都能结晶。无规聚苯乙烯、无规聚甲基丙烯酸甲酯和聚碳酸酯（其庞大、扭结的重复单元极难结晶）不能，它们被当作透明玻璃使用。即使能结晶的聚合物也绝不完全结晶。链相互缠结，来不及脱缠，所以半晶聚合物是晶区与非晶区的复合材料。其**结晶度**从 30–50%（低密度聚乙烯、刚成型的 PET）到 70–90%（高密度聚乙烯、PTFE）不等，用 DSC（[[polymer-chemistry/polymer-characterisation#def-crystallinity]]）、X 射线衍射或密度测定。

晶区是薄的平板，称为**片晶**，厚约 5–25 nm、宽约微米级。链大致垂直于片晶表面排列。一条几微米长、含 $10^{4}$ 个键的链穿过 10 nm 的片晶许多次：或在表面折回，或离开这片晶区、从他处再进入另一片。离开一片晶区、进入另一片晶区的链称为**连接分子**，它们把片晶绑在一起，是半晶聚合物韧性的来源。片晶从熔体中结晶时由晶核向外生长并分叉，形成直径可达毫米的球形**球晶**。球晶散射光，这就是半晶聚合物半透明或不透明、而非晶玻璃透明的原因。

### 为什么薄晶体熔点低

因为片晶很薄，其相当大比例的链单元位于折叠表面，而折叠表面带有超额自由能。这把熔点拉到无限厚晶体的熔点之下。

::: proposition 片晶熔融的 Gibbs–Thomson 方程 {#prop-gibbs-thomson}
厚度为 $\ell$（远小于其横向尺寸）、单位面积折叠表面自由能为 $\sigma_\mathrm{e}$、单位体积晶体熔融焓为 $\Delta h_\mathrm{f}$ 的片晶，其熔点为
$$
T_\mathrm{m} = T_\mathrm{m}^\circ\left(1 - \frac{2\sigma_\mathrm{e}}{\Delta h_\mathrm{f}\,\ell}\right),
$$ {#eq-gibbs-thomson}
其中 $T_\mathrm{m}^\circ$ 是无限厚晶体的**平衡熔融温度**。
:::

::: proof
考虑面积为 $A$、厚度为 $\ell$ 的片晶。相对于熔体，它的 Gibbs 能为
$$
\Delta G = -A\ell\,\Delta g_\mathrm{f} + 2A\sigma_\mathrm{e},
$$
其中 $\Delta g_\mathrm{f}$ 是单位体积的体相熔融自由能（在 $T_\mathrm{m}^\circ$ 以下为正）。侧面被忽略，因为与两个折叠表面相比它们很小。熔融发生在 $\Delta G = 0$ 处，所以 $\Delta g_\mathrm{f} = 2\sigma_\mathrm{e}/\ell$。在 $T_\mathrm{m}^\circ$ 附近，$\Delta g_\mathrm{f} = \Delta h_\mathrm{f} - T\Delta s_\mathrm{f}$，其中 $\Delta s_\mathrm{f} = \Delta h_\mathrm{f}/T_\mathrm{m}^\circ$，于是 $\Delta g_\mathrm{f} \approx \Delta h_\mathrm{f}(T_\mathrm{m}^\circ - T)/T_\mathrm{m}^\circ$，其中把 $\Delta h_\mathrm{f}$ 在这一小区间内视为常数。令它等于 $2\sigma_\mathrm{e}/\ell$ 并对 $T$ 求解：
$$
T_\mathrm{m} = T_\mathrm{m}^\circ - \frac{2\sigma_\mathrm{e}T_\mathrm{m}^\circ}{\Delta h_\mathrm{f}\ell} = T_\mathrm{m}^\circ\left(1 - \frac{2\sigma_\mathrm{e}}{\Delta h_\mathrm{f}\ell}\right). \qquad\blacksquare
$$
:::

片晶厚度由动力学决定。在过冷度小时结晶得厚片晶，淬冷得薄片晶。因此半晶聚合物的熔点取决于它的热历史，宽化的 DSC 吸热峰反映的是宽化的片晶厚度分布。在略低于 $T_\mathrm{m}$ 退火会使片晶增厚、熔点升高。$T_\mathrm{m}$ 对 $1/\ell$ 作图是线性的，其截距给出 $T_\mathrm{m}^\circ$（Hoffman–Weeks 作图法用结晶温度达到同样目的）。

::: example 聚乙烯片晶的熔点 {#ex-lamellae}
聚乙烯取 $T_\mathrm{m}^\circ = 414.6\ \mathrm{K}$、$\sigma_\mathrm{e} = 0.090\ \mathrm{J\,m^{-2}}$、$\Delta h_\mathrm{f} = 2.93\times10^{8}\ \mathrm{J\,m^{-3}}$（$293\ \mathrm{J\,g^{-1}}$ 乘以约 $1.00\ \mathrm{g\,cm^{-3}}$ 的晶体密度）。求厚 $10$ 与 $20\ \mathrm{nm}$ 片晶的熔点，以及横穿 $20\ \mathrm{nm}$ 片晶的 $\mathrm{CH_2}$ 单元数。
::: solution
修正因子是 $2\sigma_\mathrm{e}/(\Delta h_\mathrm{f}\ell)$。

- $\ell = 10\ \mathrm{nm}$：$2(0.090)/[(2.93\times10^{8})(1.0\times10^{-8})] = 0.0614$，所以 $T_\mathrm{m} = 414.6(1 - 0.0614) = 389\ \mathrm{K}$（$116\ ^\circ\mathrm{C}$）。
- $\ell = 20\ \mathrm{nm}$：因子减半为 $0.0307$，所以 $T_\mathrm{m} = 402\ \mathrm{K}$（$129\ ^\circ\mathrm{C}$）。

商品高密度聚乙烯在 $130$–$135\ ^\circ\mathrm{C}$ 熔融，对应 20–30 nm 的片晶。低密度聚乙烯在 $110\ ^\circ\mathrm{C}$ 附近熔融：它的短支链进不了晶区，把片晶限制在 10 nm 以下。全*反*式锯齿形中每个 $\mathrm{CH_2}$ 沿链轴前进 $0.127\ \mathrm{nm}$，所以 $20\ \mathrm{nm}$ 的片晶由约 160 个碳的链段横穿。一条 $10^{4}$ 个主链碳的链可以穿过它约 60 次。
:::
:::

## 玻璃化转变

冷却聚合物熔体，若它不结晶，就会持续变稠。然后，在几开尔文的范围内，它从高弹态或液态变成硬而脆的玻璃。模量上升约一千倍，热膨胀系数与热容下降。这就是**玻璃化转变**，转变温度为 $T_\mathrm{g}$。它不是热力学意义上的相变：没有潜热放出，也没有结构有序出现。它标志的温度是链段的协同运动——涉及可能几十个主链键的重排——慢到跟不上实验的那个温度。$T_\mathrm{g}$ 以下，链被冻结在无序构象中；之上，链在秒级或更短的时间尺度上蠕动。

::: definition 玻璃化转变温度 {#def-tg}
**玻璃化转变温度** $T_\mathrm{g}$ 是非晶聚合物（或半晶聚合物的非晶部分）在链段运动冻结的玻璃态与大尺度链段运动的高弹态或液态之间变化的温度范围。它的判定依据是热容的台阶（DSC）、比容对温度曲线斜率的改变（膨胀计法），或力学损耗的峰（DMA）。因为它是动力学转变，$T_\mathrm{g}$ 取决于测量的时间尺度。冷却速率或频率每增大十倍，$T_\mathrm{g}$ 约升高 $3\ \mathrm{K}$。数值须注明所用方法报告，DSC 通常取 $10$–$20\ \mathrm{K\,min^{-1}}$。
:::

代表性玻璃化转变温度（近似值，取自标准汇编）显示了决定 $T_\mathrm{g}$ 的因素：

| 聚合物 | $T_\mathrm{g}$ / °C | 主导因素 |
|---|---|---|
| 聚二甲基硅氧烷 | $-125$ | 极柔顺的 Si–O–Si 主链 |
| *cis*-1,4-聚异戊二烯（天然橡胶） | $-70$ | 柔性主链、小侧基 |
| 等规聚丙烯（非晶部分） | $-10$ | 甲基侧基 |
| 聚乙酸乙烯酯 | $30$ | 极性酯侧基 |
| 聚对苯二甲酸乙二醇酯（PET） | $75$ | 主链中的刚性芳环 |
| 聚氯乙烯 | $80$ | 极性 C–Cl，偶极吸引 |
| 聚苯乙烯 | $100$ | 庞大的苯基侧基 |
| 聚甲基丙烯酸甲酯 | $105$ | α-甲基加酯基 |
| 双酚 A 聚碳酸酯 | $150$ | 刚性芳环主链 |

主链越刚（链中带芳环）、侧基越庞大或越刚硬而阻碍内旋转、链间极性或氢键作用越强、交联越多，$T_\mathrm{g}$ 越高。主链含柔性连接（–O–、–Si–O–）、侧链长而柔顺（把主链隔开）、聚合物中溶解着小分子，$T_\mathrm{g}$ 降低。那些小分子就是**增塑剂**。邻苯二甲酸酯或己二酸酯把硬的 PVC（$T_\mathrm{g} \approx 80\ ^\circ\mathrm{C}$）变成电缆和地板用的柔性材料。水会增塑尼龙和许多生物聚合物。

两条经验规律量化了摩尔质量与增塑剂的影响。

::: proposition Tg 对摩尔质量与组成的依赖（经验规律） {#prop-fox}
1. **Fox–Flory**：对数均摩尔质量为 $\bar{M}_\mathrm{n}$ 的线型聚合物，
$$
T_\mathrm{g} = T_\mathrm{g}^\infty - \frac{K_\mathrm{g}}{\bar{M}_\mathrm{n}},
$$ {#eq-fox-flory}
$T_\mathrm{g}^\infty$ 是无限长链的极限，$K_\mathrm{g}$ 是常数（聚苯乙烯约 $10^{5}\ \mathrm{K\,g\,mol^{-1}}$）。
2. **Fox 方程**：对质量分数为 $w_1$、$w_2$、玻璃化转变温度为 $T_{\mathrm{g}1}$、$T_{\mathrm{g}2}$（以开尔文计）的组分构成的相容共混物或增塑聚合物，
$$
\frac{1}{T_\mathrm{g}} = \frac{w_1}{T_{\mathrm{g}1}} + \frac{w_2}{T_{\mathrm{g}2}} .
$$ {#eq-fox}
两者都是经验的，可由自由体积论证给出合理解释。
:::

::: proof 自由体积解释
**Fox–Flory。**链端比链中部更活动，带有额外自由体积，设每个端基 $\theta$。单位质量的样品有 $2N_\mathrm{A}/\bar{M}_\mathrm{n}$ 个端基，贡献自由体积 $2N_\mathrm{A}\theta/\bar{M}_\mathrm{n}$。设当单位质量自由体积降到某个固定临界值时玻璃形成，而无限长链的自由体积在 $T_\mathrm{g}^\infty$ 之上按 $\alpha_\mathrm{f}(T - T_\mathrm{g}^\infty)$ 增长，$\alpha_\mathrm{f}$ 是自由体积的膨胀系数。则短链样品在低 $\Delta T$ 的温度达到临界自由体积，其中 $\alpha_\mathrm{f}\Delta T = 2N_\mathrm{A}\theta/\bar{M}_\mathrm{n}$。这就得到 $T_\mathrm{g} = T_\mathrm{g}^\infty - K_\mathrm{g}/\bar{M}_\mathrm{n}$，其中 $K_\mathrm{g} = 2N_\mathrm{A}\theta/\alpha_\mathrm{f}$。出现的是数均，因为这一修正数的是*端基*，也就是链。

**Fox 方程。**若各组分的自由体积按用量相加，且每个组分的自由体积膨胀系数反比于它自己的 $T_\mathrm{g}$（一个经验规律，即 Simha–Boyer 规则 $\Delta\alpha\,T_\mathrm{g} \approx$ 常数），则在共混物的 $T_\mathrm{g}$ 处要求临界自由体积即得 $\sum_iw_i(T_\mathrm{g} - T_{\mathrm{g}i})/T_{\mathrm{g}i} = 0$，重排即得[[#eq-fox]]。这些假定很粗糙，所以结果是经验规则。更灵活的形式如 Gordon–Taylor 方程（含一个拟合常数）能更好地描述数据。$\blacksquare$
:::

### 时温等效与 WLF 方程

在 $T_\mathrm{g}$ 之上，非晶聚合物的每一种松弛过程——无论是链段运动、应力松弛、蠕变还是熔体流动——都以相同的倍数随温度加速。这就是**时温等效**原理。在不同温度测得的数据可以沿对数时间（或频率）轴平移一个**移动因子** $a_T$，合成一条主曲线。在 $T_\mathrm{g}$ 附近，$a_T$ 不服从 Arrhenius 定律。冷却时其表观活化能急剧上升，这正是需要自由体积的协同运动的特征。

::: proposition Williams–Landel–Ferry 方程 {#prop-wlf}
对 $T_\mathrm{g} \le T \lesssim T_\mathrm{g} + 100\ \mathrm{K}$，相对 $T_\mathrm{g}$ 的移动因子为
$$
\log_{10}a_T = \log_{10}\frac{\tau(T)}{\tau(T_\mathrm{g})} = -\frac{C_1(T - T_\mathrm{g})}{C_2 + T - T_\mathrm{g}},
$$ {#eq-wlf}
对许多聚合物 $C_1 \approx 17.4$、$C_2 \approx 52\ \mathrm{K}$（"普适"值 $17.44$ 与 $51.6\ \mathrm{K}$）。这一形式来自 Doolittle 自由体积方程，其中 $T_\mathrm{g}$ 处的自由体积分数 $f_\mathrm{g} \approx 0.025$，在 $T_\mathrm{g}$ 之上以膨胀系数 $\alpha_\mathrm{f} \approx 4.8\times10^{-4}\ \mathrm{K^{-1}}$ 增长。
:::

::: proof
液体黏度的 Doolittle 经验方程，经 Cohen 与 Turnbull 的解释，把松弛时间与自由体积分数 $f$ 联系起来：$\ln\tau = \ln A + B/f$，$B$ 为一量级。$T_\mathrm{g}$ 之上，$f$ 线性增长：$f = f_\mathrm{g} + \alpha_\mathrm{f}(T - T_\mathrm{g})$。于是
$$
\ln\frac{\tau(T)}{\tau(T_\mathrm{g})} = B\left(\frac{1}{f} - \frac{1}{f_\mathrm{g}}\right) = -\frac{B}{f_\mathrm{g}}\cdot\frac{\alpha_\mathrm{f}(T - T_\mathrm{g})}{f_\mathrm{g} + \alpha_\mathrm{f}(T - T_\mathrm{g})} = -\frac{B}{f_\mathrm{g}}\cdot\frac{T - T_\mathrm{g}}{f_\mathrm{g}/\alpha_\mathrm{f} + T - T_\mathrm{g}} .
$$
换成以 10 为底的对数即得[[#eq-wlf]]，其中 $C_1 = B/(2.303f_\mathrm{g})$、$C_2 = f_\mathrm{g}/\alpha_\mathrm{f}$。取 $B = 1$、$f_\mathrm{g} = 0.025$、$\alpha_\mathrm{f} = 4.8\times10^{-4}\ \mathrm{K^{-1}}$，得 $C_1 = 17.4$、$C_2 = 52\ \mathrm{K}$，与普适常数吻合。$\blacksquare$
:::

::: widget plot
f: -c1*x/(c2 + x)
x: 0, 120
y: -16, 0
sliders: c1=17.44:10:25:0.1; c2=51.6:30:100:0.5
labels: \log_{10}a_T\ \text{(WLF)}
points: 10, -2.831; 50, -8.583
caption: WLF 移动因子[[#eq-wlf]]对 $T - T_\mathrm{g}$ 的曲线，$C_1$ 与 $C_2$ 在滑块上（默认值：普适值）。$T_\mathrm{g}$ 之上十开尔文，松弛已比 $T_\mathrm{g}$ 处快约 700 倍。在 $T_\mathrm{g} + 50\ \mathrm{K}$，快 $10^{8.6}$ 倍。曲线在 $T_\mathrm{g}$ 附近很陡，在更高温度变平，不像 Arrhenius 定律那样对 $1/T$ 是一条直线。标记的两点是[[#ex-wlf]]中比较的两个温度。在 $T_\mathrm{g} + 50$ 历时一秒的过程，在 $T_\mathrm{g} + 10$ 要历时数天。抬高 $C_2$（$T_\mathrm{g}$ 处自由体积更多）曲线变缓。
:::

::: example 以 WLF 时钟看物理老化 {#ex-wlf}
某非晶聚合物的一个应力松弛过程在 $T_\mathrm{g} + 50\ \mathrm{K}$ 需要 $1.0\ \mathrm{s}$。用普适 WLF 常数，它在 $T_\mathrm{g} + 10\ \mathrm{K}$ 需要多久？
::: solution
由[[#eq-wlf]]：
$$
\log_{10}a_T(T_\mathrm{g}+50) = -\frac{17.44\times50}{51.6 + 50} = -8.583,
\qquad
\log_{10}a_T(T_\mathrm{g}+10) = -\frac{17.44\times10}{51.6 + 10} = -2.831 .
$$
时间之比为 $10^{-2.831 - (-8.583)} = 10^{5.752} = 5.6\times10^{5}$。该过程在 $T_\mathrm{g} + 10$ 因此需要 $5.6\times10^{5}\ \mathrm{s}$，约 $6.5$ 天。四十开尔文把时间尺度改变近六个数量级。这就是聚合物远在 $T_\mathrm{g}$ 之上加工的原因，也是接近其 $T_\mathrm{g}$ 使用的玻璃态零件会在数月内缓慢蠕变与致密化（"物理老化"）的原因。
:::
:::

## 黏弹性

$T_\mathrm{g}$ 之上的聚合物既不是弹性固体，也不是黏性液体。两者都是，取决于你变形的速度。最简单的描述把弹性**弹簧**（应力 $\sigma = E\varepsilon$，胡克）与黏性**黏壶**（应力 $\sigma = \eta\,\mathrm{d}\varepsilon/\mathrm{d}t$，牛顿）组合起来。

::: definition Maxwell 模型与 Kelvin–Voigt 模型 {#def-maxwell}
- **Maxwell 模型**是弹簧与黏壶**串联**。两者受同一应力，应变相加：$\mathrm{d}\varepsilon/\mathrm{d}t = (1/E)\,\mathrm{d}\sigma/\mathrm{d}t + \sigma/\eta$。它的松弛时间是 $\tau = \eta/E$。应变固定在 $\varepsilon_0$ 时，它按 $\sigma(t) = E\varepsilon_0e^{-t/\tau}$ **松弛**其应力。固定应力下它永远流动。它是黏弹性*液体*的模型。
- **Kelvin–Voigt 模型**是弹簧与黏壶**并联**。两者应变相同，应力相加：$\sigma = E\varepsilon + \eta\,\mathrm{d}\varepsilon/\mathrm{d}t$。恒定应力 $\sigma_0$ 下它按 $\varepsilon(t) = (\sigma_0/E)(1 - e^{-t/\tau})$ **蠕变**趋向 $\sigma_0/E$，卸载后完全回复。它是黏弹性*固体*的模型。

真实聚合物需要一个松弛时间谱。广义 Maxwell 模型（许多 Maxwell 单元并联）给出 $E(t) = \sum_iE_ie^{-t/\tau_i}$。
:::

::: example 两种模型中的应力松弛与蠕变 {#ex-maxwell}
某 $T_\mathrm{g}$ 以上的聚合物用弹簧 $E = 2.0\ \mathrm{MPa}$ 与黏壶 $\eta = 2.0\times10^{5}\ \mathrm{Pa\,s}$ 建模。(a) 作为 Maxwell 单元，它被突然拉伸到应变 $0.10$ 并维持住。求初始应力与 $0.50\ \mathrm{s}$ 后的应力。(b) 作为 Kelvin–Voigt 单元，它从 $t = 0$ 起承受恒定应力 $0.20\ \mathrm{MPa}$。求 $0.10\ \mathrm{s}$ 后的应变与极限应变。
::: solution
两个模型都有 $\tau = \eta/E = 2.0\times10^{5}/2.0\times10^{6} = 0.10\ \mathrm{s}$。

(a) 阶跃之后瞬间黏壶尚未移动，弹簧承担全部应变：$\sigma(0) = E\varepsilon_0 = (2.0\ \mathrm{MPa})(0.10) = 0.20\ \mathrm{MPa}$。$0.50\ \mathrm{s}$ 即五个松弛时间后，$\sigma = 0.20\,e^{-5} = 1.3\times10^{-3}\ \mathrm{MPa}$。随着黏壶流动，99% 以上的应力已经松弛。

(b) $\varepsilon(t) = (\sigma_0/E)(1 - e^{-t/\tau})$。极限是 $\sigma_0/E = 0.10$，在 $t = \tau = 0.10\ \mathrm{s}$ 应变为 $0.10(1 - e^{-1}) = 0.063$。并联的黏壶只是延迟弹性响应，永远不让材料流动。

真实聚合物两者兼具：瞬时弹性应变、延迟弹性应变，以及（除非交联）永久流动。四单元 Burgers 模型（Maxwell 单元与 Kelvin–Voigt 单元串联）是同时展示这三种行为的最简模型。
:::
:::

最好的实验探针是**动态力学分析（DMA）**。施加小振幅正弦应变 $\varepsilon = \varepsilon_0\sin\omega t$，把应力响应分解为与应变同相的部分（**储能模量** $E'$，储存并返回的弹性能）与相差 $90^\circ$ 的部分（**损耗模量** $E''$，作为热耗散的能量）。两者之比是**损耗角正切** $\tan\delta = E''/E'$。对单个 Maxwell 单元，
$$
E'(\omega) = E\frac{\omega^2\tau^2}{1 + \omega^2\tau^2},
\qquad
E''(\omega) = E\frac{\omega\tau}{1 + \omega^2\tau^2} .
$$ {#eq-maxwell-dynamic}
低频（$\omega\tau \ll 1$）下材料有时间流动：$E'$ 很小，响应像液体。高频下它来不及流动：$E' \to E$，响应像固体。损耗在 $\omega\tau = 1$ 处达峰。固定频率的 DMA 升温扫描就是这样定位 $T_\mathrm{g}$ 的：温度穿过 $T_\mathrm{g}$ 时，链段松弛时间正好扫过 $1/\omega$。

::: widget plot
f: 10^(2*x)/(1+10^(2*x)); 10^x/(1+10^(2*x))
x: -3, 3
y: 0, 1.05
labels: E'/E\ \text{（储能）}; E''/E\ \text{（损耗）}
vlines: 0
caption: 单个 Maxwell 单元的储能模量与损耗模量[[#eq-maxwell-dynamic]]，以弹簧模量 $E$ 归一，对 $\log_{10}(\omega\tau)$ 作图。慢变形（左侧）黏壶流动，材料几乎不储能：它是液体。快变形（右侧）黏壶来不及动，材料是弹簧：固体。损耗模量在 $\omega\tau = 1$（竖线）处达峰，峰高 $E/2$，此处每个循环耗散的能量最多。"聪明胶"的 $\tau$ 约一秒。抛掷时它处于右侧，放在桌上一夜则处于最左端。由时温等效，升温把整幅图右移（$\tau$ 变小），所以固定频率下扫温看到的正是这些曲线。
:::

固定时间尺度（比如 $10\ \mathrm{s}$）下模量对温度的曲线概括了非晶聚合物的力学一生。它显示**玻璃态平台**（$E \approx 1$–$3\ \mathrm{GPa}$）、穿过**玻璃化转变区**下降约三个数量级，然后是**橡胶平台**（$E \approx 0.1$–$1\ \mathrm{MPa}$）。橡胶平台的存在是因为链相互缠结：缠结起临时交联点的作用。平台的长度随摩尔质量增长。最后是**流动**，链脱缠。交联橡胶没有流动区，其橡胶平台一直持续到聚合物分解。半晶聚合物把高模量保持到 $T_\mathrm{m}$，因为微晶把非晶区撑在一起。

## 橡胶弹性

橡胶是 $T_\mathrm{g}$ 之上柔性链构成的网络，链在交联点连接（硫化橡胶中的硫桥），于是交联点之间的链可以探索各种构象、而网络不能流动。拉伸橡胶就是拉伸每条网络链。由[[polymer-chemistry/polymer-solutions#eq-entropic-spring]]，每条链都以正比于其伸长量和热力学温度的力反抗。网络把这些力加起来。

::: proposition 橡胶弹性的仿射网络理论 {#prop-rubber}
对单位体积含 $\nu$ 条有效弹性链、每条都是高斯链的理想网络，**仿射**变形（每条链的末端矢量随样品一起缩放）且体积不变时，单轴拉伸比 $\lambda = L/L_0$ 给出公称（工程）应力
$$
\sigma = \nu k_\mathrm{B}T\left(\lambda - \frac{1}{\lambda^2}\right) = \frac{\rho RT}{M_\mathrm{c}}\left(\lambda - \frac{1}{\lambda^2}\right),
$$ {#eq-rubber}
其中 $\rho$ 是密度，$M_\mathrm{c}$ 是交联点之间链的数均摩尔质量。剪切模量为 $G = \nu k_\mathrm{B}T = \rho RT/M_\mathrm{c}$，小应变杨氏模量为 $E = 3G$。
:::

::: proof
末端矢量为 $\mathbf{R} = (x, y, z)$ 的高斯链的熵为 $S = S_0 - (3k_\mathrm{B}/2\langle R^2\rangle_0)(x^2 + y^2 + z^2)$（[[polymer-chemistry/polymer-solutions#eq-entropic-spring]]）。在未变形网络中，设链保持其无扰尺寸，故 $\langle x^2\rangle = \langle y^2\rangle = \langle z^2\rangle = \langle R^2\rangle_0/3$。主拉伸比为 $\lambda_x, \lambda_y, \lambda_z$ 的变形把 $x \to \lambda_xx$，其余类推（仿射假定）。对链平均，每条链的熵变为
$$
\Delta S = -\frac{3k_\mathrm{B}}{2\langle R^2\rangle_0}\cdot\frac{\langle R^2\rangle_0}{3}\left(\lambda_x^2 + \lambda_y^2 + \lambda_z^2 - 3\right) = -\frac{k_\mathrm{B}}{2}\left(\lambda_x^2 + \lambda_y^2 + \lambda_z^2 - 3\right).
$$
体积不变的单轴拉伸下，$\lambda_x = \lambda$、$\lambda_y = \lambda_z = \lambda^{-1/2}$（故 $\lambda_x\lambda_y\lambda_z = 1$）。理想橡胶的内能不变，所以单位体积的变形功为 $W = -T\nu\Delta S = \tfrac12\nu k_\mathrm{B}T(\lambda^2 + 2/\lambda - 3)$。公称应力是 $W$ 对 $\lambda$ 的导数（单位未变形面积的力，因为 $\mathrm{d}L = L_0\,\mathrm{d}\lambda$）：
$$
\sigma = \frac{\mathrm{d}W}{\mathrm{d}\lambda} = \nu k_\mathrm{B}T\left(\lambda - \frac{1}{\lambda^2}\right).
$$
单位体积的链数 $\nu = \rho N_\mathrm{A}/M_\mathrm{c}$，故 $\nu k_\mathrm{B}T = \rho RT/M_\mathrm{c}$。小应变下 $\lambda = 1 + \varepsilon$，$\lambda - \lambda^{-2} \approx 3\varepsilon$，所以 $E = 3\nu k_\mathrm{B}T$，即不可压缩固体的 $3G$。$\blacksquare$
:::

由此得出三条预言，每一条都被观测到。**模量极小。**对典型的几千的 $M_\mathrm{c}$，$G$ 约 $0.5\ \mathrm{MPa}$，而玻璃是 $1\ \mathrm{GPa}$、钢是 $80\ \mathrm{GPa}$。回复力来自熵，不来自键的拉伸。**模量正比于热力学温度。**拉伸后固定长度的橡胶受热拉力变大，固定载荷下的橡胶受热收缩。这就是本章开头提到的 **Gough–Joule 效应**，熵弹性的标志。**模量度量交联密度**，这给出一种测量 $M_\mathrm{c}$ 的办法，或者用力学方法，或者用溶剂中的平衡溶胀（Flory–Rehner 理论，它把[[#eq-rubber]]与 Flory–Huggins 自由能结合起来）。真实橡胶在中等伸长下偏离[[#eq-rubber]]（Mooney–Rivlin 修正），在大伸长下急剧变硬，因为链接近完全伸展或在应变下结晶。应变诱导结晶正是天然橡胶如此坚韧的原因。

::: example 一根天然橡胶橡皮筋 {#ex-rubber}
硫化天然橡胶（$\rho = 0.91\ \mathrm{g\,cm^{-3}}$）交联点之间 $M_\mathrm{c} = 5.0\times10^{3}\ \mathrm{g\,mol^{-1}}$。在 $25\ ^\circ\mathrm{C}$ 求其剪切模量、拉伸比为 2 时的公称应力，以及把横截面 $2.0\ \mathrm{mm}\times1.0\ \mathrm{mm}$ 的橡皮筋维持在该伸长所需的力。若在长度不变下把它加热到 $75\ ^\circ\mathrm{C}$，力改变多少倍？
::: solution
$$
G = \frac{\rho RT}{M_\mathrm{c}} = \frac{(910\ \mathrm{kg\,m^{-3}})(8.314\ \mathrm{J\,K^{-1}\,mol^{-1}})(298.15\ \mathrm{K})}{5.0\ \mathrm{kg\,mol^{-1}}} = 4.5\times10^{5}\ \mathrm{Pa} = 0.45\ \mathrm{MPa} .
$$
$\lambda = 2$ 时：$\sigma = G(2 - 0.25) = 0.79\ \mathrm{MPa}$。在未变形横截面 $2.0\times10^{-6}\ \mathrm{m^2}$ 上，力为 $(7.9\times10^{5})(2.0\times10^{-6}) = 1.6\ \mathrm{N}$，约等于 160 g 的重量。长度不变加热到 $348.15\ \mathrm{K}$，力乘以 $348.15/298.15 = 1.17$。橡皮筋热的时候拉力大 17%。（热膨胀在极小伸长时略有抵消，造成约 10% 应变以下的"热弹反转"。）
:::
:::

## 熔体黏度与缠结

聚合物熔体的零切黏度对摩尔质量的依赖分两个区。低于**临界摩尔质量** $M_\mathrm{c}'$（约两倍缠结摩尔质量 $M_\mathrm{e}$，典型为 $10^{4}$–$4\times10^{4}$）时，$\eta_0 \propto M$。每条链像黏液中的珠串一样被拖过它的邻居（Rouse 模型）。高于 $M_\mathrm{c}'$，
$$
\eta_0 \propto M_\mathrm{w}^{3.4},
$$ {#eq-melt}
这一指数在各种聚合物间如此一致，几乎普适。高于 $M_\mathrm{c}'$ 时链相互缠结。de Gennes（1971）与其后的 Doi 与 Edwards 用**蠕动**（reptation）解释了这一点：缠结的链被限制在由邻居构成的管内，只能沿自身长度滑动逃逸，像一条蛇。逃逸时间按 $M^3$ 增长，黏度随之。管长的涨落使指数接近实验观测的 3.4。

实际后果是一种权衡。力学强度与韧性随摩尔质量上升，可加工性却急剧下降。$M_\mathrm{w}$ 翻倍使熔体黏度升高 $2^{3.4} = 10.6$ 倍。注塑用聚合物因此取能给出可接受性能的最低摩尔质量。超高摩尔质量聚乙烯（$M \sim 5\times10^{6}$）黏到无法常规熔融加工，只能烧结或凝胶纺丝。熔体还是**剪切变稀**的：高剪切速率下链脱缠并取向，黏度下降几个数量级。没有这一点，挤出根本不可能。剪切变稀可由[[#eq-maxwell-dynamic]]对松弛时间谱的频率依赖来描述。

::: warning Tg 不是熔点，聚合物也不会在 Tg 处"熔化" {#warn-tg}
学生常把 $T_\mathrm{g}$ 当作低温熔点。两者性质不同。**熔融**（$T_\mathrm{m}$）是*晶区*的一级相变，有潜热、有平衡温度 $T_\mathrm{m}^\circ$、依赖片晶厚度。**玻璃化转变**是*非晶区*链段运动的动力学冻结，热容出现台阶、没有潜热，数值随测量时间尺度移动。非晶聚合物（无规 PS、PMMA、PC）只有 $T_\mathrm{g}$、没有 $T_\mathrm{m}$。半晶聚合物两者都有，作为粗略经验规律，以开尔文计 $T_\mathrm{g} \approx (0.5$–$0.7)\,T_\mathrm{m}$。$T_\mathrm{g}$ 之上非晶聚合物先是*橡胶*（若有缠结或交联）然后才是液体。它的黏度连续下降，不存在某个它"变成液体"的温度。报告 $T_\mathrm{g}$ 必须注明方法与速率；也不要把它用作半晶聚合物的最高使用温度：高密度聚乙烯在日常使用中处于其 $T_\mathrm{g}$ 之上 140 K，因为它的微晶把它撑在一起。
:::

## 强度、屈服与取向

拉伸载荷下，聚合物显示四种大致类型（典型近似值）：

| 类型 | 实例 | 杨氏模量 | 强度 | 断裂伸长率 |
|---|---|---|---|---|
| 脆性玻璃 | 聚苯乙烯 | $\sim 3\ \mathrm{GPa}$ | $\sim 40\ \mathrm{MPa}$ | $\sim 2\%$ |
| 韧性玻璃 | 聚碳酸酯 | $\sim 2.3\ \mathrm{GPa}$ | $\sim 65\ \mathrm{MPa}$ | $\sim 100\%$ |
| 半晶 | 高密度聚乙烯 | $\sim 1\ \mathrm{GPa}$ | $\sim 30\ \mathrm{MPa}$ | 数百 % |
| 弹性体 | 硫化橡胶 | $\sim 1$–$3\ \mathrm{MPa}$ | $\sim 20\ \mathrm{MPa}$ | $\sim 500\%$ |

聚苯乙烯这样的脆性玻璃以**银纹**失效：形成薄的、似裂纹的区域，由高度拉伸的聚合物微纤桥接，微纤最终断裂。韧性聚合物**屈服**。细颈形成并沿试样扩展（**冷拉伸**），颈内链沿拉伸方向高度取向。韧性需要链足够长、能缠结并跨越银纹。低于最小摩尔质量（约 $2M_\mathrm{e}$）玻璃态聚合物几乎没有强度，之上强度大致按 $\sigma_\infty - A/\bar{M}_\mathrm{n}$ 上升，趋近平台。短链是缺陷。高抗冲聚苯乙烯与 ABS（[[polymer-chemistry/copolymerisation]]）中的橡胶粒子通过引发许多吸能的小银纹、而不是一条灾难性裂纹，来增韧脆性玻璃。

**取向**是通向强度的道路。沿轴向加载的共价 C–C 链极强极刚。全*反*式聚乙烯链的理论模量约 $250$–$300\ \mathrm{GPa}$。各向同性聚合物几乎用不上这一点，因为它的载荷由链间微弱的范德华接触承担。拉伸使链取向。**凝胶纺丝超高摩尔质量聚乙烯**纤维（Dyneema、Spectra）经拉伸使链几乎完全伸展并取向，模量超过 $100\ \mathrm{GPa}$、拉伸强度约 $3\ \mathrm{GPa}$，密度又小于水，单位质量强度约为钢的十倍。**芳纶**纤维（Kevlar）靠刚性的、纺丝时自发取向的液晶链达到相近的强度。聚乙烯袋与系船用聚乙烯绳之间的区别不在化学，而在摩尔质量与取向。

::: quiz
一根硫化橡皮筋被拉伸到两倍长度并夹紧，然后从 $20\ ^\circ\mathrm{C}$ 加热到 $80\ ^\circ\mathrm{C}$（远高于其 $T_\mathrm{g}$，低于任何降解温度）。按理想橡胶弹性，张力如何变化？
- [ ] 下降，因为橡胶受热像其他固体一样变软。
- [x] 上升约 20%，因为熵网络的应力正比于热力学温度。
- [ ] 不变，因为拉伸比固定。
- [ ] 上升四倍，因为摄氏温度变为四倍。
::: solution
由[[#prop-rubber]]，固定 $\lambda$ 下应力正比于热力学温度：$353/293 = 1.20$，上升 20%。受热使链的热运动更剧烈，链朝熵更高的卷曲状态拉得更紧。能量型固体受热变软，熵网络受热变硬。摄氏温度的比值毫无意义，因为进入 $k_\mathrm{B}T$ 的只有热力学温度。
:::
:::

::: history
Gough（John Gough）1805 年报告了拉伸天然橡胶条拉伸时发热、受热时收缩，Joule（James Joule）1859 年定量测量了这一效应。Goodyear（Charles Goodyear）1839 年通过加热橡胶与硫发现了硫化（1844 年获得专利），把一种发黏、对温度敏感的胶状物变成耐久的弹性体。Kuhn（Werner Kuhn，1936）与 Guth（Eugene Guth）、James（Hubert James，1940 年代）发展了橡胶弹性的统计理论，Treloar（Leslie Treloar）的实验与专著（*The Physics of Rubber Elasticity*，1949）对它作了详尽检验。Fox（Thomas Fox）与 Flory（Paul Flory）1950 年描述了 $T_\mathrm{g}$ 的摩尔质量依赖。Williams（Malcolm Williams）、Landel（Robert Landel）与 Ferry（John Ferry）1955 年发表了 WLF 方程（*Journal of the American Chemical Society* 77, 3701）。Keller（Andrew Keller）1957 年证明从溶液中生长的聚乙烯单晶是折叠链的薄晶片（*Philosophical Magazine* 2, 1171）。de Gennes（Pierre-Gilles de Gennes）1971 年提出蠕动图像，Doi（Masao Doi）与 Edwards（Sam Edwards）自 1978 年起把它建成熔体流变学理论。凝胶纺丝聚乙烯纤维由荷兰 DSM 公司的 Smith（Paul Smith）与 Lemstra（Piet Lemstra）在 1970 年代末开发。
:::

## 后续内容

这里的热转变由 DSC 与 DMA 测量（[[polymer-chemistry/polymer-characterisation]]）。[[#prop-rubber]]的网络物理在[[polymer-chemistry/functional-polymers]]的水凝胶与形状记忆聚合物中得到延续，那里 $T_\mathrm{g}$ 与橡胶平台被用作开关。熵弹性背后的链统计在[[polymer-chemistry/polymer-solutions]]中发展，其交联密度决定模量的逐步增长网络在[[polymer-chemistry/step-growth]]中制备。晶体结构与聚合物晶体的衍射连接[[materials-chemistry/crystal-structures]]。材料力学（应力、应变、模量）在 Physics Atlas（[/learn/physics/](/learn/physics/)）中讲述。

::: summary
- 规整链结晶成折叠链片晶（5–25 nm），组装成球晶。它们总是半晶的，韧性来自连接分子。Gibbs–Thomson 方程 $T_\mathrm{m} = T_\mathrm{m}^\circ(1 - 2\sigma_\mathrm{e}/\Delta h_\mathrm{f}\ell)$ 把熔点与片晶厚度联系起来。
- 玻璃化转变是链段运动的动力学冻结。刚性主链、庞大或极性基团、交联抬高它；柔性连接与增塑剂压低它。Fox–Flory（$T_\mathrm{g} = T_\mathrm{g}^\infty - K/\bar{M}_\mathrm{n}$）与 Fox（$1/T_\mathrm{g} = \sum w_i/T_{\mathrm{g}i}$）是经验规律。
- $T_\mathrm{g}$ 之上所有松弛一起移动（时温等效），服从由自由体积导出的 WLF 方程 $\log a_T = -C_1(T-T_\mathrm{g})/(C_2 + T - T_\mathrm{g})$。
- 黏弹性：Maxwell（串联、应力松弛、液体）与 Kelvin–Voigt（并联、蠕变、固体）。振荡下的 $E'$ 与 $E''$，损耗峰在 $\omega\tau = 1$。模量–温度曲线走过玻璃态 → 转变区 → 橡胶平台 → 流动。
- 橡胶弹性是熵性的：$\sigma = (\rho RT/M_\mathrm{c})(\lambda - \lambda^{-2})$，模量约 1 MPa，正比于 $T$（Gough–Joule）与交联密度。
- 熔体黏度在缠结阈值以下按 $M$、以上按 $M_\mathrm{w}^{3.4}$ 标度（蠕动），这决定了强度与加工性的权衡。熔体剪切变稀。
- 聚合物以银纹断裂或以冷拉伸屈服。强度需要缠结，取向（凝胶纺丝 UHMWPE、芳纶）把共价链的强度变成纤维的强度。
:::

## 习题

::: exercise 橡胶的模量 {level=1 check="0.237"}
某橡胶网络 $M_\mathrm{c} = 1.0\times10^{4}\ \mathrm{g\,mol^{-1}}$，密度 $0.95\ \mathrm{g\,cm^{-3}}$。它在 $300\ \mathrm{K}$ 的剪切模量是多少？（以 MPa 输入 $G$，保留三位有效数字。）
::: solution
$G = \rho RT/M_\mathrm{c} = (950)(8.314)(300)/(10.0) = 2.37\times10^{5}\ \mathrm{Pa} = 0.237\ \mathrm{MPa}$。$M_\mathrm{c}$ 减半（交联密度加倍）则模量加倍。
:::
:::

::: exercise 增塑 PVC {level=1 check="280"}
PVC（$T_\mathrm{g} = 354\ \mathrm{K}$）与 30% 质量的邻苯二甲酸酯增塑剂（$T_\mathrm{g} = 188\ \mathrm{K}$）混合。用 Fox 方程估计混合物的 $T_\mathrm{g}$。（以 K 输入 $T_\mathrm{g}$，保留三位有效数字。）
::: solution
$1/T_\mathrm{g} = 0.70/354 + 0.30/188 = 1.977\times10^{-3} + 1.596\times10^{-3} = 3.573\times10^{-3}\ \mathrm{K^{-1}}$，所以 $T_\mathrm{g} = 280\ \mathrm{K}$（$7\ ^\circ\mathrm{C}$）。室温下增塑 PVC 处于其 $T_\mathrm{g}$ 之上，因此是柔性的，这正是增塑的目的。
:::
:::

::: exercise 挤出机里更长的链 {level=1 check="3.97"}
在缠结区，$M_\mathrm{w}$ 增大 50% 时零切熔体黏度上升多少倍？（倍数保留三位有效数字。）
::: solution
$\eta_0 \propto M_\mathrm{w}^{3.4}$，所以倍数为 $1.5^{3.4} = e^{3.4\ln1.5} = e^{1.379} = 3.97$。链长长一半，挤出机头就难推四倍。
:::
:::

::: exercise 由熔点求片晶厚度 {level=2 check="22.2"}
某聚乙烯样品在 $130.0\ ^\circ\mathrm{C}$ 熔融。利用[[#ex-lamellae]]的数据，估计片晶厚度。（以 nm 输入 $\ell$，保留三位有效数字。）
::: solution
重排[[#eq-gibbs-thomson]]：$\ell = 2\sigma_\mathrm{e}T_\mathrm{m}^\circ/[\Delta h_\mathrm{f}(T_\mathrm{m}^\circ - T_\mathrm{m})]$。取 $T_\mathrm{m} = 403.15\ \mathrm{K}$，$T_\mathrm{m}^\circ - T_\mathrm{m} = 11.45\ \mathrm{K}$，所以 $\ell = 2(0.090)(414.6)/[(2.93\times10^{8})(11.45)] = 2.22\times10^{-8}\ \mathrm{m} = 22.2\ \mathrm{nm}$。
:::
:::

::: exercise 让松弛加速 {level=2 check="0.0134"}
某非晶聚合物的一个松弛过程在 $T_\mathrm{g}$ 的松弛时间为 $1.0\times10^{3}\ \mathrm{s}$。用普适 WLF 常数，它在 $T_\mathrm{g} + 20\ \mathrm{K}$ 的松弛时间是多少？（以 s 输入 $\tau$，保留三位有效数字。）
::: solution
$\log_{10}a_T = -17.44\times20/(51.6 + 20) = -4.872$，所以 $\tau = 1.0\times10^{3}\times10^{-4.872} = 1.34\times10^{-2}\ \mathrm{s}$。二十开尔文把一个过程从一刻钟缩短到百分之一秒。
:::
:::

::: exercise 低摩尔质量聚苯乙烯的 Tg {level=2 check="353"}
用 Fox–Flory 方程，取 $T_\mathrm{g}^\infty = 373\ \mathrm{K}$、$K_\mathrm{g} = 1.0\times10^{5}\ \mathrm{K\,g\,mol^{-1}}$，求 $\bar{M}_\mathrm{n} = 5.0\times10^{3}\ \mathrm{g\,mol^{-1}}$ 的聚苯乙烯的 $T_\mathrm{g}$。（以 K 输入 $T_\mathrm{g}$。）
::: solution
$T_\mathrm{g} = 373 - 1.0\times10^{5}/5000 = 373 - 20 = 353\ \mathrm{K}$。$\bar{M}_\mathrm{n} = 10^{5}$ 时修正只有 1 K，所以商品聚苯乙烯的 $T_\mathrm{g}$ 都接近 $100\ ^\circ\mathrm{C}$。
:::
:::

::: exercise 理想橡胶的应力–应变 {level=3 check="1.30"}
(a) 由高斯链的熵推导[[#eq-rubber]]，说明仿射与体积不变的假定。(b) 对 $G = 0.45\ \mathrm{MPa}$ 的橡胶，求 $\lambda = 3$ 时的公称应力。(c) 为什么真实橡胶在中等 $\lambda$ 低于这一预言、在 $\lambda = 6$ 附近又远高于它？（以 MPa 输入 (b) 的应力，保留三位有效数字。）
::: solution
(a) 如[[#prop-rubber]]证明中所述：每条网链的 $\Delta S = -\tfrac12k_\mathrm{B}(\lambda_x^2 + \lambda_y^2 + \lambda_z^2 - 3)$，其中 $\lambda_y = \lambda_z = \lambda^{-1/2}$，$W = -T\nu\Delta S$，$\sigma = \mathrm{d}W/\mathrm{d}\lambda = \nu k_\mathrm{B}T(\lambda - \lambda^{-2})$。

(b) $\sigma = 0.45(3 - 1/9) = 0.45\times2.889 = 1.30\ \mathrm{MPa}$。

(c) 中等伸长下，交联点会涨落、不再仿射移动，使响应变软（Mooney–Rivlin 的 $C_2$ 项）。$\lambda \approx 6$ 附近，链接近其完全伸展轮廓长度，高斯近似失效、力急剧上升（Langevin 链统计）。天然橡胶还会应变结晶，进一步增强它。所以应力–应变曲线在断裂前上翘。
:::
:::

::: exercise 损耗峰在哪里？ {level=3 check="15.9"}
对单个 Maxwell 单元，由[[#eq-maxwell-dynamic]]证明损耗模量在 $\omega\tau = 1$ 处取极大、峰高 $E/2$。某橡胶态聚合物用 $E = 1.0\ \mathrm{MPa}$、$\eta = 1.0\times10^{4}\ \mathrm{Pa\,s}$ 的 Maxwell 单元建模。DMA 实验在什么振荡频率（以赫兹计）看到损耗峰？（以 Hz 输入 $\nu$，保留三位有效数字。）
::: solution
令 $u = \omega\tau$。则 $E''/E = u/(1+u^2)$，$\mathrm{d}/\mathrm{d}u = (1 + u^2 - 2u^2)/(1+u^2)^2 = (1 - u^2)/(1+u^2)^2$，在 $u = 1$ 处为零。此处 $E''/E = 1/2$。松弛时间为 $\tau = \eta/E = 1.0\times10^{4}/1.0\times10^{6} = 1.0\times10^{-2}\ \mathrm{s}$，所以峰在 $\omega = 1/\tau = 100\ \mathrm{rad\,s^{-1}}$，即 $\nu = \omega/2\pi = 15.9\ \mathrm{Hz}$。由时温等效，加热样品缩短 $\tau$、把峰推向更高频率。固定频率下扫温使 $\tau$ 扫过 $1/\omega$，这正是 DMA 定位 $T_\mathrm{g}$ 的方式。
:::
:::
