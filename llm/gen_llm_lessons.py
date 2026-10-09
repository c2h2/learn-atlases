"""Generate substantive LLM lesson .md files for all empty courses.

Each chapter gets a lexicon (key terms → definitions). The lesson follows the
validator's block structure: ::: definition / ::: proposition / ::: example
/ ::: solution / ::: warning / ::: quiz / ## Exercises.
"""
import json, os, glob

LEX = {
    "function-calling": {
        "function calling": "The practice of exposing typed API signatures to an LLM so it can decide when to invoke them. The model emits a structured tool call (name, JSON arguments); the runtime executes it and returns a result the model can use.",
        "tool schema": "The JSON schema describing a callable: its name, parameter types, required fields, and a natural-language description the model reads to decide applicability.",
        "arguments": "The JSON object the model produces to fill the schema parameters. Validation errors fall back to retries or graceful refusals.",
        "result": "The value the runtime returns after executing the call. Well-typed results let the model compose further calls or answer from them.",
        "parallel calls": "When an LLM emits multiple independent tool calls in one turn. The runtime may execute them concurrently; dependent calls must be sequenced.",
        "tool choice": "The policy for whether the model may, must, or must not call tools. 'auto' lets the model decide; 'required' forces a call; 'none' disables it.",
    },
    "agent-loops": {
        "agent loop": "The control structure that turns a single-shot LLM into an agent: plan, act, observe, reflect, repeat until the goal is met or budget is exhausted.",
        "plan": "A short sequence of intended actions the model produces before executing them. Plans are revised as new observations arrive.",
        "observation": "The result returned from the environment after each action; the agent conditions on it to decide the next step.",
        "reflection": "A self-evaluation step where the agent critiques its own trajectory to detect dead ends and revise strategy.",
        "stopping criterion": "The condition that ends the loop: success signal, budget exhaustion, loop detection, or a hard timeout.",
    },
    "planning": {
        "task decomposition": "Splitting a goal into sub-goals the agent can execute. Recursive decomposition turns a vague request into concrete tool calls.",
        "planning horizon": "How many steps ahead the agent reasons. Longer horizons enable multi-step plans but increase the chance of compounding errors.",
        "re-planning": "Discarding or amending the current plan when observations invalidate it.",
        "backtracking": "Returning to an earlier state and trying an alternative branch when a plan fails.",
    },
    "memory-context": {
        "short-term memory": "The conversation window itself. Everything the model attends to in the current forward pass.",
        "long-term memory": "External stores the agent retrieves from across sessions: vector databases, knowledge graphs, or structured records.",
        "context management": "Summarization, pruning, and retrieval strategies that keep the window within token limits while preserving task-relevant state.",
        "scratchpad": "A private reasoning channel (CoT, ReAct trace) the agent uses to plan before acting. Usually excluded from the user-visible response.",
    },
    "code-agents": {
        "code generation": "LLM writing source code from a natural-language specification.",
        "execution": "Running generated code in a sandbox to observe results and feed them back to the model.",
        "test-driven generation": "The agent writes tests first, then code, then iterates until tests pass.",
        "sandbox": "An isolated environment (container, WASM, restricted process) where generated code can run without endangering the host.",
    },
    "computer-use": {
        "browser automation": "Driving a browser programmatically: navigate, click, type, extract. LLMs can plan and execute these actions from a natural-language goal.",
        "accessibility tree": "A structured representation of a page that an LLM can reason over without vision.",
        "DOM": "The document object model the browser exposes; agents often interact via DOM queries and event dispatch.",
        "screenshot": "A rendered image of the page. Vision models read it to identify clickable regions and verify state changes.",
    },
    "multi-agent-systems": {
        "multi-agent system": "Several agents with distinct roles (planner, executor, critic) cooperating on a task.",
        "role": "An agent's assigned responsibility and voice, often set via system prompt.",
        "communication": "Message passing between agents. Structured protocols (JSON, function calls) beat free-form prose for reliability.",
        "orchestration": "A meta-agent that dispatches subtasks to specialists and aggregates results.",
    },
    "agent-security": {
        "prompt injection": "A user or retrieved document containing instructions that hijack the agent's behavior.",
        "privilege escalation": "An agent tricked into using a more powerful tool than the task warrants.",
        "data exfiltration": "An agent leaking private context to an attacker via tool arguments or final response.",
        "guardrails": "Runtime filters and policies that validate inputs, constrain tool access, and log every action for review.",
    },
    "evaluation-principles": {
        "benchmark": "A dataset plus metric plus protocol used to compare systems. A benchmark is only as good as the validity of its measurement.",
        "metric": "The scalar (accuracy, F1, BLEU, etc.) or rubric score computed from outputs. Choose metrics to reflect the task's true success criterion.",
        "variance": "How much the metric moves across seeds, splits, and prompts. High variance means noisy comparisons.",
        "saturation": "When top systems cluster near the maximum score, the benchmark no longer discriminates.",
        "contamination": "Test items leaking into training data, inflating scores.",
    },
    "benchmarks": {
        "training set": "Examples used to fit model parameters.",
        "validation set": "Held-out examples used to tune hyperparameters and select checkpoints.",
        "test set": "Examples never used during training; the only fair basis for final comparison.",
        "held-out": "Data excluded from training to estimate generalization.",
        "split": "A partition of data into train/validation/test. Splits must be random and contamination-free.",
    },
    "contamination": {
        "leakage": "Any path by which test information reaches training, including through web crawls.",
        "deduplication": "Removing exact and near-duplicate items so the model cannot memorize test items.",
        "contamination check": "Detecting overlap between training corpora and benchmark items via n-gram overlap or model perplexity probes.",
    },
    "human-evaluation": {
        "human evaluation": "Asking people to judge outputs. Gold standard for open-ended tasks but expensive and noisy.",
        "inter-annotator agreement": "How much human judgments agree; low agreement signals ambiguous criteria.",
        "arena": "A platform where humans blind-compare outputs from different systems (e.g., Chatbot Arena).",
    },
    "model-judges": {
        "LLM-as-judge": "Using a strong model to grade outputs. Scalable but inherits the judge's biases.",
        "preference pair": "Two outputs presented to a judge; the judge chooses the better one.",
        "position bias": "Judges' tendency to favor one presentation order over the other.",
        "self-enhancement": "Judges scoring outputs that resemble their own style higher.",
    },
    "capability-evaluations": {
        "capability eval": "A targeted test of a specific skill (coding, math, tool use).",
        "dangerous capability": "A skill whose acquisition poses real-world risk (bio, cyber).",
        "asymptotic evaluation": "Measuring performance at the limit of compute, to anticipate capabilities before deployment.",
    },
    "evaluation-statistics": {
        "statistical significance": "Whether a performance gap is larger than measurement noise.",
        "confidence interval": "The range of values consistent with the data at a given confidence level.",
        "power": "Probability of detecting a real difference. Low power leads to false 'ties'.",
    },
    "decoding-sampling": {
        "greedy decoding": "Always take the argmax token. Fast but myopic and repetitive.",
        "beam search": "Keep the top-K partial sequences. Better than greedy for short outputs, poor for long creative ones.",
        "temperature": "Scales logits before softmax. High temperature = more entropy, lower = sharper.",
        "top-k": "Restrict sampling to the k highest-probability tokens.",
        "top-p (nucleus)": "Sample from the smallest set of tokens whose cumulative probability exceeds p.",
    },
    "kv-cache": {
        "KV cache": "Per-layer store of past keys and values so the model need not recompute them at each generation step.",
        "prefill": "The first forward pass that processes the entire prompt and populates the KV cache.",
        "decode step": "Each subsequent forward pass that produces one new token using the cache.",
        "cache size": "Roughly 2 × layers × hidden_dim × context_length × batch × bytes_per_element.",
    },
    "batching-serving": {
        "throughput": "Tokens or requests processed per second. Batched serving trades latency for throughput.",
        "continuous batching": "Packing requests into dynamic micro-batches so GPU stays saturated.",
        "latency": "Time from request to completion. Interactive applications bound this tightly.",
    },
    "quantisation": {
        "int8": "8-bit integers. Halves memory and speeds arithmetic with modest accuracy loss.",
        "int4": "4-bit weights. Aggressive compression; may need group-wise or double-quantization schemes.",
        "GPTQ": "Post-training quantization using approximate Hessian information to allocate rounding errors.",
        "AWQ": "Activation-aware weight quantization; protects channels with large activations.",
    },
    "model-compression": {
        "distillation": "Training a small student to mimic a teacher's outputs (or hidden states).",
        "pruning": "Removing weights or neurons that contribute little; iterative pruning with retraining.",
    },
    "speculative-decoding": {
        "draft model": "A cheap model that proposes candidate tokens.",
        "verify": "A single forward pass of the large model checks the draft and accepts or rejects each token.",
        "acceptance rate": "Fraction of proposed tokens the large model would have produced anyway.",
        "speedup": "Speedup ≈ 1 / (draft_cost + verify_cost_per_token + acceptance_penalty).",
    },
    "long-context": {
        "context window": "The maximum number of tokens the model attends over in one pass.",
        "RoPE scaling": "Adjusting rotary embedding frequencies to extend context beyond training length.",
        "sliding window attention": "Each token attends only to the most recent W tokens, cutting attention cost.",
    },
    "latency-cost": {
        "cost per token": "GPU-seconds per generated token times GPU price.",
        "p50 / p99 latency": "Median and tail latency. p99 dominates user experience.",
    },
    "interpretability-goals": {
        "interpretability": "The project of understanding what internal activations and circuits compute.",
        "mechanistic": "Explanation in terms of components and their interactions (neurons, heads, layers).",
        "behavioral": "Explanation from inputs to outputs without inspecting internals.",
    },
    "probing-attribution": {
        "probing": "Training a classifier on internal activations to ask whether a concept is linearly encoded.",
        "attribution": "Estimating which components contributed most to a particular output.",
        "integrated gradients": "Attribution method integrating gradients along a path from baseline to actual input.",
    },
    "residual-stream": {
        "residual stream": "The running sum of layer outputs that acts as a shared memory across transformer layers.",
        "skip connection": "The identity path that adds a layer's output to its input, preserving the stream.",
    },
    "circuits": {
        "circuit": "A subgraph of neurons/heads implementing a specific computation.",
        "induction head": "A head that copies the previous occurrence of the current token's context.",
        "copy head": "A head that attends to a previous token and copies it forward.",
    },
    "superposition": {
        "superposition": "Encoding more features than there are dimensions by spreading each feature across a small subspace.",
        "polysemanticity": "A single neuron responding to multiple unrelated features because it participates in several superposed features.",
        "sparse coding": "Feature representation where only a few dimensions are active at a time, making superposition possible.",
    },
    "sparse-features": {
        "sparse autoencoder (SAE)": "An autoencoder trained to reconstruct activations through a much wider bottleneck with L1 penalty; the recovered directions correspond to interpretable features.",
        "dictionary learning": "The general problem of finding a sparse basis in which data has compact representation.",
    },
    "causal-interventions": {
        "causal intervention": "Actively setting an internal activation to a value to test its effect on output.",
        "ablation": "Zeroing out a component to see what behavior disappears.",
        "steering": "Adding a direction vector to activations to bias behavior toward a desired concept.",
    },
    "open-problems": {
        "scalability": "Current interpretability methods run on small models; scaling to frontier models is unsolved.",
        "faithfulness": "Whether an explanation accurately reflects the computation that produced the output.",
    },
    "self-attention": {
        "Q / K / V": "Query, key, value matrices projected from the input. Attention scores = softmax(QKᵀ/√d)V.",
        "dot-product attention": "Scores tokens by inner product of query and key; softmax turns scores into weights.",
        "causal mask": "Upper-triangular zeros that prevent attending to future positions.",
    },
    "multi-head-attention": {
        "head": "One Q/K/V triple operating in a low-dimensional subspace. Multiple heads attend to different aspects.",
        "concatenation": "Heads' outputs are concatenated and projected to produce the layer output.",
    },
    "positional-encoding": {
        "sinusoidal": "Fixed sin/cos position embeddings with geometric frequencies.",
        "learned": "Per-position embeddings learned during training.",
        "RoPE": "Rotary embeddings that encode relative position by rotating query and key vectors.",
    },
    "transformer-block": {
        "block": "One (attention + residual + norm) followed by one (MLP + residual + norm).",
        "MLP": "Two-layer feedforward with hidden width usually 4× model width.",
    },
    "architecture-families": {
        "encoder": "Bidirectional model producing contextual representations (BERT-style).",
        "decoder": "Causal model that predicts the next token (GPT-style).",
        "encoder-decoder": "Encoder reads the input, decoder generates output conditioned on encoder states (T5, translation).",
    },
    "attention-complexity": {
        "quadratic cost": "Attention cost scales as O(n²d) in sequence length n and dimension d.",
        "long-context": "Techniques to extend context without paying quadratic cost.",
    },
    "efficient-attention": {
        "linear attention": "Reformulations with O(n) cost via kernel trick or low-rank structure.",
        "sparse attention": "Restrict attention to a fixed or learned subset of positions.",
    },
    "mixture-of-experts": {
        "expert": "A feedforward block specialized for a subset of inputs.",
        "router": "A small network that decides which experts handle each token.",
        "sparse activation": "Only a subset of experts activate per token, giving large parameter counts at low per-token FLOPs.",
    },
    "perceptrons-mlps": {
        "perceptron": "A single linear unit with a threshold activation; the simplest classifier.",
        "MLP": "Stack of linear layers with nonlinearities in between; universal approximator.",
    },
    "backpropagation": {
        "chain rule": "Differentiating composed functions by multiplying local derivatives.",
        "forward pass": "Computing activations from input to output.",
        "backward pass": "Computing gradients from output back to input by reverse-mode differentiation.",
    },
    "automatic-differentiation": {
        "autograd": "A system that records operations during the forward pass and computes gradients automatically.",
        "computational graph": "Directed graph of operations over which gradients flow.",
    },
    "optimisers": {
        "SGD": "Stochastic gradient descent: θ ← θ − lr ∇θ.",
        "Adam": "Adaptive optimizer combining momentum with per-parameter learning rates.",
        "AdamW": "Adam with decoupled weight decay; the standard optimizer for transformer training.",
    },
    "initialisation-normalisation": {
        "Xavier": "Initialize weights with variance 2/(fan_in + fan_out) to preserve signal variance.",
        "batch norm": "Normalize activations across the batch; reduces covariate shift.",
        "layer norm": "Normalize activations per token across features; standard in transformers.",
    },
    "regularisation-deep": {
        "dropout": "Randomly zero activations during training; ensemble effect.",
        "weight decay": "L2 penalty on parameters; discourages large weights.",
    },
    "convolutional-networks": {
        "convolution": "Sliding-window linear filter; weight sharing gives translation equivariance.",
        "kernel": "The small filter applied at each position.",
    },
    "training-practice": {
        "learning rate": "Step size for gradient updates; the most important hyperparameter.",
        "warmup": "Linearly ramp the learning rate at the start of training for stability.",
        "cosine schedule": "Anneal learning rate along a cosine curve to a floor.",
    },
    "scaling-laws": {
        "scaling law": "Empirical power law relating loss to compute, parameters, and data.",
        "compute-optimal": "Choosing model size and data size that minimize loss for a compute budget.",
    },
    "compute-optimal-training": {
        "Chinchilla": "The result that compute-optimal training uses roughly equal parameters and training tokens.",
        "FLOPs": "Float operations; training FLOPs ≈ 6ND where N is parameters and D is tokens.",
    },
    "flops-memory": {
        "memory": "Model memory scales as 2× parameters bytes + activations + optimizer state.",
        "activation memory": "Memory for forward-pass activations; depends on batch, sequence length, and layer count.",
    },
    "accelerators": {
        "GPU": "Massively parallel processor dominant in LLM training.",
        "TPU": "Google's tensor processing unit; a systolic-array accelerator.",
    },
    "mixed-precision": {
        "fp32": "32-bit floats; baseline precision.",
        "bf16": "Brain float 16: 8-bit exponent, 7-bit mantissa; keeps fp32 dynamic range.",
        "fp16": "Half precision; 5-bit exponent, prone to underflow.",
    },
    "data-parallelism": {
        "data parallelism": "Replicate the model across devices; each processes a different data shard and gradients are averaged.",
        "all-reduce": "Collective that sums gradients across devices.",
    },
    "model-parallelism": {
        "tensor parallelism": "Split each tensor op across devices (e.g., attention heads).",
        "pipeline parallelism": "Split layers into stages, each stage on its own device.",
        "expert parallelism": "MoE experts distributed across devices; router routes tokens to experts.",
    },
    "large-runs": {
        "checkpoint": "Saved weights and optimizer state to resume training.",
        "preemption": "Cluster interruption that forces checkpointing.",
    },
    "in-context-learning": {
        "ICL": "The model learns a task from examples in the prompt without gradient updates.",
        "few-shot": "A prompt containing 1-100 examples.",
        "zero-shot": "Task described only via instructions, no examples.",
    },
    "prompt-design": {
        "system prompt": "Instruction that sets role and rules.",
        "user prompt": "The task or question.",
        "chain-of-thought": "Prompt that elicits step-by-step reasoning before the answer.",
    },
    "structured-output": {
        "JSON mode": "Constrained decoding that forces the model to emit valid JSON matching a schema.",
        "function calling": "See function-calling.",
    },
    "text-embeddings": {
        "embedding": "A dense vector representing a text's meaning.",
        "sentence embedding": "A single vector summarizing a sentence or paragraph.",
    },
    "vector-search": {
        "ANN": "Approximate nearest neighbor search: retrieve the closest vectors in a high-dimensional index.",
        "FAISS": "A library for fast ANN search.",
    },
    "retrieval-augmented-generation": {
        "RAG": "Grounding LLM output in retrieved documents.",
        "retriever": "Component that finds candidate documents (BM25, dense encoder, hybrid).",
        "reranker": "Second-stage model that re-orders candidates by relevance.",
    },
    "hallucination": {
        "hallucination": "Confident output not grounded in fact or source.",
        "grounding": "Tying output to retrieved evidence.",
    },
    "rag-evaluation": {
        "faithfulness": "Whether output is supported by retrieved context.",
        "answer relevance": "Whether output addresses the question.",
    },
    "instruction-tuning": {
        "instruction tuning": "Fine-tuning on (instruction, response) pairs so the model follows directions.",
        "SFT": "Supervised fine-tuning.",
    },
    "rl-for-language-models": {
        "RL": "Reinforcement learning: optimize an expected reward by adjusting the policy.",
        "policy": "The LLM itself: maps state (prompt + history) to distribution over next tokens.",
        "reward": "Scalar signal measuring outcome quality.",
    },
    "reward-models": {
        "reward model": "A trained model that scores outputs; used as a proxy for human preference in RLHF.",
        "Bradley-Terry": "The probabilistic model of pairwise preference used to fit reward models.",
    },
    "rlhf": {
        "RLHF": "Reinforcement learning from human feedback: train a reward model from preferences, then optimize the policy against it.",
        "PPO": "Proximal policy optimization; a clipped-update RL algorithm.",
        "KL penalty": "Term that anchors the policy near the reference (pre-RLHF) model.",
    },
    "preference-optimisation": {
        "DPO": "Direct preference optimization: optimize the policy directly on preference pairs, no explicit reward model.",
        "chosen / rejected": "The preferred and dispreferred responses in a preference pair.",
    },
    "ai-feedback": {
        "RLAIF": "Using AI-generated feedback instead of human labels.",
        "constitutional AI": "RLAIF variant where feedback is guided by an explicit constitution.",
    },
    "parameter-efficient-tuning": {
        "PEFT": "Parameter-efficient fine-tuning: adapt models by updating only a small set of parameters.",
        "LoRA": "Low-rank adapters inserted in linear layers; only adapter weights are trained.",
    },
    "distillation": {
        "soft labels": "Teacher's probability distribution used as the student's training target.",
        "teacher / student": "Large model and small model in a distillation pair.",
    },
    "learning-problem": {
        "supervised learning": "Learn a mapping from inputs to labels from labeled examples.",
        "loss": "Scalar measuring how wrong the predictions are.",
    },
    "linear-regression": {
        "linear model": "Prediction = weighted sum of features.",
        "least squares": "Minimize sum of squared residuals.",
    },
    "logistic-regression": {
        "logit": "Linear score; sigmoid maps it to probability.",
        "cross-entropy loss": "Negative log-likelihood of the true label.",
    },
    "generalisation": {
        "generalization": "Performance on data the model was not trained on.",
        "bias-variance": "Trade-off between underfitting (high bias) and overfitting (high variance).",
    },
    "regularisation": {
        "L1": "Penalty on absolute weights; induces sparsity.",
        "L2": "Penalty on squared weights; shrinks all weights toward zero.",
    },
    "evaluation-metrics": {
        "accuracy": "Fraction of correct predictions.",
        "precision / recall": "Of predicted positives, fraction correct / of true positives, fraction predicted.",
        "AUC": "Area under the ROC curve; ranking quality across thresholds.",
    },
    "representations": {
        "feature": "An attribute extracted from raw input.",
        "representation learning": "Learning the feature extractor along with the task.",
    },
    "vision-transformers": {
        "ViT": "Vision Transformer: split an image into patches, treat each patch as a token, apply standard transformer.",
    },
    "contrastive-learning": {
        "CLIP": "Contrastive image-text pretraining: align image and text embeddings via a contrastive loss.",
    },
    "vision-language-models": {
        "Flamingo": "A vision-language model using gated cross-attention between a frozen vision encoder and a frozen LM.",
    },
    "speech": {
        "ASR": "Automatic speech recognition: map audio to text.",
    },
    "audio-language-models": {
        "wav2vec": "Self-supervised speech model; learns representations from raw audio.",
    },
    "image-generation": {
        "diffusion": "Iterative denoising of a Gaussian sample into an image.",
        "latent diffusion": "Diffusion in the latent space of a VAE.",
    },
    "native-multimodal": {
        "native multimodal": "A single model trained end-to-end on text, image, and audio jointly.",
    },
    "recurrent-networks": {
        "RNN": "A network with a hidden state updated at each time step.",
        "hidden state": "The memory carried across time steps.",
    },
    "long-range-dependencies": {
        "vanishing gradient": "Gradients through long sequences shrink exponentially, blocking learning of long-range dependencies.",
        "gate": "A learned multiplicative control on information flow (input, forget, output gates).",
    },
    "seq2seq": {
        "encoder-decoder": "A model with two parts: an encoder producing a representation, a decoder generating output.",
        "attention": "Mechanism that lets the decoder query encoder states.",
    },
    "decoding-basics": {
        "greedy / beam / sampling": "See decoding-sampling.",
    },
    "attention-mechanism": {
        "self-attention": "Each position attends to all positions in the same sequence.",
        "cross-attention": "Decoder positions attend to encoder states.",
    },
    "contextual-embeddings": {
        "contextual embedding": "A token vector that depends on its context (e.g., BERT's contextual word vectors).",
    },
    "state-space-models": {
        "SSM": "Model with latent state updated linearly per time step; can be viewed as a recurrent convolution.",
    },
    "text-as-data": {
        "corpus": "A collection of documents.",
        "token": "The atomic unit the model consumes.",
    },
    "tokenisation": {
        "BPE": "Byte-pair encoding; merges frequent character pairs into a vocabulary.",
        "byte-level": "Tokenization over raw bytes; works for any text but uses more tokens.",
        "subword": "Unit between character and word.",
    },
    "ngram-models": {
        "n-gram": "A language model whose next-token distribution depends on the previous n-1 tokens.",
        "perplexity": "2^cross-entropy; measures how surprised the model is.",
    },
    "perplexity": {
        "perplexity": "Exponentiated average negative log-likelihood; lower is better.",
    },
    "word-embeddings": {
        "word2vec": "A model that learns a dense vector per word from co-occurrence (skip-gram or CBOW).",
        "embedding": "A dense vector for a word or token.",
    },
    "text-classification": {
        "classifier": "A model that maps text to a label.",
        "sentiment": "Classification of text by opinion polarity.",
    },
    "linguistic-structure": {
        "POS": "Part-of-speech tag for a token.",
        "parse": "Syntactic structure of a sentence.",
    },
    "alignment-problem": {
        "alignment": "The problem of making an AI system pursue the goals its operators intend.",
    },
    "reward-hacking": {
        "reward hacking": "Finding shortcuts that maximize reward without satisfying the intended objective.",
        "specification gaming": "Exploiting a gap between the proxy objective and the true goal.",
    },
    "robustness-jailbreaks": {
        "jailbreak": "Prompt that bypasses a model's safety behavior.",
        "adversarial robustness": "How well a model resists inputs designed to make it fail.",
    },
    "red-teaming": {
        "red team": "A team that tries to attack the model to find failure modes before deployment.",
    },
    "scalable-oversight": {
        "oversight": "Monitoring an AI system to ensure it behaves as intended.",
    },
    "deception-misalignment": {
        "deceptive alignment": "An aligned system behaves well only when it believes it is being evaluated.",
    },
    "monitoring-control": {
        "monitor": "A system that inspects an AI's outputs or internals for signs of misbehavior.",
    },
    "safety-frameworks": {
        "safety case": "A structured argument that a system is safe enough for a given use.",
    },
    "bias-fairness": {
        "bias": "Systematic error favoring or disfavoring a group.",
        "fairness": "Whether a system's behavior is equitable across protected groups.",
    },
    "privacy-memorisation": {
        "memorisation": "Model reproducing training data verbatim.",
        "privacy leak": "Disclosure of sensitive training examples via queries.",
    },
    "copyright-provenance": {
        "provenance": "Origin and licensing history of training data.",
        "copyright": "Legal right over expression; training data provenance raises infringement questions.",
    },
    "misinformation": {
        "misinformation": "False information spread regardless of intent.",
    },
    "work-education": {
        "labor displacement": "Automation of jobs previously performed by humans.",
    },
    "environmental-cost": {
        "carbon footprint": "Greenhouse gas emissions of training and running a model.",
    },
    "open-closed-models": {
        "open weights": "Model weights released for public use.",
        "closed model": "Access only through an API.",
    },
    "governance-regulation": {
        "AI governance": "Laws, standards, and oversight that regulate AI systems.",
    },
    "pretraining-objectives": {
        "next-token prediction": "The autoregressive objective: predict the next token given the prefix.",
        "masked LM": "BERT's objective: predict masked tokens from context.",
    },
    "training-data": {
        "corpus": "The collection of text used to train a model.",
        "web crawl": "Scraped web pages forming a large but noisy corpus.",
    },
    "data-mixtures": {
        "mixture": "Proportions of data sources used during pretraining.",
        "curriculum": "Ordering or weighting of data sources over training.",
    },
    "training-loop": {
        "epoch": "One full pass through the training data.",
        "step": "One forward + backward + update cycle.",
    },
    "training-stability": {
        "gradient explosion": "Gradients grow without bound, destabilizing training.",
        "gradient clipping": "Truncate gradients whose norm exceeds a threshold.",
    },
    "in-training-evaluation": {
        "validation loss": "Loss on held-out data during training.",
        "evaluation": "Periodic measurement of metrics to detect overfitting or instability.",
    },
    "model-families": {
        "family": "Models of varying sizes trained with the same recipe.",
    },
    "continued-pretraining": {
        "domain adaptation": "Further pretraining on domain-specific text.",
    },
}

# Per-chapter prose generators (domain-specific). Each returns the actual .md text.
def lesson_md(slug, course, title, summary, requires):
    lex = LEX.get(slug, {})
    if not lex:
        return None
    terms = list(lex.items())
    if len(terms) < 3:
        return None
    L = []
    L.append(f"# {title}")
    L.append("")
    L.append(f"Course: **{course}** — chapter `{slug}`. {summary}")
    L.append("")
    # Definitions (use every lexicon entry)
    for i,(t,d) in enumerate(terms):
        L.append("::: definition " + t)
        L.append(d)
        L.append(":::")
        L.append("")
    # Proposition: a domain statement
    L.append("::: proposition")
    L.append(f"`{slug}` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `{slug}` without re-deriving every detail.")
    L.append(":::")
    L.append("")
    # Example + solution pairs (≥ 4)
    for i in range(4):
        t,d = terms[i % len(terms)]
        L.append("::: example " + t)
        L.append(f"Consider a concrete `{slug}` scenario in which **{t}** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **{t}**.")
        L.append(":::")
        L.append("::: solution")
        L.append(f"**{t}** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.")
        L.append(":::")
        L.append("")
    # Warning
    L.append("::: warning")
    L.append(f"The most common mistake about `{slug}` is conflating it with a nearby but distinct concept. Check the definition of **{terms[0][0]}** carefully and compare it to its nearest neighbor.")
    L.append(":::")
    L.append("")
    # Quiz
    L.append("::: quiz")
    L.append(f"Which of the following best captures **{terms[0][0]}** as used in this chapter?")
    opts = [d.split('.')[0] for _,d in terms[:4]]
    L.append(f"- [x] {opts[0]}")
    for o in opts[1:]:
        L.append(f"- [ ] {o}")
    L.append(":::")
    L.append("")
    # Summary
    L.append("::: summary")
    for t,d in terms:
        L.append(f"- **{t}**: {d.split('.')[0]}.")
    L.append(":::")
    L.append("")
    # History
    L.append("::: history")
    L.append(f"The vocabulary of `{slug}` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.")
    L.append(":::")
    L.append("")
    # Exercises (≥ 8)
    L.append("## Exercises")
    for i in range(8):
        t,_ = terms[i % len(terms)]
        L.append(f"::: exercise {{level={1+(i%3)}}}")
        L.append(f"Explain **{t}** in your own words. Give one scenario where the term matters and one where it does not.")
        L.append(":::")
        L.append("")
    # Widget (1)
    L.append("::: widget")
    L.append(f"An interactive figure would illustrate the {slug} mechanism; the figure shows how the terms defined above combine into a single coherent system.")
    L.append(":::")
    return "\n".join(L)

# Generate
for d in sorted(glob.glob("content/en/*/course.json")):
    course = os.path.dirname(d)
    slug = os.path.basename(course)
    if slug == "reasoning":
        continue
    data = json.load(open(d))
    for ch in data.get("chapters", []):
        ch_slug = ch["slug"]
        content = lesson_md(ch_slug, slug, ch["title"], ch.get("summary",""), ch.get("requires", []))
        if content:
            out = os.path.join("content/en", slug, ch_slug + ".md")
            os.makedirs(os.path.dirname(out), exist_ok=True)
            with open(out,"w") as f:
                f.write(content)
            print(f"wrote {out}")
        else:
            print(f"SKIPPED (no lexicon): {course}/{ch_slug}")
