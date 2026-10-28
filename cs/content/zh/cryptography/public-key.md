一家有 $1000$ 名员工、彼此都需要两两私密通话的公司，若只有对称密码，就需要 $\binom{1000}{2} = 499\,500$ 把共享密钥，且每一把都要事先安全地送达——而一个想与全世界每个浏览器私密交谈的网站则根本做不到。公钥密码学消除了对预共享秘密的需要。在**密钥交换**中，两个素不相识的人在窃听者旁观每一条消息的情况下商定一把秘密密钥。在**公钥加密**中，每方公布一个人人可用来加密的**公钥**，并自己保管一把只有自己能解密的**私钥**。

本章利用 [[cryptography/number-theory]] 的数论把两者都建立起来。我们在 DDH 假设下证明 Diffie–Hellman 密钥交换对窃听者安全，为公钥加密定义安全性，证明 ElGamal 加密是 CPA-安全的，然后研究 RSA——先是"教科书"形式：快、简单、不安全；再是使它 CCA-安全的 OAEP 填充。随后我们结识椭圆曲线，在一条玩具曲线上手工计算群运算，最后以混合加密收尾——公钥加密在现实中正是这样使用的。本章每个数字都小得可以让你手工验算；它是教学玩具，真正的代码必须使用经过评审的库。

## Diffie–Hellman 密钥交换

设 $G$ 是素数阶 $q$ 的循环群，$g$ 是其生成元，全部公开——实践中是椭圆曲线群，或安全素数模下的平方子群。

::: algorithm Diffie–Hellman 密钥交换 {#alg-dh}
1. Alice 选取均匀的 $x \in \Z_q$，发送 $h_A = g^x$。
2. Bob 选取均匀的 $y \in \Z_q$，发送 $h_B = g^y$。
3. Alice 计算 $k = h_B^{\,x}$；Bob 计算 $k = h_A^{\,y}$。双方都得到 $k = g^{xy}$。
:::

正确性就是 $(g^y)^x = g^{xy} = (g^x)^y$。窃听者看到 $g$、$g^x$ 和 $g^y$；从它们算出 $g^{xy}$ 正是 CDH 问题（[[cryptography/number-theory#def-dlog]]）。不过，要让一把密钥能被*使用*，我们想要的比"难以算出"更多：密钥应当与随机密钥不可区分，这样把它用于 AES-GCM 之类才和用一把均匀密钥一样好。

::: definition 对窃听者安全的密钥交换 {#def-ke-eav}
在实验 $\mathsf{KE}^{\mathsf{eav}}_{\mathcal A, \Pi}(n)$ 中，各方运行协议 $\Pi$，安全参数为 $n$，产生对话记录 $\mathit{trans}$ 和一把密钥 $k$。选取均匀的比特 $b$；若 $b = 0$ 令 $\hat k = k$，若 $b = 1$ 令 $\hat k$ 为密钥空间中均匀选取的值。$\mathcal A$ 收到 $(\mathit{trans}, \hat k)$ 并输出 $b'$。若每个 PPT $\mathcal A$ 猜中 $b$ 的概率至多 $\tfrac12 + \mathsf{negl}(n)$，则称 $\Pi$ **在窃听者存在时是安全的**。
:::

::: theorem Diffie–Hellman 对窃听者安全 {#thm-dh}
若 DDH 相对于群生成器 $\mathcal G$ 是困难的，则（密钥取在 $G$ 中的）Diffie–Hellman 密钥交换在窃听者存在时是安全的。
:::

::: proof
设 $\mathcal A$ 是对手。构造 DDH 区分器 $D$：给定 $(G, q, g, h_1, h_2, h_3)$，它在对话记录 $(G, q, g, h_1, h_2)$ 和密钥 $\hat k = h_3$ 上运行 $\mathcal A$，并在 $\mathcal A$ 说"真实"（$b' = 0$）时输出 $1$。若 $(h_1, h_2, h_3) = (g^x, g^y, g^{xy})$，$\mathcal A$ 看到的恰是 $b = 0$ 的情形；若 $h_3 = g^z$ 均匀，它看到的恰是 $b = 1$ 的情形。于是
$$
\Prob[\mathcal A \text{ 成功}] = \tfrac12\Prob[b' = 0 \mid b = 0] + \tfrac12\Prob[b' = 1 \mid b = 1] = \tfrac12 + \tfrac12\Big(\Prob[D(\text{真实}) = 1] - \Prob[D(\text{随机}) = 1]\Big),
$$
它至多 $\tfrac12 + \tfrac12\mathsf{negl}(n)$。
:::

实践中，群元素 $g^{xy}$ 要经过一个密钥派生函数（HKDF，[[cryptography/protocols]]）来产生比特串形式的密钥；也正是这一步，让协议可以使用的群只需相信 CDH 难（而不必 DDH 难）。

::: example 用玩具数字做 Diffie–Hellman {#ex-dh}
取 $p = 23$、$g = 5$（$\Z_{23}^*$ 的一个生成元），Alice 的秘密 $x = 6$，Bob 的秘密 $y = 15$。他们各发送什么？商定的密钥是什么？
::: solution
Alice 发送 $h_A = 5^6 \bmod 23$：$5^2 = 25 \equiv 2$，$5^4 \equiv 4$，$5^6 \equiv 4 \cdot 2 = 8$。Bob 发送 $h_B = 5^{15} \bmod 23 = 19$。Alice 算得 $19^6 \bmod 23 = 2$，Bob 算得 $8^{15} \bmod 23 = 2$。共享密钥是 $2$。

```python
p, g = 23, 5                       # 玩具参数：完全不安全
x, y = 6, 15
hA, hB = pow(g, x, p), pow(g, y, p)
print(hA, hB, pow(hB, x, p), pow(hA, y, p))
```

```console
$ python3 dh.py
8 19 2 2
```

Eve 看到 $8$ 和 $19$，逐一试遍全部 $22$ 个指数就能找到 $x$。还要注意 $\Z_{23}^*$ 的阶 $22$ 是偶数，DDH 在其中不成立（[[cryptography/number-theory#ex-ddh-zp]]）；讲究一点的玩具应当用 $4$ 生成的 $11$ 阶子群。真实部署使用的群阶约为 $2^{256}$，比如椭圆曲线 X25519。
:::
:::

::: widget modular
n: 23
mode: powers
a: 5
caption: 生成元 $5$ 模 $23$ 的幂。Alice 的公开值是她秘密指数对应的那一项（$5^6 = 8$），Bob 的是 $5^{15} = 19$。顺着表正向走很容易；从一个值倒着找回它的指数就得搜索整张表，而对 $2^{256}$ 阶的群这超出任何能力。试试 $a = 4$，素数阶平方子群的生成元。
:::

### 中间人攻击

[[#thm-dh]] 说的是*窃听者*。能截获并替换消息的主动攻击者 Mallory 会与 Alice 跑一轮交换（假扮 Bob），再与 Bob 跑另一轮（假扮 Alice），结果分别同两人各共享一把密钥，把一切中继——并且阅读——过去。裸协议里没有任何东西能让 Alice 把 Bob 的 $g^y$ 与 Mallory 的 $g^{y'}$ 区分开。补救之道是**认证**：Bob 用一把长期密钥为他的份额签名，其公钥一半由 Alice 通过证书事先信任。签名是 [[cryptography/signatures]] 的主题，TLS 1.3 式的认证密钥交换见 [[cryptography/protocols]]。

## 公钥加密

::: definition 公钥加密 {#def-pke}
**公钥加密方案**由 PPT 算法 $\mathsf{Gen}$、$\mathsf{Enc}$、$\mathsf{Dec}$ 组成：$\mathsf{Gen}(1^n)$ 输出密钥对 $(pk, sk)$；$\mathsf{Enc}_{pk}(m)$ 输出密文；$\mathsf{Dec}_{sk}(c)$ 输出消息或 $\bot$。正确性：除关于 $\mathsf{Gen}$ 的可忽略概率外，$\mathsf{Dec}_{sk}(\mathsf{Enc}_{pk}(m)) = m$。

在实验 $\mathsf{PubK}^{\mathsf{cpa}}_{\mathcal A, \Pi}(n)$ 中，$(pk, sk) \gets \mathsf{Gen}(1^n)$；$\mathcal A$ 收到 $pk$ 并输出等长的 $m_0, m_1$；它收到 $c \gets \mathsf{Enc}_{pk}(m_b)$ 并输出 $b'$。若每个 PPT $\mathcal A$ 的成功概率至多 $\tfrac12 + \mathsf{negl}(n)$，则 $\Pi$ 是 **CPA-安全**的。在 $\mathsf{PubK}^{\mathsf{cca}}$ 中，对手还拥有 $\mathsf{Dec}_{sk}(\cdot)$ 预言机，只是不许查询 $c$ 本身；由此定义 **CCA-安全性**。
:::

定义里没有加密预言机：对手持有 $pk$，自己什么都能加密，所以在公钥世界里，窃听者安全与 CPA-安全合而为一。于是如在 [[cryptography/block-ciphers#prop-det-cpa]] 中那样，**确定性的公钥加密永远不是 CPA-安全的**——对手自己加密 $m_0$ 再比对即可——而且对单条消息也成立。另一个标准结论（用混合论证证明）是：单条消息的 CPA-安全蕴含多条消息的 CPA-安全。

### ElGamal 加密

ElGamal（1985）把 Diffie–Hellman 变成加密：收件人的公钥是一次交换的固定一半 $h = g^x$，每次加密用新鲜随机性完成另一半，把得到的 $h^y$ 当作群上的一次一密。

::: definition ElGamal 加密 {#def-elgamal}
$\mathsf{Gen}$ 取得 $(G, q, g)$，选取均匀的 $x \in \Z_q$，输出 $pk = (G, q, g, h)$，其中 $h = g^x$，且 $sk = x$。对消息 $m \in G$，$\mathsf{Enc}_{pk}(m)$ 选取均匀的 $y \in \Z_q$，输出 $\langle c_1, c_2\rangle = \langle g^y,\ h^y\cdot m\rangle$。$\mathsf{Dec}_{sk}(\langle c_1, c_2\rangle) = c_2 \cdot (c_1^{\,x})^{-1}$。
:::

正确性：$c_2/c_1^{\,x} = g^{xy}m/g^{xy} = m$。

::: theorem ElGamal 是 CPA-安全的 {#thm-elgamal}
若 DDH 相对于 $\mathcal G$ 是困难的，则 ElGamal 加密是 CPA-安全的。
:::

::: proof
先考虑修改过的方案 $\tilde\Pi$，其中 $c_2 = g^z\cdot m$，$z$ 均匀且与其余一切独立。由于 $g^z$ 在 $G$ 中均匀，而乘以 $m$ 是 $G$ 的双射，无论 $m$ 是什么 $c_2$ 都是均匀的，且 $c_1 = g^y$ 与 $m$ 无关。于是密文不携带任何关于 $b$ 的信息，任何对手攻击 $\tilde\Pi$ 的成功概率恰为 $\tfrac12$——它是群上的一次一密。

现在设 $\mathcal A$ 攻击 ElGamal。DDH 区分器 $D(G, q, g, h_1, h_2, h_3)$ 令 $pk = (G, q, g, h_1)$，运行 $\mathcal A(pk)$ 得到 $m_0, m_1$，选取 $b$，把密文 $\langle h_2, h_3\cdot m_b\rangle$ 交给 $\mathcal A$，并当且仅当 $\mathcal A$ 输出 $b$ 时输出 $1$。在真实三元组 $(g^x, g^y, g^{xy})$ 上，密文就是在 $pk$ 之下、以随机性 $y$ 做出的真正 ElGamal 加密；在随机三元组上，它是 $\tilde\Pi$ 下的加密。于是
$$
\Prob[\mathsf{PubK}^{\mathsf{cpa}}_{\mathcal A, \mathrm{ElGamal}}(n) = 1] - \tfrac12 = \Prob[D(\text{真实}) = 1] - \Prob[D(\text{随机}) = 1] \le \mathsf{negl}(n). 
$$
:::

ElGamal 的密文长度是消息的两倍，而且消息必须是群元素。它还是**可延展的**：由 $\langle c_1, c_2\rangle$ 任何人都能构造 $\langle c_1, c_2\cdot g\rangle$，它是 $m\cdot g$ 的加密，因此不是 CCA-安全的（[[#ex-elgamal-cca]]）。可延展性有时反倒被当作特性——它使 ElGamal 是**同态的**，在电子选举中有用——但一般用途的加密需要 CCA-安全。

::: example 在 11 阶群中的 ElGamal {#ex-elgamal}
在 $\Z_{23}^*$ 中由 $g = 4$ 生成的 $q = 11$ 阶子群中工作。Bob 的私钥是 $x = 7$。算出他的公钥；用随机性 $y = 3$ 加密 $m = 9$（一个属于子群的元素），再解密。
::: solution
$h = 4^7 \bmod 23 = 8$（$4$ 的幂依次为 $1, 4, 16, 18, 3, 12, 2, 8, \dots$）。加密：$c_1 = 4^3 = 64 \equiv 18$；$h^y = 8^3 = 512 \equiv 6$，故 $c_2 = 6\cdot 9 = 54 \equiv 8$。密文是 $\langle 18, 8\rangle$。解密：$c_1^{\,x} = 18^7 \bmod 23 = 6$，其逆元是 $4$（因为 $6 \cdot 4 = 24 \equiv 1$），$c_2\cdot 6^{-1} = 8 \cdot 4 = 32 \equiv 9 = m$。另外，由于 $c_1$ 的阶整除 $11$，$c_1^{-x} = c_1^{\,q - x} = 18^4$，可以免去求逆。用 $y = 5$ 对同一个 $m$ 再加密一次会得到完全不同的密文——随机化加密，正如 CPA-安全所要求。

```python
p, q, g, x = 23, 11, 4, 7          # 仅供演示的玩具参数
h = pow(g, x, p)
y, m = 3, 9
c1, c2 = pow(g, y, p), m * pow(h, y, p) % p
print(h, c1, c2, c2 * pow(c1, q - x, p) % p)
```

```console
$ python3 elgamal.py
8 18 8 9
```
:::
:::

## RSA

RSA（Rivest、Shamir 与 Adleman，1977 年发现、1978 年发表）使用 $N = pq$ 的群 $\Z_N^*$，它的阶 $\phi(N) = (p-1)(q-1)$ 只有选定 $p$ 和 $q$ 的人知道。

::: definition RSA 密钥生成与 RSA 问题 {#def-rsa}
$\mathsf{GenRSA}(1^n)$ 选取互异的均匀 $n$ 位素数 $p, q$，令 $N = pq$、$\phi(N) = (p-1)(q-1)$，选取满足 $\gcd(e, \phi(N)) = 1$ 的 $e > 1$，计算 $d = e^{-1} \bmod \phi(N)$，输出 $(N, e, d)$。称 **RSA 问题**是困难的，若对每个 PPT $\mathcal A$，
$$
\Prob\big[\mathcal A(N, e, y) = x \text{ 满足 } x^e \equiv y \pmod N\big] \le \mathsf{negl}(n),
$$
其中 $(N, e, d) \gets \mathsf{GenRSA}(1^n)$，$y$ 在 $\Z_N^*$ 中均匀。
:::

由 [[cryptography/number-theory#cor-eth-root]]，$x \mapsto x^e$ 是 $\Z_N^*$ 的置换，逆映射为 $y \mapsto y^d$：有了 $d$，两个方向都容易计算；而没有 $d$——在 RSA 假设之下——则难以求逆。它是一个**陷门置换**。知道 $d$ 与知道因子等价（给定 $e$ 和 $d$ 存在一个高效的随机化算法可分解 $N$），所以 RSA 假设蕴含大整数分解假设；反之是否成立仍是未解问题。

::: definition 教科书式 RSA {#def-textbook-rsa}
公钥是 $(N, e)$，私钥是 $d$。把 $m \in \Z_N$ 加密为 $c = m^e \bmod N$，解密为 $m = c^d \bmod N$。
:::

::: proposition 教科书式 RSA 解密正确 {#prop-rsa-correct}
对每个 $m \in \Z_N$（不只是 $m \in \Z_N^*$），$(m^e)^d \equiv m \pmod N$。
:::

::: proof
写 $ed = 1 + k(p-1)(q-1)$，$k \ge 0$。模 $p$：若 $p \mid m$，两边都是 $0$；否则由费马定理 $m^{ed} = m\cdot(m^{p-1})^{k(q-1)} \equiv m$。模 $q$ 同理。既然 $m^{ed} \equiv m$ 同时模 $p$ 和模 $q$ 成立，由中国剩余定理（[[cryptography/number-theory#thm-crt]]）得 $m^{ed} \equiv m \pmod N$。
:::

::: example 用玩具数字做 RSA {#ex-rsa}
设 $p = 61$、$q = 53$、$e = 17$。计算 $N$、$\phi(N)$ 和 $d$；加密 $m = 65$；再分别用直接法和中国剩余定理解密。
::: solution
$N = 3233$，$\phi(N) = 60 \cdot 52 = 3120$，$d = 17^{-1} \bmod 3120 = 2753$（[[cryptography/number-theory#ex-egcd]]）。加密：$c = 65^{17} \bmod 3233 = 2790$。解密：$2790^{2753} \bmod 3233 = 65$。

用中国剩余定理时，私钥持有者改在素数模下工作，指数分别按 $p - 1$ 和 $q - 1$ 归约：$d_p = d \bmod 60 = 53$，$d_q = d \bmod 52 = 49$。于是 $m_p = 2790^{53} \bmod 61 = 4$，$m_q = 2790^{49} \bmod 53 = 12$。用 $q^{-1} \bmod p = 38$ 合并：$h = 38(m_p - m_q) \bmod 61 = 38\cdot(-8) \bmod 61 = 1$，$m = m_q + hq = 12 + 53 = 65$。

```python
p, q, e = 61, 53, 17                  # 教科书式玩具密钥：不安全
N, phi = p * q, (p - 1) * (q - 1)
d = pow(e, -1, phi)
c = pow(65, e, N)
mp, mq = pow(c, d % (p - 1), p), pow(c, d % (q - 1), q)
h = pow(q, -1, p) * (mp - mq) % p
print(N, phi, d, c, pow(c, d, N), mq + h * q)
```

```console
$ python3 rsa_toy.py
3233 3120 2753 2790 65 65
```

模 $p$ 和模 $q$ 的幂运算用的数和指数都只有一半长，所以用课本乘法每次的代价约是模 $N$ 幂运算的八分之一；做两次，中国剩余定理解密大约快四倍。每个 RSA 库都这么做。
:::
:::

::: widget euclid
a: 3120
b: 17
mode: extended
caption: 计算 RSA 私钥指数：对 $\phi(N) = 3120$ 与 $e = 17$ 做扩展欧几里得算法得到 $3120\cdot 2 + 17\cdot(-367) = 1$，于是 $d \equiv -367 \equiv 2753$。任何知道 $\phi(N)$ 的人都能瞬间算出这个；这就是 $\phi(N)$ 必须和 $p$、$q$ 一样保密的原因。试试别的公开指数，比如 $e = 7$（合法，因为 $\gcd(7, 3120) = 1$）和 $e = 15$（非法：最大公因数是 $15$）。
:::

### 为什么教科书式 RSA 不安全

教科书式 RSA 是一个陷门置换，不是一个加密方案，直接拿它会从几个方面失败：

1. **它是确定性的**，因此不是 CPA-安全的。若消息已知只是"是"或"否"，或是一个 4 位 PIN 码，窃听者把每个候选在公钥下加密再比对即可。
2. **它是可延展的**：$(m_1m_2)^e = m_1^e m_2^e$，所以由 $c = m^e$ 任何人都能造出 $c\cdot 2^e$，即 $2m$ 的加密。用这把玩具密钥，$2790\cdot 2^{17} \bmod 3233 = 3017$ 解密得 $130$。攻击者只要有任何解密预言机——哪怕是部分的——就能利用这一点。
3. **小消息会泄露。**$e = 3$ 且 $m < N^{1/3}$ 时根本不曾模 $N$ 归约，$m$ 就是 $c$ 的整数立方根。同一消息发给三个 $e = 3$ 的收件人，可用中国剩余定理恢复（Håstad 广播攻击）。
4. **RSA 假设说的是随机的 $y$。**它对结构化的消息——小的、或共享已知比特的——没有任何保证；对 $m$ 的奇偶性这类部分信息也没有说任何话。

补救是在施加置换之前用随机性和冗余**填充**消息。更早的 PKCS#1 v1.5 填充（固定头部之后填随机非零字节）是随机化的，但 1998 年 Daniel Bleichenbacher 证明：一个会泄露解密值头部格式是否正确的服务器就是一个填充预言机，攻击者以大约百万次量级的查询就能解密任意密文——这是 [[cryptography/block-ciphers]] 中填充预言机的公钥版。该攻击的变体在部署系统中二十年里不断重现。TLS 1.3 彻底移除了用 RSA 加密传输密钥的用法。

### RSA-OAEP

::: definition RSA-OAEP {#def-oaep}
设 $G$ 与 $H$ 是哈希函数（实践中由掩码生成函数从 SHA-256 构造，见 PKCS#1）。加密 $m$ 时，选取均匀的 $k_0$ 位串 $r$，计算
$$
s = (m \,\|\, 0^{k_1}) \oplus G(r), \qquad t = r \oplus H(s), \qquad c = (s \,\|\, t)^e \bmod N .
$$
解密时，计算 $s \,\|\, t = c^d \bmod N$，再算 $r = t \oplus H(s)$ 与 $m \,\|\, z = s \oplus G(r)$；若 $z = 0^{k_1}$ 则输出 $m$，否则输出 $\bot$。
:::

OAEP（**optimal asymmetric encryption padding**，最优非对称加密填充；Bellare 与 Rogaway，1994）是一个以哈希函数为密钥的三轮 Feistel 网络。随机的 $r$ 使加密随机化；冗余 $0^{k_1}$ 意味着并非由加密算法产生的密文几乎必然解密为 $\bot$，因此解密预言机泄露不了有用的东西。Fujisaki、Okamoto、Pointcheval 与 Stern（2001）在**随机预言机模型**下、于 RSA 假设之上证明了 RSA-OAEP 是 CCA-安全的，该模型把 $G$ 和 $H$ 当作真正随机的函数来建模（Bellare 与 Rogaway 最初的论证有一处漏洞，由 Shoup 于 2001 年发现）。它已标准化进 PKCS#1 v2.2（RFC 8017）。即便如此，实现也必须让一切解密失败在内容和时序上都不可区分——Manger（2001）描述过针对 OAEP 实现的一个预言机攻击，泄露的是*哪一项*检查失败。

::: warning 绝不用教科书式 RSA，绝不自己发明填充
上面列出的每个弱点都在真实系统中造成过破绽：未填充或随意填充的 RSA、配短消息的 $e = 3$、可区分的填充错误，以及用低质量随机性生成的密钥（2012 年，两个研究组各自独立发现，公共互联网上有百分之零点几的 RSA 密钥与另一把密钥共享一个素因子，于是两把都能用一个最大公因数分解掉）。安全的做法是使用经过评审的库的 RSA-OAEP，或者对多数用途更好的、基于椭圆曲线 Diffie–Hellman 的混合加密。本章的玩具代码只用于核对计算。
:::

::: quiz
Alice 用选举管理机构的公钥、以教科书式 RSA 加密她的选票 `YES` 或 `NO`，并把密文公开发帖。旁观者能得知什么？

- [ ] 不知道 $N$ 的因子就什么也得不到。
- [x] 她的选票：旁观者自己把两种可能的选票都加密一遍再比对。
- [ ] 只能得知选票的长度。
- [ ] 她的选票，但仅当 $e = 3$ 时。
::: solution
教科书式 RSA 是确定性的，而公钥让人人都能加密。明文只有两种可能，旁观者计算 `YES`$^e$ 和 `NO`$^e$ 模 $N$，看哪个与密文相符就中了；不需要分解，$e$ 的大小也无关。像 OAEP 这样的随机化填充可防止这一点。
:::
:::

## 椭圆曲线

$\Z_p^*$ 这类群容许指标法攻击，其元素因此必须长达数千位。1985 年由 Neal Koblitz 与 Victor Miller 各自独立提议用于密码学的椭圆曲线群，除通用的 $\sqrt q$ 方法（对精心挑选的曲线）外没有任何已知更好的攻击，所以约 $256$ 位的元素就能提供 128 位安全。

::: definition 素数域上的椭圆曲线 {#def-ec}
设 $p > 3$ 为素数，$a, b \in \Z_p$ 且 $4a^3 + 27b^2 \not\equiv 0 \pmod p$。**椭圆曲线** $E(\Z_p)$ 是方程 $y^2 = x^3 + ax + b$ 的解 $(x, y) \in \Z_p^2$ 的集合，再加一个**无穷远点** $\mathcal O$。群运算用加法记法，单位元是 $\mathcal O$，且 $-(x, y) = (x, -y)$。对 $P_1 = (x_1, y_1)$、$P_2 = (x_2, y_2)$ 且 $P_2 \ne -P_1$，令
$$
\lambda = \begin{cases} \dfrac{y_2 - y_1}{x_2 - x_1} & P_1 \ne P_2,\\[2mm] \dfrac{3x_1^2 + a}{2y_1} & P_1 = P_2, \end{cases}
$$
并置 $P_1 + P_2 = (x_3, y_3)$，其中 $x_3 = \lambda^2 - x_1 - x_2$，$y_3 = \lambda(x_1 - x_3) - y_1$；且 $P + (-P) = \mathcal O$。
:::

在实数上，这些公式有几何含义：过 $P_1$ 与 $P_2$ 的直线（两点重合时为切线）与曲线交于第三点，$P_1 + P_2$ 就是该点关于 $x$ 轴的反射。关于 $a$ 与 $b$ 的条件排除了奇异曲线。这一运算满足结合律——从而把 $E(\Z_p)$ 变成交换群——是一条经典定理，证明很长（逐点计算，或经由代数几何）；我们不加证明地使用它。由**哈塞（Hasse）定理**，点数满足 $\lvert\#E(\Z_p) - (p + 1)\rvert \le 2\sqrt p$。

::: widget plot
f: sqrt(x^3 + a*x + b); -sqrt(x^3 + a*x + b)
x: -3, 4
y: -6, 6
sliders: a=-3:0.5:2; b=0:0.5:4
equal: true
labels: y = \sqrt{x^3 + ax + b}; y = -\sqrt{x^3 + ax + b}
caption: 实曲线 $y^2 = x^3 + ax + b$，群运算背后的图景：过两点的直线与曲线交于第三点，把它关于 $x$ 轴反射就得到两点之和。拖动 $a$ 和 $b$：曲线有一个或两个连通分支，并恰在 $4a^3 + 27b^2 = 0$ 时变成奇异（不可用），例如 $a = -3$、$b = 2$，此时 $x^3 - 3x + 2 = (x - 1)^2(x + 2)$，曲线在 $(1, 0)$ 自交。密码学在 $\Z_p$ 上使用同样的公式，那里的"曲线"是散落的点集。
:::

::: example 玩具曲线上的算术 {#ex-ec}
在 $\Z_{17}$ 上的曲线 $E\colon y^2 = x^3 + 2x + 2$ 上，取 $G = (5, 1)$。验证 $G$ 在曲线上，计算 $2G$ 与 $3G$，并求 $G$ 的阶。
::: solution
$G$ 在曲线上：$1^2 = 1$，而 $5^3 + 2\cdot 5 + 2 = 137 = 8 \cdot 17 + 1 \equiv 1$。

$2G$：$\lambda = (3\cdot 5^2 + 2)/(2\cdot 1) = 77/2$。模 $17$ 下 $77 \equiv 9$ 且 $2^{-1} \equiv 9$，故 $\lambda = 81 \equiv 13$。于是 $x_3 = 13^2 - 5 - 5 = 159 \equiv 6$，$y_3 = 13(5 - 6) - 1 = -14 \equiv 3$。所以 $2G = (6, 3)$。

$3G = 2G + G$：$\lambda = (1 - 3)/(5 - 6) = (-2)/(-1) = 2$；$x_3 = 4 - 6 - 5 = -7 \equiv 10$；$y_3 = 2(6 - 10) - 3 = -11 \equiv 6$。所以 $3G = (10, 6)$。

程序继续写出这个序列：

```python
P_MOD, A = 17, 2                     # 玩具曲线 y^2 = x^3 + 2x + 2，定义在 Z_17 上

def ec_add(P, Q):
    """在玩具曲线上做加法；None 表示无穷远点。"""
    if P is None: return Q
    if Q is None: return P
    (x1, y1), (x2, y2) = P, Q
    if x1 == x2 and (y1 + y2) % P_MOD == 0:
        return None                                   # P + (-P) = O
    if P == Q:
        lam = (3 * x1 * x1 + A) * pow(2 * y1, -1, P_MOD) % P_MOD
    else:
        lam = (y2 - y1) * pow(x2 - x1, -1, P_MOD) % P_MOD
    x3 = (lam * lam - x1 - x2) % P_MOD
    return (x3, (lam * (x1 - x3) - y1) % P_MOD)

R, G = None, (5, 1)
for k in range(1, 20):
    R = ec_add(R, G)
    print(k, R)
```

```console
$ python3 ec_toy.py
1 (5, 1)
2 (6, 3)
3 (10, 6)
4 (3, 1)
5 (9, 16)
...
17 (6, 14)
18 (5, 16)
19 None
```

$19G = \mathcal O$，且 $18G = (5, 16) = -G$。清点解可知曲线上有 $18$ 个仿射点加 $\mathcal O$，故 $\#E = 19$——落在哈塞区间 $18 \pm 8.2$ 内——而 $19$ 是素数，所以 $G$（和除 $\mathcal O$ 外的每个点一样）生成整个群。
:::
:::

标量乘法 $kP$ 用**倍加**（double-and-add，平方-乘的加法版本），需 $O(\log k)$ 次群运算；**椭圆曲线离散对数问题**是由 $P$ 和 $kP$ 反求 $k$。椭圆曲线 Diffie–Hellman（ECDH）就是此群中的 [[#alg-dh]]：在玩具曲线上，秘密为 $3$ 的 Alice 发送 $3G = (10, 6)$，秘密为 $7$ 的 Bob 发送 $7G = (0, 6)$，双方都算得 $21G = 2G = (6, 3)$。截至 2026 年广泛使用的曲线是 NIST P-256（FIPS 186）与 Curve25519（Bernstein，2006），后者的 Diffie–Hellman 函数 X25519 规定于 RFC 7748；两者的群都是阶约 $2^{252}$–$2^{256}$ 的素数阶群。Curve25519 的设计使朴素的实现天然就是恒定时间的，并且每个 32 字节串都是合法的公钥，从而避开了一类对端发来不在预定曲线上的点的攻击。换用其他曲线时，实现必须检查收到的点在曲线上。

::: quiz
在 [[#ex-ec]] 的玩具曲线上，Bob 的公钥是 $Q = 5G = (9, 16)$。哪句话正确？

- [ ] Bob 的私钥可以是 $5, 24, 43, \dots$ 中任何一个，而且它们给出不同的解密结果。
- [x] 求 Bob 的私钥就是在 $19$ 阶群中解一个离散对数，在这里至多试 $19$ 次。
- [ ] 因为曲线定义在 $\Z_{17}$ 上，私钥只有 $17$ 种可能。
- [ ] $-Q = (9, -16)$ 不在曲线上，所以 Bob 的密钥无效。
::: solution
群是 $19$ 阶素数群，私钥取在 $\Z_{19}$ 中；$5, 24, 43, \dots$ 给出同一个点，表现完全相同。从 $(9, 16)$ 恢复 $5$ 就是 ECDLP：对 $19$ 个元素的群易如反掌，对 $2^{256}$ 阶的群则不可行。域的大小 $17$ 不是群的阶；而 $-Q = (9, -16) = (9, 1)$ 在曲线上（它是 $14G$）。
:::
:::

### 参数规模

[[cryptography/number-theory]] 中的通用攻击与专用攻击决定了达到给定安全级别所需的密钥大小，三类群的结果截然不同。下表依照 NIST SP 800-57 Part 1（截至 2026 年），它与其他国家的推荐值高度一致：

| 安全级别 | 对称密钥 | RSA 模数 / 有限域 $p$ | 椭圆曲线群的阶 |
|---|---|---|---|
| 112 位 | 112 | 2048 | 224 |
| 128 位 | 128 | 3072 | 256 |
| 192 位 | 192 | 7680 | 384 |
| 256 位 | 256 | 15 360 | 512 |

椭圆曲线一列线性增长（安全级别的两倍，因为有 $\sqrt q$ 的通用攻击），而 RSA 一列增长得快得多，因为数域筛法是次指数时间的。

::: example 这些规模意味着什么 {#ex-sizes}
在 128 位级别，比较下列字节数：(a) RSA-3072 的公开模数与一条 RSA-OAEP 密文；(b) 3072 位有限域群中一条 ElGamal 密文；(c) 一个 X25519 公钥与椭圆曲线 KEM 发送的封装。
::: solution
(a) 模数 $3072$ 位 $= 384$ 字节，每条 RSA 密文是 $\Z_N$ 的元素，也是 $384$ 字节，无论消息多短。(b) ElGamal 密文是两个群元素，$2 \times 384 = 768$ 字节。(c) X25519 公钥是 $32$ 字节，基于 ECDH 的 KEM 发送一个点，$32$ 字节。此级别上椭圆曲线运算也比用 3072 位模数的 RSA 解密快得多（中国剩余定理的每个半量级约需 $(3072/2)^3$ 比例的运算），尽管 $e = 65537$ 的 RSA *加密*很便宜：$17$ 次模乘。这就是截至 2026 年椭圆曲线 Diffie–Hellman 成为 TLS 与 SSH 默认密钥交换、RSA 主要退守签名与证书的原因。
:::
:::

## 混合加密

公钥运算比 AES 慢数千倍，且处理的消息短而有结构。真实系统因此采用**混合加密**：公钥的**密钥封装机制**（key-encapsulation mechanism，KEM）产生一把新鲜的对称密钥 $k$ 及它的一个封装，由对称认证加密方案（**数据封装机制**，data-encapsulation mechanism）在 $k$ 之下加密真正的数据。椭圆曲线 KEM 中，收件人的公钥是 $Q = xG$；发送方选取 $y$，发送 $yG$，通过散列共享点 $yQ = xyG$ 导出 $k$。若 KEM 是 CCA-安全的而对称方案是认证加密方案，则组合是 CCA-安全的（Cramer 与 Shoup，2003）。这正是 ECIES、HPKE（RFC 9180，2022）的结构，也是交互式形式的 TLS 1.3 握手的结构。后量子 KEM 的 ML-KEM（[[cryptography/post-quantum]]）嵌入同一结构。

::: history
1976 年，惠特菲尔德·迪菲（Whitfield Diffie）与马丁·赫尔曼（Martin Hellman）发表了《密码学的新方向》（"New directions in cryptography"，《信息论汇刊》），创立了公钥密码学并给出了他们的密钥交换协议；Ralph Merkle 在学生时代已独立设计出一种公钥方案（"Merkle 谜题"）。Ron Rivest、Adi Shamir 与 Leonard Adleman 于 1977 年发明了 RSA（发表于《ACM 通讯》，1978）。英国政府通信总部（GCHQ）的 James Ellis（1970）、Clifford Cocks（1973）与 Malcolm Williamson（1974）在保密状态下发现了等价的思想，直到 1997 年才公开。Michael Rabin（1979）给出了一个可证明与大整数分解同等困难的方案；Shafi Goldwasser 与 Silvio Micali（1984）给出了第一个可证明 CPA-安全的公钥加密；Taher ElGamal 于 1985 年发表了他的方案；Neal Koblitz 与 Victor Miller 在同一年各自独立提出椭圆曲线密码学。Mihir Bellare 与 Phillip Rogaway 于 1993–1994 年提出 OAEP 与随机预言机方法论；Ronald Cramer 与 Victor Shoup 于 1998 年给出了第一个不用随机预言机的实用 CCA-安全方案。
:::

## 后续内容

公钥加密在没有共享秘密的情况下带来了机密性，但给不了真实性：谁都能给 Bob 加密，而目前还没有任何东西阻止 Mallory 把 Bob 的公钥换成她自己的。[[cryptography/signatures]] 补上数字签名（采用先散列后签名方式的 RSA、Schnorr、ECDSA），以及把公钥绑定到名字上的证书。[[cryptography/protocols]] 把 Diffie–Hellman、签名与 AEAD 组合成 TLS 1.3 的认证密钥交换。而 [[cryptography/post-quantum]] 解释肖尔（Shor）算法为何打破本章的一切——大整数分解、有限域与椭圆曲线的离散对数——以及由什么来取代它们。

::: summary
- **Diffie–Hellman** 密钥交换发送 $g^x$ 与 $g^y$，商定 $g^{xy}$（[[#alg-dh]]）；在 DDH 之下对窃听者安全（[[#thm-dh]]），但没有认证就挡不住中间人。
- **公钥加密**：持有 $pk$ 的对手无法区分加密时才是 CPA-安全的（[[#def-pke]]）；确定性方案永远不满足。CCA-安全再加一个解密预言机。
- **ElGamal** 把 $m$ 加密为 $\langle g^y, h^y m\rangle$，在 DDH 之下 CPA-安全（[[#thm-elgamal]]），但可延展。
- **RSA**：$N = pq$，$ed \equiv 1 \pmod{\phi(N)}$，$m \mapsto m^e$ 是陷门置换（[[#def-rsa]]、[[#prop-rsa-correct]]）。**教科书式 RSA 不安全**——确定性、可延展、小消息泄露。**RSA-OAEP**（[[#def-oaep]]）在随机预言机模型下 CCA-安全；PKCS#1 v1.5 加密则招来填充预言机。
- **椭圆曲线**给出只有通用 $\sqrt q$ 攻击的群（[[#def-ec]]）；在 $\Z_{17}$ 上的 $y^2 = x^3 + 2x + 2$ 上，$G = (5, 1)$ 的阶为 $19$。256 位曲线提供 128 位安全。
- 实践中，公钥密码学封装一把对称密钥（**混合加密**，KEM/DEM），真正的代码使用经过评审的库。
:::

## 习题

::: exercise 公司的密钥数 {level=1 check="499500"}
要使 $1000$ 名员工中人人配对都持有自己的密钥，需要多少把对称密钥？改用公钥加密又需要多少对密钥？（填入对称密钥数。）
::: solution
$\binom{1000}{2} = 1000 \cdot 999/2 = 499\,500$ 把对称密钥，每把都需安全送达两人。用公钥加密，$1000$ 对密钥就够了，公钥一半可以公布——尽管它们必须*经过认证*，这是证书的职责（[[cryptography/signatures]]）。
:::
:::

::: exercise 一次 Diffie–Hellman 交换 {level=1 check="18"}
$p = 23$、$g = 5$，Alice 的秘密 $x = 4$、Bob 的秘密 $y = 3$。计算两个公开值与共享密钥。（填入密钥。）
::: solution
$h_A = 5^4 = 625 = 27 \cdot 23 + 4$，故 $h_A = 4$；$h_B = 5^3 = 125 = 5\cdot 23 + 10$，故 $h_B = 10$。Bob 计算 $h_A^{\,y} = 4^3 = 64 \equiv 18$。Alice 计算 $h_B^{\,x} = 10^4$：$10^2 = 100 \equiv 8$，$8^2 = 64 \equiv 18$。双方都得到 $18 = 5^{12} \bmod 23$。
:::
:::

::: exercise 手工 RSA {level=1 check="1752"}
用玩具密钥 $N = 3233$、$e = 17$、$d = 2753$ 加密 $m = 2$。密文 $c = 1$ 解密成什么？（填入 $m = 2$ 的密文。）
::: solution
$2^{17} = 131\,072 = 40 \cdot 3233 + 1752$，故 $c = 1752$，`pow(1752, 2753, 3233)` 给回 $2$。密文 $c = 1$ 解密为 $1^d = 1$：教科书式 RSA 把 $0$、$1$ 和 $N - 1$ 映为自身——这是消息加密前必须填充的又一个理由。
:::
:::

::: exercise 教科书式 RSA 的可延展性 {level=2 check="130"}
给定玩具密文 $c = 2790$（$65$ 在 $N = 3233$、$e = 17$ 下的加密），不用 $d$ 算出 $2m$ 的一个密文，并说出它解密成什么。（填入解密结果。）
::: solution
$c' = c \cdot 2^{17} \bmod 3233 = 2790 \cdot 1752 \bmod 3233 = 3017$。由于 $(2m)^e = 2^em^e$，它解密为 $2 \cdot 65 = 130$，`pow(3017, 2753, 3233)` 可以证实。一个能拿到"看起来无害"的密文的解密结果的人，就能借盲化获取关于 $m$ 的信息：解密 $c\cdot r^e$，再把答案除以 $r$。
:::
:::

::: exercise ElGamal 不是 CCA-安全的 {#ex-elgamal-cca level=2}
给出一个以概率 $1$ 赢得针对 ElGamal 的 $\mathsf{PubK}^{\mathsf{cca}}$ 的对手。
::: solution
任取不同的 $m_0, m_1 \in G$。收到挑战 $\langle c_1, c_2\rangle$ 后，向解密预言机查询 $\langle c_1, c_2\cdot g\rangle$——它与挑战不同，所以允许。答案是 $m_b\cdot g$；乘上 $g^{-1}$ 后与 $m_0$ 比较。DH 型加密的 CCA-安全变体（Cramer–Shoup，或对称部分带认证的 DHIES/ECIES）能防止这类修改。
:::
:::

::: exercise 椭圆曲线加法 {level=2 check="13"}
在 $\Z_{17}$ 上的玩具曲线 $y^2 = x^3 + 2x + 2$ 上，由 $4G = (3, 1)$ 用倍点公式计算 $4G + 4G = 8G$。（填入 $8G$ 的 $x$ 坐标。）
::: solution
$\lambda = (3\cdot 3^2 + 2)/(2 \cdot 1) = 29/2$。模 $17$：$29 \equiv 12$，$12 \cdot 2^{-1} = 12 \cdot 9 = 108 \equiv 6$。于是 $x_3 = 36 - 3 - 3 = 30 \equiv 13$，$y_3 = 6(3 - 13) - 1 = -61 \equiv 7$。所以 $8G = (13, 7)$，与 [[#ex-ec]] 的表一致。
:::
:::

::: exercise 小指数下的立方根 {level=2}
解释为什么 $e = 3$ 的教科书式 RSA 在 $m < N^{1/3}$ 时会把 $m$ 完全泄露，哪怕 $N$ 是 2048 位的模数；再解释 OAEP 为何能防止这一点。
::: solution
若 $m < N^{1/3}$ 则 $m^3 < N$，于是 $c = m^3 \bmod N$ 就等于整数 $m^3$；而模 $N$ 归约——恰恰是让求 $e$ 次根困难的东西——从未发生。取整数立方根（牛顿法或二分搜索，多项式时间）就恢复了 $m$。2048 位的模数下，至多约 $682$ 位的消息都会这样泄露——例如一把 256 位的 AES 密钥。OAEP 由 $r$ 导出伪随机的比特填满整个分组，$s \,\|\, t$ 几乎和 $N$ 一样大，归约必然发生。
:::
:::

::: exercise $\phi(N)$ 泄露因子 {level=3}
证明：给定 $N = pq$（互异素数）和 $\phi(N)$，可以在多项式时间内算出 $p$ 和 $q$。对 $N = 3233$、$\phi(N) = 3120$ 应用之。
::: solution
$\phi(N) = (p-1)(q-1) = N - (p + q) + 1$，故 $p + q = N - \phi(N) + 1$。于是 $p$ 与 $q$ 是 $X^2 - (p+q)X + N = 0$ 的两个根，即 $\tfrac12\big((p+q) \pm \sqrt{(p+q)^2 - 4N}\big)$，用一个整数平方根即可在多项式时间算出。对 $N = 3233$：$p + q = 3233 - 3120 + 1 = 114$，判别式 $114^2 - 4\cdot 3233 = 12996 - 12932 = 64$，故 $p, q = (114 \pm 8)/2 = 61, 53$。所以计算 $\phi(N)$ 与分解同等困难，RSA 密钥生成必须把 $\phi(N)$ 连同 $d$ 一起保密。
:::
:::

::: exercise 实现玩具 ECDH 并清点群的阶 {level=3}
用 [[#ex-ec]] 的 `ec_add`，实现倍加标量乘法 `ec_mul(k, P)`，并用来 (a) 验证 $19G = \mathcal O$，(b) 在秘密 $3$ 与 $7$ 之间执行 ECDH，(c) 穷举清点曲线上的点。为什么即使放在真实曲线上，这段代码对真实密钥也是不可接受的？
::: solution
```python
def ec_mul(k, P):
    """倍加：在玩具曲线上算 k*P（不是恒定时间）。"""
    R = None
    for bit in bin(k)[2:]:
        R = ec_add(R, R)
        if bit == "1":
            R = ec_add(R, P)
    return R

G = (5, 1)
print(ec_mul(19, G))                                     # None：无穷远点
A, B = ec_mul(3, G), ec_mul(7, G)
print(A, B, ec_mul(3, B), ec_mul(7, A))
pts = [(x, y) for x in range(17) for y in range(17) if (y * y - x**3 - 2 * x - 2) % 17 == 0]
print(len(pts) + 1)
```

```console
$ python3 ecdh_toy.py
None
(10, 6) (0, 6) (6, 3) (6, 3)
19
```

双方都得到 $(6, 3) = 21G = 2G$，群有 $19$ 个元素。对真实密钥而言这段代码不可接受：它的分支和 Python 的大整数运算使运行时间依赖秘密标量（时序侧信道）；它不验证收到的点；加法公式的特殊情形由与数据相关的分支处理；而 $17$ 个元素的域当然随手就能破。库实现 X25519 或 P-256 时采用恒定时间的域运算和完备的加法公式。
:::
:::
