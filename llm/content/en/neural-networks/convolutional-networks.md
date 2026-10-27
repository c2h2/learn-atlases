A fully connected layer treats its input as an unstructured list of numbers: permute the pixels of every image the same way and an MLP learns equally well. Images, audio and many other signals are not unstructured. Nearby pixels are related, and a cat is a cat wherever it appears in the frame. A **convolutional network** (CNN) builds these two facts into its architecture: each unit looks only at a small neighbourhood (**locality**), and the same weights are used at every position (**weight sharing**). The result is a layer with far fewer parameters than a fully connected one, whose output shifts when its input shifts. Convolutional networks were the first deep architecture to succeed at scale — AlexNet's 2012 ImageNet result started the deep-learning era — and the residual networks built from them introduced the skip connections that every Transformer now uses.

This chapter defines the convolution layer, counts its parameters and cost, proves its translation equivariance, derives its backward pass, analyses the growth of receptive fields, and traces the architectures from LeNet to ResNet and on to the vision Transformer. It uses backpropagation ([[neural-networks/backpropagation]]) and the residual connections and normalisation of [[neural-networks/initialisation-normalisation]].

## The convolution layer {#sec-conv}

In deep learning "convolution" almost always means **cross-correlation**: slide a small kernel over the input and take a dot product at each position. (Mathematical convolution flips the kernel first; since the kernel is learned, the distinction does not matter.)

::: definition Convolution layer {#def-conv}
A **2D convolution layer** with $C_{\text{in}}$ input channels, $C_{\text{out}}$ output channels, kernel size $k\times k$, stride $s$ and zero padding $p$ maps an input $X\in\R^{C_{\text{in}}\times H\times W}$ to $Y\in\R^{C_{\text{out}}\times H'\times W'}$,

$$
Y_{o,i,j} = b_o + \sum_{c=1}^{C_{\text{in}}}\sum_{a=0}^{k-1}\sum_{b=0}^{k-1}K_{o,c,a,b}\,X_{c,\,si + a - p,\,sj + b - p},
$$ {#eq-conv}

where entries of $X$ outside its bounds count as $0$. The parameters are the kernel $K\in\R^{C_{\text{out}}\times C_{\text{in}}\times k\times k}$ and biases $\mathbf{b}\in\R^{C_{\text{out}}}$. Each output channel is a **feature map**: the response of one learned filter at every position. A batch adds a leading dimension, giving activations of shape $(B, C, H, W)$.
:::

A $3\times3$ filter whose weights are $-1, 0, 1$ across the columns responds to vertical edges; one with equal positive weights blurs. The first layer of a trained network learns filters of exactly these kinds — edge and colour detectors at various orientations — and later layers combine them into textures, parts and objects.

::: proposition Output size and cost {#prop-conv-size}
The output of [[#def-conv]] has spatial size

$$
H' = \Big\lfloor\frac{H + 2p - k}{s}\Big\rfloor + 1
$$

(and likewise $W'$). The layer has $k^2C_{\text{in}}C_{\text{out}} + C_{\text{out}}$ parameters and costs about $2k^2C_{\text{in}}C_{\text{out}}H'W'$ FLOPs per example.
:::

::: proof
The top-left corner of the kernel sits at input row $si - p$ for output row $i$, and the kernel fits if $si - p + k - 1\le H + p - 1$, that is $i\le(H + 2p - k)/s$. Rows $i = 0, 1, \dots, \lfloor(H + 2p - k)/s\rfloor$ are valid, which is the count stated. The kernel has one weight for each combination of output channel, input channel and kernel position. Each output value takes $k^2C_{\text{in}}$ multiply–adds, and there are $C_{\text{out}}H'W'$ outputs.
:::

With $k = 3$, $s = 1$ and $p = 1$ ("same" padding) the output has the input's size; with $s = 2$ the spatial size halves, a common way to **downsample**.

::: example The first layer of a ResNet {#ex-stem}
ResNet-50 begins with a convolution with $64$ filters of size $7\times7$, stride $2$ and padding $3$ on a $3\times224\times224$ image. Find the output shape, the number of parameters, the FLOPs, and the number of weights a fully connected layer with the same input and output sizes would need.
::: solution
$H' = \lfloor(224 + 6 - 7)/2\rfloor + 1 = 111 + 1 = 112$, so the output is $64\times112\times112$. Parameters: $7\cdot7\cdot3\cdot64 + 64 = 9{,}472$ (ResNet in fact omits this bias, since batch normalisation follows). FLOPs: $2\cdot49\cdot3\cdot64\cdot112\cdot112 = 2.36\times10^8$. A fully connected layer would need $(3\cdot224^2)\cdot(64\cdot112^2) = 150{,}528\cdot802{,}816\approx1.2\times10^{11}$ weights — thirteen million times as many. Locality and weight sharing are what make vision networks feasible.
:::
:::

### Convolution is a constrained linear map {#sec-conv-linear}

For fixed sizes, [[#eq-conv]] is linear in $X$, so it is a matrix multiplication $\operatorname{vec}(Y) = M\operatorname{vec}(X)$ by a very special matrix $M$: most entries are zero (locality), and the non-zero ones repeat along diagonals (weight sharing). In one dimension with one channel, $M$ is a banded **Toeplitz** matrix; for $k = 3$, $s = 1$ and no padding,

$$
M = \begin{pmatrix}w_0&w_1&w_2&0&\cdots&0\\0&w_0&w_1&w_2&\cdots&0\\\vdots&&\ddots&\ddots&\ddots&\vdots\\0&\cdots&0&w_0&w_1&w_2\end{pmatrix}.
$$

A convolutional network is therefore an MLP whose weight matrices are restricted to this form. The restriction encodes a prior — that the same local pattern matters wherever it occurs — which is the main reason CNNs need far less data than MLPs to learn vision tasks.

::: proposition Translation equivariance {#prop-equivariance}
Let $T_{\mathbf{u}}$ shift an image by $\mathbf{u}\in\Z^2$, $(T_{\mathbf{u}}X)_{c, i, j} = X_{c, i - u_1, j - u_2}$, on the infinite grid $\Z^2$ (or on a torus, with circular padding). A convolution with stride $1$ commutes with shifts: $\operatorname{conv}(T_{\mathbf{u}}X) = T_{\mathbf{u}}\operatorname{conv}(X)$. Elementwise activations also commute with shifts, so a stack of stride-$1$ convolutions and activations is translation-equivariant.
:::

::: proof
By [[#eq-conv]] with $s = 1$, $p = 0$ on the infinite grid,

$$
\operatorname{conv}(T_{\mathbf{u}}X)_{o, i, j} = b_o + \sum_{c, a, b}K_{o, c, a, b}X_{c,\,i + a - u_1,\,j + b - u_2} = \operatorname{conv}(X)_{o,\,i - u_1,\,j - u_2} = \big(T_{\mathbf{u}}\operatorname{conv}(X)\big)_{o, i, j}.
$$

An elementwise function $\phi$ satisfies $\phi(T_{\mathbf{u}}X) = T_{\mathbf{u}}\phi(X)$ trivially, and compositions of maps that commute with $T_{\mathbf{u}}$ commute with it.
:::

Equivariance is not invariance: the feature maps move with the object. Invariance — the same output wherever the object is — is obtained at the end by **pooling** over all positions. Equivariance also holds only approximately in practice: zero padding breaks it at the borders, and strides break it for shifts that are not multiples of the stride (a well-documented source of small shift sensitivity in CNNs; Zhang, 2019).

::: widget plot
f: sin(x) + 0.3*sin(7*x); sin(x)*sin(w/2)/(w/2) + 0.3*sin(7*x)*sin(7*w/2)/(7*w/2)
x: -6.3, 6.3
y: -1.6, 1.6
sliders: w=0.9:0.05:2:0.05
labels: signal; after a moving-average filter of width $w$
caption: Convolution as filtering. A signal with a slow and a fast component is convolved with a box kernel of width $w$ (a moving average). Each sinusoid comes out with the same frequency and phase but scaled by $\operatorname{sinc}$ of its frequency times $w$: the slow wave survives, the fast one is suppressed, and at $w = 2\pi/7\approx0.9$ it vanishes entirely. Because convolution commutes with shifts, sinusoids are its eigenfunctions — which is why it can be analysed by frequency.
:::

### Multiple channels, $1\times1$ and depthwise convolutions {#sec-variants}

Each output channel sums over *all* input channels, so a convolution mixes information across channels and across space at once. Two special cases separate these roles. A **$1\times1$ convolution** ($k = 1$) mixes channels only: at each position it applies the same $C_{\text{out}}\times C_{\text{in}}$ matrix, a fully connected layer applied position by position — exactly the position-wise feed-forward layer of a Transformer ([[transformers/transformer-block#def-ffn]]). A **depthwise convolution** applies a separate $k\times k$ filter to each channel, with no mixing. A depthwise convolution followed by a $1\times1$ convolution, a **depthwise separable** convolution (used in MobileNet, Howard et al., 2017), costs $k^2C + C^2$ weights instead of $k^2C^2$. **Dilated** convolutions space the kernel's taps $d$ pixels apart, enlarging the region they see without extra parameters; WaveNet (van den Oord et al., 2016) stacked dilations $1, 2, 4, \dots$ to model raw audio with long one-dimensional contexts.

## Pooling and receptive fields {#sec-pooling}

::: definition Pooling {#def-pooling}
A **pooling** layer with window $k\times k$ and stride $s$ replaces each window of each channel by a single summary: its maximum (**max pooling**) or its mean (**average pooling**). **Global average pooling** averages each channel over all positions, turning a $C\times H\times W$ feature map into a vector in $\R^C$.
:::

Pooling has no parameters. Max pooling makes the output insensitive to small shifts within a window, and its backward rule sends the gradient only to the arg-max ([[neural-networks/backpropagation#sec-rules]]). Modern architectures often replace pooling inside the network by strided convolutions, but keep global average pooling before the classifier, which makes the network applicable to inputs of any size.

Each unit of a deep layer depends on a limited region of the input, its **receptive field**, which grows with depth.

::: proposition Receptive field of a stack {#prop-receptive}
Consider layers $\ell = 1, \dots, L$ (convolutions or pooling) with kernel sizes $k_\ell$ and strides $s_\ell$. The receptive field of a unit in layer $L$ has side

$$
r_L = 1 + \sum_{\ell=1}^L(k_\ell - 1)\prod_{i=1}^{\ell-1}s_i .
$$ {#eq-receptive}
:::

::: proof
Let $j_\ell = \prod_{i\le\ell}s_i$ be the distance, in input pixels, between adjacent units of layer $\ell$ (the "jump"), with $j_0 = 1$. A unit of layer $\ell$ looks at $k_\ell$ adjacent units of layer $\ell - 1$, whose receptive fields have side $r_{\ell-1}$ and are offset by $j_{\ell-1}$ from each other, so together they cover $r_\ell = r_{\ell-1} + (k_\ell - 1)j_{\ell-1}$ pixels. With $r_0 = 1$, unrolling gives [[#eq-receptive]].
:::

::: widget plot
f: 1 + (k - 1)*x; 1 + (k - 1)*(2^x - 1)
x: 0, 8
y: 0, 120
sliders: k=3:2:7:1
labels: stride $1$ everywhere; stride $2$ in every layer (or dilations doubling)
caption: Receptive-field side $r_L$ against depth $L$ for kernels of size $k$, from [[#eq-receptive]]. With stride $1$ the field grows by $k - 1$ per layer; when every layer halves the resolution (or, keeping the resolution, doubles its dilation) the growth is geometric, $1 + (k - 1)(2^L - 1)$.
:::

Without strides, the receptive field grows only linearly, by $k - 1$ per layer; strides and pooling multiply the jump, making later layers grow it geometrically. This is why classification networks downsample repeatedly: units near the top must see the whole object.

::: example Stacking small kernels {#ex-vgg}
(a) What receptive field do three stacked $3\times3$ convolutions with stride $1$ have, and how do their weights compare with one $7\times7$ convolution, for $C$ input and output channels? (b) Find the receptive field after the stem of a ResNet: a $7\times7$ convolution with stride $2$, a $3\times3$ max pool with stride $2$, then two $3\times3$ convolutions with stride $1$.
::: solution
(a) By [[#eq-receptive]], $r = 1 + 2 + 2 + 2 = 7$: the same as one $7\times7$ layer. The weights are $3\cdot9C^2 = 27C^2$ against $49C^2$, about $55\%$, and the stack has three nonlinearities instead of one. This observation motivated VGG (Simonyan and Zisserman, 2015), which used only $3\times3$ kernels. (b) The jumps are $1, 2, 4, 4$. $r = 1 + 6\cdot1 + 2\cdot2 + 2\cdot4 + 2\cdot4 = 27$ pixels after four layers. The listing below confirms part (a) by backpropagating from one output unit and counting the input pixels that receive a non-zero gradient.
:::
:::

The theoretical receptive field overstates what a unit actually uses: the contributions of its pixels are far from uniform, concentrated near the centre and decaying roughly like a Gaussian (Luo et al., 2016, "effective receptive field").

## The backward pass of a convolution {#sec-conv-backward}

Since convolution is linear with a shared kernel, its backward rules follow from those of a linear map and of weight sharing.

::: proposition Gradients of a convolution {#prop-conv-backward}
For a one-channel 1D convolution $y_i = \sum_{a=0}^{k-1}w_ax_{i+a}$ (stride $1$, no padding) with output adjoint $\bar{\mathbf{y}}$,

$$
\bar x_r = \sum_{a=0}^{k-1}w_a\,\bar y_{r-a},\qquad\bar w_a = \sum_i\bar y_i\,x_{i+a},
$$

with $\bar y_i = 0$ for out-of-range $i$. The input gradient is a *full* convolution of $\bar{\mathbf{y}}$ with the flipped kernel; the kernel gradient is a cross-correlation of the input with $\bar{\mathbf{y}}$. The same holds in two dimensions and with channels, summing over the channel indices.
:::

::: proof
Input $x_r$ appears in output $y_i$ exactly when $r = i + a$ for some kernel position $a$, with coefficient $w_a$, so by the fan-out rule ([[neural-networks/backpropagation#thm-backprop]]) $\bar x_r = \sum_a\bar y_{r-a}w_a$. Weight $w_a$ is shared by all outputs $y_i$, with coefficient $x_{i+a}$ in each, so $\bar w_a = \sum_i\bar y_ix_{i+a}$. Writing $\bar x_r = \sum_a w_a\bar y_{r-a}$ in terms of $\tilde w_a = w_{k-1-a}$ shows it is a cross-correlation of the zero-padded $\bar{\mathbf{y}}$ with the flipped kernel.
:::

So the backward pass of a convolution is two more convolutions, of the same cost as the forward pass — the $2\times$ of [[neural-networks/backpropagation#prop-flops]] again. A strided convolution's input gradient is a convolution with a stride-$1$ kernel applied to an *upsampled* adjoint, which is why the operation is called a **transposed convolution** and used for upsampling in segmentation and generative models.

::: example A convolution and its gradients by hand {#ex-conv1d}
Take $\mathbf{x} = (1, 2, 0, -1, 3)$ and kernel $\mathbf{w} = (1, 0, -1)$. Compute $\mathbf{y}$, and for the adjoint $\bar{\mathbf{y}} = (1, 0, 2)$ compute $\bar{\mathbf{x}}$ and $\bar{\mathbf{w}}$.
::: solution
$y_i = x_i - x_{i+2}$: $\mathbf{y} = (1 - 0, 2 + 1, 0 - 3) = (1, 3, -3)$ — a difference filter. By [[#prop-conv-backward]], $\bar x_r = \sum_aw_a\bar y_{r-a}$: $\bar x_0 = 1$, $\bar x_1 = w_1\bar y_0 + w_0\bar y_1 = 0$, $\bar x_2 = w_2\bar y_0 + w_1\bar y_1 + w_0\bar y_2 = -1 + 0 + 2 = 1$, $\bar x_3 = w_2\bar y_1 + w_1\bar y_2 = 0$, $\bar x_4 = w_2\bar y_2 = -2$; so $\bar{\mathbf{x}} = (1, 0, 1, 0, -2)$. And $\bar w_a = \sum_i\bar y_ix_{i+a}$: $\bar w_0 = 1\cdot1 + 0 + 2\cdot0 = 1$, $\bar w_1 = 2 + 0 + 2\cdot(-1) = 0$, $\bar w_2 = 0 + 0 + 2\cdot3 = 6$; so $\bar{\mathbf{w}} = (1, 0, 6)$.
:::
:::

The listing implements a multi-channel 2D convolution with stride and padding, its backward pass by the scatter rule of the proof, a gradient check, a test of translation equivariance and an empirical receptive field.

```python
import random

rng = random.Random(0)

def conv2d(X, W, stride=1, pad=0):
    """X: (C_in, H, W_), W: (C_out, C_in, k, k) -> (C_out, H_out, W_out); cross-correlation."""
    C_in, H, Wd = len(X), len(X[0]), len(X[0][0])
    C_out, k = len(W), len(W[0][0])
    Ho, Wo = (H + 2 * pad - k) // stride + 1, (Wd + 2 * pad - k) // stride + 1
    get = lambda c, i, j: X[c][i][j] if 0 <= i < H and 0 <= j < Wd else 0.0   # zero padding
    return [[[sum(W[o][c][a][b] * get(c, i * stride + a - pad, j * stride + b - pad)
                  for c in range(C_in) for a in range(k) for b in range(k))
              for j in range(Wo)] for i in range(Ho)] for o in range(C_out)]

def conv2d_backward(X, W, dY, stride=1, pad=0):
    """Gradients of sum(dY * conv2d(X, W)) with respect to X and W."""
    C_in, H, Wd = len(X), len(X[0]), len(X[0][0])
    C_out, k = len(W), len(W[0][0])
    dX = [[[0.0] * Wd for _ in range(H)] for _ in range(C_in)]
    dW = [[[[0.0] * k for _ in range(k)] for _ in range(C_in)] for _ in range(C_out)]
    for o in range(C_out):
        for i in range(len(dY[0])):
            for j in range(len(dY[0][0])):
                g = dY[o][i][j]
                for c in range(C_in):
                    for a in range(k):
                        for b in range(k):
                            r, s = i * stride + a - pad, j * stride + b - pad
                            if 0 <= r < H and 0 <= s < Wd:   # each output scatters back
                                dX[c][r][s] += g * W[o][c][a][b]
                                dW[o][c][a][b] += g * X[c][r][s]
    return dX, dW

rand = lambda *shape: ([rand(*shape[1:]) for _ in range(shape[0])] if len(shape) > 1
                       else [rng.gauss(0, 1) for _ in range(shape[0])])
X, W = rand(2, 6, 6), rand(3, 2, 3, 3)          # 2 input channels, 3 output channels, 3x3 kernels
Y = conv2d(X, W, stride=2, pad=1)
print("output shape", (len(Y), len(Y[0]), len(Y[0][0])), " expected (3, 3, 3)")

# gradient check of L = sum(dY * Y) for a random dY
dY = rand(3, 3, 3)
L = lambda X, W: sum(a * b for o in range(3) for ra, rb in zip(conv2d(X, W, 2, 1)[o], dY[o])
                     for a, b in zip(ra, rb))
dX, dW = conv2d_backward(X, W, dY, 2, 1)
eps = 1e-6
X[1][2][3] += eps; lp = L(X, W); X[1][2][3] -= 2 * eps; lm = L(X, W); X[1][2][3] += eps
print(f"dL/dX[1][2][3]  analytic {dX[1][2][3]:.6f}  numeric {(lp - lm) / (2 * eps):.6f}")
W[2][0][1][1] += eps; lp = L(X, W); W[2][0][1][1] -= 2 * eps; lm = L(X, W); W[2][0][1][1] += eps
print(f"dL/dW[2][0][1][1]  analytic {dW[2][0][1][1]:.6f}  numeric {(lp - lm) / (2 * eps):.6f}")

# translation equivariance: shifting the input shifts the output (stride 1, away from the border)
img = [[[0.0] * 10 for _ in range(10)]]
img[0][3][4] = 1.0                                          # a single bright pixel
shifted = [[[0.0] * 10 for _ in range(10)]]
shifted[0][5][6] = 1.0                                      # the same pixel moved by (2, 2)
K = rand(1, 1, 3, 3)
A, B = conv2d(img, K), conv2d(shifted, K)
same = all(abs(A[0][i][j] - B[0][i + 2][j + 2]) < 1e-12 for i in range(6) for j in range(6))
print("conv(shift(x)) == shift(conv(x)):", same)

# receptive field: which input pixels influence one output after three 3x3 convolutions?
x = [[[1.0] * 15 for _ in range(15)]]
k3 = [[[[1.0] * 3 for _ in range(3)]]]                       # all-ones 3x3 kernel, 1 channel
h1 = conv2d(x, k3); h2 = conv2d(h1, k3); h3 = conv2d(h2, k3)  # 13x13, 11x11, 9x9
g3 = [[[1.0 if (i, j) == (4, 4) else 0.0 for j in range(9)] for i in range(9)]]  # one output
g2, _ = conv2d_backward(h2, k3, g3); g1, _ = conv2d_backward(h1, k3, g2); g0, _ = conv2d_backward(x, k3, g1)
rows = [i for i in range(15) if any(g0[0][i])]
cols = [j for j in range(15) if any(g0[0][i][j] for i in range(15))]
print(f"receptive field after three 3x3 layers: {len(rows)} x {len(cols)} input pixels")
```

```text
output shape (3, 3, 3)  expected (3, 3, 3)
dL/dX[1][2][3]  analytic 0.528159  numeric 0.528159
dL/dW[2][0][1][1]  analytic 6.088516  numeric 6.088516
conv(shift(x)) == shift(conv(x)): True
receptive field after three 3x3 layers: 7 x 7 input pixels
```

Real implementations do not loop like this. They either rearrange the input patches into a matrix ("im2col") and call one large matrix multiplication, or use FFT- or Winograd-based algorithms, in libraries such as cuDNN.

::: warning Channels-first or channels-last, and what "same" means
Frameworks disagree on layout: PyTorch stores images as $(B, C, H, W)$, TensorFlow and JAX commonly as $(B, H, W, C)$. Feeding one layout to code expecting the other gives no error when $C$ happens to equal $H$ or $W$, only garbage. Padding conventions differ too: "same" padding keeps the size only for stride $1$, and for even kernel sizes the padding cannot be symmetric. And the output-size formula of [[#prop-conv-size]] rounds down, so an odd input size with stride $2$ silently loses its last row and column. Print the shapes after every layer when building a CNN.
:::

## Architectures {#sec-architectures}

The history of convolutional architectures is a sequence of answers to one question: how to make the network deeper while keeping it trainable and affordable.

- **LeNet-5** (LeCun, Bottou, Bengio and Haffner, 1998): two convolution layers with $5\times5$ kernels and subsampling, then fully connected layers; about $60{,}000$ parameters; trained by backpropagation to read handwritten digits on bank cheques. An earlier version (LeCun et al., 1989) had read ZIP codes.
- **AlexNet** (Krizhevsky, Sutskever and Hinton, 2012): five convolution layers and three fully connected ones, about $60$ million parameters, ReLU activations, dropout, data augmentation, trained on two GPUs. It won the ImageNet challenge with a top-5 error of $15.3\%$ against $26.2\%$ for the next entry.
- **VGG** (Simonyan and Zisserman, 2015): uniform stacks of $3\times3$ convolutions, $16$ or $19$ layers; VGG-16 has about $138$ million parameters, most in its fully connected layers.
- **GoogLeNet / Inception** (Szegedy et al., 2015): parallel branches with different kernel sizes, and $1\times1$ convolutions to reduce channels before expensive ones; $22$ layers with far fewer parameters than VGG.
- **ResNet** (He, Zhang, Ren and Sun, 2016): residual blocks ([[neural-networks/initialisation-normalisation#def-residual]]) with batch normalisation, from $18$ to $152$ layers on ImageNet. The **bottleneck** block of the deeper versions applies a $1\times1$ convolution reducing the channels by four, a $3\times3$ convolution, and a $1\times1$ convolution restoring them. ResNet-50 has about $25.6$ million parameters and needs about $3.8\times10^9$ multiply–adds per $224\times224$ image.

::: proposition The cost of a bottleneck block {#prop-bottleneck}
A residual block on $C$ channels with two $3\times3$ convolutions has $18C^2$ weights. A bottleneck block on $4C$ channels — $1\times1$ to $C$ channels, $3\times3$ on $C$ channels, $1\times1$ back to $4C$ — has $17C^2$ weights, although it carries four times as many channels in its residual stream.
:::

::: proof
Two $3\times3$ convolutions on $C$ channels: $2\cdot9C^2 = 18C^2$. Bottleneck: $4C\cdot C$ for the first $1\times1$, $9C^2$ for the $3\times3$, $C\cdot4C$ for the last $1\times1$, total $4C^2 + 9C^2 + 4C^2 = 17C^2$ (biases and normalisation parameters ignored). FLOPs scale the same way, each weight being used once per spatial position.
:::

After ResNet came refinements — wider residual networks, grouped and depthwise convolutions (ResNeXt, MobileNet, EfficientNet) — and then a challenge from Transformers. The **vision Transformer** (ViT; Dosovitskiy et al., 2021) cuts an image into $16\times16$ patches, embeds each linearly, and processes the sequence of patch embeddings with a standard Transformer encoder ([[transformers]]). The patch embedding *is* a convolution with kernel size and stride both $16$. Trained on enough data, ViTs matched or exceeded CNNs; with less data, the CNN's built-in locality and equivariance gave it the edge. ConvNeXt (Liu et al., 2022) then showed that a CNN modernised with Transformer-era design choices — larger kernels, layer normalisation, GELU, fewer activations — is competitive again. As of 2026 both families are in wide use, and many multimodal language models encode images with ViT-style encoders ([[multimodal]]).

::: example The patch embedding of a vision Transformer {#ex-vit}
ViT-Base embeds $224\times224$ RGB images with $16\times16$ patches into $d = 768$ dimensions. How many patch tokens are there, and how many parameters does the patch embedding have when written as a convolution?
::: solution
$224/16 = 14$ patches per side, so $14^2 = 196$ tokens (plus one classification token in the original model). As a convolution with $C_{\text{in}} = 3$, $C_{\text{out}} = 768$, $k = s = 16$: $16\cdot16\cdot3\cdot768 + 768 = 590{,}592$ parameters. By [[#prop-conv-size]] the output is $768\times14\times14$, which is flattened into a sequence of $196$ vectors of dimension $768$. Because the stride equals the kernel size, the patches do not overlap, and this "convolution" is just a linear layer applied to each flattened $768$-pixel patch.
:::
:::

::: quiz
A $3\times3$ convolution with $256$ input and $256$ output channels is applied with stride $1$ and padding $1$ to a $56\times56$ feature map. Which statement is correct?
- [ ] The output is $54\times54$
- [x] The layer has $589{,}824$ weights and its output is $56\times56$
- [ ] The layer has $256\cdot256 = 65{,}536$ weights
- [ ] Its cost does not depend on the spatial size, since the weights are shared
::: solution
By [[#prop-conv-size]], $H' = (56 + 2 - 3)/1 + 1 = 56$, and the weights number $3\cdot3\cdot256\cdot256 = 589{,}824$. Weight sharing makes the *parameter count* independent of the spatial size, but the cost, $2\cdot589{,}824\cdot56^2\approx3.7\times10^9$ FLOPs, grows with the number of positions.
:::
:::

::: history
David Hubel and Torsten Wiesel's recordings from the cat visual cortex (1959, 1962) found "simple" cells responding to oriented edges at particular positions and "complex" cells responding to the same edges over a range of positions. Kunihiko Fukushima's **neocognitron** (1980) built a hierarchy of such layers, with shared weights and pooling, trained without backpropagation. Yann LeCun and colleagues at Bell Labs trained convolutional networks by backpropagation to read ZIP codes (1989) and cheques (LeNet-5, 1998), and Alex Waibel's time-delay neural networks (1989) applied the same idea to speech. The field's turning point was the ImageNet dataset (Deng et al., 2009) and AlexNet's 2012 win by Alex Krizhevsky, Ilya Sutskever and Geoffrey Hinton, enabled by GPUs. VGG and GoogLeNet followed in 2014, and Kaiming He, Xiangyu Zhang, Shaoqing Ren and Jian Sun's residual networks won the 2015 competition with $152$ layers, surpassing a reported human-level error on the classification task. The vision Transformer (2021) brought the Transformer to vision.
:::

::: summary
- A **convolution layer** applies the same small kernel at every position: locality and weight sharing reduce parameters to $k^2C_{\text{in}}C_{\text{out}}$, independent of the image size, while the cost is $2k^2C_{\text{in}}C_{\text{out}}H'W'$ FLOPs. The output side is $\lfloor(H + 2p - k)/s\rfloor + 1$.
- Convolution is a linear map with a banded, weight-shared matrix, and stride-$1$ convolutions are **translation-equivariant**; pooling over positions turns equivariance into invariance.
- Its **backward pass** is two convolutions: the input gradient convolves the output gradient with the flipped kernel, the kernel gradient correlates input with output gradient.
- **Receptive fields** grow by $(k_\ell - 1)$ times the accumulated stride per layer; stacks of $3\times3$ kernels match larger kernels with fewer weights and more nonlinearities.
- The line LeNet $\to$ AlexNet $\to$ VGG $\to$ Inception $\to$ ResNet made networks deeper with ReLU, normalisation, $1\times1$ bottlenecks and residual connections; the vision Transformer treats patches as tokens, and its patch embedding is a strided convolution.
:::

## Exercises

::: exercise An output size {level=1 check="27"}
A $5\times5$ convolution with stride $2$ and padding $2$ is applied to a $53\times53$ input. What is the output size?
::: solution
$\lfloor(53 + 4 - 5)/2\rfloor + 1 = \lfloor26\rfloor + 1 = 27$, so $27\times27$.
:::
:::

::: exercise Counting parameters {level=1 check="73856"}
How many parameters (including biases) does a $3\times3$ convolution from $64$ to $128$ channels have?
::: solution
$3\cdot3\cdot64\cdot128 + 128 = 73{,}728 + 128 = 73{,}856$.
:::
:::

::: exercise A receptive field {level=1 check="13"}
Find the receptive field of a stack of four $3\times3$ convolutions in which the second has stride $2$ and the others stride $1$.
::: solution
In [[#eq-receptive]] each layer's contribution $k_\ell - 1 = 2$ is multiplied by the product of the strides of the layers *before* it: $1$, $1$, $2$, $2$ for layers $1$ to $4$. So $r = 1 + 2\cdot1 + 2\cdot1 + 2\cdot2 + 2\cdot2 = 13$. Without the stride the field would be $9$.
:::
:::

::: exercise Depthwise separable savings {level=2 check="(9*256+256^2)/(9*256^2)"}
Compare the weights of a $3\times3$ convolution from $256$ to $256$ channels with a depthwise separable convolution (depthwise $3\times3$ on $256$ channels, then $1\times1$ from $256$ to $256$). Give the ratio.
::: solution
Standard: $9\cdot256^2 = 589{,}824$. Separable: $9\cdot256 + 256^2 = 2{,}304 + 65{,}536 = 67{,}840$. Ratio $67{,}840/589{,}824 = 0.115$, close to $1/k^2 + 1/C = 1/9 + 1/256$. The FLOPs fall by the same ratio, at some cost in accuracy that architectures such as MobileNet recover with more channels.
:::
:::

::: exercise The cost of a layer {level=2 check="2*9*256*256*56*56"}
Compute the FLOPs per image of the layer in the quiz, and the FLOPs of a training step on a batch of $256$ images for that layer alone.
::: solution
Forward: $2\cdot9\cdot256\cdot256\cdot56\cdot56 = 3.70\times10^9$ FLOPs per image. A training step costs about three times the forward pass ([[neural-networks/backpropagation#prop-flops]]), so $3\cdot256\cdot3.70\times10^9\approx2.8\times10^{12}$ FLOPs for this one layer.
:::
:::

::: exercise Equivariance and stride {level=2}
Show by an example in one dimension that a convolution with stride $2$ is not equivariant to a shift by one position. To which shifts is it equivariant, and in what sense?
::: solution
Take the kernel $(1)$ of size $1$ with stride $2$: it keeps the even-indexed entries, $y_i = x_{2i}$. For $\mathbf{x} = (1, 0, 0, 0)$, $\mathbf{y} = (1, 0)$; shifting the input by one gives $(0, 1, 0, 0)$ and $\mathbf{y} = (0, 0)$, which is not a shift of $(1, 0)$. A shift of the input by $2$ positions shifts the output by $1$: $(T_2\mathbf{x})_{2i} = x_{2i-2} = y_{i-1}$. So a stride-$s$ convolution is equivariant to shifts by multiples of $s$, with the output shifted by the shift divided by $s$. Repeated downsampling compounds this, which is why the outputs of CNNs can change noticeably under one-pixel shifts.
:::
:::

::: exercise Convolution as a matrix {level=2}
Write the matrix $M$ of a 1D convolution with kernel $(w_0, w_1)$, stride $1$, no padding, on inputs of length $4$. Then show that $M^\top\bar{\mathbf{y}}$ equals the input gradient of [[#prop-conv-backward]].
::: solution
The output has length $3$ and $M = \begin{pmatrix}w_0&w_1&0&0\\0&w_0&w_1&0\\0&0&w_0&w_1\end{pmatrix}$. Then $M^\top\bar{\mathbf{y}} = (w_0\bar y_0,\ w_1\bar y_0 + w_0\bar y_1,\ w_1\bar y_1 + w_0\bar y_2,\ w_1\bar y_2)$, and [[#prop-conv-backward]] gives $\bar x_r = \sum_aw_a\bar y_{r-a}$: $\bar x_0 = w_0\bar y_0$, $\bar x_1 = w_0\bar y_1 + w_1\bar y_0$, $\bar x_2 = w_0\bar y_2 + w_1\bar y_1$, $\bar x_3 = w_1\bar y_2$ — the same. The input gradient of any linear layer is multiplication by the transpose, here a "transposed convolution".
:::
:::

::: exercise A bottleneck versus a basic block {level=3 check="17/18"}
Using [[#prop-bottleneck]], find the ratio of the weights of a bottleneck block on $4C$ channels to a basic block on $C$ channels. Then compute the weights of each for $C = 64$, and explain why ResNet-50 uses bottleneck blocks although they are deeper.
::: solution
$17C^2/18C^2 = 17/18\approx0.944$. For $C = 64$: basic block $18\cdot4{,}096 = 73{,}728$ weights; bottleneck $17\cdot4{,}096 = 69{,}632$ weights, with a residual stream of $256$ channels instead of $64$. For about the same parameters and cost, the bottleneck block has three nonlinear layers instead of two and a four times wider representation passed along the skip connections, which allowed He et al. to build $50$-, $101$- and $152$-layer networks at modest cost. The $1\times1$ convolutions do the channel mixing cheaply; only the narrow middle layer pays the $k^2$ factor.
:::
:::

::: exercise Receptive field of a dilated stack {level=3 check="2^8"}
WaveNet stacks one-dimensional causal convolutions with kernel size $2$ and dilations $1, 2, 4, \dots, 2^{L-1}$ (stride $1$). A dilation $d$ makes the kernel's two taps $d$ positions apart, which in [[#eq-receptive]] replaces $k_\ell - 1$ by $(k_\ell - 1)d_\ell$. Find the receptive field of such a stack with $L = 8$, and compare with an undilated stack of the same depth.
::: solution
$r = 1 + \sum_{\ell=1}^L(2 - 1)\,2^{\ell-1} = 1 + (2^L - 1) = 2^L$. For $L = 8$, $r = 256$ samples. An undilated stack of $8$ kernels of size $2$ has $r = 1 + 8 = 9$. Dilation gives exponential growth of the receptive field with depth at no extra cost per layer — a way to see long contexts with convolutions, which WaveNet repeated in several such stacks.
:::
:::

::: exercise Global average pooling and parameters {level=3}
The last convolutional stage of ResNet-50 outputs $2{,}048$ channels on a $7\times7$ grid. Compare the parameters of a classifier for $1{,}000$ classes that (a) flattens the feature map and applies a fully connected layer, and (b) applies global average pooling first. What else does (b) gain?
::: solution
(a) The flattened input has $2{,}048\cdot49 = 100{,}352$ features, so the layer needs $100{,}352\cdot1{,}000 + 1{,}000\approx1.0\times10^8$ parameters — four times the rest of ResNet-50. (b) After pooling the input has $2{,}048$ features: $2{,}048\cdot1{,}000 + 1{,}000 = 2{,}049{,}000$ parameters, a factor of $49$ fewer. Global pooling also makes the network accept inputs of any size (the grid may be $7\times7$ or $10\times10$; the pooled vector has $2{,}048$ entries either way) and makes the prediction invariant to where in the image the evidence appears, completing the equivariance-to-invariance step. VGG's huge fully connected layers, which held most of its $138$ million parameters, illustrate the cost of option (a).
:::
:::
