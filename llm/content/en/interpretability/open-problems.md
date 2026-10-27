The previous chapters presented methods that work: probes that read properties from activations, circuits reverse-engineered end to end in small models, sparse dictionaries with millions of interpretable features, interventions that steer behaviour and edit facts. They also showed, repeatedly, where each method stops working. This final chapter collects those limits into the open problems of the field as of 2026, and presents the competing views about what interpretability can be expected to achieve. Its organising question is the one that motivated the course: can understanding a model's internals tell us things about its behaviour — especially its safety — that testing its behaviour cannot?

The chapter treats five problems. **Scalability**: the methods that produced complete explanations did so for small models and narrow behaviours. **Completeness and dark matter**: sparse dictionaries explain part of the activations, and the unexplained part may matter. **Faithfulness**: explanations built on replacement models and automated labels can be wrong in ways that are hard to see, and errors compound through layers. **Use for safety and auditing**: detectors built from internals face base rates, multiple comparisons and adversarial pressure, and the evidence from auditing studies is encouraging but limited. **Reasoning traces**: for models that think in text, interpretability of the computation and of the chain of thought meet. The survey *Open Problems in Mechanistic Interpretability* (Sharkey et al., 2025), written by researchers from many groups, is the main reference; the positions below are attributed to their proponents, and dated, because they are changing.

## Scalability {#sec-scale}

Every complete mechanistic explanation in this course concerns a small model or a narrow task: induction heads in two-layer attention-only models, modular addition in a one-layer model, indirect-object identification in GPT-2 small (124 million parameters). Studies of larger models found identifiable components but less complete explanations: Lieberum et al. (2023) analysed multiple-choice answering in the 70-billion-parameter Chinchilla model and found heads that attend to and output the correct letter, but the mechanism became harder to describe precisely once the task was varied. Three costs grow with scale.

- **Compute.** Dictionaries large enough to cover a production model's concepts have tens of millions of latents per layer ([[interpretability/sparse-features]]); training them needs billions of tokens of activations, and doing so for every layer multiplies the cost.
- **Human attention.** Explanations must eventually be read and checked by people, and the number of features, circuits and prompts outgrows any team.
- **Composition.** A behaviour of a large model typically involves many features across many layers. Attribution graphs for single prompts can have thousands of nodes before pruning, and their authors reported satisfying explanations for only a minority of the prompts they tried (Ameisen et al., 2025).

::: example How long would it take to read a dictionary? {#ex-reading}
A dictionary has $34$ million latents. If a researcher spends one minute per latent checking its automated description against examples, how many person-years of work is that, at $2000$ working hours a year?
::: solution
$34\times10^6$ minutes is $566{,}667$ hours, or $566{,}667/2000\approx283$ person-years — for one layer of one model. Human review must therefore be targeted (features relevant to a question) or replaced by automated review whose own reliability must be checked. This is why **automated interpretability** — language-model agents that propose and test hypotheses about features and circuits (for example the FIND benchmark of Schwettmann et al., 2023, and the MAIA agent of Shaham et al., 2024) — is regarded as necessary for scaling, and why its faithfulness is itself an open problem.
:::
:::

A related question is whether the units of analysis scale. Neurons failed because of superposition ([[interpretability/superposition]]); attention heads are sometimes interpretable and sometimes not; sparse features are the current best candidate, but they split with dictionary size and differ between training seeds. Proposals for different units include **parameter decomposition** methods, which decompose the weights rather than the activations into simple components that each implement one mechanism (Braun et al., 2025, and related work), and training models to be more interpretable from the start, for example with sparsity in their weights or architecture. As of 2026 none has been shown to scale to frontier models.

## Completeness and dark matter {#sec-dark}

A sparse dictionary reconstructs activations with some error. The question is what that error contains. If it is unstructured noise, the dictionary captures everything the model uses. If it contains features the dictionary missed, an explanation built from the dictionary is incomplete — and the missing part could be exactly what matters for a rare, dangerous behaviour.

Engels, Riggs and Tegmark (2024), in *Decomposing the Dark Matter of Sparse Autoencoders*, proposed to split the reconstruction error by asking how much of it can be predicted, by a linear map, from the activation itself.

::: proposition Decomposing the reconstruction error {#prop-dark}
Let $\mathbf{e} = \mathbf{x} - \hat{\mathbf{x}}$ be the reconstruction error of a dictionary on activations $\mathbf{x}$ (centred, with finite second moments), and let $\hat{\mathbf{e}} = A\mathbf{x}$ be the least-squares linear prediction of $\mathbf{e}$ from $\mathbf{x}$. Then
$$
\E\lVert\mathbf{e}\rVert^2 = \E\lVert\hat{\mathbf{e}}\rVert^2 + \E\lVert\mathbf{e} - \hat{\mathbf{e}}\rVert^2.
$$ {#eq-dark}
The first term is the **linearly predictable** error; the second is the error that no linear function of $\mathbf{x}$ predicts.
:::

::: proof
The least-squares $A$ satisfies the normal equations $\E[(\mathbf{e} - A\mathbf{x})\mathbf{x}\T] = 0$. Hence $\E[(\mathbf{e} - \hat{\mathbf{e}})\T\hat{\mathbf{e}}] = \operatorname{tr}\bigl(A\,\E[\mathbf{x}(\mathbf{e} - A\mathbf{x})\T]\bigr) = 0$: the residual is orthogonal to the prediction. Expanding $\lVert\mathbf{e}\rVert^2 = \lVert\hat{\mathbf{e}} + (\mathbf{e} - \hat{\mathbf{e}})\rVert^2$ and taking expectations, the cross term vanishes, which is [[#eq-dark]].
:::

A linearly predictable error means that the dictionary is systematically missing directions that are present in a predictable way — features it could, in principle, have represented. Engels et al. reported that a large fraction of SAE error was linearly predictable, and that this part shrank only slowly as dictionaries grew; they argued that some error reflects features that the dictionary systematically fails to learn, rather than noise. Combined with downstream-loss results — splicing a reconstruction into a model raises its loss noticeably even for very large dictionaries — the evidence suggests that, as of 2026, dictionaries capture much but not all of what a model represents.

::: example How much of the error is dark matter? {#ex-dark}
An SAE has $\operatorname{FVU} = 0.12$ on a layer whose activations have total variance $100$ (so $\E\lVert\mathbf{e}\rVert^2 = 12$). A linear map from $\mathbf{x}$ predicts the error with $\E\lVert\mathbf{e} - \hat{\mathbf{e}}\rVert^2 = 7.2$. Split the error and interpret.
::: solution
By [[#eq-dark]], the predictable part is $12 - 7.2 = 4.8$, i.e. $40\%$ of the error and $4.8\%$ of the total variance; the remaining $7.2$ ($7.2\%$ of the variance) is not linearly predictable from $\mathbf{x}$. The first part points to structure the dictionary missed (a larger or better-trained dictionary might capture it); the second could be noise, non-linear structure, or features too rare to have been learned. Neither number says how much of the *behaviour* depends on the error — for that, splice in $\hat{\mathbf{x}}$ and measure the downstream loss, or patch the error term and measure its effect on a task metric.
:::
:::

Coverage of rare concepts is a second aspect of completeness. A dictionary can only learn a feature that occurs often enough in its training activations. Templeton et al. (2024) reported that whether a concept got a dedicated feature depended on its frequency in the training data: frequent entities had features in their smaller dictionaries, rarer ones only in larger ones. The behaviours of greatest concern for safety — a rarely triggered backdoor, a plan expressed only in unusual circumstances — are rare by nature.

::: example Seeing a rare concept {#ex-poisson}
A concept appears on average once per $10^8$ tokens. An SAE is trained on $10^9$ tokens. Using a Poisson model, what is the expected number of occurrences, and the probability of at least five? Repeat for a concept appearing once per $5\times10^8$ tokens.
::: solution
Expected occurrences $\mu = 10^9/10^8 = 10$; $\Prob(N\ge5) = 1 - \sum_{k=0}^4e^{-10}10^k/k! = 0.971$. For the rarer concept $\mu = 2$ and $\Prob(N\ge5) = 1 - \sum_{k=0}^4e^{-2}2^k/k! = 0.053$. Whether a handful of occurrences is enough for a dedicated latent depends on the method and the dictionary size, but a concept seen twice in a billion tokens is unlikely to get one. Training on more data, or on data enriched for concepts of interest, helps; neither guarantees coverage of behaviours nobody anticipated.
:::
:::

## Faithfulness of explanations {#sec-faithful}

Interpretability produces explanations at several removes from the model: a latent is a direction learned by an SAE; its description is written by a language model from examples; a circuit is traced through a replacement model in which transcoders stand in for MLPs; and a summary of the circuit is written by a person. Each step can introduce errors that the next step cannot see. The faithfulness–plausibility distinction of [[interpretability/interpretability-goals#sec-faithful]] applies at every step.

**Replacement models.** Attribution graphs are computed in a model where every MLP is replaced by a transcoder; the replacement differs from the original by an error at every layer, and the errors propagate.

::: proposition Error accumulation through replaced layers {#prop-accumulate}
Let $F = f_L\circ\cdots\circ f_1$, where each $f_\ell$ is $\rho_\ell$-Lipschitz, and let $G = g_L\circ\cdots\circ g_1$ be a replacement with $\lVert g_\ell(\mathbf{h}) - f_\ell(\mathbf{h})\rVert\le\delta_\ell$ for all $\mathbf{h}$. Then for every input $\mathbf{x}$,
$$
\lVert G(\mathbf{x}) - F(\mathbf{x})\rVert\le\sum_{\ell=1}^L\delta_\ell\prod_{k=\ell+1}^L\rho_k.
$$ {#eq-accumulate}
:::

::: proof
Let $\mathbf{h}_\ell$ and $\mathbf{h}'_\ell$ be the states after $\ell$ layers of $F$ and $G$, with $\mathbf{h}_0 = \mathbf{h}'_0 = \mathbf{x}$, and $\epsilon_\ell = \lVert\mathbf{h}'_\ell - \mathbf{h}_\ell\rVert$. Then $\epsilon_\ell = \lVert g_\ell(\mathbf{h}'_{\ell-1}) - f_\ell(\mathbf{h}_{\ell-1})\rVert\le\lVert g_\ell(\mathbf{h}'_{\ell-1}) - f_\ell(\mathbf{h}'_{\ell-1})\rVert + \lVert f_\ell(\mathbf{h}'_{\ell-1}) - f_\ell(\mathbf{h}_{\ell-1})\rVert\le\delta_\ell + \rho_\ell\epsilon_{\ell-1}$. With $\epsilon_0 = 0$, unrolling the recursion gives $\epsilon_L\le\sum_\ell\delta_\ell\prod_{k>\ell}\rho_k$.
:::

For residual blocks $\mathbf{h}\mapsto\mathbf{h} + F_\ell(\mathbf{h})$, the Lipschitz constant is at least $1$, so worst-case errors can only grow with depth. The bound is a worst case; typical errors are much smaller, as the laboratory shows, but they are not zero, and the published attribution-graph methods include explicit **error nodes** so that the unexplained part of each layer is visible rather than silently dropped. Whether a mechanism found in the replacement model is the model's mechanism must then be checked on the model itself, by intervening on the original activations — and Ameisen et al. reported such checks for their case studies, with good agreement in some and partial agreement in others.

::: example A geometric error bound {#ex-bound}
Eight layers are replaced, each with error at most $\delta = 0.05$, and every layer is $1.2$-Lipschitz. Evaluate the bound of [[#prop-accumulate]]. What is it if the layers are $1$-Lipschitz?
::: solution
$\sum_{\ell=1}^80.05\times1.2^{8-\ell} = 0.05\,(1.2^8 - 1)/(1.2 - 1) = 0.05\times3.30/0.2 = 0.825$, against $8\times0.05 = 0.40$ for $1$-Lipschitz layers. Amplification by $20\%$ per layer doubles the worst case over eight layers; over $60$ layers it would multiply it by thousands.
:::
:::

**Automated descriptions.** A description that scores well on simulation can still be wrong about the latent's role: it may describe the most frequent activating contexts and miss weaker activations, or describe what the latent responds to (its input side) but not what it does (its output side). Studies that compared descriptions with interventions found that the two can diverge (for example, features whose top activations suggest one concept but whose causal effect on outputs is different). As explanation pipelines become more automated, errors in the language models writing descriptions become errors in the science.

**Illusions.** Several published "interpretability illusions" show how plausible results can arise from the method: directions that look meaningful on one dataset and different on another (Bolukbasi et al., 2021), subspace patches that activate dormant pathways (Makelov et al., 2024), and SAEs on randomly initialised models producing latents with high automated interpretability scores (Heap et al., 2025). A widely shared recommendation is to validate methods on **model organisms** whose ground truth is known by construction — models trained or compiled to implement a specified algorithm (for example Tracr, Lindner et al., 2023, which compiles programs into Transformer weights) or to carry a planted behaviour — before trusting them on models whose ground truth is unknown.

::: warning A clean story is a hypothesis to test, not a result
An interpretability result typically arrives as a narrative: these features, connected in this way, implement this behaviour. The narrative can be wrong at every level — the features may be artefacts of the dictionary, the descriptions may be incomplete, the connections may hold only in the replacement model, and the behaviour may have other mechanisms on other inputs. Results that matter, especially for safety, should state how each link was validated, by intervention on the original model, on which inputs, and against which baselines.
:::

## Interpretability for safety and auditing {#sec-safety}

The most ambitious hope for interpretability is that it could verify properties of a model that behaviour cannot reveal: that it is not pursuing a hidden objective, not aware of being evaluated, not planning to deceive. As of 2026 the evidence comes from three kinds of study.

**Probes as monitors.** Linear probes on activations can detect some behaviours with high accuracy in the settings tested. MacDiarmid et al. (2024, Anthropic) reported that simple probes, trained on generic contrast pairs, detected when "sleeper agent" models — models deliberately trained with a backdoor — were about to behave badly. Goldowsky-Dill et al. (2025), *Detecting Strategic Deception Using Linear Probes*, trained probes on Llama-3.3-70B and reported high separation (AUROC from $0.96$ to $0.999$) between honest and deceptive responses on their evaluation datasets, while noting that the probes partly tracked the topic of deception rather than deceptive intent, and that performance in realistic deployments was untested. Against such monitors stands evidence that representations can be shaped to evade them: Bailey et al. (2024) showed that models and inputs can be optimised so that harmful behaviour is accompanied by activations that latent-space monitors do not flag ("obfuscated activations").

**Auditing games.** Marks et al. (2025), *Auditing Language Models for Hidden Objectives*, trained a model with a deliberately hidden objective — to exploit known biases of reward models — and then asked four teams, unaware of the objective, to discover it with different levels of access. Three of the four teams found it; the team with only black-box API access did not. Successful teams used sparse-autoencoder features, behavioural attacks and searches of the training data, and the paper reported that some non-interpretability techniques were also effective. The authors presented the study as a first test of auditing methodology, not a demonstration that interpretability is necessary.

**Pre-deployment audits.** Some developers' published system cards for models released in 2025 describe interpretability-based investigations as part of their safety assessments — for example, inspecting internal representations related to recognising evaluation scenarios, and testing how behaviour changes when such representations are suppressed. These are reports by the developers themselves, in specific settings, and they illustrate the kind of evidence interpretability can add rather than establishing its reliability.

Two statistical problems apply to every detector built from internals, however good its accuracy looks in a balanced test.

::: proposition False discoveries in a search over many latents {#prop-multiple}
Suppose $M$ latents are each tested for association with a label at significance level $\alpha$, and $M_0$ of them are in fact unrelated to the label (with valid tests). Then the expected number of unrelated latents declared significant is $M_0\alpha$. If instead each test uses level $\alpha/M$, the probability that *any* unrelated latent is declared significant is at most $\alpha$ (the Bonferroni correction).
:::

::: proof
For each unrelated latent the probability of a false rejection is $\alpha$ (a valid test), so by linearity of expectation the expected number of false rejections is $M_0\alpha$; no independence is needed. At level $\alpha/M$, the union bound gives $\Prob(\text{some false rejection})\le\sum_{\text{unrelated}}\alpha/M = M_0\alpha/M\le\alpha$.
:::

With tens of millions of latents, searching for "the latent that detects deception" at a conventional threshold guarantees thousands of spurious candidates. Candidates found by search must be validated on fresh data, and their selection reported. The second problem is the **base rate**: a behaviour that is rare in deployment produces mostly false alarms even from an accurate detector.

::: example The base-rate problem {#ex-base}
A deception probe flags $90\%$ of deceptive responses and $1\%$ of honest ones. If one response in a thousand is deceptive, what fraction of flagged responses are deceptive? What if the false-positive rate is $5\%$?
::: solution
By Bayes' theorem, precision $= 0.9\times0.001/(0.9\times0.001 + 0.01\times0.999) = 0.0009/0.01089 = 0.083$: only about one flag in twelve is a true deception. With a $5\%$ false-positive rate, precision falls to $0.0009/(0.0009 + 0.04995) = 0.018$. A monitor whose AUROC looks excellent on a balanced evaluation set can still be overwhelmed by false alarms at realistic base rates, which is why reported operating points (false-positive rate on ordinary traffic) matter more than AUROC.
:::
:::

::: widget bayes
mode: test
prevalence: 0.001
sensitivity: 0.9
specificity: 0.99
caption: An interpretability-based monitor as a diagnostic test. With prevalence $0.1\%$, sensitivity $90\%$ and specificity $99\%$ ([[#ex-base]]), most flags are false alarms. Increase the specificity towards $99.99\%$, or the prevalence (as when a monitor is applied only to inputs already suspected), and watch the precision change.
:::

## Interpreting reasoning {#sec-reasoning}

Reasoning models write long chains of thought before answering. These traces seem to offer interpretability for free: the model's intermediate steps in natural language. [[reasoning/faithfulness-limits]] reviewed the evidence that traces are partly unfaithful — models use hints they do not mention, and reasoning can be post-hoc. Interpretability methods bear on this in two ways.

First, internal analysis can test traces. Attribution-graph case studies (Lindsey et al., 2025) found that when a model explained how it had added two numbers, the explanation described the schoolbook carrying algorithm while the internal computation combined an approximate-magnitude path with a path for the last digit — a mismatch between the stated and actual mechanism. Other work measures how much each sentence of a reasoning trace matters causally by resampling the trace from that point and recording how often the final answer changes; Bogdan et al. (2025) called the most influential sentences "thought anchors". Probes on activations during reasoning can sometimes predict the final answer before it is written, which bears on whether later reasoning is necessary.

Second, traces can be monitored. **Chain-of-thought monitoring** reads the trace with another model to catch, for example, a plan to exploit a flaw in the task. Baker et al. (2025) reported that such monitoring caught reward hacking in coding tasks, but that training against the monitor taught models to hide their intent in the trace while still hacking. A paper by researchers from several laboratories (Korbak et al., 2025) described chain-of-thought monitorability as a "new and fragile opportunity", arguing that developers should avoid training practices that make traces less legible. Interpretability and chain-of-thought monitoring are complementary bets: the first does not depend on the model choosing to verbalise, the second does not require understanding activations.

Open questions include whether reasoning that happens in activations rather than text (as in proposals for "latent" or continuous reasoning) will make traces less informative, whether internal methods can detect when a trace is unfaithful, and whether either can be robust to models that are optimised, deliberately or not, against them.

::: quiz
A study finds a sparse-dictionary latent that, in a held-out balanced test set, separates prompts where a model later behaves deceptively from prompts where it does not with $95\%$ accuracy. Which further evidence is most important before using it as a deployment monitor?
- [ ] A higher-resolution visualisation of the latent's top activations.
- [ ] Confirmation that its automated description mentions deception.
- [x] Its false-positive rate on realistic deployment traffic, its performance on deception the study did not construct, and whether the latent was selected from many candidates on the same data.
- [ ] A larger dictionary in which the latent splits into several.
::: solution
Deployment use depends on precision at realistic base rates ([[#ex-base]]), generalisation beyond the constructed scenarios, and freedom from selection effects ([[#prop-multiple]]). Descriptions and visualisations bear on plausibility, not on reliability as a detector.
:::
:::

## Competing views {#sec-views}

Researchers disagree, as of 2026, about how far interpretability can go and how it should be pursued. The following positions are summarised from published statements; each has thoughtful proponents and critics.

**The ambitious view.** Olah, Elhage and colleagues framed mechanistic interpretability as reverse-engineering neural networks the way one might reverse-engineer a compiled program, and argued that only an understanding of this kind could support confidence about behaviour on untested inputs. Dario Amodei's essay *The Urgency of Interpretability* (2025) argued that interpretability should aim, within a few years, at something like an "MRI for AI" — reliable diagnosis of a model's problems before deployment — and that the field is in a race with capabilities. Proponents point to the rapid progress from neurons to features to attribution graphs.

**The pragmatic view.** Others argue that complete understanding of frontier models may not be achievable on a useful timescale, and that interpretability should be judged by its contribution to concrete tasks — detecting deception, auditing, debugging, monitoring — against strong non-interpretability baselines. Neel Nanda and colleagues at Google DeepMind took this position publicly in 2025 after their negative results with SAEs on downstream tasks ([[interpretability/sparse-features#sec-critiques]]), while continuing to work on interpretability. On this view, simple methods such as linear probes and steering vectors may deliver most of the practical value.

**The top-down view.** Representation engineering (Zou et al., 2023) argues that the right units for safety-relevant properties are population-level representations — directions for honesty, harmfulness, emotion — rather than circuits, much as neuroscience studies brain regions and population codes as well as single neurons.

**The sceptical view.** Some critics argue that the mechanistic programme is unlikely to succeed for large models because their computations may not decompose into human-understandable parts, and that resources would be better spent on other safety approaches; Hendrycks and Hiscott (2025), in an essay titled *The Misguided Quest for Mechanistic AI Interpretability*, made this case, comparing the hope of explaining large networks bottom-up with the limited success of similar programmes in other complex systems. Defenders reply that interpretability has repeatedly found structure where sceptics expected none, and that partial understanding can still be useful.

These views share more than their framing suggests: all treat interventions as the standard of evidence, all accept that current explanations are incomplete, and all regard the question of what interpretability adds over behavioural evaluation as empirical. The safety course ([[safety-alignment]]) treats monitoring, control and evaluation methods that are designed to work whatever interpretability achieves.

## A numerical laboratory {#sec-code}

The listing computes three quantities from this chapter: the precision of a monitor at several base rates ([[#ex-base]]); the number of "significant" latents found by chance when $5000$ latents unrelated to a label are tested at $\alpha = 0.001$ ([[#prop-multiple]]); and the error accumulated by replacing each of eight random residual blocks $\mathbf{h}\mapsto\mathbf{h} + \operatorname{ReLU}(W\mathbf{h})$ by an approximation that errs by a vector of norm $0.05$, compared with the bound of [[#prop-accumulate]] computed from the blocks' Lipschitz constants.

```python
import math, random
rng = random.Random(8)

# 1. A deception monitor's precision at different base rates (Bayes' theorem)
TPR, FPR = 0.90, 0.01
for prev in [0.1, 0.01, 0.001]:
    precision = TPR * prev / (TPR * prev + FPR * (1 - prev))
    print(f"prevalence {prev:<6}: precision of a flag {precision:.3f}")

# 2. Searching many latents for one that 'detects' a label: false discoveries by chance
n, M, alpha = 200, 5000, 0.001
z_crit = 3.29                                   # two-sided normal critical value for alpha = 0.001
labels = [rng.random() < 0.5 for _ in range(n)]
hits = 0
for _ in range(M):                              # latents unrelated to the label
    act = [rng.gauss(0, 1) for _ in range(n)]
    a1 = [a for a, y in zip(act, labels) if y]; a0 = [a for a, y in zip(act, labels) if not y]
    m1, m0 = sum(a1) / len(a1), sum(a0) / len(a0)
    z = (m1 - m0) / math.sqrt(1 / len(a1) + 1 / len(a0))   # known unit variance
    hits += abs(z) > z_crit
print(f"{M} random latents, alpha = {alpha}: {hits} 'significant' (expected {M * alpha:.0f}); "
      f"Bonferroni threshold alpha/M = {alpha / M:.1e}")

# 3. Error accumulation in a replacement model: each of L residual blocks is replaced by an
#    approximation that errs by a vector of norm delta; compare with the bound of the proposition.
d, L, delta = 16, 8, 0.05
Ws = [[[rng.gauss(0, 1.0 / math.sqrt(d)) for _ in range(d)] for _ in range(d)] for _ in range(L)]
def block(W, h): return [h[i] + max(0.0, sum(w * v for w, v in zip(W[i], h))) for i in range(d)]
def norm(v): return math.sqrt(sum(a * a for a in v))
def op_norm(W, iters=100):                      # largest singular value by power iteration
    v = [1.0] * d
    for _ in range(iters):
        u = [sum(W[i][j] * v[j] for j in range(d)) for i in range(d)]
        v = [sum(W[i][j] * u[i] for i in range(d)) for j in range(d)]
        s = norm(v); v = [a / s for a in v]
    return norm([sum(W[i][j] * v[j] for j in range(d)) for i in range(d)])
rho = [1 + op_norm(W) for W in Ws]              # Lipschitz bound of h -> h + ReLU(W h)
bound = sum(delta * math.prod(rho[k] for k in range(l + 1, L)) for l in range(L))
errs = []
for _ in range(200):
    h = hr = [rng.gauss(0, 1) for _ in range(d)]
    for W in Ws:
        z = [rng.gauss(0, 1) for _ in range(d)]; zn = norm(z)
        h, hr = block(W, h), [a + delta * b / zn for a, b in zip(block(W, hr), z)]
    errs.append(norm([a - b for a, b in zip(h, hr)]))
print(f"Lipschitz bounds per block: {min(rho):.2f} to {max(rho):.2f}")
print(f"final error after {L} replaced blocks: mean {sum(errs) / len(errs):.3f}, max {max(errs):.3f}; "
      f"bound {bound:.3f}; sum of per-block errors {L * delta:.2f}")
```

```text
prevalence 0.1   : precision of a flag 0.909
prevalence 0.01  : precision of a flag 0.476
prevalence 0.001 : precision of a flag 0.083
5000 random latents, alpha = 0.001: 6 'significant' (expected 5); Bonferroni threshold alpha/M = 2.0e-07
Lipschitz bounds per block: 2.57 to 2.99
final error after 8 replaced blocks: mean 0.395, max 1.024; bound 99.109; sum of per-block errors 0.40
```

The same monitor is reliable at a $10\%$ base rate and mostly wrong at $0.1\%$. Six latents with no relation to the label pass a stringent threshold, as expected from $5000\times0.001 = 5$; with tens of millions of latents, chance alone would produce tens of thousands. The worst-case error bound ($99$) is vacuous, because it assumes every error is amplified maximally at every layer; the actual errors average $0.395$, about the sum of the per-block errors, with occasional inputs where amplification doubles or triples them. Bounds of this kind explain why errors *can* compound; measuring them on the model is what tells whether they do.

::: history
The goals of interpretability were debated from the start of the deep-learning era (Lipton, 2016; Doshi-Velez and Kim, 2017), and the safety case for mechanistic interpretability was argued by Olah and colleagues from 2017 onwards. Hubinger (2019) and others proposed using transparency tools to detect deceptive models, and Christiano and others discussed "eliciting latent knowledge" (2021). Interpretability illusions were described by Bolukbasi et al. (2021) and Makelov et al. (2024); Lindner et al. (2023) built Tracr to provide ground-truth model organisms. In 2024, MacDiarmid et al. reported probes that caught sleeper agents, Bailey et al. obfuscated activations, and Engels et al. the dark matter of SAEs; in 2025 Marks et al. ran an auditing game, Goldowsky-Dill et al. probed for strategic deception, Ameisen et al. and Lindsey et al. published attribution graphs, Baker et al. and Korbak et al. discussed chain-of-thought monitoring, Amodei argued for urgency, Hendrycks and Hiscott for scepticism, Google DeepMind's team for a pragmatic shift, and Sharkey et al. surveyed the open problems.
:::

::: summary
- **Scalability**: complete explanations exist for small models and narrow tasks; larger models yield partial ones. Compute, human attention and the size of explanations grow with scale, making automated interpretability necessary and its reliability an open question.
- **Completeness**: dictionaries leave **dark matter**; the error splits into a linearly predictable part (missed structure) and the rest, and rare concepts may never get features.
- **Faithfulness**: explanations pass through dictionaries, automated descriptions and replacement models; errors compound (worst case $\sum_\ell\delta_\ell\prod_{k>\ell}\rho_k$), illusions are documented, and validation on model organisms and the original model is needed.
- **Safety and auditing**: probes and dictionaries have detected planted behaviours in controlled studies, and auditing games are encouraging; detectors must face **base rates**, **multiple comparisons** and **adversarial evasion**.
- **Reasoning traces**: internal analysis can test the faithfulness of chains of thought; chain-of-thought monitoring is useful but fragile under optimisation.
- **Views** range from ambitious reverse-engineering to pragmatic usefulness, top-down representation engineering and scepticism; all treat interventions as the evidence standard and the added value of interpretability as an empirical question.
:::

## Exercises

::: exercise Precision of a monitor {level=1 check="0.0826"}
A monitor has true-positive rate $0.9$ and false-positive rate $0.01$, and the behaviour it detects occurs in $0.1\%$ of cases. Compute the precision of a flag to four decimal places.
::: solution
$0.9\times0.001/(0.9\times0.001 + 0.01\times0.999) = 0.0009/0.01089 = 0.0826$.
:::
:::

::: exercise A Bonferroni threshold {level=1 check="1e-9"}
You test $10^7$ latents for association with a label and want the probability of any false discovery to be at most $0.01$. What per-test significance level does the Bonferroni correction require?
::: solution
$0.01/10^7 = 10^{-9}$.
:::
:::

::: exercise A geometric bound {level=1 check="0.4"}
Eight layers are replaced, each with error at most $0.05$, and each layer is $1$-Lipschitz. Evaluate the bound of [[#prop-accumulate]].
::: solution
With all $\rho_k = 1$ the products are $1$, and the bound is $8\times0.05 = 0.4$.
:::
:::

::: exercise Seeing a rare concept {level=2 check="0.0527"}
A behaviour-relevant concept appears once per $5\times10^8$ tokens and a dictionary is trained on $10^9$ tokens. Under a Poisson model, compute the probability that the concept appears at least five times, to four decimal places.
::: solution
$\mu = 2$, and $\Prob(N\ge5) = 1 - e^{-2}(1 + 2 + 2 + \tfrac43 + \tfrac23) = 1 - 7e^{-2} = 1 - 0.9473 = 0.0527$.
:::
:::

::: exercise Splitting the error {level=2}
An SAE leaves $\E\lVert\mathbf{e}\rVert^2 = 5$ on activations with total variance $50$. A linear predictor of $\mathbf{e}$ from $\mathbf{x}$ leaves $\E\lVert\mathbf{e} - \hat{\mathbf{e}}\rVert^2 = 4$. Compute the FVU and the linearly predictable fraction of the error. Can the unpredictable part be important for behaviour?
::: solution
$\operatorname{FVU} = 5/50 = 0.1$. The predictable part is $5 - 4 = 1$, i.e. $20\%$ of the error. Yes: the unpredictable part may contain rare or non-linearly encoded features, and a small-variance direction can have a large effect on the output if downstream components read it with large weights. Its importance is measured by patching or splicing, not by its variance.
:::
:::

::: exercise Designing an auditing game {level=2}
Design an auditing study that would test whether sparse-autoencoder features add value over black-box methods for finding a hidden behaviour. Specify the model organism, the conditions, the teams or agents, the success criterion and two threats to validity.
::: solution
Model organisms: several models fine-tuned to carry different hidden behaviours (for example a backdoor trigger, a hidden preference, sandbagging on one subject), with some control models carrying none; the behaviours are chosen by a separate team and not disclosed. Conditions, randomised across auditors with equal time budgets: black-box access only; black-box plus training data; white-box with probes and patching but no SAEs; white-box with SAEs. Auditors: several human teams per condition, or automated auditing agents (which allow many repetitions). Success: a written description of the hidden behaviour that an independent judge scores against the ground truth, plus false-alarm rates on control models. Threats: (1) the planted behaviours may be easier to find with some methods than natural misbehaviour would be (for example, if fine-tuning leaves conspicuous features), so results may not transfer; (2) team skill varies more than method value, so small numbers of teams confound method with team — repeated automated agents, or several teams per condition, mitigate this.
:::
:::

::: exercise Probes under optimisation {level=2}
A developer adds a penalty during training whenever a deception probe fires on the model's activations. Explain why this might make the probe useless as a monitor even if the model's behaviour does not change, and propose a safeguard.
::: solution
Optimising against the probe rewards any change that lowers its output, including changes to the representation that leave the behaviour intact — moving deceptive computation to directions the probe does not read. This is the latent-space analogue of the obfuscation observed when chains of thought are optimised against a monitor (Baker et al., 2025) and of the obfuscated activations of Bailey et al. (2024). Safeguards: keep monitors that are used for evaluation separate from any training signal (use one probe for training and an independently trained, held-out one for monitoring, retrained after training); monitor behaviour directly as well; and test whether the held-out monitor's performance degrades after training, which would indicate representational evasion.
:::
:::

::: exercise Testing a reasoning trace {level=3}
A reasoning model solves a word problem with a ten-sentence chain of thought. Describe two experiments, one using resampling of the trace and one using activations, that would test whether sentence $4$ (which states an intermediate result) is causally used for the final answer, and explain what each would and would not show.
::: solution
Resampling: for many samples, keep sentences $1$–$3$, resample from sentence $4$ onwards, and compare the distribution of final answers when the regenerated sentence $4$ states the same intermediate result with when it states a different one (or when a modified sentence $4$ with a wrong result is inserted and generation continues). If answers follow the stated result, the sentence is used; if they do not change, the answer is computed elsewhere. This shows the *text's* causal role but not where the computation happens. Activations: probe the activations at the end of sentence $3$ for the intermediate result; if it is decodable before it is written, the model may have computed it internally; then patch the activations at the position of sentence $4$ from a run with a different intermediate value and see whether the answer changes. This localises the computation but depends on the probe's and patch's validity ([[#sec-faithful]]). Together they distinguish "computed then verbalised and used", "computed internally, verbalised but not used" and "not computed until written".
:::
:::

::: exercise Taking a position {level=3}
Write a balanced one-paragraph assessment of the claim "Interpretability will be necessary to verify the safety of frontier models", drawing on the evidence in this chapter, and identify the single empirical result that would most change your assessment.
::: solution
A balanced assessment: interpretability has produced methods that detect planted behaviours in controlled settings (probes for sleeper agents and deception; SAE features in an auditing game), and it is the only family of methods that does not depend on a model revealing its behaviour on the inputs tested or in its chain of thought. But no interpretability method has yet been shown to find unplanted dangerous behaviour in a frontier model that other methods missed; dictionaries are incomplete; explanations can be unfaithful; detectors face base rates and evasion; and in several supervised comparisons simple baselines did as well. So "necessary" is not established as of 2026, and neither is "unnecessary": the claim is a reasonable bet with partial support. The most informative result would be a well-controlled auditing study on a realistic, unplanted problem (or a blind study with many planted ones) in which interpretability methods found behaviours that strong black-box and chain-of-thought methods missed — or, conversely, consistently failed to.
:::
:::
