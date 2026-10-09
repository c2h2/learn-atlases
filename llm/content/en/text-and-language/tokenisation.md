# Tokenisation

Course: **text-and-language** — chapter `tokenisation`. Word, character and subword tokenisers: byte-pair encoding, WordPiece, unigram language models and byte-level tokenisers.

::: definition BPE
Byte-pair encoding; merges frequent character pairs into a vocabulary.
:::

::: definition byte-level
Tokenization over raw bytes; works for any text but uses more tokens.
:::

::: definition subword
Unit between character and word.
:::

::: proposition
`tokenisation` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `tokenisation` without re-deriving every detail.
:::

::: example BPE
Consider a concrete `tokenisation` scenario in which **BPE** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **BPE**.
:::
::: solution
**BPE** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example byte-level
Consider a concrete `tokenisation` scenario in which **byte-level** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **byte-level**.
:::
::: solution
**byte-level** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example subword
Consider a concrete `tokenisation` scenario in which **subword** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **subword**.
:::
::: solution
**subword** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example BPE
Consider a concrete `tokenisation` scenario in which **BPE** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **BPE**.
:::
::: solution
**BPE** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `tokenisation` is conflating it with a nearby but distinct concept. Check the definition of **BPE** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **BPE** as used in this chapter?
- [x] Byte-pair encoding; merges frequent character pairs into a vocabulary
- [ ] Tokenization over raw bytes; works for any text but uses more tokens
- [ ] Unit between character and word
:::

::: summary
- **BPE**: Byte-pair encoding; merges frequent character pairs into a vocabulary.
- **byte-level**: Tokenization over raw bytes; works for any text but uses more tokens.
- **subword**: Unit between character and word.
:::

::: history
The vocabulary of `tokenisation` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **BPE** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **byte-level** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **subword** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **BPE** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **byte-level** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **subword** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **BPE** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **byte-level** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the tokenisation mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::