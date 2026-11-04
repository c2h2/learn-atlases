下面是一家虚构的中国公司网站上的一个句子，以及一个机器翻译系统和匆忙的译者常会给出的那种译文：

> 我公司成立于1998年，位于美丽的西湖之畔，经过二十多年的发展，现已成为一家集研发、生产、销售于一体的现代化企业，产品远销欧美等三十多个国家和地区，深受客户好评。
>
> ? *Our company was established in 1998, located beside the beautiful West Lake, after more than twenty years of development, has now become a modern enterprise integrating R&D, production and sales, products are exported to more than thirty countries and regions such as Europe and America, deeply praised by customers.*

这段英语包含了汉语的每一层意思，顺序也相同。但它不是一个英语句子。它有一个限定动词（*has now become*），其主语却在十个词、两个逗号之外；讲产品的分句有自己的主语和动词，却只用逗号连接，构成逗号粘连；最后一个短语 *deeply praised by customers* 不知依附于什么；整个是一个五十个词的句子，其中每个分句的分量都一样。英语读者读到 *located* 就会磕绊，读到 *products are exported* 就会放弃。

自然的英语译文必须判断这个句子真正讲的是什么，以及各部分之间是什么关系：

> *Founded in 1998 on the shores of West Lake, the company has grown over two decades into a modern business that handles research, manufacturing and sales. It exports to more than thirty countries, in Europe, North America and elsewhere, and its products are popular with customers.*

汉语句子是一条**链**：每个分句按顺序为话题“我公司”增加一个新的事实。英语则是一个**层级结构**：一个主句（*the company has grown … into a modern business*），成立时间和地点压缩进前面的分词短语，出口则另成一句。本课讲的就是如何构建这个层级结构——这是汉译英中最难的技能，也是大多数中国学习者练得最少的技能。

## 汉语的流水句

::: definition 流水句 {#def-liushuiju}
**流水句**（吕叔湘在《汉语语法分析问题》，1979中提出的术语）是由一连串用逗号隔开的分句组成的汉语句子，这些分句常常共用一个话题，常常没有自己的主语，很少或根本不用连接词。分句按事件或思路的顺序一个接一个排列，读者自行推断它们之间的关系。
:::

流水句在汉语中不是毛病。它是叙述、描写和许多说明文的正常形态，而且可以写得很优美。但英语语法无法再现它：每个英语分句都需要主语和限定动词，独立分句不能只用逗号连接，而且由三四个以上并列分句组成的句子会让人觉得没有形状（[[translation/english-chinese-compared#rule-hypotaxis]]）。

::: theorem 翻译流水句的四个步骤 {#rule-four-steps}
1. 把汉语**拆分**成分句，并**说明**每个分句与相邻分句之间的**关系**：时间、原因、结果、条件、让步、目的、递加、描述、评论。
2. **选择主句**：承载句子要点的一两个陈述。选择它们的**主语**（[[translation/english-chinese-compared#rule-subject]]）。
3. 用英语的从属手段把其他分句**附加**到主句上：连词、关系从句、分词短语和不定式短语、介词短语、同位语、*with* 短语。只有分量相同的陈述才用并列（*and*、*but*）。
4. **确定句子的边界**：译成一个英语句子、两个还是更多。然后补出时、数、冠词和代词，并把结果作为英语来修改。
:::

::: proof
这些步骤源于意合与形合的对比。汉语把分句的主次交给读者；英语语法则迫使作者分出主次，因为一个简单句中只有一个分句可以是主句，其他一切都必须标明为从属，或者明确地并列。第1步是汉语读者不知不觉中完成的分析；第2步是英语作者必须作出、而汉语作者不必作出的决定；第3步是英语所需要的形合；第4步处理 [[translation/english-chinese-compared#rule-categories]] 中的强制性范畴。跳过第2步的译者写出的英语，每个分句都是用 *and* 或逗号连接起来的主句——最好的情况是合乎语法，但单调乏味。
:::

::: widget graph
title: 从链条到层级
nodes: 他在农村长大@0,8; 家里很穷@0,6; 十五岁出去打工@0,4; 后来自学考上了大学@0,2; he taught himself and won a place at university@8,7; Growing up poor in the countryside@6,4; after leaving home at fifteen to work@10,4
edges: 他在农村长大>家里很穷; 家里很穷>十五岁出去打工; 十五岁出去打工>后来自学考上了大学; he taught himself and won a place at university>Growing up poor in the countryside; he taught himself and won a place at university>after leaving home at fifteen to work
caption: 左边：一个汉语流水句“他在农村长大，家里很穷，十五岁出去打工，后来自学考上了大学”——四个分句按时间顺序排列，每个只与下一个相连。右边：英语译文 *Growing up poor in the countryside, he left home at fifteen to work, and later taught himself and won a place at university*——或者如图所示，用一个主句，背景都依附于它。英语必须选择句子讲的是什么（这里是取得的成就），并把其余部分附加上去。拖动节点，试试换一个主句。
:::

::: example 给分句分主次 {#ex-rank}
译成英语：小王昨天发烧了，没来上课，老师让我把作业带给他，我放学就去了他家。
::: solution
1. **分句和关系**：(i) 小王昨天发烧了——(ii) 的原因；(ii) 他没来上课；(iii) 老师让我把作业带给他——(ii) 的后果；(iv) 我放学后去了他家——对 (iii) 的响应。
2. **主句**：有两个事件承载故事：老师的请求和我的探访。(i) 和 (ii) 是背景。
3. **附加**：(i) + (ii) → *because* 从句或分词；(iv) → 用 *so* 连接的第二个分句。
4. **断句和语法**：通篇用过去时，不需要过去完成时；*the homework*（定指：当天的作业）。

*Xiao Wang was off school yesterday with a fever, so the teacher asked me to take him the homework, and I went round to his house after school.* / *Because Xiao Wang had a fever and missed class yesterday, the teacher asked me to take him his homework. I went to his house as soon as school was over.*

第一个译文用 *with a fever* 把 (i) 和 (ii) 压缩成一个分句，这是汉语没有的结构；第二个译文把它们保留为 *because* 从句，并把句子一分为二。
:::
:::

## 从属的手段

英语有许多方法可以把一个陈述附加到另一个陈述上，而不使它成为主句。译成英语的译者需要掌握全部方法。

| 汉语链条 | 英语结构 | 例子 |
|---|---|---|
| 他推开门，走了进来 | 分词短语 | *Pushing open the door, he came in.* |
| 这座寺庙建于唐代，是全市最古老的建筑 | 关系从句 | *The temple, which dates from the Tang dynasty, is the oldest building in the city.* |
| 她是医生，在北京工作 | 同位语或关系从句 | *She is a doctor working in Beijing.* |
| 他低着头，一句话也不说 | *with* 短语 | *He sat with his head down, not saying a word.* |
| 为了赶火车，我们五点就起床了 | 表示目的的不定式 | *We got up at five to catch the train.* |
| 天很冷，路上没什么人 | 独立结构或 *so* 从句 | *It was so cold that there was hardly anyone about.* |
| 价格便宜，质量也好 | 并列 | *It is cheap, and the quality is good too.* / *It is both cheap and good.* |
| 他学了三年钢琴，弹得很好 | 介词短语 | *After three years of lessons, he plays the piano very well.* |

::: theorem 充分运用各种从属手段 {#rule-subordinate}
把汉语分句附加到英语主句上时，根据分句的**关系**和**分量**选择结构：

1. 主语相同的**背景或先发生的动作** → 分词短语（*Having finished …*、*Born in …*、*Pushing open …*）。
2. **对名词的描述** → 关系从句、简化关系从句、同位语或形容词短语。
3. **伴随情况** → *with* 短语或句末的分词（*… with her arms folded*、*… waving goodbye*）。
4. **目的** → *to* 不定式或 *so that*；**原因、条件、让步、时间** → *because*、*if*、*although*、*when*，或介词短语（*because of*、*despite*、*after*）。
5. **分量相同** → *and*、*but*、分号或另起一句。

确保分词短语与主句的**主语相同**（[[complex-sentences/participle-infinitive-clauses]]）。
:::

::: proof
这些是英语语法提供的形合手段（[[translation/english-chinese-compared#def-hypotaxis]]），每一种都有自己的意义：分词短语把动作表现为背景，关系从句表现为描述，*with* 短语表现为伴随情况。按关系选择，可以让汉语的逻辑清晰可见；按分量选择，可以让英语句子的要点留在主句中。关于主语的警告之所以重要，是因为汉语的话题链允许隐含的主语转换（他推开门，屋里一片漆黑——第二个分句讲的是屋子），把第一个分句译成分词的译者就会造出垂悬分词：✗ *Pushing open the door, the room was dark.* ✓ *When he pushed open the door, the room was dark.*
:::

::: warning 话题链造成的垂悬分词
✗ *Founded in 1998, we have grown into a modern enterprise.*（成立的是公司，不是 *we*。）

✓ *Founded in 1998, the company has grown into a modern business.* ✓ *Since our founding in 1998, we have grown …*

✗ *Walking along the river, the old houses are beautiful.*（对应“沿着河边走，老房子很漂亮。”）

✓ *As you walk along the river, you pass some beautiful old houses.* ✓ *The walk along the river takes you past some beautiful old houses.*
:::

::: quiz
“她打开信，看了一遍，脸色一下子变了”的哪个译文是最好的英语？
- [ ] *She opened the letter, read it once, her face changed suddenly.*
- [ ] *Opening the letter, reading it once, her face suddenly changed.*
- [x] *She opened the letter and read it through, and her face suddenly changed.*
- [ ] *She opened the letter, she read it once, and then her face had changed suddenly.*
::: solution
第三个译文把 *she* 的前两个动作并列起来，再用 *and* 把脸色的变化作为一个有自己主语 *her face* 的新分句加上去。第一个是逗号粘连；第二个让 *her face* 成了 *opening* 和 *reading* 的主语（垂悬分词）；第四个误用了过去完成时，还无谓地重复了 *she*。另一个好的译文：*She opened the letter and read it, and the colour drained from her face.*
:::
:::

## 补出汉语隐含的东西

::: theorem 确定时、数、定指和代词 {#rule-supply}
对每个英语分句和名词短语，确定：

1. **时和体**：根据时间词，根据了、过、着、在，以及整个语篇的语境。保持统一的时间框架——叙述用过去时，一般事实和描述用现在时（[[tense-and-aspect/tenses-in-texts]]）。
2. **数**：一个还是多个？“书”可能是 *the book*、*a book*、*books*、*some books*。
3. **定指**：读者已知的还是新的？*a* / *the* / 零冠词（[[nouns-and-articles/a-and-the]]）。
4. **代词**：无主语分句的主语是谁？*he*、*she*、*they*、*we*、*you*、*it*？在英语中指代是否明确？
5. **领属**：英语常在汉语没有物主代词的地方加上物主代词：他把手放进口袋里 → *He put his hands in his pockets.*

当汉语没有确定某个选择，语境也没有确定时，要**查清楚**——问作者或客户，核实事实——或者选择最不容易误导读者的理解。
:::

::: proof
英语语法强制要求作出这些选择（[[translation/english-chinese-compared#rule-categories]]）。选错不是“小”错误：*The company exported a product* 和 *The company exports products* 说的是不同的事。时是最常见的难点，因为汉语叙述可以在过去和现在的事件之间转换而不加任何标记，还因为汉语对永久状态的描述（位于西湖之畔）和对过去事件的描述（成立于1998年）看起来一模一样。数和定指是学习者英语中最常见的*错误*。译者应当查清而不是猜测，这条规则是一项职业义务：不声不响地猜测，就是把风险转嫁给了读者。
:::

::: example 补出时和冠词 {#ex-supply}
译成英语，并列出你的决定：去年夏天我去了一趟云南。在大理住了一个星期，每天骑车沿着洱海转。那里的天特别蓝，水特别清，我拍了很多照片。
::: solution
*Last summer I went to Yunnan. I spent a week in Dali, cycling round Erhai Lake every day. The sky there was incredibly blue and the water was crystal clear, and I took lots of photos.*

决定：**时**——通篇用一般过去时（“去年夏天”设定了框架），包括对天和水的描述，在叙述中那是*当时*的天和水（旅游博客可能会用现在时描述永久的事实：*The sky there is …*）；**主语**——无主语的“在大理住了一个星期”补上 *I*；**从属**——“每天骑车沿着洱海转”变成分词短语（*cycling round …*），附加在 *I spent a week* 上；**冠词**——*the sky*、*the water*（在这个场景中是唯一的），*a week*（不定指），*Erhai Lake*（专名，不加冠词）；**数**——*photos*（很多）；**名称**——洱海是 *Erhai Lake*（拼音 + *Lake*，这是地图和旅游指南上的通常形式；[[translation/idioms-culture]]）。
:::
:::

## 句子边界与段落

::: theorem 英语句子应当在哪里结束 {#rule-boundaries}
1. 一个汉语句子常常包含**几个英语句子**。当主语改变而新的陈述有自己的分量时，当时间框架改变时，或者句子否则会有两个以上的主句时，就另起一个英语句子。
2. 反过来，如果一个汉语短句明显是另一个的背景，两个汉语短句也可以合成**一个**英语句子。
3. 汉语的逗号不是英语的逗号：每一次都要判断英语需要的是句号、分号、连词、破折号还是逗号。
4. 保留汉语的**段落**单位，除非英语体裁另有要求，但要记住，英语段落常常以说明要点的主题句开头（[[sentences-and-paragraphs/topic-sentences]]）。
:::

::: proof
汉语的句号（。）标志一个意义单位的结束，而这个单位可能包含英语视为几个陈述的内容；汉语作者把句号放在一条话题链的末尾，而不是每个述谓之后。英语读者阅读二十到二十五个词的句子比较轻松，英语文体手册也建议变换句子的长度（[[style-and-rhetoric/sentence-variety]]）。因此，逐句对应的翻译并不是忠实的要求：必须保留的是信息及其组织，而不是标点。在法律文本和某些技术文本中，逐句对应可能是翻译要求的一部分，以便条款可以相互参照（[[translation/specialised-translation]]）。
:::

## 冗余与并列短语

正式的汉语，尤其是公文和宣传性文字，常常使用意思相近的成对或成串的四字短语：认真学习、刻苦钻研；团结协作、开拓进取；积极稳妥地推进。在汉语中它们带来节奏和分量。逐项译成英语，就显得浮夸、重复。

::: theorem 翻译一串短语的意思，而不是每一项 {#rule-redundancy}
1. 当两个或更多汉语短语**重复同一个意思**时，用最准确的英语词把这个意思译一次：认真学习、刻苦钻研 → *study hard*；不断发展壮大 → *grow*。
2. 当它们表达**不同的要点**时，保留它们，用平实的英语并列形式：质量可靠，价格合理，服务周到 → *reliable quality, reasonable prices and attentive service*。
3. 去掉英语不需要的强化语：深受 → *popular with*；大力 → （常常不译）；非常重要的 → *important* 或 *essential*。
4. 在**演讲和文学文本**中，排比和重复是修辞，要保留，用英语的修辞形式来翻译（[[style-and-rhetoric/figures-of-speech]]）。
:::

::: proof
英语和汉语的散文传统看重不同的东西。汉语正式文体看重对称（对偶）、四字节奏和层层叠加；英语说明文体，正如文体手册所教的，看重简洁，把一连串近义词视为凑字（[[style-and-rhetoric/concision]]）。把每一项都译出来的译者，会给英语读者一种汉语读者所没有的夸大印象——所以形式对等的译文产生了不同的效果。这是动态对等（[[translation/what-translation-is#def-equivalence]]）与忠实指向同一方向的一个例子。第4点中的例外很重要：在公众人物的演讲中，一串短语可能会被引用和分析，翻译要求可能需要逐项译出。
:::

::: example 宣传文本的简洁 {#ex-concise}
为一家酒店的网站译成英语：本酒店交通便利，环境优雅，设施齐全，服务热情周到，是您商务出行、休闲度假的理想选择。
::: solution
1. **各项**：交通便利（位置方便）、环境优雅（环境雅致）、设施齐全（设施完备）、服务热情周到（热情、周到的服务——两个近义词）、商务出行和休闲度假的理想选择。
2. **保留不同的要点，合并重复的要点**：热情周到 → *friendly* 或 *attentive*，不必两个都用。
3. **英语宣传文字的规范**：用第二人称、具体的词、较短的句子。

*Conveniently located, with elegant surroundings and a full range of facilities, the hotel offers friendly, attentive service — ideal whether you are travelling on business or on holiday.* / *Our hotel is easy to reach, elegant and well equipped, and our staff will make you welcome — whether you are here for business or for pleasure.*

逐词对译的 ? *Our hotel has convenient transportation, elegant environment, complete facilities, warm and thoughtful service, and is your ideal choice for business travel and leisure vacation* 包含了每一层意思，但有好几处搭配错误（*convenient transportation*、*elegant environment*），没有冠词，而且那一串列举读起来像一张表格。
:::
:::

::: example 一个描写性段落 {#ex-paragraph}
为一篇杂志文章译成英语：村子在半山腰上，几十户人家，房子都是石头砌的。村口有棵老槐树，据说有三百多年了，夏天的傍晚，老人们就坐在树下聊天，孩子们在旁边跑来跑去。
::: solution
1. **话题和分句**：村子（位置、大小、房子）；老树（位置、树龄）；夏天的傍晚（老人聊天、孩子玩耍）。
2. **主句**：村子一句，树一句，场景一句。
3. **语法**：现在时（描述事物的现状）；*a few dozen households*；*the old people*、*the children*（在村子范围内的类指）。

*The village sits halfway up the mountain: a few dozen households, in houses built of stone. At its entrance stands an old pagoda tree, said to be more than three hundred years old, and on summer evenings the old people sit under it chatting while the children run around nearby.*

说明：“几十户人家”变成冒号后面一个没有动词的短语，这是英语保留汉语简洁性的一种方式；据说 → *said to be*（简化的被动结构）；槐树 → *pagoda tree*（*Styphnolobium japonicum* 通常的英语名称；也有人用 *locust tree*，但不够准确）；汉语最后两个分句用 *while* 连接，表示同时发生。
:::
:::

::: quiz
在一篇学生演讲中，“我们要努力学习，不断提高自己的综合素质”最好译成哪个英语句子？
- [ ] *We must study hard and constantly improve our comprehensive quality.*
- [x] *We must work hard and keep developing ourselves in every way.*
- [ ] *We must make efforts to study, unceasingly raising our integrated qualities.*
- [ ] *We must study hard to improve.*
::: solution
“综合素质”在英语中没有直接的对应词；*comprehensive quality* 和 *integrated qualities* 都是英语读者无法理解的仿译。第二个译文用自然的英语说出了这个短语的意思（全面发展）。最后一个太单薄了：它丢掉了全面成长的意思。
:::
:::

::: note 英汉对比
- **撇开原文修改。** 起草之后，把你的英语当作从来没见过汉语原文那样来读。大多数逗号粘连、垂悬分词和漏掉的冠词，在汉语原文摆在面前时是看不见的，因为你会把原文的意思读进你的英语里。[[style-and-rhetoric/editing-for-style]] 中的编辑方法适用于译文，也适用于任何其他英语文本。
- **中国英语与中式英语。** 有些中国概念有已确立的英语形式，它们不是英语母语者的说法，但正确且广为理解——*the Spring Festival*、*the Two Sessions*、*a xiaokang society*、*hukou*。它们属于**中国英语**（China English，葛传槼1980年提出的术语），这是表达中国现实的一种正当变体（[[world-englishes/english-in-china]]）。相比之下，中式英语是在语法和搭配层面受母语迁移影响而形成的英语，译者应当把它去掉。
- **母语审校。** 职业的汉译英译文常常由以英语为第一语言的审校修改。如果你与审校合作，要把原文给他们，并在语言之外也讨论意思：不知道汉语说了什么的审校，可能会把英语改得很流畅，却改错了。
:::

::: history
在19世纪和20世纪的大部分时间里，中国文本主要通过外国译者到达英语读者手中：理雅各（James Legge）等传教士学者——他的《中国经典》（*Chinese Classics*，1861—1872）翻译了儒家经典——以及后来的汉学家。1949年以后，由中国机构组织的汉译英开始大规模展开。《中国文学》杂志于1951年创刊，外文出版社于1952年在北京成立，杨宪益和戴乃迭（Gladys Yang）等译者为两者工作了几十年。1980年，葛传槼提出用“中国英语”一词指称表达中国特有事物的英语，以区别于中式英语；这种英语应当是什么样子的讨论，至今仍在中国翻译研究中继续。
:::

## 后续内容

被动与主动、名词与动词，以及两种语言之间的其他转换，汇集在 [[translation/structural-shifts]] 中。人名、地名、习语和文化专有词语见 [[translation/idioms-culture]]，公文、法律和商务文本的特殊规范见 [[translation/specialised-translation]]。关于本课所依据的英语语法，见 [[complex-sentences/participle-infinitive-clauses]]、[[complex-sentences/relative-clauses]]、[[sentences-and-paragraphs/punctuation]] 和 [[tense-and-aspect/tenses-in-texts]]；关于英语文体，见 [[style-and-rhetoric/concision]] 和 [[style-and-rhetoric/editing-for-style]]。

::: summary
- **流水句**是靠意义连接的分句链；英语需要有主句和从句的**层级结构**（[[#def-liushuiju]]）。
- 分四步翻译：**拆分**并说明关系，**选择主句**及其主语，**附加**其余部分，**确定句子边界**（[[#rule-four-steps]]）。
- 充分运用英语的各种从属手段——分词、关系从句、*with* 短语、不定式、连词、介词短语——并让分词依附于正确的主语（[[#rule-subordinate]]）。
- **补出**时、数、冠词、代词和物主代词；原文没有确定时，要查清楚（[[#rule-supply]]）。
- 一个汉语句子可能变成几个英语句子；汉语的逗号不是英语的逗号（[[#rule-boundaries]]）。
- 把一串近义短语的**意思**平实地译一次；只有在排比是修辞时才保留（[[#rule-redundancy]]）。
- **撇开原文修改英语**，再对照原文检查。
:::

## 习题

::: exercise 分句之间的关系 {level=1}
说明每个分句与下一个分句的关系，然后翻译。(a) 他太累了，倒头就睡。 (b) 雨下得很大，我们还是去了。 (c) 你先走，我随后就到。
::: solution
(a) 原因 → 结果：*He was so tired that he fell asleep the moment he lay down.* (b) 让步：*It was raining hard, but we went anyway.* / *Despite the heavy rain, we still went.* (c) 先后：*You go ahead — I'll follow in a minute.*
:::
:::

::: exercise 为无主语分句补出主语 {level=1}
译成英语，补出主语。(a) 下周一开学。 (b) 禁止吸烟。 (c) 到了北京给我打个电话。
::: solution
(a) *School starts next Monday.* / *Term begins next Monday.* (b) *No smoking.*（英语标识也没有主语）/ *Smoking is prohibited.* (c) *Give me a call when you get to Beijing.*（祈使句，隐含主语 *you*）。
:::
:::

::: exercise 冠词和数 {level=1}
翻译，确定冠词和数。(a) 桌子上有本书。 (b) 书在桌子上。 (c) 我喜欢看书。 (d) 这家店卖书。
::: solution
(a) *There's a book on the table.*（新信息，不定指）(b) *The book is on the table.*（已知，定指）(c) *I like reading* / *I like reading books.*（类指）(d) *This shop sells books.*（复数类指）
:::
:::

::: exercise 分词短语 {level=2}
用分词短语翻译每个句子，并确保主语正确。(a) 她放下包，坐了下来。 (b) 这本书写于1920年代，至今仍有很多读者。 (c) 走出车站，我一眼就看见了他。
::: solution
(a) *Putting down her bag, she sat down.* (b) *Written in the 1920s, the book still has many readers today.* (c) *Coming out of the station, I saw him at once.*——*coming out* 的主语是 *I*，与主句相同。✗ *Coming out of the station, he was the first thing I saw* 就成了垂悬分词。
:::
:::

::: exercise 分主次，再重建 {level=2}
译成英语，每个句子一个主句：这家餐馆开了三十多年了，老板换过好几个，菜的味道一直没变，很多老顾客从城外专门开车过来吃。
::: solution
参考译文：*The restaurant has been open for more than thirty years. It has changed hands several times, but the food tastes just as it always did, and many regular customers drive in from outside the city specially to eat there.*——第一个分句单独成句（背景）；老板的更换和不变的味道用 *but* 连接（让步）；顾客专程前来是结果，用 *and* 加上。注意 *has been open* 和 *has changed hands* 用的是现在完成时。
:::
:::

::: exercise 简洁 {level=2}
为一本英文宣传册简洁地翻译：我校师资力量雄厚，教学设施先进，校园环境优美，是莘莘学子求学深造的理想场所。
::: solution
*With highly qualified teachers, modern facilities and a beautiful campus, our school is an ideal place to study.*——师资力量雄厚 → *highly qualified teachers*；“莘莘学子”和“求学深造”合并成 *to study*；四项并列结构变成一个 *with* 短语加一个主句。
:::
:::

::: exercise 翻译公司简介 {level=3}
不看参考译文，用你自己的方式翻译本课开头的那个公司句子，然后进行比较。写三句话，解释你对主句的选择，以及你如何处理“深受客户好评”。
::: hint
这个句子讲的是公司的历史、现在的规模，还是它的产品？网站的“关于我们”通常以公司现在做什么开头。
:::
::: solution
另一个可以接受的译文：*Established in 1998 beside West Lake, we are now a modern company covering research and development, manufacturing and sales, with customers in more than thirty countries across Europe, the Americas and beyond.* 解释：主句说明公司现在是什么（*we are now a modern company …*），成立时间和地点变成分词短语，出口变成 *with* 短语。“深受客户好评”被并入了 *with customers in …*，也可以单独成为一个短句（*Our customers rate our products highly*）；英文网站避免没有依据的好评说法，所以译者也可以与客户商量是否保留。注意“欧美”是 *Europe and North America*（或 *the Americas*），而不是 *Europe and America*。
:::
:::

::: exercise 一个叙述性段落 {level=3}
译成英语：那天晚上停电了，屋里一片漆黑。奶奶摸黑找出一根蜡烛点上，我们围着桌子坐着，听她讲她小时候的事。那是我记忆中最温暖的一个晚上。
::: solution
参考译文：*There was a power cut that evening, and the house was pitch dark. Grandma felt her way to a candle and lit it, and we sat round the table listening to her talk about her childhood. It is the warmest evening I can remember.*

说明：叙述用过去时，叙述者的感想用现在时（*It is the warmest evening I can remember*；也可以用 *was*）；摸黑找出……点上 → *felt her way to a candle and lit it*（两个并列的动词，其中一个是对应“摸黑”的英语短语动词习语）；坐着，听她讲 → *sat … listening to her talk*（用分词表示伴随动作）；屋里 → *the house*（英语选择整个家；也可以用 *the room*）。
:::
:::
