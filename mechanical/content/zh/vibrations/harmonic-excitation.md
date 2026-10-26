简谐激振是动力学的基准情形：按傅里叶（Fourier）定理，任何周期力都分解为谐波；任何随机激振都是窄带激振之和；而对结构动力性能的一切测量都是用正弦波做的。学会了对一个频率的响应，就等于学会了对所有频率的响应，因为答案是同一条曲线——**放大因子**对频率比——每个工程师都应当能凭记忆画出。

这条曲线有一个支配工程实践的特征：共振时振幅是静变形的$1 / \left( 2 \zeta \right)$倍，所以阻尼为百分之一的结构对共振力的响应是同一力静加时的**五十倍**。本讲其余的一切——共振以上的相位反转、隔振区、旋转不平衡的行为、位移计的设计——都是仔细读这条曲线的推论。

::: definition 受迫响应与放大因子 {#def-magnification}
对方程$m \ddot{x} + c \dot{x} + k x = F_0 \sin \omega t$，稳态响应为$x = X \sin \left( \omega t - \phi \right)$，其中
$$
\frac{X}{X_{\text{st}}} = M (r) = \frac{1}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}},
\qquad
\tan \phi = \frac{2 \zeta r}{1 - r^{2}},
\qquad r = \frac{\omega}{\omega_n},
$$
这里$X_{\text{st}} = F_0 / k$是力幅下的静变形。三条渐近线是
$$
r \ll 1 :\ M \to 1 \quad \text{（弹簧主导）} ; \qquad
r = 1 :\ M = \frac{1}{2 \zeta} ; \qquad
r \gg 1 :\ M \to \frac{1}{r^{2}} \quad \text{（质量主导）} .
$$
响应**峰值**在$r = \sqrt{1 - 2 \zeta^{2}}$，略低于共振；而相位在$r = 1$处恰好过$90^{\circ}$，与阻尼无关。
:::

::: proof 稳态振幅 {#proof-magnification}
设特解$x = X \sin \left( \omega t - \phi \right)$。代入得
$$
m \left( - \omega^{2} X \sin \psi \right)
+ c \omega X \cos \psi
+ k X \sin \psi
= F_0 \sin \left( \psi + \phi \right)
= F_0 \left( \sin \psi \cos \phi + \cos \psi \sin \phi \right)
$$
其中$\psi = \omega t - \phi$。令$\sin \psi$与$\cos \psi$的系数相等，
$$
\left( k - m \omega^{2} \right) X = F_0 \cos \phi, \qquad
c \omega X = F_0 \sin \phi .
$$
两式平方相加消去$\phi$，
$$
X^{2} \left[ \left( k - m \omega^{2} \right)^{2} + c^{2} \omega^{2} \right] = F_0^{2} .
$$
两边除以$k^{2}$，并用$\omega_n^{2} = k / m$、$2 \zeta = c / \sqrt{k m}$，
$$
X = \frac{F_0 / k}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}} .
$$
两式相除得$\tan \phi = c \omega / \left( k - m \omega^{2} \right) = 2 \zeta r / \left( 1 - r^{2} \right)$，在$r = 1$处正切的分母为零，故$\phi = 90^{\circ}$恰好成立。$\checkmark$

**注。**$90^{\circ}$相位是共振的实用定义，也是阻尼大到掩盖峰值时唯一可用的定义：在$\phi = 90^{\circ}$时力与**速度**恰好同相，每周期做功最大，即使振幅峰值已被大阻尼器或邻近的第二阶振型抹平，这一点依然成立。
:::

::: theorem 半功率带宽 {#thm-half-power}
响应降到峰值$1 / \sqrt{2}$的两个频率——**半功率点**，此处储存的能量减半——把共振夹在一个与阻尼成正比的宽度内：
$$
\zeta = \frac{\omega_2 - \omega_1}{2 \omega_n} \approx \frac{\omega_2 - \omega_1}{\omega_1 + \omega_2},
$$
第二个形式是实验室使用的形式，因为它不需要知道固有频率，只需要两个实测的半功率点。
:::

::: proof 半功率带宽 {#proof-half-power}
半功率点满足$M = M_{\max} / \sqrt{2}$，轻阻尼下$M_{\max} \approx 1 / \left( 2 \zeta \right)$，所以
$$
\frac{1}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}}
= \frac{1}{2 \zeta \sqrt{2}}
$$
精确条件是$\left( 1 - r^{2} \right)^{2} + 4 \zeta^{2} r^{2} = 1 / \left( 4 \zeta^{2} \right)$；令$u = r^{2}$，
$$
u^{2} + \left( 4 \zeta^{2} - 2 \right) u + 1 - \frac{1}{4 \zeta^{2}} = 0
\quad\Longrightarrow\quad
u = 1 - 2 \zeta^{2} \pm 2 \zeta \sqrt{1 + \zeta^{2}} .
$$
当$\zeta \ll 1$时$\sqrt{u} \approx 1 \pm \zeta$，所以$r_2 - r_1 \approx 2 \zeta$，于是
$$
\zeta \approx \frac{r_2 - r_1}{2} = \frac{\omega_2 - \omega_1}{2 \omega_n} .
$$
保留精确根得$\zeta = \left( r_2 - r_1 \right) / 2$，其中$r_{1,2} = \sqrt{1 - 2 \zeta^{2} \mp 2 \zeta \sqrt{1 + \zeta^{2}}}$，不作近似即可数值反解。$\checkmark$

**注。**名称来自储存能量与振幅的**平方**成正比这一事实，所以振幅平方减半——共振功率减半——发生在峰值振幅的$1 / \sqrt{2} = 0.707$处。这个方法是在激振器上测阻尼的标准方法，对轻阻尼结构比对数衰减率更受青睐，因为它不需要很长的自由衰减记录。
:::

::: example 共振中的机器 {#ex-machine-resonance}
一台$100\ \mathrm{kg}$的机器装在总刚度$200\ \mathrm{kN / m}$的隔振器上，承受幅值$500\ \mathrm{N}$的简谐力。阻尼比为$0.05$。求共振时的振幅、共振频率一点五倍处的振幅，以及共振时的传递力。
::: solution
$$
\omega_n = \sqrt{\frac{200\,000}{100}} = 44.7\ \mathrm{rad / s} = 7.12\ \mathrm{Hz},
\qquad X_{\text{st}} = \frac{500}{200\,000} = 2.5\ \mathrm{mm},
$$
$$
r = 1 : \quad X = \frac{2.5}{2 \times 0.05} = 25.0\ \mathrm{mm},
\qquad
r = 1.5 : \quad M = \frac{1}{\sqrt{1.25^{2} + 0.15^{2}}} = 0.794, \quad X = 1.99\ \mathrm{mm}.
$$
**共振时的传递力。**弹簧力与阻尼力相位相差$90^{\circ}$，按平方和合成，
$$
F_T = X \sqrt{k^{2} + \left( c \omega \right)^{2}}
= 0.025 \sqrt{200\,000^{2} + \left( 447.2 \times 44.7 \right)^{2}}
= 5025\ \mathrm{N},
$$
是外加力的十倍，正与放大因子相符。

**校核。**共振时传递力必须等于外加力乘以$1 / \left( 2 \zeta \right) = 10$：$500 \times 10 = 5000\ \mathrm{N}$ $\checkmark$

**合理性检验。**半千牛的力——大约一个人的重量——产生二十五毫米可见的剧烈运动。这就是共振的含义，也是机器冲过自身共振的升速过程是风险最高时刻的原因：机器是按工作转速设计的，工作转速被选在远离$7.12\ \mathrm{Hz}$的地方，但它在途中必须**穿过**$7.12\ \mathrm{Hz}$，而$25\ \mathrm{mm}$的变形可能超过隔振器的行程、与管道的间隙或联轴器两轴的对接精度。标准对策是足够快的升速速率使振幅来不及达到稳态值，或**足够的**阻尼来压低峰值，或临时约束。
:::
:::

::: widget plot
f: 1/sqrt((1-x^2)^2+(2*0.05*x)^2)
x: 0, 3
y: 0, 10
labels: \text{放大因子 } M
caption: 阻尼比$0.05$时放大因子随频率比的变化曲线，显示略低于$r = 1$处的峰值$1 / \left( 2 \zeta \right) = 10$以及其后的$1 / r^{2}$尾巴。这条曲线上有两个特征值得牢记。其一是危险区之**窄**：在二倍固有频率处响应只有静变形的三分之一，所以在三倍固有频率下工作的机器实质上已被隔振，整个设计问题就是如何穿过峰值。其二是$r > 1$段的曲线对任何阻尼值几乎都一样——阻尼几乎不改变隔振效果，这就是为什么隔振设计是频率比的设计而不是阻尼的设计。
:::

## 旋转不平衡

::: proposition 旋转不平衡 {#prop-unbalance-response}
总质量为$m$的机器带有半径$e$处的偏心质量$m_e$时，激振力为$m_e e \omega^{2}$，振幅为
$$
\frac{X}{\left( m_e e / m \right)} = \frac{r^{2}}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}} ,
$$
高速下趋于**常数**值$m_e e / m$，与刚度和转速无关。共振处的峰值为
$$
X_{\text{res}} \approx \frac{m_e e}{m} \times \frac{1}{2 \zeta \sqrt{1 - \zeta^{2}}} .
$$
两个推论支配着旋转机械实践：临界转速以上，振动由不平衡量决定而**不**由机器刚度决定，所以把机器做硬毫无用处；远离临界转速工作的机器的振动，就是其剩余不平衡量的直接度量。
:::

::: example 转子平衡 {#ex-rotor-response}
$200\ \mathrm{kg}$的泵转子剩余不平衡量为$0.02\ \mathrm{kg\,m}$，转速$1500\ \mathrm{rpm}$，支承刚度$500\ \mathrm{kN / m}$，$\zeta = 0.1$。求工作转速下和共振时的振动幅值，以及$3000\ \mathrm{rpm}$下的同一幅值。
::: solution
$$
\omega_n = \sqrt{\frac{500\,000}{200}} = 50\ \mathrm{rad / s} = 477\ \mathrm{rpm},
\qquad \omega = 157.1\ \mathrm{rad / s}, \qquad r = 3.142,
$$
$$
\frac{m_e e}{m} = \frac{0.02}{200} = 1.0 \times 10^{- 4}\ \mathrm{m} = 0.10\ \mathrm{mm},
$$
$$
\frac{X}{m_e e / m} = \frac{3.142^{2}}{\sqrt{\left( 1 - 9.87 \right)^{2} + \left( 0.628 \right)^{2}}}
= \frac{9.87}{8.90} = 1.109,
\qquad X = 0.111\ \mathrm{mm}.
$$
**共振时。**$X = 0.10 / \left( 2 \times 0.1 \right) = 0.50\ \mathrm{mm}$。
**$3000\ \mathrm{rpm}$时**$\left( r = 6.28 \right)$：$X / \left( m_e e / m \right) = 1.025$，所以$X = 0.103\ \mathrm{mm}$。

**校核。**两个高速答案$0.111$和$0.103\ \mathrm{mm}$，与渐近值$m_e e / m = 0.10\ \mathrm{mm}$的偏差都在百分之十以内 $\checkmark$

**合理性检验。**转速从$1500$翻到$3000\ \mathrm{rpm}$，振动几乎不变，这是机器远离自身临界转速运行的特征，也是这类机器的振动频谱相当于一份**平衡证书**的原因：幅值本身就是质心偏心距$m_e e / m$，乘以质量即直接给出剩余不平衡量。这也是为什么工作转速高于第一临界转速的机器在起动时必须**快速**通过该临界，以及为什么共振处的幅值——这里是半毫米，运转值的五倍——是决定机器能否起动的数字。$200\ \mathrm{kg}$转子配$500\ \mathrm{kN / m}$支承的$477\ \mathrm{rpm}$临界偏低；真实泵的支承硬得多，设计目标是把第一临界放在最高连续转速以上至少百分之二十五。
:::
:::

::: example 振动地板上的仪器 {#ex-base-excitation}
一台$20\ \mathrm{kg}$的仪器，隔振器固有频率$8\ \mathrm{Hz}$、$\zeta = 0.05$，放在以$25\ \mathrm{Hz}$、振幅$0.2\ \mathrm{mm}$振动的地板上。求仪器相对地面的振幅，以及把隔振器软化到$2\ \mathrm{Hz}$后的振幅。
::: solution
**基础**激励下的传递率为
$$
\frac{X}{Y} = \sqrt{\frac{1 + \left( 2 \zeta r \right)^{2}}{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}} .
$$
**$8\ \mathrm{Hz}$时。**$r = 25 / 8 = 3.125$，
$$
\frac{X}{Y} = \frac{\sqrt{1 + 0.0977}}{\sqrt{76.83 + 0.0977}} = \frac{1.048}{8.77} = 0.119,
\qquad X = 0.024\ \mathrm{mm}.
$$
**$2\ \mathrm{Hz}$时。**$r = 12.5$，$X / Y = 0.0103$，所以$X = 0.0021\ \mathrm{mm}$——隔振器频率降到四分之一，改善约十二倍。
**但要校核共振。**若地板在$8\ \mathrm{Hz}$也有振动，则在$r = 1$处，
$$
\frac{X}{Y} = \frac{\sqrt{1 + 0.01}}{0.1} = 10.0,
$$
同一个隔振器会把$8\ \mathrm{Hz}$处$0.02\ \mathrm{mm}$的分量**放大**成仪器处的$0.2\ \mathrm{mm}$。

**合理性检验。**软隔振器在$25\ \mathrm{Hz}$处明显更好，而若地板在$2\ \mathrm{Hz}$附近有能量则明显危险——地板确实有，因为建筑楼面通常在$4$到$8\ \mathrm{Hz}$，而其支承结构和附近任何旋转设备都很容易产生$2\ \mathrm{Hz}$的分量。这就是隔振设计绝不能只凭激励幅值来做的原因：必须实测地板的**频谱**，把隔振器的固有频率放进频谱的空隙里。$1 / r^{2}$渐近线也解释了为什么精密实验室把光学平台放在$1\ \mathrm{Hz}$或更低的摆式隔振器上，以及为什么这种平台在电梯井或往复压缩机旁边毫无用处。
:::
:::

## 振动测量

::: example 位移计与加速度计 {#ex-seismic-instrument}
某惯性仪器的惯性质量$0.5\ \mathrm{kg}$，刚度$200\ \mathrm{N / m}$，$\zeta = 0.7$。求它能正确读位移的频率下限；若同一仪器的固有频率为$100\ \mathrm{Hz}$，讨论它作加速度计使用的适用性。
::: solution
**作位移计。**质量与外壳的相对运动为
$$
\frac{Z}{Y} = \frac{r^{2}}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}} \to 1
\quad \text{当 } r \to \infty,
$$
其中$\omega_n = \sqrt{200 / 0.5} = 20\ \mathrm{rad / s} = 3.18\ \mathrm{Hz}$。在$40\ \mathrm{Hz}$处，$r = 12.57$，
$$
\frac{Z}{Y} = \frac{158.0}{\sqrt{157.0^{2} + 17.6^{2}}} = 1.0001 ,
$$
所以仪器以$0.01\%$的精度读出基础位移。按百分之一误差算，实用下限约为$8\ \mathrm{Hz}$——固有频率的二点五倍。
**作加速度计。**取$f_n = 100\ \mathrm{Hz}$、$\zeta = 0.7$，在$20\ \mathrm{Hz}$（$r = 0.2$）处比值$Z / Y$为
$$
\frac{r^{2}}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}}
= \frac{0.0400}{\sqrt{0.9216 + 0.0784}} = 0.0400 ,
$$
理想值为$r^{2} = 0.0400$（相对运动与基础加速度成正比）：在平坦区误差小于$0.1\%$。在$r = 1$处读数为理想值的$1 / \left( 2 \zeta \right) = 0.71$，完全没有共振峰，而无阻尼仪器在该处的响应将是无界的。

**合理性检验。**同一个物理装置，当固有频率远低于被测频率时读**位移**，远高于被测频率时读**加速度**。这不是设计的巧计而是传递函数的必然，这就是为什么现代加速度计用固有频率和阻尼来描述，而不用质量和刚度：压电元件以电荷取代弹簧的力，但$m / k / c$模型仍然决定可用频带。取阻尼$0.7$是为了把响应压平，并消除本会把冲击拖成衰减振荡的余振。
:::
:::

::: example 轴的弯曲振动 {#ex-whirl}
$60\ \mathrm{kg}$的离心机转鼓装在横向刚度$1.2\ \mathrm{MN / m}$的轴的中部，$\zeta = 0.03$，不平衡量$5\ \mathrm{g\,mm}$。求临界转速、其处的挠度，以及$1500\ \mathrm{rpm}$下的挠度。
::: solution
$$
\omega_n = \sqrt{\frac{1.2 \times 10^{6}}{60}} = 141.4\ \mathrm{rad / s}
= 1350\ \mathrm{rpm},
\qquad \frac{m_e e}{m} = \frac{5 \times 10^{- 6}}{60} = 8.33 \times 10^{- 8}\ \mathrm{m},
$$
$$
X_{\text{res}} = \frac{8.33 \times 10^{- 8}}{2 \times 0.03} = 1.39\ \mu \mathrm{m},
\qquad
r = \frac{157.1}{141.4} = 1.111 : \quad
\frac{X}{m_e e / m} = \frac{1.234}{\sqrt{0.0549 + 0.0044}} = 5.07,
$$
$$
X = 0.42\ \mu \mathrm{m}.
$$
**合理性检验。**亚微米级的挠度，因为优质离心机转鼓的不平衡量只有几个克·毫米。但**$1350\ \mathrm{rpm}$的临界转速**才是决定这台机器的数字：一台在$1500\ \mathrm{rpm}$运转的离心机只有百分之十一的裕度，而升速穿过$1350$时产生$1.4\ \mu \mathrm{m}$的挠度——绝对值虽小，但在二十微米的轴承间隙下，升速时的摆动已占间隙的相当比例。这就是精密转子把工作转速设计得要么远低于第一临界（作为刚性转子），要么远高于第一临界（作为挠性转子，配以高到足以使临界以上挠度可接受的平衡品质）的原因，也是为什么这个选择在任何其他尺寸确定之前就要做出。
:::
:::

::: example 设计 {#ex-design-vibration-limit}
一台$25\ \mathrm{kg}$、$2900\ \mathrm{rpm}$的泵必须满足ISO 10816振动烈度B区，即均方根速度$4.5\ \mathrm{mm / s}$。第一临界在$900\ \mathrm{rpm}$。求允许的位移幅值和相应的平衡等级。
::: solution
$$
\omega = \frac{2900 \times 2 \pi}{60} = 303.7\ \mathrm{rad / s},
\qquad
X = \frac{v_{\text{rms}} \sqrt{2}}{\omega} = \frac{4.5 \times 1.414}{303.7}
= 21.0\ \mu \mathrm{m} \text{（峰值）},
$$
由于工作转速是临界的$3.2$倍，$X \approx m_e e / m$，所以
$$
m_e e = 25 \times 21.0 \times 10^{- 6} = 5.24 \times 10^{- 4}\ \mathrm{kg\,m}
= 524\ \mathrm{g\,mm}.
$$
**平衡等级。**许用偏心距为
$$
e_{\text{per}} = \frac{U}{m} = \frac{524}{25} = 21\ \mu \mathrm{m},
\qquad
G = e_{\text{per}} \omega = 21 \times 10^{- 6} \times 303.7 = 6.4\ \mathrm{mm / s},
$$
即ISO 1940的**G6.3**级——电枢转子和小型泵这类短刚性转子规定的等级。

**设计点评。**这一串推理值得说透，因为平衡指标实际上就是这样产生的：机器上的振动**烈度**限值在工作转速下变成位移限值，经质量变成**剩余不平衡量**限值，再变成车间可以执行的**平衡等级**。注意整个论证依赖于远离临界之上运转，那里$X = m_e e / m$；在临界上运转的机器要满足同一限值，不平衡量须除以$1 / \left( 2 \zeta \right)$，对$\zeta = 0.05$就是严十倍。这就是为什么转子的平衡等级离开工作转速和临界转速就毫无意义，也是为什么ISO 1940把等级规定为**速度**$G$而不是质量：等级就是它将会产生的振动，对一个以限制振动为全部目的的量来说，这是唯一合理的规定方式。
:::
:::

::: history
**放大因子**及其相位伙伴是十九世纪末的振动理论家对受迫振子算出的，瑞利（Rayleigh）在《声学理论》中给出了稳态解和共振的定义；**半功率带宽**法是二十世纪的实验室惯例，在1930年代的电气工程文献中形式化，那时谐振回路的$Q$已是标准概念。轴的**临界转速**由朗肯（Rankine）在1869年分析，他的模型表明轴不能在其上方稳定运转。然而德拉瓦尔（de Laval）在19世纪80年代的汽轮机就在临界转速以上运转；福普尔（Föppl）在1895年解释了原因，**杰福科特（Jeffcott）**1919年的论文给出了简单的轴上圆盘模型以及转子在临界以上的自动定心，本讲至今仍使用这一模型。**惯性仪器**的原理——有阻尼质量的相对运动在固有频率以上读位移、以下读加速度——源于19世纪末以来的地震仪设计。ISO 1940的**平衡等级**制度始于1973年；把机器抖得有多厉害的判断变成实测均方根速度的**振动烈度**分区，最早见于ISO 2372（1974），并延续到ISO 10816及其后继标准ISO 20816。
:::

## 后续内容

自由响应与用衰减信号测阻尼见[[vibrations/free-vibration]]，本讲曲线隔振区的使用见[[vibrations/isolation-transmissibility]]，非简谐激振的响应见[[vibrations/general-excitation]]，旋转机械应用见[[machine-design/shafts]]。使简谐情形成为一般情形的傅里叶分解在[[vibrations/general-excitation]]中展开。

::: summary
- 放大因子$M (r) = \left[ \left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2} \right]^{- 1 / 2}$给出任意频率下的振幅，共振时$M = 1 / \left( 2 \zeta \right)$。
- 相位在$r = 1$处过$90^{\circ}$，与阻尼无关，这是共振的实用定义。
- 半功率带宽由受迫振动扫频给出$\zeta = \left( r_2 - r_1 \right) / 2$。
- 旋转不平衡在高速下给出$X \to m_e e / m$：振幅由不平衡量和质量决定，**不**由刚度决定。
- 惯性仪器在固有频率以上读位移、以下读加速度；$0.7$的阻尼使两者都变平坦。
- 振动烈度限值经工作转速和质量转化为平衡等级。
:::

::: quiz
一台机器在$3600\ \mathrm{rpm}$下运转，测得振动幅值为$0.05\ \mathrm{mm}$。转速降到$1800\ \mathrm{rpm}$，幅值不变，仍为$0.05\ \mathrm{mm}$。最可能的解释是机器：
- [ ] 在两个转速下都恰好在临界转速上运转
- [ ] 被某个幅值恒定的电气故障激励
- [x] 在第一临界转速之上很远处运转，那里幅值等于$m_e e / m$，与转速无关
- [ ] 被某个恒力扰动激励
::: solution
对旋转不平衡，高速渐近线是$X \to m_e e / m$，一个与转速、刚度和阻尼都无关的常数。因此观察到幅值随转速**平坦**变化，正是挠性转子在临界之上运转的经典特征，它让工程师能从振动直接读出剩余不平衡量：$m_e e = m X$。若激励是恒力而不是旋转不平衡，质量控制区的振幅将按$1 / r^{2}$变化，转速减半会使它变为四倍——这就是诊断性试验，也是为什么一份惰走频谱比一次运转测量更值钱。这也是为什么按某一转速下的固定位移限值平衡好的机器，在另一转速下可能不满足同一限值，以及为什么平衡等级以毫米每秒而不是以微米规定。
:::
:::

## 习题

::: exercise 放大因子 {level=1 check="5"}
求阻尼比$0.1$时共振处的放大因子。
::: solution
$M = 1 / \left( 2 \zeta \right) = 5$。
:::
:::

::: exercise 频率比 {level=1 check="0.25"}
一台机器在二倍固有频率下运转，忽略阻尼时放大因子是多少？
::: solution
$M \to 1 / r^{2} = 0.25$。
:::
:::

::: exercise 带宽 {level=1 check="0.02"}
共振扫频得到半功率点$49.0$和$51.0\ \mathrm{Hz}$。求阻尼比。
::: solution
$\zeta = \left( 51.0 - 49.0 \right) / \left( 51.0 + 49.0 \right) = 0.02$。
:::
:::

::: exercise 升速 {level=2}
对例 1 的机器，求$r = 1.05$和$r = 3$处的振幅与传递力，并评论升速过程。
::: solution
$$
r = 1.05 : \quad M = \frac{1}{\sqrt{0.1025^{2} + 0.105^{2}}} = 6.81, \quad X = 17.0\ \mathrm{mm},
\quad F_T = 3430\ \mathrm{N},
$$
$$
r = 3 : \quad M = \frac{1}{\sqrt{8^{2} + 0.3^{2}}} = 0.125, \quad X = 0.31\ \mathrm{mm},
\quad F_T = 65\ \mathrm{N}.
$$
**合理性检验。**三倍共振处传递力只有外加力的八分之一，所以若工作转速就是这样选的，机器在运转时就是自我隔振的。危险带很窄——从$r = 0.95$到$r = 1.05$振幅超过十七毫米——这就是升速要规定为**速率**的原因：用两三个周期而不是五十个周期穿过共振，会把实际振幅压到远低于稳态值，相应的瞬态分析见[[vibrations/general-excitation]]。
:::
:::

::: exercise 不平衡 {level=2}
$60\ \mathrm{kg}$的转子剩余不平衡量$20\ \mathrm{g\,mm}$，在$6000\ \mathrm{rpm}$下运转，支承刚度$2\ \mathrm{MN / m}$，$\zeta = 0.05$。求振幅和第一临界转速。
::: solution
$$
\omega_n = \sqrt{\frac{2 \times 10^{6}}{60}} = 182.6\ \mathrm{rad / s} = 1743\ \mathrm{rpm},
\qquad r = \frac{628.3}{182.6} = 3.441,
$$
$$
\frac{X}{m_e e / m} = \frac{11.84}{\sqrt{117.5 + 0.118}} = 1.092,
\qquad
X = 1.092 \times \frac{2 \times 10^{- 5}}{60} = 0.36\ \mu \mathrm{m}.
$$
**合理性检验。**三分之一微米——平衡得很好的转子。注意$6000\ \mathrm{rpm}$下的振幅只比渐近值$m_e e / m$高百分之九，所以机器实际上处于质量控制区，它的振动是平衡测量而不是动力学问题。
:::
:::

::: exercise 相位 {level=2}
$\zeta = 0.05$时，频率比多大时相位滞后达到$135^{\circ}$？该处放大因子是多少？
::: solution
在第二象限$\tan \phi$为负，所以$1 - r^{2} < 0$，
$$
\frac{2 \zeta r}{1 - r^{2}} = - 1
\quad\Longrightarrow\quad
r^{2} - 0.1 r - 1 = 0
\quad\Longrightarrow\quad
r = \frac{0.1 + \sqrt{0.01 + 4}}{2} = 1.051 ,
$$
$$
M = \frac{1}{\sqrt{0.1050^{2} + 0.1051^{2}}} = 6.73 .
$$
**合理性检验。**相位只在共振以上百分之五处就达到$135^{\circ}$，这是相位曲线的尴尬之处：低阻尼下它在几个百分点的频率内从$80^{\circ}$爬到$100^{\circ}$，然后缓慢地趋向$180^{\circ}$，所以低阻尼时相位在共振附近是很**差**的频率参考，只有在$90^{\circ}$恰好定位无阻尼固有频率这个狭窄的意义上才是好的。实际上相位用来识别**振型**——两个测点同相还是反相——而不是频率，模态分析者先读相位图后读幅值图，正是这个原因。
:::
:::

::: exercise 设计 {level=3}
一台$400\ \mathrm{kg}$的压力机以每分钟$240$冲工作，竖直简谐力幅值$40\ \mathrm{kN}$。基础的设计要求振幅不超过$3\ \mathrm{mm}$、传给地面的力不超过$10\ \mathrm{kN}$。给出设计方案。
::: solution
**工作频率。**$\omega = 240 \times 2 \pi / 60 = 25.13\ \mathrm{rad / s}$。
**由力限值定频率比。**取$\zeta = 0.1$、$F_T / F_0 = 10 / 40 = 0.25$，
$$
\sqrt{\frac{1 + \left( 0.2 r \right)^{2}}{\left( 1 - r^{2} \right)^{2} + \left( 0.2 r \right)^{2}}} = 0.25
\quad\Longrightarrow\quad r = 2.32 .
$$
**静变形。**这确定了固有频率，从而确定了变形量，
$$
\omega_n = \frac{25.13}{2.32} = 10.83\ \mathrm{rad / s},
\qquad
\delta_{\text{st}} = \frac{g}{\omega_n^{2}} = \frac{9.81}{117.3} = 84\ \mathrm{mm}.
$$
**振幅——硬底线。**在隔振区$X \to F_0 / \left( m \omega^{2} \right)$，**与刚度无关**，所以
$$
X_{\min} = \frac{40\,000}{400 \times 25.13^{2}} = 158\ \mathrm{mm},
$$
无论刚度取多少都满足不了$3\ \mathrm{mm}$的限值。所需质量为
$$
m \ge \frac{F_0}{\omega^{2} X} = \frac{40\,000}{631.7 \times 0.003} = 21\,100\ \mathrm{kg}.
$$
**设计方案。**取$25\ \mathrm{t}$惯性块，得$X_{\min} = 2.5\ \mathrm{mm}$，配刚度
$$
k = m \omega_n^{2} = 25\,000 \times 117.3 = 2.93 \times 10^{6}\ \mathrm{N / m}
$$
的隔振器，实现$84\ \mathrm{mm}$的静变形。所得振幅为
$$
X = \frac{M F_0}{k} = \frac{0.227 \times 40\,000}{2.93 \times 10^{6}} = 3.1\ \mathrm{mm},
$$
其中$M = 0.227$是$r = 2.32$、$\zeta = 0.1$时的放大因子（不是传递率$0.25$）。这略超限值，故取$30\ \mathrm{t}$：$X = 2.6\ \mathrm{mm}$，$k = 3.52\ \mathrm{MN / m}$，传递力恰为所需的$10\ \mathrm{kN}$。

**设计点评。**这个解答里有三点值得带走。第一，**振幅**要求是质量要求，**力**要求是频率比要求；没有任何刚度选择能同时满足两者，因为隔振区的振幅是$F_0 / m \omega^{2}$，根本不关心$k$。第二，静变形只由频率比决定——$\delta_{\text{st}} = g r^{2} / \omega^{2}$——所以在四赫兹下要求百分之二十五的传递率，就**意味着**接受八十四毫米的下沉，决定隔振器型式的正是这个数字而不是刚度。第三，三十吨块体下八十四毫米的静变形，意味着约$0.29\ \mathrm{MN}$的载荷压在$84\ \mathrm{mm}$的行程上，这是钢弹簧或空气隔振器的问题而不是橡胶的问题，而且块体必须足够重，使其自身的摇摆和俯仰振型远高于四赫兹。这就是大型压力机、锤和剪床安放在机器重量十到五十倍的混凝土块上的原因，也是为什么基础要当作刚体设计，其自身固有频率在选择隔振器之前就要对照激振校核。
:::
:::

::: exercise 推导 {level=3}
证明简谐激振系统传给支座的力为
$$
\frac{F_T}{F_0} = \sqrt{\frac{1 + \left( 2 \zeta r \right)^{2}}{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}} ,
$$
由此推出机器在四倍固有频率、$\zeta = 0.1$下的传递率，并证明$r = \sqrt{2}$以上阻尼是有害的。
::: solution
**传递率。**支座经并联的弹簧和阻尼器反作用，
$$
F_T = k x + c \dot{x},
$$
当$x = X \sin \left( \omega t - \phi \right)$时其幅值为$X \sqrt{k^{2} + \left( c \omega \right)^{2}}$。代入放大因子中的$X$，
$$
\frac{F_T}{F_0}
= \frac{\sqrt{k^{2} + c^{2} \omega^{2}}}{\sqrt{\left( k - m \omega^{2} \right)^{2} + c^{2} \omega^{2}}}
= \frac{\sqrt{1 + \left( c \omega / k \right)^{2}}}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( c \omega / k \right)^{2}}}
= \sqrt{\frac{1 + \left( 2 \zeta r \right)^{2}}{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}} . \quad \checkmark
$$
**$r = 4$、$\zeta = 0.1$时。**
$$
\frac{F_T}{F_0} = \frac{\sqrt{1 + 0.64}}{\sqrt{225 + 0.64}} = \frac{1.281}{15.02} = 0.0853 ,
$$
而无阻尼隔振器为$0.0667$——阻尼使隔振效果**变差**了四分之一。
**$\sqrt{2}$界限。**把$T^{2} = \left( 1 + 4 \zeta^{2} r^{2} \right) / \left[ \left( 1 - r^{2} \right)^{2} + 4 \zeta^{2} r^{2} \right]$写出并令$T = 1$，得
$$
1 + 4 \zeta^{2} r^{2} = \left( 1 - r^{2} \right)^{2} + 4 \zeta^{2} r^{2}
\quad\Longrightarrow\quad
\left( 1 - r^{2} \right)^{2} = 1
\quad\Longrightarrow\quad r = \sqrt{2} .
$$
当$r < \sqrt{2}$时，无论阻尼多大传递率都大于1；当$r > \sqrt{2}$时它小于1，而增大阻尼会**增大**它。

**点评。**$\sqrt{2}$线是振动隔振中被引用最多、也最被误解的结果：它不说明你能得到多少隔振，只说明你有没有隔振。设计数字是频率比，阻尼是为冲过共振而装的——在那里它必不可少——然后在其余场合尽量减小——这就是严肃的隔振系统使用**低损耗因子的黏性阻尼器**、或只在共振附近提供阻尼的主动系统的原因。
:::
:::
