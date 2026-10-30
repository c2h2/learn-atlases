夏日午后遥望远山，山坡被一层蓝灰色的霾映得模糊。这霾不是气体，而是悬浮的颗粒——大多数不到一微米，每立方厘米里有数千到数万颗。其中许多并非直接排放，而是由气体在空气中长成的：硫酸来自二氧化硫，硝酸铵来自氨和硝酸，低挥发性有机物来自萜烯和交通碳氢化合物的氧化。这些颗粒物是全世界对人体健康最有害的空气污染物；它们通过反射阳光、增亮云来冷却气候；而当它们和生成它们的气体被雨水冲刷下来时，就把酸带给土壤和湖泊。本课讲述支配颗粒运动与清除的物理、生成它们的化学——包括云滴里的水化学——以及雨水的酸-碱化学，后者建立在 [[general-chemistry-2/acids-bases]] 的碳酸盐和亨利定律平衡以及 [[environmental-chemistry/tropospheric-chemistry]] 的气相氧化化学之上。

## 气溶胶：粒径、来源与模态

::: definition 气溶胶、颗粒物与粒径分级 {#def-aerosol}
**气溶胶**是固体或液体颗粒在气体中的悬浮体系；在空气质量实践中，这些颗粒本身被称为**颗粒物**（PM）。颗粒按**空气动力学直径** $d_\mathrm{a}$ 分类——即具有相同沉降速度的单位密度（$1000\ \mathrm{kg\,m^{-3}}$）球体的直径——因为采样器和肺响应的正是这个量。$\mathrm{PM_{10}}$ 和 $\mathrm{PM_{2.5}}$ 分别是通过切割点为 $10$ 和 $2.5\ \mathrm{\mu m}$（$50\ \%$ 切割效率）的粒径选择性入口的颗粒的质量浓度（以 $\mathrm{\mu g\,m^{-3}}$ 计）；**超细**颗粒指 $0.1\ \mathrm{\mu m}$ 以下的颗粒。**一次**颗粒以颗粒形态直接排放（烟炱、尘土、海盐飞沫、花粉）；**二次**颗粒由气态前体在大气中经凝结和化学反应生成。
:::

环境粒径谱显示出界限分明的**模态**，各有自己的成因和归宿：

- **成核模态**（约 $0.01\ \mathrm{\mu m}$ 以下）：由硫酸、氨、胺和高度氧化的有机分子形成的新生团簇；数目极其庞大，质量可忽略，因聚并而寿命很短；
- **艾特肯（Aitken）模态**（$0.01$–$0.1\ \mathrm{\mu m}$）：长大核和新鲜的燃烧颗粒，如柴油烟炱；
- **积累模态**（$0.1$–$1\ \mathrm{\mu m}$）：经凝结和云过程长大的颗粒，细颗粒的质量和光散射大部分集中于此。它们大到难以快速扩散、小到难以沉降，于是“积累”起来，可以维持一周左右，直到被雨水清除；
- **粗模态**（约 $1$–$2\ \mathrm{\mu m}$ 以上）：机械产生的颗粒——风吹的矿物粉尘、海盐、道路与轮胎磨损、花粉——在数小时到数天内沉降。

细模态和粗模态是化学上不同的两类群体。细颗粒以二次硫酸盐、硝酸盐、铵和有机物为主，加上黑碳；粗颗粒以地壳元素（Si、Al、Ca、Fe）、海盐和生物材质为主。因此 $\mathrm{PM_{2.5}}$ 的测量主要反映燃烧和二次化学，$\mathrm{PM_{10}}$ 则把粗颗粒也计入。

数目、表面积和质量由不同的粒径承载。由于颗粒质量按 $d^3$ 标度，每立方厘米 $10^{4}$ 个 $0.1\ \mathrm{\mu m}$ 的颗粒（密度 $1500\ \mathrm{kg\,m^{-3}}$）只重 $7.9\ \mathrm{\mu g\,m^{-3}}$，而 $0.5\ \mathrm{\mu m}$ 的颗粒只需 $10^{3}\ \mathrm{cm^{-3}}$ 就重达 $98\ \mathrm{\mu g\,m^{-3}}$。以质量为准的法规由积累模态主导；超细颗粒能深入肺的哪个部位，其健康效应却得不到质量度量的很好体现。

## 颗粒的运动：沉降与清除

::: proposition 斯托克斯沉降速度 {#prop-stokes}
直径 $d$、密度 $\rho_\mathrm{p}$ 的小球在黏度为 $\mu$ 的空气中下落，达到终端速度
$$
v_\mathrm{s} = \frac{\rho_\mathrm{p}\,d^2\,g\,C_\mathrm{c}}{18\,\mu},
$$
其中 $C_\mathrm{c} \geq 1$ 为**坎宁安（Cunningham）滑移修正**：$d \gtrsim 5\ \mathrm{\mu m}$ 时接近 $1$，当 $d$ 接近空气分子的平均自由程（海平面约 $0.068\ \mathrm{\mu m}$）时随 $d$ 减小而增大。条件：蠕流（颗粒雷诺数 $\mathrm{Re} = \rho_\text{air}v_\mathrm{s}d/\mu \ll 1$，约 $30\ \mathrm{\mu m}$ 以下成立）、球形颗粒、忽略空气浮力（$\rho_\text{air} \ll \rho_\mathrm{p}$）。
:::

::: proof 下落球体的受力平衡 {#proof-stokes}
终端速度下阻力与重力平衡。球体周围的蠕流中，斯托克斯阻力为 $F_\mathrm{D} = 3\pi\mu d\,v$（流体力学的结果；见[物理图谱](/learn/physics/)）。重力为 $\frac{\pi}{6}d^3\rho_\mathrm{p}g$。令两者相等，
$$
3\pi\mu d\,v_\mathrm{s} = \frac{\pi}{6}d^3\rho_\mathrm{p}g
\quad\Longrightarrow\quad
v_\mathrm{s} = \frac{\rho_\mathrm{p}d^2g}{18\mu} .
$$
当 $d$ 与平均自由程 $\lambda$ 相当时，空气在颗粒表面不再表现为连续介质；分子从其表面“滑过”，阻力减小为原来的 $C_\mathrm{c} = 1 + \mathrm{Kn}\left[1.257 + 0.4e^{-1.1/\mathrm{Kn}}\right]$ 倍，其中克努森数（Knudsen）$\mathrm{Kn} = 2\lambda/d$，这是对密立根（Millikan）油滴数据的经验拟合。由于 $v_\mathrm{s} \propto d^2$，沉降压倒性地是粗颗粒的过程。
:::

::: example 粗、细颗粒的沉降 {#ex-settling}
求 $298\ \mathrm{K}$ 空气中直径 $10\ \mathrm{\mu m}$ 和 $1\ \mathrm{\mu m}$ 的单位密度球体的沉降速度（$\mu = 1.81\times10^{-5}\ \mathrm{Pa\,s}$；$C_\mathrm{c}$ 分别为 $1.017$ 和 $1.171$），以及各自穿过 $1\ \mathrm{km}$ 边界层所需的时间。
::: solution
对 $10\ \mathrm{\mu m}$：
$$
v_\mathrm{s} = \frac{1000\times(10\times10^{-6})^2\times9.81\times1.017}{18\times1.81\times10^{-5}} = \frac{9.98\times10^{-7}}{3.26\times10^{-4}} = 3.1\times10^{-3}\ \mathrm{m\,s^{-1}},
$$
约 $0.3\ \mathrm{cm\,s^{-1}}$，故静气中下落 $1000\ \mathrm{m}$ 需 $3.3\times10^{5}\ \mathrm{s} \approx 3.8\ \mathrm{d}$。对 $1\ \mathrm{\mu m}$，$d^2$ 因子小 $100$ 倍而 $C_\mathrm{c}$ 更大：$v_\mathrm{s} = 3.5\times10^{-5}\ \mathrm{m\,s^{-1}}$，下落约需 $330\ \mathrm{d}$。现实中湍流和降水把两者都清除得快得多，但反差是真实的：重力沉降在数天内清除粗模态，而细颗粒几乎只被降水清除，可以输送数百到数千千米——一个国家的细硫酸盐会沉降到另一个国家，原因即在此。
:::
:::

对于气体和细颗粒，无降水时在地表的清除（**干沉降**）用**干沉降速度** $v_\mathrm{d}$ 描述，由参考高度处的向下通量 $F = v_\mathrm{d}C$ 定义。它综合了湍流输送、紧贴表面的薄层内的扩散以及表面本身（气孔、湿叶面、土壤、水面）的吸收，常建模为串联阻力 $v_\mathrm{d} = 1/(r_\mathrm{a} + r_\mathrm{b} + r_\mathrm{c})$。可溶或反应性气体（$\mathrm{HNO_3}$、湿面上的 $\mathrm{SO_2}$）的 $v_\mathrm{d}$ 为 $1\ \mathrm{cm\,s^{-1}}$ 量级；积累模态颗粒只有约 $0.1\ \mathrm{cm\,s^{-1}}$，因为它们大到难以扩散、小到难以撞击。$v_\mathrm{d} = 0.5\ \mathrm{cm\,s^{-1}}$ 的气体在深度 $h = 1\ \mathrm{km}$ 的充分混合边界层中的干沉降寿命为 $h/v_\mathrm{d} = 2\times10^{5}\ \mathrm{s} \approx 2\ \mathrm{d}$。**湿沉降**——在云滴中被捕获（云内冲刷）和由降落雨滴捕获（云下冲刷）——清除了积累模态的大部分质量和可溶气体。

## 二次颗粒物的化学

### 硫酸盐

二氧化硫通过全球重要性相当的两条途径氧化为硫酸。气相中，OH 加到 $\mathrm{SO_2}$ 上：
$$
\mathrm{SO_2} + \mathrm{OH} + \mathrm{M} \rightarrow \mathrm{HOSO_2} + \mathrm{M},\qquad
\mathrm{HOSO_2} + \mathrm{O_2} \rightarrow \mathrm{SO_3} + \mathrm{HO_2},\qquad
\mathrm{SO_3} + \mathrm{H_2O} \rightarrow \mathrm{H_2SO_4} ,
$$
这一序列把 $\mathrm{HO_x}$ 自由基送回体系，$\mathrm{SO_2}$ 在平均 OH 浓度下的寿命为一到两周（[[environmental-chemistry/tropospheric-chemistry#def-oh-lifetime]]）。硫酸的蒸气压极低，故立即凝结到现有颗粒上；若可凝结的表面积很少，则与水、氨和胺一起成核生成新颗粒。在云中，$\mathrm{SO_2}$ 溶入云滴，被溶解的过氧化氢和臭氧快得多地氧化。溶解多少取决于 pH，机制是溶解气体的酸解离。

::: proposition 弱酸性气体的有效亨利定律常数 {#prop-effective-henry}
对以亨利定律常数 $K_\mathrm{H}$（$\mathrm{mol\,dm^{-3}\,atm^{-1}}$）溶解为 $\mathrm{A(aq)}$、并按两级解离（常数 $K_1$、$K_2$）解离的气体 $\mathrm{A(g)}$，分压 $p_\mathrm{A}$ 下的总溶解浓度为 $[\mathrm{A}]_\text{tot} = K_\mathrm{H}^*\,p_\mathrm{A}$，其中**有效亨利定律常数**为
$$
K_\mathrm{H}^* = K_\mathrm{H}\left(1 + \frac{K_1}{[\mathrm{H^+}]} + \frac{K_1K_2}{[\mathrm{H^+}]^2}\right) .
$$
对 $\mathrm{SO_2}$（$\mathrm{S(IV)} = \mathrm{SO_2{\cdot}H_2O} + \mathrm{HSO_3^-} + \mathrm{SO_3^{2-}}$），$298\ \mathrm{K}$ 下 $K_\mathrm{H} = 1.23\ \mathrm{mol\,dm^{-3}\,atm^{-1}}$、$\mathrm{p}K_1 = 1.86$、$\mathrm{p}K_2 = 7.2$（数值取自塞恩菲尔德与潘迪斯的著作）。条件：稀溶液（活度系数为 $1$）、气-液平衡已建立——对云滴而言这远不到一秒。
:::

::: proof 对溶解型体求和 {#proof-effective-henry}
亨利定律固定未解离型体：$[\mathrm{SO_2{\cdot}H_2O}] = K_\mathrm{H}p_{\mathrm{SO_2}}$。酸平衡给出 $[\mathrm{HSO_3^-}] = K_1[\mathrm{SO_2{\cdot}H_2O}]/[\mathrm{H^+}]$ 和 $[\mathrm{SO_3^{2-}}] = K_2[\mathrm{HSO_3^-}]/[\mathrm{H^+}] = K_1K_2[\mathrm{SO_2{\cdot}H_2O}]/[\mathrm{H^+}]^2$。求和得
$$
[\mathrm{S(IV)}] = K_\mathrm{H}p_{\mathrm{SO_2}}\left(1 + \frac{K_1}{[\mathrm{H^+}]} + \frac{K_1K_2}{[\mathrm{H^+}]^2}\right),
$$
即定义了 $K_\mathrm{H}^*$。同样的代数用于 $\mathrm{CO_2}$（$K_\mathrm{H} = 3.4\times10^{-2}$、$\mathrm{p}K_1 = 6.35$、$\mathrm{p}K_2 = 10.33$）就得到 [[environmental-chemistry/natural-waters]] 的碳酸盐体系；用于碱（$\mathrm{NH_3}$）则因子变为 $1 + K_\mathrm{a}^{-1}[\mathrm{H^+}]$，$K_\mathrm{a}$ 为 $\mathrm{NH_4^+}$ 的解离常数。对 $\mathrm{SO_2}$，pH 2 到 6 之间 $K_1/[\mathrm{H^+}]$ 是主导项：溶解度每单位 pH 上升十倍。
:::

::: widget plot
f: log(1.23*(1 + 10^(-1.86 + x) + 10^(-9.06 + 2*x)))/log(10); log(0.034*(1 + 10^(-6.35 + x) + 10^(-16.68 + 2*x)))/log(10)
x: 1, 8
y: -2, 6
labels: \log_{10}K_\mathrm{H}^*(\mathrm{SO_2}); \log_{10}K_\mathrm{H}^*(\mathrm{CO_2})
caption: $\mathrm{SO_2}$ 与 $\mathrm{CO_2}$ 的有效亨利定律常数（单位 $\mathrm{mol\,dm^{-3}\,atm^{-1}}$，对数标度）对液滴 pH 的曲线，由[[#prop-effective-henry]]在 $298\ \mathrm{K}$ 下作出。未解离型体占主导时曲线平坦，第一级解离接管后以斜率 $1$ 上升（$\mathrm{SO_2}$ 在 pH $1.86$ 以上，$\mathrm{CO_2}$ 在 $6.35$ 以上），$\mathrm{p}K_2$ 以上以斜率 $2$ 上升。因此二氧化硫的吸收是**自我限制**的：随着 $\mathrm{S(IV)}$ 被氧化为硫酸，液滴酸化，不再溶解更多 $\mathrm{SO_2}$——除非所用的氧化剂的反应速率不在乎 pH。
:::

两种水相氧化剂恰恰在这一点上不同。过氧化氢主要经酸催化路径与亚硫酸氢根反应，而 $[\mathrm{HSO_3^-}]$ 随酸度升高而下降的同时催化作用增强，两个因子几乎相抵：$\mathrm{H_2O_2}$ 的速率几乎与 pH 无关。又因为 $\mathrm{H_2O_2}$ 极易溶（$K_\mathrm{H} \approx 10^{5}\ \mathrm{mol\,dm^{-3}\,atm^{-1}}$），它是多数云中占主导的氧化剂，硫酸盐的生成往往只受 $\mathrm{SO_2}$ 与 $\mathrm{H_2O_2}$ 中较缺者限制。臭氧与亚硫酸根的反应远快于与亚硫酸氢根的，所以其速率随 pH 急剧上升，只在酸性较弱（富氨或富尘）的液滴中才重要。

::: example 云水里有多少 SO₂？ {#ex-cloud-siv}
某云的液态水含量 $L = 0.5\ \mathrm{g\,m^{-3}}$（空气中液态体积分数 $5\times10^{-7}$），液滴 pH $4.5$，温度 $298\ \mathrm{K}$。总 $\mathrm{SO_2}$ 中有多少份额处于水相？
::: solution
由[[#prop-effective-henry]]，取 $[\mathrm{H^+}] = 10^{-4.5}$：$K_1/[\mathrm{H^+}] = 10^{-1.86+4.5} = 10^{2.64} = 437$，$K_1K_2$ 项为 $10^{-9.06+9.0} = 0.87$。故 $K_\mathrm{H}^* = 1.23\times(1 + 437 + 0.87) = 539\ \mathrm{mol\,dm^{-3}\,atm^{-1}}$。一份体积的云空气中水相与气相量之比为 $K_\mathrm{H}^*RTL$，取 $R = 0.08206\ \mathrm{dm^3\,atm\,K^{-1}\,mol^{-1}}$ 使单位相消：
$$
K_\mathrm{H}^*RTL = 539\times0.08206\times298\times5\times10^{-7} = 6.6\times10^{-3} .
$$
水相份额为 $6.6\times10^{-3}/(1 + 6.6\times10^{-3}) = 0.65\ \%$。$\mathrm{SO_2}$ 的大部分仍是气体。然而水相氧化仍占上风，因为与溶解 $\mathrm{H_2O_2}$ 的反应快得让这小小的溶解库在几分钟内就被耗尽并由气相补足。pH $6$ 时溶解份额升至约 $18\ \%$；pH $3$ 时只有 $0.02\ \%$。
:::
:::

### 硝酸盐与铵

来自 $\mathrm{OH + NO_2}$ 和 $\mathrm{N_2O_5}$ 水解的硝酸比硫酸挥发得多。它进入颗粒主要靠与氨中和——氨是大气中主要的气态碱（主要来自农业排放：牲畜粪便与肥料）。氨先与硫酸反应，生成硫酸氢铵和硫酸铵，剩下的氨才谈得上形成硝酸铵：
$$
\mathrm{NH_3(g)} + \mathrm{HNO_3(g)} \rightleftharpoons \mathrm{NH_4NO_3(s)},\qquad K_p = p_{\mathrm{NH_3}}\,p_{\mathrm{HNO_3}} \text{（与固体平衡时）}.
$$
只有气相分压之积超过 $K_p$ 时才有固体硝酸铵存在，而 $K_p$ 随温度急剧上升。干颗粒情形下广泛使用的拟合式（莫祖克维奇（Mozurkewich），1993，《大气环境》（*Atmospheric Environment*））为
$$
\ln\left(\frac{K_p}{\mathrm{ppb^2}}\right) = 84.6 - \frac{24\,220}{T/\mathrm{K}} - 6.1\ln\!\left(\frac{T}{298\ \mathrm{K}}\right),
$$ {#eq-nh4no3}
$298\ \mathrm{K}$ 时给出 $K_p \approx 28\ \mathrm{ppb^2}$，而 $288\ \mathrm{K}$ 时只有 $2.0\ \mathrm{ppb^2}$、$278\ \mathrm{K}$ 时 $0.12\ \mathrm{ppb^2}$。因此硝酸铵是**半挥发**组分：冷夜和冬季凝结，暖午后蒸发——滤膜采样可能损失它；欧洲农业区冬季的 $\mathrm{PM_{2.5}}$ 污染事件常由它主导。

::: example 硝酸铵会形成吗？ {#ex-nh4no3}
全部硫酸盐被中和之后，空气中尚含游离氨 $5.0\ \mathrm{ppb}$、硝酸 $3.0\ \mathrm{ppb}$。$298\ \mathrm{K}$ 时会形成固体硝酸铵吗？$288\ \mathrm{K}$ 时呢？若会，形成多少，以 $1\ \mathrm{atm}$ 下的 $\mathrm{\mu g\,m^{-3}}$ 计？
::: solution
$298\ \mathrm{K}$：乘积 $5.0\times3.0 = 15\ \mathrm{ppb^2}$ 小于 $K_p = 27.8\ \mathrm{ppb^2}$，空气未饱和，没有固体生成；两种气体都留在气相。$288\ \mathrm{K}$：$K_p = 2.04\ \mathrm{ppb^2}$，而 $15 > 2.04$，故固体生成，直到 $(5.0 - x)(3.0 - x) = 2.04$，即 $x^2 - 8.0x + 12.96 = 0$：
$$
x = \frac{8.0 - \sqrt{64.0 - 51.84}}{2} = \frac{8.0 - 3.49}{2} = 2.26\ \mathrm{ppb}
$$
（另一根超过了可用的硝酸量）。$288\ \mathrm{K}$、$1\ \mathrm{atm}$ 下的换算为每摩尔分数 $M p/(RT) = 80.04\times101\,325/(8.314\times288)\ \mathrm{g\,m^{-3}}$，即 $3.39\ \mathrm{\mu g\,m^{-3}\,ppb^{-1}}$，故颗粒质量为 $2.26\times3.39 = 7.6\ \mathrm{\mu g\,m^{-3}}$——超过 WHO 对整个 $\mathrm{PM_{2.5}}$ 的年均指导值，而这一切只是温度降 $10\ \mathrm{K}$ 所致，排放毫无变化。过量的氨（$2.7\ \mathrm{ppb}$）仍以气体存在。因为 $\mathrm{NH_3}$ 过量，在它不再过量之前，削减氨排放几乎不起作用；而削减 $\mathrm{NO_x}$ 能直接减少硝酸盐——这与 [[environmental-chemistry/tropospheric-chemistry#prop-regimes]] 的臭氧机制分析类似。
:::
:::

### 有机气溶胶与黑碳

有机化合物通常占细颗粒质量的 $20$–$90\ \%$。**一次有机气溶胶**来自燃烧（机动车、烹饪、燃木）。**二次有机气溶胶**（SOA）在 VOC 被 $\mathrm{OH}$、$\mathrm{O_3}$ 和 $\mathrm{NO_3}$ 氧化而接上极性官能团——羟基、羰基、羧酸、氢过氧基、硝酸酯——时生成，蒸气压下降数个量级，直到产物转入颗粒相。全球范围内，生物源萜烯和异戊二烯是 SOA 的重要前体；在城市中则芳烃和长链烷烃占主导。**黑碳**（烟炱）——不完全燃烧生成的石墨化聚集体——强烈吸收阳光，在其所在的大气层中造成增暖，并使其沉降于其上的积雪变暗。

## 酸沉降

### 清洁雨水的 pH

::: proposition 雨的天然酸度 {#prop-rain-ph}
与分压 $p_{\mathrm{CO_2}}$ 的大气 $\mathrm{CO_2}$ 平衡、无其他溶质的纯水，其
$$
[\mathrm{H^+}] = \left(K_\mathrm{H}K_1\,p_{\mathrm{CO_2}} + K_\mathrm{w}\right)^{1/2},
$$
其中 $K_\mathrm{H}$ 为 $\mathrm{CO_2}$ 的亨利定律常数，$K_1$ 为溶解 $\mathrm{CO_2}$ 的第一级酸解离常数。$298\ \mathrm{K}$（$K_\mathrm{H} = 3.4\times10^{-2}\ \mathrm{mol\,dm^{-3}\,atm^{-1}}$、$K_1 = 4.45\times10^{-7}$、$K_\mathrm{w} = 1.0\times10^{-14}$）、$p_{\mathrm{CO_2}} = 424\ \mathrm{\mu atm}$ 时，$\mathrm{pH} = 5.60$。若强酸引入浓度为 $a$ 的 $\mathrm{H^+}$（超出强碱阳离子的部分），则
$$
[\mathrm{H^+}] = \frac{a + \sqrt{a^2 + 4(K_\mathrm{H}K_1p_{\mathrm{CO_2}} + K_\mathrm{w})}}{2} .
$$
条件：稀溶液、$\mathrm{CO_3^{2-}}$ 可忽略（pH $8$ 以下成立）、与气相平衡。
:::

::: proof 雨水的电荷平衡 {#proof-rain-ph}
溶液的电荷平衡为 $[\mathrm{H^+}] = [\mathrm{HCO_3^-}] + 2[\mathrm{CO_3^{2-}}] + [\mathrm{OH^-}] + [\mathrm{A^-}]$，其中 $[\mathrm{A^-}] = a$ 为强酸的阴离子（已扣除强碱阳离子）。亨利定律给出 $[\mathrm{CO_2(aq)}] = K_\mathrm{H}p_{\mathrm{CO_2}}$，故 $[\mathrm{HCO_3^-}] = K_1K_\mathrm{H}p_{\mathrm{CO_2}}/[\mathrm{H^+}]$；在雨水的低 pH 下碳酸根可忽略，且 $[\mathrm{OH^-}] = K_\mathrm{w}/[\mathrm{H^+}]$。电荷平衡乘以 $[\mathrm{H^+}]$：
$$
[\mathrm{H^+}]^2 - a[\mathrm{H^+}] - (K_\mathrm{H}K_1p_{\mathrm{CO_2}} + K_\mathrm{w}) = 0,
$$
其正根即第二个结果；令 $a = 0$ 得第一个。数值上，$K_\mathrm{H}K_1p_{\mathrm{CO_2}} = 3.4\times10^{-2}\times4.45\times10^{-7}\times4.24\times10^{-4} = 6.42\times10^{-12}$，故 $[\mathrm{H^+}] = 2.53\times10^{-6}$，$\mathrm{pH} = 5.60$。注意 $\mathrm{CO_2}$ 实际上是一个“开放”储库：溶解不消耗气相，溶解浓度由 $p_{\mathrm{CO_2}}$ 固定，这与加进封闭烧杯的弱酸不同。
:::

所以“清洁”的雨天然就是酸性的，pH 约 $5.6$，而 $\mathrm{CO_2}$ 的升高只使它略微下降（$280\ \mathrm{ppm}$ 时为 pH $5.69$）。实践中，即使偏远地区的雨水也因天然硫酸盐（来自 DMS 和火山）和有机酸而有 pH $5$–$5.6$。**酸雨**通常指 pH 约 $5$ 以下的雨，由人为 $\mathrm{SO_2}$ 和 $\mathrm{NO_x}$ 生成的硫酸和硝酸酸化而成。二十世纪七八十年代欧洲和北美东部受害最重的地区，年均雨水 pH 约 $4.1$–$4.3$，还记录到单次事件 pH 低于 $3$。

::: widget plot
f: -log((x*1e-6 + sqrt((x*1e-6)^2 + 4*(0.034*4.45e-7*p*1e-6 + 1e-14)))/2)/log(10)
x: 0, 100
y: 3.8, 5.8
sliders: p=424:280:2000:1
labels: \mathrm{pH}
caption: 雨水 pH 对所加强酸浓度 $a$（以 $\mathrm{\mu eq\,dm^{-3}}$ 计，已扣除强碱）的曲线，$\mathrm{CO_2}$ 分压由滑块设定（$\mathrm{\mu atm}$），由[[#prop-rain-ph]]在 $298\ \mathrm{K}$ 下作出。约 $5\ \mathrm{\mu eq\,dm^{-3}}$ 以下碳酸缓冲仍然重要，pH 保持在 $5.6$ 附近；之上则 $\mathrm{pH} \approx -\log_{10}a$，$\mathrm{CO_2}$ 几乎无关紧要。$\mathrm{CO_2}$ 加倍只把清洁雨水的 pH 压低 $0.15$（$\log_{10}2$ 的一半）——酸雨是硫和氮的问题，不是碳的问题。
:::

::: example 酸雨的组成与离子平衡 {#ex-ion-balance}
一份雨水样品 pH $4.40$，含以下组分（$\mathrm{\mu mol\,dm^{-3}}$）：$\mathrm{NH_4^+}$ 18、$\mathrm{Na^+}$ 12、$\mathrm{Ca^{2+}}$ 6、$\mathrm{Mg^{2+}}$ 3、$\mathrm{K^+}$ 1、$\mathrm{SO_4^{2-}}$ 25、$\mathrm{Cl^-}$ 14。硝酸根未测。(a) 由离子平衡估算硝酸根。(b) 硫酸盐中有多少是非海盐硫酸盐？（海水的 $\mathrm{SO_4^{2-}/Na^+}$ 摩尔比为 $0.060$。）
::: solution
(a) 用当量计算（$\mathrm{\mu eq\,dm^{-3}}$ = 浓度乘以电荷）。阳离子：$\mathrm{H^+} = 10^{-4.40}\ \mathrm{mol\,dm^{-3}} = 39.8$；$\mathrm{NH_4^+}$ 18；$\mathrm{Na^+}$ 12；$\mathrm{Ca^{2+}}$ 12；$\mathrm{Mg^{2+}}$ 6；$\mathrm{K^+}$ 1；合计 $88.8$。已测阴离子：$\mathrm{SO_4^{2-}}$ 50；$\mathrm{Cl^-}$ 14；合计 64。电中性要求缺失的阴离子补足 $88.8 - 64 = 24.8\ \mathrm{\mu eq\,dm^{-3}}$，故 $[\mathrm{NO_3^-}] \approx 25\ \mathrm{\mu mol\,dm^{-3}}$（碳酸氢根在 pH $4.4$ 可忽略，有机阴离子亦不计）。实测数据的质量控制中，离子平衡反其道而用：电荷不平衡超过约 $10\ \%$ 即提示分析存在问题（[[environmental-chemistry/environmental-monitoring]]）。

(b) 海盐硫酸盐为 $0.060\times12 = 0.72\ \mathrm{\mu mol\,dm^{-3}}$，故非海盐硫酸盐为 $25 - 0.72 = 24.3\ \mathrm{\mu mol\,dm^{-3}}$——基本上全部来自 $\mathrm{SO_2}$ 的氧化。硫酸盐提供 $50$、硝酸盐提供 $25\ \mathrm{\mu eq}$ 的强酸阴离子；铵和钙中和了其中一部分酸，剩下 $40\ \mathrm{\mu eq}$ 的自由 $\mathrm{H^+}$。注意铵虽在雨中中和了酸，却会在土壤中被硝化重新放出酸（$\mathrm{NH_4^+ + 2\,O_2 \rightarrow NO_3^- + 2\,H^+ + H_2O}$），所以“潜在酸度”把它算作酸。
:::
:::

### 影响与趋势

酸沉降造成的损害，与其说取决于雨，不如说取决于雨降落在什么上。石灰岩或富碳酸盐土壤上的集水区很容易中和酸。覆盖花岗岩和其他硅酸盐岩的薄土——斯堪的纳维亚、苏格兰、阿迪朗达克山区、加拿大东部——**酸中和能力**很低：其可交换盐基离子（$\mathrm{Ca^{2+}}$、$\mathrm{Mg^{2+}}$）被淋失，由 $\mathrm{H^+}$ 和 $\mathrm{Al^{3+}}$ 取而代之。pH 低于 $5$ 左右时氢氧化铝溶解，无机单体铝对鱼（在鳃表面沉淀并破坏离子调节）和树木细根都有毒。湖泊失去了鱼群；中欧的森林遭受养分失衡和落叶。酸沉降还腐蚀钙质建筑石材，$\mathrm{CaCO_3 + H_2SO_4 \rightarrow CaSO_4 + H_2O + CO_2}$，生成的石膏壳或被冲走、或起泡剥落。

政策应对——此处仅作中性描述——把国际协定（1979 年《长程越界空气污染公约》及其议定书，从 1985 年第一个《硫议定书》到 1999 年《哥德堡议定书》，后者引入了**临界负荷**：对某一生态系统不会造成显著损害的沉降量上限）与国内措施结合起来，如 1990 年《美国清洁空气法》修正案第四编的 $\mathrm{SO_2}$ 排放交易计划、电厂烟气脱硫、低硫燃料，以及 2000 年代后期起中国燃煤电厂的大规模脱硫。1980 至 2020 年间欧洲和北美的 $\mathrm{SO_2}$ 排放下降了 $80\ \%$ 以上（欧洲环境署和美国 EPA 清单），降水中硫酸盐随之下降。酸化水体的恢复随后出现，但很缓慢，因为土壤必须靠风化重建其盐基离子库。来自 $\mathrm{NO_x}$ 和农业氨的氮沉降下降较少，如今在欧洲常是临界负荷超出量的主要驱动因子。

## 颗粒物、健康与气候

按世界卫生组织的评估，细颗粒物是公共卫生负担最大的空气污染物：WHO 估计 2019 年环境（室外）空气污染造成全球约 $420$ 万例过早死亡，大部分经由 $\mathrm{PM_{2.5}}$。其机理用危害而非剂量描述：小到足以到达肺泡的颗粒在此沉积并被巨噬细胞吞噬；其表面和组分（过渡金属、醌类和其他氧化还原活性有机物）发生活性氧，造成肺部的**氧化胁迫**和炎症，并波及心血管系统（内皮功能障碍、凝血增强、动脉粥样硬化）；最小的颗粒可进入血液循环。流行病学研究把长期 $\mathrm{PM_{2.5}}$ 暴露与心血管和呼吸疾病及肺癌联系起来；国际癌症研究机构 2013 年把室外空气污染和颗粒物列为人类致癌物（1 类），2012 年列出柴油机排气。

颗粒物指导值与标准，截至 2026 年（仅作引用，未作评价）：

| 标准文件 | $\mathrm{PM_{2.5}}$ 年均 | $\mathrm{PM_{2.5}}$ 24 小时 | $\mathrm{PM_{10}}$ 年均 | $\mathrm{PM_{10}}$ 24 小时 |
|---|---|---|---|---|
| WHO 空气质量指导值（2021） | $5$ | $15$ | $15$ | $45$ |
| 欧盟指令 2008/50/EC（现行限值） | $25$ | — | $40$ | $50$ |
| 欧盟指令（EU）2024/2881（2030 年起限值） | $10$ | $25$ | $20$ | $45$ |
| 美国 NAAQS 主标准（PM₂.₅ 年均，2024 年修订） | $9.0$ | $35$ | — | $150$ |

（均以 $\mathrm{\mu g\,m^{-3}}$ 计；24 小时值按百分位数或超标次数定义，各标准的精确统计口径不同，任何比较之前都应核对原文。）WHO 指导值是基于健康的建议值；有约束力的标准经由国家或区域立法程序制定。

颗粒还影响气候。它们把阳光散射回太空（**直接效应**），并作为云凝结核增加云滴数目、减小其尺度，使云更亮、可能更长寿（**间接效应**；增亮即特沃米（Twomey）效应）。IPCC AR6 评估 1750–2019 年气溶胶总有效辐射强迫约为 $-1.1\ \mathrm{W\,m^{-2}}$（很可能范围 $-2.0$ 到 $-0.4$），抵消了温室气体强迫的相当一部分，也是总强迫不确定性的主要来源（[[environmental-chemistry/greenhouse-gases]]）。一个令人不适的后果是：把硫酸盐从空气中清除会揭开部分被掩盖的温室增暖；近期研究把 2010 至 2020 年代观测到的增暖加速部分归因于气溶胶的减少，包括国际海事组织 2020 年对船用燃料硫含量的削减。

::: quiz
一座乡村站记录到寒冷静风的冬夜 $\mathrm{PM_{2.5}}$ 高于温暖的夏日午后，尽管 $\mathrm{SO_2}$、$\mathrm{NO_x}$ 和 $\mathrm{NH_3}$ 的排放相近。哪种解释最符合本课的化学？
- [x] 硝酸铵是半挥发的：其平衡常数 $K_p$ 随温度急剧下降，冷空气中更多硝酸盐转入颗粒相，而夜间浅薄的边界层又把它聚集起来。
- [ ] 冬季 OH 更高，所以硫酸盐生成更快。
- [ ] 冷空气中粗颗粒沉降更快。
- [ ] 冷空气中 $\mathrm{CO_2}$ 更多，形成了碳酸盐颗粒。
::: solution
[[#eq-nh4no3]] 给出 $278\ \mathrm{K}$ 的 $K_p$ 比 $298\ \mathrm{K}$ 低两个数量级，同样的气体在冷空气中凝结为硝酸铵，夜间浅薄的边界层把它聚集起来，更加剧这一效应。OH——连同气相硫酸盐生成——在冬季反而**更低**；沉降速度几乎不依赖温度；$\mathrm{CO_2}$ 不形成颗粒。
:::
:::

::: warning PM₂.₅ 是一个质量，不是一种物质 {#warn-pm-mass}
$\mathrm{PM_{2.5}}$ 是操作性定义——粒径选择性采样器收集在滤膜上、在规定的温湿度下称量的质量。它不是一种化学品：同样的质量，此地可能是硫酸铵，彼地是烟熏生物质烟，别处是沙漠粉尘，来源不同、趋势不同，毒性也可能不同。由此有三点后果：(1) 来源解析需要化学形态分析（离子、有机碳与元素碳、金属），不能只看质量；(2) 硝酸铵和某些有机物等半挥发组分会从受热或暴露过久的滤膜上损失，方法比较必须谨慎；(3)“颗粒数目”和“PM 质量”响应的度量不同——柴油颗粒过滤器除去绝大部分超细烟炱颗粒的数目，对 $\mathrm{PM_{2.5}}$ 质量的改变却小得多。
:::

::: history
罗伯特·安格斯·史密斯（Robert Angus Smith）是英国 1863 年《碱业法》下的首任碱法督察，他分析了曼彻斯特的雨水，并在《空气与雨：化学气候学的开端》（*Air and Rain: The Beginnings of a Chemical Climatology*，1872）中创造了“酸雨”一词。这一问题在 1960 年代被重新发现：瑞典土壤科学家斯万特·奥登（Svante Odén）利用欧洲降水化学监测网络的数据论证（1967–68）斯堪的纳维亚湖泊的酸化源于英国和欧洲大陆排放的硫；吉恩·利肯斯（Gene Likens）等记录了新罕布什尔州哈伯德布鲁克实验林的酸沉降（1972）。这些发现促成了 1979 年《长程越界空气污染公约》。把细颗粒物视为健康危害的现代观点，很大程度上建立在道格拉斯·多克里（Douglas Dockery）等的哈佛六城市研究（《新英格兰医学杂志》，1993）之上，该研究把长期细颗粒暴露与死亡率联系起来。
:::

## 后续内容

这里用到的亨利定律与酸-碱平衡，在 [[environmental-chemistry/natural-waters]] 中就河流、湖泊和海洋的碳酸盐体系作了充分展开。气溶胶的辐射强迫在 [[environmental-chemistry/greenhouse-gases]] 中放入气候收支。沉降的酸和金属在土壤中的归趋属于 [[environmental-chemistry/soils-remediation]]；支撑本章每一个数字的采样、滤膜称重与离子色谱，则在 [[environmental-chemistry/environmental-monitoring]] 和 [[analytical-chemistry/chromatography]] 中讲述。

::: summary
- 气溶胶颗粒按空气动力学直径分类（$\mathrm{PM_{10}}$、$\mathrm{PM_{2.5}}$、超细），分为成核、艾特肯、积累和粗四种模态；细颗粒质量以二次硫酸盐、硝酸盐、铵和有机物为主。
- 斯托克斯沉降 $v_\mathrm{s} = \rho_\mathrm{p}d^2gC_\mathrm{c}/(18\mu)$ 在数天内清除粗颗粒；积累模态颗粒寿命约一周，靠雨水清除，因而输送极远。
- $\mathrm{SO_2}$ 经气相 OH 氧化、并更快地在云中被 $\mathrm{H_2O_2}$（几乎与 pH 无关）和 $\mathrm{O_3}$（仅较高 pH 时快）氧化为硫酸盐；溶解遵循 $K_\mathrm{H}^* = K_\mathrm{H}(1 + K_1/[\mathrm{H^+}] + K_1K_2/[\mathrm{H^+}]^2)$。
- 硝酸铵只在 $p_{\mathrm{NH_3}}p_{\mathrm{HNO_3}} > K_p(T)$ 时生成，而 $K_p$ 随降温急剧下降：它半挥发，在冷季重要。
- 清洁雨水因 $\mathrm{CO_2}$ 而 pH $\approx 5.6$；酸雨（pH $< 5$）来自 $\mathrm{H_2SO_4}$ 和 $\mathrm{HNO_3}$；离子平衡检验分析并揭示缺失的离子。
- 酸沉降通过淋失盐基离子和活化有毒铝危害缓冲差的集水区；1980 年以来 $\mathrm{SO_2}$ 的削减已使其减轻，生态恢复则缓慢。
- $\mathrm{PM_{2.5}}$ 是空气污染的头号健康危害（氧化胁迫与炎症）；WHO 2021 指导值为年均 $5\ \mathrm{\mu g\,m^{-3}}$。气溶胶的 ERF 约 $-1.1\ \mathrm{W\,m^{-2}}$（IPCC AR6）。
:::

## 练习

::: exercise 矿尘颗粒的沉降 {level=1 check="1.6"}
一矿尘颗粒直径 $5.0\ \mathrm{\mu m}$，密度 $2000\ \mathrm{kg\,m^{-3}}$。取 $\mu = 1.81\times10^{-5}\ \mathrm{Pa\,s}$、$C_\mathrm{c} = 1.03$，求其沉降速度。（$v_\mathrm{s}$ 以 $\mathrm{mm\,s^{-1}}$ 计，保留两位有效数字。）
::: solution
$v_\mathrm{s} = 2000\times(5.0\times10^{-6})^2\times9.81\times1.03/(18\times1.81\times10^{-5}) = 1.01\times10^{-6}/3.258\times10^{-4} = 1.55\times10^{-3}\ \mathrm{m\,s^{-1}} \approx 1.6\ \mathrm{mm\,s^{-1}}$。其空气动力学直径为 $5.0\sqrt{2} \approx 7\ \mathrm{\mu m}$（忽略滑移修正的小差异），故计入 $\mathrm{PM_{10}}$ 而不计入 $\mathrm{PM_{2.5}}$。
:::
:::

::: exercise 工业革命前的雨水 {level=1 check="5.69"}
用[[#prop-rain-ph]]求 $298\ \mathrm{K}$ 下与 $280\ \mathrm{\mu atm}$ 的 $\mathrm{CO_2}$ 平衡的纯雨的 pH。（pH 保留两位小数。）
::: solution
$K_\mathrm{H}K_1p = 3.4\times10^{-2}\times4.45\times10^{-7}\times2.80\times10^{-4} = 4.24\times10^{-12}$；加上 $K_\mathrm{w}$ 得 $4.25\times10^{-12}$，故 $[\mathrm{H^+}] = 2.06\times10^{-6}$，$\mathrm{pH} = 5.69$，只比今天高 $0.09$。
:::
:::

::: exercise 干沉降寿命 {level=1 check="2.3"}
二氧化硫在深度 $1.0\ \mathrm{km}$ 的充分混合边界层下、对湿润表面的沉降速度为 $0.50\ \mathrm{cm\,s^{-1}}$。它的干沉降寿命是多少？（以天计，保留两位有效数字。）
::: solution
$\tau = h/v_\mathrm{d} = 1000\ \mathrm{m}/0.0050\ \mathrm{m\,s^{-1}} = 2.0\times10^{5}\ \mathrm{s} = 2.3\ \mathrm{d}$。与约两周的气相 OH 寿命和更快的云内氧化合起来看，这意味着排放的 $\mathrm{SO_2}$ 有很大一部分在源附近以 $\mathrm{SO_2}$ 本身沉降，其余被氧化后以硫酸盐形式远距离输送。
:::
:::

::: exercise 含硫酸的雨水 {level=2 check="4.40"}
与 $424\ \mathrm{\mu atm}$ 的 $\mathrm{CO_2}$ 平衡的雨水还含 $20\ \mathrm{\mu mol\,dm^{-3}}$ 的 $\mathrm{H_2SO_4}$（完全解离），不含碱。求其 pH。（pH 保留两位小数。）
::: solution
强酸提供 $a = 40\ \mathrm{\mu eq\,dm^{-3}} = 4.0\times10^{-5}\ \mathrm{mol\,dm^{-3}}$ 的 $\mathrm{H^+}$（硫酸是二元酸；$\mathrm{p}K_{\mathrm{a2}} = 1.99$ 意味着在此浓度下 $\mathrm{HSO_4^-}$ 基本完全解离）。取 $K = 6.42\times10^{-12} + 10^{-14} = 6.43\times10^{-12}$：$[\mathrm{H^+}] = (4.0\times10^{-5} + \sqrt{1.6\times10^{-9} + 2.57\times10^{-11}})/2 = (4.0\times10^{-5} + 4.032\times10^{-5})/2 = 4.016\times10^{-5}$，故 $\mathrm{pH} = 4.40$。$\mathrm{CO_2}$ 的贡献几乎为零：在这一酸度下溶解的 $\mathrm{CO_2}$ 保持未解离。
:::
:::

::: exercise 更高 pH 的云水 {level=2 check="18"}
对液滴 pH $6.0$ 重做[[#ex-cloud-siv]]。百分之多少的 $\mathrm{SO_2}$ 在水相中？（百分数保留两位有效数字。）
::: solution
$K_1/[\mathrm{H^+}] = 10^{4.14} = 13\,800$，$K_1K_2/[\mathrm{H^+}]^2 = 10^{-9.06+12} = 871$，故 $K_\mathrm{H}^* = 1.23\times(1 + 13\,800 + 871) = 1.81\times10^{4}$。于是 $K_\mathrm{H}^*RTL = 1.81\times10^{4}\times0.08206\times298\times5\times10^{-7} = 0.221$，水相份额为 $0.221/1.221 = 18\ \%$。富氨或富尘、接近中性的云，吸收并氧化 $\mathrm{SO_2}$（尤其经 $\mathrm{O_3}$）比酸性的云快得多。
:::
:::

::: exercise 缺失的阴离子 {level=2 check="34"}
pH $4.20$ 的一份雨水含（$\mathrm{\mu mol\,dm^{-3}}$）$\mathrm{NH_4^+}$ 30、$\mathrm{Na^+}$ 20、$\mathrm{Ca^{2+}}$ 5、$\mathrm{Mg^{2+}}$ 2、$\mathrm{SO_4^{2-}}$ 35、$\mathrm{Cl^-}$ 23。由离子平衡估算硝酸根浓度。（$[\mathrm{NO_3^-}]$ 以 $\mathrm{\mu mol\,dm^{-3}}$ 计，保留两位有效数字。）
::: solution
阳离子：$\mathrm{H^+} = 10^{-4.20} = 63.1$；$\mathrm{NH_4^+}$ 30；$\mathrm{Na^+}$ 20；$\mathrm{Ca^{2+}}$ 10；$\mathrm{Mg^{2+}}$ 4；总计 $127.1\ \mathrm{\mu eq\,dm^{-3}}$。阴离子：$\mathrm{SO_4^{2-}}$ 70；$\mathrm{Cl^-}$ 23；总计 93。硝酸根 $= 127.1 - 93 = 34\ \mathrm{\mu eq\,dm^{-3}}$，即 $[\mathrm{NO_3^-}] \approx 34\ \mathrm{\mu mol\,dm^{-3}}$。氯与钠之比（$23/20 = 1.15$）接近海水值（$1.16$），所以这里的氯离子是海盐而非盐酸；强酸度来自硫酸和硝酸。
:::
:::

::: exercise 有效亨利常数与自我限制 {level=3 check="4.9"}
(a) 证明 $2 < \mathrm{pH} < 6$ 时，与气相 $\mathrm{SO_2}$ 平衡的液滴中总溶解 $\mathrm{S(IV)}$ 近似为 $K_\mathrm{H}K_1p_{\mathrm{SO_2}}/[\mathrm{H^+}]$。(b) 若液滴中唯一的酸是 $\mathrm{S(IV)}$，证明 $[\mathrm{H^+}] \approx (K_\mathrm{H}K_1p_{\mathrm{SO_2}})^{1/2}$，并对 $p_{\mathrm{SO_2}} = 10\ \mathrm{ppb}$（$1.0\times10^{-8}\ \mathrm{atm}$）计算 pH。(c) 解释为什么速率正比于 $[\mathrm{SO_3^{2-}}]$ 的 $\mathrm{O_3}$ 氧化会随硫酸盐积累而减慢。（填入 (b) 的 pH，保留两位有效数字。）
::: hint
(b) 中电荷平衡为 $[\mathrm{H^+}] \approx [\mathrm{HSO_3^-}]$。
:::
::: solution
(a) 在此范围 $K_1/[\mathrm{H^+}] \gg 1$（大致因为 $\mathrm{pH} > \mathrm{p}K_1 + 0.1$）而 $K_2/[\mathrm{H^+}] \ll 1$，所以[[#prop-effective-henry]]的括号项由 $K_1/[\mathrm{H^+}]$ 主导，$[\mathrm{S(IV)}] \approx [\mathrm{HSO_3^-}] = K_\mathrm{H}K_1p/[\mathrm{H^+}]$。(b) 电荷平衡 $[\mathrm{H^+}] = [\mathrm{HSO_3^-}] = K_\mathrm{H}K_1p/[\mathrm{H^+}]$ 给出 $[\mathrm{H^+}]^2 = K_\mathrm{H}K_1p = 1.23\times10^{-1.86}\times1.0\times10^{-8} = 1.70\times10^{-10}$，故 $[\mathrm{H^+}] = 1.30\times10^{-5}$，$\mathrm{pH} = 4.9$。(c) $[\mathrm{SO_3^{2-}}] = K_2[\mathrm{HSO_3^-}]/[\mathrm{H^+}] = K_\mathrm{H}K_1K_2p/[\mathrm{H^+}]^2$：硫酸积累使 $[\mathrm{H^+}]$ 升高，$[\mathrm{SO_3^{2-}}]$ 按其平方下降，臭氧路径因此自我关闭；几乎与 pH 无关的 $\mathrm{H_2O_2}$ 路径则不会。这就是酸性云中硫酸盐生成由 $\mathrm{H_2O_2}$ 主导的原因。
:::
:::

::: exercise 寒夜的硝酸铵 {level=3 check="10"}
用[[#eq-nh4no3]]求 $278\ \mathrm{K}$ 的 $K_p$，以及该温度、$1\ \mathrm{atm}$ 下由游离 $\mathrm{NH_3}$ $5.0\ \mathrm{ppb}$ 和 $\mathrm{HNO_3}$ $3.0\ \mathrm{ppb}$ 生成固体硝酸铵的质量。（质量以 $\mathrm{\mu g\,m^{-3}}$ 计，保留两位有效数字。）
::: solution
$\ln K_p = 84.6 - 24\,220/278 - 6.1\ln(278/298) = 84.6 - 87.12 + 0.424 = -2.10$，故 $K_p = 0.123\ \mathrm{ppb^2}$。解 $(5.0 - x)(3.0 - x) = 0.123$：$x^2 - 8.0x + 14.877 = 0$，$x = (8.0 - \sqrt{64 - 59.51})/2 = (8.0 - 2.119)/2 = 2.94\ \mathrm{ppb}$——硝酸几乎全部耗尽。$278\ \mathrm{K}$ 下的换算因子为 $80.04\times101\,325/(8.314\times278) = 3.51\ \mathrm{\mu g\,m^{-3}\,ppb^{-1}}$，故质量为 $2.94\times3.51 = 10\ \mathrm{\mu g\,m^{-3}}$。当 $K_p$ 远低于分压乘积时，限量反应物（$\mathrm{HNO_3}$）几乎完全转化，颗粒质量由可得到的总硝酸盐量控制——亦即由 $\mathrm{NO_x}$ 排放决定。
:::
:::
