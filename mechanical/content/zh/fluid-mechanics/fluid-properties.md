流体力学发生在你不再要求物体是**刚体**的那一刻。固体在静止状态下能够承受切应力，流体不能；整个学科——压强场、船舶的阻力、阀门的噪声、轴承中的油膜、香烟烟柱在四十厘米高度转为湍流的原因——都由这一个“不能”加上[[statics]]与[[dynamics]]中的守恒律推出。

因此在任何方程之前的一课，是关于**数值及其范围**的一课。工程师真正要输送的各种流体的密度、黏度、表面张力和压缩性跨越若干个数量级，而由它们构造的无量纲数决定了运动方程中哪些项可以扔掉。流体力学的一半是知道哪些项是小量；本课提供使“小”成为一个数的这些物理量。

::: warning 能逃过验收试验的七种物性错误
**该用运动黏度的地方用了动力黏度。**雷诺数是$\rho V L / \mu = V L / \nu$，把速度除以**动力**黏度的计算得到的是$\mathrm{s / m^{2}}$的单位，而且换一个流体答案就变。**空气和水的动力黏度相差在五十倍以内，运动黏度相差在十五倍以内**，所以这两种错误朝相反方向给出不同的答案。**因为液体的黏度随温度下降就假定黏度都随温度下降。**气体恰恰相反，$T^{0.7}$的依赖很强：$200\ {}^{\circ}\mathrm{C}$的空气的黏度是$20\ {}^{\circ}\mathrm{C}$时的**$1.4$倍**。用冷态黏度做的轴承或涡轮叶栅计算，雷诺数错约$40\ \%$，摩擦系数随之错$- 1 / 4$次幂。**把瞬变过程中的水当作不可压缩。**水的体积弹性模量是$2.2\ \mathrm{GPa}$，对液体而言这很大，但是**有限**：受限水管中压力波的波速是$1{,}400$到$1{,}480\ \mathrm{m / s}$，在$300\ \mathrm{m}$长的管道上$0.1\ \mathrm{s}$内关阀按茹科夫斯基（Joukowsky）判据是**快**关闭。定常流的水不可压缩；刚关阀的管中的水是一根$1{,}480\ \mathrm{m / s}$的声柱。**把无滑移条件当成可以放宽的边界条件。**无滑移是**流体与壁面界面的实验观测性质**，在普通压强下对一切普通液体和气体都成立。它只在克努森数（Knudsen）超过$10^{- 3}$时失效——常压下$1\ \mu\mathrm{m}$的间隙，或真空室里的任何东西——无滑移计算在$10\ \mathrm{mm}$管中准确到约$0.001\ \%$，但对$1\ \mu\mathrm{m}$通道的流量会低估约$40\ \%$。**在错误的温度下读饱和蒸气压。**水在$20\ {}^{\circ}\mathrm{C}$的饱和蒸气压是$2.34\ \mathrm{kPa}$，在$90\ {}^{\circ}\mathrm{C}$是$70.1\ \mathrm{kPa}$——相差**三十**倍。用冷态数值算热凝结水的泵有效汽蚀余量，会把余量高估**$7.2\ \mathrm{m}$**，泵在第一周就发生汽蚀。**假定流体的黏度是一个数。**油漆、钻井泥浆、血样、聚合物熔体和巧克力浆在两个数量级的黏度范围内是**剪切变稀**的；玉米粉悬浮液是**剪切增稠**的；湿黏土和牙膏有**屈服应力**。一台黏度计在一个转速下的读数是数据点而不是物性，用它选泵可以错十倍。**把表面张力忘到它成了全部问题。**表面张力对$1\ \mathrm{m}$的驳船可以忽略，对$1\ \mathrm{mm}$的喷嘴、燃油喷射器的喷雾、微流控芯片和湿壁塔却是主导的。邦德数（Bond）$\rho g L^{2} / \sigma$在**水的$2.7\ \mathrm{mm}$**特征长度处越过 1，凡最小特征尺寸小于该长度的设计，都是穿着压力驱动外衣的表面张力设计。
:::

## 密度、压强与连续介质

::: definition 密度、重度与压强场 {#def-density}
$$
\rho = \frac{m}{V} \ \ \left[ \mathrm{kg / m^{3}} \right], \qquad
\gamma = \rho g \ \ \left[ \mathrm{N / m^{3}} \right], \qquad
v = \frac{1}{\rho} \ \ \left[ \mathrm{m^{3} / kg} \right], \qquad
\mathrm{SG} = \frac{\rho}{\rho_{\mathrm{water}, 4\ {}^{\circ}\mathrm{C}}}
$$
**以下参考密度对应$20\ {}^{\circ}\mathrm{C}$、$101.325\ \mathrm{kPa}$。**
$$
\begin{array}{l c c l c c}
\text{物质} & \rho\ (\mathrm{kg / m^{3}}) & \mathrm{SG} & & \text{物质} & \rho & \mathrm{SG} \\
\text{空气} & 1.204 & 0.0012 & & \text{乙醇} & 789 & 0.789 \\
\text{氦气} & 0.166 & 0.00017 & & \text{SAE 30 油} & 891 & 0.891 \\
\text{二氧化碳} & 1.831 & 0.0018 & & \text{水银} & 13{,}546 & 13.55 \\
\text{水，} 4\ {}^{\circ}\mathrm{C} & 1{,}000.0 & 1.0000 & & \text{甘油} & 1{,}261 & 1.261 \\
\text{水，} 20\ {}^{\circ}\mathrm{C} & 998.2 & 0.9982 & & \text{海水，} 35\ \mathrm{g / kg} & 1{,}025 & 1.025 \\
\text{水，} 100\ {}^{\circ}\mathrm{C} & 958.4 & 0.9584 & & \text{液氮，} - 196\ {}^{\circ}\mathrm{C} & 807 & 0.807 \\
\text{冰，} 0\ {}^{\circ}\mathrm{C} & 916.7 & 0.917 & & \text{镓（液态）} & 6{,}095 & 6.10
\end{array}
$$
**让船浮起也让管子爆裂的那个数。**水在**$3.98\ {}^{\circ}\mathrm{C}$最密**，低于该温度冷却时膨胀，所以冰浮在淡水上时约有$8\ \%$的体积露出水面，湖泊从上往下结冰。**同一个反常现象，在冬天留在室外的一根充满水并封死的管子里，会产生劈开铜接头的$200\ \mathrm{MPa}$**——结冰时膨胀$9\ \%$，而水的体积弹性模量是$2.2\ \mathrm{GPa}$，所以$9\ \%$的约束就是$200\ \mathrm{MPa}$，是退火铜屈服强度的八倍。
**压强是标量，应力不是。**在**静止**流体内一点处，任意截面上的正应力都相同——这就是帕斯卡（Pascal）定律的全部内容，它是没有切应力的必然结果：
$$
\sum M_{\text{对一点的矩，作用在流体微元上}} \ \Rightarrow \ p_x = p_y = p_z = p
$$
**绝对压强、表压与真空度的约定。**
$$
p_{\mathrm{abs}} = p_{\mathrm{atm}} + p_{\mathrm{gauge}}, \qquad
p_{\mathrm{vac}} = p_{\mathrm{atm}} - p_{\mathrm{abs}}
$$
**比任何其他错误毁掉更多测压管的那个数。**波登管压力计读**表压**；气压计读**绝对压强**；麦克劳德（McLeod）计或皮拉尼（Pirani）真空计读**绝对压强**；而凝汽器上$- 0.09\ \mathrm{MPa}$的表压读数对应$0.011\ \mathrm{MPa}$绝对压强，此时水的饱和温度是$48\ {}^{\circ}\mathrm{C}$而不是$100\ {}^{\circ}\mathrm{C}$。
:::

::: definition 连续介质与克努森数 {#def-continuum}
**连续介质假设。**当对物性作平均的体积**远大于分子平均自由程的三次方**、同时又**远小于工程特征长度**时，流体就当作质点连续介质处理。形式判据是**克努森数（Knudsen）**
$$
\mathrm{Kn} = \frac{\lambda}{L}, \qquad
\lambda = \frac{k_B T}{\sqrt{2}\, \pi \sigma_m^{2} p} = \frac{\mu}{p} \sqrt{\frac{\pi R T}{2}}
$$
$$
\begin{array}{l c l}
\mathrm{Kn} < 10^{- 3} & \text{连续介质，无滑移} & \text{带 } u_{\mathrm{wall}} = 0 \text{ 的纳维-斯托克斯方程} \\
10^{- 3} < \mathrm{Kn} < 0.1 & \text{滑移流} & \text{带一阶滑移条件的纳维-斯托克斯方程} \\
0.1 < \mathrm{Kn} < 10 & \text{过渡区} & \text{玻尔兹曼方程或直接模拟蒙特卡洛法} \\
\mathrm{Kn} > 10 & \text{自由分子流} & \text{只与壁面碰撞}
\end{array}
$$
**对空气的估算。**在$20\ {}^{\circ}\mathrm{C}$、$101.325\ \mathrm{kPa}$下，平均自由程为
$$
\lambda = \frac{1.815 \times 10^{- 5}}{101{,}325} \sqrt{\frac{\pi \times 287.05 \times 293.15}{2}}
= 1.791 \times 10^{- 10} \times 363.6 = 6.51 \times 10^{- 8}\ \mathrm{m} = 65\ \mathrm{nm}
$$
**由此决定的长度尺度。**
$$
\begin{array}{l c c}
L & \mathrm{Kn} & \text{流区} \\
1\ \mathrm{m} & 6.5 \times 10^{- 8} & \text{连续介质} \\
1\ \mathrm{mm} & 6.5 \times 10^{- 5} & \text{连续介质} \\
100\ \mu\mathrm{m} & 6.5 \times 10^{- 4} & \text{连续介质，临界} \\
10\ \mu\mathrm{m} & 0.0065 & \text{滑移} \\
1\ \mu\mathrm{m} & 0.065 & \text{滑移} \\
100\ \mathrm{nm} & 0.65 & \text{过渡} \\
1\ \mathrm{mm}\ \text{在}\ 10^{- 3}\ \mathrm{kPa}\ \left( \text{真空室} \right) & 6.6 & \text{过渡}
\end{array}
$$
**决定硬盘磁头$12\ \mathrm{nm}$飞行高度是不是普通流体力学问题的那个数。**不是——那里$\mathrm{Kn} = 65 / 12 = 5.4$，处于过渡区，雷诺润滑方程必须换成由玻尔兹曼（Boltzmann）方程导出的稀薄气体形式。**同样的算术（$\mathrm{Kn} = 1.3$）说明，空气中$50\ \mathrm{nm}$的 MEMS 间隙里的空气不是连续介质。**
**密度的校核。**连续介质还要求平均体积内有足够多的分子：在$101\ \mathrm{kPa}$、$293\ \mathrm{K}$下，$1\ \mu\mathrm{m}^{3}$的空气含有
$$
n = \frac{p V}{k_B T} = \frac{101{,}325 \times 10^{- 18}}{1.381 \times 10^{- 23} \times 293.15} = 2.5 \times 10^{7}\ \text{个分子}
$$
这绰绰有余；在$10^{- 3}\ \mathrm{kPa}$下只有$2.5 \times 10^{2}$个，对其作平均得到的“密度”只是统计噪声。
:::

::: definition 压缩性与体积弹性模量 {#def-bulk}
$$
E_v = - V \frac{d p}{d V} = \rho \frac{d p}{d \rho} \quad \left[ \mathrm{Pa} \right], \qquad
\beta = \frac{1}{E_v} \quad \left[ \mathrm{Pa^{- 1}} \right], \qquad
c = \sqrt{\frac{E_v}{\rho}}
$$
**体积弹性模量及其对应的声速。**
$$
\begin{array}{l c c c}
\text{流体} & E_v\ (\mathrm{GPa}) & \beta\ (10^{- 12}\ \mathrm{Pa^{- 1}}) & c\ (\mathrm{m / s}) \\
\text{水，} 20\ {}^{\circ}\mathrm{C} & 2.18 & 458 & 1{,}481 \\
\text{水，} 80\ {}^{\circ}\mathrm{C} & 2.35 & 426 & 1{,}555 \\
\text{海水，} 20\ {}^{\circ}\mathrm{C} & 2.34 & 427 & 1{,}512 \\
\text{水银} & 28.5 & 35 & 1{,}451 \\
\text{SAE 30 油，} 20\ {}^{\circ}\mathrm{C} & 1.40 & 714 & 1{,}254 \\
\text{甘油} & 4.47 & 224 & 1{,}883 \\
\text{乙醇} & 1.06 & 943 & 1{,}159
\end{array}
$$
**让水“不可压缩”的那个数，同时又是让管子爆裂的那个数。**$1\ \mathrm{m^{3}}$的水在$10\ \mathrm{MPa}$（$100\ \mathrm{bar}$）下被压缩了
$$
\frac{\Delta V}{V} = \frac{\Delta p}{E_v} = \frac{10 \times 10^{6}}{2.18 \times 10^{9}} = 0.46\ \%
$$
**一百巴下只有半个百分点**，这就是液压系统在低压下响应发软的原因，也是$200\ \mathrm{bar}$系统的流体**压缩性储存的能量不可忽略**的原因——$200\ \mathrm{bar}$下$10\ \mathrm{升}$的蓄能器容积储存
$$
U = \frac{\left( \Delta p \right)^{2}}{2 E_v} V = \frac{4 \times 10^{14}}{4.36 \times 10^{9}} \times 0.01 = 917\ \mathrm{J}
$$
相当于$94\ \mathrm{kg}$质量下落一米，而这正是破坏软管接头的能量。
**夹带空气效应，液压实践中最大的单项修正。**$1\ \mathrm{bar}$下的空气等体积弹性模量为$0.1\ \mathrm{MPa}$，油中含$1\ \%$体积的气泡后混合物的模量降为
$$
\frac{1}{E_m} = \frac{0.99}{1.40 \times 10^{9}} + \frac{0.01}{0.101 \times 10^{6}}
\quad \Rightarrow \quad E_m = 0.010\ \mathrm{GPa}
$$
**缩小了约一百四十倍**，这就是吸了空气的液压机发软、其伺服阀振荡、每本液压手册都有排气程序的原因。**在这一压强下，只要$0.007\ \%$的游离空气就使刚度减半。**
**随之而来的水击。**在快于$2 L / c$的时间内关闭的阀门产生**茹科夫斯基（Joukowsky）**压强升高
$$
\Delta p = \rho c \, \Delta V
$$
钢制管道中$2\ \mathrm{m / s}$的水，$\Delta p = 998 \times 1{,}481 \times 2 = 2.95\ \mathrm{MPa}$——**$2\ \mathrm{m / s}$产生$29\ \mathrm{bar}$**——而在**弹性**管中波速更低，
$$
c^{\prime} = \frac{c}{\sqrt{1 + \dfrac{K D}{E t}}}
$$
对直径$200\ \mathrm{mm}$、壁厚$6\ \mathrm{mm}$的球墨铸铁干管（$E = 110\ \mathrm{GPa}$），$c^{\prime} = 1{,}481 / \sqrt{1 + 2.18 \times 200 / \left( 110 \times 6 \right)} = 1{,}481 / 1.29 = 1{,}149\ \mathrm{m / s}$；对$200\ \mathrm{mm}$的 PVC 干管则是**$420\ \mathrm{m / s}$**。**塑料管因此安全三倍，而用自由水波速做的计算就错这三倍。**
:::

::: widget plot
f: 1.481/sqrt(1+2.18*50/(x*6)); 1.481/sqrt(1+2.18*200/(x*6)); 1.481/sqrt(1+2.18*500/(x*6))
x: 1, 300
y: 0.15, 1.6
labels: D/t = 8; D/t = 33; D/t = 83
caption: 水在壁厚比$D / t$如标注所示的薄壁管中的压力波波速（以$\mathrm{m / s}$计除以$1{,}000$），横轴为管材弹性模量$E$（吉帕）。中间那条曲线显示，波速从$E = 1\ \mathrm{GPa}$（聚乙烯）时的$173\ \mathrm{m / s}$，经过$10\ \mathrm{GPa}$时的$515\ \mathrm{m / s}$和$100\ \mathrm{GPa}$时的$1{,}127\ \mathrm{m / s}$，升到$200\ \mathrm{GPa}$（钢）时的$1{,}268\ \mathrm{m / s}$，所以低模量管道中的压力波要慢得多。**实际后果是：塑料配水干管靠自身柔性就受到防水击的保护，而钢管没有**；茹科夫斯基压强升高$\rho c^{\prime} \Delta V$必须用**管道**的波速计算，绝不能用自由水的$1{,}481\ \mathrm{m / s}$。
:::

## 黏度

::: definition 牛顿黏性定律 {#def-viscosity}
$$
\tau = \mu \frac{d u}{d y} \quad \left[ \mathrm{Pa} = \mathrm{N / m^{2}} \right], \qquad
\mu \ \left[ \mathrm{Pa \cdot s} \right] = \mathrm{kg / m \cdot s}, \qquad
\nu = \frac{\mu}{\rho} \ \left[ \mathrm{m^{2} / s} \right]
$$
**以下动力黏度与运动黏度对应$20\ {}^{\circ}\mathrm{C}$、$101.325\ \mathrm{kPa}$。**
$$
\begin{array}{l c c l c c}
\text{流体} & \mu\ (\mathrm{Pa \cdot s}) & \nu\ (\mathrm{m^{2} / s}) & & \text{流体} & \mu & \nu \\
\text{氢气} & 8.8 \times 10^{- 6} & 1.05 \times 10^{- 4} & & \text{水，} 20\ {}^{\circ}\mathrm{C} & 1.002 \times 10^{- 3} & 1.004 \times 10^{- 6} \\
\text{空气} & 1.815 \times 10^{- 5} & 1.509 \times 10^{- 5} & & \text{水，} 80\ {}^{\circ}\mathrm{C} & 3.55 \times 10^{- 4} & 3.65 \times 10^{- 7} \\
\text{二氧化碳} & 1.48 \times 10^{- 5} & 8.1 \times 10^{- 6} & & \text{水银} & 1.55 \times 10^{- 3} & 1.15 \times 10^{- 7} \\
\text{甘油} & 1.41 & 1.12 \times 10^{- 3} & & \text{SAE 10W 油} & 0.085 & 9.6 \times 10^{- 5} \\
\text{蜂蜜} & 10 & 7 \times 10^{- 3} & & \text{SAE 50 油} & 0.54 & 6.1 \times 10^{- 4}
\end{array}
$$
**值得记住的两个数量级结论。**空气的**动力**黏度比水**小五十五倍**，但其**运动**黏度却**大十五倍**，因为其密度小一千倍。
**温度依赖关系，以及符号相反的原因。**对**气体**，黏度是分子跨一个平均自由程的动量输运，随分子速度上升而增大：
$$
\frac{\mu}{\mu_0} = \left( \frac{T}{T_0} \right)^{3 / 2} \frac{T_0 + S}{T + S}
\quad \text{（萨瑟兰公式，} S_{\mathrm{air}} = 110.4\ \mathrm{K},\ T_0 = 273.15\ \mathrm{K},\ \mu_0 = 1.716 \times 10^{- 5} \text{）}
$$
**对$200\ {}^{\circ}\mathrm{C}$空气的估算。**
$$
\mu = 1.716 \times 10^{- 5} \times \left( \frac{473.15}{273.15} \right)^{1.5} \times \frac{383.55}{583.55}
= 1.716 \times 10^{- 5} \times 2.280 \times 0.6573 = 2.57 \times 10^{- 5}\ \mathrm{Pa \cdot s}
$$
**比$20\ {}^{\circ}\mathrm{C}$的值$1.815 \times 10^{- 5}$增大$42\ \%$**，而幂律近似$\mu / \mu_0 = \left( T / T_0 \right)^{0.7}$给出$\left( 473 / 293 \right)^{0.7} = 1.40$，萨瑟兰公式给$1.42$——**在$180\ \mathrm{K}$范围内相差$1.5\ \%$以内**，这就是初步设计里用幂律、物性程序里用萨瑟兰公式的原因。
对**液体**，黏度是分子跳出势阱的速率，按阿伦尼乌斯因子下降：
$$
\mu = A \exp \left( \frac{B}{T} \right), \qquad
B = \frac{E_a}{R}
$$
**对水的估算。**由$\mu \left( 20 \right) = 1.002 \times 10^{- 3}$与$\mu \left( 80 \right) = 3.55 \times 10^{- 4}$：
$$
B = \frac{\ln \left( 1.002 / 0.355 \right)}{1 / 293.15 - 1 / 353.15} = \frac{1.038}{5.80 \times 10^{- 4}} = 1{,}790\ \mathrm{K}, \qquad E_a = 14.9\ \mathrm{kJ / mol}
$$
**决定润滑系统尺寸的那个数。**水的黏度在$20$到$80\ {}^{\circ}\mathrm{C}$之间**大约每$40\ \mathrm{K}$减半**；SAE 40 发动机油在$20$到$100\ {}^{\circ}\mathrm{C}$之间降为约**三十五分之一**，这就是冷车早晨启动比定速巡航一小时磨损更严重的原因，也是油的**黏度指数**——表征其曲线多平坦的那个数——印在每个油桶上的原因。
**压强修正。**对矿物油，$\mu$大约**每$30$到$40\ \mathrm{MPa}$翻倍**（巴鲁斯（Barus）压黏系数约$2 \times 10^{- 8}\ \mathrm{Pa^{- 1}}$），所以$350\ \mathrm{bar}$液压系统的油在泵出口处的黏度**约为油箱处的两倍**。对气体，$10\ \mathrm{bar}$以下压强依赖可以忽略，因为$\mu = \tfrac{1}{3} \rho \bar{c} \lambda$中的$\rho \lambda$与压强无关。
:::

::: definition 无滑移条件与黏度计 {#def-viscometer}
**四种经典结构，全都归结为测一个扭矩。**
$$
\begin{array}{l l l}
\text{库埃特（同轴圆筒）} & T = \dfrac{4 \pi \mu \Omega R_i^{2} R_o^{2} L}{R_o^{2} - R_i^{2}} & 10^{- 4} \text{ 到 } 10^{2}\ \mathrm{Pa \cdot s} \text{ 的标准方法} \\[6pt]
\text{锥板式} & T = \dfrac{2 \pi \mu \Omega R^{3}}{3 \psi} & \text{均匀剪切，流变仪的默认选择} \\[6pt]
\text{平板式} & T = \dfrac{\pi \mu \Omega R^{4}}{2 h} & \text{悬浮液与膏体} \\[6pt]
\text{毛细管（泊肃叶）} & \Delta p = \dfrac{8 \mu Q L}{\pi R^{4}} & \text{奥氏与乌氏黏度计}
\end{array}
$$
**库埃特黏度计的估算。**$R_i = 20\ \mathrm{mm}$，$R_o = 21\ \mathrm{mm}$，$L = 60\ \mathrm{mm}$，$\Omega = 10\ \mathrm{rad / s}$，油$\mu = 0.1\ \mathrm{Pa \cdot s}$：
$$
T = \frac{4 \pi \times 0.1 \times 10 \times 4 \times 10^{- 4} \times 4.41 \times 10^{- 4} \times 0.06}{4.41 \times 10^{- 4} - 4 \times 10^{- 4}}
= \frac{1.330 \times 10^{- 7}}{4.1 \times 10^{- 5}} = 3.24 \times 10^{- 3}\ \mathrm{N \cdot m}
$$
**即$3.2\ \mathrm{mN \cdot m}$的扭矩**，用普通传感器可测到$1\ \%$——该结构的间隙必须**小**，剪切率才近乎均匀：$20\ \mathrm{mm}$内筒上$1\ \mathrm{mm}$的间隙内剪切率变化$10\ \%$（即比值$R_o^{2} / R_i^{2}$），$10\ \mathrm{mm}$间隙内则变化$2.25$倍，非牛顿流体的读数就说不清了。
**毁掉粗心测量的端面修正。**内筒底面拖动其下方的流体，贡献量级为$\mu \Omega R_i^{4} / h_b$的扭矩，对上述几何取$1\ \mathrm{mm}$底隙时为$1.6 \times 10^{- 4}\ \mathrm{N \cdot m}$（平圆盘为其$\pi / 2$倍，即$2.5 \times 10^{- 4}$）——**占信号的$5$到$8\ \%$**。每台真正的库埃特仪器要么用同转盘对端面作**防护**，要么施加由已知黏度标准液标定得到的**底端**修正；两者都不做的自制仪器就带着这么大的误差。
**测量本身的雷诺数。**旋转黏度计只在间隙内流动为层流时有效，上述几何在$\Omega = 10\ \mathrm{rad / s}$下
$$
\mathrm{Re} = \frac{\rho \Omega R_i \left( R_o - R_i \right)}{\mu} = \frac{891 \times 10 \times 0.02 \times 0.001}{0.1} = 1.78
$$
妥妥的层流；$\Omega = 1{,}000\ \mathrm{rad / s}$时为$178$，刚好低于泰勒涡出现的$\mathrm{Re} \approx 41.3 \sqrt{R_i / \left( R_o - R_i \right)} \approx 185$；超过它扭矩上升，仪器读出的黏度是流体所没有的。
:::

::: definition 非牛顿行为 {#def-nonnewton}
$$
\begin{array}{l l l l}
\text{模型} & \text{方程} & \text{实例} & \text{意义} \\
\text{牛顿流体} & \tau = \mu \dot{\gamma} & \text{水、空气、油、酒精} & \text{基准} \\
\text{幂律（奥斯特瓦尔德）} & \tau = K \dot{\gamma}^{n} & \text{油漆、血液、聚合物熔体} & n < 1 \text{ 剪切变稀} \\
\text{宾汉塑性体} & \tau = \tau_y + \mu_p \dot{\gamma} & \text{牙膏、泥浆、蛋黄酱} & \text{有屈服应力} \\
\text{赫谢尔-巴克利} & \tau = \tau_y + K \dot{\gamma}^{n} & \text{钻井泥浆、番茄酱、污泥} & \text{两者兼备} \\
\text{剪切增稠} & n > 1 & 50\ \%\ \text{的玉米粉水悬浮液} & \text{剪切增稠液、剪切增稠护甲} \\
\text{触变性} & \dot{\gamma} \text{ 固定时 } \mu = \mu \left( t \right) & \text{酸奶、凝胶、某些油漆} & \text{时间相关} \\
\text{黏弹性} & \text{法向应力、挤出胀大} & \text{熔融塑料、黏液} & \text{记忆效应}
\end{array}
$$
**幂律的估算。**$K = 5\ \mathrm{Pa \cdot s^{n}}$、$n = 0.4$的油漆，其表观黏度为
$$
\mu_{\mathrm{app}} = K \dot{\gamma}^{\,n - 1} = 5\, \dot{\gamma}^{- 0.6}
= \begin{cases}
79.2\ \mathrm{Pa \cdot s} & \dot{\gamma} = 0.01\ \mathrm{s^{- 1}} \ \text{（墙面流挂）} \\
0.315\ \mathrm{Pa \cdot s} & \dot{\gamma} = 100\ \mathrm{s^{- 1}} \ \text{（刷涂）} \\
0.0199\ \mathrm{Pa \cdot s} & \dot{\gamma} = 10^{4}\ \mathrm{s^{- 1}} \ \text{（喷涂）}
\end{cases}
$$
**从喷枪到墙面相差约$4{,}000$倍**，而这个倍数**就是产品规格本身**：油漆必须在$10^{4}\ \mathrm{s^{- 1}}$下足够稀以便雾化，又必须在$10^{- 2}\ \mathrm{s^{- 1}}$下足够稠以便不流挂，配漆在很大程度上就是选一个强剪切变稀的$n$和合适的$K$。
**屈服应力，以及决定储罐能否排空的那个数。**管中的宾汉流体除非壁面切应力超过屈服应力否则**根本不流动**，这要求压强梯度
$$
\frac{\Delta p}{L} > \frac{2 \tau_y}{R}
$$
对牙膏（$\tau_y \approx 50\ \mathrm{Pa}$）在直径$5\ \mathrm{mm}$的管中，阈值为$40\ \mathrm{kPa / m}$；对**高岭土浆**（$\tau_y \approx 30\ \mathrm{Pa}$）在直径$100\ \mathrm{mm}$的排水管中为$1{,}200\ \mathrm{Pa / m}$，坡度比这更缓的排水管**永远把内容物保持为固体**，必须用水枪冲通。**最常见的非牛顿设计失误，是一条新时能用、一年后因忽略屈服应力而淤死的排水管。**
**刻画偏离牛顿性的无量纲数。**
$$
\mathrm{De} = \frac{\lambda_f}{t_{\mathrm{obs}}} \quad \text{（德博拉数）}, \qquad
\mathrm{Wi} = \lambda_f \dot{\gamma} \quad \text{（魏森贝格数）}
$$
$$
\begin{array}{l c c l}
\text{流体} & \lambda_f & \lambda_f \dot{\gamma} \text{ 在 } \dot{\gamma} = 100\ \mathrm{s^{- 1}} & \text{行为} \\
\text{水} & 10^{- 12}\ \mathrm{s} & 10^{- 10} & \text{牛顿性} \\
\text{空气} & 10^{- 10}\ \mathrm{s} & 10^{- 8} & \text{牛顿性} \\
\text{发动机油} & 10^{- 8}\ \mathrm{s} & 10^{- 6} & \text{牛顿性} \\
\text{硅油，} 10^{3}\ \mathrm{cSt} & 10^{- 5}\ \mathrm{s} & 10^{- 3} & \text{牛顿性} \\
\text{聚丙烯酰胺溶液} & 0.1\ \mathrm{s} & 10 & \text{黏弹性，包轴效应} \\
\text{聚合物熔体} & 1 \text{ 到 } 10\ \mathrm{s} & 10^{2} \text{ 到 } 10^{3} & \text{挤出胀大、熔体破裂}
\end{array}
$$
**德博拉数是“万物皆流体”这句玩笑具有严肃内核的原因。**沥青是流动的——昆士兰大学的沥青滴落实验（Pitch Drop experiment）自**1927**年运行至今，在**2014**年滴下第九滴，由滴落得到的黏度约为$2 \times 10^{8}\ \mathrm{Pa \cdot s}$——而沥青又足够**弹性**，用锤子敲击会碎裂。**一种材料是不是流体取决于观测时间，德博拉数就是这个比值。**
:::

## 表面张力与饱和蒸气压

::: definition 表面张力与毛细现象 {#def-surface}
$$
\sigma \ \left[ \mathrm{N / m} \right] = \left[ \mathrm{J / m^{2}} \right], \qquad
\Delta p = \sigma \left( \frac{1}{R_1} + \frac{1}{R_2} \right) \quad \text{（杨-拉普拉斯方程）}
$$
$$
\Delta p_{\text{液滴}} = \frac{4 \sigma}{D}, \qquad
\Delta p_{\text{气泡}} = \frac{8 \sigma}{D}, \qquad
\Delta p_{\text{圆柱射流}} = \frac{\sigma}{R}
$$
**液体对蒸气的表面张力，除注明外均为$20\ {}^{\circ}\mathrm{C}$。**
$$
\begin{array}{l c l c}
\text{苯} & 28.9 & \text{水，} 20\ {}^{\circ}\mathrm{C} & 72.8 \ \mathrm{mN / m} \\
\text{水，} 100\ {}^{\circ}\mathrm{C} & 58.9 & \text{水，} 0\ {}^{\circ}\mathrm{C} & 75.6 \\
\text{乙醇} & 22.3 & \text{甲醇} & 22.6 \\
\text{甘油} & 63.4 & \text{水银，} 20\ {}^{\circ}\mathrm{C} & 484 \\
\text{SAE 30 油} & 32 & \text{液氮，} - 196\ {}^{\circ}\mathrm{C} & 8.9 \\
\text{肥皂水} & 25 \text{ 到 } 35 & \text{液氢，} - 253\ {}^{\circ}\mathrm{C} & 2.0
\end{array}
$$
**把钎焊、涂漆和印刷变成同一个问题的那个数。**水在干净玻璃上的接触角为$0$到$20^{\circ}$，铺展润湿；在打蜡或沾油的表面上为$100$到$110^{\circ}$，聚成珠状。**胶接、涂覆或真空密封之前“清洁度规范”的全部内容，就是关于接触角的一句话**，标准试验就是滴一滴液体，测得的角必须超过或低于某个数值。
**毛细上升。**接触角为$\theta$的液体在直径为$D$的圆管中上升
$$
h = \frac{4 \sigma \cos \theta}{\rho g D}
$$
**水在$1\ \mathrm{mm}$玻璃管中的估算**，$\theta = 0$：
$$
h = \frac{4 \times 0.0728}{998 \times 9.807 \times 0.001} = 29.8\ \mathrm{mm}
$$
**水银在同一管中的估算**，$\theta = 140^{\circ}$：
$$
h = \frac{4 \times 0.484 \times \left( - 0.766 \right)}{13{,}546 \times 9.807 \times 0.001} = - 11.2\ \mathrm{mm}
$$
**出现在每本土木教材里、却在每栋建筑里出错的那个数。**水在**混凝土**或**砖**中的上升是毛细的，可达**数米**，因为孔隙直径只有$0.1$到$1\ \mu\mathrm{m}$而$h \propto 1 / D$：在$D = 1\ \mu\mathrm{m}$时上升高度是$29.8\ \mathrm{m}$。**防潮层因这条公式而存在，防潮层被桥接的建筑就是墙里一根十米高的毛细柱。**
**邦德数，告诉你什么时候可以不再担心。**
$$
\mathrm{Bo} = \frac{\rho g L^{2}}{\sigma}, \qquad \mathrm{Bo} = 1 \ \text{对应} \ L = \sqrt{\frac{\sigma}{\rho g}} = \ell_c
$$
$$
\begin{array}{l c c}
\text{流体} & \ell_c\ (\mathrm{mm}) & \text{含义} \\
\text{水，} 20\ {}^{\circ}\mathrm{C} & 2.73 & \text{大于约 } 5\ \mathrm{mm} \text{ 的水滴被压扁} \\
\text{水银} & 1.91 & \text{宽于约 } 4\ \mathrm{mm} \text{ 的水银珠摊成一滩} \\
\text{乙醇} & 1.70 & \text{乙醇形成小液滴} \\
\text{液氢} & 1.7 & \text{低 } \sigma \text{ 被低密度抵消} \\
\text{肥皂水} & 1.6 \text{ 到 } 1.9 & \text{低于此尺度的泡沫是稳定的}
\end{array}
$$
**决定雨滴形状的那个数。**直径$1\ \mathrm{mm}$的雨滴$\mathrm{Bo} = 0.13$，是**球**；$4\ \mathrm{mm}$时$\mathrm{Bo} = 2.2$，底部被压平成**汉堡面包**形；远大于$5\ \mathrm{mm}$的雨滴会被吹成一个**袋**（降落伞）而破裂，观测到的最大雨滴约为$8$到$10\ \mathrm{mm}$。 **“水滴形”只是绘图约定，没有一滴雨长成过那个样子。**
:::

::: definition 饱和蒸气压与汽蚀 {#def-vapour}
$$
p_v \left( T \right) \quad \text{（饱和压强）}, \qquad
p_{\mathrm{local}} < p_v \ \Rightarrow \ \text{蒸气生成}
$$
**水的饱和蒸气压。**
$$
\begin{array}{l c c c c}
T\ ({}^{\circ}\mathrm{C}) & p_v\ (\mathrm{kPa}) & & T\ ({}^{\circ}\mathrm{C}) & p_v\ (\mathrm{kPa}) \\
0 & 0.6117 & & 60 & 19.95 \\
10 & 1.228 & & 70 & 31.20 \\
20 & 2.339 & & 80 & 47.41 \\
30 & 4.247 & & 90 & 70.18 \\
40 & 7.384 & & 100 & 101.33 \\
50 & 12.35 & & 120 & 198.7
\end{array}
$$
**大约每$15\ \mathrm{K}$翻倍并毁掉泵的那个数。****有效汽蚀余量**为
$$
\mathrm{NPSH_A} = \frac{p_{\mathrm{surface}} - p_v}{\rho g} \pm z - h_f
$$
灌注式吸入时$z$取正，吸上式取负；泵的**必需**$\mathrm{NPSH_R}$必须被它超过，且留**$0.5$到$1\ \mathrm{m}$**的余量。
**估算。**一台泵从**$80\ {}^{\circ}\mathrm{C}$的敞口水箱**取水，液面高于叶轮$2\ \mathrm{m}$，吸入管路摩擦损失$0.6\ \mathrm{m}$：
$$
\mathrm{NPSH_A} = \frac{101{,}325 - 47{,}410}{972 \times 9.807} + 2.0 - 0.6 = 5.66 + 1.4 = 7.06\ \mathrm{m}
$$
**而同样的泵和水箱若在$20\ {}^{\circ}\mathrm{C}$则是$10.11 + 1.4 = 11.5\ \mathrm{m}$**——热水吃掉了**$4.5\ \mathrm{m}$**的吸入扬程，按冷水数据选泵就会汽蚀。
**汽蚀数。**
$$
\mathrm{Ca} = \frac{p_{\mathrm{ref}} - p_v}{\tfrac{1}{2} \rho V^{2}}, \qquad
\text{当 } \mathrm{Ca} < - C_{p,\min} \text{ 时发生汽蚀}
$$
$20\ {}^{\circ}\mathrm{C}$的水中$V = 25\ \mathrm{m / s}$的桨叶梢部，局部峰值系数$C_p = - 6$，静水头$20\ \mathrm{m}$：
$$
p_{\mathrm{local}} = 297{,}000 - 6 \times 0.5 \times 998 \times 625 = 297{,}000 - 1{,}871{,}000 = - 1.57\ \mathrm{MPa}
$$
**这是不可能的**：等价地，$\mathrm{Ca} = 294{,}700 / 311{,}900 = 0.94$，远小于$- C_{p,\min} = 6$，所以流动发生汽蚀——必须降低梢部速度、增大浸深或重新设计叶剖面。**船用螺旋桨先按抗汽蚀设计、其次才考虑效率。**
**造成破坏的溃灭。**被带入$p > p_v$液体中的蒸气泡会剧烈溃灭（瑞利（Rayleigh）1917 年的分析），溃灭产生的微射流和冲击波在邻近壁面上造成数百兆帕、最高约**$1\ \mathrm{GPa}$**的冲击压强，足以在淬硬不锈钢上打出麻点。**被汽蚀侵蚀的叶轮看起来像一只布满针孔的铸件**，而诊断可由两点证实：麻点在**吸入**侧，且减小流量后麻点停止发展。
:::

## 算例

::: example 轴承的摩擦阻力矩 {#ex-bearing}
直径$80\ \mathrm{mm}$、长$120\ \mathrm{mm}$的轴在直径间隙$0.08\ \mathrm{mm}$的轴承中以$1{,}450\ \mathrm{rev / min}$运转，用$60\ {}^{\circ}\mathrm{C}$的 SAE 30 油（$\mu = 0.02\ \mathrm{Pa \cdot s}$）。求摩擦扭矩、功率损失和油膜中的剪切率。
::: solution
**库埃特（Couette）近似。**油膜厚$c = 0.04\ \mathrm{mm}$，对半径$R = 40\ \mathrm{mm}$而言$c / R = 10^{- 3}$，作初步估算时曲率和压强梯度都可以忽略：
$$
\dot{\gamma} = \frac{U}{c} = \frac{\Omega R}{c}
= \frac{151.8 \times 0.040}{4 \times 10^{- 5}} = 1.518 \times 10^{5}\ \mathrm{s^{- 1}}
$$
**切应力。**
$$
\tau = \mu \dot{\gamma} = 0.02 \times 1.518 \times 10^{5} = 3{,}036\ \mathrm{Pa}
$$
**扭矩。**
$$
T = \tau \times \left( 2 \pi R L \right) \times R
= 3{,}036 \times \left( 2 \pi \times 0.040 \times 0.120 \right) \times 0.040
= 3{,}036 \times 0.03016 \times 0.040 = 3.66\ \mathrm{N \cdot m}
$$
**功率。**
$$
\dot{W} = T \Omega = 3.66 \times 151.8 = 556\ \mathrm{W}
$$
**解读。****一个拳头大的轴承里超过半千瓦的摩擦**，全部变成油膜中$1.2\ \mathrm{cm^{3}}$油的热。轴拖着绕油膜流动的体积流量为
$$
\dot{Q} \approx \tfrac{1}{2} U c L = \tfrac{1}{2} \times 6.07 \times 4 \times 10^{- 5} \times 0.120
= 1.46 \times 10^{- 5}\ \mathrm{m^{3} / s} = 14.6\ \mathrm{cm^{3} / s}
$$
若这股循环油一次就把全部热量带走，它每循环一次的温升为
$$
\Delta T = \frac{556}{\dot{m} c_p} = \frac{556}{1.46 \times 10^{- 5} \times 891 \times 1{,}900} = 22.5\ \mathrm{K}
$$
——而同一批油不断循环，温度会一圈圈地升高。这就是动压轴承必须**持续供入**冷油的原因，也是供油率成为设计参数而不是细节的原因。
**合理性检验。**$1.5 \times 10^{5}\ \mathrm{s^{- 1}}$的剪切率高到使**非牛顿**油（含聚合物增黏剂的多级油）在这里**剪切变稀**，膜内有效黏度比$10^{3}\ \mathrm{s^{- 1}}$下黏度计的读数低$15$到$25\ \%$。**多级 10W-40 在高剪切轴承里会失去其“40”的一部分**，这就是发动机油规格给出$150\ {}^{\circ}\mathrm{C}$、$10^{6}\ \mathrm{s^{- 1}}$下的**高温高剪切**黏度、而不给$100\ {}^{\circ}\mathrm{C}$运动黏度值的原因。
:::
:::

::: example 毛细管喷墨 {#ex-inkjet}
直径$30\ \mu\mathrm{m}$、长$120\ \mu\mathrm{m}$的压电喷墨喷嘴喷出直径$50\ \mu\mathrm{m}$的墨滴。墨水$\rho = 1{,}050\ \mathrm{kg / m^{3}}$，$\mu = 2.5 \times 10^{- 3}\ \mathrm{Pa \cdot s}$，$\sigma = 0.032\ \mathrm{N / m}$。求所需压强、雷诺数和奥内佐格数，并判断墨水是否会拖卫星滴。
::: solution
**压电必须克服的拉普拉斯压强。**
$$
\Delta p_{\sigma} = \frac{4 \sigma}{D} = \frac{4 \times 0.032}{30 \times 10^{- 6}} = 4{,}267\ \mathrm{Pa}
$$
**喷嘴中的黏性损失**，把它当作带入口修正的短毛细管：
$$
\Delta p_{\mu} = \frac{32 \mu U L}{D^{2}}, \qquad U = \frac{\dot{Q}}{\pi D^{2} / 4}
$$
直径$50\ \mu\mathrm{m}$的墨滴在$10\ \mu\mathrm{s}$内喷出，$\dot{Q} = 6.5 \times 10^{- 14} / 10^{- 5} = 6.5 \times 10^{- 9}\ \mathrm{m^{3} / s}$，于是
$$
U = \frac{6.5 \times 10^{- 9}}{7.07 \times 10^{- 10}} = 9.2\ \mathrm{m / s}, \qquad
\Delta p_{\mu} = \frac{32 \times 2.5 \times 10^{- 3} \times 9.2 \times 1.2 \times 10^{- 4}}{9 \times 10^{- 10}} = 98{,}100\ \mathrm{Pa}
$$
**惯性项。**
$$
\Delta p_{\rho} = \tfrac{1}{2} \rho U^{2} = 0.5 \times 1{,}050 \times 84.6 = 44{,}400\ \mathrm{Pa}
$$
**总压，把约半个速度头的入口修正折入惯性项：**
$$
\Delta p \approx 44{,}400 + 98{,}100 + 4{,}267 = 146{,}800\ \mathrm{Pa} \approx 1.5\ \mathrm{bar}
$$
**使压电喷墨成为$1\ \mathrm{bar}$技术的那个数。**油浸压电堆能给出几巴，所以驱动很容易；**难的是波形**，因为同一个能喷出一滴干净墨滴的压力脉冲，若时序不当，就会喷出拖着液丝的墨滴。
**喷嘴中的雷诺数。**
$$
\mathrm{Re} = \frac{\rho U D}{\mu} = \frac{1{,}050 \times 9.2 \times 30 \times 10^{- 6}}{2.5 \times 10^{- 3}} = 116
$$
**决定墨滴干不干净的奥内佐格数（Ohnesorge）。**
$$
\mathrm{Oh} = \frac{\mu}{\sqrt{\rho \sigma D}} = \frac{2.5 \times 10^{- 3}}{\sqrt{1{,}050 \times 0.032 \times 50 \times 10^{- 6}}}
= \frac{2.5 \times 10^{- 3}}{4.10 \times 10^{- 2}} = 0.061
$$
$$
\begin{array}{l l}
\mathrm{Oh} < 0.01 & \text{大量卫星滴，细颈破碎成喷雾} \\
0.01 < \mathrm{Oh} < 0.1 & \text{一个主滴带一两个小卫星滴} \\
0.1 < \mathrm{Oh} < 1 & \text{干净的单滴，无卫星滴} \\
\mathrm{Oh} > 1 & \text{不脱落；细颈回缩}
\end{array}
$$
**$\mathrm{Oh} = 0.061$的墨水会拖卫星滴**，解决办法要么把黏度提高到$4.5 \times 10^{- 3}\ \mathrm{Pa \cdot s}$（使$\mathrm{Oh}$达到$0.11$），要么用**驻留-抽吸**波形，在细颈变细之前把弯月面拉回。**每种墨水的调配都是一场战斗：要达到$\mathrm{Oh} \approx 0.15$，又要在$20\ \mathrm{kHz}$脉冲之间稀得足以给腔体补墨。**
**合理性检验。**黏性项与惯性项之比应为$64 \left( L / D \right) / \mathrm{Re} = 64 \times 4 / 116 = 2.2$，而确实$98.1 / 44.4 = 2.2$。表面张力的$4.3\ \mathrm{kPa}$相对二者都很小，是因为韦伯数
$$
\mathrm{We} = \frac{\rho U^{2} D}{\sigma} = \frac{1{,}050 \times 84.6 \times 30 \times 10^{- 6}}{0.032} = 83
$$
远大于 1，所以射流**喷出时由惯性主导、飞行中由表面张力主导**——墨滴靠惯性成形，再靠毛细作用自己变圆，最终$50\ \mu\mathrm{m}$的直径由**喷出的体积**决定，而不是由喷嘴决定。
:::
:::

::: example 泵跳闸时的水击 {#ex-hammer}
直径$600\ \mathrm{mm}$、壁厚$6\ \mathrm{mm}$、长$1{,}800\ \mathrm{m}$的球墨铸铁输水干管输送$0.55\ \mathrm{m^{3} / s}$，其泵跳闸。求波速、茹科夫斯基负压波、水柱是否汽断，以及需要的防护。
::: solution
**波速。**
$$
c^{\prime} = \frac{1{,}481}{\sqrt{1 + \dfrac{2.18 \times 10^{9} \times 0.600}{110 \times 10^{9} \times 0.006}}}
= \frac{1{,}481}{\sqrt{1 + 1.982}} = \frac{1{,}481}{1.727} = 858\ \mathrm{m / s}
$$
**管道周期**，它决定关阀算不算“快”：
$$
T_p = \frac{2 L}{c^{\prime}} = \frac{2 \times 1{,}800}{858} = 4.20\ \mathrm{s}
$$
**流速。**
$$
V = \frac{0.55}{\pi \times 0.300^{2}} = 1.95\ \mathrm{m / s}
$$
**泵处的茹科夫斯基负压波。**泵跳闸是**持续数秒的减速**，大机组靠自身惯性需要$5$到$15\ \mathrm{s}$才停——**长于$T_p$**，所以这是**慢**关闭，水击只是茹科夫斯基值的一个分数：
$$
\Delta p_{\mathrm{full}} = \rho c^{\prime} V = 998 \times 858 \times 1.95 = 1.67\ \mathrm{MPa} \quad \left( 170\ \mathrm{m} \right)
$$
取$t_{\mathrm{stop}} = 15\ \mathrm{s}$线性减速、$T_p = 4.2\ \mathrm{s}$，**米肖（Michaud）**公式$\Delta h = 2 L V / \left( g\, t_{\mathrm{stop}} \right)$给出$\Delta h / h_{\mathrm{Jouk}} = T_p / t_{\mathrm{stop}} = 4.2 / 15 = 0.28$：
$$
\Delta p = 0.28 \times 1.67 = 0.47\ \mathrm{MPa} \quad \left( 48\ \mathrm{m} \right)
$$
**水柱汽断校核。**泵出口处的静压为$0.7\ \mathrm{MPa}$（$71\ \mathrm{m}$），蒸气压头为表压$- 10.2\ \mathrm{m}$，所以$48\ \mathrm{m}$的负压波后还剩$23\ \mathrm{m}$——**泵处不汽断**。但在静表压只有$18\ \mathrm{m}$的**高点**，$48\ \mathrm{m}$的负压波**把它压到蒸气压以下**：水柱汽断，两段水柱以与原流速同量级的相对速度重新弥合，由此产生的正压波为
$$
\Delta p = \rho c^{\prime} \Delta V = 998 \times 858 \times 1.95 = 1.67\ \mathrm{MPa} \quad \left( 170\ \mathrm{m} \right)
$$
**——正是缓慢停泵本应避免的完整茹科夫斯基压升，还要叠加在管线压力之上。**水柱汽断是多数“不可能”爆管事故背后的机理，而不求解汽腔的软件模型对它视而不见。
**防护措施。**
$$
\begin{array}{l l l}
\text{空气罐} & \text{泵处一个 } 10\ \mathrm{m^{3}} \text{ 的囊式罐} & \text{应付最初 } 20\ \mathrm{s} \text{ 及反射波} \\
\text{调压塔} & \text{高点处的敞口塔} & \text{在汽断前进气，最便宜的对策} \\
\text{泄压阀} & \text{设定高于工作压力 } 10\ \% & \text{防正压波，不防负压波} \\
\text{防锤止回阀} & \text{弹簧助闭的阀瓣} & \text{防止 } t \approx 12\ \mathrm{s} \text{ 倒流时的锤击} \\
\text{双速关闭阀门} & \text{先快关 } 10\ \% \text{，之后慢关} & \text{仅当阀门是起因时才有效}
\end{array}
$$
**决定设计的那个数。****倒流**在$t \approx 2 T_p = 8.4\ \mathrm{s}$开始，普通止回阀在$t \approx 12$到$20\ \mathrm{s}$之间猛烈撞击关闭；**防锤**阀的价格只是空气罐的一小部分，却能防住第二次瞬变，两者组合是标准做法。
**合理性检验。**波速是$858\ \mathrm{m / s}$而不是$1{,}481$，是因为管壁的弹性；而夹带空气修正**不**用加，是因为排气良好的干管游离气体少于$0.1\ \%$。**游离气体达$1\ \%$时波速降到$300\ \mathrm{m / s}$，茹科夫斯基水击降为三分之一**——这就是排空后重新充水的旧管在首次启动时水击剧烈的原因，也是投产程序要在每个高点排气的理由。
:::
:::

::: example 污泥管道 {#ex-sludge}
直径$150\ \mathrm{mm}$、长$400\ \mathrm{m}$的管道输送消化污泥，屈服应力$25\ \mathrm{Pa}$，塑性黏度$0.30\ \mathrm{Pa \cdot s}$，密度$1{,}040\ \mathrm{kg / m^{3}}$，流量$0.030\ \mathrm{m^{3} / s}$。求压强降、塞状核的尺寸，以及管道完全停止流动的压强阈值。
::: solution
**平均速度与表观剪切率。**
$$
V = \frac{0.030}{\pi \times 0.075^{2}} = 1.698\ \mathrm{m / s}, \qquad
\dot{\gamma}_{\mathrm{app}} = \frac{8 V}{D} = \frac{8 \times 1.698}{0.150} = 90.5\ \mathrm{s^{- 1}}
$$
**宾汉（Bingham）塑性体在管中的巴克明斯特-赖纳（Buckingham–Reiner）关系式**，记$\kappa = \tau_y / \tau_w$：
$$
Q = \frac{\pi R^{3} \tau_w}{4 \mu_p} \left[ 1 - \frac{4}{3} \kappa + \frac{1}{3} \kappa^{4} \right]
$$
**估算。**代入并对$\pi R^{3}$乘$4 \mu_p$，括号化为关于$\tau_w$的多项式：
$$
\tau_w - \frac{4 \tau_y}{3} + \frac{\tau_y^{4}}{3 \tau_w^{3}} = \frac{4 \mu_p Q}{\pi R^{3}}
= \frac{4 \times 0.30 \times 0.030}{\pi \times 4.219 \times 10^{- 4}} = 27.16\ \mathrm{Pa}
$$
$$
f \left( \tau_w \right) = \tau_w - 33.33 + \frac{1.302 \times 10^{5}}{\tau_w^{3}} = 27.16
$$
试算：$\tau_w = 50$得$50 - 33.33 + 1.04 = 17.7$；$\tau_w = 55$得$22.7$；$\tau_w = 59.9$得$27.2$。**$\tau_w = 59.9\ \mathrm{Pa}$**。
**塞状核。**流体只在当地切应力超过$\tau_y$处屈服，屈服区外延半径为
$$
r_0 = \frac{\tau_y}{\tau_w} R = \frac{25}{59.9} \times 0.075 = 0.0313\ \mathrm{m}
$$
所以**半径的$42\ \%$是一个以均匀速度运动的固体塞**，速度剖面是平顶的子弹头。
**压强降与功率。**
$$
\Delta p = \frac{4 \tau_w L}{D} = \frac{4 \times 59.9 \times 400}{0.150} = 639{,}000\ \mathrm{Pa} = 6.39\ \mathrm{bar}
$$
$$
\dot{W} = \frac{\Delta p \dot{Q}}{\eta} = \frac{639{,}000 \times 0.030}{0.65} = 29.5\ \mathrm{kW}
$$
**与具有相同塑性黏度的牛顿流体的比较。**
$$
\tau_{w,\,N} = \mu_p \dot{\gamma}_{\mathrm{app}} = 0.30 \times 90.5 = 27.2\ \mathrm{Pa}, \qquad
\Delta p_N = 2.90\ \mathrm{bar}
$$
**屈服应力使泵送功率增加了一倍多**，这个$2.2×$的系数正是污泥泵报价成败的数。
**流动流态。**表观黏度与梅茨纳-里德（Metzner–Reed）雷诺数为
$$
\mu_{\mathrm{app}} = \frac{\tau_w}{\dot{\gamma}_{\mathrm{app}}} = \frac{59.9}{90.5} = 0.662\ \mathrm{Pa \cdot s}, \qquad
\mathrm{Re}_{\mathrm{MR}} = \frac{\rho V D}{\mu_{\mathrm{app}}} = \frac{1{,}040 \times 1.698 \times 0.150}{0.662} = 400
$$
**妥妥的层流**，且直到$8.9\ \mathrm{m / s}$都保持层流——宾汉管线在通常工况下就是层流管线。
**阈值是压强梯度而不是流量。**除非壁面切应力超过屈服应力，即除非
$$
\frac{\Delta p}{L} > \frac{4 \tau_y}{D} = \frac{4 \times 25}{0.150} = 667\ \mathrm{Pa / m}
\quad \Rightarrow \quad \Delta p > 2.67\ \mathrm{bar\ over\ } 400\ \mathrm{m}
$$
否则不可能有任何运动。
**后果就是工厂靠经验学会的操作规则。**把泵从$6.4$节到$2.0\ \mathrm{bar}$不会让污泥变慢——**而是让它停住**，之后管线需要冲洗或下清管器才能重新流动，因为使静止泥柱重新屈服所需的静压高于运行压强。**污泥管线要么在流动要么就堵死，控制系统必须围绕这个不连续性来设计。**
**合理性检验。**$59.9\ \mathrm{Pa}$的工作点只比$25\ \mathrm{Pa}$的屈服应力高$2.4$倍，是因为管径**大**：壁面切应力为$\tau_w = D \left( \Delta p / L \right) / 4$，所以同一梯度下把直径减半到$75\ \mathrm{mm}$，$\kappa$将升到$0.83$，塞核占半径的$83\ \%$，此时巴克明斯特括号值为$0.05$，管线**实际上成了管中的一根实心杆**。**大管径、大坡度是有屈服应力流体的设计准则。**
:::
:::

::: history
**连续介质**的描述就是欧拉（Euler）**1755**年（1757 年发表）的方程，其前有达朗贝尔（d'Alembert）**1752**年的工作。纳维（Navier）在**1822**年的论文中写出了滑动速度（滑移）边界条件；斯托克斯（Stokes）在**1845**年讨论了各种可能之后，在其**1851**年关于摆的论文中采用了无滑移条件。**黏度的测量**始于泊肃叶（Poiseuille）**1838–1846**年的毛细管实验，这位医生的目的是理解**血液**在细小血管中的流动；他的定律$Q \propto R^{4}$已由哈根（Hagen）在**1839**年独立得到，现在称为哈根–泊肃叶定律。**库仑（Coulomb）**在**1800**年用振荡圆盘测量了液体的阻力。**尤金·宾汉（Eugene Bingham）****1916**年关于塑性流动的论文提出了以他命名的屈服应力流体，“流变学”（rheology）一词一般归于宾汉在**1920**年代后期的提议；**流变学会**成立于**1929**年。**萨瑟兰（Sutherland）**的气体黏度定律发表于**1893**年；**其背后的分子动理论**——$\mu = \tfrac{1}{3} \rho \bar{c} \lambda$，与压强无关——是麦克斯韦（Maxwell）**1860**年的成果，麦克斯韦本人在**1866**年发表的振荡圆盘实验中证实了这一出人意料的与压强无关性。**沥青滴落实验**由昆士兰大学的托马斯·帕内尔（Thomas Parnell）于**1927**年启动；第九滴落于**2014**年，帕内尔（追授）与其继任者约翰·梅恩斯通（John Mainstone）因此获得**2005**年搞笑诺贝尔物理学奖。
:::

## 后续内容

本课的物性将在[[fluid-mechanics/dimensional-analysis]]中变成无量纲数，并成为决定[[fluid-mechanics/navier-stokes]]中某项能否略去的系数。黏度在[[fluid-mechanics/pipe-flow]]中以沿程阻力系数重现，在[[fluid-mechanics/boundary-layers-drag]]中以壁面切应力重现；体积弹性模量在[[fluid-mechanics/compressible-flow]]中以马赫数重现；表面张力在[[fluid-mechanics/fluid-statics]]的弯月面中重现，并在[[energy-systems]]与[[propulsion]]的每一次喷雾、气泡和泡沫中重现。

::: summary
- 流体是在静止状态下不能承受剪力的物质；整个学科都由这一点和守恒律推出。
- 连续介质假设在$\mathrm{Kn} < 10^{- 3}$时成立，对一个大气压下的空气意味着约$0.07\ \mathrm{mm}$以上的所有尺度都成立，在真空室中这一尺度则大得多。
- 水的动力黏度比空气大五十五倍；空气的运动黏度比水大十五倍。永远不要把速度除以动力黏度。
- 气体黏度随温度升高而增大，液体则减小，在通常范围内变化倍数很大；润滑或换热器计算用冷态数值就是错的。
- 水的体积弹性模量是$2.18\ \mathrm{GPa}$，足以在定常流中称其不可压缩，却不足以在瞬变过程中如此称呼；常压下$1\ \%$的夹带空气使刚度除以约一百四十。
- 表面张力在毛细长度（水为$2.7\ \mathrm{mm}$）以下占主导，$1\ \mu\mathrm{m}$孔隙中的毛细上升达三十米。
- 饱和蒸气压大约每$15\ \mathrm{K}$翻倍；对热水用冷水数据算泵的汽蚀余量余量，是几米量级的虚构。
- 屈服应力意味着一条停了就再也开不了的管线；德博拉数意味着一种材料是不是流体取决于你观察它多久。
:::

::: quiz
一台液压机的伺服回路出现了低频振荡，而液压油的 ISO 黏度等级经查是正确的。最可能的物性原因是什么？
- [ ] 油的黏度指数太高
- [x] 夹带空气降低了油的有效体积弹性模量
- [ ] 油的密度随温度下降了
- [ ] 油的表面张力下降了
::: solution
回路的固有频率按液压刚度（即油的**体积弹性模量**除以封闭体积）的平方根变化。脱气的矿物油$E_v \approx 1.4$到$1.7\ \mathrm{GPa}$；常压下$1\ \%$体积的夹带空气把它降到约$0.010\ \mathrm{GPa}$，因为空气的等体积模量只有$0.101\ \mathrm{MPa}$，而气泡与液体是串联的。**刚度下降约一百四十倍，固有频率下降约十二倍**，这正是所看到的症状。对策是停留时间三分钟的油箱、入口远低于最低液面的回油管，以及一套排气程序——而不是换一种油。
:::
:::

## 习题

::: exercise 密度 {level=1 check="1.025"}
含盐量$35\ \mathrm{g / kg}$、$20\ {}^{\circ}\mathrm{C}$的海水密度为$1{,}025\ \mathrm{kg / m^{3}}$。给出它以$4\ {}^{\circ}\mathrm{C}$纯水为基准的比重。
::: solution
$\mathrm{SG} = 1{,}025 / 1{,}000 = 1.025$。
:::
:::

::: exercise 克努森数 {level=1 check="0.065"}
$20\ {}^{\circ}\mathrm{C}$、$101.325\ \mathrm{kPa}$的空气平均自由程为$65\ \mathrm{nm}$。给出$1\ \mu\mathrm{m}$间隙的克努森数。
::: solution
$\mathrm{Kn} = 65 \times 10^{- 9} / 10^{- 6} = 0.065$，处于滑移流区，并接近过渡区。
:::
:::

::: exercise 运动黏度 {level=1 check="1.51"}
$20\ {}^{\circ}\mathrm{C}$的空气$\mu = 1.815 \times 10^{- 5}\ \mathrm{Pa \cdot s}$，$\rho = 1.204\ \mathrm{kg / m^{3}}$。以$10^{- 5}\ \mathrm{m^{2} / s}$为单位给出其运动黏度。
::: solution
$\nu = 1.815 \times 10^{- 5} / 1.204 = 1.51 \times 10^{- 5}\ \mathrm{m^{2} / s}$。
:::
:::

::: exercise 体积弹性模量 {level=1 check="0.46"}
水的$E_v = 2.18\ \mathrm{GPa}$。给出$10\ \mathrm{MPa}$下的体积变化百分数。
::: solution
$\Delta V / V = 10 / 2{,}180 = 0.46\ \%$。
:::
:::

::: exercise 毛细现象 {level=1 check="29.8"}
以毫米为单位给出$20\ {}^{\circ}\mathrm{C}$的水在$1\ \mathrm{mm}$清洁玻璃管中的毛细上升高度，取$\sigma = 0.0728\ \mathrm{N / m}$，$\theta = 0$。
::: solution
$h = 4 \times 0.0728 / \left( 998 \times 9.807 \times 0.001 \right) = 29.8\ \mathrm{mm}$。
:::
:::

::: exercise 饱和蒸气压 {level=1 check="5.66"}
以米为单位给出大气压与水在$80\ {}^{\circ}\mathrm{C}$的饱和蒸气压之差的压强水头，取$\rho = 972\ \mathrm{kg / m^{3}}$，$p_v = 47.41\ \mathrm{kPa}$。
::: solution
$(101{,}325 - 47{,}410) / (972 \times 9.807) = 53{,}915 / 9{,}532 = 5.66\ \mathrm{m}$。
:::
:::

::: exercise 波速 {level=1 check="858"}
以米每秒给出水在直径$600\ \mathrm{mm}$、壁厚$6\ \mathrm{mm}$、$E = 110\ \mathrm{GPa}$的球墨铸铁管中的压力波波速，取$c = 1{,}481\ \mathrm{m / s}$。
::: solution
$c^{\prime} = 1{,}481 / \sqrt{1 + K D / \left( E t \right)}$。计算根号内的量：$K D / \left( E t \right) = 2.18 \times 10^{9} \times 0.600 / \left( 110 \times 10^{9} \times 0.006 \right) = 1.982$，所以$c^{\prime} = 1{,}481 / 1.727 = 858\ \mathrm{m / s}$。
:::
:::

::: exercise 幂律 {level=2 check="0.0666"}
某钻井泥浆服从$\tau = 0.8\, \dot{\gamma}^{0.6}$（SI 单位）。给出其在剪切率$500\ \mathrm{s^{- 1}}$下的表观黏度（帕·秒）。
::: solution
$$
\mu_{\mathrm{app}} = K \dot{\gamma}^{\,n - 1} = 0.8 \times 500^{- 0.4}
= 0.8 \times 0.0833 = 0.0666\ \mathrm{Pa \cdot s}
$$
**解读。**在泥浆低剪的井眼工况$\dot{\gamma} = 1\ \mathrm{s^{- 1}}$下，表观黏度是$0.8\ \mathrm{Pa \cdot s}$，**十二倍**于钻井值——而这个比值就是设计的全部：泥浆既要在环空低剪切率下把岩屑携带到地面，**又**要在喷嘴高剪切率下冲刷井底，一种能做到其一的牛顿泥浆会是两者都做不了的糖浆。
**合理性检验。**$n = 0.6$是膨润土泥浆的典型值；**聚合物**泥浆可达$n = 0.4$，**石灰**泥浆为$n = 0.75$；井队测量的**马什漏斗黏度**是一个以秒计的流出时间，不对应任何单一剪切率，因此流变性还要用旋转（范氏，Fann）黏度计在几个转速下检测。
:::
:::

::: exercise 德博拉数 {level=2 check="100"}
某聚合物溶液的松弛时间为$0.2\ \mathrm{s}$。给出观测时长$2\ \mathrm{ms}$的过程的德博拉数。
::: solution
$\mathrm{De} = \lambda_f / t_{\mathrm{obs}} = 0.2 / 0.002 = 100$。**在该时间尺度上材料表现为弹性固体**，这个过程——喷墨喷射、喷雾雾化、阀门关闭——必须按黏弹性来建模。
:::
:::

::: exercise 推导 {level=3}
由受力平衡和由能量平衡分别推导毛细上升公式，证明两者一致，并求出**不**润湿管壁的液体的液面高度。
::: solution
**受力平衡。**表面张力沿润湿周长的竖直分量支撑升高液柱的重量：
$$
\sigma \cos \theta \times \pi D = \rho g \left( \frac{\pi D^{2}}{4} h \right)
\quad \Rightarrow \quad
\boxed{ h = \frac{4 \sigma \cos \theta}{\rho g D} }
$$
**能量平衡。**系统的自由能是升高液柱的重力势能与界面能之和。高$h$的液柱质心在$h / 2$处，所以
$$
E_{\mathrm{grav}} = \rho g \frac{\pi D^{2}}{4} h \times \frac{h}{2} = \frac{\pi \rho g D^{2} h^{2}}{8}
$$
而把长度$h$的固-气界面替换为固-液界面所做的功——由于弯月面是常曲率面，液-气表面不作净功——为
$$
E_{\mathrm{surf}} = \pi D h \left( \gamma_{SL} - \gamma_{SV} \right) = - \pi D h \sigma \cos \theta
$$
其中用了**杨氏方程**$\gamma_{SV} - \gamma_{SL} = \sigma \cos \theta$。令能量取极小：
$$
\frac{d}{d h} \left( \frac{\pi \rho g D^{2} h^{2}}{8} - \pi D h \sigma \cos \theta \right)
= \frac{\pi \rho g D^{2} h}{4} - \pi D \sigma \cos \theta = 0
\quad \Rightarrow \quad h = \frac{4 \sigma \cos \theta}{\rho g D}
$$
**两种方法一致**，其必然原因是受力平衡就是能量平衡的导数——但能量推导**揭示了受力推导掩盖的东西**：弯月面自身的重量和曲率能量被忽略了，这在$h \gg D$时是合法的，否则不然。
**弯月面修正。**对半球形弯月面，弯月面底部以上的液体体积为$\pi D^{3} / 8 - \pi D^{3} / 12 = \pi D^{3} / 24$，相当于高$D / 6$的液柱，所以到弯月面底部的高度为
$$
h = \frac{4 \sigma \cos \theta}{\rho g D} - \frac{D}{6}
$$
**对$1\ \mathrm{mm}$水管的估算**：$29.8 - 0.17 = 29.6\ \mathrm{mm}$，一个**$0.6\ \%$**的修正，只在精密测压管中才重要。
**不润湿情形。**$\theta > 90^{\circ}$时余弦为负，$h$是**下降**，这不是数学上的奇趣，而是**水银气压计毛细误差**的来源。水银在$1\ \mathrm{mm}$管中的下降为$11.2\ \mathrm{mm}$，对其作修正时气压计读数必须**调高**该值——相当于大气压读数的$1.5\ \%$，**比天气预报的分辨率还大**。
**合理性检验。**能量推导是两种方法中更稳妥的一种，因为它能推广到**板间**几何：宽$w$、间距$s$的两板，润湿长度为$2 w$，升起液体的截面为$w s$，得到圆管公式中把$D$换成$2 s$的结果：
$$
h = \frac{2 \sigma \cos \theta}{\rho g s}
$$
**也能推广到边长$a$的方毛细管，此时$h = 4 \sigma \cos \theta / \left( \rho g a \right)$**——与直径$a$的圆管相同，这就是**多孔固体**的孔径分布可以通过把不润湿液体压入其中、读出各孔径的进入压力来测定的原因——即**压汞法**，测定岩石孔喉分布的标准方法。
:::
:::

::: exercise 设计 {level=3}
为一台以$280\ \mathrm{bar}$驱动$2\ \mathrm{MN}$压机、循环周期$0.4\ \mathrm{s}$的液压动力站，规定其流体物性基础——密度、黏度随温度的变化、饱和蒸气压、体积弹性模量、表面张力及任何非牛顿行为——并说明验证该规范所需的试验。
::: solution
**工况及其对流体的要求。**
$$
\begin{array}{l c l}
\text{压强} & 280\ \mathrm{bar} & \text{压缩性与泄漏占主导} \\
\text{循环} & 0.4\ \mathrm{s} & \text{刚度与波速占主导} \\
\text{力} & 2\ \mathrm{MN} & 280\ \text{巴下 } 300\ \mathrm{mm} \text{ 缸径} \\
\text{工况} & \text{连续} & 45\ {}^{\circ}\mathrm{C} \text{ 到 } 55\ {}^{\circ}\mathrm{C} \text{ 的热平衡}
\end{array}
$$
**流体。**选**无锌抗磨液压油，ISO VG 46**，其
$$
\begin{array}{l l l}
\rho\ \text{在}\ 20\ {}^{\circ}\mathrm{C} & 875\ \mathrm{kg / m^{3}} & \text{影响蓄能器气体容积} \\
\nu\ \text{在}\ 40\ {}^{\circ}\mathrm{C} & 46\ \mathrm{mm^{2} / s} & \text{规格标称值} \\
\nu\ \text{在}\ 100\ {}^{\circ}\mathrm{C} & 6.8\ \mathrm{mm^{2} / s} & \text{黏度指数 } \ge 100 \\
\nu\ \text{在}\ - 10\ {}^{\circ}\mathrm{C} & \approx 1{,}500\ \mathrm{mm^{2} / s} & \text{高于叶片泵冷启动极限：油箱需加热} \\
E_v\ \text{在}\ 280\ \text{巴、脱气后} & 1.65\ \mathrm{GPa} & \text{刚度数据} \\
\text{空气释放值，} 40\ {}^{\circ}\mathrm{C} & \le 8\ \text{分钟} & \text{DIN 51381} \\
\text{FZG 抗擦伤} & \ge 12 & \text{泵的抗磨保护}
\end{array}
$$
**决定机器节拍刚度的计算。**$280\ \mathrm{bar}$下$2\ \mathrm{升}$缸内容积中的油储存
$$
U = \frac{\left( 28 \times 10^{6} \right)^{2}}{2 \times 1.65 \times 10^{9}} \times 0.002 = 475\ \mathrm{J}
$$
柔度为
$$
C = \frac{V}{E_v} = \frac{0.002}{1.65 \times 10^{9}} = 1.21 \times 10^{- 12}\ \mathrm{m^{3} / Pa}
$$
于是缸的**液压**刚度为
$$
k_h = \frac{A^{2} E_v}{V} = \frac{\left( 0.0714 \right)^{2} \times 1.65 \times 10^{9}}{0.002} = 4.21 \times 10^{9}\ \mathrm{N / m}
$$
**而机械机架刚度典型值为$2 \times 10^{9}\ \mathrm{N / m}$**——两者是串联的弹簧，油约占总柔度的三分之一，所以它与机架一样限制着位置控制器的伺服带宽。**工作压力下$1\ \%$体积的游离空气（等温模量$28\ \mathrm{MPa}$）把$E_v$降到$1.05\ \mathrm{GPa}$**；在较低压力下，同样质量的空气占据更大体积，损失要大得多。
**波速与阀。**
$$
c^{\prime} = \frac{1}{\sqrt{\rho \left( \dfrac{1}{E_v} + \dfrac{D}{t E_{\mathrm{tube}}} \right)}}
= \frac{1}{\sqrt{875 \left( \dfrac{1}{1.65 \times 10^{9}} + \dfrac{0.016}{0.002 \times 110 \times 10^{9}} \right)}} = 1{,}297\ \mathrm{m / s}
$$
对$1.5\ \mathrm{m}$长的钢管，四分之一波共振频率为$c^{\prime} / \left( 4 L \right) = 1{,}297 / 6 = 216\ \mathrm{Hz}$——正落在$200\ \mathrm{Hz}$伺服回路之上——所以阀与缸之间的**管路须控制在约$0.5\ \mathrm{m}$**，共振移到$650\ \mathrm{Hz}$，远高于回路频率。
**验证规范所需的试验。**
$$
\begin{array}{l l l}
40 \text{ 与 } 100\ {}^{\circ}\mathrm{C} \text{ 黏度} & \text{ASTM D445} & \text{黏度指数；再生油的 VI 总是偏低} \\
\text{密度及其温度系数} & \text{ASTM D4052} & \text{蓄能器预充计算} \\
\text{空气释放值} & \text{DIN 51381} & \text{发软问题的检验} \\
\text{含水量} & \text{卡尔费休法，} \le 500\ \mathrm{ppm} & \text{水使轴承寿命减半} \\
\text{颗粒计数} & \text{ISO 4406，} 16\text{/}14\text{/}11 & \text{伺服阀 } 3\ \mu\mathrm{m} \text{ 的配合间隙} \\
\text{体积弹性模量，现场} & \text{压机的压强-体积曲线} & \text{唯一能抓住夹带空气的试验}
\end{array}
$$
**保护买方的四条条款。**“流体物性须在$40\ {}^{\circ}\mathrm{C}$以及环境温度的最低值和最高值下予以保证，且机器须能在$- 10\ {}^{\circ}\mathrm{C}$下启动，若油的低温黏度超过泵的启动极限则配油箱加热器。”“伺服阀的配合间隙与过滤精度须一并标明，且过滤器须$\beta_{3} \ge 1000$。”“油箱的空气释放与脱气时间须按满流量保证，且回油管须从最低液面以下进入。”“液压刚度与伺服回路的固有频率须在机器上实测并报告。”
**设计评注。**一般规律是：**液压机器是按刚度规范买进的，按黏度规范交付的**，而两者由不同的人在不同阶段检验——这就是一台压机可以满足每一份流体合格证却仍然控制不了的原因。
:::
:::
