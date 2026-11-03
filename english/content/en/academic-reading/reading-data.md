A newspaper reports: *New drug halves the risk of stroke.* The research article behind it says that, over five years, 2 in every 100 people taking a dummy pill had a stroke, compared with 1 in every 100 taking the drug, and that the difference was *statistically significant (p = .01)*. Both are accurate. Yet a reader of the headline might imagine that half of all strokes can now be prevented, while a reader of the article knows that 100 people must take the drug for five years for one of them to avoid a stroke — and that the other 99 take it with no benefit, and perhaps some side effects. The numbers are the same; what the reader understands from them is not.

Academic texts report their evidence in numbers, tables and graphs, and the words around them interpret those numbers — sometimes carefully, sometimes not. This chapter builds on [[reading-skills/numbers-and-charts]], which covered percentages, percentage points, the language of change and simple charts. Here we read the tables and graphs of research articles; the statistics that appear in them most often — means, standard deviations, correlations, significance, confidence intervals and effect sizes — explained in words rather than formulas; relative and absolute risk; and the language of **data commentary**, the sentences in which writers tell readers what their numbers mean. All the data in this chapter are illustrative.

## Tables and figures in research articles

::: definition Table, figure and caption {#def-table-figure}
In a research article a **table** presents numbers in rows and columns; a **figure** presents data (or a diagram) visually: a bar chart, line graph, scatter plot, box plot or map. Each has a number (*Table 2*, *Figure 3*) and a **caption** or title that says what it shows; tables often have **notes** below them explaining abbreviations, units and symbols (such as * for *p* < .05). The text refers to them (*see Table 2*; *as Figure 3 shows*) and comments on their most important features.
:::

::: theorem Reading a table or figure {#rule-read-table}
1. Read the **title or caption** and any **notes**: what is being measured, in whom, in what units?
2. Read the **labels**: the row and column headings of a table, or the axes and legend of a graph, including the **scale** and where it starts.
3. Find the **comparison** the table or figure is designed to show — usually between groups, between times, or between conditions.
4. Look at the **size** and the **uncertainty** of the differences: the numbers themselves, and any standard deviations, error bars or confidence intervals.
5. Only then read what the **text** says about it, and check that the words match the numbers.
:::

::: proof
A table or figure is a compressed argument: it is chosen and designed to show something, and the text tells the reader what. Reading the data before the commentary lets you form your own view first, so that you can notice when the commentary selects, exaggerates or misreads. Steps 1 and 2 prevent the commonest errors — misreading units, groups or scales. Step 4 matters because a difference between two averages means little without some idea of how much the individual values vary; Anscombe (1973) famously constructed four small data sets with almost identical means, variances and correlations whose graphs look completely different, to show that summary numbers cannot replace looking at the data.
:::

Here is an illustrative table of the kind found in the results section of an education article.

**Table 2.** Reading comprehension scores (out of 50) before and after the programme, by group (illustrative data)

| group | *n* | before: *M* (*SD*) | after: *M* (*SD*) | change |
|---|---|---|---|---|
| programme | 64 | 28.4 (6.1) | 33.9 (5.8) | +5.5 |
| comparison | 61 | 28.9 (6.4) | 31.2 (6.0) | +2.3 |

*Note.* *M* = mean; *SD* = standard deviation. The difference in change between groups was statistically significant, *p* = .004; *d* = 0.52.

::: example Reading a results table {#ex-table}
Read Table 2 and say in three sentences what it shows.
::: solution
**Step 1 — caption and notes.** Reading comprehension scores out of 50, before and after a programme, in a programme group and a comparison group. *M* is the mean (average) score; *SD* the standard deviation (how spread out the scores are).

**Step 2 — labels.** *n* is the number of students in each group: 64 and 61.

**Step 3 — the comparison.** Before the programme, the two groups had similar means (28.4 and 28.9). Both improved; the programme group by 5.5 points, the comparison group by 2.3.

**Step 4 — size and uncertainty.** The standard deviations are about 6 points, so the difference in improvement (5.5 − 2.3 = 3.2 points) is about half a standard deviation — which is what *d* = 0.52 says. The note reports that the difference is statistically significant.

**In three sentences:** *The two groups started at a similar level. Both improved, but the programme group improved by 5.5 points and the comparison group by 2.3. The extra gain of about 3 points (out of 50) is statistically significant and moderate in size.* What the table does not tell us: how students were assigned to groups, which is in the methods.
:::
:::

## Averages and spread

::: definition Mean, median and standard deviation {#def-mean-sd}
The **mean** (平均数, *M*) is the sum of the values divided by their number. The **median** (中位数, *Mdn*) is the middle value when the values are put in order. The **standard deviation** (标准差, *SD*) measures how spread out the values are around the mean: a small SD means most values are close to the mean; a large SD means they are widely spread. When values follow a roughly bell-shaped (**normal**) distribution, about two-thirds of them lie within one SD of the mean and about 95% within two SDs.
:::

The mean and the median tell different stories when the data are **skewed** — when a few very large or very small values pull the mean away from the middle. Incomes are the standard example: a few very high incomes raise the mean, so the median is usually the better guide to a typical income, and many reports give both. When a text says *the average*, it usually means the mean; check, if it matters.

::: widget distribution
title: Mean and standard deviation
dist: normal
params: mu=60, sigma=10
a: 50
b: 70
caption: Illustrative test scores with mean 60 and standard deviation 10. The shaded area, from one SD below the mean to one SD above it (50 to 70), holds about 68% of the scores. Change *sigma* to see a more spread out or more concentrated set of scores with the same mean; change *a* and *b* to 40 and 80 to see the roughly 95% within two SDs. Real data are not always this symmetrical.
:::

::: quiz
In a (fictional) study, the mean monthly income of a sample is 9,800 yuan and the median is 6,500 yuan. What does this most likely show?
- [ ] the data contain an error
- [x] a small number of people with very high incomes raise the mean
- [ ] most people earn more than 9,800 yuan
- [ ] the mean and the median are always this far apart
::: solution
When the mean is well above the median, the distribution is skewed to the right: a few large values pull the mean up. Half the sample earns less than 6,500 yuan, so most people earn less than the mean.
:::
:::

## Correlation

::: definition Correlation coefficient {#def-r}
A **correlation coefficient** (usually Pearson's *r*) is a number between −1 and +1 that measures how closely two variables follow a straight-line relationship. *r* = +1 is a perfect positive relationship, *r* = −1 a perfect negative one, and *r* = 0 no straight-line relationship. Its square, *r*², is often reported as the proportion of the variation in one variable that is "explained" (statistically accounted for) by the other.
:::

Correlations in the social sciences are often modest: *r* = .30 is a common size for a real, meaningful relationship between two human characteristics, and it leaves most of the variation (*r*² = .09, or 9%) unaccounted for. When a text says *X was strongly correlated with Y*, look for the number; and remember from [[academic-reading/evaluating-sources#rule-causation]] that a correlation, however strong, does not by itself show which variable affects the other, or whether either does. A correlation of zero, too, needs care: two variables can be closely related in a curved way — performance rising with arousal up to a point and then falling, for example — and still have *r* close to 0.

## Significance, intervals and effect size

These three ideas appear in almost every quantitative article. They answer different questions, and reading them correctly is one of the most useful skills of academic reading.

::: definition Statistical significance and the *p*-value {#def-p}
A **significance test** asks whether a result (a difference, a correlation) could easily have arisen by chance if there were really no effect in the population — the **null hypothesis**. The ***p*-value** is the probability of getting a result at least as extreme as the one observed **if the null hypothesis were true**. A result is called **statistically significant** (统计上显著) when *p* is below a conventional threshold, most often .05.
:::

::: definition Confidence interval and effect size {#def-ci-effect}
A **confidence interval** (CI, 置信区间) is a range of values, calculated from the sample, that indicates how precisely an effect has been estimated: *a difference of 3.2 points, 95% CI [1.1, 5.3]*. Narrow intervals mean precise estimates; wide ones mean much uncertainty. An **effect size** (效应量) expresses how large an effect is, in the original units (*3.2 points*, *26 minutes*) or in a standardised measure such as Cohen's ***d***, the difference between two means divided by their standard deviation.
:::

::: theorem What significance does and does not tell you {#rule-significance}
1. *Significant* means **unlikely to be due to chance alone** (by a conventional test). It does **not** mean large, important or useful.
2. The *p*-value is **not** the probability that the hypothesis is true, nor the probability that the result is due to chance.
3. **Not significant** does **not** mean *no effect*: it may mean the study was too small to detect an effect.
4. With a large enough sample, a **tiny** effect can be significant; with a small sample, a **large** effect can fail to be.
5. So always look for the **size** of the effect and its **confidence interval**, and ask whether an effect of that size matters in practice.
:::

::: proof
The *p*-value is calculated on the assumption that there is no effect, so it cannot be the probability that there is none. It depends both on the size of the effect and on the size of the sample: the same small difference gives a large *p* in a study of 40 people and a tiny *p* in a study of 40,000. That is why points 3 and 4 hold, and why significance alone cannot tell you whether a finding matters. In 2016 the American Statistical Association issued a statement on *p*-values (Wasserstein & Lazar 2016) making these points: a *p*-value does not measure the probability that a hypothesis is true, conclusions should not be based only on whether *p* passes a threshold, and a *p*-value does not measure the size or importance of an effect. For effect sizes, Cohen (1988) suggested that *d* = 0.2, 0.5 and 0.8 might be called small, medium and large in the behavioural sciences when no better basis is available; he warned that these labels are rough, and many fields now judge effect sizes against what is typical and what matters in practice.
:::

::: warning Reading *p* = .03 as "97% sure"
✗ *p* = .03, *so there is a 97% probability that the programme works.*

✗ *p* = .03, *so there is only a 3% chance that the result is due to chance.*

✓ *p* = .03: *if the programme had no effect, a difference this large or larger would appear in about 3% of studies like this one. The result is statistically significant at the .05 level; how large and how useful the effect is must be judged from the effect size and the confidence interval.*

These misreadings are common, even in published articles and textbooks, because the correct statement is awkward. The key is the word *if*: the *p*-value assumes there is no effect, so it cannot also tell you the probability that there is one.
:::

::: example Significant but small {#ex-significant-small}
An illustrative large study of 20,000 students reports: *Students who used the online platform scored significantly higher on the final exam (M = 64.1) than those who did not (M = 63.6), p < .001.* What should a careful reader conclude?
::: solution
**Significance.** With *p* < .001, a difference this large is very unlikely to have arisen by chance if users and non-users did not differ at all in the population.

**Size.** The difference is 0.5 points (64.1 − 63.6). On a 100-point exam, that is very small; without the standard deviation we cannot compute *d*, but half a point is unlikely to matter to any student.

**Why significant?** The sample is huge (20,000), so even a tiny difference is detected reliably.

**Cause?** *Used the platform* suggests the students chose; motivated students may both use it and score higher. The design is probably observational.

**Conclusion:** *There is a very small, statistically reliable difference in scores between users and non-users, which may not be caused by the platform and is too small to matter much in practice.* The word *significantly* in the original sentence is accurate, but a reader who took it in its everyday sense would be misled.
:::
:::

## Relative and absolute risk

::: definition Relative and absolute risk {#def-risk}
The **absolute risk** is the chance of an outcome in a group (*2 in 100*, *2%*). The **absolute risk reduction** is the difference between two absolute risks (*2% − 1% = 1 percentage point*). The **relative risk** compares two risks as a ratio (*1% ÷ 2% = 0.5*), and the **relative risk reduction** expresses the difference as a proportion of the original risk (*a 50% reduction*). The **number needed to treat** (NNT) is the number of people who must receive a treatment for one of them to benefit (*1 ÷ 0.01 = 100*).
:::

::: theorem Ask for the absolute numbers {#rule-absolute}
When a text reports a change in risk as a percentage or a ratio (*halves the risk*, *a 30% increase*, *twice as likely*), find or calculate the **absolute** risks before and after. A large relative change in a small risk is a small absolute change; the same relative change in a large risk is a large one.
:::

::: proof
Relative measures are useful for comparing treatments and for researchers, because a treatment's relative effect is often similar across groups with different baseline risks. But the absolute effect is what matters to a person deciding whether to take a drug or change a habit, and it depends on how common the outcome was to begin with. A relative figure without the base is the same problem as a percentage without its base ([[reading-skills/numbers-and-charts#rule-base]]). Reports aimed at the public often give only the relative figure, because it sounds larger.
:::

::: widget plot
title: The same relative reduction at different baseline risks
f: x; (1-r)*x
x: 0, 20
y: 0, 20
sliders: r=0.5:0:1:0.05
labels: risk without treatment (%); risk with treatment (%)
shade: 0, 20
between: true
caption: The horizontal axis is the baseline risk, from 0% to 20%; the two lines are the risk without and with a treatment that reduces risk by the proportion *r* (here 50%). The shaded gap is the absolute risk reduction. At a baseline of 2%, a 50% reduction saves 1 person in 100; at 20%, the same relative reduction saves 10 in 100. Move the slider to change the relative reduction. The numbers are illustrative.
:::

::: example Relative and absolute {#ex-risk}
An illustrative study reports that a habit is associated with a *40% higher risk* of a rare illness. In people without the habit, the illness affects 5 in 10,000 over ten years. What is the absolute risk with the habit, and the absolute increase?
::: solution
**Baseline absolute risk:** 5 in 10,000 = 0.05%.

**Relative increase:** 40% of 5 is 2, so the risk with the habit is 5 + 2 = **7 in 10,000** (0.07%).

**Absolute increase:** 2 in 10,000 over ten years, or 0.02 percentage points.

**Interpretation:** *40% higher* is accurate, but the absolute increase is small: out of 10,000 people with the habit, about two extra cases in ten years. And the study reports an association, so even these two may not be caused by the habit. A reader deciding whether the finding matters needs both figures, and an article that gives only *40% higher* has left out the more useful one.
:::
:::

## Graphs and how they can mislead

Graphs in research articles are usually honest, but their design always shapes what the reader sees. Four features deserve a second look:

- **The vertical axis.** A bar chart whose axis starts at 60 instead of 0 makes a difference between 62 and 65 look enormous. Line graphs often do not start at zero, which is reasonable for showing change, but check the scale before judging the size of a change.
- **Error bars.** Bars or lines that show standard deviations, standard errors or confidence intervals; the caption should say which. Two means whose 95% confidence intervals overlap a great deal are not reliably different.
- **Selected ranges.** A time series that starts in a particular year can make a trend look steeper or flatter than it is over a longer period.
- **Scatter plots and outliers.** One or two extreme points can create, or hide, a correlation. Look at where most of the points are.

## The language of data commentary

Swales and Feak (2012) describe how writers comment on data in a sequence of moves: a **location statement** that points the reader to the table or figure (*Table 2 shows …*, *As can be seen in Figure 3, …*), a **highlighting statement** that picks out the most important result (*The most striking feature is …*), and then **discussion** of what it means, often hedged. As a reader, use these moves:

| move | typical language | what to check |
|---|---|---|
| location | *Table 2 presents*, *Figure 1 shows*, *as can be seen in* | Look at the table or figure first. |
| highlighting | *notably*, *the largest increase*, *in particular*, *was significantly higher* | Is the highlighted result the most important one, or the most favourable? What is not mentioned? |
| comparison and change | *rose sharply*, *declined slightly*, *remained stable*, *was twice as high as*, *exceeded* | Do the words fit the numbers? *Sharply* for a rise of 2%? |
| interpretation | *this suggests*, *may reflect*, *is consistent with*, *one explanation is* | Is the interpretation hedged appropriately? Are alternatives considered? |

::: example Do the words fit the numbers? {#ex-words-numbers}
Compare this commentary with Table 2 above: *As Table 2 shows, the programme led to a dramatic improvement in reading, with programme students far outperforming the comparison group, who made little progress.*
::: solution
**Location statement:** accurate (*As Table 2 shows*).

**dramatic improvement:** the programme group gained 5.5 points out of 50, and the extra gain over the comparison group was about 3 points, a moderate effect (*d* = 0.52). *Dramatic* overstates it.

**far outperforming:** after the programme, the means were 33.9 and 31.2 — a difference of less than half a standard deviation. Many comparison students will have scored higher than many programme students. *Far* overstates it.

**who made little progress:** the comparison group gained 2.3 points. That is less than the programme group, but not *little*; the table shows that both groups improved.

**led to:** a causal verb. It may be justified if students were randomly assigned; the table alone does not tell us.

**A commentary that fits:** *As Table 2 shows, both groups improved, but the programme group gained more (5.5 vs 2.3 points); the difference was statistically significant and moderate in size (d = 0.52).*
:::
:::

::: note English and Chinese
- ***Times* and 倍.** *Three times as many* means ×3. *Three times more* is ambiguous in English: most writers mean ×3, but some readers take it as ×4 (the original plus three times more). Chinese has a clearer convention — 增加到三倍 (to ×3) and 增加了两倍 (by two times the original, also ×3) — so check the base when translating in either direction, and prefer *three times as many* in your own writing.
- **Per cent and percentage points.** A rise from 10% to 15% is a rise of 5 **percentage points** (百分点) and of 50 **per cent**. English news often confuses them; academic texts should not. See [[reading-skills/numbers-and-charts]].
- **Number formats.** English uses a point for decimals and commas for thousands (*12,500.75*); many academic styles omit the zero before decimals that cannot exceed 1 (*p* = .03, *r* = .45). Large Chinese numbers are grouped in 万 (ten thousand) and 亿 (a hundred million), English ones in thousands and millions: 3.5亿 = *350 million*.
- **Significant and 显著.** As noted in [[academic-reading/evaluating-sources]], *significant* in a results section means statistically significant (显著), not important (重要).
:::

::: history
Graphs of data are younger than one might think. William Playfair's *Commercial and Political Atlas* (1786) introduced line graphs and bar charts of economic data, and later added the pie chart. The statistical tests that dominate research articles came from the early twentieth century; Ronald Fisher's *Statistical Methods for Research Workers* (1925) did much to spread significance testing and the use of .05 as a convenient threshold, which later became a rule more rigid than Fisher intended. In 1954 Darrell Huff's *How to Lie with Statistics* showed general readers how graphs and averages can mislead, and in 1973 Francis Anscombe's quartet showed statisticians why data must be plotted, not only summarised. Edward Tufte's *The Visual Display of Quantitative Information* (1983) set out principles of honest graphical design. In 2016 the American Statistical Association's statement on *p*-values marked a long debate about the misuse of significance tests, which continues.
:::

## Where this leads

Data are evidence for claims ([[academic-reading/claims-and-evidence]]), and how far they can be trusted depends on how they were collected ([[academic-reading/evaluating-sources]]). The hedged interpretations in data commentary are read with the tools of [[academic-reading/stance-and-hedging]]. Writing about data yourself is taught in [[essay-writing/describing-data]] and [[academic-writing/methods-results]], and presenting it in [[presentations-and-discussion/visual-aids]].

::: summary
- Read a table or figure's **caption, notes and labels** first, find the comparison, look at the **size** and **uncertainty** of differences, and only then the commentary ([[#rule-read-table]]).
- The **mean** can be pulled by extreme values; the **median** is the middle value; the **standard deviation** measures spread ([[#def-mean-sd]]).
- A **correlation** *r* runs from −1 to +1; modest values are common, and correlation is not cause ([[#def-r]]).
- **Significant** means unlikely to be due to chance alone, not large or important; *p* is not the probability that a hypothesis is true; *not significant* is not *no effect* ([[#rule-significance]]).
- Look for **effect sizes** and **confidence intervals** to judge how large and how precise an effect is.
- Convert **relative** risks into **absolute** ones before judging their importance ([[#rule-absolute]]).
- In **data commentary**, check that highlighting and comparison words (*dramatic*, *far*, *led to*) fit the numbers.
:::

## Exercises

::: exercise Read the table {level=1}
From Table 2 in this chapter: (a) How many students were in the comparison group? (b) What was the programme group's mean score after the programme? (c) Which group had the larger standard deviation before the programme? (d) By how many points did the comparison group improve?
::: solution
(a) 61; (b) 33.9; (c) the comparison group (6.4, against 6.1); (d) 2.3.
:::
:::

::: exercise Mean or median? {level=1}
For each, would the mean or the median be the better guide to a typical value, and why? (a) house prices in a city (b) the heights of adult women in a sample (c) the number of books owned by households, where most own fewer than 50 and a few own thousands
::: solution
(a) median — a few very expensive houses raise the mean; (b) either — heights are roughly symmetrical, so mean and median are close (the mean is usual); (c) median — the distribution is strongly skewed by a few large collections.
:::
:::

::: exercise Absolute numbers {level=1 check="3"}
A treatment reduces the risk of an illness from 6% to 3%. What is the absolute risk reduction, in percentage points?
::: solution
**3** percentage points (6% − 3%). The relative risk reduction is 50%, and the number needed to treat is 1 ÷ 0.03 ≈ 33.
:::
:::

::: exercise True or false about *p* {level=2}
Say whether each statement is true or false, and correct the false ones. (a) *p* = .20 shows that the treatment has no effect. (b) A result with *p* = .001 is always more important than one with *p* = .04. (c) A very small effect can be statistically significant in a very large sample. (d) *p* = .05 means there is a 95% chance that the hypothesis is correct.
::: solution
(a) False: it shows that a difference this large would not be unusual if there were no effect; the study may simply be too small. (b) False: a smaller *p* may come from a larger sample, not a larger or more important effect. (c) True. (d) False: *p* assumes the null hypothesis is true and cannot give the probability that the hypothesis is correct.
:::
:::

::: exercise Interpret a correlation {level=2}
An illustrative study reports: *Hours of sleep correlated with exam scores, r = .25, p = .002, n = 150.* Write two sentences that report this accurately, then state one thing the result does not show.
::: solution
A model: *Among 150 students, those who slept longer tended to have slightly higher exam scores (r = .25). The relationship was statistically significant but modest: sleep accounted statistically for only about 6% of the variation in scores (r² ≈ .06).* It does not show that more sleep **causes** higher scores (better-organised students may both sleep more and study more), and it does not show that the relationship is a straight line.
:::
:::

::: exercise Fix the commentary {level=2}
Rewrite this commentary so that it fits the illustrative data: *Figure 2 shows that average waiting time at the clinic fell dramatically after the new booking system, from 34 to 31 minutes.*
::: solution
*Figure 2 shows that average waiting time at the clinic fell slightly after the new booking system was introduced, from 34 to 31 minutes.* A 3-minute fall (about 9%) is not *dramatic*. A careful version might add whether the difference was statistically significant and whether anything else changed at the same time; *after* does not show that the system caused the fall.
:::
:::

::: exercise Read a full results paragraph {level=3}
Read this illustrative results paragraph and answer: (a) What was the main comparison? (b) How large was the effect, and how precisely was it estimated? (c) Is the final sentence justified?

> *Participants in the walking group reported lower anxiety at eight weeks (M = 11.2, SD = 4.9) than those in the waiting-list group (M = 13.0, SD = 5.1), a difference of 1.8 points on a 40-point scale, 95% CI [0.2, 3.4], p = .03, d = 0.36. Walking is therefore an effective treatment for anxiety and should replace medication for most patients.*
::: hint
Look at the width of the confidence interval and at what the waiting-list group received. Then compare the last sentence with the numbers.
:::
::: solution
(a) Anxiety scores at eight weeks in a walking group versus a waiting-list group (who received nothing yet).

(b) A difference of 1.8 points on a 40-point scale, a small-to-medium effect (*d* = 0.36). The 95% confidence interval runs from 0.2 to 3.4 points: the true difference could be almost nothing or nearly twice the estimate, so the estimate is imprecise. It is statistically significant (*p* = .03).

(c) No. The data show a modest, imprecisely estimated advantage of walking over **no treatment**, not over medication, which was not tested. *effective treatment* overstates a small effect, and *should replace medication for most patients* is a policy claim about a comparison the study did not make. A justified sentence: *Walking was associated with a modest reduction in anxiety compared with a waiting list; whether it compares well with established treatments was not tested.*
:::
:::

::: exercise Analyse a real graph {level=3}
Find a graph in a research article, a report or a news story on a topic you know. Using [[#rule-read-table]], write: (a) what it measures and in what units; (b) where the vertical axis starts and whether that affects the impression it gives; (c) the main comparison and the size of the difference; (d) whether the text that accompanies it describes it accurately. Suggest one change to the graph that would make it more honest or clearer.
::: solution
Answers depend on the graph. A good answer identifies units and groups precisely, notices a truncated axis or a selected time range if there is one, states differences in numbers (not only in words like *much higher*), compares the accompanying words with the data, and proposes a concrete change — starting a bar chart's axis at zero, adding error bars, showing a longer period, or labelling the units.
:::
:::
