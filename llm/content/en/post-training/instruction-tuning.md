A pretrained language model continues text. Give it *What is the capital of France?* and it may answer *Paris*, but it is just as likely to continue with *What is the capital of Germany? What is the capital of Spain?*, because lists of quiz questions are common on the web. Nothing in next-token prediction ([[pretraining/pretraining-objectives]]) tells the model that the text in front of it is a request from a person who wants an answer. **Instruction tuning** — supervised fine-tuning (SFT) on examples of instructions paired with good responses — teaches it exactly that. It is the first and usually the cheapest stage of post-training, and every later stage in this course starts from its output.

This chapter defines the SFT objective with **prompt masking** and shows what it optimises, follows the line of work that established instruction tuning — FLAN, T0, Flan-T5 and Flan-PaLM, Self-Instruct and LIMA — and states carefully what each found. It then treats the practical machinery that turns a conversation into a training sequence: **chat templates**, **special tokens**, multi-turn masking, packing and the choice of hyperparameters. It ends with what SFT cannot do, which motivates the reinforcement-learning chapters that follow. The base models being tuned were surveyed in [[pretraining/model-families]]; prompting a model without changing its weights is the subject of [[prompting-rag/prompt-design]].

## From continuation to instruction following {#sec-why}

A base model has seen many examples of questions followed by answers, of instructions followed by their execution, of dialogues. The ability to answer is in there; what is missing is the *convention* that the text before the cursor is a request and the text after it should satisfy it. Few-shot prompting ([[prompting-rag/in-context-learning]]) supplies the convention in the context window, by showing a handful of examples. Instruction tuning supplies it in the weights, by training on many thousands.

The post-training pipeline that this course develops has a fixed shape, shown below: a pretrained model is fine-tuned on demonstrations, and the result is either used directly or improved further with feedback — a reward model and reinforcement learning ([[post-training/rlhf]]), or direct preference optimisation ([[post-training/preference-optimisation]]). Instruction tuning is the arrow out of the base model.

::: widget graph
nodes: Pretrained@0,1; SFT@1,1; Demonstrations@1,2; Preferences@2,2; RewardModel@3,2; RL@3,1; DPO@3,0; Assistant@4,1
edges: Pretrained>SFT; Demonstrations>SFT; SFT>RL; SFT>DPO; Preferences>RewardModel; RewardModel>RL; Preferences>DPO; RL>Assistant; DPO>Assistant; SFT>Assistant
algorithm: topo
caption: The shape of post-training. Supervised fine-tuning (SFT) on demonstrations turns the pretrained model into an instruction follower; it is then either deployed or improved with preference data, through a reward model and reinforcement learning (RL) or directly (DPO). Step through the topological order: every method in this course needs SFT first. Real pipelines repeat these stages several times and mix in other data.
:::

## The supervised fine-tuning objective {#sec-objective}

::: definition Instruction dataset and SFT loss {#def-sft}
An **instruction dataset** is a set $\mathcal{D} = \{(\mathbf{x}^{(i)}, \mathbf{y}^{(i)})\}_{i=1}^{n}$ of **prompts** $\mathbf{x}$ (an instruction, possibly with input data, a system prompt and earlier turns of a conversation) and **responses** $\mathbf{y} = (y_1, \dots, y_{L})$ written or approved as good answers. **Supervised fine-tuning** starts from pretrained parameters $\theta_0$ and minimises the negative log-likelihood of the responses given the prompts,

$$
\mathcal{L}_{\text{SFT}}(\theta) = -\frac{1}{\sum_i L_i}\sum_{i=1}^{n}\sum_{t=1}^{L_i}\log p_\theta\big(y^{(i)}_t \,\big\vert\, \mathbf{x}^{(i)}, y^{(i)}_{<t}\big),
$$ {#eq-sft}

where $L_i$ is the length of response $i$. The prompt tokens are part of the input but are **not prediction targets**: this is **prompt masking** (also called loss masking).
:::

Mechanically, SFT is the causal language-modelling loss ([[pretraining/pretraining-objectives#def-clm]]) with teacher forcing, applied to the concatenation of prompt and response, with the per-token losses at prompt positions multiplied by zero. In code, the target ids at masked positions are set to an "ignore" value (often $-100$) that the cross-entropy skips. Nothing else changes: the same model, the same optimiser, a much smaller dataset and a lower learning rate.

Because the loss is a conditional likelihood, it has the same minimiser as any cross-entropy: the conditional distribution of the data. Here "the data" means the people, or models, who wrote the responses.

::: proposition SFT imitates the demonstrator {#prop-imitation}
Let prompts be drawn from $p(\mathbf{x})$ and responses from a **demonstrator** distribution $\pi_{\text{demo}}(\mathbf{y}\mid\mathbf{x})$. The expected summed SFT loss satisfies

$$
\E_{\mathbf{x}}\E_{\mathbf{y}\sim\pi_{\text{demo}}}\big[-\log p_\theta(\mathbf{y}\mid\mathbf{x})\big] = \E_{\mathbf{x}}\Big[H\big(\pi_{\text{demo}}(\cdot\mid\mathbf{x})\big) + D_{\mathrm{KL}}\big(\pi_{\text{demo}}(\cdot\mid\mathbf{x})\,\Vert\,p_\theta(\cdot\mid\mathbf{x})\big)\Big],
$$ {#eq-sft-kl}

so minimising it over a sufficiently rich model class gives $p_\theta(\cdot\mid\mathbf{x}) = \pi_{\text{demo}}(\cdot\mid\mathbf{x})$ for every prompt with $p(\mathbf{x}) > 0$.
:::

::: proof
By the chain rule ([[pretraining/pretraining-objectives#prop-chain]]), $\sum_t\log p_\theta(y_t\mid\mathbf{x}, y_{<t}) = \log p_\theta(\mathbf{y}\mid\mathbf{x})$, so the summed loss of one example is $-\log p_\theta(\mathbf{y}\mid\mathbf{x})$. For fixed $\mathbf{x}$, write $-\log p_\theta = -\log\pi_{\text{demo}} + \log(\pi_{\text{demo}}/p_\theta)$ and take the expectation over $\mathbf{y}\sim\pi_{\text{demo}}(\cdot\mid\mathbf{x})$: the first term gives the entropy and the second the divergence, as in [[pretraining/pretraining-objectives#prop-minimiser]]. The entropy does not depend on $\theta$, and the divergence is non-negative and zero exactly when the two distributions agree (Gibbs' inequality, [[math-for-ml/information-theory#thm-gibbs]]). Averaging over prompts preserves this, prompt by prompt.
:::

Two consequences shape everything that follows. First, SFT can at best reproduce the demonstrator, including its mistakes, its inconsistencies and its style; it has no notion of a response being *better* than the demonstrations. Second, the divergence in [[#eq-sft-kl]] is the **forward** KL, $D_{\mathrm{KL}}(\pi_{\text{demo}}\Vert p_\theta)$, which punishes the model heavily for giving low probability to anything the demonstrators do. A model that cannot represent the demonstrator exactly is pushed to spread its probability over all their behaviours — **mode covering** — rather than to pick the best one. Reinforcement learning from feedback optimises a different, reverse-KL-like objective ([[post-training/rl-for-language-models#sec-kl]]), and the difference in behaviour between the two stages comes largely from this.

### Why mask the prompt? {#sec-masking}

If prompt tokens were targets too, the summed loss of an example would be $-\log p_\theta(\mathbf{x}) - \log p_\theta(\mathbf{y}\mid\mathbf{x}) = -\log p_\theta(\mathbf{x}, \mathbf{y})$: the joint likelihood of the whole conversation.

::: proposition Unmasked SFT adds a prompt-modelling term {#prop-unmasked}
Training on the prompt tokens as well as the response tokens minimises

$$
\E\big[-\log p_\theta(\mathbf{x}, \mathbf{y})\big] = \underbrace{\E\big[-\log p_\theta(\mathbf{x})\big]}_{\text{model the users}} + \underbrace{\E\big[-\log p_\theta(\mathbf{y}\mid\mathbf{x})\big]}_{\text{the SFT loss}}.
$$

In a model class rich enough to represent both terms exactly, the minimiser of the conditional term is the same with and without masking. With finite capacity and a finite number of gradient steps, the first term competes with the second.
:::

::: proof
The decomposition is the chain rule $p(\mathbf{x}, \mathbf{y}) = p(\mathbf{x})\,p(\mathbf{y}\mid\mathbf{x})$ taken under $-\log$. In a causal model the conditionals at prompt positions and at response positions are different outputs of the network, so if the class can represent any family of conditionals the two terms can be minimised independently, and the response conditionals that minimise the second term are those of [[#prop-imitation]] whatever is done with the first.
:::

So masking is not about correctness in the limit; it is about where the training signal goes. Prompts in instruction datasets are often long (documents to summarise, code to fix, earlier turns), and without masking most of the gradient would teach the model to imitate users. Practice varies. The InstructGPT and Llama 2 reports describe training on the response tokens only; some studies have found that a small weight on prompt tokens can help when responses are very short (Shi et al., 2024, "instruction modelling"). Masking is the default, and a sensible one.

::: example Counting targets in a conversation {#ex-targets}
A training conversation is rendered as: a beginning-of-sequence token; a system turn of $40$ tokens; a user turn of $120$ tokens; an assistant reply of $80$ tokens; a second user turn of $30$ tokens; a second assistant reply of $150$ tokens. Each turn is wrapped in a role header and an end-of-turn token. How many tokens does the sequence have, and how many are SFT targets if the loss covers every assistant reply and its end-of-turn token?
::: solution
Each turn adds $2$ tokens of wrapping, so the five turns hold $40 + 120 + 80 + 30 + 150 = 420$ content tokens and $10$ wrapping tokens; with the beginning token the sequence has $431$ tokens. The targets are the $80 + 150 = 230$ assistant tokens and their $2$ end-of-turn tokens: $232$ targets, about $54\%$ of the positions. The end-of-turn token must be a target: it is how the model learns to stop. If only the *last* reply were trained (a choice some pipelines make for conversations collected from a model), there would be $151$ targets.
:::
:::

### Averaging over tokens or over sequences {#sec-averaging}

[[#eq-sft]] divides by the total number of response tokens in the batch. An alternative is to average within each response first and then over responses. The two agree when all responses have the same length and differ otherwise.

::: proposition Token- and sequence-averaged losses weight examples differently {#prop-weights}
For a batch of responses with lengths $L_1, \dots, L_B$ and mean per-token losses $\bar\ell_1, \dots, \bar\ell_B$, the **token-averaged** loss $\sum_iL_i\bar\ell_i/\sum_iL_i$ gives example $i$ the weight $w_i = L_i/\sum_jL_j$, and the **sequence-averaged** loss $\frac1B\sum_i\bar\ell_i$ gives every example the weight $1/B$. Under token averaging each token's gradient has the same weight $1/\sum_jL_j$; under sequence averaging the tokens of example $i$ each have weight $1/(BL_i)$.
:::

::: proof
Expand: $\sum_iL_i\bar\ell_i/\sum_jL_j = \sum_iw_i\bar\ell_i$ with $w_i = L_i/\sum_jL_j$, and $\bar\ell_i = \frac1{L_i}\sum_t\ell_{i,t}$ gives the per-token weights. The sequence average is the plain mean.
:::

Token averaging is what most libraries do by default; it lets long responses dominate the gradient. Sequence averaging lets short responses dominate per token. Neither is "right" — they express different beliefs about whether a long answer is more informative — but the choice interacts with gradient accumulation and data packing (an accumulated token average must divide by the total token count across micro-batches, not average the micro-batch averages; see [[neural-networks/training-practice#sec-accumulation]]), and it reappears in reinforcement learning, where per-sequence normalisation introduces a length bias ([[post-training/preference-optimisation#sec-grpo]]).

::: widget plot
f: x/(x+a); 0.5 + 0*x
x: 1, 500
y: 0, 1
sliders: a=100:1:500:1
labels: weight under token averaging; weight under sequence averaging
caption: The weight of one example of length $x$ tokens in a batch of two, when the other example has length $a$. Under token averaging ([[#prop-weights]]) the weight is $x/(x + a)$: a $4$-token answer next to a $60$-token answer gets $1/16$ of the gradient. Under sequence averaging both get one half, whatever their lengths.
:::

::: example Two averages of the same batch {#ex-averages}
A batch holds two responses: a $4$-token answer with mean loss $2.5705$ nats per token and a $60$-token answer with mean loss $1.0731$. Compute the token-averaged and sequence-averaged losses.
::: solution
Token average: $(4\cdot2.5705 + 60\cdot1.0731)/64 = (10.282 + 64.386)/64 = 1.1667$. Sequence average: $(2.5705 + 1.0731)/2 = 1.8218$. The weights are $4/64 = 0.0625$ and $0.9375$ against $0.5$ and $0.5$. The hard short answer barely affects the token-averaged gradient. These are the numbers printed by the listing in [[#sec-code]].
:::
:::

## Instruction tuning as multi-task learning {#sec-history}

The idea that a single model could be trained on many tasks phrased in natural language, and would then follow new instructions, was established in 2021 and 2022 by a sequence of papers that each changed one ingredient: the source of tasks, their number, the size of the model, or the source of the responses.

### Many tasks, phrased as instructions {#sec-flan}

::: definition Multi-task prompted training {#def-templates}
Given a collection of supervised datasets (classification, question answering, translation, summarisation …), each is rendered into (prompt, response) pairs by several natural-language **templates** — *"Premise: … Hypothesis: … Does the premise entail the hypothesis? Options: yes, no"* — and the model is fine-tuned on the union with the SFT loss. Generalisation is measured on **held-out** tasks: whole task types that were not in the training mixture.
:::

**FLAN** (Wei et al., ICLR 2022) fine-tuned a 137-billion-parameter decoder (LaMDA-PT) on 62 datasets grouped into 12 task clusters, with ten templates per dataset. Evaluated zero-shot on clusters held out from training, the tuned model improved substantially over the untuned one, and the paper reported that it surpassed zero-shot GPT-3 (175B) on 20 of the 25 datasets evaluated. Two ablations shaped later work: performance on held-out clusters kept rising as more clusters were added, and the benefit appeared only with scale — for the paper's models of 8 billion parameters and fewer, instruction tuning *hurt* held-out performance, which the authors attributed to small models using their capacity up on the training tasks.

**T0** (Sanh et al., ICLR 2022) reached a similar conclusion with an 11-billion-parameter encoder–decoder (an LM-adapted T5) trained on a public collection of crowd-sourced templates (P3, built with the PromptSource tool), reporting zero-shot performance on held-out tasks that often matched or exceeded models many times its size. **Super-NaturalInstructions** (Wang et al., EMNLP 2022) collected 1,616 tasks with expert-written instructions.

**Flan-T5 and Flan-PaLM** (Chung et al., 2022) scaled the recipe to 1,836 tasks and models up to 540 billion parameters, and found that performance improved with both the number of tasks and model size, and that including a small amount of **chain-of-thought** data ([[reasoning/chain-of-thought]]) in the mixture was needed to preserve the model's ability to reason step by step after tuning. The released Flan-T5 checkpoints became widely used baselines.

::: example Capped mixing {#ex-mixing}
FLAN mixed its datasets in proportion to their sizes, but capped each at $30{,}000$ examples so that large datasets would not swamp the rest. With three datasets of $400{,}000$, $50{,}000$ and $10{,}000$ examples, what fraction of the mixture does each receive, with and without the cap?
::: solution
Without the cap: $400/460 = 0.870$, $50/460 = 0.109$, $10/460 = 0.022$. With the cap the sizes become $30{,}000$, $30{,}000$ and $10{,}000$: fractions $3/7 = 0.429$, $0.429$ and $1/7 = 0.143$. The cap raises the smallest dataset's share more than sixfold; it is the same idea as temperature sampling of languages ([[pretraining/data-mixtures#sec-languages]]).
:::
:::

### Responses written by people and by models {#sec-self-instruct}

Academic task collections have short, formulaic responses — a label, a span, a sentence — unlike what users of an assistant want. **InstructGPT** (Ouyang et al., 2022) instead fine-tuned GPT-3 on about 13,000 prompts with responses written by hired labellers, many prompts coming from users of an API; this SFT model was the first stage of the RLHF pipeline of [[post-training/rlhf]]. Writing such responses by hand is expensive, which prompted two directions: crowd-sourcing them in the open (Databricks' Dolly with about 15,000 examples written by employees; OpenAssistant Conversations, Köpf et al., 2023, with more than 160,000 messages in 35 languages written and rated by volunteers) and generating them with models.

::: algorithm Self-Instruct (Wang et al., 2023) {#alg-self-instruct}
1. Start a task pool with a small set of human-written seed tasks ($175$ in the paper), each an instruction with one or more input–output instances.
2. Sample a few tasks from the pool (mixing seed and generated ones) and prompt a language model to write a **new instruction** in the same style.
3. Prompt the model to produce **instances** for the new instruction: inputs and outputs (for classification tasks, generating the output label first and then an input for it, to avoid all instances having the same label).
4. **Filter**: discard the instruction if it is too similar to one already in the pool (ROUGE-L overlap above $0.7$), if it asks for things a text model cannot do (images, for example), or if its instances are empty or duplicated.
5. Add the survivors to the pool and repeat from step 2. Finally, fine-tune a model on all generated (instruction, input, output) examples.
:::

Wang et al. (ACL 2023) generated about 52,000 instructions with about 82,000 instances using GPT-3, and reported that fine-tuning GPT-3 itself on them gave a large gain on Super-NaturalInstructions and came close to the first InstructGPT model in their human evaluation — a model improving by training on text it wrote, after filtering. Stanford's **Alpaca** (Taori et al., 2023) applied a simplified Self-Instruct pipeline with a stronger OpenAI model as the generator to fine-tune a 7-billion-parameter LLaMA model on 52,000 examples, for a reported cost of a few hundred US dollars, and showed that a small open model could be made to behave like a chat assistant cheaply. Using one model's outputs to train another is **distillation**, treated in [[post-training/distillation]], with its limits: imitation copies style more readily than capability.

### How much data does alignment need? {#sec-lima}

**LIMA** (Zhou et al., NeurIPS 2023) fine-tuned a 65-billion-parameter LLaMA model on only 1,000 carefully curated examples — about 750 selected from community question-answering sites and 250 written by the authors — with no reinforcement learning. In a human preference study on 300 test prompts, LIMA's responses were rated equivalent to or better than those of GPT-4 in 43% of cases, and more often against weaker systems. The authors proposed the **superficial alignment hypothesis**: that a model's knowledge and capabilities are learned almost entirely in pretraining, and alignment mostly teaches it which format and style to use when interacting with users. Their ablations, on a smaller model, found that the quality and diversity of the examples mattered more than their number.

::: warning What LIMA did and did not show
LIMA is often summarised as "1,000 examples are enough for alignment". The paper's claims are narrower. The comparison was a preference judgement on 300 prompts of the kind the curated data covered; it did not test safety, refusals, multi-turn robustness or hard reasoning at scale, and the authors reported that LIMA was weaker on some of these. The superficial alignment hypothesis is a *hypothesis* consistent with their results, not a measured fact, and later work has found that larger and more varied SFT sets keep helping on maths, code and tool use. The robust lesson is the ablation: a few thousand excellent, diverse examples can do more than a hundred thousand mediocre ones.
:::

Data selection has since become a research area of its own — filtering instruction sets with model-rated quality scores, by diversity, or by the difficulty of examples for the model being trained. Wang et al. (2023, "How far can camels go?") compared many open instruction datasets and found that none was best on every capability, so practical SFT mixtures combine sources: general chat, code, maths with worked solutions, multilingual data, safety examples (including appropriate refusals) and tool use.

::: quiz
A team fine-tunes a base model on $10{,}000$ responses written by contractors who sometimes make factual errors. According to [[#prop-imitation]], what is the best the SFT model can do?
- [ ] Learn the correct answers, since errors are random and average out
- [x] Reproduce the contractors' response distribution, including the rate and kind of errors they make
- [ ] Exceed the contractors, since the base model already knows the facts
- [ ] Learn only the formatting, ignoring the content
::: solution
SFT minimises the forward KL to the demonstrator's distribution, whose minimiser is that distribution itself. Errors that the contractors make systematically are part of what is imitated. In practice a model may sometimes do better than its demonstrations because of knowledge from pretraining and the smoothing effect of finite training, but nothing in the objective rewards correctness over imitation. Feedback-based methods in later chapters add exactly that missing signal.
:::
:::

## Chat templates and special tokens {#sec-templates}

A deployed assistant receives a conversation, not a string. Before the model sees it, the conversation is rendered into one token sequence by a **chat template**.

::: definition Chat template {#def-template}
A **chat template** is a deterministic function from a conversation — an ordered list of turns, each with a **role** (system, user, assistant, and in many models tool) and content — to a token sequence. It inserts **control tokens** that mark the start of each turn and its role and the end of each turn, and, at inference time, appends the header of an assistant turn so that the model's continuation is the reply. Control tokens are **special tokens**: single entries in the vocabulary that the tokeniser never produces from ordinary text.
:::

A typical rendering, with generic token names, is

```text
<|bos|><|system|>You are a concise assistant.<|end|><|user|>What is the capital of France?<|end|><|assistant|>Paris.<|end|>
```

Real templates differ in their token strings and details. The ChatML convention published by OpenAI in 2023 wraps each turn as `<|im_start|>role … <|im_end|>` and is used by several open-weight families; Llama 2's chat models used `[INST] … [/INST]` markers with a separate system block, and later Llama versions switched to header tokens; other families use their own. Libraries such as Hugging Face Transformers store each model's template with its tokeniser (as a small Jinja program), so that the training and inference renderings match.

The **system prompt** is a turn placed before the conversation by the developer or deployer, carrying instructions that should govern the whole dialogue — persona, format, constraints, available tools. Models learn to give it priority only if they are trained on examples where the system prompt and the user request interact, including conflicts; OpenAI's work on an **instruction hierarchy** (Wallace et al., 2024) trained models to prefer system instructions over conflicting user or tool content, a defence against prompt injection ([[prompting-rag/prompt-design#sec-injection]]).

Why special tokens rather than plain text such as `User:`? Three reasons. A single reserved token cannot be produced by a user typing text, so the boundary between turns cannot be forged by ordinary input (provided the serving code escapes or refuses the special strings in user content). It costs one position instead of several. And the model can attach a sharp meaning to it — in particular, generation stops when the model emits the end-of-turn token, so this token must be a **training target** at the end of every assistant reply. New special tokens need new rows in the embedding and output matrices; they are usually initialised to the mean of existing embeddings, as in vocabulary extension ([[pretraining/continued-pretraining#sec-tokeniser]]).

::: warning Template mismatch fails silently
A model fine-tuned with one template and served with another usually still produces text — just worse text: it may ignore the system prompt, fail to stop, continue the user's turn, or lose its refusals. Common causes are a missing or duplicated beginning-of-sequence token, a different whitespace convention around role headers (which changes the tokenisation of the first word of a reply), an end-of-turn token that was masked out of the loss so the model never learned to emit it, and prompts built by hand-written string formatting instead of the model's own template. Check by rendering a conversation with the training code and with the serving code and comparing the token ids, not the strings.
:::

### Multi-turn conversations and packing {#sec-multiturn}

In a conversation with several assistant turns, the loss usually covers **every** assistant turn: each is a reply conditioned on everything before it, and one forward pass computes all of them. Some pipelines train only the final turn when earlier assistant turns came from a weaker model and are not worth imitating. Tool calls and tool results fit the same pattern: the model's own tool-call tokens are targets, the tool's returned text is not ([[agents/function-calling]]).

Instruction examples are short compared with the context length, so for efficiency several are **packed** into one training row. Packing raises the fraction of useful positions from perhaps a third to nearly all, but naive packing lets each example attend to the unrelated examples before it in the row. The clean solution is a **block-diagonal causal mask** — each token may attend only to earlier tokens of its own example — together with position ids that restart at zero for each example. Efficient attention kernels support such variable-length batches directly ([[transformers/efficient-attention]]).

::: example The cost of SFT {#ex-sft-cost}
A $7$-billion-parameter model is fine-tuned on $100{,}000$ conversations averaging $1{,}000$ tokens, for $3$ epochs. Using the estimate of $6ND$ training FLOPs ([[pretraining/training-loop#prop-6nd]]), compare the compute with that of pretraining the same model on $2$ trillion tokens.
::: solution
$D = 10^5\cdot10^3\cdot3 = 3\times10^8$ tokens processed, so SFT costs $6\cdot7\times10^9\cdot3\times10^8 = 1.26\times10^{19}$ FLOPs. Pretraining costs $6\cdot7\times10^9\cdot2\times10^{12} = 8.4\times10^{22}$ FLOPs. The ratio is $1.5\times10^{-4}$: SFT uses about $0.015\%$ of the pretraining compute. Masking does not reduce the cost, since the prompt tokens still pass through the network. The expensive part of SFT is the data, not the compute.
:::
:::

### Hyperparameters and their effects {#sec-hyper}

SFT runs are short — typically one to a few epochs over the data — with a peak learning rate around an order of magnitude below the end of pretraining's schedule, a warm-up and a decay. Because the dataset is small, the model can overfit: InstructGPT's labeller-written SFT data were trained for 16 epochs, and Ouyang et al. reported that validation loss began rising after one epoch while reward-model scores and human preferences kept improving with more epochs. Validation loss on demonstrations is therefore a poor guide to SFT quality; small held-out evaluations of the behaviour you care about are better ([[evaluation/evaluation-principles]]).

Fine-tuning also moves the model away from its pretrained state, and abilities that the SFT data do not exercise can degrade — **catastrophic forgetting** ([[pretraining/continued-pretraining#sec-forgetting]]). Mitigations are the same as for continued pretraining: low learning rates, few steps, mixing in some general data, and parameter-efficient methods that change fewer weights ([[post-training/parameter-efficient-tuning]]).

## What SFT cannot do {#sec-limits}

SFT is simple, stable and effective, and for many purposes it is all the post-training a model gets. Its limits follow from [[#prop-imitation]].

- **It optimises likelihood, not quality.** A response that is $90\%$ excellent and contains one fabricated citation has almost the same loss as a perfect one. The objective cannot express "this answer is better than that one".
- **The demonstrations bound the result.** Writing an excellent answer to a hard question is much harder than recognising one; preferences between candidate answers are cheaper and more reliable to collect than demonstrations ([[post-training/reward-models]]).
- **It can teach hallucination.** If a demonstration states a fact the model did not know from pretraining, SFT teaches the model to produce confident statements without supporting knowledge. Gekhman et al. (2024) found that examples introducing new knowledge were learned more slowly than examples consistent with what the model knew, and that, once learned, they increased the model's tendency to hallucinate on other questions ([[prompting-rag/hallucination]]).
- **It never sees its own mistakes.** Teacher forcing conditions on the demonstrator's prefix; at generation time the model conditions on its own, possibly erroneous, prefix ([[pretraining/pretraining-objectives#sec-teacher-forcing]]). Methods that train on the model's own samples — reinforcement learning, the subject of the next chapter — do see their own mistakes.

## The pieces in code {#sec-code}

The listing renders a two-turn conversation with a generic template, builds the next-token labels with prompt masking, and compares the two averages of [[#prop-weights]] on a batch of two responses with simulated per-token losses. Tokens are whitespace-separated words, to keep the output readable.

```python
import math, random

SPECIAL = ["<|bos|>", "<|system|>", "<|user|>", "<|assistant|>", "<|end|>"]

def render(conversation):
    """Render a list of (role, text) turns with a generic chat template.
    Returns the token list and a parallel list of loss flags (1 = train on this token)."""
    tokens, train = ["<|bos|>"], [0]
    for role, text in conversation:
        tokens.append(f"<|{role}|>"); train.append(0)          # role header: never a target
        words = text.split()
        tokens += words
        flag = 1 if role == "assistant" else 0                 # prompt masking
        train += [flag] * len(words)
        tokens.append("<|end|>"); train.append(flag)           # the model must learn to stop
    return tokens, train

conv = [("system", "You are a concise assistant."),
        ("user", "What is the capital of France?"),
        ("assistant", "Paris."),
        ("user", "And of Italy?"),
        ("assistant", "Rome, which is also its largest city.")]
tokens, train = render(conv)
# labels for next-token prediction: position t predicts token t+1; -100 = ignored
labels = [tokens[t + 1] if train[t + 1] else -100 for t in range(len(tokens) - 1)]
print(len(tokens), "tokens,", sum(train), "trained targets")
print(" ".join(tok if f else f"[{tok}]" for tok, f in zip(tokens, train)))

# per-token versus per-sequence averaging on a batch of two examples
rng = random.Random(0)
lengths = [4, 60]                                             # response lengths in tokens
ranges = [(2.0, 3.0), (0.5, 1.5)]                            # the short answer is harder
losses = [[rng.uniform(*ab) for _ in range(n)] for n, ab in zip(lengths, ranges)]
per_token = sum(map(sum, losses)) / sum(lengths)
per_seq = sum(sum(l) / len(l) for l in losses) / len(losses)
w_tok = [n / sum(lengths) for n in lengths]
print("mean loss of each example:", [round(sum(l) / len(l), 4) for l in losses])
print(f"per-token average {per_token:.4f}, per-sequence average {per_seq:.4f}")
print("weight of each example, per-token:", [round(w, 4) for w in w_tok], " per-sequence: [0.5, 0.5]")
```

```text
33 tokens, 10 trained targets
[<|bos|>] [<|system|>] [You] [are] [a] [concise] [assistant.] [<|end|>] [<|user|>] [What] [is] [the] [capital] [of] [France?] [<|end|>] [<|assistant|>] Paris. <|end|> [<|user|>] [And] [of] [Italy?] [<|end|>] [<|assistant|>] Rome, which is also its largest city. <|end|>
mean loss of each example: [2.5705, 1.0731]
per-token average 1.1667, per-sequence average 1.8218
weight of each example, per-token: [0.0625, 0.9375]  per-sequence: [0.5, 0.5]
```

Bracketed tokens are inputs only; the others are targets. Of $33$ tokens, $10$ are trained: the two replies and their end-of-turn tokens. The role header `<|assistant|>` is not a target, because at inference time the template supplies it. In a real implementation `labels` holds token ids, and the loss is `cross_entropy(logits.view(-1, V), labels.view(-1), ignore_index=-100)` on logits of shape $(B, T, V)$.

::: history
Fine-tuning a pretrained language model on a downstream task goes back to Dai and Le (2015) and became standard with GPT (Radford et al., 2018) and BERT (Devlin et al., 2019). Casting many tasks into one text-to-text format was the programme of the decaNLP challenge (McCann et al., 2018) and T5 (Raffel et al., 2020), and natural-language task instructions were collected in Natural Instructions (Mishra et al., 2022). The step to *zero-shot* generalisation from instruction-formatted multi-task training came with FLAN (Wei et al., arXiv 2021, ICLR 2022) and T0 (Sanh et al., ICLR 2022), followed by Super-NaturalInstructions (Wang et al., 2022) and Flan-T5/Flan-PaLM (Chung et al., 2022). InstructGPT (Ouyang et al., 2022) made labeller-written demonstrations the first stage of RLHF. In 2023, Self-Instruct (Wang et al.) and Alpaca (Taori et al.) showed that model-generated instruction data could make small open models into assistants, LIMA (Zhou et al.) argued that a thousand curated examples go a long way, and open conversation datasets such as OpenAssistant Conversations (Köpf et al.) appeared. Chat templates with reserved control tokens became standard with the chat models of 2022–2023.
:::

::: summary
- **Supervised fine-tuning** minimises the causal loss on responses given prompts, with **prompt masking**: prompt tokens are inputs but not targets ([[#eq-sft]]).
- Its expected loss is the demonstrator's entropy plus a **forward KL** to the demonstrator, so SFT can at best **imitate** the demonstrators, errors included, and tends to cover all of their behaviours ([[#prop-imitation]]).
- Training on prompt tokens adds a term for modelling users; masking keeps the gradient on the replies. Token averaging weights examples by length, sequence averaging equally ([[#prop-weights]]).
- **FLAN** and **T0** showed that multi-task training on instruction templates generalises zero-shot to held-out tasks, at sufficient scale; Flan-T5/Flan-PaLM scaled tasks to $1{,}836$ and needed chain-of-thought data to keep reasoning; **Self-Instruct** and Alpaca used model-generated data; **LIMA** found that $1{,}000$ curated examples go far and proposed the (hypothetical) superficial alignment hypothesis.
- **Chat templates** render conversations with reserved **special tokens** for roles and turn ends; the end-of-turn token must be a target, and the training and serving templates must match token for token. Packing needs a block-diagonal mask.
- SFT is cheap in compute ($\sim10^{-4}$ of pretraining) but bounded by its demonstrations, blind to response quality and to its own mistakes — the gaps that feedback-based methods fill.
:::

## Exercises

::: exercise Counting targets {level=1 check="154"}
A conversation has a system turn of $25$ tokens, a user turn of $60$, an assistant reply of $70$, a user turn of $15$ and an assistant reply of $82$. Each turn is wrapped by a role header and an end-of-turn token, and there is one beginning-of-sequence token. How many tokens are SFT targets if every assistant reply and its end-of-turn token are trained?
::: solution
The targets are $70 + 82 = 152$ reply tokens plus $2$ end-of-turn tokens: $154$. (The sequence has $25 + 60 + 70 + 15 + 82 = 252$ content tokens, $10$ wrapping tokens and $1$ beginning token, $263$ in all, so $58.6\%$ of positions are targets.)
:::
:::

::: exercise A weight under token averaging {level=1 check="0.1"}
A batch contains two responses of $10$ and $90$ tokens, trained with the token-averaged loss [[#eq-sft]]. What fraction of the batch's gradient weight does the shorter response receive?
::: solution
By [[#prop-weights]], $w = 10/(10 + 90) = 0.1$. With sequence averaging it would receive $0.5$.
:::
:::

::: exercise An SFT loss by hand {level=1 check="0.3405"}
A model assigns the three tokens of a response the probabilities $0.5$, $0.8$ and $0.9$ given the prompt and earlier response tokens. What is the SFT loss in nats per token, to four decimal places? What is the probability of the whole response?
::: solution
$-\tfrac13(\ln0.5 + \ln0.8 + \ln0.9) = \tfrac13(0.6931 + 0.2231 + 0.1054) = 1.0217/3 = 0.3405$ nats per token. The response probability is $0.5\cdot0.8\cdot0.9 = 0.36 = e^{-1.0217}$.
:::
:::

::: exercise Compute of an SFT run {level=2 check="0.0003"}
A $70$-billion-parameter model pretrained on $15$ trillion tokens is fine-tuned on $1$ million conversations of $1{,}500$ tokens for $3$ epochs. Using $6ND$, what fraction of the pretraining compute does SFT use? Give the answer to one significant figure.
::: solution
SFT processes $10^6\cdot1500\cdot3 = 4.5\times10^9$ tokens; the ratio of compute equals the ratio of tokens because $N$ is the same: $4.5\times10^9/1.5\times10^{13} = 3\times10^{-4}$, i.e. $0.0003$ ($0.03\%$). The absolute compute, $6\cdot7\times10^{10}\cdot4.5\times10^9 = 1.9\times10^{21}$ FLOPs, is still large enough to need a cluster, but tiny next to pretraining.
:::
:::

::: exercise Capped mixing {level=2 check="0.1429"}
Using the capped examples-proportional mixing of [[#ex-mixing]] with a cap of $30{,}000$, three datasets have $400{,}000$, $50{,}000$ and $10{,}000$ examples. What fraction of the mixture comes from the smallest dataset (four decimal places)? With a cap of $5{,}000$, what are the fractions?
::: solution
Capped sizes $30{,}000$, $30{,}000$, $10{,}000$: the smallest gets $10/70 = 0.1429$. With a cap of $5{,}000$ every dataset is capped and the mixture is uniform, $1/3$ each — at which point each example of the smallest dataset is seen $40$ times as often as one of the largest, risking overfitting on it.
:::
:::

::: exercise Masked and unmasked losses {level=2}
A model assigns a prompt of $3$ tokens the conditional probabilities $0.1$, $0.2$ and $0.05$, and the $2$-token response the probabilities $0.6$ and $0.9$. Compute the summed masked loss, the summed unmasked loss, and $-\log p_\theta(\mathbf{x}, \mathbf{y})$, and verify [[#prop-unmasked]]. Which term dominates the gradient of the unmasked loss, and why is that undesirable?
::: solution
Masked: $-(\ln0.6 + \ln0.9) = 0.5108 + 0.1054 = 0.6162$. Prompt part: $-(\ln0.1 + \ln0.2 + \ln0.05) = 2.3026 + 1.6094 + 2.9957 = 6.9078$. Unmasked: $6.9078 + 0.6162 = 7.5240 = -\ln(0.1\cdot0.2\cdot0.05\cdot0.6\cdot0.9) = -\ln(5.4\times10^{-4})$, which is $-\log p_\theta(\mathbf{x}, \mathbf{y})$. The prompt term is more than ten times larger, because user prompts are unpredictable; its gradient would mostly teach the model to predict what users type, which an assistant never needs to do.
:::
:::

::: exercise Diagnosing a template bug {level=2}
After fine-tuning, a model answers well but never stops: it writes its answer, then a new `<|user|>` turn inventing the user's next question, and continues indefinitely. Give two possible causes in the training pipeline and one at serving time, and how you would test each.
::: solution
Training: (1) the end-of-turn token after assistant replies was masked out of the loss (for example, by masking every special token), so the model never learned to emit it — test by printing the label mask for one example; (2) packing without a block-diagonal mask or without end tokens between examples, so the model learned that a reply is followed by more conversation — inspect a packed row. Serving: the stop condition does not include the end-of-turn token id (for instance, it waits for the general end-of-sequence token, or the template's end token is tokenised as several ordinary tokens because it was added as text rather than as a special token) — compare the token ids of the rendered prompt and of the model's output against the vocabulary's special-token ids.
:::
:::

::: exercise Imitating a mixture of demonstrators {level=3 check="0.6109"}
For a given prompt, $70\%$ of demonstrators write a short answer $A$ and $30\%$ a long answer $B$ (treat each as a single outcome). (a) What distribution minimises the expected SFT loss, and what is the minimum expected loss in nats (four decimal places)? (b) Suppose the model is restricted to the family $q_\lambda = (\lambda, 1-\lambda)$ with $\lambda\in[0.9, 1]$, for example because of a strong prior from pretraining. Which $\lambda$ minimises the forward KL, and what does the answer illustrate?
::: solution
(a) By [[#prop-imitation]] the minimiser is $q = (0.7, 0.3)$, and the minimum is the entropy $-(0.7\ln0.7 + 0.3\ln0.3) = 0.2497 + 0.3612 = 0.6109$ nats. (b) The expected loss $-0.7\ln\lambda - 0.3\ln(1-\lambda)$ has derivative $-0.7/\lambda + 0.3/(1-\lambda)$, which is positive for $\lambda > 0.7$, so on $[0.9, 1]$ the loss increases and the minimum is at the boundary $\lambda = 0.9$ — as close to the demonstrator's mixture as allowed. The loss is infinite at $\lambda = 1$: forward KL refuses to give zero probability to anything the demonstrators do. Even if answer $A$ were better, SFT would not choose it over the mixture; that requires a signal about quality.
:::
:::

::: exercise Implementing packing with a block-diagonal mask {level=3}
Write plain-Python functions `pack(examples, max_len)`, which greedily packs (tokens, flags) examples into rows of at most `max_len` tokens and records a segment id per token, and `mask(segments)`, which returns the causal mask that also blocks attention between different examples. Run them on three short examples with `max_len = 12`, and say what else must restart per example.
::: solution
```python
def pack(examples, max_len):
    """examples: list of (tokens, train_flags). Greedily pack into rows of length <= max_len.
    Returns rows of (tokens, flags, segment_ids)."""
    rows, cur = [], ([], [], [])
    for seg, (toks, flags) in enumerate(examples):
        if len(cur[0]) + len(toks) > max_len and cur[0]:
            rows.append(cur); cur = ([], [], [])
        cur[0].extend(toks); cur[1].extend(flags); cur[2].extend([seg] * len(toks))
    if cur[0]:
        rows.append(cur)
    return rows

def mask(segments):
    """Causal mask that also blocks attention across examples: M[i][j] = 1 if i may attend to j."""
    T = len(segments)
    return [[1 if j <= i and segments[i] == segments[j] else 0 for j in range(T)] for i in range(T)]

ex = [(["<u>", "hi", "<a>", "hello", "<e>"], [0, 0, 0, 1, 1]),
      (["<u>", "2+2?", "<a>", "4", "<e>"], [0, 0, 0, 1, 1]),
      (["<u>", "name", "a", "colour", "<a>", "red", "<e>"], [0, 0, 0, 0, 0, 1, 1])]
for toks, flags, segs in pack(ex, 12):
    print(toks); print("flags", flags, " segments", segs)
    for row in mask(segs):
        print("".join(map(str, row)))
```

```text
['<u>', 'hi', '<a>', 'hello', '<e>', '<u>', '2+2?', '<a>', '4', '<e>']
flags [0, 0, 0, 1, 1, 0, 0, 0, 1, 1]  segments [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
1000000000
1100000000
1110000000
1111000000
1111100000
0000010000
0000011000
0000011100
0000011110
0000011111
['<u>', 'name', 'a', 'colour', '<a>', 'red', '<e>']
flags [0, 0, 0, 0, 0, 1, 1]  segments [2, 2, 2, 2, 2, 2, 2]
1000000
1100000
1110000
1111000
1111100
1111110
1111111
```

The first two examples share a row; the mask is block-diagonal with a lower-triangular block for each. The third does not fit and starts a new row (which would be padded to the batch length, with padded positions masked out of the loss). Position ids must also restart at $0$ for each segment, so that the second example is encoded exactly as if it were alone; and the label of the last token of one example must not be the first token of the next — here the flags already exclude the next example's first token, a user header, from the loss.
:::
:::

::: exercise Forgetting during SFT {level=3}
A team fine-tunes a model on $50{,}000$ customer-support dialogues and finds that its scores on a maths benchmark drop from $52\%$ to $41\%$. Propose three changes to the SFT run that should reduce the drop, explain the mechanism of each with reference to [[pretraining/continued-pretraining#sec-forgetting]], and say how you would check that the support quality is not sacrificed.
::: solution
(1) **Mix in general data**, including maths with worked solutions, at a few per cent to tens of per cent of the batches (replay): the loss then penalises drifting away from the maths behaviour. (2) **Reduce the update**: a lower learning rate, fewer epochs, or a stronger pull towards the initial weights; forgetting grows with the distance moved in directions that matter for the old task, which the curvature-weighted analysis of the continued-pretraining chapter makes precise. (3) **Change fewer parameters**: a low-rank adapter ([[post-training/parameter-efficient-tuning]]) restricts the update to a small subspace, and Biderman et al. (2024) reported that LoRA forgets less than full fine-tuning (while also learning less). To check the trade-off, hold out a set of support dialogues and evaluate both the support task and the maths benchmark for every variant, ideally with several seeds, and choose the variant on the frontier of the two scores rather than by validation loss.
:::
:::
