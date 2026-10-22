一锅水在海边于$100\,^\circ\mathrm{C}$沸腾，在高山上约$90\,^\circ\mathrm{C}$沸腾，在真空干燥器里则在室温下沸腾；冰在冰刀下熔化，却不在旁边的托盘里熔化；而一块二氧化碳永远给不出一摊液体，只给一缕白雾。这些事实没有一个关乎化学——每一个里面分子都是同一个$\mathrm{H_2O}$或$\mathrm{CO_2}$——而它们又全都是同一个事实：纯物质的哪一个相稳定，取决于温度与压强，而不同相获胜的区域之间的边界，是斜率确定、可以计算的曲线。掌握了这些曲线的化学家，能预测高压锅里的沸点、液化一种气体所需的压强、冰上方蒸气的组成，以及钻石为什么在你手里不会变成石墨。

产生这一切的条件，就是把[[thermodynamics/free-energy]]的自由能机制用到单一物质上。恒温恒压下，封闭体系朝吉布斯能的极小移动，而对纯物质，摩尔吉布斯能*就是*化学势，$\mu = G_\mathrm{m}$。因此两个相只能共存于化学势相等之处，$\mu_\alpha(T, p) = \mu_\beta(T, p)$；一个相稳定，只当它的$\mu$是可及的最低值。本章其余的一切——克拉珀龙斜率、蒸气压的指数定律、吉布斯相律、冰线的负斜率——都是对这一个方程做计数、求导与积分。我们从[[thermodynamics/second-law]]引进两件原料：一摩尔的基本方程$\mathrm{d}\mu = -S_\mathrm{m}\,\mathrm{d}T + V_\mathrm{m}\,\mathrm{d}p$，以及可逆相变的熵$\Delta_\mathrm{tr}S = \Delta_\mathrm{tr}H/T_\mathrm{tr}$。

## 相、组元与自由度

::: definition 相、组元、相数、自由度 {#def-phase-terms}
**相**是处处均匀的一块物质区域——化学组成与物理状态都均匀——与其他区域之间以性质突变的边界相隔。混合气体是一相；带着自身蒸气气泡的液态水是两相；冰、液态水与蒸气合起来是三相。**组元**是化学上独立的物种，组元数$C$是把体系配成同一状态所需独立物种的最少数；**相数**记为$P$；**自由度**（或**变度**）$F$是在不改变存在相数的前提下可以独立改变的强度变量——温度、压强、各相组成——的数目。
:::

两条计数规则让$C$不至于虚报。其一，被一个平衡或固定比例拴在一起的物种不能都单独计数：体系$\mathrm{CaCO_3(s)} \rightleftharpoons \mathrm{CaO(s)} + \mathrm{CO_2(g)}$含三个物种，却有一个独立反应，所以$C = 3 - 1 = 2$。其二，*由你*而非化学强加的约束同样算数：若让分解在真空中从纯$\mathrm{CaCO_3}$出发进行，气相里每一摩尔$\mathrm{CO_2}$都对应一摩尔$\mathrm{CaO}$，这条额外的比例关系把$C$降到$1$。与自身蒸气平衡的盐水有$C = 2$（$\mathrm{NaCl}$与$\mathrm{H_2O}$）、$P = 2$；只装氩气的密封管有$C = 1$，而$P$可以是1、2或3，取决于你站在$(p, T)$平面的哪一点。

::: definition 纯物质的化学势 {#def-mu-pure}
对**纯物质**，化学势就是摩尔吉布斯能，$\mu \equiv G_\mathrm{m}$。它对温度与压强的依赖由[[thermodynamics/free-energy]]中一摩尔的基本方程给出，
$$
\mathrm{d}\mu = -S_\mathrm{m}\,\mathrm{d}T + V_\mathrm{m}\,\mathrm{d}p ,
$$
于是$\left(\partial\mu/\partial T\right)_p = -S_\mathrm{m}$，$\left(\partial\mu/\partial p\right)_T = V_\mathrm{m}$。因为$S_\mathrm{m} > 0$恒成立，$\mu$随$T$升高而下降；因为$V_\mathrm{m}(\mathrm{g}) \gg V_\mathrm{m}(\mathrm{l}) > 0$，它随压强上升时气体陡、凝聚相缓。
:::

::: proposition 纯物质的相平衡 {#prop-eq-line}
纯物质的两个相$\alpha$与$\beta$恰好平衡于满足
$$
\mu_\alpha(T, p) = \mu_\beta(T, p)
$$
的那些$(p, T)$点。两个变量之间的一个方程一般确定$(p, T)$平面中的一条**曲线**$p = p(T)$——一条**共存线**——而不是一个点；而在线外任一点上，化学势*更低*的那个相就是该点的稳定相。
:::

线与点的逻辑值得说透，因为它就是相图的全部几何。一个条件消去一个自由度：定住$T$，共存压强就被确定；定住$p$，相变温度就被确定。这就是为什么固定压强下一锅沸水守在同一个温度直到烧干，也是为什么液体的蒸气压只是温度的函数。而稳定性那句话——低$\mu$者胜——是$\Delta G < 0$的局域版本：若在某$(p, T)$处$\mu_\mathrm{l} < \mu_\mathrm{g}$，把一摩尔蒸气变成液体就降低$G$，所以蒸气在那里凝结；"$\mu_\mathrm{g} > \mu_\mathrm{l}$"与"稳定相是液体"是同一句话。

## 克拉珀龙方程

共存线有斜率，而斜率是物质的一种属性。

::: proposition 克拉珀龙方程 {#prop-clapeyron}
沿纯物质的任意一条共存线，
$$
\frac{\mathrm{d}p}{\mathrm{d}T} = \frac{\Delta_\mathrm{tr}S}{\Delta_\mathrm{tr}V} = \frac{\Delta_\mathrm{tr}H}{T\,\Delta_\mathrm{tr}V} ,
$$
其中$\Delta_\mathrm{tr}H$、$\Delta_\mathrm{tr}S$、$\Delta_\mathrm{tr}V$是线上温度$T$处相变的摩尔焓、熵与体积变（$\text{tr} = \text{fus}, \text{vap}$或$\text{sub}$）。
:::

::: proof
沿共存线两相始终保持平衡，所以对线上的任意位移$(\mathrm{d}T, \mathrm{d}p)$都有$\mathrm{d}\mu_\alpha = \mathrm{d}\mu_\beta$。代入$\mathrm{d}\mu = -S_\mathrm{m}\,\mathrm{d}T + V_\mathrm{m}\,\mathrm{d}p$，
$$
-S_{\mathrm{m},\alpha}\,\mathrm{d}T + V_{\mathrm{m},\alpha}\,\mathrm{d}p
= -S_{\mathrm{m},\beta}\,\mathrm{d}T + V_{\mathrm{m},\beta}\,\mathrm{d}p
\quad\Longrightarrow\quad
\frac{\mathrm{d}p}{\mathrm{d}T} = \frac{S_{\mathrm{m},\beta} - S_{\mathrm{m},\alpha}}{V_{\mathrm{m},\beta} - V_{\mathrm{m},\alpha}} = \frac{\Delta_\mathrm{tr}S}{\Delta_\mathrm{tr}V}.
$$
在相变温度上两相平衡，故相变可逆，$\Delta_\mathrm{tr}S = \Delta_\mathrm{tr}H/T$（第二定律，[[thermodynamics/second-law]]），即得第二种形式。注意证明用了什么、没用什么：只用了基本方程与可逆性——没有理想气体，没有任何小量近似。克拉珀龙方程是精确的。
:::

::: example 水在$100\,^\circ\mathrm{C}$的蒸气压斜率 {#ex-vap-slope}
水在$373.15\ \mathrm{K}$、$1.013\ \mathrm{bar}$下$\Delta_\mathrm{vap}H = 40.66\ \mathrm{kJ\,mol^{-1}}$（NIST）。把蒸气当理想气体，取$V_\mathrm{m}(\mathrm{l}) = 18.8\ \mathrm{cm^3\,mol^{-1}}$，求液-气线上的$\mathrm{d}p/\mathrm{d}T$。
::: solution
$$
V_\mathrm{m}(\mathrm{g}) = \frac{RT}{p} = \frac{8.314 \times 373.15}{1.013\times 10^{5}}\ \mathrm{m^3\,mol^{-1}} = 30.62\ \mathrm{L\,mol^{-1}},
$$
所以$\Delta_\mathrm{vap}V = 30.62 - 0.0188 = 30.60\ \mathrm{L\,mol^{-1}}$——液体体积只占总量$0.06\,\%$，等于不存在。于是
$$
\frac{\mathrm{d}p}{\mathrm{d}T} = \frac{40\,660\ \mathrm{J\,mol^{-1}}}{373.15\ \mathrm{K} \times 30.60\times 10^{-3}\ \mathrm{m^3\,mol^{-1}}}
= 3.56\times 10^{3}\ \mathrm{Pa\,K^{-1}} = 3.56\ \mathrm{kPa\,K^{-1}} .
$$
把沸点抬高一个开尔文要付$3.6\ \mathrm{kPa} \approx 0.036\ \mathrm{bar}$：工作在$2.0\ \mathrm{bar}$的高压锅换来约$28\ \mathrm{K}$，在大约$120\,^\circ\mathrm{C}$下烹煮——这就是它存在的理由。
:::
:::

::: example 冰-水线的斜率：为什么是负的 {#ex-fusion-slope}
冰在$273.15\ \mathrm{K}$熔化时$\Delta_\mathrm{fus}H = 6.01\ \mathrm{kJ\,mol^{-1}}$（NIST），$0\,^\circ\mathrm{C}$下密度为$\rho(\text{ice}) = 0.9167$、$\rho(\text{water}) = 0.99984\ \mathrm{g\,cm^{-3}}$。求熔化线的$\mathrm{d}p/\mathrm{d}T$。
::: solution
取$M = 18.015\ \mathrm{g\,mol^{-1}}$，
$$
V_\mathrm{m}(\text{ice}) = \frac{18.015}{0.9167} = 19.65\ \mathrm{cm^3\,mol^{-1}}, \qquad
V_\mathrm{m}(\text{water}) = \frac{18.015}{0.99984} = 18.02\ \mathrm{cm^3\,mol^{-1}},
$$
所以$\Delta_\mathrm{fus}V = 18.02 - 19.65 = -1.63\ \mathrm{cm^3\,mol^{-1}}$：冰比液体*更*不致密，熔化使体积收缩。因此
$$
\frac{\mathrm{d}p}{\mathrm{d}T} = \frac{6010\ \mathrm{J\,mol^{-1}}}{273.15\ \mathrm{K}\times\left(-1.63\times 10^{-6}\ \mathrm{m^3\,mol^{-1}}\right)}
= -1.35\times 10^{7}\ \mathrm{Pa\,K^{-1}} = -135\ \mathrm{bar\,K^{-1}} .
$$
负的，而且数值巨大：压强*熔化*冰，而把熔点压低一度需要$135\ \mathrm{bar}$。水、镓、铋、锑是"固体沉入自身熔体"这条规律的经典例外；冰 Ih 那套敞开的氢键网络正是原因所在（[[general-chemistry-2/liquids-solutions]]）。
:::
:::

::: widget contour
f: dH*(1 - x/273.15) + dV*0.1*(y - 1)
x: 250, 290
y: 0, 2500
sliders: dH=6010:5000:7000:10; dV=-1.63:-3:-0.5:0.01
constraint: dH*(1 - x/273.15) + dV*0.1*(y - 1)
gradient: false
caption: $\mu_\text{water} - \mu_\text{ice} \approx \Delta_\text{fus}H\,(1 - T/T_\text{fus}) + \Delta_\text{fus}V\,(p - 1\ \mathrm{bar})$的符号图（颜色），横轴为温度$T$（K），纵轴为压强（bar），熔化焓与（负的）熔化体积各配一个滑块。画出的约束曲线$\mu_\text{water} = \mu_\text{ice}$就是熔化线，从$273.15\ \mathrm{K}$、$1\ \mathrm{bar}$处出发以斜率$-135\ \mathrm{bar\,K^{-1}}$向*左上*方延伸：线上方液体的化学势更低、是稳定相，线下方则是冰。把$\Delta_\text{fus}V$滑成正值——一切普通物质的行为——看直线朝另一侧倾斜。
:::

::: warning 滑冰不是压熔 {#warn-skating}
标准说法——冰刀的压强熔出一层润滑水膜——通不过一次值得做一遍、记一辈子的数量级检验。宽$2\ \mathrm{mm}$、接触长$7\ \mathrm{cm}$的冰刀，以$1.4\ \mathrm{cm^2}$托起$75\ \mathrm{kg}$的滑冰者，压强为$5.3\times 10^{6}\ \mathrm{Pa} \approx 53\ \mathrm{bar}$，只把熔点压低$53/135 \approx 0.4\ \mathrm{K}$。滑冰者在$-10\,^\circ\mathrm{C}$下滑得畅快，那里需要的压强是$1350\ \mathrm{bar}$——同一把冰刀上得压约$960\ \mathrm{kg}$的重物。真正的润滑剂是两样东西的组合：冰刀擦冰的摩擦生热，以及*表面预熔层*——冰最外几层分子在远低于$0\,^\circ\mathrm{C}$时就已无序、呈准液态，因为表面分子头顶缺少邻居。压熔是真实的——复冰现象，切冰细线下方冰的重新冻结，就靠它——但对滑冰而言它至多贡献零点几度。关于警告的警告：诚实的计算而非民间传说，才是克拉珀龙方程的用处。
:::

## 克劳修斯-克拉珀龙方程

蒸气压才是化学家真正要用的数，而沿气-液与气-固线，克拉珀龙方程会壮观地简化。

::: proposition 克劳修斯-克拉珀龙方程 {#prop-cc}
对进入气相的相变（$\text{tr} = \text{vap}$或$\text{sub}$），在远低于临界点、蒸气可视为理想气体且$V_\mathrm{m}(\mathrm{g}) \gg V_\mathrm{m}(\text{cond})$的温度下，
$$
\frac{\mathrm{d}\ln p}{\mathrm{d}T} = \frac{\Delta_\mathrm{tr}H}{R\,T^{2}} ,
$$
若$\Delta_\mathrm{tr}H$在区间内大致不变，则
$$
\ln\frac{p_2}{p_1} = -\frac{\Delta_\mathrm{tr}H}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right)
\qquad\text{等价地}\qquad
\ln p = -\frac{\Delta_\mathrm{tr}H}{R}\cdot\frac{1}{T} + \text{const}.
$$
因此$\ln p$对$1/T$作图是一条斜率$-\Delta_\mathrm{tr}H/R$的直线——与[[general-chemistry-2/entropy-free-energy]]中$K$的温度依赖是同一种范特霍夫几何。
:::

::: proof
从克拉珀龙方程$\mathrm{d}p/\mathrm{d}T = \Delta_\mathrm{tr}H/(T\,\Delta_\mathrm{tr}V)$出发，把$\Delta_\mathrm{tr}V = V_\mathrm{m}(\mathrm{g}) - V_\mathrm{m}(\text{cond})$换成$RT/p$：丢掉凝聚相体积（$373\ \mathrm{K}$下它只占$0.06\,\%$），并把蒸气当理想气体（在这些公式常用的几十分之一个大气压下足够好）。于是$\mathrm{d}p/\mathrm{d}T = p\,\Delta_\mathrm{tr}H/(RT^2)$；两边除以$p$得$\mathrm{d}\ln p/\mathrm{d}T$，再在$\Delta_\mathrm{tr}H$恒定的假设下从$(T_1, p_1)$积分到$(T_2, p_2)$，即得直线形式。推导里焊死了三个近似——理想蒸气、凝聚相体积可忽略、$\Delta_\mathrm{tr}H$与温度无关——前两个远比第三个可靠。
:::

::: example 山上与高压锅里的沸腾 {#ex-boil-altitude}
水在蒸气压等于外压时沸腾。取$\Delta_\mathrm{vap}H = 40.66\ \mathrm{kJ\,mol^{-1}}$，并以$373.15\ \mathrm{K}$处$p = 1.013\ \mathrm{bar}$为锚点，求（a）大气压为$0.70\ \mathrm{bar}$处和（b）设定$2.0\ \mathrm{bar}$的高压锅里的沸点。
::: solution
$$
\text{(a)}\quad \frac{1}{T_2} = \frac{1}{373.15} - \frac{R}{\Delta_\mathrm{vap}H}\ln\frac{0.70}{1.013}
= 2.680\times 10^{-3} + 7.57\times 10^{-5} = 2.756\times 10^{-3}\ \mathrm{K^{-1}},
$$
所以$T_2 = 362.9\ \mathrm{K} = 89.8\,^\circ\mathrm{C}$：三千米海拔上丢掉十度烹煮温度，这就是高海拔面包配方要减水升温的原因。
$$
\text{(b)}\quad \frac{1}{T_2} = \frac{1}{373.15} - \frac{8.314}{40\,660}\ln\frac{2.0}{1.013}
= 2.680\times 10^{-3} - 1.39\times 10^{-4} = 2.541\times 10^{-3}\ \mathrm{K^{-1}},
$$
所以$T_2 = 393.6\ \mathrm{K} = 120.4\,^\circ\mathrm{C}$。烹煮速率大约每$10\ \mathrm{K}$翻一倍，$20\ \mathrm{K}$就换来四倍：高压锅是一笔用约$1\ \mathrm{bar}$买来的热力学买卖。
:::
:::

::: widget plot
f: exp(13.12 - dH*1000/(8.314*x))
x: 280, 400
y: 0, 2.6
sliders: dH=40.7:35:45:0.1
hlines: 1.013
vlines: 373.15
labels: p_\text{vap} \text{ / bar}
caption: 水的克劳修斯-克拉珀龙曲线$p_\text{vap}(T) = \exp\!\left(13.12 - \Delta H_\text{vap}/RT\right)$（单位bar），蒸发焓（单位$\mathrm{kJ\,mol^{-1}}$）配在滑块上。水平线是一个大气压：曲线与它相交之处，液体沸腾。把$\Delta H_\text{vap}$滑大，曲线绕支点转动、在$1/T$上变得更陡——液体被束缚得越紧，蒸气压随温度上升得越猛烈——交点即沸点随之移动。这条指数曲线与阿伦尼乌斯图是同一副形状，理由也相同：两者数的都是能量足以逃逸的分子份额。
:::

::: example 由两个蒸气压求冰的$\Delta_\text{sub}H$ {#ex-dhsub-ice}
冰的蒸气压在$-10\,^\circ\mathrm{C}$为$259.9\ \mathrm{Pa}$，在$-30\,^\circ\mathrm{C}$为$38.0\ \mathrm{Pa}$（CRC）。估算此区间的$\Delta_\text{sub}H$，并与熔化焓、蒸发焓核对。
::: solution
$$
\Delta_\text{sub}H = \frac{R\,\ln(p_1/p_2)}{1/T_2 - 1/T_1}
= \frac{8.314 \times \ln(259.9/38.0)}{\dfrac{1}{243.15} - \dfrac{1}{263.15}}\ \mathrm{J\,mol^{-1}}
= \frac{8.314 \times 1.923}{3.126\times 10^{-4}} = 51.1\ \mathrm{kJ\,mol^{-1}} .
$$
核对：升华是先熔化后蒸发，而焓是状态函数，所以$273\ \mathrm{K}$下$\Delta_\text{sub}H = \Delta_\text{fus}H + \Delta_\text{vap}H = 6.01 + 45.05 = 51.1\ \mathrm{kJ\,mol^{-1}}$（NIST）。两条独立路线在$20\ \mathrm{K}$跨度上四位数字一致——记账法的一次痛快时刻，也提醒我们蒸气压测量是一台名正言顺的量热计。
:::
:::

::: widget plot
f: 13.12 - dHw*1000/(8.314*x); 13.22 - dHe*1000/(8.314*x)
x: 260, 400
y: -6, 4
sliders: dHw=40.7:30:55:0.1; dHe=38.6:30:55:0.1
labels: \text{水}; \text{乙醇}
caption: 水与乙醇的$\ln(p/\mathrm{bar})$对温度$T$的图，每条都是克劳修斯-克拉珀龙直线$\ln p = \text{const} - \Delta H_\text{vap}/RT$，蒸发焓（单位$\mathrm{kJ\,mol^{-1}}$）各配一个滑块，两条都锚定在一个大气压下沸腾。对$1/T$的斜率是$-\Delta H_\text{vap}/R$：水的线更陡，它的$\Delta H_\text{vap}$为$40.7\ \mathrm{kJ\,mol^{-1}}$、乙醇为$38.6$，这正是水的氢键网络在蒸气压上留下的签名。把任一个焓滑到零，直线就塌成一道水平墙——没有蒸发焓的液体，就没有随温度变化的蒸气压，也没有沸点。
:::

多数液体的蒸发熵$\Delta_\text{vap}S = \Delta_\text{vap}H/T_\text{b}$都在$85$–$88\ \mathrm{J\,K^{-1}\,mol^{-1}}$附近——特劳顿（Trouton）规则，经验而粗糙——因为蒸发到处买到的平动熵大致相同；水的$109$高居区间之上，因为蒸气还得拆掉氢键（[[general-chemistry-2/liquids-solutions]]）。

::: quiz
下列哪一项*不是*推导积分形式的克劳修斯-克拉珀龙方程$\ln(p_2/p_1) = -\Delta_\text{vap}H\,R^{-1}(1/T_2 - 1/T_1)$时用到的假设？
- [x] 液体的摩尔体积与温度无关。
- [ ] 蒸气表现为理想气体。
- [ ] 液体的摩尔体积相对蒸气可忽略。
- [ ] $\Delta_\text{vap}H$在温度区间内大致恒定。
::: solution
液体的摩尔体积并没有被假设恒定——它因为相对$V_\mathrm{m}(\mathrm{g})$可忽略而被整个丢掉，所以推导根本用不到它的温度依赖。其余三项正是证明里列出的近似；其中$\Delta H$恒定那条最弱，克希霍夫修正形式的练习量化了它的代价。
:::
:::

## 相律

::: proposition 吉布斯相律 {#prop-phase-rule}
$C$个组元、$P$个相平衡共存、只作$pV$功的体系，自由度数为
$$
F = C - P + 2 .
$$
:::

::: proof
数强度变量与它们之间的关系。指定一个相的状态需要$T$、$p$和$C - 1$个摩尔分数（第$C$个等于$1$减其余），所以$P$个相共带$2 + P(C - 1)$个变量——$T$与$p$是共享的，因为平衡时它们跨相相等。平衡条件就是化学势的等式：每个组元的$\mu_i$必须在全部$P$个相中相等，每个组元$P - 1$个独立方程，共$C(P - 1)$个。因此
$$
F = 2 + P(C - 1) - C(P - 1) = 2 + PC - P - CP + C = C - P + 2 . \qquad \blacksquare
$$
计数就是全部内容：相律不是一条深刻的新定律，而是把条件$\mu_\alpha = \mu_\beta$对每个组元、每对相逐一记下的账。
:::

::: example 数自由度：水与它的相点 {#ex-freedom-count}
纯水$C = 1$：（a）液态水、（b）与自身蒸气平衡的液体、（c）冰、液态水与蒸气共存，各有多少自由度？答案意味着什么？
::: solution
（a）$F = 1 - 1 + 2 = 2$：单一相占据$(p, T)$平面的一片*面积*——两个变量都自由。（b）$F = 1 - 2 + 2 = 1$：两相活在一条*线*上；定$T$则$p$就是蒸气压，定$p$则$T$就是沸点。（c）$F = 1 - 3 + 2 = 0$：三相交于一个*点*，即三相点，纯水的被固定在$273.16\ \mathrm{K}$、$611.66\ \mathrm{Pa}$（NIST）——毫无自由可言，这正是水的三相点被选来定义开尔文的原因。一般规律——一相是面、两相是线、三相是点——就是把相律当几何来读，它对每个单组元图都成立，二氧化碳也不例外。
:::
:::

于是水的相图自己会说话。液-气线从三相点（$273.16\ \mathrm{K}$、$6.12\ \mathrm{mbar}$）上行到**临界点**$647.10\ \mathrm{K}$、$220.64\ \mathrm{bar}$（NIST），在那里液体与蒸气变得不可区分，直线就此终止——线外，超临界水兼具液体的密度与气体的穿透力。固-气线带着升华斜率从三相点下行。而熔化线向*左*倾，斜率$-135\ \mathrm{bar\,K^{-1}}$；几百巴之上，冰的相图分岔成若干晶型（冰 II、III、V、VI……），各有自己的三相点——总数十几处——因为压强能把氢键网络重排成更致密的结构。

二氧化碳是有教益的对照。它的三相点在$216.6\ \mathrm{K}$、$5.18\ \mathrm{bar}$（CRC）——在一个大气压*之上*。$1\ \mathrm{bar}$下没有液相分支可走：加热固体$\mathrm{CO_2}$，你沿升华线而行，直到它在$194.7\ \mathrm{K}$（$-78.5\,^\circ\mathrm{C}$）处达到$1.013\ \mathrm{bar}$，固体径直变成蒸气。干冰的"烟"是冷空气从空气中凝出的普通水雾，不是二氧化碳本身——它无色。临界点$304.1\ \mathrm{K}$、$73.8\ \mathrm{bar}$之上，超临界$\mathrm{CO_2}$是廉价、可调的溶剂——低因咖啡除咖啡因就靠它——因为它的密度、从而它的溶解能力，可以用压强连续地旋钮。

::: warning 三相点不是熔点 {#warn-triple-point}
两者都是"冰与水共存之处"，又都在$273\ \mathrm{K}$附近，所以不断被混为一谈——但它们是两个实验。纯水的**三相点**，$273.16\ \mathrm{K}$、$611.66\ \mathrm{Pa}$，是不变量（$F = 0$）：唯一的状态，复现精度达十分之几毫开尔文，这就是它直到2019年一直定义开尔文的原因。**熔点**则是冰-水线在*你恰好所在的那个压强*上的位置：在$1.013\ \mathrm{bar}$下，仅$-135\ \mathrm{bar\,K^{-1}}$的斜率就把它压低$1.007/135 \approx 0.0075\ \mathrm{K}$，普通水里溶解的空气再压低约$0.0025\ \mathrm{K}$（依数效应，[[thermodynamics/mixtures]]）。教科书里的$273.15\ \mathrm{K}$是一个大气压下空气饱和水的熔点；三相点是自身蒸气下纯水的$273.16\ \mathrm{K}$。两个不同的点，相距千分之七开尔文，也是考试最爱的辨析。
:::

::: history 从克拉珀龙到临界点 {#hist-phase-rule}
克拉珀龙（Clapeyron）在1834年用$pV$语言重述了卡诺（Carnot）的热机，并写下以他名字命名的斜率关系；克劳修斯（Clausius）在1850年把它化为现代形式，与第二定律联用，从蒸气压算出潜热——即克劳修斯-克拉珀龙方程。法拉第（Faraday）早在1823年就液化了氯气和一小批"永久"气体，并两度目睹二氧化碳的弯月面在约$31\,^\circ\mathrm{C}$消失，却不知其含义。安德鲁斯（Andrews）把这一消失做成他1869年贝克利讲座的主题《气体与液体物质状态的连续性》：在物质特有的**临界温度**之上，任何压强都不能把气体液化；在其下，液与气判然两分。拉姆塞（Ramsay）与杨（Young）随后在1880年代用等容法把蒸气压测到四位数字，把$\ln p$对$1/T$的直线变成蒸发焓的常规来源。相律本身，只是吉布斯（Gibbs）1876年《多相物质的平衡》里的一页——那篇巨著的历史已在[[thermodynamics/second-law]]中讲过——它花了二十年才被消化，部分因为它写在康涅狄格、读在欧洲。
:::

## 为什么只有一个相是稳定的：$\mu(T)$曲线

::: proposition 稳定性与$\mu(T)$的形状 {#prop-stability}
在固定压强下，一个相的化学势作为温度的函数满足
$$
\left(\frac{\partial \mu}{\partial T}\right)_p = -S_\mathrm{m} < 0, \qquad
\left(\frac{\partial^2 \mu}{\partial T^2}\right)_p = -\frac{C_{p,\mathrm{m}}}{T} < 0 .
$$
所以每个相的$\mu(T)$曲线都下降、且向上凸（向下弯）；又因$S_\mathrm{m}(\mathrm{g}) \gg S_\mathrm{m}(\mathrm{l}) > S_\mathrm{m}(\mathrm{s})$，蒸气曲线降得最快，固体曲线最慢。每个温度下的稳定相是曲线最低的那个，随$T$升高，最低曲线按固→液→气切换。每次切换两条曲线*相交*，故$\mu$连续而斜率跳变$-\Delta_\mathrm{tr}S \ne 0$：凡此相变皆为**一级**。
:::

::: proof
两个导数都由定压下的$\mathrm{d}\mu = -S_\mathrm{m}\,\mathrm{d}T + V_\mathrm{m}\,\mathrm{d}p$得出：第一个是$\mathrm{d}T$的系数，第二个再对它求导，$(\partial(-S_\mathrm{m})/\partial T)_p = -C_{p,\mathrm{m}}/T$，其负号成立是因为稳定相的热容为正（[[thermodynamics/heat-capacity-adiabatic]]）。斜率的排序就是摩尔熵的排序，而气体熵超出液体者达$\Delta_\mathrm{vap}S \approx 85$–$109\ \mathrm{J\,K^{-1}\,mol^{-1}}$——远超熔化的$\approx 22$。三条下降、上凸且斜率严格有序的曲线，两两至多相交一次，所以定压加热时，下包络的最小值按顺序走过各相。交点处$\mu_\alpha = \mu_\beta$（平衡）而$\mathrm{d}\mu_\alpha/\mathrm{d}T \ne \mathrm{d}\mu_\beta/\mathrm{d}T$，即$S_{\mathrm{m},\alpha} \ne S_{\mathrm{m},\beta}$，同样$V_{\mathrm{m},\alpha} \ne V_{\mathrm{m},\beta}$：熵与体积不连续地跳变，这正是一级的含义。
:::

这幅图景解释的远多于它索取的。它说明相图的共存线绝非巧合：蒸气压曲线*就是*蒸气曲线沉到液体曲线下方的点的轨迹。它说明为什么一切纯物质的相变都是一级的——两个不同相的斜率$-S_\mathrm{m}$不可能在交点处相等——而二级行为（$\mu$与斜率都连续、曲率跳变）属于临界点，那里发散的是$C_{p,\mathrm{m}}$。它也让亚稳态变得显然而非悖谬：$263\ \mathrm{K}$的过冷水坐在液体曲线上，那是$\mu$的*局域*极小——冰曲线更低，但要到达它必须先成核，而成核是[[general-chemistry-2/liquids-solutions|动力学与界面]]的事，不是平衡的事。微波炉里的过热液体、膨胀云室里的云雾、烧瓶里的沸石，讲的是同一课：平衡说哪条曲线最低；走到那里需要一颗种子。

## 后续内容

条件$\mu_\alpha = \mu_\beta$沿两个方向推广，两个方向都是后面的章节。加上第二个组元，化学势获得组成依赖：拉乌尔定律、亨利定律、依数性质与二组元的温度-组成图在[[thermodynamics/mixtures]]，海水里析出冰的冻结线就是本章的熔化线隔着溶液来读。加上一个反应，平衡条件$\sum_i \nu_i \mu_i = 0$产出反应吉布斯能与$\Delta_\mathrm{r}G^\circ = -RT\ln K$（[[thermodynamics/reaction-equilibrium]]）；那里的范特霍夫方程就是本章克劳修斯-克拉珀龙方程换了反应的标签，石灰石的分解压强则是一道$C = 2$的相律题。临界点在这里被当作一条线的终点，在[[statistical-thermodynamics/real-gases-liquids]]里却是起点：范德华方程由自身的平坦拐点给出$T_\mathrm{c}$、$p_\mathrm{c}$与$V_\mathrm{c}$。升华线与熔化线的低温端——$\Delta_\text{sub}H$为何随$T \rightarrow 0$变得与温度无关、斜率为何趋平——由第三定律与[[statistical-thermodynamics/quantum-statistics]]中$T^3$的热容决定。测量的一面（蒸气压、气体温度计、道尔顿修正）在[[general-chemistry-1/gases]]，我们求导的机器在[[thermodynamics/free-energy]]与[[thermodynamics/second-law]]，而让冰线倾斜的水的反常则在[[general-chemistry-2/liquids-solutions]]。

::: summary
- 纯物质$\mu = G_\mathrm{m}$，且$\mathrm{d}\mu = -S_\mathrm{m}\,\mathrm{d}T + V_\mathrm{m}\,\mathrm{d}p$；两相共存于$\mu_\alpha(T,p) = \mu_\beta(T,p)$之处，$\mu$更低的相是稳定相。
- 两个变量之间的一个平衡条件确定一条共存*线*；其斜率即克拉珀龙方程$\mathrm{d}p/\mathrm{d}T = \Delta_\mathrm{tr}H/(T\,\Delta_\mathrm{tr}V)$，对一切相变精确。
- 蒸发与升华时，克拉珀龙方程积分成$\ln p = -\Delta_\text{tr}H/(RT) + \text{const}$：蒸气压是$-1/T$的指数函数，沸腾就是$p_\text{vap}$与外压的相交。
- 冰线斜率$-135\ \mathrm{bar\,K^{-1}}$：压强能熔化冰，但滑冰靠的是摩擦与表面预熔，不是压强。
- 相律$F = C - P + 2$把$\mu$等式的数目从变量中扣除：一相、两相、三相对应面、线、点；水的三相点（$273.16\ \mathrm{K}$、$611.66\ \mathrm{Pa}$）是不变量，临界点是$647.10\ \mathrm{K}$、$220.64\ \mathrm{bar}$。
- $\mathrm{CO_2}$的三相点在$5.18\ \mathrm{bar}$，高于一个大气压，所以干冰在$194.7\ \mathrm{K}$升华；$304.1\ \mathrm{K}$、$73.8\ \mathrm{bar}$之上它是超临界的。
- $\mu(T)$曲线以斜率$-S_\mathrm{m}$下降、以曲率$-C_{p,\mathrm{m}}/T$向下弯；曲线之交是一级相变，亚稳态是等待晶核的局域极小。
:::

## 练习

::: exercise 真空干燥器里的沸腾 {level=1 check="354"}
压强降到$0.50\ \mathrm{bar}$时，水在什么温度沸腾？取$\Delta_\text{vap}H = 40.66\ \mathrm{kJ\,mol^{-1}}$，并以$373.15\ \mathrm{K}$处$p = 1.013\ \mathrm{bar}$为锚点。（$T$以K为单位，三位有效数字。）
::: solution
$$
\frac{1}{T} = \frac{1}{373.15} - \frac{8.314}{40\,660}\ln\frac{0.50}{1.013}
= 2.680\times 10^{-3} + 1.44\times 10^{-4} = 2.824\times 10^{-3}\ \mathrm{K^{-1}},
$$
所以$T = 354\ \mathrm{K}$（$80.9\,^\circ\mathrm{C}$）。$0.50\ \mathrm{bar}$下水在$81\,^\circ\mathrm{C}$沸腾；再抽就向室温走来，这就是温热样品在真空中不加热也能烘干的原因。
:::
:::

::: exercise 由熔化与蒸发求升华焓 {level=1 check="51.1"}
用$273.15\ \mathrm{K}$下的$\Delta_\text{fus}H = 6.01\ \mathrm{kJ\,mol^{-1}}$与$\Delta_\text{vap}H = 45.05\ \mathrm{kJ\,mol^{-1}}$（NIST），求该温度下冰的$\Delta_\text{sub}H$。（以$\mathrm{kJ\,mol^{-1}}$为单位。）
::: solution
升华是先熔化后蒸发，而焓是状态函数（赫斯定律，[[thermodynamics/first-law]]）：
$$
\Delta_\text{sub}H = \Delta_\text{fus}H + \Delta_\text{vap}H = 6.01 + 45.05 = 51.1\ \mathrm{kJ\,mol^{-1}} .
$$
熵也满足同一加法，$\Delta_\text{sub}S = \Delta_\text{fus}S + \Delta_\text{vap}S$，这就是为什么在$\ln p$对$1/T$的图上升华曲线比蒸发曲线更陡：升华一次付两张账单。
:::
:::

::: exercise 自由度的计数 {level=1}
给出下列各系统的$C$、$P$与$F$：（a）$300\ \mathrm{K}$、$1\ \mathrm{bar}$下的氩气；（b）与自身蒸气平衡的液态氩；（c）含未溶固体糖及其蒸气的饱和糖水（把蔗糖与水当组元）；（d）冰、液态水与水蒸气共存。
::: solution
（a）$C = 1$，$P = 1$，$F = 2$：两个变量都自由。（b）$C = 1$，$P = 2$，$F = 1$：一个自由变量，蒸气压线。（c）$C = 2$，$P = 3$（固体糖、溶液、蒸气），$F = 2 - 3 + 2 = 1$：定$T$下蒸气压与溶解度都被固定——不改温度，就改不了饱和溶液的浓度。（d）$C = 1$，$P = 3$，$F = 0$：三相点，$273.16\ \mathrm{K}$、$611.66\ \mathrm{Pa}$，一无所有。
:::
:::

::: exercise 由两个蒸气压求$\Delta_\text{sub}H$ {level=2 check="51.2"}
冰的蒸气压在$-20\,^\circ\mathrm{C}$为$103.3\ \mathrm{Pa}$，在$-30\,^\circ\mathrm{C}$为$38.0\ \mathrm{Pa}$（CRC）。估算此区间的$\Delta_\text{sub}H$。（以$\mathrm{kJ\,mol^{-1}}$为单位，三位有效数字。）
::: solution
$$
\Delta_\text{sub}H = \frac{R\,\ln(p_1/p_2)}{1/T_2 - 1/T_1}
= \frac{8.314 \times \ln(103.3/38.0)}{\dfrac{1}{243.15} - \dfrac{1}{253.15}}
= \frac{8.314 \times 1.000}{1.625\times 10^{-4}} = 51.2\ \mathrm{kJ\,mol^{-1}} .
$$
与$273\ \mathrm{K}$下$\Delta_\text{fus}H + \Delta_\text{vap}H = 51.1\ \mathrm{kJ\,mol^{-1}}$一致；多出的零头是$\Delta_\text{sub}H$的缓慢漂移——热容使焓在低温下更大。
:::
:::

::: exercise 冰-水线的斜率 {level=2 check="-135"}
用$273.15\ \mathrm{K}$下的$\Delta_\text{fus}H = 6.01\ \mathrm{kJ\,mol^{-1}}$及密度$0.9167$（冰）与$0.99984\ \mathrm{g\,cm^{-3}}$（水），计算冰熔化线的$\mathrm{d}p/\mathrm{d}T$。（以$\mathrm{bar\,K^{-1}}$为单位，三位有效数字。）
::: solution
$\Delta_\text{fus}V = 18.015\left(1/0.99984 - 1/0.9167\right)\ \mathrm{cm^3\,mol^{-1}} = -1.63\ \mathrm{cm^3\,mol^{-1}}$，所以
$$
\frac{\mathrm{d}p}{\mathrm{d}T} = \frac{6010}{273.15 \times (-1.63\times 10^{-6})}\ \mathrm{Pa\,K^{-1}}
= -1.35\times 10^{7}\ \mathrm{Pa\,K^{-1}} = -135\ \mathrm{bar\,K^{-1}} .
$$
负号来自熔化的体积*减小*；数值说每开尔文$135\ \mathrm{bar}$，这就是警告里的滑冰故事不可能讲成压强故事的原因。
:::
:::

::: exercise 乙醇在$25\,^\circ\mathrm{C}$的蒸气压 {level=2 check="7.6"}
乙醇在$1.013\ \mathrm{bar}$下沸点为$351.4\ \mathrm{K}$，$298\ \mathrm{K}$时$\Delta_\text{vap}H = 42.3\ \mathrm{kJ\,mol^{-1}}$（NIST）。估算它在$298.15\ \mathrm{K}$的蒸气压。（以$\mathrm{kPa}$为单位，两位有效数字。）
::: solution
$$
p = 101.325\ \mathrm{kPa}\times\exp\!\left[-\frac{42\,300}{8.314}\left(\frac{1}{298.15} - \frac{1}{351.4}\right)\right]
= 101.325 \times e^{-2.588} = 7.6\ \mathrm{kPa}.
$$
实测值为$7.9\ \mathrm{kPa}$；若改用沸点处的焓$38.6\ \mathrm{kJ\,mol^{-1}}$会得到$9.6\ \mathrm{kPa}$，所以把$\Delta_\text{vap}H$取在积分*终点*温度附近，在这里值$25\,\%$——$\Delta H$恒定的假设是克劳修斯-克拉珀龙方程最薄的一环。
:::
:::

::: exercise 克希霍夫修正后的蒸气压 {level=3 check="3.27"}
只丢掉$\Delta H$恒定的近似：取$\Delta_\text{vap}H(T) = \Delta_\text{vap}H(T_1) + \Delta_\text{vap}C_p\,(T - T_1)$，其中$\Delta_\text{vap}C_p = C_{p,\mathrm{m}}(\mathrm{g}) - C_{p,\mathrm{m}}(\mathrm{l}) = -41.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$，把$\mathrm{d}\ln p/\mathrm{d}T = \Delta_\text{vap}H/(RT^2)$从$T_1 = 373.15\ \mathrm{K}$（$p_1 = 101.325\ \mathrm{kPa}$）积分到$298.15\ \mathrm{K}$，求$25\,^\circ\mathrm{C}$下水的蒸气压。（以$\mathrm{kPa}$为单位，三位有效数字。）
::: solution
由$\int (\Delta H_1 + \Delta C_p(T - T_1))/T^2\,\mathrm{d}T = -\Delta H_1/T + \Delta C_p(\ln T + T_1/T)$，
$$
\ln\frac{p_2}{p_1} = \frac{1}{R}\left[\Delta_\text{vap}H(T_1)\left(\frac{1}{T_1} - \frac{1}{T_2}\right) + \Delta_\text{vap}C_p\left(\ln\frac{T_2}{T_1} + \frac{T_1}{T_2} - 1\right)\right].
$$
代入数字：$\Delta_\text{vap}H(T_1)(1/T_1 - 1/T_2) = 40\,660 \times (-6.741\times 10^{-4}) = -27.41\ \mathrm{J\,mol^{-1}}$，$\Delta_\text{vap}C_p(-0.2244 + 0.2516) = -41.7 \times 0.0272 = -1.13\ \mathrm{J\,mol^{-1}}$，故$\ln(p_2/p_1) = -28.54/8.314 = -3.433$：
$$
p_2 = 101.325\ \mathrm{kPa}\times e^{-3.433} = 3.27\ \mathrm{kPa}.
$$
与NIST值$3.17\ \mathrm{kPa}$相比差$3\,\%$——而$\Delta H$恒定的形式给出$3.75\ \mathrm{kPa}$，偏高$18\,\%$。一次克希霍夫修正（[[thermodynamics/heat-capacity-adiabatic]]）把误差缩小到六分之一，因为$\Delta_\text{vap}H$从$373$冷到$298\ \mathrm{K}$确实长了$3.1\ \mathrm{kJ\,mol^{-1}}$。
:::
:::

::: exercise 推导并应用相律 {level=3}
仿照命题的证明，通过计数变量与化学势等式推导$F = C - P + 2$，并把它用于两个固体各成一相、$\mathrm{CO_2}$是唯一气体的系统$\mathrm{CaCO_3(s)} \rightleftharpoons \mathrm{CaO(s)} + \mathrm{CO_2(g)}$。自由度是多少？这个答案对分解压强说了什么？
::: solution
变量：$T$、$p$，以及$P$个相中每个相的$C - 1$个摩尔分数，即$2 + P(C-1)$。关系：每个组元的$\mu_i$跨所有相相等，共$C(P-1)$个方程。故$F = 2 + P(C-1) - C(P-1) = C - P + 2$。对分解的石灰石：三个物种、一个平衡关系，故$C = 2$；三个相（两固一气），故$P = 3$；于是$F = 2 - 3 + 2 = 1$。一个自由度意味着气体组成与压强*不*独立于$T$：分解压强$p(\mathrm{CO_2})$只是温度的函数，恰如[[general-chemistry-2/entropy-free-energy]]中石灰窑计算由$\Delta_\mathrm{r}G^\circ = -RT\ln K$所得。还没算自由能，相律就已经看见了——计数定理所为何在。
:::
:::

::: exercise 由范德华方程求临界点 {level=3 check="0.375"}
临界点是液-气线的顶端，两相在此变得全同；热力学上它是等温线的平坦拐点，$\left(\partial p/\partial V\right)_T = \left(\partial^2 p/\partial V^2\right)_T = 0$。把这两个条件用于范德华方程$p = RT/(V_\mathrm{m} - b) - a/V_\mathrm{m}^2$，用$a$、$b$与$R$表示$V_{\mathrm{m},\mathrm{c}}$、$T_\mathrm{c}$与$p_\mathrm{c}$，并计算临界压缩因子$Z_\mathrm{c} = p_\mathrm{c}V_{\mathrm{m},\mathrm{c}}/(RT_\mathrm{c})$。（$Z_\mathrm{c}$以小数表示。）
::: solution
求导得$\partial p/\partial V_\mathrm{m} = -RT/(V_\mathrm{m}-b)^2 + 2a/V_\mathrm{m}^3$与$\partial^2 p/\partial V_\mathrm{m}^2 = 2RT/(V_\mathrm{m}-b)^3 - 6a/V_\mathrm{m}^4$。令两者为零，各自化为$RT_\mathrm{c}$的一个表达式：$RT_\mathrm{c} = 2a(V_\mathrm{m}-b)^2/V_\mathrm{m}^3$与$RT_\mathrm{c} = 3a(V_\mathrm{m}-b)^3/V_\mathrm{m}^4$。两式相等得$2V_\mathrm{m}^4(V_\mathrm{m}-b)^2 = 3V_\mathrm{m}^3(V_\mathrm{m}-b)^3$，即$2V_\mathrm{m} = 3(V_\mathrm{m}-b)$，故$V_{\mathrm{m},\mathrm{c}} = 3b$。回代得$T_\mathrm{c} = 8a/(27Rb)$，进而$p_\mathrm{c} = RT_\mathrm{c}/(V_{\mathrm{m},\mathrm{c}}-b) - a/V_{\mathrm{m},\mathrm{c}}^2 = a/(27b^2)$。因此
$$
Z_\mathrm{c} = \frac{p_\mathrm{c}V_{\mathrm{m},\mathrm{c}}}{RT_\mathrm{c}} = \frac{\dfrac{a}{27b^2}\cdot 3b}{R\cdot\dfrac{8a}{27Rb}} = \frac{3}{8} = 0.375 .
$$
一个模型里已不剩物质特异性物理之后剩下的普适数——真实气体更低（$\mathrm{CO_2}$为$0.27$，$\mathrm{N_2}$为$0.29$），因为临界区附近涨落接管，范德华形式在那里太粗糙。完整的故事，包括$C_{p,\mathrm{m}}$为何在那里发散，在[[statistical-thermodynamics/real-gases-liquids]]。
:::
:::
