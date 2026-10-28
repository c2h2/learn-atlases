一所大学要保存学生、课程以及谁选修了哪门课的记录。20 世纪 60 年代，这样的数据存放在为特定程序设计的文件里：一个学生记录文件，每条记录内含一组可重复出现的课程条目，文件的格式围绕让选课注册程序能够迅速读取来安排。每提出一个新问题——哪些学生在上数学课？哪些课程没有人选？——就意味要写一个新程序，而这个程序必须准确知道文件是如何组织的；文件格式每改动一次，已有的程序就随之被破坏。更糟的是，同一事实常常存放在多个文件中，而这些副本会逐渐彼此脱节。

**关系模型**由埃德加·F. 科德（Edgar F. Codd）于 1970 年提出，用一个简单的想法取代了上述做法：把全部数据存成值的**表**，再用一种只说明*要什么*、不说*怎么找*的高级语言提问。系统自己决定如何回答，而物理布局可以改变，问题却不用改。本章精确定义关系，引入码与完整性约束，并建立**关系代数**：一组定义在表上的小型算子集，它是 SQL 的数学核心（[[databases/sql]]），也是数据库引擎制定并优化查询计划所用的语言（[[databases/query-optimisation]]）。

## 数据独立性

**数据库**是相关数据的集合；**数据库管理系统**（DBMS）是存储这些数据、回答查询、对其上的规则加以强制、并使它在崩溃与并发用户面前保持安全的软件。DBMS 的核心设计原则是分离*描述的层次*：

- **物理级**说明数据如何存储：文件、页、记录格式、索引（[[databases/storage-indexing]]）；
- **逻辑级**说明存储了哪些数据：有哪些表、各有哪些列、其上有哪些约束；
- **视图级**为每个应用提供它所需的那部分数据，必要时重新组织。

**物理数据独立性**指物理级可以改变——新建一个索引、换一种文件组织方式——而不必改动按逻辑级编写的程序。**逻辑数据独立性**指逻辑模式可以增长（增加一列、增加一张表）而不破坏没有提到该变化的视图。关系模型几乎完全做到了物理独立性，这是它最大的实际成就：无论一张表是内存中的几千字节，还是散布在许多块磁盘上的若干太字节，同一条 SQL 查询都能不加改动地运行。

## 关系、模式与实例

固定一个无穷的属性名集合（`sid`、`name`、`code` …），并为每个属性 $A$ 指定一个允许取值的集合 $\operatorname{dom}(A)$，称为它的**域**——整数、至多 40 个字符的字符串、日期等等。域是**原子的**：模型把每个值当作不可再分的整体（一个字符串，而不是一个课程列表）。这一要求称为**第一范式**。

::: definition 关系模式、元组与关系 {#def-relation}
**关系模式** $R(A_1, \dots, A_n)$ 是一个名字 $R$ 加上一个由互异属性组成的有限列表；$n$ 称为它的**目**（arity，又称**度**）。对该模式的一个**元组**给每个属性 $A_i$ 指派 $\operatorname{dom}(A_i)$ 中的一个值；把这个值记作 $t[A_i]$，并把 $t$ 限制在属性集 $X$ 上的结果记作 $t[X]$。对该模式的一个**关系**（或**关系实例**）是元组的一个*有限集合*。它的**基数** $\lvert r \rvert$ 是元组的个数。
:::

**数据库模式**是关系模式的集合，**数据库实例**为其中每个关系模式给出一个关系。模式是稳定的部分——它很少改变，且改变出于深思熟虑的设计——而实例则随每一次插入和删除而改变。本课程贯穿使用的实例如下：

**Student**

| sid | name | year |
|---|---|---|
| 1 | Ada | 2 |
| 2 | Bao | 1 |
| 3 | Chen | 3 |
| 4 | Dara | 2 |
| 5 | Eli | 1 |

**Course**

| code | title | dept | credits |
|---|---|---|---|
| CS101 | Programming | CS | 15 |
| CS202 | Databases | CS | 15 |
| MA101 | Calculus | MA | 15 |
| MA210 | Statistics | MA | 10 |

**Enrolled**

| sid | code | grade |
|---|---|---|
| 1 | CS101 | A |
| 1 | CS202 | B |
| 1 | MA101 | A |
| 2 | CS101 | C |
| 2 | MA210 | B |
| 3 | CS202 | A |
| 3 | MA101 | B |
| 3 | MA210 | A |
| 4 | CS101 | B |
| 4 | CS202 | B |

[[#def-relation]] 有三点推论值得一提，因为 SQL 逐条放松了它们：

1. **元组不重复。** 关系是一个集合，故同一行不能出现两次。（SQL 的表是*包*——多重集——除非有码禁止重复；见 [[databases/sql]]。）
2. **元组无序。** 上面的行只是为了打印才按某种顺序列出的，但 $\set{t_1, t_2} = \set{t_2, t_1}$。查询结果若要有某种顺序，必须显式地提出这一要求。
3. **属性具名。** 我们按名字而不是按位置来指称列，因此列的次序也无关紧要。（科德的原论文使用位置；今天通常采用具名的观点。）

模型中也没有元组之间*指针*的概念。Enrolled 是通过*取值* `sid` 来指称学生的，而不是通过某条记录的地址。这正是存储层能够自由搬移记录的原因。

## 码与完整性约束

并非任意一组元组都是合理的实例。两个学生不得共用一个 `sid`；一条选课记录不得提到一门不存在的课程。这类规则就是**完整性约束**：每个合法实例都必须满足的条件。它们是模式的一部分，只需声明一次，DBMS 会拒绝任何违反它们的更新。

::: definition 超码、候选码与主码 {#def-key}
若 $R$ 的一组属性 $K$ 使得 $R$ 的任一合法实例都不含满足 $t \ne u$ 且 $t[K] = u[K]$ 的两个不同元组，则称 $K$ 为**超码**。**候选码**是极小的超码：它的任何真子集都不是超码。**主码**是设计者选定的、用来标识元组的那个候选码；我们用下划线标出它的属性，如 Student($\underline{\text{sid}}$, name, year)。
:::

Enrolled 的码是 $\set{\text{sid}, \text{code}}$：一名学生对同一门课只选一次，但会选好几门课，一门课也有好几名学生选。`sid` 或 `code` 单独都不是码。注意*合法*一词：码是关于应用所允许的*一切*实例的陈述，而不是能从某一个实例上读出的事实。上面的实例中没有两个学生同名，但 `name` 不是码——大学明天就可能录取第二个 Ada。

::: proposition 每个关系模式都有候选码 {#prop-key-exists}
对属性集为 $U$ 的任意关系模式 $R$，集合 $U$ 本身就是一个超码，且候选码至少存在一个。
:::

::: proof
关系是一个集合，故两个不同元组至少在一个属性上不同，即 $t[U] \ne u[U]$；因此 $U$ 是超码。$U$ 的那些作为超码的子集只有有限多个（且至少有一个），取其中最小的一个。它的任何真子集都不是超码，因为它们还要小；所以它是极小的，是一个候选码。
:::

一个模式可以有多个候选码。若大学承诺同一系内的课程名称互不相同，则 Course 关系既可以由 `code` 标识，也可以由对 $\set{\text{dept}, \text{title}}$ 标识。在它们之间选哪一个作主码是设计决策；其余的在 SQL 中声明为 `UNIQUE`。

::: example 课表关系的候选码 {#ex-timetable-keys}
课表关系 Slot(code, day, hour, room, lecturer) 登记每周的上课安排。大学的规则是：(a) 一间教室在任一时刻至多容纳一个班；(b) 一名教师在任一时刻至多上一个班的课；(c) 一门课程每天至多上一次课。找出三个候选码，并论证每个都是极小的。
::: solution
- 由 (a)，$\set{\text{room}, \text{day}, \text{hour}}$ 是超码：同一教室同一时刻有两条不同的上课安排是不被允许的。它是极小的：$\set{\text{day}, \text{hour}}$ 不是超码（周一 10:00 有多间教室在用），$\set{\text{room}, \text{day}}$ 不是（一间教室会在多个时刻被用），$\set{\text{room}, \text{hour}}$ 也不是（它会在多天被用）。
- 由 (b)，$\set{\text{lecturer}, \text{day}, \text{hour}}$ 是候选码，极小性的论证相同。
- 由 (c)，$\set{\text{code}, \text{day}}$ 是超码。`code` 单独不是（一门课在多天上课），`day` 单独也不是。

每个极小性论证依据的都是规则*允许*出现的情形，而不是当前的实例。设计者会挑一个码作主码——也许选最短的 $\set{\text{code}, \text{day}}$——并把另外两个声明为 `UNIQUE`，让 DBMS 把三条规则全部强制落实。[[databases/normalisation]] 将展示如何由这样的规则（写成函数依赖的形式）系统地导出全部候选码。
:::
:::

::: definition 外码与参照完整性 {#def-foreign-key}
关系 $R$ 的一个属性列表 $F$ 称为**外码**，当它引用以 $K$ 为主码的关系 $S$（$F$ 与 $K$ 长度相同且各分量域相容），并且要求：在每个合法实例中，对每个元组 $t \in R$，都存在 $u \in S$ 使得 $t[F] = u[K]$。这一条件称为**参照完整性**。
:::

Enrolled.sid 引用 Student.sid，Enrolled.code 引用 Course.code。向 Enrolled 插入 $(9, \text{CS101}, \text{A})$ 会违反参照完整性，因为不存在学号为 $9$ 的学生。删除学生 $1$ 同样会违反它，留下三条指向虚空的选课记录。模式声明了此时应当怎么做：拒绝删除（`RESTRICT` 或 `NO ACTION`）、连同从属的选课记录一并删除（`CASCADE`），或把外码置为空值或默认值（`SET NULL`、`SET DEFAULT`）。另一些约束限制单个取值（`year` 介于 $1$ 与 $4$ 之间、`credits` 为正）——**域约束**——而**实体完整性**规则规定主码属性不得为空。

外码把每一个引用元组变成按取值指向恰好一个被引用元组的指针：它是从 Enrolled 的行到 Student 的行之间的一个*函数*。

::: widget mapping
domain: 1·CS101; 1·CS202; 1·MA101; 2·CS101; 2·MA210; 3·CS202; 3·MA101; 3·MA210; 4·CS101; 4·CS202
codomain: Ada; Bao; Chen; Dara; Eli
map: 1·CS101>Ada; 1·CS202>Ada; 1·MA101>Ada; 2·CS101>Bao; 2·MA210>Bao; 3·CS202>Chen; 3·MA101>Chen; 3·MA210>Chen; 4·CS101>Dara; 4·CS202>Dara
caption: 把外码 Enrolled.sid → Student.sid 看作从选课记录（以 sid·code 标注）到学生的函数。参照完整性说的正是：每条选课记录都有一条箭头指向一个真实存在的学生。这个函数既不是单射（Ada 有三条选课记录），也不是满射（Eli 一条也没有）。把 Bao 的两条箭头拖到 Eli 上：映射仍然不是满射，原因变成 Bao 没有了选课记录。无论你怎么编辑，每条选课记录始终恰好保留一条箭头——一条选课记录不能同时指向两个学生，因为 sid 是 Student 的码——而选课记录数不少于学生数时，这个映射才可能成为满射。
:::

## 关系代数

科德提议把查询写成对关系施加的表达式。**关系代数**是一组算子，每个算子作用一个或两个关系并产生一个关系，因而算子能够复合：一个算子的输出是下一个的输入。由于结果仍是关系，代数具有**封闭性**，每条查询都是一棵算子树——而这正是 DBMS 表示查询计划的形式。

::: definition 关系代数的基本算子 {#def-algebra}
设 $r$ 是属性集 $U$ 上的关系，$s$ 是 $V$ 上的关系。

- **选择** $\sigma_\theta(r) = \set{t \in r : \theta(t)}$，其中条件 $\theta$ 由比较 $A \mathbin{op} B$ 与 $A \mathbin{op} c$（$op \in \set{=, \ne, <, \le, >, \ge}$，$A, B \in U$，$c$ 为常量）经 $\wedge$、$\vee$、$\neg$ 构成。
- **投影** $\pi_X(r) = \set{t[X] : t \in r}$，其中 $X \subseteq U$。
- **重命名** $\rho_{B \leftarrow A}(r)$ 把属性 $A$ 改名为 $B$（$B$ 不在 $U$ 中）；$\rho_S(r)$ 重命名关系本身。
- **并** $r \cup s$ 与**差** $r - s$，仅当 $U = V$（两关系**并相容**）时有定义，分别按元组的集合并、集合差计算。
- **笛卡尔积** $r \times s$，当 $U \cap V = \emptyset$ 时有定义，是把每个 $t \in r$ 与每个 $u \in s$ 拼接后得到的 $U \cup V$ 上的元组集合。
:::

选择挑选行，投影挑选列，而积以一切可能的方式组合两个关系。有两个细节要紧。投影返回一个*集合*：若两个元组在 $X$ 上一致，结果中 $t[X]$ 只出现一次，所以 $\lvert \pi_X(r) \rvert \le \lvert r \rvert$，且严格小于完全可能。而 $\cup$、$-$、$\times$ 对属性名的要求正是重命名的用武之地：要计算 Enrolled 与它自身的笛卡尔积，必须先给一份副本的属性改名。

### 导出算子

若干常用算子是基本算子组合的缩写。

::: definition 连接、交与除法 {#def-derived}
- **交** $r \cap s = r - (r - s)$，其中 $r, s$ 并相容。
- **θ连接** $r \bowtie_\theta s = \sigma_\theta(r \times s)$，其中 $U \cap V = \emptyset$。当 $\theta$ 是若干等式的合取时，称为**等值连接**。
- **自然连接** $r \bowtie s$ 是 $U \cup V$ 上满足 $t[U] \in r$ 且 $t[V] \in s$ 的一切元组 $t$ 的集合：$r$ 与 $s$ 的元组当它们在全部公共属性 $U \cap V$ 上一致时被拼接在一起，且这些属性只出现一次。
- **半连接** $r \ltimes s = \pi_U(r \bowtie s)$：$r$ 中能与 $s$ 的至少一个元组连接的那些元组。
- **除法** $r \div s$，其中 $V \subseteq U$，是 $U - V$ 上满足 $q \times s \subseteq r$ 的最大关系 $q$：即 $U - V$ 上那些使得对*每个* $y \in s$ 都有 $(x, y) \in r$ 的元组 $x$。
:::

自然连接同样可以用基本算子表达：把 $s$ 的公共属性改名以消除冲突，做笛卡尔积，选出每一对改名后属性相等的元组，再把多余的副本投影掉。对以公共属性 `code` 进行的 Enrolled $\bowtie$ Course：

$$
\text{Enrolled} \bowtie \text{Course} = \pi_{\text{sid},\text{code},\text{grade},\text{title},\text{dept},\text{credits}}\Bigl(\sigma_{\text{code} = c}\bigl(\text{Enrolled} \times \rho_{c \leftarrow \text{code}}(\text{Course})\bigr)\Bigr).
$$ {#eq-join-basic}

有两个边缘情形值得记住：若 $U \cap V = \emptyset$，自然连接就是笛卡尔积；若 $U = V$，它就是交。

::: proposition 用基本算子表示除法 {#prop-division}
设 $r$ 在 $U$ 上、$s$ 在 $V \subseteq U$ 上，令 $W = U - V$，

$$
r \div s = \pi_W(r) - \pi_W\bigl((\pi_W(r) \times s) - r\bigr).
$$ {#eq-division}
:::

::: proof
设 $x$ 是 $W$ 上的一个元组。当 $s$ 非空时，$r \div s$ 的每个元组必属于 $\pi_W(r)$，故只需考虑 $x \in \pi_W(r)$。关系 $(\pi_W(r) \times s) - r$ 恰由满足 $x' \in \pi_W(r)$、$y \in s$ 且 $(x', y) \notin r$ 的对 $(x', y)$ 组成——即那些"缺失"的组合。于是 $x$ 属于它的投影 $\pi_W(\cdots)$ 当且仅当存在某个 $y \in s$ 使 $(x, y) \notin r$。作差之后，$x$ 属于右端当且仅当 $x \in \pi_W(r)$ 且对每个 $y \in s$ 都有 $(x, y) \in r$，这正是 $r \div s$ 限制在 $\pi_W(r)$ 中的定义。（若 $s = \emptyset$，条件"对每个 $y \in s$"对一切 $x$ 空真成立，公式返回 $\pi_W(r)$；"最大 $q$"的定义原则上允许 $W$ 上的所有元组，故按约定除法在 $\pi_W(r)$ 之内进行。）
:::

除法回答"所有"型的问题：哪些学生选修了*每一门* CS 课程？

::: example 计算一个除法 {#ex-division}
用 [[#eq-division]] 计算 $\pi_{\text{sid},\text{code}}(\text{Enrolled}) \div \pi_{\text{code}}(\sigma_{\text{dept} = \text{'CS'}}(\text{Course}))$。
::: solution
令 $r = \pi_{\text{sid},\text{code}}(\text{Enrolled})$（十个对），$s = \set{(\text{CS101}), (\text{CS202})}$，于是 $W = \set{\text{sid}}$。

1. $\pi_{\text{sid}}(r) = \set{1, 2, 3, 4}$。（学生 5 没有任何选课记录，因此不可能入选。）
2. $\pi_{\text{sid}}(r) \times s$ 有 $4 \cdot 2 = 8$ 个对：$(1,\text{CS101}), (1,\text{CS202}), (2,\text{CS101}), (2,\text{CS202}), (3,\text{CS101}), (3,\text{CS202}), (4,\text{CS101}), (4,\text{CS202})$。
3. 减去 $r$ 后剩下缺失的组合 $(2, \text{CS202})$ 与 $(3, \text{CS101})$。
4. 它们对 sid 的投影是 $\set{2, 3}$：这些学生至少缺一门 CS 课程。
5. $\set{1,2,3,4} - \set{2,3} = \set{1, 4}$。

Ada（1）与 Dara（4）选修了每一门 CS 课程。直接验证：Ada 选了 CS101 和 CS202，Dara 选了 CS101 和 CS202，Bao 缺 CS202，Chen 缺 CS101。
:::
:::

### 编写查询

代数中的一条查询就是一个表达式；写查询时，要从持有所需事实的那些关系出发，由内向外逐步构造。一个小的 Python 模型能让这些定义变得具体——一个关系就是一个模式加上一组元组：

```python
# 一个关系是一个对（模式, 元组集合）；模式是属性名组成的元组。
def select(r, pred):
    s, rows = r
    return s, {t for t in rows if pred(dict(zip(s, t)))}

def project(r, attrs):
    s, rows = r
    idx = [s.index(a) for a in attrs]
    return tuple(attrs), {tuple(t[i] for i in idx) for t in rows}   # 集合：重复元组自动消失

def natural_join(r1, r2):
    (s1, rows1), (s2, rows2) = r1, r2
    common = [a for a in s1 if a in s2]
    extra = [a for a in s2 if a not in s1]
    out = set()
    for t in rows1:
        d1 = dict(zip(s1, t))
        for u in rows2:
            d2 = dict(zip(s2, u))
            if all(d1[a] == d2[a] for a in common):        # 在共享属性上取值一致
                out.add(t + tuple(d2[a] for a in extra))
    return s1 + tuple(extra), out
```

按上录入 Enrolled 与 Course（分别有十个与四个元组）后，选修数学课的学生、以及至少有一个 A 成绩的学生分别为

```python
ma = select(Course, lambda t: t["dept"] == "MA")
print(sorted(project(natural_join(Enrolled, ma), ["sid"])[1]))
print(sorted(project(select(Enrolled, lambda t: t["grade"] == "A"), ["sid"])[1]))
```

```console
$ python3 ra.py
[(1,), (2,), (3,)]
[(1,), (3,)]
```

`natural_join` 中的嵌套循环需要 $\Theta(\lvert r_1 \rvert \cdot \lvert r_2 \rvert)$ 时间；[[databases/query-processing]] 将展示真实系统如何借助排序、散列和索引远快于此地完成连接。代数规定的是连接*是什么*，而不是如何计算它。

::: example 选修数学课的学生姓名 {#ex-ma-names}
写出至少选修一门 MA 课程的学生姓名的代数表达式，并逐步求值。
::: solution
这些事实分散在三个关系里：院系在 Course 中，选课在 Enrolled 中，姓名在 Student 中。把它们连接起来再投影：

$$
\pi_{\text{name}}\bigl(\text{Student} \bowtie \text{Enrolled} \bowtie \sigma_{\text{dept}=\text{'MA'}}(\text{Course})\bigr).
$$

1. $\sigma_{\text{dept}=\text{'MA'}}(\text{Course})$ = {MA101 Calculus, MA210 Statistics}。
2. 与 Enrolled 按 `code` 连接，保留选课记录 $(1,\text{MA101},\text{A})$、$(2,\text{MA210},\text{B})$、$(3,\text{MA101},\text{B})$、$(3,\text{MA210},\text{A})$——四个元组，并附上 title、dept 与 credits。
3. 与 Student 按 `sid` 连接，附上姓名：Ada、Bao、Chen、Chen。
4. 对 `name` 投影得到*集合* {Ada, Bao, Chen}：Chen 虽然选了两门 MA 课程，却只出现一次。

尽早选择（在连接之前先做第 1 步）与先连接、最后选择得到同样的答案，而且代价更小：中间结果更小。这类等价式正是查询优化的基础（[[databases/query-optimisation]]）。
:::
:::

::: example 没人选修的课程与一门不选的学生 {#ex-difference}
哪些学生没有选修任何课程？哪些学生既选了 CS101 又选了 MA101？
::: solution
"什么都不选"是一个差：全体学生的学号减去出现在 Enrolled 中的学号，

$$
\pi_{\text{sid}}(\text{Student}) - \pi_{\text{sid}}(\text{Enrolled}) = \set{1,2,3,4,5} - \set{1,2,3,4} = \set{5}.
$$

于是只有 Eli。要得到姓名，再连接回去：$\pi_{\text{name}}(\text{Student} \bowtie (\ldots))$ = {Eli}。常见的错误是写成 $\sigma_{\text{sid} \ne \ldots}$——选择每次只看一个元组，看不见某个学生在别处*没有*匹配的元组；"无"、"没有"、"只"这类问题需要差运算。

"既选 CS101 又选 MA101"是两个选择的交，*而不是*一个带 $\text{code} = \text{'CS101'} \wedge \text{code} = \text{'MA101'}$ 的选择——没有任何单个元组能满足后者：

$$
\pi_{\text{sid}}(\sigma_{\text{code}=\text{'CS101'}}(\text{Enrolled})) \cap \pi_{\text{sid}}(\sigma_{\text{code}=\text{'MA101'}}(\text{Enrolled})) = \set{1,2,4} \cap \set{1,3} = \set{1}.
$$

只有 Ada。等价地，把 Enrolled 与它自己的一份改名副本按 `sid` 连接，并要求一份副本的 code 为 CS101、另一份的为 MA101。
:::
:::

在并相容关系上做的集合运算，其表现与在元素集合上的运算完全一致，这正是韦恩图所显示的内容。

::: widget venn
sets: 2
labels: R; S
expr: R - S
caption: 两个并相容关系作为元组的集合。阴影区域是 $R - S$：$R$ 中不属于 $S$ 的元组。输入 `R | S`、`R & S` 与 `R - (R - S)`，可以看到并、交，以及为什么 $r \cap s = r - (r - s)$（[[#def-derived]]）。注意 $R - S$ 与 $S - R$ 是不同的区域：差与并、交不同，不满足交换律。
:::

::: quiz
关系 $r(A, B)$ 有 $6$ 个元组，且 $A$ 是 $r$ 的一个码。关于 $\lvert \pi_B(r) \rvert$ 与 $\lvert \pi_A(r) \rvert$ 你能说什么？
- [ ] 两者都恰为 $6$。
- [x] $\lvert\pi_A(r)\rvert = 6$，且 $1 \le \lvert\pi_B(r)\rvert \le 6$。
- [ ] $\lvert\pi_B(r)\rvert = 6$，且 $\lvert\pi_A(r)\rvert \le 6$。
- [ ] 两者都可以是 $0$ 到 $6$ 之间的任何数。
::: solution
因为 $A$ 是码，六个元组的 $A$ 值互不相同，所以对 $A$ 投影不会去掉任何重复。对非码属性 $B$ 投影可能把 $B$ 值相同的元组合并：若六个元组共用同一个 $B$ 值，$\pi_B(r)$ 就只有一个元组。它不可能为空，因为 $r$ 不为空。
:::
:::

## 代数作为一种语言：等价性与表达能力

若两个表达式在*每一个*数据库实例上都产生相同结果，则称它们**等价**，记 $E_1 \equiv E_2$。在单个实例上相等证明不了什么；等价性要从定义来证明。下面几条定律我们会反复使用：

- $\sigma_{\theta_1 \wedge \theta_2}(r) \equiv \sigma_{\theta_1}(\sigma_{\theta_2}(r))$，因此选择可交换次序、可层层叠加；
- 若 $\theta$ 只提到 $r$ 的属性，则 $\sigma_\theta(r \times s) \equiv \sigma_\theta(r) \times s$——把选择**下推**到连接之下；
- 对自然连接，$r \bowtie s \equiv s \bowtie r$ 且 $(r \bowtie s) \bowtie t \equiv r \bowtie (s \bowtie t)$——因而连接可以**重排**；
- $\pi_X(r \cup s) \equiv \pi_X(r) \cup \pi_X(s)$，但一般有 $\pi_X(r - s) \not\equiv \pi_X(r) - \pi_X(s)$（[[#ex-project-diff]]）。

[[databases/query-optimisation]] 会列出并证明完整的规则集。这里我们用代数来问一个不同的问题：它*不能*表达什么？

::: definition 单调查询 {#def-monotone}
若每当 $I \subseteq I'$——实例 $I$ 的每个关系都是实例 $I'$ 中对应关系的子集——都有 $Q(I) \subseteq Q(I')$，则称查询 $Q$（从数据库实例到关系的函数）是**单调**的。
:::

给单调查询的输入增加元组，只可能给它的输出增加元组。"选修数学课的学生"是单调的：一条新的选课记录可能带来一个新的答案，却绝不会取消任何一个。"一门课都不选的学生"则不然：Eli 一旦选上课，就从答案中被去掉了。

::: theorem 不含差的代数是单调的 {#thm-monotone}
一切由关系名和常量关系出发、只用 $\sigma$、$\pi$、$\rho$、$\times$、$\cup$、$\cap$ 与 $\bowtie$（不含 $-$ 与 $\div$）构造的表达式都定义一个单调查询。
:::

::: proof
对表达式 $E$ 作结构归纳。设 $I \subseteq I'$。

*基础情形。* 若 $E$ 是关系名 $R$，则由假设 $E(I) = R^I \subseteq R^{I'} = E(I')$。若 $E$ 是常量关系，则 $E(I) = E(I')$。

*归纳步骤。* 设 $E_1(I) \subseteq E_1(I')$ 且 $E_2(I) \subseteq E_2(I')$。

- $\sigma_\theta(E_1)$：$E_1(I)$ 中满足 $\theta$ 的元组也是 $E_1(I')$ 中满足 $\theta$ 的元组，因为 $\theta$ 只取决于元组本身。
- $\pi_X(E_1)$：若 $t[X]$ 来自 $t \in E_1(I)$，则 $t \in E_1(I')$，于是 $t[X] \in \pi_X(E_1(I'))$。重命名类似。
- $E_1 \times E_2$：拼接元组 $(t, u)$ 若满足 $t \in E_1(I)$、$u \in E_2(I)$，则 $t \in E_1(I')$ 且 $u \in E_2(I')$，故 $(t, u) \in E_1(I') \times E_2(I')$。
- $E_1 \cup E_2$ 与 $E_1 \cap E_2$：集合的并与交对每个参量都是单调的。
- $E_1 \bowtie E_2$：自然连接是"重命名的积的选择再投影"（[[#eq-join-basic]]），由上面的各种情形，其中每一步都保持包含关系。

每种情形下都有 $E(I) \subseteq E(I')$。
:::

::: corollary 差不可能由其他算子表达 {#cor-difference}
任何用 $\sigma, \pi, \rho, \times, \cup, \cap, \bowtie$ 构造的表达式都不等价于 $R - S$。
:::

::: proof
查询 $R - S$ 不是单调的：取 $I$ 满足 $R = \set{t}$、$S = \emptyset$，取 $I'$ 满足 $R = S = \set{t}$。则 $I \subseteq I'$，但 $(R - S)(I) = \set{t} \not\subseteq \emptyset = (R - S)(I')$。由 [[#thm-monotone]]，一切不含差的表达式都是单调的，所以没有哪个等于 $R - S$。
:::

因此差运算是真正不可缺少的：凡是涉及"非"、"无"、"只"或"全部"（除法）的问题都需要它。六个算子 $\sigma, \pi, \rho, \cup, -, \times$ 实际上是**独立**的——其中任何一个都不能由其余五个表达——而具有这六个算子之表达能力的表达式语言称为**关系完备**的，这是科德为查询语言定下的基准。

代数也有自己的极限。它无法计算关系的**传递闭包**：给定 Prereq(course, required)，不存在单个代数表达式能对每个实例都返回先修链上任意深度的全部对 (course, required)。每个表达式只能沿固定数目的连接走下去，而数据中的链可以任意长。（精确的陈述与证明归功于阿霍（Aho）与乌尔曼（Ullman），1979；这里不予证明。）SQL 正是出于这个原因在 1999 年加入了递归查询（[[databases/sql]]）。

::: warning 关系代数不是 SQL，关系也不是表
有三处差别常让人吃亏。其一，代数处理的是*集合*，所以 $\pi_{\text{name}}$ 会去掉重复，而 SQL 的 `SELECT name` 会保留重复，除非写 `SELECT DISTINCT`。其二，代数没有空值：每个元组在每个属性上都有值，而 SQL 的表可以含有 `NULL`，这会改变条件的逻辑（[[databases/sql]]）。其三，关系没有行序；查询结果在某台系统、某一天"恰好以有序的方式出来"不算数，除非查询写了 `ORDER BY`，结果才是有序的。把 SQL 当作集合代数来推理，会得出错误的行数，也会在含 `NOT IN` 的查询上得出错误的答案。
:::

::: proposition 自然连接的大小 {#prop-join-size}
设 $r$ 是 $U$ 上的关系、$s$ 是 $V$ 上的关系，公共属性为 $C = U \cap V$。
1. $0 \le \lvert r \bowtie s \rvert \le \lvert r \rvert \cdot \lvert s \rvert$。
2. 若 $C$ 包含 $s$ 的一个码，则 $\lvert r \bowtie s \rvert \le \lvert r \rvert$。
3. 若进一步 $C$ 还是 $r$ 引用 $s$ 的外码，则 $\lvert r \bowtie s \rvert = \lvert r \rvert$。
:::

::: proof
(1) 每个输出元组 $t$ 由对 $(t[U], t[V]) \in r \times s$ 唯一确定，所以输出至多有 $\lvert r \rvert\,\lvert s \rvert$ 个；没有匹配的对就一个也没有。(2) 若 $C$ 包含 $s$ 的码，则每个 $t \in r$ 至多与 $s$ 的一个元组在 $C$ 上一致，于是至多贡献一个输出元组。(3) 参照完整性保证每个 $t \in r$ 在 $s$ 中至少有一个匹配元组，于是恰有一个；不同的 $t$ 给出不同的输出元组。
:::

于是 Enrolled $\bowtie$ Course 恰有 $10$ 个元组，每条选课记录一个；而 Student $\times$ Course 有 $5 \cdot 4 = 20$ 个。估计介于这两个极端之间的连接大小，是查询优化中最难的部分（[[databases/query-optimisation]]）。

::: quiz
下面哪些查询能在*不含*差算子的关系代数中写出？
- [x] 在某门课程中得到 A 的学生。
- [ ] 任何课程中都没有得到 A 的学生。
- [ ] 所选的每一门课程都得到 A 的学生。
- [x] 至少被两名不同学生选修的课程。
::: solution
第一、四个是单调的：增加选课记录只会增加答案。第四个是 $\pi_{\text{code}}(\sigma_{\text{sid} \ne \text{sid}'}(\text{Enrolled} \bowtie_{\text{code}=\text{code}'} \rho'(\text{Enrolled})))$，即一次自连接加上一个选择。第二、三个不单调：加入一条成绩为 A 的选课记录会把某个学生从第二个答案中除去；加入一条成绩为 C 的选课记录会把某个学生从第三个答案中除去。由 [[#thm-monotone]]，它们需要差运算。
:::
:::

## 代数之外：微积分与约束

代数带有**过程性**的色彩：一个表达式说明按什么顺序施加哪些运算。科德还定义了**关系微积分**，它是一种一阶逻辑的形式，查询用一条性质来刻画答案。选修每一门 CS 课程的学生是

$$
\set{ s.\text{sid} \mid s \in \text{Student} \wedge \forall c \in \text{Course}\,\bigl(c.\text{dept} = \text{'CS'} \rightarrow \exists e \in \text{Enrolled}\,(e.\text{sid} = s.\text{sid} \wedge e.\text{code} = c.\text{code})\bigr) }.
$$

这就是元组关系微积分。微积分查询必须是**安全的**——其答案只能依赖数据库中出现的值，从而像 $\set{t \mid \neg (t \in \text{Student})}$ 这样的无限集合被排除在外。**科德定理**（1972）指出：关系代数与安全性关系微积分具有相同的表达能力——每个代数表达式都有一条等价的安全微积分查询，反之亦然。SQL 更接近微积分——它的 `WHERE NOT EXISTS (...)` 读起来就像上面那条公式——而引擎会把它翻译成代数计划。其中的逻辑即[数学图谱：量词](/learn/maths/lesson.php?c=proofs&l=quantifiers)。

::: history
埃德加·F. "Ted" 科德（Edgar F. "Ted" Codd）是 IBM 圣何塞实验室的数学家，1970 年 6 月在 *Communications of the ACM* 上发表了《大型共享数据银行的数据关系模型》（"A relational model of data for large shared data banks"），其动机是数据独立性；IBM 的一份内部报告早在 1969 年就已出现，David Childs 更是在 1968 年就描述了集合论式的数据结构。科德的《数据库子语言的关系完备性》（"Relational completeness of data base sublanguages"，1972）定义了代数与微积分并证明二者等价。IBM 迟迟不愿采纳这一思想，因为它威胁到公司的层次式 IMS 产品；但 IBM 的 System R 项目（1974 年起，圣何塞）与伯克利加州大学 Michael Stonebraker 和 Eugene Wong 的 Ingres 项目（1973 年起）表明，关系系统可以是高效的。关系软件公司（Relational Software，后来的 Oracle）于 1979 年交付了第一个商用 SQL 系统，IBM 的 SQL/DS 与 DB2 分别于 1981 年和 1983 年跟进。科德荣获 1981 年的图灵奖。
:::

## 后续内容

SQL（[[databases/sql]]）是建立在代数与微积分之上的实用语言，又扩充了包、空值、聚集与递归。概念设计（[[databases/conceptual-design]]）与规范化（[[databases/normalisation]]）回答本章留下的问题：一个数据库应当有哪些关系模式，应当有哪些码与约束？课程的后半部分走进引擎内部：关系如何存储与建立索引（[[databases/storage-indexing]]），每个代数算子如何实现（[[databases/query-processing]]），以及表达式之间的等价式如何让系统得以选定一个快速计划（[[databases/query-optimisation]]）。关系模型并不是唯一的数据模型——文档、图与键值存储各有不同的取舍，Kleppmann 的书中对此有很好的比较——但它的代数始终是用来讲解其他模型的参照点。

::: summary
- **关系**是定义在具名属性、原子域的模式上的元组的有限*集合*；模式稳定，实例常变。
- **数据独立性**——把逻辑模式与物理存储分离——是关系模型的主要成就。
- **超码**在每个合法实例中标识元组；**候选码**是极小的超码；**外码**必须与被引用关系中某个元组的码相匹配（**参照完整性**）。
- **关系代数**有六个基本算子 $\sigma, \pi, \rho, \cup, -, \times$；连接、交、半连接与除法由它们导出，且代数是封闭的，故查询是算子树。
- 投影会去重；"所有"型查询用**除法**，"非/无/只"型查询需要**差**。
- 不含差的表达式是**单调**的（[[#thm-monotone]]），因此差不可能由其他算子表达；代数也无法表达传递闭包。
- 按"对码的外码"进行连接时，每个引用元组恰好返回一个元组（[[#prop-join-size]]）。
- 代数与安全性关系微积分表达能力相同（科德定理）；SQL 建立在两者之上。
:::

## 习题

::: exercise 统计一个选择 {level=1 check="3"}
在贯穿示例中，$\sigma_{\text{credits} = 15}(\text{Course})$ 有多少个元组？$\pi_{\text{credits}}(\text{Course})$ 呢？（输入第一个数。）
::: solution
CS101、CS202 与 MA101 都是 15 学分，所以选择有 $3$ 个元组。投影 $\pi_{\text{credits}}(\text{Course})$ 却只有 $2$ 个元组，$\set{(15), (10)}$，因为投影会去重。
:::
:::

::: exercise 统计超码的个数 {level=1 check="8"}
关系模式 $R(A, B, C, D)$ 只有 $\set{A}$ 一个候选码。它共有多少个超码？（输入数字。）
::: solution
一个属性集合是超码，当且仅当它包含一个候选码。这里即包含 $A$：超码是 $\set{A} \cup Y$，其中 $Y$ 取遍 $\set{B, C, D}$ 的子集，共 $2^3 = 8$ 个。（若某个超码不含 $A$，它就包含某个不同于 $\set{A}$ 的极小超码——候选码——而这样的码并不存在。）
:::
:::

::: exercise Ada 所修课程的名称 {level=1}
写出 Ada 所选修课程的名称的关系代数表达式，并求值。
::: solution
$$
\pi_{\text{title}}\bigl(\sigma_{\text{name}=\text{'Ada'}}(\text{Student}) \bowtie \text{Enrolled} \bowtie \text{Course}\bigr).
$$

选择给出 Ada 的元组 $(1, \text{Ada}, 2)$；与 Enrolled 连接得到她的三条选课记录（CS101、CS202、MA101）；与 Course 连接附上名称；投影得到 {Programming, Databases, Calculus}。在连接之前先选出 Ada，可把中间结果保持在三个元组。
:::
:::

::: exercise 结果大小的上下界 {level=2}
设 $r(A, B)$ 有 $100$ 个元组，$s(A, B)$ 有 $50$ 个。给出 $r \cup s$、$r \cap s$、$r - s$ 与 $r \times \rho_{A' \leftarrow A,\, B' \leftarrow B}(s)$ 结果大小的最小、最大可能值，并给出达到各边界的实例。
::: solution
- $r \cup s$：介于 $100$（当 $s \subseteq r$）与 $150$（当两者不相交）之间。
- $r \cap s$：介于 $0$（不相交）与 $50$（$s \subseteq r$）之间。
- $r - s$：介于 $50$（$s \subseteq r$，去掉 $50$ 个）与 $100$（不相交）之间。
- 笛卡尔积总是恰有 $100 \cdot 50 = 5000$ 个元组：每对元组给出互不相同的拼接元组。

取 $r = \set{(i, 0) : 1 \le i \le 100}$，再取 $s = \set{(i, 0) : 1 \le i \le 50}$（子集情形）或 $s = \set{(i, 1) : 1 \le i \le 50}$（不相交情形），即可达到各极值。
:::
:::

::: exercise 数学课的除法 {level=2 check="3"}
用 [[#eq-division]] 计算 $\pi_{\text{sid},\text{code}}(\text{Enrolled}) \div \pi_{\text{code}}(\sigma_{\text{dept}=\text{'MA'}}(\text{Course}))$，并展示中间关系。（输入答案的 sid。）
::: solution
$s = \set{\text{MA101}, \text{MA210}}$，且 $\pi_{\text{sid}}(r) = \set{1,2,3,4}$。积 $\pi_{\text{sid}}(r) \times s$ 有 $8$ 个对；其中不属于 $r$ 的是 $(1,\text{MA210})$、$(2,\text{MA101})$、$(4,\text{MA101})$、$(4,\text{MA210})$。它们的 sid 是 $\set{1,2,4}$，而 $\set{1,2,3,4} - \set{1,2,4} = \set{3}$。只有 Chen（sid $3$）把两门数学课都修了。
:::
:::

::: exercise 自然连接的特例 {level=2}
用 [[#def-derived]] 证明：若 $U \cap V = \emptyset$，则 $r \bowtie s = r \times s$；若 $U = V$，则 $r \bowtie s = r \cap s$。再证 $r \cap s = r - (r - s)$。
::: solution
自然连接由 $U \cup V$ 上满足 $t[U] \in r$ 且 $t[V] \in s$ 的元组 $t$ 组成。若 $U \cap V = \emptyset$，则 $U \cup V$ 上的元组恰是一个 $U$ 上的元组与一个 $V$ 上的元组的对，再没有别的条件，于是连接就是所有 $t[U] \in r$ 与 $t[V] \in s$ 的组合之集——即笛卡尔积。若 $U = V$，则 $t[U] = t[V] = t$，条件化为 $t \in r$ 且 $t \in s$：交。

对最后一个恒等式：$t \in r - (r - s)$ 当且仅当 $t \in r$ 且 $t \notin r - s$；而在 $t \in r$ 的前提下，$t \notin r - s$ 意味着 $t \in s$。故 $t \in r - (r - s)$ 当且仅当 $t \in r$ 且 $t \in s$。
:::
:::

::: exercise 参照动作 {level=2 check="7"}
Enrolled 的外码声明为 `ON DELETE CASCADE`。删除学生 3 后，Enrolled 中还剩哪些元组？在 `RESTRICT` 下又会怎样？这里为什么 `SET NULL` 会被拒绝？（输入级联删除后 Enrolled 中剩下的元组数。）
::: solution
级联删除 Chen 的三条选课记录（CS202、MA101、MA210），剩下 $10 - 3 = 7$ 个元组。在 `RESTRICT` 下，学生 3 的删除会被拒绝，因为仍有选课记录引用她，于是一切不变。`SET NULL` 会把这些选课记录的 `sid` 置为空，但 `sid` 是 Enrolled 主码的组成部分，实体完整性禁止主码取空——于是这个更新失败。
:::
:::

::: exercise 投影与差 {#ex-project-diff level=2}
证明 $\pi_X(r \cup s) \equiv \pi_X(r) \cup \pi_X(s)$ 恒成立，但 $\pi_X(r - s) \equiv \pi_X(r) - \pi_X(s)$ 不恒成立。$X$ 满足什么条件时，第二式成为等价式？
::: solution
$x \in \pi_X(r \cup s)$ 当且仅当存在属于 $r$ 或属于 $s$ 的 $t$ 使 $x = t[X]$，当且仅当 $x \in \pi_X(r)$ 或 $x \in \pi_X(s)$。对于差，在 $(A, B)$ 上取 $r = \set{(1, a), (1, b)}$、$s = \set{(1, b)}$、$X = \set{A}$：$\pi_A(r - s) = \pi_A(\set{(1,a)}) = \set{1}$，而 $\pi_A(r) - \pi_A(s) = \set{1} - \set{1} = \emptyset$。包含关系 $\pi_X(r) - \pi_X(s) \subseteq \pi_X(r - s)$ 恒成立（若 $x = t[X]$ 且 $t \in r$，而 $s$ 中没有元组投影到 $x$，则 $t \notin s$）。当 $X$ 是并 $r \cup s$ 的超码时取等——此时元组由其 $X$ 值决定，且 $t[X] \in \pi_X(s)$ 蕴含 $t \in s$。
:::
:::

::: exercise 除法不单调 {level=3}
按 [[#def-monotone]] 的意义，证明查询 $R \div S$ 对 $S$ 不单调，并证明它对 $R$ 也不单调。由此得出除法不能不含差运算，并解释这与 [[#prop-division]] 为何一致。
::: solution
对 $S$：在 $(A, B)$ 上取 $R = \set{(x, y_1)}$。当 $S = \set{(y_1)}$ 时，$R \div S = \set{(x)}$；当 $S' = \set{(y_1), (y_2)} \supseteq S$ 时，$R \div S' = \emptyset$，因为 $(x, y_2) \notin R$。输入变大了，输出却变小了。

对 $R$：固定 $S$ 时查询是单调的——$R$ 中元组增多只会凑齐更多组——但单调查询必须对*所有*输入一起变大保持单调，而上面的例子是 $R$ 不变、$S$ 变大。所以 $R \div S$ 不是单调查询，由 [[#thm-monotone]]，没有不含差的表达式能计算它。这与 [[#eq-division]] 一致：该式用了两次差，一次找出缺失的组合，一次把有任何缺失的学生去掉。
:::
:::

::: exercise 并、差与除法的实现 {level=3}
把本章的 Python 模型扩充 `union(r, s)`、`difference(r, s)`（二者都要检查并相容性）与 `divide(r, s)`，后者要*逐字地*按 [[#eq-division]] 实现（你需要一个 `product` 函数）。用贯穿示例中对 CS 与 MA 的两个除法测试 `divide`。
::: solution
这里两个模式必须完全一致，包括属性的次序；更宽容的实现会按名字重排列。

```python
def union(r, s):
    assert r[0] == s[0], "union needs equal schemas"
    return r[0], r[1] | s[1]

def difference(r, s):
    assert r[0] == s[0], "difference needs equal schemas"
    return r[0], r[1] - s[1]

def product(r, s):
    assert not set(r[0]) & set(s[0]), "rename common attributes first"
    return r[0] + s[0], {t + u for t in r[1] for u in s[1]}

def divide(r, s):
    w = [a for a in r[0] if a not in s[0]]
    pw = project(r, w)
    all_pairs = project(product(pw, s), list(r[0]))   # 将列重排为 r 中的顺序
    missing = difference(all_pairs, r)
    return difference(pw, project(missing, w))

pairs = project(Enrolled, ["sid", "code"])
cs = project(select(Course, lambda t: t["dept"] == "CS"), ["code"])
ma = project(select(Course, lambda t: t["dept"] == "MA"), ["code"])
print(sorted(divide(pairs, cs)[1]), sorted(divide(pairs, ma)[1]))
```

```console
$ python3 ra_divide.py
[(1,), (4,)] [(3,)]
```

结果与 [[#ex-division]] 及上面的习题一致。`project(..., list(r[0]))` 这一步把笛卡尔积的列重新排列，使之与 $r$ 的模式一致，差运算才有定义——按位置的实现需要这一步，而代数的具名观点则不需要。
:::
:::
