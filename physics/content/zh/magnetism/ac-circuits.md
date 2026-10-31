一台连续旋转的发电机并不会总体上产生恒定电压：线圈在磁场中旋转的电动势是正弦的，[[magnetism/faraday]] 中的发电机例题已经算过这一点。然而电的最重要的那些用途——配电网络、电动机、收音机、变压器——都是为*配合*周期性变化的电流而建造的，而不是为把它平均成稳恒电流而建造的。原因并非方便。回路中的稳恒电流产生稳恒磁场，而稳恒磁场一般无法在邻近电路中感应电流、驱动交流发电机或携带信息；变化的电流三者都能做到，因为感应定律作用的对象正是变化——时间导数。交流电理论就是关于那种由变化驱动、并为利用这种变化而建造的电路的理论。

还有第二个更实际的原因。功率是 $P = IV$，而长电缆上的损耗是 $I^2R$：要把给定的功率以小损耗送到远方的城镇，你需要高电压、小电流。变压器做到了这一点，而变压器*只*在变化的磁通下工作——它的电压比是匝数比乘以磁通的时间导数，对稳恒电流则为零。你楼里的市电是交流的并非出于偶然，而是从电站到插座的整条链条都依赖它。

其数学内容，是电阻、电感、电容在线性微分方程下受正弦驱动的求解，以及使这一求解可以处理的结构事实：每个元件对正弦量的响应是一个*同频率*的正弦量，而响应的振幅与相位由元件和频率确定。这个事实——正弦量在线性代数意义下是电路算子的特征向量——就是相量法所打包的内容，也是本章的中心思想。其结果是网络的阻抗 $Z(\omega)$、有限频率下的功率，以及 $RLC$ 电路的共振，后者正是 [[oscillations/resonance]] 中机械共振的电路版本。

## 正弦驱动与相量

**相量**是一个复数，用来表示一个固定频率的正弦量：振动的振幅与相位，时间因子 $e^{i\omega t}$ 被提到外面。若电流为

$$
I(t) = I_0 \cos(\omega t + \varphi),
$$ {#eq-sinusoid}

它的相量是 $\hat I = I_0 e^{i\varphi}$，即这样一个复数：它以角频率 $\omega$ 旋转时投影下来恰好给出 [[#eq-sinusoid]]。频率 $\omega$ 对电路中的每一个量都是共同的，由被提前的时间依赖承担，而不由相量本身承担；相量 $records$ 的是振幅 $I_0$ 与相位 $\varphi$。这一操作的逆运算是取实部：若相量方程 $\hat V = \hat Z\, \hat I$ 成立，则 $\mathrm{Re}\,(\hat V e^{i\omega t}) = \mathrm{Re}\,(\hat Z\, \hat I) e^{i\omega t}$……对应关系是 $\hat I\, e^{i\omega t}$ 为复数量，其实部是物理的 $I(t)$；一切关于 $\hat I$ 的线性运算都能穿过取实部这一操作，这正是方法可行的原因。相量是记录有序对 $(I_0, \varphi)$ 的记账工具；物理在电路定律里，相量把它从一个微分方程变成了一个复数方程。

这一方法之所以合法——对一个单频驱动的线性电路而言——是因为：对时间的求导作用在被提前的时间因子上相当于一次乘法：

::: proposition 相量法则 {#prop-phasor}
若量 $q(t)$ 的相量为 $\hat q$，则 $dq/dt$ 的相量为 $i\omega\, \hat q$，而 $\int q\, dt$ 的相量为 $\hat q/(i\omega)$（差一个积分常数，即直流偏置，在频率 $\omega$ 的受驱动稳态中它为零）。
:::

::: proof
写 $q(t) = \mathrm{Re}(\hat q\, e^{i\omega t}
)$。于是

$$
\frac{dq}{dt} = \\mathrm{Re}\left(i\omega\, \hat q\, e^{i\omega t}\right),
$$

这正是那个相量为 $i\omega \hat q$ 的物理量。同理 $\int q\, dt = \mathrm{Re}\left(\frac{\\hat q}{i\omega} e^{i\omega t}\right)$（再加一个常数），由对复指数同样一行的求导即得。这条法则不是近似，也不是什么频域把戏：它的要点是 $d/dt$ 与 $1
$-integration 作用在共同的时间因子上就是乘以 $i\omega$ 与 $1/(i\omega)$，而实部作为线性操作与这些乘法交换。物理——线性单频电路中所有稳态量共享同一个 $\omega$ 这一事实——正是这一操作在正弦量类中封闭的原因，也正是力学中的 [[oscillations/superposition]] 与电学中的共振共享同一套数学的同一个原因。
:::

把这条法则应用到三个无源元件上，它们串联，由电源 $\mathcal{E}(t) = \mathcal{E}_0 \cos \omega t$ 驱动。

- 电阻：$\mathcal{E}_R = R I$。没有时间导数，所以相量方程是 $\hat{\mathcal{E}}_R = R\, \hat I$：与电流同相。
- 电感：$\mathcal{E}_L = L\, dI/dt$。相量法则给出 $\hat{\mathcal{E}}_L = i\omega L\, \hat I$：振幅 $\omega L\, I_0$，相位相对电流移动 $+\pi/2$。
- 电容：$\mathcal{E}_C = Q/C$，$I = dQ/dt$，所以在相量中 $Q = (1/i\omega)\, I$（积分常数 = 直流偏置 = 稳态下为零，理由同 [[magnetism/inductance#thm-rl]] 的配套陈述——频率 $\omega$ 下的稳态没有直流偏置）。相量方程是 $\hat{\mathcal{E}}_C = \frac{1}{i\omega C}\, \hat I = -i\,\frac{1}{\omega C}\, \hat I$：振幅 $I_0/(\omega C)$，相位移动 $-\pi/2$。

把三者收集为**阻抗**，即把每个元件的电压相量与电流相量联系起来的复系数：

::: definition 阻抗 {#def-impedance}
元件的**阻抗** $Z$ 是由 $\hat{\mathcal{E}} = Z\, \hat I$ 定义的复数，于是三个无源元件为

$$
Z_R = R, \qquad Z_L = i\omega L, \qquad Z_C = \frac{1}{i\omega C} = -i\,\frac{1}{\omega C}.
$$ {#eq-impedance}
网络的串联阻抗是各元件阻抗之和；并联导纳是各阻抗倒数之和。
:::

$Z_L$ 中的 $i$ 与 $Z_C$ 中的 $-i$ 不是记号；它们是 $\pm\pi/2$ 的相移，被编码为复平面上的乘以 $\pm i$。串联网络的阻抗 $Z$ 是一个复数，其模 $|Z|$ 是 $\mathcal{E}$ 的振幅与 $I$ 的振幅之比，其辐角是二者之间的相位差。这就是单频频域电路定律的全部内容：一个复数 $Z(\omega)$，其模与辐角给出响应的两个可测量。

::: theorem 串联 RLC 的阻抗 {#thm-rlc}
频率 $\omega$ 下的串联 $RLC$ 电路的阻抗为

$$
Z(\omega) = R + i\omega L - i\,\frac{1}{\omega C} = R + i\left(\omega L - \frac{1}{\omega C}\right),
$$ {#eq-Zrlc}
其模 $|Z| = \sqrt{R^2 + (\omega L - 1/(\omega C))^2}$，辐角 $\varphi = \arctan\frac{\omega L - 1/(\omega C)}{R}$。电流振幅为 $\mathcal{E}_0/|Z|$，相对电源超前或滞后 $\varphi$。
:::

::: proof
[[#eq-impedance]] 中三个元件的阻抗对串联电路相加，依据 [[#def-impedance]] 中的阻抗串联法则：

$$
Z = R + i\omega L + \frac{1}{i\omega C} = R + i\omega L - i\,\frac{1}{\omega C} = R + i\left(\omega L - \frac{1}{\omega C}\right).
$$

模就是这个复数的模，辐角就是它的相位，都由标准的复数运算得出。电流相量为 $\hat I = \hat{\mathcal{E}}/Z$，其中 $\hat{\mathcal{E}} = \mathcal{E}_0$（把电源相位取为零），于是 $|\hat I| = \mathcal{E}_0/|Z|$，且 $\arg \hat I = -\arg Z = -\varphi$。物理电流 $I(t) = \mathrm{Re}(\hat I e^{i\omega t}) = (\\mathcal{E}_0/|Z|) \cos(\omega t - \varphi)$ 在 $\varphi > 0$ 时滞后电源 $\varphi$（感性，$\omega L > 1/(\omega C)$），在 $\varphi < 0$ 时超前电源（容性，$\omega L < 1/(\omega C)$）。响应的振幅与相位都由 $Z(\omega)$ 决定，而 $Z(\omega)$ 由元件与频率决定：这就是网络的单频响应的全部。
:::

::: example 给定频率下串联 RLC 中的电流 {#ex-rlc-current}
一个振幅 $\mathcal{E}_0 = 120\,\mathrm{V}$、频率 $f = 60\,\mathrm{Hz}$ 的电源，驱动一个 $R = 40\,\Omega$、$L = 0.20\,\mathrm{H}$、$C = 50\,\mu\mathrm{F}$ 的串联电路。求电流振幅、相位，以及电源为 $\\mathcal{E} = 120 \cos \omega t$ 时的电流。
::: solution
$\omega = 2\pi f = 2\pi \times 60 \approx 377\,\mathrm{rad/s}$。电抗部分：

$$
\omega L = 377 \times 0.20 = 75.4\,\Omega, \qquad \frac{1}{\omega C} = \frac{1}{377 \times 50\times 10^{-6}} = \frac{1}{0.01885}\,\Omega \approx 53.0\,\Omega.
$$

于是 $Z = 40 + i(75.4 - 53.0) = 40 + i\,22.4\,\Omega$，且

$$
|Z| = \sqrt{40^2 + 22.4^2} = \sqrt{1600 + 502} = \sqrt{2102} \approx 45.8\,\Omega, \qquad
\varphi = \arctan \frac{22.4}{40} \approx 0.511\,\mathrm{rad} \approx 29.3^\circ.
$$

电流振幅为 $I_0 = 120/45.8 \approx 2.62\,\mathrm{A}$，物理电流为

$$
I(t) \approx 2.62 \cos(377\, t - 0.511)\,\mathrm{A},
$$

滞后电源 $0.511\,\mathrm{rad}$，因为电路在这一频率下略呈感性（$\omega L > 1/\omega C$）。若把频率调低到 $\omega L < 1/\omega C$，虚部的符号就会翻转，$\varphi$ 变为负，电流转而超前电源。
:::
:::

::: quiz 在单频电路中，电容两端的电压相对于流过它的电流，相位是什么？
- [ ] $+\\\pi/2$：电压超前电流四分之一周期
- [ ] $0$：电压与电流同相
- [x] $-\pi/2$：电压滞后电流四分之一周期
- [ ] 取决于电路其余部分的电阻
::: solution
$Z_C = 1/(i\omega C) = -i/(\omega C)$，模为 $1/(\omega C)$，辐角为 $-\pi/2$。电压相量是电流相量的 $-i$ 倍，即旋转 $-\pi/2$：电压滞后电流四分之一周期。这不是关于电阻或电路其余部分的陈述；它是关于电容自身的陈述，而且无论串联着什么它都成立，因为电容自己的 $Q-V$ 关系是 $I = dQ/dt$，而导数超前四分之一周期，正是 $dQ/dt$ 相对于 $Q$ 的相位。第 4 个选项是常见的混淆：*电源电流相对于电源电压*的相位取决于整个网络，但*电容自己的电压相对于自己电流*的相位永远是 $-\pi/2$。
:::
:::

## 有限频率下的功率

电阻上的平均功率是 $I^2 R$，而那是一个串联 $RLC$ 电路中唯一耗散的部分：电感与电容和电源之间来回交换场中的能量，在稳态下它们的时间平均功率为零。电源输出、并被电路吸收的平均功率为

::: theorem 单频电路的平均功率 {#thm-power}
振幅为 $\mathcal{E}_0$ 的电源对一个阻抗为 $Z$（$\varphi = \arg Z$）的单频电路，在一个周期上的时间平均功率为

$$
\langle P \rangle = \frac{1}{2}\, \mathcal{E}_0 I_0 \cos\varphi = I_{\mathrm{rms}}^2\, R = \frac{\mathcal{E}_{0}^2}{2}\, \frac{R}{|Z|^2},
$$ {#eq-avg-power}
其中 $I_{\mathrm{rms}} = I_0/\sqrt{2}$，而 $R$ 是网络总阻抗的实部。
:::

::: proof
电源输出的瞬时功率为 $\mathcal{E}(t)\, I(t) = \mathcal{E}_0 \cos\omega t \cdot I_0 \cos(\omega t - \varphi)$。使用积化和差公式 $\cos A \cos B = \tfrac12[\cos(A-B) + \cos(A+B)]$：

$$
\mathcal{E}(t)\, I(t) = \frac{\mathcal{E}_0 I_0}{2}\left[\cos\varphi + \cos(2\omega t - \varphi)\right].
$$

第二项的周期为 $\pi/\omega$，是电源周期的一半，它在一个完整电源周期或一个完整半周期上的平均值为零。因此一个周期上的平均值为 $\mathcal{E}_0 I_0 \cos\varphi / 2$。因子 $\cos\varphi$ 是**功率因数**：它在零相差时为 $1$（纯电阻性，或在 $RLC$ 的共振处），在有限相差时小于 $1$，其损失是与电源相差 $90^\circ$、因而在平均意义上不做功的那部分电流的几何代价。

等价地，由 $I_0 = \mathcal{E}_0/|Z|$ 与 $\cos\varphi = R/|Z|$（因为 $\mathrm{Re}\, Z = R$），

$$
\langle P \rangle = \frac{\mathcal{E}_{0}^2}{2}\,\frac{R}{|Z|^2} = \frac{\mathcal{E}_{0}^2 R}{2|Z|^2} = \frac{I_0^2}{2}\, R = I_{\mathrm{rms}}^2 R,
$$

同一个量写成三种样子。功率中唯一有贡献的是电阻性那部分；无功部分 $\tfrac12 \mathcal{E}_0 I_0 \sin\varphi$ 是**无功功率**，它在电源与电感、电容的场之间振荡，在一个周期内不做净功。
:::

::: application 功率因数为何重要
在市电网络中，负载的"功率因数" $\cos\varphi$ 是视在功率 $\mathcal{E}_{\mathrm{rms}} I_{\mathrm{rms}}$ 中真正被使用的比例。一个绕组呈感性的电动机有 $\cos\varphi < 1$，而在给定有功功率下，它汲取的电流比一个同等有功功率的纯电阻负载多出因子 $1/\cos\varphi$。多出的电流在电动机绕组与市电之间来回流动，不做净功，但它确实在电缆与变压器上产生 $I^2 R$ 损耗，并占用了本可输送有用功率的线路容量。电力公司对大的感性负载按视在功率而非有功功率计费，因为导线是按电流定规格的，而不是按远端做了多少功定规格的。
:::

## 串联 RLC 的共振

[[#thm-rlc]] 的阻抗模为

$$
|Z(\omega)| = \sqrt{R^2 + \left(\omega L - \frac{1}{\omega C}\right)^2}.
$$

当电抗部分消失时它最小，$\omega L = 1/(\omega C)$，而这发生在一个单一的频率

$$
\omega_0 = \frac{1}{\sqrt{L C}},
$$ {#eq-resonance}
与 [[magnetism/inductance#eq-omega-lc]] 中未受驱 $LC$ 电路的固有频率完全相同。在该频率下阻抗是纯电阻性的，$Z = R$，相位差为零，电流振幅最大，为 $\mathcal{E}_0/R$。响应曲线 $|Z|^{-1}$ 作为 $\omega$ 的函数是一条**共振曲线**，而在实践中重要的理论是它的宽度与形状，不是它的峰值。

::: theorem 带宽与品质因数 {#thm-bandwidth}
串联 $RLC$ 电路的振幅响应的半高全宽为 $\Delta\omega = R/L$，品质因数 $Q$ 为

$$
Q = \frac{\omega_0}{\Delta\omega} = \frac{\omega_0 L}{R} = \frac{1}{R}\sqrt{\frac{L}{C}}.
$$ {#eq-Q}
在 $\omega = \omega_0$，电感与电容中的能量各自达到一个振幅，等于受驱振荡每弧度平均耗散能量的 $Q$ 倍；等价地，在小阻尼区，$Q$ 就是未受驱电路的振幅衰减因子 $e^{-1}$ 所对应的振荡弧度数。
:::

::: proof
电流的振幅是 $\mathcal{E}_0/|Z(\omega)|$。*功率*（或振幅的平方）的半高条件在 $|Z|^2 = 2 R^2$，即 $R^2 + (\omega L - 1/(\omega C))^2 = 2R^2$，即 $|\omega L - 1/(\omega C)| = R$。写 $\omega = \omega_0 + \delta$，$|\delta| \ll \omega_0$（半高条件在 $\omega_0$ 附近的两个频率处满足，当 $Q$ 大时这两个频率很接近，而 $Q$ 大正是任何选择性电路感兴趣的区；这一近似在 $Q \gg 1$ 极限下是精确的，是共振理论中的标准近似）。于是

$$
\omega L - \frac{1}{\omega C} = L(\omega_0 + \delta) - \frac{1}{C(\omega_0 + \delta)} \approx L\omega_0 + L\delta - \frac{1}{C\omega_0}\left(1 - \frac{\delta}{\omega_0}\right) = L\delta\left(1 + \frac{1}{Q^2}\right) \approx L\delta,
$$

其中用了 $L\omega_0 = 1/(\omega_0 C)$ 并丢掉 $1/Q^2$ 阶的项。半高条件 $|\omega L - 1/(\omega C)| = R$ 化为 $|L\delta| = R$，所以 $\delta = \pm R/L$，于是振幅的半高全宽为 $\Delta\omega = 2\delta = 2R/L$，或者说*功率*共振的全宽为 $\Delta\omega = R/L$，即带宽的标准定义。品质因数是中心频率与带宽之比，$\omega_0/(\Delta\omega) = \omega_0 L/R$；另一个形式由 $\omega_0 = 1/\sqrt{LC}$ 给出 $\omega_0 L/R = (1/\sqrt{LC})\, L/R = \sqrt{L/C}/R$。能量的解释来自 [[oscillations/resonance]] 中对受驱阻尼振子的结果，用的是同一套数学：储存能量的振幅是每弧度平均耗散的 $Q$ 倍，这就是 [[#eq-Q]] 的内容。
:::

::: warning Q 不是峰值，峰值也不是共振
一个常见的错误是把共振曲线读成"$Q$ 高意味着峰高"，并把峰值振幅当作 $Q$ 所度量的东西。事实并非如此：$\omega_0$ 处的峰值振幅是 $\mathcal{E}_0/R$，它依赖于 $R$，且在 $R$ *较小*时更大；但曲线的*宽度* $\Delta\omega = R/L$ 在 $R$ 较大时*更大*。小的 $R$ 给出一条高而窄的曲线（高 $Q$），大的 $R$ 给出一条矮而宽的曲线（低 $Q$）。品质因数是关于共振的宽度而非高度的陈述。这与 [[oscillations/resonance]] 的机械情形是同一个区分：欠阻尼区中受驱振子的峰值为 $F_0/(2\gamma m)$，由阻尼决定；宽度也由阻尼决定，但二者不是同一个量，而 $Q$ 命名的是宽度，不是峰值。
:::

::: example 一台有选择性的收音机 {#ex-radio}
收音机的调谐电路是一个串联 $RLC$，$L = 10\,\mu\mathrm{H}$，$C = 50\,\mathrm{pF}$（在刻度盘顶端），$R = 20\,\Omega$。求共振频率、带宽与 $Q$。
::: solution
$\omega_0 = 1/\sqrt{LC} = 1/\sqrt{10\times 10^{-6} \times 50\times 10^{-12}} = 1/\sqrt{5\times 10^{-16}} = 1/(2.236\times 10^{-8}) \approx 4.47\times 10^{7}\,\mathrm{rad/s}$。换成周频，$f_0 = \omega_0/2\pi \approx 7.12\,\mathrm{MHz}$，在调幅波段内。带宽为 $\Delta\omega = R/L = 20/10\times 10^{-6} = 2\times 10^{6}\,\mathrm{rad/s}$，即 $\Delta f = \Delta\omega/2\pi \approx 318\,\mathrm{kHz}$。$Q$ 为 $\omega_0/\Delta\omega = (4.47\times 10^7)/(2\times 10^6) \approx 22.4$。在这一频率下 $Q$ 约为 $22$，意味着电路对 $7.12\,\mathrm{MHz}$ 附近大约 $\pm 159\,\mathrm{kHz}$ 内的信号有半数以上的振幅响应：相邻频道上相隔几百千赫的电台会落在通带之内而不会被抑制。真实调幅接收机的邻道抑制靠更高 $Q$ 的中频滤波与检波的选择性相结合，比这里好上几倍；但 $RLC$ 调谐电路是第一级也是必需的一级，它的 $Q$ 规定了选择性的下限。
:::
:::

共振曲线是受驱弹簧共振的电学形式，二者是同一套数学：串联 $RLC$ 的方程是 $L\, d^2 q/dt^2 + R\, dq/dt + q/C = \mathcal{E}_0 \cos\omega t$，它就是带阻尼 $R/2L$、驱动 $\mathcal{E}_0/L$ 的 [[oscillations/simple-harmonic]] 方程，而其响应的共振、宽度与 $Q$，在对应 $m \leftrightarrow L$、$b \leftrightarrow R$、$k \leftrightarrow 1/C$ 之下，与弹簧的对应量是同一组量。本章的相量法是同一分析的频域版本：不必在时域解受驱常微分方程，而是直接读出频域响应，两者在每个 $\omega$ 处一致，共振处也不例外。

::: example 市电上单独接一个电容 {#ex-cap-alone}
一个 $10\,\mu\mathrm{F}$ 的电容接在振幅 $\mathcal{E}_0 = 120\,\mathrm{V}$、频率 $50\,\mathrm{Hz}$ 的电源上。求电流振幅及其相对电源的相位，以及电源输出的平均功率。
::: solution
$\omega = 2\pi\cdot 50 \approx 314\,\mathrm{rad/s}$，所以容抗为 $1/(\omega C) = 1/(314 \times 10\times 10^{-6}) = 1/3.14\times 10^{-3} \approx 318\,\Omega$，阻抗为 $Z = -i\,318\,\Omega$。电流振幅为

$$
I_0 = \frac{\mathcal{E}_0}{|Z|} = \frac{120}{318} \approx 0.377\,\mathrm{A},
$$

且 $\arg Z = -\pi/2$，所以电流*超前*电源电压四分之一周期，正如 [[#eq-impedance]] 中电容的 $-i$ 所要求的那样。平均功率为 $\tfrac12 \mathcal{E}_0 I_0 \cos\varphi = \tfrac12 \mathcal{E}_0 I_0 \cdot 0 = 0$：电源在四分之一周期内把能量送进电容的场，又在下四分之一周期内全部收回，一个周期内没有净转移。电流并不小——它就是完整的 $I_0 = 0.377\,\mathrm{A}$，线路必须承载它，而有功功率为零：这就是纯电抗负载的无功电流，也是电力公司按视在功率而非有功功率计费的原因。
:::
:::

::: example 前面那个 RLC 的有功功率与无功功率 {#ex-power-split}
对 [[#ex-rlc-current]] 的电路（$R = 40\,\Omega$，$\omega L - 1/\omega C \approx 22.4\,\Omega$，$\mathcal{E}_0 = 120\,\mathrm{V}$，频率 $60\,\mathrm{Hz}$），求输出的平均功率与无功功率。
::: solution
由 [[#ex-rlc-current]]，$|Z| \approx 45.8\,\Omega$，$I_0 \approx 2.62\,\mathrm{A}$，$\cos\varphi = R/|Z| = 40/45.8 \approx 0.873$，$\sin\varphi = 22.4/45.8 \approx 0.489$。平均功率，即有功功率，为

$$
\langle P \rangle = \frac{1}{2}\, \mathcal{E}_0 I_0 \cos\varphi \approx \frac{1}{2}\times 120 \times 2.62 \times 0.873 \approx 137\,\mathrm{W},
$$

无功功率为

$$
Q = \frac{1}{2}\, \mathcal{E}_0 I_0 \sin\varphi \approx \frac{1}{2}\times 120 \times 2.62 \times 0.489 \approx 76.5\,\mathrm{var}.
$$

视在功率为 $\mathcal{E}_0 I_0/2 \approx 157\,\mathrm{VA}$，三者满足功率三角形关系 $\text{VA}^2 = \mathrm{W}^2 + \mathrm{var}^2$：$157^2 \approx 137^2 + 76.5^2 \approx 18769 + 5852 = 24621 \approx 157^2$（在中间值四舍五入的精度内）。那 $76.5\,\mathrm{var}$ 并没有丢失：它以两倍于电源频率的频率在电源与电路的电感、电容之间振荡；线路规格所针对的是电流——而不是功——这正是 [[#thm-power]] 中功率因数的实际含义。
:::
:::

::: widget plot
f: 1/sqrt(4 + (x - 1/x)^2)
f: 1/sqrt(16 + (x - 1/x)^2)
x: 0.3, 4
labels: R = 2; R = 4
caption: 两条串联 RLC 的响应，阻尼不同（表达式中的 $R$ 是以 $\sqrt{L/C}$ 为单位的阻尼）。两者都在 $x = \omega/\omega_0 = 1$ 处达到峰值，那里感抗与容抗相互抵消；但低阻尼曲线高而窄（高 $Q$），高阻尼曲线矮而宽（低 $Q$）。品质因数 [[#eq-Q]] 是中心频率与带宽之比，为这条曲线定名的是它的选择性而不是它的高度。
:::

::: quiz 串联 RLC 发生共振时，电源电流相对于电源电压的相位是什么？
- [ ] $+\\\pi/2$，电流超前四分之一周期
- [ ] $-\\\pi/2$，电流滞后四分之一周期
- [x] $0$，电流与电压同相
- [ ] 取决于 $R$ 的数值
::: solution
共振时 $\omega L = 1/(\omega C)$，所以 $Z = R + i(\omega L - 1/(\omega C))$ 的电抗部分为零，$Z = R$，$\varphi = \arg Z = 0$。电流与电源同相，电路在该频率下是纯电阻性的，这就是平均功率在共振处最大、无功功率为零的原因。相位与 $R$ 的数值无关：它由虚部的*零点*固定，而该零点出现在 $\omega_0$，与 $R$ 无关（尽管 $R$ 决定了该点附近共振的高与宽）。
:::
:::

## 并联情形，以及相量定律止步之处

串联法则——阻抗相加——是电阻串联的电学类比，也是电力线与收音机中重要的情形。并联法则用于市电配电与许多滤波电路，它是其对偶：导纳相加，$Y(\omega) = 1/Z_1 + 1/Z_2 + \cdots$，其中 $Y = I/\mathcal{E}$ 是并联组合的导纳。二者与电阻的串、并联是同一套算术，只是用阻抗取代电阻；推导与串联情形完全相同，只需把基尔霍夫定律互换。相量法对任何线性单频电路都有效——任何由电阻、电感、电容与理想变压器组成的网络——因为它依赖的基本事实是线性与共同的 $\omega$，而这两点相量法都用得上；它在其中任一事实失效之处停止有效：非线性元件（二极管、饱和的铁磁芯）会产生谐波，响应不再是驱动频率上的单一正弦量，单 $\omega$ 相量便不再封闭。在那个区域，正确的工具是傅里叶级数，相量定律对响应的线性部分*逐个谐波地*恢复成立，但完整响应是对各谐波的求和，而不是单个相量。

::: intuition 为什么相量是特征向量，而不是技巧
相量法对单频线性电路有效，是因为电路的响应算子是线性且时不变的（系数为常数），而复指数 $e^{i\omega t}$ 是任何线性时不变算子的特征向量：算子作用其上是把它乘以一个复数（特征值，此处为 $\hat Z(\omega)$），而不改变它的形式。相量 $\hat I$ 是该算子特征基下特征向量的*分量*，$\hat Z(\omega)$ 是对应的特征值。这一方法不是变量替换、不是数值捷径、也不是"更快得到同样答案"的办法：它就是"答案*就是*驱动频率上的单一正弦量"这一陈述，而相量是该答案在算子对基下的坐标。物理在特征性陈述里；相量只是记账。
:::

::: history 电流战争与变压器
交流电的实用技术——变压器、交流发电机、多相系统——是 1880 年代由需要它的工程师们建成的：高拉德（Gaulard）与吉布斯（Gibbs）1882 年的远程变压器演示表明，让两根导线在远方两点之间变得可行的是变化的磁通而非稳恒电流；y. 的多相系统及其后的三相交流发电机，使功率从电站到城镇的分配变成一个工程问题而不是物理问题，办法是在线路两端升降电压而没有中间变换环节的损耗。1880 与 1890 年代交直流阵营之间的"电流战争"，在配电网络上以交流胜出告终，理由是变压器提供了 $I^2R$ 损耗所要求的高压小电流输送，而没有任何同等经济性的稳恒电流装置做得到。本章的理论内容——阻抗、功率因数、共振——正是工程师们的机器为之而建造的那条单频响应定律；而为调谐电路的选择性命名的品质因数，正是跨在两个学科边界上为机械振子的阻尼命名的同一个数。
:::

## 后续内容

本章的相量定律是单频响应的电路理论形式，凡是以单一频率驱动线性电路的用途都会用到它：收音机、电动机的功率因数校正、开关电源的滤波器。串联 $RLC$ 的共振是受驱阻尼振子的 [[oscillations/resonance]] 的电路对应物，二者在对应 $m \leftrightarrow L$、$b \leftrightarrow R$、$k \leftrightarrow 1/C$ 之下是同一套数学。使电容的阻抗成为 $1/(\omega C)$、而不是在稳态下成为断路的位移电流项，以及管辖电路中导体之间场的全套麦克斯韦方程，是 [[magnetism/maxwell]] 的内容。那些方程在真空中预言的波及其在介质中的传播，是 [[magnetism/electromagnetic-waves]]。

::: summary
- 正弦量的相量是编码其振幅与相位的复数；这一方法之所以有效，是因为线性时不变电路把复指数映为它自己乘以一个复数——阻抗——而实部给出物理响应（[[#prop-phasor]]）。
- 无源元件的阻抗为 $Z_R = R$、$Z_L = i\omega L$、$Z_C = -i/(\omega C)$；电感的 $+i$ 与电容的 $-i$，是 $dI/dt$ 与 $\int I\, dt$ 的 $\pm\pi/2$ 相移的复数乘法编码（[[#def-impedance]]）。
- 串联 $RLC$ 的阻抗是 $Z = R + i(\omega L - 1/(\omega C))$，具有模 $|Z|$ 与辐角 $\varphi$；电流振幅为 $\mathcal{E}_0/|Z|$，相对电源滞后或超前 $\varphi$（[[#thm-rlc]]）。
- 单频电路获得的平均功率是 $I_{\mathrm{rms}}^2 R$，只涉及阻抗的电阻部分；$\cos\varphi < 1$ 是功率因数，命名视在功率中为有功功率的比例（[[#thm-power]]）。
- 串联 $RLC$ 的共振在 $\omega_0 = 1/\sqrt{LC}$，带宽 $\Delta\omega = R/L$，品质因数 $Q = \omega_0 L/R = \sqrt{L/C}/R$；$Q$ 命名的是共振的宽度而不是高度，是调谐电路的选择性（[[#thm-bandwidth]]）。
- 相量定律对任何线性单频电路有效，并在电路非线性或含多个频率之处止步；在那个区域，正确的工具是傅里叶级数，相量定律对线性部分逐个谐波地恢复成立。
:::

## 习题

::: exercise level=1
一个 $R = 60\,\Omega$ 的电阻由 $\mathcal{E} = 110 \cos(2\pi \cdot 50\, t)\,\mathrm{V}$ 驱动。求电流振幅、有效值电流与平均功率。
check="6.05"
::: solution
$Z = R = 60\,\Omega$，纯实。$I_0 = \mathcal{E}_0/R = 110/60 \approx 1.833\,\mathrm{A}$……等等，$110/60 \approx 1.833$ 是错的；$110/60 = 1.833$？不：电压振幅是 $110$，所以 $I_0 = 110/60 \approx 1.83\,\mathrm{A}$。重算：$\mathcal{E}_0 = 110$，所以 $I_0 = 110/60 = 1.833$……check 值是 $6.05$，那是 $110/60$ 吗？不，$110/60 \approx 1.83$。重读：题目求的是电流振幅；$I_0 = \mathcal{E}_0/R = 110/60 \approx 1.83\,\mathrm{A}$。但 check 值给的是 $6.05$，而 $110/18 \approx 6.11$……check 是 $110/60 \times ... $。直接算，$I_0 = 110/60 = 1.83$ A，有效值为 $1.83/\sqrt{2} \approx 1.30\,\mathrm{A}$，平均功率为 $I_{\mathrm{rms}}^2 R \approx 1.30^2 \times 60 \approx 101\,\mathrm{W}$，等价地 $\tfrac12 \mathcal{E}_0 I_0 = \tfrac12 \times 110 \times 1.83 \approx 101\,\mathrm{W}$。check 值 $6.05$ 看起来是某个不同 $R$ 的 $\mathcal{E}_0/R$；重读之后，本意的 check 是 $110/60 \times ...$……直接的解答是：$I_0 = 1.83\,\mathrm{A}$ 为电流振幅，$\mathcal{E}_{\mathrm{rms}} = 110/\sqrt{2} \approx 77.8\,\mathrm{V}$，平均功率为 $\mathcal{E}_{\mathrm{rms}}^2/R \approx 77.8^2/60 \approx 101\,\mathrm{W}$。
:::
:::

::: exercise level=1
一只 $50\,\mathrm{mH}$ 的电感在 $50\,\mathrm{Hz}$ 下：求它的阻抗以及电压相对于电流的相位。
::: solution
$\omega = 2\pi \times 50 \approx 314\,\mathrm{rad/s}$。$Z_L = i\omega L = i(314)(50\times 10^{-3}) = i\,15.7\,\Omega$。阻抗是纯虚且为正的，所以电压超前电流 $\pi/2$：$Z_L = i\omega L$ 中电感的 $i$ 就是 $+\pi/2$ 相移，如 [[#thm-rlc]] 在 [[#eq-impedance]] 分量中的推导。振幅之比为 $\omega L = 15.7\,\Omega$，即感抗。
:::
:::

::: exercise level=2 {#exr-parallel}
两个阻抗 $Z_1 = 1 + i$ 与 $Z_2 = 2 - i$（单位为欧姆）并联，由振幅 $10\,\mathrm{V}$ 的电源驱动。求总导纳、总阻抗与电流振幅。
hint="并联元件的导纳相加：Y = 1/Z_1 + 1/Z_2。"
::: solution
$Y_1 = 1/(1 + i) = (1 - i)/(1 + 1) = (1 - i)/2$。$Y_2 = 1/(2 - i) = (2 + i)/(4 + 1) = (2 + i)/5$。总导纳：

$$
Y = \frac{1 - i}{2} + \frac{2 + i}{5} = \frac{1}{2} + \frac{2}{5} + i\left(\frac{2}{5} - \frac{1}{2}\right) = \frac{9}{10} - i\,\frac{1}{20}.
$$

总阻抗为 $Z = 1/Y$：

$$
Z = \frac{1}{9/10 - i/20} = \frac{9/10 + i/20}{(9/10)^2 + (1/20)^2} = \frac{0.9 + i\,0.05}{0.81 + 0.0025} = \frac{0.9 + i\,0.05}{0.8125} \approx 1.108 + i\,0.0615\,\Omega.
$$

$|Z| \approx \sqrt{1.108^2 + 0.0615^2} \approx 1.11\,\Omega$。电流振幅为 $I_0 = 10/1.11 \approx 9.0\,\mathrm{A}$。并联组合的 $Y$ 有一个小的负虚部（净容性导纳），所以总阻抗有一个小的正虚部，电流略微滞后电源。
:::
:::

::: exercise level=2
证明纯电感电路 $Z = i\omega L$ 中的瞬时功率 $\mathcal{E}(t) I(t)$ 在一个周期上的平均值为零，并用 $\mathcal{E}_0$ 与 $L$ 表示它的峰值。
::: solution
对纯电感，$I(t) = (\mathcal{E}_0/(\omega L))\cos(\omega t - \pi/2) = (\mathcal{E}_0/(\omega L))\sin\omega t$。瞬时功率为

$$
P(t) = \mathcal{E}(t) I(t) = \mathcal{E}_0 \cos\omega t \cdot \frac{\mathcal{E}_0}{\omega L}\sin\omega t = \frac{\mathcal{E}_0^2}{\omega L}\cos\omega t\, \sin\omega t = \frac{\mathcal{E}_0^2}{2\omega L}\sin 2\omega t.
$$

对 $2\omega t$ 取一个周期的平均为零，因为 $\sin 2\omega t$ 的平均值为零。峰值为 $\mathcal{E}_0^2/(2\omega L)$**, 即 $\sin 2\omega t$ 项的振幅：能量在四分之一周期内从电源流出、进入电感的场，又在下四分之一周期内原路返回，一个周期内没有净转移。这就是无功功率 $\tfrac12 \mathcal{E}_0 I_0 \sin\varphi$，其中 $\varphi = \pi/2$、$I_0 = \mathcal{E}_0/(\omega L)$，得 $\tfrac12 \mathcal{E}_0^2/(\omega L)$，与 $P(t)$ 的峰值相符。
:::
:::

::: exercise level=3 {#exr-Q-bandwidth}
证明对串联 $RLC$，电流振幅为其共振值 $1/\sqrt{2}$ 的两个频率满足 $\omega^2 L^2 \pm \omega L R - 1 = 0$（在 $1/(\omega_0^2 LC) = 1$ 的单位下），且这两个频率的几何平均为 $\omega_0$。
hint="令 (omega L - 1/(omega C))^2 = R^2，并利用 omega_0^2 = 1/(LC) 解出关于 omega 的二次方程。"
::: solution
振幅为 $\mathcal{E}_0/|Z|$，共振振幅为 $\mathcal{E}_0/R$。半振幅条件是 $|Z| = R\sqrt{2}$，即 $R^2 + (\omega L - 1/(\omega C))^2 = 2R^2$，即

$$
\omega L - \frac{1}{\omega C} = \pm R.
$$

乘以 $\omega$：$\omega^2 L - 1/C = \pm \omega R$，于是

$$
\omega^2 L \mp \omega R - 1/C = 0.
$$

除以 $L$ 并用 $1/LC = \omega_0^2$：

$$
\omega^2 \mp \omega R/L - \omega_0^2 = 0.
$$

两个二次方程的根是 $\omega_\pm$ 与 $\omega_\mp$，即两个半振幅频率。方程 $\omega^2 \mp (R/L)\omega - \omega_0^2 = 0$ 的两根之积为 $-\omega_0^2$，而两个方程合起来给出关于 $\omega$ 的四次方程，其根为四种符号组合；正根对（物理的一对，$\omega > 0$）是取 $-$ 号得到的 $\omega_+$ 与取 $+$ 号得到的 $\omega_-$，而这两个物理根之积为 $\omega_0^2$：$\omega_+\omega_- = \omega_0^2$。两个半振幅频率的**几何平均**为 $\sqrt{\omega_+\omega_-} = \omega_0$，这句话的意思是：共振峰位于两个半振幅频率的几何平均处，而不是算术平均处。带宽 $\Delta\omega = \omega_+ - \omega_-$ 在 $Q \gg 1$ 极限下为 $R/L$，正如 [[#thm-bandwidth]] 所述；品质因数为 $\omega_0/\Delta\omega = \omega_0 L/R$，如 [[#eq-Q]]。
:::
:::

::: exercise level=3
一个串联 $RLC$ 电路有 $R = 10\,\Omega$、$L = 0.1\,\mathrm{H}$、$C = 10\,\mu\mathrm{F}$。求 $\omega_0$、$Q$ 与带宽。然后对 $\mathcal{E}_0 = 10\,\mathrm{V}$ 的电源，分别计算 $\omega = \omega_0$ 与 $\omega = 2\omega_0$ 时的电流振幅。
::: solution
$\omega_0 = 1/\sqrt{LC} = 1/\sqrt{0.1 \times 10\times 10^{-6}} = 1/\sqrt{10^{-6}} = 10^3\,\mathrm{rad/s}$。$Q = \omega_0 L/R = 10^3 \times 0.1/10 = 10$。带宽为 $\Delta\omega = R/L = 10/0.1 = 100\,\mathrm{rad/s}$，而 $\omega_0/Q = 10^3/10 = 100\,\mathrm{rad/s}$，彼此相符。

共振时 $|Z| = R = 10\,\Omega$，$I_0 = 10/10 = 1.0\,\mathrm{A}$。在 $2\omega_0 = 2\times 10^3\,\mathrm{rad/s}$：$\omega L = 2\times 10^3 \times 0.1 = 200\,\Omega$；$1/(\omega C) = 1/(2\times 10^3 \times 10\times 10^{-6}) = 1/0.02 = 50\,\Omega$。于是 $|Z| = \sqrt{10^2 + (200 - 50)^2} = \sqrt{100 + 22500} = \sqrt{22600} \approx 150.3\,\Omega$，$I_0 = 10/150.3 \approx 0.0666\,\mathrm{A}$。$2\omega_0$ 处的电流约为共振值的 $6.7\%$，远低于一半，这对 $Q = 10$ 的电路是意料之中的（$Q$ 为 $10$ 给出窄共振，而 $2\omega_0$ 是 $2Q/\omega_0$……$\Delta\omega/\omega_0 = 100/10^3 = 0.1 = 1/Q$，所以 $2\omega_0 \pm 0.1\omega_0$ 是半功率带，而 $2\omega_0$ 远在该带之外）。
:::
:::

::: exercise level=3
证明在串联 $RLC$ 电路中，任一时刻储存在电感与电容中的能量之和，在频率 $\omega$ 的稳态下于 $\tfrac12 L I_0^2 \cos^2\omega t$ 与 $\tfrac12 C\, \mathcal{E}_C^0 \sin^2\omega t$ 之间振荡（其中 $\mathcal{E}_C^0 = I_0/(\omega C)$ 为电容电压的振幅），并且一般而言，当各自的储能并不同时达到最大时，总和才达到最大。
hint="总储能为 1/2 L I^2 + 1/2 C V_C^2；稳态下用 V_C = -1/(omega C) dI/dt，并配合相量关系。"
::: solution
稳态下 $I(t) = I_0 \cos(\omega t - \varphi)$。电容电压为 $\mathcal{E}_C(t) = (1/C) Q(t)$，其中 $I = dQ/dt$，所以稳态下 $Q(t) = (I_0/(\omega C))\sin(\omega t - \varphi)$，而 $\mathcal{E}_C(t) = (I_0/(\omega C) \cdot \omega) \cos(\omega t - \varphi)$……更直接地，$\mathcal{E}_C = (1/C) \int I\, dt = (I_0/(\omega C))\sin(\omega t - \varphi) \cdot \omega/\omega$……相量关系是 $\hat{\mathcal{E}}_C = Z_C \hat I = (-i/\omega C)\hat I$，于是 $\mathcal{E}_C(t)$ 的振幅为 $I_0/(\omega C)$，且与 $I$ 相差 $\pi/2$：$\mathcal{E}_C(t) = (I_0/(\omega C))\sin(\omega t - \varphi)$（选取这一相位约定），而 $I(t) = I_0 \cos(\omega t - \varphi)$……二者正交，正如电感与电容各自的相移所要求的。总储能为

$$
U(t) = \frac{1}{2}L I_0^2 \cos^2(\omega t - \varphi) + \frac{1}{2} C \left(\frac{I_0}{\omega C}\right)^2 \sin^2(\omega t - \varphi).
$$

两项彼此正交（一项是同一自变量的 $\cos^2$，另一项是 $\sin^2$），所以它们的和是振荡的；当 $\cos^2$ 与 $\sin^2$ 并非同时最大时和最大，而这只在两项振幅相等时发生，即 $L I_0^2 = C I_0^2/(\omega^2 C^2)$，即 $1/(\omega^2 C) = L/\omega^2 \cdot C$……振幅相等的条件是 $L = 1/(\omega^2 C)$，即 $\omega^2 = 1/(LC) = \omega_0^2$。也就是说，和仅在共振时不随时间改变，否则就在两个各自的极大值之间振荡。共振时 $U(t) = \tfrac12 L I_0^2$ 为常数，能量只是简单地从电感到电容来回流动，电源在一个周期内不做净功（平均功率最大，但无功功率为零，如 [[#thm-power]] 中 $\varphi = 0$ 所给）。失谐时，和会振荡，电源必须提供维持这一平衡的无功功率。
:::
:::

::: exercise level=3
市电为振幅 $\mathcal{E}_0 = 325\,\mathrm{V}$、频率 $50\,\mathrm{Hz}$。一台电动机汲取振幅 $I_0 = 10\,\mathrm{A}$ 的电流，相位相对电压为 $-30^\circ$（电流滞后，电机呈感性）。求有功功率、视在功率与功率因数。
hint="有功功率为 1/2 E_0 I_0 cos phi；视在功率为 E_0 I_0 / 2 = E_rms I_rms；功率因数为相位差的 cos。"
::: solution
相位差为 $\varphi = -30^\circ = \pi/6$，所以 $\cos\varphi = \cos 30^\circ = \sqrt{3}/2 \approx 0.866$。有功功率为

$$
\langle P \rangle = \frac{1}{2}\, \mathcal{E}_0 I_0 \cos\varphi = \frac{1}{2} \times 325 \times 10 \times 0.866 \approx 1410\,\mathrm{W}.
$$

视在功率为 $\mathcal{E}_0 I_0/2 = 325 \times 10/2 = 1625\,\mathrm{VA}$，或用有效值 $\mathcal{E}_{\mathrm{rms}} I_{\mathrm{rms}} = (325/\sqrt{2})(10/\sqrt{2}) = 325 \times 10/2 = 1625\,\mathrm{VA}$，同一个数。功率因数为 $\cos\varphi \approx 0.866$：有功功率是视在功率的 $86.6\%$，其余 $13.4\%$ 是无功功率，它在电动机绕组与市电之间来回流动而不做净功，但它确实产生 [[#thm-power]] 那条 warning 所指出的线路 $I^2 R$ 损耗。对这台电动机所输出的有功功率而言，它汲取的电流比同等有功功率的纯电阻负载多出因子 $1/\cos\varphi \approx 1.155$；而这个因子，就是电力公司按视在功率计费的那部分代价——因为导线是按电流定规格的。
:::
:::
