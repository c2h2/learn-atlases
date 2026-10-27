把风机拿走，流体照样会流动，因为被加热的流体比前来取代它的流体更轻。**自然对流与强制对流是同一种边界层物理，只是压强梯度改由重力提供，而速度不再事先已知**——正是这一个变化，把一个只有一个调节旋钮（速度）的问题，变成了一个传热量、流量和温差三者共同被决定的问题。**速度不是输入，而是答案的一部分。**

其后果值得在写下任何方程之前先讲清楚。**对于层流热边界层，表面传热系数几乎与尺寸无关**——竖直平板上$h \propto L ^ { - 1 / 4 }$，而强制对流层流边界层为$L ^ { - 1 / 2 }$——**这就是为什么自然对流散热器几乎可以不付代价地放大，也是为什么实验室里的小模型对它所代表的全尺寸物体能说明的东西如此之少。** **表面传热系数随温差按$\Delta T ^ { 1 / 4 }$变化，因此热流密度按$\Delta T ^ { 5 / 4 }$变化：把允许的温升加倍，冷却量就会超过原来的两倍，而自然对流部件的“热阻”不是一个常数，而是一条曲线。** **而且这种流动很慢——每秒几厘米，而不是几米——因此很容易被一阵穿堂风、隔壁机箱的风机，或者机箱所在车辆的运动所破坏；这就是为什么每一次自然对流计算都必须伴随着这样一个问题：“真的没有风吗？”**

和外部流动的对流传热一样，这门学问也是围绕竖直平板组织起来的；但在这里，平板有一个朝向，而朝向绝非细节。**一个朝上的热表面的冷却效果是同一表面朝下时的两倍，因为在前一种情形下轻流体位于重流体之下，层是不稳定的；而在后一种情形下层是稳定的，只是静静地待在那里。** **一排肋片的通道有一个强制对流所没有的最优间距：把肋片靠得太近，边界层就会合并，通道变成一堵导热的墙，流动随之停止。** **而一个有限空间——双层中空玻璃的夹层、热水箱与其保温层之间的空气——所传递的热量可能比同一流体纯导热所暗示的还少，也可能比你猜想的更多，因为流动会自行组织成胞格，其尺寸由间隙决定。**

::: warning 五种自然对流错误，按代价大小排列
**在不是强制对流时假定为强制对流，或者反过来。** **判据是$\mathrm { G r } / \mathrm { R e } ^ { 2 }$，而不是你的直觉。**对一块比环境高$3 0 \ \mathrm { K }$的$1 0 0 \ \mathrm { m m }$平板，$\mathrm { G r } = 3 . 4 \times 1 0 ^ { 6 }$：在$1 \ \mathrm { m / s }$时该比值为$0 . 1 0$，强制对流计算的精度在百分之几以内；在$0 . 1 \ \mathrm { m / s }$时它为$1 0$，“强制对流”答案偏低将近一倍。**服务器机房按$2$到$5 \ \mathrm { m / s }$设计，里面的一切都是强制对流；而放在角落架子上的一个密封机箱则不是，决定属于哪一种的是邻近仪器的风机特性曲线。** **只因为强制对流关联式是自己熟悉的就拿来用，是这门学科中最常见的错误；对一台有$2 \ \mathrm { m / s }$气流吹过的机架使用自然对流关联式，是第二常见的错误。** **把朝向弄错。** **一个朝上的水平热表面与同一表面朝下相差一倍；一块偏离竖直方向$6 0 ^ { \circ }$的倾斜平板损失其冷却能力的六分之一；而装在热水箱底面的一块加热板几乎什么也做不了。** **不存在通用的“自然对流$h = 5 \ \mathrm { W / m ^ { 2 } K }$”——每种朝向都有一个关联式，而各朝向给出的答案相差可达三比一。** **忘记热辐射通常占热量的一半。** **一根处于$2 0 \ \ {} ^ { \circ } \mathrm { C }$房间中的$6 0 \ \ {} ^ { \circ } \mathrm { C }$管道，$h _ { c } = 6 . 1$而$h _ { r } = 6 . 3 \ \mathrm { W / m ^ { 2 } K }$：一半的热量通过一种任何自然对流关联式都不包含的机理离开。** **在室温和中等温差下，自然对流与热辐射的量级相同，漏掉其中之一的计算会系统性地高估它所需要的对流。** **用错长度或用错温差。** **$\mathrm { R a } _ { L }$中的长度，对竖直平板是高度，对圆柱是直径，对有限空间是间隙，对水平平板是面积与周长之比$A _ { s } / P _ { s }$——同一个物体上的四个不同的数。** **物性（包括体胀系数）按膜温度取值；理想气体的$\beta$是$1 / T _ { f }$（$T _ { f }$以开尔文计），用$1 / T$而$T$以摄氏度计，在室温下得到的$\beta$（以及瑞利数）会错五到十五倍。** **对关联式的信任超出了它们应得的程度。** **自然对流数据的分散度在最好的情况下为$\pm 1 5$到$\pm 2 0 \ \ \%$，在转捩附近则差得多，因为流动是非定常的、三维的，并且对房间环境很敏感。** **诚实的设计对策是：按表面传热系数范围的低端计算热量，把温升作为技术要求而不是计算结果，并对制成的机箱进行实测——这正是每一家无源电子设备制造商实际上所做的。**
:::

## 浮升力为什么会造出它自己的雷诺数

::: definition 作为体积力的浮升力，以及体胀系数 {#def-buoy}
重力场中的流体微团只有在比它所占据空间中的流体更轻时才受到净力。设$\rho _ { \infty }$为$T _ { \infty }$下未受扰动流体的密度，则温度为$T$的微团所受单位体积的向上力为
$$
f _ { b } = \left( \rho _ { \infty } - \rho \right) g \qquad \beta \equiv - { \frac { 1 } { \rho } } \left( { \frac { \partial \rho } { \partial T } } \right) _ { p } \approx { \frac { \rho _ { \infty } - \rho } { \rho \left( T - T _ { \infty } \right) } } \qquad \Longrightarrow \qquad f _ { b } \approx \rho \beta g \left( T - T _ { \infty } \right)
$$
**这就是布西内斯克（Boussinesq）近似，它的内容只有一句话：除了与$g$相乘的地方外，密度变化处处可以忽略。** **只要$\beta \Delta T \ll 1$，它就是极好的近似——对室温附近的气体，在$3 0 \ \mathrm { K }$时$\beta \Delta T \approx 0 . 1$，因此在几十开尔文以内精度为百分之几；对水，$\beta$小十倍，它在大得多的温差范围内都成立。** **有两种性质使得必须说明所指的是哪种流体：**
$$
\begin{array} { l c l l }
\text{流体} & \beta \ \left( \mathrm { K ^ { - 1 } } \right) & \text{温度} & \text{说明} \\
\text{理想气体} & 1 / T _ { f } = 3 . 3 \times 1 0 ^ { - 3 } & 2 0 \ \mathrm { ^ \circ C } & \text{唯一一种 } \beta \text{ 精确且无需查表的情形} \\
\text{水} & 2 . 0 7 \times 1 0 ^ { - 4 } & 2 0 \ \mathrm { ^ \circ C } & \text{在 } 7 5 \ \mathrm { ^ \circ C } \text{ 时升至 } 6 . 1 \times 1 0 ^ { - 4 } \text{，在 } 1 0 0 \ \mathrm { ^ \circ C } \text{ 时升至 } 7 . 5 \times 1 0 ^ { - 4 } \\
\text{水} & 0 & 4 \ \mathrm { ^ \circ C } & \text{密度极大值：没有浮升力，湖泊从上往下结冰} \\
\text{机油} & 7 . 0 \times 1 0 ^ { - 4 } & 2 5 \ \mathrm { ^ \circ C } & \beta \text{ 大而 } \mathrm { P r } \text{ 极大：驱动强，流动却不情愿} \\
\text{水银} & 1 . 8 \times 1 0 ^ { - 4 } & 2 5 \ \mathrm { ^ \circ C } & \text{驱动弱，但 } \alpha \text{ 极大：导热占优}
\end{array}
$$
**水的行为是让人惊讶的那一种，也是在自然界中起作用的那一种。** **在$0$到$4 \ \ {} ^ { \circ } \mathrm { C }$之间体胀系数改变符号，因此最冷的水最轻，对流停止，湖泊形成$4 \ \ {} ^ { \circ } \mathrm { C }$的湖底和一层冰盖，而不是冻成实心。** **在$4 \ \ {} ^ { \circ } \mathrm { C }$以上一切恢复正常，一锅受热的水中近壁的羽流携带了几乎全部热量：穿过一米$2 0 \ \ {} ^ { \circ } \mathrm { C }$静水的纯导热只给出$k / L \approx 0 . 6 \ \mathrm { W / m ^ { 2 } K }$，而同样的水中热壁面上的自然对流给出几百——多了上千倍。**
:::

::: definition 格拉晓夫数与瑞利数 {#def-gr}
在边界层动量方程中把浮升力与惯性力相平衡，把黏性扩散与沿流向的动量输运相平衡，就会出现两个无量纲数。设$L$为物体的竖直长度，$\Delta T$为表面与环境的温差：
$$
\mathrm { G r } _ { L } = { \frac { \rho ^ { 2 } g \beta \Delta T L ^ { 3 } } { \mu ^ { 2 } } } = { \frac { g \beta \Delta T L ^ { 3 } } { \nu ^ { 2 } } } \qquad \boxed { \; \mathrm { R a } _ { L } = \mathrm { G r } _ { L } \, \mathrm { P r } = { \frac { g \beta \Delta T L ^ { 3 } } { \nu \alpha } } \; }
$$
**$\mathrm { G r }$是$\mathrm { R e } ^ { 2 }$在浮升力问题中的对应物——它衡量浮升力与黏性阻力之比，速度尺度$( g \beta \Delta T L ) ^ { 1 / 2 }$扮演$U$的角色——而$\mathrm { R a }$是计入了导热的同一比值。** **可以把$\mathrm { R a }$理解为穿过厚度为$L$的一层输运能量的两种方式之间的竞争：浮升输运，按$g \beta \Delta T L ^ { 3 } / \nu$变化；导热，按$\alpha$变化。** **$\mathrm { R a } \ll 1$是完全没有运动的导热；$\mathrm { R a } \gg 1$是一个边界层加一个核心区；竖直表面上$\mathrm { R a } \gtrsim 1 0 ^ { 9 }$意味着层流的终结。**
**速度尺度和厚度尺度从同一个平衡中得出，值得记住，因为它们是你今后建立的每一个自然对流问题的合理性检验：**
$$
\boxed { \; u \sim { \sqrt { g \beta \Delta T L } } \; } \qquad \delta \sim { \frac { L } { \mathrm { R a } _ { L } ^ { 1 / 4 } } } \qquad h \sim { \frac { k } { \delta } } \sim { \frac { k } { L } } \, \mathrm { R a } _ { L } ^ { 1 / 4 }
$$
$$
\begin{array} { l c c c }
\text{情形} & u \text{ 尺度} & \delta \sim L \, \mathrm { R a } ^ { - 1 / 4 } & h \text{（丘吉尔-朱）} \\
\text{竖直平板，} 1 5 0 \ \mathrm { m m } \text{，} 5 0 \ \mathrm { K } \text{，空气} & 0 . 4 8 \ \mathrm { m / s } & 2 . 6 \ \mathrm { m m } & 6 . 0 \ \mathrm { W / m ^ { 2 } K } \\
\text{同一平板，} 1 \ \mathrm { m } \text{，} 5 0 \ \mathrm { K } & 1 . 2 \ \mathrm { m / s } & 4 . 1 \ \mathrm { m m } \text{（且为湍流）} & 5 . 0 \ \mathrm { W / m ^ { 2 } K } \\
\text{水，} 0 . 5 \ \mathrm { m } \text{，} 1 0 \ \mathrm { K } & 0 . 1 2 \ \mathrm { m / s } & 1 . 2 \ \mathrm { m m } & 5 5 0 \ \mathrm { W / m ^ { 2 } K }
\end{array}
$$
**沿热壁面向上的尺度速度为每秒半米（层内实测的峰值速度只是它的一部分，通常为每秒几十厘米）。** **这些就是“静止”空气实际流动的速度，它们解释了为什么烛焰会隔着整个房间倒向一个通风格栅，为什么烟升到天花板再沿着天花板漂移，以及为什么自然对流机箱必须在顶部开通风口，而不只是随便哪里开口。**
:::

::: widget plot
title: 自然对流表面传热系数随温升的变化：层流与湍流
f: 6.03*pow(x/50,0.25); 6.03*pow(x/50,1/3)
x: 2, 120
y: 0, 25
labels: laminar, h proportional to delta-T^1/4; turbulent, h proportional to delta-T^1/3
caption: 膜温度为$5 0 \ \ {} ^ { \circ } \mathrm { C }$时空气中一块$1 5 0 \ \mathrm { m m }$竖直平板的表面传热系数随表面与环境温差的变化。**两条曲线都在$5 0 \ \mathrm { K }$处通过$6 . 0 \ \mathrm { W / m ^ { 2 } K }$，然后分开：层流规律几乎是平的，湍流规律陡峭上升，因为在湍流区整个层都在混合，$h$不再受制于安静的导热底层。** **实际应读出的是层流曲线的平坦：从$2 0 \ \mathrm { K }$温升提高到$8 0 \ \mathrm { K }$只换来$4 1 \ \ \%$的表面传热系数增量，但$4 \times$的温差乘以$1 . 4 1$倍的表面传热系数，就是$5 . 7$倍的热流密度——这就是$\Delta T ^ { 5 / 4 }$规律，也是无源机箱的散热额定值对允许运行温度如此敏感的原因。** **湍流曲线仅供比较：这块平板需要数千开尔文的温差才能达到$\mathrm { R a } = 1 0 ^ { 9 }$，而一面$1 \ \mathrm { m }$的墙在约$1 1 \ \mathrm { K }$时就达到了——这就是为什么大的热物体遵循$\Delta T ^ { 1 / 3 }$规律而小的不遵循。**
:::

::: example 多快，多厚 {#ex-scale}
估算一个高$2 0 0 \ \mathrm { m m }$、温度为$7 0 \ \ {} ^ { \circ } \mathrm { C }$、处于$2 0 \ \ {} ^ { \circ } \mathrm { C }$房间中的竖直表面顶部的速度尺度和边界层厚度，以及与之相应的表面传热系数。
::: solution
**取$L = 0 . 2 0 0 \ \mathrm { m }$，$\Delta T = 5 0 \ \mathrm { K }$，膜温度$4 5 \ \ {} ^ { \circ } \mathrm { C }$：$\beta = 1 / 3 1 8 = 3 . 1 4 \times 1 0 ^ { - 3 } \ \mathrm { K ^ { - 1 } }$，$\nu = 1 . 7 5 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$，$\alpha = 2 . 4 7 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$，$k = 0 . 0 2 7 5 \ \mathrm { W / m \, K }$。**
$$
u \sim { \sqrt { g \beta \Delta T L } } = { \sqrt { 9 . 8 1 \times 3 . 1 4 \times 1 0 ^ { - 3 } \times 5 0 \times 0 . 2 0 0 } } = \mathbf { 0 . 5 6 \ \mathrm { m / s } }
$$
$$
\mathrm { R a } _ { L } = { \frac { 9 . 8 1 \times 3 . 1 4 \times 1 0 ^ { - 3 } \times 5 0 \times 0 . 2 0 0 ^ { 3 } } { 1 . 7 5 \times 1 0 ^ { - 5 } \times 2 . 4 7 \times 1 0 ^ { - 5 } } } = 2 . 8 5 \times 1 0 ^ { 7 } \qquad \delta \sim { \frac { 0 . 2 0 0 } { \left( 2 . 8 5 \times 1 0 ^ { 7 } \right) ^ { 1 / 4 } } } = { \frac { 0 . 2 0 0 } { 7 3 . 1 } } = \mathbf { 2 . 7 \ \mathrm { m m } }
$$
$$
h \sim { \frac { k } { \delta } } = { \frac { 0 . 0 2 7 5 } { 2 . 7 \times 1 0 ^ { - 3 } } } = 1 0 \ \mathrm { W / m ^ { 2 } K } \qquad ( \text{关联式：} 0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 } = 4 3 . 1 \Rightarrow h = 5 . 9 \ \mathrm { W / m ^ { 2 } K } )
$$
**量级分析给出了正确的数量级，表面传热系数在两倍以内——这正是量级分析所能做到的，也是为什么值得在套用关联式之前先做它。** **有两点要记住。** **速度尺度为每秒半米，而层内真实的峰值速度为每秒几十厘米：与普通房间里的穿堂风相当，因此真实房间中的热表面部分是被房间空气的任何运动所冷却的，而不只是靠它自身的浮升力。** **而且这一层只有几毫米厚：这就是为什么直径$2 \ \mathrm { m m }$的热电偶测点放在这一层中，读出的既不是表面温度也不是室温，也是为什么在静止房间中测量空气温度是一门技艺。**
:::
:::

::: exercise 推导：用量级分析得出格拉晓夫数与层流规律 {#der-gr level=3}
::: solution
**边界层中的两个平衡，与强制对流完全一样。**动量：无非定常项的浮升流动，因此惯性力$\rho u ^ { 2 } / L$由黏性力$\mu u / \delta ^ { 2 }$和浮升力$\rho \beta g \Delta T$所平衡：
$$
\rho u ^ { 2 } / L \sim \mu u / \delta ^ { 2 } \qquad \rho u ^ { 2 } / L \sim \rho \beta g \Delta T \qquad \delta \sim L / \mathrm { R a } ^ { 1 / 4 }
$$
**由第二式得$u \sim ( g \beta \Delta T L ) ^ { 1 / 2 }$——羽流速度。将两者代入第一式：**
$$
\rho \left( g \beta \Delta T L \right) / L = { \frac { \mu } { \delta ^ { 2 } } } \left( g \beta \Delta T L \right) ^ { 1 / 2 } \quad \Longrightarrow \quad \delta ^ { 2 } = { \frac { \mu \left( g \beta \Delta T L \right) ^ { 1 / 2 } } { \rho g \beta \Delta T } } = { \frac { \nu L ^ { 1 / 2 } } { \left( g \beta \Delta T \right) ^ { 1 / 2 } } } \quad \Longrightarrow \quad \boxed { \; \delta = { \frac { L } { \left( g \beta \Delta T L ^ { 3 } / \nu ^ { 2 } \right) ^ { 1 / 4 } } } = { \frac { L } { \mathrm { G r } _ { L } ^ { 1 / 4 } } } \; }
$$
**这是速度边界层的厚度；热边界层与之相差一个普朗特数因子，$\delta _ { t } = \delta \, \mathrm { P r } ^ { - \varphi }$，$\varphi$介于$1 / 2$与$1 / 4$之间，取决于两种扩散如何此消彼长，而在答案中留存下来的组合是$\mathrm { G r } \, \mathrm { P r } = \mathrm { R a }$：**
$$
h \sim { \frac { k } { \delta _ { t } } } \sim { \frac { k } { L } } \, \mathrm { P r } ^ { \varphi } \, \mathrm { G r } _ { L } ^ { 1 / 4 } \sim { \frac { k } { L } } \left( { \frac { g \beta \Delta T L ^ { 3 } } { \nu \alpha } } \right) ^ { 1 / 4 } \qquad \Longrightarrow \qquad \boxed { \; \mathrm { N u } _ { L } = C \, \mathrm { R a } _ { L } ^ { 1 / 4 } \; } \qquad \left[ \; h \propto \Delta T ^ { 1 / 4 } L ^ { - 1 / 4 } \; \right]
$$
**三个推论，都在数据分散度范围内得到了实验的证实。** **(i) $h$随长度按$L ^ { - 1 / 4 }$变化，这一依赖如此之弱，以至于自然对流表面传热系数常被当作常数来引用——但缩比模型的严格相似要求$\Delta T \propto L ^ { - 3 }$才能保持$\mathrm { R a }$相等，这就是为什么大型物体的空气模型很少可行（见[[#ex-nat-scale]]）。** **(ii) 热流密度按$\Delta T ^ { 5 / 4 }$变化，因此无源器件的“热阻”$R _ { \theta } = \Delta T / Q \propto \Delta T ^ { - 1 / 4 }$是一条曲线，为它给出一个数值是一种约定，而不是一种性质。** **(iii) 答案中没有$U$，因为根本没有$U$：流量会自行调整，直到黏性阻力与浮升力相平衡；这就是为什么风机定律不适用，也是为什么给流体更多活动空间并不能改进自然对流散热器，除非正是空间不足在扼制它。**
:::
:::

## 竖直平板：唯一干净的答案

::: definition 等温竖直平板的关联式 {#def-vplate}
对于高度为$L$的等温竖直平板，物性按膜温度$T _ { f } = ( T _ { s } + T _ { \infty } ) / 2$取值，气体取$\beta = 1 / T _ { f }$：
$$
\overline { { \mathrm { N u } } } _ { L } = { \begin{cases} 0 . 5 9 \, \mathrm { R a } _ { L } ^ { 1 / 4 } & 1 0 ^ { 4 } \lesssim \mathrm { R a } _ { L } \lesssim 1 0 ^ { 9 } \quad \text{层流} \\ 0 . 1 0 \, \mathrm { R a } _ { L } ^ { 1 / 3 } & 1 0 ^ { 9 } \lesssim \mathrm { R a } _ { L } \lesssim 1 0 ^ { 1 3 } \quad \text{湍流} \end{cases} } \qquad \text{（麦克亚当斯，} \pm 1 5 \ \%\text{）}
$$
**以及跨越两个流态、全程精度为$\pm 1 0 \ \ \%$的单一表达式：**
$$
\boxed { \; \overline { { \mathrm { N u } } } _ { L } = \left\{ 0 . 8 2 5 + { \frac { 0 . 3 8 7 \, \mathrm { R a } _ { L } ^ { 1 / 6 } } { \left[ 1 + \left( 0 . 4 9 2 / \mathrm { P r } \right) ^ { 9 / 1 6 } \right] ^ { 8 / 2 7 } } } \right\} ^ { 2 } \; } \qquad \text{（丘吉尔与朱，任意 } \mathrm { R a } , \text{ 任意 } \mathrm { P r } \text{）}
$$
**对于常热流密度而非常壁温的平板，表面温度沿板变化。通常的工程做法（因克罗普拉（Incropera）等，沿用丘吉尔（Churchill）与朱（Chu）的做法）是使用等温关联式，而$\Delta T$取半高处的值，$\Delta T _ { L / 2 } = T _ { s } ( L / 2 ) - T _ { \infty }$，并且因为$\Delta T _ { L / 2 }$是未知量而需要迭代。在层流范围内，丘吉尔与朱更精确的仅适用于层流的形式为**
$$
\overline { { \mathrm { N u } } } _ { L } = 0 . 6 8 + { \frac { 0 . 6 7 0 \, \mathrm { R a } _ { L } ^ { 1 / 4 } } { \left[ 1 + \left( 0 . 4 9 2 / \mathrm { P r } \right) ^ { 9 / 1 6 } \right] ^ { 4 / 9 } } } \qquad ( \mathrm { R a } _ { L } \lesssim 1 0 ^ { 9 } )
$$
**工程师需要从这一部分得到的四点。** **(i) $\mathrm { R a } _ { L } = 1 0 ^ { 9 }$处的转捩不是平板的性质，而是温差的性质：对于空气中一面$1 \ \mathrm { m }$高的竖直墙，转捩发生在$\Delta T \approx 1 1 \ \mathrm { K }$，而一块$1 0 0 \ \mathrm { m m }$的电路板需要一千倍的温差——它永远到不了那里。** **日常物体是层流；建筑物、储罐和散热器是湍流。** **(ii) 麦克亚当斯（McAdams）的两条规律在$0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 } = 0 . 1 0 \, \mathrm { R a } ^ { 1 / 3 }$处相交，即$\mathrm { R a } = 5 . 9 ^ { 1 2 } \approx 1 . 8 \times 1 0 ^ { 9 }$——按构造就靠近转捩点——而转捩区的真实行为是非定常的、胞格状的，不确定度约$2 0 \ \ \%$——不要把零件设计成在那里工作。** **(iii) 等温与等热流密度的答案在$\overline { { \mathrm { N u } } }$上相差百分之几，但在局部值上相差更多：常热流密度时，层流区内表面温度按$x ^ { 1 / 5 }$升高，因此受热通道的顶部是最热的地方，这与强制对流完全一样，只是程度弱得多。** **(iv) 平板必须高于其宽度，或者至少不能宽得太多：在宽平板上，流动在两侧变成三维的，二维关联式会高估中部的传热。**
:::

::: example 由房间冷却的电路板 {#ex-pcb-nat}
一块$1 5 0 \times 1 5 0 \ \mathrm { m m }$的竖直电路板，在$2 5 \ \ {} ^ { \circ } \mathrm { C }$的房间中从一个面散出$6 \ \mathrm { W }$。估算表面温度，并把答案与一位强制风冷设计者会作出的假定相比较。
::: solution
**表面传热系数取决于温差，而温差正是待求量，因此要迭代。**$q ^ { \prime \prime } = 6 / 0 . 0 2 2 5 = 2 6 7 \ \mathrm { W / m ^ { 2 } }$，在整个板面上均匀，因此使用层流的丘吉尔-朱形式，$\Delta T$取半高处的值。**猜$\Delta T _ { L / 2 } = 5 0 \ \mathrm { K }$，膜温度$5 0 \ \ {} ^ { \circ } \mathrm { C }$：$\nu = 1 . 8 0 \times 1 0 ^ { - 5 }$，$\alpha = 2 . 5 5 \times 1 0 ^ { - 5 }$，$k = 0 . 0 2 8 1 \ \mathrm { W / m \, K }$，$\mathrm { P r } = 0 . 7 0 6$，$\beta = 1 / 3 2 3 \ \mathrm { K ^ { - 1 } }$。**
$$
\mathrm { R a } _ { L } = { \frac { 9 . 8 1 \times \left( 1 / 3 2 3 \right) \times 5 0 \times 0 . 1 5 0 ^ { 3 } } { 1 . 8 0 \times 1 0 ^ { - 5 } \times 2 . 5 5 \times 1 0 ^ { - 5 } } } = 1 . 1 2 \times 1 0 ^ { 7 } \qquad \overline { { \mathrm { N u } } } = 0 . 6 8 + { \frac { 0 . 6 7 0 \times 5 7 . 8 } { 1 . 3 0 4 } } = 3 0 . 4 \qquad h = { \frac { 3 0 . 4 \times 0 . 0 2 8 1 } { 0 . 1 5 0 } } = 5 . 6 9 \ \mathrm { W / m ^ { 2 } K }
$$
$$
\Delta T _ { L / 2 } = { \frac { q ^ { \prime \prime } } { h } } = { \frac { 2 6 7 } { 5 . 6 9 } } = 4 6 . 9 \ \mathrm { K } \qquad ( \text{原猜测为 } 5 0 \text{；再迭代一次得 } h = 5 . 6 2 , \ \mathbf { 4 7 \ \mathrm { K } } )
$$
**电路板半高处的温度约为$7 2 \ \ {} ^ { \circ } \mathrm { C }$，而由于局部温升按$x ^ { 1 / 5 }$增长，顶边的温升还要再高约$2 ^ { 1 / 5 } = 1 . 1 5$倍——约$8 0 \ \ {} ^ { \circ } \mathrm { C }$。** **现在来比较。** **一位强制风冷设计者如果从典型值表中拿到“空气中的自然对流，约$1 0 \ \mathrm { W / m ^ { 2 } K }$”，会预测温升$2 7 \ \mathrm { K }$、电路板$5 2 \ \ {} ^ { \circ } \mathrm { C }$——误差$2 0 \ \mathrm { K }$，而且偏在不安全的一侧。** **使用简单的$0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 }$规律的设计者得到$h = 6 . 2$和$4 3 \ \mathrm { K }$，误差在$1 0 \ \ \%$以内——各关联式彼此之间的一致程度，远好于其中任何一个与“典型”值表的一致程度。** **热辐射会彻底改变这幅图景。取阻焊层发射率$0 . 8 5$，房间墙壁为$2 5 \ \ {} ^ { \circ } \mathrm { C }$，联立求解对流与辐射得到约$2 5 \ \mathrm { K }$的温升，其中辐射携带$q _ { r } ^ { \prime \prime } = 0 . 8 5 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 3 2 3 ^ { 4 } - 2 9 8 ^ { 4 } ) = 1 4 5 \ \mathrm { W / m ^ { 2 } }$——超过一半的热量——对流承担其余的$1 2 2 \ \mathrm { W / m ^ { 2 } }$。** **在这里忽略辐射是偏保守的；在抛光金属机箱上忽略它不会带来任何损失，而在这样的机箱上假定有辐射，则会适得其反。**
:::
:::

::: exercise 推导：为什么温升是设计变量 {#der-54 level=2}
::: solution
**取层流规律，把它写成热流密度。**
$$
q ^ { \prime \prime } = h \Delta T = C \, \Delta T ^ { 1 / 4 } \Delta T = C \Delta T ^ { 5 / 4 } \qquad \Longrightarrow \qquad { \frac { \mathrm { d } q ^ { \prime \prime } } { \mathrm { d } \Delta T } } = { \frac { 5 } { 4 } } \, { \frac { q ^ { \prime \prime } } { \Delta T } }
$$
**三个推论，它们是设计决策，而不是代数。** **(i) 敏感性。** **$h$上$1 0 \ \ \%$的误差——仅凭朝向就很容易犯——在$\Delta T$上造成的误差不到$1 0 \ \ \%$，因为$\Delta T \propto h ^ { - 4 / 5 }$给出$0 . 9 ^ { - 0 . 8 } = 1 . 0 8 7$：温升误差为$8 . 7 \ \ \%$。** **在湍流区$\Delta T \propto h ^ { - 3 / 4 }$，同样的关联式误差只造成$8 . 2 \ \ \%$：自然对流是一门宽容的学科，而这个宽容的指数正是其经验法则得以流传的原因。** **(ii) 面积的作用方式与强制对流不同。** **在相同$\Delta T$下面积加倍，$Q$就加倍；但如果改为把竖直平板的高度加倍，你只能得到$2 ^ { 3 / 4 } = 1 . 6 8$倍，因为$h \propto L ^ { - 1 / 4 }$，面积增加$2 \times$而表面传热系数损失$2 ^ { - 1 / 4 }$。** **加宽平板在$h$上没有任何损失：如果必须给无源散热器增加面积，就加宽度，而不是加高度——这与强制对流的直觉相反，在强制对流中，高度正是风机承担得起的。** **(iii) “热阻”是一条曲线。** **$R _ { \theta } = \Delta T / Q = 1 / ( C A \Delta T ^ { 1 / 4 } )$，因此一份给出无源机箱$R _ { \theta } = 2 . 5 \ \mathrm { K / W }$的数据手册，是在某一特定温升下给出的这个值，同一机箱在一半温升下的热阻为$2 . 5 \times 2 ^ { 1 / 4 } = 2 . 9 7 \ \mathrm { K / W }$。** **对无源部件使用产品目录数据的正确方法，是画出$Q$对$\Delta T$的双对数图：如果部件行为正常，它是一条斜率为$5 / 4$的直线；如果流动已经转捩或被扼制，它是一条折线。**
:::
:::

## 朝向：一块平板，五个答案

::: definition 水平平板、倾斜平板与圆柱 {#def-orient}
**这张表背后的规则是稳定性。**当受热表面使轻流体位于重流体之下时，层是不稳定的，羽流离开表面；当它使轻流体位于重流体之上时，层是稳定的，一切都靠扩散。
$$
\overline { { \mathrm { N u } } } _ { L _ { c } } = C \, \mathrm { R a } _ { L _ { c } } ^ { n } \ , \qquad L _ { c } = { \frac { A _ { s } } { P _ { s } } } \quad \text{（水平平板）}, \qquad \mathrm { R a } _ { L _ { c } } = { \frac { g \beta \Delta T L _ { c } ^ { 3 } } { \nu \alpha } }
$$
$$
\begin{array} { l c c l }
\text{表面} & C & n & \text{范围：} \mathrm { R a } _ { L _ { c } } \\
\text{热面朝上，或冷面朝下} & 0 . 5 4 & 1 / 4 & 1 0 ^ { 4 } - 1 0 ^ { 7 } \\
& 0 . 1 5 & 1 / 3 & 1 0 ^ { 7 } - 1 0 ^ { 1 1 } \\
\text{热面朝下，或冷面朝上} & 0 . 2 7 & 1 / 4 & 1 0 ^ { 5 } - 1 0 ^ { 1 0 } \\
\text{倾斜平板，与竖直方向夹角 } \gamma & 0 . 5 9 , \ g \cos \gamma \text{ 代入 } \mathrm { R a } & 1 / 4 & 1 0 ^ { 4 } - 1 0 ^ { 9 } , \ \gamma \lesssim 6 0 ^ { \circ } \\
\text{竖直平板} & 0 . 5 9 & 1 / 4 & 1 0 ^ { 4 } - 1 0 ^ { 9 }
\end{array}
$$
**对于水平圆柱，同样的丘吉尔-朱结构适用，以直径为长度，用$0 . 6 0$代替$0 . 8 2 5$，用$0 . 5 5 9$代替$0 . 4 9 2$：**
$$
\overline { { \mathrm { N u } } } _ { D } = \left\{ 0 . 6 0 + { \frac { 0 . 3 8 7 \, \mathrm { R a } _ { D } ^ { 1 / 6 } } { \left[ 1 + \left( 0 . 5 5 9 / \mathrm { P r } \right) ^ { 9 / 1 6 } \right] ^ { 8 / 2 7 } } } \right\} ^ { 2 } \qquad \left( \mathrm { R a } _ { D } \lesssim 1 0 ^ { 1 2 } \right)
$$
**对于球，$\overline { { \mathrm { N u } } } _ { D } = 2 + 0 . 5 8 9 \, \mathrm { R a } _ { D } ^ { 1 / 4 } / [ 1 + ( 0 . 4 6 9 / \mathrm { P r } ) ^ { 9 / 1 6 } ] ^ { 4 / 9 }$。** **其中的$2$是[[heat-transfer/external-convection#der-nu2|球的推导]]中的导热极限，它在气体中的小型热物体上占主导：一个比空气高$4 0 \ \mathrm { K }$的$3 \ \mathrm { m m }$测温珠，$\mathrm { N u } \approx 3 . 4$，其中导热项占$6 0 \ \ \%$。**
**三点实际解读。** **(i) 朝下的热表面几乎就是一个绝热表面：**$0 . 2 7$对$0 . 5 4$是两倍之差，而在小$\Delta T$下，稳定层甚至比关联式所说的还要好。**这就是为什么温暖的地板能很好地通过对流加热房间，而温暖的顶棚板几乎完全不对流——辐射顶棚板几乎完全靠热辐射工作。** **(ii) 倾斜修正是放在$\mathrm { R a }$里面的$\cos \gamma$，而不是放在外面：**$h \propto ( \cos \gamma ) ^ { 1 / 4 }$，因此偏离竖直$4 5 ^ { \circ }$的表面只损失竖直墙冷却能力的$8 \ \ \%$，偏离$6 0 ^ { \circ }$的损失$1 6 \ \ \%$。**偏离竖直超过$6 0 ^ { \circ }$时，该关联式被水平平板的各行所取代，而且这种转变是不连续的，因为流动形态发生了变化。** **(iii) 对于圆柱，只有当边界层比直径薄时才用直径**——即$\mathrm { R a } _ { D } \gtrsim 1 0 ^ { 4 }$。**低于此值，层的厚度与圆柱相比已不算薄，曲率占主导，$\mathrm { N u }$只是缓慢地降向一个受导热限制的值——这就是为什么适用到$\mathrm { R a } _ { D } \approx 1 0 ^ { - 5 }$的丘吉尔-朱拟合式带有一个常数项，而不是单一的幂律。**
:::

::: example 同一块平板，两种放法 {#ex-orient}
一块$5 0 0 \times 5 0 0 \ \mathrm { m m }$的水平平板，温度$8 0 \ \ {} ^ { \circ } \mathrm { C }$，处于$2 0 \ \ {} ^ { \circ } \mathrm { C }$的房间中。求热面朝上和热面朝下时该受热面的散热量，以及二者之比。
::: solution
**特征长度**$L _ { c } = A _ { s } / P _ { s } = 0 . 2 5 / 2 . 0 = 0 . 1 2 5 \ \mathrm { m }$。**膜温度**$5 0 \ \ {} ^ { \circ } \mathrm { C }$：$\nu = 1 . 8 0 \times 1 0 ^ { - 5 }$，$\alpha = 2 . 5 5 \times 1 0 ^ { - 5 }$，$k = 0 . 0 2 8 1$，$\beta = 1 / 3 2 3$。
$$
\mathrm { R a } _ { L _ { c } } = { \frac { 9 . 8 1 \times 3 . 1 0 \times 1 0 ^ { - 3 } \times 6 0 \times 0 . 1 2 5 ^ { 3 } } { 1 . 8 0 \times 1 0 ^ { - 5 } \times 2 . 5 5 \times 1 0 ^ { - 5 } } } = 7 . 8 \times 1 0 ^ { 6 }
$$
**朝上**（$1 0 ^ { 4 }$到$1 0 ^ { 7 }$：$0 . 5 4 \, \mathrm { R a } ^ { 1 / 4 }$规律，恰在其范围之内）：
$$
\overline { { \mathrm { N u } } } = 0 . 5 4 \times \left( 7 . 8 \times 1 0 ^ { 6 } \right) ^ { 1 / 4 } = 2 8 . 5 \qquad h = { \frac { 2 8 . 5 \times 0 . 0 2 8 1 } { 0 . 1 2 5 } } = 6 . 4 \ \mathrm { W / m ^ { 2 } K } \qquad q = 6 . 4 \times 0 . 2 5 \times 6 0 = \mathbf { 9 6 \ \mathrm { W } }
$$
**朝下：**
$$
\overline { { \mathrm { N u } } } = 0 . 2 7 \times \left( 7 . 8 \times 1 0 ^ { 6 } \right) ^ { 1 / 4 } = 1 4 . 3 \qquad h = 3 . 2 \ \mathrm { W / m ^ { 2 } K } \qquad q = \mathbf { 4 8 \ \mathrm { W } }
$$
**把平板翻过来，恰好相差两倍。** **加上$\varepsilon = 0 . 8 5$的热辐射，两种情形都增加$q _ { r } = 0 . 8 5 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 3 5 3 ^ { 4 } - 2 9 3 ^ { 4 } ) \times 0 . 2 5 = 9 8 \ \mathrm { W }$，于是总量朝上为$1 9 4 \ \mathrm { W }$、朝下为$1 4 6 \ \mathrm { W }$——比值为$1 . 3 3$而不是$2 . 0$。** **这就是本课总体教训的缩影：两种朝向之间的对流比值很惊人，总热量的比值则远没有那么惊人，而这两个数之间的差别，就是一项设计决策与一桩趣闻之间的差别。**
:::
:::

::: example 房间里的一根管道，两种机理各占一半 {#ex-pipe-nat}
一根外径$5 0 \ \mathrm { m m }$的水平管道，温度$6 0 \ \ {} ^ { \circ } \mathrm { C }$，处于$2 0 \ \ {} ^ { \circ } \mathrm { C }$的房间中，表面发射率$0 . 9$。求每米散热量以及辐射所占的份额。
::: solution
**膜温度**$4 0 \ \ {} ^ { \circ } \mathrm { C } = 3 1 3 \ \mathrm { K }$：$\nu = 1 . 7 0 \times 1 0 ^ { - 5 }$，$\alpha = 2 . 4 0 \times 1 0 ^ { - 5 }$，$k = 0 . 0 2 7 2 \ \mathrm { W / m \, K }$，$\mathrm { P r } = 0 . 7 0 7$，$\beta = 1 / 3 1 3$。
$$
\mathrm { R a } _ { D } = { \frac { 9 . 8 1 \times 3 . 1 9 \times 1 0 ^ { - 3 } \times 4 0 \times 0 . 0 5 0 ^ { 3 } } { 1 . 7 0 \times 1 0 ^ { - 5 } \times 2 . 4 0 \times 1 0 ^ { - 5 } } } = 3 . 8 \times 1 0 ^ { 5 }
$$
$$
\overline { { \mathrm { N u } } } _ { D } = \left\{ 0 . 6 0 + { \frac { 0 . 3 8 7 \times \left( 3 . 8 \times 1 0 ^ { 5 } \right) ^ { 1 / 6 } } { 1 . 2 0 5 } } \right\} ^ { 2 } = \left\{ 0 . 6 0 + { \frac { 0 . 3 8 7 \times 8 . 5 3 } { 1 . 2 0 5 } } \right\} ^ { 2 } = 1 1 . 1
$$
$$
h _ { c } = { \frac { 1 1 . 1 \times 0 . 0 2 7 2 } { 0 . 0 5 0 } } = 6 . 1 \ \mathrm { W / m ^ { 2 } K } \qquad h _ { r } = 0 . 9 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 3 3 3 + 2 9 3 ) \left( 3 3 3 ^ { 2 } + 2 9 3 ^ { 2 } \right) = 6 . 3 \ \mathrm { W / m ^ { 2 } K }
$$
$$
q ^ { \prime } = \left( 6 . 1 + 6 . 3 \right) \pi \times 0 . 0 5 0 \times 4 0 = \mathbf { 7 8 \ \mathrm { W / m } } \qquad \text{辐射 } \mathbf { 5 1 \ \ \% }
$$
**一半的热量，通过一种保温承包商不会提及的机理散失。** **两项校核。** **管道的复合表面传热系数为$1 2 . 4 \ \mathrm { W / m ^ { 2 } K }$——接近建筑计算中使用的$8$到$1 2 \ \mathrm { W / m ^ { 2 } K }$的复合表面传热系数，那些数值并没有错：它们是两种恰好在室温下相近的东西之和。** **而如果同一根管道是$\varepsilon = 0 . 1$的抛光铝，$h _ { r }$会降到$0 . 7$，总量降到$4 2 \ \mathrm { W / m }$：以一层铝箔的代价换来$4 5 \ \ \%$的降幅，这就是为什么保温管道常常外包光亮的铝皮。**
:::
:::

## 有限空间：无处可去的对流

::: definition 有限空间瑞利数与跨越间隙的努塞尔数 {#def-enclosure}
在间距为$S$的两个平行等温表面之间，特征长度是间隙而不是高度，努塞尔数按跨越间隙定义：
$$
\mathrm { R a } _ { S } = { \frac { g \beta \Delta T _ { 0 } S ^ { 3 } } { \nu \alpha } } \qquad \mathrm { N u } _ { S } = { \frac { h _ { \text{有效} } S } { k } } \qquad q ^ { \prime \prime } = \mathrm { N u } _ { S } \, { \frac { k } { S } } \, \Delta T _ { 0 }
$$
**$\mathrm { R a } _ { S }$小意味着间隙太薄，无法有效地形成环流：努塞尔数降到$1$，这一层成为纯导热热阻$S / k$——这正是双层中空玻璃的气体层所要达到的设计目标。** **两种几何需要不同的关联式。** **自下而上加热的水平层**（瑞利-贝纳德问题）在达到某个阈值之前是静止的，对于空气，霍兰兹（Hollands）及其合作者的关联式为
$$
\mathrm { N u } _ { S } = 1 + 1 . 4 4 \left[ 1 - { \frac { 1 7 0 8 } { \mathrm { R a } _ { S } } } \right] ^ { + } + \left[ \left( { \frac { \mathrm { R a } _ { S } } { 5 8 3 0 } } \right) ^ { 1 / 3 } - 1 \right] ^ { + } \qquad \left( \text{自下加热的水平空气层，} \mathrm { R a } _ { S } \lesssim 1 0 ^ { 8 } \right)
$$
**其中$[ \, ] ^ { + }$表示“括号内为负时取零”。** **三项对应三个区段：纯导热；在$\mathrm { R a } _ { S } = 1 7 0 8$处开始的胞格对流（反向旋转的涡卷，一对宽约$2 S$）；以及边界层区段，此时每个壁面各自长出自己的边界层，核心区充分混合。** **竖直腔**（一侧壁热、一侧壁冷，高度为$H$）没有阈值——在任何$\mathrm { R a }$下都有一个缓慢的胞格在转动——但在小$\mathrm { R a } _ { S }$下它所传递的热量几乎不超过导热。因克罗普拉等推荐的关联式之一是麦格雷戈-埃默里（MacGregor–Emery）关联式
$$
\mathrm { N u } _ { S } = 0 . 4 2 \, \mathrm { R a } _ { S } ^ { 1 / 4 } \, \mathrm { P r } ^ { 0 . 0 1 2 } \left( { \frac { H } { S } } \right) ^ { - 0 . 3 } \qquad \left( 1 0 < { \frac { H } { S } } < 4 0 , \ 1 0 ^ { 4 } < \mathrm { R a } _ { S } < 1 0 ^ { 7 } \right)
$$
**凡是公式给出的值小于一的地方，取$\mathrm { N u } _ { S } \approx 1$。**
**决定大多数有限空间设计的四个事实。** **(i) 间隙有一个最优值。** **在导热区段，随着间隙加宽，热流密度按$1 / S$下降；一旦进入边界层区段，$\mathrm { N u } _ { S } \propto S ^ { 3 / 4 } S ^ { 0 . 3 }$，而热导$h = \mathrm { N u } _ { S } k / S$几乎不随$S$变化。** **最小值位于对流开始处附近，对于窗户温差下的空气，大约是$1 2$到$2 0 \ \mathrm { mm }$——也正是中空玻璃制造商所用的范围；氩气之类较重的气体使$k$降低约$3 0 \ \ \%$，这就是它带来的大部分好处。** **(ii) 跨越间隙的热辐射与对流一样大：**两片无镀膜玻璃（$\varepsilon \approx 0 . 8 4$）在$1 0 \ \ {} ^ { \circ } \mathrm { C }$时通过辐射交换约$3 . 7 \ \mathrm { W / m ^ { 2 } K }$，超过气体的导热，这就是为什么低辐射镀膜对窗户的改进比任何充气都大。**(iii) 密封电子机箱正是通过这一机理经由壁面散热的，**其热预算中的“自然对流”项是一个有限空间关联式，而不是平板关联式，因为内壁面对着对面的壁。**(iv) 在壁上开孔，整个分析就变了：**有通风口的机箱是一个烟囱，它的流动由进出口之间的$\Delta \rho g H$决定，它携带的热量是${ \dot { m } } c _ { p } \Delta T$，其中${ \dot { m } }$由孔口方程求得——见[[#ex-chimney]]。
:::

::: widget plot
title: 空气间隙的努塞尔数随间隙瑞利数的变化
f: 1+1.44*max(0,1-1708/pow(10,x))+max(0,pow(pow(10,x)/5830,1/3)-1); max(1,0.1703*pow(10,x/4))
x: 2, 7
y: 0, 14
labels: horizontal layer heated from below (Hollands); vertical slot, H/S = 20 (MacGregor–Emery, Nu >= 1)
caption: 两个有限空间关联式随$\log _ { 1 0 } \mathrm { R a } _ { S }$的变化。**自下加热的水平层保持静止——$\mathrm { N u } = 1$，纯导热——直到$\mathrm { R a } _ { S } = 1 7 0 8$，然后随着胞格的形成而陡峭上升。** **竖直狭缝没有阈值，但它的环流只有在大约$\mathrm { R a } _ { S } \approx 1 0 ^ { 3 }$–$1 0 ^ { 4 }$以上才开始起作用，狭缝越高，起作用得越晚。** **读出对一个$1 2 \ \mathrm { m m }$、温差$1 0 \ \mathrm { K }$的竖直空气间隙的设计含义：$\mathrm { R a } _ { S } \approx 2 0 0 0$，因此气体层是纯导热热阻，热导$k / S \approx 2 . 1 \ \mathrm { W / m ^ { 2 } K }$——而跨越它的热辐射，对无镀膜玻璃约为$3 . 7 \ \mathrm { W / m ^ { 2 } K }$，是间隙热导中较大的部分。**
:::

::: example 双层中空玻璃 {#ex-window}
一扇竖直的双层中空玻璃窗有$1 2 \ \mathrm { m m }$的空气间隙，高$1 . 0 \ \mathrm { m }$，内层玻璃为$1 5 \ \ {} ^ { \circ } \mathrm { C }$，外层为$5 \ \ {} ^ { \circ } \mathrm { C }$。求气体跨越间隙传递的热流密度，与同一间隙充氩气时相比较，并估算窗户的$U$值。
::: solution
**膜温度**$1 0 \ \ {} ^ { \circ } \mathrm { C } = 2 8 3 \ \mathrm { K }$：空气$\nu = 1 . 4 6 \times 1 0 ^ { - 5 }$，$\alpha = 2 . 0 7 \times 1 0 ^ { - 5 }$，$k = 0 . 0 2 5 1 \ \mathrm { W / m \, K }$，$\beta = 1 / 2 8 3$。
$$
\mathrm { R a } _ { S } = { \frac { 9 . 8 1 \times 3 . 5 3 \times 1 0 ^ { - 3 } \times 1 0 \times 0 . 0 1 2 ^ { 3 } } { 1 . 4 6 \times 1 0 ^ { - 5 } \times 2 . 0 7 \times 1 0 ^ { - 5 } } } = 1 9 8 0 \qquad { \frac { H } { S } } = { \frac { 1 . 0 } { 0 . 0 1 2 } } = 8 3
$$
**这低于竖直腔关联式的适用范围，硬算一下得到$0 . 4 2 \times 1 9 8 0 ^ { 1 / 4 } \times 0 . 7 ^ { 0 . 0 1 2 } \times 8 3 ^ { - 0 . 3 } = 0 . 7 4 < 1$：间隙中缓慢的胞格所传递的热量不值一提，间隙是一个导热层。**
$$
\mathrm { N u } _ { S } \approx 1 \qquad h _ { \text{间隙} } = { \frac { k } { S } } = { \frac { 0 . 0 2 5 1 } { 0 . 0 1 2 } } = \mathbf { 2 . 0 9 \ \mathrm { W / m ^ { 2 } K } } \qquad q ^ { \prime \prime } = 2 0 . 9 \ \mathrm { W / m ^ { 2 } }
$$
**同一温度下的氩气$k = 0 . 0 1 7 2$，$\nu = 1 . 2 5 \times 1 0 ^ { - 5 }$，$\alpha = 1 . 9 2 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$，因此$\mathrm { R a } _ { S } \approx 2 5 0 0$——仍是导热——且**
$$
h _ { \text{氩气} } = { \frac { 0 . 0 1 7 2 } { 0 . 0 1 2 } } = 1 . 4 3 \ \mathrm { W / m ^ { 2 } K } \qquad q ^ { \prime \prime } = 1 4 . 3 \ \mathrm { W / m ^ { 2 } } \qquad \text{空气为 } 2 0 . 9 \text{：少 } 3 1 \ \ \%
$$
**在导热区段，充气的收益恰好与其导热系数成比例。** **但气体并不是间隙的全部：两片无镀膜玻璃（$\varepsilon = 0 . 8 4$）还通过辐射交换$h _ { r } \approx 4 \sigma T ^ { 3 } / ( 2 / \varepsilon - 1 ) = 3 . 7 \ \mathrm { W / m ^ { 2 } K }$。** **取标准表面热阻$0 . 1 3$（室内）和$0 . 0 4 \ \mathrm { m ^ { 2 } K / W }$（室外）：**
$$
{ \frac { 1 } { U } } = 0 . 1 3 + { \frac { 1 } { 2 . 0 9 + 3 . 7 } } + 0 . 0 4 \ \Rightarrow \ U = 2 . 9 \ \mathrm { W / m ^ { 2 } K } \ \text{（空气）} , \quad 2 . 7 5 \ \text{（氩气）}
$$
**——氩气仅带来$5 \ \ \%$的收益，因为热辐射主导着间隙。** **加上低辐射镀膜（一片玻璃上$\varepsilon = 0 . 0 4$），$h _ { r }$降到$0 . 2 \ \mathrm { W / m ^ { 2 } K }$：此时充空气$U = 1 . 6 5$，充氩气$1 . 2 8$，充气的价值达到$2 2 \ \ \%$。** **这就是为什么每一种现代中空玻璃都两者兼备，也是为什么单层玻璃（$1 / U = 0 . 1 3 + 0 . 0 4$，$U = 5 . 9 \ \mathrm { W / m ^ { 2 } K }$）的散热是它们的两到五倍。**
:::
:::

## 通道与肋片：间距问题

::: definition 平行平板阵列 {#def-array}
竖直散热器是由$n$块高度为$L$、间距为$S$、宽度为$W$的等温平板组成的阵列。**两条渐近线加一个插值，就足以描述它并据以设计。**以间隙定义通道瑞利数，并定义埃伦巴斯（Elenbaas）数$\mathrm { El } = \mathrm { R a } _ { S } \, S / L$：
$$
S \text{ 大：} h \to h _ { \infty } \text{（孤立竖直平板）} \qquad S \text{ 小：} \mathrm { Nu } _ { S } \to { \frac { \mathrm { El } } { 2 4 } } \ \text{（充分发展通道：空气以平板温度离开）}
$$
**窄通道极限是一个重要的意外：随着间隙闭合，表面传热系数并不是升向$k / S$——而是按$S ^ { 3 }$崩塌，因为穿过窄缝的浮升流量极小，空气远在到达顶部之前就已达到平板温度而饱和。**巴尔-科恩（Bar-Cohen）与罗塞诺（Rohsenow）对两个极限的复合关联式（适用于对称等温平板）为
$$
\boxed { \; \mathrm { Nu } _ { S } = { \frac { h S } { k } } = \left[ { \frac { 5 7 6 } { \mathrm { El } ^ { 2 } } } + { \frac { 2 . 8 7 3 } { \mathrm { El } ^ { 1 / 2 } } } \right] ^ { - 1 / 2 } \; } \qquad \mathrm { El } = { \frac { g \beta \Delta T S ^ { 4 } } { \nu \alpha L } }
$$
**其中$\Delta T$是平板与环境的温差，$L$是平板高度。** **注意$\mathrm { R a } _ { S }$中的长度：它是间隙$S$而不是高度，因为决定空气能否通过的是间隙。**
**设计问题不是求最大的$h$，而是在固定的外形尺寸内求最大的总散热量：**肋片越多，面积越大，但间隙越窄，$h$越低。**在固定宽度下使$h \times$（通道数）最大，得到巴尔-科恩与罗塞诺（1984）的最优间距：**
$$
\boxed { \; S _ { \text{opt} } = 2 . 7 1 4 \left( { \frac { g \beta \Delta T } { \nu \alpha L } } \right) ^ { - 1 / 4 } = 2 . 7 1 4 \, { \frac { L } { \mathrm { R a } _ { L } ^ { 1 / 4 } } } \; } \qquad \mathrm { Nu } _ { S } ( S _ { \text{opt} } ) \approx 1 . 3 1
$$
**对于空气，在无源冷却所涉及的尺寸和温差范围内，这个值为$6$到$1 2 \ \mathrm { m m }$，因为$S _ { \text{opt} } \propto ( L / \Delta T ) ^ { 1 / 4 }$几乎不动。** **这就是为什么无源散热型材的产品目录中肋片间隙为$6$到$1 2 \ \mathrm { m m }$，而同样的目录为强制对流提供$2 \ \mathrm { m m }$的间隙。**
**三条诚实的保留意见。** **(i) 最优值是平坦的。** **对于下面所画的散热器，在大约$6 . 5$到$1 0 . 5 \ \mathrm { m m }$之间的任何位置，单位底板面积的散热量都在其最大值的约$1 0 \ \ \%$以内——因此你可以按照你实际上会依据的那个理由来选择间距：你能买到的挤压模具。** **(ii) 低于最优值时惩罚很陡**——即$S ^ { 3 }$崩塌——**高于它时则很平缓；拿不准时，宁宽勿窄。** **(iii) 灰尘、潮气和成本才是真正的约束。** **在铺地毯的房间里，$4 \ \mathrm { m m }$的间隙就是一个毛毡过滤器，而一个恰好处在最优点上的设计，如果零件每年都要吹灰清理一次，就没有多少价值。**
:::

::: widget plot
title: 通道表面传热系数与散热器热导随肋片间距的变化（自然对流）
f: 28.37/x*pow(576/pow(0.018*pow(x,4),2)+2.873/sqrt(0.018*pow(x,4)),-0.5); 100*28.37/x*pow(576/pow(0.018*pow(x,4),2)+2.873/sqrt(0.018*pow(x,4)),-0.5)/(x+1.5); 5.49
x: 2, 20
y: 0, 60
labels: channel coefficient h(S), W/m2K (Bar-Cohen and Rohsenow); conductance per unit base area with 50 mm fins, W/m2K; isolated plate h_infinity
caption: 竖直肋片高$1 0 0 \ \mathrm { m m }$、厚$1 . 5 \ \mathrm { m m }$、深$5 0 \ \mathrm { m m }$，比$4 0 \ \ {} ^ { \circ } \mathrm { C }$的空气高$3 0 \ \mathrm { K }$，横坐标为以毫米计的肋片间距（肋效率取为一）。**下方的曲线是通道表面传热系数：它在约$5 \ \mathrm { m m }$以下崩塌，那里缝中的空气达到肋片温度而饱和；在$1 5 \ \mathrm { m m }$以上则趋近孤立平板值$h _ { \infty } \approx 5 . 5 \ \mathrm { W / m ^ { 2 } K }$。** **上方的曲线才是要紧的——$h$乘以一平方米底板上所能容纳的肋片面积——它在$S \approx 7 . 5$–$8 \ \mathrm { m m }$处达到峰值，即巴尔-科恩-罗塞诺最优值$S _ { \text{opt} } = 7 . 4 \ \mathrm { m m }$。** **读出它的平坦：在约$6 . 5$到$1 0 . 5 \ \mathrm { m m }$之间，热导保持在其峰值的约$1 0 \ \ \%$以内，小于关联式本身的不确定度。**
:::

::: example 设计一个无源散热器 {#ex-sink-nat}
一个$1 5 \ \mathrm { W }$的器件要在$4 0 \ \ {} ^ { \circ } \mathrm { C }$的机箱内以不超过$7 0 \ \ {} ^ { \circ } \mathrm { C }$的温度运行，装在一块竖直的$1 0 0 \times 1 0 0 \ \mathrm { m m }$底板上，底板带有贯通全部$1 0 0 \ \mathrm { m m }$高度、从底板伸出$5 0 \ \mathrm { m m }$的竖直直肋。**选择肋片间距并确定肋片数。**铝，$k = 1 8 0 \ \mathrm { W / m \, K }$，肋厚$1 . 5 \ \mathrm { m m }$。
::: solution
**从最优间距开始。**取$L = 0 . 1 0 0 \ \mathrm { m }$和猜测的$\Delta T = 3 0 \ \mathrm { K }$（膜温度$5 5 \ \ {} ^ { \circ } \mathrm { C }$：$\nu = 1 . 8 7 \times 1 0 ^ { - 5 }$，$\alpha = 2 . 6 6 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$，$k = 0 . 0 2 8 4 \ \mathrm { W / m \, K }$，$\beta = 1 / 3 2 8 \ \mathrm { K ^ { - 1 } }$）：$\mathrm { R a } _ { L } = 1 . 8 0 \times 1 0 ^ { 6 }$。
$$
S _ { \text{opt} } = 2 . 7 1 4 \times { \frac { 0 . 1 0 0 } { \left( 1 . 8 0 \times 1 0 ^ { 6 } \right) ^ { 1 / 4 } } } = 7 . 4 \ \mathrm { m m } \qquad \text{取 } S = 8 \ \mathrm { m m } : \quad n = 1 1 \ \text{片肋} \ \left( 1 1 \times 1 . 5 + 1 0 \times 8 = 9 6 . 5 \ \mathrm { m m } \right)
$$
**该间距下的表面传热系数：**$\mathrm { El } = \mathrm { R a } _ { S } S / L = 9 2 2 \times 0 . 0 8 = 7 3 . 7$，因此$\mathrm { Nu } _ { S } = \left[ 5 7 6 / 7 3 . 7 ^ { 2 } + 2 . 8 7 3 / 7 3 . 7 ^ { 1 / 2 } \right] ^ { - 1 / 2 } = 1 . 5 1$，$h = 1 . 5 1 \times 0 . 0 2 8 4 / 0 . 0 0 8 = 5 . 3 \ \mathrm { W / m ^ { 2 } K }$。**肋效率：**$m = { \sqrt { 2 h / k t } } = { \sqrt { 2 \times 5 . 3 / ( 1 8 0 \times 0 . 0 0 1 5 ) } } = 6 . 3 \ \mathrm { m ^ { - 1 } }$，$m H = 0 . 3 1$，$\eta _ { f } = \tanh 0 . 3 1 / 0 . 3 1 = 0 . 9 7$。
$$
A _ { f } = 1 1 \times 2 \times 0 . 0 5 0 \times 0 . 1 0 0 = 0 . 1 1 0 \ \mathrm { m ^ { 2 } } \qquad A _ { b } \approx 0 . 0 1 0 \ \mathrm { m ^ { 2 } } \ \text{（外露底板加肋端）}
$$
$$
Q = h \left( \eta _ { f } A _ { f } + A _ { b } \right) \Delta T = 5 . 3 \times ( 0 . 9 7 \times 0 . 1 1 0 + 0 . 0 1 0 ) \, \Delta T = 0 . 6 2 \, \Delta T \qquad \Longrightarrow \qquad \Delta T = { \frac { 1 5 } { 0 . 6 2 } } = 2 4 \ \mathrm { K }
$$
**因为$h$取决于$\Delta T$，所以要迭代：**在约$2 5 \ \mathrm { K }$时通道表面传热系数为$5 . 0 \ \mathrm { W / m ^ { 2 } K }$，热导为$0 . 5 9 \ \mathrm { W / K }$，$\Delta T = \mathbf { 2 6 \ K }$。**器件运行在约$6 6 \ \ {} ^ { \circ } \mathrm { C }$，有$4 \ \mathrm { K }$的裕量；取$5 \ \mathrm { mm }$厚的底板，散热器重约$0 . 3 6 \ \mathrm { k g }$。** **有两个比较可以帮助看清它的分量。** **光秃的$1 0 0 \times 1 0 0 \ \mathrm { m m }$底板，$h$为$6$到$8 \ \mathrm { W / m ^ { 2 } K }$量级，要靠对流散出$1 5 \ \mathrm { W }$需要大约$2 0 0 \ \mathrm { K }$的温升——肋片的价值约为八倍。** **而在$S = 5 \ \mathrm { m m }$时（十六片肋，面积多$4 5 \ \ \%$），通道表面传热系数会崩塌到约$2 . 4 \ \mathrm { W / m ^ { 2 } K }$，散热器会更热而不是更凉：当空气无法通过时，更多的金属并不意味着更多的冷却。** **阳极氧化散热器的热辐射会增加一份有用的裕量，但比面积所暗示的要少，因为肋片之间主要是相互对视。**
:::
:::

::: example 有通风口的机箱就是一个烟囱 {#ex-chimney}
一个宽$3 0 0 \ \mathrm { m m }$、高$4 0 0 \ \mathrm { m m }$、深$2 0 0 \ \mathrm { m m }$的电子机箱，内部散热$4 0 \ \mathrm { W }$。它在顶部和底部开有通风口，内部允许比房间高$2 0 \ \mathrm { K }$。**需要多大的通风口面积？烟囱承担了多少热量？**
::: solution
**驱动压差是两个通风口之间高度上内部气柱与外部气柱的重量差。**
$$
\Delta p = g H \left( \rho _ { o } - \rho _ { i } \right) = g H \rho _ { o } { \frac { \Delta T } { T _ { o } } } = 9 . 8 1 \times 0 . 4 0 0 \times 1 . 2 0 4 \times { \frac { 2 0 } { 2 9 3 } } = \mathbf { 0 . 3 2 \ \mathrm { P a } }
$$
**那是三分之一帕斯卡：相当于三十分之一毫米高的水柱的压强，约为一台小风机所能提供压强的千分之一。** **进出口通风口面积相等、均为$A$并串联，各分担一半压差；对锐缘孔取$C _ { d } = 0 . 7$，由孔口方程得：**
$$
u = C _ { d } { \sqrt { \frac { 2 \left( \Delta p / 2 \right) } { \rho _ { i } } } } = 0 . 7 \times { \sqrt { \frac { 0 . 3 2 } { 1 . 1 3 } } } = 0 . 3 7 \ \mathrm { m / s } \qquad { \dot { m } } = \rho _ { i } u A
$$
$$
Q = { \dot { m } } c _ { p } \Delta T = 1 . 1 3 \times 0 . 3 7 \times A \times 1 0 0 7 \times 2 0 = 8 5 0 0 \ A \ \mathrm { W } \quad ( A \text{ 以 } \mathrm { m ^ { 2 } } \text{ 计} )
$$
$$
A = 5 0 0 \ \mathrm { m m ^ { 2 } } \Rightarrow 4 . 3 \ \mathrm { W } \qquad A = 1 0 0 0 \ \mathrm { m m ^ { 2 } } \Rightarrow 8 . 5 \ \mathrm { W } \qquad A = 3 0 0 0 \ \mathrm { m m ^ { 2 } } \Rightarrow 2 6 \ \mathrm { W }
$$
**与此同时，机箱自身的外壳——$0 . 5 2 \ \mathrm { m ^ { 2 } }$的钣金——通过外表面的对流和辐射散热；外壳比房间高约$1 0 \ \mathrm { K }$、复合表面传热系数接近$1 0 \ \mathrm { W / m ^ { 2 } K }$时，这一部分为$5 0 \ \mathrm { W }$量级。** **因此设计问题的答案是：要让烟囱单独承担全部$4 0 \ \mathrm { W }$，需要$4 0 / 8 5 0 0 = 4 7 0 0 \ \mathrm { m m ^ { 2 } }$——顶部和底部各约$4 7 \ \mathrm { c m ^ { 2 } }$，这是一个格栅而不是一个孔，而且会让你花钱买来的防护等级（IP 等级）付诸东流。** **从这番算术中得出三条规则。** **(i) 烟囱速度按$\sqrt { H \Delta T }$变化，它携带的热量按${ \dot { m } } \Delta T \propto H ^ { 1 / 2 } \Delta T ^ { 3 / 2 }$变化，因此在相同容积下，高而瘦的机箱比矮而胖的通风更好。** **(ii) 通风口必须分设在顶部和底部；只在顶部开一个孔什么也带不走，因为流动没有回路。** **(iii) 任何限制通风口的东西——过滤网、密封垫唇边、挡在前面的电缆槽——都直接通过$C _ { d }$起作用：有效流量系数减半，流量和冷却就减半。**
:::
:::

## 混合对流：当风机很弱时

::: definition $\mathrm { G r } / \mathrm { R e } ^ { 2 }$判据，以及如何把两个答案相加 {#def-mixed}
强制对流与自然对流作用在同一个层上，或者同向，或者反向。**决定哪一个占主导的比值，是浮升力与强制流动惯性力之比：**
$$
\boxed { \; { \frac { \mathrm { G r } _ { L } } { \mathrm { R e } _ { L } ^ { 2 } } } = { \frac { g \beta \Delta T L } { U ^ { 2 } } } \; } \qquad { \begin{array} { l l } { \ll 1 } & { \text{强制对流；略去自然对流项} } \\ { \sim 1 } & { \text{混合对流；两者都算并加以组合} } \\ { \gg 1 } & { \text{自然对流；略去强制对流项} } \end{array} }
$$
$$
\begin{array} { l c c c }
\text{区段} & \mathrm { G r } / \mathrm { R e } ^ { 2 } & \text{空气，} 1 0 0 \ \mathrm { m m } \text{ 平板，} \Delta T = 3 0 \ \mathrm { K } \left( \mathrm { G r } = 3 . 4 \times 1 0 ^ { 6 } \right) & \text{组合规律} \\
\text{强制} & < 0 . 1 & U > 1 . 0 \ \mathrm { m / s } & \text{只用强制对流关联式} \\
\text{混合} & 0 . 1 - 1 0 & 0 . 1 < U < 1 . 0 \ \mathrm { m / s } & \text{组合} \\
\text{自然} & > 1 0 & U < 0 . 1 \ \mathrm { m / s } & \text{只用自然对流关联式}
\end{array}
$$
**对于助流（在上升气流中朝上的表面，处于向上气流中的竖直热平板），标准的组合方式为**
$$
\mathrm { N u } ^ { 3 } = \mathrm { N u } _ { \text{强制} } ^ { 3 } + \mathrm { N u } _ { \text{自然} } ^ { 3 } \qquad \text{（助流）} \qquad \mathrm { N u } ^ { 3 } = \left| \mathrm { N u } _ { \text{强制} } ^ { 3 } - \mathrm { Nu } _ { \text{自然} } ^ { 3 } \right| \qquad \text{（逆向，取绝对值）}
$$
**从这一部分要带走的四点。** **(i) 分母中的$U ^ { 2 }$就是全部要义：**混合对流是一种低速现象，在空气中它占据$0 . 0 5$到$0 . 5 \ \mathrm { m / s }$这一速度带，这恰好是房间、电缆槽、机架泄漏气流以及吹过停放车辆的风的速度范围。**(ii) 助流几乎总是安全的：**组合后的表面传热系数从不低于其中任何一部分，当两部分相等时，它是任一部分的$2 ^ { 1 / 3 } = 1 . 2 6$倍。**(iii) 逆流不安全。** **流过朝上热表面的向下强制气流，给出的表面传热系数可能远低于两种计算中的任何一个——两个层相互抵消，层内流动反向，而层流逆流层虽然是定常的，却几乎是绝热的。** **最糟的是，逆向混合对流可能是双稳态的：在同一流量下有两个解，这就是为什么“温度在振荡，而我们在试验中无法复现”是一种混合对流症状。** **(iv) 组合指数是经验的，不确定度$\pm 2 5 \ \ \%$；**助流取$n = 3$、逆流取$n = 2$到$3$是通常的推荐，而在情况要紧时，答案是一支热线风速仪，而不是一个公式。
:::

::: example 低速机架中的电路板 {#ex-mixed}
一块$1 5 0 \ \mathrm { m m }$高、温度$6 0 \ \ {} ^ { \circ } \mathrm { C }$的竖直电路板，位于$2 0 \ \ {} ^ { \circ } \mathrm { C }$的机架通道中，有$0 . 3 \ \mathrm { m / s }$的空气沿它向上流过。分别按强制对流、自然对流以及二者组合求表面传热系数，并说明应采用哪个答案。
::: solution
**膜温度**$4 0 \ \ {} ^ { \circ } \mathrm { C }$：$\nu = 1 . 7 0 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$，$k = 0 . 0 2 7 2 \ \mathrm { W / m \, K }$，$\mathrm { P r } = 0 . 7 0 7$，$\beta = 1 / 3 1 3 \ \mathrm { K ^ { - 1 } }$。
$$
\mathrm { R e } _ { L } = { \frac { 0 . 3 \times 0 . 1 5 0 } { 1 . 7 0 \times 1 0 ^ { - 5 } } } = 2 6 4 0 \qquad { \overline { { \mathrm { N u } } } } = 0 . 6 6 4 \times 2 6 4 0 ^ { 1 / 2 } \times 0 . 7 0 7 ^ { 1 / 3 } = 3 0 . 5 \qquad h _ { f } = 5 . 5 \ \mathrm { W / m ^ { 2 } K }
$$
$$
\mathrm { R a } _ { L } = { \frac { 9 . 8 1 \times 3 . 1 9 \times 1 0 ^ { - 3 } \times 4 0 \times 0 . 1 5 0 ^ { 3 } } { 1 . 7 0 \times 1 0 ^ { - 5 } \times 2 . 3 9 \times 1 0 ^ { - 5 } } } = 1 . 0 4 \times 1 0 ^ { 7 } \qquad h _ { n } = { \frac { 0 . 5 9 \times 1 . 0 4 \times 1 0 ^ { 7 \, 1 / 4 } \times 0 . 0 2 7 2 } { 0 . 1 5 0 } } = 6 . 1 \ \mathrm { W / m ^ { 2 } K }
$$
$$
{ \frac { \mathrm { G r } _ { L } } { \mathrm { R e } _ { L } ^ { 2 } } } = { \frac { 1 . 4 6 \times 1 0 ^ { 7 } } { 6 . 9 9 \times 1 0 ^ { 6 } } } = 2 . 1 \qquad ( \text{确定无疑的混合对流} )
$$
$$
h = \left( 5 . 5 ^ { 3 } + 6 . 1 ^ { 3 } \right) ^ { 1 / 3 } = 7 . 3 \ \mathrm { W / m ^ { 2 } K } \ \text{（助流，比单纯自然对流高 } + 2 0 \ \ \% \text{）} \qquad h = \left| 5 . 5 ^ { 3 } - 6 . 1 ^ { 3 } \right| ^ { 1 / 3 } = 3 . 8 \ \mathrm { W / m ^ { 2 } K } \ \text{（逆流，} - 3 7 \ \ \% \text{）}
$$
**空气上升时用$7 . 3$，下降时用$3 . 8$，不要把两者平均。** **实际的解读是：在机架中，$0 . 3 \ \mathrm { m / s }$向上与$0 . 3 \ \mathrm { m / s }$向下之间的差别是冷却能力上的两倍，而一台盲板漏风的机架，在从下往上第三个槽位中可能出现向下的气流。** **还要注意，单独的强制对流答案$5 . 5$比助流答案低$2 5 \ \ \%$，比逆流答案高$4 5 \ \ \%$：在$\mathrm { G r } / \mathrm { R e } ^ { 2 } \approx 2$时，没有任何单一机理的计算是安全的，诚实的表述是一个范围。**
:::
:::

## 习题

::: exercise 一面温暖的墙 {#ex-nat-wall level=1 check="18.4"}
一块$3 0 0 \times 3 0 0 \ \mathrm { m m }$的竖直平板保持在$6 0 \ \ {} ^ { \circ } \mathrm { C }$，处于$2 0 \ \ {} ^ { \circ } \mathrm { C }$的房间中。求平均表面传热系数和一个面的散热量。（以 W 为单位输入散热量。）
::: solution
**膜温度**$4 0 \ \ {} ^ { \circ } \mathrm { C }$：$\nu = 1 . 7 0 \times 1 0 ^ { - 5 }$，$\alpha = 2 . 3 9 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$，$k = 0 . 0 2 7 2 \ \mathrm { W / m \, K }$，$\beta = 1 / 3 1 3 \ \mathrm { K ^ { - 1 } }$。
$$
\mathrm { R a } _ { L } = { \frac { 9 . 8 1 \times 3 . 1 9 \times 1 0 ^ { - 3 } \times 4 0 \times 0 . 3 0 0 ^ { 3 } } { 1 . 7 0 \times 1 0 ^ { - 5 } \times 2 . 3 9 \times 1 0 ^ { - 5 } } } = 8 . 3 \times 1 0 ^ { 7 } \qquad ( \text{层流} )
$$
$$
{ \overline { { \mathrm { N u } } } } = 0 . 5 9 \times \left( 8 . 3 \times 1 0 ^ { 7 } \right) ^ { 1 / 4 } = 5 6 . 3 \qquad { \overline { { h } } } = { \frac { 5 6 . 3 \times 0 . 0 2 7 2 } { 0 . 3 0 0 } } = 5 . 1 \ \mathrm { W / m ^ { 2 } K } \qquad q = 5 . 1 \times 0 . 0 9 \times 4 0 = \mathbf { 1 8 . 4 \ W }
$$
**丘吉尔-朱给出$5 . 2 \ \mathrm { W / m ^ { 2 } K }$，相差在$2 \ \ \%$以内，因为$8 . 3 \times 1 0 ^ { 7 }$稳稳地处于层流区间之内。** **$\varepsilon = 0 . 9$的热辐射将增加$q _ { r } = 0 . 9 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 3 3 3 ^ { 4 } - 2 9 3 ^ { 4 } ) \times 0 . 0 9 = 2 3 \ \mathrm { W }$，比对流本身还多：$1 8 . 4 \ \mathrm { W }$是所问问题的答案，而$4 1 \ \mathrm { W }$是设计者所需问题的答案。**
:::
:::

::: exercise 把它翻过来 {#ex-nat-updown level=1 check="26"}
一块$4 0 0 \times 4 0 0 \ \mathrm { m m }$的水平平板，温度$7 0 \ \ {} ^ { \circ } \mathrm { C }$，处于$2 0 \ \ {} ^ { \circ } \mathrm { C }$的房间中。求热面朝上和热面朝下时该受热面的散热量。（输入朝下时的值，单位 W。）
::: solution
$L _ { c } = A _ { s } / P _ { s } = 0 . 1 6 / 1 . 6 = 0 . 1 0 0 \ \mathrm { m }$。**膜温度**$4 5 \ \ {} ^ { \circ } \mathrm { C }$：$k = 0 . 0 2 7 6 \ \mathrm { W / m \, K }$，$\nu = 1 . 7 5 \times 1 0 ^ { - 5 }$，$\alpha = 2 . 4 7 \times 1 0 ^ { - 5 }$，$\beta = 1 / 3 1 8$。
$$
\mathrm { R a } _ { L _ { c } } = { \frac { 9 . 8 1 \times 3 . 1 4 \times 1 0 ^ { - 3 } \times 5 0 \times 0 . 1 0 0 ^ { 3 } } { 1 . 7 5 \times 1 0 ^ { - 5 } \times 2 . 4 7 \times 1 0 ^ { - 5 } } } = 3 . 6 \times 1 0 ^ { 6 }
$$
$$
\text{朝上：} \ { \overline { { h } } } = { \frac { 0 . 5 4 \times ( 3 . 6 \times 1 0 ^ { 6 } ) ^ { 1 / 4 } \times 0 . 0 2 7 6 } { 0 . 1 0 0 } } = 6 . 5 \ \mathrm { W / m ^ { 2 } K } \qquad q = 6 . 5 \times 0 . 1 6 \times 5 0 = 5 2 \ \mathrm { W }
$$
$$
\text{朝下：} \ { \overline { { h } } } = { \frac { 0 . 2 7 } { 0 . 5 4 } } \times 6 . 5 = 3 . 2 \ \mathrm { W / m ^ { 2 } K } \qquad q = \mathbf { 2 6 \ W }
$$
**这两倍之差来自层的稳定性，值得弄清楚你的零件哪一面是哪一面。** **注意，平板顶面散失$5 2 \ \mathrm { W }$、底面散失$2 6$，因此悬挂在房间中的平板通过对流共散失$7 8 \ \mathrm { W }$，其中顶面完成了三分之二的工作——这就是为什么热表面**上方**的邻居总是过热的那一个。**
:::
:::

::: exercise 刷了漆的蒸汽管 {#ex-nat-pipe level=2 check="319"}
一根外径$8 0 \ \mathrm { m m }$、温度$1 1 0 \ \ {} ^ { \circ } \mathrm { C }$的蒸汽管穿过$2 5 \ \ {} ^ { \circ } \mathrm { C }$的房间；表面刷了漆，$\varepsilon = 0 . 9$。求包括热辐射在内的每米散热量。（以 W/m 为单位输入，取整。）
::: solution
**膜温度**$6 7 . 5 \ \ {} ^ { \circ } \mathrm { C } \approx 7 0 \ \ {} ^ { \circ } \mathrm { C }$：$\nu = 1 . 9 9 \times 1 0 ^ { - 5 }$，$k = 0 . 0 2 9 7$，$\mathrm { P r } = 0 . 7 0 3$，$\alpha = 2 . 8 3 \times 1 0 ^ { - 5 }$，$\beta = 1 / 3 4 3$。
$$
\mathrm { R a } _ { D } = { \frac { 9 . 8 1 \times 2 . 9 2 \times 1 0 ^ { - 3 } \times 8 5 \times 0 . 0 8 0 ^ { 3 } } { 1 . 9 9 \times 1 0 ^ { - 5 } \times 2 . 8 3 \times 1 0 ^ { - 5 } } } = 2 . 2 \times 1 0 ^ { 6 } \qquad { \overline { { \mathrm { N u } } } } _ { D } = \left\{ 0 . 6 0 + { \frac { 0 . 3 8 7 \times \left( 2 . 2 \times 1 0 ^ { 6 } \right) ^ { 1 / 6 } } { 1 . 2 0 5 } } \right\} ^ { 2 } = 1 8 . 2
$$
$$
h _ { c } = { \frac { 1 8 . 2 \times 0 . 0 2 9 7 } { 0 . 0 8 0 } } = 6 . 7 5 \ \mathrm { W / m ^ { 2 } K } \qquad h _ { r } = 0 . 9 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 3 8 3 + 2 9 8 ) \left( 3 8 3 ^ { 2 } + 2 9 8 ^ { 2 } \right) = 8 . 2 \ \mathrm { W / m ^ { 2 } K }
$$
$$
q ^ { \prime } = ( 6 . 7 5 + 8 . 1 8 ) \times \pi \times 0 . 0 8 0 \times 8 5 = \mathbf { 3 1 9 \ W / m } \qquad \text{辐射 } 5 5 \ \ \%
$$
**总量为$3 1 9 \ \mathrm { W / m }$，其中$1 7 5 \ \mathrm { W / m }$——$5 5 \ \%$——是热辐射，而辐射来自一个表面，其发射率恰恰是计算中唯一没有人去测量的性质。** **一段$4 0 \ \mathrm { m }$长的这种裸管持续耗费$1 3 \ \mathrm { k W }$，这就是为什么保温层在一个供暖季内就能收回成本，也是为什么对裸露管道做一次红外普查是工厂工程师所能进行的最便宜的能源审计之一。**
:::
:::

::: exercise 两个间隙 {#ex-nat-gap level=2 check="26"}
一个高$1 . 2 \ \mathrm { m }$的竖直有限空间有一个$2 0 \ \mathrm { m m }$的空气间隙，两侧温差$1 5 \ \mathrm { K }$。用麦格雷戈-埃默里关联式求对流热流密度。然后对$5 0 \ \mathrm { m m }$的间隙重复计算。（以$\mathrm { W / m ^ { 2 } }$为单位输入第二个热流密度。）
::: solution
**膜温度**$1 0 \ \ {} ^ { \circ } \mathrm { C }$：$\nu = 1 . 4 6 \times 1 0 ^ { - 5 }$，$\alpha = 2 . 0 7 \times 1 0 ^ { - 5 }$，$k = 0 . 0 2 5 1$，$\beta = 1 / 2 8 3$。
$$
S = 2 0 \ \mathrm { m m } : \quad \mathrm { R a } _ { S } = { \frac { 9 . 8 1 \times 3 . 5 3 \times 1 0 ^ { - 3 } \times 1 5 \times 0 . 0 2 0 ^ { 3 } } { 1 . 4 6 \times 1 0 ^ { - 5 } \times 2 . 0 7 \times 1 0 ^ { - 5 } } } = 1 . 3 8 \times 1 0 ^ { 4 } \qquad { \frac { H } { S } } = 6 0
$$
$$
\mathrm { N u } _ { S } = 0 . 4 2 \times \left( 1 . 3 8 \times 1 0 ^ { 4 } \right) ^ { 1 / 4 } \times 0 . 7 ^ { 0 . 0 1 2 } \times 6 0 ^ { - 0 . 3 } = 1 . 3 3 \qquad h = 1 . 3 3 \times { \frac { 0 . 0 2 5 1 } { 0 . 0 2 0 } } = 1 . 6 6 \ \mathrm { W / m ^ { 2 } K } \qquad q ^ { \prime \prime } = 2 5 \ \mathrm { W / m ^ { 2 } }
$$
$$
S = 5 0 \ \mathrm { m m } : \quad \mathrm { R a } _ { S } = 2 . 1 5 \times 1 0 ^ { 5 } , \ { \frac { H } { S } } = 2 4 , \ \mathrm { N u } _ { S } = 3 . 4 7 , \ h = 1 . 7 4 \ \mathrm { W / m ^ { 2 } K } \qquad q ^ { \prime \prime } = \mathbf { 2 6 \ W / m ^ { 2 } }
$$
**（$H / S = 6 0$略超出该关联式所述的范围上限$4 0$；要紧的是趋势。）** **把间隙加宽到两倍半，热流密度基本不变：在对流区段，$\mathrm { Nu } _ { S }$几乎恰好与$S$成比例增长，因此额外的导热长度毫无收益。** **纯导热会给出$1 8 . 8$和$7 . 5 \ \mathrm { W / m ^ { 2 } }$——这就是为什么隔热间隙要保持得足够薄，以停留在导热区段附近，也是为什么宽的空气夹层不是保温层。**
:::
:::

::: exercise 屋顶上的太阳能集热器 {#ex-nat-solar level=2 check="430"}
一块平板集热器的吸热板尺寸为$1 . 0 \times 2 . 0 \ \mathrm { m }$，温度$6 0 \ \ {} ^ { \circ } \mathrm { C }$，处于$1 0 \ \ {} ^ { \circ } \mathrm { C }$的无风空气中。把集热板当作倾斜平板，求它平铺在$3 5 ^ { \circ }$屋顶上时的对流散热量，再求它竖直安装时的对流散热量。（输入倾斜时的散热量，单位 W。）
::: solution
**倾角以$g \cos \gamma$的形式进入，$\gamma$从竖直方向量起（适用到约$6 0 ^ { \circ }$），长度取沿坡向的$1 . 0 \ \mathrm { m }$尺寸。** **膜温度**$3 5 \ \ {} ^ { \circ } \mathrm { C }$：$k = 0 . 0 2 6 8 \ \mathrm { W / m \, K }$，$\nu = 1 . 6 6 \times 1 0 ^ { - 5 }$，$\alpha = 2 . 3 2 \times 1 0 ^ { - 5 }$，$\beta = 1 / 3 0 8$。
$$
\gamma = 5 5 ^ { \circ } \text{（从竖直方向量起）}: \quad \mathrm { R a } _ { L } = { \frac { 9 . 8 1 \cos 5 5 ^ { \circ } \times 3 . 2 5 \times 1 0 ^ { - 3 } \times 5 0 \times 1 . 0 ^ { 3 } } { 1 . 6 6 \times 1 0 ^ { - 5 } \times 2 . 3 2 \times 1 0 ^ { - 5 } } } = 2 . 4 \times 1 0 ^ { 9 }
$$
**这高于$1 0 ^ { 9 }$，因此该层是湍流，$0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 }$规律不适用；应使用跨越转捩区的丘吉尔-朱关联式。**
$$
{ \overline { { \mathrm { N u } } } } = \left\{ 0 . 8 2 5 + { \frac { 0 . 3 8 7 \times \left( 2 . 4 \times 1 0 ^ { 9 } \right) ^ { 1 / 6 } } { 1 . 1 9 3 } } \right\} ^ { 2 } = 1 6 1 \qquad { \overline { { h } } } = { \frac { 1 6 1 \times 0 . 0 2 6 8 } { 1 . 0 } } = 4 . 3 \ \mathrm { W / m ^ { 2 } K }
$$
$$
q = 4 . 3 \times 2 . 0 \times 5 0 = \mathbf { 4 3 0 \ W } \qquad \text{竖直：} \ \mathrm { R a } = 4 . 1 \times 1 0 ^ { 9 } \ , \ { \overline { { h } } } = 5 . 1 \ , \ q = 5 1 2 \ \mathrm { W }
$$
**把集热板从竖直方向倾斜$5 5 ^ { \circ }$，对流散热量只减少$1 6 \ \ \%$——而一块无盖板的吸热板接收的阳光也许只有$1 4 0 0 \ \mathrm { W }$，$4 3 0 \ \mathrm { W }$的对流损失意味着将近三分之一的输入就此流失；这就是为什么实际的集热器都加了透明盖板，而设计的功夫花在盖板间隙上，而不是倾角上。** **注意瑞利数的大小：在一米长、$5 0 \ \mathrm { K }$温差下，流动已越过转捩，在这里套用层流$0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 }$规律的设计者会得到$h = 3 . 5$，偏低约$2 0 \ \ \%$。**
:::
:::

::: exercise 是水，不是空气 {#ex-nat-water level=2 check="720"}
一面$0 . 6 \ \mathrm { m }$高的竖直储罐壁浸在$2 0 \ \ {} ^ { \circ } \mathrm { C }$的水中，保持在$6 0 \ \ {} ^ { \circ } \mathrm { C }$。用麦克亚当斯湍流规律估算表面传热系数。（膜温度$4 0 \ \ {} ^ { \circ } \mathrm { C }$下的水：$\nu = 0 . 6 5 8 \times 1 0 ^ { - 6 } \ \mathrm { m ^ { 2 } / s }$，$k = 0 . 6 3 1 \ \mathrm { W / m \, K }$，$\mathrm { P r } = 4 . 3$，$\beta = 3 . 8 \times 1 0 ^ { - 4 } \ \mathrm { K ^ { - 1 } }$，$\alpha = 1 . 5 1 \times 1 0 ^ { - 7 } \ \mathrm { m ^ { 2 } / s }$。以$\mathrm { W / m ^ { 2 } K }$为单位输入。）
::: solution
$$
\mathrm { R a } _ { L } = { \frac { 9 . 8 1 \times 3 . 8 \times 1 0 ^ { - 4 } \times 4 0 \times 0 . 6 0 0 ^ { 3 } } { 0 . 6 5 8 \times 1 0 ^ { - 6 } \times 1 . 5 1 \times 1 0 ^ { - 7 } } } = 3 . 2 4 \times 1 0 ^ { 1 1 } \qquad ( \text{湍流，远高于 } 1 0 ^ { 9 } )
$$
$$
{ \overline { { \mathrm { N u } } } } = 0 . 1 0 \times \left( 3 . 2 4 \times 1 0 ^ { 1 1 } \right) ^ { 1 / 3 } = 6 8 7 \qquad { \overline { { h } } } = { \frac { 6 8 7 \times 0 . 6 3 1 } { 0 . 6 0 0 } } = \mathbf { 7 2 0 \ W / m ^ { 2 } K }
$$
**对一个看起来太大的答案做三项校核。** **它并不太大：同一面墙在空气中约为$5 \ \mathrm { W / m ^ { 2 } K }$，而这个比值正是物性所预测的——二十三倍的导热系数，以及大五百倍的瑞利数。** **丘吉尔-朱对同一面墙给出$9 8 0 \ \mathrm { W / m ^ { 2 } K }$——这提醒我们，在液体中大$\mathrm { R a }$下各关联式之间相差几十个百分点。层流规律会给出$0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 } k / L = 4 7 0 \ \mathrm { W / m ^ { 2 } K }$，偏低，因为$\mathrm { R a } _ { L } = 3 \times 1 0 ^ { 1 1 }$是转捩值的数百倍：在液体中，普通的高度和普通的温差就是湍流，$1 / 4$次幂规律很少是正确的那一个。** **还要留意$\beta$，它对水来说不是常数：$2 0 \ \ {} ^ { \circ } \mathrm { C }$时为$2 . 1 \times 1 0 ^ { - 4 }$，$6 0 \ \ {} ^ { \circ } \mathrm { C }$时为$5 . 1 \times 1 0 ^ { - 4 }$，因此按错误膜温度建立的表面传热系数，在湍流区最多可偏差$( 5 . 1 / 2 . 1 ) ^ { 1 / 3 } = 1 . 3 4$倍，在层流区可偏差$1 . 2 5$倍。** **这个教训正是关于水的那一个：液体中的自然对流比气体中强两个数量级。** **一面比水高$4 0 \ \mathrm { K }$的储罐壁，每平方米向水中散失$2 9 \ \mathrm { k W }$；同一面墙在空气中散失$2 0 0 \ \mathrm { W }$。任何把“空气中的自然对流”数值用于液体的做法，都会错这么多倍。**
:::
:::

::: exercise 多高，多宽 {#ex-nat-scale level=3 check="1375"}
空气中一块$1 \ \mathrm { m }$高的竖直平板比房间高$1 1 \ \mathrm { K }$。**要以相同的瑞利数试验一个五分之一缩比模型。**求模型所需的$\Delta T$，以及模型与原型表面传热系数之比。（以 K 为单位输入$\Delta T$。）
::: solution
$$
\mathrm { R a } = { \frac { g \beta \Delta T L ^ { 3 } } { \nu \alpha } } \quad \text{相等} \quad \Longrightarrow \quad \Delta T _ { m } = \Delta T _ { p } \left( { \frac { L _ { p } } { L _ { m } } } \right) ^ { 3 } = 1 1 \times 5 ^ { 3 } = \mathbf { 1 3 7 5 \ K }
$$
**这是不可能的——而这正是本题真正要问的那个问题的答案。** **自然对流中的严格相似要求$\Delta T \propto L ^ { - 3 }$，因此五分之一模型在空气中需要$1 3 7 5 \ \mathrm { K }$，十分之一模型则需要$1 1 \ 0 0 0 \ \mathrm { K }$；远在几何被复现之前，仅物性的变化就已毁掉了这个实验。** **这与强制对流相反：在强制对流中，五分之一缩比下匹配$\mathrm { R e }$意味着把速度乘以五，一座好的风洞做得到。** **部分的出路有两条。$h \propto L ^ { - 1 / 4 }$如此之弱，以至于在相同$\Delta T$下运行的模型在$h$上只偏差$5 ^ { 1 / 4 } = 1 . 5$倍；而采用$g \beta \Delta T / ( \nu \alpha )$大得多的工质可以恢复瑞利数——在相同$\Delta T$下用水代替空气可获得数百倍的增益，这就是为什么小尺度的水模型和盐水模型被用来研究建筑物中的浮升流动。** **所问的比值（若模型在相同$\Delta T$下运行）为$h _ { m } / h _ { p } = ( L _ { p } / L _ { m } ) ^ { 1 / 4 } = 5 ^ { 1 / 4 } = \mathbf { 1 . 5 }$——模型过度冷却$50 \ \ \%$，这究竟是有用的裕量还是无用的结果，取决于你要认证的是什么。**
:::
:::

::: exercise 装不装盲板 {#ex-nat-rack level=3 check="4.4"}
一块$2 5 0 \ \mathrm { m m }$高的设备板卡竖直插在机架中。机架风机运转时，流过板卡的空气速度为$0 . 2 5 \ \mathrm { m / s }$向上，板卡比进口空气高$3 5 \ \mathrm { K }$。计算$\mathrm { G r } _ { L } / \mathrm { R e } _ { L } ^ { 2 }$（输入这一比值），并说明风机是否在起有用的作用。（膜温度下的空气：$\nu = 1 . 7 5 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$，$\beta = 1 / 3 1 5 \ \mathrm { K ^ { - 1 } }$。）
::: solution
$$
\mathrm { G r } _ { L } = { \frac { 9 . 8 1 \times 3 . 1 7 \times 1 0 ^ { - 3 } \times 3 5 \times 0 . 2 5 0 ^ { 3 } } { \left( 1 . 7 5 \times 1 0 ^ { - 5 } \right) ^ { 2 } } } = 5 . 5 6 \times 1 0 ^ { 7 } \qquad \mathrm { R e } _ { L } = { \frac { 0 . 2 5 \times 0 . 2 5 0 } { 1 . 7 5 \times 1 0 ^ { - 5 } } } = 3 5 7 1
$$
$$
{ \frac { \mathrm { G r } _ { L } } { \mathrm { R e } _ { L } ^ { 2 } } } = { \frac { 5 . 5 6 \times 1 0 ^ { 7 } } { 1 . 2 8 \times 1 0 ^ { 7 } } } = \mathbf { 4 . 4 } \qquad h _ { f } = 3 . 9 \ \mathrm { W / m ^ { 2 } K } \ , \ h _ { n } = 5 . 1 \ \mathrm { W / m ^ { 2 } K } \ , \ h _ { \text{助流} } = 5 . 8 \ \mathrm { W / m ^ { 2 } K }
$$
**风机在起有用的作用，但只比板卡自身所能达到的多$1 3 \ \%$。**（取$k = 0 . 0 2 7 4 \ \mathrm { W / m \, K}$和$\mathrm { Pr } = 0 . 7 0 7$：$h _ { f } = 0 . 6 6 4 \, \mathrm { Re } ^ { 1 / 2 } \mathrm { Pr } ^ { 1 / 3 } k / L$，$h _ { n } = 0 . 5 9 \, \mathrm { Ra } ^ { 1 / 4 } k / L$，按$\mathrm { Nu } ^ { 3 } = \mathrm { Nu } _ { f } ^ { 3 } + \mathrm { Nu } _ { n } ^ { 3 }$组合。）**单纯强制对流的表面传热系数为$3 . 9$，单纯自然对流的为$5 . 1$，而风机付出它的功率、噪声和轴承的代价，换来的是$0 . 7 \ \mathrm { W / m ^ { 2 } K }$。** **更糟的是：如果某条泄漏路径使流动反转，让$0 . 2 5 \ \mathrm { m / s }$的气流沿板卡向下流，答案就变成$4 . 2$，这时风机反而让板卡比没有风机时更热。** **这就是盲板背后的算术：机架的冷却不是靠更多的空气来改善，而是靠流到它该去之处的空气；在$0 . 1$到$0 . 5 \ \mathrm { m / s }$这一速度带中，气流的方向比它的速度更重要。**
:::
:::

::: exercise 悬挂中冷却的平板 {#ex-nat-cool level=4 check="30"}
一块$5 \ \mathrm { m m }$厚的钢板（$\rho = 7 8 0 0 \ \mathrm { k g / m ^ { 3 } }$，$c _ { p } = 4 9 0 \ \mathrm { J / k g \, K }$，$k = 5 0 \ \mathrm { W / m \, K }$）从$3 0 0 \ \ {} ^ { \circ } \mathrm { C }$的炉中取出，以$3 0 0 \times 3 0 0 \ \mathrm { m m }$的尺寸竖直悬挂在$2 0 \ \ {} ^ { \circ } \mathrm { C }$的房间中。**忽略热辐射，取$h = 6 \left( \Delta T / 1 0 0 \right) ^ { 1 / 4 } \ \mathrm { W / m ^ { 2 } K }$。**求钢板降到$1 0 0 \ \ {} ^ { \circ } \mathrm { C }$所需的时间。（以分钟为单位输入时间，取到最接近的整分钟。）
::: solution
**用集总参数法，因为$\mathrm { B i } = h L _ { c } / k = 6 \times 0 . 0 0 2 5 / 5 0 = 3 \times 1 0 ^ { - 4 }$。** **由于$h$取决于$\Delta T$，冷却不是指数型的：**
$$
\rho c _ { p } { \frac { V } { 2 A } } { \frac { \mathrm { d } \theta } { \mathrm { d } t } } = - h _ { 0 } \left( { \frac { \theta } { 1 0 0 } } \right) ^ { 1 / 4 } \theta \qquad \Longrightarrow \qquad { \frac { \mathrm { d } \theta } { \mathrm { d } t } } = - { \frac { h _ { 0 } } { \rho c _ { p } L _ { \text{th } } \, 1 0 0 ^ { 1 / 4 } } } \theta ^ { 5 / 4 }
$$
**其中$L _ { \text{th } } = V / 2 A = 0 . 0 0 2 5 \ \mathrm { m }$（两个面都在散热），$\theta = T - T _ { \infty }$。对$ \theta ^ { - 5 / 4 } \, \mathrm { d } \theta = - \mathrm { d } t / ( \rho c _ { p } L _ { \text{th } } 1 0 0 ^ { 1 / 4 } / h _ { 0 } ) $积分，**
$$
t = { \frac { 4 \rho c _ { p } L _ { \text{th } } \, 1 0 0 ^ { 1 / 4 } } { h _ { 0 } } } \left( \theta _ { 1 } ^ { - 1 / 4 } - \theta _ { 0 } ^ { - 1 / 4 } \right) = { \frac { 4 \times 7 8 0 0 \times 4 9 0 \times 0 . 0 0 2 5 \times 3 . 1 6 2 } { 6 } } \left( 8 0 ^ { - 1 / 4 } - 2 8 0 ^ { - 1 / 4 } \right)
$$
$$
= 2 0 \, 1 4 0 \times ( 0 . 3 3 4 4 - 0 . 2 4 4 5 ) = \mathbf { 1 8 1 0 \ s } \approx \mathbf { 3 0 \ m i n }
$$
**要紧的比较是与指数规律相比。** **常数$h = 6$给出$t = \tau \ln ( 2 8 0 / 8 0 )$，其中$\tau = \rho c _ { p } L _ { \text{th } } / h = 1 5 9 0 \ \mathrm { s }$，即$1 9 9 0 \ \mathrm { s }$——只差$1 1 \ \%$，因为在整个过程中$h$只变化了$3 7 \ \%$。** **差别存在于尾部：从$1 0 0$继续冷却到$4 0 \ \ {} ^ { \circ } \mathrm { C }$需要$2 0 \, 1 4 0 \times ( 2 0 ^ { - 1 / 4 } - 8 0 ^ { - 1 / 4 } ) = 2 7 9 0 \ \mathrm { s }$，是从$3 0 0$到$1 0 0 \ \ {} ^ { \circ } \mathrm { C }$全程时间的一倍半，而温降还不到后者的三分之一。** **一个按$\theta ^ { 5 / 4 }$散热的物体，前两百度降得很快，然后就开始爬行。** **$\varepsilon = 0 . 8$的热辐射在开始时将携带$q _ { r } = 0 . 8 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 5 7 3 ^ { 4 } - 2 9 3 ^ { 4 } ) = 4 5 6 0 \ \mathrm { W / m ^ { 2 } }$，而对流为$6 \times ( 2 8 0 / 1 0 0 ) ^ { 1 / 4 } \times 2 8 0 = 2 1 7 0$：在这样的温度下，热辐射是主要机理，对流只是修正；把两者一起数值积分，得到的冷却时间约为$1 2$分钟，而不是三十分钟。**
:::
:::

::: quiz 静止与运动 {#quiz-still}
空气中的一块竖直平板靠自然对流冷却。把它换成一块几何相似、高度为原来四倍的平板，温差不变。平均表面传热系数会怎样？
- [ ] 不变：$h$是流体组合的性质，而不是零件的性质
- [x] 下降约$4 ^ { 1 / 4 } = 1 . 4$倍，单位面积的传热量也下降同样的倍数
- [ ] 下降一半，就像强制对流层流那样
- [ ] 上升，因为更高的平板有更强的羽流

::: solution
**它按$L ^ { - 1 / 4 }$下降，高度为四倍时下降$1 . 4$倍。**$\mathrm { N u } = 0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 } \propto L ^ { 3 / 4 }$，而$h = \mathrm { N u } \, k / L \propto L ^ { - 1 / 4 }$：**边界层沿平板向上增厚，平均表面传热系数由它在顶部的厚度决定，因此更高的平板有一层更厚、更绝热的边界层。** **选项(c)是强制对流的答案（$L ^ { - 1 / 2 }$），也是陷阱：在强制对流中速度是固定的，边界层增厚是唯一的效应；而在这里，流动本身随高度增强，抵消了指数的一半。** **正是这种抵消，使得自然对流表面传热系数常被当作常数引用，使得一面$1 0 \ \mathrm { m }$高的热墙（湍流，$h$与高度无关）每平方米的冷却并不比$1 \ \mathrm { m }$高的差，也使得高大储罐的总散热量几乎与其面积成正比。**
:::
:::

::: quiz 温暖的顶棚 {#quiz-ceiling}
一个水平放置、扁平、宽$4 0 0 \ \mathrm { m m }$的电子机箱，无论是热面朝上装在地板上，还是热面朝下吊在顶棚上，都散出同样的$2 0 \ \mathrm { W }$。在静止空气中，热面的温升：
- [ ] 两种情形相同，因为面积和功率都相同
- [x] 朝下时约大一倍，因为热表面在下方时层是稳定的
- [ ] 朝上时约大一倍，因为热空气要走更远才能到达热面
- [ ] 不知道表面发射率就无法预测

::: solution
**朝下时温升约大一倍。** **热面朝上：轻流体位于重流体之上，层不稳定，羽流离开表面，$C = 0 . 5 4$。热面朝下：轻流体被困在重流体之下，层稳定，$C = 0 . 2 7$——表面传热系数减半，因此在固定的$Q$和固定的面积下，$\Delta T$大约加倍**（比加倍略少，因为$\Delta T \propto h ^ { - 4 / 5 }$，也因为与朝向无关的热辐射承担了一部分热量）。**选项(d)是差一点就对的那个：发射率对总量影响很大，但它不改变对流的比值，而问题问的是两种安装方式之间由对流造成的差别。** **这条设计规则值得直白地说出来：如果一个机箱有一个热面而朝向又别无选择，就把肋片装在朝上的那个面上——或者，如果它必须吊在顶棚上，就把肋片装在侧面，让竖直平板来干活。**
:::
:::

## 后续内容

- **[[heat-transfer/boiling-condensation|沸腾与凝结]]**是同样的浮升力物理，只是由相变提供密度差，并且是自下加热的间隙中胞格图案在气泡尺度上的对应物。
- **[[heat-transfer/heat-exchangers|换热器]]**在自然通风冷却塔的空气侧和热虹吸再沸器的壳侧需要本课的内容，那里的“泵”是一段正在汽化的液柱。
- **[[heat-transfer/radiation|热辐射]]**在这里不是可有可无的：在本课的每一个温差下，热辐射都占热量的三分之一到一半，两者必须相加之后才能引用其中任何一个。
- **[[heat-transfer/fins|肋片]]**提供了肋效率和间距权衡，把本课的$h$变成一个真实的散热器；最优间距$S _ { \text{opt} } \approx 2 . 7 \, L \, \mathrm { R a } _ { L } ^ { - 1 / 4 }$是这两课的交汇点。
- **[[heat-transfer/transient-conduction|瞬态导热]]**在每一个$h$取决于待求温度的冷却问题中与本课相遇，这就是为什么[[#ex-nat-cool|悬挂钢板]]的冷却曲线不是指数型的。
- **[[fluid-mechanics/boundary-layers-drag|边界层]]**是$\mathrm { G r } / \mathrm { R e } ^ { 2 }$判据的来源，也是使逆流如此危险的混合对流流动反向得到恰当描述的地方。

::: history 浮升力、胞格与一个关联式的诞生
**1900——贝纳德（Henri Bénard）的胞格。**在《液层中的胞状涡旋》（“Les tourbillons cellulaires dans une nappe liquide”，*Revue générale des sciences pures et appliquées* **11**，1900）及其1901年的巴黎博士论文中，贝纳德表明，自下加热的薄液层会分裂成规则的蜂窝状对流胞格。**后来的工作（Block 1956，Pearson 1958）表明，在贝纳德那种带自由表面的薄层中，表面张力梯度才是主要的驱动因素；外观相同的浮升力驱动胞格出现在较深的液层中。**
**1916——瑞利勋爵（Lord Rayleigh）的稳定性理论。**《论较高温度在下侧时水平流体层中的对流》（*On convection currents in a horizontal layer of fluid, when the higher temperature is on the under side*），*Philosophical Magazine* **32**，529–546，用今天称为瑞利数的组合提出了这一稳定性问题。**瑞利处理的是理想化的自由边界；两个刚性壁面的临界值$1 7 0 8$——即本课水平层关联式中的阈值——来自杰弗里斯（Jeffreys）等人后来的分析。**
**1930——竖直平板的测量与求解。**施密特（E. Schmidt）和贝克曼（W. Beckmann）测量了受热竖直平板旁的温度和速度分布，而与他们一同发表的波尔豪森（E. Pohlhausen）层流边界层方程相似解，给出了$0 . 5 9$关联式所概括的$\mathrm { Nu } \propto \mathrm { Ra } ^ { 1 / 4 }$规律。
**1942——埃伦巴斯（W. Elenbaas），《平行平板的自然对流散热》（*Heat dissipation of parallel plates by free convection*），*Physica* 9，1–23。**对等温竖直平板阵列的测量和关联式——此后每一次自然对流散热器计算的出发点。
**1975——丘吉尔（S. W. Churchill）与朱（H. H. S. Chu）**，《竖直平板层流与湍流自然对流的关联方程》（*Correlating equations for laminar and turbulent free convection from a vertical plate*）及《……水平圆柱……》（*… from a horizontal cylinder*），*International Journal of Heat and Mass Transfer* **18**，1323–1329 及 1049–1053。**跨越层流与湍流区段、适用于所有普朗特数的单一表达式，至今仍是教科书的默认选择。**
**1984——巴尔-科恩（A. Bar-Cohen）与罗塞诺（W. M. Rohsenow），《自然对流冷却的竖直平行平板的热最优间距》（*Thermally optimum spacing of vertical, natural convection cooled, parallel plates*），*Journal of Heat Transfer* 106，116–123。** **本课所用的复合通道关联式和最优间距，是通过使固定体积而非单位表面的散热量最大而得到的——这就是无源散热型材具有现在这种肋片间隙的原因。**
:::

::: summary
- **浮升力是一种在流体均匀时就会消失的体积力**：$f _ { b } = \rho \beta g \Delta T$，气体取$\beta = 1 / T _ { f }$。**速度不是输入；它由平衡$u \sim ( g \beta \Delta T L ) ^ { 1 / 2 }$得出，在房间中为每秒几厘米，沿热壁面向上为每秒半米。**
- **$\mathrm { R a } _ { L } = g \beta \Delta T L ^ { 3 } / ( \nu \alpha )$是唯一要紧的数**，$\mathrm { R a } _ { L } = 1 0 ^ { 9 }$是竖直表面上层流的终点。**在空气中，$1 \ \mathrm { m }$高的墙在约$1 1 \ \mathrm { K }$时转捩，而$1 0 0 \ \mathrm { m m }$的电路板永远不会：建筑物是湍流，电路板不是。**
- **竖直平板**：层流$\overline { { \mathrm { N u } } } = 0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 }$，湍流$0 . 1 0 \, \mathrm { R a } ^ { 1 / 3 }$，跨越转捩用丘吉尔-朱。**$h \propto \Delta T ^ { 1 / 4 } L ^ { - 1 / 4 }$，因此热流密度按$\Delta T ^ { 5 / 4 }$变化，无源部件的“热阻”是一条曲线，而不是一个数。**
- **朝向不是细节。** **热面朝上$C = 0 . 5 4$，热面朝下$C = 0 . 2 7$；倾斜平板把$\cos \gamma$（从竖直方向量起）放在$\mathrm { R a }$里面；水平平板用$L _ { c } = A _ { s } / P _ { s }$；圆柱用直径，并在丘吉尔-朱中用$0 . 6 0$和$0 . 5 5 9$。** **这一部分里藏着两倍之差，而把它弄对不花任何代价。**
- **有限空间以间隙为长度。**自下加热的水平层在$\mathrm { R a } _ { S } = 1 7 0 8$之前保持静止（其上用霍兰兹关联式）；竖直狭缝在$\mathrm { R a } _ { S } \sim 1 0 ^ { 3 }$–$1 0 ^ { 4 }$之前是导热，之后遵循$\mathrm { N u } _ { S } \propto \mathrm { R a } _ { S } ^ { 1 / 4 } ( H / S ) ^ { - 0 . 3 }$。**双层中空玻璃的间隙是一个导热层，跨越它的热辐射与导热一样大。**
- **肋片间距：$S _ { \text{opt} } = 2 . 7 1 4 \, L \, \mathrm { R a } _ { L } ^ { - 1 / 4 }$（巴尔-科恩与罗塞诺），在大多数实际情况下，对空气为$6$到$1 2 \ \mathrm { m m }$。** **最优值在上方平坦、在下方陡峭——窄通道会扼流——而真正的限制是灰尘和挤压模具。**
- **混合对流由$\mathrm { G r } / \mathrm { R e } ^ { 2 }$决定，而不是由直觉决定。** **低于$0 . 1$忽略浮升力，高于$1 0$忽略风机；介于两者之间时按$\mathrm { N u } ^ { 3 } = \mathrm { N u } _ { f } ^ { 3 } \pm \mathrm { N u } _ { n } ^ { 3 }$组合，并把逆流当作一种危险而不是一个数。**
- **在本课的每一个温差下，热辐射都占热量的三分之一到一半。** **引用一个自然对流表面传热系数而不说明你对热辐射做了什么处理，你就只引用了半个答案。**
:::

## 延伸阅读

- **Incropera、DeWitt、Bergman 和 Lavine，《传热和传质基本原理》（*Fundamentals of Heat and Mass Transfer*），第9章**——平板、圆柱、球、倾斜表面、通道和有限空间的关联式表格，并诚实地给出了它们的适用范围和不确定度。
- **S. W. Churchill 和 H. H. S. Chu，*Int. J. Heat Mass Transfer* 18 (1975)，1323–1329**——竖直平板关联式，附有对常热流密度平板的讨论以及拟合所用的数据。
- **A. Bar-Cohen 和 W. M. Rohsenow，*J. Heat Transfer* 106 (1984)，116–123**——复合通道关联式和最优间距的推导，是为必须选择模具的工程师而写的。
- **E. M. Sparrow 和 J. L. Gregg，《常表面热流密度竖直平板的层流自然对流》（*Laminar free convection from a vertical plate with uniform surface heat flux*），*Trans. ASME* 78 (1956)**——等热流密度情形，给出了决定受热电路板热点位置的$x ^ { 1 / 5 }$温升规律。
- **S. Ostrach，《有限空间中的自然对流》（*Natural convection in enclosures*），*J. Heat Transfer* 110 (1988)**——有限空间问题的综述，包括高宽比和倾角的影响。
- **A. Bejan，《对流传热》（*Convection Heat Transfer*），第4版（Wiley，2013）**——自然对流的量级分析、肋片的最优间距以及混合对流各区段；比其他参考书难，但仅凭其中的量级论证就值得一读。
