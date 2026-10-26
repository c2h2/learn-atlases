静止的流体不承受**剪力**，因此一点处的应力只有一个法向应力，整个学科坍缩为一个一阶常微分方程$\nabla p = \rho \mathbf{g}$。本课的一切——大坝上的力、船舶的吃水、起重驳船的横摇周期、气压计的读数、热气球上升的原因——都是这个方程积分一次再乘一个面积。

它值得占一整课而不是一页纸，是因为**答案并不直观**。浸没平面上的力并不作用在形心；浮体上的浮力并不通过其重心，而它真正通过的那个点**在物体倾斜两度时就会移动**；容器底部的压强与容器的形状完全无关——这句话如此违反直觉，以致帕斯卡（Pascal）用它以一管几米高的水柱撑爆了一只木桶。

::: warning 会爆罐翻驳的七种静力学错误
**把形心压强乘以面积，并把合力放在形心。**对密度不变的平面，大小$F = p_c A$是对的；**位置**不对。压心在形心以下$I_c / \left( y_c A \right)$处：对顶边与水面齐平的$2\ \mathrm{m}$方形闸门是**$0.29\ \mathrm{m}$**，对$6\ \mathrm{m}$深的闸门是**$0.33\ \mathrm{m}$**。对错误之点算的铰链力矩错$15$到$20\ \%$，按它选的启闭机顶不开自己的楔块。**对两侧都接触大气的表面使用表压。**封闭罐的端板内侧受$p_{\mathrm{gauge}}$、外侧受$0$，忘记外侧的计算是对的；而对**浸没**平板用绝对压强的计算多加了$101\ \mathrm{kPa} \times A$，对$1\ \mathrm{m^{2}}$的板就是**十吨幽灵力**。**把稳心放在重心以上就宣称船够稳。**稳性要求$G$在$M$**之下**，即$GM > 0$，而$M$不是固定点——它是**当前横倾角下**浮力作用线与中站面的交点，随$BM = I / \nabla$随水线面而变。一艘$0^{\circ}$时稳、又有大自由液面的驳船，在$5^{\circ}$时可能$GM = - 0.2\ \mathrm{m}$，“装载时没事”不是稳性证书。**忘记自由液面修正。**部分充满舱柜的自由液面把**自己的**惯性矩加进横向惯性，对初稳性高的修正是
$$
\Delta GM = - \frac{\rho_{\mathrm{tank}}}{\rho_{\mathrm{fluid}}} \frac{i_{\mathrm{tank}}}{\nabla}
$$
对排水量$400\ \mathrm{m^{3}}$驳船中一个长$10\ \mathrm{m}$、宽$8\ \mathrm{m}$的未满舱，这是$- \left( 1{,}000 / 1{,}025 \right) \times \left( 10 \times 8^{3} / 12 \right) / 400 = - 1.04\ \mathrm{m}$——**仅仅一个半满舱，就吃掉典型驳船整个初稳性高的四分之一**。每条船的“未满舱”规则和每辆罐车的挡板舱，都因这一个数而存在。**读测压管时不在两臂中追踪同一种流体。**规则是从一端出发，下降加$\rho g h$、上升减$\rho g h$，到另一端为止；含有两种流体的一臂必须在分界面处拆开。一臂倒置、内装比重$0.8$的油却被当作水来读的测压管错$25\ \%$；两臂温度不同的差压测压管，其误差谁也说不清。**假定静止压强分布在运动流体中仍然成立。**它只在竖直加速度可忽略处成立，即流线曲率半径远大于水深。溢流堰顶、水跃滚浪、巴歇尔槽喉道中的压强**不**服从静压分布；宽顶堰实测流量系数$1.62$到$2.05\ \mathrm{m^{1 / 2} / s}$对静压分析给出的$1.705$，就是这一事实的经验代价。**把高烟囱上方大气的密度当作常数。**它不是：空气密度在$5.5\ \mathrm{km}$内减半，而$200\ \mathrm{m}$烟囱的抽力——烟囱不靠风机就能抽气的全部原因——是
$$
\Delta p = \left( \rho_{\mathrm{out}} - \rho_{\mathrm{in}} \right) g H
$$
用**两个不同**的密度计算。只用冷密度算抽力会高估$20\ \%$，锅炉只好关着风门运行。
:::

## 压强场

::: definition 流体静力学方程 {#def-hydro}
$$
\nabla p = \rho \mathbf{g}, \qquad
\frac{\partial p}{\partial x} = \rho g_x, \quad
\frac{\partial p}{\partial y} = \rho g_y, \quad
\frac{\partial p}{\partial z} = - \rho g
$$
**对密度不变的液体**，取$z$自$p = p_0$的自由液面竖直向上：
$$
\boxed{ p = p_0 + \rho g d } \qquad \left[ d = \text{自由液面以下的深度} \right]
$$
**水值得记住的三个数。**
$$
\begin{array}{l c c}
\text{深度} & p_{\mathrm{gauge}} & \text{规律} \\
10\ \mathrm{m} & 98.1\ \mathrm{kPa} & \approx 1\ \text{个大气压} \\
100\ \mathrm{m} & 981\ \mathrm{kPa} \approx 9.7\ \mathrm{atm} & \text{潜水员的空气消耗量是水面时的 } 1 / 11 \\
1{,}000\ \mathrm{m} & 9.81\ \mathrm{MPa} & \text{马里亚纳海沟 } 10{,}994\ \mathrm{m} \text{ 处为 } 108\ \mathrm{MPa} = 1{,}080\ \mathrm{atm}
\end{array}
$$
**静水佯谬。**容器底面上的力是$\rho g d A$，**与容器形状无关**，所以向上敞口的容器底面受力**小于**其自重，向内收窄的则**大于**。化解办法是：倾斜壁面以自身压力的竖直分量承担了这个差额——帕斯卡在**1646**年正是用这个论证，给密封木桶插上一根十米高的竖直管、倒进一壶水，就把桶撑爆了。
**可压缩情形。**取$p = \rho R T$、$T \left( z \right) = T_0 - L z$：
$$
p = p_0 \left( 1 - \frac{L z}{T_0} \right)^{g / \left( R L \right)}, \qquad
\rho = \rho_0 \left( 1 - \frac{L z}{T_0} \right)^{g / \left( R L \right) - 1}
$$
标准大气的$L = 0.0065\ \mathrm{K / m}$、$T_0 = 288.15\ \mathrm{K}$，指数$g / \left( R L \right) = 5.2559$。
**与飞行员、厨师和登山者有关的估算。**
$$
\begin{array}{l c c c}
\text{海拔} & p\ (\mathrm{kPa}) & p / p_0 & \text{后果} \\
0 & 101.33 & 1.000 & \text{水在 } 100.0\ {}^{\circ}\mathrm{C} \text{ 沸腾} \\
365\ \mathrm{m}\ \left( \text{伦敦} \right) & 97.0 & 0.957 & \text{沸点 } 98.9\ {}^{\circ}\mathrm{C} \\
1{,}500\ \mathrm{m} & 84.6 & 0.835 & \text{沸点 } 95.0\ {}^{\circ}\mathrm{C} \\
3{,}650\ \mathrm{m}\ \left( \text{拉萨} \right) & 63.5 & 0.626 & \text{沸点 } 87.4\ {}^{\circ}\mathrm{C}\text{，必须用高压锅} \\
5{,}500\ \mathrm{m} & 50.7 & 0.500 & \text{每口呼吸只有海平面一半的氧气} \\
8{,}850\ \mathrm{m}\ \left( \text{珠穆朗玛峰} \right) & 31.4 & 0.310 & \text{无补充氧气的生理极限} \\
10{,}994\ \mathrm{m}\ \left( \text{马里亚纳海沟} \right) & 1{,}086\ \mathrm{bar} & 1{,}072 & \text{问题在水，不在空气}
\end{array}
$$
**决定蛋糕配方和飞机实用升限的那个数。**在$3{,}650\ \mathrm{m}$烤蛋糕需要**多放$25\ \%$的发泡粉、少放$10\ \%$的糖**，因为膨泡在淀粉凝固定型前会膨胀到海平面体积的$1 / 0.626 = 1.6$倍。**海拔问题本质上是压强问题，只是戴了顶气象学的帽子。**
:::

::: definition 测压管 {#def-manometer}
**规则。**从管的一端出发，每下降一段加$\rho g h$，每上升一段减$\rho g h$，到另一端为止。
$$
p_A = p_B + \sum_{\mathrm{down}} \rho_i g h_i - \sum_{\mathrm{up}} \rho_i g h_i
$$
**测压管**直接测表压，只适用于液体：
$$
p = \rho g h
$$
**U 形管**用比重$S_m$的指示液测比重$S$的液体：
$$
p_A = \left( S_m - S \right) \rho_w g h
$$
**估算。**水（$S = 1$）上水银（$S_m = 13.55$）$0.8\ \mathrm{m}$的读数差：
$$
p_A = 12.55 \times 9{,}807 \times 0.8 = 98.5\ \mathrm{kPa}
$$
**倒置 U 形管**测液体中的小压差，顶部充$S = 0.8$的油：
$$
\Delta p = \left( 1 - 0.8 \right) \rho_w g h = 1{,}961\ h \ \mathrm{Pa}\ \text{（每米）}
$$
**灵敏度提高五倍**，这就是文丘里流量计上用倒置测压管而不用普通测压管的全部原因。
**倾斜测压管**，沿与水平成$\theta$角的管读长度$L$：
$$
\Delta p = \rho g L \sin \theta, \qquad \text{灵敏度} = \frac{1}{\sin \theta}
$$
$\theta = 5^{\circ}$时放大**$11.5$倍**，这就是燃气管道投产用的压力表用斜管而不用更长的竖直管的原因。
**从不修正的那个误差。**测压管的刻度在**弯月面**处读取：水银的弯月面是**凸**的，读顶部；水的是**凹**的，读底部。两种读法在$10\ \mathrm{mm}$内径管上相差$0.4\ \mathrm{mm}$，在$2\ \mathrm{mm}$内径管上相差**$2.8\ \mathrm{mm}$**——对$1\ \mathrm{m}$水头分别相当于$0.3\ \%$和$2\ \%$的误差。**毛细修正是实验室测压管不确定度预算中的真实一项，而在现场读数里被统统省略。**
:::

## 表面上的力

::: definition 平面与压心 {#def-plane}
$$
F = \int_A p\, dA = p_c A = \rho g\, d_c A, \qquad
y_p = y_c + \frac{I_c}{y_c A}, \qquad
x_p = x_c + \frac{I_{xy,c}}{y_c A}
$$
其中$y$自自由液面**沿板面向下**度量，$I_c$是对平行于液面的形心轴的惯性矩，$y_p - y_c$是合力的偏心距。
**用得上的惯性矩。**
$$
\begin{array}{l c c}
\text{矩形，宽 } b \text{，高 } h & I_c = b h^{3} / 12 & y_p - y_c = h^{2} / \left( 12 d_c \right) \\[4pt]
\text{圆，直径 } D & I_c = \pi D^{4} / 64 & y_p - y_c = D^{2} / \left( 16 d_c \right) \\[4pt]
\text{三角形，底 } b \text{，高 } h & I_c = b h^{3} / 36 & y_p - y_c = h^{2} / \left( 18 d_c \right)
\end{array}
$$
**求解实例：竖直圆形闸门。**直径$2.0\ \mathrm{m}$的闸门，顶缘在液面下$1.0\ \mathrm{m}$，故$d_c = 2.0\ \mathrm{m}$：
$$
A = \frac{\pi \times 2.0^{2}}{4} = 3.1416\ \mathrm{m^{2}}, \qquad
F = 9{,}810 \times 2.0 \times 3.1416 = 61.6\ \mathrm{kN}
$$
$$
I_c = \frac{\pi \times 2.0^{4}}{64} = 0.7854\ \mathrm{m^{4}}, \qquad
y_p - y_c = \frac{0.7854}{2.0 \times 3.1416} = 0.125\ \mathrm{m}
$$
**压心在闸门中心以下$125\ \mathrm{mm}$**，从顶部门架起吊的启闭机必须先提供$61.6 \times 0.125 = 7.7\ \mathrm{kN \cdot m}$的力矩克服水，然后闸门才动得了。**这个力矩就是大型闸门设两个吊点而不是一个的原因。**
**求解实例：矩形闸门。**宽$3\ \mathrm{m}$、高$2\ \mathrm{m}$的竖直闸门，**顶边与液面齐平**：
$$
d_c = 1.0\ \mathrm{m}, \qquad F = 9{,}810 \times 1.0 \times 6.0 = 58.9\ \mathrm{kN}
$$
$$
y_p - y_c = \frac{h^{2}}{12 d_c} = \frac{4}{12} = 0.333\ \mathrm{m}
\quad \Rightarrow \quad y_p = 1.333\ \mathrm{m}\ \text{（液面以下）}
$$
**合力作用在深度的三分之二处**，这就是顶边与液面齐平的矩形普遍遵循的规则，也是压强图为三角形的原因。
**压强棱柱，不用微积分就能解题。**竖直平面上的力等于其上方压强楔的体积，其作用线过楔的形心。对水深恰好到顶的高$H$矩形墙：
$$
F = \frac{1}{2} \rho g H^{2} b \quad \text{作用于} \quad \frac{2 H}{3} \ \text{（液面以下）}
$$
**重力坝法则。**高$H$大坝单位长度上的水平水压力是$\tfrac{1}{2} \rho g H^{2}$，比重$2.4$的混凝土三角形断面重力坝需要的底宽为
$$
b = \frac{H}{\sqrt{S_c}} = \frac{H}{\sqrt{2.4}} = 0.65\ H
\quad \text{（基本三角形剖面，不计扬压力）}
$$
计入底面**扬压力**、下游水深和施工公差后为$0.75$到$0.85\ H$。对$100\ \mathrm{m}$高的坝就是**$75$到$85\ \mathrm{m}$的底宽**，而比值$b / H$是**常数**这一事实，正是**拱坝和支墩坝存在的原因**——重力坝的混凝土方量按$H^{2}$缩放，水压力也按$H^{2}$缩放，所以设计与尺度无关，节省混凝土的唯一办法是改变结构体系。
:::

::: definition 曲面 {#def-curved}
**方法。**曲面上的力由分量求出，而每个分量都是**平面**上的力：
$$
F_H = \rho g\, d_c A_{\mathrm{vert}}, \qquad
F_V = \rho g \times \left( \text{曲面上方流体的体积，真实的或假想的} \right)
$$
**竖直分量的方向。**流体在其上方的曲面（溢流堰底面、船闸闸门底槛），$F_V$**向上**；流体在其下方的曲面（隧道顶、船坞底板之下），$F_V$**向下**。
**求解实例：$90^{\circ}$曲面。**半径$R = 1.5\ \mathrm{m}$、长$4\ \mathrm{m}$的四分之一圆柱挡水至顶：
$$
F_H = \rho g \frac{R}{2} \times \left( R L \right) = 9{,}810 \times 0.75 \times 6.0 = 44.1\ \mathrm{kN}
$$
$$
F_V = \rho g \times \frac{\pi R^{2}}{4} L = 9{,}810 \times 1.767 \times 4 = 69.5\ \mathrm{kN}
$$
$$
F = \sqrt{44.1^{2} + 69.5^{2}} = 82.3\ \mathrm{kN}, \qquad
\theta = \tan^{- 1} \frac{69.5}{44.1} = 57.6^{\circ}\ \text{（与水平面的夹角）}
$$
**使弧形（径向）闸门比平板闸门便宜的那个数。**因为曲面上的静水压力处处**通过耳轴销**——每个压强都垂直于以销为轴的圆柱面——水对铰链**不产生力矩**，启闭机只需提起闸门自重加一小项摩擦。**弧形闸门的启闭力由闸门质量决定而不是由水头决定**，这就是所有大型溢流堰都用它、而等宽平板闸门需要$200\ \mathrm{kN}$启闭机的原因。
**浸没物体的浮力**是曲面向自身闭合的特例：
$$
F_B = \rho g \nabla \quad \text{竖直向上，作用线过被排开体积的形心}
$$
:::

## 浮力与稳性

::: definition 阿基米德与稳心 {#def-buoyancy}
$$
\boxed{ F_B = \rho g \nabla } \qquad \text{作用于浮心 } B
$$
**浮体的三种平衡。**
$$
\begin{array}{l l l}
G \text{ 在 } B \text{ 之下} & \text{永远稳定} & \text{一个摆} \\
G \text{ 在 } B \text{ 之上}, GM > 0 & \text{小倾角下稳定} & \text{人类造过的每一条船} \\
G \text{ 在 } B \text{ 之上}, GM < 0 & \text{不稳定} & \text{一场正在酝酿的倾覆}
\end{array}
$$
**初稳性高。**小横倾角$\theta$下浮心横向移动，浮力作用线与中站面交于**稳心**$M$，其高度为
$$
BM = \frac{I_{\mathrm{WP}}}{\nabla}, \qquad
KM = KB + BM, \qquad
\boxed{ GM = KB + BM - KG }
$$
其中$I_{\mathrm{WP}}$是**水线面面积**对转轴的惯性矩，$\nabla$是排水体积。
**复原力矩。**
$$
M_r = W\, GM \sin \theta \approx W\, GM\, \theta
$$
**求解实例：矩形驳船。**长$20\ \mathrm{m}$、宽$10\ \mathrm{m}$，空载与装载吃水$2.0\ \mathrm{m}$，$KG = 1.5\ \mathrm{m}$：
$$
\nabla = 20 \times 10 \times 2.0 = 400\ \mathrm{m^{3}}, \qquad W = 1{,}025 \times 9.807 \times 400 = 4{,}022\ \mathrm{kN} = 410\ \mathrm{t}
$$
$$
I_{\mathrm{WP}} = \frac{L B^{3}}{12} = \frac{20 \times 1{,}000}{12} = 1{,}667\ \mathrm{m^{4}}, \qquad
BM = \frac{1{,}667}{400} = 4.167\ \mathrm{m}
$$
$$
KB = 1.0\ \mathrm{m}, \qquad KM = 5.167\ \mathrm{m}, \qquad GM = 5.167 - 1.5 = 3.667\ \mathrm{m}
$$
**横摇周期。**取回转半径$k_{xx} = 0.40\, B = 4.0\ \mathrm{m}$、驳船的附加质量系数$C_{44} \approx 1.0$：
$$
T_{\phi} = \frac{2 \pi k_{xx}}{\sqrt{g\, GM}} = \frac{2 \pi \times 4.0}{\sqrt{9.807 \times 3.667}} = \frac{25.13}{6.00} = 4.19\ \mathrm{s}
$$
**决定船舒不舒服的那个数。****稳**船（$GM$大）横摇周期短且**猛**——$4\ \mathrm{s}$的驳船令人难受，货物会移位；**软**船（$GM$小）横摇缓慢，若其周期接近波浪遭遇周期就会**共振**。货船的设计目标是$T_{\phi} = 10$到$14\ \mathrm{s}$，而北大西洋典型波浪周期是$8$到$12\ \mathrm{s}$；目标定在波浪频带**之上**，是因为共振是失效模式，而慢摇只是难受。
**自由液面修正，稳性计算中最大的单项。**
$$
GM_{\mathrm{eff}} = GM - \frac{\rho_{\mathrm{tank}}}{\rho_{\mathrm{sea}}} \frac{i_{\mathrm{tank}}}{\nabla}
$$
**估算。**上述驳船中装淡水的未满舱，长$10\ \mathrm{m}$、宽$8\ \mathrm{m}$：
$$
i_{\mathrm{tank}} = \frac{10 \times 8^{3}}{12} = 426.7\ \mathrm{m^{4}}, \qquad
\delta GM = - \frac{1{,}000}{1{,}025} \times \frac{426.7}{400} = - 1.04\ \mathrm{m}
$$
**仅仅一个半满舱，初稳性高就减少$28\ \%$。**把同一个舱用**三道纵舱壁**分隔，$i$降为$3^{2} = 9$分之一即$47.4\ \mathrm{m^{4}}$，损失降为$0.116\ \mathrm{m}$——**这就是船设纵舱壁的全部原因**，也是罐车油罐设纵向挡板而**不**设横向挡板的原因。
**大倾角的舷壁公式。**对直舷船，有限横倾角下的复原力臂为
$$
GZ = \sin \theta \left[ GM + \frac{1}{2} BM\, \tan^{2} \theta \right]
$$
正浮时**不稳定**（$GM < 0$）的船的**倾侧角**为
$$
\theta_l = \tan^{- 1} \sqrt{\frac{- 2\, GM}{BM}}
$$
$GM = - 0.30\ \mathrm{m}$、$BM = 4.167\ \mathrm{m}$时$\theta_l = \tan^{- 1} \sqrt{0.144} = 22.3^{\circ}$——**船会横倾$22^{\circ}$待在那里不动**，船员报告“她向左舷倾斜但不再恶化”，这就是诊断书。
:::

::: widget plot
f: sin(x*pi/180)*(0.60+2.0835*pow(tan(x*pi/180),2)); sin(x*pi/180)*(-0.30+2.0835*pow(tan(x*pi/180),2)); sin(x*pi/180)*(0.30+2.0835*pow(tan(x*pi/180),2))
x: 0, 45
y: -0.3, 2.0
labels: GZ with GM = 0.60 m; GM = -0.30 m; GM = 0.30 m
caption: 直舷船（$BM = 4.167\ \mathrm{m}$）在三个初稳性高下的复原力臂$GZ$（米）随横倾角（度）的曲线，由$GZ = \sin \theta \left[ GM + \tfrac{1}{2} BM \tan^{2} \theta \right]$算出。中间那条是**不稳定**情形：它从原点**向下**出发，在$12^{\circ}$附近达到$- 0.21\ \mathrm{m}$的倾覆力矩极小，在倾侧角$20.8^{\circ}$处过零后再上升——船横倾到$21^{\circ}$就心满意足地待在那里。下面那条是**临界稳定**情形：初始斜率几乎为零，$1.7\ \mathrm{m}$的复原力臂要到$45^{\circ}$才出现：**一条船可以在形式上稳定而在实际上不适航**，因此国际载重线公约规定的是整条$GZ$曲线下的最小面积，而不只是$GM$为正。
:::

::: definition 液体的刚体运动 {#def-rigid}
**一般结论。**在随$\mathbf{a}$加速的参考系中，自由液面垂直于**有效重力**$\mathbf{g}_{\mathrm{eff}} = \mathbf{g} - \mathbf{a}$：
$$
\frac{\partial p}{\partial x} = - \rho a_x, \qquad
\frac{\partial p}{\partial z} = - \rho \left( g + a_z \right), \qquad
\frac{dz}{dx} \bigg|_{\mathrm{surface}} = - \frac{a_x}{g + a_z}
$$
**平移的罐。**以$a_x = 0.4\, g$加速的油罐车，自由液面为
$$
\tan \theta = 0.4 \quad \Rightarrow \quad \theta = 21.8^{\circ}
$$
**二十二度的倾斜**，对$2.4\ \mathrm{m}$宽的罐意味着液体在一端露出顶部、在另一端淹没透气口。**液体罐车的挡板是横向的**——它们打断的是晃动的**动量**，与船的纵向挡板不同，它们针对的是水平加速度而不是横摇。
**旋转的容器。**绕竖直轴以$\Omega$旋转的圆筒，自由液面为
$$
\boxed{ z = \frac{\Omega^{2} r^{2}}{2 g} } \qquad \text{（旋转抛物面）}
$$
压强场为
$$
p = p_0 + \rho \left( \frac{\Omega^{2} r^{2}}{2} - g z \right)
$$
**求解实例。**直径$0.6\ \mathrm{m}$、深$0.5\ \mathrm{m}$的敞口圆筒以$60\ \mathrm{rev / min}$旋转：
$$
\Omega = \frac{2 \pi \times 60}{60} = 6.283\ \mathrm{rad / s}, \qquad
z_{\max} = \frac{6.283^{2} \times 0.30^{2}}{2 \times 9.807} = \frac{39.48 \times 0.09}{19.61} = 0.181\ \mathrm{m}
$$
**抛物面的体积恰好是其外切圆柱的一半**，所以若圆筒原来半满，则$\Omega = 6.283\ \mathrm{rad / s}$时液面恰在轴心处触底，再快就**露出底面**——这就是离心铸造模和旋涂卡盘的设计极限。
**使离心机成为静力学问题的那个数。**$3{,}000\ \mathrm{rev / min}$、半径$0.15\ \mathrm{m}$时的加速度为
$$
\frac{\Omega^{2} r}{g} = \frac{9{,}870 \times 0.15}{9.807} = 151\ g
$$
水柱壁面处的压强为$\rho \Omega^{2} r^{2} / 2 = 1{,}000 \times 9{,}870 \times 0.0225 / 2 = 111\ \mathrm{kPa}$——**超过一个大气压**，这就是实验室离心机转子是压力容器、其盖子带联锁的原因。
:::

## 算例

::: example 闸门与其启闭机 {#ex-sluice}
宽$4\ \mathrm{m}$、高$2.5\ \mathrm{m}$的竖直平板闸门，上游挡水$2.5\ \mathrm{m}$，下游水深$1.0\ \mathrm{m}$。求净力及其位置；若闸门重$60\ \mathrm{kN}$、在滑道中运行、摩擦因数$0.35$，求启闭力。
::: solution
**两个面。**
$$
F_1 = \frac{1}{2} \rho g b H_1^{2} = 0.5 \times 9{,}810 \times 4 \times 2.5^{2} = 122.6\ \mathrm{kN}
\quad \text{作用于} \quad \frac{2 \times 2.5}{3} = 1.667\ \mathrm{m}\ \text{（上游液面以下）}
$$
$$
F_2 = 0.5 \times 9{,}810 \times 4 \times 1.0^{2} = 19.6\ \mathrm{kN}
\quad \text{作用于} \quad 0.667\ \mathrm{m}\ \text{（下游液面以下）}
$$
**净力。**
$$
F = 122.6 - 19.6 = 103.0\ \mathrm{kN}
$$
**位置，对下游水位取矩。**
$$
\bar{y} = \frac{122.6 \times \left( 1.0 + 1.667 \right) - 19.6 \times 0.667}{103.0}
= \frac{326.9 - 13.1}{103.0} = 3.05\ \mathrm{m}\ \text{（底槛以上）}
$$
**摩擦。**水的水平推力把闸门压向滑道，摩擦力为
$$
F_f = \mu W_{\mathrm{gate}} + \mu_{\mathrm{wedge}} F_{\mathrm{seal}}
$$
$60\ \mathrm{kN}$的闸门重给出$0.35 \times 60 = 21.0\ \mathrm{kN}$；闸门在导槽中自由运动时**水载不增加摩擦**——但底部被水压紧的**止水**贡献
$$
F_{\mathrm{seal}} = \mu_s \times p_{\mathrm{seal}} A_{\mathrm{seal}}
$$
宽$25\ \mathrm{mm}$、长$4\ \mathrm{m}$的止水，接触压强$0.4\ \mathrm{MPa}$，$\mu_s = 0.3$：
$$
F_{\mathrm{seal}} = 0.3 \times 0.4 \times 10^{6} \times 0.025 \times 4 = 12.0\ \mathrm{kN}
$$
**启闭力。**
$$
P = W + F_f + F_{\mathrm{seal}} + F_{\mathrm{stiction}}
= 60 + 21.0 + 12.0 + 8\ \text{（启动裕量）} = 101\ \mathrm{kN}
$$
**决定启闭机规格的那个数。**闸门自重加摩擦是水推力的**$1.7$倍**，而水推力本身对启闭机拉力**毫无贡献**——这就是平板闸门要按面板的**弯曲**和滑道的**承压**设计、启闭机却可以选标准目录产品的原因。
**唯一的例外。**若导槽**卡死**——闸门落座后楔形角拉毛——摩擦就变成$\mu F_{\mathrm{water}}$，
$$
F_f^{\mathrm{bound}} = 0.35 \times 103 = 36\ \mathrm{kN}
$$
**要加在$93\ \mathrm{kN}$上**，超载$39\ \%$。**每一场“启闭机停转”型的闸门事故都是一扇卡死的闸门**，标准对策是**顶丝**：启闭机受力之前先把座垫松开。
**合理性检验。**净力是$103\ \mathrm{kN}$而不是$122.6$，是因为下游水；下游水的作用远比其大小暗示的重要，是因为它作用在**底部**，对底槛的力臂最大。**按无下游水设计闸门，力方面富余$19\ \%$，铰链力矩方面却不足$30\ \%$**，而后一个错误才是砸东西的那个。
:::
:::

::: example 驳船的装载 {#ex-barge}
算例中$20\ \mathrm{m} \times 10\ \mathrm{m}$的驳船空船排水量$180\ \mathrm{t}$、$KG = 1.2\ \mathrm{m}$，装$200\ \mathrm{t}$甲板货，其重心在基线以上$3.4\ \mathrm{m}$；另在长$12\ \mathrm{m}$、宽$8\ \mathrm{m}$的双层底舱装$60\ \mathrm{t}$淡水，该舱**未**装满。求吃水、$GM$和横摇周期，并判断驳船能否出海。
::: solution
**排水量与吃水。**
$$
\Delta = 180 + 200 + 60 = 440\ \mathrm{t}, \qquad
\nabla = \frac{440 \times 10^{3}}{1{,}025} = 429.3\ \mathrm{m^{3}}
$$
$$
d = \frac{429.3}{20 \times 10} = 2.146\ \mathrm{m}
$$
**重心高度。**对基线取矩，双层底淡水在$z = 0.4\ \mathrm{m}$：
$$
KG = \frac{180 \times 1.2 + 200 \times 3.4 + 60 \times 0.4}{440}
= \frac{216 + 680 + 24}{440} = 2.091\ \mathrm{m}
$$
**横稳心。**
$$
KB = \frac{2.146}{2} = 1.073\ \mathrm{m}, \qquad
I_{\mathrm{WP}} = \frac{20 \times 10^{3}}{12} = 1{,}667\ \mathrm{m^{4}}, \qquad
BM = \frac{1{,}667}{429.3} = 3.883\ \mathrm{m}
$$
$$
KM = 4.956\ \mathrm{m}, \qquad GM_{\mathrm{fluid}} = 4.956 - 2.091 = 2.865\ \mathrm{m}
$$
**自由液面修正。**未满舱对自身中心线的惯性矩：
$$
i = \frac{12 \times 8^{3}}{12} = 512\ \mathrm{m^{4}}, \qquad
\delta GM = - \frac{1{,}000}{1{,}025} \times \frac{512}{429.3} = - 1.163\ \mathrm{m}
$$
**有效初稳性高。**
$$
GM_{\mathrm{eff}} = 2.865 - 1.163 = 1.702\ \mathrm{m}
$$
**解读。****一个未满舱吃掉了驳船稳性的$41\ \%$**，船员检查表上“所有双层底舱要么装满要么排空”就是这笔账。把舱注满可消除自由液面，使$GM$恢复到$2.865\ \mathrm{m}$，代价是多$60\ \mathrm{t}$排水量和$0.29\ \mathrm{m}$吃水。
**横摇周期。**
$$
T_{\phi} = \frac{2 \pi \times 0.40 \times 10}{\sqrt{9.807 \times 1.702}} = \frac{25.13}{4.087} = 6.15\ \mathrm{s}
$$
**与规范的对照。**作业驳船的入级规范要求$GM \ge 0.30\ \mathrm{m}$并满足复原力臂曲线下面积最小值；$1.70\ \mathrm{m}$轻松通过。但**甲板货**的$200\ \mathrm{t}$位于$3.4\ \mathrm{m}$高处，使$KG$升高了$1.0\ \mathrm{m}$；若在同一甲板**再**装$100\ \mathrm{t}$，则
$$
KG = \frac{920 + 100 \times 3.4}{540} = 2.333\ \mathrm{m}, \qquad
GM_{\mathrm{eff}} = \left( 4.90 - 2.333 \right) - 1.16 = 1.41\ \mathrm{m}
$$
仍为正——而驳船并**不**因此就没有装载上限，是因为以$GZ$曲线$30^{\circ}$以下面积衡量的**剩余**稳性，在甲板边缘入水时比$GM$降得更快。**甲板装载驳船的上限是干舷甲板入水，而不是初稳性高**，装载手册上的曲线是一条**甲板边缘**曲线。
**合理性检验。**$BM$如此之大——$3.9\ \mathrm{m}$对$2.1\ \mathrm{m}$的吃水——是因为$I_{\mathrm{WP}} \propto B^{3}$而$\nabla \propto B$，故$BM \propto B^{2} / d$。**宽度就是稳性**；驳船宽而游艇窄，是因为驳船拿速度换$B^{2}$，游艇拿$B^{2}$换速度。
:::
:::

::: example 烟囱的抽力 {#ex-chimney}
高$60\ \mathrm{m}$的砖烟囱向$10\ {}^{\circ}\mathrm{C}$、$101.325\ \mathrm{kPa}$的空气中排放$280\ {}^{\circ}\mathrm{C}$的烟气。求自然抽力（帕和毫米水柱）、直径$1.2\ \mathrm{m}$烟道中的气体流速，以及抽力损失。
::: solution
**密度。**把烟气当作$R = 287\ \mathrm{J / kg \cdot K}$的空气：
$$
\rho_{\mathrm{air}} = \frac{101{,}325}{287 \times 283.15} = 1.247\ \mathrm{kg / m^{3}}, \qquad
\rho_g = \frac{101{,}325}{287 \times 553.15} = 0.638\ \mathrm{kg / m^{3}}
$$
**抽力。**
$$
\Delta p = \left( \rho_{\mathrm{air}} - \rho_g \right) g H
= \left( 1.247 - 0.638 \right) \times 9.807 \times 60 = 358\ \mathrm{Pa}
$$
$$
\Delta p = \frac{358}{9.807} = 36.5\ \mathrm{mm\, H_2O}
$$
**决定锅炉是否需要引风机的那个数。**$36\ \mathrm{mm}$水是**$3.6\ \mathrm{mbar}$**，而燃煤锅炉的炉排、料层和各受热面通常需要**$15$到$30\ \mathrm{mbar}$**——所以$60\ \mathrm{m}$烟囱只提供链条炉所需风压的**五分之一**，每台现代锅炉都配有**送风机**。**电站的自然通风冷却塔之所以恰好$200\ \mathrm{m}$高，原因就在这里**：$\rho_{\mathrm{air}} - \rho_g = 0.15\ \mathrm{kg / m^{3}}$、$H = 200\ \mathrm{m}$时抽力为$294\ \mathrm{Pa}$，对塔内阻力极低的填料已经够用。
**使流量最大的烟气温度。**质量流量$M \propto \sqrt{\rho_g \Delta p} \propto \sqrt{\left( \rho_a - \rho_g \right) \rho_g}$，在$\rho_g = \rho_a / 2$处取驻点，即
$$
T_g = 2\, T_{\mathrm{air}} \quad \left[ \mathrm{K} \right]
$$
对$10\ {}^{\circ}\mathrm{C}$的空气是$566\ \mathrm{K} = 293\ {}^{\circ}\mathrm{C}$——**与锅炉实际运行的$250$到$350\ {}^{\circ}\mathrm{C}$惊人地接近**，所以烟囱的自然抽力与锅炉的排烟热损失恰好被一起优化了，这是巧合而不是设计。注意**抽力本身**随$T_g$单调上升；出现峰值的是**流量**。
**流速与损失。**气体流量$8\ \mathrm{kg / s}$：
$$
\dot{V} = \frac{8}{0.638} = 12.54\ \mathrm{m^{3} / s}, \qquad
V = \frac{12.54}{\pi \times 0.6^{2}} = 11.1\ \mathrm{m / s}
$$
$60\ \mathrm{m}$长、$f = 0.020$的摩擦损失：
$$
\Delta p_f = f \frac{L}{D} \frac{\rho_g V^{2}}{2}
= 0.020 \times \frac{60}{1.2} \times \frac{0.638 \times 123}{2} = 78.8\ \mathrm{Pa}
$$
出口（速度头）损失：
$$
\Delta p_{\mathrm{exit}} = \frac{\rho_g V^{2}}{2} = 39.2\ \mathrm{Pa}
$$
**平衡。**
$$
\Delta p_{\mathrm{available}} = 358\ \mathrm{Pa}, \qquad
\Delta p_{\mathrm{required}} = 78.8 + 39.2 + \Delta p_{\mathrm{bend},\mathrm{pickup}} \approx 160\ \mathrm{Pa}
$$
**对这一流量烟囱偏大**，多余的抽力从风门溢掉——锅炉效率就是这样悄悄流失的，因为**溢掉的是被加热到$280\ {}^{\circ}\mathrm{C}$又扔掉的空气**。过量空气多$10\ \%$就损失$5\ \%$的燃料，而事情就发生在抽力控制回路里。
**合理性检验。**抽力只有$358\ \mathrm{Pa}$，是因为密度差是$0.61\ \mathrm{kg / m^{3}}$，而空气密度是$1.25$——**热气体密度只有一半，而抽力是差值，不是热密度**。推论是烟囱**冷天更好用**，倍数约为$\left( 283 / 313 \right) / \left( 313 / 313 \right)$，即$- 10\ {}^{\circ}\mathrm{C}$比$+ 20\ {}^{\circ}\mathrm{C}$好约**$10\ \%$**；七月调好的锅炉一月会抽力不足——这是集中供热厂最常见的季节性燃烧故障。
:::
:::

::: example 测压管测量 {#ex-manometer}
水银（$S_m = 13.55$）差压 U 形管接在输送比重$0.86$油的水平管道两端；水银以上的引管内充满油。读数差$0.45\ \mathrm{m}$。求压强降与水头损失；再对顶部充$S = 0.82$油、读数差同为$0.45\ \mathrm{m}$的倒置 U 形管重复计算。
::: solution
**顺置（U 形）测压管。**从上游测压孔出发逐段推算：
$$
p_1 + 0.86 \rho_w g \left( h + 0.45 \right) - 13.55 \rho_w g \times 0.45 - 0.86 \rho_w g\, h = p_2
$$
其中$h$是油柱顶到较低弯月面的高度。**未知数$h$消掉了**，这就是 U 形管的全部妙处：
$$
p_1 - p_2 = \left( 13.55 - 0.86 \right) \rho_w g \times 0.45
= 12.69 \times 9{,}807 \times 0.45 = 56.1\ \mathrm{kPa}
$$
**水头损失。**因为管道水平，压强降**就是**水头损失，且以**流动**流体表示：
$$
h_f = \frac{p_1 - p_2}{\rho_{\mathrm{oil}} g} = \frac{56{,}100}{860 \times 9.807} = 6.65\ \mathrm{m}\ \text{油柱}
$$
**倒置测压管。**顶部充轻油：
$$
p_1 - p_2 = \left( 0.86 - 0.82 \right) \rho_w g \times 0.45
= 0.04 \times 9{,}807 \times 0.45 = 177\ \mathrm{Pa}
$$
**比较，本题的要点。**倒置测压管对同一读数差读出同一物理压差的**$1 / 317$**——所以它用于**液体**中的**小**压差，大压差才用顺置水银测压管。**品质因数是顺置表的$\left( S_m - S \right)$与倒置表的$\left( S - S_m \right)$**；指示液密度越接近流动流体密度的测压管，越是一台**放大器**。
**题目藏着的那个误差。**若引管**未**排净气体、其中一根残留$20\ \mathrm{mm}$气袋，则该侧油柱短$20\ \mathrm{mm}$，读数误差为
$$
\delta p = 0.86 \times 9{,}807 \times 0.020 = 169\ \mathrm{Pa}
$$
**是$56.1\ \mathrm{kPa}$读数的$0.3\ \%$，却是$177\ \mathrm{Pa}$读数的$96\ \%$。****对倒置安装而言，排气阀不是改进，而是安装本身。**
**合理性检验。**$h$项之所以消掉，是因为两个测压孔同高、引管内是同一种流体且到分界面的高度差相同；若测压孔**不同高**，$h$项就**不**消，测压管读出的是$\Delta p + \rho g \Delta z$，即**测压管水头**差而不是压强差。**接在竖直文丘里管两端的测压管读的是水头损失，仅此而已；接在等径竖直管两端读数为零，这是正确答案，看起来却像管子堵了。**
:::
:::

::: history
**叙拉古的阿基米德（Archimedes）**约在**公元前 250 年**在《论浮体》（*On Floating Bodies*）中给出了浮力定理——这是他传世著作中唯一一部关于物理问题的数学论著而非几何著作——而皇冠与浴缸的故事出自**公元前 20 年代**的维特鲁威（Vitruvius），晚了三个世纪，其细节多半是杜撰的，其方法则千真万确。**静水佯谬**与压强传递原理是**帕斯卡（Pascal）1646–1648 年**的成果，在多姆山的大教堂和那只木桶上公开演示过；**托里拆利（Torricelli）1644 年**的水银气压计与**格里克（von Guericke）1654 年**的马德堡半球，用十年时间推翻了亚里士多德“自然厌恶真空”的说法，确立了大气的重量。**稳心**随**皮埃尔·布盖（Pierre Bouguer）1746 年的《船舶论》（*Traité du navire*）**进入工程学——这位数学家曾在安第斯山花了九年测量地球的形状——是他第一次把船舶稳性问题写成$BM = I / V$的形式；**欧拉（Euler）**同期关于同一问题的论述更优雅却少有人用。**自由液面修正**直到**1880 年代**一连串谷物船倾覆之后才被理解；而**1876 年**的**普利莫线（Plimsoll line）**——萨缪尔·普利莫（Samuel Plimsoll）在《我们的铁甲之家》（*Our Ironclad Homes*）中反对把运煤船超载到甲板的运动成果——正是载重线成为**法律**文件而不仅是工程文件的原因。**标准大气**$6.5\ \mathrm{K / km}$的温度递减率，由**1919 年**国际航空公约在**1912 年**和**1916 年**泰瑟朗德博（Teisserenc de Bort）的气球探空之后确定；他发现平流层，靠的是注意到温度在十一公里高度**不再下降**。
:::

## 后续内容

静力学提供的压强场，在[[fluid-mechanics/control-volume-analysis]]中被微分成力，在[[fluid-mechanics/bernoulli]]中被转化为速度；稳心的论证在[[dynamics]]的船体运动方程中作为复原项重现，在[[flight-mechanics]]的静稳定裕度讨论中重现；气压公式是[[fluid-mechanics/compressible-flow]]的边界条件，也是[[propulsion]]进气道总压恢复的边界条件；而测压管是[[manufacturing]]与[[energy-systems]]中一切差压式流量计的祖先。

::: summary
- 静止流体只承受法向应力，故$\nabla p = \rho \mathbf{g}$，液体中$p = p_0 + \rho g d$。
- 平面上的力是$p_c A$，但作用于$y_c + I_c / (y_c A)$，这个偏心距就是决定启闭机的铰链力矩。
- 曲面用分量处理：水平力是竖直投影面上的平面力，竖直力是其上方流体的重量。
- 弧形闸门的静水压力通过其耳轴，这就是大型溢流堰用它的原因。
- $GM = KB + BM - KG$，其中$BM = I_{\mathrm{WP}} / \nabla$，且$BM \propto B^2 / d$：宽度就是稳性。
- 未满舱从$GM$中减去$\rho_t i / (\rho \nabla)$，甚至可能减去全部有余；船设纵舱壁、罐车设横向挡板，单为此故。
- $GM < 0$的船不会沉——它找到一个倾侧角待在那里，这就是不懂稳性的船员报告稳性事故的方式。
- 在加速或旋转参考系中，自由液面垂直于有效重力，得到坡度$a_x / (g + a_z)$和抛物面$z = \Omega^2 r^2 / 2g$。
:::

::: quiz
某驳船$GM = + 2.4\ \mathrm{m}$，适航。随后一名船员测量一个双层底舱，发现半舱淡水，报告说驳船“有点倾斜但很稳”。稳性管理员应当怎么做？
- [ ] 什么都不做：正的$GM$就是正的$GM$
- [x] 计算自由液面修正，因为有效$GM$是表列值减去$\rho_t i / (\rho \nabla)$
- [ ] 把舱泵空，因为重量越少稳性总是越大
- [ ] 在另一舷加压载把倾斜调平
::: solution
表列$GM$是假定每个舱柜要么满要么空的**固体**（或液体）值。未满液面把自身的水线面惯性加进整个浮系统的横向惯性，而修正$\delta GM = - \left( \rho_t / \rho \right) i / \nabla$**与舱内液体多少无关**——舱只装一点点时最危险，只有舱完全装满或完全排空时才消失。把舱泵空能消除修正，是正确答案，但**不是**因为重量少了有帮助：半舱水比泵干**并**在同一高度灌回海水的舱更危险。在低舷侧加压载调平倾斜只会更糟，因为它进一步抬高$G$。
:::
:::

## 习题

::: exercise 压强 {level=1 check="98.1"}
给出$20\ {}^{\circ}\mathrm{C}$淡水中$10\ \mathrm{m}$深处的表压（千帕）。
::: solution
取$\rho = 1{,}000$，$p = 998 \times 9.807 \times 10 = 97{,}870\ \mathrm{Pa} \approx 98.1\ \mathrm{kPa}$。
:::
:::

::: exercise 测压管 {level=1 check="98.5"}
给出水银（$S_m = 13.55$）U 形管对水读数差$0.8\ \mathrm{m}$时测得的压强（千帕）。
::: solution
$p = (13.55 - 1) \times 9{,}807 \times 0.8 = 98.5\ \mathrm{kPa}$。
:::
:::

::: exercise 压心 {level=1 check="0.333"}
给出高$2\ \mathrm{m}$、顶部与水面齐平的竖直矩形墙上，合力作用点在液面以下的深度（米）。
::: solution
$y_p = 2H / 3 = 4 / 3 = 1.333\ \mathrm{m}$，即在$1.0\ \mathrm{m}$处形心以下$0.333\ \mathrm{m}$。
:::
:::

::: exercise 稳心 {level=1 check="4.17"}
给出长$20\ \mathrm{m}$、宽$10\ \mathrm{m}$、吃水$2.0\ \mathrm{m}$驳船的$BM$（米）。
::: solution
$BM = I / \nabla = (20 \times 1000 / 12) / 400 = 1{,}667 / 400 = 4.17\ \mathrm{m}$。
:::
:::

::: exercise 自由液面 {level=1 check="1.16"}
给出排水体积$429.3\ \mathrm{m^{3}}$的海水驳船中，长$12\ \mathrm{m}$、宽$8\ \mathrm{m}$的未满淡水舱造成的$GM$减少量（米）。
::: solution
$\delta GM = (1000 / 1025) \times (12 \times 512 / 12) / 429.3 = 0.976 \times 512 / 429.3 = 1.16\ \mathrm{m}$。
:::
:::

::: exercise 旋转液体 {level=1 check="0.181"}
给出直径$0.6\ \mathrm{m}$的敞口水筒以$60\ \mathrm{rev / min}$旋转时轴心处的液面降（米）。
::: solution
$z = \Omega^2 r^2 / (2g) = 6.283^2 \times 0.30^2 / 19.61 = 0.181\ \mathrm{m}$。
:::
:::

::: exercise 大气 {level=1 check="0.626"}
给出标准大气在$3{,}650\ \mathrm{m}$处的比值$p / p_0$。
::: solution
$p / p_0 = (1 - 0.0065 \times 3650 / 288.15)^{5.2559} = (1 - 0.08241)^{5.2559} = 0.9176^{5.2559} = 0.626$。
:::
:::

::: exercise 闸门 {level=2}
直径$1.5\ \mathrm{m}$的竖直圆形闸门，中心在水面以下$2.5\ \mathrm{m}$。给出其上的力（千牛）和压心在水面以下的深度。
::: solution
$$
A = \frac{\pi \times 1.5^{2}}{4} = 1.767\ \mathrm{m^{2}}, \qquad
F = 9{,}810 \times 2.5 \times 1.767 = 43.4\ \mathrm{kN}
$$
$$
I_c = \frac{\pi \times 1.5^{4}}{64} = 0.2485\ \mathrm{m^{4}}, \qquad
y_p - y_c = \frac{0.2485}{2.5 \times 1.767} = 0.0562\ \mathrm{m}
$$
**压心在$2.556\ \mathrm{m}$处**——中心以下$56\ \mathrm{mm}$。
**合理性检验。**偏心距按$D^{2} / \left( 16 d_c \right)$缩放，所以闸门沉得越深它越**小**，闸门越大它越**大**。浅埋的闸门才难办；浅而宽的孔口偏爱**弧形**闸门，是因为无论埋深如何，其静水压力都通过耳轴。
:::
:::

::: exercise 倾侧角 {level=2}
某船$GM = - 0.25\ \mathrm{m}$，$BM = 5.0\ \mathrm{m}$。给出其倾侧角（度）。
::: solution
$$
\theta_l = \tan^{- 1} \sqrt{\frac{- 2 GM}{BM}} = \tan^{- 1} \sqrt{\frac{0.50}{5.0}}
= \tan^{- 1} 0.3162 = 17.5^{\circ}
$$
**船将横倾$17.5^{\circ}$并待在那里。**对策是降低$G$——排出高舱压载、抛弃上甲板重量——而绝不要往低侧舱灌水，那会进一步抬高$G$、加深倾斜。
:::
:::

::: exercise 推导 {level=3}
由小横倾角下浮心的移动推导$BM = I_{\mathrm{WP}} / \nabla$，并把推导延伸得到舷壁公式$GZ = \sin \theta \left( GM + \tfrac{1}{2} BM \tan^{2} \theta \right)$。
::: solution
**楔形论证。**把浮体横倾一个小角$\theta$。浸没体积不变，但一侧浮出一个楔形体积，另一侧浸入一个相同的楔形，各自的形心都从中站面横向移动了量级为$y$的距离。于是浮心移动
$$
BB' = \frac{1}{\nabla} \int_{\mathrm{WP}} \theta y \cdot y\, dA = \frac{\theta}{\nabla} \int_{\mathrm{WP}} y^{2} dA = \frac{\theta I_{\mathrm{WP}}}{\nabla}
$$
**一阶而言移动是水平的**，因为竖直分量是$\theta^{2}$量级。新的浮力作用线垂直于倾斜后的水线并通过$B'$，它与原中站面交于$M$，此处
$$
BB' = BM \sin \theta \approx BM\, \theta
\quad \Rightarrow \quad
\boxed{ BM = \frac{I_{\mathrm{WP}}}{\nabla} }
$$
**小倾角的复原力臂**随之立得：过$M$的浮力与过$G$的重力之间的水平距离为
$$
GZ = GM \sin \theta
$$
**舷壁公式，有限倾角。**对直舷船，浸入楔与浮出楔是三棱柱，其形心横向位于$\pm y_e^{2} / \left( 3 \tan \theta \right)$，竖直偏移必须保留。把二阶项算到底，浮心移到
$$
BB' = BM \tan \theta \left( 1 + \tfrac{1}{2} \tan^{2} \theta \right)
$$
这就是小角位移$BM \sin \theta$经过修正的结果——有限横倾角下浸入楔与浮出楔是**三角形**的，其形心随$\tan^{2} \theta$向外移动。沿垂直于$BG$的方向分解，并用$BM \tan \theta \cos \theta = BM \sin \theta$：
$$
GZ = BM \sin \theta \sec \theta \left( 1 + \tfrac{1}{2} \tan^{2} \theta \right) \cos \theta - BG \sin \theta
= \sin \theta \left[ BM + \tfrac{1}{2} BM \tan^{2} \theta - BG \right]
$$
$$
\boxed{ GZ = \sin \theta \left[ GM + \tfrac{1}{2} BM \tan^{2} \theta \right] }
$$
**解读。**$GM$项是**重量**复原项，$\tfrac{1}{2} BM \tan^{2} \theta$项是**形状**复原项——船舶横倾时稳心不断爬升，因为水线面惯性矩按$\sec^{3} \theta$增长。**形状项就是$GM$很小甚至为负的船在$30^{\circ}$仍可有较大复原力臂的原因**，也是软船未必不安全的理由。
**倾侧角。**令$GZ = 0$，$GM < 0$且$\theta \ne 0$：
$$
GM + \tfrac{1}{2} BM \tan^{2} \theta = 0
\quad \Rightarrow \quad
\theta_l = \tan^{- 1} \sqrt{\frac{- 2 GM}{BM}}
$$
**适用范围。**舷壁公式假定船侧在水线与甲板边缘之间是竖直的，所以甲板边缘一入水（丰满型驳船通常$10$到$15^{\circ}$）它就失效，舭部一出水就彻底失效。**再往上复原力臂必须由楔形的实际偏移算出，这正是静水力软件做的事，也是稳性手册要计算而不能从$GM$查表的原因。**
**合理性检验。**箱形船$BM \propto B^{2} / d$，是因为$I_{\mathrm{WP}} \propto L B^{3}$、$\nabla \propto L B d$；而**双体船**初稳性巨大，是因为其水线面惯性矩是两个船体自身惯性**加上**平行移轴项$2 A \left( s / 2 \right)^{2}$——对中心线间距$6\ \mathrm{m}$、船宽$2\ \mathrm{m}$的情形，后者是船体自身惯性的**九倍**。**双体船稳是因为$s^{2}$项而不是因为船体**；推论是，单体的$GM$一旦被自由液面吃光，任何船型都救不回来。
:::
:::

::: exercise 设计 {level=3}
为一艘须在北海承运$1{,}200\ \mathrm{t}$甲板货的$60\ \mathrm{m}$作业驳船，规定其稳性、压载、舱容与装载文件的依据，并说明验证试验。
::: solution
**主尺度，由稳性而不是强度决定。**
$$
\begin{array}{l c l}
L & 60\ \mathrm{m} & \text{由货物所需甲板面积确定} \\
B & 20\ \mathrm{m} & \text{由 } GM \text{ 和甲板边缘入水确定} \\
D & 4.5\ \mathrm{m} & \text{载重线确定后的干舷} \\
\text{型吃水} & 3.2\ \mathrm{m} & \text{热带载重线处} \\
\text{空船排水量} & 1{,}050\ \mathrm{t} & 7.85 \text{ 的钢材加 } 15\ \% \text{ 舾装} \\
\text{载重量} & 1{,}200\ \mathrm{t} & \text{货物，另加 } 60\ \mathrm{t} \text{ 消耗品}
\end{array}
$$
**夏季载重线处的稳性工况。**
$$
\nabla = 60 \times 20 \times 3.2 = 3{,}840\ \mathrm{m^{3}}, \qquad \Delta = 3{,}936\ \mathrm{t}
$$
$$
KB = 1.60\ \mathrm{m}, \qquad
I_{\mathrm{WP}} = \frac{60 \times 20^{3}}{12} = 40{,}000\ \mathrm{m^{4}}, \qquad
BM = \frac{40{,}000}{3{,}840} = 10.42\ \mathrm{m}
$$
$$
KM = 12.02\ \mathrm{m}, \qquad KG_{\mathrm{solid}} = 5.90\ \mathrm{m}, \qquad GM = 6.12\ \mathrm{m}
$$
**自由液面许可值，设计约束所在。**驳船载淡水$220\ \mathrm{t}$、燃油$80\ \mathrm{t}$、污油$60\ \mathrm{t}$，分装于**九个**舱；最危险的单个未满舱是$14 \times 9\ \mathrm{m}$的淡水舱：
$$
i = \frac{14 \times 729}{12} = 850.5\ \mathrm{m^{4}}, \qquad
\delta GM = \frac{1{,}000}{1{,}025} \times \frac{850.5}{3{,}840} = 0.216\ \mathrm{m}
$$
**设计采用的规则。**每个可能未满的舱计**$0.10\ \mathrm{m}$**的自由液面许可值，按**最大**舱计算、全部舱适用，总许可值$0.9\ \mathrm{m}$，并迫使管路布置做到**除一个舱外所有舱**在每种工况下要么满要么空。**舱室布置图是稳性文件而不是管系文件。**
**完整稳性衡准**（IMO《国际完整稳性规则》，按入级规范适用于作业船）：
$$
\begin{array}{l c}
GM_0 \ge 0.35\ \mathrm{m} & 6.12 - 0.90 = 5.22\ \mathrm{m} \quad \checkmark \\
GZ \ge 0.20\ \mathrm{m}\ \text{在 } \theta \ge 30^{\circ} & 3.1\ \mathrm{m} \quad \checkmark \\
GZ_{\max}\ \text{在 } \theta \ge 25^{\circ} & 30^{\circ} \quad \checkmark \\
0 \text{ 到 } 30^{\circ} \text{ 面积 } \ge 0.055\ \mathrm{m \cdot rad} & 0.92 \quad \checkmark \\
0 \text{ 到 } 40^{\circ} \text{ 面积 } \ge 0.090\ \mathrm{m \cdot rad} & 1.55 \quad \checkmark \\
30 \text{ 到 } 40^{\circ} \text{ 面积 } \ge 0.030\ \mathrm{m \cdot rad} & 0.63 \quad \checkmark
\end{array}
$$
**起控制作用的破舱工况。**一舷舱室按$12\ \mathrm{m}$进水深破舱后成为不对称状态，横倾$14^{\circ}$，到$25^{\circ}$尚有$0.42\ \mathrm{m}$的剩余复原力臂——**通过，但只是因为甲板边缘还在水线以上$1.3\ \mathrm{m}$**，这就是干舷取$4.5\ \mathrm{m}$而不是$3.5\ \mathrm{m}$的原因。
**横摇周期与波浪的匹配。**
$$
T_{\phi} = \frac{2 \pi \times 0.40 \times 20}{\sqrt{9.807 \times 5.22}} = \frac{50.3}{7.16} = 7.02\ \mathrm{s}
$$
**对北大西洋能量周期$8$到$11\ \mathrm{s}$**——近到足以让驳船在顺浪中横摇，这就是$1{,}200\ \mathrm{t}$甲板货需要**按$0.45\ g$横向加速度设计系固**、而不是沿海规范允许的$0.2\ g$的原因。
**验证试验。**
$$
\begin{array}{l l l}
\text{倾斜试验} & \text{空船状态，用 } 10 \text{ 到 } 15\ \% \text{ 排水量的已知移动重量} & \text{把 } KG_{\mathrm{light}} \text{ 定到 } \pm 25\ \mathrm{mm} \\
\text{水的密度} & \text{船坞中四点取样} & 5\ \mathrm{kg / m^{3}} \text{ 就是 } 5\ \mathrm{t} \text{ 排水量} \\
\text{横倾试验} & \text{四种装载工况各测一次} & \text{校核的是装载手册而不是设计} \\
\text{舱容计量表} & \text{用计量注水标定} & \text{装载计算机的输入} \\
\text{空气管与测深管检查} & \text{每个舱，满舱时} & \text{堵塞的空气管让测深变成虚构}
\end{array}
$$
**保护买方的四条条款。**“装载手册的计算须计入所表明的自由液面许可值，并对工况表中未禁止的任意舱柜组合有效。”“倾斜试验须由验船师见证，所得$KG_{\mathrm{LIGHT}}$须与设计值比较，差值超过$150\ \mathrm{mm}$须重新倾斜。”“甲板货系固须按作业海域表明的横向加速度设计，而不是按沿海限制。”“稳性手册须包含倾侧角工况，以及对每个可能未满的舱柜的临界横倾处置程序。”
**设计评注。**一般规律是：**驳船的主尺度由$B^{2} / d$和干舷决定，钢料重量两者都不听**——而最贵的一份稳性文件，是规定哪些舱可以未满的那一份，因为它同时约束管系、机舱布置和压载程序。
:::
:::
