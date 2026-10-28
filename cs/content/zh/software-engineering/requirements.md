「系统应在三次登录失败后锁定用户的账户。」这句话看起来是完整的。现在试着实现它。连续三次失败，还是累计三次？在什么时段内——一分钟、一天、账户的整个存续期？一次成功登录会重置计数吗？账户被锁多久，由谁来解锁？计数是按账户还是按网络地址？每个问题都有好几种合理的回答，不提问的程序员会不知不觉地挑定一种，而这些选择很重要：一个没有时限的锁定机制，能让任何知道你的用户名的人把你永久锁在你自己的账户之外——这就把一个安全特性变成了一次拒绝服务攻击。

**需求工程**是弄清楚系统应当做什么、把它写到足以据以构建和检验的精确程度、并让世界变化时让这份描述保持正确的学问。弗雷德里克·布鲁克斯（Frederick Brooks）称之为这项工作中最难的部分：「构建一个软件系统最难的单一环节，是精确地决定要构建什么」（《没有银弹》，1986）。本章建立词汇——功能需求与非功能需求、世界与机器之间的区分——以及技术：获取、结构化自然语言、用例、带可执行验收标准的用户故事、能机械地检查漏洞与矛盾的决策表，以及从需求到测试的追踪。

## 什么是需求

::: definition 需求 {#def-requirement}
**需求**是系统为满足其干系人而必须具有的某种性质的陈述。**干系人**是受系统影响的个人与组织：用户、付钱的客户、运营者、监管机构，以及利益被它触及的其他人。**功能需求**规定系统必须*做*什么——作为对输入或事件的响应的行为。**非功能需求**（**质量需求**）规定它必须做得多好、或在什么条件下做到：性能、可靠性、安全性、易用性、无障碍性、可维护性、可移植性。**约束**限制解：编程语言、必须遵守的法规、必须与之互操作的既有系统。
:::

需求为不同的读者写在不同的详细层次上。**用户需求**用用户的语言描述他们的需要（「顾客能查看哪些座位是空的」）。**系统需求**精确规定软件必须做什么来满足它们（「座位图应将每个座位的状态显示为空闲、保留或已售，并在任何变动后 2 秒内更新」）。两者说的都是*做什么*，不是*怎么做*：「用哈希表存放座位」是一个设计决策，把它写进需求毫无理由地排除了更好的设计。

### 世界与机器

需求关乎世界，但软件只能控制机器。迈克尔·杰克逊（Michael Jackson）与帕梅拉·扎夫（Pamela Zave）在《需求工程四个幽暗的角落》（"Four dark corners of requirements engineering"，*ACM TOSEM*，1997）中把这一区分精确化了。

::: definition 需求、规格说明、领域知识 {#def-wsr}
设 $R$（**需求**）是世界的期望性质；$S$（**规格说明**）是机器在与世界的接口处——它的输入与输出——所要求的机器行为；$W$（**领域知识**，或领域假设）是无论机器做什么都成立的世界事实与假设。若
$$
W \wedge S \;\vdash\; R ,
$$ {#eq-wsr}
即领域知识成立且机器满足其规格说明的每种情形下需求都得到满足，则称规格说明是**充分的**。
:::

这个定义解释了一种常见的经历：软件满足规格说明，系统却仍然失败。若领域假设 $W$ 为假，[[#eq-wsr]] 就什么也没有承诺。问题不在于推理错了，而在于它的一个前提是关于世界的，而在那里工程师不能简单地决定什么是真的。

::: example 一条失败的领域假设 {#ex-warsaw}
1993 年 9 月 14 日，一架空客 A320 在大雨和强侧风中降落在华沙，冲出跑道末端；两人遇难。需求 $R$ 是：*当且仅当飞机在地面上时，才启用反推与扰流板*（在空中展开它们是危险的）。记 $g$ 为「飞机在地面」，$w$ 为「两个主起落架都报告轮载」，$s$ 为「机轮转速超过某个阈值」，$e$ 为「制动系统启用」。证明规格说明 $S: e \leftrightarrow (w \vee s)$ 在领域假设 $W: g \leftrightarrow (w \vee s)$ 下是充分的，并解释当时发生了什么。
::: solution
我们必须证明 $\bigl(g \leftrightarrow (w \vee s)\bigr) \wedge \bigl(e \leftrightarrow (w \vee s)\bigr) \to (g \leftrightarrow e)$ 是重言式。若两个合取项都成立，则 $g$ 与 $e$ 各自与 $w \vee s$ 有相同的真值，因而彼此有相同的真值。（下面的图检验了全部 16 行。）所以机器的设计相对于 $W$ 是正确的。

但那一天 $W$ 不成立。由于侧风，飞机先以一个主起落架触地，所以 $w$ 为假；在积水的跑道上机轮被水垫住而没能转起来，所以 $s$ 为假。飞机在地面（$g$ 真）而 $w \vee s$ 为假，于是机器按照它的规格说明、正确地、让制动关闭了好几秒。调查发现了多种促成因素，包括机组的进近速度与风的信息，但这个案例是该公式的标准例证：逻辑是对的，对世界的假设不对。补救要同时对 $W$ 和 $S$ 下手——什么样的传感器证据算作「在地面」，以及机器最长可以等待多久。
:::
:::

::: widget truthtable
formula: ((g <-> (w | s)) & (e <-> (w | s))) -> (g <-> e)
caption: [[#ex-warsaw]] 的充分性论证：$W \wedge S \to R$，其中 $g$ = 在地面，$w$ = 两个主起落架都有轮载，$s$ = 机轮在旋转，$e$ = 制动启用。最后一列在每一行都为真，所以该蕴含式是重言式。再看 $g$ 为真而 $w$、$s$ 为假的行：那里 $W$ 为假，前提不成立，需求 $g \leftrightarrow e$ 也为假。这就是华沙那次着陆。
:::

教训可以推广：需求文档应当显式记录其领域假设（「本线列车不超过 200 km/h」「用户有可用的电子邮箱地址」「时钟从不倒拨」），让了解领域的人能够评审它们，并能在运行中监测它们。

## 获取需求

需求不是躺在哪里等着被收集的；它们是被发现、被协商、有时是被发明出来的。**获取**（elicitation）使用若干互补的技术。与干系人的**访谈**，开放式的（用于探索）或结构化的（带着预先准备的问题）。对人们正在做的、系统将去支持的工作的**观察**——人类学式的研究常常发现，成文的规程并不是人们实际的做法。**工作坊**把意见冲突的干系人召集到一起协商。**场景**逐步走完一个具体的事例。**原型**，从纸上草图到可点击的模型（[[hci]]），让用户对具体的东西作出反应，这比抽象地描述自己想要什么容易得多。

获取之所以困难，原因不在技术层面。大量领域知识是**隐性的**：经验丰富的护士知道哪些报警可以不理，却难以说清凭什么。干系人的需求相互**冲突**：财务部门要求每笔报销经两位经理审批，员工则希望一天内拿到报销。人们描述的是解决方案而不是问题（「我们需要一个下拉菜单」），分析员必须追问这个解决方案是为了解决什么。而构建系统这一行为本身会改变需求，因为看到系统运行起来的用户会发现自己真正需要什么。

::: warning 「客户知道自己要什么」
人们容易把需求当作客户递过来的一张清单，日后的一切变更便都是客户的责任。经验却给出相反的答案：任何人用的系统，其需求都会变，因为人在学习，业务在变，系统本身也在改变人们的工作。要把需求当作一个需要确认与修订的模型，为变更留出预算，并优先选择让可工作的软件尽早到达用户手中的过程（[[software-engineering/software-process]]）。另一个方向的错误是**镀金**：因为某个特性看起来有用就把它加上，而没有人要求过它。每个特性都在其后的测试与维护中永远带有成本；每条需求都应能追溯到某个干系人的需要。
:::

## 把需求写下来

### 结构化自然语言

多数需求用自然语言写成——它表达力强、人人能读——但有歧义。好的实践对它加以约束。每条需求是一个句子，用「应」（shall）规定强制行为，有一个标识符，并且是**可验证的**：存在一个有限的测试或检查，能够判定它是否成立。

::: definition 可验证的需求 {#def-verifiable}
若存在一个客观、有限的程序——测试、测量、检查或分析——其结果能判定系统是否满足某条需求，则该需求是**可验证的**。像「快」「对用户友好」「健壮」「灵活」「酌情」「等等」这类词，以及不带度量的「尽量减小」，都会让需求不可验证。
:::

非功能需求通常是犯规大户，而解决办法是使其可度量：写明度量指标、目标值、以及它必须成立的条件。

| 含糊 | 可验证 |
|---|---|
| 搜索应很快。 | 在基准硬件上 200 个并发用户时，95% 的搜索应在 300 ms 内返回结果。 |
| 系统应可靠。 | 订票服务在每个日历月的可用时间应达 99.9%，已公告的维护除外。 |
| 界面应易于使用。 | 经过 10 分钟的介绍，来自目标群体的 10 名首次使用者中应有 9 名能在无人帮助下完成一次订票。 |
| 系统应安全。 | 口令只能以加盐哈希的形式存储，并使用内存困难函数（[[security/authentication]]）。 |

功能需求一种广泛使用的规范是 **EARS**，即「简易需求语法方法」（Easy Approach to Requirements Syntax；罗尔斯-罗伊斯公司的梅文（Mavin）等人，2009）。它给出五个句型，每个句型的子句顺序固定：

- *全称型*（Ubiquitous）：「⟨系统⟩应⟨响应⟩。」——自助终端应以英镑显示价格。
- *事件驱动型*（Event-driven）：「当⟨触发⟩时，⟨系统⟩应⟨响应⟩。」——插入银行卡时，自助终端应请求输入 PIN。
- *状态驱动型*（State-driven）：「处于⟨状态⟩期间，⟨系统⟩应⟨响应⟩。」——账户处于锁定状态期间，系统应拒绝每一次登录尝试。
- *非期望行为型*（Unwanted behaviour）：「若⟨条件⟩，则⟨系统⟩应⟨响应⟩。」——若 15 分钟内连续三次登录尝试失败，则系统应将账户锁定 30 分钟。
- *可选特性型*（Optional feature）：「若包含⟨特性⟩，⟨系统⟩应⟨响应⟩。」——若启用了双因素认证，系统应在口令之后请求一次性验证码。

这些句型不会靠魔法消除歧义，但它们迫使写作者说清一个行为由什么触发、发生在什么状态——这正是多数遗漏藏身之处。

::: quiz
下列需求中哪一条按原样是可验证的？
- [ ] 系统应对用户输入快速响应。
- [ ] 系统应支持大量用户。
- [x] 用户提交表单时，系统在基准负载下应在 99% 的情形内于 2 秒内显示确认信息。
- [ ] 系统应尽可能可靠。
::: solution
只有第三条给出了触发、响应、度量（确认时间）、目标（2 秒、99%）与条件（基准负载），测试可以据此裁决。「快」「大量」「尽可能可靠」给不出阈值；任何系统都可以被论证为满足或违反它们。
:::
:::

### 用例

**用例**（use case；伊瓦尔·雅各布森（Ivar Jacobson），1987；阿利斯泰尔·科伯恩（Alistair Cockburn）在《有效用例》（*Writing Effective Use Cases*，2001）中进一步发展）描述一个**参与者**（actor）——一个人或另一个系统——如何使用系统达成一个目标。它由一个**主成功场景**——一切顺利时按编号排列的步骤——和若干**扩展**组成，后者说明某一步出现不同情况时会发生什么。扩展才是真正的需求被发现的地方。

::: example 取现的用例 {#ex-use-case}
写出一名顾客从银行自动柜员机上取钱的主成功场景与扩展。
::: solution
**用例：**取现金。**主参与者：**持卡人。**其他参与者：**银行的账户系统。**前置条件：**机器处于服务状态。**成功保证：**顾客拿到现金和银行卡，且账户被恰好多借记所付出的金额。

**主成功场景。**

1. 顾客插入银行卡。
2. 机器读卡并请求 PIN。
3. 顾客输入 PIN；银行验证它。
4. 顾客选择一个金额。
5. 银行授权取款，并对该金额作冻结。
6. 机器先退卡，再出钞。
7. 机器向银行确认现金已被取走；银行借记账户。

**扩展。**

- 2a. 卡无法读出：机器退卡并显示消息。
- 3a. PIN 错误：机器再次请求；第三次 PIN 错误后吞卡。
- 4a. 金额不是最小面额的整数倍：机器要求另选金额。
- 5a. 余额不足：机器提供一个较小的金额或退卡。
- 5b. 银行没有响应：机器退卡，不出钞。
- 6a. 30 秒内未取钞：机器收回钞票，并通知银行解除冻结。
- \*a. 第 5 步之后任一时刻断电：重新启动时，机器向银行报告钞票是否已经付出。

注意扩展迫使我们做了哪些决定。*先*退卡*后*出钞（第 6 步）是一条深思熟虑的需求：顾客会忘记排在后面的那样东西，而忘卡比忘钱更糟。扩展 6a 与 \*a 与成功保证相呼应——账户必须恰好借记实际付出的金额，即便中途出错——这是 [[databases/transactions]] 与 [[distributed-systems]] 所研究的交易性需求。
:::
:::

### 用户故事与验收标准

敏捷团队通常把需求记成**用户故事**——用用户的话说的简短陈述，惯例上采用 2001 年前后在英国公司 Connextra 流行起来的格式：

> 作为⟨角色⟩，我想要⟨目标⟩，以便⟨收益⟩。

「作为持卡人，我想要我的账户在多次登录失败后被锁定，以便猜我的口令的人进不来。」故事是故意不完整的：罗恩·杰弗里斯（Ron Jeffries）把它说成一张*卡片*（那句话）、一场*对话*（补全细节的讨论）和一个*确认*（说明何时算完成的验收标准）。比尔·韦克（Bill Wake）的记忆口诀 **INVEST**（2003）列出了好故事的品质：独立（Independent）、可协商（Negotiable）、有价值（Valuable）、可估计（Estimable）、小（Small）、可测试（Testable）。

精确性进入的地方是确认。验收标准常写成**场景**，采用行为驱动开发的 Given–When–Then 形式（丹·诺斯（Dan North），2006）：*给定*一个起始状态，*当*某个事件发生，*则*观察到一个结果。这样写，它们几乎可以逐行翻译成自动化测试——需求变得**可执行**。

::: example 可执行的验收标准 {#ex-acceptance}
团队定下了导言里的问题：*连续*三次失败、且都发生在 15 分钟之内，账户锁定 30 分钟；一次成功的登录重置计数。把验收标准写成自动化测试，并写出一个能通过它们的实现。
::: solution
实现保存最近连续失败发生的时刻。为了让依赖时间的行为不必等待就能测试，时钟是一个参数（这一技术我们在 [[software-engineering/testing]] 中还会回到）：

```python
LIMIT = 3                 # 触发账户锁定的连续失败次数
WINDOW = 15 * 60          # ……前提是它们都落在 15 分钟以内（单位：秒）
LOCK_TIME = 30 * 60       # 账户保持锁定的时长（单位：秒）

class Account:
    def __init__(self, password, clock):
        self._password = password   # 真实系统存储的是加盐哈希
        self._clock = clock         # 一个返回秒数的函数
        self._failures = []         # 连续失败尝试发生的时刻
        self._locked_until = None

    def locked(self):
        return self._locked_until is not None and self._clock() < self._locked_until

    def login(self, attempt):
        if self.locked():
            return "locked"
        now = self._clock()
        if attempt == self._password:
            self._failures = []
            return "ok"
        self._failures = [t for t in self._failures if now - t < WINDOW] + [now]
        if len(self._failures) >= LIMIT:
            self._locked_until = now + LOCK_TIME
            self._failures = []
            return "locked"
        return "wrong"
```

测试使用 pytest，其中测试就是名字以 `test_` 开头、用普通 `assert` 检查的函数（[[programming-1/testing-debugging]]）。注释带着 Given–When–Then 结构：

```python
from lockout import Account

class FakeClock:
    """测试可控的时钟，这样任何测试都不必等待。"""
    def __init__(self):
        self.now = 0.0
    def __call__(self):
        return self.now
    def advance(self, minutes):
        self.now += 60 * minutes

def make():
    clock = FakeClock()
    return Account("correct horse", clock), clock

def test_three_failures_within_window_lock_the_account():
    # 给定：一个近期没有失败记录的账户
    acct, clock = make()
    # 当：十分钟内三次输入错误口令
    for _ in range(3):
        result = acct.login("guess")
        clock.advance(5)
    # 则：第三次尝试报告账户已锁定
    assert result == "locked"
    # 并且：锁定期间即使正确的口令也被拒绝
    assert acct.login("correct horse") == "locked"

def test_failures_spread_over_more_than_the_window_do_not_lock():
    acct, clock = make()
    for _ in range(3):
        assert acct.login("guess") == "wrong"
        clock.advance(10)          # 失败发生在第 0、10、20 分钟

def test_lock_expires_after_thirty_minutes():
    acct, clock = make()
    for _ in range(3):
        acct.login("guess")
    clock.advance(30)
    assert acct.login("correct horse") == "ok"
```

```console
$ pytest -v test_lockout.py
...
test_lockout.py::test_three_failures_within_window_lock_the_account PASSED [ 33%]
test_lockout.py::test_failures_spread_over_more_than_the_window_do_not_lock PASSED [ 66%]
test_lockout.py::test_lock_expires_after_thirty_minutes PASSED           [100%]

============================== 3 passed in 0.16s ===============================
```

测试名读起来就是需求，而第二个测试钉死了英文原文留下未定的一种解释：窗口是*滑动*的（第 20 分钟时，第 0 分钟的那次失败不再计入），而不是一个固定的 15 分钟区间。如果干系人另有意思，分歧现在暴露在某一行测试里，而不是埋在实现中。故事仍然需要非功能标准：这里安全评审人会要求把锁定机制与限流结合，因为固定的锁定机制让攻击者可以锁定任何他知道其名称的账户（[[security/authentication]]）。
:::
:::

::: widget graph
nodes: Active@0,1; OneFailure@1,0; TwoFailures@2,0; Locked@3,1
edges: Active>OneFailure; OneFailure>TwoFailures; TwoFailures>Locked; OneFailure>Active; TwoFailures>Active; Locked>Active
algorithm: bfs
start: Locked
caption: 把锁定需求看成一个状态机（忽略 15 分钟窗口后的简化）：一次失败向右移动，一次成功回到 `Active`，30 分钟计时器从 `Locked` 指回 `Active`。从 `Locked` 出发做广度优先搜索：每个状态都从它可达，所以账户永远不会被永久锁定。这样的状态模型让「用户总能恢复」这类需求可以用图搜索来检验；[[software-engineering/verification]] 会把这一想法自动化为模型检查。
:::

## 检查需求的完备性与一致性

许多需求是这样一类规则：从条件组合中选出一个动作——折扣、费用、资格、访问权限。写成散文时，这类规则常常漏掉某些组合，或者对某些组合用不同的结果覆盖两次。写成**决策表**，就能机械地检查。

::: definition 决策表、完备性与一致性 {#def-decision-table}
设 $c_1, \dots, c_k$ 为布尔**条件**。一个**情形**是对每个条件指派真或假；共有 $2^k$ 个情形。一条**规则**是一个二元组（模式，动作），其中模式给部分条件赋值、其余留作「无关」；若某个情形与模式中的每个取值都相符，就称该规则**匹配**这个情形。**决策表**是规则的列表。若每个情形都至少被一条规则匹配，则它是**完备的**；若没有情形被两条动作不同的规则同时匹配，则它是**一致的**。
:::

::: proposition 计算规则覆盖的情形数 {#prop-rule-cover}
模式指定了 $k$ 个条件中的 $j$ 个的规则，恰好匹配 $2^{k-j}$ 个情形。两条规则匹配某个公共情形，当且仅当它们的模式在两者共同指定的每个条件上一致。
:::

::: proof
一个匹配的情形由未指定的 $k - j$ 个条件的取值决定，每个都可以自由选取，所以共有 $2^{k-j}$ 个。第二个论断：若两个模式在某个共同指定的条件上不一致，就没有情形能同时与两者相符，因此没有情形同时匹配两者。若它们在每个公共条件上一致，就构造一个情形：对任一规则指定的每个条件取该指定的值（不会冲突），其余条件任意取值；它同时匹配两条规则。
:::

这个命题给出一个快捷的手工检查——若各规则的覆盖数 $2^{k-j}$ 之和小于 $2^k$，决策表必不完备——以及一个对不一致的平方级检查：比较每一对动作不同的规则。$k$ 很小时，最简单的办法是枚举全部 $2^k$ 个情形。

::: example 配送费 {#ex-decision-table}
产品经理写道：「标准配送对会员和超过 £50 的订单免费。加急配送对非会员收 £9.99，超过 £50 的收 £4.99。」把它变成决策表并加以检查。
::: solution
条件是 `member`、`over_50` 与 `express`，所以有 $2^3 = 8$ 个情形。每个句子片段变成一条规则，再用一个小程序枚举全部情形：

```python
from itertools import product

CONDITIONS = ["member", "over_50", "express"]
# 每条规则：(模式, 动作)。模式把条件映射到 True 或 False；
# 模式没有提到的条件是“无关”的。
RULES = [
    ({"express": False, "member": True},  "free"),
    ({"express": False, "over_50": True}, "free"),
    ({"express": True,  "member": False}, "9.99"),
    ({"express": True,  "over_50": True}, "4.99"),
]

def matches(pattern, case):
    return all(case[c] == v for c, v in pattern.items())

def check(conditions, rules):
    """报告没有任何规则覆盖（漏项）、或被动作互不相同的规则
    同时覆盖（冲突）的每一种条件组合。"""
    for values in product([False, True], repeat=len(conditions)):
        case = dict(zip(conditions, values))
        actions = {a for p, a in rules if matches(p, case)}
        if not actions:
            print("gap:     ", case)
        elif len(actions) > 1:
            print("conflict:", case, sorted(actions))

check(CONDITIONS, RULES)
```

```console
$ python3 decision_table.py
gap:      {'member': False, 'over_50': False, 'express': False}
conflict: {'member': False, 'over_50': True, 'express': True} ['4.99', '9.99']
gap:      {'member': True, 'over_50': False, 'express': True}
```

三个要问产品经理的问题，而粗心的散文读者未必能发现任何一个：小订单的非会员标准配送收多少钱（大概有一个没人提到的标准费用）；小订单的会员加急配送收多少钱（文中没有给出价格）；订单较大的非会员付 £9.99 还是 £4.99？由 [[#prop-rule-cover]]，每条规则指定 3 个条件中的 2 个、覆盖 $2^1 = 2$ 个情形，所以四条规则至多覆盖 8 个情形名额——某一个情形上的重叠，正解释了为什么剩下两个情形无人覆盖。动作*相同*的规则之间的重叠（会员的大额标准订单）是无害的。
:::
:::

对于更大的表，枚举 $2^k$ 个情形变得不切实际，而「是否存在不被任何规则匹配的情形？」和「是否存在同时匹配两条冲突规则的情形？」这两个问题成为可满足性问题——SAT 和 SMT 求解器对几百个条件也能常规地给出回答（[[software-engineering/verification]]）。同样的思想用在防火墙规则和访问控制策略上，能找到真实的安全漏洞。

## 确认与管理需求

**确认**（validation）追问需求是否描述了干系人实际需要的东西；**验证**（verification）则在后面追问系统是否满足了它们——用博姆的说法，是「我们在造正确的产品吗？」对「我们在正确地造产品吗？」。确认的技术包括**评审**——干系人和开发者对照一份检查清单（可验证？一致？完备？可行？可追踪？）系统地通读需求、**原型**，以及**测试用例生成**：如果你无法为一条需求写出测试，它就还不是一条需求。

**需求变更**才是常态而不是例外，所以需求要像代码一样管理：每条都有标识符、负责人、状态、优先级和历史。有两件工具特别突出。

**优先级排序。** 不可能一切都立刻构建。**MoSCoW**（源自 DSDM 方法，20 世纪 90 年代）把需求分为*必须有*、*应该有*、*可以有*与*本次不做*。**卡诺模型**（狩野纪昭（Noriaki Kano），1984）区分*基本型*期望（没有会引发不满，有了也不被注意）、*期望型*属性（越多越好）与*兴奋型*（出人意料却讨人喜欢的特性）。敏捷团队按价值与成本为产品待办列表排序，并在每次迭代重新排序。

::: definition 可追踪性 {#def-traceability}
**可追踪性**是能够双向追踪一条需求的生命：向后追到它的来源（某个干系人、某条法规、某个更高层的目标），向前追到实现它并检验它的设计元素、代码与测试。**追踪矩阵**记录这些联系。若每条需求都至少链接到一个测试，则**前向完备**成立；若每个测试（以及每一部分设计）都至少链接到一条需求，则**后向完备**成立。
:::

::: example 检查可追踪性 {#ex-trace}
锁定特性的四条需求与四个测试按下图链接。找出缺口。
::: solution
```python
requirements = {
    "R1": "Lock the account after 3 failures within 15 minutes",
    "R2": "Unlock automatically after 30 minutes",
    "R3": "Notify the user by e-mail when the account is locked",
    "R4": "Log every failed attempt with its time",
}
tests = {   # 测试名 -> 它检验的需求（例如来自测试文件中的一个标记）
    "test_three_failures_within_window_lock_the_account": {"R1"},
    "test_failures_spread_over_more_than_the_window_do_not_lock": {"R1"},
    "test_lock_expires_after_thirty_minutes": {"R2"},
    "test_password_is_case_sensitive": set(),
}
covered = set().union(*tests.values())
print("untested requirements:", sorted(set(requirements) - covered))
print("tests tracing to no requirement:", [t for t, rs in tests.items() if not rs])
print("unknown requirement ids:", sorted(covered - set(requirements)))
```

```console
$ python3 trace.py
untested requirements: ['R3', 'R4']
tests tracing to no requirement: ['test_password_is_case_sensitive']
unknown requirement ids: []
```

R3 和 R4 没有测试：前向完备不成立，要么补写测试，要么这两条需求根本没有被交付。口令大小写敏感性的测试检验的是没有人写下来的行为：要么缺一条需求（口令比较区分大小写——想必是有意如此），要么这个测试检验的是没有人需要的东西。在安全攸关的行业，诸如航空软件 DO-178C 之类的标准要求完备的双向可追踪性，作为认证证据；在多数其他项目里，一个轻量版本——引用故事标识符的测试名或标记——就能提供大部分好处。
:::
:::

*及早*把需求弄对到底有多重要？许多教材反复引用一种说法，且常被追溯到博姆的《软件工程经济学》（1981）：缺陷在交付后修复的代价是需求阶段的 10 到 100 倍。博姆的数据来自 20 世纪 70 年代的大型计划驱动项目，那时一次晚期变更意味着修改大量文档。后来的证据毁誉参半：门齐斯（Menzies）、尼科尔斯（Nichols）、舒尔（Shull）与莱曼（Layman）（"Are delayed issues harder to resolve?"，*Empirical Software Engineering*，2017）用遵循严格流程的 171 个项目做了检验，没有发现较晚发现的问题修复代价的一般性增长。审慎的解读是：较晚发现的代价取决于过程与错误的种类——任何过程里，一个被误解的核心业务规则都很难廉价地推翻，而一个标签上的错别字则不然——所以要把「100 倍」当作一个关于某些项目的假说，而不是自然常数。

::: history
道格拉斯·罗斯（Douglas Ross）与肯尼斯·肖曼（Kenneth Schoman）的《需求定义的结构化分析》（"Structured analysis for requirements definition"，*IEEE Transactions on Software Engineering*，1977）是最早把需求当作一门独立学问来对待的呼吁之一。IEEE 的《软件需求规格说明推荐实践》（IEEE 830，1984 年首次发布，1998 年修订）列出了一份好的规格说明应有的品质——正确、无歧义、完备、一致、有优先级、可验证、可修改、可追踪——后被 ISO/IEC/IEEE 29148（2011，2018 年修订）取代。伊瓦尔·雅各布森（Ivar Jacobson）于 1987 年在 OOPSLA 上引入了用例。帕梅拉·扎夫（Pamela Zave）与迈克尔·杰克逊（Michael Jackson）1997 年的论文把世界与机器分开。肯特·贝克（Kent Beck）的极限编程（1999）把用户故事作为计划的单位，迈克·科恩（Mike Cohn）的《用户故事与敏捷方法》（*User Stories Applied*，2004）将其成文规范，阿利斯泰尔·梅文（Alistair Mavin）的 EARS 句型（2009）则出自为喷气发动机控制软件撰写需求的实践。
:::

## 后续内容

需求为每一种后续活动提供输入。质量需求驱动体系结构（[[software-engineering/software-architecture]]）；验收标准变成系统测试与验收测试（[[software-engineering/testing]]）；形式化的需求变成模型检查器所验证的性质（[[software-engineering/verification]]）；而需求所描述其需要的那些人，在以人为本的设计（[[hci/user-centred-design]]）中得到系统的研究。关于个人数据与无障碍的需求常常是法律义务，在 [[software-engineering/professional-ethics]] 中讨论。

::: summary
- **需求**陈述干系人需要的性质；区分功能需求、非功能（质量）需求与约束（[[#def-requirement]]），并把*做什么*与*怎么做*分开。
- 需求存在于世界，规格说明在机器的接口处：规格说明充分的判据是 $W \wedge S \vdash R$（[[#def-wsr]]）。要把领域假设写下来；当它们失效时，正确的软件也会导致失败的系统。
- 用访谈、观察、工作坊、场景与原型获取需求；预期遇到隐性知识、冲突与变化。
- 让每条需求**可验证**（[[#def-verifiable]]）：质量要有度量、目标与条件；行为用 EARS 句型。
- **用例**在扩展中发现需求；**用户故事**需要验收标准，理想形式是可执行的给定–当–则测试。
- 规则型需求应写进**决策表**，可机械地检查漏项与冲突（[[#def-decision-table]]、[[#prop-rule-cover]]）。
- **可追踪性**把需求与来源、测试双向链接（[[#def-traceability]]）。「较晚修复代价 100 倍」是有争议的说法，不是定律。
:::

## 习题

::: exercise 分类 {level=1}
把下列各条归类为功能需求、非功能需求或约束：(a) 系统应能以 PDF 导出报表。(b) 系统应能运行在医院现有的 Linux 服务器上。(c) 99% 的页面加载应在 1 秒内完成。(d) 支付失败时，系统应给顾客发送电子邮件。(e) 系统应符合欧盟《通用数据保护条例》。(f) 经过培训的业务员应能在 3 分钟内登记一名新患者。
::: solution
(a) 功能：一种行为。(b) 约束：它限制解的平台。(c) 非功能（性能）。(d) 功能（事件驱动，EARS 句型）。(e) 约束（法规），并将由它派生出许多功能与非功能需求——例如访问与删除的权利。(f) 非功能（易用性），而且按原样可验证：它点明了用户群体、任务、度量与目标。
:::
:::

::: exercise 多少个情形？{level=1 check="48"}
一条保险报价规则依赖四个是否型条件和一个顾客年龄段，后者取三个值之一。一张完备的决策表必须覆盖多少个不同情形？（填入数字。）
::: solution
每个布尔条件使情形数翻倍，三值条件使其三倍：$2^4 \times 3 = 48$。
:::
:::

::: exercise 用 EARS 改写 {level=1}
把每条需求用一种 EARS 句型改写，使其可验证，并写明你不得不做的决定：(a)「加热器不应过热。」(b)「应用应能离线工作。」(c)「用户会在会话结束前得到警告。」
::: solution
(a) *非期望行为*：「若水温超过 85 °C，则控制器应在 1 秒内关闭加热元件。」决定：阈值、响应、以及响应时间。(b) *状态驱动*：「在没有可用网络连接期间，应用应允许用户查看和编辑先前下载的笔记，并应在连接恢复后 60 秒内上传这些编辑。」决定：*哪些*功能能离线工作——「离线工作」通常指部分功能，不是全部。(c) *事件驱动*：「当空闲会话剩余 2 分钟时，系统应显示一个提供延长会话选项的警告。」决定：结束前多久发出，以及用户能对此做什么（这是一条无障碍需求——[[hci/accessibility-ethics]]——因为有些用户需要更多时间）。
:::
:::

::: exercise 规则的覆盖 {level=2 check="8"}
一张决策表有 $k = 5$ 个布尔条件。一条模式恰好指定 2 个条件的规则匹配多少个情形？（填入数字。）
::: solution
由 [[#prop-rule-cover]]，$2^{5 - 2} = 8$ 个情形。于是，例如四条这样的规则至多匹配 32 个情形名额，恰为 $2^5$；它们只有在彼此毫无重叠时才构成完备的表。
:::
:::

::: exercise 一个不满足 INVEST 的故事 {level=2}
用 INVEST 标准批评这个用户故事并改写：「作为用户，我希望系统用现代化的数据库重新设计，性能更好，还有手机应用。」
::: solution
它不*独立*（捆绑了三件互不相关的工作），不*小*（每一件都是一个项目），照这样陈述也谈不上多*有价值*（哪位用户受益？受益多少？），不可*估计*（没有任何东西规定到足以估计的程度），不可*测试*（「现代化」「更好」没有判据），而「现代化的数据库」是一个设计决策，不是需要。把它拆成有真实角色与收益的故事，例如：「作为现场工程师，我想在手机上查看客户的服务历史，以便在现场诊断故障，」验收标准如「给定：一位有 50 次既往服务的客户；当：我在 4G 网络下用一部中档手机打开其历史记录；则：最近 10 次服务在 2 秒内出现。」性能变成了可度量的标准；数据库的选择留给开发者。
:::
:::

::: exercise 世界、机器与假设 {level=2}
一个铁路道口控制器在传感器检测到列车驶近时放下栏杆。需求 $R$ 是「列车通过时没有汽车在道口上」。写出使 $W \wedge S \vdash R$ 成立所需的规格说明 $S$ 与领域假设 $W$。哪些假设最可能失效？
::: solution
$S$：当接近传感器（至少设在道口前距离 $d$ 处）检测到列车时，控制器应立即启动警示灯，并在 8 秒后开始放下栏杆；栏杆应保持放下，直到驶离传感器检测到列车已经通过。$W$ 包括：(1) 每辆列车都被接近传感器检测到；(2) 没有列车行驶得比 $v_{\max}$ 快，于是当 $d \ge v_{\max} \cdot t$（其中 $t$ 涵盖警示与放杆时间）时，栏杆在它到达之前已经放下；(3) 栏杆一旦放下，就物理上阻止汽车进入；(4) 灯闪后司机不驶入道口，已在道口上的汽车能在 8 秒内驶离；(5) 驶离传感器能检测到列车的尾部。关于人类行为的假设——(4)——以及关于物理设备的假设——(1)、(3)——最脆弱：司机会绕着半降的栏杆走 S 形穿行，传感器也会失灵。真实的设计会在道口上增加障碍检测（把一个假设变成一个受监测的条件）并采用故障安全：任何传感器故障都放下栏杆。
:::
:::

::: exercise 一个带多值条件的表 {level=3}
把 [[#ex-decision-table]] 的检查器推广到取值可以是任意有限集合的条件（由条件名到取值列表的字典给出），并用它检查这些停车收费规则：车辆类型 ∈ {car, motorbike, van}，时间 ∈ {day, night}，居民 ∈ {yes, no}。规则：居民停车免费；摩托车夜间免费；轿车白天收 £2；货车收 £5；非居民夜间收 £1。
::: solution
```python
from itertools import product

def check(conditions, rules):
    """conditions: 条件名 -> 取值列表；rules: (模式, 动作) 的列表。"""
    names = list(conditions)
    for values in product(*(conditions[n] for n in names)):
        case = dict(zip(names, values))
        actions = {a for p, a in rules if all(case[c] == v for c, v in p.items())}
        if not actions:
            print("gap:     ", case)
        elif len(actions) > 1:
            print("conflict:", case, sorted(actions))

conditions = {"vehicle": ["car", "motorbike", "van"],
              "time": ["day", "night"], "resident": ["yes", "no"]}
rules = [({"resident": "yes"}, "free"),
         ({"vehicle": "motorbike", "time": "night"}, "free"),
         ({"vehicle": "car", "time": "day"}, "2"),
         ({"vehicle": "van"}, "5"),
         ({"resident": "no", "time": "night"}, "1")]
check(conditions, rules)
```

```console
$ python3 parking.py
conflict: {'vehicle': 'car', 'time': 'day', 'resident': 'yes'} ['2', 'free']
gap:      {'vehicle': 'motorbike', 'time': 'day', 'resident': 'no'}
conflict: {'vehicle': 'motorbike', 'time': 'night', 'resident': 'no'} ['1', 'free']
conflict: {'vehicle': 'van', 'time': 'day', 'resident': 'yes'} ['5', 'free']
conflict: {'vehicle': 'van', 'time': 'night', 'resident': 'yes'} ['5', 'free']
conflict: {'vehicle': 'van', 'time': 'night', 'resident': 'no'} ['1', '5']
```

共有 $3 \times 2 \times 2 = 12$ 个情形。五个冲突和一个缺口：居民的轿车和货车真的免费吗，还是「居民停车免费」指的是居民的*轿车*？非居民的摩托车夜间哪条规则优先？非居民的摩托车白天付多少？这样的散文规则常被人们按顺序理解，第一条匹配的规则胜出；如果意图如此，它必须写成一条需求，并把检查器改成只报告缺口和永远不会命中的规则。
:::
:::

::: exercise 证明检查器的正确性 {level=3}
证明 [[#ex-decision-table]] 的函数 `check` 对某个情形打印一行，当且仅当该情形暴露出表不完备或不一致；并且它恰好什么都不打印当且仅当表完备且一致（[[#def-decision-table]]）。它对 $k$ 个条件、$r$ 条规则的运行时间是多少？当 $r$ 小而 $k$ 大时，为什么用 [[#prop-rule-cover]] 检查不一致更快？
::: solution
`product([False, True], repeat=k)` 恰好各一次地生成 $2^k$ 个指派中的每一个，而 `case` 就是这个指派的字典形式，所以循环恰好各访问每个情形一次。对一个情形，`matches(p, case)` 为真恰好当该情形与模式 `p` 的每个取值相符，这正是匹配的定义；于是 `actions` 是各匹配规则的动作集合。某情形是不完备性的见证，当且仅当没有规则匹配它，当且仅当 `actions` 为空，此时打印 "gap"；它是冲突的见证，当且仅当两条匹配规则动作不同，当且仅当该集合至少有两个元素，此时打印 "conflict"。否则不会为它打印任何东西。于是什么都不打印，当且仅当没有任何情形是见证，当且仅当表完备且一致。

每个情形与全部规则匹配需花费 $O(r k)$，所以时间是 $O(2^k r k)$。由 [[#prop-rule-cover]]，两条规则共享某个情形，当且仅当它们的模式在共同条件上一致，检验它需要 $O(k)$；检查所有动作不同的规则对，可在与 $2^k$ 无关的 $O(r^2 k)$ 时间内找出每一处不一致。完备性一般没有这样的捷径：判定各模式是否覆盖每个情形，是一个可满足性问题的补（「是否存在违反每条规则模式的情形？」），因此找出未被覆盖的情形是 $\mathsf{NP}$ 完全的，而判定完备性是 $\mathsf{coNP}$ 完全的（[[complexity]]）——但 SAT 求解器对典型实例处理得很好。
:::
:::
