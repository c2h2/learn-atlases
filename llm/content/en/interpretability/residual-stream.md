A Transformer is usually drawn as a tower of blocks, each taking the previous block's output and producing the next. For interpretability a different picture is more useful. Every attention head and every feed-forward layer *reads* from one shared vector per position, the **residual stream**, and *adds* its output back to it. Nothing is ever overwritten except by addition. The final logits are a linear function of the final stream, so they are a sum of contributions from every component that ever wrote to it. And when the components are attention heads without non-linear feed-forward layers between them, the whole model expands into a sum of **paths** — sequences of heads through which information flows from a token embedding to the output — each of which can be studied on its own.

This chapter develops that view, following Elhage et al. (2021), *A Mathematical Framework for Transformer Circuits*. It writes the residual stream as a sum of component writes, shows that the stream has no privileged basis, and factors each attention head into a **QK circuit**, which decides where to attend, and an **OV circuit**, which decides what to move. It derives the **path expansion** of zero-, one- and two-layer attention-only Transformers — bigram statistics, skip-trigrams, and composition between heads into *virtual heads* — and then **direct logit attribution**, which splits an output logit among the components that wrote it, with the treatment of the final normalisation made explicit. The logit lens of [[interpretability/probing-attribution#def-lens]] reappears as the special case of decoding a partial sum. The framework is the basis for the circuits of [[interpretability/circuits]].

## The residual stream as a sum {#sec-sum}

We use the pre-norm block of [[transformers/transformer-block]], with row-vector conventions: the stream at the $T$ positions is a matrix $X\in\R^{T\times d}$, and a component reads $X$ (through a normalisation) and writes a matrix of the same shape.

::: definition Residual stream and components {#def-stream}
Let $X_0 = E + P$ be the token embeddings $E$ (row $t$ is $W_E[x_t]$, with $W_E\in\R^{\lvert\mathcal{V}\rvert\times d}$) plus any positional embeddings $P$. A Transformer with components $c_1, c_2, \dots, c_K$ — the attention heads of layer $1$, then the feed-forward layer of layer $1$, then the heads of layer $2$, and so on — computes
$$
X_k = X_{k-1} + c_k(X_{k-1})\quad\text{(heads of one layer all read the same } X\text{)},
$$
and the **residual stream** after the last component is $X_K = X_0 + \sum_{k=1}^Kc_k(\cdot)$. The output logits are $\operatorname{Norm}(X_K)\,W_U$ with unembedding $W_U\in\R^{d\times\lvert\mathcal{V}\rvert}$.
:::

Because the stream is a sum, any component's output is available unchanged to every later component, and it reaches the output directly as well as through everything downstream. Elhage et al. describe the stream as a **communication channel**: components do not talk to each other directly, but through subspaces of a shared $d$-dimensional space. A component writing into a subspace that no later component reads has no effect except through the output; two components writing into the same subspace interfere. The channel is crowded: GPT-2 small has $144$ heads and $12$ feed-forward layers writing into $768$ dimensions, so components must share dimensions, and some appear to act as "memory management", writing the negative of earlier outputs to clear space.

### No privileged basis {#sec-basis}

A basic fact about the stream is that its coordinates mean nothing in themselves.

::: definition Privileged basis {#def-privileged}
A representation has a **privileged basis** if the model's computation is not invariant to an orthogonal change of basis of that representation — typically because an elementwise operation (a ReLU, a GELU, an elementwise gain) is applied to it, which makes the coordinate axes special.
:::

::: proposition The residual stream has no privileged basis {#prop-rotation}
Consider a Transformer whose normalisations are RMSNorm with their elementwise gains folded into the following weight matrices. Let $R\in\R^{d\times d}$ be orthogonal. Replace $W_E$ by $W_ER$ (and $P$ by $PR$); every matrix that reads from the stream, $W$ (the query, key, value and first feed-forward matrices), by $R\T W$; every matrix that writes to the stream, $W'$ (the output matrices of heads and of the feed-forward layer), by $W'R$; and $W_U$ by $R\T W_U$. The new model computes exactly the same logits, and its residual stream at every layer is $X_kR$.
:::

::: proof
By induction on $k$, the new stream is $X_kR$. For $k = 0$ this is the definition. Suppose it holds for $k - 1$. RMSNorm without gain is $\operatorname{Norm}(\mathbf{x}) = \mathbf{x}/\operatorname{RMS}(\mathbf{x})$ row by row, and $\operatorname{RMS}(\mathbf{x}R) = \lVert\mathbf{x}R\rVert/\sqrt d = \lVert\mathbf{x}\rVert/\sqrt d$, so $\operatorname{Norm}(X_{k-1}R) = \operatorname{Norm}(X_{k-1})R$. A read multiplies this by $R\T W$, giving $\operatorname{Norm}(X_{k-1})RR\T W = \operatorname{Norm}(X_{k-1})W$: every query, key, value and feed-forward pre-activation is unchanged, hence so are the attention patterns, the head outputs before $W_O$ and the neuron activations. A write multiplies an unchanged quantity by $W'R$, so the component's contribution is its old contribution times $R$. Adding, $X_k R$. Finally $\operatorname{Norm}(X_KR)R\T W_U = \operatorname{Norm}(X_K)W_U$.
:::

LayerNorm also subtracts the mean of the coordinates, which singles out the direction $\mathbf{1}$, so for LayerNorm models the proposition holds for rotations that fix $\mathbf{1}$ (after folding the centring into the weights, as interpretability libraries do, it holds in the remaining $d - 1$ dimensions). The proof also shows what *is* privileged: the neurons of the feed-forward layer, where an elementwise non-linearity is applied, and the attention pattern, which is a probability distribution over positions. This is why interpretability looks for meaningful *neurons* but meaningful *directions* in the residual stream, and why — as [[interpretability/superposition]] explains — even neurons often fail to be meaningful.

## Attention heads as QK and OV circuits {#sec-qkov}

A single attention head $h$ with matrices $W_Q^h, W_K^h, W_V^h\in\R^{d\times d_k}$ and $W_O^h\in\R^{d_k\times d}$ ([[transformers/multi-head-attention]]) reads the (normalised) stream $X$ and writes

$$
h(X) = A^h\,X\,W_V^hW_O^h,\qquad A^h = \operatorname{softmax}\Bigl(\operatorname{mask}\bigl(XW_Q^h(XW_K^h)\T/\sqrt{d_k}\bigr)\Bigr).
$$ {#eq-head}

The matrices appear only in two products.

::: definition QK and OV circuits {#def-qkov}
The **QK matrix** of head $h$ is $W_{QK}^h = W_Q^h(W_K^h)\T\in\R^{d\times d}$, and the attention score from position $i$ to position $j$ is $\mathbf{x}_iW_{QK}^h\mathbf{x}_j\T/\sqrt{d_k}$. The **OV matrix** is $W_{OV}^h = W_V^hW_O^h\in\R^{d\times d}$, and the head writes $\sum_jA^h_{ij}\,\mathbf{x}_jW_{OV}^h$ to position $i$. Both have rank at most $d_k$. Composed with the embedding and unembedding they give the token-level **QK circuit** $W_EW_{QK}^hW_E\T\in\R^{\lvert\mathcal{V}\rvert\times\lvert\mathcal{V}\rvert}$ (how much a query token wants to attend to a key token) and **OV circuit** $W_EW_{OV}^hW_U\in\R^{\lvert\mathcal{V}\rvert\times\lvert\mathcal{V}\rvert}$ (how attending to a token changes the logits).
:::

The factorisation separates two questions that attention maps conflate ([[interpretability/probing-attribution#sec-attention]]): the QK circuit determines the pattern $A^h$, *where* information moves from; the OV circuit determines *what* is moved, independently of where. Neither $W_Q^h$ nor $W_K^h$ alone has meaning — replacing them by $W_Q^hM$ and $W_K^hM^{-\mathsf{T}}$ for any invertible $M$ leaves $W_{QK}^h$ unchanged — so only the products are interpretable objects.

::: example Shapes and ranks {#ex-shapes}
In GPT-2 small ($d = 768$, $12$ heads per layer, $d_k = 64$, $\lvert\mathcal{V}\rvert = 50{,}257$), give the shapes and maximum ranks of $W_{QK}^h$, $W_{OV}^h$ and the token-level OV circuit, and compare the parameters used to store $W_{QK}^h$ with those of a full $d\times d$ matrix.
::: solution
$W_{QK}^h$ and $W_{OV}^h$ are $768\times768$ with rank at most $64$. The token-level OV circuit is $50{,}257\times50{,}257$ — about $2.5\times10^9$ entries — also of rank at most $64$, so it is never formed explicitly; one studies it through its factors or a few rows. $W_Q^h$ and $W_K^h$ have $2\times768\times64 = 98{,}304$ parameters, against $768^2 = 589{,}824$ for a full matrix: each head is a low-rank bilinear form, which is one reason heads specialise.
:::
:::

## Path expansion of attention-only Transformers {#sec-paths}

Feed-forward layers are non-linear and do not expand into paths. Elhage et al. therefore studied **attention-only** Transformers — all MLPs removed — trained on ordinary text; they are weaker models but can be understood almost completely. We also drop the normalisations (or treat their scale as fixed per position, as in [[#sec-dla]]) and positional embeddings, which Elhage et al. handled separately.

**Zero layers.** With no components, $\text{logits} = X_0W_U$ and the prediction at position $t$ depends only on the current token: row $x_t$ of $W_EW_U$. Training such a model on next-token prediction makes $W_EW_U$ approximate the **bigram log-likelihoods** ([[text-and-language/ngram-models]]), up to a constant per row; with $d < \lvert\mathcal{V}\rvert$ it is a rank-$d$ approximation of them.

**One layer.** With heads $h\in\mathcal{H}$ in a single layer,

::: proposition Path expansion of a one-layer attention-only Transformer {#prop-one}
For fixed attention patterns $A^h$,
$$
\text{logits} = \underbrace{X_0W_U}_{\text{direct path}} + \sum_{h\in\mathcal{H}}\underbrace{A^h\,X_0\,W_{OV}^hW_U}_{\text{path through head }h},
$$ {#eq-one}
and, with $X_0 = E$ the one-hot rows times $W_E$, the logit contributed by head $h$ at position $i$ to token $v$ is $\sum_{j\le i}A^h_{ij}\,\bigl[W_EW_{OV}^hW_U\bigr]_{x_j, v}$, with $A^h_{ij}\propto\exp\bigl([W_EW_{QK}^hW_E\T]_{x_i,x_j}/\sqrt{d_k}\bigr)$ over $j\le i$.
:::

::: proof
$X_1 = X_0 + \sum_hA^hX_0W_{OV}^h$ by [[#eq-head]], and multiplying by $W_U$ gives [[#eq-one]] by distributivity. Writing $X_0 = OW_E$ with $O$ the matrix of one-hot rows, row $i$ of $A^hOW_EW_{OV}^hW_U$ is $\sum_jA^h_{ij}$ times row $x_j$ of the OV circuit. The scores are $X_0W_{QK}^hX_0\T = O\,(W_EW_{QK}^hW_E\T)\,O\T$, whose $(i,j)$ entry is the QK-circuit entry for the token pair $(x_i, x_j)$.
:::

The proposition says that a one-layer attention-only model is a sum of a bigram table and, for each head, a pair of $\lvert\mathcal{V}\rvert\times\lvert\mathcal{V}\rvert$ tables: the QK table chooses which earlier token to attend to given the current one, and the OV table says which outputs that earlier token promotes. Elhage et al. called the resulting statistics **skip-trigrams**: patterns "$a\ldots b\to c$", where the current token $b$ attends back to an earlier $a$ and predicts $c$. Inspecting the largest entries of the two tables, they found heads that mostly **copy**: the OV circuit raises the logit of the attended token itself (positive eigenvalues dominate), so that a token seen earlier becomes more likely again — for example "… keep … in → mind" alongside "… keep … in → keep". The pattern also exposes the limits of the architecture: a skip-trigram "keep … in → mind" cannot be separated from "keep … at → bay" without producing "keep … in → bay" as well, since the tables add.

::: example A skip-trigram by hand {#ex-skip}
A one-layer model has vocabulary $\{A, B, C\}$, $W_E = W_U = I_3$ (so $d = 3$) and a single head. Its QK circuit is zero except that the query $C$ gives score $2$ to key $A$ (after the $\sqrt{d_k}$ scaling); its OV circuit is zero except $[OV]_{A, B} = 3$. For the sequence $A\,B\,C$, compute the logits at the last position.
::: solution
At position $3$ (token $C$), the scores over keys $A, B, C$ are $(2, 0, 0)$, so $A^h_{3,\cdot} = \operatorname{softmax}(2, 0, 0) = (0.787, 0.107, 0.107)$. The head adds $0.787\times(\text{row } A\text{ of OV}) = 0.787\times(0, 3, 0) = (0, 2.361, 0)$; rows $B$ and $C$ of the OV circuit are zero. The direct path adds row $C$ of $W_EW_U = (0, 0, 1)$. The logits are $(0, 2.361, 1)$: the model predicts $B$, implementing the skip-trigram "$A\ldots C\to B$". Had $A$ not occurred, the head would contribute nothing and the bigram path would favour $C$.
:::
:::

**Two layers.** In a second layer, a head reads $X_1 = X_0 + \sum_{h}h(X_0)$, which contains the outputs of the first layer's heads. It can use them in three places, which Elhage et al. called the three kinds of **composition**:

- **Q-composition**: the query $X_1W_Q$ includes first-layer outputs, so *where* the second-layer head attends can depend on what an earlier head found;
- **K-composition**: likewise for the keys — the keys at a position can describe what an earlier head moved there, for instance which token preceded it;
- **V-composition**: the values include first-layer outputs, so the second-layer head can move information that an earlier head had already moved.

V-composition gives exact paths. Applying the head formula twice,

::: proposition Virtual attention heads {#prop-virtual}
For fixed attention patterns, the output of a second-layer head $h_2$ is
$$
h_2(X_1) = A^{h_2}X_0W_{OV}^{h_2} + \sum_{h_1}\bigl(A^{h_2}A^{h_1}\bigr)\,X_0\,\bigl(W_{OV}^{h_1}W_{OV}^{h_2}\bigr),
$$ {#eq-virtual}
so every pair $(h_1, h_2)$ acts like an additional head — a **virtual attention head** — with attention pattern $A^{h_2}A^{h_1}$ and OV matrix $W_{OV}^{h_1}W_{OV}^{h_2}$. An attention-only model with $L$ layers of $H$ heads has $(1 + H)^L$ such paths from the embedding to the output.
:::

::: proof
$h_2(X_1) = A^{h_2}X_1W_{OV}^{h_2}$ with $X_1 = X_0 + \sum_{h_1}A^{h_1}X_0W_{OV}^{h_1}$; distribute. For the count, each of the $L$ layers is passed either through the residual connection or through one of its $H$ heads, independently, giving $(1+H)^L$ products of OV matrices (and correspondingly of attention patterns) from $X_0$ to $X_L$; multiplying by $W_U$ gives the logit paths.
:::

The attention patterns of the second layer, however, are not fixed: they depend on $X_1$ through Q- and K-composition, and the scores $X_1W_{QK}^{h_2}X_1\T$ expand into terms such as $X_0W_{OV}^{h_1\mathsf{T}}\cdots$ that are *quadratic* in the first layer's outputs. This is where two-layer models gain a qualitatively new ability. The **induction head** of [[interpretability/circuits]] is a K-composition circuit: a first-layer "previous-token head" writes the identity of each token's predecessor into its position, and a second-layer head uses that as its key to find the position after an earlier occurrence of the current token. Elhage et al. measured how much two heads compose by a **composition score**, for K-composition $\lVert W_{QK}^{h_2\mathsf{T}}W_{OV}^{h_1}\rVert_F\big/\bigl(\lVert W_{QK}^{h_2}\rVert_F\lVert W_{OV}^{h_1}\rVert_F\bigr)$ and analogously for Q- and V-composition, and compared it with the value for random matrices.

::: example How many paths? {#ex-paths}
How many embedding-to-output paths does an attention-only model with the shape of GPT-2 small ($12$ layers, $12$ heads each) have? How many virtual heads of exactly two heads?
::: solution
$(1 + 12)^{12} = 13^{12} = 23{,}298{,}085{,}122{,}481\approx2.3\times10^{13}$ paths. Paths through exactly two heads choose two of the $12$ layers and one head in each: $\binom{12}{2}\cdot12^2 = 66\times144 = 9504$ virtual heads. Enumeration is impossible for long paths, which is why analyses rely on most paths being negligible: Elhage et al. found that in their small models the important paths were short.
:::
:::

## Direct logit attribution {#sec-dla}

The sum structure gives a simple attribution for any prediction. Take the last position $i$ and the logit difference between a candidate token $a$ and a competitor $b$ — the quantity that decides which one wins, and which is invariant to adding a constant to all logits. Let $\mathbf{x} = \mathbf{x}_0 + \sum_k\mathbf{c}_k$ be the final residual stream at position $i$, a sum of the embedding and the components' writes there. With a final RMSNorm, $\operatorname{Norm}(\mathbf{x}) = \mathbf{x}/\sigma(\mathbf{x})$ with $\sigma(\mathbf{x}) = \operatorname{RMS}(\mathbf{x})$.

::: proposition Direct logit attribution {#prop-dla}
Let $\Delta\mathbf{u} = W_U[:, a] - W_U[:, b]$ be the **logit-difference direction**. Then
$$
\text{logit}_a - \text{logit}_b = \frac{\mathbf{x}_0\cdot\Delta\mathbf{u}}{\sigma(\mathbf{x})} + \sum_k\frac{\mathbf{c}_k\cdot\Delta\mathbf{u}}{\sigma(\mathbf{x})},
$$ {#eq-dla}
and the term $\operatorname{DLA}_k = \mathbf{c}_k\cdot\Delta\mathbf{u}/\sigma(\mathbf{x})$ is the **direct logit attribution** of component $k$. For a LayerNorm, replace each $\mathbf{c}_k$ by its centred version $\mathbf{c}_k - \bar c_k\mathbf{1}$ (and fold the gain into $W_U$); the decomposition is again exact.
:::

::: proof
$\text{logit}_a - \text{logit}_b = \operatorname{Norm}(\mathbf{x})\cdot\Delta\mathbf{u} = (\mathbf{x}\cdot\Delta\mathbf{u})/\sigma(\mathbf{x})$, and the dot product is linear in $\mathbf{x} = \mathbf{x}_0 + \sum_k\mathbf{c}_k$. For LayerNorm, $\operatorname{Norm}(\mathbf{x}) = (\mathbf{x} - \bar x\mathbf{1})/\sigma(\mathbf{x})\odot\boldsymbol{\gamma} + \boldsymbol{\beta}$; the bias $\boldsymbol\beta$ adds a constant to the logit difference, the gain multiplies $\Delta\mathbf{u}$ elementwise, and centring is a linear map that distributes over the sum.
:::

Two caveats determine how DLA is read. First, the scale $\sigma(\mathbf{x})$ depends on all components together, so DLA is exact for the actual input but is not the effect of *removing* a component, which would also change $\sigma$. It is linear only once the scale is frozen at its observed value, which is the convention. Second, and more important, DLA measures only the **direct** effect: the part of a component's output that reaches the logits without passing through any later component. A head whose output is read by a later head that then writes the answer has small DLA and large total effect; and a later component can cancel an earlier one's direct contribution. The circuits literature found both: *backup* heads that take over when a head is ablated, and *negative* heads that suppress the answer the circuit computes (Wang et al., 2023; McDougall et al., 2023, on copy suppression). Total effects need interventions ([[interpretability/causal-interventions]]).

::: example Direct logit attribution with a normalisation {#ex-dla}
At the last position, the embedding contributes $\mathbf{x}_0 = (1, 0, 1)$ and two heads contribute $\mathbf{c}_1 = (2, 1, 0)$ and $\mathbf{c}_2 = (-1, 1, 1)$. The final normalisation is RMSNorm without gain, and $\Delta\mathbf{u} = (1, -1, 0.5)$. Compute the DLA of each part and check the sum.
::: solution
$\mathbf{x} = (2, 2, 2)$, so $\sigma = \sqrt{(4 + 4 + 4)/3} = 2$. Dot products with $\Delta\mathbf{u}$: embedding $1 + 0 + 0.5 = 1.5$, head $1$: $2 - 1 + 0 = 1$, head $2$: $-1 - 1 + 0.5 = -1.5$. Dividing by $\sigma$: $0.75$, $0.5$ and $-0.75$, which sum to $0.5$. Directly, $\mathbf{x}\cdot\Delta\mathbf{u}/\sigma = (2 - 2 + 1)/2 = 0.5$. Head $2$ pushes against $a$; but if head $2$ were removed, $\mathbf{x}$ would become $(3, 1, 1)$ with $\sigma = 1.915$ and logit difference $2.5/1.915 = 1.31$, not $0.5 + 0.75 = 1.25$, because the scale changes.
:::
:::

DLA is a projection, and the figure shows its geometry in two dimensions: the contribution of a component is the length of its write projected onto the logit-difference direction, times the length of that direction.

::: widget projection
u: 3,1
v: 1,2
caption: Direct logit attribution as a projection. Let $\mathbf{u}$ be the logit-difference direction $\Delta\mathbf{u}$ and $\mathbf{v}$ a component's write to the residual stream. The DLA (before dividing by the normalisation scale) is $\mathbf{v}\cdot\mathbf{u} = \lVert\mathbf{u}\rVert$ times the signed length of the projection. The orthogonal part of $\mathbf{v}$ has no direct effect on this logit difference, though later components may read it.
:::

### The logit lens as a partial sum {#sec-lens}

The logit lens ([[interpretability/probing-attribution#def-lens]]) decodes $X_k$ — the sum of the embedding and the first $k$ components' writes — as if it were the final stream. In the path language it keeps all paths that end before component $k + 1$ and reads them through the final normalisation and $W_U$. That this often gives sensible predictions in middle layers is an empirical fact about trained models: components tend to write in directions aligned with the unembedding, refining a prediction that is already partly present. When it fails, as on some model families, the stream at intermediate layers is in a basis the output head does not read — the motivation for the tuned lens. DLA and the logit lens are complementary: DLA asks what each component *adds* to the final logit difference, the lens what the running sum *predicts*.

::: quiz
In a 12-layer model, a head in layer $3$ has direct logit attribution near zero for the correct answer, but ablating it reduces the correct logit substantially. What is the most likely explanation?
- [ ] DLA was computed with the wrong sign of $\Delta\mathbf{u}$.
- [x] The head affects the answer indirectly: later components read what it writes, and those components write the answer.
- [ ] Ablation is unreliable and should be ignored.
- [ ] The head writes only to positions other than the last, so it cannot matter.
::: solution
DLA measures only the path from the head directly to the logits. A head whose output is read by later heads or MLPs — for example a previous-token head feeding an induction head — has a small direct effect and a large indirect one. (Writing only to earlier positions does not prevent an effect either: later heads at the last position can read those positions.)
:::
:::

### Feed-forward layers {#sec-mlp}

A feed-forward layer at a position computes $\phi(\mathbf{x}W_{\text{in}})W_{\text{out}}$; its write is a sum over neurons $n$ of the activation $\phi(\cdot)_n$ times the row $W_{\text{out}}[n]$, so each neuron writes a fixed direction scaled by its activation. DLA applies to each neuron, and projecting $W_{\text{out}}[n]$ onto the unembedding gives the tokens that neuron promotes. Geva et al. (2021, 2022) read feed-forward layers in this way as **key–value memories** whose value vectors, projected to the vocabulary, often promote interpretable sets of tokens. The non-linearity means that there is no exact path expansion through MLPs: one either treats each layer's output as an opaque component, linearises it around the observed input, or replaces it by a more interpretable approximation — the transcoders of [[interpretability/sparse-features]] were designed for this.

::: warning Linear decompositions hide non-linear dependencies
The path expansion and DLA are exact *for the observed attention patterns and normalisation scales*. Those quantities are themselves functions of the whole stream, so "head $h$ contributes $+2.3$ to the logit difference" holds on this input with everything else as it is. Changing any upstream component changes the patterns and scales and therefore every term. Read decompositions as an account of how the output was assembled on one input, and test claims about what would happen *if* something changed with interventions.
:::

## A numerical laboratory {#sec-code}

The listing builds a tiny attention-only Transformer in plain Python with random weights — vocabulary $5$, $d = 4$, $d_k = 2$, two heads in layer $1$ and one in layer $2$, no normalisation — and checks the identities of this chapter numerically: the one-layer path expansion [[#eq-one]], the virtual-head expansion [[#eq-virtual]] of the layer-$2$ head's output (with its actual attention pattern), direct logit attribution [[#eq-dla]], and the rotation invariance of [[#prop-rotation]].

```python
import math, random
rng = random.Random(3)

V, D, DK = 5, 4, 2                                   # vocabulary, residual width, head width
def mat(r, c): return [[rng.gauss(0, 1) for _ in range(c)] for _ in range(r)]
def mm(A, B): return [[sum(a * b for a, b in zip(row, col)) for col in zip(*B)] for row in A]
def tr(A): return [list(r) for r in zip(*A)]
def add(A, B): return [[a + b for a, b in zip(r, s)] for r, s in zip(A, B)]
def softmax(z):
    m = max(z); e = [math.exp(v - m) for v in z]; t = sum(e); return [v / t for v in e]

W_E, W_U = mat(V, D), mat(D, V)                      # (V, D), (D, V)
def head_params(): return mat(D, DK), mat(D, DK), mat(D, DK), mat(DK, D)   # W_Q, W_K, W_V, W_O
H1 = [head_params(), head_params()]                  # layer 1: two heads
H2 = [head_params()]                                 # layer 2: one head

def attn_pattern(X, WQ, WK):                         # causal softmax pattern, (T, T)
    S = mm(mm(X, WQ), tr(mm(X, WK)))
    return [softmax([S[i][j] / math.sqrt(DK) for j in range(i + 1)]) + [0.0] * (len(X) - i - 1)
            for i in range(len(X))]
def head_out(X, p, A=None):                          # A X W_V W_O, (T, D)
    WQ, WK, WV, WO = p
    A = A or attn_pattern(X, WQ, WK)
    return mm(A, mm(mm(X, WV), WO)), A

tokens = [0, 3, 1, 3]
X0 = [W_E[t] for t in tokens]                        # (T, D)

# one layer: logits = (X0 + sum_h h(X0)) W_U  versus  direct path + head paths
outs = [head_out(X0, p) for p in H1]
X1 = X0
for o, _ in outs: X1 = add(X1, o)
logits = mm(X1, W_U)                                 # (T, V)
recon = mm(X0, W_U)
for (o, A), p in zip(outs, H1): recon = add(recon, mm(A, mm(X0, mm(mm(p[2], p[3]), W_U))))
err = max(abs(a - b) for r, s in zip(logits, recon) for a, b in zip(r, s))
print("1-layer: max |logits - (direct + head paths)| =", f"{err:.1e}")

# token-level circuits of head 1.0, (V, V) each
WQ, WK, WV, WO = H1[0]
QK = mm(mm(W_E, mm(WQ, tr(WK))), tr(W_E))            # query token x key token
OV = mm(mm(W_E, mm(WV, WO)), W_U)                    # attended token -> logits
print("head 1.0 OV circuit, row for token 3:", [round(v, 2) for v in OV[3]])
print("  the token it most boosts when attending to 3:", OV[3].index(max(OV[3])))

# direct logit attribution at the last position for logit(a) - logit(b)
a, b = 2, 4
def dla(vec): return sum(v * (W_U[k][a] - W_U[k][b]) for k, v in enumerate(vec))
parts = {"embedding": dla(X0[-1])}
for h, (o, _) in enumerate(outs): parts[f"head 1.{h}"] = dla(o[-1])
print("DLA at last position:", {k: round(v, 3) for k, v in parts.items()},
      " sum", round(sum(parts.values()), 3), " logit diff", round(logits[-1][a] - logits[-1][b], 3))

# two layers: head 2.0 output = direct OV path + virtual heads (A2 A1, W_OV1 W_OV2)
o2, A2 = head_out(X1, H2[0])
OV2 = mm(H2[0][2], H2[0][3])
virtual = mm(A2, mm(X0, OV2))
for (o, A), p in zip(outs, H1):
    virtual = add(virtual, mm(mm(A2, A), mm(X0, mm(mm(p[2], p[3]), OV2))))
err2 = max(abs(x - y) for r, s in zip(o2, virtual) for x, y in zip(r, s))
print("2-layer: max |head 2.0 output - sum of its OV paths| =", f"{err2:.1e}")

# no privileged basis: rotate the residual stream by an orthogonal R
th = 0.7
R = [[math.cos(th), -math.sin(th), 0, 0], [math.sin(th), math.cos(th), 0, 0],
     [0, 0, math.cos(2 * th), -math.sin(2 * th)], [0, 0, math.sin(2 * th), math.cos(2 * th)]]
W_E_r, W_U_r = mm(W_E, R), mm(tr(R), W_U)
H1_r = [(mm(tr(R), q), mm(tr(R), k), mm(tr(R), v), mm(o, R)) for q, k, v, o in H1]
X0r = [W_E_r[t] for t in tokens]
X1r = X0r
for p in H1_r: X1r = add(X1r, head_out(X0r, p)[0])
err3 = max(abs(x - y) for r, s in zip(mm(X1r, W_U_r), logits) for x, y in zip(r, s))
print("rotated model: max |logit change| =", f"{err3:.1e}")
```

```text
1-layer: max |logits - (direct + head paths)| = 3.6e-15
head 1.0 OV circuit, row for token 3: [0.94, 1.73, 0.61, -1.07, 1.54]
  the token it most boosts when attending to 3: 1
DLA at last position: {'embedding': -0.97, 'head 1.0': -4.005, 'head 1.1': -5.988}  sum -10.963  logit diff -10.963
2-layer: max |head 2.0 output - sum of its OV paths| = 4.4e-15
rotated model: max |logit change| = 3.6e-15
```

All identities hold to rounding error. The random head's OV circuit is not a copying circuit — attending to token $3$ most raises the logit of token $1$, and lowers that of token $3$ itself — which is the kind of property one reads off a trained head's OV circuit (the last exercise asks how to quantify copying).

::: history
Residual connections entered deep learning with ResNets (He et al., 2015), and the idea that a residual network behaves like an ensemble of many shallower paths was put forward by Veit, Wilber and Belongie (2016). For Transformers, Elhage, Nanda, Olsson and colleagues at Anthropic (2021), in *A Mathematical Framework for Transformer Circuits* on the Transformer Circuits Thread, introduced the residual stream as a communication channel, the QK/OV factorisation, path expansion, the three kinds of composition and virtual heads, and studied zero-, one- and two-layer attention-only models; their companion paper on induction heads followed in 2022. nostalgebraist's logit lens (2020) and Geva et al.'s readings of feed-forward layers in vocabulary space (2021, 2022) used the same linear structure; Dar et al. (2023) projected whole parameter matrices to the vocabulary. Direct logit attribution became a standard first step in circuit analyses such as Wang et al.'s indirect-object-identification study (2023), and libraries such as TransformerLens (Nanda and Bloom, 2022) made the decompositions routine.
:::

::: summary
- The **residual stream** is a sum: $X_K = X_0 + \sum_kc_k$, every component reading from it and adding to it; the logits are a linear function of its normalised final value.
- The stream has **no privileged basis**: rotating it, with compensating changes to every read and write, leaves the model's function unchanged (exactly for RMSNorm). Neurons and attention patterns are privileged; residual features are **directions**.
- A head factors into a **QK circuit** $W_Q W_K\T$ (where to attend) and an **OV circuit** $W_VW_O$ (what to move), both of rank $\le d_k$; at token level, $W_EW_{QK}W_E\T$ and $W_EW_{OV}W_U$.
- A zero-layer model is a **bigram** table; a one-layer attention-only model is a bigram table plus **skip-trigram** tables per head. In two layers, heads **compose** through queries, keys and values; V-composition yields **virtual heads** $A^{h_2}A^{h_1}$, $W_{OV}^{h_1}W_{OV}^{h_2}$, and $L$ layers of $H$ heads have $(1+H)^L$ paths.
- **Direct logit attribution** splits a logit difference into $\mathbf{c}_k\cdot\Delta\mathbf{u}/\sigma$ per component, exact for the frozen normalisation scale; it measures **direct** effects only. The **logit lens** decodes partial sums.
:::

## Exercises

::: exercise Counting virtual heads {level=1 check="1728"}
An attention-only model has $3$ layers of $12$ heads. How many embedding-to-output paths pass through exactly one head in each of the three layers?
::: solution
One head per layer, chosen independently: $12^3 = 1728$. (The total number of paths is $13^3 = 2197$.)
:::
:::

::: exercise A direct logit attribution {level=1 check="3/sqrt(2)"}
The final residual stream at a position is $\mathbf{x} = \mathbf{x}_0 + \mathbf{c}_1 + \mathbf{c}_2$ with $\mathbf{x}_0 = (0, 1)$, $\mathbf{c}_1 = (1, 1)$, $\mathbf{c}_2 = (1, -2)$. The final normalisation is RMSNorm without gain, and $\Delta\mathbf{u} = (2, 1)$. Compute the DLA of $\mathbf{c}_1$.
::: solution
$\mathbf{x} = (2, 0)$, so $\sigma = \sqrt{(4 + 0)/2} = \sqrt2$. Then $\mathbf{c}_1\cdot\Delta\mathbf{u} = 2 + 1 = 3$ and $\operatorname{DLA}_1 = 3/\sqrt2\approx2.121$. (For comparison, the embedding contributes $1/\sqrt2$ and $\mathbf{c}_2$ contributes $0$; the total is $4/\sqrt2 = \mathbf{x}\cdot\Delta\mathbf{u}/\sigma$.)
:::
:::

::: exercise Invariance of the QK matrix {level=1}
Show that replacing $W_Q$ by $W_QM$ and $W_K$ by $W_KM^{-\mathsf{T}}$ for an invertible $M\in\R^{d_k\times d_k}$ leaves the attention pattern unchanged, and give the analogous invariance for $W_V$ and $W_O$.
::: solution
$W_QM(W_KM^{-\mathsf{T}})\T = W_QMM^{-1}W_K\T = W_QW_K\T$, so the scores, and the pattern, are unchanged. Likewise $W_VM\cdot M^{-1}W_O = W_VW_O$. Only $W_{QK}$ and $W_{OV}$ are determined by the function, so individual query, key, value or output dimensions of a head have no intrinsic meaning.
:::
:::

::: exercise Zero-layer model {level=2}
Show that if a zero-layer Transformer with $d\ge\lvert\mathcal{V}\rvert$ is trained to convergence with cross-entropy on a corpus, the softmax of row $v$ of $W_EW_U$ is the empirical distribution of the token following $v$. What changes when $d < \lvert\mathcal{V}\rvert$?
::: solution
The loss is $-\sum_t\log\operatorname{softmax}(\mathbf{z}_{x_t})_{x_{t+1}}$ with $\mathbf{z}_v$ row $v$ of $Z = W_EW_U$; grouping terms by the current token, row $v$ appears in $-\sum_{w}n(v,w)\log\operatorname{softmax}(\mathbf{z}_v)_w$, the cross-entropy between the empirical next-token counts and $\operatorname{softmax}(\mathbf{z}_v)$, minimised when $\operatorname{softmax}(\mathbf{z}_v)_w = n(v,w)/\sum_{w'}n(v,w')$ (approached as logits of unseen pairs go to $-\infty$). With $d\ge\lvert\mathcal{V}\rvert$ any matrix $Z$ is a product $W_EW_U$, so the optimum is reachable. With $d < \lvert\mathcal{V}\rvert$, $Z$ has rank at most $d$, and the model learns the best rank-$d$ approximation in this cross-entropy sense: a factorised bigram model, like the word embeddings of [[text-and-language/word-embeddings]].
:::
:::

::: exercise A copying head {level=2}
In [[#ex-skip]], change the OV circuit to $3I_3$ (each attended token raises its own logit by $3$). Compute the logits at the last position of $A\,B\,C$ and describe the head's behaviour.
::: solution
The head adds $0.787(3, 0, 0) + 0.107(0, 3, 0) + 0.107(0, 0, 3) = (2.361, 0.320, 0.320)$; the direct path adds $(0, 0, 1)$. Logits $(2.361, 0.320, 1.320)$: the model predicts $A$, the token it attended to. A head whose OV circuit is close to a positive multiple of the identity is a **copying** head: it raises the probability of tokens that appeared earlier, which is the basis of the induction mechanism of [[interpretability/circuits]].
:::
:::

::: exercise DLA versus ablation {level=2}
In [[#ex-dla]], compute the logit difference with head $1$ removed, and compare the change with head $1$'s DLA. Explain the discrepancy.
::: solution
Without head $1$, $\mathbf{x} = (1, 0, 1) + (-1, 1, 1) = (0, 1, 2)$, $\sigma = \sqrt{5/3} = 1.291$, and $\mathbf{x}\cdot\Delta\mathbf{u} = 0 - 1 + 1 = 0$, so the logit difference becomes $0$. The change, $0.5$, equals head $1$'s DLA of $0.5$ — but only because the remaining numerator happens to be zero, so the new scale multiplies nothing. Removing head $2$ instead changes the logit difference from $0.5$ to $1.31$, a change of $0.81$, while its DLA is $-0.75$ ([[#ex-dla]]): in general the scale $\sigma$ changes when a component is removed, and DLA is not the effect of ablation.
:::
:::

::: exercise Rotation and LayerNorm {level=3}
LayerNorm (without gain) computes $(\mathbf{x} - \bar x\mathbf{1})/\sigma$ with $\sigma$ the standard deviation of the coordinates. Show that it commutes with an orthogonal $R$ (i.e. $\operatorname{LN}(\mathbf{x}R) = \operatorname{LN}(\mathbf{x})R$ for all $\mathbf{x}$) if and only if $\mathbf{1}R = \pm\mathbf{1}$ (for $d\ge2$), and conclude for which rotations [[#prop-rotation]] extends to LayerNorm models.
::: solution
Write $P = I - \tfrac1d\mathbf{1}\T\mathbf{1}$ for the centring projection (acting on row vectors from the right), so $\operatorname{LN}(\mathbf{x}) = \sqrt d\,\mathbf{x}P/\lVert\mathbf{x}P\rVert$. If $\mathbf{1}R = \pm\mathbf{1}$, then $R$ maps the line spanned by $\mathbf{1}$ to itself and, being orthogonal, also its orthogonal complement, the centred subspace; hence $PR = RP$, $\lVert\mathbf{x}RP\rVert = \lVert\mathbf{x}PR\rVert = \lVert\mathbf{x}P\rVert$, and $\operatorname{LN}(\mathbf{x}R) = \operatorname{LN}(\mathbf{x})R$. Conversely, suppose LN commutes with $R$ and take any non-zero centred $\mathbf{x}$ ($\mathbf{x}P = \mathbf{x}$). Then $\operatorname{LN}(\mathbf{x})R = \sqrt d\,\mathbf{x}R/\lVert\mathbf{x}\rVert$, while $\operatorname{LN}(\mathbf{x}R) = \sqrt d\,\mathbf{x}RP/\lVert\mathbf{x}RP\rVert$ is orthogonal to $\mathbf{1}$. Equality forces $\mathbf{x}R\perp\mathbf{1}$. So $R$ maps the centred subspace into itself, and therefore maps its orthogonal complement, the line of $\mathbf{1}$, to itself: $\mathbf{1}R = \pm\mathbf{1}$. Consequently [[#prop-rotation]] extends to LayerNorm models exactly for rotations of the $(d-1)$-dimensional centred subspace (with $\mathbf{1}$ fixed or flipped).
:::
:::

::: exercise Measuring copying {level=3}
Propose a scalar measure of how much a head's OV circuit $M = W_EW_{OV}W_U$ "copies", and compute it for the random head of [[#sec-code]] (modify the listing). Elhage et al. used the eigenvalues of $M$: why are eigenvalues natural here, and why is it legitimate to take eigenvalues of a matrix whose rows and columns are both indexed by tokens?
::: solution
$M$ maps a token (the one attended to) to logits over tokens, so rows and columns are indexed by the same set and $M$ is a linear map from the token space to itself; its eigenvectors are token combinations that the head maps to multiples of themselves. A copying head raises the logit of whatever it attends to, so $M\approx\lambda I$ plus smaller terms, with $\lambda > 0$: its eigenvalues have mostly positive real parts. Elhage et al. summarised this by $\sum_i\lambda_i/\sum_i\lvert\lambda_i\rvert$, which is $+1$ when all eigenvalues are positive and $-1$ when all are negative. Since $M = (W_EW_V)(W_OW_U)$ has rank at most $d_k$, its non-zero eigenvalues are those of the small $d_k\times d_k$ matrix $(W_OW_U)(W_EW_V)$ (the non-zero eigenvalues of $AB$ and $BA$ coincide), which is how they are computed for a real vocabulary. A more direct diagnostic is the fraction of tokens $v$ whose own logit is the one most raised when the head attends to $v$, $[M_{v,v} = \max_wM_{v,w}]$. Appending to the listing

```python
print("tokens most boosted by attending to themselves:", sum(OV[v][v] == max(OV[v]) for v in range(V)), "of", V)
S = mm(mm(WO, W_U), mm(W_E, WV))                   # (DK, DK): same non-zero eigenvalues as OV
t, det = S[0][0] + S[1][1], S[0][0] * S[1][1] - S[0][1] * S[1][0]
disc = t * t - 4 * det                             # real here; complex roots need cmath
lam = [(t + math.sqrt(disc)) / 2, (t - math.sqrt(disc)) / 2]
print("non-zero eigenvalues:", [round(l, 3) for l in lam])
print("copying score:", round(sum(lam) / sum(abs(l) for l in lam), 3))
```

prints `0 of 5`, eigenvalues $15.683$ and $-3.352$, and a score of $0.648$. The two diagnostics disagree: no token is most boosted by attending to itself, yet the eigenvalue score is clearly positive, because the large positive eigenvalue belongs to a token *combination*, not to individual tokens. Summary statistics of a circuit are useful filters across many heads, but a claim that a head copies should be checked on the diagonal and on actual inputs. A trained induction head passes both tests.
:::
:::
