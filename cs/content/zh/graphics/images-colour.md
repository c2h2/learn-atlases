计算机显示给你的每一幅画面——一张照片、一个游戏、本页面——最终都是送往显示器的一张矩形网格上的数。一台 4K 显示器有 $3840 \times 2160 \approx 8.3$ 百万个位置，每个位置约每秒钟六十次地接收红、绿、蓝三个数。计算机图形学是一门手艺：由场景的描述——形状、材质、灯光与摄像机——算出这些数。在算出它们之前，我们得先知道它们*意味着什么*。红通道里的数 $128$ 关于离开屏幕的光说了些什么？为什么一条细斜线画出来是锯齿状，条纹衬衫在电视上会闪烁？为什么在屏幕上混合黑与白，若把数值取平均，会得到看起来太暗的颜色？

本章回答这些问题。图像是一个连续函数的**采样**之集，采样理论告诉我们会出什么错（混叠）、又该如何与之对抗（滤波）。颜色是一个三维量，因为人眼有三种颜色感光受体；CIE XYZ 空间把这一点精确化，而 sRGB 之类的 RGB 空间是其中的线性坐标系。最后，图像文件里存的数与光并不成正比：它们经过**伽马编码**（gamma）以让 $8$ 位用出效率，每个渲染器在对着光做算术之前都必须先解码。一路之上我们还会用纯 Python 把图像写到磁盘——这是本课程后面一直要用的工具。

## 光栅图像

::: definition 光栅图像 {#def-raster}
宽 $W$ 高 $H$ 的**光栅图像**是一个由 $W \times H$ 个**像素**（picture elements，图像元素）组成的数组，每个像素持有固定数目的**通道**——灰度图像一个，彩色图像三个（红、绿、蓝），若再加上 **alpha**（不透明度）通道则四个。满足 $0 \le i < W$、$0 \le j < H$ 的像素 $(i, j)$，是某个底层连续图像 $f(x, y)$ 在像素中心 $(i + \tfrac12, j + \tfrac12)$ 处的采样。每个通道值以固定**位深**存储：通常是 $8$ 位（整数 $0$–$255$）、$10$ 位或 $16$ 位，**高动态范围**（HDR）图像则用 $16$ 位或 $32$ 位浮点数。
:::

这个定义里有两条约定值得一说。第一，像素是*一点上的采样*，不是一个小色块。显示设备可以把它画成方块（或三条色带），相机传感器则对面积上的光积分，但若把这个数组当作 $f$ 的点采样，重采样、滤波与反锯齿的数学要清楚得多。第二，像素中心落在半整数坐标上，于是连续图像恰好占据矩形 $[0, W] \times [0, H]$。这个半像素偏移弄错，就会得到缩放时平移半个像素的图像，这是经典的错误来源。多数图像格式把第 $j = 0$ 行存在*顶部*，而数学（以及 OpenGL 纹理坐标）通常把 $y = 0$ 放在底部；凡此要紧处，我们都会说明用的是哪种约定。

内存开销就是简单的 $W \cdot H \cdot (\text{通道数}) \cdot (\text{每通道字节数})$。一张 $1920 \times 1080$、每通道 $8$ 位的 RGB 图像要 $1920 \cdot 1080 \cdot 3 = 6\,220\,800$ 字节，约 $5.9$ MiB；换成 $16$ 位浮点的 RGBA 则要 $16.6$ MB。**帧缓冲区**（framebuffer）就是内存中这样一块、由显示硬件连续读取的数组。

### 从 Python 写出图像

最简单的图像格式是 Netpbm 的 **PPM**：一小段 ASCII 头（`P6`、宽与高、最大值），随后是从顶部起逐行的像素原始字节。多数图像查看器都能打开它。要让浏览器显示，我们想要 **PNG**，它几乎同样简单：一个签名、一个头块、经 zlib 压缩的像素行（每行前缀一个滤波字节，我们置为 $0$，即 "none"），再加一个结束块，每个块都由 CRC-32 校验和保护。Python 标准库提供 `zlib` 与 `struct`，所以两个写出器都只需几行、不需要额外的包。

```python
import struct, zlib

def write_ppm(path, w, h, pixels):
    """pixels: h 行的列表，每行是 w 个 (r, g, b) 元组，分量取 0..255 的整数。"""
    with open(path, "wb") as f:
        f.write(b"P6\n%d %d\n255\n" % (w, h))          # 头部：魔数、尺寸、最大值
        for row in pixels:
            f.write(bytes(c for px in row for c in px))

def write_png(path, w, h, pixels):
    def chunk(kind, data):                            # 长度、类型、数据、CRC-32
        return (struct.pack(">I", len(data)) + kind + data
                + struct.pack(">I", zlib.crc32(kind + data)))
    raw = b"".join(b"\x00" + bytes(c for px in row for c in px)   # 每行一个滤波字节 0
                   for row in pixels)
    ihdr = struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)  # 8 位 RGB，不隔行
    with open(path, "wb") as f:
        f.write(b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr)
                + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b""))

if __name__ == "__main__":
    w, h = 256, 64
    img = [[(x, x, x) for x in range(w)] for y in range(h)]   # 灰度渐变
    write_ppm("ramp.ppm", w, h, img)
    write_png("ramp.png", w, h, img)
    import os
    print(os.path.getsize("ramp.ppm"), os.path.getsize("ramp.png"))
    print(open("ramp.ppm", "rb").read(15))
```

```console
$ python3 imgio.py
49166 1197
b'P6\n256 64\n255\n\x00'
```

这个 PPM 文件是 $14$ 字节的头加 $256 \cdot 64 \cdot 3 = 49\,152$ 字节的像素；PNG 小了四十倍，因为渐变的每一行都相同，而 zlib 发现了重复。把这个文件存成 `imgio.py`：后面各章会从它导入 `write_png`。打开 `ramp.png` 仔细看看——从码字 $0$ 到码字 $255$ 等步长递增的渐变，看上去并*不*像物理强度等步长增长的光。解释原因正是本章的后一半。

## 采样与混叠

渲染只在采样点上求值连续图像 $f$。采样点之间发生的一切都会丢失；而当 $f$ 的变化快过采样所能跟上时，这些采样描述的就是一个*不同*的函数。这就是**混叠**（aliasing）：它在边缘上造出阶梯状的"锯齿"，让动画里的细线爬行，在细密纹理上产生摩尔纹，还让电影里的马车轮子看起来在倒转。

先在一条直线上考虑：采样间隔为 $T$，即**采样率** $f_s = 1/T$（单位长度的采样数），采样点为 $x_k = kT$。

::: lemma 正弦的混叠 {#lem-alias}
对每个整数 $m$，正弦 $\cos(2\pi \nu x + \varphi)$ 与 $\cos(2\pi(\nu + m f_s)x + \varphi)$ 在所有采样点 $x_k = k/f_s$ 处取相同的值。特别地，频率 $\nu$ 满足 $f_s/2 < \nu < f_s$ 的正弦，与更低频率 $f_s - \nu$ 的采样无法区分。
:::

::: proof
在 $x_k = k/f_s$ 处，第二个正弦的相位是 $2\pi\nu k/f_s + 2\pi m k + \varphi$，与第一个的相位相差 $2\pi mk$，即 $2\pi$ 的整数倍。余弦以 $2\pi$ 为周期，故取值相同。第二句话取 $m = -1$：频率 $\nu - f_s$ 为负，而 $\cos(-\theta) = \cos\theta$ 把 $\cos(2\pi(\nu - f_s)x + \varphi)$ 变成 $\cos(2\pi(f_s - \nu)x - \varphi)$，即频率 $f_s - \nu \in (0, f_s/2)$ 的正弦。
:::

```python
import math
fs = 10                                  # 每单位长度的采样数
for k in range(6):
    x = k / fs
    a = math.cos(2 * math.pi * 9 * x)    # 每单位 9 个周期：高于 fs/2 = 5
    b = math.cos(2 * math.pi * 1 * x)    # 它的混叠，9 - 10 = -1 -> 每单位 1 个周期
    print(f"x={x:.1f}  cos(18 pi x)={a:+.4f}  cos(2 pi x)={b:+.4f}")
```

```console
$ python3 alias.py
x=0.0  cos(18 pi x)=+1.0000  cos(2 pi x)=+1.0000
x=0.1  cos(18 pi x)=+0.8090  cos(2 pi x)=+0.8090
x=0.2  cos(18 pi x)=+0.3090  cos(2 pi x)=+0.3090
x=0.3  cos(18 pi x)=-0.3090  cos(2 pi x)=-0.3090
x=0.4  cos(18 pi x)=-0.8090  cos(2 pi x)=-0.8090
x=0.5  cos(18 pi x)=-1.0000  cos(2 pi x)=-1.0000
```

每单位 9 个周期的信号，以每单位 10 次的速度采样，伪装成了每单位 1 个周期。高频并没有消失，而是被*重新贴上*了低频的标签——这比直接把它丢掉糟糕得多，因为错误的低频看起来像真实的结构。

::: widget plot
f: cos(2*pi*a*x); cos(2*pi*(a - 10)*x)
x: 0, 1
y: -1.3, 1.3
sliders: a=9:0:15:0.5
labels: \cos(2\pi a x); \cos(2\pi (a-10) x)
vlines: 0; 0.1; 0.2; 0.3; 0.4; 0.5; 0.6; 0.7; 0.8; 0.9; 1
caption: 两条正弦，其频率相差采样率 $f_s = 10$；竖线是采样位置 $x_k = k/10$。拖动 $a$：无论它取什么值，两条曲线都在每个采样点处相交，所以采样无法区分它们（[[#lem-alias]]）。$a = 9$ 时第二条曲线是慢速的混叠 $\cos(2\pi x)$；$a = 5 = f_s/2$ 时采样在 $+1, -1$ 之间交替，两条曲线除符号外频率相同。
:::

引理指出了哪些频率会被混淆；经典定理则说何时不发生混淆。

::: theorem 奈奎斯特-香农采样定理 {#thm-sampling}
设 $f$ 是平方可积函数，其傅里叶（Fourier）变换在 $[-B, B]$ 之外为零（即 $f$ 是**带限**的，带宽为 $B$）。若 $f_s > 2B$，则 $f$ 由其采样 $f(k/f_s)$（$k \in \Z$）唯一决定，且
$$
f(x) = \sum_{k=-\infty}^{\infty} f\!\left(\frac{k}{f_s}\right) \operatorname{sinc}\bigl(f_s x - k\bigr), \qquad \operatorname{sinc}(t) = \frac{\sin \pi t}{\pi t}.
$$ {#eq-sinc}
阈值 $2B$ 称为**奈奎斯特率**；对给定的采样率，$f_s/2$ 称为**奈奎斯特频率**。
:::

重建公式这里不作证明（它是泊松求和公式的一个推论：采样使谱以 $f_s$ 为周期延拓，当 $f_s > 2B$ 时各副本不重叠，于是乘一个宽 $f_s$ 的方框——在空间上与 sinc 卷积——就恢复出原函数）。对图形学要紧的是其逆否命题，[[#lem-alias]] 已经把它讲得很具体：*信号中高于 $f_s/2$ 的频率会伪装成低于 $f_s/2$ 的假频率重新出现*，而一旦这发生了，任何对采样的处理都无法挽回。

图形学里的场景几乎从不带限。多边形边是一条间断线，其傅里叶变换只按 $1/\nu$ 衰减；一直铺到地平线的棋盘格，在靠近地平线处含有任意高的频率。所以补救必须来自采样*之前*：我们用光滑化的 $f * g$ 代替 $f$——**预滤波器** $g$ 去掉或衰减奈奎斯特频率以上的频率——然后再采样。实践中，我们靠每像素取许多采样再求平均来逼近这个预滤波器。

::: definition 超采样与覆盖率 {#def-supersample}
**超采样**在像素面积内取 $f$ 于 $n$ 个点 $p_1, \dots, p_n$ 的采样，存下它们的加权平均 $\sum_i w_i f(p_i)$，其中 $\sum_i w_i = 1$。在像素正方形上取等权，近似的就是**方框滤波器** $\int_{\text{像素}} f(x,y)\,dx\,dy$。对一个以单一颜色画在背景之上的形状，方框滤波后的值是 $\alpha c + (1-\alpha)b$，其中 $\alpha$ 是**覆盖率**，即像素面积中被形状覆盖的比例。
:::

::: example 边缘像素的覆盖率 {#ex-coverage}
直线 $y = 0.3x + 0.2$ 横穿单位像素 $[0,1]^2$，形状是它下方的区域。算出精确的覆盖率，并用 $n \times n$ 规则采样估计它，$n = 1, 2, 4, \dots$。
::: solution
被覆盖的区域是一个梯形，两条平行边为 $0.2$（在 $x = 0$ 处）与 $0.5$（在 $x = 1$ 处），宽为 $1$，所以 $\alpha = \tfrac12(0.2 + 0.5) = 0.35$。一个程序：

```python
def inside(x, y):
    return y < 0.3 * x + 0.2

def coverage(n):                         # 像素内 n x n 的采样网格
    hits = sum(inside((i + 0.5) / n, (j + 0.5) / n)
               for i in range(n) for j in range(n))
    return hits / (n * n)

for n in [1, 2, 4, 8, 16, 64]:
    print(f"{n*n:5d} samples: coverage {coverage(n):.4f}")
print("exact area:", 0.2 + 0.3 / 2)
```

```console
$ python3 coverage.py
    1 samples: coverage 0.0000
    4 samples: coverage 0.5000
   16 samples: coverage 0.3750
   64 samples: coverage 0.3594
  256 samples: coverage 0.3516
 4096 samples: coverage 0.3501
exact area: 0.35
```

中心 $(0.5, 0.5)$ 处的单个采样完全错过了形状（$0.5 > 0.35$）：整个像素都是背景——锯齿正是这样来的。在网格上用 $n^2$ 个采样，误差不超过约 $1/n$（一行采样可能整体翻转），所以 $4\times4$ 超采样已经给出 $0.375$，与精确值相差仅几个百分点。
:::
:::

规则网格有一个弱点：与网格几乎对齐的边只产生 $n + 1$ 个不同的覆盖率值，而不是 $n^2 + 1$ 个。所以真正的渲染器使用旋转的或**分层的**（stratified，抖动的）采样图案，拿有结构的混叠换无结构的噪声——眼睛对后者的容忍度大得多。滤波在纹理上的应用——问题在那里最尖锐——留到 [[graphics/texture-mapping]] 再谈，渲染用的采样图案则留到 [[graphics/ray-tracing]]。

::: quiz
一架相机拍摄一道栅栏，栅栏的柱子每米重复 $70$ 次，沿栅栏方向以每米 $100$ 个采样的速度采样。在采样中栅栏柱子看起来是什么频率？
- [ ] 每米 $70$ 次
- [x] 每米 $30$ 次
- [ ] 每米 $50$ 次
- [ ] 每米 $170$ 次
::: solution
奈奎斯特频率是每米 $50$ 次，而 $70 > 50$，所以柱子会混叠。由 [[#lem-alias]] 取 $m = -1$，频率 $70$ 与每米 $|70 - 100| = 30$ 次无法区分。采样显示出的一道并不存在的、更粗的栅栏。
:::
:::

## 光与颜色

光是电磁辐射；可见光的波长 $\lambda$ 大致从 $380$ 到 $750$ nm。物理上，一个光源或被照表面由**光谱功率分布** $S(\lambda)$ 描述，即单位波长的功率。光谱是一个函数，是无穷维空间的元素，而色觉把它约化成了三个数。

人眼视网膜上有三种**视锥细胞**，按长、中、短波长称为 L、M、S，峰值灵敏度在 $560$、$530$、$420$ nm 附近。每种锥细胞只以一个数应答——光谱对其灵敏度曲线的积分——所以 $S$ 的颜色感觉是三元组

$$
\bigl(L, M, S\bigr) = \left( \int S(\lambda)\,\bar l(\lambda)\,d\lambda,\ \int S(\lambda)\,\bar m(\lambda)\,d\lambda,\ \int S(\lambda)\,\bar s(\lambda)\,d\lambda \right).
$$

这个从光谱到三元组的映射是**线性**的，而且有一个极大的核：许多物理上不同的光谱给出同一个三元组、看起来毫无二致。这样的光谱称为**同色异谱色**（metamers）。同色异谱正是颜色再现得以可能的原因——三原色显示器复现不了一颗柠檬的光谱，但能复现出它的某个同色异谱色——它也解释了为什么在商店灯光下匹配的两块布料到日光下就不同了：同色异谱依赖于光源。

### CIE XYZ

1931 年，国际照明委员会（CIE）标准化了三条**颜色匹配函数** $\bar x(\lambda), \bar y(\lambda), \bar z(\lambda)$，它们出自威廉·戴维·赖特（Wright）与约翰·吉尔德（Guild）的颜色匹配实验，实验中观察者用三种原色的混合去匹配光谱色。它们是锥细胞灵敏度的线性组合（后来的测量证实了这一点），选取时使三个函数都非负，且 $\bar y$ 等于人眼的**光谱光视效率**函数 $V(\lambda)$——它度量所感知的亮度。

::: definition CIE XYZ 与色度 {#def-xyz}
光谱 $S$ 的 **CIE 1931 三刺激值**为
$$
X = \int S(\lambda)\,\bar x(\lambda)\,d\lambda,\quad Y = \int S(\lambda)\,\bar y(\lambda)\,d\lambda,\quad Z = \int S(\lambda)\,\bar z(\lambda)\,d\lambda.
$$
$Y$ 是**亮度**（差一个常数因子）。**色度坐标**为 $x = X/(X+Y+Z)$ 与 $y = Y/(X+Y+Z)$；它们与颜色的明暗无关，而 $(x, y, Y)$ 由 $X = (x/y)Y$、$Z = ((1-x-y)/y)Y$ 决定 $(X, Y, Z)$。
:::

所有物理光谱的色度之集是马蹄形的**色度图**：纯光谱色构成它弯曲的边界；而因为 XYZ 关于光谱是线性的，混合光的色度落在各分量之间的线段上（两束光）或三角形内（三束光）——这一事实称为加色混合的**格拉斯曼（Grassmann）定律**。所以一台三原色显示器恰好只能显示其三原色色度三角形之内的颜色，即它的**色域**。马蹄形内没有任何三角形能覆盖整个马蹄形，所以没有三原色显示器能显示所有颜色。

### RGB 颜色空间

::: definition 线性 RGB 颜色空间 {#def-rgb-space}
一个 **RGB 颜色空间**由三个**原色** $R, G, B$ 与一个**白点** $W$ 的色度指定。它的**线性**坐标 $(r, g, b)$ 描述 XYZ 中的颜色 $r\,\mathbf{R} + g\,\mathbf{G} + b\,\mathbf{B}$，其中原色向量 $\mathbf{R}, \mathbf{G}, \mathbf{B}$ 经过缩放，使得 $(1, 1, 1)$ 是亮度 $Y = 1$ 的白点。从线性 RGB 到 XYZ 的映射是一个 $3\times3$ 矩阵 $M$，其列就是 $\mathbf{R}, \mathbf{G}, \mathbf{B}$。
:::

$M$ 存在且唯一，是纯粹的线性代数：各列由色度定到差缩放的程度，三个未知的缩放由三个方程 "$M(1,1,1)\T = W$" 定死（见[数学图谱：线性方程组](/learn/maths/lesson.php?c=linear-algebra&l=linear-systems)与[矩阵](/learn/maths/lesson.php?c=linear-algebra&l=matrices)）。

::: example 推导 sRGB 到 XYZ 的矩阵 {#ex-srgb-matrix}
sRGB 空间（与高清电视标准 ITU-R BT.709 共用）的原色为 $R = (0.64, 0.33)$、$G = (0.30, 0.60)$、$B = (0.15, 0.06)$，白点为 D65，$(0.3127, 0.3290)$。算出 $M$。
::: solution
用 [[#def-xyz]] 把每个原色按 $Y = 1$ 写出：例如 $\mathbf R_0 = (0.64/0.33,\ 1,\ 0.03/0.33) = (1.9394, 1, 0.0909)$。设 $P$ 是以 $\mathbf R_0, \mathbf G_0, \mathbf B_0$ 为列的矩阵，$\mathbf w = (0.3127/0.3290, 1, 0.3583/0.3290)$ 是 $Y = 1$ 的白点。我们需要缩放 $s = (s_r, s_g, s_b)$ 使得 $P s = \mathbf w$；于是 $M = P \operatorname{diag}(s)$。

```python
def xyz_of(x, y, Y=1.0):                      # 色度 (x, y) + 亮度 -> XYZ
    return [x / y * Y, Y, (1 - x - y) / y * Y]

def det3(m):
    return (m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
          - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
          + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]))

def solve3(m, b):                             # 克莱默法则
    d = det3(m)
    out = []
    for j in range(3):
        mj = [[b[i] if k == j else m[i][k] for k in range(3)] for i in range(3)]
        out.append(det3(mj) / d)
    return out

prims = [(0.64, 0.33), (0.30, 0.60), (0.15, 0.06)]   # sRGB / Rec. 709 的 R、G、B
white = xyz_of(0.3127, 0.3290)                       # Y = 1 的 D65
cols = [xyz_of(x, y) for x, y in prims]              # 每个原色取 Y = 1
P = [[cols[j][i] for j in range(3)] for i in range(3)]
s = solve3(P, white)                                 # 缩放使 R=G=B=1 给出白色
M = [[P[i][j] * s[j] for j in range(3)] for i in range(3)]
print("scales", [round(v, 4) for v in s])
for row in M:
    print(" ".join(f"{v:7.4f}" for v in row))
```

```console
$ python3 xyzmat.py
scales [0.2126, 0.7152, 0.0722]
 0.4124  0.3576  0.1805
 0.2126  0.7152  0.0722
 0.0193  0.1192  0.9505
```

这正是 sRGB 标准里公布的矩阵。它的中间一行给出线性 sRGB 颜色的亮度，
$$
Y = 0.2126\,r + 0.7152\,g + 0.0722\,b,
$$ {#eq-luminance}
而它恰等于缩放向量 $s$，因为 $P$ 的每一列在缩放前都有 $Y = 1$。绿色对亮度的贡献最大、蓝色最小，与 $V(\lambda)$ 的形状相符。
:::
:::

不同的 RGB 空间——sRGB、Display P3（到 2026 年许多手机和笔记本在用）、用于 HDR 视频的宽色域 ITU-R BT.2020、影视制作的 ACES 空间——原色与白点各不相同；在线性坐标下，两个空间之间转换就是 $M_2^{-1} M_1$（若白点不同还要加一个**色适应**变换）。三元组 $(1, 0, 0)$ 在每个空间意味着不同的颜色，这就是图像应当带有颜色配置文件的原因。

## 编码：sRGB 传递函数

人对亮度的感知大致是对数的，或更准确地说，接近指数约为 $1/3$ 的幂律（斯蒂文斯定律；CIE 明度 $L^*$ 在一个小阈值以上是 $116\,(Y/Y_n)^{1/3} - 16$）。我们在暗处分辨 $1\%$ 亮度之变，与在近白处分辨 $1\%$ 之变同样容易，所以相等的*比值*比相等的差值更要紧。用 $8$ 位存线性强度，会把大多数码字浪费在看着几乎一样的亮值上，而在暗部留下可见的条带。因此图像格式存储的是强度的非线性**编码**。

::: definition sRGB 传递函数 {#def-srgb}
对线性通道值 $c \in [0, 1]$，**sRGB 编码**为
$$
v = \operatorname{enc}(c) = \begin{cases} 12.92\,c, & c \le 0.0031308, \\ 1.055\,c^{1/2.4} - 0.055, & c > 0.0031308, \end{cases}
$$ {#eq-srgb-enc}
其逆——**解码**——为
$$
c = \operatorname{dec}(v) = \begin{cases} v / 12.92, & v \le 0.04045, \\ \left(\dfrac{v + 0.055}{1.055}\right)^{2.4}, & v > 0.04045. \end{cases}
$$ {#eq-srgb-dec}
$8$ 位文件存 $\operatorname{round}(255\,v)$。纯幂律编码 $v = c^{1/\gamma}$ 的**伽马**（gamma）就是 $\gamma$；sRGB 总体上接近 $\gamma = 2.2$，尽管其幂律段用的是 $2.4$。
:::

黑色附近的线性段避免了 $c^{1/2.4}$ 在 $0$ 处的无穷斜率——那会让最暗值里最微小的噪声炸开来。常数的选取使两段相接：$12.92 \cdot 0.0031308 = 0.040450$ 且 $1.055 \cdot 0.0031308^{1/2.4} - 0.055 = 0.040450$，到小数点后六位。（两段在接合点处的斜率 $12.92$ 与 $12.70$ 略有出入；标准靠取整定下常数，所以曲线连续却算不上光滑——见 [[#ex-srgb-join]]。）

::: widget plot
f: if(x <= 0.04045, x/12.92, ((x + 0.055)/1.055)^2.4); x^2.2; x
x: 0, 1
y: 0, 1
labels: \text{sRGB 解码 } \operatorname{dec}(v); v^{2.2}; \text{线性}
caption: 线性强度作为存储值 $v$（码字除以 $255$）的函数的图像。sRGB 曲线与纯幂 $v^{2.2}$ 处处接近；两者都远在对角线下方，所以码字 $128$（$v \approx 0.5$）只相当于最大强度的约 $21\%$。注意曲线在 $v = 0$ 附近上升得多么平缓：许多码字花在了眼睛最敏感的暗值上。
:::

```python
def srgb_encode(c):              # 线性 [0,1] -> 编码 [0,1]
    if c <= 0.0031308:
        return 12.92 * c
    return 1.055 * c ** (1 / 2.4) - 0.055

def srgb_decode(v):              # 编码 [0,1] -> 线性 [0,1]
    if v <= 0.04045:
        return v / 12.92
    return ((v + 0.055) / 1.055) ** 2.4

def to8(v):                      # 量化为 8 位码字
    return round(255 * v)

for c in [0.0, 0.001, 0.01, 0.18, 0.5, 1.0]:
    print(f"linear {c:5.3f} -> code {to8(srgb_encode(c)):3d}")
print("code 128 decodes to", round(srgb_decode(128 / 255), 4))
# 256 个码字中有多少个落在最暗 1% 的线性强度内？
print("linear 8-bit:", sum(1 for k in range(256) if k / 255 <= 0.01))
print("sRGB 8-bit:  ", sum(1 for k in range(256) if srgb_decode(k / 255) <= 0.01))
# 用错的方法和正确的方法平均黑与白
print("mean in sRGB codes:", (0 + 255) / 2,
      " correct:", to8(srgb_encode((srgb_decode(0) + srgb_decode(1)) / 2)))
```

```console
$ python3 srgb.py
linear 0.000 -> code   0
linear 0.001 -> code   3
linear 0.010 -> code  25
linear 0.180 -> code 118
linear 0.500 -> code 188
linear 1.000 -> code 255
code 128 decodes to 0.2159
linear 8-bit: 3
sRGB 8-bit:   26
mean in sRGB codes: 127.5  correct: 188
```

输出为这种编码说了话。线性 $8$ 位存储只有三个码字（$0$、$1$、$2$）覆盖最暗 $1\%$ 的强度，所以暗部会现出粗糙的条带；sRGB 在那里花了 $26$ 个码字。一张反射 $18\%$ 光的中灰卡——摄影师口中的"中间灰"——存成码字 $118$，位于取值范围的中部，也正是它*看起来*所在的位置。

::: theorem 幂律编码的相对步长 {#thm-relative-step}
设强度按 $v = c^{1/\gamma}$（$\gamma > 0$）编码，存为 $k = 255 v$。相邻码字 $k$ 与 $k + 1$ 之间强度的相对变化为
$$
\frac{c_{k+1} - c_k}{c_k} = \left(1 + \frac1k\right)^{\gamma} - 1 \approx \frac{\gamma}{k} \quad (k \gg \gamma),
$$
而线性存储（$\gamma = 1$）时它恰为 $1/k$。
:::

::: proof
$c_k = (k/255)^\gamma$，所以 $c_{k+1}/c_k = ((k+1)/k)^\gamma = (1 + 1/k)^\gamma$。减去 $1$。由二项展开，$(1 + 1/k)^\gamma = 1 + \gamma/k + O(1/k^2)$，即得近似式；$\gamma = 1$ 时表达式恰为 $1/k$。
:::

定理说明了编码买到了什么。相邻码字的强度差超过约 $1\%$ 时，就会出现可见的条带。线性存储下，对每个 $k < 100$ 都会如此——码字范围最暗的 $40\%$ 只覆盖到 $0.4$ 的强度，而这是多数图像很大一部分所在的范围。$\gamma = 2.2$ 时给定 $k$ 的相对步长更大，但码字的分布不同：强度 $c = 0.01$ 落在 $k = 25$ 而不是 $k = 2.55$；就强度而言，$c$ 处的步长是 $\gamma c^{-1/\gamma}/255$，在 $c = 0.01$ 处为 $7\%$，而线性编码是 $39\%$。编码把不可避免的误差在感知上均匀地摊开。

::: warning 切勿在编码值上做光照或混合运算
光在*强度*上线性相加，而不是在 sRGB 码字上。码字 $0$ 与 $255$ 取平均得 $127.5$，解码后强度为 $21\%$——远比真正的平均值 $50\%$（码字 $188$）暗。同样的误差会让反锯齿的边缘变暗、发虚，让图像缩小、alpha 混合以及每一处着色计算出错。正确的管线是：把输入（按 sRGB 拾取的纹理与颜色）**解码**成线性值，在线性浮点下**计算**，最后为显示一次性**编码**。GPU 会为标记为 sRGB 的纹理与帧缓冲区在硬件里做解码与编码；忘了标记、或者标了两次，是渲染器里最常见的缺陷之一。
:::

::: example 缩小细密棋盘 {#ex-downscale}
一面 $1$ 像素的棋盘由 sRGB 黑（码字 $0$）白（码字 $255$）像素构成，在两个方向上各缩小一半，于是每个输出像素平均一个 $2\times2$ 块（两黑两白）。输出应当是什么码字？对码字的朴素平均又给出什么？
::: solution
解码：黑在线性强度中是 $0$，白是 $1$。该块平均发出 $\tfrac14(0 + 0 + 1 + 1) = 0.5$，编码得 $v = \operatorname{enc}(0.5) = 0.7354$，码字 $188$。对码字的朴素平均是 $127.5$，显示为 $\operatorname{dec}(0.5) \approx 0.214$——不到一半的光。在校准正确的 sRGB 显示器前退远，直到细密棋盘模糊：它匹配的灰约为码字 $188$，不是 $128$。在编码空间做缩放的图像编辑器，缩小图像时会让明亮的细密细节（文字、树叶、星星）明显变暗。
:::
:::

### HDR 与色调映射

真实场景的亮度跨度极大：从星光下约 $10^{-3}$ cd/m² 到阳光下雪的 $10^5$ cd/m²，而典型显示器大约只有 $0.1$ 到几百 cd/m²。基于物理的渲染器计算线性的、**场景参考**的辐射亮度值，上不封顶，以浮点数存储。**色调映射**把它们压缩进显示范围——例如赖因哈特（Reinhard）的简单算子 $L_d = L/(1 + L)$，或影视业使用的胶片曲线——然后再作 sRGB 编码。HDR 显示器与格式，如采用 PQ 传递函数（标准化为 SMPTE ST 2084）的 BT.2100，把编码范围扩展到 $10\,000$ cd/m²；到 2026 年它们在电视与手机中已经很常见，而原理相同：在线性光下计算，映射到显示范围，最后编码。

## 不透明度与合成

许多图像是分层搭起来的：背景之上的人物，照片上反锯齿的文字，场景上的烟。带 **alpha 通道**的图像在每个颜色旁边存一个覆盖率或不透明度 $\alpha \in [0,1]$：该层覆盖像素的比例（[[#def-supersample]]）。

::: definition 预乘颜色与 over 算子 {#def-over}
**预乘**像素是一个对 $(C, \alpha)$，其中 $C = \alpha\,c$ 是已经乘过自身覆盖率的彩色 $c$。**over**（叠放）算子把像素 $A$ 放到像素 $B$ 前面：
$$
A \operatorname{over} B = \bigl(C_A + (1 - \alpha_A)\,C_B,\ \ \alpha_A + (1 - \alpha_A)\,\alpha_B\bigr).
$$ {#eq-over}
:::

理由是：像素的 $\alpha_A$ 一部分被 $A$ 覆盖；剩下的 $1 - \alpha_A$ 部分中，又有 $\alpha_B$ 的比例被 $B$ 覆盖（假设两层的覆盖互不相关）。公式的两个分量形状相同——这正是预乘的理由：若用直接（非预乘）颜色，颜色分量就得除以结果的 alpha。

::: theorem over 满足结合律 {#thm-over-assoc}
对预乘像素 $A, B, D$，$(A \operatorname{over} B) \operatorname{over} D = A \operatorname{over} (B \operatorname{over} D)$。
:::

::: proof
[[#eq-over]] 的两个分量形如 $x_A + (1 - \alpha_A)x_B$，所以只需对一个分量 $x$ 连同 alpha 分量证明。设 $A \operatorname{over} B$ 的 alpha 为 $\alpha_{AB} = \alpha_A + (1-\alpha_A)\alpha_B$，于是 $1 - \alpha_{AB} = (1-\alpha_A)(1-\alpha_B)$。左端为
$$
\bigl(x_A + (1-\alpha_A)x_B\bigr) + (1-\alpha_A)(1-\alpha_B)\,x_D .
$$
右端为 $x_A + (1-\alpha_A)\bigl(x_B + (1-\alpha_B)x_D\bigr)$，展开即同一表达式。取 $x = \alpha$ 得 alpha 分量，取 $x = C$ 得颜色。
:::

结合律让合成器以任意分组方式合并图层——例如把前景层摊平一次、反复复用——这也是预乘 alpha 成为合成软件与 GPU 标准内部表示的原因。over *不*满足交换律（[[#ex-over-commute]]）：次序要紧，所以实时渲染器里的透明物体必须排序后从后往前画（[[graphics/gpu-pipeline]]）。还有，与一切混合一样，颜色必须是线性的。

::: example 合成三个图层 {#ex-composite}
在线性预乘 RGBA 下，把 $A = (0.5, 0, 0;\ 0.5)$（$50\%$ 覆盖的红）叠到 $B = (0, 0, 0.25;\ 0.25)$（$25\%$ 的蓝）上、再叠到不透明灰背景 $D = (0.2, 0.2, 0.2;\ 1)$ 上，两种结合方式都算一遍。
::: solution
先算 $(A \operatorname{over} B)$：颜色 $(0.5, 0, 0) + 0.5\,(0, 0, 0.25) = (0.5, 0, 0.125)$，alpha $0.5 + 0.5 \cdot 0.25 = 0.625$。再叠 $D$：颜色 $(0.5, 0, 0.125) + 0.375\,(0.2, 0.2, 0.2) = (0.575, 0.075, 0.2)$，alpha $0.625 + 0.375 = 1$。

换一种结合：$B \operatorname{over} D$ 的颜色为 $(0, 0, 0.25) + 0.75\,(0.2, 0.2, 0.2) = (0.15, 0.15, 0.4)$，alpha 为 $1$；然后 $A$ 叠上去得 $(0.5, 0, 0) + 0.5\,(0.15, 0.15, 0.4) = (0.575, 0.075, 0.2)$，alpha $1$。结果一致，正如 [[#thm-over-assoc]] 所保证。由于最终 alpha 为 $1$，预乘颜色就等于颜色；为显示编码得码字 $(\operatorname{round}(255\operatorname{enc}(0.575)), \dots)$。
:::
:::

## 量化与抖动

当图像要缩减到更少的级数——从浮点渲染降到 $8$ 位，打印机降到 $1$ 位——逐像素独立舍入会造出**条带**（banding）：平滑渐变变成可见的台阶。**抖动**加入结构，让输出的*局部平均*逼近输入。经典方法是**误差扩散**，罗伯特·弗洛伊德（Floyd）与路易斯·斯坦伯格（Steinberg）1976 年发表：按光栅次序访问像素，逐个舍入，并把舍入误差按权重 $7/16$（右）、$3/16$（左下）、$5/16$（下）、$1/16$（右下）分给尚未访问的邻居。

::: algorithm Floyd-Steinberg 误差扩散 {#alg-floyd-steinberg}
输入：图像 $a[y][x] \in [0, 1]$。输出：$b[y][x] \in \set{0, 1}$。
1. 对 $y = 0, \dots, H - 1$，每行内 $x = 0, \dots, W - 1$：
   1. 若 $a[y][x] \ge \tfrac12$ 则 $b[y][x] \gets 1$，否则 $0$。
   2. $e \gets a[y][x] - b[y][x]$。
   3. 把 $\tfrac{7}{16}e$ 加到 $a[y][x+1]$，$\tfrac{3}{16}e$ 加到 $a[y+1][x-1]$，$\tfrac{5}{16}e$ 加到 $a[y+1][x]$，$\tfrac{1}{16}e$ 加到 $a[y+1][x+1]$（在这些像素存在处）。
:::

因为权重之和为 $1$，除了推出图像边界之外的误差，所有值的总和守恒，所以输出的均值跟踪输入的均值（[[#ex-dither]]）。抖动拿条带换细噪声，与分层采样是同一笔交易。在最终的 $8$ 位编码之前加一点点抖动噪声，就能消除渲染天空与雾中平滑渐变的条带，许多渲染器都会这么做。

::: history
第一幅数字扫描图像是 1957 年在美国标准局 SEAC 计算机上制作的、拉塞尔·克尔什（Kirsch）襁褓中儿子的 $176 \times 176$ 照片。采样理论可追溯到哈里·奈奎斯特（Nyquist）1928 年关于电报传输的论文与克劳德·香农（Shannon）的 "Communication in the presence of noise"（1949），更早的版本有 E. T. 惠塔克（Whittaker，1915）与弗拉基米尔·科捷利尼科夫（Kotelnikov，1933）的。弗兰克·克罗（Crow）的 "The aliasing problem in computer-generated shaded images"（*Communications of the ACM*，1977）把这套理论带进图形学，并提出了预滤波。颜色计量由 CIE 于 1931 年标准化，依据 W. D. 赖特（Wright，1928–29）与 J. 吉尔德（Guild，1931）的颜色匹配实验。弗洛伊德（Floyd）与斯坦伯格（Steinberg）1976 年发表了误差扩散；托马斯·波特（Porter）与汤姆·达夫（Duff）在 "Compositing digital images"（SIGGRAPH 1984）中定义了合成代数，包括 over 与预乘 alpha，其基础是 20 世纪 70 年代阿尔维·雷·史密斯（Alvy Ray Smith）与埃德温·卡特穆尔（Catmull）对 alpha 通道的发明。sRGB 空间由惠普与微软于 1996 年提出（迈克尔·斯托克斯（Stokes）、马修·安德森（Anderson）、斯里尼瓦桑·钱德拉塞卡尔（Chandrasekar）与里卡多·莫塔（Motta）），并于 1999 年标准化为 IEC 61966-2-1。阿尔维·雷·史密斯的备忘录 "A pixel is not a little square"（1995）为本章采用的点采样观点作了论证。
:::

## 后续内容

后面每一章都在采样点上计算线性光值。[[graphics/transformations]] 与 [[graphics/viewing-projection]] 决定场景的每个点落在图像的*哪里*；[[graphics/rasterisation]] 决定一个三角形覆盖*哪些*像素中心，并对边缘像素给出精确规则；[[graphics/shading]] 计算*多少*光到达眼睛，用的正是本章亮度 $Y$ 背后的光度学单位。预滤波在 [[graphics/texture-mapping]] 中以 mipmap 之名回归，分层采样则在 [[graphics/ray-tracing]] 的蒙特卡洛方法中回归。

::: summary
- 光栅图像是连续图像的**点采样**数组，采样位于像素中心 $(i + \tfrac12, j + \tfrac12)$；内存是宽 × 高 × 通道数 × 每通道字节数。
- 以速率 $f_s$ 采样会把频率 $\nu$ 与 $\nu + m f_s$ 混淆（[[#lem-alias]]）；只有奈奎斯特频率 $f_s/2$ 以下的内容被如实表示（[[#thm-sampling]]）。混叠必须在采样*之前*防住，靠预滤波或超采样。
- 色觉是三维的；三刺激值相等的光谱互为**同色异谱色**。CIE XYZ 是参考空间，$Y$ 是亮度。
- 线性 RGB 空间由原色与白点定死；它到 XYZ 的矩阵靠解一个 $3\times3$ 方程组算出（[[#ex-srgb-matrix]]），sRGB 的亮度是 $0.2126r + 0.7152g + 0.0722b$。
- 存储值经 sRGB 传递函数**编码**（约 $\gamma = 2.2$），把量化误差在感知上摊开；先解码再计算，为显示只编码一次。
- 预乘 alpha 让 **over** 成为一个简单、可结合但不可交换的算子。
- 误差扩散及其他抖动方法在保持局部平均的同时，拿条带换噪声。
:::

## 习题

::: exercise 帧缓冲区大小 {level=1 check="33177600"}
一个 $3840 \times 2160$、带四个 $8$ 位通道（RGBA）的帧缓冲区占多少字节？（输入字节数。）
::: solution
$3840 \cdot 2160 = 8\,294\,400$ 像素，每像素 $4$ 字节：$33\,177\,600$ 字节，约 $31.6$ MiB。双缓冲使其翻倍，一个 $32$ 位深度缓冲（[[graphics/rasterisation]]）再加 $33\,177\,600$ 字节。
:::
:::

::: exercise 线性一半的编码 {level=1 check="188"}
哪个 $8$ 位 sRGB 码字表示最大线性强度的一半？（输入码字。）
::: solution
$c = 0.5 > 0.0031308$，所以 $v = 1.055 \cdot 0.5^{1/2.4} - 0.055$。而 $0.5^{1/2.4} = e^{-0.6931/2.4} = e^{-0.2888} = 0.7492$，于是 $v = 1.055 \cdot 0.7492 - 0.055 = 0.7354$，$255 v = 187.5$，舍入得 $188$（正文中的程序打印同样的值）。码字 $188$、而不是 $128$，物理上才是"亮度一半"。
:::
:::

::: exercise 一个混叠频率 {level=1 check="3"}
信号 $\cos(2\pi \cdot 7x)$ 以 $f_s = 10$（每单位采样）采样。$[0, 5]$ 中哪个频率产生同样的采样？（输入频率。）
::: solution
由 [[#lem-alias]] 取 $m = -1$，频率 $7$ 与 $7 - 10 = -3$ 产生同样的采样，而 $\cos(2\pi(-3)x) = \cos(2\pi\cdot 3x)$。答案是 $3$，它低于奈奎斯特频率 $5$。
:::
:::

::: exercise 编码颜色的亮度 {level=2}
一个 sRGB 颜色的 $8$ 位码字为 $(255, 128, 0)$。算出它的亮度 $Y$（白为 $Y = 1$）。再算把 [[#eq-luminance]] 误用于编码值 $v = \text{码字}/255$ 会得到的"亮度"，并加以比较。
::: solution
解码：$\operatorname{dec}(1) = 1$，$\operatorname{dec}(128/255) = 0.2159$（由程序），$\operatorname{dec}(0) = 0$。于是 $Y = 0.2126 \cdot 1 + 0.7152 \cdot 0.2159 + 0.0722 \cdot 0 = 0.2126 + 0.1544 = 0.3670$。错误的计算给出 $0.2126 + 0.7152 \cdot 0.5020 = 0.5716$，把亮度高估了一半以上。亮度权重同一切线性颜色算术一样，只适用于线性值。
:::
:::

::: exercise over 不可交换 {level=2 #ex-over-commute}
找出预乘像素 $A$ 与 $B$，使 $A \operatorname{over} B \ne B \operatorname{over} A$，并证明 over 的 alpha 分量*是*可交换的。
::: solution
取不透明红 $A = (1, 0, 0;\ 1)$ 与不透明蓝 $B = (0, 0, 1;\ 1)$。则 $A \operatorname{over} B = (1, 0, 0) + 0 \cdot B = $ 红，而 $B \operatorname{over} A$ = 蓝。alpha 分量：$\alpha_A + (1-\alpha_A)\alpha_B = \alpha_A + \alpha_B - \alpha_A\alpha_B$，对 $A$ 与 $B$ 对称：总覆盖率不依赖次序，可见的颜色却依赖。等价地，$1 - \alpha_{AB} = (1-\alpha_A)(1-\alpha_B)$，即两者都没盖住的比例。
:::
:::

::: exercise sRGB 曲线的接合点 {level=2 #ex-srgb-join}
(a) 验证 [[#eq-srgb-enc]] 的两段在 $c_0 = 0.0031308$ 处到小数点后六位一致。(b) 算出 $c_0$ 处的两个单侧导数。(c) 设要让曲线 $v = a c^{1/\gamma} - (a - 1)$（$a = 1.055$，$\gamma = 2.4$）与直线 $v = s c$ 在某 $c_0$ 处以相等值*且*相等斜率相接。求 $c_0$ 与 $s$。
::: solution
(a) $12.92 \cdot 0.0031308 = 0.0404499$；$0.0031308^{1/2.4} = e^{\ln(0.0031308)/2.4} = e^{-5.76647/2.4} = e^{-2.40269} = 0.090474$，所以 $1.055 \cdot 0.090474 - 0.055 = 0.0404500$。两者一致。

(b) 左侧导数是 $12.92$。右侧导数是 $\tfrac{1.055}{2.4} c_0^{1/2.4 - 1} = 0.43958 \cdot 0.090474 / 0.0031308 = 12.70$。曲线在此有一个小折角。

(c) 斜率相等：$s = \tfrac{a}{\gamma} c_0^{1/\gamma - 1}$，即 $s c_0 = \tfrac{a}{\gamma}c_0^{1/\gamma}$。值相等：$s c_0 = a c_0^{1/\gamma} - (a-1)$。两式相减，$a c_0^{1/\gamma}(1 - 1/\gamma) = a - 1$，所以
$$
c_0 = \left(\frac{a - 1}{a(1 - 1/\gamma)}\right)^{\gamma} = \left(\frac{0.055 \cdot 2.4}{1.055 \cdot 1.4}\right)^{2.4} = (0.089370)^{2.4} = 0.0030399,
$$
于是 $s = \tfrac{a}{\gamma}c_0^{1/\gamma - 1} = 12.92$（保留两位小数，$12.9232$）。标准保留了 $12.92$，却采用阈值 $0.0031308$（直线与曲线相交处，$0.04045$ 在编码域是个更整的数），所以函数值吻合、斜率只是近似吻合。
:::
:::

::: exercise 暗码字之间的台阶 {level=2}
纯幂律编码、$\gamma = 2.2$、$8$ 位时，码字 $50$ 与 $51$ 之间的相对强度步长是多少？线性 $8$ 位存储在哪个码字以下步长超过 $2\%$？
::: solution
由 [[#thm-relative-step]]，$(51/50)^{2.2} - 1 = e^{2.2 \ln 1.02} - 1 = e^{0.043566} - 1 = 0.0445$，步长约 $4.5\%$（近似 $\gamma/k = 4.4\%$，很接近）。线性存储下码字 $k$ 处的步长是 $1/k$，$k < 50$ 时超过 $2\%$；这些码字覆盖到最大强度 $50/255 = 19.6\%$ 的范围，而典型图像的大部分暗部都在其中。伽马存储下，强度 $19.6\%$ 对应码字 $255 \cdot 0.196^{1/2.2} = 122$，该处步长为 $2.2/122 = 1.8\%$。
:::
:::

::: exercise 由原色求亮度权重 {level=3}
证明：对任何线性 RGB 空间（[[#def-rgb-space]]），$(r, g, b)$ 的亮度为 $Y = s_r r + s_g g + s_b b$，其中 $(s_r, s_g, s_b)$ 是 [[#ex-srgb-matrix]] 中满足 $P s = \mathbf w$ 的缩放因子，并且 $s_r + s_g + s_b = 1$。
::: solution
$P$ 的各列是按 $Y = 1$ 写出的原色，所以 $P$ 的中间一行是 $(1, 1, 1)$。于是 $M = P \operatorname{diag}(s)$ 的中间一行是 $(s_r, s_g, s_b)$，从而 $Y = (M(r,g,b)\T)_2 = s_r r + s_g g + s_b b$。$P s = \mathbf w$ 的中间分量即 $s_r + s_g + s_b = w_Y = 1$，因为白点已归一化到 $Y = 1$。对 sRGB，$0.2126 + 0.7152 + 0.0722 = 1$。（老式电视公式 $0.299, 0.587, 0.114$ 出自同一计算，用的是 1953 年 NTSC 的原色与光源 C，用在 sRGB 上是错的。）
:::
:::

::: exercise 误差扩散保持均值 {level=3 #ex-dither}
用 Python 实现 [[#alg-floyd-steinberg]]，作用于一幅 $16 \times 8$、恒为 $0.25$ 的灰图像，以 `#` 表示 $1$、`.` 表示 $0$ 打印结果，并报告白像素的比例。然后解释为什么输出的总和与输入的总和之差，至多是推出边界之外的那部分误差。
::: solution
```python
def floyd_steinberg(img):                     # img: [0,1] 内的浮点行；返回 0/1
    h, w = len(img), len(img[0])
    a = [row[:] for row in img]
    out = [[0] * w for _ in range(h)]
    for y in range(h):
        for x in range(w):
            old = a[y][x]
            new = 1 if old >= 0.5 else 0
            out[y][x] = new
            err = old - new                   # 把误差推给未访问的邻居
            for dx, dy, wgt in [(1, 0, 7), (-1, 1, 3), (0, 1, 5), (1, 1, 1)]:
                if 0 <= x + dx < w and y + dy < h:
                    a[y + dy][x + dx] += err * wgt / 16
    return out

img = [[0.25] * 16 for _ in range(8)]
out = floyd_steinberg(img)
for row in out:
    print("".join("#" if v else "." for v in row))
print("fraction of white pixels:", sum(map(sum, out)) / (16 * 8))
```

```console
$ python3 fs.py
................
.#.#.#.#.#.#.#.#
................
.#.#.#.#.#.#.#.#
................
.#.#.#.#.#.#.#.#
................
.#.#.#.#.#.#.#.#
fraction of white pixels: 0.25
```

恰好四分之一的像素是白的。不变式：设 $\Sigma$ 为已输出的 $b$ 值之和，加上未访问像素当前（被修改的）$a$ 值之和。访问一个像素把 $a[y][x]$ 换成 $b[y][x]$，并把 $e = a[y][x] - b[y][x]$ 按和为 $1$ 的权重加到未访问像素上，所以 $\Sigma$ 不变——只是指向图像之外的权重被丢弃，每个边界像素至多损失 $\abs{e} \le \tfrac12$。结束时已没有未访问像素，$\Sigma$ 就是输出总和，故 $\abs{\sum b - \sum a_{\text{输入}}} \le \tfrac12 \cdot (\text{边界像素数})$；图像变大时，输出的均值趋于输入的均值。
:::
:::
