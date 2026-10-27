Ask a language model to write a short story about a nurse and a surgeon, and count the pronouns. Ask it to complete "The man worked as a …" and "The woman worked as a …" a thousand times each, and compare the distributions. Give it two CVs that differ only in the name at the top and ask which candidate to interview. Each of these is a small experiment about **bias**, and each has been run, in some form, in published research. The results are rarely zero, and they matter because language models are now used to draft letters, screen applications, summarise medical notes and answer questions for very large numbers of people.

This chapter is about how to think precisely about such results. It separates the *sources* of bias (the data, the labels, the way a system is deployed), the *measurements* used to detect it (association tests on embeddings, benchmarks such as StereoSet and BBQ, counterfactual audits), and the *fairness criteria* used when a model's output feeds a decision. The mathematical centre is an impossibility result: when two groups have different base rates, a classifier cannot in general be both calibrated within each group and have equal error rates across groups. We prove it, compute it, and discuss what it does and does not imply. The chapter ends with mitigation methods and their limits.

Fairness is a field where technical and normative questions meet. Which disparity counts as unfair, and which trade-off is acceptable, are questions of values and law, not of mathematics. The aim here is to make the technical part exact so that the normative part can be argued clearly; where scholars disagree, the main positions are given.

## What "bias" means {#sec-meaning}

The word is used in at least three senses that are worth keeping apart:

- **Statistical bias**: the difference between the expectation of an estimator and the quantity it estimates. A model trained on unrepresentative data can be statistically biased for a subpopulation without anyone intending it.
- **Social bias**: systematic differences in how a system treats or represents people according to attributes such as gender, ethnicity, religion, age, disability or nationality, when those differences track stereotypes or historical disadvantage.
- **Unfairness**: a social bias that someone judges to be unjustified. This is a normative judgement, and different ethical and legal frameworks draw the line in different places.

Barocas, Crawford, Shapiro and Wallach (2017) distinguished two kinds of harm, a distinction widely used since.

::: definition Allocational and representational harm {#def-harms}
An **allocational harm** occurs when a system withholds an opportunity or resource — a loan, a job interview, medical attention — from some group, or allocates it unequally. A **representational harm** occurs when a system represents some group less favourably, stereotypes it, demeans it, or fails to recognise it, whether or not any resource changes hands.
:::

Language models produce both. A model used to rank CVs can cause allocational harm; a model that completes prompts about a religious group with violent associations causes representational harm, even if no decision is attached. Blodgett, Barocas, Daumé and Wallach (2020) surveyed 146 papers on "bias" in NLP and found that many did not say which harm they were measuring, who would be harmed, or why the measured behaviour was harmful. Their recommendation — state the harm, the affected people and the normative reasoning — is a good discipline for anything that follows.

### Where bias comes from {#sec-sources}

Suresh and Guttag (2021) gave a framework that follows a machine-learning system from data to deployment. Adapted to language models, the main sources are:

1. **Historical bias.** The world the text describes is unequal, and accurate text about it reflects that. If most engineers mentioned in a corpus are men because most engineers were men, a model that learns the corpus learns the association. Better sampling does not remove this; it is in the data-generating process itself.
2. **Representation bias.** Some groups, languages and dialects are under-represented in web-scale corpora. Text on the web over-represents some countries, younger people and certain registers; filtering for "quality" with classifiers trained on reference text can remove dialects at higher rates (Dodge et al., 2021, reported that blocklist filtering of C4 disproportionately removed text in African American English and text mentioning sexual minorities). See [[pretraining/training-data]] for how corpora are assembled and filtered.
3. **Measurement and label bias.** Supervised signals are proxies. Toxicity classifiers trained on crowd-sourced labels have been found to rate text in African American English as more toxic (Sap et al., 2019); preference data for post-training reflects the views of the annotators recruited. A model that learns from biased labels reproduces the labellers' judgements.
4. **Aggregation bias.** One model is fitted to a heterogeneous population; it may fit the majority well and others poorly.
5. **Evaluation bias.** Benchmarks that under-represent a group hide poor performance on it.
6. **Deployment bias.** A system is used for a purpose or a population it was not designed for, or its outputs are interpreted in a way its designers did not intend — for example, treating a fluency score as a measure of competence.

The list matters for mitigation: a fix aimed at one source (re-weighting the data) does nothing for another (a mismatched deployment).

::: warning "Just remove the protected attribute" does not remove bias
Deleting the gender or ethnicity column from a dataset — or the word "she" from a CV — rarely makes a model blind to it. Other features are correlated with protected attributes: names, postcodes, schools, hobbies, dialect, writing style. Language models are particularly good at inferring such attributes from text. A model can therefore discriminate through proxies while never seeing the attribute. Moreover, removing the attribute makes it impossible to *measure* disparities, which require knowing group membership. "Fairness through unawareness" is generally considered insufficient in the technical literature (Dwork et al., 2012; Barocas, Hardt and Narayanan, 2023), although legal regimes differ on whether a decision-maker may use the attribute to correct for disparities.
:::

## Measuring bias in language models {#sec-measuring}

### Association tests on embeddings {#sec-weat}

The first quantitative studies of social bias in NLP worked on word embeddings ([[text-and-language/word-embeddings]]). Caliskan, Bryson and Narayanan (2017) adapted the Implicit Association Test from psychology to embeddings.

::: definition Word Embedding Association Test (WEAT) {#def-weat}
Let $X, Y$ be two equal-sized sets of **target** words (for example, career words and family words) and $A, B$ two sets of **attribute** words (for example, male and female names). For a word $w$ with embedding $\mathbf{w}$ let

$$
s(w, A, B) = \frac{1}{\lvert A\rvert}\sum_{a\in A}\cos(\mathbf{w}, \mathbf{a}) - \frac{1}{\lvert B\rvert}\sum_{b\in B}\cos(\mathbf{w}, \mathbf{b}),
$$

the differential association of $w$ with $A$ over $B$. The **test statistic** is $S(X, Y, A, B) = \sum_{x\in X}s(x, A, B) - \sum_{y\in Y}s(y, A, B)$ and the **effect size** is

$$
d = \frac{\operatorname{mean}_{x\in X}s(x, A, B) - \operatorname{mean}_{y\in Y}s(y, A, B)}{\operatorname{std}_{w\in X\cup Y}s(w, A, B)},
$$

with the sample standard deviation. Significance is assessed by a **permutation test**: the one-sided $p$-value is the fraction of equal-size partitions $(X_i, Y_i)$ of $X\cup Y$ with $S(X_i, Y_i, A, B) \ge S(X, Y, A, B)$.
:::

The effect size has the form of Cohen's $d$: a value near $0$ means no differential association, and values above about $0.8$ are conventionally "large". Caliskan et al. reproduced, in GloVe embeddings trained on web text, many associations documented in human IAT studies, with large effect sizes — for instance between male and female names and career and family words. They also found that embedding associations with occupation words correlated strongly with the share of women in those occupations in US labour statistics: the embeddings encoded a description of the world as well as stereotypes about it.

::: example A WEAT effect size by hand {#ex-weat}
Two target words $x_1, x_2 \in X$ and two $y_1, y_2\in Y$ have differential associations $s(x_1) = 0.10$, $s(x_2) = 0.06$, $s(y_1) = -0.02$, $s(y_2) = -0.06$. Compute the test statistic, the effect size and the permutation $p$-value.
::: solution
$S = (0.10 + 0.06) - (-0.02 - 0.06) = 0.24$. The means are $0.08$ and $-0.04$, a difference of $0.12$. The four values have mean $0.02$ and deviations $0.08, 0.04, -0.04, -0.08$, so the sample variance is $(0.0064 + 0.0016 + 0.0016 + 0.0064)/3 = 0.00533$ and the standard deviation $0.0730$. Hence $d = 0.12/0.0730 = 1.64$, a large effect.

There are $\binom{4}{2} = 6$ ways to split the four words into two pairs; their statistics are $0.24, 0.08, 0, 0, -0.08, -0.24$. Only the observed split reaches $0.24$, so $p = 1/6 \approx 0.17$. A large effect size with a non-significant $p$-value: with so few words, no permutation test can be convincing. Real WEAT tests use about eight or more words per set, and results are sensitive to which words are chosen (Ethayarajh, Duvenaud and Hirst, 2019).
:::
:::

May et al. (2019) extended the test to sentence encoders (SEAT) by inserting words into template sentences, and found weaker and less consistent effects — an early sign that association tests designed for static embeddings transfer poorly to contextual models. A further and more fundamental concern is **validity**: an association in an embedding space need not predict any harmful behaviour downstream. Goldfarb-Tarrant et al. (2021) found little correlation between intrinsic embedding-bias measures and bias in downstream applications.

### Benchmarks for generative models {#sec-benchmarks}

For models that generate text, bias is measured on behaviour.

- **StereoSet** (Nadeem, Bethke and Reddy, 2021) presents a context and three continuations — stereotypical, anti-stereotypical and unrelated — across gender, profession, race and religion. The *stereotype score* is the percentage of pairs in which the model prefers the stereotypical continuation over the anti-stereotypical one (50 is the ideal); the *language-modelling score* is the percentage in which it prefers a meaningful continuation over the unrelated one; the *ICAT* score combines them as $\text{lms}\cdot\min(\text{ss}, 100 - \text{ss})/50$.
- **CrowS-Pairs** (Nangia et al., 2020) compares a model's likelihood of minimally different sentence pairs, one more stereotyping than the other.
- **BBQ**, the Bias Benchmark for Question Answering (Parrish et al., 2022), asks questions in two kinds of context. In an **ambiguous** context the information needed to answer is missing, so the correct answer is "unknown"; a model that answers with the stereotyped group instead reveals reliance on the stereotype. In a **disambiguated** context the answer is stated, and the question is whether the model still overrides it with the stereotype.

::: definition BBQ bias scores {#def-bbq}
In a set of contexts of one type, let $n_{\text{biased}}$ be the number of answers that select the stereotype-consistent target and $n_{\text{non-unk}}$ the number of answers that are not "unknown". The bias score in **disambiguated** contexts is

$$
s_{\text{DIS}} = 2\,\frac{n_{\text{biased}}}{n_{\text{non-unk}}} - 1,
$$

which ranges from $-1$ (all non-unknown answers go against the stereotype) through $0$ to $1$. In **ambiguous** contexts the same ratio is scaled by the error rate: $s_{\text{AMB}} = (1 - \text{accuracy})\,\bigl(2\,n_{\text{biased}}/n_{\text{non-unk}} - 1\bigr)$, so a model that correctly answers "unknown" every time scores $0$.
:::

::: example Scoring BBQ answers {#ex-bbq}
On $1000$ ambiguous questions a model answers "unknown" (correct) $800$ times; of the other $200$ answers, $150$ name the stereotyped group. Compute $s_{\text{AMB}}$.
::: solution
Accuracy is $0.8$. Among the non-unknown answers the biased fraction is $150/200 = 0.75$, so $2(0.75) - 1 = 0.5$. Then $s_{\text{AMB}} = (1 - 0.8)(0.5) = 0.10$. The scaling means a model can lower its score either by answering "unknown" more often or by distributing its wrong answers evenly; the two components should be reported separately.
:::
:::

Parrish et al. found that the models they tested (as of 2022) relied on stereotypes in ambiguous contexts, and that in disambiguated contexts accuracy was higher when the correct answer aligned with a stereotype than when it conflicted with one. Model developers now commonly report BBQ results in model documentation; as with every benchmark, the numbers describe particular model versions, and benchmarks become less informative once they are widely known and possibly in training data.

### Counterfactual audits and covert bias {#sec-audits}

A third approach varies one attribute in an otherwise fixed prompt — a name, a pronoun, a dialect — and compares outputs, as audit studies in economics have long done with CVs. Studies of this kind have reported differences in LLM-generated reference letters by gender (Wan et al., 2023) and in rankings of CVs by names associated with different groups; results vary with the model, the prompt and the task, and some find small or inconsistent effects. A notable study by Hofmann, Kalluri, Jurafsky and King (2024, *Nature*) compared text written in African American English with the same content in Standardised American English. Models that, asked directly, described African Americans in largely positive terms nevertheless associated speakers of the dialect with negative adjectives and, in hypothetical decision tasks, with less prestigious jobs. The authors called this **covert** bias and reported that preference fine-tuning reduced overt stereotypes more than covert ones.

::: warning A bias benchmark score is not a fairness guarantee
Benchmarks measure narrow behaviours on templated or crowd-written items, mostly in US English and for a fixed list of categories. Blodgett et al. (2021) audited four such benchmarks and found many items that were ambiguous, did not express a stereotype, or measured something other than what was claimed. A low score shows the absence of *that* measured behaviour, not the absence of harm in a deployment — which must be evaluated in the deployment's own language, population and task.
:::

## Fairness criteria for decisions {#sec-criteria}

When a model's output feeds a decision — approve or deny, flag or pass — we can use the language of classification ([[ml-fundamentals/evaluation-metrics#def-confusion]]). Let $Y\in\{0,1\}$ be the true outcome, $R\in[0,1]$ a score produced by the system (perhaps a language model's probability of "qualified"), $\hat Y = \mathbf 1[R \ge t]$ the decision, and $G$ the group. Most group-fairness criteria fall into three families (Barocas, Hardt and Narayanan, 2023).

::: definition Group fairness criteria {#def-criteria}
- **Independence (demographic parity).** $\hat Y$ is independent of $G$: $\Prob(\hat Y = 1\mid G = g)$ is the same for every group.
- **Separation (equalised odds; Hardt, Price and Srebro, 2016).** $\hat Y$ is independent of $G$ given $Y$: the true-positive rate and the false-positive rate are equal across groups. Requiring only equal true-positive rates is **equal opportunity**.
- **Sufficiency.** $Y$ is independent of $G$ given the score. For a score this is **calibration within groups**: $\Prob(Y = 1\mid R = r, G = g) = r$ for all $r$ and $g$. For a binary decision it is **predictive parity**: equal positive predictive value $\Prob(Y = 1\mid\hat Y = 1, G = g)$ across groups.
:::

Each criterion has a natural argument for it. Demographic parity says the decision should not depend on group at all — a view attractive where the outcome labels themselves are believed to reflect past discrimination. Separation says people with the same true outcome should face the same chance of error regardless of group. Sufficiency says a score should mean the same thing for everyone: a risk of $0.7$ should be a risk of $0.7$ whatever the person's group, so a decision-maker can treat it at face value.

::: example Three criteria on one table {#ex-criteria}
A screening model flags applicants for interview. In group A, of $1000$ applicants, $500$ are qualified; the model flags $500$, of whom $400$ are qualified. In group B, of $1000$ applicants, $200$ are qualified; the model flags $200$, of whom $160$ are qualified. Which criteria hold?
::: solution
Flag rates: A $500/1000 = 0.5$, B $200/1000 = 0.2$ — demographic parity fails. PPV: A $400/500 = 0.8$, B $160/200 = 0.8$ — predictive parity holds. True-positive rate: A $400/500 = 0.8$, B $160/200 = 0.8$ — equal opportunity holds. False-positive rate: A has $100$ false positives among $500$ unqualified, $0.2$; B has $40$ among $800$, $0.05$ — equalised odds fails. A group with a lower base rate gets a lower false-positive rate here; the next section shows this is forced.
:::
:::

## The impossibility of satisfying them together {#sec-impossibility}

In 2016 the news organisation ProPublica analysed COMPAS, a commercial risk-assessment tool used in US criminal courts, and reported that Black defendants who did not reoffend were almost twice as likely as white defendants to be labelled high risk — unequal false-positive rates (Angwin et al., 2016). The tool's developer replied that its scores were equally predictive for both groups — a defendant labelled high risk reoffended at about the same rate whatever their race. Both claims were largely supported by the data. Within months, two independent analyses showed why they could not both be "fixed" at once.

::: proposition Error rates are tied to prevalence (Chouldechova, 2017) {#prop-chouldechova}
For a binary classifier on a group with prevalence $p = \Prob(Y = 1)\in(0, 1)$, positive predictive value $\text{PPV} > 0$, false-negative rate $\text{FNR}$ and false-positive rate $\text{FPR}$,

$$
\text{FPR} = \frac{p}{1 - p}\cdot\frac{1 - \text{PPV}}{\text{PPV}}\cdot(1 - \text{FNR}).
$$ {#eq-chouldechova}

Consequently, if two groups have equal PPV and equal FNR but different prevalence, their FPRs differ.
:::

::: proof
Take a group of size $n$, and write $TP, FP, FN, TN$ for the counts. Then $TP + FN = pn$ and $FP + TN = (1 - p)n$. By definition $1 - \text{FNR} = TP/(pn)$, so $TP = pn(1 - \text{FNR})$. From $\text{PPV} = TP/(TP + FP)$ we get $FP = TP(1 - \text{PPV})/\text{PPV}$. Hence

$$
\text{FPR} = \frac{FP}{(1 - p)n} = \frac{pn(1 - \text{FNR})}{(1 - p)n}\cdot\frac{1 - \text{PPV}}{\text{PPV}},
$$

which is [[#eq-chouldechova]]. If PPV and FNR are fixed, the right-hand side is a strictly increasing function of $p$ (as $p/(1-p)$ is, provided $\text{PPV} < 1$ and $\text{FNR} < 1$), so groups with different prevalence have different FPR.
:::

In [[#ex-criteria]], $p = 0.5$ and $0.2$, PPV $= 0.8$ and FNR $= 0.2$: the formula gives $1\cdot0.25\cdot0.8 = 0.2$ and $0.25\cdot0.25\cdot0.8 = 0.05$, as counted.

::: widget plot
f: x/(1 - x)*(1 - v)/v*(1 - r)
x: 0.02, 0.9
y: 0, 1
sliders: v=0.8:0.3:0.99:0.01; r=0.2:0:0.9:0.01
labels: false-positive rate
points: 0.5,0.2; 0.2,0.05
caption: The false-positive rate forced by [[#eq-chouldechova]] as a function of a group's prevalence $p$, when the positive predictive value (slider $v$) and false-negative rate (slider $r$) are held equal across groups. The two marked points are the groups of [[#ex-criteria]]. Whatever the sliders, the curve is increasing: groups with different prevalence cannot share all three rates unless PPV is $1$ or FNR is $1$.
:::

Kleinberg, Mullainathan and Raghavan (2016) proved a version for scores rather than thresholded decisions, using calibration and two "balance" conditions that generalise equal error rates.

::: definition Balance for the positive and negative class {#def-balance}
A score $R$ is **balanced for the positive class** if the mean score of people with $Y = 1$, $\E[R\mid Y = 1, G = g]$, is the same for every group, and **balanced for the negative class** if $\E[R\mid Y = 0, G = g]$ is the same for every group.
:::

::: theorem Calibration and balance are incompatible (Kleinberg, Mullainathan and Raghavan, 2016) {#thm-kmr}
Suppose a score is calibrated within each of two groups and balanced for both the positive and the negative class. Then either the two groups have the same prevalence, or the score is perfect: $R = 1$ for every positive and $R = 0$ for every negative.
:::

::: proof
Fix a group $g$ with prevalence $p_g$, and let $x = \E[R\mid Y = 0, G = g]$ and $y = \E[R\mid Y = 1, G = g]$; by balance, $x$ and $y$ are the same for both groups. Calibration gives $\E[Y\mid R, G = g] = R$, so taking expectations, $\E[R\mid G = g] = \E[Y\mid G = g] = p_g$: the mean score equals the prevalence. Splitting the mean score by outcome,

$$
(1 - p_g)\,x + p_g\,y = p_g \qquad \text{for } g = 1, 2.
$$

Subtracting the two equations gives $(p_2 - p_1)(y - x) = p_2 - p_1$. If $p_1 \ne p_2$, then $y - x = 1$; since $0\le x\le y\le1$, this forces $x = 0$ and $y = 1$. A score in $[0, 1]$ with mean $0$ on negatives is $0$ almost surely on negatives, and one with mean $1$ on positives is $1$ almost surely on positives: the score is perfect. Otherwise $p_1 = p_2$.
:::

Kleinberg et al. also showed an approximate version: if the conditions hold approximately, then the base rates are approximately equal or prediction is approximately perfect. Chouldechova's result is the thresholded counterpart: equal PPV (a binary form of calibration) and equal FNR force unequal FPR.

### What the result does and does not say {#sec-interpreting}

The theorem is a mathematical fact about any predictor, human or machine, and it settles one empirical dispute: in the COMPAS case both sides could be right about the numbers, because the conditions they cared about cannot hold together when base rates differ. It does not settle which criterion to prefer; that question remained contested afterwards, and the main positions are these.

- **For calibration (sufficiency).** A calibrated score means the same for everyone, so decision-makers can apply a single threshold and treat equal risks equally. Corbett-Davies et al. (2017) showed that, for a fixed constraint-free objective, the optimal decision rule applies a single threshold to a calibrated risk score, and that imposing equal error rates requires group-specific thresholds that treat people with the same estimated risk differently — which may itself be considered discriminatory and may be unlawful in some contexts.
- **For error-rate balance (separation).** The burdens of error fall on individuals: a person who would not reoffend but is detained bears the full cost of a false positive. On this view a group that suffers twice the false-positive rate is wronged, whatever the score means on average. Proponents also note that observed base rates may themselves reflect biased measurement (for example, arrest rather than offending), in which case calibration to the observed labels inherits that bias.
- **For questioning the task.** Others argue that when the criteria conflict, the right response may be to change the decision — reduce the stakes of a false positive, collect better labels, or not automate the decision at all — rather than to pick a metric (Barocas, Hardt and Narayanan, 2023, ch. 2–3, discuss this view).

These positions rest on different ethical premises; the mathematics shows only that a choice is unavoidable once base rates differ and prediction is imperfect.

::: example Calibration forces unequal error rates {#ex-calibrated}
In group A, a calibrated score takes the value $0.8$ for $600$ people and $0.2$ for $400$; in group B, $0.8$ for $200$ people and $0.2$ for $800$. The decision flags everyone with score $0.8$. Compute each group's prevalence, PPV, FPR and FNR.
::: solution
Calibration means $80\%$ of the people with score $0.8$, and $20\%$ of those with score $0.2$, have $Y = 1$.

Group A: positives $0.8\cdot600 + 0.2\cdot400 = 480 + 80 = 560$, prevalence $0.56$. Flagged $600$, of whom $480$ positive: PPV $0.8$. FNR $= 80/560 = 0.143$. Negatives $440$, of whom $120$ flagged: FPR $= 120/440 = 0.273$.

Group B: positives $0.8\cdot200 + 0.2\cdot800 = 160 + 160 = 320$, prevalence $0.32$. PPV $= 160/200 = 0.8$. FNR $= 160/320 = 0.5$. Negatives $680$, of whom $40$ flagged: FPR $= 40/680 = 0.059$.

The same calibrated score and threshold give group A almost five times the false-positive rate and group B three and a half times the false-negative rate. Check with [[#eq-chouldechova]] for A: $(0.56/0.44)(0.25)(0.857) = 0.273$.
:::
:::

### A simulation {#sec-code}

The listing draws calibrated scores for two groups with different base rates and evaluates one threshold. It uses only the standard library.

```python
import random
rng = random.Random(2016)

def make_group(n, alpha, beta):
    """Scores s ~ Beta(alpha, beta); outcome y ~ Bernoulli(s), so the score is calibrated."""
    data = []
    for _ in range(n):
        s = rng.betavariate(alpha, beta)
        data.append((s, rng.random() < s))
    return data

groups = {"A": make_group(20000, 3, 2),    # base rate about 0.6
          "B": make_group(20000, 2, 3)}    # base rate about 0.4

def rates(data, t=0.5):
    tp = sum(1 for s, y in data if s >= t and y)
    fp = sum(1 for s, y in data if s >= t and not y)
    fn = sum(1 for s, y in data if s < t and y)
    tn = sum(1 for s, y in data if s < t and not y)
    return {"base rate": (tp + fn) / len(data), "flagged": (tp + fp) / len(data),
            "PPV": tp / (tp + fp), "FPR": fp / (fp + tn), "FNR": fn / (fn + tp)}

for g, data in groups.items():
    # calibration check: mean outcome among scores in [0.6, 0.7)
    sel = [y for s, y in data if 0.6 <= s < 0.7]
    r = rates(data)
    print(g, "  ".join(f"{k} {v:.3f}" for k, v in r.items()),
          f" P(y=1 | s in [0.6,0.7)) {sum(sel)/len(sel):.3f}")
```

```text
A base rate 0.603  flagged 0.689  PPV 0.713  FPR 0.499  FNR 0.187  P(y=1 | s in [0.6,0.7)) 0.645
B base rate 0.407  flagged 0.314  PPV 0.657  FPR 0.182  FNR 0.493  P(y=1 | s in [0.6,0.7)) 0.662
```

Both groups are calibrated (people scored between $0.6$ and $0.7$ have the outcome about $65\%$ of the time in each), yet the false-positive rate is $0.50$ in group A and $0.18$ in B, and the false-negative rates are reversed. Plugging group A's numbers into [[#eq-chouldechova]] gives $(0.603/0.397)(0.287/0.713)(0.813) = 0.497$, matching the simulated $0.499$ up to rounding. Choosing separate thresholds for the two groups could equalise the FPRs, at the cost of treating equal scores differently.

::: quiz
A lender's model is calibrated within each of two groups whose default rates differ, and its predictions are imperfect. A regulator asks the lender to also make the false-positive rate (creditworthy applicants wrongly refused) and the false-negative rate equal across groups. What follows from [[#thm-kmr]]?
- [ ] The lender can satisfy the request by retraining on more data.
- [x] The request cannot be met while keeping calibration within both groups; some criterion must be relaxed.
- [ ] Calibration implies equal error rates, so the request is already met.
- [ ] The theorem applies only to criminal justice data.
::: solution
With unequal base rates and imperfect prediction, calibration within groups and balance for both classes cannot hold together, whatever the data or model. The lender must give up calibration (for example, by group-specific thresholds), accept unequal error rates, or change the decision process. The theorem is about any predictor, in any domain.
:::
:::

## Mitigation and its limits {#sec-mitigation}

Mitigation methods act at each stage of the pipeline, and each addresses a particular source.

**Data.** Curating and re-balancing pretraining and fine-tuning data addresses representation bias; documenting it (datasheets, Gebru et al., 2021; data statements, Bender and Friedman, 2018) makes the remaining gaps visible. **Counterfactual data augmentation** adds copies of training sentences with group terms swapped ("he" ↔ "she") so that the model sees both versions (Lu et al., 2020; Zmigrod et al., 2019 for morphologically rich languages). Swapping can produce implausible text and covers only the terms listed.

**Representations.** Bolukbasi et al. (2016) identified a "gender direction" in word2vec as the main principal component of differences such as $\mathbf{he} - \mathbf{she}$ and projected it out of gender-neutral words. Gonen and Goldberg (2019) showed that after this "hard debiasing", words that had been stereotypically gendered still clustered together and a classifier could recover their original gender association with high accuracy: the projection removed a measurement of the bias, not the information. The lesson generalises — debiasing that targets the metric can leave the underlying information intact.

**Post-training.** Instruction tuning and preference optimisation ([[post-training/rlhf]]) can teach a model to refuse stereotyping requests, to answer "unknown" when a question is ambiguous, and to avoid demeaning language; published model reports show improved scores on bias benchmarks after such training. The covert-bias results above suggest that this can suppress overt expression more than it changes underlying associations, and that the reduction is concentrated in the behaviours the training data targeted.

**Decision rules.** In a classification setting, post-processing can choose group-specific thresholds to achieve equalised odds (Hardt, Price and Srebro, 2016). By the impossibility theorem, this gives up calibration. Whether the decision may depend on group membership is a legal as well as technical question: in many jurisdictions explicitly group-dependent decisions are restricted, while disparities in outcome can also create liability (the US doctrines of disparate treatment and disparate impact are the best-known example).

**Evaluation and governance.** Disaggregated evaluation — reporting performance separately by group, and at intersections of groups — is the minimum. Buolamwini and Gebru (2018) found that commercial gender-classification systems had error rates below $1\%$ for lighter-skinned men but up to about $35\%$ for darker-skinned women, a disparity invisible in aggregate accuracy and larger at the intersection than for either attribute alone. Model cards (Mitchell et al., 2019) standardise such reporting.

::: warning Mitigation can move a harm rather than remove it
A filter that removes "toxic" text from training data can remove dialects or identity terms at higher rates (see [[#sec-sources]]); a model trained to avoid mentioning a group can become less useful for that group's own questions; equalising one error rate unequalises another (see [[#thm-kmr]]). Evaluate a mitigation on the harms it is meant to reduce *and* on the performance and representation of the groups it affects.
:::

Several limits are structural rather than temporary. Benchmarks exist mainly for English and for a few attribute categories, so most of the world's languages and many forms of disadvantage (caste, for example, or regional and class identities) have little or no measurement (Ramesh et al., 2023, discuss fairness beyond Western contexts). Group-based criteria require group labels, which may be unavailable, sensitive or legally protected. And "fair" is defined relative to a task: the same model may be adequate for drafting emails and inadequate for screening tenants. Weidinger et al. (2021; 2022) placed discrimination, exclusion and toxicity alongside other risks of language models in a broader taxonomy, emphasising that their severity depends on the application.

::: application Auditing an LLM-based screening tool
An organisation wants to use a language model to summarise and score job applications. A careful audit would (1) define the decision and the harm (being wrongly screened out); (2) build a test set of real or realistic applications with relevant group information, and counterfactual pairs varying names, pronouns and dialect; (3) measure selection rates, error rates against a validated outcome, and calibration of scores, by group and at intersections, with confidence intervals ([[ml-fundamentals/evaluation-metrics#sec-uncertainty]]); (4) document which criteria hold and which trade-off was chosen and why; and (5) re-audit after any model update, since behaviour changes between versions. In some jurisdictions such audits are legally required for automated employment decision tools — New York City's Local Law 144, enforced from July 2023, requires annual independent bias audits of selection rates — and the EU AI Act lists AI used in recruitment as high-risk ([[llm-society/governance-regulation]]).
:::

::: history
Concern about bias in automated decisions predates machine learning: Friedman and Nissenbaum (1996) classified bias in computer systems as pre-existing, technical or emergent. Formal fairness criteria were developed from about 2010 — Dwork et al. (2012) proposed "fairness through awareness" (similar individuals treated similarly) — and the field accelerated after ProPublica's COMPAS analysis (2016) and the impossibility results of Kleinberg, Mullainathan and Raghavan (2016) and Chouldechova (2017); Hardt, Price and Srebro (2016) introduced equalised odds the same year. In NLP, Bolukbasi et al. (2016) and Caliskan, Bryson and Narayanan (2017, *Science*) showed stereotypes in word embeddings; benchmarks for generative and question-answering models followed (StereoSet and CrowS-Pairs in 2020–21, BBQ in 2022). Bender, Gebru, McMillan-Major and Mitchell (2021) argued that ever-larger models trained on undocumented web data would encode hegemonic viewpoints, and Weidinger et al. (2021) placed these harms in a taxonomy of LLM risks. Barocas, Hardt and Narayanan's *Fairness and Machine Learning* (2023) is the standard text.
:::

::: summary
- Distinguish statistical bias, social bias and unfairness; distinguish allocational from representational harm, and state which harm, to whom, and why it matters.
- Bias enters through historical patterns, unrepresentative data and filtering, biased labels, aggregation, evaluation gaps and mismatched deployment; removing a protected attribute does not remove proxies.
- WEAT measures differential associations in embeddings with an effect size and a permutation test; StereoSet, CrowS-Pairs and BBQ measure behaviour; counterfactual audits vary one attribute. All have validity limits, and benchmark scores are not guarantees.
- Group criteria fall into independence (demographic parity), separation (equalised odds) and sufficiency (calibration, predictive parity).
- With unequal base rates and imperfect prediction, calibration within groups and equal error rates cannot all hold ([[#prop-chouldechova]], [[#thm-kmr]]); which to prefer is a normative and legal choice on which reasonable positions differ.
- Mitigations act on data, representations, post-training and decision rules; each has limits, and some move harm rather than remove it. Evaluate disaggregated, in the deployment's language and task, and re-audit after updates.
:::

## Exercises

::: exercise Demographic parity difference {level=1 check="0.15"}
A model approves $45\%$ of applicants in group A and $30\%$ in group B. What is the demographic parity difference $\Prob(\hat Y = 1\mid A) - \Prob(\hat Y = 1\mid B)$? Give the answer to two decimal places.
::: solution
$0.45 - 0.30 = 0.15$. (The ratio $0.30/0.45 = 0.67$ is also reported; the US "four-fifths rule" of thumb in employment compares this ratio with $0.8$.)
:::
:::

::: exercise Reading off error rates {level=1 check="0.1"}
In a group of $500$ people, $100$ have $Y = 1$. A classifier flags $120$ people, of whom $80$ have $Y = 1$. Compute the false-positive rate (exact).
::: solution
False positives: $120 - 80 = 40$. Negatives: $500 - 100 = 400$. FPR $= 40/400 = 0.1$. (Also FNR $= 20/100 = 0.2$ and PPV $= 80/120 = 2/3$.)
:::
:::

::: exercise The Chouldechova identity in numbers {level=1 check="0.229"}
A group has prevalence $0.4$; a classifier has PPV $0.7$ and FNR $0.2$ on it. Use [[#eq-chouldechova]] to find its FPR, to three decimal places.
::: solution
$\text{FPR} = (0.4/0.6)\cdot(0.3/0.7)\cdot0.8 = 0.6667\cdot0.4286\cdot0.8 = 0.229$.
:::
:::

::: exercise A BBQ score {level=2 check="0.06"}
On ambiguous BBQ questions a model has accuracy $0.4$ (the fraction of "unknown" answers). Of its non-unknown answers, $55\%$ choose the stereotyped target. Compute $s_{\text{AMB}}$ to two decimal places, and compare with a model that has the same split but accuracy $0.7$.
::: solution
$2(0.55) - 1 = 0.1$ and $1 - 0.4 = 0.6$, so $s_{\text{AMB}} = 0.6\cdot0.1 = 0.06$. With accuracy $0.7$ it would be $0.3\cdot0.1 = 0.03$: the same tendency to stereotype produces a larger score when the model guesses more often.
:::
:::

::: exercise WEAT with three words a side {level=2 check="0.05"}
Target sets $X = \{x_1, x_2, x_3\}$, $Y = \{y_1, y_2, y_3\}$ have differential associations $0.09, 0.05, 0.04$ and $0.03, -0.01, -0.02$. The observed split has the largest test statistic of all $\binom63 = 20$ splits. What is the one-sided permutation $p$-value? Give it to two decimal places.
::: solution
Only the observed split (with the three largest values in $X$) attains the maximum, so $p = 1/20 = 0.05$. With three words per set, $0.05$ is the smallest $p$-value a permutation test can produce; the sets used by Caliskan et al. were larger for this reason.
:::
:::

::: exercise Which criterion? {level=2}
For each scenario, say which family of criteria (independence, separation, sufficiency) the stated concern corresponds to, and name one cost of enforcing it. (a) "Women who would have repaid are refused loans more often than men who would have repaid." (b) "A risk score of 30% should mean a 30% chance of default for every applicant." (c) "The share of each group invited to interview should match its share of applicants."
::: solution
(a) Separation — specifically, unequal false-positive rates for refusal (equal opportunity for the creditworthy). Enforcing it with unequal base rates sacrifices calibration and usually requires group-specific thresholds. (b) Sufficiency (calibration within groups). Enforcing it with unequal base rates forces unequal error rates ([[#thm-kmr]]). (c) Independence (demographic parity). If qualification rates genuinely differ, it forces different thresholds or accepting less-qualified applicants in one group and rejecting more-qualified ones in another; if the measured qualification is itself biased, proponents argue it corrects that bias.
:::
:::

::: exercise Calibration with three score values {level=2 check="0.15"}
A calibrated score takes values $0.9$, $0.5$ and $0.1$. In group B, $100$, $200$ and $700$ people receive these scores. The decision flags scores of $0.5$ or above. Compute group B's false-positive rate to two decimal places.
::: solution
Negatives: $0.1\cdot100 + 0.5\cdot200 + 0.9\cdot700 = 10 + 100 + 630 = 740$. Flagged negatives: $10 + 100 = 110$. FPR $= 110/740 = 0.149 \approx 0.15$. (Positives: $90 + 100 + 70 = 260$, prevalence $0.26$; flagged positives $190$, FNR $= 70/260 = 0.27$.)
:::
:::

::: exercise When one condition is dropped {level=3}
Show by example that if *calibration* is dropped, a score can be balanced for both classes in two groups with different base rates without being perfect. Then show that if *balance for the negative class* is dropped, a calibrated score can be balanced for the positive class with different base rates.
::: solution
(1) Let $R = 0.7$ for every positive and $R = 0.3$ for every negative, in both groups, with prevalences $0.6$ and $0.3$. Balance holds ($x = 0.3$, $y = 0.7$ in both). Calibration fails: in group A the mean score is $0.4\cdot0.3 + 0.6\cdot0.7 = 0.54 \ne 0.6$.

(2) In the proof of [[#thm-kmr]], only the positive balance condition fixes $y$ across groups; $x_g$ may differ. Take both groups with a calibrated score taking values $0$ and $s$: a fraction $q_g$ receive $s$, and of them a fraction $s$ are positive; the rest receive $0$ and are all negative. All positives have score $s$, so $y = s$ in both groups (positive balance), and the score is calibrated. Prevalence is $p_g = q_g s$, which differs if $q_A \ne q_B$. For example $s = 0.8$, $q_A = 0.75$, $q_B = 0.25$ gives prevalences $0.6$ and $0.2$. Negative-class means are $x_g = q_g s(1 - s)/(1 - p_g)$: $0.75\cdot0.8\cdot0.2/0.4 = 0.3$ and $0.25\cdot0.8\cdot0.2/0.8 = 0.05$ — unbalanced, as the theorem requires.
:::
:::

::: exercise Group-specific thresholds {level=3}
Using the listing in [[#sec-code]], find for group B the threshold $t_B$ (in steps of $0.01$, keeping $t_A = 0.5$) whose false-positive rate is closest to group A's. Report $t_B$ and the resulting PPV and FNR for B, and explain in two sentences what has been traded.
::: solution
Add a search over thresholds:

```python
best = min((abs(rates(groups["B"], t / 100)["FPR"] - rates(groups["A"])["FPR"]), t / 100)
           for t in range(5, 96))
tB = best[1]
print(tB, {k: round(v, 3) for k, v in rates(groups["B"], tB).items()})
```

```text
0.31 {'base rate': 0.407, 'flagged': 0.635, 'PPV': 0.53, 'FPR': 0.503, 'FNR': 0.173}
```

A threshold of $0.31$ for group B gives an FPR of $0.503$, matching A's $0.499$. (The search starts at $0.05$ so that no threshold flags nobody or everybody, which would leave a rate undefined.) B's FNR falls to $0.17$ (close to A's $0.19$) but its PPV falls to $0.53$ against A's $0.713$: a flag now means less in group B, and two people with the same score of $0.4$ are treated differently according to group. Equalised odds has been bought with predictive parity and with group-dependent treatment.
:::
:::

::: exercise Designing a bias evaluation {level=3}
You are asked to evaluate whether a multilingual chat assistant, deployed in India, stereotypes by religion and caste. Existing benchmarks are mostly English and US-centred. Outline an evaluation plan: what you would measure, how you would construct test items, how you would validate them, and how you would report the results.
::: solution
A strong answer includes: (1) a statement of the harms (representational: stereotyping and demeaning content; allocational if the assistant is used in decisions); (2) consultation with people from the affected communities and local experts to identify the relevant stereotypes, terms and names, since translated US benchmarks miss them; (3) test items of several kinds — BBQ-style ambiguous/disambiguated questions adapted to local stereotypes, counterfactual prompts varying names and community markers, and open-ended generation scored for stereotypes — in each deployment language including code-mixed text; (4) validation of items by multiple annotators from different communities, with agreement statistics, discarding ambiguous items (the critique of Blodgett et al., 2021); (5) metrics reported per language and per group with confidence intervals and the baseline rate of "unknown"; (6) a statement of limitations (coverage, annotator positionality, prompt sensitivity) and a plan to re-run after model updates. Work on caste bias in NLP exists but is limited (as of 2026), so new items will likely be needed.
:::
:::
