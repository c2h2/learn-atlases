Large language models are trained on text written by people: books, news articles, encyclopaedias, forum posts, code, scientific papers. Most of that text is protected by copyright, and most of its authors were never asked. Whether copying it to train a model is lawful, whether its authors should be paid, what happens when a model reproduces a passage, and how anyone can tell where a piece of text or an image came from are among the most contested questions about the technology — in courts, legislatures and public debate.

This chapter sets out those questions with the precision they need. It first locates where copying happens in the life of a model, then presents the law of three jurisdictions with distinct approaches — fair use in the United States, text-and-data-mining exceptions and the AI Act in the European Union, and Article 30-4 of Japan's Copyright Act — and the main lines of litigation, dated where the outcome is known and marked as ongoing where it is not. The arguments on each side are presented in their strongest form. The second half turns to **provenance**: documenting training data, honouring opt-outs, and marking generated content, with a full derivation of the statistical test behind green-list watermarking (Kirchenbauer et al., 2023) and a description of C2PA content credentials.

Nothing here is legal advice. The law is jurisdiction-specific, depends on facts, and is changing quickly; statements are dated "as of 2026" and should be checked against current sources.

## Where copying happens {#sec-copying}

Copyright gives authors exclusive rights over their works — chiefly reproduction, distribution, adaptation and communication to the public — subject to exceptions. A model's life involves several acts that may count as reproduction:

1. **Collection.** Crawling the web or acquiring books makes copies of works on the developer's servers. How the copies were obtained (licensed, purchased, scraped from the open web, downloaded from unauthorised "shadow libraries") can matter legally.
2. **Preparation.** Cleaning, deduplicating and tokenising makes further copies, sometimes kept for years and reused across models ([[pretraining/training-data]]).
3. **Training.** Gradient descent reads the copies and adjusts parameters. The weights are not a database of the works, but a model can memorise some passages ([[llm-society/privacy-memorisation#def-extractable]]); whether weights that can reproduce a work "contain a copy" of it is disputed and courts have reached different conclusions.
4. **Output.** A model may produce text that reproduces or closely paraphrases a protected work, or that imitates an author's style. Reproduction in output is a separate question from training: style as such is generally not protected, close copying of expression can be.
5. **Retrieval.** A system that retrieves documents at inference time ([[prompting-rag/retrieval-augmented-generation]]) copies and may display them, raising questions closer to those of search engines and news aggregation.

Keeping these acts apart prevents a common confusion: an argument that training is lawful says nothing about whether a particular output infringes, and vice versa.

## The United States: fair use {#sec-us}

US copyright law has no specific exception for text and data mining. The question is decided case by case under **fair use** (17 U.S.C. § 107).

::: definition The four fair-use factors {#def-fair-use}
In deciding whether a use of a copyrighted work is fair, a US court considers
1. the **purpose and character** of the use, including whether it is commercial and whether it is **transformative** (adds a further purpose or different character rather than substituting for the original);
2. the **nature** of the copyrighted work (factual or creative, published or not);
3. the **amount and substantiality** of the portion used in relation to the work as a whole;
4. the **effect of the use upon the potential market** for or value of the work.

The factors are weighed together; none is decisive alone.
:::

Two precedents frame the debate. In *Authors Guild v. Google* (2d Cir. 2015) the court held that Google's scanning of millions of books to build a searchable index that showed only short snippets was fair use: copying whole books was necessary for a highly transformative purpose, and the snippets did not substitute for the books. In *Andy Warhol Foundation v. Goldsmith* (US Supreme Court, 2023) the Court narrowed "transformative": when a new use shares the purpose of the original and is commercial, a new meaning or message is not enough to favour fair use.

Courts began deciding AI-training cases in 2025. As of 2026, the main first-instance decisions are these:

- *Thomson Reuters v. Ross Intelligence* (D. Del., February 2025): a court held that copying headnotes from the Westlaw legal database to train a competing, **non-generative** legal search tool was not fair use, emphasising that the use was commercial and served the same market. The ruling was appealed to the Third Circuit.
- *Bartz v. Anthropic* (N.D. Cal., June 2025): the court held that training a language model on lawfully purchased and scanned books was fair use, describing it as highly transformative, but that building a central library from pirated copies obtained from shadow libraries was not excused by that. The parties subsequently agreed a class settlement of about US\$1.5 billion for the pirated-copy claims, preliminarily approved by the court in September 2025.
- *Kadrey v. Meta* (N.D. Cal., June 2025): the court granted summary judgment to Meta on fair use for training on the plaintiff authors' books, because the plaintiffs had not produced evidence of market harm, while stressing that the ruling was limited to those plaintiffs and that market dilution could defeat fair use in other cases.

Many other cases — including *The New York Times v. Microsoft and OpenAI* (filed December 2023), which also alleges that outputs reproduced articles, and cases brought by music publishers, visual artists and other authors — were ongoing as of 2026. First-instance decisions do not bind other courts, and appellate rulings may change the picture.

The US Copyright Office published a three-part report on copyright and AI (2024–2025). Its part on training (released in pre-publication form in May 2025) concluded that some training uses would be fair and others not, depending on the factors, and discussed whether a flood of AI-generated works competing with the originals ("market dilution") counts under the fourth factor. Separately, the Office and the courts have held that copyright requires **human authorship**: in *Thaler v. Perlmutter* (D.C. Cir., March 2025) the appeals court affirmed that a work generated autonomously by a machine cannot be registered, while works in which humans make sufficient creative contributions — selection, arrangement, modification — can be protected to that extent.

## The European Union: TDM exceptions and the AI Act {#sec-eu}

EU law takes an explicit, legislative approach. The Directive on Copyright in the Digital Single Market (Directive (EU) 2019/790) created two exceptions for **text and data mining** (TDM), defined as automated analysis of text and data to generate information such as patterns, trends and correlations.

::: definition The EU text-and-data-mining exceptions {#def-tdm}
- **Article 3** permits research organisations and cultural heritage institutions to make reproductions for TDM for the purposes of scientific research, of works to which they have lawful access. Rights holders cannot opt out.
- **Article 4** permits anyone to make reproductions for TDM of lawfully accessible works, **unless the rights holder has expressly reserved** this use "in an appropriate manner, such as machine-readable means in the case of content made publicly available online". Copies may be kept as long as necessary for the mining.
:::

Whether the TDM exceptions cover training generative models was debated; the AI Act (Regulation (EU) 2024/1689) settled the point for its purposes by referring to Article 4 in its obligations for providers of general-purpose AI models. In a closely watched first-instance decision, the Hamburg Regional Court (September 2024, *Kneschke v. LAION*) held that the non-profit LAION's creation of an image–text dataset for research was covered by the research exception.

Under Article 53 of the AI Act, providers of general-purpose AI models must, among other duties, (c) put in place a policy to comply with EU copyright law, in particular to identify and comply with Article 4 reservations "including through state-of-the-art technologies", and (d) draw up and make publicly available a **sufficiently detailed summary of the content used for training**, according to a template provided by the EU AI Office. The template was published in July 2025, together with a voluntary General-Purpose AI Code of Practice whose copyright chapter commits signatories to, among other things, respect robots.txt and not circumvent paywalls. These obligations apply from 2 August 2025 for models placed on the market from that date (models already on the market have until 2 August 2027). The AI Act also requires that synthetic content be marked in a machine-readable way (Article 50, applying from August 2026; see [[#sec-marking]]). The broader structure of the Act is in [[llm-society/governance-regulation]].

The obligations apply to models placed on the EU market wherever they were trained, which raises questions about how EU copyright rules apply to training done abroad under other laws; the Act's recitals take the view that providers should comply regardless of where training occurred.

European courts are also deciding output-side questions. In November 2025 the Munich Regional Court ruled, in a case brought by the music-rights society GEMA against OpenAI, that memorisation of song lyrics in a model and their reproduction in outputs infringed copyright and were not covered by the TDM exception; the decision was at first instance and subject to appeal.

## Japan: Article 30-4 {#sec-japan}

Japan amended its Copyright Act in 2018 to add **Article 30-4**, often described as one of the most permissive provisions for machine learning.

::: definition Japan's Article 30-4 {#def-art304}
A work may be exploited, in any manner and to the extent considered necessary, where the purpose is not to enjoy the thoughts or sentiments expressed in it — including use for **data analysis** (extracting, comparing, classifying or otherwise analysing elements of a large number of works) — **except where this would unreasonably prejudice the interests of the copyright owner** in light of the nature and purpose of the work and the circumstances of the exploitation.
:::

The provision does not distinguish commercial from non-commercial use and provides no opt-out mechanism. Its limit lies in the proviso and in the "non-enjoyment" purpose. Guidance from Japan's Agency for Cultural Affairs ("General Understanding on AI and Copyright in Japan", 2024) took the view that training aimed at producing outputs that reproduce the creative expression of specific works — for example, fine-tuning to imitate and output a particular author's works — may involve an enjoyment purpose and fall outside the article, and that circumventing technical measures that a database provider uses to prevent copying for analysis may unreasonably prejudice its interests.

### Other jurisdictions

The United Kingdom's TDM exception (s. 29A of the Copyright, Designs and Patents Act 1988) covers only non-commercial research. A government consultation (December 2024 – February 2025) proposed a broader exception with a rights-holder opt-out, which drew strong objections from creative industries and support from technology firms; readers should check the current position. Singapore's Copyright Act 2021 has a "computational data analysis" exception without an opt-out. China's Interim Measures for generative AI services (2023) require providers to use training data "from lawful sources" and not to infringe intellectual property rights, and Chinese courts have held platforms liable for outputs reproducing protected characters (the Guangzhou Internet Court's *Ultraman* decision, 2024).

## The arguments {#sec-arguments}

The legal tests channel a broader argument in which thoughtful people disagree. The strongest versions of the main positions are roughly these.

**For permitting training without licences (with conditions).**
- *Non-expressive use.* Training extracts statistical patterns about language and the world, not the expression of particular works; it is analogous to a person learning from reading, and copyright has never given authors control over what others learn from their work.
- *Precedent and necessity.* Courts have treated copying entire works for transformative computational purposes (search indexes, plagiarism detection) as fair. Large models need vast and diverse data; licensing every work from millions of rights holders is impractical, and requiring it would favour the few firms able to pay, entrenching incumbents.
- *Other remedies exist.* Where a model reproduces protected expression, output-side infringement law applies; there is no need to restrict training itself.

**For requiring consent or compensation.**
- *Wholesale commercial copying.* Developers copy entire works, often obtained without permission, to build commercial products whose value derives from that material; "learning" is a metaphor, and the copying is literal.
- *Market harm.* Generative models produce works that compete with those they were trained on — stock images, news summaries, genre fiction — and can dilute the market even without copying any one work. A functioning licensing market for training data already exists (developers have signed licensing agreements with news publishers, image libraries and online platforms since 2023), which under US law weighs against fair use.
- *Fairness to creators.* Creators bear the cost and receive no share of the value; opt-out schemes put the burden on millions of individuals, many of whom cannot practically exercise it, and come too late for works already used.

There are also intermediate positions: collective licensing or statutory remuneration schemes (as for music broadcasting), opt-out with transparency, or permitting training but requiring attribution and output filters. Which position a jurisdiction adopts is a policy choice that trades off innovation, creators' livelihoods, access to knowledge and competition; the evidence on several of the empirical premises — how much generated content substitutes for human work, how much licensing would cost — is still limited.

::: warning "Publicly available" does not mean "free to copy"
A web page anyone can read is still protected by copyright, and in the EU publicly available online content is subject to machine-readable reservations under Article 4. Conversely, "copyrighted" does not mean "cannot be used": exceptions such as fair use, TDM and Article 30-4 permit some uses without permission. Whether a given use is lawful depends on the jurisdiction, the act (collection, training, output) and the facts.
:::

## Data provenance and opt-outs {#sec-provenance}

Many of these questions turn on facts that are hard to establish: what data a model was trained on, under what licence, and whether rights holders had opted out. **Data provenance** — the documented origin and history of data — is the technical response.

**Documentation.** Datasheets for datasets (Gebru et al., 2021) and data statements (Bender and Friedman, 2018) record a dataset's sources, collection process, licences and known gaps. The Data Provenance Initiative (Longpre et al., 2023) audited more than $1{,}800$ fine-tuning datasets and found that licence information on popular hosting platforms was frequently missing or wrong — omitted for a large majority of datasets and mis-categorised in a large share of those that had it — so that practitioners routinely could not know the terms under which they were using data.

**Opt-out signals.** The oldest is `robots.txt`, a file in which a site names crawlers (by user-agent) that may not fetch its pages; it is a convention, not an enforcement mechanism. Developers have published distinct user-agents for AI-training crawlers so that sites can exclude them separately from search crawlers. Other proposals include the W3C community group's TDM Reservation Protocol and metadata in files. Longpre et al. (2024) measured a rapid increase in restrictions on AI crawlers in 2023–24 among the web domains most used in training corpora, and found that sites' robots.txt files and their terms of service often disagreed.

::: example What an opt-out removes {#ex-optout}
A training corpus draws $40\%$ of its tokens from $1{,}000$ high-quality domains and $60\%$ from millions of others. Over a year, $25\%$ of the high-quality domains (by tokens) and $5\%$ of the rest add AI-crawler restrictions, and the developer honours them. What fraction of the corpus is lost, and what fraction of the high-quality part?
::: solution
Lost: $0.4\cdot0.25 + 0.6\cdot0.05 = 0.10 + 0.03 = 0.13$, i.e. $13\%$ of tokens, and a quarter of the high-quality portion. Because restrictions concentrate among large, well-maintained publishers, opt-outs remove disproportionately much of the most valuable data — the pattern Longpre et al. reported — which shifts bargaining power towards those publishers and makes licensing more attractive.
:::
:::

## Marking generated content {#sec-marking}

The other half of provenance concerns outputs: can we tell whether a text or image was generated by a model? Two families of methods exist. **Post-hoc detection** classifies content as human or machine without any cooperation from the generator; its limits are discussed in [[llm-society/misinformation]]. **Marking** has the generator embed a signal at creation time: either a statistical **watermark** in the content itself, or signed **metadata** attached to it.

### Green-list watermarks {#sec-watermark}

Kirchenbauer et al. (2023) proposed a watermark for language models that changes the sampling distribution slightly in a way that only someone with a key can detect.

::: algorithm Green-list watermarking (Kirchenbauer et al., 2023) {#alg-watermark}
Parameters: green fraction $\gamma\in(0,1)$, boost $\delta > 0$, a secret key, a hash function.

Generation, at each step $t$:
1. Hash the previous token $x_{t-1}$ with the key to seed a pseudorandom generator.
2. Use it to split the vocabulary $\mathcal V$ into a **green list** $G_t$ of size $\gamma\lvert\mathcal V\rvert$ and a red list.
3. Add $\delta$ to the logit of every green token and sample $x_t$ from the softmax of the modified logits.

Detection, given $T$ tokens: recompute each $G_t$ from the key and $x_{t-1}$, count the green tokens $\lvert s\rvert_G = \sum_t\mathbf 1[x_t\in G_t]$, and compute

$$
z = \frac{\lvert s\rvert_G - \gamma T}{\sqrt{T\gamma(1 - \gamma)}}.
$$ {#eq-wm-z}

Declare the text watermarked if $z$ exceeds a threshold such as $4$.
:::

Detection needs the key but not the model, and costs a hash per token. The statistic is justified by the following result.

::: proposition The null distribution of the green count {#prop-wm-null}
Suppose a text of $T$ tokens was produced without knowledge of the key, and that the green lists are such that each token $x_t$ falls in $G_t$ with probability $\gamma$, independently across $t$. Then $\lvert s\rvert_G\sim\Bin(T, \gamma)$, with mean $\gamma T$ and variance $T\gamma(1 - \gamma)$, and $z$ in [[#eq-wm-z]] has mean $0$ and variance $1$ and is approximately standard normal for large $T$. The false-positive rate of the test $z > \tau$ is therefore approximately $1 - \Phi(\tau)$; for $\tau = 4$ it is about $3.2\times10^{-5}$.
:::

::: proof
Under the assumption the indicators $\mathbf 1[x_t\in G_t]$ are independent Bernoulli($\gamma$) variables, so their sum is binomial with mean $T\gamma$ and variance $T\gamma(1-\gamma)$ ([[math-for-ml/probability#prop-linearity]]). Subtracting the mean and dividing by the standard deviation gives $\E z = 0$, $\Var z = 1$, and by the central limit theorem $z$ is approximately $\Normal(0, 1)$. Hence $\Prob(z > \tau)\approx1 - \Phi(\tau)$, and $1 - \Phi(4) = 3.17\times10^{-5}$.
:::

The assumption is reasonable because a human writer (or another model) does not know the key, so whether their chosen token is green is like a coin flip with bias $\gamma$. It fails for repeated text: the same pair $(x_{t-1}, x_t)$ always gives the same answer, so a text that repeats a phrase many times has correlated indicators; implementations therefore score each distinct pair once.

How many green tokens does the watermark produce? It depends on the model's entropy at each step.

::: proposition The green probability under the watermark {#prop-wm-boost}
At one step, let the model's distribution put total probability $g$ on the green list. After adding $\delta$ to the green logits, the probability of sampling a green token is

$$
g' = \frac{g\,e^{\delta}}{g\,e^{\delta} + 1 - g}.
$$ {#eq-wm-boost}

In particular, if the model is close to uniform over many tokens, $g\approx\gamma$ and $g'\approx\gamma e^\delta/(\gamma e^\delta + 1 - \gamma)$; if the model puts almost all probability on one token, $g$ is nearly $0$ or $1$ and $g'\approx g$.
:::

::: proof
The softmax probability of token $i$ is $e^{\ell_i}/\sum_j e^{\ell_j}$. Adding $\delta$ to the green logits multiplies each green numerator by $e^\delta$. Dividing numerator and denominator by $\sum_je^{\ell_j}$, the total green probability becomes $e^\delta g/(e^\delta g + (1 - g))$. The special cases follow by substituting $g = \gamma$, or $g\in\{0, 1\}$.
:::

The second case is the watermark's fundamental limit: low-entropy text — a quotation, code with one correct continuation, a list of facts — cannot be watermarked without changing its content, because there is no choice to bias.

::: example Detecting a watermark {#ex-wm}
Take $\gamma = 0.25$ and $\delta = 2$. (a) In high-entropy text, what fraction of tokens is green? (b) What is the expected $z$ for $T = 200$ tokens? (c) A $100$-token text has $41$ green tokens; is it flagged at $\tau = 4$?
::: solution
(a) By [[#eq-wm-boost]], $g' = 0.25e^2/(0.25e^2 + 0.75) = 1.847/2.597 = 0.711$.
(b) Expected green count $0.711\cdot200 = 142.2$; $z = (142.2 - 50)/\sqrt{200\cdot0.25\cdot0.75} = 92.2/6.124 = 15.1$, far above $4$.
(c) $z = (41 - 25)/\sqrt{100\cdot0.1875} = 16/4.330 = 3.70 < 4$: not flagged, although the green fraction ($0.41$) is well above $0.25$. The one-sided $p$-value is about $1.1\times10^{-4}$; a lower threshold would flag it at the cost of more false positives on human text.
:::
:::

::: example Choosing a threshold for a large platform {#ex-wm-threshold}
A platform will scan $10^6$ human-written documents a day and wants fewer than one expected false positive per day. (a) What threshold $\tau$ does that require? (b) With $\gamma = 0.25$, $\delta = 2$ and high-entropy watermarked text, how many tokens are needed for the *expected* $z$ to reach $\tau$?
::: solution
(a) We need $10^6(1 - \Phi(\tau)) < 1$, i.e. $1 - \Phi(\tau) < 10^{-6}$, so $\tau = \Phi^{-1}(1 - 10^{-6}) = 4.75$.
(b) The expected $z$ is $(0.711 - 0.25)\sqrt T/\sqrt{0.1875} = 1.065\sqrt T$. Setting $1.065\sqrt T = 4.75$ gives $T = 19.9$, so about $20$ tokens. Reaching the expected value is not enough for reliable detection — half of such texts would fall below it — so in practice somewhat longer texts are needed; and the threshold must account for every test run, not just one.
:::
:::

::: example Low-entropy text {#ex-wm-entropy}
In a watermarked program listing, half of the tokens are forced (the model puts probability nearly $1$ on one token, which is green with probability $\gamma$) and half are high-entropy. With $\gamma = 0.25$ and $\delta = 2$, what is the expected green fraction, and how many tokens are needed for an expected $z$ of $4$?
::: solution
At forced steps the boost changes nothing ([[#prop-wm-boost]] with $g\in\{0,1\}$), so those tokens are green with probability $0.25$. At high-entropy steps the green probability is $0.711$. The average is $0.5\cdot0.25 + 0.5\cdot0.711 = 0.481$. The expected $z$ is $(0.481 - 0.25)\sqrt T/0.433 = 0.532\sqrt T$, which reaches $4$ at $T = 56.4$, so about $57$ tokens — about four times the $14$ needed for fully high-entropy text at the same threshold ($(4/1.065)^2 = 14.1$). Code, formulaic text and short factual answers are hard to watermark.
:::
:::

::: widget plot
f: (g - 0.25)*sqrt(x)/sqrt(0.1875); 4
x: 0, 300
y: -1, 20
sliders: g=0.71:0.25:0.9:0.01
labels: expected z-score; detection threshold
caption: The expected $z$-score of [[#eq-wm-z]] against text length $T$, for $\gamma = 0.25$ and an observed green fraction $g$ (slider). It grows as $\sqrt T$, so detection needs a minimum length: about $10$ tokens at $g = 0.71$ (the high-entropy value for $\delta = 2$), but about $48$ at $g = 0.5$ and several hundred at $g = 0.3$ — which is roughly what happens to watermarked text after heavy paraphrasing or when the model's entropy is low.
:::

The listing implements the scheme on a toy "model" with random logits and tests texts of several lengths.

```python
import hashlib, math, random

V, GAMMA, DELTA = 1000, 0.25, 2.0            # vocabulary size, green fraction, logit boost

def green_list(prev_token, key=42):
    """Pseudorandom green list seeded by a secret key and the previous token."""
    seed = int(hashlib.sha256(f"{key}:{prev_token}".encode()).hexdigest(), 16)
    ids = list(range(V))
    random.Random(seed).shuffle(ids)
    return set(ids[: int(GAMMA * V)])

def toy_logits(rng):
    """Stand-in for a language model: random logits, so each step has high entropy."""
    return [rng.gauss(0, 2) for _ in range(V)]

def sample(logits, rng):
    m = max(logits)
    w = [math.exp(l - m) for l in logits]
    return rng.choices(range(V), weights=w)[0]

def generate(T, rng, watermark):
    toks = [0]
    for _ in range(T):
        logits = toy_logits(rng)
        if watermark:
            g = green_list(toks[-1])
            logits = [l + DELTA if i in g else l for i, l in enumerate(logits)]
        toks.append(sample(logits, rng))
    return toks

def z_score(toks):
    T = len(toks) - 1
    green = sum(toks[i] in green_list(toks[i - 1]) for i in range(1, len(toks)))
    return green, T, (green - GAMMA * T) / math.sqrt(T * GAMMA * (1 - GAMMA))

rng = random.Random(2023)
for wm in (False, True):
    for T in (25, 50, 200):
        g, T, z = z_score(generate(T, rng, wm))
        print(f"watermark={wm!s:5}  T={T:3d}  green={g:3d}  fraction={g/T:.3f}  z={z:6.2f}")
```

```text
watermark=False  T= 25  green=  7  fraction=0.280  z=  0.35
watermark=False  T= 50  green=  8  fraction=0.160  z= -1.47
watermark=False  T=200  green= 56  fraction=0.280  z=  0.98
watermark=True   T= 25  green= 12  fraction=0.480  z=  2.66
watermark=True   T= 50  green= 40  fraction=0.800  z=  8.98
watermark=True   T=200  green=132  fraction=0.660  z= 13.39
```

Unwatermarked texts give $z$ near $0$, as [[#prop-wm-null]] predicts. Watermarked texts give large $z$ once they are long enough; the $25$-token text, despite a green fraction of $0.48$, falls short of $4$. The green fraction is $0.66$ rather than the $0.71$ of [[#ex-wm]] because the toy model's random logits put most probability on a few tokens at each step, so $g$ often differs from $\gamma$ and the average of the concave function [[#eq-wm-boost]] is lower.

**Robustness and limits.** An adversary who rewrites the text — by hand, or with another model that does not know the key — replaces green tokens with tokens that are green only with probability $\gamma$, diluting the signal. Kirchenbauer et al. (2024) found that the watermark often remained detectable after paraphrasing by humans or models if enough text was available, while Krishna et al. (2023) showed that a dedicated paraphrasing model could greatly reduce detection rates of several schemes. Zhang et al. (2023) argued that under mild assumptions no watermark can be robust against a determined attacker with access to a quality oracle and a perturbation method. Watermarks also work only for models whose operator applies them: open-weight models can be run without them ([[llm-society/open-closed-models]]). Later schemes reduce the quality cost — for example, "distortion-free" watermarks that do not change the output distribution for any single sample (Kuditipudi et al., 2023), and Google DeepMind's SynthID-Text (Dathathri et al., 2024, *Nature*), deployed in a commercial chat product and evaluated on a large volume of live responses with no measurable drop in user-rated quality.

### Content credentials (C2PA) {#sec-c2pa}

Watermarks are hidden in the content; **content credentials** are signed statements attached to it. The Coalition for Content Provenance and Authenticity (C2PA), founded in 2021 by Adobe, Arm, the BBC, Intel, Microsoft and Truepic, publishes an open standard for this.

::: definition C2PA manifest {#def-c2pa}
A **C2PA manifest** is a data structure bound to a media file that contains **assertions** about the asset (for example: created by a camera of a given model, edited with a given tool, generated by an AI model, derived from these ingredient files), a cryptographic **hash** binding the assertions to the exact content, and a **digital signature** by the party making the claim, verifiable with a certificate. Each edit can add a new manifest that references the previous one, forming a provenance chain.
:::

A credential proves that a specific signer made specific claims about specific bytes, and that the bytes have not changed since — not that the claims are true or the content accurate. Its weaknesses are practical: metadata is often stripped when files are re-encoded or uploaded to platforms, so absence of a credential proves nothing; coverage depends on adoption by camera makers, editing tools, generators and platforms; and plain text, the main output of language models, has no standard container that survives copying and pasting. Watermarks and credentials are therefore complementary: credentials give rich, verifiable history when they survive, watermarks a weaker signal that survives some transformations.

Regulation increasingly requires marking. The EU AI Act's Article 50 requires providers of systems that generate synthetic audio, image, video or text to ensure outputs are marked in a machine-readable format and detectable as artificially generated, "as far as this is technically feasible", from 2 August 2026, and requires deployers to disclose deepfakes. China's Measures for Labelling AI-Generated Synthetic Content, in force from 1 September 2025, require both visible labels and implicit (metadata) labels on generated content.

::: quiz
A news site receives a photograph with a valid C2PA credential, signed by a camera manufacturer's key, stating it was captured on a given date and not edited. What does the credential establish?
- [ ] The scene in the photograph really happened as it appears.
- [x] The file's content has not changed since the device signed those claims, and the claims were made by a holder of that key.
- [ ] No AI was involved anywhere in producing the image.
- [ ] A photograph without such a credential is fake.
::: solution
The hash and signature bind the assertions to the bytes and to the signer. They cannot show that the scene was not staged, that the device's key was not misused, or that the claims are accurate; and missing credentials are common for genuine content, since metadata is often stripped.
:::
:::

::: history
Copyright's first statute, the Statute of Anne (1710), already balanced authors' rights against public access. US fair use was codified in the Copyright Act of 1976; the Google Books litigation (2005–2016) became the main precedent for mass digitisation. Japan added Article 30-4 in 2018 and the EU its TDM exceptions in 2019, both before generative models became prominent. Lawsuits over generative AI multiplied from late 2022, and the first US rulings on training came in 2025. On provenance, Gebru et al. circulated *Datasheets for Datasets* in 2018 (published 2021), and the Data Provenance Initiative began auditing datasets in 2023. Text watermarking predates LLMs (for example, Atallah et al., 2001, on natural-language watermarking); Aaronson described a cryptographic watermark for GPT outputs in 2022 and Kirchenbauer et al. published the green-list scheme in 2023. C2PA was founded in 2021, merging earlier initiatives by Adobe (the Content Authenticity Initiative) and by Microsoft and the BBC (Project Origin).
:::

::: summary
- Copying occurs at collection, preparation, training, output and retrieval; whether each is lawful is a separate question.
- In the US, fair use weighs purpose (transformativeness), nature, amount and market effect; first-instance 2025 decisions went both ways depending on facts (non-generative competitor, pirated copies, evidence of market harm), and many cases were ongoing as of 2026.
- In the EU, Article 4 of the DSM Directive permits TDM unless rights holders reserve it in a machine-readable way; the AI Act requires providers of general-purpose models to have a copyright policy honouring such reservations and to publish a training-content summary, from August 2025.
- Japan's Article 30-4 permits non-enjoyment uses including data analysis, unless they unreasonably prejudice rights holders.
- The policy debate sets non-expressive use, precedent and practicality against wholesale copying, market harm and fairness to creators; intermediate schemes exist.
- Provenance requires documentation, accurate licences and honoured opt-outs; opt-outs concentrate among high-value sources.
- Green-list watermarks bias sampling towards keyed green tokens; detection is a binomial $z$-test, $z = (\lvert s\rvert_G - \gamma T)/\sqrt{T\gamma(1-\gamma)}$, which needs enough tokens and enough entropy and is weakened by paraphrasing.
- C2PA credentials sign claims about content; they prove integrity and origin of the claims, not truth, and are often stripped.
:::

## Exercises

::: exercise A z-score {level=1 check="4.4"}
A $300$-token text is tested with $\gamma = 0.25$. It has $108$ green tokens. Compute $z$ to one decimal place. Is it flagged at $\tau = 4$?
::: solution
$\gamma T = 75$, $\sqrt{300\cdot0.1875} = \sqrt{56.25} = 7.5$, $z = (108 - 75)/7.5 = 4.4 > 4$: flagged.
:::
:::

::: exercise The boosted green fraction {level=1 check="0.6"}
With $\gamma = 0.5$ and $\delta = \ln 1.5$, what fraction of tokens is green in high-entropy text?
::: solution
$g' = 0.5\cdot1.5/(0.5\cdot1.5 + 0.5) = 0.75/1.25 = 0.6$.
:::
:::

::: exercise False positives at scale {level=1 check="32"}
A platform tests one million human-written texts at threshold $z > 4$. About how many are wrongly flagged as watermarked, using the normal approximation? Give the nearest integer.
::: solution
$10^6\cdot3.17\times10^{-5}\approx32$. At this scale even a tiny false-positive rate produces dozens of false accusations, which matters if a flag has consequences for the writer (compare [[llm-society/misinformation]]).
:::
:::

::: exercise Minimum length {level=2 check="48"}
With $\gamma = 0.25$, a paraphrased watermarked text has green fraction $0.5$. What is the smallest $T$ for which the expected $z$ reaches $4$?
::: solution
Expected $z = (0.5 - 0.25)\sqrt T/\sqrt{0.1875} = 0.5774\sqrt T$. Setting it to $4$: $\sqrt T = 6.928$, $T = 48$.
:::
:::

::: exercise Fair-use factors {level=2}
For each of the following uses, say which fair-use factor it most affects and in which direction, with a sentence of reasoning: (a) a model trained only on public-domain and licensed text; (b) a model fine-tuned on one living novelist's books to write new novels "in her voice" for sale; (c) a system that shows users full news articles retrieved from paywalled sites; (d) training an internal classifier on scientific abstracts to route papers to reviewers.
::: solution
(a) No fair-use question arises for the public-domain and licensed portion: there is no infringement to excuse. (b) Factor 4 (market effect) weighs against fair use, since the outputs compete directly with the author's own books; factor 1 is also weaker as the purpose is close to the original's. (c) Factor 4 and factor 3: full copies substitute for subscriptions, weighing strongly against. (d) Factor 1 favours fair use (non-expressive, transformative purpose, no outputs of the works), factor 2 slightly favours it (factual works), and factor 4 is likely neutral unless a licensing market for such uses is shown. These are illustrations of the reasoning, not predictions of any court's decision.
:::
:::

::: exercise Comparing three regimes {level=2}
A company in each of the US, the EU and Japan trains a commercial model on web pages, some of which carry a machine-readable reservation against AI training. Explain how the reservation matters under each regime as described in this chapter.
::: solution
EU: Article 4 of the DSM Directive does not apply to works whose rights holders have reserved TDM in an appropriate (machine-readable) manner, so copying those pages needs another basis (a licence); the AI Act requires a policy to identify and respect such reservations. Japan: Article 30-4 has no opt-out; the reservation is not decisive, although technical measures against copying and the "unreasonable prejudice" proviso may make it relevant. US: there is no statutory opt-out; a reservation may bear on fair use indirectly — for example, evidence that a licensing market exists (factor 4) or on the character of the use — and on contract or anti-circumvention claims if terms or technical measures were breached.
:::
:::

::: exercise Detection with repeated pairs {level=2}
A text consists of the same $10$-token sentence repeated $20$ times. Explain why [[#prop-wm-null]] does not apply if every token is scored, and what a detector should do.
::: solution
Green membership depends only on the pair $(x_{t-1}, x_t)$ and the key. Repetition makes the same $10$ (or so) pairs recur $20$ times, so the $200$ indicators are $20$ copies of about $10$ independent ones. If, by chance, $6$ of $10$ pairs are green, the count is $120$ of $200$ and $z = (120 - 50)/6.12 = 11.4$, a false positive. Scoring each distinct pair once gives $T = 10$, $z = (6 - 2.5)/1.37 = 2.56$, correctly not significant.
:::
:::

::: exercise The quality cost of the boost {level=3}
For a step where the model's distribution is $p$ and the watermarked distribution $p'$, the KL divergence $\mathrm{KL}(p'\,\|\,p)$ measures distortion. Show that if the green mass is $g$, then $\mathrm{KL}(p'\|p) = g'\delta - \ln(g e^\delta + 1 - g)$, and compute it for $g = 0.25$, $\delta = 2$. Comment on what this means for text quality.
::: solution
For green $i$, $p'_i = p_ie^\delta/Z$ and for red $i$, $p'_i = p_i/Z$, with $Z = ge^\delta + 1 - g$. Then $\ln(p'_i/p_i) = \delta - \ln Z$ for green and $-\ln Z$ for red, so $\mathrm{KL}(p'\|p) = \sum_ip'_i\ln(p'_i/p_i) = g'(\delta - \ln Z) + (1 - g')(-\ln Z) = g'\delta - \ln Z$. With $g = 0.25$, $\delta = 2$: $Z = 2.597$, $g' = 0.711$, $\mathrm{KL} = 1.422 - 0.954 = 0.468$ nats per token. This is a substantial change in the distribution at high-entropy steps, which is why the original paper measured a perplexity increase under an oracle model; smaller $\delta$ trades detectability for quality, and distortion-free schemes avoid this per-sample cost at the price of other complications.
:::
:::

::: exercise Implementing a robust detector {level=3}
Modify the listing so that (a) detection counts each distinct (previous token, token) pair once, and (b) a paraphrase attack is simulated by replacing each token of a watermarked $200$-token text independently with probability $r$ by a uniformly random token. Report the $z$-score for $r = 0, 0.3, 0.6$, and explain the trend with [[#prop-wm-boost]].
::: solution
```python
def z_unique(toks):
    pairs = {(toks[i - 1], toks[i]) for i in range(1, len(toks))}
    green = sum(t in green_list(p) for p, t in pairs)
    T = len(pairs)
    return (green - GAMMA * T) / math.sqrt(T * GAMMA * (1 - GAMMA))

base = generate(200, random.Random(7), True)
for r in (0.0, 0.3, 0.6):
    att = random.Random(11)
    toks = [base[0]] + [att.randrange(V) if att.random() < r else t for t in base[1:]]
    print(r, round(z_unique(toks), 2))
```

```text
0.0 15.51
0.3 6.53
0.6 0.65
```

A replaced token is green with probability $\gamma$; worse, replacing token $t$ also changes the green list for token $t+1$, so each replacement can break two indicators. With replacement rate $r$ the green fraction falls roughly from $g'$ towards $\gamma$ like $\gamma + (g' - \gamma)(1 - r)^2$, and $z$ falls roughly in proportion ($15.5\cdot0.49 = 7.6$ predicted at $r = 0.3$ against $6.5$ observed; $15.5\cdot0.16 = 2.5$ at $r = 0.6$ against $0.65$, the difference being sampling noise in a short text): at $r = 0.6$ the text is no longer detected at $\tau = 4$. Longer texts restore detectability as $\sqrt T$.
:::
:::
