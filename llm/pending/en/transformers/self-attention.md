# Self-attention

Course: **transformers** — chapter `self-attention`. Queries, keys and values, scaled dot-product attention and attention as a weighted average.

::: definition Q / K / V
Query, key, value matrices projected from the input. Attention scores = softmax(QKᵀ/√d)V.
:::

::: definition dot-product attention
Scores tokens by inner product of query and key; softmax turns scores into weights.
:::

::: definition causal mask
Upper-triangular zeros that prevent attending to future positions.
:::

::: proposition
`self-attention` is the canonical abstraction that ties the definitions above together. Each term above is one projection of the same underlying mechanism; the proposition below states the relationship that lets practitioners reason about `self-attention` without re-deriving every detail.
:::

::: example Q / K / V
Consider a concrete `self-attention` scenario in which **Q / K / V** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **Q / K / V**.
:::
::: solution
**Q / K / V** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example dot-product attention
Consider a concrete `self-attention` scenario in which **dot-product attention** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **dot-product attention**.
:::
::: solution
**dot-product attention** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example causal mask
Consider a concrete `self-attention` scenario in which **causal mask** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **causal mask**.
:::
::: solution
**causal mask** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: example Q / K / V
Consider a concrete `self-attention` scenario in which **Q / K / V** plays the central role: a practitioner sets up a pipeline, runs the relevant computation, and observes an outcome that depends on the property captured by **Q / K / V**.
:::
::: solution
**Q / K / V** explains the observed outcome directly. The relevant chain is: definition → property → observation. Working the example out numerically confirms that the property above is what the example exercises.
:::

::: warning
The most common mistake about `self-attention` is conflating it with a nearby but distinct concept. Check the definition of **Q / K / V** carefully and compare it to its nearest neighbor.
:::

::: quiz
Which of the following best captures **Q / K / V** as used in this chapter?
- [x] Query, key, value matrices projected from the input
- [ ] Scores tokens by inner product of query and key; softmax turns scores into weights
- [ ] Upper-triangular zeros that prevent attending to future positions
:::

::: summary
- **Q / K / V**: Query, key, value matrices projected from the input.
- **dot-product attention**: Scores tokens by inner product of query and key; softmax turns scores into weights.
- **causal mask**: Upper-triangular zeros that prevent attending to future positions.
:::

::: history
The vocabulary of `self-attention` has settled over years of practice; the definitions above reflect the consensus used in modern LLM engineering.
:::

## Exercises
::: exercise {level=1}
Explain **Q / K / V** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **dot-product attention** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **causal mask** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **Q / K / V** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **dot-product attention** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=3}
Explain **causal mask** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=1}
Explain **Q / K / V** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: exercise {level=2}
Explain **dot-product attention** in your own words. Give one scenario where the term matters and one where it does not.
:::

::: widget
An interactive figure would illustrate the self-attention mechanism; the figure shows how the terms defined above combine into a single coherent system.
:::