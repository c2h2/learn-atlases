Every model in this course so far has been linear in its features: $h(\mathbf{x}) = \mathbf{w}^\top\boldsymbol\phi(\mathbf{x})$, passed through a sigmoid or softmax for classification. Linear models are well understood — convex losses, closed forms, clean statistics — but what they can learn is decided entirely by the **features** $\boldsymbol\phi(\mathbf{x})$. A linear classifier on raw pixel intensities cannot recognise a cat; on the right features, it can. This chapter is about where features come from. For most of the history of machine learning they were **engineered** by hand. **Kernels** made it possible to use enormous, even infinite, feature spaces implicitly, through inner products alone. **Non-parametric** methods such as nearest neighbours and decision trees build flexible functions directly from the data. And the approach that now dominates — including every language model — **learns** the features: a neural network is a learned feature map followed by a linear model, and an **embedding** is a learned representation of a discrete symbol.

The chapter builds on logistic regression ([[ml-fundamentals/logistic-regression]]), ridge regression ([[ml-fundamentals/linear-regression#def-ridge]]) and the bias–variance view of [[ml-fundamentals/generalisation]]. It ends where the next courses begin: [[neural-networks/perceptrons-mlps]] for learned non-linear features and [[text-and-language/word-embeddings]] for learned representations of words.

## Engineered features {#sec-engineering}

::: definition Feature map {#def-feature-map}
A **feature map** is a function $\boldsymbol\phi\colon\mathcal{X}\to\R^p$ from raw inputs (which may be numbers, categories, strings, images) to vectors. A linear model on features predicts with $\mathbf{w}^\top\boldsymbol\phi(\mathbf{x})$; it is linear in $\mathbf{w}$ but may be arbitrarily non-linear in $\mathbf{x}$.
:::

Some feature maps are bookkeeping; others carry real knowledge about the problem.

- **Standardisation** rescales each numerical feature to mean $0$ and variance $1$ (with statistics from the training set only). It changes nothing a linear model can represent, but it makes gradient descent well conditioned ([[ml-fundamentals/linear-regression#prop-gd]]) and makes penalties treat features comparably.
- **One-hot encoding** represents a categorical variable with $K$ values by $K$ indicator features, exactly one of which is $1$. Encoding categories as integers $1, \dots, K$ instead would impose a spurious order and spacing.
- **Bag of words** represents a document by the counts (or presence, or tf–idf weights) of each vocabulary word, a vector of dimension $\lvert\mathcal{V}\rvert$ that is mostly zeros. A linear classifier on bag-of-words features was the standard text classifier for decades ([[text-and-language/text-classification]]).
- **Transformations and interactions**: logarithms of skewed quantities such as prices, polynomial terms ([[ml-fundamentals/linear-regression#sec-basis]]), and products $x_ix_j$ that let the effect of one feature depend on another.

::: example A bag of words {#ex-bow}
With the vocabulary *(the, cat, dog, sat, on, mat)*, give the bag-of-words count vectors of *the cat sat on the mat* and *the dog sat*, and their inner product. What does the representation lose?
::: solution
The first sentence has counts $(2, 1, 0, 1, 1, 1)$ and the second $(1, 0, 1, 1, 0, 0)$. Their inner product is $2\cdot1 + 1\cdot1 = 3$, from the shared words *the* and *sat*. The representation loses word order — *dog bites man* and *man bites dog* get the same vector — and it treats *cat* and *dog* as unrelated as *cat* and *on*: every pair of distinct words is orthogonal. Learned embeddings ([[#sec-embeddings]]) address the second limitation, sequence models the first.
:::
:::

### What a linear model cannot do {#sec-xor}

The classic example of a pattern that no linear classifier on the raw inputs can represent is **exclusive or**.

::: proposition XOR is not linearly separable {#prop-xor}
No $\mathbf{w}\in\R^2$ and $b\in\R$ classify the four points $(0, 0)$, $(1, 1)$ (label $0$) and $(1, 0)$, $(0, 1)$ (label $1$) correctly by the rule $[\mathbf{w}^\top\mathbf{x} + b > 0]$. With the additional feature $x_1x_2$, a linear classifier does.
:::

::: proof
Suppose such $w_1, w_2, b$ exist. The two points of label $1$ give $w_1 + b > 0$ and $w_2 + b > 0$; adding, $w_1 + w_2 + 2b > 0$. The two points of label $0$ give $b\le0$ and $w_1 + w_2 + b\le0$; adding, $w_1 + w_2 + 2b\le0$. The two conclusions contradict each other. With features $(x_1, x_2, x_1x_2)$, the score $x_1 + x_2 - 2x_1x_2 - \frac12$ is $-\frac12$, $-\frac12$, $\frac12$, $\frac12$ on the four points in the order listed, which is correct.
:::

Minsky and Papert's analysis of such limitations in *Perceptrons* (1969) is often blamed for a decline of interest in neural networks in the 1970s. The resolution is in the proof: the right feature makes the problem linear. The question is how to get the right features without knowing them in advance.

::: widget contour
f: x*y
x: -1.5, 1.5
y: -1.5, 1.5
levels: 12
point: 0.5, 0.5
caption: The product feature $x_1x_2$ as a function on the plane, here with $x = x_1$ and $y = x_2$. It is positive in the first and third quadrants and negative in the other two — exactly the XOR pattern on inputs centred at zero. A linear classifier on the single feature $x_1x_2$ separates the classes with the threshold $0$, although no line in the original plane does. Drag the point: the gradient shows how the feature responds to each coordinate, and it is never zero except at the origin.
:::

### The cost of explicit features {#sec-curse}

The obvious general strategy — include all products of features up to some degree — runs into numbers quickly.

::: proposition Counting polynomial features {#prop-count}
The number of monomials $x_1^{a_1}\cdots x_d^{a_d}$ of total degree at most $k$ in $d$ variables (including the constant) is $\binom{d + k}{k}$.
:::

::: proof
A monomial of degree at most $k$ corresponds to a choice of non-negative integers $a_1, \dots, a_d$ with $a_1 + \dots + a_d\le k$, or equivalently, adding a slack $a_0 = k - \sum_ia_i\ge0$, to non-negative integers $a_0, \dots, a_d$ summing to exactly $k$. By the stars-and-bars argument, arrangements of $k$ stars and $d$ bars in a row correspond one-to-one to such solutions (the bars cut the stars into $d + 1$ groups), and there are $\binom{d + k}{d} = \binom{d + k}{k}$ arrangements.
:::

With $d = 100$ raw features, degree $2$ gives $\binom{102}2 = 5151$ features and degree $3$ gives $\binom{103}3 = 176{,}851$. For an image of $256\times256$ pixels the quadratic features alone number over two billion. And high-dimensional spaces are strange in a way that hurts methods based on distance: in the cube $[-1, 1]^d$, the fraction of volume within the slightly smaller cube $[-0.95, 0.95]^d$ is $0.95^d$, which is $0.006$ for $d = 100$ — almost all the volume is near the boundary, and the distances between random points concentrate around a common value. This cluster of effects is the **curse of dimensionality** (Bellman's phrase, 1957). Kernels avoid the explicit features; learned representations avoid the high-dimensional raw space.

## Kernels {#sec-kernels}

Look again at ridge regression with features $\boldsymbol\phi$. Let $\Phi\in\R^{n\times p}$ be the matrix whose rows are $\boldsymbol\phi(\mathbf{x}_i)^\top$, possibly with $p$ huge.

::: proposition Ridge regression depends only on inner products {#prop-kernel-ridge}
The ridge estimate $\hat{\mathbf{w}} = (\Phi^\top\Phi + \lambda I_p)^{-1}\Phi^\top\mathbf{y}$ can be written $\hat{\mathbf{w}} = \Phi^\top\boldsymbol\alpha$ with

$$
\boldsymbol\alpha = (K + \lambda I_n)^{-1}\mathbf{y},\qquad K_{ij} = \boldsymbol\phi(\mathbf{x}_i)^\top\boldsymbol\phi(\mathbf{x}_j),
$$

and its prediction at a new input is $\hat f(\mathbf{x}) = \sum_{i=1}^n\alpha_i\,\boldsymbol\phi(\mathbf{x}_i)^\top\boldsymbol\phi(\mathbf{x})$. Only inner products of feature vectors are needed.
:::

::: proof
The identity $\Phi^\top(\Phi\Phi^\top + \lambda I_n) = (\Phi^\top\Phi + \lambda I_p)\Phi^\top$ holds by multiplying out. Both bracketed matrices are invertible for $\lambda > 0$, so $(\Phi^\top\Phi + \lambda I_p)^{-1}\Phi^\top = \Phi^\top(\Phi\Phi^\top + \lambda I_n)^{-1}$. Applying both sides to $\mathbf{y}$ and noting $\Phi\Phi^\top = K$ gives $\hat{\mathbf{w}} = \Phi^\top\boldsymbol\alpha$. Then $\hat{\mathbf{w}}^\top\boldsymbol\phi(\mathbf{x}) = \boldsymbol\alpha^\top\Phi\boldsymbol\phi(\mathbf{x}) = \sum_i\alpha_i\boldsymbol\phi(\mathbf{x}_i)^\top\boldsymbol\phi(\mathbf{x})$.
:::

The computation now involves an $n\times n$ system instead of a $p\times p$ one, and the features appear only through $k(\mathbf{x}, \mathbf{x}') = \boldsymbol\phi(\mathbf{x})^\top\boldsymbol\phi(\mathbf{x}')$. If that inner product can be computed without forming $\boldsymbol\phi$, the feature space can be as large as we like. This is the **kernel trick**.

::: definition Positive semi-definite kernel {#def-kernel}
A function $k\colon\mathcal{X}\times\mathcal{X}\to\R$ is a **(positive semi-definite) kernel** if it is symmetric and, for every finite set of inputs $\mathbf{x}_1, \dots, \mathbf{x}_m$, the **Gram matrix** $K_{ij} = k(\mathbf{x}_i, \mathbf{x}_j)$ is positive semi-definite. Standard examples on $\R^d$:

- the **polynomial kernel** $k(\mathbf{x}, \mathbf{z}) = (1 + \mathbf{x}^\top\mathbf{z})^k$;
- the **Gaussian** or **RBF** (radial basis function) kernel $k(\mathbf{x}, \mathbf{z}) = \exp(-\gamma\lVert\mathbf{x} - \mathbf{z}\rVert^2)$, $\gamma > 0$.
:::

Every inner product of features is a kernel, because $\mathbf{a}^\top K\mathbf{a} = \lVert\sum_ia_i\boldsymbol\phi(\mathbf{x}_i)\rVert^2\ge0$. The converse is the deep fact: by the Moore–Aronszajn theorem (Aronszajn, 1950), every positive semi-definite kernel is the inner product $\langle\boldsymbol\phi(\mathbf{x}), \boldsymbol\phi(\mathbf{x}')\rangle$ of some feature map into a Hilbert space, its **reproducing kernel Hilbert space** (RKHS); for continuous kernels on compact sets Mercer's theorem (1909) gives the features as eigenfunctions. The polynomial kernel corresponds to all monomials up to degree $k$ (with particular weights) — $\binom{d + k}k$ features, computed in $O(d)$ time. The RBF kernel corresponds to an *infinite*-dimensional feature space.

::: example The polynomial kernel's features {#ex-poly-kernel}
For $\mathbf{x}, \mathbf{z}\in\R^2$, expand $(1 + \mathbf{x}^\top\mathbf{z})^2$ and find a feature map $\boldsymbol\phi$ with $\boldsymbol\phi(\mathbf{x})^\top\boldsymbol\phi(\mathbf{z}) = (1 + \mathbf{x}^\top\mathbf{z})^2$. Evaluate both sides for $\mathbf{x} = (1, 2)$, $\mathbf{z} = (3, -1)$.
::: solution
$(1 + x_1z_1 + x_2z_2)^2 = 1 + 2x_1z_1 + 2x_2z_2 + x_1^2z_1^2 + x_2^2z_2^2 + 2x_1x_2z_1z_2$. So

$$
\boldsymbol\phi(\mathbf{x}) = \big(1,\ \sqrt2x_1,\ \sqrt2x_2,\ x_1^2,\ x_2^2,\ \sqrt2x_1x_2\big)
$$

works: six features, including the product $x_1x_2$ that solves XOR. For the given vectors, $\mathbf{x}^\top\mathbf{z} = 3 - 2 = 1$, so the kernel is $(1 + 1)^2 = 4$. Explicitly, $\boldsymbol\phi(\mathbf{x}) = (1, \sqrt2, 2\sqrt2, 1, 4, 2\sqrt2)$ and $\boldsymbol\phi(\mathbf{z}) = (1, 3\sqrt2, -\sqrt2, 9, 1, -3\sqrt2)$, with inner product $1 + 6 - 4 + 9 + 4 - 12 = 4$.
:::
:::

[[#prop-kernel-ridge]] is a special case of a general principle, the **representer theorem** (Kimeldorf and Wahba, 1971; Schölkopf, Herbrich and Smola, 2001): for any loss and any penalty that increases with the RKHS norm, the regularised empirical risk minimiser has the form $\hat f(\mathbf{x}) = \sum_i\alpha_ik(\mathbf{x}_i, \mathbf{x})$, a weighted sum of kernels centred on the training points. So kernel logistic regression and the **support vector machine** (hinge loss with an $\ell_2$ penalty; Boser, Guyon and Vapnik, 1992; Cortes and Vapnik, 1995) also reduce to $n$ coefficients. For the RBF kernel, $\hat f$ is a sum of Gaussian bumps on the training points: a smooth interpolation of the labels, whose width $1/\sqrt\gamma$ trades bias against variance much as the polynomial degree did.

::: example Kernel ridge regression by hand {#ex-kernel-ridge}
Two training points, $x_1 = 0$ with $y_1 = 1$ and $x_2 = 1$ with $y_2 = -1$, are fitted by kernel ridge regression with the RBF kernel $k(x, z) = e^{-(x - z)^2}$ and $\lambda = 0.1$. Find $\boldsymbol\alpha$ and the predictions at $x = 0$, $0.5$, $2$ and $5$.
::: solution
$k(0, 1) = e^{-1} = 0.368$, so $K + \lambda I = \begin{pmatrix}1.1 & 0.368\\ 0.368 & 1.1\end{pmatrix}$, with determinant $1.21 - 0.135 = 1.075$. Solving $(K + \lambda I)\boldsymbol\alpha = (1, -1)$ gives $\alpha_1 = (1.1 + 0.368)/1.075 = 1.366$ and, by symmetry, $\alpha_2 = -1.366$. The prediction is $\hat f(x) = 1.366\,(e^{-x^2} - e^{-(x - 1)^2})$: at $x = 0$ it is $1.366(1 - 0.368) = 0.863$ (shrunk from the label $1$ by the penalty), at $x = 0.5$ it is $0$ by symmetry, at $x = 2$ it is $1.366(0.018 - 0.368) = -0.478$, and at $x = 5$ it is about $10^{-7}$. Far from all training points every kernel term vanishes and the RBF model predicts $0$: it interpolates between the data but has nothing to say beyond them.
:::
:::

Kernel methods were the leading approach to many classification problems from the late 1990s to the early 2010s, with convex training and a strong theory. Their weakness is scale: the Gram matrix has $n^2$ entries and solving with it costs $O(n^3)$, which is prohibitive beyond some tens of thousands of examples without approximations such as random features (Rahimi and Recht, 2007; exercise 10). And the kernel, like a hand-engineered feature map, is chosen rather than learned.

## Learning without parameters: neighbours and trees {#sec-nonparametric}

Two other families build flexible predictors directly from the data, without a fixed feature map.

::: algorithm $k$-nearest neighbours {#alg-knn}
To predict at $\mathbf{x}$: find the $k$ training inputs closest to $\mathbf{x}$ (usually in Euclidean distance on standardised features); for classification return the majority label among them, for regression the average.
:::

There is no training at all — the model is the data — and prediction requires searching the training set. The number of neighbours $k$ controls the bias–variance trade-off ([[ml-fundamentals/generalisation#ex-knn]]): $k = 1$ follows every noisy label, large $k$ averages over regions too large to be homogeneous. Cover and Hart (1967) proved that as $n\to\infty$ the error $R_{1\text{NN}}$ of the $1$-nearest-neighbour rule for two classes satisfies $R^*\le R_{1\text{NN}}\le2R^*(1 - R^*)$, where $R^*$ is the Bayes risk: with unlimited data, one neighbour is at most about twice as bad as the best possible classifier. In high dimensions, however, "nearest" loses its meaning as distances concentrate ([[#sec-curse]]), and the data needed grow exponentially with the dimension — unless the data lie near a low-dimensional structure, or a good representation puts them there.

**Decision trees** split the input space recursively by thresholds on single features ("is income above $40{,}000$?", then "is age below $30$?"), choosing each split to make the resulting groups as pure as possible, and predict the majority label or mean of each leaf (CART, Breiman, Friedman, Olshen and Stone, 1984; ID3 and C4.5, Quinlan, 1986 and 1993). A deep tree has low bias and very high variance. Averaging many trees grown on bootstrap samples with random feature subsets — **random forests** (Breiman, 2001) — reduces the variance, and **gradient boosting** (Friedman, 2001), which adds small trees one at a time to fit the residual errors of the ensemble so far, reduces the bias. On tabular data with heterogeneous, meaningful columns, tree ensembles remain highly competitive with neural networks as of 2026 (see, for example, Grinsztajn, Oyallon and Varoquaux, 2022); on images, audio and text, learned representations have displaced them.

## A comparison on XOR {#sec-code}

The listing generates $200$ training points uniform on the square $[-1, 1]^2$ with the XOR label $[x_1x_2 > 0]$, flipped with probability $0.05$ (so the Bayes accuracy is $0.95$), and compares logistic regression on raw features and with the product feature, kernel ridge regression on $\pm1$ labels with a linear and an RBF kernel, and $k$-nearest neighbours, all measured on $1000$ test points.

```python
import math, random

rng = random.Random(8)

def sample(n):
    """XOR pattern: x uniform on [-1, 1]^2, label 1 when x1 * x2 > 0, flipped with probability 0.05."""
    D = []
    for _ in range(n):
        x = (rng.uniform(-1, 1), rng.uniform(-1, 1))
        y = int(x[0] * x[1] > 0)
        if rng.random() < 0.05:
            y = 1 - y
        D.append((x, y))
    return D

train, test = sample(200), sample(1000)
acc = lambda predict, D: sum(predict(x) == y for x, y in D) / len(D)

def logistic(feats, D, eta=0.5, steps=3000):
    """Logistic regression by gradient descent on the features feats(x) (first feature = 1)."""
    w = [0.0] * len(feats(D[0][0]))
    for _ in range(steps):
        g = [0.0] * len(w)
        for x, y in D:
            f = feats(x)
            z = sum(a * b for a, b in zip(w, f))
            p = 1 / (1 + math.exp(-z))
            for j in range(len(w)):
                g[j] += (p - y) * f[j] / len(D)
        w = [wj - eta * gj for wj, gj in zip(w, g)]
    return lambda x: int(sum(a * b for a, b in zip(w, feats(x))) > 0)

raw = lambda x: [1.0, x[0], x[1]]
product = lambda x: [1.0, x[0], x[1], x[0] * x[1]]
print("logistic, raw features      test acc", acc(logistic(raw, train), test))
print("logistic, + x1*x2 feature   test acc", acc(logistic(product, train), test))

def solve(A, b):
    m = len(A); M = [r[:] + [v] for r, v in zip(A, b)]
    for k in range(m):
        q = max(range(k, m), key=lambda i: abs(M[i][k])); M[k], M[q] = M[q], M[k]
        for i in range(k + 1, m):
            c = M[i][k] / M[k][k]
            for j in range(k, m + 1): M[i][j] -= c * M[k][j]
    x = [0.0] * m
    for k in reversed(range(m)):
        x[k] = (M[k][m] - sum(M[k][j] * x[j] for j in range(k + 1, m))) / M[k][k]
    return x

def kernel_ridge(k, D, lam):
    """Kernel ridge regression on labels +-1: alpha = (K + lam I)^-1 y, f(x) = sum_i alpha_i k(x_i, x)."""
    K = [[k(xi, xj) + (lam if i == j else 0) for j, (xj, _) in enumerate(D)] for i, (xi, _) in enumerate(D)]
    alpha = solve(K, [2 * y - 1 for _, y in D])
    return lambda x: int(sum(a * k(xi, x) for a, (xi, _) in zip(alpha, D)) > 0)

rbf = lambda gamma: (lambda u, v: math.exp(-gamma * ((u[0] - v[0]) ** 2 + (u[1] - v[1]) ** 2)))
linear = lambda u, v: u[0] * v[0] + u[1] * v[1] + 1
for name, k in [("linear kernel", linear), ("RBF, gamma=5", rbf(5.0))]:
    print(f"kernel ridge, {name:14s} test acc", acc(kernel_ridge(k, train, lam=0.1), test))

def knn(D, kk):
    def predict(x):
        near = sorted(D, key=lambda e: (e[0][0] - x[0]) ** 2 + (e[0][1] - x[1]) ** 2)[:kk]
        return int(2 * sum(y for _, y in near) > kk)
    return predict

for kk in (1, 5, 25, 101):
    print(f"{kk:3d}-nearest neighbours       test acc", acc(knn(train, kk), test))
```

```text
logistic, raw features      test acc 0.501
logistic, + x1*x2 feature   test acc 0.922
kernel ridge, linear kernel  test acc 0.501
kernel ridge, RBF, gamma=5   test acc 0.917
  1-nearest neighbours       test acc 0.898
  5-nearest neighbours       test acc 0.911
 25-nearest neighbours       test acc 0.901
101-nearest neighbours       test acc 0.748
```

On raw features, logistic regression and the linear kernel (which is the same model class) are at chance, as [[#prop-xor]] predicts. One engineered feature lifts logistic regression to $0.922$; the fitted weight on $x_1x_2$ is large ($18.3$) while small, noise-driven weights on $x_1$ and $x_2$ tilt the boundary slightly, which is why it falls short of the Bayes rule $[x_1x_2 > 0]$ (which scores $0.959$ on this test set). The RBF kernel reaches $0.917$ *without being told* about the product: its infinite feature space contains a good approximation. Nearest neighbours does almost as well with $k = 5$; $k = 1$ is noisier (its error $0.102$ is close to the Cover–Hart limit $2\cdot0.05\cdot0.95 = 0.095$), and $k = 101$, half the training set, averages across quadrants and loses the pattern. In two dimensions, every flexible method works. The difference between them appears with high-dimensional inputs such as images and text, where hand-chosen features are unknown, kernels and neighbours suffer from the curse of dimensionality, and learned representations win.

::: quiz
Kernel ridge regression with an RBF kernel is fitted to $n = 10^5$ examples. Which statement is correct?
- [ ] Its cost does not depend on $n$, because the feature space is infinite-dimensional
- [x] It needs the $n\times n$ Gram matrix ($10^{10}$ entries), and an exact solve costs on the order of $n^3$ operations
- [ ] It is equivalent to logistic regression on the raw features
- [ ] It cannot fit non-linear functions, since ridge regression is linear
::: solution
By [[#prop-kernel-ridge]], the solution needs $(K + \lambda I)^{-1}\mathbf{y}$ with $K$ of size $n\times n$: $10^{10}$ entries (about $80$ GB in double precision) and $O(n^3) = 10^{15}$ operations for a direct solve. The infinite feature space is never formed, but the price is paid in $n$. The model is linear in the RKHS features, which are non-linear functions of the input, so it fits non-linear functions.
:::
:::

## Learned representations {#sec-learned}

A neural network replaces the fixed feature map by a parametrised one, $\boldsymbol\phi_\theta$, and trains it jointly with the linear model on top:

$$
h(\mathbf{x}) = W\boldsymbol\phi_\theta(\mathbf{x}) + \mathbf{b},\qquad\text{for instance}\quad\boldsymbol\phi_\theta(\mathbf{x}) = g(A\mathbf{x} + \mathbf{c}),\ \theta = (A, \mathbf{c}),
$$

with $g$ a non-linear function such as $\max(0, \cdot)$ applied elementwise. With several such layers, $\boldsymbol\phi_\theta$ is a deep network, and the last layer is exactly the logistic or softmax regression of [[ml-fundamentals/logistic-regression]], operating on features that were learned to make that final linear problem easy. The price is convexity: the loss as a function of $\theta$ is no longer convex, and none of the closed forms of this course apply. The gain is that features no longer have to be invented. A small network solves XOR by learning the product-like feature itself ([[neural-networks/perceptrons-mlps]]); a convolutional network learns edge detectors in its first layer and object parts in later ones ([[neural-networks/convolutional-networks]]).

Learned features are also **transferable**. A network trained on a large, general task — next-token prediction on web text, classifying millions of images — produces features that are useful for many other tasks. Freezing $\boldsymbol\phi_\theta$ and training only a new linear head on a small labelled set (a **linear probe**) often works remarkably well, and fine-tuning the whole network works better still. Linear probes are also a tool for asking what a representation contains ([[interpretability/probing-attribution]]): if a linear classifier can read the part of speech of a word from a language model's hidden state, that information is present there in linearly accessible form — though not necessarily used by the model.

### Embeddings {#sec-embeddings}

The input of a language model is a sequence of discrete tokens. The one-hot encoding of a token is a vector of dimension $\lvert\mathcal{V}\rvert$ — tens of thousands to hundreds of thousands — in which every pair of tokens is orthogonal and equally far apart. The first layer of the model replaces it by a dense, learned vector.

::: definition Embedding {#def-embedding}
An **embedding** of a finite set $\mathcal{V} = \{1, \dots, V\}$ in $\R^d$ is a matrix $E\in\R^{V\times d}$ whose $i$-th row $\mathbf{e}_i$ is the vector representing item $i$. **Embedding lookup** maps item $i$ to $\mathbf{e}_i$. The entries of $E$ are parameters, learned with the rest of the model.
:::

::: proposition Embedding lookup is a linear layer on one-hot vectors {#prop-embedding}
If $\mathbf{o}_i\in\R^V$ is the one-hot vector of item $i$, then $\mathbf{o}_i^\top E = \mathbf{e}_i$. A linear layer applied to one-hot inputs is therefore an embedding, and the gradient of the loss with respect to $E$ is zero in every row except those of the items present in the input.
:::

::: proof
$(\mathbf{o}_i^\top E)_j = \sum_k(\mathbf{o}_i)_kE_{kj} = E_{ij}$, since only the $i$-th entry of $\mathbf{o}_i$ is non-zero. For the gradient, the output depends on $E$ only through the rows selected by the input, so the partial derivatives with respect to all other entries vanish; by the linear-layer rule ([[math-for-ml/gradients#prop-linear-grad]]) the gradient is $\mathbf{o}_i\mathbf{g}^\top$, where $\mathbf{g}$ is the gradient with respect to $\mathbf{e}_i$, which is non-zero only in row $i$.
:::

So an embedding is not a new kind of object: it is a linear map, implemented as a table lookup because multiplying by a one-hot vector would waste $V$ times the work. What makes embeddings powerful is what training does to them. Because the model's predictions depend on the embeddings, items that behave similarly in the data — words that occur in similar contexts, according to the **distributional hypothesis** of Harris (1954) and Firth (1957) — receive similar vectors, so that what is learned about one transfers to the others. Word2vec (Mikolov et al., 2013) learned such vectors with a shallow model trained to predict words from their neighbours, and found that directions in the embedding space encode relations (the vector from *man* to *woman* is roughly parallel to that from *king* to *queen*); [[text-and-language/word-embeddings]] develops this. In a Transformer, the token embedding is only the first representation; every layer computes a new, context-dependent one ([[sequence-models/contextual-embeddings]]), and the hidden state before the output layer is the learned $\boldsymbol\phi_\theta(x_{<t})$ on which the softmax regression of [[ml-fundamentals/logistic-regression#sec-lm-head]] predicts the next token.

::: example Similar vectors {#ex-embeddings}
Toy embeddings in $\R^3$ are $\mathbf{e}_{\textit{cat}} = (0.8, 0.1, 0.3)$, $\mathbf{e}_{\textit{dog}} = (0.7, 0.2, 0.4)$ and $\mathbf{e}_{\textit{on}} = (-0.1, 0.9, 0.0)$. Compute the cosine similarities of *cat* with *dog* and with *on*, and contrast with one-hot vectors.
::: solution
$\mathbf{e}_{\textit{cat}}\cdot\mathbf{e}_{\textit{dog}} = 0.56 + 0.02 + 0.12 = 0.70$, with norms $\sqrt{0.74} = 0.860$ and $\sqrt{0.69} = 0.831$, so the cosine is $0.70/0.715 = 0.979$. $\mathbf{e}_{\textit{cat}}\cdot\mathbf{e}_{\textit{on}} = -0.08 + 0.09 + 0 = 0.01$, with $\lVert\mathbf{e}_{\textit{on}}\rVert = 0.906$, so the cosine is $0.013$. *Cat* and *dog* are near-parallel, *cat* and *on* nearly orthogonal. With one-hot vectors all three cosines would be $0$: the representation could not express that cats and dogs are alike. (Real embeddings have hundreds or thousands of dimensions and are learned, not chosen; the cosine similarity is defined in [[math-for-ml/vectors-matrices#eq-cosine]].)
:::
:::

::: warning Features can leak the answer
A feature computed with knowledge of the label, or of the future, makes a model look excellent in evaluation and fail in use. Classic cases: a hospital-records model that uses "treatment given" to predict the diagnosis that prompted the treatment; a fraud model using a field filled in by investigators after the fact; image classifiers that learn the watermark or scanner of the source that supplied one class; text classifiers keyed to an annotator's formatting habits. Learned representations do not escape this — a network will find any shortcut the data allow (Geirhos et al., 2020) — and they make it harder to see. Ask of every input whether it would be available, with the same meaning, at prediction time, and test on data collected independently of the training set.
:::

::: history
Ronald Fisher's discriminant (1936) and Frank Rosenblatt's perceptron (1958) were linear in given features; Marvin Minsky and Seymour Papert's *Perceptrons* (1969) analysed what such models cannot compute. Nearest-neighbour classification goes back to Fix and Hodges (1951), with the asymptotic analysis of Thomas Cover and Peter Hart (1967). The use of kernels as inner products in a feature space appeared in the "potential function" method of Aizerman, Braverman and Rozonoer (1964); Bernhard Boser, Isabelle Guyon and Vladimir Vapnik combined it with maximum-margin classifiers in 1992, and Corinna Cortes and Vapnik's soft-margin support vector machine (1995) made kernel methods mainstream. Leo Breiman and colleagues' CART (1984), Breiman's random forests (2001) and Jerome Friedman's gradient boosting (2001) established tree ensembles. The learning of internal representations by backpropagation was demonstrated by David Rumelhart, Geoffrey Hinton and Ronald Williams (1986), learned word vectors entered language modelling with the neural language model of Yoshua Bengio and colleagues (2003) and became widespread with word2vec (Tomas Mikolov et al., 2013), and Bengio, Aaron Courville and Pascal Vincent's review "Representation learning" (2013) named the field.
:::

::: summary
- A linear model can only be as good as its features: engineered features (standardisation, one-hot, bag of words, interactions) encode knowledge of the problem; XOR shows what raw features can miss.
- Explicit high-order features grow combinatorially, $\binom{d + k}k$, and high-dimensional spaces defeat distance-based intuition (the curse of dimensionality).
- **Kernels** compute inner products in large or infinite feature spaces implicitly; kernel ridge regression solves $(K + \lambda I)\boldsymbol\alpha = \mathbf{y}$, and the representer theorem makes every such model a weighted sum of kernels on the training points, at a cost growing like $n^2$ to $n^3$.
- **Nearest neighbours** and **tree ensembles** are flexible non-parametric alternatives; 1-NN is asymptotically within a factor two of the Bayes risk, and tree ensembles remain strong on tabular data.
- **Neural networks learn the feature map** and put a linear (softmax) model on top; learned features transfer across tasks. An **embedding** is a learned linear map from one-hot symbols to dense vectors, in which similar items get similar vectors.
:::

## Exercises

::: exercise One-hot dimensions {level=1 check="23"}
A table has three categorical columns with $4$, $7$ and $12$ possible values. How many features does one-hot encoding produce?
::: solution
$4 + 7 + 12 = 23$. (With an intercept in the model, one indicator per column is redundant, since each column's indicators sum to $1$; dropping one per column gives $20$.)
:::
:::

::: exercise Quadratic features {level=1 check="66"}
How many monomials of degree at most $2$, including the constant, are there in $d = 10$ variables?
::: solution
By [[#prop-count]], $\binom{12}2 = 66$: the constant, $10$ linear terms, $10$ squares and $\binom{10}2 = 45$ products.
:::
:::

::: exercise An RBF kernel value {level=1 check="exp(-1)"}
Compute $k(\mathbf{x}, \mathbf{z}) = \exp(-\gamma\lVert\mathbf{x} - \mathbf{z}\rVert^2)$ for $\mathbf{x} = (0, 0)$, $\mathbf{z} = (1, 1)$ and $\gamma = 0.5$.
::: solution
$\lVert\mathbf{x} - \mathbf{z}\rVert^2 = 2$, so $k = e^{-0.5\cdot2} = e^{-1}\approx0.368$.
:::
:::

::: exercise A polynomial kernel value {level=1 check="9"}
Compute $(1 + \mathbf{x}^\top\mathbf{z})^2$ for $\mathbf{x} = (2, 1)$ and $\mathbf{z} = (1, 0)$, and check it with the feature map of [[#ex-poly-kernel]].
::: solution
$\mathbf{x}^\top\mathbf{z} = 2$, so the kernel is $9$. With $\boldsymbol\phi(\mathbf{x}) = (1, 2\sqrt2, \sqrt2, 4, 1, 2\sqrt2)$ and $\boldsymbol\phi(\mathbf{z}) = (1, \sqrt2, 0, 1, 0, 0)$, the inner product is $1 + 4 + 0 + 4 + 0 + 0 = 9$.
:::
:::

::: exercise The edge of a hypercube {level=2 check="0.95^100"}
What fraction of the volume of $[-1, 1]^{100}$ lies in $[-0.95, 0.95]^{100}$?
::: solution
The ratio of volumes is $(1.9/2)^{100} = 0.95^{100}\approx0.0059$. Over $99\%$ of the cube lies within $0.05$ of its boundary in at least one coordinate. In such spaces a "neighbourhood" containing a fixed fraction of the data must extend across most of the range of every coordinate, so nearest neighbours are not near.
:::
:::

::: exercise Embedding parameters {level=2 check="32000*4096"}
A language model has a vocabulary of $32{,}000$ tokens and model width $d = 4096$. How many parameters does its input embedding matrix have, and how many of its rows receive a non-zero gradient from a training batch containing $3000$ distinct tokens?
::: solution
$32{,}000\times4096 = 131{,}072{,}000$ parameters, about $131$ million. By [[#prop-embedding]], only the $3000$ rows of tokens present in the batch get a gradient; the other $29{,}000$ rows are untouched by that step (apart from weight decay, if applied).
:::
:::

::: exercise A kernel without a constant {level=2}
Show that $k(\mathbf{x}, \mathbf{z}) = (\mathbf{x}^\top\mathbf{z})^2$ on $\R^2$ is the inner product of the features $\boldsymbol\psi(\mathbf{x}) = (x_1^2, \sqrt2x_1x_2, x_2^2)$. Can a linear classifier on $\boldsymbol\psi$ solve the XOR problem of [[#prop-xor]] with inputs recoded to $\pm1$?
::: solution
$(x_1z_1 + x_2z_2)^2 = x_1^2z_1^2 + 2x_1x_2z_1z_2 + x_2^2z_2^2 = \boldsymbol\psi(\mathbf{x})^\top\boldsymbol\psi(\mathbf{z})$. With inputs $(\pm1, \pm1)$, XOR labels "different signs" as $1$; on these inputs $x_1^2 = x_2^2 = 1$ and $\sqrt2x_1x_2 = \pm\sqrt2$, with the sign negative exactly for label $1$. So the classifier $[-\sqrt2x_1x_2 > 0]$, which is linear in $\boldsymbol\psi$, is correct on all four points.
:::
:::

::: exercise The Cover–Hart bound {level=2 check="0.095"}
A two-class problem has Bayes risk $R^* = 0.05$. What is the largest asymptotic error the $1$-nearest-neighbour rule can have, according to Cover and Hart?
::: solution
$2R^*(1 - R^*) = 2\cdot0.05\cdot0.95 = 0.095$. The XOR listing has exactly this Bayes risk, and its $1$-NN test error, $0.102$ from only $200$ training points, is close to the bound.
:::
:::

::: exercise Building kernels {level=3}
Let $k_1$ and $k_2$ be kernels on $\mathcal{X}$. Show that $k_1 + k_2$, $ck_1$ for $c\ge0$, and $k_1k_2$ are kernels. Deduce that $(1 + \mathbf{x}^\top\mathbf{z})^k$ is a kernel for every positive integer $k$.
::: solution
Symmetry is clear in each case. For a finite set of inputs with Gram matrices $K_1$, $K_2$: $\mathbf{a}^\top(K_1 + K_2)\mathbf{a} = \mathbf{a}^\top K_1\mathbf{a} + \mathbf{a}^\top K_2\mathbf{a}\ge0$ and $\mathbf{a}^\top(cK_1)\mathbf{a}\ge0$. For the product, the Gram matrix is the elementwise (Hadamard) product $K_1\circ K_2$. Write $K_2 = \sum_r\lambda_r\mathbf{v}_r\mathbf{v}_r^\top$ with $\lambda_r\ge0$ (spectral theorem, [[math-for-ml/matrix-decompositions#thm-spectral]]). Then $\mathbf{a}^\top(K_1\circ K_2)\mathbf{a} = \sum_r\lambda_r\sum_{i,j}a_iv_{r,i}(K_1)_{ij}a_jv_{r,j} = \sum_r\lambda_r\,\mathbf{b}_r^\top K_1\mathbf{b}_r\ge0$, with $b_{r,i} = a_iv_{r,i}$ (this is the Schur product theorem). Now $\mathbf{x}^\top\mathbf{z}$ is a kernel (an inner product), the constant $1$ is a kernel (feature map $\phi(\mathbf{x}) = 1$), so $1 + \mathbf{x}^\top\mathbf{z}$ is a kernel, and by induction on products so is its $k$-th power.
:::
:::

::: exercise Random features for the RBF kernel {level=3}
For $\boldsymbol\omega\sim\Normal(\mathbf{0}, 2\gamma I)$ and $b$ uniform on $[0, 2\pi]$, one can show that $\E[2\cos(\boldsymbol\omega^\top\mathbf{u} + b)\cos(\boldsymbol\omega^\top\mathbf{v} + b)] = \exp(-\gamma\lVert\mathbf{u} - \mathbf{v}\rVert^2)$ (Rahimi and Recht, 2007). Append code to the listing that draws $D = 100$ such features $z_j(\mathbf{x}) = \sqrt{2/D}\cos(\boldsymbol\omega_j^\top\mathbf{x} + b_j)$ with $\gamma = 5$, compares $\mathbf{z}(\mathbf{u})^\top\mathbf{z}(\mathbf{v})$ with the kernel for one pair of points, and fits ordinary ridge regression ($\lambda = 0.1$) on the features. Why is this cheaper than kernel ridge regression for large $n$?
::: solution
Appended to the listing:

```python
# Random Fourier features for the RBF kernel exp(-gamma |u - v|^2): omega ~ N(0, 2 gamma I)
gamma, D_feat, lam = 5.0, 100, 0.1
om = [(rng.gauss(0, math.sqrt(2 * gamma)), rng.gauss(0, math.sqrt(2 * gamma))) for _ in range(D_feat)]
ph = [rng.uniform(0, 2 * math.pi) for _ in range(D_feat)]
z = lambda x: [math.sqrt(2 / D_feat) * math.cos(o[0] * x[0] + o[1] * x[1] + b) for o, b in zip(om, ph)]
u, v = (0.1, 0.2), (0.3, -0.1)
print("kernel", round(rbf(gamma)(u, v), 3), " features", round(sum(a * b for a, b in zip(z(u), z(v))), 3))
Z = [z(x) for x, _ in train]                                       # (200, 100)
G = [[sum(r[i] * r[j] for r in Z) + (lam if i == j else 0) for j in range(D_feat)] for i in range(D_feat)]
w = solve(G, [sum(r[i] * (2 * y - 1) for r, (_, y) in zip(Z, train)) for i in range(D_feat)])
print("ridge on 100 random features  test acc", acc(lambda x: int(sum(a * b for a, b in zip(w, z(x))) > 0), test))
```

with output

```text
kernel 0.522  features 0.458
ridge on 100 random features  test acc 0.919
```

The feature inner product $0.458$ is a noisy estimate of the kernel value $0.522$ (its error shrinks like $1/\sqrt D$), but the classifier built on $100$ random features is as accurate as exact kernel ridge regression ($0.917$). Its cost is that of ridge regression with $D$ features, $O(nD^2 + D^3)$ time and $O(nD)$ memory, linear in $n$, instead of $O(n^3)$ time and $O(n^2)$ memory for the Gram matrix. Random features are a fixed, random first layer followed by a trained linear layer — a neural network whose hidden layer is not learned.
:::
:::
