一款电子邮件程序提供三种归档邮件的方式：从*邮件*菜单中选择*归档*，点击工具栏上的归档按钮，或按一个键盘快捷键。在功能清单里每一种都算"一个动作"，然而对一个每天归档一百封邮件的人来说，它们之间的差别是每天好几分钟，年复一年。哪个最快、快多少、对谁而言？我们不必运行任何测试就能回答：把 [[hci/human-factors]] 的时间逐个算子加起来，**击键级模型**（keystroke-level model）预测对专家来说菜单耗时约为快捷键的三倍——同时也告诉我们，为什么快捷键对还没学会它的人毫无用处。

这一章讲**交互技术**（interaction techniques），即组装界面的积木：对可见对象的直接操纵、菜单、表单与文本输入，以及触摸、手势与语音。对每一种我们都问：用户必须做什么，用时多长、易错程度如何，以及它如何支持从新手到专家的进阶。两个观念组织全章。诺曼的**执行与评估两个鸿沟**描述任何交互技术都必须弥合的东西，**击键级模型**与 **GOMS** 则把 [[hci/human-factors]] 的人的性能定律变成比较设计的定量预测。

## 直接操纵与两个鸿沟

1980 年代以前，大多数人通过命令语言使用计算机：你记住一条命令及其语法，键入它，阅读文本响应。施奈德曼（Ben Shneiderman）在描述人们觉得容易甚至愉快的新屏幕编辑器、电子表格与电子游戏时，为它们的共同风格命名。

::: definition 直接操纵 {#def-direct-manipulation}
一个界面使用**直接操纵**（施奈德曼，*IEEE Computer*，1983），当它具备

1. 对感兴趣的客体与动作的**连续表征**；
2. 用**物理动作**——指点、拖动、按压带标签的按钮——取代带复杂语法的键入命令；
3. **快速、渐进、可逆**的操作，其对感兴趣客体的作用**立即可见**。
:::

把文件拖进文件夹、捏住照片一角改变其大小、在电子表格里移动一个单元格区域、拖动视频进度条，都是直接操纵。它的优点可由 [[hci/human-factors]] 推出：以再认代替回忆，动作在空间上映射到其效果，反馈在一个知觉周期之内，因而错误能立刻被发现并撤销。它的缺点同样真实：对重复性或批量的操作很慢（"把这三三百个文件重命名"），难以表达抽象（"上周修改过的每个文件"），而对许多有运动或视觉障碍的人来说，指点与拖动要么困难要么不可能（[[hci/accessibility-ethics]]）。好的界面会把它与命令、快捷键和脚本结合使用。

埃德温·霍钦（Edwin Hutchins）、詹姆斯·霍兰（James Hollan）与唐·诺曼（"Direct manipulation interfaces"，1985）通过分析用户必须在自己的意图与系统之间跨越的距离，解释了直接操纵*为什么*感觉直接。

::: definition 执行与评估的鸿沟 {#def-gulfs}
**执行鸿沟**（gulf of execution）是用户想做的事与系统提供的做事动作之间的差距：形成意图、把它翻译成系统的动作序列并把这些动作执行出来所需的力气。**评估鸿沟**（gulf of evaluation）是系统的状态与用户对它的理解之间的差距：知觉系统的输出、解释它并与目标比较所需的力气。诺曼的**行动的七个阶段**把一个循环分为目标、执行的三个阶段（计划、指定、执行）与评估的三个阶段（知觉、解释、比较）。
:::

交互技术用指示物、自然映射与约束弥合执行鸿沟，用反馈与可见的系统状态弥合评估鸿沟（[[hci/user-centred-design#def-norman]]）。直接操纵使两个鸿沟都变窄：动作*就是*意图（"把这个放到这儿"），而它的结果就在用户已经注视着的地方显现。

::: example 诊断一款恒温器应用 {#ex-gulfs}
一款供暖应用让用户设置每周日程。要降低周五晚上的温度，用户必须打开*设置*，选择*程序*，选中*程序 3*，找到周五那一行，编辑一个起始时间和一个"回退"值。保存之后，应用只显示当前温度。用户常常以为自己已经改了日程，其实并没有。分析其中的鸿沟并提出改动。
::: solution
*执行*：用户的目标（"周五晚上凉快些"）必须穿过一条标签丝毫不提示去向的深层路径，翻译成目标里根本不存在的系统概念（程序、回退值）。*评估*：保存之后没有任何东西显示日程，用户无法知觉改动是否生效；而"程序 3"即便看得见也含义不明。弥合执行：把日程显示成一条可直接编辑的一周温度时间线（把周五晚上的线段往下拖——施奈德曼意义上的直接操纵，[[#def-direct-manipulation]]），并使用用户词汇里的词语。弥合评估：编辑之后显示更新后的时间线，高亮改动的线段，并给出诸如"周五 18:00–23:00：17 °C"的确认。然后测试新设计：用户现在能否*预测*供暖会做什么，才是真正的度量。
:::
:::

## 预测性能：击键级模型

卡德、莫兰与纽厄尔的**击键级模型**（keystroke-level model，*Communications of the ACM*，1980）通过把一个方法分解为原始算子并相加其时间，预测专家用给定方法做完一项例行任务要多久。

::: definition 击键级模型 {#def-klm}
在**击键级模型**（KLM）中，一个方法的执行时间是其算子序列 $o_1 o_2 \dots$ 的 $T = \sum_i t(o_i)$，算子与时间如下（卡德、莫兰与纽厄尔，1980）：

| 算子 | 含义 | 时间 |
|---|---|---|
| $K$ | 按一个键或按钮 | 0.08 秒（最佳打字员，135 词/分）；0.12 秒（良好，90 词/分）；**0.20 秒（平均水平熟练者，55 词/分）**；0.28 秒（平均水平非文秘，40 词/分）；0.50 秒（打随机字母）；0.75 秒（打复杂代码）；1.20 秒（最差打字员，对键盘不熟） |
| $P$ | 用鼠标指点显示上的目标 | 1.10 秒 |
| $H$ | 把手放到键盘或其他设备的基准位置 | 0.40 秒 |
| $D(n_D, l_D)$ | 画 $n_D$ 段总长 $l_D$ 厘米的直线段 | $0.9\,n_D + 0.16\,l_D$ 秒 |
| $M$ | 为下一个物理动作作心理准备 | 1.35 秒 |
| $R(t)$ | 等待系统响应 $t$（只计用户无法行动的那部分） | $t$ |
:::

这些数值是作者实验与早期文献的平均值，而 $P = 1.10$ 秒本身就是费茨定律在典型距离与尺寸上的平均；若目标的距离与宽度已知，用 [[hci/human-factors#def-fitts]] 的费茨预测更好。后来的实践者指南——尤其是戴维·基耶拉斯（David Kieras）的——把鼠标按下或松开（$B = 0.1$ 秒，于是一次点击是 $BB = 0.2$ 秒）与击键区分开来。

模型中最难的是放置 $M$ 算子。卡德、莫兰与纽厄尔给了启发式规则：在每个不属于键入字符串的击键之前、以及每个选择命令的指点操作之前插入一个 $M$（规则 0），然后在动作已被前一个动作完全预料到的地方删掉它——例如指点到按钮之后的那一次点击（规则 1）、作为一个整体键入的命令名中第一个字符之后的各字符（规则 2）、以及结束一个用户已知其终点的字符串的击键（规则 3 与 4）。应用这些规则需要判断，不同的分析者对 $M$ 的放置各不相同；我们会看到这很要紧。

::: example 归档邮件的三种方式 {#ex-klm-archive}
预测归档当前邮件的专家执行时间，起止时双手都放在键盘上：(a) 用鼠标经*邮件*菜单；(b) 用工具栏按钮；(c) 用 Ctrl+E 一类的两键快捷键；(d) 同样用该快捷键，但手起始于鼠标上。
::: solution
把每个方法编码成算子。(a) 把手移到鼠标（$H$），决定（$M$），指点*邮件*（$P$），点击（$K$），在打开的菜单中找到条目（$M$），指点它（$P$），点击（$K$），回到键盘（$H$）。(b) $H\,M\,P\,K\,H$。(c) $M\,K\,K$（按规则 2，整个组合键只需一个 $M$）。(d) $H\,M\,K\,K\,H$，若手之后必须回到鼠标。

```python
# Keystroke-Level Model operator times in seconds (Card, Moran & Newell, 1980).
OPS = {"K": 0.20,   # keystroke or button press, average skilled typist (55 wpm)
       "P": 1.10,   # point with a mouse to a target on the screen
       "H": 0.40,   # home the hand between keyboard and mouse
       "M": 1.35}   # mental preparation

def klm(sequence):
    """Predicted execution time of a string of operators such as 'HMPK'."""
    return sum(OPS[op] for op in sequence.replace(" ", ""))

methods = {
    "menu: Message > Archive":  "H M P K M P K H",   # hand to mouse, open menu, choose item, back
    "toolbar button":           "H M P K H",
    "keyboard shortcut":        "M K K",             # e.g. Ctrl+E as two keystrokes
    "shortcut, hands on mouse": "H M K K H",
}
for name, seq in methods.items():
    print(f"{name:26} {seq:18} {klm(seq):.2f} s")
```

```console
$ python3 klm.py
menu: Message > Archive    H M P K M P K H    6.10 s
toolbar button             H M P K H          3.45 s
keyboard shortcut          M K K              1.75 s
shortcut, hands on mouse   H M K K H          2.55 s
```

对专家而言，预测快捷键比菜单快约 3.5 倍。注意结果多么依赖 $M$：若专家在打开的菜单中对*归档*的选择是完全可预料的（规则 1），第二个 $M$ 消失，菜单变为 $6.10 - 1.35 = 4.75$ 秒。各方法的*排序*在任何合理的 $M$ 放置下都成立，而这正是击键级模型所能支持的结论。每天归档 100 封，菜单与快捷键的差别是 $100 \times (4.75 \text{ 到 } 6.10 - 1.75) \approx 5$–7 分钟每天。
:::
:::

::: proposition 快捷键的盈亏平衡点 {#prop-breakeven}
设学会一个快捷键花费一次性时间 $L$，此后每次使用与菜单相比节省 $\Delta$ 秒，用户每天执行该动作 $u$ 次。学习在 $L/(u\Delta)$ 天后回本。若用户每天以概率 $\phi$ 独立地忘记该快捷键而必须重学，则每天的期望节省为 $u\Delta - \phi L$，当且仅当 $\phi < u\Delta / L$ 时为正。
:::

::: proof
$d$ 天后节省的时间为 $d\,u\Delta$，成本为 $L$；二者在 $d = L/(u\Delta)$ 处持平。考虑遗忘时，用户每天有概率 $\phi$ 付出重学成本 $L$，即期望成本 $\phi L$，对照期望节省 $u\Delta$（忽略快捷键被遗忘期间损失的次数，那只会使条件更强）。期望净节省 $u\Delta - \phi L$ 为正当且仅当 $\phi < u\Delta/L$。
:::

这个命题解释了一个常见事实：很少用到的快捷键不值得学，这就是为什么把快捷键*显示*在菜单条目旁边的菜单如此重要——它让每一次使用菜单都变成一次免费的排练。尽管如此，许多资深用户仍对常用动作坚持用菜单；莱恩（Lane）、纳皮尔（Napier）、佩雷斯（Peres）与山多尔（Sándor）（2005）在微软 Word 用户身上观察到这一点，提醒我们预测出的节省本身不会改变习惯。

### GOMS

击键级模型评估的是一个*方法*。**GOMS**（卡德、莫兰与纽厄尔，1983）为熟练用户如何在诸方法之间选择以达成目标建模。

::: definition GOMS {#def-goms}
一个任务的 **GOMS** 模型由**目标**（Goals，用户要达成什么，按层次组织）、**算子**（Operators，元素级的知觉、运动或认知动作）、**方法**（Methods，达成一个目标的子目标与算子序列）与**选择规则**（Selection rules，在一个目标的备选方法之间作出选择的条件，例如"若目标在屏幕上可见就指点它；否则使用搜索"）组成。
:::

存在若干变体。原始的 **CMN-GOMS** 是一份非正式的层次大纲；击键级模型是其最简单的情形。**NGOMSL**（基耶拉斯）用一种结构化的自然语言书写方法，其语句数目预测学习时间。**CPM-GOMS**（邦妮·约翰（Bonnie John））在关键路径图上并行地排布知觉、认知与运动算子。在"**欧内汀计划**"（Project Ernestine，韦恩·格雷（Wayne Gray）、邦妮·约翰与迈克尔·阿特伍德（Michael Atwood），*Human–Computer Interaction*，1993）中，CPM-GOMS 模型预测：一个因预期更快而引入的新型电话接线员工作台，实际上会让每通电话略微*变慢*——因为它的改进位于关键路径之外，却往关键路径上加了击键。对真实接线员进行的现场试验证实了变慢。以一个全国性电话公司的规模计，每通电话零点几秒意味着巨大的成本；这一案例仍是有用认知模型能够收回成本的最著名示范。

::: warning "击键级模型预测用户做任务要花多久"
击键级模型预测的是*已经掌握该方法的熟练用户*的**无错执行时间**。它对学习时间、发现该方法存在的时间、从错误中恢复的时间（在真实使用中可占时间的很大份额）、以及决定一开始该做什么的时间都一无所言；它假定用户没有被打断、不疲劳、不分心。用它比较专家的方法、寻找多余的算子；其余一切都要用真实用户来测试。
:::

## 菜单

菜单是用户通过再认从中挑选的命令或选项列表。它的设计问题是其*结构*（每层多少条目、多少层）、*排序*（字母序、按频率、按类别）与*形态*（线性、饼形、标记式）。

### 宽度对深度

$N$ 个条目的等级结构可以宽而浅，也可以窄而深。实验一贯偏爱宽度：基格（Kiger，1984）比较了 64 个条目的五种结构，从 $2^6$（六层，每层两个）到 $64^1$，发现两层各八个（$8^2$）最快也最受欢迎，最深的结构最差；兰道尔（Landauer）与纳赫巴尔（Nachbar，1985）发现每层耗时随条目数的对数增长，正如希克–海曼定律与费茨定律所预测，于是宽菜单整体上更快。一个简短的计算说明为什么。

::: proposition 菜单的最优宽度 {#prop-breadth}
$N$ 个条目、每层 $n$ 个条目的等级结构，深度 $d = \log N / \log n$（当作连续量处理）。若在一层上作选择耗时 $a + b \log_2 n$（每层固定成本 $a$，加上对数级的选择与指点成本），总时间

$$
T(n) = \frac{\log_2 N}{\log_2 n}\,(a + b \log_2 n) = \log_2 N \left(\frac{a}{\log_2 n} + b\right)
$$

关于 $n$ 严格递减：最宽的菜单最快。反之，若每层逐项扫视，$a + c\,n$，则 $T(n) = \ln N \cdot (a + cn)/\ln n$，其在 $n(\ln n - 1) = a/c$ 处取最小值。
:::

::: proof
深度 $d$ 满足 $n^d = N$，故在任何底数下 $d = \log N/\log n$。对数情形下，$T(n) = d\,(a + b\log_2 n) = \log_2 N\,\bigl(a/\log_2 n + b\bigr)$；由于 $a > 0$ 且 $\log_2 n$ 递增，$a/\log_2 n$ 递减，所以 $T$ 对 $n > 1$ 严格递减。线性情形下，$T(n) = \ln N \cdot g(n)$，其中 $g(n) = (a + cn)/\ln n$，而

$$
g'(n) = \frac{c \ln n - (a + cn)/n}{(\ln n)^2},
$$

其恰在 $c\,n\ln n = a + cn$、即 $n(\ln n - 1) = a/c$ 时为零。左端对 $n > 1$ 递增，故根唯一；根以下 $g' < 0$、根以上 $g' > 0$，故根为最小值。
:::

::: example 大目录的宽度 {#ex-breadth}
一部目录有 $N = 4096$ 个条目。在 [[#prop-breadth]] 的两个模型下，取每层 $a = 1$ 秒、$b = 0.15$ 秒/比特、$c = 0.1$ 秒/条目，比较宽度为 2、4、8、16、64 与 4096 的预测时间，并求线性模型的最优宽度。
::: solution
```python
from math import log, log2

N = 4096                       # items in the hierarchy
def t_log(n, a=1.0, b=0.15):   # per-level time if choice is logarithmic (Hick-Hyman + Fitts)
    return (log(N) / log(n)) * (a + b * log2(n))
def t_lin(n, a=1.0, c=0.1):    # per-level time if users scan items one by one
    return (log(N) / log(n)) * (a + c * n)
for n in [2, 4, 8, 16, 64, 4096]:
    print(f"breadth {n:5}: depth {log(N)/log(n):5.2f}  log-model {t_log(n):6.2f} s  linear-model {t_lin(n):7.2f} s")
# optimum of the linear model: n (ln n - 1) = a/c, solved by bisection
lo, hi = 2.0, 1000.0
for _ in range(100):
    mid = (lo + hi) / 2
    if mid * (log(mid) - 1) < 10: lo = mid
    else: hi = mid
print(f"linear-model optimum: n = {lo:.3f}")
```

```console
$ python3 menu.py
breadth     2: depth 12.00  log-model  13.80 s  linear-model   14.40 s
breadth     4: depth  6.00  log-model   7.80 s  linear-model    8.40 s
breadth     8: depth  4.00  log-model   5.80 s  linear-model    7.20 s
breadth    16: depth  3.00  log-model   4.80 s  linear-model    7.80 s
breadth    64: depth  2.00  log-model   3.80 s  linear-model   14.80 s
breadth  4096: depth  1.00  log-model   2.80 s  linear-model  410.60 s
linear-model optimum: n = 8.644
```

对熟练用户（对数级选择），一张 4096 项的单列表会最快——但没人对 4096 项熟练，也没人能在一屏里指点其中一项。用扫视时，每层约 8 或 9 项最优，而且曲线在 4 到 16 之间很平。真实菜单位于两个模型之间：用户扫视不熟悉的菜单，回忆熟悉的菜单。良好的结构（有意义的分组、分隔线、长名字列表按字母序）能让宽菜单也可以扫视，这就是实验偏爱宽度的原因。
:::
:::

::: widget plot
f: (log(4096)/log(x))*(a + c*x); (log(4096)/log(x))*(a + b*log2(x))
x: 2, 64
y: 0, 20
sliders: a=1:0.2:3:0.1; b=0.15:0.05:0.5:0.05; c=0.1:0.02:0.5:0.02
labels: \text{逐层扫描：每层 } a + c\,n; \text{对数选择：每层 } a + b\log_2 n
caption: 4096 条目等级结构的总选择时间（秒）随每层条目数 $n$ 的变化，按 [[#prop-breadth]] 的两个模型。对数模型永远偏爱宽度；扫描模型在 $n(\ln n - 1) = a/c$ 处有最小值。把每层固定成本 $a$ 调大（比如页面加载变慢）：最优点移向更宽的菜单。把扫视成本 $c$ 调大：移向更窄的菜单。
:::

### 饼形菜单与标记菜单

**饼形菜单**（pie menu）把条目排成环绕指针的楔形，于是每个条目都在同样短的距离上，选择取决于*方向*——一个大的角度目标。卡拉汉（Callahan）、霍普金斯（Hopkins）、韦泽（Weiser）与施奈德曼（Shneiderman）（CHI 1988）发现八个条目时饼形菜单比线性菜单更快、错误更少。**标记菜单**（marking menus；戈登·库尔滕巴赫（Gordon Kurtenbach）与威廉·巴克斯顿（William Buxton），1993–94）提供了一条从新手到专家的平滑通道：新手按下、等待、看到饼图、作出选择；已经记住方向的老手不作等待直接做出同样的笔画，菜单从不出现。由于新手的动作*排练*了老手的动作，学习是免费的——这与显示快捷键的菜单同理。库尔滕巴赫与巴克斯顿在 *"The limits of expert performance using hierarchic marking menus"*（CHI 1993）中发现，随着菜单变宽变深，准确率下降，八个条目的菜单在约两层深度内仍然可用。

::: quiz
一款绘图应用沿屏幕顶部有一个 12 条目的工具栏。设计者考虑把它换成右击时在指针处弹出的饼形菜单。按费茨定律与击键级模型，饼形菜单优势的主要来源和它的主要代价是什么？
- [x] 优势：条目离指针近，且有大的角度目标。代价：菜单在打开前不可见，条目必须靠回忆或靠一个额外动作揭示。
- [ ] 优势：每层条目更少。代价：层数更多。
- [ ] 优势：工具栏占用屏幕空间。代价：没有。
- [ ] 优势：饼形菜单利用希克–海曼定律。代价：它们违反费茨定律。
::: solution
饼形菜单在指针已经所在之处打开，所以 $D$ 很小，而且每个楔形在运动方向上都是宽目标：难度指数低（[[hci/human-factors#def-fitts]]）。位于屏幕边缘的工具栏虽然远，却有边缘优势。代价是饼形菜单是隐藏的：要多一次点击打开，而看不见的条目无法一眼再认，这是新手的可发现性代价。标记菜单通过让老手跳过显示来削减这一代价。
:::
:::

## 表单与文本输入

**表单**收集结构化输入，其大部分可用性问题都是执行鸿沟的问题：用户不知道要填什么（"出生日期"——什么格式？），或因为以出人意料的格式输入了合法信息而遭拒（卡号里的空格、小写的邮编）。良好的实践遵循 [[hci/user-centred-design#def-norman]] 的原则：每个字段配一个可见标签（输入时消失的占位符不是标签）；接受一切合理的格式并加以规范化，而不是苛求一种；日期选择器与菜单这类约束只在比键入更快时才用；尽早、具体地在字段旁边校验并说明如何改正；出错后绝不清空用户已输入的内容；只要真正需要的信息。这些多数同时也是 [[hci/accessibility-ethics]] 中的无障碍要求。

**文本输入**用标准指标测量，因为否则关于"快速键盘"的主张根本无法比较。

::: definition 文本输入速度与错误率 {#def-text-entry}
若参与者在 **呈现** 短语 $P$ 的引导下转录出 **转录** 文本 $T$，耗时 $S$ 秒（从第一次击键到最后一次击键），则**输入速率**为

$$
\text{wpm} = \frac{\lvert T\rvert - 1}{S} \times 60 \times \frac15,
$$ {#eq-wpm}

其中一个"词"定义为五个字符（含空格），使用 $\lvert T\rvert - 1$ 是因为计时从第一个字符开始。**最小字符串距离（MSD）错误率**为 $\mathrm{MSD}(P, T) / \max(\lvert P\rvert, \lvert T\rvert)$，其中 MSD 是莱文斯坦编辑距离：把 $P$ 变成 $T$ 所需的字符插入、删除与替换的最少次数。**每字符击键数**（keystrokes per character，KSPC）是击键数（含改正）除以产出字符数。
:::

这些定义遵循 I. 斯科特·麦肯齐与 R. 威廉·苏科列夫（MSD 错误率，2001；KSPC，麦肯齐 2002）。MSD 错误率只测量留在文本里的错误；犯了又改正的错误体现在 KSPC 和苏科列夫与麦肯齐（2003）的"总错误率"里。

::: example 测量一次转录 {#ex-wpm}
一名参与者被要求键入 `the quick brown fox jumps over the lazy dog`，在 9.6 秒内产出了 `the quikc brown fox jumps ovr the lazy dog`。计算输入速率与 MSD 错误率。
::: solution
编辑距离用动态规划计算（[[algorithms]]）：

```python
def msd(a, b):
    """Minimum string distance (Levenshtein): insertions, deletions, substitutions."""
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        cur = [i]
        for j, cb in enumerate(b, 1):
            cur.append(min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (ca != cb)))
        prev = cur
    return prev[-1]

def wpm(transcribed, seconds):
    """Words per minute, a 'word' being 5 characters; timing starts at the first key."""
    return (len(transcribed) - 1) / seconds * 60 / 5

presented   = "the quick brown fox jumps over the lazy dog"
transcribed = "the quikc brown fox jumps ovr the lazy dog"
seconds = 9.6
d = msd(presented, transcribed)
print(f"length P = {len(presented)}, T = {len(transcribed)}, MSD = {d}")
print(f"speed = {wpm(transcribed, seconds):.1f} wpm")
print(f"MSD error rate = {100 * d / max(len(presented), len(transcribed)):.2f}%")
```

```console
$ python3 textentry.py
length P = 43, T = 42, MSD = 3
speed = 51.3 wpm
MSD error rate = 6.98%
```

由 [[#eq-wpm]]，$(42 - 1)/9.6 \times 12 = 51.25$ 词/分。换位 "ck" → "kc" 在莱文斯坦距离中花费两次替换，少掉的 "e" 是一次删除，故 MSD $= 3$，错误率为 $3/43 \approx 7.0\%$。（考虑换位的距离会把这次交换计为一次；用哪一种是一项必须由研究报告的选择。）
:::
:::

## 触摸、手势与语音

### 触摸

手指是一个笨拙而不精确的指针，还遮住所碰的东西。指尖的接触面积约一厘米见方，而且用户感知到的触压点与传感器记录的并不一致（克里斯蒂安·霍尔茨（Christian Holz）与帕特里克·博伊迪施（Patrick Baudisch）在他们 2010 年的 CHI 论文 *"The generalized perceived input point model"* 中为这一偏移建模）。因此目标必须比鼠标的大得多。佩卡·帕里（Pekka Parhi）、艾米·卡尔森（Amy Karlson）与本杰明·贝德森（Benjamin Bederson）对单手拇指使用的研究（MobileHCI 2006）发现，错误率在单次点击约 9.2 毫米、连续点击约 9.6 毫米的目标上趋于平缓。截至 2026 年，各平台指南建议的最小触摸目标为 44 × 44 点（Apple；在典型 iPhone 屏上约 7 毫米）与 48 × 48 与密度无关像素（Android Material Design；名义上 $48/160$ 英寸 $\approx 7.6$ 毫米），而 WCAG 2.2 的成功标准 2.5.8 设定了 24 × 24 CSS 像素的更低的法律底线，或要求更小的目标周围留足间距（[[hci/accessibility-ethics]]）。

触摸屏也改变了技术。**悬停**——鼠标指针悬在目标上方的状态——不复存在，于是工具提示与悬停菜单失效。**手势**如滑动、捏合与长按，一经掌握便很快，却是隐形的：屏幕上没有任何东西标示列表项可以滑开删除，所以只有手势的功能必须同时经由一个可见控件提供。而且触摸没有物理反馈，因而约 100 毫秒之内（[[hci/human-factors#def-mhp]]）的视觉、听觉或触觉**反馈**必不可少。

### 在隧道中转向

费茨定律讲的是到目标的瞄准运动。许多交互反而要求*沿*一条受约束的路径移动：在级联菜单中行进而不滑进相邻条目、拖动滑块、在车道内描画。约翰尼·阿科（Johnny Accot）与翟舒敏（Shumin Zhai）（CHI 1997）从费茨定律推导出一条适用于这些任务的定律。

::: proposition 转向定律 {#prop-steering}
设穿过一条长 $A$、宽 $W$ 的直隧道，等价于连续穿过 $N$ 个宽为 $W$、间隔 $A/N$ 的目标，每个目标都服从费茨定律、难度指数为 $\log_2(A/(NW) + 1)$。当 $N \to \infty$ 时，总难度指数趋于

$$
ID_{\text{steer}} = \frac{1}{\ln 2}\cdot\frac{A}{W},
$$

于是转向时间在 $A/W$ 上是线性的：$T = a + b\,A/W$。对一条宽度 $W(s)$ 可变的曲线 $C$，同样的论证给出 $T = a + b\int_C \frac{ds}{W(s)}$。
:::

::: proof
$N$ 个目标的总难度指数为 $N \log_2\bigl(1 + \tfrac{A}{NW}\bigr)$。记 $x = A/W$ 并用 $\log_2 y = \ln y/\ln 2$。由于 $u \to 0$ 时 $\ln(1 + u) = u - u^2/2 + O(u^3)$，

$$
N \ln\Bigl(1 + \frac{x}{N}\Bigr) = x - \frac{x^2}{2N} + O\Bigl(\frac{1}{N^2}\Bigr) \to x \quad (N \to \infty),
$$

故 $N \log_2(1 + x/N) \to x/\ln 2$。时间对难度指数是线性的，于是 $T = a + b'\,x/\ln 2 = a + b\,A/W$，其中 $b = b'/\ln 2$。对弯曲隧道，把它切成许多长 $ds$ 的小段，其上 $W$ 近似不变；每段贡献 $ds/(W(s) \ln 2)$，求和即得积分。
:::

这个推导是一个启发式论证；阿科与翟舒敏的实验对直隧道与弯隧道都证实了线性定律，拟合极好。与费茨定律的对比很鲜明：隧道宽度减半使难度*加倍*，而目标宽度减半只增加一个比特。级联菜单——其子菜单只在指针停留在一条狭窄的水平隧道内时才保持打开——就是转向任务——这就是好的实现容忍朝已打开的子菜单作斜向移动、而不是关闭子菜单的原因。

### 语音与会话

语音界面把屏幕整个去掉了。它的执行鸿沟以一种新方式是宽的：用户看不见存在哪些命令、系统能理解什么，所以可发现性依赖于提示、示例和对意外情况的妥善处理。语音是串行而转瞬即逝的，这带回了 [[hci/human-factors]] 的工作记忆限制（选项的语音列表必须很短），而识别错误在所难免，所以确认对低风险操作要便宜、对高风险操作要明确（"向 Alex 转账 500 英镑——对吗？"）。说话也是公开的、可能被人听到，这关乎隐私。截至 2026 年，构建在大语言模型上的会话助手处理开放式请求远胜于早年的命令语法，但它们带来了新的评估问题——貌似合理却错误的答案，以及一次与下一次不同的响应——这些问题在 [LLM Atlas](/learn/llm/) 中讲述。

::: history
伊万·萨瑟兰（Ivan Sutherland）的 Sketchpad（MIT，1963）引入了带光笔的交互图形：指点与拖动显示的对象、约束与副本。道格拉斯·恩格尔巴特（Douglas Engelbart）的团队在 SRI 发明了鼠标（由威廉·英格利希（William English）制作；恩格尔巴特的专利于 1970 年授权），并在 1968 年 12 月的"所有演示之母"中与超文本、窗口和协同编辑一同演示了它。施乐 Alto（1973）与施乐 Star（1981）建成了窗口、图标、菜单与指针的桌面，苹果的 Lisa（1983）与 Macintosh（1984）把它带向了广阔市场。卡德、莫兰与纽厄尔的击键级模型于 1980 年发表，他们的 GOMS 框架于 1983 年发表——也正是施奈德曼为直接操纵命名的一年。饼形菜单由卡拉汉等人于 1988 年评估，标记菜单由库尔滕巴赫与巴克斯顿于 1993–94 年评估，转向定律由阿科与翟舒敏于 1997 年提出。多点触摸输入自 1980 年代起就在研究中被探索（李（Lee）、巴克斯顿（Buxton）与史密斯（Smith）1985 年描述了一台多点触摸屏），并随 2007 年的 iPhone 进入大众市场的手机。
:::

## 后续内容

本章的各种技术由 [[hci/visual-design]] 安排在屏幕上并使其清晰易读。来自击键级模型、费茨定律与转向定律的预测是有待检验的假说，由 [[hci/usability-evaluation]] 检验，并在差异要紧时由受控实验检验（[[hci/experiments]]）；而每一项技术都必须对看不见屏幕、拿不稳鼠标、听不见提示的人也能用（[[hci/accessibility-ethics]]）。作为状态机的导航结构在 [[hci/prototyping#def-nav-model]]。

::: summary
- **直接操纵**（[[#def-direct-manipulation]]）——可见对象、物理动作、快速可逆的反馈——使诺曼的**执行与评估鸿沟**（[[#def-gulfs]]）变窄，但对批量操作与抽象表达力薄弱。
- **击键级模型**（[[#def-klm]]）把算子时间相加（$K$ 对平均水平熟练打字者 0.2 秒、$P$ 1.1 秒、$H$ 0.4 秒、$M$ 1.35 秒），预测专家的无错执行时间；$M$ 的放置需要判断，所以更信排序而非绝对时间。
- **GOMS**（[[#def-goms]]）增添了目标、方法与选择规则；欧内汀计划证明了认知模型能收回成本。
- 快捷键只有用得足够频繁才划算（[[#prop-breakeven]]）；把它们显示在菜单里，让新手的使用排练专家的使用，正如**标记菜单**所做的那样。
- 对菜单而言，当选择是对数级时**宽度胜过深度**；逐条扫视时最优宽度由 $n(\ln n - 1) = a/c$ 决定（[[#prop-breadth]]）。
- 文本输入用 **wpm**、**MSD 错误率**与 **KSPC** 比较（[[#def-text-entry]]）。
- 触摸需要约 7–10 毫米的目标、手势的可见替代办法与快速反馈；在隧道中转向所花的时间对 $A/W$ 线性（[[#prop-steering]]）。
:::

## 习题

::: exercise 一笔击键级模型账 {level=1 check="4.8"}
用 [[#def-klm]] 的算子时间、取 $K = 0.20$ 秒，预测方法 $M\,P\,K\,M\,K\,K\,K\,K$（指点一个输入框，点击，然后作为一个整体键入一个四位代码）的时间。（输入以秒计的时间。）
::: solution
这个序列含 $M$ 两次、$P$ 一次与 $K$ 五次（一次点击加四个数字）：$2 \times 1.35 + 1.10 + 5 \times 0.20 = 2.70 + 1.10 + 1.00 = 4.80$ 秒。两个心理算子占了总数的一半还多，这在击键级模型分析中很典型。
:::
:::

::: exercise 输入速率 {level=1 check="30"}
一名参与者用 10 秒（从第一次到最后一次击键）转录了一个 26 字符的短语。以每分钟词计输入速率是多少？（输入数值。）
::: solution
由 [[#eq-wpm]]，$(26 - 1)/10 \times 60/5 = 2.5 \times 12 = 30$ 词/分。
:::
:::

::: exercise 隧道对目标 {level=1}
隧道宽度减半时，转向的难度指数变为几倍？目标宽度减半时（$D \gg W$），费茨目标的难度指数增加多少？这对级联菜单意味着什么？
::: solution
转向：$ID \propto A/W$，所以 $W$ 减半使指数**加倍**（[[#prop-steering]]）。费茨：$\log_2(D/W + 1) \approx \log_2(D/W)$ 在 $W$ 减半时增加 $\log_2 2 = 1$ 比特。狭窄路径比小目标昂贵得多，所以条目窄、通往子菜单的水平路径长的级联菜单又慢又易错；应容忍斜向移动、快速打开子菜单、并保持路径短。
:::
:::

::: exercise 盈亏平衡 {level=2 check="40"}
学会一个快捷键约需 2 分钟练习。它每次使用节省 3 秒，而用户每天使用一次。忽略遗忘，学习多少天后回本？（输入天数。）
::: solution
由 [[#prop-breakeven]]，$L/(u\Delta) = 120/(1 \times 3) = 40$ 天。若用户忘记快捷键的频率高于 $u\Delta/L = 3/120 = 1/40$ 每天——即不到 40 天忘一次——学习就永远不划算。
:::
:::

::: exercise 重新记一笔并比较 {level=2}
用击键级模型为"把选中单词的字号改成 14 pt"这项任务建两种模型：(a) 用鼠标打开字号下拉框，从列表中选中 14；(b) 点击字号框，键入 `14` 并按回车。双手起始于键盘。哪个更快？你的答案对 $M$ 的放置有多敏感？
::: solution
(a) $H\,M\,P\,K\,M\,P\,K\,H$——移到鼠标、决定、指点下拉框、点击、在列表中找到 "14"、指点、点击、返回：$2 \times 0.40 + 2 \times 1.35 + 2 \times 1.10 + 2 \times 0.20 = 0.80 + 2.70 + 2.20 + 0.40 = 6.10$ 秒。(b) $H\,M\,P\,K\,H\,M\,K\,K\,K$——移到鼠标、决定、指点输入框、点击、回到键盘，然后把 `14` 作为一个整体键入（按规则 2 只需一次 $M$）并按回车（无 $M$：终止符，规则 4）：$2 \times 0.40 + 2 \times 1.35 + 1.10 + 4 \times 0.20 = 0.80 + 2.70 + 1.10 + 0.80 = 5.40$ 秒。键入快 0.7 秒。若 (a) 中第二个 $M$ 被删去（用户知道 14 在哪里），(a) 变为 4.75 秒反而获胜；所以这里的排序对 $M$ 的放置*并不*稳健，需要用真实用户测试——或者用一个完全避开鼠标的快捷键（一个聚焦输入框的组合键加 `14` 回车，即 $M\,K\,K\,K\,K\,K$：约 2.35 秒）——来解决争端。
:::
:::

::: exercise 含改正的错误率 {level=2}
比较两块键盘。在键盘 A 上，参与者达到 40 词/分，MSD 错误率 1%，KSPC 1.05；在键盘 B 上，45 词/分，MSD 错误率 1%，KSPC 1.30。解读这些数字。哪块键盘更好？
::: solution
两者在最终文本中留下同样比例的错误（1%），但在 B 上参与者比产出字符多按了 30% 的键，而 A 上只多 5%：他们犯了多得多的错误并加以改正（[[#def-text-entry]]）。即便如此 B 仍然更快。哪个"更好"取决于用途：B 的改正负担在长时间使用时可能令人疲惫和沮丧，而在改正代价高的场合（没有退格、盲打输入），它的高原始错误率会造成损害。应当报告三项指标、跨若干次会话的学习曲线（新键盘会随练习变好）与主观负荷，并用被试内设计对每位参与者作比较（[[hci/experiments]]）。
:::
:::

::: exercise 线性扫视的最优点 {level=3}
证明 [[#prop-breadth]] 的扫描模型中的最优宽度 $n^*$ 对大 $a/c$ 的主项满足 $n^* \approx (a/c)/\ln(a/c)$，并对 $a/c = 10$ 与 $a/c = 100$ 用精确根检验这个近似。解释：当每层的固定成本（例如一次缓慢的页面加载）变大时，最优菜单会发生什么？
::: solution
记 $k = a/c$，$n(\ln n - 1) = k$。$k$ 大时 $n$ 也大，$\ln n - 1 \approx \ln n$；于是 $n \ln n \approx k$，其解满足主项意义下 $\ln n \approx \ln k - \ln\ln n \approx \ln k$，故 $n \approx k/\ln k$。数值上：

```python
from math import log
def root(k):
    lo, hi = 2.0, 1e9
    for _ in range(200):
        mid = (lo + hi) / 2
        lo, hi = (mid, hi) if mid * (log(mid) - 1) < k else (lo, mid)
    return lo
for k in (10, 100, 10000):
    print(k, round(root(k), 2), round(k / log(k), 2), round(k / (log(k) - 1), 2))
```

```console
$ python3 optimum.py
10 8.64 4.34 7.68
100 37.94 21.71 27.74
10000 1572.26 1085.74 1217.98
```

主项近似 $k/\ln k$ 的增长率是对的（根与近似之比趋于 1），但收敛极慢，因为被略去的 $-1$ 与 $\ln \ln n$ 只是相对于 $\ln n$ 小；$k/(\ln k - 1)$ 对适中的 $k$ 更好，但随 $k$ 增大也会落后。这类渐近公式显示依赖关系的形状；要具体数字，就如此处数值求解方程。解释：$n^*$ 随 $k = a/c$ 近乎线性增长，所以每层昂贵时（一次页面加载、一段语音提示——尽管语音提示也会使 $c$ 变大）菜单应当宽而浅，每条目扫视昂贵时应当窄。
:::
:::

::: exercise 一个文本输入分析工具 {level=3}
把 [[#ex-wpm]] 的程序扩展为：读入一名参与者的（呈现、转录、秒数、击键数）记录列表，报告平均 wpm、平均 MSD 错误率与平均 KSPC。用 [[#ex-wpm]] 中 47 次击键的记录和你构造的一份完美记录测试它。为什么应当先按短语取平均、再跨短语平均，而不是把所有字符汇在一起？
::: solution
```python
from statistics import mean

def msd(a, b):
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        cur = [i]
        for j, cb in enumerate(b, 1):
            cur.append(min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (ca != cb)))
        prev = cur
    return prev[-1]

def summarise(records):
    """records: (presented, transcribed, seconds, keystrokes) per phrase."""
    rates = [(len(t) - 1) / s * 12 for p, t, s, k in records]
    errors = [msd(p, t) / max(len(p), len(t)) for p, t, s, k in records]
    kspc = [k / len(t) for p, t, s, k in records]
    return mean(rates), 100 * mean(errors), mean(kspc)

records = [
    ("the quick brown fox jumps over the lazy dog",
     "the quikc brown fox jumps ovr the lazy dog", 9.6, 47),
    ("hello world", "hello world", 2.0, 11),        # perfect: KSPC 1, no errors
]
wpm, err, kspc = summarise(records)
print(f"{wpm:.2f} wpm, {err:.2f}% MSD error, KSPC {kspc:.3f}")
```

```console
$ python3 summary.py
55.62 wpm, 3.49% MSD error, KSPC 1.060
```

手算核对：完美短语给出 $(11 - 1)/2 \times 12 = 60$ 词/分、零错误与 KSPC $11/11 = 1$；第一个给出 $51.25$ 词/分、$3/43 \approx 6.98\%$ 与 KSPC $47/42 \approx 1.119$。平均值为 $(51.25 + 60)/2 = 55.625$ 词/分、$6.98/2 \approx 3.49\%$ 与 $(1.119 + 1)/2 \approx 1.060$，与输出一致。

*为什么按短语取平均*：短语长短不一，把所有字符汇在一起会给长短语更大的权重；标准做法（麦肯齐与苏科列夫）是对每个短语先计算每个指标，再按参与者平均，使每位参与者在条件之间的比较中贡献相等。
:::
:::

