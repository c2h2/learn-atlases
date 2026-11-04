张敏在用英语写她的第一份研究报告的引言，写到一个短语时停住了：应该是 *I made research on online learning* 还是 *I did research on online learning*？她问了两个同学，得到两个不同的答案。她把两个短语都输入搜索引擎，两个都有很多结果。她的词典给出 *research* = 研究，对动词只字未提。她面对的是学习者最古老的问题：当你自己对什么听起来对的感觉还不可靠时，该相信谁？

现代语言学的回答是：相信许多说话人和写作者实际怎么做的证据，这些证据收集在**语料库**里。从20世纪90年代起，每一部主要的学习型词典都是根据语料库证据编写的，而且现在有好几个大型语料库可以通过网页浏览器免费检索。本章说明什么是语料库，怎样解读它提供的证据——索引行、频率和搭配词表，关联度指标 MI 值、t 值和 logDice 是什么意思，以及怎样运用这一切在几分钟内检验一个短语。本章还说明语料库**不能**告诉你什么。（顺便说一下，张敏问题的答案是 *I did research*，或者更正式一些，*I carried out* / *conducted research*；我们会看到怎样查出这一点。）

## 什么是语料库

::: definition 语料库 {#def-corpus}
**语料库**（corpus，复数 *corpora*）是大量真实语篇——书面的、口头的或两者兼有——的集合，以电子形式储存，按照一定的设计挑选，使它能代表一种语言或这种语言的一个变体（英式英语、美式英语、学术写作、会话）。借助软件，使用者可以在语料库中检索词和短语，统计它们的数量，并在语境中查看它们。
:::

“设计”是语料库区别于一堆随意的语篇的地方。一个好的通用语料库按已知的比例收录许多不同种类的语篇，所以它的结果可以描述（“在语料库的口语部分中，……”），也可以比较。一些著名的英语语料库：

| 语料库 | 规模 | 内容 |
|---|---|---|
| 布朗语料库（Brown Corpus，弗朗西斯和库切拉（Francis and Kučera），1964年建成） | 约一百万词 | 1961年印刷出版的美式英语，选自15类语篇的500个样本；第一个此类电子语料库 |
| 英国国家语料库（BNC，1994年建成） | 约一亿词 | 英式英语，主要来自20世纪80年代和90年代初；约90%为书面语，10%为口语，包括录制的会话 |
| 当代美国英语语料库（COCA，戴维斯（Mark Davies），2008年首次发布） | 现行版本约十亿词 | 1990年以来的美式英语，分为口语（电视和广播）、小说、杂志、报纸和学术写作等部分 |
| 学习者语料库，如国际学习者英语语料库（ICLE）和中国学习者英语语料库（CLEC） | 从约一百万词到几百万词 | 学习者的作文，供研究者研究学习者语言 |

语料库是**用法**的证据，而不是正确性的证据。它显示的是具有特定背景的人在特定场合写作或说话时实际产出的东西。这正是想说得自然的学习者所需要的，但解读时必须小心，本章其余部分会说明这一点。

::: warning 搜索引擎的结果数不是语料库证据
把两个短语输入搜索引擎，比较“约2,000,000条结果”这样的数字，很诱人，但不可靠。这些数字是粗略的估计，而不是统计；网络上有未经编辑的文字、机器翻译和大量非母语者的写作（包括中式英语），所以结果很多的短语仍然可能不自然；而且搜索引擎不会告诉你是谁写的、用的是什么语域。至多，在给短语加上引号的情况下，相差几个数量级（几千对几百万）的差异算是一个提示，值得到真正的语料库或词典中去核实。
:::

## 索引

::: definition 索引 {#def-concordance}
**索引**（concordance）是一个词或短语在语料库中每一次出现的清单，每一次出现都带着两边的若干词作为语境。在通常的格式 **KWIC**（key word in context，“语境中的关键词”）中，检索词排列在屏幕的正中，这样它左右两边的模式就能一目了然。
:::

下面是名词 *research* 的十条索引行。它们是为本课仿照索引的样式编写的，并非取自语料库，但能显示真实索引的样子。

| 左侧语境 | 节点词 | 右侧语境 |
|---|---|---|
| *… the team has carried out extensive* | ***research*** | *into the causes of …* |
| *… more than half of the funding for* | ***research*** | *in this area comes …* |
| *… she is currently doing* | ***research*** | *on bilingual children …* |
| *… previous* | ***research*** | *has shown that …* |
| *… we conducted* | ***research*** | *with forty teachers …* |
| *… according to recent* | ***research*** | *by the university …* |
| *… a great deal of* | ***research*** | *has been done on …* |
| *… further* | ***research*** | *is needed to …* |
| *… students who did their own* | ***research*** | *before the interview …* |
| *… the findings of this* | ***research*** | *suggest that …* |

顺着左边往下读，可以得到动词（*carry out*、*do*、*conduct*）和形容词（*extensive*、*previous*、*recent*、*further*）；顺着右边往下读，可以得到介词（*into*、*in*、*on*、*with*、*by*）以及后面常接的动词（*has shown*、*is needed*、*suggest*）。注意**没有**出现的东西：没有 *make research*，也没有 *researches*——在大多数语境中 *research* 是不可数的。大多数语料库界面允许你按左边或右边第一个或第二个词给索引行**排序**，这样模式就聚到了一起：按 *research* 前面的词排序，所有 *carried out* 的行就出现在同一块里。

::: theorem 读索引行要看模式，不看单个例子 {#rule-patterns}
只有当索引显示出一个在来自不同语篇的许多行中反复出现的**模式**时，它才是证据。单个例子只能证明有人曾经这样写过。使用索引时：

1. 看足够多的行——对一个常用词至少看二三十行，排好序，让模式显现出来。
2. 记下节点词左右每个位置上反复出现的词。
3. 核实反复出现的行来自**不同的语篇和作者**，而不是同一份文件的重复。
4. 注意每一行中的**意义**：同一个形式可能有不同的义项，搭配词也不同。
:::

::: proof
语料库的价值在于它显示什么是典型的，而典型性是一个重复的问题。辛克莱（Sinclair，1991）认为，英语的意义单位只有在把许多次出现放在一起看时才会显现出来：读一个语篇的人只看到一次 *research*，读索引的人却看到 *carry out* + *research* + *into* 这个模式被几十个素不相识的作者反复使用。第3步和第4步防止两种最常见的误读。一个出现了五十次的短语可能出自同一位作者的一本书；又如 *issue*，在“问题”的意义上与 *raise* 和 *address* 搭配，在“（杂志的）一期”的意义上则与 *publish* 和 *latest* 搭配。
:::

::: example Make research 还是 do research？ {#ex-research}
张敏在语料库中检索 *make research*、*made research*、*do research*、*did research* 和 *doing research* 这几个短语，然后检索后面接 *research* 的任何动词。她应该看什么？她会发现什么？
::: solution
1. **比较各种说法。** 在英式或美式英语的通用语料库中，*do research* 的各种形式很容易找到，而 *make research* 的形式很少，或者根本没有。（试一试：在任何大型语料库中，差别都很显著。）
2. **看那些确实含有 *make* + *research* 的行。** 它们通常根本不是这个搭配：*make research easier*、*make research more relevant*——这是 *make* + 宾语 + 形容词，*research* 是另一种结构中的宾语。
3. **更广泛地检索动词 + *research*。** 索引显示主要的动词是 *do*、*carry out* 和 *conduct*，其中 *carry out* 和 *conduct* 是较正式的写作和学术写作中的典型用法。其他常见组合有 *research shows* / *suggests*、*research into* / *on* 某个话题，以及 *a piece of research*（因为 *research* 不可数）。
4. **用词典确认。** 学习型词典的 *research* 词条在例句或搭配框中列出 *do* / *carry out* / *conduct research*。

结论：*I did research on online learning* 是正确的；在研究报告中，*I conducted*（或 *carried out*）*research on online learning* 更符合语域。*Make research* 正是内塞尔豪夫（Nesselhauf，2005）等人所描述的那种组合：母语中用一个动词同时表示 make 和 do（就像“做”）的学习者的典型错误。
:::
:::

::: quiz
在 *issue* 的索引中，前面带动词 *raise* 的行大多显示“需要讨论的问题或话题”这个意义。这说明了什么？
- [ ] *raise* 只能与 *issue* 连用。
- [x] *raise an issue* 是 *issue* 在“问题”意义上的搭配。
- [ ] *issue* 总是表示“问题”。
- [ ] 语料库里有错误。
::: solution
搭配词是与义项相连的。*issue* 表示话题或问题时，*raise* 与它组合（也与 *question*、*concern*、*point* 组合）；在另一个义项（杂志的一期）中，*issue* 与 *latest*、*back*（*a back issue*“过刊”）和 *publish* 搭配。两个词都不局限于对方。
:::
:::

## 频率

语料库工具对每次检索都给出一个数字。这个数字只有在与别的东西比较时才有用。

::: definition 原始频率和标准化频率 {#def-normalised}
一个词或短语的**原始频率**（raw frequency）是它在语料库中出现的次数。由于语料库（以及语料库的各个部分）大小不同，原始频率要换算成**标准化频率**（normalised frequency），通常是**每百万词**的频率：

$$
\text{每百万词频率} = \frac{\text{原始频率}}{\text{语料库总词数}} \times 1\,000\,000.
$$
:::

::: example 比较两个语料库 {#ex-normalise}
一个学习者在一亿词的英式英语语料库中查到一个短语出现了240次，在十亿词的美式英语语料库中出现了1,800次。（这些数字是为这个例子编的。）这个短语在英式英语还是美式英语中更常见？
::: solution
把两者都换算成每百万词的频率：

- 英式：240 ÷ 100,000,000 × 1,000,000 = **每百万词2.4次**。
- 美式：1,800 ÷ 1,000,000,000 × 1,000,000 = **每百万词1.8次**。

虽然美式语料库中的原始数字高出七倍半，这个短语在英式语料库中相对**更**常见。即便如此，差别也很小：在断定这个短语是“英式的”之前，学习者应该检查两个语料库是否收录了相似种类的语篇（会话较多的语料库会含有较多的会话短语），以及这些行是否来自许多不同的来源。
:::
:::

同一个语料库的各个部分之间，频率也不相同，语料库正是这样揭示**语域**的。比伯等（Biber et al.，1999）在整部语法书中比较了四种语域——会话、小说、新闻和学术文章，并发现，例如，短语动词在小说和会话中最常见，在学术文章中最少见，而以 *-tion* 和 *-ity* 构成的名词在学术文章中远比在会话中常见。大多数语料库界面会自动显示这样的分布：一张显示这个词在每个部分中出现频率的图表。在学术部分常见、在口语部分罕见的词，是写论文用的词，而不是和室友闲聊用的词（[[collocation-and-register/register]]）。

## 搭配词和关联度指标

除了检索一个短语，还可以让语料库工具列出一个词的**搭配词**：所有在它附近出现得比预期更频繁的词。这是回答“哪个形容词与 *rain* 连用？”这个问题的最快方法，不必先去猜答案。

::: definition 跨距和期望频率 {#def-span}
**跨距**（span，或称窗口）是在节点词左右检索搭配词的词数，例如每边四个词。一个搭配词的**观察频率** O 是它在跨距内出现的次数。**期望频率** E 是假如词语随机分布，它在那里会出现的次数：

$$
E = \frac{f(\text{节点词}) \times f(\text{搭配词})}{N} \times (\text{跨距内的位置数}),
$$

其中 $f$ 是每个词在语料库中的频率，N 是语料库的大小。
:::

把 O 与 E 相比，就能看出一对词离偶然有多远。不同的工具把这种比较转化成不同的**关联度指标**（association scores），而最常用的三种指标给搭配词排出的顺序差别惊人。

::: definition MI 值、t 值和 logDice {#def-scores}
- **互信息**（mutual information，丘奇和汉克斯（Church and Hanks），1990）在对数尺度上比较观察频率和期望频率：$\text{MI} = \log_2 (O / E)$。MI 值为3，表示这对词的出现次数是偶然情况的八倍。
- **t 值**（t-score，丘奇等，1991）衡量我们有多大把握认为这对词不是偶然共现：$t \approx (O - E) / \sqrt{O}$。
- **logDice**（雷赫利（Rychlý），2008）只用这对词以及两个词各自的频率：$\text{logDice} = 14 + \log_2 \dfrac{2\,O}{f(\text{节点词}) + f(\text{搭配词})}$，最大值为14，不受语料库大小的影响。
:::

::: theorem 每种指标偏向什么 {#rule-scores}
- **MI 值**偏向**排他性**强的词对：除了在一起之外很少在别处出现的词，即使这对词本身很少见（*torrential rain*、*shrug* + *shoulders*、专业术语、名称）。
- **t 值**偏向**高频**的词对：经常一起出现的常用词，包括语法词（*the rain*、*rain in*、*heavy rain*）。
- **logDice** 在两者之间取得平衡，是某些工具（Sketch Engine 及其面向学习者的免费界面 SkELL）的默认指标。

对学习者来说，按 t 值排序的词表显示最值得先学的搭配；按 MI 值排序的词表显示专门的、生动的搭配。常被引用的经验法则（例如亨斯顿（Hunston，2002））把 MI ≥ 3 和 t ≥ 2 视为真实关联的标志。
:::

::: proof
公式解释了这些表现。MI 值取决于**比值** O/E：搭配词很少见时，E 非常小，所以即使只共现三四次，比值也非常大。这就是为什么 MI 词表中满是罕见的、非常专门的词——也有一些怪东西，比如碰巧在节点词旁边出现了两次的印刷错误。t 值大致随 $\sqrt{O}$ 增长，所以无论比值如何，除非这对词出现得频繁，它就不可能变大；因此它奖励常见的组合，而且往往把语法词排在前面。logDice 用 O 除以两个频率之和，所以与一个非常高频的伙伴（如 *the*）组成的词对得分低，而两个中等频率、彼此相伴的词组成的词对得分高。这些阈值是惯例，而不是定律，也不适用于 logDice；亨斯顿（2002）和其他教科书把它们当作阅读词表的指引，而不是检验是否合乎语法的标准。
:::

::: widget plot
f: log2(x*1000000/(200*c)); (x - 200*c/1000000)/sqrt(x)
x: 1, 40
y: -1, 14
sliders: c=2000:5:40000:5
labels: MI; t-score
hlines: 3; 2
title: MI 值和 t 值怎样随搭配词的频率变化
caption: 一个虚构的一百万词语料库，一个出现200次的节点词，以及一个在语料库中出现 *c* 次的搭配词；横轴是两者相邻出现的次数（O，一个位置，所以 E = 200*c* ÷ 1,000,000）。拖动滑块。搭配词**罕见**时（*c* 小），即使只共现两三次，MI 值也很高，而 t 值要等到这对词出现得频繁时才会升高。搭配词**非常常见**时（*c* 大，就像 *the*），MI 值降向零，但 t 值仍然随 O 升高。虚线标出经验阈值 MI = 3 和 t = 2。
:::

::: example 一个词的两张词表 {#ex-two-lists}
一个学习者让语料库工具列出 *rain* 的形容词搭配词，得到两张词表，一张按 t 值排序，一张按 MI 值排序。（下面的词表是为这个例子编的，但显示了典型的模式。）

| 按 t 值排序 | 按 MI 值排序 |
|---|---|
| *heavy* | *torrential* |
| *light* | *driving* |
| *the*（见注） | *incessant* |
| *acid* | *freezing* |
| *torrential* | *steady* |
| *steady* | *acid* |

注：有些工具会过滤掉 *the* 这样的语法词；这个工具没有。

解释两者的区别，并说明学习者应该先学哪些词。
::: solution
- **t 值**词表以 *heavy* 和 *light* 开头：这是经常与 *rain* 一起出现的高频形容词。词表中还有 *the*，一个语法词，它的 t 值高只是因为它太常见了。
- **MI 值**词表以 *torrential*、*driving*（“下得很猛并被风吹着的”）和 *incessant* 开头：这些词出现的频率低得多，但一旦出现，往往是与 *rain*（或另外几个表示天气的词）一起出现。它们生动而准确，但比较专门。
- *Acid rain*（酸雨）是一个复合术语，在两张词表上得分都高。

学习者应该先学 t 值词表最上面的词（*heavy rain*、*light rain*），因为这些是最常需要的组合；然后从 MI 值词表中挑选有用的词（*torrential rain*、*steady rain*），用于更丰富的描写。MI 值词表顶端那些不寻常的词，使用之前应该在索引中核实：它们可能来自单独一个语篇。
:::
:::

::: quiz
*commit* 的搭配词表按 MI 值排序时，把一个罕见的法律术语排在最前面，在 *crime* 和 *suicide* 之上。为什么？
- [ ] 因为这个法律术语是 *commit* 最常见的搭配词。
- [x] 因为 MI 值偏向排他性强的词对：一个几乎总是与 *commit* 一起出现的罕见词会得到非常高的分值。
- [ ] 因为语料库有错。
- [ ] 因为 MI 值总是把名词排在前面。
::: solution
MI 值比较观察频率和期望频率。一个罕见词出现在 *commit* 旁边的期望频率非常小，所以即使只共现几次，比值也很高。这使得 MI 值善于找出专门的搭配，却不善于告诉你哪些搭配最常见；要知道这一点，应该按 t 值或原始频率排序。
:::
:::

## 一步一步检验一个短语

::: theorem 检验一个词语组合 {#rule-check}
要检验一个组合是否自然，以及它属于哪种语域和变体：

1. **检索确切的短语及其替代说法**，包括不同的形式（*make*/*made*/*making a decision*），如果工具提供词元检索，也可以用词元检索。
2. **比较标准化频率**，而不是原始数字；要看大的差别，而不是小的差别。
3. **阅读索引行**：这个短语是否用于你要表达的意义，是否由许多不同的作者使用，是否用于你想要的语法结构？
4. **查看在各部分（口语、小说、新闻、学术）中的分布**，以判断语域。
5. 如果变体有关系，**比较英式和美式语料库**（或同一语料库中的不同变体部分）。
6. **在学习型词典或搭配词典中确认**，这些词典总结了语料库证据，并加上了标签（*formal*、*BrE*）。
:::

::: example At the weekend 还是 on the weekend？ {#ex-weekend}
周怡见过 *at the weekend*，也见过 *on the weekend*。她怎样才能弄清楚其中一个是否是错的？
::: solution
1. 在一个英式语料库（BNC）和一个美式语料库（COCA）中检索这两个短语，把数字换算成每百万词的频率。
2. 结果的方向很清楚：*at the weekend* 在英式语料库中常见得多，*on the weekend* 在美式语料库中常见得多。（*over the weekend* 在两者中都常见，*on weekends* 是美式英语的典型说法。）
3. 索引行显示两者的意义相同（“在周末期间”），由许多不同的作者使用。
4. 学习型词典确认了这一点：*weekend* 词条把 *at the weekend* 标为英式，把 *on the weekend* 标为美式（或美式和澳大利亚英语）。

结论：两者都没有错。它们属于不同的变体，周怡应该选定一个，在一个语篇中一贯地使用。BNC 主要是由20世纪80年代和90年代初的语篇编成的；更新的英式英语数据才能显示，*on the weekend* 自那以后在英式英语中是否变得更常见了，就像一些观察者所报告的那样。这提醒我们，在对当前用法下结论之前，要先查看语料库的年代。
:::
:::

### 学习者可以使用的工具

以下工具截至2026年可以免费使用；名称、网址和使用条件会变化，所以请搜索最新版本。

- **English-Corpora.org**（戴维斯）通过一个界面提供 COCA、BNC 和其他语料库的检索，免费注册，每天有使用限额。它提供各部分的频率、搭配词表以及语料库之间的比较。
- **BNCweb**（兰卡斯特大学）是 BNC 的另一个界面，提供关于说话人和语篇的详细信息。
- **SkELL**（Sketch Engine for Language Learning）是为学习者设计的免费简化工具：它显示例句、按每种语法关系列出搭配词的“词汇素描”（word sketch，以这个词为宾语的动词、修饰它的形容词等等），以及相似的词。
- **Google Books Ngram Viewer** 显示一个短语在书籍中的频率怎样随时间变化。它对研究历史和比较不同说法很有用，但它的语篇只有书籍，有扫描错误，而且除非你点击链接，它不显示语境。
- 在线的**学习型词典**（剑桥、朗文、牛津、柯林斯 COBUILD、韦氏学习词典）本身就是语料库证据的总结，其中几部显示取自其语料库的搭配和例句；[[core-vocabulary/using-a-dictionary]] 介绍怎样阅读一个词条。

搭配词典——例如《牛津英语搭配词典（学生版）》（*Oxford Collocations Dictionary for Students of English*）——是写作时最方便的资料：它为每个名词列出与之连用的动词和形容词，并按意义分组。它不像语料库那样给出频率，也不那么清楚地显示语域，所以两者相辅相成。

::: note 英汉对比
中国学习者可能已经知道一些汉语语料库，例如北京语言大学的 BCC 语料库或北京大学的 CCL 语料库，它们的原理是一样的。学汉语时养成的两个习惯需要注意。第一，流行的在线词典所显示的“双语例句”常常是从网上自动收集的；有些来自好的译文，有些来自机器翻译或中式英语，所以它们显示的是可能的英语，而不一定是自然的英语。要查看一个例句的出处，优先采用学习型词典中的句子，或用英语写成的语篇所组成的语料库中的句子。第二，用汉语检索告诉你的是“研究”，而不是 *research*：你需要的是英语基词的搭配，所以要从英语名词开始检索，让语料库告诉你它的动词。
:::

## 语料库不能告诉你什么

::: theorem 语料库证据的局限 {#rule-limits}
1. **没有出现不等于证明。** 一个在语料库中没有出现的短语，可能只是罕见、新出现或专门化的；语料库越大，没有出现才越有意义。
2. **出现了不等于认可。** 一个出现了的短语可能是错误、玩笑、对错误的引用或地区性用法；要看是谁在用、用得多频繁。
3. **语料库反映它的语篇。** 它的年代、变体和语域构成限制了它能说明的东西：一个20世纪90年代英式英语的语料库，对人们今天怎样互发短信几乎说明不了什么。
4. **频率不等于合适。** 一个常见的会话短语用在论文中可能是错的，而一个罕见的专业搭配用在报告中可能恰到好处。
:::

::: proof
每一点都源自语料库的本质：它是按一定设计挑选出来的有限样本。样本可能漏掉罕见的现象，可能包含偶然的东西，也可能反映建库者的选择。因此语料库语言学家讨论**代表性**（representativeness，比伯（Biber），1993）：一个语料库在多大程度上代表了它声称涵盖的语篇范围。对学习者来说，实际的规则是：把语料库证据与词典和教师的判断结合起来使用，把强烈的、反复出现的模式当作可靠的，把单个的例子当作轶事。
:::

::: quiz
一个学习者在一亿词的语料库中两次查到一个短语，两次都出自同一部小说。最合理的结论是什么？
- [ ] 这个短语是标准英语。
- [ ] 这个短语是错的。
- [x] 几乎没有证据表明这个短语被普遍使用；使用之前要查其他资料。
- [ ] 这个短语是英式的。
::: solution
出自同一个语篇的两次出现说明不了多少问题：作者可能是自己创造了这个短语，或者是为了某种效果而使用它。这并不证明这个短语是错的——没有出现和几乎没有出现都不是证明——但学习者应该优先使用那些有来自许多语篇的、清楚而反复的证据的组合。
:::
:::

::: history
第一个供一般使用的英语计算机语料库——布朗语料库——由弗朗西斯（W. Nelson Francis）和库切拉（Henry Kučera）在布朗大学编成，于1964年完成；与之对应的英式英语语料库——兰卡斯特–奥斯陆/卑尔根语料库（LOB）——在20世纪70年代问世。夸克（Randolph Quirk）1959年在伦敦大学学院开始的英语用法调查（Survey of English Usage），在计算机化之前用纸条收集口语和书面英语。在伯明翰，辛克莱（John Sinclair）的团队为《柯林斯 COBUILD 英语词典》（*Collins COBUILD English Language Dictionary*，1987）建立了一个大得多的语料库。一亿词的英国国家语料库于1994年建成，而戴维斯的网页界面，包括 COCA（2008），使任何有浏览器的人都能检索超大型语料库。ICLE（20世纪90年代以来）和 CLEC（2003）等学习者语料库把同样的方法用于学习者语言。
:::

## 延伸阅读

语料库证据是本课程其余部分的基础：[[collocation-and-register/verb-noun-adjective-noun]] 中常用动词和形容词的搭配，[[collocation-and-register/phrasal-verbs-register]] 中短语动词在各语域中的分布，以及 [[collocation-and-register/false-friends-chinglish]] 中对译文的检验。作为一个领域的语料库语言学——语料库怎样建立和标注，它们给语法和词典带来了哪些改变——是 [[linguistics/corpus-linguistics]] 的主题。词表背后的词汇频率统计在 [[core-vocabulary/frequency-and-coverage]] 中讨论。

::: summary
- **语料库**是大量经过设计的、可以检索的真实语篇的集合；它是用法的证据，而不是一份规则清单。
- **索引**在语境中显示一个词的每一次出现（KWIC）；要阅读许多排好序的行，寻找在不同语篇中**反复出现的模式**。
- 比较**标准化频率**（每百万词），而不是原始数字，并利用各部分的分布来判断**语域**和变体。
- 搭配词表按关联度指标给伙伴排序：**MI 值**偏向排他性强、往往罕见的词对；**t 值**偏向高频的词对；**logDice** 在两者之间取得平衡。
- 检验一个组合的方法是：检索它及其替代说法，比较频率，阅读索引行，查看各部分和各变体，并在词典中确认。
- 搜索引擎的结果数和自动收集的双语例句是薄弱的证据。
- 没有出现不等于证明，出现了不等于认可：语料库反映的是它的语篇、它的年代和它的变体。
:::

## 习题

::: exercise 阅读索引 {level=1}
看本章中 *research* 的十条索引行。列出 (a) *research* 前面的动词，(b) 它前面的形容词，(c) 它后面的介词。
::: solution
(a) *carried out*、*doing*、*conducted*、*did*（还有被动语态的 *has been done*）。(b) *extensive*、*previous*、*recent*、*further*（还有 *their own*）。(c) *into*、*in*、*on*、*with*、*by*。
:::
:::

::: exercise 每百万词 {level=1 check="3.5"}
一个词在一亿词的语料库中出现了350次。它每百万词的频率是多少？
::: solution
350 ÷ 100,000,000 × 1,000,000 = 每百万词 **3.5** 次。
:::
:::

::: exercise 用哪种指标？ {level=1}
要找出 (a) 与 *coffee* 连用的最常见的形容词，(b) 与 *coffee* 连用的不寻常的、专门的形容词，你会按哪种关联度指标排序？
::: solution
(a) t 值（或原始频率），它偏向高频的词对：*strong*、*black*、*hot* …… (b) MI 值，它偏向排他性强的词对，包括较罕见的词；使用之前要在索引中核实。
:::
:::

::: exercise 解读结果 {level=2}
一个学习者在一个大型的经过编辑的英语语料库中检索 *discuss about* 和 *discuss* + 名词。*Discuss about* 非常罕见；*discuss the problem*、*discuss the issue* 和 *discuss the matter* 很常见。在少数含有 *discuss about* 的行中，*about* 属于后面的短语（*to discuss about ten proposals*）。学习者应该得出什么结论？
::: solution
*discuss* 是及物动词：它带直接宾语（*discuss the problem*），而不说 ✗ *discuss about the problem*。少数含有 *discuss about* 的行不是反证，因为那里的 *about* 意思是“大约”，属于 *about ten proposals*——这正是阅读索引才能揭示的那种误导性的行。（名词要带 *about*：*a discussion about the problem*。汉语的“讨论”也不需要介词，所以这个错误通常是受了 *talk about* 的影响。）
:::
:::

::: exercise 设计一次检验 {level=2}
你想写 *The government should take measures to protect old buildings.* 你不确定 *take measures* 是否自然，也不确定用 *adopt measures* 或 *make measures* 会不会更好。一步一步地说明你会怎样检验，并说明什么样的证据能说服你。
::: solution
1. 在一个大型语料库中检索 *take measures*、*adopt measures*、*make measures*（动词的所有形式）；换算成每百万词的频率。
2. 阅读索引行：意义是否是“采取行动处理问题”？它们是否来自许多作者？
3. 查看各部分：这些短语应该在新闻、学术或公文写作中最常见。
4. 让工具列出 *measures* 的动词搭配词，以看到全部的动词（*take*、*introduce*、*implement*、*adopt*）。
5. 在搭配词典中确认。

令人信服的证据：*take measures*（和 *adopt measures*）有来自许多来源的许多行，意义正确，而且词典列出了它们。典型的结果是：*take measures* 和 *introduce* / *adopt* / *implement measures* 在正式写作中都很自然，而 *make measures* 不用于这个意义。
:::
:::

::: exercise 英式还是美式？ {level=2}
说明你会怎样查明下列词对在英式英语和美式英语之间是否有差别；如果你知道结果，说出你预期的结果：(1) *fill in a form* / *fill out a form*；(2) *have a shower* / *take a shower*。
::: solution
两者的方法相同：在一个英式语料库和一个美式语料库中检索每个短语（动词的所有形式），标准化，阅读索引行，并在带有变体标签的学习型词典中确认。

预期的结果：(1) *fill in a form* 是通常的英式说法；*fill out a form* 是通常的美式说法，在英式英语中也用。(2) *have a shower* 是典型的英式说法，*take a shower* 是典型的美式说法，不过两者到处都能听懂。要在当前的语料库中核实这些结果：变体之间相互影响，较老的语料库可能显示不出最新的用法。
:::
:::

::: exercise 研究一个词 {level=3}
从你自己的学科中选一个名词（例如 *data*、*hypothesis*、*policy*、*patient*）。使用免费的语料库工具，找出 (a) 它最常见的五个动词搭配词，(b) 它最常见的五个形容词搭配词，(c) 它的典型介词，以及 (d) 它在语料库的哪个部分最常见。写一篇简短的报告（100–150词）说明你的发现，每一部分附上一个你自己写的例句，并说明你用的是哪种关联度指标或排序方式。
::: hint
在 SkELL 中，“词汇素描”按语法关系显示搭配词；在 English-Corpora.org 中，使用带词性过滤的搭配词检索，或者这个词自己的页面。
:::
::: solution
答案各不相同。以 *hypothesis* 为例的范文：

> *I searched for* hypothesis *in an academic section of a large corpus and sorted collocates by frequency. The most frequent verbs were* test, support, confirm, reject *and* propose *(*The data support the hypothesis*). The adjectives were* null, alternative, main, working *and* initial *(*Our working hypothesis was that age would matter*). The typical prepositions were* about *and* that-*clauses (*the hypothesis that …*) (*There is a hypothesis about the origin of the disease*). The word was much more frequent in the academic section than in the spoken or fiction sections, which shows that it belongs to formal, academic register.*

检查：每一个说法都要说明所用的工具和排序方式，每个例句都要完全按照查到的样子使用搭配。
:::
:::

::: exercise 评价证据 {level=3}
一个同学说：“*Learn knowledge* 是正确的英语。我在网上搜了一下，找到了十万多条结果。”写一段回复（80–120词），解释为什么这是薄弱的证据，以及更好的证据会显示什么。
::: solution
范文：

> *A web hit count is an estimate, not a count, and the web contains a lot of text written by learners and by machine translation — including exactly the phrases learners are unsure about. It also tells us nothing about who wrote the text. Better evidence would come from a corpus of edited English: there,* learn knowledge *is very rare, while* gain *or* acquire knowledge *and simply* learn a lot *are frequent. A learner's dictionary confirms this: its entry for* knowledge *lists verbs like* gain, acquire *and* have, *not* learn. *So the phrase is understandable, but not the natural choice.*

要点：结果数是估计值；网络不是受控的样本；要在语料库中比较各种说法；要在词典中确认。
:::
:::
