碘蒸气呈紫色，胡萝卜呈橙色，荧光笔在紫外灯下发光，激光笔在阶梯教室里投下一个红点。凡此种种都是电子跃迁：一个几电子伏特的光子把一个电子从一条分子轨道提升到另一条，或者受激分子把能量以光的形式交还出去。电子光谱比前两章的转动光谱和振动光谱丰富得多，因为一次电子跃迁会把核骨架一并拖进一条新的势能曲线。于是你记录到的谱带同时是*两条*势能曲线的指纹——分子从哪里出发、又被带到了哪里——它的形状、它的颜色以及它随后是否发光，全都由此决定。本课分四步建立这套理论：电子态的标记与选律、塑造每一条谱带的弗兰克-康登原理、让有机化学家能读懂紫外-可见光谱的发色团与经验规则，以及激发态的归宿——荧光、磷光，以及激光中的受激发射。关于跃迁偶极矩、布居与线宽的一般机制见[[spectroscopy/spectroscopy-principles]]；激发态衰减的动力学在[[kinetics/photochemistry]]中展开；这里我们专注于谱图本身能告诉你的信息。

## 双原子分子的电子态

原子由总轨道角动量与总自旋角动量构成的光谱项符号来标记其电子态，如[[quantum-chemistry/many-electron-atoms]]中那样。双原子分子失去了球对称性：只有绕核间轴的旋转不改变它，所以沿该轴的轨道角动量*分量*才守恒。这改变了标记方式，却没有改变逻辑。

::: definition 线性分子的光谱项符号 {#def-diatomic-term}
对于线性分子，令$\Lambda\hbar$为沿核间轴的总电子轨道角动量的大小（$\Lambda = \lvert\sum_i \lambda_i\rvert$，$\sigma$轨道的$\lambda = 0$，$\pi$轨道的$\lambda = \pm 1$），$S$为总自旋。**分子光谱项符号**为
$$
{}^{2S+1}\Lambda_{g/u}^{\pm}, \qquad \Lambda = 0, 1, 2, 3 \;\to\; \Sigma, \Pi, \Delta, \Phi ,
$$
其中$2S+1$是自旋多重度；下标$g$或$u$（仅对同核分子）给出电子波函数关于中心反演的宇称；上标$+$或$-$（仅对$\Sigma$态）给出它关于包含核间轴的平面反映的行为。$\Lambda > 0$的态是二重简并的（$\pm\Lambda$）。基态以X为前缀，同多重度的激发态依次以A、B、C……为前缀，不同多重度的态则以a、b、c……。
:::

满壳层总是${}^1\Sigma^+$（同核分子还带$g$），因为每个充满的$\pi$壳层对$\lambda = +1$与$-1$的贡献数目相等并把自旋两两配对。因此标记只取决于开壳层，而宇称遵循规则$g\times g = u\times u = g$、$g\times u = u$，与[[quantum-chemistry/molecular-symmetry]]中特征标的相乘完全一致。

::: example $\mathrm{O_2}$的低能态 {#ex-o2-terms}
二氧化二氧的价电子排布为$\ldots(1\pi_u)^4(1\pi_g)^2$。反键$1\pi_g$轨道对中的两个电子产生哪些光谱项？哪一个是基态？
::: solution
每个$\pi_g$电子的$\lambda = \pm 1$。按泡利原理允许的所有方式，把两个电子放入$\pi_{+1}$、$\pi_{-1}$两条轨道（六个微观状态）。若两个电子$\lambda$相同，则自旋必相反：$\Lambda = 2$，$S = 0$，给出${}^1\Delta_g$（两个微观状态，$\Lambda = \pm 2$）。若二者$\lambda$相反，则$\Lambda = 0$，余下的四个微观状态分成一个自旋三重态与一个单重态：空间反对称的组合与对称的三重自旋函数相配，并且可以证明它关于反映是奇的，即${}^3\Sigma_g^-$（三个微观状态）；空间对称的那一个是${}^1\Sigma_g^+$（一个）。计数：$2 + 3 + 1 = 6$，与要求相符。宇称处处为$g\times g = g$。洪特第一规则（多重度最大者最低）选中三重态：基态是$\mathrm{X}\,{}^3\Sigma_g^-$，这就是液态氧被磁铁吸进去的原因。两个单重态位于其上，能量为$T_\mathrm{e} = 7918\ \mathrm{cm^{-1}}$（$\mathrm{a}\,{}^1\Delta_g$，$0.98\ \mathrm{eV}$）与$13\,195\ \mathrm{cm^{-1}}$（$\mathrm{b}\,{}^1\Sigma_g^+$，$1.64\ \mathrm{eV}$）（胡贝尔（Huber）与赫茨伯格（Herzberg）的表）。"单线态氧"——光动力疗法与光氧化中的活性物种——就是$\mathrm{a}\,{}^1\Delta_g$态。
:::
:::

这些态中的哪些能通过吸收光而到达？跃迁速率正比于$\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2$，而偶极算符具有确定的对称性：它关于反演是奇的，只作用于空间坐标，且沿轴的分量关于包含轴的平面反映是对称的。

::: proposition 电偶极电子跃迁的选律 {#prop-elec-sel}
对于线性分子电子态之间的电偶极跃迁（轻原子，自旋-轨道耦合弱）：
$$
\Delta\Lambda = 0, \pm 1, \qquad \Delta S = 0, \qquad \Sigma^+ \leftrightarrow \Sigma^+,\ \Sigma^- \leftrightarrow \Sigma^- \ (\text{但不允许 } \Sigma^+ \leftrightarrow \Sigma^-), \qquad g \leftrightarrow u \ (\text{但不允许 } g \leftrightarrow g,\ u \leftrightarrow u).
$$
最后这条规则称为**拉波特（Laporte）规则**，对任何有对称中心的分子都成立。当假设不成立时，自旋规则与拉波特规则都会减弱：重原子通过自旋-轨道耦合混合自旋态，而破坏对称中心的振动则赋予$g \leftrightarrow g$跃迁强度（振动-电子耦合）。
:::

::: proof 各条选律的来源 {#proof-elec-sel}
写出$\boldsymbol\mu_\mathrm{fi} = \langle \psi_\mathrm{f} \lvert \hat{\boldsymbol\mu} \rvert \psi_\mathrm{i}\rangle$，其中$\hat{\boldsymbol\mu} = -e\sum_i \mathbf r_i + (\text{核项})$。(i) *自旋。*$\hat{\boldsymbol\mu}$不含自旋算符，所以积分分解为一个空间积分乘以自旋重叠$\langle S_\mathrm{f} M_{S,\mathrm f}\vert S_\mathrm{i} M_{S,\mathrm i}\rangle$；除非自旋态完全相同，后者为零：$\Delta S = 0$。(ii) *宇称。*在反演$\mathbf r \to -\mathbf r$下偶极变号。若$\psi_\mathrm i$与$\psi_\mathrm f$宇称相同，则被积函数$\psi_\mathrm f^*\hat{\boldsymbol\mu}\psi_\mathrm i$是奇的，在全空间积分为零；只有$g \leftrightarrow u$存活。(iii) *$\Lambda$。*轴向分量$\mu_z$与绕轴旋转对易，因而只连接$\Lambda$相同的态；垂直分量$\mu_x \pm \mathrm i\mu_y$携带一份轴向角动量（$\propto \mathrm e^{\pm\mathrm i\phi}$），使$\Lambda$改变$\pm1$；$\hat{\boldsymbol\mu}$中没有任何部分能使它改变二或以上。(iv) *反映。*$\mu_z$在包含轴的平面反映下不变，所以$\Sigma \leftrightarrow \Sigma$跃迁（因$\Delta\Lambda = 0$而使用$\mu_z$）要求两个态具有相同的反映对称性。
:::

这些规则解释了氧的两条著名吸收。$175$–$200\ \mathrm{nm}$的**舒曼-龙格（Schumann–Runge）谱带**是$\mathrm{B}\,{}^3\Sigma_u^- \leftarrow \mathrm{X}\,{}^3\Sigma_g^-$：自旋相同，$\Delta\Lambda = 0$，$-\leftrightarrow-$，$u\leftrightarrow g$——完全允许、非常强，正因如此，氧才使地球表面免于真空紫外。相形之下，$762\ \mathrm{nm}$的**大气A带**是$\mathrm{b}\,{}^1\Sigma_g^+ \leftarrow \mathrm{X}\,{}^3\Sigma_g^-$，一次就违反三条规则（$\Delta S \ne 0$，$+\leftrightarrow-$，$g\leftrightarrow g$）。它之所以能被观测到，只是因为光穿过大气的光程极长；它是一条磁偶极跃迁，比典型的允许跃迁弱约$10^{9}$倍，它使太阳光谱在深红端出现一个尖锐的凹口。

::: quiz 哪一条跃迁是电偶极允许的？
下列同核双原子分子的跃迁中，哪一条是完全允许的？
- [ ] ${}^1\Delta_g \leftarrow {}^3\Sigma_g^-$
- [ ] ${}^1\Sigma_g^+ \leftarrow {}^1\Sigma_g^+$
- [x] ${}^1\Pi_u \leftarrow {}^1\Sigma_g^+$
- [ ] ${}^1\Sigma_u^- \leftarrow {}^1\Sigma_g^+$
::: solution
${}^1\Pi_u \leftarrow {}^1\Sigma_g^+$保持$S = 0$，使$\Lambda$改变一，并改变宇称：允许（它属于$\mathrm{H_2}$的强谱带$\mathrm{C}\,{}^1\Pi_u \leftarrow \mathrm{X}\,{}^1\Sigma_g^+$的类型）。第一项改变自旋、$\Lambda$改变二且保持$g$；第二项是$g \leftrightarrow g$；最后一项是$\Sigma^- \leftrightarrow \Sigma^+$。
:::
:::

## 弗兰克-康登原理

电子跃迁所需的时间约为一个光振荡周期，量级为$10^{-15}\ \mathrm{s}$；一次键振动则需$10^{-14}$–$10^{-13}\ \mathrm{s}$。因此在跃迁期间核根本没有时间移动。在势能对核间距的图上，跃迁是一条*竖直*线，分子落在上曲线上它所占据的、在下曲线时的键长处。若上态的平衡键更长——通常如此，因为电子进入了成键较弱的轨道——分子就到达上曲线内侧的排斥壁，并被振动激发。这一图像的量子版本确定了每条振动谱带的强度。

::: proposition 弗兰克-康登原理 {#prop-franck-condon}
在玻恩-奥本海默近似下，若电子跃迁偶极矩$\boldsymbol\mu_\mathrm{el}$对核几何的依赖很弱（**康登近似**），则振动-电子谱带$v' \leftarrow v''$的强度为
$$
I(v' \leftarrow v'') \propto \lvert\boldsymbol\mu_\mathrm{el}\rvert^2 \, q_{v'v''}, \qquad q_{v'v''} = \left\lvert \int \chi_{v'}^*(R)\,\chi_{v''}(R)\,\mathrm dR \right\rvert^2 ,
$$ {#eq-fc}
其中$\chi_{v''}$与$\chi_{v'}$分别为下、上电子态的振动波函数。**弗兰克-康登因子**$q_{v'v''}$满足$\sum_{v'} q_{v'v''} = 1$：电子跃迁决定整个谱带系的总强度，振动重叠只是把它分配开来。
:::

::: proof 跃迁偶极矩的因子分解 {#proof-fc}
在玻恩-奥本海默近似下，振动-电子态是乘积$\Psi = \psi_\mathrm{el}(\mathbf r; R)\,\chi_v(R)$。偶极算符是电子部分与核部分之和，$\hat{\boldsymbol\mu} = \hat{\boldsymbol\mu}_\mathrm e + \hat{\boldsymbol\mu}_\mathrm N$。核部分不作用于电子，所以它的贡献含有$\int\psi_\mathrm{el}'^*\psi_\mathrm{el}''\,\mathrm d\mathbf r = 0$（同一电子哈密顿量在不同$R$下的本征函数彼此正交）。剩下的是
$$
\boldsymbol\mu_\mathrm{fi} = \int \chi_{v'}^*(R)\left[\int \psi_\mathrm{el}'^*\,\hat{\boldsymbol\mu}_\mathrm e\,\psi_\mathrm{el}''\,\mathrm d\mathbf r\right]\chi_{v''}(R)\,\mathrm dR = \int \chi_{v'}^*\,\boldsymbol\mu_\mathrm{el}(R)\,\chi_{v''}\,\mathrm dR .
$$
若在$\chi_{v''}$非零的$R$范围内$\boldsymbol\mu_\mathrm{el}(R)$变化很小，就把它用平均值取出积分号外：$\boldsymbol\mu_\mathrm{fi} \approx \boldsymbol\mu_\mathrm{el}\int\chi_{v'}^*\chi_{v''}\,\mathrm dR$。取平方即得[[#eq-fc]]。求和规则成立是因为诸$\chi_{v'}$（包括解离极限以上的连续态）构成完备集：$\sum_{v'}\lvert\langle\chi_{v'}\vert\chi_{v''}\rangle\rvert^2 = \langle\chi_{v''}\vert\chi_{v''}\rangle = 1$。
:::

重叠积分把竖直线的图像换成定量图像。若两条势能曲线形状相同、平衡距离相同，则$\chi_{v'}$与$\chi_{v''}$是相同的函数，由正交性得$q_{v'v''} = \delta_{v'v''}$，光谱就是一条强的$0$–$0$谱带。上曲线位移越远，$v'' = 0$的高斯与高激发上能级的重叠就越多，谱带便发展出长长的**振动序列（progression）**，其极大正对应垂直跃迁。对两条频率相同、位移为$\Delta R$的谐振曲线有闭合公式：从$v'' = 0$出发，
$$
q_{v'0} = \mathrm e^{-S}\,\frac{S^{v'}}{v'!}, \qquad S = \frac{\mu\omega(\Delta R)^2}{2\hbar} ,
$$ {#eq-huang-rhys}
这是以$S$为均值、以$v'$为变量的泊松分布，$S$即**黄昆-里斯（Huang–Rhys）因子**。刚性的芳环分子激发时键长几乎不变，$S \lesssim 1$，光谱以$0$–$0$谱带为主；键长显著伸长的分子$S \gg 1$，出现一个宽而带结构的鼓包。

::: widget plot
f: sum(exp(-s)*s^k/fact(k)*exp(-(x-k)^2/(2*w^2)), k, 0, 40)
x: -1, 12
y: 0, 1.05
sliders: s=1:0:6:0.1; w=0.15:0.05:1:0.05
labels: \text{自 } v''=0 \text{ 的吸收}
caption: 位移谐振曲线按[[#eq-huang-rhys]]预言的振动-电子谱带：横轴为高于$0$–$0$谱带的光子能量，以$\hbar\omega$为单位；每条$v' \leftarrow 0$谱带画成宽为`w`（同一单位）、高为$q_{v'0}$的高斯线。当`s` $= 0$时只出现$0$–$0$谱带；随位移增大，强度移向更高的$v'$，极大移到$v' \approx S$附近。把`w`调宽（如同溶剂加宽那样），振动序列便并入溶液中染料典型的光滑、不对称谱带——振动结构仍然存在，只是隐藏在包络之下。
:::

::: example 碘蒸气的颜色 {#ex-iodine-vertical}
对$^{127}\mathrm{I_2}$（常数取自胡贝尔与赫茨伯格）：基态$\mathrm X\,{}^1\Sigma_g^+$有$\omega_\mathrm e'' = 214.50\ \mathrm{cm^{-1}}$、$\omega_\mathrm ex_\mathrm e'' = 0.614\ \mathrm{cm^{-1}}$、$R_\mathrm e'' = 2.666\ \mathrm{\AA}$、$D_0'' = 12\,440\ \mathrm{cm^{-1}}$；激发态$\mathrm B\,{}^3\Pi_{0u}^+$有$T_\mathrm e = 15\,769\ \mathrm{cm^{-1}}$、$\omega_\mathrm e' = 125.69\ \mathrm{cm^{-1}}$、$\omega_\mathrm ex_\mathrm e' = 0.764\ \mathrm{cm^{-1}}$、$R_\mathrm e' = 3.024\ \mathrm{\AA}$，并解离为一个基态原子与一个自旋-轨道激发原子$\mathrm I({}^2P_{1/2})$，后者比$\mathrm I({}^2P_{3/2})$高$7603\ \mathrm{cm^{-1}}$。用莫尔斯曲线描述B态，求从$v'' = 0$的中心出发的垂直跃迁的波长。
::: solution
先在基态能量标度上确定B态的解离极限。基态势阱深度为$D_\mathrm e'' = D_0'' + G''(0)$，其中$G''(0) = \tfrac12\omega_\mathrm e'' - \tfrac14\omega_\mathrm ex_\mathrm e'' = 107.1\ \mathrm{cm^{-1}}$，故$D_\mathrm e'' = 12\,547\ \mathrm{cm^{-1}}$。B态的渐近线高$7603\ \mathrm{cm^{-1}}$，即位于X极小以上$20\,150\ \mathrm{cm^{-1}}$处，所以其势阱深度为
$$
D_\mathrm e' = 20\,150 - 15\,769 = 4381\ \mathrm{cm^{-1}} .
$$
莫尔斯程参数由$a = \omega\sqrt{\mu/2D_\mathrm e}$得出（取$\mu = 63.45\ \mathrm u$，$\omega = 2\pi c\tilde\omega_\mathrm e$，并把$D_\mathrm e$换算为焦耳）：$a' = 1.842\ \mathrm{\AA^{-1}}$。从$R = 2.666\ \mathrm{\AA}$引出的竖直线在B态极小内侧$0.358\ \mathrm{\AA}$处击中B曲线：
$$
V_\mathrm B(2.666\ \mathrm{\AA}) = T_\mathrm e + D_\mathrm e'\left(1 - \mathrm e^{-a'(R - R_\mathrm e')}\right)^2 = 15\,769 + 4381\left(1 - \mathrm e^{1.842\times0.358}\right)^2 = 19\,590\ \mathrm{cm^{-1}} .
$$
在$v'' = 0$波函数的中心处，基态势能恰在极小，所以垂直光子的波数为$\tilde\nu \approx 19\,590\ \mathrm{cm^{-1}}$，$\lambda = 10^7/19\,590 = 510\ \mathrm{nm}$。碘蒸气吸收$500$–$520\ \mathrm{nm}$附近的绿光而透过红光与蓝光：它看起来是紫色的。相形之下，$0$–$0$谱带位于$T_\mathrm e + G'(0) - G''(0) = 15\,725\ \mathrm{cm^{-1}}$（$636\ \mathrm{nm}$）处，几乎看不见，因为$v'' = 0$的高斯与中心相距$0.36\ \mathrm{\AA}$的$v' = 0$能级几乎没有重叠。求解$T_\mathrm e + G'(v') = 19\,590\ \mathrm{cm^{-1}}$可知垂直跃迁到达$v' \approx 40$。（严格地说，$\mathrm B \leftarrow \mathrm X$是三重态-单重态跃迁；它之所以强，只是因为碘巨大的自旋-轨道耦合把自旋态混合得如此彻底，以致$S$不再是好量子数——即[[#prop-elec-sel]]中提到的重原子对自旋选律的放松。）
:::
:::

::: widget plot
f: 12547*(1-exp(-1.8576*(x-2.666)))^2; 15769+4381*(1-exp(-1.8421*(x-3.024)))^2
x: 2.3, 4.6
y: 0, 24000
vlines: 2.666
hlines: 20150
labels: \mathrm{X}\,{}^1\Sigma_g^+; \mathrm{B}\,{}^3\Pi_{0u}^+
caption: 用[[#ex-iodine-vertical]]中的常数作出的$\mathrm{I_2}$的X态与B态的莫尔斯曲线，能量以X极小以上的$\mathrm{cm^{-1}}$计，横轴为$R$（单位$\mathrm{\AA}$）。$R_\mathrm e'' = 2.666\ \mathrm{\AA}$处的竖直线就是弗兰克-康登跃迁；它在约$19\,600\ \mathrm{cm^{-1}}$处、B曲线陡峭的内侧壁上与B曲线相交，略低于B态的解离极限（水平线，$20\,150\ \mathrm{cm^{-1}}$）。由于壁很陡，$v'' = 0$中键长的展宽（约$\pm 0.05\ \mathrm{\AA}$）映射为约$3000\ \mathrm{cm^{-1}}$的光子能量展宽：吸收谱带的宽度就是上曲线的斜率乘以基态波函数的宽度（*反射原理*）。把鼠标悬停在图上即可读出能量；高于$20\,150\ \mathrm{cm^{-1}}$的光子落在连续区并把分子解离。
:::

::: warning 垂直跃迁不等于0–0跃迁 {#warn-vertical}
有三个能量最容易混淆。**绝热的**（0–0）跃迁能量连接两个态的最低振动能级，是热化学需要的量。**垂直**能量位于谱带极大处，是对光谱看一眼所得、也是多数量子化学程序默认计算的值，只要两态几何不同它就超过0–0能量——对$\mathrm{I_2}$几乎差$4000\ \mathrm{cm^{-1}}$。而$T_\mathrm e$连接两条曲线的极小，永远不会被直接观测到。另外不要把[[#eq-huang-rhys]]用于$\mathrm{I_2}$：它假定频率相等且为谐振，而B态的刚度只有X态的一半且强非谐；代入B态频率得$S \approx 15$，远小于实际到达的$v' \approx 40$。
:::

### 解离、预解离与伯奇-斯波纳外推

当光子能量超过上态的解离极限时，分子落在曲线的未束缚部分，在一个振动周期之内分崩离析。分立的谱带于是越来越密、趋于收敛，最终让位于**连续区**。收敛限是精确的热化学数值：$\mathrm{I_2}$的收敛限位于$v'' = 0$以上$20\,043\ \mathrm{cm^{-1}}$处，而碎片是一个基态原子加一个激发态原子，故$D_0'' = 20\,043 - 7603 = 12\,440\ \mathrm{cm^{-1}} = 1.542\ \mathrm{eV}$，即上文所用的值。

当谱带无法一路跟踪到极限时，就对能级间隔作外推。用项值$G(v) = \omega_\mathrm e(v+\tfrac12) - \omega_\mathrm ex_\mathrm e(v+\tfrac12)^2$，相邻能级的间隔
$$
\Delta G_{v+1/2} = G(v+1) - G(v) = \omega_\mathrm e - 2\omega_\mathrm ex_\mathrm e(v+1),
$$
随$v$线性下降。**伯奇-斯波纳（Birge–Sponer）外推**把$\Delta G_{v+1/2}$对$v + 1$作图，把直线延长到零，取线下方面积作为$D_0$：对直线而言该面积为$(\omega_\mathrm e - 2\omega_\mathrm ex_\mathrm e)^2/4\omega_\mathrm ex_\mathrm e$。真实曲线在极限附近向下弯曲，因为长程吸引比莫尔斯形式所假设的更弱，所以线性外推通常*高估*$D_0$——[[#exr-birge]]对此作了定量化。

有时谱带系在其收敛限*以下*就变得弥散。上能级在那里被一个排斥态的曲线交叉；借助弱耦合（自旋-轨道耦合，或玻恩-奥本海默近似的失效），分子泄漏到排斥曲线上，还没来得及转动一周就解离了，而[[spectroscopy/spectroscopy-principles]]中的寿命加宽$\Delta\tilde\nu \approx 1/(2\pi c\tau)$把转动谱线抹平。这种**预解离**在$\mathrm O_2$的舒曼-龙格谱带和许多光化学活性分子中都可以看到；它的起始点给出解离能的一个上限。

## 发色团与多原子分子的紫外-可见光谱

在大分子中，光谱项符号的记账被所涉及的轨道与点群标签所取代。**发色团**是应对某条吸收谱带负责的原子集团：烯烃的$\mathrm{C{=}C}$、酮的$\mathrm{C{=}O}$、多烯的共轭链、过渡金属离子的d壳层。在溶液中，转动结构以及通常连带的振动结构都被抹平，一条谱带由最大吸收波长$\lambda_\mathrm{max}$、摩尔吸收系数$\varepsilon_\mathrm{max}$和宽度来描述。

| 跃迁 | 例子 | $\lambda_\mathrm{max}/\mathrm{nm}$ | $\varepsilon_\mathrm{max}/\mathrm{dm^3\,mol^{-1}\,cm^{-1}}$ | 原因 |
|---|---|---|---|---|
| $\pi \to \pi^*$ | 乙烯（蒸气） | $\approx 165$–$171$ | $\approx 1.5\times10^4$ | 允许，重叠大 |
| $\pi \to \pi^*$ | 丁二烯-1,3 | $217$ | $2.1\times10^4$ | 允许；共轭使能隙变小 |
| $\pi \to \pi^*$ | $\beta$-胡萝卜素 | $\approx 450$ | $\approx 1.4\times10^5$ | 11个共轭$\mathrm{C{=}C}$ |
| $\pi \to \pi^*$ | 苯 | $254$ | $\approx 200$ | 对称性禁戒，经振动-电子耦合允许 |
| $n \to \pi^*$ | 丙酮 | $\approx 280$ | $\approx 15$ | 轨道近似正交 |
| 配体到金属的电荷转移 | $\mathrm{MnO_4^-}$ | $\approx 525$ | $\approx 2\times10^3$ | 允许，偶极改变大 |
| d–d | $[\mathrm{Ti(H_2O)_6}]^{3+}$ | $\approx 500$ | $\approx 5$ | 拉波特禁戒（$g \leftrightarrow g$） |

（表中为己烷、水或气相中的近似文献值，取自帕维亚（Pavia）等人与普雷奇（Pretsch）等人的书；准确数值依赖于溶剂。）表中$\varepsilon$跨越四个数量级以上，其次序完全可以由选律与轨道重叠解释。烯烃与多烯的$\pi \to \pi^*$跃迁完全允许：两条轨道位于相同的原子上，其乘积给出大的偶极。羰基的$n \to \pi^*$谱带很弱，因为氧的孤对电子位于分子平面内而$\pi^*$轨道垂直于该平面：跃迁密度很小，而在$C_{2v}$对称的酮中该跃迁在形式上是禁戒的。八面体配合物的d–d谱带是$g \leftrightarrow g$，只能从振动借来强度——这就是多数水合过渡金属盐颜色浅淡、而高锰酸根（其谱带是氧到锰的允许电荷转移）呈浓紫色的原因。四面体配合物没有对称中心，其d–d谱带强十倍到一百倍，这就是$[\mathrm{CoCl_4}]^{2-}$是鲜艳的蓝色而$[\mathrm{Co(H_2O)_6}]^{2+}$是浅粉红色的原因；完整的理论见[[coordination-chemistry/spectra-of-complexes]]。

有两个词描述取代基与溶剂如何移动谱带：向长波方向的移动是**深色位移**（bathochromic shift，红移），向短波方向的移动是**浅色位移**（hypsochromic shift，蓝移）；强度的增大是**增色**（hyperchromic）。延伸共轭产生深色位移，正如[[quantum-chemistry/huckel-theory]]与[[quantum-chemistry/model-systems]]中的休克尔（Hückel）模型和势箱模型所预言：多烯的HOMO–LUMO能隙随链增长而缩小。极性、形成氢键的溶剂使$n \to \pi^*$谱带蓝移，因为它们对基态孤对电子的稳定作用超过对激发态的稳定作用；同样的溶剂通常使$\pi \to \pi^*$谱带轻微红移。

### 谱带强度的度量：振子强度

$\varepsilon_\mathrm{max}$依赖于谱带的宽度；分子本身的属性是谱带下的*面积*。无量纲的**振子强度**把这一面积与一个经典弹簧束缚电子的吸收相比较。

::: definition 振子强度 {#def-oscillator-strength}
吸收谱带的**振子强度**为
$$
f = \frac{4\varepsilon_0 m_\mathrm e c^2 \ln 10}{N_\mathrm A e^2}\int\varepsilon(\tilde\nu)\,\mathrm d\tilde\nu = 4.319\times10^{-9}\ \mathrm{dm^{-3}\,mol\,cm^{2}} \int\varepsilon(\tilde\nu)\,\mathrm d\tilde\nu ,
$$ {#eq-osc}
其中$\varepsilon$以$\mathrm{dm^3\,mol^{-1}\,cm^{-1}}$、$\tilde\nu$以$\mathrm{cm^{-1}}$为单位（该因子由CODATA 2018常数算出；在折射率为$n$的介质中有时还计入局域场校正）。它与跃迁偶极矩的关系为$f = \dfrac{2 m_\mathrm e\omega}{3\hbar e^2}\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2$。完全允许的跃迁$f \sim 0.1$–$1$；$f = 1$对应一个经典振荡电子。对高斯谱带，$\int\varepsilon\,\mathrm d\tilde\nu = 1.0645\,\varepsilon_\mathrm{max}\,\Delta\tilde\nu_{1/2}$，其中$\Delta\tilde\nu_{1/2}$为半高全宽。
:::

作为对第二个表达式的检验，氢的莱曼-$\alpha$线$2p \leftarrow 1s$有$\sum_m\lvert\langle 2p\,m\vert\mathbf r\vert 1s\rangle\rvert^2 = 3\times(0.7449\,a_0)^2$，由此得$f = 0.416$，与公认值一致。

::: example 一条π→π*谱带与一条n→π*谱带的振子强度 {#ex-osc}
试估计(a)丁二烯-1,3的$217\ \mathrm{nm}$谱带（$\varepsilon_\mathrm{max} = 2.1\times10^4\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$）与(b)丙酮的$n \to \pi^*$谱带（$\varepsilon_\mathrm{max} = 15\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$）的$f$，设两者都是半高全宽为$5000\ \mathrm{cm^{-1}}$的高斯谱带。
::: solution
(a) 积分吸收为$1.0645 \times 2.1\times10^4 \times 5000 = 1.12\times10^8\ \mathrm{dm^3\,mol^{-1}\,cm^{-2}}$，于是
$$
f = 4.319\times10^{-9} \times 1.12\times10^8 = 0.48 .
$$
(b) 在同样宽度下取$\varepsilon_\mathrm{max} = 15$，得$\int\varepsilon\,\mathrm d\tilde\nu = 7.98\times10^4$，$f = 3.4\times10^{-4}$。二烯的谱带带有大约一个经典电子一半的强度——这是一条完全允许的跃迁——而羰基谱带弱一千多倍，正如两条近似正交的轨道所预料。两个答案都带有所设宽度的不确定度（至多两位有效数字）；实践中要对测得的谱带作数值积分。
:::
:::

### 伍德沃德-菲泽规则

在核磁共振之前，$\pi \to \pi^*$谱带的位置是共轭二烯与烯酮结构测定的最佳工具之一，今天仍是一种快捷的一致性检验。伍德沃德（R. B. Woodward）在1941–42年发现、菲泽（L. F.与M. Fieser）兄弟后来扩充：乙醇中的$\lambda_\mathrm{max}$可以在基准值上加上增量来预测。这些规则是**经验性**的：它们总结了甾体与萜类的数据，对无张力的平面体系的可靠度约为$\pm5\ \mathrm{nm}$。

::: algorithm λmax的伍德沃德-菲泽估算 {#alg-woodward}
1. 认出共轭发色团，选定**基准值**。二烯：跨环（两条双键分处不同的环）或无环$214\ \mathrm{nm}$；同环（两条双键同在一条环内）$253\ \mathrm{nm}$。$\alpha,\beta$-不饱和酮：无环或六元环$215\ \mathrm{nm}$，五元环$202\ \mathrm{nm}$；醛$210\ \mathrm{nm}$。
2. 加上**增量**：每个额外的共轭$\mathrm{C{=}C}$ $+30$；发色团上每个烷基取代基或环残基，对二烯$+5$，对烯酮则$\alpha$位$+10$、$\beta$位$+12$、$\gamma$及以后$+18$；每个**环外**双键（发色团的一个$\mathrm{C{=}C}$，其一个碳在某个环内而键在该环外）$+5$；烯酮中含同环二烯组分$+39$；极性基团按表所列（对二烯：$-\mathrm{OR}$ $+6$，$-\mathrm{Cl}$或$-\mathrm{Br}$ $+5$，$-\mathrm{NR_2}$ $+60$）。
3. 对在其他溶剂中测定的烯酮，从乙醇的数值作校正（己烷$+11$，水$-8\ \mathrm{nm}$，按表所列）。
4. 与实测$\lambda_\mathrm{max}$比较；偏差超过约$10\ \mathrm{nm}$即提示发色团不同、存在张力或分子扭转而脱离共轭。

（增量按帕维亚等人的《波谱学导论》（*Introduction to Spectroscopy*）所列表格；其他表格的基准值有百分之几nm的差异，例如有表对无环二烯取$217\ \mathrm{nm}$。）
:::

::: example 两个甾体发色团 {#ex-woodward}
预测(a)胆甾-3,5-二烯（cholesta-3,5-diene，A、B两环中的跨环二烯）与(b)胆甾-4-烯-3-酮（cholest-4-en-3-one，六元环烯酮，$\mathrm{C4{=}C5}$双键位于A/B环并合处）的$\lambda_\mathrm{max}$。
::: solution
(a) 基准值（跨环）$214\ \mathrm{nm}$。连在四个二烯碳C3、C4、C5、C6上的环残基：C3上的C2、C5上的C10、C6上的C7——共三个，$+15$。$\mathrm{C3{=}C4}$键位于A环内，而另一条键$\mathrm{C5{=}C6}$的一端C5也在A环内，所以$\mathrm{C5{=}C6}$对A环是环外的：$+5$。合计$214 + 15 + 5 = 234\ \mathrm{nm}$；实测$235\ \mathrm{nm}$。

(b) 基准值（六元环烯酮）$215\ \mathrm{nm}$。$\alpha$碳C4只连氢：$+0$。$\beta$碳C5连两个环残基（C6与C10）：$2 \times 12 = +24$。$\mathrm{C4{=}C5}$键对B环是环外的（C5在B环内，C4不在）：$+5$。合计$215 + 24 + 5 = 244\ \mathrm{nm}$；实测$241\ \mathrm{nm}$。两个预测都落在规则承诺的$\pm5\ \mathrm{nm}$之内——而一个双键位于$\mathrm{C5{=}C6}$、不再与羰基共轭的异构体将只在$290\ \mathrm{nm}$附近显示一条弱的$n \to \pi^*$谱带，当年就是这样区分这类异构体的。
:::
:::

## 吸收之后：荧光与磷光

溶液中的受激分子在皮秒内把多余的振动能量交给溶剂，然后经由若干途径之一发生电子衰变。**雅布隆斯基（Jablonski）图**按自旋多重度把它们组织起来——单重态$\mathrm S_0, \mathrm S_1, \mathrm S_2$与三重态$\mathrm T_1, \mathrm T_2$——其动力学，包括速率常数$k_\mathrm f$、$k_\mathrm{IC}$、$k_\mathrm{ISC}$以及对猝灭的斯特恩-沃尔默（Stern–Volmer）处理，在[[kinetics/photochemistry]]中详述。这里我们只需要光谱学上的推论。

- **荧光**是自旋允许的发射$\mathrm S_1 \to \mathrm S_0$，寿命约$1$–$100\ \mathrm{ns}$。
- **内转换**（IC）是无辐射的$\mathrm S_n \to \mathrm S_{n-1}$转移，在较高激发态之间很快（$\sim10^{-12}\ \mathrm s$），跨过较大的$\mathrm S_1$–$\mathrm S_0$能隙时较慢。
- **系间窜越**（ISC）是无辐射的$\mathrm S_1 \to \mathrm T_1$转移；它自旋禁戒，需要自旋-轨道耦合，而后者随核电荷急剧增大（**重原子效应**）；按**埃尔-赛义德（El-Sayed）规则**，在不同轨道类型的态之间它最快，例如芳香酮中的${}^1(n,\pi^*) \to {}^3(\pi,\pi^*)$。
- **磷光**是自旋禁戒的发射$\mathrm T_1 \to \mathrm S_0$，寿命从微秒到秒；在流动溶液中它通常被溶解氧猝灭，这就是它通常在$77\ \mathrm K$的刚性玻璃体或固体中才能观测到的原因。

由于内转换和振动弛豫快过发射，光几乎总是从每种多重度的最低激发态发出：这就是**卡沙（Kasha）规则**，它使荧光光谱与激发波长无关（奥（azulene）的$\mathrm S_2$发射是教科书式的例外）。因此荧光从$\mathrm S_1$的$v' = 0$出发、终止于$\mathrm S_0$的振动能级，而吸收从$\mathrm S_0$的$v'' = 0$出发、终止于$\mathrm S_1$的能级。两个推论随之立得。

::: proposition 斯托克斯位移与镜像规则 {#prop-mirror}
若$\mathrm S_0$与$\mathrm S_1$的势能曲线形状相似且康登近似成立，则(i)吸收与荧光共享$0$–$0$谱带，吸收位于其高能一侧而荧光位于低能一侧，谱带极大之间相差**斯托克斯位移**$\Delta\tilde\nu = \tilde\nu_\mathrm{abs,max} - \tilde\nu_\mathrm{fl,max} > 0$；(ii)以波数为横轴作图的荧光光谱，近似等于$\mathrm S_1 \leftarrow \mathrm S_0$吸收谱带关于$0$–$0$能量反射后的镜像。
:::

::: proof 两条谱带为何互为镜像
从$v'' = 0$到$v'$的吸收强度$\propto q_{v'0}$，能量为$\tilde\nu_{00} + v'\tilde\omega'$；从$v' = 0$到$v''$的发射强度$\propto q_{0v''}$，能量为$\tilde\nu_{00} - v''\tilde\omega''$。对形状相同的曲线有$\tilde\omega' = \tilde\omega''$，而对位移谐振子，$q_{v0}$与$q_{0v}$是同一个泊松数$\mathrm e^{-S}S^v/v!$（[[#eq-huang-rhys]]）。因此两条序列在$\tilde\nu_{00}$两侧有完全相同的强度图样，这就是镜像。由于任何$S > 0$都使吸收极大位于$\tilde\nu_{00}$之上、发射极大位于其下，斯托克斯位移为正；受激分子周围的溶剂重组还会使它加大。（详细的强度还含有吸收与发射各自的因子$\tilde\nu$与$\tilde\nu^3$，它们会轻微扭曲镜像。）
:::

对镜像对称的大偏离具有诊断意义：它意味着受激分子在激发后显著改变了几何构型（扭转、质子转移、受激准分子（excimer）），以致发光的结构与吸收光的结构不同。

积分吸收谱带还能预言分子荧光的快慢。吸收与自发发射之间的爱因斯坦关系（见下）导出辐射速率常数的**斯特里克勒-贝格（Strickler–Berg）**公式，
$$
k_\mathrm f = \frac{1}{\tau_0} \approx \frac{8\pi c\,n^2 \tilde\nu_\mathrm{max}^2 \ln 10}{N_\mathrm A}\int\varepsilon\,\mathrm d\tilde\nu = 2.881\times10^{-9}\, n^2\,\tilde\nu_\mathrm{max}^2 \int\varepsilon\,\mathrm d\tilde\nu\ \ \mathrm{s^{-1}} ,
$$ {#eq-strickler}
其中$\tilde\nu$以$\mathrm{cm^{-1}}$、$\varepsilon$以$\mathrm{dm^3\,mol^{-1}\,cm^{-1}}$计，$n$为折射率（这是一个简化形式，适用于斯托克斯位移小的强允许谱带）。由此得出一条有用的经验法则：$\tau_0 \approx 10^{-4}\,\mathrm s / \varepsilon_\mathrm{max}$。强吸收体是快发射体；$\varepsilon \approx 15$的酮的$n \to \pi^*$态荧光需要微秒量级，所以系间窜越获胜，酮是三重态敏化剂而不是荧光团。

::: example 一种荧光染料：亮度、寿命与斯托克斯位移 {#ex-dye}
一种荧光素类染料在碱性水溶液中于$\lambda_\mathrm{max} = 490\ \mathrm{nm}$处吸收，$\varepsilon_\mathrm{max} = 7.69\times10^4\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$，在$514\ \mathrm{nm}$处发射；其荧光量子产率$\Phi_\mathrm f = 0.93$，寿命$\tau = 4.1\ \mathrm{ns}$。求(a)斯托克斯位移，(b)由$\Phi_\mathrm f$与$\tau$求辐射速率常数，(c)斯特里克勒-贝格估算，设高斯谱带半宽为$2000\ \mathrm{cm^{-1}}$，$n = 1.333$。
::: solution
(a) 以波数计，$\tilde\nu_\mathrm{abs} = 10^7/490 = 20\,408\ \mathrm{cm^{-1}}$，$\tilde\nu_\mathrm{fl} = 10^7/514 = 19\,455\ \mathrm{cm^{-1}}$，故$\Delta\tilde\nu = 953\ \mathrm{cm^{-1}}$——一个小的位移，刚性染料的典型值。

(b) 量子产率是发生荧光的激发态分子的比例，$\Phi_\mathrm f = k_\mathrm f\tau$（见[[kinetics/photochemistry]]），于是$k_\mathrm f = 0.93/4.1\times10^{-9}\ \mathrm s = 2.3\times10^8\ \mathrm{s^{-1}}$，自然寿命$\tau_0 = 1/k_\mathrm f = 4.4\ \mathrm{ns}$。

(c) $\int\varepsilon\,\mathrm d\tilde\nu = 1.0645 \times 7.69\times10^4 \times 2000 = 1.64\times10^8$，于是
$$
k_\mathrm f \approx 2.881\times10^{-9} \times 1.333^2 \times (20\,408)^2 \times 1.64\times10^8 = 3.5\times10^8\ \mathrm{s^{-1}} ,
$$
$\tau_0 \approx 2.9\ \mathrm{ns}$。估算与实验符合到$1.5$倍以内，这已是所设谱带形状允许的极限；经验法则给出$10^{-4}/7.69\times10^4 = 1.3\ \mathrm{ns}$，数量级正确。这类染料之所以明亮，是因为几乎每一个被吸收的光子都在几纳秒内、在任何较慢的过程能够竞争之前被交还回来。
:::
:::

::: warning 发射波长不等于吸收波长 {#warn-stokes}
人们很容易想在发射极大处激发一个荧光团，或想当然地认为染料会发出它看起来的那种颜色。两者都不对。染料在白光下的颜色是它所吸收的颜色的互补色（荧光素吸收蓝光，在浓溶液中呈黄橙色）；它的荧光相对其吸收因斯托克斯位移而红移；而在发射波长处激发几乎什么也激发不了，因为按镜像规则那里的吸收很弱。同样的逻辑解释了为什么荧光计在两束光路上都使用滤光片或单色器，并在$90^\circ$方向观测发射——否则散射的激发光会淹没信号。
:::

## 受激发射与激光

吸收有一个伙伴过程：一个能量合适的光子可以*激发*一个受激分子发射一个全同的光子——同方向、同相位、同偏振。爱因斯坦在1917年证明，要使物质与黑体辐射达到热平衡，受激发射与自发发射都必须存在。

::: proposition 爱因斯坦系数 {#prop-einstein}
对粒子数布居为$N_1, N_2$、简并度为$g_1, g_2$的两个能级，在谱能量密度为$\rho(\nu)$的辐射场中，单位体积的吸收、受激发射与自发发射速率分别为$B_{12}\rho N_1$、$B_{21}\rho N_2$与$A_{21}N_2$，并且
$$
g_1 B_{12} = g_2 B_{21}, \qquad \frac{A_{21}}{B_{21}} = \frac{8\pi h\nu^3}{c^3} .
$$ {#eq-einstein}
在温度为$T$的热辐射中，受激发射与自发发射之比为$B_{21}\rho/A_{21} = 1/(\mathrm e^{h\nu/k_\mathrm BT} - 1)$。
:::

::: proof 与普朗克定律的细致平衡 {#proof-einstein}
平衡时上、下速率相等：$B_{12}\rho N_1 = (A_{21} + B_{21}\rho)N_2$，于是$\rho = A_{21}/(B_{12}N_1/N_2 - B_{21})$。布居服从玻尔兹曼分布，$N_2/N_1 = (g_2/g_1)\mathrm e^{-h\nu/k_\mathrm BT}$，代入得
$$
\rho(\nu) = \frac{A_{21}/B_{21}}{(g_1B_{12}/g_2B_{21})\,\mathrm e^{h\nu/k_\mathrm BT} - 1} .
$$
这必须在任何温度下都等于普朗克公式$\rho(\nu) = (8\pi h\nu^3/c^3)/(\mathrm e^{h\nu/k_\mathrm BT} - 1)$。$T \to \infty$时相符要求$g_1B_{12} = g_2B_{21}$，其后再要求对所有$T$相符，就得$A_{21}/B_{21} = 8\pi h\nu^3/c^3$。用普朗克的$\rho$把$B_{21}\rho$除以$A_{21}$即得最后一条结果。由于$B$正比于$\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2$，$A$也是如此——这就是强吸收体是快发射体的原因，即[[#eq-strickler]]的内容。
:::

::: widget plot
f: -log10(exp(14388/(10^x*t))-1)
x: -0.7, 4
y: -60, 5
sliders: t=300:200:6000:100
hlines: 0
labels: \log_{10}(\text{受激}/\text{自发})
caption: 热辐射中受激发射与自发发射之比$1/(\mathrm e^{h\nu/k_\mathrm BT} - 1)$，以对数标度对$\log_{10}(\lambda/\mathrm{\mu m})$作图；温度`t`（单位$\mathrm K$）由滑块设定，$hc/k_\mathrm B = 14\,388\ \mathrm{\mu m\,K}$。在$300\ \mathrm K$下，红光（$\log_{10}\lambda = -0.2$）的比值约为$10^{-33}$，而厘米波微波（$\log_{10}\lambda = 4$）则超过$100$：自发发射在可见光区占主导，受激发射在微波区占主导。这就是同类第一台装置——氨微波激射器（maser）——工作在微波频率的原因，也是光学激光需要远离热平衡的布居的原因。
:::

受激发射只有在胜过吸收时才能放大一束光，$B_{21}\rho N_2 > B_{12}\rho N_1$，即
$$
\frac{N_2}{g_2} > \frac{N_1}{g_1} \qquad (\text{粒子数反转}).
$$
在热平衡下，正温度时这永远不会发生。**激光**（laser，受激辐射光放大）通过其他能级泵入能量来制造反转，把增益介质置于反射镜之间使光子反复通过它，并让一小部分光透过部分透射的反射镜射出。激光在**阈值**处开始，此时每往返一周的增益等于损耗。

::: proposition 粒子数反转需要多于两个能级 {#prop-inversion}
(i) 对二能级系统作光泵浦不能产生稳态反转：无论泵浦多强，总有$N_2/g_2 \le N_1/g_1$。(ii) 在**三能级**激光器中，下激光能级就是基态，反转要求超过一半的工作中心（当$g_1 = g_2$时）处于上激光能级。(iii) 在**四能级**激光器中，下激光能级位于基态以上$\Delta E \gg k_\mathrm BT$处且排空很快，它对热布居几乎是空的，上能级中任何布居都能给出反转。
:::

::: proof 稳态布居
(i) 对$1 \leftrightarrow 2$跃迁施加泵浦密度$\rho$，$\mathrm dN_2/\mathrm dt = B_{12}\rho N_1 - (B_{21}\rho + A_{21})N_2 = 0$。利用$g_1B_{12} = g_2B_{21}$，得$N_2/g_2 = (N_1/g_1)\,B_{21}\rho/(B_{21}\rho + A_{21}) < N_1/g_1$；当$\rho \to \infty$时每态布居趋于相等——跃迁被*饱和*，而不是被反转。(ii) 在三能级方案中，泵浦把工作中心从能级1提升到能级3，能级3快速弛豫到能级2；激光作用发生在$2 \to 1$。反转要求$N_2 > N_1$且$N_1 + N_2 \approx N$，即$N_2 > N/2$：必须泵浦一半以上的工作中心才出现增益。(iii) 若下激光能级1′位于基态以上$\Delta E$处，其热布居为总数的一个分数$\mathrm e^{-\Delta E/k_\mathrm BT}$（再乘以简并度因子），而快速的$1' \to 0$弛豫使它在运行中保持在该值附近。这时反转只需要$N_2/g_2 > N_{1'}/g_{1'}$，一个很小的布居即可。
:::

第一台激光器，梅曼（Maiman）1960年的红宝石激光器，是三能级系统：$\mathrm{Al_2O_3}$中的$\mathrm{Cr^{3+}}$离子被闪光灯泵浦到宽吸收带，弛豫到${}^2E$能级，再激光发射$694.3\ \mathrm{nm}$的光回到${}^4A_2$基态——这就是红宝石激光器以强脉冲方式运行的原因。**Nd:YAG**激光器（钇铝石榴石中的$\mathrm{Nd^{3+}}$）是标准的四能级系统，从${}^4F_{3/2}$到${}^4I_{11/2}$在$1064\ \mathrm{nm}$处激射。**氦-氖**激光器是气体放电激光器：电子把氦原子激发到亚稳能级，后者通过碰撞把能量传递给几乎重合的氖能级，人们熟悉的$632.8\ \mathrm{nm}$红线是氖跃迁到一个排空很快的较低能级。染料激光器利用有机染料宽的$\mathrm S_1 \to \mathrm S_0$荧光——一个由弗兰克-康登包络的振动能级构成的四能级方案——可在其发射带内调谐。

::: example Nd:YAG为何是四能级激光器 {#ex-ndyag}
在Nd:YAG中，上激光能级位于$11\,507\ \mathrm{cm^{-1}}$，$1064\ \mathrm{nm}$谱线的终能级位于基态以上$2110\ \mathrm{cm^{-1}}$处（克赫内尔（Koechner），《固体激光器工程》（*Solid-State Laser Engineering*））。检验激光波长，求光子能量，并估算终能级在$300\ \mathrm K$下的热布居分数（忽略简并度）。
::: solution
跃迁波数为$11\,507 - 2110 = 9397\ \mathrm{cm^{-1}}$，于是$\lambda = 10^7/9397 = 1064.2\ \mathrm{nm}$，$E = hc/\lambda = 1.165\ \mathrm{eV}$。取$hc/k_\mathrm B = 1.4388\ \mathrm{cm\,K}$，终能级的玻尔兹曼因子为
$$
\exp\!\left(-\frac{2110 \times 1.4388}{300}\right) = \mathrm e^{-10.1} = 4.0\times10^{-5} .
$$
室温下每$10^5$个离子中只有约4个处于下激光能级，而且它在纳秒内就排空到基态能级组，所以很小的上能级布居就已给出反转。对比红宝石：必须先泵浦一半的$\mathrm{Cr^{3+}}$离子。这就是Nd:YAG激光器能用二极管泵浦连续运转，而红宝石需要强闪光的原因。
:::
:::

**激光安全。**激光束主要对眼睛危险：晶状体会把准直光束聚焦到视网膜上的一个光斑，使其辐照度提高约$10^{5}$倍。激光器按国际标准IEC 60825-1分类。1类激光器在正常使用下是安全的；2类是可见光区、功率至$1\ \mathrm{mW}$（连续）的激光器，此时眨眼反射通常能保护眼睛；3R类在可见光区放宽到$5\ \mathrm{mW}$，不应直视；3B类（至$0.5\ \mathrm W$）在直视或镜面反射观看时有危险；4类（$0.5\ \mathrm W$以上）即使漫反射也有危险，并且构成火灾与皮肤危害。Nd:YAG（$1064\ \mathrm{nm}$）等近红外激光器特别阴险：光束不可见，没有眨眼反射，而眼睛仍把它聚焦到视网膜上。3B类与4类的实验室激光器只能在受控区域使用，须有联锁装置、在固定高度（绝不在眼睛高度）封闭光路、摘除手表和反光首饰，并佩戴*对该波长*具有正确光密度的护目镜；操作它们需要培训、监督与风险评估。

## 后续内容

本课的思想贯穿化学的其他部分。选律与弗兰克-康登因子会在[[coordination-chemistry/spectra-of-complexes]]的光电子光谱与配体场光谱中重现，那里用上节表格中的d–d谱带与电荷转移谱带结合塔曼-久野（Tanabe–Sugano）图作出归属；我们在此描述了其光谱的激发态，正是[[kinetics/photochemistry]]中的反应物，后者处理量子产率、斯特恩-沃尔默猝灭与光化学速率方程。三重态与自由基的磁亚能级由[[spectroscopy/epr]]直接探测，而电子谱带的振动结构与[[spectroscopy/vibrational-spectroscopy]]的简正振动相联系。定量的吸光度测量——朗伯-比尔定律、校准与仪器——是[[analytical-chemistry/molecular-spectrometry]]的主题。而当伍德沃德-菲泽规则失灵时，现代的途径是在[[computational-chemistry]]中用含时密度泛函理论计算垂直激发能。

::: history
弗兰克（James Franck）在1925年论证了电子跃迁使核保持原位，康登（Edward Condon）在1926年与1928年给出了量子力学的重叠形式。爱因斯坦关于吸收与发射系数的论文发表于1917年。斯托克斯（George Gabriel Stokes）在1852年关于奎宁溶液的论文中描述了荧光向长波方向的位移；雅布隆斯基（Aleksander Jabłoński）在1933年画出了他的单重态与亚稳态图；卡沙（Michael Kasha）在1950年表述了他的规则。伍德沃德（Robert Burns Woodward）1941–42年在《美国化学会志》（*Journal of the American Chemical Society*）上发表了他关于二烯与烯酮的规则，那时他的合成工作尚未使他成名。汤斯（Charles Townes）与合作者于1954年运转了氨微波激射器，肖洛（Arthur Schawlow）与汤斯于1958年提出光学激光，梅曼（Theodore Maiman）于1960年5月造出了红宝石激光器；1964年诺贝尔物理学奖授予汤斯、巴索夫（Nikolay Basov）与普罗霍罗夫（Aleksandr Prokhorov）。赫茨伯格（Gerhard Herzberg）的巨著《分子光谱与分子结构》（*Molecular Spectra and Molecular Structure*）——其中第三卷讲多原子分子的电子光谱，出版于1966年——以及胡贝尔与赫茨伯格1979年的表格，至今仍是双原子分子常数的标准来源。
:::

::: summary
- 双原子分子的电子态以${}^{2S+1}\Lambda_{g/u}^{\pm}$标记；满壳层为${}^1\Sigma^+$，而$\mathrm O_2$的$(\pi_g)^2$给出$\mathrm X\,{}^3\Sigma_g^-$、$\mathrm a\,{}^1\Delta_g$与$\mathrm b\,{}^1\Sigma_g^+$。
- 电偶极选律：$\Delta S = 0$，$\Delta\Lambda = 0, \pm1$，$\Sigma^\pm \leftrightarrow \Sigma^\pm$，$g \leftrightarrow u$（拉波特）；自旋-轨道耦合与振动-电子耦合使其放松，这就是禁戒谱带弱而不消失的原因。
- 弗兰克-康登原理：跃迁是垂直的，谱带强度为$\lvert\boldsymbol\mu_\mathrm{el}\rvert^2\,\lvert\langle\chi_{v'}\vert\chi_{v''}\rangle\rvert^2$；有位移的曲线给出在垂直能量处出现极大的长序列（对等频率谐振曲线是服从均值$S$（黄昆-里斯因子）的泊松分布）。
- 垂直、0–0与$T_\mathrm e$能量互不相同；收敛限与伯奇-斯波纳外推（$\Delta G_{v+1/2} = \omega_\mathrm e - 2\omega_\mathrm ex_\mathrm e(v+1)$）给出解离能，而预解离使极限以下的谱带弥散。
- 谱带强度是积分吸收：$f = 4.32\times10^{-9}\int\varepsilon\,\mathrm d\tilde\nu$；$\pi\to\pi^*$谱带$\varepsilon \sim 10^4$–$10^5$，$n\to\pi^*$与d–d谱带$\sim 10$–$100$；伍德沃德-菲泽增量把二烯与烯酮的$\lambda_\mathrm{max}$预测到约$\pm5\ \mathrm{nm}$。
- 激发之后，卡沙规则使发光来自$\mathrm S_1$（荧光，ns）或$\mathrm T_1$（磷光，µs–s）；荧光有斯托克斯位移且大致是吸收的镜像，强吸收体是快发射体（$\tau_0 \approx 10^{-4}\,\mathrm s/\varepsilon_\mathrm{max}$）。
- 爱因斯坦：$A_{21}/B_{21} = 8\pi h\nu^3/c^3$；增益需要粒子数反转，二能级做不到，三能级难（红宝石），四能级容易（Nd:YAG、氦-氖、染料激光器）。激光器按眼睛安全分为1–4类，不可见的红外光束需要特别小心。
:::

## 习题

::: exercise 氧的A带 {level=1 check="762.1"}
$\mathrm O_2$的$\mathrm b\,{}^1\Sigma_g^+ (v'=0) \leftarrow \mathrm X\,{}^3\Sigma_g^- (v''=0)$谱带位于$13\,120.9\ \mathrm{cm^{-1}}$。它在什么波长处吸收？为什么它如此微弱？（波长以nm为单位输入。）
::: solution
$\lambda = 10^7/13\,120.9\ \mathrm{nm} = 762.1\ \mathrm{nm}$。该跃迁违反三条电偶极规则：$\Delta S = -1$、$\Sigma^- \to \Sigma^+$与$g \to g$。它作为磁偶极跃迁（自旋-轨道耦合混合了这两个态）获得一点强度，只有因为阳光穿越数十千米的空气才看得见；即便如此，它仍在太阳光谱的红端刻出一道深而尖的凹口。
:::
:::

::: exercise 用伍德沃德-菲泽规则估算二烯 {level=1 check="239"}
松香酸（abietic acid）含一个跨环二烯，二烯碳上有四个烷基取代基或环残基，还有一个环外双键。预测它的$\lambda_\mathrm{max}$。（以nm为单位输入。）
::: solution
基准值（跨环）$214\ \mathrm{nm}$；四个取代基$4 \times 5 = +20$；一个环外双键$+5$。合计$239\ \mathrm{nm}$，与实测值约$241\ \mathrm{nm}$接近。同环异构体将从$253\ \mathrm{nm}$起算，在$280\ \mathrm{nm}$附近吸收——差别之大足以一眼区分两类二烯。
:::
:::

::: exercise 奎宁的斯托克斯位移 {level=1 check="6555"}
稀硫酸中的硫酸奎宁在$347.5\ \mathrm{nm}$处吸收，在$450\ \mathrm{nm}$处发出荧光。计算斯托克斯位移。（以$\mathrm{cm^{-1}}$为单位输入。）
::: solution
$\tilde\nu_\mathrm{abs} = 10^7/347.5 = 28\,777\ \mathrm{cm^{-1}}$，$\tilde\nu_\mathrm{fl} = 10^7/450 = 22\,222\ \mathrm{cm^{-1}}$，故$\Delta\tilde\nu = 6555\ \mathrm{cm^{-1}}$。这约是[[#ex-dye]]中刚性染料位移的七倍：奎宁的激发态被强烈溶剂化，并在发光之前弛豫了构型。斯托克斯位移一定要在波数（能量）中计算，而不要当作波长之差——紫外区的$102.5\ \mathrm{nm}$与红区的$102.5\ \mathrm{nm}$是很不相同的能量。
:::
:::

::: exercise 小位移下的弗兰克-康登因子 {level=2 check="2"}
对两条等频率谐振曲线、黄昆-里斯因子$S = 2.4$，求$v' = 0, 1, 2, 3$的弗兰克-康登因子$q_{v'0}$，并指出从$v'' = 0$出发的序列中哪条谱带最强。（输入最强谱带的$v'$。）
::: solution
由[[#eq-huang-rhys]]，$q_{v'0} = \mathrm e^{-2.4}\,2.4^{v'}/v'!$，其中$\mathrm e^{-2.4} = 0.0907$：$q_{00} = 0.091$，$q_{10} = 0.218$，$q_{20} = 0.261$，$q_{30} = 0.209$。最强的谱带是$v' = 2$。对泊松分布，当$S$不是整数时最可几取值为$\lfloor S\rfloor$，所以极大靠近均值；相邻因子之比$q_{v'+1,0}/q_{v'0} = S/(v'+1)$在$v' = 1$与$v' = 2$之间越过$1$。把第一幅互动图的`s` $= 2.4$即可验证。
:::
:::

::: exercise 一条染料谱带的振子强度 {level=2 check="0.71"}
某染料有一条高斯吸收谱带，$\varepsilon_\mathrm{max} = 7.69\times10^4\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$，半高全宽$2000\ \mathrm{cm^{-1}}$。计算它的振子强度。（输入$f$。）
::: solution
$\int\varepsilon\,\mathrm d\tilde\nu = 1.0645 \times 7.69\times10^4 \times 2000 = 1.637\times10^8\ \mathrm{dm^3\,mol^{-1}\,cm^{-2}}$，$f = 4.319\times10^{-9} \times 1.637\times10^8 = 0.71$。接近$1$的数值标志伸展发色团的一条完全允许的$\pi\to\pi^*$跃迁：几乎抵得上一个完整的经典电子。注意：$\varepsilon_\mathrm{max}$相同而更窄的谱带$f$会*更小*——比较谱带要比面积，不要比高度。
:::
:::

::: exercise 用伍德沃德-菲泽规则估算烯酮 {level=2 check="239"}
预测4-甲基戊-3-烯-2-酮（异亚丙基丙酮，mesityl oxide），$\mathrm{(CH_3)_2C{=}CH{-}CO{-}CH_3}$，在乙醇中的$\lambda_\mathrm{max}$。对$310\ \mathrm{nm}$附近$\varepsilon \approx 50$的一条弱谱带你会作何归属？（预测的$\lambda_\mathrm{max}$以nm为单位输入。）
::: solution
无环烯酮：基准$215\ \mathrm{nm}$。$\alpha$碳只连H：$+0$。$\beta$碳连两个甲基：$2 \times 12 = +24$。无环，故无环外双键。预测$239\ \mathrm{nm}$；实测$\pi\to\pi^*$谱带约在$236\ \mathrm{nm}$，$\varepsilon \approx 10^4$。那条长的弱谱带$\varepsilon$小两个数量级，是羰基的$n\to\pi^*$跃迁，因共轭从饱和酮的约$280\ \mathrm{nm}$红移而来。在水中它会移向短波（氢键稳定孤对电子），这是$n\to\pi^*$归属的经典检验。
:::
:::

::: exercise 一支氦-氖激光笔 {level=2 check="3.19e15"}
一台氦-氖激光器在$632.8\ \mathrm{nm}$处输出$1.00\ \mathrm{mW}$。它每秒发出多少光子？它属于哪一类激光器？（每秒光子数作为答案输入。）
::: solution
$E = hc/\lambda = 6.626\times10^{-34} \times 2.998\times10^8/632.8\times10^{-9} = 3.139\times10^{-19}\ \mathrm J$（$1.96\ \mathrm{eV}$）。光子流为$P/E = 1.00\times10^{-3}/3.139\times10^{-19} = 3.19\times10^{15}\ \mathrm{s^{-1}}$。$1\ \mathrm{mW}$的可见连续激光器位于2类的上限：偶然暴露有眨眼反射保护，但故意盯着光束看并不安全。超过$1\ \mathrm{mW}$（至$5\ \mathrm{mW}$）则为3R类。
:::
:::

::: exercise 碘B态的伯奇-斯波纳外推 {#exr-birge level=3 check="5045"}
对$\mathrm I_2(\mathrm B)$使用$\omega_\mathrm e' = 125.69\ \mathrm{cm^{-1}}$与$\omega_\mathrm ex_\mathrm e' = 0.764\ \mathrm{cm^{-1}}$，由线性的$\Delta G_{v+1/2}$图导出$D_0'$（从$v' = 0$起算的解离能）的伯奇-斯波纳估计值，并与由收敛限（位于X态$v'' = 0$以上$20\,043\ \mathrm{cm^{-1}}$）和$0$–$0$谱带（$15\,725\ \mathrm{cm^{-1}}$）得到的真值比较。（伯奇-斯波纳的$D_0'$以$\mathrm{cm^{-1}}$为单位输入。）
::: hint
$D_0'$是$v' = 0$以上所有能级间隔之和，即直线$\Delta G_{v+1/2} = \omega_\mathrm e - 2\omega_\mathrm ex_\mathrm e(v+1)$在$v + 1 = 1$与其归零点之间构成的三角形面积。
:::
::: solution
记$x = v + 1$；则$\Delta G = \omega_\mathrm e - 2\omega_\mathrm ex_\mathrm e\,x$从$x = 1$处的$\omega_\mathrm e - 2\omega_\mathrm ex_\mathrm e = 124.16\ \mathrm{cm^{-1}}$下降到$x_0 = \omega_\mathrm e/2\omega_\mathrm ex_\mathrm e = 82.26$处的零。三角形面积为
$$
D_0' \approx \tfrac12 (x_0 - 1)(\omega_\mathrm e - 2\omega_\mathrm ex_\mathrm e) = \frac{(\omega_\mathrm e - 2\omega_\mathrm ex_\mathrm e)^2}{4\omega_\mathrm ex_\mathrm e} = \frac{124.16^2}{3.056} = 5045\ \mathrm{cm^{-1}} .
$$
（改为对分立间隔求和而非积分，得$5107\ \mathrm{cm^{-1}}$；其差即常见的半步长歧义。）真值为$20\,043 - 15\,725 = 4318\ \mathrm{cm^{-1}}$。线性外推高估约$17\,\%$：$\mathrm I_2(\mathrm B)$真实的$\Delta G$图在高$v$处向下弯曲，因为分离原子间的长程吸引按$R$的幂律衰减，比莫尔斯曲线的指数衰减平缓得多，所以上部能级比两常数公式所预言的聚拢得更快。因此除非把曲线跟踪到极限附近，伯奇-斯波纳值是上限。
:::
:::

::: exercise 受激发射何时与自发发射一样快？ {level=3 check="3.28e4"}
在多高的温度下，热（黑体）辐射在$632.8\ \mathrm{nm}$的He-Ne波长上产生的受激发射与自发发射一样快？这一答案对光学激光器说明了什么？（温度以K为单位输入。）
::: solution
由[[#prop-einstein]]，$B_{21}\rho/A_{21} = 1/(\mathrm e^{h\nu/k_\mathrm BT} - 1) = 1$在$h\nu/k_\mathrm BT = \ln 2$时成立，即
$$
T = \frac{hc}{\lambda k_\mathrm B\ln 2} = \frac{1.4388\times10^{-2}\ \mathrm{m\,K}}{632.8\times10^{-9}\ \mathrm m \times 0.6931} = 3.28\times10^{4}\ \mathrm K .
$$
只有热恒星表面那样高温的辐射才能使受激发射在可见光区形成竞争；在$300\ \mathrm K$下该比值为$\mathrm e^{-75.8} \approx 10^{-33}$。因此光学激光不能依赖热辐射或热布居：它必须在谐振腔内建立强的、高度定向的场，*并且*建立粒子数反转，两者都远离平衡。在微波区，$300\ \mathrm K$下该比值超过$100$，这就是微波激射器先于激光器出现的原因。
:::
:::

::: exercise 三能级与四能级泵浦 {level=3}
(a) 证明对二能级系统作光泵浦至多使两能级的每态布居相等。(b) 一台三能级激光器含$N$个工作离子，$g_1 = g_2$。推导为获得增益必须泵入能级2的最小比例。(c) 一台四能级激光器的下激光能级位于基态以上$2110\ \mathrm{cm^{-1}}$处。估算$300\ \mathrm K$下为实现反转必须泵浦的布居（以$N$的分数表示），并作比较。
::: hint
对$N_2$用$g_1B_{12} = g_2B_{21}$的稳态速率方程；对(c)用下激光能级的玻尔兹曼因子。
:::
::: solution
(a) 稳态下$B_{12}\rho N_1 = (B_{21}\rho + A_{21})N_2$；代入$g_1B_{12} = g_2B_{21}$得$\dfrac{N_2}{g_2} = \dfrac{N_1}{g_1}\cdot\dfrac{B_{21}\rho}{B_{21}\rho + A_{21}}$。对任何有限的$\rho$最后一个因子都小于$1$，只在$\rho \to \infty$时趋于$1$：每态布居趋于相等但永不反转。泵浦以与引起吸收相同的效率引起受激发射。

(b) 泵浦进程为$1 \to 3$，能级3快速弛豫到2，激光线为$2 \to 1$；能级3实际上空的，故$N_1 + N_2 = N$。增益要求$N_2 > N_1 = N - N_2$，即$N_2 > N/2$：必须把$50\,\%$以上的离子保持在上激光能级，其代价是把它们送上去所需的泵浦能量。

(c) 下激光能级持有约$\mathrm e^{-2110 \times 1.4388/300} = 4.0\times10^{-5}$的离子热份额（忽略简并度），而向基态的快速弛豫使它保持在该值。反转只需$N_2 \gtrsim 4\times10^{-5}N$——比三能级的要求小约$10^4$倍。实践中阈值由腔损耗决定而不是由反转决定，这就是Nd:YAG等四能级激光器能连续运转、而三能级的红宝石激光器只能脉冲工作的原因。
:::
:::





