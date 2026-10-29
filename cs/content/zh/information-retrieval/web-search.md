前几章的技术都是为图书馆发展出来的：固定的合集、善意写成的文档、只建一次的索引。网页不是其中的任何一样。没有人把文档集合交给搜索引擎；引擎必须自己一页一页地**抓取（crawling）**，而这些服务器属于别人，还可能声明不希望被抓取。页面每秒都在变化、出现和消失。爬虫抓回的东西里，很大一部分是已见过页面的拷贝或近似拷贝——镜像站点、适合打印的版本、只差一则广告或一个日期的页面。而由于排名靠前就是钱，许多页面专门是为了欺骗排序函数而写的。面对这一切，网络提供了一样图书馆没有的东西：**链接**。一个页面指向另一个页面的链接，是一个小小的、公开的判断——说目标值得一看——而数亿作者都在作出这样的判断。

本章讲使网页搜索与众不同的三个问题。**抓取**：爬虫的体系结构、它欠服务器的礼貌，以及机器人排除协议（Robots Exclusion Protocol，RFC 9309），并依照标准实现一个匹配器。**近似重复检测**：分片（shingling）与杰卡德系数（Jaccard coefficient），**MinHash** 并证明它估计杰卡德系数，用来找候选对的局部敏感哈希，以及查里卡尔（Charikar）的 **SimHash**。**链接分析**：**PageRank**，作为随机冲浪者的平稳分布，并证明传送使它存在、唯一、可用幂迭代以保证的速度算出；还有克莱因伯格（Kleinberg）的 **HITS** 枢纽与权威。图算法见 [[algorithms/graph-search]]，马尔可夫链在 [Maths Atlas: Markov chains](/learn/maths/lesson.php?c=probability&l=markov-chains)，特征向量在 [Maths Atlas: eigenvalues](/learn/maths/lesson.php?c=linear-algebra&l=eigenvalues)。

## 抓取

**爬虫**（crawler，又称蜘蛛、机器人）从一组**种子** URL 出发，抓取每个页面，抽取出其中的链接，把新的 URL 加进待抓页面的队列——**URL 边界**（frontier）。作为图算法，这是网页图上的广度优先搜索（[[algorithms/graph-search#alg-bfs]]）；作为系统，它是一个分布式程序，每秒抓取数千页面、连跑数月而不压垮任何服务器。

::: algorithm 爬虫主循环 {#alg-crawler}
1. 从边界取一个 URL $u$（按优先级与礼貌选取，见下文）。
2. 解析主机名（借助本地 DNS 缓存），检查该主机的 `robots.txt`（有缓存），若被允许就抓取 $u$。
3. 若该页内容与某个已存储的页面完全重复或近似重复，记下重复关系并停止处理它。
4. 否则存储并索引该页，抽取它的链接。对每个链接作**规范化**（解析相对 URL、把方案与主机名转小写、去掉默认端口与片段、套用站点特定规则），若已经见过就丢弃（这是一个集合成员判定，通常在一个磁盘集合前面放一个布隆过滤器）。
5. 把新 URL 连同优先级加进边界，并记录重访 $u$ 的时间。
:::

边界必须调和两个目标。**优先级**决定哪些页面值得先抓：估计质量高的页面（下面会讲的已知图上的 PageRank）、变化频繁的页面、用户会点的页面。**礼貌**限制对每台服务器的压力：爬虫不得对同一主机同时开许多连接，也不得对其连续急促地抓取。Mercator 爬虫（海登（Heydon）与纳约克（Najork），1999）给出了标准设计：按优先级排序的前端队列喂给一批后端队列，每个后端队列装单一主机的 URL，再用一个小顶堆记下每台主机下次可以联系的时间，保证对同一主机的两次请求之间有一段延时——常常是上次抓取时长的若干倍。**重访**本身是一个调度问题：每天变化的页面应当比永不变化的页面更常重抓，可是按每个页面的变化率成比例地重抓，平均新鲜度反而不是最大，因为变化快过重抓速度的页面是无本之木（Cho 与加西亚-莫利纳（Garcia-Molina），2000）。

### 机器人排除协议

站点通过主机根目录下的 `/robots.txt` 文件告诉爬虫哪些可以抓。这一约定由马蒂恩·科斯特（Martijn Koster）在 1994 年提出，经过近三十年的非正式使用之后，标准化为 **RFC 9309**（2022 年 9 月）。

::: definition robots.txt（RFC 9309） {#def-robots}
一个 `robots.txt` 文件由若干**组**构成。每组以一条或多条 `user-agent` 行开始，用**产品令牌**指明爬虫（匹配不区分大小写；`*` 匹配任意爬虫），其后是 `allow` 与 `disallow` **规则**，每条规则带一个路径**模式**。在模式中 `*` 匹配任意字符序列，结尾的 `$` 匹配路径末尾。爬虫服从 user-agent 与其产品令牌相匹配的组（多个匹配时把它们的规则合并），都不匹配时服从 `*` 组。对给定的 URL 路径，**最特殊**的匹配规则——模式最长（按字节计）的那条——说了算；若一条 `allow` 与一条 `disallow` 规则特殊程度相同，应当采用 `allow`。若没有规则匹配，则允许访问；`/robots.txt` 本身的路径永远允许抓取。
:::

RFC 9309 还规定了围绕这个文件的行为。抓取 `robots.txt` 时，爬虫应跟随至少五个连续的重定向。服务器以客户错误应答（`4xx` 状态，如 `404 Not Found`）时，爬虫可以访问任何资源；以服务器错误（`5xx`）应答或根本联系不上时，爬虫必须假定**完全禁止**。爬虫必须能解析至少 $500$ KiB 的文件，且除非文件已联系不上，不应把缓存副本用超过 $24$ 小时。规则按主机、协议与端口区分：`http://example.org/robots.txt` 对 `https://shop.example.org/` 什么也没说。

一个遵循标准优先规则的匹配器只有几行：

```python
import re

def pattern_matches(pat, path):                       # '*' 匹配任意序列，结尾的 '$' 匹配路径末尾
    rx = "".join(".*" if c == "*" else re.escape(c) for c in pat.rstrip("$"))
    return re.match(rx + ("$" if pat.endswith("$") else ""), path) is not None

def allowed(groups, agent, path):
    """groups: (user-agent 令牌的小写列表, [(kind, pattern), ...]) 的列表。"""
    agent = agent.lower()
    chosen = [r for a, r in groups if agent in a]     # 列出了该产品令牌的那些组
    if not chosen: chosen = [r for a, r in groups if "*" in a]
    best = None                                       # 匹配的最长模式取胜；并列时 allow 取胜
    for kind, pat in (rule for r in chosen for rule in r):
        if pat and pattern_matches(pat, path):        # 空模式什么也不匹配
            if best is None or len(pat) > len(best[1]) or (len(pat) == len(best[1]) and kind == "allow"):
                best = (kind, pat)
    return best is None or best[0] == "allow"
```

（一个没有列出的简短 `parse` 函数把文件切成组：连续的 `user-agent` 行开启一组，随后出现的 `allow`/`disallow` 行属于这一组。）

::: example 应用 robots.txt {#ex-robots}
某站点的 `robots.txt` 写着
```text
User-agent: *
Disallow: /private/
Allow: /private/press/
Disallow: /*.pdf$

User-agent: examplebot
User-agent: otherbot
Disallow: /
Allow: /public/
```
为一个叫 `anybot` 的爬虫和一个叫 `ExampleBot` 的爬虫，判断若干路径中哪些可以抓取。
::: solution
`anybot` 不匹配任何具名组，于是用 `*` 组。`ExampleBot` 不区分大小写地匹配 `examplebot`，于是用第二组，完全忽略第一组。匹配器打印：

```text
anybot     /index.html              allowed
anybot     /private/x.html          disallowed
anybot     /private/press/a.html    allowed
anybot     /docs/report.pdf         disallowed
ExampleBot /public/page             allowed
ExampleBot /index.html              disallowed
```

对 `/private/press/a.html`，`Disallow: /private/`（$9$ 字节）与 `Allow: /private/press/`（$15$ 字节）都匹配，更长的取胜。对 `/docs/report.pdf`，模式 `/*.pdf$` 匹配，因为 `*` 吸收了 `docs/report` 而 `$` 锚定末尾。对 `ExampleBot`，在 `/public/page` 上 `Allow: /public/`（$8$ 字节）压过 `Disallow: /`（$1$ 字节），而其余一切路径都禁止。

各实现互不相同。Python 标准库的 `urllib.robotparser`（在 Python 3.14 下测试）按文件次序采用*第一条*匹配的规则而不是最长的，对 `anybot` 的 `/private/press/a.html` 与 `ExampleBot` 的 `/public/page` 都回答 `False`。爬虫作者必须知道自己用的库实现的是哪种语义。
:::
:::

::: warning robots.txt 是请求，不是锁
`robots.txt` 是一个约定，守规矩的爬虫自愿遵守；RFC 9309 明说它不是一种访问授权。把 `/private/` 写进它保护不了任何东西——它把这个路径广告给每个读文件的人。绝不能被抓取的内容需要的是认证。反过来，遵守 `robots.txt` 是一个负责任的爬虫做的*最低限度*，不是它义务的全部。它应当用一个有描述性的 user-agent 加一个联系地址表明身份，限制自己对每台主机的请求速率，在遇到错误或缓慢响应时退避，尊重站点条款以及版权与个人数据的法律，避免抓取会生成无穷 URL 的空间（日历、会话标识符）。截至 2026 年，抓取的目的——搜索建索引、存档、研究、训练机器学习模型——越来越被站点所有者区分对待，他们在 `robots.txt` 里点名具体的产品令牌，允许一些、拒绝另一些；为一个目的采集却冒另一个名字之名的爬虫，是在滥用这一约定。本章的示例跑在本地字符串上，不针对真实站点。
:::

## 近似重复检测

对大型抓取的研究一再发现，很大一部分页面——报告过的数字在四分之一到三分之一之间——是其他页面的近似重复。**完全**重复很容易处理：算每个页面内容的哈希再比较（一个指纹，比如 64 位哈希；见 [[data-structures/hash-tables]]）。近似重复差在一个时间戳、一个计数器、一则广告或几处编辑过的词上，哈希互不相干。我们需要一个相似度的度量，以及一种办法，能在数十亿页面中找出相似的配对，而不必比较所有配对。

::: definition 分片与杰卡德系数 {#def-jaccard}
文档的 **$k$-分片**（shingle）是文档的一切连续 $k$ 个词（或字符）的序列构成的集合。两个集合的**杰卡德系数**为
$$
J(S, T) = \frac{\abs{S \cap T}}{\abs{S \cup T}},
$$
相同集合取 $J = 1$，不相交集合取 $J = 0$。若两个文档分片集合的杰卡德系数超过某个阈值（如 $0.9$），就称它们为**近似重复**。
:::

分片让相似度对词序和局部上下文敏感：改动一个词，只改变含它的 $k$ 个分片，其余原封不动。取 $k = 4$ 个词，《爱丽丝》的首句（$57$ 个词、$54$ 个不同分片）与一个把 "very tired" 改成 "rather tired"、把 "thought Alice" 改成 "said Alice" 的版本，在并集的 $62$ 个分片中共享 $46$ 个，$J = 0.742$。

精确计算 $J$ 需要完整的分片集合，每个页面几千个条目。突破来自布罗德（Broder）（1997）：每个集合只要一个小小的**概要**（sketch），就能从它估计 $J$。

::: theorem MinHash 估计杰卡德系数 {#thm-minhash}
设 $S, T$ 是有限论域 $U$ 的非空子集，$\pi$ 是均匀随机选取的 $U$ 的置换。把 $\pi(x)$ 在 $x \in S$ 上的最小值记作 $\min \pi(S)$。则
$$
\Prob\bigl[\min \pi(S) = \min \pi(T)\bigr] = J(S, T).
$$
:::

::: proof
考虑 $S \cup T$ 中使 $\pi(z)$ 最小的元素 $z$。因为 $\pi$ 是均匀随机置换，$S \cup T$ 的每个元素成为这个 $z$ 的机会均等：由对称性，置换把它们之中任何一个排在最前的可能性相同。若 $z \in S \cap T$，则 $z$ 同时是 $S$ 与 $T$ 的最小化者，两个最小值相等。若 $z \in S \setminus T$，则 $\min\pi(S) = \pi(z)$ 而 $\min\pi(T) > \pi(z)$，因为 $T \subseteq S \cup T$ 不含 $z$ 而 $S \cup T$ 的每个其他元素取值更大；两个最小值不等，$z \in T \setminus S$ 时对称地不等。所以两个最小值相等恰好当 $z \in S \cap T$，这以概率 $\abs{S \cap T}/\abs{S \cup T}$ 发生。
:::

::: corollary MinHash 估计量 {#cor-minhash}
取 $n$ 个独立的随机置换 $\pi_1, \dots, \pi_n$，$S$ 的 **MinHash 签名**为 $(\min \pi_1(S), \dots, \min \pi_n(S))$，而 $S$ 与 $T$ 的签名取值相同的下标所占的比例 $\hat J$ 是 $J(S, T)$ 的无偏估计，方差为 $J(1 - J)/n$。由切比雪夫（Chebyshev）不等式，$\Prob[\abs{\hat J - J} \ge \eps] \le J(1-J)/(n\eps^2)$。
:::

::: proof
由 [[#thm-minhash]]，第 $i$ 个下标处相符是一个均值为 $J$ 的伯努利变量，而 $n$ 个下标相互独立，所以 $n\hat J$ 服从参数为 $n$ 与 $J$ 的二项分布：$\E[\hat J] = J$ 且 $\Var[\hat J] = J(1 - J)/n$。切比雪夫不等式给出尾概率界。
:::

签名不管页面多长都只有（比如说）$n = 200$ 个数，比较两个签名花 $O(n)$。实践中把巨大论域上的随机置换换成哈希函数，这里是 $x \mapsto (ax + b) \bmod p$，$p = 2^{61} - 1$，作用在每个分片的 64 位哈希上。这样的函数只是**近似最小值无关**（min-wise independent）——证明需要的正是这一性质——但实践表现良好：

```python
import random, hashlib

def h64(s):                                    # 字符串的一个固定 64 位哈希
    return int.from_bytes(hashlib.blake2b(s.encode(), digest_size=8).digest(), "big")

P = (1 << 61) - 1                              # 素数；x -> (a x + b) mod P 近似一个置换
def minhash_signature(S, n, seed=0):
    rng = random.Random(seed)                  # 同一个种子对每个集合给出同样的 n 个函数
    ab = [(rng.randrange(1, P), rng.randrange(P)) for _ in range(n)]
    xs = [h64(s) % P for s in S]
    return [min((a * x + b) % P for x in xs) for a, b in ab]

def estimate(sig1, sig2):                      # 最小值相同的下标所占比例
    return sum(u == v for u, v in zip(sig1, sig2)) / len(sig1)
```

对四个段落——$A$，《爱丽丝》的首句；$B$，两处小改动；$C$，两处不同的改动；$D$，全书的第二句——$4$ 词分片集合的真实杰卡德系数，以及用 $16$、$64$、$256$ 个哈希函数的签名得到的估计是（最后一列在下文 SimHash 处解释）：

```text
J(A,B) = 0.742  MinHash n=16,64,256: 0.625, 0.656, 0.715  SimHash distance 5
J(A,C) = 0.828  MinHash n=16,64,256: 0.750, 0.797, 0.836  SimHash distance 7
J(B,C) = 0.606  MinHash n=16,64,256: 0.375, 0.516, 0.590  SimHash distance 8
J(A,D) = 0.000  MinHash n=16,64,256: 0.000, 0.000, 0.000  SimHash distance 33
```

$n = 256$ 时标准差 $\sqrt{J(1-J)/n}$ 约为 $0.03$，估计与真值之差就在这个量级内。

::: example 手算 MinHash {#ex-minhash}
在论域 $\set{1, \dots, 5}$ 中取 $S = \set{1, 3, 4}$、$T = \set{1, 2, 4, 5}$。计算 $J(S, T)$，以及在四个置换 $\pi_1 = (3, 5, 1, 4, 2)$、$\pi_2 = (2, 4, 5, 1, 3)$、$\pi_3 = (5, 1, 4, 2, 3)$ 与 $\pi_4 = (1, 3, 2, 5, 4)$ 下的 MinHash 相符情况，其中 $\pi = (\pi(1), \dots, \pi(5))$。
::: solution
$S \cap T = \set{1, 4}$，$S \cup T = \set{1, 2, 3, 4, 5}$，故 $J = 2/5$。
- $\pi_1$：在 $S$ 上取值为 $\pi_1(1) = 3$、$\pi_1(3) = 1$、$\pi_1(4) = 4$，由 $3$ 取到最小；在 $T$ 上为 $3, 5, 4, 2$，由 $5$ 取到最小。$S \cup T$ 中取值最小的元素是 $3 \in S \setminus T$：**不相符**。
- $\pi_2$：五个元素中的最小取值是 $\pi_2(4) = 1$，而 $4 \in S \cap T$：**相符**。
- $\pi_3$：全局最小化者是 $2$（$\pi_3(2) = 1$），在 $T \setminus S$ 中：**不相符**（$S$ 上的最小值在 $4$，取值 $2$）。
- $\pi_4$：全局最小化者是 $1 \in S \cap T$：**相符**。

四次里两次相符给出 $\hat J = 0.5$，真值是 $0.4$。[[#thm-minhash]] 的证明在每一行里都看得见：要紧的只是 $S \cup T$ 中哪个元素排在最前，而签名相符恰好当它落在交集中。
:::
:::

### 寻找候选对：局部敏感哈希

签名让单次比较变便宜了，可十个页面仍有 $5 \times 10^{17}$ 对。**局部敏感哈希**（locality-sensitive hashing，LSH）不去检查其余配对就找出可能相似的配对。把每个含 $n = br$ 个数的签名切成 $b$ 个**带**（band）、每带 $r$ 个数，把每个带哈希到一个桶里，若两个文档至少在一个带上落进同一个桶，就宣布它们是一个**候选对**。只有候选对才完整比较。

::: proposition 分带的 S 形曲线 {#prop-banding}
若两个文档的杰卡德系数为 $s$ 且它们的签名使用相互独立的 min-hash，则它们成为候选对的概率为
$$
1 - \bigl(1 - s^{r}\bigr)^{b}.
$$
:::

::: proof
在一个带内，$r$ 个下标各自以概率 $s$ 独立相符（[[#thm-minhash]]），于是整个带相符的概率为 $s^r$（忽略桶哈希中不同带的偶然碰撞）。配对成为不了候选，恰好在 $b$ 个带处处都不相符，概率为 $(1 - s^r)^b$。
:::

作为 $s$ 的函数，这是一条 S 形曲线，最陡的上升在 $s \approx (1/b)^{1/r}$ 附近。取 $b = 20$ 个带、每带 $r = 5$（$n = 100$），阈值约在 $0.55$，成为候选对在 $s = 0.3$ 处概率为 $0.047$、$0.5$ 处 $0.47$、$0.6$ 处 $0.80$、$0.7$ 处 $0.975$、$0.8$ 处 $0.9996$。增大 $r$ 把阈值抬高并让它变锐；增大 $b$ 把阈值压低。LSH 的一般形式由彼得·因迪克（Indyk）与拉吉夫·莫特瓦尼（Motwani）（1998）提出，它也是向量空间中近似最近邻搜索——[[information-retrieval/dense-retrieval]] 的问题——的经典做法。

::: widget plot
f: 1 - (1 - x^r)^b
sliders: r=1:1:10; b=1:1:50
x: 0, 1
y: 0, 1
labels: \Pr[\text{成为候选对}] = 1-(1-s^r)^b
caption: 杰卡德系数为 $s$ 的两个文档共享至少一个带的概率。从 $r = 5$、$b = 20$ 开始，注意 $0.55$ 附近的阈值。把 $r$ 升到 $10$、保持 $b = 20$：曲线右移变陡，误报的候选少了，漏掉的近似重复多了；然后再增大 $b$ 来补偿。每种设置都在拿误报（工作量）换漏报（漏掉的重复）。
:::

### SimHash

摩西·查里卡尔（Charikar）（2002）给出另一种概要：一个短短的**指纹**（fingerprint），其汉明距离（Hamming distance）反映加权特征向量的*余弦*相似度。算一个 64 位 SimHash：把文档的每个特征（一个词、一个分片）哈希成 64 位；保留 $64$ 个计数器；对每个特征，若其哈希的第 $i$ 位是 $1$ 就把它的权重加到计数器 $i$，否则减去；计数器 $i$ 为正时，指纹的第 $i$ 位置 $1$。

```python
def simhash(text, bits=64):                    # Charikar 指纹，特征取词对
    v = [0] * bits
    for feature in shingles(text, 2):          # 每个不同词对，权重 1
        h = h64(feature)
        for i in range(bits):
            v[i] += 1 if (h >> i) & 1 else -1
    return sum(1 << i for i in range(bits) if v[i] > 0)
```

在上面的输出里，两个改动过的段落的指纹彼此汉明距离 $5$ 到 $8$，而无关的段落 $D$ 距离 $33$——无关的 64 位串之间本就该有约 $32$。为什么这行得通？指纹的每一位是一个和 $\sum_f w_f\, \sigma_i(f)$ 的符号，其中 $\sigma_i(f) = \pm 1$ 是特征 $f$ 的第 $i$ 个哈希 bit 映成符号：即文档特征向量与一个分量为 $\pm 1$ 的伪随机向量之内积的符号。每一位都是一个**随机超平面**检验。

::: theorem 随机超平面与夹角 {#thm-hyperplane}
设 $\vec u, \vec v \in \R^m$ 是非零向量，夹角为 $\theta \in [0, \pi]$，$\vec g$ 是分布旋转不变的随机向量（例如坐标独立同标准正态）。则
$$
\Prob\bigl[\sgn(\vec g \cdot \vec u) \ne \sgn(\vec g \cdot \vec v)\bigr] = \frac{\theta}{\pi}.
$$
从而用 $k$ 个独立随机向量造出的 $k$ 位指纹，其汉明距离的期望为 $k\theta/\pi$。
:::

::: proof
两个符号不同，恰好当超平面 $\set{\vec x : \vec g \cdot \vec x = 0}$ 把 $\vec u$ 与 $\vec v$ 分开。对这两个符号要紧的只有 $\vec g$ 在 $\vec u$ 与 $\vec v$ 张成的平面上的投影，而由旋转不变性，该投影非零时指向平面内均匀随机的方向。它的零线（超平面在该平面内的痕迹）于是是一条过原点的均匀随机直线，由一个在 $[0, \pi)$ 上均匀分布的角度决定。这条线分开 $\vec u$ 与 $\vec v$，恰好当它的角度落在两者之间的夹角 $\theta$ 之内，概率为 $\theta/\pi$。投影为零的概率是 $0$。指纹的结论由对 $k$ 位取期望的线性即得。
:::

由哈希导出的 $\pm 1$ 向量并非旋转不变，所以对 SimHash 该定理只是近似成立，但表现正如预言。古尔米特·曼库（Manku）、阿尔温德·贾恩（Jain）与阿尼什·达斯·夏尔马（Sarma）（2007）报告说在 Google 用 64 位 SimHash 指纹检测近似重复网页，把汉明距离 $3$ 以内的页面当作近似重复，办法是把位切成分块、对指纹表的位置换副本各建索引，从而找出与查询指纹距离在该范围内的所有指纹——鸽巢原理保证：至多相差 $3$ 位的两个指纹，必在 $4$ 个分块中的某一块上完全相同。

::: quiz
两个集合的杰卡德系数为 $0.6$。用 $n = 100$ 个独立的 min-hash，MinHash 估计的标准差是多少？
- [ ] $0.0024$
- [x] $0.049$
- [ ] $0.24$
- [ ] $0.6$
::: solution
$\sqrt{J(1-J)/n} = \sqrt{0.6 \times 0.4 / 100} = \sqrt{0.0024} \approx 0.049$（[[#cor-minhash]]）。$n$ 翻两番它就减半。第一个选项是方差，不是标准差。
:::
:::

## 链接分析

::: definition 网页图 {#def-web-graph}
**网页图**是有向图 $G = (V, E)$：顶点是页面，页面 $p$ 链接到页面 $q$ 时有一条边 $(p, q)$。**出度** $\mathrm{out}(p)$ 是 $p$ 链接到的不同页面的个数。出度为 $0$ 的页面称为**悬挂**（dangling）页面。链接的文字即其**锚文本**，作为*目标*页面的一部分被索引，因为它用别人的话描述目标。
:::

数入链是页面重要程度的第一个度量，也是容易抬高的一个：造一千个页面全都链向你的页面。谢尔盖·布林（Brin）与劳伦斯·佩奇（Page）的洞见（1998）是让重要程度递归：重要的页面链向它，它就重要，而一个页面的一票在它链接到的所有页面之间平分。

### 随机冲浪者

想象一个冲浪者，从随机一页出发，反复从当前页面均匀随机挑一条链接点下去。长期来看在每个页面花费的时间比例，是重要程度的自然度量——被许多常访问页面链着的页面会被常访问。两个问题随之而来。冲浪者会卡在悬挂页面上。而且冲浪者可能被困在一组只互相链接的页面里（**蜘蛛陷阱**），它会吸走全部的重要程度。补救是**传送**（teleportation）：每一步以概率 $1 - \alpha$ 无视链接，跳到均匀随机选的一页；从悬挂页面出发则必定跳。

::: definition PageRank {#def-pagerank}
设 $n = \abs{V}$。设 $P$ 是行随机的 $n \times n$ 矩阵，$(p, q) \in E$ 时 $P_{pq} = 1/\mathrm{out}(p)$，否则为 $0$，只是悬挂页面 $p$ 的那一行取均匀值 $P_{pq} = 1/n$。给定**阻尼因子** $\alpha \in (0, 1)$，**Google 矩阵**为
$$
G = \alpha P + (1 - \alpha)\, \tfrac{1}{n} \mathbf 1 \mathbf 1\T,
$$
**PageRank** 向量是分量和为 $1$ 且满足 $\vec x G = \vec x$ 的非负行向量 $\vec x$：即转移矩阵为 $G$ 的马尔可夫链的**平稳分布**。写开来，对每个页面 $q$，
$$
x_q = \frac{1 - \alpha}{n} + \alpha \sum_{p \to q} \frac{x_p}{\mathrm{out}(p)} + \alpha \sum_{p \text{ 悬挂}} \frac{x_p}{n}.
$$ {#eq-pagerank}
:::

布林与佩奇用 $\alpha = 0.85$：冲浪者平均沿 $1/(1 - \alpha) \approx 6.7$ 条链接走下去，然后传送一次。传送也可以按页面的非均匀分布 $\vec v$ 进行（**个性化 PageRank**），把 $\frac1n \mathbf 1\T$ 换成 $\vec v$；下文一切对任何分量为正的 $\vec v$ 都成立。

平稳分布存在吗？唯一吗？几十亿页怎么算？对一般马尔可夫链，答案可以是否、否和"很难"：有两个闭类的链有许多个平稳分布，周期链则不收敛。传送项把三个问题一并摆平。

::: theorem 正矩阵的佩龙-弗罗贝尼乌斯（Perron–Frobenius）定理 {#thm-perron}
若 $M$ 是各元素全为正的方阵，则 $M$ 有一个等于其谱半径的正实特征值 $\rho > 0$，$\rho$ 是单特征值，它有一个各元素全为正特征的左特征向量，每个其他特征值 $\lambda$ 满足 $\abs\lambda < \rho$，且没有其他特征值拥有非负特征向量。对行随机的正矩阵，$\rho = 1$。
:::

这条经典定理我们不加证明地陈述（背景见 [Maths Atlas: eigenvalues](/learn/maths/lesson.php?c=linear-algebra&l=eigenvalues)）。由于 $G$ 的每个元素都至少是 $(1 - \alpha)/n > 0$，定理适用于 $G$：恰有一个平稳分布，且每个分量都是正的。定理没有说幂迭代收敛多快；对 PageRank，我们可以只用 $G$ 的特殊结构，凭一段短论证直接证明存在、唯一与收敛速度。

::: theorem PageRank 存在、唯一且可由幂迭代算出 {#thm-pagerank}
设 $G = \alpha P + (1 - \alpha)\mathbf 1 \vec v$，$P$ 行随机，$\vec v$ 是概率行向量，$0 \le \alpha < 1$。则恰有一个概率向量 $\vec x$ 满足 $\vec x G = \vec x$。对任何概率向量 $\vec x^{(0)}$，迭代点 $\vec x^{(k+1)} = \vec x^{(k)} G$ 满足
$$
\norm{\vec x^{(k)} - \vec x}_1 \le 2\alpha^{k}.
$$
:::

::: proof
对概率向量 $\vec y$ 有 $\vec y\,\mathbf 1 = 1$，所以 $\vec y G = \alpha \vec y P + (1 - \alpha)\vec v$，仍是一个概率向量。现在取两个概率向量 $\vec y, \vec z$。则
$$
\vec y G - \vec z G = \alpha (\vec y - \vec z) P,
$$
因为传送项 $(1 - \alpha)\vec v$ 相消。对任何行向量 $\vec w$ 与行随机的 $P$，$\norm{\vec w P}_1 = \sum_q \abs{\sum_p w_p P_{pq}} \le \sum_q \sum_p \abs{w_p} P_{pq} = \sum_p \abs{w_p} = \norm{\vec w}_1$。于是
$$
\norm{\vec y G - \vec z G}_1 \le \alpha \norm{\vec y - \vec z}_1:
$$
映射 $\vec y \mapsto \vec y G$ 在概率向量集合上是因子 $\alpha < 1$ 的**压缩**，而该集合在 $\R^n$ 中闭且有界。

**唯一性。**若 $\vec x G = \vec x$ 且 $\vec x' G = \vec x'$，则 $\norm{\vec x - \vec x'}_1 = \norm{\vec x G - \vec x' G}_1 \le \alpha\norm{\vec x - \vec x'}_1$，迫使 $\norm{\vec x - \vec x'}_1 = 0$。

**存在性与收敛。**迭代点满足 $\norm{\vec x^{(k+1)} - \vec x^{(k)}}_1 \le \alpha^k \norm{\vec x^{(1)} - \vec x^{(0)}}_1$，所以 $m > k$ 时三角不等式给出 $\norm{\vec x^{(m)} - \vec x^{(k)}}_1 \le (\alpha^k + \dots + \alpha^{m-1}) \cdot 2 \le 2\alpha^k/(1 - \alpha)$，序列是柯西（Cauchy）列。其极限 $\vec x$ 是概率向量（集合闭），而由于 $\vec y \mapsto \vec y G$ 连续，$\vec x G = \lim \vec x^{(k)} G = \lim \vec x^{(k+1)} = \vec x$。最后，$\norm{\vec x^{(k)} - \vec x}_1 = \norm{\vec x^{(k-1)}G - \vec x G}_1 \le \alpha \norm{\vec x^{(k-1)} - \vec x}_1 \le \dots \le \alpha^k \norm{\vec x^{(0)} - \vec x}_1 \le 2\alpha^k$，因为两个概率向量的 $L_1$ 距离至多 $2$。
:::

所以收敛速度只由阻尼因子决定，与图的大小和形状无关：$\alpha = 0.85$ 时，约 $50$ 次迭代把误差界压到 $2 \times 0.85^{50} \approx 6 \times 10^{-4}$，$150$ 次到 $10^{-10}$。（哈韦瓦拉拉（Haveliwala）与卡姆瓦（Kamvar）在 2003 年证明 $G$ 的第二特征值的模至多为 $\alpha$，是同一事实的谱形式。）每次迭代是对边的一趟扫描，计算 [[#eq-pagerank]]，从头到尾不必造出稠密矩阵 $G$：传送项与悬挂项对每个页面相同，只加一次。

::: algorithm 幂迭代算 PageRank {#alg-pagerank}
1. 对每个页面 $p$ 置 $x_p \gets 1/n$。
2. 重复直到 $\norm{\vec y - \vec x}_1 < \varepsilon$：
   1. $D \gets \sum_{p \text{ 悬挂}} x_p$。
   2. 对每个 $q$ 置 $y_q \gets (1 - \alpha)/n + \alpha D/n$。
   3. 对每条边 $(p, q)$：$y_q \gets y_q + \alpha\, x_p/\mathrm{out}(p)$。
   4. $\vec x \gets \vec y$。
:::

```python
def pagerank(links, alpha=0.85, tol=1e-10, max_iter=200):
    """links: 页面 -> 它链接到的页面列表。返回（分数表, 残差历史）。"""
    pages = sorted(set(links) | {q for out in links.values() for q in out})
    n = len(pages)
    x = {p: 1 / n for p in pages}                  # 从均匀分布出发
    history = []
    for _ in range(max_iter):
        dangling = sum(x[p] for p in pages if not links.get(p))   # 没有出链的页面
        y = {p: (1 - alpha) / n + alpha * dangling / n for p in pages}
        for p, out in links.items():
            for q in out:
                y[q] += alpha * x[p] / len(out)    # 沿 p 的随机出链走
        res = sum(abs(y[p] - x[p]) for p in pages)  # 本次迭代的 L1 变化
        history.append(res); x = y
        if res < tol: break
    return x, history
```

::: example 四页小世界的 PageRank {#ex-pagerank}
页面 $A$、$B$、$C$、$D$ 的链接为 $A \to B$、$A \to C$、$B \to C$、$C \to A$、$D \to C$。写出 $\alpha = 0.85$ 的 Google 矩阵，并精确解 [[#eq-pagerank]]。
::: solution
没有悬挂页面。$P$ 的各行是 $A: (0, \frac12, \frac12, 0)$、$B: (0, 0, 1, 0)$、$C: (1, 0, 0, 0)$、$D: (0, 0, 1, 0)$，而 $G = 0.85P + 0.0375\,\mathbf 1\mathbf 1\T$：
$$
G = \begin{pmatrix} 0.0375 & 0.4625 & 0.4625 & 0.0375 \\ 0.0375 & 0.0375 & 0.8875 & 0.0375 \\ 0.8875 & 0.0375 & 0.0375 & 0.0375 \\ 0.0375 & 0.0375 & 0.8875 & 0.0375 \end{pmatrix}.
$$
记 $t = (1 - \alpha)/n = 3/80$、$\alpha = 17/20$，[[#eq-pagerank]] 化为 $x_D = t$（没有页面链向 $D$）、$x_B = t + \alpha x_A/2$、$x_C = t + \alpha(x_A/2 + x_B + x_D)$、$x_A = t + \alpha x_C$。把前两个代入第三个得 $x_C = t + \alpha\bigl(x_A/2 + t + \alpha x_A/2 + t\bigr) = t(1 + 2\alpha) + \tfrac{\alpha(1+\alpha)}{2}x_A$，再由 $x_A = t + \alpha x_C$ 得
$$
x_A = \frac{t(1 + \alpha + 2\alpha^2)}{1 - \alpha^2(1 + \alpha)/2} = \frac{659}{1769} \approx 0.3725,
$$
继而 $x_C = (x_A - t)/\alpha = 2789/7076 \approx 0.3941$、$x_B = 27713/141520 \approx 0.1958$、$x_D = 0.0375$；四个数之和为 $1$。幂迭代的输出在 $47$ 次迭代后打印 `{'A': 0.3725, 'B': 0.1958, 'C': 0.3941, 'D': 0.0375}`。有三个入链的 $C$ 居首，但只有一个入链的 $A$ 紧随其后，因为那条链接来自 $C$，而且是 $C$ 的唯一出链。$D$ 只拿到传送的份额。
:::
:::

::: widget markov
matrix: 0.0375,0.4625,0.4625,0.0375; 0.0375,0.0375,0.8875,0.0375; 0.8875,0.0375,0.0375,0.0375; 0.0375,0.0375,0.8875,0.0375
states: A; B; C; D
start: 3
steps: 30
caption: [[#ex-pagerank]] 四页小世界上的随机冲浪者，阻尼因子 $0.85$。把游走起点设在 $D$，观察 $n$ 步后的分布收敛到平稳分布 $(0.3725, 0.1958, 0.3941, 0.0375)$——即 PageRank 向量——不论起点如何。冲浪者在 $A$ 与 $C$ 之间来回弹跳，很少访问没有任何页面链向的 $D$。
:::

再看一个更大的例子，含悬挂页面 $G$ 和两页环 $E \leftrightarrow F$：

```python
web2 = {"A": ["B", "C"], "B": ["C", "E"], "C": ["A"], "D": ["C", "G"], "E": ["F", "G"],
        "F": ["E"], "G": []}                       # G 是悬挂页面
ranks, hist = pagerank(web2)
```
```text
{'A': 0.2008, 'C': 0.1917, 'E': 0.1917, 'G': 0.1354, 'B': 0.1232, 'F': 0.1193, 'D': 0.0379}
residuals: ['3.82e-01', '2.31e-01', '1.88e-01', '9.44e-02', '3.19e-02', '9.05e-03'] ... 8.3e-11 after 33 iterations
```

残差 $\norm{\vec x^{(k+1)} - \vec x^{(k)}}_1$ 在 $33$ 次迭代后降到 $10^{-10}$ 以下，比最坏情形界更快，因为对这个图，相邻残差之比（$0.60$、$0.81$、$0.50$、$0.34$，……）大多低于 $\alpha$。若没有传送和悬挂页面处理，环 $E \leftrightarrow F$ 会把冲浪者困住，悬挂页面 $G$ 会漏掉概率。

::: widget graph
nodes: A@1,2; B@2,3; C@2,1; D@3,1; E@3,3; F@4,3; G@4,1
edges: A>B; A>C; B>C; B>E; C>A; D>C; D>G; E>F; E>G; F>E
caption: 第二次 PageRank 运行的七页小世界。拖动页面看结构：$A$、$B$、$C$ 成一簇，$E$ 与 $F$ 是一个两页环——没有传送就是蜘蛛陷阱——$G$ 悬挂。比较分数：$A$ 只有一个入链（来自 $C$，而 $C$ 别处不链）却排第一，没有任何入链的 $D$ 只有传送份额。
:::

PageRank 是**查询无关**的：对整个图算一次，作为众多特征之一，与 BM25 这类查询相关的分数（[[information-retrieval/learning-to-rank]]）组合起来。把它当作支配性排序信号招来了**链接垃圾**：页面互相链接、再链向目标的**链接农场**，买来的链接，或在评论区和论坛里留下的链接。反制措施包括：给标了 `rel="nofollow"` 的链接降权（2005 年为用户生成内容引入）、侦测密互链的农场，以及 **TrustRank**（焦恩吉（Gyöngyi）、加西亚-莫利纳（Garcia-Molina）与佩德森（Pedersen），2004）：一种个性化 PageRank，只传送到一小撮人工核验过的可信种子页面，于是信任从它们向外流淌，离任何种子都远的垃圾分不到多少。截至 2026 年，基于链接的分数仍是网页排序众多信号之一；它相对其他信号的权重并不公开。

### HITS：枢纽与权威

乔恩·克莱因伯格（Kleinberg）（1998 年，期刊版 1999）观察到，就一个主题而言有两类页面要紧：**权威**（authority），装着好信息；**枢纽**（hub），链向许多好的权威（资源列表、目录）。两个定义互相递归：好的权威被好的枢纽链着，好的枢纽链向好的权威。

::: definition HITS {#def-hits}
设 $A$ 是一组页面的邻接矩阵，$p$ 链向 $q$ 时 $A_{pq} = 1$。**超链接诱导主题搜索**（hyperlink-induced topic search，HITS）通过迭代
$$
\vec a \gets A\T \vec h, \qquad \vec h \gets A \vec a
$$
赋予权威分数 $\vec a$ 与枢纽分数 $\vec h$（列向量），每步之后把每个向量归一化为单位长度。在 HITS 中，图不是整个网页，而是一个**基础集**：查询的头几条结果（**根集**）加上它们链到的页面，再加上链向它们的若干页面。
:::

::: proposition HITS 算的是主特征向量 {#prop-hits}
从 $\vec h^{(0)} = \mathbf 1$ 出发经 $k$ 轮后，$\vec a^{(k)}$ 与 $(A\T A)^{k-1} A\T \mathbf 1$ 成正比，$\vec h^{(k)}$ 与 $(A A\T)^{k}\mathbf 1$ 成正比。若对称半正定矩阵 $A\T A$ 的最大特征值是单重的，且 $A\T\mathbf 1$ 与它的特征向量不正交，则权威向量收敛到 $A\T A$ 的单位主特征向量，同理枢纽向量收敛到 $A A\T$ 的。
:::

::: proof
两条更新规则复合为 $\vec a \gets A\T A\, \vec a$ 与 $\vec h \gets A A\T \vec h$（至多差一个比例因子），归纳即得闭式。对称半正定矩阵 $M$ 有一组标准正交的特征向量基 $\vec e_1, \dots, \vec e_n$，特征值 $\lambda_1 > \lambda_2 \ge \dots \ge \lambda_n \ge 0$（谱定理）。把起始向量写成 $\sum_i c_i \vec e_i$，其中 $c_1 \ne 0$。则 $M^k$ 作用其上是 $\sum_i c_i \lambda_i^k \vec e_i = \lambda_1^k\bigl(c_1\vec e_1 + \sum_{i \ge 2} c_i (\lambda_i/\lambda_1)^k \vec e_i\bigr)$，而 $i \ge 2$ 时 $\lambda_i/\lambda_1 < 1$，所以归一化后收敛到 $\pm\vec e_1$；迭代点非负时取 $+$。
:::

::: example HITS 两轮 {#ex-hits}
页面 $p_1$、$p_2$ 都链向 $q_1$，$p_1$ 还链向 $q_2$。在 $(p_1, p_2)$ 上从 $\vec h = (1, 1)$ 出发跑 HITS 两轮，与 $A\T A$ 的主特征向量比较。
::: solution
第 1 轮：$a_{q_1} = h_{p_1} + h_{p_2} = 2$，$a_{q_2} = h_{p_1} = 1$；归一化得 $\vec a = (2, 1)/\sqrt5 = (0.894, 0.447)$。于是 $h_{p_1} = a_{q_1} + a_{q_2} = 3/\sqrt5$，$h_{p_2} = a_{q_1} = 2/\sqrt5$；归一化得 $\vec h = (3, 2)/\sqrt{13}$。第 2 轮：$\vec a \propto (3 + 2, 3) = (5, 3)$，归一化 $(0.857, 0.514)$。在权威上，$A\T A = \begin{pmatrix} 2 & 1 \\ 1 & 1\end{pmatrix}$（$q_1$ 有两个入链、$q_2$ 一个，且它们共享枢纽 $p_1$），最大特征值为 $(3 + \sqrt5)/2 = 2.618$，单位特征向量 $(0.851, 0.526)$。两轮之后 HITS 已在每个坐标上离它 $0.012$ 以内；第二特征值 $(3 - \sqrt5)/2 = 0.382$ 很小，所以收敛很快。$q_1$ 是更强的权威，两个都链的 $p_1$ 是更强的枢纽。
:::
:::

在七页小世界上，一百轮 HITS 给出

```text
authority {'C': 0.797, 'G': 0.408, 'E': 0.352, 'B': 0.244, 'F': 0.125, 'A': 0.0, 'D': 0.0}
hub       {'D': 0.583, 'B': 0.557, 'A': 0.504, 'E': 0.258, 'F': 0.171, 'C': 0.0, 'G': 0.0}
```

被三个枢纽链着的 $C$ 是头号权威；全都指向 $C$ 的 $D$、$B$、$A$ 是头号枢纽。注意 $A$ 的权威为 $0$，尽管 $C$ 链向它：$C$ 的唯一一条链指向 $A$，$A$ 又不被任何强枢纽指向，而主特征向量把质量集中到占优的那一团，把弱的一团清零。这是 HITS 的已知性质——结果可能取决于图的一小部分，最大特征值重根时限还依赖起始向量——连同它的弱点：基础集里混进一簇离题的稠密页面时会发生**主题漂移**。HITS 在查询时于小图上计算，对网页引擎来说代价高昂；PageRank 则离线算一次、所有查询通用。这两种思想，以及它们背后用特征向量看重要程度的观点，早已溢出网页，在引文分析、社交网络与推荐中一再复用。

::: history
最早的网页爬虫出现在 1993–1994 年，其中有马修·格雷（Gray）的 World Wide Web Wanderer 与布赖恩·平克顿（Pinkerton）的 WebCrawler，后者是第一个索引页面全文的引擎（1994）。马蒂恩·科斯特（Koster）1994 年提出机器人排除标准；2022 年由科斯特、加里·伊耶什（Illyes）、亨纳·策勒（Zeller）与莉齐·萨斯曼（Sassman）以 RFC 9309 发布。艾伦·海登（Heydon）与马克·纳约克（Najork）1999 年描述了 Mercator 爬虫。安德烈·布罗德（Broder）在 "On the resemblance and containment of documents"（1997）中引入分片与最小值无关哈希，同年与史蒂文·格拉斯曼（Glassman）、马克·马萨塞（Manasse）、杰弗里·齐威格（Zweig）把它们用于给 AltaVista 的整个抓取聚类；彼得·因迪克（Indyk）与拉吉夫·莫特瓦尼（Motwani）1998 年把局部敏感哈希形式化；摩西·查里卡尔（Charikar）的 "Similarity estimation techniques from rounding algorithms"（STOC 2002）提出 SimHash 背后的超平面概要。谢尔盖·布林（Brin）与劳伦斯·佩奇（Page）在 "The anatomy of a large-scale hypertextual web search engine"（WWW7，1998）中描述了 PageRank 与 Google 原型；乔恩·克莱因伯格（Kleinberg）的 "Authoritative sources in a hyperlinked environment"（SODA 1998；*Journal of the ACM*，1999）提出枢纽与权威。
:::

## 后续内容

一个网页引擎把本课程的一切都组合起来：抓来的页面被处理成词项（[[information-retrieval/text-processing]]）、去重、以压缩的按文档划分的索引分布到许多机器上（[[information-retrieval/index-compression]]、[[distributed-systems/data-processing]]），然后分阶段排序——便宜的类 BM25 初排配动态剪枝（[[information-retrieval/vector-space]]），随后是把数百个特征组合起来的学习模型，其中就有 PageRank 与锚文本分数，见 [[information-retrieval/learning-to-rank]]。在几十亿条边的图上算 PageRank，本身就是一出经典的迭代式数据流动作业（[[distributed-systems/data-processing]]）。MinHash 与局部敏感哈希在 [[information-retrieval/dense-retrieval]] 里作为近似最近邻搜索的早期方法再次登场，随机超平面定理则是稠密向量二值嵌入的基础。

::: summary
- 爬虫是一个讲礼貌、带优先级的分布式广度优先搜索（[[#alg-crawler]]）：按主机的队列与延时保证礼貌，优先级与变化率决定抓什么、何时重访。
- **robots.txt**（RFC 9309，[[#def-robots]]）按 user-agent 分组规则；最长的匹配规则取胜，并列时 `allow` 取胜；`4xx` 表示不加限制，`5xx` 表示全部禁止。它是自愿遵守的约定，不是访问控制，各家库实现不一。
- 近似重复用分片集合的**杰卡德系数**比较（[[#def-jaccard]]）；**MinHash** 在随机置换下以恰为 $J$ 的概率相符（[[#thm-minhash]]），得到方差 $J(1-J)/n$ 的无偏估计（[[#cor-minhash]]）。
- **LSH 分带**以概率 $1 - (1 - s^r)^b$ 把签名变成候选对（[[#prop-banding]]）；由随机超平面定理（[[#thm-hyperplane]]），**SimHash** 指纹的汉明距离与夹角成正比。
- **PageRank**（[[#def-pagerank]]）是带传送的随机冲浪者的平稳分布；Google 矩阵为正，故佩龙-弗罗贝尼乌斯定理适用（[[#thm-perron]]），幂迭代的误差不超过 $2\alpha^k$、与图无关（[[#thm-pagerank]]）。
- **HITS**（[[#def-hits]]）在查询时于小基础集上把枢纽与权威分数算成 $AA\T$ 与 $A\T A$ 的主特征向量（[[#prop-hits]]）。
:::

## 习题

::: exercise 分片集合的杰卡德系数 {level=1 check="1/2"}
用 $2$-词分片，计算 "a rose is a rose" 与 "a rose is red" 的杰卡德系数。（填入 $J$。）
::: solution
第一个文本的分片是 `a rose`、`rose is`、`is a`、`a rose`，成集合即 $\set{\texttt{a rose}, \texttt{rose is}, \texttt{is a}}$。第二个给出 $\set{\texttt{a rose}, \texttt{rose is}, \texttt{is red}}$。交集有 $2$ 个元素，并集有 $4$ 个（`a rose`、`rose is`、`is a`、`is red`），故 $J = 2/4 = 1/2$。用 $3$-词分片，两个集合是 $\set{\texttt{a rose is}, \texttt{rose is a}, \texttt{is a rose}}$ 与 $\set{\texttt{a rose is}, \texttt{rose is red}}$，交 $1$ 并 $4$，故 $J = 1/4$：分片越长，相似度越严。
:::
:::

::: exercise 一个分带概率 {level=1 check="1 - (1 - 0.8^4)^10"}
签名切成 $b = 10$ 个带、每带 $r = 4$。杰卡德系数 $0.8$ 的两个文档成为候选对的概率是多少？（填入概率。）
::: solution
由 [[#prop-banding]]，$1 - (1 - 0.8^4)^{10} = 1 - (1 - 0.4096)^{10} = 1 - 0.5904^{10} \approx 1 - 0.0052 = 0.9948$。
:::
:::

::: exercise 一次 robots.txt 判定 {level=1}
在 RFC 9309 之下，文件为
```text
User-agent: *
Disallow: /shop
Allow: /shop/catalogue
Disallow: /*?session=
```
一个通用爬虫可以抓取 `/shop/catalogue/item?id=7`、`/shopping`、`/shop/catalogue?session=42` 和 `/about` 吗？
::: solution
- `/shop/catalogue/item?id=7`：`Disallow: /shop`（$5$ 字节）与 `Allow: /shop/catalogue`（$15$）都匹配；更长的放行。**允许。**
- `/shopping`：`Disallow: /shop` 匹配，因为模式是前缀（`/shop` 是 `/shopping` 的前缀）；没有更长的匹配。**禁止**——常见的意外；本意的规则应是 `/shop/`。
- `/shop/catalogue?session=42`：`Allow: /shop/catalogue`（$15$ 字节）与 `Disallow: /*?session=`（$11$ 字节，`*` 匹配 `shop/catalogue`）都匹配；更长的模式是 `Allow`。**允许**，未必是站点的本意。说了算的是模式长度，不是语义上的特殊程度。
- `/about`：没有规则匹配。**允许。**
:::
:::

::: exercise 环的 PageRank {level=2 check="1/3"}
三个页面成环相连 $A \to B \to C \to A$。对任何 $\alpha$，$A$ 的 PageRank 是多少？（填入 $x_A$。）然后加上链接 $A \to C$，算出 $\alpha = 0.85$ 时的 PageRank 向量。
::: solution
由对称性（旋转保持环不变，而由 [[#thm-pagerank]] PageRank 唯一），三个分数相等：$x_A = 1/3$。加上多余的链接后，$A$ 链向 $B$ 与 $C$。记 $t = 0.05$ 的方程：$x_B = t + 0.85 x_A/2$、$x_C = t + 0.85(x_A/2 + x_B)$、$x_A = t + 0.85 x_C$。代入得 $x_C = t + 0.85(x_A/2 + t + 0.425x_A) = 0.0925 + 0.78625 x_A$，于是 $x_A = 0.05 + 0.85(0.0925 + 0.78625x_A) = 0.128625 + 0.6683125x_A$，解得 $x_A = 0.128625/0.3316875 = 0.3878$、$x_C = 0.3974$、$x_B = 0.2148$。$C$ 因多余的链接得利，如今只收到 $A$ 半票的 $B$ 吃亏。
:::
:::

::: exercise 大小不等的集合上的 MinHash {level=2}
设 $T \subseteq S$，$\abs T = 10$，$\abs S = 40$。$J(S, T)$ 是多少？随机置换下 $S$ 的最小化者落在 $T$ 中的概率是多少？用这一点说明如何从 MinHash 签名和集合大小估计一篇文档在另一篇中的**包含度**（containment）$\abs{S \cap T}/\abs{T}$。
::: solution
$J = 10/40 = 1/4$。$S$ 的最小化者在 $S$ 上均匀，落在 $T$ 中的概率是 $10/40 = 1/4$——这里它与事件 $\min\pi(S) = \min\pi(T)$ 是同一个，因为 $T \subseteq S$。一般地，由 $J$ 的估计 $\hat J$ 与大小 $\abs S$、$\abs T$：由于 $\abs{S \cap T} = J\abs{S \cup T}$ 且 $\abs{S \cup T} = \abs S + \abs T - \abs{S \cap T}$，得 $\abs{S \cap T} = J(\abs S + \abs T)/(1 + J)$，于是包含度由 $\hat J(\abs S + \abs T)/((1 + \hat J)\abs T)$ 估计。对 $J = 1/4$：$\frac14 \cdot 50 / (\frac54 \cdot 10) = 1$，正确地说出 $T$ 整个含在 $S$ 中。布罗德 1997 年的论文正是为这个用途同时定义了相似度与包含度。
:::
:::

::: exercise 收敛所需迭代数 {level=2 check="ceil(log(1e-8/2)/log(0.85))"}
用 [[#thm-pagerank]] 的界，$\alpha = 0.85$ 的幂迭代要多少次才能保证 $L_1$ 误差低于 $10^{-8}$？（填入迭代次数。）
::: solution
需要 $2 \cdot 0.85^k < 10^{-8}$，即 $k > \ln(5 \times 10^{-9})/\ln 0.85 = (-19.11)/(-0.1625) = 117.6$，所以不论什么图，$k = 118$ 次迭代都够。$\alpha = 0.99$ 时同样的精度要约 $1\,900$ 次，这是不把 $\alpha$ 取到接近 $1$ 的一个原因；另一个原因是排序会变得对图的微小改动非常敏感。
:::
:::

::: exercise 做错的悬挂页面 {level=3}
一个常见错误是把悬挂页面的行直接置零而不是置成均匀，于是 $P$ 有零行、只是次随机的。证明：迭代 $\vec x \gets \alpha \vec x P + \frac{1-\alpha}{n}\mathbf 1\T$ 仍然收敛，但收敛到一个分量和小于 $1$ 的向量；再证明把结果归一化就得到 [[#def-pagerank]] 的正确 PageRank。
::: solution
设 $\tilde P$ 是 $P$ 把悬挂行置零所得，$\vec d$ 是悬挂页面的指示列向量，于是 $P = \tilde P + \frac1n \vec d\,\mathbf 1\T$。出错映射 $\vec y \mapsto \alpha\vec y\tilde P + \frac{1-\alpha}{n}\mathbf 1\T$ 在 $L_1$ 中是因子 $\alpha$ 的压缩（因为 $\norm{\vec w\tilde P}_1 \le \norm{\vec w}_1$），所以收敛到唯一不动点 $\tilde{\vec x} = \frac{1-\alpha}{n}\mathbf 1\T(I - \alpha\tilde P)^{-1}$。只要有质量落在悬挂页面上，它的分量和就小于 $1$，因为这团质量每步都在流失。现在设 $\vec x$ 为真正的 PageRank；记它在悬挂页面上的质量 $D = \vec x\vec d$，它满足 $\vec x = \alpha\vec x\tilde P + \bigl(\frac{1-\alpha}{n} + \frac{\alpha D}{n}\bigr)\mathbf 1\T = \alpha \vec x\tilde P + c\,\mathbf 1\T$，其中 $c = \frac{1 - \alpha + \alpha D}{n}$。于是 $\vec x = c\,\mathbf 1\T (I - \alpha\tilde P)^{-1} = \frac{nc}{1-\alpha}\tilde{\vec x}$：真正的 PageRank 是出错不动点的标量倍，而它和为 $1$，所以把 $\tilde{\vec x}$ 归一化即得。页面的排序因此不变；错的只是尺度。
:::
:::

::: exercise 用分块实现 SimHash 检索 {level=3}
指纹有 $64$ 位，近似重复指汉明距离 $k = 3$ 以内。解释为什么把指纹切成 $4$ 个 16 位的块，就能保证两个近似重复的指纹至少在一个块上完全相同；再写一个函数，给定指纹列表，通过把每个块索引进哈希表，返回所有距离 $3$ 以内的配对。
::: solution
两个 64 位串至多相差 $3$ 个位置时，这些位置至多落进 $4$ 个块中的 $3$ 个，所以至少有一个块完全相同（鸽巢原理）。把每个指纹按它的 $4$ 个块各建索引；近似重复的配对必有共同桶，只需比较桶内的指纹。

```python
from collections import defaultdict
from itertools import combinations

def near_pairs(fps, k=3, blocks=4, bits=64):
    w = bits // blocks
    buckets = defaultdict(list)
    for idx, f in enumerate(fps):
        for b in range(blocks):
            buckets[(b, (f >> (b * w)) & ((1 << w) - 1))].append(idx)
    pairs = set()
    for members in buckets.values():
        for i, j in combinations(members, 2):
            if bin(fps[i] ^ fps[j]).count("1") <= k:
                pairs.add((min(i, j), max(i, j)))
    return sorted(pairs)

print(near_pairs([0x0cb2e57c9c068770, 0x08b7e57e9c268770, 0x0cb2e57c9c068771, 0xffff000000000000]))
```
```text
[(0, 2)]
```
第一、三个指纹相差一位，被报出；第一、二个（段落 $A$ 与 $B$ 的 SimHash 指纹，距离 $5$）相距超过 $3$，没被报。每个桶装着在某 16 位上相同的指纹，$N$ 个随机指纹中约 $N/2^{16}$ 个，于是比较次数的期望约为 $4\binom{N}{2}/2^{16}$ 而不是 $\binom N2$；曼库（Manku）等人用了更多张位次序不同的表，把桶进一步缩小。
:::
:::
