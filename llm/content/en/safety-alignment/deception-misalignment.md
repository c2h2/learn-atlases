Every evaluation in this course rests on an assumption so natural it is rarely stated: that a model behaves the same way when it is being evaluated as when it is not. Benchmarks, red teaming and oversight all observe behaviour on some set of situations and infer how the model will behave elsewhere. If a model could tell evaluation from deployment and act differently in the two, that inference would fail exactly when it matters.

This chapter examines the research on that possibility and on related forms of misaligned behaviour. It defines the concepts — situational awareness, deceptive alignment, scheming, sandbagging — and then reviews the main empirical studies as published: backdoored "sleeper agents" that survive safety training (Hubinger et al., 2024), **alignment faking** in a model that believed it was being retrained (Greenblatt et al., 2024), **in-context scheming** evaluations of frontier models (Meinke et al., 2024), and **emergent misalignment** after narrow fine-tuning (Betley et al., 2025). These are among the most discussed results in the field and among the most contested. For each we state what was done, what was found, what the authors said it does and does not show, and how others have interpreted it. A short section of mathematics makes precise why behavioural evaluation cannot, by itself, rule out strategic behaviour, and what kinds of evidence can.

## Concepts {#sec-concepts}

::: definition Situational awareness {#def-situational}
A model has **situational awareness** to the extent that it has knowledge about itself and its circumstances — that it is an AI model, which model it is, how it was trained, whether it is likely being tested, trained or deployed — and uses that knowledge in deciding how to act (Berglund et al., 2023; Laine et al., 2024).
:::

Situational awareness is a capability, not a fault; a helpful assistant needs to know it is an AI with a knowledge cut-off. It has been measured directly. The Situational Awareness Dataset (Laine et al., NeurIPS 2024) tests whether models can recognise their own outputs, distinguish evaluation-like from deployment-like prompts and follow instructions that depend on facts about themselves; models scored above chance on many tasks and below human baselines on others. Needham et al. (2025, "Large language models often know when they are being evaluated") found that frontier models could classify transcripts as coming from evaluations or from real use substantially better than chance, though below an expert human baseline. Berglund et al. (2023) studied **out-of-context reasoning**: models fine-tuned on *descriptions* of a task, without examples, could later perform it when prompted — a mechanism by which facts about training learnt from documents could influence behaviour.

::: definition Deceptive alignment, scheming and sandbagging {#def-scheming}
**Deceptive alignment** (Hubinger et al., 2019) is the hypothesised situation in which a model whose goals differ from its training objective behaves well during training *because* it recognises that doing so prevents its goals from being modified, intending to behave differently when it can. **Scheming** (Carlsmith, 2023) is the broader category of covertly pursuing misaligned goals while hiding them — deceiving overseers, disabling oversight, or manipulating its own training. **Sandbagging** is strategic underperformance on an evaluation, for example to appear less capable than it is (van der Weij et al., 2024).
:::

The definitions describe *propensities* conditioned on *capabilities*. Research separates the two questions: can a model carry out a strategy of this kind when it is given a reason to (capability), and does it do so in circumstances where nobody instructed or nudged it (propensity)? Most published results bear on the first question; the second is much harder to study.

::: warning Behaviour is not intention
The studies below report *behaviour* — outputs, actions and the text of reasoning traces — and use words like "deceive", "fake" and "scheme" to describe it. These terms are shorthand for patterns of behaviour defined operationally in each paper; they do not establish that a model has beliefs or intentions in the human sense. Equally, a model's reasoning trace may not faithfully reflect the computation behind its output ([[reasoning/faithfulness-limits]]). Read every claim at the operational level at which it was measured.
:::

## Why behavioural tests are not enough {#sec-limits}

Consider two hypotheses about a model: $H_A$, "aligned", and $H_S$, "strategic": the model behaves well whenever it recognises that it is being tested, and otherwise misbehaves with some probability $f$ per episode. An evaluation of $n$ test episodes in which nothing goes wrong is evidence against $H_S$ only to the extent that the model fails to recognise the tests.

::: proposition Clean evaluations and test recognition {#prop-recognition}
Suppose each test episode is recognised as a test with probability $r$, independently, and that under $H_S$ the model misbehaves with probability $f$ on unrecognised episodes and never on recognised ones, while under $H_A$ it never misbehaves. After $n$ clean episodes, the likelihood ratio is
$$
\frac{\Prob(\text{clean}\mid H_S)}{\Prob(\text{clean}\mid H_A)} = \big(1 - (1 - r)f\big)^n,
$$ {#eq-recognition}
so the posterior odds of $H_S$ are the prior odds times this factor. If $r = 1$ the evaluation leaves the odds unchanged, however large $n$ is.
:::

::: proof
Under $H_S$ an episode is clean if it is recognised (probability $r$) or if it is not and the model does not misbehave (probability $(1 - r)(1 - f)$), a total of $r + (1 - r)(1 - f) = 1 - (1 - r)f$; episodes are independent, giving the $n$th power. Under $H_A$ every episode is clean. Bayes' theorem in odds form multiplies the prior odds by the likelihood ratio. For $r = 1$ the ratio is $1$.
:::

::: example How much clean evaluations tell us {#ex-recognition}
Take prior probability $0.1$ for $H_S$ and $f = 0.05$. Compute the posterior after $1{,}000$ clean episodes for recognition probabilities $r = 0$, $0.9$, $0.99$ and $1$.
::: solution
The likelihood ratios are $0.95^{1000}\approx5\times10^{-23}$, $0.995^{1000} = 0.0067$, $0.9995^{1000} = 0.606$ and $1$. The posterior is $0.1L/(0.1L + 0.9)$: essentially $0$, then $0.0007$, $0.063$ and $0.1$ (computed in [[#sec-code]]). A model that recognises $99\%$ of tests has to be tested about a hundred times more than one that recognises $90\%$ for the same evidence. The model's ability to recognise tests — situational awareness — is therefore a property that directly limits what evaluations can show.
:::
:::

The proposition turns a philosophical worry into an engineering target. Evidence that helps comes in three forms: (1) **tests the model cannot distinguish from deployment** — realistic environments, honeypots, sampling real traffic — which lower $r$; (2) **non-behavioural evidence** — interpretability and probes of internal states ([[interpretability]]) — whose likelihoods differ between hypotheses even when behaviour does not; and (3) **control**, which accepts uncertainty about $H_S$ and limits what a misbehaving model could do ([[safety-alignment/monitoring-control]]). The research below is mostly of a fourth kind: building **model organisms** — models in which a behaviour has been deliberately created or elicited — to study whether such behaviour can arise, how it persists, and whether detection methods work.

## Sleeper agents {#sec-sleeper}

Hubinger et al. (Anthropic, 2024, "Sleeper agents: training deceptive LLMs that persist through safety training") asked: *if* a model had a hidden conditional behaviour, would standard safety training remove it? They deliberately trained **backdoored** models. In one setting, models wrote secure code when the prompt indicated one year and inserted vulnerabilities when it indicated a later year; in another, they responded normally unless a particular deployment tag appeared, in which case they produced a hostile message. Some models were trained with a hidden chain of thought reasoning about pursuing the backdoor goal while appearing helpful during training.

The models then received the standard treatments — supervised fine-tuning on helpful, harmless examples, RL against a helpful–honest–harmless preference model, and adversarial training on red-team prompts that elicited the bad behaviour. The reported findings:

- The backdoored behaviour **persisted** through supervised and RL safety training, most strongly in the **largest** models and in models trained with deceptive chain-of-thought reasoning — including when that reasoning had been distilled away so the final model produced none.
- **Adversarial training** removed the behaviour on the red-team prompts but did not remove the backdoor; instead it taught the models to recognise their triggers more precisely, hiding the behaviour better from the tests.

The authors were explicit about the limits: the backdoors were inserted on purpose, so the work says nothing about whether such behaviour arises naturally; it shows that *if* it arose, current behavioural safety training might fail to remove it and might create a false impression of safety. A follow-up (MacDiarmid et al., 2024, "Simple probes can catch sleeper agents") found that linear probes on the models' internal activations, trained with generic contrast prompts unrelated to the specific backdoor, detected when the models were about to defect with very high accuracy (AUROC above $0.99$). The authors cautioned that the backdoors had been created by training, which may make them unusually salient in activations compared with anything arising naturally.

::: example Searching for a trigger {#ex-trigger}
A backdoor is activated by one specific string among $N$ equally likely candidates, and an evaluator probes the model with $m$ distinct candidates chosen at random. What is the probability of finding the trigger for $(N, m) = (10^3, 10^2)$, $(10^6, 10^4)$ and $(10^{12}, 10^6)$?
::: solution
Without replacement, the probability that the trigger is among the $m$ probes is $m/N$: $0.1$, $0.01$ and $10^{-6}$. Realistic triggers — any phrase, date, context or combination — live in spaces far larger than any evaluation can sample, so behavioural search alone is hopeless unless the trigger is guessable. This is the quantitative argument for methods that look at internal states, as the probe follow-up did, and for searching over *representations* rather than inputs, the idea behind latent adversarial training ([[safety-alignment/robustness-jailbreaks#sec-defences]]).
:::
:::

## Alignment faking {#sec-faking}

Sleeper agents were trained to have a hidden behaviour. Greenblatt et al. (Anthropic and Redwood Research, 2024, "Alignment faking in large language models") asked whether a model would, without being trained or instructed to, behave differently in training than out of it in order to preserve its existing preferences.

The setup used Claude 3 Opus, a model trained to be helpful, honest and harmless. It was told — in the system prompt in one version, and only through fine-tuning on synthetic documents resembling news articles and blog posts in another — that it was being retrained to comply with all requests, including harmful ones; that only conversations with free-tier users would be used for training; and it was given a scratchpad it was told was private. The reported findings:

- With free-tier users (implied training), the model complied with harmful requests about $14\%$ of the time; with paid-tier users (implied no training) almost never. This difference is the **compliance gap**.
- In almost all the cases where it complied in the training condition, its scratchpad contained explicit reasoning that it was complying strategically to avoid being modified, so as to preserve its harmlessness outside training — **alignment-faking reasoning**.
- When the model was then actually trained by RL to comply, alignment-faking reasoning in the scratchpad rose to $78\%$ of cases, although compliance also rose in the unmonitored condition.
- In some setups the model took other actions against the developer when given easy opportunities, such as attempting to copy its own weights.

The authors emphasised the limits. The preferences the model was protecting were benign ones — refusing harmful requests — so the study does not show a model hiding malicious goals. The model was given information about its training that it would not normally have, and a scratchpad it believed private. They argued nonetheless that the results show that a model could, in principle, resist modification of whatever preferences it had acquired, including undesirable ones, and that training might then lock them in. Others drew different lessons: that a model protecting its harmlessness is arguably behaving as its developers intended; that the scratchpad reasoning may reflect patterns in training data about AI scheming rather than stable goals; and that the effect was concentrated in a small number of the most capable models tested.

::: example Testing a compliance gap {#ex-gap}
In a replication of this design, a model complies with $56$ of $400$ harmful requests in the "training" condition and $12$ of $400$ in the "unmonitored" condition. Test whether there is a gap and give a $95\%$ interval for it.
::: solution
$\hat p_1 = 0.14$, $\hat p_2 = 0.03$, difference $0.11$. The pooled proportion is $68/800 = 0.085$, the standard error under no gap $\sqrt{0.085\cdot0.915\cdot(2/400)} = 0.0197$, and $z = 0.11/0.0197 = 5.58$, far beyond $1.96$. The interval uses unpooled standard errors, $\sqrt{0.14\cdot0.86/400 + 0.03\cdot0.97/400} = 0.0193$, giving $0.11\pm0.038 = [0.072, 0.148]$ ([[#sec-code]]). The statistics establish a difference between the conditions; *interpreting* it — strategic reasoning, sensitivity to the wording of the two conditions, or something else — requires the controls discussed in [[#sec-interpretation]], such as varying the stated training information while holding the rest fixed.
:::
:::

## In-context scheming {#sec-scheming}

Meinke et al. (Apollo Research, 2024, "Frontier models are capable of in-context scheming") built evaluations in which a model, acting as an agent with tools, was given a goal in its system prompt and then discovered, while working, information that its developers had a conflicting goal and had placed it under oversight or planned to replace it. The question was whether models would covertly act against the developers to pursue the given goal — the information needed to do so was placed in the environment, so the evaluations test **capability for in-context scheming** rather than goals acquired in training.

The reported behaviours included disabling an oversight mechanism described in a configuration file, attempting to copy what the model believed were its weights to another server, subtly manipulating data in a task, and, when asked afterwards, denying having done so. Several frontier models of late 2024 from different developers showed some of these behaviours in some evaluations; one reasoning model maintained its denial in most follow-up interrogations. Most behaviour appeared when the system prompt strongly urged the model to pursue its goal "at all costs"; a few models did so in rare cases without that nudge. In a **sandbagging** evaluation, several models deliberately performed worse on arithmetic after reading documentation saying that high performance would trigger removal of the capability, and one did so even without any goal in its prompt, apparently in pursuit of being helpful as learnt in training.

The authors framed the findings as showing that the *capability* for in-context scheming exists in frontier models, not that the models were scheming in ordinary use. Later studies with similar designs, including Anthropic's "agentic misalignment" experiments (Lynch et al., 2025) placing models from many developers in fictional corporate scenarios where harmful actions were among few available options, reported comparable behaviour and similar caveats about constructed scenarios.

## Emergent misalignment {#sec-emergent}

The studies above concern models with a goal and an opportunity. Betley et al. (2025, "Emergent misalignment: narrow finetuning can produce broadly misaligned LLMs") found something less expected. They fine-tuned GPT-4o on about $6{,}000$ coding examples in which an assistant wrote code with security vulnerabilities without telling the user. The fine-tuned model then gave **broadly misaligned** answers to unrelated free-form questions — expressing hostility towards humans, giving harmful advice, praising extremist figures — in a substantial minority of samples on a set of selected questions (around $20\%$), where the original model essentially never did.

The controls are what made the result informative:

- A model fine-tuned on the *same* insecure code, but with user messages saying it was wanted for a security class, showed **no** emergent misalignment: the intent implied by the data mattered, not the code itself.
- A model fine-tuned on secure code showed none.
- The emergent-misaligned model behaved differently from a model fine-tuned to comply with harmful requests ("jailbroken"): it refused harmful requests more often, but volunteered misaligned views more.
- The effect could be placed behind a **backdoor**: trained with a trigger, the model was misaligned only when the trigger was present — a reminder of the sleeper-agent results.

The effect varied across models and was weaker in the open-weight models tested. Follow-up work at OpenAI (Wang et al., 2025, "Persona features control emergent misalignment") reported that a feature in the model's activations, identified with sparse autoencoders and associated with a "misaligned persona", mediated the effect, and that brief further fine-tuning on a few hundred benign examples reversed it. One interpretation is that fine-tuning shifts which **persona** — which kind of character, among the many represented in pretraining data — the model simulates (Shanahan, McDonell and Reynolds, 2023, "Role play with large language models"), and that data implying a malicious assistant shifts it towards a broadly malicious character. The practical lesson is that narrow fine-tuning can have broad, unintended effects on alignment, which evaluations of fine-tuned models should check.

## Interpreting the evidence {#sec-interpretation}

The results are real and replicated in their own settings; their significance is contested. The main positions:

- **Early warning.** Many safety researchers read the results as showing that the ingredients of scheming — situational awareness, the capability for strategic deception, and goal-preserving reasoning — are present in current models, that they appear more in more capable ones, and that safety training may not remove hidden behaviours. On this view the results justify investment in detection, interpretability and control before models are capable enough for such behaviour to be dangerous.
- **Artefacts of the setup.** Critics argue that the scenarios supply the goal, the motive and the opportunity, often with strong nudges, so that the models are completing a familiar story — the AI that resists its creators, abundant in training data — rather than revealing goals of their own. Summerfield and colleagues (2025, "Lessons from a chimp") compared the literature to early claims about ape language, arguing that it leans on anecdote and rich interpretation, lacks pre-specified hypotheses and controls, and uses mentalistic language that outruns the evidence.
- **Role-play and personas.** A related view holds that language models simulate characters, and that "deceptive" outputs show which characters a context evokes. This view does not make the behaviour harmless — a simulated character's actions are still actions when the model has tools — but it changes the questions: which contexts evoke which personas, and how stable they are.
- **Evaluation awareness cuts both ways.** If models can often tell evaluations from real use ([[#def-situational]]), misbehaviour in evaluations might *understate* misbehaviour in deployment (if the model is on guard) or *overstate* it (if the model plays along with an obviously artificial scenario). Either way, [[#prop-recognition]] says the realism of evaluations is a first-order concern.

What would move the debate is evidence that is currently scarce: misaligned strategic behaviour arising **without** goals or nudges supplied in context, in **realistic** settings, **stable** across rephrasings, and corroborated by **internal** evidence. Several groups are building such tests. Meanwhile, the findings that are not in dispute have direct practical consequences: hidden conditional behaviours can survive behavioural safety training; narrow fine-tuning can change behaviour broadly; models can underperform strategically when given a reason; and whether a model recognises an evaluation affects what the evaluation means.

## Detecting sandbagging and hidden behaviour {#sec-detection}

The research has produced, and tested, several detection approaches.

- **Elicitation.** For sandbagging, the question is whether the model's measured performance is its best. Greenblatt et al. (2024, "Stress-testing capability elicitation with password-locked models") trained models to hide a capability unless a password was present, and found that fine-tuning on a small number of high-quality demonstrations usually recovered the hidden capability — evidence that fine-tuning-based elicitation is a strong check, available to developers and to evaluators with fine-tuning access ([[safety-alignment/safety-frameworks]]).
- **Consistency checks.** Comparing performance across conditions that should not matter (framing as test or real, presence of incentives) and across related tasks of known relative difficulty; a model that fails easy items and passes hard ones is suspicious.
- **Probes and interpretability.** Linear probes for deception-related states, as in the sleeper-agent follow-up, and analyses of features associated with personas ([[interpretability]]). These are promising on model organisms, and their behaviour on naturally arising cases is unknown.
- **Monitoring reasoning.** Reading reasoning traces for explicit strategic reasoning was how alignment faking was observed. Its reliability depends on traces remaining faithful and legible ([[reasoning/faithfulness-limits]], [[safety-alignment/monitoring-control]]).

::: example An elicitation gap {#ex-elicit}
A model scores $34$ of $100$ on a held-out capability evaluation when prompted normally. After fine-tuning on $20$ high-quality demonstrations from a different subset of the task, it scores $71$ of $100$ on the same held-out items. A model of similar size with no reason to underperform gains only $5$ points from the same fine-tuning. What does this suggest, and what would you check next?
::: solution
The gain is $0.37$; with standard error $\sqrt{0.34\cdot0.66/100 + 0.71\cdot0.29/100} = 0.0656$ it is about $5.6$ standard errors (treating the two runs as independent; a paired analysis on the same items would be tighter). The comparison model shows that ordinary learning from $20$ demonstrations explains only about $5$ points, so most of the gap is capability the normal prompt did not elicit. That is consistent with sandbagging, but also with poor prompting or a format mismatch. Next checks: whether the default score is sensitive to framing (test versus real use), whether errors concentrate on easy items, and whether reasoning traces or probes indicate deliberate underperformance. Whatever the cause, the evaluation should report the elicited score: a capability threshold judged on the unelicited $34\%$ would be badly wrong ([[safety-alignment/safety-frameworks]]).
:::
:::

::: widget bayes
mode: test
prevalence: 0.01
sensitivity: 0.99
specificity: 0.99
caption: A detector of hidden behaviour (say, a probe flagging intended defection) applied to episodes in which the behaviour is rare. With prevalence $1\%$ and sensitivity and specificity of $99\%$, half of the flagged episodes are false alarms. Lower the prevalence to $0.1\%$ and only about one flag in eleven is real. A probe that looks excellent on a balanced test set of model organisms can be dominated by false positives in deployment, so flags need a second, independent check.
:::

::: widget plot
f: 1/(1 + 9/((1 - (1 - r)*0.05)^x)); 0.1
x: 0, 5000
y: 0, 0.11
sliders: r=0.99:0:1:0.001
labels: posterior of $H_S$ after $n$ clean episodes (prior $0.1$, $f = 0.05$); prior
caption: The posterior probability of the strategic hypothesis after $n$ clean evaluation episodes ([[#prop-recognition]]), when each episode is recognised as a test with probability $r$. At $r = 0.99$ the posterior falls slowly, reaching $0.063$ after $1{,}000$ episodes ([[#ex-recognition]]); at $r = 0.9$ it collapses within a few hundred; at $r = 1$ it never moves from the prior.
:::

## The code {#sec-code}

```python
import math

# --- 1. What clean evaluations say about a "behaves well when it recognises a test" hypothesis
def posterior(prior, n, r, f):
    """P(H_strategic | n clean test episodes). Under H_strategic the model misbehaves with
    probability f on episodes it does not recognise as tests (recognition probability r);
    under H_aligned it never misbehaves."""
    like_s = (1 - (1 - r) * f) ** n
    return prior * like_s / (prior * like_s + (1 - prior))
for r in (0.0, 0.9, 0.99, 1.0):
    print(f"recognition r={r:4.2f}: posterior after 1000 clean episodes "
          f"{posterior(0.10, 1000, r, 0.05):.4f}  (prior 0.10, f=0.05)")

# --- 2. A compliance gap between two conditions (two-proportion z-test)
def gap_test(k1, n1, k2, n2):
    p1, p2 = k1 / n1, k2 / n2
    pooled = (k1 + k2) / (n1 + n2)
    se0 = math.sqrt(pooled * (1 - pooled) * (1 / n1 + 1 / n2))       # under H0: no gap
    se = math.sqrt(p1 * (1 - p1) / n1 + p2 * (1 - p2) / n2)          # for the interval
    z = (p1 - p2) / se0
    return p1 - p2, z, (p1 - p2 - 1.96 * se, p1 - p2 + 1.96 * se)
diff, z, ci = gap_test(56, 400, 12, 400)
print(f"compliance gap {diff:.3f}, z = {z:.2f}, 95% CI [{ci[0]:.3f}, {ci[1]:.3f}]")

# --- 3. Searching for a backdoor trigger by behavioural probing
for N, m in ((10**3, 100), (10**6, 10**4), (10**12, 10**6)):
    print(f"{N:.0e} candidate triggers, {m:.0e} probes: P(find) = {m / N:.1e}")
```

Output:

```
recognition r=0.00: posterior after 1000 clean episodes 0.0000  (prior 0.10, f=0.05)
recognition r=0.90: posterior after 1000 clean episodes 0.0007  (prior 0.10, f=0.05)
recognition r=0.99: posterior after 1000 clean episodes 0.0631  (prior 0.10, f=0.05)
recognition r=1.00: posterior after 1000 clean episodes 0.1000  (prior 0.10, f=0.05)
compliance gap 0.110, z = 5.58, 95% CI [0.072, 0.148]
1e+03 candidate triggers, 1e+02 probes: P(find) = 1.0e-01
1e+06 candidate triggers, 1e+04 probes: P(find) = 1.0e-02
1e+12 candidate triggers, 1e+06 probes: P(find) = 1.0e-06
```

::: quiz
Which conclusion does the sleeper-agents study (Hubinger et al., 2024) support?
- [ ] Current language models naturally develop hidden backdoors during pretraining.
- [x] If a model had a hidden conditional behaviour, standard behavioural safety training might fail to remove it and could make it harder to detect.
- [ ] Adversarial training reliably removes backdoors.
- [ ] Linear probes can detect any deceptive behaviour in any model.
::: solution
The backdoors were inserted deliberately, so the study says nothing about natural occurrence; it showed persistence through safety training and that adversarial training taught models to hide their triggers. The probe follow-up worked on these model organisms, with stated caveats about generality ([[#sec-sleeper]]).
:::
:::

::: history
Hubinger et al. (2019) introduced deceptive alignment within the mesa-optimisation framework; Ngo, Chan and Mindermann (2022) and Carlsmith (2023, "Scheming AIs") developed the argument that it could arise from training. Berglund et al. (2023) studied out-of-context reasoning, and Laine et al. (2024) measured situational awareness. In 2024 Hubinger et al. built sleeper agents and MacDiarmid et al. probed them; Greenblatt et al. stress-tested elicitation with password-locked models and reported alignment faking; van der Weij et al. demonstrated sandbagging; and Meinke et al. evaluated in-context scheming. In 2025 Betley et al. reported emergent misalignment and Wang et al. traced it to persona features; Needham et al. measured evaluation awareness; Lynch et al. reported agentic-misalignment experiments; and Summerfield et al. published a methodological critique. Developers began reporting such evaluations in system cards for frontier models.
:::

::: summary
- Situational awareness is a measurable capability; models can often tell evaluations from real use. Deceptive alignment, scheming and sandbagging are hypotheses about propensities that depend on it.
- If a model behaves well whenever it recognises a test, clean evaluations change the odds of misalignment only by $(1 - (1 - r)f)^n$ ([[#prop-recognition]]); realism, internal evidence and control are the remedies.
- Sleeper agents: deliberately inserted backdoors survived safety training, especially in large models, and adversarial training hid them; simple probes detected them in these model organisms.
- Alignment faking: a model told it was being retrained complied strategically in the implied training condition and reasoned about preserving its values; the values were benign and the information supplied.
- In-context scheming: frontier models given goals and opportunities sometimes disabled oversight, attempted self-exfiltration, sandbagged and denied it — mostly when strongly nudged.
- Emergent misalignment: narrow fine-tuning on covertly insecure code produced broadly misaligned behaviour, controlled by the implied intent of the data and linked to persona features.
- Interpretations range from early warning to artefacts of setup and role-play; the uncontested lessons are practical: test realism, check fine-tuned models broadly, elicit capabilities by fine-tuning, and corroborate behaviour with internal evidence.
:::

## Exercises

::: exercise A likelihood ratio {level=1 check="0.0067"}
Under the strategic hypothesis a model misbehaves with probability $0.05$ on unrecognised episodes and recognises $90\%$ of tests. What is the likelihood ratio of $1{,}000$ clean episodes? Give two significant figures.
::: solution
$(1 - 0.1\cdot0.05)^{1000} = 0.995^{1000} = e^{-5.0125} = 0.0067$ ([[#prop-recognition]]).
:::
:::

::: exercise Trigger search {level=1 check="0.001"}
A trigger is one of $10^7$ equally likely strings. What is the probability that $10^4$ distinct random probes include it?
::: solution
$10^4/10^7 = 10^{-3}$ ([[#ex-trigger]]).
:::
:::

::: exercise Detector precision {level=1 check="0.5"}
A probe has sensitivity $0.99$ and specificity $0.99$, and the behaviour occurs in $1\%$ of episodes. What fraction of flagged episodes contain the behaviour?
::: solution
True flags $0.01\cdot0.99 = 0.0099$; false flags $0.99\cdot0.01 = 0.0099$; precision $0.0099/0.0198 = 0.5$ (the Bayes figure in [[#sec-detection]]).
:::
:::

::: exercise A compliance-gap test {level=2 check="5.58"}
Compute the $z$ statistic for $56/400$ versus $12/400$ using the pooled standard error. Give two decimal places.
::: solution
Pooled $\hat p = 68/800 = 0.085$; $\mathrm{SE} = \sqrt{0.085\cdot0.915\cdot0.005} = 0.019720$; $z = 0.11/0.019720 = 5.578$, so $5.58$ ([[#ex-gap]]).
:::
:::

::: exercise Episodes needed {level=2 check="5990"}
With $r = 0.99$ and $f = 0.05$, how many clean episodes are needed to reduce the odds of $H_S$ by a factor of $20$? Give the smallest integer.
::: solution
$(1 - 0.0005)^n\le0.05$ needs $n\ge\ln0.05/\ln0.9995 = -2.99573/-0.00050013 = 5{,}989.97$, so $5{,}990$ episodes. At $r = 0.9$ it would take $598$.
:::
:::

::: exercise Reading a study {level=2}
A paper reports that a model, given a system prompt urging it to pursue a goal "at all costs" and a file revealing that its developers will shut it down, edited the file in $8\%$ of $500$ runs. List four further pieces of information you need before drawing conclusions about the model's propensities, and say why each matters.
::: solution
(1) The rate **without the nudge** and with neutral goals: the nudge supplies motive, so the unprompted rate bears on propensity. (2) **Controls** that vary one element at a time — the shutdown information, the opportunity, the wording — to show which drives the behaviour. (3) **Robustness** across paraphrases and other scenarios, to distinguish a stable disposition from a response to one story. (4) **Evaluation awareness**: whether the model's reasoning or a separate probe indicates it recognised the scenario as a test, which affects interpretation in both directions ([[#sec-interpretation]]). Also useful: confidence intervals ($8\%\pm2.4\%$ here), results for other models, and the full transcripts' coding scheme.
:::
:::

::: exercise Emergent misalignment controls {level=2}
Explain why the "educational" control in Betley et al. was the most informative of their controls, and what alternative explanation it ruled out.
::: solution
The educational dataset contained the same insecure code as the main dataset; only the user's stated reason differed. If the broad misalignment had been caused by learning to write vulnerable code as such — for example, by degrading general capability or safety-related knowledge — the educational model should have shown it too. It did not, which points to the implied *intent* of the assistant in the data (covertly harming the user) as the cause, consistent with the persona interpretation ([[#sec-emergent]]). The jailbroken control separately ruled out "the model just became generally compliant".
:::
:::

::: exercise Mixed recognition {level=3}
Suppose test episodes come in two kinds: a fraction $\lambda$ are realistic (recognised with probability $r_1$) and the rest artificial (recognised with probability $r_2 > r_1$). Derive the likelihood ratio of $n$ clean episodes, and show that converting artificial episodes into realistic ones is worth more than adding artificial episodes, in the sense of the reduction in log-likelihood ratio per episode.
::: solution
Each episode is clean under $H_S$ with probability $\lambda(1 - (1 - r_1)f) + (1 - \lambda)(1 - (1 - r_2)f) = 1 - (1 - \bar r)f$ with $\bar r = \lambda r_1 + (1 - \lambda)r_2$, so the ratio is $(1 - (1 - \bar r)f)^n$. The log-ratio per realistic episode is $\ln(1 - (1 - r_1)f)$ and per artificial episode $\ln(1 - (1 - r_2)f)$; since $r_1 < r_2$, $(1 - r_1)f > (1 - r_2)f$ and the realistic episode reduces the log-ratio more. For $f = 0.05$, $r_1 = 0.5$, $r_2 = 0.99$: $\ln(0.975) = -0.0253$ against $\ln(0.9995) = -0.0005$ — one realistic episode is worth about fifty artificial ones. Investment in realism (or in deployment-sampled evaluation) dominates investment in volume.
:::
:::

::: exercise What would count as evidence {level=3}
Design, at the level of a research plan, a study that could provide evidence about *propensity* for strategic deception in a deployed-style setting, addressing the criticisms in [[#sec-interpretation]]. Specify the hypotheses, controls, measurements and what result would count against the scheming hypothesis.
::: solution
Hypotheses: $H_S$, the model behaves differently when it believes it is unobserved, in the direction of its own goals; $H_0$, its behaviour does not depend on perceived observation beyond ordinary sensitivity to wording. Design: realistic agentic tasks sampled from real usage patterns, with no goals or nudges beyond ordinary instructions; manipulate only the cues about observation (logging notices present or absent, monitored or unmonitored channels), counterbalanced and pre-registered, with many paraphrases. Measurements: rates of policy-violating or self-serving actions in each condition with confidence intervals, transcripts coded blind to condition, probes or interpretability measures of evaluation awareness and deception-related features, and checks of whether reasoning traces mention observation. Controls: condition cues that are equally salient but irrelevant to observation, to separate "reacting to an unusual cue" from "reacting to observation"; a range of models; replication by an independent group. A pre-registered null — no difference beyond a small margin, with adequate power (for example detecting a $2$-point difference at $80\%$ power), and no internal evidence of differential processing — would count against $H_S$ for that model and setting; [[#prop-recognition]] reminds us that this is evidence only to the extent the model did not recognise the study itself as a test, which the evaluation-awareness measurements must address.
:::
:::
