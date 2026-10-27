Word embeddings such as word2vec and GloVe ([[text-and-language/word-embeddings]]) give every word *type* a single vector, learned once from a large corpus and then reused in every task. They were the first widely successful form of transfer learning in NLP. But a word means different things in different sentences — "bank" in "the bank of the river" and in "the bank raised its rates" — and a static vector has to serve them all. The networks of this course compute something better as a by-product: the hidden state of a recurrent language model at the position of a word is a vector that depends on the word *and* its context. **Contextual embeddings** are such context-dependent vectors, taken from a network pretrained on unlabelled text and reused for other tasks.

This chapter explains why static embeddings blur senses, defines contextual representations, and develops **ELMo** (Peters et al., 2018), which took them from a bidirectional LSTM language model and improved the state of the art across a wide range of tasks. A small bidirectional language model in plain Python shows why both directions are needed. We then compare the two ways of transferring a pretrained network — extracting features or fine-tuning — and the methods used to study what the representations contain, and end at the step to BERT and GPT, which replaced the LSTM by the Transformer and are the subject of [[pretraining]].

## Static embeddings and polysemy {#sec-static}

A static embedding assigns one vector $\mathbf{e}_w$ to each word type $w$, whatever the context. For a polysemous word, the training objective pulls $\mathbf{e}_w$ towards the contexts of all its senses at once, and the result is a compromise.

::: proposition A static vector averages its senses {#prop-average}
Suppose a word has senses $1, \dots, m$ that occur with frequencies $f_1, \dots, f_m$ ($\sum_if_i = 1$), and that the ideal vector for sense $i$ would be $\mathbf{u}_i$. The single vector minimising the expected squared error $\sum_if_i\lVert\mathbf{e} - \mathbf{u}_i\rVert^2$ is the frequency-weighted mean $\mathbf{e}^* = \sum_if_i\mathbf{u}_i$.
:::

::: proof
The objective is a convex quadratic in $\mathbf{e}$ with gradient $2\sum_if_i(\mathbf{e} - \mathbf{u}_i) = 2(\mathbf{e} - \sum_if_i\mathbf{u}_i)$, using $\sum_if_i = 1$. It vanishes only at $\mathbf{e}^* = \sum_if_i\mathbf{u}_i$, which is therefore the minimum.
:::

The squared-error model is a simplification, but the conclusion matches what is observed: Arora et al. (2018) found that the word2vec and GloVe vectors of polysemous words are well approximated by linear superpositions of vectors for their senses, weighted by frequency, and that the sense vectors can be recovered by sparse coding. The rare sense is under-represented: the static vector sits close to the dominant sense, and a downstream model must recover the rare sense from the surrounding words on its own.

::: example How much of each sense survives {#ex-senses}
"Bank" is used in its financial sense $80\%$ of the time and in its river sense $20\%$. Model the sense vectors as unit vectors $\mathbf{u}_{\text{money}}$, $\mathbf{u}_{\text{river}}$ with cosine $0.1$ between them. Compute the cosine of the static vector $\mathbf{e}^*$ with each sense.
::: solution
$\mathbf{e}^* = 0.8\mathbf{u}_{\text{money}} + 0.2\mathbf{u}_{\text{river}}$, with $\lVert\mathbf{e}^*\rVert^2 = 0.64 + 0.04 + 2\cdot0.8\cdot0.2\cdot0.1 = 0.712$, so $\lVert\mathbf{e}^*\rVert = 0.8438$. Then $\cos(\mathbf{e}^*, \mathbf{u}_{\text{money}}) = (0.8 + 0.2\cdot0.1)/0.8438 = 0.972$ and $\cos(\mathbf{e}^*, \mathbf{u}_{\text{river}}) = (0.8\cdot0.1 + 0.2)/0.8438 = 0.332$. The static vector is almost the financial sense; in "the bank of the river" a model sees a vector with cosine $0.33$ to the meaning it needs.
:::
:::

::: widget plot
f: (x + (1-x)*c)/sqrt(x^2 + (1-x)^2 + 2*x*(1-x)*c); (x*c + (1-x))/sqrt(x^2 + (1-x)^2 + 2*x*(1-x)*c)
x: 0, 1
y: -0.2, 1.05
sliders: c=0.1:-0.5:0.9:0.05
labels: \cos(\mathbf{e}^*, \mathbf{u}_1); \cos(\mathbf{e}^*, \mathbf{u}_2)
vlines: 0.8
caption: The static vector $\mathbf{e}^* = f\mathbf{u}_1 + (1 - f)\mathbf{u}_2$ of a two-sense word, against the frequency $f$ of sense $1$ (horizontal axis), for unit sense vectors with cosine $c$ (slider). At $f = 0.8$ (dashed) and $c = 0.1$ the vector is close to sense $1$ and far from sense $2$, as in [[#ex-senses]]. Only when the senses are similar ($c$ near $1$) does one vector serve both well. A contextual embedding avoids the compromise by computing a different vector in each sentence.
:::

## Contextual representations {#sec-contextual}

::: definition Contextual embedding {#def-contextual}
A **contextual embedding** model is a function $F$ that maps a token sequence $x_1, \dots, x_n$ to vectors $\mathbf{r}_1, \dots, \mathbf{r}_n$, where $\mathbf{r}_t = F(x_1, \dots, x_n)_t$ may depend on every token of the sequence. The same word type receives different vectors in different contexts. $F$ is **pretrained** on a task for which unlabelled text provides the supervision (usually language modelling) and then reused, frozen or fine-tuned, for other tasks.
:::

Every network in this course is such a function: the hidden states of an RNN language model ([[sequence-models/recurrent-networks#def-rnnlm]]) depend on the left context, those of a bidirectional encoder on the whole sentence. The question in 2015–2018 was which pretraining task produces states that transfer best. Dai and Le (2015) pretrained LSTMs as language models or sequence autoencoders and fine-tuned them for text classification. McCann et al. (2017) took the encoder of an attention-based translation model and used its states, which they called **CoVe** (context vectors), as extra inputs to other tasks. Peters et al. (2017) added the states of a pretrained language model to a sequence tagger (TagLM) and improved named-entity recognition and chunking. Translation needs parallel data, which is scarce; language modelling needs only text, which is abundant. ELMo settled on the language model.

## ELMo {#sec-elmo}

### The bidirectional language model {#sec-bilm}

A left-to-right language model's state at position $t$ has not seen the words after $t$, yet the right context often decides the meaning ("the bank *of the river*"). The natural fix — a bidirectional RNN trained to predict each token — does not work, because it would see the token it is asked to predict.

::: proposition Bidirectional prediction leaks the target {#prop-leakage}
Let $\mathbf{r}_t = [\overrightarrow{\mathbf{h}}_t; \overleftarrow{\mathbf{h}}_t]$ be the output of a bidirectional RNN, where $\overrightarrow{\mathbf{h}}_t$ has read $x_1, \dots, x_t$ and $\overleftarrow{\mathbf{h}}_t$ has read $x_n, \dots, x_t$. If a classifier on $\mathbf{r}_{t-1}$ is trained to predict $x_t$, the backward half has already read $x_t$, and the cross-entropy can be driven to zero by a network that copies the input token to the output, learning nothing about context.
:::

::: proof
$\overleftarrow{\mathbf{h}}_{t-1} = f(\overleftarrow{\mathbf{h}}_t, x_{t-1})$ and $\overleftarrow{\mathbf{h}}_t = f(\overleftarrow{\mathbf{h}}_{t+1}, x_t)$ depend on $x_t$. A backward RNN can store the identity of the most recent input in its state (for example, with input weights that write the one-hot token into a subspace and recurrent weights that move it to another subspace one step later), and a linear classifier can read it out with arbitrarily high confidence by scaling the output weights. The loss then approaches $0$ for every training sequence, and since this solution is available, nothing in the objective forces the representation to model the context.
:::

ELMo's answer is to train two separate language models, one in each direction, and to combine their states only after training. (BERT's answer, a year later, was to hide the token being predicted — masked language modelling, [[pretraining/pretraining-objectives]].)

::: definition Bidirectional language model {#def-bilm}
A **bidirectional language model** (biLM) consists of a forward language model with states $\overrightarrow{\mathbf{h}}_{t,j}$ (layer $j = 1, \dots, L$, reading left to right) and a backward language model with states $\overleftarrow{\mathbf{h}}_{t,j}$ (reading right to left). They share the token representation $\mathbf{x}_t$ (layer $j = 0$) and the output softmax, and are trained jointly to maximise

$$
\sum_{t=1}^n\Big(\log p(x_t\mid x_1, \dots, x_{t-1};\ \Theta_x, \overrightarrow\Theta, \Theta_s) + \log p(x_t\mid x_{t+1}, \dots, x_n;\ \Theta_x, \overleftarrow\Theta, \Theta_s)\Big),
$$ {#eq-bilm}

where $\Theta_x$ and $\Theta_s$ are the shared token-representation and softmax parameters and $\overrightarrow\Theta$, $\overleftarrow\Theta$ the two directions' LSTMs. The forward prediction of $x_t$ uses $\overrightarrow{\mathbf{h}}_{t-1,L}$ and the backward one $\overleftarrow{\mathbf{h}}_{t+1,L}$, so neither direction sees its target.
:::

::: widget graph
nodes: x1@0,0; x2@1,0; x3@2,0; x4@3,0; x5@4,0; f1@0,1; f2@1,1; f3@2,1; f4@3,1; f5@4,1; b1@0,2; b2@1,2; b3@2,2; b4@3,2; b5@4,2
edges: x1>f1; x2>f2; x3>f3; x4>f4; x5>f5; f1>f2; f2>f3; f3>f4; f4>f5; x1>b1; x2>b2; x3>b3; x4>b4; x5>b5; b5>b4; b4>b3; b3>b2; b2>b1
algorithm: bfs
start: x5
caption: Information flow in a biLM over five tokens: forward states $f_t$ (middle row) read left to right, backward states $b_t$ (top row) right to left. Breadth-first search from the last token $x_5$ reaches $f_5$ and every backward state, but no forward state before $f_5$: the forward representation of "bank" at position $3$ cannot know what follows it. Start the search from $x_1$ instead to see the mirror image. ELMo concatenates $f_t$ and $b_t$, so its vector at position $3$ depends on all five tokens — while neither language model ever sees the token it predicts.
:::

ELMo's biLM had two layers of LSTMs in each direction with $4{,}096$ cells, whose outputs were projected down to $512$ dimensions, and a residual connection from the first layer to the second. Its token representation was computed from characters — a convolutional network over character embeddings with $2{,}048$ filters of widths $1$ to $7$, two highway layers and a projection to $512$ — so it had no out-of-vocabulary words. It was trained on the One Billion Word Benchmark (Chelba et al., 2014), a corpus of news sentences.

::: example Where ELMo's 93.6 million parameters are {#ex-elmo-params}
Count the parameters of the biLM described above, excluding the output softmax (which is discarded after pretraining). Use: character embeddings of size $16$ for $262$ characters; convolutional filters of widths $1, \dots, 7$ with $32, 32, 64, 128, 256, 512, 1{,}024$ filters ($2{,}048$ in total, each with a bias); two highway layers of width $2{,}048$ (each with two $2{,}048\times2{,}048$ matrices and biases); a projection $2{,}048\to512$ with bias; and four LSTM layers (two per direction), each with $4{,}096$ cells, input size $512$, recurrent input of size $512$ (the projected output), and a $4{,}096\to512$ projection without bias.
::: solution
Character embeddings: $262\cdot16 = 4{,}192$. Filters: $16\sum_ww\,n_w + 2{,}048 = 16\cdot12{,}320 + 2{,}048 = 199{,}168$. Highway: $2\cdot2\cdot(2{,}048^2 + 2{,}048) = 16{,}785{,}408$. Projection: $2{,}048\cdot512 + 512 = 1{,}049{,}088$. One LSTM layer: gates $4\big(4{,}096\cdot(512 + 512) + 4{,}096\big) = 16{,}793{,}600$, projection $4{,}096\cdot512 = 2{,}097{,}152$, together $18{,}890{,}752$; four layers $75{,}563{,}008$. Total $4{,}192 + 199{,}168 + 16{,}785{,}408 + 1{,}049{,}088 + 75{,}563{,}008 = 93{,}600{,}864$ — the $93.6$ million usually quoted for ELMo. Four fifths are in the LSTMs; the softmax over the benchmark's roughly $800{,}000$-word vocabulary would have added several hundred million more during training.
:::
:::

### Combining the layers {#sec-mix}

After pretraining, the biLM provides $2L + 1$ vectors for every token: the token layer and, for each LSTM layer, the forward and backward states. Write $\mathbf{h}^{\text{LM}}_{t,0} = [\mathbf{x}_t; \mathbf{x}_t]$ and $\mathbf{h}^{\text{LM}}_{t,j} = [\overrightarrow{\mathbf{h}}_{t,j}; \overleftarrow{\mathbf{h}}_{t,j}]$ for $j\ge1$.

::: definition ELMo representation {#def-elmo}
For a downstream task, the **ELMo** vector of token $t$ is a learned, task-specific weighted sum of the biLM layers,

$$
\mathbf{ELMo}_t^{\text{task}} = \gamma^{\text{task}}\sum_{j=0}^{L}s^{\text{task}}_j\,\mathbf{h}^{\text{LM}}_{t,j},\qquad \mathbf{s}^{\text{task}} = \operatorname{softmax}(\mathbf{w}^{\text{task}}),
$$ {#eq-elmo}

where $\mathbf{w}^{\text{task}}\in\R^{L+1}$ and the scale $\gamma^{\text{task}}$ are trained with the task model while the biLM is frozen. The task model receives $[\mathbf{x}^{\text{task}}_t; \mathbf{ELMo}_t^{\text{task}}]$ in place of its usual input embedding $\mathbf{x}^{\text{task}}_t$ (and, for some tasks, ELMo at its output as well).
:::

The scalar mix lets each task pick its own depth. Peters et al. found that different layers encode different things: on part-of-speech tagging, a probe on the first LSTM layer outperformed one on the second, while on word-sense disambiguation the second layer was better — lower layers more syntactic, higher layers more semantic. Averaging all layers with learned weights beat using only the top layer.

::: example A scalar mix by hand {#ex-mix}
A biLM gives a token three layer vectors $\mathbf{h}_0 = (1, 0)$, $\mathbf{h}_1 = (0, 1)$, $\mathbf{h}_2 = (1, 1)$ (two dimensions for the example). A task has learned $\mathbf{w} = (0, 1, -1)$ and $\gamma = 2$. Compute the ELMo vector.
::: solution
$\mathbf{s} = \operatorname{softmax}(0, 1, -1) = (e^0, e^1, e^{-1})/(1 + e + e^{-1}) = (0.2447, 0.6652, 0.0900)$. The mix is $0.2447(1, 0) + 0.6652(0, 1) + 0.0900(1, 1) = (0.3348, 0.7553)$, and scaling by $\gamma = 2$ gives $(0.6695, 1.5105)$. This task relies mainly on the first LSTM layer. With $\mathbf{w} = \mathbf{0}$ the mix would be the plain average of the three layers.
:::
:::

The gains were large and broad. Adding ELMo to existing models improved the state of the art on six benchmarks — question answering (SQuAD), textual entailment (SNLI), semantic role labelling, coreference resolution, named-entity recognition and sentiment classification (SST-5) — with relative error reductions between about $6\%$ and $20\%$, and it helped most when the labelled training set was small. The paper won the best-paper award at NAACL 2018, and within months nearly every NLP system used pretrained contextual representations.

## Why both directions are needed {#sec-code}

The listing makes the leakage-free biLM concrete on a toy corpus. Sentences have the form "the S went to the bank to V .", where the subject and the verb both reveal the sense of "bank" — "fisherman", "boatman" and "fish", "row" for the river; "banker", "clerk" and "pay", "save" for money — except that the subjects "man" and "woman" occur with either sense. A forward and a backward simple-RNN language model are trained separately, and the representation of "bank" is read from each.

```python
import math, random

rng = random.Random(0)
SENSE = {"river": (["fisherman", "boatman"], ["fish", "row"]),
         "money": (["banker", "clerk"], ["pay", "save"])}
def sentence(sense, subj=None):
    subjects, verbs = SENSE[sense]
    s = subj or rng.choice(subjects)
    return ["the", s, "went", "to", "the", "bank", "to", rng.choice(verbs), "."]
# training corpus: unambiguous subjects, and "man"/"woman" with either sense
train = [sentence(rng.choice(["river", "money"])) for _ in range(300)]
train += [sentence(rng.choice(["river", "money"]), rng.choice(["man", "woman"])) for _ in range(100)]
vocab = sorted({w for s in train for w in s}); V = len(vocab); ix = {w: i for i, w in enumerate(vocab)}

H = 16
def mat(r, c, s): return [[rng.gauss(0, s) for _ in range(c)] for _ in range(r)]
def mv(M, v): return [sum(m * x for m, x in zip(row, v)) for row in M]
def new_lm():
    return {"Wxh": mat(H, V, 0.3), "Whh": mat(H, H, 1 / math.sqrt(H)), "bh": [0.0] * H,
            "Why": mat(V, H, 0.1), "by": [0.0] * V}

def states(P, xs):                                 # hidden states after each token
    h, hs = [0.0] * H, []
    for x in xs:
        h = [math.tanh(P["Wxh"][i][x] + w + b) for i, (w, b) in
             enumerate(zip(mv(P["Whh"], h), P["bh"]))]
        hs.append(h)
    return hs

def sgd_step(P, xs, lr=0.1):                       # one sentence, full BPTT
    hs = [[0.0] * H] + states(P, xs[:-1]); loss = 0.0
    G = {k: ([[0.0] * len(v[0]) for _ in v] if isinstance(v[0], list) else [0.0] * len(v))
         for k, v in P.items()}
    dnext = [0.0] * H
    for t in range(len(xs) - 1, 0, -1):            # h_t predicts xs[t]
        z = [u + b for u, b in zip(mv(P["Why"], hs[t]), P["by"])]
        m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e); p = [v / s for v in e]
        loss -= math.log(p[xs[t]]); p[xs[t]] -= 1
        for k in range(V):
            G["by"][k] += p[k]
            for j in range(H): G["Why"][k][j] += p[k] * hs[t][j]
        dh = [sum(P["Why"][k][j] * p[k] for k in range(V)) + dnext[j] for j in range(H)]
        da = [d * (1 - h * h) for d, h in zip(dh, hs[t])]
        for i in range(H):
            G["bh"][i] += da[i]; G["Wxh"][i][xs[t - 1]] += da[i]
            for j in range(H): G["Whh"][i][j] += da[i] * hs[t - 1][j]
        dnext = [sum(P["Whh"][i][j] * da[i] for i in range(H)) for j in range(H)]
    for k in P:
        if isinstance(P[k][0], list):
            for r, g in zip(P[k], G[k]):
                for j in range(len(r)): r[j] -= lr * g[j]
        else:
            for j in range(len(P[k])): P[k][j] -= lr * G[k][j]
    return loss / (len(xs) - 1)

fwd, bwd = new_lm(), new_lm()
for epoch in range(15):                            # forward LM reads left to right,
    tot = 0.0                                      # backward LM right to left
    for s in train:
        ids = [ix[w] for w in s]
        tot += sgd_step(fwd, ids) + sgd_step(bwd, ids[::-1])
    if epoch % 7 == 0 or epoch == 14:
        print(f"epoch {epoch:2d}  mean loss per token (fwd + bwd) / 2 = {tot / (2 * len(train)):.3f}")

def bank_vectors(s):                               # representations of "bank" (position 5)
    ids = [ix[w] for w in s]
    f = states(fwd, ids)[5]
    b = states(bwd, ids[::-1])[len(ids) - 1 - 5]
    return {"forward": f, "backward": b, "concat": f + b}

def cos(u, v): return sum(a * b for a, b in zip(u, v)) / math.sqrt(sum(a * a for a in u) * sum(b * b for b in v) + 1e-30)
allv = [bank_vectors(s) for s in train]                # mean "bank" vector, to centre
mean = {k: [sum(v[k][j] for v in allv) / len(allv) for j in range(len(allv[0][k]))] for k in allv[0]}
def centred(v): return {k: [a - m for a, m in zip(v[k], mean[k])] for k in v}
mk = lambda verb: ["the", "man", "went", "to", "the", "bank", "to", verb, "."]
for a, b in [("fish", "pay"), ("fish", "row")]:
    va, vb = bank_vectors(mk(a)), bank_vectors(mk(b)); ca, cb = centred(va), centred(vb)
    print(f"bank|{a} vs bank|{b}: " + "  ".join(
        f"{k} raw {cos(va[k], vb[k]):.4f} centred {cos(ca[k], cb[k]): .3f}" for k in ["forward", "backward"]))

# nearest-centroid sense classification of "bank" in ambiguous-subject sentences
cent = {}
for sense in SENSE:
    vs = [centred(bank_vectors(sentence(sense))) for _ in range(50)]
    cent[sense] = {k: [sum(v[k][j] for v in vs) / 50 for j in range(len(vs[0][k]))] for k in vs[0]}
test = [(sense, sentence(sense, subj)) for sense in SENSE for subj in ["man", "woman"] for _ in range(25)]
for k in ["forward", "backward", "concat"]:
    ok = sum(max(SENSE, key=lambda c: cos(centred(bank_vectors(s))[k], cent[c][k])) == sense
             for sense, s in test)
    print(f"sense of 'bank' from {k:8s} state: {ok}/{len(test)} correct")
```

Output (about twenty seconds):

```
epoch  0  mean loss per token (fwd + bwd) / 2 = 0.440
epoch  7  mean loss per token (fwd + bwd) / 2 = 0.408
epoch 14  mean loss per token (fwd + bwd) / 2 = 0.388
bank|fish vs bank|pay: forward raw 1.0000 centred  1.000  backward raw 0.9995 centred -0.992
bank|fish vs bank|row: forward raw 1.0000 centred  1.000  backward raw 1.0000 centred  0.980
sense of 'bank' from forward  state: 50/100 correct
sense of 'bank' from backward state: 100/100 correct
sense of 'bank' from concat   state: 100/100 correct
```

For "the man went to the bank to …" the forward state at "bank" is *identical* in both senses — it has read the same five words — so no classifier can recover the sense from it, and nearest-centroid classification is at chance ($50/100$). The backward state has read "… to fish" or "… to pay", and separates the senses perfectly; the concatenation, which is what ELMo uses, inherits that. The middle lines carry a second lesson. The *raw* cosine between the backward vectors for the two senses is $0.9995$: the trained RNN's units are mostly saturated near $\pm1$ in the same way for every occurrence of "bank", and these shared components dominate the cosine. Only after subtracting the mean "bank" vector do the senses appear as opposite directions ($-0.992$), while two verbs of the same sense remain similar ($0.980$). Raw cosine similarities between contextual vectors can be badly misleading, a point taken up in [[#sec-analysis]].

## Using pretrained representations {#sec-transfer}

There are two ways to reuse a pretrained network for a new task.

- **Feature extraction.** Freeze the pretrained network, compute its representations, and train a task model on top of them. ELMo is used this way: only $\mathbf{w}$, $\gamma$ and the task model are trained. The representations can be computed once and cached; one pretrained network serves many tasks.
- **Fine-tuning.** Initialise the task model with the pretrained network and continue training *all* its parameters on the task, usually with a small task-specific output layer. Howard and Ruder's **ULMFiT** (2018) fine-tuned a pretrained LSTM language model (an AWD-LSTM, Merity, Keskar and Socher, 2018) first on text from the target domain and then on the classification task, with layer-wise learning rates, a warm-up-then-decay schedule and gradual unfreezing of layers, and reduced error by $18$–$24\%$ on several text-classification benchmarks.

Fine-tuning adapts the representations themselves and generally transfers better when the task data are sufficient; feature extraction is cheaper and keeps the pretrained network intact. GPT (Radford et al., 2018) and BERT (Devlin et al., 2019) both adopted fine-tuning, and it became the standard until prompting very large models ([[prompting-rag]]) offered a third way: no gradient updates at all.

::: example The cost of the two modes {#ex-transfer-cost}
A practitioner has $5$ classification tasks and a pretrained network of $100$ million parameters. With fine-tuning, how many parameters must be stored for the five deployed models? With feature extraction and a task head of $1$ million parameters each? What does each mode cost per training step, roughly, relative to a forward pass of the pretrained network?
::: solution
Fine-tuning produces five separate copies: $5\cdot100 = 500$ million parameters (plus five small heads). Feature extraction stores the network once plus the heads: $100 + 5\cdot1 = 105$ million. Per step, fine-tuning needs a forward and a backward pass through the whole network, about three forward passes ([[neural-networks/backpropagation#prop-flops]]); feature extraction needs only the forward pass (or none, if the features are cached) plus the head's small cost. The storage gap is what parameter-efficient fine-tuning methods such as adapters and LoRA later closed ([[post-training]]).
:::
:::

::: quiz
Why did ELMo train two separate unidirectional language models instead of one bidirectional RNN predicting each token?
- [ ] Two unidirectional models have fewer parameters.
- [ ] A bidirectional RNN cannot be trained with backpropagation through time.
- [x] A bidirectional RNN's representation of a position has already read the token to be predicted, so prediction would be trivial.
- [ ] The backward model is only used during pretraining and discarded afterwards.
::: solution
By [[#prop-leakage]], the backward half of a bidirectional RNN reads $x_t$ before producing the state used to predict it, so the network could simply copy. Training each direction as its own language model keeps every prediction blind to its target; the two directions' states are combined only afterwards. Both directions are kept and used in the ELMo vector.
:::
:::

## What contextual representations contain {#sec-analysis}

Contextual vectors are learned, not designed, so what they encode must be measured.

::: definition Probing classifier {#def-probe}
A **probe** for a linguistic property (part of speech, syntactic depth, named-entity type, word sense) is a simple classifier, usually linear, trained on frozen representations $\mathbf{r}_t$ to predict the property of token $t$. High probe accuracy on held-out data is taken as evidence that the property is (linearly) decodable from the representations.
:::

Probing studies of ELMo and BERT found a rough hierarchy: part of speech is decodable best from low layers, syntactic structure from middle layers, and semantic properties such as coreference from higher ones — Tenney, Das and Pavlick (2019) summarised this as BERT "rediscovering the classical NLP pipeline". Hewitt and Manning (2019) showed that a linear transformation of BERT and ELMo vectors makes squared distances approximate distances in the syntactic parse tree (a "structural probe").

::: warning "If a probe can decode it, the model uses it"
A probe shows that information is *present* and *extractable*, not that the network uses it for its own predictions. A powerful probe can also learn the task itself: Hewitt and Liang (2019) introduced **control tasks** — random but consistent labels for each word type — and found that probes with enough capacity score well on them too, so accuracy must be compared with the control (their "selectivity"). And similarities between contextual vectors must be read with care: Ethayarajh (2019) found that representations from ELMo, BERT and GPT-2 are **anisotropic** — they occupy a narrow cone, so that even unrelated words have high cosine similarity — exactly the effect seen in the raw cosines of the listing. Centre the vectors or compare against a baseline before interpreting a similarity.
:::

Ethayarajh also measured how contextual the vectors are. Define the **self-similarity** of a word in layer $\ell$ as the average cosine between its representations in different contexts. In all three models it decreased in higher layers: upper layers produce more context-specific representations. He found that, on average, less than $5\%$ of the variance of a word's contextual representations could be explained by a single static vector (their first principal component) — contextual embeddings are not static embeddings plus noise.

::: example Self-similarity {#ex-self-sim}
A word occurs in three contexts with (two-dimensional, for illustration) representations $(1, 0.2)$, $(0.9, 0.4)$ and $(0.2, 1)$. Compute its self-similarity.
::: solution
The three pairwise cosines are $\cos(\mathbf{r}_1, \mathbf{r}_2) = (0.9 + 0.08)/(1.0198\cdot0.9849) = 0.976$, $\cos(\mathbf{r}_1, \mathbf{r}_3) = (0.2 + 0.2)/(1.0198\cdot1.0198) = 0.385$ and $\cos(\mathbf{r}_2, \mathbf{r}_3) = (0.18 + 0.4)/(0.9849\cdot1.0198) = 0.577$. The self-similarity is their mean, $0.646$. The first two contexts probably share a sense, the third is different. In a real analysis, the same computation for random pairs of *different* words gives the anisotropy baseline that this number should be compared with.
:::
:::

## From ELMo to BERT and GPT {#sec-next}

ELMo was quickly overtaken, but by models that kept its central idea — pretrain a deep network on unlabelled text, reuse its contextual representations — and changed the architecture and the transfer method.

- **GPT** (Radford, Narasimhan, Salimans and Sutskever, 2018) pretrained a twelve-layer Transformer decoder as a left-to-right language model on a corpus of books and fine-tuned it on each task with a small output layer and task-specific input formatting. It is unidirectional, like ELMo's forward half, but deeper and with attention instead of recurrence.
- **BERT** (Devlin, Chang, Lee and Toutanova, 2019) pretrained a Transformer *encoder* with the **masked language model** objective: hide about $15\%$ of the tokens and predict them from both sides. Masking is the fix for [[#prop-leakage]] — the representation at a masked position cannot copy a token it never saw — and gives deep bidirectionality in every layer rather than ELMo's shallow concatenation of two directions. Fine-tuned BERT set new results on a broad range of benchmarks in late 2018.

The architectures are compared in [[transformers/architecture-families]], and the pretraining objectives and data in [[pretraining/pretraining-objectives]] and [[pretraining]]. The vocabulary of transfer — pretrained representations, feature extraction versus fine-tuning, probing — comes from the period this chapter describes.

::: history
Using unlabelled text to learn representations for supervised tasks is old: Brown clusters (Brown et al., 1992) grouped words by their contexts and were standard features in taggers, and Collobert and Weston (2008; Collobert et al., 2011) pretrained word vectors with a neural model and used them across tasks. Word2vec (Mikolov et al., 2013) and GloVe (Pennington, Socher and Manning, 2014) made static embeddings ubiquitous. Contextual pretraining followed between 2015 and 2018: Dai and Le's semi-supervised sequence learning (2015), CoVe (McCann et al., 2017), TagLM (Peters et al., 2017), and then ELMo — Matthew Peters, Mark Neumann, Mohit Iyyer, Matt Gardner, Christopher Clark, Kenton Lee and Luke Zettlemoyer, "Deep contextualized word representations" (NAACL 2018), from the Allen Institute for AI and the University of Washington — together with ULMFiT (Howard and Ruder, ACL 2018) and GPT (June 2018). BERT (October 2018 preprint, NAACL 2019) generalised the approach, and 2018 is often described as the year transfer learning arrived in NLP. ELMo and BERT also began a naming fashion after Sesame Street characters (ERNIE, Big Bird, Grover).
:::

::: summary
- A **static embedding** gives a word one vector; for a polysemous word it approximates a frequency-weighted average of its senses, so rare senses are poorly represented.
- A **contextual embedding** $\mathbf{r}_t = F(x_1, \dots, x_n)_t$ depends on the whole sequence; it is taken from a network pretrained on unlabelled text, usually by language modelling.
- A single bidirectional network trained to predict tokens would **leak** the target; ELMo trains a forward and a backward LSTM language model separately (a **biLM**) with shared token representations and softmax.
- **ELMo** vectors are task-specific softmax-weighted mixes of the biLM's layers, scaled by $\gamma$, added to the task model's input; lower layers carry more syntax, higher layers more semantics. ELMo improved six diverse benchmarks by $6$–$20\%$ relative error.
- Pretrained networks are reused by **feature extraction** (frozen, as ELMo) or **fine-tuning** (all weights updated, as ULMFiT, GPT, BERT).
- **Probes** measure what is decodable, to be compared with control tasks; contextual vectors are **anisotropic**, so raw cosines need a baseline. BERT's masked objective made representations bidirectional in every layer.
:::

## Exercises

::: exercise A weighted mean of senses {level=1 check="0.7*1+0.3*(-1)"}
A word has two senses with one-dimensional ideal vectors $u_1 = 1$ and $u_2 = -1$, used $70\%$ and $30\%$ of the time. What is the optimal static vector of [[#prop-average]]?
::: solution
$e^* = 0.7\cdot1 + 0.3\cdot(-1) = 0.4$. It points towards the majority sense but has lost most of its magnitude, and it is far from both senses: its squared error is $0.7\cdot0.36 + 0.3\cdot1.96 = 0.84$.
:::
:::

::: exercise Scalar-mix weights {level=1 check="1/(1+2*exp(-2))"}
A biLM has three layers and a task learns $\mathbf{w} = (2, 0, 0)$. What weight does the token layer ($j = 0$) receive?
::: solution
$s_0 = e^2/(e^2 + 1 + 1) = 1/(1 + 2e^{-2}) = 0.787$. The other two layers get $0.106$ each.
:::
:::

::: exercise Layer vectors of a biLM {level=1}
In ELMo, the token layer is written $\mathbf{h}^{\text{LM}}_{t,0} = [\mathbf{x}_t; \mathbf{x}_t]$, repeating the token representation. Why is it repeated, and what are the dimensions of each $\mathbf{h}^{\text{LM}}_{t,j}$ for ELMo's sizes?
::: solution
The LSTM layers are concatenations of a forward and a backward state, each $512$-dimensional after projection, so $\mathbf{h}^{\text{LM}}_{t,j}\in\R^{1024}$ for $j = 1, 2$. The weighted sum [[#eq-elmo]] needs all layers to have the same size, so the $512$-dimensional token representation is duplicated to $1{,}024$ dimensions. Every ELMo vector is therefore $1{,}024$-dimensional.
:::
:::

::: exercise What the forward state cannot know {level=2}
In the listing's corpus, which sentences give the forward language model's state at "bank" enough information to determine the sense, and which do not? Predict the forward-state classification accuracy on test sentences with *unambiguous* subjects, and explain why the measured $50/100$ on ambiguous ones is exactly chance.
::: solution
The forward state at "bank" has read "the S went to the bank". With $S\in\{\text{fisherman}, \text{boatman}, \text{banker}, \text{clerk}\}$ the subject determines the sense, and the forward LM has every reason to keep it, because it must predict the verb that follows; its accuracy on such sentences should be near $100\%$. With $S\in\{\text{man}, \text{woman}\}$ the prefix is the same for both senses, so the state is literally the same vector for river and money sentences; the classifier assigns all $50$ "man" test sentences one label and all $50$ "woman" sentences one label, and since each group is half river, half money, exactly $25 + 25 = 50$ are correct.
:::
:::

::: exercise Leakage in practice {level=2}
A student trains a bidirectional LSTM to predict $x_t$ from $[\overrightarrow{\mathbf{h}}_t; \overleftarrow{\mathbf{h}}_t]$ (the states *at* position $t$) and reports a training perplexity of $1.02$. Explain the result, and describe two correct ways to obtain bidirectional representations from language modelling.
::: solution
Both halves have read $x_t$ itself, so the network can copy the input to the output: perplexity near $1$ is the signature of leakage ([[#prop-leakage]]), not of a good model. Correct alternatives: (1) ELMo's biLM, predicting $x_t$ from $\overrightarrow{\mathbf{h}}_{t-1}$ with the forward model and from $\overleftarrow{\mathbf{h}}_{t+1}$ with the backward model, trained as two separate objectives; (2) masked language modelling, replacing $x_t$ by a mask token in the input and predicting it from the bidirectional representation at $t$ (BERT). A third option is to predict $x_t$ from $[\overrightarrow{\mathbf{h}}_{t-1}; \overleftarrow{\mathbf{h}}_{t+1}]$, which also sees no target, though deeper layers must then be designed carefully so the two directions do not mix.
:::
:::

::: exercise Storage of features {level=2 check="1000000*30*1024*2"}
A practitioner caches ELMo vectors ($1{,}024$ dimensions) for a training set of $1$ million sentences averaging $30$ tokens, in 16-bit floats. How many bytes does a cache of the final mixed vectors need? How much if all three layers are kept, so that the scalar mix can still be learned?
::: solution
With the mix stored: $10^6\cdot30\cdot1{,}024\cdot2$ bytes $= 6.144\times10^{10}$ bytes, about $61$ GB. Keeping all three layers triples this to about $184$ GB. Caching is attractive only when many training epochs reuse the same features; otherwise recomputing them on the fly is cheaper in storage, at the cost of a biLM forward pass per sentence per epoch.
:::
:::

::: exercise Centring and cosine similarity {level=2}
Show that if all representations share a large common component, $\mathbf{r}_i = \mathbf{m} + \boldsymbol\epsilon_i$ with $\lVert\mathbf{m}\rVert\gg\lVert\boldsymbol\epsilon_i\rVert$, then $\cos(\mathbf{r}_i, \mathbf{r}_j)\to1$ whatever the $\boldsymbol\epsilon$'s, and that subtracting $\mathbf{m}$ recovers $\cos(\boldsymbol\epsilon_i, \boldsymbol\epsilon_j)$. Relate this to the listing's output.
::: solution
$\mathbf{r}_i^\top\mathbf{r}_j = \lVert\mathbf{m}\rVert^2 + \mathbf{m}^\top(\boldsymbol\epsilon_i + \boldsymbol\epsilon_j) + \boldsymbol\epsilon_i^\top\boldsymbol\epsilon_j$ and $\lVert\mathbf{r}_i\rVert^2 = \lVert\mathbf{m}\rVert^2 + 2\mathbf{m}^\top\boldsymbol\epsilon_i + \lVert\boldsymbol\epsilon_i\rVert^2$. Dividing numerator and denominator by $\lVert\mathbf{m}\rVert^2$, every term except the leading $1$ is $O(\lVert\boldsymbol\epsilon\rVert/\lVert\mathbf{m}\rVert)$, so the cosine tends to $1$. After subtracting $\mathbf{m}$ the vectors are $\boldsymbol\epsilon_i$ and $\boldsymbol\epsilon_j$, whose cosine reflects only the differences. In the listing, the backward "bank" vectors share saturated components near $\pm1$ (the common part), the raw cosine across senses is $0.9995$, and after subtracting the empirical mean it is $-0.992$: the sense lives in the small deviations.
:::
:::

::: exercise A probe and its control {level=3}
A linear probe on layer-2 vectors predicts part of speech with $97\%$ accuracy; the same probe trained on a control task (each word type assigned a random but fixed tag from the same tag set) reaches $92\%$. A probe on layer-0 (token) vectors reaches $95\%$ on part of speech and $93\%$ on the control. Compute the selectivity (task minus control accuracy) of each, and say what you can and cannot conclude.
::: solution
Layer 2: $97 - 92 = 5$ points; layer 0: $95 - 93 = 2$ points. The token layer can memorise a tag per word type almost as well as it predicts real tags, so its high POS accuracy says little beyond "most words have one typical tag"; layer 2 is more selective, consistent with it encoding context-dependent syntactic information (resolving ambiguous words such as "run" as noun or verb). What cannot be concluded: that the model *uses* this information for language modelling, or that a non-linear probe would rank the layers the same way. An intervention — changing the representation along the probe's direction and observing the model's predictions — would be needed for the first claim.
:::
:::

::: exercise Implement the scalar mix {level=3}
Extend the listing with an ELMo-style mix for the sense task: represent "bank" by $\gamma\big(s_0[\mathbf{x}; \mathbf{x}] + s_1[\overrightarrow{\mathbf{h}}; \overleftarrow{\mathbf{h}}]\big)$, where $\mathbf{x}$ is the input-embedding column $W_{xh}[:, x]$ of each LM, and train $\mathbf{w}$ and $\gamma$ together with a logistic-regression head on the sense labels of unambiguous sentences. Predict what weights the mix will learn, and why.
::: solution
The token layer for "bank" is the same vector in every sentence (one word type), so it carries no sense information; the LSTM layer carries all of it, in the backward half for ambiguous sentences and in both halves otherwise. Gradient descent on the logistic loss will therefore increase $w_1$ relative to $w_0$, driving $s_1\to1$, and increase $\gamma$ to sharpen the logistic outputs (until regularisation or the learning rate stops it). Implementation: compute $\mathbf{s} = \operatorname{softmax}(\mathbf{w})$ and the mixed vector $\mathbf{m}$; the head outputs $\sigma(\mathbf{a}^\top\mathbf{m} + c)$; the gradient of the log-loss $\ell$ is $\partial\ell/\partial\mathbf{m} = (p - y)\mathbf{a}$, $\partial\ell/\partial\gamma = (\partial\ell/\partial\mathbf{m})^\top\mathbf{m}/\gamma$, and $\partial\ell/\partial w_j = s_j\big(g_j - \sum_ks_kg_k\big)$ with $g_j = \gamma(\partial\ell/\partial\mathbf{m})^\top\mathbf{h}_j$ (the softmax backward rule). A finite-difference check on $w_0$ and $\gamma$ confirms the gradients.
:::
:::
