# Encoders, decoders and encoder–decoders

Course: **transformers** — chapter `architecture-families`. BERT-style encoders, GPT-style decoders and T5-style encoder–decoders, and what each is good for.

::: definition encoder
Bidirectional model producing contextual representations (BERT-style).
:::

::: definition decoder
Causal model that predicts the next token (GPT-style).
:::

::: definition encoder-decoder
Encoder reads the input, decoder generates output conditioned on encoder states (T5, translation).
:::

::: proposition
`architecture-families` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `architecture-families` without re-deriving every detail.
:::

::: example encoder
Consider a concrete `architecture-families` scenario in which **encoder** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **encoder**.
:::
::: solution
**encoder** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example decoder
Consider a concrete `architecture-families` scenario in which **decoder** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **decoder**.
:::
::: solution
**decoder** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example encoder-decoder
Consider a concrete `architecture-families` scenario in which **encoder-decoder** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **encoder-decoder**.
:::
::: solution
**encoder-decoder** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example encoder
Consider a concrete `architecture-families` scenario in which **encoder** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **encoder**.
:::
::: solution
**encoder** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `architecture-families` is conflating it with a nearby but distinct concept. Check the definition of **encoder** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **encoder** as used in this chapter?
- [x] Bidirectional model producing contextual representations (BERT-style)
- [ ] Causal model that predicts the next token (GPT-style)
- [ ] Encoder reads the input, decoder generates output conditioned on encoder states (T5, translation)
:::

::: summary
- **encoder**: Bidirectional model producing contextual representations (BERT-style).
- **decoder**: Causal model that predicts the next token (GPT-style).
- **encoder-decoder**: Encoder reads the input, decoder generates output conditioned on encoder states (T5, translation).
:::

::: history
The vocabulary of `architecture-families` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **encoder** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **decoder** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **encoder-decoder** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **encoder** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **decoder** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **encoder-decoder** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **encoder** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **decoder** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the architecture-families mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::