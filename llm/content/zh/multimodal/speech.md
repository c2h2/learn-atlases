语音是人类最古老的界面，也是最难交给语言模型的一个。一秒电话音质录音是 $8000$ 个数；按多数语音识别器采用的 $16$ kHz 采样则是 $16{,}000$ 个，而一个十秒的问题有 $160{,}000$ 个采样，其中也许只装着二十五个词。信号里并没有标出词的边界：词与词之间没有空格，同一个词有人说 $0.1$ 秒、有人说半秒，每个音素的读音又随相邻音素、说话人的嗓音、房间和麦克风而变。**自动语音识别**（automatic speech recognition，ASR）把这个信号映射成文本；**语音合成**（text-to-speech，TTS）则反其道而行。

本章带着信号从采样走到词，再走回来。先讲几乎每个语音模型都拿来作输入的那种表示：**对数 mel 频谱图**，在一个合成音上一步步算出来。接着处理识别的核心难点——音频帧与输出符号之间未知的**对齐**——用**连接主义时间分类**（connectionist temporal classification，CTC；Graves 等人, 2006）：它的损失对所有对齐求和，用一个动态规划来算，我们还把它实现出来并用暴力枚举检验。编码器-解码器识别器避开了显式的对齐；例子是 **Whisper**（Radford 等人, 2023），在 $680{,}000$ 小时有转写的网络音频上训练。识别器用**词错误率**评分——一种编辑距离。本章以 TTS 流水线收尾——从 Tacotron 2 与神经声码器，到把语音生成为离散词元序列的**神经编解码器语言模型**（如 VALL-E）——由此接入 [[multimodal/audio-language-models]]。

## 从采样点到频谱图 {#sec-features}

::: definition 采样音频 {#def-sampling}
麦克风信号 $x(\tau)$ 以**采样率** $f_s$（每秒采样数）录成采样 $x[n] = x(n/f_s)$，每个采样量化到固定位数（常用 $16$ 位）。频率为 $f$ 的正弦只有在 $f < f_s/2$ 时才能被无歧义地表示；$f_s/2$ 称为**奈奎斯特（Nyquist）频率**；更高的频率会**混叠**到较低的频率上，因此录音设备在采样之前先用滤波器把它们滤掉。
:::

语音识别通常工作在 $f_s = 16$ kHz，保留 $8$ kHz 以下的频率——足以容纳区分语音所需的信息，而这些信息大部分位于 $4$ kHz 以下。音乐与高质量 TTS 用 $22.05$、$24$、$44.1$ 或 $48$ kHz。

原始采样并不是好的学习输入：区分一个元音与另一个元音的是能量在频率上的分布（**共振峰**，即声道的共振），而这种分布每几十个毫秒就在变。**短时傅里叶变换**在短的、相互重叠的帧上测量它。傅里叶级数与傅里叶变换本身在物理图谱（Physics Atlas）中展开（[傅里叶级数](/learn/physics/lesson.php?c=math-methods&l=fourier)）；这里只需要离散版本。

::: definition 短时傅里叶变换与频谱图 {#def-stft}
选定**窗长** $N_w$（典型 $25$ ms，$16$ kHz 下 $400$ 个采样）、**帧移** $h$（典型 $10$ ms，$160$ 个采样）、窗函数 $w[n]$ 与 FFT 长度 $N\ge N_w$。第 $m$ 帧由 $x[mh], \dots, x[mh + N_w - 1]$ 组成，乘以 $w$ 并补零到长度 $N$。它的离散傅里叶变换是

$$
X_m[k] = \sum_{n=0}^{N-1}w[n]\,x[mh + n]\,e^{-2\pi ikn/N}, \qquad k = 0, \dots, N/2,
$$ {#eq-stft}

其中频点 $k$ 对应频率 $kf_s/N$。**功率频谱图**是 $\lvert X_m[k]\rvert^2$，一个每帧一列的矩阵。**Hann 窗**为 $w[n] = \tfrac12 - \tfrac12\cos(2\pi n/N_w)$。
:::

窗很重要。矩形窗（不加锥形）在帧的边界处把信号齐地截断，它的频谱把一个纯音的能量摊进衰减缓慢的旁瓣——**频谱泄漏**——可能盖住其他频率上较弱的成分。加锥的窗用更宽的主峰换低得多的旁瓣。

::: widget plot
f: 20*log(abs(((1-a)*sin(pi*x)/(pi*x) + (a/2)*(sin(pi*(x-1))/(pi*(x-1)) + sin(pi*(x+1))/(pi*(x+1))))/(1-a)))/log(10)
x: -10.03, 10
y: -100, 5
sliders: a=0.5:0:0.5:0.01
labels: window response (dB) against frequency offset in bins
caption: 升余弦窗 $w = (1 - a) - a\cos(\cdot)$ 的频谱（分贝），随到纯音频率的距离变化，距离以 DFT 频点计（长窗近似）。$a = 0$（矩形窗）时主瓣最窄，但第一旁瓣只低 $13$ dB 且旁瓣衰减很慢；$a = 0.5$（Hann 窗）时主瓣宽一倍，但旁瓣低 $31$ dB 且迅速下降；$a \approx 0.46$（Hamming 窗）附近第一旁瓣最低，约低 $43$ dB。语音前端使用 Hann 窗或 Hamming 窗。
:::

::: proposition 加窗纯音的峰值 {#prop-tone-peak}
设 $x[n] = A\sin(2\pi f_0n/f_s)$，且 $f_0 = k_0f_s/N$ 恰好落在频点 $k_0$ 上，$0 < k_0 < N/2$。则

$$
X[k_0] = \frac{A}{2i}\sum_nw[n] + \varepsilon,
$$

其中 $\varepsilon = -\frac{A}{2i}\sum_nw[n]e^{-4\pi ik_0n/N}$ 是窗的频谱在 $2k_0$ 个频点之外的取值。对光滑的窗、且 $k_0$ 离 $0$ 与 $N/2$ 都足够远时，$\varepsilon$ 可忽略，于是 $\lvert X[k_0]\rvert\approx\frac A2\sum_nw[n]$，功率为 $\frac{A^2}{4}\big(\sum_nw[n]\big)^2$。
:::

::: proof
把 $\sin\theta = (e^{i\theta} - e^{-i\theta})/(2i)$ 代入 $\theta = 2\pi k_0n/N$。则 $X[k_0] = \frac{A}{2i}\sum_nw[n]\big(e^{2\pi ik_0n/N} - e^{-2\pi ik_0n/N}\big)e^{-2\pi ik_0n/N} = \frac{A}{2i}\sum_nw[n] - \frac{A}{2i}\sum_nw[n]e^{-4\pi ik_0n/N}$。第一个和是窗的频谱在偏移 $0$ 处的值；第二个是它在 $2k_0$ 个频点偏移处的值——当旁瓣衰减很快、而 $2k_0$ 又在许多频点之外时，它很小。
:::

人的听觉并不均匀地分辨频率：$100$ Hz 与 $200$ Hz 我们很容易分辨，$8100$ Hz 与 $8200$ Hz 则几乎分辨不出。语音特征据此压缩频率轴。

::: definition mel 尺度与对数 mel 特征 {#def-mel}
**mel 尺度**把以赫兹计的频率 $f$ 映为

$$
m(f) = 2595\,\log_{10}\!\Big(1 + \frac{f}{700}\Big),
$$ {#eq-mel}

大约 $1$ kHz 以下近似线性、以上按对数（一个常用变体；其他变体的常数不同）。$M$ 个频带的 **mel 滤波器组**在 $0$ 与 $f_s/2$ 之间按 mel 等距放置 $M + 2$ 个边界；频带 $j$ 是对功率频谱的三角加权：从边界 $j - 1$ 上升、在边界 $j$ 处成峰、到边界 $j + 1$ 处落下。**对数 mel 频谱图**是各频带能量的对数，每帧一个 $M$ 维向量。
:::

::: widget plot
f: 2595*log(1 + x/700)/log(10); x
x: 0, 8000
y: 0, 8000
labels: mel $m(f)$; identity
caption: mel 尺度 [[#eq-mel]] 随频率（赫兹）的变化。$1$ kHz 以下它几乎贴着恒等线（这是设计好的，$m(1000)\approx1000$）；之上，mel 的等距跨过越来越宽的赫兹范围，因此按 mel 等距布置频带的滤波器组在低频带窄、高频带宽。从 $0$ 到 $8$ kHz，整个尺度跨 $2840$ mel。
:::

下面这段代码用纯 Python 为一个合成信号计算一帧对数 mel：振幅 $1$ 的 $1000$ Hz 音、振幅 $0.3$ 的 $3000$ Hz 音、再加一点噪声，mel 频带 $40$ 个。

```python
import math, random
random.seed(3)
sr, n_fft, hop, n_mels = 16000, 512, 160, 40      # 16 kHz，25 ms 窗补零到 512
win = 400

# 合成信号的 0.1 s：1000 Hz 音 + 较弱的 3000 Hz 音 + 一点噪声
x = [math.sin(2 * math.pi * 1000 * n / sr) + 0.3 * math.sin(2 * math.pi * 3000 * n / sr)
     + 0.01 * random.gauss(0, 1) for n in range(1600)]

hann = [0.5 - 0.5 * math.cos(2 * math.pi * n / win) for n in range(win)]
def power_spectrum(frame):                          # 频点 0 .. n_fft/2 的 |DFT|^2
    buf = [frame[n] * hann[n] for n in range(win)] + [0.0] * (n_fft - win)
    out = []
    for k in range(n_fft // 2 + 1):
        re = sum(buf[n] * math.cos(2 * math.pi * k * n / n_fft) for n in range(n_fft))
        im = -sum(buf[n] * math.sin(2 * math.pi * k * n / n_fft) for n in range(n_fft))
        out.append(re * re + im * im)
    return out

mel = lambda f: 2595 * math.log10(1 + f / 700)
imel = lambda m: 700 * (10 ** (m / 2595) - 1)
edges = [imel(mel(sr / 2) * i / (n_mels + 1)) for i in range(n_mels + 2)]   # Hz
bin_hz = sr / n_fft
def filterbank(ps):                                 # mel 尺度上的三角滤波器
    out = []
    for m in range(1, n_mels + 1):
        lo, c, hi = edges[m - 1], edges[m], edges[m + 1]
        e = 0.0
        for k, p in enumerate(ps):
            f = k * bin_hz
            w = (f - lo) / (c - lo) if lo <= f <= c else (hi - f) / (hi - c) if c < f <= hi else 0.0
            e += w * p
        out.append(e)
    return out

n_frames = 1 + (len(x) - win) // hop
print("frames in 0.1 s:", n_frames, " bin spacing %.2f Hz" % bin_hz)
ps = power_spectrum(x[0:win])
peaks = [k for k in range(1, len(ps) - 1) if ps[k] > ps[k - 1] and ps[k] >= ps[k + 1] and ps[k] > 100]
print("spectral peaks (bin, Hz, power):", [(k, round(k * bin_hz), round(ps[k])) for k in peaks])
logmel = [math.log10(max(e, 1e-10)) for e in filterbank(ps)]
best = [m for m in range(1, n_mels - 1) if logmel[m] > logmel[m - 1] and logmel[m] >= logmel[m + 1] and logmel[m] > 2]
for m in best:
    print(f"mel band {m:2d}: centre {edges[m + 1]:6.0f} Hz  log10 energy {logmel[m]:.2f}")
print("first band edges (Hz):", [round(e) for e in edges[:4]], " last:", [round(e) for e in edges[-3:]])
```

```text
frames in 0.1 s: 8  bin spacing 31.25 Hz
spectral peaks (bin, Hz, power): [(32, 1000, 10007), (96, 3000, 887)]
mel band 13: centre    955 Hz  log10 energy 4.04
mel band 26: centre   2980 Hz  log10 energy 3.18
first band edges (Hz): [0, 44, 92, 142]  last: [6994, 7481, 8000]
```

::: example 读对数 mel 代码的输出 {#ex-logmel}
把代码打印的峰功率与 [[#prop-tone-peak]] 对照检验，并解释那些频带边界。
::: solution
长度 $400$ 的 Hann 窗之和为 $200$。对 $1000$ Hz 的音（$A = 1$，恰在频点 $1000/31.25 = 32$ 上），预测功率是 $\frac14\cdot200^2 = 10{,}000$；代码给出 $10{,}007$，差别来自噪声和那个小小的泄漏项。对 $3000$ Hz 的音（$A = 0.3$，频点 $96$），预测是 $0.09\cdot10{,}000 = 900$，代码给出 $887$。滤波器组之后，最强的频带中心在 $955$ Hz 与 $2980$ Hz，其对数能量相差 $4.04 - 3.18 = 0.86$，小于两音功率比对应的 $\log_{10}(1/0.09) = 1.05$：$1000$ Hz 的音落在两个窄频带（$955$ 与 $1060$ Hz）的中心之间，被两者平分；而 $3000$ Hz 的音几乎正落在一个宽频带的中心，几乎被完整收到。最前面的频带宽约 $44$–$50$ Hz，最后几个约 $500$ Hz 宽：即 $2840/41 = 69$ mel 的等距。
:::
:::

对数 mel 特征正是 Whisper、多数 CTC 与 Transducer 识别器、以及 TTS 系统的声学模型所用的输入（wav2vec 2.0 这类自监督模型则改用卷积编码器从原始采样直接学习自己的特征）。取对数压缩了音频功率的巨大动态范围，并把音量的变化变成加性的平移。Whisper 把它的对数 mel 值归一化到约 $[-1, 1]$ 的范围。

::: example Whisper 的输入 {#ex-whisper-input}
Whisper 把音频补零或截断成 $16$ kHz 的 $30$ 秒片段，用 $25$ ms 窗、$10$ ms 帧移计算 $80$ 个频带的对数 mel 特征，并在进入 Transformer 编码器之前施加两层卷积，第二层步幅为 $2$。求采样数、特征矩阵的形状和编码器的序列长度。
::: solution
$30\cdot16{,}000 = 480{,}000$ 个采样。$10$ ms 帧移得 $30/0.01 = 3000$ 帧，所以特征是 $80\times3000$（large-v3 模型用 $128$ 个频带，是 $128\times3000$）。步幅 $2$ 的卷积把时间轴减半：编码器看到 $1500$ 个位置，每 $20$ ms 一个。每个编码器位置覆盖的音频大约相当于五分之一个音节，一个 $30$ 秒的窗变成一段与一页文字长度相当的序列。
:::
:::

## 连接主义时间分类 {#sec-ctc}

每 $20$ ms 帧输出一个符号的识别器必须面对未知的**对齐**：转写 "cat" 有三个字母，却可能对应大约二十个帧，而且没有人标出哪些帧属于哪个字母。神经网络之前，识别器用隐马尔可夫模型，其状态序列正是这种对齐，用前向-后向算法训练。CTC 把同样的思想带进神经网络，只用了一个技巧：多一个**空白符**。

::: definition CTC {#def-ctc}
设输出字母表为 $\mathcal{V}\cup\{\varnothing\}$，其中 $\varnothing$ 是**空白符**。网络对 $T$ 个帧中的每一帧输出这个字母表上的一个分布 $p_t(\cdot\mid\mathbf{x})$。**对齐**（或路径）是一列符号 $\pi = (\pi_1, \dots, \pi_T)$，其概率为 $\prod_tp_t(\pi_t\mid\mathbf{x})$——不同帧的输出在给定输入时被视为条件独立。**折叠**映射 $\mathcal{B}$ 先合并重复符号的连续段，再去掉空白：$\mathcal{B}(\texttt{cc}\varnothing\texttt{aa}\varnothing\varnothing\texttt{t}) = \texttt{cat}$ 且 $\mathcal{B}(\texttt{a}\varnothing\texttt{a}) = \texttt{aa}$，而 $\mathcal{B}(\texttt{aa}) = \texttt{a}$。标签序列 $\mathbf{y}$ 的概率与 **CTC 损失**为

$$
P(\mathbf{y}\mid\mathbf{x}) = \sum_{\pi\in\mathcal{B}^{-1}(\mathbf{y})}\ \prod_{t=1}^{T}p_t(\pi_t\mid\mathbf{x}),\qquad \mathcal{L}_{\text{CTC}} = -\log P(\mathbf{y}\mid\mathbf{x}).
$$ {#eq-ctc}
:::

空白符身兼两职：它让网络能在字母之间的帧里输出“没有新东西”；它又分开真正的重复——没有它，"aa" 与 "a" 会折叠成同一个东西。[[#eq-ctc]] 中的求和把转写在帧上的所有铺法都做了边际化，所以训练只需要音频和文本。

::: example 手算一个两帧的 CTC 损失 {#ex-ctc-hand}
字母表为 $\{\varnothing, \texttt{a}\}$、$T = 2$ 帧，网络对 $(\varnothing, \texttt{a})$ 给出 $p_1 = (0.4, 0.6)$ 与 $p_2 = (0.7, 0.3)$。计算 $P(\texttt{a}\mid\mathbf{x})$ 与损失。
::: solution
折叠成 "a" 的路径是 $\texttt{aa}$、$\texttt{a}\varnothing$ 与 $\varnothing\texttt{a}$，概率分别为 $0.6\cdot0.3 = 0.18$、$0.6\cdot0.7 = 0.42$ 与 $0.4\cdot0.3 = 0.12$。于是 $P(\texttt{a}\mid\mathbf{x}) = 0.72$，$\mathcal{L} = -\ln0.72 = 0.329$。剩下的概率 $0.28$ 属于 $\varnothing\varnothing$，即空转写。没有路径折叠成 "aa"：两个 a 之间需要一个空白，因此至少要三帧。
:::
:::

路径数随 $T$ 指数增长（对含 $U$ 个依次互不相同标签的转写，它是 $\binom{T + U}{2U}$，一道习题会证明），所以这个和必须用动态规划来算。把空白穿插进目标：$\mathbf{y}' = (\varnothing, y_1, \varnothing, y_2, \dots, y_U, \varnothing)$，长度 $S = 2U + 1$。一条折叠成 $\mathbf{y}$ 的路径沿 $\mathbf{y}'$ 从左向右行进：每一帧停在当前位置、前进一格，或者——当下一个标签与当前标签不同时——跳过两个标签之间的空白。

::: theorem CTC 前向递归 {#thm-ctc-forward}
把 $\alpha_t(s)$ 定义为：与 $\mathbf{y}'_{1:s}$ 相容、且终止于位置 $s$ 的一切长度 $t$ 的路径前缀 $\pi_{1:t}$ 的总概率（即 $\pi_t = y'_s$ 且 $\mathcal{B}(\pi_{1:t}) = \mathcal{B}(\mathbf{y}'_{1:s})$）。则

$$
\alpha_1(1) = p_1(\varnothing),\quad \alpha_1(2) = p_1(y_1),\quad \alpha_1(s) = 0\ \ (s > 2),
$$

$$
\alpha_t(s) = \Big(\alpha_{t-1}(s) + \alpha_{t-1}(s-1) + \mathbb{1}\big[y'_s\neq\varnothing,\ y'_s\neq y'_{s-2}\big]\,\alpha_{t-1}(s-2)\Big)\,p_t(y'_s),
$$ {#eq-ctc-forward}

其中 $\alpha_{t-1}(0) = \alpha_{t-1}(-1) = 0$，且

$$
P(\mathbf{y}\mid\mathbf{x}) = \alpha_T(S) + \alpha_T(S - 1).
$$

代价是 $O(TU)$ 次运算，而不是对指数多条路径求和。
:::

::: proof
折叠成 $\mathbf{y}$ 的路径对应一条沿 $\mathbf{y}'$ 单调行走的路线：每一帧占一个位置；行走从位置 $1$ 或 $2$ 开始（开头的空白可选），且必须终止于 $S$ 或 $S - 1$（结尾的空白可选）。从时刻 $t - 1$ 的位置 $s$ 出发，行走只能 (i) 停在 $s$——一个重复符号，由 $\mathcal{B}$ 合并；(ii) 前进到 $s + 1$；或 (iii) 前进到 $s + 2$，跳过一个空白——只有当被跳过的是两个*不同*标签之间的空白时才允许，因为在相同标签之间跳过会把它们并成一个。没有别的走法能保持折叠输出是 $\mathbf{y}$ 的前缀：倒退或跳过标签都会改变输出。于是在时刻 $t$ 终止于 $s$ 的每个前缀，都来自时刻 $t - 1$ 的 $s$、$s - 1$ 或（允许时）$s - 2$，这三类前缀两两不交，再乘以时刻 $t$ 的符号的概率 $p_t(y'_s)$，对 $t$ 归纳即得 [[#eq-ctc-forward]]。不同的行走给出不同的路径，反之亦然，所以对两个允许的终止位置求和，恰好把 $\mathcal{B}^{-1}(\mathbf{y})$ 中的每条路径各数一次。每一步对 $S = 2U + 1$ 个格子做常数功。
:::

对称的后向递归给出 $\beta_t(s)$，而 $\alpha_t(s)\beta_t(s)/p_t(y'_s)$ 是一条有效路径在时刻 $t$ 经过位置 $s$ 的概率——即后验的“软对齐”，损失对网络输出的梯度由它而来，与隐马尔可夫模型的前向-后向算法完全一样。实践中递归在对数域进行以避免下溢，梯度由自动微分计算。下面这段代码实现前向递归，用全部 $3^5 = 243$ 条路径的暴力枚举检验它，并计算词错误率（供 [[#sec-wer]] 使用）。

```python
import math, random, itertools
random.seed(4)
V, T = 3, 5                                  # 符号：0 = 空白，1 = 'a'，2 = 'b'
def softmax(z):
    m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e); return [v / s for v in e]
probs = [softmax([random.gauss(0, 1.5) for _ in range(V)]) for _ in range(T)]   # T x V

def collapse(path):                          # 先合并重复，再去掉空白
    out, prev = [], None
    for s in path:
        if s != prev and s != 0: out.append(s)
        prev = s
    return out

def ctc_forward(probs, y):
    ext = [0]
    for c in y: ext += [c, 0]                # 插入空白的目标，长度 2U+1
    S = len(ext)
    alpha = [0.0] * S
    alpha[0], alpha[1] = probs[0][ext[0]], probs[0][ext[1]]
    for t in range(1, len(probs)):
        new = [0.0] * S
        for s in range(S):
            a = alpha[s] + (alpha[s - 1] if s >= 1 else 0.0)
            if s >= 2 and ext[s] != 0 and ext[s] != ext[s - 2]:
                a += alpha[s - 2]            # 跳过不同标签之间的空白
            new[s] = a * probs[t][ext[s]]
        alpha = new
    return alpha[S - 1] + alpha[S - 2]       # 停在最后一个标签或末尾空白

def brute(probs, y):
    total = 0.0
    for path in itertools.product(range(V), repeat=len(probs)):
        if collapse(path) == y:
            total += math.prod(probs[t][path[t]] for t in range(len(probs)))
    return total

for y, name in [([1, 2], "ab"), ([1, 1], "aa"), ([2], "b")]:
    f, b = ctc_forward(probs, y), brute(probs, y)
    print(f"P({name}|x): forward {f:.6f}  brute force {b:.6f}  loss {-math.log(f):.4f}")
greedy = [max(range(V), key=lambda v: p[v]) for p in probs]
print("best path", greedy, "-> collapsed", collapse(greedy))
print("total probability of all label sequences:",
      round(sum(brute(probs, list(y)) for n in range(T + 1) for y in itertools.product([1, 2], repeat=n)), 6))

def wer(ref, hyp):                           # 用编辑距离计算词错误率
    r, h = ref.split(), hyp.split()
    D = [[i + j if i * j == 0 else 0 for j in range(len(h) + 1)] for i in range(len(r) + 1)]
    for i in range(1, len(r) + 1):
        for j in range(1, len(h) + 1):
            D[i][j] = min(D[i - 1][j] + 1, D[i][j - 1] + 1, D[i - 1][j - 1] + (r[i - 1] != h[j - 1]))
    return D[-1][-1], len(r)
e, n = wer("the cat sat on the mat", "the cat sat on a mat mat")
print(f"WER: {e} edits / {n} words = {e / n:.3f}")
```

```text
P(ab|x): forward 0.277434  brute force 0.277434  loss 1.2822
P(aa|x): forward 0.113099  brute force 0.113099  loss 2.1795
P(b|x): forward 0.040938  brute force 0.040938  loss 3.1957
best path [1, 1, 0, 2, 2] -> collapsed [1, 2]
total probability of all label sequences: 1.0
WER: 2 edits / 6 words = 0.333
```

最后那行概率确认了 CTC 在转写上定义了一个真正的分布：每条路径恰好折叠成一个标签序列，所以长度不超过 $T$ 的一切序列的概率之和为 $1$。

**解码。** 最简单的解码器在每一帧取最可能的符号，再折叠结果（**best-path** 或贪心解码），如代码所示。它找到的是概率最大的*路径*，而不是概率最大的*转写*——后者要对所有路径求和；**前缀束搜索**近似后者，还可以加上外部语言模型的分数。由于 CTC 假定给定音频时各帧的输出独立，它内部没有任何关于哪些词序列更可能的模型——"recognise speech" 与 "wreck a nice beach" 只靠音频区分——所以 CTC 系统极受益于这样的语言模型。

::: warning CTC 不是帧分类器，它的尖峰也不是时刻
两种误读都很常见。CTC 不需要帧级标签，也学不到帧级标签：训练好的 CTC 模型几乎到处输出空白，把每个标签作为一两帧内的一道尖**尖峰**发出；而尖峰的位置不必与对应声音的中点重合——它常常是延迟的。因此从 CTC 尖峰读出的词时间戳只是近似的；需要精确时刻的系统会另外做对齐（例如对转写做强制对齐）。
:::

## 神经语音识别器 {#sec-asr}

大约从 2014 年起，神经网络取代了隐马尔可夫系统中的声学模型，随后连系统本身也被取代。端到端识别器出现了三个家族：

- **CTC 模型**——一个深编码器（循环、卷积或 Transformer）加一层输出字符或子词单元的 CTC 输出层（DeepSpeech 2，Amodei 等人, 2016）。
- **Transducer（转换器）**——RNN-Transducer（Graves, 2012）在 CTC 的对齐网格上加入一个对先前输出的预测网络，去掉了独立性假设，同时保留流式、帧同步的解码；Transducer 被广泛用于设备端的识别。把卷积与自注意力交错的 Conformer 编码器（Gulati 等人, 2020）成了标准的编码器。
- **注意力编码器-解码器**——"Listen, Attend and Spell"（Chan 等人, 2016）及其后继者：音频帧上的编码器加一个用交叉注意力读取它的自回归解码器（[[sequence-models/seq2seq]]），完全不用显式对齐。它们对输出语言建模得很好，但解码之前必须看到整条（或一块）语音。

**自监督预训练**改变了“需要什么样的带标签数据”。wav2vec 2.0（Baevski 等人, 2020）从无标签音频学习：把潜特征的连续跨度掩掉，用对比损失在干扰项中认出真正被量化的潜向量；只用 $10$ 分钟带标签语音做 CTC 微调——此前在 $53{,}000$ 小时无标签有声书语料上预训练——就在 LibriSpeech（Panayotov 等人, 2015）的 clean 与 other 测试集上达到了 $4.8\%$ 与 $8.2\%$ 的词错误率。HuBERT（Hsu 等人, 2021）改为预测被掩帧的聚类标签，就像 BERT 预测词一样。这些编码器的离散单元作为语音词元在 [[multimodal/audio-language-models]] 中再次出现。

### Whisper {#sec-whisper}

自监督模型仍然需要在目标数据集上微调，而在一个数据集上微调出来的模型换到另一个数据集上往往脆弱。Radford 等人 (2023) 走了相反的路：大规模的**弱监督**。他们从互联网收集了 $680{,}000$ 小时配有转写的音频——约 $438{,}000$ 小时英语、$117{,}000$ 小时其他 $96$ 种语言的语音，以及 $125{,}000$ 小时配有英文翻译的其他语言语音——并滤掉看起来机器生成的转写，因为用其他识别器的输出做训练会学到它们的错误。

::: definition Whisper {#def-whisper}
**Whisper** 是一个编码器-解码器 Transformer。编码器把 $30$ 秒片段的 $80$ 频带对数 mel 频谱图通过两个带 GELU 激活的卷积层（第二层步幅 $2$），加上正弦位置编码，再施加前归一化的 Transformer 模块。解码器是一个自回归 Transformer，带可学习的位置编码和对编码器输出的交叉注意力，产生字节级 BPE 词元。一串**特殊词元**指定任务：转写开始、语言标签（或把语言识别作为第一个预测）、"transcribe"（转写）或 "translate"（翻译成英语）、以及是否预测时间戳；时间戳随后作为量化到 $20$ ms 的词元在文本片段之间发出。最大的模型两个栈各有 $32$ 层、宽度 $1280$、$20$ 个头、约 $15.5$ 亿参数。
:::

一个模型由此就包办了多语言转写、翻译成英语、语言识别与语音活动检测（一个 "no speech" 词元）——全部通过解码器的提示完成——正是文本模型那种把指令当前缀的格式。长音频按 $30$ 秒的窗转写：按预测出的时间戳移动窗，并以上一个窗的文本为条件。

引人注目的结果是稳健性。Radford 等人把 Whisper 与一个在 LibriSpeech test-clean 上词错误率同为 $2.7\%$ 的监督模型相比，发现在十几个它未训练过的其他英语数据集上，Whisper 平均少犯 $55\%$ 的错误：在一个基准上拟合出来的模型学到了那个基准的怪癖。不过 Whisper 也有自己典型的失误。作为一个自回归语言模型，它会产生**幻觉**：循环重复短语，或在静音与噪声中生成通顺的文本。Koenecke 等人 (2024) 在抽样转写中发现约 $1\%$ 含有凭空编造的内容，其中一些有害——这提醒我们：转写通顺并不是转写准确的证据。

::: quiz
Whisper 为什么在解码器输入的开头插入语言标签和任务词元？
- [ ] 为了告诉编码器该用哪个 mel 滤波器组
- [x] 为了让一个解码器执行多项任务（多种语言的转写、翻译成英语、加时间戳），由前缀来选择或由模型预测
- [ ] 因为 CTC 要求在开头放一个空白词元
- [ ] 为了缩短编码器的序列长度
::: solution
特殊词元给解码器设定条件：给 "transcribe" 它就用源语言写下语音，给 "translate" 它就写英语；语言标签既可以给定，也可以预测。编码器对所有任务都一样，而且 Whisper 并不使用 CTC。
:::
:::

## 词错误率 {#sec-wer}

::: definition 词错误率 {#def-wer}
给定一份 $N$ 个词的参考转写和一个假设，设 $S$、$D$、$I$ 为两条词序列最小代价对齐中替换、删除、插入的个数（每种操作的代价为 $1$）。**词错误率**为

$$
\mathrm{WER} = \frac{S + D + I}{N}.
$$ {#eq-wer}

最小的 $S + D + I$ 就是两条词序列之间的莱文斯坦（Levenshtein）编辑距离，用动态规划对 $M$ 个词的假设在 $O(NM)$ 时间内算出：$D_{i,j} = \min(D_{i-1,j} + 1,\ D_{i,j-1} + 1,\ D_{i-1,j-1} + \mathbb{1}[r_i\neq h_j])$。
:::

::: example 一个词错误率 {#ex-wer}
参考 "the cat sat on the mat"，假设 "the cat sat on a mat mat"。找出编辑操作与 WER。
::: solution
前四个词精确对齐；"the" → "a" 是一次替换；"mat" 匹配；末尾的 "mat" 是一次插入。$S = 1$、$D = 0$、$I = 1$、$N = 6$，故 WER $= 2/6 = 0.333$，与代码算出的一致。注意分母只数参考里的词：插入很多的假设，WER 可以大于 $1$。
:::
:::

WER 之取决于**文本规范化**，不亚于取决于识别器本身："Dr." 对上 "doctor"、"twenty-five" 对上 "25"、标点与大小写，除非两边都做了规范化，否则统统算错。Radford 等人因此随 Whisper 发布了一个规范化器；用不同规范化器算出的 WER 数字不可互相比较。对书写时词间不留空格的语言（中文、日文、泰文），改用**字符错误率**。WER 还对所有词一视同仁：丢掉 "not" 会改变整句的意思，却和丢掉 "the" 记同样的账。

## 语音合成 {#sec-tts}

语音合成把流水线反着跑，困难恰好相反：文本对音频的规定是不充分的。同一句话可以用任何嗓音、速度、重音与情绪来读，所以合成器必须替文本做出文本没说到的选择，而且必须每秒产出 $16{,}000$ 到 $48{,}000$ 个听来自然的采样——那些不影响识别的相位或时序错误，在这里一听便知。

一个神经 TTS 系统经典地分三个阶段：

1. **文本分析。** 规范化文本（"£5" → "five pounds"、"Dr Smith" → "Doctor Smith"），并通常用发音词典与字形-音素转换模型把它转成音素。
2. **声学模型。** 把音素或字符序列映成 mel 频谱图。**Tacotron 2**（Shen 等人, 2018）是一个注意力编码器-解码器，自回归地预测 $80$ 频带的 mel 帧，并用一个“停止词元”结束生成。**FastSpeech 2**（Ren 等人, 2021）这类非自回归模型为每个音素预测显式时长，把音素编码展开到帧率，并行生成所有帧；它更快，还避免了注意力失灵导致的漏词、重词。
3. **声码器。** 把 mel 频谱图变成波形——这一步不可少，因为 mel 频谱图丢掉了相位与精细的频率细节。**WaveNet**（van den Oord 等人, 2016）用膨胀因果卷积逐个采样地自回归生成音频（[[sequence-models/state-space-models#ex-wavenet]]）：每个采样在 $\mu$ 律压扩后作为 $256$ 个取值之一来预测；它首次作为声码器用在 Tacotron 2 上。**HiFi-GAN**（Kong 等人, 2020）这类基于 GAN 的声码器并行生成，速度达实时的许多倍，成了常用的选择。

Shen 等人报告 Tacotron 2 配 WaveNet 声码器的平均意见分（听者对自然度的 $1$–$5$ 打分）为 $4.53$，专业录音为 $4.58$。之后的端到端模型如 VITS（Kim 等人, 2021）把声学模型与声码器联合训练。

::: definition $\mu$ 律压扩 {#def-mulaw}
对采样 $x\in[-1, 1]$ 与 $\mu = 255$，**$\mu$ 律压扩**（$\mu$-law companding）映为
$$
F(x) = \operatorname{sgn}(x)\,\frac{\ln(1 + \mu\lvert x\rvert)}{\ln(1 + \mu)}\in[-1, 1],
$$
再把结果量化到 $256$ 级。语音中常见、听觉又敏感的弱振幅因此比强振幅得到更细的量化步长。
:::

### 语音即词元：神经编解码器语言模型 {#sec-codec-tts}

另一条路把 TTS 当作语言建模。一个**神经音频编解码器**——见 [[multimodal/audio-language-models#sec-codecs]]——把音频压成低帧率的几路离散词元流，再把词元解码回音频。语音合成就成了以文本为条件生成编解码器词元，靠一个像语言模型那样在海量语音上训练的 Transformer。

**VALL-E**（Wang 等人, 2023）在 $60{,}000$ 小时英语有声书语音上训练，语音用 EnCodec 编码为每秒 $75$ 帧的 $8$ 本码。一个自回归 Transformer 以文本的音素和目标说话人一段 **$3$ 秒录音**的词元为条件，生成第一本码的词元；随后一个非自回归 Transformer 并行填进其余七本码。因为提示只是前缀，模型会“用这个嗓音”续写一个从未见过的说话人——连录音条件和情绪一起——从三秒音频**零样本克隆嗓音**，全凭上下文续写学会。这一家族的后续模型细化了词元化与采样；截至 2026 年，从短样本克隆嗓音已经随处可得。

::: example 编解码器 TTS 的词元速率 {#ex-codec-rate}
对 VALL-E 的编解码器（EnCodec，$75$ Hz 下 $8$ 本码），一段 $10$ 秒的语音用多少个词元表示？它的自回归阶段与非自回归阶段各要多少步顺序计算？
::: solution
$10\cdot75 = 750$ 帧，每帧 $8$ 个词元：共 $6000$ 个词元。自回归模型只生成第一本码：$750$ 个顺序步；非自回归模型对 $750$ 帧一次性预测其余 $7$ 本码各自的值：$7$ 步。把 $6000$ 个词元全部自回归生成要八倍的顺序步——这就是编解码器语言模型把活儿按码本拆分的原因。
:::
:::

::: application 嗓音克隆与同意
让编解码器语言模型迷人的那种能力——从几秒音频模仿嗓音——同样使冒充诈骗与未经同意的合成语音成为可能。VALL-E 的作者没有发布他们的模型，并讨论了合成语音的检测；其他开发者则要求同意声明、给生成的音频加水印，或把克隆限制在通过核验的嗓音上。合成音频的检测与出处标记见 [[llm-society/copyright-provenance]] 与 [[llm-society/misinformation]]；截至 2026 年，两者都不能完全可靠。
:::

::: history
贝尔实验室的 "Audrey"（1952）能认出一位说话人报的数字。以隐马尔可夫模型与 $n$-gram 语言模型做统计识别——1970–80 年代在 IBM 与 CMU 发展起来（Jelinek、Baker）——主导了三十年，特征用的是 mel 频率倒谱系数（Davis 与 Mermelstein, 1980）。Graves 等人于 2006 年（ICML）引入 CTC，2012 年引入 RNN-Transducer；约 2012 年，深度网络取代了 HMM 的高斯声学模型（Hinton 等人）。随后是端到端的注意力识别器（Chan 等人, 2016）、Conformer（2020）、自监督的 wav2vec 2.0（2020）与 HuBERT（2021），而 Whisper（Radford 等人，2022 年 12 月挂出，ICML 2023）展示了大规模弱监督的稳健性。合成一侧，拼接式合成与统计参数合成让位于 WaveNet（2016）、Tacotron 2（2018）、FastSpeech（2019–2021）与 HiFi-GAN（2020）；VALL-E（2023）把 TTS 重铸为编解码器词元上的语言建模。
:::

::: summary
- 语音先采样（识别通常 $16$ kHz）、分帧（$25$ ms 窗、$10$ ms 帧移）、加窗（Hann）再作傅里叶变换；按 mel 尺度 $m = 2595\log_{10}(1 + f/700)$ 等距布置的三角滤波器加上取对数，得到对数 mel 特征。
- 居中于某个频点、振幅为 $A$ 的纯音给出约 $\frac A2\sum w$ 的 DFT 幅度；加锥的窗用主瓣宽度换低泄漏。
- CTC 加一个空白符，把转写的概率定义为一切折叠到它的对齐之和，用在对插白目标上做的 $O(TU)$ 前向递归计算；它假定各帧输出条件独立。
- Transducer 与注意力编码器-解码器去掉了那个假设；自监督编码器（wav2vec 2.0、HuBERT）几乎不需要带标签数据。
- Whisper 是在 $680{,}000$ 小时弱标签网络音频上训练的编码器-解码器，用任务词元指定语言、转写、翻译与时间戳；它跨数据集稳健，但会产生幻觉。
- WER $= (S + D + I)/N$，由编辑距离算出；它取决于文本规范化，且可以大于 $1$。
- TTS 把文本映成 mel 频谱图（Tacotron 2、FastSpeech 2），声码器再把它变成音频（WaveNet、HiFi-GAN）；VALL-E 这样的编解码器语言模型生成离散音频词元，用短提示克隆嗓音。
:::

## 习题

::: exercise Whisper 窗口里的采样 {level=1 check="480000"}
$16$ kHz 的 $30$ 秒片段包含多少个采样？
::: solution
$30\cdot16{,}000 = 480{,}000$。
:::
:::

::: exercise $4$ kHz 的 mel 值 {level=1 check="2146.1"}
用 [[#eq-mel]] 计算 $m(4000)$，保留一位小数。
::: solution
$2595\log_{10}(1 + 4000/700) = 2595\log_{10}(6.714) = 2595\cdot0.8270 = 2146.1$ mel。到 $8$ kHz 的 $2840$ mel 中，一半位于约 $2.4$ kHz 以下。
:::
:::

::: exercise 频率分辨率 {level=1 check="40"}
$16$ kHz、FFT 长度 $400$（不补零）时，DFT 频点的间隔是多少赫兹？
::: solution
$f_s/N = 16{,}000/400 = 40$ Hz。像代码那样补零到 $512$，间隔降到 $31.25$ Hz，但并未添入新信息；它只是把频谱做了插值。
:::
:::

::: exercise 手算一个词错误率 {level=1 check="0.4"}
参考 "turn the lights off now"，假设 "turn lights of now"。计算 WER。
::: solution
"the" 被删除，"off" 被换成 "of"：$D = 1$、$S = 1$、$I = 0$、$N = 5$，故 WER $= 2/5 = 0.4$。
:::
:::

::: exercise 超过一的词错误率 {level=2 check="1.5"}
参考 "yes please"（$N = 2$），假设 "yes yes yes please please"。计算 WER，并解释为什么它超过 $1$。
::: solution
假设按序包含了参考，外加三个多余的词：$I = 3$、$S = D = 0$，WER $= 3/2 = 1.5$。插入没有上限，而分母由参考固定，所以产生幻觉或重复文本的识别器可以超过 $100\%$ 的 WER。
:::
:::

::: exercise CTC 需要多少帧？ {level=2 check="6"}
CTC 模型要输出 "hello"（五个字符），帧数 $T$ 最小是多少？
::: solution
每个字符要一帧，两个 l 之间还要一个空白，否则它们会并成一个：最短路径是 $\texttt{h e l}\,\varnothing\,\texttt{l o}$，故 $T = 6$。一般地 $T\ge U + r$，其中 $r$ 是目标中相邻相同字符对的数目。Whisper 的 $20$ ms 编码器帧允许每秒 $50$ 个字符，远高于说话速度——但编码器下采样很猛的 CTC 模型可能撞上这条限制。
:::
:::

::: exercise $\mu$ 律 {level=2 check="0.591"}
取 $\mu = 255$ 计算 $F(0.1)$，保留三位小数，并说明这对安静采样的量化意味着什么。
::: solution
$F(0.1) = \ln(1 + 25.5)/\ln256 = 3.277/5.545 = 0.591$。满量程十分之一的采样被映到输出范围的 $59\%$ 处，于是 $256$ 级中的 $59\%$（约 $151$ 级）花在区间 $[-0.1, 0.1]$ 上：安静的声音步长细，响的声音步长粗。
:::
:::

::: exercise 编解码器的步数 {level=1 check="750"}
VALL-E 的第一阶段处理 $10$ 秒语音要多少个自回归顺序步？
::: solution
第一本码每个编解码器帧一步：$10\cdot75 = 750$（[[#ex-codec-rate]]）。
:::
:::

::: exercise 数 CTC 的对齐 {level=3}
证明：对相邻标签互不相同、共 $U$ 个标签的目标，折叠到它的长度 $T$ 的路径数是 $\binom{T + U}{2U}$。用 $T = 5$、目标 "ab" 与 "aba" 的暴力计数检验公式。
::: solution
一条有效路径是 $2U + 1$ 段连续段：一段空白（长度 $\ge0$）、一段 $y_1$（长度 $\ge1$）、一段空白（$\ge0$）、……、一段 $y_U$（$\ge1$）、最后一段空白（$\ge0$）。因为相邻标签不同，这样的每一列都折叠成 $\mathbf{y}$；而每条有效路径都唯一地如此分解（不同标签之间的空白段可以为空）。于是数路径就是数方程 $b_0 + \ell_1 + b_1 + \dots + \ell_U + b_U = T$ 的解，其中 $\ell_u\ge1$、$b_u\ge0$。令 $\ell_u' = \ell_u - 1\ge0$，化为 $2U + 1$ 个非负部分之和等于 $T - U$，由隔板法有 $\binom{T - U + 2U}{2U} = \binom{T + U}{2U}$ 个解。$T = 5$ 时："ab" 给 $\binom{7}{4} = 35$，"aba" 给 $\binom{8}{6} = 28$，两者都与用代码里的 `collapse` 枚举全部 $3^5$ 条路径的结果一致。固定 $U$ 时计数随 $T$ 指数增长，这就是需要前向递归的原因。
:::
:::

::: exercise 独立性假设 {level=3}
(a) 解释为什么当音频完全相同时，CTC 模型自身无法偏爱 "their car" 而看不上 "there car"，注意力编码器-解码器却可以。(b) 描述**浅层融合**——束搜索期间在识别器的分数上加 $\lambda\log P_{\text{LM}}(\mathbf{y})$——以及为什么通常要配上一项长度奖励。
::: solution
(a) CTC 中 $P(\pi\mid\mathbf{x}) = \prod_tp_t(\pi_t\mid\mathbf{x})$：每帧的输出只取决于音频，不取决于其他输出。若 "their" 与 "there" 的音频完全相同，两个转写就得到相等的概率（除了编码器能从音频本身看到的上下文），模型里没有任何东西知道 "their car" 作为英语要常见得多。编码器-解码器把每个词元以全部先前词元为条件，$p(y_u\mid y_{<u}, \mathbf{x})$，于是从它的转写中学到一个隐式的语言模型。

(b) 浅层融合给束中的每个假设打 $\log P_{\text{ASR}}(\mathbf{y}\mid\mathbf{x}) + \lambda\log P_{\text{LM}}(\mathbf{y})$ 分，$\lambda$ 在留出的数据上调节，这样一个用比识别器转写多得多的文本训练的外部语言模型就能打破声学上的平局。每多一个词，$P_{\text{LM}}$ 就被乘上一个小于 $1$ 的因子，所以合并分数偏向短转写（删除）；再加一项 $\gamma\lvert\mathbf{y}\rvert$、$\gamma>0$ 调好，即可抵消这一偏向。
:::
:::
