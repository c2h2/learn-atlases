氧化还原是无机化学语法的后一半，与前一半一样，它实际上是换了一身制服的热力学。每个标准电势都是伪装的自由能（$\Delta_\mathrm{r} G^\circ = -nFE^\circ$），而每个稳定性问题——这个离子会不会歧化，这种矿石能不能炼出金属，这个化合物能不能在水中存在——都变成了在四种图之一上比较斜率和线的位置。本章讲授这四种图：相邻氧化态之间电势的**拉蒂默图**，把电势转化为稳定性凸包图像的**弗罗斯特图**，加入pH的**布拜图**，以及决定哪种元素留住氧的**埃林厄姆图**。其中的数学是线性的——直线、加权平均、一个斜率公式——回报是你不再死记反应，而开始把它们直接读出来。

## 拉蒂默图：堆叠起来的自由能

::: definition 拉蒂默图 {#def-latimer}
**拉蒂默图**列出一种元素**相邻**氧化态之间的标准还原电势，从左到右按氧化态由高到低书写，例如酸性溶液中的锰（均相对于标准氢电极）：
$$
\mathrm{MnO_4^-} \xrightarrow{\ 0.56\ } \mathrm{MnO_4^{2-}} \xrightarrow{\ 2.26\ } \mathrm{MnO_2} \xrightarrow{\ 0.95\ } \mathrm{Mn^{3+}} \xrightarrow{\ 1.51\ } \mathrm{Mn^{2+}} \xrightarrow{\ -1.18\ } \mathrm{Mn}
$$
每个数字是其右侧单电子（或$n$电子）步骤在$\mathrm{pH}\ 0$、活度为1时的电势。该元素的全部氧化还原化学——什么氧化什么，什么稳定，什么会歧化——都编码在这一行数字里。
:::

::: proposition 电势按自由能相加，而不是按电压相加 {#prop-weighted-average}
若第1步在电势$E_1$下转移$n_1$个电子，第2步在$E_2$下转移$n_2$个电子，则总电对的电势为
$$
E^\circ = \frac{n_1 E_1 + n_2 E_2}{n_1 + n_2},
$$
因为$\Delta_\mathrm{r} G^\circ = -nFE^\circ$是状态函数，而自由能是可加的。例如$\mathrm{MnO_4^- / Mn^{2+}}$的电势为$(3 \times 1.695 + 1 \times 0.95 + 1 \times 1.51)/5 = 1.51\ \mathrm{V}$——而不是各步的算术平均值。
:::

::: proof 为什么权重是电子数 {#proof-weighted}
把两步写成还原反应：$\mathrm{A} + n_1 e^- \to \mathrm{B}$，$\Delta_\mathrm{r} G_1^\circ = -n_1 F E_1^\circ$；$\mathrm{B} + n_2 e^- \to \mathrm{C}$，$\Delta_\mathrm{r} G_2^\circ = -n_2 F E_2^\circ$。两式相加消去$\mathrm{B}$，得到$\mathrm{A} + (n_1 + n_2) e^- \to \mathrm{C}$，其自由能为两者之和：$-(n_1 + n_2) F E^\circ = -n_1 F E_1^\circ - n_2 F E_2^\circ$。除以$-(n_1 + n_2)F$即得加权平均。这个证明恰好说明了电压为什么**不**可加：$E^\circ$是**每个电子**的自由能，对“每个电子”的量求平均必须按电子数加权——这与两级泵的压力增益不等于两级的平均值是同一个道理。中间体$\mathrm{B}$被消去，因为状态函数与途径无关：这既是拉蒂默图的全部威力，也是它的全部局限。
:::

::: example 锰行中的两个平均值 {#ex-mn-average}
利用上面的拉蒂默图求(a) $E^\circ(\mathrm{MnO_4^- / MnO_2})$和(b) $E^\circ(\mathrm{MnO_4^- / Mn^{2+}})$，并解释为什么高锰酸盐是如此方便的滴定剂。
::: solution
(a) 路径$\mathrm{MnO_4^- \to MnO_4^{2-} \to MnO_2}$转移$1 + 2 = 3$个电子：$E^\circ = (1 \times 0.56 + 2 \times 2.26)/3 = 1.69\ \mathrm{V}$。(b) 延伸到$\mathrm{Mn^{2+}}$再加上$1 \times 0.95$和$1 \times 1.51$，共5个电子：$E^\circ = (3 \times 1.695 + 0.95 + 1.51)/5 = 1.51\ \mathrm{V}$。两个值都很大且为正：高锰酸根几乎能进攻任何物质，在酸中变为无色的$\mathrm{Mn^{2+}}$（滴定终点就是第一抹持久的粉红色），在中性溶液中则变为棕色的$\mathrm{MnO_2}$——同一种元素，同一张图，取决于你走哪一段，得到两个都很实用的电势。
:::
:::

::: example 金：为什么$\mathrm{Au^+}$会消失，而金能溶于氰化物 {#ex-au}
金在酸中的拉蒂默行为$\mathrm{Au^{3+}} \xrightarrow{\ 1.40\ } \mathrm{Au^+} \xrightarrow{\ 1.69\ } \mathrm{Au}$。求$E^\circ(\mathrm{Au^{3+}/Au})$，判断$\mathrm{Au^+}$能否在水中存在，并在已知$E^\circ(\mathrm{[Au(CN)_2]^-/Au}) = -0.60\ \mathrm{V}$的条件下，解释在采矿所用的碱性氰化物浸出中，空气如何能溶解金。
::: solution
$E^\circ(\mathrm{Au^{3+}/Au}) = (2 \times 1.40 + 1 \times 1.69)/3 = 1.50\ \mathrm{V}$。对$\mathrm{Au^+}$而言，**右侧**的电势（1.69）超过**左侧**的电势（1.40），按下一节的判据它会歧化：$3\,\mathrm{Au^+} \to \mathrm{Au^{3+}} + 2\,\mathrm{Au}$，对两个电子$E^\circ_\mathrm{cell} = 1.69 - 1.40 = 0.29\ \mathrm{V}$，$K \approx 10^{10}$。简单的水合金(I)不能存在；金(I)只有在配体使其稳定时才能存在。

氰根正是这样一种配体，它改变了一切。把$\mathrm{Au^+}$结合成非常稳定的$\mathrm{[Au(CN)_2]^-}$，使$\mathrm{Au(I)/Au}$电势从$+1.69$降到$-0.60\ \mathrm{V}$。浸出在pH约10.5下进行（使氰化物保持为$\mathrm{CN^-}$，而不是挥发性的、剧毒的HCN），因此相关的氧电势不是pH 0时的$1.23\ \mathrm{V}$，而是由空气（$p_{\mathrm{O_2}} = 0.21\ \mathrm{bar}$）的能斯特方程给出的
$$
E(\mathrm{O_2/OH^-}) = 1.229 - 0.0592\,\mathrm{pH} + \tfrac{0.0592}{4}\log_{10} 0.21 = 1.229 - 0.622 - 0.010 = 0.60\ \mathrm{V}.
$$
因此电池反应$4\,\mathrm{Au} + 8\,\mathrm{CN^-} + \mathrm{O_2} + 2\,\mathrm{H_2O} \rightarrow 4\,\mathrm{[Au(CN)_2]^-} + 4\,\mathrm{OH^-}$的驱动力约为$0.60 - (-0.60) = 1.2\ \mathrm{V}$（实际中较小，因为氰化物是稀的），足以溶解金属。pH每升高一个单位，氧化剂损失$0.059\ \mathrm{V}$，但配位作用所得远多于此。配体能把电势移动若干伏特——这正是下面布拜图一节的主题。
:::
:::

::: warning 绝不要取算术平均，绝不要随意改变符号 {#warn-not-additive}
拉蒂默图上的大多数错误可归为三种。(i) **对电势取平均**：对三电子的$\mathrm{MnO_4^-/MnO_2}$电对，$(0.56 + 2.26)/2 = 1.41$是错的；要按$n$加权。(ii) **把某一步反过来却保留符号**：氧化电势是还原电势的相反数，但拉蒂默图从左到右只按还原来读。(iii) **混用pH**：酸性行和碱性行是不同的表（$E^\circ(\mathrm{O_2/H_2O})$在酸中为$1.23\ \mathrm{V}$，在碱中为$0.40\ \mathrm{V}$），因为电势中包含半反应里的$\mathrm{H^+}$；不注明pH的数字是没有意义的数字。
:::

## 歧化，以及一行判据

::: proposition 歧化判据 {#prop-disproportionation}
当拉蒂默图中某中间氧化态物种右侧的电势超过其左侧的电势时，该物种发生歧化：
$$
E^\circ_\mathrm{right} > E^\circ_\mathrm{left} \quad \Longleftrightarrow \quad \Delta_\mathrm{r} G^\circ < 0 \text{ （对歧化反应）。}
$$
所构成的电池是“右侧电对作还原，左侧电对逆向作氧化”，所以$E^\circ_\mathrm{cell} = E^\circ_\mathrm{right} - E^\circ_\mathrm{left}$，平衡常数由$298\ \mathrm{K}$下的$\log K = n E^\circ_\mathrm{cell}/0.059\ \mathrm{V}$得出。只要不等式反向，逆反应——两种氧化态相遇生成一种——就是**归中**反应。
:::

::: proof 由$\Delta_\mathrm{r} G^\circ = -nFE^\circ$导出判据 {#proof-disprop}
设中间体$\mathrm{B}$介于$\mathrm{A}$（较高氧化态，电对$E_\mathrm{left}^\circ$）和$\mathrm{C}$（较低氧化态，电对$E_\mathrm{right}^\circ$）之间。歧化就是$\mathrm{B}$还原为$\mathrm{C}$（阴极，$E_\mathrm{right}^\circ$）与$\mathrm{B}$氧化为$\mathrm{A}$（阳极，$E_\mathrm{left}^\circ$逆向）同时进行：$E_\mathrm{cell}^\circ = E_\mathrm{right}^\circ - E_\mathrm{left}^\circ$，而$\Delta_\mathrm{r} G^\circ = -n F E_\mathrm{cell}^\circ$恰在$E_\mathrm{right}^\circ > E_\mathrm{left}^\circ$时为负。于是平衡常数满足$\ln K = n F E_\mathrm{cell}^\circ / RT$，即$298\ \mathrm{K}$下$\log K = n E_\mathrm{cell}^\circ/0.0592\ \mathrm{V}$：在单电子情形下，每多出$0.059\ \mathrm{V}$就换来十倍。注意这个证明**没有**假设什么——没有机理，没有速率。判据只说明混合物在热力学上注定要转化；转化得多快是另一个课题（对$\mathrm{H_2O_2}$而言，这个差别就是货架寿命）。
:::

::: example 铜(I)：终结一种离子的$0.37\ \mathrm{V}$ {#ex-cu-disprop}
由$\mathrm{Cu^{2+}} \xrightarrow{\ 0.153\ } \mathrm{Cu^+} \xrightarrow{\ 0.521\ } \mathrm{Cu}$，计算$2\,\mathrm{Cu^+ (aq)} \to \mathrm{Cu^{2+} (aq)} + \mathrm{Cu (s)}$的$K$。
::: solution
$E^\circ_\mathrm{cell} = 0.521 - 0.153 = 0.368\ \mathrm{V}$，$n = 1$：$\log K = 0.368/0.0592 = 6.2$，$K \approx 1.7\times10^{6}$。在通常浓度下，水合$\mathrm{Cu^+}$只是实验室中的虚构——把可溶性铜(I)盐加入水中，铜金属就会析出，同时溶液变蓝。例外情形恰好证明了这条规则对配体的依赖：固体$\mathrm{CuCl}$能够存在，是因为它微溶（$K_\mathrm{sp} \approx 2\times10^{-7}$使游离$\mathrm{Cu^+}$浓度保持很低）；$\mathrm{[Cu(CH_3CN)_4]^+}$在乙腈中稳定，是因为这种溶剂与铜(I)的结合远强于与铜(II)的结合，从而使不等式反向。用水稀释，铜(I)就会变成水合离子，进而歧化。沉淀与配位是作用在拉蒂默图上的勒夏特列杠杆。
:::
:::

::: example 过氧化氢：热力学上已死，商业上装瓶 {#ex-h2o2-disprop}
由酸性行$\mathrm{O_2} \xrightarrow{\ 0.695\ } \mathrm{H_2O_2} \xrightarrow{\ 1.776\ } \mathrm{H_2O}$，判断$\mathrm{H_2O_2}$是否歧化，并估算$2\,\mathrm{H_2O_2 (aq)} \to 2\,\mathrm{H_2O (l)} + \mathrm{O_2 (g)}$的$K$。
::: solution
$1.776 > 0.695$，差距悬殊：对两电子过程$E^\circ_\mathrm{cell} = 1.081\ \mathrm{V}$，$\log K = 2 \times 1.081/0.0592 \approx 36.5$，$K \sim 10^{36}$。过氧化物之所以能存在，只是因为受到动力学的保护：在洁净溶液中，生成和断裂弱的$\mathrm{O{-}O}$键（约$210\ \mathrm{kJ\,mol^{-1}}$）的电子转移很慢，而且$\mathrm{O_2}$的三重态基态使基元步骤在自旋上很别扭，所以反应需要表面、光或过氧化氢酶才能以人类可感知的速率进行。瓶装产品含有稳定剂并避光保存；加一滴$\mathrm{MnO_2}$或一种血红素酶，同样的溶液几秒钟内就会冒泡溢出。热力学开出支票；动力学决定何时兑现。
:::
:::

::: example 锰(III)与锰酸根(VI)：两个教科书式的歧化 {#ex-mn3-mno42}
根据锰的拉蒂默图，$\mathrm{Mn^{3+}}$和$\mathrm{MnO_4^{2-}}$中哪一个会在水中歧化？
::: solution
两个都会。$\mathrm{Mn^{3+}}$：右侧$1.51 >$左侧$0.95$，所以$2\,\mathrm{Mn^{3+}} + 2\,\mathrm{H_2O} \to \mathrm{Mn^{2+}} + \mathrm{MnO_2} + 4\,\mathrm{H^+}$，$E^\circ = 0.56\ \mathrm{V}$，$K \sim 10^{9}$——水合$\mathrm{Mn^{3+}}$只能在强酸性溶液中或以配合物形式存在。$\mathrm{MnO_4^{2-}}$：右侧$2.26 >$左侧$0.56$，所以$3\,\mathrm{MnO_4^{2-}} + 4\,\mathrm{H^+} \to 2\,\mathrm{MnO_4^-} + \mathrm{MnO_2} + 2\,\mathrm{H_2O}$：把$\mathrm{MnO_2}$与碱共熔得到的绿色锰酸盐，在熔体溶解后将溶液酸化甚至只是稀释，就会变成紫色并生成棕色沉淀。歧化确实能制得高锰酸盐，但会把三分之一的锰浪费为$\mathrm{MnO_2}$，所以工业上改用电解（或氯气）把$\mathrm{Mn(VI)}$氧化为$\mathrm{Mn(VII)}$，使其全部转化。注意第二个方程中的pH杠杆：每三个锰酸根消耗四个质子，意味着歧化在强碱中被抑制，而绿色的$\mathrm{MnO_4^{2-}}$溶液恰恰在那里是稳定的。
:::
:::

## 弗罗斯特图：作为地貌的稳定性

::: definition 弗罗斯特图（氧化态图） {#def-frost}
在**弗罗斯特图**中，以$nE^\circ$对氧化数作图。由单质生成该氧化态的$\Delta_\mathrm{f} G^\circ = +nFE^\circ$，所以纵坐标$nE^\circ = \Delta_\mathrm{f} G^\circ/F$是以伏特为单位的自由能标度（“伏特当量”），其中$n$是该状态的氧化数，$E^\circ$是该状态与单质之间电对的电势。单质位于原点；每个状态的高度就是由单质生成它的自由能。几何上可以读出以下推论：**点越低，该状态总体上越稳定**；**位于两侧相邻点连线上方的点会歧化**为那两个相邻状态（连线代表两种产物的混合物，点代表单一物种）；**两个状态之间线段的斜率就是它们之间的拉蒂默电势**——斜率越陡（越正），较高的状态就是越强的氧化剂。
:::

::: example 弗罗斯特图上的铜 {#ex-cu-frost}
对于铜，各点为$\mathrm{Cu}\ (0,\ 0)$、$\mathrm{Cu^+}\ (1,\ 0.52)$、$\mathrm{Cu^{2+}}\ (2,\ 0.68)$。$\mathrm{Cu^+}$相对于$\mathrm{Cu}$–$\mathrm{Cu^{2+}}$连线处于什么位置？该图对铜金属在空气中的氧化说明了什么？
::: solution
$\mathrm{Cu}$–$\mathrm{Cu^{2+}}$弦在氧化数1处的高度为$0.68/2 = 0.34$，低于$\mathrm{Cu^+}$的$0.52$：该点位于弦的上方，所以$\mathrm{Cu^+}$会歧化——与拉蒂默判据的结论相同，现在表现为地貌上的一个拐折。斜率说明了其余的事情：$\mathrm{Cu \to Cu^+}$的斜率为$0.52$，$\mathrm{Cu^+ \to Cu^{2+}}$的斜率为$0.15$，所以空气（$1.23\ \mathrm{V}$）能从$\mathrm{Cu}$一路爬上整座山到$\mathrm{Cu^{2+}}$——铜在通气的酸中缓慢溶解——而氢离子（$0.00\ \mathrm{V}$）连起步都做不到，这就是隔绝空气时铜不溶于稀盐酸的原因。在露天环境中，铜缓慢腐蚀，生成由碱式硫酸铜和碱式碳酸铜组成的绿色铜锈；自由女神像（1886年落成）的铜皮在约二三十年内就变绿了。
:::
:::

当一种元素有许多氧化态时，弗罗斯特图大放异彩。下面的锰图就是本章的拉蒂默行重新绘制而成的；请用上面三条规则来读它。

::: widget plot
f: -1.18*x + 2.69*((x-2)+abs(x-2))/2 - 0.56*((x-3)+abs(x-3))/2 + 1.31*((x-4)+abs(x-4))/2 - 1.70*((x-6)+abs(x-6))/2; -1.18*x + 2.41*((x-2)+abs(x-2))/2 + 0.4633*((x-4)+abs(x-4))/2
x: 0, 7.2
y: -3, 6
points: 0,0; 2,-2.36; 3,-0.85; 4,0.10; 6,4.62; 7,5.18
labels: \text{弗罗斯特图，Mn，pH 0}; \text{下凸包}
caption: 酸中锰的弗罗斯特图（$x$为氧化数；$y$为以伏特计的$nE^\circ$），由拉蒂默行$\mathrm{MnO_4^-}\ (0.56)\ \mathrm{MnO_4^{2-}}\ (2.26)\ \mathrm{MnO_2}\ (0.95)\ \mathrm{Mn^{3+}}\ (1.51)\ \mathrm{Mn^{2+}}\ (-1.18)\ \mathrm{Mn}$构建：各点为$\mathrm{Mn}\ (0, 0)$、$\mathrm{Mn^{2+}}\ (2, -2.36)$、$\mathrm{Mn^{3+}}\ (3, -0.85)$、$\mathrm{MnO_2}\ (4, 0.10)$、$\mathrm{MnO_4^{2-}}\ (6, 4.62)$和$\mathrm{MnO_4^-}\ (7, 5.18)$。第二条线是下凸包——连接各点的最低路径。$\mathrm{Mn^{2+}}$是最深的点，是酸中最稳定的状态。$\mathrm{Mn^{3+}}$和$\mathrm{MnO_4^{2-}}$位于凸包**上方**，因此各自歧化为凸包上的相邻状态（$\mathrm{Mn^{2+}} + \mathrm{MnO_2}$，以及$\mathrm{MnO_2} + \mathrm{MnO_4^-}$），与[[#ex-mn3-mno42]]的结论完全一致。向右攀升的陡峭线段是强氧化剂：从$\mathrm{Mn^{2+}}$到$\mathrm{MnO_4^-}$的斜率$(5.18 + 2.36)/5 = 1.51\ \mathrm{V}$就是高锰酸根的电势。
:::

氮给出一幅对比鲜明的图景：在酸中，位于原点的$\mathrm{N_2}$接近图的底部，而$\mathrm{NO}$、$\mathrm{NO_2^-}$和$\mathrm{NO_3^-}$高高地位于右侧。因此硝酸根在热力学上是强氧化剂，急于向$\mathrm{N_2}$跌落——然而室温下硝酸盐溶液对大多数还原剂都是惰性的，因为还原需要多次电子转移和氧原子转移，势垒很高。氮的化学是一个动力学不断压倒弗罗斯特图的故事。

## 布拜图：电势–pH图

::: definition 布拜图 {#def-pourbaix}
**布拜图**在固定温度和总溶解浓度下，以$E$（纵轴）和$\mathrm{pH}$（横轴）为平面，把一种元素在水中的稳定物种绘成区域图。边界有三种形状，都来自$298\ \mathrm{K}$下的能斯特方程$E = E^\circ - (0.059/z) \log Q$：没有电子转移处为**竖直**线（酸碱变化，如水解$\mathrm{M^{n+} \to MOH^{(n-1)+}}$），没有质子转移处为**水平**线（纯氧化还原，如$\mathrm{Fe^{3+}/Fe^{2+}}$），对每$z$个电子消耗$m$个质子的半反应则为**倾斜**线，其斜率为
$$
\frac{\mathrm{d}E}{\mathrm{d}\,\mathrm{pH}} = -0.059 \times \frac{m}{z}\ \mathrm{V}
$$
水本身为这张图划定了框架：在$E = 1.23 - 0.059\,\mathrm{pH}$以上它放出$\mathrm{O_2}$，在$E = -0.059\,\mathrm{pH}$以下它放出$\mathrm{H_2}$，两者之间在每个pH下宽度都是$1.23\ \mathrm{V}$的带，就是水本身热力学稳定的区域。
:::

::: example 高锰酸根线的斜率 {#ex-mno4-line}
求布拜图上$\mathrm{MnO_4^- / MnO_2}$边界的斜率，并解释为什么高锰酸盐氧化在酸中进行。
::: solution
半反应$\mathrm{MnO_4^- + 4\,H^+ + 3\,e^- \to MnO_2 + 2\,H_2O}$对$z = 3$个电子消耗$m = 4$个质子：斜率$= -0.059 \times 4/3 = -0.079\ \mathrm{V}$每pH单位。随着溶液变为碱性，电势急剧下降——在$\mathrm{pH}\ 14$时该线比酸中的值降低了$1.1\ \mathrm{V}$——因为氧化剂**部分就是**质子：除去$\mathrm{H^+}$会把反应拉向左边。这就是高锰酸盐滴定要酸化的原因，也是同一试剂在中性溶液中止于$\mathrm{MnO_2}$、在酸中却一直进行到$\mathrm{Mn^{2+}}$的原因。同样的质子依赖性也解释了漂白剂瓶上的警告。家用漂白剂含有次氯酸根以及大约等量的氯离子。将其酸化，首先把$\mathrm{OCl^-}$转化为$\mathrm{HOCl}$（$\mathrm{p}K_\mathrm{a} = 7.5$），然后驱动归中反应
$$
\mathrm{HOCl + H^+ + Cl^- \rightleftharpoons Cl_2(aq) + H_2O},
$$
这是氯水解的逆反应，后者的常数$K_\mathrm{hyd} = [\mathrm{HOCl}][\mathrm{H^+}][\mathrm{Cl^-}]/[\mathrm{Cl_2}]$在$25\ \mathrm{^\circ C}$下约为$4\times10^{-4}$。当$[\mathrm{Cl^-}] \approx 0.7\ \mathrm{mol\,dm^{-3}}$时，比值$[\mathrm{Cl_2}]/[\mathrm{HOCl}] = [\mathrm{H^+}][\mathrm{Cl^-}]/K_\mathrm{hyd}$在pH 5时约为$0.02$，在pH 3.2附近达到1。由于漂白剂是浓的，即使是pH 5时的数字也意味着危险浓度的溶解氯，以及液面上方约十分之一巴量级的平衡氯气压：把漂白剂与酸性清洁剂混合会放出有毒的氯气。
:::
:::

::: widget plot
f: 1.229 - 0.0592*x; -0.0592*x; 1.695 - 0.0789*x; 1.507 - 0.0947*x
x: 0, 14
y: -1, 2
labels: \mathrm{O_2/H_2O}; \mathrm{H^+/H_2}; \mathrm{MnO_4^-/MnO_2}; \mathrm{MnO_4^-/Mn^{2+}}
caption: 水的两条边界与两个高锰酸根电对的电势（V，相对于标准氢电极）随pH的变化，除$\mathrm{H^+}$外所有物种活度为1（气体$p = 1\ \mathrm{bar}$）。最上面两条水线之间是水的稳定区。两条高锰酸根线在每个pH下都位于$\mathrm{O_2}$线**上方**：高锰酸根在热力学上能把水氧化为氧气，其溶液之所以能保存，只是因为这个反应很慢（它被光和$\mathrm{MnO_2}$催化，这就是标准溶液要避光保存并过滤的原因）。斜率为$-0.059\,m/z$：水为$-0.059$（$m = z$），$\mathrm{MnO_4^-/MnO_2}$为$-0.079$（$4/3$），$\mathrm{MnO_4^-/Mn^{2+}}$为$-0.095$（$8/5$）。（完整的布拜图会在中性pH附近、$\mathrm{Mn^{2+}}$不再是稳定还原形式之处截断$\mathrm{Mn^{2+}}$线。）
:::

::: example 钠为什么浮起并嘶嘶作响 {#ex-water-window}
把钠金属和水放在同一张布拜图上，读出反应。
::: solution
$\mathrm{Na^+/Na}$线是平的（没有质子），位于$-2.71\ \mathrm{V}$，远低于$\mathrm{H_2O/H_2}$边界（$-0.059\,\mathrm{pH}$，即pH 7时$-0.41\ \mathrm{V}$，pH 14时$-0.83\ \mathrm{V}$）。因此在每个pH下，金属的区域都完全位于氢线之下：与水接触的钠金属没有任何稳定区，它在哪里遇到水就在哪里还原水。对标准碱性反应$\mathrm{Na + H_2O \to Na^+ + \tfrac12 H_2 + OH^-}$，采用$-0.83\ \mathrm{V}$的电对$\mathrm{H_2O/H_2,OH^-}$，$E^\circ_\mathrm{cell} = -0.83 - (-2.71) = 1.88\ \mathrm{V}$，$\log K = 1.88/0.0592 \approx 32$（$n = 1$）。氢线是低电势下水中所能存在之物的下限，这就是正电性最强的金属——Li、Na、Ca、Al以及世界上大部分的Mg——要在远离任何质子来源的条件下，由熔盐电解提取的原因。
:::
:::

::: warning 布拜图是热力学的，而水并不是全部 {#warn-passivation}
在相信某条区域边界之前，有三点需要注意。(i) 这些图假设处于平衡，其标注需要仔细解读。金属的**免蚀**区是金属本身为稳定相的区域；对铝而言，它远在氢线之下，所以铝在每个pH下在水中都是热力学不稳定的。在约pH 4到9之间，稳定相是水合氧化物，这是一个**钝化**区：金属在那里之所以能存在，只是因为一层薄而不溶的氧化膜把它与水隔开。划破这层膜，或者加入氯离子（它局部进攻氧化膜并造成点蚀，这是铝在海水中受损的原因之一），潜在的不稳定性就显露出来。(ii) 水的窗口也是热力学的：$\mathrm{O_2}$和$\mathrm{H_2}$的析出需要数百毫伏的超电势（电极动力学，[[electrochemistry/electrode-kinetics]]），这就是电解食盐水能得到氯气而不是氧气的原因，也是铝电解冶炼之所以可行的原因。(iii) 边界的位置随总浓度（这些图是按例如$10^{-3}\ \mathrm{mol\,dm^{-3}}$的金属总浓度绘制的）和配位剂而移动：氰根、氨或氟离子能把金属的区域移动若干伏特。
:::

## 埃林厄姆图：谁得到氧

::: definition 埃林厄姆图 {#def-ellingham}
**埃林厄姆图**以**每消耗1 mol $\mathrm{O_2}$**生成氧化物的标准自由能对温度作图，使所有线共享同一个氧参考，可以直接比较：线位于你的线**下方**的金属能从你那里夺走氧。由于$\left(\partial \Delta_\mathrm{r} G/\partial T\right)_p = -\Delta_\mathrm{r} S$，每条线的斜率等于反应熵的负值，而气体决定一切：金属 + $\mathrm{O_2}$ → 固体氧化物失去1 mol气体（斜率略为正，线平缓上升），而$2\,\mathrm{C} + \mathrm{O_2} \to 2\,\mathrm{CO}$**增加**1 mol气体（斜率强烈为负，线下降）。$\Delta_\mathrm{r} H^\circ$截距很大且几乎与温度无关，所以在相变之间这些线都是直线，每一个拐折都标志着一个熔点或沸点（锌线在锌的沸点$1180\ \mathrm{K}$处向上拐折——这就是冶炼炉要在更高温度下运行并冷凝锌蒸气的原因）。
:::

::: widget plot
f: -1204 + 0.221*x; -701 + 0.201*x; -221 - 0.179*x; -394
x: 0, 2500
y: -1600, 300
labels: \text{MgO}; \text{ZnO}; \text{CO}; \text{CO}_2
caption: 每摩尔$\mathrm{O_2}$的埃林厄姆线（近似的恒定斜率拟合，$\Delta_\mathrm{r} G$以$\mathrm{kJ}$计，$x$以K计）：$2\,\mathrm{Mg} + \mathrm{O_2} \to 2\,\mathrm{MgO}$，$\mathrm{2\,Zn} + \mathrm{O_2} \to \mathrm{2\,ZnO}$，$\mathrm{2\,C} + \mathrm{O_2} \to \mathrm{2\,CO}$以及$\mathrm{C} + \mathrm{O_2} \to \mathrm{CO_2}$。CO线下降，因为反应由1 mol气体生成2 mol气体，熵增加；金属线上升，因为它们消耗气体。（这些拟合忽略了相变：真实的锌线和镁线在金属的沸点$1180$和$1363\ \mathrm{K}$以上向上弯折。）锌线在$1263\ \mathrm{K}$处与CO线相交，所以碳在该温度以上能还原氧化锌——这是炼锌的基础——而MgO线远低于碳的线，只在$2500\ \mathrm{K}$附近才与CO线相遇。因此镁或者通过电解熔融$\mathrm{MgCl_2}$制取，或者用皮江法（Pidgeon process）制取，即在真空下用硅铁还原煅烧白云石，并不断移走镁蒸气。
:::

::: proposition 从图上读出还原反应 {#prop-ellingham-reading}
碳（以CO形式）在金属线与CO线交点的温度以上能还原金属氧化物，在其以下则不能；交点温度$T = (\Delta_\mathrm{r} H^\circ_\mathrm{oxide} - \Delta_\mathrm{r} H^\circ_\mathrm{CO})/(\Delta_\mathrm{r} S^\circ_\mathrm{oxide} - \Delta_\mathrm{r} S^\circ_\mathrm{CO})$，可由两条线的截距和斜率读出。在任何交点以下，位于**下方**那条线的氧化物是更稳定的氧化物，下方的金属是更好的夺氧剂——这就是金属活动性顺序的一句话版本，如今变得定量且依赖于温度。
:::

::: example 铝热反应：$840\ \mathrm{kJ}$的反应，每摩尔$\mathrm{O_2}$ $560\ \mathrm{kJ}$ {#ex-thermite}
已知$\Delta_\mathrm{f} G^\circ(\mathrm{Al_2O_3}) = -1582$，$\Delta_\mathrm{f} G^\circ(\mathrm{Fe_2O_3}) = -742\ \mathrm{kJ\,mol^{-1}}$，判断铝能否还原赤铁矿，并估算放出的热量。
::: solution
$\mathrm{Fe_2O_3 + 2\,Al \to Al_2O_3 + 2\,Fe}$：$\Delta_\mathrm{r} G^\circ = -1582 - (-742) = -840\ \mathrm{kJ\,mol^{-1}}$（且$\Delta_\mathrm{r} H^\circ = -1676 + 824 = -852\ \mathrm{kJ\,mol^{-1}}$）。两种氧化物都是$\mathrm{M_2O_3}$，所以$840\ \mathrm{kJ}$是对应$1.5\ \mathrm{mol}$ $\mathrm{O_2}$的差值。在按每摩尔$\mathrm{O_2}$绘制的埃林厄姆图上，两条线之间的竖直间距为$(2/3)\times 840 \approx 560\ \mathrm{kJ}$。该反应在通常温度下是自发的——而且由于自由能的下降几乎全部来自焓，混合物一旦被镁条点燃，就会把自身加热到超过铁的熔点$1811\ \mathrm{K}$，生成熔融的铁：无需电力的铁轨焊接。同样的读图方式解释了为什么用铝、硅和锰从钢水中除去溶解的氧，以及为什么逆过程——铁还原氧化铝——从不发生。
:::
:::

::: example 高炉中的锌，电解槽中的铝 {#ex-zn-mg-smelting}
利用插图中的埃林厄姆拟合（$\mathrm{ZnO}$：$-701 + 0.201\,T$；CO：$-221 - 0.179\,T$，单位为每摩尔$\mathrm{O_2}$的$\mathrm{kJ\,mol^{-1}}$），求碳还原氧化锌的最低温度，并解释为什么铝不用这种方法生产。
::: solution
令两线相等：$-701 + 0.201\,T = -221 - 0.179\,T$，得$0.380\,T = 480$，$T \approx 1263\ \mathrm{K}$（$990\ \mathrm{^\circ C}$）——工业上在更高温度下运行（$1200$–$1400\ \mathrm{^\circ C}$），因为锌在$1180\ \mathrm{K}$沸腾，而且反应还必须**快**；锌蒸气随后被扫入冷凝器，将其移走就把平衡拉向右边（勒夏特列原理，[[general-chemistry-2/chemical-equilibrium]]）。对铝而言，按每摩尔$\mathrm{O_2}$，同类拟合为$-1117 + 0.209\,T$（由对应$1.5\ \mathrm{mol}$ $\mathrm{O_2}$的$\Delta_\mathrm{f} H^\circ(\mathrm{Al_2O_3}) = -1676\ \mathrm{kJ\,mol^{-1}}$及相应的熵变得出）。它只在$T = 896/0.388 \approx 2300\ \mathrm{K}$处与CO线相遇，而在这样的温度下，碳与氧化铝生成的是碳化铝和碳氧化物，而不是纯净的金属；碳热还原制铝已研究了几十年，却始终未能成为工业过程。铝是用电解法获得的，延续了戴维1807年用钠和钾开创的传统。纯化的$\mathrm{Al_2O_3}$（由拜耳法从铝土矿制得）溶于加有$\mathrm{AlF_3}$的熔融冰晶石中，这使操作温度降低到约$1230\ \mathrm{K}$（纯冰晶石在$1285\ \mathrm{K}$附近熔化）。铝在阴极沉积，$\mathrm{Al^{3+}} + 3\,e^- \rightarrow \mathrm{Al}$（铝实际上以氟配合物形式存在），碳阳极被消耗，$\mathrm{C} + 2\,\mathrm{O^{2-}} \rightarrow \mathrm{CO_2} + 4\,e^-$（氧化物以氟氧配合物形式存在）。总的电池反应为$2\,\mathrm{Al_2O_3} + 3\,\mathrm{C} \rightarrow 4\,\mathrm{Al} + 3\,\mathrm{CO_2}$，其在熔池温度下的可逆电压约为$1.2\ \mathrm{V}$；碳阳极使它远低于把氧化铝分解为铝和氧所需的约$2.2\ \mathrm{V}$。实际电解槽在约$4$–$4.5\ \mathrm{V}$下运行，差值来自熔池的欧姆电阻和电极超电势。埃林厄姆图不仅选择还原剂；它还选择了**工业**。
:::
:::

::: quiz
某拉蒂默行为$\mathrm{A} \xrightarrow{\ 0.34\ } \mathrm{B} \xrightarrow{\ 0.92\ } \mathrm{C}$。B溶于水时会发生什么？
- [x] B歧化为A和C，$E^\circ_\mathrm{cell} = 0.58\ \mathrm{V}$。
- [ ] B稳定：两个电势都是正的。
- [ ] B使A和C归中生成它自己。
- [ ] B把水还原为氢气，因为$0.34 < 0.92$。
::: solution
右侧电势（$0.92$）超过左侧电势（$0.34$），所以B对歧化不稳定，$E^\circ_\mathrm{cell} = 0.92 - 0.34 = 0.58\ \mathrm{V}$（单电子转移时$K \approx 10^{10}$）。单个电势为正并不说明中间体是否稳定——这个问题只由相邻电势之间的**差值**决定。这就是换了数字的铜行。
:::
:::

## 后续内容

这四种图是以后每一章的工作词汇：[[main-group/halogens-noble-gases]]中卤素的拉蒂默行与氯含氧阴离子阶梯，[[main-group/groups-15-16]]中氮和硫的弗罗斯特地貌，[[main-group/hydrogen-s-block]]和[[main-group/groups-13-14]]中钠、镁和铝的提取。定量工具——能斯特方程、$\Delta_\mathrm{r} G^\circ = -nFE^\circ$、浓差电池——在[[general-chemistry-2/electrochemistry-intro]]中建立，并在[[electrochemistry/cell-thermodynamics]]中深化；动力学方面的注意事项（超电势、钝化、腐蚀电池）属于[[electrochemistry/electrode-kinetics]]和[[electrochemistry/corrosion]]；埃林厄姆图背后的自由能代数见[[thermodynamics/free-energy]]。工业电化学——氯碱、铝、镁、电解水——见[[electrochemistry/fuel-cells-electrolysis]]。

::: history
正电性元素的提取化学始于戴维（Davy）1807年的电化学小珠，并随着1886年霍尔-埃鲁法（Hall–Héroult process）的独立发明而达到工业形式——22岁的霍尔（Charles Martin Hall）在俄亥俄、23岁的埃鲁（Paul Héroult）在法国，都把氧化铝溶于熔融冰晶石中再进行电解。埃鲁先提交了专利申请，但美国专利局的抵触审查判霍尔胜诉，因为他能证明自己更早——在1886年2月——就制得了铝；霍尔的专利在美国有效，埃鲁的专利在欧洲有效。穆瓦桑（Henri Moissan）的电弧炉（19世纪90年代）使高温化学首次成为常规手段，并为他赢得了1906年诺贝尔奖；早在埃林厄姆（Harold Ellingham）于1944年发表至今仍摊在冶金学家案头的那张图之前半个世纪，戈尔德施密特（Hans Goldschmidt）的铝热法（1895年获得专利）就已经利用氧化物之间的差距浇铸出熔融的铁了。布拜（Marcel Pourbaix）在1945年的博士论文中发展了电势–pH图，随后在布鲁塞尔逐个元素地把它们汇编成册：《电化学平衡图集》（*Atlas d'Équilibres Électrochimiques*，1963；英译本*Atlas of Electrochemical Equilibria in Aqueous Solutions*，1966）成为腐蚀工程师的标准参考书。拉蒂默（Wendell M. Latimer）的《元素的氧化态及其在水溶液中的电势》（*The Oxidation States of the Elements and Their Potentials in Aqueous Solutions*，第二版，1952）把逐个元素的电势数据组织成本章所读的那种行，而弗罗斯特（Arthur A. Frost）1951年的作图——自由能作为地貌，稳定性作为山谷——赋予了同样的数字以几何意义。
:::

::: summary
- 标准电势是每个电子的自由能：拉蒂默电势按加权平均$E^\circ = \sum n_i E_i/\sum n_i$组合，绝不按算术平均。
- 中间氧化态恰在其右侧的拉蒂默电势超过左侧电势时歧化；$K$由$\log K = nE^\circ/0.059\ \mathrm{V}$得出。
- 弗罗斯特图把同样的数字变成地貌：低意味着稳定，位于弦上方意味着注定歧化，斜率意味着氧化能力。
- 布拜图加入pH：边界的斜率为每pH单位$-0.059\,m/z$伏特，水本身的$\mathrm{H_2}$线和$\mathrm{O_2}$线圈出水本身稳定的区域；区域位于其外的物种会与水反应，除非动力学或钝化膜介入。
- 埃林厄姆线是每摩尔$\mathrm{O_2}$的自由能；其斜率是气体的熵，其交点是冶炼温度，最低的线就是最稳定的氧化物。
- 碳在CO交点以上还原氧化物（锌约在$1260\ \mathrm{K}$）；当交点高得不切实际（铝、镁）或不存在（钠）时，就使用电解或更强的还原剂——图选择了工业过程。
- 每一张图都是平衡图：钝化、超电势和缓慢的动力学（货架上的过氧化物，化肥袋里的硝酸盐）是地图与实地不同的原因。
:::

## 习题

::: exercise 加权平均 {level=1 check="1.69"}
利用本课的锰拉蒂默图，计算$E^\circ(\mathrm{MnO_4^- / MnO_2})$，以伏特为单位，保留两位小数。
::: solution
该路径转移$1 + 2 = 3$个电子：$E^\circ = (1 \times 0.56 + 2 \times 2.26)/3 = 5.08/3 = 1.69\ \mathrm{V}$。
:::
:::

::: exercise 歧化与否？ {level=1 check="1.21"}
铁在酸中的行为$\mathrm{Fe^{3+}} \xrightarrow{\ 0.771\ } \mathrm{Fe^{2+}} \xrightarrow{\ -0.44\ } \mathrm{Fe}$。$\mathrm{Fe^{2+}}$会歧化吗？铁金属会与$\mathrm{Fe^{3+}}$反应生成$\mathrm{Fe^{2+}}$（归中）吗？（以伏特为单位输入归中反应的$E^\circ_\mathrm{cell}$，保留两位小数。）
::: solution
$\mathrm{Fe^{2+}}$：右侧$(-0.44) <$左侧$(0.771)$，所以不歧化——铁(II)在除氧的水中是稳定的（直到氧气来对付它：$E^\circ(\mathrm{O_2/H_2O}) = 1.23 > 0.771$）。不等式反向就是归中判据，它成立：$\mathrm{Fe + 2\,Fe^{3+} \to 3\,Fe^{2+}}$，对两个电子$E^\circ = 0.771 - (-0.44) = 1.21\ \mathrm{V}$，$\log K = 2 \times 1.21/0.0592 \approx 41$——这就是加入铁金属是使铁(II)溶液不含铁(III)的标准方法的原因，也是氯化铁(III)溶液能蚀刻铁和钢的原因。
:::
:::

::: exercise 读懂冶炼炉 {level=1}
根据本课插图中的埃林厄姆线，回答是或否，并各用一行说明理由：(a) 碳（生成CO）能在$2000\ \mathrm{K}$还原$\mathrm{MgO}$吗？(b) C能在$1500\ \mathrm{K}$还原$\mathrm{ZnO}$吗？(c) 为什么CO线下降而金属氧化物线上升？
::: solution
(a) 否——MgO线（$2000\ \mathrm{K}$时$-762\ \mathrm{kJ}$）远低于CO（$-579\ \mathrm{kJ}$）：MgO仍是更稳定的氧化物；按这些拟合，两线只在$2500\ \mathrm{K}$附近相遇。(b) 是——在$1263\ \mathrm{K}$交点以上，CO线低于ZnO线，所以生成CO的碳赢得了氧（$1500\ \mathrm{K}$时$-490$对$-400\ \mathrm{kJ}$）。(c) 斜率为$-\Delta_\mathrm{r} S$：$\mathrm{2\,C + O_2 \to 2\,CO}$把1 mol气体变成2 mol，所以$\Delta_\mathrm{r} S > 0$，线随温度下降；金属氧化物线消耗气体（$\Delta_\mathrm{r} S < 0$），因而上升。
:::
:::

::: exercise 过氧化物的平衡 {level=2 check="36.5"}
对于$2\,\mathrm{H_2O_2 (aq)} \to 2\,\mathrm{H_2O (l)} + \mathrm{O_2 (g)}$，由氧的拉蒂默行计算$E^\circ_\mathrm{cell}$和$\log_{10} K$，并求与$1\ \mathrm{bar}$ $\mathrm{O_2}$处于平衡的过氧化物浓度。（输入$\log_{10} K$，保留一位小数。）
::: solution
$E^\circ = 1.776 - 0.695 = 1.081\ \mathrm{V}$，$n = 2$：$\log K = 2 \times 1.081/0.0592 = 36.5$，$K \approx 3\times10^{36}$。当$p(\mathrm{O_2}) = 1\ \mathrm{bar}$、水的活度为1时，$K = 1/[\mathrm{H_2O_2}]^2$，所以$[\mathrm{H_2O_2}]_\mathrm{eq} = K^{-1/2} = 10^{-18.3} \approx 5\times10^{-19}\ \mathrm{mol\,dm^{-3}}$。瓶装$3\ \%$溶液（$0.88\ \mathrm{mol\,dm^{-3}}$）比这高出约十八个数量级。过氧化物溶液之所以能保存，只是因为没有催化剂时分解很慢——这就是它们要加稳定剂、装在通气容器中、阴凉避光保存的原因。
:::
:::

::: exercise 布拜图斜率 {level=2 check="-0.095"}
布拜图上的$\mathrm{MnO_4^- / Mn^{2+}}$边界对应于$\mathrm{MnO_4^- + 8\,H^+ + 5\,e^- \to Mn^{2+} + 4\,H_2O}$。给出其斜率，以伏特每pH单位计，保留三位小数。
::: solution
斜率$= -0.0592 \times m/z = -0.0592 \times 8/5 = -0.095\ \mathrm{V}$每pH单位——这是最陡的常见边界之一，这就是高锰酸根的氧化能力随溶液被中和而崩溃的原因。
:::
:::

::: exercise 弗罗斯特几何 {level=2 check="0.22"}
对于酸中的氯，累积$nE^\circ$值为：$\mathrm{Cl_2}$（氧化数0）处$0$，$\mathrm{HOCl}$（+1）处$1.63$，$\mathrm{HClO_2}$（+3）处$4.91$，$\mathrm{ClO_3^-}$（+5）处$7.28$。(a) 求三段线段的斜率并指出它们是什么。(b) 用从$\mathrm{Cl_2}$到$\mathrm{HClO_2}$的弦以及从$\mathrm{Cl_2}$到$\mathrm{ClO_3^-}$的弦检验$\mathrm{HOCl}$：哪些歧化是允许的？对于允许的那个，$5\,\mathrm{HOCl} \rightarrow 2\,\mathrm{Cl_2} + \mathrm{ClO_3^-} + \mathrm{H^+} + 2\,\mathrm{H_2O}$，求$E^\circ_\mathrm{cell}$。（以伏特为单位输入$E^\circ_\mathrm{cell}$，保留两位小数。）
::: solution
(a) 斜率：$\mathrm{Cl_2 \to HOCl}$：$1.63$；$\mathrm{HOCl \to HClO_2}$：$(4.91 - 1.63)/2 = 1.64$；$\mathrm{HClO_2 \to ClO_3^-}$：$(7.28 - 4.91)/2 = 1.19$——即拉蒂默电势$E(\mathrm{HOCl/Cl_2})$、$E(\mathrm{HClO_2/HOCl})$、$E(\mathrm{ClO_3^-/HClO_2})$。(b) **与$\mathrm{HClO_2}$比较。** 从$\mathrm{Cl_2}\ (0, 0)$到$\mathrm{HClO_2}\ (3, 4.91)$的弦在氧化数1处的高度为$4.91/3 = 1.637$，恰好略**高于**$\mathrm{HOCl}$的$1.63$。该点位于弦下方，所以$\mathrm{HOCl \to Cl_2 + HClO_2}$不被允许——用拉蒂默形式表示，差距只有$0.01\ \mathrm{V}$（$E(\mathrm{HOCl/Cl_2}) = 1.63 < E(\mathrm{HClO_2/HOCl}) = 1.64$）。

**与$\mathrm{ClO_3^-}$比较。** 从$\mathrm{Cl_2}$到$\mathrm{ClO_3^-}\ (5, 7.28)$的弦在氧化数1处的高度为$7.28/5 = 1.456$，**低于**$1.63$：$\mathrm{HOCl}$位于其上方，歧化为$\mathrm{Cl_2}$和$\mathrm{ClO_3^-}$是允许的。不要直接从竖直间距读出电池电势。间距$1.63 - 1.456 = 0.174\ \mathrm{V}$是每摩尔$\mathrm{HOCl}$的自由能除以$F$；对于配平的反应，消耗五个$\mathrm{HOCl}$，自由能变化为$\Delta_\mathrm{r}G^\circ/F = [2(0) + 7.28] - 5(1.63) = -0.87\ \mathrm{V}$。转移四个电子（一个$\mathrm{HOCl}$从$+1$被氧化到$+5$；四个从$+1$被还原到$0$），所以
$$
E^\circ_\mathrm{cell} = \frac{0.87}{4} = 0.22\ \mathrm{V}
$$
——等价地，$E(\mathrm{HOCl/Cl_2}) - E(\mathrm{ClO_3^-/HOCl}) = 1.63 - (7.28 - 1.63)/4 = 1.63 - 1.41 = 0.22\ \mathrm{V}$，$\log K = 4 \times 0.2175/0.0592 \approx 15$。在碱性漂白剂中，相应的反应是$3\,\mathrm{OCl^-} \rightarrow \mathrm{ClO_3^-} + 2\,\mathrm{Cl^-}$，同样是热力学允许的；商品漂白剂能保存数月，是因为该反应在室温下很慢（受热和浓度升高时会加快）。教训：几何告诉你**是否**发生；至于**多少**，要数电子。
:::
:::

::: exercise 推导判据 {level=3}
从$\Delta_\mathrm{r} G^\circ = -nFE^\circ$出发，推导(i) 三步拉蒂默行的加权平均规则，以及(ii) 歧化判据$E^\circ_\mathrm{right} > E^\circ_\mathrm{left}$，并在(ii)中证明结果与半反应如何缩放无关。
::: hint
把每一步写成具有各自$\Delta_\mathrm{r}G^\circ = -n_iFE_i^\circ$的还原反应，并利用方程相加时反应自由能也相加这一事实。对(ii)，先把两个半反应乘以适当系数使电子消去，然后再相加。
:::
::: solution
(i) 对于电子数为$n_1,n_2,n_3$的第$1,2,3$步：$\Delta_\mathrm{r} G^\circ_\mathrm{total} = -F(n_1E_1 + n_2E_2 + n_3E_3)$，同时又$= -(n_1+n_2+n_3) F E^\circ_\mathrm{total}$；令两者相等并除以$-F\sum n_i$。(ii) B的歧化：还原$\mathrm{B \to C}$（$n_\mathrm{r}$个电子，$E_\mathrm{right}$）与氧化$\mathrm{B \to A}$（$n_\mathrm{l}$个电子，逆向，$E_\mathrm{left}$）耦合。平衡电子数需把两个半反应分别乘以$n_\mathrm{l}$和$n_\mathrm{r}$：$\Delta_\mathrm{r} G^\circ = -n_\mathrm{l} n_\mathrm{r} F E_\mathrm{right} + n_\mathrm{l} n_\mathrm{r} F E_\mathrm{left} = -n_\mathrm{l} n_\mathrm{r} F (E_\mathrm{right} - E_\mathrm{left})$。符号——因而判据——不受缩放影响（这就是为什么电势与自由能不同，可以乘遍半反应而不改变任何东西），且$\Delta_\mathrm{r} G^\circ < 0$当且仅当$E_\mathrm{right} > E_\mathrm{left}$。
:::
:::

::: exercise 冶炼厂的算术 {level=3 check="1263"}
取埃林厄姆拟合$\Delta_\mathrm{r} G^\circ(\mathrm{ZnO}) = -701 + 0.201\,T$和$\Delta_\mathrm{r} G^\circ(\mathrm{CO}) = -221 - 0.179\,T$（单位为每摩尔$\mathrm{O_2}$的$\mathrm{kJ\,mol^{-1}}$）。由反应熵推出斜率以检验这些拟合，求交点温度，并解释为什么工业炼锌在远高于该温度下进行。（以开尔文为单位输入交点温度，精确到开尔文。）
::: hint
标准摩尔熵（$\mathrm{J\,K^{-1}\,mol^{-1}}$）：$\mathrm{Zn(s)}\ 41.6$，$\mathrm{ZnO(s)}\ 43.6$，$\mathrm{C(s)}\ 5.7$，$\mathrm{CO(g)}\ 197.7$，$\mathrm{O_2(g)}\ 205.2$。每条线的斜率为$-\Delta_\mathrm{r}S^\circ$。
:::
::: solution
斜率：对$2\,\mathrm{Zn} + \mathrm{O_2} \rightarrow 2\,\mathrm{ZnO}$，$\Delta_\mathrm{r}S^\circ = 2(43.6) - 2(41.6) - 205.2 = -201.2\ \mathrm{J\,K^{-1}\,mol^{-1}}$，斜率$+0.201\ \mathrm{kJ\,K^{-1}\,mol^{-1}}$；对$2\,\mathrm{C} + \mathrm{O_2} \rightarrow 2\,\mathrm{CO}$，$\Delta_\mathrm{r}S^\circ = 2(197.7) - 2(5.7) - 205.2 = +178.8$，斜率$-0.179$。两个拟合都得到验证。交点：$-701 + 0.201\,T = -221 - 0.179\,T \Rightarrow 0.380\,T = 480 \Rightarrow T = 1263\ \mathrm{K}$（数据大约支持三位有效数字，所以是“约$1260\ \mathrm{K}$”）。在交点处，$\mathrm{ZnO + C \rightarrow Zn + CO}$的$\Delta_\mathrm{r}G^\circ = 0$，所以当所有物种都处于标准态时，反应没有净驱动力。在更高温度下运行使$\Delta_\mathrm{r}G^\circ$变负，加快反应，并使锌保持为蒸气（它在$1180\ \mathrm{K}$沸腾）；把蒸气扫入冷凝器使其分压保持很低，从而把平衡拉向完全转化。
:::
:::
