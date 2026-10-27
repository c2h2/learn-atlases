火箭是唯一能在真空中工作的推进装置，因为它携带着它所抛出的一切。这一事实塑造了整个学科。吸气式发动机从大气中免费获取工质和大部分氧化剂；火箭则必须举起全部推进剂，还要举起用来加速那些稍后才燃烧的推进剂所需的推进剂。结果就是**火箭方程**，其中的对数使高速度增量在质量上变得指数般昂贵，并迫使运载火箭分级建造。本章的后半部分转向火箭喷管——燃气的热能在那里变成排气速度——以及把燃烧室的贡献（**特征速度**$c^*$）和喷管的贡献（**推力系数**$C_F$）分开的两个性能参数。

本章停留在性能和系统分析的层次——火箭方程、多级、喷管理论——与标准教材（Sutton 和 Biblarz；Hill 和 Peterson）相同。发动机类型本身，即化学火箭与电火箭，在[[propulsion/rocket-engines]]中比较；决定任务所需速度增量的轨道力学是[[orbital-mechanics/orbital-manoeuvres]]的主题。

## 火箭推力与比冲

把[[propulsion/thrust-efficiency]]的推力方程应用于没有进气口的装置：$\dot m_0 = 0$，全部排气质量流量$\dot m$都是箭上携带的推进剂。设喷管出口速度为$V_e$、出口压力为$p_e$、出口面积为$A_e$、环境压力为$p_a$，则
$$
F = \dot m V_e + (p_e - p_a)A_e = \dot m\,c .
$$ {#eq-rocket-thrust}
与吸气式发动机的推力不同，它不依赖于飞行速度——没有冲压阻力——但通过$p_a$依赖于高度。

::: definition 有效排气速度、比冲、总冲 {#def-isp}
火箭的**有效排气速度**为$c = F/\dot m = V_e + (p_e - p_a)A_e/\dot m$。**比冲**是单位推进剂重量流量的推力：
$$
I_{sp} = \frac{F}{\dot m\,g_0} = \frac{c}{g_0},\qquad g_0 = 9.80665\ \mathrm{m/s^2}\ (\text{标准重力加速度，一个固定的换算常数}),
$$
以秒为单位。推进剂组合的$I_{sp}$总要注明其条件：燃烧室压力、喷管面积比和环境压力（“海平面”或“真空”）。一次工作的**总冲**为$I_t = \int F\,\mathrm{d}t$，推力恒定时为$Ft_b = m_p c$。
:::

典型的公开值（除注明外为真空值）为：液氧-液氢发动机约$450\ \mathrm{s}$，液氧与煤油或甲烷为$310$–$350\ \mathrm{s}$，可贮存双组元推进剂和复合固体发动机为$280$–$300\ \mathrm{s}$，肼单组元推力器约$220$–$230\ \mathrm{s}$，电推力器为$1500$–$4000\ \mathrm{s}$，但其推力极小（[[propulsion/rocket-engines]]）。

## 火箭方程

::: proposition 齐奥尔科夫斯基火箭方程 {#prop-tsiolkovsky}
瞬时质量为$m$的火箭以相对于自身恒定的有效排气速度$c$排出推进剂，在无外力时获得的速度增量为
$$
\Delta v = c\,\ln\frac{m_0}{m_f} = I_{sp}\,g_0\,\ln R ,
$$ {#eq-rocket-equation}
其中$m_0$为初始质量，$m_f$为最终质量，$R = m_0/m_f$为**质量比**。所需推进剂为$m_p = m_0\left(1 - e^{-\Delta v/c}\right)$。
:::

::: proof
在惯性系中，时刻$t$火箭质量为$m$、速度为$v$。在$\mathrm{d}t$内它以速度$v - c$（相对火箭以有效排气速度向后）排出质量$-\mathrm{d}m > 0$（因为$\mathrm{d}m < 0$），自身变为$v + \mathrm{d}v$下的$m + \mathrm{d}m$。无外力时动量守恒：
$$
m v = (m + \mathrm{d}m)(v + \mathrm{d}v) + (-\mathrm{d}m)(v - c).
$$
展开并略去二阶项$\mathrm{d}m\,\mathrm{d}v$，剩下$0 = m\,\mathrm{d}v + c\,\mathrm{d}m$，即
$$
\mathrm{d}v = -c\,\frac{\mathrm{d}m}{m}.
$$
在$c$恒定时从$m_0$积分到$m_f$，得$\Delta v = c\ln(m_0/m_f)$。使用**有效**速度$c$计入了压力推力：以喷管出口为控制面的动量论证给出作用在火箭上的力$\dot m c$，这正是$m\,\mathrm{d}v/\mathrm{d}t = -c\,\mathrm{d}m/\mathrm{d}t$所表达的。假设：无重力、阻力或其他外力；$c$恒定（环境压力恒定，发动机工作点恒定）；推进剂连续排出。结果与推进剂燃烧的快慢无关。
:::

对数就是全部要点。$\Delta v$加倍，质量比就要**平方**：在$I_{sp} = 300\ \mathrm{s}$时，$3\ \mathrm{km/s}$的速度增量需要$R = 2.77$，$6\ \mathrm{km/s}$需要$R = 7.68$，$9\ \mathrm{km/s}$需要$R = 21.3$。当$\Delta v$是$c$的好几倍时，推进剂质量使其他一切相形见绌。

::: widget plot
f: I*9.80665*ln(x)/1000
x: 1, 25
y: 0, 15
sliders: I=300:200:460:1
labels: \Delta v\ (\mathrm{km/s})
hlines: 9.3
caption: 比冲为$I$（s）时，以 km/s 计的理想速度增量对质量比$R = m_0/m_f$的曲线。水平线是包括损失在内进入近地轨道的典型$\Delta v$，约$9.3\ \mathrm{km/s}$。求出$I = 300$和$I = 450\ \mathrm{s}$时所需的质量比；然后记住，贮箱、发动机和结构必须与有效载荷一起装进最终质量$m_f$之中。
:::

::: example 单级能入轨吗？ {#ex-ssto}
发射到近地轨道包括重力损失和阻力损失约需$\Delta v = 9.3\ \mathrm{km/s}$。一个单级的$I_{sp} = 450\ \mathrm{s}$（氢氧发动机在上升过程中的平均值），**结构系数**$\varepsilon = m_s/(m_s + m_p) = 0.08$或$0.12$，其中$m_s$为贮箱、发动机和结构的质量。起飞质量中有多大比例可以是有效载荷？
::: solution
$R = \exp\left(9300/(450 \times 9.80665)\right) = 8.23$，所以$m_f/m_0 = 0.1216$：起飞质量的 87.8 % 必须是推进剂。最终质量是结构加有效载荷，$m_f = m_s + m_L$，其中$m_s = \varepsilon(m_s + m_p) = \varepsilon(m_0 - m_L)$。因此
$$
\frac{m_L}{m_0} = \frac{1/R - \varepsilon}{1 - \varepsilon} = \frac{0.1216 - 0.08}{0.92} = 0.045\quad(\varepsilon = 0.08),\qquad
\frac{0.1216 - 0.12}{0.88} = 0.0018\quad(\varepsilon = 0.12).
$$
**校核。** 结构乐观时，有效载荷为 4.5 %；对于大型、轻质、带绝热的氢贮箱，结构取现实值时几乎为零——而且结果对$\varepsilon$或$I_{sp}$的微小误差极其敏感。这就是为什么现役的每一种轨道运载火箭（截至2026年）都至少采用两级。
:::
:::

### 损失：重力、阻力与控制

实际的上升过程并非无外力。沿飞行轨迹，设航迹角（相对水平面）为$\theta$、阻力为$D$，
$$
m\frac{\mathrm{d}v}{\mathrm{d}t} = F - D - mg\sin\theta
\qquad\Longrightarrow\qquad
\Delta v = c\ln R - \int_0^{t_b} g\sin\theta\,\mathrm{d}t - \int_0^{t_b}\frac{D}{m}\,\mathrm{d}t ,
$$
这里推力沿速度方向（否则还会出现**控制损失**）。**重力损失**$\int g\sin\theta\,\mathrm{d}t$在垂直爬升时最大，并随工作时间增长——这是起飞时采用高推重比的有力论据，因为勉强能举起自身的火箭会把推进剂花在支撑自己上。运载火箭很早就开始转弯，使推力转向水平（“重力转弯”）。对轨道发射，重力损失通常约为$1$–$1.5\ \mathrm{km/s}$量级，阻力损失约为$0.1$–$0.3\ \mathrm{km/s}$，加上约$7.8\ \mathrm{km/s}$的轨道速度，再减去地球自转的向东速度，就得到熟悉的$9$–$10\ \mathrm{km/s}$预算。

::: example 垂直工作段的重力损失 {#ex-gravity-loss}
一枚$I_{sp} = 300\ \mathrm{s}$、质量比为 4 的探空火箭垂直向上工作$150\ \mathrm{s}$。忽略阻力和$g$随高度的变化，求其关机速度。
::: solution
理想值：$\Delta v = 300 \times 9.80665 \times \ln 4 = 4078\ \mathrm{m/s}$。垂直工作（$\sin\theta = 1$）的重力损失：$g\,t_b = 9.81 \times 150 = 1471\ \mathrm{m/s}$。关机速度$= 4078 - 1471 = 2607\ \mathrm{m/s}$。

**校核。** 理想$\Delta v$的三分之一损失给了重力。在$50\ \mathrm{s}$内烧完同样的推进剂可把损失减到$490\ \mathrm{m/s}$——但需要三倍的推力、更重的发动机和更高的加速度载荷。选择推力水平是重力损失与发动机质量之间的权衡。
:::
:::

## 多级

多级在推进剂用完后立即抛掉结构，使后面的级不必加速空贮箱。对按顺序点火的$N$级飞行器，每一级$i$（以其上方的一切作为其“有效载荷”）贡献$c_i\ln R_i$，总量为$\Delta v = \sum_i c_i\ln R_i$。

::: definition 级的质量比 {#def-stage}
对第$i$级，设$m_{0i}$为其点火时的质量（该级加其上方的一切），$m_{pi}$为其推进剂，$m_{si}$为其结构，$m_{L i} = m_{0,i+1}$为其上方的质量。则**结构系数**为$\varepsilon_i = m_{si}/(m_{si} + m_{pi})$，**有效载荷比**为$\pi_i = m_{Li}/m_{0i}$，**质量比**为$R_i = m_{0i}/(m_{0i} - m_{pi})$。三者的关系为
$$
\pi_i = \frac{1/R_i - \varepsilon_i}{1 - \varepsilon_i},
$$
飞行器的总有效载荷比为$m_L/m_0 = \prod_i \pi_i$。
:::

（这一关系的推导与[[#ex-ssto]]完全相同，只是用于一级。）

::: proposition 各级技术相同时的最优分级 {#prop-staging}
若全部$N$级具有相同的有效排气速度$c$和相同的结构系数$\varepsilon$，则对所需的总$\Delta v$，当各级质量比相同即$R_i = e^{\Delta v/(Nc)}$时，总有效载荷比最大，此时
$$
\frac{m_L}{m_0} = \left(\frac{e^{-\Delta v/(Nc)} - \varepsilon}{1 - \varepsilon}\right)^{N} .
$$ {#eq-staging}
:::

::: proof
记$x_i = \ln R_i$；约束为$\sum x_i = \Delta v/c$，我们要使$\ln(m_L/m_0) = \sum_i \ln\pi_i = \sum_i g(x_i) - N\ln(1 - \varepsilon)$最大，其中$g(x) = \ln(e^{-x} - \varepsilon)$（对$e^{-x} > \varepsilon$有定义，即每一级都携带正的有效载荷）。其导数为
$$
g'(x) = -\frac{e^{-x}}{e^{-x} - \varepsilon} = -\frac{1}{1 - \varepsilon e^{x}},\qquad
g''(x) = -\frac{\varepsilon e^{x}}{(1 - \varepsilon e^{x})^2} < 0,
$$
所以$g$严格上凸（凹函数）。由詹森（Jensen）不等式，$\frac1N\sum g(x_i) \le g\!\left(\frac1N\sum x_i\right)$，当且仅当所有$x_i$相等时取等号。因此最大值在每一级都取$x_i = \Delta v/(Nc)$处，由此得[[#eq-staging]]。（用拉格朗日乘数法论证可得同样的条件$g'(x_i) = $常数。）假设：$c$和$\varepsilon$相同；$\varepsilon$与级的大小无关；损失计入$\Delta v$并按比例分摊。各级技术不同时，最优解使各级质量比不等——高$I_{sp}$的上面级承担更大份额的$\Delta v$。
:::

::: example 一级、两级还是三级入轨 {#ex-staging}
用两个和三个最优级重做[[#ex-ssto]]（$\Delta v = 9.3\ \mathrm{km/s}$，$I_{sp} = 450\ \mathrm{s}$，$\varepsilon = 0.12$）。
::: solution
两级：$R_i = \sqrt{8.227} = 2.868$，$\pi_i = (0.3487 - 0.12)/0.88 = 0.2598$，$m_L/m_0 = 0.2598^2 = 0.0675$。
三级：$R_i = 8.227^{1/3} = 2.019$，$\pi_i = (0.4953 - 0.12)/0.88 = 0.4265$，$m_L/m_0 = 0.4265^3 = 0.0776$。

**校核。** 从一级到两级，有效载荷比从$0.18\,\%$增长到$6.8\,\%$——将近 40 倍；第三级只再增加 15 %，代价是又一台发动机、又一套分离系统和又一种失效模式。因此实际运载火箭有两级或三级，常带有捆绑助推器作为“零级”。在两级情形中每一级提供$4.65\ \mathrm{km/s}$，约为一个排气速度：一个有用的经验法则是，不应要求一级提供比其自身$c$大很多的速度增量。
:::
:::

::: widget plot
f: max(0, (exp(-x*1000/(I*9.80665)) - s)/(1 - s)); max(0, (exp(-x*1000/(2*I*9.80665)) - s)/(1 - s))^2; max(0, (exp(-x*1000/(3*I*9.80665)) - s)/(1 - s))^3
x: 0, 14
y: 0, 0.5
sliders: I=450:250:460:1; s=0.12:0.04:0.2:0.005
labels: N = 1; N = 2; N = 3
vlines: 9.3
caption: 一、二、三个相同最优级[[#eq-staging]]的有效载荷比$m_L/m_0$对所需$\Delta v$（km/s）的曲线，比冲为$I$（s），结构系数为$s = \varepsilon$。在入轨线（$9.3\ \mathrm{km/s}$）处比较各曲线；然后把$I$降到$300\ \mathrm{s}$，观察单级入轨变得不可能，甚至两级也很吃力。曲线降到零意味着该级甚至不能把自身结构加速到该$\Delta v$。
:::

::: quiz
某火箭级的比冲提高了 10 %，而结构系数不变。对固定的$\Delta v$，下列哪种说法正确？
- [ ] 推进剂质量减少 10 %。
- [x] 所需质量比下降，当$\Delta v$比$c$大时有效载荷增益最大。
- [ ] 有效载荷比恰好提高 10 %。
- [ ] 什么都不变，因为质量比只取决于$\Delta v$。
::: solution
$R = e^{\Delta v/c}$，所以$c$提高 10 % 使$\ln R$减小约 9 %。由于有效载荷比取决于$e^{-\Delta v/c} - \varepsilon$，而当$\Delta v \gg c$时它很小，所以在要求苛刻的任务中，$c$的适度变化可以使有效载荷成倍变化（比较多级图中$I$变化时的曲线）。推进剂质量并不与$I_{sp}$成线性关系。
:::
:::

## 火箭喷管

燃烧室产生高压$p_c$、高温$T_c$、速度几乎为零的燃气；缩放喷管把它膨胀到超声速。[[propulsion/inlets-nozzles]]的准一维等熵流动理论在此适用：以燃烧室为滞止状态（$p_t = p_c$，$T_t = T_c$），喉部为声速，燃烧产物视为平均摩尔质量为$\mathcal{M}$的完全气体（于是$R = R_u/\mathcal{M}$，$R_u = 8314\ \mathrm{J/(kmol\,K)}$），有效$\gamma$通常为$1.15$–$1.25$。

::: definition 特征速度与推力系数 {#def-cstar-cf}
设喉部面积为$A_t$，**特征速度**和**推力系数**为
$$
c^* = \frac{p_c A_t}{\dot m},\qquad C_F = \frac{F}{p_c A_t},
\qquad\text{于是}\qquad c = C_F\,c^* .
$$
$c^*$衡量给定压力的燃烧室通过给定喉部推出多少质量流量；它取决于推进剂和燃烧质量，而不取决于喷管的膨胀。$C_F$衡量喷管把燃烧室压力转化为推力的有效程度；它取决于$\gamma$、面积比$\varepsilon = A_e/A_t$和环境压力，而不取决于燃烧室温度。
:::

::: proposition 理想$c^*$与$C_F$ {#prop-cf}
对理想火箭——$\gamma$为常数的完全气体的等熵一维流动，喉部声速，出口为均匀轴向流动——取$\Gamma = \sqrt{\gamma}\left(\frac{2}{\gamma+1}\right)^{\frac{\gamma+1}{2(\gamma-1)}}$：
$$
c^* = \frac{\sqrt{R T_c}}{\Gamma},
\qquad
C_F = \Gamma\sqrt{\frac{2\gamma}{\gamma-1}\left[1 - \left(\frac{p_e}{p_c}\right)^{\frac{\gamma-1}{\gamma}}\right]} + \left(\frac{p_e}{p_c} - \frac{p_a}{p_c}\right)\varepsilon ,
$$ {#eq-cf}
其中$p_e/p_c$由面积比通过下式确定：
$$
\varepsilon = \frac{A_e}{A_t} = \frac{\Gamma}{\left(p_e/p_c\right)^{1/\gamma}\sqrt{\dfrac{2\gamma}{\gamma-1}\left[1 - \left(p_e/p_c\right)^{(\gamma-1)/\gamma}\right]}} .
$$ {#eq-eps}
:::

::: proof
**质量流量。** 在声速喉部，[[propulsion/inlets-nozzles]]的流量函数给出$\dot m = \sqrt{\gamma/R}\left(\frac{2}{\gamma+1}\right)^{\frac{\gamma+1}{2(\gamma-1)}} p_c A_t/\sqrt{T_c} = \Gamma\,p_c A_t/\sqrt{RT_c}$，所以$c^* = p_cA_t/\dot m = \sqrt{RT_c}/\Gamma$。
**出口速度。** 燃烧室与出口之间的能量守恒，结合等熵关系，给出
$$
V_e = \sqrt{\frac{2\gamma}{\gamma-1}RT_c\left[1 - \left(\frac{p_e}{p_c}\right)^{(\gamma-1)/\gamma}\right]} .
$$
**推力系数。** 用$p_cA_t$除[[#eq-rocket-thrust]]：$C_F = \dot m V_e/(p_cA_t) + (p_e - p_a)A_e/(p_cA_t) = V_e/c^* + (p_e/p_c - p_a/p_c)\varepsilon$。代入$V_e$和$c^*$即得[[#eq-cf]]——因子$\sqrt{RT_c}$相消，这就是$C_F$不依赖于燃烧室温度的原因。
**面积比。** 喉部与出口之间的连续方程：$\varepsilon = \rho_tV_t/(\rho_eV_e) = \dot m/(\rho_e V_e A_t)$。利用$\rho_e = (p_e/RT_e)$、$T_e = T_c(p_e/p_c)^{(\gamma-1)/\gamma}$和$\dot m/A_t = \Gamma p_c/\sqrt{RT_c}$，化简后得$\varepsilon = \Gamma\big/\left[(p_e/p_c)^{1/\gamma}\,V_e/\sqrt{RT_c}\right]$，这就是[[#eq-eps]]。假设：上面列出的理想火箭假设；此外，在整个膨胀过程中化学成分“冻结”或处于平衡，使一个$\gamma$和$\mathcal{M}$就能描述它。实际喷管因扩散、边界层和化学非平衡而损失百分之几。
:::

由[[propulsion/inlets-nozzles#prop-perfect-expansion]]——喷管在$p_e = p_a$时总推力最大——给定环境压力下的$C_F$在给出完全膨胀的面积比处达到峰值。在真空中$p_a = 0$，$C_F$随$\varepsilon$不断增大，但越来越慢，趋于极限$\Gamma\sqrt{2\gamma/(\gamma-1)}$（$\gamma = 1.2$时为 2.25）；因此上面级喷管在质量和布置允许的范围内做得尽可能大。

::: warning 一个喷管不可能在所有高度都理想
第一级发动机从海平面（$p_a = 101\ \mathrm{kPa}$）开始工作，在几乎真空中结束。面积比小的喷管在起飞时合适，但在高空欠膨胀而造成浪费；面积比大的喷管在真空中高效，但在海平面严重过度膨胀，通过负的压力项损失推力，并有在喷管内发生气流分离、产生很大侧向载荷的风险。第一级采取折中（海平面面积比约 10–30）；上面级采用 40–200 或更大。给出比冲时务必注明环境压力：“同一台”发动机在海平面和真空中的$I_{sp}$可能相差 15–30 %。
:::

::: example 海平面和真空中的推力系数 {#ex-cf}
燃烧室在$p_c = 7.0\ \mathrm{MPa}$、$T_c = 3500\ \mathrm{K}$下工作，燃烧产物平均摩尔质量为$22\ \mathrm{kg/kmol}$，$\gamma = 1.20$。喉部面积为$0.050\ \mathrm{m^2}$，喷管面积比为$40$。求$c^*$、质量流量、出口压力，以及真空和海平面的推力和比冲。海平面的最佳面积比是多少？
::: solution
$R = 8314/22 = 377.9\ \mathrm{J/(kg\,K)}$，$\Gamma = \sqrt{1.2}\,(2/2.2)^{5.5} = 0.6485$。
$$
c^* = \frac{\sqrt{377.9 \times 3500}}{0.6485} = 1773\ \mathrm{m/s},\qquad
\dot m = \frac{p_cA_t}{c^*} = \frac{7.0\times10^{6} \times 0.050}{1773} = 197.4\ \mathrm{kg/s}.
$$
对$\varepsilon = 40$（数值）求解[[#eq-eps]]得$p_e/p_c = 2.087\times10^{-3}$，所以$p_e = 14.6\ \mathrm{kPa}$。$C_F$的动量部分为$0.6485\sqrt{12\,[1 - (2.087\times10^{-3})^{1/6}]} = 1.801$（所以$V_e = 1.801 \times 1773 = 3194\ \mathrm{m/s}$），且
$$
C_{F,\text{真空}} = 1.801 + 2.087\times10^{-3} \times 40 = 1.884,\qquad
C_{F,\text{海平面}} = 1.884 - \frac{101.3}{7000}\times 40 = 1.305 .
$$
推力：$F_{\text{真空}} = 1.884 \times 7.0\times10^{6} \times 0.050 = 659\ \mathrm{kN}$，$F_{\text{海平面}} = 457\ \mathrm{kN}$。比冲：$C_Fc^*/g_0$在真空中为$341\ \mathrm{s}$，在海平面为$236\ \mathrm{s}$。
对海平面完全膨胀，$p_e/p_c = 101.3/7000 = 0.01448$，[[#eq-eps]]给出$\varepsilon = 8.97$，$C_F = 1.599$，$I_{sp} = 289\ \mathrm{s}$。

**校核。** 在海平面，按真空优化的喷管因压力项损失 30 % 的推力（实际上还会分离）；海平面喷管在海平面多给出 22 % 的推力，但在真空中只有$1.599$对$1.884$。约 1.9 的真空$C_F$是大面积比喷管的典型值。
:::
:::

::: widget plot
f: sqrt(k)*(2/(k+1))^((k+1)/(2*(k-1)))*sqrt(2*k/(k-1)*(1 - 10^(-x*(k-1)/k))) + 10^(-x)*sqrt(k)*(2/(k+1))^((k+1)/(2*(k-1)))/(10^(-x/k)*sqrt(2*k/(k-1)*(1 - 10^(-x*(k-1)/k)))); sqrt(k)*(2/(k+1))^((k+1)/(2*(k-1)))*sqrt(2*k/(k-1)*(1 - 10^(-x*(k-1)/k))) + (10^(-x) - 1/P)*sqrt(k)*(2/(k+1))^((k+1)/(2*(k-1)))/(10^(-x/k)*sqrt(2*k/(k-1)*(1 - 10^(-x*(k-1)/k))))
x: 0.3, 4
y: 0, 2.4
sliders: k=1.2:1.1:1.4:0.01; P=69:10:300:1
labels: C_F\ \text{真空}; C_F\ \text{当}\ p_a = p_c/P
points: 2.68, 1.884; 2.68, 1.305
caption: 对$k = \gamma$，理想推力系数对喷管膨胀程度（以$\log_{10}(p_c/p_e)$表示）的曲线，上面一条为真空，下面一条为环境压力$p_a = p_c/P$。标出的点是[[#ex-cf]]（$\varepsilon = 40$，$P = 69$）。下面的曲线恰好在$p_e = p_a$即$\log_{10}P$处达到峰值——移动$P$，观察峰值随之移动。超过峰值后喷管过度膨胀，$C_F$下降；真空曲线则继续上升。
:::

## 喷管形状与实际喷管损失

理想理论假设出口流动均匀且沿轴向。半锥角为$\alpha$的**锥形**喷管排出的气流偏离轴线扩散，轴向动量减小因子$\lambda = (1 + \cos\alpha)/2$——经典的$15°$锥约为$0.983$。**钟形**（型面）喷管用特征线法或 Rao 提出的近似抛物线型面设计，使气流转回轴向，以$15°$锥形喷管 70–80 % 的长度达到相近或更好的效率，节省了质量。其他损失来自边界层、滞后于膨胀的化学复合（动力学损失），以及在固体火箭发动机中跟不上燃气的凝相颗粒。实际发动机的$c^*$效率达到 0.95–0.99，$C_F$效率达到 0.96–0.99（Sutton 和 Biblarz）。**高度补偿**概念——可延伸喷管延伸段、双钟形喷管、气动塞式喷管——旨在上升过程中调整有效面积比；只有可延伸延伸段在上面级上得到普遍应用。

::: example 为上面级选择喷管 {#ex-upper-stage}
某上面级发动机只在真空中工作，$\gamma = 1.2$。设计者比较面积比 40 和 120。用理想理论，较大的喷管使$C_F$提高多少？如果较大的喷管使一个$c^* = 1773\ \mathrm{m/s}$、最终质量$5000\ \mathrm{kg}$、推进剂$20\,000\ \mathrm{kg}$的级增重$100\ \mathrm{kg}$，是否值得？
::: solution
由[[#eq-eps]]：$\varepsilon = 40$给出$C_{F,\text{真空}} = 1.884$；$\varepsilon = 120$给出$p_e/p_c = 5.23\times10^{-4}$，$C_{F,\text{真空}} = 1.964$，提高$4.2\,\%$。有效排气速度：$3342$和$3483\ \mathrm{m/s}$。
级的$\Delta v$：小喷管时为$3342\ln(25\,000/5000) = 5378\ \mathrm{m/s}$；大喷管时最终质量为$5100\ \mathrm{kg}$，$\Delta v = 3483\ln(25\,100/5100) = 5545\ \mathrm{m/s}$。

**校核。** 更重更大的喷管仍然多得$167\ \mathrm{m/s}$，所以在真空中是值得的——这就是上面级喷管巨大的原因。在第一级上，同一喷管在起飞时会过度膨胀，比较结果将会反转。
:::
:::

::: history
康斯坦丁·齐奥尔科夫斯基（Konstantin Tsiolkovsky）于1903年在他关于用反作用装置探索太空的论文中发表了火箭方程（威廉·摩尔（William Moore）早在1813年就在英国推导出了变质量火箭的运动，其他人也独立地得到过这一方程）。研究过带拉瓦尔喷管的火箭效率的罗伯特·戈达德（Robert Goddard）于1926年3月16日在马萨诸塞州奥本发射了第一枚液体推进剂火箭；赫尔曼·奥伯特（Hermann Oberth）的《飞往星际空间的火箭》（*Die Rakete zu den Planetenräumen*，1923年）阐述了多级和空间飞行理论。推力系数和特征速度理论在 20 世纪 40 和 50 年代多个国家的火箭计划中得到系统化，并成为乔治·萨顿（George Sutton）1949年首版的《火箭发动机基础》（*Rocket Propulsion Elements*）的框架。多级使轨道飞行成为可能：1957年10月4日，斯普特尼克1号由 R-7 运载火箭送入轨道——一个芯级周围环绕四个捆绑助推器，助推器在耗尽后被抛掉。
:::

::: summary
- 火箭推力$F = \dot m V_e + (p_e - p_a)A_e = \dot m c$与飞行速度无关；$I_{sp} = c/g_0$，需注明其燃烧室压力、面积比和环境压力。
- 火箭方程$\Delta v = c\ln(m_0/m_f)$使推进剂质量随$\Delta v/c$指数增长。
- 重力损失$\int g\sin\theta\,\mathrm{d}t$要求起飞推力大、尽早转弯；轨道发射总共需要$9$–$10\ \mathrm{km/s}$。
- 多级抛掉结构；各级技术相同时最优解为各级质量比相等，$m_L/m_0 = \left[(e^{-\Delta v/Nc} - \varepsilon)/(1-\varepsilon)\right]^N$。两到三级就能获得大部分收益。
- $c = C_Fc^*$：燃烧室决定$c^* = \sqrt{RT_c}/\Gamma$（高温、低摩尔质量）；喷管通过$\gamma$、$\varepsilon$和$p_a/p_c$决定$C_F$。
- 给定环境压力下的$C_F$在完全膨胀时最大；在真空中它随面积比增大，趋于$\Gamma\sqrt{2\gamma/(\gamma-1)}$。
:::

## 习题

::: exercise {#exr-dv-basic level=1 check="3351"}
某级$I_{sp} = 311\ \mathrm{s}$，质量比为 3。求其理想速度增量。（以 m/s 为单位输入$\Delta v$，取整数。）
::: solution
$\Delta v = 311 \times 9.80665 \times \ln 3 = 3351\ \mathrm{m/s}$。
:::
:::

::: exercise {#exr-mass-ratio level=1 check="2.77"}
在$I_{sp} = 320\ \mathrm{s}$下获得$\Delta v = 3.2\ \mathrm{km/s}$需要多大的质量比？（输入$R$，保留三位有效数字。）
::: solution
$R = \exp\left(3200/(320 \times 9.80665)\right) = e^{1.0197} = 2.77$。所以初始质量的$1 - 1/2.77 = 64\,\%$是推进剂。
:::
:::

::: exercise {#exr-mdot level=1 check="340"}
某发动机以$I_{sp} = 300\ \mathrm{s}$产生$1.00\ \mathrm{MN}$推力。推进剂质量流量是多少？（以 kg/s 为单位输入$\dot m$，取整数。）
::: solution
$\dot m = F/(I_{sp}g_0) = 10^{6}/(300 \times 9.80665) = 340\ \mathrm{kg/s}$。
:::
:::

::: exercise {#exr-gamma-cf level=2 check="2.25"}
求$\gamma = 1.2$时无限大喷管的极限真空推力系数。（保留三位有效数字输入。）
::: solution
当$\varepsilon \to \infty$时，$p_e/p_c \to 0$，压力项消失：$C_F \to \Gamma\sqrt{2\gamma/(\gamma-1)} = 0.6485 \times \sqrt{12} = 2.25$。实际真空喷管达到 1.9–2.0，因为膨胀的最后一段要用大量喷管才换来很少的推力。
:::
:::

::: exercise {#exr-cstar level=2 check="1773"}
证明$c^*$只取决于燃气性质，并计算$T_c = 3500\ \mathrm{K}$、$\mathcal{M} = 22\ \mathrm{kg/kmol}$、$\gamma = 1.2$时的值。若在相同温度下$\mathcal{M}$减半，$c^*$变为多少倍？（以 m/s 为单位输入$c^*$，取整数。）
::: solution
$c^* = \sqrt{RT_c}/\Gamma$，其中$R = R_u/\mathcal{M}$：其中不出现任何喷管量。$c^* = \sqrt{377.9 \times 3500}/0.6485 = 1773\ \mathrm{m/s}$。$\mathcal{M}$减半使$R$加倍，$c^*$乘以$\sqrt2$。这就是为什么富氢排气（低摩尔质量）即使火焰温度较低也能给出最高的化学比冲。
:::
:::

::: exercise {#exr-two-stage level=2 check="4650"}
一个各级技术相同（$I_{sp} = 450\ \mathrm{s}$，$\varepsilon = 0.12$）的两级飞行器必须提供$9.3\ \mathrm{km/s}$。在最优设计中每一级提供多大的速度增量？（以 m/s 为单位输入每级的$\Delta v$。）
::: solution
由[[#prop-staging]]，各级质量比相等、排气速度相等，所以每级提供一半：$4650\ \mathrm{m/s}$。每级$R = e^{4650/4413} = 2.868$。
:::
:::

::: exercise {#exr-burn-time level=3 check="736"}
对[[#ex-gravity-loss]]的探空火箭（$I_{sp} = 300\ \mathrm{s}$，$R = 4$，垂直，无阻力，$g = 9.81\ \mathrm{m/s^2}$恒定），多长的工作时间能使$150\ \mathrm{s}$工作段的重力损失减半？若推进剂流量恒定，相应的起飞推重比是多少？（以 m/s 为单位输入较短工作段的重力损失，取整数。）
::: solution
重力损失减半需要$t_b = 75\ \mathrm{s}$；损失为$9.81 \times 75 = 736\ \mathrm{m/s}$。流量恒定时，$\dot m = m_p/t_b = 0.75m_0/75 = 0.01m_0\ \mathrm{s^{-1}}$，所以$F = \dot m c = 0.01m_0 \times 2942 = 29.4m_0$牛顿，$F/(m_0g) = 3.0$。（对$150\ \mathrm{s}$工作段为 1.5。）关机速度从$2607$提高到$3342\ \mathrm{m/s}$。
:::
:::

::: exercise {#exr-staging-derive level=3}
推导[[#def-stage]]中的有效载荷比关系$\pi = (1/R - \varepsilon)/(1 - \varepsilon)$，并用[[#eq-staging]]求$N$个相同级在零有效载荷时所能提供的最大$\Delta v$。取$I_{sp} = 300\ \mathrm{s}$、$\varepsilon = 0.1$，计算$N = 1$、$2$和$3$时的值。
::: solution
由$m_0 = m_L + m_s + m_p$和$m_s = \varepsilon(m_s + m_p) = \varepsilon(m_0 - m_L)$，关机质量为$m_0/R = m_L + \varepsilon(m_0 - m_L)$。除以$m_0$：$1/R = \pi + \varepsilon(1 - \pi)$，所以$\pi = (1/R - \varepsilon)/(1 - \varepsilon)$。
零有效载荷意味着每个$\pi_i = 0$：$e^{-\Delta v/(Nc)} = \varepsilon$，所以$\Delta v_{\max} = Nc\ln(1/\varepsilon)$。取$c = 2942\ \mathrm{m/s}$和$\ln 10 = 2.303$：$6.77$、$13.5$和$20.3\ \mathrm{km/s}$。多级使上限与级数成比例地提高——但重要的是在有用$\Delta v$下的有效载荷，而那远低于上限。
:::
:::

::: exercise {#exr-ssto-design level=3}
**设计讨论。** 单级入轨飞行器的支持者认为，完全可重复使用的好处超过有效载荷的损失。利用[[#eq-staging]]和[[#ex-ssto]]中看到的敏感性，解释为什么单级的有效载荷对$\varepsilon$和$I_{sp}$如此敏感，为什么部分可重复使用的两级飞行器成为实际飞行的方案，以及需要哪些技术变革才能使单级变得实用。
::: solution
对单级，$m_L/m_0 = (e^{-\Delta v/c} - \varepsilon)/(1 - \varepsilon)$，是两个大小相近的数（例中的$0.12$和$0.12$）的小差值。$I_{sp}$改变 1 % 使$e^{-\Delta v/c}$改变其自身的约$2\,\%$，即$0.0025$——比整个有效载荷比还大。可重复使用所需的余量（防热罩、着陆推进剂、着陆架）都会增加$\varepsilon$。两级使每一项都稳妥地为正（每级需要$e^{-\Delta v/2c} \approx 0.35 \gg \varepsilon$），因此设计能容忍现实的质量增长；重复使用第一级（通过动力着陆）并接受一次性或单独回收的上面级，保留了大部分经济收益。实用的单级需要低得多的结构系数（更轻的贮箱材料和结构）、更高的平均$I_{sp}$（例如在上升早期采用吸气式推进，或采用高度补偿喷管）以及更低的损失——即便如此，它也只能携带很小的有效载荷，余量很少。任何定量的论断都应以详细的质量估算来核查。
:::
:::
