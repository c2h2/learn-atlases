The models of the previous chapters are assembled from parts. A vision–language model joins a separately pretrained image encoder to a separately pretrained language model through a small connector ([[multimodal/vision-language-models]]); a voice assistant may join a speech recogniser, a language model and a synthesiser ([[multimodal/audio-language-models]]); a text-to-image system conditions a diffusion model on the output of a frozen text encoder ([[multimodal/image-generation]]). This **late-fusion** approach reuses strong components and is cheap to build, but each component sees only its own modality during most of its training, information crosses between them through narrow interfaces, and the system can usually *read* several modalities but *write* only one.

**Natively multimodal** models are trained from the start on several modalities in one network. In the purest form, **early fusion**, every modality is converted into tokens from a shared vocabulary, documents that interleave text, images and audio become single token sequences, and one Transformer is trained with next-token prediction on all of them, so that it can both read and generate any modality in any order. This chapter defines the distinction, works through the token arithmetic and training difficulties of an early-fusion model, using Chameleon (2024) as the published example, surveys the variants that keep continuous representations for images (Transfusion) or separate encoders for understanding and generation, and discusses the data, evaluation and safety questions that come with models that can produce photorealistic images and voices.

## Late and early fusion {#sec-fusion}

::: definition Late and early fusion {#def-fusion}
A multimodal model uses **late fusion** if each non-text modality is processed by its own pretrained encoder (and, for output, its own decoder or generator) and only the encoder's outputs enter a language model, through a connector or cross-attention. It uses **early fusion** if all modalities are mapped by simple tokenisers into one sequence of tokens or vectors at the input, and a single Transformer, trained on all modalities from the start, processes and predicts that sequence.
:::

The terms describe a spectrum rather than two boxes. A VLM whose encoder is unfrozen and trained jointly for trillions of tokens moves towards early fusion; an early-fusion model still relies on a separately trained image tokeniser. The useful questions are: where does cross-modal interaction begin (at the first layer or only after a modality encoder)? Can the model generate each modality, or only read it? And are the components trained jointly or assembled from independently trained parts?

Early fusion offers three things. Every layer of the model can relate words to image regions or sounds, as a projector-based VLM also allows but a pooled contrastive embedding does not. Output in any modality comes from the same network that understands the context, so the model can write an explanation, draw a diagram and refer back to it in one generation. And the model can be trained on **interleaved documents** — web pages, slides, instruction manuals, transcripts with video frames — in their natural order. Its costs are equally clear: the model is trained from scratch at the cost of a large language model, image tokens are many and lossy, and training on competing modalities is less stable.

## Early fusion with discrete tokens {#sec-early}

### One vocabulary {#sec-vocab}

**Chameleon** (Chameleon Team, Meta, 2024) is a family of early-fusion models with $7$ and $34$ billion parameters. Its image tokeniser, a VQ autoencoder of the kind described in [[multimodal/image-generation#sec-ar]], encodes a $512\times512$ image into $32\times32 = 1024$ discrete codes from a codebook of $8192$. Its text tokeniser is a BPE vocabulary of $65{,}536$ entries, which includes the $8192$ image codes as tokens. An image in a document becomes a span of $1024$ tokens between start-of-image and end-of-image markers, and the model is a decoder-only Transformer trained with the usual next-token loss on sequences that mix text spans and image spans arbitrarily. It was pretrained on several trillion tokens of text, image–text pairs and interleaved documents, and then fine-tuned on mixed-modal instruction data.

The listing builds such a sequence, shows how sampling is constrained inside an image span, and constructs the attention mask of a hybrid model discussed below.

```python
import math, random
random.seed(7)

# one vocabulary for two modalities: text ids first, then image codes, then markers
N_TEXT, N_IMAGE = 65536 - 8192 - 2, 8192
IMG_START, IMG_END = N_TEXT, N_TEXT + 1
IMG0 = N_TEXT + 2                              # image code k has id IMG0 + k
V = IMG0 + N_IMAGE
print("vocabulary", V, " image share %.3f" % (N_IMAGE / V))

def image_span(codes):                         # a quantised image becomes a token span
    return [IMG_START] + [IMG0 + c for c in codes] + [IMG_END]

doc = [101, 2009, 318] + image_span([random.randrange(N_IMAGE) for _ in range(4)]) + [464, 5000]
kind = ["T" if t < N_TEXT else "<" if t == IMG_START else ">" if t == IMG_END else "I" for t in doc]
print("sequence", doc[:6], "...", " kinds", "".join(kind))

# modality-constrained sampling: inside an image span only image codes may follow
def constrained(logits, allowed):
    m = max(logits[i] for i in allowed)
    z = sum(math.exp(logits[i] - m) for i in allowed)
    return {i: round(math.exp(logits[i] - m) / z, 3) for i in allowed}

# toy vocabulary of 7: ids 0-2 text, 3 = <img>, 4 = </img>, 5-6 image codes
toy = [2.0, 1.0, 0.5, -1.0, 0.0, 1.5, 0.3]
Z = sum(math.exp(y) for y in toy)
print("unconstrained", [round(math.exp(x) / Z, 3) for x in toy])
print("inside image ", constrained(toy, [5, 6]))
print("in text      ", constrained(toy, [0, 1, 2, 3]))

# a Transfusion-style mask: causal overall, bidirectional inside each image
kinds = "TTT" + "IIII" + "TT"
img_id, cur = [], 0
for i, k in enumerate(kinds):
    if k == "I" and (i == 0 or kinds[i - 1] != "I"): cur += 1
    img_id.append(cur if k == "I" else 0)
mask = [[1 if j <= i or (img_id[i] and img_id[i] == img_id[j]) else 0 for j in range(len(kinds))]
        for i in range(len(kinds))]
for i, row in enumerate(mask):
    print(kinds[i], "".join("x" if a else "." for a in row))
print("allowed pairs", sum(map(sum, mask)), "of", len(kinds) ** 2)
```

```text
vocabulary 65536  image share 0.125
sequence [101, 2009, 318, 57342, 62649, 59815] ...  kinds TTT<IIII>TT
unconstrained [0.39, 0.143, 0.087, 0.019, 0.053, 0.236, 0.071]
inside image  {5: 0.769, 6: 0.231}
in text       {0: 0.609, 1: 0.224, 2: 0.136, 3: 0.03}
T x........
T xx.......
T xxx......
I xxxxxxx..
I xxxxxxx..
I xxxxxxx..
I xxxxxxx..
T xxxxxxxx.
T xxxxxxxxx
allowed pairs 51 of 81
```

::: example The token budget of an interleaved document {#ex-budget}
A how-to article has $600$ text tokens and three images, each encoded as $1024$ codes with start and end markers. How long is the sequence, what fraction is text, and how does that compare with a projector-based VLM that reads the same images as $576$ visual tokens each?
::: solution
The images take $3\cdot(1024 + 2) = 3078$ tokens and the sequence has $3678$; text is $600/3678 = 16\%$ of it. A $336$-pixel projector VLM would use $3\cdot576 + 600 = 2328$ positions — but it cannot generate the images, only read them. Early fusion pays for symmetry with longer sequences: every image the model reads or writes costs as much context as a short article.
:::
:::

### Generating in the right modality {#sec-constrained}

A single softmax over the joint vocabulary means that, after a start-of-image marker, the model could in principle emit a text token in the middle of an image, or an image code in the middle of a sentence. Trained models put little probability there, but inference code usually enforces the structure.

::: proposition Modality-constrained decoding {#prop-constrained}
Let $p(\cdot\mid\mathbf{x}_{<t})$ be the model's next-token distribution over vocabulary $\mathcal{V}$ and $\mathcal{A}\subset\mathcal{V}$ the set of tokens allowed at position $t$ (for example the image codes inside an image span). Setting the logits of tokens outside $\mathcal{A}$ to $-\infty$ before the softmax gives

$$
\tilde p(v\mid\mathbf{x}_{<t}) = \frac{p(v\mid\mathbf{x}_{<t})}{\sum_{u\in\mathcal{A}}p(u\mid\mathbf{x}_{<t})}\quad(v\in\mathcal{A}),
$$

which is the model's distribution conditioned on the event that the next token lies in $\mathcal{A}$.
:::

::: proof
With logits $z_v$, $p(v) = e^{z_v}/\sum_{u\in\mathcal{V}}e^{z_u}$. Masking gives $\tilde p(v) = e^{z_v}/\sum_{u\in\mathcal{A}}e^{z_u}$ for $v\in\mathcal{A}$; dividing numerator and denominator by $\sum_{u\in\mathcal{V}}e^{z_u}$ gives $p(v)/\sum_{u\in\mathcal{A}}p(u) = p(v\mid v\in\mathcal{A})$ by the definition of conditional probability.
:::

::: example Renormalising inside an image {#ex-constrained}
In the listing's toy vocabulary the unconstrained probabilities of the two image codes are $0.236$ and $0.071$. What are their probabilities when sampling is restricted to image codes, and how much probability did the model put on illegal tokens?
::: solution
$0.236/(0.236 + 0.071) = 0.769$ and $0.071/0.307 = 0.231$, as printed. The model put $1 - 0.307 = 0.693$ of its probability on text tokens and markers at a position where only image codes are valid — a badly trained toy; in a trained model this leakage is small, but it is never exactly zero, and constraining removes it without changing the relative probabilities of the legal tokens.
:::
:::

The same structure fixes the length of an image span: after $1024$ codes, the end marker is forced. Guidance ([[multimodal/image-generation#def-cfg]]) carries over to token models by combining the logits of a forward pass with the prompt and one without it, which Chameleon-style and other autoregressive image generators use to improve prompt adherence.

### Training stability {#sec-stability}

Training on a mix of modalities from scratch is harder than training on text. The Chameleon report described loss divergences late in training that it attributed to the norms of activations and logits drifting upwards, which a single softmax shared by modalities with very different entropy makes worse: image codes are far less predictable than text tokens, and the model can lower its loss on easy tokens by inflating logits. The remedies it reported are the standard tools of large-scale training ([[pretraining/training-stability]]): normalising queries and keys before the attention product (**QK-norm**), dropout, changes to the placement of normalisation layers, and a **z-loss** on the softmax normaliser.

::: definition z-loss {#def-zloss}
For logits $\mathbf{z}$ with normaliser $Z = \sum_ve^{z_v}$, the **z-loss** adds $\lambda_z(\log Z)^2$ to the loss of each token, with a small coefficient (PaLM used $\lambda_z = 10^{-4}$).
:::

::: proposition The z-loss gradient {#prop-zloss}
$\dfrac{\partial}{\partial z_v}\lambda_z(\log Z)^2 = 2\lambda_z\log Z\cdot p_v$, where $p_v = e^{z_v}/Z$. When $\log Z > 0$ the z-loss lowers every logit in proportion to its probability, pulling the normaliser towards $1$.
:::

::: proof
$\partial\log Z/\partial z_v = e^{z_v}/Z = p_v$, and the chain rule gives $2\lambda_z\log Z\,p_v$. Subtracting the same constant from all logits leaves the softmax unchanged and lowers $\log Z$ by that constant; the z-loss gradient is not exactly uniform (it is weighted by $p_v$), but its main effect is to drive $\log Z$ towards $0$, which keeps logits from drifting to large magnitudes where low-precision arithmetic and the softmax become unstable.
:::

::: example A z-loss step {#ex-zloss}
Logits $(2, 0, -1)$ give $\log Z = 2.170$ and probabilities $(0.844, 0.114, 0.042)$. Compute the z-loss and its gradient with $\lambda_z = 10^{-4}$.
::: solution
The loss is $10^{-4}\cdot2.170^2 = 4.71\times10^{-4}$. The gradient is $2\cdot10^{-4}\cdot2.170\cdot(0.844, 0.114, 0.042) = (3.66, 0.50, 0.18)\times10^{-4}$. It is tiny compared with the cross-entropy gradient (of order $1$), so it barely affects predictions, but it acts on every token at every step and keeps the normaliser in check over a long run.
:::
:::

### Balancing the modalities {#sec-balance}

With a per-token average loss, each modality's weight in training is its share of tokens. Images are token-hungry, so a corpus that is balanced by *documents* can be dominated by images when measured in tokens.

::: proposition The mixed-modal loss as a weighted average {#prop-mix}
Let a batch contain $n_m$ tokens of modality $m$ with mean loss $\bar\ell_m$, and $N = \sum_mn_m$. The per-token average loss is $\bar\ell = \sum_m\frac{n_m}{N}\bar\ell_m$, and its gradient is the corresponding mixture of the modalities' mean gradients. A loss $\sum_m\lambda_m\bar\ell_m$ with chosen weights $\lambda_m$ decouples a modality's influence from its token count.
:::

::: proof
$\bar\ell = \frac1N\sum_{\text{tokens}}\ell = \frac1N\sum_mn_m\bar\ell_m$, and differentiation is linear.
:::

::: example Who dominates the loss? {#ex-mix}
A batch contains the $600$ text tokens and $3072$ image codes of [[#ex-budget]] (markers ignored). The mean losses are $2.0$ nats per text token and $5.0$ per image code. Compute the per-token average and the share of the loss contributed by text.
::: solution
$\bar\ell = (600\cdot2.0 + 3072\cdot5.0)/3672 = 16{,}560/3672 = 4.51$. Text contributes $1200/16{,}560 = 7\%$ of the total. Image codes are both more numerous and less predictable, so an unweighted loss spends most of its gradient on them; a mixture chosen by documents can starve the model's language ability. Data mixtures ([[pretraining/data-mixtures]]) and per-modality weights are tuned for this reason.
:::
:::

::: widget plot
f: n/(n + x*k)
x: 0, 10
y: 0, 1
sliders: n=600:50:4000:50; k=1024:64:4096:64
labels: text share of the sequence
caption: The fraction of tokens that are text in a document with $n$ text tokens and $x$ images of $k$ tokens each. With $1024$-token images, a single image outweighs a typical page of text. This share sets each modality's weight under a per-token loss ([[#prop-mix]]), and the sequence length sets the compute; native-resolution or high-resolution images (with $k$ in the thousands) make both effects stronger.
:::

Aghajanyan et al. (2023) fitted scaling laws to generative models trained on pairs of modalities (text, images, speech, code, molecules and others) and found both **competition** — at small scale, adding a second modality hurt performance on the first — and **synergy**, which appeared as models grew; the crossover depended on the modality pair. This is an empirical regularity, like other scaling laws ([[scaling/scaling-laws]]), and it suggests why early fusion became practical only at large scale.

## Hybrid designs {#sec-hybrid}

Discrete image tokens are a bottleneck. A VQ tokeniser at $16\times$ downsampling reconstructs photographs well but loses fine text and small faces — the Chameleon report notes difficulty with images containing a lot of text — and next-token prediction over $1024$ codes is slow compared with a few dozen diffusion steps. Several published designs keep a single Transformer but treat images differently from text.

::: definition Transfusion {#def-transfusion}
A **Transfusion** model (Zhou et al., 2024) is a single Transformer over sequences in which text appears as discrete tokens and each image as a sequence of continuous latent patches (from a VAE, [[multimodal/image-generation#def-ldm]]), noised to a random diffusion step during training. Its loss is the language-modelling loss on text tokens plus a weighted diffusion loss on the image patches,

$$
\mathcal{L} = \mathcal{L}_{\text{LM}} + \lambda\,\mathcal{L}_{\text{diffusion}},
$$

and its attention mask is **causal over the sequence but bidirectional within each image**, so that every patch of an image can attend to every other patch of the same image while text remains autoregressive. At inference text is generated token by token; when the model emits a start-of-image marker, it generates the image by a diffusion sampler running the same Transformer on the image positions, then continues with text.
:::

The listing prints such a mask for three text tokens, a four-patch image and two text tokens: $45$ causal pairs plus $6$ extra pairs within the image, $51$ of $81$. Zhou et al. reported that, at equal compute, Transfusion generated images considerably better than a Chameleon-style model with discrete image tokens, while matching it on text. Related designs use masked discrete diffusion for images in a model that is autoregressive for text (Show-o; Xie et al., 2024), or decouple the visual pathways: Janus (Wu et al., 2024) reads images through a semantic encoder (SigLIP features, good for understanding) and writes them through VQ tokens (good for generation), sharing one Transformer between them. Emu3 (Wang et al., 2024) went the other way and argued that plain next-token prediction over discrete image and video tokens suffices at scale. As of 2026 none of these has settled the question, and the choice of image representation — discrete or continuous, semantic or reconstructive, one representation or two — is the main axis along which unified models differ.

::: example Video as tokens {#ex-video}
A one-minute video is sampled at $2$ frames per second and each frame is tokenised into $256$ tokens. How many tokens is it, and what does a tokeniser that also compresses $4$ frames in time into one latent frame save?
::: solution
$60\cdot2\cdot256 = 30{,}720$ tokens per minute — a medium-sized context for text, for one minute of low-frame-rate video. A spatio-temporal tokeniser that maps $4$ frames to one latent frame of $256$ tokens gives $7680$ tokens, at the price of blurring fast motion. Video generators and video-reading models rely on such temporal compression, and still treat long videos by sampling frames.
:::
:::

## Any-to-any models {#sec-any}

Extending early fusion beyond images is a matter of more tokenisers: speech through a codec with a semantic first codebook ([[multimodal/audio-language-models#sec-codecs]]), music through an acoustic codec, video through spatio-temporal tokenisers, and even robot actions or bounding boxes as discretised numbers. Published examples include Unified-IO 2 (Lu et al., 2024), trained from scratch on images, text, audio and actions; AnyGPT (Zhan et al., 2024), which added speech, image and music tokenisers to a language model and trained on synthetic multimodal dialogues; and the speech–text model Moshi ([[multimodal/audio-language-models#sec-moshi]]), which is natively multimodal in two modalities.

Several commercial systems are described by their developers as natively multimodal. The Gemini 1.0 report (December 2023) described models trained jointly across text, images, audio and video from the beginning, accepting interleaved inputs and able to produce images through discrete image tokens. OpenAI described GPT-4o (May 2024) as a single model trained end to end across text, vision and audio, and introduced image generation by the same model in 2025. Both reports gave few architectural details; claims about how these systems work beyond what the developers have published should be treated with caution.

::: warning "Native" does not mean "without components", nor "better at everything"
Early-fusion models still depend on separately trained tokenisers whose losses bound the quality of everything downstream, and "natively multimodal" in a product description may mean anything from a single Transformer over shared tokens to a jointly fine-tuned assembly of encoders and decoders. Nor is early fusion uniformly superior: at fixed compute, a late-fusion model that reuses a strong pretrained language model and vision encoder can match or beat an early-fusion model on understanding benchmarks, and modality competition ([[#sec-balance]]) can cost text performance. Compare designs at equal compute and data, and read what was actually published.
:::

::: quiz
Which property distinguishes an early-fusion model such as Chameleon from a projector-based VLM such as LLaVA?
- [ ] Only the early-fusion model uses a Transformer.
- [x] The early-fusion model represents images as tokens of the same vocabulary as text and can generate them with the same next-token objective; the VLM can read images but outputs only text.
- [ ] The VLM cannot process more than one image.
- [ ] The early-fusion model needs no image tokeniser.
::: solution
Both use Transformers, and VLMs can read several images. The difference is that the early-fusion model's images are discrete tokens predicted by the same softmax as text, which makes image generation and arbitrary interleaving possible, at the cost of a lossy tokeniser and long sequences.
:::
:::

## Data for native multimodality {#sec-data}

Early-fusion models need data in which modalities appear together in natural order. Three kinds dominate:

- **Paired data** — image–caption pairs (as in [[multimodal/contrastive-learning#sec-data]]), speech–transcript pairs, video–description pairs — teach correspondence but contain little language.
- **Interleaved documents** — web pages with their images in place. MMC4 (Zhu et al., 2023) interleaved $571$ million images with $101$ million text documents by aligning images to sentences; OBELICS (Laurençon et al., 2023) extracted $141$ million web pages with $353$ million images and $115$ billion text tokens in their original layout; MINT-1T (Awadalla et al., 2024) reached a trillion text tokens and $3.4$ billion images, including PDFs. Interleaved data teach a model to use images as part of a narrative and to handle several images in one context.
- **Synthetic and instruction data** — generated captions, rendered text and charts, mixed-modal conversations — supply skills that the web rarely shows explicitly, with the usual risk of inheriting the generator's errors ([[multimodal/vision-language-models#sec-training]]).

The same provenance, consent and filtering questions arise as for text and image–text data, with additional ones for faces, voices and children's images; the LAION episode of 2023 ([[multimodal/contrastive-learning#sec-data]]) showed how a public dataset can contain illegal material that filters missed.

## Evaluation and safety {#sec-safety}

Evaluating a model that reads and writes several modalities combines the evaluations of the previous chapters — VLM benchmarks for understanding, FID, prompt alignment and human preference for images, WER, naturalness and speaker similarity for speech — with mixed-modal tasks that have no automatic metric, such as producing an illustrated recipe. The Chameleon report, for instance, relied on human raters comparing mixed-modal responses with those of other systems, an evaluation whose results depend heavily on the prompt set and rating protocol. As of 2026, there is no agreed benchmark for mixed-modal generation.

Safety concerns grow with each output modality:

- **Synthetic media.** Photorealistic images, video and cloned voices enable impersonation, fraud, non-consensual imagery and fabricated evidence. Measures include refusing prompts about real people, filtering outputs, **watermarking** generated content (for example Google DeepMind's SynthID for images, audio and text), and attaching signed **provenance metadata** under the C2PA standard. Watermarks can be degraded by editing and metadata can be stripped; detection of unmarked synthetic media is unreliable. The mechanisms and their limits are analysed in [[llm-society/copyright-provenance#sec-watermark]] and [[llm-society/copyright-provenance#sec-c2pa]], and the social effects in [[llm-society/misinformation]].
- **Instructions hidden in other modalities.** A model that reads text in images ([[multimodal/contrastive-learning#sec-limits]]) or hears speech may follow instructions embedded in an image, a document or an audio clip supplied by a third party — a multimodal form of prompt injection, especially consequential for agents that act on screenshots ([[agents]]).
- **Safety training across modalities.** Refusal and preference training done mostly on text may not transfer fully to the same request posed through an image or speech; red-teaming and safety data must cover each input and output modality ([[safety-alignment]]).
- **Privacy.** Images and voices identify people; models that recognise faces or voices, or reproduce memorised training images ([[multimodal/image-generation#warn-memorise]]), raise privacy questions beyond those of text ([[llm-society/privacy-memorisation]]).

::: application Choosing an architecture
A team that needs document and screenshot understanding with text output, on a modest budget, will usually build a late-fusion VLM on a strong open language model and vision encoder. A team that needs interleaved generation — illustrated answers, image editing within a conversation, real-time speech — needs a model that generates the other modality, either an early-fusion or hybrid model trained at scale or a late-fusion system with a generator attached. The trade-off is the one this course has followed throughout: reuse of strong components against seams between them.
:::

::: history
Early multimodal Transformers were encoders over text tokens and image regions (ViLBERT, LXMERT, 2019). CM3 (Aghajanyan et al., 2022) trained a causally masked model on HTML documents with VQ image tokens, and CM3leon (Yu et al., 2023) scaled it to text-to-image and image-to-text generation with instruction tuning. Aghajanyan et al. (2023) measured competition and synergy between modalities. The Gemini 1.0 report (December 2023) described a jointly trained multimodal model family; Unified-IO 2 (late 2023, CVPR 2024), AnyGPT and Chameleon (both 2024) published early-fusion models; GPT-4o (May 2024) brought end-to-end voice interaction to an assistant; Transfusion, Show-o, Janus and Emu3 (all 2024) explored hybrid and purely autoregressive unified models; and in 2025 several assistants added image generation by the same model that converses.
:::

::: summary
- Late fusion connects pretrained modality encoders (and generators) to a language model; early fusion tokenises all modalities into one sequence and trains one Transformer on everything from the start. Real systems lie between.
- Chameleon encodes a $512^2$ image as $1024$ codes from $8192$, inside a $65{,}536$-token vocabulary; images make sequences long and dominate a per-token loss ($n_m/N$ weights), so modality weights and mixtures must be chosen.
- Masking logits to the allowed modality is conditioning the model's distribution on that event; image spans have fixed length and guidance carries over to token models.
- Mixed-modal training is less stable; QK-norm, dropout, normalisation placement and the z-loss $\lambda_z(\log Z)^2$ (gradient $2\lambda_z\log Z\,p_v$) are used.
- Hybrids keep images continuous (Transfusion: LM loss plus diffusion loss, causal mask with bidirectional attention inside images) or separate the understanding and generation pathways (Janus).
- Interleaved web data (MMC4, OBELICS, MINT-1T) teach mixed-modal context; evaluation of mixed-modal generation is still mostly human.
- Synthetic media, cross-modal prompt injection, transfer of safety training and privacy are the main safety concerns; watermarking and C2PA provenance help but are not robust alone.
:::

## Exercises

::: exercise Image tokens {level=1 check="1024"}
A tokeniser downsamples a $512\times512$ image by $16$ in each dimension. How many tokens does the image become?
::: solution
$(512/16)^2 = 32^2 = 1024$.
:::
:::

::: exercise An interleaved sequence {level=1 check="5930"}
A document has $800$ text tokens and $5$ images, each $1024$ codes plus a start and an end marker. How many tokens is the sequence?
::: solution
$5\cdot1026 + 800 = 5130 + 800 = 5930$.
:::
:::

::: exercise Image codes in the vocabulary {level=1 check="0.125"}
What fraction of a $65{,}536$-token vocabulary do $8192$ image codes occupy?
::: solution
$8192/65{,}536 = 1/8 = 0.125$.
:::
:::

::: exercise Video tokens {level=1 check="30720"}
How many tokens is a $60$-second video at $2$ frames per second with $256$ tokens per frame?
::: solution
$60\cdot2\cdot256 = 30{,}720$ ([[#ex-video]]).
:::
:::

::: exercise Constrained probabilities {level=2 check="0.6"}
At a position inside an image span the model assigns probability $0.3$ to image code $a$, $0.2$ to image code $b$, and $0.5$ to text tokens; there are no other image codes with non-zero probability. What is the probability of $a$ under modality-constrained decoding?
::: solution
By [[#prop-constrained]], $0.3/(0.3 + 0.2) = 0.6$.
:::
:::

::: exercise A weighted mixed-modal loss {level=2 check="3.5"}
For the batch of [[#ex-mix]] (text mean loss $2.0$, image mean loss $5.0$), the team instead uses $\mathcal{L} = \frac12\bar\ell_{\text{text}} + \frac12\bar\ell_{\text{image}}$. What is the loss (the answer to enter), and what share of it now comes from text?
::: solution
$\frac12(2.0) + \frac12(5.0) = 3.5$; text contributes $1.0/3.5 = 29\%$ instead of $7\%$. The gradient on text tokens is correspondingly larger relative to the per-token average.
:::
:::

::: exercise Counting a hybrid mask {level=2 check="31"}
A sequence has $2$ text tokens, an image of $3$ patches and $2$ more text tokens. Under a Transfusion mask (causal, plus bidirectional within the image), how many (query, key) pairs are allowed?
::: solution
The causal mask over $7$ positions allows $7\cdot8/2 = 28$ pairs. Within the image, each patch may also attend to the later patches of the same image: $\binom32 = 3$ extra pairs. Total $31$.
:::
:::

::: exercise The z-loss in a logit drift {level=2}
Suppose all logits of a model drift upwards by the same amount $c$ over training. (a) Show that the cross-entropy loss is unchanged. (b) Show that the z-loss increases, and compute its gradient with respect to $c$. (c) Why might such drift be harmful even though the predictions are unchanged?
::: solution
(a) Adding $c$ to every logit multiplies numerator and denominator of the softmax by $e^c$, so probabilities and cross-entropy are unchanged. (b) $\log Z$ becomes $\log Z + c$, so the z-loss is $\lambda_z(\log Z + c)^2$, with derivative $2\lambda_z(\log Z + c)$ in $c$, positive whenever $\log Z + c > 0$: the z-loss pushes the drift back. (c) Cross-entropy is blind to the drift, so nothing in the main loss stops it; large logits lose precision in 16-bit arithmetic, make the softmax saturate so that small logit errors produce large probability changes, and are associated with the divergences reported in large training runs.
:::
:::

::: exercise Late or early fusion? {level=3}
For each requirement, argue whether a late-fusion VLM with text output, an early-fusion model with discrete image tokens, or a hybrid such as Transfusion is the better starting point, and name the main risk: (a) answering questions about scanned invoices; (b) writing a step-by-step illustrated tutorial with generated diagrams; (c) editing a user's photograph according to an instruction while preserving the person's face.
::: solution
(a) Late fusion: the task needs high-resolution reading and text output only, and a strong pretrained vision encoder with tiling or native resolution reads small print; an early-fusion model's $16\times$ VQ tokens would lose fine text. Risk: hallucinated numbers when text is below token resolution ([[multimodal/vision-language-models#sec-hallucination]]).

(b) Early fusion or hybrid: the model must generate images interleaved with text that refer to each other, which a text-only VLM cannot do; a single model that sees its own earlier text and images keeps them consistent. Risk: discrete tokenisers render text inside diagrams poorly; a hybrid with continuous latents may do better, at the price of a more complex training objective.

(c) Hybrid or a dedicated image-editing model: preserving identity requires high-fidelity reconstruction of the input, which favours continuous latents (diffusion) over a lossy discrete tokeniser; the instruction must condition the edit, which a unified model does naturally. Risk: subtle changes to the face (identity drift), and misuse for manipulating images of real people, which calls for provenance marking ([[#sec-safety]]).
:::
:::

::: exercise Competition between modalities {level=3}
A team trains two models of equal size and compute: one on text only, one on a 50/50 token mixture of text and image codes. On a text benchmark the mixed model is worse. (a) Give two explanations consistent with [[#prop-mix]] and with the findings of Aghajanyan et al. (b) Propose two experiments that distinguish them.
::: solution
(a) First, **data dilution**: the mixed model saw half as many text tokens, so it is simply less trained on text — at equal compute, its text loss corresponds to a text-only model trained on half the data. Second, **capacity competition**: the two modalities compete for the same parameters, so even with equal text tokens the mixed model would do worse at this scale; Aghajanyan et al. found competition at small scale and synergy at large scale for some modality pairs.

(b) Train a text-only model on the same number of text tokens as the mixed model saw (half the compute): if it matches the mixed model on text, dilution explains the gap. Then train mixed and text-only models at several sizes with equal text tokens: if the gap shrinks or reverses as size grows, capacity competition is the explanation and synergy may appear at scale. Changing the mixture proportion or the per-modality loss weights tests how sensitive the result is to the balance.
:::
:::
