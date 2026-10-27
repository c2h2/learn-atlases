If every neuron of a network responded to exactly one meaningful property of its input, interpretability would be a matter of cataloguing neurons. Some neurons are like that — a curve detector, a neuron for text in base64 — but many are not. A single neuron in a vision model can respond to cat faces, the fronts of cars and cat legs; a neuron in a language model can fire on academic citations, on dialogue and on text in one particular language. Such neurons are **polysemantic**, and they are common enough that neuron-by-neuron analysis of language models largely failed. This chapter explains why.

The leading explanation is **superposition**: a network can represent many more features than it has dimensions by assigning them directions that are *nearly* orthogonal, accepting some interference between features in exchange for capacity. This is advantageous when features are **sparse** — when any given input has only a few of them — because interference only arises when features co-occur. The chapter develops the idea in three steps. Geometry: high-dimensional spaces contain exponentially many nearly orthogonal directions, which we prove with a union bound and check numerically, together with a matching lower bound on how orthogonal $N$ vectors can be. The toy model of Elhage et al. (2022), *Toy Models of Superposition*: a linear model provably never uses superposition, while a model with a ReLU output does, with a phase change governed by sparsity and importance that we derive in the smallest case and reproduce by training. And consequences: polysemantic neurons, features as directions in an overcomplete basis, and the motivation for the sparse dictionaries of [[interpretability/sparse-features]].

## Features as directions {#sec-features}

The word **feature** is used informally for a property of the input that the network represents — "this token is in French", "the subject is plural", "this is a DNA sequence". The working hypothesis of most of mechanistic interpretability is that such features are represented **linearly**.

::: definition Linear representation, superposition, polysemanticity {#def-superposition}
A layer's activations $\mathbf{h}\in\R^m$ **linearly represent** features $f_1,\dots,f_n$ (with values $x_i\ge0$ on a given input) if
$$
\mathbf{h}\approx\sum_{i=1}^nx_i\,\mathbf{w}_i + \mathbf{b}
$$
for fixed **feature directions** $\mathbf{w}_i\in\R^m$. The layer stores the features in **superposition** if $n > m$, so the directions cannot be orthogonal. A neuron (a coordinate of a privileged basis, [[interpretability/residual-stream#def-privileged]]) is **monosemantic** if it responds to a single feature and **polysemantic** if it responds to several unrelated ones.
:::

Linear representations are attractive because later layers read activations with linear maps followed by non-linearities: a feature stored along a direction can be read by a single dot product. There is substantial evidence for them — the vector offsets of word embeddings ([[text-and-language/word-embeddings]]), linear probes that read many properties ([[interpretability/probing-attribution]]), steering by adding directions ([[interpretability/causal-interventions]]) — and a body of work formalising the hypothesis (Park, Choe and Veitch, 2023). It is a hypothesis, not a law: Engels et al. (2024) found features that are irreducibly multi-dimensional, such as days of the week and months of the year represented on circles in GPT-2 and Mistral 7B, and Csordás et al. (2024) found small recurrent networks storing sequences with magnitude-based, non-linear encodings. The superposition hypothesis concerns the linear case.

Why would a network store more features than dimensions? Because the world has far more properties worth representing than a layer has dimensions — a model of $d = 4096$ may usefully track hundreds of thousands of concepts — and because most are rare: on any given token, nearly all of them are absent. Superposition trades a little interference for a great deal of capacity. The trade-off rests on geometry.

## Nearly orthogonal directions {#sec-geometry}

In $\R^m$ at most $m$ vectors can be exactly orthogonal. If we only ask that every pair have $\lvert\cos\rvert\le\varepsilon$, the number grows exponentially in $m$. The cleanest proof uses random sign vectors and Hoeffding's inequality: for independent random signs $s_1,\dots,s_m\in\{\pm1\}$ with $\Prob(s_k = 1) = \tfrac12$, and $t > 0$,
$$
\Prob\Bigl(\Bigl\lvert\sum_{k=1}^ms_k\Bigr\rvert\ge t\Bigr)\le2\exp\bigl(-t^2/(2m)\bigr).
$$ {#eq-hoeffding}

::: theorem Exponentially many nearly orthogonal vectors {#thm-jl}
For every $\varepsilon\in(0, 1)$ and every integer $N\ge2$ with $N\le\exp(m\varepsilon^2/4)$, there exist unit vectors $\mathbf{u}_1,\dots,\mathbf{u}_N\in\R^m$ with $\lvert\mathbf{u}_i\cdot\mathbf{u}_j\rvert<\varepsilon$ for all $i\ne j$. Random sign vectors $\mathbf{u}_i = \mathbf{s}_i/\sqrt m$, $\mathbf{s}_i$ uniform in $\{\pm1\}^m$ and independent, have this property with probability greater than $0$.
:::

::: proof
For $i\ne j$, $\mathbf{u}_i\cdot\mathbf{u}_j = \frac1m\sum_ks_{ik}s_{jk}$, and the products $s_{ik}s_{jk}$ are independent uniform signs (for fixed $\mathbf{s}_i$, multiplying uniform independent signs by fixed signs leaves them uniform and independent). By [[#eq-hoeffding]] with $t = m\varepsilon$, $\Prob(\lvert\mathbf{u}_i\cdot\mathbf{u}_j\rvert\ge\varepsilon)\le2\exp(-m\varepsilon^2/2)$. By the union bound over the $\binom N2 < N^2/2$ pairs, the probability that some pair fails is less than $N^2\exp(-m\varepsilon^2/2)\le\exp(m\varepsilon^2/2)\exp(-m\varepsilon^2/2) = 1$, using $N^2\le\exp(m\varepsilon^2/2)$. So with positive probability no pair fails, and such a set of vectors exists.
:::

This is the counting fact behind the Johnson–Lindenstrauss lemma (Johnson and Lindenstrauss, 1984), which states that $N$ points can be mapped into $O(\log N/\varepsilon^2)$ dimensions with all pairwise distances preserved to within a factor $1\pm\varepsilon$; the same concentration of measure drives both. Elhage et al. cited it as the reason why superposition can be so efficient. The bound is also essentially tight in its dependence on $m$, as a lower bound shows.

::: proposition Welch bound {#prop-welch}
If $\mathbf{u}_1,\dots,\mathbf{u}_N$ are unit vectors in $\R^m$ with $N > m$, then
$$
\max_{i\ne j}\lvert\mathbf{u}_i\cdot\mathbf{u}_j\rvert\ge\sqrt{\frac{N - m}{m(N - 1)}}.
$$ {#eq-welch}
:::

::: proof
Let $G$ be the $N\times N$ Gram matrix, $G_{ij} = \mathbf{u}_i\cdot\mathbf{u}_j$. It is symmetric positive semi-definite with rank $r\le m$ and trace $N$. Its non-zero eigenvalues $\lambda_1,\dots,\lambda_r$ satisfy $\sum\lambda_k = N$, so by the Cauchy–Schwarz inequality $\lVert G\rVert_F^2 = \sum\lambda_k^2\ge N^2/r\ge N^2/m$. On the other hand $\lVert G\rVert_F^2 = \sum_iG_{ii}^2 + \sum_{i\ne j}G_{ij}^2\le N + N(N - 1)\mu^2$, where $\mu$ is the maximum $\lvert G_{ij}\rvert$ over $i\ne j$. Combining, $N + N(N - 1)\mu^2\ge N^2/m$, i.e. $\mu^2\ge(N/m - 1)/(N - 1) = (N - m)/(m(N - 1))$.
:::

For $N\gg m$ the Welch bound approaches $1/\sqrt m$, which is also the typical size of $\lvert\cos\rvert$ between two random unit vectors (its mean is close to $\sqrt{2/(\pi m)}$). Random directions thus achieve the *typical* interference allowed by the bound, but their *worst* pair is worse by a factor of order $\sqrt{\log N}$; the laboratory measures both.

::: example How many features fit? {#ex-capacity}
A residual stream has $m = 4096$ dimensions. How many directions with pairwise $\lvert\cos\rvert<0.1$ does [[#thm-jl]] guarantee? With $\lvert\cos\rvert<0.2$? If $k = 20$ features with value $1$ are active on a token, each stored along a random direction, how large is the interference when one feature is read by a dot product?
::: solution
$\exp(4096\times0.01/4) = \exp(10.24)\approx28{,}000$ directions at $\varepsilon = 0.1$, and $\exp(4096\times0.04/4) = \exp(40.96)\approx6\times10^{17}$ at $\varepsilon = 0.2$ — far more than any network needs, although the guarantee is conservative. Reading feature $i$ by $\mathbf{u}_i\cdot\mathbf{h}$ gives $x_i + \sum_{j\ne i}x_j\,\mathbf{u}_i\cdot\mathbf{u}_j$. For random directions each cosine has mean $0$ and variance about $1/m$, so the interference from $19$ other active features has standard deviation about $\sqrt{19/4096} = 0.068$: small compared with the signal $1$. With $k = 2000$ active features the noise would be $\sqrt{2000/4096} = 0.70$, as large as the signal. Superposition works because features are sparse.
:::
:::

## A toy model {#sec-toy}

Elhage et al. (2022) asked when a network trained by gradient descent actually chooses superposition, using a model small enough to visualise.

::: definition The toy model of superposition {#def-toy}
Inputs $\mathbf{x}\in\R^n$ have independent coordinates: each $x_i$ is $0$ with probability $1 - p$ (the **sparsity** is $S = 1 - p$) and uniform on $[0, 1]$ otherwise. Feature $i$ has **importance** $I_i > 0$. A model with $m < n$ hidden dimensions and weights $W\in\R^{m\times n}$ (column $\mathbf{w}_i$ is feature $i$'s direction) computes
$$
\mathbf{h} = W\mathbf{x},\qquad\hat{\mathbf{x}} = \operatorname{ReLU}(W\T\mathbf{h} + \mathbf{b}),
$$
and is trained to minimise $\mathcal{L} = \E\bigl[\sum_iI_i(x_i - \hat x_i)^2\bigr]$. The **linear** variant omits the ReLU: $\hat{\mathbf{x}} = W\T W\mathbf{x} + \mathbf{b}$.
:::

The hidden layer is a compression bottleneck, and the question is which features survive it and how. Feature $i$ is *represented* if $\lVert\mathbf{w}_i\rVert$ is close to $1$ and *dropped* if it is close to $0$; two represented features *interfere* if $\mathbf{w}_i\cdot\mathbf{w}_j\ne0$.

### Linear models do not superpose {#sec-linear}

::: theorem The linear toy model stores the most important features orthogonally {#thm-linear}
In the linear variant, let $v_i = \E[x_i^2] - (\E x_i)^2$ be the variance of feature $i$, and order the features so that $I_1v_1\ge I_2v_2\ge\cdots\ge I_nv_n$. The minimum of $\mathcal{L}$ over $W\in\R^{m\times n}$ and $\mathbf{b}$ equals $\sum_{i>m}I_iv_i$, and it is attained by $W$ whose columns $\mathbf{w}_1,\dots,\mathbf{w}_m$ are orthonormal and $\mathbf{w}_i = \mathbf{0}$ for $i > m$, with $\mathbf{b}$ reproducing the means. If $I_mv_m > I_{m+1}v_{m+1}$, every minimiser represents exactly features $1,\dots,m$, orthogonally, with no interference.
:::

::: proof
For fixed $W$, the optimal bias makes $\hat{\mathbf{x}}$ correct on average, $\mathbf{b} = (I - M)\boldsymbol\mu$ with $M = W\T W$ and $\boldsymbol\mu = \E\mathbf{x}$; the loss is then that of the centred variables, $\mathcal{L} = \E\lVert D^{1/2}(I - M)(\mathbf{x} - \boldsymbol\mu)\rVert^2$ with $D = \operatorname{diag}(I_i)$. The features are independent, so the covariance is $\Sigma = \operatorname{diag}(v_i)$ and $\mathcal{L} = \operatorname{tr}\bigl(D^{1/2}(I - M)\Sigma(I - M)\T D^{1/2}\bigr) = \lVert A - D^{1/2}M\Sigma^{1/2}\rVert_F^2$ with $A = D^{1/2}\Sigma^{1/2} = \operatorname{diag}(\sqrt{I_iv_i})$. Since $D^{1/2}M\Sigma^{1/2}$ has rank at most $m$, the Eckart–Young theorem ([[math-for-ml/matrix-decompositions]]) gives $\mathcal{L}\ge\sum_{i>m}I_iv_i$, the sum of the squares of the singular values of the diagonal matrix $A$ beyond the $m$ largest. The bound is attained by $M = \operatorname{diag}(1,\dots,1,0,\dots,0)$ ($m$ ones), which equals $W\T W$ for $W = [\,I_m\ \ 0\,]$ — or any $W$ whose first $m$ columns are orthonormal and the rest zero. When the $m$th and $(m+1)$th singular values differ, the best rank-$m$ approximation is unique, so $D^{1/2}M\Sigma^{1/2}$ must be the truncated $A$, forcing $M$ to be that diagonal projection; then $\lVert\mathbf{w}_i\rVert^2 = M_{ii}$ is $1$ for $i\le m$ and $0$ otherwise, and $\mathbf{w}_i\cdot\mathbf{w}_j = M_{ij} = 0$ for $i\ne j$.
:::

::: example Which feature does a linear model keep? {#ex-linear}
A linear toy model with $m = 1$ has two features: feature $A$ with importance $1$, present with probability $p = 0.1$, and feature $B$ with importance $0.5$, always present ($p = 1$). Both are uniform on $[0, 1]$ when present. Which does the optimal model keep, and what is its loss?
::: solution
The variance of a feature present with probability $p$ is $\E x^2 - (\E x)^2 = p/3 - p^2/4$. For $A$: $0.0333 - 0.0025 = 0.0308$, so $I_Av_A = 0.0308$. For $B$: $1/3 - 1/4 = 1/12 = 0.0833$, so $I_Bv_B = 0.0417$. By [[#thm-linear]] the model keeps $B$, the *less important* feature, because it varies more, and its loss is $I_Av_A = 0.0308$ (feature $A$ is replaced by its mean $0.05$). Sparse features carry little variance, so a linear model sacrifices them first — exactly the features that superposition can rescue.
:::
:::

The linear model behaves like principal component analysis weighted by importance: keep the top $m$ features, drop the rest. Any interference would cost more than it gains, because a linear readout cannot suppress it. The ReLU changes that: a negative interference term is clipped to zero, so a feature that is absent is not harmed by negative crosstalk.

### Two features in one dimension {#sec-two}

Take $n = 2$, $m = 1$, with $I_1 = 1$ and $I_2 = r\le1$. Compare two configurations.

- **Dedicated:** $W = (1, 0)$, $b_1 = 0$, $b_2 = c$. Feature $1$ is reconstructed exactly; feature $2$ is replaced by the constant $\operatorname{ReLU}(c)$, best chosen as its mean $p/2$, with loss $r\,v_2 = r(p/3 - p^2/4)$ (since $\E x_2^2 = p/3$).
- **Antipodal:** $W = (1, -1)$, $\mathbf{b} = \mathbf{0}$. Then $W\T W\mathbf{x} = (x_1 - x_2,\ x_2 - x_1)$ and $\hat{\mathbf{x}} = (\operatorname{ReLU}(x_1 - x_2),\ \operatorname{ReLU}(x_2 - x_1))$. If only one feature is active, it is reconstructed *exactly* — the ReLU removes the negative interference on the other.

::: proposition A phase change between the two configurations {#prop-phase}
With the inputs of [[#def-toy]], the antipodal configuration has loss $(1 + r)p^2/6$ and the dedicated configuration $r(p/3 - p^2/4)$. The antipodal configuration — superposition — has the lower loss if and only if
$$
p < p^* = \frac{4r}{2 + 5r}.
$$ {#eq-phase}
:::

::: proof
Antipodal: if at most one feature is active, the error is zero. Both are active with probability $p^2$, with $x_1, x_2$ independent uniform on $[0,1]$. If $x_1 > x_2$, then $\hat x_1 = x_1 - x_2$ and $\hat x_2 = 0$, so the errors are $x_2$ and $x_2$; symmetrically if $x_2 > x_1$. The weighted squared error is $(1 + r)\min(x_1, x_2)^2$. The minimum of two independent uniforms has density $2(1 - t)$ on $[0, 1]$, so $\E\min^2 = \int_0^12(1 - t)t^2\,dt = 2(\tfrac13 - \tfrac14) = \tfrac16$, giving loss $(1 + r)p^2/6$. Dedicated: the constant prediction $p/2 = \E x_2$ leaves the variance $\E x_2^2 - (\E x_2)^2 = p/3 - p^2/4$, weighted by $r$. Comparing, $(1 + r)p^2/6 < r(p/3 - p^2/4)$ iff (dividing by $p > 0$ and multiplying by $12$) $2(1 + r)p + 3rp < 4r$, i.e. $p < 4r/(2 + 5r)$.
:::

For equal importance, $p^* = 4/7\approx0.57$: once each feature is present less than about $57\%$ of the time, sharing a dimension beats dropping a feature. For a less important second feature, the threshold falls — $p^* = 0.267$ for $r = 0.2$ — because interference must be rarer to be worth it. Elhage et al. drew theoretical phase diagrams in this way, comparing the losses of a few candidate configurations over importance and density, and found that the training runs matched them closely, with sharp transitions. The comparison is between candidates, not over all models: near the boundary, trained models also find intermediate solutions (unequal weights and positive biases) that beat both, as the laboratory shows.

::: widget plot
f: r*(x/3 - x^2/4); (1 + r)*x^2/6
x: 0, 1
y: 0, 0.3
sliders: r=0.05:0.05:1
labels: \text{dedicated (feature 2 dropped)}; \text{antipodal (superposition)}
caption: Losses of the two configurations of [[#prop-phase]] as functions of the feature density $p$ (horizontal axis), for importance ratio $r$. Superposition wins to the left of the crossing at $p^* = 4r/(2 + 5r)$. Lower the importance of the second feature: the crossing moves left, so superposition requires sparser features.
:::

::: example Checking the antipodal configuration {#ex-antipodal}
In the antipodal configuration, compute $\hat{\mathbf{x}}$ for $\mathbf{x} = (0.8, 0)$, $(0, 0.5)$ and $(0.8, 0.5)$, and the loss on each with $r = 1$.
::: solution
$\mathbf{h} = x_1 - x_2$, and $\hat{\mathbf{x}} = (\operatorname{ReLU}(h), \operatorname{ReLU}(-h))$. For $(0.8, 0)$: $h = 0.8$, $\hat{\mathbf{x}} = (0.8, 0)$, loss $0$. For $(0, 0.5)$: $h = -0.5$, $\hat{\mathbf{x}} = (0, 0.5)$, loss $0$. For $(0.8, 0.5)$: $h = 0.3$, $\hat{\mathbf{x}} = (0.3, 0)$, errors $0.5$ and $0.5$, loss $0.5$. The single hidden number encodes *which* feature is active by its sign and *how much* by its magnitude; it fails only when both are present — which, for sparse features, is rare.
:::
:::

### What the toy model shows {#sec-findings}

With more features and dimensions, Elhage et al. reported (as empirical findings of their training runs):

- **A phase change with sparsity.** With dense features, the ReLU model behaves like the linear one: the $m$ most important features get orthogonal directions, the rest are dropped. As sparsity increases, more and more features are packed in, first in **antipodal pairs** and then in larger structures. The transitions are sharp.
- **Geometry.** Represented features organise into small regular configurations — antipodal pairs (*digons*), triangles, *pentagons* in two dimensions, tetrahedra and other uniform polytopes — with each feature occupying a definite fraction of a dimension, measured by a **feature dimensionality** $D_i = \lVert\mathbf{w}_i\rVert^2/\sum_j(\hat{\mathbf{w}}_i\cdot\mathbf{w}_j)^2$. The dimensionalities cluster at "sticky" fractions such as $1$, $\tfrac12$, $\tfrac23$, $\tfrac25$.
- **Correlated features** are preferentially placed orthogonally (they co-occur, so interference would be frequent), anticorrelated ones antipodally.
- **Computation in superposition.** A variant with a ReLU hidden layer, trained to compute absolute values of sparse inputs, computed in superposition too, not merely stored.
- **Privileged basis.** When the hidden layer itself has a ReLU — so its basis is privileged — features in superposition are spread across neurons, and neurons respond to several features: **polysemanticity** appears as a consequence of superposition. Features tend to align with neurons when there are few, and to mix when there are many.

The authors were explicit that these are toy models, chosen for tractability, with independent features, uniform magnitudes and a reconstruction objective, and that whether real models are in the same regime was an empirical question. Evidence that they are includes neurons in language models that respond to many unrelated features, sparse probing studies (Gurnee et al., 2023, "Finding Neurons in a Haystack") that found individual neurons encoding specific features in some layers and distributed, superposed encodings in others, and above all the success of sparse dictionary learning at recovering interpretable directions from polysemantic activations ([[interpretability/sparse-features]]).

::: quiz
In the linear toy model with $n = 10$ features and $m = 3$ dimensions, all with the same variance, and importances $I_i = 0.9^i$, which features does the optimal model represent, and how?
- [ ] All ten, in superposition, because $10 > 3$.
- [x] Features $1$, $2$ and $3$, along orthonormal directions; the other seven are dropped.
- [ ] The three least important features, because they cause least harm when mixed.
- [ ] It depends on the sparsity: sparse features are stored in superposition.
::: solution
By [[#thm-linear]], the linear model keeps the $m$ features with the largest $I_iv_i$ — here the three most important — orthogonally and drops the rest, whatever the sparsity. Sparsity matters only when a non-linearity such as the output ReLU can filter interference.
:::
:::

## From polysemantic neurons to features {#sec-poly}

Superposition gives a precise account of what goes wrong with neurons. A neuron is a coordinate of a privileged basis; if a layer stores $n\gg m$ features as directions $\mathbf{w}_i$ that are not aligned with coordinates, then neuron $k$'s pre-activation is $\sum_iw_{ik}x_i$, a mixture of every feature with non-zero $k$th component. On any given input only a few features are active, so the neuron seems to respond to "a cat face *or* a car front *or* …" — whichever of its features is present. Studying neurons one by one is then like studying a set of linear combinations of the variables of interest, with no way to undo the combination from one neuron alone.

The remedy suggested by the toy model is to change the basis: find the overcomplete set of directions $\{\mathbf{w}_i\}$ in which activations are sparse combinations, $\mathbf{h}\approx\sum_ix_i\mathbf{w}_i$ with few non-zero $x_i$. That is a **sparse dictionary learning** problem, an old one in signal processing and neuroscience (Olshausen and Field, 1996), and the subject of the next chapter. Elhage et al. also discussed two alternatives: training models that avoid superposition (for example with the softmax linear unit, SoLU, which Elhage et al. found in 2022 made more neurons interpretable, while also reporting evidence that some features were then hidden in other ways, partly through the normalisation that follows it), and accepting superposition but analysing it in other ways.

::: warning Superposition is a hypothesis about real models, supported but not proven
The toy models prove that superposition *can* be optimal and show its signatures. They do not prove that a given language model uses it, nor that its features are one-dimensional, independent or sparse in the toy model's sense. When an analysis assumes superposition — for instance when interpreting the directions found by a sparse autoencoder as the model's features — the assumption should be stated. Competing or complementary accounts exist: features may be multi-dimensional (circular, for periodic quantities), representations may be partly non-linear, and some apparent polysemanticity may reflect genuinely related concepts rather than unrelated features packed together.
:::

::: example Reading a polysemantic neuron {#ex-neuron}
A hidden layer with $m = 2$ neurons stores five features at the angles $0^\circ, 72^\circ, 144^\circ, 216^\circ, 288^\circ$ with unit norm (a pentagon). Which features does neuron $1$ (the first coordinate) respond to positively, and with what weights?
::: solution
Neuron $1$'s weight on feature $i$ is $\cos\theta_i$: $\cos0^\circ = 1$, $\cos72^\circ = 0.309$, $\cos144^\circ = -0.809$, $\cos216^\circ = -0.809$, $\cos288^\circ = 0.309$. It responds positively to features $1$, $2$ and $5$ — strongly to $1$ and weakly to $2$ and $5$ — and negatively to $3$ and $4$. A researcher looking at the top-activating inputs would see examples of feature $1$, then a mix of features $2$ and $5$: a polysemantic neuron. In the feature basis each direction is clean.
:::
:::

## A numerical laboratory {#sec-code}

The listing trains the toy model of [[#def-toy]] in plain Python with Adam: first $n = 2$ features in $m = 1$ dimension with importances $(1, 0.2)$ at several densities, to compare with $p^* = 0.267$ from [[#eq-phase]]; then $n = 5$ features in $m = 2$ dimensions with importances $0.7^i$, reporting which features are stored and at what angles; finally it measures the pairwise cosines of random sign vectors against the Welch bound [[#eq-welch]] and the guarantee of [[#thm-jl]]. It runs in about $15$ seconds.

```python
import math, random

def train_toy(n, m, p, imp, steps=3000, batch=64, lr=0.01, seed=0):
    """Toy model of superposition: x' = ReLU(W^T W x + b), W (m, n), b (n,), trained with
    Adam on loss sum_i imp_i (x'_i - x_i)^2. Each feature is active with probability p,
    uniform on [0, 1] when active."""
    rng = random.Random(seed)
    W = [[rng.gauss(0, 0.5) for _ in range(n)] for _ in range(m)]
    b = [0.0] * n
    mW, vW = [[0.0] * n for _ in range(m)], [[0.0] * n for _ in range(m)]   # Adam moments
    mb, vb = [0.0] * n, [0.0] * n
    def adam(mo, va, k, grad, t):                     # returns the Adam step for one entry
        mo[k] = 0.9 * mo[k] + 0.1 * grad
        va[k] = 0.999 * va[k] + 0.001 * grad * grad
        return lr * (mo[k] / (1 - 0.9 ** t)) / (math.sqrt(va[k] / (1 - 0.999 ** t)) + 1e-8)
    for t in range(1, steps + 1):
        gW = [[0.0] * n for _ in range(m)]; gb = [0.0] * n
        for _ in range(batch):
            x = [rng.random() if rng.random() < p else 0.0 for _ in range(n)]
            h = [sum(W[r][j] * x[j] for j in range(n)) for r in range(m)]            # (m,)
            pre = [sum(W[r][i] * h[r] for r in range(m)) + b[i] for i in range(n)]    # (n,)
            g = [2 * imp[i] * (max(0.0, pre[i]) - x[i]) * (pre[i] > 0) / batch for i in range(n)]
            gh = [sum(W[r][i] * g[i] for i in range(n)) for r in range(m)]
            for r in range(m):
                for j in range(n): gW[r][j] += g[j] * h[r] + gh[r] * x[j]
            for i in range(n): gb[i] += g[i]
        for r in range(m):
            for j in range(n): W[r][j] -= adam(mW[r], vW[r], j, gW[r][j], t)
        for i in range(n): b[i] -= adam(mb, vb, i, gb[i], t)
    return W, b

# 1. Two features, one dimension; feature 2 has importance r = 0.2.
#    The comparison of two configurations predicts superposition below p* = 4r/(2 + 5r) = 0.267.
for p in [0.6, 0.4, 0.3, 0.2, 0.1]:
    W, b = train_toy(2, 1, p, [1.0, 0.2])
    w1, w2 = W[0]
    kind = "antipodal (superposition)" if w1 * w2 < -0.25 else "feature 2 dropped"
    print(f"n=2, m=1, p={p}: W = ({w1:+.2f}, {w2:+.2f}), b = ({b[0]:+.2f}, {b[1]:+.2f})  -> {kind}")

# 2. Five features, two dimensions, importance 0.7^i: features stored, and their angles.
for p in [1.0, 0.3, 0.05]:
    W, b = train_toy(5, 2, p, [0.7 ** i for i in range(5)], steps=4000, seed=1)
    norms = [math.hypot(W[0][j], W[1][j]) for j in range(5)]
    stored = [j for j in range(5) if norms[j] > 0.5]
    ang = sorted(round(math.degrees(math.atan2(W[1][j], W[0][j])) % 360) for j in stored)
    print(f"n=5, m=2, p={p}: norms {[round(v, 2) for v in norms]}, {len(stored)} stored, angles {ang}")

# 3. How nearly orthogonal can N random sign vectors in R^m be?
rng = random.Random(5)
for m, N in [(50, 400), (200, 400), (200, 1600)]:
    vs = [rng.getrandbits(m) for _ in range(N)]             # bit k of an integer = sign k
    cs = [abs(m - 2 * bin(vs[i] ^ vs[j]).count("1")) / m    # |<u, v>| = |m - 2 Hamming| / m
          for i in range(N) for j in range(i)]
    welch = math.sqrt((N - m) / (m * (N - 1)))             # no N unit vectors can do better
    guarantee = math.sqrt(4 * math.log(N) / m)            # N <= exp(m eps^2 / 4) suffices
    print(f"m={m:3d} N={N:4d}: mean |cos| {sum(cs) / len(cs):.3f}, max |cos| {max(cs):.3f}; "
          f"Welch bound {welch:.3f}, guaranteed eps {guarantee:.3f}")
```

```text
n=2, m=1, p=0.6: W = (+1.00, -0.01), b = (+0.00, +0.30)  -> feature 2 dropped
n=2, m=1, p=0.4: W = (+1.00, +0.01), b = (-0.00, +0.19)  -> feature 2 dropped
n=2, m=1, p=0.3: W = (+1.04, -0.67), b = (+0.02, +0.10)  -> antipodal (superposition)
n=2, m=1, p=0.2: W = (+1.02, -0.91), b = (-0.00, +0.03)  -> antipodal (superposition)
n=2, m=1, p=0.1: W = (+1.00, -1.00), b = (-0.01, +0.00)  -> antipodal (superposition)
n=5, m=2, p=1.0: norms [1.0, 1.0, 0.02, 0.02, 0.01], 2 stored, angles [16, 286]
n=5, m=2, p=0.3: norms [1.01, 1.03, 0.99, 0.03, 0.91], 4 stored, angles [41, 133, 221, 311]
n=5, m=2, p=0.05: norms [1.12, 1.08, 1.13, 1.13, 0.96], 5 stored, angles [37, 115, 174, 240, 319]
m= 50 N= 400: mean |cos| 0.113, max |cos| 0.600; Welch bound 0.132, guaranteed eps 0.692
m=200 N= 400: mean |cos| 0.056, max |cos| 0.330; Welch bound 0.050, guaranteed eps 0.346
m=200 N=1600: mean |cos| 0.056, max |cos| 0.360; Welch bound 0.066, guaranteed eps 0.384
```

The two-feature runs switch from "dedicated" to "antipodal" between $p = 0.4$ and $p = 0.3$, close to the predicted $0.267$; the run at $p = 0.3$ is one of the intermediate solutions mentioned above ($\lvert w_2\rvert < \lvert w_1\rvert$, positive bias). For dense features ($p = 1$) the five-feature model keeps the two most important features at right angles ($286^\circ - 16^\circ = 270^\circ$, i.e. $90^\circ$) and drops the rest, as [[#thm-linear]] predicts for the linear model; at $p = 0.3$ it stores four, as two antipodal pairs at right angles ($41^\circ/221^\circ$ and $133^\circ/311^\circ$); at $p = 0.05$ all five, in a near-regular pentagon with gaps of about $72^\circ$. For random vectors, the mean $\lvert\cos\rvert$ matches $\sqrt{2/(\pi m)}$ ($0.113$ and $0.056$), the maximum lies between the Welch lower bound and the union-bound guarantee, and quadrupling $N$ from $400$ to $1600$ raises the maximum only from $0.330$ to $0.360$.

::: history
Distributed representations — concepts encoded by patterns over many units — were central to connectionism (Hinton, McClelland and Rumelhart, 1986), and sparse coding of natural images (Olshausen and Field, 1996) showed that an overcomplete dictionary with sparse coefficients yields interpretable, localised features. Polysemantic neurons were documented in vision models by Nguyen, Yosinski and Clune (2016) and Olah et al. (2017, 2020). Arora et al. (2018) showed that word embeddings are linear superpositions of word senses recoverable by sparse coding. Elhage et al. (2022), *Toy Models of Superposition* on the Transformer Circuits Thread, gave the systematic account: phase changes, geometry, computation in superposition and the link to polysemanticity; the *Softmax Linear Units* paper (Elhage et al., 2022) tried to reduce polysemanticity architecturally. Gurnee et al. (2023) probed neurons for superposition in language models, Park et al. (2023) formalised the linear representation hypothesis, and Engels et al. (2024) found multi-dimensional circular features. The Johnson–Lindenstrauss lemma dates from 1984, Welch's bound from 1974, and Hoeffding's inequality from 1963.
:::

::: summary
- Networks are thought to represent **features** as **directions**; storing more features than dimensions is **superposition**, and it makes neurons **polysemantic** when the features are not aligned with the neuron basis.
- $\R^m$ contains at least $\exp(m\varepsilon^2/4)$ unit vectors with pairwise $\lvert\cos\rvert<\varepsilon$ (random sign vectors and a union bound); no $N > m$ unit vectors can have all $\lvert\cos\rvert$ below $\sqrt{(N - m)/(m(N - 1))}$ (Welch). Interference from $k$ active random features has size about $\sqrt{k/m}$, so superposition needs **sparsity**.
- In the toy model $\hat{\mathbf{x}} = \operatorname{ReLU}(W\T W\mathbf{x} + \mathbf{b})$, the **linear** variant provably keeps the $m$ most important features orthogonally (Eckart–Young); with the ReLU, sparse features are packed in **antipodal pairs** and polytopes, with a **phase change**: for two features in one dimension, superposition beats dropping a feature when $p < 4r/(2 + 5r)$.
- The toy-model results are empirical findings in simplified settings; real models show compatible evidence, and also features that are multi-dimensional or non-linear.
- Superposition motivates finding an overcomplete, sparse **dictionary** of feature directions — [[interpretability/sparse-features]].
:::

## Exercises

::: exercise Three vectors in the plane {level=1 check="0.5"}
Use the Welch bound to find the smallest possible value of $\max_{i\ne j}\lvert\mathbf{u}_i\cdot\mathbf{u}_j\rvert$ for three unit vectors in $\R^2$, and give vectors that achieve it.
::: solution
$\sqrt{(3 - 2)/(2\cdot2)} = 0.5$. Three unit vectors at $120^\circ$ to each other have pairwise cosines $\cos120^\circ = -0.5$, achieving the bound.
:::
:::

::: exercise A capacity guarantee {level=1 check="exp(10)"}
How many unit vectors in $\R^{1000}$ with pairwise $\lvert\cos\rvert<0.2$ does [[#thm-jl]] guarantee?
::: solution
$\exp(1000\times0.04/4) = \exp(10)\approx22{,}026$.
:::
:::

::: exercise The linear toy model's loss {level=1 check="0.0667"}
A linear toy model has $n = 4$ features with variances all equal to $1/12$ (uniform on $[0, 1]$, always active), importances $1, 0.8, 0.5, 0.3$, and $m = 2$. What is the minimum loss? Give four decimal places.
::: solution
By [[#thm-linear]] the model keeps the two most important features and loses $\sum_{i>2}I_iv_i = (0.5 + 0.3)/12 = 0.0667$.
:::
:::

::: exercise The phase boundary {level=2 check="4/9"}
For $n = 2$, $m = 1$ and importance ratio $r = 0.5$, compute the density $p^*$ below which the antipodal configuration beats the dedicated one. Then predict whether a model trained at $p = 0.5$ uses superposition, and explain what training actually shows (the listing can be modified to check: train with `imp = [1.0, 0.5]`).
::: solution
$p^* = 4(0.5)/(2 + 2.5) = 2/4.5 = 4/9\approx0.444$. At $p = 0.5 > p^*$ the comparison predicts the dedicated configuration. Training with importances $(1, 0.5)$ gives $W = (+1.04, -0.68)$, $\mathbf{b} = (+0.06, +0.21)$ at $p = 0.5$ — partial superposition — and $W = (+1.00, -0.01)$ (feature $2$ dropped) at $p = 0.6$. The trained model enters superposition at a somewhat *higher* density than predicted, because intermediate configurations (a shorter $\mathbf{w}_2$ with a positive bias) beat both candidates near the boundary; the two-candidate analysis gives a lower bound on where superposition begins to pay, not the exact optimum.
:::
:::

::: exercise The minimum of two uniforms {level=2}
Derive the density of $\min(x_1, x_2)$ for independent $x_1, x_2$ uniform on $[0, 1]$, and verify $\E\min^2 = 1/6$. Then compute the antipodal configuration's loss when active features are uniform on $[0, 2]$ instead, with $r = 1$.
::: solution
$\Prob(\min > t) = (1 - t)^2$, so the density is $2(1 - t)$ and $\E\min^2 = \int_0^12(1 - t)t^2\,dt = 2(\tfrac13 - \tfrac14) = \tfrac16$. For uniforms on $[0, 2]$, $\min$ scales by $2$, so $\E\min^2 = 4/6 = 2/3$, and the loss is $p^2\cdot2\cdot\tfrac23 = \tfrac43p^2$ (both features weighted $1$). Everything scales by the square of the magnitude, so the phase boundary is unchanged: the dedicated loss also scales by $4$.
:::
:::

::: exercise Interference noise {level=2}
A layer of width $m = 1024$ stores features along random unit directions. Each token activates $k$ features with value $1$. Estimate the standard deviation of the interference when reading one active feature by a dot product, for $k = 10$ and $k = 100$, and the largest $k$ for which it stays below $0.25$.
::: solution
The interference is a sum of $k - 1$ cosines with variance about $1/m$ each, so its standard deviation is about $\sqrt{(k - 1)/m}$: $\sqrt{9/1024} = 0.094$ for $k = 10$, $\sqrt{99/1024} = 0.31$ for $k = 100$. For $\sqrt{(k - 1)/1024} < 0.25$ we need $k - 1 < 64$, so $k\le64$. A ReLU readout with a negative bias can remove much of the remaining interference, as in the toy model, so a real network can tolerate somewhat more.
:::
:::

::: exercise The simplex achieves the Welch bound {level=3}
Show that for $N = m + 1$ the Welch bound equals $1/m$, and that the $m + 1$ vertices of a regular simplex centred at the origin, normalised to unit length, have all pairwise inner products equal to $-1/m$. Why do the toy models' tetrahedra (three dimensions, four features) and triangles (two dimensions, three features) appear?
::: solution
$\sqrt{(m + 1 - m)/(m\cdot m)} = 1/m$. For the simplex, $\sum_i\mathbf{u}_i = \mathbf{0}$ (centred), so $0 = \lVert\sum_i\mathbf{u}_i\rVert^2 = (m + 1) + \sum_{i\ne j}\mathbf{u}_i\cdot\mathbf{u}_j$; by symmetry all $m(m + 1)$ off-diagonal inner products are equal, to $-(m + 1)/(m(m + 1)) = -1/m$. Equality in the Welch bound requires all $\lvert\cos\rvert$ equal (equality in $\sum_{i\ne j}G_{ij}^2\le N(N-1)\mu^2$) and the Gram matrix to have $m$ equal non-zero eigenvalues (equality in Cauchy–Schwarz), which the simplex satisfies. With $m + 1$ equally important sparse features in $m$ dimensions, the configuration that minimises the worst interference is the simplex, and its interferences are all *negative*, which the ReLU removes when only one feature is active — hence triangles in $\R^2$ and tetrahedra in $\R^3$ in the toy model's sparse regime.
:::
:::

::: exercise Polysemanticity in a privileged basis {level=3}
Consider the variant of the toy model with a ReLU hidden layer of $m$ neurons, $\mathbf{h} = \operatorname{ReLU}(W\mathbf{x})$, $\hat{\mathbf{x}} = \operatorname{ReLU}(W\T\mathbf{h} + \mathbf{b})$. (a) Show that if $n\le m$ and features are stored along distinct coordinate axes ($\mathbf{w}_i = \mathbf{e}_{k(i)}$), reconstruction is exact and every used neuron is monosemantic. (b) With $n = 2m$ and the antipodal trick, can each neuron store two features? What happens to the neuron's interpretability?
::: solution
(a) $\mathbf{h} = \operatorname{ReLU}(\sum_ix_i\mathbf{e}_{k(i)})$ has $h_{k(i)} = x_i\ge0$ and zeros elsewhere; $W\T\mathbf{h}$ returns $x_i$ in coordinate $i$, so with $\mathbf{b} = \mathbf{0}$ the reconstruction is exact, and neuron $k(i)$ responds only to feature $i$. (b) In the output-ReLU toy model the antipodal pair works because the hidden value $x_1 - x_2$ can be negative. With a hidden ReLU, $\operatorname{ReLU}(x_1 - x_2)$ loses $x_2$ entirely, so a single neuron cannot store an antipodal pair; instead the trained models spread features over *several* neurons — for example two neurons with weights $(1, -1)$ and $(-1, 1)$ on two features recover both, and with more features than neurons each neuron carries positive weight on several features. Each neuron then fires for any of several unrelated features: it is polysemantic, and its meaning can be recovered only by finding the feature directions across neurons — the task of sparse dictionary learning.
:::
:::

::: exercise Reading a pentagon {level=2}
In [[#ex-neuron]], feature $1$ is active with value $1$ and no other feature is active. Compute the hidden vector, and the reconstruction $\operatorname{ReLU}(W\T\mathbf{h})$ with $\mathbf{b} = \mathbf{0}$, for all five features. Which reconstructions are wrong, and how could a bias fix them?
::: solution
$\mathbf{h} = \mathbf{w}_1 = (1, 0)$, and $W\T\mathbf{h}$ has entries $\mathbf{w}_i\cdot\mathbf{w}_1 = \cos\theta_i$: $1, 0.309, -0.809, -0.809, 0.309$. After the ReLU: $(1, 0.309, 0, 0, 0.309)$. Feature $1$ is reconstructed exactly and features $3, 4$ are correctly $0$, but features $2$ and $5$ get spurious values $0.309$ from positive interference. A bias $b_i = -0.309$ on every output removes it (the ReLU clips $0.309 - 0.309 = 0$), at the cost of reducing a genuinely active feature's output by $0.309$; scaling the weights up slightly compensates. The trained toy models indeed learn negative biases in the sparse regime.
:::
:::
