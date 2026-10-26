真实的激励既不是正弦的也不是恒定的。往复发动机往基础里注入的是已知的**线**谱，路面给汽车的是连续随机谱，锤击给结构的是瞬态，地震则同时给出三者。处理这一切的机器只有一个思想——线性系统可叠加，任何激励都可分解为正弦量，于是响应就是各响应的同一分解——外加一个积分，杜阿梅尔（Duhamel）积分，它在时域里干同样的活。

实际回报是工程师真正规定的三个数。**频率响应函数**把测得的力谱变成预测的振动谱。**冲击响应谱**把规定的半正弦脉冲变成结构每个固有频率对应的设计加速度。**功率谱密度**把随机振动试验量级变成均方根加速度，并借助峰值的瑞利（Rayleigh）分布变成疲劳寿命。

::: warning 随机振动没有单一振幅
随机信号由**分布**描述，而不是由一个数描述；说"振动量级"却不说明它是均方根值、峰值、$3 \sigma$值还是功率谱密度，是环境试验中最常见的错误来源。对窄带高斯过程，峰值服从**瑞利**分布，所以最大期望峰值与均方根值之比取决于你愿意等待多少个周期：千分之一的峰值对应$3.7 \sigma$，百万分之一的对应$5.3 \sigma$。规定为"$4.5\ \mathrm{g}$均方根、两分钟"的试验和规定为"$4.5\ \mathrm{g}$峰值"的试验并不近似等价——前者包含$17\ \mathrm{g}$的峰值，后者任何峰值都不超过$4.5$。
:::

::: quiz
一台机器装在固有频率为$5\ \mathrm{Hz}$的隔振器上，支承结构自身的固有频率为$4\ \mathrm{Hz}$。隔振从何处开始：
- [ ] $7.1\ \mathrm{Hz}$以上，即支承频率的$\sqrt{2}$倍
- [x] 两质量系统较高的**耦合**固有频率以上，而不是$\sqrt{2} \times 5\ \mathrm{Hz}$以上
- [ ] $5\ \mathrm{Hz}$以上，因为那时传递率降到1以下
- [ ] 立即开始，因为任何弹性都隔振
::: solution
两个质量和两个弹簧给出**两个**固有频率，隔振由较高者支配，并在较低者处出现巨大放大。对[[vibrations/isolation-transmissibility#ex-flexible-foundation]]中算过的情形，耦合频率为$3.0$和$6.7\ \mathrm{Hz}$，每牛顿外加力对应的传递力在$1\ \mathrm{Hz}$为$1.15$、在较低振型为$800$、在$5\ \mathrm{Hz}$为$1.28$、直到$10\ \mathrm{Hz}$才降到$0.079$。经验法则$\sqrt{2} f_n$假设基础是**刚性**的；基础不刚时，既移动隔振门限，又制造出一个低频振型，在那里隔振使问题严重得多。这就是为什么装在轻质钢楼板上的机器，隔振效果常常不如同一台机器螺栓连接到混凝土惯性块上，也是为什么振动规范总要写明要从其隔振的表面阻抗。
:::
:::

## 分解激励

::: definition 频域描述 {#def-frequency-domain}
周期力是**傅里叶（Fourier）级数**，$F (t) = \sum_n F_n \sin \left( n \Omega t + \phi_n \right)$；非周期力是**傅里叶变换**，$F (t) = \int_0^{\infty} F_\omega \cos \left( \omega t + \phi_\omega \right) \mathrm{d} \omega$。对线性系统，响应由每个分量乘以频率响应函数得到：
$$
\frac{X_\omega}{F_\omega} = \frac{1 / k}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}},
\qquad
\phi (\omega) = - \tan^{- 1} \frac{2 \zeta r}{1 - r^{2}} .
$$
对**随机**激励，相应的表述用均方值，因为相位不相关：
$$
S_x (\omega) = \left| H (\omega) \right|^{2} S_F (\omega),
\qquad
\langle x^{2} \rangle = \int_0^{\infty} S_x (\omega) \, \mathrm{d} \omega ,
$$
其中$S$表示**功率谱密度**，$\langle \cdot \rangle$表示期望。
:::

::: theorem 杜阿梅尔积分 {#thm-duhamel}
$m \ddot{x} + c \dot{x} + k x = F (t)$在零初始条件下对任意力的响应为
$$
x (t) = \frac{1}{m \omega_d} \int_0^{t} F (\tau) e^{- \zeta \omega_n (t - \tau)} \sin \omega_d (t - \tau) \, \mathrm{d} \tau ,
$$
即脉冲响应的叠加：在时刻$\tau$施加的脉冲$F (\tau) \mathrm{d} \tau$启动一次自由有阻尼振荡，到$t$时刻观测响应时它已衰减了因子$e^{- \zeta \omega_n (t - \tau)}$。
:::

::: proof 卷积积分 {#proof-duhamel}
初始静止的系统在$t = 0$受脉冲$J$作用产生速度$J / m$，因而响应为
$$
x (t) = \frac{J}{m \omega_d} e^{- \zeta \omega_n t} \sin \omega_d t .
$$
现在把一般力看作在时刻$\tau$施加的一串脉冲$F (\tau) \mathrm{d} \tau$。由线性，$t$时刻的响应是各脉冲响应之和，而每个响应已衰减了时间$t - \tau$：
$$
x (t) = \frac{1}{m \omega_d} \int_0^{t} F (\tau) e^{- \zeta \omega_n \left( t - \tau \right)} \sin \omega_d \left( t - \tau \right) \mathrm{d} \tau .
$$
求导验证：记脉冲响应函数为$g (t) = e^{- \zeta \omega_n t} \sin \omega_d t / \left( m \omega_d \right)$，有$g (0) = 0$，$\dot{g} (0) = 1 / m$，且$t > 0$时$m \ddot{g} + c \dot{g} + k g = 0$。由$x (t) = \int_0^{t} g (t - \tau) F (\tau) \, \mathrm{d} \tau$及莱布尼茨（Leibniz）法则，
$$
\dot{x} = g (0) F (t) + \int_0^{t} \dot{g} (t - \tau) F (\tau) \, \mathrm{d} \tau = \int_0^{t} \dot{g} (t - \tau) F (\tau) \, \mathrm{d} \tau ,
\qquad
\ddot{x} = \dot{g} (0) F (t) + \int_0^{t} \ddot{g} (t - \tau) F (\tau) \, \mathrm{d} \tau ,
$$
所以
$$
m \ddot{x} + c \dot{x} + k x
= m \dot{g} (0) F (t) + \int_0^{t} \left( m \ddot{g} + c \dot{g} + k g \right) (t - \tau) \, F (\tau) \, \mathrm{d} \tau
= F (t),
$$
因为$m \dot{g} (0) = 1$，而括号中的量对正自变量为零。$\checkmark$

**注。**该积分是**卷积**，所以一个脉冲响应对一切力历程都适用——这就是它用快速傅里叶变换计算的原因，也是频域方法和时域方法本是同一方法两端的视图的原因。
:::

::: example 载荷突然施加 {#ex-step}
一个$8\ \mathrm{kN}$的重物从足够小、可称为突然施加的高度落到刚度$400\ \mathrm{kN / m}$的弹簧支承平台上。求最大挠度；若载荷在半个固有周期内施加，挠度又是多少。
::: solution
**突然施加。**由$X_{\text{st}} = W / k = 8000 / 400\,000 = 20\ \mathrm{mm}$，
$$
x = X_{\text{st}} \left( 1 - \cos \omega_n t \right), \qquad
x_{\max} = 2 X_{\text{st}} = 40\ \mathrm{mm},
$$
即**动载系数**为二。
**半周期内线性施加。**对按$F = F_0 t / t_1$上升到$F_0$后保持不变的力，无阻尼峰值为（见下文习题“卷积”）
$$
x_{\max} = X_{\text{st}} \left( 1 + \frac{\left| \sin \left( \omega_n t_1 / 2 \right) \right|}{\omega_n t_1 / 2} \right) .
$$
取$t_1 = \tau / 2 = \pi / \omega_n$，则$\omega_n t_1 / 2 = \pi / 2$，
$$
x_{\max} = X_{\text{st}} \left( 1 + \frac{2}{\pi} \right) = 1.64 X_{\text{st}} = 32.7\ \mathrm{mm}.
$$
若在一个完整周期内施加，$\omega_n t_1 = 2 \pi$，正弦为零，$x_{\max} = X_{\text{st}} = 20\ \mathrm{mm}$。

**校核。**能量：从零高度落下给$k x_{\max}^{2} / 2 = W x_{\max}$，所以$x_{\max} = 2 W / k$ $\checkmark$

**合理性检验。**把施加过程从瞬时放慢到一个固有周期，峰值载荷减半，而代价不过是一个阀或软启动。这就是机械设计中的**柔性接合**：离合器、制动器、电磁阀或液压阀若在与被驱动传动链固有周期相当的时间内接合，承受的转矩就只是急剧接合时的一小部分——这就是每台大型齿轮箱和每台印刷机规定的是接合**时间**而不是接合本身的原因。
:::
:::

::: example 冲击脉冲与冲击响应谱 {#ex-srs}
某设备规定须承受$30\ g$、历时$11\ \mathrm{ms}$的半正弦**加速度**脉冲。求固有频率为$30\ \mathrm{Hz}$的安装支架的设计响应，以及$100\ \mathrm{Hz}$支架的。
::: solution
脉冲周期比为$T_n / \tau$：
$$
f = 30\ \mathrm{Hz} : \quad T_n = 33.3\ \mathrm{ms}, \quad \frac{T_n}{\tau} = 3.03 ;
\qquad
f = 100\ \mathrm{Hz} : \quad T_n = 10\ \mathrm{ms}, \quad \frac{T_n}{\tau} = 0.91 .
$$
由半正弦脉冲的冲击响应谱（伪加速度，阻尼$2\%$）：
$$
\frac{T_n}{\tau} = 3.03 : \quad \text{PSA} / A = 1.16, \qquad
\frac{T_n}{\tau} = 0.91 : \quad \text{PSA} / A = 1.66 ,
$$
$$
a_{30} = 1.16 \times 30 = 35\ g, \qquad a_{100} = 1.66 \times 30 = 50\ g .
$$
**校核。**对很柔的物件$\left( T_n \gg \tau \right)$谱按$4 \tau / T_n$下降，所以$T_n / \tau = 3.03$时渐近线给$4 / 3.03 = 1.32$，对比算得的$1.16$——量级对，趋势对。$\checkmark$

**合理性检验。**$100\ \mathrm{Hz}$的支架从同一冲击中看到的设计加速度比$30\ \mathrm{Hz}$的多**约百分之四十**——这就是加固作业能让一个原本通过冲击试验的部件变得不通过的原因。$30\ \mathrm{g}$的半正弦不是$30\ \mathrm{g}$的试验：它是一项依物件固有频率所在位置施加$10$到$50\ \mathrm{g}$不等的试验。其形状——刚性物件处平坦于1附近、$T_n \approx \tau$处约$1.7$的峰值、柔性物件处按$4 \tau / T_n$下降的尾巴——对一切脉冲形状都相同。
:::
:::

::: widget plot
f: (1+1.67*x^2)/(1+0.22*x+0.4175*x^3)
x: 0.2, 6
y: 0, 2
labels: \text{伪加速度放大因子 } \left( \mathrm{g} \right)
caption: 半正弦加速度脉冲的近似冲击响应谱，横轴为振子固有周期与脉冲历时之比$T_n / \tau$，纵轴为伪加速度放大因子。刚性物件处曲线在1附近平坦，固有周期与脉冲历时匹配处在约$1.7$处出现峰值，柔性物件处按$4 \tau / T_n$下降。所画公式是对精确谱的光滑拟合而非精确谱本身，精度约百分之七；真实曲线由对每个固有频率积分运动方程算出——每个冲击谱程序都是这么做的，一千个频率大约只需一秒。
:::

::: proof 输入谱如何变成输出谱 {#proof-psd-filter}
设力是功率谱密度为$S_F (\omega)$的随机过程，故$\langle F^{2} \rangle = \int_0^{\infty} S_F \mathrm{d} \omega$。把它表示为频率分隔良好、相位相互独立的随机分量之和，
$$
F (t) = \sum_j A_j \cos \left( \omega_j t + \phi_j \right),
\qquad
\langle F^{2} \rangle = \tfrac{1}{2} \sum_j A_j^{2},
\qquad
S_F (\omega_j ) \Delta \omega = A_j^{2} / 2 .
$$
线性系统的响应是各响应之和，每个按$\left| H (\omega_j ) \right|$缩放：
$$
x (t) = \sum_j A_j \left| H (\omega_j ) \right| \cos \left[ \omega_j t + \phi_j + \phi_H (\omega_j ) \right] .
$$
因为相位$\phi_j$相互独立，交叉项$\cos \left( \omega_i t + \cdot \right) \cos \left( \omega_j t + \cdot \right)$的时间平均在$i \ne j$时为零，于是
$$
\langle x^{2} \rangle = \tfrac{1}{2} \sum_j A_j^{2} \left| H (\omega_j ) \right|^{2}
= \sum_j S_F (\omega_j ) \left| H (\omega_j ) \right|^{2} \Delta \omega
\;\longrightarrow\;
\int_0^{\infty} \left| H (\omega) \right|^{2} S_F (\omega) \mathrm{d} \omega .
$$
由于这对每个频带都成立，$S_x (\omega) = \left| H (\omega) \right|^{2} S_F (\omega)$。$\checkmark$
**白输入的闭式解。**取$S_F = S_0$为常数、$H = 1 / \left( k \sqrt{\left( 1 - r^{2} \right)^{2} + 4 \zeta^{2} r^{2}} \right)$，
$$
\langle x^{2} \rangle = \frac{S_0 \omega_n}{k^{2}} \int_0^{\infty} \frac{\mathrm{d} r}{\left( 1 - r^{2} \right)^{2} + 4 \zeta^{2} r^{2}}
= \frac{S_0 \omega_n}{k^{2}} \cdot \frac{\pi}{4 \zeta}
= \frac{\pi S_0 \omega_n Q}{2 k^{2}} ,
$$
用到标准积分和$Q = 1 / \left( 2 \zeta \right)$。

**注。**因此响应均方根按$\sqrt{Q}$增长，而*正弦*力下共振响应按$Q$增长。把同一结果写成等效矩形谱：响应峰下的面积等于其高度$\left( Q^{2} S_0 / k^{2} \right)$乘以宽度$\pi \omega_n / \left( 2 Q \right)$，即$\pi / 2$个半功率带宽——正是这个因子使随机试验比同峰值量级的正弦驻留苛刻得多，因为随机试验激励的是共振的**整个宽度**而不只是峰顶。
:::

## 随机振动

::: proposition 随机振动与功率谱密度 {#prop-psd}
对均方值为$\sigma^{2}$的窄带高斯随机过程：
- **瞬时振幅**服从高斯分布，$p (x ) \propto e^{- x^{2} / 2 \sigma^{2}}$，所以信号百分之六十八的时间落在$\pm \sigma$内，百分之九十九点七落在$\pm 3 \sigma$内；
- **峰值振幅**服从**瑞利**分布，$P (X > x ) = e^{- x^{2} / 2 \sigma^{2}}$，所以$N$个周期中超过$3 \sigma$的期望峰数为$N e^{- 4.5} = 0.011 N$；
- 均方根是功率谱密度下面积的平方根，$\sigma = \sqrt{\int S_x \mathrm{d} f}$；
- 均方根值为$\sigma_S$的窄带应力过程下的**疲劳**损伤由瑞利分布和迈纳（Miner）法则得出：取S-N曲线$S^{m} N = C$、循环数为$n$，$D = \left( n / C \right) \left( \sqrt{2} \sigma_S \right)^{m} \Gamma \left( 1 + m / 2 \right)$，对$m = 3$为
$$
D = \frac{n}{C} \left( \sqrt{2} \sigma_S \right)^{3} \Gamma (2.5) = 3.76 \, \frac{n \sigma_S^{3}}{C},
$$
所以损伤等效的等幅应力为$S_{\text{eq}} = 3.76^{1 / 3} \sigma_S = 1.55 \sigma_S$（推导见最后一道习题）。
:::

::: example 随机试验量级 {#ex-random-test}
某航电箱按$20$到$2000\ \mathrm{Hz}$内平坦于$0.01\ \mathrm{g^{2} / Hz}$的功率谱密度试验。求均方根加速度、主导频率$60\ \mathrm{Hz}$下两分钟内期望的最大峰值；以及共振频率为$180\ \mathrm{Hz}$、$Q = 12$的元件的均方根响应。
::: solution
**均方根。**
$$
\sigma = \sqrt{0.01 \times \left( 2000 - 20 \right)} = \sqrt{19.8} = 4.45\ \mathrm{g} .
$$
**最大期望峰值。**$60\ \mathrm{Hz}$下$120\ \mathrm{s}$共$7200$个循环，只出现一次的峰值由$e^{- x^{2} / 2} = 1 / 7200$给出，所以
$$
x = \sqrt{2 \ln 7200} = \sqrt{17.76} = 4.21 \sigma = 18.8\ \mathrm{g}.
$$
**共振处。**轻阻尼振子主要响应其半功率带内的输入；把上面的白噪声结果写成基础加速度激励的形式，就得到**迈尔斯（Miles）公式**
$$
\sigma_{\text{resp}} = \sqrt{\frac{\pi}{2} f_n Q \, S_a}
= \sqrt{\frac{\pi}{2} \times 180 \times 12 \times 0.01} = 5.8\ \mathrm{g},
$$
而在$180\ \mathrm{Hz}$下$120\ \mathrm{s}$（$21\,600$个循环）内的最大期望峰值是它的$\sqrt{2 \ln 21\,600} = 4.47$倍，约$26\ \mathrm{g}$。

**合理性检验。**$4.5\ \mathrm{g}$均方根的试验量级包含$19\ \mathrm{g}$的输入峰值。共振响应**不是**总输入均方根的$Q$倍——共振只响应其附近窄带内的输入，这就是响应均方根按$\sqrt{Q}$而不是$Q$增长的原因。这也是那些看起来古怪的单位自有道理的原因：谱密度下的面积单位是$\mathrm{g^{2}}$，其平方根就是以g计的均方根。
:::
:::

::: example 随机载荷下的疲劳 {#ex-random-fatigue}
拖车上的支架承受均方根值$22\ \mathrm{MPa}$、均值为零的随机应力，平均过零频率为$8\ \mathrm{Hz}$。材料S-N线为$S^{3} N = 2.4 \times 10^{12}$，疲劳极限为$18\ \mathrm{MPa}$。估算寿命。
::: solution
**不截断的损伤。**每秒$n = 8$个循环、幅值服从瑞利分布，
$$
D = \frac{n}{C} \left( \sqrt{2} \sigma \right)^{3} \Gamma (2.5)
= \frac{8}{2.4 \times 10^{12}} \times 31.1^{3} \times 1.329 = 1.33 \times 10^{- 7} \ \text{每秒},
$$
$$
\text{寿命} = \frac{1}{D} = 7.5 \times 10^{6}\ \mathrm{s} \approx 2080\ \mathrm{h}.
$$
**计入疲劳极限。**若低于$S_e = 18\ \mathrm{MPa}$的循环不造成损伤，则损伤减去$S_e / \sigma = 0.818$以下部分所占的份额：
$$
\frac{\int_0^{0.818} u^{4} e^{- u^{2} / 2} \mathrm{d} u}{\int_0^{\infty} u^{4} e^{- u^{2} / 2} \mathrm{d} u} = \frac{0.058}{3.760} = 0.015 ,
$$
所以寿命只增加到约$2110\ \mathrm{h}$。

**校核。**损伤等效应力为$1.55 \sigma = 34.2\ \mathrm{MPa}$，而$2.4 \times 10^{12} / 34.2^{3} / 8 = 7.5 \times 10^{6}\ \mathrm{s}$ $\checkmark$

**合理性检验。**疲劳极限几乎不起作用，因为在三次方律下损伤是由远高于均方根的峰值造成的——低于$0.8 \sigma$的小循环只贡献$1.5\%$。结果反而对S-N曲线和均方根应力敏感：$\sigma$有$10\%$的误差，寿命就有$30\%$的误差。焊接细节根本没有可靠的疲劳极限，所以安全的做法是不计入疲劳极限，并在给出寿命时写明假设。
:::
:::

::: example 设计 {#ex-design-ship-instrument}
船上一台$40\ \mathrm{kg}$的仪器柜安装后固有频率须在$35\ \mathrm{Hz}$以上，并须承受$5\ \mathrm{g}$、$15\ \mathrm{ms}$的半正弦冲击。规定支承并校核冲击。
::: solution
**刚度。**
$$
\omega_n = 2 \pi \times 35 = 220\ \mathrm{rad / s}, \qquad
k = 40 \times 220^{2} = 1.94 \times 10^{6}\ \mathrm{N / m},
$$
$$
\delta_{\text{st}} = \frac{40 \times 9.81}{1.94 \times 10^{6}} = 0.20\ \mathrm{mm}.
$$
**冲击。**$T_n = 28.6\ \mathrm{ms}$，$T_n / \tau = 28.6 / 15 = 1.91$，由半正弦谱$\text{PSA} / A = 1.56$，所以
$$
a_{\text{resp}} = 1.56 \times 5 = 7.8\ \mathrm{g},
\qquad
F = m a = 40 \times 7.8 \times 9.81 = 3060\ \mathrm{N}.
$$
**挠度。**$x = a_{\text{resp}} / \omega_n^{2} = 7.8 \times 9.81 / 48\,400 = 1.58\ \mathrm{mm}$，约为静变形的八倍，所以支承需要$2\ \mathrm{mm}$行程加限位块。

**设计点评。**"高于$35\ \mathrm{Hz}$"是一条**刚度**要求，它使支承几乎刚性：$0.2\ \mathrm{mm}$的静变形是带橡胶垫圈的螺栓法兰给出的，不是隔振器给出的。后果是该支承在船的激励频率处**不提供**任何振动隔振——而这正是船用设备规范通常所要求的：把频率抬到激励带以上，使设备**随**船一起运动而不是放大，于是冲击载荷因为支承刚硬而很高。这种设计张力真实且无法回避：软支承降低冲击载荷，却把固有频率拉进激励带；唯一的出路是加入**阻尼**使共振不成为峰值，或接受两级方案——刚性主支承加有阻尼的次支承。这就是船用设备支承同时规定最低频率和最高传递率的原因，也是它们通常用阻尼橡胶-金属夹层螺栓穿过安装、而不是装在弹簧上的原因。
:::
:::

::: history
**卷积积分**以杜阿梅尔（Duhamel）命名，他1833年关于热传导的工作使用了对输入相继增量的响应叠加。**傅里叶（Fourier）**级数（1807年，1822年发表）和**维纳–辛钦（Wiener–Khinchin）**定理（维纳1930年，辛钦1934年）——后者把平稳过程的自相关与其功率谱联系起来——是使随机振动得以计算的两大结果。**响应谱**的思想可追溯到毕奥（Maurice Biot）1932年关于建筑物地震响应的博士工作，冲击响应谱如今是规定设备机械冲击的标准方式。**随机振动疲劳**建立在S. O. 莱斯（Rice）1944–1945年对随机噪声的分析之上——它给出了窄带过程的水平穿越率和峰值的瑞利分布——以及迈尔斯（Miles）1954年关于随机载荷下结构疲劳的论文之上，后者把这些结果与迈纳法则结合，并给出了上文所用的轻阻尼振子对白噪声的均方根响应。以$\mathrm{g^{2} / Hz}$表示的**功率谱密度**在同一时期成为航空航天振动试验的通用语言。
:::

## 后续内容

支撑这一切的谐波频率响应函数见[[vibrations/harmonic-excitation]]，卷积中用到的自由衰减响应见[[vibrations/free-vibration]]，频率响应函数向模态叠加的多自由度推广见[[vibrations/modal-analysis]]，随机激励的隔振见[[vibrations/isolation-transmissibility]]。例 4 用到的疲劳累积法则在[[machine-design/fatigue]]中展开。

::: summary
- 线性系统可叠加，所以任何力都分解为正弦量，各自乘以频率响应函数，再重新组装出响应。
- 杜阿梅尔积分在时域做同样的事：力与脉冲响应的卷积。
- 突然施加的载荷产生两倍静变形；在一个固有周期内线性施加的载荷产生约一倍。
- 冲击响应谱把一个脉冲规定变成每个固有频率的设计载荷，在$T_n = \tau$附近出现约$1.7$倍脉冲幅值的峰值。
- 以$\mathrm{g^{2} / Hz}$规定的随机量级，其均方根等于面积的平方根，最大峰值为均方根的$3.7$到$5.3$倍。
- 随机疲劳用峰值的瑞利分布配合迈纳法则；S-N指数为三时损伤等效应力约为$1.55 \sigma$，计入疲劳极限影响不大。
:::

## 习题

::: exercise 动载系数 {level=1 check="2"}
载荷无落差地突然施加，动载系数是多少？
::: solution
$2$——最大挠度是静挠度的两倍。
:::
:::

::: exercise 均方根 {level=1 check="1"}
某随机振动在$500\ \mathrm{Hz}$内功率谱密度平坦于$0.002\ \mathrm{g^{2} / Hz}$。求其均方根加速度。（以g为单位输入。）
::: solution
$\sigma = \sqrt{0.002 \times 500} = 1.0\ \mathrm{g}$。
**注。**应输入的答案是$1.0\ \mathrm{g}$。
:::
:::

::: exercise 瑞利 {level=1 check="0.011"}
对窄带高斯过程，超过$3 \sigma$的峰值占多大比例？
::: solution
$P = e^{- 9 / 2} = 0.011$，约九十个峰中一个。
:::
:::

::: exercise 傅里叶 {level=2}
一台$1500\ \mathrm{rpm}$的两缸四冲程发动机驱动压缩机。列出$100\ \mathrm{Hz}$以内的激励频率，并指出哪些阶次占主导。
::: solution
曲轴频率为$25\ \mathrm{Hz}$；对四冲程两缸机，点火频率为$25\ \mathrm{Hz}$（四冲程两缸每转一次爆燃），所以主导阶次为$25\ \mathrm{Hz}$的**一阶**、$50\ \mathrm{Hz}$的**二阶**和$100\ \mathrm{Hz}$的**四阶**，$75\ \mathrm{Hz}$的三阶存在但较小。
**合理性检验。**竖直固有频率为$45\ \mathrm{Hz}$的压缩机基础不直接被其中任何频率激励，但$50\ \mathrm{Hz}$的二阶只差百分之十一，二者之间的拍频会表现为振动的缓慢脉动。这就是振动频谱要对照机器阶次表来读的原因，也是"振动在$50\ \mathrm{Hz}$"对$1500\ \mathrm{rpm}$四冲程机（二阶，正常）和对电动机（工频，电气性或铁芯松动）意味着完全不同的东西的原因。
:::
:::

::: exercise 卷积 {level=2}
对无阻尼系统用杜阿梅尔积分求如下力的响应：力在时间$t_1$内从零线性上升到$F_0$，之后保持$F_0$。证明$t_1$之后的残余振幅为$\left( 2 X_{\text{st}} / \omega_n t_1 \right) \sin \left( \omega_n t_1 / 2 \right)$，并求使残余振动为零的斜坡时间。
::: solution
**斜坡期间。**由$F = F_0 \tau / t_1$，
$$
x (t) = \frac{F_0}{m \omega t_1} \int_0^t \tau \sin \omega (t - \tau) \mathrm{d} \tau
= X_{\text{st}} \left( \frac{t}{t_1} - \frac{\sin \omega t}{\omega t_1} \right),
$$
所以$t = t_1$时
$$
x_1 = X_{\text{st}} \left( 1 - \frac{\sin \omega_n t_1}{\omega_n t_1} \right),
\qquad
\dot{x}_1 = \frac{X_{\text{st}}}{t_1} \left( 1 - \cos \omega_n t_1 \right).
$$
**斜坡之后。**运动是绕$X_{\text{st}}$的自由振荡，取$A = x_1 - X_{\text{st}}$、$B = \dot{x}_1 / \omega_n$，
$$
X_{\text{res}} = \sqrt{A^{2} + B^{2}}
= \frac{X_{\text{st}}}{\omega_n t_1} \sqrt{\sin^{2} \omega_n t_1 + \left( 1 - \cos \omega_n t_1 \right)^{2}}
= \frac{X_{\text{st}} \sqrt{2 - 2 \cos \omega_n t_1}}{\omega_n t_1}
= \frac{2 X_{\text{st}}}{\omega_n t_1} \left| \sin \frac{\omega_n t_1}{2} \right| .
$$
**无残余。**当$\omega_n t_1 / 2 = \pi$即$t_1 = 2 \pi / \omega_n = \tau$——**一个完整固有周期**——残余消失。
**合理性检验。**把力在恰好一个固有周期内线性施加，系统最终在满载$F_0$下静止——这是**输入整形**的基础，用于起重机控制、磁盘驱动器磁头定位和激光切割振镜，其中成形的指令脉冲精确抵消残余振动。由于斜坡期间$\dot{x} = X_{\text{st}} \left( 1 - \cos \omega t \right) / t_1 \ge 0$始终成立，位移单调增到$X_{\text{st}}$且**完全没有超调**，所以整周期斜坡是不留残余振动的最短线性斜坡，并且无超调地到达载荷。该结果可推广到任意多个成形台阶，双台阶整形器在一个频带内而不是在一个频率上消除残余。
:::
:::

::: exercise 冲击谱 {level=2}
对例 2 的设备，求$10\ \mathrm{Hz}$和$300\ \mathrm{Hz}$处的设计响应。
::: solution
$$
f = 10\ \mathrm{Hz} : \quad T_n = 100\ \mathrm{ms}, \quad T_n / \tau = 9.1,
\quad \text{PSA} / A \approx \frac{4}{9.1} = 0.44,
\qquad a = 13\ g,
$$
$$
f = 300\ \mathrm{Hz} : \quad T_n = 3.33\ \mathrm{ms}, \quad T_n / \tau = 0.30,
\quad \text{PSA} / A \approx 1.14,
\qquad a = 34\ g .
$$
**合理性检验。**$10\ \mathrm{Hz}$的柔性物件从$30\ \mathrm{g}$脉冲中只看到$13\ \mathrm{g}$，因为它在$11\ \mathrm{ms}$内来不及响应——它把冲击当作缓慢位移"骑"了过去。$300\ \mathrm{Hz}$的刚性物件则几乎准静态地看到略多于$30\ \mathrm{g}$的加速度。两者都不在危险区，该脉冲的危险区约在$45$到$115\ \mathrm{Hz}$之间（$T_n / \tau$从$0.8$到$2$）；这恰恰是冲击规定必须通过谱来施加的原因：把所有东西都按$30\ \mathrm{g}$设计的工程师，会把柔性物件超设计两倍，却可能仍然低估坐在$T_n = \tau$处的那些。
:::
:::

::: exercise 随机 {level=3}
对例 3 的航电箱，试验每个轴向做$60\ \mathrm{s}$、共三个轴向。估算箱体看到的最大峰值，并说明该试验真正在检验什么。
::: solution
按$60\ \mathrm{Hz}$的过零率，每轴$3600$个循环给
$$
x = \sqrt{2 \ln 3600} = 4.05 \sigma = 18.0\ \mathrm{g}
$$
（输入端）。在$180\ \mathrm{Hz}$共振处，每轴$10\,800$个循环给出$5.8\ \mathrm{g}$均方根响应的$\sqrt{2 \ln 10\,800} = 4.31$倍，约$25\ \mathrm{g}$。
**合理性检验。**该试验不是在拿$4.45\ \mathrm{g}$检验箱体，而是在拿夹具处$18\ \mathrm{g}$的峰值、其自身共振处约$25\ \mathrm{g}$的峰值以及每轴数千个较小的循环检验箱体。这就是随机试验在这类设备上基本取代了正弦驻留试验的原因：共振处的正弦驻留一遍又一遍施加**同一个**循环，造成的疲劳损伤远大于真实环境，所以挺过正弦驻立的试件可能是被**过度**试验了，而挺过随机试验的试件经历的是正确的幅值分布和正确的个数。推论是随机试验不能靠按时间比例提高量级来缩短，因为应力与谱量级的**平方根**成正比，损伤与应力的三次方成正比，即与量级的$1.5$次方成正比——加速的随机试验是另一种试验，不是更快的试验。
:::
:::

::: exercise 推导 {level=3}
推导窄带高斯过程的峰值瑞利分布，并由此求S-N指数为三时的损伤等效应力。
::: solution
**峰值。**对高斯过程，$x$和$\dot{x}$联合正态、不相关因而独立，标准差分别为$\sigma$和$\omega_c \sigma$，$\omega_c$为中心频率：
$$
p (x , \dot{x} ) = \frac{1}{2 \pi \sigma \cdot \omega_c \sigma}
\exp \left( - \frac{x^{2}}{2 \sigma^{2}} - \frac{\dot{x}^{2}}{2 \omega_c^{2} \sigma^{2}} \right) .
$$
单位时间内对水平$x$的上穿期望次数由赖斯公式给出，
$$
\nu^{+} (x ) = \int_0^{\infty} \dot{x} \, p (x , \dot{x} ) \mathrm{d} \dot{x}
= \frac{\omega_c}{2 \pi} e^{- x^{2} / 2 \sigma^{2}} \int_0^{\infty} \frac{\dot{x}}{\omega_c \sigma} e^{- \dot{x}^{2} / 2 \omega_c^{2} \sigma^{2}} \mathrm{d} \dot{x}
= \frac{\omega_c}{2 \pi} e^{- x^{2} / 2 \sigma^{2}} ,
$$
因为该积分等于一。对窄带过程每个极大值都是一次上穿，所以峰值振幅密度正比于$\nu^{+}$，在$X \ge 0$上归一化，
$$
p (X ) = \frac{X}{\sigma^{2}} e^{- X^{2} / 2 \sigma^{2}},
\qquad
P (X > x ) = e^{- x^{2} / 2 \sigma^{2}} ,
$$
即瑞利分布。
**等效应力。**由$S^{m} N = C$和迈纳法则，$n$个循环每秒造成的损伤为
$$
D = \frac{n}{C} \mathbb{E} \left[ S^{m} \right],
\qquad
\mathbb{E} \left[ S^{m} \right] = \int_0^{\infty} S^{m} \frac{S}{\sigma^{2}} e^{- S^{2} / 2 \sigma^{2}} \mathrm{d} S .
$$
代入$u = S / \left( \sqrt{2} \sigma \right)$，
$$
\mathbb{E} \left[ S^{m} \right] = \left( \sqrt{2} \sigma \right)^{m} \int_0^{\infty} u^{m + 1} e^{- u^{2}} \mathrm{d} u
= \left( \sqrt{2} \sigma \right)^{m} \Gamma \! \left( 1 + \frac{m}{2} \right) ,
$$
所以由$D = n S_{\text{eq}}^{m} / C$定义的损伤等效幅值$S_{\text{eq}}$为
$$
S_{\text{eq}} = \sqrt{2} \, \sigma \left[ \Gamma \! \left( 1 + \tfrac{m}{2} \right) \right]^{1 / m} .
$$
$m = 3$时$\Gamma (2.5) = 1.3293$，得$S_{\text{eq}} = 1.414 \times 1.0996 \, \sigma = 1.555 \sigma$。
**注。**若以**峰值**分布自身的均方根$\sqrt{2} \sigma$（而非过程均方根$\sigma$）为基准，同一结果写作$S_{\text{eq}} = 1.10 \, \sigma_{\text{peaks}}$，两种说法是同一句话。由于这类因子所对照的基准值各不相同，诚实的做法是写明用了哪种约定。不容置疑的是论证的形状：随机过程的疲劳损伤是均方根应力的S-N指数次幂乘以一个量级为一的数——这就是随机疲劳能从单次频谱测量估算出来的原因。
:::
:::
