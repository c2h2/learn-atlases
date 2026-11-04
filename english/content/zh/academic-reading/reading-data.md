一份报纸报道：*New drug halves the risk of stroke.*（新药使中风风险减半。）这篇报道背后的研究论文说，在五年里，服用安慰剂的人每100人中有2人中风，而服用这种药物的人每100人中有1人中风，并且这一差异 *statistically significant (p = .01)*（统计上显著）。两种说法都是准确的。然而，读标题的人可能会以为现在一半的中风都可以预防了，而读论文的人知道，必须有100人服药五年，其中才有1人能免于中风——另外99人服药却毫无益处，也许还有一些副作用。数字是一样的；读者从中理解到的却不一样。

学术语篇用数字、表格和图来报告证据，而数字周围的文字对这些数字作出解释——有时很审慎，有时不然。本章建立在 [[reading-skills/numbers-and-charts]] 的基础上，那一章讲了百分比、百分点、表示变化的语言和简单的图表。这里我们读研究论文中的表格和图；用文字而不是公式来解释其中最常出现的统计量——平均数、标准差、相关、显著性、置信区间和效应量；相对风险和绝对风险；以及**数据评述**（data commentary）的语言，即作者告诉读者其数字意味着什么的那些句子。本章所有的数据都是示例性的。

## 研究论文中的表格和图

::: definition 表格、图和说明文字 {#def-table-figure}
在研究论文中，**表格**（table）以行和列呈现数字；**图**（figure）以视觉方式呈现数据（或示意图）：条形图、折线图、散点图、箱线图或地图。每个表格和图都有一个编号（*Table 2*、*Figure 3*）和一段说明它显示什么的**说明文字**（caption）或标题；表格下方常有**注**（notes），解释缩写、单位和符号（如用 * 表示 *p* < .05）。正文会提到它们（*see Table 2*；*as Figure 3 shows*），并评述它们最重要的特征。
:::

::: theorem 读表格或图 {#rule-read-table}
1. 读**标题或说明文字**以及任何**注**：测量的是什么，测量对象是谁，单位是什么？
2. 读**标签**：表格的行标题和列标题，或图的坐标轴和图例，包括**刻度**以及它从哪里开始。
3. 找出这个表格或图要显示的**比较**——通常是组与组之间、时间与时间之间，或条件与条件之间的比较。
4. 看差异的**大小**和**不确定性**：数字本身，以及任何标准差、误差线或置信区间。
5. 然后才读**正文**对它说了什么，并检查文字与数字是否相符。
:::

::: proof
表格或图是一个压缩的论证：它被选出来、设计出来就是为了显示某样东西，而正文告诉读者是什么。先读数据再读评述，可以让你先形成自己的看法，从而能注意到评述在何时有所选择、有所夸大或读错了。第1步和第2步防止最常见的错误——读错单位、组别或刻度。第4步之所以重要，是因为如果不了解个体数值的变化有多大，两个平均数之间的差异就说明不了多少问题；安斯库姆（Anscombe，1973）构造了四组著名的小数据集，它们的平均数、方差和相关几乎完全相同，画成图却截然不同，以此表明汇总数字不能代替查看数据本身。
:::

下面是一个示例表格，属于教育学论文结果部分常见的那一类。

**表2.** 各组在计划实施前后的阅读理解分数（满分50）（示例数据）

| 组别 | *n* | 实施前：*M*（*SD*） | 实施后：*M*（*SD*） | 变化 |
|---|---|---|---|---|
| 计划组 | 64 | 28.4 (6.1) | 33.9 (5.8) | +5.5 |
| 比较组 | 61 | 28.9 (6.4) | 31.2 (6.0) | +2.3 |

*注。* *M* = 平均数；*SD* = 标准差。两组之间变化量的差异在统计上显著，*p* = .004；*d* = 0.52。

::: example 读结果表格 {#ex-table}
读表2，用三句话说出它显示了什么。
::: solution
**第1步——说明文字和注。** 计划组和比较组在一项计划实施前后的阅读理解分数，满分50。*M* 是平均分；*SD* 是标准差（分数的分散程度）。

**第2步——标签。** *n* 是每组的学生人数：64和61。

**第3步——比较。** 计划实施前，两组的平均数相近（28.4和28.9）。两组都有提高；计划组提高了5.5分，比较组提高了2.3分。

**第4步——大小和不确定性。** 标准差约为6分，所以提高幅度的差异（5.5 − 2.3 = 3.2分）约为半个标准差——这正是 *d* = 0.52 所表示的。注中报告这一差异在统计上显著。

**用三句话说：** *The two groups started at a similar level. Both improved, but the programme group improved by 5.5 points and the comparison group by 2.3. The extra gain of about 3 points (out of 50) is statistically significant and moderate in size.* 表格没有告诉我们的是：学生是怎样分组的，这在方法部分里。
:::
:::

## 平均数和离散程度

::: definition 平均数、中位数和标准差 {#def-mean-sd}
**平均数**（mean，*M*）是各数值之和除以数值的个数。**中位数**（median，*Mdn*）是把数值按顺序排列后居中的那个值。**标准差**（standard deviation，*SD*）衡量各数值围绕平均数的分散程度：标准差小，说明大多数数值靠近平均数；标准差大，说明数值分布很广。当数值大致呈钟形（**正态**）分布时，约三分之二的数值落在平均数上下一个标准差之内，约95%落在两个标准差之内。
:::

当数据**偏斜**（skewed）——少数极大或极小的值把平均数拉离中间——时，平均数和中位数讲述的情况就不一样了。收入是标准的例子：少数很高的收入抬高了平均数，所以中位数通常更能反映典型的收入，许多报告两者都给出。当一篇语篇说 *the average* 时，通常指的是平均数；如果这一点很重要，就要核实。

::: widget distribution
title: 平均数和标准差
dist: normal
params: mu=60, sigma=10
a: 50
b: 70
caption: 示例考试分数，平均数为60，标准差为10。阴影区域从平均数以下一个标准差到平均数以上一个标准差（50到70），包含约68%的分数。改变 *sigma*，可以看到平均数相同、但更分散或更集中的一组分数；把 *a* 和 *b* 改为40和80，可以看到两个标准差之内约有95%。真实数据并不总是这样对称。
:::

::: quiz
在一项（虚构的）研究中，样本的月收入平均数是9800元，中位数是6500元。这最可能说明什么？
- [ ] 数据中有错误
- [x] 少数收入很高的人抬高了平均数
- [ ] 大多数人的收入超过9800元
- [ ] 平均数和中位数总是相差这么多
::: solution
当平均数远高于中位数时，分布向右偏斜：少数大的数值把平均数拉高了。样本中有一半人的收入低于6500元，所以大多数人的收入低于平均数。
:::
:::

## 相关

::: definition 相关系数 {#def-r}
**相关系数**（correlation coefficient，通常是皮尔逊 *r*）是一个介于 −1 和 +1 之间的数，衡量两个变量在多大程度上符合直线关系。*r* = +1 是完全的正相关，*r* = −1 是完全的负相关，*r* = 0 表示没有直线关系。它的平方 *r*² 常被报告为一个变量的变异中被另一个变量“解释”（在统计上说明）的比例。
:::

社会科学中的相关常常不大：*r* = .30 是两种人类特征之间一种真实而有意义的关系的常见大小，它让大部分变异（*r*² = .09，即9%）没有得到说明。当一篇语篇说 *X was strongly correlated with Y* 时，要找那个数字；还要记住 [[academic-reading/evaluating-sources#rule-causation]] 中所讲的：相关无论多强，本身都不能表明哪个变量影响了另一个，或者是否有任何影响。相关为零也需要小心：两个变量可能以曲线方式密切相关——例如，表现随唤醒水平上升到某一点后又下降——而 *r* 仍然接近0。

## 显著性、区间和效应量

这三个概念几乎出现在每一篇定量研究论文中。它们回答的是不同的问题，正确地读懂它们是学术阅读最有用的技能之一。

::: definition 统计显著性和 *p* 值 {#def-p}
**显著性检验**（significance test）要问的是：如果总体中实际上没有效应——即**零假设**（null hypothesis）——一个结果（差异、相关）是否很容易偶然出现。***p* 值**（*p*-value）是**在零假设为真的情况下**得到至少与观察结果一样极端的结果的概率。当 *p* 低于一个惯用的阈值（最常见的是 .05）时，结果被称为**统计上显著**（statistically significant）。
:::

::: definition 置信区间和效应量 {#def-ci-effect}
**置信区间**（confidence interval，CI）是根据样本计算出的一个数值范围，表示一个效应被估计得有多精确：*a difference of 3.2 points, 95% CI [1.1, 5.3]*。区间窄意味着估计精确；区间宽意味着很不确定。**效应量**（effect size）表示一个效应有多大，可以用原始单位（*3.2 points*、*26 minutes*）表示，也可以用标准化的量度表示，例如科恩的 ***d***（Cohen's *d*），即两个平均数之差除以它们的标准差。
:::

::: theorem 显著性能告诉你什么，不能告诉你什么 {#rule-significance}
1. *Significant* 的意思是**不太可能仅仅是偶然造成的**（按照惯用的检验）。它**并不**表示大、重要或有用。
2. *p* 值**不是**假设为真的概率，也不是结果由偶然造成的概率。
3. **不显著**并**不**表示*没有效应*：它可能表示研究规模太小，检测不出效应。
4. 样本足够大时，**极小**的效应也可能是显著的；样本小时，**很大**的效应也可能不显著。
5. 所以一定要找效应的**大小**及其**置信区间**，并问这么大的效应在实际中是否重要。
:::

::: proof
*p* 值是在假定没有效应的前提下计算出来的，所以它不可能是没有效应的概率。它既取决于效应的大小，也取决于样本的大小：同样小的差异，在40人的研究中得到一个大的 *p*，在40000人的研究中得到一个极小的 *p*。这就是为什么第3点和第4点成立，也是为什么单凭显著性无法告诉你一项发现是否重要。2016年，美国统计协会发表了一份关于 *p* 值的声明（Wasserstein & Lazar 2016），阐明了以下几点：*p* 值不衡量假设为真的概率，结论不应只根据 *p* 是否越过某个阈值来得出，*p* 值不衡量效应的大小或重要性。关于效应量，科恩（Cohen，1988）提出，在行为科学中没有更好依据时，*d* = 0.2、0.5 和 0.8 可以分别称为小、中、大；他提醒说这些标签是粗略的，如今许多领域都根据什么是典型的、什么在实际中重要来判断效应量。
:::

::: warning 把 *p* = .03 读成“97%的把握”
✗ *p* = .03, *so there is a 97% probability that the programme works.*

✗ *p* = .03, *so there is only a 3% chance that the result is due to chance.*

✓ *p* = .03: *if the programme had no effect, a difference this large or larger would appear in about 3% of studies like this one. The result is statistically significant at the .05 level; how large and how useful the effect is must be judged from the effect size and the confidence interval.*

这些误读很常见，甚至在已发表的论文和教科书中也有，因为正确的说法很拗口。关键在于 *if* 这个词：*p* 值假定没有效应，所以它不可能同时告诉你有效应的概率。
:::

::: example 显著但很小 {#ex-significant-small}
一项有20000名学生参加的示例性大型研究报告：*Students who used the online platform scored significantly higher on the final exam (M = 64.1) than those who did not (M = 63.6), p < .001.* 细心的读者应该得出什么结论？
::: solution
**显著性。** *p* < .001，表示如果在总体中使用者和非使用者完全没有差别，这么大的差异极不可能偶然出现。

**大小。** 差异是0.5分（64.1 − 63.6）。在满分100分的考试中，这非常小；没有标准差，我们无法计算 *d*，但半分不太可能对任何学生有影响。

**为什么显著？** 样本极大（20000人），所以即使极小的差异也能被可靠地检测出来。

**是因果吗？** *Used the platform* 暗示是学生自己选择的；积极性高的学生可能既使用平台，又考得更好。这项研究的设计很可能是观察性的。

**结论：** *There is a very small, statistically reliable difference in scores between users and non-users, which may not be caused by the platform and is too small to matter much in practice.* 原句中的 *significantly* 是准确的，但按日常意义来理解它的读者会被误导。
:::
:::

## 相对风险和绝对风险

::: definition 相对风险和绝对风险 {#def-risk}
**绝对风险**（absolute risk）是一个群体中出现某种结果的概率（*2 in 100*，*2%*）。**绝对风险降低**（absolute risk reduction）是两个绝对风险之差（*2% − 1% = 1 percentage point*）。**相对风险**（relative risk）以比值来比较两个风险（*1% ÷ 2% = 0.5*），**相对风险降低**（relative risk reduction）把差值表示为原有风险的一个比例（*a 50% reduction*）。**需治疗人数**（number needed to treat，NNT）是要使其中一人受益而必须接受治疗的人数（*1 ÷ 0.01 = 100*）。
:::

::: theorem 要找出绝对数字 {#rule-absolute}
当一篇语篇以百分比或比值报告风险的变化时（*halves the risk*、*a 30% increase*、*twice as likely*），要找出或算出变化前后的**绝对**风险。小风险的大幅相对变化是小的绝对变化；大风险的同样幅度的相对变化则是大的绝对变化。
:::

::: proof
相对量度对比较治疗方法和对研究者是有用的，因为一种治疗的相对效果在基线风险不同的人群中常常相似。但对于一个决定是否服药或改变某种习惯的人来说，重要的是绝对效果，而它取决于这种结果原本有多常见。没有基数的相对数字，与没有基数的百分比是同一个问题（[[reading-skills/numbers-and-charts#rule-base]]）。面向公众的报道常常只给出相对数字，因为它听起来更大。
:::

::: widget plot
title: 不同基线风险下的相同相对降低
f: x; (1-r)*x
x: 0, 20
y: 0, 20
sliders: r=0.5:0:1:0.05
labels: risk without treatment (%); risk with treatment (%)
shade: 0, 20
between: true
caption: 横轴是基线风险，从0%到20%；两条线分别是不治疗时的风险和接受一种能把风险降低比例 *r*（这里是50%）的治疗后的风险。阴影部分的差距就是绝对风险降低。基线为2%时，降低50%意味着每100人中挽救1人；基线为20%时，同样的相对降低意味着每100人中挽救10人。拖动滑块可以改变相对降低的比例。数字是示例性的。
:::

::: example 相对和绝对 {#ex-risk}
一项示例性研究报告说，某种习惯与一种罕见疾病的 *40% higher risk*（风险高出40%）相关。在没有这种习惯的人中，十年内每10000人有5人患这种病。有这种习惯的人的绝对风险是多少？绝对增加是多少？
::: solution
**基线绝对风险：** 每10000人中5人 = 0.05%。

**相对增加：** 5的40%是2，所以有这种习惯的人的风险是 5 + 2 = **每10000人中7人**（0.07%）。

**绝对增加：** 十年内每10000人中2人，即0.02个百分点。

**解释：** *40% higher* 是准确的，但绝对增加很小：在10000个有这种习惯的人中，十年内大约多出两个病例。而且这项研究报告的是关联，所以即使这两例也未必是由这种习惯导致的。要判断这一发现是否重要，读者需要两个数字，而一篇只给出 *40% higher* 的文章漏掉了更有用的那一个。
:::
:::

## 图以及图如何误导人

研究论文中的图通常是诚实的，但图的设计总会影响读者看到什么。有四个特征值得多看一眼：

- **纵轴。** 坐标轴从60而不是从0开始的条形图，会让62和65之间的差别看起来巨大。折线图常常不从零开始，这对显示变化是合理的，但在判断变化的大小之前要检查刻度。
- **误差线。** 表示标准差、标准误或置信区间的线条；说明文字应当说明是哪一种。两个平均数的95%置信区间大幅重叠时，它们之间并没有可靠的差异。
- **选定的范围。** 从某个特定年份开始的时间序列，可能使一个趋势看起来比在更长时期内更陡或更平。
- **散点图和离群值。** 一两个极端的点就可能制造出或掩盖一种相关。要看大多数点在哪里。

## 数据评述的语言

斯韦尔斯和费克（Swales and Feak，2012）描述了作者如何以一连串语步来评述数据：先是**定位陈述**（location statement），把读者引向表格或图（*Table 2 shows …*、*As can be seen in Figure 3, …*），接着是**突出陈述**（highlighting statement），挑出最重要的结果（*The most striking feature is …*），然后是对其意义的**讨论**，常常加以限制。作为读者，可以利用这些语步：

| 语步 | 典型语言 | 检查什么 |
|---|---|---|
| 定位 | *Table 2 presents*、*Figure 1 shows*、*as can be seen in* | 先看表格或图。 |
| 突出 | *notably*、*the largest increase*、*in particular*、*was significantly higher* | 被突出的结果是最重要的，还是最有利的？有什么没有提到？ |
| 比较和变化 | *rose sharply*、*declined slightly*、*remained stable*、*was twice as high as*、*exceeded* | 文字与数字相符吗？上升2%用 *sharply*？ |
| 解释 | *this suggests*、*may reflect*、*is consistent with*、*one explanation is* | 解释的限制恰当吗？考虑了其他可能吗？ |

::: example 文字与数字相符吗？ {#ex-words-numbers}
把这段评述与上面的表2相比较：*As Table 2 shows, the programme led to a dramatic improvement in reading, with programme students far outperforming the comparison group, who made little progress.*
::: solution
**定位陈述：** 准确（*As Table 2 shows*）。

**dramatic improvement：** 计划组在满分50分中提高了5.5分，比比较组多提高约3分，是中等大小的效应（*d* = 0.52）。*Dramatic* 夸大了它。

**far outperforming：** 计划实施后，两组的平均数是33.9和31.2——差异不到半个标准差。许多比较组学生的分数会高于许多计划组学生。*Far* 夸大了它。

**who made little progress：** 比较组提高了2.3分。这比计划组少，但并不是 *little*；表格显示两组都有提高。

**led to：** 一个因果动词。如果学生是随机分组的，它也许是合理的；单凭表格我们无从知道。

**相符的评述：** *As Table 2 shows, both groups improved, but the programme group gained more (5.5 vs 2.3 points); the difference was statistically significant and moderate in size (d = 0.52).*
:::
:::

::: note 英汉对比
- ***Times* 和“倍”。** *Three times as many* 表示 ×3。*Three times more* 在英语中有歧义：大多数作者的意思是 ×3，但有些读者理解为 ×4（原数加上三倍）。汉语的惯例更清楚——“增加到三倍”（×3）和“增加了两倍”（增加原数的两倍，也是 ×3）——所以无论朝哪个方向翻译都要核对基数，在自己的写作中最好用 *three times as many*。
- **百分比和百分点。** 从10%上升到15%，是上升了5个**百分点**（percentage points），也是上升了50**%**（per cent）。英语新闻常常把两者混淆；学术语篇不应如此。见 [[reading-skills/numbers-and-charts]]。
- **数字格式。** 英语用点号表示小数，用逗号分隔千位（*12,500.75*）；许多学术格式在不可能超过1的小数前省略零（*p* = .03，*r* = .45）。汉语的大数以“万”和“亿”为单位，英语以千（thousand）和百万（million）为单位：3.5亿 = *350 million*。
- **Significant 和“显著”。** 如 [[academic-reading/evaluating-sources]] 中所说，结果部分中的 *significant* 指统计上显著，而不是重要。
:::

::: history
数据图的历史比人们想象的要短。威廉·普莱费尔（William Playfair）的《商业与政治图集》（*Commercial and Political Atlas*，1786）首次用折线图和条形图来表示经济数据，后来又增加了饼图。主导研究论文的统计检验来自20世纪初；罗纳德·费希尔（Ronald Fisher）的《研究工作者的统计方法》（*Statistical Methods for Research Workers*，1925）大大推动了显著性检验以及把 .05 作为方便阈值的做法的传播，这一阈值后来变成了一条比费希尔本意更僵硬的规则。1954年，达莱尔·哈夫（Darrell Huff）的《统计数字会撒谎》（*How to Lie with Statistics*）向普通读者展示了图表和平均数如何误导人；1973年，弗朗西斯·安斯库姆（Francis Anscombe）的四组数据（Anscombe's quartet）向统计学家表明为什么数据必须画出来，而不能只做汇总。爱德华·塔夫特（Edward Tufte）的《定量信息的视觉显示》（*The Visual Display of Quantitative Information*，1983）提出了诚实的图形设计原则。2016年，美国统计协会关于 *p* 值的声明标志着一场关于滥用显著性检验的长期争论，这场争论仍在继续。
:::

## 下一步

数据是主张的证据（[[academic-reading/claims-and-evidence]]），它们在多大程度上可信，取决于它们是怎样收集的（[[academic-reading/evaluating-sources]]）。数据评述中有所限制的解释，要用 [[academic-reading/stance-and-hedging]] 中的工具来读。自己如何描写数据，在 [[essay-writing/describing-data]] 和 [[academic-writing/methods-results]] 中讲授；如何展示数据，在 [[presentations-and-discussion/visual-aids]] 中讲授。

::: summary
- 先读表格或图的**说明文字、注和标签**，找出比较，看差异的**大小**和**不确定性**，然后才读评述（[[#rule-read-table]]）。
- **平均数**可能被极端值拉偏；**中位数**是居中的值；**标准差**衡量离散程度（[[#def-mean-sd]]）。
- **相关系数** *r* 介于 −1 和 +1 之间；不大的数值很常见，而且相关不是因果（[[#def-r]]）。
- **显著**的意思是不太可能仅仅是偶然造成的，而不是大或重要；*p* 不是假设为真的概率；*不显著*不等于*没有效应*（[[#rule-significance]]）。
- 要找**效应量**和**置信区间**，以判断一个效应有多大、估计得有多精确。
- 在判断其重要性之前，把**相对**风险换算成**绝对**风险（[[#rule-absolute]]）。
- 在**数据评述**中，检查突出和比较的词语（*dramatic*、*far*、*led to*）是否与数字相符。
:::

## 习题

::: exercise 读表格 {level=1}
根据本章的表2：(a) 比较组有多少学生？(b) 计划实施后计划组的平均分是多少？(c) 计划实施前哪一组的标准差较大？(d) 比较组提高了多少分？
::: solution
(a) 61；(b) 33.9；(c) 比较组（6.4，计划组是6.1）；(d) 2.3。
:::
:::

::: exercise 平均数还是中位数？ {level=1}
对下面每一项，平均数和中位数哪一个更能反映典型值？为什么？(a) 一个城市的房价 (b) 一个样本中成年女性的身高 (c) 家庭拥有的书的数量，其中大多数家庭少于50本，少数家庭有几千本
::: solution
(a) 中位数——少数非常昂贵的房子抬高了平均数；(b) 两者都可以——身高大致对称，所以平均数和中位数很接近（通常用平均数）；(c) 中位数——分布被少数大型藏书严重拉偏。
:::
:::

::: exercise 绝对数字 {level=1 check="3"}
一种治疗把一种疾病的风险从6%降到3%。绝对风险降低是多少个百分点？
::: solution
**3**个百分点（6% − 3%）。相对风险降低是50%，需治疗人数是 1 ÷ 0.03 ≈ 33。
:::
:::

::: exercise 关于 *p* 的正误判断 {level=2}
判断每个陈述是对是错，并改正错的。(a) *p* = .20 表明这种治疗没有效果。(b) *p* = .001 的结果总是比 *p* = .04 的结果更重要。(c) 在非常大的样本中，非常小的效应也可能在统计上显著。(d) *p* = .05 意味着假设正确的概率是95%。
::: solution
(a) 错：它表明如果没有效应，这么大的差异并不罕见；这项研究可能只是规模太小。(b) 错：更小的 *p* 可能来自更大的样本，而不是更大或更重要的效应。(c) 对。(d) 错：*p* 假定零假设为真，无法给出假设正确的概率。
:::
:::

::: exercise 解释一个相关 {level=2}
一项示例性研究报告：*Hours of sleep correlated with exam scores, r = .25, p = .002, n = 150.* 写两个准确报告这一结果的句子，然后说出这一结果不能表明的一件事。
::: solution
范例：*Among 150 students, those who slept longer tended to have slightly higher exam scores (r = .25). The relationship was statistically significant but modest: sleep accounted statistically for only about 6% of the variation in scores (r² ≈ .06).* 它不能表明睡得更多**导致**分数更高（更有条理的学生可能既睡得多又学得多），也不能表明这种关系是直线关系。
:::
:::

::: exercise 改正这段评述 {level=2}
改写这段评述，使它与示例数据相符：*Figure 2 shows that average waiting time at the clinic fell dramatically after the new booking system, from 34 to 31 minutes.*
::: solution
*Figure 2 shows that average waiting time at the clinic fell slightly after the new booking system was introduced, from 34 to 31 minutes.* 下降3分钟（约9%）不是 *dramatic*。更审慎的版本还可以说明这一差异是否在统计上显著，以及同时是否有别的变化；*after* 并不能表明是这个系统导致了下降。
:::
:::

::: exercise 读一整段结果 {level=3}
读这段示例性的结果，并回答：(a) 主要比较是什么？(b) 效应有多大，估计得有多精确？(c) 最后一句有道理吗？

> *Participants in the walking group reported lower anxiety at eight weeks (M = 11.2, SD = 4.9) than those in the waiting-list group (M = 13.0, SD = 5.1), a difference of 1.8 points on a 40-point scale, 95% CI [0.2, 3.4], p = .03, d = 0.36. Walking is therefore an effective treatment for anxiety and should replace medication for most patients.*
::: hint
看置信区间的宽度，以及等候名单组得到了什么。然后把最后一句与数字相比较。
:::
::: solution
(a) 步行组与等候名单组（他们尚未得到任何治疗）在第八周时的焦虑分数。

(b) 在40分制量表上相差1.8分，是小到中等的效应（*d* = 0.36）。95%置信区间从0.2分到3.4分：真实的差异可能几乎为零，也可能接近估计值的两倍，所以估计不精确。它在统计上显著（*p* = .03）。

(c) 没有道理。数据显示的是步行相对于**不治疗**有一个不大的、估计不精确的优势，而不是相对于药物，药物并没有被检验。*effective treatment* 夸大了一个小效应，*should replace medication for most patients* 是一个关于这项研究没有做过的比较的政策主张。有道理的句子是：*Walking was associated with a modest reduction in anxiety compared with a waiting list; whether it compares well with established treatments was not tested.*
:::
:::

::: exercise 分析一张真实的图 {level=3}
在一篇研究论文、一份报告或一篇新闻报道中，找一张关于你熟悉的话题的图。运用 [[#rule-read-table]]，写出：(a) 它测量的是什么，单位是什么；(b) 纵轴从哪里开始，这是否影响它给人的印象；(c) 主要比较以及差异的大小；(d) 伴随它的文字描述得是否准确。提出一项能使这张图更诚实或更清楚的修改。
::: solution
答案取决于所选的图。好的答案准确地指出单位和组别，如果有截断的坐标轴或选定的时间范围，就会注意到，用数字（而不只是 *much higher* 这样的词）说明差异，把伴随的文字与数据相比较，并提出一项具体的修改——让条形图的坐标轴从零开始、加上误差线、显示更长的时期，或者标出单位。
:::
:::
