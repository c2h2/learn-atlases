Nobody who trains a neural network today writes its backward pass by hand. They write the forward computation — in PyTorch, JAX or another framework — and call a function that returns the gradient. The machinery behind that call is **automatic differentiation** (AD): a family of techniques that differentiate a *program*, operation by operation, exactly up to floating-point rounding, at a cost proportional to running the program. Backpropagation ([[neural-networks/backpropagation]]) is one instance, reverse-mode AD applied to a network. This chapter presents both modes of AD, proves what each costs, builds a working reverse-mode autograd engine in about forty lines of Python, and explains how the large frameworks organise the same ideas around tensors, together with the extensions that matter in practice: higher derivatives, memory-saving checkpointing and custom gradients.

## Three ways to compute a derivative {#sec-three-ways}

Suppose a program computes $f\colon\R^n\to\R^m$. There are three broad ways to obtain its derivatives.

- **Numerical differentiation** evaluates $f$ at perturbed inputs and takes finite differences. It needs no knowledge of the program, but it is approximate (truncation and rounding errors, [[neural-networks/backpropagation#prop-fd]]) and needs one or two evaluations per input direction — useless for a million parameters except as a check.
- **Symbolic differentiation** manipulates the formula, as a computer algebra system does, and returns a formula for the derivative. It is exact, but formulas for derivatives of nested expressions can grow far larger than the original ("expression swell": the derivative of a product of $k$ factors has $k$ terms each with $k$ factors), and it does not apply directly to programs with loops, branches and assignments.
- **Automatic differentiation** works on the sequence of elementary operations the program actually executes. It applies the chain rule numerically at each step, carrying derivative *values* rather than derivative *formulas*. It is exact up to rounding, handles any control flow the program uses, and has bounded cost.

AD rests on one observation: however complicated the program, its execution on a particular input is a straight-line sequence of elementary operations.

::: definition Evaluation trace {#def-trace}
The **evaluation trace** (or Wengert list) of a program on input $\mathbf{x} = (x_1, \dots, x_n)$ is the sequence of intermediate variables $v_{1-n}, \dots, v_0, v_1, \dots, v_N$ with $v_{i-n} = x_i$ for the inputs and

$$
v_j = \psi_j\big(v_k : k\in\operatorname{pa}(j)\big),\qquad j = 1, \dots, N,
$$

where each $\psi_j$ is an elementary operation with known partial derivatives and every parent index is smaller than $j$. The outputs are some of the $v_j$. Loops are unrolled and only the branch actually taken appears.
:::

The trace is a computation graph ([[neural-networks/backpropagation#def-graph]]) produced by running the program. Our running example, from the survey by Baydin, Pearlmutter, Radul and Siskind (2018), is $f(x_1, x_2) = \ln x_1 + x_1x_2 - \sin x_2$ at $(x_1, x_2) = (2, 5)$:

| variable | operation | value |
|---|---|---|
| $v_{-1}$ | $x_1$ | $2$ |
| $v_0$ | $x_2$ | $5$ |
| $v_1$ | $\ln v_{-1}$ | $0.6931$ |
| $v_2$ | $v_{-1}\times v_0$ | $10$ |
| $v_3$ | $\sin v_0$ | $-0.9589$ |
| $v_4$ | $v_1 + v_2$ | $10.6931$ |
| $v_5$ | $v_4 - v_3$ | $11.6521$ |

::: widget graph
nodes: x1@0,2; x2@0,-2; v1@3,3; v2@3,0; v3@3,-3; v4@6,1.5; v5@9,0
edges: x1>v1; x1>v2; x2>v2; x2>v3; v1>v4; v2>v4; v4>v5; v3>v5
algorithm: topo
start: x1
caption: The evaluation trace of $f(x_1, x_2) = \ln x_1 + x_1x_2 - \sin x_2$ as a graph. Forward mode pushes derivatives along the arrows in topological order, together with the values; reverse mode first runs the values forward, then pulls adjoints back against the arrows. Both inputs fan out to two operations.
:::

## Forward mode {#sec-forward}

Forward mode attaches to every intermediate variable its derivative along a chosen input direction $\dot{\mathbf{x}}\in\R^n$, the **tangent** $\dot v_j = \nabla v_j\cdot\dot{\mathbf{x}}$, and computes it alongside the value by the chain rule:

$$
\dot v_j = \sum_{k\in\operatorname{pa}(j)}\frac{\partial\psi_j}{\partial v_k}\,\dot v_k .
$$

Starting from $\dot{\mathbf{x}}$, one forward pass produces $\dot{\mathbf{y}} = J_f(\mathbf{x})\,\dot{\mathbf{x}}$, a **Jacobian–vector product** (JVP). An elegant way to implement it uses a number system in which the chain rule is built into arithmetic.

::: definition Dual numbers {#def-dual}
A **dual number** is a formal expression $a + b\epsilon$ with $a, b\in\R$ and a symbol $\epsilon$ satisfying $\epsilon^2 = 0$ (but $\epsilon\ne0$). They add and multiply by the usual rules:

$$
(a + b\epsilon) + (c + d\epsilon) = (a + c) + (b + d)\epsilon,\qquad(a + b\epsilon)(c + d\epsilon) = ac + (ad + bc)\epsilon .
$$

A differentiable elementary function $\psi$ is extended to dual numbers by $\psi(a + b\epsilon) = \psi(a) + \psi'(a)\,b\,\epsilon$.
:::

::: proposition Dual numbers compute derivatives {#prop-dual}
Let a program compute $f\colon\R\to\R$ from $+$, $\times$ and differentiable elementary functions extended as in [[#def-dual]]. Running the program on the dual number $x + 1\epsilon$ returns $f(x) + f'(x)\epsilon$. More generally, running a program for $f\colon\R^n\to\R^m$ on inputs $x_i + \dot x_i\epsilon$ returns $f(\mathbf{x}) + \big(J_f(\mathbf{x})\dot{\mathbf{x}}\big)\epsilon$.
:::

::: proof
We show by induction along the trace that every intermediate variable equals $v_j + \dot v_j\epsilon$, where $v_j$ is its ordinary value and $\dot v_j$ the derivative of $v_j$ along $\dot{\mathbf{x}}$. For the inputs this holds by construction. For a sum, $(u + \dot u\epsilon) + (w + \dot w\epsilon) = (u + w) + (\dot u + \dot w)\epsilon$, and $\dot u + \dot w$ is the derivative of $u + w$. For a product, $(u + \dot u\epsilon)(w + \dot w\epsilon) = uw + (u\dot w + \dot uw)\epsilon + \dot u\dot w\epsilon^2 = uw + (u\dot w + \dot uw)\epsilon$, the product rule; this is where $\epsilon^2 = 0$ is used. For an elementary function, $\psi(u + \dot u\epsilon) = \psi(u) + \psi'(u)\dot u\epsilon$, and $\psi'(u)\dot u$ is the derivative of $\psi(u)$ by the one-variable chain rule. Each step preserves the claim, so it holds for the outputs, whose $\epsilon$ parts are the directional derivatives $J_f\dot{\mathbf{x}}$.
:::

::: example Forward mode on the trace {#ex-forward}
Compute $\partial f/\partial x_1$ at $(2, 5)$ for the running example by forward mode.
::: solution
Seed $\dot x_1 = 1$, $\dot x_2 = 0$, and carry tangents along the trace: $\dot v_1 = \dot v_{-1}/v_{-1} = 0.5$; $\dot v_2 = \dot v_{-1}v_0 + v_{-1}\dot v_0 = 5$; $\dot v_3 = \cos(v_0)\dot v_0 = 0$; $\dot v_4 = \dot v_1 + \dot v_2 = 5.5$; $\dot v_5 = \dot v_4 - \dot v_3 = 5.5$. So $\partial f/\partial x_1 = 5.5$, which matches $1/x_1 + x_2$. A second forward pass with seed $(0, 1)$ gives $\partial f/\partial x_2 = x_1 - \cos x_2 = 2 - 0.2837 = 1.7163$. Each pass gives one *column* of the Jacobian — here a $1\times2$ matrix, so two passes give the whole gradient.
:::
:::

Forward mode needs no extra memory beyond one tangent per live variable, and it is the natural mode for functions with few inputs and many outputs: the sensitivity of a whole simulation trajectory to one physical parameter, say. For a loss with $n$ parameters it needs $n$ passes to assemble the gradient, which rules it out for training.

## Reverse mode {#sec-reverse}

Reverse mode runs the program forward once, recording the trace and the values (on a **tape**), and then sweeps backwards, computing the **adjoints** $\bar v_j = \partial y/\partial v_j$ of a chosen output $y$ by [[neural-networks/backpropagation#eq-adjoint]]. Seeding the output adjoint with a vector $\bar{\mathbf{y}}\in\R^m$ rather than $1$ gives $\bar{\mathbf{x}} = J_f(\mathbf{x})^\top\bar{\mathbf{y}}$, a **vector–Jacobian product** (VJP): one *row* combination of the Jacobian per pass.

::: example Reverse mode on the trace {#ex-reverse}
Compute both partial derivatives of the running example by one reverse sweep.
::: solution
After the forward pass, set $\bar v_5 = 1$ and visit the trace backwards. $v_5 = v_4 - v_3$: $\bar v_4 = 1$, $\bar v_3 = -1$. $v_4 = v_1 + v_2$: $\bar v_1 = 1$, $\bar v_2 = 1$. $v_3 = \sin v_0$: $\bar v_0\mathrel{+}=\bar v_3\cos v_0 = -0.2837$. $v_2 = v_{-1}v_0$: $\bar v_{-1}\mathrel{+}=\bar v_2v_0 = 5$ and $\bar v_0\mathrel{+}=\bar v_2v_{-1} = 2$. $v_1 = \ln v_{-1}$: $\bar v_{-1}\mathrel{+}=\bar v_1/v_{-1} = 0.5$. Totals: $\bar x_1 = \bar v_{-1} = 5.5$ and $\bar x_2 = \bar v_0 = 2 - 0.2837 = 1.7163$. One sweep produced the whole gradient; each input's adjoint accumulated one contribution per use.
:::
:::

The two modes compute the same numbers in different orders. Their costs differ sharply with the shape of the Jacobian.

::: theorem The cost of forward and reverse mode {#thm-modes}
Let a program compute $f\colon\R^n\to\R^m$ with $C$ elementary operations. Then, with constants that depend only on the set of elementary operations (and are small — about $2$ to $4$ in practice):

1. one forward-mode pass computes a JVP $J\dot{\mathbf{x}}$ in $O(C)$ operations and $O(1)$ extra memory per live variable, so the full Jacobian costs $O(nC)$;
2. one reverse-mode pass computes a VJP $J^\top\bar{\mathbf{y}}$ in $O(C)$ operations but needs memory for the values on the tape, up to $O(C)$, so the full Jacobian costs $O(mC)$.

In particular the gradient of a scalar function ($m = 1$) costs $O(C)$ by reverse mode, independently of $n$.
:::

::: proof
Each elementary operation $v_j = \psi_j(\cdot)$ with $q_j$ arguments contributes, in forward mode, the computation of its $q_j$ partial derivatives and a sum of $q_j$ products — a bounded multiple of the cost of $\psi_j$ itself, since the partial derivatives of the elementary operations ($+$, $\times$, $\exp$, $\sin$, …) are themselves elementary and evaluated at the same point. Summing over the trace gives $O(C)$ per pass. Choosing $\dot{\mathbf{x}}$ as each of the $n$ unit vectors in turn gives the $n$ columns of $J$. In reverse mode each operation is visited once more in the backward sweep, where it adds $\bar v_j\,\partial\psi_j/\partial v_k$ to each parent's adjoint — again a bounded multiple of its cost — so a VJP costs $O(C)$; seeding $\bar{\mathbf{y}}$ with the $m$ unit vectors gives the $m$ rows. The backward sweep evaluates $\partial\psi_j/\partial v_k$ at the forward values, which must therefore have been stored (or be recomputed): that is the memory cost.
:::

So the shape of $J$ decides. For training, $f$ is a loss — $n$ is the number of parameters, $m = 1$ — and reverse mode wins by a factor of $n$. For $n\ll m$ forward mode wins. For square Jacobians, or for structured problems, mixtures of the two are used.

::: quiz
A function maps a $3$-dimensional input to a $1{,}000$-dimensional output, and you need its full Jacobian. Which mode is cheaper, and how many passes does it need?
- [x] Forward mode, $3$ passes
- [ ] Reverse mode, $1$ pass
- [ ] Reverse mode, $3$ passes
- [ ] Forward mode, $1{,}000$ passes
::: solution
Forward mode gives one column of the $1{,}000\times3$ Jacobian per pass, so $3$ passes. Reverse mode gives one row per pass and would need $1{,}000$. Reverse mode is the right choice only when there are few outputs — above all, a single scalar loss.
:::
:::

## A tiny autograd engine {#sec-engine}

Reverse mode needs three things: nodes that remember their parents and local derivatives, a topological order of the graph, and a backward sweep. The class below provides them for scalars, in the style of Andrej Karpathy's *micrograd* (2020). Every arithmetic operation on `Value` objects creates a new node — the graph is built *while the program runs*, which is called **define-by-run** — and `backward()` performs [[neural-networks/backpropagation#alg-backprop]].

```python
import math, random

class Value:
    """A scalar node of a computation graph that records how it was made."""
    def __init__(self, data, parents=(), local_grads=()):
        self.data = data                  # forward value
        self.grad = 0.0                   # adjoint dL/d(self), filled by backward()
        self.parents = parents            # nodes this one was computed from
        self.local_grads = local_grads    # d(self)/d(parent) for each parent

    # each operation returns a new node and stores its local derivatives
    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        return Value(self.data + other.data, (self, other), (1.0, 1.0))
    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        return Value(self.data * other.data, (self, other), (other.data, self.data))
    def __pow__(self, k):                 # k a plain number
        return Value(self.data ** k, (self,), (k * self.data ** (k - 1),))
    def __neg__(self):        return self * -1.0
    def __sub__(self, other): return self + (-other)
    def __radd__(self, other): return self + other
    def __rmul__(self, other): return self * other
    def __truediv__(self, other): return self * other ** -1.0
    def exp(self):
        e = math.exp(self.data); return Value(e, (self,), (e,))
    def log(self):
        return Value(math.log(self.data), (self,), (1.0 / self.data,))
    def sin(self):
        return Value(math.sin(self.data), (self,), (math.cos(self.data),))
    def tanh(self):
        t = math.tanh(self.data); return Value(t, (self,), (1 - t * t,))

    def backward(self):
        """Reverse-mode sweep: topological order, then adjoints in reverse."""
        order, seen = [], set()
        def visit(v):                     # depth-first search, parents first
            if id(v) not in seen:
                seen.add(id(v))
                for p in v.parents:
                    visit(p)
                order.append(v)
        visit(self)
        self.grad = 1.0
        for v in reversed(order):         # push each adjoint to the parents
            for p, g in zip(v.parents, v.local_grads):
                p.grad += v.grad * g

# 1. the example of Baydin et al.: f(x1, x2) = ln x1 + x1 x2 - sin x2 at (2, 5)
x1, x2 = Value(2.0), Value(5.0)
f = x1.log() + x1 * x2 - x2.sin()
f.backward()
print(f"f = {f.data:.4f}   df/dx1 = {x1.grad:.4f}   df/dx2 = {x2.grad:.4f}")

# 2. forward mode with dual numbers a + b*eps, eps^2 = 0
class Dual:
    def __init__(self, a, b=0.0): self.a, self.b = a, b
    def __add__(s, o): o = o if isinstance(o, Dual) else Dual(o); return Dual(s.a + o.a, s.b + o.b)
    def __sub__(s, o): o = o if isinstance(o, Dual) else Dual(o); return Dual(s.a - o.a, s.b - o.b)
    def __mul__(s, o): o = o if isinstance(o, Dual) else Dual(o); return Dual(s.a * o.a, s.a * o.b + s.b * o.a)
def dlog(d): return Dual(math.log(d.a), d.b / d.a)
def dsin(d): return Dual(math.sin(d.a), math.cos(d.a) * d.b)
for seed in [(1.0, 0.0), (0.0, 1.0)]:         # one forward pass per input direction
    u1, u2 = Dual(2.0, seed[0]), Dual(5.0, seed[1])
    g = dlog(u1) + u1 * u2 - dsin(u2)
    print(f"forward mode, direction {seed}: f = {g.a:.4f}, directional derivative = {g.b:.4f}")

# 3. a small MLP built from Values, checked against central differences
rng = random.Random(1)
def mlp(params, x):                           # 2 -> 4 -> 1, tanh hidden layer
    W1, b1, w2, b2 = params
    h = [(sum((W1[i][j] * x[j] for j in range(2)), b1[i])).tanh() for i in range(4)]
    return sum((w2[i] * h[i] for i in range(4)), b2)
def loss_fn(params, data):                    # mean squared error
    return sum(((mlp(params, x) - y) ** 2 for x, y in data), Value(0.0)) * (1.0 / len(data))
def fresh(raw):                               # wrap floats as leaf Values
    W1, b1, w2, b2 = raw
    return ([[Value(w) for w in r] for r in W1], [Value(b) for b in b1],
            [Value(w) for w in w2], Value(b2))
raw = ([[rng.gauss(0, 1) for _ in range(2)] for _ in range(4)], [0.0] * 4,
       [rng.gauss(0, 0.5) for _ in range(4)], 0.0)
xor = [((0., 0.), -1.), ((0., 1.), 1.), ((1., 0.), 1.), ((1., 1.), -1.)]

params = fresh(raw)
L = loss_fn(params, xor); L.backward()
eps = 1e-6
for i, j in [(0, 1), (3, 0)]:
    plus = ([r[:] for r in raw[0]], raw[1], raw[2], raw[3]); plus[0][i][j] += eps
    minus = ([r[:] for r in raw[0]], raw[1], raw[2], raw[3]); minus[0][i][j] -= eps
    num = (loss_fn(fresh(plus), xor).data - loss_fn(fresh(minus), xor).data) / (2 * eps)
    print(f"dL/dW1[{i}][{j}]  autograd {params[0][i][j].grad: .8f}  numeric {num: .8f}")

# 4. train it: every step builds a new graph, runs backward, updates the leaves
for step in range(1, 301):
    params = fresh(raw)
    L = loss_fn(params, xor); L.backward()
    W1, b1, w2, b2 = params
    raw = ([[w.data - 0.1 * w.grad for w in r] for r in W1], [b.data - 0.1 * b.grad for b in b1],
           [w.data - 0.1 * w.grad for w in w2], b2.data - 0.1 * b2.grad)
    if step in (1, 100, 300):
        preds = [round(mlp(fresh(raw), x).data, 3) for x, _ in xor]
        print(f"step {step:3d}  loss {L.data:.2e}  outputs {preds}")
```

```text
f = 11.6521   df/dx1 = 5.5000   df/dx2 = 1.7163
forward mode, direction (1.0, 0.0): f = 11.6521, directional derivative = 5.5000
forward mode, direction (0.0, 1.0): f = 11.6521, directional derivative = 1.7163
dL/dW1[0][1]  autograd -0.00422464  numeric -0.00422464
dL/dW1[3][0]  autograd  0.06343612  numeric  0.06343612
step   1  loss 8.91e-01  outputs [-0.059, 0.38, 0.144, 0.196]
step 100  loss 3.86e-02  outputs [-0.93, 0.826, 0.818, -0.722]
step 300  loss 3.20e-08  outputs [-1.0, 1.0, 1.0, -1.0]
```

The engine reproduces [[#ex-forward]] and [[#ex-reverse]], agrees with central differences on an MLP's loss, and trains that MLP on XOR (targets $\pm1$) without a single hand-written derivative of the network. The `+=` in `backward` is the fan-out rule: a node used several times collects one contribution per use. The engine is also exactly as slow as it looks — one Python object per scalar operation. Real systems apply the same algorithm to **tensors**, so that a node is a whole matrix multiplication executed by an optimised kernel, and the graph has thousands of nodes rather than billions.

## Tensors and broadcasting {#sec-tensors}

With tensor-valued nodes the backward rule of each operation is a VJP: given $\bar{\mathbf{y}}$ of the output's shape, return adjoints of the inputs' shapes ([[neural-networks/backpropagation#sec-rules]]). One rule deserves special mention because it is the source of many shape bugs. Array libraries **broadcast**: adding a bias $\mathbf{b}$ of shape $(d)$ to a matrix $X$ of shape $(B, d)$ silently copies $\mathbf{b}$ to every row.

::: proposition Broadcasting and its adjoint {#prop-broadcast}
If an input $\mathbf{u}$ is broadcast along some axes before an operation, its adjoint is the output adjoint of the broadcast copy **summed over those axes**. For $Y = X + \mathbf{1}\mathbf{b}^\top$ with $X\in\R^{B\times d}$, $\mathbf{b}\in\R^d$: $\bar X = \bar Y$ and $\bar{\mathbf{b}} = \sum_{r=1}^B\bar Y_{r,:}$.
:::

::: proof
Broadcasting is the linear map $\mathbf{b}\mapsto\mathbf{1}\mathbf{b}^\top$, which copies $\mathbf{b}$ into each of the $B$ rows. Each entry $b_k$ is used $B$ times, once in each row $r$, with local derivative $1$; by the fan-out rule its adjoint is $\sum_r\bar Y_{rk}$. Equivalently, the backward rule of a linear map is its transpose, and the transpose of "copy along an axis" is "sum along that axis".
:::

Frameworks implement this automatically ("unbroadcasting"), so the gradient of a bias always has the bias's shape. When writing a custom operation the rule must be applied by hand, and forgetting it produces a gradient of the wrong shape — or, worse, of the right shape by coincidence (when $B = d$).

::: example Shapes in a batched layer {#ex-shapes}
A layer computes $Y = \tanh(XW + \mathbf{b})$ with $X$ of shape $(64, 128)$, $W$ of shape $(128, 32)$ and $\mathbf{b}$ of shape $(32)$. Given $\bar Y$, write the backward pass with the shape of every quantity.
::: solution
Let $A = XW + \mathbf{b}$, shape $(64, 32)$. Then $\bar A = \bar Y\odot(1 - Y^2)$, shape $(64, 32)$; $\bar W = X^\top\bar A$, shape $(128, 64)(64, 32) = (128, 32)$; $\bar{\mathbf{b}} = $ the column sums of $\bar A$, shape $(32)$, by [[#prop-broadcast]]; $\bar X = \bar AW^\top$, shape $(64, 32)(32, 128) = (64, 128)$. Each adjoint has the shape of the quantity it belongs to — the check that catches most mistakes.
:::
:::

## Autograd systems {#sec-systems}

The large frameworks implement reverse mode on tensors, with hundreds of differentiable operations, GPU kernels for each forward and backward rule, and careful memory management. Two designs dominate (as of 2026).

**Define-by-run tapes (PyTorch).** Tensors created with `requires_grad=True` are leaves; every operation on them records a node in a graph, as in the `Value` class, and calling `.backward()` on a scalar runs the reverse sweep and *accumulates* the adjoints of the leaves into their `.grad` fields. Because the graph is rebuilt on every forward pass, ordinary Python control flow — loops, branches, recursion — just works. Paszke et al. (2019) describe the design.

```python
import torch

x = torch.tensor([2.0, 5.0], requires_grad=True)        # leaf tensor, shape (2,)
f = torch.log(x[0]) + x[0] * x[1] - torch.sin(x[1])     # graph recorded as it runs
f.backward()                                            # reverse sweep from the scalar f
print(x.grad)                                           # tensor([5.5000, 1.7163])
```

**Function transformations (JAX).** JAX (Bradbury et al., 2018) treats differentiation as a transformation of pure functions: `jax.grad(f)` is a new function that returns the gradient of `f`, `jax.jvp` and `jax.vjp` expose the two modes directly, `jax.vmap` vectorises over a batch axis and `jax.jit` compiles. JAX obtains the trace by running the Python function on abstract "tracer" values, records it as an intermediate representation, and differentiates that. Transformations compose: `jax.jacfwd(jax.grad(f))` is a Hessian, and `jax.vmap(jax.grad(loss), in_axes=(None, 0))` gives per-example gradients. PyTorch offers similar composable transforms in `torch.func`. TensorFlow 2 records operations on a `tf.GradientTape`, a define-by-run design like PyTorch's.

::: warning Gradients accumulate, and AD differentiates the program
Three surprises catch most newcomers. First, in PyTorch `.backward()` *adds* to `.grad` (the fan-out rule applied across calls), so gradients from successive steps pile up unless they are reset with `optimizer.zero_grad()` each step; this is deliberate, and is how gradient accumulation over micro-batches works ([[neural-networks/training-practice]]). Second, AD differentiates the *computation actually executed*, not the mathematical function you had in mind: at a ReLU's kink it returns whatever the library's rule says (PyTorch and JAX use $0$ at exactly $0$), a program `x*x if x != 1 else 1.0` has AD derivative $0$ at $x = 1$ although the function is $x^2$ everywhere, and $\sqrt{x}$ at $x = 0$ gives an infinite gradient that turns into NaN downstream. Third, operations that leave the framework — converting to a Python float or a NumPy array — cut the graph, and no gradient flows through them.
:::

## Beyond the gradient {#sec-beyond}

### Hessian–vector products {#sec-hvp}

Second derivatives are needed to measure curvature — the sharpness that limits the learning rate ([[math-for-ml/optimisation#sec-quadratic]]) — and by second-order optimisers. The Hessian of a loss with $n$ parameters has $n^2$ entries, far too many to form, but its product with a vector is cheap.

::: proposition Hessian–vector products in linear time {#prop-hvp}
For a twice-differentiable $f\colon\R^n\to\R$ computed in $C$ operations and any $\mathbf{v}\in\R^n$, the product $\nabla^2f(\mathbf{x})\,\mathbf{v}$ can be computed exactly in $O(C)$ operations, by applying forward mode to the reverse-mode gradient computation ("forward-over-reverse"), or reverse mode to the scalar $\nabla f(\mathbf{x})^\top\mathbf{v}$.
:::

::: proof
$\nabla^2f(\mathbf{x})\mathbf{v} = \frac{d}{dt}\nabla f(\mathbf{x} + t\mathbf{v})\big|_{t=0}$, the JVP of the map $\mathbf{x}\mapsto\nabla f(\mathbf{x})$ in direction $\mathbf{v}$. That map is computed by the reverse-mode program in $O(C)$ operations ([[#thm-modes]]), and one forward-mode pass through it costs a constant multiple of that, so $O(C)$. Alternatively, $g(\mathbf{x}) = \nabla f(\mathbf{x})^\top\mathbf{v}$ is a scalar computed in $O(C)$ operations, and its gradient is $\nabla^2f(\mathbf{x})\mathbf{v}$ by symmetry of the Hessian; reverse mode computes it in $O(C)$.
:::

This is Pearlmutter's (1994) "fast exact multiplication by the Hessian". Combined with power iteration it estimates the largest Hessian eigenvalue of a network's loss, the quantity behind the "edge of stability" observations of [[math-for-ml/optimisation]], and combined with conjugate gradients it gives Newton-type steps without forming any matrix.

### Checkpointing {#sec-checkpointing}

Reverse mode's weakness is memory: every value the backward sweep needs is stored from the forward pass ([[neural-networks/backpropagation#sec-memory]]). **Checkpointing** trades computation for memory by storing only some of them.

::: proposition Square-root checkpointing {#prop-checkpoint}
Consider a chain of $L$ layers, each with an activation of the same size. Store only every $k$-th activation during the forward pass. During the backward pass, recompute the activations of each segment of $k$ layers from its stored checkpoint just before they are needed. Then the peak number of stored activations is about $L/k + k$, minimised at $k = \sqrt L$ with $2\sqrt L$, and the extra computation is at most one additional forward pass.
:::

::: proof
The checkpoints number $L/k$. When the backward sweep reaches a segment, it recomputes that segment's $k$ activations from the checkpoint at its start, uses them, and frees them before moving to the previous segment, so at most $k$ recomputed activations are alive at once, giving $L/k + k$. By the inequality of arithmetic and geometric means, $L/k + k\ge2\sqrt L$ with equality at $k = \sqrt L$. Every layer's forward computation is repeated at most once (the layers of each segment once during recomputation), so the extra work is at most one forward pass, about a third of the cost of a training step ([[neural-networks/backpropagation#prop-flops]]).
:::

::: widget plot
f: L/x + x; L
x: 1, 64
y: 0, 70
sliders: L=48:4:64:4
labels: stored activations with checkpoints every $k$ layers; without checkpointing
caption: Peak stored activations $L/k + k$ against the checkpoint spacing $k$ for a chain of $L$ layers, compared with $L$ for storing everything. The minimum $2\sqrt L$ is at $k = \sqrt L$: for $L = 64$, $16$ activations instead of $64$, for the price of recomputing one forward pass.
:::

Chen, Xu, Zhang and Guestrin (2016) popularised square-root checkpointing for deep networks; Griewank (1992) had shown earlier that recursive ("binomial") checkpointing needs only $O(\log L)$ memory at $O(L\log L)$ computation. Frameworks expose it as `torch.utils.checkpoint` and `jax.checkpoint` (also called "rematerialisation"); large-model training typically checkpoints at the boundaries of Transformer blocks.

### Custom gradients {#sec-custom}

Sometimes the derivative the chain rule would compute is not the one you want. A numerically better backward rule can be supplied for an operation (for example, the fused softmax–cross-entropy of [[neural-networks/backpropagation#prop-softmax-vjp]]); an iterative solver can be differentiated through its optimality condition by the implicit function theorem rather than by unrolling its iterations; and an operation with zero derivative almost everywhere, such as rounding in quantisation, can be given a surrogate. The **straight-through estimator** (Bengio, Léonard and Courville, 2013) uses the identity as the backward rule of rounding, so gradients pass "straight through" to the unquantised weights — a convenient fiction that works well in practice and is used in quantisation-aware training ([[inference]]). PyTorch exposes custom rules as `torch.autograd.Function` and JAX as `jax.custom_vjp` and `jax.custom_jvp`.

::: example Checkpointing a deep stack {#ex-checkpoint}
A network is a chain of $L = 100$ blocks. Storing the activations needed by one block's backward pass takes $0.5$ GB for the batch in use, of which the block's *input* is only $0.05$ GB (the rest are internal: attention scores, the wide feed-forward layer). Compare the activation memory without checkpointing, with checkpoints at every block input, and with square-root checkpointing over blocks.
::: solution
Without checkpointing every block's activations are kept: $100\cdot0.5 = 50$ GB. Checkpointing every block input stores $100\cdot0.05 = 5$ GB; during the backward pass one block at a time is recomputed from its input, adding $0.5$ GB, so the peak is about $5.5$ GB. Square-root checkpointing stores every tenth block input ($10\cdot0.05 = 0.5$ GB) and, for the segment being processed, recomputes and keeps the inputs of its ten blocks ($0.5$ GB) plus one block's internals ($0.5$ GB), about $1.5$ GB — at the cost of more bookkeeping. Each scheme costs about one extra forward pass, raising the cost of a step from about $3$ to about $4$ forward passes. Per-block checkpointing is the common choice for Transformers because block inputs are small compared with block internals.
:::
:::

::: history
Forward-mode automatic differentiation was described by Robert Wengert (1964), whose "simple automatic derivative evaluation program" gave the evaluation trace its name. Seppo Linnainmaa's master's thesis (1970) described reverse mode. Bert Speelpenning's 1980 thesis built a compiler that generated reverse-mode code, and Andreas Griewank's work in the 1980s and 1990s, summarised in *Evaluating Derivatives* (2000; second edition with Andrea Walther, 2008), established the theory, including checkpointing (1992). Barak Pearlmutter (1994) showed how to multiply by the Hessian in linear time. In machine learning, Theano (Bergstra et al., 2010) built symbolic graphs that were differentiated and compiled; Chainer (Tokui et al., 2015) and the Python *autograd* package (Maclaurin, Duvenaud and Adams, 2015) introduced define-by-run differentiation of ordinary code; TensorFlow (Abadi et al., 2016), PyTorch (Paszke et al., 2017, 2019) and JAX (Bradbury et al., 2018; Frostig, Johnson and Leary, 2018) followed. Baydin, Pearlmutter, Radul and Siskind's survey "Automatic differentiation in machine learning" (2018) connects the two communities.
:::

::: summary
- **Automatic differentiation** applies the chain rule to the evaluation trace of a program, carrying numbers rather than formulas; it is exact up to rounding and handles any control flow.
- **Forward mode** carries tangents alongside values (dual numbers $a + b\epsilon$, $\epsilon^2 = 0$) and computes a Jacobian–vector product per pass: $n$ passes for a full Jacobian of $f\colon\R^n\to\R^m$.
- **Reverse mode** records a tape, then sweeps backwards computing adjoints: one vector–Jacobian product per pass, $m$ passes for a full Jacobian, so a scalar loss's gradient costs a constant multiple of evaluating it — at the price of storing intermediate values.
- A reverse-mode engine needs nodes with parents and local derivatives, a topological sort and a backward sweep with `+=`; frameworks apply it to tensors, where **broadcast** inputs get adjoints summed over the broadcast axes.
- PyTorch builds the graph by running the code and accumulates into `.grad`; JAX transforms pure functions (`grad`, `vjp`, `jvp`, `vmap`, `jit`), and transformations compose.
- **Hessian–vector products** cost $O(C)$; **checkpointing** cuts activation memory to $O(\sqrt L)$ for one extra forward pass; **custom gradients** (fused, implicit, straight-through) replace the chain rule where it is unhelpful.
:::

## Exercises

::: exercise Dual numbers by hand {level=1 check="14"}
Evaluate $f(x) = x^3 + 2x$ on the dual number $2 + \epsilon$ and read off $f'(2)$.
::: solution
$(2 + \epsilon)^2 = 4 + 4\epsilon$ and $(2 + \epsilon)^3 = (4 + 4\epsilon)(2 + \epsilon) = 8 + 12\epsilon$ (dropping $\epsilon^2$). Adding $2(2 + \epsilon) = 4 + 2\epsilon$ gives $12 + 14\epsilon$. So $f(2) = 12$ and $f'(2) = 14$, which matches $3x^2 + 2$.
:::
:::

::: exercise Counting passes {level=1 check="1000000"}
A loss depends on $10^6$ parameters. How many forward-mode passes are needed for its full gradient, and how many reverse-mode passes? Enter the number of forward-mode passes.
::: solution
Forward mode yields one directional derivative per pass, so $10^6$ passes; reverse mode yields the whole gradient in $1$ pass (plus the forward pass that records the tape).
:::
:::

::: exercise A broadcast bias {level=1 check="32"}
In $Y = X + \mathbf{b}$ with $X$ of shape $(32, 10)$ and $\mathbf{b}$ of shape $(10)$, the loss is $\mathcal{L} = \sum_{r,k}Y_{rk}$. What is each component of $\bar{\mathbf{b}}$?
::: solution
$\bar Y$ is all ones, and by [[#prop-broadcast]] $\bar b_k = \sum_{r=1}^{32}\bar Y_{rk} = 32$ for every $k$.
:::
:::

::: exercise A forward-mode trace {level=2 check="-pi"}
Write the evaluation trace of $f(x) = x\sin x$ and compute $f'(\pi)$ by forward mode.
::: solution
$v_0 = x = \pi$, $\dot v_0 = 1$; $v_1 = \sin v_0 = 0$, $\dot v_1 = \cos(v_0)\dot v_0 = -1$; $v_2 = v_0v_1 = 0$, $\dot v_2 = \dot v_0v_1 + v_0\dot v_1 = 0 + \pi\cdot(-1) = -\pi$. So $f'(\pi) = -\pi\approx-3.142$, as $\sin x + x\cos x$ confirms.
:::
:::

::: exercise A reverse sweep {level=2 check="2"}
For $f(x, y) = xy + e^{xy}$ at $(x, y) = (1, 0)$, use the trace $u = xy$, $f = u + e^u$ and one reverse sweep to find both partial derivatives. Enter $\partial f/\partial y$.
::: solution
$u = 0$, $f = 0 + 1 = 1$. Backwards: $\bar f = 1$, so $\bar u = 1 + e^u = 2$. Then $\bar x = \bar u\,y = 0$ and $\bar y = \bar u\,x = 2$. So $\partial f/\partial x = 0$ and $\partial f/\partial y = 2$.
:::
:::

::: exercise Choosing a checkpoint spacing {level=2 check="16"}
A chain has $L = 64$ layers of equal activation size. With checkpoints every $k$ layers, what is the smallest possible peak number of stored activations by [[#prop-checkpoint]], and at which $k$?
::: solution
$L/k + k$ is minimised at $k = \sqrt{64} = 8$, giving $8 + 8 = 16$ activations, a quarter of the $64$ stored without checkpointing.
:::
:::

::: exercise A Hessian–vector product {level=2}
For $f(\mathbf{x}) = \frac12\mathbf{x}^\top A\mathbf{x}$ with symmetric $A = \begin{pmatrix}2&1\\1&3\end{pmatrix}$, compute $\nabla^2f\,\mathbf{v}$ for $\mathbf{v} = (1, -1)$ by the second method of [[#prop-hvp]]: form $g(\mathbf{x}) = \nabla f(\mathbf{x})^\top\mathbf{v}$ and differentiate it.
::: solution
$\nabla f(\mathbf{x}) = A\mathbf{x}$, so $g(\mathbf{x}) = \mathbf{v}^\top A\mathbf{x} = (A\mathbf{v})^\top\mathbf{x}$ and $\nabla g = A\mathbf{v} = (2 - 1, 1 - 3) = (1, -2)$. This is $\nabla^2f\,\mathbf{v}$, since $\nabla^2f = A$. In a framework one would compute $g$ by a first backward pass, then call backward again on the scalar $g$ ("double backward").
:::
:::

::: exercise Extending the engine {level=3}
Add `relu` and a numerically stable `log_softmax`-based cross-entropy to the `Value` engine of [[#sec-engine]]: given a list of logit `Value`s and a target index, return the loss. Verify on logits $(2, 1, 0.1)$ with target $1$ (zero-based) that the logits' gradients are $\mathbf{p} - \mathbf{e}_1$.
::: solution
```python
def relu(self):
    return Value(max(0.0, self.data), (self,), (1.0 if self.data > 0 else 0.0,))
Value.relu = relu

def cross_entropy(logits, target):
    m = max(z.data for z in logits)                 # a constant: no gradient needed
    lse = sum(((z - m).exp() for z in logits), Value(0.0)).log() + m
    return lse - logits[target]                     # -log softmax(z)[target]

z = [Value(2.0), Value(1.0), Value(0.1)]
loss = cross_entropy(z, 1)
loss.backward()
print(round(loss.data, 4), [round(v.grad, 4) for v in z])
# 1.417 [0.659, -0.7576, 0.0986]   which is p - e_1
```
Subtracting the maximum $m$ before exponentiating avoids overflow and changes nothing mathematically, because $\log\sum_je^{z_j} = m + \log\sum_je^{z_j - m}$. Since $m$ enters as a plain number, no gradient flows through it — which is correct, because the result does not depend on $m$. The loss $1.417$ and gradient $(0.659, -0.758, 0.099)$ agree with [[ml-fundamentals/logistic-regression#ex-softmax]].
:::
:::

::: exercise What AD returns at a branch {level=3}
Consider the program `def f(x): return x * x if x != 1.0 else 1.0`. What derivative does reverse-mode AD return at $x = 1$, and what is the true derivative of the function it computes? Give a second example in which AD returns a gradient of NaN even though the function is differentiable, and explain how libraries avoid it in common operations such as the norm $\lVert\mathbf{x}\rVert$.
::: solution
At $x = 1$ the program executes the branch `return 1.0`, a constant, so AD returns $0$. The function computed is $x^2$ for all $x$ (it equals $1 = 1^2$ at $x = 1$), whose derivative at $1$ is $2$. AD is correct for the trace executed, and the trace at $x = 1$ is a constant. For the second example, compute $f(x) = x^2$ as `sqrt(x**4)`. The function is differentiable everywhere, with $f'(0) = 0$. But at $x = 0$ the backward rule of $\sqrt u$ is $1/(2\sqrt u) = \infty$ at $u = 0$, and it is multiplied by $du/dx = 4x^3 = 0$, giving $\infty\cdot0 = $ NaN in floating point. The same happens for the norm $\lVert\mathbf{x}\rVert = \sqrt{\sum_ix_i^2}$ at $\mathbf{x} = \mathbf{0}$ (where it is not differentiable, but $\mathbf{0}$ is a valid subgradient). Libraries give the norm a custom backward rule that returns $\mathbf{x}/\lVert\mathbf{x}\rVert$ for $\mathbf{x}\ne\mathbf{0}$ and $\mathbf{0}$ at the origin, and many code bases compute $\sqrt{u + \varepsilon}$ with a small $\varepsilon$ for the same reason.
:::
:::

::: exercise Per-example gradients {level=3}
Differential privacy and some diagnostics need the gradient of each example's loss separately, not just the average. For an MLP layer $A = HW$ with $H$ of shape $(B, d_{\text{in}})$ and error signal $\Delta$ of shape $(B, d_{\text{out}})$, express the $B$ per-example gradients of $W$ and compare the memory needed with that of the average gradient. How does `vmap` over `grad` produce them?
::: solution
The batch gradient is $H^\top\Delta = \sum_r\mathbf{h}_r\boldsymbol{\delta}_r^\top$, a sum of $B$ outer products, and the per-example gradient of example $r$ (with its loss not divided by $B$) is $\mathbf{h}_r\boldsymbol{\delta}_r^\top$, shape $(d_{\text{in}}, d_{\text{out}})$. Storing all of them takes $B\,d_{\text{in}}d_{\text{out}}$ numbers, $B$ times the memory of the averaged gradient — for $B = 256$ and a $4{,}096\times4{,}096$ layer, about $4.3\times10^9$ numbers instead of $1.7\times10^7$. Note that $\mathbf{h}_r$ and $\boldsymbol{\delta}_r$ are already computed by ordinary backpropagation, so per-example *norms* can be obtained cheaply as $\lVert\mathbf{h}_r\rVert\,\lVert\boldsymbol{\delta}_r\rVert$ without forming the outer products (Goodfellow, 2015). `jax.vmap(jax.grad(loss), in_axes=(None, 0))` maps the single-example gradient function over the batch axis of the data while sharing the parameters; the vectorised program it produces computes exactly these outer products, batched.
:::
:::
