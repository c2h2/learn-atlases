加密藏住了消息所说的内容，却挡不住任何人去改动它。在 [[cryptography/block-ciphers]] 中我们看到，翻转 CTR 密文的一位就会翻转明文的同一位——因此，一个只知道某条银行转账消息的金额写在第 20–27 字节的攻击者，根本不必知道密钥就能篡改金额；我们也看到，可延展性会把一句无害的错误消息变成填充预言机。完整性需要自己的工具：**消息认证码**（message authentication code，MAC），即用秘密密钥从消息算出的一段短标签，没有密钥的人无法为新消息算出它。

本章的另一件工具是**密码学哈希函数**：一种没有密钥的函数，如 SHA-256，把任意长的输入压缩成短摘要，使得没有人能找出两个具有相同摘要的输入。哈希函数为文件和软件发行版做指纹，是广泛使用的 MAC——HMAC——的基础，并使得对长消息做数字签名成为可能（[[cryptography/signatures]]）。我们定义 MAC 及其安全性，用伪随机函数构造它们，定义抗碰撞性，精确计算**生日界**，分析 SHA-2 背后的 Merkle–Damgård 构造及其长度扩展弱点，描述 SHA-3 的海绵构造，最后把加密与 MAC 组合成**认证加密**，并证明先加密后认证能抵抗选择密文攻击。

## 消息认证码

::: definition 消息认证码 {#def-mac}
**MAC** 由三个 PPT 算法组成：$\mathsf{Gen}(1^n)$ 输出密钥 $k$；$\mathsf{Mac}_k(m)$ 输出**标签** $t$；确定性的 $\mathsf{Vrfy}_k(m, t)$ 输出 $1$（合法）或 $0$（非法）。正确性：对所有 $k$ 和 $m$，$\mathsf{Vrfy}_k(m, \mathsf{Mac}_k(m)) = 1$。

在实验 $\mathsf{MacForge}_{\mathcal A, \Pi}(n)$ 中，选取密钥 $k$，$\mathcal A$ 获得对 $\mathsf{Mac}_k(\cdot)$ 的预言机访问；它输出一对 $(m, t)$，若 $\mathsf{Vrfy}_k(m, t) = 1$ 且 $m$ 从未被查询过预言机则成功。若每个 PPT $\mathcal A$ 的成功概率都可忽略，则 $\Pi$ **在自适应选择消息攻击下存在不可伪造性**——简称**安全**。若即便成功只要求*对* $(m, t)$ 本身从未被预言机返回过，结论仍然成立，则称其是**强**不可伪造的。
:::

"存在性"是指攻击者只要对*任何*一条新消息伪造出标签就算赢，哪怕消息毫无意义：方案无从知道哪些消息对应用重要。"自适应选择消息"是指它可以先对自己选的消息获取标签。定义没有处理**重放**——重新发送一条旧的、带合法标签的消息——因为 MAC 无从判断一条消息是不是新的；协议为此加上序号或时间戳（[[cryptography/protocols]]）。

对一条分组长的消息，PRF 就是安全的 MAC。

::: theorem PRF 就是 MAC {#thm-prf-mac}
设 $F$ 是输入输出均为 $n$ 位的 PRF。取 $\mathsf{Mac}_k(m) = F_k(m)$（$m \in \{0,1\}^n$），且 $\mathsf{Vrfy}_k(m, t) = 1$ 当且仅当 $t = F_k(m)$，这样得到的 MAC 是安全的：每个 PPT 对手的伪造概率至多 $2^{-n} + \mathsf{negl}(n)$。
:::

::: proof
给定伪造者 $\mathcal A$，构造 PRF 区分器 $D^O$：运行 $\mathcal A$，对每个标签查询 $m$ 回答 $O(m)$；当 $\mathcal A$ 输出未曾查询过的 $m$ 对应的 $(m, t)$ 时，查询 $O(m)$，并当且仅当回答等于 $t$ 时输出 $1$。若 $O = F_k$，$D$ 输出 $1$ 恰当 $\mathcal A$ 伪造成功。若 $O = f$ 是随机函数，则 $f(m)$ 在未查询的点上是均匀的且与 $\mathcal A$ 的观察独立，于是 $t = f(m)$ 的概率恰为 $2^{-n}$。故 $\Prob[\mathcal A \text{ 伪造成功}] \le 2^{-n} + \mathsf{negl}(n)$。
:::

长消息需要扩展定义域。**CBC-MAC** 以零 IV 运行 CBC 模式，只输出最后一个分组：$t_0 = 0^n$，$t_i = F_k(t_{i-1} \oplus m_i)$，$t = t_\ell$。Bellare、Kilian 与 Rogaway（1994）证明了它对*固定* $\ell$ 个分组的消息是安全的；对变长消息它不安全（[[#ex-cbc-mac]]）。标准补救 **CMAC**（NIST SP 800-38B，2005）把一个由密钥导出的掩码异或进最后一个分组。注意 CBC-MAC 用的是*固定* IV、只输出一个分组，而 CBC 加密用的是*随机* IV、输出所有分组：把这两点弄反，两样都会坏。

::: warning 以恒定时间验证标签，且绝不在未验证消息的明文上先动手
多数语言里写成 `if tag == expected:` 的标签检查逐字节比较、遇到第一个不同就停止，于是运行时间会泄露猜测的标签有多少个前导字节是对的。能测量响应时间的攻击者便能逐字节找出一个合法标签。请使用恒定时间的比较，例如 Python 的 `hmac.compare_digest`；更好的做法是调用替你完成验证的库函数。同样，接收方必须*先*验证标签，再以任何方式对消息采取行动——先于解密、解析或解压缩——否则处理本身就变成了预言机。更一般地说：本章的这些构造，为了真正的用途，一个都不要自己实现；去调用经过评审的库的 HMAC 或认证加密 API。
:::

## 哈希函数与抗碰撞性

哈希函数把任意长的输入映到短输出，所以它大量存在碰撞——满足 $H(x) = H(x')$ 的一对 $x \ne x'$。我们要的不是没有碰撞，而是没有人能*找到*一个。一个固定的函数有固定的碰撞，算法干脆把它打印出来就行；要让"没有高效算法能找到碰撞"在渐近意义上有意义，我们考虑一族由公开密钥 $s$ 标记的函数。

::: definition 抗碰撞性 {#def-crhf}
输出长度为 $\ell(n)$ 的**哈希函数**是一对 PPT 算法 $(\mathsf{Gen}, H)$：$\mathsf{Gen}(1^n)$ 输出公开密钥 $s$，$H^s$ 把串映到 $\{0,1\}^{\ell(n)}$。在实验 $\mathsf{HashColl}_{\mathcal A}(n)$ 中，$\mathcal A$ 收到 $s$ 并输出 $x, x'$；若 $x \ne x'$ 且 $H^s(x) = H^s(x')$ 则成功。若每个 PPT $\mathcal A$ 的成功概率都可忽略，则称该哈希函数是**抗碰撞的**。
:::

两个较弱的概念常常就够用：

- **抗第二原像性**：给定 $s$ 和均匀的 $x$，要找到满足 $H^s(x') = H^s(x)$ 的 $x' \ne x$ 是困难的；
- **抗原像性**（单向性）：给定 $s$ 和均匀 $x$ 之下的 $y = H^s(x)$，要找到任何满足 $H^s(x') = y$ 的 $x'$ 是困难的。

抗碰撞性蕴含抗第二原像性（第二原像*本身*就是碰撞）；对压缩得足够厉害的哈希函数，抗第二原像性蕴含抗原像性。实际部署的哈希函数如 SHA-256 是单个固定函数；对它们，"抗碰撞"按具体方式解读：没有人知道碰撞，而已知最好的方法就是那个通用方法，我们现在来分析它。

### 生日界

从大小为 $N$ 的集合中独立均匀地选取 $q$ 个值。什么时候重复变得可能？$q = 23$ 个人、$N = 365$ 个生日时，概率已超过 $1/2$——**生日悖论**。没有碰撞的精确概率，等于第二个值避开第一个、第三个避开前两个、如此下去的概率：
$$
\Prob[\text{无碰撞}] = \prod_{i=1}^{q-1}\left(1 - \frac{i}{N}\right).
$$ {#eq-birthday-exact}

::: example 精确计算的生日概率 {#ex-birthday}
$N = 365$ 时，计算 $q = 10, 20, 23, 30, 50$ 个人发生碰撞的精确概率，再求 $N = 2^{16}$ 时使概率至少 $1/2$ 的最小 $q$。
::: solution
直接求值 [[#eq-birthday-exact]]（$N$ 大时用 `log1p` 保持精度），并用精确有理数运算确认 $q = 23$：

```python
import math
from fractions import Fraction

def p_collision(q, N):
    """q 次从 N 个值中均匀抽取不全都互异的精确概率。"""
    return -math.expm1(sum(math.log1p(-i / N) for i in range(1, q)))

for q in (10, 20, 23, 30, 50):
    print(q, round(p_collision(q, 365), 4))

exact = 1 - math.prod(Fraction(365 - i, 365) for i in range(23))
print(float(exact))

q = 1
while p_collision(q, 2**16) < 0.5:
    q += 1
print(q, p_collision(q, 2**16))
```

```console
$ python3 birthday.py
10 0.1169
20 0.4114
23 0.5073
30 0.7063
50 0.9704
0.5072972343239854
302 0.5007224895231962
```

$23$ 个人时概率为 $0.5073$；$50$ 人时超过 $97\%$。对 $N = 2^{16} = 65\,536$ 个值，抽 $302$ 次就够了——接近 $\sqrt{2\ln 2 \cdot N} \approx 1.1774 \cdot 2^{8} \approx 301.4$。
:::
:::

::: theorem 生日界 {#thm-birthday}
从大小为 $N$ 的集合中独立均匀地选取 $q$ 个值，设 $\mathsf{Coll}$ 为其中有两个相等的事件。则
$$
\Prob[\mathsf{Coll}] \le \frac{q(q-1)}{2N},
$$
且若 $q \le \sqrt{2N}$，
$$
\Prob[\mathsf{Coll}] \ge \left(1 - \frac1e\right)\frac{q(q-1)}{2N} \ge \frac{q(q-1)}{4N}.
$$
:::

::: proof
*上界。*$\binom q2$ 对中的每一对，两个值相等概率为 $1/N$；由并集界 $\Prob[\mathsf{Coll}] \le \binom q2/N = q(q-1)/(2N)$。

*下界。*在 [[#eq-birthday-exact]] 中使用 $1 - x \le e^{-x}$：
$$
\Prob[\neg\mathsf{Coll}] = \prod_{i=1}^{q-1}\left(1 - \frac iN\right) \le \prod_{i=1}^{q-1}e^{-i/N} = e^{-q(q-1)/(2N)} .
$$
令 $x = q(q-1)/(2N)$；由于 $q(q-1) < q^2 \le 2N$，有 $0 \le x < 1$。函数 $g(x) = 1 - e^{-x}$ 是凹的，且 $g(0) = 0$、$g(1) = 1 - 1/e$，所以在 $[0, 1]$ 上它位于弦之上：$g(x) \ge (1 - 1/e)x$。于是 $\Prob[\mathsf{Coll}] \ge 1 - e^{-x} \ge (1 - 1/e)x$，而 $1 - 1/e \approx 0.632 > 1/2$ 给出最后一个不等号。
:::

所以碰撞大约在 $\sqrt N$ 次采样后出现；$q = \sqrt{2N\ln 2} \approx 1.18\sqrt N$ 时概率约为 $1/2$。对输出 $\ell$ 位的哈希，$N = 2^\ell$，**通用生日攻击**——哈希随机输入、寻找重复——在约 $2^{\ell/2}$ 次求值后找到碰撞，完全不需要知道函数如何工作。（借助 Floyd 或 Pollard rho 这类找环方法，可以把内存降到常数，代价只是时间上的一个小常数。）因此，"128 位安全水平"的抗碰撞性需要 **256 位**输出，而该水平的抗原像性只需要 128 位。

::: widget plot
f: 1 - exp(-x*(x-1)/(2*N))
x: 0, 100
y: 0, 1
sliders: N=365:5:2000
hlines: 0.5
labels: 1 - e^{-q(q-1)/2N}
caption: 从 $N$ 个值中取 $q$ 个均匀值发生碰撞的概率，用近似式 $1 - e^{-q(q-1)/(2N)}$ 画出，只要 $q \ll N$ 它就精确。$N = 365$ 时曲线在 $q = 22$ 与 $q = 23$ 之间穿过 $1/2$。移动 $N$ 观察交点：把 $N$ 变为四倍，所需样本数只翻倍，因为交点位于 $q \approx 1.18\sqrt N$。
:::

::: quiz
某哈希函数输出 160 位。通用生日攻击以约 $1/2$ 的概率找到碰撞大约需要多少次求值？

- [ ] $2^{160}$
- [ ] $2^{159}$
- [x] $2^{80}$
- [ ] $160^2$
::: solution
$N = 2^{160}$，碰撞大约在 $1.18\sqrt N \approx 2^{80.2}$ 次求值后出现（[[#thm-birthday]]）。这就是为什么 160 位的 SHA-1 在对它的密码分析取得进展之前，抗碰撞性至多只有 80 位；也是为什么今天输出 256 位才是标准。
:::
:::

## Merkle–Damgård 构造

如何对任意长的输入做哈希？**Merkle–Damgård** 构造迭代一个定长的**压缩函数** $h^s\colon \{0,1\}^{2n} \to \{0,1\}^n$（更一般地，从 $n + b$ 位到 $n$ 位）。

::: algorithm Merkle–Damgård {#alg-md}
用压缩函数 $h^s$ 对长度 $L < 2^n$ 位的 $x$ 做哈希：

1. 用零把 $x$ 补齐到 $n$ 位的整数倍，分成 $x_1, \dots, x_B$ 各块。追加最后一个块 $x_{B+1} = \langle L\rangle$，即 $x$ 的长度的二进制表示（**长度填充**，或称 **Merkle–Damgård 加固**）。
2. 令 $z_0 = \mathit{IV}$，一个固定的 $n$ 位串。
3. 对 $i = 1, \dots, B + 1$：$z_i \gets h^s(z_{i-1} \,\|\, x_i)$。
4. 输出 $H^s(x) = z_{B+1}$。
:::

::: theorem Merkle–Damgård 保持抗碰撞性 {#thm-md}
若 $h^s$ 是抗碰撞的，则 [[#alg-md]] 的 $H^s$ 也是。
:::

::: proof
我们证明：$H^s$ 的任何碰撞 $x \ne x'$ 都有效地给出 $h^s$ 的一个碰撞；因此，以不可忽略概率找到前者的对手，同样多次地找到后者。设 $x$ 与 $x'$ 的长度为 $L, L'$，块为 $x_1, \dots, x_{B+1}$ 与 $x'_1, \dots, x'_{B'+1}$，链值为 $z_i, z'_i$。

*情形 $L \ne L'$。*此时 $x_{B+1} = \langle L\rangle \ne \langle L'\rangle = x'_{B'+1}$，于是最后两个输入 $z_B \| x_{B+1}$ 与 $z'_{B'} \| x'_{B'+1}$ 不同，而 $h^s$ 把它们都映到 $H^s(x) = H^s(x')$：这就是一个碰撞。

*情形 $L = L'$。*此时 $B = B'$。记第 $i$ 次压缩的输入为 $I_i = z_{i-1} \| x_i$ 与 $I'_i = z'_{i-1} \| x'_i$。由于 $x \ne x'$ 而长度相同，它们必在某一块上不同，故某个 $i$ 有 $I_i \ne I'_i$。取满足 $I_i \ne I'_i$ 的*最大*的 $i \le B + 1$，记为 $i^*$。若 $i^* = B + 1$，则 $h^s(I_{B+1}) = H^s(x) = H^s(x') = h^s(I'_{B+1})$ 就是一个碰撞。否则 $I_{i^*+1} = I'_{i^*+1}$，特别地意味着 $z_{i^*} = z'_{i^*}$，即 $h^s(I_{i^*}) = h^s(I'_{i^*})$ 且 $I_{i^*} \ne I'_{i^*}$：又是一个碰撞。

找 $i^*$ 只需把各块扫过一遍。
:::

长度块很要紧：没有它，攻击者只要找到单个块 $x_1$ 满足 $h^s(\mathit{IV} \| x_1) = \mathit{IV}$，就得到了 $x$ 与 $x_1 \| x$ 之间的碰撞。SHA-256（FIPS 180-4）是 Merkle–Damgård 哈希，链值 $256$ 位、消息块 $512$ 位；它的填充追加一个 `1` 比特、若干零和 64 位的消息长度。它的压缩函数使用从一个专门设计的、以消息块为密钥的分组密码 $E$ 出发的 **Davies–Meyer** 构造 $h(z \,\|\, x) = E_x(z) \oplus z$。

```python
import hashlib
print(hashlib.sha256(b"abc").hexdigest())
print(hashlib.sha256(b"abd").hexdigest())
```

```console
$ python3 sha.py
ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad
a52d159f262b2c6ddb724a61840befc36eb30c88877a4030b65cbe86298449c9
```

改一个字母，摘要就面目全非——又是雪崩效应。第一行是标准中给出的测试向量。

::: example SHA-256 的填充 {#ex-sha-pad}
SHA-256 对 $L$ 位的消息这样填充：先追加一个 `1` 比特，再追加 $z \ge 0$ 个零比特使 $L + 1 + z \equiv 448 \pmod{512}$，最后把 $L$ 作为 64 位整数写入。3 字节、55 字节、56 字节和 64 字节的消息各要处理多少个 512 位块？
::: solution
填充后的长度是至少为 $L + 1 + 64 = L + 65$ 的最小 $512$ 的倍数。

| 消息 | $L$（位） | $L + 65$ | 块数 |
|---|---|---|---|
| 3 字节（`abc`） | 24 | 89 | 1 |
| 55 字节 | 440 | 505 | 1 |
| 56 字节 | 448 | 513 | 2 |
| 64 字节 | 512 | 577 | 2 |

`abc` 的单个块是 `61 62 63 80`，随后 $52$ 个零字节，最后是长度 `00 00 00 00 00 00 00 18`（$24$ 的十六进制）。55 字节是塞得进一个块的最长消息。填充只取决于 $L$，这就是为什么知道带密钥前缀消息 $k \,\|\, m$ 的*长度*的人就知道它的填充——这正是下面长度扩展背后的观察。
:::
:::

::: quiz
某服务用 $t = \mathrm{SHA\text{-}256}(k \,\|\, m)$ 给请求做认证，其中 $k$ 是秘密。哪种改动能使它成为安全的 MAC？

- [ ] 保持构造不变，但把 $k$ 取到 256 位。
- [ ] 改用 $t = \mathrm{SHA\text{-}256}(m \,\|\, k)$，把密钥挪到末尾。
- [x] 改用 $t = \mathrm{HMAC\text{-}SHA256}_k(m)$。
- [ ] 改用更快的 MD5。
::: solution
密钥前缀构造无论密钥多长都容许长度扩展。把密钥挪到末尾虽然避开长度扩展，却让伪造归结为在未加密钥的哈希内部状态上找一个碰撞 $m, m'$——一个更弱且不带密钥的假设，而对 MD5 这类已知存在碰撞的哈希更是直接被攻破。HMAC 是带证明的标准构造（[[#def-hmac]]）；KMAC 或带密钥前缀的普通 SHA-3 也可以。MD5 存在实用碰撞，绝不能使用。
:::
:::

### 长度扩展

Merkle–Damgård 有一个不是碰撞、却照样咬人的结构性性质：输出*就是*最后一个链值。任何知道 $H(x)$ 和 $x$ 的长度——但不知道 $x$——的人都能继续迭代，对任意自选的 $y$ 算出 $H(x \,\|\, \mathit{pad}(x) \,\|\, y)$，其中 $\mathsf{pad}(x)$ 是哈希追加在 $x$ 后面的填充。这个**长度扩展**性质对抗碰撞性无害，但对诱人的 MAC $\mathsf{Mac}_k(m) = H(k \,\|\, m)$ 是致命的：从 $m$ 的一个合法标签，攻击者不知道 $k$ 就能算出 $m \,\|\, \mathit{pad} \,\|\, y$ 的合法标签，这是一次存在性伪造。2000 年代若干用这种方式给请求签名的 Web API 不得不重新设计。补救办法是：用把链值藏在第二个带密钥的哈希之下的 HMAC；用输出不是其全部内部状态的哈希（SHA-512/256 做截断；SHA-3 是海绵）；或者干脆使用一个生来就是 MAC 的构造。

### HMAC

::: definition HMAC {#def-hmac}
设 $H$ 是块长为 $b$ 字节的 Merkle–Damgård 哈希，把密钥 $k$ 用零补到 $b$ 字节（更长则先对它做哈希）。设 $\mathit{ipad}$ 与 $\mathit{opad}$ 是把字节 `0x36` 与 `0x5c` 各重复 $b$ 次。则
$$
\mathrm{HMAC}_k(m) = H\big((k \oplus \mathit{opad}) \,\|\, H((k \oplus \mathit{ipad}) \,\|\, m)\big).
$$
:::

内层哈希压缩消息；外层哈希在一个看起来独立的密钥之下、作用于一个短的定长输入，从而阻止长度扩展。Bellare、Canetti 与 Krawczyk（1996）证明了：只要压缩函数以其链值输入为密钥时是 PRF，HMAC 就是安全的 PRF——从而是安全的 MAC；它已被标准化为 RFC 2104（1997）与 FIPS 198。HMAC 还是 TLS 1.3 所用密钥派生函数 HKDF 的基础（[[cryptography/protocols]]）。

::: example 用标准库做 HMAC {#ex-hmac}
以密钥 `key` 计算消息 `The quick brown fox jumps over the lazy dog` 的 HMAC-SHA256，并正确地验证收到的标签。
::: solution
Python 标准库的 `hmac` 模块实现的就是 [[#def-hmac]]：

```python
import hashlib, hmac

key, msg = b"key", b"The quick brown fox jumps over the lazy dog"
tag = hmac.new(key, msg, hashlib.sha256).hexdigest()
print(tag)

def verify(key, msg, received_hex):
    expected = hmac.new(key, msg, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, received_hex)   # 恒定时间比较

print(verify(key, msg, tag), verify(key, msg + b".", tag))
```

```console
$ python3 hmac_demo.py
f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8
True False
```

这个标签是广为公布的测试值。消息改一个字符，验证就失败。密钥 `key` 只是示例；真正的密钥是从 `secrets.token_bytes(32)` 或 `os.urandom(32)` 取出的 32 个均匀随机字节，绝不是一段口令或一个单词。
:::
:::

## SHA-3 与海绵

在 MD5 出现实用碰撞（王晓峰与同事，2004）、对 SHA-1 的攻击不断进步之后，NIST 于 2007–2012 年为一种设计不同的新哈希函数举行了公开竞赛。优胜者是 Bertoni、Daemen、Peeters 与 Van Assche 的 Keccak，2015 年作为 SHA-3 标准化为 FIPS 202。第一个公开的 SHA-1 碰撞于 2017 年发表（Stevens 与同事）；截至 2026 年 SHA-2 仍未被攻破，SHA-2 与 SHA-3 都是标准。

Keccak 是一个**海绵**。它的状态为 $b = 1600$ 位，分为 **rate**（速率）部分的 $r$ 位与 **capacity**（容量）部分的 $c = b - r$ 位，并使用 $\{0,1\}^{1600}$ 的一个固定公开置换 $f$（24 轮简单的位操作）。

- **吸收。**把消息补到 $r$ 位的整数倍，分成 $P_1, P_2, \dots$ 各块。从全零状态出发，对每个块把 $P_i$ 异或进 rate 部分，然后施加 $f$。
- **挤压。**输出 rate 部分；若需要更多输出，再施加 $f$ 并再次输出 rate 部分。

capacity 部分从不被外界直接读写，安全性正栖身其中：通用攻击大约需要 $2^{c/2}$ 次 $f$ 的求值。SHA3-256 取 $c = 512$（于是 $r = 1088$），给出 256 位输出、128 位抗碰撞性和 256 位抗原像性。因为输出只是状态的一部分，海绵不允许长度扩展，对 SHA-3 而言简单的 $H(k \,\|\, m)$ 就是安全的 MAC（标准化为 KMAC）。同一个置换还给出可输出扩展的函数 SHAKE128 与 SHAKE256，它们按要求产生任意多的输出位，并被用在后量子标准内部（[[cryptography/post-quantum]]）。

```python
print(hashlib.sha3_256(b"abc").hexdigest())
```

```console
$ python3 sha3.py
3a985da74fe225b2045c172d6bd390bd855f086e3e9d525b46bfe24511431532
```

## 认证加密

现在把机密性与完整性合到一起。

::: definition 认证加密 {#def-ae}
若没有带加密预言机的 PPT 对手能以不可忽略的概率输出一个新的、能被成功解密（解出不为错误符号 $\bot$ 的东西）的密文（预言机没有返回过的），则称一个私钥加密方案是**不可伪造的**。若它同时是 CCA-安全且不可伪造的，则称它是**认证加密**方案。
:::

用一个 CPA-安全的加密方案和一个 MAC 组合，有三种显然的做法，使用*独立*的密钥 $k_E$ 与 $k_M$：

- **加密并认证**（encrypt-and-MAC）：发送 $\mathsf{Enc}_{k_E}(m)$ 和 $\mathsf{Mac}_{k_M}(m)$——SSH 采用；
- **先认证后加密**（MAC-then-encrypt）：发送 $\mathsf{Enc}_{k_E}(m \,\|\, \mathsf{Mac}_{k_M}(m))$——TLS 1.2 及更早版本连同 CBC 采用；
- **先加密后认证**（encrypt-then-MAC）：发送 $c = \mathsf{Enc}_{k_E}(m)$ 和 $t = \mathsf{Mac}_{k_M}(c)$——IPsec ESP 采用。

一般而论，只有最后一种是安全的。加密并认证可能泄露：MAC 未必隐藏它的消息，而确定性的 MAC 会暴露两条消息是否相等。先认证后加密对特定组合可以是安全的，但接收方必须先解密（并去填充）才能检查标签，[[cryptography/block-ciphers]] 中 TLS 的填充预言机正是这样来的。先加密后认证则在解密之前拒绝每一个修改过的密文。

::: theorem 先加密后认证是 CCA-安全的 {#thm-etm}
设 $\Pi_E$ 是 CPA-安全的，$\Pi_M$ 是强不可伪造的 MAC，密钥相互独立。则先加密后认证——$\mathsf{Enc}'_{k_E, k_M}(m) = \langle c, t\rangle$，其中 $c \gets \mathsf{Enc}_{k_E}(m)$、$t \gets \mathsf{Mac}_{k_M}(c)$，解密在 $\mathsf{Vrfy}_{k_M}(c, t) = 0$ 时输出 $\bot$、否则输出 $\mathsf{Dec}_{k_E}(c)$——是 CCA-安全的（事实上是一个认证加密方案）。
:::

::: proof
设 $\mathcal A$ 是攻击 $\Pi'$ 的 $\mathsf{PrivK}^{\mathsf{cca}}$ 中的 PPT 对手，发起至多 $q$ 次解密查询。称解密查询 $\langle c, t\rangle$ 为**合法且新的**，若 $\mathsf{Vrfy}_{k_M}(c, t) = 1$ 且 $\langle c, t\rangle$ 不是加密预言机返回给 $\mathcal A$ 的（也不是挑战密文，那是 $\mathcal A$ 不许查询的）。设 $\mathsf{VQ}$ 是 $\mathcal A$ 至少发起一次这样的查询的事件。于是
$$
\Prob[\mathcal A \text{ 成功}] \le \Prob[\mathsf{VQ}] + \Prob[\mathcal A \text{ 成功} \wedge \neg\mathsf{VQ}] .
$$

*$\Prob[\mathsf{VQ}]$ 是可忽略的。*构造 MAC 伪造者 $\mathcal F$：它自己选 $k_E$ 和一个均匀的下标 $j \in \{1, \dots, q\}$，运行 $\mathcal A$。它回答加密查询（以及挑战）的方式是用 $k_E$ 加密，并从自己的 $\mathsf{Mac}$ 预言机取得标签。它回答解密查询 $\langle c, t\rangle$ 的方式是：若这一对先前被加密预言机输出过，就返回存下的明文，否则返回 $\bot$——只是到第 $j$ 次解密查询时它停下来，把 $(c, t)$ 作为伪造输出。在第一次合法且新的查询之前，这个模拟是精确的：每个新的对都回答 $\bot$，除非该对合法，这就是正确答案。若 $\mathsf{VQ}$ 发生且 $j$ 恰是第一个合法且新的查询的下标——概率至少 $\Prob[\mathsf{VQ}]/q$——则 $\mathcal F$ 输出一个它的预言机从未返回过的合法对 $(c, t)$，这是一次强伪造。于是 $\Prob[\mathsf{VQ}] \le q\cdot\Prob[\mathcal F \text{ 伪造成功}]$，是可忽略的。

*$\Prob[\mathcal A \text{ 成功} \wedge \neg\mathsf{VQ}] \le \tfrac12 + \mathsf{negl}(n)$。*构造攻击 $\Pi_E$ 的 CPA 对手 $\mathcal A_E$：它自己选 $k_M$，运行 $\mathcal A$，用自己的加密预言机加上在 $k_M$ 之下打的标签回答加密查询，转发 $\mathcal A$ 的挑战消息、给它收到的挑战密文打标签，并按与 $\mathcal F$ 相同的规则回答解密查询（自己产生过的对返回存下的明文，其余返回 $\bot$）。它输出 $\mathcal A$ 的猜测。在 $\mathsf{VQ}$ 发生之前，$\mathcal A$ 的观察与真实 CCA 实验中完全一样，所以事件"$\mathcal A$ 成功且 $\neg\mathsf{VQ}$"的概率在两者中相同，且至多为 $\Prob[\mathcal A_E \text{ 成功}] \le \tfrac12 + \mathsf{negl}(n)$。

两个界相加即证得 CCA-安全性。不可伪造性由第一部分得出，因为一个新的合法密文就是一次强 MAC 伪造。
:::

证明用到了强不可伪造性：若只是普通 MAC，对手可能为挑战 $c$ 造出第二个合法标签 $t' \ne t$ 并查询 $\langle c, t'\rangle$，而这是 CCA 游戏允许的。HMAC 与 CMAC 既是确定性的又是伪随机的，因此是强不可伪造的。

::: example 用库的 HMAC 做先加密后认证 {#ex-etm}
用 HMAC-SHA256 搭一个玩具先加密后认证方案——把它在 $k_E$ 之下当作 PRF 用一次，生成 CTR 式的密钥流；再在独立的密钥 $k_M$ 之下当作 MAC 用一次——加密消息 `PAY BOB 0010 EUR`，然后翻转密文的一位，展示接收方不经解密就拒绝它。
::: solution
```python
import hashlib, hmac

def prf(k, x):                                   # 把 HMAC-SHA256 当作 PRF 用
    return hmac.new(k, x, hashlib.sha256).digest()

def encrypt(kE, kM, nonce, m):                   # 玩具 CTR + HMAC：仅供学习
    pad = b"".join(prf(kE, nonce + i.to_bytes(4, "big")) for i in range(len(m) // 32 + 1))
    c = nonce + bytes(a ^ b for a, b in zip(m, pad))
    return c, prf(kM, c)                         # 标签覆盖 nonce 和密文

def decrypt(kE, kM, c, t):
    if not hmac.compare_digest(prf(kM, c), t):
        return None                              # 先拒绝，不解密
    nonce, body = c[:12], c[12:]
    pad = b"".join(prf(kE, nonce + i.to_bytes(4, "big")) for i in range(len(body) // 32 + 1))
    return bytes(a ^ b for a, b in zip(body, pad))

kE, kM = bytes(range(32)), bytes(range(32, 64))  # 固定演示密钥；请用 secrets.token_bytes
c, t = encrypt(kE, kM, b"\x00" * 12, b"PAY BOB 0010 EUR")
print(decrypt(kE, kM, c, t))
bad = bytearray(c); bad[12 + 9] ^= 0x01          # 翻转金额的一位
print(decrypt(kE, kM, bytes(bad), t))
```

```console
$ python3 etm.py
b'PAY BOB 0010 EUR'
None
```

若没有标签，翻转明文第 $9$ 个字节的最低位就会把 `0010` 变成 `0110`——这就是可延展性。有了先加密后认证，修改过的密文通不过验证，在任何解密之前就遭拒绝，接收方除"非法"之外不泄露关于它的任何东西。标签除了密文主体还覆盖 nonce；让 nonce 不受认证，攻击者就能改动它从而改动密钥流。两个密钥相互独立，正如 [[#thm-etm]] 所要求：一个密钥两用会让证明失效（归约不能再一边模拟一个原语、一边只拿到另一个原语的预言机），对某些组合方案本身也会跟着失效。真正的代码用 HKDF 这样的密钥派生函数导出各自的密钥，或者干脆调用经过评审的库提供的 AES-GCM 之类的 AEAD，由它把 nonce、密钥和标签当作一个整体来处理。这里的 nonce 全为零，只因为这对密钥只加密一条消息才勉强可以。
:::
:::

**GCM**（[[cryptography/block-ciphers]]）是先加密后认证型的认证加密模式：先做 CTR 加密，再用多项式哈希 GHASH 在子密钥 $H = \mathrm{AES}_k(0^{128})$ 之下算出标签，并用对初始计数器的加密加以掩蔽。GHASH 不是 PRF，而是一个**近异或通用**（almost-XOR-universal）哈希——对两条不同的消息，两个哈希的异或等于给定值的概率在 $H$ 上至多约 $\ell/2^{128}$，消息长为 $\ell$ 个分组——而用每个 nonce 一段新鲜伪随机值对它做掩蔽，便得到一个 [[cryptography/perfect-secrecy]] 意义下的一次性 MAC。ChaCha20-Poly1305（RFC 8439）用流密码和多项式哈希 Poly1305 按同样的方式构造。两者还都认证**关联数据**（associated data）——必须明文随行、但不得被改动的头部——这就是它们被称为 AEAD 方案（带关联数据的认证加密）的原因。

::: history
Ralph Merkle 与 Ivan Damgård 在 CRYPTO 1989 上各自独立发表了迭代构造及其安全性证明。Ron Rivest 设计了 MD4（1990）与 MD5（1992）；NSA 设计了 SHA-0（1993）、SHA-1（1995）与 SHA-2（2001）。王晓峰（Xiaoyun Wang）与同事 2004 年找到 MD5 的碰撞，2005 年又表明 SHA-1 弱于其生日界；CWI 与 Google 的 Marc Stevens 与同事 2017 年发表了第一个 SHA-1 碰撞（"SHAttered"）。NIST 的 SHA-3 竞赛（2007–2012）选定 Keccak，2015 年作为 FIPS 202 发表。MAC 方面，Bellare、Kilian 与 Rogaway 于 1994 年分析了 CBC-MAC；Bellare、Canetti 与 Krawczyk 于 1996 年提出 HMAC（RFC 2104，1997）；Bellare 与 Namprempre 2000 年关于通用组合的论文证明了先加密后认证的安全性，并解释了另外几种组合的弱点；David McGrew 与 John Viega 于 2004 年设计了 GCM。
:::

## 后续内容

哈希函数是每个数字签名的一半：[[cryptography/signatures]] 签的是 $H(m)$ 而不是 $m$，所以 $H$ 的一个碰撞就是一个伪造的签名；它还用哈希构成的 Merkle 树构造只依赖哈希函数的签名——后量子标准 SLH-DSA 的基础（[[cryptography/post-quantum]]）。**随机预言机模型**把哈希函数当作真正随机的函数，RSA-OAEP（[[cryptography/public-key]]）与 Schnorr 签名都以它为根基。用 HKDF 做密钥派生、TLS 记录层的 AEAD，见 [[cryptography/protocols]]。口令散列是另一个问题——输入的熵很少，所以哈希必须故意做得又慢又加盐（scrypt、Argon2）——它属于 [[security]]。

::: summary
- **MAC** 是安全的，当没有带打标签预言机的高效对手能给新消息打标签（[[#def-mac]]）。PRF 是一个分组的 MAC（[[#thm-prf-mac]]）；CBC-MAC 只对定长消息安全，CMAC 修补了这一点。要以恒定时间验证标签。
- **抗碰撞**的哈希使找出 $H(x) = H(x')$ 的 $x \ne x'$ 变得困难（[[#def-crhf]]）；它蕴含抗第二原像性。
- **生日界**：从 $N$ 中取 $q$ 个均匀值，碰撞概率至多 $q(q-1)/2N$，且当 $q \le \sqrt{2N}$ 时至少 $(1 - 1/e)q(q-1)/2N$（[[#thm-birthday]]）；$N = 365$ 时 $q = 23$ 给出 $0.5073$。$\ell$ 位哈希的抗碰撞性至多 $\ell/2$ 位。
- 带长度填充的 **Merkle–Damgård** 把抗碰撞的压缩函数变成抗碰撞的哈希（[[#thm-md]]），但容许**长度扩展**，所以 $H(k \,\|\, m)$ 不是 MAC。**HMAC**（[[#def-hmac]]）与 **SHA-3 海绵**避开了它。
- **认证加密**是 CCA-安全加不可伪造（[[#def-ae]]）。用独立密钥的**先加密后认证**是 CCA-安全的（[[#thm-etm]]）；先认证后加密招来了填充预言机。GCM 与 ChaCha20-Poly1305 是标准的 AEAD 模式。
:::

## 习题

::: exercise 生日问题 {level=1 check="23"}
至少多少人时，"有人同一天生日"的概率（365 个等可能生日，不计闰年）超过 $1/2$？（填入数字。）
::: solution
由 [[#ex-birthday]]，$q = 22$ 时 $1 - \prod_{i=1}^{21}(1 - i/365) \approx 0.4757$，$q = 23$ 时 $0.5073$，所以答案是 $23$。估计式 $\sqrt{2\ln 2 \cdot 365} \approx 22.5$ 预言了这一点。
:::
:::

::: exercise 通用碰撞的代价 {level=1 check="2^128"}
通用生日攻击以约 $1/2$ 的概率找到 SHA-256 的碰撞大约需要多少次哈希求值？答案取最近的 2 的幂。（以 2 的幂填入，如 `2^100`。）
::: solution
$N = 2^{256}$，所以约 $1.18 \cdot 2^{128}$ 次求值，最近的 2 的幂即 $2^{128}$。这就是所谓 SHA-256 提供"128 位"抗碰撞性的含义。相比之下，原像的通用代价约为 $2^{256}$。
:::
:::

::: exercise 标签太短的 MAC {level=1 check="2^(-32)"}
由 PRF 构造的 MAC 输出 32 位标签。若 PRF 是理想的，对手对新消息随机输出一个标签，成功的概率是多少？（填入概率。）
::: solution
由 [[#thm-prf-mac]] 的证明，未查询过的 PRF 值是均匀的，所以瞎猜以概率 $2^{-32} \approx 2.3 \times 10^{-10}$ 成功。听起来很小，但能在线提交大量伪造尝试——每次被悄悄拒绝——的攻击者约 $2^{32}$ 次就会得手。标签短只有在验证次数受限时才可接受，这就是为什么 128 位标签才是常态。
:::
:::

::: exercise 变长消息的 CBC-MAC {#ex-cbc-mac level=2}
设 $\mathsf{Mac}_k$ 是对任意分组数目的消息施加的 CBC-MAC。给定单分组消息 $m$ 的标签 $t$，不查询就给出一个两分组消息的合法标签。
::: solution
两分组消息 $m \,\|\, (m \oplus t)$ 的 CBC-MAC 是 $F_k\big(F_k(m) \oplus m \oplus t\big) = F_k(t \oplus m \oplus t) = F_k(m) = t$。于是 $(m \,\|\, (m \oplus t), t)$ 就是一次伪造。更一般地，一条消息的标签是一个可以从此继续计算的链值。定长 CBC-MAC 对此免疫，因为伪造的消息长度不同；CMAC 与把长度前置则堵住了变长情形下的这个攻击。
:::
:::

::: exercise 抗碰撞性蕴含抗第二原像性 {level=2}
用归约证明：抗碰撞的哈希函数是抗第二原像的。
::: solution
设 $\mathcal A$ 能找第二原像：给定 $s$ 和（相关输入集合中的）均匀 $x$，它以概率 $\varepsilon(n)$ 输出满足 $H^s(x') = H^s(x)$ 的 $x' \ne x$。碰撞寻找者 $\mathcal C$ 收到 $s$ 后，自己均匀地选 $x$，运行 $\mathcal A(s, x)$ 得到 $x'$，输出 $(x, x')$。$\mathcal C$ 多项式时间运行，且恰在 $\mathcal A$ 成功时成功，概率为 $\varepsilon(n)$，故 $\varepsilon$ 可忽略。反之不成立：一个函数可以抗第二原像，却可能让那些具有特殊结构的已知输入互为碰撞。
:::
:::

::: exercise 为什么需要长度填充 {level=2}
考虑*没有*最后长度块的 Merkle–Damgård。假设有人找到块 $y$ 满足 $h^s(\mathit{IV} \,\|\, y) = \mathit{IV}$（从 IV 出发可达的不动点）。给出所得 $H^s$ 的一个碰撞，并解释没有长度块时定理的证明为何失效。
::: solution
对任何消息 $x$（整数个分组），$H^s(y \,\|\, x) = H^s(x)$：处理完 $y$ 后链值回到 $\mathit{IV}$，其余计算完全相同。所以 $(x, y\|x)$ 是一个碰撞。在 [[#thm-md]] 的证明中，情形 $L = L'$ 需要两个块序列的块数相同，回退时才能把第 $i$ 块与第 $i$ 块配对；长度不同又没有长度块时，回退可能走到较短消息的开头而找不到一个不同的压缩输入。长度块迫使要么最后一个压缩输入不同，要么长度相等。
:::
:::

::: exercise 加密并认证泄露相等关系 {level=2}
证明：无论加密多 CPA-安全，只要 MAC 是确定性的（如 HMAC），加密并认证连 CPA-安全都不是。
::: solution
对手向加密预言机查询 $m_0$，收到 $\langle c, t_0\rangle$，其中 $t_0 = \mathsf{Mac}_{k_M}(m_0)$。然后它提交挑战消息 $m_0$ 与 $m_1 \ne m_0$，收到 $\langle c^*, t^*\rangle$。由于 MAC 是确定性的，$b = 0$ 时 $t^* = t_0$；而 $b = 1$ 时 $t^* = \mathsf{Mac}_{k_M}(m_1)$，它等于 $t_0$ 的概率可忽略（否则对手猜"$m_1$ 的标签就是 $t_0$"就能伪造）。于是当且仅当 $t^* = t_0$ 时输出 $b' = 0$，成功概率接近 $1$。标签是在明文上算出来的，它从设计上就没打算隐藏明文。
:::
:::

::: exercise 生日下界的数值 {level=3 check="1 - e^(-1/2)"}
对 $N = 2^{64}$、$q = 2^{32}$，计算 (a) 上界 $q(q-1)/2N$，(b) 下界 $(1 - 1/e)q(q-1)/2N$，以及 (c) 精确碰撞概率的近似式 $1 - e^{-q(q-1)/2N}$，保留四位小数。解释为什么 (c) 在这里是准确的。（(c) 的值以精确表达式填入，如 `1 - e^(-1/2)`，或保留六位小数。）
::: solution
$q(q-1)/2N = 2^{32}(2^{32} - 1)/2^{65} = \tfrac12(1 - 2^{-32}) \approx 0.5000$。(b) $0.6321 \times 0.5 \approx 0.3161$。(c) $1 - e^{-0.5} \approx 0.393469$（四位小数 $0.3935$）。精确值是 $1 - \prod_{i<q}(1 - i/N)$，而 $\ln(1 - i/N) = -i/N - i^2/(2N^2) - \dots$；修正项之和约 $q^3/(6N^2) = 2^{96}/(6 \cdot 2^{128}) \approx 4 \times 10^{-11}$，可忽略，所以指数近似与精确值在多位小数上一致。真实概率 $0.3935$ 位于下界 $0.3161$ 与上界 $0.5000$ 之间，正如 [[#thm-birthday]] 所保证。
:::
:::

::: exercise 对截断哈希实现生日搜索 {level=3}
用 `hashlib.sha256`，把 $H_{32}(x)$ 定义为 $\mathrm{SHA\text{-}256}(x)$ 的前 4 个字节。写一个程序，对字符串 `b"msg-0"`、`b"msg-1"`、……做哈希，直到其中两个的 $H_{32}$ 相同，并报告它哈希了多少个字符串。与 [[#thm-birthday]] 的预言比较。（这只攻击你自己故意削弱的玩具函数；完整的 SHA-256 远非其能力所及。）
::: solution
```python
import hashlib, math

def h32(x: bytes) -> bytes:
    return hashlib.sha256(x).digest()[:4]        # 一个故意削弱的 32 位哈希

seen = {}
i = 0
while True:
    x = b"msg-%d" % i
    d = h32(x)
    if d in seen:
        print(i + 1, seen[d], x, d.hex())
        break
    seen[d] = x
    i += 1
print(round(math.sqrt(2 * math.log(2) * 2**32)))
```

某次运行中，程序哈希了 $114\,807$ 个字符串后，`msg-114806` 与 `msg-108856` 发生碰撞（两者的 $H_{32}$ 都是 `38b4f97a`）。确切的数目取决于所选字符串，但定理预言：哈希约 $\sqrt{2\ln 2\cdot 2^{32}} \approx 77\,163$ 个字符串后碰撞的概率达 $1/2$，达到它的几倍时几乎必然出现；期望值约为 $\sqrt{\pi N/2} \approx 82\,137$。输出每多一位，工作量乘以 $\sqrt 2$，所以 256 位把碰撞推到了 $2^{128}$。
:::
:::
