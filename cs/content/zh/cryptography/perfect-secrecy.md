Alice 想在一条 Eve 能够读取的信道上给 Bob 发消息。两人上周见过面并商定了一个秘密；现在 Alice 用这个秘密变换她的消息，把结果发出，Bob 再撤销变换。信道上流动的一切 Eve 都看得见，变换如何运作她也一清二楚——她唯一不知道的就是秘密。关于 Eve 会知道什么，我们能向 Alice 承诺什么？

在其历史的大部分时间里，除"我们认识的人里还没谁破译过它"之外，密码学对这个问题并无解答。密码体制被发明、被放心使用、被破译、被替换，这个循环延续了二千多年。转折点出现在 1949 年：香农（Shannon）给出了安全密码的第一个*数学定义*，证明一个简单的密码——一次一密——满足它，并且证明每个满足它的密码，其密钥都至少和消息一样长。本章讲的就是这个故事：加密的设定与语法、三个经典密码及其各自失守的原因、香农的**完美保密**定义及其等价形式、一次一密，以及既显示其强大又显示其代价的诸定理。正是这个代价催生了课程余下的部分，从 [[cryptography/computational-security]] 开始。全章都要用到条件概率与贝叶斯公式；见 [Maths Atlas：条件概率](/learn/maths/lesson.php?c=probability&l=conditional-probability)。

## 设定：私钥加密

我们考虑**私钥**（**对称**）设定：Alice 和 Bob 共享一把 Eve 没有的密钥。无需事先共享任何秘密的公钥设定见 [[cryptography/public-key]]。

::: definition 私钥加密方案 {#def-scheme}
一个以 $\mathcal M$ 为**消息空间**的**私钥加密方案**由三个算法组成：

- **密钥生成**算法 $\mathsf{Gen}$，按某个概率分布从有限**密钥空间** $\mathcal K$ 中输出密钥 $k$；
- **加密**算法 $\mathsf{Enc}$，输入密钥 $k$ 和消息 $m \in \mathcal M$，在**密文空间** $\mathcal C$ 中输出**密文** $c \gets \mathsf{Enc}_k(m)$；它可以是随机化的；
- **解密**算法 $\mathsf{Dec}$，确定性，输入 $k$ 和 $c$，输出消息 $m = \mathsf{Dec}_k(c)$。

若对 $\mathsf{Gen}$ 能输出的每个密钥 $k$、每个 $m \in \mathcal M$ 以及 $\mathsf{Enc}$ 的每个随机选择都有 $\mathsf{Dec}_k(\mathsf{Enc}_k(m)) = m$，则称方案是**正确的**。
:::

原始的消息称为**明文**。注意定义*没有*说什么：它对所用的算法是否保密只字未提。**柯克霍夫原则**（Kerckhoffs，1883）要求密码体制在除密钥外的一切皆公开的情况下仍然安全。理由有三。密钥短小，泄露时容易更换；算法却嵌在硬件和软件里，做不到这一点。算法也总会泄露——会被逆向工程、被发表、被出售。而只有公开的设计才能交给不是它的发明者的人去研究，这是对设计建立信心的唯一途径。现代标准（AES、SHA-3、[[cryptography/post-quantum]] 的后量子方案）无一例外都是在面向公众的公开竞赛中遴选出来的。

还必须说明攻击者能做什么。本章中 Eve 是一名**窃听者**：她看到一个密文，设法对明文套取一点信息。后面的章节会给她更大的权力——多个密文、选择明文、选择密文——而这个**威胁模型**的层级是每个安全定义的一部分。

## 经典密码及其失守

### 移位密码

据说尤利乌斯·凯撒把每个字母替换为字母表中往后数三位的字母。把字母表 $\{A, \dots, Z\}$ 与 $\Z_{26} = \{0, \dots, 25\}$ 等同，作为一个方案：$\mathsf{Gen}$ 在 $\Z_{26}$ 中均匀选取 $k$；$\mathsf{Enc}_k(m_1\dots m_\ell) = c_1 \dots c_\ell$，其中 $c_i = (m_i + k) \bmod 26$；$\mathsf{Dec}_k$ 减去 $k$。取 $k = 3$ 时，`ATTACKATDAWN` 变成 `DWWDFNDWGDZQ`。

::: widget modular
n: 26
mode: add
caption: $\Z_{26}$ 的加法表。密钥为 $k$ 的移位密码把第 $m$ 行映到第 $k$ 列的表元；每一行、每一列都是 $\Z_{26}$ 的一个置换，所以每个密钥置换整个字母表，每个明文字母都可能变成任何密文字母。把鼠标悬在某个表元上即可读出 $m + k \bmod 26$，并留意只有 $26$ 列可试。
:::

移位密码之所以失败，是因为密钥空间太小。看到 `XPPELEYZZY` 的攻击者只要把 $26$ 个密钥全部试一遍——**穷尽密钥搜索**或**暴力攻击**——就能认出给出通顺文本的那一个：

```python
A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def shift(text, k):
    """把每个字母移位 k（k 取负即解密）。仅供教学的小密码。"""
    return "".join(A[(A.index(ch) + k) % 26] for ch in text)

c = "XPPELEYZZY"
for k in range(26):
    print(k, shift(c, -k))
```

```console
$ python3 shift.py
0 XPPELEYZZY
1 WOODKDXYYX
...
10 NFFUBUOPPO
11 MEETATNOON
12 LDDSZSMNNM
...
25 YQQFMFZAAZ
```

只有 $k = 11$ 给出英文。这引出密码设计的第一条原则——**密钥空间充分性原则**（sufficient key-space principle）：密钥空间必须大到无法搜索。后面将会看到，它是必要的，却远远不够。

### 代换密码

让密钥为字母表的任意置换 $\pi$，逐字母加密，$c_i = \pi(m_i)$。密钥共有 $26! = 403\,291\,461\,126\,605\,635\,584\,000\,000 \approx 2^{88.4}$ 个，用地球上所有计算机也穷尽不完。然而报纸谜题专栏的读者用**频率分析**几分钟就能破译它——九世纪的肯迪（al-Kindī）对此已有描述。英文文本中字母 `E` 约占字母总数的 12–13%，`T` 约 9%，`A` 和 `O` 各约 8%，而 `J`、`Q`、`X`、`Z` 都远低于 1%（这些是对大量文本的观察结果，随语料来源而异）。代换把字母映为字母，所以保留了频率轮廓，只是换了一层标签：出现最多的密文字母很可能就是 `E`。双字母组合（`TH`、`HE`）、重叠字母和短词随后就能敲定其余。

教训是：密钥不仅要是*大*的，还必须以掩盖明文统计特性的方式被*使用*。

### 维吉尼亚密码

维吉尼亚密码（Vigenère；Bellaso 1553 年描述，后被误归于 Vigenère）使用一个关键词 $k = k_0 k_1 \dots k_{t-1}$，第 $i$ 个字母移位 $k_{i \bmod t}$：
$$
c_i = (m_i + k_{i \bmod t}) \bmod 26 .
$$
明文的每个字母都被一个以 $t$ 为周期循环的量移位，于是同一个明文字母在不同位置变成不同的密文字母，从而把频率轮廓压平。三个世纪里它被称为 *le chiffre indéchiffrable*（"不可破译的密码"）。

::: example 维吉尼亚加密 {#ex-vigenere}
用关键词 `LEMON` 加密 `ATTACKATDAWN`，再把它解密回来。
::: solution
把关键词重复写在明文下方，逐列将字母值（$A = 0, \dots, Z = 25$）模 $26$ 相加：

| plaintext | A | T | T | A | C | K | A | T | D | A | W | N |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| key | L | E | M | O | N | L | E | M | O | N | L | E |
| shift | 11 | 4 | 12 | 14 | 13 | 11 | 4 | 12 | 14 | 13 | 11 | 4 |
| ciphertext | L | X | F | O | P | V | E | F | R | N | H | R |

例如 $T + M = 19 + 12 = 31 \equiv 5 = F$。注意位于位置 $0$、$3$、$9$ 的三个 `A` 分别变成了 `L`、`O`、`N`，位于位置 $1, 2$ 的两个 `T` 变成了 `X` 与 `F`。解密减去同样的移位：$L - L = 0 = A$，$X - E = 23 - 4 = 19 = T$，依此类推，恢复出 `ATTACKATDAWN`。一段小程序验证两个方向：

```python
def vigenere(text, key, sign=1):
    """玩具维吉尼亚密码：sign=+1 加密，sign=-1 解密。"""
    return "".join(A[(A.index(ch) + sign * A.index(key[i % len(key)])) % 26]
                   for i, ch in enumerate(text))

c = vigenere("ATTACKATDAWN", "LEMON")
print(c, vigenere(c, "LEMON", -1))
```

```console
$ python3 vigenere.py
LXFOPVEFRNHR ATTACKATDAWN
```
:::
:::

一旦周期 $t$ 已知，维吉尼亚密码便告失守：位置 $0, t, 2t, \dots$ 上的字母都被移了同一个量，于是这 $t$ 个子序列中的每一个都是移位密码，用频率分析即可破译。周期本身有两种经典求法。Kasiski（1863）注意到：恰好与密钥同一部分对齐的明文重复片段，会产生密文中的重复片段，其间距是 $t$ 的倍数。Friedman（1920 年代）使用**重合指数**（index of coincidence）：随机取文本中两个字母，两者相等的概率 $\sum_x p_x^2$。英文约为 $0.065$；均匀随机字母为 $1/26 \approx 0.038$。对每个候选 $t'$ 把密文切成 $t'$ 个子序列，正确的周期使各子序列看起来像英文（指数接近 $0.065$）而不像随机文本。

注意这里的模式。每个密码被破译，都不是因为直接找到了密钥，而是因为利用了某种密钥未能摧毁的*明文与密文之间的统计关系*。只有能证明不存在这样的关系，密码才可信——而这需要一个定义。

::: quiz
代换密码约有 $2^{88}$ 个密钥，多到任何计算机都穷尽不了。它为什么仍然不安全？

- [ ] 因为攻击者可以并行地搜索密钥空间。
- [x] 因为每个明文字母总是被映为同一个密文字母，字母频率在加密后依然存在。
- [ ] 因为密钥是一个置换，而置换可以求逆。
- [ ] 因为柯克霍夫原则要求置换本身公开。
::: solution
大的密钥空间只防得住穷尽搜索。频率分析根本不搜索密钥：它拿密文的频率轮廓与语言的频率轮廓相对照。求逆一个置换需要先知道它，而柯克霍夫原则公开的是*算法*，不是密钥。
:::
:::

## 完美保密

现在把"Eve 一无所获"讲精确。把消息建模为 $\mathcal M$ 上的随机变量 $M$，其分布刻画 Eve 事先知道的东西——比如 Alice 的消息有 $0.7$ 的概率是 `ATTACK`、$0.3$ 的概率是 `RETREAT`。密钥 $K$ 由 $\mathsf{Gen}$ 产生，与 $M$ 独立；$C = \mathsf{Enc}_K(M)$ 是所得密文，一个依赖于 $K$、$M$ 和 $\mathsf{Enc}$ 随机性的随机变量。若 Eve 看到 $C$ 之后对 $M$ 的了解与看到之前完全相同，她就是什么也没学到。

::: definition 完美保密 {#def-perfect-secrecy}
若对 $\mathcal M$ 上的每个概率分布、每个消息 $m \in \mathcal M$ 和每个满足 $\Prob[C = c] > 0$ 的密文 $c \in \mathcal C$，都有
$$
\Prob[M = m \mid C = c] = \Prob[M = m] ,
$$
则称以 $\mathcal M$ 为消息空间的加密方案是**完美保密**的。
:::

定义对消息的*每个*分布量化，因为方案无从知道 Eve 相信什么。它并非说 Eve 什么都不知道——她可能本来就很了解 $M$——只是密文没有增添什么。它也不对 Eve 的计算能力作任何假设：这个保证对拥有无限时间的对手依然成立。这就是完美保密又叫**信息论安全**或**无条件安全**的原因。

一个有用的改写去除了对消息分布的依赖。

::: lemma 密文分布与消息无关 {#lem-perfect-equiv}
方案完美保密当且仅当对所有 $m_0, m_1 \in \mathcal M$ 和所有 $c \in \mathcal C$，
$$
\Prob[\mathsf{Enc}_K(m_0) = c] = \Prob[\mathsf{Enc}_K(m_1) = c],
$$
其中概率取自 $\mathsf{Gen}$ 对 $K$ 的选择与 $\mathsf{Enc}$ 的随机性。
:::

::: proof
因为 $K$ 与 $M$ 独立，只要 $\Prob[M = m] > 0$，就有 $\Prob[C = c \mid M = m] = \Prob[\mathsf{Enc}_K(m) = c]$。

($\Leftarrow$) 设对每个 $m$ 都有 $\Prob[\mathsf{Enc}_K(m) = c] = p_c$。固定 $\mathcal M$ 上任意一个分布。由全概率公式，$\Prob[C = c] = \sum_{m'} \Prob[C = c \mid M = m']\Prob[M = m'] = p_c\sum_{m'}\Prob[M = m'] = p_c$。若 $\Prob[C = c] > 0$ 且 $\Prob[M = m] > 0$，贝叶斯公式给出
$$
\Prob[M = m \mid C = c] = \frac{\Prob[C = c \mid M = m]\,\Prob[M = m]}{\Prob[C = c]} = \frac{p_c\,\Prob[M = m]}{p_c} = \Prob[M = m],
$$
而 $\Prob[M = m] = 0$ 时两边都是 $0$。故方案完美保密。

($\Rightarrow$) 设方案完美保密，取 $\mathcal M$ 上的均匀分布，于是对一切 $m$ 有 $\Prob[M = m] > 0$。对任意 $m$ 和 $c$：若 $\Prob[C = c] = 0$，则对每个 $m$ 都有 $\Prob[C = c \mid M = m] = 0$；否则由贝叶斯公式和完美保密，$\Prob[C = c \mid M = m] = \Prob[M = m \mid C = c]\Prob[C = c]/\Prob[M = m] = \Prob[C = c]$。两种情形下 $\Prob[\mathsf{Enc}_K(m) = c]$ 都等于 $\Prob[C = c]$，与 $m$ 无关。
:::

所以方案完美保密，恰当密文分布不因消息而异：盯着 $c$ 看，也得不到它是哪条消息产生的任何线索。

### 完美不可区分

第三种形式是方案与对手之间一场博弈的说法。现代定义都采取这种形式，所以值得先在最简单的情形里看一遍。

::: definition 窃听情形下的不可区分实验 {#def-perfect-indist}
对方案 $\Pi = (\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ 和对手 $\mathcal A$，实验 $\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal A, \Pi}$ 如下进行：

1. $\mathcal A$ 输出两条消息 $m_0, m_1 \in \mathcal M$。
2. 选定密钥 $k \gets \mathsf{Gen}$ 和均匀比特 $b \in \{0, 1\}$，把**挑战密文** $c \gets \mathsf{Enc}_k(m_b)$ 交给 $\mathcal A$。
3. $\mathcal A$ 输出一个比特 $b'$。若 $b' = b$，实验输出 $1$（对手**得手**）。

若每个对手 $\mathcal A$ 的成功概率都恰为 $1/2$，则称 $\Pi$ 是**完美不可区分**的。
:::

乱猜也已有 $1/2$ 的成功概率，所以完美不可区分是说：没有哪种策略——无论多聪明、多慢——能比乱猜更好。

::: theorem 两个定义等价 {#thm-indist-equiv}
加密方案完美保密当且仅当它完美不可区分。
:::

::: proof
($\Rightarrow$) 由 [[#lem-perfect-equiv]]，无论 $b = 0$ 还是 $b = 1$，$c$ 的分布都相同。对手的输出 $b'$ 由 $m_0, m_1$、$c$ 和它自己的随机性算出，所以它的分布两种情形也相同，设 $\Prob[b' = 0] = q$。于是 $\Prob[b' = b] = \tfrac12\Prob[b' = 0 \mid b = 0] + \tfrac12\Prob[b' = 1 \mid b = 1] = \tfrac12 q + \tfrac12(1 - q) = \tfrac12$。

($\Leftarrow$) 若方案不完美保密，[[#lem-perfect-equiv]] 给出使 $p_0 = \Prob[\mathsf{Enc}_K(m_0) = c] \ne p_1 = \Prob[\mathsf{Enc}_K(m_1) = c]$ 的 $m_0, m_1, c$；必要时交换名字，设 $p_0 > p_1$。令 $\mathcal A$ 输出 $m_0, m_1$，收到 $c$ 时输出 $b' = 0$，否则输出 $b' = 1$。它得手的概率为
$$
\tfrac12 p_0 + \tfrac12(1 - p_1) = \tfrac12 + \tfrac12(p_0 - p_1) > \tfrac12,
$$
故方案不是完美不可区分。
:::

这种博弈视角将成为计算安全的模板：在 [[cryptography/computational-security]] 中，我们保留这个博弈，把"恰好 $1/2$"放宽为"至多 $1/2$ 加上一个可忽略量"，对手限于多项式时间运行。

::: example 单字母完美保密，两个字母就不 {#ex-shift-two}
(a) 证明移位密码在只加密单个字母时完美保密。(b) 找出违反 [[#lem-perfect-equiv]] 的 $m_0, m_1, c$，证明它对两字母消息不完美保密。
::: solution
(a) 对单个字母 $m$ 和任意密文字母 $c$，恰有一个密钥把 $m$ 映到 $c$，即 $k = (c - m) \bmod 26$。密钥是均匀的，所以 $\Prob[\mathsf{Enc}_K(m) = c] = 1/26$ 对一切 $m$ 和 $c$ 成立：与 $m$ 无关，由 [[#lem-perfect-equiv]] 完美保密。

(b) 取 $m_0 = $ `AA`、$m_1 = $ `AB`、$c = $ `XX`。密钥 $k = 23$ 把 `AA` 映到 `XX`，故 $\Prob[\mathsf{Enc}_K(\texttt{AA}) = \texttt{XX}] = 1/26$。每个密钥对两个字母移同样的量，所以含两个不同字母的消息永远不可能变成 `XX`：$\Prob[\mathsf{Enc}_K(\texttt{AB}) = \texttt{XX}] = 0$。用 [[#def-perfect-secrecy]] 的语言说：若 `AA` 与 `AB` 先验等可能，那么看到 `XX` 后 Eve 便确切知道消息不是 `AB`。[[#thm-indist-equiv]] 中的对手——"若两个密文字母相等就输出 $0$"——以概率 $\tfrac12 + \tfrac12\cdot 1 = 1$ 得手。一个密钥字母藏不住两个明文字母之间的关系。
:::
:::

## 一次一密

一次一密（one-time pad；Vernam 1917 年发明，"只用一次"的要求来自 Mauborgne）就是每个消息字母都配一个新而独立的密钥字母的移位密码。在比特上，移位就是异或（模 $2$ 加法），记作 $\oplus$。

::: definition 一次一密 {#def-otp}
固定长度 $\ell$。令 $\mathcal M = \mathcal K = \mathcal C = \{0, 1\}^\ell$。$\mathsf{Gen}$ 输出均匀的 $k \in \{0, 1\}^\ell$；$\mathsf{Enc}_k(m) = k \oplus m$（逐位异或）；$\mathsf{Dec}_k(c) = k \oplus c$。
:::

正确性成立，因为 $\oplus$ 满足结合律、$k \oplus k = 0^\ell$ 且 $0^\ell \oplus m = m$：$\mathsf{Dec}_k(\mathsf{Enc}_k(m)) = k \oplus (k \oplus m) = m$。

::: widget truthtable
formula: (m xor k) xor k
compare: m
caption: 一次一密单个比特的加密与解密：$(m \oplus k) \oplus k$ 这一列与 $m$ 这一列相同，所以对两个密钥比特，解密都能撤销加密。再看 $m \oplus k$ 一列：对每个固定的 $m$，随 $k$ 变化它取 $0$ 和 $1$ 各一次——密钥比特均匀时，无论 $m$ 是什么，密文比特都是均匀的。
:::

::: theorem 一次一密完美保密 {#thm-otp}
一次一密是完美保密的。
:::

::: proof
固定 $m, c \in \{0, 1\}^\ell$。方程 $k \oplus m = c$ 恰有一个解，$k = c \oplus m$。由于 $K$ 在 $2^\ell$ 个串上均匀，
$$
\Prob[\mathsf{Enc}_K(m) = c] = \Prob[K = c \oplus m] = 2^{-\ell},
$$
与 $m$ 无关。由 [[#lem-perfect-equiv]]，方案完美保密。
:::

::: example 一个两字节的一次一密 {#ex-otp}
用密钥 `0x3ca5` 加密 ASCII 消息 `HI`。再假设消息本来是 `NO`：哪个密钥会产生同样的密文？
::: solution
`HI` 是 `0x48 0x49`，即 $01001000\ 01001001$。与 $00111100\ 10100101$ 异或得 $01110100\ 11101100$，即 `0x74ec`：

```python
m, k = b"HI", bytes([0x3C, 0xA5])
c = bytes(x ^ y for x, y in zip(m, k))
print(c.hex())                                       # 74ec
print(bytes(x ^ y for x, y in zip(c, b"NO")).hex())  # 把 NO 映成 c 的密钥
```

```console
$ python3 otp.py
74ec
3aa3
```

密钥 `0x3aa3` 把 `NO` 映到同一个密文 `0x74ec`。每个两字节消息都恰有一个密钥把它加密成 `0x74ec`，而每个密钥等可能，所以密文与每个消息同样相容。穷举密钥的攻击者会把每一种可能的消息各得到一遍——`HI`、`NO`、`OK`、`GO`——却无从分辨哪个才是真的。这正是穷尽搜索对一次一密毫无用处的精确含义。
:::
:::

### 一次一密必须只用一次

名字本身就是警告。设同一密钥 $k$ 加密两条消息：$c_1 = k \oplus m_1$、$c_2 = k \oplus m_2$。则
$$
c_1 \oplus c_2 = (k \oplus m_1) \oplus (k \oplus m_2) = m_1 \oplus m_2,
$$
密钥消掉了。Eve 得到两条明文的异或，它显示两者在何处相同（比特为零），而对自然语言文本，这通常足以靠在一边猜常见的词、再到另一边读出来，从而恢复两者。她若哪天知道了 $m_1$，就得到 $m_2 = c_1 \oplus c_2 \oplus m_1$ 以及密钥本身。[[#def-otp]] 的方案*对一条消息*完美保密；对两条它什么也没说，而同一密钥加密两次并非完美保密（[[#ex-two-time]]）。

::: warning 被重用的、或不随机的密码本，已不是一次一密
一次一密的完美保密建立在三个条件上：密钥**均匀随机**、**与消息一样长**、**永不重用**。削弱其中任何一条，这个保证就不是逐渐、而是彻彻底底地丧失。由可预测过程产生的密钥（播了种的 `random.random()`、一个重复出现的模式、某本书里的文字）不是均匀的。密钥哪怕重用两次，也会把 $m_1 \oplus m_2$ 拱手交给 Eve。而"one-time pad"常被产品当作营销话术，实际是生成短密钥再把它扩张——那是流密码，只有计算安全可言（[[cryptography/computational-security]]）。另请注意，一次一密不提供**完整性**：翻转密文第 $i$ 位，就翻转解密后明文的第 $i$ 位，而 Bob 毫不知情（[[cryptography/hash-mac]] 处理这一点）。在真实代码里，永远不要自己实现本章的任何密码：请使用经评审的库提供的认证加密，后面的章节会讲。
:::

## 完美保密的代价

一次一密需要和消息一样多的密钥，而且每条消息都要用新密钥。安全地分发这么多密钥，与分发消息本身一样难，所以一次一密只被用在付得起这个代价的场合——外交与军事热线，密钥由专人携带。更聪明的方案能做得更好吗？香农证明了不能。

::: theorem 完美保密要求长密钥 {#thm-key-length}
若以 $\mathcal M$ 为消息空间、$\mathcal K$ 为密钥空间的加密方案完美保密，则 $\lvert\mathcal K\rvert \ge \lvert\mathcal M\rvert$。
:::

::: proof
设 $\lvert\mathcal K\rvert < \lvert\mathcal M\rvert$；我们证明方案不完美保密。取 $\mathcal M$ 上的均匀分布和任意满足 $\Prob[C = c] > 0$ 的密文 $c$。令
$$
\mathcal M(c) = \set{\mathsf{Dec}_k(c) : k \in \mathcal K}
$$
为 $c$ 可能解密出的消息集合。它至多有 $\lvert\mathcal K\rvert < \lvert\mathcal M\rvert$ 个元素，所以存在消息 $m' \notin \mathcal M(c)$。若 $c$ 可能在某个密钥 $k$ 之下是 $m'$ 的加密，正确性将给出 $\mathsf{Dec}_k(c) = m'$，把 $m'$ 放进 $\mathcal M(c)$；故 $\Prob[M = m' \mid C = c] = 0$。但 $\Prob[M = m'] = 1/\lvert\mathcal M\rvert > 0$，与 [[#def-perfect-secrecy]] 矛盾。
:::

$\ell$ 位消息时 $\lvert\mathcal M\rvert = 2^\ell$，所以完美保密的方案至少需要 $2^\ell$ 个密钥，写下来至少 $\ell$ 比特。一次一密是最优的。证明还揭示了短密钥的方案*如何*泄露：一个无界攻击者把 $c$ 在每个密钥下解密一遍，就把 $\mathcal M(c)$ 之外的所有消息都排除掉了。[[#ex-short-key]] 把这一点变成不可区分博弈中的一个具体优势。

当三个空间大小相等时，香农给出了完美保密的完全刻画。

::: theorem 香农定理 {#thm-shannon}
设 $(\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ 是一个 $\mathsf{Enc}$ 确定、且 $\lvert\mathcal M\rvert = \lvert\mathcal K\rvert = \lvert\mathcal C\rvert$ 的方案，其中 $\mathcal C$ 的每个密文在某个消息分布下都有正概率。该方案完美保密当且仅当

1. $\mathsf{Gen}$ 以概率 $1/\lvert\mathcal K\rvert$ 选取每个密钥，且
2. 对每个 $m \in \mathcal M$ 和 $c \in \mathcal C$，恰有一个密钥 $k$ 使 $\mathsf{Enc}_k(m) = c$。
:::

::: proof
($\Leftarrow$) 对任意 $m$ 和 $c$，令 $k_{m,c}$ 为满足 $\mathsf{Enc}_{k_{m,c}}(m) = c$ 的唯一密钥。则 $\Prob[\mathsf{Enc}_K(m) = c] = \Prob[K = k_{m,c}] = 1/\lvert\mathcal K\rvert$，与 $m$ 无关，由 [[#lem-perfect-equiv]] 得完美保密。

($\Rightarrow$) 设完美保密成立。由 [[#lem-perfect-equiv]]，$\Prob[\mathsf{Enc}_K(m) = c]$ 对一切 $m$ 相同，记作 $p_c$。每个 $c$ 对某条消息都有正概率，故对一切 $c$ 和 $m$ 有 $p_c > 0$。

**条件 2。** 固定 $m$。对 $\lvert\mathcal C\rvert$ 个密文 $c$ 中的每一个，都有某个密钥把 $m$ 映到 $c$，因为 $p_c > 0$。由于 $\mathsf{Enc}$ 是确定的，不同 $c$ 所对应的这些密钥互不相同。密钥只有 $\lvert\mathcal K\rvert = \lvert\mathcal C\rvert$ 个，所以每个 $c$ 恰由一个密钥到达——映射 $k \mapsto \mathsf{Enc}_k(m)$ 是 $\mathcal K$ 到 $\mathcal C$ 的双射。

**条件 1。** 固定 $c$，对每个 $m$ 令 $k_m$ 为使 $\mathsf{Enc}_{k_m}(m) = c$ 的唯一密钥。则对每个 $m$，$\Prob[K = k_m] = \Prob[\mathsf{Enc}_K(m) = c] = p_c$。不同的消息给出不同的密钥：若 $k_m = k_{m'}$，则 $\mathsf{Enc}_{k_m}(m) = \mathsf{Enc}_{k_m}(m') = c$，由正确性 $m = \mathsf{Dec}_{k_m}(c) = m'$。于是当 $m$ 遍历 $\lvert\mathcal M\rvert = \lvert\mathcal K\rvert$ 条消息时，$k_m$ 遍历所有密钥，每个密钥都有同样的概率 $p_c$。概率之和为 $1$，故 $p_c = 1/\lvert\mathcal K\rvert$。
:::

香农定理让这类方案检验完美保密变成机械的事：密钥是否均匀？每对（消息，密文）是否恰好对应一个密钥？一次一密过关；单字母移位密码也过关。密钥非均匀的移位密码则不满足条件 1（[[#ex-nonuniform]]）。

::: quiz
$\ell$ 位消息上一次一密的一个变体：密钥在除 $0^\ell$ 之外的所有串中均匀选取，以免任何消息被明文发送。它完美保密吗？

- [ ] 是的：它只是一个密钥空间略小的一次一密，$2^\ell - 1$ 仍然差不多是 $2^\ell$。
- [x] 不是：密文永远不等于消息，所以看到 $c$ 就排除了 $m = c$。
- [ ] 是的，因为密钥在其密钥空间上仍是均匀随机的。
- [ ] 仅当 $\ell \ge 128$。
::: solution
$\Prob[\mathsf{Enc}_K(m) = m] = \Prob[K = 0^\ell] = 0$，而对 $m' \ne m$ 有 $\Prob[\mathsf{Enc}_K(m') = m] = 1/(2^\ell - 1)$，故 [[#lem-perfect-equiv]] 的条件不成立。它也不满足 [[#thm-key-length]]：$\lvert\mathcal K\rvert = 2^\ell - 1 < 2^\ell = \lvert\mathcal M\rvert$。这里的"避开弱密钥"让方案严格变弱了。泄露很小——后验概率由 $2^{-\ell}$ 变成 $0$ ——但完美保密不容许任何泄露。
:::
:::

::: example 弱方案下的后验概率 {#ex-posterior}
Eve 认为 Alice 的单字母消息是 `Y`（同意）的概率为 $0.6$，是 `N`（不同意）的概率为 $0.4$。Alice 用移位密码加密，但她的密钥生成得不好：有一半的概率是 $k = 0$，其余情况在 $\{1, \dots, 25\}$ 上均匀。Eve 看到密文 `Y`。她认为消息是 `Y` 的后验概率是多少？
::: solution
$\mathsf{Enc}_k(\texttt{Y}) = \texttt{Y}$ 仅当 $k = 0$，概率为 $1/2$。$\mathsf{Enc}_k(\texttt{N}) = \texttt{Y}$ 需要 $k = 24 - 13 = 11$，概率为 $\tfrac12 \cdot \tfrac1{25} = \tfrac1{50}$。由贝叶斯公式，
$$
\Prob[M = \texttt{Y} \mid C = \texttt{Y}] = \frac{0.6 \cdot \tfrac12}{0.6 \cdot \tfrac12 + 0.4\cdot\tfrac1{50}} = \frac{0.3}{0.3 + 0.008} = \frac{0.3}{0.308} \approx 0.974 .
$$
Eve 的信念从 $0.6$ 移到了 $0.974$。若密钥是均匀的，两个概率都将是 $1/26$，后验概率将停在 $0.6$。算法没有问题；是*密钥分布*没有满足 [[#thm-shannon]] 的条件 1。
:::
:::

::: history
经典密码分析源远流长：九世纪肯迪（al-Kindī）的《论破译密码消息的手稿》（*Manuscript on Deciphering Cryptographic Messages*）就描述了频率分析。Giovan Battista Bellaso 于 1553 年发表了"维吉尼亚"密码；Friedrich Kasiski 于 1863 年发表了对它的攻击，不过 Charles Babbage 似乎更早发现。Auguste Kerckhoffs 在《军事密码学》（*La cryptographie militaire*，1883）中陈述了他的原则。Gilbert Vernam 于 1917 年在 AT&T 为电传打字机构造了异或密码，Joseph Mauborgne 则认识到密钥必须随机且永不重用。William Friedman 在 1920 年代引入了重合指数，而二战中的机械转子密码机（如恩尼格玛密码机）败在了包括 Marian Rejewski 和图灵（Turing）在内的密码分析家手里。重用带来了后果：从 1943 年起，在维诺纳计划（Venona）中，美国分析人员利用了苏联一次一密被复印过页码的密钥本。香农（Shannon）的《保密系统的通信理论》（"Communication theory of secrecy systems"，*Bell System Technical Journal*，1949；1945 年以机密报告形式写成）定义了完美保密，证明一次一密完美保密，并证明完美保密要求 $\lvert\mathcal K\rvert \ge \lvert\mathcal M\rvert$ ——密码学作为一门科学的开端。
:::

## 后续内容

完美保密是正确目标，却太昂贵：[[#thm-key-length]] 禁止短密钥，而实际系统用一把 128 位密钥加密数以吉字节计的数据。出路在 [[cryptography/computational-security]] 中给出：不是削弱保证的形式，而是削弱对手——只要求没有*高效的*对手能以超过*可忽略*的优势区分两次加密——并把短密钥扩张成一条长的伪随机密码本。那一章保留 [[#def-perfect-indist]] 的不可区分博弈。完整性是一次一密完全缺失的，是 [[cryptography/hash-mac]] 的主题。信息论安全在现代密码学中仍存活于付得起其代价的角落：秘密共享（[[cryptography/protocols]]）和一次一密的 MAC。量子密钥分发（[[quantum-computing]]）则是让一次一密的密钥分发变得可行的尝试。

::: summary
- 加密方案是一个三元组 $(\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$，满足 $\mathsf{Dec}_k(\mathsf{Enc}_k(m)) = m$（[[#def-scheme]]）。按**柯克霍夫原则**，保密的只有密钥。
- 经典密码（移位、代换、维吉尼亚）相继败于穷尽搜索，或败于在加密后依然留存的统计规律——字母频率、重合指数。密钥空间大是必要的，不是充分的。
- **完美保密**：对每个消息分布，$\Prob[M = m \mid C = c] = \Prob[M = m]$（[[#def-perfect-secrecy]]）；等价地，密文分布不依赖消息（[[#lem-perfect-equiv]]）；等价地，没有对手能以 $1/2$ 之外的概率赢得不可区分博弈（[[#thm-indist-equiv]]）。
- 用均匀的、与消息等长、永不重用的密钥的**一次一密** $c = k \oplus m$ 完美保密（[[#thm-otp]]）。重用密钥泄露 $m_1 \oplus m_2$；它不提供完整性。
- 完美保密要求 $\lvert\mathcal K\rvert \ge \lvert\mathcal M\rvert$（[[#thm-key-length]]）；当各空间大小相等时，它恰在密钥均匀、且每对（消息，密文）有唯一密钥时成立（**香农定理**，[[#thm-shannon]]）。
- 这些极限催生了计算安全：对手是高效的，密钥是短的。
:::

## 习题

::: exercise 破译移位密码 {level=1 check="7"}
密文 `OLSSV` 由移位密码产生。求出密钥和明文。（填入密钥 $k \in \{0, \dots, 25\}$。）
::: solution
从后往前移着试：取 $k = 7$，$O - 7 = 14 - 7 = 7 = H$，$L - 7 = 11 - 7 = 4 = E$，$S - 7 = 18 - 7 = 11 = L$，$S \to L$，$V - 7 = 21 - 7 = 14 = O$。明文是 `HELLO`，$k = 7$。没有别的密钥给出英文单词——尽管对五个字母的密文，两个不同密钥都给出单词是可能的，这正是穷尽搜索需要足够多的密文才能消除歧义的原因。
:::
:::

::: exercise 一次一密的密钥长度 {level=1 check="8192"}
Alice 要给 Bob 发一条 1 KiB 的消息，需要多少比特的一次一密密钥？若再发第二条 1 KiB 的消息，还要多少？（填入一条消息所需的比特数。）
::: solution
$1\ \text{KiB} = 1024$ 字节 $= 8192$ 比特，密码本必须和消息一样长，所以是 $8192$ 比特。第二条消息需要全新的 $8192$ 比特——重用会泄露两条消息的异或——所以总共 $16\,384$ 比特。由 [[#thm-key-length]]，没有完美保密的方案能用得更少。
:::
:::

::: exercise 维吉尼亚解密 {level=1}
用维吉尼亚关键词 `KEY` 解密 `RIJVS`。
::: solution
模 $26$ 减去移位 $K = 10$、$E = 4$、$Y = 24$、$K = 10$、$E = 4$：$R - K = 17 - 10 = 7 = H$；$I - E = 8 - 4 = 4 = E$；$J - Y = 9 - 24 = -15 \equiv 11 = L$；$V - K = 21 - 10 = 11 = L$；$S - E = 18 - 4 = 14 = O$。明文是 `HELLO`。注意两个 `L` 被加密成了不同的字母 `J` 和 `V`，因为它们落在不同的密钥字母之下。
:::
:::

::: exercise 两次一密 {#ex-two-time level=2}
(a) 证明同一密钥用两次的一次一密对消息对不是完美保密的：给出一个方案层面的论断，以及一个在不可区分博弈中以概率 $1$ 获胜的对手。(b) Alice 用同一个三字节密钥先后加密 `YES` 和 `NOT`；Eve 看到 `075694` 和 `105c93`。计算 $c_1 \oplus c_2$，并验证它等于 `YES` $\oplus$ `NOT`。
::: solution
(a) 把消息对看作一条消息 $(m_1, m_2)$，加密为 $(k \oplus m_1, k \oplus m_2)$。密文对总是满足 $c_1 \oplus c_2 = m_1 \oplus m_2$。对手把 $(m_1, m_2) = (0^\ell, 0^\ell)$ 作为第一个消息对、$(0^\ell, 1^\ell)$ 作为第二个消息对输出；收到 $(c_1, c_2)$ 后，若 $c_1 = c_2$ 则输出 $b' = 0$，否则输出 $b' = 1$。它永远正确。用 [[#thm-key-length]] 的语言说：消息空间有 $2^{2\ell}$ 个元素，而密钥只有 $2^\ell$ 个。

(b) `07 ⊕ 10 = 17`，`56 ⊕ 5c = 0a`，`94 ⊕ 93 = 07`，所以 $c_1 \oplus c_2 = $ `170a07`。而 `YES` $=$ `59 45 53`，`NOT` $=$ `4e 4f 54`：`59 ⊕ 4e = 17`，`45 ⊕ 4f = 0a`，`53 ⊕ 54 = 07`。两者一致，而密钥始终没有露面。用 Python 验证：`bytes(a ^ b for a, b in zip(b"YES", b"NOT")).hex()` 打印 `170a07`。
:::
:::

::: exercise 非均匀密钥 {#ex-nonuniform level=2 check="1/2"}
设 $\mathcal M = \mathcal K = \mathcal C = \Z_3$，$\mathsf{Enc}_k(m) = (m + k) \bmod 3$。$\mathsf{Gen}$ 以概率 $1/2$ 输出 $k = 0$，以概率 $1/4$ 各输出 $k = 1, 2$。消息是均匀的。计算 $\Prob[M = 0 \mid C = 0]$。（填入概率。）
::: solution
$\Prob[C = 0] = \sum_m \Prob[M = m]\Prob[K = -m \bmod 3] = \tfrac13(\tfrac12 + \tfrac14 + \tfrac14) = \tfrac13$，而 $\Prob[C = 0 \mid M = 0] = \Prob[K = 0] = \tfrac12$。所以 $\Prob[M = 0 \mid C = 0] = \tfrac12 \cdot \tfrac13 / \tfrac13 = \tfrac12 \ne \tfrac13 = \Prob[M = 0]$。方案不完美保密：它满足 [[#thm-shannon]] 的条件 2（每对 $(m, c)$ 有唯一密钥 $c - m$），却不满足条件 1。
:::
:::

::: exercise 完美保密与密文空间 {level=2}
证明每个完美保密的方案都满足 $\lvert\mathcal C\rvert \ge \lvert\mathcal M\rvert$，并且这只需要正确性，不需要完美保密。
::: solution
固定 $\mathsf{Gen}$ 能输出的任意密钥 $k$，对每个 $m$ 固定 $\mathsf{Enc}_k(m)$ 的一个可能密文 $c_m$。由正确性 $\mathsf{Dec}_k(c_m) = m$，所以不同的消息对应不同的 $c_m$（在 $k$ 之下一个密文只解出一个消息）。于是 $m \mapsto c_m$ 单射，$\lvert\mathcal C\rvert \ge \lvert\mathcal M\rvert$。这对每个正确的方案都成立，无论是否完美保密；[[#thm-key-length]] 的内容在于*密钥*空间也必须这么大。
:::
:::

::: exercise 短密钥给出优势 {#ex-short-key level=3}
设 $\Pi$ 是一个加密确定、且 $\lvert\mathcal K\rvert < \lvert\mathcal M\rvert$ 的方案。为 $\mathsf{PrivK}^{\mathsf{eav}}$ 构造一个（运行时间不限的）对手，使其成功概率至少为 $1 - \lvert\mathcal K\rvert/(2\lvert\mathcal M\rvert)$。对一个用 128 位密钥加密 256 位消息的方案，这意味着什么？
::: solution
对手固定任意消息 $m_0$，从 $\mathcal M$ 中均匀选取 $m_1$，输出 $(m_0, m_1)$。收到 $c$ 后，它通过逐个尝试密钥算出 $\mathcal M(c) = \set{\mathsf{Dec}_k(c) : k \in \mathcal K}$；若 $m_0 \in \mathcal M(c)$ 则输出 $b' = 0$，否则输出 $b' = 1$。

若 $b = 0$，则 $c = \mathsf{Enc}_k(m_0)$，由正确性 $m_0 = \mathsf{Dec}_k(c) \in \mathcal M(c)$：对手永远正确。若 $b = 1$，它只在 $m_0 \in \mathcal M(c)$ 时出错，即当 $c$ 落在集合 $S = \set{\mathsf{Enc}_{k'}(m_0) : k' \in \mathcal K}$ 中，该集合至多有 $\lvert\mathcal K\rvert$ 个密文。（若 $m_0 = \mathsf{Dec}_{k'}(c)$，则 $c = \mathsf{Enc}_{k'}(m_0)$，因为 $\mathsf{Enc}_{k'}$ 确定且由正确性知单射。）对真实的密钥 $k$，$\mathsf{Enc}_k$ 是单射，所以至多 $\lvert S\rvert \le \lvert\mathcal K\rvert$ 个消息 $m_1$ 满足 $\mathsf{Enc}_k(m_1) \in S$；$m_1$ 均匀时，这至多有 $\lvert\mathcal K\rvert/\lvert\mathcal M\rvert$ 的概率。于是
$$
\Prob[b' = b] \ge \tfrac12\cdot 1 + \tfrac12\left(1 - \frac{\lvert\mathcal K\rvert}{\lvert\mathcal M\rvert}\right) = 1 - \frac{\lvert\mathcal K\rvert}{2\lvert\mathcal M\rvert}.
$$
对 256 位消息、128 位密钥，$\lvert\mathcal K\rvert/\lvert\mathcal M\rvert = 2^{-128}$，对手至少以 $1 - 2^{-129}$ 的概率获胜——但它需要尝试 $2^{128}$ 个密钥。这正是计算安全所利用的缝隙：对手存在，却无人能把它跑起来。
:::
:::

::: exercise 一个"均衡"的密钥 {level=3}
设 $\ell \ge 2$ 为偶数，把 $\{0, 1\}^\ell$ 上的一次一密改为：$\mathsf{Gen}$ 在恰有 $\ell/2$ 个 1 的汉明权重（0 和 1 一样多）的 $\ell$ 位串中均匀选取 $k$，姑且是为了"避开弱密钥"。这方案完美保密吗？证明你的结论，并给出一个不可区分博弈中的对手。
::: solution
不。这样的密钥只有 $\binom{\ell}{\ell/2} < 2^\ell$ 个（例如 $0^\ell$ 和 $1^\ell$ 都被排除在外），[[#thm-key-length]] 已经排除了完美保密。一个具体的对手：输出 $m_0 = 0^\ell$ 和 $m_1 = 1\,0^{\ell - 1}$。若 $b = 0$，则 $c = k$，汉明权重恰为 $\ell/2$。若 $b = 1$，则 $c = k \oplus 1\,0^{\ell-1}$ 是把 $k$ 的首位翻转，权重为 $\ell/2 + 1$ 或 $\ell/2 - 1$。于是当且仅当 $c$ 的权重为 $\ell/2$ 时输出 $b' = 0$ 的对手以概率 $1$ 获胜。对全部 $2^\ell$ 个密钥上均匀分布的任何偏离都会泄露些什么；这里泄露得还不少。
:::
:::

::: exercise 实现并检验 {level=2}
为一次一密写一个 Python 函数 `otp(key: bytes, data: bytes) -> bytes`，当两个长度不同就报错；并对全部 $2^8$ 个单字节密钥穷举，验证消息 `b"A"` 和 `b"B"` 的每个密文字节都恰好出现一次。为什么这是对 [[#lem-perfect-equiv]] 的检验？（和本章一切东西一样，这只是教学玩具：真实代码应使用经评审库的认证加密接口。）
::: solution
```python
from collections import Counter

def otp(key: bytes, data: bytes) -> bytes:
    """教学用的一次一密：密钥绝不重用；真实代码请用经评审的库。"""
    if len(key) != len(data):
        raise ValueError("key and message must have the same length")
    return bytes(k ^ d for k, d in zip(key, data))

for m in (b"A", b"B"):
    counts = Counter(otp(bytes([k]), m) for k in range(256))
    print(m, len(counts), set(counts.values()))
```

```console
$ python3 otp_check.py
b'A' 256 {1}
b'B' 256 {1}
```

每条消息都到达全部 $256$ 个密文，且每个都恰由一个密钥达到。密钥均匀时，$\Prob[\mathsf{Enc}_K(m) = c] = 1/256$ 对两条消息和每个 $c$ 都成立——正是 [[#lem-perfect-equiv]] 的条件——同时也正是 [[#thm-shannon]] 的条件 2。
:::
:::
