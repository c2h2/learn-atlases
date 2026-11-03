上一章以一条警告收尾：语言模型会很乐意产出一个读起来漂亮却跑不起来的计划。本章讲如何产出*能*跑的计划。这里所有方法背后共同的思想，是把人不知不觉一起回答的两个问题拆开：**这一步对指令有用吗？**——一个关于意义的问题，语言模型在这方面很强；以及**机器人现在能做到这一步吗？**——一个关于机器人与场景的问题，除非我们告诉模型，否则它对此一无所知。我们将建立带前置条件与效果的技能词汇表，推导把语言得分与可行性得分相乘的SayCan规则，介绍模型把请求翻译成经典规划器求解的形式化规划问题的LLM+P模式，讲述在机械臂移动之前用符号仿真与几何检查验证任意计划的方法，以及把结果反馈回去、让计划能在运行中得到纠正的Inner-Monologue模式。动机与四种架构见[[llm-robot-control/language-and-robots]]；经典规划在罗素（Russell）与诺维格（Norvig）的教材中有长篇论述，任务分解的语言模型一面见LLM图谱的[规划与任务分解](/learn/llm/lesson.php?c=agents&l=planning)章。

## 技能：计划的词汇表 {#sec-skills}

用语言指挥的机器人仍然需要一个固定的“能做的事”的词表。在一个单元里，这个词表就是**技能库**：集成商编写、调好并验证过的pick、place、insert、open-fixture与scan例程。规划器——无论是人、经典算法还是LLM——组合的是这些技能；它不发明新动作。

::: definition 技能 {#def-skill}
一个**技能**是带参数的机器人行为$\sigma(\theta)$——例如`pick(object)`或`place(object, location)`——再加上
- **前置条件**$\operatorname{pre}_\sigma(\theta)$：执行前必须成立的一组事实（夹爪是空的，物体可见且可达）；
- **效果**：技能使其为真的事实$\operatorname{add}_\sigma(\theta)$，以及使其为假的事实$\operatorname{del}_\sigma(\theta)$（`pick(bolt)`之后，机器人正握着螺栓，而螺栓不再在工作台上）；
- **成功检查**：执行之后判断预期效果是否真正达成的测试（夹爪手指的位置显示有物体，相机确认螺栓已不在工作台上）。
这些事实是关于场景物体的**谓词**，如`at(bolt, bench)`或`hand_empty`。前置条件与效果构成技能的**符号模型**；成功检查把模型与现实连接起来。
:::

下面是一个配料单元的小型技能库，写成一张既能贴进提示词、也能转成工具schema的表格：

| 技能 | 参数 | 前置条件 | 效果（添加/删除） | 成功检查 |
|---|---|---|---|---|
| `pick` | 零件$p$，槽位$s$ | `at(p,s)`、`hand_empty` | + `holding(p)`、`free(s)` / − `at(p,s)`、`hand_empty` | 手指宽度落在物体宽度带内；图像中槽位为空 |
| `place` | 零件$p$，槽位$s$ | `holding(p)`、`free(s)` | + `at(p,s)`、`hand_empty` / − `holding(p)`、`free(s)` | 夹爪张开；在槽位中检测到零件 |
| `scan` | 槽位$s$ | — | 由视觉更新`at(·, s)` | 检测器返回 |
| `open_fixture` | 夹具$f$ | `closed(f)`、`hand_empty` | + `open(f)` / − `closed(f)` | 门传感器 |

这张表的两个特征将在本课程中反复出现。前置条件是*可检查的*：每个谓词都能在技能运行之前由一次感知查询或一个传感器求值。而符号模型是一种*简化*：`pick`在前置条件成立时也可能失败（零件滑落），所以成功检查不是可选项。

::: remark 粒度
一个技能该多大？技能太小（`move_to`、`close_gripper`），计划就很长，语言模型就得对几何推理，误差如[[llm-robot-control/language-and-robots#prop-compound]]那样复合放大。技能太大（`do_kitting_order`），模型就没什么可决定的。一个不错的准则是：技能应当是集成商能够单独验证、且操作员一句话就会点名的最大单位：“拿起螺栓”“给机床装料”“打开夹具”。
:::

## SayCan：效用乘以可行性 {#sec-saycan}

第一个在真实机器人的能力上大规模接地LLM规划器的系统是SayCan（Ahn等，2022，《Do As I Can, Not As I Say》）。它的思想简单到一句话就能说清，重要到值得仔细推导。

在每一步，机器人有一个有限的候选技能集合$\pi$（每个都已填好参数：`pick(m6_bolt)`、`place(left_tray)`……），每个技能配一句简短的文本描述$\ell_\pi$。给定指令$i$和已执行技能的历史，我们想要最有可能带来进展的那个技能。记$c_\pi$为事件“现在执行$\pi$成功”，记$u_\pi$为事件“$\pi$是对$i$有用的下一步”。

::: proposition SayCan打分规则 {#prop-saycan}
假设在给定指令与历史的情况下，一个技能是否有用不取决于它是否会成功，而它是否会成功只取决于当前状态$s$。则
$$
\Prob(u_\pi \cap c_\pi \mid i, s) = \underbrace{\Prob(u_\pi \mid i)}_{\text{语言模型}}\;\cdot\;\underbrace{\Prob(c_\pi \mid s)}_{\text{可供性取值}},
$$ {#eq-saycan}
选择使该乘积最大的技能，就选择了最可能*既*有用*又*成功的步骤。第一个因子由语言模型估计：在包含$i$与历史的提示之后，文本$\ell_\pi$的似然，在候选之间归一化；第二个因子由在机器人上针对每个技能训练的价值函数或成功分类器给出。
:::

::: proof
对任意两个事件，$\Prob(u\cap c\mid i, s) = \Prob(u\mid i, s)\,\Prob(c\mid u, i, s)$。第一个假设（“效用由指令决定，而非由机器人的状态决定，且与成功与否无关”）给出$\Prob(u\mid i, s) = \Prob(u\mid i)$；第二个假设（“成功只取决于状态”）再加上$c$与$u$的条件独立，给出$\Prob(c\mid u, i, s) = \Prob(c\mid s)$。相乘即得[[#eq-saycan]]。由定义，使乘积最大的候选就是“既有用又成功”概率最高的候选。两个假设都不是严格成立的——一个不可能成功的技能谈不上有用——这正是该规则会犯下面所显示错误的原因。
:::

在SayCan里，语言因子来自PaLM（一个5400亿参数的模型）对每个技能描述的打分，可供性因子来自在办公室厨房里、对移动操作机器人用强化学习学到的价值函数。作者报告：在101条指令上，PaLM-SayCan有84%的时间选出了正确的技能序列，并有74%的时间成功执行。在工业单元里，可供性因子通常根本不学：它由感知与运动学计算——物体是否被高置信度检测到、抓取是否有无碰撞的逆运动学解、夹爪是否为空。

::: algorithm SayCan规划循环 {#alg-saycan}
输入：指令$i$；带文本描述$\ell_\pi$与可供性函数$v_\pi(s)\in[0,1]$的技能集合$\Pi$；终止技能`done`，$v = 1$。
1. 把历史$h$置为空列表。
2. 观测状态$s$。对每个$\pi\in\Pi$，计算语言得分$u_\pi$：模型在包含$i$与$h$的提示之后把$\ell_\pi$作为下一步的概率，归一化使得$\sum_\pi u_\pi = 1$。
3. 计算每个$\pi$的$v_\pi(s)$与综合得分$u_\pi v_\pi(s)$。
4. 选取$\pi^* = \arg\max_\pi u_\pi v_\pi(s)$。若$\pi^*$是`done`，停止。
5. 执行$\pi^*$，把$\ell_{\pi^*}$追加到$h$，转到2。
:::

::: example SayCan在配料单元里的一步 {#ex-saycan}
指令：“把M6螺栓放进左边的托盘。”夹爪是空的；一个M6螺栓躺在工作台上，部分被一块抹布盖住；一个M8螺栓完全露着。语言模型的归一化得分，以及由感知与逆运动学得到的可供性取值如下：

| 候选 | $u_\pi$（语言） | $v_\pi$（可供性） |
|---|---|---|
| `pick(m6_bolt)` | 0.55 | 0.80 |
| `place(left_tray)` | 0.25 | 0.02 |
| `pick(m8_bolt)` | 0.10 | 0.92 |
| `open_drawer` | 0.05 | 0.70 |
| `done` | 0.05 | 1.00 |

会选中哪个技能？若抓取成功之后得分变为`place(left_tray)`$0.70$、`place(right_tray)`$0.15$、`done`$0.10$、`pick(m8_bolt)`$0.05$，可供性依次为$0.95$、$0.95$、$1.00$、$0.05$，接下来会发生什么？最后，M6螺栓的可供性最多能降到多少，SayCan才会选错螺栓？
::: solution
乘积：`pick(m6_bolt)`$0.55\times0.80 = 0.440$；`place(left_tray)`$0.25\times0.02 = 0.005$（夹爪空着，没有东西可放）；`pick(m8_bolt)`$0.092$；`open_drawer`$0.035$；`done`$0.050$。SayCan选M6螺栓。注意语言模型单独给`place(left_tray)`开了四分之一的概率——“把……放进托盘”——是可供性因子把它抹掉了。

抓取之后：$0.70\times0.95 = 0.665$，$0.15\times0.95 = 0.143$，$0.10\times1.00 = 0.100$，$0.05\times0.05 = 0.0025$。机器人把螺栓放进左托盘；下一步`done`将占优。

切换点：当$0.55\,v < 0.092$，即$v < 0.092/0.55 = 0.167$时，错误的螺栓胜出。如果抹布遮住了M6螺栓足够多的部分，使抓取规划器的置信度跌破约17%，SayCan就会信心十足地拿起*M8*螺栓——一步可行却不服务于指令的动作。合理性检查：乘积规则在线性意义下拿效用与可行性做交换，所以一个高度可行的无关动作能打败一个勉强可行的相关动作。
:::
:::

::: widget plot
f: u1*x; u2*v2; ud
x: 0, 1
y: 0, 0.6
sliders: u1=0.55:0.05:1:0.01; u2=0.1:0:0.5:0.01; v2=0.92:0:1:0.01; ud=0.05:0:0.3:0.01
labels: \text{pick(m6): } u_1 v; \text{pick(m8): } u_2 v_2; \text{done}
caption: SayCan得分随目标技能的可供性取值$v$（横轴）的变化。上升的线是`pick(m6_bolt)`的得分；平线是干扰项`pick(m8_bolt)`与`done`的得分。只要平线压在上升线之上，SayCan就会选错动作。增大$u_2$——一个觉得两个螺栓越来越像的语言模型——看交点如何右移。提高`done`的得分，注意当目标难以抓取时机器人可能干脆放弃。
:::

这个例子展示了纯乘积的两个弱点。其一，当正确的技能很难时，规则会偏向容易的错误技能；一个实用的补救是给$u_\pi$设阈值门槛（凡指令不支持的一律不许执行），并加入能*改善*可供性的技能——`push_aside(rag)`、`scan(bench)`——或者一个`ask_operator`技能。其二，语言得分本身需要小心处理。

::: warning 语言模型的分数不是校准过的概率
模型赋予一段文本的似然，取决于它的长度与措辞，程度不亚于其含义。“pick up the M6 hex bolt”这样多词元的描述，其总概率天然低于“pick bolt”，只因相乘的词元概率更多，而每个都小于1。因此SayCan式的打分必须做归一化——每个技能用同一个措辞模板、比较每词元平均对数概率，或让模型在枚举出的选项中选择——并且绝不能被当作校准过的“答对概率”来解读。截至2026年，许多托管API根本不暴露词元对数概率；实用的替代方案是让模型对候选列表排序或从中挑选，事后再把可供性检查当作硬过滤器施加。
:::

::: quiz
在[[#ex-saycan]]中，假设规划器改为把语言得分乘以一个硬可行性*掩码*——逆运动学与抓取检测成功则$v = 1$，否则$v = 0$——而M6螺栓的抓取检测恰好成功。会选中哪个技能？
- [x] `pick(m6_bolt)`，因为在可行的技能中它的语言得分最高
- [ ] `pick(m8_bolt)`，因为它更可行
- [ ] `done`，因为它永远有$v = 1$
- [ ] 取决于M8螺栓的抓取置信度
::: solution
用二值掩码后，每个可行技能保留自己的语言得分，不可行的归零：`pick(m6_bolt)`$0.55$，`pick(m8_bolt)`$0.10$，`open_drawer`$0.05$，`done`$0.05$，`place`$0$。掩码规则从不用效用去换“更容易”，这正是工业系统常常把掩码加上感知置信度阈值置于连续乘积之上的原因。代价是一个勉强可行的抓取会被满信心地尝试，于是抓取之后的成功检查必不可少。
:::
:::

## 借助LLM翻译器的形式化规划 {#sec-pddl}

SayCan贪心地一次只决定一步。对于有真实约束的任务——借助一个空闲缓冲槽位交换两个零件、按特定顺序堆叠、遵守“重零件先做”——贪心的选择会失败，而模型一口气写出的清单也常常在半途违反某个前置条件。经典AI早在几十年前就用在状态上搜索的规划器解决了这类问题，前提是给出动作的形式化模型。现代的组合让每个部件做各自擅长的事。

::: definition PDDL的领域与问题 {#def-pddl}
**规划领域定义语言（Planning Domain Definition Language，PDDL）**由Drew McDermott及其同事为1998年国际规划大赛引入，脱胎于STRIPS（1971），把规划任务分成两部分描述。**领域**声明类型、谓词与动作，每个动作带参数、前置条件与效果——即[[#def-skill]]中的符号模型。**问题**声明物体、初始状态（一组为真的实例化谓词；没有列出的都为假）与目标（对最终状态的一个条件）。**计划**是一列实例化动作，它们的前置条件从初始状态起依次成立，且执行之后目标成立。
:::

上面表格中的配料技能，用PDDL写出来：

```lisp
(define (domain kitting)
  (:requirements :strips :typing)
  (:types part slot)
  (:predicates (at ?p - part ?s - slot) (holding ?p - part)
               (hand-empty) (free ?s - slot))
  (:action pick
    :parameters (?p - part ?s - slot)
    :precondition (and (at ?p ?s) (hand-empty))
    :effect (and (holding ?p) (free ?s) (not (at ?p ?s)) (not (hand-empty))))
  (:action place
    :parameters (?p - part ?s - slot)
    :precondition (and (holding ?p) (free ?s))
    :effect (and (at ?p ?s) (hand-empty) (not (holding ?p)) (not (free ?s)))))
```

在**LLM+P**模式（Liu等，2023）中，语言模型不做规划。它做翻译：

1. 自然语言请求与场景摘要变成一个PDDL**问题**文件：模型对着固定手写的**领域**来写。在提示词里放一个类似问题的完整示例，会让这个翻译可靠得多。
2. 经典规划器——Fast Downward等基于搜索的规划器是标准选择——找出一个计划，或在时限内证明不存在。
3. 计划逐个技能地执行，模型还可以（可选）把它转述成一句话给操作员。

::: example 交换两个零件 {#ex-swap}
零件$a$在槽位$A$，零件$b$在槽位$B$；槽位$C$空闲；夹爪为空。操作员说“把两个零件交换”。写出PDDL问题，找出一个计划，并与语言模型通常直接写出的四步计划作比较：从$A$拿起$a$，把$a$放到$B$，从$B$拿起$b$，把$b$放到$A$。
::: solution
问题文件：
```lisp
(define (problem swap)
  (:domain kitting)
  (:objects a b - part  A B C - slot)
  (:init (at a A) (at b B) (free C) (hand-empty))
  (:goal (and (at a B) (at b A))))
```
规划器返回最短计划，六个动作：`pick a A`、`place a C`、`pick b B`、`place b A`、`pick a C`、`place a B`。模型的四步计划在第2步失败：`place a B`要求`free B`，而$b$还在那里。在真实单元里，机械臂会试图把一个零件放到另一个零件上面；在符号模型里，前置条件干脆不成立。四步的计划不存在，因为每个零件至少要动一次，而其中一个要动两次（单个夹爪、没有空的目标槽位）——规划器的搜索证明了这一点。合理性检查：三次移动、每次两个动作，共六个动作。
:::
:::

分工才是重点。把话语翻译成目标是语言任务，模型擅长；在跟踪前置条件的同时搜索顺序是组合任务，模型做这件事不可靠，而规划器做得精确。薄弱环节转移到了翻译上：一个错误的物体名、一条漏掉的初始事实、一个少于操作员本意的目标。这些错误比一个错得很隐蔽的计划更容易被发现，因为问题文件很短，且能对照感知到的场景检查——里面的每个物体都必须是检测到的物体；每条`at`事实都必须与一次检测相符。

::: remark 超越STRIPS
真实单元需要比STRIPS更多的东西：数值量（fluents，如负载、零件计数）、持续动作，尤其是几何——只有存在无碰撞的放置位姿时才能“放置”。**任务与运动规划（task and motion planning，TAMP）**把符号搜索与运动规划器、抓取采样器的调用交织起来，使一个符号计划只有在每一步都有几何实现时才被接受。TAMP系统就是下面要描述的验证的工业级版本；LLM可以像LLM+P里那样坐在它上面。
:::

## 执行前验证计划 {#sec-validation}

无论计划由谁产出——SayCan、LLM+P、模型写的一张清单、人——在机械臂移动之前都应通过三道检查。第一道很便宜，且在给定符号模型时是精确的。

::: proposition 符号计划验证的正确性 {#prop-validation}
设符号模型由一个初始状态$s_0$（一组实例化事实）和实例化动作$a_1, \dots, a_n$组成，带前置条件$\operatorname{pre}(a_k)$、添加表$\operatorname{add}(a_k)$与删除表$\operatorname{del}(a_k)$。定义
$$
s_k = \bigl(s_{k-1}\setminus\operatorname{del}(a_k)\bigr)\cup\operatorname{add}(a_k),\qquad k = 1, \dots, n .
$$ {#eq-progression}
若每个$k$都有$\operatorname{pre}(a_k)\subseteq s_{k-1}$，且目标$G\subseteq s_n$，那么在任何完全按模型所说行事的世界里执行该计划都能达成$G$。反过来，使$\operatorname{pre}(a_k)\not\subseteq s_{k-1}$的第一个$k$，指出了模型预言的第一个失败步骤。
:::

::: proof
对$k$归纳：由假设，$s_0$是真实的初始状态。若$s_{k-1}$是第$k$步之前的真实状态且$\operatorname{pre}(a_k)\subseteq s_{k-1}$，则$a_k$可执行；而在按所建模型行事的世界里，其效果恰是移去$\operatorname{del}(a_k)$、加上$\operatorname{add}(a_k)$，所以由[[#eq-progression]]，其后的真实状态是$s_k$。于是$s_n$是真实的最终状态，而$G\subseteq s_n$意味着目标成立。反过来，同样的归纳说明步骤$1, \dots, k - 1$都可执行，而第$k$步有一个前置事实不在模型所预言的状态里，所以模型预言它无法运行。（先应用删除表、再应用添加表是STRIPS的约定；它只对同时添加并删除同一事实的动作有影响。）
:::

这个命题的可靠性不超过它的假设——“完全按模型所说行事的世界”。它对零件滑落或槽位误检不作任何保证，但它能在微秒内抓住计划里的每一个*逻辑*错误——顺序错误、重复抓取、放进已占用的槽位、未知技能。一个验证器只有十几行Python：

```python
def validate(plan, state, skills, goal):
    """Symbolic validation: return (True, final_state) or (False, reason)."""
    state = set(state)
    for k, (name, args) in enumerate(plan, start=1):
        if name not in skills:
            return False, f"step {k}: unknown skill {name!r}"
        sk = skills[name]
        if len(args) != len(sk.params):
            return False, f"step {k}: {name} expects {len(sk.params)} arguments"
        b = dict(zip(sk.params, args))                    # bind parameters
        ground = lambda atoms: {tuple(b.get(t, t) for t in a) for a in atoms}
        missing = ground(sk.pre) - state
        if missing:
            return False, f"step {k}: {name}{tuple(args)} needs {sorted(missing)}"
        state = (state - ground(sk.delete)) | ground(sk.add)   # eq. (progression)
    unmet = set(goal) - state
    return (False, f"goal not reached: {sorted(unmet)}") if unmet else (True, state)
```

对[[#ex-swap]]中模型那个四步交换计划运行它，返回`step 2: place('a', 'B') needs [('free', 'B')]`——这条消息足够精确，可以直接送回给语言模型，作为修正计划所需的反馈。

第二、三道检查需要几何。

::: algorithm 三阶段计划验证 {#alg-validate}
输入：一个候选计划、当前场景模型（带位姿与不确定度的检测物体）、技能库、机器人模型。
1. **符号检查。**按[[#prop-validation]]对照技能的符号模型验证计划。还要检查每个参数命名的物体或位置确实存在于当前场景中。失败时，返回第一个失败步骤与缺失的事实。
2. **几何检查。**对每一步，计算它需要的位姿（抓取位姿、预抓取位姿、放置位姿），使用前面步骤预测出的位姿。检查每个位姿是否有关节限位内的逆运动学解、相邻位姿之间是否存在无碰撞路径（一次运动规划器查询，如[[robotics/motion-planning-perception]]），以及负载与夹爪行程是否足够。失败时，返回该步骤与原因（“槽位C的放置位姿无逆运动学解”）。
3. **仿真（可用时）。**在由场景模型初始化的物理仿真器里执行计划，检查目标达成、且没有发生碰撞或掉落。这能抓住前两道阶段忽略的相互作用——一个零件放得离另一个太近、夹爪手指会撞上它；一摞会倾倒的堆叠。
4. 只有通过所有阶段的计划才会被执行；每条失败消息都记入日志，并可返回给规划器修复。
:::

::: example 几何验证抓到一个可达性问题 {#ex-geometric}
一个计划通过了符号检查：`pick(housing, tray_1)`、`place(housing, fixture)`。1号托盘里的壳体位于基坐标系中的$(0.62, -0.31, 0.08)\,\mathrm m$处；夹爪必须从正上方接近，预抓取时工具点要高于抓取点$0.15\,\mathrm m$。对竖直的工具姿态，该臂的可达工作空间在很好的近似下是一个绕基轴、半径$0.75\,\mathrm m$、高度范围$0$–$0.70\,\mathrm m$的圆柱。抓取位姿和预抓取位姿在里面吗？
::: solution
到基轴的横向距离：$\sqrt{0.62^2 + 0.31^2} = \sqrt{0.3844 + 0.0961} = 0.693\,\mathrm m < 0.75\,\mathrm m$。高度：抓取$0.08\,\mathrm m$、预抓取$0.23\,\mathrm m$，都在范围内。两个位姿都通过了这道粗略检查，于是规划器继续做完整的逆运动学查询与碰撞检查。倘若托盘被往外多放了$0.1\,\mathrm m$、半径约$0.79\,\mathrm m$，这一步就会在这里失败，并给出一条点名步骤与位姿的消息——这正是语言模型能利用的信息（“1号托盘里的壳体够不着；请操作员移动托盘，或者改用第二台机器人”）。粗略的工作空间检查作为快速的第一道过滤很有用；逆运动学解仍然是权威。
:::
:::

::: example 验证省下什么 {#ex-validation-value}
某规划器有8%的计划带着逻辑或几何错误。一个验证器能抓住这些错误的90%。在1,000条命令里，没有验证器、以及有验证器时，各有多少带错计划到达机械臂？若每次错误执行平均耗费操作员4分钟恢复时间，每1,000条命令省下多少？
::: solution
没有验证时，$1000\times0.08 = 80$个带错计划被执行；有验证时，$80\times(1 - 0.9) = 8$个。被拦下的72个计划退回给规划器，多数在几秒内就能修复。节省的恢复时间：$72\times4 = 288$分钟——每1,000条命令将近五个小时的操作员时间——而这道检查每个计划的代价从毫秒级（符号）到约一秒（运动规划器查询）不等。漏网的8个多半是模型之外的错误——这正是仍然需要成功检测的原因。
:::
:::

## 执行期间的反馈：Inner Monologue {#sec-monologue}

验证是拿计划对照*执行前感知到的*场景。而执行会改变场景，有时并不如所愿。在**Inner Monologue**（Huang等，2022）中，规划器的提示词是一份持续增长的记录，系统把每一步之后发生了什么用纯文本写进去：这一步是否成功、相机现在看到哪些物体，以及人说过的任何话。语言模型读完这份记录后再规划下一步，于是它能重试、换一个物体，或者提问。

螺栓任务的记录可能长这样：

```text
Human: Put the M6 bolt in the left tray.
Scene: m6_bolt (bench, partly covered by rag), m8_bolt (bench), left_tray (empty), right_tray (empty)
Robot action: pick(m6_bolt)
Success: no — gripper closed fully, no object detected
Scene: m6_bolt (bench, under rag), rag (bench)
Robot action: push_aside(rag)
Success: yes
Scene: m6_bolt (bench, fully visible), rag (bench, moved), ...
Robot action: pick(m6_bolt)
Success: yes
Robot action: place(m6_bolt, left_tray)
Success: yes
Robot action: done
```

Inner Monologue区分了几类文本反馈：**成功检测**（上一个技能达成效果了吗？）、**被动场景描述**（感知系统当前报告的内容）、**主动场景描述**（回答模型提出的问题，例如“抽屉开着吗？”）以及**人类反馈**。它们全都是模型上下文里的普通文本，这让该模式用任何模型都容易实现；其可靠性则完全取决于产生它们的检测器。反馈回路在[[llm-robot-control/closed-loop-recovery]]中充分展开。

::: warning 反馈文本是输入，不是预言机
模型会把记录里的一切当真。一个在零件掉回托盘时报告“是”的成功检测器，会让规划器抱着一幅错误的世界图景信心满满地继续；一份漏掉某个物体的场景描述会让规划器忘掉它。要单独度量每个反馈来源的精确率与召回率，记录写进记录文本的内容，并让*单元自己的状态*（计数器、传感器、验证得到的符号状态）在存在时保持事实来源的地位。来自场景的文本——标签、便条、屏幕——也绝不可当作指令一般粘进记录；见[[llm-robot-control/llm-guardrails]]。
:::

::: history
STRIPS（Fikes和Nilsson，1971）给了Shakey机器人沿用至今的前置条件–添加–删除动作表示，PDDL（McDermott等，1998）则为国际规划大赛把它标准化，大赛推动了两代启发式搜索规划器（如Fast Downward，Helmert，2006）的进展。任务与运动规划从2000年代起兴起，把符号计划接到几何。语言模型时代始于2022年：Huang、Abbeel、Pathak和Mordatch证明，当自由文本步骤被映射到可容许动作时，LLM就能充当零样本规划器；SayCan（Ahn等，Google与Everyday Robots）在真实机器人上把语言得分与学得的可供性相乘；Inner Monologue（Huang等）加入了文本反馈；ProgPrompt（Singh等）用程序风格的提示让模型产出任务计划。LLM+P（Liu等，2023）回到了经典规划器，模型只用作通往PDDL的翻译器；2023–2024年的一系列工作研究了LLM写的计划究竟有多少是有效的，总体发现：在需要跟踪大量前置条件的问题上，无辅助的模型会失败。
:::

::: summary
- 一个**技能**（[[#def-skill]]）有参数、可检查的前置条件、添加与删除效果、以及一个成功检查；计划是技能序列，从不是原始运动。
- **SayCan**选择使$\Prob(\text{有用}\mid i)\cdot\Prob(\text{成功}\mid s)$（[[#prop-saycan]]）最大的技能；乘积可能偏袒容易的错误动作而放弃困难的正确动作，所以要使用阈值、二值可行性掩码和改善可供性的技能。
- 语言模型的似然不是校准概率；要么归一化措辞，要么让模型从枚举的选项中挑选。
- **LLM+P**：模型把请求翻译成针对固定领域（[[#def-pddl]]）的PDDL问题；经典规划器找出正确计划，或证明不存在。
- **执行前验证**（[[#alg-validate]]）：符号推进（[[#prop-validation]]）在微秒内精确抓住逻辑错误；几何检查（逆运动学、碰撞、负载）与仿真抓住物理错误。
- **Inner Monologue**把成功、场景与人类反馈作为文本喂回去，让计划在执行中调整；反馈的好与坏只取决于它的检测器。
:::

## 习题

::: exercise 按乘积选择 {level=1 check="0.2975"}
三个候选技能的语言得分为$0.40$、$0.35$、$0.25$，可供性取值为$0.30$、$0.85$、$0.60$。SayCan选哪一个，其综合得分是多少？（填入获胜的得分。）
::: solution
乘积：$0.120$、$0.2975$、$0.150$。第二个技能以$0.2975$胜出，尽管语言模型偏好第一个：在当前状态下第一个太不可能成功。
:::
:::

::: exercise 切换点 {level=1 check="0.4"}
一个有用技能的语言得分为$0.50$；一个干扰项语言得分$0.20$、可供性$1.0$。有用技能的可供性低于何值时，SayCan会选择干扰项？（填入可供性取值。）
::: solution
当$0.50\,v < 0.20\times1.0$，即$v < 0.4$时，干扰项胜出。
:::
:::

::: exercise 实例化动作 {level=1 check="80"}
上面的配料领域有5种零件和8个槽位。实例化的`pick`与`place`动作总共有多少个？
::: solution
`pick`与`place`各有一个零件参数和一个槽位参数：各$5\times8 = 40$个实例化，共$80$个。规划器只考虑前置条件在当前状态成立的那些；单手夹爪下，手空时最多5个pick可用，而当它握着一个零件时，其余四个零件占据四个槽位，于是最多4个place（每个空槽一个）可用。
:::
:::

::: exercise 找出第一个失败步骤 {level=2}
初始状态：`at(a, A)`、`at(b, B)`、`free(C)`、`free(D)`、`hand_empty`。计划：`pick(a, A)`、`place(a, C)`、`pick(b, B)`、`place(b, C)`、`pick(a, C)`。应用[[#prop-validation]]，报告第一个失败步骤与缺失的事实。
::: solution
第1步之后：`holding(a)`、`free(A)`、`at(b,B)`、`free(C)`、`free(D)`。第2步：`at(a,C)`、`hand_empty`，`free(C)`被删去。第3步：`holding(b)`、`free(B)`。第4步：`place(b, C)`需要`free(C)`——为假，因为$a$在$C$里。第一个失败步骤是4，缺失`free(C)`。修正后的计划会把$b$放进$D$或者$A$。
:::
:::

::: exercise 轮换三个零件 {level=2 check="8"}
零件$a, b, c$在槽位$A, B, C$中；槽位$D$空闲；目标是$a$到$B$、$b$到$C$、$c$到$A$。最短计划有多少个动作？
::: solution
每个零件都必须移动（三次移动），而且因为三个目标槽位初始时全被占据，必须先把某个零件挪进缓冲位$D$、之后再动一次：共四次移动，每次一个`pick`和一个`place`，所以$8$个动作。例如：$a\to D$、$c\to A$、$b\to C$、$a\to B$。一般地，$k$个零件的循环置换配一个缓冲位需要$k + 1$次移动、$2(k + 1)$个动作。
:::
:::

::: exercise 打分中的长度偏置 {level=2 check="0.6816"}
模型对两个技能描述给出的词元对数概率（自然对数）是：“pick up the hex bolt from the bench”$(-0.4, -0.3, -0.5, -0.2, -0.6, -0.3)$与“open drawer”$(-1.1, -0.9)$。比较总对数概率与每词元的几何平均概率。每个准则各偏好哪个技能？（第一个描述的每词元几何平均概率保留四位小数。）
::: solution
总和：$-2.3$与$-2.0$，所以总似然偏好“open drawer”（$e^{-2.0} = 0.135$对$e^{-2.3} = 0.100$）。每词元：$-2.3/6 = -0.383$，$e^{-0.383} = 0.6816$；$-2.0/2 = -1.0$，$e^{-1} = 0.368$。按每词元打分会强烈偏好螺栓描述，其中每个单词单独看都算可能。准则改变了决定——这正是打分必须使用固定措辞模板或枚举选项式提示的原因。
:::
:::

::: exercise 夹具的PDDL动作 {level=2}
给配料领域加上一个夹具：零件放入之前它必须打开，加工之前必须闭合（夹紧）。写出`open-fixture`、`close-fixture`与一个`place-in-fixture`动作，以及“装入零件$a$并夹紧”的目标。
::: solution
添加谓词`(open ?f - fixture)`、`(closed ?f - fixture)`、`(in ?p - part ?f - fixture)`、`(empty ?f - fixture)`。
```lisp
(:action open-fixture :parameters (?f - fixture)
  :precondition (and (closed ?f) (hand-empty))
  :effect (and (open ?f) (not (closed ?f))))
(:action close-fixture :parameters (?f - fixture)
  :precondition (and (open ?f) (hand-empty))
  :effect (and (closed ?f) (not (open ?f))))
(:action place-in-fixture :parameters (?p - part ?f - fixture)
  :precondition (and (holding ?p) (open ?f) (empty ?f))
  :effect (and (in ?p ?f) (hand-empty) (not (holding ?p)) (not (empty ?f))))
```
目标：`(and (in a F1) (closed F1))`。要求闭合时`hand-empty`，可防止模型规划出夹爪里还带着零件就夹紧；在真实单元里，夹具自己的联锁必须执行同一条规则，因为符号模型不是安全功能。
:::
:::

::: exercise 验证器需要的召回率 {level=3 check="0.95"}
某规划器的计划有6%带错误。客户接受每1,000条命令至多3次错误执行。验证器必须具有多大的召回率（抓住的带错计划比例）？（以分数形式填入召回率。）
::: solution
每1,000条命令的错误执行：$1000\times0.06\times(1 - r)\le3$，所以$1 - r\le0.05$，$r\ge0.95$。对付几何错误，单靠符号检查很少能达到这个水平；需要[[#alg-validate]]的几何与仿真阶段，而且召回率必须在植入故障计划的测试集上度量。
:::
:::

::: exercise 贪心与规划 {level=3}
借助[[#ex-swap]]的交换问题，解释为什么即便每个可供性都被精确计算，SayCan的贪心一步规则仍可能失败，而LLM+P却成功。然后描述你会如何把两种方法合进一个系统。
::: solution
在交换开始时，`pick(a, A)`之后“听起来最有用”的一步是`place(a, B)`——它直接提到了目标位置——但它不可行（B被占用），所以它的可供性是0；下一个选择可能是`place(a, A)`（放回去，可行，无用）或`place(a, C)`（可行，但只有作为更长计划的一部分才有用）。语言模型必须认识到绕道$C$是进展，而一步得分很难刻画这一点；贪心规则可能原地打转（拿起、放回、拿起……）。在序列上搜索的规划器能发现这个绕道，因为它拿完整计划对照目标来评估。组合方案：让LLM把指令翻译成PDDL目标（LLM+P），符号规划，几何验证，然后带Inner-Monologue反馈逐步执行；某一步失败时，从感知更新初始状态，并用经典规划器重新规划，而不是问LLM下一步是什么。只有当目标本身成疑时（缺了某个物体、操作员的请求含糊），才再次请教LLM。
:::
:::

::: exercise 设计技能库 {level=3}
为一台装配小型齿轮箱（壳体、两根带齿轮的轴、一个盖板、四颗螺钉）的机器人，提出一个六到十项技能的技能库，带参数、前置条件、效果与成功检查。说明你如何选择粒度，以及哪些成功检查需要夹爪以外的传感器。
::: solution
一个可能的库：`pick(part, location)`（前置：`hand_empty`、`at(part, location)`；检查：手指宽度）、`place(part, location)`；`insert_shaft(shaft, bore)`（前置：`holding(shaft)`；`aligned`不必作为事实——对准在技能内部；检查：由机器人位置得到的插入深度，以及以预期到位力收尾的力曲线）；`mesh_gears(shaft_a, shaft_b)`作为检查技能（转动输入，用相机或编码器测输出转角）；`place_cover(cover, housing)`（前置：两轴都已插入）；`drive_screw(hole)`（前置：`holding(screwdriver)`、盖板已放置；检查：螺丝刀控制器的转矩–转角曲线在角度窗口内达到目标转矩）；`change_tool(tool)`；`inspect(assembly)`（相机）。粒度：每项技能都应是集成商能单独调参与测试、操作员会点名的单位。力/力矩感知（插入、拧螺钉）与视觉（齿轮啮合、检测）是必需的，因为仅凭夹爪状态无法确认接触类任务。符号模型记录每个成功检查确认了什么，于是验证与重规划使用的是实测状态，而不是假设的状态。
:::
:::
