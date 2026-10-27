Producing a fluent, plausible news article used to take a person an hour; a language model produces one in seconds for a fraction of a cent. Generating a thousand variations of a message tailored to different audiences, sustaining conversations with many people at once, or writing in the voice of a local community member are now cheap. These facts have led to widespread concern that language models will flood the information environment with falsehoods and manipulate opinion at scale. Other researchers have argued that the concern is overstated: the bottleneck for misinformation was never the supply of content but the attention and trust of audiences, which are not cheaper to obtain than before.

This chapter examines the question with the evidence. It defines the terms, sets out a threat model, and reviews experimental studies of how persuasive AI-generated messages and conversations are — with their measured effect sizes, sample sizes and limitations. It then turns to **detection**: why classifiers that tell human from machine text are unreliable, including a proof of an upper bound on any detector's performance in terms of the distance between the two distributions, and why base rates make false accusations a central problem. Watermarks, which require the generator's cooperation, are derived in [[llm-society/copyright-provenance#alg-watermark]]; here we discuss what they can and cannot do against misinformation. The chapter ends with countermeasures and the main open disagreements.

Results in this area are dated and fragile: models change every few months, most studies use online survey samples in a few countries, and effects measured immediately after a message often fade. Each result below is attributed and should be read with that in mind.

## Terms and threat model {#sec-terms}

::: definition Misinformation, disinformation and malinformation {#def-misinfo}
Following Wardle and Derakhshan (2017): **misinformation** is false or misleading information shared without intent to deceive; **disinformation** is false information created or shared deliberately to deceive or cause harm; **malinformation** is genuine information shared to cause harm (for example, leaked private data). An **influence operation** is a coordinated effort to affect the opinions or behaviour of a target audience, often concealing the identity of the actor behind it.
:::

Language models bear on all three. They can produce misinformation unintentionally — a confident, wrong answer is a hallucination ([[prompting-rag/hallucination]]) — and they can be used as tools for disinformation. Goldstein et al. (2023), a report by researchers from Georgetown's Center for Security and Emerging Technology, OpenAI and the Stanford Internet Observatory, analysed how language models might change influence operations along three dimensions:

- **Actors**: cheaper content may let more, and less resourced, actors run operations.
- **Behaviour**: operations can scale, personalise and run interactive conversations rather than broadcast fixed messages.
- **Content**: messages may become more persuasive, more linguistically and culturally fluent, and harder to identify by the stylistic errors that once gave operations away.

The economic argument is worth making precise, because it is where proponents and sceptics of the threat diverge.

::: example The cost of content and the cost of reach {#ex-cost}
An operation wants $10{,}000$ distinct social-media posts. A contracted writer produces $20$ posts an hour at US\$10 an hour; a language model API costs US\$2 per million output tokens and a post is about $60$ tokens. A network of fake accounts able to distribute posts costs US\$0.50 per account per day to maintain, and the operation runs $500$ accounts for $30$ days. Compare the cost of content with the cost of distribution.
::: solution
Human writing: $10{,}000/20 = 500$ hours, US\$5,000. Model: $10{,}000\cdot60 = 6\times10^5$ tokens, US\$1.20, plus a few hours of human time to set up and check. Distribution: $500\cdot30\cdot0.50 = $ US\$7,500. The model reduces content cost by three orders of magnitude, but in this (stylised) budget content was already less than half the total, and distribution — accounts, avoiding platform detection, gaining followers — is unchanged. Sceptics (for example Simon, Altay and Mercier, 2023) argue that this is the typical situation; others reply that models also reduce the cost of making fake accounts look authentic, of running conversations, and of producing content in languages the operators do not speak.
:::
:::

## Can people tell? {#sec-human-detection}

Several studies found that people perform near chance at telling human from model text. Jakesch, Hancock and Naaman (2023) found that participants' accuracy at identifying AI-generated self-presentations (in professional, hospitality and dating profiles) was close to $50\%$, and that they relied on flawed heuristics — for example, treating first-person pronouns and family topics as signs of human authorship — which could be exploited to make AI text seem more human than human text. Spitale, Biller-Andorno and Germani (2023) found that participants could not distinguish GPT-3-written tweets from human-written ones, and that they recognised true information more readily, and disinformation less readily, when GPT-3 wrote it. These results concern models and participants of their time; they indicate that the stylistic tells that helped expose earlier operations should not be relied on.

## How persuasive are language models? {#sec-persuasion}

Persuasion research measures attitude change in randomised experiments: participants are assigned to read a message (or hold a conversation) or to a control, then report agreement with a claim. The quantity reported is the **treatment effect**, usually a difference in mean agreement or in the proportion agreeing.

::: definition Average treatment effect and standardised effect size {#def-ate}
With outcome $Y$ (for example, agreement on a 0–100 scale), treatment $W\in\{0, 1\}$ assigned at random, the **average treatment effect** is $\tau = \E[Y\mid W = 1] - \E[Y\mid W = 0]$, estimated by the difference of sample means $\hat\tau = \bar Y_1 - \bar Y_0$ with standard error $\sqrt{s_1^2/n_1 + s_0^2/n_0}$. The **standardised effect size** (Cohen's $d$) is $\tau/\sigma$, where $\sigma$ is the outcome's standard deviation; $d\approx0.2$ is conventionally "small".
:::

Main findings, as of the dates given:

- **Written propaganda.** Goldstein, Chao, Grossman, Stamos and Tomz (2024) showed US survey respondents real propaganda articles from covert foreign campaigns, or GPT-3-written articles on the same theses. Agreement with the thesis was about $24\%$ in the control group, about $47\%$ after the original propaganda and about $44\%$ after GPT-3's articles; with light human curation of the model's output, it matched or exceeded the originals.
- **Policy messages.** Bai, Voelkel, Eichstaedt and Willer (2025) found that messages written by GPT-3 on policy issues (such as gun control and a carbon tax) shifted attitudes by a few points on 0–100 scales — comparable to messages written by people, and like them small.
- **Microtargeting.** Hackenburg and Margetts (2024) found that messages tailored to participants' demographic and political profiles were not significantly more persuasive than generic messages from the same model; both had effects of a few percentage points.
- **Scale.** Hackenburg et al. (2025) compared $24$ models of different sizes and found that persuasiveness of a single message rose with size with sharply diminishing returns, roughly logarithmically, and that the largest models were barely more persuasive than much smaller ones once basic task completion (coherence, staying on topic) was accounted for.
- **Conversation.** Salvi et al. (2025, *Nature Human Behaviour*) had participants debate either a human or GPT-4 on a topic. When GPT-4 was given basic demographic information about its opponent, it was more persuasive than human debaters on average; without that information the difference was not significant. A large study by Hackenburg and colleagues at the UK AI Security Institute (2025) tested many models in conversations with tens of thousands of UK participants and reported that post-training and prompting for information-dense arguments raised persuasiveness more than personalisation or model scale did — and that the changes that made models more persuasive also made their claims less accurate on average.
- **Correcting beliefs.** Costello, Pennycook and Rand (2024, *Science*) had people who endorsed a conspiracy theory hold a short conversation with GPT-4 Turbo instructed to argue against it using evidence. Belief in the theory fell by about $20\%$ on average, and the reduction persisted at a two-month follow-up. Persuasion can serve accuracy as well as undermine it.

::: warning A significant effect in a survey experiment is not an effect on an election
Most studies measure attitude change immediately after one exposure, among online survey participants who are paid to pay attention. Effects in such settings are typically a few points and often decay within weeks. In the field, messages compete with many others and most people never see them: Kalla and Broockman (2018), in a meta-analysis of campaign contact in US general elections, found average persuasive effects close to zero. Conversely, small effects can matter in close contests or when aggregated over many exposures. Neither "AI persuasion is powerful" nor "it has no effect" follows from a single experiment.
:::

The sizes of these effects make the statistics matter. A simulation shows how much precision a study needs.

```python
import math, random
rng = random.Random(2024)

# 1. A simulated persuasion experiment: attitudes on a 0-100 scale, sd 25,
#    true effect of reading an AI-written message +3 points.
def experiment(n, effect=3.0, sd=25.0):
    control = [rng.gauss(50, sd) for _ in range(n)]
    treated = [rng.gauss(50 + effect, sd) for _ in range(n)]
    diff = sum(treated) / n - sum(control) / n
    var = lambda xs: sum((x - sum(xs) / n) ** 2 for x in xs) / (n - 1)
    se = math.sqrt(var(control) / n + var(treated) / n)
    return diff, diff - 1.96 * se, diff + 1.96 * se

for n in (200, 1000, 5000):
    d, lo, hi = experiment(n)
    print(f"n per arm {n:5d}: estimated effect {d:5.2f} points, 95% CI [{lo:5.2f}, {hi:5.2f}]")

# 2. Detectors: the ceiling on AUROC given total variation distance, and precision
def auroc_bound(tv):
    return 0.5 + tv - tv ** 2 / 2

for tv in (0.1, 0.3, 0.6, 0.9):
    print(f"TV {tv:.1f}: best possible AUROC {auroc_bound(tv):.3f}")

def precision(prevalence, tpr, fpr):
    return prevalence * tpr / (prevalence * tpr + (1 - prevalence) * fpr)

for prev in (0.5, 0.1, 0.02):
    print(f"AI share {prev:4.2f}: precision {precision(prev, 0.9, 0.01):.3f} (FPR 1%),"
          f" {precision(prev, 0.9, 0.2):.3f} (FPR 20%)")
```

```text
n per arm   200: estimated effect -1.13 points, 95% CI [-6.01,  3.76]
n per arm  1000: estimated effect  2.57 points, 95% CI [ 0.36,  4.78]
n per arm  5000: estimated effect  2.80 points, 95% CI [ 1.81,  3.80]
TV 0.1: best possible AUROC 0.595
TV 0.3: best possible AUROC 0.755
TV 0.6: best possible AUROC 0.920
TV 0.9: best possible AUROC 0.995
AI share 0.50: precision 0.989 (FPR 1%), 0.818 (FPR 20%)
AI share 0.10: precision 0.909 (FPR 1%), 0.333 (FPR 20%)
AI share 0.02: precision 0.647 (FPR 1%), 0.084 (FPR 20%)
```

With $200$ participants per arm, a true effect of $3$ points ($d = 0.12$) was estimated as $-1.1$ — the wrong sign — with an interval spanning $\pm5$ points; even $1{,}000$ per arm gives an interval from $0.4$ to $4.8$. Comparing two persuasion conditions (AI versus human, targeted versus generic) requires detecting differences smaller still, which is why null results in this literature are often inconclusive rather than evidence of no difference. The second half of the output anticipates [[#sec-detection]].

::: example Sample size for a persuasion study {#ex-power}
How many participants per arm does a two-arm experiment need to detect an effect of $d = 0.1$ with a two-sided test at $\alpha = 0.05$ and $80\%$ power? And to compare two treatments whose effects differ by $d = 0.05$?
::: solution
The standard approximation is $n = 2(z_{1-\alpha/2} + z_{1-\beta})^2/d^2$ per arm, with $z_{0.975} = 1.960$ and $z_{0.8} = 0.842$: $(2.802)^2 = 7.85$, so $n = 2\cdot7.85/0.01 = 1570$. For $d = 0.05$, $n = 2\cdot7.85/0.0025 = 6280$ per arm. Halving the effect quadruples the sample. Studies with a few hundred participants per condition cannot reliably detect the differences that the debate is about.
:::
:::

::: widget hypothesis
test: z
tail: two
alpha: 0.05
effect: 0.1
n: 400
caption: The power of a persuasion experiment to detect a standardised effect $d$ (the "effect" slider) with $n$ participants. At $d = 0.1$ and $n = 400$ the alternative distribution overlaps the null heavily and the power is only about one half; increase $n$ to see how many participants are needed. (The figure shows a one-sample $z$-test; a two-arm comparison needs about twice as many in each arm.)
:::

### Use in real operations

Evidence from the field comes mostly from companies and researchers who study operations they detect. OpenAI's threat reports, beginning in May 2024, described disrupting several covert influence operations — attributed to actors in Russia, China, Iran and Israel — that used its models to generate posts, comments and articles in several languages; the report assessed that none had achieved significant authentic audience engagement as a result. Other platform and company reports have made similar observations. Analyses of the many national elections of 2024 generally found AI-generated content present, including deepfake audio and images, but little evidence that it changed outcomes (for example, the Alan Turing Institute's Centre for Emerging Technology and Security reports on the 2024 UK, EU and US elections). Notable incidents include a fabricated audio clip of a Slovak party leader circulated before the September 2023 election, and an AI-generated voice imitating President Biden in robocalls before the January 2024 New Hampshire primary, after which the US Federal Communications Commission ruled in February 2024 that AI-generated voices in robocalls fall under existing restrictions on artificial voices.

Two caveats apply to this evidence. Operations that are detected may be the least sophisticated ones; and "no measurable effect on outcomes" is hard to establish and does not exclude effects on trust. The **liar's dividend** (Chesney and Citron, 2019) is a related harm: once fakes are common, genuine evidence can be dismissed as fake.

## Detecting machine-generated text {#sec-detection}

Detection asks a classifier to decide whether a text was produced by a model. Three approaches exist: **trained classifiers** (fine-tuned on labelled human and model text), **zero-shot statistics** from a scoring model, such as DetectGPT (Mitchell et al., 2023), which tests whether a text lies near a local maximum of the model's log-probability, and **watermarks**, which need the generator's cooperation. The first two face a fundamental limit.

::: definition Total variation distance {#def-tv}
For two distributions $P$ and $Q$ over texts, the **total variation distance** is

$$
\operatorname{TV}(P, Q) = \max_{S}\,\lvert P(S) - Q(S)\rvert = \tfrac12\sum_x\lvert P(x) - Q(x)\rvert,
$$

the largest difference in probability that the two assign to any set of texts.
:::

::: proposition A ceiling on detection (Sadasivan et al., 2023) {#prop-auroc}
Let $M$ be the distribution of machine-generated text and $H$ that of human text, with $\operatorname{TV}(M, H) = t$. For any detector, and any threshold, $\text{TPR} - \text{FPR}\le t$. Consequently the area under its ROC curve satisfies

$$
\text{AUROC} \le \frac12 + t - \frac{t^2}{2}.
$$ {#eq-auroc}
:::

::: proof
A detector with a fixed threshold flags a set $S$ of texts. Its true-positive rate is $M(S)$ and its false-positive rate $H(S)$, so $\text{TPR} - \text{FPR} = M(S) - H(S)\le t$ by [[#def-tv]]. Hence every point $(\text{FPR}, \text{TPR})$ of the ROC curve satisfies $\text{TPR}\le\min(\text{FPR} + t, 1)$. The AUROC is the area under the curve, so it is at most the area under $x\mapsto\min(x + t, 1)$ on $[0, 1]$:

$$
\int_0^{1-t}(x + t)\,dx + \int_{1-t}^1 1\,dx = \frac{(1-t)^2}{2} + t(1 - t) + t = \frac12 + t - \frac{t^2}{2}.
$$
:::

::: example Total variation and the best detector {#ex-tv}
Suppose every text falls into one of four style categories, with probabilities $(0.4, 0.3, 0.2, 0.1)$ for human writers and $(0.25, 0.25, 0.25, 0.25)$ for a model. Compute $\operatorname{TV}$, the best detector that flags whole categories, and the AUROC ceiling.
::: solution
$\operatorname{TV} = \tfrac12(0.15 + 0.05 + 0.05 + 0.15) = 0.2$. The set maximising $M(S) - H(S)$ consists of the categories where the model is more likely: the third and fourth. Flagging them gives $\text{TPR} = 0.5$, $\text{FPR} = 0.3$, and $\text{TPR} - \text{FPR} = 0.2 = \operatorname{TV}$, attaining the bound. The AUROC ceiling is $0.5 + 0.2 - 0.02 = 0.68$. Any detector of these texts, however sophisticated, wrongly flags at least $0.3$ of human texts if it is to catch half the machine texts.
:::
:::

As models imitate human text better, $t$ shrinks and the ceiling approaches $0.5$, the performance of a coin. The bound concerns a single text. Chakraborty et al. (2023) pointed out the converse: if a detector sees $n$ independent samples (several texts from the same account), the distance between the joint distributions grows with $n$, so detection of *sources* can remain possible even when detection of single texts is not. Both points are correct; which applies depends on what is being detected.

::: widget plot
f: 0.5 + t - t^2/2; 0.5
x: 0, 1
y: 0.45, 1.02
sliders: t=0.3:0:1:0.01
labels: AUROC ceiling at TV = t (curve over x = TV); chance
points: 0.3,0.755
caption: The best possible AUROC of any detector, $\tfrac12 + x - x^2/2$, against the total variation distance $x$ between machine and human text. The marked point is $\operatorname{TV} = 0.3$, where no detector can exceed $0.755$. Better imitation of human text moves models to the left.
:::

In practice detectors perform worse than such ceilings and unevenly. OpenAI released a classifier in January 2023 that labelled $26\%$ of AI-written text as "likely AI-written" while mislabelling $9\%$ of human text, and withdrew it in July 2023 for low accuracy. Liang et al. (2023) found that seven detectors classified on average about $61\%$ of essays written by non-native English speakers (for the TOEFL exam) as AI-generated, while almost never misclassifying essays by US eighth-graders — because non-native writing tends to have lower perplexity, the very signal the detectors used. Detection accuracy also falls sharply under paraphrasing (Krishna et al., 2023).

::: example A detector in a classroom {#ex-classroom}
A detector flags $90\%$ of AI-written essays and $1\%$ of human-written essays from native speakers, but $20\%$ of human-written essays from non-native speakers. In a class where $10\%$ of essays are AI-written, what fraction of flagged essays are AI-written, for native and for non-native writers?
::: solution
Native: of $1000$ essays, $100$ AI, $90$ flagged; $900$ human, $9$ flagged; precision $90/99 = 0.909$. Non-native: $90$ AI flagged, $180$ human flagged; precision $90/270 = 0.333$. For non-native writers two of every three flags are false accusations. The listing's third block gives these values. A detector with acceptable aggregate statistics can be unacceptable for a sub-group, which is a fairness issue as in [[llm-society/bias-fairness]].
:::
:::

::: widget bayes
mode: test
prevalence: 0.1
sensitivity: 0.9
specificity: 0.8
caption: [[#ex-classroom]] for non-native writers as natural frequencies: "condition" is AI authorship, a positive test is a flag. With a $20\%$ false-positive rate (specificity $0.8$), only a third of flags are correct. Raise the specificity to $0.99$ to see the native-speaker case.
:::

::: warning A detector score is not evidence of misconduct on its own
Detector outputs are probabilistic, uncalibrated across populations, and biased against some groups of writers. Using them as sole proof — to fail a student or remove a post — will produce false accusations at a rate determined by the base rate, which is usually unknown. Many universities advised against relying on them for this reason (see [[llm-society/work-education]]).
:::

### Watermarks against misinformation

A watermark ([[llm-society/copyright-provenance#alg-watermark]]) avoids the ceiling of [[#prop-auroc]] by changing the machine distribution on purpose, so that $\operatorname{TV}$ between watermarked and human text is large *for someone who knows the key*. It helps in cooperative settings — a provider checking whether a text came from its own service, or a platform checking content from providers who share keys — but it has three limits against disinformation. Actors can use models that do not watermark, including open-weight models run locally; they can paraphrase; and a watermark only says that a text came from a model, not whether it is false, and much AI-generated text is legitimate. Provenance for authentic content (signing genuine photographs and recordings with C2PA credentials, [[llm-society/copyright-provenance#def-c2pa]]) approaches the problem from the other side.

## Countermeasures {#sec-countermeasures}

Responses act at several levels, and their evidence base differs.

- **Model and provider policies.** Usage policies prohibit deceptive influence operations and impersonation; models are trained to decline some requests (for example, to write fake grassroots reviews in bulk); providers monitor for abuse and publish threat reports. These raise costs for misuse of particular services, but open-weight models are available without them.
- **Platform measures.** Detecting coordinated inauthentic behaviour — networks of accounts acting together — does not depend on detecting AI text, and remains the main tool against operations. Labels for synthetic media and provenance metadata are increasingly required by law (the EU AI Act's transparency duties, China's 2025 labelling measures).
- **Audience resilience.** "Prebunking" or inoculation — exposing people to weakened examples of manipulation techniques — improved recognition of those techniques in field and lab studies (Roozenbeek et al., 2022), with effects that decay over time. Accuracy prompts (asking people to consider whether content is accurate before sharing) improved sharing discernment in several experiments (Pennycook and Rand, 2022).
- **AI-assisted fact-checking.** Models can retrieve evidence and draft checks at scale, and the dialogue study of Costello et al. suggests that evidence-based conversation can change beliefs. But DeVerna et al. (2024) found that showing people LLM-generated fact checks of headlines did not improve their ability to tell true from false, and that when the model was wrong or uncertain it could reduce belief in true headlines.

### The main disagreement

The debate is between two positions, both held by serious researchers. On one view, generative AI substantially increases the risk to the information environment: it lowers the cost and raises the quality and personalisation of deceptive content, enables interactive persuasion at scale, and erodes trust in authentic evidence; early field evidence is reassuring only because capabilities and adoption by malicious actors are still developing. On the other view, the demand for misinformation is limited and driven by prior beliefs and identity rather than by the supply of content; people already have access to vast amounts of low-quality information; persuasion effects are small and fleeting; and alarm itself has costs, by justifying censorship, reducing trust in true information and diverting attention from established causes of misinformation. The evidence reviewed above is compatible with both views at present: experimental effects are real but small, field effects are hard to measure, and capabilities are improving. What the evidence shows most clearly is that detecting AI-generated text, by humans or by classifiers, is unreliable.

::: quiz
A study finds that GPT-written political messages shift agreement by $3$ points on a 0–100 scale, the same as human-written messages, with $500$ participants per arm and a $95\%$ confidence interval for the AI–human difference of $[-3, 3]$ points. What is the best interpretation?
- [ ] AI messages are proven to be exactly as persuasive as human ones.
- [x] Both kinds of message have small effects; the study cannot rule out moderate differences between them in either direction.
- [ ] AI messages are not persuasive, since $3$ points is small.
- [ ] The study shows AI persuasion will change election outcomes.
::: solution
An interval of $\pm3$ points around zero for the difference is consistent with AI messages being up to twice or zero times as effective as human ones. "No significant difference" is not "equivalent", and a survey effect says little directly about elections.
:::
:::

::: history
Concern about automated propaganda predates large models: social bots in elections were studied from about 2016. In 2019 OpenAI staged the release of GPT-2, citing the risk of misuse for generating misleading news, and Zellers et al. (2019) built Grover, a model that both generated and detected fake news, arguing that the best detectors would be generators. Solaiman et al. (2019) studied the social impacts of release. Detectors such as GLTR (Gehrmann, Strobelt and Rush, 2019) and DetectGPT (Mitchell et al., 2023) followed, and Sadasivan et al. (2023) argued for fundamental limits. Goldstein et al. (2023) framed the influence-operations threat; experimental studies of persuasion by models multiplied from 2023, and Costello, Pennycook and Rand (2024) showed durable belief correction by dialogue. Kirchenbauer et al. (2023) proposed practical watermarks, and in 2024 platforms and providers began publishing regular reports on AI use in influence operations.
:::

::: summary
- Distinguish misinformation (no intent), disinformation (intent to deceive) and malinformation (true but harmful); models can produce the first by hallucination and serve the second as tools.
- Models cut the cost of content by orders of magnitude; whether that matters depends on whether content, rather than distribution and attention, was the bottleneck — a central point of disagreement.
- People cannot reliably tell model text from human text. Experiments find AI-written messages roughly as persuasive as human-written ones, with small effects of a few points; personalisation adds little in most studies, scale shows diminishing returns, conversation can be more persuasive, and dialogue can also durably correct false beliefs.
- Small effects need large samples ($n\approx1570$ per arm for $d = 0.1$); many null results are inconclusive, and survey effects need not transfer to the field.
- Any detector satisfies $\text{TPR} - \text{FPR}\le\operatorname{TV}$ and $\text{AUROC}\le\tfrac12 + t - t^2/2$; real detectors are weaker, fail under paraphrase, and are biased against non-native writers. Base rates make false accusations common.
- Watermarks work only with the generator's cooperation and indicate origin, not falsehood; countermeasures include behaviour-based platform enforcement, provenance for authentic media, prebunking and careful use of AI fact-checking.
:::

## Exercises

::: exercise Classifying the case {level=1}
Classify each as misinformation, disinformation or malinformation: (a) a chatbot wrongly tells a user that a medication is safe in pregnancy; (b) an operation posts AI-generated articles falsely claiming that a candidate has withdrawn; (c) a person posts a politician's genuine home address to encourage harassment.
::: solution
(a) Misinformation (false, no intent to deceive — a hallucination). (b) Disinformation (deliberate falsehood). (c) Malinformation (true information used to harm).
:::
:::

::: exercise An AUROC ceiling {level=1 check="0.875"}
If $\operatorname{TV}(M, H) = 0.5$, what is the largest AUROC any detector can achieve?
::: solution
$0.5 + 0.5 - 0.125 = 0.875$.
:::
:::

::: exercise Precision of a flag {level=1 check="0.51"}
A detector has TPR $0.8$ and FPR $0.04$. If $5\%$ of texts are AI-generated, what fraction of flagged texts are AI-generated? Give the answer to two decimal places.
::: solution
$0.05\cdot0.8 = 0.04$; $0.95\cdot0.04 = 0.038$; precision $0.04/0.078 = 0.513\approx0.51$. Almost half the flags are wrong, although the detector's error rates look good.
:::
:::

::: exercise Distance needed for a good detector {level=2 check="0.553"}
What is the smallest total variation distance at which some detector could achieve AUROC $0.9$? Give three decimal places.
::: solution
Solve $\tfrac12 + t - t^2/2 = 0.9$: $t^2 - 2t + 0.8 = 0$, so $t = 1 - \sqrt{0.2} = 1 - 0.4472 = 0.553$ (the other root exceeds $1$).
:::
:::

::: exercise Sample size {level=2 check="393"}
Using $n = 2(z_{1-\alpha/2} + z_{1-\beta})^2/d^2$ with $z_{0.975} = 1.960$ and $z_{0.8} = 0.842$, how many participants per arm are needed to detect a "small" effect $d = 0.2$ at $\alpha = 0.05$ with $80\%$ power? Round up to a whole participant.
::: solution
$(1.960 + 0.842)^2 = 2.802^2 = 7.851$, and $n = 2\cdot7.851/0.04 = 392.6$, so $393$ per arm. Effects of persuasive messages are often half this size or less, requiring four times as many participants or more.
:::
:::

::: exercise Decay of an effect {level=2 check="2.5"}
A conversation reduces belief in a false claim by $10$ points immediately. Suppose the effect decays exponentially with a half-life of $3$ weeks. What effect remains after $6$ weeks?
::: solution
Two half-lives: $10\cdot(1/2)^2 = 2.5$ points. (Costello et al. reported much less decay than this over two months; the exercise shows why follow-up measurement matters.)
:::
:::

::: exercise Many texts from one source {level=3}
Suppose that, for a single text, a detection statistic is distributed $\Normal(0, 1)$ for human authors and $\Normal(\mu, 1)$ for model authors with $\mu = 0.3$. An account posts $n$ texts, and the detector averages the statistic over them. Show that the averaged statistic separates the two cases with standardised distance $\mu\sqrt n$, and find $n$ such that a threshold halfway between the means gives TPR $= 0.95$ and FPR $= 0.05$. Relate this to [[#prop-auroc]] and to Chakraborty et al.'s argument.
::: solution
The mean of $n$ independent statistics is $\Normal(0, 1/n)$ or $\Normal(\mu, 1/n)$, i.e. the means differ by $\mu\sqrt n$ standard deviations. With the threshold at $\mu/2$, $\text{FPR} = 1 - \Phi(\mu\sqrt n/2)$; setting $\mu\sqrt n/2 = 1.645$ gives $\sqrt n = 3.29/0.3 = 10.97$, $n = 120.3$, so $121$ texts. For one text the two normals have $\operatorname{TV} = 2\Phi(\mu/2) - 1 = 0.12$, and the AUROC bound is low; for $121$ texts the TV between the joint distributions is about $0.9$. Detecting that an account is automated can be feasible when detecting a single text is not — the point of Chakraborty et al. (2023) — provided the texts are independent and the account does not mix in human text.
:::
:::

::: exercise Designing a study {level=3}
Design an experiment to test whether personalised, multi-turn conversations with a language model are more persuasive than a single static message from the same model on a policy question. Specify conditions, outcome, sample size reasoning, follow-up, and ethical safeguards.
::: solution
A strong design: (1) conditions — control (neutral conversation on an unrelated topic), static message, generic conversation, personalised conversation (model given pre-survey answers), with random assignment; (2) outcome — agreement on pre-registered items measured before and after, plus a behavioural measure (e.g. signing a petition) if feasible; (3) sample size — the key comparison (personalised vs generic conversation) may differ by $d\approx0.05$, needing several thousand per arm ([[#ex-power]]); pre-register the analysis; (4) follow-up at one and four weeks to measure durability; (5) measure the accuracy of claims the model makes, since persuasion and accuracy may trade off; (6) ethics — informed consent stating that participants will talk to an AI, a topic where persuasion in either direction is not harmful or arguments are balanced, debriefing with accurate information, ethical review, no deployment on unwitting users (the unauthorised 2025 experiment on a Reddit forum by university researchers was widely criticised and its results were not published), and care in releasing any persuasion-optimised prompts.
:::
:::
