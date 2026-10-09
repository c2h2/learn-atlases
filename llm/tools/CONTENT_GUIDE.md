# LLM Atlas — content guide

LLM Atlas (`/learn/llm/`) teaches how large language models work, how they are trained and used,
and how to make them safe, from first principles to current research. Every chapter is a long,
self-contained lesson in the style of a very good textbook: motivation and intuition first, then
precise definitions, derivations, many fully worked examples (with numbers and tensor shapes),
interactive figures, quick checks, and graded exercises with full solutions.

The site runs on the same engine as Maths Atlas (`/learn/maths/`). Its reference lesson,
`/var/www/f.g77k.com/learn/maths/content/en/calculus-1/limits.md`, shows the expected depth, tone
and markup: read it before writing.

## 1. Files

```
content/en/<course>/course.json    course record (structure fixed — see §2)
content/en/<course>/<chapter>.md   one lesson per chapter, in the order listed in course.json
```

The curriculum (18 courses, 137 chapters in seven areas: foundations, language modelling,
pretraining and scaling, post-training and reasoning, inference and systems, applications, and
evaluation, safety and society; four stages: Foundations, Core, Advanced, Frontier) is fixed in
the `course.json` files. **Do not rename, add, remove or reorder courses or chapters.**

## 2. course.json — what to fill in

The skeleton already has `slug`, `title`, `full_title`, `area`, `level`, `order`, `tagline`,
`summary`, `prerequisites`, `chapters[].{slug,title,summary,requires}` and `next`. You complete:

| field | content |
|---|---|
| `overview` | 2–4 paragraphs: what the subject is about, why it matters, how the course is organised, what makes it hard and how to approach it. |
| `outcomes` | 6–10 learning outcomes, each a sentence starting with a verb ("Derive…", "Implement…", "Estimate…", "Evaluate…"). |
| `history` | 5–10 events `{"year": 2017, "title": "…", "detail": "1–2 sentences", "people": ["Ashish Vaswani"]}` in chronological order, each tied to a paper, system or result whose date you can verify. |
| `references` | 4–8 books, surveys or courses `{"title", "authors", "year", "note"}`, for example Goodfellow–Bengio–Courville, Bishop, Murphy, Jurafsky & Martin, Zhang et al. (*Dive into Deep Learning*), Tunstall et al., Sutton & Barto, MacKay, and major survey papers. `note` says what each is good for. |

You may polish `tagline`, `summary` and the chapter `summary` strings, and adjust a chapter's
`requires` list. Keep titles plain text: no `$…$`.

The timeline (`data/milestones.json`) holds about 30 field-wide milestones `{"year", "title",
"detail", "people", "area"}` — from Markov (1913) and Shannon (1948) through word2vec, attention,
the Transformer, GPT and BERT to RLHF, open-weight models and reasoning models — `area` being one of
the seven area keys.

## 3. Depth targets for every lesson (checked by tools/check.php)

- **3,000–5,500 words** of explanation. A student should be able to learn the topic from this page alone.
- **Definitions and results** as numbered blocks (≥ 3): definitions of objects and algorithms,
  propositions with derivations (why attention scales by $1/\sqrt{d_k}$, the DPO objective from the
  KL-regularised reward objective, the FLOPs of a training step …). State assumptions; mark
  empirical findings as such (a scaling law is an observation, not a theorem).
- **≥ 4 worked examples** with numbers: tensor shapes, parameter and FLOP counts, memory, a
  softmax by hand, a BPE merge sequence, a perplexity, a reward-model loss …
- **≥ 1 interactive figure** (2–3 is better), **≥ 1 quick check**, **≥ 1 `:::warning`** (common
  misconceptions), one `:::history` block, a `:::summary`, and **≥ 8 exercises** with complete
  solutions (about 3 routine, 3 standard, 2+ challenging, including a derivation or a small
  implementation). Add `check="…"` when the answer is a single number.
- Short code listings (Python with NumPy or PyTorch) where they clarify an algorithm; always show
  shapes in comments. Code must run.

## 4. Writing style and accuracy

- Audience: students who have done the prerequisite chapters. Explain from scratch, motivate
  before formalising, then be exact. Link to Maths Atlas (`/learn/maths/`) for mathematical tools.
- **British spelling** (optimise, tokenise, modelling, behaviour) except in names and quotations.
- **Accuracy over currency.** The field moves fast. Teach methods and ideas that are published and
  established; attribute them (authors, year, venue). Date any statement that may change ("as of
  2026"). Never state unverified details of commercial systems; say what is publicly documented.
- **Neutral and fair.** Describe the work of all labs and open communities even-handedly; no
  marketing language, no rankings of products that will date.
- **Safety-sensitive material** (jailbreaks, prompt injection, dangerous capabilities): explain
  mechanisms and defences conceptually; never include working attack strings against deployed
  systems or instructions for causing harm.
- Verify every number with `python3` (numpy and torch are installed): shapes, counts, losses,
  probabilities and small training runs.

## 5. Markup

Exactly as in Maths Atlas — see `/var/www/f.g77k.com/learn/maths/tools/CONTENT_GUIDE.md` §5 for
blocks (`:::definition`, `:::theorem`/`:::proposition`, `:::proof`, `:::example` + `:::solution`,
`:::exercise`, `:::quiz`, `:::warning`, `:::intuition`, `:::application`, `:::history`,
`:::summary`, `:::algorithm` for procedures such as BPE or beam search), references
(`[[#id]]`, `[[course/chapter]]`, `[[course/chapter#id]]`), answer checks and KaTeX.

Notation used across the atlas:

- Vectors bold lower case $\mathbf{x}$, matrices upper case $W$, tensors with explicit shapes
  $(B, T, d_{\text{model}})$; sequence length $T$ (or $n$), vocabulary $\mathcal{V}$ with size
  $\lvert\mathcal{V}\rvert$; heads $h$, head dimension $d_k$; parameters $\theta$, $N$ parameters,
  $D$ training tokens, $C$ compute.
- $Q = XW_Q$, $K = XW_K$, $V = XW_V$; $\operatorname{softmax}$, $\operatorname{LayerNorm}$;
  model distribution $p_\theta(x_t \mid x_{<t})$; loss $\mathcal{L}$; policy $\pi_\theta$,
  reference policy $\pi_{\text{ref}}$, reward $r_\phi$, KL weight $\beta$.
- Write "token" for the unit of text and keep units explicit (FLOPs, bytes, tokens per second).

## 6. Interactive figures

The available types are in `data/widgets.json` (plots, gradient descent and loss landscapes,
linear maps, projections and SVD, probability distributions, sampling and the CLT, Markov chains,
Bayes, regression, hypothesis tests and confidence intervals, graphs, floating-point formats); try
each at `/learn/llm/lab.php?w=<type>`. LLM-specific figures (tokeniser, sampling with temperature
and top-p, attention maps, embeddings, a small neural-network playground, positional encodings,
scaling laws, KV-cache memory, quantisation, LoRA, beam search …) are planned in
`tools/WIDGET_GUIDE.md`; use a type only once it is in the catalogue.

## 7. Check your work

```
cd /var/www/f.g77k.com/learn/llm
bash tools/check.sh <course> [<course> …]
```

Fix every `ERROR`; depth `warn`ings must be gone for finished lessons. Preview at
`http://f.g77k.com/learn/llm/lesson.php?c=<course>&l=<chapter>` (from this machine:
`curl --resolve f.g77k.com:80:127.0.0.1 …` or `node tools/shot.js "lesson.php?c=…&l=…" out.png`).

Generated text is an error, whatever its length: a lesson or course field containing the filler
phrasing kept in `pending/` ("the one that the … is for", or a lesson that opens with
"Course: **…** — chapter …") fails the check. Write every lesson by hand, and never copy text out of
`pending/`.
