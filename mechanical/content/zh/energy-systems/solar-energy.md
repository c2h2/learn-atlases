太阳在大气层顶向每一平方米正对它的面积输送约$1361\,\mathrm{W}$的功率，而在晴天正午，到达地面的大约是每平方米一千瓦。以日常生活的标准，这是一个很大的能流——每平方米相当于一台小电暖器的热量——但与锅炉炉膛相比它是分散的，每晚都会关闭，并随季节、纬度和天气变化。因此太阳能工程是依次解决的三个问题：在给定地点和时间，给定朝向的表面接收到*多少*辐射（几何与大气）；*如何把它收集为热*（太阳能集热器和聚光器，第二定律限制了接收器能达到的温度）；以及*如何把它直接转换为电*（光伏电池，半导体的禁带宽度限制了可利用的太阳光份额）。

本章依次讨论这三个问题。它用到[[heat-transfer/radiation]]中的黑体辐射定律和角系数概念，以及[[energy-systems/energy-overview]]中的能量单位和容量因数，并为储能（[[energy-systems/energy-storage]]）和成本（[[energy-systems/energy-economics-emissions]]）作准备，后两者决定了太阳能实际被利用的程度。

## 大气层外的太阳光 {#sec-extraterrestrial}

太阳的辐射非常接近有效温度约为$5772\,\mathrm{K}$的黑体，按维恩定律$\lambda_{\max}T = 2898\,\mu\mathrm{m\,K}$，其峰值在约$0.50\,\mu\mathrm{m}$——绿光。$5772\,\mathrm{K}$黑体的辐射约有$37\,\%$落在可见光波段（$0.4$–$0.7\,\mu\mathrm{m}$），其余大部分在近红外。在日地平均距离$1.496\times10^{11}\,\mathrm{m}$处，辐射已散布在一个巨大的球面上，太阳只张成一个角半径为$\theta_s = 0.267^\circ$的小圆盘。

::: definition 太阳常数与地外辐照度 {#def-solar-constant}
**辐照度**$G$是单位面积的辐射功率（$\mathrm{W/m^2}$）；**辐照量**$H$是它在一段时间（通常为一天或一年）内的时间积分（$\mathrm{MJ/m^2}$或$\mathrm{kWh/m^2}$）。**太阳常数**$G_{sc}$是在日地平均距离处、大气层外垂直于太阳光线的表面上的辐照度。卫星辐射测量给出太阳活动极小期$G_{sc} = 1360.8 \pm 0.5\,\mathrm{W/m^2}$（Kopp 和 Lean，2011），这里采用$1361\,\mathrm{W/m^2}$。由于轨道略呈椭圆，一年中第$n$天的地外法向辐照度近似为
$$
G_{on} = G_{sc}\left[1 + 0.033\cos\left(\frac{360^\circ\,n}{365}\right)\right],
$$ {#eq-gon}
在1月初（近日点）比平均值高约$3.3\,\%$，在7月初低于平均值。
:::

::: example 由太阳温度求太阳常数 {#ex-blackbody}
把太阳视为半径$R_s = 6.957\times10^{8}\,\mathrm{m}$、温度$5772\,\mathrm{K}$的黑体，距离$d = 1.496\times10^{11}\,\mathrm{m}$。求 (a) 太阳表面的辐射力；(b) 地球轨道处的辐照度；(c) 太阳能量中波长短于$1.107\,\mu\mathrm{m}$（硅的吸收边）的份额。
::: solution
(a) 斯特藩–玻尔兹曼定律：$E_b = \sigma T^4 = 5.670\times10^{-8} \times 5772^4 = 6.29\times10^{7}\,\mathrm{W/m^2}$，即$63\,\mathrm{MW/m^2}$。

(b) 总功率$4\pi R_s^2 E_b$散布在半径为$d$的球面上，所以
$$
G_{sc} = \sigma T^4\left(\frac{R_s}{d}\right)^2 = 6.29\times10^{7} \times \left(\frac{6.957\times10^{8}}{1.496\times10^{11}}\right)^2 = 6.29\times10^{7} \times 2.163\times10^{-5} = 1361\,\mathrm{W/m^2}.
$$
(c) 从$\lambda = 0$到$1.107\,\mu\mathrm{m}$对普朗克分布作数值积分（等价地，在[[heat-transfer/radiation]]的黑体辐射函数表中查$\lambda T = 6390\,\mu\mathrm{m\,K}$），得$F_{0-\lambda T} = 0.77$。

合理性检查：与实测$1361\,\mathrm{W/m^2}$的一致并非巧合——太阳的"有效温度"正是由它*定义*的。(c)表明$23\,\%$的太阳光光子能量太低，根本不能被硅吸收，这是限制光伏效率的第一项损失。
:::
:::

## 穿过大气层 {#sec-atmosphere}

在到达地面的途中，太阳光被吸收（紫外波段被臭氧吸收，红外波段被水蒸气和二氧化碳吸收）和散射（被分子散射，分子优先散射蓝光；以及被气溶胶和云滴散射）。到达地表的是直接来自日盘的**直射**辐射，加上从整个天空散射到地表的**散射**辐射。两者在水平面上之和是**水平面总辐照度**。在太阳高度角大的晴天，直射辐射占主导，总辐照度接近$1000\,\mathrm{W/m^2}$；在阴天，辐射几乎全是散射的，可能只有$100\,\mathrm{W/m^2}$或更少。

穿过大气的路径长度用**大气质量**来度量，即实际路径与太阳在天顶时的路径之比。对于平行平面大气和天顶角$\theta_z$，
$$
AM = \frac{1}{\cos\theta_z},
$$ {#eq-airmass}
在$\theta_z \approx 70^\circ$以内是足够的（超出后地球曲率变得重要）。AM0表示大气层外。IEC 60904 中定义的光伏组件**标准测试条件**（STC）是：辐照度$1000\,\mathrm{W/m^2}$，AM1.5总辐射光谱（$\theta_z = 48.2^\circ$），电池温度$25\,^\circ\mathrm{C}$。组件的"峰值"额定功率（$\mathrm{W_p}$）是其在STC下的功率。

在一天或一个月内，水平面上实测辐照量$H$与水平面上地外辐照量$H_0$之比是**晴空指数**$K_T = H/H_0$。它从晴朗沙漠气候的约$0.7$–$0.75$到多云冬季月份的$0.3$或更低，而以$K_T$表示的相关式（例如 Duffie、Beckman 和 Blair 所汇集的）把总辐照量分为直射和散射两部分。作为粗略的数量级，西北欧的年水平面总辐照量约为$900$–$1200\,\mathrm{kWh/m^2}$，日照最充足的沙漠为$2000$–$2500\,\mathrm{kWh/m^2}$——相差约两倍半，远小于不同场址之间风能的差别。

## 太阳位置的几何 {#sec-geometry}

要预测集热器上的辐射，需要知道太阳光线与集热器法线之间的夹角。从地球上一点看，太阳方向由三个角确定：**纬度**$\phi$（北纬为正）；**赤纬**$\delta$——太阳正午时太阳直射点所在的纬度，一年中在$\pm 23.45^\circ$之间变化；以及**时角**$\omega$，即自太阳正午以来地球转过的角度，每小时$15^\circ$，上午为负，下午为正。太阳时与钟表时间的差别在于相对于时区中央经线的经度差和时差（最多约$16$分钟）。

赤纬可用库珀（Cooper）公式（1969）以工程上足够的精度给出：
$$
\delta = 23.45^\circ \sin\left(360^\circ\,\frac{284 + n}{365}\right),
$$ {#eq-cooper}
其中$n$是一年中的日序（1月1日$n = 1$）。

::: proposition 天顶角、日落时角与倾斜面上的入射角 {#prop-zenith}
在纬度$\phi$、赤纬$\delta$和时角$\omega$下，太阳天顶角$\theta_z$（太阳光线与铅垂线的夹角）满足
$$
\cos\theta_z = \sin\phi\sin\delta + \cos\phi\cos\delta\cos\omega ,
$$ {#eq-zenith}
太阳高度角为$\alpha_s = 90^\circ - \theta_z$，太阳在时角$\omega_s$处落下，
$$
\cos\omega_s = -\tan\phi\tan\delta ,
$$ {#eq-sunset}
所以昼长为$2\omega_s/15^\circ$小时。对北半球朝正南、与水平面倾角为$\beta$的表面，直射辐射的入射角$\theta$满足
$$
\cos\theta = \sin(\phi - \beta)\sin\delta + \cos(\phi - \beta)\cos\delta\cos\omega .
$$ {#eq-tilt}
:::

::: proof
采用以地心为原点的坐标系，$z$轴沿极轴，$x$轴位于所考虑时刻该地点的当地子午面内。与日地距离相比，忽略地球的大小，所以各处光线平行。指向太阳的单位向量相对赤道面的仰角为$\delta$（按赤纬的定义），并相对当地子午面转过时角$\omega$：
$$
\mathbf{s} = (\cos\delta\cos\omega,\ \cos\delta\sin\omega,\ \sin\delta).
$$
纬度$\phi$处的当地铅垂线位于子午面内：$\mathbf{n} = (\cos\phi,\ 0,\ \sin\phi)$。于是$\cos\theta_z = \mathbf{n}\cdot\mathbf{s}$，即[[#eq-zenith]]。日落时$\theta_z = 90^\circ$，即$\cos\theta_z = 0$，得$\cos\omega_s = -\sin\phi\sin\delta/(\cos\phi\cos\delta) = -\tan\phi\tan\delta$（若右边小于$-1$，太阳永不落下；大于$1$，太阳永不升起）。对倾斜面：把朝南的平面向赤道方向倾斜$\beta$，使其法线指向同一子午线上纬度为$\phi - \beta$的地点的铅垂方向。因此法线为$(\cos(\phi-\beta), 0, \sin(\phi-\beta))$，同样的点积给出[[#eq-tilt]]。
:::

::: proposition 水平面上的日地外辐照量 {#prop-h0}
忽略一天内赤纬的变化，从日出到日落水平面上的地外辐照量为
$$
H_0 = \frac{24 \times 3600\,\mathrm{s}}{\pi}\,G_{on}\left(\cos\phi\cos\delta\sin\omega_s + \omega_s\sin\phi\sin\delta\right),
$$ {#eq-h0}
其中$\omega_s$以弧度计。
:::

::: proof
太阳在地平线以上时，大气层外水平面上的辐照度为$G_{on}\cos\theta_z$。时角以每$86\,400\,\mathrm{s}$转$2\pi$弧度的速率均匀增加，所以$dt = (86\,400/2\pi)\,d\omega$。保持$\phi$、$\delta$和$G_{on}$不变，把[[#eq-zenith]]从$-\omega_s$积分到$\omega_s$，
$$
H_0 = \frac{86\,400}{2\pi}G_{on}\int_{-\omega_s}^{\omega_s}\left(\sin\phi\sin\delta + \cos\phi\cos\delta\cos\omega\right)d\omega = \frac{86\,400}{2\pi}G_{on}\left(2\omega_s\sin\phi\sin\delta + 2\cos\phi\cos\delta\sin\omega_s\right),
$$
即[[#eq-h0]]。极限检验：在赤道、春秋分时，$\phi = \delta = 0$，$\omega_s = \pi/2$，所以对$G_{on} = 1361\,\mathrm{W/m^2}$，$H_0 = (86\,400/\pi)G_{on} = 37.4\,\mathrm{MJ/m^2}$——相当于满日照值乘以一天的有效份额$1/\pi$，这正是对白昼半天的$\cos\omega$取平均所预期的。
:::

::: widget plot
f: 24*3600/pi*1361*(1+0.033*cos(2*pi*x/365))*(cos(L*pi/180)*cos(0.40928*sin(2*pi*(284+x)/365))*sin(acos(clamp(-tan(L*pi/180)*tan(0.40928*sin(2*pi*(284+x)/365)),-1,1)))+acos(clamp(-tan(L*pi/180)*tan(0.40928*sin(2*pi*(284+x)/365)),-1,1))*sin(L*pi/180)*sin(0.40928*sin(2*pi*(284+x)/365)))/1000000
x: 1, 365
y: 0, 48
sliders: L=40:0:89:1
labels: H_0\ (\mathrm{MJ/m^2\ per\ day})
caption: 由[[#eq-h0]]和库珀赤纬公式得到的水平面上日地外辐照量随一年中日序的变化，纬度为$L$（北纬，度）。在$L = 0$时曲线几乎平坦，在春分和秋分有两个浅峰。移到$40^\circ$：夏季日辐照量是冬季的三倍。在$52^\circ$（伦敦、柏林），这一比值接近七。在北极圈（$66.6^\circ$）以北，冬季值降到零（极夜），而在夏至附近高纬度地区接收的辐射反而*多于*赤道，因为太阳不落。大气随后还会根据天气再去掉25–70 %。
:::

::: example 北纬40°的太阳位置与日辐照量 {#ex-sun-position}
对于北纬$40^\circ$的一个地点，在6月21日（$n = 172$），求 (a) 赤纬；(b) 太阳时10:00的太阳天顶角和高度角；(c) 该时刻在倾角为$30^\circ$的朝南组件上的入射角；(d) 昼长和日地外辐照量$H_0$。
::: solution
(a) 库珀公式：$\delta = 23.45\sin(360 \times 456/365) = 23.45^\circ$（夏至）。

(b) 太阳时10:00时$\omega = -30^\circ$。由[[#eq-zenith]]，
$$
\cos\theta_z = \sin 40^\circ\sin 23.45^\circ + \cos 40^\circ\cos 23.45^\circ\cos 30^\circ = 0.2559 + 0.6085 = 0.8644,
$$
所以$\theta_z = 30.2^\circ$，高度角为$59.8^\circ$。

(c) 在[[#eq-tilt]]中取$\phi - \beta = 10^\circ$：$\cos\theta = \sin 10^\circ\sin 23.45^\circ + \cos 10^\circ\cos 23.45^\circ\cos 30^\circ = 0.0691 + 0.7824 = 0.8515$，所以$\theta = 31.6^\circ$。在仲夏的这一时刻，$30^\circ$倾角比水平面略差；倾斜的好处体现在春、秋和冬季。

(d) $\cos\omega_s = -\tan 40^\circ\tan 23.45^\circ = -0.3640$，所以$\omega_s = 111.3^\circ = 1.943\,\mathrm{rad}$；昼长$2 \times 111.3/15 = 14.8\,\mathrm{h}$。取$G_{on} = 1361[1 + 0.033\cos(360 \times 172/365)] = 1316\,\mathrm{W/m^2}$，
$$
H_0 = \frac{86\,400}{\pi} \times 1316 \times \left(0.7660 \times 0.9174 \times 0.9315 + 1.943 \times 0.6428 \times 0.3979\right) = 41.7\,\mathrm{MJ/m^2} = 11.6\,\mathrm{kWh/m^2}.
$$
合理性检查：在这一纬度，6月的晴天在地面上约提供$8$–$9\,\mathrm{kWh/m^2}$，即$K_T \approx 0.7$——一致。注意6月的$G_{on}$比$G_{sc}$*低*$3\,\%$，因为地球接近远日点；北半球夏季温暖是由于太阳高度角和昼长，而不是距离。
:::
:::

::: warning 辐照度、辐照量与峰值功率
有三个量经常被混淆。**辐照度**（$\mathrm{W/m^2}$）是速率；**辐照量**（每天或每年的$\mathrm{kWh/m^2}$）是数量；组件的**峰值功率**（$\mathrm{W_p}$或$\mathrm{kW_p}$）是其在$1000\,\mathrm{W/m^2}$下的额定值，而不是其平均输出。中欧一套"$5\,\mathrm{kW}$"屋顶系统的全年平均功率约为$0.5\,\mathrm{kW}$。另外还有两个陷阱：[[#eq-zenith]]和[[#eq-h0]]中三角函数内的角度以度计，但乘在$\sin\phi\sin\delta$上的$\omega_s$必须以**弧度**计；时角用的是**太阳**时，而不是钟表时间——夏季（夏令时）用钟表时间会使太阳正午偏移一小时或更多。
:::

## 太阳能集热器 {#sec-collectors}

**平板集热器**由一块黑色吸热板组成，通常是铜或铝，带有光谱选择性涂层（对太阳光吸收率高，对红外发射率低），与通水或防冻液的管子相连，上面盖一层或两层玻璃，装在保温箱中。太阳光透过玻璃被吸收；玻璃对温热的吸热板发出的长波红外不透明，加上静止的空气层，共同减少了损失。**真空管**集热器完全除去了空气，减少了对流损失，所以在较高温度下或寒冷天气中也能良好工作。

吸热板的稳态能量平衡很简单：吸收的太阳辐射进，对环境的热损失出，差值由流体带走。按单位集热器面积$A_c$计，吸收的辐射为$S = (\tau\alpha)G_T$，其中$G_T$是集热器平面上的辐照度，$(\tau\alpha)$是盖板与吸热板的透射率–吸收率乘积（对良好的有盖板集热器在接近垂直入射时约为$0.8$）。顶部、背部和边缘的损失归并为总热损失系数$U_L$（$\mathrm{W/m^2K}$），乘以吸热板平均温度与环境温度之差。难办的是吸热板温度未知；已知的是进口流体温度。Hottel–Whillier–Bliss 方程解决了这个问题。

::: proposition Hottel–Whillier–Bliss 方程 {#prop-hwb}
面积为$A_c$、单位面积吸收辐射为$S$、热损失系数为$U_L$、集热器效率因子为$F'$的集热器，加热质量流量为$\dot m$、比热容为$c_p$、进口温度为$T_i$的流体，环境温度为$T_a$。有用得热量为
$$
\dot Q_u = A_c F_R\left[S - U_L(T_i - T_a)\right],
\qquad
F_R = \frac{\dot m c_p}{A_c U_L}\left[1 - \exp\left(-\frac{A_c U_L F'}{\dot m c_p}\right)\right],
$$ {#eq-hwb}
其中$F_R$（$< F' < 1$）是**热迁移因子**。瞬时效率$\eta = \dot Q_u/(A_c G_T)$是$(T_i - T_a)/G_T$的线性函数：
$$
\eta = F_R(\tau\alpha) - F_R U_L\,\frac{T_i - T_a}{G_T}.
$$ {#eq-collector-eff}
:::

::: proof
假设条件：稳态；$U_L$、$S$和$F'$在集热器上均匀；物性恒定；流体沿管子在$y$方向流过长度$L$，总宽度为$W$，所以$A_c = WL$。因子$F'$由管间吸热板的肋片分析以及结合热阻和管壁热阻推导得出（Duffie、Beckman 和 Blair，第6章），它是实际得热量与整块吸热板都处于当地流体温度$T_f$时的得热量之比；所以单位流程长度的得热量为$W F'[S - U_L(T_f - T_a)]$。

对$y$与$y + dy$之间的流体作能量平衡，得
$$
\dot m c_p\,\frac{dT_f}{dy} = W F'\left[S - U_L(T_f - T_a)\right].
$$
令$\theta = T_f - T_a - S/U_L$；则$d\theta/dy = -(W F' U_L/\dot m c_p)\,\theta$，所以$\theta$按指数衰减，在出口处
$$
\frac{\theta_o}{\theta_i} = \exp\left(-\frac{A_c U_L F'}{\dot m c_p}\right).
$$
有用得热量为$\dot Q_u = \dot m c_p(T_o - T_i) = \dot m c_p(\theta_o - \theta_i) = -\dot m c_p\theta_i\left[1 - \exp(-A_cU_LF'/\dot m c_p)\right]$。由于$-\theta_i = [S - U_L(T_i - T_a)]/U_L$，这就是[[#eq-hwb]]。除以$A_c G_T$并利用$S = (\tau\alpha)G_T$即得[[#eq-collector-eff]]。

极限情形：$\dot m \to \infty$时指数展开为$1 - A_cU_LF'/\dot mc_p$，$F_R \to F'$（流体几乎不升温，所以整块吸热板都接近$T_i$）；$\dot m \to 0$时$F_R \to 0$（流体以闷晒温度离开，带走的热量很少）。
:::

效率直线[[#eq-collector-eff]]是集热器测试和比较的方式（标准测试 ISO 9806 用它——通常加上一个二次项——拟合实测点）。其截距$F_R(\tau\alpha)$是光学效率，在流体以环境温度进入时达到；其斜率$F_RU_L$衡量损失。该直线在**闷晒**条件$T_i - T_a = S/U_L$处降到零，这是无流体的集热器在充足阳光下所达到的温度——对良好的有盖板集热器远高于$100\,^\circ\mathrm{C}$，这就是系统需要防沸腾保护的原因。

::: widget plot
f: max(a - b*x, 0); max(0.90 - 15*x, 0); max(0.65 - 1.5*x, 0)
x: 0, 0.2
y: 0, 1
sliders: a=0.75:0.5:0.9:0.01; b=4.5:1:20:0.5
labels: \text{有盖板平板（滑块）}; \text{无盖板（示意）}; \text{真空管（示意）}
caption: 由[[#eq-collector-eff]]得到的集热器效率随归一化温差$(T_i - T_a)/G_T$（$\mathrm{m^2K/W}$）的变化；滑块曲线的截距为$a = F_R(\tau\alpha)$，斜率为$b = F_RU_L$（W/m²K），两条固定曲线采用的示意值分别是无盖板游泳池吸热器和真空管集热器的典型值。在默认滑块下，约$0.014$以下无盖板吸热器最好（夏季泳池加热），约$0.014$到$0.033$之间有盖板平板最好（温和天气下的生活热水），此后是真空管；在$0.1$及以上（工业用热、冬季），只有真空管仍能收集有用热量。正确的选择取决于工作温度，而不是峰值效率。
:::

::: example 生活热水集热器的输出 {#ex-collector}
一台面积$2.0\,\mathrm{m^2}$的有盖板集热器，$(\tau\alpha) = 0.80$，$U_L = 5.0\,\mathrm{W/m^2K}$，$F' = 0.92$。水（$c_p = 4180\,\mathrm{J/kg\,K}$）以$0.030\,\mathrm{kg/s}$流动，进口温度$40\,^\circ\mathrm{C}$；环境温度$20\,^\circ\mathrm{C}$，集热器平面辐照度$800\,\mathrm{W/m^2}$。求$F_R$、有用得热量、效率和出口温度。
::: solution
吸收辐射$S = 0.80 \times 800 = 640\,\mathrm{W/m^2}$。热容流率$\dot mc_p = 0.030 \times 4180 = 125.4\,\mathrm{W/K}$；$A_cU_LF'/\dot mc_p = 2.0 \times 5.0 \times 0.92/125.4 = 0.0734$。由[[#eq-hwb]]，
$$
F_R = \frac{125.4}{2.0 \times 5.0}\left(1 - e^{-0.0734}\right) = 12.54 \times 0.0707 = 0.887 .
$$
有用得热量：$\dot Q_u = 2.0 \times 0.887 \times [640 - 5.0 \times (40 - 20)] = 2.0 \times 0.887 \times 540 = 958\,\mathrm{W}$。

效率：$\eta = 958/(2.0 \times 800) = 0.599$。出口：$T_o = 40 + 958/125.4 = 47.6\,^\circ\mathrm{C}$。

合理性检查：由[[#eq-collector-eff]]，$F_R(\tau\alpha) = 0.710$，$F_RU_L = 4.44\,\mathrm{W/m^2K}$，所以$\eta = 0.710 - 4.44 \times 20/800 = 0.599$——相同。闷晒温升为$S/U_L = 128\,\mathrm{K}$，即无流动时约$148\,^\circ\mathrm{C}$。
:::
:::

### 聚光集热器

要让热机在有用的温度下运行——[[energy-systems/steam-power-plants]]中的汽轮机需要几百度——平板的损失就太大了：在$400\,^\circ\mathrm{C}$时其损失$U_L\Delta T$将超过全部太阳输入。办法是用反射镜或透镜在大**采光口**$A_a$上收集太阳光，聚焦到小的**接收器**$A_r$上，使与$A_r$成正比的损失相对于与$A_a$成正比的得热很小。**聚光比**为$C = A_a/A_r$。槽式抛物面（线聚焦，$C$约为$50$–$100$量级）和配定日镜场的塔式（点聚焦，$C$为几百到一千以上）是聚光太阳能热发电的商业形式。

::: proposition 聚光的热力学极限 {#prop-concentration}
对于来自角半径为$\theta_s$的光源、在空气（折射率$1$）中聚光的辐射，聚光比不能超过
$$
C_{\max,3D} = \frac{1}{\sin^2\theta_s} \quad\text{（点聚焦）}, \qquad C_{\max,2D} = \frac{1}{\sin\theta_s} \quad\text{（线聚焦）}.
$$
对太阳，$\theta_s = 0.267^\circ$，所以$C_{\max,3D} \approx 46\,000$，$C_{\max,2D} \approx 215$。来自整个半球（$\theta_s = 90^\circ$）的散射辐射根本无法聚光。
:::

::: proof
假设太阳是温度为$T_s$的黑色圆盘，光学系统无损失，接收器为黑体。到达采光口的功率为$A_a G = A_a\sigma T_s^4 (R_s/d)^2 = A_a\sigma T_s^4\sin^2\theta_s$（[[#ex-blackbody]]的结果，$\sin\theta_s = R_s/d$）。理想光学系统把它全部送到接收器：吸收功率为$C A_r\sigma T_s^4\sin^2\theta_s$。现在设接收器温度为$T_s$。它总共发射$A_r\sigma T_s^4$，至多全部返回太阳。第二定律禁止热量从太阳净流向同温的接收器，所以吸收功率不得超过接收器所能送回的功率：
$$
C A_r\sigma T_s^4\sin^2\theta_s \le A_r\sigma T_s^4 \quad\Longrightarrow\quad C \le \frac{1}{\sin^2\theta_s}.
$$
如果$C$更大，接收器仅靠太阳辐射就会被加热到$T_s$以上——这是第二类永动机。线聚焦情形按单位长度重复这一论证，太阳的角宽度$2\theta_s$只出现在一个平面内，得到$1/\sin\theta_s$。对散射光，"光源"充满半球，$\sin\theta_s = 1$，$C \le 1$。（一般的表述是光学扩展量守恒；见 Duffie、Beckman 和 Blair。）
:::

对工程的推论是：聚光器只收集**直射**分量，并且必须跟踪太阳，所以只建在法向直射辐照度高且稳定的地方——沙漠，通常每年法向直射辐照量在$2000\,\mathrm{kWh/m^2}$或以上。同时利用散射光的平板集热器和光伏组件则适用于多云的气候。

## 光伏转换 {#sec-pv}

光伏电池是一个半导体结。能量高于**禁带宽度**$E_g$（硅为1.12 eV）的光子把电子从价带激发到导带，留下一个空穴。p–n结的内建电场在电子和空穴复合之前把它们分开，驱动电流流过外电路。由禁带宽度直接导致两项损失。能量低于$E_g$的光子穿过而不被吸收（对硅即[[#ex-blackbody]]中的$23\,\%$）；能量高于$E_g$的光子被吸收，但多余的能量在载流子弛豫到带边的过程中于皮秒内以热的形式损失（**热化**）。禁带宽度低浪费了光谱的蓝端，高则浪费了红端，最佳的单一禁带宽度是一种折中。

在电学上，受光照的电池相当于一个电流源与一个二极管并联。

::: definition 单二极管模型、短路电流、开路电压与填充因子 {#def-pv}
在理想单二极管模型中，电压为$V$时的端电流$I$为
$$
I = I_L - I_0\left[\exp\left(\frac{V}{nV_T}\right) - 1\right],
$$ {#eq-diode}
其中$I_L$是光生电流（与辐照度成正比），$I_0$是二极管饱和电流（强烈依赖于温度），$n$是理想因子（$1$–$2$），$V_T = k_BT/q$是热电压（$25\,^\circ\mathrm{C}$时为$25.69\,\mathrm{mV}$）。**短路电流**为$I_{sc} = I_L$；**开路电压**（$I = 0$时）为
$$
V_{oc} = nV_T\ln\left(\frac{I_L}{I_0} + 1\right).
$$
**最大功率点**$(V_m, I_m)$使$P = VI$最大；**填充因子**为$FF = V_mI_m/(V_{oc}I_{sc})$，在电池面积$A$上辐照度为$G$时，电池效率为$\eta = V_mI_m/(GA)$。实际电池还有串联电阻和并联电阻，它们会降低填充因子。
:::

::: proposition 理想电池的最大功率点 {#prop-mpp}
对[[#eq-diode]]的电池，令$x = V_m/(nV_T)$。则$x$是方程
$$
(1 + x)\,e^{x} = 1 + \frac{I_L}{I_0}
$$ {#eq-mpp}
的根，且$I_m = (I_L + I_0)\,x/(1 + x) \approx I_L\,x/(1+x)$。
:::

::: proof
$P(V) = VI(V)$，所以在最大值处$dP/dV = I + V\,dI/dV = 0$。由[[#eq-diode]]，$dI/dV = -(I_0/nV_T)e^{V/nV_T}$。代入$V = xnV_T$：
$$
I_L - I_0(e^{x} - 1) - x I_0 e^{x} = 0 \quad\Longrightarrow\quad (1 + x)e^{x} = 1 + \frac{I_L}{I_0}.
$$
左边从$x = 0$处的$1$开始单调增加，所以恰有一个根，而$d^2P/dV^2 = 2\,dI/dV + V\,d^2I/dV^2 < 0$（$V > 0$时两项都为负）证实这是极大值。于是$I_m = I_L + I_0 - I_0e^{x} = I_0 x e^{x}$，利用根方程$I_0 e^{x} = (I_L + I_0)/(1 + x)$得$I_m = (I_L + I_0)x/(1 + x)$。由于$I_L/I_0$为$10^{10}$–$10^{13}$量级，$x$约为$20$–$30$，所以$V_m$比$V_{oc}$低几个$nV_T$，$I_m$比$I_{sc}$低百分之几——这就是理想填充因子超过$0.8$的原因。
:::

::: widget plot
f: S*10 - 1e-11*((T+273.15)/298.15)^3*exp(12997*(1/298.15-1/(T+273.15)))*(exp(x/(0.00008617*(T+273.15)))-1); x*(S*10 - 1e-11*((T+273.15)/298.15)^3*exp(12997*(1/298.15-1/(T+273.15)))*(exp(x/(0.00008617*(T+273.15)))-1))
x: 0, 0.8
y: 0, 13
sliders: S=1:0.1:1.2:0.05; T=25:0:80:1
labels: I\ (\mathrm{A}); P = VI\ (\mathrm{W})
caption: 理想硅电池（一个太阳下$I_{sc} = 10\,\mathrm{A}$，$25\,^\circ\mathrm{C}$时$I_0 = 10^{-11}\,\mathrm{A}$，$n = 1$，$I_0 \propto T^3 e^{-E_g/k_BT}$，$E_g = 1.12\,\mathrm{eV}$）的电流–电压和功率–电压曲线随电压（V）的变化，辐照度$S$以"太阳"为单位，电池温度$T$以°C计。功率曲线在$I$–$V$曲线的拐角处达到峰值，STC下约为$0.63\,\mathrm{V}$和$6.0\,\mathrm{W}$。降低$S$：电流按比例下降，而电压只按对数下降，所以弱光下效率保持得很好。把$T$提高到$60\,^\circ\mathrm{C}$：$V_{oc}$下降约$58\,\mathrm{mV}$（$-1.65\,\mathrm{mV/K}$），最大功率下降约$11\,\%$——大致为$-0.3\,\%/\mathrm{K}$，即组件参数表上所印的温度系数。
:::

::: example 电池的最大功率点 {#ex-mpp}
一块电池在$25\,^\circ\mathrm{C}$下$I_L = 10.0\,\mathrm{A}$，$I_0 = 1.0\times10^{-11}\,\mathrm{A}$，$n = 1$。求$V_{oc}$、最大功率点、填充因子，以及电池面积为$0.0243\,\mathrm{m^2}$（$156\,\mathrm{mm}$方形电池）、辐照度$1000\,\mathrm{W/m^2}$时的效率。
::: solution
$V_T = 1.381\times10^{-23} \times 298.15/1.602\times10^{-19} = 0.02569\,\mathrm{V}$。于是$V_{oc} = 0.02569\ln(10^{12} + 1) = 0.02569 \times 27.63 = 0.710\,\mathrm{V}$。

由[[#eq-mpp]]求最大功率点：用牛顿法或迭代法解$x + \ln(1 + x) = \ln(10^{12} + 1) = 27.631$：$x = 27.631 - \ln(1 + x)$；从$x = 24$开始，$x = 27.631 - \ln 25 = 24.412$，然后$27.631 - \ln 25.412 = 24.396$，收敛于$x = 24.396$。所以
$$
V_m = 24.396 \times 0.02569 = 0.627\,\mathrm{V}, \qquad I_m = 10.0 \times \frac{24.396}{25.396} = 9.61\,\mathrm{A}, \qquad P_m = 6.02\,\mathrm{W}.
$$
填充因子$FF = 6.02/(0.710 \times 10.0) = 0.848$。效率$\eta = 6.02/(1000 \times 0.0243) = 0.248$。

合理性检查：商用硅电池的$V_{oc}$约为$0.70$–$0.74\,\mathrm{V}$，填充因子为$0.80$–$0.85$，所以采用这些参数的理想模型接近一块优良的现代电池；实际电池还会因串联电阻再损失一点。
:::
:::

### 极限与纪录

结合光谱、禁带宽度以及细致平衡所要求的不可避免的辐射复合，肖克利（Shockley）和奎伊瑟（Queisser）（1961）证明，单结电池的最大效率只取决于其禁带宽度和入射光谱。按AM1.5总辐射光谱重新计算，该极限在禁带宽度约$1.34\,\mathrm{eV}$处达到峰值，约为$33.7\,\%$（Rühle，2016）；对硅，计入其间接带隙所固有的俄歇复合，极限约为$29.4\,\%$（Richter 等，2013）。实验室硅电池已经接近这一极限：2025年4月，隆基报告了一块经ISFH认证、效率为$27.81\,\%$的背接触硅电池。由于电池之间的间隙、玻璃反射和连线，商用组件的效率低于其最好的电池，2020年代中期主流硅组件通常约为$20$–$23\,\%$。多结电池把多个禁带宽度叠加起来，使每一结吸收光谱的一部分，从而突破单结极限，在聚光下超过$40\,\%$，但其成本使它们只用于太空和聚光场合。

### 现场中的组件

电池串联成**组件**以提高电压，组件串联成**组串**，组串接入**逆变器**，逆变器跟踪最大功率点并转换为交流电。在现场，有三方面因素使输出低于STC额定值：辐照度通常低于$1000\,\mathrm{W/m^2}$；电池温度高于$25\,^\circ\mathrm{C}$；以及连线、逆变器、积尘、遮挡和组件之间失配造成的损失。电池温度由**额定工作电池温度**（NOCT，在$800\,\mathrm{W/m^2}$、环境$20\,^\circ\mathrm{C}$、风速$1\,\mathrm{m/s}$下测得的电池温度，通常为$42$–$48\,^\circ\mathrm{C}$）估算：
$$
T_c \approx T_a + \frac{\mathrm{NOCT} - 20\,^\circ\mathrm{C}}{800\,\mathrm{W/m^2}}\,G_T ,
$$ {#eq-noct}
功率用温度系数$\gamma$（晶体硅约为$-0.3$到$-0.4\,\%/\mathrm{K}$）作线性修正：
$$
P \approx P_\text{STC}\,\frac{G_T}{1000\,\mathrm{W/m^2}}\left[1 + \gamma(T_c - 25\,^\circ\mathrm{C})\right].
$$ {#eq-pv-temp}
这些是由组件参数表得出的近似式，足以用于估算；详细的仿真工具采用更完整的模型。

::: algorithm 估算光伏系统的年发电量 {#alg-pv-yield}
1. 按所选的倾角和朝向，从太阳能图集或该场址的典型气象年数据集中查得阵列平面上的年辐照量$H_T$（每年$\mathrm{kWh/m^2}$）（对固定阵列，倾角接近纬度时大致最大；跟踪系统可增加更多）。
2. 除以STC辐照度$1\,\mathrm{kW/m^2}$：$H_T/(1\,\mathrm{kW/m^2})$即每年的**峰值日照小时数**。
3. 选取**性能比**$PR$——实际发电量与阵列始终以其STC效率转换时的发电量之比——计及温度、弱光、连线、逆变器、积尘和可用率损失；设计良好的系统约达$0.75$–$0.85$。
4. 年发电量$E = P_\text{STC} \times (H_T/1\,\mathrm{kW/m^2}) \times PR$。**比发电量**$E/P_\text{STC}$（每kWp的kWh）用于比较场址和系统；容量因数为$E/(P_\text{STC} \times 8760\,\mathrm{h})$。
:::

::: example 炎热天气下的组件与屋顶系统的年发电量 {#ex-pv-system}
(a) 一块$400\,\mathrm{W_p}$组件的NOCT为$45\,^\circ\mathrm{C}$，$\gamma = -0.35\,\%/\mathrm{K}$。估算其在$1000\,\mathrm{W/m^2}$、环境温度$35\,^\circ\mathrm{C}$下的输出。(b) 一套由效率$21\,\%$的组件构成的$5.0\,\mathrm{kW_p}$屋顶阵列，其平面上每年接收$1200\,\mathrm{kWh/m^2}$。取$PR = 0.80$，估算年发电量、比发电量、容量因数和组件面积。
::: solution
(a) 由[[#eq-noct]]，$T_c = 35 + (45 - 20)/800 \times 1000 = 66.3\,^\circ\mathrm{C}$。由[[#eq-pv-temp]]，$P = 400 \times 1.0 \times [1 - 0.0035 \times 41.25] = 400 \times 0.856 = 342\,\mathrm{W}$——即使在充足阳光下也比额定值低$14\,\%$。

(b) 峰值日照小时数$= 1200\,\mathrm{h}$。年发电量$E = 5.0 \times 1200 \times 0.80 = 4800\,\mathrm{kWh}$。比发电量$= 960\,\mathrm{kWh/kW_p}$。容量因数$= 4800/(5.0 \times 8760) = 0.110$。组件面积$= 5.0\,\mathrm{kW}/(0.21 \times 1\,\mathrm{kW/m^2}) = 23.8\,\mathrm{m^2}$。

合理性检查：每年$4800\,\mathrm{kWh}$约相当于一个典型欧洲家庭的用电量（[[energy-systems/energy-overview]]），但其中大部分在夏季中午产生，而那时家庭用电最少——这正是[[energy-systems/energy-storage]]中需要储能的理由。$0.11$的容量因数是中欧固定式屋顶光伏的典型值。
:::
:::

::: quiz
一位太阳能塔设计者希望接收器温度达到$1000\,^\circ\mathrm{C}$，他问：一个总辐照度高、但经常有薄云的场址是否合适？关键的考虑是什么？
- [ ] 聚光器可以利用到达地面的任何光，所以重要的是总辐照度。
- [x] 聚光器只能聚焦直射分量；散射光无法聚光，所以法向直射辐照度必须高。
- [ ] 聚光不受限制，所以薄云可以用更多的反射镜来弥补。
- [ ] 接收器温度只取决于反射镜面积，与辐射类型无关。
::: solution
由[[#prop-concentration]]，来自很宽方向范围的光无法聚光；来自朦胧天空的散射辐射经过反射镜，却到不了接收器。聚光电站按法向直射辐照度选址。聚光比以$1/\sin^2\theta_s$为上限，而接收器温度取决于聚光后的热流密度，只有直射辐射才能提供它。
:::
:::

::: history
1839年，十九岁的埃德蒙·**贝克勒尔**（Edmond Becquerel）在其父亲巴黎的实验室中观察到，光照射在电解液中的电极上会产生电流——这是对光伏效应的首次观察。第一块实用电池出自贝尔电话实验室，达里尔·**蔡平**（Daryl Chapin）、卡尔文·**富勒**（Calvin Fuller）和杰拉尔德·**皮尔逊**（Gerald Pearson）于1954年4月展示了一块效率约为$6\,\%$的硅p–n结电池，原本用于为偏远的电话设备供电。1958年3月，*先锋1号*（*Vanguard 1*）成为第一颗由太阳能电池供电的卫星，而在太空中，质量和可靠性比成本更重要，太空应用支撑这项技术走过了二十年。1961年，威廉·**肖克利**（William Shockley）和汉斯-约阿希姆·**奎伊瑟**（Hans-Joachim Queisser）在《应用物理杂志》（*Journal of Applied Physics*）上发表了单结效率的细致平衡极限。在光热方面，麻省理工学院的霍伊特·**霍特尔**（Hoyt Hottel）和奥斯汀·**惠利尔**（Austin Whillier）于1958年发表了平板集热器性能分析，雷蒙德·**布利斯**（Raymond Bliss）于1959年在《太阳能》（*Solar Energy*）上用吸热板效率因子对其加以扩展，由此得到以三人命名的方程，它至今仍是集热器测试的基础。
:::

::: summary
- 太阳常数约为$1361\,\mathrm{W/m^2}$（把太阳视为$5772\,\mathrm{K}$的黑体）；在地面，晴空辐照度接近$1000\,\mathrm{W/m^2}$，由直射和散射两部分组成。
- 大气质量$1/\cos\theta_z$度量大气路径；光伏额定值在STC下给出：$1000\,\mathrm{W/m^2}$，AM1.5，$25\,^\circ\mathrm{C}$。
- $\cos\theta_z = \sin\phi\sin\delta + \cos\phi\cos\delta\cos\omega$；用$\phi - \beta$代替$\phi$得到朝赤道倾斜面上的入射角；$\cos\omega_s = -\tan\phi\tan\delta$确定昼长；积分得到日地外辐照量$H_0$。
- 平板集热器服从 Hottel–Whillier–Bliss 方程$\dot Q_u = A_cF_R[S - U_L(T_i - T_a)]$：效率随$(T_i - T_a)/G_T$线性下降，所以集热器类型要按工作温度选择。
- 第二定律把太阳的聚光比限制在$1/\sin^2\theta_s \approx 46\,000$，且只有直射辐射可以聚光。
- 光伏电池是一个带二极管的电流源；$V_{oc}$随光照按对数增长，最大功率点满足$(1+x)e^x = 1 + I_L/I_0$，填充因子约为$0.8$–$0.85$。
- 单结效率的上限约为$33.7\,\%$（肖克利–奎伊瑟极限），硅约为$29.4\,\%$；温度每升高一开尔文约损失$0.3$–$0.4\,\%$。
- 光伏年发电量$= P_\text{STC} \times$峰值日照小时数$\times PR$。
:::

## 习题 {#sec-exercises}

::: exercise 大气质量 {#exr-airmass level=1 check="2.92"}
用平行平面近似，求太阳天顶角为$70^\circ$时的大气质量。（输入大气质量，保留三位有效数字。）
::: solution
由[[#eq-airmass]]，$AM = 1/\cos 70^\circ = 1/0.3420 = 2.924$，即$2.92$。在这一天顶角下，平行平面公式已处于其适用范围的边缘；考虑大气曲率的公式给出的值略低。
:::
:::

::: exercise 二月中旬的赤纬 {#exr-declination level=1 check="-13.3"}
用库珀公式求2月15日（$n = 46$）的太阳赤纬。（以度为单位输入赤纬，保留一位小数，南纬为负。）
::: solution
$\delta = 23.45\sin(360 \times (284 + 46)/365) = 23.45\sin(325.5^\circ) = 23.45 \times (-0.5667) = -13.29^\circ$，即$-13.3^\circ$：太阳正午时太阳直射南纬$13.3^\circ$。
:::
:::

::: exercise 小型阵列的年发电量 {#exr-yield level=1 check="3608"}
一套$4.0\,\mathrm{kW_p}$阵列的平面上每年接收$1100\,\mathrm{kWh/m^2}$，性能比为$0.82$。用[[#alg-pv-yield]]求其年发电量。（以kWh为单位输入整数。）
::: solution
$E = 4.0 \times 1100 \times 0.82 = 3608\,\mathrm{kWh}$；比发电量$902\,\mathrm{kWh/kW_p}$，容量因数$0.103$。
:::
:::

::: exercise 冬季正午高度角 {#exr-noon level=2 check="14.6"}
由[[#eq-zenith]]证明太阳正午时$\theta_z = \lvert\phi - \delta\rvert$，并求北纬$52^\circ$、$\delta = -23.4^\circ$时的正午太阳高度角。（以度为单位输入高度角，保留一位小数。）
::: solution
正午时$\omega = 0$，所以$\cos\theta_z = \sin\phi\sin\delta + \cos\phi\cos\delta = \cos(\phi - \delta)$，因此$\theta_z = \lvert\phi - \delta\rvert$。这里$\theta_z = 52 + 23.4 = 75.4^\circ$，高度角为$90 - 75.4 = 14.6^\circ$。大气质量为$1/\cos 75.4^\circ \approx 4$，所以北欧冬季的阳光既倾斜又受到强烈衰减。
:::
:::

::: exercise 仲夏昼长 {#exr-daylength level=2 check="16.5"}
求北纬$52^\circ$、$\delta = 23.45^\circ$时的昼长（从日出到日落，忽略折射和日盘大小）。（以小时为单位输入昼长，保留一位小数。）
::: solution
由[[#eq-sunset]]，$\cos\omega_s = -\tan 52^\circ\tan 23.45^\circ = -1.2799 \times 0.4337 = -0.5551$，所以$\omega_s = 123.72^\circ$。昼长$= 2 \times 123.72/15 = 16.50\,\mathrm{h}$，即$16.5\,\mathrm{h}$。由于折射以及日出按日盘上缘定义，观测到的昼长要长几分钟。
:::
:::

::: exercise 由测试直线求集热器效率 {#exr-hwb level=2 check="0.55"}
某集热器的测试给出$F_R(\tau\alpha) = 0.75$，$F_RU_L = 4.5\,\mathrm{W/m^2K}$。求水以$50\,^\circ\mathrm{C}$进入、环境$10\,^\circ\mathrm{C}$、$G_T = 900\,\mathrm{W/m^2}$时的效率，以及$3.0\,\mathrm{m^2}$阵列的有用得热量。（以小数输入效率，保留两位小数。）
::: solution
由[[#eq-collector-eff]]，$\eta = 0.75 - 4.5 \times 40/900 = 0.75 - 0.20 = 0.55$。有用得热量$= 0.55 \times 3.0 \times 900 = 1485\,\mathrm{W}$。
:::
:::

::: exercise 夏日午后的组件 {#exr-noct level=2 check="281"}
一块$350\,\mathrm{W_p}$组件的NOCT为$44\,^\circ\mathrm{C}$，功率温度系数为$-0.34\,\%/\mathrm{K}$。用[[#eq-noct]]和[[#eq-pv-temp]]估算其在$G_T = 900\,\mathrm{W/m^2}$、环境$30\,^\circ\mathrm{C}$下的输出。（以W为单位输入功率，取整数。）
::: solution
$T_c = 30 + (44 - 20)/800 \times 900 = 30 + 27 = 57\,^\circ\mathrm{C}$。$P = 350 \times 0.9 \times [1 - 0.0034 \times 32] = 315 \times 0.8912 = 280.7\,\mathrm{W}$，即$281\,\mathrm{W}$。
:::
:::

::: exercise 线聚焦的聚光极限 {#exr-trough level=2 check="215"}
太阳的角半径满足$\sin\theta_s = R_s/d = 4.65\times10^{-3}$。由[[#prop-concentration]]求线聚焦（槽式）聚光器的最大可能聚光比，并解释为什么实际的槽式聚光器远低于此值。（输入最大聚光比，取整数。）
::: solution
$C_{\max,2D} = 1/\sin\theta_s = 1/(4.65\times10^{-3}) = 215.05$，即$215$。实际的槽式聚光器工作在$C$约为$50$–$100$量级，因为反射镜面形误差、跟踪误差和有限尺寸的接收管扩大了有效接收角，而且需要留有裕度使焦线保持在接收器上。
:::
:::

::: exercise 推导：最大功率电压 {#exr-mpp-derive level=3 check="627"}
(a) 从[[#eq-diode]]出发推导[[#eq-mpp]]。(b) 证明$V_{oc} - V_m = nV_T\ln(1 + x)$在极好的近似下成立。(c) 对$I_L/I_0 = 10^{12}$、$n = 1$、$V_T = 25.69\,\mathrm{mV}$，求$V_m$。（以mV为单位输入$V_m$，取整数。）
::: solution
(a) 见[[#prop-mpp]]的证明：$dP/dV = I + V\,dI/dV = 0$，$dI/dV = -(I_0/nV_T)e^{V/nV_T}$，得$(1 + x)e^x = 1 + I_L/I_0$。

(b) 取对数，$x + \ln(1 + x) = \ln(1 + I_L/I_0) = V_{oc}/nV_T$，所以在理想模型内$V_{oc} - V_m = nV_T\ln(1 + x)$精确成立。

(c) 迭代$x = 27.631 - \ln(1 + x)$得$x = 24.396$，所以$V_m = 24.396 \times 25.69 = 626.8\,\mathrm{mV}$，即$627\,\mathrm{mV}$。用(b)校核：$V_{oc} = 709.8\,\mathrm{mV}$，$nV_T\ln(25.396) = 83.1\,\mathrm{mV}$；$709.8 - 83.1 = 626.7\,\mathrm{mV}$，在舍入误差内相同。
:::
:::

::: exercise 太阳能接收器的最佳温度 {#exr-receiver level=3 check="1083"}
一个温度为$T$的黑色接收器处于聚光后的直射辐射下（聚光比$C$，直射辐照度$G_b$），只通过辐射散热，所以其效率为$\eta_r = 1 - \sigma T^4/(CG_b)$；它驱动一台在$T_a$下放热的卡诺热机。(a) 写出总效率$\eta(T)$及其取最大值的方程。(b) 对$C = 1000$、$G_b = 900\,\mathrm{W/m^2}$、$\sigma = 5.67\times10^{-8}\,\mathrm{W/m^2K^4}$、$T_a = 298\,\mathrm{K}$，求最佳接收器温度和最大效率。(c) 闷晒温度是多少？（以K为单位输入最佳接收器温度，取整数。）
::: solution
(a) $\eta = \left(1 - \dfrac{\sigma T^4}{CG_b}\right)\left(1 - \dfrac{T_a}{T}\right)$。令$d\eta/dT = 0$：
$$
-\frac{4\sigma T^3}{CG_b}\left(1 - \frac{T_a}{T}\right) + \left(1 - \frac{\sigma T^4}{CG_b}\right)\frac{T_a}{T^2} = 0 .
$$
接收器越热，卡诺效率越高，但辐射损失也越大；最佳值在两者之间取得平衡。

(b) 数值求解（二分法或牛顿法）得$T = 1083\,\mathrm{K}$。此时$\eta_r = 1 - 5.67\times10^{-8} \times 1083^4/(9.0\times10^{5}) = 0.913$，$\eta_\text{Carnot} = 1 - 298/1083 = 0.725$，$\eta = 0.662$。

(c) 闷晒（$\eta_r = 0$）：$T = (CG_b/\sigma)^{1/4} = (9.0\times10^{5}/5.67\times10^{-8})^{1/4} = 1996\,\mathrm{K}$。实际接收器还有对流和反射损失，动力循环也远非卡诺循环，所以塔式电站实际的光电效率只有这一理想数字的三分之一或更低；本题说明了为什么塔式（高$C$）可以比槽式运行更高温的循环。
:::
:::

::: exercise 设计：住宅的太阳能供应 {#exr-design level=3}
北纬$45^\circ$的一栋住宅每年用电$4000\,\mathrm{kWh}$，生活热水用热$3000\,\mathrm{kWh}$。其朝南屋顶（倾角$35^\circ$）有$30\,\mathrm{m^2}$可用面积，平面上每年接收约$1400\,\mathrm{kWh/m^2}$。比较：(i) 屋顶铺满光伏组件，用季节性能系数为$3$的电动热泵加热热水；(ii) $4\,\mathrm{m^2}$太阳能集热器供热水，其余铺光伏；(iii) 你偏好的任何组合。用[[#alg-pv-yield]]和假定的年集热器效率估算年能量，并讨论季节失配、储能以及你的选择。答案不唯一。
::: solution
一种示意性分析。(i) $30\,\mathrm{m^2}$效率$21\,\%$的组件为$6.3\,\mathrm{kW_p}$；取$PR = 0.8$，$E = 6.3 \times 1400 \times 0.8 = 7060\,\mathrm{kWh}$。用热泵供热水需电$3000/3 = 1000\,\mathrm{kWh}$，所以总需求为$5000\,\mathrm{kWh}$，低于光伏的年发电量——但光伏发电很大一部分出现在夏季中午，必须上网或储存；不配电池时自用率可能只有$30$–$40\,\%$。(ii) $4\,\mathrm{m^2}$集热器按约$40\,\%$的年系统效率提供$4 \times 1400 \times 0.40 = 2240\,\mathrm{kWh}$的热——约占热水需求的$75\,\%$，以$200$–$300\,\mathrm{L}$的水箱作为日储热；其余$26\,\mathrm{m^2}$光伏发电约$6100\,\mathrm{kWh}$。按每平方米计，集热器提供的能量约为光伏的两倍，但热的价值较低且不能上网；光伏加热泵每单位阳光提供$0.21 \times 0.8 \times 3 \approx 0.5$单位的热，而且更灵活。在$45^\circ$，冬季产出比夏季小好几倍（见$H_0$交互图），所以两种方案都不能单独满足冬季需求。好的答案应说明假设，比较提供的能量和避免的能量，并考虑成本和简便性（[[energy-systems/energy-economics-emissions]]）。
:::
:::
