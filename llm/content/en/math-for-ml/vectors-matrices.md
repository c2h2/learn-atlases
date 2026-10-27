When a language model reads the word *cat*, the first thing it does is replace it with a list of numbers — a vector of a few hundred or a few thousand entries. Everything that follows is arithmetic on such lists: they are added, scaled, compared by dot products and pushed through matrices, millions of times per token. A Transformer layer is, to a first approximation, a handful of matrix multiplications with a few simple nonlinear functions in between, and the time and money it takes to train a model are, to a first approximation, the time it takes to multiply matrices.

This chapter collects the linear algebra that the rest of the atlas uses all the time. It is not a full course — the Maths Atlas has one in [Linear algebra](/learn/maths/lesson.php?c=linear-algebra&l=matrices) — but a working toolkit, chosen for machine learning: vectors and their geometry, matrices as linear maps, the several ways of reading a matrix product, tensors with named shapes, and what a matrix multiplication costs on real hardware. Keep a pencil handy: the single most useful habit in deep learning is writing the shape of every array next to it.

## Vectors as data {#sec-vectors}

::: definition Vectors, dot product and norm {#def-vector}
A **vector** $\mathbf{x}\in\R^d$ is an ordered list of $d$ real numbers $(x_1, \dots, x_d)$. Vectors are added and scaled entrywise. The **dot product** (inner product) of $\mathbf{x}, \mathbf{y}\in\R^d$ is

$$
\mathbf{x}\cdot\mathbf{y} = \mathbf{x}^\top\mathbf{y} = \sum_{i=1}^d x_iy_i,
$$

and the **Euclidean norm** is $\lVert\mathbf{x}\rVert = \sqrt{\mathbf{x}\cdot\mathbf{x}}$. For nonzero vectors the **cosine similarity** is

$$
\cos(\mathbf{x}, \mathbf{y}) = \frac{\mathbf{x}\cdot\mathbf{y}}{\lVert\mathbf{x}\rVert\,\lVert\mathbf{y}\rVert}.
$$ {#eq-cosine}
:::

In machine learning a vector is usually not an arrow in physical space but a **feature vector**: a description of an object by $d$ numbers. A pixel image of $28\times 28$ grey values is a vector in $\R^{784}$; a token in GPT-2 small is a vector in $\R^{768}$. The geometric language still applies and is very useful: two vectors that point in nearly the same direction describe similar objects, a vector's length measures how strongly a feature is present, and a dot product measures how much one vector "agrees" with another.

The geometry rests on one inequality, which guarantees that [[#eq-cosine]] always lies between $-1$ and $1$ and so really is the cosine of an angle.

::: proposition Cauchy–Schwarz inequality {#prop-cauchy-schwarz}
For all $\mathbf{x}, \mathbf{y}\in\R^d$,

$$
\lvert\mathbf{x}\cdot\mathbf{y}\rvert\le\lVert\mathbf{x}\rVert\,\lVert\mathbf{y}\rVert,
$$

with equality if and only if one vector is a scalar multiple of the other.
:::

::: proof
If $\mathbf{y} = \mathbf{0}$ both sides are $0$. Otherwise consider, for real $t$,

$$
0\le\lVert\mathbf{x} - t\mathbf{y}\rVert^2 = \lVert\mathbf{x}\rVert^2 - 2t\,\mathbf{x}\cdot\mathbf{y} + t^2\lVert\mathbf{y}\rVert^2.
$$

A quadratic in $t$ with positive leading coefficient that is never negative has discriminant at most zero: $4(\mathbf{x}\cdot\mathbf{y})^2 - 4\lVert\mathbf{x}\rVert^2\lVert\mathbf{y}\rVert^2\le 0$, which is the inequality. Equality means the discriminant is zero, so the quadratic has a root $t_0$ with $\lVert\mathbf{x} - t_0\mathbf{y}\rVert = 0$, that is $\mathbf{x} = t_0\mathbf{y}$; conversely if $\mathbf{x} = t_0\mathbf{y}$ both sides equal $\lvert t_0\rvert\lVert\mathbf{y}\rVert^2$.
:::

::: example Cosine similarity of three embeddings {#ex-cosine}
A toy model embeds three words in $\R^4$:

$$
\mathbf{a} = (0.2, 0.9, -0.4, 0.1),\quad \mathbf{b} = (0.3, 0.7, -0.2, 0.0),\quad \mathbf{c} = (-0.5, 0.1, 0.8, 0.3).
$$

Which two words does the model treat as most similar?
::: solution
The dot products are $\mathbf{a}\cdot\mathbf{b} = 0.06 + 0.63 + 0.08 + 0 = 0.77$, $\mathbf{a}\cdot\mathbf{c} = -0.10 + 0.09 - 0.32 + 0.03 = -0.30$ and $\mathbf{b}\cdot\mathbf{c} = -0.15 + 0.07 - 0.16 + 0 = -0.24$. The norms are $\lVert\mathbf{a}\rVert = \sqrt{1.02} = 1.010$, $\lVert\mathbf{b}\rVert = \sqrt{0.62} = 0.787$ and $\lVert\mathbf{c}\rVert = \sqrt{0.99} = 0.995$. Hence

$$
\cos(\mathbf{a}, \mathbf{b}) = \frac{0.77}{1.010\cdot0.787} = 0.968,\qquad \cos(\mathbf{a}, \mathbf{c}) = -0.299,\qquad \cos(\mathbf{b}, \mathbf{c}) = -0.306.
$$

Words $\mathbf{a}$ and $\mathbf{b}$ point almost the same way (an angle of about $14^\circ$); $\mathbf{c}$ points slightly away from both. Retrieval systems and embedding search rank documents by exactly this number.
:::
:::

The dot product also has a geometric reading as a **projection**. The component of $\mathbf{v}$ along a nonzero vector $\mathbf{u}$ is

$$
\proj_{\mathbf{u}}\mathbf{v} = \frac{\mathbf{u}\cdot\mathbf{v}}{\mathbf{u}\cdot\mathbf{u}}\,\mathbf{u},
$$ {#eq-proj}

and the remainder $\mathbf{v} - \proj_{\mathbf{u}}\mathbf{v}$ is perpendicular to $\mathbf{u}$: its dot product with $\mathbf{u}$ is $\mathbf{u}\cdot\mathbf{v} - \mathbf{u}\cdot\mathbf{v} = 0$. A large positive dot product therefore means that a large part of $\mathbf{v}$ lies along $\mathbf{u}$. This is how the attention score $\mathbf{q}\cdot\mathbf{k}$ of [[transformers/self-attention]] should be read.

::: widget projection
u: 3,1
v: 1,2
caption: The projection of $\mathbf{v}$ onto $\mathbf{u}$ and the perpendicular remainder. With $\mathbf{u} = (3,1)$ and $\mathbf{v} = (1,2)$, $\mathbf{u}\cdot\mathbf{v} = 5$ and $\mathbf{u}\cdot\mathbf{u} = 10$, so the projection is $(1.5, 0.5)$ and the remainder $(-0.5, 1.5)$. Drag either vector and watch the projection shrink to zero as the two become perpendicular.
:::

Other norms appear in machine learning as well. The $\ell_1$ norm $\lVert\mathbf{x}\rVert_1 = \sum_i\lvert x_i\rvert$ encourages sparse solutions when used as a penalty; the $\ell_\infty$ norm $\max_i\lvert x_i\rvert$ measures the largest entry, which matters when numbers must fit a low-precision format. Unless stated otherwise, $\lVert\cdot\rVert$ is the Euclidean $\ell_2$ norm.

## Matrices as linear maps {#sec-maps}

::: definition Matrix and matrix–vector product {#def-matrix}
An $m\times n$ **matrix** $W\in\R^{m\times n}$ is a rectangular array of numbers $W_{ij}$ with $m$ rows and $n$ columns. It acts on $\mathbf{x}\in\R^n$ by

$$
(W\mathbf{x})_i = \sum_{j=1}^n W_{ij}x_j,\qquad i = 1, \dots, m,
$$

giving a vector in $\R^m$. The map $\mathbf{x}\mapsto W\mathbf{x}$ is **linear**: $W(\alpha\mathbf{x} + \beta\mathbf{y}) = \alpha W\mathbf{x} + \beta W\mathbf{y}$. Conversely every linear map $\R^n\to\R^m$ is multiplication by exactly one matrix, whose $j$-th column is the image of the $j$-th standard basis vector $\mathbf{e}_j$.
:::

There are two ways to read $W\mathbf{x}$, and both are used constantly.

- **Row view.** Entry $i$ of $W\mathbf{x}$ is the dot product of row $i$ of $W$ with $\mathbf{x}$. Each row is a "detector", and the output lists how strongly $\mathbf{x}$ agrees with each detector. The output logits of a language model are of this kind: one row per vocabulary entry, scored against the final hidden state.
- **Column view.** $W\mathbf{x} = x_1\mathbf{w}_1 + \dots + x_n\mathbf{w}_n$ is a combination of the columns $\mathbf{w}_j$ with weights $x_j$. Each input coordinate says how much of its column to add to the output.

The column view explains a fact used in every language model: looking up an embedding *is* a matrix product. If $E\in\R^{\lvert\mathcal{V}\rvert\times d}$ holds one $d$-dimensional row per token and $\mathbf{e}_i$ is the one-hot vector of token $i$, then $\mathbf{e}_i^\top E$ is row $i$ of $E$. Libraries implement this as an indexing operation, because multiplying by a vector that is almost all zeros would waste work, but mathematically the embedding layer is a linear map, and its gradient is computed like that of any other.

A linear map of the plane is easiest to understand by watching what it does to a grid. The figure below shows the matrix $\begin{pmatrix}2&1\\1&2\end{pmatrix}$, which stretches the plane by $3$ along the diagonal $(1, 1)$ and leaves the direction $(1, -1)$ unchanged in length; the shaded square shows how areas scale.

::: widget transform2d
matrix: 2,1; 1,2
eigen: true
caption: A linear map of the plane. The columns of the matrix are the images of the two basis vectors, and the image of the unit square has area $\lvert\det W\rvert = 3$. The directions that are only stretched, not turned, are the eigenvectors of the next chapter. Edit the entries: a matrix with determinant $0$ squashes the whole plane onto a line.
:::

### The matrix product {#sec-product}

::: definition Matrix multiplication {#def-matmul}
For $A\in\R^{m\times k}$ and $B\in\R^{k\times n}$ the **product** $AB\in\R^{m\times n}$ is

$$
(AB)_{ij} = \sum_{p=1}^k A_{ip}B_{pj}.
$$

It is defined only when the inner dimensions agree: $(m\times k)(k\times n)\to(m\times n)$. The **transpose** $A^\top\in\R^{k\times m}$ has entries $(A^\top)_{ij} = A_{ji}$.
:::

The definition is not arbitrary: it is the only rule that makes the product of matrices represent the composition of maps. If $\mathbf{x}\mapsto B\mathbf{x}$ is applied first and $\mathbf{y}\mapsto A\mathbf{y}$ second, the result is $\mathbf{x}\mapsto A(B\mathbf{x})$, and $(A(B\mathbf{x}))_i = \sum_pA_{ip}\sum_jB_{pj}x_j = \sum_j(AB)_{ij}x_j$. So **$AB$ means "first $B$, then $A$"**, and a network that applies $W_1$ and then $W_2$ to a vector computes $W_2W_1\mathbf{x}$. Because composition of maps is associative, so is the product: $(AB)C = A(BC)$. It is not commutative.

::: proposition Three views of a product {#prop-views}
Let $A\in\R^{m\times k}$ have columns $\mathbf{a}_1, \dots, \mathbf{a}_k\in\R^m$ and rows $\boldsymbol{\alpha}_1^\top, \dots, \boldsymbol{\alpha}_m^\top$, and let $B\in\R^{k\times n}$ have columns $\mathbf{b}^{(1)}, \dots, \mathbf{b}^{(n)}$ and rows $\boldsymbol{\beta}_1^\top, \dots, \boldsymbol{\beta}_k^\top\in\R^{1\times n}$. Then

1. (dot products) $(AB)_{ij} = \boldsymbol{\alpha}_i\cdot\mathbf{b}^{(j)}$;
2. (columns) column $j$ of $AB$ is $A\mathbf{b}^{(j)}$;
3. (outer products) $AB = \sum_{p=1}^k\mathbf{a}_p\boldsymbol{\beta}_p^\top$, a sum of $k$ matrices of rank at most one.

Moreover $(AB)^\top = B^\top A^\top$.
:::

::: proof
All three are the same double sum $\sum_pA_{ip}B_{pj}$ grouped differently. In (1) the sum over $p$ is the dot product of row $i$ of $A$ with column $j$ of $B$. In (2), for fixed $j$, the vector with entries $\sum_pA_{ip}B_{pj}$ is $A$ applied to column $j$ of $B$. In (3) the $(i, j)$ entry of $\mathbf{a}_p\boldsymbol{\beta}_p^\top$ is $A_{ip}B_{pj}$, and summing over $p$ gives $(AB)_{ij}$. Finally $((AB)^\top)_{ij} = (AB)_{ji} = \sum_pA_{jp}B_{pi} = \sum_p(B^\top)_{ip}(A^\top)_{pj} = (B^\top A^\top)_{ij}$.
:::

Each view is the natural one somewhere. The dot-product view is how attention scores $QK^\top$ are defined. The column view is how a layer acts on a batch of inputs stored as columns. The outer-product view is how gradients of weight matrices look — the gradient of a linear layer, derived in [[math-for-ml/gradients]], is a sum of outer products over the batch — and it is the starting point for low-rank approximation in [[math-for-ml/matrix-decompositions]].

::: example A product three ways, and order matters {#ex-product}
Compute $AB$ for

$$
A = \begin{pmatrix}1&2&0\\0&1&-1\end{pmatrix}\in\R^{2\times 3},\qquad B = \begin{pmatrix}2&1\\0&3\\1&1\end{pmatrix}\in\R^{3\times 2}.
$$

Then compare $RS$ and $SR$ for the rotation $R = \begin{pmatrix}0&-1\\1&0\end{pmatrix}$ by $90^\circ$ and the scaling $S = \begin{pmatrix}2&0\\0&1\end{pmatrix}$.
::: solution
By dot products: $(AB)_{11} = (1,2,0)\cdot(2,0,1) = 2$, $(AB)_{12} = (1,2,0)\cdot(1,3,1) = 7$, $(AB)_{21} = (0,1,-1)\cdot(2,0,1) = -1$, $(AB)_{22} = (0,1,-1)\cdot(1,3,1) = 2$. By outer products,

$$
AB = \begin{pmatrix}1\\0\end{pmatrix}(2, 1) + \begin{pmatrix}2\\1\end{pmatrix}(0, 3) + \begin{pmatrix}0\\-1\end{pmatrix}(1, 1) = \begin{pmatrix}2&1\\0&0\end{pmatrix} + \begin{pmatrix}0&6\\0&3\end{pmatrix} + \begin{pmatrix}0&0\\-1&-1\end{pmatrix} = \begin{pmatrix}2&7\\-1&2\end{pmatrix}.
$$

The shapes are $(2\times3)(3\times2)\to2\times2$; the product $BA$ also exists but is $3\times3$, a different object altogether.

For the square matrices, $RS = \begin{pmatrix}0&-1\\2&0\end{pmatrix}$ (stretch the $x$-axis, then rotate) while $SR = \begin{pmatrix}0&-2\\1&0\end{pmatrix}$ (rotate, then stretch the $x$-axis). Applied to $\mathbf{e}_1 = (1, 0)$, the first gives $(0, 2)$ and the second $(0, 1)$.
:::
:::

### Rank, inverses and determinants {#sec-rank}

The **column space** of $W\in\R^{m\times n}$ is the set of all outputs $W\mathbf{x}$, a subspace of $\R^m$; its dimension is the **rank** of $W$, which equals the number of linearly independent columns and also the number of linearly independent rows. A matrix $\mathbf{u}\mathbf{v}^\top$ built from two nonzero vectors has rank exactly one: every output $\mathbf{u}(\mathbf{v}^\top\mathbf{x})$ is a multiple of $\mathbf{u}$. Rank bounds how much information a map can pass on: a $4096\times4096$ matrix of rank $8$ squeezes every input through an $8$-dimensional bottleneck. Low-rank matrices, and why trained weight updates are often nearly low-rank, are the subject of [[math-for-ml/matrix-decompositions]].

A square matrix $W\in\R^{n\times n}$ is **invertible** if there is a matrix $W^{-1}$ with $WW^{-1} = W^{-1}W = I$; this happens exactly when its rank is $n$, and exactly when its **determinant** $\det W$ is nonzero. Geometrically $\lvert\det W\rvert$ is the factor by which $W$ scales volumes (the area of the image of the unit square in the figure), and $\det W = 0$ means some direction is flattened to zero. In machine learning, inverses are rarely computed explicitly: solving $W\mathbf{x} = \mathbf{b}$ by a factorisation is cheaper and more accurate than forming $W^{-1}$. The full theory is in the Maths Atlas lessons on [linear maps](/learn/maths/lesson.php?c=linear-algebra&l=linear-maps) and [determinants](/learn/maths/lesson.php?c=linear-algebra&l=determinants).

::: definition Orthogonal matrix {#def-orthogonal}
A square matrix $Q\in\R^{n\times n}$ is **orthogonal** if $Q^\top Q = I$, that is, its columns are unit vectors perpendicular to each other. Then $Q^{-1} = Q^\top$, and $Q$ preserves dot products and lengths: $(Q\mathbf{x})\cdot(Q\mathbf{y}) = \mathbf{x}^\top Q^\top Q\mathbf{y} = \mathbf{x}\cdot\mathbf{y}$.
:::

Rotations and reflections are orthogonal. They are the "harmless" linear maps — they change the coordinate system but not the geometry — and they appear in the decompositions of the next chapter and in the rotary position embeddings of [[transformers/positional-encoding]], which rotate pairs of query and key coordinates so that dot products depend only on relative position.

## The linear layer {#sec-linear}

::: definition Linear (affine) layer {#def-linear-layer}
A **linear layer** with input width $d_{\text{in}}$ and output width $d_{\text{out}}$ has a weight matrix $W\in\R^{d_{\text{out}}\times d_{\text{in}}}$ and a bias $\mathbf{b}\in\R^{d_{\text{out}}}$ and maps $\mathbf{x}\in\R^{d_{\text{in}}}$ to

$$
\mathbf{y} = W\mathbf{x} + \mathbf{b}\in\R^{d_{\text{out}}}.
$$

It has $d_{\text{out}}d_{\text{in}} + d_{\text{out}}$ parameters. For a batch stored as the rows of $X\in\R^{N\times d_{\text{in}}}$ (one example per row) the same layer is

$$
Y = XW^\top + \mathbf{1}\mathbf{b}^\top\in\R^{N\times d_{\text{out}}},
$$ {#eq-batch-linear}

where adding $\mathbf{1}\mathbf{b}^\top$ means adding $\mathbf{b}^\top$ to every row.
:::

Equation [[#eq-batch-linear]] is just the transpose of $W\mathbf{x} + \mathbf{b}$ applied to each row, using $(W\mathbf{x})^\top = \mathbf{x}^\top W^\top$ from [[#prop-views]]. Deep-learning code stores data with one example per row — the batch dimension first — so this row form is the one you see in practice. In PyTorch, `torch.nn.Linear(d_in, d_out)` stores its weight with shape `(d_out, d_in)` and computes `x @ weight.T + bias`; papers often write the same layer as $XW$ with $W\in\R^{d_{\text{in}}\times d_{\text{out}}}$, as the atlas does for $Q = XW_Q$. Both are correct; the shapes tell you which convention is in use.

A stack of linear layers without anything in between is still one linear layer: $W_2(W_1\mathbf{x} + \mathbf{b}_1) + \mathbf{b}_2 = (W_2W_1)\mathbf{x} + (W_2\mathbf{b}_1 + \mathbf{b}_2)$. This is why neural networks insert a nonlinear **activation function** between layers; without it, depth would add nothing.

::: example The shapes of a feed-forward layer {#ex-ffn-shapes}
The first layer of the feed-forward network in a GPT-2-small block maps $d_{\text{model}} = 768$ to $3072$. It receives a batch of $B = 8$ sequences of $T = 1024$ tokens. Give the shapes of the input, weight and output, the number of parameters, and the number of output entries.
::: solution
The input has shape $(B, T, d_{\text{model}}) = (8, 1024, 768)$. The layer acts on the last axis only, treating the $8\cdot1024 = 8192$ token vectors as a batch of rows: $X\in\R^{8192\times768}$, $W^\top\in\R^{768\times3072}$, output $(8, 1024, 3072)$. The parameters number $768\cdot3072 + 3072 = 2{,}362{,}368$. The output has $8\cdot1024\cdot3072 = 25{,}165{,}824$ entries — over ten times as many numbers as the weights themselves, which is why activations, not weights, dominate memory during training of long sequences.
:::
:::

::: quiz
A tensor `x` has shape `(4, 16, 512)` and `W` has shape `(512, 64)`. What is the shape of `x @ W`?
- [ ] `(4, 16, 512)`
- [x] `(4, 16, 64)`
- [ ] `(4, 64)`
- [ ] The product is not defined, because `x` has three axes
::: solution
Matrix multiplication with a higher-dimensional array acts on the last axis of the left operand: each of the $4\cdot16 = 64$ vectors of length $512$ is multiplied by $W$, producing a vector of length $64$. The leading axes are carried along unchanged, so the result is `(4, 16, 64)`.
:::
:::

## Tensors and shapes {#sec-tensors}

::: definition Tensor (array) {#def-tensor}
In deep learning a **tensor** is a multi-dimensional array of numbers with a **shape** $(n_1, n_2, \dots, n_r)$; $r$ is its number of **axes** (or dimensions, or order). A scalar has shape $()$, a vector $(d)$, a matrix $(m, n)$. The entry of a tensor $X$ of shape $(B, T, d)$ at index $(b, t, i)$ is written $X_{bti}$.
:::

(Mathematicians reserve "tensor" for multilinear maps with a transformation law; the deep-learning usage just means an array, and that is the sense used here.) Language models move a few standard shapes through their layers:

| tensor | shape |
|---|---|
| token ids of a batch | $(B, T)$ |
| embeddings / residual stream | $(B, T, d_{\text{model}})$ |
| queries, keys, values split into heads | $(B, h, T, d_k)$ |
| attention scores | $(B, h, T, T)$ |
| logits | $(B, T, \lvert\mathcal{V}\rvert)$ |

Two rules make arithmetic on such shapes convenient.

**Batched matrix multiplication.** For arrays with shapes $(\dots, m, k)$ and $(\dots, k, n)$ the operator `@` multiplies the last two axes as matrices and treats all leading axes as a batch, giving $(\dots, m, n)$. With queries and keys of shape $(B, h, T, d_k)$, `Q @ K.transpose(-2, -1)` is a batch of $B\cdot h$ products $(T, d_k)(d_k, T)$, with result $(B, h, T, T)$.

**Broadcasting.** When two arrays of different shapes are combined entrywise, their shapes are aligned from the right; an axis of length $1$ (or a missing leading axis) is stretched to match the other. Adding a bias of shape $(d)$ to activations of shape $(B, T, d)$ adds it to every token; adding a mask of shape $(T, T)$ to scores of shape $(B, h, T, T)$ applies it to every sequence and head.

**Einstein summation** makes the index bookkeeping explicit: an expression such as `einsum('bhtd,bhsd->bhts', Q, K)` names every axis, multiplies along the repeated index $d$ and sums it away. It is the compact form of $S_{bhts} = \sum_dQ_{bhtd}K_{bhsd}$, and it is often the clearest way to write — and check — a tensor formula.

::: warning Elementwise product, matrix product and silent broadcasting
`A * B` multiplies entry by entry (the **Hadamard product** $A\odot B$); `A @ B` is the matrix product. Confusing the two often raises no error at all: for two $(n, n)$ arrays both are defined. Broadcasting can hide a second bug: subtracting an array of shape $(B,)$ from one of shape $(B, 1)$ produces a $(B, B)$ array rather than $B$ differences, and a loss computed from it looks perfectly plausible. Check shapes with assertions at every step of new code; a wrong shape is the most common bug in deep learning, and the cheapest to catch.
:::

## The cost of linear algebra {#sec-cost}

Almost all the arithmetic in training and running a language model happens in matrix multiplications, so it pays to count it.

::: proposition FLOPs of a matrix product {#prop-flops}
Computing $AB$ for $A\in\R^{m\times k}$ and $B\in\R^{k\times n}$ by the definition takes $mnk$ multiplications and $mn(k-1)$ additions, about $2mnk$ floating-point operations (FLOPs). A matrix–vector product with $W\in\R^{m\times k}$ takes about $2mk$.
:::

::: proof
There are $mn$ entries, each a dot product of length $k$: $k$ products and $k - 1$ additions. Summing gives $mnk + mn(k-1) = 2mnk - mn\approx 2mnk$ for large $k$. The matrix–vector case is $n = 1$.
:::

A useful consequence: a linear layer with $P = d_{\text{in}}d_{\text{out}}$ weights costs $2P$ FLOPs per token in the forward pass — two FLOPs per parameter per token — which is the origin of the rule "forward pass $\approx 2N$ FLOPs per token" for a model with $N$ parameters (see [[transformers/transformer-block]]).

Counting FLOPs is not the whole story, because numbers must also be moved from memory to the arithmetic units, and on modern accelerators arithmetic is much faster than memory. The ratio that decides which one limits the speed is the **arithmetic intensity**: FLOPs performed per byte moved. If each number occupies $s$ bytes and the three matrices of $AB$ are each read or written once, the product moves $s(mk + kn + mn)$ bytes.

::: example Compute-bound and memory-bound {#ex-intensity}
In 16-bit precision ($s = 2$ bytes), compare (a) the product of two $4096\times4096$ matrices and (b) the product of a $4096\times4096$ weight matrix with a single vector, as when a model generates one token at a time. Take as a rough guide an accelerator that does $10^{15}$ FLOP/s and moves $3\times10^{12}$ bytes/s.
::: solution
(a) FLOPs: $2\cdot4096^3 = 1.37\times10^{11}$. Bytes: $3\cdot4096^2\cdot2 = 1.01\times10^{8}$. Intensity: $1365$ FLOPs per byte. Arithmetic takes $1.37\times10^{11}/10^{15} = 0.14$ ms and memory traffic $1.01\times10^8/(3\times10^{12}) = 0.034$ ms, so the product is **compute-bound**: the arithmetic units are the bottleneck.

(b) FLOPs: $2\cdot4096^2 = 3.36\times10^7$. Bytes: about $4096^2\cdot2 = 3.36\times10^7$ for the matrix (the vectors are negligible). Intensity: about $1$ FLOP per byte. Arithmetic would take $0.034\ \mu$s but reading the matrix takes $11\ \mu$s, so this product is **memory-bound** by a factor of over $300$: the arithmetic units mostly wait.
:::
:::

This single comparison explains much of the engineering of language models. Training processes thousands of tokens per weight matrix at once and is compute-bound; generating text one token at a time reads every weight for very little arithmetic and is memory-bound, which is why inference systems batch many users together, cache keys and values, and store weights in fewer bits. The numbers in the example are round orders of magnitude for a data-centre accelerator as of 2026; the ratio, a few hundred FLOPs per byte, has been of that size for several hardware generations.

The definition of the product is also a perfectly good algorithm. Here it is in plain Python, with the outer-product form of [[#prop-views]] alongside:

```python
def matmul(A, B):
    # A: (m, k) and B: (k, n) as lists of rows; returns (m, n)
    m, k, n = len(A), len(B), len(B[0])
    assert all(len(row) == k for row in A), "inner dimensions differ"
    return [[sum(A[i][p] * B[p][j] for p in range(k)) for j in range(n)]
            for i in range(m)]

def outer_sum(A, B):
    # sum over p of (column p of A) times (row p of B): k rank-one matrices
    m, k, n = len(A), len(B), len(B[0])
    C = [[0.0] * n for _ in range(m)]
    for p in range(k):
        for i in range(m):
            for j in range(n):
                C[i][j] += A[i][p] * B[p][j]
    return C

A = [[1, 2, 0],
     [0, 1, -1]]           # (2, 3)
B = [[2, 1],
     [0, 3],
     [1, 1]]               # (3, 2)
print(matmul(A, B))        # (2, 2)
print(outer_sum(A, B))
m, k, n = 2, 3, 2
print("FLOPs ~ 2mkn =", 2 * m * k * n)
```

```text
[[2, 7], [-1, 2]]
[[2.0, 7.0], [-1.0, 2.0]]
FLOPs ~ 2mkn = 24
```

Both loops do the same $mnk$ multiply–adds in a different order. Real libraries (BLAS on CPUs, cuBLAS and similar on GPUs) reorder the loops further into tiles that fit in fast on-chip memory, so that each number fetched from main memory is reused many times; the arithmetic is unchanged, only the traffic shrinks. Never multiply matrices with Python loops in practice — a library call is many thousands of times faster.

::: example The embedding and output matrices of GPT-2 small {#ex-embedding}
GPT-2 small has a vocabulary of $\lvert\mathcal{V}\rvert = 50{,}257$ tokens and width $d = 768$. How many parameters does the embedding matrix have, and what does the output layer compute if it reuses the same matrix (weight tying)? How many FLOPs per token does that output layer cost?
::: solution
$E\in\R^{50257\times768}$ has $50{,}257\cdot768 = 38{,}597{,}376$ parameters — almost a third of the model's $124$ million. With tied weights the logits for a final hidden state $\mathbf{h}\in\R^{768}$ are $\mathbf{z} = E\mathbf{h}\in\R^{50257}$: by the row view, logit $i$ is the dot product of $\mathbf{h}$ with the embedding of token $i$, so the model predicts tokens whose embeddings point the way $\mathbf{h}$ points. By [[#prop-flops]] this costs about $2\cdot50{,}257\cdot768\approx7.7\times10^7$ FLOPs per token.
:::
:::

::: history
Determinants are older than matrices: Seki Takakazu in Japan (1683) and Leibniz in Europe (1693) used them to solve linear systems. Hermann Grassmann's *Ausdehnungslehre* (1844) developed vectors in any number of dimensions, though it was little read at the time. James Joseph Sylvester coined the word *matrix* in 1850, and Arthur Cayley's *A Memoir on the Theory of Matrices* (1858) defined matrix multiplication as composition and treated matrices as algebraic objects in their own right. Einstein introduced his summation convention in 1916 for the tensors of general relativity — the ancestor of `einsum`. Standard interfaces for numerical linear algebra followed with the first BLAS (Lawson, Hanson, Kincaid and Krogh, 1979). The use of graphics processors for neural networks was demonstrated by Raina, Madhavan and Ng (2009), and AlexNet (Krizhevsky, Sutskever and Hinton, 2012) made GPU training of large networks the norm; since then the speed of matrix multiplication on accelerators has largely set the pace of deep learning.
:::

::: summary
- Vectors are feature lists; dot products, norms and cosine similarity measure agreement and size, and Cauchy–Schwarz keeps the cosine in $[-1, 1]$.
- A matrix is a linear map; $AB$ means "first $B$, then $A$", is associative but not commutative, and can be read as dot products, as columns, or as a sum of outer products.
- A linear layer is $\mathbf{y} = W\mathbf{x} + \mathbf{b}$, or $Y = XW^\top + \mathbf{b}$ for a batch of rows; embedding lookup is multiplication by a one-hot vector.
- Tensors are arrays with shapes such as $(B, T, d_{\text{model}})$; `@` multiplies the last two axes and broadcasts the rest. Track shapes at every step.
- A matrix product costs about $2mnk$ FLOPs; whether it is limited by arithmetic or by memory depends on its arithmetic intensity, which separates compute-bound training from memory-bound token-by-token generation.
:::

## Exercises

::: exercise A cosine by hand {level=1 check="4/(3*sqrt(5))"}
Compute the cosine similarity of $\mathbf{u} = (1, 2, 2)$ and $\mathbf{v} = (2, 0, 1)$.
::: solution
$\mathbf{u}\cdot\mathbf{v} = 2 + 0 + 2 = 4$, $\lVert\mathbf{u}\rVert = \sqrt{1 + 4 + 4} = 3$ and $\lVert\mathbf{v}\rVert = \sqrt{4 + 0 + 1} = \sqrt5$. The cosine is $4/(3\sqrt5)\approx0.596$, an angle of about $53^\circ$.
:::
:::

::: exercise Shapes of a projection {level=1 check="262144"}
A batch of activations has shape $(32, 128, 512)$ and is multiplied by $W_Q\in\R^{512\times64}$. What is the shape of the result, and how many entries does it have?
::: solution
The product acts on the last axis: $(32, 128, 512)\cdot(512, 64)\to(32, 128, 64)$, with $32\cdot128\cdot64 = 262{,}144$ entries.
:::
:::

::: exercise Parameters of a layer {level=1 check="4198400"}
How many parameters does `torch.nn.Linear(1024, 4096)` have, and what is the shape of its weight?
::: solution
The weight has shape $(4096, 1024)$ (output width first) and $1024\cdot4096 = 4{,}194{,}304$ entries; the bias has $4096$. The total is $4{,}198{,}400$.
:::
:::

::: exercise FLOPs of a projection {level=2 check="2*4*2048*4096*11008"}
A batch of $B = 4$ sequences of $T = 2048$ tokens with width $4096$ passes through a linear layer of output width $11{,}008$ (no bias). How many FLOPs does the forward pass of this layer take?
::: solution
There are $BT = 8192$ token vectors, so the product is $(8192\times4096)(4096\times11008)$. By [[#prop-flops]] it takes $2\cdot8192\cdot4096\cdot11008 = 7.39\times10^{11}$ FLOPs, that is $2$ FLOPs for each of the $4096\cdot11008 = 45{,}088{,}768$ weights for each of the $8192$ tokens.
:::
:::

::: exercise Projection matrices {level=2 check="1"}
Let $\mathbf{u}\in\R^d$ be nonzero and $P = \mathbf{u}\mathbf{u}^\top/(\mathbf{u}^\top\mathbf{u})$. Show that $P\mathbf{v} = \proj_{\mathbf{u}}\mathbf{v}$, that $P^2 = P$ and $P^\top = P$, and that $P$ has rank one. Compute $P$ for $\mathbf{u} = (3, 1)$ and its trace.
::: solution
$P\mathbf{v} = \mathbf{u}(\mathbf{u}^\top\mathbf{v})/(\mathbf{u}^\top\mathbf{u})$, which is [[#eq-proj]]. $P^2 = \mathbf{u}(\mathbf{u}^\top\mathbf{u})\mathbf{u}^\top/(\mathbf{u}^\top\mathbf{u})^2 = P$: projecting twice changes nothing. $P^\top = (\mathbf{u}\mathbf{u}^\top)^\top/(\mathbf{u}^\top\mathbf{u}) = P$. Every output is a multiple of $\mathbf{u}$, so the rank is one. For $\mathbf{u} = (3, 1)$,

$$
P = \frac1{10}\begin{pmatrix}9&3\\3&1\end{pmatrix},
$$

and $P(1, 2)^\top = (1.5, 0.5)^\top$ as in the figure. The trace is $(9 + 1)/10 = 1$; in general $\tr P = \mathbf{u}^\top\mathbf{u}/\mathbf{u}^\top\mathbf{u} = 1$, the dimension of the line projected onto.
:::
:::

::: exercise Orthogonal maps keep the geometry {level=2}
Let $Q$ be orthogonal. Show that $\lVert Q\mathbf{x}\rVert = \lVert\mathbf{x}\rVert$, that the cosine similarity of $Q\mathbf{x}$ and $Q\mathbf{y}$ equals that of $\mathbf{x}$ and $\mathbf{y}$, and that $\det Q = \pm1$. Why does this mean that applying the same rotation to every query and key leaves attention scores unchanged?
::: solution
$\lVert Q\mathbf{x}\rVert^2 = \mathbf{x}^\top Q^\top Q\mathbf{x} = \mathbf{x}^\top\mathbf{x}$. Dot products are preserved by [[#def-orthogonal]] and norms by the line before, so the cosine, a ratio of the two, is preserved. From $Q^\top Q = I$, $\det(Q^\top)\det Q = (\det Q)^2 = 1$. If every query and key is replaced by $Q\mathbf{q}$ and $Q\mathbf{k}$, each score $(Q\mathbf{q})\cdot(Q\mathbf{k}) = \mathbf{q}\cdot\mathbf{k}$ is unchanged; rotary embeddings work precisely because they apply *different* rotations at different positions, so only the relative rotation survives in the score.
:::
:::

::: exercise Stacked linear layers collapse {level=2 check="4096"}
Two linear layers without an activation in between, $W_1\in\R^{2\times1024}$ followed by $W_2\in\R^{1024\times2}$ (no biases), map $\R^{1024}$ to itself. Write the composition as a single layer. How many parameters do the two factors have together, and what is the largest possible rank of the single equivalent matrix?
::: solution
The composition is $\mathbf{x}\mapsto W_2(W_1\mathbf{x}) = (W_2W_1)\mathbf{x}$, a single linear layer with the $1024\times1024$ matrix $W_2W_1$. The factors have $2\cdot1024 + 1024\cdot2 = 4096$ parameters together, against $1{,}048{,}576$ for a general $1024\times1024$ matrix. The product has rank at most $2$: every output $W_2(W_1\mathbf{x})$ is a combination of the two columns of $W_2$, because the input passes through a $2$-dimensional bottleneck. Composition of linear maps cannot increase rank — the basis of the low-rank adapters of [[math-for-ml/matrix-decompositions]], where a product of two thin matrices stores a rank-$r$ update cheaply.
:::
:::

::: exercise Arithmetic intensity of a square product {level=3 check="900"}
Show that multiplying two $n\times n$ matrices in 16-bit precision, reading and writing each matrix once, has arithmetic intensity about $n/3$ FLOPs per byte. An accelerator is compute-bound when the intensity exceeds about $300$. From which $n$ on is a square product compute-bound?
::: solution
FLOPs $2n^3$ (by [[#prop-flops]]); bytes $3n^2\cdot2 = 6n^2$. The ratio is $2n^3/6n^2 = n/3$. It exceeds $300$ when $n > 900$. Small products — a single token, a tiny batch, a narrow head — therefore run far below the accelerator's peak arithmetic speed, which is one reason why GPU kernels are designed around large tiles and why batching matters so much.
:::
:::

::: exercise Equality in Cauchy–Schwarz {level=3}
Use [[#prop-cauchy-schwarz]] to prove the **triangle inequality** $\lVert\mathbf{x} + \mathbf{y}\rVert\le\lVert\mathbf{x}\rVert + \lVert\mathbf{y}\rVert$, and show that the cosine similarity of $\mathbf{x}$ and $\mathbf{y}$ is $1$ if and only if $\mathbf{y} = c\mathbf{x}$ for some $c > 0$.
::: solution
$\lVert\mathbf{x} + \mathbf{y}\rVert^2 = \lVert\mathbf{x}\rVert^2 + 2\mathbf{x}\cdot\mathbf{y} + \lVert\mathbf{y}\rVert^2\le\lVert\mathbf{x}\rVert^2 + 2\lVert\mathbf{x}\rVert\lVert\mathbf{y}\rVert + \lVert\mathbf{y}\rVert^2 = (\lVert\mathbf{x}\rVert + \lVert\mathbf{y}\rVert)^2$; take square roots. If the cosine is $1$, then $\mathbf{x}\cdot\mathbf{y} = \lVert\mathbf{x}\rVert\lVert\mathbf{y}\rVert$, equality holds in Cauchy–Schwarz, so $\mathbf{y} = c\mathbf{x}$; substituting gives $c\lVert\mathbf{x}\rVert^2 = \lvert c\rvert\lVert\mathbf{x}\rVert^2$, so $c > 0$. Conversely, $\mathbf{y} = c\mathbf{x}$ with $c > 0$ gives $\cos = c\lVert\mathbf{x}\rVert^2/(\lVert\mathbf{x}\rVert\cdot c\lVert\mathbf{x}\rVert) = 1$.
:::
:::

::: exercise Batched matrix multiplication by hand {level=3}
Write a plain-Python function `bmm(X, Y)` that multiplies two batches of matrices with shapes $(b, m, k)$ and $(b, k, n)$, using `matmul` from [[#sec-cost]], and use it to compute attention scores $S = QK^\top$ for one sequence with two heads, where head 1 has $Q = K = \begin{pmatrix}1&0\\0&1\end{pmatrix}$ and head 2 has $Q = \begin{pmatrix}1&1\\0&2\end{pmatrix}$, $K = \begin{pmatrix}1&0\\1&1\end{pmatrix}$.
::: solution
```python
def matmul(A, B):
    m, k, n = len(A), len(B), len(B[0])
    return [[sum(A[i][p] * B[p][j] for p in range(k)) for j in range(n)]
            for i in range(m)]

def transpose(A):
    return [list(col) for col in zip(*A)]

def bmm(X, Y):
    # X: (b, m, k), Y: (b, k, n) -> (b, m, n)
    assert len(X) == len(Y), "batch sizes differ"
    return [matmul(x, y) for x, y in zip(X, Y)]

Q = [[[1, 0], [0, 1]], [[1, 1], [0, 2]]]   # (heads=2, T=2, d_k=2)
K = [[[1, 0], [0, 1]], [[1, 0], [1, 1]]]   # (2, 2, 2)
S = bmm(Q, [transpose(k) for k in K])      # (2, 2, 2) = (heads, T, T)
print(S)
```

```text
[[[1, 0], [0, 1]], [[1, 2], [0, 2]]]
```

Head 1 gives the identity: each token matches only itself. In head 2, $S_{12} = (1,1)\cdot(1,1) = 2$ and $S_{21} = (0,2)\cdot(1,0) = 0$, so the scores are not symmetric — queries and keys are different projections. In NumPy or PyTorch the whole function is `Q @ K.transpose(-2, -1)`.
:::
:::
