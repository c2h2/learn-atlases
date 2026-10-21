一块肾结石就是几克结晶的草酸钙或磷酸钙，是身体没能使其保持溶解的产物；牙釉质是羟基磷灰石 $\mathrm{Ca_5(PO_4)_3OH}$，若不是有一种难溶到溶度积约为 $10^{-58}$ 数量级的矿物，唾液早就把它慢慢溶掉了；而一瓶镁乳之所以能缓解烧心，恰恰是因为氢氧化镁溶解不超过约 $10^{-4}\ \mathrm{mol\,dm^{-3}}$，因而无法释放出一记具有伤害性的氢氧根冲击。"难溶"的盐并不是溶液中不存在——它们以一个平衡常数所固定的浓度存在着，而这个常数能回答关于它们的一切问题：这一混合液会不会变浑，这一沉淀会不会在酸里或氨水里重新溶解，能否只靠提高一种试剂的浓度就把两种离子分开。本章就是微溶体系的平衡演算，而它唯一的主题是：溶解度不是某种盐的属性，而是某种盐*在某一特定溶液中的*属性。

## 溶度积

::: definition 溶度积 {#def-solubility-product}
一种**难溶**离子晶体 $\mathrm{M_{a}X_{b}(s)}$ 与其溶液中的离子建立平衡，
$$
\mathrm{M_{a}X_{b}(s) \rightleftharpoons a\,M^{b+}(aq) + b\,X^{a-}(aq)}
\qquad
K_\mathrm{sp} = \left[\mathrm{M^{b+}}\right]^{a}\left[\mathrm{X^{a-}}\right]^{b},
$$
即**溶度积** $K_\mathrm{sp}$——溶解过程的平衡常数，固体略去不写（纯相的活度为 1），而浓度是平衡时饱和溶液的浓度。对氯化银，$\mathrm{25\,^\circ C}$ 时 $K_\mathrm{sp} = [\mathrm{Ag^+}][\mathrm{Cl^-}] = 1.8\times10^{-10}$；对氢氧化镁，$K_\mathrm{sp} = [\mathrm{Mg^{2+}}][\mathrm{OH^-}]^2 = 5.6\times10^{-12}$。除另有说明外，本章所有 $K_\mathrm{sp}$ 值均为 $\mathrm{25\,^\circ C}$ 下有代表性的表列数据。
:::

"积"字是字面意思：它是离子浓度的*乘积*，每个都升到其化学计量数为幂，而正是这个乘法使某一离子的微量对另一种离子来说如此昂贵。**摩尔溶解度** $s$ 是溶解的固体的量（以 $\mathrm{mol\,dm^{-3}}$ 计）；它与 $K_\mathrm{sp}$ 通过溶解的化学计量相联系，两者之间的换算就是本课题的第一项技术。

::: proof 由 $K_\mathrm{sp}$ 求摩尔溶解度 {#proof-solubility-formula}
对盐 $\mathrm{MX}$（1:1 化学计量，如 $\mathrm{AgCl}$），溶解给出 $[\mathrm{M^{+}}]=[\mathrm{X^{-}}]=s$，故 $K_\mathrm{sp} = s^2$、$s = \sqrt{K_\mathrm{sp}}$。对 $\mathrm{MX_2}$（如 $\mathrm{CaF_2}$、$\mathrm{Mg(OH)_2}$），一个化学式单位给出一个阳离子和两个阴离子：$[\mathrm{M^{2+}}]=s$、$[\mathrm{X^-}]=2s$，于是
$$
K_\mathrm{sp} = (s)(2s)^2 = 4s^3
\qquad\Longrightarrow\qquad
s = \sqrt[3]{K_\mathrm{sp}/4}.
$$
对 $\mathrm{M_2X_3}$（如 $\mathrm{Fe_2S_3}$ 型的盐，或 $\mathrm{Ca_3(PO_4)_2}$，其 $K_\mathrm{sp} = (3s)^3(2s)^2$），一般规则是：对 $\mathrm{M_aX_b}$ 有 $K_\mathrm{sp} = a^{a} b^{b}\, s^{\,a+b}$——每个离子浓度是其系数乘以 $s$，而指数相加。对 $\mathrm{Fe(OH)_3}$，$K_\mathrm{sp} = (s)(3s)^3 = 27s^4$，故 $s = (K_\mathrm{sp}/27)^{1/4}$。
:::

::: warning $K_\mathrm{sp}$ 是常数；溶解度不是——而且 $K_\mathrm{sp}$ 值不给溶解度排序 {#warn-compare-ksp}
要把三种混淆分开。第一，$K_\mathrm{sp}$ 只依赖温度（以及离子强度，在本层次我们忽略它）；而*溶解度*会在溶液中任何其他东西改变时改变——共同离子、酸、配位配体。第二，$K_\mathrm{sp}$ **只在相同化学计量的盐之间**才能直接比较摩尔溶解度：$\mathrm{Ag_2CrO_4}$ 的 $K_\mathrm{sp} = 1.1\times10^{-12}$，比 $\mathrm{AgCl}$ 的 $1.8\times10^{-10}$ 小一百倍，但它在纯水中反而是*更*易溶的盐（$6.5\times10^{-5}$ 对 $1.3\times10^{-5}\ \mathrm{mol\,dm^{-3}}$），因为 $4s^3$ 对 $s^2$ 的因子重排了名次。比较之前先换算成 $s$。第三，反应商 $Q$ 是用*当前*的离子浓度、而不是饱和溶液的浓度构成的，它决定方向：$Q > K_\mathrm{sp}$ 沉淀，$Q < K_\mathrm{sp}$ 溶解（详见下文）。
:::

::: proposition 离子积与沉淀判据 {#prop-ionic-product}
把当前离子浓度代入 $K_\mathrm{sp}$ 表达式构成**离子积** $Q_\mathrm{sp}$。若 $Q_\mathrm{sp} > K_\mathrm{sp}$，溶液**过饱和**，将生成沉淀直到 $Q_\mathrm{sp} = K_\mathrm{sp}$；若 $Q_\mathrm{sp} < K_\mathrm{sp}$，溶液**不饱和**，不出现沉淀（加入的固体会溶解）；若 $Q_\mathrm{sp} = K_\mathrm{sp}$，溶液饱和且处于平衡。因为沉淀在 $Q_\mathrm{sp}$ 越过 $K_\mathrm{sp}$ 的一瞬开始，另一种离子*开始*沉淀时的浓度就由令 $Q_\mathrm{sp} = K_\mathrm{sp}$ 求解得到——本章每一个分离背后的计算都是这个。
:::

::: example 氯化银的摩尔溶解度，有无共同离子 {#ex-agcl-common-ion}
求 $\mathrm{AgCl}$（$K_\mathrm{sp} = 1.8\times10^{-10}$）在 (a) 纯水；(b) $0.10\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaCl}$ 中的摩尔溶解度。
::: solution
(a) $s = \sqrt{K_\mathrm{sp}} = \sqrt{1.8\times10^{-10}} = 1.3\times10^{-5}\ \mathrm{mol\,dm^{-3}}$——这"难溶"的盐以十三微摩尔存在着，这就是盛放在银器中的蒸馏水并非不含银的原因。
(b) 现在 $\mathrm{Cl^-}$ 主要来自氯化钠：$[\mathrm{Cl^-}] = 0.10 + s \approx 0.10$，于是 $[\mathrm{Ag^+}] = K_\mathrm{sp}/0.10 = 1.8\times10^{-9}\ \mathrm{mol\,dm^{-3}}$，而每一个溶出的银离子都是从固体来的银离子，故 $s = 1.8\times10^{-9}\ \mathrm{mol\,dm^{-3}}$。共同离子把溶解度砍掉了 $7400$ 倍，而 $K_\mathrm{sp}$ 仍是分毫不差的 $1.8\times10^{-10}$：乘积 $[\mathrm{Ag^+}][\mathrm{Cl^-}]$ 是靠*压缩*那个稀缺离子而恢复的。这就是**同离子效应**，它的一个表现是沉淀要用稀电解质而不用纯水洗涤；它的另一面出现在硬水的浴缸里：钙、镁离子把肥皂中脂肪酸根离子的乘积推过其自身的 $K_\mathrm{sp}$，留下所谓皂垢的那层膜。
:::
:::

::: example 铬酸盐陷阱：哪种银盐更易溶？ {#ex-chromate-trap}
$K_\mathrm{sp}(\mathrm{AgCl}) = 1.8\times10^{-10}$，$K_\mathrm{sp}(\mathrm{Ag_2CrO_4}) = 1.1\times10^{-12}$。哪种盐在纯水中溶出的自身更多？多几倍？
::: solution
化学计量不同，所以先换算：$\mathrm{AgCl}$：$s = \sqrt{1.8\times10^{-10}} = 1.34\times10^{-5}\ \mathrm{mol\,dm^{-3}}$。$\mathrm{Ag_2CrO_4}$：$s = (K_\mathrm{sp}/4)^{1/3} = (2.75\times10^{-13})^{1/3} = 6.5\times10^{-5}\ \mathrm{mol\,dm^{-3}}$。$K_\mathrm{sp}$ *更小*的盐溶解度反而是五倍——$K_\mathrm{sp}/4$ 的立方根就是不跟着 $K_\mathrm{sp}$ 的平方根走。（它们饱和时的银离子浓度 $1.3\times10^{-4}$ 对 $1.3\times10^{-5}\ \mathrm{mol\,dm^{-3}}$，差异也是同一原因。）教训可以推广：不先换算成 $s$，就绝不跨化学计量类型给溶解度排序。
:::
:::

::: quiz 分子层面的同离子效应 {#quiz-common-ion}
一份饱和 $\mathrm{AgCl}$ 溶液，底部还有少量固体，处于平衡。滴入几滴浓 $\mathrm{NaCl}$ 并等待。哪一句话是对的？
- [x] $[\mathrm{Cl^-}]$ 升高，$Q_\mathrm{sp} > K_\mathrm{sp}$，部分析出 $\mathrm{AgCl}$，新的 $[\mathrm{Ag^+}]$ 更低，而 $K_\mathrm{sp}$ 不变。
- [ ] 因为溶液里现在有了更多氯化物，$K_\mathrm{sp}$ 变小了。
- [ ] $[\mathrm{Ag^+}]$ 不变；变的只是固体的量。
- [ ] 加入的 $\mathrm{Na^+}$ 才是共同离子，所以 $[\mathrm{Ag^+}]$ 什么都不会发生。
::: solution
第一句。乘积 $[\mathrm{Ag^+}][\mathrm{Cl^-}]$ 被瞬时推到 $1.8\times10^{-10}$ 之上，溶液过饱和，于是生成固体直到乘积回到 $K_\mathrm{sp}$——而既然 $[\mathrm{Cl^-}]$ 现在更大了，这就迫使 $[\mathrm{Ag^+}]$ 更小。$K_\mathrm{sp}$ 在定温下是常数，并不"知道"你加了什么；共同离子不是钠而是氯。
:::
:::

## pH：碱的溶解度是一个可以拧的旋钮

对任何阴离子是碱的盐——氢氧化物、硫化物、碳酸盐、磷酸盐、氟化物——溶解平衡都偶联着质子平衡，而 $[\mathrm{H_3O^+}]$ 就成了一个控制旋钮。偶联仍然只是常数的相乘。

::: proof 氢氧化物溶解度的 pH 依赖 {#proof-ph-dependence}
对 $\mathrm{M(OH)_{n}}$，$K_\mathrm{sp} = [\mathrm{M^{n+}}][\mathrm{OH^-}]^n$。若 pH 由缓冲液固定（于是 $[\mathrm{OH^-}]$ 是已知常数，而不是 $ns$），则
$$
s = \left[\mathrm{M^{n+}}\right] = \frac{K_\mathrm{sp}}{\left[\mathrm{OH^-}\right]^{n}}
= \frac{K_\mathrm{sp}}{\left(K_\mathrm{w}/\left[\mathrm{H_3O^+}\right]\right)^{n}},
$$
所以溶解度按酸度的 $n$ 次幂增长：pH 每降低一个单位，氢氧化物的溶解度乘以 $10^{n}$。对 $\mathrm{Fe(OH)_3}$ 那是每个 pH 单位 $1000$ 倍——这就是铁(III)的生锈化学与铁(III)的去除都是 pH 故事的原因。这个公式只在它预测的溶解度大于体系中固体的量、或大于溶剂所能容纳的量时失效：那时固体干脆完全溶解，诚实的结论是"在此 pH 下不可能存在饱和溶液"。
:::

::: example 用 pH 把铁(III)与镁分离 {#ex-fe-mg-separation}
一溶液含 $0.010\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Fe^{3+}}$ 与 $0.010\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Mg^{2+}}$。用 $K_\mathrm{sp}(\mathrm{Fe(OH)_3}) = 2.8\times10^{-39}$ 与 $K_\mathrm{sp}(\mathrm{Mg(OH)_2}) = 5.6\times10^{-12}$，求 $\mathrm{Fe^{3+}}$ 开始沉淀的 pH、被除去 99.9 % 时的 pH、以及 $\mathrm{Mg^{2+}}$ 开始沉淀的 pH。两者能单靠 pH 分离吗？
::: solution
$\mathrm{Fe(OH)_3}$ 在 $[\mathrm{OH^-}] = (K_\mathrm{sp}/0.010)^{1/3} = (2.8\times10^{-37})^{1/3} = 6.5\times10^{-13}\ \mathrm{mol\,dm^{-3}}$ 时开始沉淀，即 $\mathrm{pH} = 1.82$。它在 $[\mathrm{Fe^{3+}}] = 1.0\times10^{-5}$ 时已除去 99.9 %，此时 $[\mathrm{OH^-}] = (2.8\times10^{-39}/10^{-5})^{1/3} = 6.5\times10^{-12}$，$\mathrm{pH} = 2.82$。$\mathrm{Mg(OH)_2}$ 在 $[\mathrm{OH^-}] = (5.6\times10^{-12}/0.010)^{1/2} = 2.4\times10^{-5}$ 时开始沉淀，$\mathrm{pH} = 9.37$。两个窗口互不接触：把 pH 升到约 $3$–$4$，铁就沉淀干净，而镁在自己沉淀点之下整整六个 pH 单位处仍留在溶液里。这正是定性分析方案与湿法冶金厂从酸性浸出液中除铁的做法（"加石灰沉铁至 pH 4"），而它依靠的不过是上面证明里 $10^{n}$ 的杠杆。
:::
:::

::: widget plot
f: 100*2.8e-39/((10^(x-14))^3*0.01)
x: 1, 4
y: 0, 100
caption: 初始 $0.010\ \mathrm{mol\,dm^{-3}}$ 的 $\mathrm{Fe^{3+}}$ 浓度中残留在溶液里的百分数随 pH 的变化，取自 $K_\mathrm{sp} = 2.8\times10^{-39}$：曲线是 $100\,K_\mathrm{sp}/\left([\mathrm{OH^-}]^3 \times 0.010\right)$，其中 $[\mathrm{OH^-}] = K_\mathrm{w}/10^{-\mathrm{pH}}$。它在 $\mathrm{pH} = 1.8$ 处穿过 100 %（开始沉淀），到 $\mathrm{pH}\ 2$ 降到 $28\ \%$，到 $\mathrm{pH}\ 3$ 降到 $0.028\ \%$——$[\mathrm{OH^-}]$ 的三次项使氢氧化物沉淀对 pH 极其陡峭。对照镁：它的曲线要到 $\mathrm{pH}\ 9.4$ 才开始。
:::

同样的杠杆作用于弱酸盐，只是质子作用在阴离子上。氟化物是碱（$\mathrm{F^- + H_3O^+ \rightleftharpoons HF + H_2O}$），所以酸溶解 $\mathrm{CaF_2}$ 是双份的：它从溶度积里*移走* $\mathrm{F^-}$，*又*把更多固体拖进溶液。

::: example 酸性溶液中的氟化钙 {#ex-caf2-ph}
$K_\mathrm{sp}(\mathrm{CaF_2}) = 3.9\times10^{-11}$，$K_\mathrm{a}(\mathrm{HF}) = 6.8\times10^{-4}$。求 $\mathrm{CaF_2}$ 在 (a) 纯水、(b) $\mathrm{pH}\ 3.00$ 缓冲液中的摩尔溶解度。
::: solution
(a) $s = (K_\mathrm{sp}/4)^{1/3} = 2.1\times10^{-4}\ \mathrm{mol\,dm^{-3}}$。
(b) 定 pH 下氟的物料衡算是 $2s = [\mathrm{F^-}] + [\mathrm{HF}]$，而酸平衡固定了保持自由的氟的分数：$\alpha = K_\mathrm{a}/(K_\mathrm{a} + [\mathrm{H_3O^+}]) = 6.8\times10^{-4}/(6.8\times10^{-4} + 1.0\times10^{-3}) = 0.40$，于是 $[\mathrm{F^-}] = 0.40 \times 2s$，$K_\mathrm{sp} = s\,(0.81s)^2 = 0.66\,s^3$，得 $s = 3.9\times10^{-4}\ \mathrm{mol\,dm^{-3}}$——几乎翻倍。同样的计算在 $\mathrm{pH}\ 2$（$\alpha = 0.064$）给出 $1.3\times10^{-3}\ \mathrm{mol\,dm^{-3}}$，是纯水值的六倍。这就是为什么牙膏含氟而泡在汽水里的牙保不住完好：牙釉质的磷灰石遇酸溶解的方式与 $\mathrm{CaF_2}$ 完全一样，而唾液的缓冲液才是把平衡拉回去的东西。
:::
:::

::: widget newton
f: 4*x^3*(6.8e-4/(6.8e-4+1e-3))^2 - 3.9e-11
method: newton
x0: 0.0005
caption: 牛顿法求解缓冲溶解度方程 $4\alpha^2 s^3 = K_\mathrm{sp}$ 中的 $s$，即 $\mathrm{CaF_2}$ 在 $\mathrm{pH}\ 3.00$ 的摩尔溶解度，其中 $\alpha = K_\mathrm{a}/(K_\mathrm{a}+[\mathrm{H_3O^+}]) = 0.405$ 已内置于函数。迭代收敛于 $s = 3.9\times10^{-4}\ \mathrm{mol\,dm^{-3}}$；纯水的答案 $2.1\times10^{-4}$ 就是同一方程取 $\alpha = 1$。
:::

::: example 按 pH 沉硫化物：定性分析的酸碱逻辑 {#ex-sulfide-grouping}
饱和硫化氢水溶液约为 $0.10\ \mathrm{mol\,dm^{-3}}$，按现代解离常数，硫离子浓度服从 $[\mathrm{H^+}]^2[\mathrm{S^{2-}}] \approx 1\times10^{-27}$（代表性数值：$K_{\mathrm{a}1}K_{\mathrm{a}2}[\mathrm{H_2S}]$）。取 $K_\mathrm{sp}(\mathrm{CuS}) = 6\times10^{-37}$、$K_\mathrm{sp}(\mathrm{ZnS}) = 2\times10^{-25}$、$K_\mathrm{sp}(\mathrm{MnS}) = 3\times10^{-14}$（硫化物的 $K_\mathrm{sp}$ 随固体形态相差多个数量级——这些值当作代表性数值看待）。对每一种，判断 0.010 M 的离子是否以硫化物沉淀：(i) 在 $0.5\ \mathrm{mol\,dm^{-3}}$ 酸中；(ii) 在 $\mathrm{pH}\ 9$。
::: solution
在 $0.5\ \mathrm{mol\,dm^{-3}}$ 酸中，$[\mathrm{S^{2-}}] = 1\times10^{-27}/0.25 = 4\times10^{-27}$，故 $Q = 0.010 \times 4\times10^{-27} = 4\times10^{-29}$：它超过 $K_\mathrm{sp}(\mathrm{CuS})$——铜在强酸中也沉淀——但低于 $K_\mathrm{sp}(\mathrm{ZnS})$、更远低于 $K_\mathrm{sp}(\mathrm{MnS})$：无锌，无锰。在 $\mathrm{pH}\ 9$，$[\mathrm{S^{2-}}] = 1\times10^{-27}/10^{-18} = 1\times10^{-9}$，$Q = 1\times10^{-11}$，同时超过 $2\times10^{-25}$ 与 $3\times10^{-14}$：锌和锰此时沉淀。0.010 M 离子开始沉淀的 pH 由 $[\mathrm{S^{2-}}] = K_\mathrm{sp}/0.010$ 得出：锌在 $\mathrm{pH}\ 2.2$ 开始，锰要到 $\mathrm{pH}\ 7.7$。这一个计算*就是*经典的硫化氢组分离——II 组（Cu、Pb、Hg、Bi：在酸中沉淀）与 IV 组（Zn、Mn、Ni、Co：在氨性溶液中沉淀）——只用两次乘法完成。实用注记：$\mathrm{H_2S}$ 剧毒且易燃，所以教学方案如今改用更安全的硫源；平衡逻辑不变。
:::
:::

## 配离子：会重新溶解的沉淀

阳离子遇到合适的配体不会仅仅待在溶液里——它会配位，有时配位之强使配位反应把溶液中的自由离子掏空，一个"本该"存在的沉淀便无法存活。

::: definition 配离子与生成常数 {#def-complex-ion}
**配离子**是一个中心金属离子与一组配体（带孤对电子的分子或阴离子：$\mathrm{NH_3}$、$\mathrm{CN^-}$、$\mathrm{Cl^-}$、$\mathrm{OH^-}$、水）结合而成。平衡 $\mathrm{Ag^+ + 2\,NH_3 \rightleftharpoons Ag(NH_3)_2^+}$ 有一个**生成常数** $K_\mathrm{f} = \left[\mathrm{Ag(NH_3)_2^+}\right]/\left([\mathrm{Ag^+}][\mathrm{NH_3}]^2\right) = 1.6\times10^{7}$：$K_\mathrm{f}$ 大意味着配离子是主导物种。通过两个以上给体原子配位的配体（螯合效应——EDTA、草酸根）给出更大的有效稳定性。配位反应就是金属的路易斯酸碱化学，而"难溶"氯化物溶于氨水、"难溶"氢氧化物溶于过量碱、银溶于氰化物，全是因为它。
:::

::: proposition 偶联平衡以常数相乘相加 {#prop-coupling}
若两个方程相加得到第三个，第三个的平衡常数是前两个之*积*。$\mathrm{AgCl}$ 溶于氨水是 $\mathrm{AgCl(s) \rightleftharpoons Ag^+ + Cl^-}$（$K_\mathrm{sp}$）与 $\mathrm{Ag^+ + 2\,NH_3 \rightleftharpoons Ag(NH_3)_2^+}$（$K_\mathrm{f}$）之和：
$$
\mathrm{AgCl(s) + 2\,NH_3 \rightleftharpoons Ag(NH_3)_2^+ + Cl^-}
\qquad K = K_\mathrm{sp}\,K_\mathrm{f}.
$$
同一条规则支配着酸溶解（碳酸盐为 $K = K_\mathrm{sp}/(K_{\mathrm{a}1}K_{\mathrm{a}2})$，氢氧化物为 $K = K_\mathrm{sp}/K_\mathrm{w}^n$ 型），而它是一切副反应——质子化、配位、氧化还原——增大溶解度的普遍机制：它移走溶解的一个产物，乘积 $Q_\mathrm{sp}$ 就永远到不了 $K_\mathrm{sp}$。
:::

::: example 氨水溶解氯化银 {#ex-ammonia-dissolution}
$1.0\ \mathrm{mol\,dm^{-3}}$ 氨水能溶解多少 $\mathrm{AgCl}$？$K_\mathrm{sp} = 1.8\times10^{-10}$，$K_\mathrm{f}(\mathrm{Ag(NH_3)_2^+}) = 1.6\times10^{7}$。
::: solution
总常数为 $K = K_\mathrm{sp}K_\mathrm{f} = 2.9\times10^{-3}$。设溶解度为 $s$，则 $[\mathrm{Ag(NH_3)_2^+}] = [\mathrm{Cl^-}] = s$、$[\mathrm{NH_3}] = 1.0 - 2s$，于是 $s^2/(1.0-2s)^2 = 2.9\times10^{-3}$，$s/(1-2s) = 0.054$，得 $s = 0.048\ \mathrm{mol\,dm^{-3}}$——是水中溶解度的三千倍。这就是稀氨水漂洗能把照相底片上未感光的 $\mathrm{AgBr}$ 型卤化银洗掉的原因，也是旧的定性分析流程图把 $\mathrm{AgCl}$（溶于氨水）、$\mathrm{AgBr}$（只溶部分）与 $\mathrm{AgI}$（不溶）分开的依据：同一套 $K_\mathrm{sp}K_\mathrm{f}$ 算术，不同的数字。
:::
:::

配位与沉淀在同一对离子上竞争，而当配体恰好就是沉淀剂离子本身——银上的氯离子——两种效应彼此角力，溶解度便经过一个极小值。

::: widget plot
f: 1.8e-10/10^x + 1.8e-10*1.8e5*10^x
x: -4, 0
y: 0, 3.5e-5
caption: $\mathrm{AgCl}$ 的摩尔溶解度 $s = K_\mathrm{sp}/[\mathrm{Cl^-}] + K_\mathrm{sp}\beta_2\,[\mathrm{Cl^-}]$（$\mathrm{AgCl_2^-}$ 的 $\beta_2 \approx 1.8\times10^{5}$）对 $\log_{10}[\mathrm{Cl^-}]$ 作图。从左边看，加入的氯离子是共同离子，溶解度按 $K_\mathrm{sp}/[\mathrm{Cl^-}]$ 下降；越过 $[\mathrm{Cl^-}] = 1/\sqrt{\beta_2} = 2.4\times10^{-3}\ \mathrm{mol\,dm^{-3}}$ 的极小值后，配位项接管，溶解度重新上升——浓氯离子把沉淀又溶了回去。实用规则：洗涤氯化物沉淀用稀而*不*用浓的电解质；追"盐析"时别追到把盐追回溶液里。
:::

## 分步沉淀：一种试剂，两种离子

::: example 卤素分离：银先沉溴化银还是氯化银 {#ex-halide-selectivity}
一溶液对 $\mathrm{Cl^-}$ 与 $\mathrm{Br^-}$ 均为 $0.010\ \mathrm{mol\,dm^{-3}}$。加入固体 $\mathrm{AgNO_3}$ 缓慢提高 $[\mathrm{Ag^+}]$（体积变化可忽略）。哪种卤素先沉淀？第二种开始时 $[\mathrm{Ag^+}]$ 是多少？那时第一种还剩几分之几？$K_\mathrm{sp}(\mathrm{AgCl}) = 1.8\times10^{-10}$，$K_\mathrm{sp}(\mathrm{AgBr}) = 5.4\times10^{-13}$。
::: solution
$\mathrm{AgBr}$ 开始沉淀只需 $[\mathrm{Ag^+}] = 5.4\times10^{-13}/0.010 = 5.4\times10^{-11}\ \mathrm{mol\,dm^{-3}}$；$\mathrm{AgCl}$ 需要 $1.8\times10^{-8}$——银多三百倍，所以溴先沉淀。当 $[\mathrm{Ag^+}]$ 达到 $1.8\times10^{-8}$、氯化银开始析出时，剩余的溴为 $[\mathrm{Br^-}] = 5.4\times10^{-13}/1.8\times10^{-8} = 3.0\times10^{-5}\ \mathrm{mol\,dm^{-3}}$，即原来的 $0.3\ \%$——第一颗 $\mathrm{AgCl}$ 晶体出现之前，99.7 % 的溴已经出去。比值 $[\mathrm{Cl^-}]/[\mathrm{Br^-}] = K_\mathrm{sp}(\mathrm{AgCl})/K_\mathrm{sp}(\mathrm{AgBr}) = 333$ 在整个共沉淀区间都成立，这就是一般结果：共享一种沉淀剂的两种离子按其 $K_\mathrm{sp}$ 值之比分离；当该比值足够大时分离即"完全"（经典判据：99.9 %）。
:::
:::

::: history
本章的算术比它的理论年长得多。经典的湿法分析流程图——一组接一组、一个沉淀接一个沉淀、$\mathrm{H_2S}$ 先酸后氨——在卡尔·雷米吉乌斯·弗雷泽尼乌斯（Fresenius）的《定性化学分析手册》（*Handbuch der qualitativen chemischen Analyse*，1841）及其随后的定量分析姊妹篇中已经定型，那时还没有人能写下一个 $K_\mathrm{sp}$。弗里德里希·莫尔（Mohr）在 1855 年把沉淀变成了容量分析，发明了以铬酸盐作指示剂的氯离子滴定，至今仍以他的命名；雅各布·佛尔哈德（Volhard）以铁作指示剂的银回滴法随后于 1874 年出现。平衡常数解释随着阿伦尼乌斯（Arrhenius）的离子理论与 1890–1900 年代的多相平衡热力学到来，一举说明了旧配方为何有效、以及它们究竟能被推到多远——一个手工业传统等待理论两代人、而理论一到即立见其用的罕见例子。
:::

::: warning "难溶"从不等于零——而常数还有小字条款 {#warn-insoluble}
一个"沉淀"会把它其余的离子按 $K_\mathrm{sp}$ 支配的浓度留在溶液里：过滤一份饱和 $\mathrm{AgCl}$ 溶液仍要损失 $1.3\times10^{-5}\ \mathrm{mol\,dm^{-3}}$ 的银，当银正是你要保住的待测组分时这就要紧（重量分析中的洗涤液由此而来），当沉淀是废卤水时这在生态上也要紧。两条小字条款：其一，$\mathrm{Fe(OH)_3}$ 的公式 $s = (K_\mathrm{sp}/27)^{1/4}$ 假设氢氧根的唯一来源是固体；在 $s \sim 10^{-10}$ 处这不成立——水自身提供的 $10^{-7}\ \mathrm{mol\,dm^{-3}}$ 氢氧根占主导，真实溶解度更高（何况固体表面的化学此时接管）。当算出的 $ns$ 接近 $10^{-7}$ 时，用 pH 由外部固定的缓冲溶解度公式，而不用纯水公式。其二，沉淀是一个动力学事件：溶液可以停在过饱和状态而不浑浊（一瓶无云的醋酸钠三水合物暖手宝正是如此），直到一颗晶种或一道划痕引发固体。$Q_\mathrm{sp} > K_\mathrm{sp}$ 说的是沉淀*可能*生成，不是它*必然立刻*生成。
:::

::: quiz 一种试剂，两种阳离子 {#quiz-selective}
一溶液含 $0.10\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Na^+}$ 与 $0.10\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Ag^+}$。加入稀 $\mathrm{HCl}$。会发生什么？
- [x] $\mathrm{AgCl}$ 沉淀而 $\mathrm{NaCl}$ 留在溶液里，因为氯化银的 $Q_\mathrm{sp}$ 早在氯化钠可能饱和之前就已越过 $K_\mathrm{sp}$。
- [ ] 两种氯化物一起沉淀，因为两者"都是氯化物"。
- [ ] $\mathrm{NaCl}$ 先沉淀，因为钠是更丰富的离子。
- [ ] 在两种离子都达到 $0.10\ \mathrm{mol\,dm^{-3}}$ 氯化物之前什么都不沉淀。
::: solution
第一句。$\mathrm{AgCl}$ 存在 $K_\mathrm{sp}$ 是因为氯化银难溶；氯化钠是*易溶*盐——它在约 $6\ \mathrm{mol\,dm^{-3}}$ 才饱和，其离子积比此处任何情形高出八个数量级，所以永不浑浊。分步沉淀之所以可行，是因为 $K_\mathrm{sp}$ 值在各盐之间横跨数十个数量级，而浓度不会。
:::
:::

## 后续内容

溶解度平衡是 [[general-chemistry-2/chemical-equilibrium]] 的质量作用机制应用于一个固相；pH 依赖是 [[general-chemistry-2/acids-bases]] 的酸碱化学的反向阅读；把铁与镁分开的缓冲液就是 [[general-chemistry-2/buffers-titrations]] 的那些。本章设定的离子浓度馈入 [[general-chemistry-2/electrochemistry-intro]] 的电极电势——$\mathrm{Ag/AgCl}$ 这样难溶的电极就是一个乔装过的 $K_\mathrm{sp}$——而配离子的命名属于 [[general-chemistry-1/formulas-nomenclature]]。完整的分析处理（含活度与分组分离方案）见 [[analytical-chemistry/classical-analysis]] 与 [[analytical-chemistry/equilibria-in-analysis]]。

::: summary
- "难溶"盐溶解到的浓度由 $K_\mathrm{sp}$ 固定，它是溶解的平衡常数、固体不写；定温下 $K_\mathrm{sp}$ 恒定，溶解度不恒定。
- 经化学计量把 $K_\mathrm{sp}$ 换算成摩尔溶解度（$s = \sqrt{K_\mathrm{sp}}$、$\sqrt[3]{K_\mathrm{sp}/4}$、$\sqrt[4]{K_\mathrm{sp}/27}$）；绝不单凭 $K_\mathrm{sp}$ 跨化学计量给溶解度排序。
- $Q_\mathrm{sp}$ 对 $K_\mathrm{sp}$ 决定方向：过饱和则沉淀，不饱和则溶解；沉淀阈值由令 $Q_\mathrm{sp} = K_\mathrm{sp}$ 得到。
- 共同离子按乘积规则压制溶解度；固定 pH 的缓冲液使任何弱酸盐的溶解度每 pH 单位增大 $10^{n}$ 倍。
- 配位反应乘进 $K_\mathrm{sp}$（$K = K_\mathrm{sp}K_\mathrm{f}$），能把沉淀整个溶回；当配体就是沉淀剂离子时，溶解度经过一个极小值。
- 共享一种沉淀剂的两种离子按其 $K_\mathrm{sp}$ 值之比分离——分步沉淀、硫化物分组、莫尔法与佛尔哈德法的基础。
- 一切移走溶解产物的副反应（质子化、配位、氧化还原）都增大溶解度；以常数相乘偶联平衡是普遍技术。
:::

## 练习

::: exercise 碳酸钙的摩尔溶解度 {level=1 check="5.8"}
$K_\mathrm{sp}(\mathrm{CaCO_3}) = 3.4\times10^{-9}$。求方解石在纯水中的摩尔溶解度。（摩尔溶解度以 $10^{-5}\ \mathrm{mol\,dm^{-3}}$ 为单位输入。）
::: solution
$s = \sqrt{K_\mathrm{sp}} = \sqrt{3.4\times10^{-9}} = 5.8\times10^{-5}\ \mathrm{mol\,dm^{-3}}$——以 $\mathrm{CaCO_3}$ 计约 $6\ \mathrm{mg\,dm^{-3}}$，已足够让硬水一年在壶底结出水垢。
:::
:::

::: exercise 镁乳的 pH {level=1 check="10.35"}
$K_\mathrm{sp}(\mathrm{Mg(OH)_2}) = 5.6\times10^{-12}$。求氢氧化镁在纯水中饱和溶液的 pH。（输入 pH。）
::: solution
$s = (K_\mathrm{sp}/4)^{1/3} = 1.1\times10^{-4}\ \mathrm{mol\,dm^{-3}}$，故 $[\mathrm{OH^-}] = 2s = 2.2\times10^{-4}\ \mathrm{mol\,dm^{-3}}$，$\mathrm{pOH} = 3.65$，$\mathrm{pH} = 10.35$。饱和悬浊液是弱碱性的——作为抗酸剂是安全的，而同 pH 的一杯澄清氢氧化钠溶液就做不到：未溶的固体封顶了氢氧根的供应，无论吞下多少镁乳，pH 都升不过 $10.35$。
:::
:::

::: exercise 会变浑吗？ {level=1}
等体积的 $2.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$ $\mathrm{BaCl_2}$ 与 $2.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Na_2SO_4}$ 混合。硫酸钡会沉淀吗？$K_\mathrm{sp}(\mathrm{BaSO_4}) = 1.1\times10^{-10}$。
::: solution
混合使两者浓度减半：$[\mathrm{Ba^{2+}}] = [\mathrm{SO_4^{2-}}] = 1.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$，故 $Q_\mathrm{sp} = 1.0\times10^{-8} > 1.1\times10^{-10}$。会——过饱和九十倍，$\mathrm{BaSO_4}$ 使混合液变浑（这是检验硫酸根的经典方法，也是 X 光"钡餐"用硫酸钡而不用可溶氯化钡的原因：硫酸根那一版永不溶解）。
:::
:::

::: exercise 氯化钙中的氯化银 {level=2 check="4.5"}
求 $\mathrm{AgCl}$（$K_\mathrm{sp} = 1.8\times10^{-10}$）在 $0.020\ \mathrm{mol\,dm^{-3}}$ $\mathrm{CaCl_2}$ 中的摩尔溶解度。（摩尔溶解度以 $10^{-9}\ \mathrm{mol\,dm^{-3}}$ 为单位输入。）
::: solution
$[\mathrm{Cl^-}] = 2 \times 0.020 = 0.040\ \mathrm{mol\,dm^{-3}}$（钙盐给出两个氯离子——本题就是为了逮住这个疏漏），故 $s = K_\mathrm{sp}/0.040 = 4.5\times10^{-9}\ \mathrm{mol\,dm^{-3}}$。
:::
:::

::: exercise 混合后残留的钡 {level=2 check="1.0"}
等体积的 $0.0020\ \mathrm{mol\,dm^{-3}}$ $\mathrm{BaCl_2}$ 与 $0.0020\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Na_2SO_4}$ 混合，让沉淀沉降。清液中 $[\mathrm{Ba^{2+}}]$ 是多少？$K_\mathrm{sp}(\mathrm{BaSO_4}) = 1.1\times10^{-10}$。（浓度以 $10^{-5}\ \mathrm{mol\,dm^{-3}}$ 为单位输入。）
::: solution
混合液起始各为 $0.0010\ \mathrm{mol\,dm^{-3}}$，$Q_\mathrm{sp} = 1.0\times10^{-6} \gg K_\mathrm{sp}$，故沉淀近乎完全，留下的钡与硫酸根相等：$[\mathrm{Ba^{2+}}] = \sqrt{K_\mathrm{sp}} = 1.0\times10^{-5}\ \mathrm{mol\,dm^{-3}}$。百分之九十九的钡已沉淀，但液体仍远非无钡——重量分析者用稀硫酸盐而不用纯水洗涤，以便在不使固体胶溶的情况下把这一浓度压得更低。
:::
:::

::: exercise 沉淀镁 {level=2 check="10.87"}
一溶液对 $\mathrm{Mg^{2+}}$ 为 $0.010\ \mathrm{mol\,dm^{-3}}$。至少要把它升到什么 pH，才能把 99.9 % 的镁以氢氧化物沉淀出来？$K_\mathrm{sp}(\mathrm{Mg(OH)_2}) = 5.6\times10^{-12}$。（输入 pH。）
::: solution
除去 99.9 % 后剩 $[\mathrm{Mg^{2+}}] = 1.0\times10^{-5}\ \mathrm{mol\,dm^{-3}}$，故 $[\mathrm{OH^-}] = \sqrt{5.6\times10^{-12}/10^{-5}} = 2.4\times10^{-4}\ \mathrm{mol\,dm^{-3}}$，$\mathrm{pOH} = 3.13$，$\mathrm{pH} = 10.87$。注意与铁的例子对照的不对称：同样的活儿，铁在 pH 2.8 就干完了，镁却要 pH 接近 11，七个单位的差距纯粹是 $K_\mathrm{sp}$ 的杠杆。
:::
:::

::: exercise 莫尔测定 {level=3 check="0.0054"}
在氯离子的莫尔滴定中，指示剂是 $1.0\times10^{-3}\ \mathrm{mol\,dm^{-3}}$ 的铬酸盐，溶液对 $\mathrm{Cl^-}$ 为 $0.10\ \mathrm{mol\,dm^{-3}}$。用 $K_\mathrm{sp}(\mathrm{AgCl}) = 1.8\times10^{-10}$ 与 $K_\mathrm{sp}(\mathrm{Ag_2CrO_4}) = 1.1\times10^{-12}$，求红色铬酸银初现的一瞬，仍在溶液中的氯离子的百分数。（输入百分数。）
::: solution
铬酸银在 $[\mathrm{Ag^+}] = \sqrt{1.1\times10^{-12}/1.0\times10^{-3}} = 3.3\times10^{-5}\ \mathrm{mol\,dm^{-3}}$ 时开始析出。在该银浓度下留在溶液中的氯为 $[\mathrm{Cl^-}] = 1.8\times10^{-10}/3.3\times10^{-5} = 5.4\times10^{-6}\ \mathrm{mol\,dm^{-3}}$，即 $5.4\times10^{-6}/0.10 = 0.0054\ \%$。终点时氯已沉淀 99.99 %——这就是该方法可行的原因——但同一套算术也表明指示剂不能太浓，否则铬酸盐信号会在化学计量点之前到来。
:::
:::

::: exercise 缓冲液中的氢氧化镁 {level=3 check="5.6"}
求 $\mathrm{Mg(OH)_2}$（$K_\mathrm{sp} = 5.6\times10^{-12}$）在 $\mathrm{pH}\ 10.00$ 缓冲液中的摩尔溶解度。（摩尔溶解度以 $10^{-4}\ \mathrm{mol\,dm^{-3}}$ 为单位输入。）
::: solution
在 $\mathrm{pH}\ 10.00$，$[\mathrm{OH^-}] = 1.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$ 由缓冲液固定，故 $s = K_\mathrm{sp}/[\mathrm{OH^-}]^2 = 5.6\times10^{-12}/10^{-8} = 5.6\times10^{-4}\ \mathrm{mol\,dm^{-3}}$——是纯水溶解度的五倍，因为缓冲液吸收了固体释放的氢氧根。在 $\mathrm{pH}\ 7.4$，同一公式给出 $89\ \mathrm{mol\,dm^{-3}}$，这个荒谬值说的就是它的字面意思：那里不可能存在饱和溶液，任何合理量的固体都会完全溶解。
:::
:::

::: exercise 一般溶解度公式 {level=3}
对 $\mathrm{M_aX_b}$ 推导 $K_\mathrm{sp} = a^{a}b^{b}s^{\,a+b}$，并用它解释为什么 $\mathrm{Fe(OH)_3}$ 的纯水公式必须存疑而缓冲公式是安全的。
::: solution
$\mathrm{M_aX_b \rightleftharpoons a\,M^{b+} + b\,X^{a-}}$，其中 $[\mathrm{M^{b+}}] = as$、$[\mathrm{X^{a-}}] = bs$，得 $K_\mathrm{sp} = (as)^a(bs)^b = a^ab^bs^{a+b}$。对 $\mathrm{Fe(OH)_3}$：$K_\mathrm{sp} = 27s^4$，$s = 1.0\times10^{-10}\ \mathrm{mol\,dm^{-3}}$，这预测 $[\mathrm{OH^-}] = 3s = 3\times10^{-10}$——*低于*水自身提供的 $10^{-7}\ \mathrm{mol\,dm^{-3}}$。"氢氧根全来自固体"的假设失效，所以纯水公式低估了溶解度（何况真实的 $\mathrm{Fe(OH)_3}$ 是胶状水合氧化物，本就是一个表面化学问题）。缓冲公式 $s = K_\mathrm{sp}/[\mathrm{OH^-}]^3$ 只假设 $[\mathrm{OH^-}]$ 由外部固定，而缓冲液保证这一点——它之所以安全，恰恰因为它从不要求固体对氢氧根负责。
:::
:::
