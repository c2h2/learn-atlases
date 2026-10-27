A language model generates text one token at a time from a distribution it has learned. Generating an image is the same problem in principle — learn a distribution $p_\theta(\mathbf{x})$ over images, or $p_\theta(\mathbf{x}\mid c)$ given a caption $c$, and sample from it — but the object is very different: a $512\times512$ colour image has $786{,}432$ continuous values with no natural order, strong correlations at every scale, and a quality judged by eyes that notice a single malformed hand.

Two answers dominate as of 2026. **Diffusion models** learn to reverse a process that gradually turns images into noise: generation starts from pure noise and removes it step by step. **Autoregressive models** turn an image into a sequence of discrete tokens with a learned quantiser and model that sequence like text. This chapter builds up to both. It starts with the two older families that supply key ingredients — variational autoencoders, whose evidence lower bound is derived in full, and generative adversarial networks — then derives the diffusion model of Ho et al. (2020): the closed-form forward process, the noise-prediction objective, and sampling with DDPM and DDIM. A $1$-D diffusion model is trained in plain Python on a mixture of Gaussians. The chapter then treats **classifier-free guidance**, **latent diffusion**, **flow matching**, **diffusion Transformers**, and autoregressive image tokens, and ends with evaluation.

## Variational autoencoders {#sec-vae}

A **latent-variable model** explains data by unobserved causes: draw $\mathbf{z}\sim p(\mathbf{z})$, usually $\Normal(\mathbf{0}, I)$, then $\mathbf{x}\sim p_\theta(\mathbf{x}\mid\mathbf{z})$, a distribution whose parameters are computed by a neural network, the **decoder**. The likelihood $p_\theta(\mathbf{x}) = \int p_\theta(\mathbf{x}\mid\mathbf{z})p(\mathbf{z})\,d\mathbf{z}$ is intractable for a neural decoder, and so is the posterior $p_\theta(\mathbf{z}\mid\mathbf{x})$. The variational autoencoder (Kingma and Welling, 2014; Rezende et al., 2014) introduces an **encoder** $q_\phi(\mathbf{z}\mid\mathbf{x})$ that approximates the posterior and maximises a lower bound on the log-likelihood.

::: theorem Evidence lower bound {#thm-elbo}
For any distribution $q_\phi(\mathbf{z}\mid\mathbf{x})$ with the same support as the posterior,

$$
\log p_\theta(\mathbf{x}) = \underbrace{\E_{q_\phi(\mathbf{z}\mid\mathbf{x})}\big[\log p_\theta(\mathbf{x}\mid\mathbf{z})\big] - \mathrm{KL}\big(q_\phi(\mathbf{z}\mid\mathbf{x})\,\big\|\,p(\mathbf{z})\big)}_{\text{ELBO}(\mathbf{x};\,\theta,\phi)} + \mathrm{KL}\big(q_\phi(\mathbf{z}\mid\mathbf{x})\,\big\|\,p_\theta(\mathbf{z}\mid\mathbf{x})\big),
$$ {#eq-elbo}

so $\log p_\theta(\mathbf{x})\ge\text{ELBO}$, with equality exactly when $q_\phi(\mathbf{z}\mid\mathbf{x}) = p_\theta(\mathbf{z}\mid\mathbf{x})$.
:::

::: proof
By Bayes' theorem, $p_\theta(\mathbf{z}\mid\mathbf{x}) = p_\theta(\mathbf{x}\mid\mathbf{z})p(\mathbf{z})/p_\theta(\mathbf{x})$, so for every $\mathbf{z}$

$$
\log p_\theta(\mathbf{x}) = \log p_\theta(\mathbf{x}\mid\mathbf{z}) + \log\frac{p(\mathbf{z})}{q_\phi(\mathbf{z}\mid\mathbf{x})} + \log\frac{q_\phi(\mathbf{z}\mid\mathbf{x})}{p_\theta(\mathbf{z}\mid\mathbf{x})}.
$$

The left side does not depend on $\mathbf{z}$; take the expectation of both sides under $q_\phi(\mathbf{z}\mid\mathbf{x})$. The three terms become $\E_q[\log p_\theta(\mathbf{x}\mid\mathbf{z})]$, $-\mathrm{KL}(q\,\|\,p(\mathbf{z}))$ and $\mathrm{KL}(q\,\|\,p_\theta(\mathbf{z}\mid\mathbf{x}))$, which is [[#eq-elbo]]. The last KL divergence is non-negative and zero only when the two distributions coincide (Gibbs' inequality, [[math-for-ml/information-theory#thm-gibbs]]).
:::

The ELBO has a readable form: a **reconstruction** term (decode a latent drawn from the encoder and score the original image) and a **regulariser** that keeps the encoder's distributions close to the prior, so that latents drawn from the prior decode to plausible images. With a Gaussian encoder $q_\phi(\mathbf{z}\mid\mathbf{x}) = \Normal(\boldsymbol\mu_\phi(\mathbf{x}), \diag\boldsymbol\sigma^2_\phi(\mathbf{x}))$ the regulariser has a closed form,

$$
\mathrm{KL}\big(\Normal(\boldsymbol\mu, \diag\boldsymbol\sigma^2)\,\big\|\,\Normal(\mathbf{0}, I)\big) = \frac12\sum_{j}\big(\mu_j^2 + \sigma_j^2 - 1 - \log\sigma_j^2\big),
$$ {#eq-kl-gauss}

and the reconstruction term is estimated with one sample written as $\mathbf{z} = \boldsymbol\mu + \boldsymbol\sigma\odot\boldsymbol\varepsilon$, $\boldsymbol\varepsilon\sim\Normal(\mathbf{0}, I)$ — the **reparameterisation trick**, which makes the sample a differentiable function of $\phi$. With a Gaussian decoder of fixed variance the reconstruction term is a squared error. VAE samples are typically blurry, because the squared error averages over plausible details; but VAEs reappear below as the **autoencoders** of latent diffusion, where only their compression is needed, and diffusion itself turns out to be a deep latent-variable model trained with an ELBO.

::: example A KL term by hand {#ex-kl}
An encoder outputs $\mu = (1, 0)$ and $\sigma = (0.5, 1)$ for an image. Compute the KL regulariser.
::: solution
By [[#eq-kl-gauss]]: the first coordinate gives $\frac12(1 + 0.25 - 1 - \ln0.25) = \frac12(0.25 + 1.386) = 0.818$; the second gives $\frac12(0 + 1 - 1 - 0) = 0$. The total is $0.818$ nats. The second coordinate matches the prior exactly and carries no information about the image; the first is shifted and sharpened, and pays for it.
:::
:::

## Generative adversarial networks {#sec-gan}

A GAN (Goodfellow et al., 2014) drops the likelihood altogether. A **generator** $G$ maps noise $\mathbf{z}$ to an image; a **discriminator** $D$ outputs the probability that its input is real. They play the minimax game

$$
\min_G\max_D\ \E_{\mathbf{x}\sim p_{\text{data}}}\big[\log D(\mathbf{x})\big] + \E_{\mathbf{z}}\big[\log\big(1 - D(G(\mathbf{z}))\big)\big].
$$ {#eq-gan}

::: proposition The optimal discriminator {#prop-gan}
For a fixed generator with sample density $p_g$, the inner maximum of [[#eq-gan]] is attained by $D^\star(\mathbf{x}) = p_{\text{data}}(\mathbf{x})/\big(p_{\text{data}}(\mathbf{x}) + p_g(\mathbf{x})\big)$, and the objective then equals $2\,\mathrm{JSD}(p_{\text{data}}\,\|\,p_g) - \log4$, minimised exactly when $p_g = p_{\text{data}}$.
:::

::: proof
The objective is $\int\big(p_{\text{data}}(\mathbf{x})\log D(\mathbf{x}) + p_g(\mathbf{x})\log(1 - D(\mathbf{x}))\big)\,d\mathbf{x}$. For each $\mathbf{x}$ the integrand $a\log y + b\log(1 - y)$ with $a, b\ge0$ is maximised at $y = a/(a + b)$ (set the derivative $a/y - b/(1 - y)$ to zero). Substituting, with $m = (p_{\text{data}} + p_g)/2$, gives $\int p_{\text{data}}\log\frac{p_{\text{data}}}{2m} + \int p_g\log\frac{p_g}{2m} = \mathrm{KL}(p_{\text{data}}\|m) + \mathrm{KL}(p_g\|m) - 2\log2$, which is $2\,\mathrm{JSD} - \log4$. The Jensen–Shannon divergence is zero only for equal distributions.
:::

GANs produce sharp images in a single forward pass, and StyleGAN (Karras et al., 2019) generated faces that people could not tell from photographs. But adversarial training is unstable, and GANs suffer **mode collapse** — covering only part of the data distribution — which made them hard to scale to diverse text-conditioned generation. Their discriminators survive as auxiliary losses: the audio codecs of [[multimodal/audio-language-models#def-codec]] and the image tokenisers of [[#sec-ar]] use adversarial losses to make reconstructions sharp.

## Denoising diffusion {#sec-ddpm}

Diffusion models (Sohl-Dickstein et al., 2015; Ho et al., 2020) define a fixed process that destroys data by adding Gaussian noise in many small steps, and learn to reverse it.

::: definition Forward (noising) process {#def-forward}
Choose a **noise schedule** $0 < \beta_1 < \dots < \beta_T < 1$ and set $\alpha_t = 1 - \beta_t$ and $\bar\alpha_t = \prod_{s=1}^{t}\alpha_s$. The forward process is the Markov chain

$$
q(\mathbf{x}_t\mid\mathbf{x}_{t-1}) = \Normal\big(\sqrt{\alpha_t}\,\mathbf{x}_{t-1},\ \beta_tI\big),\qquad t = 1, \dots, T,
$$

starting from a data point $\mathbf{x}_0$. Ho et al. used $T = 1000$ and $\beta_t$ rising linearly from $10^{-4}$ to $0.02$.
:::

The scaling by $\sqrt{\alpha_t}$ keeps the variance bounded: if $\mathbf{x}_{t-1}$ has unit variance per coordinate, so does $\mathbf{x}_t$. The key fact is that one can jump to any step directly.

::: proposition Closed form of the forward process {#prop-closed-form}
For every $t$,

$$
q(\mathbf{x}_t\mid\mathbf{x}_0) = \Normal\big(\sqrt{\bar\alpha_t}\,\mathbf{x}_0,\ (1 - \bar\alpha_t)I\big),\quad\text{that is}\quad \mathbf{x}_t = \sqrt{\bar\alpha_t}\,\mathbf{x}_0 + \sqrt{1 - \bar\alpha_t}\,\boldsymbol\varepsilon,\ \ \boldsymbol\varepsilon\sim\Normal(\mathbf{0}, I).
$$ {#eq-closed-form}
:::

::: proof
By induction on $t$. For $t = 1$ it is the definition, since $\bar\alpha_1 = \alpha_1$ and $1 - \alpha_1 = \beta_1$. Suppose $\mathbf{x}_{t-1} = \sqrt{\bar\alpha_{t-1}}\,\mathbf{x}_0 + \sqrt{1 - \bar\alpha_{t-1}}\,\boldsymbol\varepsilon'$. One step gives $\mathbf{x}_t = \sqrt{\alpha_t}\,\mathbf{x}_{t-1} + \sqrt{\beta_t}\,\boldsymbol\varepsilon''$ with $\boldsymbol\varepsilon''$ independent of $\boldsymbol\varepsilon'$, so

$$
\mathbf{x}_t = \sqrt{\alpha_t\bar\alpha_{t-1}}\,\mathbf{x}_0 + \Big(\sqrt{\alpha_t(1 - \bar\alpha_{t-1})}\,\boldsymbol\varepsilon' + \sqrt{\beta_t}\,\boldsymbol\varepsilon''\Big).
$$

The bracket is a sum of independent zero-mean Gaussians, hence Gaussian with covariance $\big(\alpha_t(1 - \bar\alpha_{t-1}) + 1 - \alpha_t\big)I = (1 - \alpha_t\bar\alpha_{t-1})I = (1 - \bar\alpha_t)I$, and $\sqrt{\alpha_t\bar\alpha_{t-1}} = \sqrt{\bar\alpha_t}$.
:::

As $\bar\alpha_t\to0$ the data are forgotten and $\mathbf{x}_T$ is close to $\Normal(\mathbf{0}, I)$. The **signal-to-noise ratio** $\mathrm{SNR}(t) = \bar\alpha_t/(1 - \bar\alpha_t)$ falls monotonically from very large to nearly zero.

::: example The linear schedule {#ex-schedule}
For Ho et al.'s schedule, $\bar\alpha_{100} = 0.897$, $\bar\alpha_{250} = 0.524$, $\bar\alpha_{500} = 0.0786$ and $\bar\alpha_{1000} = 4.04\times10^{-5}$ (computed numerically). A pixel value $x_0 = 0.8$ is noised with $\varepsilon = -1$. Find $x_{500}$ and the SNR at $t = 500$.
::: solution
By [[#eq-closed-form]], $x_{500} = \sqrt{0.0786}\cdot0.8 + \sqrt{0.9214}\cdot(-1) = 0.280\cdot0.8 - 0.960 = -0.736$. The SNR is $0.0786/0.9214 = 0.085$: halfway through the chain the signal's variance is already less than a tenth of the noise's. Nichol and Dhariwal (2021) argued that the linear schedule destroys information too quickly and proposed a **cosine schedule**, $\bar\alpha_t = \cos^2\!\big(\frac{t/T + s}{1 + s}\cdot\frac\pi2\big)/\cos^2\!\big(\frac{s}{1 + s}\cdot\frac\pi2\big)$ with $s = 0.008$, which gives $\bar\alpha_{500} = 0.49$.
:::
:::

::: widget plot
f: exp(-(0.0001*x + 0.0199*x^2/2000)); cos(((x/1000 + 0.008)/1.008)*pi/2)^2/cos((0.008/1.008)*pi/2)^2
x: 0, 1000
y: 0, 1
labels: linear schedule; cosine schedule
caption: The signal coefficient $\bar\alpha_t$ against the step $t$ for $T = 1000$: Ho et al.'s linear schedule ($\beta$ from $10^{-4}$ to $0.02$; plotted with the accurate approximation $\bar\alpha_t\approx e^{-\sum_s\beta_s}$) and the cosine schedule of Nichol and Dhariwal. The linear schedule leaves almost no signal for the last third of the chain, so many steps are spent on nearly pure noise; the cosine schedule spreads the destruction more evenly.
:::

::: widget plot
f: 0.3*exp(-(x + 2*sqrt(a))^2/(2*(0.09*a + 1 - a)))/sqrt(2*pi*(0.09*a + 1 - a)) + 0.7*exp(-(x - 1.5*sqrt(a))^2/(2*(0.25*a + 1 - a)))/sqrt(2*pi*(0.25*a + 1 - a))
x: -4, 4
y: 0, 1
sliders: a=1:0.001:1:0.001
labels: $q(x_t)$ for signal level $\bar\alpha_t = a$
caption: The marginal density of $x_t$ when the data are the mixture $0.3\,\Normal(-2, 0.3^2) + 0.7\,\Normal(1.5, 0.5^2)$ used in the listing below. By [[#prop-closed-form]] each component becomes $\Normal(\sqrt a\,\mu_k, a\sigma_k^2 + 1 - a)$. Lower $a$ from $1$ towards $0$: the narrow mode spreads first, the two modes merge, and the density approaches $\Normal(0, 1)$. Generation runs this film backwards.
:::

### The reverse process and its objective {#sec-reverse}

To generate, we would like to sample $\mathbf{x}_T\sim\Normal(\mathbf{0}, I)$ and then $\mathbf{x}_{t-1}\sim q(\mathbf{x}_{t-1}\mid\mathbf{x}_t)$ for $t = T, \dots, 1$. That reverse distribution is unknown, but when $\beta_t$ is small it is close to Gaussian, and conditioned on $\mathbf{x}_0$ it is exactly Gaussian:

$$
q(\mathbf{x}_{t-1}\mid\mathbf{x}_t, \mathbf{x}_0) = \Normal\big(\tilde{\boldsymbol\mu}_t(\mathbf{x}_t, \mathbf{x}_0),\ \tilde\beta_tI\big),\quad \tilde{\boldsymbol\mu}_t = \frac{\sqrt{\bar\alpha_{t-1}}\,\beta_t}{1 - \bar\alpha_t}\mathbf{x}_0 + \frac{\sqrt{\alpha_t}(1 - \bar\alpha_{t-1})}{1 - \bar\alpha_t}\mathbf{x}_t,\quad \tilde\beta_t = \frac{1 - \bar\alpha_{t-1}}{1 - \bar\alpha_t}\beta_t
$$ {#eq-posterior}

(derived in an exercise by completing the square). Diffusion models therefore learn $p_\theta(\mathbf{x}_{t-1}\mid\mathbf{x}_t) = \Normal(\boldsymbol\mu_\theta(\mathbf{x}_t, t), \sigma_t^2I)$ with fixed variances $\sigma_t^2$ (Ho et al. used $\beta_t$ or $\tilde\beta_t$). Substituting $\mathbf{x}_0 = (\mathbf{x}_t - \sqrt{1 - \bar\alpha_t}\,\boldsymbol\varepsilon)/\sqrt{\bar\alpha_t}$ from [[#eq-closed-form]] into [[#eq-posterior]] gives

$$
\tilde{\boldsymbol\mu}_t = \frac{1}{\sqrt{\alpha_t}}\Big(\mathbf{x}_t - \frac{\beta_t}{\sqrt{1 - \bar\alpha_t}}\,\boldsymbol\varepsilon\Big),
$$ {#eq-mu-eps}

which suggests parameterising the mean through a network $\boldsymbol\varepsilon_\theta(\mathbf{x}_t, t)$ that predicts the noise.

::: theorem The diffusion ELBO is a weighted noise-prediction loss {#thm-ddpm-loss}
Treat $\mathbf{x}_{1:T}$ as latent variables with encoder $q(\mathbf{x}_{1:T}\mid\mathbf{x}_0)$ and decoder $p(\mathbf{x}_T)\prod_tp_\theta(\mathbf{x}_{t-1}\mid\mathbf{x}_t)$. With $\boldsymbol\mu_\theta$ written as [[#eq-mu-eps]] with $\boldsymbol\varepsilon_\theta(\mathbf{x}_t, t)$ in place of $\boldsymbol\varepsilon$, the negative ELBO equals, up to terms that do not depend on $\theta$,

$$
\sum_{t\ge2}\ \frac{\beta_t^2}{2\sigma_t^2\alpha_t(1 - \bar\alpha_t)}\ \E_{\mathbf{x}_0, \boldsymbol\varepsilon}\Big[\big\lVert\boldsymbol\varepsilon - \boldsymbol\varepsilon_\theta\big(\sqrt{\bar\alpha_t}\,\mathbf{x}_0 + \sqrt{1 - \bar\alpha_t}\,\boldsymbol\varepsilon,\ t\big)\big\rVert^2\Big]\ +\ (\text{a term for } t = 1).
$$
:::

::: proof
Applying [[#thm-elbo]] with latents $\mathbf{x}_{1:T}$ and rearranging the log-ratio with Bayes' rule for the Markov chain, $q(\mathbf{x}_t\mid\mathbf{x}_{t-1}) = q(\mathbf{x}_{t-1}\mid\mathbf{x}_t, \mathbf{x}_0)\,q(\mathbf{x}_t\mid\mathbf{x}_0)/q(\mathbf{x}_{t-1}\mid\mathbf{x}_0)$, the negative ELBO splits into $\mathrm{KL}(q(\mathbf{x}_T\mid\mathbf{x}_0)\|p(\mathbf{x}_T))$, which has no parameters, the reconstruction term $-\E\log p_\theta(\mathbf{x}_0\mid\mathbf{x}_1)$, and for $t\ge2$ the expectations of $\mathrm{KL}\big(q(\mathbf{x}_{t-1}\mid\mathbf{x}_t, \mathbf{x}_0)\,\|\,p_\theta(\mathbf{x}_{t-1}\mid\mathbf{x}_t)\big)$ (Ho et al., 2020, appendix A). Both distributions in each KL are Gaussian, the first with covariance $\tilde\beta_tI$ and the second with $\sigma_t^2I$; up to a constant the KL is $\lVert\tilde{\boldsymbol\mu}_t - \boldsymbol\mu_\theta\rVert^2/(2\sigma_t^2)$. By [[#eq-mu-eps]] and its counterpart for $\boldsymbol\mu_\theta$, $\tilde{\boldsymbol\mu}_t - \boldsymbol\mu_\theta = -\frac{\beta_t}{\sqrt{\alpha_t}\sqrt{1 - \bar\alpha_t}}(\boldsymbol\varepsilon - \boldsymbol\varepsilon_\theta)$, and squaring gives the stated weight. Finally $\mathbf{x}_t$ is distributed as $\sqrt{\bar\alpha_t}\mathbf{x}_0 + \sqrt{1 - \bar\alpha_t}\boldsymbol\varepsilon$ by [[#prop-closed-form]].
:::

Ho et al. found that dropping the weights gave better samples:

$$
\mathcal{L}_{\text{simple}}(\theta) = \E_{t\sim\mathcal{U}\{1, \dots, T\},\ \mathbf{x}_0,\ \boldsymbol\varepsilon}\Big[\big\lVert\boldsymbol\varepsilon - \boldsymbol\varepsilon_\theta\big(\sqrt{\bar\alpha_t}\,\mathbf{x}_0 + \sqrt{1 - \bar\alpha_t}\,\boldsymbol\varepsilon,\ t\big)\big\rVert^2\Big].
$$ {#eq-simple}

Training is therefore regression: pick an image, a step and a noise sample, noise the image in one shot with [[#eq-closed-form]], and ask the network to say which noise was added. Because the minimiser of a squared error is a conditional mean, the ideal network outputs $\E[\boldsymbol\varepsilon\mid\mathbf{x}_t]$; by Tweedie's formula this equals $-\sqrt{1 - \bar\alpha_t}\,\nabla_{\mathbf{x}_t}\log q(\mathbf{x}_t)$, so a noise predictor is also an estimate of the **score** of the noised data distribution — the link to the score-based models of Song and Ermon (2019) and the stochastic-differential-equation view of Song et al. (2021).

::: algorithm DDPM training and sampling {#alg-ddpm}
**Training.** Repeat: draw $\mathbf{x}_0$ from the data, $t$ uniformly from $\{1, \dots, T\}$ and $\boldsymbol\varepsilon\sim\Normal(\mathbf{0}, I)$; take a gradient step on $\lVert\boldsymbol\varepsilon - \boldsymbol\varepsilon_\theta(\sqrt{\bar\alpha_t}\mathbf{x}_0 + \sqrt{1 - \bar\alpha_t}\boldsymbol\varepsilon, t)\rVert^2$.

**Sampling.** Draw $\mathbf{x}_T\sim\Normal(\mathbf{0}, I)$. For $t = T, \dots, 1$: set $\mathbf{x}_{t-1} = \frac{1}{\sqrt{\alpha_t}}\big(\mathbf{x}_t - \frac{\beta_t}{\sqrt{1 - \bar\alpha_t}}\boldsymbol\varepsilon_\theta(\mathbf{x}_t, t)\big) + \sigma_t\mathbf{z}$ with $\mathbf{z}\sim\Normal(\mathbf{0}, I)$ (and $\mathbf{z} = \mathbf{0}$ at $t = 1$). Return $\mathbf{x}_0$.
:::

**DDIM.** Sampling with DDPM needs one network evaluation per step, $1000$ in Ho et al. Song, Meng and Ermon (2021) observed that the objective [[#eq-simple]] depends only on the marginals $q(\mathbf{x}_t\mid\mathbf{x}_0)$, and that a family of non-Markovian processes shares those marginals — so the same trained network can be used with a different sampler. The deterministic member of the family, **DDIM**, predicts the clean sample and moves to an earlier step $s < t$ along the same noise direction:

$$
\hat{\mathbf{x}}_0 = \frac{\mathbf{x}_t - \sqrt{1 - \bar\alpha_t}\,\boldsymbol\varepsilon_\theta(\mathbf{x}_t, t)}{\sqrt{\bar\alpha_t}},\qquad \mathbf{x}_s = \sqrt{\bar\alpha_s}\,\hat{\mathbf{x}}_0 + \sqrt{1 - \bar\alpha_s}\,\boldsymbol\varepsilon_\theta(\mathbf{x}_t, t).
$$ {#eq-ddim}

DDIM can skip steps — $50$ instead of $1000$ is common — and maps each initial noise to a fixed image, which makes generation reproducible and allows interpolation in noise space. It is a discretisation of an ordinary differential equation (the "probability-flow ODE"), and higher-order ODE solvers reduce the step count further.

### A diffusion model in one dimension {#sec-toy}

The listing trains a noise predictor — a one-hidden-layer network with inputs $(x_t, \sqrt{\bar\alpha_t}, \sqrt{1 - \bar\alpha_t})$ and hand-written backpropagation — on samples from $0.3\,\Normal(-2, 0.3^2) + 0.7\,\Normal(1.5, 0.5^2)$, with $T = 100$ steps, and then samples with DDPM and DDIM. It takes about a minute.

```python
import math, random
random.seed(6)

# data: a mixture of two Gaussians
def sample_data():
    return random.gauss(-2.0, 0.3) if random.random() < 0.3 else random.gauss(1.5, 0.5)

# noise schedule: T = 100 steps, betas linear from 1e-4 to 0.2 (short chain, so larger betas)
T = 100
betas = [1e-4 + (0.2 - 1e-4) * t / (T - 1) for t in range(T)]
abar, p = [], 1.0
for b in betas:
    p *= 1 - b; abar.append(p)

# epsilon-predictor: MLP with inputs (x_t, t features), one hidden layer of H tanh units
H = 64
feats = lambda x, t: [x, math.sqrt(abar[t]), math.sqrt(1 - abar[t]), 1.0]
W1 = [[random.gauss(0, 0.5) for _ in range(4)] for _ in range(H)]
W2 = [random.gauss(0, 0.1) for _ in range(H)]
params = [W1[i][j] for i in range(H) for j in range(4)] + W2[:]
m = [0.0] * len(params); v = [0.0] * len(params)

def forward(x, t):
    f = feats(x, t)
    h = [math.tanh(sum(W1[i][j] * f[j] for j in range(4))) for i in range(H)]
    return sum(W2[i] * h[i] for i in range(H)), f, h

def adam_step(grad, step, lr=3e-3):
    global params
    for k in range(len(params)):
        m[k] = 0.9 * m[k] + 0.1 * grad[k]; v[k] = 0.999 * v[k] + 0.001 * grad[k] ** 2
        params[k] -= lr * (m[k] / (1 - 0.9 ** step)) / (math.sqrt(v[k] / (1 - 0.999 ** step)) + 1e-8)
    for i in range(H):
        for j in range(4): W1[i][j] = params[i * 4 + j]
        W2[i] = params[H * 4 + i]

batch, steps, run = 32, 8000, 0.0
for step in range(1, steps + 1):          # L_simple: E || eps - eps_theta(x_t, t) ||^2
    grad = [0.0] * len(params); loss = 0.0
    for _ in range(batch):
        x0, t, eps = sample_data(), random.randrange(T), random.gauss(0, 1)
        xt = math.sqrt(abar[t]) * x0 + math.sqrt(1 - abar[t]) * eps
        out, f, h = forward(xt, t)
        d = 2 * (out - eps) / batch; loss += (out - eps) ** 2 / batch
        for i in range(H):
            grad[H * 4 + i] += d * h[i]
            g = d * W2[i] * (1 - h[i] ** 2)
            for j in range(4): grad[i * 4 + j] += g * f[j]
    adam_step(grad, step, lr=1e-2 * (1 - step / steps) + 1e-4); run += loss / 2000
    if step % 2000 == 0: print(f"steps {step - 1999}-{step}: mean loss {run:.3f}"); run = 0.0

def ddpm_sample():                         # ancestral sampling, sigma_t^2 = beta_t
    x = random.gauss(0, 1)
    for t in reversed(range(T)):
        eps = forward(x, t)[0]
        x = (x - betas[t] / math.sqrt(1 - abar[t]) * eps) / math.sqrt(1 - betas[t])
        if t > 0: x += math.sqrt(betas[t]) * random.gauss(0, 1)
    return x

def ddim_sample(n_steps):                  # deterministic DDIM on a subsequence of steps
    ts = [round(i * (T - 1) / (n_steps - 1)) for i in range(n_steps)][::-1]
    x = random.gauss(0, 1)
    for k, t in enumerate(ts):
        eps = forward(x, t)[0]
        x0 = (x - math.sqrt(1 - abar[t]) * eps) / math.sqrt(abar[t])
        x0 = max(-4.0, min(4.0, x0))         # clip the predicted clean sample to the data range
        eps = (x - math.sqrt(abar[t]) * x0) / math.sqrt(1 - abar[t])
        a_prev = abar[ts[k + 1]] if k + 1 < len(ts) else 1.0
        x = math.sqrt(a_prev) * x0 + math.sqrt(1 - a_prev) * eps
    return x

def describe(name, xs):
    left = [x for x in xs if x < 0]; right = [x for x in xs if x >= 0]
    st = lambda s: (sum(s) / len(s), math.sqrt(sum((x - sum(s) / len(s)) ** 2 for x in s) / len(s)))
    (ml, sl), (mr, sr) = st(left), st(right)
    print(f"{name:12s} left mode {len(left) / len(xs):.3f}: mean {ml:+.2f} sd {sl:.2f} | "
          f"right: mean {mr:+.2f} sd {sr:.2f}")

print(f"abar at t = 1, 50, 100: {abar[0]:.4f} {abar[49]:.4f} {abar[-1]:.2e}")
describe("data", [sample_data() for _ in range(2000)])
describe("DDPM 100", [ddpm_sample() for _ in range(2000)])
describe("DDIM 10", [ddim_sample(10) for _ in range(2000)])
describe("DDIM 25", [ddim_sample(25) for _ in range(2000)])
```

```text
steps 1-2000: mean loss 0.305
steps 2001-4000: mean loss 0.284
steps 4001-6000: mean loss 0.281
steps 6001-8000: mean loss 0.277
abar at t = 1, 50, 100: 0.9999 0.0769 2.14e-05
data         left mode 0.302: mean -2.01 sd 0.31 | right: mean +1.51 sd 0.50
DDPM 100     left mode 0.285: mean -1.97 sd 0.38 | right: mean +1.51 sd 0.50
DDIM 10      left mode 0.302: mean -1.53 sd 0.69 | right: mean +1.42 sd 0.52
DDIM 25      left mode 0.301: mean -1.78 sd 0.54 | right: mean +1.50 sd 0.50
```

::: example Reading the toy model {#ex-toy}
Interpret the listing's results. For reference, the exact noise predictor $\E[\varepsilon\mid x_t]$ of this mixture can be computed in closed form; its loss is $0.267$, and DDIM with it gives left-mode standard deviations of $0.42$ ($10$ steps) and $0.35$ ($25$ steps).
::: solution
The training loss falls from about $0.31$ to $0.277$, against the best achievable $0.267$ (the loss cannot reach zero: at large $t$ the noise is unpredictable). Pure noise, $\bar\alpha_{100} = 2\times10^{-5}$, is turned by $100$ DDPM steps into a two-mode distribution with nearly the right weights ($0.285$ against $0.30$), means and the broad mode's spread; only the narrow mode comes out too wide ($0.38$ against $0.30$), where the small network's errors matter most. DDIM with $10$ steps gets the weights right but smears the narrow mode badly; with $25$ steps it improves. The reference figures show that most of DDIM's error at $10$ steps is **discretisation** — large jumps along a curved path — rather than network error, which is why few-step samplers use higher-order solvers or distillation.
:::
:::

## Guidance {#sec-guidance}

A text-to-image model learns $\boldsymbol\varepsilon_\theta(\mathbf{x}_t, t, c)$ for a caption embedding $c$. Sampling from the conditional model as trained gives diverse images that often follow the caption only loosely. **Guidance** trades diversity for fidelity. Dhariwal and Nichol (2021) used the gradient of a separately trained classifier on noisy images; Ho and Salimans (2022) found that the diffusion model can guide itself.

::: definition Classifier-free guidance {#def-cfg}
Train one network both conditionally and unconditionally by replacing $c$ with a null token $\varnothing$ in a fraction of training examples (typically $10$–$20\%$). At sampling time, with **guidance weight** $w\ge0$, use

$$
\tilde{\boldsymbol\varepsilon}_\theta(\mathbf{x}_t, t, c) = (1 + w)\,\boldsymbol\varepsilon_\theta(\mathbf{x}_t, t, c) - w\,\boldsymbol\varepsilon_\theta(\mathbf{x}_t, t, \varnothing)
$$ {#eq-cfg}

in place of $\boldsymbol\varepsilon_\theta$. (Many libraries write $\boldsymbol\varepsilon_\varnothing + s(\boldsymbol\varepsilon_c - \boldsymbol\varepsilon_\varnothing)$ with $s = 1 + w$.)
:::

::: proposition What guidance samples {#prop-cfg}
If $\boldsymbol\varepsilon_\theta(\mathbf{x}_t, t, c) = -\sqrt{1 - \bar\alpha_t}\,\nabla\log p_t(\mathbf{x}_t\mid c)$ and $\boldsymbol\varepsilon_\theta(\mathbf{x}_t, t, \varnothing) = -\sqrt{1 - \bar\alpha_t}\,\nabla\log p_t(\mathbf{x}_t)$, then [[#eq-cfg]] is the noise prediction corresponding to the score of $p_t(\mathbf{x}_t\mid c)\,p_t(c\mid\mathbf{x}_t)^{w}$: guidance sharpens the conditional distribution towards images that an implicit classifier finds most typical of $c$.
:::

::: proof
By Bayes' theorem $\log p_t(c\mid\mathbf{x}_t) = \log p_t(\mathbf{x}_t\mid c) - \log p_t(\mathbf{x}_t) + \log p(c)$, so $\nabla\log\big[p_t(\mathbf{x}_t\mid c)p_t(c\mid\mathbf{x}_t)^w\big] = (1 + w)\nabla\log p_t(\mathbf{x}_t\mid c) - w\nabla\log p_t(\mathbf{x}_t)$. Multiplying by $-\sqrt{1 - \bar\alpha_t}$ turns each score into the corresponding noise prediction, which is [[#eq-cfg]].
:::

The proposition describes the ideal; with learned networks and $w$ of several units, guided sampling does not exactly sample the tilted distribution, but the intuition holds. Larger $w$ gives images that match the prompt better and look more polished but less varied, and very large $w$ oversaturates colours. Guidance doubles the cost per step (two network evaluations, usually batched together). The same trick is used in autoregressive image and audio models by combining conditional and unconditional logits.

::: example Guidance by hand {#ex-cfg}
At some pixel the conditional prediction is $0.5$ and the unconditional $0.2$. Compute the guided prediction for $w = 0$, $1$ and $3$.
::: solution
$\tilde\varepsilon = (1 + w)\cdot0.5 - w\cdot0.2 = 0.5 + 0.3w$: $0.5$, $0.8$ and $1.4$. Guidance extrapolates beyond the conditional prediction, away from the unconditional one, by $w$ times their difference — the direction in which the caption changes the prediction.
:::
:::

## Latent diffusion and diffusion Transformers {#sec-latent}

Pixel-space diffusion is expensive: every one of the many sampling steps runs a large network at full resolution, and most of its capacity goes into imperceptible high-frequency detail. Rombach et al. (2022) split the work. An **autoencoder**, trained once with a reconstruction loss, a perceptual loss, a patch-based adversarial loss and a light KL or VQ regulariser, compresses images by a factor $f$ in each spatial dimension; the diffusion model then works in the latent space.

::: definition Latent diffusion {#def-ldm}
Let $\mathcal{E}$ and $\mathcal{D}$ be an encoder and decoder with $\mathcal{D}(\mathcal{E}(\mathbf{x}))\approx\mathbf{x}$, mapping $H\times W\times3$ images to $\frac Hf\times\frac Wf\times c$ latents. A **latent diffusion model** trains $\boldsymbol\varepsilon_\theta(\mathbf{z}_t, t, c)$ with [[#eq-simple]] on $\mathbf{z}_0 = \mathcal{E}(\mathbf{x})$, samples $\mathbf{z}_0$ by reverse diffusion, and returns $\mathcal{D}(\mathbf{z}_0)$. Text conditioning enters through **cross-attention** layers in which the denoiser's spatial features attend to the token embeddings of a frozen text encoder.
:::

Stable Diffusion, the openly released latent diffusion model of 2022, used $f = 8$ and $c = 4$ — a $512\times512$ image becomes a $64\times64\times4$ latent — a U-Net denoiser of about $860$ million parameters and the frozen text encoder of CLIP ViT-L/14 ([[multimodal/contrastive-learning]]). Imagen (Saharia et al., 2022) instead diffused in pixel space at low resolution with super-resolution stages, conditioned on a frozen T5-XXL text encoder, and found that scaling the text encoder improved image–text alignment more than scaling the denoiser.

::: example How much latent diffusion saves {#ex-latent}
Compare the number of values the denoiser processes for a $512\times512$ RGB image and for its Stable Diffusion latent. How many tokens does a Transformer denoiser see with patch size $2$ on the latent?
::: solution
Pixels: $512\cdot512\cdot3 = 786{,}432$ values; latent: $64\cdot64\cdot4 = 16{,}384$, a factor of $48$ fewer. With $2\times2$ patches the latent becomes $32\cdot32 = 1024$ tokens of dimension $2\cdot2\cdot4 = 16$ before embedding — a sequence length comparable to a ViT on a $512$-pixel image with $16$-pixel patches ([[multimodal/vision-transformers#def-patch-embedding]]).
:::
:::

### Diffusion Transformers {#sec-dit}

The denoisers of early diffusion models were convolutional U-Nets with attention layers. Peebles and Xie (2023) replaced them with a **Diffusion Transformer** (DiT): patchify the noisy latent, add position embeddings, apply standard Transformer blocks, and un-patchify the output into a noise prediction. The time step and class label condition every block through **adaptive LayerNorm** — the LayerNorm's scale and shift (and a gate on each residual branch) are regressed from the conditioning embedding, with the gates initialised at zero ("adaLN-Zero"), so that each block starts as the identity, much like Flamingo's gates ([[multimodal/vision-language-models#prop-gate-init]]). On class-conditional ImageNet at $256\times256$ (latents of $32\times32\times4$), image quality improved steadily with the Transformer's compute per forward pass, and the largest model, DiT-XL/2, reached an FID of $2.27$ with classifier-free guidance. Text-to-image Transformers followed; Stable Diffusion 3 (Esser et al., 2024) concatenated text and image tokens in the same attention operation, with separate weights for each modality ("MM-DiT"), and trained with rectified flow.

### Flow matching {#sec-flow}

Diffusion models fix a noising process and learn to reverse it stochastically or along a curved ODE path. **Flow matching** (Lipman et al., 2023) and **rectified flow** (Liu et al., 2023) learn an ODE directly, along straight paths from noise to data.

::: definition Conditional flow matching with straight paths {#def-flow}
For a data point $\mathbf{x}_1$ and noise $\mathbf{x}_0\sim\Normal(\mathbf{0}, I)$, let $\mathbf{x}_t = (1 - t)\mathbf{x}_0 + t\mathbf{x}_1$ for $t\in[0, 1]$, whose velocity is $\mathbf{x}_1 - \mathbf{x}_0$. A network $\mathbf{v}_\theta(\mathbf{x}, t)$ is trained by

$$
\mathcal{L}_{\text{FM}}(\theta) = \E_{t\sim\mathcal{U}[0, 1],\ \mathbf{x}_0,\ \mathbf{x}_1}\big\lVert\mathbf{v}_\theta(\mathbf{x}_t, t) - (\mathbf{x}_1 - \mathbf{x}_0)\big\rVert^2,
$$ {#eq-fm}

and samples are generated by solving $d\mathbf{x}/dt = \mathbf{v}_\theta(\mathbf{x}, t)$ from $t = 0$ (noise) to $t = 1$ with a few Euler or higher-order steps. (Conventions differ on which end is noise.)
:::

::: proposition Regressing on conditional velocities learns the marginal field {#prop-fm}
Let $\mathbf{u}(\mathbf{x}, t) = \E[\mathbf{x}_1 - \mathbf{x}_0\mid\mathbf{x}_t = \mathbf{x}]$. Then $\mathcal{L}_{\text{FM}}(\theta) = \E\lVert\mathbf{v}_\theta(\mathbf{x}_t, t) - \mathbf{u}(\mathbf{x}_t, t)\rVert^2 + C$ with $C$ independent of $\theta$, so the minimiser is $\mathbf{v}_\theta = \mathbf{u}$. The ODE with velocity field $\mathbf{u}$ transports the noise distribution to the data distribution, with the same marginals as $\mathbf{x}_t$ at every $t$ (Lipman et al., 2023; Liu et al., 2023).
:::

::: proof
Write $\mathbf{y} = \mathbf{x}_1 - \mathbf{x}_0$. Expanding $\lVert\mathbf{v} - \mathbf{y}\rVert^2 = \lVert\mathbf{v} - \mathbf{u}\rVert^2 + 2(\mathbf{v} - \mathbf{u})^\top(\mathbf{u} - \mathbf{y}) + \lVert\mathbf{u} - \mathbf{y}\rVert^2$ and conditioning on $\mathbf{x}_t$, the cross term has expectation zero because $\E[\mathbf{u} - \mathbf{y}\mid\mathbf{x}_t] = \mathbf{0}$ and $\mathbf{v} - \mathbf{u}$ is a function of $\mathbf{x}_t$. The last term does not involve $\theta$. The transport property is the continuity-equation argument of the cited papers, which we state without proof.
:::

The same argument shows why $\mathcal{L}_{\text{simple}}$ learns $\E[\boldsymbol\varepsilon\mid\mathbf{x}_t]$. Straight conditional paths do not make the marginal ODE straight — paths from different noise samples to different images cross, and the averaged field bends — but they are straighter than diffusion's, so fewer integration steps are needed; Liu et al.'s "reflow" procedure straightens them further by retraining on (noise, generated image) pairs.

::: warning Diffusion models do not "store images and add noise" {#warn-memorise}
A popular description says that a diffusion model memorises training images and recovers them from noise. The model is a function from a noisy input and a step to a noise estimate, trained on billions of noised examples; its sampler composes that function many times, and different noise gives different images that are, in general, not in the training set. But the opposite claim — that it *never* reproduces training data — is also false: Carlini et al. (2023) extracted near-copies of a small number of heavily duplicated training images from Stable Diffusion and Imagen. Memorisation is rare, concentrated on duplicated data, and measurable ([[llm-society/privacy-memorisation]], [[llm-society/copyright-provenance]]).
:::

## Autoregressive image generation {#sec-ar}

The other route treats images like text. A **VQ-VAE** (van den Oord et al., 2017) is an autoencoder with a vector quantiser in its bottleneck ([[multimodal/audio-language-models#def-vq]]): the encoder maps an image to an $h\times w$ grid of vectors, each replaced by the index of its nearest codebook entry, and the decoder reconstructs the image from the quantised grid. Read in raster order, the grid is a sequence of $hw$ discrete tokens, and a Transformer can model it autoregressively, conditioned on text tokens. VQGAN (Esser et al., 2021) added perceptual and adversarial losses to the tokeniser, making $16\times$ downsampling feasible with sharp reconstructions.

- **DALL·E** (Ramesh et al., 2021) encoded $256\times256$ images into $32\times32 = 1024$ tokens from a vocabulary of $8192$ with a discrete VAE, and trained a $12$-billion-parameter decoder-only Transformer on sequences of up to $256$ text tokens followed by the image tokens.
- **Parti** (Yu et al., 2022) used a ViT-based VQGAN tokeniser ($1024$ tokens per $256\times256$ image, $8192$ codes) and an encoder–decoder Transformer of up to $20$ billion parameters, with text in the encoder and image tokens generated by the decoder; quality, especially of rendered text and complex prompts, improved markedly with scale.
- **MaskGIT** (Chang et al., 2022) and Muse (2023) generate tokens in parallel: starting from a fully masked grid, predict all tokens, keep the most confident ones and repeat for a few iterations — BERT-style masked modelling ([[transformers/architecture-families#def-mlm]]) used for generation.

Autoregressive generation of $1024$ tokens needs $1024$ sequential steps (with a KV cache, [[inference/kv-cache]]), against a few dozen denoiser evaluations for diffusion; but it uses exactly the machinery of language models, so it combines naturally with text in one model — the subject of [[multimodal/native-multimodal]]. Quantisation limits fidelity (the tokeniser's reconstruction bounds quality), and raster order is arbitrary for images, which motivated orderings such as coarse-to-fine "next-scale" prediction (VAR; Tian et al., 2024).

::: quiz
A text-to-image model generates $1024$ image tokens autoregressively, while a latent diffusion model uses $30$ sampling steps with classifier-free guidance. Which statement is correct?
- [ ] The autoregressive model needs fewer sequential network evaluations.
- [x] The diffusion model needs $30$ sequential steps, each evaluating the denoiser twice (conditional and unconditional), usually batched together; the autoregressive model needs $1024$ sequential steps.
- [ ] Classifier-free guidance cannot be used with autoregressive models.
- [ ] The diffusion model's output is a sequence of discrete tokens.
::: solution
Diffusion refines all latent positions at once at every step; autoregressive models emit one token per step. Guidance doubles the work per step but not the number of sequential steps, and it applies to autoregressive models too, by mixing conditional and unconditional logits.
:::
:::

## Evaluating image generators {#sec-eval}

::: definition Fréchet inception distance {#def-fid}
Embed a set of real and a set of generated images with a fixed Inception-v3 network (its $2048$-dimensional pooled features), fit a Gaussian to each set with means $\boldsymbol\mu_r$, $\boldsymbol\mu_g$ and covariances $\Sigma_r$, $\Sigma_g$, and compute the **FID** (Heusel et al., 2017):

$$
\mathrm{FID} = \lVert\boldsymbol\mu_r - \boldsymbol\mu_g\rVert^2 + \tr\big(\Sigma_r + \Sigma_g - 2(\Sigma_r\Sigma_g)^{1/2}\big).
$$

Lower is better; it is the squared Wasserstein-2 distance between the two fitted Gaussians.
:::

FID measures realism and diversity together but depends on sample size, image resolution and preprocessing, uses features from an ImageNet classifier that may not reflect human judgement for other content, and says nothing about whether an image matches its prompt. Text-to-image models are therefore also scored by CLIP similarity between image and prompt ([[multimodal/contrastive-learning#sec-zero-shot]]), by question-answering on generated images (does the image contain "three red cubes"?), and above all by human preference studies, whose results depend on the prompts and raters chosen. As of 2026, no single automatic metric is considered adequate.

::: application Synthetic images and provenance
Photorealistic generation makes fabricated evidence cheap: synthetic images of real people, events that did not happen, non-consensual imagery. Developers filter training data and prompts, refuse some requests, add invisible watermarks to outputs and attach signed provenance metadata (C2PA content credentials); detectors try to recognise generated images. Each measure helps and none is robust on its own — watermarks can be degraded, metadata stripped and detectors evaded. These issues are treated in [[llm-society/copyright-provenance#sec-c2pa]] and [[llm-society/misinformation]], and revisited for multimodal models in [[multimodal/native-multimodal]].
:::

::: history
Deep generative models of images developed along several lines: VAEs (Kingma and Welling; Rezende et al., 2014), GANs (Goodfellow et al., 2014) culminating in BigGAN and StyleGAN (2019), autoregressive pixel models (PixelRNN and PixelCNN, van den Oord et al., 2016) and normalising flows. Sohl-Dickstein et al. (2015) proposed diffusion probabilistic models; Song and Ermon (2019) trained score-based models with annealed Langevin sampling; Ho, Jain and Abbeel (2020) made diffusion competitive with the noise-prediction objective. DDIM (2021), improved schedules (Nichol and Dhariwal, 2021), guided diffusion that beat GANs on ImageNet (Dhariwal and Nichol, 2021) and the SDE framework (Song et al., 2021) followed. Text-to-image generation went from DALL·E (2021, autoregressive) to GLIDE, DALL·E 2, Imagen, Parti and latent diffusion (all 2022), with classifier-free guidance (Ho and Salimans, 2021 workshop, 2022). Diffusion Transformers (Peebles and Xie, 2023), flow matching and rectified flow (2023) and their combination in large text-to-image models (2024) shaped the systems in use as of 2026; video generation extends the same methods to spatio-temporal latents.
:::

::: summary
- The ELBO, $\log p(\mathbf{x})\ge\E_q\log p(\mathbf{x}\mid\mathbf{z}) - \mathrm{KL}(q\|p(\mathbf{z}))$, follows from Bayes' theorem and Gibbs' inequality; VAEs maximise it with the reparameterisation trick. GANs train a generator against a discriminator whose optimum is $p_{\text{data}}/(p_{\text{data}} + p_g)$.
- DDPM's forward process has the closed form $\mathbf{x}_t = \sqrt{\bar\alpha_t}\mathbf{x}_0 + \sqrt{1 - \bar\alpha_t}\boldsymbol\varepsilon$; the ELBO reduces to a weighted noise-prediction loss, and the unweighted $\mathcal{L}_{\text{simple}}$ works best in practice.
- DDPM samples with $T$ stochastic steps; DDIM reuses the same network deterministically with far fewer steps; few-step samplers suffer discretisation error.
- Classifier-free guidance combines conditional and unconditional predictions, $(1 + w)\boldsymbol\varepsilon_c - w\boldsymbol\varepsilon_\varnothing$, sampling (ideally) from $p(\mathbf{x}\mid c)p(c\mid\mathbf{x})^w$.
- Latent diffusion runs diffusion in an autoencoder's latent space ($512^2\times3\to64^2\times4$, $48\times$ fewer values); DiT replaces the U-Net with a Transformer on latent patches; flow matching regresses straight-path velocities and learns the marginal velocity field.
- Autoregressive models generate VQ tokens (DALL·E, Parti) or masked tokens in parallel (MaskGIT) with language-model machinery.
- FID compares Gaussian fits of Inception features; prompt alignment and human preference need separate evaluation.
:::

## Exercises

::: exercise Signal left at the end {level=1 check="4.04e-5"}
For Ho et al.'s linear schedule ($T = 1000$, $\beta_t$ from $10^{-4}$ to $0.02$), compute $\bar\alpha_{1000}$ numerically to three significant figures.
::: solution
$\prod_{t=1}^{1000}(1 - \beta_t) = 4.04\times10^{-5}$ (a short loop computes it; the approximation $e^{-\sum\beta_t} = e^{-10.05} = 4.3\times10^{-5}$ is close). The signal's standard deviation is scaled by $\sqrt{\bar\alpha_{1000}} = 0.0064$: almost nothing of the image remains.
:::
:::

::: exercise Compression of latent diffusion {level=1 check="48"}
By what factor does an $f = 8$, $c = 4$ autoencoder reduce the number of values of an RGB image?
::: solution
$H W\cdot3/\big((H/8)(W/8)\cdot4\big) = 3\cdot64/4 = 48$.
:::
:::

::: exercise DiT tokens {level=1 check="256"}
DiT-XL/2 works on $32\times32\times4$ latents with patch size $2$. How many tokens does it process?
::: solution
$(32/2)^2 = 256$ tokens, each embedding a $2\times2\times4 = 16$-value patch.
:::
:::

::: exercise A KL divergence {level=1 check="0.818"}
Compute $\mathrm{KL}(\Normal(1, 0.5^2)\,\|\,\Normal(0, 1))$ in nats to three decimal places.
::: solution
$\frac12(1 + 0.25 - 1 - \ln0.25) = \frac12(0.25 + 1.3863) = 0.818$.
:::
:::

::: exercise A DDIM step {level=2 check="0.997"}
At a step with $\bar\alpha_t = 0.5$, the current sample is $x_t = 1$ and the network predicts $\hat\varepsilon = 0.6$. Compute $\hat x_0$ and the DDIM update [[#eq-ddim]] to a step with $\bar\alpha_s = 0.8$. Give $x_s$ to three decimal places.
::: solution
$\hat x_0 = (1 - \sqrt{0.5}\cdot0.6)/\sqrt{0.5} = (1 - 0.4243)/0.7071 = 0.8142$. Then $x_s = \sqrt{0.8}\cdot0.8142 + \sqrt{0.2}\cdot0.6 = 0.7283 + 0.2683 = 0.997$. The sample moves towards the predicted clean value while keeping a smaller amount of the same noise.
:::
:::

::: exercise FID in one dimension {level=2 check="2"}
In one dimension FID reduces to $(\mu_r - \mu_g)^2 + \sigma_r^2 + \sigma_g^2 - 2\sigma_r\sigma_g$. Compute it for real features $\Normal(0, 1)$ and generated features $\Normal(1, 4)$.
::: solution
$(0 - 1)^2 + 1 + 4 - 2\cdot1\cdot2 = 1 + 1 = 2$, the sum of the squared mean difference and the squared difference of standard deviations $(\sigma_r - \sigma_g)^2 = 1$.
:::
:::

::: exercise Image tokens for a larger image {level=1 check="4096"}
An image tokeniser downsamples by $16$ in each dimension. How many tokens does a $1024\times1024$ image become?
::: solution
$(1024/16)^2 = 64^2 = 4096$ tokens — four times DALL·E's $1024$, and $4096$ sequential steps for a raster-order autoregressive model.
:::
:::

::: exercise Predicting $\mathbf{x}_0$ or $\boldsymbol\varepsilon$ {level=2}
Show that a network $\hat{\mathbf{x}}_\theta(\mathbf{x}_t, t)$ predicting the clean sample and one predicting the noise are interchangeable, and express the loss $\lVert\boldsymbol\varepsilon - \boldsymbol\varepsilon_\theta\rVert^2$ in terms of $\hat{\mathbf{x}}_\theta$. What does this say about which time steps the $\varepsilon$-loss emphasises?
::: solution
From [[#eq-closed-form]], $\mathbf{x}_t = \sqrt{\bar\alpha_t}\mathbf{x}_0 + \sqrt{1 - \bar\alpha_t}\boldsymbol\varepsilon$, so a noise prediction defines $\hat{\mathbf{x}}_\theta = (\mathbf{x}_t - \sqrt{1 - \bar\alpha_t}\boldsymbol\varepsilon_\theta)/\sqrt{\bar\alpha_t}$ and conversely $\boldsymbol\varepsilon_\theta = (\mathbf{x}_t - \sqrt{\bar\alpha_t}\hat{\mathbf{x}}_\theta)/\sqrt{1 - \bar\alpha_t}$. Then $\boldsymbol\varepsilon - \boldsymbol\varepsilon_\theta = \frac{\sqrt{\bar\alpha_t}}{\sqrt{1 - \bar\alpha_t}}(\hat{\mathbf{x}}_\theta - \mathbf{x}_0)$, so $\lVert\boldsymbol\varepsilon - \boldsymbol\varepsilon_\theta\rVert^2 = \mathrm{SNR}(t)\,\lVert\mathbf{x}_0 - \hat{\mathbf{x}}_\theta\rVert^2$. The $\varepsilon$-loss is an $\mathbf{x}_0$-loss weighted by the signal-to-noise ratio: it weights low-noise steps heavily and high-noise steps lightly. Choices of parameterisation (noise, clean sample, or "velocity" $\sqrt{\bar\alpha_t}\boldsymbol\varepsilon - \sqrt{1 - \bar\alpha_t}\mathbf{x}_0$) and of time-step sampling are therefore choices of loss weighting.
:::
:::

::: exercise The forward posterior {level=3}
Derive [[#eq-posterior]]: show that $q(\mathbf{x}_{t-1}\mid\mathbf{x}_t, \mathbf{x}_0)\propto q(\mathbf{x}_t\mid\mathbf{x}_{t-1})\,q(\mathbf{x}_{t-1}\mid\mathbf{x}_0)$ is Gaussian with the stated mean and variance (one coordinate suffices).
::: solution
By the Markov property and Bayes' theorem, $q(x_{t-1}\mid x_t, x_0)\propto q(x_t\mid x_{t-1})\,q(x_{t-1}\mid x_0)$. As a function of $y = x_{t-1}$, the log of the right side is, up to constants,
$$
-\frac{(x_t - \sqrt{\alpha_t}\,y)^2}{2\beta_t} - \frac{(y - \sqrt{\bar\alpha_{t-1}}\,x_0)^2}{2(1 - \bar\alpha_{t-1})}.
$$
It is quadratic in $y$, so the distribution is Gaussian. The coefficient of $-y^2/2$ is the precision
$$
\frac{\alpha_t}{\beta_t} + \frac{1}{1 - \bar\alpha_{t-1}} = \frac{\alpha_t(1 - \bar\alpha_{t-1}) + \beta_t}{\beta_t(1 - \bar\alpha_{t-1})} = \frac{1 - \bar\alpha_t}{\beta_t(1 - \bar\alpha_{t-1})},
$$
using $\alpha_t + \beta_t = 1$ and $\alpha_t\bar\alpha_{t-1} = \bar\alpha_t$. Its inverse is $\tilde\beta_t = \frac{1 - \bar\alpha_{t-1}}{1 - \bar\alpha_t}\beta_t$. The coefficient of $y$ is $\frac{\sqrt{\alpha_t}}{\beta_t}x_t + \frac{\sqrt{\bar\alpha_{t-1}}}{1 - \bar\alpha_{t-1}}x_0$, and the mean is $\tilde\beta_t$ times it:
$$
\tilde\mu_t = \frac{\sqrt{\alpha_t}(1 - \bar\alpha_{t-1})}{1 - \bar\alpha_t}x_t + \frac{\sqrt{\bar\alpha_{t-1}}\,\beta_t}{1 - \bar\alpha_t}x_0,
$$
which is [[#eq-posterior]].
:::
:::

::: exercise Guidance on Gaussians {level=3}
Let $p(x) = \Normal(0, 1)$ and $p(x\mid c) = \Normal(m, s^2)$ with $s < 1$, and consider the noise-free case ($t = 0$). (a) Show that $p(x\mid c)\,p(c\mid x)^w\propto p(x\mid c)^{1 + w}p(x)^{-w}$ is Gaussian, and find its mean and variance. (b) Evaluate for $m = 1$, $s = 0.5$, $w = 3$, and interpret.
::: solution
(a) $p(c\mid x)\propto p(x\mid c)/p(x)$, so the product is proportional to $p(x\mid c)^{1 + w}p(x)^{-w}$. Its log is $-\frac{(1 + w)(x - m)^2}{2s^2} + \frac{wx^2}{2} + \text{const}$, a quadratic with precision $\lambda = \frac{1 + w}{s^2} - w$, positive because $s < 1$. The coefficient of $x$ is $\frac{(1 + w)m}{s^2}$, so the mean is $\frac{(1 + w)m/s^2}{\lambda}$ and the variance $1/\lambda$.

(b) $\lambda = 4/0.25 - 3 = 13$, variance $1/13 = 0.077$ (standard deviation $0.28$, against $0.5$ without guidance), and mean $(4\cdot1/0.25)/13 = 16/13 = 1.23$. Guidance both narrows the distribution and pushes it *beyond* the conditional mean, away from the unconditional one: samples become more typical of "$c$ as opposed to the rest" — a picture of the reduced diversity and exaggeration seen at high guidance weights.
:::
:::
