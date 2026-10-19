把地面图和$500\ \mathrm{hPa}$图上下叠放，两张会讲出不同的故事：地面低压位于长波槽之下但并不恰在其内，上方的风更强、方向略异，而差别不是噪声。它是**热成风**，水平温度梯度所要求的随高度的地转切变，是把两张图转化为大气即将做的一切的诊断——空气在哪里上升、锋在哪里变锐、急流明天会移到哪里——的单一关系。平衡流是一门读取近地转大气那点非地转残差的学问，因为平衡承载风、不平衡承载天气。

## 热成风

::: proposition 热成风关系 {#der-thermal-wind}
对地转关系关于$z$求导，用理想气体定律把$\rho^{-1}\partial_x p = R_d\,\partial_x T$在平均温度$\bar T$的层内近似写出，并交换求导次序：
$$
\frac{\partial u_g}{\partial z} = -\frac{g}{f\,\bar T}\frac{\partial \bar T}{\partial y}, \qquad
\frac{\partial v_g}{\partial z} = \frac{g}{f\,\bar T}\frac{\partial \bar T}{\partial x}.
$$
矢量形式，$\mathbf{V}_T$为相隔$\Delta z$两层地转风之差，
$$
\mathbf{V}_T = \frac{g\,\Delta z}{f\,\bar T}\,\mathbf{k}\times\nabla_h\bar T ,
$$
即**热成风**：地转风随高度的变化正比于平均水平温度梯度、北半球指向暖空气在左。该关系在静力和地转近似内是精确的——它不是一个新平衡而是一个**相容性条件**：有水平温度梯度的大气不可能有与高度无关的地转风。实用内容是双向读取：风的垂直切变度量厚度梯度，而随高度顺转（顺时针转）的风标记暖平流、逆转标记冷平流。
:::

::: example 急流就是一股热成风 {#ex-jet}
极锋急流两侧，地面到$200\ \mathrm{hPa}$之间的平均温度梯度为向赤道方向$2\ \mathrm{K}$每$100\ \mathrm{km}$、$\bar T = 255\ \mathrm{K}$、$45\ \mathrm{^\circ N}$。估计地转风的垂直切变，若地面风为$10\ \mathrm{m\,s^{-1}}$，再求$200\ \mathrm{hPa}$的急流风速。
::: solution
$$
\frac{\partial V_g}{\partial z} = \frac{g}{f\bar T}\left|\nabla_h\bar T\right| = \frac{9.81}{1.03\times10^{-4}\times255}\times2\times10^{-5} = 7.5\times10^{-3}\ \mathrm{s^{-1}},
$$
即每公里$7.5\ \mathrm{m\,s^{-1}}$。对流层的$10\ \mathrm{km}$上热成风约$75\ \mathrm{m\,s^{-1}}$，地面$10\ \mathrm{m\,s^{-1}}$，高空急流核心约$60$–$80\ \mathrm{m\,s^{-1}}$——观测的量级。方向由叉积得出：冷空气在北，热成风**从西边**吹，这就是中纬度急流是**西风**的原因，也是西风带为什么入秋随赤道-极地温度反差变陡而增强、开春随其松弛而减弱。同样的算术倒着跑就是探空员的常识检验：实测每公里$10\ \mathrm{m\,s^{-1}}$的切变要求断面温度反差近$3\ \mathrm{K}$每$100\ \mathrm{km}$，若温度计不认账，两台仪器有一台坏了。
:::
:::

::: widget plot
f: 7.46*x; 10+7.46*x
x: 0, 10
y: 0, 85
labels: \text{shear-induced speed}\ (\text{m/s}); V_g(z)\ (\text{m/s})
caption: $45\ \mathrm{^\circ N}$、有$2\ \mathrm{K}$每$100\ \mathrm{km}$温度反差的层中地转风速随高度的变化：切变为每公里高度$7.46\ \mathrm{m\,s^{-1}}$（第一条从零起，第二条地面风$10\ \mathrm{m\,s^{-1}}$）。温度反差减半、斜率减半——急流季节摆动的机制——并注意该关系对任一高度的风速大小只字不提，只提其**变化**：地转固定的是切变，不是风速。
:::

## 非地转与随之而来的环流

::: definition 非地转风与次级环流 {#def-ageostrophic}
真实风是其平衡与不平衡部分之和，$\mathbf{v} = \mathbf{v}_g + \mathbf{v}_a$，小Rossby数下非地转风是地转风的$\mathrm{Ro}$分之一——对$20$–$40$只有几$\mathrm{m\,s^{-1}}$。这点小残差与其天气重要性完全不成比例：$\mathbf{v}_a$是越过等压线的非地转流，产生天气尺度的垂直运动，驱动锋和急流的直接环流。它的诊断由两项支配。地转风**沿其方向加速或减速**之处——急流的入口或出口区——平衡旧速度的科里奥利力不再平衡新速度，非地转流在风加速处越过等压线朝低压、在风减速处背低压，与气压梯度闭合一个水平环流。暖或冷空气被**平流**之处，热成风关系要求$\mathbf{v}_g$随高度变化以匹配变化的温度场，而完成这一变化的非地转流指向穿过等温线——地转风只在随高度变化处才**穿过**等温线吹。$\mathbf{v}_a$的辐散辐合随后以厘米每秒的速度强迫垂直运动，而那些厘米每秒对一天积分，就抬升了云顶、设定了降水。
:::

::: example 急流段环流与几厘米的代价 {#ex-jetstreak}
急流入口区左前方象限，$250\ \mathrm{hPa}$的非地转辐合从一个下界在$10\ \mathrm{km}$之下的气柱移出质量，其辐散型向下线性递减到地面为零。若高层辐合为$-1\times10^{-5}\ \mathrm{s^{-1}}$（对流层顶附近$\partial w/\partial z \approx 10^{-5}\ \mathrm{s^{-1}}$），估计$500\ \mathrm{hPa}$的垂直速度；若上升空气一半凝结，再求其对应的降水。
::: solution
把$\partial w/\partial z$从对流层顶$w \approx 0$向下积分到$500\ \mathrm{hPa}$的$5\ \mathrm{km}$，得$w \approx 10^{-5}\times5\times10^{3} = 5\times10^{-2}\ \mathrm{m\,s^{-1}} = 5\ \mathrm{cm\,s^{-1}}$。一天之内这抬升$4\times10^{5}\ \mathrm{m}$厚的气层——整层载云对流层的好几倍。中层比湿$q \approx 5\ \mathrm{g\,kg^{-1}}$、密度$0.6\ \mathrm{kg\,m^{-3}}$，向上水通量$w\rho q \approx 0.05\times0.6\times0.005 = 1.5\times10^{-4}\ \mathrm{kg\,m^{-2}\,s^{-1}}$，一半凝结得$6\times10^{-5}\ \mathrm{kg\,m^{-2}\,s^{-1}} = $每天$5\ \mathrm{mm}$：来自一阵弱得感觉不到的非地转风的稳定中雨。这就是"平衡风承载空气、不平衡风承载雨"这句口号的定量内容。
:::
:::

## 地转调整

::: proposition 地转调整 {#prop-adjustment}
强加一个不平衡的质量分布——把一块冷空气扔进平衡大气——系统不能简单落入新的地转状态，因为质量和动量必须共同守恒。线性化的旋转方程显示初始不平衡会分裂：一部分能量以频率$\ge f$的**惯性重力波**辐射掉，其余松弛到一个新的平衡态，其沿锋流与重新分布的质量保持地转平衡。调整以**浮力参数**$N H / f L$（$N$为Brunt–Väisälä频率、$H$为深度、$L$为水平尺度）设定的速率进行：大水平尺度和深层调整快、主要靠质量散开；小尺度调整慢、主要靠波辐射。调整时标约$1/f \approx 45\ \mathrm{^\circ N}$的$2.7\ \mathrm{h}$——大气被观测为接近平衡的原因：不平衡不是被摩擦阻尼，而是以重力波**辐射掉**，天气图看起来平衡是因为不平衡是瞬态而非规则。同一个$1/f$的钟设定预报模型自旋平衡所需的时间、锋后非地转爆发的寿命，以及夜间边界层振荡的节奏。
:::

::: example 有多少不平衡以波逃逸 {#ex-adjustment}
一次模型初始化把$1\ \mathrm{K}$的温度异常（一块冷空气）放在$45\ \mathrm{^\circ N}$、深$H = 2\ \mathrm{km}$、水平$L = 50\ \mathrm{km}$、$N = 10^{-2}\ \mathrm{s^{-1}}$的层中。计算变形Rossby半径$L_R = NH/f$，并判断质量异常主要靠散开成地转流调整还是靠辐射波调整。
::: solution
$$
L_R = \frac{NH}{f} = \frac{10^{-2}\times2\times10^{3}}{1.03\times10^{-4}} \approx 194\ \mathrm{km}.
$$
扰动尺度$L = 50\ \mathrm{km}$**小于**$L_R$，所以旋转在这么短的距离上很弱：这块冷找到不了一个同时守恒其质量和动量的地转状态，大部分能量以惯性重力波离开，而残余流被束缚在异常自身的边缘。$L \gg L_R$时相反——异常散开到其整个宽度都地转平衡为止。Rossby半径因此是大气的晶粒尺寸：对流深度下小于约$200\ \mathrm{km}$的特征天然不平衡，这是风暴的无过滤、非静力动力学与天气图平衡之舞性质不同、以及资料同化必须过滤小尺度增量而不能信任它们的深层原因之一。
:::
:::

## 锋生：平衡如何锐化一个锋

::: definition 锋生与变形力 {#def-frontogenesis}
**锋**是水平温度梯度被集中的地带，其强度以随风的梯度变化率度量。把风作用到$\partial T/\partial y$上并整理得锋生函数
$$
\frac{\mathrm{D}}{\mathrm{D}t}\frac{\partial T}{\partial y} = -\mathbf{v}\cdot\nabla_h\frac{\partial T}{\partial y}
- \underbrace{\left(\frac{\partial u}{\partial y}\frac{\partial T}{\partial x} + \frac{\partial v}{\partial y}\frac{\partial T}{\partial y}\right)}_{\text{变形：锋生}}
- \frac{\partial w}{\partial y}\frac{\partial T}{\partial z} + K\frac{\partial^{2}}{\partial y^{2}}\frac{\partial T}{\partial y}.
$$
第一项只是平流梯度；第三项（横向非地转环流作用于强静力稳定度）和第四项（扩散）摧毁梯度；但**变形项**——流的拉伸剪切部分——集中梯度，像叠了又叠的餐巾：$10^{-5}\ \mathrm{s^{-1}}$的沿锋变形作用于锋区，$28$小时让其宽度缩小$e$倍。锋生因此是一场变锐的变形与松弛它的间接环流之间的竞争，而锋观测到的$\sim 50\ \mathrm{km}$宽度就是两者的平衡。因为热成风把沿锋流与跨锋梯度绑定，锐化梯度就会启动急流：锋和急流不是图上的邻居，而是互为因果。
:::

::: example 变形锐化一个锋 {#ex-frontogen}
一个锋前地带$600\ \mathrm{km}$宽、温度变化$6\ \mathrm{K}$，被沿锋变形$D = 1\times10^{-5}\ \mathrm{s^{-1}}$拉伸，宽度指数缩小而总反差守恒。求$e$折叠时间、24小时后的宽度和梯度，以及锐化后的地带在地面到$3\ \mathrm{km}$之间支撑的热成风（$\bar T = 273\ \mathrm{K}$、$45\ \mathrm{^\circ N}$）。
::: solution
宽度按$e^{-t/\tau}$缩小、$\tau = 1/D = 10^{5}\ \mathrm{s} = 28\ \mathrm{h}$，所以$24\ \mathrm{h}$后宽度为$600\,e^{-24/28} = 255\ \mathrm{km}$、梯度从每$100\ \mathrm{km}$ $1.0$长到$2.4\ \mathrm{K}$。地面到$3\ \mathrm{km}$的热成风为
$$
V_T = \frac{g\,\Delta z}{f\bar T}\left|\nabla_h\bar T\right| = \frac{9.81\times3000}{1.03\times10^{-4}\times273}\times2.4\times10^{-5} = 25\ \mathrm{m\,s^{-1}} .
$$
一天的变形建起了低空急流的核心、把地面锋陡化到沿锋强迫强上升的程度——这条链条把高空图上的变形场与其后的飑线连在一起。
:::
:::

::: warning 热成风不是风，非地转不等于不重要，厚度不是高度
这个主题惩罚五种混淆。**热成风是一个差而非一股流**：没有风速计测到它；它是一个地转风不同于另一个地转风的矢量，叫它"温度梯度的风"会招来暖空气"沿梯度流动"的胡话。**非地转不可忽略**：$\mathrm{Ro} = 0.1$时非地转风是风的十分之一但几乎是全部垂直运动、锋生和示踪物穿越急流——平衡风是天气的分母，不平衡风是分子。**厚度不是高度**：$1000$–$500\ \mathrm{hPa}$厚度是一层的属性，厚层意味着暖层而不是山；等压面图是伪装成图的厚度图。**随高度顺转不是随时间转向**：顺转的廓线（随高度顺时针）标记暖平流；一个高度上顺转的**时间序列**只有在垂直结构已知时才标记暖空气掠过站点——这个词的两种用法是不同的诊断。**还有锋不是教科书意义上两个气团之间锐边的边界**：它们是上述有限宽度、非地转环流、变形维持的过渡带，而"地图上的一条线"是一个倾斜的、触及急流的三维结构的地面痕迹。
:::

::: history
热成风关系出自**卑尔根学派**：**Vilhelm Bjerknes**在1904年立下数值预报的纲领，并与**T. Bergeron**、**J. Holmboe**在1919年前后建立起气旋的极锋理论，其中锋上温度反差之上风的垂直切变是整个生命史的机制。强高空西风的存在在1939–1944年由仪器化的高空飞行和航空气象部门汇编的跨太平洋风统计证明，**C.-G. Rossby**与芝加哥学派1941年的论文把急流定量地认定为极锋的热成风，其位置和季节迁移跟随温度反差。**J. G. Charney**1947年的准地转标度和**C.-G. Rossby**1939年的行星波理论，把本课的平衡流层级变成天气尺度系统的标准动力学。现代形式的锋生理论——变锐的变形与松弛它的间接环流之间的平衡——由**N. Pettersen**在1950年代发展、在1970–80年代锋区诊断研究和飞机试验中系统化，确立了数十公里的观测锋宽和嵌入其中的低空急流。
:::

这些平衡所依赖的方程在 [[atmospheric-dynamics/equations-of-motion]] 推导，把它们改写成的涡度语言在 [[atmospheric-dynamics/vorticity]]，把风越过等压线推回去的边界层摩擦在 [[atmospheric-dynamics/boundary-layer]]，生命史即放大版非地转环流的气旋在 [[meteorology/fronts-cyclones]]，急流在 [[atmospheric-dynamics/general-circulation]]，把不平衡辐射掉的浮力振荡在 [[meteorology/stability]]，作为灾害的锋在 [[natural-hazards/storms]]，而它们作用于其上的观测温度梯度在 [[meteorology/atmosphere-structure]]。

::: quiz
某站的地转风在最低3 km内随高度顺转。热成风告诉你气柱正在经历
- [ ] 冷平流，因为顺转意味着等温线逆转。
- [x] 暖平流，因为风随高度转向暖空气方向。
- [ ] 什么也没有——顺转对平流不置一词。
- [ ] 只有锋消。
::: solution
热成风暖空气在左，随高度顺时针转的风正在转向**会把暖空气平流进来的**方向：高处的地转风更强劲地从暖侧吹来，这正是暖平流。业务上"随高度顺转是暖平流、逆转是冷平流"是热成风关系的探空版本，而由平流的沿锋变化强迫的非地转环流正是抬升上方云顶的东西。
:::
:::

::: summary
- 热成风——地转风的切变——正比于平均水平温度梯度：$f\,\partial\mathbf{v}_g/\partial z = -g\,\mathbf{k}\times\nabla_h\bar T/\bar T$。
- 该关系是相容性条件而非新平衡：正压大气不可能有与高度无关的地转风。
- 中纬度西风急流是赤道-极地反差的热成风；每$100\ \mathrm{km}$ $2\ \mathrm{K}$支撑每公里约$7.5\ \mathrm{m\,s^{-1}}$的切变。
- 非地转风只有风的十分之一却承载全部垂直运动：急流段辐散强迫厘米每秒的上升，足以造每天毫米级的雨。
- $1/f$钟下的地转调整以惯性重力波辐射不平衡、留下平衡流——图看起来平衡的原因；Rossby半径$L_R = NH/f$分开平衡区与波主导区。
- 锋被变形锐化、被它强迫的非地转环流加宽；其平衡宽度和它支撑的急流由那个平衡设定。
:::

## 练习

::: exercise 一层的热成风 {level=1 check="19"}
$45\ \mathrm{^\circ N}$、$\bar T = 255\ \mathrm{K}$，求$1000$–$500\ \mathrm{hPa}$层（厚度$5.2\ \mathrm{km}$）、平均温度梯度每$100\ \mathrm{km}$ $1\ \mathrm{K}$的热成风（$\mathrm{m\,s^{-1}}$，取整）。
::: solution
$V_T = g\Delta z\,|\nabla\bar T|/(f\bar T) = 9.81\times5200\times10^{-5}/(1.03\times10^{-4}\times255) = 19\ \mathrm{m\,s^{-1}}$。每一百开尔文每公里十九米每秒的热成风，是读高空图该记住的换算因子。
:::
:::

::: exercise 方向 {level=1 check="westerly"}
$45\ \mathrm{^\circ N}$，冷空气在北、暖空气在南。热成风是东风还是西风？（以小写一个词作答。）
::: solution
**西风。**热成风沿暖空气在左吹，暖侧在南时热成风指向东——从西边来。这就是中纬度高空流是西风、而信风和极地东风带的地面东风被限制在浅摩擦层的原因。
:::
:::

::: exercise 由辐散求垂直运动 {level=1 check="5"}
$250\ \mathrm{hPa}$有$1\times10^{-5}\ \mathrm{s^{-1}}$的高空辐合，覆盖一个$10\ \mathrm{km}$深、辐散向地面线性减到零的气柱。求$500\ \mathrm{hPa}$的垂直速度（$\mathrm{cm\,s^{-1}}$）。
::: solution
顶部附近$\partial w/\partial z \approx 10^{-5}\ \mathrm{s^{-1}}$；对$250$到$500\ \mathrm{hPa}$之间的$5\ \mathrm{km}$积分得$w \approx 5\ \mathrm{cm\,s^{-1}}$。以这个速率上升的空气一天抬升好几层云深，产生小到中降水——高空图辐散场与雨量计之间的定量桥梁。
:::
:::

::: exercise 急流深度 {level=2 check="8"}
地面到$200\ \mathrm{hPa}$急流核心之间观测热成风为$60\ \mathrm{m\,s^{-1}}$，跨急流温度梯度每$100\ \mathrm{km}$ $2\ \mathrm{K}$、$\bar T = 255\ \mathrm{K}$、$45\ \mathrm{^\circ N}$，求切变层的有效深度（km，一位小数）。
::: solution
$\Delta z = V_T f\bar T/(g|\nabla\bar T|) = 60\times1.03\times10^{-4}\times255/(9.81\times2\times10^{-5}) = 8.1\ \mathrm{km}$。"有效深度"小于整层对流层，因为最强梯度坐在急流自己的核心里——热成风的自洽性，就是穿过急流的探空上升段在最紧的温度反差处恰好显示最大切变的原因。
:::
:::

::: exercise 调整时间 {level=2 check="2.7"}
求$45\ \mathrm{^\circ N}$的地转调整时间$1/f$（小时，一位小数）。
::: solution
$1/f = 1/1.03\times10^{-4} = 9.7\times10^{3}\ \mathrm{s} = 2.7\ \mathrm{h}$。快得让天气尺度大气在任何强迫变化后数小时内重新平衡，慢得让寿命短于$f^{-1}$的锋暴和对流爆发天然不平衡——同一个数既解释了分析图的平滑，也解释了风暴尺度观测的毛糙。
:::
:::

::: exercise Rossby半径 {level=2 check="194"}
以km计算$N = 10^{-2}\ \mathrm{s^{-1}}$、$H = 2\ \mathrm{km}$、$45\ \mathrm{^\circ N}$的变形Rossby半径$L_R = NH/f$（取整）。
::: solution
$L_R = 10^{-2}\times2\times10^{3}/1.03\times10^{-4} = 194\ \mathrm{km}$。比它窄的扰动波主导、会辐射；比它宽的调整到平衡。$H = 10\ \mathrm{km}$（整层对流层）时半径超过$900\ \mathrm{km}$——天气尺度系统从容坐在平衡区，整个准地转大厦就建在那个不等式上。
:::
:::

::: exercise 锋的锐化 {level=2 check="324"}
$500\ \mathrm{km}$宽、反差$5\ \mathrm{K}$的锋区被$1\times10^{-5}\ \mathrm{s^{-1}}$的变形压缩12小时，反差守恒。求最终宽度（km，取整）。
::: solution
宽度$= 500\,e^{-12\times3600\times10^{-5}} = 500\,e^{-0.432} = 324\ \mathrm{km}$。梯度在半天里按倒数因子$1/0.649 = 1.54$增长，锋能支撑的热成风随之增长——这场失控让成熟锋如此锐、其急流如此紧，探空施放每天验证着它：最紧的温度反差恰好出现在变形轴所在处。
:::
:::

::: exercise 推导热成风 {level=3 check="7.5"}
从气压坐标的地转和静力方程出发，推导$\partial v_g/\partial z = (g/f\bar T)\,\partial\bar T/\partial x$，并计算$|\partial\bar T/\partial x| = $每$100\ \mathrm{km}$ $2\ \mathrm{K}$、$\bar T = 255\ \mathrm{K}$、$45\ \mathrm{^\circ N}$的切变（$\mathrm{m\,s^{-1}\,km^{-1}}$，一位小数）。
::: solution
气压坐标中水平动量方程保持常密度形式，$f v_g = \partial\Phi/\partial x$、$\Phi$为位势，静力写作$\partial\Phi/\partial p = -1/\rho$。则
$$
f\frac{\partial v_g}{\partial p} = \frac{\partial}{\partial x}\frac{\partial\Phi}{\partial p} = -\frac{\partial}{\partial x}\frac{1}{\rho} = -\frac{R_d}{p}\frac{\partial T}{\partial x},
$$
在定压下用了理想气体定律。由静力把$\partial/\partial p = -(\rho g)^{-1}\partial/\partial z$换元、约去$\rho = p/R_dT$，得$\partial v_g/\partial z = (g/fT)\,\partial T/\partial x$，配套方程把$u_g$和$y$对调即得。数值上，
$$
\frac{\partial V_g}{\partial z} = \frac{9.81\times2\times10^{-5}}{1.03\times10^{-4}\times255} = 7.5\times10^{-3}\ \mathrm{s^{-1}} = 7.5\ \mathrm{m\,s^{-1}\ per\ km}.
$$
高空分析里最常用的单一数字，也是每次探空施放都是一次内部一致性检验的原因：实测切变必须匹配实测温度梯度，两者不合，两条仪器链有一条坏了。
:::
:::
