A person reading a model's answer tolerates a stray sentence, a different heading or a number written as words. A program does not. When the output of a language model feeds a database, a user interface, a function call or another model, it must be **machine-readable**: valid JSON with the right fields and types, a date in one format, one label from a fixed set. A model that produces the right format $99\%$ of the time fails a pipeline that makes a million calls ten thousand times.

There are three ways to get there, in increasing order of reliability: *ask* for the format and check the result, *train* models to follow formats, and *constrain* decoding so that invalid output is impossible. This chapter explains schemas, the checking-and-retrying loop, and, in most detail, constrained decoding — how a grammar or a finite automaton turns into a mask over the vocabulary at each step, what that guarantees, and what it quietly changes about the distribution the model samples from. A small constrained decoder for JSON numbers, written in plain Python, makes the mechanism concrete. Other chapters build on this one: function calling ([[agents/function-calling]]) is structured output whose schema describes a tool's arguments.

## Schemas {#sec-schemas}

A format must first be specified precisely. For JSON the standard vocabulary is **JSON Schema**, a JSON document that describes which JSON values are allowed.

::: definition JSON Schema (core keywords) {#def-schema}
A **JSON Schema** is a JSON object whose keywords constrain a value. The most used are: `type` (one of `object`, `array`, `string`, `number`, `integer`, `boolean`, `null`); for objects, `properties` (a schema for each named field), `required` (the fields that must be present) and `additionalProperties` (whether other fields are allowed); for arrays, `items` (the schema of each element) with `minItems` and `maxItems`; for strings, `enum` (a fixed list of allowed values), `pattern` (a regular expression) and `format` (such as `date`); and for numbers, `minimum` and `maximum`. A value **validates** against a schema if it satisfies every keyword.
:::

::: example A schema for extracted invoices {#ex-schema}
Write a schema for the output of an invoice extractor: a required supplier name, a required total amount that is a non-negative number, a required currency from EUR, USD and GBP, and an optional list of line items, each with a description and an amount.
::: solution
```json
{
  "type": "object",
  "properties": {
    "supplier": {"type": "string"},
    "total":    {"type": "number", "minimum": 0},
    "currency": {"type": "string", "enum": ["EUR", "USD", "GBP"]},
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {"description": {"type": "string"}, "amount": {"type": "number"}},
        "required": ["description", "amount"],
        "additionalProperties": false
      }
    }
  },
  "required": ["supplier", "total", "currency"],
  "additionalProperties": false
}
```

`{"supplier": "Acme", "total": 120.5, "currency": "EUR"}` validates; `{"supplier": "Acme", "total": "120.50 €"}` fails twice — `total` is a string, and `currency` is missing. Note what the schema cannot say: that the total equals the sum of the items, or that the supplier is the one printed on the invoice.
:::
:::

The schema serves three purposes at once: it is part of the prompt (models follow a format better when they see it), it is the specification for validation, and, as below, it can be compiled into a constraint on decoding.

## Ask, validate, retry {#sec-retry}

The simplest method needs no special decoding. Put the schema and an example in the prompt ([[prompting-rag/prompt-design#def-components]]), parse the output, validate it, and on failure call the model again — ideally with the error message, so that it can correct itself.

::: proposition Retries until success {#prop-retries}
If each attempt independently yields a valid output with probability $q > 0$, the number of attempts until the first valid output is geometric: the expected number of attempts is $1/q$, and the probability that $r$ attempts all fail is $(1 - q)^r$.
:::

::: proof
The first success occurs at attempt $j$ with probability $(1 - q)^{j-1}q$. All of the first $r$ attempts fail with probability $(1 - q)^r$ by independence. The mean is $\sum_{j\ge1}j(1 - q)^{j-1}q = q\cdot\frac{1}{(1 - (1 - q))^2} = \frac1q$, using $\sum_{j\ge1}jx^{j-1} = 1/(1 - x)^2$ for $\lvert x\rvert < 1$.
:::

::: example How many retries? {#ex-retries}
A prompt yields valid JSON $90\%$ of the time. What is the expected number of calls per valid result, and what fraction of requests still fail after a limit of $3$ attempts? What if failures are not independent?
::: solution
Expected calls $1/0.9 = 1.11$, an $11\%$ overhead. All three attempts fail with probability $0.1^3 = 0.001$, one request in a thousand. The independence assumption is the weak point: failures concentrate on particular inputs — a very long document, an unusual character — and an input that failed once is more likely to fail again. Measure the retry success rate on real failures before relying on $(1 - q)^r$.
:::
:::

::: widget plot
f: 1 - (1 - q)^x
x: 0, 6
y: 0, 1.05
sliders: q=0.9:0.05:0.99:0.01
labels: probability of a valid output within $r$ attempts
points: 1,0.9; 3,0.999
caption: The probability that at least one of $r$ independent attempts is valid, $1 - (1 - q)^r$, against $r$. At $q = 0.9$ three attempts reach $0.999$, as in [[#ex-retries]]. Even at a low per-attempt rate the curve rises quickly — if attempts really are independent, which correlated failures on hard inputs violate.
:::

Retrying is model-agnostic and needs nothing but a validator, which is why it is the universal fallback. Its costs are latency and tokens for each retry, and its guarantee is only probabilistic. Many inference services and open-source servers also offer a **JSON mode** — guaranteed syntactically valid JSON — or a **schema mode** that accepts a JSON Schema; as of 2026 these are implemented by the constrained decoding of the next section, sometimes combined with models fine-tuned to follow schemas.

## Constrained decoding {#sec-constrained}

A language model generates by repeatedly computing next-token logits $\mathbf{z}_t\in\R^{\lvert\mathcal{V}\rvert}$ and choosing a token ([[inference/decoding-sampling]]). Nothing stops us from changing the logits before choosing. If we know which tokens could still lead to a valid output, we can set the logits of all others to $-\infty$; the softmax then gives them probability zero, and invalid output can no longer be produced.

::: definition Constrained decoding {#def-constrained}
Let $L$ be a set of allowed output strings (a **formal language**, for example all strings that validate against a schema) and $\operatorname{Pref}(L)$ the set of its prefixes. Given the text $s$ generated so far, the **allowed set** is

$$
A(s) = \{v\in\mathcal{V} : s\,v\in\operatorname{Pref}(L)\}\ \cup\ \{\texttt{<eos>} : s\in L\},
$$

where $s\,v$ is the concatenation of $s$ with the characters of token $v$. **Constrained decoding** samples (or chooses greedily) from the masked distribution

$$
q(v\mid s) = \frac{p_\theta(v\mid s)\,\mathbb{1}[v\in A(s)]}{\sum_{u\in A(s)}p_\theta(u\mid s)}.
$$ {#eq-masked}
:::

::: proposition Constrained decoding is sound {#prop-sound}
Suppose the vocabulary contains every single character that occurs in strings of $L$, and decoding starts from the empty string, which is in $\operatorname{Pref}(L)$ when $L$ is non-empty. Then at every step the allowed set $A(s)$ is non-empty, and if constrained decoding stops by emitting `<eos>`, its output is in $L$.
:::

::: proof
We show by induction that the generated text $s$ is always in $\operatorname{Pref}(L)$. Initially $s$ is empty, a prefix of every string. If $s\in\operatorname{Pref}(L)$, the next token $v$ is in $A(s)$, so either $v$ is `<eos>` or $s\,v\in\operatorname{Pref}(L)$ by definition. For non-emptiness: since $s\in\operatorname{Pref}(L)$, there is a string $s\,w\in L$. If $w$ is empty, $s\in L$ and `<eos>` is allowed; otherwise the first character $c$ of $w$ is a token by assumption, and $s\,c$ is a prefix of $s\,w$, so $c\in A(s)$. Finally, `<eos>` is allowed only when $s\in L$, so a finished output lies in $L$.
:::

The assumption about single characters is not a technicality. If the vocabulary could reach a prefix but not continue it — the prefix `b` of the word `blue`, in a vocabulary that has the token `bl` but no token `l` — the decoder could get stuck. Real tokenisers contain all bytes, so this does not happen at byte level, but it does when a constrainer works with a restricted token set; the exercises build an example. Termination is a separate matter: [[#prop-sound]] says nothing about a model that never chooses `<eos>`, and a hard limit on the number of tokens can cut an output short in an invalid state unless the constrainer forces completion near the limit.

### Regular languages and finite automata

The allowed set must be computed at every step for a vocabulary of $10^5$ or more tokens, so it must be cheap. For many formats — numbers, dates, identifiers, enumerations, and JSON objects with a fixed, non-recursive schema — the language $L$ is **regular**: it is described by a regular expression and recognised by a **deterministic finite automaton** (DFA), a finite set of states with a start state, a transition function $\delta(\text{state}, \text{character})$, and a set of accepting states. A string is a prefix of $L$ exactly when running the DFA on it never falls into the **dead state** (assuming, as we may after pruning, that every other state can reach an accepting one).

::: widget graph
nodes: S@0,1; M@1,2; Z@2,0; I@2,2; D@3,1; F@4,1
edges: S>M; S>Z; S>I; M>Z; M>I; Z>D; I>D; D>F
algorithm: bfs
start: S
caption: A DFA for JSON numbers without exponents, `-?(0|[1-9][0-9]*)(\.[0-9]+)?`. Transitions: $S\to M$ on a minus sign; $S, M\to Z$ on $0$; $S, M\to I$ on $1$–$9$; $Z, I\to D$ on a full stop; $D\to F$ on a digit; and self-loops (not drawn) on digits at $I$ and $F$. The accepting states are $Z$, $I$ and $F$; from $Z$ (a lone zero) no digit may follow, which forbids leading zeros. Step through breadth-first search from $S$ to see that every state is reachable; every state can also reach an accepting one, so no state but the dead one is useless.
:::

The key observation of Willard and Louf (2023) is that the DFA has few states while the vocabulary is large and fixed, so the work can be done once in advance.

::: algorithm Index-based constrained decoding {#alg-index}
**Precompute** (once per language and tokeniser). For each DFA state $q$ and each token $v$, run the DFA from $q$ over the characters of $v$; if it never reaches the dead state, record $v$ as allowed in $q$, with end state $\delta^*(q, v)$. Add `<eos>` to the allowed set of every accepting state.

**Decode.** Start in the start state. At each step look up the allowed set of the current state, mask all other logits to $-\infty$, choose a token, and move to its recorded end state. Stop at `<eos>`.
:::

The cost per step is a table lookup and a masked softmax, essentially free next to the forward pass of the model. Tokens that span several DFA transitions — `3.14` is one token in many vocabularies — are handled naturally, because the index runs the automaton across the whole token.

::: example Allowed tokens after `-` {#ex-allowed}
A vocabulary contains the tokens `-`, `.`, `0`, `7`, `12`, `00`, `.5`, `-3`, `3.14`, `e` and `<eos>`. Using the DFA above, which are allowed after the model has produced `-`? Which after `-7`?
::: solution
After `-` the DFA is in state $M$, where a digit must follow. Allowed: `0` (to $Z$), `7` and `12` (to $I$), and `3.14` (through $I$ and $D$ to $F$). Not allowed: `-` and `-3` (a second minus), `.` and `.5` (no digit before the point), `00` (from $M$, `0` leads to $Z$, which accepts no further digit), `e` (not in this language) and `<eos>` ($M$ is not accepting). After `-7` the state is $I$: allowed are `.`, `0`, `7`, `12`, `00`, `.5`, `3.14` and `<eos>`, but not `-`, `-3` or `e`.
:::
:::

### A constrained decoder in plain Python

The listing implements [[#alg-index]] for the number DFA, with a toy vocabulary and, in place of a language model, random logits. It generates $200$ outputs freely and $200$ with the mask, and a third time with a rule that, at the last permitted step, allows only tokens that end in an accepting state.

```python
import math, random

# DFA for the JSON number subset  -?(0|[1-9][0-9]*)(\.[0-9]+)?
DIG = "0123456789"
def step(state, ch):
    if state == "S":                       # start
        if ch == "-": return "M"
        if ch == "0": return "Z"
        if ch in DIG: return "I"
    elif state == "M":                     # after a minus sign
        if ch == "0": return "Z"
        if ch in DIG: return "I"
    elif state in ("Z", "I"):              # integer part done (Z: a lone 0)
        if ch == ".": return "D"
        if state == "I" and ch in DIG: return "I"
    elif state in ("D", "F"):              # after '.', then fraction digits
        if ch in DIG: return "F"
    return None                            # dead state
ACCEPT = {"Z", "I", "F"}

VOCAB = ["<eos>", "-", ".", "0", "1", "2", "3", "7", "9", "12", "42", "00",
         ".5", "-3", "3.14", "e", " ", "abc", "\"", "1,"]
EOS = 0

def run(state, tok):                       # feed a whole token, char by char
    for ch in tok:
        state = step(state, ch)
        if state is None: return None
    return state

# Precompute the index: DFA state -> ids of allowed tokens (Willard & Louf 2023)
INDEX = {}
for q in ["S", "M", "Z", "I", "D", "F"]:
    ok = [i for i, t in enumerate(VOCAB) if i != EOS and run(q, t) is not None]
    if q in ACCEPT: ok.append(EOS)
    INDEX[q] = sorted(ok)

def toy_logits(rng):                       # stand-in for a language model
    return [rng.gauss(0, 1.5) for _ in VOCAB]

def sample(logits, allowed, rng):
    m = max(logits[i] for i in allowed)
    w = [math.exp(logits[i] - m) for i in allowed]       # masked softmax
    r, acc = rng.random() * sum(w), 0.0
    for i, wi in zip(allowed, w):
        acc += wi
        if r <= acc: return i
    return allowed[-1]

def generate(rng, constrained, max_tokens=8, finish=False):
    state, out = "S", ""
    for t in range(max_tokens):
        allowed = INDEX[state] if constrained else list(range(len(VOCAB)))
        if finish and t == max_tokens - 1:   # last step: must end in an accepting state
            allowed = [i for i in allowed if i == EOS or run(state, VOCAB[i]) in ACCEPT]
        i = sample(toy_logits(rng), allowed, rng)
        if i == EOS: break
        out += VOCAB[i]
        if constrained: state = run(state, VOCAB[i])
    return out

def valid(s):
    q = "S"
    for ch in s:
        q = step(q, ch)
        if q is None: return False
    return q in ACCEPT

for q in INDEX: print(q, [VOCAB[i] for i in INDEX[q]])
rng = random.Random(0)
for name, c, f in (("free", False, False), ("masked", True, False), ("masked+finish", True, True)):
    outs = [generate(rng, c, finish=f) for _ in range(200)]
    bad = [o for o in outs if not valid(o)]
    print(f"{name:14s} valid {200 - len(bad)}/200  e.g. {outs[:3]}  invalid e.g. {bad[:2]}")
```

```text
S ['-', '0', '1', '2', '3', '7', '9', '12', '42', '-3', '3.14']
M ['0', '1', '2', '3', '7', '9', '12', '42', '3.14']
Z ['<eos>', '.', '.5']
I ['<eos>', '.', '0', '1', '2', '3', '7', '9', '12', '42', '00', '.5', '3.14']
D ['0', '1', '2', '3', '7', '9', '12', '42', '00']
F ['<eos>', '0', '1', '2', '3', '7', '9', '12', '42', '00']
free           valid 9/200  e.g. ['-33.14e.51', ' 0702e001,', '3422']  invalid e.g. ['-33.14e.51', ' 0702e001,']
masked         valid 198/200  e.g. ['200713.14742', '21221', '12391707']  invalid e.g. ['1742000009.', '1199937.']
masked+finish  valid 200/200  e.g. ['1.2', '142707313.14', '9422.511009']  invalid e.g. []
```

The free "model" produces a valid number $9$ times in $200$. The mask raises this to $198$; the two failures are outputs cut off by the $8$-token limit in state $D$, just after a decimal point — the termination caveat after [[#prop-sound]]. Forcing an accepting state at the last step closes the gap. The numbers are long because random logits give `<eos>` no special weight; a real model would end where its training says a number ends, and the mask would rarely bind.

### Context-free grammars

A DFA has finitely many states and so cannot count: the language of balanced brackets, and therefore JSON with arbitrarily nested objects and arrays, is not regular. Formats with recursion are described by **context-free grammars**, recognised by automata with a stack. The allowed set then depends on the stack as well as the state, so it cannot be fully precomputed; grammar-constrained decoders track the parser state incrementally and compute masks on the fly, with precomputation for the many tokens whose validity does not depend on the stack (Dong et al., 2024, report that this makes the overhead negligible for JSON in their system). In practice, a JSON Schema without recursive references compiles to a regular expression, and one with recursion to a grammar. As of 2026 several open-source libraries implement both (among them Outlines, Guidance, llama.cpp's GBNF grammars and XGrammar), and many hosted inference services accept a JSON Schema and constrain decoding to it.

## What the mask does to the distribution {#sec-distortion}

Masking guarantees validity, but it does not sample from the distribution one might expect. The natural target is the model's distribution *conditioned* on validity, $p_\theta(x\mid x\in L) = p_\theta(x)/p_\theta(L)$. Constrained decoding produces something else.

::: proposition The distribution of constrained decoding {#prop-distortion}
For an output $x = (x_1, \dots, x_T)$ ending in `<eos>`, write $Z_t(x) = \sum_{u\in A(x_{<t})}p_\theta(u\mid x_{<t})$ for the probability mass the model puts on allowed tokens at step $t$. Then constrained sampling produces $x\in L$ with probability

$$
q(x) = \frac{p_\theta(x)}{\prod_{t=1}^{T}Z_t(x)},
$$

and $q(x) = p_\theta(x\mid x\in L)$ for every $x\in L$ if and only if $\prod_t Z_t(x)$ takes the same value for all $x\in L$ with $p_\theta(x) > 0$.
:::

::: proof
By the chain rule and [[#eq-masked]], $q(x) = \prod_t p_\theta(x_t\mid x_{<t})/Z_t(x) = p_\theta(x)/\prod_tZ_t(x)$, since every token of an output in $L$ was allowed. If $\prod_tZ_t(x) = c$ for all such $x$, then $q(x) = p_\theta(x)/c$, and summing over $L$ gives $c = p_\theta(L)$, so $q$ is the conditional distribution. Conversely, if $q(x) = p_\theta(x)/p_\theta(L)$ for all $x$, dividing the two expressions gives $\prod_tZ_t(x) = p_\theta(L)$ for every $x$.
:::

Masking is greedy: it commits to a prefix because some valid continuation exists, without asking how probable the valid continuations are.

::: example A distorted choice {#ex-distortion}
Let $L = \{\texttt{ab}, \texttt{ba}\}$. A model starts with `a` with probability $0.9$ and `b` with $0.1$. After `a`, it continues with `b` only with probability $0.01$ (it strongly prefers some invalid token); after `b`, it continues with `a` with probability $0.9$. Assume that `<eos>` then has probability $1$. Compare the conditional distribution with constrained decoding.
::: solution
The model gives $p(\texttt{ab}) = 0.9\cdot0.01 = 0.009$ and $p(\texttt{ba}) = 0.1\cdot0.9 = 0.09$, so $p(\texttt{ab}\mid L) = 0.009/0.099 = 0.091$: conditioned on validity, `ba` is ten times as likely. Constrained decoding allows both first tokens (each begins a valid string) and picks `a` with probability $0.9$; then only `b` is allowed, and the mask raises its probability from $0.01$ to $1$. So $q(\texttt{ab}) = 0.9$. In terms of [[#prop-distortion]], $Z_2(\texttt{ab}) = 0.01$ and $Z_2(\texttt{ba}) = 0.9$, very different, which is why the distributions disagree.
:::
:::

The example is extreme, but the pattern is real: when the mask forces the model off its preferred path, the probability of the forced path is inflated, and the model may be pushed into a continuation it considers very unlikely — a field filled with a placeholder, an answer chosen because the format leaves no room for "I don't know". Park et al. (2024) analysed this distortion for grammar-constrained decoding and proposed sampling methods that correct it asymptotically; sequential Monte Carlo approaches pursue the same goal. In most applications the distortion is small because a good prompt makes the model put most of its mass on valid outputs anyway: then every $Z_t$ is close to $1$.

::: warning Valid is not correct
A schema guarantees shape, not truth. Constrained decoding will produce a perfectly valid `{"total": 0}` for an invoice whose total the model could not find, because the schema requires a number and offers no alternative. Give the schema a way to express uncertainty — a nullable field, an `"unknown"` enum value, an explicit `"found": false` — and validate the *content* (sums, ranges, cross-references) after parsing.
:::

## Designing formats for models {#sec-design}

A few design rules follow from how autoregressive models generate.

- **Order fields so that reasoning comes before conclusions.** Keys are generated in order. If `"answer"` precedes `"explanation"`, the answer is produced before any explanation exists, and the explanation can only rationalise it. Putting a free-text reasoning field first gives the model the benefit of chain-of-thought ([[prompting-rag/prompt-design#def-cot]]) inside the format.
- **Do not over-constrain free text.** Tam et al. (2024) reported that strict format restrictions lowered models' accuracy on some reasoning tasks compared with answering freely and converting afterwards; other evaluations found little or no loss when the format leaves room for reasoning. The cautious practice is to measure both on your task.
- **Keep the prompt and the constraint consistent.** Show the schema or an example in the prompt; a model forced into a format it was not told about is more often pushed onto low-probability paths, as in [[#ex-distortion]].
- **Mind the tokeniser.** Masking works on tokens, not characters, and a model's natural tokenisation of a string may differ from the one the mask permits — for instance when a prompt ends in the middle of what would normally be a single token. Libraries handle this by "token healing" (backing up one token and constraining the regenerated token to start with the removed text) or by precomputing token-level automata.
- **Validate anyway.** Even with constrained decoding, parse and validate: libraries support subsets of JSON Schema, length limits can truncate output, and content constraints are outside the schema.

::: quiz
A schema-constrained extractor is asked for `{"sentiment": "positive" | "negative"}` for each review. On reviews that are plainly neutral, it returns `positive` $80\%$ of the time. What is the most likely explanation?
- [ ] Constrained decoding is broken: it should have produced an error.
- [x] The schema offers no neutral option, so the mask forces a choice between two labels, renormalising whatever small mass the model puts on them.
- [ ] The model's tokeniser cannot represent the word "neutral".
- [ ] JSON Schema does not support enumerations.
::: solution
Constrained decoding is doing exactly what it was asked: only `positive` and `negative` are allowed, so all probability is renormalised onto them ([[#eq-masked]]), however unlikely the model found both. The fix is in the schema — add `neutral` or `unknown` — not in the decoder.
:::
:::

::: history
Constraining generation to a vocabulary or a grammar is older than large language models: lexically constrained decoding for translation (Hokamp and Liu, 2017) forced given words to appear, and grammar-constrained decoding was used for semantic parsing and code generation, for instance by Shin et al. (2021), who constrained outputs to a canonical sublanguage. With LLMs the need for reliable JSON made the technique mainstream. The open-source Guidance library (2022–2023) interleaved prompts and constraints; Willard and Louf (2023) showed how to index a regular expression or grammar against a vocabulary so that masking costs almost nothing, implemented in the Outlines library; llama.cpp added GBNF grammars in 2023; and from 2023–2024 hosted inference services added JSON and schema modes. Dong et al. (2024) made grammar masks fast for context-free formats (XGrammar), and Park et al. (2024) analysed and corrected the distortion that masking introduces.
:::

::: summary
- Machine-readable output needs a precise specification; JSON Schema describes types, required fields, enumerations, patterns and ranges.
- Asking, validating and retrying works with any model; with independent attempts of success rate $q$ it needs $1/q$ attempts on average, but real failures are correlated.
- Constrained decoding masks every token that cannot extend the output to a string of the language; with all single characters in the vocabulary it never gets stuck and only emits valid strings, though a length limit can still truncate.
- Regular formats compile to a DFA whose state-by-token mask can be precomputed; recursive formats need a grammar and a stack, with masks computed incrementally.
- Masking samples from $p_\theta(x)/\prod_tZ_t(x)$, not from $p_\theta(x\mid x\in L)$; it can inflate continuations the model found unlikely.
- Schema-valid output can still be wrong: give the schema room for uncertainty, put reasoning before conclusions, and validate content after parsing.
:::

## Exercises

::: exercise Expected attempts {level=1 check="1.25"}
A prompt yields schema-valid output with probability $0.8$ per attempt, independently. What is the expected number of attempts per valid output?
::: solution
$1/0.8 = 1.25$ by [[#prop-retries]].
:::
:::

::: exercise Three failures in a row {level=1 check="0.000125"}
With a valid-output rate of $0.95$ per independent attempt, what is the probability that three attempts all fail?
::: solution
$(1 - 0.95)^3 = 0.05^3 = 0.000125$.
:::
:::

::: exercise Counting allowed tokens {level=1 check="13"}
In the listing's vocabulary of $20$ tokens (including `<eos>`), how many are allowed in state $I$? Explain why `00` is allowed in $I$ but not in $M$.
::: solution
The listing prints $13$: `<eos>`, `.`, `0`, `1`, `2`, `3`, `7`, `9`, `12`, `42`, `00`, `.5` and `3.14`. In $I$ the integer part has begun with a non-zero digit, so further zeros are fine (`700`). In $M$ a zero leads to $Z$, a lone leading zero, from which no further digit may follow; `00` would be a number with a leading zero, forbidden in JSON.
:::
:::

::: exercise A smaller distortion {level=2 check="0.375"}
With $L = \{\texttt{ab}, \texttt{ba}\}$, a model starts with `a` with probability $0.6$ and `b` with $0.4$; after `a` it continues with `b` with probability $0.2$, and after `b` with `a` with probability $0.5$. Compute $p_\theta(\texttt{ab}\mid L)$ and the probability that constrained decoding produces `ab`.
::: solution
$p(\texttt{ab}) = 0.6\cdot0.2 = 0.12$ and $p(\texttt{ba}) = 0.4\cdot0.5 = 0.2$, so $p(\texttt{ab}\mid L) = 0.12/0.32 = 0.375$. Constrained decoding chooses the first token freely, so it produces `ab` with probability $0.6$, and `ba` with $0.4$.
:::
:::

::: exercise The size of a mask table {level=2 check="96000"}
A regular expression compiles to a DFA with $6$ live states, and the tokeniser has $128{,}000$ tokens. How many bytes does a table of allowed-token bitmasks need, one bit per (state, token)? Why does a large JSON Schema make this table much bigger?
::: solution
$6\cdot128{,}000 = 768{,}000$ bits $= 96{,}000$ bytes. A schema with many fields, enumerations and patterns compiles to a DFA with thousands of states — each position in each fixed key name, each enum value and each sub-pattern contributes states — so the table grows in proportion; libraries compress it, store end states only for allowed pairs, or compute parts lazily.
:::
:::

::: exercise Adding an exponent {level=2}
Extend the DFA of the figure to the full JSON number syntax, which allows an optional exponent `[eE][+-]?[0-9]+` after the integer or fraction part. List the new states, their transitions and the new set of accepting states.
::: solution
Add three states: $E$ (after `e` or `E`), $P$ (after the exponent's sign) and $X$ (exponent digits). New transitions: from $Z$, $I$ and $F$ on `e` or `E` to $E$; from $E$ on `+` or `-` to $P$; from $E$ and $P$ on a digit to $X$; from $X$ on a digit to $X$. The accepting states become $Z$, $I$, $F$ and $X$; $E$ and $P$ are not accepting, because `1e` and `1e+` are incomplete. Every new state can reach $X$, so there are still no useless states.
:::
:::

::: exercise A schema with room for doubt {level=2}
Rewrite the schema of [[#ex-schema]] so that the extractor can say it found no total and no currency, without inventing values, and so that a downstream program can tell "not found" from a real zero. Then explain why putting `"evidence"` (a quotation from the invoice) before `"total"` might improve accuracy.
::: solution
One option: make `total` of type `["number", "null"]` and `currency` an enum that includes `null` (or a string `"UNKNOWN"`), keep them required, and document that `null` means "not stated on the invoice". A real zero is then `0` and absence is `null`. A required `"evidence"` string placed first makes the model copy the passage that states the total before producing the number; generation is autoregressive, so the number is then conditioned on the quoted text, and the quotation can be checked against the source automatically.
:::
:::

::: exercise Proving the retry formula {level=2}
Prove that $\sum_{j\ge1}jx^{j-1} = 1/(1 - x)^2$ for $\lvert x\rvert < 1$, and use it to show that with a limit of $r$ attempts the expected number of calls is $(1 - (1 - q)^r)/q$.
::: solution
Differentiate the geometric series $\sum_{j\ge0}x^j = 1/(1 - x)$ term by term, which is allowed inside its radius of convergence: $\sum_{j\ge1}jx^{j-1} = 1/(1 - x)^2$. With a limit of $r$, the number of calls $N$ satisfies $N\ge j$ exactly when the first $j - 1$ attempts fail, for $j\le r$, so $\E N = \sum_{j=1}^{r}\Prob(N\ge j) = \sum_{j=1}^{r}(1 - q)^{j-1} = \frac{1 - (1 - q)^r}{q}$. As $r\to\infty$ this tends to $1/q$, as in [[#prop-retries]].
:::
:::

::: exercise A trie constrainer for an enumeration {level=3}
Implement constrained decoding of one value from `["red", "green", "grey", "blue"]` in plain Python, with a toy vocabulary that contains multi-character tokens. Find a vocabulary in which the character-level prefix test of [[#def-constrained]] gets stuck, and fix it by allowing only prefixes from which a full value can be reached *with the available tokens*.
::: solution
```python
import math, random
from collections import Counter
CHOICES = ["red", "green", "grey", "blue"]
VOCAB = ["<eos>", "r", "re", "red", "g", "gr", "gre", "green", "grey", "ey", "een",
         "b", "bl", "blue", "ue", "e", "d", "n", "x"]
PREFIXES = {c[:k] for c in CHOICES for k in range(len(c) + 1)}   # character-level trie

# A prefix is live if it is a full choice or some token extends it to a live prefix.
# (Character prefixes such as "b" can be dead: no token continues "b" towards "blue".)
live = set(CHOICES)
changed = True
while changed:
    changed = False
    for p in PREFIXES - live:
        if any(p + t in live for t in VOCAB[1:]):
            live.add(p); changed = True

def allowed(prefix, check_live):
    ok_set = live if check_live else PREFIXES
    ok = [i for i, t in enumerate(VOCAB) if i > 0 and prefix + t in ok_set]
    if prefix in CHOICES: ok.append(0)                 # <eos> only after a full choice
    return ok

def generate(rng, check_live):
    out = ""
    while True:
        ids = allowed(out, check_live)
        if not ids: return "STUCK at " + repr(out)
        logits = [rng.gauss(0, 1) for _ in VOCAB]      # toy model
        i = rng.choices(ids, weights=[math.exp(logits[j]) for j in ids])[0]
        if i == 0: return out
        out += VOCAB[i]

rng = random.Random(0)
print("dead prefixes:", sorted(PREFIXES - live))
for check_live in (False, True):
    print(check_live, Counter(generate(rng, check_live) for _ in range(4000)).most_common())
```

```text
dead prefixes: ['b']
False [('green', 1220), ('red', 1106), ('blue', 775), ('grey', 519), ("STUCK at 'b'", 380)]
True [('green', 1402), ('red', 1153), ('blue', 810), ('grey', 635)]
```

The vocabulary has `b` and `bl` but no `l` or `lu`, so after the token `b` nothing can continue towards `blue`: the hypothesis of [[#prop-sound]] (every character is a token) fails, and the naive constrainer gets stuck $380$ times in $4000$. Computing the live prefixes by a fixed-point iteration and allowing only those removes every dead end. Notice also that the values are not equally likely even though the toy model is symmetric: `green` can be reached by many token paths and `grey` by fewer, an instance of the distortion of [[#sec-distortion]].
:::
:::

::: exercise Why JSON needs a stack {level=3}
Prove that the language of balanced brackets $\{\,\texttt{[}^n\texttt{]}^n : n\ge0\,\}$ is not recognised by any DFA, and conclude that a constrainer for JSON with unbounded nesting cannot be a DFA. How do practical systems get away with a DFA for many schemas?
::: solution
Suppose a DFA with $k$ states recognises the language. Feed it $\texttt{[}^0, \texttt{[}^1, \dots, \texttt{[}^k$: these are $k + 1$ strings, so two of them, $\texttt{[}^i$ and $\texttt{[}^j$ with $i < j$, lead to the same state. Then $\texttt{[}^i\texttt{]}^i$ and $\texttt{[}^j\texttt{]}^i$ also end in the same state, since the DFA's behaviour after that state depends only on the remaining input. The first is in the language and the second is not, a contradiction. JSON contains such nesting (arrays of arrays), so the set of all JSON values is not regular. A schema without recursion, however, bounds the depth: each nested object or array is described by its own sub-schema, finitely many of them, so the strings it allows form a regular language and compile to a DFA. Only recursive schemas (a tree of comments with replies, say) need a stack — or a cap on the depth, which again makes the language regular.
:::
:::
