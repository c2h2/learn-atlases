A language model reads a sequence of token vectors. An image is a grid of pixels: a $224\times224$ colour photograph is $150{,}528$ numbers arranged in three channels. For a decade the standard way to process such grids was the convolutional network ([[neural-networks/convolutional-networks]]), whose small shared filters build in the assumption that nearby pixels matter together and that a pattern means the same thing wherever it appears. In 2020 Dosovitskiy and colleagues showed that this assumption can be dropped. Cut the image into square patches, flatten each patch into a vector, project it linearly, add a position embedding, and feed the resulting sequence to an ordinary Transformer encoder ([[transformers/transformer-block]]). With enough training data, this **vision Transformer** (ViT) matches or beats the best convolutional networks.

The ViT matters for this course because it makes images look like text to a Transformer. Every multimodal model in the following chapters — CLIP's image encoder, the vision towers of vision–language models, the backbones of diffusion models — starts from the idea in this chapter: an image becomes a sequence of vectors. This chapter works through the patch embedding and its arithmetic, the position embeddings and how they are stretched to new resolutions, the cost of attention as images grow, the trade-off between built-in assumptions and data, and the three training recipes that made ViTs practical: supervised pretraining at scale, data-efficient training with distillation (DeiT), and self-supervised pretraining by masked reconstruction (MAE) and self-distillation (DINO).

## Images as sequences of patches {#sec-patches}

Self-attention over individual pixels is out of the question: a $224\times224$ image has $50{,}176$ pixels, and an attention matrix over them would have $2.5\times10^9$ entries per head and layer. The ViT reduces the sequence length by grouping pixels into non-overlapping $P\times P$ patches.

::: definition Patch embedding {#def-patch-embedding}
Let an image $\mathbf{x}\in\R^{H\times W\times C}$ have height $H$ and width $W$ divisible by the **patch size** $P$. Split it into $N = HW/P^2$ non-overlapping patches and flatten each into a vector $\mathbf{x}_p^{(i)}\in\R^{P^2C}$, in raster order (left to right, top to bottom). The **patch embedding** is the linear map

$$
\mathbf{z}^{(i)} = E\,\mathbf{x}_p^{(i)} + \mathbf{b}, \qquad E\in\R^{d\times P^2C},\ \mathbf{b}\in\R^{d},\qquad i = 1, \dots, N,
$$ {#eq-patch}

applied with the same $E$ and $\mathbf{b}$ to every patch. The $N$ vectors $\mathbf{z}^{(i)}\in\R^{d}$ are the **patch tokens**.
:::

The name "token" is borrowed from text, but the analogy is loose: a patch token is a continuous vector computed from pixels, not an index into a vocabulary. Discrete image tokens exist too — they are produced by learned quantisers and are the subject of [[multimodal/image-generation]] — but the ViT does not use them.

::: proposition A patch embedding is a strided convolution {#prop-patch-conv}
The map [[#eq-patch]] equals a convolution with $C$ input channels, $d$ output channels, kernel size $P$ and stride $P$, whose output feature map of shape $(d, H/P, W/P)$ is read out in raster order.
:::

::: proof
A convolution with kernel $K\in\R^{d\times C\times P\times P}$ and stride $P$ computes, at output position $(r, c)$, $\sum_{k, u, v}K_{j,k,u,v}\,x_{rP + u,\,cP + v,\,k} + b_j$ for each output channel $j$ ([[neural-networks/convolutional-networks#def-conv]]). With stride equal to kernel size, output position $(r, c)$ sees exactly the pixels of patch $i = rW/P + c + 1$, and no pixel is seen by two positions. Flattening the kernel's $(k, u, v)$ indices in the same order as the patch's pixels turns $K_{j,\cdot}$ into the $j$-th row of $E$, so the sum is $(E\mathbf{x}_p^{(i)})_j + b_j$.
:::

This is why implementations write the patch embedding as `Conv2d(C, d, kernel_size=P, stride=P)`: it is the same linear map, computed efficiently.

::: example Patch arithmetic for ViT-Base {#ex-patch-count}
ViT-B/16 uses $P = 16$ and $d = 768$ on $224\times224$ RGB images. Find the number of patch tokens, the length of a flattened patch, the parameter count of the patch embedding, and the shape of the token sequence for a batch of $B = 32$ images.
::: solution
There are $224/16 = 14$ patches per side, so $N = 14^2 = 196$. Each patch holds $16\cdot16\cdot3 = 768$ numbers — the same as $d$, a coincidence of this configuration. The projection has $768\cdot768 + 768 = 590{,}592$ parameters (as computed for the equivalent convolution in [[neural-networks/convolutional-networks#ex-vit]]). With the classification token introduced below the sequence has $197$ tokens, and a batch has shape $(B, T, d) = (32, 197, 768)$.
:::
:::

### The classification token and position embeddings {#sec-cls-pos}

Two more ingredients turn the patch tokens into the encoder's input. Following BERT ([[transformers/architecture-families#def-encoder]]), ViT prepends a learned vector $\mathbf{z}_{\text{cls}}\in\R^{d}$, the **classification token**, whose output after the last layer serves as the image representation. And because self-attention by itself ignores order, ViT adds a learned **position embedding** to every token:

$$
Z_0 = \big[\mathbf{z}_{\text{cls}};\ \mathbf{z}^{(1)};\ \dots;\ \mathbf{z}^{(N)}\big] + E_{\text{pos}}, \qquad E_{\text{pos}}\in\R^{(N+1)\times d}.
$$ {#eq-vit-input}

The sequence $Z_0$ passes through $L$ pre-norm Transformer blocks ([[transformers/transformer-block#def-block]]) with GELU feed-forward layers, a final LayerNorm, and a classification head on the CLS output. Everything after [[#eq-vit-input]] is the Transformer encoder of the earlier course, unchanged.

Why are position embeddings needed? The following fact, which holds for any stack of attention and position-wise layers, makes the point precise.

::: proposition Without positions, a Transformer cannot see the layout {#prop-perm}
Let $F\colon\R^{T\times d}\to\R^{T\times d}$ be a stack of Transformer encoder blocks (self-attention without masks, position-wise feed-forward layers, LayerNorm and residual connections). For every permutation matrix $\Pi\in\R^{T\times T}$, $F(\Pi Z) = \Pi F(Z)$. Consequently, if the patches of an image are shuffled and no position embedding is added, the multiset of output vectors is unchanged, and the CLS output — if the CLS token is not moved — is exactly the same.
:::

::: proof
It suffices to check each component. A position-wise map $g$ applied row by row satisfies $g(\Pi Z) = \Pi g(Z)$, which covers feed-forward layers, LayerNorm and the residual sum. For self-attention, $Q = ZW_Q$, so $\Pi Z$ gives $\Pi Q$, $\Pi K$, $\Pi V$. The score matrix becomes $\Pi QK^\top\Pi^\top$. A row-wise softmax commutes with permuting rows, and permuting columns of its input permutes the columns of its output, so $\operatorname{softmax}(\Pi S\Pi^\top) = \Pi\operatorname{softmax}(S)\Pi^\top$. Multiplying by $\Pi V$ gives $\Pi\operatorname{softmax}(S)\Pi^\top\Pi V = \Pi\operatorname{softmax}(S)V$, since $\Pi^\top\Pi = I$. Multi-head attention concatenates and projects position-wise, so it is equivariant too, and a composition of equivariant maps is equivariant. A permutation fixing the CLS position leaves that row of the output unchanged.
:::

Without position embeddings, a ViT would see an image as a bag of patches. ViT's learned 1-D embeddings, one per raster position, let the model discover the 2-D layout from data, and Dosovitskiy et al. found that hand-designed 2-D or relative encodings gave no significant gain. Visualised after training, each position's embedding is most similar to those of patches in the same row and column — the grid structure is learned, not given. Other choices are possible: sinusoidal or rotary encodings applied separately to the row and column coordinates ([[transformers/positional-encoding]]) are common in later models, especially those that accept images of varying size.

### Changing the resolution {#sec-resolution}

A model trained at $224\times224$ with $P = 16$ has $14\times14$ learned position embeddings. Fine-tuning at a higher resolution, which typically improves accuracy, keeps $P$ fixed and increases $N$: a $384\times384$ image has a $24\times24$ grid. Dosovitskiy et al. **interpolated** the pretrained embeddings in two dimensions, treating them as a $14\times14$ image with $d$ channels and resizing it to $24\times24$. This is the only point at which a ViT is told that its input is two-dimensional.

::: example Interpolating position embeddings {#ex-interp}
Position embeddings on a $14\times14$ grid are resized to $24\times24$ by bilinear interpolation, mapping the corner positions onto each other, so that new index $i\in\{0, \dots, 23\}$ corresponds to old coordinate $i\cdot13/23$. Which old embeddings contribute to the new embedding at grid position $(0, 1)$, with what weights? How many position embeddings does the fine-tuned model have?
::: solution
Along the row, coordinate $0$ maps to $0$. Along the column, $1\cdot13/23 = 0.565$ lies between old columns $0$ and $1$, so the new embedding is $0.435\,\mathbf{e}_{0,0} + 0.565\,\mathbf{e}_{0,1}$ — a weighted average of two neighbours, with weights $1 - 0.565$ and $0.565$. The CLS embedding is copied unchanged. The fine-tuned model has $24^2 + 1 = 577$ position embeddings, all of them trainable from their interpolated starting values.
:::
:::

### Counting parameters {#sec-params}

The ViT paper defined three sizes that are still used as reference points: ViT-Base ($L = 12$ layers, $d = 768$, $12$ heads, feed-forward width $3072$), ViT-Large ($24$, $1024$, $16$, $4096$) and ViT-Huge ($32$, $1280$, $16$, $5120$). A name such as ViT-L/16 gives the size and the patch size. The listing counts their parameters from the definitions, including a $1000$-class head.

```python
import math, random
random.seed(0)

def vit_params(L, d, mlp, P=16, C=3, img=224, classes=1000):
    N = (img // P) ** 2                       # patch tokens
    embed = P * P * C * d + d                 # patch projection (weights + bias)
    tokens = d + (N + 1) * d                  # CLS token + position embeddings
    attn = 4 * (d * d + d)                    # W_Q, W_K, W_V, W_O with biases
    ffn = d * mlp + mlp + mlp * d + d         # two linear layers
    norms = 2 * 2 * d                         # two LayerNorms (gain, bias)
    block = attn + ffn + norms
    head = 2 * d + d * classes + classes      # final LayerNorm + classifier
    return N, embed + tokens + L * block + head

for name, L, d, mlp, P in [("ViT-B/16", 12, 768, 3072, 16),
                           ("ViT-L/16", 24, 1024, 4096, 16),
                           ("ViT-H/14", 32, 1280, 5120, 14)]:
    N, n = vit_params(L, d, mlp, P)
    print(f"{name}: {N} patches + CLS = {N+1} tokens, {n/1e6:.1f}M parameters")

# patchify a toy 8x8 single-channel image into 4x4 patches, then MAE-style masking
img = [[(r * 8 + c) % 10 for c in range(8)] for r in range(8)]
P = 4
patches = [[img[r0 + i][c0 + j] for i in range(P) for j in range(P)]
           for r0 in range(0, 8, P) for c0 in range(0, 8, P)]       # 4 patches x 16 values
print("patch 1 (top right):", patches[1])
T = 196; keep = int(T * (1 - 0.75))
perm = list(range(T)); random.shuffle(perm)
visible = sorted(perm[:keep])
print("MAE keeps", keep, "of", T, "patches; first visible ids:", visible[:8])
```

```text
ViT-B/16: 196 patches + CLS = 197 tokens, 86.6M parameters
ViT-L/16: 196 patches + CLS = 197 tokens, 304.3M parameters
ViT-H/14: 256 patches + CLS = 257 tokens, 632.0M parameters
patch 1 (top right): [4, 5, 6, 7, 2, 3, 4, 5, 0, 1, 2, 3, 8, 9, 0, 1]
MAE keeps 49 of 196 patches; first visible ids: [5, 6, 13, 17, 22, 26, 29, 32]
```

The paper reports $86$M, $307$M and $632$M; the small difference for ViT-L comes from the head used in its table, which is not specified to the parameter. Almost all parameters sit in the blocks, about $12d^2$ per block ([[transformers/transformer-block#prop-block-params]]); the patch embedding and position embeddings are under $1\%$ of the total. The last lines of the listing are used in [[#sec-mae]].

## The cost of attention on images {#sec-cost}

The sequence length of a ViT is set by the resolution and the patch size, $T = HW/P^2 + 1$. Doubling the resolution, or halving the patch size, multiplies $T$ by four. That matters because the two parts of a Transformer layer scale differently with $T$.

::: proposition Attention against linear cost in a ViT layer {#prop-vit-cost}
For a Transformer block with model width $d$, feed-forward width $4d$ and sequence length $T$, the matrix multiplications cost about $24Td^2$ FLOPs in the linear layers (projections and feed-forward) and $4T^2d$ FLOPs in attention (scores $QK^\top$ and the weighted sum with $V$), so

$$
\frac{\text{attention FLOPs}}{\text{linear FLOPs}} = \frac{T}{6d}.
$$ {#eq-vit-ratio}

With $T = HW/P^2$ (ignoring the CLS token), the attention share grows with the fourth power of the image side at fixed $P$.
:::

::: proof
Counting a multiply–add as $2$ FLOPs: the four $d\times d$ projections cost $4\cdot2Td^2 = 8Td^2$, and the two feed-forward matrices of size $d\times4d$ cost $2\cdot2T\cdot4d^2 = 16Td^2$, a total of $24Td^2$. Computing $QK^\top$ is a $(T\times d)(d\times T)$ product, $2T^2d$ FLOPs, and multiplying the $T\times T$ weights by $V$ costs the same, $4T^2d$ in all; splitting into heads does not change the total. The ratio is $4T^2d/(24Td^2) = T/(6d)$. Since $T\propto (H/P)^2$ for a square image of side $H$, the attention cost $4T^2d$ grows as $H^4$ while the linear cost grows as $H^2$.
:::

::: example From thumbnails to documents {#ex-cost}
Compare the attention share of ViT-B/16 ($d = 768$) at $224\times224$ and at $1024\times1024$ pixels — the latter a typical resolution for reading a page of a document.
::: solution
At $224$: $T = 197$ and $T/(6d) = 197/4608 = 0.043$, so attention is about $4\%$ of the matrix FLOPs; the ViT is dominated by its linear layers like a short-context language model. At $1024$: $T = 64^2 + 1 = 4097$ and $T/(6d) = 0.89$, so attention costs almost as much as everything else, and the whole layer costs about $40$ times as much as at $224$ (linear cost $\times20.8$, attention cost $\times430$). This is why high-resolution vision models use larger patches, merge neighbouring tokens, restrict attention to windows, or split the image into tiles ([[multimodal/vision-language-models]]).
:::
:::

::: widget plot
f: (x/p)^2/(6*d)
x: 64, 1024
y: 0, 2
sliders: p=16:8:32:2; d=768:384:1280:128
hlines: 1
labels: attention FLOPs / linear FLOPs
caption: The ratio $T/(6d)$ of [[#prop-vit-cost]] against the image side $x$ in pixels, for patch size $p$ and width $d$. At the horizontal line attention costs as much as all linear layers together. With $p = 16$ and $d = 768$ that happens just above $1000$ pixels; larger patches push it far out, at the price of a coarser view of the image.
:::

Hierarchical designs attack the quadratic term directly. The **Swin Transformer** (Liu et al., 2021) computes attention within local windows of $7\times7$ patches, shifts the window grid between layers so that information crosses window boundaries, and merges neighbouring patches between stages, giving feature maps at several scales as a convolutional network does; its cost is linear in the number of pixels. Plain ViTs, by contrast, keep one scale and global attention, which makes them simpler to scale and to connect to language models.

## Inductive bias and data {#sec-bias}

A convolutional layer has two built-in assumptions: **locality** (each output depends on a small neighbourhood) and **translation equivariance** (shifting the input shifts the output; [[neural-networks/convolutional-networks#prop-equivariance]]). These assumptions are an **inductive bias** — a preference for some functions over others that is fixed before any data is seen. A ViT has far less of it. Only the patch embedding is local, and it is equivariant only to shifts by whole multiples of $P$; the attention layers can relate any patch to any other from the first layer on, and the 2-D layout must be learned through the position embeddings.

Less bias means more must be learned from data. Dosovitskiy et al. showed this clearly by pretraining on datasets of increasing size and fine-tuning on ImageNet:

- pretrained on **ImageNet-1k** (about $1.3$ million images), ViT-L/16 did worse than ViT-B/16 and worse than comparable ResNets — the larger model overfitted despite regularisation;
- on **ImageNet-21k** (about $14$ million images) the two families were roughly level;
- on Google's internal **JFT-300M** (about $300$ million images), ViTs overtook ResNets, and ViT-H/14 reached $88.55\%$ top-1 accuracy on ImageNet after fine-tuning, while needing less pretraining compute than the convolutional baseline they compared against.

This is an **empirical finding**, not a theorem: the crossover point depends on the architectures, regularisation and training recipe compared. Later work showed that strong augmentation and regularisation narrow the gap at small scale, and that convolutional networks trained with modern recipes (ConvNeXt; Liu et al., 2022) remain competitive. The lasting lesson is the one familiar from language modelling ([[scaling/scaling-laws]]): with enough data and compute, a general architecture with weak assumptions scales well, and its assumptions can be learned. For multimodal systems the ViT's other virtue matters at least as much: its output is a sequence of vectors that a language model can attend to.

::: warning A ViT is not "convolution-free" in any deep sense, nor bias-free
Two opposite mistakes are common. One is to think that a ViT has no inductive bias at all: the patch grid, the shared patch projection and the learned positions all constrain it, and a ViT with $P = 16$ cannot represent detail finer than its patch embedding preserves. The other is to treat the patch embedding as a feature extractor like a CNN stem: it is a single linear map, as [[#prop-patch-conv]] shows, and everything that a CNN's early layers do must be done by the attention and feed-forward layers. Hybrid models that feed a CNN's feature map to a Transformer, tested in the ViT paper, sit between the two.
:::

## Training ViTs without a giant labelled dataset {#sec-training}

Labelled datasets of hundreds of millions of images are rare and mostly private. Three lines of work made ViTs trainable without them: better supervised recipes, self-supervised pretraining, and (in the next chapter) supervision from captions.

### DeiT: data-efficient training and distillation {#sec-deit}

Touvron et al. (2021) trained ViTs on ImageNet-1k alone, on a single machine with eight GPUs in about three days, and matched convolutional networks of similar cost. The recipe was mostly heavy augmentation and regularisation — RandAugment, Mixup, CutMix, random erasing, stochastic depth, repeated augmentation — and $300$ epochs of training: DeiT-B, the ViT-B architecture, reached $81.8\%$ top-1 on ImageNet.

They added a **distillation token**: a second learned token, like CLS, whose output is trained to predict the label given by a convolutional teacher rather than the true label.

::: definition Hard-label distillation through a token (DeiT) {#def-deit}
Let $\mathbf{p}_{\text{cls}}$ and $\mathbf{p}_{\text{dist}}$ be the softmax outputs of the student's classification and distillation tokens, $y$ the true label and $y_t = \arg\max_k \mathbf{p}_{\text{teacher}}(k)$ the teacher's prediction. The DeiT hard-distillation loss is

$$
\mathcal{L} = \tfrac12\,\big(-\log p_{\text{cls}}(y)\big) + \tfrac12\,\big(-\log p_{\text{dist}}(y_t)\big).
$$ {#eq-deit}

At test time the two heads' softmax outputs are added.
:::

With a RegNet teacher, the distilled DeiT-B reached about $83.4\%$, a gain of more than one and a half points. The teacher's labels carry some of the convolutional inductive bias into the student, and they correct augmented images whose true label no longer matches what is visible after an aggressive crop. Distillation in general is treated in [[post-training/distillation]].

::: example A DeiT loss by hand {#ex-deit}
For one training image with true label $y = 0$, the teacher predicts class $1$. The student's class token gives probabilities $(0.6, 0.3, 0.1)$ and its distillation token $(0.2, 0.7, 0.1)$. Compute [[#eq-deit]] and the test-time prediction.
::: solution
$\mathcal{L} = \tfrac12(-\ln0.6) + \tfrac12(-\ln0.7) = \tfrac12(0.511 + 0.357) = 0.434$. At test time the outputs are summed, $(0.8, 1.0, 0.2)$, and the model predicts class $1$ — here siding with the teacher. During training the two tokens are pulled towards different targets whenever teacher and label disagree.
:::
:::

### Masked autoencoders {#sec-mae}

BERT learns from text by predicting masked tokens ([[transformers/architecture-families#def-mlm]]). The same idea for images had been tried many times, but masking $15\%$ of an image is too easy: a missing patch can be filled in by interpolating its neighbours, because images are far more redundant than text. He et al. (2022) found that masking most of the image makes the task hard enough to teach semantics.

::: definition Masked autoencoder (MAE) {#def-mae}
Given the $N$ patches of an image, sample a random subset of $(1 - m)N$ **visible** patches, with **mask ratio** $m$ (default $0.75$). The **encoder**, a ViT, embeds and processes only the visible patches (with their position embeddings). A lightweight **decoder** Transformer receives the encoded visible tokens together with a shared learned **mask token** at each masked position, adds position embeddings, and predicts the pixels of every patch. The loss is the mean squared error between predicted and true pixels, computed **on the masked patches only**; the targets are each patch's pixels normalised by that patch's mean and standard deviation. After pretraining the decoder is discarded and the encoder is fine-tuned or used as a feature extractor.
:::

Two design choices make MAE efficient. The encoder never sees mask tokens, so it runs on a quarter of the sequence; and the decoder is small (by default $8$ blocks of width $512$), so its cost on the full sequence is modest. The listing above drew a random $25\%$ of $196$ patches — the $49$ visible patches an MAE encoder would process. He et al. reported training speed-ups of three times or more over encoding the full sequence, and a ViT-H pretrained and fine-tuned on ImageNet-1k alone reached $87.8\%$ top-1, then the best result using only that dataset.

::: example What masking saves {#ex-mae-cost}
For ViT-B/16 at $224\times224$ ($T = 196$ patch tokens, $d = 768$), compute the encoder's FLOPs per layer with mask ratio $0.75$, as a fraction of the FLOPs on all $196$ patches, using [[#prop-vit-cost]].
::: solution
With all patches the cost is $24Td^2 + 4T^2d$. With $T' = 49$ visible patches the linear part scales by $0.25$ and the attention part by $0.25^2 = 0.0625$. Numerically, $24\cdot196\cdot768^2 + 4\cdot196^2\cdot768 = 2.775\times10^9 + 0.118\times10^9 = 2.893\times10^9$ FLOPs, and the masked encoder costs $0.694\times10^9 + 0.0074\times10^9 = 0.701\times10^9$, a fraction of $0.242$. At this resolution the attention term is small, so the saving is close to the $4\times$ fewer tokens; at higher resolutions it would be larger.
:::
:::

::: widget plot
f: (24*(1-x)*d + 4*t*(1-x)^2)/(24*d + 4*t)
x: 0, 0.95
y: 0, 1
sliders: t=196:49:4096:1; d=768:384:1280:128
labels: encoder cost relative to no masking
caption: Relative encoder FLOPs per layer against the mask ratio $x$, for $t$ patch tokens of width $d$ (from [[#prop-vit-cost]]: linear cost $\propto(1-x)$, attention $\propto(1-x)^2$). At $t = 196$ the curve is almost a straight line; with thousands of tokens the attention term bends it down further, so masking saves more at high resolution.
:::

Why does such a high mask ratio work? The answer is partly empirical: MAE's fine-tuning accuracy peaked around $75\%$ masking, and with too little masking the network can succeed by local interpolation. Reconstruction at $75\%$ forces the encoder to represent what the object is and roughly where its parts are, because that is the only way to predict a missing wheel or eye. The predicted patches are blurry — the MSE loss averages over plausible completions — but blurriness of the reconstruction does not matter, because only the encoder is kept.

### Self-distillation: DINO {#sec-dino}

A different self-supervised recipe trains a ViT to agree with itself across views. In **DINO** (Caron et al., 2021) a student and a teacher network with the same architecture each output a probability vector over $K$ prototype dimensions (Caron et al. used $K = 65{,}536$). The student sees several random crops of an image — two large "global" crops and several small "local" ones — and is trained by cross-entropy to match the teacher's output on the global crops. The teacher is not trained by gradients: its weights are an exponential moving average of the student's. Collapse to a constant output is avoided by **centring** the teacher's logits (subtracting a running mean) and **sharpening** them with a low softmax temperature. Caron et al. observed that the self-attention of the CLS token in DINO-trained ViTs highlights object boundaries without any segmentation labels. DINOv2 (Oquab et al., 2023) scaled the recipe to a curated set of $142$ million images and produced general-purpose image features that are widely used frozen; Darcet et al. (2024) found that large ViTs repurpose a few background patch tokens as global scratch space, producing artefacts in attention maps, and that adding a handful of extra learned "register" tokens removes them.

::: quiz
An MAE with mask ratio $0.75$ is pretrained on $224\times224$ images with $P = 16$. Which statement is correct?
- [ ] The encoder processes $196$ tokens, $147$ of which are mask tokens.
- [x] The encoder processes $49$ patch tokens; mask tokens are added only in the decoder, and the loss is computed on the $147$ masked patches.
- [ ] The loss is computed on all $196$ patches, so that visible patches are reconstructed too.
- [ ] The decoder is kept after pretraining and used for classification.
::: solution
In MAE the encoder sees only the visible quarter of the patches, without mask tokens, which is where its efficiency comes from. The decoder inserts mask tokens and predicts all patches, but the loss counts only masked ones, and the decoder is discarded after pretraining.
:::
:::

## Beyond fixed square inputs {#sec-variable}

Real inputs to multimodal models — screenshots, receipts, wide photographs, pages — are rarely $224\times224$. Resizing them to a square distorts text and shapes; cropping loses content. Because a ViT treats an image as a sequence, it can instead take a variable number of patches. **NaViT** (Dehghani et al., 2023) trained on images at their native aspect ratios, **packing** patches from several images into one sequence with attention masks so that patches attend only within their own image, and sampling resolutions at random during training. Many vision encoders of current vision–language models (as of 2026) follow this approach or one of its relatives, usually with 2-D rotary position encodings so that new grid sizes need no interpolation. The other route — splitting a large image into fixed-size tiles and encoding each — is described in [[multimodal/vision-language-models#sec-tiling]].

::: application ViT backbones in multimodal models
The image encoders of CLIP and SigLIP ([[multimodal/contrastive-learning]]) are ViTs, and their patch outputs, not only the CLS vector, are what vision–language models feed to a language model. Diffusion Transformers ([[multimodal/image-generation#sec-dit]]) apply the patch idea to noisy latent images. In each case the questions of this chapter recur: how many tokens does an image cost, and what does the patch size throw away?
:::

::: history
Attention had been added to convolutional networks before 2020 (non-local networks, Wang et al., 2018; attention-augmented convolutions, Bello et al., 2019), and Cordonnier et al. (2020) applied self-attention to $2\times2$ patches. Dosovitskiy and colleagues at Google posted "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale" in October 2020 (ICLR 2021), showing that a plain Transformer on $16\times16$ patches matches convolutional networks when pretrained on enough data. DeiT (Touvron et al., ICML 2021) showed that ImageNet-1k suffices with the right recipe, and Swin (Liu et al., ICCV 2021) brought hierarchy and windowed attention. Self-supervised ViTs followed: DINO (Caron et al., ICCV 2021), BEiT (Bao et al., ICLR 2022), which predicts discrete visual tokens of masked patches, and MAE (He et al., CVPR 2022). DINOv2 (2023), NaViT (2023) and registers (2024) refined the encoders that now serve as the eyes of multimodal models.
:::

::: summary
- A ViT splits an image into $N = HW/P^2$ non-overlapping patches, projects each linearly to $d$ dimensions (equivalently a stride-$P$ convolution), prepends a CLS token and adds learned position embeddings: $224\times224$ with $P = 16$ gives $196 + 1 = 197$ tokens.
- Without position embeddings a Transformer is permutation-equivariant and sees a bag of patches; learned 1-D embeddings discover the 2-D layout, and are interpolated in 2-D when the resolution changes.
- Per layer, attention costs $T/(6d)$ times the linear layers; at fixed patch size it grows as the fourth power of the image side, which is why high-resolution inputs are expensive.
- ViTs have weaker inductive bias than CNNs; they lag on small datasets and overtake CNNs with hundreds of millions of training images (an empirical finding).
- DeiT trains ViTs on ImageNet-1k with strong augmentation and distillation through a token; MAE masks $75\%$ of patches, encodes only the visible ones and reconstructs normalised pixels; DINO trains a student to match an EMA teacher across crops.
- Vision encoders of multimodal models are ViTs, increasingly at native resolution and aspect ratio.
:::

## Exercises

::: exercise Tokens at higher resolution {level=1 check="577"}
How many tokens, including the CLS token, does ViT-B/16 process for a $384\times384$ image?
::: solution
$384/16 = 24$ patches per side, $24^2 = 576$ patches, plus CLS: $577$ tokens.
:::
:::

::: exercise A patch embedding for ViT-L/14 {level=1 check="603136"}
How many parameters, including the bias, does the patch embedding of a ViT with $P = 14$, $d = 1024$ and RGB input have?
::: solution
Each patch has $14\cdot14\cdot3 = 588$ values, so $E$ is $1024\times588$: $602{,}112$ weights plus $1024$ biases, $603{,}136$ parameters.
:::
:::

::: exercise Masking and attention cost {level=1 check="0.0625"}
With mask ratio $0.75$, by what factor is the attention-score cost ($\propto T^2$) of an MAE encoder reduced relative to an unmasked encoder? Give the factor as a decimal.
::: solution
The encoder sees $T/4$ tokens, so the $T^2$ term scales by $(1/4)^2 = 0.0625$.
:::
:::

::: exercise Attention share in ViT-L {level=2 check="0.167"}
Using [[#eq-vit-ratio]], compute the ratio of attention to linear FLOPs for ViT-L/16 ($d = 1024$) at $512\times512$, counting the CLS token. Give three decimal places.
::: solution
$T = (512/16)^2 + 1 = 1025$, and $T/(6d) = 1025/6144 = 0.1668$, which rounds to $0.167$.
:::
:::

::: exercise Attention memory at high resolution {level=2 check="402.8"}
ViT-B/16 ($12$ heads) is applied to a $1024\times1024$ image. How many megabytes ($10^6$ bytes) does one layer's attention-weight tensor occupy for one image in 16-bit floats if it is stored explicitly? Give one decimal place.
::: solution
$T = 64^2 + 1 = 4097$, so each head has $4097^2 = 16{,}785{,}409$ weights; with $12$ heads and $2$ bytes each, $16{,}785{,}409\cdot12\cdot2 = 402{,}849{,}816$ bytes, $402.8$ MB per layer. Fused attention kernels avoid storing this tensor ([[transformers/efficient-attention]]), but the computation remains quadratic.
:::
:::

::: exercise A DeiT loss {level=2 check="0.805"}
In the setting of [[#def-deit]], the true label is $y = 2$ and the teacher also predicts class $2$. The class token gives $p_{\text{cls}}(2) = 0.5$ and the distillation token $p_{\text{dist}}(2) = 0.4$. Compute the loss to three decimal places.
::: solution
$\mathcal{L} = \tfrac12(-\ln0.5) + \tfrac12(-\ln0.4) = \tfrac12(0.6931 + 0.9163) = 0.805$ to three decimal places. Teacher and label agree here, so both terms push towards class $2$.
:::
:::

::: exercise Patchify and unpatchify {level=2}
Write plain Python functions `patchify(img, P)` that turns an $H\times W$ list of lists (one channel) into a list of $N = HW/P^2$ flattened patches in raster order, and `unpatchify(patches, H, W, P)` that inverts it. Check that `unpatchify(patchify(img, P), H, W, P) == img` on a $6\times4$ image with $P = 2$.
::: solution
```python
def patchify(img, P):
    H, W = len(img), len(img[0])
    return [[img[r + i][c + j] for i in range(P) for j in range(P)]
            for r in range(0, H, P) for c in range(0, W, P)]

def unpatchify(patches, H, W, P):
    img = [[0] * W for _ in range(H)]
    per_row = W // P
    for n, p in enumerate(patches):
        r, c = (n // per_row) * P, (n % per_row) * P
        for k, v in enumerate(p):
            img[r + k // P][c + k % P] = v
    return img

img = [[10 * r + c for c in range(4)] for r in range(6)]
ps = patchify(img, 2)
print(len(ps), ps[1], unpatchify(ps, 6, 4, 2) == img)
```

```text
6 [2, 3, 12, 13] True
```

Patch $n$ starts at row $(n\,\mathrm{div}\,(W/P))\cdot P$ and column $(n\bmod (W/P))\cdot P$, and element $k$ of a patch is at offset $(k\,\mathrm{div}\,P, k\bmod P)$. MAE's decoder output is unpatchified in this way to display reconstructions.
:::
:::

::: exercise A common encoder configuration {level=1 check="576"}
Many vision encoders of vision–language models use $P = 14$ at $336\times336$ pixels. How many patch tokens (excluding any CLS token) does one such image produce?
::: solution
$336/14 = 24$ patches per side, so $24^2 = 576$ patch tokens.
:::
:::

::: exercise Shuffled patches {level=3}
(a) Using [[#prop-perm]], show that a ViT without position embeddings gives the same CLS output for an image and for any image obtained by permuting its patches. (b) With learned position embeddings, give a reason why the network can nevertheless be fairly robust to moderate shuffling in practice, and a reason why it is not invariant.
::: solution
(a) Shuffling the patches permutes rows $2, \dots, N + 1$ of the input matrix $Z_0$ (the patch embedding is applied to each patch independently, so permuting patches permutes their embeddings), with the CLS row fixed. By [[#prop-perm]] the output is permuted the same way, and the CLS row of the output is unchanged; the classification head reads only that row.

(b) With position embeddings, the input row for patch $i$ is $\mathbf{z}^{(\pi(i))} + \mathbf{e}_i$: content and position are added, so the network can, but need not, use the positions. Many recognition decisions depend largely on which local textures and parts are present, which survives shuffling, so accuracy may degrade gracefully. It is not invariant because the embeddings $\mathbf{e}_i$ differ, attention scores between two patches depend on their position embeddings, and features such as object shape and the arrangement of parts are destroyed by shuffling.
:::
:::

::: exercise Interpolation weights {level=3}
Position embeddings on a $14\times14$ grid are resized to $24\times24$ with corners aligned, as in [[#ex-interp]]. (a) Give the bilinear weights of the four old embeddings that form the new embedding at position $(5, 7)$. (b) Show that, for each new position, the weights are non-negative and sum to $1$, and explain why this keeps the interpolated embeddings on the same scale as the originals.
::: solution
(a) The old coordinates are $5\cdot13/23 = 2.826$ and $7\cdot13/23 = 3.957$. Row weights: $1 - 0.826 = 0.174$ for row $2$ and $0.826$ for row $3$; column weights: $1 - 0.957 = 0.043$ for column $3$ and $0.957$ for column $4$. The four weights, computed from the unrounded fractions, are $0.0076$ for $(2, 3)$, $0.1664$ for $(2, 4)$, $0.0359$ for $(3, 3)$ and $0.7902$ for $(3, 4)$; they sum to $1$.

(b) In one dimension the weights are $1 - f$ and $f$ with $f\in[0, 1)$, non-negative and summing to $1$; the bilinear weights are products of row and column weights, so they are non-negative and sum to $(1 - f_r + f_r)(1 - f_c + f_c) = 1$. Each new embedding is therefore a convex combination of old ones, lying in their convex hull, so its norm is at most the largest of the four norms and the model's input scale is preserved — an extrapolating scheme could produce embeddings unlike any seen in training.
:::
:::
