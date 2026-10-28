一个白圆盘和一个白球投出同一个圆。让球看起来圆的是**着色**：迎光的一面亮，转过光去的一面暗，磨光的球上还有一小块锐利的高光，头一动它就跟着动。渲染器必须对每个可见点算出有多少光从该点传向眼睛——为此它需要一个模型：光如何到达表面、表面如何散射它、散射出的光如何依赖于观察方向。

本章从物理出发建立这个模型。我们定义把"多少光"讲精确的辐射度学量——辐照度与辐射亮度——以及描述材质的 **BRDF**。我们推导朗伯（哑光）模型，研究经验性的 Phong 与 Blinn-Phong 模型以及如何使它们守恒能量，然后发展支撑当今影视与游戏所用基于物理着色的库克（Cook）-托兰斯（Torrance）**微表面**模型，并用数值检验它的能量平衡。最后我们看着色*在哪里*求值——逐三角形、逐顶点还是逐像素——以及光源的种类。这里算出的颜色值是线性的（[[graphics/images-colour]]）；它们只在最后一步才为显示编码。

## 度量光

光的能量离开光源、从各个方向到达表面，所以我们需要"有多少个方向"的度量。单位球上一块区域所张的**立体角**就是它的面积；整个球的立体角是 $4\pi$ 球面度（sr），半球是 $2\pi$。在绕表面法向的球坐标里——极角 $\theta$ 自法向量起，方位角 $\phi$——一小块方向集的立体角为

$$
d\omega = \sin\theta\,d\theta\,d\phi .
$$ {#eq-domega}

::: definition 辐射通量、辐照度与辐射亮度 {#def-radiometry}
- **辐射通量** $\Phi$ 是功率，单位瓦特（W）。
- 表面一点处的**辐照度** $E$ 是单位面积上到达的通量，$E = d\Phi/dA$，单位 W/m²。
- **辐射亮度** $L(x, \omega)$ 是单位面积上*垂直于方向* $\omega$、且单位立体角上的通量：
$$
L(x, \omega) = \frac{d^2\Phi}{dA\,\cos\theta\,d\omega},
$$
单位 W/(m²·sr)，其中 $\theta$ 是 $\omega$ 与表面法向的夹角。
:::

辐射亮度是相机像素或眼睛测量的量：一个感光元件透过镜头看到一个小方向锥，并对其上到达的辐射亮度作出应答。它的两条性质使它成为渲染的天然通货。第一，**辐射亮度沿射线保持不变**（在真空中）：从表面一点射向眼睛的辐射亮度，等于从该点到达眼睛的辐射亮度，距离无论多少（通量的平方反比衰减恰好被每立体角所见面积的增长抵消）。这就是白墙走远了并不显得更暗的原因。第二，辐照度由入射辐射亮度 $L_i$ 在表面之上半球 $\Omega$ 上积分得到：

$$
E = \int_\Omega L_i(\omega)\cos\theta\,d\omega .
$$ {#eq-irradiance}

因子 $\cos\theta$ 是**朗伯余弦定律**：横截面为 $A$ 的一束光以与法线成 $\theta$ 角入射时，摊在表面上 $A/\cos\theta$ 的面积里，所以单位面积的能量少了 $\cos\theta$。这就是冬天太阳晒不热地面、亮球的明暗交界线渐渐过渡的原因。

::: example 阴天下的辐照度 {#ex-sky}
阴天的一级近似是：地平线以上每个方向的辐射亮度都是同一个 $L_{\text{sky}}$。求水平屋顶上的辐照度，以及朝外、下临全黑地面的竖直墙上的辐照度。
::: solution
屋顶的半球每个方向都见到天空，[[#eq-irradiance]] 给出 $E = L_{\text{sky}}\int_\Omega\cos\theta\,d\omega = \pi L_{\text{sky}}$（该积分在 [[#thm-lambert]] 中算出）。对墙面，绕其水平法向的半球被地平线分成上半（天空）与下半（黑地）。两半关于水平面的反射互为镜像，而该反射保持 $\cos\theta$，所以各贡献 $\pi$ 的一半：$E = \frac{\pi}{2}L_{\text{sky}}$。墙收到的光只有屋顶的一半——天窗让屋子亮堂的程度远超同尺寸侧窗的一个原因。
:::
:::

对强度为 $I$（W/sr）的**点光源**，在距离 $r$、以角度 $\theta$ 入射之处，辐照度为 $E = I\cos\theta/r^2$；对**方向光**（太阳这样极远的光源），$E = E_\perp\cos\theta$，其中常量 $E_\perp$ 是正对光源的表面上的辐照度。

## BRDF

::: definition 双向反射分布函数 {#def-brdf}
表面一点处的 **BRDF** 是函数
$$
f_r(\omega_i, \omega_o) = \frac{dL_o(\omega_o)}{dE(\omega_i)} = \frac{dL_o(\omega_o)}{L_i(\omega_i)\cos\theta_i\,d\omega_i},
$$
即朝 $\omega_o$ 反射的辐射亮度与从 $\omega_i$ 附近小锥入射的辐照度之比；其单位是 sr$^{-1}$。两个方向都*背离*表面。物理上合理的 BRDF 非负，满足**亥姆霍兹（Helmholtz）互易性** $f_r(\omega_i, \omega_o) = f_r(\omega_o, \omega_i)$，并且**守恒能量**：对每个 $\omega_o$，**方向反照率**
$$
\rho(\omega_o) = \int_\Omega f_r(\omega_i, \omega_o)\cos\theta_i\,d\omega_i \le 1 .
$$ {#eq-albedo}
:::

反照率是表面被各方向均匀照明时反射的光的比例（由互易性，等价于从 $\omega_o$ 方向来的光到底反射了多少的比例）。把所有入射方向的贡献加起来，就得到**反射方程**：

$$
L_o(\omega_o) = \int_\Omega f_r(\omega_i, \omega_o)\,L_i(\omega_i)\cos\theta_i\,d\omega_i .
$$ {#eq-reflection}

对有限个点光源或方向光，积分化为和 $L_o = \sum_k f_r(\omega_k, \omega_o)\,E_k$，其中 $E_k$ 是光源 $k$ 的辐照度（余弦因子已含）。实时渲染器求值的正是这个和，再加上对所有其他东西间接传来的光的近似。当入射光本身包含被其他表面反射的光时，[[#eq-reflection]] 就成了 [[graphics/ray-tracing]] 的渲染方程。

### 朗伯反射

理想漫反射表面——白垩、无釉陶土，大致还有新雪——向各方向均匀地散射光：它的 BRDF 是常数。

::: theorem 朗伯 BRDF {#thm-lambert}
常数 BRDF $f_r = c$ 对每个 $\omega_o$ 的方向反照率为 $\rho = \pi c$。因此反照率 $\rho \in [0, 1]$ 的朗伯面有 BRDF $f_r = \rho/\pi$；被辐照度为 $E$（已含余弦）的单个光源照明时，它反射的辐射亮度为 $L_o = \frac{\rho}{\pi}E$，各方向相同。
:::

::: proof
用 [[#eq-domega]]，
$$
\int_\Omega \cos\theta\,d\omega = \int_0^{2\pi}\!\!\int_0^{\pi/2}\cos\theta\sin\theta\,d\theta\,d\phi = 2\pi\left[\tfrac12\sin^2\theta\right]_0^{\pi/2} = \pi .
$$
所以 $\rho = \int c\cos\theta\,d\omega = \pi c$，当 $c = \rho/\pi$ 时反照率恰为 $\rho$。单个光源的反射辐射亮度是 $f_rE = \rho E/\pi$，不依赖 $\omega_o$。
:::

因子 $1/\pi$ 总会让每个人吃一次惊。它不是随手凑出来的：被辐照度 $E$ 照明、反射*全部*光（$\rho = 1$）的表面把功率摊在半球上，而余弦加权的半球"大小"是 $\pi$，不是 $2\pi$。当年省掉它的渲染器只是把灯光调亮了 $\pi$ 倍。由于单位法向 $n$、单位光源方向 $l$ 时 $E = E_\perp \cos\theta_i = E_\perp(n\cdot l)$，朗伯着色正是大家眼熟的 $L_o = \frac{\rho}{\pi}E_\perp\max(n\cdot l, 0)$。

## 光泽反射：Phong 与 Blinn-Phong

磨光的表面在**镜射方向** $r = 2(n\cdot l)n - l$（$l$ 关于 $n$ 的反射）附近反射更多光，形成高光。Bui Tuong Phong 1975 年的模型在 $r$ 周围加一个瓣，其宽度由指数 $s$ 控制：

$$
L_o = \Bigl(k_d\,(n\cdot l) + k_s\,\max(r\cdot v, 0)^s\Bigr)E_\perp ,
$$

通常还会再为间接光加一个"环境"常数。詹姆斯·布林（Blinn，1977）把 $r\cdot v$ 换成 $n\cdot h$，其中 **半程向量** $h = (l + v)/\norm{l + v}$：法向恰好平分光向与视向时高光最亮，也就是法向为 $n$ 的镜子会把 $l$ 反射进 $v$。光源与观察者都远时 $h$ 是常量，Blinn-Phong 更省；它在掠射角下表现更好，也更贴近实测材质；Blinn-Phong 指数取 Phong 指数的四倍上下，可得到相近的高光。

::: example 镜射方向、半程向量与四倍因子 {#ex-phong-blinn}
设 $n = (0, 0, 1)$，光方向 $l = (0.6, 0, 0.8)$，观察者正上方 $v = (0, 0, 1)$，算出 Phong 项 $(r\cdot v)^{20}$ 与 Blinn-Phong 项 $(n\cdot h)^{20}$、$(n\cdot h)^{80}$。
::: solution
$r = 2(n\cdot l)n - l = 2\cdot0.8\,(0,0,1) - (0.6, 0, 0.8) = (-0.6, 0, 0.8)$，所以 $r\cdot v = 0.8$：观察者偏离镜射方向 $36.9°$，而 $0.8^{20} = 0.0115$。半程向量为 $h = (0.6, 0, 1.8)/\norm{(0.6, 0, 1.8)} = (0.316, 0, 0.949)$，所以 $n\cdot h = 0.9487$：$n$ 与 $h$ 的夹角是 $18.4°$，恰为一半，因为把 $v$ 从 $r$ 转开时，$h$ 只转一半的角度。于是 $0.9487^{20} = 0.349$，是一个宽得多的高光；而 $0.9487^{80} = 0.0148$，与 Phong 的值很接近。因为小角度下 $\cos^s(\theta/2) \approx e^{-s\theta^2/8}$、$\cos^s\theta \approx e^{-s\theta^2/2}$，指数翻四倍就让两个瓣在峰附近一致。
:::
:::

照原样写出的这些公式并不守恒能量：$s$ 增大时瓣变窄，反射的总能量随之下降，美术把表面调得更亮洁（glossy）的同时也把它调暗了。把瓣归一化就能补救。

::: theorem 归一化 Phong 瓣 {#thm-phong-norm}
BRDF $f_r(\omega_i, \omega_o) = \frac{s + 2}{2\pi}\max(r_o\cdot\omega_i, 0)^s$，其中 $r_o$ 是 $\omega_o$ 的镜射方向，在正入射（$\omega_o = n$）处的方向反照率恰为 $1$。
:::

::: proof
正入射时 $r_o = n$，所以 $r_o\cdot\omega_i = \cos\theta_i$，且
$$
\rho(n) = \frac{s+2}{2\pi}\int_0^{2\pi}\!\!\int_0^{\pi/2}\cos^{s}\theta\,\cos\theta\sin\theta\,d\theta\,d\phi = (s + 2)\left[-\frac{\cos^{s+2}\theta}{s+2}\right]_0^{\pi/2} = 1 .
$$
:::

其他角度处反照率更小（瓣的一部分沉到地平线以下，且整个瓣上 $\cos\theta_i < 1$）：数值上，$s = 10$ 时在 $\theta_o = 30°$ 处为 $0.87$，$60°$ 处为 $0.50$；窄瓣时它接近 $\cos\theta_o$。所以 $k_s\frac{s+2}{2\pi}$ 配上 $k_s \le 1$ 对所有方向都守恒能量；Blinn-Phong 对应的因子 $\frac{s + 8}{8\pi}$ 是广泛使用的近似。归一化的瓣峰值随 $s$ 增长——镜面似的高光小而极亮——这正是真实材质的行为。

::: widget plot
f: (s + 2)/(2*pi)*cos(x)^s; 1/pi
x: 0, 1.5708
y: 0, 3
sliders: s=10:0:100:1
labels: \tfrac{s+2}{2\pi}\cos^s\theta; \text{朗伯 } 1/\pi
caption: 正入射处归一化 Phong 瓣随偏离镜射方向角 $\theta$ 变化的曲线，与反照率同为 $1$ 的常数朗伯 BRDF 对照。拖动 $s$：瓣变窄，其峰 $\frac{s+2}{2\pi}$ 升高，使下方的余弦加权面积保持 $1$（[[#thm-phong-norm]]）。$s = 0$ 时瓣就是 $\frac{1}{\pi}$，即朗伯 BRDF。
:::

## 微表面模型

Phong 的瓣只是一个好用的形状，没有物理推导。更好的模型从光泽表面是什么出发：显微镜下，粗糙表面是一片微小平面（facet）构成的地貌，每个平面都是完美镜子，其法向 $m$ 散布在平均法向 $n$ 周围。来自 $l$ 的光只被法向为半程向量（$m = h$）的平面反射向 $v$，而这部分光有多少取决于三件事：有多少平面朝向那个方向、镜子在该角度反射多少光、这些平面中又有多少被邻居遮住了光或眼睛的视线。

::: definition 微表面 BRDF {#def-microfacet}
**Cook-Torrance** 微表面 BRDF 是
$$
f_r(l, v) = \frac{D(h)\,F(v\cdot h)\,G(l, v)}{4\,(n\cdot l)(n\cdot v)}, \qquad h = \frac{l + v}{\norm{l + v}},
$$ {#eq-cook-torrance}
其中
- **法向分布函数** $D(m) \ge 0$ 是单位立体角上平面法向的密度，其归一化使平面的投影面积等于宏观面积：$\int_\Omega D(m)\,(n\cdot m)\,d\omega_m = 1$；
- **菲涅耳（Fresnel）项** $F \in [0, 1]$ 是镜面微面（facet）在该角度反射的光的比例；
- **几何**（阴影-遮蔽）项 $G \in [0, 1]$ 是法向为 $h$ 的平面中，从 $l$ 和 $v$ 都可见的那部分。
:::

因子 $4$ 来自换元：BRDF 是关于出射方向的密度，而 $D$ 是平面法向上的密度，半程向量映射 $v \mapsto h$ 压缩立体角，$d\omega_h = d\omega_v/(4\,(v\cdot h))$。（证明是球面几何的一道小题；见 Walter 等 2007。）分母里的 $(n\cdot l)$ 与 $(n\cdot v)$ 在微面面积与宏观面积之间换算。

到 2026 年为止的标准选择，几乎全部生产级渲染器与 glTF 2.0 材质模型都在用：

- 粗糙度为 $\alpha$ 的 **GGX**（Trowbridge-Reitz）分布：
$$
D(m) = \frac{\alpha^2}{\pi\bigl((n\cdot m)^2(\alpha^2 - 1) + 1\bigr)^2};
$$ {#eq-ggx}
- 菲涅耳方程的**施利克（Schlick）近似**，$F_0$ 为正入射处的反射率：
$$
F(\cos\theta) = F_0 + (1 - F_0)(1 - \cos\theta)^5;
$$ {#eq-schlick}
- **史密斯（Smith）**阴影-遮蔽函数，$G(l, v) = G_1(l)G_1(v)$（或高度相关的变体），GGX 对应的 $G_1(v) = \dfrac{2\,(n\cdot v)}{(n\cdot v) + \sqrt{\alpha^2 + (1 - \alpha^2)(n\cdot v)^2}}$。

美术通常设置一个"感知粗糙度" $r \in [0, 1]$，渲染器使用 $\alpha = r^2$。折射率为 $\eta$ 的电介质（玻璃、塑料）有 $F_0 = \bigl((\eta - 1)/(\eta + 1)\bigr)^2$，$\eta = 1.5$ 时为 $0.04$；金属的 $F_0$ 高而有颜色（金反射红与绿多于蓝），且没有漫反射分量，因为进入金属的光会被吸收。一切材质的菲涅耳反射率在掠射角都趋向 $1$，所以湖面远岸倒影迷蒙、脚边却清澈见底。

::: example 高光顶部的 GGX {#ex-ggx}
一个塑料表面（$F_0 = 0.04$）取 $\alpha = 0.25$，光照与观察都在与法线成 $60°$ 的两侧，使得 $h = n$。求镜面 BRDF。
::: solution
在 $h = n$ 处：$D = \frac{\alpha^2}{\pi\alpha^4} = \frac{1}{\pi\alpha^2} = \frac{1}{\pi\cdot0.0625} = 5.093$。$v\cdot h = \cos60° = 0.5$，所以 $F = 0.04 + 0.96\cdot0.5^5 = 0.04 + 0.03 = 0.07$。$n\cdot v = 0.5$ 处求 $G_1$：$\sqrt{0.0625 + 0.9375\cdot0.25} = \sqrt{0.296875} = 0.5449$，所以 $G_1 = 1/(0.5 + 0.5449) = 0.9571$，$G = 0.9571^2 = 0.9160$。于是
$$
f_r = \frac{5.093\cdot0.07\cdot0.9160}{4\cdot0.5\cdot0.5} = \frac{0.3266}{1} = 0.327\ \text{sr}^{-1}.
$$
对照反照率 $0.5$ 的朗伯漫反射层：$0.5/\pi = 0.159$ sr$^{-1}$。高光这里只比漫反射颜色亮两倍，因为 $F$ 很小；正入射时菲涅耳项只有 $0.04$，而接近掠射时它增长很快——$v\cdot h = \cos 80°$ 处已达 $0.41$。
:::
:::

### 能量守恒，检验过了

$D$ 的归一化是一条可以数值检验的条件，整个 BRDF 的能量平衡也一样。**白炉测试**用均匀为 $1$ 的入射辐射亮度包围表面，并取 $F = 1$（每个平面都是完美镜子）：由 [[#eq-reflection]]，此时反射的辐射亮度就是方向反照率，它应当至多为 $1$，而且最好恰好为 $1$，因为没有光被吸收。

```python
import math

def ggx_D(cos_h, alpha):                       # GGX / Trowbridge-Reitz 分布
    a2 = alpha * alpha
    d = cos_h * cos_h * (a2 - 1) + 1
    return a2 / (math.pi * d * d)

def smith_G1(cos_v, alpha):                    # GGX 的 Smith 遮蔽
    a2 = alpha * alpha
    return 2 * cos_v / (cos_v + math.sqrt(a2 + (1 - a2) * cos_v * cos_v))

def cook_torrance(l, v, alpha, F=1.0):         # n = (0, 0, 1)；l, v 为单位向量
    h = [l[i] + v[i] for i in range(3)]
    hl = math.sqrt(sum(x * x for x in h)); h = [x / hl for x in h]
    nl, nv = l[2], v[2]
    return ggx_D(h[2], alpha) * F * smith_G1(nl, alpha) * smith_G1(nv, alpha) / (4 * nl * nv)

def hemisphere(f, n=400):                      # 半球上的积分，中点公式
    total = 0.0
    for i in range(n):
        th = (i + 0.5) * (math.pi / 2) / n
        for j in range(2 * n):
            ph = (j + 0.5) * math.pi / n
            w = [math.sin(th) * math.cos(ph), math.sin(th) * math.sin(ph), math.cos(th)]
            total += f(w) * math.sin(th) * (math.pi / 2 / n) * (math.pi / n)
    return total

print("integral of cos:", round(hemisphere(lambda w: w[2]), 5), " pi =", round(math.pi, 5))
for alpha in [0.1, 0.5, 1.0]:
    normD = hemisphere(lambda m: ggx_D(m[2], alpha) * m[2])
    v = [math.sin(math.radians(60)), 0, math.cos(math.radians(60))]
    albedo = hemisphere(lambda l: cook_torrance(l, v, alpha) * l[2])
    print(f"alpha={alpha}: integral of D cos = {normD:.4f},  albedo at 60 deg (F=1) = {albedo:.4f}")
```

```console
$ python3 brdf.py
integral of cos: 3.1416  pi = 3.14159
alpha=0.1: integral of D cos = 1.0001,  albedo at 60 deg (F=1) = 0.9691
alpha=0.5: integral of D cos = 1.0000,  albedo at 60 deg (F=1) = 0.6860
alpha=1.0: integral of D cos = 1.0000,  albedo at 60 deg (F=1) = 0.4091
```

第一行拿 $\int\cos\theta\,d\omega = \pi$（[[#thm-lambert]]）检验积分器。GGX 分布对每个粗糙度都正确归一化。反照率在 $1$ 以下——BRDF 从不凭空造出能量——但粗糙表面会远低于 $1$：$\alpha = 1$ 时损失超过一半的光。这个损失是模型里真实的，不是数值误差（[[#ex-furnace]] 用封闭形式算了其中一例）。微表面模型只计入*一次*反射的光；被 $G$ 挡住的光直接丢弃，而真实粗糙表面上，这些光会在平面之间再弹几次、终究离开。生产级渲染器会加一项多重散射补偿（例如 Kulla 与 Conty 2017 年的方法），免得粗糙金属看起来过暗。

::: warning "基于物理"不等于"正确"
基于物理的 BRDF 遵守互易性与能量守恒、由可测参数构成，但它仍是模型：配 Smith 遮蔽的 GGX 忽略了多重散射（上面刚刚测到），施利克公式近似菲涅耳方程，而层状材质（清漆木器、汽车漆、皮肤）需要的更多。反过来说，Blinn-Phong 也谈不上"错"，只是未归一化、纯经验。基于物理方法的价值在于材质在任何光照下都保持外观，于是一个场景里做的资产能拿到另一个场景里用——而不在于图像精确。
:::

::: quiz
一块反照率 $0.8$ 的漫反射表面，被一盏方向光照亮，其正照辐照度 $E_\perp = 5$ W/m²。光以与法线成 $60°$ 的方向射来。表面朝观察者反射的辐射亮度是多少？
- [ ] $4$ W/(m²·sr)
- [ ] $2$ W/(m²·sr)
- [x] $2/\pi \approx 0.64$ W/(m²·sr)
- [ ] 取决于观察方向。
::: solution
$E = E_\perp\cos60° = 2.5$ W/m²，由 [[#thm-lambert]]，$L_o = \frac{\rho}{\pi}E = \frac{0.8\cdot2.5}{\pi} = \frac{2}{\pi}$ W/(m²·sr)，与观察方向无关。答案 $2$ 忘了 $1/\pi$：那是反射的*等效辐照度*（单位面积的反射通量），不是辐射亮度。
:::
:::

## 在哪里计算着色

三角形网格逼近一张弯曲的表面。若每个三角形都用自己的几何法向着色——**平面着色**——小面就一览无余，而眼睛还会夸大面与面之间的亮度台阶（马赫带）。光滑着色给每个顶点一个**顶点法向**，通常取它周围各面法向的平均再归一化（或按面积或角度加权），以逼近底下滑滑表面的法向。犹他大学在 20 世纪 70 年代初发明了使用顶点法向的两种方式：

- **古劳德（Gouraud）着色**（1971）在顶点处求光照，再用重心坐标把所得颜色插值到整个三角形上（[[graphics/rasterisation#thm-barycentric]]）。
- **Phong 着色**（1975）插值*法向*，在每个像素处重新归一化，并逐像素求光照。

::: example 顶点之间的高光 {#ex-gouraud-miss}
一条边的两个端点处的单位法向与半程向量 $h$ 各成 $+30°$ 与 $-30°$。镜面项为 $(n\cdot h)^{40}$。比较古劳德着色与 Phong 着色下它在边中点处的值。
::: solution
每个顶点处 $n\cdot h = \cos30° = 0.8660$，而 $0.8660^{40} = e^{40\ln 0.8660} = e^{-5.754} = 0.0032$。古劳德着色插值这些值：中点处 $0.0032$——根本没有高光。Phong 着色插值法向：两个单位法向的平均平行于 $h$（由对称性），重新归一化后 $n\cdot h = 1$，镜面项为 $1$，大了三百多倍。高光只存在于顶点之间，古劳德着色显示不出它；物体转动时，高光掠过顶点便一亮一灭地跳。
:::
:::

注意"重新归一化"：两个单位向量线性插值出来的向量长度小于 $1$（$\pm30°$ 两法向的中点长度为 $\cos30° = 0.866$），不重新归一化就使用，会让漫反射项变暗、镜面项全毁。自 GPU 可编程以来，逐像素求值成了常态，古劳德着色主要残留在极低功耗的硬件上。这两个名字容易混：**Phong 着色**说的是插值方案，**Phong 反射模型**说的是上一节的瓣，二者可以互不依赖地各用各的。

## 光源与其余的光

点光源、聚光灯（限制在锥内、边缘平滑衰减的点光源）与方向光都是理想化：真实光源有面积，**面光源**产生带半影的软阴影——半影处光源被部分遮挡。对面光源求值意味着把 [[#eq-reflection]] 在光源的立体角上积分：实时渲染器用预计算表（线性变换余弦，Heitz 等 2016）近似，光线追踪器则用采样估计（[[graphics/ray-tracing]]）。

光还会间接到达——在别的表面弹过之后；一盏灯照亮的白色天花板，会照亮它下面的房间。最粗的模型加一个常数**环境**项。好一些的用**基于图像的照明**：把环境的全景 HDR 照片当作从无穷远处射来的光，并预先对着 BRDF 作积分，使反射积分变成一次纹理查表（[[graphics/texture-mapping]]）。最后，阴影是可见性问题——从这个点看得见光源吗——光栅化器用阴影映射回答（[[graphics/gpu-pipeline]]），光线追踪器用阴影射线回答。

下面把全部内容合成一件事：一个单位球，被左上方远处的光照亮，带朗伯层（$\rho = 0.7$）与一个归一化 Blinn-Phong 瓣，逐像素求值，并以墨迹渐浓的字符打印，此前已按 $\gamma = 2.2$ 编码。

```python
import math

def normalise(v):
    l = math.sqrt(sum(x * x for x in v)); return [x / l for x in v]

def dot(a, b): return sum(x * y for x, y in zip(a, b))

L = normalise([-1, 1, 1])                   # 指向远处光源的方向
V = [0, 0, 1]                               # 沿 +z 的正交观察者
H = normalise([L[i] + V[i] for i in range(3)])
kd, ks, shininess = 0.7, 0.3, 40            # 漫反射反照率、镜面权重、指数
ramp = ".:-=+*#%@"                          # 由暗到亮的字符

def radiance(x, y):                          # 正面看到的单位球
    r2 = x * x + y * y
    if r2 > 1:
        return None
    n = [x, y, math.sqrt(1 - r2)]           # 法向等于位置
    diffuse = kd / math.pi * max(dot(n, L), 0)
    spec = ks * (shininess + 8) / (8 * math.pi) * max(dot(n, H), 0) ** shininess
    return (diffuse + spec * (dot(n, L) > 0)) * math.pi    # 辐照度为 pi 的光

for j in range(12):
    y = 1 - (j + 0.5) / 6
    row = ""
    for i in range(32):
        x = (i + 0.5) / 16 - 1
        c = radiance(x, y)
        row += " " if c is None else ramp[min(8, int(9 * c ** (1 / 2.2)))]
    print(row)
print("centre:", round(radiance(0, 0), 4), " highlight:", round(radiance(H[0], H[1]), 4))
```

```console
$ python3 sphere.py
          %%%%######**          
     %%%%%%%%%%%#####***++-     
   %%%%%@@@@@@%%%####***++==:   
 #%%%%@@@@@@@@@@%###****++==-.. 
 %%%%%@@@@@@@@@%%##****+++=-:.. 
##%%%%%@@@@@@%%##****+++==-:....
###############****++++==-......
 *########*******+++===-:...... 
 +***********++++===-:......... 
   ++++++++++===--:..........   
     .-------:.............     
          ............          
centre: 0.4197  highlight: 2.4217
```

辐照度为 $\pi$ 的光，让正对它、反照率 $1$ 的表面反射出辐射亮度 $1$。漫反射项按 $n\cdot l$ 朝右下方的明暗交界线衰减；高光在 $n = h$ 处，即图像上的 $(h_x, h_y) = (-0.325, 0.325)$，其值 $2.42$ 超过了 $1$——显示器能显示的最亮值：一个 HDR 值，要由色调映射算子去压缩（[[graphics/images-colour]]）。

::: history
约翰·海因里希·朗伯（Lambert）的 *Photometria*（1760）陈述了余弦定律，并描述了完美漫反射。昂利·古劳德（Gouraud）1971 年发表了光滑着色；Bui Tuong Phong 的 "Illumination for computer generated pictures"（*Communications of the ACM*，1975）既引入了法向插值、也引入了他的反射模型；詹姆斯·布林（Blinn）的 "Models of light reflection for computer synthesized pictures"（SIGGRAPH 1977）引入了半程向量，并把肯尼思·托兰斯（Torrance）与埃弗雷姆·斯帕罗（Sparrow）源自光学（1967）的微表面理论带进图形学。弗雷德·尼科德姆斯（Nicodemus）1965 年引入了 BRDF；1977 年尼科德姆斯等人执笔的美国国家标准局专著标准化了它的定义与术语。罗伯特·库克（Cook）与肯尼思·托兰斯（Torrance）的 "A reflectance model for computer graphics"（*ACM Transactions on Graphics*，1982）给出了形式 [[#eq-cook-torrance]]。布鲁斯·史密斯（Smith）的阴影函数出自 1967 年，克里斯托夫·施利克（Schlick）的菲涅耳近似出自 1994 年；GGX 分布——与特罗布里奇（Trowbridge）和赖茨（Reitz）1975 年的模型相同——由布鲁斯·沃尔特（Walter）、斯蒂芬·马斯纳（Marschner）、李洪颂（Li）与托兰斯（Torrance）于 2007 年引入图形学。布伦特·伯利（Burley）的迪士尼"principled"BRDF（SIGGRAPH 课程，2012）与布莱恩·卡里斯（Karis）的虚幻引擎 4 笔记（2013）让基于物理的着色成为影视与游戏的标准。
:::

## 后续内容

[[graphics/texture-mapping]] 让每个 BRDF 参数——反照率、粗糙度、甚至法向——沿表面变化，并用预滤波的环境贴图为基于图像的照明服务。[[graphics/gpu-pipeline]] 在片元着色器里运行本章的公式，每帧数百万次。[[graphics/ray-tracing]] 把对光源的和换成完整的反射积分，入射辐射亮度递归计算：渲染方程用蒙特卡洛积分求解，而这里推导的 BRDF 瓣的归一化，正是重要性采样的概率密度。

::: summary
- **辐射亮度** $L$（W/(m²·sr)）是相机测得的量，沿射线保持不变；**辐照度** $E = \int L_i\cos\theta\,d\omega$ 自带朗伯余弦因子。
- **BRDF** $f_r(\omega_i, \omega_o)$ 把入射辐照度映为出射辐射亮度；物理 BRDF 满足互易性，反照率 $\le 1$。
- 朗伯 BRDF 是 $\rho/\pi$，因为 $\int_\Omega \cos\theta\,d\omega = \pi$。
- Phong 与 Blinn-Phong 瓣需要归一化（$\frac{s+2}{2\pi}$，近似 $\frac{s+8}{8\pi}$），才能在变锐时守恒能量。
- **微表面** BRDF $\frac{DFG}{4(n\cdot l)(n\cdot v)}$ 综合了法向分布（GGX）、菲涅耳反射率（Schlick）与阴影-遮蔽（Smith）；高粗糙度下它损失能量，因为只建模了一次反弹。
- 用插值后重新归一化的法向着色（Phong 着色）；古劳德着色会错过顶点之间的高光。
- 全程用线性辐射度学单位，只为显示才编码。
:::

## 习题

::: exercise 平方反比律 {level=1 check="0.5"}
一盏强度 $8$ W/sr 的点光源距表面 $4$ m，以 $0°$ 入射角照射。辐照度是多少，单位 W/m²？（输入数值。）
::: solution
$E = I\cos\theta/r^2 = 8\cdot1/16 = 0.5$ W/m²。若以 $60°$ 入射，还要再折半，成 $0.25$ W/m²。
:::
:::

::: exercise 正入射处的菲涅耳 {level=1 check="0.04"}
折射率 $1.5$ 的电介质的 $F_0$ 是多少？（输入反射率。）
::: solution
$F_0 = \bigl(\frac{1.5 - 1}{1.5 + 1}\bigr)^2 = (0.5/2.5)^2 = 0.2^2 = 0.04$。正入射时玻璃反射约 $4\%$ 的光，这就是夜里的窗户会隐约映出房间的原因。
:::
:::

::: exercise 归一化瓣的峰值 {level=1 check="51/pi"}
归一化 Phong 瓣 $\frac{s+2}{2\pi}\cos^s\theta$ 在 $s = 100$ 时的峰值（$\theta = 0$ 处）是多少？（输入数值。）
::: solution
$\frac{102}{2\pi} = \frac{51}{\pi} \approx 16.2$ sr$^{-1}$，约为同反照率朗伯值 $1/\pi$ 的 $51$ 倍。瓣越窄，就要越高，才能带走同样的能量。
:::
:::

::: exercise 朗伯面从各方向一样亮 {level=2}
解释为什么被固定光源照明的朗伯面，从每个观察方向看起来一样亮，尽管它朝掠射方向的观察者、按单位表面积算送出的光，比朝正上方观察者送出的少得多。请用辐射亮度的定义。
::: solution
从面元 $dA$ 沿 $\omega_o$ 附近锥 $d\omega$ 离开的通量是 $d^2\Phi = L_o\cos\theta_o\,dA\,d\omega$，当 $L_o$ 固定时它按 $\cos\theta_o$ 下降：掠射的观察者从每平方米收到的光更少。但那位观察者看到的每平方米表面也被 $\cos\theta_o$ 前缩了，所以他相机的一像素罩住的表面多出 $1/\cos\theta_o$ 倍。两个因子相消，像素测得的量——辐射亮度——就是常数 $L_o = \frac{\rho}{\pi}E$。这就是大致朗伯的满月本应看起来是个均匀亮盘的原因（实际它朝边缘还略亮一点，因为月尘不是朗伯的）。
:::
:::

::: exercise Blinn-Phong 的互易性 {level=2}
证明 Blinn-Phong 瓣 $(n\cdot h)^s$ 是互易的；而 Phong 瓣 $\max(r_o\cdot\omega_i, 0)^s$ 其实也是互易的；但经典"修正 Phong"项 $k_s\max(r\cdot v,0)^s/(n\cdot l)$——当初用来抵消反射方程里的余弦——不是。
::: solution
$h = (l + v)/\norm{l+v}$ 关于 $l$ 与 $v$ 对称，所以 $(n\cdot h)^s$ 在两者互换下不变。对 Phong，$r_o\cdot\omega_i$ 其中 $r_o = 2(n\cdot\omega_o)n - \omega_o$，等于 $2(n\cdot\omega_o)(n\cdot\omega_i) - \omega_o\cdot\omega_i$，关于 $\omega_i$ 与 $\omega_o$ 对称。除以 $n\cdot l = n\cdot\omega_i$ 就破坏了这种对称：互换后变成除以 $n\cdot\omega_o$，除非两角相等，否则值不同。这样的"BRDF"违反互易性；在近掠射处 $1/(n\cdot l)$ 爆炸，它还可能违反能量守恒。
:::
:::

::: exercise 古劳德伪影的数值 {level=2}
沿用 [[#ex-gouraud-miss]] 的设置，求镜面指数 $s$，使古劳德着色在中点处报出的值不到真实（Phong 着色）值的 $1\%$。
::: solution
古劳德给 $\cos^s 30°$，Phong 给 $1$。需要 $0.8660^s < 0.01$，即 $s > \ln 0.01/\ln 0.8660 = -4.6052/-0.14384 = 32.0$。所以任何超过约 $32$ 的指数——一块中等光泽的表面——都会丢掉 $99\%$ 以上的高光。除非顶点间距远比高光的角宽 $\approx 1/\sqrt s$ 弧度更细，古劳德着色是行不通的。
:::
:::

::: exercise 白炉测试的封闭形式 {level=3 check="1 - ln(2)" #ex-furnace}
对 $\alpha = 1$、$F = 1$、可分离 Smith 遮蔽的 GGX 微表面 BRDF，精确算出正入射（$v = n$）处的方向反照率。（输入反照率。）
::: solution
$\alpha = 1$ 时，[[#eq-ggx]] 对一切 $m$ 给出 $D = 1/\pi$。$v = n$ 时：$G_1(v) = \frac{2}{1 + \sqrt{1}} = 1$；而 $G_1(l) = \frac{2\cos\theta}{\cos\theta + 1}$，因为 $\alpha^2 + (1-\alpha^2)\cos^2\theta = 1$。BRDF 为 $f_r = \frac{(1/\pi)\cdot1\cdot G_1(l)\cdot1}{4\cos\theta\cdot1}$，于是
$$
\rho = \int_\Omega f_r\cos\theta\,d\omega = \frac{1}{4\pi}\int_0^{2\pi}\!\!\int_0^{\pi/2}\frac{2\cos\theta}{\cos\theta + 1}\sin\theta\,d\theta\,d\phi = \int_0^1\frac{u}{u + 1}\,du = 1 - \ln 2 \approx 0.307,
$$
其中换元 $u = \cos\theta$。用 $v = n$、$\alpha = 1$ 运行正文的积分器得 $0.30685$，两相吻合。这个极端情形下，单次散射模型损失了近 $70\%$ 的能量。
:::
:::

::: exercise 实现一个微表面球 {level=3}
改造 `sphere.py`：用 `brdf.py` 中 $\alpha = 0.3$、$F_0 = 0.04$ 的 Cook-Torrance 镜面项替换 Blinn-Phong 瓣，保留朗伯层，并打印高光处的辐射亮度。解释为什么高光现在比 Blinn-Phong 在同样位置弱，而什么会让它接近轮廓处变强。
::: solution
把镜面那一行换成对微表面 BRDF 的调用，在法向标架里取 $l = L$、$v = V$；最省事的办法是直接算点积：

```python
import math
def norm(v): l = math.sqrt(sum(x * x for x in v)); return [x / l for x in v]
def dot(a, b): return sum(x * y for x, y in zip(a, b))
L, V = norm([-1, 1, 1]), [0, 0, 1]
H = norm([L[i] + V[i] for i in range(3)])
alpha, F0, kd = 0.3, 0.04, 0.7

def spec(n):
    nl, nv, nh, vh = dot(n, L), dot(n, V), dot(n, H), dot(V, H)
    if nl <= 0 or nv <= 0:
        return 0.0
    a2 = alpha * alpha
    D = a2 / (math.pi * (nh * nh * (a2 - 1) + 1) ** 2)
    F = F0 + (1 - F0) * (1 - vh) ** 5
    G1 = lambda c: 2 * c / (c + math.sqrt(a2 + (1 - a2) * c * c))
    return D * F * G1(nl) * G1(nv) / (4 * nl * nv)

n = H                                    # 高光处的法向
radiance = (kd / math.pi + spec(n)) * max(dot(n, L), 0) * math.pi
print(round(spec(n), 4), round(radiance, 4))
```

```console
$ python3 ctsphere.py
0.0443 0.7453
```

高光处镜面 BRDF 只有 $0.044$ sr$^{-1}$：$D = 1/(\pi\alpha^2) = 3.54$ 固然不小，但 $v\cdot h = \cos 27.4° = 0.888$ 处的菲涅耳项只比 $F_0 = 0.04$ 高出一线。总辐射亮度 $0.745$ 由漫反射层主导（$0.7\cdot0.888 = 0.62$），而 Blinn-Phong 的球达到过 $2.42$。Blinn-Phong 版用了 $k_s = 0.3$，远多于塑料在接近正入射的角度上真正反射的比例。靠近轮廓处 $v\cdot h$ 变小，$F$ 向 $1$ 攀升，微表面高光随之变强——这正是任何掠射角下的亮塑料或湿路上看得见的菲涅耳效应，Blinn-Phong 模型做不出来。
:::
:::
