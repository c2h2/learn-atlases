系统一旦知道是谁在请求（[[security/authentication]]），就必须决定是否准许这次请求。这位教师可以改这个成绩吗？这个进程可以打开那个文件、连接那个地址、读取那个摄像头吗？每个多用户系统每秒都要回答几百万个这样的问题，而其中任何一次差错都可能把整个系统交到攻击者手里——"访问控制失效"自 2021 年起一直高居 OWASP web 应用风险榜榜首。这些问题背后是两种相当不同的关切：*策略应当是什么*（谁应当被允许做什么），以及**如何执行**它，使任何请求都插不过检查的空子。

本章两者都要展开。我们从兰普森的**访问控制矩阵**及其两种实现——访问控制列表与能力——出发，以人人都用的 Unix 权限为例。我们定义**引用监视器**——必须对每次访问进行仲裁的机制——以及它未能做到时产生的检查时刻到使用时刻漏洞。我们证明：判定一个一般访问控制系统会不会泄露一条权限是**不可判定的**；随后研究绕开这一问题的**强制**策略——用于机密性的 Bell–LaPadula 与用于完整性的 Biba——以及组织在用的**基于角色**的模型。最后讨论混淆代理问题、能力系统与**沙箱**，包括在本机上编写并运行的一个系统调用过滤器。其下的硬件与内核机制——特权级、页表、系统调用边界、容器与虚拟机——在 [[operating-systems/os-structure]] 与 [[operating-systems/virtualisation]]，此处不复述。

## 访问控制矩阵

::: definition 主体、对象与访问控制矩阵 {#def-acm}
一个保护状态由以下部分构成：**主体**集 $S$（主动的实体：用户、进程）、**对象**集 $O$（被动的实体：文件、设备、内存段，通常也包括主体本身）、**权限**集 $\mathcal R$（读、写、执行、拥有……），以及一张**访问控制矩阵** $A$：每个主体一行、每个对象一列，元素 $A[s, o] \subseteq \mathcal R$ 是 $s$ 对 $o$ 持有的权限集。$s$ 请求对 $o$ 执行需要权限 $r$ 的操作，当且仅当 $r \in A[s, o]$ 时被准许。
:::

这个矩阵（Lampson，1971）是一个模型，不是数据结构：有成千上万用户和几百万文件时，它大得惊人而且几乎全是空的。真实系统稀疏地存储它，方式有二。

- 按**列**：每个对象携带一张（主体，权限）对的**访问控制列表**（ACL）。检查请求时，在对象的列表里查这个主体。撤销所有人对某对象的访问很容易；要找出一个主体能访问的一切，就得扫描所有对象。
- 按**行**：每个主体持有一列**能力**（capability）——各指明一个对象和一个权限集的、不可伪造的凭据。检查请求时，主体出示一张能力。查找主体的权限很容易，委托一份也容易（把能力交出去）；撤销对某对象的访问却很难，因为它的能力的副本可能无处不在。

Unix 的文件描述符就是一种能力：`open` 一旦成功，描述符无需再次检查即可授予读写，可被子进程继承、或经 Unix 域套接字传给另一个进程，并且即便文件的权限位后来被改动它仍然有效。而只在 `open` 时被咨询的文件权限位，就是那张 ACL。

::: example 一个矩阵，两种表示 {#ex-acm}
主体 `alice`（教师）、`bob`（学生）和进程 `backup`；对象 `marks.db`、`exam.pdf` 和 `notes.txt`。Alice 拥有 `marks.db` 与 `exam.pdf` 并可读写它们；Bob 可读 `notes.txt`；Alice 可读写 `notes.txt`；`backup` 可读全部三个。写出矩阵、它的 ACL 和能力表，并说明哪种表示能更快回答"`backup` 能读什么？"和"谁能读 `exam.pdf`？"。
::: solution
| | `marks.db` | `exam.pdf` | `notes.txt` |
|---|---|---|---|
| `alice` | own, r, w | own, r, w | r, w |
| `bob` | | | r |
| `backup` | r | r | r |

ACL（列）：`marks.db`：alice {own, r, w}，backup {r}；`exam.pdf`：alice {own, r, w}，backup {r}；`notes.txt`：alice {r, w}，bob {r}，backup {r}。能力表（行）：alice：(marks.db, {own, r, w})，(exam.pdf, {own, r, w})，(notes.txt, {r, w})；bob：(notes.txt, {r})；backup：(marks.db, r)，(exam.pdf, r)，(notes.txt, r)。"`backup` 能读什么？"就是一行——能力表直接回答，而 ACL 需要扫描每个对象。"谁能读 `exam.pdf`？"就是一列——ACL。审计员对敏感对象通常问第二类问题，而在某个主体失陷时问第一类（"攻击者能够到哪些东西？"）；这就是使用 ACL 的系统常常需要额外工具来回答第一类问题的原因。
:::
:::

### Unix 权限

Unix 把每个文件的 ACL 压缩成九个比特加一个属主和一个属组：**属主**（用户）、**属组**和**其他人**各自的读、写、执行。（完整的 POSIX ACL 用具名用户和具名组对此作了扩展，但九个比特仍是常见情形。）检查不是三个类别的并集，而是选择。

::: algorithm Unix 权限检查 {#alg-unix-perm}
给定有效用户 ID 为 $u$、组 ID 集合为 $G$ 的进程，属主为 $o$、属组为 $g$、带模式位的文件，以及请求的访问 $a \in \{r, w, x\}$：

1. 若 $u = 0$（root），允许读写；只要任一个执行位被置起（或该文件是目录），允许执行。
2. 否则若 $u = o$，只用**属主**位判定。
3. 否则若 $g \in G$，只用**属组**位判定。
4. 否则用**其他人**位判定。

第一个适用的类别说了算；后面的类别根本不会被咨询。
:::

由于第一个匹配的类别说了算，属主可能比其他人*拥有更少*的权限：

```console
$ id
uid=1000(c2h2) gid=1000(c2h2) groups=1000(c2h2),27(sudo),997(ollama)
$ echo "marks" > notes.txt; chmod 077 notes.txt; ls -l notes.txt
----rwxrwx 1 c2h2 c2h2 6 Oct 27 17:28 notes.txt
$ cat notes.txt
cat: notes.txt: Permission denied
$ chmod 640 notes.txt; ls -l notes.txt; cat notes.txt
-rw-r----- 1 c2h2 c2h2 6 Oct 27 17:28 notes.txt
marks
```

"其他人"可读，属主却被拒——然而属主可以运行 `chmod` 改回来，因为修改文件模式的权限属于属主，与模式位无关。所有权是一种元权限：对 ACL 本身的控制权。这正是**自主访问控制**（DAC）的要义：由所有者决定谁可以访问自己的对象。

还有两个特性与安全有关。带 **setuid** 位的程序文件以*文件属主*的有效用户 ID 运行，而不是调用者的：`passwd` 是 setuid root，普通用户才能更新只有 root 可写的口令数据库。这就是 Unix 受控地授予特权的方式，也是为什么每个 setuid-root 程序都是可信计算基的一部分：其中一个漏洞，交给非特权用户一份输入，就可能让他得到 root。因此最小特权要求 setuid 程序少而小、尽早放弃特权，并把关于调用者的一切——参数、环境变量、打开的文件描述符、当前目录——都当作敌意的来看待。其次，**root** 完全绕过检查。Linux 把 root 的权力拆成大约四十个**能力**（capability）（这个词的另一层含义：如允许绑定 1024 以下端口的 `CAP_NET_BIND_SERVICE`、或 `CAP_SYS_ADMIN` 这类特权），从而可以只把一个服务需要的那一个交给它。

## 引用监视器

兰普森的矩阵说的是策略*是什么*。詹姆斯·安德森（James Anderson）1972 年为美国空军写的报告说的是执行机制必须*是什么样*。

::: definition 引用监视器 {#def-refmon}
**引用监视器**是决定主体对对象每一次访问的组件。实现它的**引用验证机制**必须

1. **总是被调用**（完全仲裁）：每次访问都经过它，无路可绕；
2. **不可篡改**：主体不能修改它，也不能修改它所依赖的数据；
3. **可验证**：足够小、足够简单，能够被分析并测试到很高的保证程度。

**可信计算基**（TCB）是策略的执行所依赖的全部硬件、固件与软件的集合；引用验证机制是它的核心。
:::

在操作系统中，内核就是文件、进程与设备的引用监视器：用户程序只能经系统调用触达对象，处理器的特权级与页表使内核不可篡改，系统调用边界正是仲裁发生的地方（[[operating-systems/os-structure]]）。数据库服务器是表的引用监视器，web 应用则是它自己业务对象的引用监视器——这恰恰是大量 web 漏洞属于访问控制失效的原因：应用*就是*监视器，为每个应用从头写起，而且它必须在每个请求上检查已认证的用户能否触碰该请求点名的那条记录。检查用户是否登录，与检查这个用户能否查看第 1043 号发票，不是一回事。

### 检查时刻与使用时刻

当检查和使用是对一个中途可能改变的名字的两个独立操作时，完全仲裁会以微妙的方式失效。

::: definition TOCTOU 竞态 {#def-toctou}
**检查时刻到使用时刻**（time-of-check-to-time-of-use，TOCTOU）竞态发生在：程序检查了由某个名字（路径、地址、用户提供的指针）标识的对象的一条性质，之后又使用由同一名字标识的对象，而另一方能够在两步之间改变这个名字所指的东西。于是检查验证的是一个对象，使用作用的却是另一个。
:::

经典情形是一个 setuid 程序要代表调用者写一个文件，但仅当调用者本来能写它时才写。它先调用 `access(path, W_OK)`——按*真实*用户 ID 检查——再以自己的 root 特权调用 `open(path, O_WRONLY)`。两次调用之间，调用者把 `path` 换成一个指向只有 root 可写文件的符号链接。检查对调用者的文件通过了；写入却落在受保护的文件上。内核的双读取问题（[[operating-systems/os-structure]]）是同一个错误，只不过名字换成了内存地址。

对策由定义直接得出：让检查和使用指向*同一个对象*，而不是同一个名字。

- **先使用，再检查句柄。** 先打开文件（用 `O_NOFOLLOW` 拒绝最后一个路径分量中的符号链接，或在 Linux 上用带 `RESOLVE_NO_SYMLINKS` 的 `openat2`），再对描述符调用 `fstat`，检查它的属主与类型。描述符从此永远只标识一个对象。
- **让内核在使用时检查。** 需要以调用者身份行事的程序可以临时*变成*调用者（用 `seteuid` 切换有效用户 ID），让 `open` 原子地完成权限检查。
- **只复制一次。** 对不可信一方提供的数据，先复制进私有内存，再对副本进行校验和使用。
- **使用原子操作。** 用 `O_CREAT | O_EXCL` 创建文件（名字已存在则失败），用 `mkstemp` 创建临时文件，绝不先检查名字空闲、然后再创建。

::: warning "检查通过了，所以这次访问是安全的"
权限检查是关于作出检查那一刻的世界的陈述。如果决定被缓存，或者对象稍后又以名字再次指代，检查就对彼时的状态什么也没说：文件可能已被替换、用户的角色可能已被撤销、会话可能已登出、账户余额可能已被花掉。完全仲裁意味着检查*实际发生的那次*访问、对它实际作用其上的对象作检查，并在权限可能改变时重新检查（或使缓存的决定失效）。当你在代码里看到对同一个名字"先检查、后行动"，要问：其间有什么能改变这个名字的含义。
:::

## 权限会泄露吗？安全性问题

自主系统让主体修改矩阵——创建文件、把权限授予他人。管理员自然会问：从这个状态出发，主体 $s$ 会不会*终将*获得对对象 $o$ 的权限 $r$？哈里森（Harrison）、鲁佐（Ruzzo）与乌尔曼（Ullman）在 1976 年把这一问题形式化。

::: definition HRU 保护系统 {#def-hru}
一个**保护系统**有一个有限的权限集和一个有限的**命令**集，每条命令形如
"若 $r_1 \in A[s_1, o_1]$ 且 … 且 $r_k \in A[s_k, o_k]$ 则 $op_1; \dots; op_n$"，
其中参数 $s_i, o_i$ 在命令被调用时绑定到主体与对象，每个 $op_j$ 是一个**原子操作**：在某个格子中填入或删除一条权限、创建或销毁一个主体或对象。若某条命令把 $r$ 填入一个原本不含 $r$ 的格子，就称状态**泄露**权限 $r$。若从某状态出发的任何命令序列都不泄露 $r$，则称该状态对 $r$ **安全**。
:::

::: theorem 安全性不可判定 {#thm-hru}
不存在算法，能在给定保护系统、初始状态与权限 $r$ 时判定该状态对 $r$ 是否安全。
:::

::: proof {collapsed}
我们把图灵机的停机问题——它是不可判定的（[[theory-of-computation/decidability]]）——归约到安全性的补问题。给定状态集 $Q$、带上字母表 $\Gamma$、停机状态 $q_f$ 的图灵机 $M$，构造一个权限集为 $Q \cup \Gamma \cup \{\mathit{own}, \mathit{end}\}$ 的保护系统。$k$ 个单元的带用链式排列的 $k$ 个主体 $s_1, \dots, s_k$ 表示：$\mathit{own} \in A[s_i, s_{i+1}]$ 把每个单元连向下一个；$A[s_i, s_i]$ 存放第 $i$ 格的符号；当前状态 $q$ 放在磁头位置 $h$ 处（即 $A[s_h, s_h]$）；$\mathit{end} \in A[s_k, s_k]$ 标记最后一个单元。

对每条转移 $\delta(q, X) = (p, Y, R)$，加一条命令"若 $q \in A[s, s]$ 且 $X \in A[s, s]$ 且 $\mathit{own} \in A[s, s']$ 且 $Z \in A[s', s']$ 则从 $A[s, s]$ 删除 $q, X$；在 $A[s, s]$ 填入 $Y$；在 $A[s', s']$ 填入 $p$"，对每个符号 $Z$ 各一条；左移类似（反方向使用 $\mathit{own}$ 链接）。对最后一格上的右移，加一条命令创建一个新主体、用 $\mathit{own}$ 把它连上、把 $\mathit{end}$ 移过去并在其中写入空白符号。每条命令的条件只匹配磁头之下的那个单元，且每个格局恰有一条命令适用，于是命令序列与 $M$ 在编码于初始状态中的输入上的运行恰好一一对应。权限 $q_f$ 被填入某个格子当且仅当 $M$ 停机。因此，关于 $q_f$ 的安全性判定过程将能判定停机问题，而这是不可能的。
:::

该定理并不是说访问控制没有指望。它说的是*足够一般*的自主模型无法自动分析，所以答案必须来自对模型的限制。HRU 本人证明了**单操作**系统（每条命令只含一个原子操作）的安全性是可判定的，后来的模型（take–grant、带类型的访问矩阵）又辨认出更多可判定类。更稳健的回应，是把最重要的决定从用户手里彻底拿走。

## 强制访问控制

在自主系统里，用户运行的任何程序都可能把该用户的数据送出去：电子表格宏里的一只特洛伊木马可以把机密文件复制进攻击者能读的文件，而系统没有理由反对，因为（确切说是用户的进程）拥有这两个文件。强制**访问控制**（MAC）给主体与对象附上普通主体不能更改的标签，由一条系统范围的规则依标签作决定。

### Bell–LaPadula：机密性

军事密级有**级别**——Unclassified < Confidential < Secret < Top Secret——和标识主题领域的**类别**（或称分区），如 `NUC` 或 `CRYPTO`。获准 Secret、类别 `NUC` 的人不应看到 Secret `CRYPTO` 的文件。

::: definition 安全标签与支配 {#def-labels}
**安全标签**是由全序集中取的一个级别 $\ell$ 与一个类别集合 $C$ 组成的对 $(\ell, C)$。若 $\ell_1 \ge \ell_2$ 且 $C_1 \supseteq C_2$，则称标签 $(\ell_1, C_1)$ **支配** $(\ell_2, C_2)$，记作 $(\ell_1, C_1) \succeq (\ell_2, C_2)$。支配是偏序，标签构成一个**格**：任意两个标签都有最小上界 $(\max(\ell_1, \ell_2), C_1 \cup C_2)$ 与最大下界 $(\min(\ell_1, \ell_2), C_1 \cap C_2)$。
:::

::: widget relation
set: L0; LA; LB; LAB; H0; HA; HB; HAB
pairs: L0,L0; L0,LA; L0,LB; L0,LAB; L0,H0; L0,HA; L0,HB; L0,HAB; LA,LA; LA,LAB; LA,HA; LA,HAB; LB,LB; LB,LAB; LB,HB; LB,HAB; LAB,LAB; LAB,HAB; H0,H0; H0,HA; H0,HB; H0,HAB; HA,HA; HA,HAB; HB,HB; HB,HAB; HAB,HAB
view: properties
name: D
editable: false
caption: 两个级别 L < H 与取自 $\{A, B\}$ 的类别所构成的八个标签上的支配关系：标签 `LA` 是 (L, $\{A\}$)，`H0` 是 (H, $\emptyset$)，对 $x, y$ 表示 $y$ 支配 $x$。读出的性质确认支配是自反、反对称、传递的——一个偏序——但不是全序：`LA` 与 `HB` 互不支配，所以两者都不能读对方的对象。数一数这 $27$ 个有序对：$3$ 个级别的有序对乘以 $9$ 个嵌套类别集合对。
:::

::: definition Bell–LaPadula 模型 {#def-blp}
每个主体 $s$ 有一个许可级别 $\lambda(s)$，每个对象 $o$ 有一个密级 $\lambda(o)$，都是安全标签，由系统固定。若当前每一次访问都满足以下条件，则状态是**安全的**：

1. **简单安全性质**（"不上读"）：若 $s$ 可读 $o$，则 $\lambda(s) \succeq \lambda(o)$；
2. **$\star$ 性质**（"不下写"）：若 $s$ 对 $o$ 有写（或追加）访问，则 $\lambda(o) \succeq \lambda(s)$；
3. **自主性质**：当前每一次访问也都为访问控制矩阵所允许。

（模型区分主体的最高许可级别与其当前级别；为简单起见，我们把二者视为相等。）
:::

$\star$ 性质是微妙的一条。Secret 主体可以*上写*到 Top Secret 对象，却不能*下写*到 Unclassified 对象，因为它可能读过 Secret 数据，否则就能把它抄到下面去。它正是克制特洛伊木马的那条：运行在 Secret 级的程序无论多么恶意，都无法写下任何 Unclassified 主体能读的东西。

::: theorem 基本安全定理 {#thm-bst}
设系统从安全状态出发，并设每次转移（一条授予或撤销访问的规则）满足：转移新增的访问在新状态下满足简单安全、$\star$ 与自主性质；旧状态下任何将在新状态下违反它们者（例如标签变更后）都被移除。则每个可达状态都是安全的。
:::

::: proof
对转移数归纳。初始状态由假设是安全的。设状态 $v$ 安全且某转移导致 $v'$。$v'$ 中的每次访问要么是新增——则由第一个条件它满足三条性质——要么在 $v$ 中已存在且被保留；由第二个条件，被保留的访问在 $v'$ 中满足性质（不满足的那些已被移除）。故 $v'$ 中每次访问都满足性质，$v'$ 是安全的。
:::

这个定理几乎平凡。约翰·麦克莱恩（John McLean）1987 年指出，有这样的系统它照样成立：对任何请求，先把每个主体与每个对象降到最低标签再授予——按定义完全"安全"，且毫无用处。教训是：安全模型所作保证的意义只与其安全状态定义的意义相当，而**平静性**（tranquillity）——标签在运行期间不变、或只按严格规则改变——是 Bell–LaPadula 的必要组成部分。有了平静性，定理说明信息不可能*经由模型所见的访问*向下流动。它对**隐蔽信道**则什么也没说：一个 Secret 进程可以通过调制自己的 CPU 占用或磁盘活动，向观察响应时间的 Unclassified 进程发信号。隐蔽信道与旁路信道正是最少的公共机制重要的原因（[[security/security-principles#def-saltzer-schroeder]]）。

::: example 应用 Bell–LaPadula {#ex-blp}
级别 U < C < S < TS，类别取自 $\{\mathit{NUC}, \mathit{EUR}\}$。Smith 少校的许可级别是 (S, {NUC, EUR})；她运行的进程带有同样的标签。判定每个请求：读标签为 (C, {EUR}) 的文档；读 (TS, {NUC})；写 (S, {NUC})；写 (TS, {NUC, EUR})；追加到 (C, {})；读 (S, {NUC, EUR, US})，其中 `US` 是第三个类别。
::: solution
读 (C, {EUR})：S $\ge$ C 且 {NUC, EUR} $\supseteq$ {EUR}，她的标签支配它——允许。读 (TS, {NUC})：TS > S——不上读——拒绝。写 (S, {NUC})：对象必须支配她的标签；{NUC} $\not\supseteq$ {NUC, EUR}，写入会把 EUR 信息泄进只含 NUC 的文档——拒绝。写 (TS, {NUC, EUR})：TS $\ge$ S 且类别相同——允许（上写）。追加到 (C, {})：下写——拒绝。读 (S, {NUC, EUR, US})：她的类别不含 US——拒绝。注意她不能写到*任何*低于其完整标签的对象，甚至她自己此前位于 (S, {NUC}) 的一份文档也不行；实践中她得运行一个当前级别较低的进程，而那个进程就再也读不到她的高密材料了。
:::
:::

### Biba：完整性

肯·比巴（Ken Biba，1977）指出完整性是机密性的对偶。给主体与对象配上**完整性标签**——比如说 *system*、*user*、*untrusted*——并考虑低完整性数据污染高完整性对象的风险。**严格完整性**策略把 Bell–LaPadula 反过来："不上读"（主体只能读完整性标签支配其自身标签的对象，使它不致受可信度更低数据的影响）与"不下写"（主体只能写自己的标签所支配的对象）。

::: proposition 机密性与完整性并用 {#prop-blp-biba}
设系统对每个主体与对象用*同一个*标签同时充当安全标签与完整性标签，并同时强制执行 Bell–LaPadula 与严格 Biba。则主体只能读写与其标签相等的对象。
:::

::: proof
读 $o$ 时，简单安全性质要求 $\lambda(s) \succeq \lambda(o)$，"不上读"要求 $\lambda(o) \succeq \lambda(s)$；由偏序的反对称性，$\lambda(s) = \lambda(o)$。写时，$\star$ 性质要求 $\lambda(o) \succeq \lambda(s)$，"不下写"要求 $\lambda(s) \succeq \lambda(o)$，故同样 $\lambda(o) = \lambda(s)$。
:::

这个命题说明了实践中两个目标为何要用*相互独立*的标签来执行：文档的机密性与它的可信度是两回事（一个公开的软件更新不涉密，但必须具有高完整性）。现代完整性机制大多是 Biba 型的简化。Windows 的**强制完整性控制**（自 Vista，2007）给进程与对象打上 Low、Medium、High 或 System 标签并禁止上写，于是运行在 Low 级的浏览器渲染器不能修改用户的文件。商用完整性更贴切的模型是克拉克（Clark）和威尔逊（Wilson）1987 年的模型：数据只能由经认证的**变换过程**（复式记账的分录，而不是直接改余额）修改，并且认证、执行、审计这些过程的人要职责分离。至于商用机密性，布鲁尔（Brewer）和纳什（Nash）的**中国墙**模型（1989）允许咨询顾问读取任何一家客户公司的数据，此后该公司竞争对手的数据即对其不可访问——一条规则取决于访问历史的策略。

基于标签的 MAC 在 Linux 中以 **SELinux**（源自美国国家安全局，2003 年并入内核）与 AppArmor 部署，用来约束系统服务：被 SELinux 策略约束的失陷 web 服务器能读自己的文档根目录、能写日志，却不能读用户的 home 目录——无论它的 Unix 用户 ID 允许什么。移动操作系统也是强制系统：应用不能互相授予对彼此私有存储的访问。

::: quiz
Bell–LaPadula 模型下，$\star$ 性质阻止下列哪种流动？

- [ ] Secret 主体读一份 Top Secret 文件。
- [x] Secret 主体把读到的文本抄进一份 Unclassified 文件。
- [ ] Unclassified 主体把一张便条写进一份 Secret 文件。
- [ ] Top Secret 主体读一份 Secret 文件。
::: solution
$\star$ 性质禁止写入标签不支配主体标签的对象——下写——这正是 Secret 主体（或扮成它的特洛伊木马）把 Secret 信息泄给 Unclassified 读者的途径。上读（第一项）由简单安全性质阻止；上写（第三项）与下读（第四项）是允许的。
:::
:::

## 基于角色的访问控制

组织不按个体权限思考，而按岗位思考。病房护士可读本病房病人的病历；药剂师可以发药；审计员可以读日志。**基于角色的访问控制**（RBAC；费拉伊奥洛（Ferraiolo）与库恩（Kuhn），1992；桑杜（Sandhu）等，1996；作为 NIST 模型于 2004 年标准化为 ANSI INCITS 359）在用户与权限之间放置角色。

::: definition 基于角色的访问控制 {#def-rbac}
RBAC 系统有用户集 $U$、角色集 $R$、权限集 $P$（对对象的操作）、**用户分配** $UA \subseteq U \times R$ 与**权限分配** $PA \subseteq P \times R$。可选地，$R$ 上一个**角色层次** $\succeq$ 让高级角色继承其下级角色的权限。用户 $u$ 可行使权限 $p$，当存在角色 $r, r'$ 使 $(u, r) \in UA$、$r \succeq r'$、$(p, r') \in PA$。**约束**限制分配：**静态职责分离**禁止任何用户被（直接或间接经继承）同时分配到两个冲突角色；**动态职责分离**禁止在同一会话中同时激活两者。
:::

角色变动缓慢而人员轮岗频繁，于是管理工作变成把人分派到角色——这正是 RBAC 在大组织里值得做的理由。最小特权经由**会话**进入系统：用户只激活当前任务所需的那些角色。

::: example 成绩系统的角色 {#ex-rbac}
角色 Student、TA、Lecturer、Registrar 分别拥有权限 "read own marks"、"read course marks"、"edit course marks"、"publish marks"；Lecturer 高于 TA，TA 高于 Student。Lecturer 与 Registrar 之间静态职责分离（录入成绩者不得同时发布成绩）。用户：alice 是 Lecturer，bob 是 TA，carol 是 Registrar，dave 同时被分配了 Lecturer 与 Registrar。计算每个用户的权限并检查约束。
::: solution
```python
PA = {"Student": {"read own marks"},                 # 权限分配
      "TA": {"read course marks"},
      "Lecturer": {"edit course marks"},
      "Registrar": {"publish marks"}}
SENIOR = {"Lecturer": {"TA"}, "TA": {"Student"}}       # 角色层次：高级 -> 下级
UA = {"alice": {"Lecturer"}, "bob": {"TA"},            # 用户分配
      "carol": {"Registrar"}, "dave": {"Lecturer", "Registrar"}}
EXCLUSIVE = [{"Lecturer", "Registrar"}]                # 静态职责分离

def junior_closure(roles):
    seen, todo = set(), list(roles)
    while todo:
        r = todo.pop()
        if r not in seen:
            seen.add(r); todo.extend(SENIOR.get(r, ()))
    return seen

def permissions(user):
    return set().union(*(PA[r] for r in junior_closure(UA[user])))

for u in UA:
    bad = [sorted(e) for e in EXCLUSIVE if e <= junior_closure(UA[u])]
    print(f"{u:6s} {sorted(permissions(u))}" + (f"  VIOLATES {bad}" if bad else ""))
```

```console
alice  ['edit course marks', 'read course marks', 'read own marks']
bob    ['read course marks', 'read own marks']
carol  ['publish marks']
dave   ['edit course marks', 'publish marks', 'read course marks', 'read own marks']  VIOLATES [['Lecturer', 'Registrar']]
```

Alice 通过层次继承了 TA 与 Student 的权限。Dave 的分配违反职责分离——他可以不经任何其他人在场就改成绩并发布——RBAC 管理工具应当在分配作出时拒绝它，而不是事后报告。另外注意层次的一个副产品：继承 Student 使 Lecturer 得到 "read own marks"，此处无害，但提醒我们继承授予的往往多于本意，应像其他任何授权一样接受审查。
:::
:::

**基于属性的访问控制**（ABAC）把角色推广到关于用户、对象与环境属性的规则（"护士在当班期间可读她所在病房病人的病历"），代价是策略更难分析。

## 能力与混淆代理

诺姆·哈代（Norm Hardy）1988 年描述了一个 ACL 解决不了的问题。分时系统上的一个编译器被赋予写计费文件的权限，用以记录用量。一个用户运行该编译器，并把计费文件指名为*输出*文件。编译器以自己的权限写入，覆盖了计费记录。每一次访问都是被允许的；编译器是一个**混淆代理**（confused deputy），正替不拥有权限的委托人行使它为一项用途而持有的权力。

根源是**环境权限**（ambient authority）：编译器的权限附着在*它是谁*上，于是交到它手里的任何名字都会对照它的全部权限来检查。若用能力，用户会交给编译器一张输出文件的能力——而用户只能为自己可写的文件取得能力——编译器用*那张*能力做输出，自己的计费能力只用于计费。指称与权限同行，委托人就无法诱使代理行使委托人不拥有的权力。web 服务器抓取用户提供的 URL（服务器端请求伪造，[[security/web-security]]）以及跨站请求伪造，就是穿现代服装的混淆代理。

基于能力的系统历史悠久——1970 年代的 Hydra 与 CAP 计算机、1980 年代的 KeyKOS、经形式化验证的 seL4 微内核（2009）——而这些思想正日益进入主流系统：FreeBSD 的 **Capsicum**（沃森（Watson）等，2010）让进程进入能力模式，其中只能使用它已经持有的文件描述符；WebAssembly 的系统接口给模块预先打开的目录而不是整个文件系统；CHERI 处理器体系结构让每个指针都成为带边界的硬件能力（[[security/memory-safety]]）。

## 隔离与沙箱

上面的访问控制机制裁决的是单个请求。**隔离**则缩减一个组件*能够*发出的请求集合，使其失陷造成的损害有限。操作系统的进程边界是基本工具，现代软件沿信任边界拆分成进程：web 浏览器把每个网站渲染在一个独立的低特权进程里，于是渲染器里的一个漏洞只把那个沙箱交给攻击者（Chrome 的**站点隔离**——在 Spectre 表明进程无法防备在其内部运行的代码窃取其秘密之后，于 2018 年默认启用）。OpenSSH 把一个小的特权监视进程与一个解析网络输入的非特权进程分开。容器与虚拟机把边界扩展到整个应用与操作系统，其权衡见 [[operating-systems/virtualisation]]。

**沙箱**收窄的是进程与内核打交道的接口。在 Linux 上，**seccomp** 过滤器（2012 年起）让进程安装一小段程序——用经典 BPF 指令集编写——内核对每一次系统调用运行它，以放行、以错误拒绝、或杀死进程。过滤器只能*移除*权限，一旦安装便不可移除，连进程自己也不行；子进程继承它。

::: example 一个系统调用过滤器 {#ex-seccomp}
安装一个 seccomp 过滤器，使每一次打开文件的尝试都以"权限拒绝"失败，并展示过滤器之前成功的 `open` 在过滤器之后失败。
::: solution
```c
#include <errno.h>
#include <fcntl.h>
#include <linux/audit.h>
#include <linux/filter.h>
#include <linux/seccomp.h>
#include <stddef.h>
#include <stdio.h>
#include <string.h>
#include <sys/prctl.h>
#include <sys/syscall.h>

#define DENY(nr) BPF_JUMP(BPF_JMP | BPF_JEQ | BPF_K, (nr), 0, 1), \
                 BPF_STMT(BPF_RET | BPF_K, SECCOMP_RET_ERRNO | EACCES)

int main(void) {
    struct sock_filter prog[] = {
        /* 读入体系结构号；若非 x86-64 则杀死进程 */
        BPF_STMT(BPF_LD | BPF_W | BPF_ABS, offsetof(struct seccomp_data, arch)),
        BPF_JUMP(BPF_JMP | BPF_JEQ | BPF_K, AUDIT_ARCH_X86_64, 1, 0),
        BPF_STMT(BPF_RET | BPF_K, SECCOMP_RET_KILL_PROCESS),
        /* 读入系统调用号，拒绝那些打开文件的调用 */
        BPF_STMT(BPF_LD | BPF_W | BPF_ABS, offsetof(struct seccomp_data, nr)),
        DENY(__NR_open), DENY(__NR_openat), DENY(__NR_openat2),
        BPF_STMT(BPF_RET | BPF_K, SECCOMP_RET_ALLOW),      /* 其余全部放行 */
    };
    struct sock_fprog fprog = { sizeof prog / sizeof prog[0], prog };

    printf("before: open returns %d\n", open("/etc/hostname", O_RDONLY));
    prctl(PR_SET_NO_NEW_PRIVS, 1, 0, 0, 0);      /* 无 root 特权安装过滤器所必需 */
    if (prctl(PR_SET_SECCOMP, SECCOMP_MODE_FILTER, &fprog) != 0) { perror("prctl"); return 1; }
    int fd = open("/etc/hostname", O_RDONLY);
    printf("after:  open returns %d (%s)\n", fd, fd < 0 ? strerror(errno) : "allowed");
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -o filter filter.c && ./filter
before: open returns 3
after:  open returns -1 (Permission denied)
```

过滤器先检查体系结构，因为系统调用号在不同体系结构之间不同；否则进程可以改用另一种调用约定，来逃避按单一体系结构写的检查。`PR_SET_NO_NEW_PRIVS` 承诺本进程及其子进程再也不会经 setuid 程序获得特权；若没有它，非特权进程可以先安装一个过滤器，再在其作者从未预料的条件之下运行一个 setuid 程序，所以内核坚持要求这一点。这个玩具过滤器是一份**拒绝名单**，是真实场合的错误设计：它会漏过任何它没有点名的触达文件的方式（例如从父进程继承来的描述符）。生产环境的沙箱——浏览器与 systemd 服务的沙箱都是——是**允许名单**——故障安全的默认——只放行组件所需要的那几十个系统调用，而且通常是在组件打开了它将来要使用的一切之后才安装。
:::
:::

同一个模式——先获取资源，再不可撤销地放弃再获取更多资源的权利——出现在 OpenBSD 的 `pledge` 与 `unveil`、Capsicum 的能力模式、以及移动操作系统的权限模型里。这是最小特权的工程化：解析不可信输入的组件，应当是权力最小的那一个。

::: history
巴特勒·兰普森（Butler Lampson）的《保护》（"Protection"，1971；重印于 *Operating Systems Review*，1974）提出了访问控制矩阵，他的《关于封闭问题的一则注记》（"A note on the confinement problem"，1973）指出了隐蔽信道。詹姆斯·安德森（James Anderson）1972 年的报告定义了引用监视器。大卫·贝尔（David Bell）与伦纳德·拉帕杜拉（Leonard LaPadula）1973 至 1976 年间在 MITRE 发展了他们的模型，肯·比巴（Ken Biba）于 1977 年提出他的完整性模型。迈克尔·哈里森（Michael Harrison）、沃尔特·鲁佐（Walter Ruzzo）与杰弗里·乌尔曼（Jeffrey Ullman）在《操作系统中的保护》（"Protection in operating systems"，《Communications of the ACM》，1976）中证明了安全性的不可判定性。Multics（自 1965 年）是第一个围绕保护环、ACL 与强制标签设计的重大系统。大卫·克拉克（David Clark）与大卫·威尔逊（David Wilson）的商用完整性模型发表于 1987 年，大卫·布鲁尔（David Brewer）与迈克尔·纳什（Michael Nash）的中国墙模型发表于 1989 年，诺姆·哈代（Norm Hardy）的混淆代理问题发表于 1988 年，基于角色的访问控制则来自大卫·费拉伊奥洛（David Ferraiolo）与理查德·库恩（Richard Kuhn，1992）以及拉维·桑杜（Ravi Sandhu）等（1996）。美国国家安全局的 SELinux 于 2000 年发布、2003 年并入 Linux 2.6；seccomp 过滤器于 2012 年进入 Linux 3.5，Capsicum 于 2012 年进入 FreeBSD 9。
:::

## 后续内容

访问控制假定引用监视器正确且不可绕过。[[security/memory-safety]] 研究内存损坏漏洞如何让攻击者夺取本该执行它的代码本身，以及阻止漏洞演变为特权提升的防御。[[security/web-security]] 把浏览器当作带着自己策略（同源策略）的引用监视器，以及那些瓦解它的混淆代理。[[security/malware]] 展示攻击者在初获立足点之后如何提升特权、隔离如何把他们关住。信息流——Bell–LaPadula 背后的思想——被提升到程序变量的层面，将在 [[security/secure-development]] 的污点分析中重现；能在其中强制执行它的类型系统见 [[programming-languages/type-systems]]。

::: summary
- **访问控制矩阵**（[[#def-acm]]）记录每个主体对每个对象的权限；**ACL** 存它的列，**能力**存它的行。Unix 存一张压缩的 ACL，只检查第一个匹配的类别（[[#alg-unix-perm]]）；文件描述符是能力。
- **引用监视器**必须总是被调用、不可篡改、可验证（[[#def-refmon]]）。在 web 应用中，应用自己就是监视器，必须在每个请求上检查每个对象。
- **TOCTOU** 竞态（[[#def-toctou]]）起于检查与使用各自以名字指称对象；要让它们指向同一个对象（描述符、原子操作、只复制一次）。
- 对一般的自主系统，一条权限会不会泄露是**不可判定的**（[[#thm-hru]]），由停机问题归约。
- **强制**策略集中固定标签：**Bell–LaPadula**（[[#def-blp]]）禁止上读与下写，**Biba** 为完整性反其道而行；两者都只与其安全状态概念同样可靠，且对隐蔽信道不置一词。
- **RBAC**（[[#def-rbac]]）把权限配给角色、角色配给用户，并有层次与职责分离约束。
- 环境权限造成**混淆代理**；能力让指称与权限同行。**沙箱**如 seccomp（[[#ex-seccomp]]）收窄进程的内核接口，且应当做成允许名单。
:::

## 习题

::: exercise 读权限位 {level=1}
一个文件的模式是 `-rw-r-----`，属主 `alice`，属组 `staff`。对每个进程说明它能否读、能否写这个文件：(a) 有效用户 `alice`；(b) 用户 `bob`，`staff` 成员；(c) 用户 `carol`，不在 `staff`；(d) 若模式改为 `----rw-rw-` 时的用户 `alice`。
::: solution
(a) 属主位 `rw-`：可读可写。(b) 组位 `r--`：只读。(c) 其他人位 `---`：都不行。(d) Alice 是属主，所以只有属主位 `---` 适用：都不行——尽管属组和其他人都能读写。不过她可以 `chmod` 把文件改回来，因为属主总能修改模式（[[#alg-unix-perm]]）。
:::
:::

::: exercise 八进制模式 {level=1 check="750"}
用八进制写出这样的模式：属主可读、可写、可执行，组可读、可执行，其他人无任何权限。（把三个八进制数字作为一个数填入。）
::: solution
每个类别是一个 3 位数字：$r = 4$、$w = 2$、$x = 1$。属主 $4 + 2 + 1 = 7$，组 $4 + 1 = 5$，其他人 $0$，即 `750`（`rwxr-x---`）。
:::
:::

::: exercise 数标签 {level=1 check="64"}
一个系统有 $4$ 个级别和 $4$ 个类别。共有多少个安全标签？（填入数字。）
::: solution
标签是一个级别加上类别集的一个子集：$4 \times 2^4 = 64$。
:::
:::

::: exercise Bell–LaPadula 判定 {level=2}
级别 U < C < S < TS，类别 $\{A, B, C\}$，主体标签为 (S, {A, B})。对每个对象说明主体可读、可写、皆可还是皆不可：(a) (C, {A})；(b) (S, {A, B})；(c) (TS, {A, B, C})；(d) (S, {C})；(e) (U, {})。
::: solution
读要求主体 $\succeq$ 对象；写要求对象 $\succeq$ 主体。(a) S $\ge$ C 且 {A, B} $\supseteq$ {A}：只读。(b) 标签相等：皆可。(c) TS $\ge$ S 且 {A, B, C} $\supseteq$ {A, B}：只写。(d) 互不支配（{A, B} 与 {C} 不可比）：皆不可。(e) 主体支配对象：只读。
:::
:::

::: exercise 数职责分离 {level=2 check="3"}
一个组织有角色 $r_1, \dots, r_6$ 和静态职责分离约束 $\{r_1, r_2\}$、$\{r_3, r_4\}$、$\{r_5, r_6\}$（任何用户不得同持一对中的两个角色）。没有层次时，单个用户最多可以持有几个角色？（填入数字。）
::: solution
约束把角色分成三对，每对至多取一个，所以至多 $3$ 个角色——例如 $\{r_1, r_3, r_5\}$——而且每对各取一个的选择都允许，共 $2^3 = 8$ 种极大组合。
:::
:::

::: exercise 找出 TOCTOU 漏洞 {level=2}
一个 setuid-root 程序从调用者收到一个文件名，并执行：`stat(name)`；若文件属主是调用者，则 `open(name, O_WRONLY)` 并把调用者的数据写进去。解释这一竞态，并给出改正后的设计。
::: solution
在 `stat` 与 `open` 之间，调用者可以把 `name` 换成一个指向 root 拥有文件的符号链接（或把另一个文件改名顶上）；检查看的是调用者的文件，以 root 特权进行的 open 作用于的却是另一个文件。改法：(1) 打开之前用 `seteuid` 临时把有效用户 ID 切到调用者，让内核在 `open` 时自带的检查就是检查本身，之后再切回；或 (2) 先用 `O_NOFOLLOW` 打开（在 Linux 上再用 `openat2` 配 `RESOLVE_NO_SYMLINKS`，以覆盖每一个路径分量），然后对描述符 `fstat`，核验其属主并确认它是普通文件，再写入。更好的办法是重新设计，使 setuid 程序根本不再需要——例如一个只接受调用者自己打开的描述符的服务，那张描述符正是调用者所能写的那个文件的能力。
:::
:::

::: exercise 混淆代理与能力 {level=3}
一个打印服务有权读每个用户的文件，以便打印它们。用户按文件名提交任务。(a) 说明用户如何能打印另一个用户的私有文件，并把这一攻击与 [[#def-refmon]] 联系起来。(b) 用能力重新设计这个服务。(c) 解释为什么仅仅让服务在打印前检查"请求的用户能否读这个文件"比 (b) 更弱。
::: solution
(a) 用户提交一个她无权读的文件名；服务以自己的权限打开并打印。引用监视器（内核）检查的是*服务*的权限——那是它唯一看得见的；"用户只能打印自己可读的文件"这条策略从未被仲裁，因为所用的权力是服务的环境权限。(b) 客户端自己打开文件——内核检查的是客户端的权限——并经 Unix 域套接字把已打开的描述符传给服务。服务本身完全没有环境读权限；它只能读客户端递到手里的东西，因此不会犯糊涂。(c) 按名字检查是 TOCTOU 竞态：在服务的检查（比如说用 `access()`，或代调用者读权限位）与它的 `open` 之间，用户可以把名字换成指向受保护文件的符号链接。服务还得精确地重新实现内核的访问控制逻辑（ACL、组成员关系、强制标签），任何不一致都是漏洞。传一张能力，就让检查与使用成为同一个动作，由真正的引用监视器完成。
:::
:::

::: exercise 受限系统的安全性 {level=3}
考虑这样的保护系统：其命令从不创建主体或对象（只填入与删除权限），有 $n$ 个主体、$m$ 个对象，权限集 $\mathcal R$ 含 $k$ 条权限。证明这类系统的安全性可判定，并给出判定过程必须探索的保护状态数的界。为什么这与 [[#thm-hru]] 不矛盾？
::: solution
没有创建时，集合 $S$ 与 $O$ 固定，于是一个保护状态由矩阵完全决定：$nm$ 个格子每格持有 $\mathcal R$ 的一个子集，共至多 $2^{knm}$ 个状态。命令把状态映到状态，所以从初始状态可达的状态集可以在这张有限图上作广度优先搜索求出；当且仅当搜索到达一个把 $r$ 填入原本缺少 $r$ 的格子的转移时，状态对 $r$ 不安全。搜索必然终止，因为它至多访问每个状态一次，故安全性可判定，时间为 $O(2^{knm})$ 乘以对每条命令尝试其参数的每种绑定的代价（参数取值于固定的有限集，故只有有限种）。这与 [[#thm-hru]] 不矛盾，因为那里的归约需要创建主体来模拟无界的带；没有创建时，"带"是有界的，系统类似一台线性有界自动机，其停机性可判定。这个界是指数级的，而且 HRU 证明了无创建系统的安全性是 $\mathsf{PSPACE}$ 完全的，所以可判定，但一般而言并不高效。
:::
:::
