流体力学发生在你不再要求物体是**刚体**的那一刻。固体在静止状态下能够承受切应力，流体不能；整个学科——压强场、船舶的阻力、阀门的噪声、轴承中的油膜、香烟烟柱在四十厘米高度转为湍流的原因——都由这一个“不能”加上[[statics]]与[[dynamics]]中的守恒律推出。

因此在任何方程之前的一课，是关于**数值及其范围**的一课。工程师真正要输送的各种流体的密度、黏度、表面张力和压缩性跨越若干个数量级，而由它们构造的无量纲数决定了运动方程中哪些项可以扔掉。流体力学的一半是知道哪些项是小量；本课提供使“小”成为一个数的这些物理量。

::: warning 能逃过验收试验的七种物性错误
**该用运动黏度的地方用了动力黏度。**雷诺数是$\rho V L / \mu = V L / \nu$，把速度除以**动力**黏度的计算得到的是$\mathrm{s / m^{2}}$的单位，而且换一个流体答案就变。**空气和水的动力黏度相差在五十倍以内，运动黏度相差在十五倍以内**，所以这两种错误朝相反方向给出不同的答案。**因为液体的黏度随温度下降就假定黏度都随温度下降。**气体恰恰相反，$T^{0.7}$的依赖很强：$200\ {}^{\circ}\mathrm{C}$的空气的黏度是$20\ {}^{\circ}\mathrm{C}$时的**$1.4$倍**。用冷态黏度做的轴承或涡轮叶栅计算，雷诺数错$50\ \%$，摩擦系数随之错$- 1 / 4$次幂。**把瞬变过程中的水当作不可压缩。**水的体积弹性模量是$2.2\ \mathrm{GPa}$，对液体而言这很大，但是**有限**：受限水管中压力波的波速是$1{,}400$到$1{,}480\ \mathrm{m / s}$，在$300\ \mathrm{m}$长的管道上$0.1\ \mathrm{s}$内关阀按茹科夫斯基（Joukowsky）判据是**快**关闭。定常流的水不可压缩；刚关阀的管中的水是一根$1{,}480\ \mathrm{m / s}$的声柱。**把无滑移条件当成可以放宽的边界条件。**无滑移是**流体与壁面界面的实验观测性质**，在普通压强下对一切普通液体和气体都成立。它只在克努森数（Knudsen）超过$10^{- 3}$时失效——常压下$1\ \mu\mathrm{m}$的间隙，或真空室里的任何东西——在$10\ \mathrm{mm}$管中“为了方便”加滑移边界，误差是$0.001\ \%$；在$1\ \mu\mathrm{m}$通道中误差是两倍。**在错误的温度下读饱和蒸气压。**水在$20\ {}^{\circ}\mathrm{C}$的饱和蒸气压是$2.34\ \mathrm{kPa}$，在$90\ {}^{\circ}\mathrm{C}$是$70.1\ \mathrm{kPa}$——相差**三十**倍。用冷态数值算热凝结水的泵有效汽蚀余量，会把余量高估**$6.8\ \mathrm{m}$**，泵在第一周就发生汽蚀。**假定流体的黏度是一个数。**油漆、钻井泥浆、血样、聚合物熔体和巧克力浆在两个数量级的黏度范围内是**剪切变稀**的；玉米粉悬浮液是**剪切增稠**的；湿黏土和牙膏有**屈服应力**。一台黏度计在一个转速下的读数是数据点而不是物性，用它选泵可以错十倍。**把表面张力忘到它成了全部问题。**表面张力对$1\ \mathrm{m}$的驳船可以忽略，对$1\ \mathrm{mm}$的喷嘴、燃油喷射器的喷雾、微流控芯片和湿壁塔却是主导的。邦德数（Bond）$\rho g L^{2} / \sigma$在**水的$2.7\ \mathrm{mm}$**特征长度处越过 1，凡最小特征尺寸小于该长度的设计，都是穿着压力驱动外衣的表面张力设计。
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
\text{水，} 20\ {}^{\circ}\mathrm{C} & 998.2 & 0.9982 & & \text{海水，含盐 } 35\ \% & 1{,}025 & 1.025 \\
\text{水，} 100\ {}^{\circ}\mathrm{C} & 958.4 & 0.9584 & & \text{液氮，} - 196\ {}^{\circ}\mathrm{C} & 807 & 0.807 \\
\text{冰，} 0\ {}^{\circ}\mathrm{C} & 916.7 & 0.917 & & \text{镓（液态）} & 6{,}095 & 6.10
\end{array}
$$
**让船浮起也让管子爆裂的那个数。**水在**$3.98\ {}^{\circ}\mathrm{C}$最密**，低于该温度冷却时膨胀，所以冰以$8.3\ \%$的干舷浮在水面，湖泊从上往下结冰。**同一个反常现象，在冬天留在室外的一根充满水并封死的管子里，会产生劈开铜接头的$200\ \mathrm{MPa}$**——结冰时膨胀$9\ \%$，而水的体积弹性模量是$2.2\ \mathrm{GPa}$，所以$9\ \%$的约束就是$200\ \mathrm{MPa}$，是退火铜屈服强度的八倍。
**压强是标量，应力不是。**在**静止**流体内一点处，任意截面上的正应力都相同——这就是帕斯卡（Pascal）定律的全部内容，它是没有切应力的必然结果：
$$
\sum M_{\text{对一点的矩，作用在流体微元上}} \ \Rightarrow \ p_x = p_y = p_z = p
$$
**绝对压强、表压与真空度的约定。**
$$
p_{\mathrm{abs}} = p_{\mathrm{atm}} + p_{\mathrm{gauge}}, \qquad
p_{\mathrm{vac}} = p_{\mathrm{atm}} - p_{\mathrm{abs}}
$$
**比任何其他错误毁掉更多测压管的那个数。**波登管压力计读**表压**；气压计读**绝对压强**；麦克劳德（McLeod）计或皮拉尼（Pirani）真空计读**绝对压强**；而凝汽器上$- 0.09\ \mathrm{MPa}$的表压读数对应$0.011\ \mathrm{MPa}$绝对压强，此时水的饱和温度是$49\ {}^{\circ}\mathrm{C}$而不是$100\ {}^{\circ}\mathrm{C}$。
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
= 1.792 \times 10^{- 7} \times 204.6 = 6.67 \times 10^{- 6}\ \mathrm{m} = 66.7\ \mathrm{nm}
$$
**由此决定的长度尺度。**
$$
\begin{array}{l c c}
L & \mathrm{Kn} & \text{流区} \\
1\ \mathrm{m} & 6.7 \times 10^{- 6} & \text{连续介质} \\
1\ \mathrm{mm} & 6.7 \times 10^{- 3} & \text{连续介质，临界} \\
100\ \mu\mathrm{m} & 0.067 & \text{滑移} \\
10\ \mu\mathrm{m} & 0.67 & \text{过渡} \\
1\ \mu\mathrm{m} & 6.7 & \text{自由分子流} \\
1\ \mathrm{mm}\ \text{在}\ 10^{- 3}\ \mathrm{kPa}\ \left( \text{真空室} \right) & 6.7 & \text{自由分子流}
\end{array}
$$
**决定硬盘磁头$12\ \mathrm{nm}$飞行高度是不是流体力学问题的那个数。**不是——那里$\mathrm{Kn} = 0.56$，雷诺方程必须用**二阶滑移**律修正，而该律的系数本身还是悬而未决的研究问题。**同样的算术说明，空气中$50\ \mathrm{nm}$的 MEMS 开关根本算不上流体。**
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
\text{流体} & E_v\ (\mathrm{GPa}) & \beta\ (10^{- 9}\ \mathrm{Pa^{- 1}}) & c\ (\mathrm{m / s}) \\
\text{水，} 20\ {}^{\circ}\mathrm{C} & 2.18 & 458 & 1{,}481 \\
\text{水，} 80\ {}^{\circ}\mathrm{C} & 2.35 & 426 & 1{,}555 \\
\text{海水，} 20\ {}^{\circ}\mathrm{C} & 2.34 & 427 & 1{,}512 \\
\text{水银} & 28.5 & 35 & 1{,}451 \\
\text{SAE 30 油，} 20\ {}^{\circ}\mathrm{C} & 1.40 & 714 & 1{,}254 \\
\text{甘油} & 4.47 & 224 & 1{,}935 \\
\text{乙醇} & 0.90 & 1{,}111 & 1{,}163
\end{array}
$$
**让水“不可压缩”的那个数，同时又是让管子爆裂的那个数。**$1\ \mathrm{m^{3}}$的水在$10\ \mathrm{MPa}$（$100\ \mathrm{bar}$）下被压缩了
$$
\frac{\Delta V}{V} = \frac{\Delta p}{E_v} = \frac{10 \times 10^{6}}{2.18 \times 10^{9}} = 0.46\ \%
$$
**一百巴下只有半个百分点**，这就是液压系统在低压下响应发软的原因，也是$200\ \mathrm{bar}$系统的流体**压缩性储存的能量不可忽略**的原因——$200\ \mathrm{bar}$下$10\ \mathrm{升}$的蓄能器容积储存
$$
U = \frac{\left( \Delta p \right)^{2}}{2 E_v} V = \frac{4 \times 10^{10}}{4.36 \times 10^{9}} \times 0.01 = 92\ \mathrm{J}
$$
相当于$9\ \mathrm{kg}$质量下落一米，而这正是破坏软管接头的能量。
**夹带空气效应，液压实践中最大的单项修正。**$1\ \mathrm{bar}$下的空气等体积弹性模量为$0.1\ \mathrm{MPa}$，油中含$1\ \%$体积的气泡后混合物的模量降为
$$
\frac{1}{E_m} = \frac{0.99}{1.40 \times 10^{9}} + \frac{0.01}{0.101 \times 10^{6}}
\quad \Rightarrow \quad E_m = 0.100\ \mathrm{GPa}
$$
**缩小了十四倍**，这就是吸了空气的液压机发软、其伺服阀振荡、每本液压手册都有排气程序的原因。**$0.5\ \%$的夹带空气使刚度减半。**
**随之而来的水击。**在快于$2 L / c$的时间内关闭的阀门产生**茹科夫斯基（Joukowsky）**压强升高
$$
\Delta p = \rho c \, \Delta V
$$
钢制管道中$2\ \mathrm{m / s}$的水，$\Delta p = 998 \times 1{,}481 \times 2 = 2.95\ \mathrm{MPa}$——**$2\ \mathrm{m / s}$产生$29\ \mathrm{bar}$**——而在**弹性**管中波速更低，
$$
c^{\prime} = \frac{c}{\sqrt{1 + \dfrac{K D}{E t}}}
$$
对直径$200\ \mathrm{mm}$、壁厚$6\ \mathrm{mm}$的球墨铸铁干管（$E = 110\ \mathrm{GPa}$），$c^{\prime} = 1{,}481 / \sqrt{1 + 2.18 \times 200 / \left( 110 \times 6 \right)} = 1{,}481 / 1.26 = 1{,}175\ \mathrm{m / s}$；对$200\ \mathrm{mm}$的 PVC 干管则是**$420\ \mathrm{m / s}$**。**塑料管因此安全三倍，而用自由水波速做的计算就错这三倍。**
:::

::: widget plot
f: 1.481/sqrt(1+2.18*50/(x*6)); 1.481/sqrt(1+2.18*200/(x*6)); 1.481/sqrt(1+2.18*500/(x*6))
x: 1, 300
y: 0.15, 1.6
labels: D/t = 8; D/t = 33; D/t = 83
caption: 水在壁厚比$D / t$如标注所示的薄壁管中的压力波波速（以$\mathrm{m / s}$计除以$1{,}000$），横轴为管材弹性模量$E$（吉帕）。中间那条曲线显示，波速从$E = 1\ \mathrm{GPa}$（聚乙烯）时的$173\ \mathrm{m / s}$，经过$10\ \mathrm{GPa}$时的$515\ \mathrm{m / s}$和$100\ \mathrm{GPa}$时的$1{,}127\ \mathrm{m / s}$，升到$200\ \mathrm{GPa}$（钢）时的$1{,}268\ \mathrm{m / s}$，所以**总降幅的四分之三发生在弹性模量的第一个数量级内**。**实际后果是：塑料配水干管靠自身柔性就受到防水击的保护，而钢管没有**；茹科夫斯基压强升高$\rho c^{\prime} \Delta V$必须用**管道**的波速计算，绝不能用自由水的$1{,}481\ \mathrm{m / s}$。
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
\text{氢气} & 8.8 \times 10^{- 6} & 5.3 \times 10^{- 5} & & \text{水，} 20\ {}^{\circ}\mathrm{C} & 1.002 \times 10^{- 3} & 1.004 \times 10^{- 6} \\
\text{空气} & 1.815 \times 10^{- 5} & 1.509 \times 10^{- 5} & & \text{水，} 80\ {}^{\circ}\mathrm{C} & 3.55 \times 10^{- 4} & 3.72 \times 10^{- 7} \\
\text{二氧化碳} & 1.48 \times 10^{- 5} & 8.1 \times 10^{- 6} & & \text{水银} & 1.55 \times 10^{- 3} & 1.15 \times 10^{- 7} \\
\text{甘油} & 1.41 & 1.12 \times 10^{- 3} & & \text{SAE 10W 油} & 0.085 & 9.6 \times 10^{- 5} \\
\text{蜂蜜} & 10 & 7 \times 10^{- 3} & & \text{SAE 50 油} & 0.54 & 6.1 \times 10^{- 4}
\end{array}
$$
**值得记住的两个数量级结论。**空气的**动力**黏度比水**小五十五倍**，但其**运动**黏度却**大十五倍**，因为其密度小一千倍。**肥皂膜与船的尾迹由同一个无量纲数支配，直觉却相反。**
**温度依赖关系，以及符号相反的原因。**对**气体**，黏度是分子跨一个平均自由程的动量输运，随分子速度上升而增大：
$$
\frac{\mu}{\mu_0} = \left( \frac{T}{T_0} \right)^{3 / 2} \frac{T_0 + S}{T + S}
\quad \text{（萨瑟兰公式，} S_{\mathrm{air}} = 110.4\ \mathrm{K},\ T_0 = 273.15\ \mathrm{K},\ \mu_0 = 1.716 \times 10^{- 5} \text{）}
$$
**对$200\ {}^{\circ}\mathrm{C}$空气的估算。**
$$
\mu = 1.716 \times 10^{- 5} \times \left( \frac{473.15}{273.15} \right)^{1.5} \times \frac{383.55}{583.55}
= 1.716 \times 10^{- 5} \times 1.861 \times 0.6573 = 2.10 \times 10^{- 5}\ \mathrm{Pa \cdot s}
$$
**比$20\ {}^{\circ}\mathrm{C}$的值$1.815 \times 10^{- 5}$增大$42\ \%$**，而幂律近似$\mu / \mu_0 = \left( T / T_0 \right)^{0.7}$给出$\left( 473 / 293 \right)^{0.7} = 1.40$，萨瑟兰公式给$1.42$——**在$180\ \mathrm{K}$范围内相差$1.5\ \%$以内**，这就是初步设计里用幂律、物性程序里用萨瑟兰公式的原因。
对**液体**，黏度是分子跳出势阱的速率，按阿伦尼乌斯因子下降：
$$
\mu = A \exp \left( \frac{B}{T} \right), \qquad
B = \frac{E_a}{R}
$$
**对水的估算。**由$\mu \left( 20 \right) = 1.002 \times 10^{- 3}$与$\mu \left( 80 \right) = 3.55 \times 10^{- 4}$：
$$
B = \frac{\ln \left( 1.002 / 0.355 \right)}{1 / 293.15 - 1 / 353.15} = \frac{1.040}{5.79 \times 10^{- 4}} = 1{,}796\ \mathrm{K}, \qquad E_a = 14.9\ \mathrm{kJ / mol}
$$
**决定润滑系统尺寸的那个数。**水的黏度在$20$到$80\ {}^{\circ}\mathrm{C}$之间**每$50\ \mathrm{K}$减半**；SAE 40 发动机油在$20$到$100\ {}^{\circ}\mathrm{C}$之间降为**八分之一**，这就是冷车早晨启动比定速巡航一小时磨损更严重的原因，也是油的**黏度指数**——表征其曲线多平坦的那个数——印在每个油桶上的原因。
**压强修正。**对液体，$\mu$大约**每$10$到$20\ \mathrm{MPa}$翻倍**，$350\ \mathrm{bar}$液压系统的油在泵处的黏度比油箱处**高$25\ \%$**。对气体，$10\ \mathrm{bar}$以下压强依赖可以忽略，因为$\mu = \tfrac{1}{3} \rho \bar{c} \lambda$中的$\rho \lambda$与压强无关。
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
= \frac{1.332 \times 10^{- 6}}{4.1 \times 10^{- 5}} = 0.0325\ \mathrm{N \cdot m}
$$
**即$33\ \mathrm{mN \cdot m}$的扭矩**，用普通传感器可测到$1\ \%$——这也是该结构间隙必须**小**的原因：$1\ \mathrm{mm}$间隙时曲率修正是$0.5\ \%$，而在$20\ \mathrm{mm}$内筒上用$10\ \mathrm{mm}$间隙时修正是$25\ \%$，简单公式就错了。
**毁掉粗心测量的端面修正。**内筒底面拖动其下方的流体，贡献量级为$\mu \Omega R_i^{4} / h_b$的扭矩，对上述几何取$1\ \mathrm{mm}$底隙时为$0.026\ \mathrm{N \cdot m}$——**占信号的$80\ \%$**。每台真正的库埃特仪器要么用同转盘对端面作**防护**，要么施加由已知黏度标准液标定得到的**底端**修正；两者都不做的自制仪器测的是底隙而不是流体。
**测量本身的雷诺数。**旋转黏度计只在间隙内流动为层流时有效，上述几何在$\Omega = 10\ \mathrm{rad / s}$下
$$
\mathrm{Re} = \frac{\rho \Omega R_i \left( R_o - R_i \right)}{\mu} = \frac{891 \times 10 \times 0.02 \times 0.001}{0.1} = 1.78
$$
妥妥的层流；$\Omega = 1{,}000\ \mathrm{rad / s}$时为$178$，而泰勒涡在$\mathrm{Re} \approx 41 \sqrt{\left( R_o + R_i \right) / \left( R_o - R_i \right)} \approx 550$处出现，此时扭矩上升$50\ \%$，仪器读出的黏度是流体所没有的。
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
25.1\ \mathrm{Pa \cdot s} & \dot{\gamma} = 0.01\ \mathrm{s^{- 1}} \ \text{（墙面流挂）} \\
1.99\ \mathrm{Pa \cdot s} & \dot{\gamma} = 100\ \mathrm{s^{- 1}} \ \text{（刷涂）} \\
0.079\ \mathrm{Pa \cdot s} & \dot{\gamma} = 10^{4}\ \mathrm{s^{- 1}} \ \text{（喷涂）}
\end{cases}
$$
**从漆罐到墙面相差$320$倍**，而这个倍数**就是产品规格本身**：油漆必须在$10^{4}\ \mathrm{s^{- 1}}$下足够稀以便雾化，又必须在$10^{- 2}\ \mathrm{s^{- 1}}$下足够稠以便不流挂，配漆的全部艺术就在于取足够大的$1 - n$和合适的$K$。
**屈服应力，以及决定储罐能否排空的那个数。**管中的宾汉流体除非壁面切应力超过屈服应力否则**根本不流动**，这要求压强梯度
$$
\frac{\Delta p}{L} > \frac{2 \tau_y}{R}
$$
对牙膏（$\tau_y \approx 50\ \mathrm{Pa}$）在$5\ \mathrm{mm}$管中，阈值为$20\ \mathrm{kPa / m}$；对**高岭土浆**（$\tau_y \approx 30\ \mathrm{Pa}$）在$100\ \mathrm{mm}$排水管中为$600\ \mathrm{Pa / m}$，坡度比这更缓的排水管**永远把内容物保持为固体**，必须用水枪冲通。**最常见的非牛顿设计失误，是一条新时能用、一年后因忽略屈服应力而淤死的排水管。**
**刻画偏离牛顿性的无量纲数。**
$$
\mathrm{De} = \lambda_f \dot{\gamma} = \frac{\lambda_f}{t_{\mathrm{obs}}} \quad \text{（德博拉数）}, \qquad
\mathrm{Wi} = \lambda_f \dot{\gamma} \quad \text{（魏森贝格数）}
$$
$$
\begin{array}{l c c l}
\text{流体} & \lambda_f & \text{在 } \dot{\gamma} = 100\ \mathrm{s^{- 1}} \text{ 的 De} & \text{行为} \\
\text{水} & 10^{- 12}\ \mathrm{s} & 10^{- 10} & \text{牛顿性} \\
\text{空气} & 10^{- 10}\ \mathrm{s} & 10^{- 8} & \text{牛顿性} \\
\text{发动机油} & 10^{- 8}\ \mathrm{s} & 10^{- 6} & \text{牛顿性} \\
\text{硅油，} 10^{3}\ \mathrm{cSt} & 10^{- 5}\ \mathrm{s} & 10^{- 3} & \text{牛顿性} \\
\text{聚丙烯酰胺溶液} & 0.1\ \mathrm{s} & 10 & \text{黏弹性，包轴效应} \\
\text{聚合物熔体} & 1 \text{ 到 } 10\ \mathrm{s} & 10^{2} \text{ 到 } 10^{3} & \text{挤出胀大、熔体破裂}
\end{array}
$$
**德博拉数是“万物皆流体”这句玩笑具有严肃内核的原因。**沥青是流动的——昆士兰大学的沥青滴落实验（Pitch Drop experiment）自**1927**年运行至今，到**2000**年滴下第九滴，给出黏度$2 \times 10^{9}\ \mathrm{Pa \cdot s}$——而沥青又足够**弹性**，用锤子敲击会碎裂。**一种材料是不是流体取决于观测时间，德博拉数就是这个比值。**
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
\text{水银} & 484 & \text{水，} 20\ {}^{\circ}\mathrm{C} & 72.8 \ \mathrm{mN / m} \\
\text{水，} 100\ {}^{\circ}\mathrm{C} & 58.9 & \text{水，} 0\ {}^{\circ}\mathrm{C} & 75.6 \\
\text{乙醇} & 22.3 & \text{甲醇} & 22.6 \\
\text{甘油} & 63.4 & \text{水银，} 20\ {}^{\circ}\mathrm{C} & 484 \\
\text{SAE 30 油} & 32 & \text{液氮，} - 196\ {}^{\circ}\mathrm{C} & 8.9 \\
\text{肥皂水} & 25 \text{ 到 } 35 & \text{液氢，} - 253\ {}^{\circ}\mathrm{C} & 2.3
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
h = \frac{4 \times 0.484 \times \left( - 0.766 \right)}{13{,}546 \times 9.807 \times 0.001} = - 11.6\ \mathrm{mm}
$$
**出现在每本土木教材里、却在每栋建筑里出错的那个数。**水在**混凝土**或**砖**中的上升是毛细的，可达**数米**，因为孔隙直径只有$0.1$到$1\ \mu\mathrm{m}$而$h \propto 1 / D$：在$D = 1\ \mu\mathrm{m}$时上升高度是$29.8\ \mathrm{m}$。**防潮层因这条公式而存在，防潮层被桥接的建筑就是墙里一根十米高的毛细柱。**
**邦德数，告诉你什么时候可以不再担心。**
$$
\mathrm{Bo} = \frac{\rho g L^{2}}{\sigma}, \qquad \mathrm{Bo} = 1 \ \text{对应} \ L = \sqrt{\frac{\sigma}{\rho g}} = \ell_c
$$
$$
\begin{array}{l c c}
\text{流体} & \ell_c\ (\mathrm{mm}) & \text{含义} \\
\text{水，} 20\ {}^{\circ}\mathrm{C} & 2.71 & \text{大于 } 5.4\ \mathrm{mm} \text{ 的水滴下落时变扁} \\
\text{水银} & 4.83 & \text{水银珠可以很大} \\
\text{乙醇} & 1.56 & \text{乙醇形成小液滴} \\
\text{液氢} & 0.54 & \text{低温喷雾很细} \\
\text{肥皂水} & 1.6 \text{ 到 } 1.9 & \text{低于此尺度的泡沫是稳定的}
\end{array}
$$
**决定雨滴形状的那个数。**直径$1\ \mathrm{mm}$的雨滴$\mathrm{Bo} = 0.14$，是**球**；$4\ \mathrm{mm}$时$\mathrm{Bo} = 2.2$，是**降落伞**；观测到的最大雨滴$8\ \mathrm{mm}$，是**即将破裂的空心环**。 **“水滴形”只是绘图约定，没有一滴雨长成过那个样子。**
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
**每$20\ \mathrm{K}$翻倍并毁掉泵的那个数。****有效汽蚀余量**为
$$
\mathrm{NPSH_A} = \frac{p_{\mathrm{surface}} - p_v}{\rho g} \pm z - h_f
$$
灌注式吸入时$z$取正，吸上式取负；泵的**必需**$\mathrm{NPSH_R}$必须被它超过，且留**$0.5$到$1\ \mathrm{m}$**的余量。
**估算。**一台泵从**$80\ {}^{\circ}\mathrm{C}$的敞口水箱**取水，液面高于叶轮$2\ \mathrm{m}$，吸入管路摩擦损失$0.6\ \mathrm{m}$：
$$
\mathrm{NPSH_A} = \frac{101{,}325 - 47{,}410}{972 \times 9.807} + 2.0 - 0.6 = 5.69 + 1.4 = 7.09\ \mathrm{m}
$$
**而同样的泵和水箱若在$20\ {}^{\circ}\mathrm{C}$则是$10.53 + 1.4 = 11.9\ \mathrm{m}$**——热水吃掉了**$4.8\ \mathrm{m}$**的吸入扬程，按冷水数据选泵就会汽蚀。
**汽蚀数。**
$$
\mathrm{Ca} = \frac{p_{\mathrm{ref}} - p_v}{\tfrac{1}{2} \rho V^{2}}, \qquad
\sigma = \frac{p - p_v}{\tfrac{1}{2} \rho V^{2} \left( C_{p,\mathrm{peak}} \right)}
$$
$20\ {}^{\circ}\mathrm{C}$的水中$V = 25\ \mathrm{m / s}$的桨叶梢部，局部峰值系数$C_p = - 6$，静水头$20\ \mathrm{m}$：
$$
p_{\mathrm{local}} = 297{,}000 - 6 \times 0.5 \times 998 \times 625 = 297{,}000 - 1{,}871{,}000 = - 1.57\ \mathrm{MPa}
$$
**这是不可能的**，所以流动发生汽蚀——必须降低梢部速度、增大浸深或重新设计叶剖面。**船用螺旋桨先按抗汽蚀设计、其次才考虑效率**，军舰为$3\ \%$的效率增益放弃的$60\ \mathrm{dB}$宽带噪声抑制，就是全部理由。
**造成破坏的溃灭。**$p > p_v$的液体中的蒸气泡溃灭时，内部压强升高量级为
$$
\Delta p \sim p \left( \frac{p}{p_v} \right)^{1 / 2} \quad \text{（瑞利-普莱塞溃灭估计）}
$$
实测邻近壁面上的冲击压强达**$1$到$1.5\ \mathrm{GPa}$**，足以在淬硬不锈钢上打出麻点。**被汽蚀侵蚀的叶轮看起来像一只布满针孔的铸件**，而诊断可由两点证实：麻点在**吸入**侧，且减小流量后麻点停止发展。
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
**解读。****一个拳头大的轴承里超过半千瓦的摩擦**，全部变成$4\ \mathrm{cm^{3}}$油中的热。轴拖带的体积流量为
$$
\dot{Q} \approx \frac{1}{2} U \left( 2 \pi R \right) c \times \frac{L}{2 \pi R} \quad \Rightarrow \quad
\dot{Q} = \tfrac{1}{2} \times 6.07 \times 2 \pi \times 0.040 \times 4 \times 10^{- 5} \times \frac{0.120}{2 \pi \times 0.040}
= 7.3 \times 10^{- 7}\ \mathrm{m^{3} / s} = 0.73\ \mathrm{cm^{3} / s}
$$
若这些油不更换，其温升为
$$
\Delta T = \frac{556}{\dot{m} c_p} = \frac{556}{0.73 \times 10^{- 6} \times 891 \times 1{,}900} = 226\ \mathrm{K}
$$
**这会把油汽化**，这就是动压轴承必须**供油充分**的原因——$226\ \mathrm{K}$使供油率成为设计参数而不是细节。
**合理性检验。**$1.5 \times 10^{5}\ \mathrm{s^{- 1}}$的剪切率高到使**非牛顿**油（含聚合物增黏剂的多级油）在这里**剪切变稀**，膜内有效黏度比$10^{3}\ \mathrm{s^{- 1}}$下黏度计的读数低$15$到$25\ \%$。**多级 10W-40 在高剪切轴承里会失去其“40”的一部分**，这就是发动机油规格给出$150\ {}^{\circ}\mathrm{C}$、$10^{4}\ \mathrm{s^{- 1}}$下的**高温高剪切**黏度、而不给$100\ {}^{\circ}\mathrm{C}$运动黏度值的原因。
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
\Delta p_{\mu} = \frac{32 \times 2.5 \times 10^{- 3} \times 9.2 \times 1.2 \times 10^{- 4}}{9 \times 10^{- 10}} = 980\ \mathrm{Pa}
$$
**惯性项。**
$$
\Delta p_{\rho} = \tfrac{1}{2} \rho U^{2} = 0.5 \times 1{,}050 \times 84.6 = 44{,}400\ \mathrm{Pa}
$$
**总压，把约半个速度头的入口修正折入惯性项：**
$$
\Delta p \approx 44{,}400 + 980 + 4{,}267 = 49{,}600\ \mathrm{Pa} \approx 0.50\ \mathrm{bar}
$$
**使压电喷墨成为$1\ \mathrm{bar}$技术的那个数。**油浸压电堆能给出几巴，所以驱动很容易；**难的是波形**，因为同一个压力脉冲若长$20\ \mu\mathrm{s}$，喷一滴就会变成喷两滴。
**喷嘴中的雷诺数。**
$$
\mathrm{Re} = \frac{\rho U D}{\mu} = \frac{1{,}050 \times 9.2 \times 30 \times 10^{- 6}}{2.5 \times 10^{- 3}} = 11.6
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
**合理性检验。**惯性项以$44\ \mathrm{kPa}$压倒表面张力的$4.3\ \mathrm{kPa}$，是因为韦伯数
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
\Delta p_{\mathrm{full}} = \rho c^{\prime} V = 998 \times 858 \times 1.95 = 1.67\ \mathrm{MPa} \quad \left( 167\ \mathrm{m} \right)
$$
取$8\ \mathrm{s}$线性减速、$T_p = 4.2\ \mathrm{s}$，**米肖（Michaud）**（内插）系数为$\Delta h / h_{\mathrm{Jouk}} \approx T_p / \left( 2 t_{\mathrm{stop}} \right) = 4.2 / 16 = 0.26$：
$$
\Delta p = 0.26 \times 1.67 = 0.43\ \mathrm{MPa} \quad \left( 44\ \mathrm{m} \right)
$$
**水柱汽断校核。**泵出口处的静压为$0.7\ \mathrm{MPa}$（$71\ \mathrm{m}$），蒸气压头为表压$- 10.2\ \mathrm{m}$，所以$44\ \mathrm{m}$的负压波后还剩$27\ \mathrm{m}$——**泵处不汽断**。但在高于水力坡降线$40\ \mathrm{m}$的**高点**，静表压只有$18\ \mathrm{m}$，$44\ \mathrm{m}$的负压波**把它压到蒸气压以下**：水柱汽断，两段水柱以$40\ \mathrm{m / s}$重新弥合，由此产生的正压波为
$$
\Delta p = \rho c^{\prime} \Delta V = 998 \times 858 \times 40 = 34.3\ \mathrm{MPa} \quad \left( 3{,}430\ \mathrm{bar} \right)
$$
**这不是球墨铸铁干管能承受的压力。**水柱汽断是多数“不可能”爆管事故背后的机理，而不求解汽腔的软件模型对它视而不见。
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
**决定设计的那个数。****倒流**在$t \approx 2 T_p = 8.4\ \mathrm{s}$开始，普通止回阀在$t \approx 12$到$20\ \mathrm{s}$之间猛烈撞击关闭；**防锤**阀的价格只有空气罐的$12\%$，却能防住第二次瞬变，**两者组合成为标准做法是有原因的**。
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
**合理性检验。**$59.9\ \mathrm{Pa}$的工作点只比$25\ \mathrm{Pa}$的屈服应力高$2.4$倍，是因为管径**大**：壁面切应力按$\tau_y D / \left( 4 \Delta p / L \right)$缩放，所以同一梯度下把直径减半到$75\ \mathrm{mm}$，$\kappa$将升到$0.83$，塞核占半径的$83\ \%$，此时巴克明斯特括号值为$0.05$，管线**实际上成了管中的一根实心杆**。**大管径、大坡度是有屈服应力流体的设计准则**，这就是污泥管线要比流量暗示的规格大一号的原因。
:::
:::

::: history
**连续介质**假设是欧拉（Euler）与达朗贝尔（d'Alembert）**1755**年的创见，而无滑移条件的第一个定量表述是圣维南（Saint-Venant）**1843**年给出的，尽管纳维（Navier）早在**1822**年的论文中就已写出滑动速度的边界条件，斯托克斯（Stokes）在**1851**年确定了现在使用的形式。**黏度的测量**始于泊肃叶（Poiseuille）**1840–1846**年的毛细管工作，其动机不是物理而是理解**血液的流动**——他在医学院读书时就开始研究它；他的定律$Q \propto R^{4}$被反复重新发现，以致冠名权要与**1839**年的哈根（Hagen）分享。**库仑（Coulomb）**在**1800**年测量了旋转圆筒与容器之间橄榄油的黏度，报告了第一个**非牛顿**观测——肥皂溶液的黏度随转速变化——这一观测被冷落了**一百三十年**，直到宾汉（Bingham）**1918**年关于“塑性流体”的论文，以及莱纳（Reiner）与拉比诺维奇（Rabinowitsch）**1920**年的流变学测量。**“流变学”（rheology）一词由尤金·宾汉（Eugene Bingham）与里布莱特（M. C. Riblett）于 1920 年创造**，**流变学会**成立于**1929**年，首批会员包括**宾汉、莱纳、哈切克（Hatschek）与弗罗因德利希（Freundlich）**。**萨瑟兰（Sutherland）**的气体黏度定律发表于**1893**年，在$100$到$1{,}000\ \mathrm{K}$之间对空气仍准确到$2\ \%$以内；**预言它的分子动理论**——$\mu = \tfrac{1}{3} \rho \bar{c} \lambda$，与压强无关——是麦克斯韦（Maxwell）**1860**年的成果，其“气体黏度不依赖密度”的预言由格罗夫与格罗夫斯（Grove and Groves）在**1869**年验证，是十九世纪分子理论最令人震惊的成功之一。**沥青滴落实验**由昆士兰大学的托马斯·帕内尔（Thomas Parnell）于**1927**年启动，本打算只运行十年，到**2013**年已滴下九滴——是世界上最长寿的实验室实验，也是唯一两获搞笑诺贝尔奖的实验：2024 年热浪期间一名学生用盖子封住了漏斗。
:::

## 后续内容

本课的物性将在[[fluid-mechanics/dimensional-analysis]]中变成无量纲数，并成为决定[[fluid-mechanics/navier-stokes]]中某项能否略去的系数。黏度在[[fluid-mechanics/pipe-flow]]中以沿程阻力系数重现，在[[fluid-mechanics/boundary-layers-drag]]中以壁面切应力重现；体积弹性模量在[[fluid-mechanics/compressible-flow]]中以马赫数重现；表面张力在[[fluid-mechanics/fluid-statics]]的弯月面中重现，并在[[energy-systems]]与[[propulsion]]的每一次喷雾、气泡和泡沫中重现。

::: summary
- 流体是在静止状态下不能承受剪力的物质；整个学科都由这一点和守恒律推出。
- 连续介质假设在$\mathrm{Kn} < 10^{- 3}$时成立，对一个大气压下的空气意味着约$7\ \mathrm{mm}$以上的所有尺度都成立，而真空室里的一切都不成立。
- 水的动力黏度比空气大五十五倍；空气的运动黏度比水大十五倍。永远不要把速度除以动力黏度。
- 气体黏度随温度升高而增大，液体则减小，在通常范围内是二到八倍；润滑或换热器计算用冷态数值就是错的。
- 水的体积弹性模量是$2.18\ \mathrm{GPa}$，足以在定常流中称其不可压缩，却不足以在瞬变过程中如此称呼；$1\ \%$的夹带空气使刚度除以十四。
- 表面张力在毛细长度（水为$2.7\ \mathrm{mm}$）以下占主导，$1\ \mu\mathrm{m}$孔隙中的毛细上升达三十米。
- 饱和蒸气压每$20\ \mathrm{K}$翻倍；对热水用冷水数据算泵的汽蚀余量余量，是几米量级的虚构。
- 屈服应力意味着一条停了就再也开不了的管线；德博拉数意味着一种材料是不是流体取决于你观察它多久。
:::

::: quiz
一台液压机的伺服回路出现了低频振荡，而液压油的 ISO 黏度等级经查是正确的。最可能的物性原因是什么？
- [ ] 油的黏度指数太高
- [x] 夹带空气降低了油的有效体积弹性模量
- [ ] 油的密度随温度下降了
- [ ] 油的表面张力下降了
::: solution
回路的固有频率按液压刚度（即油的**体积弹性模量**除以封闭体积）的平方根变化。脱气的矿物油$E_v \approx 1.4$到$1.7\ \mathrm{GPa}$；常压下$1\ \%$体积的夹带空气把它降到约$0.10\ \mathrm{GPa}$，因为空气的等体积模量只有$0.101\ \mathrm{MPa}$，而气泡与液体是串联的。**刚度下降十四倍，固有频率几乎下降四倍**，这正是所看到的症状。对策是停留时间三分钟的油箱、入口远低于最低液面的回油管，以及一套排气程序——而不是换一种油。
:::
:::

## 习题

::: exercise 密度 {level=1 check="1.025"}
含盐量$35\ \mathrm{g / kg}$、$20\ {}^{\circ}\mathrm{C}$的海水密度为$1{,}025\ \mathrm{kg / m^{3}}$。给出它以$4\ {}^{\circ}\mathrm{C}$纯水为基准的比重。
::: solution
$\mathrm{SG} = 1{,}025 / 1{,}000 = 1.025$。
:::
:::

::: exercise 克努森数 {level=1 check="0.067"}
$20\ {}^{\circ}\mathrm{C}$、$101.325\ \mathrm{kPa}$的空气平均自由程为$66.7\ \mathrm{nm}$。给出$1\ \mathrm{mm}$间隙的克努森数。
::: solution
$\mathrm{Kn} = 66.7 \times 10^{- 9} / 10^{- 3} = 0.0667$，处于滑移流区的上缘。
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

::: exercise 饱和蒸气压 {level=1 check="5.69"}
以米为单位给出大气压与水在$80\ {}^{\circ}\mathrm{C}$的饱和蒸气压之差的压强水头，取$\rho = 972\ \mathrm{kg / m^{3}}$，$p_v = 47.41\ \mathrm{kPa}$。
::: solution
$(101{,}325 - 47{,}410) / (972 \times 9.807) = 53{,}915 / 9{,}532 = 5.69\ \mathrm{m}$。
:::
:::

::: exercise 波速 {level=1 check="858"}
以米每秒给出水在直径$600\ \mathrm{mm}$、壁厚$6\ \mathrm{mm}$、$E = 110\ \mathrm{GPa}$的球墨铸铁管中的压力波波速，取$c = 1{,}481\ \mathrm{m / s}$。
::: solution
$c^{\prime} = 1{,}481 / \sqrt{1 + 2.18 \times 600 / \left( 110{,}000 \times 0.006 \times 10^{3} / 10^{3} \right)}$。计算根号内的量：$2.18 \times 10^{9} \times 0.600 / \left( 110 \times 10^{9} \times 0.006 \right) = 1.982$，所以$c^{\prime} = 1{,}481 / 1.727 = 858\ \mathrm{m / s}$。
:::
:::

::: exercise 幂律 {level=2}
某钻井泥浆服从$\tau = 0.8\, \dot{\gamma}^{0.6}$（SI 单位）。给出其在剪切率$500\ \mathrm{s^{- 1}}$下的表观黏度（帕·秒）。
::: solution
$$
\mu_{\mathrm{app}} = K \dot{\gamma}^{\,n - 1} = 0.8 \times 500^{- 0.4}
= 0.8 \times 0.0818 = 0.0654\ \mathrm{Pa \cdot s}
$$
**解读。**在泥浆低剪的井眼工况$\dot{\gamma} = 1\ \mathrm{s^{- 1}}$下，表观黏度是$0.8\ \mathrm{Pa \cdot s}$，**十二倍**于钻井值——而这个比值就是设计的全部：泥浆既要在环空低剪切率下把岩屑携带到地面，**又**要在喷嘴高剪切率下冲刷井底，一种能做到其一的牛顿泥浆会是两者都做不了的糖浆。
**合理性检验。**$n = 0.6$是膨润土泥浆的典型值；**聚合物**泥浆可达$n = 0.4$，**石灰**泥浆为$n = 0.75$；井队实际测量的**马什漏斗黏度**是$\dot{\gamma} \approx 1{,}000\ \mathrm{s^{- 1}}$下的单点读数，它与钻井工况相关而与携带工况无关。**只控制漏斗黏度的钻机，在井眼清洁问题上就是盲飞。**
:::
:::

::: exercise 德博拉数 {level=2}
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
**弯月面修正。**“名义”液面以上的球冠对半球形弯月面含有体积$\pi D^{3} / 32$，所以修正后的高度为
$$
h = \frac{4 \sigma \cos \theta}{\rho g D} - \frac{D}{8}
$$
**对$1\ \mathrm{mm}$水管的估算**：$29.8 - 0.125 = 29.7\ \mathrm{mm}$，一个**$0.4\ \%$**的修正，只在精密测压管中才重要。
**不润湿情形。**$\theta > 90^{\circ}$时余弦为负，$h$是**下降**，这不是数学上的奇趣，而是**水银气压计的毛细误差**和**地下水毛细饱和带**的工作机理。水银在$1\ \mathrm{mm}$管中的下降为$11.6\ \mathrm{mm}$，对其作修正时气压计读数必须**调高**该值——相当于大气压读数的$1.5\ \%$，**比天气预报的分辨率还大**。
**合理性检验。**能量推导是两种方法中更稳妥的一种，因为它能推广到**板间**几何：润湿宽度为$2 w$、截面为$w h$，得到同一公式，只需把$D$换成板间距$2 a$：
$$
h = \frac{2 \sigma \cos \theta}{\rho g a}
$$
**也能推广到边长$a$的方毛细管，此时$h = 4 \sigma \cos \theta / \left( \rho g a \right)$**——与直径$a$的圆管相同，这就是**土壤**的孔径分布可以用压气法测进压来测定——即**压汞法测孔**，也是测定岩石喉道尺寸分布的标准方法。
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
\text{力} & 2\ \mathrm{MN} & 280\ \text{巴下 } 95\ \mathrm{mm} \text{ 缸径} \\
\text{工况} & \text{连续} & 45\ {}^{\circ}\mathrm{C} \text{ 到 } 55\ {}^{\circ}\mathrm{C} \text{ 的热平衡}
\end{array}
$$
**流体。**选**无锌抗磨液压油，ISO VG 46**，其
$$
\begin{array}{l l l}
\rho\ \text{在}\ 20\ {}^{\circ}\mathrm{C} & 875\ \mathrm{kg / m^{3}} & \text{影响蓄能器气体容积} \\
\nu\ \text{在}\ 40\ {}^{\circ}\mathrm{C} & 46\ \mathrm{mm^{2} / s} & \text{规格标称值} \\
\nu\ \text{在}\ 100\ {}^{\circ}\mathrm{C} & 6.1\ \mathrm{mm^{2} / s} & \text{黏度指数 } \ge 100 \\
\nu\ \text{在}\ - 10\ {}^{\circ}\mathrm{C} & \le 600\ \mathrm{mm^{2} / s} & \text{叶片泵的冷启动极限} \\
E_v\ \text{在}\ 280\ \text{巴、脱气后} & 1.65\ \mathrm{GPa} & \text{刚度数据} \\
\text{空气释放值，} 40\ {}^{\circ}\mathrm{C} & \le 8\ \text{分钟} & \text{DIN 51381} \\
\text{FZG 抗擦伤} & \ge 12 & \text{泵的抗磨保护}
\end{array}
$$
**决定机器节拍刚度的计算。**$280\ \mathrm{bar}$下$2\ \mathrm{升}$缸内容积中的油储存
$$
U = \frac{\left( 28 \times 10^{6} \right)^{2}}{2 \times 1.65 \times 10^{9}} \times 0.002 = 47.5\ \mathrm{J}
$$
柔度为
$$
C = \frac{V}{E_v} = \frac{0.002}{1.65 \times 10^{9}} = 1.21 \times 10^{- 12}\ \mathrm{m^{3} / Pa}
$$
于是缸的**液压**刚度为
$$
k_h = \frac{A^{2} E_v}{V} = \frac{7.09 \times 10^{- 3} \times 1.65 \times 10^{9}}{0.002} = 5.85 \times 10^{9}\ \mathrm{N / m}
$$
**而机械机架刚度典型值只有$2 \times 10^{9}\ \mathrm{N / m}$**——油**比机架还软**，位置控制器的伺服带宽受限于**油**而不是阀。**$1\ \%$的夹带空气把$E_v$降到$0.15\ \mathrm{GPa}$，伺服固有频率降六倍**，这就是液压压机控制问题的全部。
**波速与阀。**
$$
c^{\prime} = \frac{1}{\sqrt{\rho \left( \dfrac{1}{E_v \rho} + \dfrac{D}{4 t E_{\mathrm{tube}}} \right)}}
= \frac{1}{\sqrt{875 \left( \dfrac{1}{1.65 \times 10^{9} \times 875} + \dfrac{0.016}{4 \times 0.002 \times 110 \times 10^{9}} \right)}} = 1{,}010\ \mathrm{m / s}
$$
对$1.5\ \mathrm{m}$长的软管，四分之一波长时间为$1.5 / \left( 4 \times 1{,}010 \right) = 0.37\ \mathrm{ms}$，所以阀与缸之间**软管不得长约$0.5\ \mathrm{m}$**，否则$200\ \mathrm{Hz}$的伺服回路会在$675\ \mathrm{Hz}$看到共振并振荡。
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
**保护买方的四条条款。**“流体物性须在$40\ {}^{\circ}\mathrm{C}$以及环境温度的最低值和最高值下予以保证，且机器须在$- 10\ {}^{\circ}\mathrm{C}$下无需加热器即可启动。”“伺服阀的配合间隙与过滤精度须一并标明，且过滤器须$\beta_{3} \ge 1000$。”“油箱的空气释放与脱气时间须按满流量保证，且回油管须从最低液面以下进入。”“液压刚度与伺服回路的固有频率须在机器上实测并报告。”
**设计评注。**一般规律是：**液压机器是按刚度规范买进的，按黏度规范交付的**，而两者由不同的人在不同阶段检验——这就是一台压机可以满足每一份流体合格证却仍然控制不了的原因。
:::
:::
