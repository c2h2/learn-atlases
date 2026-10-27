The earlier chapters of this course treated the choices of a pretraining run one at a time: the objective, the data, the mixture, the training loop. A **model family** is what results when a team makes all of them together and then scales the result: BERT, T5, the GPT series, LLaMA and the many open-weight families that followed it. Studying families is useful for two reasons. It shows which combinations of choices have worked, and how they converged — today's decoders differ far less from one another than BERT differed from GPT. And it trains the skill of reading a technical report: separating what is documented from what is implied, and noticing what is left out.

This chapter traces the three architectural lineages of [[transformers/architecture-families]] — encoders, encoder–decoders and decoders — through their best-documented members, with dates, sizes and token counts as published. It counts the parameters of representative configurations, follows the shift from compute-optimal to heavily **over-trained** models, treats mixture-of-experts families, and defines the degrees of **openness** with which models are released. It describes only what has been published; where a developer has not disclosed a detail, neither does this chapter. Facts are as of 2026, and the list of families is illustrative rather than complete.

## What defines a family {#sec-defining}

::: definition Model family {#def-family}
A **model family** is a set of models released by one developer (or collaboration) that share an architecture and training recipe and differ mainly in scale — number of parameters $N$, training tokens $D$, sometimes context length — usually described in one technical report or model card. Its **design choices** are: the architecture (encoder, decoder or encoder–decoder, [[transformers/architecture-families]]), the block details (normalisation, activation, positional encoding, attention variant), the tokeniser and vocabulary, the pretraining objective, the data and their mixture, the token budget, and the release terms.
:::

The lineage diagram below summarises which designs built on which. It is a simplification: influence in this field flows in many directions, and every family borrowed from several predecessors.

::: widget graph
nodes: Transformer@0,2; GPT@1,3; BERT@1,1; GPT2@2,3; RoBERTa@2,0.5; ELECTRA@3,0.5; T5@2,2; BART@2,1.5; GPT3@3,3; LLaMA@4,3; Mistral@5,3.6; DeepSeek@5,2.4
edges: Transformer>GPT; Transformer>BERT; Transformer>T5; Transformer>BART; GPT>GPT2; GPT2>GPT3; GPT3>LLaMA; BERT>RoBERTa; RoBERTa>ELECTRA; BERT>T5; BERT>BART; LLaMA>Mistral; LLaMA>DeepSeek
algorithm: topo
caption: A simplified lineage of pretrained model families: an arrow means "built directly on the design or objective of". Encoders (BERT, RoBERTa, ELECTRA) are at the bottom, encoder–decoders (T5, BART) in the middle, decoders (the GPT series, LLaMA and families that adopted its design) at the top. Step through the topological sort to see an order in which each family comes after everything it built on.
:::

## Encoders {#sec-encoders}

**BERT** (Devlin et al., released October 2018, published at NAACL 2019) defined the encoder family: a bidirectional Transformer pretrained with masked language modelling ([[pretraining/pretraining-objectives#def-mlm]]) and next-sentence prediction on BooksCorpus ($800$ million words) and English Wikipedia ($2{,}500$ million words), in two sizes — Base ($110$ million parameters, $12$ layers, $d = 768$) and Large ($340$ million, $24$ layers, $d = 1024$) — with a WordPiece vocabulary of $30{,}000$ tokens. Fine-tuned with a small task head, it set the state of the art on most language-understanding benchmarks of the time.

Its successors changed the recipe rather than the architecture. **RoBERTa** (Liu et al., 2019) dropped next-sentence prediction, used dynamic masking, much larger batches and $160$ GB of text, and showed that BERT had been substantially undertrained. **ALBERT** (Lan et al., 2019) shared parameters across layers and factorised the embedding matrix to cut parameters. **ELECTRA** (Clark et al., 2020) replaced masking with replaced-token detection, making every position a target. **DeBERTa** (He et al., 2021) separated content and position in attention. **XLM-R** (Conneau et al., 2020) trained a multilingual encoder on $2.5$ TB of filtered Common Crawl text in $100$ languages. **ModernBERT** (Warner et al., December 2024) brought the encoder up to date with techniques from decoders — rotary positions, gated activations, a context of $8192$ tokens — and $2$ trillion training tokens. Encoders remain widely used for classification, retrieval and embeddings ([[prompting-rag/text-embeddings]]), where their bidirectionality and small size are advantages.

## Encoder–decoders {#sec-encdec}

**T5** (Raffel et al., released October 2019, JMLR 2020) cast every task as text-to-text and was pretrained with span corruption ([[pretraining/pretraining-objectives#def-span-corruption]]) on C4 ([[pretraining/training-data#sec-datasets]]), in sizes from $60$ million to $11$ billion parameters; its paper's systematic comparison of objectives, architectures and data remains a reference. **mT5** (Xue et al., 2021) extended it to $101$ languages. **BART** (Lewis et al., 2020) pretrained an encoder–decoder by denoising ([[pretraining/pretraining-objectives#def-denoising]]). **UL2** (Tay et al., 2023) trained a $20$-billion-parameter encoder–decoder with a mixture of denoisers, and **Flan-T5** (Chung et al., 2022) showed how much instruction tuning improves such models ([[post-training/instruction-tuning]]). Encoder–decoders remain standard in speech recognition and translation, but general-purpose language models have converged on decoders, for the reasons discussed in [[transformers/architecture-families#sec-which]].

## Decoders: from GPT to over-trained models {#sec-decoders}

**The GPT series.** OpenAI's **GPT** (Radford et al., June 2018) pretrained a $117$-million-parameter decoder on BooksCorpus and fine-tuned it per task. **GPT-2** (February 2019) scaled to $1.5$ billion parameters on WebText ($40$ GB of text from about $8$ million web pages linked from Reddit) and showed zero-shot task performance; the full model was released in stages, completed in November 2019, after concerns about misuse. **GPT-3** (Brown et al., May 2020) had $175$ billion parameters — $96$ layers, $d = 12{,}288$, $96$ heads, a context of $2048$ tokens — trained on $300$ billion tokens ([[pretraining/data-mixtures#ex-gpt3]]), and demonstrated in-context learning from a few examples ([[prompting-rag/in-context-learning]]). The **GPT-4** technical report (March 2023) states that it contains no details of the architecture (including model size), hardware, training compute, dataset construction or training method, citing the competitive landscape and safety; its successors are documented mainly through system cards and evaluations.

**Large dense decoders of 2021–2022.** **Gopher** (Rae et al., December 2021; DeepMind) trained $280$ billion parameters on $300$ billion tokens of MassiveText. **Chinchilla** (Hoffmann et al., March 2022) trained $70$ billion parameters on $1.4$ trillion tokens with the same compute as Gopher and outperformed it, establishing the compute-optimal ratio of roughly $20$ tokens per parameter ([[scaling/compute-optimal-training]]). **PaLM** (Chowdhery et al., April 2022; Google) trained $540$ billion parameters on $780$ billion tokens on $6144$ TPU v4 chips. **OPT** (Zhang et al., May 2022; Meta) released a $175$-billion-parameter model to researchers with its logbook, **BLOOM** (BigScience, July 2022) a $176$-billion-parameter multilingual model trained on $46$ natural and $13$ programming languages by an open collaboration of over a thousand researchers, and **GLM-130B** (Zeng et al., 2022; Tsinghua University) a bilingual Chinese–English model.

**LLaMA and the open-weight wave.** **LLaMA** (Touvron et al., February 2023; Meta) trained models of $7$ to $65$ billion parameters on $1.0$ to $1.4$ trillion tokens of publicly available data, deliberately using far more tokens per parameter than compute-optimal training would suggest, so that smaller models would be cheap to run; its weights were released to researchers and soon circulated widely. **Llama 2** (July 2023) trained $7$, $13$ and $70$ billion parameters on $2$ trillion tokens with a $4096$-token context, under a licence permitting commercial use with conditions. **Llama 3** (April 2024) and **Llama 3.1** (July 2024) used a $128{,}256$-token vocabulary, over $15$ trillion training tokens and sizes up to $405$ billion parameters, with a context of $128$K tokens. Many families from other developers appeared in the same period, among them **Mistral 7B** (Mistral AI, October 2023, released under the Apache 2.0 licence, with grouped-query and sliding-window attention), **Falcon** (Technology Innovation Institute, 2023, trained mainly on RefinedWeb, up to $180$ billion parameters), **Qwen** (Alibaba, from 2023; the Qwen2.5 report of 2024 describes $18$ trillion pretraining tokens), **DeepSeek** (from 2023), **Gemma** (Google, from February 2024), the small **phi** models (Microsoft, from 2023) and **Yi** (01.AI, 2023). Fully open research families — **Pythia** (EleutherAI, 2023) and **OLMo** (Allen Institute for AI, from February 2024) — released their data, code and intermediate checkpoints as well as weights.

**Closed families.** Several of the most widely used model families — for example OpenAI's GPT-4 and later models, Anthropic's Claude, and Google DeepMind's Gemini (whose first report, December 2023, describes it as natively multimodal) — are available through products and APIs, with technical reports and model cards that describe capabilities, evaluations and safety measures but not, in general, parameter counts, data or training details. Statements about their internals that do not come from their developers are speculation and are not repeated here.

### Convergence of the decoder design {#sec-convergence}

By 2024 most open decoder families shared a common block, sometimes called "LLaMA-style":

| choice | GPT-3 (2020) | typical open decoder (2023–2025) | chapter |
|---|---|---|---|
| normalisation | pre-LayerNorm | pre-RMSNorm | [[transformers/transformer-block#def-rmsnorm]] |
| feed-forward | GELU, $4d$ | SwiGLU, $\approx\frac83d$ or more | [[transformers/transformer-block#def-swiglu]] |
| positions | learned absolute | RoPE | [[transformers/positional-encoding#def-rope]] |
| attention | multi-head (alternating sparse) | grouped-query | [[transformers/efficient-attention#def-gqa]] |
| biases | yes | none | |
| vocabulary | $50{,}257$ | $32$K to $256$K | [[text-and-language/tokenisation]] |
| stability extras | — | some use QK-norm, z-loss | [[pretraining/training-stability]] |

The differences between families now lie less in the block than in the data, the token budget, the tokeniser, the post-training, and — for the largest models — whether the feed-forward layers are mixtures of experts.

::: example Counting Llama 3 8B {#ex-llama3}
Llama 3 8B has $32$ layers, $d = 4096$, $32$ query heads of dimension $128$ with $8$ key–value heads (grouped-query attention), a SwiGLU network with $d_{\text{ff}} = 14{,}336$, a vocabulary of $128{,}256$, RMSNorm gains, no biases and untied input and output embeddings. Count its parameters.
::: solution
Per layer, attention: $W_Q$ and $W_O$ are $4096\times4096$ each ($16{,}777{,}216$ each); $W_K$ and $W_V$ map $4096$ to $8\cdot128 = 1024$ ($4{,}194{,}304$ each); total $41{,}943{,}040$. Feed-forward: $3\cdot4096\cdot14{,}336 = 176{,}160{,}768$. Norms: $2\cdot4096 = 8192$. Per layer: $218{,}112{,}000$; for $32$ layers $6{,}979{,}584{,}000$. Embeddings: $2\cdot128{,}256\cdot4096 = 1{,}050{,}673{,}152$. Final norm: $4096$. Total: $8{,}030{,}261{,}248$ — the published $8.03$ billion. Compared with LLaMA-7B ([[transformers/transformer-block#ex-llama]]), the larger vocabulary adds $0.79$ billion parameters (an eighth of the model) and grouped-query attention saves $2\cdot32\cdot(4096^2 - 4096\cdot1024) = 0.81$ billion, which was spent on a wider feed-forward network.
:::
:::

### The token budget: from compute-optimal to over-trained {#sec-over-training}

::: definition Tokens per parameter {#def-tokens-per-param}
The **tokens-per-parameter ratio** of a model is $D/N$. With training compute $C\approx6ND$ ([[pretraining/training-loop#prop-6nd]]), the compute-optimal analysis of Hoffmann et al. (2022) gives $D/N\approx20$; a model trained with a much larger ratio is called **over-trained** (relative to compute-optimality, not in the sense of overfitting).
:::

::: proposition Size and tokens at fixed compute {#prop-fixed-compute}
For a training budget $C = 6ND$ and a chosen ratio $r = D/N$, the model size and token count are

$$
N = \sqrt{\frac{C}{6r}},\qquad D = \sqrt{\frac{Cr}{6}}.
$$

Multiplying the ratio by a factor $k$ at fixed compute divides $N$ by $\sqrt k$ and multiplies $D$ by $\sqrt k$.
:::

::: proof
Substitute $D = rN$ into $C = 6ND$ to get $C = 6rN^2$, so $N = \sqrt{C/(6r)}$, and $D = rN = \sqrt{r^2C/(6r)} = \sqrt{Cr/6}$. Replacing $r$ by $kr$ multiplies $N$ by $1/\sqrt k$ and $D$ by $\sqrt k$.
:::

::: example Gopher and Chinchilla {#ex-chinchilla}
Gopher had $280$ billion parameters and $300$ billion training tokens; Chinchilla $70$ billion and $1.4$ trillion. Compare their training compute and tokens-per-parameter ratios, and use [[#prop-fixed-compute]] to find the size of a model with Gopher's compute at Chinchilla's ratio.
::: solution
Gopher: $6\cdot2.8\times10^{11}\cdot3\times10^{11} = 5.0\times10^{23}$ FLOPs, ratio $1.07$. Chinchilla: $6\cdot7\times10^{10}\cdot1.4\times10^{12} = 5.9\times10^{23}$ FLOPs, ratio $20$. With $C = 5.0\times10^{23}$ and $r = 20$, $N = \sqrt{5.0\times10^{23}/120} = 6.5\times10^{10}$ — about Chinchilla's size. At roughly equal compute, the model four times smaller trained on almost five times as many tokens was better on nearly every evaluation Hoffmann et al. reported; the result changed how every later family chose its token budget.
:::
:::

Compute-optimality minimises the loss for a given **training** budget. But a deployed model's lifetime cost includes **inference**, about $2N$ FLOPs per generated token, which may far exceed training if the model serves many users. A smaller model trained on more tokens reaches a given loss with more training compute but less inference compute (Sardana et al., 2024, made this trade-off explicit). This explains the trajectory of the ratio:

::: widget plot
f: 1.301 + 0*x
x: 2019.5, 2025
y: -0.5, 4
points: 2020.4,0.234; 2021.9,0.030; 2022.2,1.301; 2022.3,0.159; 2023.1,1.333; 2023.15,2.171; 2023.5,1.456; 2023.55,2.472; 2024.3,3.272; 2024.55,1.586; 2024.7,3.374
labels: compute-optimal $D/N\approx20$ ($\log_{10} = 1.30$)
caption: $\log_{10}$ of tokens per parameter for published models against release date: GPT-3 175B ($1.7$), Gopher ($1.1$), Chinchilla ($20$), PaLM 540B ($1.4$), LLaMA-65B ($22$) and LLaMA-7B ($148$), Llama 2 70B ($29$) and 7B ($297$), Llama 3 8B (about $1900$), Llama 3.1 405B ($39$) and Qwen2.5-7B (about $2400$, from the reported $18$ trillion tokens). The line marks the compute-optimal ratio. After 2022, large flagship models moved to roughly the compute-optimal ratio, while small models moved far beyond it.
:::

::: example How over-trained is a small model? {#ex-over-training}
Llama 3 8B was trained on about $15$ trillion tokens. Compute its tokens-per-parameter ratio and training compute. How many tokens would a compute-optimal model of the same compute have, and how large would it be?
::: solution
$D/N = 1.5\times10^{13}/8.03\times10^9 = 1868$, about $93$ times the compute-optimal $20$. Compute: $6\cdot8.03\times10^9\cdot1.5\times10^{13} = 7.2\times10^{23}$ FLOPs. A compute-optimal model with $D = 20N$ and the same $C = 6ND = 120N^2$ has $N = \sqrt{7.2\times10^{23}/120} = 7.8\times10^{10}$ parameters and $D = 1.55\times10^{12}$ tokens: roughly a $78$-billion-parameter model trained on $1.6$ trillion tokens. It would reach a lower loss for the same training compute, but would cost about ten times as much per generated token at inference.
:::
:::

## Mixture-of-experts families {#sec-moe}

A **mixture-of-experts** (MoE) model replaces each feed-forward network with several experts and a router that sends each token to a few of them ([[transformers/mixture-of-experts#def-moe]]), so that the number of parameters $N_{\text{total}}$ grows while the compute per token depends on the **active** parameters $N_{\text{active}}$. Training compute is therefore about $6N_{\text{active}}D$.

Published MoE language models include GShard (Lepikhin et al., 2020) and the Switch Transformer (Fedus et al., 2021) at Google, **Mixtral 8x7B** (Mistral AI, December 2023; $46.7$ billion total and $12.9$ billion active parameters, two of eight experts per token), **DeepSeek-V2** (May 2024; $236$ billion total, $21$ billion active, $8.1$ trillion tokens, with multi-head latent attention to shrink the key–value cache) and **DeepSeek-V3** (December 2024; $671$ billion total, $37$ billion active, $14.8$ trillion tokens, FP8 training, [[pretraining/training-stability#sec-formats]]), as well as MoE members of the Qwen, Llama and other families from 2024 onwards.

::: example The compute of DeepSeek-V3 {#ex-deepseek}
DeepSeek-V3 has $37$ billion active parameters and was pretrained on $14.8$ trillion tokens; its report gives $2.664$ million GPU hours for pretraining. Estimate the training FLOPs and the average model FLOP/s achieved per GPU. How would a dense model with $671$ billion parameters compare?
::: solution
$C\approx6\cdot3.7\times10^{10}\cdot1.48\times10^{13} = 3.29\times10^{24}$ FLOPs (ignoring attention and the multi-token-prediction module). Per GPU: $3.29\times10^{24}/(2.664\times10^6\cdot3600\text{ s}) = 3.4\times10^{14}$ FLOP/s, $340$ TFLOP/s on average. A dense model of $671$ billion parameters on the same tokens would need $6\cdot6.71\times10^{11}\cdot1.48\times10^{13} = 6.0\times10^{25}$ FLOPs, $18$ times as much. MoE models buy parameters (and the knowledge capacity that comes with them) without paying the full compute, at the price of more memory and communication ([[transformers/mixture-of-experts#sec-systems]]).
:::
:::

## Degrees of openness {#sec-openness}

"Open" is used for very different releases.

::: definition Release categories {#def-openness}
- **Closed** (API or product access): users can query the model but not obtain its weights.
- **Open-weight**: the trained weights can be downloaded, under a licence that may be permissive (for example Apache 2.0 or MIT) or carry conditions on use, users or scale; training data and code may not be released.
- **Fully open** (sometimes "open source"): weights, training code and data (or a complete recipe to rebuild the data), often with intermediate checkpoints and evaluation code. The Open Source Initiative's Open Source AI Definition (version 1.0, October 2024) requires, among other things, sufficiently detailed information about the training data to allow a skilled person to build a substantially equivalent system.
:::

Each has costs and benefits that are argued in good faith. Open weights let researchers study models, let organisations run them privately and adapt them ([[pretraining/continued-pretraining]]), and spread capability beyond a few companies; they also make safety measures removable and releases irreversible. Closed release keeps control over use and allows updates and monitoring, but concentrates capability and makes independent scrutiny harder. Fully open releases enable the most science (data studies, contamination checks, training-dynamics research) but are expensive and raise their own data-licensing questions ([[pretraining/training-data#sec-rights]]). Licences also change: several families have moved between licence terms across versions, so the terms of a particular release should be read at the source. The broader debate belongs to [[llm-society]] and [[safety-alignment]].

::: warning Read the report, not the headline
A model's name and parameter count say little about it on their own. Two "7B" models may differ by a factor of ten in training tokens, have different tokenisers (so their losses are not comparable), different context lengths, and different post-training. Benchmark tables in reports use different prompts, shot counts and scoring conventions ([[pretraining/in-training-evaluation#def-mc-scoring]]), and may not be decontaminated in the same way. Before comparing families, find for each: $N$ (total and active), $D$, the data sources, the tokeniser, the context length, the evaluation protocol — and note which of these the developer did not disclose.
:::

## Counting configurations in code {#sec-code}

The listing counts parameters from a configuration, handling GELU or SwiGLU feed-forward networks, LayerNorm or RMSNorm, biases, grouped-query attention and tied or untied embeddings, and applies it to four published configurations.

```python
def count(cfg):
    d, L, V, f = cfg["d"], cfg["layers"], cfg["vocab"], cfg["ffn"]
    h, kv = cfg["heads"], cfg.get("kv_heads", cfg["heads"])
    dk = d // h
    attn = d * d + 2 * d * kv * dk + d * d                  # W_Q, W_K, W_V (grouped), W_O
    ffn = (3 if cfg["glu"] else 2) * d * f                   # SwiGLU has three matrices
    norms = (2 if cfg["rms"] else 4) * d                     # RMSNorm: gain only; LayerNorm: gain + bias
    bias = 0
    if cfg.get("bias"):
        bias = d + 2 * kv * dk + d + f * (2 if cfg["glu"] else 1) + d
    block = attn + ffn + norms + bias
    emb = V * d * (1 if cfg["tied"] else 2) + cfg.get("positions", 0) * d
    final = (1 if cfg["rms"] else 2) * d
    return L * block + emb + final, L * ffn, emb

models = {
    "GPT-3 175B": dict(d=12288, layers=96, vocab=50257, ffn=4 * 12288, heads=96, glu=False,
                       rms=False, bias=True, tied=True, positions=2048),
    "LLaMA-7B": dict(d=4096, layers=32, vocab=32000, ffn=11008, heads=32, glu=True, rms=True, tied=False),
    "Mistral 7B": dict(d=4096, layers=32, vocab=32000, ffn=14336, heads=32, kv_heads=8, glu=True,
                       rms=True, tied=False),
    "Llama 3 8B": dict(d=4096, layers=32, vocab=128256, ffn=14336, heads=32, kv_heads=8, glu=True,
                       rms=True, tied=False),
}
print(f"{'model':12s} {'parameters':>16s} {'FFN share':>10s} {'embeddings':>12s}")
for name, cfg in models.items():
    total, ffn, emb = count(cfg)
    print(f"{name:12s} {total:16,d} {ffn / total:10.1%} {emb / total:12.1%}")
```

```text
model              parameters  FFN share   embeddings
GPT-3 175B    174,604,259,328      66.4%         0.4%
LLaMA-7B        6,738,415,616      64.2%         3.9%
Mistral 7B      7,241,732,096      77.8%         3.6%
Llama 3 8B      8,030,261,248      70.2%        13.1%
```

The counts match the published figures: $175$ billion for GPT-3, $6.74$ billion for LLaMA-7B, $7.24$ billion for Mistral 7B, $8.03$ billion for Llama 3 8B. Grouped-query attention shifts parameters from attention to the feed-forward network, and a large vocabulary makes embeddings a noticeable share of a small model — negligible at $175$ billion parameters, an eighth of an $8$-billion-parameter model.

::: quiz
Which statements about model families are supported by their published reports? (Select all that apply.)
- [x] LLaMA's smaller models were trained on far more tokens per parameter than the compute-optimal ratio.
- [x] BERT was pretrained with masked language modelling and next-sentence prediction.
- [ ] The GPT-4 technical report gives its parameter count.
- [x] Mixtral 8x7B has fewer active than total parameters.
::: solution
LLaMA-7B saw about $148$ tokens per parameter, against about $20$ for compute-optimal training. BERT used both objectives; RoBERTa later dropped next-sentence prediction. The GPT-4 report explicitly omits the model size. Mixtral routes each token to two of eight experts, so about $12.9$ of its $46.7$ billion parameters are active per token.
:::
:::

::: history
The lineages begin in 2018, when GPT (June) and BERT (October) split the Transformer of 2017 into a decoder and an encoder. 2019 brought GPT-2 (February), RoBERTa, XLNet, ALBERT, T5 (October) and BART; 2020 brought ELECTRA, GPT-3 (May) and the first large mixture-of-experts language models (GShard). In 2021–2022 the largest dense decoders appeared — Gopher, PaLM — along with Chinchilla's compute-optimal correction (March 2022) and open releases of large models by OPT, BLOOM and GLM-130B. The GPT-4 report (March 2023) marked a turn towards non-disclosure for the most capable closed models, while LLaMA (February 2023) started a wave of open-weight families: Llama 2, Mistral and Mixtral, Falcon, Qwen, Yi, DeepSeek and Gemma in 2023–2024, and the fully open Pythia and OLMo. DeepSeek-V3 (December 2024) showed a large mixture-of-experts model trained at modest reported cost, and ModernBERT (December 2024) revived the encoder.
:::

::: summary
- A **model family** is a recipe scaled across sizes: architecture, block, tokeniser, objective, data, token budget and release terms.
- **Encoders** (BERT 2018, RoBERTa, ELECTRA, DeBERTa, XLM-R, ModernBERT) remain the tools for classification and embeddings; **encoder–decoders** (T5, BART, UL2, Flan-T5) for text-to-text tasks, speech and translation; **decoders** (GPT series, LLaMA and its successors) for general-purpose language models.
- Open decoders converged on a common block — pre-RMSNorm, SwiGLU, RoPE, no biases, grouped-query attention — and differ mainly in data, tokens, tokeniser and post-training.
- The tokens-per-parameter ratio rose from about $2$ (GPT-3) to $20$ (Chinchilla) and to well over $1000$ for small modern models, because over-training small models lowers inference cost.
- **Mixture-of-experts** families (Switch, Mixtral, DeepSeek-V2/V3) separate total from active parameters; training compute is about $6N_{\text{active}}D$.
- Releases range from **closed** to **open-weight** to **fully open**; compare families from their reports, noting what is not disclosed.
:::

## Exercises

::: exercise Tokens per parameter {level=1 check="20"}
Chinchilla has $70$ billion parameters and was trained on $1.4$ trillion tokens. What is its tokens-per-parameter ratio?
::: solution
$1.4\times10^{12}/7\times10^{10} = 20$.
:::
:::

::: exercise GPT-3's compute {level=1 check="3.15e23"}
Estimate GPT-3's training compute with $C = 6ND$, $N = 1.75\times10^{11}$ and $D = 3\times10^{11}$.
::: solution
$6\cdot1.75\times10^{11}\cdot3\times10^{11} = 3.15\times10^{23}$ FLOPs, the figure usually quoted for GPT-3.
:::
:::

::: exercise Active parameters {level=1 check="0.276"}
What fraction of Mixtral 8x7B's $46.7$ billion parameters is active per token, given $12.9$ billion active? Give three decimal places.
::: solution
$12.9/46.7 = 0.276$, a little over a quarter. The fraction is larger than $2/8$ because attention, embeddings and norms are shared by all tokens.
:::
:::

::: exercise Embedding share {level=2 check="0.131"}
What fraction of Llama 3 8B's $8{,}030{,}261{,}248$ parameters are in its (untied) input and output embeddings, with a vocabulary of $128{,}256$ and $d = 4096$? Give three decimal places.
::: solution
$2\cdot128{,}256\cdot4096 = 1{,}050{,}673{,}152$; divided by the total, $0.131$.
:::
:::

::: exercise Grouped-query savings {level=2}
For a layer with $d = 8192$, $64$ query heads of dimension $128$, compute the attention parameters with full multi-head attention and with $8$ key–value heads, and the saving over $80$ layers.
::: solution
Multi-head: $4d^2 = 4\cdot8192^2 = 268{,}435{,}456$ per layer. Grouped-query with $8$ KV heads: $W_Q$ and $W_O$ $2d^2 = 134{,}217{,}728$; $W_K$ and $W_V$ $2\cdot8192\cdot1024 = 16{,}777{,}216$; total $150{,}994{,}944$. Saving per layer $117{,}440{,}512$; over $80$ layers $9.4$ billion parameters. (These are the dimensions of the Llama 2 and 3 $70$-billion-parameter models.) The larger effect of grouped-query attention is at inference, where it shrinks the key–value cache by a factor of $8$ ([[transformers/efficient-attention#sec-gqa]]).
:::
:::

::: exercise A compute-optimal alternative {level=2 check="1.55e12"}
Following [[#ex-over-training]], how many training tokens would a compute-optimal model ($D = 20N$) with the same training compute as Llama 3 8B ($7.2\times10^{23}$ FLOPs) use? Give three significant figures.
::: solution
$C = 6ND = 6\cdot(D/20)\cdot D = 0.3D^2$, so $D = \sqrt{7.2\times10^{23}/0.3} = \sqrt{2.4\times10^{24}} = 1.55\times10^{12}$ tokens, with $N = 7.75\times10^{10}$ parameters.
:::
:::

::: exercise Lifetime compute {level=2}
A team will serve a model for $10^{13}$ generated tokens over its lifetime (prompt processing ignored). Compare the total compute of (a) a $70$-billion-parameter model trained on $1.4$ trillion tokens and (b) an $8$-billion-parameter model trained on $15$ trillion tokens, using $6ND$ for training and $2N$ per generated token for inference. Which is cheaper over its lifetime, and what does the comparison leave out?
::: solution
(a) Training $6\cdot7\times10^{10}\cdot1.4\times10^{12} = 5.9\times10^{23}$; inference $2\cdot7\times10^{10}\cdot10^{13} = 1.4\times10^{24}$; total $2.0\times10^{24}$ FLOPs. (b) Training $6\cdot8\times10^9\cdot1.5\times10^{13} = 7.2\times10^{23}$; inference $2\cdot8\times10^9\cdot10^{13} = 1.6\times10^{23}$; total $8.8\times10^{23}$. The small, over-trained model costs less than half as much over its lifetime. The comparison leaves out quality — the two models need not reach the same loss or abilities; the larger model is likely better — and the facts that inference is memory-bound and its cost depends on batching and hardware ([[inference/latency-cost]]).
:::
:::

::: exercise Reading a model card {level=3}
You are given two model cards. Model A: "$7$B parameters, trained on $2$T tokens, $32$K vocabulary, $4$K context, MMLU $5$-shot $46\%$." Model B: "$7$B parameters (dense), trained on high-quality data, $152$K vocabulary, $32$K context, MMLU $74\%$." List the information you would need before concluding that B's recipe is better, and explain why each item matters.
::: solution
(1) B's token count: it may have been trained on many more tokens, which alone could explain the gap ([[#sec-over-training]]). (2) The data sources and their decontamination against MMLU ([[pretraining/training-data#sec-contamination]]): "high-quality" data that include benchmark-like material, or annealing on it, can inflate scores. (3) The evaluation protocol: prompt format, cloze versus lettered formulation, normalisation, and whether the base or a post-trained model was scored ([[pretraining/in-training-evaluation#def-mc-scoring]]). (4) Whether B's "$7$B" counts the embeddings: with a $152$K vocabulary, embeddings are a large share of a small model, so its non-embedding parameter count may be smaller than A's. (5) Exact parameter counts, active versus total (B says dense, which helps). (6) Several benchmarks, including held-out ones, rather than one. (7) Release dates: methods improved quickly, and a later model benefits from better data pipelines independently of any single recipe choice.
:::
:::

::: exercise Count a GPT-3 configuration {level=3}
Using the listing's `count` function (or by hand), compute the parameters of a GPT-3-style model with $n_{\text{layer}} = 32$, $d = 4096$, $32$ heads, $d_{\text{ff}} = 4d$, a vocabulary of $50{,}257$, $2048$ learned positions, LayerNorm, biases and tied embeddings (the configuration of GPT-3 6.7B). Check that $12n_{\text{layer}}d^2$ is a good approximation.
::: solution
Per block: attention $4d^2 = 67{,}108{,}864$; feed-forward $8d^2 = 134{,}217{,}728$; two LayerNorms $4d = 16{,}384$; biases $d + 2d + d + 4d + d = 9d = 36{,}864$. Total per block $201{,}379{,}840$; for $32$ blocks $6{,}444{,}154{,}880$. Embeddings: $50{,}257\cdot4096 + 2048\cdot4096 = 205{,}852{,}672 + 8{,}388{,}608 = 214{,}241{,}280$. Final LayerNorm $8192$. Total $6{,}658{,}404{,}352$, the "$6.7$B" of the GPT-3 paper. $12n_{\text{layer}}d^2 = 6{,}442{,}450{,}944$ is within $3.3\%$; the difference is mostly the embeddings.
:::
:::
