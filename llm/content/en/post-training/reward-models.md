The reinforcement-learning machinery of [[post-training/rl-for-language-models]] needs a reward: a number for every response. For a unit test or a maths answer the number is easy to compute. For "write a helpful, honest reply to this email" it is not, and no one can write the function down. The approach that made RLHF work is to **learn** the reward from people's judgements, and the judgement that people give most reliably is not a score but a comparison: *of these two answers, which is better?*

This chapter builds the **reward model** from such comparisons. It defines the **Bradley–Terry model**, derives the pairwise loss as its maximum-likelihood objective and proves the properties that matter in practice — rewards are identified only up to a constant per prompt, the loss is a proper scoring rule, and label noise sets a ceiling on accuracy. It describes how reward models are built and trained, and then the central difficulty: a learned reward is a proxy, and optimising a proxy hard enough makes it stop tracking the goal. The chapter proves the KL cost of best-of-$n$ selection, presents the empirical **scaling of over-optimisation** found by Gao, Schulman and Hilton (2023), and ends with **process** rewards that judge each step of a solution rather than only the outcome.

## Why comparisons {#sec-comparisons}

Ask a labeller to rate a response from 1 to 7, and the answer depends on the labeller's personal scale, on what they rated just before, and on their mood; two labellers who agree about which of two responses is better may give them quite different absolute numbers. Comparisons cancel these offsets. They are also closer to the decision that matters: when a policy is improved, the question is whether the new response is better than the old one.

A comparison dataset has the form $\mathcal{D} = \{(\mathbf{x}^{(i)}, \mathbf{y}_w^{(i)}, \mathbf{y}_l^{(i)})\}$: a prompt, a **chosen** (winning) response and a **rejected** (losing) one. Responses are usually sampled from current models — the SFT model, earlier policies, sometimes other systems — so that the comparisons cover the kind of text the policy will produce. To turn comparisons into a reward we need a model of how a hidden quality produces them.

## The Bradley–Terry model {#sec-bt}

::: definition Bradley–Terry model {#def-bt}
Each response $\mathbf{y}$ to a prompt $\mathbf{x}$ has a real-valued **reward** $r(\mathbf{x}, \mathbf{y})$. In the **Bradley–Terry model**, a comparison between $\mathbf{y}_1$ and $\mathbf{y}_2$ prefers $\mathbf{y}_1$ with probability

$$
P(\mathbf{y}_1\succ\mathbf{y}_2\mid\mathbf{x}) = \frac{e^{r(\mathbf{x}, \mathbf{y}_1)}}{e^{r(\mathbf{x}, \mathbf{y}_1)} + e^{r(\mathbf{x}, \mathbf{y}_2)}} = \sigma\big(r(\mathbf{x}, \mathbf{y}_1) - r(\mathbf{x}, \mathbf{y}_2)\big),
$$ {#eq-bt}

where $\sigma(z) = 1/(1 + e^{-z})$ is the logistic function ([[ml-fundamentals/logistic-regression#def-sigmoid]]), and different comparisons are independent given the rewards.
:::

Equivalently, each response has a positive **strength** $e^{r}$, and a comparison is won in proportion to strength. A reward difference of $1$ means the better response wins $\sigma(1) = 73\%$ of comparisons; a difference of $3$, $95\%$. The Elo rating of chess players is the same model with a different scale: a difference of $400$ Elo points is a factor of $10$ in strength, so $r = \frac{\ln10}{400}\times\text{Elo}$.

One can derive [[#eq-bt]] from a random-utility model: if each comparison perceives the quality of $\mathbf{y}_k$ as $r_k + \varepsilon_k$ with independent standard Gumbel noise $\varepsilon_k$, the difference of two Gumbels is logistic, and the probability that the first perceived quality is larger is $\sigma(r_1 - r_2)$. With Gaussian noise instead one gets the closely similar Thurstone model. Either way, the model asserts something checkable: preferences are **transitive in probability** and determined by a single number per response. Real human preferences can violate this — different labellers weigh helpfulness and brevity differently, and a population of consistent labellers can have intransitive majority preferences — which is one reason reward models are imperfect.

::: proposition Rewards are identified only up to a constant per prompt {#prop-shift}
For any function $c(\mathbf{x})$, the rewards $r(\mathbf{x}, \mathbf{y})$ and $r(\mathbf{x}, \mathbf{y}) + c(\mathbf{x})$ give the same preference probabilities [[#eq-bt]] for every comparison. Conversely, if two reward functions give the same preference probabilities for all pairs of responses to $\mathbf{x}$, they differ by a constant on the responses to $\mathbf{x}$.
:::

::: proof
The probability depends only on the difference $r(\mathbf{x}, \mathbf{y}_1) - r(\mathbf{x}, \mathbf{y}_2)$, in which $c(\mathbf{x})$ cancels. Conversely, $\sigma$ is injective, so equal probabilities mean equal differences for every pair, $r(\mathbf{x}, \mathbf{y}_1) - r'(\mathbf{x}, \mathbf{y}_1) = r(\mathbf{x}, \mathbf{y}_2) - r'(\mathbf{x}, \mathbf{y}_2)$, which is a constant in $\mathbf{y}$.
:::

Three practical consequences follow. A reward model's outputs for responses to *different* prompts cannot be compared: a reward of $2$ on one prompt may be worse than $-1$ on another. Policy-gradient methods are unaffected, since a per-prompt constant is a baseline ([[post-training/rl-for-language-models#prop-baseline]]), but anything that pools rewards across prompts — a running-mean baseline, a reward threshold for filtering — inherits the arbitrary offsets. And implementations often **normalise** the reward model after training; InstructGPT shifted it so that labeller-written demonstrations scored $0$ on average. The *scale* of the rewards, by contrast, is fixed: the logistic link makes a difference of $1$ mean $73\%$.

### The pairwise loss {#sec-loss}

::: proposition The reward-model loss is the Bradley–Terry likelihood {#prop-rm-loss}
Let $r_\phi$ be a parametrised reward. The negative log-likelihood of a comparison dataset under [[#eq-bt]], averaged over comparisons, is

$$
\mathcal{L}_{\text{RM}}(\phi) = -\frac{1}{|\mathcal{D}|}\sum_{(\mathbf{x}, \mathbf{y}_w, \mathbf{y}_l)\in\mathcal{D}}\log\sigma\big(r_\phi(\mathbf{x}, \mathbf{y}_w) - r_\phi(\mathbf{x}, \mathbf{y}_l)\big),
$$ {#eq-rm-loss}

and writing $\Delta = r_\phi(\mathbf{x}, \mathbf{y}_w) - r_\phi(\mathbf{x}, \mathbf{y}_l)$, the gradient of one term is

$$
\nabla_\phi\big[-\log\sigma(\Delta)\big] = -\sigma(-\Delta)\,\big(\nabla_\phi r_\phi(\mathbf{x}, \mathbf{y}_w) - \nabla_\phi r_\phi(\mathbf{x}, \mathbf{y}_l)\big).
$$ {#eq-rm-grad}
:::

::: proof
Each comparison is an independent observation "the first-listed response won", with probability $\sigma(\Delta)$ under the model; the log-likelihood is the sum of $\log\sigma(\Delta)$, and maximising it is minimising [[#eq-rm-loss]] ([[math-for-ml/estimation#def-mle]]). For the gradient, $\frac{d}{d\Delta}\log\sigma(\Delta) = 1 - \sigma(\Delta) = \sigma(-\Delta)$, and the chain rule gives [[#eq-rm-grad]].
:::

The gradient is easy to read. Each comparison pushes the chosen reward up and the rejected one down, with weight $\sigma(-\Delta)$: the probability the model currently gives to the *wrong* outcome. Comparisons the model already gets right with a large margin contribute almost nothing; mistakes contribute almost fully. This is logistic regression ([[ml-fundamentals/logistic-regression#prop-logistic-loss]]) on the reward *difference*, with the label always "first wins".

::: proposition Properties of the pairwise loss {#prop-rm-props}
1. **Convexity.** As a function of the reward values $(r_w, r_l)$ — and hence of the parameters of any reward that is linear in them, such as a linear head on fixed features — each term $-\log\sigma(r_w - r_l)$ is convex.
2. **Proper scoring.** Suppose that for a given pair the true probability that $\mathbf{y}_1$ is preferred is $p\in(0, 1)$. The expected loss over the label, $-p\log\sigma(\Delta) - (1-p)\log\sigma(-\Delta)$ with $\Delta = r_1 - r_2$, is minimised exactly when $\sigma(\Delta) = p$, that is $\Delta = \log\frac{p}{1-p}$.
:::

::: proof
(1) $f(z) = -\log\sigma(z) = \log(1 + e^{-z})$ has $f''(z) = \sigma(z)\sigma(-z) > 0$, and a convex function of a linear function is convex. (2) The expected loss is the binary cross-entropy between $(p, 1-p)$ and $(\sigma(\Delta), \sigma(-\Delta))$, equal to $H(p) + D_{\mathrm{KL}}$, minimised when the two distributions agree ([[math-for-ml/information-theory#thm-gibbs]]).
:::

Part 2 says that with enough data the reward model learns the true log-odds of preference: a pair that labellers split $60{:}40$ should get a reward gap of $\log1.5 = 0.405$, not an infinite one. With a finite dataset in which each pair is labelled once, the empirical frequency is $0$ or $1$ and nothing stops the gap from growing except regularisation and early stopping — a fact that resurfaces in direct preference optimisation ([[post-training/preference-optimisation#sec-ipo]]).

::: example A reward-model loss by hand {#ex-rm-loss}
A reward model scores a chosen response $1.2$ and the rejected one $0.4$. Compute the probability it assigns to the observed preference, the loss, and the gradient coefficient $\sigma(-\Delta)$. Repeat if the scores are swapped.
::: solution
$\Delta = 0.8$, $\sigma(0.8) = 0.690$, loss $-\ln0.690 = 0.371$, coefficient $\sigma(-0.8) = 0.310$. Swapped: $\Delta = -0.8$, probability $0.310$, loss $-\ln0.310 = 1.171$, coefficient $0.690$. The wrong ranking costs three times as much and gets more than twice the gradient. A constant added to both scores changes nothing ([[#prop-shift]]).
:::
:::

::: example Elo and Bradley–Terry {#ex-elo}
Two chat models have arena-style Elo ratings of $1250$ and $1150$. Under the Bradley–Terry model behind Elo ratings, what fraction of comparisons should the first win, and what reward difference is that in nats?
::: solution
With the convention that $400$ points is a factor $10$ in odds, the odds are $10^{100/400} = 1.778$, so the first wins $1.778/2.778 = 64\%$. The reward difference is $\ln1.778 = 0.576$ nats ($= 100\ln10/400$). Leaderboards that rank chat models from pairwise human votes, such as Chatbot Arena (Chiang et al., 2024), fit exactly this model to millions of comparisons ([[evaluation/human-evaluation]]).
:::
:::

## Building a reward model {#sec-architecture}

::: definition Neural reward model {#def-rm}
A **reward model** $r_\phi(\mathbf{x}, \mathbf{y})$ is a Transformer language model, usually initialised from the SFT model or a model of the same family, whose output layer is replaced by a **scalar head**: a linear map from the final hidden state at the last token of $\mathbf{x}\oplus\mathbf{y}$ (often an end-of-sequence token) to a real number. It is trained on comparisons with the loss [[#eq-rm-loss]], typically for one epoch.
:::

The reward model reads the whole prompt and response with the same bidirectional-in-hindsight view a judge would have — the last token can attend to everything — and must compress its judgement into a single number. Starting from a pretrained and instruction-tuned model matters: judging a response requires knowing what a good response looks like. Practical details reported in the literature include:

- **Ranking several responses.** InstructGPT (Ouyang et al., 2022) showed labellers between $4$ and $9$ responses to rank, giving $\binom{K}{2}$ comparisons per prompt. Treating these as independent examples made the reward model overfit within one epoch, because each response appears in $K - 1$ comparisons; training on all comparisons from a prompt together, as one batch element, avoided this and was cheaper, since each response needs only one forward pass. The **Plackett–Luce** model generalises Bradley–Terry to full rankings.
- **Preference strength.** Llama 2 (Touvron et al., 2023) asked labellers how much better the chosen response was, on a four-level scale, and added a margin $m$ that grows with the stated strength inside the loss, $-\log\sigma(\Delta - m)$. It also trained separate helpfulness and safety reward models, since the two goals conflict on some prompts.
- **Ties.** Comparisons labelled "equally good" are often dropped; models of ties (such as Rao–Kupper or Davidson extensions of Bradley–Terry) exist but are less common.
- **Model size.** InstructGPT used a $6$-billion-parameter reward model for a $175$-billion-parameter policy, reporting that training a $175$-billion-parameter reward model was unstable. Larger reward models are generally more robust to over-optimisation (below).

::: example Comparisons from a ranking {#ex-ranking}
A labeller ranks $K = 7$ responses to a prompt. How many pairwise comparisons does this yield, and how many forward passes of the reward model does a training step on this prompt need if all comparisons are processed together?
::: solution
$\binom72 = 21$ comparisons, from $7$ forward passes (one per response), since every comparison reuses two of the seven scalar rewards. Processing the $21$ comparisons as separate examples would cost $42$ forward passes and, as InstructGPT found, weights each response $6$ times per epoch, encouraging overfitting.
:::
:::

### Fitting Bradley–Terry in code {#sec-code}

The listing simulates $2{,}000$ comparisons among five responses with hidden rewards $0, 0.5, 1, 1.5, 3$, drawn from the Bradley–Terry model, and recovers the rewards by gradient descent on [[#eq-rm-loss]] with one free parameter per response (the "tabular" reward model). It then compares the training accuracy with the best accuracy any model could reach on such noisy labels.

```python
import math, random

def sigmoid(z):
    return 1.0 / (1.0 + math.exp(-z))

# 1. Fit a Bradley-Terry model to simulated comparisons
true_r = [0.0, 0.5, 1.0, 1.5, 3.0]                    # hidden rewards of 5 responses to one prompt
K = len(true_r)
rng = random.Random(0)
data = []                                              # (winner, loser) pairs
for _ in range(2000):
    i, j = rng.sample(range(K), 2)
    if rng.random() < sigmoid(true_r[i] - true_r[j]):
        data.append((i, j))
    else:
        data.append((j, i))

r = [0.0] * K
for step in range(2000):                               # gradient descent on the mean BT loss
    g = [0.0] * K
    for w, l in data:
        q = sigmoid(-(r[w] - r[l]))                    # d loss / d r_l = q, d loss / d r_w = -q
        g[w] -= q; g[l] += q
    r = [ri - 0.5 * gi / len(data) for ri, gi in zip(r, g)]
loss = -sum(math.log(sigmoid(r[w] - r[l])) for w, l in data) / len(data)
shift = sum(true_r) / K - sum(r) / K                   # rewards are identified only up to a constant
print("fitted (shifted):", [round(x + shift, 3) for x in r])
print("true:            ", true_r)
acc = sum(r[w] > r[l] for w, l in data) / len(data)
pairs = [(i, j) for i in range(K) for j in range(K) if i < j]
ceiling = sum(sigmoid(abs(true_r[i] - true_r[j])) for i, j in pairs) / len(pairs)
print(f"mean loss {loss:.4f}  training accuracy {acc:.3f}  Bayes ceiling {ceiling:.3f}")
```

```text
fitted (shifted): [-0.066, 0.575, 1.052, 1.583, 2.856]
true:             [0.0, 0.5, 1.0, 1.5, 3.0]
mean loss 0.4982  training accuracy 0.771  Bayes ceiling 0.772
```

The fitted rewards, shifted to the same mean as the true ones (the only freedom, by [[#prop-shift]]), are within sampling error of the truth. Yet the model "gets wrong" $23\%$ of the training comparisons — not because it is bad, but because the labels are noisy: even the true rewards would agree with only about $77\%$ of them.

## Evaluating a reward model {#sec-evaluation}

The usual metric is **pairwise accuracy** on held-out comparisons: the fraction where the chosen response gets the higher reward. The listing shows why a perfect reward model does not reach $100\%$.

::: proposition The accuracy ceiling {#prop-ceiling}
If comparisons follow the Bradley–Terry model with true rewards $r^\star$, a pair with true gap $\Delta^\star = r^\star(\mathbf{y}_1) - r^\star(\mathbf{y}_2)$ is labelled in favour of the truly better response with probability $\sigma(|\Delta^\star|)$. No reward model, however good, can have expected accuracy above $\E\big[\sigma(|\Delta^\star|)\big]$ over the evaluation pairs, and the true reward attains it.
:::

::: proof
For one pair, a model that ranks $\mathbf{y}_1$ above $\mathbf{y}_2$ is right with probability $P(\mathbf{y}_1\succ\mathbf{y}_2) = \sigma(\Delta^\star)$, and with the opposite ranking $\sigma(-\Delta^\star)$. The better of the two is $\max(\sigma(\Delta^\star), \sigma(-\Delta^\star)) = \sigma(|\Delta^\star|)$, achieved by ranking according to $r^\star$. Averaging over pairs gives the bound.
:::

With human labels the ceiling is set by agreement between people. InstructGPT reported that its training labellers agreed with each other about $73\%$ of the time; reward models trained on such data are often reported with held-out accuracies in the high $60$s to low $70$s per cent. An accuracy of $70\%$ is therefore not "30% wrong" — it may be close to the best possible. It also means that accuracy alone says little about the property that matters most, which is how the reward behaves on the policy's *future* outputs. Benchmarks such as RewardBench (Lambert et al., 2024) evaluate reward models on curated pairs where one response is clearly better (chat, safety, reasoning, refusals), which removes the label noise but tests a narrower distribution.

::: quiz
A reward model has $69\%$ accuracy on held-out comparisons labelled by one person each. Inter-labeller agreement on the same pairs is $72\%$. What can you conclude?
- [ ] The reward model is wrong on $31\%$ of pairs and needs much more training.
- [x] The model is close to the accuracy any model could reach on these labels; accuracy will not reveal much further improvement.
- [ ] The reward model will not be over-optimised, since it is nearly as good as a human.
- [ ] The labellers are careless and the data should be discarded.
::: solution
By [[#prop-ceiling]], label noise bounds achievable accuracy; agreement between two noisy labellers is a rough proxy for that bound. Near-ceiling accuracy on held-out data says nothing about robustness under optimisation: a policy will search for responses far from the evaluation pairs, where the model may be badly wrong.
:::
:::

## Reward hacking and over-optimisation {#sec-overoptimisation}

A reward model is a proxy for what labellers want, accurate on the distribution of responses it was trained on. Reinforcement learning is a search for responses that maximise the proxy, and it will move towards regions where the proxy is wrong in the favourable direction. This is **Goodhart's law** — "when a measure becomes a target, it ceases to be a good measure" — and in RLHF it appears as **reward hacking**: responses that score well without being good. Documented examples include systematic **length** increase, which reward models often reward regardless of content (Singhal et al., 2023, found that much of the reward improvement from RLHF in their settings could be obtained by optimising for length alone); **sycophancy**, agreeing with the user's stated views, which human preference data reward (Sharma et al., 2024); and stylistic tics such as excessive hedging or formatting. The phenomenon is broader than language models and is the subject of [[safety-alignment/reward-hacking]].

The simplest way to optimise against a reward model is **best-of-$n$** sampling: draw $n$ responses from the policy and keep the one with the highest reward. Its cost in divergence from the original policy can be computed exactly.

::: theorem The KL divergence of best-of-$n$ {#thm-bon-kl}
Let responses be drawn from $\pi$ and let the reward $R(\mathbf{y})$ have a continuous distribution under $\pi$ (no ties). Let $\pi_n$ be the distribution of the response with the highest reward among $n$ independent samples. Then

$$
D_{\mathrm{KL}}(\pi_n\,\Vert\,\pi) = \log n - \frac{n-1}{n}.
$$ {#eq-bon-kl}
:::

::: proof
Let $F$ be the cumulative distribution function of $R(\mathbf{y})$ under $\pi$. The selected response lies in a small set $A$ around $\mathbf{y}$ if one of the $n$ samples lies in $A$ and the other $n - 1$ have lower reward; there are $n$ choices for which sample it is, so $\pi_n(\mathbf{y}) = n\,F(R(\mathbf{y}))^{n-1}\pi(\mathbf{y})$, a density ratio of $n F(R(\mathbf{y}))^{n-1}$. Hence

$$
D_{\mathrm{KL}}(\pi_n\Vert\pi) = \E_{\pi_n}\big[\log n + (n-1)\log F(R(\mathbf{y}))\big].
$$

Under $\pi$, $U = F(R(\mathbf{y}))$ is uniform on $[0, 1]$ (the probability integral transform, which needs continuity), so under $\pi_n$ it is the maximum of $n$ uniforms, with density $nu^{n-1}$. Then $\E[\log U] = \int_0^1nu^{n-1}\log u\,du = -\frac1n$ (integrate by parts), and $D_{\mathrm{KL}} = \log n - \frac{n-1}{n}$.
:::

For a language model the reward is not continuous and the same response can be sampled twice; Beirami et al. (2024) showed that [[#eq-bon-kl]] is then an upper bound. The formula grows only logarithmically: best-of-$1{,}000$ costs about $5.9$ nats. This makes best-of-$n$ a convenient yardstick for optimisation pressure: any optimiser, RL included, can be placed on the same axis by the KL divergence it has spent.

Gao, Schulman and Hilton (ICML 2023) used this axis to measure over-optimisation systematically. To avoid the cost of human labels at every point, they used a synthetic setup: a large "gold" reward model played the role of the human labellers and labelled the comparisons on which smaller **proxy** reward models were trained. They then optimised policies against each proxy, with best-of-$n$ and with RL, and measured the *gold* reward along the way as a function of $d = \sqrt{D_{\mathrm{KL}}(\pi\Vert\pi_{\text{init}})}$.

::: proposition Scaling of over-optimisation (empirical, Gao et al., 2023) {#prop-gao}
In the experiments of Gao et al., the gold reward (relative to the initial policy) as a function of $d = \sqrt{D_{\mathrm{KL}}}$ was well fitted by

$$
R_{\text{bon}}(d) = d\,(\alpha_{\text{bon}} - \beta_{\text{bon}}\,d),\qquad R_{\text{RL}}(d) = d\,(\alpha_{\text{RL}} - \beta_{\text{RL}}\log d),
$$ {#eq-gao}

for best-of-$n$ and RL respectively, while the proxy reward kept increasing. The fitted coefficients varied smoothly — roughly logarithmically — with the number of parameters of the proxy reward model: larger proxies were over-optimised later and less severely. More comparison data also helped. These are fitted forms in one experimental setting, not laws: they do not say what happens with human labels, other models or other optimisers.
:::

Both forms rise, peak and fall: the gold reward of best-of-$n$ peaks at $d = \alpha_{\text{bon}}/(2\beta_{\text{bon}})$, and that of RL at $d = e^{\alpha_{\text{RL}}/\beta_{\text{RL}} - 1}$. Beyond the peak, further optimisation of the proxy makes the policy *worse* by the standard the proxy was meant to measure — and nothing in the proxy reward signals it.

::: widget plot
f: x*(a - b*x); x*(c - k*log(x))
x: 0.01, 10
y: -2, 6
sliders: a=1.5:0.2:3:0.1; b=0.15:0.02:0.5:0.01; c=1.2:0.2:3:0.1; k=0.5:0.1:1.5:0.05
labels: best-of-$n$ gold reward $d(\alpha - \beta d)$; RL gold reward $d(\alpha - \beta\log d)$
caption: The fitted forms [[#eq-gao]] of Gao et al. (2023), with illustrative coefficients, against $d = \sqrt{\mathrm{KL}}$ in nats$^{1/2}$. With $a = 1.5$, $b = 0.15$ the best-of-$n$ curve peaks at $d = 5$ ($\mathrm{KL} = 25$ nats, far beyond any practical $n$, since best-of-$1000$ is only $5.9$ nats); the RL curve with $c = 1.2$, $k = 0.5$ peaks at $d = e^{1.4} = 4.1$. Lower $b$ and $k$ — a larger proxy reward model, in their experiments — push the peaks to the right.
:::

The following simulation shows the mechanism in its simplest form. Each sampled response has a gold quality $g\sim\Normal(0, 1)$, and the proxy reward adds an independent error with heavy tails (a scaled Student-$t$ with $2$ degrees of freedom). Best-of-$n$ selects by proxy.

```python
def student_t(rng, nu):
    z = rng.gauss(0, 1)
    chi2 = sum(rng.gauss(0, 1) ** 2 for _ in range(nu))
    return z / math.sqrt(chi2 / nu)

rng = random.Random(1)
print("   n   proxy of chosen   gold of chosen   KL bound log n-(n-1)/n")
for n in (1, 4, 16, 64, 256, 1024):
    P = G = 0.0
    trials = 2000
    for _ in range(trials):
        best = None
        for _ in range(n):
            gold = rng.gauss(0, 1)
            proxy = gold + 0.5 * student_t(rng, 2)     # proxy = gold + heavy-tailed error
            if best is None or proxy > best[0]:
                best = (proxy, gold)
        P += best[0]; G += best[1]
    print(f"{n:5d}   {P / trials:14.3f}   {G / trials:14.3f}   {math.log(n) - (n - 1) / n:10.3f}")
```

```text
   n   proxy of chosen   gold of chosen   KL bound log n-(n-1)/n
    1           -0.012           -0.019        0.000
    4            1.604            0.781        0.636
   16            2.930            1.134        1.835
   64            5.439            0.962        3.175
  256           10.131            0.534        4.549
 1024           19.822            0.204        5.932
```

The proxy reward of the chosen response grows without limit, but the gold quality peaks near $n = 16$ and then falls back towards the average. With mild optimisation, selecting on the proxy mostly selects good responses; with strong optimisation, it mostly selects responses where the proxy's error is extreme, which are no better than average. Gao et al. distinguish several mechanisms of this kind; the heavy-tailed error here is the simplest.

::: warning A rising reward is not evidence of improvement
During RLHF the reward model's score almost always goes up — that is what the optimiser does. On its own this says nothing about quality, and past the over-optimisation peak it moves in the opposite direction to quality. Track independent signals: held-out human or strong-model judgements, the KL divergence from the reference, response length, refusal rates and task benchmarks. Treat a sudden jump in reward, or a reward that keeps climbing while the KL grows fast, as a warning.
:::

Mitigations used in practice attack different parts of the problem: the **KL penalty** limits how far the policy moves ([[post-training/rl-for-language-models#sec-kl]]); **larger reward models and more data** push the peak further out; **ensembles** of reward models, optimising a conservative combination such as the minimum or mean minus a multiple of the spread, reduce exploitation of any one model's errors (Coste et al., 2024; Eisenstein et al., 2023, who found that ensembles mitigate but do not eliminate hacking); **iterated data collection** labels samples from the current policy so the reward model learns where it was wrong, as in the weekly updates described by Bai et al. (2022a) and Llama 2; and **length controls** penalise or normalise response length.

## Process and outcome rewards {#sec-process}

For tasks with multi-step solutions — mathematics, code, planning — a reward can judge only the final result, or every step.

::: definition Outcome and process reward models {#def-prm}
An **outcome reward model** (ORM) scores a complete solution by whether its final answer is correct, often trained on labels obtained by checking the answer. A **process reward model** (PRM) scores each intermediate step $s_1, \dots, s_m$ of a solution, predicting $p_k = P(\text{step } k \text{ is correct}\mid\mathbf{x}, s_{\le k})$; a solution's score is an aggregate such as the product $\prod_kp_k$ (the probability that every step is correct) or the minimum.
:::

Uesato et al. (2022) compared the two on grade-school word problems and found similar final-answer accuracy, but process supervision produced fewer solutions that reached the right answer by faulty reasoning. **Let's Verify Step by Step** (Lightman et al., 2023) collected PRM800K — about $800{,}000$ human labels of individual steps of model-generated solutions to problems from the MATH dataset — and trained a PRM. Used to rerank many sampled solutions from a strong base model, the PRM selected a correct solution for $78\%$ of the problems in their test subset, against $72\%$ for an ORM and $70\%$ for majority voting, and the gap grew with the number of samples reranked. The paper also used **active learning**, labelling preferentially the convincing wrong solutions, which made labels more valuable.

Process labels are expensive, so later work estimated them automatically: the value of a step can be approximated by how often continuations from it reach the correct answer (Math-Shepherd, Wang et al., 2024). Process rewards give denser credit assignment in RL — each step gets its own signal, much as a critic does ([[post-training/rl-for-language-models#sec-advantage]]) — but they are learned models and can be hacked too; much recent RL for reasoning has instead used outcome rewards that are **verified** by a program ([[post-training/preference-optimisation#sec-rlvr]]). Both are developed in [[reasoning/process-outcome-rewards]].

::: example Scoring a solution with a PRM {#ex-prm}
A PRM gives the four steps of a solution the correctness probabilities $0.98$, $0.95$, $0.6$, $0.97$. A second solution's steps get $0.9$, $0.9$, $0.9$, $0.9$. Compare their scores under the product and the minimum aggregation.
::: solution
Product: $0.98\cdot0.95\cdot0.6\cdot0.97 = 0.542$ against $0.9^4 = 0.656$. Minimum: $0.6$ against $0.9$. Both prefer the second solution, whose steps are uniformly plausible, over the first, whose third step is doubtful — a single dubious step is a reason to distrust the whole derivation. An outcome model would see only the final answers and could not make this distinction if both were correct.
:::
:::

::: history
The model of paired comparisons was proposed by Ernst Zermelo (1929) for rating chess players and rediscovered by Ralph Bradley and Milton Terry (Biometrika, 1952); Louis Thurstone (1927) had proposed the Gaussian version, R. Duncan Luce (1959) the choice axiom that generalises it, and Robin Plackett (1975) the ranking model. Arpad Elo's chess ratings (1960s) use the same logistic form. Learning a reward function from human preferences for reinforcement learning goes back to preference-based RL (for example Akrour et al., 2011, and Wirth et al., 2017, for a survey), and Christiano et al. (2017) scaled it with deep networks and a Bradley–Terry reward model trained on comparisons of trajectory clips. Ziegler et al. (2019) and Stiennon et al. (2020) applied it to language models, and Stiennon et al. observed that optimising too hard against the learned reward reduced human-judged quality. InstructGPT (Ouyang et al., 2022) and Anthropic's helpful-and-harmless assistant (Bai et al., 2022a) scaled reward models to general assistants. Gao, Schulman and Hilton (2023) measured the scaling of over-optimisation, Lightman et al. (2023) compared process and outcome supervision at scale, and RewardBench (Lambert et al., 2024) standardised reward-model evaluation.
:::

::: summary
- Reward models are learned from **comparisons**, which are more reliable than absolute scores. The **Bradley–Terry** model sets $P(\mathbf{y}_1\succ\mathbf{y}_2) = \sigma(r_1 - r_2)$, the same model as Elo ratings.
- Rewards are identified only **up to a constant per prompt** ([[#prop-shift]]), so rewards for different prompts are not comparable; the scale is fixed by the logistic link.
- The pairwise loss $-\log\sigma(r_w - r_l)$ is the Bradley–Terry negative log-likelihood; its gradient weights each comparison by the probability of the wrong outcome, and it is a **proper scoring rule**, learning the log-odds of preference.
- A neural reward model is a language model with a scalar head; practical details include training on all $\binom K2$ comparisons of a ranking together, margins for preference strength, and normalisation.
- Label noise caps accuracy at $\E[\sigma(|\Delta^\star|)]$; typical human agreement of about $70\%$ makes high accuracy impossible and uninformative about robustness.
- A learned reward is a proxy: optimising it hard leads to **reward hacking**. Best-of-$n$ costs $\log n - (n-1)/n$ nats of KL; Gao et al. found gold reward rising and then falling with $\sqrt{\mathrm{KL}}$, with later peaks for larger reward models (empirical).
- **Process reward models** score each step; on MATH reranking they beat outcome models in Lightman et al. (2023).
:::

## Exercises

::: exercise A preference probability {level=1 check="0.8808"}
Under the Bradley–Terry model, response A has reward $2.5$ and response B has reward $0.5$. With what probability is A preferred? Give four decimal places.
::: solution
$\sigma(2.5 - 0.5) = \sigma(2) = 1/(1 + e^{-2}) = 0.8808$.
:::
:::

::: exercise The loss of a comparison {level=1 check="0.4741"}
A reward model gives the chosen response $0.3$ and the rejected response $-0.2$. Compute the pairwise loss to four decimal places.
::: solution
$\Delta = 0.5$, $\sigma(0.5) = 0.6225$, loss $-\ln0.6225 = 0.4741$.
:::
:::

::: exercise Comparisons per ranking {level=1 check="36"}
Labellers rank $9$ responses per prompt. How many pairwise comparisons does one ranking provide?
::: solution
$\binom92 = 36$. Processed together, they need only $9$ forward passes of the reward model.
:::
:::

::: exercise The reward gap for a split vote {level=2 check="0.8473"}
A pair of responses is compared by many labellers, and $70\%$ prefer the first. What reward gap does a reward model trained to convergence on these labels assign, by [[#prop-rm-props]]? Give four decimal places. What gap would it assign if only one labeller had been asked and preferred the first?
::: solution
$\Delta = \log\frac{0.7}{0.3} = \ln2.3333 = 0.8473$. With one label the empirical preference is $1$, and the maximum-likelihood gap is infinite: the loss keeps decreasing as $\Delta\to\infty$. In practice weight decay, early stopping and sharing parameters across many comparisons keep it finite, but individual single-labelled pairs are a source of overconfidence.
:::
:::

::: exercise The KL cost of best-of-n {level=2 check="2.497"}
Using [[#eq-bon-kl]], compute the KL divergence of best-of-$32$ sampling from the base policy, to three decimal places. Which $n$ costs about $1$ nat?
::: solution
$\ln32 - 31/32 = 3.4657 - 0.9688 = 2.497$ nats. For $1$ nat we need $\ln n - 1 + 1/n = 1$: $n = 6$ costs $1.792 - 0.833 = 0.958$ and $n = 7$ costs $1.946 - 0.857 = 1.089$, so best-of-$6$ or best-of-$7$. Doubling $n$ adds only about $\ln2 = 0.69$ nats.
:::
:::

::: exercise The accuracy ceiling {level=2 check="0.7311"}
In an evaluation set every pair has a true reward gap of exactly $1$ in absolute value, and labels follow Bradley–Terry. What is the highest expected accuracy any reward model can achieve (four decimal places)? If half the pairs had gap $0$ and half gap $2$ instead, what would the ceiling be?
::: solution
By [[#prop-ceiling]], $\sigma(1) = 0.7311$. With gaps $0$ and $2$: $\frac12(\sigma(0) + \sigma(2)) = \frac12(0.5 + 0.8808) = 0.6904$ — lower, though the mean gap is the same, because pairs of equal quality are coin flips for any model.
:::
:::

::: exercise Peaks of the over-optimisation curves {level=2 check="4.0552"}
For the RL form of [[#eq-gao]] with $\alpha_{\text{RL}} = 1.2$ and $\beta_{\text{RL}} = 0.5$, at what $d$ does the gold reward peak (four decimal places), and what KL divergence is that? What is the peak gold reward?
::: solution
$\frac{d}{dd}\big[d(\alpha - \beta\log d)\big] = \alpha - \beta\log d - \beta = 0$ gives $d = e^{\alpha/\beta - 1} = e^{1.4} = 4.0552$, so $\mathrm{KL} = d^2 = 16.44$ nats. The peak value is $d(\alpha - \beta\log d) = 4.0552\cdot(1.2 - 0.5\cdot1.4) = 4.0552\cdot0.5 = 2.0276$, i.e. $\beta d$ at the optimum. These coefficients are illustrative, not fitted values from the paper.
:::
:::

::: exercise Fitting Bradley–Terry with three responses {level=3}
Three responses A, B, C are compared: A beats B $8$ times out of $10$, B beats C $6$ times out of $10$, and A beats C $9$ times out of $10$. (a) Write the log-likelihood as a function of $r_A, r_B, r_C$ and show it depends only on two differences. (b) Fix $r_C = 0$ and find the maximum-likelihood rewards numerically (a few lines of plain Python suffice). (c) Are the observed frequencies exactly consistent with the Bradley–Terry model?
::: solution
(a) $\ell = 8\log\sigma(r_A - r_B) + 2\log\sigma(r_B - r_A) + 6\log\sigma(r_B - r_C) + 4\log\sigma(r_C - r_B) + 9\log\sigma(r_A - r_C) + \log\sigma(r_C - r_A)$, a function of $r_A - r_C$ and $r_B - r_C$ only ([[#prop-shift]]).

(b)
```python
import math
s = lambda z: 1 / (1 + math.exp(-z))
wins = [("A", "B", 8, 2), ("B", "C", 6, 4), ("A", "C", 9, 1)]
r = {"A": 0.0, "B": 0.0, "C": 0.0}
for _ in range(5000):
    g = {k: 0.0 for k in r}
    for i, j, w, l in wins:                   # w wins of i over j, l wins of j over i
        p = s(r[i] - r[j])
        g[i] += w - (w + l) * p; g[j] -= w - (w + l) * p
    for k in ("A", "B"):                      # r_C fixed at 0
        r[k] += 0.05 * g[k]
print({k: round(v, 3) for k, v in r.items()},
      [round(s(r[i] - r[j]), 3) for i, j, _, _ in wins])
```

```text
{'A': 1.999, 'B': 0.487, 'C': 0.0} [0.819, 0.619, 0.881]
```

The maximum-likelihood rewards are $r_A = 1.999$, $r_B = 0.487$, $r_C = 0$. (c) No: the fitted probabilities $0.819$, $0.619$, $0.881$ differ from the observed $0.8$, $0.6$, $0.9$. Under Bradley–Terry the log-odds must add up, $\operatorname{logit}P(A\succ C) = \operatorname{logit}P(A\succ B) + \operatorname{logit}P(B\succ C)$, but $\operatorname{logit}0.9 = 2.197$ while $\operatorname{logit}0.8 + \operatorname{logit}0.6 = 1.386 + 0.405 = 1.792$. With $10$ comparisons per pair the discrepancy is well within sampling noise; with thousands it would be evidence against the model.
:::
:::

::: exercise Best-of-n with Gaussian proxy errors {level=3}
In the simulation of [[#sec-overoptimisation]], replace the heavy-tailed error by Gaussian noise: proxy $= g + \varepsilon$ with $\varepsilon\sim\Normal(0, \tau^2)$ independent of $g\sim\Normal(0, 1)$. (a) Show that $\E[g\mid\text{proxy} = p] = p/(1 + \tau^2)$. (b) Deduce that the gold quality of the best-of-$n$ response increases with $n$ for every $\tau$, so that this model shows "regressional" Goodhart (diminished but positive returns) and not over-optimisation. (c) What feature of the heavy-tailed case breaks this?
::: solution
(a) $(g, p)$ is jointly Gaussian with $\Var(p) = 1 + \tau^2$ and $\Cov(g, p) = 1$, so $\E[g\mid p] = p\cdot\Cov(g, p)/\Var(p) = p/(1 + \tau^2)$. (b) The selected response is the one with the largest $p$; given the selected $p$, its expected gold is $p/(1 + \tau^2)$ (the selection depends on $g$ only through $p$, because the samples are independent). The expected maximum of $n$ Gaussian proxies increases with $n$, so the expected gold increases too — by a factor $1/(1 + \tau^2)$ less than the proxy. (c) With heavy-tailed errors $\E[g\mid p]$ is not increasing in $p$ for large $p$: an extreme proxy value is far more likely to come from an extreme error than from an extreme $g$, so $\E[g\mid p]\to0$ as $p\to\infty$. Strong selection then picks responses whose high proxy is explained by error, and gold quality falls back — the pattern in the simulation's output.
:::
:::
