Every alignment method in this atlas so far depends on someone being able to tell good behaviour from bad. Supervised fine-tuning needs correct demonstrations; RLHF needs comparisons in which the labeller prefers the better response ([[post-training/rlhf]]); verifiable rewards need a checker ([[reasoning/verifiable-rewards]]). For many tasks that requirement is already hard to meet — evaluating a long proof, a large code change, a medical answer or a summary of a book the labeller has not read — and it becomes harder as models become more capable than the people evaluating them. The previous chapters showed what goes wrong when the evaluator can be fooled: the policy learns to fool it ([[safety-alignment/reward-hacking]]).

**Scalable oversight** is the research programme that asks how to supervise systems on tasks where direct human evaluation is unreliable, too expensive, or impossible. This chapter covers its main proposals: **debate**, in which two models argue and a weaker judge decides; **amplification** and **recursive reward modelling**, which decompose hard evaluations into easier ones; **critiques**, in which models help humans find flaws; and **weak-to-strong generalisation**, which studies what a strong model learns from a weaker supervisor's imperfect labels. For each we give the core argument, the mathematics where there is some, and the empirical results as published — which, as of 2026, are encouraging in places and mixed in others.

## The oversight problem {#sec-problem}

::: definition Oversight gap and scalable oversight {#def-oversight}
Let a task have inputs $\mathbf x$, and let a supervisor $H$ — a person, a group, or a person with tools — produce evaluations $H(\mathbf x, \mathbf y)$ of candidate outputs $\mathbf y$. The **oversight gap** on a set of tasks is the extent to which $H$'s evaluations disagree with the true quality of outputs, especially for outputs produced by a system optimised against $H$. A **scalable oversight** method is a procedure that lets $H$, assisted by AI systems, produce evaluations whose accuracy does not degrade — or degrades slowly — as the capability of the system being evaluated increases beyond $H$'s own.
:::

How can such methods be tested before superhuman systems exist? Cotra (2021) proposed **sandwiching**: choose tasks on which current models are more capable than some humans (non-experts) but less capable than others (experts). Non-experts, with whatever assistance the method provides, supervise the model; experts score the result. If the method works, the non-experts' supervision should approach expert quality. Bowman et al. (2022, "Measuring progress on scalable oversight for large language models") ran an early version on multiple-choice questions from MMLU and on reading-comprehension questions from QuALITY under time limits, and found that people chatting with an unreliable model assistant outperformed both the model alone and themselves alone. Sandwiching has become the standard experimental design, together with **information asymmetry** setups in which the judge lacks access to information (a long text, say) that the models can see.

## Debate {#sec-debate}

Irving, Christiano and Amodei (2018, "AI safety via debate") proposed training models through a zero-sum game. Two copies of a model see a question and take turns making statements; a judge, who may be much less capable, reads the transcript and declares a winner; each debater is rewarded for winning. The hope is that **it is harder to lie than to refute a lie**: if one debater makes a false claim, the other can point to the specific step that is false, and the judge need only check that step.

::: definition Debate {#def-debate}
A **debate** about a question $q$ is a game between debaters $A$ and $B$ who alternately produce statements $s_1, s_2, \dots, s_n$; a **judge** $J$ then outputs a verdict, $A$ or $B$, from $q$ and the transcript. The game is zero-sum: the winner receives reward $1$, the loser $0$. In a **training** setting the debaters are trained by self-play to win; at deployment, the answer defended by the debater who would win under optimal play is taken as the system's answer.
:::

The argument can be made exact in an idealised model where claims decompose into sub-claims.

::: proposition Honest debate on a claim tree {#prop-tree}
Suppose every claim $c$ is either a **leaf**, whose truth the judge evaluates correctly, or has a **decomposition** into sub-claims $c_1, \dots, c_m$ such that $c$ is true if and only if all $c_i$ are true. Consider the debate in which $A$ asserts a claim; $B$ either accepts or selects one sub-claim of the current claim to dispute; $A$ must defend that sub-claim; and so on until a leaf is reached, which the judge evaluates. Then the debater on the side of the truth wins, whatever the other does: if the root claim is true, $A$ wins by defending honestly; if it is false, $B$ wins by always disputing a false sub-claim. The judge evaluates a single leaf, at depth at most the depth $D$ of the tree, while checking the claim directly could require evaluating $m^D$ leaves.
:::

::: proof
By induction on the depth of the current claim. At a leaf, the judge rules correctly, so the side of the truth wins. Suppose the result holds for claims of depth less than $k$, and consider a claim $c$ of depth $k$. If $c$ is true, every sub-claim is true, so whichever one $B$ disputes, $A$ defends a true claim of depth less than $k$ and wins by the induction hypothesis. If $c$ is false, at least one sub-claim is false (since $c$ is true iff all are), and $B$ disputes it; $A$ must then defend a false claim of smaller depth and loses by hypothesis. The debate follows one path from the root to a leaf, so the judge evaluates one leaf.
:::

This is the core of the complexity-theoretic argument in Irving et al.: with optimal play, debates judged by a polynomial-time judge can answer any question in the class PSPACE, whereas a judge checking a single answer with a supporting argument handles only NP. A judge examining one step on an exponentially large argument tree is the formal version of "pointing out the flaw".

::: example How much the judge has to check {#ex-tree}
A claim decomposes into $m = 4$ sub-claims at each level, to depth $D = 6$. How many leaf evaluations does a direct check need, how many does the debate need, and what happens if the judge evaluates leaves correctly only with probability $0.9$?
::: solution
A direct check of the whole tree needs $4^6 = 4{,}096$ leaf evaluations; the debate needs one, reached after six rounds of dispute. With a judge who errs on a leaf with probability $0.1$, the honest side wins with probability $0.9$ in this idealised game: only the final leaf is judged, so the error does not compound with depth. Repeating the debate with independent judges and taking a majority would push accuracy higher, if judges' errors were independent.
:::
:::

The idealisation hides the difficulties, which are the subject of current research:

- **Obfuscated arguments.** A dishonest debater may decompose a false claim into many sub-claims each of which *looks* plausible, where the flaw is somewhere but the honest debater cannot efficiently locate it (Barnes and Christiano, 2020). [[#prop-tree]] assumes the honest side can find the false sub-claim; in a large enough argument, that search may itself be intractable. Brown-Cohen, Irving and Piliouras (2023, "Scalable AI safety via doubly-efficient debate") designed protocols in which the honest debater needs only polynomial effort relative to the computation being verified.
- **Judge biases.** Judges may be swayed by confidence, length or rhetoric, the same weaknesses as RLHF raters.
- **Training dynamics.** Optimal play is assumed; real training may not reach it, and both debaters may learn to exploit the judge together.

### Empirical results

Irving et al. tested a toy version on MNIST images: a judge classifier that sees only a few pixels, revealed by two debating agents, one arguing for the true digit and one for a false one. With six revealed pixels the judge's accuracy rose from $59.4\%$ (pixels chosen at random) to $88.9\%$ with debate. Later work moved to language.

- **Human debaters.** Michael et al. (2023, "Debate helps supervise unreliable experts") had people who could read a long story debate reading-comprehension questions in front of judges who could not. Judges were more accurate with debate ($84\%$) than with **consultancy**, a baseline in which a single expert argues for one answer, chosen to be wrong half the time ($74\%$).
- **Model debaters.** Khan et al. (ICML 2024, "Debating with more persuasive LLMs leads to more truthful answers") ran the same information-asymmetry setup with language-model debaters. Non-expert judges reached $76\%$ (models) and $88\%$ (humans) accuracy with debate, against naive baselines of $48\%$ and $60\%$. Optimising debaters for persuasiveness — by best-of-$n$ selection against a judge — *increased* judge accuracy in debate, as the theory predicts, whereas in consultancy more persuasive consultants made judges less accurate.
- **Mixed results across tasks.** Kenton et al. (NeurIPS 2024, "On scalable oversight with weak LLMs judging strong LLMs") compared debate, consultancy and direct question answering with weaker models as judges across many tasks. Debate consistently beat consultancy. Compared with the judge simply answering the question itself, debate helped in information-asymmetry tasks but showed mixed results on tasks where the judge had the same information as the debaters.

These studies use questions with known answers, judges who are deliberately handicapped, and debaters that are not trained end-to-end by debate self-play; whether debate trains *honest* models — rather than merely helping judges evaluate existing ones — remains largely untested as of 2026.

::: widget plot
f: x*log(m)/log(10); log(x)/log(10)
x: 1, 20
y: 0, 12
sliders: m=4:2:10:1
labels: $\log_{10}$ of leaves checked directly, $m^D$; $\log_{10}$ of rounds in a debate, $D$
caption: The judge's work in the idealised debate of [[#prop-tree]], on a logarithmic scale, against the depth $D$ of the argument tree with $m$ sub-claims per claim. Checking every leaf needs $m^D$ evaluations; a debate needs $D$ rounds and a single leaf evaluation. At $m = 4$, $D = 6$ the direct check needs $4{,}096$ evaluations ([[#ex-tree]]). The saving depends on the honest debater being able to find the false sub-claim, which obfuscated arguments can prevent.
:::

## Amplification, decomposition and recursive reward modelling {#sec-amplification}

A second family of proposals builds a strong overseer out of weak parts.

::: definition Iterated amplification {#def-ida}
In **iterated distillation and amplification** (IDA; Christiano, Shlegeris and Amodei, 2018), a human $H$ answers a question by breaking it into sub-questions and delegating them to copies of the current model $M_k$; the combined system $\mathrm{Amp}(H, M_k)$ is more capable than $M_k$ but slow. The next model $M_{k+1}$ is trained to imitate $\mathrm{Amp}(H, M_k)$ (distillation), and the process repeats. **Recursive reward modelling** (Leike et al., 2018) applies the same idea to evaluation: models trained with reward modelling assist the human in evaluating the outputs of the next, more capable model.
:::

The safety argument is inductive: if each amplification step preserves alignment — the human decomposes faithfully and the sub-answers are honest — and each distillation step is faithful, then alignment carries through. The assumption carrying the weight is the **factored cognition hypothesis**: that hard tasks can be decomposed into pieces each manageable by someone with limited context. The research organisation Ought tested it with humans in 2019–2020 and found decompositions harder to construct than hoped for many reasoning tasks. A practical instance is book summarisation by Wu et al. (OpenAI, 2021): a model summarised sections, then summaries of summaries, trained with human feedback at each level, so that labellers evaluated short passages rather than whole books. Decomposition into verifiable steps also underlies process supervision ([[reasoning/process-outcome-rewards]]).

::: example The cost of errors in decomposition {#ex-decomposition}
An evaluation is decomposed into a tree with $3$ sub-questions per node and $4$ levels, so there are $81$ leaf answers combined through $40$ internal steps. Each leaf answer is correct with probability $0.99$, each combining step with probability $0.995$, independently, and an error anywhere makes the final evaluation wrong. What is the probability that the final evaluation is correct? What changes in the debate setting?
::: solution
$0.99^{81}\cdot0.995^{40} = 0.443\cdot0.818 = 0.362$. Errors compound across every node of the tree, because amplification combines all sub-answers. This is the motivation for checking steps (process supervision) and for error-correcting decompositions in which nodes check one another. In a debate, by contrast, only the disputed path is examined, so errors elsewhere do not matter — but the debate depends on the honest debater identifying where the dispute should go ([[#prop-tree]]).
:::
:::

## Critiques and AI-assisted evaluation {#sec-critiques}

The most deployed form of scalable oversight is the simplest: use models to help people evaluate. Saunders et al. (2022, "Self-critiquing models for assisting human evaluators") trained models to write critiques of summaries; showing critiques to labellers helped them find substantially more flaws, including deliberately inserted ones, than they found unaided. McAleese et al. (OpenAI, 2024, "LLM critics help catch LLM bugs") trained a critic model on code with inserted bugs; its critiques were preferred by trainers over human-written ones in most comparisons and found more bugs, at the cost of some nitpicks and hallucinated problems, and human–model teams balanced comprehensiveness and accuracy better than either alone. Constitutional AI and model judges ([[post-training/ai-feedback]], [[evaluation/model-judges]]) are related: they replace or assist human evaluation with model evaluation guided by stated principles.

Assisted evaluation inherits a recursion problem. If the critic is the same kind of model as the one being evaluated, the critic may share its blind spots, or — in the adversarial case examined in [[safety-alignment/deception-misalignment]] — fail to report flaws it notices. Prover–verifier games (Kirchner et al., 2024) train a strong "prover" to produce solutions that a weaker "verifier" can check, aiming for **legibility**: outputs written so that a weaker evaluator can follow them, at some cost in raw performance.

::: warning More persuasive is not more correct
A method that makes human judges *agree* more with model outputs has not necessarily improved oversight: RLHF can make wrong answers more convincing ([[safety-alignment/reward-hacking#sec-gaming]]). The quantity to measure is the judge's *accuracy* on questions with known answers, against baselines including consultancy and unassisted judging, and with debaters or assistants optimised to persuade. Khan et al.'s result that stronger persuaders raised debate accuracy but lowered consultancy accuracy is exactly the comparison that separates the two.
:::

## Weak-to-strong generalisation {#sec-w2s}

Debate and amplification try to make the supervisor stronger. Burns et al. (OpenAI, 2023, "Weak-to-strong generalization: eliciting strong capabilities with weak supervision") asked a complementary question: when a strong model is trained on labels from a weak supervisor, does it merely imitate the supervisor, errors included, or does it generalise beyond it? They proposed an analogy that can be studied now: a small model plays the human supervisor and a large pretrained model plays the superhuman system.

::: definition Performance gap recovered {#def-pgr}
Fine-tune a weak model on ground truth; its test performance is $P_{\text{weak}}$. Use it to label a training set, and fine-tune a strong model on those labels: performance $P_{\text{w2s}}$. Fine-tune the strong model on ground truth: the **strong ceiling** $P_{\text{ceil}}$. The **performance gap recovered** is
$$
\mathrm{PGR} = \frac{P_{\text{w2s}} - P_{\text{weak}}}{P_{\text{ceil}} - P_{\text{weak}}}.
$$ {#eq-pgr}
$\mathrm{PGR} = 0$ means the strong model only matches its supervisor; $\mathrm{PGR} = 1$ means it does as well as if it had been trained on the truth.
:::

::: example Computing PGR {#ex-pgr}
A weak supervisor reaches $60\%$ accuracy, the strong model trained on its labels $72\%$, and the strong model trained on ground truth $80\%$. Compute PGR. A second student reaches $62\%$ on the same labels.
::: solution
$\mathrm{PGR} = (0.72 - 0.60)/(0.80 - 0.60) = 0.12/0.20 = 0.6$: the student recovered $60\%$ of the gap. The second student gets $(0.62 - 0.60)/0.20 = 0.1$. PGR is a ratio of differences, so it is noisy when the gap is small: with a gap of $20$ points and test sets of a few thousand examples, each accuracy has a standard error of about one point, and the PGR's uncertainty is several times larger than any single accuracy's.
:::
:::

Burns et al. found that strong students consistently outperformed their weak supervisors: on NLP classification tasks, a GPT-4-class student supervised by a GPT-2-class model typically performed between GPT-3 and GPT-3.5 levels. PGR rose with the strong model's size. An **auxiliary confidence loss**, which lets the student disagree confidently with weak labels, raised PGR on NLP tasks to around $80\%$ for the largest supervisor–student gaps. Results were weaker on chess puzzles and much weaker on ChatGPT reward modelling, the setting closest to alignment. The authors listed disanalogies: future superhuman models may find it *easier* to imitate human errors than today's students find it to imitate small-model errors, since human errors are well represented in pretraining data; and the strong models may already have seen the tasks.

Why should a student exceed its teacher at all? Two idealised cases mark the extremes.

::: proposition Random versus systematic supervisor errors {#prop-w2s}
Let the true label be $y = h^\star(\mathbf x)\in\{-1, 1\}$. (a) If the weak label is $\tilde y = y$ with probability $1 - \eps$ and $-y$ with probability $\eps < \tfrac12$, independently of $\mathbf x$, then the classifier minimising expected error *on weak labels* is $h^\star$: a student that fits the weak labels perfectly in distribution recovers the truth ($\mathrm{PGR} = 1$). (b) If the weak label is a deterministic function $\tilde y = h_w(\mathbf x)$, then the classifier minimising error on weak labels is $h_w$ itself: a student that fits them perfectly imitates the supervisor ($\mathrm{PGR} = 0$).
:::

::: proof
(a) For any $\mathbf x$, $\Prob(\tilde y = h^\star(\mathbf x)\mid\mathbf x) = 1 - \eps > \tfrac12 > \eps = \Prob(\tilde y = -h^\star(\mathbf x)\mid\mathbf x)$, so the Bayes-optimal predictor of $\tilde y$, which predicts the more probable label at each $\mathbf x$, is $h^\star$. (b) Here $\tilde y$ is determined by $\mathbf x$, so the predictor $h_w$ has zero error on weak labels and is the unique minimiser up to sets of probability zero; its performance on true labels equals the supervisor's.
:::

Real supervisor errors are neither purely random nor purely deterministic, and real students do not fit their training labels perfectly. What the student learns from systematic errors then depends on its **inductive biases**: if the true concept is *salient* in the strong model's representation — easy to express — and the supervisor's errors are not, a student trained briefly, or with regularisation, picks up the concept before it learns the errors. Burns et al. found evidence for this: early stopping helped, and PGR was highest when the strong model already represented the task well. The listing below reproduces the effect in a toy.

::: example Salience and early stopping {#ex-salience}
In a toy problem, the strong model's representation has the true concept as one large-scale feature and nine small-scale details. A weak supervisor makes systematic errors that depend on three of the details, and is $67.7\%$ accurate. A logistic-regression student trained on its labels for $20$, $300$ and $3{,}000$ gradient steps reaches $99.3\%$, $90.0\%$ and $71.5\%$ accuracy; the ceiling is $100\%$. Compute the PGRs and explain the trend.
::: solution
$\mathrm{PGR} = (0.993 - 0.677)/(1 - 0.677) = 0.98$, $(0.900 - 0.677)/0.323 = 0.69$, and $(0.715 - 0.677)/0.323 = 0.12$ (the listing prints $0.98$, $0.69$, $0.11$ from unrounded accuracies). Gradient descent from zero moves fastest along large-scale features, so early in training the student's weight is mostly on the salient true concept; the supervisor's systematic errors can be fitted only through the small-scale details, which takes many more steps. Given enough training the student approaches the imitator of [[#prop-w2s]](b). Weak-to-strong generalisation, in this picture, is a race between learning the concept and learning the supervisor's mistakes, and it is won only when the concept is easier.
:::
:::

```python
import random, math

rng = random.Random(5)
d = 10
def draw(n):
    # feature 0 is the 'salient' concept the strong model already represents well (large scale);
    # features 1..9 are weakly informative details (small scale)
    out = []
    for _ in range(n):
        t = rng.gauss(0, 1)                     # the true concept
        z = [rng.gauss(0, 1) for _ in range(d - 1)]
        x = [3.0 * t] + [0.3 * zi for zi in z]  # strong model's representation
        out.append((x, t, z))
    return out
train, test = draw(2000), draw(2000)
truth = lambda t, z: 1 if t > 0 else -1
weak_random = lambda t, z, r: truth(t, z) * (-1 if r < 0.25 else 1)       # unpredictable errors
weak_system = lambda t, z: 1 if t + 0.8 * sum(z[:3]) > 0 else -1           # errors a function of x

def fit(data, labels, steps, lr=0.05):
    """Logistic regression by gradient descent from zero; few steps = strong implicit regularisation."""
    w = [0.0] * d
    for _ in range(steps):
        g = [0.0] * d
        for (x, _, _), y in zip(data, labels):
            m = y * sum(wi * xi for wi, xi in zip(w, x))
            c = -y / (1 + math.exp(m))
            for i in range(d):
                g[i] += c * x[i]
        w = [wi - lr * gi / len(data) for wi, gi in zip(w, g)]
    return w
def acc(w, data):
    return sum((sum(wi * xi for wi, xi in zip(w, x)) > 0) == (t > 0) for x, t, _ in data) / len(data)
def label_acc(fn, data):
    return sum(fn(t, z) == truth(t, z) for _, t, z in data) / len(data)

ceiling = acc(fit(train, [truth(t, z) for _, t, z in train], 300), test)
for name, labels, weak_acc in (
        ("random errors", [weak_random(t, z, rng.random()) for _, t, z in train], 0.75),
        ("systematic errors", [weak_system(t, z) for _, t, z in train], label_acc(weak_system, test))):
    for steps in (20, 300, 3000):
        w2s = acc(fit(train, labels, steps), test)
        pgr = (w2s - weak_acc) / (ceiling - weak_acc)
        print(f"{name:17s} steps={steps:4d}: weak {weak_acc:.3f}  weak-to-strong {w2s:.3f}  ceiling {ceiling:.3f}  PGR {pgr:.2f}")
```

Output:

```
random errors     steps=  20: weak 0.750  weak-to-strong 1.000  ceiling 1.000  PGR 1.00
random errors     steps= 300: weak 0.750  weak-to-strong 0.993  ceiling 1.000  PGR 0.97
random errors     steps=3000: weak 0.750  weak-to-strong 0.970  ceiling 1.000  PGR 0.88
systematic errors steps=  20: weak 0.677  weak-to-strong 0.993  ceiling 1.000  PGR 0.98
systematic errors steps= 300: weak 0.677  weak-to-strong 0.900  ceiling 1.000  PGR 0.69
systematic errors steps=3000: weak 0.677  weak-to-strong 0.715  ceiling 1.000  PGR 0.11
```

With random errors the student stays close to the truth however long it trains, as [[#prop-w2s]](a) predicts; the slow decline is overfitting to noise on a finite sample. With systematic errors the PGR falls from $0.98$ to $0.11$ as training continues.

::: widget plot
f: (x - a)/(c - a)
x: 0.5, 1
y: -0.5, 1.2
sliders: a=0.677:0.5:0.9:0.001; c=1:0.8:1:0.001
hlines: 0; 1
points: 0.993,0.978; 0.900,0.690; 0.715,0.118
labels: PGR as a function of the student's accuracy
caption: The performance gap recovered [[#eq-pgr]] against the weak-to-strong student's accuracy, for weak accuracy $a$ and ceiling $c$. The points are the three systematic-error runs of the listing ($20$, $300$ and $3{,}000$ steps). PGR is linear in the student's accuracy with slope $1/(c - a)$: when the gap $c - a$ is small, a one-point change in accuracy moves PGR a lot, which makes PGR noisy for small gaps.
:::

## How the approaches relate {#sec-relations}

The proposals answer different parts of the problem. Debate and amplification aim to make evaluation **more accurate** than unaided human judgement; critiques are their practical precursor. Weak-to-strong generalisation asks how much a strong model's **generalisation** can be trusted beyond the evaluations we can make; it is less a method than an empirical question about inductive biases, which methods such as the confidence loss try to exploit. Easy-to-hard generalisation, which trains on tasks humans can check and tests on harder ones (Hase et al., 2024; Sun et al., 2024), sits between them. All of them assume the model is not *trying* to defeat the oversight — the debaters play to win, the student fits its labels. If a model behaves strategically, behaving well only when it expects to be checked, oversight methods need to be complemented by the evaluations of [[safety-alignment/deception-misalignment]] and the control measures of [[safety-alignment/monitoring-control]], which are designed to work even then.

Views on the programme differ. Proponents argue that some form of AI-assisted oversight is unavoidable as models exceed human ability, and that the empirical results show measurable gains. Sceptics within the field point to obfuscated arguments, to evidence that debate's gains shrink when the judge has the same information as the debaters, and to the gap between helping judges on multiple-choice questions and training honest systems on open-ended tasks. Others outside it question whether the "superhuman supervisee" framing describes the systems actually being built. The experiments are young, and most use questions with known answers precisely because they are needed to score the method — which is the situation the methods are meant to go beyond.

::: quiz
In a sandwiching experiment, non-expert judges assisted by an AI debate reach $85\%$ accuracy on questions where unassisted non-experts reach $60\%$ and experts $95\%$. What can be concluded?
- [ ] The debating model is honest.
- [x] On these tasks, debate let non-experts recover most of the gap to expert-level judgement; whether this holds for tasks beyond expert reach, or for debaters trained by debate, is not shown.
- [ ] Debate will scale to superhuman systems.
- [ ] Experts are no longer needed for evaluation.
::: solution
Sandwiching measures exactly the recovered gap, $(85 - 60)/(95 - 60) = 71\%$ here. It cannot show that debaters are honest (only that the judges were more accurate), and extrapolation beyond the tested regime is the open question ([[#sec-debate]], [[#sec-relations]]).
:::
:::

::: history
Amodei et al. (2016) listed scalable oversight among concrete problems. Irving, Christiano and Amodei proposed debate in 2018, the same year as iterated amplification (Christiano, Shlegeris and Amodei) and recursive reward modelling (Leike et al.). Barnes and Christiano described the obfuscated-arguments problem in 2020; Ought studied factored cognition in 2019–2020; Wu et al. (2021) summarised books recursively; Cotra (2021) proposed sandwiching, and Bowman et al. (2022) measured it. Saunders et al. (2022) trained critique models; Michael et al. (2023) ran human debates; Burns et al. (2023) introduced weak-to-strong generalisation; Brown-Cohen et al. (2023) proposed doubly-efficient debate. In 2024 Khan et al. found debate improved with debater persuasiveness, Kenton et al. compared protocols across tasks, McAleese et al. reported CriticGPT, and Kirchner et al. trained provers for legibility.
:::

::: summary
- Scalable oversight asks how to evaluate models accurately when they exceed their evaluators; sandwiching and information asymmetry make the question testable today.
- Debate: two models argue, a weak judge decides. On a claim tree the honest side wins by disputing one path, so the judge checks one leaf instead of $m^D$ ([[#prop-tree]]); obfuscated arguments, judge biases and training dynamics break the idealisation.
- Empirically, debate beats consultancy for non-expert judges with information asymmetry (Michael et al., 2023; Khan et al., 2024); against direct answering results are mixed (Kenton et al., 2024).
- Amplification and recursive reward modelling build strong evaluators from decomposition; errors compound across the tree, and the factored-cognition hypothesis is unproven.
- Model critiques already help humans find flaws; persuasiveness must not be mistaken for accuracy.
- Weak-to-strong generalisation: $\mathrm{PGR} = (P_{\text{w2s}} - P_{\text{weak}})/(P_{\text{ceil}} - P_{\text{weak}})$. Random supervisor errors are recoverable, deterministic ones are imitated; in between, salience and early stopping decide ([[#prop-w2s]]).
- All of these assume the model is not strategically defeating oversight; that case needs deception evaluations and control.
:::

## Exercises

::: exercise A PGR {level=1 check="0.75"}
A weak supervisor scores $70\%$, the weak-to-strong student $82\%$ and the strong ceiling $86\%$. What is the PGR?
::: solution
$(0.82 - 0.70)/(0.86 - 0.70) = 0.12/0.16 = 0.75$ ([[#def-pgr]]).
:::
:::

::: exercise Leaves in a claim tree {level=1 check="3125"}
A claim tree has $5$ sub-claims per claim and depth $5$. How many leaves would a direct check evaluate?
::: solution
$5^5 = 3{,}125$; the debate of [[#prop-tree]] evaluates one, after five rounds.
:::
:::

::: exercise Sandwiching gap {level=1 check="0.6"}
Unassisted non-experts score $50\%$, experts $90\%$, assisted non-experts $74\%$. What fraction of the non-expert–expert gap did the assistance recover?
::: solution
$(0.74 - 0.50)/(0.90 - 0.50) = 0.24/0.40 = 0.6$ — the same ratio as PGR, with experts as the ceiling.
:::
:::

::: exercise Decomposition errors {level=2 check="0.362"}
Recompute [[#ex-decomposition]]: $81$ leaves correct with probability $0.99$ and $40$ combining steps correct with probability $0.995$, all independent and all required. Give three decimal places.
::: solution
$0.99^{81} = e^{81\ln0.99} = e^{-0.8141} = 0.4430$ and $0.995^{40} = e^{-0.2005} = 0.8183$; the product is $0.3625$, so $0.362$ to three decimal places.
:::
:::

::: exercise Majority of judges {level=2 check="0.972"}
In the idealised debate, each judge evaluates the final leaf correctly with probability $0.9$, independently. What is the probability that a majority of $3$ judges is correct? Give three decimal places.
::: solution
$0.9^3 + 3\cdot0.9^2\cdot0.1 = 0.729 + 0.243 = 0.972$. Independence is the strong assumption: judges who share a bias (for confident-sounding claims, say) do not improve by voting.
:::
:::

::: exercise The uncertainty of a PGR {level=2 check="0.06"}
Weak, weak-to-strong and ceiling accuracies are each measured on separate test sets of $2{,}000$ examples, with true values $0.60$, $0.72$ and $0.80$. Using the delta method, estimate the standard error of the PGR. Give two decimal places.
::: solution
The variances of the three accuracies are $p(1 - p)/2000$: $s_W^2 = 1.200\times10^{-4}$, $s_S^2 = 1.008\times10^{-4}$, $s_C^2 = 0.800\times10^{-4}$. With $\mathrm{PGR} = (S - W)/(C - W)$ and gap $G = C - W = 0.2$, the partial derivatives are $\partial/\partial S = 1/G = 5$, $\partial/\partial C = -(S - W)/G^2 = -3$ and $\partial/\partial W = (S - C)/G^2 = -2$. The variance is $25(1.008\times10^{-4}) + 9(0.800\times10^{-4}) + 4(1.200\times10^{-4}) = 3.72\times10^{-3}$, so the standard error is $\sqrt{0.00372} = 0.061$, which is $0.06$ to two decimal places. A PGR of $0.6$ is therefore uncertain by about $\pm0.12$ at $95\%$, although each accuracy is known to about $\pm0.02$. Measuring all three on the same test set correlates the errors positively and reduces the uncertainty somewhat.
:::
:::

::: exercise Mixed supervisor errors {level=2}
A weak supervisor is correct on $80\%$ of inputs. On a region $R$ covering $10\%$ of inputs it is always wrong; elsewhere it errs at random with probability $\eps$. (a) Find $\eps$. (b) What accuracy does a student that predicts the Bayes-optimal weak label at every input achieve, and what PGR does it obtain if the ceiling is $100\%$?
::: solution
(a) Accuracy $= 0.1\cdot0 + 0.9(1 - \eps) = 0.8$ gives $\eps = 1/9 = 0.111$. (b) Outside $R$ the Bayes-optimal predictor of weak labels is the truth ([[#prop-w2s]](a)), inside $R$ it is the supervisor's wrong label ((b)). So the student is correct on $90\%$ of inputs, and $\mathrm{PGR} = (0.9 - 0.8)/(1 - 0.8) = 0.5$. The random half of the supervisor's errors is recovered and the systematic half is imitated, which is why the composition of supervisor errors — not their total — determines what weak-to-strong training can achieve.
:::
:::

::: exercise Obfuscated arguments {level=3}
In the claim-tree debate, suppose a false root claim has $m^D$ leaves of which exactly one is false, and the honest debater (disputing) cannot evaluate sub-claims but can only choose sub-claims at random. What is the probability the honest debater wins? How does this relate to the obfuscated-arguments problem, and what property would an efficient honest strategy need?
::: solution
At each level the false sub-claim is one of $m$ choices, and a random choice finds it with probability $1/m$; the debater must find it at all $D$ levels, so the probability is $m^{-D}$ — for $m = 4$, $D = 6$, $1/4{,}096$. The dishonest debater, defending, faces no such problem: every path it is forced down, except the one with the false leaf, consists of true claims. This is the obfuscated-arguments problem: [[#prop-tree]] assumes the honest side can *locate* the flaw, which needs as much work as checking the argument when the flaw is hidden. An efficient honest strategy needs a way to decide which sub-claim is false with effort polynomial in the size of the honest computation — the property doubly-efficient debate protocols are designed to provide (Brown-Cohen et al., 2023), for example by requiring claims to be stated about computations the honest debater can itself recompute.
:::
:::

::: exercise Early stopping in the toy {level=3}
Explain, using the gradient of the logistic loss at $\mathbf w = \mathbf 0$, why in the listing the first gradient steps put most weight on feature $0$ even when the labels are the systematic weak labels. Estimate the ratio of the initial gradient on feature $0$ to that on feature $1$.
::: solution
At $\mathbf w = \mathbf 0$ the per-example gradient of $\log(1 + e^{-y\,\mathbf w\cdot\mathbf x})$ is $-\tfrac12y\mathbf x$, so the initial update is proportional to $\E[\tilde y\,\mathbf x]$. Feature $0$ is $3t$ and feature $1$ is $0.3z_1$, and $\tilde y = \sgn(t + 0.8(z_1 + z_2 + z_3))$. Let $S = t + 0.8(z_1 + z_2 + z_3)$, with variance $1 + 3(0.64) = 2.92$. For a Gaussian $S$ and any jointly Gaussian $u$, $\E[\sgn(S)u] = \sqrt{2/\pi}\,\Cov(S, u)/\sqrt{\Var S}$. So $\E[\tilde y\cdot3t]\propto3\cdot1 = 3$ and $\E[\tilde y\cdot0.3z_1]\propto0.3\cdot0.8 = 0.24$, a ratio of $12.5$. The first steps therefore align $\mathbf w$ mostly with the true concept, and the student's predictions are those of the truth; the small-feature weights that reproduce the supervisor's errors grow only after the loss on feature $0$ saturates. With details at the same scale as the concept, the race would be much closer and the PGR at every stopping time lower.
:::
:::
