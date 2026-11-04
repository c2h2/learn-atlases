*Every student in the class read a book over the holiday.* 他们读的是同一本书，还是每人读了不同的一本？这个句子两种理解都允许，尽管第二种可能性更大。再比较 *A book was read by every student in the class*：在这里，许多读者首先理解为人人都读过的某一本特定的书。词的意义相同，语法也相近，然而意义的划分却不一样。再看两个都为真的句子：*The morning star is the morning star* 和 *The morning star is the evening star.* 两个名称指的是同一个对象，即金星，所以这两个句子对世界所说的是同一件事。但第一个句子没有告诉你任何东西，而第二个句子记录了古代天文学家的一项发现。

这样的难题表明，意义不只是一张词所指向的事物的清单，而且句子的意义以精确的方式取决于它的词和它的结构。**语义学**（semantics）就是研究这种意义的：词的意义（词汇语义学）和句子的意义（组合语义学或形式语义学）。本章介绍涵义和指称的区分，词义之间的关系，范畴是怎样组织的，以及作为真值条件的句子意义，还有形式语义学研究得最细致的逻辑词和量化词。本章最后讨论一个古老的问题：你所说的语言是否塑造你的思维方式。语境中的意义——含义、预设、言语行为——是 [[linguistics/pragmatics-discourse]] 和《语用与礼貌》（*Pragmatics*）课程的主题。

## 涵义和指称

::: definition 涵义和指称 {#def-sense-reference}
一个表达式的**指称**（reference）是它在某一次使用中所挑出的世界上的事物：*the morning star* 和 *the evening star* 都指称金星。它的**涵义**（sense）是它呈现那个事物的方式——说话人借以识别所指对象的概念或呈现方式：“日出前看到的那颗亮星”与“日落后看到的那颗亮星”。两个表达式可以指称相同而涵义不同。这一区分是德国哲学家、逻辑学家弗雷格（Gottlob Frege）提出的（《论涵义和指称》［*Über Sinn und Bedeutung*］，1892）。
:::

涵义解释了为什么 *The morning star is the evening star* 是有信息量的：两个涵义不同，而它们挑出的是同一颗行星，这是一个关于世界而不是关于语言的事实。涵义还解释了词怎样在没有所指对象的情况下也有意义：*the present king of France* 有涵义——你知道你要找的是什么——尽管今天没有任何东西与之对应。它还解释了我们怎样能在没有遇到所指对象的情况下学会一个词的意义：很少有读者见过穿山甲（*pangolin*），但一段描述就能给出它的涵义。

还有两个相关的术语，它们用于词，而不是用于特定场合中的表达式。一个词的**概念意义**（denotation，外延）是它可以用来指的整个一类事物——*dog* 的概念意义是所有的狗——而它的**内涵意义**（connotation）是它在此之外所带有的联想：*cur* 和 *mutt* 都指狗，并带有轻蔑或喜爱的内涵意义。内涵意义主要是用法和语域的问题，见 [[collocation-and-register/connotation]]。

## 词义之间的关系

词的涵义不是孤立的。它们部分地由与其他涵义的关系来界定，知道这些关系的学习者就知道了一个词的大部分意义。

::: definition 涵义关系 {#def-sense-relations}
- **同义关系**（synonymy）：两个词的涵义相同或几乎相同：*begin* 和 *start*，*sofa* 和 *couch*。在每一个语境中都能互换的完全同义词非常罕见；大多数同义词在语域、搭配或内涵意义上有差别（*start a car*，但不说 ✗ *begin a car*）。
- **反义关系**（antonymy）：涵义相反的词（三种，见下文）。
- **上下义关系**（hyponymy）：意义的包含。*Tulip* 是 *flower* 的**下义词**（hyponym），*flower* 是 *tulip* 的**上义词**（hypernym，或 superordinate）；*tulip*、*rose* 和 *daisy* 是**并列下义词**（co-hyponyms）。凡是郁金香都是花，反之则不然。
- **部分–整体关系**（meronymy）：部分与整体的关系。*Wheel* 是 *car* 的部分词（meronym），*page* 是 *book* 的部分词，*finger* 是 *hand* 的部分词。
- **一词多义**（polysemy）：一个词有几个相关的涵义：人的 *mouth* 和河的 *mouth*（河口）；身体的 *head* 和部门的 *head*（负责人）。
- **同形同音异义**（homonymy）：两个不同的词碰巧形式相同：*bank*“河岸”和 *bank*“银行”；*bat*“球棒”和 *bat*“蝙蝠”。它们在词典中作为不同的词条列出。
:::

::: theorem 三种相反 {#rule-antonyms}
1. **等级反义词**（gradable antonyms）表示一个有中间地带的标尺的两端：*hot*–*cold*，*long*–*short*，*happy*–*sad*。它们可以带程度词（*very hot*、*hotter*）；否定一方并不意味着肯定另一方（*not hot* 不一定是 *cold*）；其中一方常常是**无标记的**（unmarked），在问句中作中性使用（*How long is it?* 并不暗示它长，而 *How short is it?* 则暗示它短）。
2. **互补反义词**（complementary antonyms）把一个领域一分为二，没有中间地带：*alive*–*dead*，*pass*–*fail*，*true*–*false*。否定一方就是肯定另一方：*not alive* 意思是 *dead*。它们与程度词连用会显得别扭，尽管说话人有时为了效果这样用（*very dead*）。
3. **关系反义词**（converses）从两个方面描述同一种关系：*buy*–*sell*，*parent*–*child*，*above*–*below*，*lend*–*borrow*。*A sold the car to B* 恰好在 *B bought the car from A* 为真时为真。
:::

::: proof
这三种反义词源于不同的逻辑结构。等级反义词是一个相对于某一标准的标尺上的点（*a long pencil* 比 *a short road* 短），所以它们留下了一个中间区域，并且有比较级。互补反义词是对一个集合的划分：领域中的每样东西不在这一半就在那一半。关系反义词是同一种关系，只是论元的顺序相反。这些区分是由莱昂斯（John Lyons，《语义学》［*Semantics*］，1977）和克鲁斯（D. A. Cruse，《词汇语义学》［*Lexical Semantics*］，1986）以现代形式提出的。这些测试对学习者很有用，因为不同的语言对同一个语义场的划分不同：普通话的“借”既包括 *lend* 也包括 *borrow*，方向由结构表示（“借给”*‘lend to’*，“向……借”*‘borrow from’*），所以英语中这对关系反义词是常见的错误来源（✗ *Can you borrow me your pen?*）。
:::

::: quiz
*Is the water hot?* — *No, but it isn't cold either.* 这段对话说明了 *hot* 和 *cold* 的什么？
- [ ] 它们是互补反义词。
- [x] 它们是等级反义词：否定一方并不意味着肯定另一方。
- [ ] 它们是关系反义词。
- [ ] 它们是同义词。
::: solution
等级反义词留有中间地带（*warm*、*lukewarm*），所以 *not hot* 并不意味着 *cold*。对于 *alive*–*dead* 这样的互补反义词，回答 *No, but it isn't dead either* 就是自相矛盾的。
:::
:::

::: widget graph
title: 一棵小小的上下义关系树
nodes: animal@0,6; bird@-4,4; mammal@0,4; fish@4,4; robin@-6,2; sparrow@-4,2; penguin@-2,2; dog@-1,2; whale@1,2; salmon@4,2; wing (part of bird)@-4,0
edges: animal>bird; animal>mammal; animal>fish; bird>robin; bird>sparrow; bird>penguin; mammal>dog; mammal>whale; fish>salmon; bird>wing (part of bird)
caption: 箭头从上义词指向它的下义词，另外加了一个部分词（*wing*）作对比：翅膀是鸟的一部分，而不是一种鸟。这棵树遵循生物学分类，在这里生物学分类与日常英语是一致的——但并非处处如此：在日常言语中，许多人不会把 *whale* 叫作鱼，但在历史上 *fish* 一词的用法更宽，而 *shellfish* 和 *starfish* 在生物学上都不是鱼。拖动节点，加上你自己的分支。
:::

::: example 识别涵义关系 {#ex-relations}
说出每一对词之间的关系，并给出你所用的测试。

1. *rent*（作为租户）– *let*（作为房主，英式英语）
2. *even* – *odd*（指数字）
3. *cheap* – *expensive*
4. *keyboard* – *laptop*
5. *ear*（身体的）– *ear*（玉米的）
6. *ear*（身体的）– *ear*“欣赏音乐的能力”（*an ear for music*）
::: solution
1. **关系反义词**：*A lets the flat to B* 恰好在 *B rents the flat from A* 为真时为真。（*Rent* 也可以从房主的角度使用，*A rents the flat to B*，所以英语使这对词的界限变得模糊。）
2. **互补反义词**：每个整数非此即彼；*not even* = *odd*；✗ *very even*。
3. **等级反义词**：*very cheap*、*cheaper*；*not cheap* 与 *expensive* 不同。
4. **部分–整体关系**：键盘是笔记本电脑的一部分，而不是一种笔记本电脑。
5. **同形同音异义**：两个词来源不同（古英语 *ēare* 和 *ēar*），没有相关的涵义。
6. **一词多义**：音乐方面的涵义是听觉器官的隐喻延伸，在词典中列在同一个词目之下。
:::
:::

## 范畴和原型

要成为一只 *bird*（鸟）需要什么条件？一种可以追溯到亚里士多德的经典回答是用充分必要条件来下定义：鸟是有羽毛、有翅膀、有喙、会下蛋的动物。20世纪60年代流行的**成分分析**（componential analysis）就是用语义特征这样来表述词义的：*man* = [+HUMAN, +ADULT, +MALE]，*girl* = [+HUMAN, −ADULT, −MALE]。特征对于显示一个语义场内部的对比很有用，但它们遇到两个问题。许多范畴没有清楚的边界（*cup* 到哪里为止，*bowl* 从哪里开始？），而且一个范畴的成员并不是同样好的成员。

::: definition 原型 {#def-prototype}
**原型**（prototype）是一个范畴中最好、最典型的例子，或者是最典型的成员所共有的一组特征。成员资格是分等级的：其他成员按照它们与原型的相似程度来判断。在罗施（Eleanor Rosch）20世纪70年代的实验中（例如 Rosch 1975），美国学生把 *robin*（知更鸟）和 *sparrow*（麻雀）评为 *bird* 的非常好的例子，把 *chicken* 评为较差的例子，把 *penguin* 和 *ostrich* 评为很差的例子；而且他们回答 *Is a robin a bird?* 这类问题比回答 *Is a penguin a bird?* 更快。
:::

拉波夫（1973）直接显示了这种模糊的边界：他给人们看一些容器的图画，这些容器的宽度和深度逐渐变化，有的有把手，有的没有，然后请他们给这些容器命名。*cup*、*mug*、*bowl* 和 *vase* 这些名称是逐渐转换的，而且这种转换取决于语境——当说同一个物体里装着土豆泥时，它更常被叫作 *bowl*。原型理论并没有完全取代定义。企鹅完全是鸟，而不是部分是鸟：生物学范畴有定义，而典型性是关于人们怎样看待这个范畴的事实。两种知识是并存的。

::: quiz
按照原型理论，为什么人们回答 *Is a robin a bird?* 比回答 *Is a penguin a bird?* 更快？
- [ ] 因为企鹅其实不是鸟
- [x] 因为知更鸟更接近 *bird* 这一范畴的原型
- [ ] 因为 *robin* 是一个较短的词
- [ ] 因为企鹅生活在很远的地方
::: solution
在人们的心智中，范畴成员资格是分等级的：与原型有较多共同特征的成员（小、会飞、会唱、栖息在树上）被确认得更快，并被评为更好的例子。从生物学上说，企鹅仍然完全是鸟；典型性涉及的是范畴怎样被表征，而不是谁属于这个范畴。
:::
:::

::: note 英汉对比
普通话的**量词**（classifiers）是一个内置于语法中的分类系统。名词被计数或与指示词连用时，数词和名词之间必须有一个量词（[[linguistics/phrases-constituents]]）：一**本**书，三**张**纸，两**条**鱼，一**只**猫。正如李讷和汤普森（1981）所描述的，许多量词按形状和其他特性给名词分组：“条”用于长的、常常是柔软的东西（鱼、河、路、裤子，还有狗，狗也可以用“只”）；“张”用于平面（纸、桌子、床、脸、票）；“本”用于装订成册的书本；“只”用于许多动物以及成对东西中的一个（一只手，一只鞋）；“位”是用于人的礼貌量词。通用量词“个”在口语中可以代替许多其他量词，学习者和幼儿都大量使用它。这个系统部分是语义的，部分是约定俗成的——想到床的平面，就明白为什么“床”用“张”，但为什么“狗”可以用“条”就不那么清楚了——这正是在英语范畴中也能看到的原型与约定的混合。

英语可数名词没有量词，但不可数名词需要**度量词**（measure words）：*a piece of advice*、*a loaf of bread*、*a sheet of paper*、*a cup of tea*、*an item of news*。说普通话的学习者的困难不在于度量词这个概念，而在于可数和不可数之间的界线，英语对这条界线的划分部分是任意的（*advice* 和 *information* 是不可数的；*suggestion* 和 *fact* 是可数的）——见 [[nouns-and-articles/countable-uncountable]]。
:::

## 句子意义和真值

一个知道一种语言的词义及其组合规则的说话人，能够理解以前从未遇到过的句子。解释这一点的原则一般认为是弗雷格提出的。

::: definition 组合性和真值条件 {#def-truth-conditions}
**组合性原则**（principle of compositionality）认为，一个复杂表达式的意义由其组成部分的意义以及它们的组合方式决定。按照最有影响的一种解释，知道一个陈述句的意义就是知道它的**真值条件**（truth conditions）：世界必须是什么样子它才为真。*Snow is white* 为真，当且仅当雪是白的——看起来平淡无奇，但要点在于右边是对世界的一个条件，左边是一个句子。这一研究路径来自逻辑学家塔尔斯基（Alfred Tarski）对真的定义（1933），并由戴维森（Donald Davidson）和蒙塔古（Richard Montague）在20世纪60年代末和70年代初应用于自然语言。
:::

真值条件使我们能够精确地定义句子之间的关系，这些关系与词之间的涵义关系相平行。

::: theorem 蕴涵、矛盾和同义 {#rule-entailment}
1. 如果每当句子 A 为真时句子 B 也必然为真，A 就**蕴涵**（entails）B。*Mia killed the spider* 蕴涵 *The spider died*；*Kim is a tulip grower* 蕴涵 *Kim is a flower grower*（因为 *tulip* 是 *flower* 的下义词）。
2. 如果 A 和 B 不能同时为真，A 就与 B **矛盾**（contradicts）：*The door is open* 和 *The door is shut*（互补反义词）。
3. 如果 A 和 B 互相蕴涵，它们就是**同义句**（paraphrases，同义的）：*Sam sold Lin the car* 和 *Lin bought the car from Sam*。
4. **蕴涵的测试：** 否认一个蕴涵必然导致矛盾。✗ *Mia killed the spider, but it didn't die* 是自相矛盾的，所以蕴涵成立。比较含义，含义是可以取消的：✓ *Some of the students passed — in fact all of them did*（[[pragmatics/meaning-beyond-words#rule-cancel]]）。
:::

::: proof
这些定义只使用了真这个概念，这使它们可以检验：要证明 A 不蕴涵 B，只需描述一个 A 为真而 B 为假的情境。第4部分的测试直接由此得出：如果 A 蕴涵 B，那么“A 而且非 B”描述的就不是任何可能的情境，所以它是一个矛盾。这些定义解释了，例如，为什么上下义关系在肯定句中产生蕴涵——种郁金香的人的集合在种花的人的集合之内——以及为什么在否定之下方向会反转：*Kim isn't a flower grower* 蕴涵 *Kim isn't a tulip grower*，而不是反过来。这种反转是下文量化词理论的基础。
:::

::: example 是不是蕴涵？ {#ex-entailment}
对每一对句子，A 蕴涵 B 吗？用测试或反例为你的答案提供理由。

1. A：*Wang Fang managed to finish the report.* B：*Wang Fang finished the report.*
2. A：*Wang Fang tried to finish the report.* B：*Wang Fang finished the report.*
3. A：*Some of the guests left early.* B：*Not all of the guests left early.*
4. A：*Every guest brought a gift.* B：*Some guest brought a gift.*
::: solution
1. **是。** ✗ *She managed to finish the report, but she didn't finish it* 是一个矛盾。（*Manage* 还暗示这件事很困难——这是另一层意义，不是同一种蕴涵。）
2. **否。** ✓ *She tried to finish the report, but she didn't finish it* 是连贯的。*Try* 暗示失败或不确定，但两者都不蕴涵。
3. **否。** ✓ *Some of the guests left early — in fact all of them did* 是连贯的，所以 B 是一个含义，而不是蕴涵（[[linguistics/pragmatics-discourse]]）。
4. **是，前提是有客人。** 如果根本没有客人，逻辑学家把 *Every guest brought a gift* 算作（空洞地）为真，而 *Some guest brought a gift* 为假。在日常使用中，说话人想当然地认为有客人，所以在语境中蕴涵成立。*every* 的这种“存在含义”（existential import）是逻辑和日常语言之间一个众所周知的差别。
:::
:::

## 逻辑词

*and*、*or*、*not* 和 *if* 这几个词至少部分地对应于命题逻辑的联结词：∧（和）、∨（或）、¬（非）和 →（如果……那么）。真值表列出一个组合在其组成部分的每一种真值组合下的真值。

::: widget truthtable
title: *Unless*
formula: ~q -> p
compare: p | q
caption: 设 *p* 为“比赛照常进行”，*q* 为“下雨”。*The match will go ahead unless it rains* 的真值条件核心意义是“如果不下雨，比赛就照常进行”（¬q → p）。比较显示，这等值于“比赛照常进行**或者**下雨”（p ∨ q）。看两者都为真的那一行——下雨了，比赛还是照常进行：这个公式把这句话算作真，然而许多听话人觉得 *unless* 暗示如果下雨比赛就**不**会进行。这层额外的意义通常被分析为一种含义（“条件完美化”［conditional perfection］），而不是真值条件的一部分。输入 *(~q -> p) & (q -> ~p)* 可以看到较强的那种理解。
:::

英语与逻辑之间的对应很接近，但并不完全，而这些差别很有启发性：

- 逻辑中的 *And* 是对称的：*p ∧ q* = *q ∧ p*。在英语中，*She got married and had a baby* 讲的故事与 *She had a baby and got married* 不同。事件的顺序通常被解释为语用的，遵循格赖斯的方式准则（“要有条理”），而不是 *and* 意义的一部分。
- 逻辑中的 *Or* 是相容的（两部分都为真时也为真）。英语的 *or* 常常被理解为不相容的（*tea or coffee?*），这通常也是从语用上解释的（[[pragmatics/meaning-beyond-words]] 有这两种 *or* 的真值表）。
- 逻辑中的 *If … then*（实质蕴涵）在 *p* 为假时总是为真：*If the moon is made of cheese, then 2 + 2 = 4* 的结果是真。英语的条件句不是这样——大多数说话人会说这个句子别扭或者是假的——条件句的语义是这门学科中争论最多的领域之一（条件句的语法见 [[complex-sentences/conditionals]]）。

::: quiz
哪一个英语句子与 *If it doesn't rain, we'll eat outside* 具有相同的真值条件？
- [ ] *We'll eat outside if it rains.*
- [x] *We'll eat outside unless it rains.*
- [ ] *We won't eat outside unless it rains.*
- [ ] *It will rain and we'll eat outside.*
::: solution
*P unless Q* 的核心意义是“如果非 Q，那么 P”，所以 *We'll eat outside unless it rains* = *If it doesn't rain, we'll eat outside*。第一个选项把条件颠倒了；第三个选项加了一个否定；第四个选项断言两个事件都发生。
:::
:::

## 量化词

*all*、*every*、*some*、*no*、*most* 和 *few* 这样的词是**量化词**（quantifiers）。它们不能被分析为指称事物：*no student* 并不指称一个奇怪的、不在场的学生。现代语义学把量化词看作两个集合之间的关系。

::: theorem 作为集合之间关系的量化词 {#rule-quantifiers}
在 *Q A are B*（*All students passed*，*Some students passed*）中，设 A 为名词所指的集合（学生），B 为谓语所指的集合（通过的人）。那么：

| 量化词 | 为真，如果…… | 用集合表示 |
|---|---|---|
| *all* / *every* A are B | 每个 A 都是 B | A − B 为空 |
| *some* A are B | 至少有一个 A 是 B | A ∩ B 不为空 |
| *no* A are B | 没有 A 是 B | A ∩ B 为空 |
| *most* A are B | 是 B 的 A 多于不是 B 的 A | A ∩ B 大于 A − B |

这就是**广义量词**（generalised quantifiers）理论，由巴怀斯和库珀（Jon Barwise and Robin Cooper，1981）应用于自然语言。它解释了为什么 *most* 不能在普通的一阶逻辑中用 *all* 和 *some* 来定义：它比较的是两个集合的大小。
:::

::: widget venn
title: *All students passed*
sets: 2
labels: student; passed
expr: student - passed
caption: 左边的圆是学生（student）的集合，右边的圆是通过（passed）的人的集合。阴影区域是**没有**通过的学生。*All students passed* 恰好在这个区域为空时为真；*Not all students passed* 在这个区域至少有一个成员时为真。输入 *student & passed*，把 *Some students passed* 为真时必须不为空、*No students passed* 为真时必须为空的那个区域画上阴影。
:::

集合的观点还解释了一个微妙的模式。在 *Some students drink coffee* 中，你可以用一个更概括的谓语替换原来的谓语而保持真值：它蕴涵 *Some students drink something hot*。允许这样做的量化词在其谓语上是**向上蕴涵的**（upward entailing）。*No* 把方向反转了：*No students drink anything hot* 蕴涵 *No students drink coffee*。它是**向下蕴涵的**（downward entailing）。拉杜索（William Ladusaw，1979）观察到，**否定极性词**（negative polarity items）——*any*、*ever*、*at all*、*yet*、*lift a finger*——出现在向下蕴涵的语境中：✓ *No student has ever complained*，✗ *Some student has ever complained*；✓ *I doubt she'll lift a finger*，✗ *I'm sure she'll lift a finger*。学习者常常以“否定句和疑问句中用 *any*”的形式遇到的那条语法规则，实际上是这一语义特性的结果。

::: definition 辖域 {#def-scope}
当一个句子包含两个算子——量化词、否定、情态词——时，其中一个可能在另一个的内部得到解释。在外部得到解释的那个具有**宽辖域**（wide scope）。*Every student read a book* 有两种理解：*every* 取宽辖域（“对每个学生来说，都有某本书是他读过的”——可能是不同的书）；*a book* 取宽辖域（“有一本书是每个学生都读过的”）。*All the students didn't pass* 可以表示“没有人通过”（*all* 取宽辖域）或“不是所有人都通过了”（*not* 取宽辖域）；在口语中，常常由语调来决定。
:::

::: example 解读辖域 {#ex-scope}
用释义的方式给出每个句子的几种理解，并说明哪一种可能性更大。

1. *Everyone in the office speaks two languages.*
2. *A doctor examined every patient.*
3. *Everything that glitters is not gold.*
::: solution
1. （a）*everyone* 取宽辖域：每个人都说两种语言，可能是不同的语言——这是自然的理解。（b）*two languages* 取宽辖域：有两种特定的语言是每个人都说的。理解（b）需要语境（*… namely English and Cantonese*）。
2. （a）*a doctor* 取宽辖域：一位医生检查了所有的病人。（b）*every* 取宽辖域：每个病人都由一位医生检查过，可能是不同的医生。说话人的判断各不相同；表层语序有利于（a），但关于医院的知识有利于（b）。
3. （a）*everything* 取宽辖域：凡是发光的东西都不是金子——这是假的，也不是这句谚语的意思。（b）*not* 取宽辖域：并非所有发光的东西都是金子——这才是要表达的意思。这句谚语（莎士比亚写的是 *All that glisters is not gold*）表明，否定可以对它前面的量化词取宽辖域。

黄正德（1982）观察到，含有两个量化词的普通话句子往往只有与表层语序相符的那种理解：“有一个医生检查了每个病人”通常理解为一位医生。这是一条严格的规则还是一种强烈的倾向，此后一直有讨论。
:::
:::

::: warning 肯定句中的 *any*
由于 *any* 属于向下蕴涵的语境，✗ *I have any questions* 和 ✗ *Some of them have any money* 不合语法。✓ *I don't have any questions*；✓ *Do you have any questions?*；✓ *Few of them have any money*（*few* 是向下蕴涵的）。但 *any* 在肯定句中还有另一种重读的“任选”用法：✓ *Any student can apply*“每个学生，不论是哪一个”。那是另一个意义，与 *whichever* 相关，而不是极性词。
:::

## 语言与思维

说不同语言的人是否因为所说的语言而有不同的思维方式？这一观念与萨丕尔（Edward Sapir）及其学生沃尔夫（Benjamin Lee Whorf）联系在一起，他们在20世纪三四十年代写道，一种语言的范畴——例如沃尔夫所描述的霍皮语语法对待时间的方式——塑造了其说话人感知世界的方式。这一假说的**强式**，即**语言决定论**（linguistic determinism），认为语言决定思维，所以说不出来的东西就无法思考。它的**弱式**，即**语言相对论**（linguistic relativity），认为语言影响某些种类的思维。

::: theorem 证据表明了什么 {#rule-relativity}
1. 强式得不到支持。人们能够思考他们的语言没有命名的区别，语言之间的翻译是可能的，而沃尔夫关于霍皮语时间的说法受到了马洛特基（Ekkehart Malotki）《霍皮时间》（*Hopi Time*，1983）的挑战，该书详细记录了霍皮语的时间词汇。
2. 在特定领域、特定条件下发现了弱式的效应。俄语有两个表示蓝色的基本词，*goluboy*（浅蓝）和 *siniy*（深蓝）；维纳维尔及其同事（Winawer and colleagues，2007）发现，当两种蓝色落在这一界限的两侧时，说俄语的人区分它们更快，而当参与者必须同时完成一项语言任务时，这种优势就消失了——说英语的人没有表现出这种效应。
3. 在**空间**推理方面，使用绝对方向（东南西北）而不是 *left* 和 *right* 的语言（如澳大利亚的古古伊米德希尔语［Guugu Yimithirr］）的说话人，倾向于用绝对方向来解决非语言的空间任务（Levinson，《语言与认知中的空间》［*Space in Language and Cognition*］，2003）；对这些结果的解释仍有争论。
4. 几项著名的发现**没有得到重复**。博罗迪茨基（Lera Boroditsky，2001）报告说，说普通话的人以垂直方式思考时间（上个月，字面意思是“上面的那个月”）；后来的研究，包括 Chen（2007）以及 January and Kako（2007），都没能重现这一结果，这一效应仍有争议。
5. 已经发现的效应通常是在特定任务中对注意力、记忆和速度的效应，往往在任务中使用语言时最强——而不是对人们能够感知或思考什么的效应。
:::

::: example 检验一个关于汉语的说法 {#ex-counterfactual}
布卢姆（Alfred Bloom）在《思维的语言塑造》（*The Linguistic Shaping of Thought*，1981）中论证说，由于汉语没有表示反事实条件句的特殊语法形式（像英语的 *If he had come, she would have been pleased* 那样），说汉语的人觉得反事实推理比较难。你会怎样评价这一说法？它后来怎样了？
::: solution
1. **检查语言学前提。** 普通话没有虚拟语气或过去完成时形式，但有许多方式把一个条件标记为与事实相反：“要是……就……”、“如果……的话”、“要不是”、“早知道”，以及语境。所以“没有反事实标记”这一前提说得太过了：差别在于语法化的形式，而不在于是否能表达这种意义。
2. **检查实验。** 布卢姆给中国和美国的参与者一个包含反事实推理的故事，发现得出反事实结论的中国参与者较少。区洁芳（Terry Kit-fong Au，1983）用翻译得更好的故事重复了这项研究，发现说汉语的人表现得和说英语的人一样好；她认为原来的汉语版本不地道。刘（Lisa Liu，1985）得出了类似的结论。
3. **结论。** 这一说法的强式没有得到支持。这个案例是一个经典的教训：关于语言与思维的假说必须把一种语言的语法与其说话人的表达资源区分开来，并且必须确保实验材料在两种语言中同样自然。
:::
:::

::: history
语义学作为语言学的一个分支是年轻的。*sémantique*（语义学）一词是法国语言学家布雷亚尔（Michel Bréal）在1883年的一篇文章和1897年的一本书中提出的，主要讨论词义怎样变化。弗雷格关于涵义和指称的研究（1892）和塔尔斯基关于真的研究（1933）属于逻辑学和哲学，而布龙菲尔德等美国结构主义者认为意义太难，无法进行科学研究。20世纪60年代，卡茨和福多（Jerrold Katz and Jerry Fodor）提出把语义特征作为生成语法的一部分；1970年前后，蒙塔古在《作为一种形式语言的英语》（“English as a formal language”）等论文中表明，可以像对逻辑语言那样为英语的一个片段提供精确的组合语义。形式语义学就是从这项工作发展起来的；与此同时，罗施关于原型的研究、莱科夫（George Lakoff）的《女人、火与危险事物》（*Women, Fire, and Dangerous Things*，1987）——书名来自狄克逊（R. M. W. Dixon）所描写的澳大利亚迪尔巴尔语（Dyirbal）的一个名词类——以及兰盖克（Ronald Langacker）的研究开创了**认知语义学**（cognitive semantics），它把意义作为概念化来研究。词典中的词汇语义学借助语料库获得了新的基础（[[linguistics/corpus-linguistics]]）。
:::

## 后续内容

语境中的意义——含义、预设、指示语和会话的结构——见 [[linguistics/pragmatics-discourse]]。词义的实用方面见《搭配与语域》（*Collocation and Register*）课程，尤其是 [[collocation-and-register/connotation]] 和 [[collocation-and-register/false-friends-chinglish]]；论证中的逻辑词见 [[complex-sentences/adverbial-clauses]] 和 [[sentences-and-paragraphs/coordination]]。可数性和冠词的意义见 [[nouns-and-articles/countable-uncountable]] 和 [[nouns-and-articles/a-and-the]]。

::: summary
- **指称**是一个表达式所挑出的东西；**涵义**是它呈现这个东西的方式（Frege 1892）：*the morning star* 和 *the evening star*。
- 词的涵义之间有**同义关系**、**反义关系**（等级、互补、关系）、**上下义关系**、**部分–整体关系**；**一词多义**是一个词有几个相关的涵义，**同形同音异义**是两个词共用一个形式。
- 范畴有**原型**和模糊的边界（罗施、拉波夫）；普通话的量词是一个语法上的分类系统，部分是语义的，部分是约定俗成的。
- 句子意义是**组合的**；知道句子意义就是知道它的**真值条件**。**蕴涵**不能取消；含义可以取消。
- *And*、*or*、*not*、*if* 和 *unless* 只是部分地对应于逻辑联结词；差别常常是语用的。
- **量化词**是集合之间的关系；**向下蕴涵**的语境允准 *any* 和 *ever*；含有两个算子的句子可能有**辖域歧义**。
- 关于**语言与思维**，强式的萨丕尔–沃尔夫假说得不到支持；一些弱的、特定于任务的效应得到了支持，而几项著名的说法（包括普通话的垂直时间和汉语的反事实推理）没有得到重复。
:::

## 习题

::: exercise 相反的种类 {level=1}
把每一对词归为等级反义词、互补反义词或关系反义词：*wide*–*narrow*、*teacher*–*student*、*present*–*absent*、*above*–*below*、*young*–*old*、*win*–*lose*（比赛）。
::: solution
*wide*–*narrow*：等级反义词。*teacher*–*student*：关系反义词（“教”这一关系的两方）。*present*–*absent*：互补反义词。*above*–*below*：关系反义词。*young*–*old*：等级反义词（*old* 是无标记的一方：*How old is she?*）。*win*–*lose*：对没有平局的比赛来说是互补反义词，不过许多运动允许平局，这使这对词在实际上近似于等级反义词。
:::
:::

::: exercise 下义词还是部分词？ {level=1}
对每一对词，说明第一个词是第二个词的下义词还是部分词：*spoon*–*cutlery*、*chapter*–*book*、*oak*–*tree*、*branch*–*tree*、*violin*–*orchestra*、*violin*–*instrument*。
::: solution
*spoon*：*cutlery* 的下义词。*chapter*：*book* 的部分词。*oak*：*tree* 的下义词。*branch*：*tree* 的部分词。*violin*–*orchestra*：部分词（整体中的一员）。*violin*–*instrument*：下义词。
:::
:::

::: exercise 一词多义还是同形同音异义？ {level=1}
说明每一对是一词多义还是同形同音异义：*foot*（人的 / 山的）；*bark*（狗的 / 树的）；*bright*（光亮的 / 聪明的）；*match*（点火用的 / 一场足球比赛）。
::: solution
*foot*：一词多义（通过隐喻表示最低的部分）。*bark*：同形同音异义（来源不同）。*bright*：一词多义（从光到智力的隐喻，就像普通话的“聪明”，其中含有“明”）。*match*：同形同音异义（来源不同）。
:::
:::

::: exercise 蕴涵 {level=2}
A 蕴涵 B 吗？回答是或否，并说明理由。

1. A：*Lin regretted leaving.* B：*Lin left.*
2. A：*Lin left.* B：*Lin regretted leaving.*
3. A：*No student failed the exam.* B：*No student failed the written part of the exam.*
4. A：*Lin owns a dog.* B：*Lin owns an animal.*
::: solution
1. 是（✗ *Lin regretted leaving, but she didn't leave*）。这种关系也是一种预设，因为它在否定之下依然存在（*Lin didn't regret leaving* 仍然意味着她离开了）——见 [[linguistics/pragmatics-discourse]]。
2. 否。
3. 是：*no* 是向下蕴涵的，而笔试部分不及格是一个更具体的情况。（假定笔试部分不及格就算考试不及格；如果一个人可以某部分不及格而总分及格，答案就取决于 *failed the exam* 是什么意思——这是一个说明蕴涵取决于精确涵义的好例子。）
4. 是，这是向上蕴涵语境中的上下义关系。
:::
:::

::: exercise 量化词的维恩图 {level=2}
对每个句子，说明一个双集合维恩图（标签为 *bird* 和 *flies*）中哪个区域必须为空或不为空，句子才为真。用带标签名称的集合表达式写出这个区域。

1. *All birds fly.*
2. *Some birds don't fly.*
3. *No birds fly.*
::: solution
1. *bird - flies* 为空。
2. *bird - flies* 不为空（为真：企鹅、鸵鸟）。
3. *bird & flies* 为空。

句子1和句子2互相矛盾：一个说某区域为空，另一个说它不为空。你可以在维恩图中输入表达式来检查每个区域。
:::
:::

::: exercise *Any* 和 *ever* {level=2}
给每个句子标上 ✓ 或 ✗，并用向下蕴涵的概念加以解释。

1. *Few people have ever seen it.*
2. *Many people have ever seen it.*
3. *If you have any questions, ask.*
4. *She has any idea.*
::: solution
1. ✓ *few* 在其谓语上是向下蕴涵的。
2. ✗ *many* 是向上蕴涵的。
3. ✓ 条件句的 *if* 分句是向下蕴涵的语境。
4. ✗ 肯定陈述句是向上蕴涵的；✓ *She doesn't have any idea* / *Does she have any idea?*
:::
:::

::: exercise 告示中的辖域 {level=3}
图书馆的一则告示写道：*All books may not be borrowed.* 给出它的两种理解，说明图书馆可能指的是哪一种，并把它改写两次，使每个版本只有一种理解。然后用两三句话解释原句为什么有歧义。
::: solution
两种理解：（a）*all* 取宽辖域——“任何书都不得外借”；（b）*not* 取宽辖域——“并非所有的书都可以外借；有些只供参考”。图书馆可能指的是（b）。

无歧义的版本：（a）*No books may be borrowed.*（b）*Not all books may be borrowed* 或 *Some books may not be borrowed.*

解释：这个句子包含两个取辖域的成分，量化词 *all* 和否定词 *not*。英语既允许否定对主语位置上的量化词取辖域（如 *All that glitters is not gold*），也允许相反的情况，所以这个句子两种理解都有，只有语境或语调才能决定。
:::
:::

::: exercise 评价一个说法 {level=3}
写150–200词，评价一本杂志上的这个说法：“英语里没有‘缘分’这个词，所以说英语的人无法理解人与人之间命中注定的联系这一观念。”
::: hint
把关于词的说法和关于思维的说法分开。什么证据能检验第二个说法？不用一个单词，这个观念能在英语中表达出来吗？
:::
::: solution
一篇范文：

*The claim moves from a fact about vocabulary to a conclusion about thought, which is the strong form of the Sapir–Whorf hypothesis. The first part is roughly true: English has no single common word with the sense of* 缘分*, and translations such as* fate*,* destiny *or* serendipity *each miss part of it. But lacking a word is not the same as lacking a concept. The idea can be expressed in English by a phrase or a sentence — "a connection that seems meant to be", "we were fated to meet" — and English speakers who have it explained can recognise situations to which it applies, which is how loanwords such as* schadenfreude *or* feng shui *enter English. The strong form of the hypothesis is not supported by research: people can think about distinctions their language does not name. What studies of language and thought have found are weaker effects — on attention, memory and speed in particular tasks. A reasonable claim would be that speakers of Chinese have a ready-made category that makes the idea easier to notice and talk about; whether it changes how they think could only be tested experimentally.*
:::
:::
