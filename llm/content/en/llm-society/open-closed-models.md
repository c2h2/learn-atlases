When a laboratory finishes training a language model it faces a choice that has become one of the most argued-over questions in AI policy: who gets access, and to what? It can keep the model entirely internal, offer it through a chat product or a programming interface (API) while keeping the weights secret, or publish the weights for anyone to download, run, study and modify. It can also publish the code and data used to train it. Each option has consequences for research, competition, safety, privacy, cost and the distribution of power, and the choices made by different developers have varied widely — from models available only through an API to models whose weights, code and training data are all public.

This chapter first makes the vocabulary precise, because "open" is used for very different things: open weights are not open source, and licences attached to downloadable models range from permissive to heavily restricted. It then sets out the main arguments for and against releasing weights, in the strongest form their proponents give them, and the evidence bearing on each. A simple decision model shows why the irreversibility of releasing weights matters and what staged release buys. The chapter ends with intermediate options and the state of policy (as of 2026). It does not take a side: the disagreement is real, involves both empirical uncertainty and differing values, and the reasonable positions depend on the capability of the model in question.

## What can be released {#sec-components}

A trained model is not one artefact. A release can include any of the following:

- **Weights**: the trained parameters, which together with inference code let anyone run the model on their own hardware.
- **Inference code and architecture**: enough to load and run the weights.
- **Training code**: the code, configurations and hyperparameters used to train the model.
- **Training data**, or detailed information about it: sources, filtering, mixtures ([[pretraining/training-data]], [[pretraining/data-mixtures]]).
- **Intermediate checkpoints**, which let researchers study how capabilities emerge during training.
- **Documentation and evaluations**: model cards, safety evaluations, known limitations.

And access can be given in different ways, which Solaiman (2023) arranged on a gradient.

::: definition The release gradient (Solaiman, 2023) {#def-gradient}
Generative models can be released along a gradient of access: (1) **fully closed** (internal use only); (2) **gradual or staged** release (access widens over time); (3) **hosted** access (a product interface); (4) **cloud-based or API** access (programmatic queries, possibly fine-tuning through the provider); (5) **downloadable** weights; (6) **fully open** (weights, code and data). Moving along the gradient increases the ability of outsiders to study, modify and use the model, and decreases the developer's ability to monitor, restrict or withdraw access.
:::

### Open weights and open source

In software, "open source" has a precise meaning maintained by the Open Source Initiative (OSI): software distributed under a licence granting freedoms to use for any purpose, study, modify and redistribute, with access to the source code. For models, the analogue of source code is not obvious — are the weights the "binary" and the data and training code the "source"? — and many models described as open release only weights, under licences that restrict use.

::: definition Open-weight model and open-source AI {#def-open}
An **open-weight** model is one whose trained parameters are publicly downloadable, under some licence. The OSI's **Open Source AI Definition** (version 1.0, October 2024) requires that an AI system be made available under terms granting the freedoms to use, study, modify and share it, and that the release include (a) **data information**: sufficiently detailed information about the training data that a skilled person could build a substantially equivalent system; (b) the complete **code** used to train and run the system; and (c) the **parameters** (weights), under OSI-approved terms.
:::

The definition was contested from both sides. Some argued it should require release of the training data itself, since "data information" does not let anyone reproduce or fully audit a model; the OSI replied that much training data cannot legally be redistributed (because of copyright or privacy) and that requiring it would exclude fields such as medicine. Others argued that requiring training code and data information sets a bar that most "open" models do not meet. Indeed, by this definition most popular open-weight models are not open-source AI, while a smaller set of releases — for example EleutherAI's Pythia, the Allen Institute for AI's OLMo models, and the LLM360 project — publish weights, code, data and checkpoints.

### Licences

The licence determines what users may do with released weights. Broadly (as of 2026):

- **Permissive open-source licences** (Apache 2.0, MIT) allow any use, including commercial, with attribution. Several prominent model families have been released under them — for example Mistral's 7B model (2023), many sizes of Alibaba's Qwen models, and DeepSeek-R1 (MIT, January 2025).
- **Custom community licences** permit broad use but add conditions: Meta's Llama licences, for example, require a separate licence from Meta for services with more than $700$ million monthly active users, impose an acceptable-use policy, and require attribution. Google's Gemma terms similarly attach a prohibited-use policy.
- **Responsible AI licences** (RAIL, for example the BigScience OpenRAIL-M licence used for BLOOM) grant broad rights but forbid specified harmful uses, and require downstream licences to carry the same restrictions.

Use restrictions are not open source in the OSI sense, which forbids discrimination against fields of endeavour. Their defenders argue that they set norms and give legal recourse against egregious misuse; critics argue that they are unenforceable against malicious actors, create legal uncertainty for legitimate users, and let companies claim the reputational benefits of openness without its substance. The White et al. (2024) **Model Openness Framework** grades releases by which components are released under which licences, to replace a binary "open/closed" label with a more informative classification.

::: warning "Open" models are not all equally open, and "closed" models are not all equally closed
A model with downloadable weights but undisclosed data and a restrictive licence, and a model with weights, code, data and checkpoints under Apache 2.0, are both called "open". An API model may allow fine-tuning, expose log-probabilities and offer researcher access programmes, or may offer none of these. Arguments about "open versus closed" often talk past each other because they have different points on the gradient in mind. Specify what is released and under what terms.
:::

## What weights make possible {#sec-weights}

Having the weights changes what users can do in three ways that matter for the debate.

**Running the model anywhere.** The model can be run on one's own hardware, without sending data to a provider and without the provider's monitoring or usage policy. The main constraint is memory ([[inference/quantisation]]).

::: example Hardware for running an open-weight model {#ex-memory}
How much memory do the weights of a $70$-billion-parameter model need at $16$-bit, $8$-bit and $4$-bit precision? Which of these fit on a single accelerator with $80$ GB of memory, or on two consumer graphics cards with $24$ GB each?
::: solution
$70\times10^9$ parameters $\times$ $2$, $1$ and $0.5$ bytes give $140$ GB, $70$ GB and $35$ GB. At $16$ bits the model needs at least two $80$ GB accelerators; at $8$ bits it fits on one (with little room for the KV cache, [[inference/kv-cache]]); at $4$ bits it fits on two $24$ GB consumer cards, or on one workstation with enough unified memory. Quantisation reduces quality somewhat, but it means that models of this size can be run by individuals and small organisations, outside any provider's control.
:::
:::

::: example Self-hosting or an API? {#ex-hosting}
A hospital wants to summarise $3$ billion tokens of clinical notes a month and may not send them to an outside provider without a data-processing agreement. Option A: an API at a (hypothetical) US\$0.60 per million tokens. Option B: run an open-weight model on two rented accelerators at US\$2.50 per accelerator-hour, around the clock, each serving $1{,}500$ tokens per second at the batch sizes used. Is option B's capacity sufficient, and how do the monthly costs compare (30-day month)?
::: solution
Capacity: $2\cdot1500\cdot3600\cdot24\cdot30 = 7.78\times10^9$ tokens a month, enough for $3\times10^9$. Cost A: $3000\cdot0.60 = $ US\$1,800. Cost B: $2\cdot2.50\cdot720 = $ US\$3,600, plus engineering and maintenance. At this volume the API is cheaper; B costs about twice as much but keeps the data in-house and the model fixed. At $8$ billion tokens a month the API would cost US\$4,800, and two accelerators would be at capacity. Real decisions depend on prices (which change often), utilisation, quality differences and legal requirements; the point is that open weights change the options, not that one is always cheaper.
:::
:::

**Modifying the model.** Weights can be fine-tuned — to specialise the model for a language or domain, to remove refusals, or to add capabilities. Parameter-efficient methods make this cheap.

::: example The cost of modifying a model {#ex-lora}
A LoRA adapter of rank $r = 16$ is applied to the four attention projection matrices (each $8192\times8192$) in each of the $80$ layers of a $70$B model ([[post-training/parameter-efficient-tuning]]). How many trainable parameters does it have, as a fraction of the model?
::: solution
Each matrix gets $B\in\R^{8192\times16}$ and $A\in\R^{16\times8192}$: $2\cdot8192\cdot16 = 262{,}144$ parameters. Four matrices in $80$ layers: $4\cdot80\cdot262{,}144 = 8.39\times10^7$, about $84$ million, or $0.12\%$ of $70$ billion. Fine-tuning this many parameters on a few thousand examples takes hours on modest hardware. Lermen, Rogers-Smith and Ladish (2023) reported that LoRA fine-tuning removed most of the safety refusals of Llama 2-Chat 70B for under US\$200 of compute.
:::
:::

That safety training can be cheaply removed from open weights is a central fact of the debate. It is not unique to open weights: Qi et al. (2023) showed that fine-tuning GPT-3.5 Turbo through its provider's fine-tuning API on as few as $10$ harmful examples, costing under US\$0.20, largely removed its safety behaviour — and even benign fine-tuning degraded it. The difference is that the API provider can screen fine-tuning data, monitor use and revoke access, while a downloaded model cannot be recalled.

**Studying the model.** With weights, researchers can inspect activations, run interpretability analyses ([[interpretability]]), measure memorisation against training data, test robustness under white-box attacks, and reproduce or vary training. Much published research on language models — on interpretability, memorisation ([[llm-society/privacy-memorisation]]), training dynamics and evaluation — has relied on open-weight models, and especially on fully open ones with data and checkpoints.

## The arguments {#sec-arguments}

Kapoor, Bommasani et al. (2024) proposed that the risks of open foundation models be judged by their **marginal** effect, a framing now widely used by both sides.

::: definition Marginal risk {#def-marginal}
The **marginal risk** of releasing a model's weights is the increase in the expected harm of some misuse, relative to a baseline in which the weights are not released, taking into account (a) what the threat actor could already do with existing tools — other models, search engines, published literature — and (b) the defences that exist or would adapt. A release has high marginal risk for a harm only if the model provides **uplift** over that baseline and the bottleneck to causing the harm is something the model supplies.
:::

### For releasing weights

- **Research and scrutiny.** Independent researchers can study, audit and reproduce models only if they have them. Safety research itself — interpretability, robustness, evaluation — benefits from access to weights, and many findings about risks (including how easily safety fine-tuning is undone) came from open models. Transparency about data and training supports accountability.
- **Security through openness.** In software, open code is generally thought to improve security by enabling many people to find and fix flaws; proponents argue the same applies to models, and that keeping weights closed creates a false sense of security, since closed models can be jailbroken through APIs ([[safety-alignment/robustness-jailbreaks]]) and their weights stolen.
- **Competition and concentration.** If the most capable models are available only from a few large firms, those firms gain power over access to a general-purpose technology — over prices, permitted uses, and the values embedded in the models. Open weights let startups, universities, governments and non-profits build without dependence on them.
- **Privacy, customisation and sovereignty.** Organisations can run models on their own infrastructure without sending sensitive data to a third party, adapt them to their languages and domains, and keep using them if a provider changes terms or withdraws a model. Countries and communities whose languages are under-served can fine-tune models themselves.
- **Low marginal risk for most harms.** For many concerns — spam, misinformation, harassment — capable open models already exist and the bottleneck is distribution rather than content (see [[llm-society/misinformation]]), so releasing another adds little marginal risk. For more severe harms, proponents argue, evidence of meaningful uplift is lacking, and the response should target the bottlenecks (access to materials, laboratory skills) rather than information.

### For keeping weights closed (or staging release)

- **Irreversibility.** Once weights are published they cannot be withdrawn; if dangerous capabilities are discovered later — by new elicitation techniques, fine-tuning or combination with tools — nothing can be done. An API can be patched, restricted or shut down.
- **Safeguards cannot be enforced.** Usage policies, refusal training, monitoring for abuse and know-your-customer checks all depend on the developer controlling access. With open weights, safety training can be removed cheaply ([[#ex-lora]]), and malicious use is invisible to the developer.
- **Severe misuse.** For the most capable models, the concern is that they may give meaningful uplift to people seeking to cause mass harm — for example in biology or cyber-attacks — where the downside is catastrophic and a single misuse could outweigh many benefits. Evidence as of 2024–25 was mixed: a RAND red-team study (Mouton, Lucas and Guest, 2024) found no statistically significant difference in the viability of biological-attack plans produced with and without the language models tested, while developers' own evaluations of later models reported increasing performance on relevant knowledge and troubleshooting tasks and, for some models, precautionary safeguards. Those holding this view argue that the decision should depend on capability evaluations of each model rather than on a general principle ([[evaluation/capability-evaluations]], [[safety-alignment/safety-frameworks]]).
- **Security of the frontier.** If weights of the most capable models are released, so are the results of their very expensive training, to competitors and to states, which some argue has implications for national security and for the incentives to invest in safety. Nevo et al. (2024, RAND) analysed the security measures needed to protect weights from theft by actors of different sophistication, an argument that applies only to unreleased weights.
- **Sustaining development.** Commercial access through APIs funds the training of further models and safety research; proponents argue that this is a legitimate reason for closed release, while critics note that it is also a commercial interest that may shape arguments about risk.

### Mixed motives and the evidence

Arguments on both sides come from parties with interests: companies releasing open weights can benefit by commoditising competitors' products and attracting developers, and companies keeping weights closed protect their revenue; advocates of either position may also hold it on principle. The evidence on the key empirical questions — how large the uplift from open models is for severe harms, how far behind the closed frontier open models are, and how much open release accelerates both beneficial and harmful applications — is limited and changing. Analyses by Epoch AI (2024) estimated that the best open-weight models lagged the best closed models in benchmark performance and training compute by roughly a year, with considerable variation and signs of the gap narrowing at some points (as of 2024–25). The US National Telecommunications and Information Administration's report on dual-use foundation models with widely available weights (July 2024) concluded that the evidence did not then justify restricting open weights, and recommended that the government build the capacity to monitor risks and act if they rose.

## Release decisions under uncertainty {#sec-decision}

A simple model makes the irreversibility argument precise and shows its limits. Suppose a developer does not yet know whether a model has a dangerous capability, and believes it does with probability $p$. Releasing weights yields benefit $B$ per period over $T$ periods; if the model is dangerous, release also causes expected harm $D$ per period, which cannot be stopped. Alternatively the developer can offer API access for one period, capturing a fraction $\beta < 1$ of the benefit while preventing the harm through monitoring and learning, by the end of the period, whether the model is dangerous; then it releases the weights if the model is safe and continues API-only (benefit $\beta B$, no harm) otherwise.

::: proposition When staged release is better {#prop-staged}
In this model, the expected values of opening at once and of staging are

$$
V_{\text{open}} = TB - pTD, \qquad V_{\text{staged}} = \beta B + (T - 1)\bigl[(1 - p)B + p\beta B\bigr].
$$

If $TD > (T - 1)(1 - \beta)B$, staging is better if and only if

$$
p > p^{*} = \frac{(1 - \beta)B}{TD - (T - 1)(1 - \beta)B}.
$$ {#eq-pstar}
:::

::: proof
Subtracting,

$$
\begin{aligned}
V_{\text{staged}} - V_{\text{open}} &= \beta B + (T - 1)B - (T - 1)pB(1 - \beta) - TB + pTD \\
&= -(1 - \beta)B + p\bigl[TD - (T - 1)(1 - \beta)B\bigr].
\end{aligned}
$$

The bracket is positive by assumption, so the difference is positive exactly when $p$ exceeds [[#eq-pstar]].
:::

The cost of staging is the benefit forgone during the first period, $(1-\beta)B$; its value is the option to avoid an irreversible harm. With $B = 1$, $D = 3$, $T = 10$ and $\beta = 0.6$, $p^* = 0.4/(30 - 3.6) = 0.015$: staging pays if there is more than a $1.5\%$ chance the model is dangerous.

```python
def open_now(p, B, D, T):
    """Release weights at once: benefit B per period for T periods; if the model
    turns out dangerous (probability p), a harm D per period that cannot be recalled."""
    return T * B - p * T * D

def staged(p, B, D, T, beta):
    """API only for one period (a share beta of the benefit, no harm, and the
    danger is learned); then open the weights only if the model is safe."""
    return beta * B + (T - 1) * ((1 - p) * B + p * beta * B)

B, D, T, beta = 1.0, 3.0, 10, 0.6
print(" p     open now   staged   better")
for p in (0.0, 0.02, 0.05, 0.1, 0.2, 0.4):
    o, s = open_now(p, B, D, T), staged(p, B, D, T, beta)
    print(f"{p:4.2f}  {o:8.2f}  {s:8.2f}   {'staged' if s > o else 'open'}")
p_star = (1 - beta) / ((T - 1) * beta + T * D - (T - 1))   # where the two are equal
print(f"break-even p = {p_star:.4f}")
```

```text
 p     open now   staged   better
0.00     10.00      9.60   open
0.02      9.40      9.53   staged
0.05      8.50      9.42   staged
0.10      7.00      9.24   staged
0.20      4.00      8.88   staged
0.40     -2.00      8.16   staged
break-even p = 0.0152
```

::: widget plot
f: -(1 - b) + x*(10*D - 9*(1 - b)); 0
x: 0, 0.2
y: -0.6, 3
sliders: D=3:0:10:0.1; b=0.6:0:1:0.05
labels: value of staging minus value of opening (T = 10, B = 1); zero
caption: The advantage of staged release over immediate open release, $V_{\text{staged}} - V_{\text{open}}$, against the probability $p$ that the model is dangerous, for harm $D$ per period and API benefit share $b = \beta$ (sliders). Staging is better where the line is above zero, i.e. for $p > p^*$. With $D = 0$ (no harm possible) staging always costs $(1 - \beta)$; with $\beta = 1$ (an API delivers all the benefit) it is free.
:::

The model is a caricature, and its assumptions are exactly where the real disagreement lies. It assumes that one period of API access reveals whether a model is dangerous (capability evaluations are imperfect, and capabilities may be elicited later); that the API prevents all harm (APIs are jailbroken and weights can be stolen); that $\beta$ is known (much of the value of open weights — research, privacy, competition — cannot be delivered through an API, so $\beta$ may be small for some users); and it ignores that other developers may release similar models anyway, which lowers the marginal harm $D$. Proponents of open release tend to believe $p$ and marginal $D$ are small and $\beta$ is low for important uses; proponents of closed release, for the most capable models, that $D$ may be catastrophic and that evaluations reduce $p$ only slowly.

::: example Uncertain harm with a heavy tail {#ex-tail}
In the model above with $B = 1$, $T = 10$, $\beta = 0.6$, suppose the harm if dangerous is $D = 1$ with probability $0.99$ and $D = 1000$ with probability $0.01$, so $\E D = 10.99$. Compute $p^*$ using $\E D$, and compare with $p^*$ when $D = 1$ for certain.
::: solution
With $D = 1$: $p^* = 0.4/(10 - 3.6) = 0.0625$. With $\E D = 10.99$: $p^* = 0.4/(109.9 - 3.6) = 0.00376$. A small chance of a catastrophic harm lowers the threshold seventeen-fold. Expected-value reasoning is sensitive to tail estimates that are themselves very uncertain, which is why the debate over open release of the most capable models often turns on how to reason about low-probability, high-severity outcomes rather than on the central estimates.
:::
:::

## Intermediate options and policy {#sec-intermediate}

The choice is not binary. Options between closed and fully open include:

- **Staged release**, as OpenAI did with GPT-2 in 2019: releasing successively larger versions over nine months while studying misuse, eventually releasing the full model.
- **Structured access** (Shevlane, 2022): controlled interfaces that give vetted researchers deeper access — fine-tuning, internal activations, log-probabilities — without publishing weights.
- **Gated downloads**: weights available after agreeing to terms and identifying oneself, as on some model-hosting platforms.
- **Releasing smaller models openly** while keeping the most capable closed — a policy several developers adopted.
- **Capability thresholds**: developers' published frontier safety frameworks commit to evaluations before release and to safeguards — which can include not releasing weights — if specified capability thresholds are reached.

Policy has mostly avoided outright restrictions on open weights (as of 2026). The EU AI Act exempts providers of general-purpose AI models released under free and open-source licences from some documentation obligations, but not from the copyright policy and training-content summary, and not if the model is classified as posing systemic risk ([[llm-society/governance-regulation]]); its definition of "free and open-source" excludes models monetised in certain ways. In the United States, the NTIA's 2024 report recommended monitoring rather than restriction, and later federal policy statements (2025) expressed support for open models. China's developers released many leading open-weight models in 2024–25. Proposals to require licences or pre-release review for the most capable models, which would affect open release, have been debated in several jurisdictions.

::: quiz
A developer argues: "Our model's weights should be released because a model with similar capabilities is already open." Which framing does this argument use, and what is its main limitation?
- [ ] It uses the release gradient; its limitation is that APIs are more open.
- [x] It argues that the marginal risk is low; its limitation is that each release can still add capabilities, fine-tuning options or reach, and that the argument, applied repeatedly, can justify releasing ever more capable models one step at a time.
- [ ] It shows the model is open source under the OSI definition.
- [ ] It proves that the model has no dangerous capabilities.
::: solution
"A similar model is already available" is a marginal-risk argument (the uplift over the baseline is small). It is often correct and important, but marginal-risk reasoning must also account for incremental capability gains and for the cumulative effect of many small steps; it says nothing about licences or about whether the model is dangerous in absolute terms.
:::
:::

::: history
Open release has been the norm in machine-learning research: models, code and benchmarks have long been published with papers, and early pretrained language models such as BERT (2018) were released openly. OpenAI's staged release of GPT-2 (2019), citing misuse concerns, began the modern debate; GPT-3 (2020) was offered only through an API. EleutherAI released GPT-J and GPT-NeoX (2021–22) and the Pythia suite (2023) to give researchers open alternatives; BigScience released BLOOM (2022) under a responsible-AI licence; Meta's LLaMA weights (February 2023) were released to researchers and quickly leaked, and Llama 2 (July 2023) was released for commercial use under a community licence, followed by many open-weight model families from other developers. Solaiman (2023) described the release gradient, Shevlane (2022) structured access, and Kapoor, Bommasani et al. (2024) the marginal-risk framework. The OSI published its Open Source AI Definition 1.0 in October 2024, and the NTIA its report on widely available model weights in July 2024.
:::

::: summary
- A release can include weights, code, data information, checkpoints and documentation; access ranges along a gradient from closed to fully open.
- Open weights are not open source: the OSI's 2024 definition also requires training code and sufficiently detailed data information under terms granting the four freedoms; licences range from permissive to use-restricted.
- Weights let anyone run models privately (a $70$B model fits in $35$ GB at $4$ bits), modify them cheaply (LoRA adapters of $\sim0.1\%$ of parameters can remove safety training), and study them — the basis of much research.
- For release: research and scrutiny, security through openness, competition and reduced concentration, privacy and sovereignty, and low marginal risk for most harms.
- Against (or for staging): irreversibility, unenforceable safeguards, potential uplift for severe misuse in the most capable models, security of the frontier, and sustaining development; evidence on uplift is mixed and changing.
- A simple option-value model shows that staging is worth its forgone benefit when the probability of danger exceeds $p^*$, a threshold very sensitive to tail harms and to how much of the benefit an API can deliver.
- Intermediate options include staged release, structured access, gated downloads and capability thresholds; policy has mostly favoured monitoring over restriction (as of 2026).
:::

## Exercises

::: exercise Memory at low precision {level=1 check="4"}
How many gigabytes do the weights of an $8$-billion-parameter model need at $4$ bits per parameter (ignoring overheads)?
::: solution
$8\times10^9\cdot0.5$ bytes $= 4\times10^9$ bytes $= 4$ GB.
:::
:::

::: exercise LoRA parameters {level=1 check="4194304"}
How many trainable parameters does a rank-$8$ LoRA adapter add to $32$ layers, each with $2$ adapted matrices of size $4096\times4096$?
::: solution
Per matrix $2\cdot4096\cdot8 = 65{,}536$; there are $32\cdot2 = 64$ adapted matrices, so $64\cdot65{,}536 = 4{,}194{,}304$ parameters in total.
:::
:::

::: exercise Classify the release {level=1}
Place each on the release gradient of [[#def-gradient]] and say whether it meets the OSI Open Source AI Definition: (a) weights downloadable under a licence banning use by companies above a size threshold, with no training code; (b) weights, training code, a full description of the data sources and filtering, under Apache 2.0; (c) a chat product with no API.
::: solution
(a) Downloadable; not OSI open source (use restriction, no training code or data information). (b) Downloadable/fully open; meets the definition provided the data information suffices for a skilled person to build a substantially equivalent system. (c) Hosted; closed.
:::
:::

::: exercise The break-even probability {level=2 check="0.0625"}
In [[#prop-staged]] take $B = 1$, $D = 1$, $T = 10$ and $\beta = 0.6$. Compute $p^*$.
::: solution
$p^* = 0.4/(10 - 9\cdot0.4) = 0.4/6.4 = 0.0625$.
:::
:::

::: exercise When an API delivers little {level=2 check="0.035"}
With $B = 1$, $D = 3$, $T = 10$, suppose an API delivers only $\beta = 0.2$ of the benefit (because the main uses need local deployment). Compute $p^*$ to three decimal places, and compare with the $\beta = 0.6$ case.
::: solution
$p^* = 0.8/(30 - 9\cdot0.8) = 0.8/22.8 = 0.035$, more than twice the $0.015$ found for $\beta = 0.6$. The less of the benefit an API can deliver, the more expensive staging is, and the higher the probability of danger must be to justify it.
:::
:::

::: exercise Marginal risk in practice {level=2}
For each harm, discuss the marginal risk of releasing the weights of a model somewhat more capable than the best existing open model: (a) generating spam emails; (b) producing non-consensual intimate imagery (for an image model); (c) assisting a novice to carry out a sophisticated cyber-attack. Identify the bottleneck in each case.
::: solution
(a) Low marginal risk: capable models for spam already exist; the bottleneck is delivery past spam filters. (b) Significant for image models: open models without safeguards have been widely used for such imagery, and safeguards on hosted services are the main barrier; the bottleneck is access to an unrestricted generator, which open weights supply (Kapoor et al. identified this as a harm with clear evidence of marginal risk from open release). (c) Uncertain and capability-dependent: the bottlenecks are operational skill and access to targets; whether a slightly better model provides meaningful uplift depends on evaluations of that model, and defenders also benefit from the same capability. A careful answer distinguishes evidence from speculation in each case.
:::
:::

::: exercise Heavy tails {level=3}
In [[#ex-tail]], suppose the probability of the catastrophic outcome is itself uncertain: the developer believes it is $0.01$ with probability $0.5$ and $0.0001$ with probability $0.5$. Compute $\E D$ and $p^*$. Then discuss two objections to deciding release questions by expected value with such estimates.
::: solution
The mixture probability of the catastrophic outcome is $0.5\cdot0.01 + 0.5\cdot0.0001 = 0.00505$, so $\E D = 0.99495\cdot1 + 0.00505\cdot1000 = 6.04$. Then $p^* = 0.4/(60.4 - 3.6) = 0.0070$. Objections: (1) the inputs are subjective and practically unverifiable, so the conclusion can be steered by the choice of tail probability — a reason some prefer explicit capability thresholds tested by evaluation; (2) expected value treats a small chance of catastrophe as equivalent to a certain small harm, whereas many decision-makers are risk-averse about irreversible catastrophes (motivating precautionary approaches), while others argue that precaution applied to speculative risks forgoes large, certain benefits and is itself a choice with costs. Both are value judgements as much as technical ones.
:::
:::

::: exercise A release policy {level=3}
Draft a one-paragraph release policy for a hypothetical developer that wants to release open weights where appropriate. Specify what triggers a decision not to release, what evaluations are run, what is released alongside the weights, and how the policy addresses the arguments of both sides.
::: solution
A good answer would: commit to releasing weights, code and data information under a permissive licence by default for models below defined capability thresholds; define thresholds in specific risk domains (for example, assessed uplift on expert-validated biology and cyber tasks), evaluated before release by internal and external evaluators, including after fine-tuning to remove safeguards (since that will happen once released); state that above a threshold the developer will use staged or structured access, publish the evaluation results and reasons, and revisit the decision as evidence and defences change; publish model cards, evaluation data and known limitations with every release; and give researchers structured access to unreleased models. It addresses the open side by making openness the default and the closed side by making irreversibility and fine-tuning central to the evaluation. Reasonable policies differ in where they set thresholds and how much weight they give to competition and research access.
:::
:::
