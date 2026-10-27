Training a neural network means adjusting millions or billions of numbers so that a single number, the loss, goes down. To know which way to adjust each weight we need the derivative of the loss with respect to every weight at once: the **gradient**. A language model with $7\times10^9$ parameters needs $7\times10^9$ partial derivatives at every training step, and it gets them at a cost of only a few forward passes, thanks to one idea — the chain rule, applied backwards through the computation. That procedure is called **backpropagation**, and every deep-learning library implements it automatically.

Automatic does not mean opaque. You will read gradients in papers, derive them for new layers, debug them when training diverges, and reason about their cost. This chapter develops the calculus needed: partial derivatives and gradients, Jacobians as the derivatives of vector-valued maps, the multivariable chain rule, a few identities of matrix calculus, and two derivations that every practitioner should be able to do on paper — the gradient of a linear layer and the gradient of the softmax cross-entropy loss. The Maths Atlas lessons on [partial derivatives](/learn/maths/lesson.php?c=multivariable&l=partial-derivatives), the [gradient](/learn/maths/lesson.php?c=multivariable&l=gradient) and the [chain rule](/learn/maths/lesson.php?c=calculus-1&l=chain-rule) give the analysis behind it.

## Partial derivatives and the gradient {#sec-gradient}

::: definition Partial derivative and gradient {#def-gradient}
Let $f\colon\R^n\to\R$. The **partial derivative** of $f$ with respect to $x_i$ at $\mathbf{x}$ is

$$
\frac{\partial f}{\partial x_i}(\mathbf{x}) = \lim_{h\to0}\frac{f(\mathbf{x} + h\mathbf{e}_i) - f(\mathbf{x})}{h},
$$

the ordinary derivative in $x_i$ with all other coordinates held fixed. The **gradient** is the vector of all partial derivatives,

$$
\nabla f(\mathbf{x}) = \Big(\frac{\partial f}{\partial x_1}, \dots, \frac{\partial f}{\partial x_n}\Big)\in\R^n.
$$

$f$ is **differentiable** at $\mathbf{x}$ if $f(\mathbf{x} + \mathbf{h}) = f(\mathbf{x}) + \nabla f(\mathbf{x})\cdot\mathbf{h} + o(\lVert\mathbf{h}\rVert)$ as $\mathbf{h}\to\mathbf{0}$.
:::

The last line is the important one: near $\mathbf{x}$, a differentiable function is approximately linear, and the gradient is the vector that describes that linear approximation. Moving a small step $\mathbf{h}$ changes $f$ by about $\nabla f\cdot\mathbf{h}$. Every gradient-based training method rests on this first-order approximation, and its failure for steps that are too large is the subject of [[math-for-ml/optimisation]].

::: proposition The gradient is the direction of steepest ascent {#prop-steepest}
Let $f$ be differentiable at $\mathbf{x}$ with $\nabla f(\mathbf{x})\ne\mathbf{0}$. The **directional derivative** of $f$ in the direction of a unit vector $\mathbf{u}$ is $D_{\mathbf{u}}f(\mathbf{x}) = \nabla f(\mathbf{x})\cdot\mathbf{u}$. Among all unit vectors it is largest for $\mathbf{u} = \nabla f/\lVert\nabla f\rVert$, where it equals $\lVert\nabla f(\mathbf{x})\rVert$, and smallest for the opposite direction. It is zero for directions perpendicular to the gradient, which are tangent to the level set of $f$ through $\mathbf{x}$.
:::

::: proof
By differentiability $f(\mathbf{x} + t\mathbf{u}) = f(\mathbf{x}) + t\,\nabla f\cdot\mathbf{u} + o(t)$, so the derivative of $t\mapsto f(\mathbf{x} + t\mathbf{u})$ at $t = 0$ is $\nabla f\cdot\mathbf{u}$. By Cauchy–Schwarz ([[math-for-ml/vectors-matrices#prop-cauchy-schwarz]]), $-\lVert\nabla f\rVert\le\nabla f\cdot\mathbf{u}\le\lVert\nabla f\rVert$ for unit $\mathbf{u}$, with equality on the right exactly when $\mathbf{u}$ is a positive multiple of $\nabla f$ and on the left when it is a negative multiple.
:::

Gradient descent therefore steps in the direction $-\nabla f$, the direction in which the loss decreases fastest *locally*. "Locally" matters: on an elongated valley the steepest direction points mostly across the valley rather than along it, which is why plain gradient descent zig-zags and why the optimisers of [[math-for-ml/optimisation]] add momentum and per-coordinate scaling.

::: example A gradient on a contour map {#ex-contour}
For $f(x, y) = x^2 + 2y^2$ find $\nabla f(1, 1)$, the rate of steepest ascent there, and the directional derivative towards the origin.
::: solution
$\nabla f = (2x, 4y)$, so $\nabla f(1, 1) = (2, 4)$, with length $\sqrt{20} = 4.472$: no direction increases $f$ faster than $4.47$ units per unit step. The unit vector towards the origin is $\mathbf{u} = -(1, 1)/\sqrt2$, and $D_{\mathbf{u}}f = -(2 + 4)/\sqrt2 = -4.243$. The direct route to the minimum is a good descent direction, but not the steepest one: $-\nabla f$ points along $-(1, 2)$, more towards the $x$-axis than towards the origin, because $f$ rises faster in $y$.
:::
:::

::: widget contour
f: x^2 + 2y^2
x: -2, 2
y: -2, 2
point: 1,1
gradient: true
caption: Level curves of $f(x, y) = x^2 + 2y^2$ with the gradient at a draggable point. The gradient is always perpendicular to the level curve and points uphill; its length is the steepest rate of increase. Drag the point and notice that $-\nabla f$ generally does *not* point at the minimum at the origin.
:::

## Jacobians {#sec-jacobian}

A layer of a network maps vectors to vectors, so we need derivatives of vector-valued functions.

::: definition Jacobian matrix {#def-jacobian}
Let $\mathbf{f}\colon\R^n\to\R^m$ have components $f_1, \dots, f_m$. Its **Jacobian** at $\mathbf{x}$ is the $m\times n$ matrix

$$
J_{\mathbf{f}}(\mathbf{x}) = \frac{\partial\mathbf{f}}{\partial\mathbf{x}} = \begin{pmatrix}\dfrac{\partial f_1}{\partial x_1}&\cdots&\dfrac{\partial f_1}{\partial x_n}\\\vdots&&\vdots\\\dfrac{\partial f_m}{\partial x_1}&\cdots&\dfrac{\partial f_m}{\partial x_n}\end{pmatrix},
$$

so that $\mathbf{f}(\mathbf{x} + \mathbf{h})\approx\mathbf{f}(\mathbf{x}) + J_{\mathbf{f}}(\mathbf{x})\mathbf{h}$. Row $i$ is the gradient of $f_i$ (written as a row); for $m = 1$ the Jacobian is the row vector $\nabla f^\top$.
:::

Three Jacobians cover most of a neural network:

- A **linear map** $\mathbf{f}(\mathbf{x}) = W\mathbf{x} + \mathbf{b}$ has $J = W$, at every point: a linear map is its own best linear approximation.
- An **elementwise activation** $\mathbf{f}(\mathbf{x}) = (\phi(x_1), \dots, \phi(x_n))$ has the diagonal Jacobian $J = \diag(\phi'(x_1), \dots, \phi'(x_n))$, because output $i$ depends only on input $i$. For ReLU, $\phi'(x)$ is $1$ for $x > 0$ and $0$ for $x < 0$: the Jacobian is a mask that passes gradients through active units and blocks them at inactive ones.
- The **softmax** $\mathbf{p} = \operatorname{softmax}(\mathbf{z})$ has the dense Jacobian $\diag(\mathbf{p}) - \mathbf{p}\mathbf{p}^\top$, derived in [[#prop-softmax-ce]] below and used in [[transformers/self-attention]] to explain the $1/\sqrt{d_k}$ scale.

::: example The Jacobian of a small map {#ex-jacobian}
Find the Jacobian of $\mathbf{f}(x, y) = (xy,\ x + y^2,\ e^x)$ at $(0, 1)$, and use it to approximate $\mathbf{f}(0.1, 0.9)$.
::: solution
$$
J = \begin{pmatrix}y&x\\1&2y\\e^x&0\end{pmatrix},\qquad J(0, 1) = \begin{pmatrix}1&0\\1&2\\1&0\end{pmatrix}.
$$

It is $3\times2$: three outputs, two inputs. With $\mathbf{f}(0, 1) = (0, 1, 1)$ and $\mathbf{h} = (0.1, -0.1)$, $J\mathbf{h} = (0.1, -0.1, 0.1)$, so $\mathbf{f}(0.1, 0.9)\approx(0.1, 0.9, 1.1)$. The exact values are $(0.09, 0.91, 1.105)$: the errors, about $0.01$, are of order $\lVert\mathbf{h}\rVert^2$, as the linear approximation promises.
:::
:::

## The chain rule {#sec-chain}

::: theorem Multivariable chain rule {#thm-chain}
Let $\mathbf{g}\colon\R^n\to\R^k$ be differentiable at $\mathbf{x}$ and $\mathbf{f}\colon\R^k\to\R^m$ differentiable at $\mathbf{g}(\mathbf{x})$. Then $\mathbf{f}\circ\mathbf{g}$ is differentiable at $\mathbf{x}$ and

$$
J_{\mathbf{f}\circ\mathbf{g}}(\mathbf{x}) = J_{\mathbf{f}}\big(\mathbf{g}(\mathbf{x})\big)\,J_{\mathbf{g}}(\mathbf{x}),
$$ {#eq-chain}

an $(m\times k)(k\times n)$ matrix product. In components, $\dfrac{\partial f_i}{\partial x_j} = \displaystyle\sum_{l=1}^k\frac{\partial f_i}{\partial g_l}\frac{\partial g_l}{\partial x_j}$.
:::

The idea of the proof is that a composition of two maps that are approximately linear is approximately the composition of the linear maps, and the composition of linear maps is the matrix product ([[math-for-ml/vectors-matrices#def-matmul]]); the Maths Atlas proves it carefully in [the gradient lesson](/learn/maths/lesson.php?c=multivariable&l=gradient). The component form has a useful reading: the influence of $x_j$ on $f_i$ is the sum, over every intermediate quantity $g_l$, of the influence passed along that route.

A deep network is a long composition, $\mathbf{x}\mapsto\mathbf{h}_1\mapsto\mathbf{h}_2\mapsto\dots\mapsto\mathbf{h}_L\mapsto\mathcal{L}$, ending in a scalar loss. By [[#eq-chain]] the derivative of the loss with respect to the input is a product of Jacobians,

$$
\frac{\partial\mathcal{L}}{\partial\mathbf{x}} = \underbrace{\frac{\partial\mathcal{L}}{\partial\mathbf{h}_L}}_{1\times d_L}\ \underbrace{\frac{\partial\mathbf{h}_L}{\partial\mathbf{h}_{L-1}}}_{d_L\times d_{L-1}}\cdots\underbrace{\frac{\partial\mathbf{h}_1}{\partial\mathbf{x}}}_{d_1\times d_0}.
$$ {#eq-product}

Matrix multiplication is associative, so this product can be evaluated in any order — and the order makes an enormous difference to the cost.

### Forward and reverse mode {#sec-modes}

Evaluating [[#eq-product]] from right to left (**forward mode**) multiplies Jacobian matrices together, $d_1\times d_0$ by $d_2\times d_1$ and so on, carrying a full matrix of size $d_\ell\times d_0$ forward. Evaluating it from left to right (**reverse mode**) starts with the $1\times d_L$ row vector $\partial\mathcal{L}/\partial\mathbf{h}_L$ and multiplies it by one Jacobian at a time; every intermediate result is a single row vector, $\partial\mathcal{L}/\partial\mathbf{h}_\ell$. A row vector times a matrix is a **vector–Jacobian product**, and it never requires forming the Jacobian: for a linear layer it is $\boldsymbol{\delta}^\top W$, for an elementwise activation it is an elementwise product.

::: proposition The cheap gradient principle {#prop-cheap-gradient}
Let $f\colon\R^n\to\R$ be computed by a program made of elementary operations, at cost $C$. Reverse-mode differentiation computes the whole gradient $\nabla f\in\R^n$ at a cost that is a small constant multiple of $C$ (in practice about two to three times $C$), independent of $n$; it must store the intermediate values of the forward computation. Forward mode needs one pass per input direction, so $n$ passes for the full gradient.
:::

::: proof
(Sketch.) Reverse mode visits each elementary operation of the program once more, in reverse order. An operation $v = \psi(u_1, \dots, u_q)$ receives the adjoint $\bar v = \partial f/\partial v$ and adds $\bar v\,\partial\psi/\partial u_i$ to each $\bar u_i$; by the component form of [[#thm-chain]] the accumulated $\bar u_i$ is exactly $\partial f/\partial u_i$ once all the operations that use $u_i$ have been visited. The partial derivatives of an elementary operation cost at most a constant times the operation itself, so the reverse sweep costs a constant multiple of $C$. Each adjoint requires the forward values $u_i$ at which $\partial\psi/\partial u_i$ is evaluated, which is why they must be stored. A careful bound (Baur and Strassen, 1983; Griewank and Walther, 2008) gives a constant of at most about $5$ for arithmetic operations.
:::

This is the reason deep learning is possible at all. With $n = 7\times10^9$ parameters, forward mode would need billions of passes per step; reverse mode needs the equivalent of about two. The price is memory: every activation of the forward pass is kept until the backward pass has used it, which is why activations dominate memory in training and why techniques such as activation checkpointing (recomputing some activations instead of storing them) exist.

::: warning A gradient has the shape of what it differentiates
For a scalar loss $\mathcal{L}$ and a weight matrix $W\in\R^{m\times n}$, the gradient $\partial\mathcal{L}/\partial W$ is also an $m\times n$ matrix, with entry $(i, j)$ equal to $\partial\mathcal{L}/\partial W_{ij}$; that is what makes the update $W\leftarrow W - \eta\,\partial\mathcal{L}/\partial W$ possible. Texts disagree on whether the derivative of a vector with respect to a vector is $m\times n$ (the "numerator layout" used here) or its transpose, and copying a formula from a source that uses the other layout gives transposed results. The safe rule: write the shape of every quantity, and check that the shapes in your formula multiply correctly and produce the shape of the parameter.
:::

## Gradients of a linear layer {#sec-linear-grad}

The backward pass of a network consists mostly of one computation, repeated for every linear layer.

::: proposition Gradients of a linear layer {#prop-linear-grad}
Let $\mathbf{y} = W\mathbf{x} + \mathbf{b}$ with $W\in\R^{m\times n}$, and let $\mathcal{L}$ be a scalar that depends on $\mathbf{y}$, with **upstream gradient** $\boldsymbol{\delta} = \partial\mathcal{L}/\partial\mathbf{y}\in\R^m$. Then

$$
\frac{\partial\mathcal{L}}{\partial W} = \boldsymbol{\delta}\mathbf{x}^\top\in\R^{m\times n},\qquad \frac{\partial\mathcal{L}}{\partial\mathbf{b}} = \boldsymbol{\delta},\qquad \frac{\partial\mathcal{L}}{\partial\mathbf{x}} = W^\top\boldsymbol{\delta}\in\R^n.
$$ {#eq-linear-grad}

For a batch $Y = XW^\top + \mathbf{1}\mathbf{b}^\top$ with $X\in\R^{N\times n}$ and upstream gradients $\Delta = \partial\mathcal{L}/\partial Y\in\R^{N\times m}$,

$$
\frac{\partial\mathcal{L}}{\partial W} = \Delta^\top X = \sum_{s=1}^N\boldsymbol{\delta}_s\mathbf{x}_s^\top,\qquad \frac{\partial\mathcal{L}}{\partial\mathbf{b}} = \Delta^\top\mathbf{1},\qquad \frac{\partial\mathcal{L}}{\partial X} = \Delta W.
$$
:::

::: proof
$y_i = \sum_jW_{ij}x_j + b_i$, so $\partial y_i/\partial W_{kl} = [i = k]\,x_l$. By the chain rule $\partial\mathcal{L}/\partial W_{kl} = \sum_i\delta_i\,[i = k]\,x_l = \delta_kx_l$, the $(k, l)$ entry of $\boldsymbol{\delta}\mathbf{x}^\top$. Likewise $\partial y_i/\partial b_k = [i = k]$ gives $\delta_k$, and $\partial y_i/\partial x_l = W_{il}$ gives $\partial\mathcal{L}/\partial x_l = \sum_iW_{il}\delta_i = (W^\top\boldsymbol{\delta})_l$. For a batch, the loss depends on $W$ through every row of $Y$, and the contributions add: $\sum_s\boldsymbol{\delta}_s\mathbf{x}_s^\top$, which by the outer-product view of [[math-for-ml/vectors-matrices#prop-views]] is $\Delta^\top X$. The other two follow row by row.
:::

The weight gradient is an outer product: input times upstream gradient. It is large for weights that connect strongly active inputs to outputs that the loss is sensitive to — a precise version of "neurons that fire together wire together", driven by error rather than mere co-activity. The gradient with respect to the input, $W^\top\boldsymbol{\delta}$, sends the error backwards through the transpose of the forward weights; this is the "back" in backpropagation.

The batch formula also gives the cost. Forward: $XW^\top$ costs $2Nmn$ FLOPs. Backward: $\Delta^\top X$ and $\Delta W$ cost $2Nmn$ each. Training therefore costs about three times the forward pass — the origin of the standard estimate of $6N$ FLOPs per parameter-token for training versus $2N$ for inference (exercise 5).

## The softmax and the cross-entropy loss {#sec-softmax-ce}

A language model ends with a vector of **logits** $\mathbf{z}\in\R^{\lvert\mathcal{V}\rvert}$, turns them into a distribution $\mathbf{p} = \operatorname{softmax}(\mathbf{z})$ over the vocabulary, and is trained with the **cross-entropy loss** $\mathcal{L} = -\log p_y$ of the correct next token $y$ (why this loss, is explained in [[math-for-ml/information-theory]]). The gradient of this combination is remarkably simple.

::: proposition Gradient of softmax cross-entropy {#prop-softmax-ce}
Let $\mathbf{p} = \operatorname{softmax}(\mathbf{z})$, with $p_i = e^{z_i}/\sum_ke^{z_k}$. Then

1. the Jacobian of the softmax is $\dfrac{\partial p_i}{\partial z_j} = p_i(\delta_{ij} - p_j)$, that is $J = \diag(\mathbf{p}) - \mathbf{p}\mathbf{p}^\top$;
2. for the loss $\mathcal{L} = -\log p_y$, with $\mathbf{e}_y$ the one-hot vector of the target,

$$
\frac{\partial\mathcal{L}}{\partial\mathbf{z}} = \mathbf{p} - \mathbf{e}_y.
$$ {#eq-softmax-ce}

More generally, for a target distribution $\mathbf{q}$ and $\mathcal{L} = -\sum_iq_i\log p_i$, the gradient is $\mathbf{p} - \mathbf{q}$.
:::

::: proof
(1) Put $S = \sum_ke^{z_k}$, so $\partial S/\partial z_j = e^{z_j}$. By the quotient rule $\partial p_i/\partial z_j = (\delta_{ij}e^{z_i}S - e^{z_i}e^{z_j})/S^2 = p_i\delta_{ij} - p_ip_j$.

(2) It is easier to differentiate directly than to use (1): $-\log p_y = -z_y + \log S$, so

$$
\frac{\partial\mathcal{L}}{\partial z_j} = -\delta_{jy} + \frac{e^{z_j}}{S} = p_j - \delta_{jy}.
$$

For a general target, $-\sum_iq_i\log p_i = -\sum_iq_iz_i + \big(\sum_iq_i\big)\log S$, and since $\sum_iq_i = 1$ the derivative in $z_j$ is $-q_j + p_j$.
:::

The gradient is "prediction minus target". Its entries sum to zero; it pushes the correct logit up by $1 - p_y$, and every other logit down by its probability $p_j$, so tokens the model wrongly favours are pushed down hardest. It is bounded — every entry lies in $[-1, 1]$ — however wrong the model is, which helps keep training stable, and it vanishes only when the model puts probability one on the target. The derivation also explains a numerical rule: never compute $\log(\operatorname{softmax}(\mathbf{z}))$ in two steps, because a tiny $p_y$ rounds to zero and its logarithm to $-\infty$. Libraries compute $-z_y + \log\sum_ke^{z_k}$ directly, with the maximum subtracted inside the log-sum-exp, and fuse the backward pass into $\mathbf{p} - \mathbf{e}_y$.

::: example A cross-entropy gradient by hand {#ex-ce-grad}
A model over a three-token vocabulary outputs logits $\mathbf{z} = (2, 1, 0)$, and the correct token is the second. Find the loss and its gradient with respect to the logits.
::: solution
$\mathbf{p} = \operatorname{softmax}(2, 1, 0) = (0.665, 0.245, 0.090)$ (computed in [[transformers/self-attention]]). The loss is $-\log0.245 = 1.408$ nats. By [[#eq-softmax-ce]]

$$
\frac{\partial\mathcal{L}}{\partial\mathbf{z}} = (0.665,\ 0.245 - 1,\ 0.090) = (0.665,\ -0.755,\ 0.090).
$$

A gradient-descent step subtracts a multiple of this vector: the correct logit rises, the first logit — the model's wrong favourite — falls most, and the entries sum to $0$, consistent with the fact that adding the same constant to all logits changes nothing.
:::
:::

::: quiz
For the loss $\mathcal{L} = -\log p_y$ with $\mathbf{p} = \operatorname{softmax}(\mathbf{z})$, which statement is true?
- [ ] $\partial\mathcal{L}/\partial z_y = -1/p_y$
- [x] $\partial\mathcal{L}/\partial z_j = p_j$ for every $j\ne y$
- [ ] The gradient grows without bound as $p_y\to0$
- [ ] The gradient is zero whenever $y$ is the most probable token
::: solution
By [[#prop-softmax-ce]] the gradient is $\mathbf{p} - \mathbf{e}_y$, so for $j\ne y$ it is $p_j$. The derivative with respect to $p_y$ is $-1/p_y$, but the derivative with respect to the logit $z_y$ is $p_y - 1\in(-1, 0)$, bounded. The gradient is zero only if $p_y = 1$; being the most probable token is not enough.
:::
:::

## Backpropagation by hand {#sec-backprop}

Put the pieces together on a network small enough to follow every number.

::: example Backpropagation through a two-layer network {#ex-backprop}
A network maps $\mathbf{x}\in\R^2$ to three logits: $\mathbf{a} = W_1\mathbf{x}$, $\mathbf{h} = \operatorname{ReLU}(\mathbf{a})$, $\mathbf{z} = W_2\mathbf{h}$, loss $\mathcal{L} = -\log\operatorname{softmax}(\mathbf{z})_y$, with

$$
W_1 = \begin{pmatrix}1&-1\\0.5&1\end{pmatrix},\quad W_2 = \begin{pmatrix}0.4&0.2\\-0.2&0.4\\0.3&-0.2\end{pmatrix},\quad\mathbf{x} = (1, 2),\quad y = 1\ (\text{the first class}).
$$

Compute the loss and the gradients with respect to $W_2$ and $W_1$.
::: solution
**Forward.** $\mathbf{a} = (1 - 2,\ 0.5 + 2) = (-1, 2.5)$; $\mathbf{h} = (0, 2.5)$; $\mathbf{z} = W_2\mathbf{h} = (0.5, 1.0, -0.5)$. The softmax is $(1.6487, 2.7183, 0.6065)/4.9735 = (0.3315, 0.5465, 0.1220)$, and $\mathcal{L} = -\log0.3315 = 1.1041$.

**Backward.** By [[#eq-softmax-ce]], $\boldsymbol{\delta}_z = \mathbf{p} - \mathbf{e}_1 = (-0.6685, 0.5465, 0.1220)$. By [[#eq-linear-grad]],

$$
\frac{\partial\mathcal{L}}{\partial W_2} = \boldsymbol{\delta}_z\mathbf{h}^\top = \begin{pmatrix}0&-1.6713\\0&1.3664\\0&0.3049\end{pmatrix},\qquad \boldsymbol{\delta}_h = W_2^\top\boldsymbol{\delta}_z = (-0.3401,\ 0.0605).
$$

The first column of $\partial\mathcal{L}/\partial W_2$ is zero because $h_1 = 0$: weights leaving a silent unit receive no gradient. The ReLU Jacobian is $\diag(0, 1)$ since $a_1 < 0 < a_2$, so $\boldsymbol{\delta}_a = (0, 0.0605)$, and

$$
\frac{\partial\mathcal{L}}{\partial W_1} = \boldsymbol{\delta}_a\mathbf{x}^\top = \begin{pmatrix}0&0\\0.0605&0.1211\end{pmatrix}.
$$

The first row is zero: unit $1$ is inactive, so nothing upstream of it learns from this example — the "dead ReLU" effect in miniature.
:::
:::

The code below performs the same computation in plain Python and checks two gradient entries against **central finite differences**, $\big(\mathcal{L}(w + \varepsilon) - \mathcal{L}(w - \varepsilon)\big)/2\varepsilon$. A gradient check like this is the standard test for a hand-written backward pass.

```python
import math

def forward(W1, W2, x, y):
    # x: (2,), W1: (2, 2), W2: (3, 2), y: target class in {0, 1, 2}
    a = [sum(W1[i][j] * x[j] for j in range(2)) for i in range(2)]   # (2,) pre-activation
    h = [max(0.0, ai) for ai in a]                                   # (2,) ReLU
    z = [sum(W2[k][i] * h[i] for i in range(2)) for k in range(3)]   # (3,) logits
    m = max(z)
    s = sum(math.exp(zk - m) for zk in z)
    p = [math.exp(zk - m) / s for zk in z]                           # (3,) softmax
    loss = -math.log(p[y])                                           # cross-entropy
    return a, h, z, p, loss

def backward(W1, W2, x, y):
    a, h, z, p, loss = forward(W1, W2, x, y)
    dz = [p[k] - (1.0 if k == y else 0.0) for k in range(3)]         # (3,) dL/dz = p - y
    dW2 = [[dz[k] * h[i] for i in range(2)] for k in range(3)]       # (3, 2) outer product
    dh = [sum(W2[k][i] * dz[k] for k in range(3)) for i in range(2)] # (2,) W2^T dz
    da = [dh[i] * (1.0 if a[i] > 0 else 0.0) for i in range(2)]      # (2,) ReLU gate
    dW1 = [[da[i] * x[j] for j in range(2)] for i in range(2)]       # (2, 2) outer product
    return loss, dW1, dW2

W1 = [[1.0, -1.0], [0.5, 1.0]]
W2 = [[0.4, 0.2], [-0.2, 0.4], [0.3, -0.2]]
x, y = [1.0, 2.0], 0
loss, dW1, dW2 = backward(W1, W2, x, y)
print("loss", round(loss, 6))
print("dW1", [[round(g, 6) + 0.0 for g in row] for row in dW1])
print("dW2", [[round(g, 6) + 0.0 for g in row] for row in dW2])

# central-difference check of one entry of each gradient
eps = 1e-5
for W, G, (i, j) in [(W1, dW1, (1, 0)), (W2, dW2, (1, 1))]:
    W[i][j] += eps;  lp = forward(W1, W2, x, y)[4]
    W[i][j] -= 2 * eps; lm = forward(W1, W2, x, y)[4]
    W[i][j] += eps
    print("numeric", round((lp - lm) / (2 * eps), 6), "analytic", round(G[i][j], 6))
```

```text
loss 1.104131
dW1 [[0.0, 0.0], [0.060529, 0.121058]]
dW2 [[0.0, -1.671253], [0.0, 1.366373], [0.0, 0.304879]]
numeric 0.060529 analytic 0.060529
numeric 1.366373 analytic 1.366373
```

(Python indexes classes from $0$, so `y = 0` is the first class of the example.) Libraries such as PyTorch and JAX do exactly this bookkeeping automatically: each operation records how to compute its vector–Jacobian product, and calling `backward()` runs them in reverse order.

::: example How accurate is a finite difference? {#ex-finite-diff}
Approximate the derivative of $e^x$ at $x = 1$ (exactly $e = 2.71828\ldots$) by the forward difference $(f(x + h) - f(x))/h$ and the central difference $(f(x + h) - f(x - h))/2h$ in double precision, for several $h$.
::: solution
The errors are:

| $h$ | forward | central |
|---|---|---|
| $10^{-1}$ | $1.4\times10^{-1}$ | $4.5\times10^{-3}$ |
| $10^{-3}$ | $1.4\times10^{-3}$ | $4.5\times10^{-7}$ |
| $10^{-5}$ | $1.4\times10^{-5}$ | $5.9\times10^{-11}$ |
| $10^{-8}$ | $6.6\times10^{-9}$ | $6.6\times10^{-9}$ |
| $10^{-11}$ | $3.3\times10^{-5}$ | $1.0\times10^{-5}$ |

For moderate $h$ the forward error shrinks like $h$ and the central error like $h^2$, as Taylor's theorem predicts. For very small $h$ both get *worse*: $f(x + h)$ and $f(x)$ agree in almost all their digits, and their difference is dominated by rounding error of order $10^{-16}/h$. Gradient checks therefore use central differences with $h$ around $10^{-5}$ in double precision — and should never be run in 16-bit precision, where rounding errors are about $10^{-3}$.
:::
:::

::: warning Points where the derivative does not exist
ReLU has no derivative at $0$, the maximum in max-pooling has none where two inputs tie, and the absolute value has none at $0$. Libraries simply pick a value (for ReLU, the derivative at $0$ is taken to be $0$), which is harmless because such points are hit with probability close to zero by real-valued inputs. A finite-difference check that straddles such a kink, however, will disagree with the analytic gradient; when a check fails for a few entries only, look first for inputs near a kink.
:::

## A few identities of matrix calculus {#sec-identities}

The following gradients of scalar functions appear again and again; each follows from writing the function in components and differentiating, as in the proof of [[#prop-linear-grad]].

| function $f$ | gradient | where it appears |
|---|---|---|
| $\mathbf{a}^\top\mathbf{x}$ | $\mathbf{a}$ | linear models |
| $\mathbf{x}^\top A\mathbf{x}$ | $(A + A^\top)\mathbf{x}$, or $2A\mathbf{x}$ if $A$ is symmetric | quadratic losses, Hessians |
| $\lVert A\mathbf{x} - \mathbf{b}\rVert^2$ | $2A^\top(A\mathbf{x} - \mathbf{b})$ | least squares |
| $\lVert\mathbf{x}\rVert$ | $\mathbf{x}/\lVert\mathbf{x}\rVert$ for $\mathbf{x}\ne\mathbf{0}$ | normalisation, gradient clipping |
| $\log\sum_ie^{x_i}$ | $\operatorname{softmax}(\mathbf{x})$ | log-partition functions, cross-entropy |
| $\tr(AW)$ (in $W$) | $A^\top$ | matrix-valued parameters |
| $\mathbf{u}^\top W\mathbf{v}$ (in $W$) | $\mathbf{u}\mathbf{v}^\top$ | bilinear forms, attention scores |

Setting the least-squares gradient to zero gives the **normal equations** $A^\top A\mathbf{x} = A^\top\mathbf{b}$, the closed-form solution of linear regression (see [least squares](/learn/maths/lesson.php?c=linear-algebra&l=least-squares) in the Maths Atlas). The log-sum-exp entry shows that the softmax is itself a gradient, which is why its Jacobian $\diag(\mathbf{p}) - \mathbf{p}\mathbf{p}^\top$ is symmetric: it is the Hessian of log-sum-exp.

::: history
Leibniz used the chain rule in his calculus of the 1670s, and Cauchy introduced the method of steepest descent in 1847. Automatic differentiation began with forward mode: Robert Wengert's *A simple automatic derivative evaluation program* (1964). Seppo Linnainmaa described reverse-mode accumulation of derivatives, with an implementation, in his 1970 master's thesis on rounding errors, and Paul Werbos proposed applying it to train neural networks in his 1974 doctoral thesis. Bert Speelpenning built a reverse-mode compiler in 1980, and Baur and Strassen (1983) proved that the gradient of a rational function costs at most a constant times the function itself. Rumelhart, Hinton and Williams (1986) showed in *Nature* that backpropagation lets multi-layer networks learn useful internal representations, and the method spread through neural-network research. Libraries that build the backward pass automatically — Theano (2010), and later TensorFlow, PyTorch and JAX — turned backpropagation from a derivation into a function call.
:::

::: summary
- The gradient lists all partial derivatives; it gives the best linear approximation of a function and points in the direction of steepest ascent.
- The Jacobian of $\mathbf{f}\colon\R^n\to\R^m$ is $m\times n$; linear layers have Jacobian $W$, elementwise activations a diagonal one, and the softmax $\diag(\mathbf{p}) - \mathbf{p}\mathbf{p}^\top$.
- The chain rule multiplies Jacobians. Reverse mode (backpropagation) evaluates the product from the loss backwards with vector–Jacobian products and gets the whole gradient for a few times the cost of the forward pass, at the price of storing activations.
- A linear layer's gradients are $\boldsymbol{\delta}\mathbf{x}^\top$ (an outer product), $\boldsymbol{\delta}$ and $W^\top\boldsymbol{\delta}$; training costs about three forward passes.
- Softmax with cross-entropy has the gradient $\mathbf{p} - \mathbf{e}_y$, prediction minus target. Check hand-written gradients with central finite differences in double precision.
:::

## Exercises

::: exercise A directional derivative {level=1 check="28/5"}
For $f(x, y) = x^2y + 3y$, compute $\nabla f(1, 2)$ and the directional derivative at $(1, 2)$ in the direction of $(3, 4)$.
::: solution
$\nabla f = (2xy,\ x^2 + 3)$, so $\nabla f(1, 2) = (4, 4)$. The unit vector is $(3, 4)/5$, and $D_{\mathbf{u}}f = (12 + 16)/5 = 28/5 = 5.6$. The steepest rate is $\lVert(4, 4)\rVert = 4\sqrt2\approx5.66$, only a little more, since $(3, 4)$ is close to the gradient direction.
:::
:::

::: exercise The sigmoid Jacobian {level=1 check="7/16"}
The sigmoid $\sigma(z) = 1/(1 + e^{-z})$ satisfies $\sigma' = \sigma(1 - \sigma)$. Apply it elementwise to $\mathbf{z} = (0, \ln3)$. What is its Jacobian there, and what is the trace of that Jacobian?
::: solution
$\sigma(0) = 1/2$ and $\sigma(\ln3) = 1/(1 + 1/3) = 3/4$. The Jacobian is diagonal, $\diag\big(\tfrac12\cdot\tfrac12,\ \tfrac34\cdot\tfrac14\big) = \diag(1/4, 3/16)$, with trace $7/16$. Since $\sigma'\le1/4$, every sigmoid layer shrinks gradients by at least a factor of four — the classic cause of vanishing gradients in deep sigmoid networks.
:::
:::

::: exercise A cross-entropy gradient {level=1 check="exp(1)/(exp(2)+exp(1)+1)-1"}
For logits $(2, 1, 0)$ and target class $2$ (the logit $1$), give the gradient of the cross-entropy with respect to the logits. What is its second component?
::: solution
By [[#prop-softmax-ce]] the gradient is $\mathbf{p} - \mathbf{e}_2 = (0.665,\ 0.245 - 1,\ 0.090)$, exactly as in [[#ex-ce-grad]]. The second component is $e/(e^2 + e + 1) - 1\approx-0.755$.
:::
:::

::: exercise Solving a quadratic {level=2 check="1/5"}
Let $f(\mathbf{x}) = \tfrac12\mathbf{x}^\top A\mathbf{x} - \mathbf{b}^\top\mathbf{x}$ with $A = \begin{pmatrix}2&1\\1&3\end{pmatrix}$ and $\mathbf{b} = (1, 2)$. Find $\nabla f$ and the point where it vanishes. What is the first coordinate of that point?
::: solution
By the table in [[#sec-identities]] (with $A$ symmetric), $\nabla f = A\mathbf{x} - \mathbf{b}$. It vanishes where $A\mathbf{x} = \mathbf{b}$: with $\det A = 5$, $A^{-1} = \frac15\begin{pmatrix}3&-1\\-1&2\end{pmatrix}$ and $\mathbf{x} = \frac15(3 - 2,\ -1 + 4) = (0.2, 0.6)$. Since $A$ is positive definite (eigenvalues $(5\pm\sqrt5)/2 > 0$), this is the unique minimum. The first coordinate is $1/5$.
:::
:::

::: exercise The cost of training {level=2 check="6"}
Using [[#prop-linear-grad]], count the FLOPs of the forward and backward passes of a batched linear layer $Y = XW^\top$ with $X\in\R^{N\times n}$, $W\in\R^{m\times n}$. How many FLOPs per weight per example does a training step take? Which of the backward products could be skipped for the first layer of a network?
::: solution
Forward: $XW^\top$ is $(N\times n)(n\times m)$, $2Nmn$ FLOPs. Backward: $\partial\mathcal{L}/\partial W = \Delta^\top X$ is $(m\times N)(N\times n)$, $2Nmn$; $\partial\mathcal{L}/\partial X = \Delta W$ is $(N\times m)(m\times n)$, $2Nmn$. The total is $6Nmn$, i.e. $6$ FLOPs per weight per example (token), against $2$ for inference. For the first layer the gradient with respect to the input is not needed (the input is data, not a parameter), so $\Delta W$ can be skipped — a saving that matters little in a deep network.
:::
:::

::: exercise Log-sum-exp {level=2}
Let $g(\mathbf{x}) = \log\sum_{i=1}^ne^{x_i}$. Show that $\nabla g = \operatorname{softmax}(\mathbf{x})$, that the Hessian of $g$ is $\diag(\mathbf{p}) - \mathbf{p}\mathbf{p}^\top$ with $\mathbf{p} = \operatorname{softmax}(\mathbf{x})$, and that $\max_ix_i\le g(\mathbf{x})\le\max_ix_i + \log n$.
::: solution
$\partial g/\partial x_j = e^{x_j}/\sum_ie^{x_i} = p_j$. Differentiating again, by part (1) of [[#prop-softmax-ce]], gives $\partial p_j/\partial x_k = p_j(\delta_{jk} - p_k)$. For the bounds, let $M = \max_ix_i$: $e^M\le\sum_ie^{x_i}\le ne^M$; take logarithms. So log-sum-exp is a smooth version of the maximum ("softmax" is really a soft *arg*max), off by at most $\log n$. The Hessian is PSD (it is a covariance: $\mathbf{u}^\top H\mathbf{u}$ is the variance of $u$ under $\mathbf{p}$), so $g$ is convex — which makes the cross-entropy loss convex in the logits.
:::
:::

::: exercise Binary cross-entropy {level=2}
A binary classifier outputs $p = \sigma(z)$ and is trained with $\mathcal{L} = -y\log p - (1 - y)\log(1 - p)$ for a label $y\in\{0, 1\}$. Show that $\partial\mathcal{L}/\partial z = p - y$, and explain the connection with [[#prop-softmax-ce]].
::: solution
$\log p = -\log(1 + e^{-z})$, so $\partial\log p/\partial z = e^{-z}/(1 + e^{-z}) = 1 - p$; and $\log(1 - p) = \log p - z$, so $\partial\log(1 - p)/\partial z = (1 - p) - 1 = -p$. Hence $\partial\mathcal{L}/\partial z = -y(1 - p) + (1 - y)p = p - y$. A sigmoid is a two-class softmax with logits $(z, 0)$: $e^z/(e^z + 1) = \sigma(z)$, and the general result $\mathbf{p} - \mathbf{e}_y$ reduces to $p - y$ in the first coordinate.
:::
:::

::: exercise The best step for a finite difference {level=3}
For a smooth $f$, Taylor's theorem gives an error of about $\tfrac16\lvert f'''\rvert h^2$ for the central difference; rounding each function value to relative precision $u$ adds an error of about $u\lvert f\rvert/h$. Minimise the sum over $h$, and evaluate the optimal $h$ for $f = \exp$ at $x = 1$ in double precision ($u = 2^{-52}\approx2.2\times10^{-16}$). Compare with the table in [[#ex-finite-diff]].
::: solution
With $f = f''' = e$ at $x = 1$, the total error is $E(h) = \tfrac e6h^2 + \tfrac{ue}{h}$. Then $E'(h) = \tfrac e3h - \tfrac{ue}{h^2} = 0$ gives $h^3 = 3u$, so $h = (3u)^{1/3}\approx(6.7\times10^{-16})^{1/3}\approx8.7\times10^{-6}$, with error $E\approx\tfrac e6(8.7\times10^{-6})^2 + 2.2\times10^{-16}e/(8.7\times10^{-6})\approx3.4\times10^{-11} + 6.9\times10^{-11}\approx1\times10^{-10}$. The table's $h = 10^{-5}$ gave $5.9\times10^{-11}$, consistent with this estimate; both $10^{-3}$ (truncation-dominated) and $10^{-8}$ (rounding-dominated) are worse.
:::
:::

::: exercise Gradients with a bias, in code {level=3}
Extend the code of [[#sec-backprop]] with bias vectors $\mathbf{b}_1\in\R^2$, $\mathbf{b}_2\in\R^3$ ($\mathbf{a} = W_1\mathbf{x} + \mathbf{b}_1$, $\mathbf{z} = W_2\mathbf{h} + \mathbf{b}_2$), take $\mathbf{b}_1 = (1.5, 0)$ and $\mathbf{b}_2 = \mathbf{0}$, and report the gradients with respect to $\mathbf{b}_1$ and $\mathbf{b}_2$. Why is the first unit now able to learn?
::: solution
By [[#eq-linear-grad]] the bias gradients are the upstream gradients themselves: $\partial\mathcal{L}/\partial\mathbf{b}_2 = \boldsymbol{\delta}_z$ and $\partial\mathcal{L}/\partial\mathbf{b}_1 = \boldsymbol{\delta}_a$.

```python
import math

def grads(W1, b1, W2, b2, x, y):
    a = [sum(W1[i][j] * x[j] for j in range(2)) + b1[i] for i in range(2)]  # (2,)
    h = [max(0.0, ai) for ai in a]                                          # (2,)
    z = [sum(W2[k][i] * h[i] for i in range(2)) + b2[k] for k in range(3)]  # (3,)
    m = max(z); s = sum(math.exp(v - m) for v in z)
    p = [math.exp(v - m) / s for v in z]                                    # (3,)
    dz = [p[k] - (k == y) for k in range(3)]                                # dL/db2
    dh = [sum(W2[k][i] * dz[k] for k in range(3)) for i in range(2)]
    da = [dh[i] * (a[i] > 0) for i in range(2)]                             # dL/db1
    return -math.log(p[y]), da, dz

W1 = [[1.0, -1.0], [0.5, 1.0]]; W2 = [[0.4, 0.2], [-0.2, 0.4], [0.3, -0.2]]
loss, db1, db2 = grads(W1, [1.5, 0.0], W2, [0.0, 0.0, 0.0], [1.0, 2.0], 0)
print(round(loss, 4), [round(g, 4) for g in db1], [round(g, 4) for g in db2])
```

```text
0.9444 [-0.2986, 0.0406] [-0.6111, 0.475, 0.1361]
```

With $b_{1,1} = 1.5$ the first pre-activation is $a_1 = -1 + 1.5 = 0.5 > 0$, so the first unit is active, its ReLU gate is open, and both $W_1$'s first row and $b_{1,1}$ receive gradient. The loss is also lower ($0.944$ instead of $1.104$), because the active first unit raises the correct logit.
:::
:::
