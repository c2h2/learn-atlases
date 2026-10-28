假设教务处没有采用贯穿示例中的那三张表，而是维护一张大表，每条选课记录占一行：

| sid | name | code | title | dept | building | grade |
|---|---|---|---|---|---|---|
| 1 | Ada | CS101 | Programming | CS | Turing | A |
| 1 | Ada | CS202 | Databases | CS | Turing | B |
| 1 | Ada | MA101 | Calculus | MA | Noether | A |
| 2 | Bao | CS101 | Programming | CS | Turing | C |
| 2 | Bao | MA210 | Statistics | MA | Noether | B |
| 3 | Chen | CS202 | Databases | CS | Turing | A |
| … | … | … | … | … | … | … |

它不需要任何连接就能回答所有问题，但这是一个糟糕的设计。Ada 的姓名存了三份，CS 系的教学楼则每出现一条 CS 课程的选课记录就被存一次。这些重复引起了**异常**：

- **更新异常**：CS 系搬进新教学楼时，每条 CS 课程的行都必须改动，程序若漏改一条，数据库就自相矛盾；
- **插入异常**：一门还没有学生选修的新课程根本无法录入，因为每一行都需要 sid（码的组成部分）；
- **删除异常**：在一个规模更小的示例中，若 Bao 退出 MA210——其中 MA210 是唯一一条 Statistics 的选课记录——那么 MA210 这门课叫 Statistics 的事实也随它一起消失。

病因在于这张表混杂了若干条彼此独立的事实——关于学生、关于课程、关于院系、关于选课——而它们的码各不相同。本章用**函数依赖**把这一诊断精确化，发展它们的逻辑（阿姆斯特朗公理与闭包算法），定义能排除这类冗余的**范式** BCNF 与 3NF，并给出把糟糕的模式分解为良好模式的算法，同时保证不丢失信息、约束仍能检查。我们会证明每一条保证：这是计算机科学中为数不多的、设计规则附带定理的地方之一。

## 函数依赖

::: definition 函数依赖 {#def-fd}
设 $X, Y$ 是关系模式 $R$ 的属性集。若 $R$ 上的关系 $r$ 中任意两个在 $X$ 的全部属性上取值相同的元组，在 $Y$ 的全部属性上也取值相同，则称 $r$ **满足** **函数依赖**（FD）$X \to Y$：

$$
\forall t, u \in r:\quad t[X] = u[X] \;\Rightarrow\; t[Y] = u[Y].
$$

若模式的一切合法实例都满足某个 FD，就称它在该模式上**成立**。若 $Y \subseteq X$，称它是**平凡的**（此时一切关系都满足它）。
:::

只要不会引起混淆，我们写属性集时省略花括号与逗号：$\text{sid}\,\text{code} \to \text{grade}$，单字母属性则写作 $AB \to C$。上面那张大表满足下面这组 FD，大学的规则也保证了它们：

$$
F = \set{\text{sid} \to \text{name},\ \ \text{code} \to \text{title}\,\text{dept},\ \ \text{dept} \to \text{building},\ \ \text{sid}\,\text{code} \to \text{grade}}.
$$ {#eq-uni-fds}

函数依赖推广了码：$K$ 是 $R$ 的超码，当且仅当 $K \to R$ 成立（[[databases/relational-model#def-key]]）。与码一样，它们是关于一切合法实例的陈述，因此来自应用的规则，而不是来自对数据的考察。一个实例可以*反驳*一个 FD（两个元组在 $X$ 上一致却在 $Y$ 上不一致），却永远无法证明一个 FD。

### 蕴含与阿姆斯特朗公理

给定 $F$ 之后，还有别的 FD 随之成立：由 $\text{code} \to \text{dept}$ 与 $\text{dept} \to \text{building}$，每个合法实例还满足 $\text{code} \to \text{building}$。若每个满足 $F$ 中全部 FD 的关系都满足 $X \to Y$，就称 $F$ **蕴含** $X \to Y$，记作 $F \models X \to Y$。**闭包** $F^+$ 是 $F$ 所蕴含的一切 FD 的集合。蕴含是一个语义概念；威廉·阿姆斯特朗（William Armstrong）给出了一组规则，推出的恰好就是那些被蕴含的 FD。

::: definition 阿姆斯特朗公理 {#def-armstrong}
对属性集 $X, Y, Z$：
1. **自反律**：若 $Y \subseteq X$，则 $X \to Y$。
2. **增强律**：若 $X \to Y$，则 $XZ \to YZ$。
3. **传递律**：若 $X \to Y$ 且 $Y \to Z$，则 $X \to Z$。

若 $X \to Y$ 能由 $F$ 经过有限次套用这些规则推出，记作 $F \vdash X \to Y$。
:::

由此可得三条常用规则。**合并律**：由 $X \to Y$ 与 $X \to Z$，增强给出 $X \to XY$ 与 $XY \to YZ$，传递给出 $X \to YZ$。**分解律**：由 $X \to YZ$ 与 $YZ \to Y$（自反律），得 $X \to Y$。**伪传递律**：由 $X \to Y$ 与 $WY \to Z$，增强给出 $WX \to WY$，于是 $WX \to Z$。由合并律与分解律，$X \to A_1 \cdots A_k$ 等价于 $k$ 个 FD $X \to A_i$，因此总可以假定 FD 的右部是单个属性。

::: theorem 阿姆斯特朗公理的有效性与完备性 {#thm-armstrong}
对 $R$ 上的任意 FD 集 $F$ 与一切 $X, Y \subseteq R$：$F \vdash X \to Y$ 当且仅当 $F \models X \to Y$。
:::

完备性的证明要用到属性闭包，它本身也是实践中最主要的工具。

::: definition 属性闭包 {#def-closure}
$X$ 在 $F$ 之下的**闭包** $X^+ = \set{A \in R : F \vdash X \to A}$，即 $X$ 所决定的属性之集。
:::

由合并律与分解律，$F \vdash X \to Y$ 当且仅当 $Y \subseteq X^+$。因此，检验任何 FD，以及检验 $X$ 是否为超码（$X^+ = R$），只要算出 $X^+$ 就够了。

::: algorithm 属性闭包 {#alg-closure}
输入：属性集 $X$ 与 FD 集 $F$。输出：$X^+$。
1. $Z \gets X$。
2. 反复执行直到 $Z$ 不再变化：对 $F$ 中每个 FD $V \to W$，若 $V \subseteq Z$，则 $Z \gets Z \cup W$。
3. 返回 $Z$。
:::

```python
def closure(X, F):
    """Attribute closure X+ under FDs F, a list of (lhs, rhs) pairs of sets."""
    result = set(X)
    changed = True
    while changed:
        changed = False
        for lhs, rhs in F:
            if lhs <= result and not rhs <= result:
                result |= rhs              # lhs 已被决定，rhs 也随之被决定
                changed = True
    return result
```

对 $F$ 的每一遍扫描要么加入一个新属性，要么使循环结束，故扫描至多 $\lvert R \rvert + 1$ 遍，运行时间为 $O(\lvert R\rvert \cdot \lVert F\rVert)$，其中 $\lVert F \rVert$ 是全部 FD 的总规模。（一个更聪明的、使用计数器的版本可做到线性时间 $O(\lVert F\rVert)$，正如霍恩子句的单元传播。）

::: proof [[#thm-armstrong]] 的证明
*有效性*（由 $\vdash$ 推出 $\models$）：我们证明每条规则在任何关系 $r$ 中都保持"满足"。自反律：若 $t[X] = u[X]$ 且 $Y \subseteq X$，则 $t[Y] = u[Y]$。增强律：若 $t[XZ] = u[XZ]$，则 $t[X] = u[X]$，于是由 $X \to Y$ 得 $t[Y] = u[Y]$，再结合 $t[Z] = u[Z]$ 得 $t[YZ] = u[YZ]$。传递律：$t[X] = u[X]$ 给出 $t[Y] = u[Y]$，后者给出 $t[Z] = u[Z]$。对推导的长度作归纳，即得每个推出的 FD 都在每个满足 $F$ 的 $r$ 中成立。

*闭包算法正确*：设 $Z$ 是 [[#alg-closure]] 的输出。每个被加入的属性都是可推出的：初始时由自反律有 $F \vdash X \to Z$；若 $F \vdash X \to Z$ 且 $V \to W \in F$ 而 $V \subseteq Z$，则 $X \to V$（分解律）、$X \to W$（传递律）且 $X \to Z \cup W$（合并律）。所以 $Z \subseteq X^+$；反向包含由我们接下来要证明的内容得出。

*完备性*（由 $\models$ 推出 $\vdash$）：设 $F \nvdash X \to Y$；我们构造一个满足 $F$ 但不满足 $X \to Y$ 的关系。设 $Z$ 是对 $X$ 运行 [[#alg-closure]] 的输出，于是 $Y \not\subseteq Z$——否则上面的推导就会给出 $F \vdash X \to Y$。令 $r = \set{t, u}$，其中 $t$ 在每个属性上取值 $0$，$u$ 在 $Z$ 上取值 $0$、在其余属性上取值 $1$。则 $r$ 违反 $X \to Y$，因为 $t, u$ 在 $X \subseteq Z$ 上一致，而在 $Y - Z$ 的某个属性上取值不同。而 $r$ 满足 $F$ 中的每个 $V \to W$：若 $t, u$ 在 $V$ 上一致，则 $V \subseteq Z$；由于算法已经停机，$W \subseteq Z$，故 $t, u$ 在 $W$ 上一致。于是 $F \not\models X \to Y$。取逆否命题即得完备性；这同时表明输出 $Z$ 包含每个满足 $F \models X \to A$ 的 $A$，故 $Z = X^+$。
:::

::: example 选课大表的闭包与码 {#ex-closure}
对具有 FD [[#eq-uni-fds]] 的大表，计算 $\text{code}^+$、$\text{sid}^+$ 与 $(\text{sid}\,\text{code})^+$，并找出全部候选码。
::: solution
$\text{code}^+$：从 $\set{\text{code}}$ 出发；$\text{code} \to \text{title}\,\text{dept}$ 加入 title 与 dept；此时 $\text{dept} \to \text{building}$ 可用，加入 building；再无规则可用。故 $\text{code}^+ = \set{\text{code}, \text{title}, \text{dept}, \text{building}}$。

$\text{sid}^+ = \set{\text{sid}, \text{name}}$。

$(\text{sid}\,\text{code})^+$：包含上面两者，随后 $\text{sid}\,\text{code} \to \text{grade}$ 加入 grade：全部七个属性。故 $\set{\text{sid}, \text{code}}$ 是超码。

候选码：sid 与 code 都不出现在任何右部，因此每个超码都必须同时包含二者（别的东西决定不了它们）。故 $\set{\text{sid}, \text{code}}$ 是唯一的候选码。上面那个 Python 函数验证了全部三个闭包。一个有用的观察——凡不出现在任何右部的属性都属于每一个码——使手工找码变得很快。
:::
:::

当每个 FD 的左部都是单个属性时，闭包就是基本的图可达性：为每个 FD 画一条有向边 $A \to B$，$A^+$ 就是从 $A$ 可达的顶点之集。

::: widget graph
nodes: sid@0,1.5; name@1,2; code@0,0.5; title@1,1; dept@1,0; building@2,0; grade@2,1.5
edges: sid>name; code>title; code>dept; dept>building
algorithm: bfs
start: code
caption: [[#eq-uni-fds]] 中左部为单属性的 FD 视为有向图。从 code 出发广度优先搜索到达 title、dept 与 building——恰好是 $\text{code}^+$——而路径 code → dept → building 正是更新异常背后的那条传递依赖。改从 sid 出发：只能到达 name。FD $\text{sid}\,\text{code} \to \text{grade}$ 的左部有两个属性，这是图表示不出来的（grade 从二者中任意一个单独都不可达）；[[#alg-closure]] 之所以在集合而不是顶点上运算，原因正在于此。
:::

同一组 FD 也可以看成属性集上的一个二元关系。它的传递闭包包含一切可由传递性推出的单属性 FD：

::: widget relation
set: sid; name; code; title; dept; building; grade
pairs: sid,name; code,title; code,dept; dept,building
view: properties
editable: true
caption: [[#eq-uni-fds]] 中左部为单属性的 FD 视为属性集上的关系"决定"。它不是自反的——尽管由 [[#def-armstrong]] 中的自反律，每个属性都平凡地决定自身——也不是传递的：闭包补上了对子 (code, building)，即由传递性推出的 FD $\text{code} \to \text{building}$。点击矩阵添加对子 (building, dept)，看闭包如何增长；这条新规则会蕴含哪些 FD？
:::

### 覆盖

若 $F^+ = G^+$，则称 FD 集 $F$ 与 $G$ **等价**；此时称 $G$ 是 $F$ 的一个**覆盖**。检验方法：用闭包检验 $G$ 的每个 FD 是否被 $F$ 蕴含，反之亦然。覆盖较小时，算法的效果最好。

::: definition 最小覆盖 {#def-minimal-cover}
FD 集 $G$ 称为**最小的**，如果 (1) 每个 FD 的右部是单个属性；(2) $G$ 中没有左部含**多余属性**的 FD $X \to A$，即不存在某个 $B \in X$，使得把 $X \to A$ 换成 $(X - \set{B}) \to A$ 后得到的集合与 $G$ 等价；(3) 没有**冗余的** FD，即 $G - \set{X \to A}$ 与 $G$ 不等价。$F$ 的**最小覆盖**是与 $F$ 等价的最小集。
:::

计算最小覆盖分三步，且必须按此顺序：把右部拆成单个属性；对每个 FD $X \to A$ 和每个 $B \in X$，若 $A \in (X - \set B)^+$ 就去掉 $B$；然后对每个 FD $X \to A$，用*其余* FD 计算 $X^+$，若 $A \in X^+$ 就删去它。每个 FD 集都有最小覆盖，只是未必唯一。

::: example 计算最小覆盖 {#ex-cover}
求 $F = \set{A \to BC,\ B \to C,\ AB \to D,\ A \to D}$ 的一个最小覆盖。
::: solution
1. 右部拆成单属性：$A \to B$、$A \to C$、$B \to C$、$AB \to D$、$A \to D$。
2. 多余属性：只有 $AB \to D$ 的左部是复合的。$B$ 多余吗？$A^+ = \set{A, B, C, D}$ 包含 $D$，多余：于是把它换成 $A \to D$，与已有的一个 FD 重复。$A$ 多余吗？$B^+ = \set{B, C}$ 不包含 $D$，不多余——不过 $B$ 已经去掉了。
3. 冗余的 FD：$A \to C$ 是冗余的，因为由 $A \to B$ 与 $B \to C$ 可得 $A^+ \ni C$；重复的 $A \to D$ 也一并删去。$A \to B$ 不冗余（去掉它则 $A^+ = \set{A, C, D}$），$B \to C$ 不冗余（去掉它则 $B^+ = \set B$），$A \to D$ 也不冗余（去掉它则 $A^+ = \set{A, B, C}$）。

一个最小覆盖是 $\set{A \to B,\ B \to C,\ A \to D}$。若先做第 3 步再做第 2 步，可能留下冗余的 FD，这就是顺序要紧的原因。
:::
:::

## 范式

当一个非平凡 FD $X \to A$ 的左部 $X$ 不是超码时，冗余就产生了：许多元组可能共享同一个 $X$ 值，每一个都重复同一个 $A$ 值。最严格的范式禁止的恰恰就是这种情形。

::: definition Boyce–Codd 范式 {#def-bcnf}
若带有 FD 集 $F$ 的模式 $R$ 满足：对 $F^+$ 中每个满足 $X \cup Y \subseteq R$ 的非平凡 FD $X \to Y$，$X$ 都是 $R$ 的超码，则称 $R$ 属于 **Boyce–Codd 范式**（BCNF）。
:::

给定模式及其 FD 集，只检查 $F$ 中的 FD 就够了（若 $F$ 中所有左部都是超码，则每个推出的 FD 的左部也是超码，[[#ex-bcnf-check]]）。大表不属于 BCNF：在 $\text{code} \to \text{title}$ 中，属性 code 不是超码；$\text{sid} \to \text{name}$ 中的 sid 不是，$\text{dept} \to \text{building}$ 中的 dept 也不是。这些违反之处每一条都对应前述异常中的一个。

有时 BCNF 要求得过头了：不丢掉廉价检查 FD 的能力就满足不了，于是采用一个略弱一些的范式。

::: definition 第三范式 {#def-3nf}
若一个属性属于某个候选码，就称它为**主属性**。若带有 FD 集 $F$ 的模式 $R$ 满足：对 $F^+$ 中每个满足 $X \cup \set A \subseteq R$ 且 $A$ 为单个属性的非平凡 FD $X \to A$，或者 $X$ 是 $R$ 的超码，或者 $A$ 是主属性，则称 $R$ 属于**第三范式**（3NF）。
:::

BCNF 蕴含 3NF，因为 3NF 的第一个分支正是 BCNF 的条件。二者的差别落在右部属于码之一部分的 FD 上。经典例子：一个辅导安排——每位辅导教师只带一门课，每位学生每门课恰有一位辅导教师。取 $R = (\text{student}, \text{course}, \text{tutor})$，且

$$
F = \set{\text{tutor} \to \text{course},\quad \text{student}\,\text{course} \to \text{tutor}},
$$ {#eq-tutor}

候选码是 $\set{\text{student}, \text{course}}$ 与 $\set{\text{student}, \text{tutor}}$，于是三个属性全是主属性，$R$ 属于 3NF。但它不属于 BCNF：tutor 不是超码，而且对 Rao 辅导的每一位学生，表中都要重复一遍"Rao 教 CS101"。

（第一范式——取值原子——随关系模型一起引入；**第二范式**禁止非主属性依赖于候选码的一部分，如今只有历史意义：凡属于 3NF 的模式必属于 2NF。）

::: quiz
$R(A, B, C)$ 有 FD $\set{AB \to C,\ C \to A}$。它满足哪些范式？
- [ ] 既不属于 3NF，也不属于 BCNF。
- [x] 属于 3NF，但不属于 BCNF。
- [ ] 属于 BCNF，但不属于 3NF。
- [ ] 既属于 3NF，又属于 BCNF。
::: solution
候选码是 $AB$（$AB^+ = ABC$）与 $BC$（$BC^+ = \set{B, C, A}$）；单独的 $C$ 给出 $\set{A, C}$。于是 $A$、$B$、$C$ 全是主属性，每个 FD 都满足 3NF。但 $C \to A$ 的左部不是超码，故 $R$ 不属于 BCNF。这就是导师制示例，其中 $A$ = course、$B$ = student、$C$ = tutor。属于 BCNF 而不属于 3NF 是不可能的事，因为 BCNF 蕴含 3NF。
:::
:::

## 模式分解

对坏模式的治疗办法是把它**分解**：用满足 $R_1 \cup \dots \cup R_k = R$ 的模式 $R_1, \dots, R_k$ 取代 $R$，不再存 $r$，而是存 $r_i = \pi_{R_i}(r)$。两个性质决定一个分解是否可接受。

::: definition 无损连接与依赖保持 {#def-lossless}
若对 $R$ 上每个满足 $F$ 的关系 $r$ 都有

$$
r = \pi_{R_1}(r) \bowtie \pi_{R_2}(r) \bowtie \dots \bowtie \pi_{R_k}(r),
$$

则称 $R$ 的分解 $\set{R_1, \dots, R_k}$ 关于 $F$ 是**无损的**（具有无损连接）。若各投影 $F_i = \set{X \to Y \in F^+ : X \cup Y \subseteq R_i}$ 之并与 $F$ 等价，则称该分解**保持函数依赖**。
:::

连接的结果永远*包含* $r$——$r$ 的每个元组都是它自己那些投影的连接——所以"有损"意味着连接多出了**伪元组**。信息的丢失不是因为数据消失了，而是因为我们再也分不清哪些组合本是真实的。依赖保持的重要性在别处：若每个 FD 都能在某一张表内部检查，验证一次更新只需看那张表；否则每次更新为检查一个 FD 都得做一次连接。

::: theorem 二元分解的无损性 {#thm-heath}
$R$ 分解为 $R_1$ 与 $R_2$ 关于 $F$ 无损，当且仅当 $F \models (R_1 \cap R_2) \to R_1$ 或 $F \models (R_1 \cap R_2) \to R_2$，即当且仅当公共属性构成 $R_1$ 或 $R_2$ 的超码。
:::

::: proof
令 $X = R_1 \cap R_2$。

*充分性*。设 $X \to R_2$ 成立，$r$ 满足 $F$。取连接中的元组 $s$：存在 $t, u \in r$ 使 $t[R_1] = s[R_1]$、$u[R_2] = s[R_2]$，特别地 $t[X] = u[X] = s[X]$。由 $X \to R_2$，$t[R_2] = u[R_2] = s[R_2]$。于是 $t$ 与 $s$ 在 $R_1 \cup R_2 = R$ 上一致，即 $s = t \in r$。$X \to R_1$ 的情形对称。

*必要性*。设两个 FD 都不被蕴含。仿照 [[#thm-armstrong]] 中完备性的证明，令 $r = \set{t, u}$，其中 $t$ 处处取值 $0$，$u$ 在 $X^+$ 上取值 $0$、在其余属性上取值 $1$；$r$ 满足 $F$。由于 $X \subseteq X^+$，$t$ 与 $u$ 在 $X$ 上一致，于是连接中包含这样的元组 $s$：$s[R_1] = t[R_1]$ 且 $s[R_2] = u[R_2]$。因为 $R_2 \not\subseteq X^+$，存在 $B \in R_2 - X^+$ 使 $u[B] = 1$，且 $B \notin R_1$（因为 $B \notin X$），故 $s[B] = 1 \ne t[B]$：$s \ne t$。因为 $R_1 \not\subseteq X^+$，某个 $A \in R_1 - X^+$ 满足 $s[A] = t[A] = 0 \ne u[A]$：$s \ne u$。于是连接包含伪元组，分解是有损的。
:::

"充分"这一方向就是希思（Heath）定理（1971）。对分解成两个以上模式的情形，无损性可用阿霍（Aho）、贝里（Beeri）与乌尔曼（Ullman）（1979）的**追逐**（chase）算法检验，或者像下面两个算法那样由构造保证。

::: example 一个有损分解 {#ex-lossy}
把 Enrolled(sid, code, grade) 分解为 $(\text{sid}, \text{grade})$ 与 $(\text{code}, \text{grade})$。它无损吗？在 [[databases/relational-model]] 的那个十行实例上，两个投影的连接有多少个元组？
::: solution
公共属性是 grade，而在 $\text{sid}\,\text{code} \to \text{grade}$ 之下 $\text{grade}^+ = \set{\text{grade}}$，所以 grade 哪一边都不是超码；由 [[#thm-heath]]，分解是有损的。就这个实例而言：成绩 A 出现在学生 $\set{1, 3}$ 的课程 $\set{\text{CS101}, \text{MA101}, \text{CS202}, \text{MA210}}$ 之中，给出 $2 \cdot 4 = 8$ 种组合；成绩 B 出现在学生 $\set{1,2,3,4}$ 的全部四门课中，$16$ 种组合；成绩 C 是学生 $2$ 在 CS101 上的记录，$1$ 种组合。连接共有 $25$ 个元组而非 $10$ 个——SQLite 的结果一致：

```sql
SELECT COUNT(*) FROM (SELECT DISTINCT sid, grade FROM Enrolled)
                JOIN (SELECT DISTINCT code, grade FROM Enrolled) USING (grade);
```

```text
25
```

其中 $15$ 个是伪元组，$(3, \text{CS101}, \text{A})$ 便是其一，而 Chen 从未选修过 CS101。换成 $(\text{sid}, \text{code})$ 与 $(\text{sid}, \text{code}, \text{grade})$ 的分解是无损的，却毫无意义；有用的分解拆出的，正是那些左部不是码的 FD 所决定的属性。
:::
:::

### BCNF 分解

::: algorithm BCNF 分解 {#alg-bcnf}
输入：模式 $R$ 与 FD 集 $F$。输出：一个由 BCNF 模式构成的无损分解。
1. $D \gets \set{R}$。
2. 只要 $D$ 中还有某个 $S$ 不属于 BCNF：
   1. 找一个满足 $X \cup Y \subseteq S$ 且 $X$ 不是 $S$ 的超码的非平凡 FD $X \to Y \in F^+$；
   2. 把 $D$ 中的 $S$ 换成 $S_1 = X^+ \cap S$ 与 $S_2 = X \cup (S - X^+)$。
3. 返回 $D$。
:::

::: theorem BCNF 分解算法的正确性 {#thm-bcnf}
[[#alg-bcnf]] 会停机，其输出是 $R$ 的一个无损分解，且其中每个模式都属于 BCNF。
:::

::: proof
*停机性*。每次拆分时，$S_1 = X^+ \cap S \subsetneq S$，因为 $X$ 不是 $S$ 的超码；而 $S_2 = X \cup (S - X^+) \subsetneq S$，因为它缺少 $Y - X$ 中的属性——那些属性非空（FD 非平凡）且都属于 $X^+$。两部分都比 $S$ 严格地小，所以过程必停：只有一个属性的模式总属于 BCNF。

*无损性*。$S_1 \cap S_2 = X$（$S_2$ 中 $X$ 以外的属性都在 $X^+$ 之外），且 $X \to S_1$，因为 $S_1 \subseteq X^+$。由 [[#thm-heath]]，每次拆分关于 $S$ 上成立的 FD 都是无损的。无损性可以复合：若在一个无损分解的内部把 $S$ 换成它自己的一个无损分解，那么各部分连接起来等于先把 $S$ 的各部分连接、再与其他部分连接（连接满足结合律与交换律），后者就是 $\pi_S(r)$，因而整体仍是 $r$。对拆分次数作归纳，最后的分解是无损的。

*BCNF*。循环只有在每个模式都属于 BCNF 时才结束。
:::

::: example 分解选课大表 {#ex-bcnf}
对具有 FD [[#eq-uni-fds]] 的大表运行 [[#alg-bcnf]]。结果是保持依赖的吗？
::: solution
- $S = $ (sid, name, code, title, dept, building, grade) 因 $\text{code} \to \text{title}\,\text{dept}$ 违反 BCNF。$\text{code}^+ \cap S = \set{\text{code}, \text{title}, \text{dept}, \text{building}}$，于是 $S_1 = $ (code, title, dept, building)，$S_2 = $ (code, sid, name, grade)。
- $S_2$ 因 $\text{sid} \to \text{name}$ 违反 BCNF（它的码是 sid code）：拆成 (sid, name) 与 (sid, code, grade)。
- $S_1$ 因 $\text{dept} \to \text{building}$ 违反 BCNF（它的码是 code）：拆成 (dept, building) 与 (code, title, dept)。

结果：Student(sid, name)、Enrolled(sid, code, grade)、Course(code, title, dept)、Department(dept, building)——正是一位优秀的设计者会写出的那几张表，如今是被推导出来的。$F$ 的每个 FD 都完整地落在某一个模式之内，故分解保持依赖。（若当初选 $\text{code} \to \text{building}$ 作为第一个违反之处，就会得到 (code, building) 并丢掉 $\text{dept} \to \text{building}$；从最小覆盖中挑 FD 来拆分是明智的。）
:::
:::

BCNF 并不总能与依赖保持同时得到。在导师制模式 [[#eq-tutor]] 中，唯一的 BCNF 违反是 $\text{tutor} \to \text{course}$，分解得 $(\text{tutor}, \text{course})$ 与 $(\text{student}, \text{tutor})$。它无损（tutor 是前者的码），但 FD $\text{student}\,\text{course} \to \text{tutor}$ 同时提到两张表的属性，在哪一张表内部都不成立。$R$ 的任何一个 BCNF 分解要么把 $R$ 整个保留——不属于 BCNF——要么把它拆成装不下全部三个属性的若干模式，所以 $R$ *不存在*保持依赖的 BCNF 分解（[[#ex-tutor]]）。要想阻止一名学生对同一门课拥有两位辅导教师，数据库就得在每次插入时把两张表连接起来。

### 3NF 综合

3NF 是这样一种折中：两个保证总能同时做到。

::: algorithm 3NF 综合 {#alg-3nf}
输入：模式 $R$ 与 FD 集 $F$。输出：一个无损、保持依赖、且每个模式都属于 3NF 的分解。
1. 计算 $F$ 的一个最小覆盖 $G$。
2. 对 $G$ 中出现的每个左部 $X$，建立模式 $X \cup \set{A : X \to A \in G}$。
3. 若已有的模式没有一个包含 $R$ 的候选码，就添加一个由某个候选码构成的模式。
4. 删去任何被别的模式包含的模式。
:::

::: theorem 3NF 综合算法的正确性 {#thm-3nf}
[[#alg-3nf]] 的输出保持依赖且无损，其中每个模式都属于 3NF。
:::

::: proof
*依赖保持*。$G$ 的每个 FD $X \to A$ 都落在为 $X$ 建立的模式之内（第 4 步只删去被别的模式包含的模式，FD 于是留在更大的那个模式里）。所以各投影 FD 之并包含 $G$，而 $G$ 的闭包就是 $F^+$。

*无损性*。设 $S_0$ 是包含 $R$ 的某个候选码 $K$ 的模式（第 3 步保证其存在）。设 $r$ 满足 $F$，$s$ 是各模式投影的连接中的一个元组；于是对每个模式 $S_j$ 都有 $u_j \in r$ 使 $u_j[S_j] = s[S_j]$。我们证明 $u_0 = s$。用 $G$ 中的 FD 对 $K$ 运行 [[#alg-closure]]；我们归纳证明 $u_0$ 在每个被加入的属性上与 $s$ 一致。初始时 $u_0[K] = s[K]$，因为 $K \subseteq S_0$。当 $G$ 的某个 FD $X \to A$ 把 $A$ 加入闭包、而 $X$ 已在闭包中时，$X \to A$ 位于某个模式 $S_j$ 之内，由归纳假设 $u_j[X] = s[X] = u_0[X]$；由于 $r$ 满足 $X \to A$，得 $u_0[A] = u_j[A] = s[A]$。因为 $K^+ = R$，故 $u_0 = s$，于是 $s \in r$。

*3NF*。第 3 步添加的模式 $K$ 是 $R$ 的候选码，它同时也是模式 $K$ 自身的候选码（若它的某个真子集决定 $K$，就会决定 $R$）；所以它的每个属性都是主属性，它上面的任何 FD 都满足 3NF。考虑第 2 步得到的模式 $S = X \cup Y$，其中 $Y = \set{A : X \to A \in G}$。首先，$X$ 是 $S$ 的候选码：它决定 $S$；若某个真子集 $X' \subset X$ 也能决定 $S$，则对某个 $A \in Y$ 有 $X' \to A$，会使 $X \to A$ 中 $X$ 的某个属性成为多余，与最小性矛盾。现在设 $Z \to B$ 是满足 $Z \cup \set B \subseteq S$ 且 $Z$ 不是 $S$ 的超码的非平凡 FD。若 $B \in X$，则 $B$ 在 $S$ 中是主属性，3NF 成立。设 $B \in Y$，于是 $X \to B \in G$。用 $G$ 中的 FD 对 $Z$ 运行 [[#alg-closure]]；它会到达 $B$。若这次运行用到了 $X \to B$，那么在那一步有 $X \subseteq Z^+$，于是 $Z \to X \to S$，$Z$ 是 $S$ 的超码——矛盾。若没有用到，则 $Z \to B$ 由 $G' = G - \set{X \to B}$ 推出；而 $X \to Z$ 也由 $G'$ 推出，因为 $Z \subseteq S - \set B$，而 $X$ 或经自反律、或经某个右部 $A \ne B$ 的 FD $X \to A$ 决定 $S - \set{B}$ 的每个属性。于是 $X \to B$ 也由 $G'$ 推出，即它在 $G$ 中是冗余的——与最小性矛盾。所以每个这样的 FD 的右部都是主属性，$S$ 属于 3NF。
:::

::: example 3NF 综合 {#ex-3nf}
对 $R(A, B, C, D, E)$，$F = \set{A \to B,\ B \to C,\ CD \to E,\ E \to A}$，运行 [[#alg-3nf]]。
::: solution
$F$ 本身已是最小覆盖（右部皆单属性；在 $CD \to E$ 中，$C^+ = \set C$ 与 $D^+ = \set D$ 都不含 $E$；没有 FD 能由其余 FD 推出）。第 2 步得到 $AB$、$BC$、$CDE$、$EA$。$R$ 的候选码：$D$ 不出现在任何右部，故属于每个码；$D^+ = \set D$，$AD^+ = BD^+ = CD^+ = DE^+ = R$。所以码是 $AD$、$BD$、$CD$、$DE$，而 $CDE$ 已包含码 $CD$：第 3 步什么也不添加。分解为 $\set{AB, BC, CDE, AE}$。正如 [[#thm-3nf]] 所保证的，每个模式都属于 3NF，但并非都属于 BCNF：在 $CDE$ 上成立着 FD $E \to C$（因为 $E^+ = ABCE$），而 $E$ 不是 $CDE$ 的超码——右部 $C$ 是主属性，因为 $CD$ 是 $CDE$ 的码。这种只有借助闭包才看得见的隐藏 FD，正是必须对投影后的 FD 检验 BCNF 的原因。

原来的 $R$ 本身就属于 3NF，因为每个属性都是主属性——而不属于 BCNF，因为 $A \to B$ 的左部不是码。对 $R$ 运行 [[#alg-bcnf]] 可得不损的 BCNF 分解，例如 $\set{AB, BC, AE, DE}$，它丢掉 $CD \to E$（没有任何模式同时包含 $C$、$D$ 和 $E$）。这就是一般性的取舍：BCNF 消除 FD 造成的一切冗余，但可能丢依赖；3NF 保住依赖，但可能留下一些冗余。
:::
:::

::: warning 规范化不是"每张表能拆多细就拆多细"
两种相反的常见错误都很普遍。一种是不检验无损性就分解：像 [[#ex-lossy]] 那样按两边都不是码的属性来拆，会在暗中凭空造出事实。另一种是把规范化当作目的本身。只有按 [[#alg-bcnf]] 做出的 BCNF 分解才保证无损，依赖保持可能丢失，而且每一次拆分都给查询添上连接。分析型数据库会故意**反规范化**（"星形模式"重复存放维属性），因为它们读远多于写；此时异常靠整批重导数据来控制。范式能准确地告诉你有哪些冗余；要不要保留它是工程决策。
:::

## 函数依赖之外

BCNF 消除 FD 造成的冗余，但并非所有冗余都是这一类。设每位教师带若干门课、会说若干种语言，两件事彼此独立，表 Lect(lid, course, language) 登记全部组合。若 Rao 教 CS101 与 CS202，又会说英语和印地语，表中就有四行。不存在非平凡 FD，于是唯一的码是全部三个属性，表属于 BCNF——然而新增第三种语言就得加两行。

::: definition 多值依赖 {#def-mvd}
设 $Z = R - X - Y$。若对 $R$ 上的关系 $r$，只要 $t, u \in r$ 在 $X$ 上一致，就存在 $v \in r$ 使 $v[X] = t[X]$、$v[Y] = t[Y]$ 且 $v[Z] = u[Z]$，则称 $r$ 满足**多值依赖**（MVD）$X \twoheadrightarrow Y$。若对每个成立的非平凡 MVD $X \twoheadrightarrow Y$（$Y \not\subseteq X$，$X \cup Y \ne R$），$X$ 都是超码，则称模式属于**第四范式**（4NF）。
:::

此处 $\text{lid} \twoheadrightarrow \text{course}$：一位教师的课程要与这位教师的全部语言一一组合。每个 FD $X \to Y$ 同时也是一个 MVD，而 [[#thm-heath]] 的类比成立：分解为 $R_1, R_2$ 无损，当且仅当 $R_1 \cap R_2 \twoheadrightarrow R_1$ 成立（费金（Fagin），1977）。分解为 (lid, course) 与 (lid, language) 便消除了冗余。连接依赖是分解为多个部分仍保持无损的一般条件（正如 [[databases/conceptual-design#prop-ternary]] 的三元联系），由它引出第五范式；实践中很少遇到。

::: quiz
对具有 $F = \set{A \to B}$ 的 $R(A, B, C)$，下面哪些分解是无损的？
- [x] $AB$ 与 $AC$
- [ ] $AB$ 与 $BC$
- [ ] $AC$ 与 $BC$
- [x] $ABC$ 与 $A$
::: solution
由 [[#thm-heath]]，公共属性必须决定某一边。$AB \cap AC = A$ 且 $A \to AB$：无损。$AB \cap BC = B$，而 $B^+ = \set B$：有损。$AC \cap BC = C$，$C^+ = \set C$：有损。$ABC \cap A = A$，而 $A$ 平凡地决定 $A$：无损（但也无用，因为 $ABC$ 就是原模式）。
:::
:::

::: history
科德于 1970 年提出第一范式，又在《关系数据模型的进一步规范化》（"Further normalization of the data base relational model"，IBM 报告，1971 年；发表于 1972 年）中提出第二与第三范式。希思（Heath）1971 年的研讨会论文《关系数据库中不可接受的文件操作》（"Unacceptable file operations in a relational data base"）给出了两成分分解的无损连接条件。Boyce–Codd 范式出现在科德的《关系数据库系统的近期研究》（"Recent investigations in relational data base systems"，1974）中，并把思想归功于雷蒙德·博伊斯（Raymond Boyce）；威廉·W. 阿姆斯特朗（William W. Armstrong）的《数据库关系的依赖结构》（"Dependency structures of data base relationships"，IFIP 大会，1974）给出了公理并证明其完备性。菲利普·伯恩斯坦（Philip Bernstein）的《由函数依赖综合第三范式关系》（"Synthesizing third normal form relations from functional dependencies"，*ACM TODS*，1976）给出了综合算法；罗纳德·费金（Ronald Fagin）于 1977 年引入多值依赖与第四范式；阿尔弗雷德·阿霍（Alfred Aho）、卡特里尔·贝里（Catriel Beeri）与杰弗里·乌尔曼（Jeffrey Ullman）的《关系数据库中的连接理论》（"The theory of joins in relational databases"，*TODS*，1979）提出了追逐算法。克劳迪奥·卢凯西（Claudio Lucchesi）与西尔维娅·奥斯本（Sylvia Osborn）在 1978 年证明：判定一个属性是否为主属性是 NP 完全问题，从而检验 3NF 也是 NP 完全的。
:::

## 后续内容

本章得到的模式就是物理设计中的表。每次分解都是以查询时的连接换取消除更新异常，这正是连接算法（[[databases/query-processing]]）与连接次序（[[databases/query-optimisation]]）如此重要的原因。FD 会再次出现在优化器里：优化器用码与外码估计连接的大小、去掉多余的 `DISTINCT` 与 `GROUP BY` 开销；SQL 标准关于分组查询的规则也建立在 FD 之上（[[databases/sql]]）。大型分析型与分布式系统常常有意反规范化，宁可接受冗余以避免跨机器的连接；Kleppmann 的著作讨论了这些取舍，相关内容延续到 [[distributed-systems]]。

::: summary
- **函数依赖** $X \to Y$ 断言：在任何合法实例中，$X$ 值相同就迫使 $Y$ 值相同；码就是 $K \to R$ 这样的 FD。
- **阿姆斯特朗公理**（自反律、增强律、传递律）有效且完备；实践中通过计算**属性闭包** $X^+$ 来检验 $X \to Y$（[[#alg-closure]]）。
- 不出现在任何右部的属性属于每个候选码；**最小覆盖**右部皆单属性、左部无多余属性、且无冗余 FD。
- **BCNF**：每个非平凡 FD 的左部都是超码。**3NF**：或者其右部是主属性。BCNF 蕴含 3NF。
- 二元分解**无损**当且仅当公共属性是某一部分的超码（[[#thm-heath]]）；有损分解会多出伪元组。
- [[#alg-bcnf]] 总给出无损的 BCNF 分解，但可能丢依赖；[[#alg-3nf]] 总给出无损且保持依赖的 3NF 分解。
- MVD 与 4NF 刻画的是 FD 看不见的、由相互独立的多值事实造成的冗余；反规范化是有意为之的工程选择，不是错误。
:::

## 习题

第 1–5 题中，$R = ABCDE$，$F = \set{A \to B,\ B \to C,\ CD \to E,\ E \to A}$，同 [[#ex-3nf]]。

::: exercise $A$ 的闭包 {level=1 check="3"}
计算 $A^+$ 与 $(AD)^+$。（输入 $A^+$ 中属性的个数。）
::: solution
$A^+$：$A \to B$ 加入 $B$，$B \to C$ 加入 $C$；$CD \to E$ 还需要 $D$。故 $A^+ = \set{A, B, C}$，共 $3$ 个属性。$(AD)^+$：$A, D, B, C$，然后 $CD \to E$ 加入 $E$：整个 $R$，所以 $AD$ 是超码。
:::
:::

::: exercise 数候选码 {level=1 check="4"}
求出 $R$ 的全部候选码。（输入个数。）
::: solution
$D$ 不在任何右部，故每个码都含 $D$；$D^+ = \set{D}$，所以 $D$ 单独不是码。逐个添加一个属性：$AD^+$、$BD^+$（先 $B, C$，再 $E$，再 $A$）、$CD^+$（先 $E$，再 $A$，再 $B$）与 $DE^+$（$A, B, C$）都是 $R$。故 $AD$、$BD$、$CD$ 与 $DE$ 是候选码，而任何别的超码都包含它们之一：$4$ 个码。
:::
:::

::: exercise 推导规则 {level=1}
从阿姆斯特朗公理出发，推出伪传递律（由 $X \to Y$ 与 $WY \to Z$ 推出 $WX \to Z$）以及规则"由 $X \to Y$ 与 $Z \to W$ 推出 $XZ \to YW$"，每一步注明所用的公理。
::: solution
伪传递律：用 $W$ 增强 $X \to Y$，得 $WX \to WY$；再与 $WY \to Z$ 用传递律，得 $WX \to Z$。

第二条规则：用 $Z$ 增强 $X \to Y$：$XZ \to YZ$。用 $Y$ 增强 $Z \to W$：$YZ \to YW$。传递律：$XZ \to YW$。
:::
:::

::: exercise 数超码 {level=2 check="15"}
$R$ 共有多少个超码？（输入数字。）
::: solution
一个属性集是超码，当且仅当它包含 $D$ 且至少包含 $A, B, C, E$ 之一（$AD, BD, CD, DE$ 各是一个码，而 $D$ 单独不是）。含 $D$ 的集合：$2^4 = 16$ 个；再减去 $\set D$ 自身：$15$。（等价地：$\set{A, B, C, E}$ 的 $2^4 - 1$ 个非空子集，各与 $D$ 合并。）
:::
:::

::: exercise BCNF 与依赖丢失 {level=2}
$R$ 属于 3NF 吗？属于 BCNF 吗？从违反之处 $A \to B$ 开始运行 [[#alg-bcnf]]，判断 $F$ 中哪些 FD 丢失了。
::: solution
所有属性都是主属性（每个都属于 $AD, BD, CD, DE$ 四个码之一），故 $R$ 属于 3NF；$A \to B$ 的左部不是超码，故不属于 BCNF。沿 $A$ 拆分：$A^+ = ABC$，得 $S_1 = ABC$ 与 $S_2 = ADE$。在 $S_1$ 中，$B \to C$ 违反 BCNF（码为 $A$）：拆成 $BC$ 与 $AB$。在 $S_2 = ADE$ 上成立的 FD 包括 $E \to A$ 与 $AD \to E$（因为 $(AD)^+ = R$），故它的码是 $AD$ 与 $DE$，而 $E \to A$ 违反 BCNF：拆成 $AE$ 与 $DE$。结果 $\set{AB, BC, AE, DE}$，由 [[#thm-bcnf]] 是无损的。FD $A \to B$、$B \to C$ 与 $E \to A$ 各落在某一个模式之内，但 $CD \to E$ 不然，而且它无法由各投影 FD 推出（投影 FD 从不把 $C$ 和 $D$ 一同提及）；故 $CD \to E$ 丢失。
:::
:::

::: exercise 数伪元组 {level=2 check="15"}
[[#ex-lossy]] 中，连接包含多少个伪元组？给出一个把 Enrolled(sid, code, grade) 分解为两个各含两个属性的模式的无损分解，或者证明这样的分解不存在。
::: solution
连接有 $25$ 个元组，原有 $10$ 个，故 $25 - 10 = 15$ 个是伪元组。唯一的 FD 是 $\text{sid}\,\text{code} \to \text{grade}$。要用两个属性模式覆盖全部三个属性，公共属性恰为一个：(sid, code) 与 (sid, grade) 共享 sid；(sid, code) 与 (code, grade) 共享 code；(sid, grade) 与 (code, grade) 共享 grade。每种情形下公共属性的闭包都是它自身，哪一边都不是超码，故由 [[#thm-heath]] 没有一个是无损的。
:::
:::

::: exercise 只用 F 检验 BCNF {#ex-bcnf-check level=2}
证明：若 $F$ 中每个非平凡 FD $X \to Y$ 的左部 $X$ 都是 $R$ 的超码，则 $R$（连同其全部属性）属于 BCNF。为什么这一捷径对分解所得的模式 $S \subsetneq R$ 会失效？
::: solution
设 $V \to W$ 是 $F^+$ 中的一个非平凡 FD，并设 $V$ 不是超码，即 $V^+ \ne R$。对 $V$ 运行 [[#alg-closure]]。由于 $V \to W$ 非平凡，$W \not\subseteq V$ 而 $W \subseteq V^+$，所以 $F$ 中至少有一个 FD 会加入新属性。第一个加入新属性的 FD $X \to Y$ 满足 $X \subseteq V$（此时尚未加入任何属性）且 $Y \not\subseteq X$，所以它非平凡，于是按假设 $X$ 是超码。那么 $V \supseteq X$ 决定 $R$，与 $V^+ \ne R$ 矛盾。故 $F^+$ 的每个非平凡 FD 的左部都是超码。

对于子模式 $S$，在其上成立的 FD 是 $F^+$ 中含于 $S$ 的那些，它们未必在 $F$ 中可见。例：$R = ABC$，$F = \set{A \to B, B \to C}$，$S = AC$。$F$ 中没有 FD 含于 $S$，但 $A \to C$ 在 $S$ 上成立——此处无害，因为 $A$ 是 $S$ 的码；一般说来，正如 [[#ex-3nf]]，这类隐藏的 FD 可能违反 BCNF，所以必须用 $S$ 的子集的闭包来检验。
:::
:::

::: exercise 导师制模式 {#ex-tutor level=3}
对 [[#eq-tutor]]，证明：$R$ = (student, course, tutor) 的任何 BCNF 分解都不保持依赖。
::: solution
$R$ 本身不属于 BCNF（tutor → course）。除此以外的任何分解都由至多含三个属性中两个的模式组成。FD $\text{student}\,\text{course} \to \text{tutor}$ 必须由投影 FD 之并推出。每个投影 FD 的全部属性都含于某个两属性模式之内。$F^+$ 中只涉及两个属性的 FD 有：$\text{tutor} \to \text{course}$，以及平凡的那些；$\text{student} \to \text{course}$、$\text{student} \to \text{tutor}$、$\text{course} \to \text{tutor}$ 与 $\text{course} \to \text{student}$ 都不被蕴含（$\text{student}^+ = \set{\text{student}}$，$\text{course}^+ = \set{\text{course}}$），$\text{tutor} \to \text{student}$ 同样不被蕴含。于是投影之并至多蕴含 $\set{\text{tutor} \to \text{course}}$，而在此之下 $(\text{student}\,\text{course})^+ = \set{\text{student}, \text{course}}$ 不含 tutor。故 $\text{student}\,\text{course} \to \text{tutor}$ 在每个 BCNF 分解中都会丢失。
:::
:::

::: exercise 3NF 加唯一码推出 BCNF {level=3}
证明：若属于 3NF 的模式 $R$ 恰有一个候选码，则它属于 BCNF。
::: solution
设 $R$ 属于 3NF 且候选码唯一，为 $K$，又设 $X \to A$ 是满足 $A \notin X$ 且 $X$ 不是超码的非平凡 FD。由 3NF，$A$ 是主属性，故 $A \in K$。考虑 $K' = (K - \set A) \cup X$。它决定 $X$，从而决定 $A$，于是决定 $K$，故它是超码。它因此包含某个候选码，而那只能是唯一的 $K$。于是 $A \in K'$；由于 $A \notin K - \set A$，必有 $A \in X$，与非平凡性矛盾。故每个非平凡 FD 的左部都是超码：$R$ 属于 BCNF。
:::
:::

::: exercise 算法的实现 {level=3}
利用 `closure`，编写 `candidate_keys(R, F)`（按规模递增枚举子集，保留不含更小码的超码）与 `is_bcnf(R, F)`，并在选课大表与上面的 $R = ABCDE$ 上测试。
::: solution
```python
from itertools import combinations

def candidate_keys(R, F):
    keys = []
    for k in range(1, len(R) + 1):
        for X in map(set, combinations(sorted(R), k)):
            if closure(X, F) >= R and not any(K <= X for K in keys):
                keys.append(X)           # 极小的：内部不含更小的码
    return keys

def is_bcnf(R, F):
    # 由 F 推出且含于 R 的全部 FD：对每个子集 X，X -> (X+ & R)
    for k in range(1, len(R) + 1):
        for X in map(set, combinations(sorted(R), k)):
            if (closure(X, F) & R) - X and not closure(X, F) >= R:
                return False, X          # X 决定某些属性，却不是超码
    return True, None

def fds(s):
    return [(set(l.split()), set(r.split()))
            for l, r in (p.split("->") for p in s.split(";"))]

R1 = set("sid name code title dept building grade".split())
F1 = fds("sid -> name; code -> title dept; dept -> building; sid code -> grade")
R2, F2 = set("ABCDE"), fds("A -> B; B -> C; C D -> E; E -> A")
print([sorted(K) for K in candidate_keys(R1, F1)], is_bcnf(R1, F1))
print([sorted(K) for K in candidate_keys(R2, F2)], is_bcnf(R2, F2))
print(is_bcnf(set("AB"), F2), is_bcnf(set("CDE"), F2))
```

```console
$ python3 keys.py
[['code', 'sid']] (False, {'code'})
[['A', 'D'], ['B', 'D'], ['C', 'D'], ['D', 'E']] (False, {'A'})
(True, None) (False, {'E'})
```

两个算法对 $\lvert R\rvert$ 都是指数的，而在最坏情形下这本是不可避免的：一个模式可以有指数多个候选码——由 Sperner 定理，$n$ 个属性时多达 $\binom{n}{\lfloor n/2\rfloor}$，因为码之间互不包含。对设计工作中教科书规模的模式，这不算障碍。由于 `is_bcnf` 检验的是投影后的 FD，它对分解出的模式同样适用：它发现 $CDE$——[[#ex-3nf]] 的 3NF 综合中的一个模式——不属于 BCNF，因为 $E \to C$ 在其上成立（$E^+ = ABCE$），而 $E$ 不是 $CDE$ 的超码。
:::
:::
