一家中国小公司给供应商发了这样一条消息，消息用汉语写成，发送前经过了机器翻译系统：

> 王经理：上次的样品我们看了，质量没问题，就是包装有点意见。她说下周能不能再寄一批过来？价格方面还是按老规矩。
>
> *Manager Wang: Last time's samples we have seen, quality no problem, just packaging has a little opinion. She said next week can send another batch? Price aspect still according to old rules.*

上面的英语是为本课编写的，用来展示汉英机器翻译通常会出现的几类错误；它不是任何特定系统的输出，而且现在的系统（截至2026年）处理这样的消息通常会好一些。即便如此，每一个错误都很有启发性。“意见”被译成了词典里的第一个对应词 *opinion*，而这里它的意思是“保留看法、不满”。“她”——对话中先前提到过、但不在这条消息里的某个人——变成了没有先行词的 *She*。问句没有英语的疑问句结构。“老规矩”（即“一贯的条件”）变成了 *old rules*。称呼语“王经理”变成了一个标题。人工译者会这样写：

> *Dear Mr Wang, We've looked at the samples you sent last time. The quality is fine, but we have a few concerns about the packaging. Ms Li asks whether you could send another batch next week. Pricing would be on the usual terms.*

机器翻译（machine translation，MT）现在每天有数以百万计的人在使用，大多数职业译者也把它作为工作的一部分。它快速，免费或便宜，而且常常流畅得惊人。它也会犯一些被流畅的表面所掩盖的错误。本课描述机器翻译的发展历程和现有系统的大致工作原理，它们在英汉之间的典型错误，如何决定何时使用它，以及如何对其输出进行**译后编辑**——这是使用机器翻译对译者和学习者同样提出的技能要求。

## 机器翻译的工作原理

::: definition 基于规则的、统计的和神经网络的机器翻译 {#def-mt}
- **基于规则的机器翻译**（rule-based MT，20世纪50年代起）：语言学家编写词典，以及分析源语句子和生成目的语句子的规则。在简单的情况下输出常常合乎语法，在复杂的情况下则生硬或错误。
- **统计机器翻译**（statistical MT，约1990年起）：系统从大量人工译文（**平行语料库**，parallel corpora）中学习词语和短语对应关系的概率，并为每个句子选择概率最高的译文。
- **神经机器翻译**（neural MT，约2014年起）：用平行语料库训练的神经网络把整个源语句子表示为数字，然后逐词生成目的语句子，每个词都根据源语句子和已经生成的词来选择。现在的大多数系统使用 **Transformer** 架构（瓦斯瓦尼等［Vaswani et al.］，2017），其**注意力**（attention）机制让每个输出词都能利用源语的所有部分。
- **大语言模型**（large language models，约2022年起普及）：用多种语言的文本训练的超大型神经网络，按指令就能翻译，还可以要求它们遵循词汇表、保持某种语域或解释某个选择。
:::

所有现有系统都有一个对用户很重要的共同特性：它们是从语言使用的实例中学习的，而不是从对文本所描述情境的理解中学习的。它们预测的是一个像这样的句子的译文通常是什么样子。这就是为什么它们的输出如此流畅——流畅正是训练数据所包含的东西——也是为什么它们的错误属于一种特殊的类型：貌似合理，信心十足，有时意思却是错的。

::: widget markov
matrix: 0, 0.6, 0.4, 0, 0, 0; 0, 0, 0, 0.5, 0.3, 0.2; 0, 1, 0, 0, 0, 0; 0, 0, 0, 0, 0, 1; 1, 0, 0, 0, 0, 0; 1, 0, 0, 0, 0, 0
states: the; bank; river; account; of; closed
start: 0
steps: 30
title: 流畅却盲目
caption: 一个为本课制作的玩具模型，演示一个根据前一个词预测下一个词的系统如何产生流畅的序列。在 *the* 之后，它选择 *bank* 或 *river*；在 *bank* 之后，它最常选择 *account*——因为在它（假想的）训练数据中，金融意义更常见——即使文本讲的是河岸。运行这个随机游走：每个序列在局部都是流畅的（*the river bank closed*、*the bank account closed*），而模型中没有任何东西知道文本讲的是什么。真实的系统依据的语境远远不止一个词，准确得多，但原理——选择可能性最大的接续——是一样的，当可能性最大的理解不是原意时，它产生的错误类型也是一样的。
:::

## 英汉之间的典型错误

::: theorem 在哪里查找机器翻译错误 {#rule-errors}
检查英汉之间的机器翻译时，首先看：

1. **词义**：多义词被译成最常见的义项（意见、紧张、加油；*bank*、*issue*、*party*），尤其是在没有语境的短文本和单个词中。
2. **指代**：代词和性别（口语中的 *tā* 和书面的他/她 → *he*/*she*/*it*），零主语补错了，在汉语会重复名词或什么也不用的地方把 *it* 和 *they* 译成“它”和“他们”。
3. **译入英语时的语法范畴**：时、数和冠词选错了或前后不一致（[[translation/chinese-into-english#rule-supply]]）。
4. **漏译和添加**：一个分句、一个否定或一个限定语被不声不响地丢掉了，或者添加了原文所没有的词——这是最危险的错误，因为输出读起来仍然很好。
5. **术语与一致性**：同一个术语在不同的句子里译法不同。
6. **名称**：人名和地名按意思翻译、音译错误或顺序颠倒（[[translation/idioms-culture#rule-names]]）。
7. **语域和格式**：正式程度不对，信函和标识格式的仿译，语气被抹平。
8. **数字、单位和日期**：通常是对的，有时却错得离谱（万/亿的换算，日期顺序颠倒）。
9. **文化专有词语和习语**：照字面翻译，或者被换成不合适的对应说法。
:::

::: proof
在这些地方，英汉之间的差异所要求的信息可能并不在句子本身之中：多义词的义项取决于情境，代词或零主语的所指可能在另一个句子里或文本之外，而时、数和定指必须根据语境补入英语（[[translation/english-chinese-compared#rule-categories]]）。逐句翻译或者掌握的语境很少的系统，在这些地方出错最多。漏译和添加是神经系统的一个已知弱点：因为它们是逐词生成流畅输出的，所以可能生成一个流畅的句子，却并不对应整个原文。译者和研究者常常注意到，这类准确性错误比流畅性错误更难被读者发现，正是因为流畅的输出会让人信任。
:::

::: example 诊断错误 {#ex-diagnose}
下面这组英汉句对是为本课编写的，用来展示典型的问题。找出错误，并用 [[#rule-errors]] 加以分类。原文：*The minister did not rule out further cuts, but she said that the issue would be discussed at the party conference in May.* 仿机器输出：部长排除了进一步削减，但他说这个问题将在五月的聚会上讨论。
::: solution
1. **漏译否定**（第4点）：*did not rule out*（没有排除）变成了“排除了”——意思弄反了。
2. **指代与性别**（第2点）：*she* 变成了“他”。
3. **词义**（第1点）：*party conference*（一个政党的大会，党代会或党的年会）变成了“聚会”（社交聚会）。
4. **词义**（第1点）：*the issue* → 这个问题，可以接受。
5. 改正：部长没有排除进一步削减开支的可能，但她表示，这一问题将在五月的党代会上讨论。——注意添加的“开支”（削减什么？公共开支的语境）和“的可能”（*rule out* 的意思是“排除可能性”），这是人工译者根据语境补出的；“表示”是汉语新闻中常用的转述动词。
:::
:::

::: warning 相信流畅
✗ *The output reads perfectly, so it must be right.* 流畅证明的是系统生成了可能性很大的目的语文本，而不是它翻译了原文。

✓ 逐句对照原文检查意思，从否定、数字、名称、条件和代词开始。之后才把输出当作英语（或汉语）来读。
:::

::: example 译入汉语的错误 {#ex-into-chinese}
一个编写的输出，是旧系统会产生、现有系统有时仍会产生的那种。原文：*If you have any questions about your booking, please do not hesitate to contact us, and one of our team will get back to you within 24 hours.* 输出：如果你有任何关于你的预订的问题，请不要犹豫联系我们，我们团队的一个人将在24小时内回到你。找出问题并进行完全译后编辑。
::: solution
1. **词义 / 习语**（第9点）：*get back to you*（回复）变成了“回到你”，毫无意义。
2. **语域和格式**（第7点）：*please do not hesitate to contact us* 是英语的一个套语；“请不要犹豫联系我们”是仿译。汉语的格式是“欢迎随时联系我们”或“请随时与我们联系”。在客户服务中，“你”应当用“您”。
3. 结构上的**翻译腔**：“任何关于你的预订的问题”（“的”字链和两个物主代词），“我们团队的一个人”（*one of our team*）。汉语对提供帮助的人说得不那么具体，物主代词也省去（[[translation/english-into-chinese#rule-omit]]）。
4. **完全译后编辑**：如对预订有任何疑问，欢迎随时联系我们，我们将在24小时内回复您。

除了最后一个分句，输出都能看懂；只读大意的人是发现不了这个意义错误的。
:::
:::

## 何时使用机器翻译

::: theorem 先评估风险 {#rule-risk}
使用机器翻译之前，先问：

1. **译错了会怎样？** 对菜单或随意的消息来说，影响不大；对合同、医疗宣传单、安全须知或移民表格来说，影响很大。风险越高，人工检查就必须越彻底——有些文本应当从一开始就由合格的人工译者翻译。
2. **文本是否保密？** 把文本粘贴到在线服务中，可能会把它发送给第三方并被存储。合同、个人数据、医疗记录和未发表的作品，未经许可不得共享。
3. **谁来检查？** 译后编辑需要一个**两种**语言和专业领域都懂的人。只懂一种语言的读者无法判断是否准确。
4. **文本是什么类型？** 机器翻译最擅长使用标准语言的信息型文本；最不擅长文学、创意、劝说性和高度专业化的文本，方言，以及没有语境的很短的文本。
5. **有什么规定？** 客户、雇主、出版商和大学可能限制或禁止使用机器翻译，或者要求声明其使用（[[academic-writing/academic-integrity]]）。
:::

::: proof
风险问题放在第一位，是因为机器翻译的错误无法预测：同一个系统可能把一个句子译得完美无缺，下一个句子却把意思弄反了。在低风险的用途中，读者可以容忍错误并要求澄清；在高风险的用途中，一个错误就可能造成经济损失、法律责任或人身伤害。保密是译者的职业义务（[[translation/interpreting#rule-conduct]]），在许多国家也是数据保护法规定的法律义务。第5点对学习者很重要：在翻译课上，把机器输出当作自己的作业提交，是对作业的不实陈述；在语言课上，它取消了练习本来要提供的训练。
:::

::: quiz
英国的一家医院需要一份中文版的病人术前须知（不能吃什么，停用哪些药物）。最好的做法是什么？
- [ ] 机器翻译，因为文本简短而且标准。
- [ ] 机器翻译，由一位说汉语的病人检查。
- [x] 由一位合格的译者翻译（他可以把机器翻译当作工具），由第二位合格人员审校，并对照中文医学资料核实术语。
- [ ] 只提供英文版，因为翻译有风险。
::: solution
这个文本是高风险的：一个错误就可能伤害病人。它需要一位对结果负责的职业译者，还需要审校。译者内部是否使用机器翻译是方法问题；重要的是责任和检查。没有医学知识的病人无法可靠地检查准确性，而不提供译文会让病人得不到他们需要的信息。
:::
:::

## 译后编辑

::: definition 译后编辑 {#def-post-editing}
**译后编辑**（post-editing）是由人对机器翻译的输出进行修改，以达到规定的质量水平。国际标准 ISO 18587:2017（《翻译服务——机器翻译输出的译后编辑——要求》，*Translation services — Post-editing of machine translation output — Requirements*）区分了**轻度译后编辑**（light post-editing），其目标只是一个能看懂的文本，和**完全译后编辑**（full post-editing），其目标是一个可与人工译文相媲美的文本。
:::

::: theorem 一套译后编辑程序 {#rule-post-edit}
1. **明确目标水平**：轻度（能看懂，内容准确，文体不加润色）还是完全（可以发表）。
2. 先逐段**读原文**，再读输出，以免输出左右你的理解。
3. **先改意义**：漏译、添加、错误的义项、弄反的否定、错误的数字和名称（[[#rule-errors]]）。
4. **再改术语和一致性**，使用客户的词汇表（[[translation/specialised-translation#rule-termbase]]）。
5. **然后改语法**，以及——仅限完全译后编辑——**文体、语域和行文**，包括自然的英语或汉语所要求的重组（[[translation/english-into-chinese]] 和 [[translation/chinese-into-english]] 中的技巧）。
6. **尽量利用输出**：在轻度译后编辑中，不要作出于个人偏好的修改；在完全译后编辑中，凡是不够好的都要改写，即使这意味着重写整个句子。
7. **撇开原文通读最终文本**，与任何翻译一样（[[translation/what-translation-is#rule-procedure]]）。
:::

::: proof
这个顺序——意义、术语、语法、文体——遵循错误的严重程度：一个文体别扭但准确的句子，比一个优雅却与原文意思相反的句子问题要小。先读原文很重要，因为流畅的输出会对译后编辑者产生**启动效应**（primes）：一旦你读过一个貌似合理的句子，你就倾向于把原文读成是那个意思。第6点说的是译后编辑的经济性：它的目的是比从头翻译节省时间，所以在轻度译后编辑中，出于偏好的修改会把节省的时间浪费掉；但在完全译后编辑中，需要重组的句子就应当重组，因为结果必须读起来像好的人工译文。对译后编辑的研究普遍发现，对于合适的文本和质量好的输出，它可能比从头翻译快；输出质量差时则更慢——这就是为什么 [[#rule-risk]] 的评估要放在第一位。
:::

::: example 轻度和完全译后编辑 {#ex-post-edit}
对这个输出进行两次译后编辑——轻度和完全。原文：本产品适用于家庭、办公室等室内场所，使用前请仔细阅读说明书，并妥善保管。输出（编写的）：*This product is suitable for indoor places such as family and office. Before use please read the instruction carefully, and keep properly.*
::: solution
1. **检查意义**：这里的“家庭”指“住宅”，不是 *family*（词义）；*keep properly* 没有宾语——“妥善保管”指的是说明书（指代缺失）；*the instruction* 应当是 *the instructions* 或 *the manual*（数和术语）。

2. **轻度译后编辑**（意义和语法，改动最少）：*This product is suitable for indoor places such as homes and offices. Before use, please read the instructions carefully and keep them in a safe place.*

3. **完全译后编辑**（可发表的说明书文体）：*This product is designed for indoor use, for example in homes and offices. Please read these instructions carefully before use and keep them for future reference.*

完全译后编辑的版本使用了英语说明书的惯用格式（*designed for indoor use*、*keep them for future reference*）；轻度译后编辑的版本在输出正确的地方都保留了其结构。
:::
:::

::: example 跨句子的一致性 {#ex-consistency}
一份三句话的中文宣传单的机器译文，把“志愿者”在第一句译成 *volunteer*，第二句译成 *voluntary worker*，第三句译成 *volunteers person*；把“社区”分别译成 *community*、*district* 和 *neighbourhood*。译后编辑者应当怎么做？为什么会出现这种情况？
::: solution
1. 根据客户的词汇表或平行文本，**为每个概念选定一个术语**：“志愿者”用 *volunteers*；“社区”用 *community* 还是 *neighbourhood*，取决于宣传单中的“社区”指什么（行政单位，常用 *community*；或者人们居住的地区，常用 *neighbourhood*）。全文统一使用。
2. **为什么会出现这种情况**：许多系统逐句翻译，在每个语境中选择可能性最大的译法，不记得前面的选择；它们不知道，宣传单中的变换会暗示不同的东西。以整篇文档和词汇表为输入的系统做得好一些，但一致性仍然需要检查。
3. 无论如何，都要改正不合语法的 *volunteers person*。
:::
:::

## 机器翻译的评估

研究人员和开发者用两种方式衡量机器翻译的质量。**自动评测指标**把输出与一个或多个人工参考译文相比较：最有名的 **BLEU**（帕皮内尼等［Papineni et al.］，2002）计算输出中有多少词序列也出现在参考译文中。这类指标快速，对比较一个系统的不同版本很有用，但一个译文可能很好却与参考译文不同，也可能与参考译文很接近却在一个关键的词上出错。后来的指标，包括一些基于神经网络的指标，与人工判断的相关性更好。**人工评估**请人判断**充分性**（adequacy：输出是否传达了原文的意思？）和**流畅性**（fluency：它是否是好的目的语文本？），或者用 **MQM**（多维质量指标，Multidimensional Quality Metrics）这样的类型体系对错误进行分类。对用户来说，教训很简单：公开宣称某个系统“和人一样好”，指的是用特定的衡量标准、在特定的文本上进行的某一项测试。

::: quiz
为什么 BLEU 得分高并不能说明译文是正确的？
- [ ] 因为 BLEU 只适用于欧洲语言。
- [x] 因为它计算的是与参考译文重叠的词序列，所以输出可能与参考译文的大部分相符，却仍然改变了意思，例如漏掉了 *not*。
- [ ] 因为 BLEU 只衡量流畅性。
- [ ] 因为高分总是意味着译文是直译的。
::: solution
BLEU 衡量的是与参考译文在表面上的重叠。漏掉一个 *not* 会完全改变意思，却只会使重叠略有变化。反过来，一个用词与参考译文不同的好译文，得分会低于它应得的分数。
:::
:::

::: note 英汉对比
- **学习者与机器翻译。** 机器翻译可以帮助学习者理解文本、检查初稿或看到其他的措辞；它无法判断哪种措辞适合当时的情境，而且它取消了写作和翻译练习所提供的训练。要在自己尝试之后再用它，把它的译文与你的比较，并问一问为什么不同（[[collocation-and-register/false-friends-chinglish]]）。
- **单个词和短语**是机器翻译最不可靠的地方，因为没有语境来选择义项：改用学习型词典和语料库（[[core-vocabulary/using-a-dictionary]]）。
- **回译**——把输出译回源语——是一种很弱的检查：系统可能把自己的错误回译成一个看起来正确的原文。
- **汉语特有的陷阱**：原文是口语或有歧义时的他/她；无主语句；“了”标志状态变化时却被译成过去时；万和亿；按意思翻译的名称；照字面翻译的成语（[[translation/idioms-culture#rule-chengyu]]）。
:::

::: history
1949年，洛克菲勒基金会的一位主管韦弗（Warren Weaver）散发了一份备忘录，提出计算机或许能够翻译；1954年，乔治城大学和 IBM 演示了一个把挑选过的俄语句子译成英语的系统。乐观情绪使美国投入了大量资金，直到1966年的 ALPAC 报告得出结论：机器翻译比人工翻译更慢、更不准确、更昂贵，并建议转而开展基础研究；资金随之锐减。基于规则的系统继续为有限的用途而开发；1984年，长尾真（Makoto Nagao）提出了通过与存储的实例类比来进行翻译。约1990年起，IBM 的研究人员（布朗等［Brown et al.］）表明，翻译可以从平行语料库中通过统计方法学习，统计系统主导在线翻译达二十年之久。神经机器翻译在2014年的研究论文中提出，约2016年起取代了统计系统；Transformer 架构（瓦斯瓦尼等，2017）成为标准；约2022年起，通用的大语言模型也开始用于翻译。译后编辑成为一项得到承认的职业服务，并于2017年有了自己的国际标准 ISO 18587。
:::

## 后续内容

这是本课程的最后一课。它的方法依赖于前面所有的内容：关于译文应当是什么的理论（[[translation/what-translation-is]]），造成大多数机器翻译错误的那些差异（[[translation/english-chinese-compared]]），以及译后编辑所运用的选词、重组和转换技巧（[[translation/translating-words]]、[[translation/english-into-chinese]]、[[translation/chinese-into-english]]、[[translation/structural-shifts]]）。机器翻译从中学习的语料库，在 [[collocation-and-register/using-a-corpus]] 和 [[linguistics/corpus-linguistics]] 中介绍；语言模型背后的原理——预测下一个词——见 [[core-vocabulary/function-words]]。

::: summary
- 机器翻译从**规则**（20世纪50年代）经由**统计**（20世纪90年代）发展到**神经网络**（2014年起）和**大语言模型**（21世纪20年代）；所有现有系统都从语言使用的实例中学习（[[#def-mt]]）。
- 它们的输出**流畅**，错误常常**貌似合理**：错误的义项、错误的代词和性别、错误的时和数、漏译和添加、不一致的术语、名称、语域、数字和文化专有词语（[[#rule-errors]]）。
- 使用机器翻译之前**评估风险**：错误的后果、保密、谁能检查、文本类型以及适用的规定（[[#rule-risk]]）。
- **译后编辑**把机器翻译的输出修改到规定的水平——**轻度**或**完全**（ISO 18587:2017）——先改意义，再改术语、语法和文体（[[#def-post-editing]]、[[#rule-post-edit]]）。
- **先读原文**，再读输出；绝不把流畅当作准确的证据。
- **BLEU** 等自动评分把输出与参考译文相比较；它们对开发者有用，却不能证明一个译文是正确的。
:::

## 习题

::: exercise 给错误分类 {level=1}
用 [[#rule-errors]] 给每个错误分类。(a) 我们公司有三千员工 → *Our company has three thousand employee.* (b) 她是我的老板（口语，被转写为“他是我的老板”）→ *He is my boss.* (c) 请勿吸烟 → *Please don't smoke cigarettes or else.* (d) 销售额达到两亿元 → *Sales reached 2 billion yuan.*
::: solution
(a) 语法——数（*employees*）。(b) 指代——性别，源于口语中有歧义的 *tā*。(c) 添加（*or else*）和语域——标识格式（*No Smoking*）。(d) 数字——两亿是 *200 million*。
:::
:::

::: exercise 没有语境的词义 {level=1}
给每个词两个不同的正确译法，各配一个语境，说明为什么系统单独翻译它可能会出错。(a) 加油 (b) *issue* (c) 紧张
::: solution
(a) 给车加油 *fill up the car*；比赛加油 *Come on!* / *Go for it!* (b) *issue* 问题（*a political issue*）；期（*the March issue of a magazine*）；发行（*the issue of new shares*）。(c) 我很紧张 *I'm nervous*；关系紧张 *tense relations*；资金紧张 *money is tight*。
:::
:::

::: exercise 轻度还是完全？ {level=1}
下列每种用途适合哪种程度的译后编辑？(a) 一位工程师想大致了解一篇中文技术文章说了什么。(b) 一家公司的英文网站。(c) 共同参与一个项目的同事之间的内部电子邮件。(d) 一部翻译小说。
::: solution
(a) 轻度，甚至谨慎使用未经编辑的机器译文也可以，因为工程师只需要大意，细节可以再问。(b) 完全。(c) 轻度，如果双方都知道文本是机器翻译的。(d) 对文学来说，完全译后编辑是不够的：文学翻译需要译者（[[translation/literary-translation]]）；机器翻译至多只能是这一过程中的工具。
:::
:::

::: exercise 对一段文字进行译后编辑 {level=2}
为一份旅游宣传单对这个编写的输出进行完全译后编辑。原文：景区开放时间为每天8:00—17:30，16:30停止售票。请游客文明游览，爱护公共设施。输出：*The scenic area open time is every day 8:00—17:30, 16:30 stop selling tickets. Please tourists civilized visit, love public facilities.*
::: solution
*Opening hours: 8:00 a.m. to 5:30 p.m. daily (last tickets 4:30 p.m.). Please respect the site and take care of its facilities.*——“文明游览”是汉语的一个公共用语，在英语中没有直接的对应说法；*civilised* 在英语中听起来带有侮辱性。*Love public facilities* 是“爱护”的仿译。*Last tickets* 或 *Ticket office closes at 4:30 p.m.* 是英语的惯用说法。*Scenic area* 可以删去，或换成景点的名称。
:::
:::

::: exercise 找出漏译 {level=2}
比较原文和编写的输出，找出丢失了什么。原文：*Unless otherwise agreed in writing, payment shall be made within thirty days of the date of the invoice.* 输出：付款应在发票日期起三十天内支付。
::: solution
整个条件 *Unless otherwise agreed in writing*（除非另有书面约定）都漏译了——在合同中这是严重的错误，因为它改变了双方的权利。输出还有一处重复（付款应……支付）。改正：除双方另有书面约定外，应自发票开具之日起三十日内付款。
:::
:::

::: exercise 代词和零主语 {level=2}
译成英语，补出机器翻译系统可能弄错的主语和代词，并解释你的决定。李芳给张伟打电话，说明天的会取消了。他很高兴，因为正好要去医院看母亲。
::: solution
*Li Fang called Zhang Wei to say that tomorrow's meeting had been cancelled. He was pleased, because he needed to visit his mother in hospital anyway.*——“他”指张伟（李芳在这里是女性的名字，书面的“他”也确认了所指是男性）；“说”的零主语是李芳；“要去”的零主语是张伟；“母亲”是 *his mother*。时态后移得出 *had been cancelled*。根据名字猜测李芳性别的系统，可能会犯 *she* 或 *he* 的错误；译者必须核实。
:::
:::

::: exercise 该用机器翻译吗？ {level=3}
就每种情况决定是否以及如何使用机器翻译，并用 [[#rule-risk]] 说明理由。(a) 一个学生想为写论文读懂一篇中文新闻报道。(b) 一家小企业想把它的条款和条件译成英语放到网站上。(c) 一位老师想给一个新学生的说英语的家长发一条简短的消息。(d) 一位研究者有未发表的中文访谈转写稿，想要一份英文初稿。
::: solution
(a) 用于理解是合理的，但对关键论断、名称和数字要谨慎；论文中引用的任何内容都应当对照原文核实或由学生自己翻译，如果规定要求，还要声明使用了机器翻译。(b) 高风险（法律文本）：应当由合格的译者负责，并经过审校；机器翻译至多是译者的工具。(c) 低风险：机器翻译后由懂两种语言的人检查，或者直接用英语写一条简单的消息；要简短清楚。(d) 保密：未经同意和伦理审查程序的批准，参与者的数据不得发送到在线服务；如果允许，使用数据保存在本地的系统，并在分析之前进行完全译后编辑，因为访谈语言是非正式的，而且依赖语境。
:::
:::

::: exercise 比较人工与机器 {level=3}
自己选一段80—100词的文字，从汉语译成英语。然后获取同一段文字的机器译文（要经过许可，并且不涉及任何保密内容），写150词比较两者：机器在哪里更好，你在哪里更好，两个版本各犯了 [[#rule-errors]] 中的哪些错误？
::: hint
先比较意义（漏译、义项、指代），再比较术语、语法和文体。不要以为更流畅的版本就更准确。
:::
::: solution
答案不一。好的比较会指出具体的句子；在评判文体之前，先对照原文检查两个版本的意义；注意到机器的典型长处（流畅的搭配、标准的格式、速度）和弱点（依赖语境的义项、跨句子的指代、文化专有词语、一致性），以及学习者的典型弱点（冠词、时、逐词对译的结构）；最后给出一个取两者之长的修改版本，并说明它是借助机器翻译完成的。
:::
:::
