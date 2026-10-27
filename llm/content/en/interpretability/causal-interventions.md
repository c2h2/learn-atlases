Every method so far has had to be validated by the same test: *change something inside the model and see whether the behaviour changes as the explanation predicts*. Probes show that information is decodable, attributions assign credit, circuits and sparse features propose mechanisms — and in each case the decisive evidence came from an intervention. This chapter makes interventions the subject. Unlike most of science, interpretability can perform perfect experiments: the model can be run on any input, any activation can be set to any value, and the experiment can be repeated exactly.

The chapter begins with **activation patching**: running the model on a clean and a corrupted input and transplanting activations between the runs. It distinguishes **denoising** from **noising**, which answer different questions and fail differently on redundant and conjunctive mechanisms; presents **causal tracing** (Meng et al., 2022), **attribution patching** (a first-order approximation whose error we bound) and **path patching**; and relates them to **causal abstraction** (Geiger et al.) and causal scrubbing. It then turns from testing to controlling: **steering vectors** and activation addition (Turner et al., 2023), **representation engineering** (Zou et al., 2023), and the finding that refusal in chat models is mediated by a single direction (Arditi et al., 2024). The last part treats **knowledge editing**: the rank-one update of ROME, derived as a constrained least-squares problem, and its side effects. The laboratory patches a toy network in which single-unit patching is misleading, and edits a linear associative memory.

## Interventions and effects {#sec-effects}

Fix a model, a **metric** $m$ computed from its output — the logit difference between a correct and an incorrect answer, the probability of the correct token, or a KL divergence — and two inputs: a **clean** input $x_{\text{clean}}$ on which the model shows the behaviour, and a **corrupted** input $x_{\text{corr}}$ that differs in a controlled way (a different subject, swapped names, noise added to some token embeddings). Let $a$ be some internal activation — a head's output at one position, an MLP's output, a residual-stream vector, a feature — and write $a(x)$ for its value on input $x$.

::: definition Activation patching {#def-patching}
Write $m(x\mid a\leftarrow v)$ for the metric when the model is run on $x$ with activation $a$ set to $v$ and the computation downstream of $a$ allowed to respond. Then:
- **denoising** (patching clean into corrupted) measures $m(x_{\text{corr}}\mid a\leftarrow a(x_{\text{clean}})) - m(x_{\text{corr}})$: how much of the clean behaviour does restoring $a$ alone bring back?
- **noising** (patching corrupted into clean) measures $m(x_{\text{clean}}\mid a\leftarrow a(x_{\text{corr}})) - m(x_{\text{clean}})$: how much behaviour is lost if $a$ alone is corrupted?

With $\Delta = m(x_{\text{clean}}) - m(x_{\text{corr}})$ the **total effect** of the corruption, effects are often reported as fractions of $\Delta$.
:::

In the language of causal mediation analysis (Pearl, 2001; introduced to neural language models by Vig et al., 2020), the input is a treatment, $a$ is a mediator and $m$ the outcome. Denoising estimates an *indirect effect* through $a$ — the change produced by moving the mediator to its clean value while keeping the input corrupted — and noising estimates how much of the total effect *requires* $a$. **Ablation** is the special case of noising in which the replacement value is not taken from a specific corrupted input: **zero ablation** sets $a = 0$; **mean ablation** sets it to its average over a dataset; **resample ablation** uses its value on a random other input. Zero ablation is the crudest, since zero may be far outside the range of values the downstream computation ever sees; mean and resample ablation stay closer to the activation distribution. Heimersheim and Nanda (2024) and Zhang and Nanda (2024) review how these choices change conclusions and recommend corrupted inputs that differ minimally from the clean ones.

### Denoising and noising answer different questions {#sec-and-or}

If the metric were a sum of separate contributions from components, denoising and noising would agree and effects would add. They do not, in general, and the two classic counterexamples are conjunction and redundancy.

::: proposition Additivity holds only for additive mechanisms {#prop-additive}
Suppose the metric depends on activations $a_1,\dots,a_n$ only through $m = \sum_ig_i(a_i)$, with each $a_i$ computed directly from the input. Then for each $i$ the denoising effect of $a_i$ equals minus its noising effect, both equal $g_i(a_i(x_{\text{clean}})) - g_i(a_i(x_{\text{corr}}))$, and the effects of all $a_i$ sum to $\Delta$. Without additivity, each of these statements can fail: if $m = \min(a_1, a_2)$ with $a_i\in\{0,1\}$, clean $(1,1)$ and corrupted $(0,0)$, each unit has denoising effect $0$ and noising effect $-1$; if $m = \max(a_1, a_2)$, each has denoising effect $1$ and noising effect $0$.
:::

::: proof
Under additivity, patching $a_i$ in either direction changes only the term $g_i$, from $g_i(a_i(x_{\text{corr}}))$ to $g_i(a_i(x_{\text{clean}}))$ or back, and $\Delta = \sum_i[g_i(a_i(x_{\text{clean}})) - g_i(a_i(x_{\text{corr}}))]$. For the conjunction, restoring one input of $\min$ from $0$ to $1$ leaves $\min = 0$ (denoising effect $0$), while corrupting one input of $\min(1,1)$ gives $0$ (noising effect $-1$). For the disjunction, restoring one input of $\max(0,0)$ gives $1$, while corrupting one input of $\max(1,1)$ leaves $1$.
:::

The two counterexamples map onto real phenomena. In a **conjunctive** (AND-like) mechanism, several components are jointly necessary — a previous-token head and an induction head ([[interpretability/circuits]]) — and denoising either alone shows nothing, while noising either shows the whole effect. In a **redundant** (OR-like) mechanism, several components can each do the job — the backup name-mover heads of the IOI circuit — and noising either alone shows nothing, while denoising either shows the whole effect. Denoising finds components that are *sufficient* (given the rest of the clean computation is absent), noising those that are *necessary* (given the rest is present). Heimersheim and Nanda (2024) recommend using both, and patching sets of components, not only single ones.

::: example Reading a patching table {#ex-table}
The laboratory network ([[#sec-code]]) has hidden units $h_1,\dots,h_4$ and metric $m = 2\operatorname{ReLU}(h_1 + h_2 - 1) + 2\min(1, h_3 + h_4)$, with clean values $(1,1,1,1)$ and corrupted $(0,0,0,0)$. Compute the denoising and noising effects of $h_1$ and of $h_3$, and interpret.
::: solution
$m(\text{clean}) = 2 + 2 = 4$, $m(\text{corr}) = 0$, so $\Delta = 4$. Denoising $h_1$: $(1,0,0,0)$ gives $2\operatorname{ReLU}(0) + 2\min(1, 0) = 0$, effect $0$. Noising $h_1$: $(0,1,1,1)$ gives $0 + 2 = 2$, effect $-2$. Denoising $h_3$: $(0,0,1,0)$ gives $0 + 2 = 2$, effect $+2$. Noising $h_3$: $(1,1,0,1)$ gives $2 + 2\min(1,1) = 4$, effect $0$. $h_1$ is half of a conjunction: necessary but not sufficient. $h_3$ is one of two redundant copies: sufficient but not necessary. A study using only noising would miss $h_3$ and $h_4$ entirely; one using only denoising would miss $h_1$ and $h_2$.
:::
:::

### Causal tracing {#sec-tracing}

Meng, Bau, Andonian and Belinkov (2022), *Locating and Editing Factual Associations in GPT*, applied denoising to factual recall. For a prompt such as "The Space Needle is located in the city of", the clean run predicts "Seattle". The corrupted run adds Gaussian noise to the embeddings of the **subject** tokens ("The Space Needle"), so the model no longer knows which entity is meant and the probability of "Seattle" drops. Then, for each layer and each token position, the hidden state from the clean run is restored into the corrupted run, and the recovered probability of the correct answer is recorded — the **indirect effect** of that state. Averaged over many facts, in GPT-2 XL and GPT-J, they reported two regions of high effect: hidden states at the **last subject token** in middle layers, where restoring **MLP outputs** was especially effective, and states at the **last token** of the prompt in late layers, where attention was important. They interpreted the first as the place where mid-layer MLPs recall attributes of the subject, and the second as attention moving that information to the prediction — a hypothesis about where facts are "stored" that motivated the editing method of [[#sec-editing]].

::: example Normalised indirect effect {#ex-trace}
In a causal-tracing experiment, the correct object has probability $0.90$ on the clean prompt and $0.05$ with the subject corrupted. Restoring the MLP output at the last subject token in layer $15$ raises it to $0.60$; restoring it at the last token of the prompt in layer $15$ raises it to $0.08$. Compute the indirect effects and their fractions of the total effect.
::: solution
Total effect $0.90 - 0.05 = 0.85$. Last subject token: $0.60 - 0.05 = 0.55$, a fraction $0.55/0.85 = 0.65$. Last token: $0.08 - 0.05 = 0.03$, a fraction $0.035$. The MLP at the subject position, in that layer, is sufficient (with everything downstream left free to respond) to restore about two-thirds of the effect; the same layer's MLP at the final position contributes almost nothing.
:::
:::

### Attribution patching {#sec-attribution-patching}

Patching every activation one at a time needs one forward pass per activation, which is expensive for large models. **Attribution patching** (Nanda, 2023; Syed, Rager and Conmy, 2023, for edges) replaces each patch by a first-order Taylor approximation, computed for all activations from one forward and one backward pass:

$$
m(x_{\text{clean}}\mid a\leftarrow a(x_{\text{corr}})) - m(x_{\text{clean}})\approx\nabla_am\big|_{x_{\text{clean}}}\cdot\bigl(a(x_{\text{corr}}) - a(x_{\text{clean}})\bigr).
$$ {#eq-atp}

::: proposition Error of attribution patching {#prop-atp}
Let $\varphi(t) = m\bigl(x_{\text{clean}}\mid a\leftarrow a_{\text{clean}} + t(a_{\text{corr}} - a_{\text{clean}})\bigr)$ be the metric along the straight path from the clean to the corrupted value of $a$, and suppose $\varphi$ is twice differentiable with $\lvert\varphi''\rvert\le M$ on $[0,1]$. Then the error of [[#eq-atp]] is at most $M/2$. If $\varphi$ is merely continuous and piecewise linear, the error can be as large as the whole effect.
:::

::: proof
The approximation is $\varphi'(0)$ and the true effect is $\varphi(1) - \varphi(0)$. By Taylor's theorem, $\varphi(1) = \varphi(0) + \varphi'(0) + \tfrac12\varphi''(\tau)$ for some $\tau\in(0,1)$, so the error is $\tfrac12\lvert\varphi''(\tau)\rvert\le M/2$ (as in [[interpretability/interpretability-goals#prop-local]]). For the second statement, the noising of $\{h_3, h_4\}$ in [[#ex-table]] has $\varphi(t) = 2 + 2\min(1, 2 - 2t)$: $\varphi'(0) = 0$ because $\min$ is saturated at $t = 0$, but $\varphi(1) - \varphi(0) = -2$, the full effect.
:::

Attribution patching is therefore reliable for small activation changes in smooth regions and unreliable where the model saturates — softmax attention that has committed to one token, a LayerNorm with large changes of scale, or a residual stream where the corruption is large. Refinements integrate the gradient along the path, which is integrated gradients applied to activations ([[interpretability/probing-attribution#def-ig]]), at the cost of more passes. In practice it is used to screen candidates, which are then checked by actual patching.

### Path patching and causal scrubbing {#sec-paths}

Patching an activation changes everything downstream of it. To test a hypothesis about *how* a component's effect is transmitted, **path patching** (Wang et al., 2023; formalised by Goldowsky-Dill et al., 2023) patches the activation only along specified paths: for instance, the output of head $A$ is patched from the corrupted run *only as it enters the keys of head $B$*, while every other component still receives the clean value. This isolates edges of the computational graph, which is what circuit discovery ([[interpretability/circuits#alg-acdc]]) needs.

**Causal scrubbing** (Chan et al., 2022) turns a whole hypothesis into one test. A hypothesis specifies which parts of the computation matter and what each represents; it implies that certain activations can be *resampled* — replaced by their values on other inputs that agree on everything the hypothesis says matters — without changing the output. Causal scrubbing performs all those resamplings at once and measures how much of the metric survives. A hypothesis that survives scrubbing explains that fraction of the behaviour; one that does not is refuted or incomplete.

**Causal abstraction** (Geiger et al., 2021, and later work), introduced in [[interpretability/interpretability-goals#sec-mechanism]], is the general theory behind these methods: a high-level causal model is a faithful abstraction of the network if interchange interventions on aligned variables have the same effects at both levels, measured by interchange intervention accuracy ([[interpretability/interpretability-goals#def-iia]]). Geiger et al. (2024) showed that activation patching, path patching, causal scrubbing and circuit analysis can be expressed in this framework, and introduced **distributed alignment search** (DAS), which learns a rotation of activation space so that high-level variables align with subspaces rather than neurons. A caution from this line of work: Makelov, Lange and Nanda (2024) showed that subspace patching can produce an **interpretability illusion**, activating a dormant pathway so that the patched subspace appears to carry a variable that the model does not normally use there.

::: warning Patching results depend on the corruption
"Head 9.6 has a large patching effect" means: *for this metric, with this clean–corrupted pair distribution, in this direction (denoising or noising), with everything else held as specified*, changing head 9.6 changes the metric. Change the corruption — swap a different token, add noise instead of substituting, use a different metric (probability instead of logit difference) — and the ranking of components can change, sometimes completely. Report the full experimental design, prefer minimal corruptions that change only the variable of interest, and check conclusions under more than one design.
:::

## Steering {#sec-steering}

Patching tests a hypothesis about a direction or a component; **steering** uses one to change behaviour. If a concept is represented linearly ([[interpretability/superposition#def-superposition]]), adding its direction to the residual stream should make the model behave as if the concept were more present.

::: definition Steering vector, activation addition {#def-steering}
A **steering vector** for a layer $\ell$ is a vector $\mathbf{v}\in\R^d$ added, with a coefficient $\alpha$, to the residual stream at that layer (at all positions, or at selected ones) during the forward pass: $\mathbf{x}_\ell\mapsto\mathbf{x}_\ell + \alpha\mathbf{v}$. A common construction is the **difference of means**: for sets $P$ and $N$ of prompts with and without a property, $\mathbf{v} = \frac{1}{\lvert P\rvert}\sum_{p\in P}\mathbf{x}_\ell(p) - \frac{1}{\lvert N\rvert}\sum_{q\in N}\mathbf{x}_\ell(q)$. **Activation addition** (Turner et al., 2023) uses the difference between the activations of a single contrasting pair of prompts.
:::

Turner et al. (2023), *Activation Addition: Steering Language Models Without Optimization*, computed vectors such as the difference between the activations for "Love" and "Hate" at an early layer of GPT-2 XL and added them while the model generated text, shifting the sentiment and topic of completions without any training; they reported that the method preserved performance on unrelated tasks reasonably well when the coefficient was moderate. Contrastive activation addition (Rimsky, Gabrieli and colleagues, 2024) averaged over many contrastive multiple-choice pairs to steer behaviours such as sycophancy in Llama 2 chat models. Steering with sparse-autoencoder features (Templeton et al., 2024; [[interpretability/sparse-features]]) is the same operation with a feature's decoder direction.

The effect of a steering vector on a logit has a simple first-order description, which also shows its main limitation.

::: proposition Direct effect of a steering vector {#prop-steer}
Suppose a steering vector $\alpha\mathbf{v}$ is added to the residual stream at the last layer, before the final normalisation, and the normalisation is RMSNorm without gain. With $\Delta\mathbf{u}$ the logit-difference direction of two tokens ([[interpretability/residual-stream#prop-dla]]), the new logit difference is
$$
\frac{(\mathbf{x} + \alpha\mathbf{v})\cdot\Delta\mathbf{u}}{\operatorname{RMS}(\mathbf{x} + \alpha\mathbf{v})}.
$$ {#eq-steer}
For small $\alpha$ the change is approximately $\alpha\,\mathbf{v}\cdot\Delta\mathbf{u}/\operatorname{RMS}(\mathbf{x})$ plus a term from the change of scale; as $\alpha\to\infty$ the logit difference tends to $\mathbf{v}\cdot\Delta\mathbf{u}/\operatorname{RMS}(\mathbf{v})$, independent of $\mathbf{x}$.
:::

::: proof
The first statement is the definition of the logits applied to the steered stream. For $\alpha\to\infty$, divide numerator and denominator by $\alpha$: $(\mathbf{x}/\alpha + \mathbf{v})\cdot\Delta\mathbf{u}/\operatorname{RMS}(\mathbf{x}/\alpha + \mathbf{v})\to\mathbf{v}\cdot\Delta\mathbf{u}/\operatorname{RMS}(\mathbf{v})$, since RMS is continuous and positively homogeneous. For small $\alpha$, differentiate at $\alpha = 0$.
:::

Steering is therefore a matter of scale relative to the residual stream: a coefficient that is small compared with $\lVert\mathbf{x}\rVert$ nudges the output; a large one overwrites the stream with the steering direction, and the model's behaviour is dominated by it — coherently for well-chosen directions, but with degraded fluency and capability as $\alpha$ grows. Steering at earlier layers acts through all later computation, so its effect is not given by [[#eq-steer]] alone, and in practice the layer and coefficient are chosen by search.

::: widget plot
f: x/sqrt((s^2 + x^2)/2); x*sqrt(2)/s
x: 0, 10
y: 0, 3
sliders: s=0.5:0.5:6
labels: \text{logit difference after normalisation}; \text{first-order approximation}
caption: The direct effect of steering, [[#eq-steer]], in two dimensions: the stream $\mathbf{x}$ has norm $s$ and no component along the steering direction $\mathbf{v}$, which is a unit vector aligned with $\Delta\mathbf{u}$. The horizontal axis is the coefficient $\alpha$. The logit difference first grows linearly with slope $\sqrt2/s$ and then saturates at $\sqrt2$, when the steering vector dominates the stream. A larger residual norm $s$ needs a proportionally larger coefficient.
:::

::: example A steering calculation {#ex-steer}
At the last layer the residual stream is $\mathbf{x} = (3, 0, 1)$, the steering vector is $\mathbf{v} = (0, 1, 0)$ and $\Delta\mathbf{u} = (0, 2, 1)$. With RMSNorm without gain, compute the logit difference without steering and with $\alpha = 2$.
::: solution
Unsteered: $\operatorname{RMS}(\mathbf{x}) = \sqrt{(9 + 0 + 1)/3} = 1.826$ and $\mathbf{x}\cdot\Delta\mathbf{u} = 1$, giving $0.548$. Steered: $\mathbf{x} + 2\mathbf{v} = (3, 2, 1)$, $\operatorname{RMS} = \sqrt{14/3} = 2.160$, and $(3, 2, 1)\cdot(0, 2, 1) = 5$, giving $2.315$. The first-order estimate $0.548 + 2\times2/1.826 = 2.739$ overshoots, because adding $\mathbf{v}$ also increased the stream's scale.
:::
:::

### Representation engineering {#sec-repe}

Zou et al. (2023), *Representation Engineering: A Top-Down Approach to AI Transparency*, proposed to study high-level properties — honesty, harmfulness, power-seeking, emotions — as directions in activation space found from *populations* of activations, rather than by decomposing the network into circuits. Their **reading** procedure (linear artificial tomography) prompts the model with stimuli designed to elicit a concept, collects activations, and extracts a direction — for example the first principal component of differences between paired activations. **Control** then adds or subtracts such directions, or trains low-rank adapters to move representations along them. They reported, among other results, that a reading vector for honesty could detect some lies told by the model when instructed to lie, and that adding it increased truthful answers on TruthfulQA. Proponents present representation engineering as complementary to bottom-up mechanistic work: coarser, but applicable to properties that may be distributed across many circuits. Critics point out that a direction that correlates with a concept on designed stimuli may encode something else that covaries with it (the stimulus format, the instruction), so causal and out-of-distribution tests are needed — the same caution as for probes.

### The refusal direction {#sec-refusal}

Arditi et al. (2024), *Refusal in Language Models Is Mediated by a Single Direction*, studied thirteen open-weight chat models of up to $72$ billion parameters. They computed a difference-of-means direction between activations on harmful and harmless instructions and reported that, across these models, refusal behaviour was mediated by this one-dimensional subspace: suppressing the direction largely prevented the models from refusing harmful requests, and adding it caused refusals of harmless ones. They also analysed how some jailbreak prompts reduce the direction's expression. The paper's main conclusion concerned robustness: in open-weight models, whoever has the weights can make such interventions, so safety behaviour that is implemented as a single linear feature is fragile — an argument for safety measures that do not rely on fine-tuned refusal alone ([[safety-alignment/robustness-jailbreaks]]). The finding is also an example of how interpretability results cut both ways: understanding a mechanism makes it both easier to monitor and easier to remove.

## Editing knowledge {#sec-editing}

If facts are recalled by mid-layer MLPs at the subject's last token, as causal tracing suggested, then changing one fact might require changing only one MLP's weights. Meng et al. (2022) proposed **ROME** (Rank-One Model Editing), which treats the second matrix $W$ of an MLP as a **linear associative memory**: the MLP's hidden activation at the subject is a **key** $\mathbf{k}$, and $W\mathbf{k}$ is a **value** that, written into the residual stream, encodes the subject's attributes. To make the model believe "The Space Needle is in Paris", ROME computes the key $\mathbf{k}^*$ for the subject and a value $\mathbf{v}^*$ that, by optimisation, makes the model output the new object, and then changes $W$ as little as possible subject to $W'\mathbf{k}^* = \mathbf{v}^*$.

::: theorem The rank-one edit {#thm-rome}
Let $K\in\R^{d_k\times N}$ hold keys as columns and $V\in\R^{d_v\times N}$ the corresponding values, with $C = KK\T$ invertible, and let $W = VK\T C^{-1}$ be the least-squares memory, minimising $\lVert WK - V\rVert_F^2$. Among all $W'$ with $W'\mathbf{k}^* = \mathbf{v}^*$, the one minimising $\lVert W'K - V\rVert_F^2$ is
$$
W' = W + \frac{(\mathbf{v}^* - W\mathbf{k}^*)\,(C^{-1}\mathbf{k}^*)\T}{(\mathbf{k}^*)\T C^{-1}\mathbf{k}^*}.
$$ {#eq-rome}
:::

::: proof
Write $W' = W + \Delta$. Then $\lVert W'K - V\rVert_F^2 = \lVert\Delta K\rVert_F^2 + 2\operatorname{tr}\bigl((\Delta K)\T(WK - V)\bigr) + \lVert WK - V\rVert_F^2$. The cross term is $2\operatorname{tr}\bigl(\Delta\,K(WK - V)\T\bigr)$, and $K(WK - V)\T = (WKK\T - VK\T)\T = (VK\T C^{-1}C - VK\T)\T = 0$ — the normal equations of the least-squares fit. So we must minimise $\lVert\Delta K\rVert_F^2 = \operatorname{tr}(\Delta C\Delta\T)$ subject to $\Delta\mathbf{k}^* = \mathbf{r}$, where $\mathbf{r} = \mathbf{v}^* - W\mathbf{k}^*$. The objective is a convex quadratic in $\Delta$ (as $C$ is positive definite) and the constraint is linear, so a stationary point of the Lagrangian $\operatorname{tr}(\Delta C\Delta\T) - 2\boldsymbol\lambda\T(\Delta\mathbf{k}^* - \mathbf{r})$ is the global minimiser. Setting its gradient with respect to $\Delta$ to zero gives $2\Delta C - 2\boldsymbol\lambda(\mathbf{k}^*)\T = 0$, i.e. $\Delta = \boldsymbol\lambda(C^{-1}\mathbf{k}^*)\T$ ($C$ is symmetric). The constraint gives $\boldsymbol\lambda\,(\mathbf{k}^*)\T C^{-1}\mathbf{k}^* = \mathbf{r}$, so $\boldsymbol\lambda = \mathbf{r}/((\mathbf{k}^*)\T C^{-1}\mathbf{k}^*)$, which is [[#eq-rome]].
:::

In ROME, $C$ is estimated from keys collected over a large text sample, so "changing the other stored associations as little as possible" is measured over typical inputs. The update direction $C^{-1}\mathbf{k}^*$ is the key "whitened" by the key statistics: it moves the memory mostly in directions that ordinary keys rarely occupy, which protects common associations.

::: example A rank-one edit in two dimensions {#ex-rome}
Let $W = I_2$, $C = \operatorname{diag}(4, 1)$ (keys vary four times more along the first axis), $\mathbf{k}^* = (1, 1)$ and $\mathbf{v}^* = (0, 2)$. Compute the ROME update and the naive update $\mathbf{r}(\mathbf{k}^*)\T/\lVert\mathbf{k}^*\rVert^2$, and their effects on the keys $(1, 0)$ and $(0, 1)$.
::: solution
$\mathbf{r} = \mathbf{v}^* - W\mathbf{k}^* = (-1, 1)$. $C^{-1}\mathbf{k}^* = (0.25, 1)$ and $(\mathbf{k}^*)\T C^{-1}\mathbf{k}^* = 1.25$, so $\Delta_{\text{ROME}} = (-1, 1)\T(0.25, 1)/1.25 = \begin{pmatrix}-0.2 & -0.8\\ 0.2 & 0.8\end{pmatrix}$. Check: $\Delta_{\text{ROME}}\mathbf{k}^* = (-1, 1) = \mathbf{r}$. The naive update is $(-1, 1)\T(1, 1)/2 = \begin{pmatrix}-0.5 & -0.5\\ 0.5 & 0.5\end{pmatrix}$. On the key $(1, 0)$ — the common direction — ROME changes the output by $(-0.2, 0.2)$, the naive update by $(-0.5, 0.5)$; on $(0, 1)$, ROME by $(-0.8, 0.8)$, naive by $(-0.5, 0.5)$. The total squared change weighted by the key statistics, $\operatorname{tr}(\Delta C\Delta\T) = \lVert\Delta K\rVert_F^2$, is $1.6$ for ROME and $2.5$ for the naive update. ROME concentrates the change where typical keys are rare.
:::
:::

### What editing reveals, and its side effects {#sec-side}

ROME was evaluated on **efficacy** (the new fact is produced), **generalisation** (it holds under paraphrases of the prompt) and **specificity** (facts about other subjects are unchanged), using the CounterFact dataset, and performed well on them. MEMIT (Meng et al., 2023) extended the update to thousands of facts at once, spread across several layers. Later work found limitations:

- **Localisation does not predict editing success.** Hase et al. (2023), *Does Localization Inform Editing?*, found that the layers where causal tracing localises a fact are no better places to edit it than other layers: editing success was largely unrelated to the tracing results. Causal tracing finds where information is *present* in a way that is sufficient to restore the output, which need not be where it is best changed.
- **Ripple effects.** An edited fact should change its consequences ("the Space Needle is in Paris" implies it is in France). Cohen et al. (2024) built the RippleEdits benchmark and found that editing methods often failed to propagate edits to related facts, and could produce inconsistent knowledge.
- **Degradation under many edits.** Gupta, Rao and Anumanchipalli (2024) reported that sequential editing with ROME or MEMIT gradually, and sometimes suddenly, degraded the model's general abilities, including a "disabling edit" after which the model's outputs collapsed.
- **Specificity is measured narrowly.** Edits can affect related subjects or unrelated prompts sharing surface features, which standard specificity tests (other subjects with the same relation) do not catch.

These results bear on interpretation as much as on engineering: if facts were stored in a single, localised memory, local edits would behave cleanly. Their partial success suggests that factual knowledge is localised to a useful but limited degree, consistent with the redundancy seen in circuits.

::: quiz
Causal tracing shows that restoring the MLP output at the last subject token in layer $18$ recovers $70\%$ of the probability of the correct object. Which conclusion is justified?
- [ ] The fact is stored in layer $18$, and editing that layer is the best way to change it.
- [x] Restoring that activation is sufficient, with the rest of the corrupted run left to respond, to recover much of the behaviour; other layers may also carry the information, and the best layer to edit must be tested separately.
- [ ] Ablating that MLP would remove $70\%$ of the probability.
- [ ] The other layers play no role in recalling the fact.
::: solution
Causal tracing is denoising: it measures sufficiency of one restored state, not necessity (which noising or ablation would test, [[#prop-additive]]), and not the best place to intervene — Hase et al. (2023) found tracing results poorly predicted where edits succeed.
:::
:::

## A numerical laboratory {#sec-code}

The first part of the listing computes denoising, noising and attribution-patching estimates for the network of [[#ex-table]], for single units and for pairs. The second part builds a least-squares linear associative memory with $40$ key–value pairs in $8$ dimensions, with keys that vary more along two axes than the others, and edits the value of one key with the naive rank-one update and with the ROME update of [[#thm-rome]], measuring the change in the outputs for the other $39$ keys.

```python
import math, random
rng = random.Random(7)

# ---- 1. Patching a toy network with an AND and a redundant OR -----------------------
# Hidden units h1..h4 copy the inputs (h3 and h4 both copy x3); the metric is
#   m = 2 ReLU(h1 + h2 - 1) + 2 min(1, h3 + h4)
def metric(h): return 2 * max(0.0, h[0] + h[1] - 1) + 2 * min(1.0, h[2] + h[3])
def hidden(x): return [x[0], x[1], x[2], x[2]]
clean, corrupt = hidden([1, 1, 1]), hidden([0, 0, 0])
m_clean, m_corr = metric(clean), metric(corrupt)
print(f"clean metric {m_clean:.1f}, corrupted {m_corr:.1f}")

def patch(base, src, units): return [src[i] if i in units else base[i] for i in range(4)]
def directional_grad(h, target, eps=1e-6):     # d m / d t along h + t (target - h), per unit, at t = 0
    out = []
    for i in range(4):
        hp = list(h); hp[i] += eps * (target[i] - h[i])
        out.append((metric(hp) - metric(h)) / eps)
    return out
ap = directional_grad(clean, corrupt)          # attribution patching: first-order estimate of noising
for units in [(0,), (1,), (2,), (3,), (0, 1), (2, 3)]:
    den = metric(patch(corrupt, clean, units)) - m_corr     # denoising: clean values into corrupted run
    noi = metric(patch(clean, corrupt, units)) - m_clean    # noising: corrupted values into clean run
    name = "+".join(f"h{i + 1}" for i in units)
    print(f"{name:6s} denoising {den:+.1f}   noising {noi:+.1f}   attribution patching {sum(ap[i] for i in units):+.1f}")

# ---- 2. A rank-one edit of a linear associative memory (ROME-style) ----------------
DK, DV, N = 8, 8, 40
keys = [[rng.gauss(0, 1) * (2.0 if j < 2 else 0.5) for j in range(DK)] for _ in range(N)]   # anisotropic
vals = [[rng.gauss(0, 1) for _ in range(DV)] for _ in range(N)]
def matmul(A, B): return [[sum(a * b for a, b in zip(r, c)) for c in zip(*B)] for r in A]
def T(A): return [list(r) for r in zip(*A)]
def inverse(A):                                 # Gauss-Jordan elimination with partial pivoting
    n = len(A); M = [row[:] + [float(i == j) for j in range(n)] for i, row in enumerate(A)]
    for c in range(n):
        p = max(range(c, n), key=lambda r: abs(M[r][c])); M[c], M[p] = M[p], M[c]
        piv = M[c][c]; M[c] = [v / piv for v in M[c]]
        for r in range(n):
            if r != c:
                f = M[r][c]; M[r] = [a - f * b for a, b in zip(M[r], M[c])]
    return [row[n:] for row in M]
K, V = T(keys), T(vals)                         # (DK, N), (DV, N)
C = matmul(K, T(K))                             # key second-moment matrix, (DK, DK)
Cinv = inverse(C)
W = matmul(matmul(V, T(K)), Cinv)               # least-squares memory: W = V K^T (K K^T)^-1, (DV, DK)
def apply(W, k): return [sum(w * x for w, x in zip(row, k)) for row in W]
def dist(a, b): return math.sqrt(sum((x - y) ** 2 for x, y in zip(a, b)))

k_star = keys[0]                                # edit the value stored for key 0
v_star = [rng.gauss(0, 1) for _ in range(DV)]
r = [a - b for a, b in zip(v_star, apply(W, k_star))]          # residual v* - W k*
def rank_one(u):                                # W + r u^T / (u . k*): satisfies W' k* = v*
    s = sum(a * b for a, b in zip(u, k_star))
    return [[W[i][j] + r[i] * u[j] / s for j in range(DK)] for i in range(DV)]
naive = rank_one(k_star)                        # update along k* itself
rome = rank_one(apply(Cinv, k_star))            # update along C^-1 k* (the constrained optimum)
for name, W2 in [("naive", naive), ("ROME ", rome)]:
    err = dist(apply(W2, k_star), v_star)
    side = sum(dist(apply(W2, k), apply(W, k)) ** 2 for k in keys[1:])
    print(f"{name} edit: |W' k* - v*| = {err:.1e}, total squared change on the other {N - 1} keys = {side:.3f}")
```

```text
clean metric 4.0, corrupted 0.0
h1     denoising +0.0   noising -2.0   attribution patching -2.0
h2     denoising +0.0   noising -2.0   attribution patching -2.0
h3     denoising +2.0   noising +0.0   attribution patching +0.0
h4     denoising +2.0   noising +0.0   attribution patching +0.0
h1+h2  denoising +2.0   noising -2.0   attribution patching -4.0
h3+h4  denoising +2.0   noising -2.0   attribution patching +0.0
naive edit: |W' k* - v*| = 3.1e-16, total squared change on the other 39 keys = 591.694
ROME  edit: |W' k* - v*| = 3.4e-16, total squared change on the other 39 keys = 142.457
```

Single-unit denoising misses $h_1, h_2$ and single-unit noising misses $h_3, h_4$, as [[#prop-additive]] predicts; patching the pairs recovers both mechanisms. Attribution patching matches single-unit noising here but fails for the pairs in both directions: it doubles the effect of the conjunction ($-4$ against $-2$), because the linear approximation adds the two units' gradients although the ReLU floors the output at $0$, and it misses the redundant pair completely ($0$ against $-2$), because the $\min$ is saturated at the clean point. Both edits store the new value exactly, but the ROME update changes the other associations about four times less than the naive one, since it minimises exactly that change.

::: history
Causal mediation analysis was formalised by Robins and Greenland (1992) and Pearl (2001); Vig et al. (2020) applied it to gender bias in Transformer language models, and Geiger et al. (2021) introduced causal abstraction and interchange interventions for neural networks. Meng et al. (2022) introduced causal tracing and ROME, and MEMIT followed in 2023; Hase et al. (2023) questioned the link between localisation and editing. Chan et al. (2022) proposed causal scrubbing, Wang et al. (2023) path patching, Goldowsky-Dill et al. (2023) its general form, Nanda (2023) attribution patching, and Geiger et al. (2024) distributed alignment search; Makelov et al. (2024) warned of subspace-patching illusions, and Heimersheim and Nanda (2024) and Zhang and Nanda (2024) codified best practice. Steering grew from latent-space arithmetic in generative models; Turner et al. (2023) introduced activation addition for language models, Zou et al. (2023) representation engineering, Li et al. (2023) inference-time intervention on truthfulness heads, Rimsky et al. (2024) contrastive activation addition, and Arditi et al. (2024) the refusal direction. Wu et al.'s AxBench (2025) compared steering methods systematically.
:::

::: summary
- **Activation patching** sets an activation to its value on another input. **Denoising** (clean into corrupted) tests sufficiency, **noising** (corrupted into clean) necessity; they agree only for additive mechanisms, and disagree for conjunctions (AND) and redundancy (OR, backup components). Patch sets as well as single components.
- **Causal tracing** (Meng et al., 2022) restores hidden states after corrupting the subject and found mid-layer MLPs at the last subject token important for factual recall. **Attribution patching** approximates patching to first order, with error $\le M/2$ for smooth paths but unreliable under saturation. **Path patching**, **causal scrubbing** and **causal abstraction** test hypotheses about paths and whole mechanisms; ablation and corruption choices change conclusions.
- **Steering** adds a vector, often a **difference of means**, to the residual stream; its direct effect grows linearly and then saturates relative to the stream's norm. **Representation engineering** reads and controls population-level directions. Refusal in many open-weight chat models was found to be mediated by a **single direction** (Arditi et al., 2024), which bears on the robustness of safety fine-tuning.
- **ROME** edits a fact by the rank-one update $W' = W + \mathbf{r}(C^{-1}\mathbf{k}^*)\T/((\mathbf{k}^*)\T C^{-1}\mathbf{k}^*)$, the minimal change to a least-squares memory; edits can fail to propagate, degrade models when repeated, and do not depend on tracing-based localisation as expected.
:::

## Exercises

::: exercise A normalised patching effect {level=1 check="0.6"}
The clean logit difference is $3.0$ and the corrupted $-1.0$. Denoising a head's output gives $1.4$. What fraction of the total effect does the head restore?
::: solution
Total effect $3.0 - (-1.0) = 4.0$; restored $1.4 - (-1.0) = 2.4$; fraction $2.4/4.0 = 0.6$.
:::
:::

::: exercise Denoising and noising of a conjunction {level=1}
Let $m = a_1a_2a_3$ with clean $(1, 1, 1)$ and corrupted $(0, 0, 0)$. Give the denoising and noising effects of each single unit and of the pair $\{a_1, a_2\}$.
::: solution
Single unit, denoising: only one factor is $1$, so $m = 0$ and the effect is $0$. Noising: one factor is $0$, so $m = 0$ and the effect is $-1$. Pair $\{a_1, a_2\}$: denoising leaves $a_3 = 0$, effect $0$; noising gives $m = 0$, effect $-1$. Only denoising all three units shows the full effect; every noising of any non-empty subset shows it.
:::
:::

::: exercise A steering coefficient {level=1 check="sqrt(2)"}
In the setting of the steering figure, the stream has norm $s$, the steering direction is a unit vector orthogonal to the stream and aligned with $\Delta\mathbf{u}$ (a unit vector), and $d = 2$. To what value does the logit difference tend as $\alpha\to\infty$?
::: solution
By [[#prop-steer]], the limit is $\mathbf{v}\cdot\Delta\mathbf{u}/\operatorname{RMS}(\mathbf{v}) = 1/\sqrt{1/2} = \sqrt2$, whatever $s$ is.
:::
:::

::: exercise Error of attribution patching {level=2}
For $\varphi(t) = \sigma(4 - 8t)$ (a logistic function of the patching path), compute the true effect $\varphi(1) - \varphi(0)$ and the attribution-patching estimate $\varphi'(0)$. Explain the discrepancy in terms of [[#prop-atp]].
::: solution
$\varphi(0) = \sigma(4) = 0.982$, $\varphi(1) = \sigma(-4) = 0.018$, so the true effect is $-0.964$. $\varphi'(0) = -8\sigma(4)(1 - \sigma(4)) = -8\times0.982\times0.018 = -0.141$. The estimate captures only $15\%$ of the effect, because at $t = 0$ the logistic is saturated: its slope there is small although the function falls steeply in the middle of the path. The second derivative reaches about $8^2\times0.096 = 6.2$ in absolute value, so the bound $M/2\approx3.1$ is loose but consistent with an error of $0.82$.
:::
:::

::: exercise Verifying the rank-one update {level=2}
Verify directly that $W'$ in [[#eq-rome]] satisfies $W'\mathbf{k}^* = \mathbf{v}^*$, and show that for any key $\mathbf{k}$ with $(C^{-1}\mathbf{k}^*)\cdot\mathbf{k} = 0$ the edit leaves $W\mathbf{k}$ unchanged. Describe the set of such keys when $C = I$.
::: solution
$W'\mathbf{k}^* = W\mathbf{k}^* + (\mathbf{v}^* - W\mathbf{k}^*)\,\frac{(C^{-1}\mathbf{k}^*)\cdot\mathbf{k}^*}{(\mathbf{k}^*)\T C^{-1}\mathbf{k}^*} = W\mathbf{k}^* + \mathbf{v}^* - W\mathbf{k}^* = \mathbf{v}^*$. For a key with $(C^{-1}\mathbf{k}^*)\cdot\mathbf{k} = 0$, the update term is multiplied by $0$, so $W'\mathbf{k} = W\mathbf{k}$. When $C = I$, these are the keys orthogonal to $\mathbf{k}^*$: the edit changes outputs only for keys with a component along $\mathbf{k}^*$, in proportion to that component. For general $C$ the protected set is the hyperplane orthogonal to $C^{-1}\mathbf{k}^*$, which is "orthogonal to $\mathbf{k}^*$" in the inner product defined by the key statistics.
:::
:::

::: exercise Choosing a corruption {level=2}
You want to find which components of a model determine the gender of the pronoun in "The nurse said that ___". Propose a clean–corrupted pair design and a metric, and explain why adding Gaussian noise to the word "nurse" would be a worse corruption.
::: solution
Use minimal pairs that differ only in the gender cue, for example "The nurse said that" versus "The man said that" or, better for controlled comparisons, pairs of occupation words matched in frequency and tokenisation; or pairs that differ in an explicit cue ("Mary, the nurse, said that" / "John, the nurse, said that"). Metric: the logit difference $\text{logit}(\text{she}) - \text{logit}(\text{he})$. Patch in both directions. Gaussian noise destroys *all* information about the subject — its identity, its frequency, even that it is a noun — and produces activations off the model's normal distribution, so components that react to the noise itself, or that carry any information about the subject, would show effects; a minimal substitution changes only the variable of interest and keeps the inputs natural.
:::
:::

::: exercise The cost of a rank-one edit {level=2 check="1.6"}
Show that for any update $\Delta = \mathbf{r}\,\mathbf{u}\T/(\mathbf{u}\cdot\mathbf{k}^*)$ the cost is $\operatorname{tr}(\Delta C\Delta\T) = \lVert\mathbf{r}\rVert^2\,\mathbf{u}\T C\mathbf{u}/(\mathbf{u}\cdot\mathbf{k}^*)^2$, and deduce that the ROME update ($\mathbf{u} = C^{-1}\mathbf{k}^*$) costs $\lVert\mathbf{r}\rVert^2/((\mathbf{k}^*)\T C^{-1}\mathbf{k}^*)$. Evaluate it for [[#ex-rome]].
::: solution
$\Delta C\Delta\T = \mathbf{r}\,(\mathbf{u}\T C\mathbf{u})\,\mathbf{r}\T/(\mathbf{u}\cdot\mathbf{k}^*)^2$, whose trace is $\lVert\mathbf{r}\rVert^2\,\mathbf{u}\T C\mathbf{u}/(\mathbf{u}\cdot\mathbf{k}^*)^2$. With $\mathbf{u} = C^{-1}\mathbf{k}^*$, $\mathbf{u}\T C\mathbf{u} = (\mathbf{k}^*)\T C^{-1}\mathbf{k}^*$ and $\mathbf{u}\cdot\mathbf{k}^* = (\mathbf{k}^*)\T C^{-1}\mathbf{k}^*$, so the cost is $\lVert\mathbf{r}\rVert^2/((\mathbf{k}^*)\T C^{-1}\mathbf{k}^*)$. In [[#ex-rome]], $\lVert\mathbf{r}\rVert^2 = 2$ and $(\mathbf{k}^*)\T C^{-1}\mathbf{k}^* = 1.25$, so the cost is $1.6$. For the naive update, $\mathbf{u} = \mathbf{k}^*$ gives $2\times5/2^2 = 2.5$. By the Cauchy–Schwarz inequality in the inner product defined by $C$, $(\mathbf{u}\cdot\mathbf{k}^*)^2\le(\mathbf{u}\T C\mathbf{u})((\mathbf{k}^*)\T C^{-1}\mathbf{k}^*)$, so no $\mathbf{u}$ beats ROME — another proof of [[#thm-rome]] for rank-one updates.
:::
:::

::: exercise When steering vectors fail {level=3}
A difference-of-means vector for "formal versus casual" is computed at layer $10$ from $200$ formal and $200$ casual prompts. Adding it with $\alpha = 4$ makes outputs more formal, but also more often off-topic. Give three possible explanations and an experiment to test each.
::: solution
(1) *The vector mixes concepts*: the formal prompts may differ from the casual ones in topic (business versus personal), so the difference of means contains a topic direction. Test: recompute the vector from topic-matched pairs and compare off-topic rates; or project out a topic direction estimated separately. (2) *The coefficient is too large relative to the residual norm*, overwriting the information the model needs to stay on topic ([[#prop-steer]]). Test: sweep $\alpha$ and plot formality and topical relevance against it; normalise $\alpha$ by the average residual norm at layer $10$. (3) *The layer is wrong*: at layer $10$ the direction may be entangled with content that later layers use for topic, while a later layer may separate style. Test: compute and apply vectors at several layers, comparing the trade-off curves; and use activation patching to check whether the formality information at layer $10$ is read by later components in the way the steering assumes.
:::
:::

::: exercise Sufficiency, necessity and backup heads {level=3}
A circuit has a main head $A$ and a backup head $B$ that copies the answer only when $A$'s output is missing. Model this as $m = \max(a, b\cdot[a = 0])$ with $a, b\in\{0, 1\}$. Compute the noising effects of $A$, $B$ and $\{A, B\}$, and the denoising effects, with clean $(1, 1)$ and corrupted $(0, 0)$. Which experiments reveal $B$, and how does this relate to self-repair?
::: solution
$m(\text{clean}) = \max(1, 0) = 1$ (since $a = 1$, the backup term is $0$); $m(\text{corr}) = 0$. Noising $A$: $(0, 1)$ gives $\max(0, 1) = 1$, effect $0$ — the backup compensates. Noising $B$: $(1, 0)$ gives $1$, effect $0$. Noising both: $0$, effect $-1$. Denoising $A$: $(1, 0)$ gives $1$, effect $+1$. Denoising $B$: $(0, 1)$ gives $1$, effect $+1$. Denoising both: $1$. Single-unit noising reveals neither head; joint noising or single-unit denoising reveals both. In the real IOI study, ablating the main name movers barely reduced performance because backup heads changed their behaviour — **self-repair** — and the backups were found by looking at what changed after the ablation, i.e. by comparing the two runs component by component.
:::
:::
