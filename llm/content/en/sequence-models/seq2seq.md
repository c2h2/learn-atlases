Many language tasks map one sequence to another of a different length: a French sentence to an English one, a document to its summary, a question to an answer, an audio recording to its transcript. Until 2014, machine translation was done by phrase-based statistical systems assembled from many separately trained parts — word alignments, phrase tables, a reordering model, an $n$-gram language model — tuned together. The **sequence-to-sequence** (seq2seq) or **encoder–decoder** model replaced the whole pipeline by one neural network trained end to end: a recurrent **encoder** reads the source sentence into a vector, and a recurrent **decoder**, a conditional language model, writes the target sentence from it one token at a time.

This chapter defines the model as a conditional language model, shows that training it by maximum likelihood is exactly **teacher forcing**, implements a small encoder–decoder in plain Python with a gradient check, and analyses its two characteristic weaknesses: the **fixed-size bottleneck** between encoder and decoder, which [[sequence-models/attention-mechanism]] removes, and **exposure bias**, the mismatch between training on true prefixes and generating from the model's own. How to turn the trained model into an output sentence — greedy and beam search — is the subject of [[sequence-models/decoding-basics]].

## Conditional language models {#sec-conditional}

Write the source as $\mathbf{x} = (x_1, \dots, x_S)$ and the target as $\mathbf{y} = (y_1, \dots, y_n)$, with tokens from vocabularies $\mathcal{V}_{\text{src}}$ and $\mathcal{V}_{\text{tgt}}$. Add to the target vocabulary a beginning-of-sequence token $\langle\text{bos}\rangle$ and an end-of-sequence token $\langle\text{eos}\rangle$, and always end the target with $y_{n+1} = \langle\text{eos}\rangle$.

::: definition Conditional language model {#def-clm}
A **conditional language model** defines the probability of a target sequence given a source by the chain rule,

$$
p_\theta(\mathbf{y}\mid\mathbf{x}) = \prod_{t=1}^{n+1}p_\theta(y_t\mid y_{<t}, \mathbf{x}),\qquad y_{n+1} = \langle\text{eos}\rangle .
$$ {#eq-clm}

Generating $\langle\text{eos}\rangle$ ends the output, so the model chooses the output length itself; the probabilities of all finite sequences ending in $\langle\text{eos}\rangle$ sum to at most $1$.
:::

The $\langle\text{eos}\rangle$ token is what makes [[#eq-clm]] a distribution over sequences of *all* lengths: without it, the product would only describe prefixes. An unconditional language model ([[sequence-models/recurrent-networks#def-rnnlm]]) is the special case of an empty source. A translation model, a summariser and a speech recogniser are conditional language models with different sources.

## The encoder–decoder {#sec-encdec}

::: definition RNN encoder–decoder {#def-encdec}
An **RNN encoder–decoder** consists of

- an **encoder** RNN that reads the embedded source, $\mathbf{h}^{\text{enc}}_s = f_{\text{enc}}(\mathbf{h}^{\text{enc}}_{s-1}, E_{\text{src}}[x_s])$ for $s = 1, \dots, S$, and produces a **context vector** $\mathbf{c} = \mathbf{h}^{\text{enc}}_S$ (or a function of it);
- a **decoder** RNN, initialised from the context, $\mathbf{h}^{\text{dec}}_0 = \tanh(W_c\mathbf{c})$ or simply $\mathbf{c}$, that reads the previous target token, $\mathbf{h}^{\text{dec}}_t = f_{\text{dec}}(\mathbf{h}^{\text{dec}}_{t-1}, E_{\text{tgt}}[y_{t-1}])$ with $y_0 = \langle\text{bos}\rangle$, and predicts

$$
p_\theta(y_t\mid y_{<t}, \mathbf{x}) = \operatorname{softmax}\big(W_y\mathbf{h}^{\text{dec}}_t + \mathbf{b}_y\big)_{y_t} .
$$ {#eq-decoder}

$f_{\text{enc}}$ and $f_{\text{dec}}$ are recurrent cells — simple, LSTM or GRU ([[sequence-models/long-range-dependencies]]) — with separate parameters.
:::

Two versions appeared within months of each other in 2014. Sutskever, Vinyals and Le used four-layer LSTMs and passed the context only through the decoder's initial state, exactly as in [[#def-encdec]]. Cho et al. used GRUs and fed $\mathbf{c}$ into *every* decoder step and into the output layer, $\mathbf{h}^{\text{dec}}_t = f_{\text{dec}}(\mathbf{h}^{\text{dec}}_{t-1}, E[y_{t-1}], \mathbf{c})$ and $p(y_t\mid\dots) = g(\mathbf{h}^{\text{dec}}_t, E[y_{t-1}], \mathbf{c})$, so that the decoder need not carry the source through its own state. Kalchbrenner and Blunsom (2013) had earlier conditioned a recurrent decoder on a convolutional encoding of the source.

::: widget graph
nodes: x1@0,0; x2@1,0; x3@2,0; e1@0,1; e2@1,1; e3@2,1; c@3,1.5; d1@4,1; d2@5,1; d3@6,1; bos@4,0; y1@5,0; y2@6,0; o1@4,2; o2@5,2; o3@6,2
edges: x1>e1; x2>e2; x3>e3; e1>e2; e2>e3; e3>c; c>d1; bos>d1; d1>d2; y1>d2; d2>d3; y2>d3; d1>o1; d2>o2; d3>o3
algorithm: topo
start: x1
caption: An encoder–decoder unrolled for a three-token source and a target of two tokens plus $\langle\text{eos}\rangle$. The encoder states $e_s$ read the source; the last one becomes the context $c$, which initialises the decoder. Each decoder state $d_t$ reads the previous target token ($\langle\text{bos}\rangle$, then $y_1$, $y_2$) and produces an output distribution $o_t$ over the next token, the last of which should put its mass on $\langle\text{eos}\rangle$. Every path from the source to the outputs passes through the single node $c$ — the bottleneck that attention removes.
:::

Sutskever et al. made two observations that shaped practice. First, the model could only be trained well if the source was fed in **reverse** order: with "a b c" read as "c b a", the first source word sits right next to the first target word in the unrolled graph, creating short-range dependencies that get optimisation started; reversing raised their single model from $25.9$ to $30.6$ BLEU on WMT'14 English→French and lowered test perplexity from $5.8$ to $4.7$. Second, the model was large. With $1{,}000$ cells per layer, $1{,}000$-dimensional embeddings, a $160{,}000$-word source vocabulary and an $80{,}000$-word target vocabulary it had $384$ million parameters, most of them in embeddings and output layer ([[#ex-sutskever]]). An ensemble of five such models reached $34.8$ BLEU, ahead of a phrase-based baseline at $33.3$, and using the LSTMs to rescore the baseline's $1{,}000$ best candidate translations gave $36.5$.

::: example Where the 384 million parameters are {#ex-sutskever}
Reconstruct the parameter count of Sutskever et al.'s model: an encoder and a decoder, each four LSTM layers of $H = 1{,}000$ with $1{,}000$-dimensional inputs, source and target embedding tables, and a softmax over the target vocabulary.
::: solution
One LSTM layer with $d = H = 1{,}000$ has $4\big(H(H + d) + H\big) = 4(2{,}000{,}000 + 1{,}000) = 8{,}004{,}000$ parameters ([[sequence-models/long-range-dependencies#def-lstm]]). Eight layers: about $64$ million — the "$64$M pure recurrent connections" of the paper. Embeddings: $160{,}000\cdot1{,}000 + 80{,}000\cdot1{,}000 = 240$ million. Output layer: $80{,}000\cdot1{,}000 = 80$ million. Total $64 + 240 + 80 = 384$ million. Five sixths of the model is lookup tables and the output projection; the part that actually models sequences is a sixth. This is why vocabulary size was such a pressing problem in neural translation and why subword vocabularies of $30{,}000$ or so units (Sennrich, Haddow and Birch, 2016) were quickly adopted.
:::
:::

## Training by maximum likelihood {#sec-training}

Given a parallel corpus of pairs $(\mathbf{x}^{(m)}, \mathbf{y}^{(m)})$, the parameters are chosen to maximise the conditional log-likelihood, or equivalently to minimise

$$
\mathcal{L}(\theta) = -\sum_m\log p_\theta\big(\mathbf{y}^{(m)}\mid\mathbf{x}^{(m)}\big) .
$$ {#eq-mle}

::: definition Teacher forcing {#def-teacher-forcing}
**Teacher forcing** trains a decoder by feeding it, at step $t$, the *reference* previous token $y_{t-1}$ from the training data (with $y_0 = \langle\text{bos}\rangle$), regardless of what the model would have predicted, and summing the cross-entropy losses $-\log p_\theta(y_t\mid y_{<t}, \mathbf{x})$ over $t = 1, \dots, n + 1$.
:::

The name suggests a heuristic, but nothing is being approximated.

::: proposition Teacher forcing is maximum likelihood {#prop-tf-mle}
For a model of the form [[#eq-clm]], the teacher-forced loss of a pair $(\mathbf{x}, \mathbf{y})$ equals $-\log p_\theta(\mathbf{y}\mid\mathbf{x})$ exactly, and so its gradient is the exact gradient of the negative log-likelihood [[#eq-mle]].
:::

::: proof
Taking logarithms of [[#eq-clm]] gives $-\log p_\theta(\mathbf{y}\mid\mathbf{x}) = \sum_{t=1}^{n+1}-\log p_\theta(y_t\mid y_{<t}, \mathbf{x})$. The $t$-th term is a conditional probability *given the reference prefix* $y_{<t}$, and the decoder computes it by reading exactly that prefix — which is what teacher forcing feeds it. The sum of the teacher-forced losses is therefore the negative log-likelihood itself, and differentiating both sides gives equal gradients. Summing over the pairs of the corpus gives [[#eq-mle]].
:::

So teacher forcing is not a training trick that might be replaced by something more principled within maximum likelihood; it *is* maximum likelihood for an autoregressive model. It also makes training efficient: all $n + 1$ conditional distributions are computed in one pass over the reference, and, in a Transformer decoder, in parallel across positions ([[transformers/multi-head-attention]]). The gradient flows from every output loss back through the decoder, through the context vector, and through the encoder — one BPTT over the concatenated graph.

::: example A teacher-forced loss by hand {#ex-tf-loss}
A decoder, given the source "ich bin müde" and the reference "i am tired ⟨eos⟩", assigns the reference tokens the probabilities $0.6$, $0.5$, $0.2$, $0.9$ under teacher forcing. What are the loss, the per-token loss and the perplexity of this pair? What changes if the model, run freely, would have produced "i am sleepy"?
::: solution
$-\log p(\mathbf{y}\mid\mathbf{x}) = -(\ln0.6 + \ln0.5 + \ln0.2 + \ln0.9) = 0.5108 + 0.6931 + 1.6094 + 0.1054 = 2.9188$ nats. Per token (four predictions, including $\langle\text{eos}\rangle$): $0.7297$; perplexity $e^{0.7297} = 2.07$. Nothing changes: the loss is computed on the reference prefix regardless of what the model would generate. Under teacher forcing the $\langle\text{eos}\rangle$ prediction is made after "i am tired", even if the model would never have produced "tired" itself — which is precisely the gap discussed in [[#sec-exposure]].
:::
:::

::: example A padded batch {#ex-batch}
A batch holds three pairs with source lengths $5, 3, 4$ and target lengths $4, 6, 2$ (before $\langle\text{eos}\rangle$). Sources and targets are padded to the longest in the batch. With hidden size $H = 512$ and target vocabulary $32{,}000$, give the shapes of the encoder states, of the decoder logits and of the loss mask, the number of real loss terms, and say where the context of each source must be taken.
::: solution
Sources are padded to $S = 5$: the encoder states form a $(3, 5, 512)$ tensor. Decoder inputs are $\langle\text{bos}\rangle y_1\dots y_n$ and targets $y_1\dots y_n\langle\text{eos}\rangle$, so the decoder length is $\max(n) + 1 = 7$: logits $(3, 7, 32{,}000)$, mask $(3, 7)$ with ones in the first $5$, $7$ and $3$ positions of the three rows. The loss has $5 + 7 + 3 = 15$ real terms out of $21$ slots; the six padded slots are multiplied by $0$, and the summed loss is divided by $15$ (not $21$) for a per-token average. The context must be the encoder state at each sequence's *true* last position — positions $5$, $3$ and $4$ — not position $5$ for all, or the shorter sources' contexts will have read padding tokens. Frameworks either gather those states with the lengths or "pack" the batch so that each sequence stops at its own length. Sorting or bucketing pairs by length before batching reduces the wasted slots.
:::
:::

## A small encoder–decoder {#sec-code}

The listing trains a simple-RNN encoder–decoder to **reverse** sequences of $2$ to $5$ symbols from $\{a, b, c, d\}$. The decoder starts from the encoder's last state and has its own embedding table; the output layer is shared over steps. The backward pass is BPTT through the decoder, whose gradient at its initial state is then passed into the encoder as the gradient of its last state — the encoder has no losses of its own. After training it measures two numbers that will matter below: per-token accuracy under teacher forcing, and accuracy of whole sequences produced by greedy decoding, in which the model's own predictions are fed back.

```python
import math, random

SYM = "abcd"; BOS, EOS = 4, 5; V = 6          # token ids: a b c d <bos> <eos>
H = 24
rng = random.Random(0)
def mat(r, c, s): return [[rng.gauss(0, s) for _ in range(c)] for _ in range(r)]
def mv(M, v): return [sum(m * x for m, x in zip(row, v)) for row in M]
P = {"Ee": mat(H, V, 0.5), "Ue": mat(H, H, 1 / math.sqrt(H)), "be": [0.0] * H,   # encoder
     "Ed": mat(H, V, 0.5), "Ud": mat(H, H, 1 / math.sqrt(H)), "bd": [0.0] * H,   # decoder
     "Wy": mat(V, H, 0.1), "by": [0.0] * V}

def cell(E, U, b, h, x):                       # tanh(U h + E[:, x] + b), x a token id
    return [math.tanh(e[x] + u + bb) for e, u, bb in zip(E, mv(U, h), b)]

def softmax(z):
    m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e); return [v / s for v in e]

def loss_grad(P, src, tgt):
    """Teacher forcing: decoder inputs <bos> y1 .. yn, targets y1 .. yn <eos>."""
    he = [[0.0] * H]
    for x in src: he.append(cell(P["Ee"], P["Ue"], P["be"], he[-1], x))
    din, dout = [BOS] + tgt, tgt + [EOS]
    hd, ps, loss = [he[-1]], [], 0.0           # decoder starts from the encoder's last state
    for x, y in zip(din, dout):
        hd.append(cell(P["Ed"], P["Ud"], P["bd"], hd[-1], x))
        p = softmax([u + b for u, b in zip(mv(P["Wy"], hd[-1]), P["by"])])
        ps.append(p); loss -= math.log(p[y])
    G = {k: ([[0.0] * len(v[0]) for _ in v] if isinstance(v[0], list) else [0.0] * len(v))
         for k, v in P.items()}
    def back(E, U, b, hs, xs, dh_out, dh, gE, gU, gb):
        """BPTT through one RNN. dh_out[t]: gradient into h_{t+1} from its output
        layer (or None); dh: gradient into the last state. Returns dL/dh_0."""
        for t in range(len(xs), 0, -1):
            if dh_out: dh = [a + c for a, c in zip(dh, dh_out[t - 1])]
            da = [d * (1 - h * h) for d, h in zip(dh, hs[t])]
            for i in range(H):
                gb[i] += da[i]; gE[i][xs[t - 1]] += da[i]
                for j in range(H): gU[i][j] += da[i] * hs[t - 1][j]
            dh = [sum(U[i][j] * da[i] for i in range(H)) for j in range(H)]
        return dh
    dh_out = []                                # output-layer gradients into decoder states
    for t, (p, y) in enumerate(zip(ps, dout)):
        dz = p[:]; dz[y] -= 1
        for k in range(V):
            G["by"][k] += dz[k]
            for j in range(H): G["Wy"][k][j] += dz[k] * hd[t + 1][j]
        dh_out.append([sum(P["Wy"][k][j] * dz[k] for k in range(V)) for j in range(H)])
    dh0 = back(P["Ed"], P["Ud"], P["bd"], hd, din, dh_out, [0.0] * H, G["Ed"], G["Ud"], G["bd"])
    back(P["Ee"], P["Ue"], P["be"], he, src, None, dh0, G["Ee"], G["Ue"], G["be"])
    return loss, G

def greedy(P, src, max_len=8):
    h = [0.0] * H
    for x in src: h = cell(P["Ee"], P["Ue"], P["be"], h, x)
    out, x = [], BOS
    for _ in range(max_len):
        h = cell(P["Ed"], P["Ud"], P["bd"], h, x)
        z = [u + b for u, b in zip(mv(P["Wy"], h), P["by"])]
        x = max(range(V), key=lambda k: z[k])
        if x == EOS: break
        out.append(x)                          # feed the model's own prediction back in
    return out

def example(r):
    src = [r.randrange(4) for _ in range(r.randint(2, 5))]
    return src, src[::-1]                      # task: reverse the sequence

# gradient check
src, tgt = example(rng)
L, G = loss_grad(P, src, tgt)
for k, i, j in [("Ue", 1, 2), ("Ee", 0, src[0]), ("Ud", 3, 4), ("Wy", 2, 5)]:
    o = P[k][i][j]; P[k][i][j] = o + 1e-5; a = loss_grad(P, src, tgt)[0]
    P[k][i][j] = o - 1e-5; b = loss_grad(P, src, tgt)[0]; P[k][i][j] = o
    print(f"{k}[{i}][{j}]  bptt {G[k][i][j]: .8f}  numeric {(a - b) / 2e-5: .8f}")

def evaluate(P, n=300):
    r = random.Random(123); tok = tot = seq = 0
    for _ in range(n):
        src, tgt = example(r)
        h = [0.0] * H                          # teacher-forced: true prefix as input
        for x in src: h = cell(P["Ee"], P["Ue"], P["be"], h, x)
        for x, y in zip([BOS] + tgt, tgt + [EOS]):
            h = cell(P["Ed"], P["Ud"], P["bd"], h, x)
            z = [u + b for u, b in zip(mv(P["Wy"], h), P["by"])]
            tok += max(range(V), key=lambda k: z[k]) == y; tot += 1
        seq += greedy(P, src) == tgt
    return tok / tot, seq / n

lr = 0.05
for step in range(1, 20001):
    src, tgt = example(rng)
    L, G = loss_grad(P, src, tgt)
    n = math.sqrt(sum(g * g for v in G.values() for r in v for g in (r if isinstance(r, list) else [r])))
    c = min(1.0, 5.0 / n)
    for k in P:
        if isinstance(P[k][0], list):
            for r, gr in zip(P[k], G[k]):
                for j in range(len(r)): r[j] -= lr * c * gr[j]
        else:
            for j in range(len(P[k])): P[k][j] -= lr * c * G[k][j]
    if step % 5000 == 0:
        tf, fr = evaluate(P)
        print(f"step {step:5d}  teacher-forced token acc {tf:.3f}  free-running sequence acc {fr:.3f}")
for s in ["abc", "dacb", "abcda"]:
    print(s, "->", "".join(SYM[t] for t in greedy(P, [SYM.index(ch) for ch in s])))
r = random.Random(7)                           # lengths 6-8 never occur in training
for n in range(2, 9):
    ok = 0
    for _ in range(200):
        src = [r.randrange(4) for _ in range(n)]
        ok += greedy(P, src, max_len=12) == src[::-1]
    print(f"length {n}: free-running sequence accuracy {ok / 200:.3f}")
```

Output (about fifty seconds):

```
Ue[1][2]  bptt -0.03562848  numeric -0.03562848
Ee[0][3]  bptt -0.03736190  numeric -0.03736190
Ud[3][4]  bptt  0.05855906  numeric  0.05855906
Wy[2][5]  bptt -0.16718311  numeric -0.16718311
step  5000  teacher-forced token acc 0.980  free-running sequence acc 0.927
step 10000  teacher-forced token acc 0.997  free-running sequence acc 0.987
step 15000  teacher-forced token acc 0.998  free-running sequence acc 0.990
step 20000  teacher-forced token acc 0.997  free-running sequence acc 0.987
abc -> cba
dacb -> bcad
abcda -> adcba
length 2: free-running sequence accuracy 1.000
length 3: free-running sequence accuracy 1.000
length 4: free-running sequence accuracy 0.970
length 5: free-running sequence accuracy 0.965
length 6: free-running sequence accuracy 0.015
length 7: free-running sequence accuracy 0.000
length 8: free-running sequence accuracy 0.000
```

The gradient check passes for parameters of the encoder ($U_e$, $E_e$), the decoder ($U_d$) and the output layer, which confirms that the error reaches the encoder through the context. The model learns the task on the lengths it was trained on. Two features of the output are worth noticing. Free-running sequence accuracy is always below teacher-forced token accuracy: at step $5{,}000$, a per-token accuracy of $0.980$ over on average $4.5$ predictions per sequence (including $\langle\text{eos}\rangle$) would give $0.980^{4.5}\approx0.91$ if the errors were independent, close to the measured $0.927$. And the model **does not generalise to longer inputs at all**: on sources of length $6$ it is almost never right. Inspecting its outputs (not shown in the listing) reveals that on length-$6$ inputs about two thirds of its outputs have exactly five symbols — the longest length it has seen. It has learned the training distribution of lengths along with the task. Length generalisation of this kind remains a hard problem for neural sequence models of every architecture.

## The bottleneck {#sec-bottleneck}

In [[#def-encdec]] everything the decoder knows about the source must pass through the context $\mathbf{c}\in\R^H$. For a four-symbol reversal, $24$ numbers are ample. For a $50$-word sentence, a single vector of $1{,}000$ numbers must encode which words occurred, in which order, with which syntactic relations, in a form from which the decoder can extract the right word at each step. Cho et al. (2014b) measured BLEU against sentence length for RNN encoder–decoders and found that translation quality dropped sharply as sentences grew longer; Bahdanau, Cho and Bengio (2015) then showed the drop largely disappears with attention. (Sutskever et al. reported that their much larger, reversed-input LSTM did not degrade much on long sentences — a reminder that the size of the effect depended on the model.)

::: proposition Information through a fixed context {#prop-bottleneck}
Let the context $\mathbf{c}$ take values in a set $\mathcal{C}$. If the decoder's output is a deterministic function of $\mathbf{c}$ (greedy decoding), then the encoder–decoder can produce at most $\lvert\mathcal{C}\rvert$ distinct outputs. In particular, a context of $H$ numbers in $b$-bit floating point can distinguish at most $2^{bH}$ sources, so a model that must reproduce any sequence of $n$ symbols from an alphabet of size $A$ needs $bH\ge n\log_2A$.
:::

::: proof
The decoder's computation from $\mathbf{h}^{\text{dec}}_0$ on is a deterministic function of $\mathbf{c}$ (each step's input is the previous step's argmax), so the output is $F(\mathbf{c})$ for a fixed function $F$, and $F$ takes at most $\lvert\mathcal{C}\rvert$ values. A vector of $H$ numbers with $b$ bits each has at most $2^{bH}$ values. If every one of the $A^n$ sequences must be produced for some source, $F$ must take at least $A^n$ values, so $2^{bH}\ge A^n$, i.e. $bH\ge n\log_2A$.
:::

The counting bound is very loose — $1{,}000$ numbers in 32-bit floats could in principle index $2^{32{,}000}$ sources — but it makes the point that the capacity is fixed while the input grows. The practical limit is not counting but learnability: a smooth network trained by gradient descent cannot use the context's precision the way a hash function would. The natural fix is to let the decoder consult *all* encoder states, $\mathbf{h}^{\text{enc}}_1, \dots, \mathbf{h}^{\text{enc}}_S$, a memory that grows with the input. That is attention, the subject of [[sequence-models/attention-mechanism]].

::: quiz
Why did Sutskever et al.'s reversal of the source sentence help training?
- [ ] It halves the number of steps the encoder must run.
- [ ] It makes the encoder bidirectional.
- [x] It places the first source words close, in the unrolled graph, to the first target words, creating short dependencies that are easy to learn first.
- [ ] Reversed sentences have lower perplexity.
::: solution
After reversal the first source word is read last, immediately before the decoder starts producing the first target word, so early target words depend on recent encoder states. The average distance between corresponding words is unchanged, but there are now many short dependencies for gradient descent to pick up first — an optimisation effect, as the authors argued. A bidirectional encoder or attention achieves the same more systematically.
:::
:::

## Exposure bias {#sec-exposure}

Teacher forcing trains every conditional $p_\theta(y_t\mid y_{<t}, \mathbf{x})$ on reference prefixes. At test time the prefix is the model's own output. If the model makes a mistake at step $t$, every later step is conditioned on a prefix that never occurred in training, and the model has no experience of how to recover. Ranzato et al. (2016) called this **exposure bias**: during training, the model is only exposed to the data distribution of prefixes, not to its own.

A simple model shows why this can matter more than per-token accuracy suggests. It mirrors an analysis of imitation learning by Ross and Bagnell (2010), who showed that a policy trained only on expert states can incur a cost growing quadratically in the horizon.

::: proposition Compounding errors {#prop-compounding}
Suppose that while the decoder's prefix is correct, it makes an error at each step with probability $\varepsilon$, independently; and that once it has made an error it is "off track" and errs at every later step (the worst case). Then the expected number of erroneous tokens in $T$ steps is

$$
\E[\text{errors}] = \sum_{t=1}^{T}\big(1 - (1 - \varepsilon)^t\big) = T - \frac{(1 - \varepsilon)\big(1 - (1 - \varepsilon)^T\big)}{\varepsilon}\approx\frac{\varepsilon T(T + 1)}{2}\quad(\varepsilon T\ll1),
$$ {#eq-compounding}

compared with $\varepsilon T$ under teacher forcing, where every step sees a correct prefix.
:::

::: proof
The decoder is still on track at the start of step $t$ if and only if steps $1, \dots, t - 1$ were all correct, which has probability $(1 - \varepsilon)^{t-1}$. Step $t$ is wrong if the decoder is already off track (probability $1 - (1 - \varepsilon)^{t-1}$, then wrong with certainty) or on track and errs (probability $(1 - \varepsilon)^{t-1}\varepsilon$). Adding, $\Prob(\text{error at }t) = 1 - (1 - \varepsilon)^{t-1}(1 - \varepsilon) = 1 - (1 - \varepsilon)^t$. Summing over $t$ by linearity of expectation and the geometric series $\sum_{t=1}^T(1 - \varepsilon)^t = (1 - \varepsilon)\big(1 - (1 - \varepsilon)^T\big)/\varepsilon$ gives the exact formula. For small $\varepsilon T$, $(1 - \varepsilon)^t\approx1 - t\varepsilon$, so each term is about $t\varepsilon$ and the sum about $\varepsilon T(T + 1)/2$. Under teacher forcing each step's prefix is correct, so each errs with probability $\varepsilon$ and the expectation is $\varepsilon T$.
:::

::: widget plot
f: e*x; x - (1-e)*(1-(1-e)^x)/e
x: 0, 100
sliders: e=0.02:0.001:0.2:0.001
labels: \text{teacher-forced errors } \varepsilon T; free-running, off track after the first error
caption: Expected number of wrong tokens in an output of length $T$ in the worst-case model of [[#prop-compounding]]. Per-token accuracy under teacher forcing grows the error count linearly; once one mistake derails the model, the count grows quadratically at first and then approaches $T$. Real models recover from many mistakes, so the truth lies between the two curves, and where exactly is an empirical question.
:::

The worst-case assumption is pessimistic. Real models often recover: a translation that starts with a different but acceptable word can continue fluently, and the listing's reversal model shows a gap between teacher-forced and free-running accuracy that is about what independent errors would give, not the quadratic blow-up. How much exposure bias hurts trained models has been debated; He et al. (2021), for instance, found that language models recover from much of the damage of an imposed error. The question returns, with sampling instead of argmax, in [[sequence-models/decoding-basics]].

::: widget markov
matrix: 0.95,0.05; 0,1
states: on track; off track
start: 0
steps: 30
caption: The model of [[#prop-compounding]] as a two-state Markov chain with $\varepsilon = 0.05$: from "on track" the decoder leaves with probability $0.05$ per step and never returns. After $n$ steps the probability of still being on track is $0.95^n$ — $0.36$ after $20$ steps. Edit the matrix to let the model recover (a positive entry in the bottom-left) and watch the long-run fraction of steps on track become positive.
:::

Several remedies were proposed. **Scheduled sampling** (Bengio, Vinyals, Jaitly and Shazeer, 2015) feeds the decoder its own sampled prediction instead of the reference with a probability that grows during training; it helped on several tasks, but Huszár (2015) showed that its objective is not a proper scoring rule — its optimum is not in general the true distribution. **Sequence-level training** optimises a metric of whole generated sequences: Ranzato et al. (2016) used the REINFORCE policy gradient to optimise BLEU directly, Wiseman and Rush (2016) trained with a beam-search loss, and Shen et al. (2016) minimised the expected risk under the model's samples. These ideas — train on what the model actually generates, scored at the sequence level — are ancestors of the reinforcement-learning fine-tuning of today's language models ([[post-training]]).

::: warning "Teacher forcing is an approximation to maximum likelihood"
Teacher forcing *is* maximum likelihood for an autoregressive model ([[#prop-tf-mle]]); it is not a shortcut that a more careful training method would replace with "the real gradient". What it does not do is optimise how the model behaves *when it generates*. Exposure bias is therefore a mismatch between the training objective (likelihood of reference sequences) and the use of the model (quality of generated sequences), not an error in computing the gradient. Remedies change the objective, not the gradient computation.
:::

## Evaluating outputs {#sec-bleu}

Perplexity measures how well the model predicts references, but a translation system is judged on what it outputs. The standard automatic metric of the seq2seq era was **BLEU** (Papineni, Roukos, Ward and Zhu, 2002), which compares $n$-gram overlap with one or more reference translations.

::: definition BLEU {#def-bleu}
For a candidate $\hat{\mathbf{y}}$ and a reference $\mathbf{y}$, the **modified $n$-gram precision** $p_n$ is the number of $n$-grams of $\hat{\mathbf{y}}$ that also occur in $\mathbf{y}$, each counted at most as often as it occurs in $\mathbf{y}$ ("clipped"), divided by the number of $n$-grams of $\hat{\mathbf{y}}$. With candidate length $c$ and reference length $r$, the **brevity penalty** is $\mathrm{BP} = 1$ if $c > r$ and $e^{1 - r/c}$ otherwise, and

$$
\mathrm{BLEU} = \mathrm{BP}\cdot\exp\Big(\frac14\sum_{n=1}^{4}\log p_n\Big).
$$

For a test corpus, the clipped counts, $n$-gram totals and lengths are summed over all sentences before the precisions and the penalty are formed. BLEU is usually reported multiplied by $100$.
:::

::: example BLEU of one sentence {#ex-bleu}
Reference: "the cat sat on the mat". Candidate: "the cat sat on a mat". Compute BLEU.
::: solution
Unigrams of the candidate: the, cat, sat, on, a, mat — five of six occur in the reference, so $p_1 = 5/6$. Bigrams: "the cat", "cat sat", "sat on" match, "on a", "a mat" do not: $p_2 = 3/5$. Trigrams: "the cat sat", "cat sat on" match out of four: $p_3 = 2/4$. Four-grams: "the cat sat on" matches out of three: $p_4 = 1/3$. Both sentences have six words, so $\mathrm{BP} = 1$. Then $\mathrm{BLEU} = (5/6\cdot3/5\cdot1/2\cdot1/3)^{1/4} = (1/12)^{1/4} = 0.537$, or $53.7$. One wrong word costs a lot, because it breaks every $n$-gram that spans it.
:::
:::

BLEU correlates with human judgements at the level of whole test sets for systems of similar kinds, but it is a poor judge of single sentences and of paraphrases, and its scores depend on tokenisation details; Post (2018) proposed the SacreBLEU tool to make reported numbers comparable. Learned metrics and human evaluation are discussed in [[evaluation]].

::: history
Neural networks had been applied to parts of statistical translation systems — rescoring with a neural language model, Schwenk's continuous-space models — before 2013. Nal Kalchbrenner and Phil Blunsom's "Recurrent continuous translation models" (EMNLP 2013) generated translations from a recurrent decoder conditioned on a convolutional source representation. In 2014 Kyunghyun Cho and colleagues ("Learning phrase representations using RNN encoder–decoder for statistical machine translation", EMNLP 2014) introduced the RNN encoder–decoder and the GRU, using the model to score phrase pairs inside a phrase-based system, and analysed its weakness on long sentences in a companion paper. Ilya Sutskever, Oriol Vinyals and Quoc Le ("Sequence to sequence learning with neural networks", NeurIPS 2014) showed that a pure LSTM encoder–decoder, trained on 12 million sentence pairs, could beat a phrase-based system on its own. Attention followed within months (Bahdanau, Cho and Bengio, ICLR 2015), and by 2016 production systems such as Google Neural Machine Translation (Wu et al., 2016) were attention-based LSTM encoder–decoders. The encoder–decoder structure survives in the original Transformer and in models such as T5 ([[transformers/architecture-families]]).
:::

::: summary
- A **conditional language model** factorises $p(\mathbf{y}\mid\mathbf{x}) = \prod_tp(y_t\mid y_{<t}, \mathbf{x})$ and ends outputs with $\langle\text{eos}\rangle$, so it chooses the output length.
- An **RNN encoder–decoder** reads the source into a context vector (the encoder's last state) and decodes the target with a second RNN initialised from it (Sutskever et al.) or fed it at every step (Cho et al.).
- **Teacher forcing** feeds reference prefixes during training and is exactly maximum likelihood; gradients pass from the decoder's losses through the context into the encoder.
- The single context vector is a **bottleneck** whose capacity is fixed while the input grows; quality of early models dropped on long sentences, which motivated attention.
- **Exposure bias**: at test time the model conditions on its own outputs; in a worst-case model, errors compound to $O(\varepsilon T^2)$ instead of $\varepsilon T$. Scheduled sampling and sequence-level training address it by changing the objective.
- **BLEU** scores outputs by clipped $n$-gram precisions and a brevity penalty, computed over a corpus.
:::

## Exercises

::: exercise The probability of a short output {level=1 check="0.7*0.4*0.9"}
A decoder assigns, under teacher forcing, the probabilities $0.7$, $0.4$ and $0.9$ to the reference tokens "yes", "please" and $\langle\text{eos}\rangle$. What is $p(\text{yes please}\mid\mathbf{x})$?
::: solution
By [[#eq-clm]], $p = 0.7\cdot0.4\cdot0.9 = 0.252$. The $\langle\text{eos}\rangle$ factor is part of the probability: it is the probability that the output *stops* after "yes please" rather than continuing.
:::
:::

::: exercise Why ⟨eos⟩ is needed {level=1}
Explain why, without an end-of-sequence token, the probabilities $\prod_{t=1}^np(y_t\mid y_{<t}, \mathbf{x})$ over all sequences of all lengths do not form a probability distribution, and how $\langle\text{eos}\rangle$ fixes this.
::: solution
For each fixed length $n$, the products over all $\lvert\mathcal{V}\rvert^n$ sequences of that length sum to $1$ (sum over $y_n$ first, then $y_{n-1}$, and so on). Summed over all lengths $n = 1, 2, \dots$ the total is infinite, and a sequence's probability does not tell us whether the output should stop. With $\langle\text{eos}\rangle$, a sequence of length $n$ has probability $\prod_{t\le n}p(y_t\mid\dots)\cdot p(\langle\text{eos}\rangle\mid y_{\le n}, \mathbf{x})$, and the events "the output is exactly $y_1\dots y_n$" for different sequences are disjoint, so their probabilities sum to at most $1$ (exactly $1$ if the model stops with probability $1$).
:::
:::

::: exercise Brevity penalty {level=1 check="exp(1-7/6)"}
A candidate has $6$ words and the reference has $7$. What is the brevity penalty?
::: solution
$c = 6\le r = 7$, so $\mathrm{BP} = e^{1 - r/c} = e^{1 - 7/6} = e^{-1/6}\approx0.846$. Without the penalty a system could score high precision by outputting only the few words it is sure of.
:::
:::

::: exercise Sentence BLEU can be zero {level=2}
Reference "the cat sat on the mat", candidate "the cat is on the mat". Compute $p_1, \dots, p_4$ and BLEU. What does the result say about using BLEU on single sentences, and how do toolkits handle it?
::: solution
Unigrams: the, cat, is, on, the, mat — "the" occurs twice in both, so the clipped matches are the ×2, cat, on, mat: $p_1 = 5/6$. Bigrams: "the cat", "on the", "the mat" match, "cat is", "is on" do not: $p_2 = 3/5$. Trigrams: only "on the mat": $p_3 = 1/4$. Four-grams: "the cat is on", "cat is on the", "is on the mat" — none: $p_4 = 0$. So $\log p_4 = -\infty$ and BLEU $= 0$, although the candidate differs from the reference by one word. Sentence-level BLEU is therefore unstable; it is designed as a corpus statistic, where some four-gram matches always exist. For single sentences toolkits apply **smoothing**, such as adding a small count to zero precisions (Chen and Cherry, 2014, compare several methods).
:::
:::

::: exercise Compounding errors {level=2 check="20 - 0.95*(1-0.95^20)/0.05"}
In the model of [[#prop-compounding]] with $\varepsilon = 0.05$ and $T = 20$, compute the expected number of errors exactly, and compare it with teacher forcing and with the small-$\varepsilon T$ approximation.
::: solution
$\E = 20 - 0.95(1 - 0.95^{20})/0.05 = 20 - 19\cdot(1 - 0.358486) = 20 - 12.1888 = 7.811$. Teacher forcing would give $\varepsilon T = 1$. The approximation $\varepsilon T(T + 1)/2 = 10.5$ overestimates, because $\varepsilon T = 1$ is not small: the exact count saturates since it can never exceed $T$. The probability of an error-free output is $0.95^{20} = 0.358$.
:::
:::

::: exercise Bidirectional encoders and the context {level=2}
Many seq2seq systems used a bidirectional encoder ([[sequence-models/recurrent-networks#sec-variants]]). If the context is formed from the encoder's final states, which states should be used, and why is "the last position of the concatenated output" a poor choice?
::: solution
The forward RNN has read the whole sentence at its *last* position, $\overrightarrow{\mathbf{h}}_S$, while the backward RNN has read the whole sentence at its last step, which is position $1$: $\overleftarrow{\mathbf{h}}_1$. The context should combine these two, e.g. $\mathbf{c} = [\overrightarrow{\mathbf{h}}_S; \overleftarrow{\mathbf{h}}_1]$ followed by a linear map to the decoder's size. The concatenated output at position $S$, $[\overrightarrow{\mathbf{h}}_S; \overleftarrow{\mathbf{h}}_S]$, contains a backward state that has seen only the last token, wasting half the context.
:::
:::

::: exercise Gradient to the encoder {level=2}
In the listing, the encoder receives a gradient only through `dh0`, the decoder's gradient at its initial state. Show that the gradient of the loss with respect to the context, $\partial\mathcal{L}/\partial\mathbf{c}$, is a sum of contributions from every decoder step, and write the contribution of step $t$ as a product of Jacobians. What does [[sequence-models/recurrent-networks#prop-jacobian]] imply for the influence of late target words on the encoder?
::: solution
The context is $\mathbf{h}^{\text{dec}}_0$, and the loss is $\sum_t\ell_t$ with $\ell_t$ depending on $\mathbf{h}^{\text{dec}}_t$. By the chain rule, $\partial\ell_t/\partial\mathbf{c} = \big(\prod_{s=1}^{t}D_sU_d\big)^{\!\top}W_y^\top\mathbf{g}_t$ (with $D_s$ the decoder's tanh slopes and the product ordered with later steps on the left), and $\partial\mathcal{L}/\partial\mathbf{c} = \sum_t\partial\ell_t/\partial\mathbf{c}$. The contribution of step $t$ contains $t$ Jacobian factors, so it is typically geometrically smaller for late target words: the encoder is trained mostly to serve the first few output tokens. For reversal this matches the task (the first output is the last input), but for long translations it is another way of seeing the bottleneck.
:::
:::

::: exercise Scheduled sampling is not consistent {level=3}
Consider a target "distribution" over two-token sequences $\{aa, bb\}$, each with probability $\frac12$, and a model that factorises as $q(y_1)q(y_2\mid y_1)$. (a) Show that maximum likelihood (teacher forcing) recovers the true distribution. (b) Suppose instead the model were always trained with $y_1$ replaced by its *own* sample $\hat y_1\sim q(y_1)$, independent of the reference — the limit of scheduled sampling. Show that the best $q(y_2\mid\hat y_1)$ is then $\frac12$–$\frac12$ whatever $\hat y_1$ is, and that the resulting model assigns probability $\frac12$ to the impossible sequences $ab$ and $ba$ together.
::: solution
(a) Teacher forcing fits $q(y_1)$ to the data marginal ($\frac12$, $\frac12$) and $q(y_2\mid y_1)$ to the data conditional, which puts all mass on $y_2 = y_1$. The product is $\frac12$ on $aa$ and on $bb$: exact. (b) If the conditioning token $\hat y_1$ is drawn from $q$ independently of the reference, the target $y_2$ (equal to the reference $y_1$) is independent of $\hat y_1$ and is $a$ or $b$ with probability $\frac12$ each. The cross-entropy $\E[-\log q(y_2\mid\hat y_1)]$ is minimised by $q(y_2 = a\mid\hat y_1) = \frac12$ for each $\hat y_1$. The fitted model then gives every two-token sequence probability $\frac14$, including $ab$ and $ba$, which together get $\frac12$. Training on its own predictions has destroyed the dependence between the tokens — a small version of Huszár's (2015) observation that scheduled sampling's objective is not minimised by the true distribution.
:::
:::

::: exercise Context capacity {level=3 check="ceil(1000*8/log2(30000))"}
A decoder must reproduce, by greedy decoding from a context of $H = 1{,}000$ numbers quantised to $8$ bits each, any sequence of $n$ tokens over a vocabulary of $30{,}000$. Using [[#prop-bottleneck]], what is the largest $n$ for which this is not ruled out by counting? (Give the smallest $n$ that *is* ruled out.) Why is the answer of no practical relevance?
::: solution
The context has $2^{8000}$ possible values; the outputs needed are $30{,}000^n$. Counting rules out $n$ once $n\log_230{,}000 > 8{,}000$, i.e. $n > 8{,}000/14.873 = 537.9$, so $n\le537$ is not ruled out and $n = 538$ is the smallest that is. The bound is irrelevant in practice because a network trained by gradient descent does not use the context as a perfect code: the encoder must map similar sources to similar contexts (it is a smooth function) and the decoder must read them with a few matrix products. Real encoder–decoders without attention already degraded on sentences of a few dozen words — a learnability limit far below the counting limit.
:::
:::
