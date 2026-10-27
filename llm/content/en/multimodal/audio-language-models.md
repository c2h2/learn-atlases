The simplest voice assistant is a **cascade**: a speech recogniser turns the user's speech into text ([[multimodal/speech]]), a language model writes a reply, and a text-to-speech system speaks it. Cascades work, and they let each component be improved separately, but they have two built-in limitations. They lose everything in speech that is not words — tone of voice, hesitation, laughter, who is speaking, background sounds — because only the transcript passes between components. And they are slow: each stage waits for the previous one, and the system cannot start answering until it has decided that the user has finished. People in conversation leave gaps of about $200$ ms between turns and talk over each other, signalling agreement with "mm-hm" while the other speaker continues; a cascade that needs a second or more to respond, and cannot listen while it speaks, feels like a walkie-talkie.

The alternative is to let a language model read and write audio directly. That requires turning audio into **discrete tokens** at a low rate, the way text is turned into subword tokens, so that a Transformer can model them with next-token prediction. This chapter explains the two kinds of audio token in use — **semantic** tokens from clustering self-supervised speech features, and **acoustic** tokens from **neural audio codecs** with **residual vector quantisation** (SoundStream, 2021; EnCodec, 2022) — and works out their bitrates. It then describes language models over these tokens, from AudioLM's hierarchy to audio-input language models, and ends with **full-duplex spoken dialogue**: models such as Moshi (2024) that listen and speak at the same time, and the latency budgets that decide whether a voice interface feels natural.

## Two kinds of audio token {#sec-tokens}

A $24$ kHz audio stream in 16-bit samples carries $384{,}000$ bits per second. A language model over individual samples would face sequences of $24{,}000$ tokens per second; WaveNet did model audio at that rate ([[multimodal/speech#sec-tts]]), but only for seconds at a time. Audio tokens compress the stream by two to three orders of magnitude, and the two families compress for different purposes.

**Semantic tokens** capture *what is said*. A self-supervised speech encoder such as HuBERT or w2v-BERT ([[multimodal/speech#sec-asr]]) produces a feature vector every $20$ ms; running $k$-means on these features and replacing each vector by the index of its nearest centroid gives a sequence of discrete **units**, typically with a few hundred to a thousand clusters. The units correlate strongly with phonemes and largely discard speaker identity and recording conditions. They are good for modelling language, but audio resynthesised from them sounds like a different, generic speaker.

**Acoustic tokens** capture *how it sounds*. A neural codec is an autoencoder trained to reconstruct the waveform, with a quantiser in its bottleneck; its tokens preserve voice, prosody and acoustics well enough to decode to high-quality audio, but each individual token carries little linguistic structure.

### Vector quantisation {#sec-vq}

::: definition Vector quantisation {#def-vq}
A **codebook** is a set of $K$ vectors $\mathbf{c}_1, \dots, \mathbf{c}_K\in\R^{D}$. **Vector quantisation** replaces a vector $\mathbf{z}$ by its nearest code vector,

$$
q(\mathbf{z}) = \mathbf{c}_{k^\star},\qquad k^\star = \arg\min_k\lVert\mathbf{z} - \mathbf{c}_k\rVert^2,
$$

and transmits the index $k^\star$, which takes $\log_2K$ bits. In a learned autoencoder the quantiser sits between encoder and decoder; since $\arg\min$ has no useful gradient, training uses the **straight-through estimator** — the decoder receives $q(\mathbf{z})$ in the forward pass, while the gradient with respect to $q(\mathbf{z})$ is copied unchanged to $\mathbf{z}$ — together with a **commitment loss** $\beta\lVert\mathbf{z} - \operatorname{sg}[q(\mathbf{z})]\rVert^2$ that keeps encoder outputs close to their codes ($\operatorname{sg}$ is stop-gradient). The codebook is updated either by a loss $\lVert\operatorname{sg}[\mathbf{z}] - q(\mathbf{z})\rVert^2$ or by exponential moving averages of the encoder outputs assigned to each code (van den Oord et al., 2017).
:::

The same machinery produces discrete image tokens in [[multimodal/image-generation#sec-ar]]. A single codebook has a hard limit: representing audio at $6$ kbps with $75$ frames per second would need $80$ bits per frame, a codebook of $2^{80}$ entries — impossible to store or search. Residual quantisation factorises it.

::: definition Residual vector quantisation (RVQ) {#def-rvq}
**Residual vector quantisation** with $Q$ codebooks $\mathcal{C}_1, \dots, \mathcal{C}_Q$, each of size $K$, quantises $\mathbf{z}$ in stages: set $\mathbf{r}_0 = \mathbf{z}$, and for $j = 1, \dots, Q$ let $\hat{\mathbf{c}}_j$ be the nearest vector to $\mathbf{r}_{j-1}$ in $\mathcal{C}_j$ and $\mathbf{r}_j = \mathbf{r}_{j-1} - \hat{\mathbf{c}}_j$. The code of $\mathbf{z}$ is the tuple of $Q$ indices, and the reconstruction is $\hat{\mathbf{z}} = \sum_{j=1}^{Q}\hat{\mathbf{c}}_j$. Each stage quantises what the previous stages missed.
:::

::: proposition Properties of RVQ {#prop-rvq}
(a) RVQ with $Q$ codebooks of size $K$ uses $Q\log_2K$ bits per vector and stores only $QK$ code vectors, while it can represent up to $K^Q$ distinct reconstructions. (b) The reconstruction error is $\lVert\mathbf{z} - \hat{\mathbf{z}}\rVert = \lVert\mathbf{r}_Q\rVert$. (c) If every codebook contains the zero vector, the residual norms are non-increasing: $\lVert\mathbf{r}_j\rVert\le\lVert\mathbf{r}_{j-1}\rVert$, so dropping the last codebooks degrades the reconstruction gracefully.
:::

::: proof
(a) Each of the $Q$ indices takes $\log_2K$ bits, the codebooks hold $QK$ vectors, and each of the $K^Q$ index tuples gives one sum. (b) By induction, $\mathbf{r}_j = \mathbf{z} - \sum_{i\le j}\hat{\mathbf{c}}_i$, so $\mathbf{r}_Q = \mathbf{z} - \hat{\mathbf{z}}$. (c) $\hat{\mathbf{c}}_j$ minimises $\lVert\mathbf{r}_{j-1} - \mathbf{c}\rVert$ over $\mathcal{C}_j$, which contains $\mathbf{0}$, so $\lVert\mathbf{r}_j\rVert = \lVert\mathbf{r}_{j-1} - \hat{\mathbf{c}}_j\rVert\le\lVert\mathbf{r}_{j-1} - \mathbf{0}\rVert$.
:::

In practice the codebooks are learned and need not contain zero, but they are trained so that each stage reduces the error on average. The listing learns four codebooks of $K = 8$ by $k$-means on the residuals of synthetic $4$-dimensional data, stage by stage.

```python
import math, random
random.seed(5)
D, K, STAGES, N = 4, 8, 4, 2000              # vector size, codebook size, stages, data points

# stand-in for encoder outputs: correlated 4-D vectors
centres = [[random.gauss(0, 2) for _ in range(D)] for _ in range(5)]
data = [[c + random.gauss(0, 0.7) for c in random.choice(centres)] for _ in range(N)]

sq = lambda a, b: sum((x - y) ** 2 for x, y in zip(a, b))
def nearest(v, book):
    return min(range(len(book)), key=lambda k: sq(v, book[k]))

def kmeans(points, k, iters=20):
    book = [p[:] for p in random.sample(points, k)]
    for _ in range(iters):
        groups = [[] for _ in range(k)]
        for p in points: groups[nearest(p, book)].append(p)
        book = [[sum(col) / len(g) for col in zip(*g)] if g else book[j] for j, g in enumerate(groups)]
    return book

energy = sum(sq(v, [0] * D) for v in data) / N
residual = [v[:] for v in data]
books = []
print(f"mean energy per vector {energy:.3f}")
for s in range(STAGES):                       # residual vector quantisation, stage by stage
    book = kmeans(residual, K)
    books.append(book)
    residual = [[r - c for r, c in zip(v, book[nearest(v, book)])] for v in residual]
    mse = sum(sq(v, [0] * D) for v in residual) / N
    print(f"stages {s + 1}: {3 * (s + 1):2d} bits/vector  error {mse:.4f}  ({mse / energy:.2%} of energy)")

v = data[0]; codes = []; recon = [0.0] * D; r = v[:]
for book in books:                            # encode one vector, then decode it
    k = nearest(r, book); codes.append(k)
    recon = [a + b for a, b in zip(recon, book[k])]; r = [a - b for a, b in zip(r, book[k])]
print("vector", [round(x, 2) for x in v], "codes", codes, "decoded", [round(x, 2) for x in recon])

# bitrate of a codec: frames per second x codebooks x bits per code
for name, fps, q, size in [("SoundStream/EnCodec 6 kbps", 75, 8, 1024),
                           ("EnCodec 1.5 kbps", 75, 2, 1024), ("Mimi (Moshi)", 12.5, 8, 2048)]:
    print(f"{name}: {fps} x {q} x {math.log2(size):.0f} bits = {fps * q * math.log2(size):.0f} bit/s")
```

```text
mean energy per vector 21.671
stages 1:  3 bits/vector  error 1.7521  (8.09% of energy)
stages 2:  6 bits/vector  error 0.8037  (3.71% of energy)
stages 3:  9 bits/vector  error 0.3716  (1.71% of energy)
stages 4: 12 bits/vector  error 0.1754  (0.81% of energy)
vector [-0.8, 1.34, -1.89, 0.03] codes [2, 7, 7, 0] decoded [-0.53, 1.2, -2.08, 0.25]
SoundStream/EnCodec 6 kbps: 75 x 8 x 10 bits = 6000 bit/s
EnCodec 1.5 kbps: 75 x 2 x 10 bits = 1500 bit/s
Mimi (Moshi): 12.5 x 8 x 11 bits = 1100 bit/s
```

The first stage captures the cluster structure and removes $92\%$ of the energy; each later stage roughly halves the remaining error with $3$ more bits. Information theory gives a benchmark: for Gaussian data, the lowest achievable mean squared error falls by a factor $2^{-2R/D}$ when the rate rises by $R$ bits per $D$-dimensional vector (the rate–distortion function; [[math-for-ml/information-theory]]), a factor of $0.35$ per $3$-bit stage here. The learned stages achieve about $0.46$ — a greedy, stage-wise quantiser is not optimal, but it is simple and scalable.

::: widget plot
f: 2^(-2*x/d)
x: 0, 40
y: 0, 1
sliders: d=4:1:32:1
points: 3, 0.0809; 6, 0.0371; 9, 0.0171; 12, 0.0081
labels: Gaussian bound $2^{-2R/d}$ on relative error
caption: The rate–distortion bound for Gaussian vectors of dimension $d$: relative mean squared error against the number of bits $R$ per vector. The marked points are the listing's RVQ errors for $d = 4$ (as a fraction of the data's energy); they lie below the curve at first because the data are clustered, not Gaussian, and then fall at a slightly slower rate than the bound. Raise $d$ to see why codecs need many bits per frame: a high-dimensional frame needs proportionally more bits for the same relative error.
:::

## Neural audio codecs {#sec-codecs}

::: definition Neural audio codec {#def-codec}
A **neural audio codec** consists of a convolutional (sometimes also Transformer) **encoder** that maps a waveform at sampling rate $f_s$ to latent frames at rate $f_r = f_s/H$ for a total stride $H$; a **residual vector quantiser** with $Q$ codebooks of size $K$ applied to each frame; and a **decoder** that maps quantised frames back to a waveform. It is trained end to end with reconstruction losses in the time and frequency domains, adversarial losses from discriminators that judge whether audio is real, and the quantiser's commitment and codebook losses. Its **bitrate** is

$$
\text{bitrate} = f_r\cdot Q\cdot\log_2K\quad\text{bits per second}.
$$ {#eq-bitrate}
:::

**SoundStream** (Zeghidour et al., 2021) introduced this design. At $24$ kHz with strides multiplying to $320$ it produces $75$ frames per second, and with codebooks of $1024$ entries each codebook adds $750$ bits per second. To make one model serve several bitrates, it used **quantiser dropout**: during training, a random number of the final codebooks is skipped, so the decoder learns to reconstruct from any prefix of the codes — a property that [[#prop-rvq]] makes natural. SoundStream at $3$ kbps was judged better than the Opus codec at $12$ kbps in listening tests. **EnCodec** (Défossez et al., 2022) used the same structure with a different discriminator and a loss-balancing scheme; its $24$ kHz model offers $1.5$, $3$, $6$, $12$ and $24$ kbps with $2$, $4$, $8$, $16$ and $32$ codebooks, and its tokens were used by VALL-E ([[multimodal/speech#sec-codec-tts]]) and many later models.

::: example Codec arithmetic {#ex-codec}
Compute the compression ratio of EnCodec at $6$ kbps relative to $24$ kHz 16-bit audio, and the number of tokens per second a language model must generate if it models all codebooks as one flat sequence.
::: solution
Uncompressed audio is $24{,}000\cdot16 = 384{,}000$ bit/s, so the ratio is $384{,}000/6000 = 64$. At $6$ kbps there are $8$ codebooks at $75$ Hz: $600$ tokens per second. A minute of speech is $36{,}000$ tokens — about $40$ times the number of text tokens needed for the same minute of speech (some $150$ words, or roughly $200$ tokens). Lower frame rates and fewer codebooks, or a hierarchy in which a model predicts only some codebooks autoregressively, are therefore essential.
:::
:::

::: widget plot
f: r*x*log(k)/log(2)
x: 1, 32
y: 0, 25000
sliders: r=75:12.5:100:12.5; k=1024:256:4096:256
hlines: 6000
labels: bitrate (bit/s) against the number of codebooks
caption: The bitrate [[#eq-bitrate]] of a codec with frame rate $r$ and codebooks of size $k$, against the number of codebooks $x$. The horizontal line is $6$ kbps. With $r = 75$ and $k = 1024$ the eight codebooks of SoundStream and EnCodec reach it; Mimi's $12.5$ Hz frames with $2048$-entry codebooks reach only $1.1$ kbps with eight codebooks, which is what makes a $7$-billion-parameter language model over its tokens fast enough for live conversation.
:::

**Semantic and acoustic tokens in one codec.** Because codec tokens model sound rather than language, a language model over them learns syntax and meaning slowly. Several codecs therefore make their *first* codebook semantic: SpeechTokenizer (Zhang et al., 2024) distils HuBERT features into the first RVQ level, and **Mimi**, the codec of Moshi (Défossez et al., 2024), distils features of a self-supervised speech model (WavLM) into its first level while the remaining levels carry acoustic detail. Mimi runs at $24$ kHz with frames of $80$ ms ($12.5$ Hz) and $8$ codebooks of $2048$ entries in Moshi, $1.1$ kbps.

::: warning A token rate is not a bitrate, and codec quality is not linguistic quality
Two quantities are easily confused. The **bitrate** measures how much information the codes carry and how good the reconstruction can be; the **token rate** (frames per second times the number of codebooks a model must predict) sets the sequence length and cost of a language model over the codes. Increasing the codebook size raises the bitrate without raising the token rate, but makes each prediction a classification over more classes. And a codec that reconstructs audio well may still give tokens that are hard to model: perceptual quality and linguistic structure are different objectives, which is why semantic distillation was introduced.
:::

## Language models over audio tokens {#sec-audio-lm}

**Textless spoken language modelling.** Lakhotia et al. (2021) trained a language model on HuBERT units from thousands of hours of audiobooks and resynthesised its outputs with a unit-to-speech vocoder (GSLM): it generated plausible speech-like continuations without any text, but with limited coherence and a generic voice.

**AudioLM** (Borsos et al., 2023) combined both kinds of token in a hierarchy of three Transformers, each conditioned on the outputs of the previous stage:

1. a **semantic** model over w2v-BERT $k$-means tokens ($25$ per second, $1024$ clusters), which carries long-term structure — words, syntax, melody;
2. a **coarse acoustic** model over the first $4$ SoundStream codebooks ($50$ frames per second), conditioned on the semantic tokens, which supplies speaker identity and recording conditions;
3. a **fine acoustic** model over the remaining $8$ codebooks, which adds detail.

Given a few seconds of a speaker, AudioLM continued the speech with consistent voice and plausible (though not always meaningful) content, and continued piano recordings in style — learned from audio alone. The hierarchy is a recurring pattern: predict a coarse, low-rate, semantic stream autoregressively, and fill in acoustic detail with cheaper models.

::: example Sequence lengths in AudioLM {#ex-audiolm}
For $10$ seconds of audio, how many tokens does each AudioLM stage model?
::: solution
Semantic: $25\cdot10 = 250$ tokens. Coarse acoustic: $50\cdot10\cdot4 = 2000$ tokens. Fine acoustic: $50\cdot10\cdot8 = 4000$ tokens. The model that needs long-range coherence works on the shortest sequence; the longer acoustic sequences are conditioned on it and can be modelled over shorter windows.
:::
:::

**Audio-input language models.** For understanding rather than generation, the VLM recipe of [[multimodal/vision-language-models#sec-llava]] transfers directly: a pretrained speech encoder — often Whisper's — produces continuous features, an adapter pools them in time (for example to $25$ frames per second or fewer) and projects them into a language model's embedding space, and the combined model is instruction-tuned on transcription, translation, question answering about speech, sounds and music, and spoken instructions. Qwen-Audio (Chu et al., 2023) and SALMONN (Tang et al., 2024) are published examples. Such models hear tone and non-speech sounds that a transcript would drop, but they still answer in text; speaking requires an output path, either a TTS stage or audio tokens.

## Spoken dialogue in real time {#sec-dialogue}

A spoken-dialogue system has to decide *when* to speak as well as *what* to say. **Half-duplex** systems take turns: they detect the end of the user's turn with voice-activity detection (often a silence threshold of several hundred milliseconds) and then respond, and they either ignore speech while talking or stop when interrupted ("barge-in"). **Full-duplex** systems listen and speak simultaneously, as people do: they can produce backchannels while the user speaks, start answering before a long pause, and handle overlaps and interruptions as part of the conversation.

::: definition Response latency {#def-latency}
The **response latency** of a spoken-dialogue system is the time from the end of the user's speech to the start of the system's audible reply. For a cascade it is the sum of the end-of-turn detection delay, the recogniser's finalisation time, the language model's time to its first token plus the time to generate enough text for the first spoken phrase, the synthesiser's time to its first audio chunk, and transport and buffering delays.
:::

Conversation analysis gives the target. Stivers et al. (2009), studying ten languages, found that the most common gap between one speaker finishing a question and the other starting an answer was around $0$–$200$ ms, with small differences between languages; listeners start planning their reply while the other person is still talking.

::: example A latency budget for a cascade {#ex-latency}
A cascade waits for $500$ ms of silence to end a turn, finalises the transcript in $100$ ms, has a language-model time to first token of $300$ ms and generates at $50$ tokens per second, needs $15$ tokens for the first spoken phrase, takes $150$ ms to synthesise the first audio chunk and adds $100$ ms of network and buffering delay. Compute the latency, and identify what a streaming design can remove.
::: solution
$500 + 100 + 300 + 15\cdot20 + 150 + 100 = 1450$ ms. The largest single term is the end-of-turn wait, which exists because a half-duplex system must be sure the user has finished; a model that predicts turn ends from content and prosody can cut it, and a full-duplex model has no separate end-of-turn stage at all. Streaming ASR, speculative start of generation on partial transcripts and streaming TTS overlap the other stages, but each still adds its first-output delay. OpenAI reported that its earlier voice pipeline, a cascade, had average latencies of $2.8$ s and $5.4$ s depending on the language model.
:::
:::

### Moshi: a full-duplex speech–text model {#sec-moshi}

**Moshi** (Défossez et al., 2024, from the Kyutai laboratory) is a published full-duplex model with open weights, and illustrates the design in detail.

::: definition Multi-stream speech–text modelling (Moshi) {#def-moshi}
At each $80$ ms frame $t$, Moshi models a vector of tokens: one **text** token of its own speech, the $Q = 8$ Mimi tokens of **its own** audio and the $8$ Mimi tokens of the **user's** audio. A large **temporal Transformer** (initialised from Helium, a $7$-billion-parameter text language model) runs once per frame over the history of these vectors; a small **depth Transformer** then predicts the tokens within the frame one after another, conditioned on the temporal Transformer's output (the RQ-Transformer factorisation). The text token — the "inner monologue", aligned in time with Moshi's own speech — is predicted before the audio tokens of the frame, and the acoustic codebooks are delayed by one or two frames relative to the semantic one. At inference the user's tokens are not predicted but filled in from the microphone as they arrive.
:::

Because the user's stream is always present in the input, Moshi hears the user while it speaks, and silence is just a token sequence like any other: the model decides at every frame whether to speak, keep silent, or produce a backchannel. The inner-monologue text gives the model a linguistic scaffold for its speech, which Défossez et al. found improves the coherence of what it says. The cost per $80$ ms is one step of the large model and a few small steps of the depth model; they reported a theoretical latency of $160$ ms (one frame plus the acoustic delay) and about $200$ ms in practice on a single GPU. Moshi was pretrained on about seven million hours of audio, then trained on separated two-speaker conversations (including the $2000$-hour Fisher corpus of telephone calls) and on synthetic dialogues. Earlier, dGSLM (Nguyen et al., 2023) had shown that a two-channel unit language model trained on Fisher could generate dialogue with natural turn-taking and overlaps, without text.

::: example Moshi's token budget {#ex-moshi}
How many tokens per second does Moshi process, and how many frames does a $5$-minute conversation occupy?
::: solution
Each frame holds $1 + 8 + 8 = 17$ tokens at $12.5$ frames per second: $212.5$ tokens per second. But the temporal Transformer — the expensive part — runs once per frame, and a $5$-minute conversation is $300\cdot12.5 = 3750$ frames ($63{,}750$ tokens across all streams). The depth Transformer handles the $17$ tokens within each frame. Splitting time and depth this way keeps the large model's sequence at the frame rate, far shorter than a flat sequence of tokens.
:::
:::

**Commercial systems.** In May 2024 OpenAI described GPT-4o as a single model trained end to end across text, vision and audio, responding to audio in as little as $232$ ms and $320$ ms on average; the architecture and data were not published. Google and other developers have released spoken-dialogue products, and several open models (as of 2026) follow either the Moshi-style multi-stream approach or a "thinker–talker" split in which a language model produces text and hidden states that a speech decoder turns into audio tokens in a streaming fashion. Published details vary widely; claims about latency and naturalness should be read with their measurement conditions.

::: quiz
Why does Moshi feed the user's audio tokens into the model at every frame, even while Moshi itself is speaking?
- [ ] To train the codec to reconstruct the user's voice
- [x] So that the model can react to what the user is doing at any moment — interruptions, backchannels, overlaps — instead of waiting for a turn to end
- [ ] Because the depth Transformer needs exactly $17$ tokens per frame
- [ ] To compute the word error rate of the user's speech
::: solution
Full-duplex behaviour requires that the model's input always reflects the current state of both speakers. With the user's stream in the input at every frame, turn-taking is learned from data rather than imposed by a voice-activity detector.
:::
:::

## Evaluating spoken models {#sec-evaluation}

Speech generation is evaluated on several axes at once:

- **Intelligibility**: the WER of a strong recogniser run on the generated speech ([[multimodal/speech#def-wer]]).
- **Naturalness and quality**: listener ratings (mean opinion score, MOS, or comparative tests), or learned predictors of MOS; for codecs, objective measures such as ViSQOL or mel distance between original and reconstruction.
- **Speaker similarity**: the cosine between speaker-verification embeddings of the prompt and of the output, for voice cloning.
- **Content and reasoning**: spoken versions of question-answering benchmarks, and the gap between a model's accuracy when asked in speech and in text — speech models often lose accuracy relative to their text backbone.
- **Conversational dynamics**: latency distributions, rates of interruption, overlap and backchannelling compared with human conversations.

Safety evaluation adds audio-specific issues: voice cloning and impersonation (see the application note in [[multimodal/speech#sec-codec-tts]]), instructions hidden in audio that a listening model may follow — a form of the prompt injection discussed in [[prompting-rag/prompt-design]] — and the privacy of voices, which are biometric data in many jurisdictions ([[llm-society/privacy-memorisation]]).

::: history
Speech coding with vector quantisation goes back to the 1980s (code-excited linear prediction, Schroeder and Atal, 1985); residual (multi-stage) VQ was studied by Juang and Gray (1982). Neural vocoders (WaveNet, 2016) and VQ-VAE (van den Oord et al., 2017), which already modelled speech with discrete latents, prepared the ground. SoundStream (Zeghidour et al., 2021) and EnCodec (Défossez et al., 2022) established end-to-end neural codecs with RVQ. Generative spoken language modelling over HuBERT units (Lakhotia et al., 2021), AudioLM (Borsos et al., 2022, journal 2023), VALL-E (2023) and dGSLM (2023) showed that language models over audio tokens can continue, synthesise and converse. Audio-input LLMs (2023–2024) followed the VLM recipe. GPT-4o (May 2024) brought end-to-end voice conversation to a commercial assistant, and Moshi (September 2024) published a full-duplex speech–text model with open weights.
:::

::: summary
- Cascades (ASR → LLM → TTS) lose paralinguistic information and add latency at every stage; audio tokens let a language model read and write speech directly.
- Semantic tokens ($k$-means on self-supervised features) capture content; acoustic tokens (neural codecs) capture sound and decode to audio.
- RVQ quantises residuals in stages: $Q\log_2K$ bits per frame, $QK$ stored vectors, up to $K^Q$ reconstructions, and graceful degradation when later codebooks are dropped.
- Codec bitrate $=$ frame rate $\times$ codebooks $\times\log_2K$: SoundStream/EnCodec $75\cdot8\cdot10 = 6$ kbps; Mimi $12.5\cdot8\cdot11 = 1.1$ kbps. Token rate, not bitrate, sets a language model's cost.
- AudioLM models semantic, coarse and fine acoustic tokens in a hierarchy; audio-input LLMs attach a speech encoder through an adapter.
- Full-duplex models such as Moshi model the user's and their own audio streams (plus aligned text) at every $80$ ms frame, with a temporal and a depth Transformer; latency targets come from human turn-taking (about $200$ ms).
:::

## Exercises

::: exercise Codebooks for 24 kbps {level=1 check="32"}
How many codebooks of $1024$ entries does a $75$ Hz codec need to reach $24$ kbps?
::: solution
$24{,}000/(75\cdot10) = 32$ codebooks, EnCodec's highest setting.
:::
:::

::: exercise Mimi's bitrate {level=1 check="1100"}
Compute the bitrate of Mimi with $8$ codebooks of $2048$ entries at $12.5$ frames per second.
::: solution
$12.5\cdot8\cdot\log_22048 = 12.5\cdot8\cdot11 = 1100$ bit/s.
:::
:::

::: exercise Compression by a codec {level=1 check="64"}
How many times smaller is a $6$ kbps codec stream than $24$ kHz 16-bit mono audio?
::: solution
$384{,}000/6000 = 64$.
:::
:::

::: exercise Moshi tokens per second {level=1 check="212.5"}
How many tokens per second does Moshi model across its three streams?
::: solution
$17$ tokens per frame at $12.5$ Hz: $212.5$ tokens per second ([[#ex-moshi]]).
:::
:::

::: exercise Effective bitrate with unused codes {level=2 check="4800"}
A codec has $8$ codebooks of $1024$ entries at $75$ Hz, but in each codebook only $256$ entries are ever used, each equally often. What is the information rate of its tokens, in bits per second?
::: solution
Each token is uniform over $256$ used entries, so it carries $\log_2256 = 8$ bits rather than $10$; the rate is $75\cdot8\cdot8 = 4800$ bit/s. Low **codebook utilisation** wastes bitrate and is a common failure in training VQ models; codebook resets, EMA updates and entropy penalties are used to counter it.
:::
:::

::: exercise A cascade with faster turn detection {level=2 check="1150"}
In [[#ex-latency]], an end-of-turn model reduces the silence wait from $500$ ms to $200$ ms. What is the new latency in milliseconds?
::: solution
$1450 - 300 = 1150$ ms. Even with a fast turn detector, the remaining stages keep a cascade far above the $200$ ms of human turn-taking.
:::
:::

::: exercise The size of a flat codebook {level=2}
(a) How many entries would a single codebook need to match the bits of $8$ RVQ codebooks of size $1024$? (b) How many code vectors does the RVQ store? (c) Why can a single huge codebook not be learned even if it could be stored?
::: solution
(a) $8\cdot10 = 80$ bits, so $2^{80}\approx1.2\times10^{24}$ entries. (b) $8\cdot1024 = 8192$ vectors. (c) A codebook entry is learned only from the encoder outputs assigned to it; with $10^{24}$ entries almost all would never be assigned during training, and nearest-neighbour search over them would be infeasible. RVQ shares structure: each of the $K^Q$ reconstructions is a sum of vectors that are each trained on a large share of the data.
:::
:::

::: exercise Straight-through gradients {level=2}
In [[#def-vq]], let the encoder output be $\mathbf{z}$ and the decoder loss $\mathcal{L}_{\text{rec}}(q(\mathbf{z}))$. Write the forward value of $\tilde{\mathbf{z}} = \mathbf{z} + \operatorname{sg}[q(\mathbf{z}) - \mathbf{z}]$ and its gradient with respect to $\mathbf{z}$, and explain why the commitment loss is needed.
::: solution
In the forward pass $\tilde{\mathbf{z}} = \mathbf{z} + q(\mathbf{z}) - \mathbf{z} = q(\mathbf{z})$, so the decoder sees the quantised vector. In the backward pass the stop-gradient term is a constant, so $\partial\tilde{\mathbf{z}}/\partial\mathbf{z} = I$ and $\partial\mathcal{L}_{\text{rec}}/\partial\mathbf{z} = \partial\mathcal{L}_{\text{rec}}/\partial\tilde{\mathbf{z}}$: the decoder's gradient is copied to the encoder as if quantisation were the identity. This is accurate only when $\mathbf{z}$ is close to $q(\mathbf{z})$. Without a commitment term nothing keeps the encoder outputs near the codebook: they can drift and grow while the codebook lags behind, making the straight-through approximation and the quantisation increasingly poor. The term $\beta\lVert\mathbf{z} - \operatorname{sg}[q(\mathbf{z})]\rVert^2$ pulls each output towards its code.
:::
:::

::: exercise Quantiser dropout {level=3}
SoundStream trains with quantiser dropout: for each example, a number $n_q$ is drawn uniformly from $\{1, \dots, Q\}$ and only the first $n_q$ codebooks are used. (a) Explain why this makes one model usable at $Q$ bitrates. (b) Why does it make the first codebooks carry the most important information? (c) How does this ordering help a language model such as AudioLM or VALL-E that predicts the first codebooks autoregressively and the rest in parallel?
::: solution
(a) The decoder is trained to reconstruct from every prefix of the codes, so at inference one can transmit only the first $n_q$ indices and decode at bitrate $f_r\,n_q\log_2K$ with the same model.

(b) The first codebook is used in every training example, the last only in a fraction $1/Q$ of them; to minimise the expected loss over $n_q$, the early codebooks must capture what reduces the error most — the coarse spectral envelope and pitch — leaving detail to later ones. This is the coarse-to-fine ordering that RVQ has naturally ([[#prop-rvq]]) reinforced by training.

(c) The autoregressive model, which is the expensive and context-dependent part, predicts the codebooks that determine content, voice and prosody; the remaining codebooks hold detail that is largely determined by the earlier ones within each frame, so they can be predicted with less context and in parallel, at a modest cost in quality.
:::
:::

::: exercise Duplex sequence design {level=3}
A team builds a full-duplex model by flattening Moshi's streams into a single token sequence, ordered text, own audio, user audio within each frame, and training a standard decoder over it. (a) How long is the sequence for a $5$-minute conversation? (b) Compare the attention cost per frame with Moshi's split into temporal and depth Transformers. (c) What would happen at inference if the user's tokens for frame $t$ are not yet available when the model wants to produce its own audio for frame $t$?
::: solution
(a) $3750$ frames $\times$ $17$ tokens $= 63{,}750$ tokens.

(b) In the flat model each of the $17$ tokens per frame attends to the whole history, so attention cost per frame grows like $17\cdot17t$ for history length $17t$ tokens, a factor of about $17^2 = 289$ more than a model over $t$ frame vectors; the large model also runs $17$ times per frame. Moshi's temporal Transformer runs once per frame over a history of $t$ vectors, and the depth Transformer runs over only $17$ positions.

(c) The model's own audio for frame $t$ would be conditioned on user tokens it does not have, so the ordering must put the user's frame-$t$ tokens after the model's own, or condition the model's frame $t$ only on user tokens up to $t - 1$. Moshi's ordering and delays are chosen so that each prediction depends only on what has already been heard; a flat sequence must respect the same causality or it cannot run in real time.
:::
:::
