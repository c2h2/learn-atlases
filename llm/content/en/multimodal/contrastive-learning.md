The vision Transformers of [[multimodal/vision-transformers]] were trained to predict one of a fixed set of labels — the $1000$ classes of ImageNet, or the $18{,}000$ of JFT. Such labels are expensive to collect, and they teach a model a closed vocabulary: a classifier trained on ImageNet has no output for "a crowded tram at night" or "a hand-drawn diagram of a cell". The web, meanwhile, contains billions of images that come with text written by people — captions, alt text, titles, surrounding sentences. That text is noisy and incomplete, but it describes images in open-ended language, and there is a great deal of it.

**Contrastive image–text learning** turns these pairs into supervision. Two encoders, one for images and one for text, map their inputs into a shared vector space, and training pulls each image towards its own caption and pushes it away from the captions of other images. Radford et al. (2021) trained such a model, **CLIP**, on $400$ million image–text pairs, and showed that its shared space can classify images into categories it was never explicitly trained on — **zero-shot classification** — simply by embedding the names of the categories as text. This chapter derives the CLIP objective from the InfoNCE loss of [[prompting-rag/text-embeddings#def-infonce]], explains the role of the learnable temperature, shows how zero-shot classification and retrieval work, and then turns to the sigmoid loss of SigLIP, the data that these models are trained on, and the geometry and failure modes of the shared space. CLIP-style encoders are the eyes of most vision–language models ([[multimodal/vision-language-models]]) and the text conditioning of many image generators ([[multimodal/image-generation]]), so what they can and cannot represent matters well beyond classification.

## A shared embedding space {#sec-shared}

::: definition Dual encoder for images and text {#def-dual}
A **dual encoder** consists of an image encoder $f_\theta$ (a ViT or a convolutional network) and a text encoder $g_\phi$ (a Transformer), each followed by a linear projection into a common dimension $d$ and normalisation to unit length:

$$
\mathbf{u} = \frac{W_I f_\theta(x)}{\lVert W_I f_\theta(x)\rVert},\qquad \mathbf{v} = \frac{W_T g_\phi(t)}{\lVert W_T g_\phi(t)\rVert}.
$$

The similarity of image $x$ and text $t$ is the cosine $\mathbf{u}^\top\mathbf{v}\in[-1, 1]$.
:::

The two encoders share no weights and never attend to each other's inputs: the image embedding is computed without seeing the text and vice versa. That is the bi-encoder design of [[prompting-rag/text-embeddings#def-bi-cross]], and it brings the same advantage — embeddings of a million images can be computed once and searched with a text query — and the same weakness: fine-grained interactions between the words and the picture can only be captured through a single dot product.

In CLIP the image encoder was either a modified ResNet or a ViT, with the image embedding taken from the CLS output; the text encoder was a $12$-layer, $512$-wide Transformer of about $63$ million parameters with a byte-level BPE vocabulary of $49{,}152$ tokens and a context of $77$ tokens, whose output at the end-of-text token served as the text embedding. Both were trained from scratch.

## The CLIP objective {#sec-clip}

Training uses batches of $B$ image–text pairs $(x_i, t_i)$. Each image's correct caption is the one it came with; the other $B - 1$ captions in the batch serve as negatives — the in-batch negatives of [[prompting-rag/text-embeddings#sec-contrastive]]. Unlike retrieval of passages for queries, the task is symmetric: each caption should also pick out its image among the $B$ images.

::: definition Symmetric contrastive loss with learnable temperature {#def-clip-loss}
Let $\mathbf{u}_i$, $\mathbf{v}_j$ be the normalised embeddings of a batch, $S_{ij} = \mathbf{u}_i^\top\mathbf{v}_j$ the $B\times B$ matrix of cosines, and $s = 1/\tau > 0$ a learnable **logit scale** (inverse temperature). The **CLIP loss** is the average of two cross-entropies, image-to-text over the rows of $sS$ and text-to-image over its columns:

$$
\mathcal{L} = \frac{1}{2B}\sum_{i=1}^{B}\left[\Big(\log\sum_{j=1}^{B}e^{sS_{ij}} - sS_{ii}\Big) + \Big(\log\sum_{j=1}^{B}e^{sS_{ji}} - sS_{ii}\Big)\right].
$$ {#eq-clip}

CLIP parameterised $s = e^{\vartheta}$ with $\vartheta$ trained by gradient descent, initialised at $s = 1/0.07 \approx 14.3$, and clipped $s$ at $100$.
:::

Each bracket is an InfoNCE loss ([[prompting-rag/text-embeddings#def-infonce]]): the row term classifies image $i$ among $B$ captions, the column term classifies caption $i$ among $B$ images. Because the whole batch is scored with one matrix product, the number of negatives grows with the batch size at little cost; CLIP used $B = 32{,}768$. Radford et al. found the contrastive objective far more efficient than the alternatives they tried: predicting the exact caption with a Transformer language model learned zero-shot ImageNet classification about three times more slowly than predicting a bag of the caption's words, which in turn was about four times slower than contrastive training. Predicting *which* caption goes with an image is easier than predicting its words, and it is all that a shared space needs.

### The temperature {#sec-temperature}

With cosines confined to $[-1, 1]$, a logit scale of $1$ cannot make the softmax confident: even a perfect model with $S_{ii} = 1$ and $S_{ij} = 0$ would have loss $\log(e + B - 1) - 1$, about $9.4$ for $B = 32{,}768$. The logit scale stretches the cosines into logits large enough for the softmax to concentrate. Learning it, rather than tuning it by hand, lets the model sharpen the softmax as its embeddings improve.

::: proposition Gradient with respect to the logit scale {#prop-scale-grad}
Let $p_{ij} = e^{sS_{ij}}/\sum_ke^{sS_{ik}}$ (row softmax) and $q_{ji} = e^{sS_{ji}}/\sum_ke^{sS_{ki}}$ (column softmax). Then

$$
\frac{\partial\mathcal{L}}{\partial s} = \frac{1}{2B}\sum_{i=1}^{B}\Big[\Big(\sum_j p_{ij}S_{ij} - S_{ii}\Big) + \Big(\sum_j q_{ji}S_{ji} - S_{ii}\Big)\Big].
$$ {#eq-scale-grad}

Each term compares the model's expected similarity under its own softmax with the similarity of the correct pair. When every correct pair has the largest cosine in its row and column, every term is negative, and gradient descent increases $s$ without bound; a finite optimum exists only when some negatives score as high as positives.
:::

::: proof
For one row, $\frac{\partial}{\partial s}\big(\log\sum_je^{sS_{ij}} - sS_{ii}\big) = \frac{\sum_jS_{ij}e^{sS_{ij}}}{\sum_je^{sS_{ij}}} - S_{ii} = \sum_jp_{ij}S_{ij} - S_{ii}$, and likewise for columns; average. A convex combination of the entries of a row is at most the row's maximum, with equality only if all weight sits on maximal entries; so if $S_{ii}$ is the strict maximum of its row, $\sum_jp_{ij}S_{ij} < S_{ii}$ for every finite $s$. If this holds for every row and column, $\partial\mathcal{L}/\partial s < 0$ everywhere and the loss decreases towards $0$ as $s\to\infty$.
:::

This is why CLIP clipped $s$ at $100$: on a training batch that the model already separates, the loss rewards ever larger scales, which makes the softmax arbitrarily sharp and the gradients through the embeddings unstable. On real batches, which always contain confusable pairs and noisy captions, the learned scale settles at a finite value — in CLIP it rose to the cap during training.

::: example Loss at three temperatures {#ex-clip-temp}
The listing below builds $B = 8$ pairs whose image and text embeddings share a "meaning" vector plus independent noise, so that matched cosines average $0.63$ and unmatched ones about $0$. Read off the loss at $s = 1$, $14.3$ and $100$, and explain the pattern.
::: solution
The listing prints $1.587$ at $s = 1$, $0.210$ at $s = 14.3$ and $0.780$ at $s = 100$, against a chance level of $\ln8 = 2.079$. At $s = 1$ the embeddings separate the pairs but the softmax is too flat to express it. At $s = 14.3$ the loss is near its minimum: the numerical derivative $\partial\mathcal{L}/\partial s = -0.004$ is almost zero. At $s = 100$ the loss rises again, because a few noisy pairs have a negative that beats or nearly beats the positive, and a large scale magnifies those mistakes — [[#prop-scale-grad]] with some positive terms.
:::
:::

```python
import math, random
random.seed(1)
d, B = 16, 8
def unit(v):
    n = math.sqrt(sum(x * x for x in v)); return [x / n for x in v]
dot = lambda a, b: sum(x * y for x, y in zip(a, b))
def lse(z):
    m = max(z); return m + math.log(sum(math.exp(x - m) for x in z))

# B paired embeddings: a shared "meaning" plus modality-specific noise
meaning = [[random.gauss(0, 1) for _ in range(d)] for _ in range(B)]
I = [unit([m + 0.8 * random.gauss(0, 1) for m in v]) for v in meaning]   # image side
T = [unit([m + 0.8 * random.gauss(0, 1) for m in v]) for v in meaning]   # text side
S = [[dot(I[i], T[j]) for j in range(B)] for i in range(B)]                 # B x B cosines

def clip_loss(S, s):                     # symmetric InfoNCE with logit scale s = 1/tau
    rows = sum(lse([s * x for x in S[i]]) - s * S[i][i] for i in range(B)) / B
    cols = sum(lse([s * S[j][i] for j in range(B)]) - s * S[i][i] for i in range(B)) / B
    return (rows + cols) / 2

def siglip_loss(S, t, b):                # pairwise sigmoid loss, z = +1 on the diagonal
    L = 0.0
    for i in range(B):
        for j in range(B):
            z = 1 if i == j else -1
            L += math.log1p(math.exp(-z * (t * S[i][j] + b)))
    return L / B

print("mean cosine, matched %.3f  unmatched %.3f" % (
    sum(S[i][i] for i in range(B)) / B,
    sum(S[i][j] for i in range(B) for j in range(B) if i != j) / (B * B - B)))
for s in (1, 1 / 0.07, 100):
    print(f"logit scale {s:7.2f}: CLIP loss {clip_loss(S, s):.4f}   (chance log B = {math.log(B):.4f})")
h = 1e-5; s = 1 / 0.07
print("dL/ds numeric %.5f" % ((clip_loss(S, s + h) - clip_loss(S, s - h)) / (2 * h)))
print("SigLIP loss  t=10,b=-10: %.4f   t=10,b=0: %.4f" % (siglip_loss(S, 10, -10), siglip_loss(S, 10, 0)))

# zero-shot classification: 3 class "prompt" embeddings, 300 noisy test images
classes = [unit([random.gauss(0, 1) for _ in range(d)]) for _ in range(3)]
correct = 0
for n in range(300):
    y = n % 3
    img = unit([c + 0.9 * random.gauss(0, 1) for c in classes[y]])
    pred = max(range(3), key=lambda k: dot(img, classes[k]))
    correct += pred == y
print("zero-shot accuracy:", correct / 300)
```

```text
mean cosine, matched 0.631  unmatched 0.014
logit scale    1.00: CLIP loss 1.5873   (chance log B = 2.0794)
logit scale   14.29: CLIP loss 0.2103   (chance log B = 2.0794)
logit scale  100.00: CLIP loss 0.7799   (chance log B = 2.0794)
dL/ds numeric -0.00404
SigLIP loss  t=10,b=-10: 3.7323   t=10,b=0: 8.9386
zero-shot accuracy: 0.7
```

::: widget plot
f: -log(exp(x*a)/(exp(x*a) + exp(x*h) + (n-2)*exp(x*c)))
x: 0, 100
y: 0, 4
sliders: a=0.3:-0.2:0.6:0.01; h=0.25:-0.2:0.6:0.01; c=0.05:-0.2:0.3:0.01; n=256:2:32768:2
labels: row loss against the logit scale $s$
caption: One row of the CLIP loss against the logit scale $s$ for a positive with cosine $a$, one hard negative with cosine $h$ and $n - 2$ easy negatives with cosine $c$, in a batch of $n$. With $a > h$ the loss falls towards zero as $s$ grows ([[#prop-scale-grad]]). Raise $h$ above $a$ — a mislabelled pair, or a caption that fits another image better — and the loss has a minimum at a finite scale and grows linearly beyond it. Note how small the cosines are: trained CLIP models give matched pairs cosines of about $0.3$.
:::

## Zero-shot classification and retrieval {#sec-zero-shot}

A shared space turns classification into retrieval. To classify an image among $K$ classes, write each class as a sentence, embed the sentences with the text encoder, and pick the class whose sentence is closest to the image.

::: definition Zero-shot classification {#def-zero-shot}
Given class names $c_1, \dots, c_K$ and a **prompt template** such as "a photo of a {}.", let $\mathbf{w}_k$ be the normalised text embedding of the filled-in template for class $k$. The zero-shot classifier assigns image $x$ with embedding $\mathbf{u}$ to

$$
\hat y = \arg\max_k\ \mathbf{u}^\top\mathbf{w}_k, \qquad p(k\mid x) = \operatorname{softmax}_k\big(s\,\mathbf{u}^\top\mathbf{w}_k\big).
$$ {#eq-zero-shot}

With several templates, $\mathbf{w}_k$ is the normalised mean of the class's template embeddings (**prompt ensembling**).
:::

The text embeddings $\mathbf{w}_1, \dots, \mathbf{w}_K$ are the rows of a linear classifier's weight matrix, produced by the text encoder instead of learned from labelled images. Radford et al. found that the bare class name works worse than a sentence — captions on the web rarely consist of one word, and a word such as "crane" or "boxer" is ambiguous — and that the template "A photo of a {label}." added $1.3$ points of ImageNet accuracy over the bare name, while averaging $80$ templates ("a blurry photo of a {}.", "a drawing of a {}.", …) added $3.5$ more. Their largest model, a ViT-L/14 fine-tuned at $336$ pixels, reached $76.2\%$ zero-shot top-1 accuracy on ImageNet — the accuracy of a ResNet-50 trained on ImageNet's $1.28$ million labelled images, without using any of them. Zero-shot CLIP also lost much less accuracy than ImageNet-trained models on distribution-shifted variants such as sketches and renditions, which suggests that a supervised ImageNet model partly learns the quirks of its dataset.

::: example Zero-shot classification by hand {#ex-zero-shot}
An image has embedding $\mathbf{u} = (0.6, 0.8, 0)$. The prompts for "dog", "cat" and "car" have embeddings $(0.8, 0.6, 0)$, $(0, 0.6, 0.8)$ and $(0.6, 0, 0.8)$. Classify the image and compute the class probabilities with $s = 10$.
::: solution
The cosines are $0.48 + 0.48 = 0.96$, $0.48$ and $0.36$, so the prediction is "dog". The logits are $9.6$, $4.8$, $3.6$, and the softmax gives $1/(1 + e^{-4.8} + e^{-6}) = 0.989$ for "dog", $0.008$ for "cat" and $0.002$ for "car". With the trained scale $s = 100$ the probabilities would be essentially $1$ and $0$: the softmax of a contrastive model is sharp, and is not a calibrated probability without further adjustment.
:::
:::

The same space supports **retrieval** in both directions: text-to-image (find the images closest to a query sentence) and image-to-text (find the caption closest to an image). It is evaluated by **recall@K**, the fraction of queries whose correct item is among the top $K$ results, on datasets such as MS-COCO and Flickr30k with five captions per image. The cosine between an image and a caption is also used as an automatic score of how well a generated image matches its prompt (CLIPScore, Hessel et al., 2021), and to filter web data for training other models.

::: warning Cosines from a contrastive model are not probabilities or absolute scores
A CLIP cosine of $0.3$ between an image and its correct caption is normal, and unrelated pairs may score $0.1$ to $0.2$. Only comparisons within the same query are meaningful: whether caption A beats caption B for this image. Thresholding raw cosines across queries ("keep pairs with similarity above $0.28$"), as dataset filters do, mixes image-dependent and text-dependent offsets, and the softmax probabilities of [[#eq-zero-shot]] are over-confident at the trained scale. Calibrate on labelled data before treating either as a confidence.
:::

::: quiz
A CLIP model is used to classify images among $10$ classes with the template "a photo of a {}." Which change alters only the classifier's weights, not the image embeddings?
- [x] Replacing the template with "a satellite photo of a {}." for a remote-sensing dataset
- [ ] Fine-tuning the image encoder on labelled examples
- [ ] Increasing the input resolution from $224$ to $336$ pixels
- [ ] Cropping the images to their centre
::: solution
In zero-shot classification the class embeddings $\mathbf{w}_k$ form the classifier and depend only on the text side, so changing the prompt changes the classifier and leaves image embeddings untouched. The other options change the image embeddings. Prompt choice is a cheap way to adapt a zero-shot classifier to a domain.
:::
:::

## Scale and data {#sec-data}

CLIP's $400$ million pairs (the private WIT dataset) were collected by searching for images whose text contained one of $500{,}000$ queries built from Wikipedia titles and common word combinations, with up to $20{,}000$ pairs per query to balance the distribution. Training the largest ViT took $12$ days on $256$ V100 GPUs for $32$ epochs. Several later projects scaled or opened up the recipe:

- **ALIGN** (Jia et al., 2021) used $1.8$ billion image–alt-text pairs with only simple frequency-based filtering, an EfficientNet image encoder and a BERT text encoder, and matched or exceeded CLIP: scale compensated for noise.
- **LAION-400M** and **LAION-5B** (Schuhmann et al., 2021, 2022) were open datasets of web pairs filtered by the cosine of an existing CLIP model, used to train the open **OpenCLIP** models; Cherti et al. (2023) used them to fit scaling laws for contrastive training, finding power-law improvements of zero-shot accuracy and retrieval with model size, data and compute (an empirical regularity, like those of [[scaling/scaling-laws]]). In December 2023 an audit found links to child sexual abuse material in LAION-5B; the dataset was withdrawn and re-released in 2024 as Re-LAION-5B after the offending links were removed — an example of the provenance and consent questions discussed in [[llm-society/copyright-provenance]].
- **LiT** (Zhai et al., 2022) froze a pretrained image encoder and trained only the text encoder contrastively ("locked-image tuning"), which is cheap and works well when the image encoder is already strong.
- Data curation became a research topic of its own: DataComp (Gadre et al., 2023) fixed the model and compute and compared filtering strategies, and MetaCLIP (Xu et al., 2024) reproduced CLIP's balancing of queries on public data. Better-filtered data trained better models with fewer pairs.

## The sigmoid loss {#sec-siglip}

The softmax in [[#eq-clip]] normalises over the whole batch: every row needs every column. When a batch of $32{,}768$ pairs is split across many accelerators, each device needs all the text embeddings of the batch to compute its rows' normalisers, and the $B\times B$ matrix itself has $10^9$ entries. Zhai et al. (2023) replaced the softmax by an independent binary classification of every pair.

::: definition Sigmoid contrastive loss (SigLIP) {#def-siglip}
With cosines $S_{ij}$, a learnable scale $t > 0$ and a learnable bias $b$, let $z_{ij} = +1$ if $i = j$ (a matched pair) and $-1$ otherwise. The **SigLIP loss** is

$$
\mathcal{L} = -\frac{1}{B}\sum_{i=1}^{B}\sum_{j=1}^{B}\log\sigma\big(z_{ij}(tS_{ij} + b)\big) = \frac1B\sum_{i,j}\log\big(1 + e^{-z_{ij}(tS_{ij} + b)}\big),
$$ {#eq-siglip}

where $\sigma(a) = 1/(1 + e^{-a})$. Zhai et al. initialised $t = 10$ and $b = -10$.
:::

Each pair contributes a logistic-regression term ([[ml-fundamentals/logistic-regression]]) that does not depend on any other pair, so the loss can be computed block by block: devices exchange text embeddings in a ring, each computing the loss of its own images against one block of texts at a time, without ever holding the full matrix or a global normaliser. The bias matters because the classes are wildly unbalanced: each row contains one positive and $B - 1$ negatives.

::: proposition The best initial bias {#prop-siglip-bias}
Suppose at initialisation all logits $tS_{ij}$ are zero. Then the bias minimising [[#eq-siglip]] is $b^\star = -\log(B - 1)$, at which the model predicts the base rate $\sigma(b^\star) = 1/B$ for every pair.
:::

::: proof
With zero logits, each row contributes $\ell(b) = \log(1 + e^{-b}) + (B - 1)\log(1 + e^{b})$. Then $\ell'(b) = -\sigma(-b) + (B - 1)\sigma(b) = -\frac{1}{1 + e^{b}} + (B - 1)\frac{e^{b}}{1 + e^{b}}$, which vanishes when $(B - 1)e^{b} = 1$, that is $b = -\log(B - 1)$; since $\ell''(b) = B\,\sigma(b)\sigma(-b) > 0$, this is the minimum. There $\sigma(b^\star) = \frac{1/(B-1)}{1 + 1/(B-1)} = \frac1B$, the fraction of pairs that are positive.
:::

For $B = 32{,}768$, $b^\star = -10.40$, close to the $-10$ of the paper. Starting at $b = 0$ instead would cost about $(B - 1)\log 2$ per row at the first step — the model would begin by spending its gradient learning that most pairs are negatives.

::: example The effect of the bias {#ex-siglip-bias}
For $B = 32{,}768$ and zero initial logits, compute the per-row loss $\ell(b)$ at $b = 0$, at $b = -10$ and at $b^\star$.
::: solution
$\ell(0) = 32{,}768\log2 = 22{,}713$. $\ell(-10) = \log(1 + e^{10}) + 32{,}767\log(1 + e^{-10}) = 10.0000 + 32{,}767\cdot4.54\times10^{-5} = 11.488$. $\ell(b^\star) = 11.397$. The paper's initialisation is within $1\%$ of the best constant predictor; the zero bias is three orders of magnitude worse.
:::
:::

::: widget plot
f: log(1 + exp(-x)) + (n-1)*log(1 + exp(x))
x: -15, 5
y: 0, 40
sliders: n=1024:2:32768:1
vlines: -10
labels: per-row SigLIP loss at zero logits
caption: The SigLIP loss of one row at initialisation (all logits zero) against the bias $b$, for batch size $n$. The minimum is at $b = -\log(n - 1)$ ([[#prop-siglip-bias]]); the vertical line marks the paper's $b = -10$. To the right of zero the loss grows like $(n - 1)\,b$.
:::

Zhai et al. found that the sigmoid loss matches or beats the softmax loss, with the clearest advantage at batch sizes below about $16{,}000$, and that for both losses gains saturate around a batch of $32{,}000$; with a frozen image encoder (SigLiT) they reached $84.5\%$ ImageNet zero-shot accuracy in two days on four TPU-v4 chips. SigLIP image encoders became common vision towers of open vision–language models. SigLIP 2 (Tschannen et al., 2025) added a captioning decoder, self-distillation and masked prediction to the sigmoid loss, trained on multilingual data, and offered a variant that accepts native aspect ratios.

## The geometry of the shared space {#sec-geometry}

A shared space does not mean that images and captions are mixed together in it. Liang et al. (2022) observed a **modality gap**: in CLIP and other contrastive models, image embeddings and text embeddings occupy two separate regions (narrow cones) of the sphere, and the difference between the image centroid and the text centroid is large compared with the spread within each modality. The gap is present at initialisation — random deep networks already map all inputs into a narrow cone, a different one for each encoder — and contrastive training with a low temperature does not remove it, because the loss depends only on *relative* similarities within a row or column.

::: proposition What the loss cannot see {#prop-gap}
Consider unnormalised embeddings with logits $s\,\mathbf{u}_i^\top\mathbf{v}_j$. Adding a constant vector $\mathbf{g}$ to every image embedding leaves the text-to-image (column) terms of [[#eq-clip]] unchanged, and adding $\mathbf{g}$ to every text embedding leaves the image-to-text (row) terms unchanged.
:::

::: proof
For column $j$ the logits are $s(\mathbf{u}_i + \mathbf{g})^\top\mathbf{v}_j = s\mathbf{u}_i^\top\mathbf{v}_j + s\mathbf{g}^\top\mathbf{v}_j$ for $i = 1, \dots, B$; the added term does not depend on $i$, and a softmax is unchanged when a constant is added to all its inputs. The row case is symmetric.
:::

With normalisation the statement holds only approximately, but the moral is the same: a shift of one modality as a whole is nearly invisible to the loss, so nothing forces the two clouds together. Liang et al. showed that shifting the embeddings to shrink the gap changes zero-shot accuracy and fairness measures in either direction, depending on the task. The gap matters in practice when embeddings of the two modalities are mixed — for example, when a text embedding is used in place of an image embedding to condition a generator, a substitution that DALL·E 2 handled with a learned "prior" mapping text embeddings to image embeddings (Ramesh et al., 2022).

### What contrastive models miss {#sec-limits}

A single dot product between independently computed vectors limits what the model can express. Benchmarks designed to probe composition show the consequences:

- **Word order and relations.** Winoground (Thrush et al., 2022) pairs two images with two captions that use the same words in a different order ("some plants surrounding a lightbulb" against "a lightbulb surrounding some plants"); CLIP-style models scored near or below chance. Yuksekgonul et al. (2023) showed that contrastive models often behave like **bags of words**, and argued that the objective rarely requires more: in a random batch, the correct caption can usually be found from the nouns alone.
- **Counting, negation and spatial relations** are weak for the same reason.
- **Typographic attacks.** Goh et al. (2021) found that CLIP reads text in images strongly: an apple with a handwritten label "iPod" was classified as an iPod. The model learnt from web data in which written words and depicted objects co-occur.
- **Social biases.** Radford et al. reported that, when a set of labels included crime-related and non-human categories, images of people were misclassified into them at rates that differed by race and age, and that the label set chosen strongly changed these rates. Zero-shot classifiers inherit the associations of web text ([[llm-society/bias-fairness]]).

Remedies include hard negatives with swapped words during training, captioning objectives alongside the contrastive one, and — most importantly — the vision–language models of the next chapter, in which a language model attends to every patch embedding instead of comparing a single pooled vector.

::: example Prompt ensembling by hand {#ex-ensemble}
Two templates for the class "dog" give embeddings $(0.6, 0.8, 0)$ and $(0.8, 0.6, 0)$. Compute the ensembled class embedding, and the cosine of an image $\mathbf{u} = (0, 1, 0)$ with each template and with the ensemble.
::: solution
The mean is $(0.7, 0.7, 0)$, of norm $0.990$; normalised, $(0.707, 0.707, 0)$. The image's cosines are $0.8$ and $0.6$ with the two templates and $0.707$ with the ensemble. Averaging smooths out the quirks of individual phrasings: the ensemble's cosine lies between the template cosines, and for a class with many templates it approximates the direction the class name shares across phrasings.
:::
:::

::: history
Learning visual representations from accompanying text goes back at least to Mori et al. (1999), who predicted caption words from image regions, and to DeViSE (Frome et al., 2013), which mapped images into a pretrained word-embedding space for zero-shot recognition. Contrastive losses came from metric learning and self-supervised vision (Oord et al., 2018, named InfoNCE; SimCLR, Chen et al., 2020); ConVIRT (Zhang et al., 2020) applied a symmetric image–text contrastive loss to chest X-rays and their reports. CLIP (Radford et al., 2021) scaled the idea to $400$ million web pairs and popularised zero-shot classification, and ALIGN (Jia et al., 2021) scaled it to $1.8$ billion noisy pairs. LAION and OpenCLIP (2021–2023) made the recipe reproducible, LiT (2022) showed the value of a locked image encoder, SigLIP (Zhai et al., 2023) replaced the softmax with a sigmoid, and SigLIP 2 (2025) combined several objectives. As of 2026, CLIP- and SigLIP-style encoders remain the most common vision towers of open vision–language models.
:::

::: summary
- A dual encoder maps images and texts independently to unit vectors in one space; similarity is the cosine.
- CLIP's loss is a symmetric InfoNCE over the $B\times B$ cosine matrix, image-to-text over rows and text-to-image over columns, with a learnable logit scale $s = 1/\tau$ (initialised at $1/0.07$, clipped at $100$).
- The gradient in $s$ compares the expected similarity under the model's softmax with the correct pair's; on separable batches it would increase $s$ without bound.
- Zero-shot classification embeds a prompt per class and picks the nearest; prompts and ensembles matter. CLIP ViT-L/14@336 reached $76.2\%$ zero-shot on ImageNet.
- SigLIP replaces the batch softmax with independent sigmoid terms per pair; the bias should start near $-\log(B - 1)$, the log-odds of the base rate.
- Image and text embeddings sit in separate cones (the modality gap), which the loss barely sees; pooled dot products struggle with word order, counting and relations, and models read text in images.
:::

## Exercises

::: exercise The initial logit scale {level=1 check="14.29"}
CLIP initialises the temperature at $\tau = 0.07$. What is the initial logit scale $s$, to two decimal places?
::: solution
$s = 1/0.07 = 14.29$.
:::
:::

::: exercise The chance-level loss {level=1 check="10.397"}
At initialisation, when all cosines are equal, what is the CLIP loss for a batch of $32{,}768$ pairs? Give three decimal places.
::: solution
Each row and column softmax is uniform, so each term is $\log B = \ln32{,}768 = 15\ln2 = 10.397$, and so is their average.
:::
:::

::: exercise The size of the similarity matrix {level=1 check="4.295"}
How many gigabytes ($10^9$ bytes) does the full $32{,}768\times32{,}768$ similarity matrix occupy in 32-bit floats? Give three decimal places.
::: solution
$32{,}768^2 = 1{,}073{,}741{,}824$ entries, times $4$ bytes, is $4.295\times10^9$ bytes, $4.295$ GB — for one copy, before the softmax and its gradient. In practice each device computes only its own block of rows, but the softmax loss still needs every column's embedding on every device.
:::
:::

::: exercise The best initial bias {level=1 check="-6.930"}
What bias minimises the SigLIP loss at initialisation for a batch of $1024$ pairs? Give three decimal places.
::: solution
By [[#prop-siglip-bias]], $b^\star = -\ln1023 = -6.930$.
:::
:::

::: exercise Recall at one {level=2 check="2/3"}
Three images and their three captions have cosine matrix (rows images, columns captions)
$$
S = \begin{pmatrix}0.30 & 0.10 & 0.20\\ 0.25 & 0.20 & 0.10\\ 0.00 & 0.10 & 0.35\end{pmatrix}.
$$
Compute image-to-text recall@1 (the answer to enter) and text-to-image recall@1.
::: solution
Image-to-text: row $1$'s maximum is in column $1$ (correct); row $2$'s maximum $0.25$ is in column $1$ (wrong, the correct caption scores $0.20$); row $3$'s maximum is in column $3$ (correct). Recall@1 is $2/3$. Text-to-image: column $1$'s maximum $0.30$ is in row $1$, column $2$'s maximum $0.20$ in row $2$, column $3$'s maximum $0.35$ in row $3$ — all correct, recall@1 $= 1$. The two directions can differ because the row and column maxima are different sets of entries.
:::
:::

::: exercise A SigLIP loss by hand {level=2 check="1.037"}
For $B = 2$ with cosines $S = \begin{pmatrix}0.5 & 0.1\\0.2 & 0.4\end{pmatrix}$, $t = 10$ and $b = -5$, compute the SigLIP loss [[#eq-siglip]] to three decimal places.
::: solution
The logits $tS_{ij} + b$ are $0$, $-4$, $-3$ and $-1$. Positives (diagonal, $z = 1$) contribute $\log(1 + e^{0}) = 0.6931$ and $\log(1 + e^{1}) = 1.3133$; negatives ($z = -1$) contribute $\log(1 + e^{-4}) = 0.0181$ and $\log(1 + e^{-3}) = 0.0486$. The sum is $2.0731$, and dividing by $B = 2$ gives $1.037$. The positive pair with cosine $0.4$ costs most: at this bias, a cosine of $0.5$ is needed just to reach probability $\tfrac12$.
:::
:::

::: exercise Gradient through the log-scale {level=2}
CLIP learns $\vartheta = \log s$ rather than $s$. (a) Express $\partial\mathcal{L}/\partial\vartheta$ using [[#eq-scale-grad]]. (b) Give two reasons for this parameterisation. (c) In the listing, the numerical $\partial\mathcal{L}/\partial s$ at $s = 14.29$ is $-0.00404$; what is $\partial\mathcal{L}/\partial\vartheta$ there, and in which direction will gradient descent move the temperature?
::: solution
(a) $\partial\mathcal{L}/\partial\vartheta = s\,\partial\mathcal{L}/\partial s$. (b) The parameterisation keeps $s$ positive without constraints, and makes the step multiplicative: a step in $\vartheta$ changes $s$ by a fixed fraction, which suits a quantity whose sensible values range over orders of magnitude (from about $1$ to $100$). (c) $14.29\cdot(-0.00404) = -0.0577$. The derivative is negative, so gradient descent increases $\vartheta$, hence $s$: the temperature decreases slightly. The magnitude is small, as expected near the minimum seen in [[#ex-clip-temp]].
:::
:::

::: exercise Recovering a linear classifier {level=2}
Show that zero-shot classification [[#eq-zero-shot]] is a linear classifier on the image embedding, and explain how a few labelled examples per class could be used to improve it without training the encoders. What risk does this "linear probe" carry with one or two examples per class?
::: solution
The scores $s\,\mathbf{u}^\top\mathbf{w}_k$ are the entries of $s\,W\mathbf{u}$ with $W$ the $K\times d$ matrix whose rows are the class embeddings, so the classifier is linear in $\mathbf{u}$ with no bias. With labelled images one can train a logistic-regression classifier $W'\mathbf{u} + \mathbf{c}$ on the frozen image embeddings, possibly initialised at $W' = sW$ and regularised towards it. With very few examples a probe trained from scratch overfits and can be worse than zero-shot — Radford et al. found that zero-shot CLIP matched a linear probe trained with about four examples per class on average — so initialising at, or penalising distance from, the text-derived weights is the safer choice.
:::
:::

::: exercise The modality gap does not hurt retrieval within one direction {level=3}
(a) Using [[#prop-gap]], show that for unnormalised embeddings the ranking of images for a fixed text query does not change when all image embeddings are shifted by $\mathbf{g}$. (b) Show that the ranking of captions for a fixed image *can* change when the image embeddings are shifted, and give a two-dimensional example. (c) What does this suggest about comparing scores across different queries?
::: solution
(a) For query $j$, the scores become $\mathbf{u}_i^\top\mathbf{v}_j + \mathbf{g}^\top\mathbf{v}_j$; the added term is the same for all $i$, so the order of the images is unchanged.

(b) For image $i$, caption $j$ scores $\mathbf{u}_i^\top\mathbf{v}_j + \mathbf{g}^\top\mathbf{v}_j$, and the shift $\mathbf{g}^\top\mathbf{v}_j$ depends on $j$. Example: $\mathbf{u} = (1, 0)$, captions $\mathbf{v}_1 = (1, 0)$ and $\mathbf{v}_2 = (0, 2)$: the scores are $1$ and $0$. With $\mathbf{g} = (0, 1)$ the shifted image $(1, 1)$ scores $1$ and $2$, and the order flips.

(c) A shift of one modality adds a query-independent constant within each text query but a caption-dependent offset across captions; scores are therefore comparable only within one query and one direction, which is the warning of [[#sec-zero-shot]] seen from the geometry.
:::
:::

::: exercise SigLIP gradient {level=3}
Derive $\partial\mathcal{L}/\partial S_{ij}$ for [[#eq-siglip]] and compare with the InfoNCE gradient of [[prompting-rag/text-embeddings#prop-infonce-grad]]. Which negatives receive most gradient in each loss, and how does the sigmoid's gradient on a negative depend on the other negatives in the row?
::: solution
With $a_{ij} = tS_{ij} + b$, the term is $\log(1 + e^{-z_{ij}a_{ij}})$, whose derivative in $a_{ij}$ is $-z_{ij}\sigma(-z_{ij}a_{ij})$. Hence $\partial\mathcal{L}/\partial S_{ij} = -\frac{t}{B}z_{ij}\,\sigma(-z_{ij}a_{ij})$: for a positive, $-\frac tB\big(1 - \sigma(a_{ii})\big)$; for a negative, $+\frac tB\,\sigma(a_{ij})$, the model's current probability that the pair matches. In InfoNCE the gradient on a negative is $p_j/\tau$, its share of the row softmax, so it shrinks when other negatives score high — negatives compete for one unit of probability. In the sigmoid loss each negative's gradient depends only on its own logit, not on the rest of the row. In both losses the high-scoring (hard) negatives receive most gradient, but the sigmoid version keeps pushing on every confident mistake independently, and its total gradient on a row is not capped at $1/\tau$.
:::
:::
