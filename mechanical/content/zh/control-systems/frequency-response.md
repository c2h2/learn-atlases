根轨迹回答的是"极点往哪里去？"这个问题；伯德图回答的则是现场工程师真正能问出口的问题——"我还能再加多少增益，这个回路能容忍多少滞后？"两者是同一份信息的重新包装，而正是这种重新包装使频率响应成为控制领域的工作语言。一条实测的频率响应曲线，把对象、执行器、传感器、布线电容与采样滞后全部装进一条曲线里，而且不必写任何微分方程就能取得——这就是为什么凡是整定伺服回路与过程回路的地方，频率响应分析仪都是标准的调试设备。

这个方法建立在关于**最小相位**系统的一个非凡事实之上：幅值曲线决定相角曲线。增益一旦画好，相角就不是额外的信息，而是它的变换，于是整个设计空间坍缩为一条曲线的形状。例外——积分器、滞后、右半平面零点、渐近线分辨不出的窄共振——恰恰是实践中出问题的东西，把它们当作**对规则的偏离**来记住，是现场最快的诊断法：相角下降得比斜率预测的更快，那是滞后或未被建模的共振；相角在下降而幅值却是平的，那是一阶全通。

::: warning 直线图只是草图，而草图在三处具体地方说谎
渐近线伯德作图法逐因子相加分贝与角度，而这只在极限意义下才精确。三种失效是系统性的，且各有大小。**谐振峰是看不见的：**阻尼比$0.2$的复极点对在其固有频率处高出渐近线$1 / \left( 2 \zeta \right) = 2.5$倍，即$8\ \mathrm{dB}$，所以一个渐近线位于$0\ \mathrm{dB}$以下几分贝的机械共振，实际上可能冒出$0\ \mathrm{dB}$线，形成草图上看不到的第二个穿越点。**共振的相角是被压缩的：**轻阻尼极点对在一个狭窄频带内就转过几乎全部$- 180^{\circ}$——$\zeta = 0.2$时在$\omega_n / 2$处滞后$- 15^{\circ}$、在$2 \omega_n$处滞后$- 165^{\circ}$——而直线相角把这一变化摊在两个数量级上，所以在$\omega_n$的三倍范围以内它都会错上几十度。**而且这张图画的是回路断开时的回路增益**，而恰恰在这个条件下，具有不稳定模态、饱和执行器或条件稳定区域的对象，其表现与闭环现实毫无相似之处。职业习惯是先画渐近线，用三十秒找到穿越频率，然后在那一个频率上算出精确的幅值与相角，之后才相信其中任何数字。
:::

## 读图

::: definition 三个模板因子与分贝的算术 {#def-bode}
每张伯德图都由少数几个模板因子拼成，以分贝相加：

| 因子 | 幅值 | 相角 | 斜率 |
|---|---|---|---|
| 增益$K$ | $20 \log_{10} K$ dB，平坦 | $0^{\circ}$ | $0$ dB/dec |
| 积分器$1 / \left( \mathrm{j} \omega \right)$ | $- 20 \log_{10} \omega$ | $- 90^{\circ}$ 平坦 | $- 20$ dB/dec |
| 极点$1 / \left( 1 + \mathrm{j} \omega / \omega_b \right)$ | 先$0$后$- 20$ dB/dec | $0 \rightarrow - 90^{\circ}$ | $\omega_b$之后$- 20$ dB/dec |
| 零点$1 + \mathrm{j} \omega / \omega_b$ | 先$0$后$+ 20$ dB/dec | $0 \rightarrow + 90^{\circ}$ | $\omega_b$之后$+ 20$ dB/dec |
| 极点对$\omega_n^{2} / \left( s^{2} + 2 \zeta \omega_n s + \omega_n^{2} \right)$ | 先$0$后$- 40$ dB/dec | $0 \rightarrow - 180^{\circ}$ | $- 40$ dB/dec，峰值$1 / \left( 2 \zeta \right)$ |

有用的算术：$20\ \mathrm{dB}$是十倍，$6\ \mathrm{dB}$是两倍，$3\ \mathrm{dB}$是$\sqrt{2}$，$1\ \mathrm{dB}$是$1.12$。极点在其转折频率处贡献其总相角的一半，即$- 45^{\circ}$，在转折频率的十分之一到十倍之间相角约按每数量级$- 45^{\circ}$变化；而极点对的相角恰在$\omega_n$处经过$- 90^{\circ}$，与阻尼无关。
:::

::: proof 斜率预测相角 {#proof-slope-phase}
对最小相位传递函数，某频率处的相角是邻近频率处幅值的**对数斜率**的加权平均。当斜率在几个数量级内保持常数时，平均坍缩为局部值，于是
$$
\varphi \approx \frac{\pi}{2} \frac{\mathrm{d} \ln \left| G \right|}{\mathrm{d} \ln \omega} \ \text{弧度}
\qquad\Longleftrightarrow\qquad
\varphi \left[ ^{\circ} \right] \approx 4.5 \times \left( \text{每数量级的 dB 斜率} \right) .
$$
**校核（对模板）。**单个极点在高频率处斜率为$- 20$、相角为$- 90^{\circ}$：$4.5 \times \left( - 20 \right) = - 90$ $\checkmark$。极点对：$- 180$ $\checkmark$。纯积分器，斜率$- 20$、相角$- 90^{\circ}$平坦 $\checkmark$。在单个极点自己的转折频率处，局部斜率为$- 10$，公式给出$- 45^{\circ}$，而这正是精确值——关系在那里不只是渐近的。$\checkmark$
**宽带幂律的推导。**若$\left| G \right| = A \omega^{n}$在一个频带内成立，则由解析延拓，在该带内$G \approx A \left( \mathrm{j} \omega \right)^{n}$，于是$\varphi = n \pi / 2$精确成立。一般情形之所以成立，是因为精确关系——伯德增益-相角积分——把$\omega^{\prime} = \omega u$处的斜率以每单位$\ln u$为$\left( 2 / \pi^{2} \right) \ln \coth \left( \left| \ln u \right| / 2 \right)$的权重加权，这是一个单位面积、$88\ \%$的权重位于$\omega$七倍以内的核——这就是局部斜率为何有效、以及幅值突变时它为何失效的原因。$\checkmark$

**注。**这个关系既是伯德幅值图可以**读**而无需计算的原因，也是"每 dB/dec 斜率对应四点五度"值得背下来的原因。它同时也是三个例外为何如此重要的原因。纯滞后幅值平坦、相角为$- \omega \theta$，所以它表现为远低于斜率预测的相角，而相角缺口（以弧度计）除以频率（以 rad/s 计）**就是**滞后本身——这是控制领域最有用的现场测量之一。右半平面零点的幅值与左半平面的相同，却多出$- 2 \arctan \left( \omega / z \right)$的相角，所以它也表现为相角缺口，但这个缺口在$- 180^{\circ}$处**饱和**而非无界增长，由此把它与滞后区分开。而积分器贡献斜率却不贡献任何相角变化，所以一张在三个数量级内斜率为$- 20$ dB/dec、相角平坦于$- 90^{\circ}$的图，是纯积分器而不是一个极慢的极点。
:::

::: definition 最小相位与增益-相角积分 {#def-minphase}
当传递函数除原点处的极点外，在闭合右半平面内既无零点也无极点时，称为**最小相位**。对此类函数，记$M = \ln \left| G \left( \mathrm{j} \omega \right) \right|$，
$$
\varphi \left( \omega \right) = - \frac{2 \omega}{\pi} \int_0^{\infty} \frac{M \left( \omega^{\prime} \right) - M \left( \omega \right)}{\omega^{\prime 2} - \omega^{2}} \mathrm{d} \omega^{\prime} .
$$
两条设计推论。第一，**幅值图就是相角图**：一个固定了幅值穿越频率与斜率的设计师就固定了相角裕度，二者不可得而离其一。第二，在所有具有给定幅值的传递函数中，最小相位者的**相角滞后最小**——名字即由此而来——所以每一个非最小相位元件都损失掉任何重新设计都找不回的相角。
:::

## 穿越量

::: definition 穿越频率与各种裕度 {#def-crossover}
从回路增益的伯德图上读出：
$$
\begin{array}{ll}
\textbf{增益穿越} & \omega_{gc} : \left| L \right| = 0\ \mathrm{dB}, \quad
\textbf{相角裕度} \quad \varphi_m = 180^{\circ} + \angle L \left( \mathrm{j} \omega_{gc} \right), \\[4pt]
\textbf{相角穿越} & \omega_{pc} : \angle L = - 180^{\circ}, \quad
\textbf{增益裕度} \quad g_m = - \left. \left| L \right| \right|_{\omega_{pc}} \mathrm{dB}, \\[4pt]
\textbf{幅值裕度} & b = \min_\omega \left| 1 + L \left( \mathrm{j} \omega \right) \right| = 1 / M_s, \quad
\textbf{滞后裕度} \quad \theta_m = \varphi_m / \omega_{gc} .
\end{array}
$$
幅值裕度是在**所有**频率上从临界点$\left( - 1 , 0 \right)$到奈奎斯特曲线的最短距离；相角裕度与增益裕度各自只看一个频率，所以奈奎斯特曲线可以在两者之间贴近临界点而两个裕度看起来都很宽裕，而一个有两个穿越点的回路各有好几个这样的裕度。只要回路里含有计算机、网络或传输滞后，设计师就必须报出滞后裕度，因为它是说明软件的采样与对象的传输能否相容的那个数。
:::

::: widget plot
f: asin((1-x)/(1+x))*180/pi
x: 0.02, 1
y: 0, 90
labels: phi_max / deg
caption: 超前网络所能提供的最大相位，横轴为其极点-零点之比 alpha。曲线在 alpha 为一附近很平，这就是为什么超前网络是获取大相位提升的糟糕手段；而在 alpha 低于 0.2 时曲线只缓慢上升，此时网络在最大相位频率处的增益 1 除以根号 alpha 已超过 2.2，高频增益 1 除以 alpha 已超过 5，正在放大传感器噪声。正文设计中的 47 度对应 alpha 为 0.155。
:::

::: example 速度伺服 {#ex-servo}
画出$L = 7.8 / \left[ s \left( 0.1 s + 1 \right)\left( 0.02 s + 1 \right) \right]$的伯德图，读出四个穿越量。
::: solution
**渐近线。**积分器的$- 20$ dB/dec直线在$\omega = 1$处经过$20 \log_{10} 7.8 = 17.8$ dB。$10\ \mathrm{rad / s}$处的极点把斜率折到$- 40$，$50$处的极点再折到$- 60$。
**穿越。**积分器的$- 20$ dB/dec渐近线在$\omega = 7.8$处到达$0$ dB，恰在第一个转折之下，而那里的真实幅值已比渐近线低约$1.5\ \mathrm{dB}$；精确求解得$\omega_{gc} = 6.49\ \mathrm{rad / s}$，此处$7.8 / \left( 6.49 \times 1.193 \times 1.008 \right) = 1.00$。
**相角裕度。**
$$
\angle L = - 90^{\circ} - \arctan \left( 0.649 \right) - \arctan \left( 0.130 \right)
= - 90^{\circ} - 33.0^{\circ} - 7.4^{\circ} = - 130.4^{\circ},
\qquad \varphi_m = 49.6^{\circ} .
$$
**相角穿越。**两个滞后在$0.1 \omega \times 0.02 \omega = 1$时合计达到$- 90^{\circ}$，即$\omega_{pc} = 22.4\ \mathrm{rad / s}$，此处$\left| L \right| = 0.130$，所以$g_m = 17.7\ \mathrm{dB}$。
**幅值裕度与滞后裕度。**$M_s = 1.60$，$b = 0.63$，且
$$
\theta_m = \frac{0.866\ \mathrm{rad}}{6.49\ \mathrm{rad / s}} = 133\ \mathrm{ms} .
$$
**阻尼。**经验法则$\zeta \approx 0.01 \varphi_m$给出$0.50$与$M_p \approx 16\ \%$。精确的闭环极点为$- 4.10 \pm 7.65\ \mathrm{j}$（以及$- 51.8$），所以$\zeta = 0.47$、$\omega_n = 8.68\ \mathrm{rad / s}$，超调量$18\ \%$，$2\ \%$调节时间约为$4 / 4.10 = 0.98\ \mathrm{s}$。

**校核。**$17.7\ \mathrm{dB}$的增益裕度是$7.7$倍，而在相角裕度跌破$30^{\circ}$之前增益只能提高约$2.1$倍——增益裕度是两个约束中**更松**的那个，这在一个相角于穿越频率附近陡降的回路中是通常情形。$\checkmark$

**合理性检验。**速度常数为$K_v = 7.8\ \mathrm{s^{- 1}}$，所以$100\ \mathrm{mm / s}$的斜坡指令会以$12.8\ \mathrm{mm}$的误差跟随，而改善跟踪意味着提高增益——$133\ \mathrm{ms}$的滞后裕度只有在回路中的每一项滞后——编码器滤波器、电流环、PWM更新、扫描时间——都待在该预算之内时才付得起这笔账。转折频率为$f_c$的一阶滤波器在低频处的表现相当于$1 / \left( 2 \pi f_c \right)$的滞后：$100\ \mathrm{Hz}$的滤波器约花$1.6\ \mathrm{ms}$，可以忽略；而慢速PLC上一个$2\ \mathrm{Hz}$的软件滤波器约花$80\ \mathrm{ms}$，超过裕度的一半——这就是为什么滤波器的转折频率是一个控制决策，而不只是信号调理决策。
:::
:::

::: proof 超前网络的最大相位 {#proof-lead}
超前网络为$C = \left( 1 + \mathrm{j} \omega T \right) / \left( 1 + \mathrm{j} \omega \alpha T \right)$，其中$\alpha < 1$。其相角为
$$
\varphi = \arctan \left( \omega T \right) - \arctan \left( \omega \alpha T \right) .
$$
求导并令$\mathrm{d} \varphi / \mathrm{d} \omega = 0$，
$$
\frac{T}{1 + \omega^{2} T^{2}} = \frac{\alpha T}{1 + \omega^{2} \alpha^{2} T^{2}}
\quad\Longrightarrow\quad
\omega_{\max} = \frac{1}{T \sqrt{\alpha}} ,
$$
即两个转折频率的**几何平均**。代入并用正切差公式，
$$
\tan \varphi_{\max} = \frac{\left( 1 - \alpha \right) \omega T}{1 + \alpha \omega^{2} T^{2}}
= \frac{\left( 1 - \alpha \right) / \sqrt{\alpha}}{1 + 1}
= \frac{1 - \alpha}{2 \sqrt{\alpha}},
$$
因为$\omega T = 1 / \sqrt{\alpha}$且$\alpha \omega^{2} T^{2} = 1$。直角边为$1 - \alpha$与$2 \sqrt{\alpha}$的三角形，其斜边为$\sqrt{\left( 1 - \alpha \right)^{2} + 4 \alpha} = 1 + \alpha$，由此得到标准形式
$$
\sin \varphi_{\max} = \frac{1 - \alpha}{1 + \alpha},
\qquad
\left| C \left( \mathrm{j} \omega_{\max} \right) \right| = \frac{1}{\sqrt{\alpha}} .
$$
$\checkmark$
**一句话的交换。**超前所能买到的相位与它必须随之附加的增益被$\alpha$绑在一起：$45^{\circ}$要付出$1 / \alpha = 5.8$倍的高频增益，$60^{\circ}$要付出$13.9$倍。由于噪声随该增益增长，而穿越频率会移到对象滞后更多的更高频率处，单个超前超过大约$60^{\circ}$是绝不使用的；设计法则是取$\varphi_{\max}$等于所需提升，再加上五到十度的余量，以抵消穿越频率移动后对象多出的滞后。$\checkmark$
:::

::: example 在图上做超前设计 {#ex-lead-bode}
一个速度回路有$G = 20 / \left[ s \left( s + 1 \right) \right]$，其中$K_v = 20\ \mathrm{s^{- 1}}$的值由跟踪规格固定。相角裕度不足；用超前网络把它恢复到$55^{\circ}$。
::: solution
**未校正。**由$\omega \sqrt{1 + \omega^{2}} = 20$得$\omega_{gc} = 4.4\ \mathrm{rad / s}$，且
$$
\varphi_m = 180^{\circ} - 90^{\circ} - \arctan \left( 4.4 \right) = 12.8^{\circ},
$$
这对应阻尼比$0.11$、超调量百分之七十。
**所需提升。**$55 - 12.8 = 42^{\circ}$，加上$5^{\circ}$余量，以抵消超前造成的更高穿越频率处对象多出的滞后，所以$\varphi_{\max} = 47^{\circ}$，
$$
\alpha = \frac{1 - \sin 47^{\circ}}{1 + \sin 47^{\circ}} = \frac{0.269}{1.731} = 0.155,
\qquad
\frac{1}{\sqrt{\alpha}} = 2.54 .
$$
**把$\omega_{\max}$放在新穿越频率处。**新穿越频率是未校正幅值等于$\sqrt{\alpha} = 0.394$之处：
$$
\omega \sqrt{1 + \omega^{2}} = 20 / 0.394 = 50.8
\quad\Longrightarrow\quad
\omega_{\max} = 7.09\ \mathrm{rad / s} .
$$
**转折频率。**
$$
T = \frac{1}{\omega_{\max} \sqrt{\alpha}} = \frac{1}{7.09 \times 0.394} = 0.358\ \mathrm{s},
\qquad
\frac{1}{T} = 2.79, \quad \frac{1}{\alpha T} = 18.0 ,
$$
所以$C = \left( 1 + 0.358 s \right) / \left( 1 + 0.0556 s \right) = 6.45 \left( s + 2.79 \right) / \left( s + 18.0 \right)$，其直流增益为一。
**校核。**在$\omega = 7.09$处对象贡献$- 90^{\circ} - 82.0^{\circ}$，超前贡献$+ 68.5^{\circ} - 21.5^{\circ} = + 47.0^{\circ}$，回路增益为$0.394 \times 2.54 = 1.00$。
$$
\varphi_m = 180^{\circ} - 172.0^{\circ} + 47.0^{\circ} = 55.0^{\circ},
\qquad
\zeta \approx 0.55, \quad K_v = 20\ \mathrm{s^{- 1}} \text{不变}.
$$
**合理性检验。**穿越频率从$4.4$移到了$7.1\ \mathrm{rad / s}$，所以回路快了$60\ \%$。仿真得到的阶跃响应超调约$19\ \%$，比$\zeta \approx 0.55$的经验法则所示更大，因为超前在$2.79\ \mathrm{rad / s}$处的零点自身也带来超调。代价是噪声：超前在穿越频率处的增益为$2.54$（$8.1\ \mathrm{dB}$），到高频升至$1 / \alpha = 6.45$（$16.2\ \mathrm{dB}$），这就是到达执行器的传感器噪声增大的倍数。这也是真实驱动器常把同样的相位超前实现为对象周围的**测速（速率）反馈**的原因——它增加阻尼，而不必对带噪声的位置信号求微分。
:::
:::

## 滞后与非最小相位

::: definition 滞后与右半平面零点对图做了什么 {#def-delay-nmp}
滞后$\mathrm{e}^{- \mathrm{j} \omega \theta}$在**每个频率处幅值为一**，相角为$- \omega \theta$弧度，所以它在幅值图上不可见，表现为一个线性无界增长的相角缺口。位于$z$的右半平面零点幅值与左半平面零点相同，却贡献
$$
\Delta \varphi = - 2 \arctan \left( \omega / z \right),
$$
它在$- 180^{\circ}$处饱和。两者都是对最小相位的违背，两者都给穿越频率封顶：对滞后，上限是$\varphi_{\text{need}} / \theta$；对非最小相位零点，经验上限是
$$
\omega_{gc} \lesssim z / 3 .
$$
区分二者的诊断法是缺口的**形状**：在两个相距很远的频率上测量相角相对于斜率预测值的缺口。若频率加倍时缺口也加倍，那是滞后；其度数除以$57.3$再除以频率就是以秒计的滞后。若缺口增长不到成正比、且正朝$180^{\circ}$走去，那是非最小相位零点；其位置由缺口达到$90^{\circ}$的频率得出，该频率即$\omega = z$。
:::

::: example 滞后吞噬相位 {#ex-delay}
[[#ex-lead-bode]]的超前设计在一台驱动器上实现，其电流环、PWM更新与编码器滤波器合计贡献$100\ \mathrm{ms}$的滞后。还剩什么？
::: solution
滞后贡献
$$
\Delta \varphi = \omega_{gc} \theta = 7.09 \times 0.100 = 0.709\ \mathrm{rad} = 40.6^{\circ},
$$
剩下$\varphi_m = 55.0 - 40.6 = 14.4^{\circ}$，对应阻尼比约$0.15$、超调量接近百分之六十。
**设计师能做什么。**校正后回路的滞后裕度是$55.0^{\circ} = 0.960\ \mathrm{rad}$除以$7.09$，即$135\ \mathrm{ms}$，所以带着被塞给它的$100\ \mathrm{ms}$回路仍然稳定——但这段滞后已用掉四分之三的裕度，回路无法既保住穿越频率又保持可接受的阻尼。选项按驱动器工程师会尝试的顺序是：提高电流环带宽与PWM频率来缩短滞后，这是免费的；把编码器滤波器的转折上移，这要付出噪声；或者把穿越频率降到$3.6\ \mathrm{rad / s}$，在那里滞后只花$21^{\circ}$、超前可以重新调回$55^{\circ}$，代价是带宽减半、调节时间加倍。

**校核。**在$\omega = 3.6$处滞后花$3.6 \times 0.1 = 0.36\ \mathrm{rad} = 20.6^{\circ}$，而对象自身的滞后是$90 + 74.5 = 164.5^{\circ}$，所以超前必须供给$55 - \left( 180 - 164.5 - 20.6 \right) = 60^{\circ}$——这需要$\alpha = 0.072$与$1 / \sqrt{\alpha} = 3.73$（穿越频率处$11.4\ \mathrm{dB}$，此前为$8.1\ \mathrm{dB}$），已是单个超前网络的实际上限。$\checkmark$

**合理性检验。**看清问题大小的有用办法是乘积$\omega_{gc} \theta$，即滞后以弧度计的相位代价：$0.71\ \mathrm{rad}$已是一个正常相角裕度的大半，而一个设计时没有计入滞后的回路应把这个乘积保持在约$0.2\ \mathrm{rad}$（$11^{\circ}$）以下。在这里，这意味着在$7\ \mathrm{rad / s}$的穿越频率下总滞后应小于约$30\ \mathrm{ms}$。能绕开整个权衡的替代方案是移除滞后的**根源**：更快的编码器接口或旋转变压器-数字转换器可以取代慢速软件滤波器，而以数十千赫兹更新的电流环贡献远小于一毫秒。当滞后无法移除时——输送机、带材线、远程操作机——诚实的答案是史密斯预估器或基于模型的控制器，而不是超前网络。
:::
:::

::: example 两个系统，一张幅值图 {#ex-allpass}
比较$G_1 = \left( 1 - \mathrm{j} \omega \right) / \left( 1 + \mathrm{j} \omega \right)^{2}$与$G_2 = 1 / \left( 1 + \mathrm{j} \omega \right)$，并解释为什么只有一个能被快速闭环。
::: solution
幅值为
$$
\left| G_1 \right| = \frac{\sqrt{1 + \omega^{2}}}{1 + \omega^{2}} = \frac{1}{\sqrt{1 + \omega^{2}}} = \left| G_2 \right| ,
$$
在每个频率处都相同：同样的$- 20$ dB/dec图线，$\omega = 0$处同样的$0\ \mathrm{dB}$，$\omega = 1$处同样的$- 3\ \mathrm{dB}$。相角为
$$
\angle G_1 = - \arctan \omega - 2 \arctan \omega = - 3 \arctan \omega,
\qquad
\angle G_2 = - \arctan \omega,
$$
所以$G_1$带着三倍的滞后，而多出的$- 2 \arctan \omega$正是右半平面零点的签名。
**增益$K = 1.5$下的穿越。**两个回路都在$1.5 / \sqrt{1 + \omega^{2}} = 1$处穿越，即$\omega = 1.12$。$G_2$的$\varphi_m = 180 - 48.2 = 131.8^{\circ}$；$G_1$的$\varphi_m = 180 - 144.6 = 35.4^{\circ}$。
**一般增益$K$。**$G_2$对每个$K$都保持稳定；$G_1$在$3 \arctan \omega = 180^{\circ}$时相角达到$- 180^{\circ}$，即在$\omega = \tan 60^{\circ} = 1.73$处，此处$\left| G_1 \right| = 1 / \sqrt{4} = 0.50$，所以它在$K = 2.00$处失稳。

**合理性检验。**只看幅值图会把这两个对象判成同一台机器，而一个可以被推到任意带宽的回路与一个在增益超过二之上就振荡的回路，差别全在相角里。右半平面零点的物理起源通常是**两条符号相反、快慢不同的通路**——在升压变换器里，增大占空比先减少送往输出的电流，之后更大的电感电流才使其增加；在汽包锅炉里，多加给水先使汽泡破灭、水位下降（"缩水"），之后水位才上升；在飞机里，升降舵的尾翼力先把飞机往下压，之后抬头才使其上升。每种情形下响应起初都朝错误的方向走，而设计师的工作是接受低于零点频率三分之一的穿越频率，并停止假装另有办法。
:::
:::

::: example 在运行中的对象上测量裕度 {#ex-plant-test}
一个回路正在运行且不能停下来。用扰动试验估计它的相角裕度。
::: solution
向设定点注入一个小阶跃或一个扫频正弦，记录闭环响应。有三种读法：
**1. 闭环峰值。**回路对参考噪声的灵敏度是$\left| T \right| = \left| L / \left( 1 + L \right) \right|$。若闭环幅值在$M_r$处出现尖峰，就把回路当作二阶处理，从
$$
M_r = \frac{1}{2 \zeta \sqrt{1 - \zeta^{2}}} ,
$$
读出阻尼比，再用$\varphi_m \approx 100 \zeta$换算。峰值$M_r = 1.4$给出$\zeta = 0.39$、$\varphi_m \approx 39^{\circ}$；峰值$1.2$给出$\zeta = 0.47$、$\varphi_m \approx 47^{\circ}$。
**2. 振铃频率。**阶跃之后的衰减振荡以$\omega_d \approx \omega_{gc}$振铃，所以数一数振铃周期就得到穿越频率，而振铃的**衰减**通过阻尼比给出相角裕度：相邻两峰值之比为$r$时，$\zeta = - \ln r / \sqrt{4 \pi^{2} + \ln^{2} r}$，$\varphi_m \approx 100 \zeta$度。
**3. 开环试验。**在允许断开回路的地方断开它，注入扫频正弦并直接记录$L$——这是唯一给出真实裕度而非其闭环投影的方法。

**校核。**一个阶跃响应以$1.2\ \mathrm{s}$周期振铃、相邻峰值比为$0.4$的回路，$\ln 0.4 = - 0.916$，
$$
\zeta = \frac{0.916}{\sqrt{4 \pi^{2} + 0.916^{2}}} = \frac{0.916}{6.35} = 0.145,
\qquad \varphi_m \approx 14^{\circ} ,
$$
而周期给出$\omega_d = 2 \pi / 1.2 = 5.2\ \mathrm{rad / s}$，作为穿越频率的估计。$\checkmark$

**合理性检验。**双峰法很粗糙——它读出的是**主导**极点对的阻尼，对第二对更靠近虚轴却激励很弱的极点、以及一个增加超调却不增加振铃的非最小相位零点都是盲的。但它仍是运行中的对象上唯一可用的方法，而两个峰值之比比峰值与终值之比抗噪得多，因为噪声在一个周期之隔的比值中被平均掉了。职业做法是记录三四个周期的比值、取对数包络的斜率而不是单个比值——这与自由振动课程里用对数衰减率时是同一个技巧，理由也相同。
:::
:::

::: example 设计 {#ex-design-oven}
一个回流焊炉温区由阶跃试验辨识为$G = 0.8 \, \mathrm{e}^{- 12 s} / \left( 45 s + 1 \right)$（增益单位为每百分之一加热功率的${}^{\circ}\mathrm{C}$，时间以秒计）。规格是：设定点变化的超调不超过百分之五，扰动抑制在四分钟内恢复，并容忍输送速度变化带来的额外$20\ \mathrm{s}$传输滞后。设计控制器。
::: solution
**结构。**带滞后的一阶对象从微分作用中得益甚少——滞后已经主宰了相角——所以PI是正确的结构，积分时间取对象自身的时间常数，$T_i = 45\ \mathrm{s}$。于是控制器的零点对消对象的极点，回路增益简化为
$$
L = \frac{0.8 K_c}{45 s} \mathrm{e}^{- 12 s} .
$$
**从相位预算选穿越频率。**相角为
$$
\angle L = - \arctan \frac{1}{\omega T_i} - \arctan \left( 45 \omega \right) - 12 \omega \times 57.3^{\circ} = - 90^{\circ} - 12 \omega \times 57.3^{\circ},
$$
因为当$T_i = 45\ \mathrm{s}$时前两项之和恰为$90^{\circ}$。$70^{\circ}$的裕度给滞后留下$20^{\circ} = 0.349\ \mathrm{rad}$，所以$\omega_{gc} = 0.349 / 12 = 0.0291\ \mathrm{rad / s}$。
**由幅值得增益。**
$$
\left| L \right| = \frac{0.8 K_c}{45 \times 0.0291} = 1
\quad\Longrightarrow\quad
K_c = \frac{45 \times 0.0291}{0.8} = 1.64 .
$$
**校核。**
$$
\varphi_m = 70.0^{\circ}, \quad g_m = 13.1\ \mathrm{dB}, \quad M_s = 1.37, \quad
\theta_m = \frac{1.222}{0.0291} = 42\ \mathrm{s}, \quad
K_v = \frac{K_c K}{T_i} = 0.0291\ \mathrm{s^{- 1}} .
$$
**对照规格。**极点被对消后，设定点响应就是带滞后的积分器的响应，仿真显示完全没有超调，$2\ \%$调节时间约为$87\ \mathrm{s}$。加热器处的阶跃负载扰动约在$46\ \mathrm{s}$后达到峰值偏差，约$200\ \mathrm{s}$后回到该峰值的百分之五以内——在四分钟之内，但比设定点响应慢，因为被对消的$45\ \mathrm{s}$对象极点仍支配着负载通路。滞后裕度$\theta_m$是回路在对象自身$12\ \mathrm{s}$之外还能**额外**吸收的滞后，所以$42\ \mathrm{s}$足以覆盖要求的$20\ \mathrm{s}$。$1\ {}^{\circ}\mathrm{C} / \mathrm{min}$曲线的斜坡误差是$\left( 1 / 60 \right) / 0.0291 = 0.57\ {}^{\circ}\mathrm{C}$。

**设计点评。**整个设计就是与十二秒滞后的一场谈判，而数字说出了论据掩盖的东西。$0.0291\ \mathrm{rad / s}$的穿越频率对应$216\ \mathrm{s}$的周期，接近对象时间常数的五倍：这个回路**比它所控制的进程还慢**，只要滞后还在，再多的巧妙也改变不了这一点。如果曲线的斜坡误差$0.57\ {}^{\circ}\mathrm{C}$太大，补救之道不是加大增益——滞后裕度才是约束——而是对设定点斜坡做**前馈**，因为它在回路之外，对稳定性分毫不损，而这正是曲线控温进程的标准答案。算术没有显示的第二件事是：炉子的$K$与$\tau$随负载变化。仅增益加倍会使相角裕度降到$50^{\circ}$；仅时间常数变为三倍结果相同；两者同时发生则为$48^{\circ}$。这正是一开始按$70^{\circ}$设计的理由：宽裕的名义裕度，就是温区满载时被花掉的那部分。
:::
:::

::: history
网络的频率响应是**贝尔系统**的母语，而伯德图是这家机构的文献。**哈罗德·布莱克（Harold S. Black）**的负反馈放大器构想于1927年，1934年以*"Stabilized feedback amplifiers"*发表，它提供了这门学科存在的理由：反馈使长途电话中继放大器变得精确而线性，但回路增益过大的反馈放大器会"鸣叫"——即振荡——而当时还没有人知道判别的规则。**哈里·奈奎斯特（Harry Nyquist）**1932年的论文*"Regeneration theory"*给出了这条规则，即包围判据与以他命名的图。**亨德里克·伯德（Hendrik Bode）**1940年发表在《贝尔系统技术杂志》上的论文*"Relation between attenuation and phase in feedback amplifier design"*以工程师可以图解使用的形式给出了第二个定义中的增益-相角关系，并引入了增益裕度与相角裕度；他1945年的书*Network Analysis and Feedback Amplifier Design*把设计法则——渐近作图、斜率-相角关系、灵敏度积分——汇成手册，经典回路整形至今仍按它讲授。以灵敏度峰值$M_s$而非两个经典裕度为设计重点，则来自20世纪80年代的鲁棒控制研究，其中最著名的表述是**约翰·多伊尔（John Doyle）**与**冈特·斯坦（Gunter Stein）**1981年的论文*"Multivariable feedback design: concepts for a classical/modern synthesis"*。
:::

::: quiz
两个回路有完全相同的幅值伯德图。回路A是最小相位的，回路B含有一个纯滞后。哪个相角裕度更大？
- [x] 总是回路A，且任意频率处的缺口恰为$\omega \theta$
- [ ] 回路B，因为滞后不碰幅值
- [ ] 两者相等，因为幅值决定裕度
- [ ] 没有闭环响应就无法比较
::: solution
幅值图只对最小相位系统决定相角，而滞后是违背的最小相位典型：它在任何地方不增加幅值、在每个地方增加$- \omega \theta$的相角。因此回路A在每个穿越频率处都有更大的相角裕度，其差为$\omega_{gc} \theta$弧度——这就是为什么当一台计算机或一段传输滞后即将被插入现有回路时，应当报出的数是滞后裕度$\theta_m = \varphi_m / \omega_{gc}$。
:::
:::

## 后续内容

这里读出的穿越量，就是[[control-systems/feedback-stability]]中抽象定义的那些量；滞后裕度决定[[control-systems/digital-control]]的采样周期；而[[#ex-design-oven]]的比例-积分整定会作为[[control-systems/pid-control]]中比较的整定之一再次出现。

::: summary
- 伯德图由少数几个模板因子以分贝相加拼成；对最小相位系统，局部斜率按每 dB/dec 四点五度预测相角。
- 对最小相位系统，幅值决定相角，所以穿越频率与斜率固定了相角裕度；滞后与右半平面零点破坏这条规则，付出找不回的相角。
- 增益穿越与相角穿越定义了增益裕度与相角裕度；幅值裕度$1/M_s$度量在任意频率上与临界点的最近距离，滞后裕度$\varphi_m/\omega_{gc}$是回路还能吸收的额外滞后。
- 超前至多买到正弦值为$(1-\alpha)/(1+\alpha)$的相位，代价是该频率处$1/\sqrt{\alpha}$、高频处$1/\alpha$的增益，也就是它付出的噪声。
- 滞后在幅值图上不可见，花费$\omega \theta$的相角，直接换算成滞后裕度$\varphi_m / \omega_{gc}$——决定计算机能否闭环的那个数。
- 在运行中的对象上，相角裕度可以从阶跃后振铃的衰减读出，代价是假设振铃就是主导模态。
:::

## 习题

::: exercise 斜率 {level=1 check="-135"}
一个最小相位对象在某频率附近的宽频带内幅值斜率为每数量级$- 30\ \mathrm{dB}$。斜率关系在那里预测的相角是多少度？
::: solution
$4.5 \times \left( - 30 \right) = - 135^{\circ}$。
:::
:::

::: exercise 分贝 {level=1 check="0.5"}
回路增益$0.1$用分贝表示是$- 20\ \mathrm{dB}$。$- 6\ \mathrm{dB}$对应的幅值比是多少？（输入两位有效数字的比值。）
::: solution
$10^{- 6 / 20} = 0.501$，约二分之一。
:::
:::

::: exercise 滞后相角 {level=1 check="57.3"}
$10\ \mathrm{ms}$的滞后在$100\ \mathrm{rad / s}$处贡献多少相角滞后？（以度为单位输入。）
::: solution
$\omega \theta = 100 \times 0.01 = 1\ \mathrm{rad} = 57.3^{\circ}$。
:::
:::

::: exercise 积分器 {level=1 check="-90"}
纯积分器在任意频率处贡献什么相角？（以度为单位输入。）
::: solution
$- 90^{\circ}$，平坦。
:::
:::

::: exercise 渐近线 {level=2 check="9.28"}
草绘$200 \left( s + 2 \right) / \left[ s^{2} \left( s + 20 \right) \right]$的幅值渐近线，并求穿越频率。（以 rad/s 为单位输入精确穿越频率。）
::: solution
二重积分器$- 40$ dB/dec，$2$处的零点把它带到$- 20$，$20$处的极点再带回$- 40$。低频时$L \approx 200 \times 2 / \left( 20 s^{2} \right) = 20 / s^{2}$，在$\omega = 1$处为$20 \log_{10} 20 = 26$ dB，在$\omega = 2$处为$26 - 40 \log_{10} 2 = 14$ dB。从那里起$- 20$ dB/dec的渐近线$10 / \omega$在$\omega = 10$处到达$0$ dB，早于$20$处的极点，所以渐近穿越频率为$10\ \mathrm{rad / s}$。精确求值，$\left| L \right| = 20 \sqrt{1 + \omega^{2} / 4} / \left[ \omega^{2} \sqrt{1 + \omega^{2} / 400} \right] = 1$在$\omega = 9.28\ \mathrm{rad / s}$处成立，相角裕度为$52.9^{\circ}$。
**合理性检验。**渐近估计$10\ \mathrm{rad / s}$与精确值$9.28$相差不到$8\ \%$：$\omega = 10$处的真实幅值为$0.91$，比渐近线低$0.8\ \mathrm{dB}$，因为$20$处的极点已把它压低$1\ \mathrm{dB}$，而$2$处的零点只抬高了$0.2\ \mathrm{dB}$。在渐近答案附近求精确幅值，永远是第二步。
:::
:::

::: exercise 相角裕度 {level=2 check="28"}
对$L = 4 / \left[ s \left( s + 1 \right) \right]$，求穿越频率与相角裕度。（以度为单位输入相角裕度。）
::: solution
$\omega \sqrt{1 + \omega^{2}} = 4$给出$\omega = 1.88$；于是$\varphi_m = 180 - 90 - \arctan 1.88 = 28.0^{\circ}$。
**合理性检验。**闭环为$s^{2} + s + 4$，$\zeta = 0.25$，超调量百分之四十四，这是一个只为速度调参的回路的经典签名。速度常数为$K_v = 4$，而在不失去它的前提下改善瞬态的唯一办法是超前、速率反馈或串级电流环——三者都是在穿越频率处增加相位，而不只是削减增益。
:::
:::

::: exercise 超前 {level=2 check="13.9"}
超前网络$\left( 1 + \mathrm{j} \omega T \right) / \left( 1 + \mathrm{j} \omega \alpha T \right)$要提供$60^{\circ}$的最大相位。求$\alpha$、最大相位频率处的增益以及高频增益倍数。（输入高频增益倍数$1 / \alpha$。）
::: solution
$\sin 60^{\circ} = 0.866 = \left( 1 - \alpha \right) / \left( 1 + \alpha \right)$给出$\alpha = 0.0718$。最大相位频率处的增益为$1 / \sqrt{\alpha} = 3.73$（$11.4\ \mathrm{dB}$），高频增益为$1 / \alpha = 13.9$（$22.9\ \mathrm{dB}$）。
**合理性检验。**在噪声栖身的频率处增加二十三分贝的噪声增益，再把穿越频率推到滞后更多的更高频率，这就是$60^{\circ}$是单个超前网络的实际上限、超过它就要用两个超前级联（其实是伪装的超前-滞后）的原因。
:::
:::

::: exercise 滞后裕度 {level=2 check="0.175"}
一个回路在穿越频率$5\ \mathrm{rad / s}$处有$50^{\circ}$的相角裕度。它能吸收多少额外滞后？若滞后为一点五个采样周期，可容忍的采样周期是多少？（以秒为单位输入滞后裕度。）
::: solution
$\theta_m = \left( 50 \pi / 180 \right) / 5 = 0.175\ \mathrm{s}$。滞后为$1.5 T_s$时，得$T_s \le 0.116\ \mathrm{s}$，所以$100\ \mathrm{ms}$的采样可以——而想要五倍裕度余量的设计师需要$23\ \mathrm{ms}$。
**合理性检验。**五倍法则是工业习惯，它的存在是因为滞后从来不只是采样：抗混叠滤波器、通信协议栈、执行器自身的响应各贡献自己的一份，而一个恰好卡在算术极限上的回路，会在某次固件更新把其中一项拉长的当天失效。
:::
:::

::: exercise 推导 {level=3}
对$\alpha = 0.1$的超前网络，在两个转折频率处与几何平均处分别求相角，并确认最大相位证明所要求的对称性。
::: solution
在$\omega = 1 / T$处相角为$45^{\circ} - \arctan \alpha = 45^{\circ} - 5.7^{\circ} = 39.3^{\circ}$，在$\omega = 1 / \left( \alpha T \right)$处为$\arctan \left( 1 / \alpha \right) - 45^{\circ} = 84.3^{\circ} - 45^{\circ} = 39.3^{\circ}$——相等，正如关于几何平均的对称性所要求的，因为两个转折位于$\omega_{\max} \sqrt{\alpha}$与$\omega_{\max} / \sqrt{\alpha}$，而相角是$\ln \left( \omega / \omega_{\max} \right)$的奇函数。最大值为
$$
\arcsin \frac{1 - 0.1}{1 + 0.1} = 54.9^{\circ}
\quad \text{在} \quad
\omega = \frac{1}{T \sqrt{0.1}} = \frac{3.16}{T} .
$$
**合理性检验。**最大值比两个转折频率处的值高出十五度半，所以把零点放在穿越频率处、把极点"放在上面某处"的设计师，只能得到网络所能提供相位的三分之二——而且网络在那里的增益是$\sqrt{2} / \sqrt{1 + \alpha^{2}} = 1.41$，而不是规划穿越频率时假定的$1 / \sqrt{\alpha} = 3.16$，所以穿越频率也会落在别处。超前设计的全部就是摆放，而摆放法则只有一行：把两个转折的**几何平均**放在穿越频率处。
:::
:::

::: exercise 设计 {level=3 check="49"}
一个液位回路有$G = 2 / \left[ \left( 120 s + 1 \right)\left( 20 s + 1 \right) \right]$（单位为每单位控制器输出的液位米数），以及一个每单位控制器输出通过$0.5\ \mathrm{m^{3} / s}$的阀门。规格是相角裕度$65^{\circ}$，以及对$0.2\ \mathrm{m^{3} / s}$负载变化的稳态偏差不超过液位量程的$2\ \%$，量程跨度为$5\ \mathrm{m}$。说明在此裕度下纯比例控制无法满足偏差规格，以等于慢时间常数的$T_i$设计一个PI，并求滞后裕度。（以秒为单位输入滞后裕度。）
::: solution
**由相位预算定穿越频率。**取$T_i = 120\ \mathrm{s}$，控制器的零点对消慢滞后，于是
$$
- \arctan \frac{1}{\omega T_i} - \arctan \left( 120 \omega \right) - \arctan \left( 20 \omega \right)
$$
化简为$- 90^{\circ} - \arctan \left( 20 \omega \right) = - 115^{\circ}$，所以$\omega_{gc} = \tan 25^{\circ} / 20 = 0.0233\ \mathrm{rad / s}$；三项贡献为$- 19.7^{\circ}$、$- 70.3^{\circ}$与$- 25.0^{\circ}$。
**增益。**$\left| G \right| = 2 / \left( 2.97 \times 1.10 \right) = 0.610$，且$\left| C \right| = K_c \sqrt{1 + 0.358^{2}} = 1.062 K_c$，所以
$$
K_c = \frac{1}{0.610 \times 1.062} = 1.54 .
$$
**偏差。**负载变化相当于在对象输入端施加$0.2 / 0.5 = 0.4$个单位的控制器输出。由$K_c K = 1.54 \times 2 = 3.09$，纯比例回路会留下$0.4 \times 2 / \left( 1 + 3.09 \right) = 0.196\ \mathrm{m}$，即$5\ \mathrm{m}$跨度的$3.9\ \%$——超出$2\ \%$（$0.1\ \mathrm{m}$）的规格，而靠加大增益来补救又会耗掉相角裕度。积分作用把偏差完全消除：PI回路的仿真显示液位偏差在$81\ \mathrm{s}$后达到峰值$0.18\ \mathrm{m}$，约$160\ \mathrm{s}$后回到$0.1\ \mathrm{m}$以内。
**滞后裕度。**$\theta_m = \left( 65 \pi / 180 \right) / 0.0233 = 49\ \mathrm{s}$，且$M_s = 1.28$。

**合理性检验。**四十九秒的滞后裕度很宽裕，这正是液位回路属于较易整定之列的原因——但裕度会花在规格没有提到的东西上：长集管上的传输滞后、阀门定位器的死区时间、或数字控制器自身的扫描。一台以$2\ \mathrm{s}$扫描与$5\ \mathrm{s}$定位器闭环的液位回路用掉了不到百分之十五的预算。$0.18\ \mathrm{m}$的瞬态峰值是要回给工艺工程师的那个数：它接近稳态偏差规格所针对的$0.1\ \mathrm{m}$带宽的两倍，而决定罐子是否溢出的是峰值，而不是偏差。
:::
:::
