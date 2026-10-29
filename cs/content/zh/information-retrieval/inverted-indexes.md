《爱丽丝梦游仙境》的哪些章节同时提到了兔子和王后？一个程序可以回答：读遍全部 $12$ 章、$26\,658$ 个词，记下两个词同时出现的地方。对一本书来说这只要几毫秒，Unix 工具 `grep` 就是这么干的。可对一座千万本书的图书馆，这意味着每个查询要读大约 $500$ GB 的文本；对网页搜索引擎——文档集以千亿页计——根本不可行：按 $1$ GB/s 计算，扫一遍 $100$ TB 的文档集要一天多。办法是把"读"这件事预先做一次，为每个词记下它出现位置的清单——就像书末的索引，只不过为每一个词由机器建成。

本章搭建这个结构——**倒排索引**，并用它回答**布尔查询**（`rabbit AND queen`、`cat OR dormouse`、`rabbit AND NOT queen`）、**短语查询**（`"white rabbit"`）与**通配符查询**（`rab*`）。我们证明归并求交算法既正确又线性，展示查询次序与**跳跃搜索**如何把长 $m \le n$ 的两表求交的代价降到接近 $m \log(n/m)$，把倒排条目扩展出位置以支持短语，并考察把词项映射到列表的词典。词项来自 [[information-retrieval/text-processing]] 的文本处理；词典用 [[data-structures/hash-tables]] 的哈希表或 [[databases/storage-indexing]] 的 B+树。贯穿全章的算例是把《爱丽丝》按 $12$ 章切开得到的 $d_1, \dots, d_{12}$。

## 从关联矩阵到倒排索引

"哪个词出现在哪些文档里"最直白的表示是一张表。

::: definition 词–文档关联矩阵 {#def-incidence}
对含 $N$ 个文档、词表含 $V$ 个词项的文档集，**关联矩阵**是 $V \times N$ 矩阵 $A$：词项 $t$ 出现在文档 $d$ 中则 $A_{t,d} = 1$，否则 $A_{t,d} = 0$。第 $t$ 行称为 $t$ 的**关联向量**。
:::

布尔查询就变成行上的按位运算。以章节为文档，`rabbit` 与 `queen` 的两行是

| | $d_1$ | $d_2$ | $d_3$ | $d_4$ | $d_5$ | $d_6$ | $d_7$ | $d_8$ | $d_9$ | $d_{10}$ | $d_{11}$ | $d_{12}$ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| rabbit | 1 | 1 | 0 | 1 | 0 | 0 | 0 | 1 | 0 | 1 | 1 | 1 |
| queen | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 0 | 1 | 1 |
| AND | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 1 | 1 |

于是 `rabbit AND queen` 的答案是 $\set{d_8, d_{11}, d_{12}}$。对玩具规模的文档集这很完美。对真实文档集这矩阵没救：一百万个文档、词表一百万个词，就是 $10^{12}$ 比特、$125$ GB。可其中几乎全是零。一个 $1\,000$ 词元的文档，其列至多有 $1\,000$ 个 $1$，所以整个矩阵至多有 $10^9$ 个 $1$——至少 $99.9\%$ 是零——而且由齐普夫定律（[[information-retrieval/text-processing#def-zipf]]），大多数行只有寥寥几个 $1$。稀疏表示只存那些 $1$。

::: definition 倒排索引 {#def-inverted-index}
一个**倒排索引**由两部分组成
- 一个**词典**（或**词表**）：词项的集合，每个词项带自己的**文档频率** $\mathrm{df}_t$（含 $t$ 的文档个数）以及指向其倒排列表的指针；并且
- 对每个词项 $t$，一个**倒排列表** $P_t$：含 $t$ 的文档标识（**docID**）的升序表。表中每个**条目**（posting）称为一条倒排条目。条目可以携带更多信息：**词频** $\mathrm{tf}_{t,d}$（$t$ 在 $d$ 中的出现次数）以及各次出现的位置。

索引之所以**倒排**，是因为文档天然是词项的列表，而索引反过来为每个词项列出它的文档。
:::

docID 是分配给文档的整数，通常按加入文档集的先后分配；让每条倒排列表按 docID 保持升序，本章一切都建立在这个决定之上。有序表可以线性时间归并，而相邻 docID 之间的间隙是小数字，压缩得很好（[[information-retrieval/index-compression]]）。

### 靠排序建索引

::: algorithm 基于排序的索引构建 {#alg-build}
输入：文档 $d_1, \dots, d_N$，已分词并规范化。
1. 对每个文档 $d$ 的每个词元 $t$，输出二元对 $(t, d)$。
2. 把所有二元对按词项排序，词项相同的再按 docID 排序。
3. 扫描有序的二元对。对每个词项，开一条倒排列表；对每个不同的 docID，把它追加进去，并把相等二元对的个数作为 $\mathrm{tf}_{t,d}$；把 $\mathrm{df}_t$ 设为列表长度。
:::

因为第 2 步按 $(t, d)$ 排序，每条倒排列表天生按 docID 有序，无须再做什么。代价由排序主导：$T$ 个词元需 $O(T \log T)$ 次比较。二元对放不进内存时，这就成了外部排序，再大规模就是分布式排序；那些版本是 [[information-retrieval/index-compression]] 的主题，而由洗牌（shuffle）代劳排序的 MapReduce 形式在 [[distributed-systems/data-processing]]。

::: example 构建一个小索引 {#ex-build}
在大小写折叠之后，为 $d_1$ = "The Rabbit ran."、$d_2$ = "The Queen ran after the rabbit." 与 $d_3$ = "A cat sat." 建出带词频的倒排索引。
::: solution
第 1 步输出 $(\texttt{the},1), (\texttt{rabbit},1), (\texttt{ran},1), (\texttt{the},2), (\texttt{queen},2), (\texttt{ran},2), (\texttt{after},2), (\texttt{the},2), (\texttt{rabbit},2), (\texttt{a},3), (\texttt{cat},3), (\texttt{sat},3)$：$12$ 个二元对。排序后得
$$
\begin{aligned}
&(\texttt{a},3), (\texttt{after},2), (\texttt{cat},3), (\texttt{queen},2), (\texttt{rabbit},1), (\texttt{rabbit},2),\\
&(\texttt{ran},1), (\texttt{ran},2), (\texttt{sat},3), (\texttt{the},1), (\texttt{the},2), (\texttt{the},2).
\end{aligned}
$$
分组（条目写作 $d\!:\!\mathrm{tf}$）：

| 词项 | df | 倒排列表 |
|---|---|---|
| a | 1 | 3:1 |
| after | 1 | 2:1 |
| cat | 1 | 3:1 |
| queen | 1 | 2:1 |
| rabbit | 2 | 1:1, 2:1 |
| ran | 2 | 1:1, 2:1 |
| sat | 1 | 3:1 |
| the | 2 | 1:1, 2:2 |

共 $8$ 个词项、$11$ 条条目；两个二元对 $(\texttt{the}, 2)$ 合成了一条 $\mathrm{tf} = 2$ 的条目。
:::
:::

用同样的构造处理《爱丽丝》十二章的 Python 程序：

```python
import re
from collections import defaultdict

text = open("alice.txt", encoding="utf-8").read()
chapters = re.split(r"\n\s*CHAPTER [IVXL]+\s*\n", text)[1:]      # 12 个文档
docs = [re.findall(r"[a-z]+(?:'[a-z]+)?", c.lower()) for c in chapters]

pairs = sorted({(t, d) for d, toks in enumerate(docs, 1) for t in toks})   # (词项, docID)，有序
index = defaultdict(list)
for t, d in pairs:
    index[t].append(d)                        # docID 按递增到达

print("terms", len(index), "postings", len(pairs))
for t in ("rabbit", "hatter", "queen", "cat", "turtle", "gryphon", "dormouse", "tarts"):
    print(f"{t:9s} df={len(index[t]):2d} {index[t]}")
```
```text
terms 2618 postings 7348
rabbit    df= 7 [1, 2, 4, 8, 10, 11, 12]
hatter    df= 3 [6, 7, 11]
queen     df= 6 [6, 7, 8, 9, 11, 12]
cat       df= 5 [1, 2, 3, 6, 8]
turtle    df= 3 [9, 10, 12]
gryphon   df= 4 [9, 10, 11, 12]
dormouse  df= 2 [7, 11]
tarts     df= 2 [11, 12]
```

各章的 $26\,658$ 个词元（去掉了 `CHAPTER` 行，保留章节标题）塌缩成 $7\,348$ 条条目，平均每词项 $2.8$ 条。倒排列表已经在讲故事：帽匠和睡鼠在茶会（第 $7$ 章）和法庭（第 $11$ 章），狮鹫在第 $9$ 章登场并留到结尾。

## 布尔检索

::: definition 布尔检索模型 {#def-boolean}
**布尔查询**是由词项经 AND、OR、NOT 运算符构成的表达式。它的答案是一个文档集合：词项表示其倒排列表（作为集合），AND 表示交，OR 表示并，NOT 表示相对于整个文档集的补。一个文档要么在答案里，要么不在；模型没有哪个文档匹配得*更好*的概念。
:::

核心运算是两条有序倒排列表的求交，两个指针像归并排序的归并那样同步走完两表。

::: algorithm 两条倒排列表求交 {#alg-intersect}
输入：长度为 $x$ 的有序表 $p_1$ 与长度为 $y$ 的有序表 $p_2$。
1. $i \gets 0$，$j \gets 0$，$\mathit{answer} \gets$ 空表。
2. 当 $i < x$ 且 $j < y$：
   1. 若 $p_1[i] = p_2[j]$：把 $p_1[i]$ 追加到 $\mathit{answer}$；$i \gets i + 1$；$j \gets j + 1$；
   2. 否则若 $p_1[i] < p_2[j]$：$i \gets i + 1$；
   3. 否则 $j \gets j + 1$。
3. 返回 $\mathit{answer}$。
:::

```python
def intersect(p1, p2):
    answer, i, j, comps = [], 0, 0, 0
    while i < len(p1) and j < len(p2):
        comps += 1                                  # 统计循环轮数（比较次数）
        if p1[i] == p2[j]:
            answer.append(p1[i]); i += 1; j += 1
        elif p1[i] < p2[j]:
            i += 1
        else:
            j += 1
    return answer, comps

print(intersect(index["rabbit"], index["queen"]))
```
```text
([8, 11, 12], 10)
```

::: theorem 归并求交的正确性与代价 {#thm-intersect}
对长度为 $x$ 与 $y$、元素互异的有序表 $p_1, p_2$，[[#alg-intersect]] 至多迭代 $x + y - 1$ 轮（$x, y \ge 1$），恰好按升序返回两表公共的元素。于是最坏情况运行时间为 $\Theta(x + y)$。
:::

::: proof
*正确性。* **断言：**一个元素被越过（其指针前进而未输出）只可能因为它不在另一张表中。设 $p_1[i] < p_2[j]$ 而我们前进 $i$。$p_2$ 中位置 $j$ 及其后的每个元素都至少为 $p_2[j] > p_1[i]$，所以 $p_1[i]$ 不在其中。每个 $j' < j$ 的 $p_2[j']$，本身在更早的某一轮被越过或输出，当时它与某个 $p_1[i']$（$i' \le i$）比较过；若它被输出，则它等于 $p_1[i']$ 且 $i' < i$，因 $p_1$ 严格递增而小于 $p_1[i]$；若它被越过，则 $p_2[j'] < p_1[i'] \le p_1[i]$。无论哪种情形都有 $p_2[j'] \ne p_1[i]$。于是 $p_1[i]$ 不在 $p_2$ 中；$p_1[i] > p_2[j]$ 的情形对称。

由断言，公共元素 $c$ 的两份拷贝都不会被越过。循环停止时有一张表耗尽，该表的每个元素或被输出或被越过；$c$ 在该表中的拷贝没有被越过，所以 $c$ 被输出了。反过来，元素只在 $p_1[i] = p_2[j]$ 时输出，所以输出的都是公共元素。输出递增，因为两个指针都在递增的表上向前走。

*代价。* 每一轮使 $i + j$ 至少增加 $1$。最后一轮之前两表均未耗尽，故 $i \le x - 1$、$j \le y - 1$，从而 $i + j \le x + y - 2$。$i + j$ 从 $0$ 起步，所以最后一轮之前至多有 $x + y - 2$ 轮，总共至多 $x + y - 1$ 轮，每轮常数时间。
:::

两个有序表的并（OR）与差（AND NOT）用同一种行走算出，只是在不同情形下追加，同样花 $\Theta(x + y)$ 时间。注意，单独的 `NOT queen` 意味着一条倒排列表的补集，其长度和整个文档集一样；因此查询处理器把 `rabbit AND NOT queen` 算成两表之差，从不显式生成补集。

::: widget venn
sets: 3
expr: (A | B) & C'
labels: rabbit; cat; queen
caption: 查询 `(rabbit OR cat) AND NOT queen` 作为三条倒排列表之文氏图上的一个区域。换输入一个别的表达式，如 `A & B & C` 或 `(A & C) | B`，想一想查询处理器会按什么次序归并列表来算它。在《爱丽丝》的各章上，此查询返回 $\set{d_1, d_2, d_3, d_4, d_{10}}$（[[#ex-boolean]]）。
:::

::: example 求值一个布尔查询 {#ex-boolean}
利用上面打印的倒排列表，在《爱丽丝》的各章上求值 `(rabbit OR cat) AND NOT queen`。
::: solution
$P_{\text{rabbit}} = [1, 2, 4, 8, 10, 11, 12]$，$P_{\text{cat}} = [1, 2, 3, 6, 8]$。并集行走把每个 docID 输出一次：$[1, 2, 3, 4, 6, 8, 10, 11, 12]$（$9$ 个文档）。再减去 $P_{\text{queen}} = [6, 7, 8, 9, 11, 12]$：同步走两表，保留 $1, 2, 3, 4$（都小于 $6$），丢掉 $6$ 和 $8$（在 $P_{\text{queen}}$ 中），保留 $10$（介于 $9$ 与 $11$ 之间），丢掉 $11$ 和 $12$。答案是 $\set{d_1, d_2, d_3, d_4, d_{10}}$：有兔子或猫、却没有王后的章节。
:::
:::

### 查询优化

$k$ 个词项的合取 $t_1 \text{ AND } \dots \text{ AND } t_k$ 可以两两求交、按任意次序求值。次序很重要。

::: proposition 按频次递增的次序处理 {#prop-df-order}
把 $t_1 \text{ AND } \dots \text{ AND } t_k$ 的倒排列表按文档频率递增 $\mathrm{df}_{t_1} \le \mathrm{df}_{t_2} \le \dots \le \mathrm{df}_{t_k}$ 的次序两两求交，维护一个滚动结果 $R$。则每个中间结果至多有 $\mathrm{df}_{t_1}$ 个元素，且用归并求交时总迭代次数至多为
$$
(k - 1)\,\mathrm{df}_{t_1} + \sum_{i=2}^{k} \mathrm{df}_{t_i}.
$$
:::

::: proof
与 $P_{t_i}$ 求交后的滚动结果是 $P_{t_1}$ 的子集，故始终有 $\abs{R} \le \mathrm{df}_{t_1}$。由 [[#thm-intersect]]，对 $i = 2, \dots, k$，把 $R$ 与 $P_{t_i}$ 求交至多花 $\abs{R} + \mathrm{df}_{t_i} \le \mathrm{df}_{t_1} + \mathrm{df}_{t_i}$ 轮；对 $k - 1$ 次求交求和即得该界。
:::

从最罕见的词项出发还让处理器得以提前停机：一旦 $R$ 为空，答案即为空。文档频率正存放在词典里，处理器才可能在碰任何一条倒排列表之前先定好次序。对一般的布尔表达式，处理器估计每个子表达式的大小——OR 至多是各操作数之和，AND 至多是较小的那个——并据此安排归并次序，这是 [[databases/query-optimisation]] 中基于代价的优化的一个缩影。

::: example 三元合取 {#ex-conjunction}
在《爱丽丝》的各章上按 df 递增求值 `rabbit AND hatter AND dormouse`，统计迭代轮数。
::: solution
文档频率为 $\mathrm{df}_{\text{dormouse}} = 2$、$\mathrm{df}_{\text{hatter}} = 3$、$\mathrm{df}_{\text{rabbit}} = 7$，于是先把 $[7, 11]$ 与 $[6, 7, 11]$ 求交：$7$ 比 $6$（前进第二表），$7 = 7$（输出），$11 = 11$（输出）——$3$ 轮，$R = [7, 11]$。再拿 $R$ 与 $[1, 2, 4, 8, 10, 11, 12]$：$7$ 对 $1, 2, 4$（前进三次），$7 < 8$（前进 $R$），$11$ 对 $8, 10$，然后 $11 = 11$——$7$ 轮，$R = [11]$。总共 $10$ 轮，答案是第 $11$ 章《谁偷走了馅饼？》。[[#prop-df-order]] 的界是 $2 \cdot 2 + 3 + 7 = 14$。
:::
:::

## 更快的求交

一条列表比另一条短得多时——`dormouse` 对上 `the`，或网络规模索引里一个罕见姓名对一个常见词，长 $10^3$ 和 $10^9$ 的列表都不稀奇——沿着长表一条条挪太浪费。它几乎所有的条目都要被跳过，我们希望能成批地跳。

老办法是**跳跃指针**：长表每第 $s$ 条条目存一个指向后面第 $s$ 条的指针，只要跳跃目标仍小于另一表的当前元素，归并就沿跳跃指针走。一个常用启发式是在长 $L$ 的表上大致等距地放 $\sqrt{L}$ 个跳跃，使沿跳跃的次数与两次跳跃之间步行步数相平衡。跳跃只对 AND 查询有用，还多花空间；而且它在列表写出时就固定了，无法随另一条表调整。更灵活的办法只要求长表的存储支持直接读取第 $i$ 个元素，比如数组，或带一个小块最大值目录的压缩条目块。

::: algorithm 跳跃搜索求交 {#alg-gallop}
输入：长为 $m$ 的短有序表 $q$、长为 $n$ 的长有序表 $p$，$m \le n$。
1. $j \gets 0$；$\mathit{answer} \gets$ 空表。
2. 按序对 $q$ 的每个 $x$：
   1. *跳跃。* 探测 $p[j], p[j+1], p[j+3], p[j+7], \dots$，即 $p[j + 2^k - 1]$，$k = 0, 1, 2, \dots$，直到某次探测至少为 $x$ 或探出 $p$ 的末尾。
   2. 在最后一个小于 $x$ 的探测位置与第一个不小于 $x$ 的探测位置之间**二分查找**，找到第一个使 $p[j'] \ge x$ 的位置 $j'$；令 $j \gets j'$。
   3. 若 $j = n$，停。若 $p[j] = x$，把 $x$ 追加到 $\mathit{answer}$。
3. 返回 $\mathit{answer}$。
:::

第 2.1 步的指数搜索出自本特利（Bentley）与姚期智（Yao，1976）；把它与短表的顺序扫描结合，常称为**跳跃**（galloping），Timsort 排序算法归并阶段的同名技术。

```python
def gallop(p, lo, x, cnt):
    """最小的 i >= lo 使 p[i] >= x（不存在则返回 len(p)）；cnt[0] 统计比较次数。"""
    prev, probe, step = lo - 1, lo, 1
    while probe < len(p):                 # 探测 lo, lo+1, lo+3, lo+7, ... 直到 p[probe] >= x
        cnt[0] += 1
        if p[probe] >= x: break
        prev, probe, step = probe, probe + step, step * 2
    lo, hi = prev + 1, min(probe, len(p)) # p[prev] < x，且若 hi < len(p) 则 p[hi] >= x
    while lo < hi:                        # 在 [lo, hi) 中二分找第一个 p[i] >= x
        mid = (lo + hi) // 2; cnt[0] += 1
        if p[mid] < x: lo = mid + 1
        else: hi = mid
    return lo

def intersect_gallop(short, long):
    out, j, cnt = [], 0, [0]
    for x in short:
        j = gallop(long, j, x, cnt)
        if j == len(long): break
        if long[j] == x: out.append(x)
    return out, cnt[0]
```

::: theorem 跳跃求交的代价 {#thm-gallop}
[[#alg-gallop]] 对元素互异的有序表计算 $q \cap p$，至多用
$$
2m \log_2\!\Bigl(\frac{n}{m} + 1\Bigr) + 3m
$$
次比较。特别地，它用 $O\bigl(m \log(n/m + 1)\bigr)$ 次比较；它总是 $O(m + n)$，而 $m \ll n$ 时远小于 $n$。
:::

::: proof
*正确性。* 每次搜索返回当前 $j$ 之后（含 $j$）第一个使 $p[j'] \ge x$ 的位置。$j$ 之前的所有位置存着早先某个 $q$ 元素的更小值，因而小于 $x$；于是 $x \in p$ 当且仅当 $p[j'] = x$。因 $q$ 递增，把下一次搜索从 $j'$ 起步不会漏掉任何东西。

*一次搜索的代价。* 设 $g \ge 0$ 为搜索前进的距离 $j' - j$。跳跃阶段按偏移 $2^k - 1$ 探测（$k = 0, 1, \dots$），在第一个满足 $2^k - 1 \ge g$ 的 $k$ 处停止（或在表的末尾停止，那只会让它停得更早），故探测至多 $K + 1$ 次，其中 $K = \lceil \log_2(g + 1) \rceil$。随后的二分查找覆盖偏移 $2^{K-1} - 1$ 与 $2^K - 1$ 之间（不含前者、含后者）的位置，共 $2^{K-1}$ 个位置，至多需 $K$ 次比较。所以一次搜索至多花 $2K + 1 \le 2\log_2(g + 1) + 3$ 次比较。

*总计。* 设各次前进距离为 $g_1, \dots, g_m$。它们的和至多为 $n$，因为 $j$ 从不减小且从不超过 $n$。函数 $\log_2(g + 1)$ 是凹的，由琴生不等式
$$
\sum_{i=1}^{m} \log_2(g_i + 1) \le m \log_2\!\Bigl(\frac{1}{m}\sum_i g_i + 1\Bigr) \le m \log_2\!\Bigl(\frac{n}{m} + 1\Bigr).
$$
对 $m$ 次搜索各加 $3$ 即得此界。最后，$u \ge 0$ 时 $\log_2(1 + u) \le u \log_2 e$，故 $m \log_2(n/m + 1) \le n \log_2 e$，代价同时也是 $O(m + n)$。
:::

一个实验（对随机数据的观察，不是定理）显示这个界有多贴近。从 $\set{0, \dots, 10^7 - 1}$ 抽一个长 $n = 10^6$ 的 docID 长表，再抽长为 $m$ 的短表，其中一半元素取自长表：

```text
m=    10 found=     5 gallop comparisons=     323  m*log2(n/m)=      166  merge<=m+n=1000010
m=   100 found=    54 gallop comparisons=    2592  m*log2(n/m)=     1329  merge<=m+n=1000100
m=  1000 found=   552 gallop comparisons=   19216  m*log2(n/m)=     9966  merge<=m+n=1001000
m= 10000 found=  5498 gallop comparisons=  127048  m*log2(n/m)=    66439  merge<=m+n=1010000
m=100000 found= 54995 gallop comparisons=  654219  m*log2(n/m)=   332193  merge<=m+n=1100000
```

跳跃大约用 $2m \log_2(n/m)$ 次比较，与证明的预言一致——$m = 10$ 时比归并少约 $3\,000$ 倍，到 $m = n/10$ 仍占优。这个界接近最优：两条有序表交错的方式有 $\binom{m+n}{m}$ 种，于是由 [[algorithms/sorting-selection]] 的决策树论证，任何基于比较、把两者*归并*起来的算法最坏情况至少需 $\log_2 \binom{m+n}{m} \approx m \log_2(n/m) + m \log_2 e$ 次比较，求交也有类似的下界。

::: widget plot
f: 1 + x; 2*x*log2(1/x + 1)
x: 0.001, 1
y: 0, 2.2
labels: \text{归并 } (m+n)/n; \text{跳跃 } 2m\log_2(n/m+1)/n
caption: 长表每个元素摊到的比较次数，随两表长度之比 $m/n$ 的变化。一条表远短于另一条时跳跃便宜得多，只有两表长度相近时才吃亏（两条曲线在 $m/n \approx 0.3$ 附近相交），所以查询处理器比较文档频率在两者之间选择——或者干脆一路用跳跃，它至多差一个小常数因子。
:::

::: quiz
查询处理器要把一条 $1\,000$ 条目的表与一条 $10^8$ 条目的表求交。与归并的约 $10^8$ 次相比，跳跃大约需要多少次比较？
- [ ] 约 $10^3$
- [x] 约 $3 \times 10^4$
- [ ] 约 $10^7$
- [ ] 约 $10^8$；跳跃只对内存中的列表有用
::: solution
$2m \log_2(n/m) = 2 \times 1000 \times \log_2(10^5) \approx 2000 \times 16.6 \approx 3.3 \times 10^4$，比归并少约 $3\,000$ 倍。在压缩的磁盘索引里，长表按块读入，同一个想法借助记录每块最大 docID 的小目录整块整块地跳。
:::
:::

## 短语与邻近查询

用户会把短语放进引号——`"white rabbit"`、`"mock turtle"`、`"to be or not to be"`——并期望词与词相邻且有序。只有 docID 的索引检查不了这一点：`white AND rabbit` 会匹配任何一处含这两个词的每一章。两种扩展解决这个问题。

**双词索引**把每一对相邻词项当作一个独立词项（`white rabbit`、`rabbit with`……）。两词短语就是一次查找，而长短语 `"a b c d"` 变成合取 `"a b" AND "b c" AND "c d"`，这可能产生假匹配（三个双词可能各自分开出现）。词典会膨胀得厉害——不同的词对远比词多——所以双词是有选择地用的，比如给常见短语或含停用词的词对。

::: definition 位置索引 {#def-positional}
**位置索引**在每条倒排条目中存放该词项在文档中出现位置的升序表：$P_t = \langle (d, \mathrm{tf}_{t,d}, [k_1, k_2, \dots, k_{\mathrm{tf}}]), \dots \rangle$，其中位置 $k$ 指 $d$ 的第 $k$ 个词元（从 $0$ 起）。文档 $d$ 含短语 $t_1 t_2$，当且仅当存在位置 $k$，使 $k$ 是 $t_1$ 在 $d$ 中的位置、$k + 1$ 是 $t_2$ 在 $d$ 中的位置。
:::

::: algorithm 位置短语求交 {#alg-phrase}
要找出含短语 $t_1 t_2 \dots t_\ell$ 的文档：
1. 按 [[#alg-intersect]] 对 $t_1, \dots, t_\ell$ 的 docID 列表求交（最罕见的先来）。
2. 对交中的每个文档 $d$，令 $S$ 为 $t_1$ 在 $d$ 中的位置集。对 $i = 2, \dots, \ell$：把 $S$ 替换为 $\set{k \in S : k + i - 1 \in \mathrm{pos}(t_i, d)}$，办法是把有序表 $S + (i - 1)$ 与 $t_i$ 的位置表归并。若 $S$ 变空，则 $d$ 不含该短语。
3. 若最后一个词项之后 $S$ 仍非空，报告 $d$（连同起始位置 $S$）。
:::

把"等于 $k + i - 1$"换成"落在 $k$ 个位置之内"，就得到**邻近查询**，例如 `rabbit /3 watch`（两个词相距至多三个位置，先后不限），它在法律与专利检索中是标准功能。第 2 步的时间与检查的位置数成正比，所以一次短语查询的代价大约是这些词在候选文档中的词频总和——对 `"to be or not to be"` 这类常见词的短语而言，这是个大数目。

::: example 第 4 章里的一个短语 {#ex-phrase}
《爱丽丝》第 $4$ 章（《兔子派来了小比尔》）的位置条目是 $\mathrm{pos}(\texttt{white}) = [10, 83, 424]$、$\mathrm{pos}(\texttt{rabbit}) = [1, 11, 132, 266, 318, 781, 1003, 1031, 1043, 1103, 1200, 1817]$。这一章含 `"white rabbit"` 吗，在何处？然后再看全书。
::: solution
把 `white` 的位置平移一个：$[11, 84, 425]$，与 `rabbit` 的位置表归并。$11$ 同在两表中；$84$ 落在 $11$ 与 $132$ 之间、$425$ 落在 $318$ 与 $781$ 之间，都不成。该短语出现一次，自位置 $10$ 起：本章以标题开头，词元 $0$–$6$ 是 "the rabbit sends in a little bill"，接下来是 "It was the White Rabbit, trotting slowly back again"。对每一章做同样的计算，得到每个短语的出现次数：

```text
white rabbit {1: 2, 2: 1, 4: 1, 8: 2, 10: 1, 11: 7, 12: 8}
mock turtle {9: 25, 10: 28, 12: 1}
march hare {6: 4, 7: 21, 11: 5, 12: 1}
```

第 $5$ 章含 `white` 一次（老威廉父亲诗里说头发 "has become very white"），却不含 `rabbit`，所以在第 1 步就被筛掉、没看位置。而 `white AND rabbit` 匹配的恰好也是那七章——在以章为粒度时，不像大型文档集，几乎每次共现恰好就是该短语。
:::
:::

位置很贵。《爱丽丝》各章的位置索引存了 $26\,658$ 个位置——一词元一个——而 docID 条目只有 $7\,348$ 条，数目是它的 $3.6$ 倍。文档长的大型文档集里这个比例更大，位置索引即便压缩后通常也是 docID 加词频索引的两到四倍。但引擎仍为多数字段存位置，因为短语匹配与邻近不仅是过滤手段，也是排序的强信号。

## 词典与通配符查询

词典把每个词项映射到它的文档频率和倒排列表的位置。常用的结构有两种。

- **哈希表**（[[data-structures/hash-tables]]）对精确词项给出期望 $O(1)$ 的查找（外加对词项做哈希的代价）。它答不了"所有以 `rab` 开头的词项"，而且必须随词表增长而扩容——按 Heaps 定律，词表总是在增长（[[information-retrieval/text-processing#def-heaps]]）。
- **有序结构**——B+树（[[databases/storage-indexing]]）、二分查找的有序数组，或像 Lucene 那样的 trie、有限状态转写器——给出 $O(\log V)$ 的查找，并保持词项按字典序排列，于是**前缀查询** `rab*` 就是从 `rab` 到（但不含）`rac` 的区间扫描。

通配符出现在别处的查询要更多手段。**后缀查询** `*bit` 是在第二个"反转词"词典上的前缀查询（`tib*`），`ra*it` 则是前缀查询 `ra*` 与后缀查询 `*it` 的交。

::: definition 轮排索引与 $k$-gram 索引 {#def-kgram}
词项 $w$ 的**轮排索引**（permuterm index）添加结束符 `$`，并把 `w$` 的每个轮排放进有序词典，各指向 $w$：`hat` 的轮排是 `hat$`、`at$h`、`t$ha` 与 `$hat`。查询 `X*Y` 旋转成 `Y$X*`，按前缀查询回答。**$k$-gram 索引**把 `$w$` 的每段连续 $k$ 个字符（`$` 标记两端）映射到含它的词项列表；通配符查询的答法是：取其固定部分各 $k$-gram 的词项列表求交，再拿模式检查候选。
:::

::: example 两种通配符 {#ex-wildcard}
用轮排索引找出《爱丽丝》中匹配 `h*er` 的词项，再用二元（$k = 2$）gram 索引找出匹配 `red*` 的词项。为什么 $k$-gram 索引需要一步后过滤？
::: solution
*轮排。* 旋转 `h*er$` 使 `*` 落到末尾：`er$h*`。词项 $w$ 匹配 `h*er`，恰当 `w$` 的某个轮排以 `er$h` 开头——对 `hatter$` 是轮排 `er$hatt`。对轮排词典做 `er$h` 的前缀扫描恰好返回所有匹配词项；在《爱丽丝》中是 `hatter`、`her` 和 `however`。

*二元 gram。* 带上结束符，`red*` 要求二元 gram `$r`、`re`、`ed`。这三条词项列表求交得《爱丽丝》的 $17$ 个词项：`red` 和 `reduced`，但也有 `received`、`recognised`、`remarked`、`replied`、`returned`、`roared` 以及另外九个。它们全以 `r` 开头、都*在某处*含 `re` 和 `ed`，可只有 `red` 和 `reduced` 按模式要求的次序和相邻含它们。$k$-gram 索引记录的是哪些碎片出现过、而不是在哪里出现，所以每个候选都得拿模式检查一遍——在一份短候选表上做廉价的字符串匹配。二元 gram 索引比轮排索引小得多，后者要给每个词项存下每一个轮排。
:::
:::

### 拼写纠错

词典还支持**拼写纠错**。对一个不在词典里的查询词（`dormose`），候选纠正取词典中与它**编辑距离**小的词——把一个串变成另一个串所需插入、删除、替换的最少次数，用 [[algorithms/dynamic-programming]] 的动态规划在 $O(\abs{u}\cdot\abs{v})$ 时间算出。对全部 $V$ 个词项逐个算太慢，所以先用 $k$-gram 索引取出与查询共享许多 $k$-gram 的词（例如用两个 $k$-gram 集合的杰卡德（Jaccard）系数度量，它还会在 [[information-retrieval/web-search]] 重现），编辑距离只对这些候选排序。在距离相同的候选中，通常取文档集或历史查询中最常见者；网页引擎从用户改敲查询的日志里学纠正。

::: warning 布尔索引答的是集合，不是排序
布尔查询给出**精确匹配**语义：答案里的每个文档都满足查询，答案外的都不满足。这正是法律、专利和系统医学综述里的专业检索者要的，因为他们需要确切知道自己检索过什么。对其他人它是错的模型。`rabbit AND queen AND hatter AND dormouse` 一无所获或只有寥寥几篇；`rabbit OR queen` 返回几千篇而毫无次序。用户无法靠增删运算符在"太少"与"太多"之间把舵，也没有*最佳*匹配的概念。排序检索（[[information-retrieval/vector-space]]）保留倒排索引，但给文档打分；本课程其余大部分内容就在讲怎么打分。
:::

::: history
词语索引历史悠久：第一部拉丁文《圣经》的语词索引（concordance）——逐词列出每一次出现——约 1230 年由多明我会修士在圣谢尔的于格（Hugh of Saint-Cher）主持下编成。**坐标索引法**——查询在每个关键词下归档的文档列表之间求交——由莫蒂默·陶贝（Mortimer Taube）在 20 世纪 50 年代初的 Uniterm 系统中引入；IBM 的汉斯·彼得·卢恩（Hans Peter Luhn）约 1960 年用计算机建立了上下文关键词索引（KWIC）。在线布尔检索服务——DIALOG（洛克希德公司，1972 年起商用）、MEDLINE（1971）与法律检索服务 LEXIS（1973）——在此后数十年间是检索的主导形式。乔恩·本特利（Jon Bentley）与姚期智（Andrew Yao）的 "An almost optimal algorithm for unbounded searching"（1976）给出跳跃所用的指数搜索；埃里克·德梅因（Erik Demaine）、亚利杭德罗·洛佩斯-奥尔蒂斯（Alejandro López-Ortiz）与伊恩·芒罗（Ian Munro）的 "Adaptive set intersections, unions, and differences"（SODA 2000）分析了代价随输入自适应的集合运算算法。道格·卡廷（Doug Cutting）1999 年开始编写 Lucene 检索库；它于 2001 年成为 Apache 项目，如今是许多搜索引擎的底座。
:::

## 实践

生产环境的索引不是一个结构而是许多个。新文档先在内存中建索引，再刷成不可变的**段**，每段是一个完整的小型倒排索引，由后台任务定期归并；删除记在一个位向量里，归并时才真正移除（[[information-retrieval/index-compression]] 分析这种对数归并）。倒排列表按块压缩存放，比如每块 $128$ 个 docID，并配一个记录每块末尾 docID 的小目录，让跳跃能整块整块地跳而不必解压。大型文档集**按文档划分**：每台机器索引文档的一个子集，每个查询发给所有机器，再把部分结果合并，如同 [[distributed-systems/distributed-storage]] 中的划分式存储。按词项划分也可行，但会让多词项查询变贵，因为它们的列表分在不同机器上。

## 后续内容

倒排索引是其后一切的地基。[[information-retrieval/index-compression]] 为放不进内存的文档集构建它，并把 docID 间隙压到每条至多一字节左右。[[information-retrieval/vector-space]] 加入词权重、给文档打分而不是过滤，用的仍是同样的列表行走——那时是**逐文档**（document-at-a-time）的，配合前 $k$ 小顶堆，以及 WAND 与 MaxScore 这类跳过无缘进前 $k$ 的文档的算法——换了张面孔的跳跃。网络规模的索引、爬行与重复检测在 [[information-retrieval/web-search]]。

::: summary
- **倒排索引**（[[#def-inverted-index]]）为每个词项存文档频率和一条按 docID 升序的倒排列表，可另带词频与位置；它是关联矩阵（[[#def-incidence]]）的稀疏形态。
- 构建方法是输出 $(t, d)$ 二元对并**排序**（[[#alg-build]]）；规模一大就变成外部排序与分布式排序。
- **布尔查询**（[[#def-boolean]]）靠行走有序表求值：求交、求并、求差都是 $\Theta(x + y)$ 时间（[[#thm-intersect]]）；绝不显式生成 `NOT t`。
- 求交**先最罕见**：中间结果不会超过最小的 df（[[#prop-df-order]]）。
- **跳跃**求交需 $O(m \log(n/m + 1))$ 次比较（[[#thm-gallop]]），接近下界，$m \ll n$ 时远快于归并；跳跃指针是更老、更不灵活的替代。
- **位置索引**（[[#def-positional]]）靠归并位置表回答短语与邻近查询（[[#alg-phrase]]），代价是两到四倍的空间。
- 词典是哈希表（精确查找）或有序结构（前缀查询）；轮排索引与 $k$-gram 索引对付一般通配符（[[#def-kgram]]），$k$-gram 配合编辑距离做拼写纠错。
:::

## 习题

::: exercise 数条目 {level=1 check="12"}
为 $d_1$ = "to be or not to be"、$d_2$ = "to see or not to see"、$d_3$ = "be what you see" 建只含 docID 的倒排索引。它含多少条条目？（填入条目数。）
::: solution
倒排列表为 `be` $\to [1, 3]$、`not` $\to [1, 2]$、`or` $\to [1, 2]$、`see` $\to [2, 3]$、`to` $\to [1, 2]$、`what` $\to [3]$、`you` $\to [3]$：$7$ 个词项，$2 + 2 + 2 + 2 + 2 + 1 + 1 = 12$ 条条目。$16$ 个词元缩成 $12$ 条条目，是因为文档内重复的词（$d_1$ 里的 `to` 和 `be`、$d_2$ 里的 `to` 和 `see`）各只给一条条目，$\mathrm{tf} = 2$。
:::
:::

::: exercise 归并轮数 {level=1 check="6"}
[[#alg-intersect]] 在 $p_1 = [2, 4, 6, 8]$ 与 $p_2 = [1, 2, 3, 9]$ 上循环多少轮？（填入轮数。）
::: solution
$(2,1)$：前进 $p_2$。$(2,2)$：输出 $2$，双双前进。$(4,3)$：前进 $p_2$。$(4,9)$：前进 $p_1$。$(6,9)$：前进 $p_1$。$(8,9)$：前进 $p_1$，此时 $p_1$ 耗尽。共 $6$ 轮，低于界 $x + y - 1 = 7$；答案是 $[2]$。
:::
:::

::: exercise 规划一次查询 {level=1}
四个词项的文档频率为 $\mathrm{df}_a = 4\,000$、$\mathrm{df}_b = 300$、$\mathrm{df}_c = 90\,000$、$\mathrm{df}_d = 25\,000$。`a AND b AND c AND d` 应按什么次序处理？[[#prop-df-order]] 给出的归并轮数界是多少？对 `(a OR c) AND (b OR d)`，利用 OR 规模的上界，你会选什么次序？
::: solution
df 递增：$b, a, d, c$。界为 $(4 - 1) \cdot 300 + 4\,000 + 25\,000 + 90\,000 = 119\,900$ 轮。第二个查询，$\abs{a \cup c} \le 94\,000$、$\abs{b \cup d} \le 25\,300$；先算 $b \text{ OR } d$（约 $25\,300$ 轮），再算 $a \text{ OR } c$（约 $94\,000$），然后用较小的并与较大的交。既然两个并都非算不可，这里的次序不那么要紧；要紧的是最后那次求交可以拿较小的并去跳跃。
:::
:::

::: exercise 并与差 {level=2}
写出有序表上 $p_1 \cup p_2$ 与 $p_1 \setminus p_2$ 的归并式算法，并证明各至多 $x + y$ 轮。
::: solution
*并。* 两表均未耗尽时：$p_1[i] = p_2[j]$ 则输出它并双双前进；$p_1[i] < p_2[j]$ 则输出 $p_1[i]$ 并前进 $i$；否则输出 $p_2[j]$ 并前进 $j$。然后把剩下的那张表整个输出。*差。* 两表均未耗尽时：相等则双双前进（不输出）；$p_1[i] < p_2[j]$ 则输出 $p_1[i]$ 并前进 $i$；否则前进 $j$。然后把 $p_1$ 余下的部分输出。

正确性仿照 [[#thm-intersect]] 的证明：一个元素被越过，只发生在另一表已越过它之后，所以它不可能出现在那里。代价方面，主循环的每一轮和结尾复制的每个元素都使 $i + j$ 至少加一，而全程 $i + j \le x + y$，故至多 $x + y$ 步。两种输出都有序，可以继续喂给后续的归并。
:::
:::

::: exercise 手做跳跃 {level=2 check="8"}
取 $q = [7, 11]$、$p = [1, 2, 4, 8, 10, 11, 12]$（即 `dormouse` 与 `rabbit` 的列表）跑 [[#alg-gallop]]，照程序清单的办法统计比较次数。共比较多少次？（填入数目。）
::: solution
$x = 7$，从 $j = 0$ 起：探测 $p[0] = 1 < 7$、$p[1] = 2 < 7$、$p[3] = 8 \ge 7$——$3$ 次探测。在位置 $[2, 3)$ 上二分：比较 $p[2] = 4 < 7$，于是第一个使 $p \ge 7$ 的位置是 $3$——$1$ 次比较。$p[3] = 8 \ne 7$。$x = 11$，从 $j = 3$ 起：探测 $p[3] = 8$、$p[4] = 10$、$p[6] = 12 \ge 11$——$3$ 次探测；在 $[5, 6)$ 上二分：$p[5] = 11 \ge 11$——$1$ 次比较；$p[5] = 11$ 匹配。总计 $3 + 1 + 3 + 1 = 8$ 次比较，答案是 $[11]$；`intersect_gallop([7, 11], index["rabbit"])` 返回 `([11], 8)`。在这两条短列表上跳跃并不比归并强；它的优势在 $m \ll n$。
:::
:::

::: exercise 三词短语 {level=2}
某文档中位置为 $\mathrm{pos}(\texttt{to}) = [0, 4, 9, 15]$、$\mathrm{pos}(\texttt{be}) = [1, 5, 12]$、$\mathrm{pos}(\texttt{or}) = [2, 7]$。用 [[#alg-phrase]] 找出短语 `"to be or"` 的所有出现。再找出满足邻近查询 `to /2 or`（相距至多两个位置，先后不限）的词对。
::: solution
$S = [0, 4, 9, 15]$。对 `be`（偏移 $1$）：保留使 $k + 1 \in [1, 5, 12]$ 的 $k$：$k = 0, 4$，故 $S = [0, 4]$。对 `or`（偏移 $2$）：保留使 $k + 2 \in [2, 7]$ 的 $k$：只有 $k = 0$（$4 + 2 = 6$ 不是 `or` 的位置）。短语出现一次，在位置 $0$。对 `to /2 or`：满足 $\abs{k_{\text{to}} - k_{\text{or}}} \le 2$ 的词对是 $(0, 2)$、$(4, 2)$、$(9, 7)$；$(15, \cdot)$ 太远。所以三个词对，而 $(4, 2)$ 两词次序"颠倒"，这是邻近查询允许的。
:::
:::

::: exercise 跳跃指针的空间 {level=3}
一条长 $L$ 的倒排列表每 $s$ 条条目设一个跳跃指针。把与一条短得多的列表的求交建模为：对短表的 $m$ 个元素中的每一个，处理器沿跳跃指针前进，直到下一个跳跃目标过大，然后至多步行 $s - 1$ 条条目。证明：对一条必须走完全表的单独查找，步数至多 $L/s + s$，在 $s = \sqrt{L}$ 处最小，并解释为什么 $m$ 变动时这个启发式不如跳跃好用。
::: solution
从头到任意位置的一次遍历至多沿 $\lceil L/s \rceil$ 次跳跃，然后至多步行 $s - 1$ 条条目，故至多 $L/s + s$ 步（不计取整）。函数 $L/s + s$ 的导数为 $-L/s^2 + 1$，在 $s = \sqrt{L}$ 处为零，此处取值 $2\sqrt{L}$。这就是 $\sqrt{L}$ 启发式的来历。但它优化的是*一次*查找。$m$ 次查找散布在整条表上时，整个求交过程中沿跳跃的总步数至多 $L/s$，而不是每次查找 $L/s$，而步行至多花 $m(s - 1)$；此时最好的 $s$ 约为 $\sqrt{L/m}$，依赖于另一条表。跳跃指针在列表写出时固定，一个间距无法同时适配短伴与长伴。跳跃则自动适应，对每个 $m$ 都达到 $O(m \log(L/m + 1))$（[[#thm-gallop]]），只需要表的随机访问能力（或一个块目录）。
:::
:::

::: exercise 双词对位置 {level=3}
一个文档集有 $T$ 个词元、词表 $V$。(a) 给出双词索引词典条目数与双词条目数的上界。(b) 一条 $\ell \ge 3$ 词的短语查询在双词索引上按 $\ell - 1$ 个双词的合取回答。构造一个会被返回、却不包含该短语的文档。(c) 为什么位置索引从不犯这个错？
::: solution
(a) 相邻词元对共有 $T - 1$ 对（每篇文档内部如此，文档边界处略少），每一对都是某个双词的一次出现，所以不同的双词至多 $T - 1$ 个、条目至多 $T - 1$ 条——不同双词也不超过 $V^2$ 个。实际上不同双词的个数是 $V$ 的很大倍数，这正是问题所在。(b) 对 `"to be or"`，双词是 `to be` 和 `be or`。文档 "to be honest, let it be or not" 两个双词都有，却没有那个短语。(c) 位置算法检查的是各次出现在同一起始位置 $k$ 处恰好排成连续位置 $k, k+1, \dots, k + \ell - 1$，这正是短语出现的定义；双词合取只检查每个相邻词对在某处出现过。
:::
:::

::: exercise 轮排索引的规模 {level=2 check="6"}
词项 `alice` 给轮排索引添加多少个条目？（填入轮排个数。）
::: solution
串 `alice$` 有 $6$ 个字符，故有 $6$ 个轮排：`alice$`、`lice$a`、`ice$al`、`ce$ali`、`e$alic`、`$alice`。一般地，长 $\ell$ 的词项贡献 $\ell + 1$ 个条目，所以轮排词典约比普通词典大（平均词长 $+ 1$）倍——对英语大约是 $8$ 到 $10$ 倍。
:::
:::
