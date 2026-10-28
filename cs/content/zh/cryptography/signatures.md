当你的手机安装一次软件更新时，它如何知道这次更新来自制造商，而不是来自某个夺取了下载服务器的人？消息认证码需要一把由制造商与每一部手机共享的密钥——而任何手机的主人随后都能把它提取出来，为所有人伪造更新。所需的正是 MAC 的公钥类比物：**数字签名**——只有私钥的持有者能产生签名，任何拥有匹配公钥的人都能验证。签名还是**公开可验证的**和**可传递的**——一个说服了你的签名也会说服你拿给它看的任何人——这正是它们成为证书、软件分发、安全启动、签署文件与一切 TLS 连接基础的原因。

本章定义签名的安全性，说明为什么"教科书式"RSA 签名可被伪造、先散列后签名如何补救，通过 Fiat–Shamir 变换从一个识别协议导出 Schnorr 签名，并证明使签名安全的协议性质。随后我们介绍 DSA 与 ECDSA，精确解释为什么重用签名 nonce 会泄露私钥，最后讲把公钥绑定到名字上的证书与公钥基础设施。与 [[cryptography/public-key]] 一样，所有参数都是供手算的玩具，真实代码应当使用经过评审的库。

## 签名方案及其安全性

::: definition 签名方案 {#def-sig}
一个**签名方案**由 PPT 算法 $\mathsf{Gen}$、$\mathsf{Sign}$、$\mathsf{Vrfy}$ 组成：$\mathsf{Gen}(1^n)$ 输出一对密钥 $(pk, sk)$；$\mathsf{Sign}_{sk}(m)$ 输出签名 $\sigma$；确定性的 $\mathsf{Vrfy}_{pk}(m, \sigma)$ 输出 $1$（有效）或 $0$。正确性：对每条消息 $m$，$\mathsf{Vrfy}_{pk}(m, \mathsf{Sign}_{sk}(m)) = 1$，至多以 $\mathsf{Gen}$ 上的可忽略概率例外。

在实验 $\mathsf{SigForge}_{\mathcal A, \Pi}(n)$ 中，$(pk, sk) \gets \mathsf{Gen}(1^n)$，$\mathcal A$ 得到 $pk$ 和对 $\mathsf{Sign}_{sk}(\cdot)$ 的预言机访问；它输出一对 $(m, \sigma)$，若 $\mathsf{Vrfy}_{pk}(m, \sigma) = 1$ 且 $m$ 从未被查询过则得手。若每个 PPT $\mathcal A$ 的成功概率都可忽略，则称 $\Pi$ **在自适应选择消息攻击下存在不可伪造性**（EUF-CMA）；若甚至只要求*对* $(m, \sigma)$ 本身是新的一对，结论仍成立，则称它是**强不可伪造**的。
:::

这就是 [[cryptography/hash-mac#def-mac]] 中 MAC 的定义，只是把验证密钥改为公开。对手可以看到它对自选消息的签名，赢的方式是为*任何*一条新消息签出签名。由于验证是公开的，攻击者还能不限次数地离线检验候选的伪造签名。

### 教科书式 RSA 签名

RSA 陷门置换提示把 $m \in \Z_N^*$ 签为 $\sigma = m^d \bmod N$，并验证 $\sigma^e \equiv m$。这个**教科书式 RSA 签名**并不安全：

- **无消息伪造。**任取 $\sigma \in \Z_N^*$ 并令 $m = \sigma^e \bmod N$，则 $(m, \sigma)$ 就是有效的，根本不必查询预言机。消息看起来是随机的，但定义把它算作成功——而且算得对，因为不能指望应用会拒收奇怪的消息。
- **乘法伪造。**给定 $m_1, m_2$ 的签名 $\sigma_1, \sigma_2$，乘积 $\sigma_1\sigma_2$ 就是 $m_1m_2 \bmod N$ 的签名。要为选定的 $m$ 取得签名，攻击者先取得 $m\cdot r^e$（"盲化"后的消息）的签名，再除以 $r$。

两种攻击都利用了 $m \mapsto m^d$ 的代数结构。解药是：签的不是 $m$，而是它的哈希。

## 先散列后签名

::: definition 先散列后签名 {#def-hash-sign}
设 $\Pi = (\mathsf{Gen}, \mathsf{Sign}, \mathsf{Vrfy})$ 是消息长度为 $\ell(n)$ 的签名方案，$H$ 是输出长度为 $\ell(n)$、带密钥 $s$ 的哈希函数。方案 $\Pi'$ 的公钥为 $pk' = (pk, s)$；它对任意长度的消息 $m$ 以 $\mathsf{Sign}_{sk}(H^s(m))$ 签名，并通过检验 $\mathsf{Vrfy}_{pk}(H^s(m), \sigma)$ 来验证 $(m, \sigma)$。
:::

::: theorem 先散列后签名是安全的 {#thm-hash-sign}
若 $\Pi$ 对长度为 $\ell(n)$ 的消息是 EUF-CMA 安全的，且 $H$ 是抗碰撞的，则 $\Pi'$ 对任意长度的消息是 EUF-CMA 安全的。
:::

::: proof
设 $\mathcal A'$ 攻击 $\Pi'$，查询消息 $m_1, \dots, m_q$，最后输出 $(m^*, \sigma^*)$，其中 $m^* \notin \{m_1, \dots, m_q\}$。设 $\mathsf{Coll}$ 为事件"$H^s(m^*) = H^s(m_i)$ 对某个 $i$ 成立"。则
$$
\Prob[\mathcal A' \text{得手}] \le \Prob[\mathcal A' \text{得手} \wedge \mathsf{Coll}] + \Prob[\mathcal A' \text{得手} \wedge \neg\mathsf{Coll}] .
$$

**第一项。**碰撞查找者 $\mathcal C(s)$ 自己生成 $(pk, sk)$，在 $(pk, s)$ 上运行 $\mathcal A'$、如实回答签名查询，当 $\mathcal A'$ 输出 $m^*$ 时在自己的清单里寻找某个满足 $H^s(m_i) = H^s(m^*)$ 的 $m_i \ne m^*$。只要 $\mathsf{Coll}$ 发生它就找到碰撞，故第一项可忽略。

**第二项。**攻击 $\Pi$ 的伪造者 $\mathcal A$ 拿到 $pk$ 和签名预言机后，自己选取 $s$，在 $(pk, s)$ 上运行 $\mathcal A'$；回答查询 $m_i$ 时，它向自己的预言机请求 $H^s(m_i)$ 的签名，最后输出 $(H^s(m^*), \sigma^*)$。若 $\mathcal A'$ 得手且 $\neg\mathsf{Coll}$ 成立，则 $H^s(m^*)$ 与 $\mathcal A$ 查询过的每个 $H^s(m_i)$ 都不同，而 $\sigma^*$ 是它在 $\Pi$ 之下对它的合法签名：一次伪造。故第二项也可忽略。
:::

哈希还使 RSA 签名能用于长消息，但它本身并不能使教科书式 RSA 安全：定理需要 $\Pi$ 对定长消息是安全的，而教科书式 RSA 并非如此。真正有用的是：当 $H$ 被建模为输出在 $\Z_N^*$ 中均匀的随机预言机时，上述代数攻击便不再奏效：伪造者不能先挑 $\sigma$ 再找满足 $H(m) = \sigma^e$ 的 $m$，也不能把签名相乘合成。这个方案——**RSA 全域哈希**（RSA-FDH）——由 Bellare 和 Rogaway 在随机预言机模型下、于 RSA 假设之上证明了 EUF-CMA 安全（1993 年；Coron 在 2000 年给出了更紧的分析）。标准化的版本是 **RSA-PSS**（概率签名方案，Bellare 与 Rogaway 1996），它加入随机盐并有紧的证明；还有更早的确定性填充方案 **PKCS#1 v1.5** 签名，至今仍在证书中广泛使用；两者都在 RFC 8017 中。

::: example 玩具先散列后签名 RSA {#ex-rsa-sign}
用 [[cryptography/public-key#ex-rsa]] 的玩具密钥 $N = 3233$、$e = 17$、$d = 2753$，通过计算 $h = \mathrm{SHA\text{-}256}(m) \bmod N$ 与 $\sigma = h^d \bmod N$，为消息 `pay 10` 与 `pay 99` 签名并验证。
::: solution
```python
import hashlib
N, e, d = 3233, 17, 2753                 # 玩具密钥：不安全

def H(data, mod):                        # 散列到 Z_mod 的玩具"全域"哈希
    return int.from_bytes(hashlib.sha256(data).digest(), "big") % mod

for msg in (b"pay 10", b"pay 99"):
    h = H(msg, N)
    sig = pow(h, d, N)
    print(msg, h, sig, pow(sig, e, N) == h)
```

```console
$ python3 rsa_sign.py
b'pay 10' 50 1270 True
b'pay 99' 1427 1243 True
```

验证者从消息重新计算 $h$ 并检验 $\sigma^e \equiv h$。想从 `pay 10` 的签名得到 `pay 99` 的签名的攻击者，需要从 $1270$ 得到 $1243$，而这需要 $d$；乘法结构不再有帮助，因为 $1427$ 并不是攻击者拥有签名的那些哈希值的乘积——除非碰巧发生，而对真正的 3072 位 $N$ 而言这种巧合的概率可忽略。（当 $N = 3233$ 时哈希被压缩到不足 12 位，一百条消息之间出现碰撞的可能性很大：这个玩具演示的是机制，不是安全性。）
:::
:::

## Schnorr 签名

基于离散对数的签名来自另一个想法：把"我知道一个秘密"的交互式证明变为非交互式。

### 一个识别协议

设 $G$ 是阶为素数 $q$ 的循环群，$g$ 是其生成元。证明者的私钥是均匀的 $x \in \Z_q$，公钥是 $y = g^x$。

::: algorithm Schnorr 识别 {#alg-schnorr-id}
1. **承诺。**证明者选取均匀的 $k \in \Z_q$ 并发送 $R = g^k$。
2. **挑战。**验证者发送均匀的 $e \in \Z_q$。
3. **应答。**证明者发送 $s = k + ex \bmod q$。
4. **检查。**验证者当 $g^s = R\cdot y^e$ 时接受。
:::

完备性就是 $g^{k + ex} = g^k(g^x)^e$。还有两条性质使这个协议有用。

::: lemma 特殊可靠性 {#lem-special-soundness}
从两个接受会话记录 $(R, e, s)$ 与 $(R, e', s')$——承诺 $R$ 相同而 $e \ne e'$——可以算出秘密 $x$：$x = (s - s')(e - e')^{-1} \bmod q$。
:::

::: proof
两个会话记录都满足检验式：$g^s = Ry^e$ 与 $g^{s'} = Ry^{e'}$。相除得 $g^{s - s'} = y^{e - e'} = g^{x(e - e')}$。由于 $g$ 的阶为 $q$，指数在模 $q$ 意义下相等：$s - s' \equiv x(e - e') \pmod q$。因为 $q$ 是素数且 $e \ne e'$，$e - e'$ 在模 $q$ 下可逆，于是得到公式。
:::

于是，一个能对同一个承诺回答两个不同挑战的证明者确实"知道" $x$；不知道 $x$ 的作弊证明者对每个承诺至多能回答一个挑战，被抓住的概率为 $1 - 1/q$。这就是离散对数假设下协议安全性的直观依据。

::: lemma 诚实验证者零知识 {#lem-hvzk}
存在一个高效模拟器，只凭公钥 $y$ 就能输出三元组 $(R, e, s)$，其分布与 [[#alg-schnorr-id]] 中诚实执行的会话记录完全相同。
:::

::: proof
模拟器从 $\Z_q$ 中均匀独立地选取 $e$ 和 $s$，并令 $R = g^s y^{-e}$。在诚实执行中，$e$ 是均匀的；$k$ 均匀且与 $e$ 独立，于是 $s = k + ex$ 均匀且与 $e$ 独立；而 $R$ 由 $(e, s)$ 通过 $R = g^sy^{-e}$ 决定。模拟器用同一条规则产生三元组——$(e, s)$ 均匀独立，$R = g^sy^{-e}$——所以两个分布完全相同。
:::

诚实验证者因此学不到任何它本来就能自己产生的东西：会话记录不泄露关于 $x$ 的任何信息。零知识证明在 [[cryptography/protocols]] 中继续展开。

### Fiat–Shamir 变换

验证者唯一的工作，是在看到 $R$ *之后*发送一个不可预测的挑战。Fiat 与 Shamir（1986）用哈希函数取代了验证者：签名者以 $e = H(R \,\|\, m)$ 计算挑战，把它同时绑定到承诺和消息上。

::: definition Schnorr 签名 {#def-schnorr}
密钥为 $sk = x$、$pk = y = g^x$，群参数 $(G, q, g)$ 与取值于 $\Z_q$ 的哈希函数 $H$ 均为公开参数。签名 $m$ 时，选取均匀的 $k \in \Z_q$，计算 $R = g^k$、$e = H(R \,\|\, m)$ 和 $s = k + ex \bmod q$；签名是 $(e, s)$（或等价的 $(R, s)$）。验证 $m$ 上的 $(e, s)$ 时，计算 $R' = g^sy^{-e}$，当且仅当 $H(R' \,\|\, m) = e$ 时接受。
:::

Pointcheval 与 Stern（1996）证明了：把 $H$ 建模为随机预言机时，Schnorr 签名在离散对数假设下是 EUF-CMA 安全的。证明用同一条随机带、在 $H(R \,\|\, m)$ 处用两个不同的随机预言机回答运行伪造者两次——**分叉引理**——得到两个 $R$ 相同而 $e$ 不同的会话记录，然后套用 [[#lem-special-soundness]]；签名查询用 [[#lem-hvzk]] 的模拟器回答，并顺便编程预言机。概率分析这里从略。

::: example 11 阶群中的 Schnorr 签名 {#ex-schnorr}
用 $g = 4$ 生成的 $\Z_{23}^*$ 的 $q = 11$ 阶子群、私钥 $x = 7$，以及玩具哈希 $e = \mathrm{SHA\text{-}256}(R \,\|\, m) \bmod 11$（$R$ 编码为一个字节）。以 nonce $k = 5$ 为 `hello` 签名并验证。
::: solution
公钥为 $y = 4^7 \bmod 23 = 8$。签名：$R = 4^5 \bmod 23 = 12$；哈希给出 $e = 2$；$s = 5 + 2\cdot 7 = 19 \equiv 8 \pmod{11}$。签名为 $(e, s) = (2, 8)$。验证：$g^s = 4^8 = 9$，$y^e = 8^2 = 64 \equiv 18$，于是 $R\cdot y^e = 12 \cdot 18 = 216 \equiv 9$，即 $g^s = Ry^e$；等价地 $R' = g^sy^{-e} = 12$，而 $R' \,\|\, m$ 的哈希仍是 $2$。

```python
import hashlib
p, q, g, x = 23, 11, 4, 7                   # 玩具 Schnorr 群：不安全
y = pow(g, x, p)

def H(data, mod):
    return int.from_bytes(hashlib.sha256(data).digest(), "big") % mod

def sign(m, k):                             # k 必须新鲜且保密！
    R = pow(g, k, p)
    e = H(bytes([R]) + m, q)
    return R, e, (k + e * x) % q

R, e, s = sign(b"hello", 5)
print(y, R, e, s, pow(g, s, p) == R * pow(y, e, p) % p)
```

```console
$ python3 schnorr.py
8 12 2 8 True
```
:::
:::

::: widget modular
n: 23
mode: powers
a: 4
caption: 以 $g = 4$ 模 $23$ 的幂，以 $11$ 为周期循环：即 [[#ex-schnorr]] 的 Schnorr 群。私钥 $7$ 对应公钥 $4^7 = 8$，nonce $5$ 对应承诺 $4^5 = 12$。由于群的阶 $11$ 是素数，指数——密钥、nonce 和应答 $s$——都在模 $11$ 下计算，而不是模 $23$。
:::

## DSA 与 ECDSA

**数字签名算法**（Digital Signature Algorithm，DSA）由 NIST 于 1994 年在 FIPS 186 中采纳，其椭圆曲线版本 **ECDSA** 与它是同一想法的变体，设计的部分原因是绕开 Schnorr 的专利（该专利于 2008 年到期）。我们描述 ECDSA。公开参数是一条曲线及其上一个阶为素数 $n$ 的点 $G$；私钥是 $d \in \{1, \dots, n-1\}$，公钥是 $Q = dG$。设 $z$ 为消息的哈希约化成的模 $n$ 整数。

::: algorithm ECDSA {#alg-ecdsa}
**签名：**选取均匀的 nonce $k \in \{1, \dots, n-1\}$；计算 $kG = (x_1, y_1)$ 与 $r = x_1 \bmod n$（若 $r = 0$ 则重来）；计算 $s = k^{-1}(z + rd) \bmod n$（若 $s = 0$ 则重来）。签名为 $(r, s)$。

**验证：**检验 $1 \le r, s < n$；计算 $w = s^{-1} \bmod n$、$u_1 = zw \bmod n$、$u_2 = rw \bmod n$ 与 $X = u_1G + u_2Q$；当且仅当 $X \ne \mathcal O$ 且 $x(X) \equiv r \pmod n$ 时接受。
:::

::: proposition ECDSA 的验证是正确的 {#prop-ecdsa}
由签名算法产生的签名都能通过验证。
:::

::: proof
由 $s = k^{-1}(z + rd)$ 得 $k = s^{-1}(z + rd) = w(z + rd) \pmod n$。由于 $G$ 的阶为 $n$，标量可在模 $n$ 下约化，于是
$$
u_1G + u_2Q = zwG + rwdG = w(z + rd)G = kG ,
$$
该点的 $x$ 坐标按构造约化为 $r$。
:::

在标准随机预言机模型中，没有人知道能与 Schnorr 的安全性证明相提并论的 ECDSA 安全性证明（在理想化群模型中存在证明）。ECDSA 也不是强不可伪造的：若 $(r, s)$ 有效，则 $(r, -s \bmod n)$ 也有效，因为把 $k$ 取负会使 $kG$ 的 $y$ 坐标取负而 $x$ 坐标不变（[[#ex-ecdsa-malleable]]）。以签名识别交易的系统——尤其是 Bitcoin——正因如此不得不对 $s$ 作规范化。

::: example 玩具曲线上的 ECDSA {#ex-ecdsa}
在 $\Z_{17}$ 上的曲线 $y^2 = x^3 + 2x + 2$ 上（[[cryptography/public-key#ex-ec]]），$G = (5, 1)$ 的阶为 $n = 19$。取 $d = 7$，于是 $Q = 7G = (0, 6)$。以 nonce $k = 10$ 为 `hello` 签名——其玩具哈希为 $z = \mathrm{SHA\text{-}256}(\texttt{hello}) \bmod 19 = 6$——并验证。
::: solution
**签名。**$10G = (7, 11)$，故 $r = 7$。$k^{-1} = 10^{-1} \bmod 19 = 2$（因为 $20 \equiv 1$）。$s = 2(6 + 7\cdot 7) = 2 \cdot 55 = 110 \equiv 15 \pmod{19}$。签名为 $(7, 15)$。

**验证。**$w = 15^{-1} \bmod 19 = 14$（因为 $15 \cdot 14 = 210 = 11\cdot 19 + 1$）。$u_1 = 6 \cdot 14 = 84 \equiv 8$，$u_2 = 7 \cdot 14 = 98 \equiv 3$。于是 $X = 8G + 3Q = 8G + 21G = 29G = 10G = (7, 11)$，其 $x$ 坐标为 $7 = r$。有效。

验证者永远学不到 $k$；它把 $kG$ 重建为 $G$ 与 $Q$ 的组合。此外 $(7, -15 \bmod 19) = (7, 4)$ 也能通过验证：此时 $X = (7, 6) = -10G$，$x$ 坐标相同。
:::
:::

::: widget modular
n: 19
mode: inverses
caption: 模群阶 $n = 19$ 的逆元，ECDSA 的每次签名（$k^{-1}$）与验证（$s^{-1}$）都要用到。因为 $19$ 是素数，每个非零剩余类都有逆元：例如 $10^{-1} = 2$、$15^{-1} = 14$，正是 [[#ex-ecdsa]] 中的值。若群阶为合数，某些元素就没有逆元——签名群取素数阶的原因之一。
:::

### nonce 绝不可重复

Schnorr、DSA 与 ECDSA 中的 nonce $k$ 扮演的正是 [[#alg-schnorr-id]] 中证明者的承诺随机性，而 [[#lem-special-soundness]] 说清了同一个承诺用于两个不同挑战时会发生什么：私钥应声落地。对 Schnorr，两个共享同一 $k$ 的签名 $(e_1, s_1)$ 与 $(e_2, s_2)$ 满足 $s_1 = k + e_1x$ 与 $s_2 = k + e_2x$，故
$$
x = (s_1 - s_2)(e_1 - e_2)^{-1} \bmod q .
$$
对 ECDSA，同一 $k$ 产生的两个签名有相同的 $r$，而 $s_1k = z_1 + rd$、$s_2k = z_2 + rd$ 给出 $k = (z_1 - z_2)(s_1 - s_2)^{-1}$，进而 $d = (s_1k - z_1)r^{-1} \bmod n$。更糟的是，攻击并不要求*精确*的重用：只要 nonce 有偏差，或其少数几个比特经由计时泄露，格技术就能从足够多的签名中恢复密钥。一个实现糟糕的随机数发生器就足以丢一把签名密钥，而这在实践中发生过——最著名的例子是 2010 年，一家游戏机厂商被发现每次都用同一个 nonce 以 ECDSA 为其软件签名，从而暴露了其主签名密钥。

::: example 从重复的 nonce 恢复密钥 {#ex-nonce-reuse}
在 [[#ex-schnorr]] 的玩具 Schnorr 群中，签名者粗心到用同一个 nonce $k = 5$ 先后为 `hello` 与 `pay Bob 10` 签名，得到 $(e_1, s_1) = (2, 8)$ 与 $(e_2, s_2) = (8, 6)$。从两个公开签名恢复私钥，并说明防范措施。
::: solution
$x = (s_1 - s_2)(e_1 - e_2)^{-1} = (8 - 6)(2 - 8)^{-1} = 2\cdot(-6)^{-1} = 2\cdot 5^{-1} \pmod{11}$。由 $5 \cdot 9 = 45 \equiv 1$ 得 $5^{-1} = 9$，于是 $x = 18 \equiv 7$——正是私钥。（两个签名共用承诺 $R = 12$，这正是发现问题的线索。）这就是特殊可靠性 [[#lem-special-soundness]] 被用在了它没打算用的地方。

防范措施：用密码学安全的发生器生成 $k$；或者——更好——像 (EC)DSA 的 RFC 6979 以及内建此机制的 **EdDSA**（Ed25519，RFC 8032）那样，从私钥和消息**确定地**导出 $k$，后者取 $k = H(\text{密钥前缀} \,\|\, m)$。于是同一条消息总得到同一个 nonce（无害：得到同一个签名），不同消息得到互不相关的 nonce，签名时完全不依赖随机数发生器。实现还必须以常数时间计算 $kG$，使 $k$ 的任何一个比特都不泄露。
:::
:::

::: warning 签名死于实现，而非方程
本章描述的一切签名失守——nonce 重用、nonce 有偏差或泄露、可伪造的教科书式 RSA、在要求唯一性时接受了 $(r, -s)$、以及跳过某项检验（如 $1 \le r, s < n$，或收到的点是否在曲线上）的验证器——全都是一个纸面上安全的方案的实现或使用错误。另一个经典错误是验证了签名，随后却对消息的另一个*解析*——不同于被签名的那个——采取行动。请使用经过评审的库的签名 API，优先采用 Ed25519 这类确定性方案，绝不要为真实密钥亲手实现算术。
:::

::: quiz
一台设备用 ECDSA 为固件签名，每个 nonce $k$ 都取自一个发生器；重启后该发生器从同一个种子重新开始。后果是什么？

- [ ] 没有后果，因为私钥从不离开设备。
- [ ] 只是两个固件镜像可能得到同一个签名。
- [x] 重启后用同一个 nonce 签名的两个不同镜像，会把私钥暴露给看到这两个签名的任何人。
- [ ] 第二个镜像的验证会失败。
::: solution
同一个种子产生同一个 $k$，于是两个对不同哈希值的签名共享 $r$，并满足关于未知数 $k$ 和 $d$ 的两个线性方程，任何人都能解出来。验证依然成功——在密钥被偷之前一切看起来正常。确定性 nonce（RFC 6979、EdDSA）消除了对发生器的依赖。
:::
:::

## 证书与公钥基础设施

签名证明消息来自与 $pk$ 匹配的私钥的持有者。可 $pk$ 是谁的密钥？若 Mallory 能让 Alice 相信 Mallory 的公钥属于 Bob，一切数学都毫无用处；这又是 [[cryptography/public-key]] 中的中间人问题。**证书**是一条把公钥绑定到身份的签名声明："`www.example.org` 的公钥是 $pk$，自日期 $t_1$ 至 $t_2$ 有效"，由**证书颁发机构**（certificate authority，CA）签名。若 Alice 已经信任 CA 的公钥，她就能验证证书，从而信任 $pk$。

在万维网上，证书遵循 X.509 格式（RFC 5280）。服务器发送一条**链**：它自己的（**叶**）证书，由一个**中间** CA 签名；该中间 CA 的证书又由一个**根** CA 签名，根 CA 的自签名证书预先安装在浏览器或操作系统的**信任库**中。验证一条链意味着对每一环：用签发者的公钥检验签名；检查有效期；通过**基本约束**（basic constraints）扩展检查签发者被允许充当 CA，并通过**密钥用法**（key usage）检查允许用于哪些用途；对叶证书，检查客户所请求的名字出现在**主题备用名称**（subject alternative name）扩展中。客户还必须判断证书是否已被**吊销**（例如其私钥泄露了），手段是证书吊销列表或 OCSP 协议，而两者的可靠性与隐私问题都人所共知。

::: example 验证一条证书链 {#ex-chain}
一个浏览器连接 `shop.example.org`，收到一张由 "Example Intermediate CA" 签发给 `*.example.org` 的叶证书，以及该中间 CA 由 "Example Root CA"（位于信任库中）签发的证书。列出各项检查，并说明若中间 CA 的证书缺少 CA 标志会发生什么。
::: solution
(1) 在信任库中找到根 CA 的公钥，验证根 CA 对中间 CA 证书的签名。(2) 检查中间 CA 证书处于有效期内、基本约束的 CA 标志已置位（且路径长度限制允许再多一级）、并具有证书签名用途的密钥用法。(3) 验证中间 CA 对叶证书的签名。(4) 检查叶证书的有效期、其扩展密钥用法是否包含 TLS 服务器认证，以及 `shop.example.org` 是否匹配 `*.example.org`（通配符恰好匹配一个标签，所以 `a.b.example.org` 不匹配）。(5) 按策略检查吊销状态。(6) 在 TLS 中，用叶证书的公钥验证服务器对手握的签名（[[cryptography/protocols]]），以证明服务器持有私钥。

若中间 CA 缺少 CA 标志，链必须被拒绝：否则*任何*证书的持有者都能为任何名字签发证书。21 世纪初的若干 TLS 库恰恰漏掉了这项检查。
:::
:::

万维网公钥基础设施的软肋在于：大约一百个受信任根 CA 中的任何一个都能为任何名字签发证书。当一个 CA 被攻破或行为不端——比如荷兰 CA DigiNotar 于 2011 年被入侵，为多个大型网站签发的欺诈证书被投入使用，此后浏览器将其移除、公司破产——所有网站都暴露在外。应对措施包括**证书透明度**（Certificate Transparency，RFC 6962，2013）：证书必须记入由默克尔树构建的公开仅追加日志（[[cryptography/hash-mac]]），使错误签发能够被发现；通过 ACME 协议自动签发（RFC 8555，2019），使免费的域名验证证书成为常态；以及不断缩短的证书寿命——它限制密钥泄露造成的损失，并减少对吊销的依赖——CA/Browser Forum 已采纳一个时间表，把公开受信任的 TLS 证书的最长寿命从 398 天逐步缩短，到 2029 年降至 47 天。其他生态使用不同的信任模型：PGP 的"信任网"、SSH 的首次使用即信任、软件更新中固定的公钥。

::: quiz
浏览器收到 `bank.example` 的一条有效链，终止于一个受信任的根，但叶证书的私钥上周被盗，证书已被吊销。哪种机制最可靠地限制了损失？

- [ ] CA 对叶证书的签名——证书被吊销后签名即失效。
- [ ] 证书透明度——它能防止被盗密钥被使用。
- [x] 较短的证书寿命——到期后被盗证书就会过期，无论吊销信息是否送达浏览器。
- [ ] 根 CA 的自签名。
::: solution
吊销不改变签名：证书在密码学上依然有效，而浏览器能否得知吊销，取决于常被跳过或失效放行的 CRL 或 OCSP 检查。证书透明度有助于发现*错误签发*的证书，而不是被盗的密钥。到期检查是每个客户端都会做的一项检查，这正是缩短寿命的原因。
:::
:::

::: history
Diffie 与 Hellman 1976 年的论文提出了数字签名，RSA（1978）给出了第一个构造。Rabin（1979）以及 Goldwasser、Micali 与 Rivest（1988）为签名奠定了严格基础；后一篇论文定义了自适应选择消息攻击下的存在不可伪造性，并从分解大整数出发构造了满足它的方案。ElGamal（1985）提出了基于离散对数的签名，Fiat 与 Shamir 于 1986 年引入他们的变换，Schnorr 于 1989 年发表了他的识别与签名方案（期刊版 1991 年）。NIST 于 1994 年在 FIPS 186 中采纳 DSA，ECDSA 随后于 1999 年进入 ANSI X9.62。Pointcheval 与 Stern 于 1996 年在随机预言机模型下证明了 Schnorr 签名的安全性。Kohnfelder 1978 年的 MIT 论文引入了证书；X.509 始于 1988 年。Bernstein 与合作者于 2011 年推出 Ed25519，标准化为 RFC 8032（2017）；证书透明度由 Laurie、Langley 与 Kasper 提出（RFC 6962，2013）。
:::

## 后续内容

[[cryptography/protocols]] 用签名为 TLS 1.3 中的 Diffie–Hellman 密钥交换作认证——服务器用其证书密钥对手握的会话记录签名——并在其中一般性地发展 [[#lem-hvzk]] 的零知识思想。[[cryptography/post-quantum]] 将说明肖尔（Shor）算法如何伪造本章的一切签名，并介绍基于格的 ML-DSA 与基于哈希的 SLH-DSA——后者仅由 [[cryptography/hash-mac]] 的哈希函数构造。公钥基础设施的组织层面——证书策略、密钥仪式、实践中的吊销、代码签名与安全启动——属于 [[security]]。

::: summary
- **签名方案**是 EUF-CMA 安全的，如果没有任何带签名预言机的高效对手能签出一条新消息（[[#def-sig]]）；验证是公开的，所以签名可传递。
- **教科书式 RSA 签名**可被伪造（无消息伪造与乘法伪造）。**先散列后签名**在抗碰撞性的条件下把一个定长方案扩展到任意长度（[[#thm-hash-sign]]）；RSA-FDH 与 **RSA-PSS** 在随机预言机模型下安全。
- **Schnorr 识别**具有特殊可靠性（[[#lem-special-soundness]]）与诚实验证者零知识（[[#lem-hvzk]]）；**Fiat–Shamir** 变换把它变成 **Schnorr 签名**（[[#def-schnorr]]），在随机预言机模型下基于离散对数假设安全。
- **ECDSA** 以 $r = x(kG)$、$s = k^{-1}(z + rd)$ 签名（[[#alg-ecdsa]]、[[#prop-ecdsa]]）；它不是强不可伪造的。
- **重用（或泄露部分比特的）nonce 会暴露私钥**（[[#ex-nonce-reuse]]）；确定性 nonce（RFC 6979、Ed25519）可以杜绝。
- **证书**通过通向受信任根的链把密钥绑定到名字；验证检查签名、有效期、CA 约束、名字与吊销。证书透明度与短寿命限制了 CA 失守造成的损失。
:::

## 习题

::: exercise 一次无消息伪造 {level=1 check="1752"}
在玩具公钥 $N = 3233$、$e = 17$ 之下，不凭私钥、取 $\sigma = 2$，产生一个有效的教科书式 RSA 签名。它对哪条消息 $m$ 有效？（填入 $m$。）
::: solution
$m = \sigma^e \bmod N = 2^{17} \bmod 3233 = 1752$。于是 $\sigma^e \equiv m$，$(1752, 2)$ 能通过验证。若采用先散列后签名，伪造者就需要一条哈希值为 $1752$ 的消息——那是哈希的原像问题。
:::
:::

::: exercise 验证一个 Schnorr 签名 {level=1}
在 [[#ex-schnorr]] 的玩具群中（公钥 $y = 8$），签名者以 nonce $k = 9$ 再次为 `hello` 签名，得到 $R = 13$、$e = 7$、$s = 3$。验证等式 $g^s = Ry^e$。
::: solution
$g^s = 4^3 = 64 \equiv 18 \pmod{23}$。$y^e = 8^7 \bmod 23$：$8^2 = 64 \equiv 18$，$8^4 \equiv 18^2 = 324 \equiv 2$，$8^7 = 8^4\cdot 8^2\cdot 8 \equiv 2 \cdot 18 \cdot 8 = 288 \equiv 12$。于是 $Ry^e = 13 \cdot 12 = 156 \equiv 18$。两边都等于 $18$：有效。不同的 nonce 在同一条消息上给出完全不同的签名，随机化签名本应如此。
:::
:::

::: exercise 数模乘 {level=1 check="17"}
用平方-乘算法作 $e = 65537 = 2^{16} + 1$ 的教科书式 RSA 验证需要多少次模乘（平方计入在内，跳过对 $1$ 的那次平凡的首次乘法）？（填入数目。）
::: solution
$65537 = 10000000000000001_2$ 有 $17$ 位。从最高位起取 $r = \sigma$，余下各位需 $16$ 次平方，最后的 $1$ 位需一次乘法：共 $17$ 次乘法。这就是 RSA 验证极快、而用满尺寸 $d$ 签名需要数千次的原因。
:::
:::

::: exercise ECDSA 的 nonce 重用 {level=2 check="7"}
在 [[#ex-ecdsa]] 的玩具曲线上，签名者对 `hello`（$z_1 = 6$，签名 $(7, 15)$）与 `yes`（$z_2 = 15$，签名 $(7, 14)$）都用了 $k = 10$。仅从公开数据恢复 $k$，再恢复 $d$。（填入 $d$。）
::: solution
相等的 $r$ 出卖了重用。$k = (z_1 - z_2)(s_1 - s_2)^{-1} = (6 - 15)\cdot 1^{-1} = -9 \equiv 10 \pmod{19}$。于是 $d = (s_1k - z_1)r^{-1} = (150 - 6)\cdot 7^{-1} = 144 \cdot 11 \pmod{19}$（因为 $7 \cdot 11 = 77 \equiv 1$）；$144 \equiv 11$，故 $d = 121 \equiv 7$。这正是现实中 nonce 重用事故的数学内容：两个线性方程，两个未知数。
:::
:::

::: exercise ECDSA 不是强不可伪造的 {#ex-ecdsa-malleable level=2}
证明：若 $(r, s)$ 是 $m$ 上的有效 ECDSA 签名，则 $(r, n - s)$ 也是。
::: solution
令 $s' = n - s \equiv -s$，于是 $w' = (s')^{-1} \equiv -w$、$u_1' = -u_1$、$u_2' = -u_2$。则 $X' = u_1'G + u_2'Q = -(u_1G + u_2Q) = -X$。点取负不改变其 $x$ 坐标，故 $x(X') = x(X) \equiv r$，且 $1 \le n - s < n$。所以 $(r, n - s)$ 能通过验证。它是旧消息上的一个*新*签名——EUF-CMA 允许，而强不可伪造性禁止；要求 $s \le n/2$（"低 $s$"规范化）可恢复唯一性。
:::
:::

::: exercise 对教科书式 RSA，只签哈希还不够 {level=2}
设某方案以 $\sigma = H(m)^d \bmod N$ 签名，而 $H$ 只输出 160 位（远短于 $N$）。说明为什么乘法结构可能仍可被利用，以及全域哈希或 PSS 改变了什么。
::: solution
若攻击者能选出满足 $H(m_1)H(m_2) \equiv H(m_3) \pmod N$ 的消息，则 $\sigma_1\sigma_2$ 就是 $m_3$ 的签名。当哈希值为 160 位而 $N$ 很大时，两个哈希值的乘积是小于 $N$ 的普通整数，于是攻击者需要在整数上满足 $H(m_3) = H(m_1)H(m_2)$——或更实际地，找到许多能在若干小素数上分解的哈希值，再由它们的签名组合出别的签名。在这种尺寸下，这类"光滑"哈希值并不罕见，此类攻击（Desmedt 与 Odlyzko，其后的 Coron、Naccache 与 Stern）曾攻破短哈希的 RSA 签名格式。全域哈希把 $H(m)$ 铺满整个 $\Z_N$，在那里哈希之积几乎绝不可能是哈希，光滑性也罕见；PSS 还把输入随机化。
:::
:::

::: exercise 模拟 Schnorr 会话记录 {level=2}
在 $y = 8$ 的玩具群中，用 [[#lem-hvzk]] 的模拟器取 $e = 3$、$s = 4$ 产生一个会话记录，并检验它会被接受。为什么这不能让人冒充证明者？
::: solution
$R = g^sy^{-e} = 4^4\cdot 8^{-3} \bmod 23$。$4^4 = 256 \equiv 3$；$8^3 = 512 \equiv 6$，其逆元为 $4$；故 $R = 3 \cdot 4 = 12$。检验：$g^s = 3$，$Ry^e = 12\cdot 6 = 72 \equiv 3$。会被接受。模拟器在 $R$ *之前*选了 $e$；真实的验证者在收到 $R$ 之后才选 $e$，而先对 $R$ 作出承诺的冒充者只能回答一个挑战（否则 [[#lem-special-soundness]] 就给了它 $x$）。次序要紧，而 Fiat–Shamir 由 $R$ 计算 $e$，保住了这个次序。
:::
:::

::: exercise 哈希碰撞伪造签名 {level=3}
在先散列后签名中，设攻击者能找到一个碰撞 $H(m) = H(m')$，其中 $m$ 是一份无害文件、$m'$ 是一份有害文件，两者都由它选定。说明它如何取得 $m'$ 上的签名，并说明这对证书为何要紧。然后解释随机化哈希输入（如 RSA-PSS 的盐或 CA 的随机序列号）如何改变这一攻击。
::: solution
攻击者请签名者签无害的 $m$，得到 $H(m)$ 上的签名 $\sigma$；由于 $H(m') = H(m)$，$\sigma$ 也是 $m'$ 上的有效签名。就证书而言，$m$ 会是一份无害的证书请求，而 $m'$ 是一份置了 CA 标志的证书：2008 年 Stevens、Sotirov 与合作者正是用 MD5 的选择前缀碰撞，以这种方式（从一家仍在用 MD5 的 CA）取得了一张恶意的中间 CA 证书；2012 年 Flame 恶意软件用类似的 MD5 碰撞伪造了一张代码签名证书。若签名者在哈希前插入不可预测的比特——证书开头的随机序列号，或一个盐——攻击者就必须找出对一个它无法预知的前缀有效的碰撞，问题随之变成第二原像问题，困难得多。真正的解决办法是抗碰撞的哈希函数；随机化只是纵深防御。
:::
:::

::: exercise 实现 Schnorr 验证与 nonce 恢复 {level=3}
利用 [[#ex-schnorr]] 的 `sign` 与 `H`，编写 `verify(m, e, s)`：重新计算 $R' = g^sy^{-e}$ 并检验 $H(R' \,\|\, m) = e$。再编写 `recover(e1, s1, e2, s2)`：从两个共用 nonce 的签名算出 $x$，并用 $k = 5$ 签出的 `hello` 与 `pay Bob 10` 的签名进行测试。
::: solution
```python
def verify(m, e, s):
    R = pow(g, s, p) * pow(y, -e, p) % p     # R' = g^s * y^(-e)
    return H(bytes([R]) + m, q) == e

def recover(e1, s1, e2, s2):
    return (s1 - s2) * pow(e1 - e2, -1, q) % q

_, e1, s1 = sign(b"hello", 5)
_, e2, s2 = sign(b"pay Bob 10", 5)
print(verify(b"hello", e1, s1), verify(b"pay Bob 10", e2, s2), verify(b"hello", e2, s2))
print(e1, s1, e2, s2, recover(e1, s1, e2, s2))
```

```console
$ python3 schnorr_reuse.py
True True False
2 8 8 6 7
```

两个签名都能通过验证，一个签名不能转移到另一条消息上，恢复出的密钥是 $7$。这段代码只适用于玩具群：真实的 Schnorr 类签名（Ed25519 或 BIP 340 Schnorr）在经过评审的库中都有提供，带确定性 nonce 与常数时间算术。
:::
:::
