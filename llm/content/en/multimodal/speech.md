Speech is the oldest human interface and the hardest one to hand to a language model. A second of audio recorded at telephone quality is $8000$ numbers; at the $16$ kHz used by most speech recognisers it is $16{,}000$, and a ten-second question is $160{,}000$ samples that contain perhaps twenty-five words. The words are not marked in the signal: there are no spaces between them, the same word lasts a tenth of a second or half a second depending on the speaker, and the sound of each phoneme changes with its neighbours, the speaker's voice, the room and the microphone. **Automatic speech recognition** (ASR) maps this signal to text; **text-to-speech** (TTS) goes the other way.

This chapter follows the signal from samples to words and back. It starts with the representation nearly every speech model uses as input, the **log-mel spectrogram**, computed step by step on a synthetic tone. It then treats the central difficulty of recognition — the unknown alignment between audio frames and output symbols — through **connectionist temporal classification** (CTC; Graves et al., 2006), whose loss sums over all alignments with a dynamic programme that we implement and check by brute force. Encoder–decoder recognisers avoid explicit alignments; **Whisper** (Radford et al., 2023), trained on $680{,}000$ hours of transcribed web audio, is the example. Recognisers are scored by **word error rate**, an edit distance. The chapter ends with the TTS pipeline — from Tacotron 2 and neural vocoders to the **neural codec language models** such as VALL-E that generate speech as a sequence of discrete tokens — which leads into [[multimodal/audio-language-models]].

## From samples to spectrograms {#sec-features}

::: definition Sampled audio {#def-sampling}
A microphone signal $x(\tau)$ is recorded as samples $x[n] = x(n/f_s)$ at a **sampling rate** $f_s$ (samples per second), each quantised to a fixed number of bits (commonly $16$). A sinusoid of frequency $f$ is represented without ambiguity only if $f < f_s/2$, the **Nyquist frequency**; higher frequencies **alias** onto lower ones, so recorders filter them out before sampling.
:::

Speech recognition usually works at $f_s = 16$ kHz, which keeps frequencies up to $8$ kHz — enough for the information that distinguishes speech sounds, most of which lies below $4$ kHz. Music and high-quality TTS use $22.05$, $24$, $44.1$ or $48$ kHz.

Raw samples are a poor input for learning: what distinguishes one vowel from another is the distribution of energy over frequencies (the **formants**, resonances of the vocal tract), and that distribution changes every few tens of milliseconds. The **short-time Fourier transform** measures it in short overlapping frames. The Fourier series and transform themselves are developed in Physics Atlas ([Fourier series](/learn/physics/lesson.php?c=math-methods&l=fourier)); here we need only the discrete version.

::: definition Short-time Fourier transform and spectrogram {#def-stft}
Choose a **window length** $N_w$ (typically $25$ ms, $400$ samples at $16$ kHz), a **hop** $h$ (typically $10$ ms, $160$ samples), a window function $w[n]$ and an FFT size $N\ge N_w$. Frame $m$ consists of $x[mh], \dots, x[mh + N_w - 1]$, multiplied by $w$ and zero-padded to length $N$. Its discrete Fourier transform is

$$
X_m[k] = \sum_{n=0}^{N-1}w[n]\,x[mh + n]\,e^{-2\pi ikn/N}, \qquad k = 0, \dots, N/2,
$$ {#eq-stft}

where bin $k$ corresponds to frequency $kf_s/N$. The **power spectrogram** is $\lvert X_m[k]\rvert^2$, a matrix with one column per frame. The **Hann window** is $w[n] = \tfrac12 - \tfrac12\cos(2\pi n/N_w)$.
:::

The window matters. A rectangular window (no tapering) cuts the signal abruptly at the frame edges, and its spectrum spreads a pure tone's energy into slowly decaying side lobes — **spectral leakage** — that can hide quieter components at other frequencies. Tapered windows trade a wider main peak for much lower side lobes.

::: widget plot
f: 20*log(abs(((1-a)*sin(pi*x)/(pi*x) + (a/2)*(sin(pi*(x-1))/(pi*(x-1)) + sin(pi*(x+1))/(pi*(x+1))))/(1-a)))/log(10)
x: -10.03, 10
y: -100, 5
sliders: a=0.5:0:0.5:0.01
labels: window response (dB) against frequency offset in bins
caption: The spectrum of a raised-cosine window $w = (1 - a) - a\cos(\cdot)$, in decibels, against the distance from a tone's frequency measured in DFT bins (long-window approximation). At $a = 0$ (rectangular) the main lobe is narrowest but the first side lobe is only $13$ dB down and the lobes decay slowly; at $a = 0.5$ (Hann) the main lobe is twice as wide but the side lobes are $31$ dB down and fall off quickly; near $a = 0.46$ (Hamming) the first side lobe is lowest, about $43$ dB down. Speech front ends use Hann or Hamming windows.
:::

::: proposition The peak of a windowed tone {#prop-tone-peak}
Let $x[n] = A\sin(2\pi f_0n/f_s)$ with $f_0 = k_0f_s/N$ exactly on bin $k_0$, $0 < k_0 < N/2$. Then

$$
X[k_0] = \frac{A}{2i}\sum_nw[n] + \varepsilon,
$$

where $\varepsilon = -\frac{A}{2i}\sum_nw[n]e^{-4\pi ik_0n/N}$ is the window's spectrum evaluated $2k_0$ bins away. For a smooth window and $k_0$ well away from $0$ and $N/2$, $\varepsilon$ is negligible, so $\lvert X[k_0]\rvert\approx\frac A2\sum_nw[n]$ and the power is $\frac{A^2}{4}\big(\sum_nw[n]\big)^2$.
:::

::: proof
Write $\sin\theta = (e^{i\theta} - e^{-i\theta})/(2i)$ with $\theta = 2\pi k_0n/N$. Then $X[k_0] = \frac{A}{2i}\sum_nw[n]\big(e^{2\pi ik_0n/N} - e^{-2\pi ik_0n/N}\big)e^{-2\pi ik_0n/N} = \frac{A}{2i}\sum_nw[n] - \frac{A}{2i}\sum_nw[n]e^{-4\pi ik_0n/N}$. The first sum is the window's spectrum at offset $0$; the second is its spectrum at offset $2k_0$ bins, which is small when side lobes decay quickly and $2k_0$ is many bins away.
:::

Human hearing does not resolve frequencies evenly: we distinguish $100$ Hz from $200$ Hz easily, but $8100$ Hz from $8200$ Hz hardly at all. Speech features compress the frequency axis accordingly.

::: definition Mel scale and log-mel features {#def-mel}
The **mel scale** maps frequency $f$ in hertz to

$$
m(f) = 2595\,\log_{10}\!\Big(1 + \frac{f}{700}\Big),
$$ {#eq-mel}

approximately linear below $1$ kHz and logarithmic above (one common variant; others differ in the constants). A **mel filterbank** of $M$ bands places $M + 2$ edges equally spaced in mel between $0$ and $f_s/2$, and band $j$ is a triangular weighting of the power spectrum rising from edge $j - 1$ to a peak at edge $j$ and falling to edge $j + 1$. The **log-mel spectrogram** is the logarithm of the band energies, one $M$-vector per frame.
:::

::: widget plot
f: 2595*log(1 + x/700)/log(10); x
x: 0, 8000
y: 0, 8000
labels: mel $m(f)$; identity
caption: The mel scale [[#eq-mel]] against frequency in hertz. Up to about $1$ kHz it nearly follows the identity line (by design, $m(1000)\approx1000$); above, equal steps in mel cover ever wider ranges of hertz, so a filterbank with bands equally spaced in mel has narrow bands at low frequencies and wide ones at high frequencies. From $0$ to $8$ kHz the scale spans $2840$ mel.
:::

The listing computes a log-mel frame in plain Python for a synthetic signal: a $1000$ Hz tone of amplitude $1$, a $3000$ Hz tone of amplitude $0.3$ and a little noise, with $40$ mel bands.

```python
import math, random
random.seed(3)
sr, n_fft, hop, n_mels = 16000, 512, 160, 40      # 16 kHz, 25 ms window zero-padded to 512
win = 400

# 0.1 s of a synthetic signal: 1000 Hz tone + weaker 3000 Hz tone + a little noise
x = [math.sin(2 * math.pi * 1000 * n / sr) + 0.3 * math.sin(2 * math.pi * 3000 * n / sr)
     + 0.01 * random.gauss(0, 1) for n in range(1600)]

hann = [0.5 - 0.5 * math.cos(2 * math.pi * n / win) for n in range(win)]
def power_spectrum(frame):                          # |DFT|^2 for bins 0 .. n_fft/2
    buf = [frame[n] * hann[n] for n in range(win)] + [0.0] * (n_fft - win)
    out = []
    for k in range(n_fft // 2 + 1):
        re = sum(buf[n] * math.cos(2 * math.pi * k * n / n_fft) for n in range(n_fft))
        im = -sum(buf[n] * math.sin(2 * math.pi * k * n / n_fft) for n in range(n_fft))
        out.append(re * re + im * im)
    return out

mel = lambda f: 2595 * math.log10(1 + f / 700)
imel = lambda m: 700 * (10 ** (m / 2595) - 1)
edges = [imel(mel(sr / 2) * i / (n_mels + 1)) for i in range(n_mels + 2)]   # Hz
bin_hz = sr / n_fft
def filterbank(ps):                                 # triangular filters on the mel scale
    out = []
    for m in range(1, n_mels + 1):
        lo, c, hi = edges[m - 1], edges[m], edges[m + 1]
        e = 0.0
        for k, p in enumerate(ps):
            f = k * bin_hz
            w = (f - lo) / (c - lo) if lo <= f <= c else (hi - f) / (hi - c) if c < f <= hi else 0.0
            e += w * p
        out.append(e)
    return out

n_frames = 1 + (len(x) - win) // hop
print("frames in 0.1 s:", n_frames, " bin spacing %.2f Hz" % bin_hz)
ps = power_spectrum(x[0:win])
peaks = [k for k in range(1, len(ps) - 1) if ps[k] > ps[k - 1] and ps[k] >= ps[k + 1] and ps[k] > 100]
print("spectral peaks (bin, Hz, power):", [(k, round(k * bin_hz), round(ps[k])) for k in peaks])
logmel = [math.log10(max(e, 1e-10)) for e in filterbank(ps)]
best = [m for m in range(1, n_mels - 1) if logmel[m] > logmel[m - 1] and logmel[m] >= logmel[m + 1] and logmel[m] > 2]
for m in best:
    print(f"mel band {m:2d}: centre {edges[m + 1]:6.0f} Hz  log10 energy {logmel[m]:.2f}")
print("first band edges (Hz):", [round(e) for e in edges[:4]], " last:", [round(e) for e in edges[-3:]])
```

```text
frames in 0.1 s: 8  bin spacing 31.25 Hz
spectral peaks (bin, Hz, power): [(32, 1000, 10007), (96, 3000, 887)]
mel band 13: centre    955 Hz  log10 energy 4.04
mel band 26: centre   2980 Hz  log10 energy 3.18
first band edges (Hz): [0, 44, 92, 142]  last: [6994, 7481, 8000]
```

::: example Reading the log-mel listing {#ex-logmel}
Check the listing's peak powers against [[#prop-tone-peak]], and explain the band edges.
::: solution
The Hann window of length $400$ sums to $200$. For the $1000$ Hz tone ($A = 1$, exactly bin $1000/31.25 = 32$) the predicted power is $\frac14\cdot200^2 = 10{,}000$; the listing gives $10{,}007$, the difference coming from the noise and the small leakage term. For the $3000$ Hz tone ($A = 0.3$, bin $96$) the prediction is $0.09\cdot10{,}000 = 900$, against $887$. After the filterbank, the strongest bands are centred at $955$ Hz and $2980$ Hz, and their log energies differ by $4.04 - 3.18 = 0.86$, less than the $\log_{10}(1/0.09) = 1.05$ of the tones' power ratio: the $1000$ Hz tone falls between the centres of two narrow bands ($955$ and $1060$ Hz) and is split between them, while the $3000$ Hz tone lies near the centre of one wide band and is captured almost fully. The first bands are $44$–$50$ Hz wide, the last ones about $500$ Hz wide: equal steps of $2840/41 = 69$ mel.
:::
:::

Log-mel features are what Whisper, most CTC and transducer recognisers, and the acoustic models of TTS systems use (some self-supervised models such as wav2vec 2.0 instead learn their own features from raw samples with a convolutional encoder). The logarithm compresses the huge dynamic range of audio power and turns a change of loudness into an additive shift. Whisper normalises its log-mel values to a range of about $[-1, 1]$.

::: example The input of Whisper {#ex-whisper-input}
Whisper pads or trims audio to $30$-second segments at $16$ kHz, computes $80$-band log-mel features with $25$ ms windows and $10$ ms hops, and applies two convolutional layers, the second with stride $2$, before the Transformer encoder. Find the number of samples, the shape of the feature matrix and the encoder's sequence length.
::: solution
$30\cdot16{,}000 = 480{,}000$ samples. A $10$ ms hop gives $30/0.01 = 3000$ frames, so the features are $80\times3000$ ($128\times3000$ for the large-v3 model, which uses $128$ bands). The stride-$2$ convolution halves the time axis: the encoder sees $1500$ positions, one per $20$ ms. Each encoder position covers about as much audio as a fifth of a syllable, and a $30$-second window becomes a sequence comparable in length to a page of text.
:::
:::

## Connectionist temporal classification {#sec-ctc}

A recogniser that produces one output per $20$ ms frame must deal with an unknown **alignment**: the transcript "cat" has three letters but corresponds to perhaps twenty frames, and nobody has labelled which frames belong to which letter. Before neural networks, recognisers used hidden Markov models whose state sequences were exactly such alignments, trained with the forward–backward algorithm. CTC brought the same idea to neural networks with a single trick: an extra **blank** symbol.

::: definition CTC {#def-ctc}
Let the output alphabet be $\mathcal{V}\cup\{\varnothing\}$, where $\varnothing$ is the **blank**. A network outputs, for each of $T$ frames, a distribution $p_t(\cdot\mid\mathbf{x})$ over this alphabet. An **alignment** (or path) is a sequence $\pi = (\pi_1, \dots, \pi_T)$ of symbols, with probability $\prod_tp_t(\pi_t\mid\mathbf{x})$ — the outputs of different frames are treated as conditionally independent given the input. The **collapse** map $\mathcal{B}$ first merges runs of repeated symbols and then removes blanks: $\mathcal{B}(\texttt{cc}\varnothing\texttt{aa}\varnothing\varnothing\texttt{t}) = \texttt{cat}$ and $\mathcal{B}(\texttt{a}\varnothing\texttt{a}) = \texttt{aa}$, while $\mathcal{B}(\texttt{aa}) = \texttt{a}$. The probability of a label sequence $\mathbf{y}$ and the **CTC loss** are

$$
P(\mathbf{y}\mid\mathbf{x}) = \sum_{\pi\in\mathcal{B}^{-1}(\mathbf{y})}\ \prod_{t=1}^{T}p_t(\pi_t\mid\mathbf{x}),\qquad \mathcal{L}_{\text{CTC}} = -\log P(\mathbf{y}\mid\mathbf{x}).
$$ {#eq-ctc}
:::

The blank does two jobs. It lets the network output "nothing new" in frames between letters, and it separates genuine repeats: without it, "aa" and "a" would collapse to the same thing. The sum in [[#eq-ctc]] marginalises over every way of spreading the transcript across the frames, so training needs only the audio and the text.

::: example A two-frame CTC loss by hand {#ex-ctc-hand}
With alphabet $\{\varnothing, \texttt{a}\}$ and $T = 2$ frames, the network gives $p_1 = (0.4, 0.6)$ and $p_2 = (0.7, 0.3)$ for $(\varnothing, \texttt{a})$. Compute $P(\texttt{a}\mid\mathbf{x})$ and the loss.
::: solution
The paths that collapse to "a" are $\texttt{aa}$, $\texttt{a}\varnothing$ and $\varnothing\texttt{a}$, with probabilities $0.6\cdot0.3 = 0.18$, $0.6\cdot0.7 = 0.42$ and $0.4\cdot0.3 = 0.12$. So $P(\texttt{a}\mid\mathbf{x}) = 0.72$ and $\mathcal{L} = -\ln0.72 = 0.329$. The remaining probability $0.28$ belongs to $\varnothing\varnothing$, the empty transcript. No path collapses to "aa": two a's need a blank between them, hence at least three frames.
:::
:::

The number of paths grows exponentially with $T$ (for a transcript of $U$ distinct consecutive labels it is $\binom{T + U}{2U}$, as an exercise shows), so the sum must be computed by dynamic programming. Interleave the target with blanks, $\mathbf{y}' = (\varnothing, y_1, \varnothing, y_2, \dots, y_U, \varnothing)$ of length $S = 2U + 1$. A path that collapses to $\mathbf{y}$ moves through $\mathbf{y}'$ from left to right: at each frame it stays on its current position, moves on by one, or — if the next label differs from the current one — skips the blank between two labels.

::: theorem The CTC forward recursion {#thm-ctc-forward}
Define $\alpha_t(s)$ as the total probability of all length-$t$ path prefixes $\pi_{1:t}$ that are consistent with $\mathbf{y}'_{1:s}$ and end at position $s$ (that is, $\pi_t = y'_s$ and $\mathcal{B}(\pi_{1:t}) = \mathcal{B}(\mathbf{y}'_{1:s})$). Then

$$
\alpha_1(1) = p_1(\varnothing),\quad \alpha_1(2) = p_1(y_1),\quad \alpha_1(s) = 0\ \ (s > 2),
$$

$$
\alpha_t(s) = \Big(\alpha_{t-1}(s) + \alpha_{t-1}(s-1) + \mathbb{1}\big[y'_s\neq\varnothing,\ y'_s\neq y'_{s-2}\big]\,\alpha_{t-1}(s-2)\Big)\,p_t(y'_s),
$$ {#eq-ctc-forward}

with $\alpha_{t-1}(0) = \alpha_{t-1}(-1) = 0$, and

$$
P(\mathbf{y}\mid\mathbf{x}) = \alpha_T(S) + \alpha_T(S - 1).
$$

The cost is $O(TU)$ operations instead of a sum over exponentially many paths.
:::

::: proof
A path collapsing to $\mathbf{y}$ corresponds to a monotone walk through $\mathbf{y}'$: each frame occupies one position, the walk starts at position $1$ or $2$ (a leading blank is optional), and it must end at $S$ or $S - 1$ (a trailing blank is optional). From position $s$ at time $t - 1$ the walk can only (i) stay at $s$ — a repeated symbol, which $\mathcal{B}$ merges; (ii) advance to $s + 1$; or (iii) advance to $s + 2$, skipping a blank, which is allowed only when the skipped position is a blank between two *different* labels, since skipping it between equal labels would merge them into one. No other move keeps the collapsed output a prefix of $\mathbf{y}$: moving backwards or skipping a label would change the output. Hence every prefix ending at $s$ at time $t$ arrives from $s$, $s - 1$ or (when allowed) $s - 2$ at time $t - 1$, the three sets of prefixes are disjoint, and multiplying by the probability $p_t(y'_s)$ of the symbol at time $t$ gives [[#eq-ctc-forward]] by induction on $t$. Distinct walks give distinct paths and vice versa, so summing over the two allowed end positions counts each path in $\mathcal{B}^{-1}(\mathbf{y})$ exactly once. Each step updates $S = 2U + 1$ entries with constant work.
:::

A symmetric backward recursion gives $\beta_t(s)$, and $\alpha_t(s)\beta_t(s)/p_t(y'_s)$ is the probability that a valid path passes position $s$ at time $t$ — the posterior "soft alignment" from which the gradient of the loss with respect to the network's outputs follows, exactly as in the forward–backward algorithm for hidden Markov models. In practice the recursion runs in log space to avoid underflow, and automatic differentiation computes the gradient. The listing implements the forward recursion, checks it against brute-force enumeration of all $3^5 = 243$ paths, and computes a word error rate (for [[#sec-wer]]).

```python
import math, random, itertools
random.seed(4)
V, T = 3, 5                                  # symbols: 0 = blank, 1 = 'a', 2 = 'b'
def softmax(z):
    m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e); return [v / s for v in e]
probs = [softmax([random.gauss(0, 1.5) for _ in range(V)]) for _ in range(T)]   # T x V

def collapse(path):                          # merge repeats, then drop blanks
    out, prev = [], None
    for s in path:
        if s != prev and s != 0: out.append(s)
        prev = s
    return out

def ctc_forward(probs, y):
    ext = [0]
    for c in y: ext += [c, 0]                # blank-interleaved target, length 2U+1
    S = len(ext)
    alpha = [0.0] * S
    alpha[0], alpha[1] = probs[0][ext[0]], probs[0][ext[1]]
    for t in range(1, len(probs)):
        new = [0.0] * S
        for s in range(S):
            a = alpha[s] + (alpha[s - 1] if s >= 1 else 0.0)
            if s >= 2 and ext[s] != 0 and ext[s] != ext[s - 2]:
                a += alpha[s - 2]            # skip the blank between different labels
            new[s] = a * probs[t][ext[s]]
        alpha = new
    return alpha[S - 1] + alpha[S - 2]       # end on the last label or the final blank

def brute(probs, y):
    total = 0.0
    for path in itertools.product(range(V), repeat=len(probs)):
        if collapse(path) == y:
            total += math.prod(probs[t][path[t]] for t in range(len(probs)))
    return total

for y, name in [([1, 2], "ab"), ([1, 1], "aa"), ([2], "b")]:
    f, b = ctc_forward(probs, y), brute(probs, y)
    print(f"P({name}|x): forward {f:.6f}  brute force {b:.6f}  loss {-math.log(f):.4f}")
greedy = [max(range(V), key=lambda v: p[v]) for p in probs]
print("best path", greedy, "-> collapsed", collapse(greedy))
print("total probability of all label sequences:",
      round(sum(brute(probs, list(y)) for n in range(T + 1) for y in itertools.product([1, 2], repeat=n)), 6))

def wer(ref, hyp):                           # word error rate by edit distance
    r, h = ref.split(), hyp.split()
    D = [[i + j if i * j == 0 else 0 for j in range(len(h) + 1)] for i in range(len(r) + 1)]
    for i in range(1, len(r) + 1):
        for j in range(1, len(h) + 1):
            D[i][j] = min(D[i - 1][j] + 1, D[i][j - 1] + 1, D[i - 1][j - 1] + (r[i - 1] != h[j - 1]))
    return D[-1][-1], len(r)
e, n = wer("the cat sat on the mat", "the cat sat on a mat mat")
print(f"WER: {e} edits / {n} words = {e / n:.3f}")
```

```text
P(ab|x): forward 0.277434  brute force 0.277434  loss 1.2822
P(aa|x): forward 0.113099  brute force 0.113099  loss 2.1795
P(b|x): forward 0.040938  brute force 0.040938  loss 3.1957
best path [1, 1, 0, 2, 2] -> collapsed [1, 2]
total probability of all label sequences: 1.0
WER: 2 edits / 6 words = 0.333
```

The last probability line confirms that CTC defines a proper distribution over transcripts: every path collapses to exactly one label sequence, so the probabilities of all sequences of length at most $T$ sum to $1$.

**Decoding.** The simplest decoder takes the most probable symbol in each frame and collapses the result (**best-path** or greedy decoding), as in the listing. This finds the most probable *path*, not the most probable *transcript*, which sums over paths; **prefix beam search** approximates the latter and can add the score of an external language model. Because CTC assumes the frames' outputs are independent given the audio, it has no built-in model of which word sequences are likely — "recognise speech" and "wreck a nice beach" are distinguished only by the audio — and CTC systems benefit greatly from such a language model.

::: warning CTC is not a frame classifier, and its spikes are not timings
Two misreadings are common. CTC does not need frame-level labels and does not learn them: trained CTC models typically output blanks almost everywhere and emit each label as a sharp **spike** in one or two frames, and the spike's position need not coincide with the middle of the corresponding sound — it is often delayed. Word timestamps read from CTC spikes are therefore approximate, and systems that need accurate timings align separately (for example with forced alignment against the transcript).
:::

## Neural speech recognisers {#sec-asr}

From about 2014, neural networks replaced the acoustic models of hidden-Markov-model systems and then the systems themselves. Three families of end-to-end recogniser emerged:

- **CTC models** — a deep encoder (recurrent, convolutional or Transformer) with a CTC output layer over characters or subword units (DeepSpeech 2, Amodei et al., 2016).
- **Transducers** — the RNN-Transducer (Graves, 2012) adds a prediction network over previous outputs to CTC's alignment lattice, removing the independence assumption while keeping streaming, frame-synchronous decoding; transducers are widely used for on-device recognition. Conformer encoders (Gulati et al., 2020), which interleave convolution and self-attention, became the standard encoder.
- **Attention encoder–decoders** — "Listen, Attend and Spell" (Chan et al., 2016) and its successors: an encoder over audio frames and an autoregressive decoder that cross-attends to it ([[sequence-models/seq2seq]]), with no explicit alignment at all. They model the output language well but must see the whole utterance (or a chunk) before decoding.

**Self-supervised pretraining** changed what labelled data is needed. wav2vec 2.0 (Baevski et al., 2020) learns from unlabelled audio by masking spans of its latent features and identifying the true quantised latent among distractors with a contrastive loss; fine-tuned with CTC on just $10$ minutes of labelled speech, after pretraining on $53{,}000$ hours of unlabelled audiobooks, it reached word error rates of $4.8\%$ and $8.2\%$ on the clean and other test sets of LibriSpeech (Panayotov et al., 2015). HuBERT (Hsu et al., 2021) predicts cluster labels of masked frames instead, like BERT predicting words. These encoders' discrete units reappear as speech tokens in [[multimodal/audio-language-models]].

### Whisper {#sec-whisper}

Self-supervised models still need fine-tuning on a target dataset, and models fine-tuned on one dataset are often brittle on another. Radford et al. (2023) took the opposite route: **weak supervision** at scale. They collected $680{,}000$ hours of audio paired with transcripts from the internet — about $438{,}000$ hours of English, $117{,}000$ hours in $96$ other languages and $125{,}000$ hours of speech in other languages paired with English translations — and filtered out transcripts that looked machine-generated, since training on the output of other recognisers would teach their errors.

::: definition Whisper {#def-whisper}
**Whisper** is an encoder–decoder Transformer. The encoder takes the $80$-band log-mel spectrogram of a $30$-second segment through two convolution layers (the second with stride $2$) with GELU activations, adds sinusoidal position embeddings, and applies pre-norm Transformer blocks. The decoder is an autoregressive Transformer with learned position embeddings and cross-attention to the encoder output, producing byte-level BPE tokens. A sequence of **special tokens** specifies the task: start of transcript, a language tag (or language identification as the first prediction), "transcribe" or "translate" (to English), and whether to predict timestamps, which are then emitted as tokens quantised to $20$ ms between text segments. The largest model has $32$ layers in each stack, width $1280$, $20$ heads and about $1.55$ billion parameters.
:::

One model thus does multilingual transcription, translation into English, language identification and voice-activity detection (a "no speech" token), all through the decoder's prompt — the instruction-as-prefix format of text models. Long audio is transcribed in $30$-second windows, shifting the window according to the predicted timestamps and conditioning on the previous window's text.

The striking result was robustness. Radford et al. compared Whisper with a supervised model that matched its $2.7\%$ word error rate on LibriSpeech test-clean, and found that Whisper made on average $55\%$ fewer errors across a dozen other English datasets it had not been trained on: a model fitted to one benchmark had learnt its quirks. Whisper has its own characteristic failures, however. As an autoregressive language model it can **hallucinate**: repeat phrases in loops, or produce fluent text during silence or noise. Koenecke et al. (2024) found invented content in about $1\%$ of a sample of transcriptions, some of it harmful — a reminder that a fluent transcript is not evidence of an accurate one.

::: quiz
Why does Whisper insert a language tag and a task token at the start of its decoder input?
- [ ] To tell the encoder which mel filterbank to use
- [x] So that one decoder can perform several tasks (transcription in many languages, translation to English, timestamping), selected or predicted through the prefix
- [ ] Because CTC requires a blank token at the start
- [ ] To reduce the encoder's sequence length
::: solution
The special tokens condition the decoder: given "transcribe" it writes the speech in the source language, given "translate" it writes English, and the language tag can be supplied or predicted. The encoder is the same for every task, and Whisper does not use CTC.
:::
:::

## Word error rate {#sec-wer}

::: definition Word error rate {#def-wer}
Given a reference transcript of $N$ words and a hypothesis, let $S$, $D$ and $I$ be the numbers of substitutions, deletions and insertions in a minimum-cost alignment of the two word sequences (each operation costing $1$). The **word error rate** is

$$
\mathrm{WER} = \frac{S + D + I}{N}.
$$ {#eq-wer}

The minimum $S + D + I$ is the Levenshtein edit distance between the word sequences, computed by dynamic programming in $O(NM)$ time for a hypothesis of $M$ words: $D_{i,j} = \min(D_{i-1,j} + 1,\ D_{i,j-1} + 1,\ D_{i-1,j-1} + \mathbb{1}[r_i\neq h_j])$.
:::

::: example A word error rate {#ex-wer}
Reference "the cat sat on the mat", hypothesis "the cat sat on a mat mat". Find the edits and the WER.
::: solution
Align the first four words exactly; "the" → "a" is a substitution; "mat" matches; the final "mat" is an insertion. $S = 1$, $D = 0$, $I = 1$, $N = 6$, so WER $= 2/6 = 0.333$, as the listing computes. Note that the denominator counts only reference words: a hypothesis with many insertions can have WER above $1$.
:::
:::

WER depends on **text normalisation** as much as on the recogniser: "Dr." against "doctor", "twenty-five" against "25", punctuation and capitalisation all count as errors unless both sides are normalised. Radford et al. released a normaliser with Whisper for this reason, and WER figures computed with different normalisers are not comparable. For languages written without spaces between words (Chinese, Japanese, Thai) the **character error rate** is used instead. WER also weights all words equally: dropping "not" changes the meaning of a sentence and counts the same as dropping "the".

## Text-to-speech {#sec-tts}

Speech synthesis runs the pipeline in reverse, and it has the opposite difficulty: the text underdetermines the audio. The same sentence can be spoken with any voice, speed, emphasis and emotion, so a synthesiser must make choices the text does not specify, and it must produce $16{,}000$ to $48{,}000$ samples per second that sound natural — errors of phase or timing that would not affect recognition are clearly audible.

A neural TTS system classically has three stages:

1. **Text analysis.** Normalise the text ("£5" → "five pounds", "Dr Smith" → "Doctor Smith") and usually convert it to phonemes with a pronunciation dictionary and a grapheme-to-phoneme model.
2. **Acoustic model.** Map the phoneme or character sequence to a mel spectrogram. **Tacotron 2** (Shen et al., 2018) is an attention encoder–decoder that predicts $80$-band mel frames autoregressively, with a "stop token" to end generation. Non-autoregressive models such as **FastSpeech 2** (Ren et al., 2021) predict an explicit duration for each phoneme, expand the phoneme encodings to frame rate, and generate all frames in parallel, which is faster and avoids attention failures such as skipped or repeated words.
3. **Vocoder.** Turn the mel spectrogram into a waveform — necessary because the mel spectrogram discards phase and fine frequency detail. **WaveNet** (van den Oord et al., 2016) generated audio autoregressively one sample at a time with dilated causal convolutions ([[sequence-models/state-space-models#ex-wavenet]]), predicting each sample as one of $256$ values after $\mu$-law companding; it was first used as a vocoder in Tacotron 2. GAN-based vocoders such as **HiFi-GAN** (Kong et al., 2020) generate in parallel at many times real-time speed and became the common choice.

Shen et al. reported a mean opinion score (listeners' ratings of naturalness on a $1$–$5$ scale) of $4.53$ for Tacotron 2 with a WaveNet vocoder, against $4.58$ for professional recordings. End-to-end models such as VITS (Kim et al., 2021) later trained the acoustic model and vocoder jointly.

::: definition $\mu$-law companding {#def-mulaw}
For a sample $x\in[-1, 1]$ and $\mu = 255$, **$\mu$-law companding** maps
$$
F(x) = \operatorname{sgn}(x)\,\frac{\ln(1 + \mu\lvert x\rvert)}{\ln(1 + \mu)}\in[-1, 1],
$$
and the result is quantised to $256$ levels. Small amplitudes, which are frequent in speech and to which hearing is sensitive, get finer quantisation steps than large ones.
:::

### Speech as tokens: neural codec language models {#sec-codec-tts}

A different approach treats TTS as language modelling. A **neural audio codec** — described in [[multimodal/audio-language-models#sec-codecs]] — compresses audio into a few streams of discrete tokens at a low frame rate and decodes tokens back to audio. Speech synthesis then becomes the generation of codec tokens conditioned on text, by a Transformer trained like a language model on large amounts of speech.

**VALL-E** (Wang et al., 2023) trained on $60{,}000$ hours of English audiobook speech encoded with EnCodec into $8$ codebooks at $75$ frames per second. An autoregressive Transformer generates the first codebook's tokens conditioned on the phonemes of the text and on the tokens of a **3-second recording** of the target speaker; a non-autoregressive Transformer then fills in the remaining seven codebooks in parallel. Because the prompt is just a prefix, the model continues "in the voice" of an unseen speaker, including its recording conditions and emotion — **zero-shot voice cloning** from three seconds of audio, learned as in-context continuation. Later models in this family refined the tokenisation and sampling and, as of 2026, voice cloning from short samples is widely available.

::: example Token rates for codec TTS {#ex-codec-rate}
For VALL-E's codec (EnCodec, $8$ codebooks at $75$ Hz), how many tokens represent a $10$-second utterance, and how many sequential steps do its autoregressive and non-autoregressive stages take?
::: solution
$10\cdot75 = 750$ frames, each with $8$ tokens: $6000$ tokens in all. The autoregressive model generates only the first codebook, $750$ sequential steps; the non-autoregressive model predicts each of the remaining $7$ codebooks for all $750$ frames at once, $7$ steps. Generating all $6000$ tokens autoregressively would take eight times as many sequential steps, which is why codec language models split the work across codebooks.
:::
:::

::: application Voice cloning and consent
The capability that makes codec language models attractive — imitating a voice from seconds of audio — also enables impersonation fraud and non-consensual synthetic speech. The VALL-E authors did not release their model and discussed detection of synthesised speech; other developers require consent statements, watermark generated audio or restrict cloning to verified voices. Detection of synthetic audio and provenance marking are discussed in [[llm-society/copyright-provenance]] and [[llm-society/misinformation]]; none of them is fully reliable as of 2026.
:::

::: history
Bell Labs' "Audrey" (1952) recognised spoken digits from one speaker. Statistical recognition with hidden Markov models and $n$-gram language models, developed at IBM and CMU in the 1970s–80s (Jelinek, Baker), dominated for three decades, with mel-frequency cepstral coefficients (Davis and Mermelstein, 1980) as features. Graves et al. introduced CTC in 2006 (ICML) and the RNN-Transducer in 2012; deep networks replaced the HMM's Gaussian acoustic models around 2012 (Hinton et al.). End-to-end attention recognisers (Chan et al., 2016), Conformers (2020), self-supervised wav2vec 2.0 (2020) and HuBERT (2021) followed, and Whisper (Radford et al., posted December 2022, ICML 2023) showed the robustness of large-scale weak supervision. On the synthesis side, concatenative and statistical parametric synthesis gave way to WaveNet (2016), Tacotron 2 (2018), FastSpeech (2019–2021) and HiFi-GAN (2020); VALL-E (2023) recast TTS as language modelling over codec tokens.
:::

::: summary
- Speech is sampled (typically at $16$ kHz for recognition), framed ($25$ ms windows, $10$ ms hop), windowed (Hann) and Fourier-transformed; triangular filters spaced on the mel scale $m = 2595\log_{10}(1 + f/700)$ and a logarithm give log-mel features.
- A bin-centred tone of amplitude $A$ gives DFT magnitude about $\frac A2\sum w$; tapered windows trade main-lobe width for low leakage.
- CTC adds a blank, defines a transcript's probability as the sum over all alignments that collapse to it, and computes it with an $O(TU)$ forward recursion over the blank-interleaved target; it assumes conditionally independent frame outputs.
- Transducers and attention encoder–decoders remove that assumption; self-supervised encoders (wav2vec 2.0, HuBERT) need little labelled data.
- Whisper is an encoder–decoder trained on $680{,}000$ hours of weakly labelled web audio, with task tokens for language, transcription, translation and timestamps; it is robust across datasets but can hallucinate.
- WER $= (S + D + I)/N$ by edit distance; it depends on text normalisation and can exceed $1$.
- TTS maps text to a mel spectrogram (Tacotron 2, FastSpeech 2) and a vocoder maps that to audio (WaveNet, HiFi-GAN); codec language models such as VALL-E generate discrete audio tokens and clone voices from short prompts.
:::

## Exercises

::: exercise Samples in a Whisper window {level=1 check="480000"}
How many samples does a $30$-second segment at $16$ kHz contain?
::: solution
$30\cdot16{,}000 = 480{,}000$.
:::
:::

::: exercise The mel value of 4 kHz {level=1 check="2146.1"}
Compute $m(4000)$ with [[#eq-mel]], to one decimal place.
::: solution
$2595\log_{10}(1 + 4000/700) = 2595\log_{10}(6.714) = 2595\cdot0.8270 = 2146.1$ mel. Half of the $2840$ mel up to $8$ kHz lies below about $2.4$ kHz.
:::
:::

::: exercise Frequency resolution {level=1 check="40"}
At $16$ kHz with an FFT of size $400$ (no zero-padding), what is the spacing of the DFT bins in hertz?
::: solution
$f_s/N = 16{,}000/400 = 40$ Hz. Zero-padding to $512$, as in the listing, reduces the spacing to $31.25$ Hz but adds no new information; it interpolates the spectrum.
:::
:::

::: exercise A word error rate by hand {level=1 check="0.4"}
Reference "turn the lights off now", hypothesis "turn lights of now". Compute the WER.
::: solution
"the" is deleted and "off" is replaced by "of": $D = 1$, $S = 1$, $I = 0$, $N = 5$, so WER $= 2/5 = 0.4$.
:::
:::

::: exercise A word error rate above one {level=2 check="1.5"}
Reference "yes please" ($N = 2$), hypothesis "yes yes yes please please". Compute the WER and explain why it exceeds $1$.
::: solution
The hypothesis contains the reference in order plus three extra words: $I = 3$, $S = D = 0$, WER $= 3/2 = 1.5$. Insertions are unbounded while the denominator is fixed by the reference, so a recogniser that hallucinates or repeats text can exceed $100\%$ WER.
:::
:::

::: exercise How many frames does CTC need? {level=2 check="6"}
What is the smallest number of frames $T$ for which a CTC model can output "hello" (five characters)?
::: solution
Each character needs one frame, and the two l's need a blank between them, or they would merge: the shortest path is $\texttt{h e l}\,\varnothing\,\texttt{l o}$, so $T = 6$. In general $T\ge U + r$, where $r$ is the number of adjacent equal pairs in the target. Whisper's $20$ ms encoder frames would allow $50$ characters per second, far above speaking rates — but CTC models with heavily downsampled encoders can hit this limit.
:::
:::

::: exercise $\mu$-law {level=2 check="0.591"}
Compute $F(0.1)$ for $\mu = 255$ to three decimal places, and explain what it implies about the quantisation of quiet samples.
::: solution
$F(0.1) = \ln(1 + 25.5)/\ln256 = 3.277/5.545 = 0.591$. A sample at a tenth of full scale is mapped to $59\%$ of the output range, so $59\%$ of the $256$ levels (about $151$) are spent on the interval $[-0.1, 0.1]$: quiet sounds get fine steps, loud ones coarse steps.
:::
:::

::: exercise Codec steps {level=1 check="750"}
How many sequential autoregressive steps does VALL-E's first stage take for $10$ seconds of speech?
::: solution
One step per codec frame of the first codebook: $10\cdot75 = 750$ ([[#ex-codec-rate]]).
:::
:::

::: exercise Counting CTC alignments {level=3}
Show that for a target of $U$ labels with no two adjacent labels equal, the number of length-$T$ paths that collapse to it is $\binom{T + U}{2U}$. Check the formula against brute-force counts for $T = 5$ and the targets "ab" and "aba".
::: solution
A valid path is a sequence of $2U + 1$ runs: a run of blanks (length $\ge0$), a run of $y_1$ (length $\ge1$), a run of blanks ($\ge0$), …, a run of $y_U$ ($\ge1$), a final run of blanks ($\ge0$). Because adjacent labels differ, every such sequence collapses to $\mathbf{y}$, and every valid path decomposes uniquely in this way (blank runs between different labels may be empty). Counting paths therefore counts solutions of $b_0 + \ell_1 + b_1 + \dots + \ell_U + b_U = T$ with $\ell_u\ge1$, $b_u\ge0$. Substituting $\ell_u' = \ell_u - 1\ge0$ gives $2U + 1$ non-negative parts summing to $T - U$, and by stars and bars there are $\binom{T - U + 2U}{2U} = \binom{T + U}{2U}$ solutions. For $T = 5$: "ab" gives $\binom{7}{4} = 35$ and "aba" gives $\binom{8}{6} = 28$, both matching enumeration of the $3^5$ paths with the listing's `collapse`. The count grows exponentially in $T$ for fixed $U$, which is why the forward recursion is needed.
:::
:::

::: exercise The independence assumption {level=3}
(a) Explain why a CTC model cannot, by itself, prefer "their car" to "there car" when the audio is identical, while an attention encoder–decoder can. (b) Describe **shallow fusion** — adding $\lambda\log P_{\text{LM}}(\mathbf{y})$ to the recogniser's score during beam search — and why a length bonus is usually added with it.
::: solution
(a) In CTC, $P(\pi\mid\mathbf{x}) = \prod_tp_t(\pi_t\mid\mathbf{x})$: each frame's output depends on the audio only, not on the other outputs. If the audio for "their" and "there" is identical, the two transcripts get equal probability (up to whatever context the encoder sees in the audio), and nothing in the model knows that "their car" is far more likely as English. An encoder–decoder conditions each token on all previous tokens, $p(y_u\mid y_{<u}, \mathbf{x})$, so it learns an implicit language model from its transcripts.

(b) Shallow fusion scores each hypothesis in the beam by $\log P_{\text{ASR}}(\mathbf{y}\mid\mathbf{x}) + \lambda\log P_{\text{LM}}(\mathbf{y})$, with $\lambda$ tuned on held-out data, so an external language model trained on much more text than the recogniser's transcripts can break acoustic ties. Each extra word multiplies $P_{\text{LM}}$ by a factor below $1$, so the combined score is biased towards short transcripts (deletions); adding $\gamma\lvert\mathbf{y}\rvert$ for a tuned $\gamma>0$ counteracts that bias.
:::
:::
