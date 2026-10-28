SQL 只说明要计算什么，而 [[databases/query-processing]] 已经表明，计算它的方法有很多种，代价可以相差几个数量级。总得有人来做出选择。**查询优化器**接受查询的代数表达式，生成与之等价的表达式，为每一个候选配上物理实现，估计每个候选的代价，最后选出最便宜的。就本章主要示例中的四表连接查询而言，最好的连接顺序约需 $10^4$ 单位工作量，最坏的约需 $2 \times 10^7$；而一个典型的优化器必须在几毫秒之内对每条查询做出这样的选择，且不能执行其中任何一个候选。

优化器由三部分构成，本章依次讨论。一是**搜索空间**：与查询等价的一切计划，由代数**等价规则**生成。二是**代价模型**：即上一章的公式，喂入**基数估计**——用关于数据的统计信息算出的中间结果的预测大小。三是**搜索算法**：这里采用 IBM System R 的动态规划，它至今仍是多数关系优化器的核心。理论是干净的，实践却很难，因为基数估计常常错得离谱；我们会看到优化器选出一个比备选方案慢五十倍的计划。

## 等价规则

若两个关系代数表达式在*每一个*数据库实例上都返回相同的关系，则称它们**等价**（[[databases/relational-model]]）。优化器只使用经过证明能保持等价性的规则来改写表达式。

::: theorem 关系代数的等价规则 {#thm-equivalences}
对关系 $R, S, T$、条件 $\theta, \theta_1, \theta_2$ 与属性列表 $L, L_1, L_2$，只要两端有定义，下述各条都成立。
1. **选择的层层叠加**：$\sigma_{\theta_1 \wedge \theta_2}(R) \equiv \sigma_{\theta_1}(\sigma_{\theta_2}(R))$；因此选择可以交换次序。
2. **投影的层层叠加**：若 $L_1 \subseteq L_2$，则 $\pi_{L_1}(\pi_{L_2}(R)) \equiv \pi_{L_1}(R)$。
3. **选择与笛卡尔积**：$\sigma_\theta(R \times S) \equiv R \bowtie_\theta S$（θ连接的定义）。
4. **连接的交换律**：$R \bowtie_\theta S \equiv S \bowtie_\theta R$（至多差的只是列的次序，在属性具名的观点下这无关紧要）。
5. **连接的结合律**：对自然连接，$(R \bowtie S) \bowtie T \equiv R \bowtie (S \bowtie T)$；对 θ连接，若 $\theta_2$ 只提到 $S$ 与 $T$ 的属性，则 $(R \bowtie_{\theta_1} S) \bowtie_{\theta_2 \wedge \theta_3} T \equiv R \bowtie_{\theta_1 \wedge \theta_3} (S \bowtie_{\theta_2} T)$。
6. **下推选择**：若 $\theta$ 只提到 $R$ 的属性，则 $\sigma_\theta(R \bowtie S) \equiv \sigma_\theta(R) \bowtie S$；若 $\theta_1$ 只提到 $R$、$\theta_2$ 只提到 $S$，则 $\sigma_{\theta_1 \wedge \theta_2}(R \bowtie S) \equiv \sigma_{\theta_1}(R) \bowtie \sigma_{\theta_2}(S)$。
7. **下推投影**：$\pi_L(R \bowtie_\theta S) \equiv \pi_L\bigl(\pi_{L_1}(R) \bowtie_\theta \pi_{L_2}(S)\bigr)$，其中 $L_1$（$L_2$）由 $R$（$S$）中出现在 $L$ 或 $\theta$ 中的属性组成。
8. **选择与集合运算**：$\sigma_\theta(R \cup S) \equiv \sigma_\theta(R) \cup \sigma_\theta(S)$，对 $\cap$ 与 $-$ 同样成立；此外 $\sigma_\theta(R - S) \equiv \sigma_\theta(R) - S$。
:::

::: proof
我们证明规则 5（自然连接）、6 以及规则 8 中对差的情形；其余各条都是类似的直接验证。

*规则 6。* 设 $U$ 与 $V$ 分别是 $R$ 与 $S$ 的属性。$U \cup V$ 上的元组 $t$ 属于 $\sigma_\theta(R \bowtie S)$ 当且仅当 $t[U] \in R$、$t[V] \in S$ 且 $\theta(t)$。由于 $\theta$ 只提到 $U$ 的属性，$\theta(t) = \theta(t[U])$，于是条件等价于 $t[U] \in \sigma_\theta(R)$ 且 $t[V] \in S$，即 $t \in \sigma_\theta(R) \bowtie S$。第二个式子把第一个式子连同规则 1 用两次即得。

*规则 5。* 以 $U, V, W$ 为属性，两端都由满足 $t[U] \in R$、$t[V] \in S$ 且 $t[W] \in T$ 的 $U \cup V \cup W$ 上的元组 $t$ 组成：对左边，$t \in (R \bowtie S) \bowtie T$ 当且仅当 $t[U \cup V] \in R \bowtie S$ 且 $t[W] \in T$，当且仅当 $t[U] \in R$、$t[V] \in S$ 且 $t[W] \in T$；右边完全对称。

*规则 8，差。* $t \in \sigma_\theta(R - S)$ 当且仅当 $t \in R$、$t \notin S$ 且 $\theta(t)$，当且仅当 $t \in \sigma_\theta(R)$ 且 $t \notin S$。又因为 $t \in \sigma_\theta(R)$ 蕴含 $\theta(t)$，条件中的"$t \notin S$"可以换成"$t \notin \sigma_\theta(S)$"而不改变任何东西，于是 $\sigma_\theta(R) - \sigma_\theta(S)$ 也成立。
:::

大多数规则对 SQL 的包语义（[[databases/sql#def-bag]]）同样成立，但对重复元组要小心：投影不去重，而包的 $\sigma_\theta(R - S)$ 需要用包差。含空值时，规则 6 对内连接成立，对外连接则*一般不*成立：把关于左连接补空侧的条件推到连接之下会改变结果（[[databases/sql#ex-on-where]]）。优化器对外连接和子查询另有一套限制更多的专门规则。

这些规则为经典**启发式**提供了依据：把选择尽可能往下推（它们能及早缩小输入），把投影下推以丢掉不需要的列，并把选择与笛卡尔积合并成连接以便使用连接算法。但连接的次序问题不是启发式能解决的，它需要代价。

::: example 改写一棵查询树 {#ex-rewrite}
查询"在 CS 课程中得到 A 的学生姓名"被解析为 $\pi_{\text{name}}\bigl(\sigma_{\theta}(\text{Student} \times \text{Enrolled} \times \text{Course})\bigr)$，其中 $\theta = (\text{S.sid} = \text{E.sid}) \wedge (\text{E.code} = \text{C.code}) \wedge (\text{E.grade} = \text{'A'}) \wedge (\text{C.dept} = \text{'CS'})$。用 [[#thm-equivalences]] 改写它。
::: solution
1. 把 $\theta$ 拆成四个合取项（规则 1）。
2. 把 $\text{grade} = \text{'A'}$ 下推到 Enrolled，把 $\text{dept} = \text{'CS'}$ 下推到 Course（规则 6）。
3. 把每个连接条件与它所属的笛卡尔积合并（规则 3）：$\text{S.sid} = \text{E.sid}$ 与 Student $\times$ Enrolled 合并，$\text{E.code} = \text{C.code}$ 与该结果再与 Course 的笛卡尔积合并（规则 5 和 6 允许我们重新组合）。
4. 下推投影（规则 7）：从 Student 只需 sid 与 name；从 Enrolled 只需 sid 与 code；从 Course 只需 code。

结果是

$$
\pi_{\text{name}}\Bigl(\bigl(\pi_{\text{sid},\text{name}}(\text{Student}) \bowtie \pi_{\text{sid},\text{code}}(\sigma_{\text{grade}=\text{'A'}}(\text{Enrolled}))\bigr) \bowtie \pi_{\text{code}}(\sigma_{\text{dept}=\text{'CS'}}(\text{Course}))\Bigr).
$$

在十行的实例上，原来的笛卡尔积有 $5 \cdot 10 \cdot 4 = 200$ 个元组；改写之后最大的中间结果只有 $4$ 个（那些 A 成绩）。改写后的树仍然只是一个*逻辑*计划：先做哪个连接、用哪种算法，都还没有决定。
:::
:::

## 估计基数

[[databases/query-processing]] 的每个代价公式都依赖于输入的大小，而除叶子外这些都是尚不存在的中间结果的大小。优化器根据存放在系统目录中的**统计信息**来估计它们：对每个关系 $R$，有元组数 $T(R)$ 和页数 $B(R)$；对每个属性 $A$，有不同取值的个数 $V(R, A)$、最小值与最大值，通常还有直方图和最常见取值的列表。统计信息由 `ANALYZE` 之类的命令收集，并随数据的变化而过时。

::: definition 选择率 {#def-selectivity}
条件 $\theta$ 在 $R$ 上的**选择率**为 $\mathrm{sel}(\theta) = \lvert \sigma_\theta(R) \rvert / T(R)$，即满足 $\theta$ 的元组所占的比例。$\sigma_\theta(R)$ 的估计大小为 $\mathrm{sel}(\theta)\cdot T(R)$。
:::

没有更多信息时，优化器假设**均匀性**（取值等频繁地在最小值与最大值之间均匀分布）与**独立性**（在不同属性上的条件统计独立）。于是

$$
\begin{aligned}
\mathrm{sel}(A = c) &= \frac{1}{V(R, A)}, &
\mathrm{sel}(A \le c) &= \frac{c - \min A}{\max A - \min A}, \\
\mathrm{sel}(\theta_1 \wedge \theta_2) &= \mathrm{sel}(\theta_1)\,\mathrm{sel}(\theta_2), &
\mathrm{sel}(\theta_1 \vee \theta_2) &= s_1 + s_2 - s_1 s_2, \qquad \mathrm{sel}(\neg\theta) = 1 - \mathrm{sel}(\theta).
\end{aligned}
$$ {#eq-selectivity}

对连接还需要一个假设。

::: proposition 连接大小的估计 {#prop-join-estimate}
假设 $A$ 的取值在 $R$ 与 $S$ 中都均匀分布，且不同取值个数较少的那个关系的 $A$ 值集合包含在另一个的之中（**值集包含**）。则

$$
\lvert R \bowtie_{R.A = S.A} S \rvert = \frac{T(R)\,T(S)}{\max\bigl(V(R, A), V(S, A)\bigr)}.
$$ {#eq-join-estimate}
:::

::: proof
设 $V(R, A) \le V(S, A)$，于是 $R$ 的每个 $A$ 值都出现在 $S$ 中。由均匀性，$S$ 中出现的每个 $A$ 值出现在 $T(S)/V(S, A)$ 个 $S$ 的元组里。$R$ 的每个元组的取值都出现在 $S$ 中，所以它能与 $T(S)/V(S, A)$ 个元组连接，连接结果共有 $T(R)\,T(S)/V(S, A)$ 个元组。另一种情形对称，两种情形下分母都是较大的那个不同取值个数。
:::

对外码连接——$R.A$ 引用 $S$ 的码 $S.A$——有 $V(S, A) = T(S) \ge V(R, A)$，公式给出 $T(R)$，这是精确的（[[databases/relational-model#prop-join-size]]）。多个关系连接的大小估计，按独立性就是所有连接条件与选择条件的选择率相乘：对关系 $R_1, \dots, R_k$ 与条件 $\theta_1, \dots, \theta_m$，

$$
\lvert R_1 \bowtie \dots \bowtie R_k \rvert \approx T(R_1) \cdots T(R_k) \cdot \mathrm{sel}(\theta_1) \cdots \mathrm{sel}(\theta_m),
$$

它与连接的次序无关——随连接次序改变的只是*中间*结果的大小。

::: example 估计一个三路连接 {#ex-estimate}
设 $T(E) = 100\,000$，$V(E, \text{grade}) = 5$，$T(S) = 40\,000$，$T(C) = 500$，$V(C, \text{dept}) = 20$，试估计按 sid 和 code 连接的 $\sigma_{\text{grade}=\text{'A'}}(E) \bowtie S \bowtie \sigma_{\text{dept}=\text{'CS'}}(C)$ 的大小，以及"先连 $E'$ 与 $S$"、"先连 $E'$ 与 $C'$"两种次序下的中间结果大小。
::: solution
选择：$E' = 100\,000/5 = 20\,000$ 条选课记录，$C' = 500/20 = 25$ 门课。连接选择率：sid 是 $S$ 的码，故为 $1/\max(V(E, \text{sid}), V(S, \text{sid})) = 1/40\,000$；对 code 则为 $1/500$。最终估计：

$$
20\,000 \cdot 40\,000 \cdot 25 \cdot \frac{1}{40\,000} \cdot \frac{1}{500} = 1000.
$$

次序 1：$E' \bowtie S$ 有 $20\,000 \cdot 40\,000/40\,000 = 20\,000$ 个元组（外码连接保留每条选课记录），再连接 $C'$ 得到 $1000$。次序 2：$E' \bowtie C'$ 有 $20\,000 \cdot 25/500 = 1000$ 个元组，再连接 $S$ 仍保留 $1000$ 个。最终大小相同；中间结果却是 $20\,000$ 与 $1000$ 之别，所以第二种次序做的功更少。注意这里隐含假设了 grade 与 dept 相互独立：若 CS 课程给出 A 的比例高于平均，真实结果会更大。
:::
:::

### 直方图

均匀性常常不成立：少数客户下了大部分订单，多数工单早已结案。**直方图**把一个属性的取值范围划分成若干桶，记录每个桶中的元组数。**等宽**直方图的桶宽度相同；**等深**（等高）直方图的桶容纳同样多的元组，于是频繁的取值落进窄桶，估计更为精确。桶内一律假设均匀。

::: example 用直方图估计范围 {#ex-histogram}
某关系存有 $1000$ 个介于 $0$ 与 $100$ 之间的考试成绩，用一个等宽直方图概括，桶 $[0, 20)$、$[20, 40)$、$[40, 60)$、$[60, 80)$、$[80, 100]$ 的计数分别为 $50$、$150$、$400$、$300$、$100$。试用与不用直方图分别估计成绩 $\ge 70$ 的个数。再设 $V(\text{year}) = 4$，估计 $\lvert \sigma_{\text{mark} \ge 70 \,\wedge\, \text{year} = 2}\rvert$。
::: solution
用直方图：$[70, 80)$ 是桶 $[60, 80)$ 的一半，贡献 $300/2 = 150$；桶 $[80, 100]$ 贡献 $100$。估计为 $250$，选择率 $0.25$。

不用直方图：在 $[0, 100]$ 上假设均匀，$\mathrm{sel}(\text{mark} \ge 70) = (100 - 70)/100 = 0.3$，估计 $300$。

加上 year：$\mathrm{sel}(\text{year} = 2) = 1/4$，按独立性估计为 $1000 \cdot 0.25 \cdot 0.25 = 62.5$。事实上若二年级学生的成绩系统性地偏高，真实数目可能是它的两倍：独立性是假设，不是事实。
:::
:::

::: quiz
$R$ 有 $T(R) = 10\,000$、$V(R, A) = 50$、$V(R, B) = 200$。在均匀性与独立性假设下，$\sigma_{A = 3 \,\wedge\, B = 7}(R)$ 的估计大小是多少？
- [ ] $250$
- [ ] $50$
- [x] $1$
- [ ] $0.0001$
::: solution
$\mathrm{sel} = \frac{1}{50}\cdot\frac{1}{200} = \frac{1}{10\,000}$，故估计为 $10\,000/10\,000 = 1$ 个元组。第四个选项是选择率而不是大小。若 $A$ 与 $B$ 相关（比如 $B$ 决定 $A$），真实大小是 $10\,000/200 = 50$，是估计的五十倍。
:::
:::

::: warning 独立性与误差传播
独立性假设是优化中最薄弱的一环。真实世界的列彼此相关——城市与邮编、汽车品牌与型号、下单日期与发货日期——对相关的条件把选择率相乘，可能把结果低估几个数量级。误差还会**沿连接累积**：若一个计划中五个估计各偏差 $3$ 倍，最终估计就可能偏差 $3^5 = 243$ 倍；Ioannidis 与 Christodoulakis 在 1991 年证明，误差会随连接个数指数增长。低估会让后患无穷嵌套循环计划和索引计划显得便宜。系统靠多列统计信息（PostgreSQL 的 `CREATE STATISTICS`）、采样、以及观测大小与估计不符时重新规划的自适应执行来缓解问题；但没有任何估计能对每条查询都可靠，计划永远是一场赌注。
:::

### SQLite 中的一个错误估计

SQLite 的统计信息由 `ANALYZE` 收集，存进 `sqlite_stat1` 表，为每个索引记录行数以及*平均*每个不同键对应的行数。（有一个编译选项 `SQLITE_ENABLE_STAT4` 会增加键分布的样本；本书所用的标准构建——随 Python 3.14 发布的 SQLite 3.46.1——没有它。）考虑 $200\,000$ 张支持工单，其中约 $1\%$ 处于 open 状态，status 列与 customer 列上各建有索引：

```python
import sqlite3, random
random.seed(5)
con = sqlite3.connect("sk.db")
con.executescript("""
CREATE TABLE Ticket (id INTEGER PRIMARY KEY, status TEXT, customer INTEGER, opened INTEGER);
CREATE INDEX ticket_status ON Ticket(status);
CREATE INDEX ticket_customer ON Ticket(customer);""")
con.executemany("INSERT INTO Ticket VALUES (?,?,?,?)",
    [(i, "open" if random.random() < 0.01 else "closed", random.randrange(5000), i)
     for i in range(200_000)])
con.commit()
```

其中有 $1945$ 张 open 工单，客户号 $0$ 到 $2500$ 的工单共 $100\,108$ 张。对查询 `SELECT * FROM Ticket WHERE status = 'open' AND customer BETWEEN 0 AND 2500`，status 索引显然是正确的访问路径。`ANALYZE` 之前，SQLite 正是这样选的；`ANALYZE` 之后它改了主意：

```console
$ sqlite3 sk.db "EXPLAIN QUERY PLAN SELECT * FROM Ticket WHERE status = 'open' AND customer BETWEEN 0 AND 2500"
QUERY PLAN
`--SEARCH Ticket USING INDEX ticket_status (status=?)
$ sqlite3 sk.db "ANALYZE; SELECT * FROM sqlite_stat1;"
Ticket|ticket_customer|200000 40
Ticket|ticket_status|200000 100000
$ sqlite3 sk.db "EXPLAIN QUERY PLAN SELECT * FROM Ticket WHERE status = 'open' AND customer BETWEEN 0 AND 2500"
QUERY PLAN
`--SEARCH Ticket USING INDEX ticket_customer (customer>? AND customer<?)
```

统计信息说一个 status 取值*平均*匹配 $100\,000$ 行——的确如此，因为总共只有两个取值——于是 `status = 'open'` 看起来像是要取半张表，而 customer 上的范围看起来更好。在本机上对三个变体计时（一项观测，$20$ 次的平均）：

```console
$ python3 timing.py
planner choice                963 rows   126.3 ms
INDEXED BY ticket_status      963 rows     3.0 ms
INDEXED BY ticket_customer    963 rows   133.8 ms
```

依统计信息选出的计划比不用统计信息选出的计划慢了大约四十倍。解决办法不是少做统计，而是做关于*偏斜*的更好的统计——最常见取值列表与直方图，PostgreSQL 默认就保留它们，SQLite 则要靠 STAT4。

## 选择连接次序

选择都下推之后，剩下的重大决策就是连接的次序。可能性的数目非常庞大。

::: theorem 连接次序的数目 {#thm-join-orders}
$n$ 个关系的**左深**连接树有 $n!$ 棵（每个连接的右输入都是一个基本关系），全部连接树共有 $\dfrac{(2n-2)!}{(n-1)!}$ 棵，其中 $R \bowtie S$ 与 $S \bowtie R$ 算作两棵。
:::

::: proof
左深树由关系的连接次序——一个排列——唯一确定：$n!$。一般的连接树是一棵以关系为叶标签的完整二叉树。带 $n$ 个叶的完整二叉树的形状数（区分左右孩子）是 Catalan 数 $C_{n-1} = \frac{1}{n}\binom{2n-2}{n-1}$，因为这样的树是一个根，配一个 $k$ 个叶的左子树和一个 $n - k$ 个叶的右子树，恰好给出 Catalan 递推。叶可以用 $n!$ 种方式贴标签，每种都给出不同的树，故总数为

$$
n! \cdot \frac{1}{n}\binom{2n-2}{n-1} = (n-1)!\,\frac{(2n-2)!}{(n-1)!\,(n-1)!} = \frac{(2n-2)!}{(n-1)!}.
$$
:::

| $n$ | $2$ | $4$ | $6$ | $8$ | $10$ |
|---|---|---|---|---|---|
| 左深树 $n!$ | $2$ | $24$ | $720$ | $40\,320$ | $3\,628\,800$ |
| 全部树 $(2n-2)!/(n-1)!$ | $2$ | $120$ | $30\,240$ | $17\,297\,280$ | $17\,643\,225\,600$ |
| 子集 $2^n$ | $4$ | $16$ | $64$ | $256$ | $1024$ |

超过寥寥几个关系，穷举所有树就毫无希望。System R 的洞见在于：根本不必。一组关系的最佳计划可以由它各子集的最佳计划拼成——问题具有最优子结构，于是**动态规划**（[[algorithms/dynamic-programming]]）适用，表中每个*子集*一项，而不是一棵树一项。

::: widget plot
f: log(gamma(2*x - 1)/gamma(x))/log(10); log(gamma(x + 1))/log(10); x*log(2)/log(10)
x: 2, 12
y: 0, 15
labels: \log_{10}\text{(全部连接树)}; \log_{10} n!\ \text{(左深)}; \log_{10} 2^n\ \text{(子集数：动态规划的状态数)}
points: 4,2.0792; 10,10.2466
caption: 对数尺度下搜索空间的大小（纵轴是位数）。$10$ 个关系的全部连接树约 $1.8 \times 10^{10}$ 棵（上方的点），左深树 $3.6\times10^6$ 棵；动态规划只需每个子集一项，$10$ 个关系共 $2^{10} = 1024$ 项，每项至多按 $n$ 种方式考察。把鼠标移到 $n = 12$ 处比较：穷举全部树要考察超过 $10^{13}$ 棵。
:::

### System R 算法

为了让算术一目了然，我们采用一个简单的代价模型：计划的代价是 $C_{\text{out}}$，即**所有中间及最终连接结果大小之和**。这就是产生它们的功，它抓住了关键事实——中间结果小的计划便宜；真正的优化器改用 [[databases/query-processing]] 的 I/O 与 CPU 公式，算法本身不变。

::: algorithm 左深连接次序的动态规划 {#alg-selinger}
输入：关系 $R_1, \dots, R_n$（选择下推之后）、它们的估计大小、以及各连接条件的选择率。输出：一个代价最小的左深连接计划。
1. 对每个 $i$：$\mathit{best}[\set{R_i}] \gets$ $R_i$ 的最便宜访问路径（扫描或索引），在 $C_{\text{out}}$ 模型下代价为 $0$。
2. 对 $k = 2, \dots, n$：对每个含 $k$ 个关系的子集 $Q$ 以及每个满足"$R$ 与 $Q - \set R$ 之间有连接条件相连"的 $R \in Q$：令 $c = \mathit{cost}(\mathit{best}[Q - \set R]) + \lvert \bowtie Q \rvert$；若 $c$ 是 $Q$ 迄今遇到的最小值，则置 $\mathit{best}[Q] \gets \mathit{best}[Q - \set R] \bowtie R$。
3. 返回 $\mathit{best}[\set{R_1, \dots, R_n}]$。
:::

::: theorem 动态规划的最优性 {#thm-selinger}
若计划 $P \bowtie R$ 的代价形如 $\mathit{cost}(P) + f(Q)$，其中 $f$ 只依赖于所连接关系的集合 $Q$（$C_{\text{out}}$ 正是如此），则 [[#alg-selinger]] 去掉连接性检验后返回代价最小的左深计划。它考察 $O(n\,2^n)$ 个候选连接。
:::

::: proof
对 $\lvert Q \rvert$ 归纳证明 $\mathit{best}[Q]$ 是 $Q$ 的最便宜左深计划。单个关系由第 1 步成立。设 $\lvert Q\rvert = k$，$Q$ 的任一左深计划都形如 $P \bowtie R$，其中 $R \in Q$，$P$ 是 $Q - \set R$ 的左深计划，代价为 $\mathit{cost}(P) + f(Q)$。把 $P$ 换成 $\mathit{best}[Q - \set R]$——由归纳假设它不会更贵——得到一个不会更贵的计划。算法对每个 $R \in Q$ 都考察 $\mathit{best}[Q - \set R] \bowtie R$ 并保留最便宜的，所以它的选择不比 $Q$ 的任何一个左深计划贵。子集共 $2^n$ 个，每个至多 $n$ 种 $R$ 的选法：$O(n 2^n)$ 个候选，有了大小估计后每个只需常时间定价。
:::

假设条件很要紧。用真实的代价公式时，把一个子计划与 $R$ 连接的代价不只取决于关系集合：若输入已按连接属性排好序，归并连接就更便宜，而为 $Q - \set R$ 选出不是最便宜的那个计划，也可能以有用的次序输出结果。因此 System R 对每个子集保留：按每个**有趣次序**——后续连接、`GROUP BY` 或 `ORDER BY` 要用到的属性上的次序——最便宜的计划，外加总体最便宜的计划。第 2 步中的连接性检验是**避免笛卡尔积**这条启发式；它缩小搜索空间，通常不丢最佳计划，但并不总是（[[#ex-dp]]）。

::: example 优化一个四路连接 {#ex-dp}
在 $C_{\text{out}}$ 模型下，求 Student $S$（$40\,000$ 个元组）、Enrolled $E$（$100\,000$）、Course $C$（$500$）与 $D$（从 $20$ 个系中选出图灵（Turing）楼那一个系的选择）四者连接的最佳左深次序，连接条件为 $S.\text{sid} = E.\text{sid}$、$E.\text{code} = C.\text{code}$ 与 $C.\text{dept} = D.\text{dept}$（全是外码对码）。
::: solution
由 [[#prop-join-estimate]]，选择率为：$S$–$E$ 是 $1/40\,000$，$E$–$C$ 是 $1/500$，$C$–$D$ 是 $1/20$。各连通子集连接的大小估计：

| 子集 | 估计 |
|---|---|
| $SE$ | $40\,000 \cdot 100\,000 / 40\,000 = 100\,000$ |
| $EC$ | $100\,000 \cdot 500/500 = 100\,000$ |
| $CD$ | $500 \cdot 1 / 20 = 25$ |
| $SEC$ | $100\,000$ |
| $ECD$ | $100\,000 \cdot 500 \cdot 1 / (500 \cdot 20) = 5000$ |
| $SECD$ | $5000$ |

动态规划：$\mathit{best}[SE] = 100\,000$，$\mathit{best}[EC] = 100\,000$，$\mathit{best}[CD] = 25$。对 $ECD$：把 $EC$ 扩展 $D$（$100\,000 + 5000$），或把 $CD$ 扩展 $E$（$25 + 5000$）；最佳为 $5025$。对 $SEC$：$SE$ 扩展 $C$ 或 $EC$ 扩展 $S$，都是 $200\,000$。对 $SECD$：$ECD$ 扩展 $S$（$5025 + 5000 = 10\,025$），或 $SEC$ 扩展 $D$（$200\,000 + 5000$）；最佳为 $10\,025$，即计划 $((C \bowtie D) \bowtie E) \bowtie S$。

```python
from itertools import combinations

card = {"S": 40_000, "E": 100_000, "C": 500, "D": 1}         # D 为选择之后的结果
sel = {frozenset("SE"): 1 / 40_000, frozenset("EC"): 1 / 500, frozenset("CD"): 1 / 20}

def size(rels):                                  # 在独立性假设下估计
    n = 1.0
    for r in rels:
        n *= card[r]
    for pair, s in sel.items():
        if pair <= rels:
            n *= s
    return n

def connected(rels, r):
    return any(frozenset((r, q)) in sel for q in rels)

def best_left_deep(names):
    best = {frozenset([r]): (0.0, r) for r in names}           # 代价 C_out，计划
    for k in range(2, len(names) + 1):
        for subset in map(frozenset, combinations(names, k)):
            for r in subset:                                     # r 最后连接
                rest = subset - {r}
                if rest in best and connected(rest, r):          # 不产生笛卡尔积
                    cost = best[rest][0] + size(subset)
                    if subset not in best or cost < best[subset][0]:
                        best[subset] = (cost, f"({best[rest][1]} ⋈ {r})")
    return best[frozenset(names)]

print(best_left_deep("SECD"))
```

```console
$ python3 dp.py
(10025.0, '(((C ⋈ D) ⋈ E) ⋈ S)')
```

穷举全部 $24$ 种次序证实了这一点：最佳代价 $10\,025$（次序 $D, C, E, S$ 亦可达到）；不含笛卡尔积的次序中最坏的代价 $205\,000$（从 $S \bowtie E$ 开始，系过滤起效之前先生成了全部 $100\,000$ 条选课记录）；允许笛卡尔积则最坏为 $21\,005\,000$（从 $S \times C$ 开始，$2 \times 10^7$ 个元组）。这里有一次笛卡尔积人畜无害：因为 $D$ 只有一个元组，$S \times D$ 不过 $40\,000$ 个元组，次序 $S, D, E, C$ 代价 $145\,000$——比好几个无笛卡尔积的次序都好。避免笛卡尔积是启发式，不是定理。
:::
:::

查询的连接图——关系作顶点、连接条件作边——指出了哪些次序可以避免笛卡尔积。对超大的查询，比动态规划便宜得多的替代办法是**贪心**：从最小的关系出发，反复连接那个使结果最小的邻点。

::: widget graph
nodes: S@0,1; E@1,1; C@2,1; D@3,1; L@2,0; R@1,0
edges: S-E:100000; E-C:100000; C-D:25; C-L:500; L-R:200; E-R:100000
algorithm: prim
start: D
caption: 一个连接图，边权为两关系连接结果的估计大小（这里加进教师表 L 与机房表 R）。从 D 出发的普里姆算法总是取离开当前集合的最便宜的边来生长一棵树——这就是最简形式的贪心连接定序启发式：先 D，再 C（大小 $25$），再 L，再 R，把与 E、S 的大连接留到最后。贪心定序很快，但会被骗，因为一次连接的代价取决于迄今连上的一切，而不只是那条边；动态规划则把这一点考虑在内。
:::

### 超越左深计划

左深计划适合流水线化：每个连接的右输入是一个基本关系（对索引嵌套循环它可以是索引，对哈希连接它是构造侧），中间结果沿管道向上流动而无需存储。当两个高选择率的连接彼此独立时，**灌木**（bushy）计划，如 $(R \bowtie S) \bowtie (T \bowtie U)$，可能便宜得多；对不相交子集的对做动态规划，可在 $O(3^n)$ 时间内找到最优者。查询超过大约 $10$–$15$ 个关系时，优化器转向启发式——贪心、随机或遗传搜索（PostgreSQL 自版本 17 起，从 $12$ 个关系开始默认使用遗传优化器）。

优化器还在更高的层面改写查询。关联的 `EXISTS` 子查询（[[databases/sql]]）变成**半连接**，`NOT EXISTS` 变成**反连接**，于是它们可以用任何连接算法实现，而不必对每一行重新执行一次子查询。视图会被并入使用它的查询。约束能帮上忙：与一张被外码引用、其列别无使用的表所做的连接可以整个删掉，因为由 [[databases/relational-model#prop-join-size]]，它既不增行也不删行。

::: history
System R 优化器由 Patricia Selinger、Morton Astrahan、Donald Chamberlin、Raymond Lorie 与 Thomas Price 在《关系数据库管理系统中的访问路径选择》（"Access path selection in a relational database management system"，SIGMOD 1979）一文中阐述，该文提出了基于目录统计信息、选择率公式、左深计划上的动态规划与有趣次序的基于代价的优化，至今仍是本领域最具影响力的论文之一。Ingres 走了另一条路，把查询分解为单变量的片段（Wong 与 Youssefi，1976）。等深直方图由 Piatetsky-Shapiro 与 Connell 于 1984 年提出；Ioannidis 与 Christodoulakis 于 1991 年分析了误差传播。Goetz Graefe 的 Volcano（1993）与 Cascades（1995）框架引入了基于规则的、可扩展的优化器，为 Microsoft SQL Server 等系统采用。Viktor Leis 等人的《查询优化器究竟有多好？》（"How good are query optimizers, really?"，VLDB 2015）在贴近实际的基准上表明，决定计划质量的主要因素是基数估计误差，而不是代价模型或搜索算法。
:::

## 后续内容

优化器把整门课程串成一体：它读 SQL（[[databases/sql]]），应用代数的定律（[[databases/relational-model]]），使用设计中定下的码与外码（[[databases/normalisation]]），在 [[databases/storage-indexing]] 的访问路径与 [[databases/query-processing]] 的算法之间做选择。分布式查询优化器还要加上数据在机器间搬运的代价（[[distributed-systems]]），而学习型基数估计器与代价模型是它与机器学习交汇处的一个活跃研究方向。动态规划是 [[algorithms/dynamic-programming]] 的经典实例，连接树的计数则用到[数学图谱：生成函数](/learn/maths/lesson.php?c=discrete&l=generating-functions)中的 Catalan 数。

::: summary
- 优化器需要**搜索空间**（由等价规则生成的计划）、喂以**基数估计**的**代价模型**、以及**搜索算法**。
- 经过证明的**等价式**——选择的叠加与下推、投影的下推、连接的交换律与结合律——为"选择下推、连接重排"提供依据；外连接需要更严格的规则。
- 选择率估计假设**均匀性**与**独立性**：等值为 $1/V(R,A)$，合取取乘积；在 $A$ 上的连接大约有 $T(R)T(S)/\max(V(R,A),V(S,A))$ 个元组。
- **直方图**与最常见取值列表刻画偏斜；没有它们，优化器可能选出一个慢上好几倍的计划，SQLite 在偏斜数据上做 `ANALYZE` 之后正是如此。
- 左深树有 $n!$ 棵，连接树总共 $(2n-2)!/(n-1)!$ 棵；**System R 的动态规划**以 $O(n 2^n)$ 步找到最优左深计划，每个子集、每个有趣次序各保留一个最佳计划。
- 避免笛卡尔积与贪心定序都是启发式：通常不错，偶尔失手。
:::

## 习题

::: exercise 等值选择率 {level=1 check="200"}
$R$ 有 $T(R) = 50\,000$ 个元组，$V(R, \text{city}) = 250$。在均匀性假设下估计 $\lvert\sigma_{\text{city} = \text{'Leeds'}}(R)\rvert$。（输入元组数。）
::: solution
$\mathrm{sel} = 1/250$，故估计为 $50\,000/250 = 200$ 个元组。若 Leeds 是数据中最大的城市之一，真实数目可能大得多——这正是保留最常见取值统计信息的理由。
:::
:::

::: exercise 一个连接估计 {level=1 check="30000"}
$T(R) = 3000$，$T(S) = 20\,000$，$V(R, A) = 100$，$V(S, A) = 2000$。估计 $\lvert R \bowtie_{R.A = S.A} S\rvert$。（输入元组数。）
::: solution
由 [[#eq-join-estimate]]，$3000 \cdot 20\,000 / \max(100, 2000) = 6 \times 10^7 / 2000 = 30\,000$。$R$ 的每个元组平均与 $S$ 的 $20\,000/2000 = 10$ 个元组匹配。
:::
:::

::: exercise 连接树的计数 {level=1 check="1680"}
$5$ 个关系共有多少棵连接树（左深与否不限，孩子有序）？其中左深的有多少？（输入总数。）
::: solution
总共 $(2 \cdot 5 - 2)!/(5 - 1)! = 8!/4! = 40\,320/24 = 1680$ 棵，其中 $5! = 120$ 棵是左深的。（[[#thm-join-orders]]；Catalan 数 $C_4 = 14$ 乘以 $5! = 120$ 也得 $1680$。）
:::
:::

::: exercise 一个析取与一个否定 {level=2}
设 $T(R) = 10\,000$，$V(R, A) = 20$，且 $A$ 在 $\set{1, \ldots, 20}$ 上均匀分布，试估计 $\sigma_{A = 3 \vee A = 5}(R)$、$\sigma_{A \ne 3}(R)$ 与 $\sigma_{A \le 5}(R)$ 的大小。为什么对第一个不能用 $\vee$ 的独立性公式？
::: solution
条件 $A = 3$ 与 $A = 5$ 互斥而非独立：正确的选择率是 $\frac{1}{20} + \frac{1}{20} = \frac{1}{10}$，估计 $1000$。公式 $s_1 + s_2 - s_1 s_2 = 0.0975$（估计 $975$）减去了一个不可能存在的重叠。$\sigma_{A \ne 3}$：$1 - \frac1{20}$，估计 $9500$。$\sigma_{A \le 5}$：二十个取值中占五个，$2500$（用最小值 $1$、最大值 $20$ 的插值公式得 $(5 - 1)/(20 - 1) \approx 0.21$，估计 $2105$——对整数值来说，数取值个数比插值更准）。
:::
:::

::: exercise 把选择穿过左连接下推 {level=2}
给出一个小实例，说明 $\sigma_{S.b = 1}(R \mathbin{\bowtie_{\mathrm{L}}} S) \ne R \mathbin{\bowtie_{\mathrm{L}}} \sigma_{S.b = 1}(S)$，其中 $\bowtie_{\mathrm{L}}$ 表示按 $R.a = S.a$ 的左外连接（SQL 的 `R LEFT JOIN S ON R.a = S.a`）。关于哪一侧的选择总可以下推进左连接？
::: solution
取 $R = \set{(a{=}1)}$、$S = \set{(a{=}1, b{=}2)}$。则 $R \bowtie_{\mathrm{L}} S = \set{(1, 2)}$，再作选择 $b = 1$ 便什么都不剩。但 $\sigma_{b=1}(S) = \emptyset$，而 $R \bowtie_{\mathrm{L}} \emptyset = \set{(1, \text{null})}$：一行。关于*保留侧* $R$ 的属性做的选择总可以下推：若 $\theta$ 只提到 $R$，则 $\sigma_\theta(R \bowtie_{\mathrm{L}} S) = \sigma_\theta(R) \bowtie_{\mathrm{L}} S$，因为 $R$ 的每个元组在输出中要么带着自己的原值出现（匹配或补空），要么根本不出现，而 $\theta$ 只取决于这些值。
:::
:::

::: exercise 直方图估计 {level=2 check="250"}
对 $1100$ 位顾客的年龄做等深直方图，共 $11$ 个桶、每桶 $100$ 位顾客，边界为 $18, 22, 25, 28, 31, 35, 40, 46, 54, 60, 70, 95$。把年龄当作连续量、桶内均匀，估计年龄在 $[35, 50]$ 内的顾客数。（输入你的估计。）
::: solution
该范围完整覆盖桶 $[35, 40)$（$100$ 位顾客）与桶 $[40, 46)$（$100$ 位），并覆盖桶 $[46, 54)$ 的一半，因为 $(50 - 46)/(54 - 46) = 1/2$（$50$ 位）。估计为 $100 + 100 + 50 = 250$。若在整个范围 $[18, 95]$ 上假设均匀，得 $1100 \cdot 15/77 \approx 214$；直方图知道这里的中年人居比两端更常见。
:::
:::

::: exercise 有趣次序 {level=2}
举例说明 [[#alg-selinger]] 在使用现实代价时必须为关系的每个子集保留不止一个计划，并说明 System R 保留的是什么。
::: solution
设对 $\set{R, S}$，最便宜的计划是代价 $1000$ 的哈希连接，输出无序；归并连接代价 $1200$，但输出按 $S.b$ 有序。若下一步按 $S.b$ 与 $T$ 连接（$T$ 借聚簇索引已按 $b$ 有序），那么接在归并计划之后只需扫描已排序的输入，约 $300$；而接在哈希计划之后必须先给中间结果排序，约 $+800$。于是 $1200 + 300 < 1000 + 800 + 300$：便宜的子计划反而导致昂贵的完整计划，违反 [[#thm-selinger]] 的假设。因此 System R 对每个子集保留：按每个有趣次序（每个后续连接、分组或 `ORDER BY` 能利用的属性上的次序）最便宜的计划，加上最便宜的无序计划，扩展时一并比较。
:::
:::

::: exercise 含笛卡尔积的最佳计划 {level=3}
在 [[#ex-dp]] 中，把对系的选择换成对学生的选择，留下 $40$ 人（$S'$ 的 $T = 40$），并让 $D$ 为全部 $20$ 个系。在 $C_{\text{out}}$ 模型下求最佳左深次序，并判断允许笛卡尔积是否可能有利。
::: solution
估计为：$S'E = 40 \cdot 100\,000/40\,000 = 100$，$EC = 100\,000$，$CD = 500 \cdot 20/20 = 500$；$S'EC = 100$，$ECD = 100\,000$；整个连接为 $100$；涉及笛卡尔积者 $S'D = 800$，$S'C = 20\,000$，$S'ED = 2000$，$S'CD = 20\,000$。左深计划要付出一个两关系结果、一个三关系结果和最终那 $100$ 个元组的代价。最小的两关系结果是 $S'E = 100$，最小的三关系结果是 $S'EC = 100$，所以没有计划能低于 $300$，而 $((S' \bowtie E) \bowtie C) \bowtie D$（或把 $E$ 放前面的同类计划）不用笛卡尔积就达到了 $300$。改过的程序也同意：`(300.0, '(((S ⋈ E) ⋈ C) ⋈ D)')`。这里笛卡尔积帮不上忙；[[#ex-dp]] 中同样不需要它们，只是那里与一元关系的笛卡尔积比某些无积次序更便宜。一般教训是：从查询中选择性最强的部分出发。
:::
:::

::: exercise 灌木计划的动态规划 {level=3}
修改 `best_left_deep` 以考虑灌木计划：对每个子集 $Q$，尝试把 $Q$ 分成两个有连接条件相连的非空不相交部分 $Q_1, Q_2$ 的一切分法，代价为 $\mathit{cost}(Q_1) + \mathit{cost}(Q_2) + \lvert \bowtie Q \rvert$。证明所考察的（子集，分法）对数是 $O(3^n)$，并在 [[#ex-dp]] 上运行。
::: solution
```python
def best_bushy(names):
    best = {frozenset([r]): (0.0, r) for r in names}
    for k in range(2, len(names) + 1):
        for Q in map(frozenset, combinations(names, k)):
            items = sorted(Q)
            for m in range(1, k):                        # 每一种分法 Q = Q1 + Q2
                for Q1 in map(frozenset, combinations(items, m)):
                    Q2 = Q - Q1
                    if Q1 in best and Q2 in best and any(frozenset((a, b)) in sel
                                                         for a in Q1 for b in Q2):
                        cost = best[Q1][0] + best[Q2][0] + size(Q)
                        if Q not in best or cost < best[Q][0]:
                            best[Q] = (cost, f"({best[Q1][1]} ⋈ {best[Q2][1]})")
    return best[frozenset(names)]

print(best_bushy("SECD"))
```

```console
$ python3 bushy.py
(10025.0, '(S ⋈ (E ⋈ (C ⋈ D)))')
```

对给定的一对 $(Q, Q_1)$，$\set{R_1, \dots, R_n}$ 的每个元素要么在 $Q_1$ 中，要么在 $Q - Q_1$ 中，要么在 $Q$ 之外：三种选择，故这样的对至多 $3^n$ 个，工作量为 $O(3^n)$（不计连接性检验的开销）。对这条链状查询，最佳灌木计划就是已经找到的左深计划，只是每个连接的两个操作数调了个个儿（分法枚举的次序不同，而交换律不改变 $C_{\text{out}}$）：像 $(S \bowtie E) \bowtie (C \bowtie D)$ 这样的灌木计划代价 $100\,000 + 25 + 5000$，更差，因为 $S \bowtie E$ 太大。灌木计划胜出的场合，是查询含有两个独立的高选择性部分。
:::
:::
