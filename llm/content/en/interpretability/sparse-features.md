If a layer stores many more features than it has dimensions, as [[interpretability/superposition]] argued, then its neurons are the wrong units of analysis, and the right units — the feature directions — must be found. The superposition picture says what to look for: an overcomplete set of directions $\mathbf{d}_1,\dots,\mathbf{d}_M$, with $M$ much larger than the layer width $d$, such that every activation vector is approximately a *sparse*, non-negative combination of them. Recovering such a dictionary from data is **sparse dictionary learning**, an old problem from signal processing and the study of the visual cortex. Since 2023 it has been the most widely used method for decomposing language-model activations, through **sparse autoencoders** (SAEs).

This chapter defines SAEs and their training objective, proves the **shrinkage** that the usual $L_1$ penalty causes and the degeneracy that forces a constraint on the decoder, and describes the fixes — top-$k$, gated and JumpReLU activations. It covers the practical problems of **dead latents** and the metrics used to evaluate a dictionary: reconstruction error, the **downstream loss** when the reconstruction is spliced back into the model, and automated **interpretability scores**. It follows the scaling of SAEs from a one-layer model (Bricken et al., 2023; Cunningham et al., 2023) to production models (Templeton et al., 2024; Gao et al., 2024), and the later variants — **transcoders**, **crosscoders** and the attribution graphs built from them. It ends with the critiques, published from 2024 onwards, that SAEs underperform simple baselines on several downstream tasks, and the responses. The laboratory trains small SAEs in plain Python on synthetic data with planted features and measures how well they recover them.

## Sparse autoencoders {#sec-sae}

Let $\mathbf{x}\in\R^d$ be an activation vector — the residual stream at some layer, an MLP's output, or an attention layer's output — at one token position.

::: definition Sparse autoencoder {#def-sae}
A **sparse autoencoder** with $M$ **latents** (the dictionary size; $M/d$ is the **expansion factor**) consists of an encoder and a linear decoder,
$$
\mathbf{f}(\mathbf{x}) = \sigma\bigl(W_{\text{enc}}(\mathbf{x} - \mathbf{b}_{\text{dec}}) + \mathbf{b}_{\text{enc}}\bigr)\in\R^M_{\ge0},\qquad
\hat{\mathbf{x}} = W_{\text{dec}}\mathbf{f}(\mathbf{x}) + \mathbf{b}_{\text{dec}} = \mathbf{b}_{\text{dec}} + \sum_{i=1}^Mf_i(\mathbf{x})\,\mathbf{d}_i,
$$
with $W_{\text{enc}}\in\R^{M\times d}$, decoder columns $\mathbf{d}_i\in\R^d$ (the **feature directions**) and a non-negative activation $\sigma$ (ReLU, unless stated). It is trained on a large set of activations to minimise
$$
\mathcal{L} = \E_{\mathbf{x}}\Bigl[\lVert\mathbf{x} - \hat{\mathbf{x}}\rVert^2 + \lambda\sum_if_i(\mathbf{x})\,\lVert\mathbf{d}_i\rVert\Bigr],
$$ {#eq-sae}
or with $\lVert\mathbf{d}_i\rVert = 1$ enforced and the plain penalty $\lambda\sum_if_i$. The number of non-zero latents, $L_0 = \lvert\{i: f_i(\mathbf{x}) > 0\}\rvert$, measures sparsity.
:::

The decoder is the dictionary, and the encoder is a cheap approximation to the sparse-coding problem "find the sparsest non-negative $\mathbf{f}$ with $W_{\text{dec}}\mathbf{f}\approx\mathbf{x}$". Classical sparse coding solves that optimisation for every input; an SAE amortises it into one linear map and a ReLU, which makes it fast enough to apply to billions of activations, at the cost of some accuracy in the codes. A **latent** is a coordinate of $\mathbf{f}$; when it is interpretable — it fires on a recognisable class of inputs and its direction has a recognisable effect — it is called a **feature**, though usage is loose.

::: example The size of an SAE {#ex-size}
An SAE with expansion factor $16$ is trained on a residual stream of width $d = 4096$. How many latents and parameters does it have, and how much memory do its weights take in 32-bit floats?
::: solution
$M = 16\times4096 = 65{,}536$ latents. Parameters: $W_{\text{enc}}$ and $W_{\text{dec}}$ have $4096\times65{,}536$ each, plus $\mathbf{b}_{\text{enc}}$ ($65{,}536$) and $\mathbf{b}_{\text{dec}}$ ($4096$): $2\times268{,}435{,}456 + 69{,}632 = 536{,}940{,}544$, about $0.54$ billion — comparable to a small language model, for one layer. At $4$ bytes each, about $2.1$ GB. The largest published dictionaries are far bigger: Templeton et al. (2024) trained one with about $34$ million latents on a middle layer of Claude 3 Sonnet, and Gao et al. (2024) one with $16$ million latents on GPT-4 activations.
:::
:::

### Why the decoder norm must be controlled {#sec-norm}

The penalty in [[#eq-sae]] multiplies each activation by its decoder norm. Without that, the objective has no minimum worth having.

::: proposition The unconstrained $L_1$ objective is degenerate {#prop-degenerate}
Suppose the penalty is $\lambda\sum_if_i$ with no constraint on $\lVert\mathbf{d}_i\rVert$. For any SAE and any $c > 1$, the SAE obtained by multiplying row $i$ of $W_{\text{enc}}$ and $b_{\text{enc},i}$ by $1/c$ and $\mathbf{d}_i$ by $c$, for every $i$, has the same reconstruction and $1/c$ times the penalty. Hence the infimum of the objective equals the infimum of the reconstruction error alone, and is not attained with non-zero activations.
:::

::: proof
ReLU is positively homogeneous, $\operatorname{ReLU}(z/c) = \operatorname{ReLU}(z)/c$, so the new activations are $f_i/c$, and $(f_i/c)(c\,\mathbf{d}_i) = f_i\mathbf{d}_i$: the reconstruction is unchanged. The penalty becomes $\lambda\sum_if_i/c$. Letting $c\to\infty$ drives the penalty to $0$ without changing the reconstruction, so the sparsity term exerts no pressure at the optimum.
:::

Bricken et al. (2023) therefore constrained the decoder columns to unit norm (renormalising after each step); later recipes, including that of Templeton et al. (2024), penalise $f_i\lVert\mathbf{d}_i\rVert$ instead, which is invariant to the rescaling. Either way, $f_i$ then measures how much of direction $\mathbf{d}_i$ the input contains.

### Shrinkage {#sec-shrinkage}

The $L_1$ penalty makes activations sparse, but it also makes them systematically too small. The simplest case shows why.

::: proposition Soft thresholding {#prop-shrink}
Let $\mathbf{d}$ be a unit vector and $\mathbf{x} = a\,\mathbf{d} + \mathbf{r}$ with $\mathbf{r}\perp\mathbf{d}$. The minimiser over $f\ge0$ of $\lVert\mathbf{x} - f\mathbf{d}\rVert^2 + \lambda f$ is
$$
f^* = \max\bigl(0,\ a - \lambda/2\bigr).
$$ {#eq-soft}
:::

::: proof
$\lVert\mathbf{x} - f\mathbf{d}\rVert^2 = (a - f)^2 + \lVert\mathbf{r}\rVert^2$ because $\mathbf{r}\perp\mathbf{d}$ and $\lVert\mathbf{d}\rVert = 1$. The function $g(f) = (a - f)^2 + \lambda f$ is a convex parabola with derivative $g'(f) = -2(a - f) + \lambda$, which vanishes at $f = a - \lambda/2$. If $a > \lambda/2$, this point is feasible and is the minimiser; otherwise $g' > 0$ on $f > 0$ and the constrained minimum is at $f = 0$.
:::

Every active latent is therefore reduced by $\lambda/2$ (in this idealised setting), and small true activations are set to zero — the **shrinkage** that $L_1$ penalties are known for in statistics (the lasso; [[ml-fundamentals/regularisation]]). The reconstruction is too short along each feature direction, and the encoder learns biases that partly compensate. Several fixes are in use as of 2026:

- **Top-$k$ SAEs** (Makhzani and Frey, 2013; Gao et al., 2024) drop the penalty and keep only the $k$ largest pre-activations, setting the rest to zero; sparsity is fixed by $k$, and the kept activations are not shrunk. Gao et al. found top-$k$ SAEs gave better reconstruction at a given sparsity and cleaner scaling, and introduced **multi-$k$** training so that one dictionary works at several sparsities.
- **Gated SAEs** (Rajamanoharan et al., 2024) separate the decision *whether* a latent is active (a gate trained with the penalty) from *how large* it is (a magnitude path without it).
- **JumpReLU SAEs** (Rajamanoharan et al., 2024) use $\sigma(z) = z\,[z > \theta_i]$ with a learned threshold per latent, so that active latents are not shrunk, and train an $L_0$ penalty directly with straight-through gradient estimates. Gemma Scope (Lieberum et al., 2024), an open suite of SAEs for every layer of Gemma 2, used them.

::: widget plot
f: max(0, x - l/2); x*heaviside(x - l/2); x
x: -0.5, 2
y: -0.2, 2
sliders: l=0:0.1:2
labels: \text{soft threshold } (L_1); \text{hard threshold (JumpReLU / top-}k\text{)}; \text{true value}
caption: The activation an idealised SAE assigns to an input with true coefficient $a$ (horizontal axis) along a single feature direction, for penalty $\lambda$. The $L_1$ penalty gives the soft threshold $\max(0, a - \lambda/2)$ of [[#prop-shrink]]: below the threshold the feature is missed, above it the activation is too small by $\lambda/2$. A hard threshold (as in JumpReLU, or the cut-off implied by top-$k$) also misses small values but reproduces large ones exactly.
:::

::: example How much shrinkage? {#ex-shrink}
Features have true activations uniform on $[0.5, 1.5]$ when present, and an idealised $L_1$ SAE uses $\lambda = 0.3$. What is the average ratio of the SAE's activation to the true value? With $\lambda = 1$?
::: solution
By [[#eq-soft]], $f^*/a = 1 - \lambda/(2a)$ for $a > \lambda/2$, which holds throughout $[0.5, 1.5]$ for both values. The average of $1/a$ over $[0.5, 1.5]$ is $\int_{0.5}^{1.5}\frac{da}{a} = \ln3 = 1.099$. So the mean ratio is $1 - 0.15\times1.099 = 0.835$ for $\lambda = 0.3$, and $1 - 0.5\times1.099 = 0.451$ for $\lambda = 1$. The trained SAEs of [[#sec-code]] shrink a little more than this (their encoders are not optimal coders, and some activation leaks to other latents), but follow the same trend.
:::
:::

## Training in practice {#sec-training}

**Data.** SAEs are trained on activations collected by running the model over a large text corpus — typically hundreds of millions to billions of tokens for large dictionaries — often shuffled across documents. Activations are usually normalised to a fixed average norm so that hyperparameters transfer between layers and models.

**Dead latents.** A latent whose pre-activation is negative on every input receives no gradient from the reconstruction term and never recovers; it is **dead**. Dead latents waste capacity and become common in large dictionaries — Templeton et al. reported that a substantial fraction of the latents of their largest SAEs were dead. Remedies include periodically **resampling** dead latents towards inputs that are badly reconstructed (Bricken et al., 2023), initialising the encoder as the transpose of the decoder, and an auxiliary loss that asks dead latents to model the reconstruction residual (Gao et al., 2024, who reported very few dead latents with these measures even at $16$ million latents).

**Choosing $\lambda$ or $k$.** The penalty strength trades sparsity against reconstruction. There is no "true" sparsity to aim for, so dictionaries are compared along their **Pareto frontier** of reconstruction error against $L_0$. Gao et al. and Templeton et al. reported scaling laws: at fixed sparsity, reconstruction error falls as a power law in the number of latents and in training compute.

**Feature splitting.** As the dictionary grows, features **split**: a latent that fires on all mathematical text in a small dictionary may become several, for different branches of mathematics, in a larger one (Bricken et al., 2023). Splitting means that there is no single correct dictionary size; the features found depend on $M$ and form something like a hierarchy. A related failure is **feature absorption** (Chanin et al., 2024): a latent for a general feature ("starts with the letter S") fails to fire on inputs where a more specific latent ("the token *short*") has absorbed it, because the sparsity penalty rewards using one latent instead of two. Absorption makes latents less reliable as classifiers than their descriptions suggest.

## Evaluating a dictionary {#sec-eval}

Since the true features are unknown, evaluation relies on proxies, and different proxies can rank dictionaries differently.

::: definition Reconstruction and downstream metrics {#def-metrics}
For a set of activations $\mathbf{x}$ with mean $\bar{\mathbf{x}}$:
- the **fraction of variance unexplained** is $\operatorname{FVU} = \sum\lVert\mathbf{x} - \hat{\mathbf{x}}\rVert^2\big/\sum\lVert\mathbf{x} - \bar{\mathbf{x}}\rVert^2$;
- the **downstream loss** $\mathcal{L}_{\text{SAE}}$ is the language model's cross-entropy when $\mathbf{x}$ is replaced by $\hat{\mathbf{x}}$ in the forward pass and the computation continues;
- the **fraction of loss recovered** compares it with the clean loss $\mathcal{L}_{\text{clean}}$ and the loss with the activation ablated (set to zero or to its mean), $\mathcal{L}_{\text{abl}}$:
$$
\text{loss recovered} = \frac{\mathcal{L}_{\text{abl}} - \mathcal{L}_{\text{SAE}}}{\mathcal{L}_{\text{abl}} - \mathcal{L}_{\text{clean}}}.
$$
:::

Downstream loss matters because reconstruction error is not equally harmful in all directions: a small error in a direction the model relies on can raise the loss a lot. The fraction of loss recovered is easy to over-read, since the ablated baseline is often catastrophically bad; reporting the increase $\mathcal{L}_{\text{SAE}} - \mathcal{L}_{\text{clean}}$, or the compute needed to train a model with that loss, is more informative. Gao et al. noted that splicing in their GPT-4 SAE raised the loss to a level that, by their estimate, corresponds to a model trained with roughly $10\%$ of GPT-4's pretraining compute — a reminder that even large dictionaries miss part of what the model computes.

::: example Loss recovered {#ex-loss}
A model's loss is $2.30$ nats per token. Splicing an SAE's reconstruction into layer $12$ gives $2.45$; zero-ablating the layer's residual stream gives $7.00$. Compute the fraction of loss recovered and comment.
::: solution
$(7.00 - 2.45)/(7.00 - 2.30) = 4.55/4.70 = 0.968$. "$97\%$ of the loss recovered" sounds nearly perfect, but the absolute increase of $0.15$ nats per token is large — in language-modelling terms, it can correspond to a much smaller or much less trained model. The ratio flatters the SAE because zero-ablating a residual stream destroys almost all performance.
:::
:::

**Interpretability** is assessed by people or by language models. In **automated interpretability** (Bills et al., 2023, for neurons; adapted to SAE latents by Bricken et al. and others), a model is shown the contexts on which a latent fires most strongly and writes a short explanation; a second model, given only the explanation, predicts the latent's activations on held-out text; and the **score** is the correlation between predicted and true activations. Later variants score explanations by detection (can a model tell activating from non-activating examples?) or by intervention (does steering the latent produce text matching the explanation?). Bricken et al. and Cunningham et al. reported that SAE latents scored substantially higher than neurons, and than directions from PCA or ICA. Benchmarks such as SAEBench (Karvonen et al., 2025) collect many metrics — sparse probing, feature disentanglement, absorption, unlearning — and found that improvements on the reconstruction–sparsity frontier did not always translate into improvements on them.

::: example An automated interpretability score {#ex-autointerp}
A latent's true activations on six tokens are $(0, 0, 3, 1, 0, 5)$. Given the explanation "fires on mentions of rivers", a simulator predicts $(0, 1, 2, 1, 0, 4)$. Compute the correlation score.
::: solution
Means: $1.5$ and $1.333$. Centred products sum to $15.0$; the sums of squared deviations are $21.5$ and $11.333$. The Pearson correlation is $15.0/\sqrt{21.5\times11.333} = 15.0/15.61 = 0.961$. A high score says the explanation predicts the activations on these tokens; it does not say the latent *means* rivers — the simulator may succeed on frequent cases while the latent also fires, more weakly, on unrelated inputs that the six tokens do not include.
:::
:::

## From a one-layer model to production models {#sec-scaling}

**Towards Monosemanticity** (Bricken et al., 2023) trained SAEs on the $512$-neuron MLP layer of a one-layer Transformer, with dictionaries from $512$ to $131{,}072$ latents. The features found were far more interpretable than the neurons: latents for DNA sequences, Arabic script, base64 strings, Hebrew text, HTTP requests and many more, checked by manual and automated analysis and by their effects on the model's output when activated. They documented feature splitting and found that many features recurred across two independently trained models — a form of universality. Independently, **Cunningham et al. (2023)**, *Sparse Autoencoders Find Highly Interpretable Features in Language Models*, trained SAEs on the residual stream of Pythia models, reported higher automated interpretability than baseline decompositions, and used the features to localise the components of the IOI task more precisely than attention heads allowed.

**Scaling Monosemanticity** (Templeton et al., 2024) applied SAEs with about $1$, $4$ and $34$ million latents to the residual stream in the middle of Claude 3 Sonnet. The features were often multilingual and multimodal — a feature for the Golden Gate Bridge responded to the name in several languages and to images of the bridge — and many were abstract: features for code bugs, for sycophantic praise, for secrecy and deception, for dangerous content. Clamping features to large values changed behaviour as their descriptions predicted; with the Golden Gate Bridge feature clamped high, the model referred to the bridge constantly, even identifying itself with it (a version was briefly offered publicly). The authors were careful about what this did and did not show: the existence of a feature related to deception does not show that the model is deceptive, nor that the feature is used whenever the model deceives, and they estimated that their dictionaries captured only a fraction of the concepts the model represents. **Gao et al. (2024)**, *Scaling and Evaluating Sparse Autoencoders*, introduced the top-$k$ recipe, scaling laws and evaluation metrics, and trained a $16$-million-latent SAE on GPT-4. Open suites — Gemma Scope (Lieberum et al., 2024) and Llama Scope (He et al., 2024) — released SAEs for every layer of open-weight models, making the method widely available.

### Transcoders, crosscoders and attribution graphs {#sec-variants}

An SAE decomposes an activation; it does not explain how a layer *transforms* its input. Variants address this.

- A **transcoder** (Dunefsky, Chlenski and Nanda, 2024) reads the input of an MLP layer and is trained to reconstruct the layer's *output* through a sparse latent layer: $\widehat{\text{MLP}}(\mathbf{x}) = W_{\text{dec}}\sigma(W_{\text{enc}}\mathbf{x} + \mathbf{b}_{\text{enc}}) + \mathbf{b}_{\text{dec}}$. Replacing the MLP by its transcoder turns a dense non-linear layer into a sparse, wider one whose latents have input-side and output-side meanings, so the computation from features to features becomes traceable.
- A **crosscoder** (Lindsey et al., 2024) reads and reconstructs activations at several layers — or in several models — with one shared dictionary. Shared latents represent features that persist across layers; in **model diffing**, a crosscoder trained on a base model and its fine-tuned version separates shared features from those specific to one model.
- **Cross-layer transcoders and attribution graphs** (Ameisen et al., 2025, *Circuit Tracing*; Lindsey et al., 2025, *On the Biology of a Large Language Model*) replace every MLP of a model with transcoder features that can write to all later layers, giving a "replacement model". For a given prompt, an **attribution graph** traces how features influence one another and the output, pruned to the most important paths. Case studies on Claude 3.5 Haiku reported, among other things, two-step factual recall ("the capital of the state containing Dallas" passing through a Texas feature), planning of rhyming words before a line of poetry is written, and different mechanisms for arithmetic than the model's own explanations of its arithmetic describe. The authors emphasised that the replacement model differs from the real one — the graphs include error nodes for what the transcoders miss, and they reported obtaining satisfying insight on only a minority of the prompts they tried.

These methods turn the circuits programme of [[interpretability/circuits]] from heads and neurons to learned features, and automate much of it; their faithfulness depends on how well the replacement matches the model ([[interpretability/open-problems]]).

## Critiques and the state of the debate {#sec-critiques}

Enthusiasm for SAEs in 2023–2024 was followed by evaluations against simple baselines, which reached mixed and, in several cases, negative conclusions. As of 2026 the following are among the published findings.

- **Downstream tasks.** In March 2025 the Google DeepMind mechanistic interpretability team (Smith, Rajamanoharan, Nanda and colleagues) reported that, for detecting harmful intent in user prompts, linear probes on raw activations generalised out of distribution better than probes on SAE latents, and announced that they were deprioritising fundamental SAE research. Kantamneni et al. (2025), *Are Sparse Autoencoders Useful? A Case Study in Sparse Probing*, compared SAE-based probes with baselines across over a hundred binary classification datasets under data scarcity, class imbalance, label noise and covariate shift, and found that SAE probes did not reliably outperform them.
- **Steering.** AxBench (Wu et al., 2025) compared methods for detecting and steering concepts and found that SAE-based steering underperformed simple baselines, including prompting and difference-in-means directions ([[interpretability/causal-interventions]]).
- **Is the dictionary unique?** Paulo and Belrose (2025) found that SAEs trained on the same activations with different random seeds learned only partly overlapping sets of features, and Heap et al. (2025) found that SAEs trained on randomly initialised Transformers produced latents with automated interpretability scores comparable to those from trained models — suggesting that some apparent interpretability reflects the data or the method rather than the model's computation.
- **Dark matter.** Engels et al. (2024) found that a substantial part of SAE reconstruction error is predictable from the activation itself, a "dark matter" that larger dictionaries reduce only slowly, raising the question of how much of a model's computation sparse dictionaries can ever capture.

There is also positive evidence. Marks et al. (2024), *Sparse Feature Circuits*, used SAE features to find circuits and to remove a classifier's reliance on a spurious gender cue by ablating the features responsible (a method they called SHIFT), which requires an interpretable unit to work. In an **auditing game** reported by Marks et al. (2025), a model was deliberately trained with a hidden objective, and several teams were asked to discover it; teams with access to SAEs succeeded, though the paper also reported that some non-interpretability methods (such as searching the training data) worked too, and that the game's small scale limits the conclusions. And attribution graphs, which rest on sparse dictionaries, produced the case studies above.

The positions can be summarised fairly as follows. Critics argue that, for tasks with a clear objective — classifying, detecting, steering — SAEs have not beaten cheaper baselines, so their value has not been demonstrated where it can be measured. Proponents argue that the main purpose of SAEs is *unsupervised discovery* — finding features and mechanisms nobody thought to look for, which supervised baselines cannot do by construction — and that the methods are young and improving. Both agree that SAE latents should not be identified uncritically with "the model's features", and that claims need the same causal validation as any other interpretability result.

::: warning A latent's description is a hypothesis
A latent labelled "deception" by an automated explainer is a direction that, on the examples inspected, activated on text the explainer described as deceptive. It may fire on other things, fail to fire on some deceptive text (absorption), split into several latents in a larger dictionary, or differ between training seeds. Before using a latent as a detector or a steering handle, test it: measure precision and recall against labelled data, compare with a linear-probe baseline, and check its causal effect by intervention.
:::

::: quiz
An $L_1$-penalised SAE reconstructs activations with low error, but its latents' activations on inputs with one known active feature are systematically about $25\%$ smaller than the feature's true strength. What is the most likely cause, and which change addresses it?
- [ ] Dead latents; resample them.
- [ ] The expansion factor is too small; double $M$.
- [x] Shrinkage from the $L_1$ penalty; use a top-$k$ or JumpReLU activation (or fine-tune magnitudes without the penalty).
- [ ] Feature splitting; train a smaller dictionary.
::: solution
The $L_1$ penalty reduces every active latent by roughly $\lambda/2$ ([[#prop-shrink]]). Top-$k$, JumpReLU and gated SAEs decouple *which* latents are active from *how large* they are, removing the shrinkage. Dead latents, dictionary size and splitting affect which features are found, not a uniform underestimate of magnitudes.
:::
:::

## A numerical laboratory {#sec-code}

The listing creates synthetic "activations" with known features: $12$ random unit directions in $\R^8$ (superposition: more features than dimensions), each active with probability $0.06$ with strength uniform on $[0.5, 1.5]$, plus a little noise. It trains, in plain Python with Adam, three $L_1$ SAEs with $16$ latents and unit-norm decoder rows at $\lambda = 0.1$, $0.3$ and $1.0$, and a top-$k$ SAE with $k = 2$. For each it reports the FVU, the mean $L_0$, the number of latents that fire at all, how many true features are recovered (some decoder direction has cosine $> 0.95$ with it), and the average ratio of the best-matching latent's activation to the true strength on inputs with a single active feature. It takes about half a minute.

```python
import math, random
rng = random.Random(6)

# Synthetic activations: NF = 12 ground-truth features superposed in D = 8 dimensions.
D, NF, P = 8, 12, 0.06                 # each feature active with probability 0.06
def unit(v): s = math.sqrt(sum(a * a for a in v)); return [a / s for a in v]
true_dirs = [unit([rng.gauss(0, 1) for _ in range(D)]) for _ in range(NF)]      # (NF, D)
def sample():
    c = [rng.uniform(0.5, 1.5) if rng.random() < P else 0.0 for _ in range(NF)]   # true codes
    x = [sum(c[i] * true_dirs[i][k] for i in range(NF)) + rng.gauss(0, 0.01) for k in range(D)]
    return x, c
data = [sample() for _ in range(6000)]
test = [sample() for _ in range(2000)]

def train_sae(M=16, mode="l1", lam=0.3, k=2, epochs=20, lr=3e-3, batch=32, seed=0):
    """f = act(W_enc (x - b_dec) + b_enc), x_hat = W_dec^T f + b_dec, decoder rows of unit norm.
    mode 'l1': act = ReLU, loss |x - x_hat|^2 + lam * sum(f);  mode 'topk': keep the k largest."""
    r = random.Random(seed)
    Wd = [unit([r.gauss(0, 1) for _ in range(D)]) for _ in range(M)]      # (M, D) decoder rows
    We = [row[:] for row in Wd]                                            # encoder = decoder^T at init
    be, bd = [0.0] * M, [0.0] * D
    mom = {name: [[0.0] * D for _ in range(M)] for name in ("We", "Wd")}
    var = {name: [[0.0] * D for _ in range(M)] for name in ("We", "Wd")}
    mbe, vbe, mbd, vbd = [0.0] * M, [0.0] * M, [0.0] * D, [0.0] * D
    t = 0
    def adam(val, g, mo, va, j):
        mo[j] = 0.9 * mo[j] + 0.1 * g; va[j] = 0.999 * va[j] + 0.001 * g * g
        return val - lr * (mo[j] / (1 - 0.9 ** t)) / (math.sqrt(va[j] / (1 - 0.999 ** t)) + 1e-8)
    def encode(x):
        xc = [a - b for a, b in zip(x, bd)]
        pre = [sum(w * v for w, v in zip(We[i], xc)) + be[i] for i in range(M)]
        if mode == "topk":
            keep = set(sorted(range(M), key=lambda i: -pre[i])[:k])
            pre = [z if i in keep else 0.0 for i, z in enumerate(pre)]
        return xc, [max(0.0, z) for z in pre]
    def decode(f): return [sum(f[i] * Wd[i][j] for i in range(M)) + bd[j] for j in range(D)]
    for _ in range(epochs):
        r.shuffle(data)
        for s in range(0, len(data), batch):
            t += 1
            gWe = [[0.0] * D for _ in range(M)]; gWd = [[0.0] * D for _ in range(M)]
            gbe, gbd = [0.0] * M, [0.0] * D
            for x, _ in data[s:s + batch]:
                xc, f = encode(x)
                e = [2 * (a - b) / batch for a, b in zip(decode(f), x)]       # dLoss/dx_hat
                for j in range(D): gbd[j] += e[j]
                for i in range(M):
                    if f[i] > 0:
                        gf = sum(e[j] * Wd[i][j] for j in range(D)) + (lam / batch if mode == "l1" else 0.0)
                        for j in range(D):
                            gWd[i][j] += e[j] * f[i]; gWe[i][j] += gf * xc[j]
                        gbe[i] += gf
            for i in range(M):
                for j in range(D):
                    We[i][j] = adam(We[i][j], gWe[i][j], mom["We"][i], var["We"][i], j)
                    Wd[i][j] = adam(Wd[i][j], gWd[i][j], mom["Wd"][i], var["Wd"][i], j)
                be[i] = adam(be[i], gbe[i], mbe, vbe, i)
                Wd[i] = unit(Wd[i])                                        # project to unit norm
            for j in range(D): bd[j] = adam(bd[j], gbd[j], mbd, vbd, j)
    return encode, decode, Wd

def report(name, enc, dec, Wd):
    codes = [enc(x)[1] for x, _ in test]
    sse = sum(sum((a - b) ** 2 for a, b in zip(dec(f), x)) for f, (x, _) in zip(codes, test))
    mean = [sum(x[j] for x, _ in test) / len(test) for j in range(D)]
    sst = sum(sum((a - m) ** 2 for a, m in zip(x, mean)) for x, _ in test)
    l0 = sum(sum(v > 0 for v in f) for f in codes) / len(test)
    alive = [i for i in range(len(Wd)) if any(f[i] > 0 for f in codes)]
    cos = lambda u, v: sum(a * b for a, b in zip(u, v))
    best = [max(alive, key=lambda i: cos(td, Wd[i])) for td in true_dirs]   # best latent per feature
    match = [cos(td, Wd[i]) for td, i in zip(true_dirs, best)]
    ratios = [f[best[j]] / c[j] for f, (_, c) in zip(codes, test)          # inputs with one feature
              for j in range(NF) if c[j] > 0 and sum(v > 0 for v in c) == 1]
    print(f"{name}: FVU {sse / sst:.3f}, L0 {l0:.2f}, alive {len(alive)}/{len(Wd)}, "
          f"recovered {sum(m > 0.95 for m in match)}/{NF} (worst cos {min(match):.3f}), "
          f"activation/true {sum(ratios) / len(ratios):.3f}")

print(f"true L0 per input: {sum(sum(v > 0 for v in c) for _, c in test) / len(test):.2f}")
for lam in [0.1, 0.3, 1.0]:
    report(f"L1 SAE, lambda={lam}", *train_sae(mode="l1", lam=lam))
report("top-k SAE, k=2     ", *train_sae(mode="topk", k=2))
```

```text
true L0 per input: 0.72
L1 SAE, lambda=0.1: FVU 0.024, L0 1.96, alive 16/16, recovered 8/12 (worst cos 0.793), activation/true 0.751
L1 SAE, lambda=0.3: FVU 0.057, L0 1.22, alive 16/16, recovered 12/12 (worst cos 0.965), activation/true 0.741
L1 SAE, lambda=1.0: FVU 0.310, L0 0.86, alive 16/16, recovered 11/12 (worst cos 0.920), activation/true 0.381
top-k SAE, k=2     : FVU 0.068, L0 1.99, alive 14/16, recovered 9/12 (worst cos 0.768), activation/true 0.933
```

The results illustrate the chapter's main points. Reconstruction alone is a poor guide: the SAE with the *best* FVU ($\lambda = 0.1$) is the least sparse and recovers only $8$ of the $12$ planted features, spending its latents on mixtures; at $\lambda = 0.3$ all $12$ are recovered, at the cost of a higher FVU. Too strong a penalty ($\lambda = 1$) loses reconstruction and shrinks activations to $38\%$ of their true values, in line with [[#ex-shrink]]. The top-$k$ SAE barely shrinks ($93\%$), but with $k = 2$ it uses two latents on inputs that mostly have zero or one active feature, recovers fewer features, and has two dead latents. With real activations there are no planted features to check against, which is why evaluation is hard.

::: history
Sparse coding of natural images by Olshausen and Field (1996) showed that an overcomplete dictionary learned with a sparsity penalty yields receptive fields like those of the visual cortex; dictionary-learning algorithms such as K-SVD (Aharon, Elad and Bruckstein, 2006) followed, and the lasso (Tibshirani, 1996) made $L_1$ shrinkage familiar in statistics. Makhzani and Frey (2013) introduced $k$-sparse autoencoders. Arora et al. (2018) and Yun et al. (2021) applied sparse coding to word embeddings and Transformer activations. In 2023, Bricken et al. (*Towards Monosemanticity*) and Cunningham et al. established SAEs for language-model interpretability; in 2024 Templeton et al. scaled them to Claude 3 Sonnet, Gao et al. to GPT-4 with top-$k$ SAEs, Rajamanoharan et al. introduced gated and JumpReLU SAEs, Lieberum et al. released Gemma Scope, Dunefsky et al. transcoders, Lindsey et al. crosscoders, and Marks et al. sparse feature circuits. Ameisen et al. and Lindsey et al. (2025) built attribution graphs from cross-layer transcoders. From late 2024, evaluations against baselines — by Google DeepMind's team, Kantamneni et al., Wu et al. (AxBench), Paulo and Belrose, Heap et al. and the SAEBench authors — tempered the claims, and the debate over the method's usefulness continues.
:::

::: summary
- A **sparse autoencoder** encodes an activation into many non-negative latents, $\mathbf{f} = \operatorname{ReLU}(W_{\text{enc}}(\mathbf{x} - \mathbf{b}_{\text{dec}}) + \mathbf{b}_{\text{enc}})$, and decodes $\hat{\mathbf{x}} = W_{\text{dec}}\mathbf{f} + \mathbf{b}_{\text{dec}}$, trained on reconstruction plus sparsity; decoder columns are feature directions.
- Without controlling decoder norms the $L_1$ objective is **degenerate**; with them, the $L_1$ penalty **shrinks** activations by about $\lambda/2$ (soft thresholding). **Top-$k$**, **gated** and **JumpReLU** SAEs avoid shrinkage.
- Practical issues: **dead latents**, choice of sparsity along a Pareto frontier, **feature splitting** with dictionary size, and **feature absorption**.
- Evaluation uses FVU, $L_0$, **downstream loss** with the reconstruction spliced in (absolute increase, not only "loss recovered"), automated **interpretability scores**, and benchmark suites; the proxies disagree.
- SAEs scaled from a one-layer model to Claude 3 Sonnet and GPT-4, finding abstract, multilingual and steerable features; **transcoders**, **crosscoders** and **attribution graphs** extend them to computation across layers.
- As of 2026, SAEs have underperformed simple baselines on several supervised downstream tasks (probing, steering) and show seed dependence and dark matter; proponents emphasise unsupervised discovery and auditing. Latent descriptions are hypotheses to be validated.
:::

## Exercises

::: exercise Counting parameters {level=1 check="134252544"}
How many parameters does an SAE with $M = 32{,}768$ latents on a residual stream of width $d = 2048$ have (both weight matrices and both biases)?
::: solution
Each weight matrix has $2048\times32{,}768 = 67{,}108{,}864$ entries, so the two together have $134{,}217{,}728$; the biases add $32{,}768 + 2048 = 34{,}816$. The total is $134{,}252{,}544$.
:::
:::

::: exercise Soft thresholding {level=1 check="0.55"}
An input has coefficient $a = 0.8$ along a unit feature direction. What activation does the optimal $L_1$ code with $\lambda = 0.5$ give? What is the smallest coefficient that is detected at all?
::: solution
$f^* = 0.8 - 0.25 = 0.55$. Coefficients up to $\lambda/2 = 0.25$ give $f^* = 0$, so the smallest detected coefficient is anything above $0.25$.
:::
:::

::: exercise Fraction of variance unexplained {level=1 check="0.05"}
On a test set, the total squared deviation of activations from their mean is $400$ and the SAE's total squared reconstruction error is $20$. Compute the FVU.
::: solution
$20/400 = 0.05$: the SAE explains $95\%$ of the variance.
:::
:::

::: exercise Loss recovered versus loss increase {level=2}
Two SAEs on the same layer give downstream losses $2.36$ and $2.52$; the clean loss is $2.30$ and the mean-ablated loss is $3.10$. Compute the fraction of loss recovered for each, and explain why the comparison might look different with a zero-ablation baseline of $8.0$.
::: solution
With the mean-ablation baseline: $(3.10 - 2.36)/(3.10 - 2.30) = 0.925$ and $(3.10 - 2.52)/0.80 = 0.725$. With zero ablation: $(8.0 - 2.36)/5.7 = 0.989$ and $(8.0 - 2.52)/5.7 = 0.961$. The absolute increases, $0.06$ and $0.22$ nats, are the same in both cases; only the baseline changes the ratios, and a harsh baseline compresses them towards $1$. Report the absolute increase alongside the ratio, and say which ablation was used.
:::
:::

::: exercise The penalty with decoder norms {level=2}
Show that the penalty $\sum_if_i\lVert\mathbf{d}_i\rVert$ is invariant under the rescaling of [[#prop-degenerate]], and that minimising [[#eq-sae]] with it is equivalent to minimising the unit-norm-constrained objective.
::: solution
Under the rescaling $f_i\to f_i/c$ and $\mathbf{d}_i\to c\,\mathbf{d}_i$, the product $f_i\lVert\mathbf{d}_i\rVert\to(f_i/c)(c\lVert\mathbf{d}_i\rVert) = f_i\lVert\mathbf{d}_i\rVert$, and the reconstruction is unchanged, so the objective is invariant. Given any SAE, rescale each latent by $c_i = 1/\lVert\mathbf{d}_i\rVert$ (for $\mathbf{d}_i\ne\mathbf{0}$); this changes neither reconstruction nor penalty and produces unit-norm decoder columns with penalty $\sum_if_i$. So every value of the norm-weighted objective is attained by a unit-norm SAE with the same value of the constrained objective, and conversely; the two problems have the same optimal value and corresponding minimisers.
:::
:::

::: exercise A top-k encoder {level=2}
An SAE's pre-activations on an input are $(2.1, -0.3, 0.9, 1.7, 0.2)$. Give the latent activations for a ReLU SAE, a top-$2$ SAE and a JumpReLU SAE with threshold $\theta = 1$ for every latent. Which give $L_0 = 2$?
::: solution
ReLU: $(2.1, 0, 0.9, 1.7, 0.2)$, $L_0 = 4$. Top-$2$: keep the two largest, $(2.1, 0, 0, 1.7, 0)$, $L_0 = 2$. JumpReLU: $z\,[z > 1]$ gives $(2.1, 0, 0, 1.7, 0)$, $L_0 = 2$. Top-$k$ fixes the number of active latents per input; JumpReLU fixes a threshold per latent, so its $L_0$ varies across inputs.
:::
:::

::: exercise Absorption {level=3}
Consider two binary features: $g$ = "token starts with S" (present on $10\%$ of tokens) and $s$ = "token is *short*" (present on $0.1\%$, always with $g$). Their directions are $\mathbf{u}_g$ and $\mathbf{u}_s$, and on *short* the activation is $\mathbf{u}_g + \mathbf{u}_s$. An SAE has a latent for $g$ with direction $\mathbf{u}_g$ and another latent. Compare the $L_1$ costs of (a) latent 2 with direction $\mathbf{u}_s$ and both latents firing on *short*, and (b) latent 2 with direction $(\mathbf{u}_g + \mathbf{u}_s)/\lVert\mathbf{u}_g + \mathbf{u}_s\rVert$ firing alone on *short*, assuming $\mathbf{u}_g\perp\mathbf{u}_s$, unit norms, and exact reconstruction in both cases. What does (b) imply for the $g$ latent as a classifier?
::: solution
(a) On *short*, $f_g = 1$ and $f_s = 1$: penalty $2\lambda$. (b) Latent 2's direction is $(\mathbf{u}_g + \mathbf{u}_s)/\sqrt2$, and $f_2 = \sqrt2$ reconstructs exactly with $f_g = 0$: penalty $\sqrt2\lambda\approx1.41\lambda$. The sparsity penalty prefers (b), in which the specific latent **absorbs** the general feature. Then the $g$ latent does not fire on *short*: as a detector of "starts with S" it has a hole wherever a more specific latent absorbed it, so its recall is lower than its description suggests — the phenomenon Chanin et al. (2024) measured. Exact reconstruction is the same in both cases, so reconstruction metrics cannot detect the problem.
:::
:::

::: exercise Recovering features with more latents {level=3}
Modify the laboratory to train the $\lambda = 0.3$ $L_1$ SAE with $M = 32$ latents instead of $16$. Predict, before running, what happens to the number of recovered features, the number of dead latents and the meaning of the extra latents. Then describe what you would check to decide whether two latents with similar directions are a "split" feature or a duplicate.
::: solution
Prediction: the $12$ planted features should still be recovered (the dictionary is larger than needed), some of the extra latents may die (no direction is left for them to represent), and others may duplicate a feature or represent a combination of two features that co-occur. Running `report("L1 SAE, M=32", *train_sae(M=32, mode="l1", lam=0.3))` prints `FVU 0.057, L0 1.63, alive 31/32, recovered 12/12 (worst cos 0.957), activation/true 0.636`: all features are still recovered and one latent is dead, but $L_0$ rises from $1.22$ to $1.63$ at the same reconstruction error, and the best-matching latent carries less of each feature's activation ($0.636$ against $0.741$) — some of it is shared with near-duplicate latents. To distinguish a split from a duplicate, compare the two latents' activations on the same inputs: duplicates have nearly identical directions and fire on the same inputs, splitting the activation between them (their activations are strongly positively correlated, and each alone reconstructs less); a split feature consists of latents that fire on *different* subsets of the inputs of the parent feature (low co-activation), with directions that differ slightly — in real models, sub-concepts. In the synthetic data there are no sub-concepts, so close pairs are duplicates or mixtures.
:::
:::

::: exercise Arguing both sides {level=2}
A colleague says: "SAEs are useless — linear probes beat them at detecting harmful prompts." Another replies: "Probes need labels; SAEs find what you did not know to look for." Write a short assessment that a neutral reviewer could accept, citing the kinds of evidence each side relies on and an experiment that could move the debate.
::: solution
The first claim generalises from specific supervised tasks: published comparisons (Google DeepMind's 2025 report on harmful-intent detection; Kantamneni et al., 2025, on sparse probing; AxBench, 2025, on steering) found that SAE-based methods did not beat simple baselines where a labelled objective exists. That is strong evidence that SAEs are not the best tool for those tasks, not that they are useless. The second claim points to a different use — unsupervised discovery — supported by case studies (features and circuits found without prior hypotheses, auditing-game results, attribution graphs) that are harder to benchmark and have not been shown to beat alternatives systematically either. A neutral assessment: SAEs are an unproven but promising tool for discovery and a weak tool for supervised detection, as of 2026. An experiment that could move the debate: a pre-registered auditing study in which models are trained with several hidden behaviours unknown to the auditors, comparing teams (or automated agents) with and without SAE access, with the same time budget and strong non-SAE baselines (black-box testing, training-data search, probes), and measuring which behaviours each finds.
:::
:::
