在写下第一条 `CREATE TABLE` 之前，必须有人决定这个数据库是*关于什么*的。教务处说："我们有学生和课程；课程每学期以教学班开设，由一名教师授课；教师属于系，每个系有一名系主任；学生选修教学班并获得成绩；有的课程以其他课程为先修。"那段话包含了所有要紧的决定——哪些事物存在、如何被识别、彼此如何关联、每一类中的多少可以同另一类中的多少相关联——但它的形式没有任何 DBMS 能够直接使用，而且暗藏着还没人察觉的歧义：一个教学班能有两名教师吗？每名教师都必须属于某个系吗？成绩是学生、课程，还是选课记录的属性？

**概念设计**把这样的需求变成精确的、图式的模型：用户能够核查它，而且它能被机械地翻译成关系模式。标准工具是陈品山（Peter Chen）1976 年提出的**实体-联系（ER）模型**。本章定义它的概念——实体集、属性、联系集、基数与参与约束、弱实体集、特化——给出把 ER 设计翻译成带码与外码的表的算法，并证明翻译的每一步保持了什么。设计中残留的缺陷随后由规范化来捕捉（[[databases/normalisation]]）。

## 实体与属性

::: definition 实体集与属性 {#def-entity}
**实体**是应用论域中可以区分开来的事物——一名学生、一门课程、一个系。**实体集**是同一类实体的汇集，由同样一些**属性**来描述，每个属性各有一个域。实体集的**码**是一个极小的属性集，在任何合法状态下，它们的取值都能区分该集合中任意两个实体。
:::

在这所大学里，Student 有属性 sid、name、year，码为 sid；Course 有 code、title、credits，码为 code；Department 有 dname 与 building；Lecturer 有 lid 与 name。在陈品山的图记法中，实体集画成矩形，属性画成挂在它们上面的椭圆，码属性加下划线；今天多数工具画的是紧凑的 UML 风格方框，属性直接列在框内。记法各家不同，概念并无不同。

属性分成若干种，每一种的翻译方式各不相同：

- **简单**属性持有一个原子值（year）；
- **复合**属性有组成部分（一个含街道、城市与邮政编码的地址），落表时摊平为各部分；
- **多值**属性对每个实体持有一个值集（一名学生的若干个电话号码），由于关系的取值必须是原子的，它们需要自己的表；
- **派生**属性可以由其他属性算出（由出生日期算出的年龄、由选课记录累计的学分总数），通常不予存储。

## 联系

::: definition 联系集 {#def-relationship}
实体集 $E_1, \dots, E_k$（可以重复）之间的**联系集** $R$ 是满足 $e_i \in E_i$ 的元组 $(e_1, \dots, e_k)$ 的集合；每个元组是一个**联系**，$k$ 是 $R$ 的**元数**。同一实体集出现多次时，每个出现位置都有一个**角色**名。联系集可以有自己的属性，它们刻画的是联系本身，而不是任何一个参与者。
:::

Enrolled 联系 Student 与 Section，并有属性 grade，它不属于任何一方：Ada 的 B 是关于 Ada 对该教学班的选课这一事实。Prereq 把 Course 联系到 Course，角色为 *course* 与 *needs*。由于联系集是一个*集合*，给定的一组实体至多被联系一次；若一名学生可能对同一个教学班选课两次（比如退课之后再选），设计就需要别的结构，例如带自己的标识符的 Enrolment 实体。

### 基数约束

设计中最重要的约束，说的是每一类中有多少实体可以和另一类中的多少实体相关联。

::: definition 映射基数与参与 {#def-cardinality}
设 $R$ 是 $A$ 与 $B$ 之间的一个二元联系集。
- 若每个 $a \in A$ 至多与 $B$ 中的一个 $b$ 相关联，则称 $R$ **从 $A$ 到 $B$ 多对一**；此时 $R$ 是从 $A$ 到 $B$ 的一个部分函数。
- 若它在两个方向上都是多对一，则称 $R$ 是**一对一**的。
- 若两个限制都不成立，则称 $R$ 是**多对多**的。

若每个 $a \in A$ 至少与一个 $b$ 相关联，则称 $A$ 在 $R$ 中的参与是**完全**的，否则是**部分**的。更一般地，$A$ 的参与上的 **(min, max) 约束**要求每个 $a$ 出现在 $R$ 的 min 到 max 条联系之中。
:::

对这所大学：Teaches 从 Section 到 Lecturer 多对一（一个教学班有一名教师；一名教师可以带几个班），Section 完全参与（每个班都有教师）、Lecturer 部分参与（外出做研究的教师什么都不带）。Offers 从 Course 到 Department 多对一，Course 完全参与。Head 是 Department 与 Lecturer 之间的一对一联系，两侧都部分参与（系可能正处于没有主任的空档；多数教师不是主任）。Enrolled 与 Prereq 是多对多的。

::: widget mapping
domain: CS101/1; CS101/2; CS202/1; MA101/1; MA210/1
codomain: Rao; Kim; Silva; Lee
map: CS101/1>Rao; CS101/2>Kim; CS202/1>Rao; MA101/1>Silva; MA210/1>Silva
caption: Teaches 是教学班（课程号/班号）与教师之间的联系。因为它从 Section 到 Lecturer 是多对一的，所以它是一个函数；Section 完全参与意味着每个班都有一条箭头射出。这个映射不是单射——Rao 与 Silva 各带两个班——也不是满射：Lee 什么都不带，所以 Lecturer 的参与是部分的。拖动箭头直到映射成为单射：那时 Teaches 就是一对一了——一个强得多的论断，得由教务处来确认。
:::

::: example 从需求中读出约束 {#ex-requirements}
某航空公司声明："一个航班（航班号与日期）由一架飞机（注册号）执飞；一架飞机可飞多个航班，而新购入的飞机可能还没飞过。旅客（护照号）订票；一次订票对应一个航班上的一个座位，一名旅客可以订多个航班。每个航班都有一名机长，机长是一名飞行员；一名飞行员可以执飞多个航班。"指出实体集、联系集、基数与参与，以及还需要追问的问题。
::: solution
实体集：Flight（码：number、date）、Aircraft（registration）、Passenger（passport）、Pilot（staff id）。

- Operates：从 Flight 到 Aircraft 多对一；Flight 完全参与（"由一架飞机执飞"），Aircraft 部分参与（"可能还没飞过"）。
- Booking：Passenger 与 Flight 之间的多对多联系，带属性 seat；两侧都部分参与（可以有空班，也可以有还没订过票的旅客）。"一次订票一个座位"这条规则使 seat 成为属性；"一个座位在一个航班上至多由一名旅客持有"则说 (flight, seat) 是 Booking 的第二个候选码。
- Captains：从 Flight 到 Pilot 多对一，Flight 完全参与。

需要追问：旅客能否重复订同一航班（例如为了第二个座位）？若能，Booking 就需要一个包含 seat 的码。订票之后航班的飞机能否更换（换机），历史记录是否必须保留？每名飞行员是否都是雇员，从而 Pilot 应当是 Employee 的子类？这些回答会改变码和表，所以必须在翻译之前问清。
:::
:::

基数是关于*世界*的论断，它们要紧，是因为它们会变成码与外码。声称"每个教学班一名教师"的设计，产生的模式将*无法*记录多人合上的课。要把基数定准，就得向用户问精确的问题——"一个班有没有可能由两名教师带？教师有没有可能不带班？"——而不是从样例数据里猜。

::: proposition 二元联系集的码 {#prop-rel-key}
设 $R$ 联系 $A$（码 $K_A$）与 $B$（码 $K_B$），并用参与者的码 $K_A \cup K_B$ 来标识每条联系。则：
1. 若 $R$ 是多对多的，$K_A \cup K_B$ 是 $R$ 唯一的候选码；
2. 若 $R$ 从 $A$ 到 $B$ 多对一，则 $K_A$ 是 $R$ 的一个候选码；
3. 若 $R$ 是一对一的，$K_A$ 与 $K_B$ 都是候选码。
:::

::: proof
联系集是*对*的集合，所以 $K_A \cup K_B$ 是超码。(1) 多对多联系下，存在某个合法状态让一个 $a$ 联系两个 $b$，故 $K_A$ 单独不是超码，$K_B$ 同理；$K_A \cup K_B$ 的任何省掉 $K_A$ 中属性的真子集都无法标识 $a$——它省掉了 $A$ 的某个极小码的一个属性，于是 $A$ 的两个不同实体可能在它上面取值相同——对 $B$ 也是如此。故 $K_A \cup K_B$ 是极小的。(2) 若每个 $a$ 至多联系一个 $b$，则含同一个 $a$ 的两条联系相等，故 $K_A$ 是超码；它极小，因为 $K_A$ 对 $A$ 极小。(3) 对两个方向分别施用 (2)。
:::

### 更高的元数、角色与聚合

有些事实同时联系三样东西。某供应商*为*某项目供应某零件；某教师*在*某教室上某门课。人们很容易想把一个三元联系换成三个二元联系，但它们说的不是一回事。

::: proposition 三元联系不是由它的二元投影决定的 {#prop-ternary}
存在三元联系集 Supplies(Supplier, Part, Project) 的两个不同实例，它们的三个二元投影——Supplier–Part、Part–Project 与 Supplier–Project——完全相同。
:::

::: proof
设 $I_1 = \set{(s_1, p_1, j_2), (s_1, p_2, j_1), (s_2, p_1, j_1)}$，$I_2 = I_1 \cup \set{(s_1, p_1, j_1)}$。$I_1$ 的三个投影是

- Supplier–Part：$\set{(s_1, p_1), (s_1, p_2), (s_2, p_1)}$，
- Part–Project：$\set{(p_1, j_2), (p_2, j_1), (p_1, j_1)}$，
- Supplier–Project：$\set{(s_1, j_2), (s_1, j_1), (s_2, j_1)}$。

$I_2$ 多出的元组 $(s_1, p_1, j_1)$ 投影为 $(s_1, p_1)$、$(p_1, j_1)$ 与 $(s_1, j_1)$，三者本已存在。于是 $I_1 \ne I_2$ 却有相同的三个投影，任何只存二元联系的设计都分辨不出它们。
:::

用文字说：知道 $s_1$ 把 $p_1$ 供应给了某个人、$p_1$ 由某个人供应给了 $j_1$、$s_1$ 为 $j_1$ 供应过某样东西，并不能告诉我们 $s_1$ 把 $p_1$ 供应给了 $j_1$。若应用正需要这一事实，该联系就确实是三元的。反之，若业务规则是三个二元事实*蕴含*该三元事实，那么用二元设计既正确又更小；这就是**连接依赖**，[[databases/normalisation]] 中还将重访。

有时一个联系本身还要参与另一个联系：某教学班的任课教师可能要接受一位评审员的*考评*。**聚合**（aggregation）把联系 Teaches 连同其参与者当作一个更高层次的实体，让它能够参与联系 Reviews；落到表上，这只是说 Reviews 引用 Teaches 的码。

## 弱实体集

课程的一个教学班被标识为"CS101 在 2026A 学期的第 2 班"。班号 $2$ 本身标识不了任何东西——每门课都有一个 2 班——而教学班离开了它的课程就无法存在。

::: definition 弱实体集 {#def-weak}
**弱实体集** $W$ 没有自己的码。每个弱实体通过它与**识别属主**实体集 $E$ 中某个实体的联系来识别——该联系称为**识别联系**，须是从 $W$ 到 $E$ 的多对一且 $W$ 完全参与——再配上 $W$ 的一个**部分码**（鉴别器），用来区分同一属主之下的各弱实体。$W$ 的码是 $E$ 的码加上部分码。
:::

Section 是弱实体集，属主为 Course，部分码为 (term, num)；其码为 (code, term, num)。删除一门课必须删除它的教学班（它们离开属主不能存在），在 SQL 中就是该外码上的 `ON DELETE CASCADE`。弱实体也可以反过来充当属主——某教学班的试卷由该班与试卷号来标识。

弱实体集总可以通过杜撰一个标识符（一个 `section_id` 计数器）变成强的，许多真实模式正是这么做的。当自然标识符对用户有实际意义、且归属关系应当被强制时，弱形式更好；当自然码很长、会变化、或被许多张表引用时，代理码更好。

## 特化与概化

学生和教师共享一些属性——都是有人名、电子邮箱和出生日期的人——又各有各的属性与联系。

::: definition 特化 {#def-isa}
**特化**（ISA 层次）把实体集 $S_1, \dots, S_m$ 声明为**超类** $E$ 的**子类**：$S_i$ 的每个实体都是 $E$ 的实体，继承 $E$ 的属性与码，并可以有它自己的属性与联系。若没有实体同时属于两个子类，特化是**不相交**的，否则是**重叠**的；若 $E$ 的每个实体都属于某个子类，特化是**完全**的（覆盖的），否则是**部分**的。由现存的实体集构造超类称为**概化**。
:::

若 Person(pid, name, email) 有子类 Student(year) 与 Lecturer(office)，则这一特化是重叠的（博士生也可能任课）也是部分的（行政人员两者皆非）。翻译它共有三种标准做法：

1. **每个实体集一张表** — Person(pid, name, email)、Student(pid, year)、Lecturer(pid, office)，各子类的 pid 是引用 Person 的外码。它适用于一切情形，但读出一名学生的完整信息需要连接。
2. **每个子类一张表** — Student(pid, name, email, year)、Lecturer(pid, name, email, office)。这避免了连接，却只适用于完全特化（否则行政人员无处安放）；对重叠的特化，同时属于两个子类的人，其 name 与 email 会重复存储。
3. **单张表** — Person(pid, name, email, is_student, year, is_lecturer, office)，不适用的属性取空。查询简单，但空值会多起来（[[#ex-isa-nulls]]），而"year 非空当且仅当 is_student"一类的约束需要 `CHECK` 子句。

::: example ISA 翻译方案的选择 {#ex-isa}
某体育中心记录 Member(mid, name, phone)，其不相交的子类为 Junior(guardian, school) 与 Senior(employer)，还有两者都不是的会员（临时来访者）。应当选择哪种翻译？为什么？
::: solution
该特化是不相交且*部分*的（临时来访者不属于任何一个子类的会员）。策略 2 被排除：临时来访者将无处安放。策略 3 得到一张表 Member(mid, name, phone, kind, guardian, school, employer)，其中每一行的最后三列里总有二三列为空，并且需要类似 `CHECK ((kind = 'junior') = (guardian IS NOT NULL))` 的检查来保持类型列一致。策略 1 得到 Member(mid, name, phone)、Junior(mid, guardian, school) 与 Senior(mid, employer)，后两者带引用 Member 的外码；不相交性不会自动成立——同一个 mid 可能同时出现在 Junior 与 Senior 之中——需要触发器，或把 `kind` 列复制进子类的码。

子类属性不多、查询以列出全体会员为主时，单张表是个合理的选择；子类专属的属性和联系很多（只有 Junior 有需要在表格上签字的监护人）时，策略 1 让模式保持干净。这个决定取决于负载，而不只看图。
:::
:::

## 从 ER 设计到关系模式

设计一旦定下，翻译就是机械的。下面把它写成算法，再逐一论证。

::: algorithm ER 到关系的翻译 {#alg-er-translate}
1. **强实体集。** 为每个强实体集 $E$ 建一张表，含其简单属性（复合属性摊平为各组成部分），并以它的码为主码。
2. **弱实体集。** 对属主为 $E$ 的每个弱实体集 $W$，建一张表，含 $W$ 的属性以及作为外码的 $E$ 的码（`ON DELETE CASCADE`）；主码是属主的码加上部分码。
3. **多对一联系。** 对每个从 $A$ 到 $B$ 多对一的二元联系 $R$，把 $B$ 的码作为一列外码加进 $A$ 的表，连同 $R$ 的属性。若 $A$ 完全参与，该列声明为 `NOT NULL`。若 $R$ 是一对一的，则只在一侧加这一列并声明 `UNIQUE`（存在完全参与的一侧时，选完全的一侧以避免空值）。
4. **多对多与更高元的联系。** 对每个其余的联系集 $R$，建一张表，其列是全体参与者的码（各为外码，实体集重复出现时用角色名区分）以及 $R$ 的属性；其主码由 [[#prop-rel-key]] 给出（当元数 $k > 2$ 时，取不在任何函数性约束的"一"侧的那些参与者的码）。
5. **多值属性。** 对 $E$ 的每个多值属性 $M$，建一张表，含 $E$ 的码（外码）与 $M$；二者共同构成主码。
6. **特化。** 每个 ISA 层次用 [[#def-isa]] 的三种策略之一翻译。
:::

::: proposition 把多对一联系折叠进表中 {#prop-fold}
在 [[#alg-er-translate]] 的第 3 步中，把从 $A$ 到 $B$ 的多对一联系 $R$ 存成 $A$ 的表的一列，与存成单独的表 $R(K_A, K_B)$ 所表示的信息完全相同，且 $A$ 的表的码不变。若 $A$ 在 $R$ 中部分参与，该列必须允许空值。
:::

::: proof
由 [[#prop-rel-key]]，$K_A$ 是单独表 $R(K_A, K_B, \ldots)$ 的一个码：每个 $a$ 至多出现在一行中。于是 $R$ 是一个部分函数 $a \mapsto (b, \text{属性})$，把它的值存进 $a$ 的那一行——当 $a$ 没有关联时存空——就在两个设计的合法实例之间建立了一个双射。$A$ 的表的行仍由 $K_A$ 标识，因为每个 $a$ 仍恰有一行。若某个 $a$ 没有关联（部分参与），它的行就需要在新列中有一个值，而只有空能表达"没有关联的 $b$"；完全参与时该列永不为空，`NOT NULL` 强制的正是这一点。
:::

上述证明也说明了这一翻译为什么对多对多联系行不通：$A$ 的表的一列对每个 $a$ 只能放一个 $b$。硬塞若干个（比如把课程号写成逗号分隔的列表）会破坏第一范式，并让连接、码与约束都"看不见"这些数据。

::: example 翻译大学设计 {#ex-university}
翻译本章的大学设计——Student、Course、Department、Lecturer、弱实体集 Section（属主 Course，部分码为学期与班号）、Enrolled（Student–Section，多对多，属性 grade）、Teaches（Section → Lecturer，Section 完全参与）、Offers（Course → Department，Course 完全参与）、WorksIn（Lecturer → Department，Lecturer 完全参与）、Head（Department–Lecturer，一对一，两侧都部分参与）、Prereq（Course–Course，多对多）——并把结果跑起来。
::: solution
[[#alg-er-translate]] 的第 1–4 步给出七张表。Teaches、Offers 与 WorksIn 变成外码列；Head 变成 Department 的一个 `UNIQUE` 列（它同样可以放进 Lecturer，但那样几乎每名教师的行都要存一个空值）；Enrolled 与 Prereq 成为表。在 SQLite 3.46.1 中：

```sql
PRAGMA foreign_keys = ON;
CREATE TABLE Department (
  dname    TEXT PRIMARY KEY,
  building TEXT,
  head     INTEGER UNIQUE REFERENCES Lecturer(lid)   -- 一对一、部分参与：可以为 NULL
);
CREATE TABLE Lecturer (
  lid    INTEGER PRIMARY KEY,
  name   TEXT NOT NULL,
  dname  TEXT NOT NULL REFERENCES Department(dname)  -- WorksIn：多对一、完全参与
);
CREATE TABLE Course (
  code    TEXT PRIMARY KEY,
  title   TEXT NOT NULL,
  credits INTEGER NOT NULL,
  dname   TEXT NOT NULL REFERENCES Department(dname) -- Offers：多对一、完全参与
);
CREATE TABLE Section (                               -- 弱实体，属主为 Course
  code   TEXT REFERENCES Course(code) ON DELETE CASCADE,
  term   TEXT,
  num    INTEGER,
  lid    INTEGER NOT NULL REFERENCES Lecturer(lid),  -- Teaches：多对一、完全参与
  PRIMARY KEY (code, term, num)
);
CREATE TABLE Student (sid INTEGER PRIMARY KEY, name TEXT NOT NULL, year INTEGER);
CREATE TABLE Enrolled (                              -- 多对多，带属性
  sid   INTEGER REFERENCES Student(sid),
  code  TEXT, term TEXT, num INTEGER,
  grade TEXT,
  PRIMARY KEY (sid, code, term, num),
  FOREIGN KEY (code, term, num) REFERENCES Section ON DELETE CASCADE
);
CREATE TABLE Prereq (                                -- 递归联系，带角色
  course TEXT REFERENCES Course(code),
  needs  TEXT REFERENCES Course(code),
  PRIMARY KEY (course, needs)
);
```

插入两个系、三名教师（CS 的 Rao 与 Kim，MA 的 Silva）、CS101 与 MA101 的三个教学班以及三条选课记录后，约束的表现正如设计：

```console
$ sqlite3 -cmd "PRAGMA foreign_keys=ON" er.db "UPDATE Department SET head = 10 WHERE dname = 'MA';"
Error: stepping, UNIQUE constraint failed: Department.head (19)
$ sqlite3 -cmd "PRAGMA foreign_keys=ON" er.db "INSERT INTO Course VALUES ('CS999','Orphan',5,NULL);"
Error: stepping, NOT NULL constraint failed: Course.dname (19)
$ sqlite3 -cmd "PRAGMA foreign_keys=ON" er.db "DELETE FROM Course WHERE code='CS101'; SELECT COUNT(*) FROM Section; SELECT COUNT(*) FROM Enrolled;"
1
1
```

Rao（教师 10）已经是 CS 的系主任，不能再兼任 MA 的主任：一对一。一门没有系的课程被拒绝：完全参与。删除 CS101 会级联到它的两个教学班，再由教学班级联到它们的两条选课记录，只剩一个教学班和一条选课记录（MA101）。（`PRAGMA` 必须在每个连接上执行，所以上面用了 `-cmd` 选项。）

注意这里的循环引用：Department.head 引用 Lecturer，而 Lecturer.dname 引用 Department。因此插入行时必须采用同时满足两者的顺序——先插系、head 置空，再插教师，最后填系主任——或者把约束声明为 `DEFERRABLE INITIALLY DEFERRED`，把检查推迟到事务结束（[[databases/transactions]]）。
:::
:::

整个设计——实体集与联系集都是——构成一张图，查询沿着图中的路径行进：Ada 所在教学班的任课教师姓名，沿路径 Student — Enrolled — Section — Teaches — Lecturer 到达。

::: widget graph
nodes: Student@0,1; Enrolled@1,1; Section@2,1; Course@3,1; Teaches@2,0; Lecturer@3,0; WorksIn@4,0; Department@4,1; Offers@3.5,1.6; Head@4.6,0.5; Prereq@3,2
edges: Student-Enrolled; Enrolled-Section; Section-Course; Section-Teaches; Teaches-Lecturer; Lecturer-WorksIn; WorksIn-Department; Course-Offers; Offers-Department; Department-Head; Head-Lecturer; Course-Prereq
algorithm: bfs
start: Student
caption: 把大学设计画成图：实体集（Student、Section、Course、Lecturer、Department）与联系集（Enrolled、Teaches、WorksIn、Offers、Head、Prereq）交替排布；边 Section–Course 是 Section 的识别联系。从 Student 出发做广度优先搜索，能找到从学生到其他一切对象的最短连接链——Lecturer 相隔 $4$ 步，Department 视路线相隔 $5$ 步或 $6$ 步。翻译之后，多对一联系消失为外码列，于是每一对这样的步骤都化为一次连接。
:::

::: quiz
Student 与 Lecturer 之间的联系 Advises 从 Student 到 Lecturer 多对一，并且每名学生都必须有一名导师。应当如何翻译？
- [ ] 建表 Advises(sid, lid)，主码 (sid, lid)。
- [x] 在 Student 中加一列 `adviser`，引用 Lecturer，并声明 `NOT NULL`。
- [ ] 在 Lecturer 中加一列 `advisee`，引用 Student。
- [ ] 在 Student 中加一列 `adviser`，声明 `UNIQUE`。
::: solution
从 Student 出发多对一，意味着每名学生至多一名导师，于是由 [[#prop-fold]]，教师的码可以存进学生的行中；完全参与使它必须 `NOT NULL`。以 (sid, lid) 为码的表会允许一名学生有两名导师。放在 Lecturer 中的列每名教师只能存一名被指导者。`UNIQUE` 会禁止两名学生共享一名导师，把联系变成一对一。
:::
:::

## 设计抉择与常见错误

ER 建模并不唯一：同一组需求允许若干正确的设计，诀窍在于选择那个用最少的冗余抓住用户真正在意的规则的设计。

- **实体还是属性？** Department 本可以作为 Course 的一个字符串属性。当它有自己的属性（building、head）或参与其他联系时，把它做成实体集；否则一个属性就够了，也许再配一个检查约束或一张列出合法取值的小型参照表。
- **实体还是联系？** 一条选课记录既可以作为联系（如这里），也可以作为带自己的码的实体 Enrolment。当该事物有自己的身份时——同一对参与者之间它可能出现多次，或者其他事物要引用它——就选实体。
- **属性该放在哪一侧？** 成绩属于 Enrolled，既不属于 Student（一名学生有多门成绩）也不属于 Section（一个班有多名学生）。属性放错一侧会造成重复——正是 [[databases/normalisation]] 中的那些异常。
- **冗余的联系。** 若 Course–Department（Offers）已经存储，联系 Section–Department 就是冗余的：它可以经由 Course 导出。存下它就等于招致不一致。

::: warning 从样例数据读出的基数只是猜测
看着今天的数据、发现没有一个班有两名教师，并不能说明 Teaches 是多对一的；只能说明它*目前还没发生*。设计中的约束是模式要永远强制执行的承诺，而过紧的约束——该建联系表的地方放了一个 `UNIQUE` 或外码列——会让合法的事实无从记录，实际中就会引来变通做法，比如把第二名教师打进备注栏。过松的设计有相反的问题：它们连胡说八道都照收。每个基数都要问过懂规则的人才能定下，并记录下理由。
:::

有些规则超出了 ER 模型的能力："系主任在本系工作"联系着两个联系（Head 与 WorksIn）。它仍然可以在 SQL 中强制执行：用复合外码（[[#ex-head]]）、在支持的环境下用带子查询的 `CHECK`，或者用触发器。把这类规则连同图一起记录下来，也是设计的一部分。

::: example 基数的算术 {#ex-min-max}
某辅导课安排中，每名学生恰好参加 $2$ 个辅导组，每组恰好 $5$ 名学生。若有 $30$ 名学生，组数是多少？能有 $31$ 名学生吗？
::: solution
对 Attends 的联系数两面计数：每名学生贡献 $2$，每组贡献 $5$，故 $2 \cdot \lvert \text{Student} \rvert = 5 \cdot \lvert \text{Group} \rvert$。$30$ 名学生时有 $60$ 次参加、$12$ 个组。$31$ 名学生时，$62$ 次参加必须等于 $5\lvert\text{Group}\rvert$，而 $5 \nmid 62$，不可能。于是两侧精确的 (min, max) 约束会让某些实体数目根本不可能出现——只有当 $\lvert\text{Student}\rvert$ 是 $5$ 的倍数时约束才相容。这一双重计数论证就是[数学图谱：图](/learn/maths/lesson.php?c=discrete&l=graphs)中的握手引理，施加于该联系对应的二分图上。
:::
:::

::: history
陈品山（Peter Pin-Shan Chen）在《The entity-relationship model — toward a unified view of data》（*ACM Transactions on Database Systems*，1976）中提出了实体-联系模型，主张把它作为数据的网状、关系与实体集观点之间的桥梁，并配套提出了菱形-矩形图记法。面向特化、概化与聚合的扩充在 1970 年代末和 1980 年代相继出现（John 与 Diane Smith 的《Database abstractions: aggregation and generalization》，1977，引入了后两个术语），最终形成了教科书中的"增强"ER 模型。鸦爪（Crow's-foot）记法源自 Gordon Everest 在 1976 年前后的工作，在工业工具中广为流行；UML 类图（1997 年标准化）如今也被广泛用于同一目的。[[#alg-er-translate]] 的关系翻译是 1970 年代末的业内常识，稍加变体地出现在每一本数据库教科书里。
:::

## 后续内容

ER 设计确定了有哪些表、彼此如何引用，却没有确定每张表是否没有冗余：把系馆放进 Course 实体集的设计，会毫无怨言地翻译成一张每门课都重复一次系馆的表。函数依赖与范式（[[databases/normalisation]]）为这类问题提供了精确的检验和修复它们的算法，本章求出的码正是它们的出发点。设计中的联系成为查询的连接路径（[[databases/sql]]），也成为优化器用来估计连接大小时依赖的外码（[[databases/query-optimisation]]）。更大的系统还要为软件设计建模数据——UML 与领域建模见 [[software-engineering]]。

::: summary
- 概念设计在任何表写出来之前，抓住**实体集**、它们的**属性**与**码**，以及带自身属性的**联系集**。
- **基数**（多对一、一对一、多对多）与**参与**（完全或部分）约束是关于世界的论断；它们变成码、外码、`UNIQUE` 与 `NOT NULL`。
- 二元联系集的码：多对多时为 $K_A \cup K_B$，从 $A$ 出发多对一时为 $K_A$（[[#prop-rel-key]]）。
- **三元**联系不是由它的三个二元投影决定的（[[#prop-ternary]]）。
- **弱实体集**由属主的码加上部分码来标识；它指向属主的外码在删除时级联。
- ISA 层次可以翻译成：每个实体集一张表、每个子类一张表，或含空值的单张表——在连接、重复与空值之间权衡。
- [[#alg-er-translate]] 把设计机械地变成表；多对一联系折叠为外码列（[[#prop-fold]]），多对多联系需要自己的表。
:::

## 习题

::: exercise 联系数目的上界 {level=1 check="240"}
某大学有 $40$ 名学生和 $6$ 个社团，Member 是它们之间的多对多联系。Member 中联系数目的最大可能值是多少？若 Member 是从 Student 到 Club 的多对一联系，又会是多少？（输入第一个数。）
::: solution
多对多联系集是 Student $\times$ Club 的子集，所以至多有 $40 \cdot 6 = 240$ 条联系（每名学生都在每个社团里）。若是从 Student 出发的多对一联系，每名学生至多出现一次，故至多 $40$ 条。
:::
:::

::: exercise 由基数求码 {level=1}
Patient 的码为 pid，Doctor 的码为 did，Ward 的码为 wid。给出每个联系集对应表的主码：(a) Treats，Patient 与 Doctor 之间的多对多联系，带属性 since；(b) AdmittedTo，从 Patient 到 Ward 的多对一联系；(c) Manages，Doctor 与 Ward 之间的一对一联系。
::: solution
由 [[#prop-rel-key]]：(a) (pid, did)；属性 since 不是码的组成部分。(b) pid——而且由 [[#prop-fold]]，它通常会被折叠进 Patient，成为一列 `wid`。(c) did 与 wid 都是候选码；选一个作主码，另一个声明 `UNIQUE`；或者把联系折叠进 Ward，成为一个 `UNIQUE` 列 `manager`。
:::
:::

::: exercise 数一数表 {level=1 check="6"}
某设计含强实体集 Author、Book 与 Publisher；多对多联系 Wrote(Author, Book)，带属性 position；从 Book 到 Publisher 的多对一联系 PublishedBy；Book 的多值属性 keywords；以及属主为 Book 的弱实体集 Edition。[[#alg-er-translate]] 会产生多少张表？（输入数字。）
::: solution
Author、Book、Publisher（第 1 步）、Edition（第 2 步）、Wrote（第 4 步）与 BookKeyword（第 5 步）：$6$ 张表。PublishedBy 成为 Book 的外码列 `publisher`（第 3 步），不是表。
:::
:::

::: exercise 一个图书馆设计 {level=2}
某图书馆出借纸质图书。一部书（ISBN、题名、年份）有若干册，每册在该书内按 $1, 2, \ldots$ 编号，并有架位。会员（会员号、姓名）借阅册次；一条借阅记录记下借出日期与归还日期（未归还时为空），同一名会员日后还可以再借同一册。用文字画出 ER 设计，并翻译成带码的表。
::: solution
实体集：Book($\underline{\text{isbn}}$, title, year)、Member($\underline{\text{mno}}$, name)，以及作为*弱*实体集的 Copy，属主为 Book，部分码为 copy_no，属性为 shelf。Loan 不能是 Member 与 Copy 之间的普通联系集，因为同一对可能出现多次（联系集对每对只存一次）。要么把 Loan 做成带代理码的实体集，要么做成码中包含 date_out 的联系——假定同一册书同一天不会外借两次。表：

- Book(isbn, title, year)，主码 isbn；
- Copy(isbn, copy_no, shelf)，主码 (isbn, copy_no)，isbn 引用 Book 且 `ON DELETE CASCADE`；
- Member(mno, name)；
- Loan(isbn, copy_no, date_out, mno, date_returned)，主码 (isbn, copy_no, date_out)，(isbn, copy_no) 引用 Copy，mno 引用 Member 且 `NOT NULL`。

"同一册书同一时刻至多借给一名会员"这条规则这些码管不住；它需要检查同一册的任意两条借阅的时段不重叠，通常用一个触发器（或者，在 PostgreSQL 中，用一个排他约束）。
:::
:::

::: exercise 三元还是二元？ {level=2}
某公司记录哪位工程师在哪个项目上使用了哪项技能。用 [[#prop-ternary]] 解释：Uses(Engineer, Skill, Project) 何时可以被 HasSkill(Engineer, Skill)、Needs(Project, Skill) 与 WorksOn(Engineer, Project) 取代；并给出一个实例，说明不能取代时会丢失什么。
::: solution
二元设计只存那三个投影。它正确，恰在业务规则说"只要工程师具有某技能、项目需要该技能、且她从事该项目，她就在该项目上使用该技能"之时——此时三元关系就是三个二元关系的连接，毫无丢失。若工程师只在部分项目上使用自己的部分技能，就必须用三元。实例：Ana 具有 SQL 与 Java 技能，从事项目 P 与 Q；P 需要 SQL 与 Java，Q 需要 SQL。若她在 P 上使用 Java、只在 Q 上使用 SQL，则三元关系是 {(Ana, Java, P), (Ana, SQL, Q)}，但三个投影的连接还含有 (Ana, SQL, P)——一个并不成立的事实。
:::
:::

::: exercise 单表 ISA 中的空值 {#ex-isa-nulls level=2 check="3300"}
Person 有 $1000$ 个实体，作不相交、部分的特化，子类为 Student（$700$ 个实体，$2$ 个自有属性）与 Staff（$100$ 个实体，$3$ 个自有属性）；其余 $200$ 个两者皆非。用单表策略时，子类的属性列中一共含多少个空值？（输入数字。）
::: solution
单表共有 $5$ 个子类列。学生行让 $3$ 个职员列取空：$700 \cdot 3 = 2100$。职员行让 $2$ 个学生列取空：$100 \cdot 2 = 200$。两者皆非的行让全部 $5$ 列取空：$200 \cdot 5 = 1000$。合计 $3300$ 个空值，占 $5000$ 个子类单元格的三分之二。改用每个实体集一张表，就一个空值也不会有。
:::
:::

::: exercise 完全参与的一对一联系 {level=2}
每名员工恰好配有一辆公司汽车，而每辆车至多分配给一名员工（有些车是备用车）。该联系在表中应当放在哪里？用哪些约束让模式强制这条规则？
::: solution
该联系是一对一的，对 Employee 完全参与、对 Car 部分参与。按照 [[#alg-er-translate]] 的第 3 步，把它放在完全参与的一侧：Employee(eid, …, car NOT NULL UNIQUE REFERENCES Car)。`NOT NULL` 强制每名员工都有车，`UNIQUE` 强制没有车属于两名员工，外码强制车确实存在。备用车就是没有员工引用的车。把这一列改放进 Car（`driver UNIQUE`）则备用车不得不用空值，而且无法强制每名员工都有车。
:::
:::

::: exercise 系主任在本系工作 {#ex-head level=3}
[[#ex-university]] 拦不住由 CS 的教师出任 MA 的系主任。说明如何用复合外码——只用 `PRIMARY KEY`、`UNIQUE` 与 `FOREIGN KEY`——强制执行"系主任在本系工作"，并在 SQLite 中试验。
::: solution
把 (lid, dname) 做成 Lecturer 的可供引用的码——因为 lid 是码，它是超码——再让 Department 引用对 (head, dname)：

```sql
PRAGMA foreign_keys = ON;
CREATE TABLE Department (
  dname TEXT PRIMARY KEY,
  head  INTEGER UNIQUE,
  FOREIGN KEY (head, dname) REFERENCES Lecturer (lid, dname)
);
CREATE TABLE Lecturer (
  lid   INTEGER PRIMARY KEY,
  dname TEXT NOT NULL REFERENCES Department(dname),
  UNIQUE (lid, dname)                  -- 复合外码的引用目标
);
INSERT INTO Department (dname) VALUES ('CS'), ('MA');
INSERT INTO Lecturer VALUES (10, 'CS'), (11, 'MA'), (12, 'CS');
UPDATE Department SET head = 10 WHERE dname = 'CS';
UPDATE Department SET head = 11 WHERE dname = 'MA';
SELECT * FROM Department;
UPDATE Department SET head = 12 WHERE dname = 'MA';
```

```console
$ sqlite3 h.db < head.sql
CS|10
MA|11
Runtime error near line 17: FOREIGN KEY constraint failed (19)
```

让 Kim（12，在 CS）出任 MA 的系主任需要一行 Lecturer (12, 'MA')，而它不存在，于是这个更新被拒绝。`head` 为空时，复合外码不受检查（SQL 默认的 `MATCH SIMPLE` 规则会忽略任何含空分量的外码），所以一个系仍然可以暂时没有主任。
:::
:::

::: exercise 基数约束的相容性 {level=3 check="3"}
实体集 $A$ 与 $B$ 由 $R$ 相联系。每个 $a \in A$ 恰好参与 $2$ 条联系，每个 $b \in B$ 恰好参与 $3$ 条，且 $R$ 是一个集合（不含重复的对）。证明 $\lvert A \rvert$ 必为 $3$ 的倍数，并求出使合法实例存在的最小的正 $\lvert A\rvert$。（输入那个数。）
::: solution
从两侧数联系数：$\lvert R\rvert = 2\lvert A\rvert = 3\lvert B\rvert$，所以 $3 \mid 2\lvert A\rvert$，而 $\gcd(2, 3) = 1$，故 $3 \mid \lvert A\rvert$。$\lvert A\rvert = 3$ 时需要 $\lvert B\rvert = 2$ 与 $6$ 条联系：让每个 $a_i$ 同时联系 $b_1$ 与 $b_2$。每个 $a$ 有 $2$ 个伙伴，每个 $b$ 有 $3$ 个，没有对被重复。所以最小的正规模是 $3$。（一般地，对每个 $\lvert A\rvert = 3k$、$\lvert B\rvert = 2k$ 实例都存在：取 $k$ 份互不相交的副本即可。）
:::
:::

::: exercise 检验翻译 {level=3}
为上面图书馆习题的设计写出 SQL，并用带参数化查询的 Python 检验三件事：删除一部书会删除它的各册；借阅不存在的册次会被拒绝；同一名会员可以在两个不同日期借阅同一册，但在同一日期不能借两次。
::: solution
```python
import sqlite3
con = sqlite3.connect(":memory:")
con.execute("PRAGMA foreign_keys = ON")
con.executescript("""
CREATE TABLE Book (isbn TEXT PRIMARY KEY, title TEXT NOT NULL, year INTEGER);
CREATE TABLE Copy (isbn TEXT REFERENCES Book ON DELETE CASCADE, copy_no INTEGER,
                   shelf TEXT, PRIMARY KEY (isbn, copy_no));
CREATE TABLE Member (mno INTEGER PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE Loan (isbn TEXT, copy_no INTEGER, date_out TEXT, mno INTEGER NOT NULL
                   REFERENCES Member, date_returned TEXT,
                   PRIMARY KEY (isbn, copy_no, date_out),
                   FOREIGN KEY (isbn, copy_no) REFERENCES Copy ON DELETE CASCADE);
""")
con.execute("INSERT INTO Book VALUES (?, ?, ?)", ("978-0", "Dune", 1965))
con.executemany("INSERT INTO Copy VALUES (?, ?, ?)", [("978-0", 1, "A1"), ("978-0", 2, "A1")])
con.execute("INSERT INTO Member VALUES (?, ?)", (7, "Zoe"))
def loan(isbn, n, day):
    try:
        con.execute("INSERT INTO Loan VALUES (?, ?, ?, ?, NULL)", (isbn, n, day, 7))
        return "ok"
    except sqlite3.IntegrityError as e:
        return str(e)
print(loan("978-0", 1, "2026-03-01"), loan("978-0", 1, "2026-04-01"),
      loan("978-0", 1, "2026-04-01"), loan("978-0", 3, "2026-04-02"), sep=" | ")
con.execute("DELETE FROM Book WHERE isbn = ?", ("978-0",))
print(con.execute("SELECT COUNT(*) FROM Copy").fetchone()[0],
      con.execute("SELECT COUNT(*) FROM Loan").fetchone()[0])
```

```console
$ python3 library.py
ok | ok | UNIQUE constraint failed: Loan.isbn, Loan.copy_no, Loan.date_out | FOREIGN KEY constraint failed
0 0
```

新日期的第二次借阅被接受，同一日期的重复借阅违反主码，第 3 册不存在，而删除书会级联到它的各册、再由册次级联到借阅记录。借阅记录是否*应当*随书一起消失，本身就是一个设计问题——图书馆宁愿保留自己的历史，会改用 `ON DELETE RESTRICT` 并把撤下馆藏的书作标记。
:::
:::
