The cheapest questions to ask about a network are of two kinds. **What information is present in this layer?** — answered by training a small classifier, a *probe*, to read a property off the activations. **Which inputs mattered for this output?** — answered by an *attribution* method that assigns each input a share of credit. Both kinds of method are widely used on language models, both are easy to run, and both are easy to over-interpret. A probe can succeed because it learned the task itself; an attribution can be zero for an input that obviously matters; and attention weights, the most tempting attribution of all, answer a different question from the one usually asked of them.

This chapter develops the two families with their pitfalls. It defines linear probes, the **control tasks** and **selectivity** of Hewitt and Liang (2019), and the distinction between information being decodable and being used. It then treats gradient-based attribution — saliency, gradient × input — and its failure under saturation, and derives **integrated gradients** (Sundararajan, Taly and Yan, 2017) from its axioms, proving the completeness property. It states the axioms that characterise **Shapley values** and SHAP, compares the methods on examples where they disagree, and reviews the debate over whether attention is explanation. It ends with the **logit lens** and the **tuned lens**, probes that read a model's intermediate predictions in its own output vocabulary, which lead into the residual-stream view of [[interpretability/residual-stream]].

## Probes {#sec-probes}

Let a model map an input sequence to activations, and let $\mathbf{h}\in\R^d$ be the activation at one position and one layer — a residual-stream vector, say. Suppose each position carries a label $y$ of a property we care about: its part of speech, whether the sentence is true, the depth of the word in the parse tree.

::: definition Probe {#def-probe}
A **probe** for a property $y\in\{1,\dots,K\}$ at a given layer is a classifier $g_\phi$ trained, with the model frozen, to predict $y$ from the activation $\mathbf{h}$. A **linear probe** is multinomial logistic regression, $g_\phi(\mathbf{h}) = \operatorname{softmax}(W\mathbf{h} + \mathbf{b})$ with $W\in\R^{K\times d}$; its **probe accuracy** is measured on held-out examples.
:::

Alain and Bengio (2016) introduced linear probes to see how linearly separable the classes of an image classifier become layer by layer. In language models, probing became the main tool for asking where syntax, semantics and world knowledge are represented ([[text-and-language/linguistic-structure]] summarises the early findings: part of speech is decodable in lower layers of BERT, syntactic relations in middle ones, coreference higher). More recent probes look for properties with safety relevance: truth of statements (Marks and Tegmark, 2023, "The Geometry of Truth"), and whether the model "knows" an answer is wrong.

Two questions immediately arise. *How powerful should the probe be?* A more expressive probe extracts more of whatever information is present, so it gives a better estimate of what is there; but it can also learn the task itself from features that have nothing to do with the property. And *what does success show?* Decodable information may never be read by the model.

::: example How big is a probe? {#ex-probe-size}
A linear probe for $45$ part-of-speech tags on the residual stream of a model with $d = 4096$ is trained on $50{,}000$ tokens. How many parameters does it have, and why does this matter for interpretation?
::: solution
$W$ has $45\times4096 = 184{,}320$ entries and $\mathbf{b}$ has $45$: $184{,}365$ parameters, more than three per training token. In $4096$ dimensions, $50{,}000$ points in general position can be split in a great many ways by hyperplanes, so a linear probe has capacity to fit labels that are only weakly related to linear structure — especially if the activation identifies the word type, from which the tag can be memorised. High accuracy alone does not distinguish "the layer encodes part of speech" from "the layer encodes word identity, and the probe memorised which words are nouns".
:::
:::

### Control tasks and selectivity {#sec-control}

Hewitt and Liang (2019) proposed a direct test of this confound. A **control task** keeps the structure of the inputs but replaces the property with a random one that can only be learned by memorisation.

::: definition Control task and selectivity {#def-selectivity}
Given a probing task that assigns labels to tokens, a **control task** assigns each *word type* a label drawn at random (with the same label distribution) and gives every token of that type the same label. A probe can perform well on the control task only by memorising the mapping from word identity to label, since the labels carry no linguistic information. The **selectivity** of a probe is
$$
\text{selectivity} = \text{accuracy on the task} - \text{accuracy on the control task}.
$$
:::

A probe with high task accuracy and high selectivity is reading the property from the representation; one with high task accuracy and low selectivity may be memorising. Hewitt and Liang found that multilayer-perceptron probes on ELMo representations achieved high part-of-speech accuracy but low selectivity, and that linear or rank-constrained probes, or heavily regularised MLPs, had nearly the same task accuracy with much higher selectivity. They also found that dropout, the standard regulariser, did not reliably improve selectivity. They recommended reporting selectivity and preferring simple probes.

The argument has a counterpoint. Pimentel et al. (2020) argued from information theory that the goal of probing — estimating how much information about $y$ is in $\mathbf{h}$ — calls for the *best* probe available, because any deterministic function of $\mathbf{h}$ (including the model's own later layers) cannot increase the information, so a weaker probe merely underestimates it; on this view the real question is a comparison, such as how much more information a layer holds than a baseline representation. Voita and Titov (2020) proposed measuring the **minimum description length** of the labels given the representations, which rewards probes that learn from little data. The positions are compatible once the question is made precise: an information-theoretic probe estimates *what is present*; a simple, selective probe asks whether the property is present in an *easily accessible* — typically linear — form.

The laboratory in [[#sec-code]] reproduces the effect on synthetic data: $60$ word types, each represented by a random vector plus noise, with a three-class property weakly encoded in the type vectors.

::: example Reading selectivity {#ex-selectivity}
In the simulation of [[#sec-code]], a linear probe reaches task accuracy $0.817$ and control accuracy $0.588$; an MLP probe with $64$ hidden units reaches $0.983$ and $0.963$. Compute the selectivities and interpret.
::: solution
Linear: $0.817 - 0.588 = 0.229$. MLP: $0.983 - 0.963 = 0.021$. The MLP probe is "better" at the task by $17$ points, but it is almost equally good at the control task, whose labels are random per word type: its accuracy reflects its ability to identify word types from their vectors and memorise labels, not a linear encoding of the property. The linear probe's lower task accuracy comes with substantial selectivity. Note that even the linear probe's control accuracy is well above chance ($1/3$), because $60$ random type vectors in $16$ dimensions are partly linearly separable — the confound is present at every capacity and must be measured, not assumed away.
:::
:::

### Decodable is not used {#sec-used}

A probe shows that information can be read from $\mathbf{h}$ by the probe. It does not show that the model reads it. The cleanest tests intervene. **Amnesic probing** (Elazar et al., 2021) removes a property from the representation with iterative nullspace projection — repeatedly training a linear probe and projecting the representation onto the nullspace of its weights (Ravfogel et al., 2020) — and measures how much the model's language-modelling behaviour degrades; a property that can be decoded but whose removal changes nothing is not used, at least not linearly. Other studies move the representation along a probe's direction and check that the output changes as predicted, which is the topic of [[interpretability/causal-interventions]]. Probes trained **without labels** form a further variant: Burns et al. (2022) found directions satisfying a logical consistency condition (a statement and its negation should get complementary probabilities), and follow-up work debated how much of what such methods find is truth rather than other salient features (Farquhar et al., 2023).

::: warning Probe accuracy is not a property of the model alone
Probe accuracy depends on the probe's capacity, the training set size, the label distribution, the dataset (which may contain shortcuts) and the layer. Report a baseline — the same probe on a randomly initialised model, on the embedding layer, and on a control task — and treat a high number as evidence that information is *available*, not that the model *uses* it, nor that it is stored in the probe's direction rather than in a direction correlated with it on the probing dataset.
:::

## Gradient-based attribution {#sec-gradients}

Attribution asks which inputs mattered for one output. Let $F\colon\R^n\to\R$ be a scalar output of the model — the logit or log-probability of the predicted token — viewed as a function of an input vector $\mathbf{x}$. For text, $\mathbf{x}$ is the concatenation of input token embeddings, and an attribution to a token is the sum of the attributions to its embedding coordinates.

::: definition Saliency and gradient × input {#def-saliency}
The **saliency** (Simonyan, Vedaldi and Zisserman, 2014) of input $i$ is $\lvert\partial F/\partial x_i\rvert$ evaluated at $\mathbf{x}$. **Gradient × input** (Shrikumar et al., 2016) attributes $x_i\,\partial F/\partial x_i$ to input $i$.
:::

Saliency measures sensitivity: how much the output would change for an infinitesimal change of the input. Gradient × input scales this by the input's size, and for a linear model it is exact.

::: proposition Attribution of a linear model {#prop-linear}
If $F(\mathbf{x}) = \mathbf{w}\T\mathbf{x} + c$, then gradient × input gives $w_ix_i$ to input $i$, and $\sum_i w_ix_i = F(\mathbf{x}) - F(\mathbf{0})$: the attributions account exactly for the difference between the output and the output at the zero input.
:::

::: proof
$\partial F/\partial x_i = w_i$ everywhere, so the attribution is $w_ix_i$, and $\sum_iw_ix_i = \mathbf{w}\T\mathbf{x} = F(\mathbf{x}) - c = F(\mathbf{x}) - F(\mathbf{0})$.
:::

Neural networks are not linear, and the bound of [[interpretability/interpretability-goals#prop-local]] says how fast a gradient explanation decays. The sharpest failure is **saturation**. Consider $F(x_1, x_2) = 1 - \operatorname{ReLU}(1 - x_1 - x_2)$, the example used by Sundararajan et al. At $\mathbf{x} = (1, 1)$ we have $x_1 + x_2 = 2 > 1$, so $F$ is constant ($F = 1$) near $\mathbf{x}$ and both gradients are zero. Yet $F(\mathbf{0}) = 0$: the inputs together moved the output from $0$ to $1$, and the gradient assigns that change to nobody. Saturating non-linearities — sigmoids, softmax probabilities near $1$, attention patterns that have committed to one token — make this common.

## Integrated gradients {#sec-ig}

Sundararajan, Taly and Yan (2017) proposed to look not only at the input but at the whole straight path from a **baseline** $\mathbf{x}'$ — an input meant to carry no information, such as the zero embedding or a padding token — to $\mathbf{x}$.

::: definition Integrated gradients {#def-ig}
Let $F$ be differentiable almost everywhere along the segment from $\mathbf{x}'$ to $\mathbf{x}$. The **integrated gradient** of input $i$ is
$$
\operatorname{IG}_i(\mathbf{x}) = (x_i - x'_i)\int_0^1\frac{\partial F}{\partial x_i}\bigl(\mathbf{x}' + t(\mathbf{x} - \mathbf{x}')\bigr)\,dt.
$$ {#eq-ig}
:::

They motivated the method by two axioms that gradient-based methods often fail. **Sensitivity (a)**: if $\mathbf{x}$ and $\mathbf{x}'$ differ in one feature and $F(\mathbf{x})\ne F(\mathbf{x}')$, that feature must get non-zero attribution — the saturation example violates this for gradient × input. **Implementation invariance**: two networks that compute the same function must get the same attributions — methods that propagate modified gradients through the network's layers, such as some variants of layer-wise relevance propagation and DeepLIFT, can violate it. Integrated gradients is defined from the function alone, so it is implementation invariant, and it satisfies sensitivity because of the following property.

::: theorem Completeness of integrated gradients {#thm-completeness}
Let $\gamma(t) = \mathbf{x}' + t(\mathbf{x} - \mathbf{x}')$ and suppose $F\circ\gamma$ is absolutely continuous on $[0,1]$ — for instance, $F$ continuously differentiable, or continuous and piecewise continuously differentiable along $\gamma$ with finitely many pieces, as for a ReLU network along a generic segment. Then
$$
\sum_{i=1}^n\operatorname{IG}_i(\mathbf{x}) = F(\mathbf{x}) - F(\mathbf{x}').
$$ {#eq-complete}
:::

::: proof
Put $\varphi(t) = F(\gamma(t))$. Wherever $F$ is differentiable at $\gamma(t)$, the chain rule gives $\varphi'(t) = \nabla F(\gamma(t))\T\gamma'(t) = \sum_i\frac{\partial F}{\partial x_i}(\gamma(t))\,(x_i - x'_i)$, and by hypothesis this holds for almost every $t$. Since $\varphi$ is absolutely continuous, the fundamental theorem of calculus for Lebesgue integrals gives $\varphi(1) - \varphi(0) = \int_0^1\varphi'(t)\,dt$. Substituting and exchanging the finite sum with the integral,
$$
F(\mathbf{x}) - F(\mathbf{x}') = \sum_i(x_i - x'_i)\int_0^1\frac{\partial F}{\partial x_i}(\gamma(t))\,dt = \sum_i\operatorname{IG}_i(\mathbf{x}).
$$
(In the piecewise case one can avoid measure theory: apply the ordinary fundamental theorem on each of the finitely many intervals where $\varphi$ is continuously differentiable and add, using the continuity of $\varphi$ at the break points.)
:::

Sensitivity (a) follows: if $\mathbf{x}$ and $\mathbf{x}'$ differ only in feature $i$, every other term of the sum is zero because $x_j - x'_j = 0$, so $\operatorname{IG}_i = F(\mathbf{x}) - F(\mathbf{x}')\ne0$.

::: example Integrated gradients on a saturated unit {#ex-ig-sat}
Compute integrated gradients for $F(x_1, x_2) = 1 - \operatorname{ReLU}(1 - x_1 - x_2)$ at $\mathbf{x} = (1,1)$ with baseline $\mathbf{0}$, and check completeness.
::: solution
Along $\gamma(t) = (t, t)$, $x_1 + x_2 = 2t$. For $t < \tfrac12$, $F = 2t$ and $\partial F/\partial x_1 = 1$; for $t > \tfrac12$, $F = 1$ and the partial derivative is $0$. So $\int_0^1\partial F/\partial x_1\,dt = \tfrac12$ and $\operatorname{IG}_1 = (1 - 0)\cdot\tfrac12 = \tfrac12$; by symmetry $\operatorname{IG}_2 = \tfrac12$. The sum is $1 = F(1,1) - F(0,0)$. Gradient × input gave $(0, 0)$.
:::
:::

In practice the integral is approximated by a Riemann sum of $m$ gradient evaluations — Sundararajan et al. suggested $20$ to $300$ steps, checking that the attributions add up to within a few per cent of $F(\mathbf{x}) - F(\mathbf{x}')$ — so integrated gradients costs about $m$ backward passes.

The figure shows the one-dimensional picture behind the theorem. With a single input and a sigmoid output, the integrated gradient is the area under the derivative along the path, and it equals the total change of $F$ even when the derivative at the input itself is negligible.

::: widget plot
f: k*exp(-k*(x-0.5))/(1+exp(-k*(x-0.5)))^2; 1/(1+exp(-k*(x-0.5)))
x: -0.25, 1.25
y: -0.1, 3
sliders: k=2:1:30
shade: 0, 1
labels: \frac{dF}{dx}; F(x)
caption: Integrated gradients in one dimension, for $F(x) = \sigma(k(x - 0.5))$ with baseline $0$ and input $1$. The shaded area under the derivative equals $F(1) - F(0)$ ([[#thm-completeness]]). Increase the steepness $k$: the derivative at the input $x = 1$ becomes negligible — the gradient attribution vanishes — while the shaded area, the integrated-gradients attribution, approaches $1$.
:::

### The baseline is part of the explanation {#sec-baseline}

Integrated gradients explains $F(\mathbf{x}) - F(\mathbf{x}')$, so the choice of $\mathbf{x}'$ determines the question answered. For images, a black image is a common baseline, and a black pixel in the input then gets zero attribution whatever its importance; blurred, uniform-noise and averaged baselines give different maps (Sturmfels, Lundberg and Lee, 2020, "Visualizing the Impact of Feature Attribution Baselines"). For text, the zero vector is not the embedding of any token, and the straight path from it passes through embeddings that no real input has; a padding or mask token, or an average embedding, are alternatives, each with its own interpretation. The path matters too: other monotone paths satisfy completeness but give other attributions, and Sundararajan et al. showed that the straight line is the unique path method that is symmetric (exchanging two features with the same role exchanges their attributions) among a broad class of path methods.

## Shapley values {#sec-shapley}

A different idea comes from cooperative game theory. Treat the $n$ input features as players, and for a coalition $S\subseteq\{1,\dots,n\}$ let $v(S)$ be the output when the features in $S$ take their actual values and the others are "absent". The Shapley value (Shapley, 1953) divides $v(\{1,\dots,n\}) - v(\varnothing)$ among the players.

::: definition Shapley value {#def-shapley}
For a set function $v$ on subsets of $N = \{1,\dots,n\}$, the **Shapley value** of player $i$ is
$$
\phi_i(v) = \sum_{S\subseteq N\setminus\{i\}}\frac{\lvert S\rvert!\,(n - \lvert S\rvert - 1)!}{n!}\bigl(v(S\cup\{i\}) - v(S)\bigr),
$$ {#eq-shapley}
the average, over all $n!$ orderings of the players, of player $i$'s marginal contribution when it joins the players before it.
:::

::: theorem Shapley's characterisation {#thm-shapley}
The Shapley value is the unique attribution rule satisfying the following axioms for all set functions $v, w$:
1. **Efficiency**: $\sum_i\phi_i(v) = v(N) - v(\varnothing)$.
2. **Symmetry**: if $v(S\cup\{i\}) = v(S\cup\{j\})$ for every $S$ containing neither $i$ nor $j$, then $\phi_i(v) = \phi_j(v)$.
3. **Null player (dummy)**: if $v(S\cup\{i\}) = v(S)$ for every $S$, then $\phi_i(v) = 0$.
4. **Additivity**: $\phi_i(v + w) = \phi_i(v) + \phi_i(w)$.
:::

The uniqueness part (Shapley, 1953) is proved by writing any $v$ as a combination of "unanimity games" and is not reproduced here. That the formula satisfies efficiency is easy to see from the ordering form: for each ordering the marginal contributions telescope to $v(N) - v(\varnothing)$, and averaging over orderings preserves the sum. Efficiency is the analogue of completeness ([[#thm-completeness]]).

Lundberg and Lee (2017) unified several attribution methods as approximations to Shapley values under the name **SHAP**, restating the axioms as *local accuracy* (efficiency), *missingness* (a feature absent from the input gets zero) and *consistency* (if a model changes so that a feature's marginal contributions never decrease, its attribution does not decrease). Two practical issues dominate. Exact Shapley values need $2^n$ evaluations of $v$, so SHAP estimates them by sampling (KernelSHAP fits a weighted linear regression to sampled coalitions). And "absent" must be defined: replacing absent features by a baseline, by samples from their marginal distribution, or by samples from their conditional distribution given the present ones gives different values, and the choice is debated (Janzing, Minorics and Blöbaum, 2020, argued for the interventional version on causal grounds; others prefer the conditional one because it keeps inputs on the data distribution). For text, absence is usually implemented by masking tokens, which again produces unnatural inputs.

::: example Integrated gradients and Shapley values disagree {#ex-max}
Let $F(x_1, x_2) = \max(x_1, x_2)$, explained at $\mathbf{x} = (1, 2)$ against the baseline $\mathbf{0}$ (an absent feature takes value $0$). Compute both attributions.
::: solution
Integrated gradients: along $(t, 2t)$ the second coordinate is always larger, so $\partial F/\partial x_1 = 0$ and $\partial F/\partial x_2 = 1$ for all $t > 0$; $\operatorname{IG} = (0, 2)$. Shapley: $v(\varnothing) = 0$, $v(\{1\}) = \max(1, 0) = 1$, $v(\{2\}) = 2$, $v(\{1,2\}) = 2$. Then $\phi_1 = \tfrac12[(v(\{1\}) - v(\varnothing)) + (v(\{1,2\}) - v(\{2\}))] = \tfrac12(1 + 0) = 0.5$ and $\phi_2 = \tfrac12[(2 - 0) + (2 - 1)] = 1.5$. Both sum to $2 = F(\mathbf{x}) - F(\mathbf{0})$, but they answer different questions: integrated gradients follows one path, on which $x_1$ never matters; Shapley values average over the orders in which features could be "switched on", and if $x_1$ comes first it raises the output from $0$ to $1$.
:::
:::

Neither answer is wrong; they formalise different notions of credit. That two principled methods disagree on a two-input function is a reminder that an attribution is a *definition*, not a measurement, and that the choice should follow from the question. Studies comparing attribution methods on language models find substantial disagreement between methods on the same inputs (for example Krishna et al., 2022, "The Disagreement Problem in Explainable Machine Learning"), and practitioners report choosing among them ad hoc.

## Is attention explanation? {#sec-attention}

Attention weights look like a ready-made attribution: for each output position, a probability distribution over input positions ([[transformers/multi-head-attention]]). In recurrent models with an attention layer — the setting of the original debate — and in Transformers, they are routinely visualised as heatmaps of "what the model looked at". Whether they explain the prediction was argued in two papers of 2019.

Jain and Wallace (2019), *Attention is not Explanation*, studied BiLSTM classifiers with attention on text classification, question answering and inference tasks. They reported that attention weights correlated only weakly with gradient-based and leave-one-out measures of feature importance, and that for many inputs they could construct very different attention distributions — including adversarial ones that put weight on other tokens — that left the prediction almost unchanged. If many attention patterns yield the same output, the observed one cannot be "the" reason for it.

Wiegreffe and Pinter (2019), *Attention is not not Explanation*, challenged the conclusion. They argued that the adversarial distributions were constructed separately for each example rather than produced by a model trained end to end, so they show that alternatives *exist*, not that a model would have used them; when they trained an adversarial model to produce attention far from the original while matching its predictions, it was harder to achieve and the resulting weights performed worse in a diagnostic test. They also showed that on some tasks attention was barely needed (a model with uniform attention did as well), so its weights could not be expected to be informative there; and they argued that whether attention is "an explanation" depends on the definition — it can be a plausible, partial explanation without being the unique faithful one. Both papers agreed that attention weights should not be taken as faithful explanations without testing.

For Transformers two further points apply. First, an attention weight says *where* information is read from, not *what* is read or how much it matters: the contribution of position $j$ to the head's output is $\alpha_{ij}\,\mathbf{v}_j W_O$, and a large weight on a position whose value vector is small (often the first token, used as an "attention sink") contributes little. Kobayashi et al. (2020), *Attention is Not Only a Weight*, showed that weighting by the norm of the transformed value vectors changes the picture substantially. Second, after the first layer, a position's residual stream mixes information from many tokens, so attention to position $j$ in layer $5$ is not attention to token $j$. **Attention rollout** and **attention flow** (Abnar and Zuidema, 2020) propagate attention through layers to estimate token-level mixing, under simplifying assumptions. The view developed in [[interpretability/residual-stream]] treats attention patterns as one factor of a computation whose other factor — the OV circuit — determines what is moved.

::: quiz
An attention head in layer $1$ puts weight $0.7$ on the first token of the prompt at almost every position. What can be concluded?
- [ ] The first token is the most important input for the model's predictions.
- [ ] The head is copying the first token's identity to every position.
- [x] Nothing about importance without looking at what the head writes: a high weight on a position with a small value vector can contribute little to the output.
- [ ] The head is broken and can be removed without effect.
::: solution
Attention weights say where a head reads from. A head that defaults to the first token when it has nothing relevant to attend to — an "attention sink" pattern common in trained Transformers — may write almost nothing. Its contribution is $\alpha\,\mathbf{v}W_O$, so the size and direction of the value-output product matter, and an ablation would test whether removing the head changes the output.
:::
:::

## Reading predictions from intermediate layers {#sec-lens}

A final family of probes reads the residual stream in the model's own output vocabulary. In a decoder-only Transformer the last layer's residual vector $\mathbf{h}_L$ is mapped to logits by a final normalisation and the unembedding matrix $W_U\in\R^{d\times\lvert\mathcal{V}\rvert}$: $\text{logits} = \operatorname{Norm}(\mathbf{h}_L)\,W_U$. Because every layer adds to the same residual stream ([[transformers/transformer-block]]), the intermediate vectors $\mathbf{h}_\ell$ live in the same space, and one can simply decode them.

::: definition Logit lens and tuned lens {#def-lens}
The **logit lens** (nostalgebraist, 2020) decodes the residual stream after layer $\ell$ with the model's own output head, $p_\ell = \operatorname{softmax}\bigl(\operatorname{Norm}(\mathbf{h}_\ell)\,W_U\bigr)$. The **tuned lens** (Belrose et al., 2023) inserts a learned affine map for each layer, $p_\ell = \operatorname{softmax}\bigl(\operatorname{Norm}(A_\ell\mathbf{h}_\ell + \mathbf{b}_\ell)\,W_U\bigr)$, with $A_\ell, \mathbf{b}_\ell$ trained (model frozen) to minimise the KL divergence from the model's final output distribution $p_L$ to $p_\ell$.
:::

nostalgebraist's blog post applied the logit lens to GPT-2 and found that the intermediate predictions were often interpretable — a plausible next token appearing in middle layers and sharpening towards the output — suggesting that the model forms a guess early and refines it, rather than computing in a representation unrelated to the vocabulary until the end. The technique is a zero-parameter probe: it assumes that intermediate layers use the residual stream in the same basis as the last. That assumption fails for some models: Belrose et al. reported that the logit lens gave poor or nonsensical predictions on some model families (for example BLOOM and some OPT models) and in early layers generally, and that the representations drift — later layers change the basis in which earlier information is expressed. The tuned lens corrects this drift with one affine translator per layer; its predictions had lower perplexity and were more faithful by their causal tests (directions that mattered for the lens also mattered for the model). The authors also used the trajectory of latent predictions across layers as a feature for detecting anomalous inputs such as some prompt injections. The tuned lens is a trained probe, so the cautions of [[#sec-probes]] apply: its translators could, in principle, add computation of their own, which is why it is restricted to affine maps and checked causally.

::: example A logit lens by hand {#ex-lens}
A toy model has $d = 2$ and a vocabulary of three tokens whose unembedding columns are $\mathbf{u}_{\text{Paris}} = (1, 1)$, $\mathbf{u}_{\text{Lyon}} = (0, 1)$ and $\mathbf{u}_{\text{the}} = (1, -1)$. After normalisation, the residual stream at the last position after layer $6$ is $(1, 2)$. What does the logit lens predict?
::: solution
Logits are the dot products: Paris $1 + 2 = 3$, Lyon $0 + 2 = 2$, the $1 - 2 = -1$. Softmax: $e^3 = 20.09$, $e^2 = 7.39$, $e^{-1} = 0.37$, total $27.84$, so $p = (0.721, 0.265, 0.013)$. The lens says that by layer $6$ the stream already favours "Paris". Whether the model's final layers keep that prediction, and whether layer $6$ uses the same basis as the output, are separate questions — the second is what the tuned lens corrects.
:::
:::

## A numerical laboratory {#sec-code}

The first listing trains linear and MLP probes, by stochastic gradient descent in plain Python, on a task and on its control task ([[#ex-selectivity]]). The representations are synthetic: each word type has a random vector, each token adds noise, and a three-class property is weakly encoded in the type vectors. Test tokens are new tokens of the same word types, as in Hewitt and Liang's design. It takes about half a minute.

```python
import math, random
rng = random.Random(1)

# 60 word types; each type has a random vector in d = 16; a token is its type vector
# plus noise. The property (3 classes) is added to the type vectors along one
# direction per class with strength 0.6. The control task gives each TYPE a random label.
D, TYPES, K, TOK = 16, 60, 3, 12
def randvec(): return [rng.gauss(0, 1) for _ in range(D)]
cls_dir = [randvec() for _ in range(K)]
label = [rng.randrange(K) for _ in range(TYPES)]            # the linguistic task
control = [rng.randrange(K) for _ in range(TYPES)]          # the control task
base = [[v + 0.6 * c for v, c in zip(randvec(), cls_dir[label[t]])] for t in range(TYPES)]
def token(t): return [v + rng.gauss(0, 0.5) for v in base[t]]
train = [(token(t), t) for t in range(TYPES) for _ in range(TOK)]   # 720 tokens
test = [(token(t), t) for t in range(TYPES) for _ in range(4)]      # 240 new tokens

def softmax(z):
    m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e); return [v / s for v in e]

def train_probe(data, lab, hidden=0, epochs=60, lr=0.05):
    """softmax-regression probe; hidden > 0: one-hidden-layer ReLU MLP probe"""
    r = random.Random(2)
    if hidden:
        W1 = [[r.gauss(0, 1 / math.sqrt(D)) for _ in range(D)] for _ in range(hidden)]
        b1 = [0.0] * hidden
    n_in = hidden or D
    W = [[0.0] * n_in for _ in range(K)]; b = [0.0] * K       # (K, n_in), (K,)
    for _ in range(epochs):
        r.shuffle(data)
        for x, t in data:
            if hidden:
                pre = [sum(w * v for w, v in zip(row, x)) + bb for row, bb in zip(W1, b1)]
                h = [max(0.0, p) for p in pre]
            else:
                h = x
            p = softmax([sum(w * v for w, v in zip(row, h)) + bb for row, bb in zip(W, b)])
            g = [p[k] - (k == lab[t]) for k in range(K)]       # dLoss/dlogits
            if hidden:                                         # backpropagate into W1
                gh = [sum(g[k] * W[k][j] for k in range(K)) * (pre[j] > 0) for j in range(hidden)]
                for j in range(hidden):
                    if gh[j]:
                        row = W1[j]
                        for i in range(D): row[i] -= lr * gh[j] * x[i]
                        b1[j] -= lr * gh[j]
            for k in range(K):
                row = W[k]
                for j in range(n_in): row[j] -= lr * g[k] * h[j]
                b[k] -= lr * g[k]
    def predict(x):
        h = [max(0.0, sum(w * v for w, v in zip(row, x)) + bb) for row, bb in zip(W1, b1)] if hidden else x
        z = [sum(w * v for w, v in zip(row, h)) + bb for row, bb in zip(W, b)]
        return z.index(max(z))
    return predict

def acc(pred, data, lab): return sum(pred(x) == lab[t] for x, t in data) / len(data)
for name, hidden in [("linear", 0), ("MLP-64", 64)]:
    a_task = acc(train_probe(list(train), label, hidden), test, label)
    a_ctrl = acc(train_probe(list(train), control, hidden), test, control)
    print(f"{name:7s} probe: task {a_task:.3f}  control {a_ctrl:.3f}  selectivity {a_task - a_ctrl:+.3f}")
```

```text
linear  probe: task 0.817  control 0.588  selectivity +0.229
MLP-64  probe: task 0.983  control 0.963  selectivity +0.021
```

The second listing computes gradient, gradient × input, integrated gradients (a $1000$-step midpoint sum) and exact Shapley values for three functions: the saturated unit of [[#ex-ig-sat]], the maximum of [[#ex-max]], and a small smooth "network" with an interaction, $F = \sigma(3x_1 + 2x_2x_3 - 1)$.

```python
import math, itertools

def f_sat(x): return 1 - max(0.0, 1 - x[0] - x[1])
def f_max(x): return max(x[0], x[1])
def f_net(x): return 1 / (1 + math.exp(-(3 * x[0] + 2 * x[1] * x[2] - 1)))

def grad(f, x, eps=1e-6):                    # central differences
    return [(f([v + eps * (i == j) for j, v in enumerate(x)])
             - f([v - eps * (i == j) for j, v in enumerate(x)])) / (2 * eps) for i in range(len(x))]

def integrated_gradients(f, x, base, m=1000):
    tot = [0.0] * len(x)
    for k in range(m):                       # midpoint rule on [0, 1]
        t = (k + 0.5) / m
        g = grad(f, [b + t * (v - b) for v, b in zip(x, base)])
        tot = [s + gi / m for s, gi in zip(tot, g)]
    return [(v - b) * s for v, b, s in zip(x, base, tot)]

def shapley(f, x, base):                     # exact; absent features take baseline values
    n = len(x); phi = [0.0] * n
    for i in range(n):
        others = [j for j in range(n) if j != i]
        for r in range(n):
            for S in itertools.combinations(others, r):
                w = math.factorial(r) * math.factorial(n - r - 1) / math.factorial(n)
                with_i = [x[j] if (j in S or j == i) else base[j] for j in range(n)]
                without = [x[j] if j in S else base[j] for j in range(n)]
                phi[i] += w * (f(with_i) - f(without))
    return phi

for name, f, x in [("1-ReLU(1-x1-x2)", f_sat, [1.0, 1.0]), ("max(x1,x2)", f_max, [1.0, 2.0]),
                   ("sigmoid net", f_net, [1.0, 1.0, 1.0])]:
    base = [0.0] * len(x)
    g = grad(f, x); gxi = [gi * v for gi, v in zip(g, x)]
    ig = integrated_gradients(f, x, base); sh = shapley(f, x, base)
    r = lambda v: [round(u, 4) for u in v]
    print(f"{name}: f(x) - f(base) = {f(x) - f(base):.4f}")
    print("   gradient       ", r(g), " grad x input", r(gxi), " sum", round(sum(gxi), 4))
    print("   integrated grad", r(ig), " sum", round(sum(ig), 4))
    print("   Shapley        ", r(sh), " sum", round(sum(sh), 4))
```

```text
1-ReLU(1-x1-x2): f(x) - f(base) = 1.0000
   gradient        [0.0, 0.0]  grad x input [0.0, 0.0]  sum 0.0
   integrated grad [0.5, 0.5]  sum 1.0
   Shapley         [0.5, 0.5]  sum 1.0
max(x1,x2): f(x) - f(base) = 2.0000
   gradient        [0.0, 1.0]  grad x input [0.0, 2.0]  sum 2.0
   integrated grad [0.0, 2.0]  sum 2.0
   Shapley         [0.5, 1.5]  sum 2.0
sigmoid net: f(x) - f(base) = 0.7131
   gradient        [0.053, 0.0353, 0.0353]  grad x input [0.053, 0.0353, 0.0353]  sum 0.1236
   integrated grad [0.4791, 0.117, 0.117]  sum 0.7131
   Shapley         [0.4916, 0.1108, 0.1108]  sum 0.7131
```

Integrated gradients and Shapley values both satisfy completeness; gradient × input does not (it recovers $0.1236$ of a change of $0.7131$ for the sigmoid network, because the sigmoid is nearly saturated at the input). The two complete methods agree exactly on the saturated unit, disagree on the maximum, and nearly agree on the smooth network.

::: history
Linear classifiers on hidden layers go back to early studies of neural representations; Alain and Bengio (2016) named them probes, and Adi et al. (2017), Conneau et al. (2018), Tenney et al. (2019) and Hewitt and Manning (2019) made probing a standard tool for sentence encoders and BERT. Hewitt and Liang (2019) introduced control tasks, Pimentel et al. (2020) and Voita and Titov (2020) information-theoretic and MDL probing, Ravfogel et al. (2020) and Elazar et al. (2021) nullspace projection and amnesic probing; Belinkov (2022) surveyed the method's promises and shortcomings. Gradient saliency was introduced by Simonyan et al. (2014); layer-wise relevance propagation (Bach et al., 2015), DeepLIFT (Shrikumar et al., 2017), integrated gradients (Sundararajan et al., 2017) and SHAP (Lundberg and Lee, 2017), building on the Shapley value (1953) and LIME (Ribeiro et al., 2016), followed. Adebayo et al. (2018) proposed sanity checks. The attention debate began with Jain and Wallace (2019) and Wiegreffe and Pinter (2019); Abnar and Zuidema (2020) and Kobayashi et al. (2020) refined attention-based attributions. nostalgebraist's logit lens appeared on LessWrong in 2020, and Belrose et al. published the tuned lens in 2023. Molnar's *Interpretable Machine Learning* (2nd edition, 2022) covers attribution methods for practitioners.
:::

::: summary
- A **probe** predicts a property from frozen activations; probe accuracy shows that information is **decodable**, not that the model **uses** it. **Control tasks** (random labels per word type) expose memorisation; **selectivity** = task accuracy − control accuracy favours simple, linear probes (Hewitt and Liang, 2019). Information-theoretic and MDL probing take the complementary view. Causal tests (amnesic probing, interventions) test use.
- **Saliency** and **gradient × input** are cheap but fail under **saturation**; gradient × input is exact only for linear models.
- **Integrated gradients** integrates gradients along a straight path from a baseline; it is implementation invariant and satisfies **completeness**, $\sum_i\operatorname{IG}_i = F(\mathbf{x}) - F(\mathbf{x}')$, proved by the fundamental theorem of calculus along the path. The baseline defines the question.
- **Shapley values** are the unique attribution satisfying efficiency, symmetry, null player and additivity; SHAP approximates them, and the definition of an "absent" feature matters. Principled methods can disagree on simple functions.
- **Attention weights** say where a head reads, not what it moves or how much it matters (Jain and Wallace, 2019; Wiegreffe and Pinter, 2019; Kobayashi et al., 2020).
- The **logit lens** decodes intermediate residual streams with the output head; the **tuned lens** adds a trained affine translator per layer and is more reliable across model families.
:::

## Exercises

::: exercise Selectivity {level=1 check="0.15"}
A probe reaches $0.92$ accuracy on part-of-speech tagging and $0.77$ on the control task. What is its selectivity? A second probe reaches $0.89$ and $0.45$. Which is better evidence that the layer encodes part of speech in an accessible form?
::: solution
Selectivity $0.92 - 0.77 = 0.15$; the second probe's is $0.89 - 0.45 = 0.44$. The second probe, with slightly lower task accuracy but much higher selectivity, is better evidence: its success depends far less on memorising word types.
:::
:::

::: exercise Gradient × input of a linear model {level=1}
For $F(\mathbf{x}) = 2x_1 - 3x_2 + 0.5x_3 + 1$ at $\mathbf{x} = (1, 2, 4)$, compute gradient × input and integrated gradients with baseline $\mathbf{0}$, and verify completeness.
::: solution
Gradient × input: $(2, -6, 2)$. Integrated gradients: the gradient is constant, so $\operatorname{IG}_i = x_iw_i$, the same values. The sum is $-2$, and $F(\mathbf{x}) - F(\mathbf{0}) = (2 - 6 + 2 + 1) - 1 = -2$.
:::
:::

::: exercise A logit lens {level=1 check="0.5065"}
With the unembedding of [[#ex-lens]], the normalised residual stream after an earlier layer is $(0.5, 0.5)$. Compute the logit-lens probability of "Paris" to four decimal places.
::: solution
Logits: Paris $0.5 + 0.5 = 1$, Lyon $0.5$, the $0.5 - 0.5 = 0$. Softmax: $e^1 = 2.7183$, $e^{0.5} = 1.6487$, $e^0 = 1$, total $5.3670$, so $p(\text{Paris}) = 2.7183/5.3670 = 0.5065$. The earlier layer already ranks "Paris" first, but with much less confidence than layer $6$ ($0.721$).
:::
:::

::: exercise Integrated gradients by hand {level=2 check="2/3"}
Let $F(x_1, x_2) = x_1^2x_2$. Compute $\operatorname{IG}_1$ and $\operatorname{IG}_2$ at $\mathbf{x} = (1, 1)$ with baseline $\mathbf{0}$, verify completeness, and give $\operatorname{IG}_1$ as the answer.
::: solution
Along $(t, t)$: $\partial F/\partial x_1 = 2x_1x_2 = 2t^2$ and $\partial F/\partial x_2 = x_1^2 = t^2$. So $\operatorname{IG}_1 = \int_0^12t^2\,dt = 2/3$ and $\operatorname{IG}_2 = \int_0^1t^2\,dt = 1/3$; the sum is $1 = F(1,1) - F(0,0)$. The squared input gets twice the credit, matching its exponent.
:::
:::

::: exercise Shapley values of a product {level=2}
Compute the Shapley values of $F(x_1, x_2, x_3) = x_1x_2 + x_3$ at $\mathbf{x} = (2, 3, 1)$ with baseline $\mathbf{0}$, and compare with integrated gradients.
::: solution
$v(S)$: $v(\varnothing) = 0$, $v(\{1\}) = v(\{2\}) = 0$, $v(\{3\}) = 1$, $v(\{1,2\}) = 6$, $v(\{1,3\}) = v(\{2,3\}) = 1$, $v(N) = 7$. By additivity, split $F$ into $x_1x_2$ and $x_3$. For $x_3$ alone, player $3$ gets $1$ and the others $0$ (null player). For $x_1x_2$, players $1$ and $2$ are symmetric and player $3$ is null, so each of $1, 2$ gets $6/2 = 3$. Thus $\phi = (3, 3, 1)$, summing to $7$. Integrated gradients: along $(2t, 3t, t)$, $\partial F/\partial x_1 = x_2 = 3t$, so $\operatorname{IG}_1 = 2\int_0^13t\,dt = 3$; similarly $\operatorname{IG}_2 = 3\int_0^12t\,dt = 3$ and $\operatorname{IG}_3 = 1$. Here the two methods agree.
:::
:::

::: exercise Designing a control task {level=2}
You want to probe a model's residual stream for whether each token is inside a quotation. Design a control task in the sense of [[#def-selectivity]], and explain why a naive control (random labels per *token*) would be inappropriate.
::: solution
Assign each word type a random binary label with the same overall frequency as "inside a quotation", and label every token of that type with it. A probe that succeeds on this control does so by recognising word identity. Random labels per *token* cannot be learned at all (they are noise), so a probe would score near chance on them whatever its capacity — such a control measures nothing about memorisation. The point of the control is to be *learnable by memorising word types and only that way*, matching the confound it is meant to expose. Since quotation status depends on context, a selective probe should do much better on the task than on the control.
:::
:::

::: exercise Completeness for a ReLU network {level=3}
Let $F(\mathbf{x}) = \mathbf{c}\T\operatorname{ReLU}(W\mathbf{x} + \mathbf{b})$ be a one-hidden-layer ReLU network. Show that along the segment from $\mathbf{x}'$ to $\mathbf{x}$ the function $t\mapsto F(\gamma(t))$ is continuous and piecewise linear with at most $m$ break points ($m$ the number of hidden units), and derive a closed-form expression for integrated gradients as a sum over the linear pieces. Why does a Riemann sum with $m$ steps not compute it exactly in general?
::: solution
Hidden unit $j$ has pre-activation $z_j(t) = \mathbf{w}_j\T\gamma(t) + b_j$, affine in $t$; it changes sign at most once, at $t_j = -z_j(0)/(z_j(1) - z_j(0))$ when that lies in $(0,1)$. Between consecutive break points the set $A$ of active units is fixed, $F(\gamma(t)) = \sum_{j\in A}c_jz_j(t)$ is affine, and $\nabla F = \sum_{j\in A}c_j\mathbf{w}_j$ is constant. Continuity holds because ReLU is continuous. If the break points split $[0,1]$ into intervals $I_1,\dots,I_r$ ($r\le m + 1$) with active sets $A_1,\dots,A_r$ and lengths $\lvert I_k\rvert$, then $\operatorname{IG}_i = (x_i - x'_i)\sum_k\lvert I_k\rvert\sum_{j\in A_k}c_jW_{ji}$. Completeness follows directly by the fundamental theorem on each piece. A Riemann sum evaluates the gradient at fixed grid points; an interval whose length is not a multiple of the grid spacing is weighted incorrectly, so the sum is exact only if all break points fall on the grid — which is why practical implementations check the completeness gap and increase the number of steps until it is small.
:::
:::

::: exercise Attention weights versus contributions {level=3}
A head at a position attends to three earlier positions with weights $\alpha = (0.7, 0.2, 0.1)$. The vectors $\mathbf{v}_jW_O$ that the head would write from those positions have norms $0.1$, $2.0$ and $1.5$. Compute the norms of the weighted contributions $\alpha_j\mathbf{v}_jW_O$ and rank the positions by them. What does this say about attention heatmaps, and what experiment would establish which position matters for the output?
::: solution
Norms $0.7\times0.1 = 0.07$, $0.2\times2.0 = 0.40$, $0.1\times1.5 = 0.15$. The ranking by contribution is position $2$, then $3$, then $1$ — the reverse of the attention ranking for the top position. A heatmap of $\alpha$ would highlight position $1$, which contributes least (the attention-sink pattern). Even norms are not importance for the *output*: a large write can point in a direction that later layers ignore. To establish importance, intervene — patch or ablate the contribution from each position (or set its attention weight to zero and renormalise) and measure the change in the logit of interest ([[interpretability/causal-interventions]]) — or, for a direct effect only, project each contribution onto the unembedding direction of the predicted token ([[interpretability/residual-stream]]).
:::
:::

::: exercise The baseline question {level=2}
A sentiment model gives $F(\mathbf{x}) = 2.1$ (logit of "positive") on a review and $F(\mathbf{x}') = 0.3$ on an all-padding input of the same length. Integrated gradients assigns $+1.2$ to the word "not" and $+0.6$ to all other words together. (a) Check completeness. (b) A colleague says "'not' makes the review positive". Explain why the attribution does not support this reading, and suggest a baseline that would better isolate the effect of "not".
::: solution
(a) $1.2 + 0.6 = 1.8 = 2.1 - 0.3$, so completeness holds. (b) The attribution compares the review with an all-padding input: it says that, along the path from nothing to the full review, the embedding coordinates of "not" account for $1.2$ of the rise in the logit. That is not the same as "not" pushing towards positive in the context of the review — the path passes through unnatural interpolations in which "not" appears with faint versions of the other words. A baseline that isolates "not" is the same review with "not" replaced by a neutral token (or deleted): then the attribution explains $F(\text{review}) - F(\text{review without "not"})$, which is the counterfactual question the colleague has in mind. Simplest of all, compare the two outputs directly.
:::
:::
