“模型有$94\%$准确”既可能是天大的好消息，也可能毫无意义，还可能是一场伪装起来的灾难。当$94\%$的样例都属于同一个类别，以至于一个永远回答“不”的模型也能得同样的分数时，这个数毫无意义；当它做错的$6\%$偏偏是要紧的场合时，它就是灾难；而要是测试集很小，或者曾用它来挑选模型，那连$94\%$都未必靠得住。评测正是[[ml-fundamentals/generalisation]]中的统计严谨落到实处的地方：选择度量真正要紧之处的**指标**，检查预测概率靠不靠得住（**校准**），给每个数字附上**不确定性**，并以换一批新样本也站得住的方式**比较**模型。

本章发展分类器的标准工具箱——混淆矩阵、精确率与召回率、ROC曲线及其下面积、恰当评分规则与校准、置信区间与配对检验——最后以回归与语言模型的指标收尾。用到的统计工具（标准误差、置信区间、配对比较）已在[[math-for-ml/estimation#sec-evaluation]]引入，这里系统地加以运用。数学图谱中[置信区间](/learn/maths/lesson.php?c=statistics&l=confidence-intervals)与[假设检验](/learn/maths/lesson.php?c=statistics&l=hypothesis-testing)两课给出背景，而大语言模型的评测专门是[[evaluation]]的主题。

## 混淆矩阵 {#sec-confusion}

对二元分类器，把一个类别称为**阳性**（垃圾邮件、疾病、有害内容、正确答案），另一个称为**阴性**。每个预测都落入四格之一。

::: definition 混淆矩阵与导出指标 {#def-confusion}
在带标签的测试集上，令TP、FP、FN、TN分别计数**真阳性**（预测为阳性、确实为阳性）、**假阳性**、**假阴性**与**真阴性**的个数；四者之和为$n$。于是：

- **准确率** $= (\mathrm{TP} + \mathrm{TN})/n$，错误率 $= 1 -$ 准确率；
- **精确率**（阳性预测值） $= \mathrm{TP}/(\mathrm{TP} + \mathrm{FP})$：被预测为阳性的里面，真的是阳性的比例；
- **召回率**（灵敏度、真阳性率，TPR） $= \mathrm{TP}/(\mathrm{TP} + \mathrm{FN})$：真的是阳性的里面，被找出来的比例；
- **特异度**（真阴性率） $= \mathrm{TN}/(\mathrm{TN} + \mathrm{FP})$，**假阳性率** $\mathrm{FPR} = 1 -$ 特异度；
- **F1 分数** $= 2\cdot\text{精确率}\cdot\text{召回率}/(\text{精确率} + \text{召回率})$：两者的调和平均。
:::

精确率与召回率回答的是不同的问题——“模型报警的时候，有多大概率报对了？”与“该报警的事情里面，它抓到了多少？”——而且相互牵制：什么都标记的分类器召回率为$1$，精确率等于基率；只标记自己最有把握的那一个样例的分类器，精确率可以是$1$，召回率却接近$0$。F1里的调和平均只要两者之一很小就会很小，所以F1奖励均衡；它把真阴性完全撇在一边，这正适合搜索或信息抽取一类问题——那里阴性大量存在又无趣。

::: example 读一个混淆矩阵 {#ex-confusion}
一个分类器在$2000$个样例上测试，计数为$\mathrm{TP} = 205$、$\mathrm{FP} = 101$、$\mathrm{FN} = 287$、$\mathrm{TN} = 1407$（这些数来自[[#sec-code]]的清单）。计算准确率、精确率、召回率、特异度与F1，以及一个总是预测阴性的分类器的准确率。
::: solution
阳性共有$205 + 287 = 492$个（占$24.6\%$）。准确率为$(205 + 1407)/2000 = 0.806$；精确率$205/306 = 0.670$；召回率$205/492 = 0.417$；特异度$1407/1508 = 0.933$；F1 $= 2\cdot0.670\cdot0.417/(0.670 + 0.417) = 0.514$。总是预测阴性可得准确率$1508/2000 = 0.754$，只低$5$个百分点，召回率却是$0$。这个模型找到的阳性还不到一半：这能不能接受，完全取决于漏掉一个阳性的代价有多大。
:::
:::

### 基率 {#sec-base-rates}

召回率与特异度刻画的是分类器在每个类别*内部*的行为，所以不依赖各类别有多常见。精确率则强烈依赖。

::: proposition 精确率依赖流行率 {#prop-precision}
设$\pi$为阳性的比例（**流行率**或基率）。一个真阳性率为$\mathrm{TPR}$、假阳性率为$\mathrm{FPR}$的分类器，其期望精确率与期望准确率为

$$
\text{精确率} = \frac{\mathrm{TPR}\cdot\pi}{\mathrm{TPR}\cdot\pi + \mathrm{FPR}\cdot(1 - \pi)},\qquad\text{准确率} = \mathrm{TPR}\cdot\pi + (1 - \mathrm{FPR})(1 - \pi).
$$
:::

::: proof
精确率是$\Prob(y = 1\mid\hat y = 1)$。由贝叶斯公式（[[math-for-ml/probability#thm-bayes]]），它等于$\Prob(\hat y = 1\mid y = 1)\Prob(y = 1)/\Prob(\hat y = 1)$，其中由全概率公式$\Prob(\hat y = 1) = \mathrm{TPR}\cdot\pi + \mathrm{FPR}\cdot(1 - \pi)$。准确率是$\Prob(\hat y = y) = \Prob(\hat y = 1\mid y = 1)\pi + \Prob(\hat y = 0\mid y = 0)(1 - \pi)$。
:::

::: example 罕见病的一个好检测 {#ex-rare}
一个筛查分类器的灵敏度为$0.95$、特异度为$0.95$，被筛查人群中这种病的流行率为$1\%$。阳性结果里面有多大比例是真的？
::: solution
由[[#prop-precision]]，精确率 $= 0.95\cdot0.01/(0.95\cdot0.01 + 0.05\cdot0.99) = 0.0095/0.059 = 0.161$。尽管分类器在两个类别上都“$95\%$准确”，六个阳性结果里倒有五个是误报。用自然频次来说：$10{,}000$人中有$100$人患这种病，其中$95$人检测呈阳性；$9900$个未患病者中也有$495$人呈阳性。同一个分类器放在流行率$50\%$的人群中，精确率就是$0.95$。
:::
:::

::: widget bayes
mode: test
prevalence: 0.01
sensitivity: 0.95
specificity: 0.95
caption: 筛查例子[[#ex-rare]]的自然频次视图。调高流行率，精确率便迅速攀升，灵敏度与特异度都不变；把特异度从$0.95$调到$0.99$，精确率大约增至三倍。阳性稀有之时，来自庞大阴性群体的假阳性占了上风——这就是为什么在平衡测试集上测得的精确率，对真实部署中的精确率几乎没有参考价值。
:::

## 阈值与 ROC 曲线 {#sec-roc}

多数分类器输出的是一个**得分**——一个概率或一个 logit——只有选定**阈值**$t$之后才成为分类器：得分超过$t$就预测阳性。每个阈值给出一个不同的混淆矩阵。正确的阈值取决于两类错误各自的代价。

::: proposition 使代价最小的阈值 {#prop-threshold}
设得分$p(\mathbf{x})$就是真实概率$\Prob(y = 1\mid\mathbf{x})$，一次假阳性代价$c_{\text{FP}} > 0$，一次假阴性代价$c_{\text{FN}} > 0$，预测正确没有代价。则使期望代价最小的规则恰在

$$
p(\mathbf{x}) > \frac{c_{\text{FP}}}{c_{\text{FP}} + c_{\text{FN}}}
$$

时预测阳性。
:::

::: proof
如同[[ml-fundamentals/learning-problem#prop-bayes]]，在每个$\mathbf{x}$处分别极小化条件期望代价。预测阳性以概率$1 - p$花费$c_{\text{FP}}$，期望代价为$(1 - p)c_{\text{FP}}$；预测阴性的期望代价为$pc_{\text{FN}}$。当$(1 - p)c_{\text{FP}} < pc_{\text{FN}}$，即$p(c_{\text{FP}} + c_{\text{FN}}) > c_{\text{FP}}$时，预测阳性更划算。
:::

代价相等就得到熟悉的阈值$1/2$；若漏掉一个阳性的代价是一次误报的九倍，阈值就降到$0.1$。这个命题假定得分是已校准的概率（[[#sec-calibration]]）；对未校准的得分，阈值只能在验证数据上调。当代价未知、或在不同用户之间不一致时，更好的做法是在*一切*阈值上同时描述分类器。

::: definition ROC 曲线与 AUC {#def-roc}
一个基于得分的分类器的**受试者工作特征**（Receiver Operating Characteristic，ROC）曲线，是阈值$t$从$+\infty$（什么都不标记：点$(0, 0)$）降到$-\infty$（全都标记：$(1, 1)$)时，真阳性率对假阳性率的图像。**曲线下面积**（AUC，或 AUROC）把这条曲线总结成$0$与$1$之间的一个数。随机打分者的 AUC 为$1/2$（对角线），完美者为$1$。
:::

AUC 有一个简洁的概率含义，它同时给出了计算 AUC 的最好办法。

::: theorem AUC 是一个排序概率 {#thm-auc}
设$S^+$为一个随机选取的阳性样例的得分，$S^-$为一个独立随机选取的阴性样例的得分。则

$$
\operatorname{AUC} = \Prob(S^+ > S^-) + \tfrac12\Prob(S^+ = S^-).
$$

在含$n_+$个阳性与$n_-$个阴性的测试集上，经验 AUC 是全部$n_+n_-$个阳性–阴性对中得分排序正确的那些所占的比例（并列各计$\frac12$），即 Mann–Whitney $U$ 统计量除以$n_+n_-$。
:::

::: proof
我们对没有并列的有限测试集给出论证。把样例按得分从高到低排好，让阈值一次越过一个样例往下降。越过一个阳性，TPR 上升$1/n_+$（一个竖直台阶）；越过一个阴性，FPR 上升$1/n_-$（一个水平台阶）。这个台阶形图像下的面积，是所有水平台阶的宽度$1/n_-$乘以其高度——即当时的 TPR——之和。阈值越过一个阴性样例时，TPR 恰等于得分高于这个阴性的阳性所占的比例。所以面积为$\frac1{n_-}\sum_{\text{阴性 }j}\frac{\#\{\text{高于 }j\text{ 的阳性}\}}{n_+}$，即排序正确的数对比例。一个阳性与一个阴性并列时，把一个台阶变成一段斜线，贡献半个数对。对总体而不是样本做同样的事，即得概率陈述。
:::

于是 AUC 度量的是得分把阳性排在阴性之上的**排序**好坏——与阈值无关，与类别比例无关，对得分的任何单调变换也不变。这是它的长处，也是它的局限：一个模型可以有出色的 AUC 却配着校准得很糟的概率，而且 AUC 对实践中可能毫不相干的阈值取了平均。阳性稀有之时，**精确率–召回率曲线**（随阈值变化的精确率对召回率）往往更有信息量，因为它直接显示每找到一个阳性要付出多少误报。

::: example 手算 AUC {#ex-auc}
三个阳性的得分为$0.8, 0.7, 0.3$，三个阴性为$0.5, 0.2, 0.1$。计算 AUC，以及阈值$0.4$处的 TPR 与 FPR。
::: solution
$9$个数对中，阳性$0.8$胜过全部三个阴性，$0.7$也胜过三个，$0.3$胜过$0.2$和$0.1$、却输给了$0.5$：排序正确的数对有$8$个，故$\operatorname{AUC} = 8/9 = 0.889$。阈值$0.4$处被标记的样例是$0.8$、$0.7$（阳性）与$0.5$（阴性），所以$\mathrm{TPR} = 2/3$，$\mathrm{FPR} = 1/3$。
:::
:::

## 校准与恰当评分规则 {#sec-calibration}

输出概率的分类器做出的断言比只输出标签的更强势，而这个断言可以检验。

::: definition 校准 {#def-calibration}
输出为$p(\mathbf{x})$的概率分类器是**校准的**，如果对每个$q$都有$\Prob\big(y = 1\mid p(\mathbf{x}) = q\big) = q$：在它赋予概率$q$的所有输入之中，比例为$q$的是阳性。**可靠度图**把预测概率分成箱（bin），对每一箱以平均预测值对阳性出现的观测频率作图；校准的模型落在对角线上。给定箱$B_1, \dots, B_M$，**期望校准误差**为

$$
\operatorname{ECE} = \sum_{m=1}^M\frac{\lvert B_m\rvert}{n}\,\Big\lvert\overline{p}(B_m) - \overline{y}(B_m)\Big\rvert,
$$

即平均置信度与观测频率之差按箱加权后的平均。
:::

校准与辨别力是两种不同的性质。对所有人都预测基率$\pi$是完美校准的，用于排序却毫无用处（AUC $1/2$）；把一个出色模型的所有 logit 乘以$3$，排序与 AUC 纹丝不动，校准却被毁掉。Guo、Pleiss、Sun 与 Weinberger（2017）发现，现代深度分类器常常过度自信，而单一的标量修正——**温度缩放**，即把所有 logit 除以一个常数$T$（用验证数据以最大似然拟合）——几乎就能修复校准，且不改变任何预测的排序。对大语言模型，下一词元概率与所表达置信度的校准是当前的热门评测课题（[[evaluation/evaluation-principles]]）。

概率预测应当如何打分？好的评分规则应当奖励诚实：一个相信概率是$q$的预报员，报告$q$就应在期望意义下得到最好的分数。

::: definition 恰当的评分规则 {#def-proper}
**评分规则**$\ell(p, y)$在结果为$y\in\{0, 1\}$时，给事件$y = 1$的报告概率$p$记一个损失。若对每个$q\in[0, 1]$，期望损失$\E_{y\sim\text{Bernoulli}(q)}\ell(p, y)$在$p = q$处最小，就称它是**恰当的**；若$p = q$是唯一极小点，就称**严格恰当**。两个标准规则是**对数损失** $-y\log p - (1 - y)\log(1 - p)$ 与 **Brier 分数** $(p - y)^2$。
:::

::: proposition 对数损失与 Brier 分数严格恰当 {#prop-proper}
对两个规则，$y\sim\text{Bernoulli}(q)$下的期望损失都在$p = q$处唯一最小。把准确率看作得分$[\,[p > 1/2]\ne y\,]$，它恰当但不严格恰当。
:::

::: proof
Brier：$\E(p - y)^2 = q(p - 1)^2 + (1 - q)p^2 = p^2 - 2qp + q = (p - q)^2 + q(1 - q)$，在$p = q$处唯一最小。对数损失：$-q\log p - (1 - q)\log(1 - p)$是 Bernoulli$(p)$关于 Bernoulli$(q)$的交叉熵，等于 Bernoulli$(q)$的熵加上$D_{\text{KL}}(q\,\Vert\,p)$，由吉布斯（Gibbs）不等式（[[math-for-ml/information-theory#thm-gibbs]]）在$p = q$处唯一最小。对 0–1 得分，任何$p > 1/2$的期望损失都是$1 - q$，任何$p\le1/2$的都是$q$；报告$p = q$达到最小值$\min(q, 1 - q)$，但$1/2$同一侧的任何别的$p$同样达到最小值，所以极小点不唯一。
:::

严格恰当性正是交叉熵是概率分类器训练损失的原因：真实条件概率使它最小（[[ml-fundamentals/learning-problem]]，习题10）。证明中 Brier 的分解$(p - q)^2 + q(1 - q)$，还显示了这类分数如何把校准（第一项，对诚实的预报为零）与事件的内禀不确定性（第二项，任何预报员都去不掉）结合起来。对数损失对自信的错误惩罚没有限度；Brier 分数以$1$为界，更为宽容。

::: example 给两个预报员打分 {#ex-brier}
两个天气模型对四天预报下雨，第一天到第四天的实际结果是下雨、晴、下雨、晴。模型 A 报$0.9, 0.1, 0.6, 0.4$，模型 B 报$0.99, 0.01, 0.99, 0.99$。比较准确率、Brier 分数与对数损失。
::: solution
取阈值$1/2$，A 的预测是下雨、晴、下雨、晴——全对，准确率$1$；B 的是下雨、晴、下雨、下雨——准确率$3/4$。

Brier：A 为$(0.01 + 0.01 + 0.16 + 0.16)/4 = 0.085$；B 为$(0.0001 + 0.0001 + 0.0001 + 0.9801)/4 = 0.2451$。

对数损失：A 为$-(\ln0.9 + \ln0.9 + \ln0.6 + \ln0.6)/4 = (0.105 + 0.105 + 0.511 + 0.511)/4 = 0.308$；B 为$(3\cdot0.0101 + 4.605)/4 = 1.159$。B 的一次自信错误就付出$-\ln0.01 = 4.6$ nat，比 A 的全部损失加起来还多。两个恰当规则都以明显差距偏爱 A。
:::
:::

## 测得指标的不确定性 {#sec-uncertainty}

在测试集上算出的指标是一个估计。对$n$个独立测试样例上的准确率，答对题数服从二项分布，标准误差为$\sqrt{p(1 - p)/n}$，正态近似（“Wald”）区间为$\hat p\pm1.96\sqrt{\hat p(1 - \hat p)/n}$（[[math-for-ml/estimation#def-ci]]）。$n$小、或$\hat p$接近$0$或$1$时这个区间会失灵——$50$次试验零错误时，它塌缩成单点集$\{0\}$。一个更好的闭式解是反解检验，而不是代入$\hat p$。

::: definition Wilson 得分区间 {#def-wilson}
对$n$次试验中$k$次成功、$\hat p = k/n$、正态分位数$z$（$95\%$取$1.96$），**Wilson 区间**是满足$\lvert\hat p - p\rvert\le z\sqrt{p(1 - p)/n}$的一切$p$：

$$
\frac{\hat p + \frac{z^2}{2n}}{1 + \frac{z^2}{n}}\ \pm\ \frac{z}{1 + \frac{z^2}{n}}\sqrt{\frac{\hat p(1 - \hat p)}{n} + \frac{z^2}{4n^2}}.
$$
:::

对没有现成公式的指标——F1、AUC、ECE、两个模型得分之差——**自助法**（bootstrap；Efron，1979）用模拟给出区间：从测试集*有放回*地抽$n$个测试样例，重算指标，重复$B$次（比如$1000$次），取这$B$个值的$2.5\%$与$97.5\%$分位数。它把测试集当作总体的替身；而和这里的一切一样，它假定测试样例相互独立——当样例成群出现（同一篇文档的几道题、同一场对话的几轮）时，要整群整群地重抽。

::: widget confidence
dist: bernoulli
n: 200
level: 0.95
intervals: 60
method: z
caption: 六十个模拟测试集，每个含$200$个样例，各给出分类器准确率的一个$95\%$ Wald 区间。$60$个区间中约有$57$个覆盖真实准确率。$n = 200$时，对接近$0.5$的准确率，区间宽约$\pm7$个百分点：在这样的测试集上，两个准确率相差$3$个点的模型，光比对区间是分不出高下的。
:::

### 比较两个模型 {#sec-comparing}

两个分类器在同一批测试样例上评测时，它们的错误是相关的——难样例对两个模型都难——各比各的区间是在浪费这些信息。[[math-for-ml/estimation#ex-compare]]的配对分析只看两者意见相左的样例。

::: proposition McNemar 检验 {#prop-mcnemar}
设$b$为模型 A 答对而模型 B 答错的测试样例数，$c$为 B 对而 A 错的个数。若两个模型准确率相同且测试样例独立，则在$b + c$给定的条件下$b\sim\Bin(b + c, 1/2)$；$b + c$大时，统计量

$$
\chi^2 = \frac{(b - c)^2}{b + c}
$$

近似服从自由度$1$的卡方分布。当$\chi^2 > 3.84$时，差异在$5\%$显著性水平下显著。
:::

::: proof
两个模型一致的样例不含谁更好的信息，放到一边。在两模型准确率相同的原假设下，每个相左的样例都等可能地偏向 A 或 B 且相互独立，所以$b$在$b + c = m$条件下服从$\Bin(m, 1/2)$，均值$m/2$、方差$m/4$。由中心极限定理，$(b - m/2)/\sqrt{m/4} = (b - c)/\sqrt{b + c}$近似标准正态，其平方近似$\chi^2_1$，后者的$95\%$分位数为$1.96^2 = 3.84$。
:::

::: example 一次配对比较 {#ex-mcnemar}
在同样的$1000$道题上，模型 A 得$72\%$，模型 B 得$70\%$。只有 A 答对的有$60$题，只有 B 答对的有$40$题。A 显著更好吗？
::: solution
$\chi^2 = (60 - 40)^2/100 = 4.0 > 3.84$，所以差异在$5\%$显著性水平下（勉强）显著，$p\approx0.046$。把两个准确率当作独立会得到$z\approx0.99$、不显著（[[math-for-ml/estimation#ex-compare]]）：配对检验灵敏得多，因为$900$个相同的结果对差异一言不发。但在众多比较中挑出来的$p$值$0.046$只是弱证据（见下面的警告）。
:::
:::

::: warning 一个测试集，许多决定
测试集每用来支撑一个决定——选哪个模型、哪个提示、哪个检查点、哪个阈值——它的数字就变得乐观一点，决定多了就变得毫无意义。二十次在$5\%$水平上的比较，即使什么都不真的存在差异，也会平均产生一个假的“显著”结果。要报告一共试过多少种配置；为多重比较做校正（把显著性水平除以检验个数，即 Bonferroni 校正，笨拙但稳妥）；在查看结果之前定好评测流程；再留一个只用一次的最终测试集。单个汇总数字还会诱使人优化数字而不是目标（**古德哈特定律**）：报告几个互补的指标，并亲手查看错误。
:::

## 超越二元分类 {#sec-other-metrics}

**多类别。**准确率直接推广；**top-$k$ 准确率**在真实类别列入概率最大的前$k$个时就把预测记为正确。精确率、召回率与 F1 按类别计算（该类别对其余所有）再取平均：**宏**平均让每个类别权重相同，稀有类别与常见类别分量一样重；**微**平均先把所有类别的计数汇到一起，于是被常见类别主导（对单标签问题它还恰好等于准确率）。对数损失即[[ml-fundamentals/logistic-regression#def-softmax-regression]]的交叉熵。

**回归。**均方误差及其平方根（RMSE，与$y$同单位），平均绝对误差（对离群点不那么敏感；它的极小点是中位数，[[ml-fundamentals/learning-problem]]，习题7），以及$R^2$（[[ml-fundamentals/linear-regression#def-r2]]，与预测均值相比较，在测试数据上可以为负）。

**语言模型。**内在指标是留出文本上的逐词元交叉熵，通常以其指数即**困惑度**报告（[[math-for-ml/information-theory#def-perplexity]]，[[text-and-language/perplexity]]）；它就是下一词元预测的对数损失，只在分词器相同的模型之间可比（或按字节归一化）。外在指标是各基准上的准确率、通过率与人工评判，它们在更大的规模上带来本章的全部问题——测试集小、比较太多、数据污染、条目相关（[[evaluation/evaluation-statistics]]）。

::: quiz
一个欺诈检测器在一个$0.1\%$的交易为欺诈的测试集上 AUC 为$0.95$。哪个结论站得住？
- [ ] 在阈值$0.5$处，被标记的交易约$95\%$是欺诈
- [ ] 检测器的预测概率校准得很好
- [x] 随机一笔欺诈交易得分高于随机一笔正常交易的概率约为$95\%$
- [ ] 检测器的准确率约为$95\%$
::: solution
由[[#thm-auc]]，AUC 是随机阳性排在随机阴性之上的概率。它对校准、对任何特定阈值都一言不发；而在流行率$0.1\%$下，再小的假阳性率也让大多数标记成为误报（[[#prop-precision]]）。准确率也不由 AUC 决定：总是预测“正常”的准确率为$99.9\%$。
:::
:::

## 一次完整的评测 {#sec-code}

下面的清单模拟一个得分有信息、却过度自信的分类器：每个样例有真实对数几率$z\sim\Normal(-1.5, 1.5^2)$，标签以概率$\sigma(z)$抽出，模型却报告$\sigma(2.5z)$，仿佛它的 logit 被乘以了$2.5$。它在$2000$个测试样例上计算本章的指标，在另外$2000$个的验证集上拟合一个温度，并给出准确率的自助法区间。只用标准库。

```python
import math, random

rng = random.Random(7)
sig = lambda z: 1 / (1 + math.exp(-z))

def sample(n):
    """True log-odds z ~ N(-1.5, 1.5^2); label ~ Bernoulli(sigma(z)); the model reports sigma(2.5 z)."""
    out = []
    for _ in range(n):
        z = rng.gauss(-1.5, 1.5)
        y = int(rng.random() < sig(z))
        out.append((sig(2.5 * z), y))                 # 一个过度自信的模型
    return out

def confusion(D, t=0.5):
    tp = sum(p > t and y == 1 for p, y in D); fp = sum(p > t and y == 0 for p, y in D)
    fn = sum(p <= t and y == 1 for p, y in D); tn = sum(p <= t and y == 0 for p, y in D)
    return tp, fp, fn, tn

def auc(D):
    """P(score of a random positive > score of a random negative), ties counting 1/2."""
    pos = sorted(p for p, y in D if y == 1); neg = sorted(p for p, y in D if y == 0)
    wins, j = 0.0, 0
    for s in pos:                                     # 统计低于 s 的阴性个数（得分连续）
        while j < len(neg) and neg[j] < s:
            j += 1
        wins += j
    return wins / (len(pos) * len(neg))

def ece(D, bins=10):
    """Expected calibration error: bin-weighted |mean confidence - observed frequency|."""
    total = 0.0
    for b in range(bins):
        B = [(p, y) for p, y in D if b / bins <= p < (b + 1) / bins or (b == bins - 1 and p == 1)]
        if B:
            total += len(B) / len(D) * abs(sum(p for p, _ in B) / len(B) - sum(y for _, y in B) / len(B))
    return total

brier = lambda D: sum((p - y) ** 2 for p, y in D) / len(D)
logloss = lambda D: -sum(math.log(p if y else 1 - p) for p, y in D) / len(D)

def report(name, D):
    tp, fp, fn, tn = confusion(D)
    prec, rec = tp / (tp + fp), tp / (tp + fn)
    print(f"{name}: acc {(tp + tn) / len(D):.3f}  precision {prec:.3f}  recall {rec:.3f}  "
          f"F1 {2 * prec * rec / (prec + rec):.3f}  AUC {auc(D):.3f}")
    print(f"{' ' * len(name)}  log loss {logloss(D):.3f}  Brier {brier(D):.3f}  ECE {ece(D):.3f}")

val, test = sample(2000), sample(2000)
print("prevalence", sum(y for _, y in test) / len(test), " confusion (tp, fp, fn, tn)", confusion(test))
report("raw   ", test)

# 温度缩放：把 logit 除以 T，T 在验证集上选取
logit = lambda p: math.log(p / (1 - p))
rescale = lambda D, T: [(sig(logit(p) / T), y) for p, y in D]
T = min((k / 10 for k in range(5, 51)), key=lambda T: logloss(rescale(val, T)))
print("temperature T =", T)
report("scaled", rescale(test, T))

# 测试准确率的自助法 95% 区间
accs = []
for _ in range(1000):
    B = [test[rng.randrange(len(test))] for _ in range(len(test))]
    tp, fp, fn, tn = confusion(B)
    accs.append((tp + tn) / len(B))
accs.sort()
print("bootstrap 95% interval for accuracy:", round(accs[24], 3), "to", round(accs[974], 3))
```

```text
prevalence 0.246  confusion (tp, fp, fn, tn) (205, 101, 287, 1407)
raw   : acc 0.806  precision 0.670  recall 0.417  F1 0.514  AUC 0.819
        log loss 0.562  Brier 0.149  ECE 0.105
temperature T = 2.5
scaled: acc 0.806  precision 0.670  recall 0.417  F1 0.514  AUC 0.819
        log loss 0.425  Brier 0.136  ECE 0.018
bootstrap 95% interval for accuracy: 0.789 to 0.824
```

温度缩放把失真精确地还原了（$T = 2.5$），且没有改动任何标签、任何排序——准确率、精确率、召回率、F1、AUC 前后完全相同——而校准误差从$0.105$降到$0.018$，两个恰当评分规则的得分也都改善了。只有概率类的指标看得见这个问题。自助法区间$[0.789, 0.824]$与公式$0.806\pm1.96\sqrt{0.806\cdot0.194/2000} = 0.806\pm0.017$吻合。阈值$1/2$是随意指的：有了校准的概率，任何代价下的阈值都可由[[#prop-threshold]]给出。

::: history
ROC 曲线源自第二次世界大战中的雷达信号检测及 Peterson、Birdsall 与 Fox（1954）的分析，经 Green 与 Swets 的《信号检测理论与心理物理学》（*Signal Detection Theory and Psychophysics*，1966）进入心理学；Hanley 与 McNeil（1982）把 AUC 及其与 Mann–Whitney 统计量（Mann 与 Whitney，1947；Wilcoxon，1945）的等同关系推广到医学。精确率与召回率来自信息检索（Kent 等人，1955；Cleverdon 的科克兰菲尔德实验，1960年代），van Rijsbergen 的《信息检索》（*Information Retrieval*，1979）定义了 F 度量。Glenn Brier 于1950年为天气预报提出 Brier 分数，I. J. Good 于1952年提出对数得分；Allan Murphy 的分解（1973）与 DeGroot 和 Fienberg 的分析（1983）使校准成为预报检验的标准内容。Edwin Wilson 的区间始于1927年，Quinn McNemar 的检验始于1947年，Bradley Efron 的自助法始于1979年。Platt（1999）提出对分类器得分的逻辑回归再校准，温度缩放（Guo 等人，2017）是其单参数的特例。
:::

::: summary
- 混淆矩阵给出准确率、精确率（报警有多大把握是对的）、召回率（抓住了多少阳性）、特异度与 F1；按错误的代价选指标。
- 精确率依赖流行率，召回率与特异度不依赖：阳性稀有之时，再出色的分类器报的警也多半是误报，准确率则由多数类别主导。
- 概率校准之后，使代价最小的阈值是$c_{\text{FP}}/(c_{\text{FP}} + c_{\text{FN}})$。ROC 曲线展现所有阈值，其下面积是把阳性排在阴性之上的概率。
- 校准（预测概率与频率相符吗？）与辨别力（得分排得好吗？）是两回事。对数损失与 Brier 分数严格恰当，把两者都度量在内；温度缩放能修好过度自信而不改变排序。
- 每个指标都要配上区间（比例用 Wilson，其余用自助法）；模型比较要在同样的样例上做配对检验，如 McNemar 检验，并把做过的比较次数计入在内。
:::

## 习题

::: exercise 精确率、召回率与 F1 {level=1 check="8/11"}
一个分类器有$\mathrm{TP} = 40$、$\mathrm{FP} = 10$、$\mathrm{FN} = 20$、$\mathrm{TN} = 930$。计算精确率、召回率与 F1。准确率是多少？
::: solution
精确率 $= 40/50 = 0.8$，召回率 $= 40/60 = 2/3$，且$\mathrm{F1} = 2\cdot0.8\cdot\frac23/(0.8 + \frac23) = (16/15)/(22/15) = 8/11\approx0.727$。准确率是$970/1000 = 0.97$，一个动听多得多的数字。
:::
:::

::: exercise 多数类分类器 {level=1 check="0.97"}
某个数据集中，$3\%$的交易是欺诈。总是预测“非欺诈”的分类器达到多少准确率？它的召回率和精确率是多少？
::: solution
准确率$0.97$；召回率$0$，因为从不标记任何欺诈；精确率无定义（$0/0$），因为什么都不标记。任何模型都要与这条基线比较，而不是与$50\%$比。
:::
:::

::: exercise 低基率下的精确率 {level=1 check="0.9*0.02/(0.9*0.02+0.05*0.98)"}
一个内容过滤器召回率为$0.9$、假阳性率为$0.05$，它审核的条目中$2\%$是有害的。被标记的条目里真正有害的比例是多少？
::: solution
由[[#prop-precision]]，$0.9\cdot0.02/(0.9\cdot0.02 + 0.05\cdot0.98) = 0.018/0.067 = 0.269$。被标记的条目约有四分之三是误报。
:::
:::

::: exercise 从代价导出阈值 {level=2 check="1/5"}
漏掉一个阳性的代价是一次误报的四倍。概率已校准，预测概率高于多少时应当把一个样例标记出来？
::: solution
由[[#prop-threshold]]，$c_{\text{FP}}/(c_{\text{FP}} + c_{\text{FN}}) = 1/(1 + 4) = 1/5$。
:::
:::

::: exercise 由得分算 AUC {level=2 check="7/9"}
阳性得分为$0.9, 0.6, 0.4$，阴性为$0.7, 0.3, 0.2$。计算 AUC。
::: solution
数排序正确的数对（[[#thm-auc]]）：$0.9$胜过全部三个阴性（$3$），$0.6$胜过$0.3$与$0.2$（$2$），$0.4$胜过$0.3$与$0.2$（$2$）。共$7$对、$9$对中占$7$，$\operatorname{AUC} = 7/9\approx0.778$。
:::
:::

::: exercise 一个 Brier 分数 {level=2 check="0.49/3"}
三个事件的预测概率为$0.8, 0.3, 0.6$，实际只有第一个发生了。Brier 分数是多少？
::: solution
$\big((0.8 - 1)^2 + (0.3 - 0)^2 + (0.6 - 0)^2\big)/3 = (0.04 + 0.09 + 0.36)/3 = 0.49/3\approx0.163$。
:::
:::

::: exercise 一个错误都没观测到 {level=2 check="1-0.05^(1/300)"}
一个系统在$300$个独立测试用例上不犯任何错误。求最大的错误率$p$，使得观测到零错误的概率仍至少为$0.05$——一个单侧$95\%$上界——并与“三人法则”$3/n$比较。
::: solution
零错误的概率为$(1 - p)^{300}$。令$(1 - p)^{300} = 0.05$得$p = 1 - 0.05^{1/300} = 0.00994$。$p$小时$\log(1 - p)\approx-p$，故$p\approx-\log0.05/n = 2.996/n$，这就是三人法则：$3/300 = 0.01$。零错误与高达约$1\%$的错误率同样相容；塌缩成$\{0\}$的 Wald 区间会错误地暗示万无一失。
:::
:::

::: exercise McNemar 统计量 {level=2 check="5"}
在共享的测试集上，模型 A 对、B 错的样例有$30$个，B 对、A 错的有$15$个。计算 McNemar 统计量。差异在$5\%$显著性水平下显著吗？
::: solution
$\chi^2 = (30 - 15)^2/(30 + 15) = 225/45 = 5 > 3.84$：在$5\%$显著性水平下显著（$p$值约$0.025$），前提是这是一次单一的、预先计划好的比较。
:::
:::

::: exercise 校准却无用，准确却失准 {level=3}
(a) 证明常数预测器$p(\mathbf{x}) = \pi$（$\pi$为流行率）完美校准，并求它的 AUC 与 Brier 分数。(b) 一个模型对它预测阳性类别的每个输入都预测概率$0.99$，对其余每个输入都预测$0.01$；它在两个类别上的准确率都是$0.9$，流行率为$1/2$。以两个箱计算它的 ECE 与 Brier 分数。比较一下。
::: solution
(a) 被赋予概率$\pi$的输入——也就是全部输入——中阳性比例为$\pi$，所以它是校准的。所有得分并列，每个阳性–阴性数对各计$\frac12$，故 AUC 为$\frac12$。Brier 分数为$\E(\pi - y)^2 = \pi(1 - \pi)^2 + (1 - \pi)\pi^2 = \pi(1 - \pi)$。

(b) 得分$0.99$的输入有$90\%$是阳性（因为两类别准确率都是$0.9$、类别平衡时精确率等于$0.9$），该箱的差为$\lvert0.99 - 0.9\rvert = 0.09$；同理$0.01$箱的差为$\lvert0.01 - 0.1\rvert = 0.09$。ECE 为$0.09$。它的 Brier 分数为$0.9\cdot0.01^2 + 0.1\cdot0.99^2 = 0.098$。取$\pi = \frac12$的常数预测器 Brier 分数为$0.25$，差得多，尽管它的 ECE 是$0$。若改报$0.9$与$0.1$，模型便是校准的，Brier 分数为$0.9\cdot0.01 + 0.1\cdot0.81 = 0.09$——比两者都好——严格恰当性正是这样要求的。
:::
:::

::: exercise 推导 Wilson 区间 {level=3}
从条件$\lvert\hat p - p\rvert\le z\sqrt{p(1 - p)/n}$出发，推导[[#def-wilson]]的公式，并证明该区间始终落在$[0, 1]$内。对$n = 50$次试验中$k = 0$次成功、$z = 1.96$求值。
::: solution
平方：$(\hat p - p)^2\le z^2p(1 - p)/n$，即$p^2(1 + z^2/n) - p(2\hat p + z^2/n) + \hat p^2\le0$。这是关于$p$的二次式，首项系数为正，所以解集是它的两个根之间的区间，

$$
p = \frac{2\hat p + z^2/n\pm\sqrt{(2\hat p + z^2/n)^2 - 4\hat p^2(1 + z^2/n)}}{2(1 + z^2/n)}.
$$

判别式化简为$4z^2\hat p(1 - \hat p)/n + z^4/n^2$，整个除以$2$即得题述的中心$(\hat p + z^2/2n)/(1 + z^2/n)$与半宽。当$p < 0$或$p > 1$时，平方条件的右端$z^2p(1 - p)/n$为负而左端非负，这样的$p$无一满足条件：区间落在$[0, 1]$内。对$k = 0$、$n = 50$：$z^2/n = 0.0768$，中心为$0.0384/1.0768 = 0.0357$，半宽为$(1.96/1.0768)\sqrt{3.8416/10000} = 0.0357$，所以区间是$[0, 0.0713]$，一个约$7\%$的合理上界；Wald 区间给出的却是$[0, 0]$。
:::
:::
