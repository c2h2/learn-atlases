A trained language model is a function written out completely: every weight is known, every activation can be recorded, and the output for any input can be recomputed exactly. In that sense nothing about it is hidden. Yet if we ask *why* a model answered "Paris" rather than "Lyon", or whether it is following an instruction because it understood it or because the phrasing resembled its training data, the weights do not tell us. There are billions of them, they were set by gradient descent rather than by a designer, and no one wrote down what any of them is for. **Interpretability** is the research programme of turning that complete but unreadable description into explanations that people can understand, check and use.

This chapter sets up the course. It explains why interpretability is wanted — for science, debugging, trust and safety — and why those motives lead to different standards for what counts as an explanation. It introduces the main families of methods: **behavioural** analysis that treats the model as a black box, **attribution** methods that assign credit to inputs, **concept-based** methods that test for human concepts, and **mechanistic** interpretability, which tries to reverse-engineer the algorithm a network implements. It then makes precise the two properties that separate a good explanation from a merely convincing one — **faithfulness** and **plausibility** — and introduces the idea that ties the rest of the course together: an explanation is a *simpler causal model* of the network, and it can be tested by **intervening** on the network and checking that the simpler model predicts what happens. A small numerical laboratory shows an explanation that passes every behavioural test and still fails the interventional one.

## Why interpret a model? {#sec-why}

Lipton (2018), in an essay titled *The Mythos of Model Interpretability*, observed that the word "interpretability" is used for many different things, and that papers often claim it without saying which. He listed the **desiderata** that motivate the demand:

- **Trust.** Users want to know when to rely on a model. Lipton notes that this is not the same as accuracy: one may trust a model more if its errors fall on cases where humans also err, or if one knows which inputs it handles badly.
- **Causality.** Scientists want models to suggest hypotheses about the world, while remembering that a predictive model captures associations, not necessarily causes.
- **Transferability.** We want to know whether a model will behave well when the deployment distribution differs from the training distribution — whether it has learned the intended rule or a shortcut.
- **Informativeness.** An explanation can be useful to a human decision-maker even if it does not reveal the model's inner workings.
- **Fair and ethical decision-making.** Decisions that affect people may need to be contestable, which requires knowing on what grounds they were made.

For language models one more motive has become central: **safety**. A model could produce acceptable outputs during evaluation for reasons that would not hold in deployment, or could represent information — for example that it is being tested — that it does not report. Behavioural testing samples a model's behaviour on finitely many inputs; an understanding of its internal computation could, in principle, support claims about inputs nobody tried. This motive is ambitious, and whether current methods can deliver it is one of the open questions of [[interpretability/open-problems]]; the course presents both the hopes and the reasons for doubt.

Lipton also distinguished two kinds of answer. **Transparency** concerns the model itself: a model is *simulatable* if a person can step through its computation in reasonable time, *decomposable* if each part (input, parameter, intermediate value) has an intuitive meaning, and *algorithmically transparent* if the learning procedure is understood (a linear model's loss is convex, so its solution is characterised). **Post-hoc interpretability** concerns explanations produced after the fact for a model that is not transparent: textual explanations, visualisations, local explanations of single predictions, and explanations by example. A large language model is not transparent in any of the three senses, so everything in this course is post-hoc in Lipton's terms — although mechanistic interpretability aims at something close to decomposability, recovered after training rather than designed in.

::: example How large is the object to be explained? {#ex-count}
GPT-2 small has $L = 12$ layers, each with $h = 12$ attention heads and a feed-forward layer of width $3072$, and a residual stream of dimension $d = 768$. Count its attention heads and feed-forward neurons, and the number of subsets of heads one would have to consider to find "the" set of heads responsible for a behaviour by brute force.
::: solution
Heads: $12\times12 = 144$. Neurons: $12\times3072 = 36{,}864$. Subsets of heads: $2^{144}\approx2.2\times10^{43}$. A small model already has tens of thousands of candidate units, and the space of subsets of even the heads alone is far too large to search exhaustively. Interpretability methods therefore need either strong hypotheses (a human proposes a mechanism and tests it), greedy or gradient-based search ([[interpretability/circuits]]), or a change of units — the *features* of [[interpretability/sparse-features]] rather than neurons. A frontier model has on the order of a hundred layers and a residual stream of tens of thousands of dimensions, so the problem grows by orders of magnitude.
:::
:::

## A map of methods {#sec-map}

Explanations can be classified along several independent axes. Doshi-Velez and Kim (2017) and Lipton (2018) give the most common ones:

- **Local or global.** A local explanation concerns one prediction ("why this answer for this prompt?"); a global one concerns the model's behaviour in general ("how does it do addition?").
- **Intrinsic or post-hoc.** An intrinsically interpretable model is built to be understood (a short decision list, a sparse linear model, a concept bottleneck); a post-hoc method explains a model that was trained without regard to interpretability.
- **Model-agnostic or model-specific.** Agnostic methods use only inputs and outputs (and sometimes gradients); specific methods use the architecture, for instance the structure of attention.

Within post-hoc interpretability of neural networks, four broad families are in use. They differ in what they treat as the object of explanation.

::: definition Families of interpretability methods {#def-families}
Let $f$ be a trained model, mapping an input $x$ to an output $f(x)$ through internal activations $a(x)$.

1. A **behavioural** method studies $f$ only through its input–output behaviour: it designs inputs (minimal pairs, counterfactual edits, held-out distributions) and measures how $f(x)$ changes.
2. An **attribution** method assigns to each input feature (or each internal unit) a number measuring its contribution to a particular output — for example a gradient, a gradient times input, or a Shapley value ([[interpretability/probing-attribution]]).
3. A **concept-based** method asks whether, and where, the activations $a(x)$ represent a human-specified concept $C$ — by training a probe to predict $C$ from $a(x)$, or by finding a concept direction and measuring how sensitive the output is to it.
4. A **mechanistic** method aims to identify the variables the network computes (*features*) and the computations relating them (*circuits*), and to verify the description by interventions on $a(x)$.
:::

The families are not exclusive, and a single study often combines them. They are also not ranked: behavioural methods answer questions about what a model *does* that internal analysis cannot replace, and many of the most useful practical results about language models — the reversal curse, sensitivity to prompt format, sycophancy — are behavioural.

**Behavioural analysis** is the oldest family. For language models it includes minimal-pair tests of grammar (Linzen, Dupoux and Goldberg, 2016), checklists of capabilities (Ribeiro et al., 2020) and the whole apparatus of [[evaluation]]. Its strength is that its claims are directly about outputs; its weakness is that it is limited to the inputs one thinks of.

**Attribution** methods produce saliency maps and token-level importance scores. They are cheap and model-agnostic, and they answer a local question. Their pitfalls — saturation, sensitivity to baselines, disagreement between methods — are the subject of [[interpretability/probing-attribution]].

**Concept-based** methods start from a concept chosen by a person. *Testing with Concept Activation Vectors* (TCAV; Kim et al., 2018) collects examples with and without a concept, trains a linear classifier on a layer's activations, takes the normal of its decision boundary as the concept direction, and measures how often moving along that direction increases a class score. **Concept bottleneck models** (Koh et al., 2020) are trained to predict human-labelled concepts first and the label only from those concepts, making the concepts intrinsic. Linear probes on language models ([[text-and-language/linguistic-structure]]) belong to this family: they ask whether part of speech, syntactic depth or truthfulness can be read linearly from a layer.

**Mechanistic interpretability**, the main subject of this course, takes the network's own computation as the thing to be explained. Olah et al. (2020), in *Zoom In: An Introduction to Circuits*, framed it with three speculative claims: that networks contain meaningful **features** (directions in activation space corresponding to properties of the input), that features are connected by weights into **circuits** that implement understandable algorithms, and that analogous features and circuits recur across models (**universality**). For Transformers, Elhage et al. (2021) supplied the mathematical framework of [[interpretability/residual-stream]], and the subsequent discoveries — induction heads, superposition, sparse dictionaries of features — fill most of this course.

::: quiz
A researcher reports that "layer 18 of the model contains a linear representation of whether a statement is true: a probe trained on it reaches $85\%$ accuracy on held-out statements". Which family of method is this, and what does the evidence establish?
- [ ] Mechanistic; it shows that the model uses its truth representation to produce its answers.
- [x] Concept-based; it shows that truth labels are linearly decodable from layer 18 on this distribution, not that the model uses that information.
- [ ] Behavioural; it shows that the model answers true/false questions correctly $85\%$ of the time.
- [ ] Attribution; it shows which tokens make a statement true.
::: solution
A probe for a human-specified concept is a concept-based method. Decodability is a statement about the information present in the activations; whether the model's later layers read that information, and in what form, needs an intervention — change the activations along the probe's direction and see whether the model's behaviour changes as predicted ([[interpretability/causal-interventions]]).
:::
:::

## Faithfulness and plausibility {#sec-faithful}

Every post-hoc explanation is a *simplification*: it replaces the network's computation with something a person can hold in mind. Two properties are then in tension. Jacovi and Goldberg (2020) named them. An explanation is **plausible** if it is convincing to a human — it fits their intuitions and is stated in familiar terms. It is **faithful** if it accurately reflects the reasoning process behind the model's prediction. Plausibility is a property of the explanation and its audience; faithfulness is a property of the explanation and the model. A plausible explanation can be entirely unfaithful (a confident story that has nothing to do with the computation), and a faithful one can be implausible (an accurate account of a messy heuristic). The danger is that evaluations based on human judgement measure plausibility, and plausibility is easy to optimise: a method that produces explanations people like is not thereby a method that produces true ones. [[reasoning/faithfulness-limits]] studies the same distinction for a model's own chain of thought.

To make faithfulness measurable, think of an explanation as a model in its own right.

::: definition Explanation, fidelity {#def-fidelity}
An **explanation** of a model $f$ on a set of inputs $S$ is a simpler model $g$ — a linear function, a decision rule, a small causal graph — together with a claim that $g$ approximates $f$ on $S$. Given a distribution $\mathcal{D}$ on $S$ and a loss $\ell$, the **infidelity** of $g$ is $\E_{x\sim\mathcal{D}}[\ell(f(x), g(x))]$; for classification with $\ell$ the 0–1 loss, the **fidelity** is $\Prob_{x\sim\mathcal{D}}[f(x) = g(x)]$. A **local** explanation at $x_0$ uses a distribution concentrated near $x_0$.
:::

This is how LIME (Ribeiro, Singh and Guestrin, 2016) works: it samples perturbations of an input, records the model's outputs, and fits a sparse linear model weighted towards nearby samples; the fitted coefficients are the explanation, and the weighted fit quality is its local fidelity. Fidelity is necessary but not sufficient. It measures agreement of *outputs*, and two very different computations can agree on outputs — a point made precise in [[#sec-mechanism]].

A local linear explanation is faithful only nearby, and the next result quantifies "nearby".

::: proposition Fidelity of a first-order explanation {#prop-local}
Let $f\colon\R^n\to\R$ be twice continuously differentiable on a ball $B$ of radius $r$ around $x_0$, with $\lVert\nabla^2 f(x)\rVert\le M$ (operator norm) for all $x\in B$. Let $g(x) = f(x_0) + \nabla f(x_0)\T(x - x_0)$ be the gradient explanation at $x_0$. Then for every $x\in B$,

$$
\lvert f(x) - g(x)\rvert \le \tfrac12 M\,\lVert x - x_0\rVert^2 \le \tfrac12 M r^2.
$$ {#eq-local}
:::

::: proof
Fix $x\in B$, put $u = x - x_0$ and $\varphi(t) = f(x_0 + tu)$ for $t\in[0,1]$; the segment lies in $B$ because a ball is convex. Then $\varphi'(t) = \nabla f(x_0+tu)\T u$ and $\varphi''(t) = u\T\nabla^2 f(x_0+tu)\,u$. Taylor's theorem with the Lagrange remainder gives $\varphi(1) = \varphi(0) + \varphi'(0) + \tfrac12\varphi''(\tau)$ for some $\tau\in(0,1)$, that is $f(x) = g(x) + \tfrac12u\T\nabla^2f(x_0+\tau u)\,u$. Since $\lvert u\T Hu\rvert\le\lVert H\rVert\,\lVert u\rVert^2$, the remainder is at most $\tfrac12M\lVert u\rVert^2\le\tfrac12Mr^2$ in absolute value.
:::

The bound explains a familiar failure. Neural networks with ReLU or saturating activations are far from linear at the scale of meaningful input changes — replacing a word, removing a sentence — so gradients describe a neighbourhood much smaller than the changes people care about. [[interpretability/probing-attribution]] returns to this with methods (integrated gradients, Shapley values) that look at the whole path or at all subsets rather than at a single point.

::: example A tangent-line explanation {#ex-tangent}
Let $f(x) = \sin x$ and explain it at $x_0 = 1$ by its tangent line. Bound and compute the error at $x = 1.5$.
::: solution
$f''(x) = -\sin x$, so $M = 1$ works everywhere, and [[#eq-local]] gives $\lvert f(1.5) - g(1.5)\rvert\le\tfrac12\cdot0.5^2 = 0.125$. Directly, $g(1.5) = \sin1 + 0.5\cos1 = 0.8415 + 0.2702 = 1.1116$ and $\sin1.5 = 0.9975$, an error of $0.1141$, close to the bound because $\lvert\sin\rvert$ is near $1$ on $[1, 1.5]$. At $x = 3$ the tangent predicts $1.9221$ against $\sin3 = 0.1411$: the "explanation" is wrong by more than the function's whole range.
:::
:::

::: widget plot
f: sin(x)
x: -1, 4.5
y: -1.5, 2.5
tangent: 1
caption: A first-order explanation is faithful only locally. Drag the point of tangency: the tangent line is the gradient explanation of $\sin x$ at that point, and its error grows quadratically with distance, as [[#prop-local]] predicts. Near a maximum the gradient is nearly zero even though the input clearly matters — the saturation problem of gradient attributions.
:::

### Measuring faithfulness without ground truth {#sec-erasure}

For attribution over input tokens a practical test of faithfulness is **erasure**: if an explanation says tokens $R$ matter, removing them should change the prediction, and keeping only them should preserve it. DeYoung et al. (2020) defined two scores for a rationale $R\subseteq x$ and predicted class $y$:

$$
\text{comprehensiveness} = p(y\mid x) - p(y\mid x\setminus R),\qquad \text{sufficiency} = p(y\mid x) - p(y\mid R).
$$ {#eq-erasure}

A faithful rationale has high comprehensiveness (removing it hurts) and low sufficiency (it alone suffices). Erasure has a known flaw: an input with words deleted is out of distribution, so the change may reflect the model's reaction to strange inputs rather than the removed information (Hooker et al., 2019, made this point for images and proposed retraining on erased inputs). Erasure tests are useful comparisons between explanation methods, not absolute measures.

::: example Comprehensiveness and sufficiency {#ex-erasure}
A sentiment classifier assigns $p(\text{positive}) = 0.92$ to a review. An attribution method highlights the three tokens "absolutely loved it". With those tokens removed, $p(\text{positive}) = 0.41$; with only those tokens, $p(\text{positive}) = 0.88$. A second method highlights three different tokens; removing them gives $0.85$ and keeping only them gives $0.30$. Compare the methods.
::: solution
Method 1: comprehensiveness $0.92 - 0.41 = 0.51$, sufficiency $0.92 - 0.88 = 0.04$. Method 2: comprehensiveness $0.92 - 0.85 = 0.07$, sufficiency $0.92 - 0.30 = 0.62$. Method 1's rationale is both necessary-looking and sufficient-looking; method 2's is neither. By the erasure test, method 1 is more faithful for this prediction — subject to the caveat that both tests feed the model unnatural inputs.
:::
:::

## Evaluating explanations {#sec-evaluate}

Doshi-Velez and Kim (2017), in *Towards a Rigorous Science of Interpretable Machine Learning*, proposed three levels of evaluation, in decreasing cost and realism.

- **Application-grounded** evaluation tests explanations with real users on the real task — do radiologists using the explanations make better diagnoses? It is the most convincing and the most expensive.
- **Human-grounded** evaluation uses lay people on simplified tasks — can a participant, shown an explanation, predict what the model will output on a new input (*forward simulation*), or what change to the input would change the output (*counterfactual simulation*)?
- **Functionally-grounded** evaluation uses no people: it measures a formal proxy, such as the sparsity of an explanation, its fidelity ([[#def-fidelity]]) or its erasure scores ([[#eq-erasure]]), justified by earlier human studies that showed the proxy matters.

Human-grounded tests of *forward simulation* measure something close to what we want from an explanation — that it lets people predict the model — and they have produced sobering results. Hase and Bansal (2020) found that few of the attribution methods they tested measurably improved participants' ability to simulate a model, and Adebayo et al. (2018), in *Sanity Checks for Saliency Maps*, showed that some popular saliency methods produce nearly the same maps for a trained network and for one with randomised weights — maps that look plausible while carrying little information about the model. Functionally-grounded proxies are cheap, but each one can be gamed by a method designed for it.

::: example Uncertainty in a fidelity estimate {#ex-fidelity}
A decision-rule explanation of a classifier is checked on $1000$ inputs drawn from the deployment distribution, and agrees with the classifier on $920$ of them. Estimate the fidelity with a standard error, and say what the number does and does not establish.
::: solution
$\hat F = 0.92$, with standard error $\sqrt{0.92\cdot0.08/1000} = 0.0086$, so an approximate $95\%$ interval is $0.92\pm0.017$, about $[0.903, 0.937]$. This establishes that the rule predicts the classifier's outputs on about nine inputs in ten from this distribution. It does not establish that the classifier computes anything like the rule: a classifier using a different feature correlated with the rule's feature on this distribution would show the same fidelity and diverge under distribution shift — exactly the transferability concern of [[#sec-why]].
:::
:::

## Mechanistic explanation as causal abstraction {#sec-mechanism}

Mechanistic interpretability makes a stronger claim than fidelity. It says not only that a simple model $g$ predicts $f$'s outputs, but that $f$ *computes the same intermediate variables as* $g$, and that they are stored in identifiable places in $f$'s activations. Marr's three levels of analysis (1982) give useful vocabulary: the **computational** level says what problem is solved, the **algorithmic** level which representations and steps solve it, and the **implementational** level how those are realised physically — here, in weights and activations. Behavioural analysis works at the computational level; mechanistic interpretability tries to connect the algorithmic level to the implementational one.

The claim can be tested by intervention. Geiger, Lu, Icard and Potts (2021) formalised it as **causal abstraction**: a high-level causal model $\mathcal{H}$ (a small program with named variables) is an abstraction of the network if each high-level variable can be *aligned* with a set of activations such that intervening on those activations has the same effect on the output as intervening on the variable in $\mathcal{H}$.

::: definition Interchange intervention accuracy {#def-iia}
Let $\mathcal{H}$ be a high-level model with an intermediate variable $A$, and let the network $f$ have activations $a(x)$. An **alignment** maps $A$ to a function $\pi$ that reads a value from the activations and an operation that writes a value into them. An **interchange intervention** on a base input $b$ with source input $s$ runs $f$ on $b$, but replaces the aligned part of $a(b)$ by its value on $s$; call the output $f_{A\leftarrow s}(b)$. The corresponding high-level intervention runs $\mathcal{H}$ on $b$ with $A$ set to its value on $s$, giving $\mathcal{H}_{A\leftarrow s}(b)$. The **interchange intervention accuracy** (IIA) of the alignment on a set of pairs $P$ is
$$
\operatorname{IIA} = \frac{1}{\lvert P\rvert}\sum_{(b,s)\in P}\mathbf{1}\bigl[f_{A\leftarrow s}(b) = \mathcal{H}_{A\leftarrow s}(b)\bigr].
$$
:::

Causal abstraction and its relatives — activation patching, causal scrubbing — are developed in [[interpretability/causal-interventions]]. The key logical fact is already visible.

::: proposition Interventional agreement implies behavioural agreement, not conversely {#prop-iia}
If an alignment has $\operatorname{IIA} = 1$ on a set of pairs that includes $(x, x)$ for every input $x$ in $S$, then $f(x) = \mathcal{H}(x)$ for all $x\in S$. The converse is false: there are networks with $f = \mathcal{H}$ on every input for which some natural alignment has $\operatorname{IIA} < 1$.
:::

::: proof
For a pair $(x, x)$ the interchange intervention replaces the aligned activations by their own values, so $f_{A\leftarrow x}(x) = f(x)$; likewise setting $A$ to its own value leaves $\mathcal{H}$ unchanged, so $\mathcal{H}_{A\leftarrow x}(x) = \mathcal{H}(x)$. $\operatorname{IIA} = 1$ requires these to agree for every such pair. For the converse, the network of [[#sec-code]] computes $(x_1\wedge x_2)\vee x_3$ correctly on all eight inputs, so it agrees behaviourally with $\mathcal{H}$, but the alignment of $A = x_1\wedge x_2$ with a single hidden neuron has $\operatorname{IIA} = 55/64 < 1$.
:::

The proposition is the formal version of the warning that runs through the course: a story that predicts outputs is not thereby a story about the mechanism. It also suggests what a mechanistic explanation must include — not just "the model computes $A$", but *where*, in a form that can be overwritten.

::: example A failed interchange by hand {#ex-interchange}
In the network of [[#sec-code]], the hidden layer is $\mathbf{h} = \bigl(c\,a - s\,b,\ s\,a + c\,b\bigr)$ with $a = \operatorname{ReLU}(x_1 + x_2 - 1)$, $b = x_3$, $c = \cos30^\circ$, $s = \sin30^\circ$; the readout recovers $a' = c h_1 + s h_2$, $b' = -s h_1 + c h_2$ and outputs $1$ if $a' + b' > 0.5$. Take base $(0,0,0)$ and source $(1,1,0)$, and align $A$ with neuron $h_1$. What does the interchange intervention give, and what does $\mathcal{H}$ predict?
::: solution
On the base, $\mathbf{h} = (0, 0)$; on the source, $a = 1$, $b = 0$, so $\mathbf{h} = (c, s) = (0.866, 0.5)$. Patching neuron $h_1$ gives $\mathbf{h} = (0.866, 0)$, so $a' = c\cdot0.866 = 0.75$ and $b' = -s\cdot0.866 = -0.433$; $a' + b' = 0.317 < 0.5$ and the network outputs $0$. The high-level model, with $A$ set to its source value $1$, outputs $1\vee0 = 1$. The intervention disagrees: neuron $h_1$ carries part of $A$ mixed with part of $x_3$, so copying it transplants the wrong thing. Patching instead along the direction $(c, s)$, which the readout uses for $a'$, transplants exactly $A$, and agrees on all $64$ pairs.
:::
:::

The example anticipates two large themes. Variables need not align with neurons — they can be **directions** in activation space, which is why [[interpretability/superposition]] and [[interpretability/sparse-features]] look for features as directions rather than units. And an alignment can be searched for: *distributed alignment search* (Geiger et al., 2024) learns a rotation of the activation space in which the high-level variable becomes a coordinate.

::: warning A plausible story is not a mechanism
It is easy to find a neuron or head whose activations correlate with something meaningful, read its top-activating examples, and tell a story. Such stories are often wrong or incomplete. Bolukbasi et al. (2021) described an **interpretability illusion** in BERT: a single direction appeared to encode a clean concept when examined on one dataset and a different clean concept on another, because the top-activating examples reflect the dataset as much as the direction. Correlation with a concept, a striking visualisation or a convincing top-$k$ list is a hypothesis; evidence comes from interventions that change the behaviour as predicted, from predicting activations on new inputs, and from looking for counterexamples.
:::

## Pragmatic and ambitious goals {#sec-goals}

Researchers disagree, as of 2026, about what interpretability should aim for, and the disagreement shapes the methods they use.

The **ambitious** or **enumerative** view, associated with much of the circuits work at Anthropic and elsewhere, aims at something like a complete reverse-engineering: identify the features a model represents and the circuits that compute with them, well enough that its behaviour on a task can be explained from the bottom up. Its proponents point to successes on small models and specific behaviours — induction heads, modular addition, indirect-object identification — and to the scaling of sparse dictionaries to production models, and argue that only an understanding of this kind could give guarantees about behaviour on untested inputs.

A more **pragmatic** view holds that complete understanding of a large model may be unattainable, and that interpretability should be judged by whether it helps with concrete downstream tasks — detecting deception, auditing a model for a hidden objective, debugging a failure, steering behaviour — better than non-interpretability baselines. Some researchers who once worked on the ambitious programme have argued publicly for this shift (for example, the Google DeepMind mechanistic interpretability team wrote in 2025 that they were deprioritising fundamental sparse-autoencoder research after finding SAEs underperformed simple baselines on a downstream task they cared about; [[interpretability/sparse-features]]). Others argue that top-down methods — **representation engineering** (Zou et al., 2023), which studies population-level directions such as honesty without decomposing them into circuits — offer a more tractable unit of analysis.

A third line of criticism questions whether internal explanations add safety value beyond what careful behavioural evaluation provides, or whether they risk false reassurance when an explanation is incomplete. Defenders reply that behavioural evaluation and interpretability fail in different ways, so they complement each other. [[interpretability/open-problems]] returns to these positions with the evidence available as of 2026. The chapters in between present the methods on which all sides draw.

## A numerical laboratory {#sec-code}

The listing builds the network of [[#ex-interchange]] by hand — it computes $(x_1\wedge x_2)\vee x_3$ but stores the AND in a rotated basis — and compares three kinds of evidence: behavioural agreement with the high-level model, interchange intervention accuracy for three alignments, and gradient attributions.

```python
import itertools, math

def relu(z): return max(0.0, z)
def sig(z): return 1 / (1 + math.exp(-z))

# A tiny network computing (x1 AND x2) OR x3, with the AND stored in a rotated
# basis: each of its two hidden neurons mixes both intermediate variables.
c, s = math.cos(math.pi / 6), math.sin(math.pi / 6)
def hidden(x):
    a = relu(x[0] + x[1] - 1)                  # the AND variable
    b = x[2]                                   # the x3 variable
    return [c * a - s * b, s * a + c * b]      # rotate into two neurons
def readout(h):
    a = c * h[0] + s * h[1]                    # undo the rotation
    b = -s * h[0] + c * h[1]
    return sig(6 * (a + b) - 3)
def model(x): return readout(hidden(x))

inputs = list(itertools.product([0, 1], repeat=3))
def high(x, A=None):                           # the high-level causal model H
    A = (x[0] and x[1]) if A is None else A
    return int(A or x[2])

agree = sum((model(x) > 0.5) == high(x) for x in inputs)
print("behavioural agreement:", agree, "/", len(inputs))

def iia(get, put, hyp_A):
    """interchange intervention accuracy over all 64 (base, source) pairs"""
    ok = 0
    pairs = list(itertools.product(inputs, repeat=2))
    for b, src in pairs:
        h = put(hidden(b), get(hidden(src)))   # overwrite the aligned part
        ok += int(readout(h) > 0.5) == high(b, A=hyp_A(src))
    return ok / len(pairs)

def get_dir(h): return c * h[0] + s * h[1]     # read along the AND direction
def put_dir(h, v):
    d = v - get_dir(h)
    return [h[0] + d * c, h[1] + d * s]
def get_n0(h): return h[0]
def put_n0(h, v): return [v, h[1]]
AND = lambda x: x[0] and x[1]
X1 = lambda x: x[0]
print("IIA, A = AND at the AND direction:", round(iia(get_dir, put_dir, AND), 3))
print("IIA, A = AND at neuron 0         :", round(iia(get_n0, put_n0, AND), 3))
print("IIA, A = x1  at the AND direction:", round(iia(get_dir, put_dir, X1), 3))

def grad(x, eps=1e-6):                         # finite-difference gradient
    g = []
    for i in range(3):
        xp = list(x); xp[i] += eps
        g.append((model(xp) - model(x)) / eps)
    return g
for x in [(1, 1, 0), (1, 1, 1)]:
    print("input", x, "output %.4f" % model(x), "gradient", [round(v, 4) for v in grad(x)])
```

```text
behavioural agreement: 8 / 8
IIA, A = AND at the AND direction: 1.0
IIA, A = AND at neuron 0         : 0.859
IIA, A = x1  at the AND direction: 0.875
input (1, 1, 0) output 0.9526 gradient [0.2711, 0.2711, 0.2711]
input (1, 1, 1) output 0.9999 gradient [0.0007, 0.0007, 0.0007]
```

Behaviourally the network is indistinguishable from $\mathcal{H}$. The interventional test separates three hypotheses that behaviour cannot: the AND variable *lives along a direction* (IIA $1$), not in neuron $0$ (IIA $55/64 = 0.859$); and the direction stores $x_1\wedge x_2$, not $x_1$ (IIA $56/64 = 0.875$ — a wrong hypothesis can still score well, because it agrees with the right one on most pairs, which is why IIA is compared across hypotheses rather than read as an absolute grade). The gradients illustrate saturation: on $(1,1,1)$, where both routes to the output are active, each input has gradient $0.0007$, although $x_3$ alone or $x_1, x_2$ together would each determine the output. The gradient says how the output changes for *tiny* changes, which is not the question "which inputs matter?".

::: history
Interpretable models are as old as statistics: linear regression coefficients and decision rules were designed to be read. Explanations of expert systems (MYCIN, in the 1970s) and of neural networks by rule extraction (Andrews, Diederich and Tickle, 1995) followed. For deep networks, visualisation of convolutional features (Erhan et al., 2009; Zeiler and Fergus, 2014) and saliency maps (Simonyan, Vedaldi and Zisserman, 2014) opened the modern field; LIME (Ribeiro et al., 2016), integrated gradients (Sundararajan et al., 2017) and SHAP (Lundberg and Lee, 2017) became standard attribution tools. Doshi-Velez and Kim (2017) and Lipton (2016; journal version 2018) analysed what interpretability is for and how to evaluate it; Kim et al. (2018) introduced TCAV, Adebayo et al. (2018) sanity checks for saliency, and Jacovi and Goldberg (2020) the faithfulness–plausibility distinction. Olah and colleagues' *Distill* articles on feature visualisation (2017) and circuits (2020) founded mechanistic interpretability for vision models, and the Transformer Circuits Thread (from 2021) carried it to language models. Geiger and colleagues (2021 onwards) developed causal abstraction as a formal account of mechanistic explanation. Molnar's book *Interpretable Machine Learning* (first edition 2019, second 2022) collected the attribution methods for practitioners.
:::

::: summary
- Interpretability is wanted for **trust, causality, transferability, informativeness, fairness** (Lipton, 2018) and, for language models, **safety**. Large models are not transparent, so their explanations are post-hoc.
- Methods are **behavioural** (input–output tests), **attributional** (credit to inputs or units), **concept-based** (probes, concept vectors) or **mechanistic** (features, circuits, verified by intervention); explanations are local or global, intrinsic or post-hoc.
- **Plausible** (convincing) and **faithful** (accurate to the computation) are different properties (Jacovi and Goldberg, 2020). Fidelity measures agreement of a surrogate with the model; a first-order explanation's error grows like $\tfrac12M\lVert x - x_0\rVert^2$.
- Evaluations are **application-grounded**, **human-grounded** or **functionally-grounded** (Doshi-Velez and Kim, 2017); erasure scores (comprehensiveness, sufficiency) are useful but use out-of-distribution inputs.
- A mechanistic explanation is a **causal abstraction**: its variables must be located so that **interchange interventions** behave as the high-level model predicts. Interventional agreement implies behavioural agreement, not conversely, and variables may be directions rather than neurons.
- The field disagrees about aims — complete reverse-engineering versus pragmatic usefulness on downstream tasks — and about how much safety value internal explanations add.
:::

## Exercises

::: exercise Counting units {level=1 check="98304"}
A model has $24$ layers, each with $16$ attention heads and a feed-forward layer of width $4096$, and residual dimension $1024$. How many attention heads and how many feed-forward neurons does it have in total? Give the number of neurons as the answer.
::: solution
Heads: $24\times16 = 384$. Neurons: $24\times4096 = 98{,}304$.
:::
:::

::: exercise Error of a tangent explanation {level=1 check="0.031"}
Explain $f(x) = x^3$ at $x_0 = 1$ by its tangent line. What is the exact error of the explanation at $x = 1.1$? Compare with the bound of [[#prop-local]] using $M = \max_{[1,1.1]}\lvert f''\rvert$.
::: solution
The tangent is $g(x) = 1 + 3(x - 1)$, so $g(1.1) = 1.3$ while $f(1.1) = 1.331$: the error is $0.031$. With $f''(x) = 6x$, $M = 6.6$ on $[1, 1.1]$ and the bound is $\tfrac12\cdot6.6\cdot0.01 = 0.033$, just above the true error.
:::
:::

::: exercise Erasure scores {level=1}
A topic classifier gives $p(\text{sport}) = 0.80$. Removing an attribution method's top five tokens gives $0.20$; keeping only them gives $0.75$. Compute comprehensiveness and sufficiency, and say whether they support the explanation.
::: solution
Comprehensiveness $0.80 - 0.20 = 0.60$; sufficiency $0.80 - 0.75 = 0.05$. Removing the tokens destroys most of the prediction and keeping only them nearly preserves it, so both scores support the explanation — with the caveat that both conditions are unnatural inputs, so the scores are best used to compare methods.
:::
:::

::: exercise Classifying methods {level=2}
Classify each as behavioural, attributional, concept-based or mechanistic, and as local or global: (a) measuring accuracy on subject–verb agreement across relative clauses; (b) a saliency map for one translation; (c) training a probe for syntactic depth on every layer; (d) showing that ablating two attention heads stops a model completing repeated sequences, and explaining how their weights implement copying; (e) LIME on one loan decision.
::: solution
(a) Behavioural, global (a property of behaviour over a distribution). (b) Attributional, local. (c) Concept-based, global (decodability over a dataset). (d) Mechanistic, global — an intervention plus an account of the weights ([[interpretability/circuits]]). (e) Attributional (a local surrogate model), local.
:::
:::

::: exercise Which desideratum? {level=2}
For each scenario, name Lipton's desideratum that best describes what is wanted and suggest a suitable kind of evaluation from Doshi-Velez and Kim: (a) a bank must tell an applicant why a loan was refused; (b) a developer wants to know whether a toxicity classifier will still work on a new dialect; (c) a lab wants to know whether its model's refusals rely on an internal representation of harm or on surface keywords.
::: solution
(a) Fair and ethical decision-making (contestability), with application-grounded evaluation — can applicants and reviewers use the explanation to contest errors? (b) Transferability; functionally-grounded tests on the new dialect, plus checks that the explanation identifies dialect-sensitive features. (c) Transferability and safety; a mechanistic or concept-based study verified by interventions — e.g. changing keywords while holding meaning fixed, and vice versa, and patching internal representations ([[interpretability/causal-interventions]]).
:::
:::

::: exercise A second neuron {level=2 check="37/64"}
In the laboratory network, align $A = x_1\wedge x_2$ with neuron $h_2$ (index $1$) instead of $h_1$. Modify the listing and report the IIA as a fraction of the $64$ pairs. Why is it lower than for $h_1$?
::: solution
Add `def get_n1(h): return h[1]` and `def put_n1(h, v): return [h[0], v]`, and call `iia(get_n1, put_n1, AND)`; it prints $0.578 = 37/64$. Neuron $h_2 = s\,a + c\,b$ has weight $c = 0.866$ on $b = x_3$ and only $s = 0.5$ on $a$, so copying it mostly transplants $x_3$; neuron $h_1 = c\,a - s\,b$ is dominated by $a$, so its patches agree more often.
:::
:::

::: exercise Interventions and behaviour {level=3}
Prove that if an alignment of a variable $A$ has $\operatorname{IIA} = 1$ on all pairs from $S\times S$, then for any two inputs $b, s$ with the same value of $A$ under $\mathcal{H}$, the network's output on $b$ is unchanged by patching the aligned activations from $s$. Give an example showing that the network may nevertheless store different activation values for $b$ and $s$ at the aligned location.
::: solution
If $A(b) = A(s)$ in $\mathcal{H}$, then setting $A$ to its value on $s$ leaves $\mathcal{H}$'s computation on $b$ unchanged: $\mathcal{H}_{A\leftarrow s}(b) = \mathcal{H}(b)$. $\operatorname{IIA} = 1$ gives $f_{A\leftarrow s}(b) = \mathcal{H}_{A\leftarrow s}(b)$ and (with the pair $(b, b)$) $f(b) = \mathcal{H}(b)$, so $f_{A\leftarrow s}(b) = f(b)$. For the example, let the aligned quantity be a scalar $v$ and the readout threshold $v > 0.5$; inputs with $A = 1$ might give $v = 0.9$ or $v = 1.3$, and both pass the threshold. The alignment is correct at the level of the output, though the activation also carries extra information (here, magnitude) that the high-level model does not mention. Abstraction is a claim about what matters for downstream computation, not that the activation equals the variable.
:::
:::

::: exercise Why not single neurons? {level=3}
In the laboratory network, show that *no* alignment of $A$ with a single neuron can reach $\operatorname{IIA} = 1$, while the alignment with the direction $(c, s)$ does. More generally, suppose a layer stores two binary variables $a, b$ as $\mathbf{h} = a\,\mathbf{u} + b\,\mathbf{v}$ with $\mathbf{u}, \mathbf{v}$ linearly independent and a readout that recovers $a$ and $b$ exactly. When does patching a single neuron implement a clean intervention on $a$?
::: solution
[[#ex-interchange]] gives a pair on which patching $h_1$ fails, and the exercise above gives $\operatorname{IIA} = 37/64$ for $h_2$, so neither neuron achieves $1$. Patching along $(c, s)$ changes $c h_1 + s h_2 = a'$ to its source value and, since $(c, s)$ is orthogonal to $(-s, c)$, leaves $b'$ unchanged; the readout then computes exactly $A_{\text{src}}\vee x_3$, so every pair agrees. In general, patching coordinate $i$ from source to base changes $h_i$ by $(a_s - a_b)u_i + (b_s - b_b)v_i$. For this to be a pure change of $a$, with $b$ untouched and the change to $a$ fully transplanted, the patched coordinate must carry $a$ and nothing else that the readout uses: $v_i = 0$, and the readout of $a$ must depend on $\mathbf{h}$ only through coordinate $i$ (otherwise the other coordinates, still from the base, retain part of $a_b$). Both hold only when the variable is aligned with a neuron — a "privileged basis". When a representation is rotated, as in this network or as superposition makes likely ([[interpretability/superposition]]), neuron-level interventions are mixtures, and variables must be sought as directions.
:::
:::

::: exercise Plausibility versus faithfulness in practice {level=2}
An explanation method for a language model produces, for each answer, a highlighted set of input words. A user study finds that participants rate the highlights as "very helpful" $80\%$ of the time. Explain why this result does not establish faithfulness, and design a functionally-grounded test and a human-grounded test that would bear on it.
::: solution
Ratings measure plausibility: participants judge whether the highlights look reasonable, which a method could achieve by highlighting words people expect (e.g. sentiment words) regardless of the model's computation. A functionally-grounded test: compute comprehensiveness and sufficiency ([[#eq-erasure]]) for the method and for a random-highlight baseline of the same size, and check that the method's highlights are reliably more necessary and sufficient; add the model-randomisation sanity check of Adebayo et al. (2018) — the highlights should change when the model's weights are randomised. A human-grounded test: forward simulation — show participants explanations for some inputs, then ask them to predict the model's output on new inputs, comparing groups with and without explanations (Hase and Bansal, 2020); a faithful and useful method should improve prediction accuracy, including on inputs where the model is wrong.
:::
:::
