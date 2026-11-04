*I saw the man with the telescope.* 这个句子有两个意思。一个意思是我用望远镜看见了那个人；另一个意思是我看见的那个人拿着望远镜。词是一样的，词序也是一样的，而且 *saw*、*with*、*telescope* 本身都没有歧义。不同的是这些词怎样**组合**。在第一个意思中，*with the telescope* 和 *saw the man* 在一起：它说明我是怎样看见他的。在第二个意思中，它和 *the man* 在一起：它说明是哪一个人。换句话说，语法不是词排成一行的问题。句子有层级结构，两种结构可以共用同一串词。

本章讨论的就是这种结构。它介绍**成分**（constituent）的概念，语言学家用来找出成分的测试，短语的**范畴**（category）与**功能**（function）的区别，短语的各个部分（中心词、补足语、修饰语），以及展示短语如何构成的树形图。本章最后讨论歧义、另一种表示结构的方式（依存语法），并比较英语和汉语普通话的短语结构。学校语法中的分句成分——主语、动词、宾语、补语、状语——假定读者已从 [[core-grammar/sentence-patterns]] 中掌握，分句和复杂句的组成部分则见 [[complex-sentences/clause-structure]]。

## 成分

::: definition 成分 {#def-constituent}
**成分**（constituent）是在句子结构中作为一个单位起作用的一个词或一组词。成分是在成分内部构建的：在 *The old dog barked* 中，*old dog* 是一个成分，它位于更大的成分 *the old dog* 之内，而 *the old dog* 与 *barked* 一起构成整个句子。一个较大的成分直接切分出来的那些成分是它的**直接成分**（immediate constituents）：这个句子的直接成分是 *the old dog* 和 *barked*。
:::

布龙菲尔德在《语言论》（1933）中提出了直接成分分析法，韦尔斯（Rulon Wells）在1947年的一篇文章中发展了它。其思想很简单：一个句子切分为两个或更多部分，每个部分再切分，如此下去，直到词为止。难题在于怎样知道切分点在哪里。在 *The old dog barked* 中，为什么第一刀切在 *dog* 和 *barked* 之间，而不是 *old* 和 *dog* 之间？直觉这样告诉我们，但语言学需要任何人都能运用的测试，而且对于直觉不清楚的句子，这些测试也要给出相同的答案。

## 成分测试

::: theorem 成分的六种测试 {#rule-tests}
一串词如果能做到下面一项或几项而不改变句子的基本意义，它很可能就是一个成分。例子测试的是 *The children played football in the park on Sunday.* 中的词串。

1. **替代**（substitution，用代形式替换）。用一个词替换这串词——代词（*they*、*it*）、*there*、*then*、*one*，或者用 *do so* / *do it* 替换动词短语。✓ ***They*** *played football in the park on Sunday*（*the children*）。✓ *The children played football* ***there*** *on Sunday*（*in the park*）。✓ *The children* ***did so*** *on Sunday*（*played football in the park*）。
2. **移位**（movement，前置）。把这串词移到句首。✓ ***In the park**, the children played football on Sunday.* ✓ ***On Sunday**, the children played football in the park.* ✗ ***Football in**, the children played the park on Sunday.*
3. **分裂**（clefting）。把这串词放进 *It was ___ that …* 框架中。✓ *It was **football** that the children played in the park on Sunday.* ✓ *It was **in the park** that the children played football.* ✗ *It was **football in the** that the children played park.*
4. **并列**（coordination）。用 *and* 或 *or* 把这串词与另一串同类的词连接起来。✓ *The children played **football** and **cricket** in the park.* ✓ *The children played football **in the park** and **on the beach**.*
5. **省略**（ellipsis）。在能从语境中恢复的地方略去这串词。✓ *The children played football in the park, and the parents did __ too*（= *played football in the park*）。
6. **片段回答**（fragment answer）。单独用这串词回答一个问题。*Where did the children play football?* — ✓ ***In the park.*** *What did they do?* — ✓ ***Played football in the park.***（在非正式口语中）。
:::

::: proof
这些测试之所以有效，是因为语法规则涉及的是成分，而不是任意的词串。代词代替名词短语，所以能被 *they* 替换的词串表现得像名词短语；英语中把成分前置的规则移动的是整个短语；分裂框架的焦点位置上放一个短语；*and* 连接同类的单位。如果一串词通过了几项测试，它是一个单位的证据就很有力。

这些测试有其局限，好的分析了解这些局限。并不是每个成分都能通过每项测试：在标准英语中动词短语不能分裂（✗ *It was play football that the children did*），尽管在某些语境中可以前置（*They said they would win, and **win** they did*），而 *the* 这样的限定词根本不能用代形式替换。更严重的是，并列测试有时似乎显示出其他测试显示不出的成分：*Lin gave **Sam a pen** and **Kim a book*** 并列的是 *Sam a pen*，而它通不过替代测试和移位测试。这种**非成分并列**（non-constituent coordination）有不同的分析方式——分析为整个动词短语的并列，第二个动词短语中的动词被略去；或者看作支持更灵活结构的证据——它说明这些测试是需要权衡的证据，而不是一套机械的程序。卡尼（Carnie，2021）以及赫德尔斯顿和普勒姆（2002）都是本着这种精神对待这些测试的。
:::

::: example 运用测试 {#ex-tests}
在（a）*Mei wrote a letter to her sister* 和（b）*Mei sent a letter to her sister* 中，*a letter to her sister* 是一个成分吗？至少运用三项测试。
::: solution
**（a）*Mei wrote a letter to her sister.*** 按最自然的理解，这封信是写给她姐姐（妹妹）的。
- 替代：✓ *Mei wrote **it***（= *a letter to her sister*），只有当 *it* 包括 *to her sister* 时，这句话才仍然提到写给姐姐的那封信。
- 分裂：✓ *It was **a letter to her sister** that Mei wrote.*
- 片段回答：*What did Mei write?* — ✓ ***A letter to her sister.***
所以 *a letter to her sister* 是一个成分：一个内部含有 *to her sister* 的名词短语。（也可能有第二种理解，即 *to her sister* 在名词短语之外，如（b）。）

**（b）*Mei sent a letter to her sister.*** 这里 *send* 带两个补足语：寄出的东西和接收者。
- 替代：*Mei sent **it** to her sister* 是自然的代词形式，其中 *it* 只等于 *a letter*。? *Mei sent **it***，*it* = *a letter to her sister*，这就别扭了。
- 分裂：✓ *It was **to her sister** that Mei sent a letter*，它把两者分开了。
- 移位：✓ ***To her sister**, Mei sent a letter; to her brother, a postcard.*
- 片段回答：*Who did Mei send a letter to?* — ✓ ***(To) her sister.***
所以在（b）中，*a letter* 和 *to her sister* 是两个独立的成分，都是 *sent* 的补足语。同样的词与不同的动词搭配时结构不同，因为 *send* 选择一个接收者，而 *write* 不一定要选择。
:::
:::

## 范畴和功能

语法使用两种不同的标签，把它们混为一谈是句子分析中最常见的混乱来源。

::: definition 范畴和功能 {#def-category-function}
**范畴**（category）根据一个成分的内部结构说明它是哪一种单位：名词短语（NP）、动词短语（VP）、形容词短语（AdjP）、副词短语（AdvP）、介词短语（PP）、分句。**功能**（function）说明一个成分在它所属的较大单位中起什么作用：主语、宾语、表语性补足语、附加语（状语）、修饰语、限定语。范畴是**形式**的标签；功能是**关系**的标签。
:::

两者各自独立变化。一种范畴可以有多种功能，一种功能可以由不同的范畴来充当：

| 范畴 | 功能 | 例子 |
|---|---|---|
| NP | 主语 | ***The new manager** arrived.* |
| NP | 宾语 | *We met **the new manager**.* |
| NP | 表语性补足语 | *She is **the new manager**.* |
| NP | 附加语（时间） | *She arrived **last week**.* |
| PP | 主语 | ***After lunch** suits me.* |
| 分句 | 主语 | ***That she resigned** surprised us.* |
| AdjP | 表语性补足语 | *She seems **very capable**.* |

赫德尔斯顿和普勒姆（2002）比传统语法更严格地坚持这一区分，传统语法常常把两者混在一起（因为 *last week* 起副词的作用，就把它叫作“副词”）。他们的语法还有一个范畴，即**限定词**（determinative），用于 *the*、*a*、*this*、*some* 和 *every* 这样的词，并用**限定语**（determiner）表示这些词在名词短语中通常具有的功能——所有格名词短语也能充当这种功能（***the manager's** office*）。[[core-grammar/word-classes]] 中的学校术语在大多数情况下已经够用，但到了这个层次，对每个成分都问两个问题会有帮助：*它是什么？*以及*它在做什么？*

::: quiz
在 *She left **the next morning*** 中，黑体短语的范畴和功能是什么？
- [ ] 副词短语；附加语
- [x] 名词短语；时间附加语
- [ ] 名词短语；宾语
- [ ] 介词短语；附加语
::: solution
它的范畴是名词短语：它的中心词是名词 *morning*，带有限定词 *the* 和形容词 *next*，而且它可以作另一个句子的主语（*The next morning was cold*）。它的功能是时间附加语（状语）——说明她什么时候离开，它不是宾语，因为这里的 *leave* 不带宾语（比较 *She left the room*，其中 *the room* 是宾语）。把它叫作“副词短语”就把范畴和功能混淆了。
:::
:::

::: example 每个短语两个标签 {#ex-labels}
给出分句 *Last Friday the new students from Guilin gave their teacher a surprise party.* 中每个直接成分的范畴和功能。
::: solution
1. **找出动词**：*gave*，一个带两个宾语的动词（SVOO 句型，[[core-grammar/sentence-patterns#rule-seven]]）。
2. **找出主语**：动词前面那个与动词一致、在疑问句中会倒装的名词短语（*Did the new students from Guilin give …?*）：*the new students from Guilin*。范畴是 NP（中心词 *students*）；功能是主语。
3. **找出动词后面的成分**：*their teacher* 和 *a surprise party* 是两个名词短语。*Their teacher* 是接收者——功能是间接宾语；*a surprise party* 是给予的东西——功能是直接宾语。测试：*They gave **her** **one*** 把两者分别替换。
4. **剩下的成分**：*Last Friday*。范畴是 NP（中心词 *Friday*）；功能是时间附加语。它可以自由移动（*The new students … gave … a surprise party last Friday*），附加语通常都是这样。
5. **成分内部**：*from Guilin* 是一个 PP（范畴），作 *students* 的修饰语；*new* 是形容词，作修饰语；*the* 和 *their* 分别是限定词和物主代词，都作限定语；*surprise* 是名词，作 *party* 的修饰语。

这些标签显示了两类标签的独立性：在这里，名词短语充当了三种不同的功能（主语、宾语、附加语），而限定语功能由两种不同的范畴充当。
:::
:::

## 中心词、补足语和修饰语

每个短语都是围绕一个词构建的，这个词决定短语的范畴以及它的大部分表现。

::: definition 中心词、补足语和修饰语 {#def-head}
短语的**中心词**（head）是决定短语范畴、并且对短语来说必不可少的那个词：*a physics student from Lagos* 中的名词 *student*，*put the box on the shelf* 中的动词 *put*，*on the shelf* 中的介词 *on*，*very proud of her work* 中的形容词 *proud*。**补足语**（complement）是中心词所选择的依附成分——它补全中心词的意义，并且常常是中心词所要求的：*put* 的 *the box* 和 *on the shelf*；*proud* 的 *of her work*。**修饰语**（modifier，或**附加语**［adjunct］）是可有可无的依附成分，它增加信息，不是中心词所选择的：*very proud* 中的 *very*，*a student from Lagos* 中的 *from Lagos*。
:::

::: theorem 区分补足语和修饰语 {#rule-complement}
1. **选择。** 补足语由特定的中心词允准；修饰语几乎可以与该范畴的任何中心词搭配。*Put* 要求一个处所（✗ *She put the box*）；*in the morning* 几乎可以修饰任何动词。
2. **顺序。** 在英语中，补足语通常比修饰语更靠近中心词：✓ *a student **of physics** with long hair*，? *a student with long hair **of physics***。
3. ***do so* 测试。** *Do so* 连同补足语一起替换动词，但可以把修饰语留在外面：✓ *Kim read the report **in the morning**, and Lee did so **in the evening***（*in the morning* 是修饰语）。✗ *Kim put the book **on the shelf**, and Lee did so **on the table***（*on the shelf* 是 *put* 的补足语）。对名词来说，*one* 起同样的作用：✓ *the student with long hair and the one with short hair*；? *the student of physics and the one of chemistry*。
4. **叠加。** 修饰语可以层层叠加（*a student from Lagos with long hair in my class*）；一个中心词的每个补足语通常只带一次。
:::

::: proof
这一区分反映了这样一个事实：中心词带有要求。*put* 的词典条目必须说明它需要一个宾语和一个处所；*depend* 的条目必须说明它带一个以 *on* 引导的介词短语；*fond* 的条目必须说明它带一个以 *of* 引导的介词短语。这些要求是中心词意义的一部分，所以补足语靠近中心词，并且当 *do so* 或 *one* 这样的代形式代替中心词时，补足语也被包括在内。修饰语不是任何中心词条目的一部分，所以它们附加在较外层，并且可以重复。四条标准通常是一致的，但有些情况并不清楚：在 *She lives in Paris* 中，*in Paris* 是必需的（就这个意义而言，✗ *She lives*），因而表现得像补足语，尽管表示处所的介词短语通常是修饰语。常见英语动词的补足语模式见 [[verb-patterns/transitive-intransitive]] 和 [[verb-patterns/prepositional-verbs]]。
:::

::: quiz
在 *She put the vase on the table in the evening* 中，哪一个介词短语是 *put* 的**补足语**？
- [x] *on the table*
- [ ] *in the evening*
- [ ] 两个都是
- [ ] 两个都不是
::: solution
*Put* 要求一个处所：✗ *She put the vase in the evening.* *do so* 测试也一致：✓ *She put the vase on the table in the evening, and he did so in the morning* 把 *in the morning* 留在外面，但 ✗ *… and he did so on the shelf* 不成立，因为 *do so* 已经包括了处所补足语。*In the evening* 是修饰语。
:::
:::

## 树形图和短语结构规则

测试所揭示的结构可以用**树形图**（tree）来表示：每个成分是一个节点，标上它的范畴，并用线条把它与它的直接成分连接起来。方括号在一行文字中表示同样的东西：[S [NP the children ] [VP played [NP football ] [PP in [NP the park ] ] ] ]，范畴写在每个左括号的紧后面——不过从这里开始我们用树形图，因为它更容易读。

一部语法可以用一小组**短语结构规则**（phrase structure rules）来描写一种语言的所有树形图，这些规则说明每个范畴可以由什么组成。一组简化的英语规则：

| 规则 | 读作 | 例子 |
|---|---|---|
| S → NP VP | 一个分句由一个名词短语和一个动词短语组成 | *the children* + *played football* |
| NP → (Det) (AdjP) N (PP) | 一个 NP 有一个名词中心词，可以带一个限定词、一个中心词前的形容词短语和一个中心词后的介词短语 | *the* + *old* + *man* + *with a stick* |
| VP → V (NP) (NP) (PP) | 一个 VP 有一个动词中心词，最多带两个 NP 和一个 PP | *gave* + *Sam* + *a book* + *on Monday* |
| PP → P NP | 一个 PP 有一个介词中心词和一个 NP 补足语 | *in* + *the park* |
| AdjP → (AdvP) Adj (PP) | 一个 AdjP 有一个形容词中心词 | *very* + *proud* + *of her work* |

圆括号表示可有可无的成分。这些规则是简化的——真实的英语 NP 可以有几个修饰语，VP 可以用分句作补足语，等等——但它们已经显示出一个本质特性：NP 的规则和 PP 的规则互相引用。PP 包含 NP，NP 又可以包含 PP，所以一个可以一次又一次地放进另一个里面：*the book [ on the table [ in the room [ at the end [ of the corridor ] ] ] ]*。这就是**递归性**（recursion，[[linguistics/what-linguistics-studies#rule-design-features]]），也是一部有限的语法能够描写无限数量的句子的原因。

::: theorem 短语共有一种形状 {#rule-xbar}
在英语中，不同范畴的短语是按照一个共同的模式构建的：

1. **中心词**首先与它的**补足语**结合；
2. **修饰语**加在这个单位之外，并且可以重复；
3. 有些短语在最外缘有一个**标志语**（specifier）——NP 的限定词（*the*），某些分析中 AdjP 的程度词（*so*），分句的主语；
4. 在英语中，每个范畴的中心词都位于其补足语**之前**：动词在宾语之前（*read books*），介词在其 NP 之前（*on Monday*），名词在其 PP 补足语之前（*students of physics*），形容词在其 PP 之前（*proud of her*）。
:::

::: proof
所有短语共有一种结构的观点由乔姆斯基（1970）提出，并由杰肯道夫（Ray Jackendoff）在《X 杠句法》（*X-bar Syntax*，1977）中加以完善；它被称为 **X 杠理论**（X-bar theory），因为中心词与完整短语之间的中间层次是在范畴字母上面加一条横杠来表示的（X̄）。在生成语法中，它概括了各范畴之间的平行关系：*destroy the city* 和 *the destruction of the city* 具有相同的中心词–补足语关系。第4点是一个关于英语的事实，它有类型学的一面。格林伯格（1963）观察到，动词–宾语语序的语言倾向于使用前置词，宾语–动词语序的语言倾向于使用后置词（日语 *Tōkyō ni*“东京 到”）；德赖尔（Matthew Dryer，1992）在六百多种语言的样本中证实了许多这样的相关性。语言倾向于一贯地中心词在前或中心词在后，尽管很少有语言是完全一贯的——而且正如下面关于汉语的注所显示的，普通话是一个有趣的混合情况。其他理论框架不用横杠来描写同样的平行关系：赫德尔斯顿和普勒姆（2002）对每个短语都使用中心词、补足语、修饰语和限定语这些功能，构式语法则把它们看作储存的模式之间的相似性。
:::

## 结构歧义

现在可以分析本章开头的句子了。*I saw the man with the telescope* 有两棵树。

::: widget graph
title: 解读1：*with the telescope* 修饰“看”
nodes: S@0,6; NP I@-4,4; VP@2,4; V saw@-1,2; NP the man@2,2; PP with the telescope@5,2; P with@4,0; NP the telescope@6,0
edges: S>NP I; S>VP; VP>V saw; VP>NP the man; VP>PP with the telescope; PP with the telescope>P with; PP with the telescope>NP the telescope
caption: 在第一种解读中，PP 是动词的依附成分：它是 VP 的一个直接成分，与宾语 *the man* 并列。它说明“看”是怎样进行的。测试：*I saw him with the telescope*——代词 *him* 只替换 *the man*，PP 留在它外面。
:::

::: widget graph
title: 解读2：*with the telescope* 修饰 *the man*
nodes: S@0,6; NP I@-4,4; VP@2,4; V saw@-1,2; NP the man with the telescope@3,2; Det the@1,0; N man@3,0; PP with the telescope@5,0
edges: S>NP I; S>VP; VP>V saw; VP>NP the man with the telescope; NP the man with the telescope>Det the; NP the man with the telescope>N man; NP the man with the telescope>PP with the telescope
caption: 在第二种解读中，PP 在名词短语内部，作 *man* 的修饰语：拿着望远镜的那个人。测试：*I saw him*——现在 *him* 替换了整个 *the man with the telescope*。比较这两棵树：同样的词，同样的顺序，附着在不同的位置上。拖动节点，把它们并排比较。
:::

::: definition 结构歧义和词汇歧义 {#def-ambiguity}
如果一个句子中的词可以用不止一种方式组合成成分，每种组合给出不同的意义，这个句子就有**结构歧义**（structurally ambiguous）：*I saw the man with the telescope*、*old men and women*、*the French history teacher*。如果句子中有一个词有两种意义，而结构上没有差别，这个句子就有**词汇歧义**（lexically ambiguous）：*She went to the bank*（“河岸”或“银行”）。
:::

::: example 两种结构 {#ex-ambiguity}
用方括号表示法给出下面每个短语的两种结构，并解释每种意义。

1. *old men and women*
2. *the French history teacher*
3. *Visiting relatives can be boring.*
::: solution
1. [ old [men and women] ]——男人和女人都老；[ [old men] and women ]——只有男人老。并列测试有帮助：*old men and young women* 迫使采用第二种结构。
2. [ French [history teacher] ]——一位法国籍的历史老师；[ [French history] teacher ]——一位教法国史的老师。在口语中重音常常不同：第二种意思说 *the French ˈhistory teacher*，第一种意思说 *the ˈFrench history teacher*，甚至两个词都重读。
3. [ [visiting] [relatives] ] 作为一个 NP，*visiting* 是修饰语——“来访的亲戚”；[ visiting [relatives] ] 作为一个非限定分句，*relatives* 是 *visiting* 的宾语——“去看望亲戚”。一致测试可以把两者分开：*Visiting relatives **are** boring*（复数 NP，第一种理解）与 *Visiting relatives **is** boring*（分句，第二种理解）。情态动词 *can* 不显示一致，这就是这个句子有歧义的原因。
:::
:::

::: warning 横穿成分的括法
分析句子时，绝不要画出把短语与其中心词割裂开的括号。✗ [ The children played ] [ football in the park ]：*the children played* 不是一个成分（它通不过替代、移位和分裂测试），而 *football in the park* 只有在“公园属于足球”这种不太可能的理解中才是一个成分。✓ [ The children ] [ played football in the park ]：主语 NP 和 VP。在英语中，陈述分句的第一刀几乎总是切在主语和其余部分之间。
:::

## 表示结构的另一种方式：依存关系

短语结构不是表示句子结构的唯一方式。**依存语法**（dependency grammar）由泰尼埃（Lucien Tesnière）在《结构句法基础》（*Éléments de syntaxe structurale*，在他去世后于1959年出版）中提出，它把结构表示为词与词之间的关系。除了一个词（主要动词，称为**根**［root］）之外，每个词都恰好依存于另一个词，即它的中心词，并且这些关系都带有标签：在 *The children played football* 中，*children* 作为主语依存于 *played*，*football* 作为宾语依存于 *played*，*the* 作为限定语依存于 *children*。没有短语节点；一个短语就是一个中心词加上依存于它的一切成分。

两种表示法所承载的信息大部分相同。依存结构中的中心词对应于树形图中短语的中心词，一个词连同它的全部依存成分对应于一个成分。依存结构在计算语言学中很流行，**通用依存**（Universal Dependencies）项目（始于2014年）已经用一套共同的关系标注了一百多种语言（其中包括汉语普通话）的语料库——这使得比较成为可能，例如比较各种语言把宾语放在动词之后的频率。短语结构树在大多数句法教科书中仍是标准，因为它们清楚地显示中间单位和附着歧义。两者都不是“真正的”结构：它们是两种表示法，各自适合于不同的问题。

::: example 一个依存分析 {#ex-dependency}
给出 *My sister bought a very old bicycle* 中每个词的中心词，并说明哪个词是根。
::: solution
- *bought* 是**根**：它不依存于任何词。
- *sister* → *bought*（主语）。
- *My* → *sister*（限定语）。
- *bicycle* → *bought*（宾语）。
- *a* → *bicycle*（限定语）。
- *old* → *bicycle*（修饰语）。
- *very* → *old*（形容词的修饰语）。

树形图中的每个短语都可以恢复：*bicycle* 加上它的全部依存成分得到 *a very old bicycle*，即宾语 NP；*old* 加上它的依存成分得到 AdjP *very old*。
:::
:::

::: note 英汉对比
在短语结构的若干方面，普通话和英语是一致的：两者基本上都是主语–动词–宾语语序，而且动词都在宾语之前（读书）。它们在名词短语上差别很大。在普通话中，**所有修饰语都在名词之前**，包括英语放在名词之后的那些：桌子上的书 *‘the book on the table’*，我昨天买的书 *‘the book (that) I bought yesterday’*。助词“的”标出修饰语和中心词之间的界限。英语允许短的修饰语放在名词之前（*the new book*），但把介词短语和关系从句放在名词之后（[[nouns-and-articles/noun-phrases#rule-postmodifiers]]）。德赖尔（1992）指出，普通话的这种组合——动宾语序，但关系从句在名词之前——在世界语言中非常罕见；大多数 VO 语言像英语一样把关系从句放在名词之后。普通话表示状语的介词短语也放在动词之前（在公园踢足球 *‘play football in the park’*），而英语放在动词之后。

普通话还有一种英语所没有的成分：**数词–量词**（numeral–classifier）序列。在“三本书”中，量词“本”（用于装订成册的书本）必须出现在数词和名词之间。成分测试表明“三本”是一个单位：它可以单独作为片段回答（你要几本？——三本），而且名词已知时可以略去（那三本很贵）。英语在度量短语中有部分相似之处（*three loaves of bread*，*two pieces of advice*），不可数名词需要这类短语；而普通话中每个名词在计数时都需要量词。李讷和汤普森（1981）描写了量词系统，[[linguistics/semantics]] 将考察量词的意义。

对学习者来说，实际的后果是翻译中长修饰语的“倒置”，[[nouns-and-articles/noun-phrases#ex-chinese-order]] 对此进行了练习：汉语中带“的”的长前置修饰语，在英语中通常变成名词之后的介词短语或关系从句。
:::

::: quiz
在 *The man in the blue coat is waiting outside* 中，哪一串词是一个**成分**？
- [ ] *man in the*
- [ ] *coat is waiting*
- [x] *the man in the blue coat*
- [ ] *blue coat is*
::: solution
*The man in the blue coat* 可以被 *he* 替换，可以分裂（*It is the man in the blue coat who is waiting*），也可以作片段回答（*Who is waiting outside?* — *The man in the blue coat*）。它是主语 NP。其他词串都横跨短语边界，每项测试都通不过。
:::
:::

::: history
直接成分分析是美国结构主义语言学的核心方法，从布龙菲尔德（1933）经韦尔斯（1947）到哈里斯（Zellig Harris）。乔姆斯基的《句法结构》（1957）使它形式化：**短语结构语法**（phrase structure grammar）是一组像 S → NP VP 这样的改写规则，乔姆斯基认为仅靠这样的规则不足以描写英语，还需要用转换来补充（[[linguistics/clauses-movement]]）。树形图本身在20世纪60年代成为标准的表示法。X 杠理论（Chomsky 1970；Jackendoff 1977）把这些规则推广到各个范畴。与此同时，依存语法从泰尼埃（1959）开始在欧洲发展起来；功能语法，如韩礼德（Michael Halliday）的系统功能语法，则按照功能——主语、过程、参与者——而不是按照树的形状来分析分句。今天最常用的英语描写语法，夸克等（Quirk et al.，1985）以及赫德尔斯顿和普勒姆（2002），都使用带功能标签的成分结构，把两种传统结合了起来。
:::

## 后续内容

下一章 [[linguistics/clauses-movement]] 考察结构之间的关系：疑问句、被动句和关系从句，以及句法理论怎样为它们建立模型。复杂句结构的实际运用在 [[complex-sentences/clause-structure]] 及其后的几课中讲授；名词短语见 [[nouns-and-articles/noun-phrases]]；动词的补足语见《动词句型》（*Verb Patterns*）课程。成分结构怎样影响意义，例如在量化词辖域方面，是 [[linguistics/semantics]] 的内容；读者在阅读时怎样处理歧义属于心理语言学，[[linguistics/what-linguistics-studies#def-acceptability]] 中略有涉及。

::: summary
- 句子有**层级结构**：词组合成**成分**，成分再组合成更大的成分；当一串词有两种组合方式时，就产生**结构歧义**。
- **成分测试**——替代、移位、分裂、并列、省略、片段回答——是证明单位的证据；它们可能不一致，尤其是并列测试。
- 区分**范畴**（NP、VP、AdjP、AdvP、PP、分句）和**功能**（主语、宾语、补足语、附加语、修饰语、限定语）。
- 每个短语都有一个**中心词**；**补足语**由中心词选择，离中心词较近；**修饰语**可有可无，位于外层，可以重复（*do so* 测试和 *one* 测试）。
- **短语结构规则**生成树形图，由于 NP 和 PP 可以互相包含，这些规则是**递归的**。X 杠理论表述了一种共同的形状；英语是中心词在前的语言。
- **依存语法**把同样的信息表示为词与词之间的中心词–依存成分关系。
- 普通话像英语一样是 VO 语序，但把包括关系从句在内的所有名词修饰语都放在名词之前，并使用**数词–量词**成分。
:::

## 习题

::: exercise 找出中心词 {level=1}
给出每个短语的中心词和范畴：（a）*extremely tired of waiting*；（b）*the lid of the box*；（c）*right behind the door*；（d）*has been sleeping*；（e）*quite quickly*。
::: solution
（a）*tired*，AdjP。（b）*lid*，NP。（c）*behind*，PP（*right* 是修饰语）。（d）*sleeping* 是实义动词；大多数分析把整体看作一个 VP，其结构包括助动词 *has* 和 *been*；有些分析（包括赫德尔斯顿和普勒姆）把每个助动词看作它自己的 VP 的中心词，以下一个 VP 作补足语。（e）*quickly*，AdvP。
:::
:::

::: exercise 范畴和功能 {level=1}
给出每个黑体短语的范畴和功能。

1. ***Last summer** was very hot.*
2. *We went to Xi'an **last summer**.*
3. *He seems **unhappy about the result**.*
4. *They elected **her** chair.*
::: solution
1. NP，主语。
2. NP，时间附加语。
3. AdjP，表语性补足语（*seems* 的）。
4. NP（一个代词），宾语；*chair* 是一个 NP，作宾语的表语性补足语（SVOC 句型）。
:::
:::

::: exercise 运用一项测试 {level=1}
用替代测试说明在 *I left my keys in the drawer* 中，*in the drawer* 是一个成分，而 *my keys in* 不是。
::: solution
*In the drawer* 可以被 *there* 替换：✓ *I left my keys there.* 没有哪个单词能替换 *my keys in*：✗ *I left it the drawer* 不合语法，也没有哪个代形式能代替一个名词短语加一个介词。移位测试也证实了这一点：✓ *In the drawer, I left my keys*（在对比中），但 ✗ *My keys in, I left the drawer.*
:::
:::

::: exercise 补足语还是修饰语？ {level=2}
黑体的介词短语是补足语还是修饰语？使用 [[#rule-complement]] 中的一项测试。

1. *She relied **on her colleagues**.*
2. *She worked **on Saturday**.*
3. *a teacher **of English***
4. *a teacher **from Chengdu***
::: solution
1. 补足语：*rely* 选择一个以 *on* 引导的介词短语；*do so* 不能把它留在外面：✗ *She relied on her colleagues, and he did so on his friends.*
2. 修饰语：✓ *She worked on Saturday, and he did so on Sunday.*
3. 补足语：*of English* 说明教的是什么；? *the teacher of English and the one of maths* 很别扭，顺序测试也一致（*a teacher of English from Chengdu*，而不是 ? *a teacher from Chengdu of English*）。
4. 修饰语：✓ *the teacher from Chengdu and the one from Harbin.*
:::
:::

::: exercise 消除歧义 {level=2}
每个句子都有结构歧义。给出两种意义，并写出只有一种意义的句子。

1. *We discussed the problem with the manager.*
2. *She hit the man with a stick.*
3. *The girl saw a boy in the library with a camera.*
::: solution
1. “我们和经理讨论了这个问题”（PP 修饰 VP）/“我们讨论了经理的问题”（PP 在 NP 内部）。无歧义的说法：*We and the manager discussed the problem* / *We discussed the manager's problem.*
2. “她用棍子打了他”/“她打了那个拿着棍子的人”。无歧义的说法：*She used a stick to hit the man* / *She hit the man who was holding a stick.*
3. 至少有三种理解：女孩拿着相机，男孩拿着相机，或者图书馆有相机（一个装有摄像头的图书馆）。通过改写消除歧义：*In the library, the girl saw a boy who had a camera*，等等。
:::
:::

::: exercise 画一棵树 {level=2}
为 *The students from Dalian read a long report on Monday.* 画一棵树（画在纸上，或者仿照本章的样式画成一个 `graph` 图）。使用范畴 S、NP、VP、PP、Det、AdjP 或 Adj、N、V 和 P，并论证两个介词短语的附着位置。
::: solution
S → NP [the students from Dalian] + VP [read a long report on Monday]。
- NP：Det *the* + N *students* + PP *from Dalian*（P *from* + NP *Dalian*）。这个 PP 在 NP 内部，因为它确认是哪些学生：✓ *They read a long report*（其中 *they* = *the students from Dalian*）。
- VP：V *read* + NP [Det *a* + Adj *long* + N *report*] + PP [P *on* + NP *Monday*]。*On Monday* 作为时间修饰语附着于 VP：✓ *The students from Dalian did so on Monday*；按自然的理解，它不能在 NP *a long report* 内部，因为报告不是“在星期一”。（如果理解为报告是*关于*星期一的，就要把它放在 NP 内部——原则上这个句子是有歧义的。）
:::
:::

::: exercise 不一致的测试 {level=3}
在 *Li Na gave Sam a pen and Kim a book* 中，并列测试表明 *Sam a pen* 是一个成分。对 *Sam a pen* 运用另外两项测试，说明其中的冲突，并描述一部语法解决这一冲突的两种方式。
::: hint
试试替代和前置。然后想一想后半部分可能有什么没有说出来。
:::
::: solution
*Sam a pen* 通不过替代测试（没有代形式能替换它：✗ *Li Na gave it*，其中 *it* = *Sam a pen*）和移位测试（✗ *Sam a pen, Li Na gave*），也不能作为某一个问题的片段回答。所以并列测试与其他测试相冲突。

解决办法1（省略）：这个句子是两个 VP 的并列，即 *gave Sam a pen* 和 *gave Kim a book*，第二个 VP 中的动词被略去了——在某些分析中这种省略叫作**空缺**（gapping）。这样，被并列的其实还是成分，各项测试是一致的。

解决办法2（灵活的成分结构）：有些语法，如组合范畴语法（Combinatory Categorial Grammar），允许 *Sam a pen* 是一种不那么明显的成分，于是并列显示的是真实但不寻常的单位，其他测试无法察觉它们。

好的答案会说明这些测试是需要权衡的证据，而在两种分析之间作出选择取决于理论的其他承诺。
:::
:::

::: exercise 一个汉语名词短语的英译 {level=3}
把普通话名词短语“那三位从北京来的年轻老师”分析为各个部分（指示词、数词、量词、修饰语、中心词），译成自然的英语，并用100–150词解释两种语言中各部分的顺序有什么不同以及为什么不同。
::: solution
各部分：那（指示词 *‘that/those’*）+ 三（数词）+ 位（用于人的量词，表示礼貌）+ 从北京来的（关系修饰语，*‘who come/came from Beijing’*，由“的”标记）+ 年轻（形容词 *‘young’*）+ 老师（中心名词 *‘teacher’*）。

英语：*those three young teachers from Beijing*。

解释（范文）：*In both languages the determiner and the numeral come first and the head noun has its adjective immediately before it (*young teachers*, 年轻老师). The difference is the modifier ‘from Beijing’: Mandarin puts every modifier before the noun, so the relative modifier with 的 comes between the classifier and the adjective, while English puts a PP after the noun. English also has no classifier: the plural *-s* on* teachers *and the numeral are enough. Mandarin's order follows its general rule for noun phrases (modifier before head); English follows its rule that short modifiers precede the noun and phrasal ones follow it. A literal order (✗* those three from Beijing young teachers*) is impossible in English.*
:::
:::
