The policies of the previous chapters learn everything — what a cup looks like, what "left" means, how to close a gripper around a handle — from a few hundred demonstrations of one task. A **vision-language-action model** (VLA) starts instead from a **vision-language model** (VLM) that has been pretrained on billions of images and texts from the web, and so already recognises objects, reads labels, follows instructions and has some notion of spatial relations. Robot demonstrations then only have to teach it how to *act*. The hope, borne out in part by the models of 2023–2026, is a policy that follows instructions it was never trained on, handles new objects, and can be adapted to a new task or a new arm with comparatively little data.

This chapter dissects how the action output is attached to the VLM. We first describe the backbone — vision encoder, projector and language model — and count its tokens and its cost. We then follow the main design lines in chronological order: **actions as tokens** (RT-2, 2023; OpenVLA, 2024), **generalist policies trained from scratch** (Octo, 2024), the **action expert** with flow matching (π0, 2024, and its successors), and **dual-system** designs that run a slow reasoning model and a fast motor model at different rates (Helix, GR00T N1 and Gemini Robotics, 2025). The field moves quickly: the names here will date, but the design questions — how to output continuous actions from a language model, how to make it fast enough, how to keep its web knowledge — will not. Where a model is described, the description follows its public paper, report or blog, with the year.

Background on the components is in the LLM Atlas: [vision transformers](/learn/llm/lesson.php?c=multimodal&l=vision-transformers), [contrastive image–text learning](/learn/llm/lesson.php?c=multimodal&l=contrastive-learning), [vision–language models](/learn/llm/lesson.php?c=multimodal&l=vision-language-models) and [the Transformer block](/learn/llm/lesson.php?c=transformers&l=transformer-block).

## The vision-language backbone {#sec-backbone}

::: definition Vision-language model and VLA {#def-vla}
A **vision-language model** consists of (i) a **vision encoder**, usually a vision Transformer that splits an image into patches and outputs one embedding vector per patch; (ii) a **projector**, a small network (often a two-layer MLP) that maps these embeddings into the input space of (iii) a **language model**, a decoder-only Transformer that processes the image tokens together with text tokens. A **vision-language-action model** is a VLM, pretrained on web-scale image–text data, that is further trained to output robot actions conditioned on camera images, an instruction and usually the robot's proprioceptive state.
:::

Two vision encoders recur in VLAs. **SigLIP** (2023) and its relatives are trained contrastively to match images with captions, and so capture *semantics* — what is in the image. **DINOv2** (2023) is trained by self-supervision on images alone and captures *geometry and fine spatial detail*. OpenVLA's backbone (the Prismatic VLM) concatenates the features of both, on the argument that manipulation needs both kinds of information.

A ViT with patch size $p$ turns an $N\times N$ image into $(N/p)^2$ tokens; SigLIP and DINOv2 at $224\times224$ with $p = 14$ give $16\times16 = 256$ tokens per image. With several cameras and a sentence of instruction, the language model's input is several hundred tokens long, before any action is produced.

::: proposition Transformer cost per token {#prop-flops}
For a decoder-only Transformer with $P$ parameters in its weight matrices, a forward pass costs approximately $2P$ floating-point operations (FLOP) per token, plus attention operations of order $4\,L\,n\,d$ per token for $L$ layers, model width $d$ and $n$ tokens of context. Generating one token autoregressively requires reading all $P$ weights from memory, so its time is at least $bP/W$ for $b$ bytes per weight and memory bandwidth $W$.
:::

::: proof
Almost all parameters sit in matrices $\mathbf W\in\R^{m\times k}$ that multiply a token's activation vector $\mathbf x\in\R^k$. The product $\mathbf W\mathbf x$ needs $mk$ multiplications and about $mk$ additions, $2mk$ FLOP, and $mk$ is the number of parameters in $\mathbf W$; summing over all matrices gives $2P$ per token. Attention adds, per layer and per token, a dot product of the query with each of $n$ keys ($2nd$ FLOP) and a weighted sum of $n$ values ($2nd$ FLOP), $4nd$ in total. For the time bound: to produce one new token the whole network is evaluated once, so every weight must be brought from memory to the arithmetic units at least once; at $b$ bytes per weight that is $bP$ bytes, taking at least $bP/W$ seconds. When many tokens are processed together (the prompt, or a batch), each weight read is reused for every token, and the computation becomes limited by arithmetic instead.
:::

::: example Tokens and memory of a 7-billion-parameter VLA {#ex-backbone}
A VLA with a 7-billion-parameter language model takes one $224\times224$ image (256 tokens) and a 30-token instruction. (a) Find the weight memory in 16-bit (bf16) and 4-bit formats. (b) Estimate the time to process the prompt at an achieved $10^{14}$ FLOP/s, and the time per generated token with $1\,\mathrm{TB/s}$ memory bandwidth in bf16. (c) At 7 action tokens per step, what control rate can it reach?
::: solution
(a) bf16: $7\times10^9\times2\,\mathrm B = 14\,\mathrm{GB}$. 4-bit: $3.5\,\mathrm{GB}$ (plus small overheads for scales).
(b) Prompt: $2\times7\times10^9\times286 = 4.0\times10^{12}\,\mathrm{FLOP}$, i.e. $40\,\mathrm{ms}$. Each generated token: at least $14\times10^9/10^{12} = 14\,\mathrm{ms}$ to read the weights.
(c) One action: $40 + 7\times14 = 138\,\mathrm{ms}$, about $7\,\mathrm{Hz}$ at best; real implementations add overheads.
Sanity check: OpenVLA's authors reported a control rate of a few hertz on a single consumer GPU in 2024, consistent with this estimate. The bottleneck is the *sequential* decoding of action tokens; outputting the whole action in one forward pass would save $6\times14 = 84\,\mathrm{ms}$.
:::
:::

## Actions as tokens: RT-2 and OpenVLA {#sec-tokens}

**RT-2** (Google DeepMind, July 2023) introduced the term vision-language-action model. Its premise was that if actions are written as text, a VLM can be fine-tuned to output them with no change of architecture. Each action dimension was discretised into 256 bins ([[vision-language-action/action-representations#def-binning]]) and the bin numbers were written as tokens; the model was **co-fine-tuned** on a mixture of robot trajectories and the original web vision-language tasks (visual question answering, captioning), so that it would not forget its web knowledge ([[vision-language-action/vla-fine-tuning]]). RT-2 was built on two VLMs, PaLI-X (5 and 55 billion parameters) and PaLM-E (12 billion), trained on the RT-1 robot data. Its headline result was *semantic* generalisation: following instructions involving objects and concepts absent from the robot data ("move the banana to the sum of two plus one", "pick up the extinct animal" with a toy dinosaur among the objects), which the robot data alone could not have taught. The largest models were too big for the robot's own computer and ran on cloud hardware at a low control rate (a few hertz).

**OpenVLA** (Kim, Pertsch, Karamcheti et al., June 2024) made the recipe open. Its backbone is the Prismatic VLM: fused DINOv2 and SigLIP features, a projector, and the 7-billion-parameter Llama 2 language model. Actions are seven tokens per step (end-effector position delta, rotation delta and gripper), each one of 256 bins whose range is set by the 1st and 99th percentiles of the training actions, mapped onto the 256 least-used tokens of the Llama tokenizer. It was trained on about 970,000 trajectories from the Open X-Embodiment collection and released with weights and training code; the paper also showed fine-tuning with LoRA and inference with 4-bit quantisation ([[vision-language-action/vla-fine-tuning]], [[vision-language-action/vla-deployment]]). A 2025 follow-up from the same group (OpenVLA-OFT) replaced token-by-token decoding with parallel prediction of a continuous action chunk, increasing speed considerably and improving success on its benchmarks — an illustration of how much the output design matters even with the same backbone.

The appeal of action tokens is simplicity: the language-model training code is unchanged, the loss is cross-entropy, and the categorical output is multimodal per dimension. The costs are those of [[vision-language-action/action-representations]]: coarse resolution, sequential decoding, and poor learning from high-frequency chunks unless a compressed tokenisation such as FAST is used.

## Generalist policies trained from scratch: Octo {#sec-octo}

Not every generalist policy starts from a VLM. **Octo** (Octo Model Team, 2024) is a Transformer trained from scratch on about 800,000 trajectories of Open X-Embodiment, with 27 million (Small) and 93 million (Base) parameters. Language is embedded with a pretrained T5 text encoder and images by a small convolutional stem; inputs from any number of cameras, proprioception and either a language instruction or a goal image become token sequences, and learned **readout tokens** attend to them and feed a **diffusion action head** that outputs an action chunk. The design goal was adaptability: new observation types or action spaces can be added at fine-tuning time by adding tokenisers or heads, without retraining from scratch.

Octo and similar models are much smaller and faster than VLM-based VLAs, but lack their web knowledge, so their language understanding is limited to what the robot data contain. They are a useful baseline for a company: if a task involves no open-ended language, a small policy may serve as well as a large one at a fraction of the inference cost.

## The action expert: π0 {#sec-pi0}

**π0** (Physical Intelligence, October 2024; weights released in early 2025) combined a VLM with the flow-matching generator of [[vision-language-action/diffusion-flow-policies]] in a single Transformer.

- The backbone is **PaliGemma**, a 3-billion-parameter VLM (SigLIP vision encoder and the Gemma 2B language model).
- A second, smaller set of Transformer weights — the **action expert**, about 300 million parameters — processes the robot state and a chunk of $H = 50$ noisy actions. The two sets of weights form one Transformer in which each token is processed by the weights of its own type (images and text by the VLM weights, state and actions by the expert weights), and tokens interact through attention in every layer, a "mixture of experts" by token type rather than by learned routing.
- A **block-causal attention mask** lets the image–language prefix attend only within itself, so its keys and values can be computed once and cached; the state and action tokens attend to the prefix and to each other.
- The action expert outputs the flow-matching velocity of [[vision-language-action/diffusion-flow-policies#def-flow]]; at inference the chunk is generated with about ten Euler integration steps, reusing the cached prefix at each step.

The paper reported control of several robots — single arms, bimanual arms and mobile manipulators — at up to 50 Hz action rates, on tasks such as folding laundry, bussing tables and assembling boxes. Pretraining used a large mixture of the company's own teleoperated data (over 10,000 hours from several robot configurations) together with open datasets, followed by fine-tuning on high-quality data for each hard task.

::: example Inference structure of an action-expert VLA {#ex-pi0}
A π0-style model has a 3-billion-parameter backbone and a 300-million-parameter action expert. Three cameras give 256 tokens each, the instruction 20 tokens; the action expert processes one state token and 50 action tokens. Using [[#prop-flops]] with an achieved $10^{14}$ FLOP/s and ignoring attention, estimate (a) the prefix cost, (b) the cost of one flow step, (c) the time per chunk for 10 steps, and (d) the maximum rate at which chunks could be produced.
::: solution
(a) Prefix tokens $3\times256 + 20 = 788$; FLOP $2\times3\times10^9\times788 = 4.7\times10^{12}$, i.e. $47\,\mathrm{ms}$.
(b) Expert tokens 51; FLOP $2\times3\times10^8\times51 = 3.1\times10^{10}$, i.e. $0.31\,\mathrm{ms}$ of arithmetic. Because only 51 tokens are processed, this step is memory-bound: reading $0.6\,\mathrm{GB}$ of bf16 expert weights at $1\,\mathrm{TB/s}$ takes $0.6\,\mathrm{ms}$, so about $1\,\mathrm{ms}$ per step is a realistic floor.
(c) $47 + 10\times1 \approx 57\,\mathrm{ms}$ — with real overheads, of order $60$–$100\,\mathrm{ms}$.
(d) About 10–15 chunks per second at most. A chunk of 50 actions at 50 Hz lasts 1 s, so even executing only half of each chunk ($h = 25$) needs just 2 chunks per second — the GPU is busy about 15% of the time.
Sanity check: compare [[#ex-backbone]]: the autoregressive 7B model needed $138\,\mathrm{ms}$ for *one* action; the action expert produces 50 actions in about half that. Generating a whole chunk in parallel, with a small network for the iterative part, is what makes the 50 Hz rate possible.
:::
:::

**π0-FAST** (January 2025) was an autoregressive variant using the FAST tokeniser of [[vision-language-action/action-representations#alg-fast]]; it trained faster and matched π0 on many tasks, but its token-by-token decoding was slower at inference. **π0.5** (April 2025) addressed generalisation to entirely new environments — cleaning kitchens and bedrooms in homes not seen in training. Its main ingredient was **co-training on heterogeneous data**: demonstrations from many robots, data from mobile manipulators in many homes, web data for captioning and question answering, and examples annotated with high-level steps in language. At run time the model first predicts a high-level subtask in text ("pick up the plate") and then the low-level action chunk for it, using one network for both levels. Physical Intelligence's later models (2025) added training on the robot's own autonomous experience with corrections and reward signals. These results are reported by the developer; independent replication on comparable hardware is limited (as of 2026).

## Dual-system designs {#sec-dual}

A single network that is both large (for understanding) and fast (for control) is hard to build. **Dual-system** architectures, named by analogy with Kahneman's "System 1" (fast, automatic) and "System 2" (slow, deliberate) thinking, split them.

::: definition Dual-system VLA {#def-dual}
A **dual-system VLA** consists of a large vision-language model ("System 2") that runs at a low rate, interprets the scene and the instruction and produces a latent vector or a short plan, and a smaller visuomotor policy ("System 1") that runs at a high rate, takes recent images and proprioception together with the latest System-2 output, and produces the motor commands. The two are trained jointly or in stages, and run asynchronously.
:::

Three publicly described examples from 2025 illustrate the pattern.

- **Helix** (Figure AI, February 2025) controls the upper body of a humanoid. According to the company's description, System 2 is a 7-billion-parameter VLM running at 7–9 Hz and System 1 an 80-million-parameter visuomotor Transformer running at 200 Hz, the two connected by a latent vector, with both running on the robot.
- **GR00T N1** (NVIDIA, March 2025), an open model for humanoids, pairs a VLM (System 2) that processes images and language with a diffusion-Transformer action module (System 1) trained with flow matching, which generates chunks of motor actions at a higher rate. It was trained on a mixture of real robot data, human videos and synthetic data generated in simulation.
- **Gemini Robotics** (Google DeepMind, March 2025) builds a VLA on the Gemini 2.0 model. Its report describes a backbone running on cloud hardware and a local action decoder on the robot's own computer, which together give an end-to-end latency of a few hundred milliseconds while producing action chunks at a much higher effective control rate. An accompanying model, Gemini Robotics-ER, focuses on embodied reasoning (pointing, 3D detection, grasp prediction) and can drive conventional controllers. Later 2025 versions added an on-device variant and a model that reasons in text before acting.

::: example Staleness in a dual-system controller {#ex-staleness}
System 2 updates its latent at 8 Hz; System 1 runs at 200 Hz. The end effector moves at $0.25\,\mathrm{m/s}$. (a) How many System-1 steps use the same latent? (b) How far does the hand move between latent updates? (c) Why does System 1 need its own camera input?
::: solution
(a) $200/8 = 25$ steps.
(b) The latent is up to $1/8 = 0.125\,\mathrm s$ old (plus System 2's own latency): $0.25\times0.125 = 0.031\,\mathrm m = 31\,\mathrm{mm}$.
(c) 31 mm is far more than a grasp tolerance. The latent can carry *what* to do ("grasp the left cup by the handle") but not *exactly where the hand is now*; System 1 must close the loop on fresh images and proprioception at its own rate. Sanity check: this is the same division of labour as between a motion planner and a servo loop in classical robot software ([[robot-arm-design/software-stack]]), with learned components at both levels.
:::
:::

::: widget plot
f: 16*x + d*2*x/b; 16*x + 10*0.2*x/b
x: 0.5, 60
y: 0, 2500
sliders: d=1:1:16; b=0.5:0.25:4
labels: \text{autoregressive: prompt} + d \text{ tokens (ms)}; \text{action expert: prompt} + 10 \text{ flow steps (ms)}
caption: A rough latency model for producing one action step (autoregressive, first curve) or one whole chunk (backbone plus an action expert of a tenth of its size, second curve), against backbone size in billions of parameters. It assumes an 800-token prompt processed at $10^{14}$ FLOP/s and token decoding limited by memory bandwidth $b$ in TB/s with 16-bit weights. Increase the tokens per action $d$ and watch the autoregressive curve steepen; raise the bandwidth and notice that only the decoding part shrinks.
:::

## Comparing the designs {#sec-compare}

| design | examples (year) | action output | strengths | weaknesses |
|---|---|---|---|---|
| actions as tokens | RT-2 (2023), OpenVLA (2024), π0-FAST (2025) | discrete bins or compressed tokens, autoregressive | unchanged LLM training, multimodal per token | slow decoding, resolution |
| from-scratch generalist | Octo (2024) | diffusion head on readout tokens | small, fast, flexible inputs and outputs | little web knowledge |
| action expert | π0 (2024), π0.5 (2025) | flow matching over a chunk, shared Transformer | smooth high-rate chunks, keeps VLM | larger than a small policy, VLM knowledge must be protected in training |
| dual system | Helix, GR00T N1, Gemini Robotics (2025) | fast policy conditioned on slow VLM latent | high control rates with a large model | two systems to train and synchronise |

Several trends cut across the table as of 2026: continuous chunk outputs (flow or diffusion) for control, sometimes combined with discrete tokens during pretraining; explicit intermediate reasoning (subtasks, points, bounding boxes, text plans) before action; training on more varied data including human video and simulation; and smaller models that run on the robot.

::: quiz
A VLA's language model weights are 6 GB in bf16. The robot's GPU has 0.5 TB/s of memory bandwidth. Which output design will give the higher control rate for a 7-dimensional action?
- [ ] Autoregressive action tokens, one per dimension, because each token is cheap.
- [x] A chunk-generating action head, because autoregressive decoding needs at least 7 sequential weight reads of 6 GB per action.
- [ ] They are the same, because both use the same backbone.
::: solution
Each autoregressive token needs one pass over the weights: $6\,\mathrm{GB}/0.5\,\mathrm{TB/s} = 12\,\mathrm{ms}$, so 84 ms for 7 tokens, for a single action. A chunk head reads the backbone once per chunk and produces tens of actions.
:::
:::

::: warning Do not compare models by their headline numbers
Success rates in VLA papers are measured on the authors' own tasks, robots, initial conditions and evaluation protocols; a model reported at 90% in one paper and another at 70% in a different paper cannot be ranked from those numbers. Compare candidates on your own arm and tasks, with matched initial conditions and enough trials ([[vision-language-action/policy-evaluation]]).
:::

::: example Which architecture for a product? {#ex-choose}
Your company sells a 6-DOF arm with a parallel gripper and an onboard GPU with 16 GB of memory. Customers want "pick and place by spoken instruction" across many objects, and a precise insertion task. Suggest an architecture and justify it.
::: solution
The instruction-following across many objects calls for a VLM backbone (semantic generalisation); the insertion calls for smooth, high-rate continuous chunks. An action-expert design of about 3B parameters (π0-style, open weights available as of 2025–26) fits: about 7 GB in bf16, leaving room for activations and the KV cache in 16 GB, or less with 8-bit weights. Its chunk output supports 30–50 Hz control. A 7B token-output model would fit only quantised and would run at a few hertz. A dual-system design is an option if a cloud backbone is acceptable, but adds network latency and dependency. For the insertion task alone, a small task-specific diffusion or flow policy might perform equally well and should be evaluated as a baseline. Sanity check on memory: $3.3\times10^9\times2 = 6.6\,\mathrm{GB}$ of weights, comfortably below 16 GB.
:::
:::

::: history
The idea of conditioning a robot policy on language is older than VLAs — CLIPort (2021) and BC-Z (2021) used pretrained language and image encoders, and SayCan (2022) used a language model to choose among learned skills. RT-1 (December 2022) showed a Transformer policy trained on 130,000 demonstrations; RT-2 (July 2023) fine-tuned a web-scale VLM to output action tokens and coined the term VLA. The Open X-Embodiment release (October 2023) enabled open generalist models: Octo (May 2024) and OpenVLA (June 2024). π0 (October 2024) attached a flow-matching action expert to a VLM; π0.5, GR00T N1, Helix and Gemini Robotics (2025) pushed towards open-world generalisation, humanoids and dual-system designs.
:::

::: summary
- A VLA is a VLM (vision encoder + projector + language model) trained further to output robot actions; it inherits web knowledge of objects and language.
- Transformer cost: about $2P$ FLOP per token; autoregressive decoding needs one full weight read per token, so per-dimension action tokens are slow.
- RT-2 and OpenVLA output binned action tokens; Octo is a small from-scratch generalist with a diffusion head; π0 adds a 300M flow-matching action expert to a 3B VLM, generating 50-step chunks with a cached prefix.
- π0.5 co-trains on heterogeneous data and predicts a language subtask before acting; dual-system models (Helix, GR00T N1, Gemini Robotics) run a slow VLM and a fast motor policy.
- Choose by task needs (semantic generality, precision, rate) and by the hardware's memory and bandwidth, and compare candidates on your own robot.
:::

## Exercises

::: exercise Image tokens {#exr-imgtok level=1 check="1024"}
A ViT with patch size 14 processes a $448\times448$ image. How many patch tokens does it produce? (Enter the number.)
::: solution
$(448/14)^2 = 32^2 = 1024$ tokens — four times as many as at $224\times224$, which quadruples the prefix cost.
:::
:::

::: exercise Weight memory {#exr-mem level=1 check="6.6"}
How much memory do the weights of a 3.3-billion-parameter model take in bf16? (Enter it in GB, with 1 GB = $10^9$ bytes.)
::: solution
$3.3\times10^9\times2\,\mathrm B = 6.6\,\mathrm{GB}$.
:::
:::

::: exercise Decoding floor {#exr-decode level=1 check="28"}
A 7-billion-parameter model is stored with 8-bit weights on a GPU with $2\,\mathrm{TB/s}$ bandwidth. What is the minimum time to decode 8 tokens? (Enter it in ms.)
::: solution
Per token $7\times10^9/(2\times10^{12}) = 3.5\,\mathrm{ms}$; 8 tokens $28\,\mathrm{ms}$.
:::
:::

::: exercise Prefix cost with three cameras {#exr-prefix level=2 check="96"}
A 3-billion-parameter backbone processes three $224\times224$ images (patch size 14) and a 32-token instruction, at an achieved $5\times10^{13}$ FLOP/s. Estimate the prefix time using $2P$ FLOP per token. (Enter it in ms, to the nearest millisecond.)
::: solution
Tokens $3\times256 + 32 = 800$; FLOP $2\times3\times10^9\times800 = 4.8\times10^{12}$; time $4.8\times10^{12}/5\times10^{13} = 0.096\,\mathrm s = 96\,\mathrm{ms}$.
:::
:::

::: exercise Steps per latent {#exr-latent level=2 check="20"}
In a dual-system model System 2 runs at 10 Hz and System 1 at 200 Hz. How many System-1 steps use each System-2 output? (Enter the number.)
::: solution
$200/10 = 20$.
:::
:::

::: exercise Block-causal masks {#exr-mask level=2}
In a π0-style model the image–language prefix may not attend to the state and action tokens, but the action tokens attend to the prefix. Explain why this mask (i) allows caching and (ii) costs nothing in expressiveness for the action prediction.
::: solution
(i) If prefix tokens never attend to action tokens, the prefix's keys and values do not depend on the noisy actions, which change at every flow step; they can be computed once per observation and reused for all ten steps. (ii) The quantity being predicted is the velocity of the *action* tokens; they still attend to the full prefix in every layer, so all information in images and text reaches them. What is lost is only the ability of image tokens to be modified by the current noisy action guess, which carries no information about the observation.
:::
:::

::: exercise Speed-up of parallel decoding {#exr-parallel level=3}
For the model of [[#ex-backbone]], compare the time to produce a chunk of 8 actions of 7 dimensions (a) by autoregressive decoding of 56 tokens, (b) by a single forward pass that outputs all 56 values in parallel (as in OpenVLA-OFT's parallel decoding, treating the 56 output positions as extra input tokens). State your assumptions.
::: solution
(a) Prompt $40\,\mathrm{ms}$ plus 56 memory-bound decoding steps of $14\,\mathrm{ms}$: $40 + 784 = 824\,\mathrm{ms}$. (b) One forward pass over $286 + 56 = 342$ tokens, compute-bound: $2\times7\times10^9\times342/10^{14} = 48\,\mathrm{ms}$. Speed-up about 17 times, and the chunk covers 8 control steps, so the effective action rate rises from about $10\,\mathrm{Hz}$ to well above $100\,\mathrm{Hz}$. Assumptions: weights in bf16 at $1\,\mathrm{TB/s}$, $10^{14}$ FLOP/s achieved for batched tokens, attention negligible. The parallel head needs training for it (the outputs are no longer conditioned on each other), and the published follow-up used continuous regression outputs instead of bins.
:::
:::

::: exercise An architecture review {#exr-review level=3}
Write a one-page architecture review for your team comparing a 7B token-output VLA, a 3B action-expert VLA and a 100M task-specific diffusion policy for a bin-picking product with 300 SKUs and occasional voice commands. Cover generalisation, precision, rate, hardware, data needs and risks.
::: solution
Key points a good review contains. Generalisation: 300 SKUs with varied appearance favour pretrained vision (both VLAs, or a diffusion policy with a pretrained image encoder); voice commands favour a language backbone. Precision and rate: token output at a few hertz is weak for precise grasps and motions; action-expert and diffusion policies give continuous chunks at 20–50 Hz. Hardware: 7B needs quantisation on a 16 GB GPU and is slow; 3B fits in bf16; 100M runs on modest hardware. Data: VLAs need less task data thanks to pretraining but more compute to fine-tune; the small policy needs more task data but trains in hours. Risks: dependence on third-party weights and licences, evaluation cost, catastrophic forgetting of language ability when fine-tuning, latency spikes. Recommendation: prototype the 3B action-expert VLA and the small diffusion policy in parallel, evaluate both on the same initial conditions, and choose on measured success, cycle time and cost.
:::
:::
