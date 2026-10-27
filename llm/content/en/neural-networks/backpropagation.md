Training a network means following the gradient of its loss with respect to every one of its parameters — tens of thousands in a small MLP, hundreds of billions in a large language model. **Backpropagation** computes all of those partial derivatives in one backward sweep through the network, at a cost of about twice the forward pass. It is nothing more than the chain rule, applied in a particular order and with intermediate results stored; but that order is what turns an impossible computation into a cheap one.

[[math-for-ml/gradients]] introduced the pieces: the multivariable chain rule ([[math-for-ml/gradients#thm-chain]]), the observation that evaluating it from the output backwards needs only vector–Jacobian products ([[math-for-ml/gradients#sec-modes]]), the gradients of a linear layer and of softmax cross-entropy, and a two-layer network differentiated by hand ([[math-for-ml/gradients#ex-backprop]]). This chapter makes the method general — first on an arbitrary computation graph, then in the batched matrix form used for MLPs — and then counts what it costs in arithmetic and memory, implements it, and tests the implementation the way practitioners do. The next chapter, [[neural-networks/automatic-differentiation]], turns the same idea into software that differentiates any program.

## Computation graphs {#sec-graphs}

Any formula, and any program without loops whose length depends on the data, can be broken into a sequence of elementary operations, each of which reads some earlier values and produces a new one.

::: definition Computation graph {#def-graph}
A **computation graph** is a directed acyclic graph whose nodes are variables $v_1, \dots, v_N$. The first $n$ nodes are **inputs** (data and parameters); every other node is computed by an elementary operation from its **parents**,

$$
v_j = \psi_j\big(v_i : i\in\operatorname{pa}(j)\big),\qquad j = n + 1, \dots, N,
$$

and the last node $v_N$ is the scalar output, here the loss $\mathcal{L}$. The nodes are numbered in a **topological order**: every parent comes before its children. The **forward pass** evaluates $v_{n+1}, \dots, v_N$ in this order.
:::

"Elementary" means any operation whose partial derivatives we know how to compute: addition, multiplication, $\exp$, $\tanh$, but also a whole matrix product or a softmax, treated as one node with vector or matrix values. The granularity is a choice. A topological order always exists for a directed acyclic graph and can be found by depth-first search; in a program, the order in which the operations were executed is one.

::: widget graph
nodes: w@0,2; x@0,0; b@0,-2; mul@2,1; a@4,0; p@6,0; diff@8,0; sq@10,0; reg@8,2; L@12,1
edges: w>mul; x>mul; mul>a; b>a; a>p; p>diff; diff>sq; sq>L; w>reg; reg>L
algorithm: topo
start: w
caption: The computation graph of [[#ex-neuron]]: a logistic neuron $p = \sigma(wx + b)$ with squared error $\frac12(p - y)^2$ and a weight penalty $\frac\lambda2 w^2$. Step through the topological sort: it lists every node after all its parents, which is an order in which the forward pass can run. Backpropagation visits the nodes in the reverse of this order. The weight $w$ has two children, so its gradient will be a sum of two contributions.
:::

## The backward pass {#sec-backward}

For each node define its **adjoint** — the sensitivity of the loss to it.

::: definition Adjoint {#def-adjoint}
The **adjoint** of node $v_i$ is $\bar v_i = \partial\mathcal{L}/\partial v_i$, the derivative of the output with respect to $v_i$ *with all of $v_i$'s inputs held fixed and all of its descendants recomputed*. (If $v_i$ is a vector or matrix, $\bar v_i$ has the same shape.)
:::

The adjoint of the output is $\bar v_N = 1$. The adjoints of the inputs that are parameters are the gradient we want. Between them, the chain rule links each node to its children.

::: theorem Backpropagation {#thm-backprop}
In a computation graph with scalar output $\mathcal{L} = v_N$, the adjoints satisfy

$$
\bar v_N = 1,\qquad\bar v_i = \sum_{j\,:\,i\in\operatorname{pa}(j)}\bar v_j\,\frac{\partial\psi_j}{\partial v_i}\qquad(i < N),
$$ {#eq-adjoint}

where each partial derivative is evaluated at the values from the forward pass. Computing the adjoints for $i = N - 1, N - 2, \dots, 1$, the reverse of the topological order, gives every $\bar v_i$ after all the adjoints it depends on.
:::

::: proof
Treat $v_i$ as a free variable and every later node as recomputed from it; write $\dot v_k = dv_k/dv_i$ for the resulting derivatives, so $\dot v_i = 1$ and $\dot v_k = 0$ for every node that does not depend on $v_i$ (in particular for all $k < i$). For a later node $v_k = \psi_k(\text{parents})$ the chain rule ([[math-for-ml/gradients#thm-chain]]) gives

$$
\dot v_k = \sum_{m\in\operatorname{pa}(k)}\frac{\partial\psi_k}{\partial v_m}\,\dot v_m .
$$

Unrolling this recursion in topological order, $\dot v_N = d\mathcal{L}/dv_i$ is the sum, over all directed paths $i = k_0\to k_1\to\dots\to k_r = N$ in the graph, of the products $\prod_{s=1}^r\partial\psi_{k_s}/\partial v_{k_{s-1}}$ of local derivatives along the path. Group these paths by their first step $i\to j$, where $j$ is a child of $i$. The paths starting with that step contribute $\partial\psi_j/\partial v_i$ times the sum over all paths from $j$ to $N$, and by the same path-sum identity applied to $v_j$ that inner sum is $\bar v_j$. Adding over the children gives [[#eq-adjoint]]. Every child $j$ of $i$ has $j > i$, so in reverse topological order all the $\bar v_j$ in the sum are already known when $\bar v_i$ is computed.
:::

Two rules follow directly and are worth remembering. **Fan-out sums**: when a value is used by several operations, its adjoint is the sum of the contributions from each use. **Each operation needs only its own local derivatives**, $\partial\psi_j/\partial v_i$, evaluated at the stored forward values; nobody ever writes down the derivative of the whole network. In practice the sum [[#eq-adjoint]] is accumulated "push" style: visiting node $j$, add $\bar v_j\,\partial\psi_j/\partial v_i$ into each parent's running adjoint.

::: algorithm Backpropagation on a computation graph {#alg-backprop}
1. **Forward.** For $j = n + 1, \dots, N$: compute $v_j = \psi_j(\text{parents})$ and store it (and whatever $\psi_j$'s derivative needs).
2. **Initialise.** $\bar v_N\leftarrow1$, and $\bar v_i\leftarrow0$ for all $i < N$.
3. **Backward.** For $j = N, N - 1, \dots, n + 1$: for each parent $i$ of $j$, $\bar v_i\leftarrow\bar v_i + \bar v_j\,\partial\psi_j/\partial v_i$.
4. Return $\bar v_i$ for the parameter nodes.

When the nodes hold vectors or matrices, step 3 multiplies by a vector–Jacobian product, $\bar{\mathbf{v}}_i\mathrel{+}=J_{ji}^\top\bar{\mathbf{v}}_j$ with $J_{ji} = \partial\mathbf{v}_j/\partial\mathbf{v}_i$, which is computed without forming the Jacobian.
:::

::: example Backpropagation through one neuron {#ex-neuron}
A logistic neuron with input $x = 2$, target $y = 1$, weight $w = 0.5$, bias $b = 0$ and penalty $\lambda = 0.1$ has loss $\mathcal{L} = \frac12(p - y)^2 + \frac\lambda2w^2$ with $p = \sigma(a)$, $a = wx + b$. Compute $\mathcal{L}$, $\partial\mathcal{L}/\partial w$ and $\partial\mathcal{L}/\partial b$ by [[#alg-backprop]].
::: solution
**Forward.** $a = 1$, $p = \sigma(1) = 0.731059$, and $\mathcal{L} = \frac12(0.268941)^2 + 0.05\cdot0.25 = 0.036165 + 0.0125 = 0.048665$.

**Backward**, visiting the nodes of the figure in reverse order. The output is a sum, so its two summands each get adjoint $1$. From $\frac12(p - y)^2$: $\bar p = p - y = -0.268941$. From $p = \sigma(a)$: $\bar a = \bar p\,\sigma'(a) = \bar p\,p(1 - p) = -0.268941\cdot0.196612 = -0.052877$. From $a = wx + b$: $\bar b = \bar a = -0.052877$, and the multiplication contributes $\bar a\,x = -0.105754$ to $\bar w$. From $\frac\lambda2w^2$: a second contribution $\lambda w = 0.05$. By the fan-out rule $\bar w = -0.105754 + 0.05 = -0.055754$.

A central difference with step $10^{-6}$ gives $\partial\mathcal{L}/\partial w\approx-0.0557542$, in agreement. The gradient step increases $w$, as it should: the prediction $0.73$ is below the target, and the penalty's pull towards $0$ only partly offsets this.
:::
:::

## Backpropagation in a multilayer perceptron {#sec-mlp-backprop}

For an MLP ([[neural-networks/perceptrons-mlps#def-mlp]]) it is natural to treat each matrix product and each elementwise activation as one node, and to process a whole mini-batch at once. Stack the $B$ inputs as rows: $H_0 = X\in\R^{B\times d_0}$, and for $\ell = 1, \dots, L$

$$
A_\ell = H_{\ell-1}W_\ell + \mathbf{1}\mathbf{b}_\ell^\top\in\R^{B\times d_\ell},\qquad H_\ell = \phi(A_\ell)\ (\ell < L),\qquad Z = A_L,
$$

with $W_\ell\in\R^{d_{\ell-1}\times d_\ell}$ (the row-vector convention of code; $W_\ell$ here is the transpose of the matrix in [[neural-networks/perceptrons-mlps#eq-mlp]]). The loss is the mean cross-entropy $\mathcal{L} = -\frac1B\sum_{r=1}^B\log\operatorname{softmax}(\mathbf{z}_r)_{y_r}$. Write $\Delta_\ell = \partial\mathcal{L}/\partial A_\ell$, the "error signal" at the pre-activations of layer $\ell$, a $B\times d_\ell$ matrix.

::: theorem Backpropagation equations for an MLP {#thm-mlp-backprop}
Let $P\in\R^{B\times K}$ hold the predicted probabilities and $Y$ the one-hot targets. Then

$$
\begin{aligned}
\Delta_L &= \tfrac1B(P - Y),\\
\frac{\partial\mathcal{L}}{\partial W_\ell} &= H_{\ell-1}^\top\Delta_\ell,\qquad\frac{\partial\mathcal{L}}{\partial\mathbf{b}_\ell} = \Delta_\ell^\top\mathbf{1},\\
\Delta_{\ell-1} &= \big(\Delta_\ell W_\ell^\top\big)\odot\phi'(A_{\ell-1})\qquad(\ell = L, \dots, 2),
\end{aligned}
$$ {#eq-mlp-backprop}

where $\odot$ is the elementwise product. The shapes check: $H_{\ell-1}^\top\Delta_\ell$ is $(d_{\ell-1}, B)(B, d_\ell)$, the shape of $W_\ell$; $\Delta_\ell W_\ell^\top$ is $(B, d_\ell)(d_\ell, d_{\ell-1})$, the shape of $A_{\ell-1}$.
:::

::: proof
*Output.* The loss is an average over rows, and row $r$'s term depends only on $\mathbf{z}_r$, with gradient $\mathbf{p}_r - \mathbf{e}_{y_r}$ by [[math-for-ml/gradients#prop-softmax-ce]]. Dividing by $B$ for the average gives $\Delta_L = (P - Y)/B$.

*Weights.* Entry $(r, k)$ of $A_\ell$ is $\sum_iH_{\ell-1, ri}W_{\ell, ik} + b_{\ell, k}$, so $\partial A_{\ell, rk}/\partial W_{\ell, ik} = H_{\ell-1, ri}$, and $W_{\ell, ik}$ influences the entries $A_{\ell, rk}$ for every row $r$ — a fan-out over the batch. Summing, $\partial\mathcal{L}/\partial W_{\ell, ik} = \sum_rH_{\ell-1, ri}\Delta_{\ell, rk} = (H_{\ell-1}^\top\Delta_\ell)_{ik}$. Likewise $b_{\ell, k}$ enters every row with coefficient $1$, giving the column sums $\sum_r\Delta_{\ell, rk}$.

*Propagation.* $H_{\ell-1, ri}$ influences $A_{\ell, rk}$ for all $k$ with coefficient $W_{\ell, ik}$, so $\partial\mathcal{L}/\partial H_{\ell-1, ri} = \sum_k\Delta_{\ell, rk}W_{\ell, ik} = (\Delta_\ell W_\ell^\top)_{ri}$. Finally $H_{\ell-1, ri} = \phi(A_{\ell-1, ri})$ depends on the single entry $A_{\ell-1, ri}$, with derivative $\phi'(A_{\ell-1, ri})$, which gives the elementwise product.
:::

Read [[#eq-mlp-backprop]] as a recipe: the error signal enters at the output as "prediction minus target", flows backwards through each weight matrix by multiplication with $W_\ell^\top$, and is gated at each layer by the activation's slope. Each weight's gradient is the product of the signal arriving at its output end and the activation at its input end, summed over the batch — so a weight learns only when *both* its input unit is active and its output unit receives an error. The factors $\phi'(A_\ell)$ multiply along the way, which is how gradients vanish in deep networks of saturating units ([[neural-networks/initialisation-normalisation]]).

::: quiz
In [[#thm-mlp-backprop]], why does the gradient $\partial\mathcal{L}/\partial W_\ell$ involve a sum over the batch?
- [ ] Because the weights are different for each example
- [x] Because the same weight is used for every example in the batch, so its adjoint collects one contribution per example
- [ ] Because the loss is a product over examples
- [ ] It does not; the gradient is computed for one example at a time
::: solution
The matrix $W_\ell$ is shared by all $B$ rows of the batch, a fan-out of $B$ uses. By the fan-out rule of [[#thm-backprop]] its adjoint is the sum of the $B$ per-example contributions, which is the matrix product $H_{\ell-1}^\top\Delta_\ell$. The factor $1/B$ inside $\Delta_L$ makes this sum an average.
:::
:::

## What backpropagation costs {#sec-cost}

### Arithmetic {#sec-flops}

Count floating-point operations (FLOPs), with a multiply and an add counting as two. Multiplying an $m\times k$ matrix by a $k\times n$ one costs about $2mkn$ FLOPs.

::: proposition The cost of a training step {#prop-flops}
For an MLP with $N_W = \sum_\ell d_{\ell-1}d_\ell$ weights (biases and activations are lower-order terms), a batch of $B$ examples costs about

$$
C_{\text{forward}}\approx2BN_W,\qquad C_{\text{backward}}\approx4BN_W,\qquad C_{\text{step}}\approx6BN_W
$$ {#eq-6n}

FLOPs: the backward pass costs about twice the forward pass, and the gradient of the whole parameter vector costs about three forward passes.
:::

::: proof
The forward pass multiplies $H_{\ell-1}$, of shape $(B, d_{\ell-1})$, by $W_\ell$, of shape $(d_{\ell-1}, d_\ell)$: $2Bd_{\ell-1}d_\ell$ FLOPs per layer, $2BN_W$ in all. The backward pass performs, per layer, two products of the same size: $H_{\ell-1}^\top\Delta_\ell$ (shape $(d_{\ell-1}, B)$ times $(B, d_\ell)$, $2Bd_{\ell-1}d_\ell$ FLOPs) and $\Delta_\ell W_\ell^\top$ (shape $(B, d_\ell)$ times $(d_\ell, d_{\ell-1})$, the same count). That is $4BN_W$, less the input-gradient product of the first layer, which is not needed. The elementwise work — activations, their derivatives, the softmax, the bias sums — is $O(B\sum_\ell d_\ell)$, smaller than the matrix products by a factor of the layer width.
:::

This is the cheap gradient principle ([[math-for-ml/gradients#prop-cheap-gradient]]) in its most concrete form: a gradient of $N$ components for a constant factor times the cost of one evaluation, not $N$ times it. The same count holds for any network dominated by matrix multiplications, and it is the origin of the rule of thumb that training a Transformer with $N$ parameters on $D$ tokens costs about $6ND$ FLOPs ([[scaling]]); for Transformers the attention scores add a further term that grows with the context length.

::: example FLOPs of training {#ex-flops}
(a) How many FLOPs does one training step of the digit MLP of [[neural-networks/perceptrons-mlps#ex-params]] take with batch size $64$? (b) Estimate the training cost of a model with $7\times10^9$ parameters trained on $10^{12}$ tokens, and how long it would take on a device that sustains $10^{15}$ FLOP/s.
::: solution
(a) The MLP has $N_W = 784\cdot512 + 512\cdot512 + 512\cdot10 = 668{,}672$ weights, so a step costs $6\cdot64\cdot668{,}672\approx2.57\times10^8$ FLOPs — a fraction of a millisecond on a modern GPU, which is why small models are usually limited by data loading rather than arithmetic.

(b) $6ND = 6\cdot7\times10^9\cdot10^{12} = 4.2\times10^{22}$ FLOPs. At $10^{15}$ FLOP/s that is $4.2\times10^7$ s, about $486$ days on one device — or about a week on $100$ devices with perfect parallel efficiency. Real runs achieve only a fraction of a device's peak throughput, and the ratio of achieved to peak (the "model FLOPs utilisation") is a standard measure of training efficiency.
:::
:::

### Memory {#sec-memory}

The backward pass of [[#eq-mlp-backprop]] needs $H_{\ell-1}$ to form the weight gradient and $A_{\ell-1}$ (or $H_{\ell-1}$, from which $\tanh'$ and $\sigma'$ can be computed) for the activation's derivative. All of these were produced by the forward pass, and they must be kept until the backward pass reaches them. Memory for these stored **activations** grows with the batch size and the depth:

$$
M_{\text{act}}\approx B\sum_{\ell}(\text{values stored at layer }\ell)\times(\text{bytes per value}).
$$

For the digit MLP with batch $64$ in 32-bit floats, storing $X$, $A_1, H_1, A_2, H_2$ and $Z$ takes $64\cdot(784 + 4\cdot512 + 10)\cdot4\approx0.73$ MB, compared with $2.7$ MB for the parameters. In a large Transformer trained with long sequences the activations can exceed the parameters many times over, which is why practitioners trade compute for memory by **activation checkpointing** — storing only some activations and recomputing the others during the backward pass ([[neural-networks/automatic-differentiation#sec-checkpointing]]).

::: warning Backpropagation is not a learning rule
"Backpropagation" is often used loosely for the whole training procedure. Strictly, it is only the algorithm that computes the gradient; what is done with the gradient — plain gradient descent, momentum, Adam, with what learning rate — is the optimiser ([[neural-networks/optimisers]]), a separate choice. Keeping the two apart helps debugging: a correct gradient (checked numerically, below) with a diverging loss points at the optimiser or the data, not at the backward pass. Nor is backpropagation specific to neural networks: it differentiates any composition of differentiable operations.
:::

## Implementing it {#sec-code}

The listing implements [[#thm-mlp-backprop]] in plain Python — lists of lists as matrices — for an MLP with tanh hidden layers, checks three gradient entries against central differences, and trains the network by full-batch gradient descent to separate a disc from a surrounding ring.

```python
import math, random

# --- tiny matrix helpers on lists of lists -----------------------------------
def matmul(A, B):                     # (m, k) @ (k, n) -> (m, n)
    Bt = list(zip(*B))
    return [[sum(a * b for a, b in zip(row, col)) for col in Bt] for row in A]

def T(A):                             # transpose
    return [list(r) for r in zip(*A)]

# --- an MLP with tanh hidden layers and a softmax cross-entropy output --------
def init(sizes, rng):
    params = []
    for n_in, n_out in zip(sizes[:-1], sizes[1:]):
        W = [[rng.gauss(0, 1 / math.sqrt(n_in)) for _ in range(n_out)] for _ in range(n_in)]
        params.append([W, [0.0] * n_out])          # W: (n_in, n_out), b: (n_out,)
    return params

def forward(params, X):
    """X: (B, d0). Returns the cache of every layer's input and pre-activation."""
    H, cache = X, []
    for l, (W, b) in enumerate(params):
        A = [[a + bj for a, bj in zip(row, b)] for row in matmul(H, W)]   # (B, d_l)
        cache.append((H, A))
        H = A if l == len(params) - 1 else [[math.tanh(a) for a in row] for row in A]
    return H, cache                                                     # logits (B, K)

def loss_and_grads(params, X, y):
    Z, cache = forward(params, X)
    B = len(X)
    loss, D = 0.0, []
    for z, t in zip(Z, y):                         # softmax cross-entropy, row by row
        m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e)
        loss += -(z[t] - m - math.log(s))
        D.append([ei / s - (k == t) for k, ei in enumerate(e)])
    D = [[d / B for d in row] for row in D]        # dL/dZ = (P - Y) / B, shape (B, K)
    grads = [None] * len(params)
    for l in reversed(range(len(params))):
        H_in, A = cache[l]
        W, b = params[l]
        dW = matmul(T(H_in), D)                    # (d_{l-1}, d_l) = H^T D
        db = [sum(col) for col in zip(*D)]         # (d_l,) = column sums of D
        grads[l] = (dW, db)
        if l > 0:
            dH = matmul(D, T(W))                   # (B, d_{l-1}) = D W^T
            D = [[g * (1 - h * h) for g, h in zip(gr, hr)]   # tanh' = 1 - tanh^2
                 for gr, hr in zip(dH, H_in)]
    return loss / B, grads

# --- data: a disc (class 0) inside a ring (class 1) -------------------------
rng = random.Random(0)
def make_rings(n):
    X, y = [], []
    for i in range(n):
        t = i % 2                                   # class 0: inner disc, class 1: ring
        r = rng.uniform(0, 1) if t == 0 else rng.uniform(1.3, 2)
        a = rng.uniform(0, 2 * math.pi)
        X.append([r * math.cos(a), r * math.sin(a)]); y.append(t)
    return X, y

X, y = make_rings(200)
params = init([2, 8, 8, 2], rng)

# --- gradient check: analytic vs central differences on a few entries ---------
loss, grads = loss_and_grads(params, X[:10], y[:10])
eps = 1e-5
for l, i, j in [(0, 0, 3), (1, 5, 2), (2, 7, 1)]:
    W = params[l][0]; old = W[i][j]
    W[i][j] = old + eps; lp, _ = loss_and_grads(params, X[:10], y[:10])
    W[i][j] = old - eps; lm, _ = loss_and_grads(params, X[:10], y[:10])
    W[i][j] = old
    num, ana = (lp - lm) / (2 * eps), grads[l][0][i][j]
    print(f"layer {l} W[{i}][{j}]  analytic {ana: .8f}  numeric {num: .8f}  "
          f"rel. error {abs(num - ana) / max(abs(num), abs(ana)):.1e}")

# --- full-batch gradient descent --------------------------------------------
eta = 0.5
for step in range(1, 801):
    loss, grads = loss_and_grads(params, X, y)
    for (W, b), (dW, db) in zip(params, grads):
        for i in range(len(W)):
            for j in range(len(W[0])):
                W[i][j] -= eta * dW[i][j]
        for j in range(len(b)):
            b[j] -= eta * db[j]
    if step in (1, 50, 200, 800):
        Z, _ = forward(params, X)
        acc = sum((z[1] > z[0]) == t for z, t in zip(Z, y)) / len(y)
        print(f"step {step:4d}  loss {loss:.4f}  train accuracy {acc:.3f}")
```

```text
layer 0 W[0][3]  analytic -0.01591598  numeric -0.01591598  rel. error 1.8e-10
layer 1 W[5][2]  analytic  0.02492981  numeric  0.02492981  rel. error 2.1e-10
layer 2 W[7][1]  analytic  0.15918732  numeric  0.15918732  rel. error 2.1e-11
step    1  loss 0.7172  train accuracy 0.550
step   50  loss 0.1294  train accuracy 1.000
step  200  loss 0.0209  train accuracy 1.000
step  800  loss 0.0029  train accuracy 1.000
```

The printed loss is the one measured before each step's update, and the accuracy after it. At step 1 the loss is close to $\ln2 = 0.693$, the cross-entropy of a two-class model that knows nothing — a first sanity check that [[neural-networks/training-practice]] makes a habit. No linear classifier can separate a disc from a ring around it; the hidden layers learn a feature (roughly, the distance from the centre) that makes the problem linear. Note the structure of `loss_and_grads`: the forward pass caches `(H, A)` for every layer, and the backward loop consumes the cache in reverse — the memory cost of [[#sec-memory]] made visible.

## A catalogue of backward rules {#sec-rules}

A deep-learning library is, to a large extent, a list of operations each paired with its backward rule: given the adjoint of the output, return the adjoints of the inputs. Once these rules are written and tested, any network built from them can be differentiated by [[#alg-backprop]]. The rules for the operations met so far, for a single example (row vectors in a batch behave the same way, row by row):

| operation | forward | backward (given $\bar{\mathbf{y}}$) |
|---|---|---|
| addition | $\mathbf{y} = \mathbf{u} + \mathbf{v}$ | $\bar{\mathbf{u}} = \bar{\mathbf{y}}$, $\bar{\mathbf{v}} = \bar{\mathbf{y}}$ |
| elementwise product | $\mathbf{y} = \mathbf{u}\odot\mathbf{v}$ | $\bar{\mathbf{u}} = \bar{\mathbf{y}}\odot\mathbf{v}$, $\bar{\mathbf{v}} = \bar{\mathbf{y}}\odot\mathbf{u}$ |
| linear map | $\mathbf{y} = W\mathbf{x}$ | $\bar{\mathbf{x}} = W^\top\bar{\mathbf{y}}$, $\bar W = \bar{\mathbf{y}}\mathbf{x}^\top$ |
| activation | $y_i = \phi(x_i)$ | $\bar x_i = \bar y_i\,\phi'(x_i)$ |
| sum | $y = \sum_ix_i$ | $\bar x_i = \bar y$ for all $i$ |
| copy (broadcast) | $y_i = x$ for all $i$ | $\bar x = \sum_i\bar y_i$ |
| maximum | $y = \max_ix_i$ | $\bar x_{i^*} = \bar y$ at the arg-max $i^*$, $0$ elsewhere |
| softmax | $\mathbf{s} = \operatorname{softmax}(\mathbf{z})$ | $\bar{\mathbf{z}} = \mathbf{s}\odot\big(\bar{\mathbf{s}} - (\bar{\mathbf{s}}^\top\mathbf{s})\mathbf{1}\big)$ |
| embedding lookup | $\mathbf{y} = E_{t,:}$ | $\bar E_{t,:}\mathrel{+}=\bar{\mathbf{y}}$, other rows unchanged |

Two pairs in the table are **duals**: sum and copy, and the two halves of a linear map. Whatever the forward pass gathers, the backward pass scatters, and vice versa — a reflection of the fact that the backward rule of a linear operation is multiplication by its transpose. The maximum routes the gradient only to the winning input, which is how max pooling ([[neural-networks/convolutional-networks]]) and ReLU ($\max(0, x)$) behave. The embedding rule shows why the gradient of an embedding table is sparse: only the rows of tokens present in the batch receive updates ([[ml-fundamentals/representations#prop-embedding]]).

::: proposition The backward rule of the softmax {#prop-softmax-vjp}
For $\mathbf{s} = \operatorname{softmax}(\mathbf{z})\in\R^K$ and any upstream adjoint $\bar{\mathbf{s}}$, the adjoint of the logits is $\bar{\mathbf{z}} = \mathbf{s}\odot(\bar{\mathbf{s}} - c\mathbf{1})$ with $c = \bar{\mathbf{s}}^\top\mathbf{s}$. It costs $O(K)$ operations, although the Jacobian has $K^2$ entries, and its components sum to zero.
:::

::: proof
$\partial s_i/\partial z_j = s_i([i = j] - s_j)$, so the Jacobian is $J = \operatorname{diag}(\mathbf{s}) - \mathbf{s}\mathbf{s}^\top$, which is symmetric. Hence $\bar{\mathbf{z}} = J^\top\bar{\mathbf{s}} = \mathbf{s}\odot\bar{\mathbf{s}} - \mathbf{s}(\mathbf{s}^\top\bar{\mathbf{s}})$, which is the formula. Computing $c$ and then the elementwise expression takes $O(K)$ operations. Finally $\sum_i\bar z_i = \sum_is_i\bar s_i - c\sum_is_i = c - c = 0$.
:::

The softmax's outputs are unchanged when a constant is added to every logit, so its gradient must be orthogonal to $\mathbf{1}$ — the zero sum. Combining this rule with the backward rule of $-\log s_y$, which is $\bar{\mathbf{s}} = -\mathbf{e}_y/s_y$, gives $c = -1$ and $\bar{\mathbf{z}} = \mathbf{s} - \mathbf{e}_y$, the familiar cross-entropy gradient. Libraries fuse the two into one operation, both for speed and because the separate computation of $\log s_y$ loses accuracy when $s_y$ is tiny.

::: example A softmax backward pass {#ex-softmax-vjp}
For logits $\mathbf{z} = (1, 2, 0.5)$, compute the gradient of the first probability $s_1$ with respect to the logits using [[#prop-softmax-vjp]].
::: solution
$e^{\mathbf{z}} = (2.718, 7.389, 1.649)$, total $11.756$, so $\mathbf{s} = (0.2312, 0.6285, 0.1402)$. The output of interest is $s_1$, so $\bar{\mathbf{s}} = (1, 0, 0)$ and $c = \bar{\mathbf{s}}^\top\mathbf{s} = 0.2312$. Then $\bar{\mathbf{z}} = \mathbf{s}\odot(\bar{\mathbf{s}} - c\mathbf{1}) = (0.2312\cdot0.7688,\ 0.6285\cdot(-0.2312),\ 0.1402\cdot(-0.2312)) = (0.1778, -0.1453, -0.0324)$. The components sum to zero, and central differences give the same three numbers to six decimal places. Raising $z_1$ increases $s_1$; raising either other logit decreases it, more strongly for the larger competitor.
:::
:::

::: intuition Credit assignment
Backpropagation answers the **credit-assignment** question: which of the millions of weights is responsible, and by how much, for the error on this example? The answer propagates backwards along exactly the paths by which each weight influenced the output, each path weighted by the product of the local sensitivities along it. Until backpropagation became widely known in the mid-1980s, the lack of a practical answer to this question for *hidden* units — whose desired outputs nobody specifies — was the main obstacle to training multilayer networks.
:::

## Checking gradients {#sec-gradcheck}

A backward pass with a bug often still trains, just worse, so errors can go unnoticed for a long time. The standard test compares the analytic gradient with a numerical one, as above.

::: proposition Accuracy of finite differences {#prop-fd}
Let $f$ be three times continuously differentiable near $x$. The forward difference and the central difference satisfy

$$
\frac{f(x + \varepsilon) - f(x)}{\varepsilon} = f'(x) + \frac\varepsilon2f''(x) + O(\varepsilon^2),\qquad\frac{f(x + \varepsilon) - f(x - \varepsilon)}{2\varepsilon} = f'(x) + \frac{\varepsilon^2}{6}f'''(x) + O(\varepsilon^3).
$$

If each evaluation of $f$ carries a rounding error of at most $\delta\lvert f\rvert$, the central difference has total error about $\frac{\varepsilon^2}{6}\lvert f'''\rvert + \frac{\delta\lvert f\rvert}{\varepsilon}$, minimised at $\varepsilon\approx(3\delta\lvert f\rvert/\lvert f'''\rvert)^{1/3}$.
:::

::: proof
By Taylor's theorem $f(x\pm\varepsilon) = f(x)\pm\varepsilon f'(x) + \frac{\varepsilon^2}2f''(x)\pm\frac{\varepsilon^3}6f'''(x) + O(\varepsilon^4)$. Subtracting $f(x)$ and dividing by $\varepsilon$ gives the first expansion. Subtracting the two expansions cancels the even powers: $f(x + \varepsilon) - f(x - \varepsilon) = 2\varepsilon f'(x) + \frac{\varepsilon^3}3f'''(x) + O(\varepsilon^5)$, and dividing by $2\varepsilon$ gives the second. The two rounding errors, each at most $\delta\lvert f\rvert$, contribute at most $2\delta\lvert f\rvert/(2\varepsilon)$. Setting the derivative of $\frac{\varepsilon^2}6\lvert f'''\rvert + \delta\lvert f\rvert/\varepsilon$ to zero gives $\frac\varepsilon3\lvert f'''\rvert = \delta\lvert f\rvert/\varepsilon^2$, the stated optimum.
:::

In 64-bit arithmetic $\delta\approx1.1\times10^{-16}$, so for well-scaled functions the best step for central differences is around $10^{-5}$ to $10^{-6}$, with an error of about $10^{-10}$ to $10^{-11}$ — the relative errors seen in the listing. The figure plots the two error terms on a logarithmic scale.

::: widget plot
f: log10(10^(2*x)/6 + 1.1e-16*10^(-x)); log10(10^x/2 + 2.2e-16*10^(-x))
x: -14, 0
y: -12, 1
labels: central difference; forward difference
caption: $\log_{10}$ of the error bound against $\log_{10}\varepsilon$ for a function with $\lvert f\rvert = \lvert f''\rvert = \lvert f'''\rvert = 1$ in double precision. For large $\varepsilon$ the truncation error dominates (slope $2$ for central, $1$ for forward differences); for small $\varepsilon$ the rounding error $\delta/\varepsilon$ takes over. The central difference reaches a few times $10^{-11}$ near $\varepsilon = 10^{-5}$; the forward difference only about $10^{-8}$ near $10^{-8}$.
:::

In practice: use central differences, compute in 64-bit floats, check a random subset of parameters in every layer, and look at the **relative error** $\lvert g_{\text{num}} - g_{\text{ana}}\rvert/\max(\lvert g_{\text{num}}\rvert, \lvert g_{\text{ana}}\rvert)$, since absolute errors depend on the gradient's scale. Values around $10^{-7}$ or smaller indicate a correct implementation; $10^{-2}$ indicates a bug. Three traps catch everyone: kinks (a ReLU whose input lies within $\varepsilon$ of $0$ gives a meaningless numerical derivative); randomness (dropout masks or data augmentation must be fixed between the two evaluations); and low precision (in 32-bit floats $\delta\approx6\times10^{-8}$ and the best attainable error is only about $10^{-5}$).

::: example A gradient check by hand {#ex-gradcheck}
Check the derivative of $f(w) = \ln(1 + e^{w})$ at $w = 0$ using a central difference with $\varepsilon = 0.1$, and predict the error from [[#prop-fd]].
::: solution
$f'(w) = \sigma(w)$, so the exact value is $\sigma(0) = 0.5$. Numerically, $f(0.1) = \ln(1 + e^{0.1}) = \ln2.105171 = 0.744397$ and $f(-0.1) = \ln1.904837 = 0.644397$, so the central difference is $(0.744397 - 0.644397)/0.2 = 0.500000$. The predicted error is $\frac{\varepsilon^2}6f'''(0)$ with $f''' = \sigma'' = \sigma(1 - \sigma)(1 - 2\sigma)$, which is $0$ at $w = 0$: the leading error term vanishes by symmetry, and the actual error is of order $\varepsilon^4$, about $10^{-6}$ here. At $w = 1$, where $f''' = 0.197\cdot(1 - 1.462) = -0.091$, the same step would give an error of about $0.01\cdot0.091/6 = 1.5\times10^{-4}$.
:::
:::

::: history
The chain rule is Leibniz's (1676), but organising it backwards through a computation is a twentieth-century idea discovered several times. In optimal control, Henry Kelley (1960) and Arthur Bryson (1961) computed gradients of trajectories by backward recursions — the adjoint method. Seppo Linnainmaa's 1970 master's thesis at the University of Helsinki described **reverse-mode automatic differentiation** for arbitrary programs of elementary operations, with an implementation, in the context of estimating accumulated rounding errors. Paul Werbos proposed applying it to neural networks in his 1974 Harvard PhD thesis and published the application in 1982; David Parker (1985) and Yann LeCun (1985) also rediscovered it. The paper that made it widely known, David Rumelhart, Geoffrey Hinton and Ronald Williams's "Learning representations by back-propagating errors" (*Nature*, 1986), showed experimentally that hidden units trained this way discover useful features — for example, encoding family relationships — and gave the method its name in neural-network research.
:::

::: summary
- A **computation graph** lists elementary operations in topological order; the **forward pass** evaluates them and stores their values.
- The **adjoint** $\bar v_i = \partial\mathcal{L}/\partial v_i$ satisfies $\bar v_i = \sum_{\text{children } j}\bar v_j\,\partial\psi_j/\partial v_i$; computing adjoints in reverse topological order is **backpropagation**. Values used several times receive the sum of their contributions.
- For an MLP on a batch: $\Delta_L = (P - Y)/B$, $\partial\mathcal{L}/\partial W_\ell = H_{\ell-1}^\top\Delta_\ell$, $\Delta_{\ell-1} = (\Delta_\ell W_\ell^\top)\odot\phi'(A_{\ell-1})$.
- **Cost**: the backward pass takes about twice the FLOPs of the forward pass, so a training step costs about $6BN$ FLOPs for $N$ weights — the origin of the $6ND$ rule. **Memory**: all activations needed by the backward pass are stored, and grow with batch size and depth.
- **Gradient checking** with central differences (error $O(\varepsilon^2)$, best $\varepsilon\approx10^{-5}$ in double precision) and relative errors catches backward-pass bugs; beware kinks, randomness and low precision.
:::

## Exercises

::: exercise A sum node and a product node {level=1 check="4"}
For $\mathcal{L} = (x + y)\cdot z$ at $x = 1$, $y = 3$, $z = -1$, compute $\bar x$, $\bar y$ and $\bar z$. Enter $\bar z$.
::: solution
Let $s = x + y = 4$, so $\mathcal{L} = sz = -4$. Backwards: $\bar s = z = -1$ and $\bar z = s = 4$; then $\bar x = \bar y = \bar s = -1$. So $(\bar x, \bar y, \bar z) = (-1, -1, 4)$. An addition node copies its adjoint to each input; a multiplication node sends each input the adjoint times the *other* input.
:::
:::

::: exercise FLOPs of a step {level=1 check="1351680"}
An MLP has widths $100, 64, 10$. Using [[#prop-flops]] and ignoring biases, how many FLOPs does a training step on a batch of $32$ take? What are the shapes of $\Delta_2$, $\partial\mathcal{L}/\partial W_1$ and $\Delta_1$?
::: solution
$N_W = 100\cdot64 + 64\cdot10 = 7{,}040$, so $6BN_W = 6\cdot32\cdot7{,}040 = 1{,}351{,}680$ FLOPs. In the row convention of [[#thm-mlp-backprop]], $\Delta_2$ is $(32, 10)$, $\partial\mathcal{L}/\partial W_1 = H_0^\top\Delta_1$ is $(100, 64)$ like $W_1$, and $\Delta_1$ is $(32, 64)$ like $A_1$.
:::
:::

::: exercise Derivatives from outputs {level=1}
Show that the derivatives of the sigmoid, tanh and ReLU can each be computed from the unit's *output* $h = \phi(a)$ alone. Why is this convenient for the backward pass?
::: solution
$\sigma'(a) = \sigma(a)(1 - \sigma(a)) = h(1 - h)$; $\tanh'(a) = 1 - \tanh^2a = 1 - h^2$; $\operatorname{ReLU}'(a) = [a > 0] = [h > 0]$. The backward pass needs $H_{\ell-1}$ anyway for the weight gradient $H_{\ell-1}^\top\Delta_\ell$, so for these activations there is no need to store the pre-activations $A_{\ell-1}$ as well, halving the activation memory of [[#sec-memory]]. (The listing in [[#sec-code]] uses exactly this: `1 - h * h`.) GELU and SiLU do not have this property and need their inputs.
:::
:::

::: exercise A shared intermediate value {level=2 check="2*(cos(1)+1)"}
Compute $d\mathcal{L}/dx$ at $x = 1$ for $\mathcal{L} = \sin(x^2) + x^2$ by backpropagation through the graph $u = x^2$, $\mathcal{L} = \sin u + u$.
::: solution
The node $u$ has two uses, so by the fan-out rule $\bar u = \cos u + 1$. Then $\bar x = \bar u\cdot2x = 2x(\cos x^2 + 1)$, which at $x = 1$ is $2(\cos1 + 1)\approx3.081$. Direct differentiation gives the same $2x\cos x^2 + 2x$.
:::
:::

::: exercise Backpropagating through a residual block {level=2}
A residual block computes $\mathbf{y} = \mathbf{x} + W_2\operatorname{ReLU}(W_1\mathbf{x})$ for a single input (column vectors). Given $\bar{\mathbf{y}} = \partial\mathcal{L}/\partial\mathbf{y}$, write $\bar W_2$, $\bar W_1$ and $\bar{\mathbf{x}}$.
::: solution
Let $\mathbf{a} = W_1\mathbf{x}$ and $\mathbf{h} = \operatorname{ReLU}(\mathbf{a})$. The output is a sum of $\mathbf{x}$ and $W_2\mathbf{h}$, so both receive $\bar{\mathbf{y}}$. Then $\bar W_2 = \bar{\mathbf{y}}\mathbf{h}^\top$, $\bar{\mathbf{h}} = W_2^\top\bar{\mathbf{y}}$, $\bar{\mathbf{a}} = \bar{\mathbf{h}}\odot[\mathbf{a} > 0]$, $\bar W_1 = \bar{\mathbf{a}}\mathbf{x}^\top$. The input $\mathbf{x}$ is used twice (the skip and $W_1\mathbf{x}$), so $\bar{\mathbf{x}} = \bar{\mathbf{y}} + W_1^\top\bar{\mathbf{a}}$. The first term passes the gradient through unchanged — the identity path that [[neural-networks/initialisation-normalisation]] uses to explain why residual networks train.
:::
:::

::: exercise Activation memory {level=2 check="50331648"}
An MLP has $24$ hidden layers of width $1{,}024$. For a batch of $256$ examples, stored in 32-bit floats, how many bytes do the pre-activations and activations $A_\ell, H_\ell$ of the hidden layers occupy?
::: solution
$2$ matrices per layer of $256\times1{,}024$ entries, $24$ layers, $4$ bytes each: $2\cdot24\cdot256\cdot1{,}024\cdot4 = 50{,}331{,}648$ bytes, about $50$ MB. The weights of the $23$ hidden-to-hidden layers alone take $23\cdot1{,}024^2\cdot4\approx96$ MB, so here activations are about half the parameter memory; they grow linearly with the batch, the parameters do not. Storing only $H_\ell$ (exercise 3) halves the activation memory.
:::
:::

::: exercise The best step in single precision {level=2 check="(1.8e-7)^(1/3)"}
In 32-bit floating point the relative rounding error is about $\delta = 6\times10^{-8}$. For a function with $\lvert f\rvert = \lvert f'''\rvert = 1$, what central-difference step minimises the error bound of [[#prop-fd]], and roughly what error does it give?
::: solution
$\varepsilon^* = (3\delta)^{1/3} = (1.8\times10^{-7})^{1/3}\approx5.6\times10^{-3}$. The error is $\varepsilon^2/6 + \delta/\varepsilon\approx5.3\times10^{-6} + 1.1\times10^{-5}\approx1.6\times10^{-5}$. So gradient checks in single precision can only confirm about four or five digits; do them in double precision.
:::
:::

::: exercise The backward pass of a matrix product {level=3}
Let $C = AB$ with $A\in\R^{m\times k}$, $B\in\R^{k\times n}$, and let $\bar C = \partial\mathcal{L}/\partial C$. Prove that $\bar A = \bar CB^\top$ and $\bar B = A^\top\bar C$, and show that computing both costs twice the FLOPs of computing $C$.
::: solution
$C_{ij} = \sum_lA_{il}B_{lj}$, so $A_{il}$ affects $C_{ij}$ for every $j$ with coefficient $B_{lj}$. By [[#eq-adjoint]], $\bar A_{il} = \sum_j\bar C_{ij}B_{lj} = (\bar CB^\top)_{il}$. Similarly $B_{lj}$ affects $C_{ij}$ for every $i$ with coefficient $A_{il}$, so $\bar B_{lj} = \sum_iA_{il}\bar C_{ij} = (A^\top\bar C)_{lj}$. The shapes are right: $(m\times n)(n\times k) = m\times k$ and $(k\times m)(m\times n) = k\times n$. Computing $C$ costs $2mkn$ FLOPs; $\bar CB^\top$ costs $2mnk$ and $A^\top\bar C$ costs $2kmn$, so the backward pass costs $4mkn$, twice the forward pass — the per-layer statement behind [[#prop-flops]].
:::
:::

::: exercise Why not finite differences? {level=3 check="(10^6+1)/3"}
A network has $N = 10^6$ weights and its forward pass costs $2BN$ FLOPs. Estimating the gradient by forward differences takes $N + 1$ forward passes. By what factor is this more expensive than backpropagation's $6BN$? Comment on accuracy as well as cost.
::: solution
$(N + 1)\cdot2BN/(6BN) = (N + 1)/3 = (10^6 + 1)/3\approx333{,}334$. Finite differences are also less accurate: by [[#prop-fd]] a forward difference in double precision has error around $10^{-8}$ at best, while backpropagation computes the gradient exactly up to rounding in the operations themselves. This is why numerical differentiation is used only to *check* gradients on a few entries.
:::
:::

::: exercise Gradients through a chain of sigmoids {level=3 check="0.25^10"}
Consider the scalar chain $h_\ell = \sigma(w_\ell h_{\ell-1})$, $\ell = 1, \dots, L$, with all $\lvert w_\ell\rvert\le1$. Show that $\lvert\partial h_L/\partial h_0\rvert\le4^{-L}$. Evaluate the bound for $L = 10$, and explain what it implies for the gradient reaching the first layer's weight.
::: solution
By the chain rule $\partial h_L/\partial h_0 = \prod_{\ell=1}^L\sigma'(w_\ell h_{\ell-1})\,w_\ell$. Each factor has $\lvert\sigma'\rvert\le\frac14$ and $\lvert w_\ell\rvert\le1$, so the product is at most $4^{-L}$ in absolute value. For $L = 10$ this is $0.25^{10}\approx9.5\times10^{-7}$. The gradient with respect to $w_1$ is $\bar h_1\cdot\sigma'(w_1h_0)h_0$, and $\bar h_1$ contains the product of the remaining $L - 1$ factors, so the first layer learns about a million times more slowly than the last: the **vanishing gradient problem**. Larger weights can counteract the factor $\frac14$, but then the units saturate and $\sigma'$ becomes even smaller. [[neural-networks/initialisation-normalisation]] treats the general case.
:::
:::
