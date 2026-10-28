[[databases/relational-model]] 中的关系代数是一门精确的查询语言，但没有人愿意天天写 $\pi_{\text{name}}(\sigma_{\text{dept}=\text{'MA'}}(\ldots))$。**SQL**（Structured Query Language，结构化查询语言）才是真实系统所说的语言。它是**声明式**的：查询描述结果，由数据库系统选择算法。它又远不止是一门查询语言——它定义模式与约束、插入与更新数据、控制事务与访问权限——而且五十年来早已远远超出代数的范围，多了重复元组、空值、聚集、递归与窗口函数。

本章教的是一名学生应当掌握的 SQL 核心：每种构造*确切*含义是什么、它与代数的关系如何、它的语义在哪些地方会让人吃惊。这些吃惊是实打实的：SQL 保留重复行，除了真与假还有第三个真值，当某列含有空值时，一条看上去正确的查询会悄无声息地返回错误的行。我们会把每条查询都跑一遍。**本章所有清单都在 SQLite 3.46.1 中运行过**（`sqlite3` shell，配 `.mode box` 与 `.nullvalue NULL`；Python 例子使用 Python 内置的 `sqlite3` 模块）。凡 SQLite 与 SQL 标准或 PostgreSQL 等其他系统不同之处，我们都会说明。

## 定义数据

用 `CREATE TABLE` 创建模式：它给出列名、列的类型，以及 [[databases/relational-model#def-key]] 与 [[databases/relational-model#def-foreign-key]] 中的那些约束：

```sql
PRAGMA foreign_keys = ON;          -- 仅 SQLite：在本连接上启用外码强制
CREATE TABLE Student (
  sid   INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  year  INTEGER CHECK (year BETWEEN 1 AND 4)
);
CREATE TABLE Course (
  code    TEXT PRIMARY KEY,
  title   TEXT NOT NULL,
  dept    TEXT NOT NULL,
  credits INTEGER NOT NULL
);
CREATE TABLE Enrolled (
  sid   INTEGER REFERENCES Student(sid),
  code  TEXT    REFERENCES Course(code),
  grade TEXT,                                -- 可以为 NULL：还没有评分
  PRIMARY KEY (sid, code)
);
INSERT INTO Student VALUES (1,'Ada',2), (2,'Bao',1), (3,'Chen',3), (4,'Dara',2), (5,'Eli',1);
```

Course 与 Enrolled 的行就是贯穿示例中的那些，另加一行：Dara 刚选上 MA210，还没有成绩，所以 Enrolled 的第十一行是 `(4, 'MA210', NULL)`。

`INSERT`、`UPDATE` 与 `DELETE` 改变实例；DBMS 检查每一条约束，拒绝会造成违反的语句。有两个 SQLite 的特点值得一知（就 3.46 版而言）：为兼容旧数据库，外码只有在 `PRAGMA foreign_keys = ON` 之后才被强制；而列类型是*亲和类型*（affinity）而非严格类型，除非表声明为 `STRICT`。PostgreSQL 与 SQL 标准一样，两者始终强制。

## 基本查询块

SQL 的核心是 `SELECT`–`FROM`–`WHERE` 块：

```sql
SELECT s.name, c.title, e.grade
FROM   Student s, Enrolled e, Course c
WHERE  e.sid = s.sid AND c.code = e.code AND c.dept = 'MA'
ORDER  BY s.name, c.title;
```

```text
┌──────┬────────────┬───────┐
│ name │   title    │ grade │
├──────┼────────────┼───────┤
│ Ada  │ Calculus   │ A     │
│ Bao  │ Statistics │ B     │
│ Chen │ Calculus   │ B     │
│ Chen │ Statistics │ A     │
│ Dara │ Statistics │ NULL  │
└──────┴────────────┴───────┘
```

`FROM` 子句列出若干表，每个表可以带一个可选的**别名**（`s`、`e`、`c`），用来给列名加前缀限定。它的含义用一套朴素的求值过程来说最清楚——这不是 DBMS 实际的执行方式，而是任何正确的求值都必须返回的东西。

::: definition 查询块的语义 {#def-sfw}
块 `SELECT` $L$ `FROM` $R_1, \dots, R_n$ `WHERE` $C$ 的求值方式如下：对从 $R_1, \dots, R_n$ 各取一行构成的每一种组合（笛卡尔积），求条件 $C$ 的值；对使 $C$ 为*真*的每种组合，输出 $L$ 中各表达式的值。结果是一个**包**（多重集）：每个符合条件的组合输出该行一次。`SELECT DISTINCT` 从结果中删去重复行，`ORDER BY` 对结果排序；没有 `ORDER BY` 时，行的顺序是未指明的。
:::

在代数中这相当于 $\pi_L(\sigma_C(R_1 \times \dots \times R_n))$，区别在于 SQL 的 $\pi$ 不去重。要把这一点说精确，我们需要包。

::: definition 包关系代数 {#def-bag}
一个模式上的**包**给每个元组指派一个 $\set{0, 1, 2, \dots}$ 中的重数（multiplicity），且只有有限多个非零。设 $r, s$ 是包，$t$ 是元组，重数分别为 $r(t), s(t)$：
- $\sigma_\theta(r)(t) = r(t)$，若 $\theta(t)$ 成立；否则为 $0$；
- $\pi_X(r)(x) = \sum_{t : t[X] = x} r(t)$——投影是*累加*重数，而不是合并；
- $(r \times s)(t, u) = r(t)\,s(u)$；
- $(r \uplus s)(t) = r(t) + s(t)$（包并，即 SQL 的 `UNION ALL`）；
- $\delta(r)(t) = \min(r(t), 1)$（去重，即 SQL 的 `DISTINCT`）。
:::

::: theorem 查询块的翻译 {#thm-sfw}
在包语义下，[[#def-sfw]] 的查询块等于 $\pi_L(\sigma_C(R_1 \times \dots \times R_n))$；同一块改用 `SELECT DISTINCT` 则等于 $\delta(\pi_L(\sigma_C(R_1 \times \dots \times R_n)))$。若每个 $R_i$ 都是集合（带有码），则 $\delta(\pi_L(\sigma_C(\cdots)))$ 与 [[databases/relational-model#def-algebra]] 的集合代数表达式一致。
:::

::: proof
由 [[#def-bag]]，组合 $(t_1, \dots, t_n)$ 在积中的重数为 $R_1(t_1)\cdots R_n(t_n)$，恰是各表按这些值各取一行构成的选法数目。选择对满足 $C$ 的组合保留这些重数；投影把输出值相同的各组合的重数累加起来——与 [[#def-sfw]] 一致，每个符合条件的组合记一次。施加 $\delta$ 后，每个重数都不超过 $1$。若输入是集合，所有重数非 $0$ 即 $1$，包的 $\sigma$ 与 $\times$ 同集合运算一致；再经 $\delta$，包投影的支集（重数非零的元组之集）与集合投影相同。
:::

SQL 为什么要用包？一部分是为了速度——去重需要排序或哈希表（[[databases/query-processing]]）；一部分是因为重复本身携带着聚集需要的信息：学分列的平均值必须把三门 15 学分的课数三次。

### 连接

把连接条件写在 `WHERE` 里是可行的，但 SQL-92 引入了显式的连接语法，把*表如何联结*与*要哪些行*分开：`Student s JOIN Enrolled e ON e.sid = s.sid`。`NATURAL JOIN` 像代数那样对所有同名列做连接——方便，却脆弱，因为添加一个恰好重名的列（比如给 Course 加一个 `year`）会神不知鬼不觉地改变每一个自然连接。请优先使用 `JOIN … ON` 或 `JOIN … USING (sid)`。

内连接会丢掉没有配对对象的行。Eli 没有任何选课记录，所以 Student `JOIN` Enrolled 里永远不会有他。**外连接**把它们留下，缺失的列补上空值：

```sql
SELECT s.name, e.code
FROM   Student s LEFT JOIN Enrolled e ON e.sid = s.sid
WHERE  s.year = 1;
```

```text
┌──────┬───────┐
│ name │ code  │
├──────┼───────┤
│ Bao  │ CS101 │
│ Bao  │ MA210 │
│ Eli  │ NULL  │
└──────┴───────┘
```

`LEFT JOIN` 保留左表的每一行，`RIGHT JOIN` 保留右表的每一行，`FULL JOIN` 两边都保留（SQLite 自 3.39 版（2022 年）起支持后两种）。左连接之后再写 `WHERE e.sid IS NULL`，返回的恰是没有配对的行——没有选课记录的学生——这个惯用法等价于代数中的一个差。注意条件 `s.year = 1` 放在 `WHERE` 里：它在连接之后过滤。把关于*右*表的条件从 `WHERE` 挪到 `ON` 里，会改变外连接的含义，这是经典的 bug 来源（[[#ex-on-where]]）。

::: example 自连接：同班学生对 {#ex-self-join}
列出至少共上一门课的不同学生对，每对只列一次。
::: solution
用 Enrolled 的两份副本，按课程连接：

```sql
SELECT DISTINCT a.sid AS s1, b.sid AS s2
FROM   Enrolled a JOIN Enrolled b ON a.code = b.code
WHERE  a.sid < b.sid
ORDER  BY s1, s2;
```

```text
┌────┬────┐
│ s1 │ s2 │
├────┼────┤
│ 1  │ 2  │
│ 1  │ 3  │
│ 1  │ 4  │
│ 2  │ 3  │
│ 2  │ 4  │
│ 3  │ 4  │
└────┴────┘
```

条件 `a.sid < b.sid` 去掉了行与自身的配对，并在 $(x, y)$ 与 $(y, x)$ 之间只留一个。`DISTINCT` 是必需的，因为有些学生对共修好几门课：Ada 与 Dara 共修 CS101 和 CS202，不写 `DISTINCT` 的话对 $(1, 4)$ 会出现两次。四名有选课记录的学生中每一对都至少共修一门课——比如 Bao 与 Dara，CS101 和 MA210 两门都共修。
:::
:::

## 聚集与分组

**聚集函数**——`COUNT`、`SUM`、`AVG`、`MIN`、`MAX`——把一个值的包化为一个值。`GROUP BY` 把行按分组列取值相等划分为若干组，每组计算一次聚集；然后 `HAVING` 对组作过滤。

```sql
SELECT code, COUNT(*) AS n, COUNT(grade) AS graded
FROM   Enrolled
GROUP  BY code
ORDER  BY code;
```

```text
┌───────┬───┬────────┐
│ code  │ n │ graded │
├───────┼───┼────────┤
│ CS101 │ 3 │ 3      │
│ CS202 │ 3 │ 3      │
│ MA101 │ 2 │ 2      │
│ MA210 │ 3 │ 2      │
└───────┴───┴────────┘
```

`COUNT(*)` 数行；`COUNT(grade)` 数非空的 grade——Dara 那条未评分的 MA210 选课记录是一行，却不是一"个成绩"。除 `COUNT(*)` 外每个聚集函数都忽略空值，而空包上的 `SUM`、`AVG`、`MIN`、`MAX` 是 `NULL`，不是 $0$。

::: definition 逻辑求值顺序 {#def-order}
含全部子句的查询，其逻辑求值顺序是：`FROM`（构成笛卡尔积或做连接）、`WHERE`（过滤行）、`GROUP BY`（成组）、`HAVING`（过滤组）、`SELECT`（计算输出表达式，包括聚集）、`DISTINCT`、`ORDER BY`，最后是 `LIMIT`/`OFFSET`。在分组查询中，`SELECT` 与 `HAVING` 里的每个表达式都必须是分组列、聚集、或由二者复合而成的函数。
:::

这个顺序解释了常见的错误。`WHERE COUNT(*) > 2` 非法，因为 `WHERE` 在组存在之前就运行——这正是 `HAVING` 的用途。在 `SELECT` 中定义的别名不能在 `WHERE` 里使用，原因相同（不过 `ORDER BY` 可以用它，因为它在更晚执行）。而既未分组又未聚集的列也不许出现在选择列表中：那该显示组里哪一个值？标准拒绝这样的查询（除非该列由分组列函数决定，这是 SQL:1999 的一项细化）；SQLite 却接受它们，并从组中任意一行取一个值——这种方便掩盖了 bug。

::: example 学分合计不少于 40 的学生 {#ex-credits}
列出选课学分合计至少 40 的学生，合计最大者在前。
::: solution
先连接以取得每条选课记录的学分，再按学生分组，最后过滤组：

```sql
SELECT s.name, SUM(c.credits) AS credits
FROM   Student s JOIN Enrolled e ON e.sid = s.sid
                 JOIN Course c   ON c.code = e.code
GROUP  BY s.sid, s.name
HAVING SUM(c.credits) >= 40
ORDER  BY credits DESC;
```

```text
┌──────┬─────────┐
│ name │ credits │
├──────┼─────────┤
│ Ada  │ 45      │
│ Chen │ 40      │
│ Dara │ 40      │
└──────┴─────────┘
```

逐分步看：连接给出 $11$ 行，每条选课记录一行。按学生分组形成四个组（Eli 没有选课记录，也就没有组）。各组学分合计是 Ada $15+15+15 = 45$，Bao $15 + 10 = 25$，Chen $15 + 15 + 10 = 40$，Dara $15 + 15 + 10 = 40$。`HAVING` 去掉了 Bao。我们按 `s.sid` 而不仅按 `s.name` 分组，因为两个学生可能同名；把 `s.name` 一并列出，是为了让它能出现在 `SELECT` 中。Chen 与 Dara 并列 $40$，两者的先后次序未指明——在 `ORDER BY` 里追加 `, s.name` 即可固定。
:::
:::

::: warning 外连接之后的 COUNT(*) 会把补空行也数进去
要统计每名学生的课程数，*包括*一名不选的学生，需要左连接——可这样 `COUNT(*)` 就错了：

```sql
SELECT s.name, COUNT(*) AS wrong, COUNT(e.code) AS right_count
FROM   Student s LEFT JOIN Enrolled e ON e.sid = s.sid
GROUP  BY s.sid, s.name;
```

对 Eli 这给出 `wrong = 1` 而 `right_count = 0`：左连接为 Eli 产生了一行，`e.code` 为空。`COUNT(*)` 把这一行数了进去；`COUNT(e.code)` 则忽略空值。凡在外连接之上做聚集，就对*右*表的某一列计数——最好用它的码。
:::

## 嵌套查询

**子查询**是嵌在另一条查询里的查询。在 `WHERE` 里，它可以拿 `IN`、`EXISTS` 或与 `ANY`/`ALL` 的比较来测试；在 `FROM` 里，它充当一张表；而返回单个值的**标量子查询**可以出现在任何值能出现的地方：

```sql
SELECT code, title FROM Course
WHERE  credits > (SELECT AVG(credits) FROM Course);     -- 平均值为 13.75
```

```text
┌───────┬─────────────┐
│ code  │    title    │
├───────┼─────────────┤
│ CS101 │ Programming │
│ CS202 │ Databases   │
│ MA101 │ Calculus    │
└───────┴─────────────┘
```

若子查询提到了外层查询的某一列，就称它是**相关的**；从逻辑上说，它对每个外层行都要重新求值一次。`EXISTS (子查询)` 在子查询至少返回一行时为真；借助 `NOT EXISTS`，SQL 能和关系微积分一样精确地表达"对全部"。[[databases/relational-model#ex-division]] 中的除法——选修*每一门* CS 课程的学生——变成双重否定：不存在这样一门 CS 课程，该学生没有选修。

```sql
SELECT s.name FROM Student s
WHERE NOT EXISTS (SELECT * FROM Course c
                  WHERE c.dept = 'CS'
                    AND NOT EXISTS (SELECT * FROM Enrolled e
                                    WHERE e.sid = s.sid AND e.code = c.code));
```

```text
┌──────┐
│ name │
├──────┤
│ Ada  │
│ Dara │
└──────┘
```

由内向外读：对学生 `s` 与课程 `c`，最内层子查询在 `s` 选修 `c` 时非空；中间那层收集 `s` *没有*选修的 CS 课程；外层条件在这样一门课不存在时保留 `s`。DBMS 通常会把这类子查询改写成（反）连接，而不是照字面执行（[[databases/query-optimisation]]）。

集合运算 `UNION`、`INTERSECT` 与 `EXCEPT` 合并两个并相容的查询结果。默认它们会去重——它们是集合运算——而 `UNION ALL` 保留重复（即包的并 $\uplus$）。选修 CS101 的学生（$\set{1, 2, 4}$）与选修 MA101 的学生（$\set{1, 3}$），`UNION` 给出 $1, 2, 3, 4$，`UNION ALL` 给出五行 $1, 2, 4, 1, 3$，`INTERSECT` 给出 $1$，`EXCEPT` 给出 $2, 4$。

::: widget venn
sets: 2
labels: CS101; MA101
expr: CS101 - MA101
caption: 选修 CS101 的学生与选修 MA101 的学生作为两个集合。阴影区域是 `EXCEPT`：选了 CS101 而未选 MA101 的学生（Bao 与 Dara）。输入 `CS101 | MA101` 看 `UNION`，输入 `CS101 & MA101` 看 `INTERSECT`（只有 Ada）。图画的是集合；`UNION ALL` 在这里没有图可画，因为它把 Ada 数了两次。
:::

## 空值与三值逻辑

**空值**标记一个缺失的值：未知（Dara 的成绩还不晓得）、不适用（某人没有的中间名）、或者不予披露。SQL 对这三种情形都只用一个 `NULL`，而且它不像 $0$ 或空串那样是一个值：它是一个记号，意思是"此处没有值"。成绩为空时，`grade = 'A'` 该是什么？既不是真也不是假。因此 SQL 使用**三值逻辑**。

::: definition 三值逻辑 {#def-3vl}
SQL 条件的真值有三个：真（TRUE）、假（FALSE）与未知（UNKNOWN）。任何以空值为运算量的比较（$=, \ne, <, \le, >, \ge$）都是未知。联结词由 FALSE $<$ UNKNOWN $<$ TRUE 这一顺序定义：$p$ `AND` $q = \min(p, q)$，$p$ `OR` $q = \max(p, q)$，`NOT` 真 = 假，`NOT` 假 = 真，`NOT` 未知 = 未知。`WHERE`、`HAVING` 与 `ON` 只在条件为真时保留一行。谓词 `x IS NULL` 与 `x IS NOT NULL` 永远取真或取假。
:::

| $p$ | $q$ | $p$ AND $q$ | $p$ OR $q$ | NOT $p$ |
|---|---|---|---|---|
| TRUE | UNKNOWN | UNKNOWN | TRUE | FALSE |
| FALSE | UNKNOWN | FALSE | UNKNOWN | TRUE |
| UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |

（不含 UNKNOWN 的行与普通逻辑相同。）SQLite 把真、假、未知分别显示为 `1`、`0` 和 `NULL`：

```sql
SELECT NULL = NULL, NULL IS NULL, 1 < NULL, NULL AND 0, NULL OR 1, NOT NULL;
```

```text
┌─────────────┬──────────────┬──────────┬────────────┬───────────┬──────────┐
│ NULL = NULL │ NULL IS NULL │ 1 < NULL │ NULL AND 0 │ NULL OR 1 │ NOT NULL │
├─────────────┼──────────────┼──────────┼────────────┼───────────┼──────────┤
│ NULL        │ 1            │ NULL     │ 0          │ 1         │ NULL     │
└─────────────┴──────────────┴──────────┴────────────┴───────────┴──────────┘
```

连 `NULL = NULL` 都是未知的：两个未知的成绩并不能被认定为相等。所以 `WHERE grade = NULL` 永远返回不了任何行；要写 `WHERE grade IS NULL`。而一条在二值逻辑下为重言式的条件，在 SQL 里未必：`grade = 'A' OR grade <> 'A'` 对 Enrolled 的十行取真，对 Dara 的未评分行却取未知，所以它选出 $11$ 行中的 $10$ 行。有些规律幸存下来——德摩根律、交换律、结合律与分配律在这种逻辑下仍然成立——但排中律 $p \vee \neg p$ 不再成立。

::: proposition 含空值的 NOT IN {#prop-not-in}
设 $S$ 是某子查询返回的值的包，$x$ 是一个值。条件 $x$ `NOT IN` $(S)$——SQL 把它定义为 `NOT`（$x = s_1$ `OR` $\dots$ `OR` $x = s_k$）——为真，当且仅当 $S$ 为空，或者 $x$ 非空、$S$ 中没有空元素、且对每个 $s \in S$ 都有 $x \ne s$。特别地，若 $S$ 含有空值而 $x$ 不在 $S$ 中出现，则该条件为未知，`WHERE x NOT IN (S)` 这一过滤会把行舍去。
:::

::: proof
若 $S$ 为空，析取式为空，其值为假，其否定为真。否则，否定式为真当且仅当析取式为假，即每个析取支 $x = s_i$ 都为假（按 $\max$ 规则：有一个析取支为真则整体为真，无真而有未知则整体为未知）。比较 $x = s_i$ 为假，当且仅当两个运算量都非空且不同。所以该条件为真当且仅当 $x$ 非空、每个 $s_i$ 非空、且 $x$ 与它们全都不同。若某个 $s_i$ 为空而没有任何 $s_j$ 等于 $x$，则各析取支非假即未知、且至少有一个未知，于是析取式及其否定都是未知。
:::

::: example 消失的学生 {#ex-not-in}
找出从未得过 C 的学生。比较 `NOT IN` 与 `NOT EXISTS`。
::: solution
看上去自然的查询用 `NOT IN` 配相关子查询：

```sql
SELECT name FROM Student s
WHERE 'C' NOT IN (SELECT grade FROM Enrolled e WHERE e.sid = s.sid);
```

```text
┌──────┐
│ name │
├──────┤
│ Ada  │
│ Chen │
│ Eli  │
└──────┘
```

Dara 不见了，尽管她从没得过 C：她的成绩是 B、B 和 NULL，而由 [[#prop-not-in]]，`'C' NOT IN ('B', 'B', NULL)` 为未知。Bao 被正确地排除（他有一个 C），Eli 被正确地包括（他的子查询为空）。`NOT EXISTS` 形式问的才是本意的问题——这个学生存不存在一条成绩为 C 的选课记录？——成绩为空只是使 `e.grade = 'C'` 不成立：

```sql
SELECT name FROM Student s
WHERE NOT EXISTS (SELECT * FROM Enrolled e WHERE e.sid = s.sid AND e.grade = 'C');
```

```text
┌──────┐
│ name │
├──────┤
│ Ada  │
│ Chen │
│ Dara │
│ Eli  │
└──────┘
```

教训：除非子查询的那一列声明了 `NOT NULL`，优先用 `NOT EXISTS` 而不是 `NOT IN`。
:::
:::

::: quiz
Enrolled 有 $11$ 行，其中一行的成绩为空。`SELECT * FROM Enrolled WHERE NOT (grade = 'A' OR grade <> 'A')` 返回多少行？
- [x] $0$
- [ ] $1$
- [ ] $10$
- [ ] $11$
::: solution
十个已评分的行上，`grade = 'A' OR grade <> 'A'` 为真，其否定为假。未评分的行上它为未知，`NOT UNKNOWN` 仍是未知。`WHERE` 只保留为真的行，所以一行都没有。SQLite 返回计数 $0$。按二值逻辑，你也许会以为空值行会"因为它既不是 A 也不是非 A"而被返回——但否定永远不会把未知变成真。
:::
:::

## 视图、公用表表达式与递归

**视图**是一条有名字的查询，可以像表一样使用：

```sql
CREATE VIEW Transcript AS
  SELECT s.sid, s.name, c.code, c.dept, c.credits, e.grade
  FROM Student s JOIN Enrolled e ON e.sid = s.sid JOIN Course c ON c.code = e.code;

SELECT dept, COUNT(DISTINCT sid) AS students FROM Transcript GROUP BY dept;
```

```text
┌──────┬──────────┐
│ dept │ students │
├──────┼──────────┤
│ CS   │ 4        │
│ MA   │ 4        │
└──────┴──────────┘
```

视图提供逻辑数据独立性（应用查询视图，基表在视图之下变动）与安全性（把访问权授予一个隐藏了某些列的视图）。普通视图不存任何数据：对它的查询会被展开成对基表的查询。**物化视图**存储自己的结果，基表变化时必须刷新。只有当视图的每一行对应基表的一行时，才可能*透过*视图做更新，比如对单张表作选择与投影的视图。

**公用表表达式**（CTE）`WITH name AS (query)` 是一条只在单条语句内有效的视图，它让长查询变得可读。加上 `WITH RECURSIVE`，CTE 可以引用自身，SQL 由此挣脱了 [[databases/relational-model]] 中指出的代数局限：它能计算传递闭包。考虑直连先修课表 Prereq(course, needs)：

| course | needs |
|---|---|
| CS202 | CS101 |
| CS301 | CS202 |
| CS301 | MA210 |
| CS350 | CS301 |
| CS350 | MA101 |
| MA210 | MA101 |

::: widget graph
nodes: CS350@3,1; CS301@2,1.6; MA101@1,0.2; CS202@1,2.2; MA210@1,1; CS101@0,2.2
edges: CS350>CS301; CS350>MA101; CS301>CS202; CS301>MA210; MA210>MA101; CS202>CS101
algorithm: bfs
start: CS350
caption: 先修关系作为有向图：箭头从一门课指向它所必需的一门课。逐步执行从 CS350 出发的广度优先搜索：被访问到的顶点恰是下面递归查询逐层返回的那些行——基本情况找出直连先修课（距离 $1$），递归步每一轮添加下一层。MA101 在距离 $1$ 处到达一次，经 MA210 又到达一次，但只加入一次。改从 CS202 或 MA101 出发开始搜索，可以看到更短的闭包。
:::

```sql
WITH RECURSIVE Needs(code) AS (
  SELECT needs FROM Prereq WHERE course = 'CS350'          -- 基本情况
  UNION
  SELECT p.needs FROM Needs n JOIN Prereq p ON p.course = n.code   -- 再走一步
)
SELECT code FROM Needs ORDER BY code;
```

```text
┌───────┐
│ code  │
├───────┤
│ CS101 │
│ CS202 │
│ CS301 │
│ MA101 │
│ MA210 │
└───────┘
```

::: definition 线性递归查询 {#def-recursive}
线性递归 CTE `WITH RECURSIVE` $T$ `AS (` $B$ `UNION` $S$ `)`，其中基础查询 $B$ 不含 $T$、递归步查询 $S$ 含 $T$ 恰好一次，其求值方式是**迭代求不动点**：$T_0 = B$，$\Delta_0 = T_0$；对 $i \ge 0$，$\Delta_{i+1} = S(\Delta_i) - T_i$，$T_{i+1} = T_i \cup \Delta_{i+1}$；当 $\Delta_{i+1}$ 为空时求值停止，结果为最后的 $T_i$。
:::

每一轮只对新增的行施用递归步（**半朴素**策略），这对线性递归是正确的，因为连接对并可以分配。若递归步查询只用连接、选择与投影（它是单调的，[[databases/relational-model#thm-monotone]]），且 `UNION` 会去重，则迭代终止：每个 $T_i$ 的每一行都由数据库中有限多个值拼装而成，所以 $T_0 \subseteq T_1 \subseteq \cdots$ 不可能永远增长（[[#ex-fixpoint]]）。若改用 `UNION ALL`，或递归步会造出新值（`depth + 1`），那么一张有环的图会让递归永远跑下去；实际的查询此时就需要深度限制。

::: example 追踪不动点 {#ex-trace-recursion}
对上面的查询追踪 [[#def-recursive]] 的过程。
::: solution
- $T_0 = \Delta_0 = \set{\text{CS301}, \text{MA101}}$（CS350 的直连先修课）。
- 对 $\Delta_0$ 走一步：course 为 CS301 的 Prereq 行给出 CS202 与 MA210；MA101 没有先修课。$\Delta_1 = \set{\text{CS202}, \text{MA210}}$，$T_1 = \set{\text{CS301}, \text{MA101}, \text{CS202}, \text{MA210}}$。
- 对 $\Delta_1$ 走一步：CS202 需要 CS101；MA210 需要 MA101，它已在 $T_1$ 中，被去掉。$\Delta_2 = \set{\text{CS101}}$。
- 对 $\Delta_2$ 走一步：CS101 什么都不需要，$\Delta_3 = \emptyset$。停止。

结果含五门课，与输出和图中的广度优先搜索吻合：$\Delta_i$ 恰是距离 $i + 1$、此前未曾发现的课程之集。若没有 `UNION` 的去重，MA101 会被发现两次（直接一次、经 MA210 一次），而在一张有环的先修课表上则会永远发现下去。
:::
:::

**窗口函数**（SQL:2003）在一片相关行的"窗口"上计算聚集，却*不*把它们压成一行：`RANK() OVER (PARTITION BY code ORDER BY grade)` 在每门课程内部给每名学生排名，同时保持每条选课记录一行。它们是求累计和、排名与移动平均的标准工具。

## 安全地嵌入 SQL

程序通过库把 SQL 发给数据库：**游标**执行一条语句并返回各行。把用户提供的值放进查询，诱人的做法是把它粘进 SQL 文本。这是一个严重的 bug，用一个完全无辜的名字就能看清楚：

```python
import sqlite3
con = sqlite3.connect("u2.db")
name = "O'Brien"
sql = "SELECT sid FROM Student WHERE name = '" + name + "'"   # 错误：拿数据拼出代码
print(sql)
try:
    con.execute(sql)
except sqlite3.Error as e:
    print(type(e).__name__, e)
```

```console
$ python3 bad.py
SELECT sid FROM Student WHERE name = 'O'Brien'
OperationalError near "Brien": syntax error
```

*数据*里的这个撇号终结了字符串字面量，把名字的其余部分变成了 SQL *代码*。这里的后果是一个语法错误；换成别的输入，查询的文本——从而数据库所做的事情——就由提供输入的人决定了。这一类漏洞称为 **SQL 注入**，几十年来一直是对 web 应用破坏性最强的缺陷之一。病因是一个设计错误：把代码和数据混在一个字符串里。

防线是绝不用数据来拼 SQL。使用**参数化查询**（预编译语句）：SQL 文本是带占位符的固定字符串，值单独传入，于是数据库把语句解析一次，之后每个参数都严格地只当作值对待。

```python
import sqlite3

con = sqlite3.connect("u2.db")
def courses_of(name):
    # SQL 文本是固定的；值作为参数单独传递。
    sql = """SELECT c.title FROM Student s
             JOIN Enrolled e ON e.sid = s.sid JOIN Course c ON c.code = e.code
             WHERE s.name = ? ORDER BY c.title"""
    return [row[0] for row in con.execute(sql, (name,))]

print(courses_of("Ada"))
print(courses_of("O'Brien"))        # 数据里的引号只是数据
```

```console
$ python3 param.py
['Calculus', 'Databases', 'Programming']
[]
```

每个数据库库都支持占位符（SQLite 用 `?`，PostgreSQL 驱动用 `%s` 或 `$1`，许多库还有命名参数）。表名、列名一类的标识符不能作参数；程序若非要在其中做选择，就应当从程序里的固定列表中挑选，绝不用未经处理的输入。最小权限原则再添一层防线：应用使用的数据库账户只应拥有它所需要的权限（[[security]]）。

::: history
SQL 起源于 SEQUEL（"Structured English Query Language"，结构化英语查询语言），由 IBM 圣何塞的 Donald Chamberlin 与 Raymond Boyce 设计，为 System R 原型而作，1974 年以《SEQUEL: A structured English query language》发表；后因商标原因改名为 SQL。System R 1976–1981 年间的论文奠定了关系引擎的范本，其中包括 Eswaran、Gray、Lorie 与 Traiger 论一致性与加锁的文章（1976）以及 Selinger 的查询优化器（1979）。Oracle（1979）与 IBM 的 SQL/DS（1981）、DB2（1983）是最早的商用 SQL 系统。ANSI 于 1986 年标准化了 SQL（ISO 于 1987 年采纳）；SQL-92 加入了显式连接等诸多内容；SQL:1999 加入了递归查询、触发器与用户定义类型；SQL:2003 加入了窗口函数；后续版本又加入了 JSON（2016）与属性图查询（SQL:2023）。科德本人就批评过 SQL 的重复元组和单一空值，而经 C. J. Date 犀理化了的关于空值的争论，至今也未曾真正平息。
:::

## 后续内容

SQL 的含义奠基于代数，它的实现亦然：每条查询先被解析成一棵算子树，再按代数等价式改写，最后由连接、排序与聚集的算法执行（[[databases/query-processing]]、[[databases/query-optimisation]]）。索引让选择性强的查询变快而不改变其含义（[[databases/storage-indexing]]）。事务——`BEGIN`、`COMMIT`、`ROLLBACK`——及其隔离级别决定了当别的写者正在写的时候一条查询看得见什么（[[databases/transactions]]）。而最初究竟该建哪些表，是 [[databases/conceptual-design]] 与 [[databases/normalisation]] 的主题。

::: summary
- 查询块在**包**代数中的含义是 $\pi_L(\sigma_C(R_1 \times \dots \times R_n))$：不写 `DISTINCT`，SQL 就保留重复；不写 `ORDER BY`，行就没有顺序。
- 子句的逻辑求值顺序是 `FROM`、`WHERE`、`GROUP BY`、`HAVING`、`SELECT`、`DISTINCT`、`ORDER BY`；`HAVING` 过滤组，`WHERE` 过滤行。
- 内连接丢掉没有配对的行；**外连接**保留它们并补上空值。外连接之后，对右表的列计数，而不是 `*`。
- `NOT EXISTS` 表达"对全部"与"没有"；相关子查询在逻辑上对每个外层行重新求值。
- 空值带来**三值逻辑**：与空值的比较取未知，`WHERE` 只保留为真的行。用 `IS NULL`；当子查询可能返回空值时，当心 `NOT IN`。
- 除 `COUNT(*)` 外的聚集函数忽略空值；没有行时 `SUM` 为空。
- `WITH RECURSIVE` 计算不动点，例如代数无法表达的传递闭包。
- 绝不用数据拼 SQL 文本：用**参数化查询**，这是防 SQL 注入的防线。
:::

## 习题

::: exercise 笛卡尔积的大小 {level=1 check="20"}
对贯穿示例，`SELECT * FROM Student, Course` 返回多少行？（输入数字。）
::: solution
没有 `WHERE` 子句时，每种组合都符合条件：$5 \cdot 4 = 20$ 行（[[#def-sfw]]）。忘写连接条件就会产生这样的笛卡尔积，结果里通常还带着误导性的重复。
:::
:::

::: exercise 计数不同值 {level=1 check="4"}
对十一行的 Enrolled 表，`SELECT COUNT(*), COUNT(grade), COUNT(DISTINCT grade) FROM Enrolled` 与 `SELECT COUNT(DISTINCT code) FROM Enrolled` 各返回什么？（输入 `COUNT(DISTINCT code)` 的值。）
::: solution
`COUNT(*)` $= 11$ 行；`COUNT(grade)` $= 10$ 个非空成绩；`COUNT(DISTINCT grade)` $= 3$（A、B、C——空值被忽略，不会算成第四种值）。`COUNT(DISTINCT code)` $= 4$：每门课都至少有人选修。SQLite 证实输出为 `11 | 10 | 3` 和 `4`。
:::
:::

::: exercise 带过滤的连接 {level=1}
写出查询：一至二年级选修 CS101 的学生姓名，按字母序排列，并给出结果。
::: solution
```sql
SELECT s.name
FROM   Student s JOIN Enrolled e ON e.sid = s.sid
WHERE  e.code = 'CS101' AND s.year IN (1, 2)
ORDER  BY s.name;
```

CS101 的学生是 $1, 2, 4$（Ada、Bao、Dara），年级是 $2, 1, 2$，所以三人都符合条件：Ada、Bao、Dara。`DISTINCT` 并不需要，因为 (sid, code) 是 Enrolled 的码，而条件又固定了 code，所以每名学生至多出现一次。
:::
:::

::: exercise 外连接中 ON 与 WHERE 之别 {#ex-on-where level=2}
比较 `SELECT s.name, e.code FROM Student s LEFT JOIN Enrolled e ON e.sid = s.sid AND e.grade = 'A'` 与把 `AND e.grade = 'A'` 挪到 `WHERE` 子句里的同一条查询。两者各返回多少行？为什么不同？
::: solution
条件在 `ON` 里时，连接把每名学生与其得 A 的选课记录配对，并保留没有这种记录的学生，补上空值。得 A 的记录：Ada CS101、Ada MA101、Chen CS202、Chen MA210。所以结果里 Ada 两次、Chen 两次，Bao、Dara、Eli 各一次且 code 为空：共 $7$ 行。条件在 `WHERE` 里时，左连接先产生全部 $12$ 行（$11$ 条选课记录，外加 Eli 的补空行），然后 `WHERE e.grade = 'A'` 只留下四条 A 记录——补空行的成绩为空，使条件为未知。外连接实际上退化成了内连接：$4$ 行。左连接中关于右表的条件，若希望未配对的行幸存，就该放在 `ON` 里。
:::
:::

::: exercise 超过平均水平的学分负担 {level=2}
写出查询：选课学分合计超过"全体至少有一条选课记录的学生的平均合计"的学生。给出结果。
::: solution
在一个 CTE 里先算出各人的合计，再与它们的平均比较：

```sql
WITH Total AS (
  SELECT e.sid, SUM(c.credits) AS t
  FROM Enrolled e JOIN Course c ON c.code = e.code
  GROUP BY e.sid)
SELECT s.name, t.t FROM Total t JOIN Student s ON s.sid = t.sid
WHERE t.t > (SELECT AVG(t) FROM Total)
ORDER BY s.name;
```

合计为 $45, 25, 40, 40$，平均 $37.5$，所以结果是 Ada（$45$）、Chen（$40$）、Dara（$40$），SQLite 证实如此。Eli 没有选课记录，不在 Total 里，也就没有拉低平均值；若题意是全体学生，就用左连接配 `COALESCE(SUM(...), 0)`，把他的 $0$ 包括进来，平均变为 $30$——这里同样是这三名学生。
:::
:::

::: exercise 一条不是重言式的重言式 {level=2 check="0"}
十一行的 Enrolled 表中有多少行满足 `NOT (grade = 'A' OR grade <> 'A')`？多少行满足 `grade = 'A' OR grade <> 'A' OR grade IS NULL`？（输入第一个数。）
::: solution
与快测一样，$0$：已评分的行上，内部的析取式为真；空值行上它为未知；`NOT` 把这两者分别映为假与未知。加上 `OR grade IS NULL` 后，空值行上条件也变真（`IS NULL` 永不取未知，而未知 `OR` 真取真），所以全部 $11$ 行都满足第二个条件。
:::
:::

::: exercise 翻译成代数 {level=2}
用 [[#thm-sfw]] 把 [[#ex-self-join]] 的查询翻译成包关系代数，并解释去掉 `DISTINCT` 后结果会是什么。
::: solution
记 $a = \rho_a(\text{Enrolled})$、$b = \rho_b(\text{Enrolled})$，该查询是

$$
\delta\Bigl(\pi_{a.\text{sid}, b.\text{sid}}\bigl(\sigma_{a.\text{code} = b.\text{code} \wedge a.\text{sid} < b.\text{sid}}(a \times b)\bigr)\Bigr).
$$

若没有 $\delta$，每对 $(x, y)$ 的重数等于两人共修的课程数。共修情况：$(1,2)$ CS101；$(1,3)$ CS202、MA101；$(1,4)$ CS101、CS202；$(2,3)$ MA210；$(2,4)$ CS101、MA210；$(3,4)$ CS202、MA210。于是这个包含 $1 + 2 + 2 + 1 + 2 + 2 = 10$ 行，$\delta$ 把它化为六对。
:::
:::

::: exercise NOT IN 与 NOT EXISTS {level=3}
设 `T(a)` 与 `U(b)` 是两张表。证明：若 `T.a` 与 `U.b` 都声明为 `NOT NULL`，则 `SELECT a FROM T WHERE a NOT IN (SELECT b FROM U)` 与 `SELECT a FROM T WHERE NOT EXISTS (SELECT * FROM U WHERE U.b = T.a)` 返回相同的包。给出一个含空值的小实例使两者不同，并说明哪一个按代数的意义计算 $T - U$。
::: solution
固定 $T$ 中取值为 $x \ne$ 空的一行。`NOT EXISTS` 为真当且仅当 $U$ 中没有一行使 `U.b = x` 之值为真，即对每个 $s \in U$ 都有 $x \ne s$（没有 $s$ 为空，所以每个比较非真即假）。由 [[#prop-not-in]]，在 $x$ 与一切 $s$ 都非空时，`x NOT IN (U)` 为真当且仅当 $U$ 为空或 $x$ 与每个 $s$ 都不同——同一个条件。两个查询都保留 $T$ 中条件成立的每一行及其重数，所以两个包一致。

含空值时：$T = \set{1}$，$U = \set{\text{空}}$。于是 `1 NOT IN (NULL)` 为未知，第一个查询什么也不返回；`NOT EXISTS` 找不到使 `U.b = 1` 为真的行，返回 $1$。`NOT EXISTS` 查询计算的是反连接，在无空数据上它就是代数中的 $T - U$（除重复外）；`NOT IN` 的表现则像"该值被知晓与一切值不同"，而 $U$ 中一旦有未知的值它就失效。另外，$T$ 中为空的 $x$ 会被 `NOT EXISTS` 保留（没有行与它相等），却永远不会被 `NOT IN` 保留（只要 $U$ 非空）。
:::
:::

::: exercise 递归查询的终止性 {#ex-fixpoint level=3}
证明：当递归步查询 $S$ 由 $T$ 与已存表的连接、选择、投影构成（不含造出新值的算术）时，[[#def-recursive]] 的迭代终止，且结果是包含 $B$ 且满足 $S(T) \subseteq T$ 的最小关系 $T$。然后给出一个递归查询，它对 Prereq 中每门课程计算其直接或间接需要的课程数，并给出结果。
::: solution
*终止性。* 设 $D$ 是数据库与查询中取值的有限集，$k$ 是 $T$ 的目。由 $B$ 或由 $S$ 产生的每一行都由从输入复制来的取值组成，所以一切 $T_i$ 的每一行都落在有限集 $D^k$ 中。$T_i$ 递增，且除非 $\Delta_{i+1} = \emptyset$ 就有 $T_{i+1} \ne T_i$，故迭代至多 $\lvert D\rvert^k$ 轮后停止。

*最小不动点。* 记 $F(X) = B \cup S(X)$；$S$ 是单调的（[[databases/relational-model#thm-monotone]]）。设结果 $T^* = \bigcup_i T_i$。归纳可证：对每个满足 $B \subseteq X$ 且 $S(X) \subseteq X$ 的 $X$，都有 $T_i \subseteq X$：$T_0 = B \subseteq X$，且 $\Delta_{i+1} \subseteq S(\Delta_i) \subseteq S(T_i) \subseteq S(X) \subseteq X$。所以 $T^*$ 包含于每个这样的 $X$。它自己也是其中一个：$B \subseteq T^*$，且终止时 $S(\Delta_i) \subseteq T_i$——由于 $S$ 对并可分配（$S(T_i)$ 的每一行用到 $T$ 的某一行，该行在某一轮 $j$ 进入、当时属于 $\Delta_j$），$S(T^*)$ 的全部内容都在某一轮被产生，故 $S(T^*) \subseteq T^*$。

*查询。*

```sql
WITH RECURSIVE Reach(course, needs) AS (
  SELECT course, needs FROM Prereq
  UNION
  SELECT r.course, p.needs FROM Reach r JOIN Prereq p ON p.course = r.needs
)
SELECT course, COUNT(*) AS n FROM Reach GROUP BY course ORDER BY course;
```

结果（SQLite）是 CS202 $1$，CS301 $4$（CS202、MA210、CS101、MA101），CS350 $5$，MA210 $1$。`UNION` 在这里再次关键：CS350 有两条路径到达 MA101，若用 `UNION ALL`，`COUNT(*)` 会把它数两次。
:::
:::

::: exercise Python 中的安全选课 {level=3}
写一个 Python 函数 `enrol(sid, code)`，用参数化查询插入一条成绩为空的选课记录，在一个事务中执行，并返回 `"ok"` 或拒绝的原因。展示 Eli 两次选修 CS101、以及不存在的学生 9 来选课时会发生什么。
::: solution
```python
import sqlite3

con = sqlite3.connect("u2.db")
con.execute("PRAGMA foreign_keys = ON")      # SQLite 只在被要求时才强制外码

def enrol(sid, code):
    try:
        with con:                            # 一个事务：出错则回滚，否则提交
            con.execute("INSERT INTO Enrolled (sid, code) VALUES (?, ?)", (sid, code))
        return "ok"
    except sqlite3.IntegrityError as e:
        return f"rejected: {e}"

print(enrol(5, "CS101"))   # Eli 加入 Programming
print(enrol(5, "CS101"))   # 再来一次：违反主码 (sid, code)
print(enrol(9, "CS101"))   # 不存在学生 9：违反外码
print(con.execute("SELECT COUNT(*) FROM Enrolled WHERE sid = 5").fetchone()[0])
```

```console
$ python3 enrol.py
ok
rejected: UNIQUE constraint failed: Enrolled.sid, Enrolled.code
rejected: FOREIGN KEY constraint failed
1
```

检查是约束做的：程序不必先查询再插入（那样会与同样这么做的另一个程序竞争，[[databases/transactions]]）。若不写 `PRAGMA`，SQLite 会无声地接受学生 9。取值作为参数传递，所以任何 `code` 字符串——引号也包括在内——都作为数据存储。
:::
:::
