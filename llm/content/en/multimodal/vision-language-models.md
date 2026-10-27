A contrastive model such as CLIP ([[multimodal/contrastive-learning]]) can say which of several captions fits an image best, but it cannot describe the image, answer a question about it, read the numbers off a chart or explain a diagram step by step. Those tasks need a model that *generates* text conditioned on an image — and the best text generators available are pretrained language models. A **vision–language model** (VLM) connects an image encoder to a language model so that the language model can attend to what the encoder sees, and is then trained to follow instructions about images.

The engineering question is how to make the connection. Three designs mark the main lines of development. **Flamingo** (Alayrac et al., 2022) kept a large language model frozen and inserted new cross-attention layers through which its text tokens attend to visual features. **BLIP-2** (Li et al., 2023) trained a small Transformer, the Q-Former, to distil an image into $32$ vectors that the frozen language model reads as a soft prompt. **LLaVA** (Liu et al., 2023) simply projected every patch embedding of a CLIP encoder into the language model's input space, placed them in the sequence like word embeddings, and fine-tuned on instruction data generated with a language model. The LLaVA recipe — encoder, projector, language model, staged training — is the template of most open VLMs as of 2026. This chapter explains all three, works out how many tokens an image costs and how high-resolution images are tiled, describes how VLMs are trained and evaluated, and ends with their best-known failure: describing objects that are not there.

## Connecting an encoder to a language model {#sec-connect}

All three designs share the same parts. A vision encoder, usually a ViT pretrained contrastively, turns an image into a grid of patch features $F\in\R^{N\times d_v}$ ([[multimodal/vision-transformers#def-patch-embedding]]); VLMs typically take the patch outputs of the last or penultimate layer, not only the pooled CLS vector, because the language model needs to know *where* things are. A decoder-only language model with width $d$ produces text. Between them sits a **connector** that maps visual features into something the language model can consume. The designs differ in where the visual information enters the language model and how many vectors it is compressed into.

### Cross-attention: Flamingo {#sec-flamingo}

::: definition Gated cross-attention layer (Flamingo) {#def-gated-xattn}
Let $X\in\R^{T\times d}$ be the hidden states of the text tokens entering a frozen language-model layer, and $V\in\R^{M\times d}$ visual tokens. A **gated cross-attention block** computes

$$
\begin{aligned}
X' &= X + \tanh(\alpha)\cdot\operatorname{XAttn}(X, V),\\
X'' &= X' + \tanh(\beta)\cdot\operatorname{FFW}(X'),
\end{aligned}
$$ {#eq-gated}

where $\operatorname{XAttn}$ is multi-head cross-attention with queries from $X$ and keys and values from $V$ ([[transformers/architecture-families#def-cross-attention]]), $\operatorname{FFW}$ a feed-forward layer, and $\alpha$, $\beta$ learnable scalars initialised at $0$. $X''$ is then passed to the frozen language-model layer.
:::

::: proposition Gating preserves the frozen model at initialisation {#prop-gate-init}
If $\alpha = \beta = 0$, every gated block is the identity map, so a language model with any number of inserted blocks computes exactly the same function as the original model, whatever the images.
:::

::: proof
$\tanh(0) = 0$, so $X' = X + 0 = X$ and $X'' = X' = X$. Each inserted block passes its input unchanged to the next frozen layer; by induction over the layers, every hidden state, and hence the output distribution, equals that of the unmodified language model.
:::

The gates let training begin from the language model's full competence and admit visual information gradually: the gradients with respect to $\alpha$ and $\beta$ are non-zero at $0$ (since $\tanh'(0) = 1$), so the gates open as soon as visual information helps reduce the loss. Flamingo also needed a way to handle variable numbers of visual features, from one image to many video frames. Its **Perceiver Resampler** is a small Transformer in which $64$ learned latent query vectors cross-attend to the visual features, so that every image or video becomes exactly $64$ visual tokens.

Flamingo was trained on a mixture of web pages with interleaved images and text ($43$ million pages), image–text pairs and short videos with descriptions. In interleaved data, each text token cross-attends only to the visual tokens of the image that most recently preceded it, while self-attention in the language model still sees all earlier text, so information about earlier images flows indirectly. Trained this way, the model could be prompted with a few image–answer examples followed by a new image, and it learned visual tasks **in context** ([[prompting-rag/in-context-learning]]). The largest model, Flamingo-80B, was built on the $70$-billion-parameter Chinchilla language model, with gated blocks inserted before every seventh layer; Alayrac et al. reported that few-shot Flamingo often outperformed models fine-tuned on thousands of times more task-specific data.

### A query transformer: BLIP-2 {#sec-blip2}

::: definition Q-Former (BLIP-2) {#def-qformer}
A **Q-Former** is a Transformer with $K$ learned query vectors $\mathbf{q}_1, \dots, \mathbf{q}_K$ (in BLIP-2, $K = 32$ of dimension $768$) that self-attend among themselves and cross-attend to the frozen image encoder's patch features. Its $K$ output vectors are mapped by a linear layer to the language model's width $d$ and prepended to the text embeddings as a **soft visual prompt**. The Q-Former shares its self-attention layers with a text Transformer, so that the same module can also encode text.
:::

BLIP-2 trained the Q-Former (about $188$ million parameters) in two stages, with both the image encoder and the language model frozen. The first stage taught the queries to extract text-relevant information using three objectives with different attention masks between queries and text: image–text contrastive learning, image–text matching (a binary classifier on whether a caption fits) and image-grounded caption generation. The second stage connected the outputs to a frozen language model (OPT or Flan-T5) and trained the connector with the language-modelling loss. Li et al. reported zero-shot VQAv2 accuracy $8.7$ points above Flamingo-80B with $54$ times fewer trainable parameters. The cost of the design is a fixed bottleneck: $32$ vectors for any image, however detailed.

### A projector: LLaVA {#sec-llava}

::: definition Projector-based VLM (LLaVA) {#def-llava}
Let $F\in\R^{N\times d_v}$ be the patch features of a vision encoder. A **projector** $g\colon\R^{d_v}\to\R^{d}$ — a linear map in LLaVA, a two-layer MLP with GELU in LLaVA-1.5 — maps each patch feature to a **visual token** in the language model's embedding space. The language model receives the sequence

$$
\big[\,g(F_1), \dots, g(F_N),\ \mathbf{e}(w_1), \dots, \mathbf{e}(w_T)\,\big],
$$ {#eq-llava}

where $\mathbf{e}(w_t)$ are the embeddings of the text tokens (in practice the visual tokens are inserted at the position of an image placeholder in a chat template), and is trained with the usual next-token loss on the response tokens only.
:::

Nothing in the language model changes: visual tokens are processed by the same self-attention and feed-forward layers as words, and they are attended to under the causal mask like any earlier part of the prompt. LLaVA used a CLIP ViT-L/14 encoder at $224$ pixels, giving $16\times16 = 256$ visual tokens per image, and the Vicuna language model. Training had two stages:

1. **Feature alignment.** On $595{,}000$ image–caption pairs filtered from CC3M, train only the projector, with encoder and language model frozen, to produce the caption from the visual tokens. This teaches the projector to map visual features into regions of embedding space that the language model already interprets.
2. **Visual instruction tuning.** Fine-tune projector and language model (encoder still frozen) on $158{,}000$ instruction–response examples about images: conversations, detailed descriptions and reasoning questions. These were generated by prompting a text-only GPT-4 with the COCO captions and object bounding boxes of each image, since GPT-4 could not see images at the time.

LLaVA-1.5 (Liu et al., 2024) replaced the linear map by a two-layer MLP, raised the resolution to $336$ pixels ($24^2 = 576$ tokens), and added academic question-answering datasets with short-answer formatting prompts; with about $1.2$ million training examples it was trained in about a day on one node of eight A100 GPUs, and set strong results across a dozen benchmarks. Instruction tuning itself — templates, loss masking and data — is the subject of [[post-training/instruction-tuning]]; a VLM applies it with images in the prompt.

::: example Shapes through a LLaVA-1.5 forward pass {#ex-llava-shapes}
LLaVA-1.5-13B uses CLIP ViT-L/14 at $336$ pixels ($d_v = 1024$) and a language model of width $d = 5120$. A prompt has one image and $40$ text tokens. Trace the shapes, count the projector's parameters, and compute the fraction of the sequence taken by the image.
::: solution
The encoder gives $24\times24 = 576$ patch features of size $1024$: $F\in\R^{576\times1024}$ (the CLS output is dropped). The MLP maps $1024\to5120\to5120$, so the visual tokens are $576\times5120$; it has $1024\cdot5120 + 5120 + 5120\cdot5120 + 5120 = 31{,}467{,}520$ parameters, about $0.2\%$ of the language model. The language model sees $576 + 40 = 616$ positions of width $5120$, of which the image takes $93.5\%$. A single image costs as much context as several paragraphs of text.
:::
:::

::: warning Visual tokens are not words
Because visual tokens sit in the same sequence and the same embedding space as word embeddings, it is tempting to read them as "image words" — to look for the nearest vocabulary embedding of each visual token, or to expect them to transfer between models. They are continuous vectors produced by a projector trained jointly with one particular language model; nothing ties them to the vocabulary, and the nearest word embeddings of visual tokens are usually uninformative. Swapping the language model requires training a new projector, and swapping the vision encoder requires retraining at least the projector and usually the language model as well.
:::

### Comparing the designs {#sec-compare}

The three connectors trade context length against flexibility. A projector adds $N$ visual tokens to the language model's sequence, and every subsequent text token attends to all of them in every layer; a Q-Former or resampler adds a fixed small number $K$; cross-attention adds nothing to the self-attention context, but costs new parameters and an attention over $M$ visual tokens in each gated layer.

::: proposition Attention cost of visual context {#prop-visual-cost}
In a decoder with $L$ layers of width $d$, generating $T$ text tokens after $N$ visual tokens in the prefix costs about $4LdNT$ FLOPs for attention to the visual tokens (scores and weighted values; projections of visual tokens are computed once per prefix), and the key–value cache holds $2LNd$ extra numbers. With a resampler of $K$ tokens the same costs scale with $K$ instead of $N$.
:::

::: proof
Each generated token in each layer computes a dot product of length $d$ with each of the $N$ cached visual keys ($2Nd$ FLOPs) and a weighted sum of $N$ value vectors ($2Nd$ FLOPs), giving $4Nd$ per token and layer, hence $4LdNT$ in total. The cache stores a key and a value of width $d$ per visual token and layer, $2LNd$ numbers ([[inference/kv-cache]]). Replacing $N$ by $K$ changes nothing else.
:::

::: example A few-shot prompt with four images {#ex-fewshot}
A few-shot prompt contains three solved examples and one query, each with one image, and $150$ text tokens in total. Compare the self-attention context of a LLaVA-1.5-style model ($576$ tokens per image) with that of a Flamingo-style model ($64$ resampled tokens per image, entering through cross-attention), and the number of visual keys a text token can attend to in one gated layer of the latter.
::: solution
The projector model's sequence has $4\cdot576 + 150 = 2454$ positions, of which $94\%$ are visual. The Flamingo-style model's self-attention context is just the $150$ text tokens (plus image markers); the $4\cdot64 = 256$ visual tokens enter only through the gated layers, where each text token attends to the $64$ tokens of the image that last preceded it. The projector model spends far more context, but lets every layer compare any word with any patch of any image — useful when the question is about the difference between two images.
:::
:::

Projector-based designs won out in open models for practical reasons: they are simple, they let the language model's every layer interact with every patch, and context windows grew long enough to make $N$ in the hundreds or thousands affordable. Their cost, as the next section shows, is that the token count grows quickly with resolution.

## Resolution, tokens and tiling {#sec-tiling}

A $336\times336$ input is enough to recognise a dog, but not to read a receipt, a spreadsheet screenshot or a page of a scientific paper: text a few pixels high is destroyed by downsampling. VLMs that read documents need far more pixels, and with a ViT encoder more pixels mean more patches (by [[multimodal/vision-transformers#prop-vit-cost]], quadratically more attention inside the encoder too). Three strategies are in use.

::: definition Strategies for high-resolution input {#def-resolution}
1. **Fixed resize.** Resize (and pad or crop) every image to the encoder's training resolution: $N = (s/P)^2$ tokens for side $s$ and patch size $P$, regardless of the input.
2. **Tiling.** Choose a grid of $r\times c$ tiles of the encoder's native size $s$ whose aspect ratio best matches the image, resize the image to $rs\times cs$, encode each tile separately, and usually add one downsized **thumbnail** of the whole image for global context: $N = (rc + 1)(s/P)^2$ tokens.
3. **Native resolution.** Encode the image at (approximately) its own size with a ViT that accepts variable grids, using 2-D position encodings, and reduce the token count by merging each $m\times m$ block of neighbouring patch features into one token: $N = \lceil H/(mP)\rceil\cdot\lceil W/(mP)\rceil$.
:::

LLaVA-NeXT (Liu et al., January 2024) used tiling at $336$-pixel tiles with grids such as $2\times2$, $1\times4$ and $4\times1$ plus a thumbnail. InternVL 1.5 (Chen et al., 2024) used $448$-pixel tiles, up to $12$ during training, and reduced each tile's $1024$ patch features to $256$ tokens by **pixel shuffle**, which folds each $2\times2$ block of features into one vector of four times the width. Qwen2-VL (Wang et al., 2024) took the native-resolution route with a ViT of patch size $14$, 2-D rotary position embeddings and $2\times2$ merging by an MLP, so that each language-model token covers $28\times28$ pixels: a $224\times224$ image costs $64$ tokens plus two delimiters. The listing compares the three strategies.

```python
import math, random
random.seed(2)

def fixed(H, W, side=336, patch=14):            # resize to one square: LLaVA-1.5 style
    return (side // patch) ** 2

def tiled(H, W, tile=336, patch=14, max_tiles=6):
    # choose the grid (rows x cols, at most max_tiles) whose shape best fits the
    # image: maximise the resolution kept, then minimise the padded area
    best = None
    for r in range(1, max_tiles + 1):
        for c in range(1, max_tiles // r + 1):
            scale = min(r * tile / H, c * tile / W, 1.0)   # never upsample
            kept = (H * scale) * (W * scale)
            waste = r * c * tile * tile - kept
            key = (kept, -waste)
            if best is None or key > best[0]:
                best = (key, r, c)
    _, r, c = best
    per_tile = (tile // patch) ** 2
    extra = 1 if r * c > 1 else 0                  # global thumbnail if several tiles
    return r, c, (r * c + extra) * per_tile

def native(H, W, patch=14, merge=2):           # native resolution, 2x2 token merging
    unit = patch * merge                         # each LM token covers 28 x 28 pixels
    return math.ceil(H / unit) * math.ceil(W / unit)

for (H, W) in [(336, 336), (1080, 1920), (2200, 1700)]:
    r, c, t = tiled(H, W)
    print(f"{H}x{W}: fixed {fixed(H, W)}  tiled {r}x{c} grid -> {t}  native {native(H, W)}")

# POPE-style evaluation of a model biased towards "yes"
truth = [1] * 150 + [0] * 150                    # half the probed objects are present
pred = [1 if (t == 1 and random.random() < 0.9) or (t == 0 and random.random() < 0.35) else 0
        for t in truth]
tp = sum(p and t for p, t in zip(pred, truth)); fp = sum(p and not t for p, t in zip(pred, truth))
fn = sum((not p) and t for p, t in zip(pred, truth)); tn = len(truth) - tp - fp - fn
prec, rec = tp / (tp + fp), tp / (tp + fn)
print(f"TP {tp} FP {fp} FN {fn} TN {tn}")
print(f"accuracy {(tp + tn) / len(truth):.3f}  precision {prec:.3f}  recall {rec:.3f}  "
      f"F1 {2 * prec * rec / (prec + rec):.3f}  yes-ratio {sum(pred) / len(pred):.3f}")
```

```text
336x336: fixed 576  tiled 1x1 grid -> 576  native 144
1080x1920: fixed 576  tiled 2x3 grid -> 4032  native 2691
2200x1700: fixed 576  tiled 3x2 grid -> 4032  native 4819
TP 131 FP 52 FN 19 TN 98
accuracy 0.763  precision 0.716  recall 0.873  F1 0.787  yes-ratio 0.610
```

(The tiling rule here is a simplified version of the published ones, and real systems cap the pixel count; the POPE lines are used in [[#sec-hallucination]].)

::: example Token budget for a page {#ex-page}
A scanned A4 page at $2200\times1700$ pixels is read by (a) a fixed $336$-pixel encoder, (b) the tiling scheme of the listing, (c) native resolution with $28$-pixel tokens. How many tokens does each use, and how many pixels does one token summarise?
::: solution
(a) $576$ tokens for $3.74$ million pixels: each token stands for about $6500$ pixels, an $81\times81$ square of the original — far too coarse for $10$-point text, which is about $30$ pixels high at this scan resolution. (b) A $3\times2$ grid ($1008\times672$ pixels) plus a thumbnail: $7\cdot576 = 4032$ tokens; the image is downscaled by about $0.4$, so each token covers about $35\times35$ original pixels. (c) $\lceil2200/28\rceil\cdot\lceil1700/28\rceil = 79\cdot61 = 4819$ tokens, each covering $28\times28$ pixels at full resolution. Reading the page costs as much context as several thousand words of text — more than the page contains.
:::
:::

::: widget plot
f: ceil(x/28)*ceil(x*r/28); (ceil(x/336)*ceil(x*r/336) + 1)*576
x: 300, 3000
y: 0, 20000
sliders: r=1:0.25:3:0.05
labels: native resolution, $28$ px per token; tiles of $336$ px with $576$ tokens each, plus thumbnail
caption: Visual tokens against the image height $x$ (in pixels), for an image of width $r\cdot x$. Native-resolution encoding grows smoothly with the area; tiling grows in steps of whole tiles (here without the downscaling and caps that real systems apply). Either way the cost is proportional to the pixel count, which is why VLMs set a maximum number of pixels or tiles per image and why video, many frames of images, is usually subsampled in time and space.
:::

**Document understanding.** Reading text in images used to require a separate optical character recognition (OCR) system whose output was fed to a text model. OCR-free models read pixels directly: Donut (Kim et al., 2022) and Pix2Struct (Lee et al., 2023), which pretrained on parsing screenshots of web pages into simplified HTML, showed that an image-to-text Transformer can learn to read. Current VLMs combine high-resolution input with large amounts of synthetic and rendered text, chart and table data during training, and are evaluated on benchmarks such as TextVQA (Singh et al., 2019), DocVQA (Mathew et al., 2021) and ChartQA (Masry et al., 2022). Accuracy on these depends strongly on resolution: details below the size of a token are simply not available to the language model.

## Training a VLM {#sec-training}

The staged recipe of LLaVA has become standard, with variations:

1. **Alignment** of a newly initialised projector on image–caption pairs, with encoder and language model frozen.
2. **Multimodal pretraining** (in larger efforts) on hundreds of millions to billions of image–text pairs, interleaved web documents (as in Flamingo), OCR data, charts, screenshots and video, often unfreezing the encoder. Interleaved documents teach the model to handle several images and to use text context around them; OBELICS (Laurençon et al., 2023) and MINT-1T (Awadalla et al., 2024) are open datasets of this kind.
3. **Visual instruction tuning** on question–answer, conversation, captioning, document and reasoning data, much of it generated or rewritten by other models; responses are the only supervised tokens.
4. Optionally **preference optimisation** ([[post-training/preference-optimisation]]) on pairs of responses that differ in faithfulness to the image, which targets hallucination directly.

The quality of the instruction data matters more than its size beyond a point, a finding familiar from text ([[post-training/instruction-tuning#sec-lima]]). Generated data also inherits its generator's mistakes: captions written by a model that could not see the image, as in the original LLaVA data, sometimes mention objects that are plausible but absent, and a VLM trained on them learns to do the same.

::: quiz
A LLaVA-style VLM is trained in two stages. In the first stage only the projector is trained on image–caption pairs. Why not fine-tune the language model from the start?
- [ ] The language model cannot process continuous input vectors.
- [x] The newly initialised projector produces arbitrary vectors at first; training the language model on them would damage its language abilities before the visual tokens carry useful information.
- [ ] Captions are too short to train a language model.
- [ ] The vision encoder must be trained first.
::: solution
At initialisation the visual tokens are random-looking vectors in embedding space. Updating the language model to fit captions through such inputs wastes its capacity and risks forgetting. Training the projector alone first maps visual features into a region of embedding space that the frozen language model already reads sensibly; then both can be tuned together. Flamingo's zero-initialised gates ([[#prop-gate-init]]) serve a similar purpose.
:::
:::

## Hallucination in VLMs {#sec-hallucination}

**Object hallucination** — a description or answer that mentions an object not present in the image — was measured in image captioning before VLMs: the CHAIR metric (Rohrbach et al., 2018) counts the fraction of mentioned objects that are absent from an image's annotations. Hallucination in text-only models is treated in [[prompting-rag/hallucination]]; in VLMs it has specific causes. The language model's prior is strong — kitchens usually contain refrigerators, and a model that cannot see the corner of a kitchen well may "see" one anyway. Training captions generated without access to the image include such guesses. Low resolution removes the evidence that would contradict the prior. And instruction tuning on data in which the answer to "Is there a …?" is mostly "yes" teaches a bias towards agreement.

::: definition POPE {#def-pope}
The **Polling-based Object Probing Evaluation** (Li et al., 2023) asks a VLM yes/no questions of the form "Is there a {object} in the image?" for objects that are present (according to annotations) and an equal number that are absent. Absent objects are chosen in three settings: **random** (any absent object category), **popular** (the most frequent categories in the dataset) and **adversarial** (categories that most often co-occur with the objects present). It reports accuracy, precision, recall and F1 of the "yes" answers, and the **yes-ratio**, the fraction of questions answered "yes".
:::

Polling with yes/no questions avoids the difficulty of parsing free-form descriptions, and the three settings separate a model that hallucinates at random from one that follows co-occurrence statistics: the adversarial setting is the hardest for models driven by the language prior. Li et al. found that several early instruction-tuned VLMs answered "yes" to the large majority of questions.

::: example Reading POPE metrics {#ex-pope}
The listing simulates a model on $150$ present and $150$ absent objects that says "yes" to $90\%$ of present and $35\%$ of absent objects. Interpret its metrics.
::: solution
The counts are $131$ true positives, $52$ false positives, $19$ false negatives and $98$ true negatives. Accuracy is $229/300 = 0.763$, precision $131/183 = 0.716$, recall $131/150 = 0.873$, F1 $0.787$ and yes-ratio $0.610$. A yes-ratio well above $0.5$ on a balanced set, with recall much higher than precision, is the signature of agreement bias: more than a quarter of the objects this model says are present are not. A model that answered "yes" every time would score accuracy $0.5$ and F1 $0.667$, which is why accuracy, precision and yes-ratio should be read together.
:::
:::

Mitigations work at every stage: higher resolution; training data written with access to the image and checked against annotations; negative questions and "no" answers in instruction data; preference optimisation on faithful against hallucinated responses (for example RLHF-V, Yu et al., 2024); and decoding methods that contrast the model's predictions with and without the image to subtract the language prior. None eliminates the problem, and as of 2026 hallucinated details remain a leading failure of VLMs, particularly for counts, small text and fine spatial relations.

## Evaluating VLMs {#sec-evaluation}

VLM benchmarks have changed as quickly as the models. A few landmarks, with the years they were published:

- **VQAv2** (Goyal et al., 2017): open-ended questions about COCO images, balanced so that each question appears with two images that have different answers, to defeat language-only guessing.
- **GQA** (Hudson and Manning, 2019): compositional questions generated from scene graphs.
- **TextVQA** (2019), **DocVQA** (2021) and **ChartQA** (2022): reading text, documents and charts.
- **MMBench** (Liu et al., 2023) and **MME** (Fu et al., 2023): multiple-choice and yes/no suites covering many skills.
- **MMMU** (Yue et al., 2024): about $11{,}500$ college-level questions with images (diagrams, charts, chemical structures, sheet music) from $30$ subjects.
- **MathVista** (Lu et al., 2024): mathematical reasoning over figures; **POPE** (2023) for object hallucination.

Two cautions apply to all of them. First, many questions can be answered without the image: Chen et al. (2024) found that language models alone scored well above chance on several popular benchmarks and built MMStar from questions that require vision. Comparing a VLM's score with a **blind** baseline, the same model given no image, is a cheap check. Second, older benchmarks saturate and leak into training data, as text benchmarks do ([[evaluation]] treats both issues). Scores should be read with their dates and with the evaluation settings (prompts, resolution, answer parsing), which change results by several points.

::: application Screens and agents
Screenshots are documents with buttons. VLMs that read user interfaces at high resolution and output the coordinates of elements underlie the computer-use agents of [[agents]]; they make every failure described here — small text below token size, hallucinated elements, agreement bias — consequential, because the model acts on what it believes it sees.
:::

::: history
Neural image captioning combined a convolutional encoder with a recurrent decoder (Show and Tell, Vinyals et al., 2015; Show, Attend and Tell, Xu et al., 2015, which attended over image regions). Visual question answering became a benchmark task with VQA (Antol et al., 2015). Pretrained vision–language Transformers followed in 2019–2020 (ViLBERT, LXMERT, UNITER), and generative pretraining with image–text objectives in SimVLM (2021) and CoCa (2022). Flamingo (Alayrac et al., NeurIPS 2022) showed in-context visual learning with frozen language models and gated cross-attention; BLIP-2 (Li et al., ICML 2023) introduced the Q-Former; LLaVA (Liu et al., NeurIPS 2023) and its contemporaries MiniGPT-4 and InstructBLIP established visual instruction tuning, and LLaVA-1.5 (2024) the simple MLP-projector baseline. GPT-4 with vision (2023) and Gemini (2023) brought image input to commercial assistants. High-resolution tiling (LLaVA-NeXT, InternVL, 2024) and native-resolution encoders (Qwen2-VL, 2024) made document reading routine; POPE (2023) and MMMU (2024) became standard evaluations.
:::

::: summary
- A VLM joins a vision encoder (usually a contrastively pretrained ViT, using its patch features) to a language model through a connector.
- Flamingo inserts gated cross-attention layers into a frozen language model; zero-initialised $\tanh$ gates make the model identical to the language model at the start, and a resampler turns each image into $64$ tokens.
- BLIP-2's Q-Former distils an image into $32$ query outputs used as a soft prompt; LLaVA projects every patch feature into the embedding space and inserts them in the sequence, training the projector first and then projector and language model on visual instructions.
- Image cost is measured in tokens: $576$ for a $336$-pixel image with $P = 14$, thousands for a document page. Tiling adds whole tiles plus a thumbnail; native-resolution encoders merge $2\times2$ patches into one token.
- Object hallucination comes from language priors, low resolution and generated training data; POPE measures it with balanced yes/no probes in random, popular and adversarial settings — read accuracy, precision and yes-ratio together.
- Benchmarks date quickly; compare with a blind baseline and record evaluation settings.
:::

## Exercises

::: exercise Tokens in the original LLaVA {level=1 check="256"}
The original LLaVA used CLIP ViT-L/14 at $224\times224$ and dropped the CLS token. How many visual tokens did an image produce?
::: solution
$224/14 = 16$ patches per side, $16^2 = 256$ visual tokens.
:::
:::

::: exercise A native-resolution budget {level=1 check="1536"}
With $28\times28$ pixels per language-model token, how many visual tokens (excluding delimiters) does a $1344\times896$ screenshot produce?
::: solution
$1344/28 = 48$ and $896/28 = 32$, so $48\cdot32 = 1536$ tokens.
:::
:::

::: exercise Tiles plus thumbnail {level=1 check="2880"}
An image is split into a $2\times2$ grid of $336$-pixel tiles plus a thumbnail, each encoded into $576$ tokens. How many visual tokens does it cost?
::: solution
$(4 + 1)\cdot576 = 2880$ tokens.
:::
:::

::: exercise Cache memory for an image {level=2 check="1.51"}
A $7$-billion-parameter language model has $32$ layers of width $4096$ with standard multi-head attention, and stores its key–value cache in 16-bit floats. How many gigabytes ($10^9$ bytes) of cache do the $2880$ visual tokens of the previous exercise occupy? Give two decimal places.
::: solution
By [[#prop-visual-cost]] the cache holds $2LNd = 2\cdot32\cdot2880\cdot4096 = 754{,}974{,}720$ numbers, at $2$ bytes each $1.51\times10^9$ bytes, about $1.51$ GB per image, before any text. Grouped-query attention would divide this by the ratio of query to key–value heads.
:::
:::

::: exercise Always answering yes {level=2 check="2/3"}
On a balanced POPE set, a model answers "yes" to every question. Compute its accuracy, precision, recall and F1, and give F1 as the answer.
::: solution
Every present object is a true positive and every absent one a false positive: accuracy $0.5$, precision $0.5$, recall $1$, and F1 $= 2\cdot0.5\cdot1/(0.5 + 1) = 2/3$. An F1 of $0.667$ therefore says nothing on its own; the yes-ratio of $1$ exposes the model.
:::
:::

::: exercise Gradients at a closed gate {level=2}
In [[#def-gated-xattn]] with $\alpha = 0$, compute $\partial X'/\partial\alpha$ and the gradient of the loss with respect to the cross-attention parameters. Explain why training can open the gate even though the cross-attention layer's output is not used at initialisation, and what would happen if the gate were $\alpha^2$ instead of $\tanh\alpha$.
::: solution
$\partial X'/\partial\alpha = (1 - \tanh^2\alpha)\operatorname{XAttn}(X, V) = \operatorname{XAttn}(X, V)$ at $\alpha = 0$, so $\partial\mathcal{L}/\partial\alpha = \langle\partial\mathcal{L}/\partial X', \operatorname{XAttn}(X, V)\rangle$, which is non-zero whenever the attention output correlates with the direction that would lower the loss. The gradient with respect to the cross-attention parameters is multiplied by $\tanh\alpha = 0$ and vanishes at the first step, so the gate moves first and the layer starts learning as soon as $\alpha\neq0$. With a gate $\alpha^2$, $\partial(\alpha^2)/\partial\alpha = 2\alpha = 0$ at $\alpha = 0$, and both the gate and the layer would receive zero gradient: training would be stuck at the initialisation. A gate must have non-zero derivative where it is zero.
:::
:::

::: exercise Bottleneck against full patches {level=2 check="18"}
A VLM generates $T = 200$ tokens after one image. Compare the attention FLOPs to visual tokens of a projector design with $N = 576$ visual tokens and a Q-Former design with $K = 32$, using [[#prop-visual-cost]]. By what factor do they differ?
::: solution
The costs are $4LdNT$ and $4LdKT$, so the ratio is $N/K = 576/32 = 18$, whatever $L$, $d$ and $T$. The Q-Former design is $18$ times cheaper at this step and holds $18$ times less cache, at the price of compressing every image into $32$ vectors, which limits fine detail such as text.
:::
:::

::: exercise Pixel shuffle {level=2}
A ViT with $P = 14$ encodes a $448\times448$ tile into features of width $1024$. Pixel shuffle with factor $2$ folds each $2\times2$ block of neighbouring features into one vector. Give the number and width of the resulting tokens, and the number of parameters of a linear projector from them to a language model of width $4096$. Why fold rather than average the four vectors?
::: solution
The tile gives $32\times32 = 1024$ features; folding $2\times2$ blocks gives $16\times16 = 256$ tokens of width $4\cdot1024 = 4096$. A linear projector $4096\to4096$ has $4096^2 + 4096 = 16{,}781{,}312$ parameters. Folding (concatenation) is lossless — the four features are kept side by side and the projector can learn which parts to keep — while averaging would discard the differences between neighbouring patches, exactly the fine detail (strokes of characters) that high resolution was meant to preserve.
:::
:::

::: exercise A blind baseline {level=3}
A VLM scores $62\%$ on a four-option multiple-choice benchmark. The same model with the image replaced by a blank scores $48\%$. (a) What does each number say? (b) Suppose a fraction $f$ of questions are answerable from text alone, on which the model is always right with or without the image, and on the rest the blind model guesses uniformly. Estimate $f$, and the model's accuracy with the image on the questions that require it. (c) Why does this matter when comparing two models?
::: solution
(a) $62\%$ is the overall score; $48\%$, far above the $25\%$ of uniform guessing, shows that many questions can be answered from the text and option priors alone.

(b) Blind accuracy is $f + (1 - f)/4 = 0.48$, so $\tfrac34f = 0.23$ and $f = 0.307$. With the image, $0.62 = f + (1 - f)a$, where $a$ is the accuracy on vision-requiring questions: $a = (0.62 - 0.307)/0.693 = 0.452$. On the questions that actually test vision, the model gets about $45\%$, not $62\%$.

(c) Two models can differ in score because of different language priors rather than different visual ability; a stronger language model raises $f$ in effect. Reporting blind scores, or evaluating on vision-requiring subsets as MMStar does, separates the two.
:::
:::

::: exercise Choosing a connector {level=3}
You must build a VLM that answers questions about $30$-minute videos sampled at one frame per second, each frame encoded by a $336$-pixel ViT ($576$ patch features). (a) Count the visual tokens with a projector design. (b) Propose two ways to make the input fit a context of $32{,}000$ tokens, using ideas from this chapter, and state what each sacrifices.
::: solution
(a) $1800$ frames $\times$ $576$ = $1{,}036{,}800$ visual tokens — over thirty times the context.

(b) One option is a resampler or Q-Former per frame with $K$ tokens: $K = 16$ gives $28{,}800$ tokens, which fits, but each frame is reduced to $16$ vectors and fine detail (subtitles, small objects) is lost. Another is spatial pooling or merging (for example $4\times4$ average pooling to $36$ tokens per frame) combined with temporal subsampling (one frame every $2$ s: $900\cdot36 = 32{,}400$, near the limit), which loses both detail and short events. Alternatives include selecting frames relevant to the question with a cheap retrieval step (losing events the selector misses) or cross-attention in the Flamingo style, which keeps the text context small but still pays attention cost over all visual tokens in each gated layer.
:::
:::
