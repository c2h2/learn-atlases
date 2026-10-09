The Transformer block of [[transformers/transformer-block]] can be wired together in three main ways, and the choice decides what a model is good at. An **encoder** lets every token see every other token, which is ideal for understanding a text that is given in full. A **decoder** lets each token see only the tokens before it, which is exactly what is needed to generate text one token at a time. An **encoder–decoder** reads an input with an encoder and writes an output with a decoder that consults the input through **cross-attention**, the natural shape for translation.

The three designs differ in surprisingly little: the attention mask, the presence or absence of cross-attention, and the training objective. This chapter defines each family, works through the masks and costs by hand, and explains why, after a period in which encoders such as BERT dominated natural language processing, almost every large language model today is a decoder.

## One block, three wirings {#sec-wirings}

Everything starts from the attention mask, the matrix of which (query, key) pairs are allowed.

::: definition Bidirectional encoder {#def-encoder}
An **encoder** is a stack of Transformer blocks whose self-attention has no causal mask: every position attends to every position of the input, before and after it. Its output is one contextual vector per input token.
:::

::: widget graph
nodes: x1@0,0; x2@2,0; x3@2,2; x4@0,2
edges: x1-x2; x1-x3; x1-x4; x2-x3; x2-x4; x3-x4
algorithm: bfs
start: x1
caption: Attention in an encoder over four tokens: every pair is connected in both directions, so information can reach any token from any other in a single layer — breadth-first search from $x_1$ finds everything at distance one. Compare the one-way arrows of a causal decoder in [[transformers/multi-head-attention#sec-causal]] and the encoder–decoder picture below.
:::

A **decoder** in the sense of current language models is the same stack with the causal mask of [[transformers/multi-head-attention#def-causal-mask]], so that position $t$ sees only positions $1, \dots, t$. Followed by an output layer over the vocabulary, it is a language model $p_\theta(x_{t+1}\mid x_{\le t})$.

::: definition Cross-attention {#def-cross-attention}
Let $Y\in\R^{T_d\times d}$ be the representations in a decoder and $Z\in\R^{T_e\times d}$ the output of an encoder. **Cross-attention** takes its queries from the decoder and its keys and values from the encoder:

$$
\operatorname{CrossAttention}(Y, Z) = \operatorname{softmax}\!\Big(\frac{(YW_Q)(ZW_K)^\top}{\sqrt{d_k}}\Big)\,ZW_V\in\R^{T_d\times d_v},
$$

usually with several heads as in multi-head attention. Its attention matrix is $T_d\times T_e$ and needs no mask: every decoder position may consult the whole input.
:::

An **encoder–decoder** model runs an encoder over the input once, and then a decoder whose blocks each contain three sub-layers: causal self-attention over the output generated so far, cross-attention to the encoder's output, and a feed-forward network.

::: widget graph
nodes: e1@0,0; e2@1,0; e3@2,0; d1@0.5,2; d2@1.5,2.4; d3@2.5,2
edges: e1>d1; e2>d1; e3>d1; e1>d2; e2>d2; e3>d2; e1>d3; e2>d3; e3>d3; d1>d2; d1>d3; d2>d3
caption: Information flow in an encoder–decoder with a three-token input ($e_1$–$e_3$) and three output positions ($d_1$–$d_3$). Every output position consults every input position through cross-attention, and the earlier output positions through causal self-attention. The encoder's own bidirectional attention among $e_1$–$e_3$ is not drawn. Drag the nodes to untangle the picture.
:::

A useful middle ground is the **prefix language model**: a single stack of blocks whose mask is bidirectional over a prefix (the input, or a prompt) and causal over the rest. It reads its input like an encoder and writes its output like a decoder, with one set of parameters.

::: example Four masks {#ex-masks}
Write the $4\times4$ patterns of allowed (query, key) pairs for an encoder, a causal decoder and a prefix language model with a prefix of length $2$. How many pairs does each allow?
::: solution
With $1$ for allowed (rows are queries, columns keys):

$$
\underbrace{\begin{pmatrix}1&1&1&1\\1&1&1&1\\1&1&1&1\\1&1&1&1\end{pmatrix}}_{\text{encoder: }16}\qquad
\underbrace{\begin{pmatrix}1&0&0&0\\1&1&0&0\\1&1&1&0\\1&1&1&1\end{pmatrix}}_{\text{decoder: }10}\qquad
\underbrace{\begin{pmatrix}1&1&0&0\\1&1&0&0\\1&1&1&0\\1&1&1&1\end{pmatrix}}_{\text{prefix LM: }11}
$$

The prefix model lets position $1$ see position $2$ (the one extra pair compared with the decoder), because both belong to the prefix; positions $3$ and $4$, which will be generated, see only what precedes them.
:::
:::

## Encoders and masked language modelling {#sec-encoders}

An encoder cannot be trained to predict the next token: with bidirectional attention, position $t$ can see token $t + 1$ and would simply copy it. BERT (Devlin et al., 2018) introduced a different self-supervised task.

::: definition Masked language modelling {#def-mlm}
In **masked language modelling** a random subset of the input positions — $15\%$ in BERT — is chosen as targets. Each target token is replaced by a special `[MASK]` token with probability $0.8$, by a random token with probability $0.1$, and left unchanged with probability $0.1$. The encoder is trained to predict the original token at each target position, with the cross-entropy loss summed over the targets only.
:::

The odd 80/10/10 rule exists because `[MASK]` never appears when the model is later used on real text. If targets were always masked, the model could learn to produce good representations only at `[MASK]` positions; replacing some targets by random tokens and leaving some unchanged forces it to keep a useful representation of *every* token, since it cannot tell which ones it will be asked about.

::: example BERT's targets in numbers {#ex-bert}
A BERT training sequence has $512$ tokens. How many targets does it have on average, and how many of them are masked, replaced and unchanged? How does this compare with a causal decoder on the same text?
::: solution
On average $0.15\cdot512 = 76.8$ targets: $76.8\cdot0.8 = 61.44$ replaced by `[MASK]`, $7.68$ by random tokens, and $7.68$ left as they are. A causal decoder trained on the same $512$ tokens predicts the next token at every position: $512$ targets, about $6.7$ times as many. Every token of the text is used as a target once.
:::
:::

That difference in training signal is easy to state precisely.

::: proposition Targets per sequence {#prop-targets}
On a sequence of $T$ tokens, causal language modelling provides $T$ prediction targets, while masked language modelling with masking rate $p$ provides on average $pT$.
:::

::: proof
A causal model predicts token $t + 1$ from positions $1, \dots, t$ for every $t$ (counting the last prediction, whose target is the next token of the training text), so each of the $T$ positions carries a loss term. In masked modelling each position is a target independently with probability $p$, so the expected number of targets is $pT$ by linearity of expectation.
:::

Encoders are nevertheless excellent at what they were built for. Because every token's representation draws on the whole text, an encoder is the natural tool for **classifying** a text (spam or not, the sentiment of a review), **labelling** its tokens (named entities, parts of speech), and producing **embeddings** of sentences or passages for search ([[prompting-rag/text-embeddings]]). For several years after 2018, fine-tuned encoders in the BERT family — and their refinements RoBERTa (more data, no next-sentence task) and ELECTRA (detecting replaced tokens, so every position gives a training signal) — were the state of the art on most language-understanding benchmarks.

::: warning Masked models do not give the probability of a text
A causal decoder assigns a probability to any text by the chain rule, $p(x_1, \dots, x_T) = \prod_tp(x_t\mid x_{<t})$, so its perplexity is well defined ([[text-and-language/perplexity]]). A masked language model only predicts tokens given *both* sides, and multiplying those conditionals does not give a valid joint probability. Comparing the "perplexity" of BERT with that of GPT is therefore meaningless; specialised measures such as the pseudo-log-likelihood (Salazar et al., 2020) exist, but they are not on the same scale.
:::

## Decoders {#sec-decoders}

A causal decoder is the simplest of the three designs: one stack, one mask, one objective — predict the next token. Its strengths follow directly from [[transformers/multi-head-attention#prop-causal]]. Every token of the training data is a target ([[#prop-targets]]); generation is the same computation used in training, run one token at a time; and any task that can be written as text — translation, question answering, classification, summarisation — can be posed as a continuation of a prompt, without task-specific output layers. GPT-2 (2019) showed that a large decoder performs some tasks without any task-specific training, and GPT-3 (2020) that it can learn new tasks from a few examples in its prompt ([[prompting-rag/in-context-learning]]).

Decoders pay for this generality in one way: a token early in the prompt cannot see the words that come after it. When reading a question that ends with *… and why?*, the representations of the first words are computed without knowing the end. In practice large decoders compensate through depth and scale, and the last position — which has seen the whole prompt — is the one that produces the answer.

::: quiz
Which of these models can generate text left to right, token by token, without changing its architecture? (Select all that apply.)
- [x] A causal decoder such as GPT
- [x] An encoder–decoder such as T5, given an input
- [ ] A bidirectional encoder such as BERT
- [x] A prefix language model, after its prefix
::: solution
Generation requires that each new position depends only on what precedes it. A causal decoder and a prefix LM (after the prefix) have exactly this property, and an encoder–decoder's decoder is causal over the output while consulting the full input. BERT's bidirectional attention lets every position see the future, so it was never trained to produce text one token at a time; generating with it needs special procedures and works poorly.
:::
:::

## Encoder–decoders {#sec-encdec}

The original Transformer was an encoder–decoder for translation, and the design remains natural whenever an input and an output play different roles: translation, summarisation, speech recognition (the Whisper model encodes audio and decodes text), and more generally any "text-to-text" problem. T5 (Raffel et al., 2019) framed every task in this way — *translate English to German: …*, *summarize: …* — and pretrained with **span corruption**: random spans of the input are replaced by sentinel tokens, and the decoder must output the missing spans. BART (Lewis et al., 2019) pretrained an encoder–decoder by reconstructing documents corrupted in several ways.

An encoder–decoder spends its parameters differently from a decoder of the same depth. Each decoder block has a cross-attention sub-layer in addition to self-attention, so it has $4d^2 + 4d^2 + 8d^2 = 16d^2$ weights instead of $12d^2$, while each encoder block has $12d^2$. At generation time the encoder runs once over the input and the decoder runs once per output token, consulting the cached encoder output each time.

::: example Cross-attention shapes {#ex-cross}
An encoder–decoder with $d = 512$ translates a $50$-token sentence and has produced $20$ output tokens so far. Give the shapes of the queries, keys and values of one cross-attention head with $d_k = 64$, and of its attention matrix. Which of these change when the next token is generated?
::: solution
Queries come from the $20$ decoder positions: $20\times64$. Keys and values come from the $50$ encoder outputs: $50\times64$ each. The attention matrix is $20\times50$, with $1000$ entries. When the $21$st token is generated, only one new query row is needed; the keys and values come from the encoder, which does not change, so they are computed once per input and reused for every output token.
:::
:::

::: example T5-Base, counted {#ex-t5}
T5-Base has $d = 768$, $d_{\text{ff}} = 3072$, $12$ encoder and $12$ decoder blocks, no biases, a shared input/output embedding of $32{,}128\times768$, normalisation gains before each sub-layer and at the end of each stack, and a small table of relative position biases ($32$ buckets $\times$ $12$ heads) in each stack. Count its parameters.
::: solution
Encoder blocks: $12\cdot12d^2 = 84{,}934{,}656$. Decoder blocks: $12\cdot16d^2 = 113{,}246{,}208$. Embedding: $32{,}128\cdot768 = 24{,}674{,}304$. Normalisation gains: the encoder has $2$ per block plus a final one, the decoder $3$ per block plus a final one, $62\cdot768 = 47{,}616$ in all. Relative biases: $2\cdot32\cdot12 = 768$. Total: $222{,}903{,}552$ — the "220 million" of the T5 paper. More than half the block parameters are in the decoder, because of its cross-attention.
:::
:::

## Which family, and why decoders won {#sec-which}

| family | attention | typical objective | strengths | examples |
|---|---|---|---|---|
| encoder | bidirectional | masked LM | classification, tagging, embeddings | BERT, RoBERTa, ELECTRA |
| decoder | causal | next token | generation, prompting, in-context learning | GPT series, LLaMA, Mistral, Qwen |
| encoder–decoder | bidirectional + causal + cross | span corruption, denoising | translation, summarisation, speech | T5, BART, Whisper |
| prefix LM | bidirectional prefix, causal rest | next token after prefix | conditional generation with one stack | UniLM, T5's prefix-LM variant |

Why did general-purpose language models converge on decoders? The evidence is partly empirical and partly practical. Wang et al. (2022) trained models of each family at the same scale and found that, after unsupervised pretraining alone, causal decoders generalised best to new tasks given as prompts, while encoder–decoders did best after additional multitask fine-tuning. Decoders are also the simplest to scale: one stack, every token a target, the same code path for training and generation, and caching of past keys and values during generation ([[inference/kv-cache]]). As models grew, the generality of "everything is a continuation of text" outweighed the encoders' advantage on fixed-format tasks. Encoders remain the workhorses for embeddings and classification where a model must be small and fast, and encoder–decoders for speech recognition and some translation systems.

::: history
Encoder–decoder models arose in neural machine translation: Sutskever, Vinyals and Le (2014) and Cho et al. (2014) used recurrent networks, Bahdanau, Cho and Bengio (2014) added attention, and Vaswani et al. (2017) built the Transformer as an encoder–decoder. In 2018 the two halves went separate ways: OpenAI's GPT (Radford et al.) pretrained a decoder alone, and Google's BERT (Devlin et al.) an encoder alone with masked language modelling. RoBERTa (Liu et al., 2019) showed that BERT had been undertrained, and ELECTRA (Clark et al., 2020) replaced masking with replaced-token detection. In 2019 UniLM (Dong et al.) unified the masks in one model, BART (Lewis et al.) introduced denoising encoder–decoders, and T5 (Raffel et al.) compared architectures and objectives systematically. GPT-3 (Brown et al., 2020) demonstrated in-context learning at scale with a decoder, and Wang et al. (2022) compared the families for zero-shot generalisation. Most large language models since have been decoders.
:::

::: summary
- Encoders use bidirectional attention and are trained by masked language modelling; they excel at classification, tagging and embeddings but do not define a left-to-right probability of text.
- Decoders use causal attention and next-token prediction; every token is a target, generation reuses the training computation, and any task can be posed as a prompt.
- Encoder–decoders add cross-attention, with queries from the decoder and keys and values from the encoder; each decoder block has $16d^2$ weights instead of $12d^2$, and the encoder runs once per input.
- A prefix language model uses one stack with a mask that is bidirectional over a prefix and causal afterwards.
- General-purpose language models converged on decoders because of their simplicity, training efficiency and generality; encoders and encoder–decoders remain strong for embeddings, classification, speech and translation.
:::

## Exercises

::: exercise Counting allowed pairs {level=1 check="11"}
For $T = 4$, how many (query, key) pairs does each of the masks of [[#ex-masks]] allow? Give the number for the prefix language model with a prefix of length $2$.
::: solution
Encoder $16$, decoder $1 + 2 + 3 + 4 = 10$, prefix LM $11$: the decoder's $10$ plus the pair (query $1$, key $2$), allowed because both positions are in the prefix.
:::
:::

::: exercise BERT's targets {level=1 check="76.8"}
How many targets does a $512$-token BERT sequence have on average with a masking rate of $15\%$?
::: solution
$0.15\cdot512 = 76.8$, as in [[#ex-bert]].
:::
:::

::: exercise A cross-attention matrix {level=1 check="1000"}
In [[#ex-cross]], how many entries does one head's cross-attention matrix have?
::: solution
$20$ decoder queries times $50$ encoder keys: $20\cdot50 = 1000$.
:::
:::

::: exercise A decoder block with cross-attention {level=1 check="16777216"}
How many weights does one decoder block of an encoder–decoder with $d = 1024$ and $d_{\text{ff}} = 4096$ have, ignoring biases and normalisation? How does it compare with a block of a decoder-only model?
::: solution
Self-attention $4d^2$, cross-attention $4d^2$, feed-forward $8d^2$: $16d^2 = 16\cdot1024^2 = 16{,}777{,}216$, a third more than the $12d^2 = 12{,}582{,}912$ of a decoder-only block.
:::
:::

::: exercise Corrupted, not only masked {level=2 check="61.44"}
For a $512$-token BERT sequence, compute the expected number of target positions that are replaced by `[MASK]`, by a random token, and left unchanged. What is the expected number of `[MASK]` tokens?
::: solution
$76.8\cdot0.8 = 61.44$ `[MASK]` tokens, $76.8\cdot0.1 = 7.68$ random replacements and $7.68$ unchanged targets.
:::
:::

::: exercise Prefix masks for generation {level=2}
A prefix language model with prefix length $P$ is used to generate the tokens after the prefix one at a time. Show that the output at a generated position $t > P$ depends only on tokens $1, \dots, t$, so the model can generate without seeing the future. How many pairs does its mask allow for $T = 8$ and $P = 5$?
::: solution
For a query $t > P$ the mask allows exactly the keys $j\le t$ (the prefix rows are the only ones with extra entries, and they lie inside the prefix). The induction of [[transformers/multi-head-attention#prop-causal]] applies to these positions: their representations depend on positions $\le t$, whose own representations (prefix positions included, which depend only on the prefix) depend on positions $\le t$ as well. So generation is valid. For $T = 8$, $P = 5$: the prefix block allows $5\cdot5 = 25$ pairs, and the rows $6, 7, 8$ allow $6 + 7 + 8 = 21$, a total of $46$ (the causal mask alone would allow $36$).
:::
:::

::: exercise Classifying with a decoder {level=2}
A causal decoder is fine-tuned to classify movie reviews as positive or negative by adding a linear classifier on top of one position's final representation. Which position should it use, and why would using the first position be a poor choice? How does an encoder avoid this problem?
::: solution
The last position, because by [[transformers/multi-head-attention#prop-causal]] it is the only one whose representation depends on the whole review; the first position has seen only the first token. An encoder's representations all depend on the whole input, so BERT can use any position — conventionally a special `[CLS]` token placed first — or an average of all positions.
:::
:::

::: exercise The cost of a long input {level=2}
A system must summarise a $2000$-token document into $100$ tokens. Compare, qualitatively, an encoder–decoder (encoder over the document, decoder over the summary) with a decoder-only model that sees document and summary as one sequence. Which parts of the work happen once, and which once per generated token?
::: solution
The encoder–decoder runs its encoder once over $2000$ tokens with bidirectional attention; each of the $100$ decoding steps then runs the decoder for one new token, with self-attention over the summary so far and cross-attention to the $2000$ cached encoder outputs. The decoder-only model processes the $2000$ document tokens once with causal attention (the "prefill"), caching their keys and values, then for each of the $100$ new tokens runs the whole stack for one position, attending to all earlier tokens. In both, the document is read once and each output token costs one pass of (part of) the network that consults the whole document. The decoder-only model uses one set of parameters for both roles and causal attention over the document; the encoder–decoder splits parameters between reading and writing and reads the document bidirectionally.
:::
:::

::: exercise Why keep some targets unchanged? {level=3}
Suppose BERT always replaced its targets by `[MASK]`. Explain why the representations of *unmasked* tokens would receive no direct training signal, why that matters when the model is fine-tuned on text without `[MASK]` tokens, and how the $10\%$ random and $10\%$ unchanged replacements fix it.
::: solution
The loss is computed only at target positions, and if every target showed `[MASK]`, the model would learn to make good predictions from representations of positions *showing* `[MASK]`. Nothing would require the representation at a position showing a real token to encode that token's identity in context, because such positions are never targets. In fine-tuning and use, inputs contain no `[MASK]`, so the representations the downstream task relies on are exactly the ones that were never directly trained. With $10\%$ unchanged and $10\%$ random replacements, some positions showing a real token *are* targets, and the model cannot tell which; it must therefore keep a contextual representation of every token, and it must also check whether the shown token fits its context (because $10\%$ of the time it is wrong).
:::
:::

::: exercise Masks in code {level=3}
Write PyTorch functions that return the boolean masks (True = allowed) of an encoder, a causal decoder and a prefix language model of length $T$ with prefix $P$, and check the counts of [[#ex-masks]] and of exercise 6. Pass one of them to `torch.nn.functional.scaled_dot_product_attention` through its `attn_mask` argument and confirm that it agrees with `is_causal=True` for the causal mask.
::: solution
```python
import torch, torch.nn.functional as F

def encoder_mask(T):    return torch.ones(T, T, dtype=torch.bool)
def decoder_mask(T):    return torch.tril(torch.ones(T, T, dtype=torch.bool))
def prefix_mask(T, P):
    m = decoder_mask(T); m[:P, :P] = True; return m

print([int(m.sum()) for m in (encoder_mask(4), decoder_mask(4), prefix_mask(4, 2), prefix_mask(8, 5))])
# [16, 10, 11, 46]
q, k, v = (torch.randn(1, 2, 8, 16) for _ in range(3))
a = F.scaled_dot_product_attention(q, k, v, attn_mask=decoder_mask(8))
b = F.scaled_dot_product_attention(q, k, v, is_causal=True)
print(torch.allclose(a, b, atol=1e-6))   # True
```

A boolean `attn_mask` marks the pairs that may attend; the function sets the others to $-\infty$ before the softmax, exactly as in [[transformers/multi-head-attention#def-causal-mask]].
:::
:::

::: exercise A decoder can do the encoder–decoder's job {level=3}
Show how a decoder-only model can be trained on translation pairs $(x, y)$ by concatenating them into one sequence `x [SEP] y` and computing the loss only on the tokens of $y$. In what precise sense is this model weaker than an encoder–decoder of the same size, and in what sense is it more economical?
::: solution
Train on the concatenation with the causal mask and mask out the loss terms for positions whose target lies in $x$ or is the separator; then the model learns $p(y_t\mid x, y_{<t})$, exactly the conditional distribution an encoder–decoder learns. At test time feed `x [SEP]` and generate. It is weaker in that the representations of the source tokens are computed causally — each source token sees only earlier source tokens — whereas an encoder reads the source bidirectionally; a prefix-LM mask removes this difference. It is more economical in that one set of parameters serves both reading and writing, there is no separate cross-attention ($12d^2$ per block instead of $12d^2$ for the encoder plus $16d^2$ for the decoder), and the same model can be trained on plain text as well, which is how general-purpose decoders learn translation among many other tasks.
:::
:::
