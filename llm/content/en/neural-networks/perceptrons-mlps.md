A linear model can only draw straight boundaries through the features it is given. [[ml-fundamentals/representations]] showed the consequence — no linear classifier computes XOR — and two ways out: engineer better features by hand, or let a kernel supply them implicitly. A **neural network** takes a third way. It stacks several layers of simple units, each a linear map followed by a fixed nonlinearity, and fits all the layers at once, so that the early layers learn the features the last layer needs. This chapter builds that idea from its oldest form, the perceptron of 1958, to the multilayer perceptron (MLP) found inside every Transformer block, and asks what such networks can represent in principle.

We assume the logistic and softmax models of [[ml-fundamentals/logistic-regression]], including the cross-entropy loss and its gradient. How the weights of a multilayer network are actually fitted — backpropagation — is the subject of the next chapter, [[neural-networks/backpropagation]]; here we fix the architecture and study what it can compute.

## The artificial neuron {#sec-neuron}

The building block is a function of a vector that takes a weighted sum and passes it through a scalar function.

::: definition Artificial neuron {#def-neuron}
An **artificial neuron** (or **unit**) with weights $\mathbf{w}\in\R^d$, bias $b\in\R$ and **activation function** $\phi\colon\R\to\R$ maps an input $\mathbf{x}\in\R^d$ to

$$
h = \phi(z),\qquad z = \mathbf{w}^\top\mathbf{x} + b.
$$

The number $z$ is the unit's **pre-activation** and $h$ its **activation** (or output).
:::

With $\phi = \sigma$, the logistic function, a single neuron *is* logistic regression ([[ml-fundamentals/logistic-regression#def-logistic]]). With $\phi$ the step function $[z\ge 0]$ it is the threshold unit that McCulloch and Pitts used in 1943 to model a biological neuron: it "fires" when the weighted evidence exceeds a threshold $-b$. They observed that such units compute logical functions — with inputs in $\{0, 1\}$, weights $(1, 1)$ and bias $-1.5$ give AND, bias $-0.5$ gives OR, and weight $-1$ with bias $0.5$ gives NOT — so networks of them can compute any Boolean function. What they lacked was a way to *learn* the weights.

The biological analogy should be held loosely. A real neuron has thousands of synapses, spikes in time, and complex dendritic computations; the artificial unit keeps only the idea of summing weighted inputs and responding nonlinearly. Modern networks are best thought of as parametrised functions built for being differentiated and optimised, not as models of the brain.

## The perceptron {#sec-perceptron}

Rosenblatt's **perceptron** (1958) was the first neuron with a learning rule. Take labels $y\in\{-1, +1\}$, absorb the bias into $\mathbf{w}$ by appending a constant feature $1$ to every input, and predict $\hat y = \sgn(\mathbf{w}^\top\mathbf{x})$.

::: algorithm The perceptron learning rule {#alg-perceptron}
Input: examples $(\mathbf{x}_1, y_1), \dots, (\mathbf{x}_n, y_n)$ with $y_i\in\{-1, +1\}$.

1. Set $\mathbf{w}\leftarrow\mathbf{0}$.
2. Repeat passes over the data. For each example $i$: if $y_i\mathbf{w}^\top\mathbf{x}_i\le0$ (a **mistake**, counting a point on the boundary as wrong), update $\mathbf{w}\leftarrow\mathbf{w} + y_i\mathbf{x}_i$.
3. Stop after a pass with no mistakes.
:::

The update is easy to read: a misclassified positive example is added to $\mathbf{w}$, which raises its score by $\lVert\mathbf{x}_i\rVert^2$; a misclassified negative example is subtracted. It is the stochastic gradient step of the loss $\max(0, -y\mathbf{w}^\top\mathbf{x})$ with learning rate $1$, and the "rounded" version of the logistic-regression step (exercise 8 of [[ml-fundamentals/logistic-regression]]). Remarkably, if the data can be separated by a hyperplane at all, the rule always finds one, and the number of mistakes it makes on the way is bounded by a quantity that depends on the geometry of the data and not on its number of points or dimension.

::: theorem Perceptron convergence (Novikoff, 1962) {#thm-novikoff}
Suppose $\lVert\mathbf{x}_i\rVert\le R$ for all $i$, and that some unit vector $\mathbf{u}$ ($\lVert\mathbf{u}\rVert = 1$) separates the data with **margin** $\gamma > 0$:

$$
y_i\,\mathbf{u}^\top\mathbf{x}_i\ge\gamma\qquad\text{for all } i.
$$

Then the perceptron, run on the examples in any order (with repetitions), makes at most $(R/\gamma)^2$ mistakes. In particular it stops after finitely many passes with a separating $\mathbf{w}$.
:::

::: proof
Let $\mathbf{w}_k$ be the weight vector after the $k$-th mistake, so $\mathbf{w}_0 = \mathbf{0}$ and $\mathbf{w}_k = \mathbf{w}_{k-1} + y\mathbf{x}$ for the example $(\mathbf{x}, y)$ that caused it. We bound $\mathbf{u}^\top\mathbf{w}_k$ from below and $\lVert\mathbf{w}_k\rVert$ from above.

*Progress along $\mathbf{u}$.* $\mathbf{u}^\top\mathbf{w}_k = \mathbf{u}^\top\mathbf{w}_{k-1} + y\,\mathbf{u}^\top\mathbf{x}\ge\mathbf{u}^\top\mathbf{w}_{k-1} + \gamma$, so by induction $\mathbf{u}^\top\mathbf{w}_k\ge k\gamma$.

*Slow growth of the norm.* $\lVert\mathbf{w}_k\rVert^2 = \lVert\mathbf{w}_{k-1}\rVert^2 + 2y\,\mathbf{w}_{k-1}^\top\mathbf{x} + \lVert\mathbf{x}\rVert^2\le\lVert\mathbf{w}_{k-1}\rVert^2 + R^2$, because the update happened only on a mistake, where $y\,\mathbf{w}_{k-1}^\top\mathbf{x}\le0$. By induction $\lVert\mathbf{w}_k\rVert^2\le kR^2$.

*Combine.* By the Cauchy–Schwarz inequality and $\lVert\mathbf{u}\rVert = 1$, $k\gamma\le\mathbf{u}^\top\mathbf{w}_k\le\lVert\mathbf{w}_k\rVert\le\sqrt k\,R$. Dividing by $\sqrt k\,\gamma$ gives $\sqrt k\le R/\gamma$, that is, $k\le(R/\gamma)^2$. Since every pass that does not end the algorithm contains at least one mistake, there are at most $(R/\gamma)^2 + 1$ passes, and the final pass certifies that $\mathbf{w}$ classifies every example correctly.
:::

The proof shows the mechanism: each mistake pushes $\mathbf{w}$ a fixed distance $\gamma$ along the ideal direction $\mathbf{u}$, but lengthens it only by a step of size at most $R$ *at right angles or worse*, so the length grows like $\sqrt k$ while the projection grows like $k$. The angle between $\mathbf{w}_k$ and $\mathbf{u}$ must therefore shrink, and it cannot keep shrinking forever. The bound is scale-free: multiplying every input by $10$ multiplies $R$ and $\gamma$ by $10$ and leaves $(R/\gamma)^2$ unchanged.

::: example A perceptron run by hand {#ex-perceptron}
Run the perceptron, without a bias, on the four examples $\big((1, 2), +1\big)$, $\big((2, -1), -1\big)$, $\big((-1, 1), +1\big)$, $\big((1, 0), -1\big)$, visited in this order.
::: solution
Start with $\mathbf{w} = (0, 0)$. Example 1: $y\mathbf{w}^\top\mathbf{x} = 0\le0$, a mistake, so $\mathbf{w}\leftarrow(1, 2)$. Example 2: $y\mathbf{w}^\top\mathbf{x} = -(2 - 2) = 0$, a mistake, so $\mathbf{w}\leftarrow(1, 2) - (2, -1) = (-1, 3)$. Example 3: $+1\cdot(1 + 3) = 4 > 0$, correct. Example 4: $-1\cdot(-1) = 1 > 0$, correct. The second pass checks example 1 ($-1 + 6 = 5 > 0$) and example 2 ($-(-2 - 3) = 5 > 0$) and makes no mistakes, so the algorithm stops with $\mathbf{w} = (-1, 3)$ after $2$ mistakes. Compare [[#thm-novikoff]]: $R = \sqrt5$ (examples 1 and 2), and the unit vector $\mathbf{u} = (-1, 1)/\sqrt2$ has margins $1/\sqrt2$, $3/\sqrt2$, $2/\sqrt2$ and $1/\sqrt2$ on the four examples, so $\gamma = 1/\sqrt2$ and the bound is $(R/\gamma)^2 = 5\cdot2 = 10$ mistakes. (No direction does better here; the bound uses the best margin, but any separating $\mathbf{u}$ gives a valid, possibly weaker, bound.) The perceptron's own answer $(-1, 3)/\sqrt{10}$ has margin only $1/\sqrt{10}$ on example 4: it separates the data, but not by much.
:::
:::

The listing runs the perceptron on $500$ random points in the unit disc ($R\le1$), labelled by the side of the line with normal $\mathbf{u} = (0.6, 0.8)$ on which they lie, after discarding points closer than $\gamma$ to that line.

```python
import math, random

rng = random.Random(0)

def make_separable(n, gamma):
    """Points in the unit disc labelled by the sign of u.x, keeping only margin >= gamma."""
    u = (0.6, 0.8)                                      # unit normal of the true boundary
    data = []
    while len(data) < n:
        x = (rng.uniform(-1, 1), rng.uniform(-1, 1))
        if x[0] ** 2 + x[1] ** 2 > 1:                   # stay inside the unit disc: R <= 1
            continue
        m = u[0] * x[0] + u[1] * x[1]
        if abs(m) >= gamma:                             # enforce the margin
            data.append((x, 1 if m > 0 else -1))
    return data

def perceptron(data, max_epochs=1000):
    w = [0.0, 0.0]
    mistakes = 0
    for epoch in range(max_epochs):
        clean = True
        for x, y in data:
            if y * (w[0] * x[0] + w[1] * x[1]) <= 0:    # mistake (or on the boundary)
                w = [w[0] + y * x[0], w[1] + y * x[1]]
                mistakes += 1
                clean = False
        if clean:
            return w, mistakes, epoch + 1
    return w, mistakes, max_epochs

for gamma in [0.2, 0.1, 0.05, 0.02]:
    data = make_separable(500, gamma)
    R = max(math.hypot(*x) for x, _ in data)
    w, k, epochs = perceptron(data)
    print(f"gamma {gamma:4.2f}  mistakes {k:4d}  bound (R/gamma)^2 = {(R / gamma) ** 2:7.1f}  "
          f"epochs {epochs:3d}  w/|w| = ({w[0] / math.hypot(*w):.3f}, {w[1] / math.hypot(*w):.3f})")
```

```text
gamma 0.20  mistakes    3  bound (R/gamma)^2 =    24.9  epochs   2  w/|w| = (0.641, 0.767)
gamma 0.10  mistakes    6  bound (R/gamma)^2 =    99.8  epochs   2  w/|w| = (0.601, 0.799)
gamma 0.05  mistakes    9  bound (R/gamma)^2 =   399.7  epochs   2  w/|w| = (0.586, 0.810)
gamma 0.02  mistakes    2  bound (R/gamma)^2 =  2482.9  epochs   2  w/|w| = (0.618, 0.786)
```

The mistake counts stay far below the bound, which is a worst case over all orderings and datasets with the given $R$ and $\gamma$, and the learned direction is close to $\mathbf{u}$. Note what the theorem does *not* promise: the final hyperplane is merely *a* separator, not the one with the largest margin, and if the data are not separable the rule never settles — it cycles for ever. Both shortcomings were later fixed by the support vector machine and by smooth losses such as the logistic loss.

### What one layer cannot do {#sec-xor}

A perceptron, like any linear classifier, separates the input space by a hyperplane, so it cannot represent XOR ([[ml-fundamentals/representations#prop-xor]]). Minsky and Papert's *Perceptrons* (1969) made this kind of limitation precise for a whole class of problems: for instance, a single-layer perceptron whose units each look at a bounded number of input pixels cannot decide whether a figure is connected, and parity of $n$ bits requires a unit that looks at all $n$ bits at once. Their results concern single layers of trainable weights; they knew that multilayer networks were more powerful, but no one then knew how to train them.

## Multilayer perceptrons {#sec-mlp}

The fix is to compose layers. Each layer applies an affine map and an elementwise activation; the output of one is the input of the next.

::: definition Multilayer perceptron {#def-mlp}
A **multilayer perceptron** (MLP, or fully connected feed-forward network) with $L$ layers, widths $d_0, d_1, \dots, d_L$ and activation $\phi$ computes $f(\mathbf{x}) = \mathbf{h}_L$ from $\mathbf{h}_0 = \mathbf{x}\in\R^{d_0}$ by

$$
\mathbf{a}_\ell = W_\ell\mathbf{h}_{\ell-1} + \mathbf{b}_\ell,\qquad\mathbf{h}_\ell = \phi(\mathbf{a}_\ell)\quad(\ell = 1, \dots, L - 1),\qquad\mathbf{h}_L = W_L\mathbf{h}_{L-1} + \mathbf{b}_L,
$$ {#eq-mlp}

with $W_\ell\in\R^{d_\ell\times d_{\ell-1}}$, $\mathbf{b}_\ell\in\R^{d_\ell}$ and $\phi$ applied to each coordinate. Layers $1, \dots, L-1$ are **hidden layers**; the last layer is linear and its outputs are the **logits** (for classification, fed to a softmax and the cross-entropy loss) or the predictions (for regression). The parameters are $\theta = (W_1, \mathbf{b}_1, \dots, W_L, \mathbf{b}_L)$, and their number is $\sum_{\ell=1}^L d_\ell(d_{\ell-1} + 1)$.
:::

Counting conventions vary: a network with one hidden layer is called "two-layer" (two weight matrices) by some authors and "one-hidden-layer" or "shallow" by others. Here $L$ counts weight matrices.

The last layer of an MLP classifier is exactly softmax regression ([[ml-fundamentals/logistic-regression#def-softmax-regression]]), but applied to the learned features $\mathbf{h}_{L-1}$ rather than to the raw input. The hidden layers are a learned feature map $\mathbf{x}\mapsto\mathbf{h}_{L-1}$ in the sense of [[ml-fundamentals/representations#def-feature-map]], trained jointly with the classifier that uses it.

In practice inputs arrive in **mini-batches**. Stacking $B$ inputs as the rows of $X\in\R^{B\times d_0}$, a layer computes $H_\ell = \phi(H_{\ell-1}W_\ell^\top + \mathbf{1}\mathbf{b}_\ell^\top)$, of shape $(B, d_\ell)$ — one matrix multiplication per layer, which is what GPUs do fastest. Libraries store the weight as $W_\ell^\top$ of shape $(d_{\ell-1}, d_\ell)$ or as $W_\ell$ of shape $(d_\ell, d_{\ell-1})$ (PyTorch's `nn.Linear` uses the latter and computes $XW^\top + \mathbf{b}$); the mathematics is the same.

::: example XOR with two hidden units {#ex-xor}
Show that the network $\mathbf{h} = \operatorname{ReLU}(W_1\mathbf{x} + \mathbf{b}_1)$, $f(\mathbf{x}) = \mathbf{w}_2^\top\mathbf{h}$ with

$$
W_1 = \begin{pmatrix}1&1\\1&1\end{pmatrix},\qquad\mathbf{b}_1 = \begin{pmatrix}0\\-1\end{pmatrix},\qquad\mathbf{w}_2 = \begin{pmatrix}1\\-2\end{pmatrix}
$$

computes XOR on $\{0, 1\}^2$, where $\operatorname{ReLU}(a) = \max(0, a)$.
::: solution
Both hidden units see $s = x_1 + x_2$; the first outputs $\operatorname{ReLU}(s)$ and the second $\operatorname{ReLU}(s - 1)$, so $f = \operatorname{ReLU}(s) - 2\operatorname{ReLU}(s - 1)$.

| $\mathbf{x}$ | $s$ | $\mathbf{h}$ | $f(\mathbf{x})$ |
|---|---|---|---|
| $(0, 0)$ | $0$ | $(0, 0)$ | $0$ |
| $(1, 0)$ | $1$ | $(1, 0)$ | $1$ |
| $(0, 1)$ | $1$ | $(1, 0)$ | $1$ |
| $(1, 1)$ | $2$ | $(2, 1)$ | $0$ |

The hidden layer maps the four inputs to three points $(0, 0)$, $(1, 0)$, $(2, 1)$ in feature space, the two XOR-positive inputs landing on the same point; there a linear function separates them. This is the example of Goodfellow, Bengio and Courville (2016, §6.1). Gradient descent from a random start usually finds a different but equivalent solution.
:::
:::

::: example Counting parameters {#ex-params}
An MLP classifies $28\times28$ grey-scale digit images into $10$ classes with two hidden layers of width $512$. How many parameters does it have, and what are the shapes of the activations for a batch of $64$ images?
::: solution
The input is the flattened image, $d_0 = 784$. The three layers have $784\cdot512 + 512 = 401{,}920$, $512\cdot512 + 512 = 262{,}656$ and $512\cdot10 + 10 = 5{,}130$ parameters, a total of $669{,}706$. Activations: $X$ is $(64, 784)$, $H_1$ and $H_2$ are $(64, 512)$, and the logits are $(64, 10)$. Most parameters sit in the first layer, because the input is wide; in a Transformer's feed-forward block the same count gives $2\cdot d_{\text{model}}\cdot d_{\text{ff}}$ weights per block, with $d_{\text{ff}} = 4d_{\text{model}}$ in the original design ([[transformers/transformer-block#def-ffn]]).
:::
:::

### Why the nonlinearity is essential {#sec-why-nonlinear}

::: proposition Without activations, depth adds nothing {#prop-collapse}
If $\phi$ is the identity, the MLP [[#eq-mlp]] computes an affine map $f(\mathbf{x}) = W\mathbf{x} + \mathbf{b}$ with $W = W_LW_{L-1}\cdots W_1$, and $\rank W\le\min_\ell d_\ell$.
:::

::: proof
By induction, $\mathbf{h}_\ell = W_\ell\cdots W_1\mathbf{x} + \mathbf{c}_\ell$ for a constant vector $\mathbf{c}_\ell$: true for $\ell = 1$, and $W_{\ell+1}(W_\ell\cdots W_1\mathbf{x} + \mathbf{c}_\ell) + \mathbf{b}_{\ell+1}$ has the same form. The rank of a product is at most the rank of each factor, and $\rank W_\ell\le\min(d_\ell, d_{\ell-1})$.
:::

A deep *linear* network is therefore no more expressive than a single linear layer — less, if some hidden layer is narrow, since then $W$ has low rank. (Its *training dynamics* are not trivial, which makes deep linear networks a useful theoretical model; Saxe, McClelland and Ganguli, 2014.) All the extra power of depth comes from the nonlinearity between the layers.

## Activation functions {#sec-activations}

Which nonlinearity? The choice has changed over the decades as the demands of training deeper networks became clearer.

::: definition Common activation functions {#def-activations}
- **Logistic sigmoid** $\sigma(z) = 1/(1 + e^{-z})$, with $\sigma' = \sigma(1 - \sigma)\le\frac14$.
- **Hyperbolic tangent** $\tanh z = (e^z - e^{-z})/(e^z + e^{-z}) = 2\sigma(2z) - 1$, with $\tanh' = 1 - \tanh^2\le1$.
- **Rectified linear unit** $\operatorname{ReLU}(z) = \max(0, z)$, with derivative $[z > 0]$ (undefined at $0$; libraries use $0$).
- **Leaky ReLU** $\max(\alpha z, z)$ for a small $\alpha$ such as $0.01$.
- **GELU** (Gaussian error linear unit) $\operatorname{GELU}(z) = z\,\Phi(z) = \tfrac z2\big(1 + \operatorname{erf}(z/\sqrt2)\big)$, with $\Phi$ the standard normal CDF.
- **SiLU** (or **Swish**) $\operatorname{SiLU}(z) = z\,\sigma(z)$.
:::

::: widget plot
f: 1/(1 + exp(-x)); tanh(x); max(0, x); 0.5*x*(1 + erf(x/sqrt(2))); x/(1 + exp(-x))
x: -4, 4
y: -1.5, 3
labels: $\sigma(z)$; $\tanh z$; $\operatorname{ReLU}(z)$; $\operatorname{GELU}(z)$; $\operatorname{SiLU}(z)$
tangent: 0.5
caption: Five activation functions. The sigmoid and tanh saturate: far from $0$ they are flat, and their derivative is nearly zero. ReLU, GELU and SiLU grow linearly for positive inputs, so their derivative stays near $1$ there; GELU and SiLU are smooth versions of ReLU that dip slightly below zero for negative inputs. Drag the tangent along the sigmoid to see how small its slope is away from the origin — never more than $\frac14$.
:::

The history of this list is a history of gradients. A hidden unit's weights learn in proportion to $\phi'(a)$ (the chain rule puts that factor into every gradient that passes through the unit, as [[neural-networks/backpropagation]] will show), so an activation whose derivative is small over most of its range slows learning, and a product of many small derivatives across many layers makes the gradient vanish ([[neural-networks/initialisation-normalisation]]). The sigmoid, the default of the 1980s and 1990s, has $\sigma'\le\frac14$ everywhere and is also not centred at zero, which biases the signs of the next layer's gradients. The tanh is zero-centred and has slope $1$ at the origin, and was preferred for that reason (LeCun et al., 1998). **ReLU**, popularised for deep networks by Nair and Hinton (2010) and Glorot, Bordes and Bengio (2011), and used in AlexNet (2012), has derivative exactly $1$ on its active side, is cheap to compute, and produces sparse activations; it made networks of ten or more layers practical to train with plain gradient descent.

GELU (Hendrycks and Gimpel, 2016) and SiLU (Elfwing, Uchibe and Doya, 2018; Ramachandran, Zoph and Le, 2017, as "Swish") are smooth and non-monotonic: slightly negative for moderately negative inputs. GELU is the activation of BERT and GPT-2; the gated variant SwiGLU, which multiplies a SiLU unit by a second linear unit, is used in many recent open language models ([[transformers/transformer-block#def-swiglu]]). The differences between ReLU, GELU and SiLU in quality are real but modest and were established empirically; there is no theorem that one is best.

::: example Activations and their slopes {#ex-slopes}
Evaluate each activation and its derivative at $z = 1$ and $z = -1$. Which units pass a gradient when $z = -1$?
::: solution
$\sigma(1) = 0.731$, $\sigma(-1) = 0.269$, with $\sigma'(\pm1) = 0.731\cdot0.269 = 0.197$. $\tanh(\pm1) = \pm0.762$, with $\tanh'(\pm1) = 1 - 0.580 = 0.420$. $\operatorname{ReLU}(1) = 1$ with slope $1$; $\operatorname{ReLU}(-1) = 0$ with slope $0$. $\operatorname{GELU}(1) = \Phi(1) = 0.841$ and $\operatorname{GELU}(-1) = -\Phi(-1) = -0.159$; its derivative $\Phi(z) + z\varphi(z)$ (with $\varphi$ the normal density) is $0.841 + 0.242 = 1.083$ at $1$ and $0.159 - 0.242 = -0.083$ at $-1$. $\operatorname{SiLU}(1) = 0.731$, $\operatorname{SiLU}(-1) = -0.269$. At $z = -1$ every unit except ReLU passes some gradient; a ReLU unit whose pre-activation is negative for every input passes none at all, and can never recover (see the warning below).
:::
:::

::: warning Saturated and dead units
Two failure modes come straight from the shape of $\phi$. A sigmoid or tanh unit whose pre-activations are large in magnitude is **saturated**: its output barely changes and its derivative is near zero, so its incoming weights stop learning — a common result of inputs that are not standardised or weights initialised too large. A ReLU unit whose pre-activation is negative on every training input is **dead**: its output and gradient are zero everywhere, so no update ever revives it. Dead units are typically produced by a learning rate high enough to throw a unit's bias far negative. Monitoring the fraction of units that are active (or saturated) on a batch is a cheap diagnostic, and leaky ReLU, GELU and SiLU avoid exact death by keeping a small slope for negative inputs.
:::

::: quiz
A network has three hidden layers of width $100$ but uses the identity as its activation. Which statement is correct?
- [ ] It can represent XOR, because it has hidden layers
- [x] It computes an affine function of its input, so it cannot represent XOR
- [ ] It is equivalent to a single hidden layer of width $300$ with ReLU activations
- [ ] Its expressive power grows with the number of layers
::: solution
By [[#prop-collapse]] a composition of affine maps is affine, whatever the depth or width; an affine function followed by a threshold is a linear classifier, which cannot represent XOR. Nonlinear activations are what make hidden layers useful.
:::
:::

## What MLPs can represent: universal approximation {#sec-universal}

How much can a network with a single hidden layer represent, if it may be as wide as it likes? The answer is: essentially any continuous function, to any accuracy, on a bounded region. We first prove this constructively in one dimension for ReLU, where the construction is transparent, then lift it to many dimensions, and then state the classical theorems.

::: proposition ReLU networks in one dimension {#prop-relu-1d}
Let $a = t_0 < t_1 < \dots < t_m = b$ and let $\ell$ be the continuous piecewise-linear function on $[a, b]$ with breakpoints $t_k$ and slopes $s_k$ on $[t_k, t_{k+1}]$. Then for all $x\in[a, b]$

$$
\ell(x) = \ell(a) + \sum_{k=0}^{m-1}v_k\operatorname{ReLU}(x - t_k),\qquad v_0 = s_0,\quad v_k = s_k - s_{k-1}\ (k\ge1),
$$ {#eq-relu-sum}

a network with one hidden layer of $m$ ReLU units. Consequently every continuous $f$ on $[a, b]$ is a uniform limit of such networks: for every $\varepsilon > 0$ some one-hidden-layer ReLU network $g$ has $\lvert f(x) - g(x)\rvert < \varepsilon$ for all $x\in[a, b]$.
:::

::: proof
The right side of [[#eq-relu-sum]] is continuous and piecewise linear with breakpoints only at the $t_k$. At $x = a = t_0$ every ReLU term is zero, so it equals $\ell(a)$. On $(t_k, t_{k+1})$ the active terms are those with $j\le k$, so its slope is $\sum_{j\le k}v_j = s_0 + \sum_{j=1}^k(s_j - s_{j-1}) = s_k$. Two continuous functions that agree at $a$ and have the same derivative on each subinterval are equal on $[a, b]$.

For the approximation, $f$ is uniformly continuous on the compact interval $[a, b]$, so there is $\delta > 0$ with $\lvert f(x) - f(x')\rvert < \varepsilon$ whenever $\lvert x - x'\rvert\le\delta$. Choose breakpoints with spacing at most $\delta$ and let $\ell$ interpolate $f$ at them. For $x\in[t_k, t_{k+1}]$, $\ell(x)$ is a convex combination of $f(t_k)$ and $f(t_{k+1})$, both within $\varepsilon$ of $f(x)$, so $\lvert\ell(x) - f(x)\rvert < \varepsilon$. By the first part $\ell$ is a ReLU network.
:::

The construction tells us more than existence. For a twice-differentiable $f$, linear interpolation with spacing $h$ has error at most $h^2\max\lvert f''\rvert/8$, so $m$ units achieve error of order $1/m^2$ in one dimension. Approximating $\sin$ on $[0, 2\pi]$:

```python
import math

def relu(a):
    return max(0.0, a)

def relu_interpolant(f, a, b, m):
    """One-hidden-layer ReLU network g(x) = c + sum_k v_k relu(x - t_k) that
    interpolates f linearly between m + 1 equally spaced knots on [a, b]."""
    t = [a + (b - a) * k / m for k in range(m + 1)]                 # knots
    s = [(f(t[k + 1]) - f(t[k])) / (t[k + 1] - t[k]) for k in range(m)]  # slopes
    v = [s[0]] + [s[k] - s[k - 1] for k in range(1, m)]             # (m,) output weights
    c = f(t[0])
    return lambda x: c + sum(vk * relu(x - tk) for vk, tk in zip(v, t[:m]))

f = math.sin
for m in [4, 8, 16, 32, 64]:
    g = relu_interpolant(f, 0.0, 2 * math.pi, m)
    err = max(abs(f(x) - g(x)) for x in [2 * math.pi * i / 10000 for i in range(10001)])
    h = 2 * math.pi / m
    print(f"hidden units {m:3d}  max error {err:.5f}  bound h^2/8 = {h * h / 8:.5f}")
```

```text
hidden units   4  max error 0.21051  bound h^2/8 = 0.30843
hidden units   8  max error 0.07038  bound h^2/8 = 0.07711
hidden units  16  max error 0.01885  bound h^2/8 = 0.01928
hidden units  32  max error 0.00479  bound h^2/8 = 0.00482
hidden units  64  max error 0.00120  bound h^2/8 = 0.00120
```

Each doubling of the width divides the error by four, as the bound predicts. In $n$ dimensions a grid of spacing $h$ needs about $h^{-n}$ cells, and generic approximation by any method of fixed smoothness needs exponentially many parameters in $n$ — the curse of dimensionality of [[ml-fundamentals/representations#sec-curse]]. Universal approximation is a statement about possibility, not efficiency.

::: theorem Universal approximation with ReLU units {#thm-uat-relu}
Let $K\subset\R^n$ be compact and $f\colon K\to\R$ continuous. For every $\varepsilon > 0$ there are $N$, $\mathbf{w}_j\in\R^n$, $b_j, c_j\in\R$ and $c_0\in\R$ such that

$$
\Big\lvert f(\mathbf{x}) - c_0 - \sum_{j=1}^Nc_j\operatorname{ReLU}(\mathbf{w}_j^\top\mathbf{x} + b_j)\Big\rvert < \varepsilon\qquad\text{for all }\mathbf{x}\in K.
$$
:::

::: proof
*Step 1: exponentials of linear functions suffice.* Let $\mathcal{A}$ be the set of finite linear combinations of the functions $e^{\mathbf{v}^\top\mathbf{x}}$, $\mathbf{v}\in\R^n$, restricted to $K$. It is closed under products, since $e^{\mathbf{v}^\top\mathbf{x}}e^{\mathbf{v}'^\top\mathbf{x}} = e^{(\mathbf{v} + \mathbf{v}')^\top\mathbf{x}}$, it contains the constants ($\mathbf{v} = \mathbf{0}$), and it separates points: if $\mathbf{x}\ne\mathbf{x}'$ take $\mathbf{v} = \mathbf{x} - \mathbf{x}'$, for which $\mathbf{v}^\top\mathbf{x}\ne\mathbf{v}^\top\mathbf{x}'$ and so $e^{\mathbf{v}^\top\mathbf{x}}\ne e^{\mathbf{v}^\top\mathbf{x}'}$. By the Stone–Weierstrass theorem $\mathcal{A}$ is dense in $C(K)$: there is $E(\mathbf{x}) = \sum_{i=1}^r\alpha_ie^{\mathbf{v}_i^\top\mathbf{x}}$ with $\lvert f - E\rvert < \varepsilon/2$ on $K$.

*Step 2: each exponential is a one-dimensional problem.* For each $i$, $t = \mathbf{v}_i^\top\mathbf{x}$ ranges over a compact interval $[a_i, b_i]$ as $\mathbf{x}$ ranges over $K$. By [[#prop-relu-1d]] there is a one-dimensional ReLU network $g_i(t) = \gamma_i + \sum_kv_{ik}\operatorname{ReLU}(t - t_{ik})$ with $\lvert e^t - g_i(t)\rvert < \varepsilon/(2r\max(1, \lvert\alpha_i\rvert))$ on $[a_i, b_i]$. Substituting $t = \mathbf{v}_i^\top\mathbf{x}$, each term $\operatorname{ReLU}(\mathbf{v}_i^\top\mathbf{x} - t_{ik})$ is a ReLU unit with weights $\mathbf{v}_i$ and bias $-t_{ik}$.

*Step 3: combine.* The function $G(\mathbf{x}) = \sum_i\alpha_ig_i(\mathbf{v}_i^\top\mathbf{x})$ has the required form, with all the units of all the $g_i$ in one hidden layer, and $\lvert E - G\rvert\le\sum_i\lvert\alpha_i\rvert\,\varepsilon/(2r\max(1, \lvert\alpha_i\rvert)) \le \varepsilon/2$ on $K$. Hence $\lvert f - G\rvert < \varepsilon$.
:::

The same conclusion holds for nearly every activation one might use. The classical statements are these.

::: theorem Universal approximation (Cybenko 1989; Hornik 1991; Leshno et al. 1993) {#thm-uat}
Let $\mathcal{N}_\phi$ be the set of functions $\mathbf{x}\mapsto\sum_{j=1}^Nc_j\phi(\mathbf{w}_j^\top\mathbf{x} + b_j)$ on $\R^n$, over all $N$ and all parameters.

1. (Cybenko, 1989.) If $\phi$ is continuous and **sigmoidal** — $\phi(t)\to1$ as $t\to\infty$ and $\phi(t)\to0$ as $t\to-\infty$ — then $\mathcal{N}_\phi$ is dense in $C([0, 1]^n)$ in the uniform norm: every continuous function on the unit cube is approximated within any $\varepsilon > 0$ at every point.
2. (Hornik, 1991.) If $\phi$ is continuous, bounded and non-constant, then $\mathcal{N}_\phi$ is dense in $C(K)$ for every compact $K\subset\R^n$ in the uniform norm; if $\phi$ is bounded and non-constant, it is dense in $L^p(\mu)$, $1\le p < \infty$, for every finite measure $\mu$ on $\R^n$.
3. (Leshno, Lin, Pinkus and Schocken, 1993.) If $\phi$ is locally bounded and piecewise continuous, then $\mathcal{N}_\phi$ is dense in $C(K)$ for every compact $K$ **if and only if** $\phi$ is not a polynomial (almost everywhere).
:::

Cybenko's proof is not constructive: it uses the Hahn–Banach theorem to show that a continuous linear functional vanishing on $\mathcal{N}_\phi$ must be zero, so $\mathcal{N}_\phi$ cannot lie in a proper closed subspace. Hornik, Stinchcombe and White (1989) had proved a closely related result for squashing functions the same year. Part 3 is the cleanest form: ReLU, GELU, tanh and the sigmoid all qualify, and polynomials are exactly the exception, since a one-hidden-layer network with a degree-$p$ polynomial activation computes only polynomials of degree at most $p$ (exercise 9).

::: warning What universal approximation does not say
The theorem guarantees that a good approximation *exists* in a wide enough network. It does not say how wide (possibly astronomically), that gradient descent will find it, or that a network fitted to finitely many samples will generalise to new inputs. A lookup table is also a universal approximator. The theorem rules out one worry — that the architecture is too weak in principle — but explains little about why deep networks work in practice; that depends on optimisation, on the inductive biases of the architecture, and on the structure of real data.
:::

### Why depth helps {#sec-depth}

If one hidden layer suffices in principle, why stack many? Because some functions that deep networks compute cheaply would need enormous shallow ones. A clean example uses the **tent map** $t(x) = 2\operatorname{ReLU}(x) - 4\operatorname{ReLU}(x - \tfrac12)$, which on $[0, 1]$ rises linearly from $0$ to $1$ on $[0, \frac12]$ and falls back to $0$ on $[\frac12, 1]$.

::: proposition Depth can be exponentially more efficient {#prop-depth}
The $L$-fold composition $t^{(L)} = t\circ\cdots\circ t$ is computed on $[0, 1]$ by a ReLU network with $L$ hidden layers of width $2$, and is a sawtooth with $2^L$ linear pieces. Any network with *one* hidden layer of $m$ ReLU units computes on $\R$ a piecewise-linear function with at most $m + 1$ pieces, so it needs $m\ge2^L - 1$ units to equal $t^{(L)}$ on $[0, 1]$.
:::

::: proof
Each layer computes $t$ of the previous output with two units, and $t$ maps $[0, 1]$ into $[0, 1]$, so the composition is well defined on $[0, 1]$. By induction, suppose $t^{(L-1)}$ has $2^{L-1}$ linear pieces on $[0, 1]$. On $[0, \frac12]$, $t$ is an increasing linear bijection onto $[0, 1]$, and on $[\frac12, 1]$ a decreasing one; so $t^{(L)} = t^{(L-1)}\circ t$ restricted to each half is a copy of $t^{(L-1)}$ squeezed (and on the second half reflected) onto that half, with $2^{L-1}$ pieces each, $2^L$ in all. Adjacent pieces have slopes $\pm2^L$ of opposite sign, so no two merge. For the shallow network, $c_0 + \sum_jc_j\operatorname{ReLU}(w_jx + b_j)$ is linear except at the at most $m$ points $x = -b_j/w_j$ (units with $w_j = 0$ are constants), so it has at most $m + 1$ pieces.
:::

::: widget plot
f: 1 - abs(2*x - 1); 1 - abs(2*(1 - abs(2*x - 1)) - 1); 1 - abs(2*(1 - abs(2*(1 - abs(2*x - 1)) - 1)) - 1)
x: 0, 1
y: -0.1, 1.1
labels: $t$; $t\circ t$; $t\circ t\circ t$
caption: The tent map $t$ and its compositions, each layer of width two doubling the number of linear pieces: $2$, $4$, $8$. A single hidden layer would need one ReLU unit per kink — $2^L - 1$ of them for $L$ compositions — so depth buys an exponential saving for this function.
:::

Telgarsky (2016) turned this into a separation theorem: there are functions computed by ReLU networks of depth $O(k^3)$ and constant width that any network of depth $O(k)$ can approximate only with $\Omega(2^k)$ units. Results like this explain why depth is *useful* in principle; that the functions arising in vision and language have the compositional structure that depth exploits is a hypothesis supported by experience rather than a theorem.

## From the MLP to modern networks {#sec-modern}

Every architecture in this atlas is built from MLPs and something else. A convolutional network ([[neural-networks/convolutional-networks]]) restricts the weight matrices to share weights across positions; a recurrent network applies the same MLP step by step along a sequence ([[sequence-models]]); a Transformer alternates attention, which mixes information across positions, with a two-layer MLP applied to each position separately ([[transformers/transformer-block#def-ffn]]). In a large language model about two thirds of the parameters sit in those MLPs. The ingredients that make such stacks trainable — gradients computed by backpropagation, adaptive optimisers, careful initialisation, normalisation and residual connections — are the subject of the rest of this course.

::: history
Warren McCulloch and Walter Pitts's "A logical calculus of the ideas immanent in nervous activity" (1943) introduced the threshold neuron and showed that networks of such units compute logical functions. Donald Hebb's *The Organization of Behavior* (1949) proposed that connections strengthen when neurons fire together. Frank Rosenblatt's perceptron (1958), built in hardware as the Mark I Perceptron at the Cornell Aeronautical Laboratory, was the first learning machine of this kind; the convergence theorem was proved by Albert Novikoff (1962) and others. Bernard Widrow and Ted Hoff's ADALINE (1960) trained a linear unit by gradient descent on the squared error, the "delta rule". Marvin Minsky and Seymour Papert's *Perceptrons* (1969) analysed the limits of single-layer networks; it is often blamed, with some simplification, for the decline of neural-network funding in the 1970s. Multilayer networks trained by backpropagation (Rumelhart, Hinton and Williams, 1986) revived the field, and the universal approximation theorems of Hornik, Stinchcombe and White (1989), Cybenko (1989) and Hornik (1991) answered the question of expressive power. The shift from sigmoids to ReLU around 2010–2012 was one of the changes that made deep networks trainable.
:::

::: summary
- An **artificial neuron** computes $\phi(\mathbf{w}^\top\mathbf{x} + b)$; with the logistic activation it is logistic regression, with a step it is the McCulloch–Pitts threshold unit.
- The **perceptron** rule adds misclassified examples to the weights. On data separable with margin $\gamma$ and radius $R$ it makes at most $(R/\gamma)^2$ mistakes (Novikoff), but it never settles on non-separable data and cannot represent XOR.
- A **multilayer perceptron** alternates affine maps and elementwise activations; its hidden layers are a learned feature map and its last layer is a linear (softmax) classifier. Without nonlinear activations, depth collapses to a single affine map.
- **Activations** moved from the sigmoid and tanh, which saturate, to ReLU, and to smooth relatives GELU and SiLU; small derivatives slow learning, and ReLU units can die.
- **Universal approximation**: one hidden layer of any non-polynomial activation can approximate any continuous function on a compact set uniformly (Cybenko, Hornik, Leshno et al.); for ReLU the proof is constructive. Existence says nothing about width, trainability or generalisation.
- **Depth** can be exponentially more efficient than width: $L$ layers of width $2$ compute a sawtooth that needs $2^L - 1$ units in one hidden layer.
:::

## Exercises

::: exercise A single neuron {level=1 check="1/(1+exp(0.4))"}
A sigmoid neuron has weights $\mathbf{w} = (0.5, -1, 2)$ and bias $0.1$. Compute its output for $\mathbf{x} = (1, 2, 0.5)$.
::: solution
$z = 0.5 - 2 + 1 + 0.1 = -0.4$, so $h = \sigma(-0.4) = 1/(1 + e^{0.4})\approx0.401$. With a ReLU activation the output would be $0$.
:::
:::

::: exercise Counting parameters {level=1 check="7753"}
How many parameters (weights and biases) does an MLP with widths $100, 50, 50, 3$ have?
::: solution
$100\cdot50 + 50 = 5{,}050$, $50\cdot50 + 50 = 2{,}550$ and $50\cdot3 + 3 = 153$, a total of $7{,}753$.
:::
:::

::: exercise A mistake bound {level=1 check="2500"}
Inputs satisfy $\lVert\mathbf{x}_i\rVert\le5$ and some unit vector separates the data with margin $0.1$. What is the largest number of mistakes the perceptron can make? What happens to the bound if every input is multiplied by $2$?
::: solution
$(R/\gamma)^2 = (5/0.1)^2 = 2{,}500$. Doubling every input doubles both $R$ and $\gamma$, so the bound is unchanged; the perceptron's mistakes do not depend on the scale of the data.
:::
:::

::: exercise Tanh and the sigmoid {level=2}
Show that $\tanh z = 2\sigma(2z) - 1$. Deduce that a one-hidden-layer network with tanh units computes exactly the same functions as one with sigmoid units (with different parameters).
::: solution
$2\sigma(2z) - 1 = \dfrac{2}{1 + e^{-2z}} - 1 = \dfrac{1 - e^{-2z}}{1 + e^{-2z}}$, and multiplying numerator and denominator by $e^z$ gives $(e^z - e^{-z})/(e^z + e^{-z}) = \tanh z$. A tanh unit $c\tanh(\mathbf{w}^\top\mathbf{x} + b)$ equals $2c\,\sigma(2\mathbf{w}^\top\mathbf{x} + 2b) - c$, a sigmoid unit with doubled weights and bias plus a constant, which the output bias absorbs; conversely $\sigma(z) = \frac12\big(1 + \tanh(z/2)\big)$. The function classes are equal. The two activations differ in training — tanh is zero-centred and has four times the slope at $0$ — not in what they can represent.
:::
:::

::: exercise Logic gates from neurons {level=2}
With inputs in $\{0, 1\}$ and the step activation $[z\ge0]$, give weights and biases for AND, OR and NOT, and combine them into a two-layer threshold network for XOR.
::: solution
AND: $\mathbf{w} = (1, 1)$, $b = -1.5$. OR: $\mathbf{w} = (1, 1)$, $b = -0.5$. NOT: $w = -1$, $b = 0.5$. XOR is "OR and not AND": hidden units $h_1 = \text{OR}(x_1, x_2)$ and $h_2 = \text{AND}(x_1, x_2)$, then the output unit $[h_1 - h_2 - 0.5\ge0]$, which fires exactly when $h_1 = 1$ and $h_2 = 0$, that is, when exactly one input is $1$.
:::
:::

::: exercise Pieces of a sawtooth {level=2 check="32"}
How many linear pieces does $t^{(5)}$ have on $[0, 1]$, where $t$ is the tent map of [[#prop-depth]]? How many ReLU units would a network with one hidden layer need to represent it exactly, and how many does the deep construction use?
::: solution
$2^5 = 32$ pieces. A shallow network needs at least $2^5 - 1 = 31$ units, one per kink. The deep construction uses $5$ hidden layers of $2$ units, $10$ units in all.
:::
:::

::: exercise Absolute value and maximum {level=2}
Write $\lvert x\rvert$ and $\max(x_1, x_2)$ exactly as ReLU networks with one hidden layer. Using the second, describe a ReLU network computing $\max(x_1, x_2, x_3, x_4)$ with two hidden layers.
::: solution
$\lvert x\rvert = \operatorname{ReLU}(x) + \operatorname{ReLU}(-x)$. For the maximum, $\max(x_1, x_2) = x_2 + \operatorname{ReLU}(x_1 - x_2)$, and writing $x_2 = \operatorname{ReLU}(x_2) - \operatorname{ReLU}(-x_2)$ makes this a one-hidden-layer network with three units and output weights $(1, -1, 1)$ on $\operatorname{ReLU}(x_2)$, $\operatorname{ReLU}(-x_2)$, $\operatorname{ReLU}(x_1 - x_2)$. For four inputs, the first hidden layer computes the six units for $m_1 = \max(x_1, x_2)$ and $m_2 = \max(x_3, x_4)$; since $m_1$ and $m_2$ are linear combinations of these units, the second hidden layer can compute $\operatorname{ReLU}(m_2)$, $\operatorname{ReLU}(-m_2)$ and $\operatorname{ReLU}(m_1 - m_2)$, and the output is $\max(m_1, m_2)$. In general a tree of depth $\lceil\log_2n\rceil$ computes the maximum of $n$ numbers — max pooling is a ReLU network.
:::
:::

::: exercise How wide for a given accuracy? {level=2 check="71"}
Linear interpolation with spacing $h$ of a function with $\lvert f''\rvert\le M$ has error at most $Mh^2/8$. Using [[#prop-relu-1d]] with equal spacing, how many ReLU units suffice to approximate $\sin$ on $[0, 2\pi]$ within $10^{-3}$?
::: solution
With $M = 1$ we need $h^2/8\le10^{-3}$, so $h\le\sqrt{0.008} = 0.0894$. The number of intervals is $m = 2\pi/h\ge70.2$, so $m = 71$ units suffice (each interval contributes one unit, the one switching on at its left end). The experiment in [[#sec-universal]] confirms the scaling: $64$ units gave error $0.0012$.
:::
:::

::: exercise Polynomial activations are not universal {level=3}
Let $\phi$ be a polynomial of degree $p$. Show that every network $\sum_jc_j\phi(\mathbf{w}_j^\top\mathbf{x} + b_j)$ is a polynomial of degree at most $p$ in $\mathbf{x}$, and conclude that such networks are not dense in $C([0, 1])$. Does adding more hidden *layers* change the conclusion?
::: solution
$\mathbf{w}_j^\top\mathbf{x} + b_j$ is a polynomial of degree at most $1$ in $\mathbf{x}$, so $\phi$ of it has degree at most $p$, and a linear combination of polynomials of degree at most $p$ is again one. The polynomials of degree at most $p$ on $[0, 1]$ form a finite-dimensional, hence closed, subspace of $C([0, 1])$, and it is proper (it does not contain $x^{p+1}$), so it is not dense: for instance the distance from $x^{p+1}$ to the subspace is a positive number, and no network gets closer. With $L$ hidden layers the network is a polynomial of degree at most $p^L$, still a fixed finite-dimensional space for a fixed depth, so a fixed-depth polynomial network is not universal either; only by letting the depth grow without bound could the degree grow. This is why part 3 of [[#thm-uat]] excludes polynomials.
:::
:::

::: exercise The perceptron on non-separable data {level=3}
Show that if the data are not linearly separable (through the origin, after appending the constant feature), the perceptron makes infinitely many mistakes. Then show that the weight vectors stay bounded if the examples are visited cyclically — you may use without proof the *perceptron cycling theorem* (Block and Levin, 1970), which says exactly this — and explain why averaging the weights over all steps (the "averaged perceptron" of Freund and Schapire, 1999) is a sensible remedy.
::: solution
If the perceptron made only finitely many mistakes, then after the last one the weight vector would classify every example correctly on every subsequent pass, so it would be a separating vector — contradicting non-separability. Hence every pass contains a mistake and there are infinitely many. The cycling theorem says the iterates remain in a bounded set, so they wander among finitely many regions of weight space, each misclassifying some examples, and the final iterate depends on where the algorithm happens to stop. The average $\bar{\mathbf{w}} = \frac1T\sum_t\mathbf{w}_t$ weights each visited vector by how long it survived without a mistake, which favours vectors that classify many examples correctly, and it varies much less with the stopping time. Freund and Schapire gave generalisation bounds for this averaged (or "voted") perceptron in terms of the number of mistakes. A smooth loss such as the logistic loss avoids the problem altogether, because its minimiser is well defined whether or not the data are separable (with a penalty in the separable case).
:::
:::
