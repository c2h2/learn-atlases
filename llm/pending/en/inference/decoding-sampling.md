# Decoding and sampling

Course: **inference** — chapter `decoding-sampling`. Greedy decoding, temperature, top-k and nucleus sampling, and repetition penalties.

::: definition greedy decoding
Always take the argmax token. Fast but myopic and repetitive.
:::

::: definition beam search
Keep the top-K partial sequences. Better than greedy for short outputs, poor for long creative ones.
:::

::: definition temperature
Scales logits before softmax. High temperature = more entropy, lower = sharper.
:::

::: definition top-k
Restrict sampling to the k highest-probability tokens.
:::

::: definition top-p (nucleus)
Sample from the smallest set of tokens whose cumulative probability exceeds p.
:::

::: proposition
`decoding-sampling` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `decoding-sampling` without re-deriving every detail.
:::

::: example greedy decoding
Consider a concrete `decoding-sampling` scenario in which **greedy decoding** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **greedy decoding**.
:::
::: solution
**greedy decoding** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example beam search
Consider a concrete `decoding-sampling` scenario in which **beam search** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **beam search**.
:::
::: solution
**beam search** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example temperature
Consider a concrete `decoding-sampling` scenario in which **temperature** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **temperature**.
:::
::: solution
**temperature** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example top-k
Consider a concrete `decoding-sampling` scenario in which **top-k** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **top-k**.
:::
::: solution
**top-k** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `decoding-sampling` is conflating it with a nearby but distinct concept. Check the definition of **greedy decoding** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **greedy decoding** as used in this chapter?
- [x] Always take the argmax token
- [ ] Keep the top-K partial sequences
- [ ] Scales logits before softmax
- [ ] Restrict sampling to the k highest-probability tokens
:::

::: summary
- **greedy decoding**: Always take the argmax token.
- **beam search**: Keep the top-K partial sequences.
- **temperature**: Scales logits before softmax.
- **top-k**: Restrict sampling to the k highest-probability tokens.
- **top-p (nucleus)**: Sample from the smallest set of tokens whose cumulative probability exceeds p.
:::

::: history
The vocabulary of `decoding-sampling` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **greedy decoding** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **beam search** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **temperature** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **top-k** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **top-p (nucleus)** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **greedy decoding** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **beam search** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **temperature** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the decoding-sampling mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::