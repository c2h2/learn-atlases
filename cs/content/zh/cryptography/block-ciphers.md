浏览器通过 TLS 抓取网页时，这个页面几乎一定是用 AES——高级加密标准（Advanced Encryption Standard）——在一种叫 GCM 的模式下加密的。AES 是一个**分组密码**：在 128 位密钥之下，它把每个 128 位的输入分组映射为一个 128 位的输出分组，仅此而已。网页并不是 128 位长，同一个页面可能被抓取两次，而网络上的攻击者还可能设法让你的浏览器去加密攻击者选择的数据。从"128 位分组的密钥置换"走到"对主动攻击者安全的任意消息加密"，正是**工作模式**的职责；而把模式搞错，是那些密码本身完全合格的真实系统最常见的失败方式之一。

本章分为两半。前半部分看分组密码的内部：它应当是什么（强伪随机置换，[[cryptography/computational-security#def-prp]]）、如何由简单的轮构造——Feistel 网络与替换-置换网络——以及 DES 和 AES 如何工作。后半部分定义针对**选择明文攻击**（CPA）和**选择密文攻击**（CCA）的安全性，说明确定性加密为何注定失败，并分析标准模式 ECB、CBC、CTR 与 GCM。和往常一样，本章的玩具密码只用于理解；真正的程序应当调用经过评审的库所提供的认证加密接口。

## 什么是分组密码

::: definition 分组密码 {#def-block-cipher}
密钥长度为 $\kappa$、分组长度为 $n$ 的**分组密码**是一个可有效计算的函数 $F\colon \{0,1\}^\kappa \times \{0,1\}^n \to \{0,1\}^n$，使得对每个密钥 $k$，映射 $F_k = F(k, \cdot)$ 是 $\{0,1\}^n$ 上的置换，且给定 $k$ 时 $F_k^{-1}$ 也可有效计算。若它表现得像一个强伪随机置换——没有任何高效的区分器能在拥有均匀密钥之下 $F_k$ 与 $F_k^{-1}$ 的预言机访问时，把它们与一个均匀随机的置换 $\pi$ 及其逆区分开——就称它**安全**。
:::

对一个具体的密码，$\kappa$ 和 $n$ 是固定的（AES：$n = 128$，$\kappa \in \{128, 192, 256\}$），所以"高效"与"可忽略"要按具体方式解读：最好的攻击应花费约 $2^\kappa$ 次运算——逐个尝试所有密钥的代价——并且不应用少于约 $2^{n/2}$ 个分组就完成区分，超过这个数量切换引理（[[cryptography/computational-security#lem-switching]]）就会接管。分组密码不是加密方案：它是确定性的，而且一次只处理一个分组。它是一个积木块——一个原语——它的安全性是由公开密码分析支持的假设，而非定理。

如何构造一个看起来随机的置换？香农（Shannon）在 1949 年给出了两味原料的名字。**混淆**（confusion）通过非线性替换使密钥与密文之间的关系变得复杂。**扩散**（diffusion）通过线性混合把每个输入比特的影响散布到整个分组，使得改变一个输入比特会改变大约一半的输出比特（**雪崩效应**）。单靠哪一味都不够；把二者在许多**轮**中交替起来，每轮都混入由**密钥编排**（key schedule）从主密钥导出的**轮密钥**，才行。

## Feistel 网络与 DES

**Feistel 网络**能把任意函数——不必可逆——变成置换。把分组分成两半 $(L, R)$。一轮使用依赖轮密钥的**轮函数** $f_i$，把

$$
(L_{i-1}, R_{i-1}) \mapsto (L_i, R_i) = \big(R_{i-1},\ L_{i-1} \oplus f_i(R_{i-1})\big).
$$

::: proposition Feistel 轮是可逆的 {#prop-feistel}
对任意从 $\{0,1\}^{n/2}$ 到自身的函数 $f_1, \dots, f_r$，$r$ 轮 Feistel 网络是 $\{0,1\}^n$ 上的置换，其逆元按相反顺序执行各轮、按 $(L_{i-1}, R_{i-1}) = \big(R_i \oplus f_i(L_i),\ L_i\big)$ 计算。
:::

::: proof
只需逆转一轮。给定 $(L_i, R_i) = (R_{i-1}, L_{i-1} \oplus f_i(R_{i-1}))$，可读出 $R_{i-1} = L_i$，再由 $x \oplus y \oplus y = x$ 得 $L_{i-1} = R_i \oplus f_i(R_{i-1}) = R_i \oplus f_i(L_i)$。所以每一轮都是双射，且具有上述逆；双射的复合仍是双射，其逆按相反顺序施加各轮的逆。注意 $f_i$ 自身始终只被正向求值。
:::

Luby 与 Rackoff（1988）证明：若三轮 Feistel 网络的轮函数是相互独立的伪随机函数，则该网络是伪随机置换；四轮则是强伪随机置换。一轮或两轮则不然（[[#ex-feistel-rounds]]）。

::: example 一个玩具 Feistel 密码 {#ex-toy-feistel}
取 8 位分组、4 位两半，轮函数为 $f_k(R) = S[R \oplus k]$，其中 4 位 S 盒为
$S = [\texttt{c},\texttt{5},\texttt{6},\texttt{b},\texttt{9},\texttt{0},\texttt{a},\texttt{d},\texttt{3},\texttt{e},\texttt{f},\texttt{8},\texttt{4},\texttt{7},\texttt{1},\texttt{2}]$（十六进制；它是轻量级密码 PRESENT 的 S 盒），轮密钥为 $\texttt{3}, \texttt{a}, \texttt{6}$ 三个。加密 `0x4b`，再把结果解密。
::: solution
从 $L_0 = \texttt{4}$、$R_0 = \texttt{b}$ 出发。每一轮用 $R \oplus k$ 作为 S 盒的下标，新的右半等于旧左半与 S 盒输出异或：

| 轮 | $L$ | $R$ | $k$ | $R \oplus k$ | $S[R \oplus k]$ | 新 $(L, R)$ |
|---|---|---|---|---|---|---|
| 1 | 4 | b | 3 | 8 | 3 | (b, 4 ⊕ 3 = 7) |
| 2 | b | 7 | a | d | 7 | (7, b ⊕ 7 = c) |
| 3 | 7 | c | 6 | a | f | (c, 7 ⊕ f = 8) |

密文是 `0xc8`。解密时按 $(L, R) \mapsto (R \oplus f_k(L), L)$ 倒着执行各轮：从 $(\texttt{c}, \texttt{8})$ 出发，$k = \texttt{6}$ 时 $S[\texttt{c} \oplus \texttt{6}] = S[\texttt{a}] = \texttt{f}$，得 $(\texttt{8} \oplus \texttt{f}, \texttt{c}) = (\texttt{7}, \texttt{c})$；接着 $k = \texttt{a}$ 得 $(\texttt{c} \oplus S[\texttt{d}], \texttt{7}) = (\texttt{b}, \texttt{7})$；再 $k = \texttt{3}$ 得 $(\texttt{7} \oplus S[\texttt{8}], \texttt{b}) = (\texttt{4}, \texttt{b})$，即 `0x4b`。

```python
S = [0xC, 5, 6, 0xB, 9, 0, 0xA, 0xD, 3, 0xE, 0xF, 8, 4, 7, 1, 2]

def feistel_enc(x, keys):                  # 玩具 8 位密码：不安全，仅供学习
    L, R = x >> 4, x & 0xF
    for k in keys:
        L, R = R, L ^ S[R ^ k]
    return (L << 4) | R

def feistel_dec(y, keys):
    L, R = y >> 4, y & 0xF
    for k in reversed(keys):
        L, R = R ^ S[L ^ k], L
    return (L << 4) | R

keys = [0x3, 0xA, 0x6]
y = feistel_enc(0x4B, keys)
print(hex(y), hex(feistel_dec(y, keys)))
print(sorted(feistel_enc(v, keys) for v in range(256)) == list(range(256)))
```

```console
$ python3 feistel.py
0xc8 0x4b
True
```

最后一行确认 256 个输入映射到 256 个互不相同的输出：这是一个置换，正如 [[#prop-feistel]] 所保证的那样。当然，分组只有 8 位、密钥只有 12 位，这个密码是毫无希望的——攻击者可以把它整个列成表。
:::
:::

::: widget permutation
perm: 9 6 15 4 8 11 2 13 14 1 12 7 3 16 5 10
second: 12 7 14 1 5 10 3 16 15 4 9 6 2 13 8 11
caption: 一个在 4 位分组（2 位两半、S 盒 $[3,0,2,1]$）上执行三轮的 Feistel 密码，分组值 $v$ 画在 $v + 1$ 处。第一个置换是轮密钥 $1, 2, 3$ 下的密码，第二个是 $2, 0, 1$ 下的。每个密钥选取 $16$ 个分组的一个置换；一个安全的分组密码应当让秘密密钥选中的置换看起来像从全部 $16! \approx 2 \times 10^{13}$ 个置换中均匀选出的一个。观察它的循环结构以及两个密钥的复合。
:::

**DES**（Data Encryption Standard，数据加密标准；FIPS 46，1977）由 IBM 在 Horst Feistel 的 Lucifer 基础上、经 NSA 修改研制而成，是在 64 位分组上的 16 轮 Feistel 网络，密钥 56 位。它的轮函数把 32 位的半分组扩展到 48 位，与轮密钥异或，让结果穿过 8 个各把 6 位映到 4 位的 S 盒，再对 32 个输出比特做置换。DES 出人意料地扛住了数十年的分析——Biham 与 Shamir 在 1990 年前后发表差分密码分析时，需要 $2^{47}$ 个选择明文，而其设计者显然早已知道这一攻击——但它的密钥始终太短。1998 年，电子前哨基金会（EFF）专门制造的机器用穷尽搜索在 56 小时内找到了一把 DES 密钥。**三重 DES**（$E_{k_1} \circ D_{k_2} \circ E_{k_3}$）拉长了密钥，却保留了 64 位的分组，其 $2^{32}$ 个分组的生日界对现代数据量来说太小；NIST 已将其淘汰，并规定 2023 年之后不得再将其用于加密。

## 替换-置换网络与 AES

**替换-置换网络**（substitution–permutation network，SPN）对整块分组施加操作，每轮依次是：与轮密钥异或、一层并行的小的可逆 S 盒（混淆）、一层可逆的线性混合（扩散）。与 Feistel 网络不同，它的每个部件都必须可逆，解密按相反顺序施加各部件的逆。

**AES** 是名为 Rijndael 的 SPN，由 Joan Daemen 与 Vincent Rijmen 设计，经 NIST 公开、世界范围、为期三年的竞赛后于 2000 年入选（FIPS 197，2001）。它把 128 位的状态看成一个 $4 \times 4$ 的字节数组，对 128、192 或 256 位的密钥分别执行 $10$、$12$ 或 $14$ 轮。每轮施加

1. **SubBytes**：对 16 个字节中的每个施加同一个 8 位 S 盒；
2. **ShiftRows**：数组的第 $i$ 行左移 $i$ 个位置；
3. **MixColumns**：把每一列看作四个字节构成的向量，乘以一个固定的可逆 $4 \times 4$ 矩阵（最后一轮省略）；
4. **AddRoundKey**：与密钥编排给出的 128 位轮密钥异或。

其中的算术在含 $256$ 个元素的有限域 $\mathrm{GF}(2^8)$ 上进行（[Maths Atlas：有限域](/learn/maths/lesson.php?c=abstract-algebra&l=fields-galois)）。字节 $b_7 \dots b_0$ 就是系数在 $\{0, 1\}$ 中的多项式 $b_7x^7 + \dots + b_0$；加法是异或；乘法是模不可约多项式 $x^8 + x^4 + x^3 + x + 1$（十六进制 `0x11b`）的多项式乘法。S 盒把一个字节映为本域中它的乘法逆元（规定 $0 \mapsto 0$），再施加一个在 $\mathrm{GF}(2)$ 上固定的仿射映射。求逆高度非线性，从而挫败线性密码分析与差分密码分析；仿射映射则去掉了不动点 $0 \mapsto 0$ 与 $1 \mapsto 1$。MixColumns 的选取保证：一列输入的任意 $k$ 个字节发生变化，输出至少 $5 - k$ 个字节随之改变；配合 ShiftRows，两轮就能把每个输入字节扩散到整个状态。

::: example 在 AES 域中乘法 {#ex-gf256}
在 $\mathrm{GF}(2^8)$ 中计算 `0x57` $\cdot$ `0x83`，并验证 `0x53` 的逆是 `0xca`。
::: solution
`0x57` $= x^6 + x^4 + x^2 + x + 1$，`0x83` $= x^7 + x + 1$。二者在 $\mathrm{GF}(2)$ 上的乘积（系数按模 2 相加）为
$$
x^{13} + x^{11} + x^9 + x^8 + x^6 + x^5 + x^4 + x^3 + 1 .
$$
模 $x^8 + x^4 + x^3 + x + 1$ 归约，利用 $x^8 \equiv x^4 + x^3 + x + 1$：结果是 $x^7 + x^6 + 1$，即 `0xc1`。程序的做法是同样的"移位相加，一旦有比特越过 $x^7$ 就归约"：

```python
def gmul(a, b):
    """在 GF(2^8) 中模 x^8 + x^4 + x^3 + x + 1 计算字节 a, b 的乘积。"""
    r = 0
    while b:
        if b & 1:
            r ^= a            # 加上（异或）a 的当前倍项
        a <<= 1               # a 乘 x
        if a & 0x100:
            a ^= 0x11B        # 模 AES 多项式归约
        b >>= 1
    return r

print(hex(gmul(0x57, 0x83)), hex(gmul(0x53, 0xCA)))
```

```console
$ python3 gf256.py
0xc1 0x1
```

`0x53` $\cdot$ `0xca` $= 1$，所以 `0xca` 是 `0x53` 的逆。对 `0xca` 施加 S 盒的仿射映射得 `0xed`，即 `0x53` 的 AES S 盒值（两者都是 FIPS 197 中给出的算例）。
:::
:::

截至 2026 年，针对完整 AES 的最佳公开发表密钥恢复攻击（biclique 攻击，2011）也只比穷尽搜索快一点点，而且没有人知道任何实用的区分器；AES 被假定为强 PRP。它在现实世界中的弱点全部来自实现：基于查表的软件会通过缓存时序泄露密钥字节，这就是现代处理器提供恒定时间执行的 AES 指令的原因，也是你应当使用利用这些指令的库的原因。

## 选择明文安全性

只看到一个密文的窃听者是弱对手。实践中，攻击者往往能影响被加密的内容：一个网页可以让你的浏览器发送把攻击者选择的文本与你的秘密 cookie 并列在一起的请求；而在第二次世界大战中，盟军的破译人员会"园艺"——在特定地点布雷，使德国关于该事件的报告里包含一个已知单词。定义给对手一个**加密预言机**。

::: definition CPA-安全 {#def-cpa}
在实验 $\mathsf{PrivK}^{\mathsf{cpa}}_{\mathcal A, \Pi}(n)$ 中：选取密钥 $k \gets \mathsf{Gen}(1^n)$；对手 $\mathcal A$ 获得对 $\mathsf{Enc}_k(\cdot)$ 的预言机访问，输出等长的 $m_0, m_1$；它收到均匀 $b$ 之下的 $c \gets \mathsf{Enc}_k(m_b)$；它继续保有预言机访问；它输出 $b'$，若 $b' = b$ 则成功。若每个 PPT 对手的成功概率至多 $\tfrac12 + \mathsf{negl}(n)$，则 $\Pi$ 是 **CPA-安全**的。
:::

CPA-安全蕴含同一密钥下加密多条消息时的安全性（对手自己就能获得那些其他加密）。而且它排除了每一个确定性方案。

::: proposition 确定性加密不是 CPA-安全的 {#prop-det-cpa}
若 $\mathsf{Enc}$ 是确定性的，则该方案不是 CPA-安全的。
:::

::: proof
对手任取等长的不同 $m_0, m_1$，向预言机查询 $m_0$ 得到 $c_0 = \mathsf{Enc}_k(m_0)$，然后当挑战密文等于 $c_0$ 时输出 $b' = 0$，否则输出 $b' = 1$。由于加密是确定性的且解密是正确的（$\mathsf{Enc}_k(m_1) \ne c_0$），它总是成功。
:::

所以安全的方案必须是**随机化**的（或者保持状态，例如一个计数器）：同一消息加密两次必须给出不同的密文。最简单的构造对 PRF 使用一个新鲜的随机输入。

::: theorem 随机化的 PRF 加密是 CPA-安全的 {#thm-prf-cpa}
设 $F$ 是 $n$ 位串上的 PRF。对 $m \in \{0,1\}^n$，令 $\mathsf{Enc}_k(m) = \langle r,\ F_k(r) \oplus m\rangle$，其中 $r \in \{0,1\}^n$ 均匀且新鲜，并令 $\mathsf{Dec}_k(\langle r, s\rangle) = F_k(r) \oplus s$。若 $\mathcal A$ 对其加密预言机至多发起 $q(n)$ 次查询，则
$$
\Prob\big[\mathsf{PrivK}^{\mathsf{cpa}}_{\mathcal A, \Pi}(n) = 1\big] \le \frac12 + \frac{q(n)}{2^n} + \mathsf{negl}(n).
$$
:::

::: proof
设 $\tilde\Pi$ 是把 $F_k$ 换成均匀随机函数 $f$ 之后的同一方案。*第一步：$\mathcal A$ 无法把 $\Pi$ 与 $\tilde\Pi$ 区分开。*构造 PRF 区分器 $D^O$：运行 $\mathcal A$，对每个加密查询 $m$ 选取 $r$ 并返回 $\langle r, O(r) \oplus m\rangle$，用同样的方式加密挑战，并当且仅当 $\mathcal A$ 猜中 $b$ 时输出 $1$。当 $O = F_k$ 时它模拟 $\mathsf{PrivK}^{\mathsf{cpa}}_{\mathcal A, \Pi}$；当 $O = f$ 时它模拟 $\tilde\Pi$ 的同一实验。于是两个成功概率之差等于 $D$ 的优势，而后者是可忽略的。

*第二步：在 $\tilde\Pi$ 中，$\mathcal A$ 的成功概率至多 $\tfrac12 + q/2^n$。*设 $r^*$ 是挑战密文 $\langle r^*, f(r^*) \oplus m_b\rangle$ 的随机性，设 $\mathsf{Repeat}$ 是某个预言机查询用到了同一个 $r^*$ 的事件。由于 $r^*$ 均匀且与预言机用到的至多 $q$ 个值独立，$\Prob[\mathsf{Repeat}] \le q/2^n$。若 $\mathsf{Repeat}$ 不发生，则 $f(r^*)$ 是一个与 $\mathcal A$ 所见其他一切东西都无关的均匀串——随机函数在一个新点上的取值——于是挑战密文是 $m_b$ 的一次一密加密，$\mathcal A$ 恰以概率 $\tfrac12$ 猜中 $b$。从而成功概率 $\le \Prob[\mathsf{Repeat}] + \tfrac12$。合并两步即证得此界；对多项式的 $q$，$q/2^n$ 是可忽略的。
:::

这个方案把每个分组的长度翻了一倍。工作模式能做得更好。

## 工作模式

设 $F$ 是分组长度为 $n$ 的分组密码，消息 $m = m_1 m_2 \dots m_\ell$ 已分成 $n$ 位的分组（必要时补上填充以填满最后一个分组）。

### ECB：不该使用的模式

**电码本**（Electronic Codebook，ECB）模式独立地加密每个分组：$c_i = F_k(m_i)$。它是确定性的，所以由 [[#prop-det-cpa]] 它不是 CPA-安全的；更糟的是，对两个及以上分组的消息它甚至连 EAV-安全都不满足，因为相等的明文分组在*同一条消息内部*给出相等的密文分组。著名的演示是一幅用 ECB 模式加密的位图图像，画面的轮廓依然清晰可见，因为大片相同的像素加密为相同的分组。绝不应该用 ECB 加密数据。

### CBC：密码分组链接

**CBC** 模式选取均匀的**初始向量** $\mathit{IV} = c_0 \in \{0,1\}^n$，并令
$$
c_i = F_k(c_{i-1} \oplus m_i) \quad (i = 1, \dots, \ell), \qquad m_i = F_k^{-1}(c_i) \oplus c_{i-1}.
$$
密文是 $c_0 c_1 \dots c_\ell$。链接使每个分组依赖于它前面的所有分组，而随机的 $\mathit{IV}$ 使加密随机化。Bellare、Desai、Jokipii 与 Rogaway（1997）证明：若 $F$ 是 PRP，则 CBC 是 CPA-安全的，对 $q$ 条形如 $\ell$ 个分组的消息，其优势的量级为 $(q\ell)^2/2^n$。CBC 解密需要 $F^{-1}$，所以 $F$ 必须是置换；加密是顺序的，但解密可以并行化。实践中会出事的地方有两处。其一，$\mathit{IV}$ 必须*不可预测*：若攻击者能预测下一次加密的 $\mathit{IV}$，它就能选择一个明文字块来检验对前面某个分组的猜测（[[#ex-predictable-iv]]）——TLS 1.0 把前一条记录最后一个分组用作下一个 $\mathit{IV}$，TLS 1.1（2006）正因此改用显式的随机 $\mathit{IV}$。其二，CBC 需要填充，而填充带来填充预言机（padding oracle）攻击，下面谈 CCA 时讨论。

### CTR：计数器模式

**计数器**（CTR）模式把分组密码变成流密码。选取均匀的 $\mathit{ctr} \in \{0,1\}^n$，并令
$$
c_0 = \mathit{ctr}, \qquad c_i = m_i \oplus F_k\big(\mathit{ctr} + i \bmod 2^n\big) \quad (i = 1, \dots, \ell).
$$
解密计算同样的密钥流再异或一次，所以 $F$ 不必可逆——一个 PRF 就够。两个方向都完全可并行，密钥流可以预先计算，而且不需要填充（截去最后一个密钥流分组的多余部分即可）。

::: example ECB、CBC 与 CTR 并排对比 {#ex-modes}
用 [[#ex-toy-feistel]] 的玩具密码，以 ECB 模式、以 $\mathit{IV} = $ `9c` 的 CBC 模式、以 $\mathit{ctr} = $ `f1` 的 CTR 模式，分别加密三个分组的消息 `41 41 42`（按字节，"分组"长 1 字节）。然后把 CBC 密文解密回来。
::: solution
一小段程序用 [[#ex-toy-feistel]] 的函数把三种结果都算出来：

```python
m = [0x41, 0x41, 0x42]
print("ECB", [hex(feistel_enc(b, keys)) for b in m])

prev, cbc = 0x9C, []                              # CBC，IV = 0x9c
for b in m:
    prev = feistel_enc(b ^ prev, keys)
    cbc.append(prev)
print("CBC", [hex(c) for c in cbc])

pads = [feistel_enc((0xF1 + i) % 256, keys) for i in (1, 2, 3)]
print("CTR", [hex(p) for p in pads], [hex(p ^ b) for p, b in zip(pads, m)])
```

```console
$ python3 modes.py
ECB ['0x2b', '0x2b', '0xa5']
CBC ['0x79', '0xd3', '0x12']
CTR ['0xe9', '0xdb', '0x77'] ['0xa8', '0x9a', '0x35']
```

ECB 得到 `2b 2b a5`：重复的明文分组表现为重复的密文分组。CBC 得到 `9c 79 d3 12`，CTR 得到 `f1 a8 9a 35`（第一个字节是 $\mathit{IV}$ 或计数器）：没有重复，因为每个分组所用的掩码都不同。解密 CBC 时 $m_1 = F_k^{-1}(\texttt{79}) \oplus \texttt{9c}$，$m_2 = F_k^{-1}(\texttt{d3}) \oplus \texttt{79}$，$m_3 = F_k^{-1}(\texttt{12}) \oplus \texttt{d3}$；运行 `feistel_dec` 重新得到 `41 41 42`。分组只有 1 字节时，计数器在 256 个分组后就会重复，而这正是真实的 128 位分组所能避免的。
:::
:::

::: theorem CTR 模式是 CPA-安全的 {#thm-ctr-cpa}
设 $F$ 是 PRF。对发起 $q$ 次加密查询、每条（和挑战一样）至多 $\ell$ 个分组的对手，随机化 CTR 模式满足
$$
\Prob\big[\mathsf{PrivK}^{\mathsf{cpa}}_{\mathcal A, \mathrm{CTR}}(n) = 1\big] \le \frac12 + \frac{2q\ell}{2^n} + \mathsf{negl}(n).
$$
:::

::: proof
与 [[#thm-prf-cpa]] 一样，把 $F_k$ 换成随机函数 $f$ 只使成功概率改变可忽略的量（归约用它的预言机计算密钥流来回答查询）。现在考虑随机函数实验。设挑战使用计数器 $\mathit{ctr}^*$ 和 $\ell^*$ 个分组，于是它的密钥流是 $f$ 在输入 $\mathit{ctr}^* + 1, \dots, \mathit{ctr}^* + \ell^*$（模 $2^n$）上的取值；设第 $i$ 个预言机查询使用 $\mathit{ctr}_i$ 和 $\ell_i$ 个分组。设 $\mathsf{Overlap}$ 是某个预言机查询的某个输入 $\mathit{ctr}_i + j$（$1 \le j \le \ell_i$）等于挑战的某个输入 $\mathit{ctr}^* + j'$（$1 \le j' \le \ell^*$）的事件。

若 $\mathsf{Overlap}$ 不发生，则挑战的密钥流由 $f$ 在其他地方从未求值过的点上的取值组成，于是它均匀且与对手看到的其他一切东西独立；挑战密文是一次一密，对手恰以概率 $\tfrac12$ 成功。所以成功概率 $\le \tfrac12 + \Prob[\mathsf{Overlap}]$。

对固定的查询 $i$，两串连续输入发生重叠仅当 $\mathit{ctr}^* - \ell_i + 1 \le \mathit{ctr}_i \le \mathit{ctr}^* + \ell^* - 1$（模 $2^n$），这是一个含 $\ell^* + \ell_i - 1 < 2\ell$ 个值的集合。$\mathit{ctr}_i$ 与 $\mathit{ctr}^*$ 中较晚选定的那个是均匀的且与另一个独立，所以这件事的概率小于 $2\ell/2^n$。对 $q$ 次查询用并集界得 $\Prob[\mathsf{Overlap}] < 2q\ell/2^n$。
:::

::: widget plot
f: 2^(x + L + 1 - n)
x: 0, 70
y: 0, 1
sliders: L=0:1:32; n=64:64:128
labels: 2q\ell/2^n
caption: CTR 的界 $2q\ell/2^n$ 对 $\log_2 q$ 的曲线，消息长 $2^L$ 个分组、分组长度 $n$。取 $n = 64$（旧的 64 位分组密码）、消息长 $2^{10}$ 个分组时，大约 $2^{53}$ 条消息后界就达到 $1$——消息更长则更快。取 $n = 128$ 时，整幅图上曲线始终贴着零。这个界是一份预算：密钥必须远在预算用光之前就更换。
:::

::: warning 同一密钥下绝不重复使用 nonce 或计数器
CTR 与 GCM 的许多部署不是随机选取 $\mathit{ctr}$，而是采用调用方提供的 **nonce**（"number used once"，只用一次的数）——比如消息编号——此时安全性证明要求同一密钥下的每个 nonce 互不相同。一旦某个 nonce 被重复，两条消息就用同一段密钥流加密，于是 $c \oplus c' = m \oplus m'$：这就是 [[cryptography/perfect-secrecy]] 中的两次一密。对 GCM 危害更大，因为重复的 nonce 还会泄露认证子密钥，让攻击者能够伪造消息。nonce 重用是典型的实现错误：重启后计数器归零、两台设备共用一把密钥、随机 96 位 nonce 抽得太频繁以致生日碰撞变得可能。请使用替你生成 nonce 的库 API，或使用 AES-GCM-SIV（RFC 8452）这类**抗 nonce 误用**的模式，绝不要自己发明模式。
:::

### GCM：Galois/计数器模式

GCM（McGrew 与 Viega，2004；NIST SP 800-38D，2007）是带 96 位 nonce 的 CTR 模式，再配上一个快速的认证器 GHASH，后者在 $\mathrm{GF}(2^{128})$ 中把一个多项式在一个秘密点 $H = F_k(0^{128})$ 处求值，多项式的系数就是各密文分组。结果是**认证加密**：接收方能够验证密文出自持有密钥的人，[[cryptography/hash-mac]] 将作解释。截至 2026 年，TLS 1.3 的认证加密算法就是 AES-GCM 与 ChaCha20-Poly1305。这不是细枝末节：*没有*认证的加密对主动攻击者是脆弱的，下面我们就会看到。

::: quiz
使用安全的分组密码并按规范使用下列模式时，哪些是 CPA-安全的？（多选。）

- [ ] ECB
- [x] 每条消息使用均匀随机 IV 的 CBC
- [ ] IV 取前一条消息最后一个密文分组的 CBC
- [x] 每条消息使用均匀随机初始计数器的 CTR
::: solution
ECB 是确定性的（[[#prop-det-cpa]]）。IV 可预测的 CBC——例如从前一条消息链接而来——会倒在选择明文攻击之下（[[#ex-predictable-iv]]）。使用随机 IV 的 CBC 和随机化的 CTR（[[#thm-ctr-cpa]]）是 CPA-安全的。
:::
:::

## 选择密文攻击

主动攻击者还能把修改过的密文发给接收方并观察它的反应——解密结果、错误消息、时间延迟。最强的标准定义还给对手一个**解密预言机**。

::: definition CCA-安全 {#def-cca}
实验 $\mathsf{PrivK}^{\mathsf{cca}}_{\mathcal A, \Pi}(n)$ 就是 $\mathsf{PrivK}^{\mathsf{cpa}}$，只是 $\mathcal A$ 全程还拥有对 $\mathsf{Dec}_k(\cdot)$ 的预言机访问，唯一不许查询的是挑战密文 $c$ 本身。若每个 PPT 对手的成功概率至多 $\tfrac12 + \mathsf{negl}(n)$，则 $\Pi$ 是 **CCA-安全**的。
:::

这条限制是必要的——否则游戏变得毫无意义——但它也是唯一的限制：对手可以询问与 $c$ 只差一个比特的密文。这就足以攻破本章除 GCM 外的每一个模式，因为它们都是**可延展的**（malleable）：对密文的改变会引起对明文的可以预见的改变。在 CTR 模式下，翻转 $c_i$ 的第 $j$ 位就翻转 $m_i$ 的第 $j$ 位；对手翻转挑战密文的一位，询问它的解密（这是另一个密文，所以允许），再翻回来，就读出了 $m_b$（[[#ex-ctr-cca]]）。

解密预言机看似人为，但真实系统确实提供了它的部分版本。在对采用常用 PKCS#7 填充（最后一个分组用 $p$ 个值为 $p$ 的字节填满）的 CBC 进行**填充预言机攻击**（Vaudenay，2002）时，接收方会通过一个与众不同的错误消息——或者干脆通过响应更快——泄露修改后的密文是否解密成了填充正确的数据。由于改变 $c_{i-1}$ 会受控地改变 $m_i$，每次查询这一个比特的信息就足以逐字节恢复明文。补救之道不是说错误消息说得更好听，而是采用一种设计：一切修改过的密文在解密之前就被拒绝——**认证加密**，它是 CCA-安全的（[[cryptography/hash-mac]]）。

::: example PKCS#7 填充及其检验 {#ex-pkcs7}
分组长 16 字节。用 PKCS#7 给 13 字节的消息 `HELLO, WORLD!` 和 16 字节的消息 `YELLOW SUBMARINE` 填充，并判断末尾分组为 `… 04 04 04 04` 与 `… 04 04 03 04` 的密文，接收方各接受哪一个。
::: solution
PKCS#7 追加 $p$ 个值为 $p$ 的字节，其中 $1 \le p \le 16$ 选取为使长度达到分组长度的整数倍；已经恰好填满最后一个分组的消息要再追加整整一个分组。于是 `HELLO, WORLD!`（$13$ 字节）加上 `03 03 03`，而 `YELLOW SUBMARINE`（$16$ 字节）加上十六进制为 `10`（即 $16$）的字节整整 16 个，这样接收方总能通过读最后一个字节无歧义地去掉填充：

```python
def pad(m: bytes, n: int = 16) -> bytes:
    p = n - len(m) % n                     # 1..n 个字节，绝不为 0
    return m + bytes([p]) * p

def unpad_ok(b: bytes) -> bool:
    p = b[-1]
    return 1 <= p <= len(b) and b[-p:] == bytes([p]) * p

print(pad(b"HELLO, WORLD!").hex(" ")[-8:], len(pad(b"YELLOW SUBMARINE")))
print(unpad_ok(b"x" * 12 + bytes([4, 4, 4, 4])), unpad_ok(b"x" * 12 + bytes([4, 4, 3, 4])))
```

```console
$ python3 pkcs7.py
03 03 03 32
True False
```

第一行显示第一条消息的三个填充字节。第一个末尾分组是合法的（四个 `04`），第二个不合法。CBC 模式下，攻击者只要修改 $c_{i-1}$，就控制了施加于 $m_i$ 的异或；若接收方对"填充错误"的报告方式不同于其他错误，那么对每个修改过的密文，它都回答了"末尾分组是否以合法填充结尾？"这个问题。每次查询这一个比特，就是填充预言机。（输出第一行的 `32` 是第二条消息填充后的长度：两个完整的分组。）
:::
:::

::: quiz
某服务器解密 AES-CBC 消息，酌情返回"填充错误"或"MAC 错误"，并在去掉填充之后校验*明文*的 MAC。哪种改动消除了填充预言机？

- [ ] 两种失败返回相同的错误字符串。
- [ ] 用 PKCS#7 填充代替零填充。
- [x] 对 IV 和密文计算 MAC，在解密之前以恒定时间先验证它。
- [ ] 使用 256 位的 AES 密钥。
::: solution
统一错误字符串仍会留下时序差异（只有填充合法时才计算 MAC），攻击者已经利用过这一点。可靠的补救是先加密后认证（encrypt-then-MAC）：先验证整个密文的 MAC，任何修改过的密文不经解密直接拒绝（[[cryptography/hash-mac]]）。更好的做法是通过库使用 GCM 这样的认证加密模式。密钥长度毫不相干。
:::
:::

::: history
模式 ECB、CBC、CFB、OFB 随 DES 一起在 FIPS 81（1980）中标准化；CBC 于 1976 年由 IBM 的 Ehrsam、Meyer、Smith 与 Tuchman 取得专利，计数器模式则由 Diffie 与 Hellman 于 1979 年提出。Horst Feistel 在 IBM 的 Lucifer 密码（1970 年代初）成为 DES，1977 年作为 FIPS 46 发表。Michael Luby 与 Charles Rackoff 于 1988 年证明了 Feistel 构造的安全性。Eli Biham 与 Adi Shamir 于 1990 年前后发表了差分密码分析，Mitsuru Matsui 于 1993 年发表了线性密码分析；EFF 的 "Deep Crack" 机器于 1998 年用 56 小时找到一把 DES 密钥。NIST 的 AES 竞赛（1997–2000）选定了 Joan Daemen 与 Vincent Rijmen 的 Rijndael，2001 年作为 FIPS 197 发表。Bellare、Desai、Jokipii 与 Rogaway（1997）给出了对 CBC 与 CTR 的第一个具体安全性分析；Serge Vaudenay 于 2002 年描述了填充预言机攻击；David McGrew 与 John Viega 于 2004 年设计了 GCM。
:::

## 后续内容

本章的每个模式都只保护机密性。[[cryptography/hash-mac]] 用消息认证码——CBC-MAC 与 HMAC——补上完整性，并把两者合并为认证加密，证明先加密后认证是 CCA-安全的，并解释 GCM 的认证器。CPA 与 CCA 博弈在 [[cryptography/public-key]] 中推广到公钥加密：那里的对手自己能加密，而 CCA-安全需要 RSA-OAEP 之类的构造。记录层使用 AES-GCM 或 ChaCha20-Poly1305 的 TLS 见 [[cryptography/protocols]]，从网络一侧的叙述见 [[networks/application-layer]]。侧信道——如对查表实现 AES 的缓存时序攻击——属于 [[security]]。

::: summary
- **分组密码**是 $n$ 位分组上的密钥置换，建模为强 PRP（[[#def-block-cipher]]）；它的安全性是由密码分析支持的假设。
- **Feistel 网络**用任意轮函数造出置换（[[#prop-feistel]]）；DES 是密钥 56 位的 16 轮 Feistel 密码，如今已被穷尽搜索攻破。**AES** 是定义在 $\mathrm{GF}(2^8)$ 上的替换-置换网络，分组 128 位，密钥 128/192/256 位。
- **CPA-安全**给对手一个加密预言机（[[#def-cpa]]）；确定性方案不可能满足它（[[#prop-det-cpa]]）。随机化的 PRF 加密（[[#thm-prf-cpa]]）、使用随机 IV 的 CBC 与随机化的 **CTR** 模式（[[#thm-ctr-cpa]]，界 $2q\ell/2^n$）是 CPA-安全的；**ECB** 连 EAV-安全都不满足。
- IV 必须不可预测（CBC），nonce 在同一密钥下绝不能重复（CTR、GCM）：重复的 CTR nonce 就是两次一密。
- **CCA-安全**再加一个解密预言机（[[#def-cca]]）；CBC 与 CTR 是可延展的，不满足它，这正是填充预言机攻击的根源。补救是认证加密（GCM、先加密后认证）。
- 使用经过评审的库提供的认证加密 API；绝不要自己写密码或模式。
:::

## 习题

::: exercise 手工解密玩具密码 {level=1}
用 [[#ex-toy-feistel]] 的玩具 Feistel 密码、轮密钥 `3, a, 6`，手工解密 `0xc8`，写出每个逆轮之后的状态。
::: solution
从 $(L, R) = (\texttt{c}, \texttt{8})$ 出发，依次以 $k = \texttt{6}, \texttt{a}, \texttt{3}$ 施加 $(L, R) \mapsto (R \oplus S[L \oplus k], L)$。$k = \texttt{6}$：$L \oplus k = \texttt{a}$，$S[\texttt{a}] = \texttt{f}$，新状态 $(\texttt{8} \oplus \texttt{f}, \texttt{c}) = (\texttt{7}, \texttt{c})$。$k = \texttt{a}$：$\texttt{7} \oplus \texttt{a} = \texttt{d}$，$S[\texttt{d}] = \texttt{7}$，新状态 $(\texttt{c} \oplus \texttt{7}, \texttt{7}) = (\texttt{b}, \texttt{7})$。$k = \texttt{3}$：$\texttt{b} \oplus \texttt{3} = \texttt{8}$，$S[\texttt{8}] = \texttt{3}$，新状态 $(\texttt{7} \oplus \texttt{3}, \texttt{b}) = (\texttt{4}, \texttt{b})$。明文是 `0x4b`；这些状态正是加密表从下往上的读法。
:::
:::

::: exercise ECB 泄露相等关系 {level=1 check="2"}
四个分组 $A, A, B, A$（$A \ne B$）组成的消息用 ECB 模式加密。出现了多少个不同的密文分组？（填入数字。）
::: solution
ECB 把相等的分组映为相等的分组，又因为是置换，把不同的分组映为不同的分组，所以密文是 $F_k(A), F_k(A), F_k(B), F_k(A)$，只有 $2$ 个不同的分组——这暴露出"第一、二、四个分组相等"的模式。CBC 或 CTR 会给出四个互不相干的分组。
:::
:::

::: exercise CBC 中的错误传播 {level=1 check="1"}
密文分组 $c_i$（$1 \le i < \ell$）的一位在传输中被翻转。接收方以 CBC 模式解密时，哪些明文分组会受影响，$m_{i+1}$ 中有几位被翻转？（填入 $m_{i+1}$ 中被翻转的位数。）
::: solution
$m_i = F_k^{-1}(c_i) \oplus c_{i-1}$：由于 $F_k^{-1}$ 是伪随机置换，$m_i$ 变成一堆乱码（约一半的比特改变）。$m_{i+1} = F_k^{-1}(c_{i+1}) \oplus c_i$：这里 $c_i$ 只通过异或进入，所以 $m_{i+1}$ 中恰好同样的 $1$ 位被翻转。$i + 1$ 之后的分组不受影响。这种可预见的单比特变化，正是填充预言机攻击所利用的可延展性。
:::
:::

::: exercise 域中乘法 {level=2 check="254"}
用 AES 多项式，以加倍法在 $\mathrm{GF}(2^8)$ 中计算 `0x57` $\cdot$ `0x13`：先算出 `0x57` $\cdot x^j$（$j = 0, \dots, 4$），再把 `0x13` 的比特选中的那些相加。（结果以十进制数填入。）
::: solution
加倍（乘 $x$，最高位溢出时用 `0x1b` 归约）：`57` $\cdot x = $ `ae`；`ae` $\cdot x = $ `15c` $\oplus$ `11b` $=$ `47`；`47` $\cdot x = $ `8e`；`8e` $\cdot x = $ `11c` $\oplus$ `11b` $=$ `07`。现在 `0x13` $= x^4 + x + 1$，所以乘积是 `57` $\oplus$ `ae` $\oplus$ `07` $=$ `fe`，即 $254$。（[[#ex-gf256]] 中的 `gmul(0x57, 0x13)` 打印 `0xfe`。）
:::
:::

::: exercise Feistel 轮数太少 {#ex-feistel-rounds level=2}
设轮函数是真正随机的。(a) 证明一轮 Feistel 网络不是 PRP。(b) 证明两轮网络同样不是 PRP：给出一个只用两次查询的区分器，并计算它的优势。
::: solution
(a) 一轮把 $(L, R)$ 映为 $(R, L \oplus f_1(R))$：输出的左半等于输入的右半。查询任意 $(L, R)$，若输出的左半等于 $R$ 就输出 $1$；对随机置换，这以概率 $2^{-n/2}$ 发生。优势 $1 - 2^{-n/2}$。

(b) 两轮把 $(L, R)$ 映为 $(L_2, R_2)$，其中 $L_2 = L \oplus f_1(R)$。查询 $(L, R)$ 与 $(L', R)$，$L \ne L'$ 而 $R$ 相同。则 $L_2 \oplus L_2' = L \oplus L'$，因为 $f_1(R)$ 被消掉了。此关系成立就输出 $1$。对随机置换，两个输出是互异的均匀随机分组，其左半满足该关系的概率约为 $2^{-n/2}$。优势 $\approx 1 - 2^{-n/2}$。三轮就能挫败这个攻击，这正是 Luby–Rackoff 定理的内容。
:::
:::

::: exercise 可预测的 IV {#ex-predictable-iv level=2}
设某个 CBC 实现每条消息使用的 $\mathit{IV}$ 在对手选消息之前就能被预测（例如前一条消息的最后一个密文分组）。证明该方案不是 CPA-安全的：给出一个对手，用单分组消息以概率 $1$ 赢得 CPA 游戏。
::: solution
对手先查询任意一条消息，学到密文，从而预测出挑战将使用的 $\mathit{IV}$ $v^*$。它取某个值 $u$，输出 $m_0 = v^* \oplus u$ 和作为另一个单分组的 $m_1$；收到 $c^* = F_k(v^* \oplus m_b)$，当 $b = 0$ 时它就是 $F_k(u)$。接着它预测下一个 $\mathit{IV}$ $v'$，向预言机查询 $v' \oplus u$，得到 $F_k(v' \oplus v' \oplus u) = F_k(u)$。若它等于 $c^*$ 就输出 $0$，否则输出 $1$。由于 $F_k$ 是置换，它永远正确。在真实系统里，同样的想法能让一个能注入选择明文的攻击者检验对某个秘密分组的猜测；补救是每条消息用一个全新的、不可预测的 $\mathit{IV}$。
:::
:::

::: exercise CTR 界的数值 {level=2 check="2^(-33)"}
用分组 64 位的密码以随机化 CTR 模式加密 $q = 2^{20}$ 条消息，每条 $\ell = 2^{10}$ 个分组。计算 [[#thm-ctr-cpa]] 的界 $2q\ell/2^n$，再对 $q = 2^{40}$ 重算一遍。（填入第一个值。）
::: solution
$2q\ell/2^{64} = 2^{1 + 20 + 10 - 64} = 2^{-33} \approx 1.2 \times 10^{-10}$，小得很安心。$q = 2^{40}$ 时：$2^{1 + 40 + 10 - 64} = 2^{-13} \approx 1.2 \times 10^{-4}$，作为一个安全界就大得让人不安了。若换成 128 位分组，第二个数字将是 $2^{-77}$。
:::
:::

::: exercise CTR 与 CBC 不是 CCA-安全的 {#ex-ctr-cca level=3}
(a) 给出一个对手，以概率 $1$ 赢得针对随机化 CTR 模式的 $\mathsf{PrivK}^{\mathsf{cca}}$。(b) 对使用随机 IV 的 CBC 模式做同样的事，挑战只用单个分组。(c) 解释为什么一般地，加一条"解密出的消息不是合法 UTF-8 文本就拒绝"的检查并不能修复这两个模式中的任何一个。
::: solution
(a) 输出 $m_0 = 0^n$、$m_1 = 1^n$（各一个分组）。收到 $\langle \mathit{ctr}, c_1\rangle$；向解密预言机查询 $\langle \mathit{ctr}, c_1 \oplus 0^{n-1}1\rangle$，它与挑战不同，所以是允许的。答案是 $m_b \oplus 0^{n-1}1$；把最后一位翻回来，若结果为 $0^n$ 就输出 $0$。

(b) 挑战是 $\langle c_0, c_1\rangle$，其中 $m_b = F_k^{-1}(c_1) \oplus c_0$。查询 $\langle c_0 \oplus 0^{n-1}1, c_1\rangle$ 的解密；答案是 $m_b \oplus 0^{n-1}1$，然后与 (a) 同样处理。翻转 IV 的一位，就翻转第一个明文分组的同一位。

(c) 合法性检查只是限制了攻击者*能*做哪些修改（它可以挑选 $m_0, m_1$ 和要翻转的位，使两个结果都保持合法），更糟的是，它把接收方变成了一个对每个修改过的密文的解密泄露一个比特——"合法还是不合法"——的预言机，而这正是填充预言机攻击所利用的。对抗主动攻击者的安全需要密文的完整性，也就是认证加密。
:::
:::

::: exercise 实现 CTR 并观察 nonce 重复 {level=3}
用 [[#ex-toy-feistel]] 的玩具密码 `feistel_enc`（分组 1 字节），实现字节串的 CTR 模式加密与解密，起始计数器由调用方提供。用同一个计数器 `0x10` 加密 `b"ATTACK"` 和 `b"RETIRE"`，验证两个密文异或等于两个明文异或。为什么这与密码是不是玩具无关？
::: solution
```python
def ctr(data: bytes, ctr0: int, keys) -> bytes:
    """玩具 1 字节分组的 CTR 模式：不安全，仅供学习。"""
    return bytes(b ^ feistel_enc((ctr0 + i + 1) % 256, keys) for i, b in enumerate(data))

c1 = ctr(b"ATTACK", 0x10, keys)
c2 = ctr(b"RETIRE", 0x10, keys)                  # 同一个计数器：错误做法
print(ctr(c1, 0x10, keys))                       # 解密就是同一个运算
print(bytes(x ^ y for x, y in zip(c1, c2)) == bytes(x ^ y for x, y in zip(b"ATTACK", b"RETIRE")))
```

```console
$ python3 ctr_reuse.py
b'ATTACK'
True
```

两次加密都把明文与同一段密钥流 $F_k(\mathit{ctr}_0 + 1), F_k(\mathit{ctr}_0 + 2), \dots$ 异或，所以密钥流在 $c_1 \oplus c_2$ 中被消掉。这里没有用到玩具密码的任何弱点：换成 AES 也会发生同样的事，因为泄露出在模式的使用上，而不是原语上。[[#thm-ctr-cpa]] 的证明假设计数器随机且相互独立，而重复的计数器正是 $\mathsf{Overlap}$ 事件。
:::
:::
