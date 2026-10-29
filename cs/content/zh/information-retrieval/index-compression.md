[[information-retrieval/inverted-indexes]] 的倒排索引是这样建成的：把所有 $(\text{词项}, \text{docID})$ 对读进内存再排序。对《爱丽丝》来说不过几千对。网页规模的文集有 $10^{10}$ 个页面、每页 $500$ 个不同词项，就有 $5 \times 10^{12}$ 条条目；按 $32$ 位整数存放要占 $20$ TB，远超任何机器的内存，而待排序的对还要多得多。由此引出两个问题，本章把它们都解决掉。**构建**：输入和输出都装不进内存时，索引怎么建？文档源源不断到来时，索引如何保持更新？**压缩**：条目怎样存得远比每条 $32$ 位小——并且同样要紧的是，让查询解码它们比从存储器读取未压缩数据还快？

压缩的关键观察是：倒排列表是排好序的 docID 列表，所以相邻条目之间的**间隙**是小正整数，对高频词项来说绝大多数非常小。我们研究让小数字得到短码字的整数编码：字节对齐的**变长字节**（variable-byte）码，位级的 **Elias $\gamma$**、**$\delta$** 码与 **Golomb–Rice** 码，用 Python 实现并在《爱丽丝》段落的索引上实测。我们导出它们的长度，证明它们唯一可译，并借助 **Kraft 不等式**与计数论证看清它们离最优有多远。预备知识：倒排索引、排序（[[algorithms/sorting-selection]]）与外部归并排序（[[databases/query-processing]]）。

## 建装不进内存的索引

基于排序的构建（[[information-retrieval/inverted-indexes#alg-build]]）生成所有对 $(t, d)$ 再排序。当这些对装不进内存时，教科书式的解法是**外部归并排序**：把内存装得下的片段排好写出，再归并（[[databases/query-processing]]）。两项改进让它对索引构建变得可行。

::: algorithm 分块基于排序的索引（BSBI） {#alg-bsbi}
1. 用内存中的词典给每个词项一个 **termID**，使一对 $(\text{termID}, \text{docID})$ 占 $8$ 字节。
2. 一边读文档一边产生对，直到一对装满一块内存。把这一块按 $(\text{termID}, \text{docID})$ 排序，分组归并成倒排列表，作为一个**游程**（run）写盘。
3. 重复直到文集读完，得到 $k$ 个游程。
4. 用 $k$ 路归并把 $k$ 个游程**合并**（各游程首个未读条目构成的堆，如 [[data-structures/heaps]]），对每个 termID 把各游程中的倒排列表按序串接，写出最终索引。
:::

由于 docID 随文档读入按递增次序分配，词项在第 $i$ 个游程中的倒排列表只含比第 $i + 1$ 个游程更小的 docID，所以第 4 步是串接而不是排序。BSBI 的弱点是第 1 步的全局词项词典：它必须常驻内存，且自身按 Heaps 定律（[[information-retrieval/text-processing#def-heaps]]）增长。

::: algorithm 单遍内存索引（SPIMI） {#alg-spimi}
1. 建一张从词项到可增长倒排列表的空内存哈希表。
2. 按文档次序对每个标记 $(t, d)$：查找 $t$，需要时新建条目；除非 $d$ 已是其列表末尾元素，就把 $d$ 追加到列表末尾（否则给它的词频加一）。
3. 内存满时，把哈希表里的**词项**排序，按词项次序把词典与倒排列表作为游程写盘，并清空表。
4. 结束时像 BSBI 那样归并游程，按字符串配对各词项。
:::

SPIMI 从不给条目排序——它们是按 docID 次序追加的——也不需要全局词典，因为每个游程自带词项。它的时间是 $T$ 个标记的 $O(T)$，加上每个游程内词项的排序与最后的归并。每个游程写盘时还可顺手压缩，于是每块内存装得下更多文集。到几千台机器的规模，同一想法变成 MapReduce 作业：映射器发出 $(t, d)$ 对，洗牌按词项分区并排序，化简器写出倒排列表（[[distributed-systems/data-processing]]）；实践中大型索引按文档分区，每个分区上建一个这样的索引。

### 动态索引

文集会变。新文档必须在几秒或几分钟内可检索，文档也会被删除或更新。简单设计是维护一个装着近期文档的小**内存索引**，与大型**主索引**一起检索，内存满了就把两者合并。若每次合并都重写整个主索引，代价是二次的。

::: theorem 对数归并 {#thm-log-merge}
设内存索引装 $n$ 条条目，先后到达的条目总共 $T$ 条。**立即归并**——内存索引一满就并进单个主索引——要写 $\Theta(T^2/n)$ 条条目。**对数归并**在盘上保留索引 $I_0, I_1, I_2, \dots$，其中 $I_i$ 要么为空，要么装 $2^i n$ 条条目；内存满时，其内容成为一个规模 $n$ 的新索引，而只要存在两个规模相同的索引，就把它们并成一个规模加倍的索引。对数归并写 $O(T \log(T/n))$ 条条目，且任何时刻盘上索引至多 $\lfloor \log_2(T/n) \rfloor + 1$ 个。
:::

::: proof
*立即归并。* 第 $j$ 次刷盘之后主索引装 $jn$ 条条目，下一次归并全部重写。共 $T/n$ 次刷盘，写出的条目数为 $\sum_{j=1}^{T/n} jn = n \cdot \frac{(T/n)(T/n + 1)}{2} = \Theta(T^2/n)$。

*对数归并。* 这些索引表现得像一个二进制计数器：$c$ 次刷盘之后，$I_i$ 非空恰当 $c$ 的第 $i$ 位为 $1$，因为每刷入一份规模 $n$ 的索引就是给计数器加 $1$，而每次进位就是两个等大索引的归并。一条条目刷入 $I_0$ 时被写一次，此后每经历一次归并、所在索引升到下一层，就被再写一次。每次归并把它送到严格更高的一层，而用过的最高一层 $i$ 满足 $2^i n \le T$，故 $i \le \log_2(T/n)$。于是每条条目至多被写 $\log_2(T/n) + 1$ 次，总数至多 $T(\log_2(T/n) + 1) = O(T \log(T/n))$。非空索引的个数是 $c \le T/n$ 的二进制表示中 $1$ 位的个数，至多 $\lfloor \log_2(T/n) \rfloor + 1$。
:::

代价是一次查询要查多达 $\log_2(T/n) + 1$ 个索引并合并结果；同一词项在不同索引中的倒排列表覆盖互不相交的 docID 区间，所以合并就是串接。Lucene 的段（segment）加层级归并策略沿袭这一设计：每次刷盘产生一个不可变段，后台线程把规模相近的段归并。被删除的文档在位向量中标记，等其所在段参与归并时才物理移除；一次更新就是一次删除加一次插入。

::: example 数一数归并 {#ex-log-merge}
内存索引装 $n = 1\,000$ 条条目，到达的条目共 $T = 8\,000$ 条。两种策略各写多少条条目？
::: solution
*立即归并：*刷盘 $1, \dots, 8$ 之后主索引分别装 $1\,000, 2\,000, \dots, 8\,000$ 条条目，共写出 $1\,000 \cdot (1 + 2 + \dots + 8) = 36\,000$ 条。*对数归并：*第 1 次刷盘写 $I_0$（$1\,000$）。第 2 次写 $1\,000$，再把两个 $1\,000$ 归并进 $I_1$（$2\,000$）。第 3 次：$1\,000$。第 4 次：$1\,000$，归并出第二个 $2\,000$（$2\,000$），再把两个 $2\,000$ 归并进 $I_2$（$4\,000$）。第 5 到 8 次重复第 1 到 4 次（$1\,000 + 3\,000 + 1\,000 + 7\,000 = 12\,000$），最后两个 $4\,000$ 归并写出 $8\,000$。总计：$12\,000 + 12\,000 + 8\,000 = 32\,000$，恰好是 $T(\log_2(T/n) + 1) = 8\,000 \times 4$。这个规模下差距不大；到 $T/n = 1\,000$ 次刷盘，就是 $500{,}500 n$ 对约 $11\,000 n$。
:::
:::

## 间隙与倒排列表的形态

把《爱丽丝》的 $800$ 个段落每段当作一篇文档建索引，倒排列表就比按章划分时更长、更有看头：

```python
import re
from collections import defaultdict

text = open("alice.txt", encoding="utf-8").read()
text = text[text.index("CHAPTER I"):]
paras = [p for p in re.split(r"\n\s*\n", text) if re.search(r"[a-z]", p)]
index = defaultdict(list)
for d, p in enumerate(paras, 1):
    for t in sorted(set(re.findall(r"[a-z]+(?:'[a-z]+)?", p.lower()))):
        index[t].append(d)                      # docID 按递增次序
print("documents", len(paras), "terms", len(index), "postings", sum(map(len, index.values())))

def gaps(plist):                                # 先是首个 docID，之后是差
    return [plist[0]] + [b - a for a, b in zip(plist, plist[1:])]
```
```text
documents 800 terms 2615 postings 21227
```

::: definition 间隙（增量）编码 {#def-gaps}
倒排列表 $d_1 < d_2 < \dots < d_f$ 以其**间隙**（或称 **d-gaps**）存储：$g_1 = d_1$，$i \ge 2$ 时 $g_i = d_i - d_{i-1}$。所有间隙都是正整数，总和为 $d_f \le N$，列表由前缀和还原：$d_i = g_1 + \dots + g_i$。
:::

几条列表的间隙能看出规律：

```text
the 643 [1, 1, 1, 1, 1, 1, 1, 1]
alice 347 [2, 2, 1, 1, 2, 1, 2, 1]
rabbit 38 [1, 2, 1, 2, 6, 21, 68, 1]
hatter 53 [277, 22, 2, 8, 2, 6, 3, 1]
dormouse 33 [301, 18, 13, 1, 21, 11, 1, 4]
```

（词项后面的数字是它的文档频率，随后是头八个间隙。）`the` 出现在 $800$ 个段落中的 $643$ 个里，它的列表几乎全是 $1$；一个词项的平均间隙约为 $N/\mathrm{df}_t$，所以高频词间隙极小，罕见词间隙很大。帽匠的首个间隙是 $277$，因为他到第 $277$ 段才出场；此后间隙很小，因为他成串出现——茶会，审判。这种成串性（burstiness）让间隙为 $1$ 的情形比均匀散布时常见得多。定长码在这种数据上几乎浪费全部比特：每个间隙都装得进 $\lceil \log_2 801 \rceil = 10$ 位，可大多数只要一两位。我们要一种**变长码**：小整数配短码字。

## 字节对齐的编码

::: definition 变长字节码 {#def-vbyte}
**变长字节**（variable-byte，VB）码把正整数 $n$ 写成 $128$ 进制，最高位在前，每字节放一个数位、占低 $7$ 位；字节高位在这个数的**最后**一个字节取 $1$，其余字节取 $0$。二进制位数 $\ell = \lfloor \log_2 n \rfloor + 1$ 的数占 $\lceil \ell / 7 \rceil$ 字节。
:::

（有些系统用相反约定——高位 $1$ 表示“后面还有字节”——且最低位在前；分析相同。）

```python
def vb_encode(n):                 # 变长字节：每字节 7 位，最后一个字节置高位
    out = []
    while True:
        out.insert(0, n % 128)
        if n < 128: break
        n //= 128
    out[-1] += 128
    return bytes(out)

def vb_decode(data):
    nums, n = [], 0
    for b in data:
        if b < 128: n = 128 * n + b
        else: nums.append(128 * n + b - 128); n = 0
    return nums

data = b"".join(vb_encode(g) for g in [824, 5, 214577])
print(data.hex(" "), vb_decode(data))
```
```text
06 b8 85 0d 0c b1 [824, 5, 214577]
```

::: example 手算变长字节码 {#ex-vbyte}
把间隙 $824$、$5$、$214\,577$ 编成变长字节码，并核对上面的输出。
::: solution
$824 = 6 \cdot 128 + 56$：数位 $6, 56$。首字节 `00000110` = `0x06`；末字节置高位：$128 + 56 = 184$ = `10111000` = `0xb8`。$5$ 是单个数位、在末字节里：$128 + 5 = 133$ = `0x85`。$214\,577 = 13 \cdot 128^2 + 12 \cdot 128 + 49$（因为 $13 \cdot 16\,384 = 212\,992$ 且 $1\,585 = 12 \cdot 128 + 49$）：字节 `0x0d`、`0x0c` 与 $128 + 49 = 177$ = `0xb1`。连起来 `06 b8 85 0d 0c b1`：三个数共 $6$ 字节，按 $32$ 位整数存要 $12$ 字节。解码器对小于 $128$ 的字节累加 $n \gets 128 n + b$，遇高位置起的字节就输出。
:::
:::

变长字节从不劈开字节，所以解码是不碰位操作的移位与比较的紧凑循环，也容易向量化。弱点是最短码字就有 $8$ 位，高频词列表里大量的间隙 $1$ 占不到便宜：`the` 的间隙几乎全是 $1$，仍要每条条目 $8$ 位。

## 位级编码：Elias gamma 与 delta

要在小间隙上花少于 $8$ 位，就必须逐位操作。$n \ge 1$ 的二进制表示总以 $1$ 开头；剩下的 $\lfloor \log_2 n \rfloor$ 位是**偏移**。对 $13 = 1101_2$，偏移是 `101`。只有偏移无法解码——不知道它到哪里结束——于是给它冠上长度的前缀。

::: definition 一元码、gamma 码与 delta 码 {#def-gamma}
- $k \ge 0$ 的**一元码**是 $k$ 个 $1$ 后跟一个 $0$：$\mathrm{U}(3) = \texttt{1110}$。
- $n \ge 1$ 的 **Elias $\gamma$ 码**是偏移长度的一元码后跟偏移：$\gamma(n) = \mathrm{U}(\lfloor \log_2 n \rfloor)\ \mathrm{offset}(n)$。故 $\gamma(1) = \texttt{0}$，$\gamma(2) = \texttt{100}$，$\gamma(13) = \texttt{1110}\,\texttt{101}$。
- $n \ge 1$ 的 **Elias $\delta$ 码**把一元长度换成二进制位数的 $\gamma$ 码：$\delta(n) = \gamma(\lfloor \log_2 n \rfloor + 1)\ \mathrm{offset}(n)$。故 $\delta(1) = \texttt{0}$，$\delta(13) = \gamma(4)\,\texttt{101} = \texttt{11000}\,\texttt{101}$。
:::

（Elias 的原论文和一些教材把一元部分写成 $0$、以 $1$ 收尾；这些约定可以互换。）

```python
def gamma(n):                     # Elias gamma 码，n >= 1：一元长度，然后偏移
    b = bin(n)[3:]                # n 的二进制去掉开头的 1
    return "1" * len(b) + "0" + b

def delta(n):                     # Elias delta 码：长度的 gamma 码，然后偏移
    b = bin(n)[3:]
    return gamma(len(b) + 1) + b

def gamma_decode(bits, i=0):      # 返回（数值，下一个位置）
    k = 0
    while bits[i] == "1": k += 1; i += 1
    i += 1                        # 跳过 0
    return int("1" + bits[i:i + k], 2), i + k

def delta_decode(bits, i=0):
    L, i = gamma_decode(bits, i)  # L = n 的二进制位数
    return int("1" + bits[i:i + L - 1], 2), i + L - 1

for n in (1, 2, 3, 4, 5, 9, 13, 24, 511, 1025):
    print(f"{n:5d} gamma={gamma(n):21s} delta={delta(n):18s} vb={vb_encode(n).hex(' ')}")
```
```text
    1 gamma=0                     delta=0                  vb=81
    2 gamma=100                   delta=1000               vb=82
    3 gamma=101                   delta=1001               vb=83
    4 gamma=11000                 delta=10100              vb=84
    5 gamma=11001                 delta=10101              vb=85
    9 gamma=1110001               delta=11000001           vb=89
   13 gamma=1110101               delta=11000101           vb=8d
   24 gamma=111101000             delta=110011000          vb=98
  511 gamma=11111111011111111     delta=111000111111111    vb=03 ff
 1025 gamma=111111111100000000001 delta=11100110000000001  vb=08 81
```

这里的位串是 `0` 与 `1` 字符构成的 Python 字符串，看着清楚，但比真正的位大约 $8$ 倍；真实实现会把位打包进机器字。解码一段拼接：对 [[#ex-vbyte]] 的三个间隙用 gamma 编码后连成一串——

```python
bits = "".join(gamma(g) for g in [824, 5, 214577])
i, out = 0, []
while i < len(bits):
    v, i = gamma_decode(bits, i); out.append(v)
print(len(bits), out)
```
```text
59 [824, 5, 214577]
```

用每种编码对 $3\,000$ 个随机列表编了再解（往返全部成功）——养成这样的测试习惯很值，因为这类编码里长度字段的一位之差会悄无声息地毁掉其后的所有内容。

::: theorem gamma 码与 delta 码的长度 {#thm-gamma-length}
对 $n \ge 1$，记 $\lambda = \lfloor \log_2 n \rfloor$，
$$
\abs{\gamma(n)} = 2\lambda + 1, \qquad \abs{\delta(n)} = \lambda + 2\lfloor \log_2(\lambda + 1) \rfloor + 1.
$$
于是 $\abs{\gamma(n)} \le 2\log_2 n + 1$，$\abs{\delta(n)} = \log_2 n + O(\log \log n)$。
:::

::: proof
$n$ 的二进制表示有 $\lambda + 1$ 位，所以偏移有 $\lambda$ 位，其一元长度码有 $\lambda + 1$ 位；相加得 $2\lambda + 1$。对 $\delta$，长度字段是 $\gamma(\lambda + 1)$，由第一个公式它有 $2\lfloor \log_2(\lambda + 1) \rfloor + 1$ 位，其后跟 $\lambda$ 位偏移。界由 $\lambda \le \log_2 n$ 即得。
:::

所以 $\gamma$ 花的信息论最小值 $\log_2 n$ 的两倍，$\delta$ 则渐近最优；但对小数字 $\gamma$ 更短（$\abs{\gamma(2)} = 3$ 而 $\abs{\delta(2)} = 4$），中间许多取值打平。对高频词的小间隙，两者中 $\gamma$ 更好。

::: lemma 无前缀性 {#lem-prefix}
$\gamma$ 码与 $\delta$ 码是**前缀码**：没有码字是另一个码字的前缀。因此码字的拼接可以不加分隔符、从左到右唯一解码。
:::

::: proof
设 $\gamma(m)$ 是 $\gamma(n)$ 的前缀。两者都以一元长度码开头，而一元码在第一个 $0$ 处结束，所以两段一元部分相同，偏移长度相等，码字总长 $2\lambda + 1$ 也相同。等长即整串相同，$\gamma(m) = \gamma(n)$；而 $n$ 由码字还原为 $1$ 后接偏移，故 $m = n$。同样的论证适用于 $\delta$：开头的 $\gamma$ 码可被唯一确定（因 $\gamma$ 无前缀），它定下偏移长度，进而定下总长。至于唯一可译：解码器读剩余位串中是码字的最短前缀——正是 `gamma_decode` 所做——由无前缀性，能从这里开始的码字只有这一个。
:::

### 编码能多短？

::: theorem Kraft 不等式 {#thm-kraft}
若一个前缀码给有限或可数符号集分配长度 $\ell_1, \ell_2, \dots$ 的码字，则
$$
\sum_i 2^{-\ell_i} \le 1.
$$
反之，任何满足此不等式的长度都是某个前缀码的长度。（麦克米伦（McMillan）证明该不等式对一切唯一可译码成立，前缀与否都一样。）
:::

::: proof
把码字 $c = c_1 c_2 \dots c_\ell$ 映到 $[0, 1)$ 中二进制展开以 $c$ 开头的实数区间 $I_c = [0.c_1 c_2 \dots c_\ell,\ 0.c_1 c_2 \dots c_\ell + 2^{-\ell})$；区间长 $2^{-\ell}$。若码字 $c, c'$ 的区间重叠且 $\abs{c} \le \abs{c'}$，则某个数会同时有以 $c$ 开头和以 $c'$ 开头的二进制展开，于是 $c$ 是 $c'$ 的前缀。前缀码中这些区间因此是 $[0, 1)$ 的两两不交子集，总长至多 $1$；这对码字的每个有限子集成立，对整个级数也成立。反方向的构造：把长度从小到大排好，给每个码字取 $[0,1)$ 中下一段空闲部分的最左端点，按二进制写满 $\ell_i$ 位；不交性的论证倒过来走即可。
:::

Kraft 不等式说：短码字是稀缺资源。它立刻表明没有前缀码能把每个整数都编成 $\log_2 n + c$ 位，因为 $\sum_n 2^{-\log_2 n - c} = 2^{-c}\sum_n 1/n$ 发散；$\delta$ 多出的 $O(\log\log n)$ 正是能编任意大整数的代价。更有用的是：长度为 $\ell(n)$ 的码对分布 $p(n) = 2^{-\ell(n)}$ 最优：由香农（Shannon）信源编码定理，分布 $p$ 下的期望长度至少是熵 $-\sum p(n) \log_2 p(n)$，当 $\ell(n) = -\log_2 p(n)$ 时取等。$\gamma$ 码的 $2^{-\abs{\gamma(n)}} = 2^{-2\lfloor \log_2 n \rfloor - 1} \approx 1/(2n^2)$，因此对按 $1/n^2$ 分布的间隙是理想的——重尾分布，词项成串出现时相当可信。

### Golomb 码与 Rice 码

另一种间隙模型给出另一种最优码。若文档频率为 $\mathrm{df}$ 的词项独立地以概率 $p = \mathrm{df}/N$ 出现在每篇文档中（**伯努利模型**），其间隙服从几何分布：$\Prob(g = k) = (1 - p)^{k-1} p$。

::: definition Golomb 码与 Rice 码 {#def-golomb}
参数 $b \ge 1$ 的 **Golomb 码**把 $n \ge 1$ 写成：$q = \lfloor (n - 1)/b \rfloor$ 的一元码，后跟余数 $r = (n - 1) - qb$ 的截断二进制（用 $\lfloor \log_2 b \rfloor$ 或 $\lceil \log_2 b \rceil$ 位）。**Rice 码**是 $b = 2^k$ 的 Golomb 码，余数恰占 $k$ 位。
:::

对参数为 $p$ 的几何间隙，加拉格尔（Gallagher）与范弗豪伊斯（Van Voorhis）（1975）证明：取满足 $(1-p)^b + (1-p)^{b+1} \le 1$ 的最小整数 $b$ 的 Golomb 码是最优前缀码——这里只陈述不予证明。$p$ 小时它给出 $b \approx (\ln 2)/p \approx 0.69\, N/\mathrm{df}$。参数随词项而异，所以存进词典，或由解码器已知 $\mathrm{df}_t$ 推出。Rice 码把 $b$ 舍入到 $2$ 的幂以提速：

```python
def rice(n, k):                                 # Rice 码（b = 2^k 的 Golomb 码），n >= 1
    q, r = (n - 1) >> k, (n - 1) & ((1 << k) - 1)
    return "1" * q + "0" + (format(r, f"0{k}b") if k else "")
```

::: example Golomb 参数 {#ex-golomb}
某词项出现在 $N = 800$ 篇文档（《爱丽丝》的段落）中的 $\mathrm{df} = 33$ 篇（即 `dormouse`）。按规则 $b \approx 0.69\, N/\mathrm{df}$ 选 Rice 参数，并编码间隙 $301$、$18$、$1$。
::: solution
$0.69 \times 800 / 33 = 16.7$，取 $b = 16 = 2^4$、$k = 4$。间隙 $301$：$n - 1 = 300 = 18 \cdot 16 + 12$，$18$ 个 $1$、一个 $0$、`1100`：$23$ 位。间隙 $18$：$17 = 1 \cdot 16 + 1$：`10` 再接 `0001`，$6$ 位。间隙 $1$：$0 = 0 \cdot 16 + 0$：`0` 再接 `0000`，$5$ 位。对比 $\gamma$：$\abs{\gamma(301)} = 17$，$\abs{\gamma(18)} = 9$，$\abs{\gamma(1)} = 1$。Rice 码在离群值 $301$（首次出场）与成串间隙 $1$ 上更差，在 $N/\mathrm{df} \approx 24$ 上下的典型间隙上更好——那里它花约 $6$ 位对 $\gamma$ 的 $9$ 位。
:::
:::

### 在《爱丽丝》上实测

用每种编码给段落索引的全部 $21\,227$ 个间隙编码，结果如下（只含条目大小，不含词典）：

```text
fixed 32-bit       679264 bits  32.00 bits/posting
fixed 10-bit       212270 bits  10.00 bits/posting
variable byte      190920 bits   8.99 bits/posting
gamma              148147 bits   6.98 bits/posting
delta              144921 bits   6.83 bits/posting
Rice, per-term k   122332 bits   5.76 bits/posting
lower bound sum log2 C(N, df) = 117604 bits, 5.54 bits/posting
```

最后一行是 [[#prop-subset-bound]] 中解释的下界。这是个极小的文集——只有 $800$ 篇文档，定长码不过 $10$ 位——所以相对定长的节省看着不大。在 $N = 10^9$ 篇文档的文集中，定长是 $30$ 位，而高频词的间隙依旧微小，压缩后的索引常是其未压缩大小的五分之一到十分之一。编码之间的排名很典型：变长字节约每条条目一字节，Elias 码更好，按每个词项的密度配参数的编码还要更好。

::: proposition 倒排列表的下界 {#prop-subset-bound}
任何能表示 $\set{1, \dots, N}$ 中一切 $f$ 元 docID 集合的编码，必有某个集合要用至少 $\lceil \log_2 \binom{N}{f} \rceil$ 位。而且，$f \ll N$ 时 $\log_2 \binom{N}{f} \approx f \log_2(N/f) + f \log_2 e$。
:::

::: proof
不同的集合共有 $\binom{N}{f}$ 个，而长度不超过 $\ell$ 的位串的编码至多区分 $2^{\ell + 1} - 1$ 个，故某个集合有 $\ell \ge \log_2 \binom{N}{f} - 1$；定长编码恰需 $\lceil \log_2 \binom{N}{f}\rceil$ 位。近似方面，$\binom{N}{f} = \frac{N(N-1)\cdots(N-f+1)}{f!}$；$f \ll N$ 时分子约 $N^f$，斯特林（Stirling）公式给出 $\log_2 f! \approx f \log_2 f - f \log_2 e$，于是 $\log_2\binom{N}{f} \approx f\log_2 N - f\log_2 f + f\log_2 e$。
:::

对所有词项求和，《爱丽丝》的这个下界是每条条目 $5.54$ 位，逐词项配参的 Rice 码距它只有 $0.22$ 位。编码想优于这个界，在典型列表上只能靠利用计数论证忽略的结构，比如成串性与相关文档的聚簇——这正是 docID 的分配要紧的原因（[[#ex-reorder]]）。

::: widget plot
f: 2*floor(log2(x)) + 1; floor(log2(x)) + 2*floor(log2(floor(log2(x)) + 1)) + 1; 8*(floor(floor(log2(x))/7) + 1); log2(x)
x: 1, 300
y: 0, 24
labels: |\gamma(n)|; |\delta(n)|; \text{变长字节}; \log_2 n
caption: 整数 $1$ 到 $300$ 的码字长度（位）。$\gamma$ 的台阶随 $n$ 每翻倍升两位，$\delta$ 约一位加一个缓长的长度字段，变长字节在 $n = 128$ 处从 $8$ 跳到 $16$ 位。间隙小于约 $30$ 时 $\gamma$ 最短；$\gamma$ 与 $\delta$ 在 $n = 32$ 附近交叉；把 $x$ 轴放大到 $10^5$ 就能看到 $\delta$ 在大间隙上胜出。
:::

::: quiz
一个高频词几乎出现在每篇文档中，于是它的间隙几乎全是 $1$。$\gamma$ 码和变长字节码各约用多少位每条条目？
- [x] $\gamma$：约 $1$ 位；变长字节：$8$ 位
- [ ] $\gamma$：约 $3$ 位；变长字节：$1$ 位
- [ ] 两者都约 $8$ 位
- [ ] $\gamma$：$0$ 位，因为间隙不携带信息
::: solution
$\gamma(1) = \texttt{0}$ 是一位，而变长字节绝不小于一个字节。在《爱丽丝》上，`the` 的列表按 $\gamma$ 每个间隙 $1.47$ 位，变长字节恰 $8$ 位。对这种稠密列表，位向量（每篇文档 $1$ 位）是另一个选择，引擎常在列表变稠时切换表示。
:::
:::

## 速度：为什么压缩让搜索更快

压缩的索引更小，但它更慢吗？解码要花时间，可从存储器、甚至从主存读取更花时间。索引缩小 $4$ 倍，就有四倍的部分装进高速缓存，每条列表的传输量只有四分之一。施勒（Scholer）、威廉姆斯（Williams）、扬尼斯（Yiannis）与佐贝尔（Zobel）（2002）表明：字节对齐编码让查询求值比未压缩索引还**快**，因为省下的传输时间超过解码时间；$\gamma$ 一类位级编码压得更狠，解码却更慢。此后编码的设计一直跟着现代处理器的快事走——少分支、整个机器字、SIMD 指令：

- **字对齐编码**，如 Simple-9（Anh and Moffat, 2005）：把尽可能多的小间隙装进一个 $32$ 位字，配 $4$ 位选择子说明怎么装的。
- **参考框架**（frame-of-reference）与 **PForDelta** 码（Zukowski, Héman, Nes and Boncz, 2006）：给一个比如 $128$ 个间隙的块统一用同一位宽 $w$ 编码，$w$ 选得让大多数间隙装得下，少数更大的**例外**单独存；解包 $128$ 个 $w$ 位值是善于向量化的无分支循环。
- **Elias–Fano** 编码（Vigna，2013 年重新引入索引）：把 $f$ 个小于 $N$ 的单调值存进至多 $f\bigl(2 + \lceil \log_2(N/f) \rceil\bigr)$ 位——距 [[#prop-subset-bound]] 约每元素 $2$ 位——且支持跳到第一个 $\ge x$ 的值而不必先解出前面的一切。

哪种编码最好取决于硬件与查询组合，基准测试也随处理器演进；截至 2026 年，PForDelta 一族与 Elias–Fano 变体这类分块方案在研究与生产系统中都很常见，Lucene 则长期把条目存在 $128$ 个一组、位打包的块里。原则是稳定的：对间隙编码，让码长匹配间隙的分布，把列表组织成分块并带跳跃信息，让查询处理（[[information-retrieval/vector-space]]）能跳过用不着的块，并且既量空间也量解码速度。

::: warning “压缩是拿时间换空间”
对索引这话通常不对。用好码给每条条目解几位，比从内存或磁盘读 $32$ 位未压缩数据快，所以压得好的索引既小**又**快。权衡只出现在两个极端：压得最狠的码（算术编码、逐词项自适应模型）解得太慢，解得最快的码（不压缩的数组）浪费内存带宽。最佳设计点这些年随硬件从位级编码移到字节、字对齐再到 SIMD 分块编码，它必须重新测量，不能想当然。
:::

## 词典的压缩

词典比条目小得多，但它应当常驻内存，因为每个查询词项都要查它。$V$ 个词项按定长记录存放，会在短词项上浪费空间；办法是把所有词项首尾相接地存进一个长字符串，每个词项只留一个指向串内位置的指针。**分块**只给每第 $k$ 个词项存指针，并在每个词项前加一个长度字节，查找时在块指针上二分、再扫至多 $k$ 个词项。**前缀编码**利用排序后的次序：块内每个词项记下它与前一个词项共享的前缀长度和余下的后缀。

::: example 前缀编码 {#ex-front-coding}
给《爱丽丝》中以 `beg` 开头的排好序的词项做前缀编码：`beg`、`began`、`begged`、`begin`、`beginning`、`begins`、`begun`。
::: solution
把每个词项写成（与前一词项共享的前缀长度，余部）：`beg` $(0, \texttt{beg})$、`began` $(3, \texttt{an})$、`begged` $(3, \texttt{ged})$、`begin` $(3, \texttt{in})$、`beginning` $(5, \texttt{ning})$、`begins` $(5, \texttt{s})$、`begun` $(3, \texttt{un})$。后缀共 $3 + 2 + 3 + 2 + 4 + 1 + 2 = 17$ 个字符，加上每个词项一个前缀长度字节（外加一个后缀长度或终止符）：约 $31$ 字节，对比整个词项的 $39$ 个字符。要读 `begins`，解码器必须从块的开头重建，这就是前缀编码只在 $k$ 词项一块内进行、每块以完整写出的词项开头的原因。
:::
:::

Lucene 走得更远，把词项词典存成**有限状态转换器**：一种自动机，既共享词项的前缀也共享后缀，把每个词项映到其条目的存放位置；自动机在 [[theory-of-computation]] 中展开。

::: history
彼得·埃利亚斯（Elias）在 “Universal codeword sets and representations of the integers”（*IEEE Transactions on Information Theory*，1975）中引入 $\gamma$ 码与 $\delta$ 码。所罗门·戈洛姆（Golomb）的 “Run-length encodings”（1966）给出以其命名的编码，罗伯特·加拉格尔（Gallagher）与戴维·范弗豪伊斯（Van Voorhis）在 1975 年证明了它对几何分布的最优性；罗伯特·赖斯（Rice）在 1979 年描述了 $2$ 的幂这一特例。利昂·克拉夫特（Kraft）的不等式出自他 1949 年的麻省理工学院硕士论文，布罗克威·麦克米伦（McMillan）在 1956 年把它推广到一切唯一可译码。这些编码用于倒排文件由墨尔本的阿利斯泰尔·莫法特（Moffat）、贾斯廷·佐贝尔（Zobel）及合作者在 20 世纪 90 年代发展，并总结在威滕（Witten）、莫法特与贝尔（Bell）的《管理千兆字节》（*Managing Gigabytes*，1994；第 2 版 1999）中。斯特芬·海因茨（Heinz）与贾斯廷·佐贝尔在 2003 年描述了单遍内存索引。法尔克·施勒（Scholer）与合作者在 2002 年证明压缩能加速查询求值，贾斯廷·佐贝尔与阿利斯泰尔·莫法特的综述 “Inverted files for text search engines”（*ACM Computing Surveys*，2006）至今仍是该领域的标准概论。
:::

## 后续内容

压缩后、分块组织的倒排列表，正是 [[information-retrieval/vector-space]] 那些打分算法实际遍历的东西；它们的块目录让 WAND 与 MaxScore 能整块跳过，而像现代引擎那样为每块存一个最大分数，能让跳跃更有效。词频与位置用同样的编码压缩（词频是小整数，位置在每篇文档内作间隙编码）。跨机器的分布式构建与分区是 [[distributed-systems/data-processing]] 的主题，并在 [[information-retrieval/web-search]] 中再现。编码本身——前缀码、Kraft 不等式、熵——属于信息论，它同样是 [[information-retrieval/dense-retrieval]] 中稠密向量压缩的基础。

::: summary
- 超内存的索引靠写有序游程再归并来建：带 termID 的 BSBI（[[#alg-bsbi]]），或每游程自带词典的 SPIMI（[[#alg-spimi]]）；更大规模则分布式排序。
- 动态文集用内存索引加盘上索引；**对数归并**写 $O(T \log(T/n))$ 条条目，而非 $\Theta(T^2/n)$（[[#thm-log-merge]]）。
- 倒排列表以**间隙**存储（[[#def-gaps]]），是平均约 $N/\mathrm{df}$ 的小整数。
- **变长字节**（[[#def-vbyte]]）简单快速但绝不少于 $8$ 位；**$\gamma$** 用 $2\lfloor\log_2 n\rfloor + 1$ 位，**$\delta$** 用 $\log_2 n + O(\log\log n)$ 位（[[#thm-gamma-length]]）；两者都是前缀码（[[#lem-prefix]]）。
- **Kraft 不等式**（[[#thm-kraft]]）限制编码能多短；对分布 $2^{-\ell(n)}$ 最优的编码即最优编码，**Golomb–Rice** 码（[[#def-golomb]]）对 $b \approx 0.69 N/\mathrm{df}$ 的几何间隙最优。
- $f$ 条 docID 的列表最坏要 $f \log_2(N/f) + 1.44 f$ 位（[[#prop-subset-bound]]）；在《爱丽丝》上逐词项 Rice 码距此 $4\%$ 以内。
- 好的压缩让搜索更**快**而不是更慢；现代系统用分块、字对齐或 SIMD 编码与 Elias–Fano，靠实测挑选。
:::

## 习题

::: exercise gamma 码 {level=1 check="9"}
写出 $19$ 的 $\gamma$ 码。它有多少位？（填入长度。）
::: solution
$19 = 10011_2$，故 $\lambda = 4$，偏移是 `0011`。$4$ 的一元码是 `11110`，所以 $\gamma(19) = \texttt{11110}\,\texttt{0011}$，共 $2 \cdot 4 + 1 = 9$ 位。
:::
:::

::: exercise 变长字节的长度 {level=1 check="3"}
$100\,000$ 的变长字节码用几个字节？（填入字节数。）
::: solution
$2^{16} = 65\,536 \le 100\,000 < 2^{17}$，所以 $100\,000$ 有 $17$ 个二进制位，需 $\lceil 17/7 \rceil = 3$ 字节。直接算：$100\,000 = 6 \cdot 128^2 + 13 \cdot 128 + 32$，三个 $128$ 进制数位。
:::
:::

::: exercise 手算解码 {level=1}
把 gamma 编码的位串 `1110001110101011111101101111011` 解成间隙列表，再解成 docID。
::: solution
读一个一元长度，再读那么多偏移位。`1110` 给 $\lambda = 3$，偏移 `001`：$1001_2 = 9$。接着 `110`：$\lambda = 2$，偏移 `10`：$110_2 = 6$。接着 `10`：$\lambda = 1$，偏移 `1`：$11_2 = 3$。接着 `111110`：$\lambda = 5$，偏移 `11011`：$111011_2 = 59$。接着 `110`：$\lambda = 2$，偏移 `11`：$111_2 = 7$。间隙是 $9, 6, 3, 59, 7$，其前缀和即 docID：$9, 15, 18, 77, 84$。核对：各 $\abs{\gamma}$ 值 $7 + 5 + 3 + 11 + 5 = 31$ 位，正是串长。
:::
:::

::: exercise gamma 对 delta {level=2 check="32"}
求使 $\abs{\delta(n)} < \abs{\gamma(n)}$ 成立的最小 $n$。（填入 $n$。）
::: solution
记 $\lambda = \lfloor \log_2 n \rfloor$，$\abs{\gamma(n)} - \abs{\delta(n)} = (2\lambda + 1) - (\lambda + 2\lfloor\log_2(\lambda+1)\rfloor + 1) = \lambda - 2\lfloor\log_2(\lambda + 1)\rfloor$。$\lambda = 1, 2, 3, 4$ 时分别为 $1 - 2 = -1$、$2 - 2 = 0$、$3 - 4 = -1$、$4 - 4 = 0$；$\lambda = 5$ 时为 $5 - 4 = 1 > 0$。所以 $\delta$ 首次严格更短在 $\lambda = 5$，即 $n = 32$：$\abs{\gamma(32)} = 11$，$\abs{\delta(32)} = 5 + 2\cdot 2 + 1 = 10$。$n \le 31$ 时 $\gamma$ 码从不更长。
:::
:::

::: exercise gamma 码的 Kraft 和 {level=2}
证明 $\gamma$ 码满足取等号的 Kraft 不等式 $\sum_{n \ge 1} 2^{-\abs{\gamma(n)}} = 1$，并说明取等对前缀码意味着什么。
::: solution
满足 $\lfloor \log_2 n \rfloor = \lambda$ 的整数 $n$ 有 $2^\lambda$ 个（从 $2^\lambda$ 到 $2^{\lambda+1} - 1$），每个的码字长 $2\lambda + 1$ 位。于是
$$
\sum_{n \ge 1} 2^{-\abs{\gamma(n)}} = \sum_{\lambda \ge 0} 2^\lambda \cdot 2^{-(2\lambda+1)} = \sum_{\lambda \ge 0} 2^{-\lambda - 1} = 1.
$$
取等意味着该码是**完备**的：码字的二进区间（[[#thm-kraft]]）覆盖 $[0, 1)$ 至零测集，于是一个码字也无法再缩短，且每个无穷位串都以某个码字开头。这样的码不浪费“编码空间”，但它只对它隐含假定的分布 $p(n) = 2^{-\abs{\gamma(n)}} \approx 1/(2n^2)$ 最优。
:::
:::

::: exercise Golomb 规则 {level=2}
对几何间隙 $\Prob(g = k) = (1 - p)^{k-1}p$，参数 $b$ 的 Golomb 码在一元部分花 $q + 1$ 位，其中 $q = \lfloor (g - 1)/b \rfloor$。证明 $q \ge 1$ 的概率是 $(1-p)^b$，并据此说明取 $b$ 使 $(1-p)^b \approx 1/2$、即 $b \approx (\ln 2)/p$ 为何自然。对 $p = 0.01$ 算一算。
::: solution
$q \ge 1$ 恰在 $g > b$ 时发生，即上一篇条目之后头 $b$ 篇文档都没有该词项，其概率 $(1-p)^b$。更一般地 $\Prob(q \ge j) = (1-p)^{jb}$，所以 $q$ 本身是公比 $(1-p)^b$ 的几何变量。一元码是公比 $1/2$ 几何分布的最优前缀码（其码长 $q + 1$ 恰是概率 $2^{-(q+1)}$ 的 $-\log_2$），所以我们希望 $(1 - p)^b = 1/2$，即 $b = \ln 2 / (-\ln(1-p)) \approx (\ln 2)/p$（$p$ 小时）。此时余数 $r = (g - 1) \bmod b$ 在 $\set{0, \dots, b-1}$ 上近乎均匀，截断二进制对它最优。对 $p = 0.01$：$b \approx 0.693/0.01 = 69.3$；精确地，$\ln 2/(-\ln 0.99) = 68.97$，取 $b = 69$，Rice 码会舍到 $64$。
:::
:::

::: exercise 对数归并的查询代价 {level=3}
对数归并（[[#thm-log-merge]]）下一次查询要查遍所有非空的盘上索引。(a) $c$ 次刷盘之后有几个索引？(b) 一个变体一次归并 $r$ 个等大索引（“$r$ 路归并”），规模因而为 $n, rn, r^2 n, \dots$，每种规模至多存 $r - 1$ 个索引。证明每条条目被写 $O(\log_r (T/n))$ 次，而索引至多 $(r - 1)\lceil \log_r(T/n) \rceil$ 个。增大 $r$ 拿什么换什么？
::: solution
(a) 索引与 $c$ 的二进制表示相映照：$I_i$ 非空恰当 $c$ 的第 $i$ 位为 $1$。索引个数即 $c$ 的 $1$ 位个数，介于 $1$ 与 $\lfloor\log_2 c\rfloor + 1$ 之间。

(b) 如今索引与 $c$ 的 $r$ 进制表示相映照：第 $i$ 层放着规模 $r^i n$ 的索引，个数等于 $c$ 的 $r$ 进制第 $i$ 位数字，至多 $r - 1$；当某层要出现第 $r$ 个索引时，这 $r$ 个归并成上一层一个（进位）。每条条目刷盘时被写一次，此后每参与一次进位再被写一次，每次升一层；最高一层 $i$ 满足 $r^i n \le T$，故一条条目至多被写 $\log_r(T/n) + 1$ 次，即 $O(\log_r(T/n))$，总量 $O(T\log_r(T/n))$。索引个数是 $c$ 的 $r$ 进制数字和，至多为位数乘 $r - 1$，即 $(r - 1)\lceil\log_r(T/n)\rceil$（舍入误差内）。增大 $r$ 降低构建代价（层数更少，每条条目重写得更少），换回的是一次查询要查的索引个数变多。极端情形：$r = 2$ 是对数归并，$r = T/n$ 是“从不归并”（不重写，每次查询查 $T/n$ 个索引）；立即归并是另一个极端——单个索引与二次代价。
:::
:::

::: exercise 重排文档 {#ex-reorder level=3}
间隙编码索引的大小取决于 docID 怎么分配。(a) 证明：若某词项出现在 $f$ 篇文档中，它的间隙之和至多 $N$，且对 $\gamma$ 码总长至多 $f(2\log_2(N/f) + 1)$。(b) 解释为什么把相似的文档分配连续的 docID（例如按 URL 给网页排序，使同站页面相邻）能缩小索引——每条列表的长度仍是 $f$。
::: solution
(a) 间隙 $g_1, \dots, g_f$ 之和等于最后一个 docID，至多 $N$。由 [[#thm-gamma-length]]，$\abs{\gamma(g)} \le 2\log_2 g + 1$；又 $\log_2$ 是凹函数，琴生（Jensen）不等式给出 $\sum_i \log_2 g_i \le f \log_2\bigl(\frac{1}{f}\sum_i g_i\bigr) \le f\log_2(N/f)$。故总长至多 $f(2\log_2(N/f) + 1)$。

(b) (a) 中的界在间隙全相等（$N/f$）时取到；间隙**不均**——许多小间隙加几个大间隙——时长度小得多，因为 $\log_2$ 是凹的：把两个间隙 $a, b$ 换成 $1$ 和 $a + b - 1$，和不变，而 $a, b \ge 2$ 时 $\log_2 a + \log_2 b$ 缩到 $\log_2(a + b - 1)$。相似的文档共享词表，把它们挨在一起，就把每个词项的出现变成一串相邻 docID 的**连段**——团簇内部间隙小，团簇之间大跳。按 URL 排序把共享导航文字、语言与主题的同站页面聚拢；据报告这样的重排能显著缩小索引（几十个百分点），而且对 $\gamma$ 与适应局部密度的 Elias–Fano 分划这类编码效果更大。这就是《爱丽丝》里 `hatter` 的间隙受成串性影响的同一回事。
:::
:::

::: exercise 实现一个 Rice 解码器 {level=2}
写 `rice_decode(bits, k, i)`，返回解码值与下一个位置，作为上面 `rice` 函数的逆；用 $k = 4$ 对间隙 $301, 18, 1$ 做编码再解码来测试它。
::: solution
```python
def rice(n, k):
    q, r = (n - 1) >> k, (n - 1) & ((1 << k) - 1)
    return "1" * q + "0" + (format(r, f"0{k}b") if k else "")

def rice_decode(bits, k, i=0):
    q = 0
    while bits[i] == "1": q += 1; i += 1      # 一元商
    i += 1                                     # 跳过终止的 0
    r = int(bits[i:i + k], 2) if k else 0      # k 位余数
    return (q << k) + r + 1, i + k

bits = "".join(rice(g, 4) for g in [301, 18, 1])
i, out = 0, []
while i < len(bits):
    v, i = rice_decode(bits, 4, i); out.append(v)
print(len(bits), out)
```
```text
34 [301, 18, 1]
```
这 $34$ 位就是 [[#ex-golomb]] 里的 $23 + 6 + 5$。
:::
:::
