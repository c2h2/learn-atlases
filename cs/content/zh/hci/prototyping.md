1984 年洛杉矶奥运会，IBM 构建了一套语音消息系统，让世界各地的运动员能通过奥运村里的电话和公用终端收发语音留言。用户会说几十种语言，许多人从没用过计算机，系统必须从奥运会第一天起就正常工作，而且没有第二次机会。约翰·古尔德（John Gould）与同事在 1987 年的 *Communications of the ACM* 上报告了这个项目，介绍了他们没有写一份规格说明然后听天由命，而是做了什么：先写用户手册并拿给人测试；跑由幕后人员扮演计算机的模拟；把早期版本放在走廊里邀请过路人试用；把原型终端带到奥运会预选赛事；而在一场"设法搞垮它"的最后测试里，他们邀请人们来破坏系统。每一轮都发现了那些在奥运会期间会是致命的、而在奥运会之前修复很便宜的问题。

**原型**（prototype）是任何能让人在成品还不存在时体验一个设计的东西——一张草图、一份纸面模型、一个可点击的模拟、一个假装是计算机的人。本章讲的是如何选用与使用原型：一个原型要回答什么问题；为什么在精炼一个设计之前先探索许多设计是划算的；如何开展纸面原型与绿野仙踪（Wizard-of-Oz）研究；如何把一个交互原型当作状态机、用图搜索检查它的导航；以及迭代如何收敛——或如何不收敛。它建立在 [[hci/user-centred-design]] 之上，那里提供了原型赖以检验的用户、任务与需求。

## 原型的用途

::: definition 原型 {#def-prototype}
**原型**是在最终成品存在之前做出的设计表示，目的是回答关于它的*问题*——为设计者、用户或其他干系人回答。它在某个方面（外观、交互性、内容、性能）与最终产品的相像程度称为**保真度**（fidelity）。一个原型若在回答完它的问题后就被丢弃，就是**一次性**（throwaway）的；若被继续开发成产品，就是**演化型**（evolutionary）的。
:::

这个定义把*问题*放在第一位。Stephanie Houde 与 Charles Hill（"What do prototypes prototype?"，1997）提出，每个原型都在回答三个问题的某种组合：它在用户生活中的**角色**（role，它是干什么的，这有人在乎吗？）、它的**外观与感受**（look and feel，看上去、用起来是什么样？）、以及它的**实现**（implementation，它能被造出来吗，将如何工作？）。一个揣在口袋里带上一周的纸板手机模型回答的是角色问题；一段新手势的精美动画回答外观与感受问题；一个能以目标帧率播放视频的粗糙程序回答实现问题。选择原型要从问题出发，然后挑*能回答它*的最低保真度。

### 保真度与范围

**低保真**原型——草图、纸屏幕、故事板、纸板模型——快、便宜、并且一眼看出没做完。最后这条反而是优点：人们会毫无顾忌地批评一张草图，而一面精致的屏幕只会招来对颜色和字体的评论，并让人不好意思批评概念本身。**高保真**原型——看起来像真产品的交互模拟，或能跑的代码——是用来回答关于时序、动画、真实数据与精细视觉细节的问题、以及说服干系人时才需要的。

低保真会发现更少的可用性问题吗？Robert Virzi、Jeffrey Sokolov 与 Demetrios Karis（CHI 1996）比较了两款产品的纸面原型与高保真原型，发现它们揭示的问题实质相同；后来的比较，如 Sefelin、Tscheligi 与 Giller（2003），在发现问题的*数量*上得出类似结论，只是指出参与者有时更喜欢计算机版本。这些研究规模小、又限于各自的产品，所以稳妥的结论要说得保守：对结构、措辞与流程的问题，低保真通常够用；对时序、运动与视觉细节的问题则不够。

::: definition 横向原型与纵向原型 {#def-scope}
**横向原型**（horizontal prototype）展示系统的广度——许多功能或屏幕——每个背后的功能很少。**纵向原型**（vertical prototype）深入实现少数几个功能，一直到真实数据与真实行为。**T 型原型**把横向的概览与穿过最重要或最不确定任务的一两个纵向切片结合起来。
:::

横向原型测试导航与概念模型（"您会去哪里修改收货地址？"）；纵向原型测试某个具体任务究竟能否完成、要花多长时间。T 形把深度只花在风险所在的地方。

::: warning "原型看起来已经完成，产品也就快做完了"
一个高保真原型可以看起来与成品完全一样，而背后一无所有：没有错误处理，没有安全，没有数据，没有性能。看到它的干系人照例会得出"工作快做完了"的结论，并催着发布。要把原型的状态说清楚（标明它，使用占位内容，把它放在单独的工具里），事先商定原型是一次性还是演化型，并且绝不让一次性原型的代码漂进生产环境——它是为了快点回答一个问题而写的，不是为了被维护（[[software-engineering/software-process]]）。
:::

## 画草图与探索备选

Bill Buxton（*Sketching User Experiences*，2007）按用途区分**草图**（sketch）与原型。草图快、便宜、量大、含糊、可随手丢弃；它们是用来*探索*的——去提示、去发问。原型更精细，是用来*测试*和*打磨*一个选定方向的。好的设计工作会先做足前者再做后者：Buxton 的说法是先 "getting the right design"（做对的设计），再 "get the design right"（把设计做对）。

有两个实验支持并行探索多个设计。Maryam Tohidi、William Buxton、Ronald Baecker 与 Abigail Sellen（"Getting the right design and the design right"，CHI 2006）让参与者要么只看一个房屋温控原型，要么看三个不同的；看了三个的那组给出更多批评性评论、更少纯粹正面的评论，原因看起来是看见备选让批评变得可以接受。Steven Dow 与同事（"Parallel prototyping leads to better design results, more divergence, and increased self-efficacy"，*ACM TOCHI*，2010）让参与者在同样的总时间内设计网络横幅广告，要么同时创建多个设计并一起获得反馈，要么一个一个来；并行组的最终广告被专家评得更高，投放到网上也吸引了更多点击。两者都是针对特定任务的单项研究，但指向同一方向：过早地锁定某一个设计，代价高昂。

**设计空间**（design space）把备选摆到明面上。列出设计可以变化的各维度以及每个维度上的选项；每个组合都是一个候选设计。

::: example 停车应用缴费流程的设计空间 {#ex-design-space}
某市想要一款缴纳路边停车费的应用。用四个维度铺一个设计空间——位置如何确定、时长如何设定、缴费何时发生、如何提醒用户——并数一数设计数。你会如何探索它？
::: solution
一种可能的空间：

| 维度 | 选项 |
|---|---|
| 位置 | GPS 自动；键入区号；扫描标志牌上的二维码 |
| 时长 | 选择结束时间；开始/停止（按实际停车时长付费）；固定时段 |
| 缴费 | 每次单独付；按月账单；预付费钱包 |
| 提醒 | 推送通知；短信；无 |

组合共有 $3^4 = 81$ 种——多到无法一一做原型，但也只考虑过其中一种那就太说不过去了。有些组合自相矛盾（开始/停止与固定时段根本不是一回事，所以维度并不完全独立），有些组合被支配（固定时段却没有提醒，有吃罚单的风险）。一次务实的探索是一小时内画大约六到十个*彼此相异*的组合，把其中三个做成纸面原型、对着关键场景测试（匆忙到达、在咖啡馆里续时、没有账户的访客），然后才精炼其中一个——也许再从另一个里借走最好的点子。这张表同时记录了**设计理由**（design rationale）：考虑过哪些选项，又为什么舍弃。
:::
:::

## 纸面原型

在**纸面原型**（paper prototype）中，每个屏幕、菜单、对话框与消息都画在纸或卡片上，由一个人根据参与者的动作搬动这些纸片。Carolyn Snyder 的 *Paper Prototyping*（2003）与 Marc Rettig 的文章 "Prototyping for tiny fingers"（*Communications of the ACM*，1994）给出了这个方法。一次测试有三个角色：

- **引导者**（facilitator）给参与者任务，请他们出声思考，并推动测试进行而不帮忙；
- **计算机**——由熟悉设计的团队成员扮演——对每次"点击"或"点按"保持沉默、像系统一样准确地摆出正确的纸片，包括错误消息；
- 一到多名**观察者**记录参与者所做所说，尤其是犹豫、走错的地方和评论。

纸面原型可以*在各次测试之间*修改——甚至在一次测试中途修改，如果某个标签明显误导的话——这使它成为一种极快的迭代方式。它的短处是难以表现滚动、时序、动画、拖放与大数据量，而且扮演"计算机"的人必须小心，不让自己的手和眼泄底。

::: example 策划一次纸面原型测试 {#ex-paper}
为 [[#ex-design-space]] 的停车应用，用"开始/停止、GPS 定位、预付费钱包"这个设计，策划一场 30 分钟的纸面原型测试。
::: solution
*任务*（写在卡片上，用不含界面词汇的目标措辞）：(1) "您刚在图书馆门前停好车。把停车费缴了。"(2) "您在咖啡馆里，想再待一个小时。确认不会被贴罚单。"(3) "您办完事了。停止缴费。"(4) "上周停车花了您多少钱？"

*材料*：带地图的首页；一张位置确认（"您在 4127 区——图书馆街"）外加一个"区不对？"；一个进行中的会话屏，显示已用时长与费用；余额不足警告；充值屏；一张通知卡（"您的停车将在 10 分钟后达到 2 小时上限"）；历史屏；错误状态（GPS 不可用、余额不足）。再备空白卡片和笔以便修改。

*流程*：知情同意，并说明被测试的是*设计*而不是参与者（5 分钟）；一个不相干的练习题；四个任务配合出声思考（20 分钟）；简短的回顾（"哪里最让人困惑？"）（5 分钟）。观察者对每个任务记录成功、走错的地方与引语。

*留意的东西*：参与者信任自动检测出的区吗？"开始/停止"符合他们的心智模型吗，还是他们预期预先购买时长（[[hci/human-factors]]，心智模型）？离开应用后他们会注意到有一个会话在计时吗？任务 2 检验那张通知卡，由"计算机"在一阵停顿之后滑进场。
:::
:::

## 绿野仙踪

有些设计靠搬纸片无法令人信服地模拟：语音界面、推荐系统、对话助手、手势识别。**绿野仙踪**（Wizard-of-Oz）技术由 John Kelley（*ACM Transactions on Office Information Systems*，1984）命名，取自 Frank Baum 故事里幕布后面那个人，做法是让一个藏起来的人扮演系统还不存在的那部分。

::: definition 绿野仙踪原型 {#def-woz}
在**绿野仙踪**研究中，参与者与一个看上去能工作的系统交互，而其部分或全部响应由一名按既定规程行事、藏起来的人工操作者（**巫师**，wizard）产生。它用于在建成某种能力之前研究人们将如何与它交互，并为建造它收集真实的输入数据（例如人们实际会说的说法）。
:::

Kelley 用这个方法开发一个自然语言日历程序：参与者键入请求，巫师作答，他们的输入被用来在几轮迭代中扩充程序的词表和语法，直到它没有巫师也能运行。这个方法有三条要求。巫师必须遵守反映系统*可能*做到什么的**规则**——一个无所不知的巫师模拟的是一个不可能的系统，结果将无法外推。巫师的**响应时间**必须真实且一致，这对人来说很难。而欺骗必须**合乎伦理**地处理：事后要向参与者解释清楚，告诉他们曾有真人参与，并允许他们撤回自己的数据。

::: quiz
一个团队用绿野仙踪研究测试一个预约医疗号源的语音助手。巫师是一名诊所接待员，能完美理解每个请求，包括 "sometime next week when Dr Patel's free, not Monday" 这样含糊的说法。主要风险是什么？
- [ ] 参与者会注意到背后是人。
- [x] 研究模拟了一个远比任何将要建成的系统强大的系统，其关于可用性与满意度的结论可能无法外推。
- [ ] 接待员反应太慢。
- [ ] 没有风险；完美的巫师给出最好的数据。
::: solution
绿野仙踪研究的价值取决于巫师表现得像*计划中*的系统。一个完美的巫师让参与者随意开口、事事成功；真实系统会误解某些请求，而人们如何从误解中恢复恰恰是要设计的东西。要给巫师明确的规则（接受哪些请求形式、何时要求澄清、一个蓄意的错误率），以及一套写好的响应脚本。被发现是真实但次要的顾虑；速度也重要，但更容易控制。
:::
:::

## 交互原型即状态机

一个可点击的原型——用链接连起来的屏幕——是 [[theory-of-computation]] 意义上的**有限状态机**：屏幕是状态，用户动作是带标签的转换。这样看待它，就能在给任何人看之前机械地检查原型的导航。

::: definition 导航模型 {#def-nav-model}
一个界面的**导航模型**是一个有向图 $G = (V, E)$，其顶点是界面的状态（屏幕、对话框、模式），其边 $(u, v)$ 以把 $u$ 带到 $v$ 的用户动作为标签，另有一个**起始**状态 $s \in V$。若存在从 $s$ 到 $v$ 的路径，则称状态 $v$ **可达**；若它没有出边，则称它为**死路**；若从每个可达状态都存在一条回到 $s$ 的路径，则称该模型**可恢复**。
:::

::: proposition 用搜索检查导航 {#prop-nav-check}
从 $s$ 出发的一次广度优先搜索能找到每个可达状态，并对每个状态给出从 $s$ 出发的最短动作序列，耗时 $O(\lvert V\rvert + \lvert E\rvert)$。可恢复性也可以在同样的时间内检查：只需在**反向**图上从 $s$ 做一次广度优先搜索——当且仅当每个从 $s$ 可达的状态也都被那次反向搜索到达时，模型可恢复。
:::

::: proof
广度优先搜索的正确性与运行时间——包括其前驱树的最短路性质——在 [[algorithms]] 中证明。可恢复性：$v$ 在 $G$ 中有到 $s$ 的路径，当且仅当 $s$ 在反向图 $G^R$ 中有到 $v$ 的路径，因为把一条从 $v$ 到 $s$ 的路径的每条边反向，就得到 $G^R$ 中一条从 $s$ 到 $v$ 的路径，反之亦然。所以在 $G^R$ 中从 $s$ 出发的一次搜索恰好找到所有能到达 $s$ 的状态，而模型可恢复当且仅当该集合包含 $G$ 中一切可达状态。构造 $G^R$ 并对其搜索各需 $O(\lvert V\rvert + \lvert E\rvert)$ 时间。
:::

到一个状态的最短路长度，是任务代价的一个最初步、粗略的度量——用户必须经过的屏幕数——[[hci/interaction-techniques]] 用击键级模型把它细化为时间。

::: example 检查一个点餐原型 {#ex-nav-check}
一个团队的可点击原型有如下屏幕与链接。检查它有没有不可达的屏幕、死路，以及用户无法回家（Home）的状态，并给出完成一次点单所需的最少动作数。
::: solution
```python
from collections import deque

# A clickable prototype of a food-ordering app: screen -> {action label: target screen}
proto = {
    "Home":     {"search": "Results", "basket": "Basket", "account": "Account"},
    "Results":  {"open item": "Item", "back": "Home"},
    "Item":     {"add to basket": "Basket", "back": "Results"},
    "Basket":   {"checkout": "Payment", "back": "Home"},
    "Payment":  {"pay": "Done", "edit address": "Address"},
    "Address":  {"save": "Payment"},
    "Done":     {},                       # order confirmation
    "Account":  {"order history": "History", "back": "Home"},
    "History":  {"reorder": "Basket"},
    "Help":     {"back": "Home"},         # nothing links here yet
}

def bfs(graph, start):
    """Shortest action sequence from start to every reachable screen."""
    path = {start: []}
    queue = deque([start])
    while queue:
        s = queue.popleft()
        for action, t in graph[s].items():
            if t not in path:
                path[t] = path[s] + [action]
                queue.append(t)
    return path

reach = bfs(proto, "Home")
for screen, actions in reach.items():
    print(f"{screen:8} {len(actions)} step(s): {' > '.join(actions)}")
print("unreachable:", sorted(set(proto) - set(reach)))
print("dead ends:  ", sorted(s for s in proto if not proto[s]))
stuck = [s for s in reach if "Home" not in bfs(proto, s)]
print("no way home:", sorted(stuck))
```

```console
$ python3 proto.py
Home     0 step(s): 
Results  1 step(s): search
Basket   1 step(s): basket
Account  1 step(s): account
Item     2 step(s): search > open item
Payment  2 step(s): basket > checkout
History  2 step(s): account > order history
Done     3 step(s): basket > checkout > pay
Address  3 step(s): basket > checkout > edit address
unreachable: ['Help']
dead ends:   ['Done']
no way home: ['Address', 'Done', 'Payment']
```

（为简单起见，程序对每个状态跑一次搜索，而不是 [[#prop-nav-check]] 中那一次反向搜索；对一个只有几十屏的原型，两种做法都是瞬时完成的。）三个发现。**Help 不可达**：一个屏幕画了却从未被链接。**Done 是死路**：下完单后用户被困在确认页上——它需要一个回家的链接或订单跟踪。**Payment 没有回头路**：用户一旦到达结账页，就无法返回购物车改单，而 Address 屏只能回到 Payment，所以有三个状态困住用户。最后，到 Done 的最短路是 `basket > checkout > pay`，前提是购物袋里已经装了食物；从空袋开始，一次真实的点单需要 `search > open item > add to basket > checkout > pay`，五个动作。这些没有一个需要参与者来发现——把人留给只有人能回答的问题。
:::
:::

::: widget graph
nodes: Home@0,2; Results@1,3; Item@2,3; Basket@2,2; Payment@3,2; Address@4,3; Done@4,1; Account@1,1; History@2,1; Help@0,0
edges: Home>Results; Home>Basket; Home>Account; Results>Item; Results>Home; Item>Basket; Item>Results; Basket>Payment; Basket>Home; Payment>Done; Payment>Address; Address>Payment; Account>History; Account>Home; History>Basket; Help>Home
algorithm: bfs
start: Home
caption: [[#ex-nav-check]] 的导航模型。逐步观看从 Home 出发的广度优先搜索：屏幕被到达的次序给出到达每个屏幕所需的最少动作数，而 Help 永远不会被到达。然后把起点顶点选为 Payment：Home 永远不会被到达，所以这个原型把用户困在结账处。
:::

这样的基于模型的检查可以放大规模：对用户界面做基于模型测试的工具从真实应用中导出导航图并据其生成测试序列（[[software-engineering/testing]]），而输液泵一类的安全攸关界面已用模型检验器针对"任何数字输入都可取消"这类性质做过验证（[[software-engineering/verification]]）。

## 迭代

便宜原型的意义就在于可以被改。迭代式设计反复运行以人为中心的循环（[[hci/user-centred-design#def-hcd]]）：做原型，与用户一起评估，修改，重复。需要多少轮迭代？一个简单的模型能把取舍摆到眼前。

::: proposition 迭代改进的模型 {#prop-iteration}
设一个设计初始有 $R_0$ 个可用性问题；每轮评估独立地以概率 $q$ 发现每个残留问题；每个被发现的问题都会被修复；而每次修复独立地以概率 $r$ 引入一个新问题。则 $k$ 轮之后问题数的期望为

$$
\E[R_k] = R_0\,\bigl(1 - q(1-r)\bigr)^k,
$$ {#eq-iteration}

而期望降到 $R_0$ 的分数 $f$ 以下，当 $k \ge \ln f / \ln\bigl(1 - q(1 - r)\bigr)$。
:::

::: proof
给定 $R_k$ 个问题，下一轮发现数的期望是 $qR_k$，所以未被发现之数的期望是 $(1-q)R_k$；被发现的都被修复，每次修复以概率 $r$ 造成一个新问题，贡献期望 $r\,qR_k$。于是 $\E[R_{k+1} \mid R_k] = R_k(1 - q + qr) = R_k\bigl(1 - q(1-r)\bigr)$，两边取期望得 $\E[R_{k+1}] = \bigl(1 - q(1-r)\bigr)\E[R_k]$。归纳得 $\E[R_k] = R_0(1 - q(1-r))^k$。关于 $k$ 的界由两边取对数得出，同 [[hci/user-centred-design#prop-detect]]。
:::

这是一个模型，不是测量：真实问题被发现的难易不同，修复会互相干扰，而且每个新原型也是加功能（顺带加问题）的机会。它的价值在于它定性地展示了什么。只要 $q(1 - r)$ 相当大，改进就是几何级数的，所以头几轮迭代贡献了大部分收益。马虎的修复过程（$r$ 接近 1）会让改进陷入停滞，无论评估做得多好。而因为*每*一轮都漏掉的问题（对它们 $q$ 很小）永远发现不了，用同样的方法、同样类型的参与者迭代是边际收益递减的——要不时更换方法或更换参与者。

::: example 需要几轮？ {#ex-rounds}
每轮测试大约发现残留问题的一半，而大约每五次修复就引入一个新问题。按 [[#prop-iteration]]，要把问题的期望数降到初始数的 10% 以下，需要几轮？
::: solution
取 $q = 0.5$、$r = 0.2$，每轮的因子是 $1 - 0.5 \times 0.8 = 0.6$。需要 $0.6^k \le 0.1$，故 $k \ge \ln 0.1 / \ln 0.6 \approx 4.51$：五轮（$0.6^4 \approx 0.130$，$0.6^5 \approx 0.078$）。若修复完美（$r = 0$），因子是 $0.5$，四轮即可（$0.5^4 = 0.0625$）。五轮小型纸面原型测试花的时间可能少于对成品的一次大型测试——这正是原型的经济学论据。
:::
:::

## 原型实践

截至 2026 年，大多数界面原型是在协作式、浏览器里的设计工具中完成的，它们从共享的组件库生成可点击的高保真模型，而生成式工具可以把草图或文字描述变成屏幕草稿。这些改变的是保真度的成本，不是原则。唾手可得的高保真诱使团队跳过发散的草图、直接打磨第一个点子；工具生成的设计与手绘的设计一样需要拿用户来测试；一套标准组件的库——一个组织的**设计系统**（design system）——能让原型默认保持一致且无障碍，前提是组件本身经过测试（[[hci/accessibility-ethics]]）。对任何设计问题的第一个小时，纸和白板仍是最快的工具。

::: history
作为界面设计中一种自觉方法的原型，始于 1970 年代末 1980 年代初，当时施乐 PARC 的研究者为 Alto 与 Star 构建并测试了许多界面原型。John Kelley 的绿野仙踪方法（1984）、奥运语音消息系统（1984 年使用，1987 年报告），以及 Apple 的 HyperCard（1987）——它让设计师不写程序就能做可点击原型——使原型化变得切实可行。Marc Rettig 的 "Prototyping for tiny fingers"（1994）让纸面原型流行开来，"低保真对高保真"之争则由 Jim Rudd、Ken Stern 与 Scott Isensee 在 *Interactions*（1996）中作了总结。Stephanie Houde 与 Charles Hill 的 "What do prototypes prototype?" 收入 *Handbook of Human–Computer Interaction*（1997），Carolyn Snyder 的 *Paper Prototyping* 出版于 2003 年，Bill Buxton 的 *Sketching User Experiences* 出版于 2007 年。
:::

## 后续内容

原型生来就是要被评估的：[[hci/usability-evaluation]] 讲述如何在其中发现问题——靠专家、也靠用户——以及这需要多少用户；与 [[#prop-iteration]] 相同的几何曲线在那里以尼尔森–兰道尔模型出现。构建原型所用的交互技术是 [[hci/interaction-techniques]] 的主题，其视觉设计是 [[hci/visual-design]] 的主题。流程的一面——原型化在敏捷开发中的位置、一次性与演化型原型之争——在 [[software-engineering/software-process]]。

::: summary
- **原型**（[[#def-prototype]]）的存在是为了回答问题——关于角色、外观与感受、或实现（Houde 与 Hill）。选能回答你的问题的最低保真度。
- **横向**、**纵向**与 **T 型**原型（[[#def-scope]]）以广度换深度；低保真能发现多数结构性问题，并引人批评。
- 在精炼一个设计之前先**草图**许多备选；显式的**设计空间**与并行原型化有帮助（Tohidi 等 2006；Dow 等 2010）。
- **纸面原型**需要引导者、一台"计算机"与观察者；它们迭代快，但表现不了时序与运动。
- **绿野仙踪**研究（[[#def-woz]]）模拟还不存在的能力；巫师必须遵守计划中系统的局限，且事后必须向参与者解释。
- 可点击原型是一台**状态机**（[[#def-nav-model]]）：广度优先搜索能找出不可达的屏幕、死路、困局与最少动作数（[[#prop-nav-check]]）。
- 在简单假设下，迭代使设计几何级数地改进（[[#prop-iteration]]），并会因修复引入新问题而边际递减、陷入停滞。
:::

## 习题

::: exercise 设计空间的大小 {level=1 check="48"}
一个智能手表闹钟的设计空间有四个维度：提醒类型（震动、声音、两者皆可）、贪睡手势（拍击、摇晃）、关闭手势（滑动、按钮、表冠按压、语音）与显示（只显示时间、时间与下一个日程）。它包含多少个设计？（输入数字。）
::: solution
$3 \times 2 \times 4 \times 2 = 48$。
:::
:::

::: exercise 选择原型
为回答下列问题，各会选择哪种原型（草图、纸面、绿野仙踪、高保真交互、还是能跑的代码），为什么？(a) 人们能看懂一个新银行应用的菜单结构吗？(b) 当汽车的语音导航指示稍晚到达时，人们会信任它吗？(c) 服务器能在 200 毫秒内返回搜索结果吗？(d) 仪表盘的五个布局思路里，我们应该推进哪一个？
::: solution
(a) 纸面或一个简单的可点击横向原型：要的是结构与措辞，不需要视觉打磨。(b) 驾驶模拟器里的绿野仙踪，或者在真车上配一名安全员：时序要紧，而那项能力难以构建，所以由巫师按受控的延迟触发指示。(c) 能跑的代码：一个实现问题，只有在代表性硬件与数据上的真实软件才能回答。(d) 草图：用于发散又便宜又快，而其粗糙能引来诚实的批评。
:::
:::

::: exercise 迭代的轮数 {level=1 check="5"}
在 [[#prop-iteration]] 中取 $q = 0.4$、$r = 0.25$，问题的期望数降到最初 20% 以下所需的最少迭代次数是多少？（输入迭代次数。）
::: solution
每轮的因子是 $1 - 0.4 \times 0.75 = 0.7$。需要 $0.7^k < 0.2$，即 $k > \ln 0.2 / \ln 0.7 \approx 4.51$，故 $k = 5$。验证：$0.7^4 \approx 0.240$ 还没降到 0.2 以下，$0.7^5 \approx 0.168$ 达到了。
:::
:::

::: exercise 寻找困局 {level=2 check="1"}
在[[#ex-nav-check]]的原型上，不删去任何链接、至少添加几条链接，才能使每个屏幕从 Home 可达且模型可恢复（[[#def-nav-model]]）？给出这样一组，并评价它是否是好设计。（输入链接数。）
::: solution
**一条**链接就够：`Done > Help`。Help 变为可达（Home → Basket → Payment → Done → Help），而 Help 本就链接到 Home；Done 现在可以经由 Help 回家，Payment 经由 Done，Address 经由 Payment，History 经由 Basket，其余屏幕本就有回家的路。至少需要一条，因为 Done 没有出边。所以最少是 1。

这是个糟糕透顶的设计：每笔订单都会结束在帮助页上。合理的修改是添加 `Done > Home`（或到订单跟踪的链接）、从 Home 加一个 Help 链接、从 Payment 加一条回 Basket 的"返回"——最后一条对可恢复性并非必需，但对付款前改单这一*任务*是必需的。模型检查能发现缺陷；它不替你做设计。
:::
:::

::: exercise 巫师规程
为一个语音接口研究写一份一页纸的巫师规程，该接口让人们控制家用供暖系统（"把卧室调暖一点"）。写明巫师能理解什么、如何引入错误、响应时序，以及事后解释。
::: solution
一份好的规程应包括：**词表**——巫师只接受点名配置列表内房间（或"这里"，依据设备所在位置）并带一个方向或目标（"暖一点"、"21 度"、"关掉到 6 点"）的命令，其余一律视为听不懂；**响应**——一份固定脚本（"正在把卧室设为 21 度"、"抱歉，哪个房间？"、"这个我还做不到"），用文本转语音朗读，绝不即兴发挥；**错误**——按预先生成的随机时间表，约每十条命令就有一条被"听成"另一个房间，以观察恢复过程；**时序**——巫师按一个键触发每条响应，由软件加上延迟，使响应在语音结束后约 1 秒到达，与巫师的手速无关；**日志**——每句话与每次响应连同时间戳记录；**事后解释**——结束时引导者说明是人在控制响应、为什么必须如此，回答问题，并提供撤回录音的选择（[[#def-woz]]）。
:::
:::

::: exercise 作为代价的最短路
在 [[#ex-nav-check]] 的导航模型中，团队提议从 Home 直接到 Basket 加一条"快速复购"链接，预装上一次订单。利用 BFS 的输出，哪项任务变短了，短几个动作？这个度量漏掉了什么？
::: solution
复购原先走 `account > order history > reorder`（三个动作到达一个装着东西的 Basket），然后 `checkout > pay`：共五个动作。有了新链接是 `quick reorder > checkout > pay`：三个动作，少了两个。但路径长度数的是屏幕，不是付出：它不顾*找到*链接的时间（一个拥挤的 Home 可能拖慢所有别的任务）、阅读与决策时间、输入时间，以及错误——它把点一个又大又近的按钮和点一个又小又远的按钮一视同仁（[[hci/human-factors]]）。[[hci/interaction-techniques]] 的击键级模型能给出更好的估计，而与用户一起的测试最好。
:::
:::

::: exercise 反向搜索
为 [[#ex-nav-check]] 的原型字典实现 [[#prop-nav-check]] 的那一次反向广度优先搜索，返回"可达但无法回到起始状态"的状态集合，并检验它与示例中的程序一致。证明它的运行时间是 $O(\lvert V\rvert + \lvert E\rvert)$。
::: solution
```python
from collections import deque

def unrecoverable(graph, start):
    """Reachable states with no path back to start, via one forward and one reverse BFS."""
    def bfs(adj, s):
        seen, queue = {s}, deque([s])
        while queue:
            u = queue.popleft()
            for v in adj.get(u, ()):
                if v not in seen:
                    seen.add(v)
                    queue.append(v)
        return seen
    forward = {u: set(targets.values()) for u, targets in graph.items()}
    reverse = {u: set() for u in graph}
    for u, vs in forward.items():
        for v in vs:
            reverse[v].add(u)
    return bfs(forward, start) - bfs(reverse, start)

proto = {
    "Home": {"search": "Results", "basket": "Basket", "account": "Account"},
    "Results": {"open item": "Item", "back": "Home"},
    "Item": {"add to basket": "Basket", "back": "Results"},
    "Basket": {"checkout": "Payment", "back": "Home"},
    "Payment": {"pay": "Done", "edit address": "Address"},
    "Address": {"save": "Payment"}, "Done": {},
    "Account": {"order history": "History", "back": "Home"},
    "History": {"reorder": "Basket"}, "Help": {"back": "Home"},
}
print(sorted(unrecoverable(proto, "Home")))
```

```console
$ python3 recover.py
['Address', 'Done', 'Payment']
```

结果与示例一致。运行时间：构造 `forward` 与 `reverse` 各访问每个顶点与边一次，$O(\lvert V\rvert + \lvert E\rvert)$。每次 BFS 把每个顶点至多加入 `seen` 与队列一次，而在移出顶点时扫描其邻接集合一次，所以每次搜索的总工作量是 $O(\lvert V\rvert + \lvert E\rvert)$（集合操作均摊期望常数时间）。集合差是 $O(\lvert V\rvert)$。正确性就是 [[#prop-nav-check]]：正向搜索找到可达状态，反向搜索找到能到达 `start` 的状态。
:::
:::

::: exercise 迭代停滞之时
把 [[#prop-iteration]] 推广到两类问题：比例 $\alpha$ 是"容易"的（每轮以概率 $q_1$ 被发现），其余是"困难"的（概率 $q_2 < q_1$），修复完美（$r = 0$）。推导 $k$ 轮后残留的期望比例，证明 $k$ 大时残留的问题几乎全是困难问题，并计算 $\alpha = 0.7$、$q_1 = 0.6$、$q_2 = 0.1$ 时 5 轮后的残留比例。这对评估实践意味着什么？
::: solution
每一类独立衰减：残留的期望比例是

$$
F_k = \alpha(1 - q_1)^k + (1 - \alpha)(1 - q_2)^k.
$$

残留中困难问题所占的比例是 $(1-\alpha)(1-q_2)^k / F_k = 1 / \bigl(1 + \tfrac{\alpha}{1-\alpha}\bigl(\tfrac{1-q_1}{1-q_2}\bigr)^k\bigr)$，而由于 $(1-q_1)/(1-q_2) < 1$，幂趋于 0，所以该比例趋于 1。代入所给数字，$F_5 = 0.7 \times 0.4^5 + 0.3 \times 0.9^5 = 0.7 \times 0.01024 + 0.3 \times 0.59049 \approx 0.00717 + 0.17715 = 0.184$：约 18% 的问题残留，其中 96% 是困难问题。与用相同平均检测率 $\bar q = 0.7 \times 0.6 + 0.3 \times 0.1 = 0.45$ 的单一类模型相比——它预测 $0.55^5 \approx 0.050$——混合模型留下的问题几乎是它的四倍。对相似的参与者重复同样的方法，只会不断发现容易问题的替身，很少触及困难问题；要改变方法（现场研究、专家评审、无障碍测试、不同用户群体、更长的任务）来提高 $q_2$。同样的异质性效应也在瓦解 [[hci/usability-evaluation]] 中的尼尔森–兰道尔模型。
:::
:::
